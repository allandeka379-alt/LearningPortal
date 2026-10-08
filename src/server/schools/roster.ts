import "server-only";
import { randomInt, randomUUID } from "node:crypto";
import { maskIdentifier } from "@/server/auth/identifiers";
import { cellToText, parseCsvRows } from "@/server/cms/imports/formats";
import { resolveCurrentSyllabus } from "@/server/curriculum/syllabus";
import { db, type DbClient } from "@/server/db";
import { ensureEnrollmentTx } from "@/server/enrollment/service";
import { auditInTx } from "@/server/lib/audit";
import { randomToken, sha256Hex } from "@/server/lib/crypto";
import { AppError } from "@/server/lib/errors";
import { sniffMimeType } from "@/server/lib/uploads";
import { readFirstSheet, XlsxError } from "@/server/lib/xlsx";
import { sendToContact } from "@/server/messaging";
import { createNotification } from "@/server/notifications";
import { generateJoinCode } from "@/server/teaching/core";
import { upsertMembership } from "@/server/teaching/membership";
import { APP_NAME } from "@/lib/config";
import { assertSchoolAdmin, parseInput, schoolAuditActor, type SchoolActor, type SchoolContext, type SchoolRequestMeta } from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import {
  asciiLetters,
  countOutcomes,
  findDuplicateRosterRows,
  lookupKey,
  mapRosterHeaders,
  MAX_ROSTER_FILE_BYTES,
  MAX_ROSTER_ROWS,
  MAX_ROSTER_XLSX_UNPACKED_BYTES,
  rosterIdentityKey,
  SCHOOL_INVITATION_TTL_DAYS,
  validateRosterRecord,
  type CredentialSlip,
  type RosterField,
  type RosterIssue,
  type RosterOutcome,
  type RosterRow,
} from "./core";
import { allocatePublicHandle, allocateUsernames, issueTemporaryPassword } from "./credentials";
import { invitationLink } from "./invitations";
import { assertSchoolLimit } from "./limits";
import { rosterCommitSchema, schoolRefSchema } from "./schemas";

/**
 * Roster import (§23 "manage students"; ARCHITECTURE §3.11 imports, §5.12 minors).
 *
 * 1. DRY RUN ({@link validateRosterFile}): a CSV or Excel (.xlsx) file (type decided by magic bytes, ≤ 2 MB, ≤ 1,000
 *    rows) with the columns first name, last name, form/year, class, and optional email, phone, parent phone, student
 *    number and subjects. Every row gets an outcome (`create` / `invite` / `existing` / `skip` / `error`) and its
 *    problems. Nothing is written and the file is NOT stored: the validated rows go back to the admin's browser.
 * 2. COMMIT ({@link commitRosterChunk}): the browser sends the rows back in chunks of 50; each chunk is RE-VALIDATED in
 *    full (exactly as if uploaded again) and written in one transaction. `create` rows become school-provisioned
 *    USERNAME accounts (`User.loginUsername` + Argon2id hash of a generated temporary password +
 *    `provisionedBySchoolId`; a parent phone becomes the shared `contactPhoneE164`, so siblings may share it). The
 *    passwords are returned ONCE for printable credential slips and never stored in plain text. Students are placed
 *    in their class (created when missing, if allowed) and enrolled in the class subject and listed subjects
 *    (source SCHOOL).
 *
 * Privacy (§5.12): a student's own email / phone in the file is used ONLY to find an existing account (that student is
 * invited to join instead of getting a duplicate account); it is not copied onto new accounts. Guardian consent is
 * recorded as GRANTED by method SCHOOL only when the admin confirms the school collected it; otherwise it stays PENDING.
 * Each chunk is idempotent: a chunk already saved (same import id and chunk number) is refused, and re-importing the
 * same students skips them (same admission number, or same name in the same class).
 *
 * Former members (§23, consent): a row matching the admission number of a student who is no longer an ACTIVE member
 * (removed, or invited and not yet accepted) never re-activates them silently. A student with their own account is
 * INVITED to rejoin (at their own verified email / phone, else the row's) and is added back only when they accept, like
 * any other existing account. Only an account this school provisioned itself (no contact of its own) or a student who
 * asked to join (REQUESTED) is re-activated directly, and the student is told in the app.
 */

const ROSTER_LOCK_KEY = "schools.roster";
const TX_OPTIONS = { maxWait: 15_000, timeout: 90_000 } as const;
const DAY_MS = 86_400_000;

// =====================================================================================================================
// Reading the file
// =====================================================================================================================

const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

function fileIssue(message: string): RosterIssue {
  return { row: 0, severity: "error", message };
}

