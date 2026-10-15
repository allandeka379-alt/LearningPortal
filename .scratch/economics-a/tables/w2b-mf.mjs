import { monopolyLinear, pctChange, linearMarket, chk, schedule } from "../lib.mjs";
const D = (q) => 160 - 0.02 * q;
console.log("good", D(6000), D(6000) * 6000, "poor", D(4000), D(4000) * 4000);
console.log("pct q", pctChange(6000, 4000), "pct p", pctChange(40, 80), "ped", pctChange(6000, 4000) / pctChange(40, 80));
console.log(JSON.stringify(monopolyLinear({ a: 90, b: 0.05, c: 30 })));
console.log("pub", 4 * 30, 4 * 30 - 100);
console.log("lemons", (8000 + 4000) / 2);
