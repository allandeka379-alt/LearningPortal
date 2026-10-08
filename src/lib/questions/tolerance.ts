/**
 * Numeric tolerance (§9 "numerical answer"), shared by marking and by authoring validation (which checks that a
 * correctly rounded answer is actually inside the tolerance).
 *
 * - No tolerance: equal up to floating-point noise (relative 1e-9); an expected 0 requires exactly 0.
 * - `absolute`: |actual − expected| ≤ amount.
 * - `relative`: |actual − expected| ≤ amount × |expected| (amount is a fraction: 0.01 = 1 %); an expected 0 requires
 *   exactly 0 (a relative band around zero is empty — use an absolute tolerance for answers near zero).
 * A tiny relative slack (1e-9) absorbs binary representation error at the boundary (60.5 vs 60 ± 0.5 is inside).
 * Non-finite inputs are never within tolerance.
 */
import type { Tolerance } from "./answer-spec";

const FLOAT_SLACK = 1e-9;

/** True when `actual` is within `tolerance` of `expected` (rules in the module header). */
export function withinTolerance(actual: number, expected: number, tolerance?: Tolerance): boolean {
  if (!Number.isFinite(actual) || !Number.isFinite(expected)) return false;
  const diff = Math.abs(actual - expected);
  const scale = Math.max(Math.abs(actual), Math.abs(expected));
  const slack = scale * FLOAT_SLACK;
  if (!tolerance) return expected === 0 ? actual === 0 : diff <= slack;
  if (tolerance.kind === "absolute") return diff <= tolerance.amount + slack;
  if (expected === 0) return actual === 0;
  return diff <= tolerance.amount * Math.abs(expected) + slack;
}
