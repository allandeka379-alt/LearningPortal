import { table, fmt } from "../lib.mjs";
const oc = (x, y) => x.slice(1).map((_, i) => (y[i] - y[i + 1]) / (x[i + 1] - x[i]));
const x = [0, 10, 20, 30, 40];
const shapes = { straight: [80, 60, 40, 20, 0], concave: [80, 76, 66, 46, 0], convex: [80, 46, 22, 8, 0] };
console.log(table(["Food (thousand tonnes)", "Clothing, straight line (thousand units)", "Clothing, concave (thousand units)", "Clothing, convex (thousand units)"], x.map((v, i) => [v, shapes.straight[i], shapes.concave[i], shapes.convex[i]])));
for (const [k, y] of Object.entries(shapes)) console.log(k, "clothing given up per 10 food:", oc(x, y).map((v) => v * 10).join(", "));
// Shift: technology improvement raises output of both by 25%
const L = ["A", "B", "C", "D", "E"], f0 = [0, 10, 20, 30, 40], c0 = [80, 76, 66, 46, 0];
const f1 = f0.map((v) => v * 1.25), c1 = c0.map((v) => v * 1.25);
console.log(table(["Combination", "Food before (thousand tonnes)", "Clothing before (thousand units)", "Food after (thousand tonnes)", "Clothing after (thousand units)"], L.map((l, i) => [l, f0[i], c0[i], f1[i], c1[i]])));
const fx = [0, 10, 20, 30, 40, 50], before = [80, 76, 66, 46, 0, null], after = [100, 96, 88, 74, 52, 0];
for (let i = 0; i < 5; i++) if (!(after[i] > before[i])) throw new Error("not outward");
console.log(table(["Food (thousand tonnes)", "Maximum clothing before (thousand units)", "Maximum clothing after (thousand units)"], fx.map((v, i) => [v, before[i] ?? "not possible", after[i]])));
console.log("after oc", oc(fx, after).map((v) => v * 10).join(", "));
