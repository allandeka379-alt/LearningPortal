// Worked-example checks for lessons/trig/equations.md
import { same, solveTrig, round, deg } from "../lib.mjs";
const r = (a, d = 1) => a.map((x) => round(x, d));
console.log("Ex1", r(solveTrig({ fn: "sin", k: -0.4, lo: 0, hi: 360 })), round(deg(Math.asin(-0.4)), 2));
same(solveTrig({ fn: "tan", k: Math.sqrt(3), a: 2, lo: 0, hi: 360 }), [30, 120, 210, 300]);
console.log("Ex3", r(solveTrig({ fn: "sin", k: 0.5, b: Math.PI / 3, lo: 0, hi: 2 * Math.PI, unit: "rad" }).map((x) => x / Math.PI), 6));
same(solveTrig({ fn: "sec", k: 2, a: 3, lo: 0, hi: 180 }), [20, 100, 140]);
console.log("Ex5", r(solveTrig({ fn: "tan", k: 4 / 3, lo: 0, hi: 360 })), deg(Math.atan(4 / 3)));
same([...solveTrig({ fn: "cos", k: 0.5, lo: 0, hi: 360 }), ...solveTrig({ fn: "tan", k: -1, lo: 0, hi: 360 })].sort((a, b) => a - b), [60, 135, 300, 315]);
same([...solveTrig({ fn: "cos", k: 0, lo: 0, hi: 360 }), ...solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: 360 })].sort((a, b) => a - b), [30, 90, 150, 270]);
console.log("ok");
