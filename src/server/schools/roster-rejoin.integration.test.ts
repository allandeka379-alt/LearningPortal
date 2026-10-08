import { describe, expect, it, vi } from "vitest";
import type { Actor } from "@/server/auth/actor";
import { db } from "@/server/db";
import { latestDevMessage } from "@/server/messaging";
import { createSchoolMember, createStudent, uniqueCode, uniqueEmail } from "../../../tests/factories/index";
import { chunkRows, rosterRowForCommit } from "./core";
import { acceptMyInvitation } from "./invitations";
import { commitRosterChunk, validateRosterFile, type RosterDryRun } from "./roster";
import { deactivateStudent, getSchoolStudent } from "./students";
import { actorOf, errorCodeOf, schoolWithAdmin } from "./testing";

// Every optional channel is OFF here, as by default (owner decision 2026-10-07): invitations, reset instructions and
// reminders are account email and go out anyway; nothing is ever texted while SMS is off.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * AUTHZ-5 regression (§23, consent): a roster row matching the admission number of a student who was REMOVED from the
 * school used to put them straight back on the roster (ACTIVE, full record visible to the school) with no invitation
 * and no notice. A student with their own account must now accept an invitation; only a school-managed (provisioned,
 * contact-less) account is re-added directly, and the student is told.
 */

const HEADER = "First name,Last name,Form,Class,Email,Phone,Parent phone,Student number,Subjects";
const csv = (lines: string[]) => new TextEncoder().encode(lines.join("\r\n"));
const studentNumber = () => uniqueCode("RN").slice(0, 20);

async function commitAll(adminActor: Actor, schoolId: string, dry: RosterDryRun) {
  const rows = dry.rows.filter((row) => row.outcome !== "error" && row.outcome !== "skip");
  const results = [];
  for (const [chunkIndex, chunk] of chunkRows(rows).entries()) {
    results.push(
      await commitRosterChunk(adminActor, {
        schoolId,
        importId: dry.importId,
        chunkIndex,
        rows: chunk.map(rosterRowForCommit),
        guardianConsentCollected: false,
        createMissingClasses: true,
        academicYear: "2026",
      }),
    );
  }
  return results;
}

/** A student with their own (verified or not) email account, a member of `schoolId` with an admission number, then removed. */
async function removedStudent(schoolId: string, adminActor: Actor, options: { emailVerified: boolean }) {
  const email = uniqueEmail("former.student");
  const { user } = await createStudent({ firstName: "Rufaro", lastName: "Dube", email, emailVerified: options.emailVerified });
  const { member } = await createSchoolMember({ schoolId, userId: user.id, role: "STUDENT" });
  const number = studentNumber();
  await db.schoolMember.update({ where: { id: member.id }, data: { studentNumber: number } });
  await deactivateStudent(adminActor, { schoolId, userId: user.id });
  expect(await errorCodeOf(getSchoolStudent(adminActor, { schoolId, userId: user.id }))).toBe("NOT_FOUND");
  return { user, member, email, number };
}

