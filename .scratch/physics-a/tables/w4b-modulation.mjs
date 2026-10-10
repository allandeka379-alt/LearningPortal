import { table, dpStr } from "../lib.mjs";
const fc = 990, fm = 4.5; console.log(fc - fm, fc, fc + fm, "bw", 2 * fm, "stations", (1602 - 531) / 9);
const k = 20, fC = 96.0; console.log(table(["v", "f / MHz"], [-2.5, -1.25, 0, 1.25, 2.5].map((v) => [dpStr(v, 2), (fC + k * v / 1000).toFixed(3)])));
console.log("carson", 2 * (50 + 3));
const Ac = 4.0, ka = 1.5; console.log(table(["t", "vm", "env"], [0, 1, 2, 3, 4].map((i) => { const vm = Math.sin(i * Math.PI / 2); return [i, dpStr(vm, 1), dpStr(Ac + ka * vm, 1)]; })));
