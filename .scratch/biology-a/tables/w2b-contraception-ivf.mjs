// W2b lesson numbers: contraception-ivf (hypothetical).
import { chk, dpStr, table } from "../lib.mjs";
// Pregnancies per 100 women per year (hypothetical study, 1 year each)
const rows = [["Method A (typical use)", 400, 36], ["Method B (typical use)", 250, 1]];
console.log(table(["Method", "Women followed for one year", "Pregnancies"], rows.map((r) => r.map(String))));
for (const [, n, p] of rows) console.log(p / n * 100);
// IVF cycle
const eggs = 12, fert = 9, embryos = 6;
console.log("fert %", fert / eggs * 100, "embryo % of fert", embryos / fert * 100);
