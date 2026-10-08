/**
 * Zimbabwe mobile-money number checks for the checkout form (client-side hint only; the server validates again with
 * the same rule in `normaliseZimbabweMobile`, src/server/billing/checkout.ts). Pure and isomorphic.
 *
 * Accepted: local "0771 234 567", "263771234567", "+263 77 123 4567" (spaces, dashes, dots and brackets ignored).
 * Zimbabwe mobile numbers are 07X XXX XXXX (EcoCash 077/078, OneMoney 071, Telecel 073).
 */

/** E.164 (+2637XXXXXXXX) or `null` when the input is not a Zimbabwe mobile number. */
export function toZimbabweE164(input: string | null | undefined): string | null {
  const compact = (input ?? "").replace(/[\s().-]/g, "");
  if (/^\+2637\d{8}$/.test(compact)) return compact;
  if (/^2637\d{8}$/.test(compact)) return `+${compact}`;
  if (/^07\d{8}$/.test(compact)) return `+263${compact.slice(1)}`;
  return null;
}

export function isZimbabweMobile(input: string | null | undefined): boolean {
  return toZimbabweE164(input) !== null;
}

export const PHONE_FORMAT_HINT = "The wallet number, e.g. 0771 234 567.";
export const PHONE_FORMAT_ERROR = "Enter a Zimbabwe mobile number, e.g. 0771 234 567.";
