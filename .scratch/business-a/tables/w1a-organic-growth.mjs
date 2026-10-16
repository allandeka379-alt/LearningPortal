import { chk, table, pctChange, r2 } from "../lib.mjs";
// Ex 1: economies of scale
const rows = [[1000, 8000], [2500, 17500], [4000, 26000]];
console.log(table(["Output (units)", "Total cost (US\\$)", "Average cost per unit (US\\$)"], rows.map(([q, c]) => [q, c, (c / q).toFixed(2)])));
chk(pctChange(8, 7), -12.5, 0.0001); chk(pctChange(8, 6.5), -18.75, 0.0001);
// Ex 2: overtrading
const m1 = 150000 / 12, m2 = 240000 / 12;
const rec1 = m1 * 1.5, rec2 = m2 * 1.5;
console.log(m1, m2, rec1, rec2, rec2 - rec1, pctChange(150000, 240000));
const inv = 9000, extra = rec2 - rec1 + inv; console.log(extra, extra - 15000);