/** Reads the uploaded bytes into raw rows (no validation of content). */
export async function readRosterTable(bytes: Uint8Array): Promise<{ format: "CSV" | "XLSX" | null; rows: string[][]; issues: RosterIssue[] }> {
  if (bytes.byteLength === 0) return { format: null, rows: [], issues: [fileIssue("The file is empty.")] };
  if (bytes.byteLength > MAX_ROSTER_FILE_BYTES) {
    return { format: null, rows: [], issues: [fileIssue("The file is larger than 2 MB. Split the roster into smaller files (for example one per form).")] };
  }
  const type = sniffMimeType(bytes);
  if (type === XLSX_MIME) {
    try {
      // Bounded unpacking (decompression bombs): the 2 MB cap above only limits the compressed bytes.
      const sheet = await readFirstSheet(bytes, { maxUncompressedBytes: MAX_ROSTER_XLSX_UNPACKED_BYTES });
      return { format: "XLSX", rows: sheet.map((cells) => (Array.isArray(cells) ? cells.map(cellToText) : [])), issues: [] };
    } catch (error) {
      if (error instanceof XlsxError && error.kind === "too_large") {
        return {
          format: "XLSX",
          rows: [],
          issues: [fileIssue("This Excel file holds too much data once unpacked. Keep only the student list on one sheet, or export it as CSV.")],
        };
      }
      return { format: "XLSX", rows: [], issues: [fileIssue("This Excel file could not be read. Save it again from Excel, or export it as CSV.")] };
    }
  }
  if (type === "text/csv") {
    let text: string;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^﻿/, "");
    } catch {
      return { format: "CSV", rows: [], issues: [fileIssue("The file is not UTF-8 text. In Excel use “Save as → CSV UTF-8”, or upload the .xlsx file.")] };
    }
    const parsed = parseCsvRows(text);
    const issues: RosterIssue[] = parsed.issues.map((issue) => ({ row: issue.row, severity: issue.severity, message: issue.message }));
    return { format: "CSV", rows: issues.some((issue) => issue.severity === "error") ? [] : parsed.rows, issues };
  }
  return { format: null, rows: [], issues: [fileIssue("Upload a CSV file or an Excel workbook (.xlsx).")] };
}

/** Raw rows → validated roster rows (pure: header mapping, row validation, in-file duplicates). */
export function parseRosterRows(rows: readonly (readonly string[])[]): { rows: RosterRow[]; issues: RosterIssue[]; rowIssues: Map<number, RosterIssue[]> } {
  const headerIndex = rows.findIndex((cells) => cells.some((cell) => cell.trim() !== ""));
  if (headerIndex < 0) return { rows: [], issues: [fileIssue("The file is empty. Download the template to see the expected columns.")], rowIssues: new Map() };
  const mapping = mapRosterHeaders(rows[headerIndex] ?? []);
  if (mapping.issues.some((issue) => issue.severity === "error")) return { rows: [], issues: mapping.issues, rowIssues: new Map() };
  const out: RosterRow[] = [];
  const rowIssues = new Map<number, RosterIssue[]>();
  for (let index = headerIndex + 1; index < rows.length; index += 1) {
    const cells = rows[index] ?? [];
    if (!cells.some((cell) => cell.trim() !== "")) continue;
    if (out.length >= MAX_ROSTER_ROWS) {
      return { rows: [], issues: [fileIssue(`The file has more than ${MAX_ROSTER_ROWS.toLocaleString("en")} students. Split it into smaller files.`)], rowIssues: new Map() };
    }
    const values: Partial<Record<RosterField, string>> = {};
    for (const [field, column] of Object.entries(mapping.columns) as [RosterField, number][]) values[field] = cells[column] ?? "";
    const { value, issues } = validateRosterRecord(index + 1, values);
    out.push(value);
    if (issues.length) rowIssues.set(value.row, issues);
  }
  if (out.length === 0) return { rows: [], issues: [...mapping.issues, fileIssue("The file has a header row but no students.")], rowIssues: new Map() };
  for (const issue of findDuplicateRosterRows(out)) rowIssues.set(issue.row, [...(rowIssues.get(issue.row) ?? []), issue]);
  return { rows: out, issues: mapping.issues, rowIssues };
}

// =====================================================================================================================
// Analysis against the school's data (shared by the dry run and the commit)
// =====================================================================================================================

/** A school member found by admission number. */
interface NumberMatch {
  userId: string;
  status: string;
  firstName: string;
  lastName: string;
  /** A USERNAME account this school provisioned that has no email / phone of its own (the school manages it). */
  schoolManaged: boolean;
  /** The account's own VERIFIED email (else phone), to invite it to rejoin. Server-side only: never sent to the browser. */
  ownContact: string | null;
}

interface RosterContext {
  yearGroups: Map<string, string>;
  /** Class name key → the newest non-archived class with that name. */
  classes: Map<string, { id: string; name: string; subjectId: string | null }>;
  /** Subject name / code key → offered subject id. */
  subjects: Map<string, string>;
  /** Accounts using an email / phone of the file. */
  accounts: Map<string, { userId: string; activeHere: boolean; memberStatus: string | null }>;
  /** Members of this school by admission number (lower-case). */
  numbers: Map<string, NumberMatch>;
  /** Identity keys (name + class) of ACTIVE class members. */
  classIdentities: Set<string>;
  /** first|last keys of ACTIVE students of the school. */
  schoolNames: Set<string>;
}

