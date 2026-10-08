import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { Actor } from "@/server/auth/actor";
import { loginWithPassword } from "@/server/auth/flows";
import { verifyPassword } from "@/server/auth/passwords";
import { db } from "@/server/db";
import { latestDevMessage } from "@/server/messaging";
import { createCurriculumChain, createStudent, ensureTestCountry, uniqueCode, uniqueEmail, type CurriculumChain } from "../../../tests/factories/index";
import { buildXlsx, buildXlsxBomb } from "@/server/cms/imports/testing";
import { chunkRows, MAX_ROSTER_FILE_BYTES, MAX_ROSTER_XLSX_UNPACKED_BYTES, rosterRowForCommit } from "./core";
import { commitRosterChunk, validateRosterFile, type RosterDryRun } from "./roster";
import { setSchoolSubjects } from "./subjects";
import { errorCodeOf, schoolWithAdmin, studentOf } from "./testing";

// Every optional channel is OFF here, as by default (owner decision 2026-10-07): invitations, reset instructions and
// reminders are account email and go out anyway; nothing is ever texted while SMS is off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Roster import (§23): dry run (nothing written, every row explained), chunked commit creating school-provisioned
 * username accounts with one-time credential slips, class creation and placement, subject enrolment, siblings sharing a
 * parent phone, consent recorded by the school, idempotency and re-import. Negative cases: other school's admin, bad
 * files, tampered rows, a chunk saved twice.
 */

const encoder = new TextEncoder();
let chain: CurriculumChain;
let formName: string;

beforeAll(async () => {
  chain = await createCurriculumChain({ lessonsPerTopic: 0, topicCount: 1, subtopicsPerTopic: 0 });
  const country = await ensureTestCountry();
  formName = `Form ${uniqueCode("F")}`;
  await db.yearGroup.create({ data: { countryId: country.id, code: uniqueCode("Y").slice(0, 16), name: formName, ordinal: 3 } });
});

function csv(lines: string[]): Uint8Array {
  return encoder.encode(lines.join("\r\n"));
}

const HEADER = "First name,Last name,Form,Class,Email,Phone,Parent phone,Student number,Subjects";

async function commitAll(adminActor: Actor, schoolId: string, dry: RosterDryRun, options: { consent?: boolean } = {}) {
  const rows = dry.rows.filter((row) => row.outcome !== "error" && row.outcome !== "skip");
  const results = [];
  for (const [chunkIndex, chunk] of chunkRows(rows).entries()) {
    results.push(
      await commitRosterChunk(adminActor, {
        schoolId,
        importId: dry.importId,
        chunkIndex,
        rows: chunk.map(rosterRowForCommit),
        guardianConsentCollected: options.consent ?? false,
        createMissingClasses: true,
        academicYear: "2026",
      }),
    );
  }
  return results;
}

