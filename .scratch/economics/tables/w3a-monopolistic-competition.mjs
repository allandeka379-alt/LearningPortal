// Tables for lessons/structures/monopolistic-competition.md (W3a).
import { table, check, pctChange, fmt } from "../lib.mjs";
// WE1: a fictional hair salon raises its price (monopolistic competition: elastic but not perfectly elastic demand).
const p0 = 8, p1 = 9, q0 = 400, q1 = 320;
console.log({ tr0: p0 * q0, tr1: p1 * q1, pP: pctChange(p0, p1), pQ: pctChange(q0, q1) });
// WE2: market shares and the four-firm concentration ratio in a fictional beverage market (sales in US$ million).
const firms = [["Firm A", 120], ["Firm B", 90], ["Firm C", 75], ["Firm D", 45], ["All other firms (about 30 small firms)", 70]];
const tot = firms.reduce((s, f) => s + f[1], 0);
check("tot", tot, 400);
console.log(table(["Firm", "Sales (US\\$ million)", "Market share (%)"], [...firms.map(([n, s]) => [n, s, (s / tot) * 100]), ["**Total**", `**${tot}**`, "**100**"]], { dp: [0, 0, 1] }));
const cr4 = ((120 + 90 + 75 + 45) / tot) * 100;
console.log("CR4", cr4);
