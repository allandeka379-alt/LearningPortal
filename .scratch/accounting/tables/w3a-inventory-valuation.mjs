import { statement, check, r2, sum } from "../lib.mjs";
import { table, U } from "./w3a-lib.mjs";
const items = [["Men's suits", 40, 85, 140, 0], ["Damaged school blazers", 25, 32, 30, 6], ["Out-of-fashion jackets", 18, 55, 60, 6], ["Leather shoes (pairs)", 60, 28, 45, 0]];
const rows = items.map(([n, q, c, sp, sc]) => { const nrv = sp - sc; const unit = Math.min(c, nrv); return [n, q, c, nrv, unit, r2(q * unit)]; });
console.log(table(["Item", "Units", `Cost per unit ${U}`, `NRV per unit ${U}`, `Lower per unit ${U}`, `Value ${U}`], rows.map((r) => [r[0], String(r[1]), r[2], r[3], r[4], r[5]])));
const tot = sum(rows.map((r) => r[5])), tc = sum(items.map((i) => i[1] * i[2])), tn = sum(items.map((i) => i[1] * (i[3] - i[4])));
console.log(tot, tc, tn); check("tot", tot, 6652);
// Ex2
const rev = 58000, op = 7400, pur = 41300, wrong = 8900, right = 7700;
const f = (cl) => { const cos = r2(op + pur - cl); return { cos, gp: r2(rev - cos) }; };
const a = f(wrong), b = f(right);
console.log(table(["", `As recorded ${U}`, `Corrected ${U}`], [["Revenue", rev, rev], ["Opening inventory", op, op], ["Purchases", pur, pur], ["Less: Closing inventory", -wrong, -right], ["Cost of sales", a.cos, b.cos], ["Gross profit", a.gp, b.gp]]));
check("diff", a.gp - b.gp, 1200);
