/**
 * Small numeric helpers shared by isomorphic code (UI formatting, mastery bands) and the pure server cores
 * (progress, scoring, study plans). Pure, dependency-free and safe for client bundles.
 */

/**
 * Rounds half away from zero ("half up" for the non-negative values used across the platform) to `decimals`
 * places.
 *
 * Uses a 15-significant-digit normalisation first so binary representation error does not flip a true half
 * (`1.005` → `1.01`, `68.25` → `68.3`). This keeps server-side rounding in step with what `Intl.NumberFormat`
 * displays for the same value (e.g. `39.5` is shown as "40%" and also rounds to `40` here). Throws on non-finite
 * input.
 */
export function roundHalfUp(value: number, decimals = 0): number {
  if (!Number.isFinite(value)) throw new RangeError(`Cannot round ${String(value)}`);
  const factor = 10 ** decimals;
  const scaled = Number((Math.abs(value) * factor).toPrecision(15));
  const rounded = Math.round(scaled) / factor;
  return value < 0 && rounded !== 0 ? -rounded : rounded;
}

/** Constrains `value` to the inclusive range [`min`, `max`]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
