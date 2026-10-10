// Lesson tables for skills/planning-evaluation.
import { table, dpStr, pctChange, sfStr } from "../lib.mjs";
const stock = 1.0, total = 20;
const conc = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
console.log(table(["Concentration / mol dm⁻³", "Volume of 1.0 mol dm⁻³ sucrose / cm³", "Volume of distilled water / cm³"], conc.map((c) => [c.toFixed(1), dpStr((c / stock) * total, 1), dpStr(total - (c / stock) * total, 1)])));
let c = 1.0; const rows = [];
for (let i = 0; i < 4; i++) { rows.push([i + 1, `${c} %`]); c = c / 10; }
console.log(rows);
console.log("pct change", pctChange(2.40, 2.15), sfStr(pctChange(2.40, 2.15), 3));
console.log("mass sucrose for 250 cm3 of 1.0 mol dm-3 (Mr 342)", 342 * 0.25);
console.log("rate", 1 / 45 * 1000);
