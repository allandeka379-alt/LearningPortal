// Tables for lessons/costs/costs-of-production.md (W3a).
import { costTable, table, check, fmt } from "../lib.mjs";
// WE1: a fictional bakery in Gweru, weekly.
const t = costTable({ output: [0, 200, 400, 600, 800, 1000], fc: 600, vc: [0, 300, 500, 750, 1080, 1600] });
console.log(t.md);
for (const r of t.rows) console.log(r.q, r.tc, r.afc, r.avc, r.atc);
check("atc600", t.rows[3].atc, 2.25);
// WE2: phone repair shop, semi-variable electricity.
const n = 200, rent = 300, standing = 50, perUnitElec = 0.5, parts = 5;
const semi = standing + perUnitElec * n, varc = parts * n, tc = rent + semi + varc;
console.log({ semi, varc, tc, atc: tc / n });
const n2 = 300; const tc2 = rent + standing + perUnitElec * n2 + parts * n2; console.log({ tc2, atc2: tc2 / n2 });
