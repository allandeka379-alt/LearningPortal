/**
 * Money input helpers for the commerce admin (§31 prices, §32 refunds). Pure and isomorphic.
 *
 * Amounts are stored as integer MINOR units (cents) with an ISO 4217 currency (`PlanPrice.amountMinor`,
 * `Payment.amountMinor`, `PromoCode.amountOffMinor`). Staff type MAJOR units ("12.50"); these helpers convert both ways
 * without floating-point drift (the decimal string is split, never multiplied as a float). Every platform currency
 * (USD, ZWG, ZAR) has two decimal places, matching `formatMoneyMinor`.
 */

/** Largest amount accepted from a form (minor units): 10 million in major units. */
export const MAX_AMOUNT_MINOR = 1_000_000_000;

const MAJOR_AMOUNT = /^(\d{1,8})(?:\.(\d{1,2}))?$/;

/**
 * "12.5" / "12.50" / "1,250" → 1250 / 1250 / 125000 minor units. Spaces and thousands separators (",") are ignored.
 * Returns `null` for anything else (negative, more than 2 decimals, letters, empty).
 */
export function parseMajorAmount(input: string | null | undefined): number | null {
  if (typeof input !== "string") return null;
  const cleaned = input.trim().replace(/[\s,]/g, "");
  const match = MAJOR_AMOUNT.exec(cleaned);
  if (!match) return null;
  const whole = Number(match[1]);
  const fraction = Number((match[2] ?? "").padEnd(2, "0"));
  const minor = whole * 100 + fraction;
  return Number.isSafeInteger(minor) && minor <= MAX_AMOUNT_MINOR ? minor : null;
}

/** 1250 → "12.50" (form defaults; no currency, no grouping). */
export function minorToMajorString(minor: number | null | undefined): string {
  if (minor === null || minor === undefined || !Number.isInteger(minor)) return "";
  const sign = minor < 0 ? "-" : "";
  const abs = Math.abs(minor);
  return `${sign}${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}

/** USD micro-dollars ↔ a decimal USD string (AI budget editor): "50" → 50_000_000. `null` when invalid. */
export function parseUsdToMicros(input: string | null | undefined): number | null {
  if (typeof input !== "string") return null;
  const cleaned = input.trim().replace(/[\s,]/g, "");
  const match = /^(\d{1,7})(?:\.(\d{1,6}))?$/.exec(cleaned);
  if (!match) return null;
  const micros = Number(match[1]) * 1_000_000 + Number((match[2] ?? "").padEnd(6, "0"));
  return Number.isSafeInteger(micros) ? micros : null;
}

/** 50_000_000 → "50.00"; keeps significant micro-dollar digits ("0.125"). */
export function microsToUsdString(micros: number | null | undefined): string {
  if (micros === null || micros === undefined || !Number.isFinite(micros)) return "";
  const whole = Math.floor(micros / 1_000_000);
  const fraction = String(Math.round(micros % 1_000_000)).padStart(6, "0").replace(/0+$/, "");
  return `${whole}.${fraction.padEnd(2, "0")}`;
}
