import { chk, rnd, table, dpStr } from "../lib.mjs";
const sites = [["A: shaded stream bank (wet)", 50.0, 47.8], ["B: open grassland slope", 50.0, 48.9], ["C: dry rock outcrop", 50.0, 49.6]];
console.log(table(["Site", "Start mass (g)", "Mass after 24 months (g)", "Loss (g)", "Loss (%)", "Loss (% per year)"],
  sites.map(([n, a, b]) => { const l = a - b; const p = (l / a) * 100; return [n, dpStr(a, 1), dpStr(b, 1), dpStr(l, 1), dpStr(p, 1), dpStr(p / 2, 1)]; })));
console.log("rate ratio 10->30C", 2 ** ((30 - 10) / 10));
