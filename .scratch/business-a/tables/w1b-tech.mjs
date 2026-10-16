import { table, chk, invest, r2 } from "../lib.mjs";
const before = 6 * 300 * 12, op = 1 * 300 * 12, run = 4800, cost = 30000;
const after = op + run, saving = before - after;
console.log(table(["Yearly packing costs", "Manual line (US\$)", "Machine line (US\$)"], [["Wages (6 workers; 1 operator)", before, op], ["Running costs of the machine", 0, run], ["Total yearly cost", before, after], ["Yearly saving", "", saving]]));
console.log(saving, cost / saving, invest.payback(cost, [saving, saving, saving, saving]));
const out = 48000; // units per year
console.log("cost per unit before", before / out, "after", after / out);
