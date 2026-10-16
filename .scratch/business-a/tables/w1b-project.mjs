import { table, chk } from "../lib.mjs";
const criteria = [["Local demand", 40], ["Start-up cost (higher score = cheaper)", 25], ["Skills the team has", 20], ["Risk (higher score = lower risk)", 15]];
const ideas = { "Layers (egg) project": [4, 2, 3, 3], "Mushroom project": [3, 4, 4, 3], "School uniform project": [5, 3, 2, 4] };
const total = (s) => s.reduce((a, v, i) => a + v * criteria[i][1], 0) / 100;
const rows = criteria.map((c, i) => [c[0], c[1], ...Object.values(ideas).map((s) => s[i])]);
rows.push(["Weighted score (out of 5)", 100, ...Object.values(ideas).map((s) => total(s).toFixed(2))]);
console.log(table(["Criterion", "Weight (%)", ...Object.keys(ideas)], rows));
console.log(Object.entries(ideas).map(([k, s]) => [k, total(s)]));
// budget
const items = [["Seed stock and materials", 640], ["Equipment hire", 280], ["Transport", 150], ["Advertising", 130]];
const sub = items.reduce((a, x) => a + x[1], 0), cont = sub * 10 / 100;
console.log(table(["Budget item", "US\$"], [...items, ["Subtotal", sub], ["Contingency (10%)", cont], ["Total project budget", sub + cont]]));