describe("AUTHZ-5: roster import never silently re-adds a removed student", () => {
  it("invites a removed student with their own account (matched by number) instead of re-activating them", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const { user, member, email, number } = await removedStudent(school.id, adminActor!, { emailVerified: true });

    const dry = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv([HEADER, `Rufaro,Dube,,,,,,${number},`]) });
    expect(dry.rows.map((row) => row.outcome)).toEqual(["invite"]);
    // The dry run (sent to the admin's browser) never carries the account's own contact.
    expect(JSON.stringify(dry)).not.toContain(email);

    const [result] = await commitAll(adminActor!, school.id, dry);
    expect(result!.results).toEqual([{ row: 2, outcome: "invite", message: "Invitation sent to the student's own email or phone." }]);
    expect(result!.invitationsSent).toBe(1);
    // Still removed: the school regains nothing until the student accepts.
    expect(await db.schoolMember.findUniqueOrThrow({ where: { id: member.id }, select: { status: true } })).toEqual({ status: "REMOVED" });
    expect(await errorCodeOf(getSchoolStudent(adminActor!, { schoolId: school.id, userId: user.id }))).toBe("NOT_FOUND");
    expect(latestDevMessage(email)?.text).toMatch(/\/invite\/[A-Za-z0-9_-]+/);

    // The student accepts: now they are back, by their own choice.
    const invitation = await db.invitation.findFirstOrThrow({ where: { kind: "SCHOOL_MEMBER", schoolId: school.id, target: email, acceptedAt: null } });
    await acceptMyInvitation(await actorOf(user.id), invitation.id);
    expect(await db.schoolMember.findUniqueOrThrow({ where: { id: member.id }, select: { status: true, source: true } })).toEqual({ status: "ACTIVE", source: "INVITE" });
  });

  it("refuses the row when the student's own account has no verified contact and the row gives none", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const { member, number } = await removedStudent(school.id, adminActor!, { emailVerified: false });

    const dry = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv([HEADER, `Rufaro,Dube,,,,,,${number},`]) });
    expect(dry.rows.map((row) => row.outcome)).toEqual(["error"]);
    expect(dry.rows[0]!.issues.map((issue) => issue.message)).toContain(
      "This student left your school earlier and must accept an invitation to rejoin. Add their email or phone to this row, or ask them to request to join your school.",
    );
    // A tampered commit of the same row changes nothing either (re-validated server-side).
    const result = await commitRosterChunk(adminActor!, {
      schoolId: school.id,
      importId: dry.importId,
      chunkIndex: 0,
      rows: dry.rows.map(rosterRowForCommit),
      academicYear: "2026",
    });
    expect(result.results.map((r) => r.outcome)).toEqual(["error"]);
    expect(await db.schoolMember.findUniqueOrThrow({ where: { id: member.id }, select: { status: true } })).toEqual({ status: "REMOVED" });
  });

  it("re-adds a school-managed account directly, tells the student and audits it as a re-activation", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const number = studentNumber();
    const row = `Tendai,Moyo,,,,,,${number},`;
    const [created] = await commitAll(adminActor!, school.id, await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv([HEADER, row]) }));
    const userId = created!.slips[0]!.userId;
    await deactivateStudent(adminActor!, { schoolId: school.id, userId });

    const removedAt = new Date();
    const dry = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv([HEADER, row]) });
    expect(dry.rows.map((r) => r.outcome)).toEqual(["existing"]);
    await commitAll(adminActor!, school.id, dry);

    const member = await db.schoolMember.findFirstOrThrow({ where: { schoolId: school.id, userId, role: "STUDENT" }, select: { id: true, status: true } });
    expect(member.status).toBe("ACTIVE");
    const notices = await db.notification.findMany({ where: { userId, createdAt: { gte: removedAt } }, select: { type: true, dedupeKey: true } });
    expect(notices).toEqual([expect.objectContaining({ type: "account.school_membership", dedupeKey: expect.stringMatching(/^school-roster-readded:/) })]);
    const auditRow = await db.auditLog.findFirst({ where: { schoolId: school.id, entityType: "SchoolMember", entityId: member.id, targetUserId: userId, createdAt: { gte: removedAt } } });
    expect(auditRow?.metadata).toMatchObject({ reactivated: true, matchedBy: "studentNumber" });
  });

  it("still invites (never re-adds) a removed student with their own account when the row also gives a contact", async () => {
    const { school, adminActor } = await schoolWithAdmin();
    const { member, number } = await removedStudent(school.id, adminActor!, { emailVerified: false });
    const typed = uniqueEmail("typed.contact");
    const dry = await validateRosterFile(adminActor!, { schoolId: school.id, bytes: csv([HEADER, `Rufaro,Dube,,,${typed},,,${number},`]) });
    expect(dry.rows.map((row) => row.outcome)).toEqual(["invite"]);
    const [result] = await commitAll(adminActor!, school.id, dry);
    expect(result!.results[0]).toMatchObject({ outcome: "invite" });
    expect(latestDevMessage(typed)?.text).toMatch(/\/invite\//);
    expect(await db.schoolMember.findUniqueOrThrow({ where: { id: member.id }, select: { status: true } })).toEqual({ status: "REMOVED" });
  });
});