async function loadRosterContext(school: SchoolContext, rows: readonly RosterRow[], client: DbClient = db): Promise<RosterContext> {
  const contacts = [...new Set(rows.flatMap((row) => [row.email, row.phone]).filter((v): v is string => v !== null))];
  const numbers = [...new Set(rows.map((row) => row.studentNumber).filter((v): v is string => v !== null))];
  const lastNames = [...new Set(rows.map((row) => row.lastName.toLowerCase()).filter(Boolean))];

  // Sequential on purpose: inside a transaction the queries share one connection.
  const yearGroups = await client.yearGroup.findMany({ where: { countryId: school.countryId, isActive: true }, select: { id: true, code: true, name: true } });
  const classes = await client.class.findMany({
    where: { schoolId: school.schoolId, archivedAt: null },
    select: { id: true, name: true, subjectId: true, academicYear: true, createdAt: true },
    orderBy: [{ academicYear: "desc" }, { createdAt: "desc" }],
    take: 2_000,
  });
  const subjects = await client.schoolSubject.findMany({
    where: { schoolId: school.schoolId, isActive: true },
    select: { subject: { select: { id: true, name: true, shortName: true, officialCode: true } } },
  });
  const accounts = contacts.length
    ? await client.user.findMany({
        where: { OR: [{ emailNormalized: { in: contacts } }, { phoneE164: { in: contacts } }] },
        select: {
          id: true,
          emailNormalized: true,
          phoneE164: true,
          schoolMemberships: { where: { schoolId: school.schoolId, role: "STUDENT" }, select: { status: true } },
        },
      })
    : [];
  const numberRows = numbers.length
    ? await client.schoolMember.findMany({
        where: { schoolId: school.schoolId, studentNumber: { in: numbers, mode: "insensitive" } },
        select: {
          userId: true,
          status: true,
          studentNumber: true,
          user: {
            select: {
              provisionedBySchoolId: true,
              emailNormalized: true,
              emailVerifiedAt: true,
              phoneE164: true,
              phoneVerifiedAt: true,
              profile: { select: { firstName: true, lastName: true } },
            },
          },
        },
      })
    : [];
  const nameRows = lastNames.length
    ? await client.$queryRaw<{ userId: string; firstName: string | null; lastName: string | null }[]>`
        SELECT m."userId"::text AS "userId", p."firstName", p."lastName"
        FROM "SchoolMember" m JOIN "Profile" p ON p."userId" = m."userId"
        WHERE m."schoolId" = ${school.schoolId}::uuid AND m."role" = 'STUDENT' AND m."status" = 'ACTIVE'
          AND lower(p."lastName") = ANY(${lastNames}::text[])`
    : [];

  const yearGroupMap = new Map<string, string>();
  for (const group of yearGroups) {
    yearGroupMap.set(lookupKey(group.name), group.id);
    yearGroupMap.set(lookupKey(group.code), group.id);
  }
  const classMap = new Map<string, { id: string; name: string; subjectId: string | null }>();
  for (const cls of classes) if (!classMap.has(lookupKey(cls.name))) classMap.set(lookupKey(cls.name), { id: cls.id, name: cls.name, subjectId: cls.subjectId });
  const subjectMap = new Map<string, string>();
  for (const { subject } of subjects) {
    for (const key of [subject.name, subject.shortName, subject.officialCode]) if (key) subjectMap.set(lookupKey(key), subject.id);
  }
  const accountMap = new Map<string, { userId: string; activeHere: boolean; memberStatus: string | null }>();
  for (const user of accounts) {
    const status = user.schoolMemberships[0]?.status ?? null;
    const entry = { userId: user.id, activeHere: status === "ACTIVE", memberStatus: status };
    if (user.emailNormalized) accountMap.set(user.emailNormalized, entry);
    if (user.phoneE164) accountMap.set(user.phoneE164, entry);
  }
  const numberMap = new Map<string, NumberMatch>();
  for (const row of numberRows) {
    if (row.studentNumber) {
      const { user } = row;
      numberMap.set(row.studentNumber.toLowerCase(), {
        userId: row.userId,
        status: row.status,
        firstName: user.profile?.firstName ?? "",
        lastName: user.profile?.lastName ?? "",
        schoolManaged: user.provisionedBySchoolId === school.schoolId && user.emailNormalized === null && user.phoneE164 === null,
        ownContact: (user.emailVerifiedAt !== null ? user.emailNormalized : null) ?? (user.phoneVerifiedAt !== null ? user.phoneE164 : null),
      });
    }
  }
  const schoolNames = new Set(nameRows.map((row) => `${asciiLetters(row.firstName ?? "")}|${asciiLetters(row.lastName ?? "")}`));

  // Name + class identities of current class members, for the classes the file mentions.
  const mentioned = [...new Set(rows.map((row) => (row.className ? classMap.get(lookupKey(row.className))?.id : undefined)).filter((v): v is string => !!v))];
  const members = mentioned.length
    ? await client.classMember.findMany({
        where: { classId: { in: mentioned }, status: "ACTIVE" },
        select: { class: { select: { name: true } }, user: { select: { profile: { select: { firstName: true, lastName: true } } } } },
      })
    : [];
  const classIdentities = new Set(
    members.map((m) => rosterIdentityKey({ firstName: m.user.profile?.firstName ?? "", lastName: m.user.profile?.lastName ?? "", className: m.class.name })),
  );
  return { yearGroups: yearGroupMap, classes: classMap, subjects: subjectMap, accounts: accountMap, numbers: numberMap, classIdentities, schoolNames };
}

