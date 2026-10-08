import { z } from "zod";

/**
 * Login identifiers (§33, ARCHITECTURE §5.1). Pure: no I/O, safe to unit test. Accounts are email-based (owner
 * decision 2026-10-07): sign-in takes an email address or a school username; a phone number is profile data that
 * other features may look up (invitations, linking) but never a sign-in identifier (./flows refuses it).
 *
 * - Email: trimmed and lower-cased (matches `User.emailNormalized` and `User_email_normalized_chk`). Provider tricks
 *   (gmail dots, +tags) are NOT stripped, as documented on the column.
 * - Phone: E.164 (`User_phone_e164_chk`). Zimbabwe (+263) is the default country, so the national formats people
 *   actually type ("077 123 4567", "0771234567", "263771234567", "771234567") all normalise to `+263771234567`.
 * - Username: school-issued login usernames (`User.loginUsername`, lower-case `[a-z0-9][a-z0-9._-]{2,31}`).
 */

/** Default calling code (Zimbabwe). Phone numbers typed without an international prefix are read in this country. */
export const DEFAULT_CALLING_CODE = "263";

export const MAX_EMAIL_LENGTH = 254;

/** Same pattern as `User_phone_e164_chk`. */
export const E164_PATTERN = /^\+[1-9]\d{6,14}$/;

/** Same pattern as `User_login_username_chk`. */
export const LOGIN_USERNAME_PATTERN = /^[a-z0-9][a-z0-9._-]{2,31}$/;

const emailSchema = z.email();

export type IdentifierKind = "email" | "phone" | "username";

export interface LoginIdentifier {
  kind: IdentifierKind;
  /** Normalised value: lower-case email, E.164 phone or lower-case username. */
  value: string;
}

/** Normalises an email address; `null` when it is not a valid address. */
export function normalizeEmail(input: string): string | null {
  const value = input.trim().toLowerCase();
  if (value.length === 0 || value.length > MAX_EMAIL_LENGTH) return null;
  if (!emailSchema.safeParse(value).success) return null;
  return value;
}

/** Domains whose mailboxes ignore dots in the local part. */
const DOT_INSENSITIVE_EMAIL_DOMAINS: ReadonlySet<string> = new Set(["gmail.com"]);

/**
 * The MAILBOX an address delivers to, for abuse checks only (referral rewards, PAY-4) — never for login or uniqueness,
 * which keep {@link normalizeEmail} (distinct addresses stay distinct accounts). Strips a `+tag` (sub-addressing:
 * Gmail, Outlook, iCloud and most hosts deliver `name+anything@` to `name@`) and, for Gmail, dots in the local part;
 * `googlemail.com` is `gmail.com`. So `t.moyo+1@gmail.com` and `tmoyo@googlemail.com` are one inbox. `null` when the
 * address is invalid.
 */
export function canonicalEmailMailbox(input: string): string | null {
  const normalized = normalizeEmail(input);
  if (normalized === null) return null;
  const at = normalized.lastIndexOf("@");
  let local = normalized.slice(0, at);
  let domain = normalized.slice(at + 1);
  if (domain === "googlemail.com") domain = "gmail.com";
  const plus = local.indexOf("+");
  if (plus > 0) local = local.slice(0, plus);
  if (DOT_INSENSITIVE_EMAIL_DOMAINS.has(domain)) local = local.replace(/\./g, "");
  return local.length > 0 ? `${local}@${domain}` : normalized;
}

/**
 * Normalises a phone number to E.164; `null` when it cannot be a valid number.
 *
 * Accepted shapes: `+<cc><number>`, `00<cc><number>`, `0<national>` (trunk prefix, default country), `<cc><number>`
 * for the default country, and a bare 9-digit Zimbabwean mobile number starting with 7.
 */
export function normalizePhone(input: string, callingCode: string = DEFAULT_CALLING_CODE): string | null {
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > 32) return null;
  // Only digits, spaces and common separators; anything else (letters, @) is not a phone number.
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) return null;
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  let e164: string;
  if (hasPlus) {
    e164 = `+${digits}`;
  } else if (digits.startsWith("00")) {
    e164 = `+${digits.slice(2)}`;
  } else if (digits.startsWith("0")) {
    e164 = `+${callingCode}${digits.slice(1)}`;
  } else if (digits.startsWith(callingCode) && digits.length >= callingCode.length + 7) {
    e164 = `+${digits}`;
  } else if (callingCode === DEFAULT_CALLING_CODE && /^7\d{8}$/.test(digits)) {
    e164 = `+${callingCode}${digits}`;
  } else {
    return null;
  }
  if (!E164_PATTERN.test(e164)) return null;
  // Zimbabwean numbers have a 9-digit national significant number; reject obvious typos for the default country.
  if (e164.startsWith(`+${DEFAULT_CALLING_CODE}`) && e164.length !== DEFAULT_CALLING_CODE.length + 10) return null;
  return e164;
}

/** Normalises a login username; `null` when it does not match the username format. */
export function normalizeLoginUsername(input: string): string | null {
  const value = input.trim().toLowerCase();
  return LOGIN_USERNAME_PATTERN.test(value) ? value : null;
}

/**
 * Classifies what a person typed into an "email, phone or username" field. Contains `@` → email; only digits and
 * phone punctuation → phone; otherwise a login username. Returns `null` when the value is not valid for its kind.
 */
export function parseLoginIdentifier(input: string): LoginIdentifier | null {
  const raw = input.trim();
  if (raw.length === 0) return null;
  if (raw.includes("@")) {
    const email = normalizeEmail(raw);
    return email === null ? null : { kind: "email", value: email };
  }
  if (/^\+?[\d\s().-]+$/.test(raw)) {
    const phone = normalizePhone(raw);
    return phone === null ? null : { kind: "phone", value: phone };
  }
  const username = normalizeLoginUsername(raw);
  return username === null ? null : { kind: "username", value: username };
}

/**
 * Parses a contact a message could be addressed to (email or phone; usernames cannot), e.g. an invitation target.
 * Sign-in codes go to email addresses only: ./flows uses {@link normalizeEmail} for them.
 */
export function parseContactIdentifier(input: string): LoginIdentifier | null {
  const parsed = parseLoginIdentifier(input);
  return parsed !== null && parsed.kind !== "username" ? parsed : null;
}

/**
 * Masks an email or phone for display ("t***@example.com", "+26377***67"), e.g. "We sent a code to …".
 * Never use the unmasked value in logs.
 */
export function maskIdentifier(value: string): string {
  const at = value.indexOf("@");
  if (at > 0) {
    const local = value.slice(0, at);
    const visible = local.length <= 2 ? local.slice(0, 1) : local.slice(0, 2);
    return `${visible}***${value.slice(at)}`;
  }
  if (value.startsWith("+") && value.length > 8) return `${value.slice(0, 6)}***${value.slice(-2)}`;
  return "***";
}
