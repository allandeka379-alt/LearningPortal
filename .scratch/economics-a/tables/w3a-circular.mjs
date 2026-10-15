import { chk, fmt, table } from "../lib.mjs";
const w = { s: 1200, t: 1800, m: 900 }, j = { i: 1500, g: 1700, x: 800 };
const W = w.s + w.t + w.m, J = j.i + j.g + j.x; console.log(W, J, J - W);
console.log(table(["Leakages (withdrawals)", "US\$ million", "Injections", "US\$ million"], [["Saving (S)", 1200, "Investment (I)", 1500], ["Taxes (T)", 1800, "Government spending (G)", 1700], ["Imports (M)", 900, "Exports (X)", 800], ["**Total W**", `**${fmt(W)}**`, "**Total J**", `**${fmt(J)}**`]]));
// closed 2-sector
console.log("Y=C+S; C=7000, S=1500 => Y", 8500, "I=1500");