export interface RosterRowResult extends RosterRow {
  outcome: RosterOutcome;
  issues: RosterIssue[];
  /** The class will be created by the commit. */
  newClass: boolean;
}

/**
 * Where to send an "invite" row's invitation: a former member matched by admission number at their account's own
 * verified contact (else the row's); anyone else at the row's email / phone. Null when there is nowhere to send it.
 */
function rejoinInviteTarget(row: RosterRow, context: RosterContext): string | null {
  const byNumber = row.studentNumber ? context.numbers.get(row.studentNumber.toLowerCase()) : undefined;
  const own = byNumber && byNumber.status !== "ACTIVE" ? byNumber.ownContact : null;
  return own ?? row.email ?? row.phone;
}

/** Decides each row's outcome against the school's current data. */
function analyseRows(rows: readonly RosterRow[], rowIssues: Map<number, RosterIssue[]>, context: RosterContext): RosterRowResult[] {
  return rows.map((row) => {
    const issues = [...(rowIssues.get(row.row) ?? [])];
    const warn = (field: RosterField, message: string) => issues.push({ row: row.row, field, severity: "warning", message });
    if (row.form && !context.yearGroups.has(lookupKey(row.form))) warn("form", `Form "${row.form}" isn't recognised; it will be left blank.`);
    const cls = row.className ? context.classes.get(lookupKey(row.className)) : undefined;
    const newClass = row.className !== null && cls === undefined;
    if (newClass) warn("className", `A new class "${row.className}" will be created.`);
    if (!row.className) warn("className", "No class: the student joins the school but no class.");
    for (const subject of row.subjects) {
      if (!context.subjects.has(lookupKey(subject))) warn("subjects", `"${subject}" isn't one of your school's subjects; it is skipped.`);
    }

    let outcome: RosterOutcome = "create";
    if (issues.some((issue) => issue.severity === "error")) {
      outcome = "error";
    } else {
      const byNumber = row.studentNumber ? context.numbers.get(row.studentNumber.toLowerCase()) : undefined;
      const contact = row.email ?? row.phone;
      const account = contact ? context.accounts.get(contact) : undefined;
      if (byNumber) {
        const sameName = asciiLetters(byNumber.firstName) === asciiLetters(row.firstName) && asciiLetters(byNumber.lastName) === asciiLetters(row.lastName);
        if (!sameName) {
          issues.push({ row: row.row, field: "studentNumber", severity: "error", message: `Student number ${row.studentNumber} belongs to another student at your school.` });
          outcome = "error";
        } else if (byNumber.status === "ACTIVE") {
          outcome = "existing";
        } else if (byNumber.status === "REQUESTED") {
          outcome = "existing";
          warn("studentNumber", "This student asked to join your school: the import approves the request. They are told in the app.");
        } else if (byNumber.schoolManaged) {
          outcome = "existing";
          warn("studentNumber", "This student was removed earlier and will be added back. They are told in the app.");
        } else if (rejoinInviteTarget(row, context) !== null) {
          // Their own account: nobody joins (and exposes their learning data to) a school without accepting.
          outcome = "invite";
          warn("studentNumber", "This student left your school earlier: they are invited to rejoin and are added back only when they accept.");
        } else {
          issues.push({
            row: row.row,
            field: "studentNumber",
            severity: "error",
            message:
              "This student left your school earlier and must accept an invitation to rejoin. Add their email or phone to this row, or ask them to request to join your school.",
          });
          outcome = "error";
        }
      } else if (account) {
        if (account.activeHere) {
          outcome = "existing";
        } else {
          outcome = "invite";
          warn(row.email ? "email" : "phone", "This email or phone already has an account: the student is invited to join instead of getting a new account.");
        }
      } else if (cls && context.classIdentities.has(rosterIdentityKey(row))) {
        outcome = "skip";
        warn("firstName", `A student with this name is already in ${cls.name}; this row is skipped. Add student numbers to import them separately.`);
      } else if (context.schoolNames.has(`${asciiLetters(row.firstName)}|${asciiLetters(row.lastName)}`)) {
        warn("firstName", "A student with this name is already at your school. Check this is a different person.");
      }
    }
    return { ...row, outcome, issues, newClass };
  });
}

