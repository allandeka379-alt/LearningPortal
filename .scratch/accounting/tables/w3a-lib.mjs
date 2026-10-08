// W3a helpers (adjustments). Built on lib.mjs fmt/sum/check; not a slice (lives in tables/).
import { fmt, sum, check, r2 } from "../lib.mjs";

const row = (cells) => `| ${cells.join(" | ")} |`;
export const U = String.raw`US\$`;
/** Simple table: head [..], rows [[..]]; numbers formatted; align: array of "l"/"r". */
export function table(head, rows, align) {
  const al = align ?? head.map((_, i) => (rows.some((r) => typeof r[i] === "number") ? "r" : "l"));
  return [row(head), row(al.map((a) => (a === "r" ? "---:" : "---"))), ...rows.map((r) => row(r.map((c) => (typeof c === "number" ? fmt(c) : c ?? ""))))].join("\n");
}
/** Depreciation schedule table. rows: [{ year, charge, nbv }] with cost; adds accumulated depreciation; checks. */
export function schedule(cost, rows, { label = "Year" } = {}) {
  let acc = 0;
  const out = rows.map((x) => {
    acc = r2(acc + x.charge);
    check(`schedule nbv ${x.year}`, r2(cost - acc), x.nbv);
    return [String(x.year), x.charge, acc, x.nbv];
  });
  return { md: table([label, `Depreciation ${U}`, `Accumulated depreciation ${U}`, `Net book value ${U}`], out), acc };
}
/** Straight-line rows. */
export function slRows(cost, residual, years, startYear = 1) {
  const c = r2((cost - residual) / years);
  const out = [];
  let nbv = cost;
  for (let i = 0; i < years; i += 1) {
    nbv = r2(nbv - c);
    out.push({ year: startYear + i, charge: c, nbv });
  }
  return out;
}
/** Reducing balance rows (charge rounded to the cent). */
export function rbRows(cost, pct, years, startYear = 1) {
  const out = [];
  let nbv = cost;
  for (let i = 0; i < years; i += 1) {
    const charge = r2((nbv * pct) / 100);
    nbv = r2(nbv - charge);
    out.push({ year: startYear + i, charge, nbv });
  }
  return out;
}
export const n = (v) => fmt(v);
export { fmt, sum, check, r2 };
