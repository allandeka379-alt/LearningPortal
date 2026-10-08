/**
 * Password policy (§39, ARCHITECTURE §5.1, NIST SP 800-63B). Pure: no I/O.
 *
 * Length 8-128 (counted in Unicode code points after NFKC normalisation), not only digits, not the account's own
 * email / phone / username, and not on a small list of the most common passwords. No composition rules ("one upper
 * case letter…"): they make passwords harder to remember without making them harder to guess.
 *
 * Messages are user-facing and phrased as fixes.
 */

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;

export const PASSWORD_POLICY_MESSAGES = {
  tooShort: `Use at least ${PASSWORD_MIN_LENGTH} characters.`,
  tooLong: `Use ${PASSWORD_MAX_LENGTH} characters or fewer.`,
  digitsOnly: "Don't use only numbers. Add some letters or words.",
  matchesIdentifier: "Don't use your email address, phone number or username as your password.",
  tooCommon: "This password is too easy to guess. Try a few unrelated words together.",
} as const;

/** Account identifiers the password must not equal. */
export interface PasswordPolicyContext {
  email?: string | null;
  phone?: string | null;
  username?: string | null;
}

/**
 * A short list of the most-used passwords (lower-case) plus local favourites. A full breached-password check
 * (k-anonymity range API) can replace this later; this catches the worst cases with zero I/O.
 */
const COMMON_PASSWORDS: ReadonlySet<string> = new Set([
  "password", "password1", "password12", "password123", "passw0rd", "p@ssw0rd", "p@ssword", "pass1234", "password!",
  "12345678", "123456789", "1234567890", "87654321", "11111111", "00000000", "12341234", "11223344", "1q2w3e4r",
  "1qaz2wsx", "qwerty12", "qwerty123", "qwertyui", "qwertyuiop", "qwer1234", "asdfghjk", "asdf1234", "zxcvbnm1",
  "qazwsxedc", "abc12345", "abcd1234", "abc123456", "abcdefgh", "aaaaaaaa", "iloveyou", "iloveyou1", "loveyou1",
  "letmein1", "letmein!", "welcome1", "welcome123", "admin123", "administrator", "changeme", "default1", "secret12",
  "test1234", "testing1", "trustno1", "whatever", "computer", "internet", "football", "baseball", "sunshine",
  "princess", "superman", "batman123", "starwars", "monkey123", "dragon123", "shadow12", "master12", "hello123",
  "freedom1", "michael1", "jennifer", "jordan23", "samsung1", "iphone12", "blessed1", "godisgood", "jesus123",
  "mother123", "family123", "chelsea1", "arsenal1", "liverpool", "manchester", "manutd123", "barcelona",
  "zimbabwe", "zimbabwe1", "zimbabwe123", "harare123", "bulawayo", "zimsec123", "cambridge", "student1",
  "student123", "teacher1", "teacher123", "school123", "maths123", "science1", "english1", "olevel123", "alevel123",
]);

function sameText(a: string, b: string): boolean {
  return a.localeCompare(b, undefined, { sensitivity: "accent" }) === 0;
}

function identifierVariants(context: PasswordPolicyContext): string[] {
  const variants: string[] = [];
  const email = context.email?.trim();
  if (email) {
    variants.push(email);
    const local = email.split("@")[0];
    if (local && local.length >= 4) variants.push(local);
  }
  const phone = context.phone?.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, "");
    variants.push(phone, digits);
    // National format of a +263 number, e.g. 0771234567.
    if (digits.startsWith("263") && digits.length > 3) variants.push(`0${digits.slice(3)}`, digits.slice(3));
  }
  const username = context.username?.trim();
  if (username) variants.push(username);
  return variants;
}

/** True when every character is the same, e.g. "zzzzzzzz". */
function isRepeatedCharacter(password: string): boolean {
  const chars = [...password];
  return chars.length > 0 && chars.every((char) => char === chars[0]);
}

/**
 * Returns the policy violations for `password` (empty array = acceptable). The first message is the most important,
 * so forms can show just that one.
 */
export function passwordPolicyErrors(password: string, context: PasswordPolicyContext = {}): string[] {
  const normalized = password.normalize("NFKC");
  const length = [...normalized].length;
  if (length < PASSWORD_MIN_LENGTH) return [PASSWORD_POLICY_MESSAGES.tooShort];
  if (length > PASSWORD_MAX_LENGTH) return [PASSWORD_POLICY_MESSAGES.tooLong];

  const errors: string[] = [];
  if (/^\d+$/.test(normalized)) errors.push(PASSWORD_POLICY_MESSAGES.digitsOnly);
  if (identifierVariants(context).some((variant) => sameText(variant, normalized))) {
    errors.push(PASSWORD_POLICY_MESSAGES.matchesIdentifier);
  }
  if (COMMON_PASSWORDS.has(normalized.toLowerCase()) || isRepeatedCharacter(normalized)) {
    errors.push(PASSWORD_POLICY_MESSAGES.tooCommon);
  }
  return errors;
}

/** Convenience boolean form of {@link passwordPolicyErrors}. */
export function isAcceptablePassword(password: string, context: PasswordPolicyContext = {}): boolean {
  return passwordPolicyErrors(password, context).length === 0;
}