// =====================================================================================================================
// Dry run
// =====================================================================================================================

export interface RosterDryRun {
  /** Identifies this import's commit chunks (idempotency). */
  importId: string;
  format: "CSV" | "XLSX" | null;
  fileIssues: RosterIssue[];
  totals: Record<RosterOutcome, number>;
  rows: RosterRowResult[];
  /** Classes the commit would create. */
  newClasses: string[];
}

/** Validates a roster file without writing anything (see the module docs). */
export async function validateRosterFile(actor: SchoolActor, input: { schoolId: string; bytes: Uint8Array }): Promise<RosterDryRun> {
  const { schoolId } = parseInput(schoolRefSchema, { schoolId: input.schoolId });
  const school = await assertSchoolAdmin(actor, schoolId);
  await assertSchoolLimit("rosterValidate", actor.userId, "You have checked many files. Please try again later.");
  const importId = randomUUID();
  const table = await readRosterTable(input.bytes);
  if (table.issues.some((issue) => issue.severity === "error")) {
    return { importId, format: table.format, fileIssues: table.issues, totals: countOutcomes([]), rows: [], newClasses: [] };
  }
  const parsed = parseRosterRows(table.rows);
  if (parsed.rows.length === 0) {
    return { importId, format: table.format, fileIssues: [...table.issues, ...parsed.issues], totals: countOutcomes([]), rows: [], newClasses: [] };
  }
  const context = await loadRosterContext(school, parsed.rows);
  const rows = analyseRows(parsed.rows, parsed.rowIssues, context);
  const newClasses = [...new Map(rows.filter((row) => row.newClass && row.outcome !== "error" && row.className).map((row) => [lookupKey(row.className!), row.className!])).values()];
  return {
    importId,
    format: table.format,
    fileIssues: [...table.issues, ...parsed.issues],
    totals: countOutcomes(rows.map((row) => row.outcome)),
    rows,
    newClasses,
  };
}

// =====================================================================================================================
// Commit (one chunk)
// =====================================================================================================================

export interface RosterChunkResult {
  chunkIndex: number;
  results: { row: number; outcome: RosterOutcome; message: string | null }[];
  /** Credentials of new accounts: shown ONCE (print them now). */
  slips: CredentialSlip[];
  invitationsSent: number;
  invitationsUndelivered: number;
  classesCreated: string[];
}

function chunkKey(importId: string, chunkIndex: number): string {
  return `${importId}:${chunkIndex}`;
}

async function chunkAlreadySaved(client: DbClient, importId: string, chunkIndex: number): Promise<boolean> {
  const row = await client.auditLog.findFirst({
    where: { action: SCHOOL_AUDIT.ROSTER_IMPORT, entityType: "RosterImport", entityId: chunkKey(importId, chunkIndex) },
    select: { id: true },
  });
  return row !== null;
}

async function mapWithConcurrency<T, R>(items: readonly T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      out[index] = await fn(items[index] as T);
    }
  });
  await Promise.all(workers);
  return out;
}

async function uniqueJoinCode(client: DbClient): Promise<string> {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = generateJoinCode((max) => randomInt(0, max));
    if (!(await client.class.findUnique({ where: { joinCode: code }, select: { id: true } }))) return code;
  }
  throw new AppError("INTERNAL", "Could not create a class join code. Please try again.");
}

