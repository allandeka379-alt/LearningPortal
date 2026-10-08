import { normalizeEmail, normalizePhone, LOGIN_USERNAME_PATTERN } from "@/server/auth/identifiers";

/**
 * Pure rules of the school administration area (§23, §53; CLAUDE.md rule 2): school-issued usernames and temporary
 * passwords, roster-file validation (dry run), CSV building for reports, seat usage and invitation states. No I/O and
 * no `server-only`, so the rules are unit tested (core.test.ts) and UI code may import the constants.
 */

// =====================================================================================================================
// Shared vocabulary
// =====================================================================================================================

/** School roles a school admin may invite (SCHOOL_ADMIN is granted by platform staff only, ARCHITECTURE §5.2). */
export const SCHOOL_INVITABLE_ROLES = ["TEACHER", "STUDENT"] as const;
export type SchoolInvitableRole = (typeof SCHOOL_INVITABLE_ROLES)[number];

/** Invitation links work for this many days (same window as the admin console). */
export const SCHOOL_INVITATION_TTL_DAYS = 14;

export type InvitationState = "PENDING" | "ACCEPTED" | "EXPIRED" | "REVOKED";

/** Lifecycle state of an invitation row at `now`. */
export function invitationState(invitation: { acceptedAt: Date | null; revokedAt: Date | null; expiresAt: Date }, now: Date): InvitationState {
  if (invitation.acceptedAt) return "ACCEPTED";
  if (invitation.revokedAt) return "REVOKED";
  if (invitation.expiresAt.getTime() <= now.getTime()) return "EXPIRED";
  return "PENDING";
}

/** A person's name for school lists: display name, else first + last, else a neutral label. Never contact details. */
export function personName(
  profile: { displayName?: string | null; firstName?: string | null; lastName?: string | null } | null | undefined,
  fallback = "Unnamed",
): string {
  if (!profile) return fallback;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  if (full) return full;
  return profile.displayName?.trim() || fallback;
}

/** A random integer in `[0, max)` (injectable for tests; production passes `crypto.randomInt`). */
export type RandomInt = (max: number) => number;

// =====================================================================================================================
// School-issued usernames (User.loginUsername) and temporary passwords
// =====================================================================================================================

