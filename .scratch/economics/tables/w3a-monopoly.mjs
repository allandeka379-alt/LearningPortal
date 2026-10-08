// Tables for lessons/structures/monopoly.md (W3a).
import { table, check } from "../lib.mjs";
// WE1: a fictional sole cement supplier; cost per tonne (including normal profit) US$110 at every output.
const p = [110, 120, 130, 140, 150, 160, 170], q = [14000, 13000, 12000, 10500, 9000, 7000, 5000], ac = 110;
const prof = p.map((x, i) => (x - ac) * q[i]);
console.log(table(["Price (US\\$ per tonne)", "Quantity demanded (tonnes per month)", "Total revenue (US\\$)", "Total cost at US\\$110 a tonne (US\\$)", "Abnormal profit (US\\$)"], p.map((x, i) => [x, q[i], x * q[i], ac * q[i], prof[i]])));
const best = prof.indexOf(Math.max(...prof));
check("best", p[best], 150);
console.log("best", p[best], q[best], prof[best], "competitive", p[0], q[0]);