/** Commits one chunk of a validated roster (see the module docs). */
export async function commitRosterChunk(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<RosterChunkResult> {
  const data = parseInput(rosterCommitSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  await assertSchoolLimit("rosterCommit", actor.userId, "Too many import requests. Please wait a few minutes and try again.");
  if (await chunkAlreadySaved(db, data.importId, data.chunkIndex)) {
    throw AppError.conflict("This part of the import was already saved. If you lost the credential slips, reset those students' passwords on the Students page.");
  }
  const now = options.now ?? new Date();

  // Re-validate every row exactly as an upload would be (the rows came back from the browser).
  const revalidated: RosterRow[] = [];
  const rowIssues = new Map<number, RosterIssue[]>();
  for (const raw of data.rows) {
    const { value, issues } = validateRosterRecord(raw.row, {
      firstName: raw.firstName,
      lastName: raw.lastName,
      form: raw.form ?? "",
      className: raw.className ?? "",
      email: raw.email ?? "",
      phone: raw.phone ?? "",
      parentPhone: raw.parentPhone ?? "",
      studentNumber: raw.studentNumber ?? "",
      subjects: raw.subjects.join(";"),
    });
    revalidated.push(value);
    if (issues.length) rowIssues.set(value.row, issues);
  }
  for (const issue of findDuplicateRosterRows(revalidated)) rowIssues.set(issue.row, [...(rowIssues.get(issue.row) ?? []), issue]);

  const preContext = await loadRosterContext(school, revalidated);
  const preliminary = analyseRows(revalidated, rowIssues, preContext);
  const toCreate = preliminary.filter((row) => row.outcome === "create");
  // Argon2 hashing is slow on purpose: do it before the transaction (bounded concurrency).
  const passwords = await mapWithConcurrency(toCreate, 4, async (row) => ({ row: row.row, ...(await issueTemporaryPassword()) }));
  const passwordByRow = new Map(passwords.map((p) => [p.row, p]));

  // Subjects that can be enrolled (published syllabus), resolved once.
  const subjectIds = new Set<string>();
  for (const row of preliminary) {
    for (const name of row.subjects) {
      const id = preContext.subjects.get(lookupKey(name));
      if (id) subjectIds.add(id);
    }
    const cls = row.className ? preContext.classes.get(lookupKey(row.className)) : undefined;
    if (cls?.subjectId) subjectIds.add(cls.subjectId);
  }
  const enrollable = new Set<string>();
  for (const subjectId of subjectIds) if (await resolveCurrentSyllabus(subjectId, null)) enrollable.add(subjectId);

  const invitationsToSend: { target: string; token: string }[] = [];
  const outcome = await db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT 1 AS locked FROM (SELECT pg_advisory_xact_lock(hashtextextended(${ROSTER_LOCK_KEY}, 0))) l`;
    if (await chunkAlreadySaved(tx, data.importId, data.chunkIndex)) {
      throw AppError.conflict("This part of the import was already saved. If you lost the credential slips, reset those students' passwords on the Students page.");
    }
    // Re-analyse under the lock: an earlier chunk (or a parallel import) may have added some of these students.
    const context = await loadRosterContext(school, revalidated, tx);
    const rows = analyseRows(revalidated, rowIssues, context);
    const totals = countOutcomes(rows.map((row) => row.outcome));

    const auditId = await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.ROSTER_IMPORT,
      entityType: "RosterImport",
      entityId: chunkKey(data.importId, data.chunkIndex),
      schoolId: school.schoolId,
      after: { ...totals },
      metadata: {
        operation: SCHOOL_AUDIT_OPERATIONS.rosterCommit,
        importId: data.importId,
        chunkIndex: data.chunkIndex,
        rows: rows.length,
        guardianConsentCollected: data.guardianConsentCollected,
      },
      request: meta ?? null,
    });
    if (data.guardianConsentCollected && totals.create > 0) {
      await auditInTx(tx, {
        ...schoolAuditActor(actor),
        action: SCHOOL_AUDIT.CONSENT_GRANT,
        entityType: "RosterImport",
        entityId: chunkKey(data.importId, data.chunkIndex),
        schoolId: school.schoolId,
        metadata: { operation: SCHOOL_AUDIT_OPERATIONS.guardianConsent, method: "SCHOOL", students: totals.create, rosterAuditId: auditId },
        request: meta ?? null,
      });
    }

    // Classes: existing, or created once per name (under the lock).
    const classesCreated: string[] = [];
    const classIdByKey = new Map<string, { id: string; name: string; subjectId: string | null }>(context.classes);
    for (const row of rows) {
      if (row.outcome === "error" || row.outcome === "skip" || row.outcome === "invite" || !row.className) continue;
      const key = lookupKey(row.className);
      if (classIdByKey.has(key) || !data.createMissingClasses) continue;
      const created = await tx.class.create({
        data: {
          schoolId: school.schoolId,
          name: row.className,
          academicYear: data.academicYear,
          joinCode: await uniqueJoinCode(tx),
          createdById: actor.userId,
          yearGroupId: row.form ? (context.yearGroups.get(lookupKey(row.form)) ?? null) : null,
        },
        select: { id: true, name: true, subjectId: true },
      });
      classIdByKey.set(key, created);
      classesCreated.push(created.name);
      await auditInTx(tx, {
        ...schoolAuditActor(actor),
        action: SCHOOL_AUDIT.CLASS_CREATE,
        entityType: "Class",
        entityId: created.id,
        schoolId: school.schoolId,
        after: { name: created.name, academicYear: data.academicYear },
        metadata: { operation: SCHOOL_AUDIT_OPERATIONS.classCreate, via: "roster_import" },
        request: meta ?? null,
      });
    }

    const usernames = await allocateUsernames(
      tx,
      school.slug,
      rows.filter((row) => row.outcome === "create").map((row) => ({ key: String(row.row), firstName: row.firstName, lastName: row.lastName })),
    );

    const results: RosterChunkResult["results"] = [];
    const slips: CredentialSlip[] = [];
    for (const row of rows) {
      const cls = row.className ? classIdByKey.get(lookupKey(row.className)) : undefined;
      const yearGroupId = row.form ? (context.yearGroups.get(lookupKey(row.form)) ?? null) : null;
      const rowSubjects = new Set<string>();
      for (const name of row.subjects) {
        const id = context.subjects.get(lookupKey(name));
        if (id && enrollable.has(id)) rowSubjects.add(id);
      }
      if (cls?.subjectId && enrollable.has(cls.subjectId)) rowSubjects.add(cls.subjectId);
      const firstError = row.issues.find((issue) => issue.severity === "error")?.message ?? null;

      if (row.outcome === "error" || row.outcome === "skip") {
        const lastWarning = [...row.issues].reverse().find((issue) => issue.severity === "warning")?.message ?? null;
        results.push({ row: row.row, outcome: row.outcome, message: firstError ?? lastWarning });
        continue;
      }

      if (row.outcome === "invite") {
        const target = rejoinInviteTarget(row, context);
        if (target === null) {
          results.push({ row: row.row, outcome: "skip", message: "There is no email or phone to invite this student; nothing was changed." });
          continue;
        }
        const token = randomToken(32);
        const pending = await tx.invitation.findFirst({
          where: { kind: "SCHOOL_MEMBER", schoolId: school.schoolId, schoolRole: "STUDENT", target, acceptedAt: null, revokedAt: null, expiresAt: { gt: now } },
          select: { id: true, sendCount: true },
        });
        const expiresAt = new Date(now.getTime() + SCHOOL_INVITATION_TTL_DAYS * DAY_MS);
        const invitation = pending
          ? await tx.invitation.update({
              where: { id: pending.id },
              data: { tokenHash: sha256Hex(token), expiresAt, lastSentAt: now, sendCount: Math.min(32_767, pending.sendCount + 1), invitedById: actor.userId },
              select: { id: true },
            })
          : await tx.invitation.create({
              data: { kind: "SCHOOL_MEMBER", schoolId: school.schoolId, schoolRole: "STUDENT", channel: target.includes("@") ? "EMAIL" : "SMS", target, tokenHash: sha256Hex(token), invitedById: actor.userId, expiresAt, lastSentAt: now },
              select: { id: true },
            });
        await auditInTx(tx, {
          ...schoolAuditActor(actor),
          action: pending ? SCHOOL_AUDIT.INVITATION_RESEND : SCHOOL_AUDIT.INVITATION_CREATE,
          entityType: "Invitation",
          entityId: invitation.id,
          schoolId: school.schoolId,
          after: { role: "STUDENT", expiresAt: expiresAt.toISOString() },
          metadata: { operation: SCHOOL_AUDIT_OPERATIONS.studentInvite, via: "roster_import", importId: data.importId },
          request: meta ?? null,
        });
        invitationsToSend.push({ target, token });
        // A former member's own contact (not in the file) is never shown to the school, not even masked.
        const fromFile = target === row.email || target === row.phone;
        results.push({ row: row.row, outcome: "invite", message: fromFile ? `Invitation sent to ${maskIdentifier(target)}.` : "Invitation sent to the student's own email or phone." });
        continue;
      }

      let userId: string;
      if (row.outcome === "existing") {
        const byNumber = row.studentNumber ? context.numbers.get(row.studentNumber.toLowerCase()) : undefined;
        const contact = row.email ?? row.phone;
        const existingId = byNumber?.userId ?? (contact ? context.accounts.get(contact)?.userId : undefined);
        if (!existingId) {
          results.push({ row: row.row, outcome: "skip", message: "This student could not be matched again; nothing was changed." });
          continue;
        }
        userId = existingId;
        const member = await tx.schoolMember.findUnique({
          where: { schoolId_userId_role: { schoolId: school.schoolId, userId, role: "STUDENT" } },
          select: { id: true, status: true, studentNumber: true },
        });
        if (member && member.status !== "ACTIVE") {
          // Only a join request or a school-managed account is re-activated directly (module docs); anyone else must accept
          // an invitation. analyseRows decided so under the lock already; this re-checks it where the write happens.
          if (member.status !== "REQUESTED" && !byNumber?.schoolManaged) {
            results.push({ row: row.row, outcome: "skip", message: "This student must accept an invitation to rejoin; nothing was changed." });
            continue;
          }
          const account = await tx.user.findUnique({ where: { id: userId }, select: { status: true, roles: true } });
          if (account?.status !== "ACTIVE" || !account.roles.includes("STUDENT")) {
            results.push({ row: row.row, outcome: "skip", message: "This account is not active, so the student can't be added back." });
            continue;
          }
          await tx.schoolMember.update({
            where: { id: member.id },
            data: { status: "ACTIVE", joinedAt: now, removedAt: null, removedById: null, source: "ROSTER_IMPORT" },
            select: { id: true },
          });
          await auditInTx(tx, {
            ...schoolAuditActor(actor),
            action: SCHOOL_AUDIT.MEMBER_ADD,
            entityType: "SchoolMember",
            entityId: member.id,
            schoolId: school.schoolId,
            targetUserId: userId,
            before: { status: member.status },
            after: { role: "STUDENT", status: "ACTIVE" },
            metadata: { operation: SCHOOL_AUDIT_OPERATIONS.rosterCommit, importId: data.importId, reactivated: true, matchedBy: "studentNumber" },
            request: meta ?? null,
          });
          // The student is always told when a school puts them (back) on its roster.
          await createNotification(
            userId,
            {
              type: "account.school_membership",
              category: "ACCOUNT",
              title: `You're on ${school.name}'s student roster`.slice(0, 200),
              body: `${school.name} added you to its student roster from a class list. Your teachers can now add you to classes.`.slice(0, 2_000),
              data: { href: "/app", entityType: "School", entityId: school.schoolId },
              dedupeKey: `school-roster-readded:${member.id}:${now.getTime()}`,
            },
            { client: tx },
          );
        }
        if (member && !member.studentNumber && row.studentNumber) {
          const taken = await tx.schoolMember.findFirst({ where: { schoolId: school.schoolId, studentNumber: row.studentNumber }, select: { id: true } });
          if (!taken) await tx.schoolMember.update({ where: { id: member.id }, data: { studentNumber: row.studentNumber }, select: { id: true } });
        }
        results.push({ row: row.row, outcome: "existing", message: cls ? `Placed in ${cls.name}.` : null });
      } else {
        // create
        const username = usernames.get(String(row.row));
        const secret = passwordByRow.get(row.row);
        if (!username || !secret) throw new AppError("INTERNAL", "Could not prepare the new accounts. Please try again.");
        const consent = data.guardianConsentCollected
          ? { guardianConsentStatus: "GRANTED" as const, guardianConsentAt: now, guardianConsentMethod: "SCHOOL" as const, guardianConsentEvidenceRef: `AuditLog:${auditId}` }
          : { guardianConsentStatus: "PENDING" as const };
        const user = await tx.user.create({
          data: {
            loginUsername: username,
            passwordHash: secret.passwordHash,
            passwordUpdatedAt: now,
            // The school knows this password (printed slip): the student chooses their own at first sign-in.
            passwordMustChange: true,
            roles: ["STUDENT"],
            provisionedBySchoolId: school.schoolId,
            contactPhoneE164: row.parentPhone,
            signupChannel: "WEB",
            profile: {
              create: {
                firstName: row.firstName,
                lastName: row.lastName,
                displayName: row.firstName,
                username: await allocatePublicHandle(tx),
                timezone: school.timezone,
              },
            },
            student: {
              create: {
                countryId: school.countryId,
                yearGroupId,
                schoolId: school.schoolId,
                isMinor: true,
                ...consent,
              },
            },
          },
          select: { id: true },
        });
        userId = user.id;
        await tx.schoolMember.create({
          data: {
            schoolId: school.schoolId,
            userId,
            role: "STUDENT",
            status: "ACTIVE",
            source: "ROSTER_IMPORT",
            studentNumber: row.studentNumber,
            invitedById: actor.userId,
            invitedAt: now,
            joinedAt: now,
          },
          select: { id: true },
        });
        slips.push({ userId, name: `${row.firstName} ${row.lastName}`.trim(), className: cls?.name ?? null, username, temporaryPassword: secret.password });
        results.push({ row: row.row, outcome: "create", message: null });
      }

      if (cls) await upsertMembership(tx, { classId: cls.id, userId, status: "ACTIVE", source: "ROSTER_IMPORT", now });
      for (const subjectId of rowSubjects) await ensureEnrollmentTx(tx, userId, subjectId, { source: "SCHOOL", now });
    }
    return { results, slips, classesCreated };
  }, TX_OPTIONS);

  // Links are emailed (account email; a phone number gets an SMS only while SMS is switched on); anything not sent can
  // be re-sent from the Students page, which shows the new link to share.
  let undelivered = 0;
  for (const { target, token } of invitationsToSend) {
    const outcome = await sendToContact(target, {
      subject: `You're invited to ${school.name} on ${APP_NAME}`,
      text: `${school.name} invited you to join as a student on ${APP_NAME}. Sign in and accept here: ${invitationLink(token)} . The link works for ${SCHOOL_INVITATION_TTL_DAYS} days.`,
      tag: "school.invitation",
      sensitive: true,
    });
    if (outcome.status !== "sent") undelivered += 1;
  }
  return {
    chunkIndex: data.chunkIndex,
    results: outcome.results,
    slips: outcome.slips,
    invitationsSent: invitationsToSend.length - undelivered,
    invitationsUndelivered: undelivered,
    classesCreated: outcome.classesCreated,
  };
}