/** Lower-case ASCII letters of a name ("Tafadzwa-Ruvimbo Mhlanga-Ndlovu" → "tafadzwaruvimbomhlangandlovu"). */
export function asciiLetters(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

/**
 * Short school prefix for usernames from the school slug: the initials of its words ("harare-high-school" → "hhs"),
 * or the first letters of a one-word slug ("chisipite" → "chis"). 2-5 lower-case characters.
 */
export function schoolUsernamePrefix(slug: string): string {
  const words = slug
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  let prefix = words.length >= 2 ? words.map((word) => word[0]).join("") : (words[0] ?? "").slice(0, 4);
  prefix = prefix.replace(/[^a-z0-9]/g, "").slice(0, 5);
  if (prefix.length < 2) prefix = `${prefix}sc`.slice(0, 2).padEnd(2, "s");
  return prefix;
}

/**
 * A username candidate for a school-provisioned account: `<prefix>.<first initial><surname><digits>`, e.g.
 * "hhs.tmoyo27" (schema example). Matches `User_login_username_chk`; callers retry with more digits on a collision.
 */
export function provisionedUsernameCandidate(
  prefix: string,
  firstName: string,
  lastName: string,
  random: RandomInt,
  digitCount = 2,
): string {
  const first = asciiLetters(firstName);
  const last = asciiLetters(lastName);
  const stem = (last ? `${first.slice(0, 1)}${last.slice(0, 12)}` : first.slice(0, 13)) || "student";
  let digits = "";
  for (let i = 0; i < Math.max(2, Math.min(digitCount, 6)); i += 1) digits += String(random(10));
  const candidate = `${prefix}.${stem}${digits}`.slice(0, 32);
  if (!LOGIN_USERNAME_PATTERN.test(candidate)) throw new RangeError(`provisionedUsernameCandidate: invalid candidate "${candidate}"`);
  return candidate;
}

/** Look-alike-free alphabet for printed passwords (no i, l, o, 0, 1). */
export const TEMP_PASSWORD_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";
/** Three groups of four: 12 random characters ≈ 59 bits, easy to read from a printed slip. */
export const TEMP_PASSWORD_GROUPS = 3;
export const TEMP_PASSWORD_GROUP_LENGTH = 4;

/** A strong, printable temporary password such as "k7mw-2qhp-x9td" (hyphens are part of it). */
export function generateTemporaryPassword(random: RandomInt): string {
  const groups: string[] = [];
  for (let g = 0; g < TEMP_PASSWORD_GROUPS; g += 1) {
    let group = "";
    for (let i = 0; i < TEMP_PASSWORD_GROUP_LENGTH; i += 1) group += TEMP_PASSWORD_ALPHABET[random(TEMP_PASSWORD_ALPHABET.length)] ?? "a";
    groups.push(group);
  }
  // Never all digits (the password policy refuses digit-only passwords); 12 digits in a row is ~1e-7 anyway.
  const password = groups.join("-");
  return /[a-z]/.test(password) ? password : `a${password.slice(1)}`;
}

/** One printed credential slip (shown once; the password is never stored in plain text). */
export interface CredentialSlip {
  userId: string;
  name: string;
  className: string | null;
  username: string;
  temporaryPassword: string;
}

// =====================================================================================================================
// Roster import (dry run): columns, row validation, duplicates
// =====================================================================================================================

export const MAX_ROSTER_FILE_BYTES = 2 * 1024 * 1024;
/**
 * Budget for the UNPACKED size of an Excel roster (its worksheet XML and other parts the parser reads). A 1,000-row
 * roster is well under 2 MB of XML; DEFLATE can expand a 2 MB upload to about 2 GB (`src/server/lib/xlsx.ts`).
 */
export const MAX_ROSTER_XLSX_UNPACKED_BYTES = 16 * 1024 * 1024;
export const MAX_ROSTER_ROWS = 1_000;
/** Rows committed per request: defined with the browser-side roster helpers (zod-free), re-exported here. */
export { chunkRows, ROSTER_CHUNK_SIZE, rosterRowForCommit } from "./roster-rows";

export type RosterField = "firstName" | "lastName" | "form" | "className" | "email" | "phone" | "parentPhone" | "studentNumber" | "subjects";

/** Accepted header spellings per field, after `normalizeHeader` (snake_case). */
export const ROSTER_COLUMN_ALIASES: Readonly<Record<RosterField, readonly string[]>> = {
  firstName: ["first_name", "firstname", "first_names", "given_name", "given_names", "forename", "forenames", "name"],
  lastName: ["last_name", "lastname", "surname", "family_name"],
  form: ["form", "year", "form_year", "form_or_year", "grade", "level", "year_group"],
  className: ["class", "class_name", "stream", "form_class", "homeroom"],
  email: ["email", "email_address", "student_email", "e_mail"],
  phone: ["phone", "phone_number", "student_phone", "mobile", "cell"],
  parentPhone: ["parent_phone", "guardian_phone", "parent_contact", "parent_mobile", "parent_phone_number", "guardian_contact", "contact_phone"],
  studentNumber: ["student_number", "admission_number", "admission_no", "student_no", "student_id", "reg_number", "registration_number"],
  subjects: ["subjects", "subject"],
};

export const ROSTER_REQUIRED_FIELDS: readonly RosterField[] = ["firstName", "lastName"];

/** Header line of the downloadable template (and the documented column order). */
export const ROSTER_TEMPLATE_HEADERS = ["First name", "Last name", "Form", "Class", "Email", "Phone", "Parent phone", "Student number", "Subjects"] as const;

/** `Option A` → `option_a`, `Student No.` → `student_no` (same normalisation as content imports). */
export function normalizeRosterHeader(raw: string): string {
  return raw
    .replace(/^﻿/, "")
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export interface RosterIssue {
  /** Spreadsheet row number (header = 1); 0 = the file as a whole. */
  row: number;
  field?: RosterField;
  severity: "error" | "warning";
  message: string;
}

/** Maps a header row to fields. Unknown columns are ignored (reported as a warning). */
export function mapRosterHeaders(headers: readonly string[]): { columns: Partial<Record<RosterField, number>>; issues: RosterIssue[] } {
  const columns: Partial<Record<RosterField, number>> = {};
  const unknown: string[] = [];
  headers.forEach((raw, index) => {
    const header = normalizeRosterHeader(raw);
    if (!header) return;
    const field = (Object.keys(ROSTER_COLUMN_ALIASES) as RosterField[]).find((key) => ROSTER_COLUMN_ALIASES[key].includes(header));
    if (field === undefined) unknown.push(raw.trim());
    else if (columns[field] === undefined) columns[field] = index;
  });
  const issues: RosterIssue[] = [];
  const missing = ROSTER_REQUIRED_FIELDS.filter((field) => columns[field] === undefined);
  if (missing.length > 0) {
    issues.push({
      row: 1,
      severity: "error",
      message: `The file needs "First name" and "Last name" columns. Download the template to see the expected columns.`,
    });
  }
  if (unknown.length > 0) {
    issues.push({ row: 1, severity: "warning", message: `These columns are not used and were ignored: ${unknown.slice(0, 8).join(", ")}${unknown.length > 8 ? "…" : ""}.` });
  }
  return { columns, issues };
}

/** One roster row after validation (the shape the commit step receives back). */
export interface RosterRow {
  row: number;
  firstName: string;
  lastName: string;
  form: string | null;
  className: string | null;
  email: string | null;
  phone: string | null;
  parentPhone: string | null;
  studentNumber: string | null;
  subjects: string[];
}

const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u;
const STUDENT_NUMBER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9/._-]{0,31}$/;

function clean(value: string | undefined): string {
  return (value ?? "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

function validName(value: string, label: string, field: RosterField, row: number, issues: RosterIssue[]): string {
  if (!value) {
    issues.push({ row, field, severity: "error", message: `${label} is missing.` });
    return "";
  }
  if (value.length > 100) {
    issues.push({ row, field, severity: "error", message: `${label} is longer than 100 characters.` });
    return "";
  }
  if (!NAME_PATTERN.test(value)) {
    issues.push({ row, field, severity: "error", message: `${label} "${value.slice(0, 40)}" contains characters that are not letters.` });
    return "";
  }
  return value;
}

/**
 * Validates one data row (pure). Names must be letters (with spaces, hyphens, apostrophes); contacts are normalised
 * (Zimbabwean phone formats accepted); subjects are split on ";" or ",". Returns the cleaned row and its issues.
 */
export function validateRosterRecord(row: number, cells: Partial<Record<RosterField, string>>): { value: RosterRow; issues: RosterIssue[] } {
  const issues: RosterIssue[] = [];
  const firstName = validName(clean(cells.firstName), "First name", "firstName", row, issues);
  const lastName = validName(clean(cells.lastName), "Last name", "lastName", row, issues);

  const form = clean(cells.form).slice(0, 40) || null;
  let className = clean(cells.className) || null;
  if (className && className.length > 120) {
    issues.push({ row, field: "className", severity: "error", message: "Class name is longer than 120 characters." });
    className = null;
  }

  const emailRaw = clean(cells.email);
  let email: string | null = null;
  if (emailRaw) {
    email = normalizeEmail(emailRaw);
    if (email === null) issues.push({ row, field: "email", severity: "error", message: `"${emailRaw.slice(0, 60)}" is not a valid email address.` });
  }
  const phoneRaw = clean(cells.phone);
  let phone: string | null = null;
  if (phoneRaw) {
    phone = normalizePhone(phoneRaw);
    if (phone === null) issues.push({ row, field: "phone", severity: "error", message: `"${phoneRaw.slice(0, 32)}" is not a valid phone number.` });
  }
  const parentRaw = clean(cells.parentPhone);
  let parentPhone: string | null = null;
  if (parentRaw) {
    parentPhone = normalizePhone(parentRaw);
    if (parentPhone === null) {
      issues.push({ row, field: "parentPhone", severity: "error", message: `Parent phone "${parentRaw.slice(0, 32)}" is not a valid phone number.` });
    }
  }
  if (phone !== null && email !== null) {
    issues.push({ row, field: "phone", severity: "warning", message: "Both an email and a phone were given; the email is used to sign in and the phone is ignored." });
    phone = null;
  }

  const numberRaw = clean(cells.studentNumber);
  let studentNumber: string | null = null;
  if (numberRaw) {
    if (STUDENT_NUMBER_PATTERN.test(numberRaw)) studentNumber = numberRaw;
    else issues.push({ row, field: "studentNumber", severity: "error", message: "Student numbers use letters, digits, / . _ - and at most 32 characters." });
  }

  const subjects = clean(cells.subjects)
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 20);

  return { value: { row, firstName, lastName, form, className, email, phone, parentPhone, studentNumber, subjects }, issues };
}

/** Key for "the same student twice": names (case/accents ignored) + class. */
export function rosterIdentityKey(row: Pick<RosterRow, "firstName" | "lastName" | "className">): string {
  return `${asciiLetters(row.firstName)}|${asciiLetters(row.lastName)}|${(row.className ?? "").trim().toLowerCase()}`;
}

/** Errors for rows that repeat another row of the same file (same student number, email, phone, or name + class). */
export function findDuplicateRosterRows(rows: readonly RosterRow[]): RosterIssue[] {
  const issues: RosterIssue[] = [];
  const seen = new Map<string, number>();
  for (const row of rows) {
    const keys: [string, string, RosterField][] = [];
    if (row.studentNumber) keys.push([`n:${row.studentNumber.toLowerCase()}`, "student number", "studentNumber"]);
    if (row.email) keys.push([`e:${row.email}`, "email", "email"]);
    if (row.phone) keys.push([`p:${row.phone}`, "phone", "phone"]);
    if (!row.studentNumber && row.firstName && row.lastName) keys.push([`i:${rosterIdentityKey(row)}`, "name and class", "firstName"]);
    for (const [key, label, field] of keys) {
      const first = seen.get(key);
      if (first !== undefined) {
        issues.push({ row: row.row, field, severity: "error", message: `Same ${label} as row ${first}. Each student must appear once.` });
        break;
      }
      seen.set(key, row.row);
    }
  }
  return issues;
}

/** What the commit will do with a row. */
export type RosterOutcome =
  /** New school-provisioned username account. */
  | "create"
  /** The email / phone already has an account: the student is invited to join instead (they accept in their account). */
  | "invite"
  /** Already a student of this school (same student number or account): class and subject placement only. */
  | "existing"
  /** Looks like a student already on the roster (same name in the same class): not imported. */
  | "skip"
  /** Has errors: not imported. */
  | "error";

export const ROSTER_OUTCOME_LABELS: Readonly<Record<RosterOutcome, string>> = {
  create: "New account",
  invite: "Invitation",
  existing: "Already on roster",
  skip: "Skipped",
  error: "Needs fixing",
};

/** Totals of a dry-run or commit report. */
export function countOutcomes(outcomes: readonly RosterOutcome[]): Record<RosterOutcome, number> {
  const totals: Record<RosterOutcome, number> = { create: 0, invite: 0, existing: 0, skip: 0, error: 0 };
  for (const outcome of outcomes) totals[outcome] += 1;
  return totals;
}

/** Lower-case lookup key for class, form and subject names typed in a roster. */
export function lookupKey(value: string): string {
  return value.normalize("NFKC").trim().toLowerCase().replace(/\s+/g, " ");
}

// =====================================================================================================================
// CSV (reports)
// =====================================================================================================================

/**
 * One CSV cell: quoted when needed; cells that a spreadsheet would run as a formula (= + - @, tab, carriage return)
 * get a leading apostrophe (CSV injection, OWASP).
 */
export function csvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  let text = typeof value === "number" ? (Number.isFinite(value) ? String(value) : "") : String(value);
  if (/^[=+\-@\t\r]/.test(text) && !(typeof value === "number")) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** A CSV document (CRLF line ends, UTF-8 BOM so Excel reads accents correctly). */
export function toCsv(header: readonly string[], rows: readonly (readonly (string | number | boolean | null | undefined)[])[]): string {
  const lines = [header.map(csvCell).join(","), ...rows.map((row) => row.map(csvCell).join(","))];
  return `﻿${lines.join("\r\n")}\r\n`;
}

// =====================================================================================================================
// Reports
// =====================================================================================================================

export const SCHOOL_REPORT_KINDS = ["class_results", "engagement", "exam_readiness"] as const;
export type SchoolReportKind = (typeof SCHOOL_REPORT_KINDS)[number];

export const SCHOOL_REPORT_LABELS: Readonly<Record<SchoolReportKind, { title: string; description: string }>> = {
  class_results: {
    title: "Class results",
    description: "One line per student per class: marked tests, average score and assignments completed in the period.",
  },
  engagement: {
    title: "Student engagement",
    description: "One line per student: active days, study time and questions answered in the period.",
  },
  exam_readiness: {
    title: "Examination readiness",
    description: "One line per student per subject: readiness, mock exam averages and target grade (current values).",
  },
};

/** Generated files are deleted after this many days (the SchoolReport row stays, status EXPIRED). */
export const REPORT_RETENTION_DAYS = 30;
/** Longest period one report may cover. */
export const MAX_REPORT_PERIOD_DAYS = 366;

// =====================================================================================================================
// Seats (B2B2C)
// =====================================================================================================================

export interface SeatUsage {
  purchased: number;
  allocated: number;
  available: number;
  /** ACTIVE students without a seat (they use the free plan until a seat frees up or more are bought). */
  studentsWithoutSeat: number;
  /** Allocated share of purchased seats, 0-100 (null without seats). */
  usedPercent: number | null;
}

/** Seat usage of a school subscription (pure). */
export function seatUsage(input: { seats: number | null; allocated: number; activeStudents: number }): SeatUsage {
  const purchased = Math.max(0, input.seats ?? 0);
  const allocated = Math.max(0, input.allocated);
  return {
    purchased,
    allocated,
    available: Math.max(0, purchased - allocated),
    studentsWithoutSeat: Math.max(0, input.activeStudents - allocated),
    usedPercent: purchased > 0 ? Math.min(100, Math.round((allocated / purchased) * 1000) / 10) : null,
  };
}
