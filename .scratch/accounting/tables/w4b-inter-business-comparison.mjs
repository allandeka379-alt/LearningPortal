import { ratios, d1, table } from "./w4b-lib.mjs";
const A = { rev: 200000, gp: 60000, other: 34000, dep: 4000, ce: 100000 }, B = { ...A, dep: 10000, ce: 94000 };
for (const x of [A, B]) { const np = x.gp - x.other - x.dep; console.log(np, d1(ratios.profitMargin(np, x.rev)), d1(ratios.roce(np, x.ce))); }
// Ex1
const S = { rev: 960000, cos: 787200, oi: 31000, ci: 34600 }, F = { rev: 240000, cos: 132000, oi: 42000, ci: 46000 };
for (const x of [S, F]) console.log(d1(ratios.grossMargin(x.rev - x.cos, x.rev)), d1(ratios.inventoryTurnover(x.cos, x.oi, x.ci)));