describe("roster dry run", () => {
  it("explains every row without writing anything", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const existing = await studentOf(school.id, { firstName: "Kuda", lastName: "Mlambo" });
    await db.schoolMember.update({ where: { id: existing.member.id }, data: { studentNumber: "EX-1" } });
    const accountEmail = uniqueEmail("has.account");
    await createStudent({ email: accountEmail });
    const usersBefore = await db.user.count({ where: { provisionedBySchoolId: school.id } });

    const dry = await validateRosterFile(adminActor!, {
      schoolId: school.id,
      bytes: csv([
        HEADER,
        `Tendai,Moyo,${formName},3B,,,0771234567,,`,
        "Rudo,Moyo,Form 99,3B,,,077 123 4567,,",
        "Bad,Phone,,3B,,,12,,",
        "Tendai,Moyo,,3B,,,,,",
        `Kuda,Mlambo,,,,,,EX-1,`,
        `Nyasha,Gumbo,,,${accountEmail},,,,`,
        "Wrong,Person,,,,,,EX-1,",
      ]),
    });
    expect(dry.fileIssues.filter((i) => i.severity === "error")).toEqual([]);
    expect(dry.rows.map((r) => [r.row, r.outcome])).toEqual([
      [2, "create"],
      [3, "create"],
      [4, "error"],
      [5, "error"],
      [6, "existing"],
      [7, "invite"],
      [8, "error"],
    ]);
    expect(dry.totals).toEqual({ create: 2, invite: 1, existing: 1, skip: 0, error: 3 });
    expect(dry.newClasses).toEqual(["3B"]);
    const rudo = dry.rows.find((r) => r.row === 3)!;
    expect(rudo.issues.map((i) => i.message).join(" ")).toContain("isn't recognised");
    expect(dry.rows.find((r) => r.row === 2)!.issues.some((i) => i.message.includes("isn't recognised"))).toBe(false);
    expect(await db.user.count({ where: { provisionedBySchoolId: school.id } })).toBe(usersBefore);
    expect(await db.class.count({ where: { schoolId: school.id } })).toBe(0);
  });

  it("rejects unusable files", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const png = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0]);
    expect((await validateRosterFile(adminActor!, { schoolId: school.id, bytes: png })).fileIssues[0]?.message).toContain("CSV");
    const noNames = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv(["Class,Form", "3B,Form 3"]) });
    expect(noNames.fileIssues.some((i) => i.severity === "error")).toBe(true);
    expect(noNames.rows).toEqual([]);
    const headerOnly = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv([HEADER]) });
    expect(headerOnly.fileIssues.some((i) => i.message.includes("no students"))).toBe(true);
  });

  // INJ-2 regression: the 2 MB cap only bounds the COMPRESSED file; a small .xlsx used to be inflated in full (hundreds
  // of MB of worksheet XML) inside the web process before any row limit applied.
  it("refuses an Excel decompression bomb before parsing it", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const bomb = buildXlsxBomb(MAX_ROSTER_XLSX_UNPACKED_BYTES + 8 * 1024 * 1024);
    expect(bomb.byteLength).toBeLessThan(MAX_ROSTER_FILE_BYTES);
    const dry = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: bomb });
    expect(dry.format).toBe("XLSX");
    expect(dry.rows).toEqual([]);
    expect(dry.fileIssues).toEqual([expect.objectContaining({ severity: "error", message: expect.stringContaining("too much data once unpacked") })]);
    // An ordinary workbook still goes through the same bounded reader.
    const ok = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: buildXlsx([["First name", "Last name"], ["Tendai", "Moyo"]]) });
    expect(ok.fileIssues.filter((i) => i.severity === "error")).toEqual([]);
    expect(ok.rows.map((r) => [r.firstName, r.lastName])).toEqual([["Tendai", "Moyo"]]);
  });

  it("is refused to other schools' admins", async () => {
    const { school } = await schoolWithAdmin();
    const other = await schoolWithAdmin();
    expect(await errorCodeOf(validateRosterFile(other.adminActor!, { schoolId: school.id, bytes: csv([HEADER, "A,B,,,,,,,"]) }))).toBe("FORBIDDEN");
  });
});

