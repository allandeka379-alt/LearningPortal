/**
 * Unit matching for NUMERICAL / CALCULATION answers (§9 "numerical answer"). Authors list accepted spellings of the
 * canonical unit (the unit `answerSpec.value` is expressed in) and optional conversions for other units; students'
 * units are canonicalised and looked up in both lists.
 *
 * Canonical form (applied to authored AND student units, so matching is symmetric):
 *   - canonical text (NFKC, superscripts → exponent, zero-width removed), `º`/`˚` → `°`, `µ` → `μ`;
 *   - LaTeX noise removed (`\mathrm{}`, `\text{}`, braces, `$`), `\mu` → `μ`, `\Omega` → `Ω`, `^\circ` → `°`;
 *   - the word `per` → `/`; multiplication marks (`·`, `*`, `.` between letters, spaces) → `·`;
 *   - exponents lose their caret and brackets (`m^2` → `m2`, `s^(-1)` → `s-1`);
 *   - one simple denominator becomes a negative exponent (`km/h` → `km·h-1`, `m/s^2` → `m·s-2`), so `km/h`,
 *     `km h^-1` and `km·h⁻¹` are the same unit.
 * Matching is case-sensitive first (SI prefixes: `ms` ≠ `Ms`); if nothing matches, a case-insensitive comparison is
 * used only when it identifies exactly ONE listed unit (`KM/H` → `km/h`).
 */
import { canonicalText } from "./text";

export interface UnitConversion {
  /** A unit other than the canonical one, e.g. `m/s` when the answer is in `km/h`. */
  unit: string;
  /** canonical value = student value × factor + offset (e.g. m/s → km/h: factor 3.6; K → °C: factor 1, offset −273.15). */
  factor: number;
  offset?: number;
}

export type UnitMatch =
  | { kind: "accepted"; unit: string; caseFolded: boolean }
  | { kind: "converted"; unit: string; factor: number; offset: number; caseFolded: boolean };

function stripLatex(s: string): string {
  return s
    .replace(/\\(?:mathrm|text|rm|mbox)\s*/g, "")
    .replace(/\^\s*\{?\s*\\circ\s*\}?/g, "°")
    .replace(/\\circ/g, "°")
    .replace(/\\mu\s*/g, "μ")
    .replace(/\\Omega\s*/g, "Ω")
    .replace(/\\(?:cdot|times)/g, "·")
    .replace(/\\[,;:! ]/g, " ")
    .replace(/[{}$]/g, "");
}

/** Canonical form of a unit (module header). Returns "" for blank input. */
export function canonicalUnit(raw: string): string {
  let s = canonicalText(raw.replace(/[º˚]/g, "°"));
  s = stripLatex(s)
    .replace(/µ/g, "μ")
    .replace(/\s+per\s+/gi, "/")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\^\s*\(\s*([+-]?\d+)\s*\)/g, "$1")
    .replace(/\^\s*([+-]?\d+)/g, "$1")
    .replace(/(?<=\p{L})\.(?=\p{L})/gu, "·")
    .replace(/\.$/, "")
    .replace(/\s*[·⋅•*×]\s*/g, "·")
    .trim()
    .replace(/\s+/g, "·");
  const slash = s.split("/");
  if (slash.length === 2) {
    const [numerator, denominator] = slash as [string, string];
    const simple = /^(\p{L}+)(\d+)?$/u.exec(denominator);
    if (numerator !== "" && simple) s = `${numerator}·${simple[1]}-${simple[2] ?? "1"}`;
  }
  return s;
}

/**
 * Finds the student's unit among the accepted spellings, then among the conversions (rules in the module header).
 * Returns null when the unit is blank, unknown or ambiguous.
 */
export function matchUnit(studentUnit: string, accepted: readonly string[], conversions: readonly UnitConversion[] = []): UnitMatch | null {
  const unit = canonicalUnit(studentUnit);
  if (unit === "") return null;
  for (const a of accepted) if (canonicalUnit(a) === unit) return { kind: "accepted", unit: a, caseFolded: false };
  for (const c of conversions) {
    if (canonicalUnit(c.unit) === unit) return { kind: "converted", unit: c.unit, factor: c.factor, offset: c.offset ?? 0, caseFolded: false };
  }
  const folded = unit.toLowerCase();
  const candidates: UnitMatch[] = [];
  for (const a of accepted) if (canonicalUnit(a).toLowerCase() === folded) candidates.push({ kind: "accepted", unit: a, caseFolded: true });
  for (const c of conversions) {
    if (canonicalUnit(c.unit).toLowerCase() === folded) {
      candidates.push({ kind: "converted", unit: c.unit, factor: c.factor, offset: c.offset ?? 0, caseFolded: true });
    }
  }
  // Several spellings of the SAME accepted unit are one match; anything else is ambiguous.
  const distinct = new Set(candidates.map((c) => (c.kind === "accepted" ? "accepted" : `${c.factor}:${c.offset}`)));
  return distinct.size === 1 ? (candidates[0] ?? null) : null;
}
