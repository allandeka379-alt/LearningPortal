// Numbers for lessons/elasticity/ped-revenue.md (W1b).
import { elasticity, table } from "../lib.mjs";
const a = { p1: 10, p2: 8, q1: 100, q2: 150 };
console.log("WE1 PED", elasticity.ped(a), "TR", a.p1 * a.q1, a.p2 * a.q2);
const b = { p1: 2, p2: 2.5, q1: 1000, q2: 900 };
console.log("WE2 PED", elasticity.ped(b), "TR", b.p1 * b.q1, b.p2 * b.q2);
console.log(table(["PED (ignoring the sign)", "Price rise", "Price cut"], [["Elastic (greater than 1)", "Total revenue falls", "Total revenue rises"], ["Unitary (exactly 1)", "No change", "No change"], ["Inelastic (less than 1)", "Total revenue rises", "Total revenue falls"]]));
