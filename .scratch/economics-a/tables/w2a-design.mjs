// Scratch: checks candidate datasets that replace lesson-sharing numbers in the w2a questions.
import { costTable, profitSchedule } from "../lib.mjs";

const best = (rows, price) => rows.slice(1).map((r) => ({ q: r.q, profit: price * r.q - r.tc, avc: r.avc, atc: r.atc, mc: r.mc })).reduce((m, r) => (r.profit > m.profit ? r : m));
const show = (name, fc, vc, prices) => {
  const ct = costTable({ output: vc.map((_, i) => i), fc, vc, marginal: true });
  console.log(`\n== ${name}`);
  console.log(ct.rows.map((r) => `${r.q}: tc ${r.tc} mc ${r.mc ?? "-"} avc ${r.avc?.toFixed(2) ?? "-"} atc ${r.atc?.toFixed(2) ?? "-"}`).join("\n"));
  for (const p of prices) { const b = best(ct.rows, p); console.log(`price ${p}: q ${b.q} profit ${b.profit.toFixed(2)} avc ${b.avc.toFixed(2)} atc ${b.atc.toFixed(2)}  shut-loss ${-fc}`); }
};
show("profit-types ct2", 54, [0, 36, 64, 84, 106, 134, 170, 222, 300], [44, 25]);
show("PC questions", 48, [0, 32, 54, 70, 88, 111, 141, 183, 237], [40, 30, 26, 20]);
show("SRC q21", 70, [0, 44, 76, 98, 120, 151, 190, 244, 316], [40]);
show("Zimsec exam", 50, [0, 38, 64, 88, 115, 146, 186, 240], [34]);

const ps = (name, args) => {
  const r = profitSchedule(args);
  console.log(`\n== ${name}\n${r.md}\nbest q ${r.best.q} profit ${r.best.profit}`);
  const mt = Math.max(...r.rows.map((x) => x.tr));
  console.log("max TR", mt, "at q", r.rows.find((x) => x.tr === mt).q, "profit there", r.rows.find((x) => x.tr === mt).profit);
};
ps("revenue q21", { output: [0, 1, 2, 3, 4, 5, 6], price: [34, 30, 26, 22, 18, 14, 10], fc: 20, vc: [0, 12, 21, 31, 44, 60, 80] });
ps("objectives q21", { output: [0, 1, 2, 3, 4, 5, 6, 7], price: [32, 29, 26, 23, 20, 17, 14, 11], fc: 16, vc: [0, 13, 22, 29, 38, 49, 64, 84] });
ps("Cambridge", { output: [0, 1, 2, 3, 4, 5, 6, 7, 8], price: [50, 45, 40, 35, 30, 25, 20, 15, 10], fc: 40, vc: [0, 25, 45, 60, 74, 92, 114, 140, 170] });
