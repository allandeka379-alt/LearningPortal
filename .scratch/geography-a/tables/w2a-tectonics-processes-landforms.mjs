import { chk, rnd, table, gradient } from "../lib.mjs";
const x = [0, 100, 200, 300, 400, 500, 600];
const h = [1250, 1250, 1248, 1210, 1172, 1168, 1168];
console.log(table(["Distance along line (m)", "Height (m)"], x.map((d, i) => [d, h[i]])));
const g = gradient(h[2] - h[4], 200);
console.log("scarp drop", h[2] - h[4], "gradient %", g.percent, "angle", rnd(g.angleDeg, 1), "throw", h[0] - h[5]);
chk(g.percent, 38, 1e-9);
// rift widening
console.log("years to widen 1 km at 6 mm/yr", 1e6 / 6);
// Benioff zone
const gb = gradient(70, 100);
console.log("dip", gb.angleDeg);