describe("roster commit", () => {
  it("creates username accounts with one-time slips, places students in classes and subjects, and is idempotent", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    await setSchoolSubjects(adminActor!, { schoolId: school.id, subjectIds: [chain.subject.id] });
    const dry = await validateRosterFile(adminActor!, {
      schoolId: school.id,
      bytes: csv([
        HEADER,
        `Tendai,Moyo,${formName},3B,,,0771234567,HHS-1,${chain.subject.officialCode}`,
        `Rudo,Moyo,${formName},3B,,,0771234567,HHS-2,`,
        `Tatenda,Ncube,,,,,,,`,
      ]),
    });
    expect(dry.totals.create).toBe(3);
    const [result] = await commitAll(adminActor!, school.id, dry, { consent: true });
    expect(result!.slips).toHaveLength(3);
    expect(result!.classesCreated).toEqual(["3B"]);

    const tendai = result!.slips.find((s) => s.name === "Tendai Moyo")!;
    expect(tendai.className).toBe("3B");
    expect(tendai.username).toMatch(/^hh[0-9a-f]\.tmoyo\d{2,4}$/);
    expect(tendai.temporaryPassword).toMatch(/^[a-z2-9]{4}-[a-z2-9]{4}-[a-z2-9]{4}$/);

    const user = await db.user.findUniqueOrThrow({
      where: { id: tendai.userId },
      include: { student: true, profile: true, schoolMemberships: true, classMemberships: true, subjectEnrollments: true },
    });
    expect(user).toMatchObject({
      loginUsername: tendai.username,
      provisionedBySchoolId: school.id,
      contactPhoneE164: "+263771234567",
      emailNormalized: null,
      phoneE164: null,
      roles: ["STUDENT"],
      // The slip's password is known to the school: the student must replace it at first sign-in.
      passwordMustChange: true,
    });
    expect(user.passwordHash).not.toContain(tendai.temporaryPassword);
    expect((await verifyPassword(user.passwordHash!, tendai.temporaryPassword)).valid).toBe(true);
    expect(user.profile?.username).not.toContain("tendai");
    expect(user.student).toMatchObject({ schoolId: school.id, countryId: school.countryId, isMinor: true, guardianConsentStatus: "GRANTED", guardianConsentMethod: "SCHOOL" });
    expect(user.student?.guardianConsentEvidenceRef).toMatch(/^AuditLog:[0-9a-f-]{36}$/);
    expect(user.student?.yearGroupId).not.toBeNull();
    expect(user.schoolMemberships).toEqual([expect.objectContaining({ schoolId: school.id, role: "STUDENT", status: "ACTIVE", source: "ROSTER_IMPORT", studentNumber: "HHS-1" })]);
    expect(user.classMemberships).toHaveLength(1);
    expect(user.subjectEnrollments).toEqual([expect.objectContaining({ subjectId: chain.subject.id, enrolledVia: "SCHOOL" })]);

    // Siblings share the parent's contact phone; nobody gets a login phone.
    const rudo = await db.user.findUniqueOrThrow({ where: { id: result!.slips.find((s) => s.name === "Rudo Moyo")!.userId } });
    expect(rudo.contactPhoneE164).toBe("+263771234567");

    // The student can sign in with the username and the temporary password.
    const login = await loginWithPassword({ identifier: tendai.username, password: tendai.temporaryPassword }, { ip: "10.9.8.7", userAgent: "test" });
    expect(login.kind).toBe("session");

    // Audit: one roster entry for the chunk, no names or passwords in it.
    const audits = await db.auditLog.findMany({ where: { schoolId: school.id, action: "school.roster_import" } });
    expect(audits).toHaveLength(1);
    const serialised = JSON.stringify(audits);
    expect(serialised).not.toContain("Tendai");
    expect(serialised).not.toContain(tendai.temporaryPassword);

    // The same chunk again is refused; a new import of the same students creates nobody.
    expect(
      await errorCodeOf(
        commitRosterChunk(adminActor!, {
          schoolId: school.id,
          importId: dry.importId,
          chunkIndex: 0,
          rows: dry.rows.map(rosterRowForCommit),
          academicYear: "2026",
        }),
      ),
    ).toBe("CONFLICT");
    const again = await validateRosterFile(adminActor!, {
      schoolId: school.id,
      bytes: csv([HEADER, `Tendai,Moyo,${formName},3B,,,0771234567,HHS-1,`, `Rudo,Moyo,${formName},3B,,,0771234567,,`]),
    });
    expect(again.rows.map((r) => r.outcome)).toEqual(["existing", "skip"]);
    const [second] = await commitAll(adminActor!, school.id, again);
    expect(second!.slips).toEqual([]);
    expect(await db.user.count({ where: { provisionedBySchoolId: school.id } })).toBe(3);
  });

  it("leaves consent PENDING unless confirmed, invites existing accounts, and re-validates tampered rows", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const email = uniqueEmail("already");
    const existing = (await createStudent({ email })).user;
    const dry = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv([HEADER, "Panashe,Chari,,,,,,,", `Nyasha,Gumbo,,,${email},,,,`]) });
    const rows = dry.rows.map(rosterRowForCommit);
    // A tampered third row (invalid email) is caught by the server-side re-validation.
    rows.push({ ...rows[0]!, row: 9, firstName: "Evil", email: "not an email" });
    const result = await commitRosterChunk(adminActor!, { schoolId: school.id, importId: dry.importId, chunkIndex: 0, rows, academicYear: "2026" });
    expect(result.results.map((r) => [r.row, r.outcome])).toEqual([
      [2, "create"],
      [3, "invite"],
      [9, "error"],
    ]);
    expect(result.invitationsSent).toBe(1);
    expect(latestDevMessage(email)?.text).toMatch(/\/invite\/[A-Za-z0-9_-]+/);
    expect(await db.schoolMember.count({ where: { schoolId: school.id, userId: existing.id } })).toBe(0);
    const created = await db.student.findUniqueOrThrow({ where: { userId: result.slips[0]!.userId } });
    expect(created).toMatchObject({ guardianConsentStatus: "PENDING", guardianConsentMethod: null });
    expect(await db.user.count({ where: { provisionedBySchoolId: school.id } })).toBe(1);
  });

  it("refuses other schools and malformed requests", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const other = await schoolWithAdmin();
    const row = { row: 2, firstName: "A", lastName: "B", form: null, className: null, email: null, phone: null, parentPhone: null, studentNumber: null, subjects: [] };
    expect(await errorCodeOf(commitRosterChunk(other.adminActor!, { schoolId: school.id, importId: randomUUID(), chunkIndex: 0, rows: [row], academicYear: "2026" }))).toBe("FORBIDDEN");
    expect(await errorCodeOf(commitRosterChunk(adminActor!, { schoolId: school.id, importId: "x", chunkIndex: 0, rows: [row], academicYear: "2026" }))).toBe("VALIDATION");
    expect(await errorCodeOf(commitRosterChunk(adminActor!, { schoolId: school.id, importId: randomUUID(), chunkIndex: 0, rows: Array.from({ length: 51 }, (_, i) => ({ ...row, row: i + 2 })), academicYear: "2026" }))).toBe("VALIDATION");
  });
});
