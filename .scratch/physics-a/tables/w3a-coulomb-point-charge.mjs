import { DATA, sfStr, sciTex, coulombForce, deg } from "../lib.mjs";
const k = DATA.k_e;
console.log("F1", sciTex(coulombForce(4.0e-8, 2.5e-8, 0.12)));
const E1 = k * 2.0e-9 / 0.040 ** 2, E2 = k * 1.0e-9 / 0.030 ** 2;
console.log("E1", sfStr(E1, 3), "E2", sfStr(E2, 3), "R", sciTex(Math.hypot(E1, E2)), "angle from horizontal", sfStr(deg(Math.atan(E1 / E2)), 3));
const r = k * DATA.e ** 2 / (DATA.G * DATA.mp ** 2); console.log("ratio pp", sciTex(r));
console.log("E at 0.20 m from 5.0 nC", sfStr(k * 5e-9 / 0.04, 3));
// neutral point between +2 nC at 0 and +8 nC at 0.30
console.log("neutral", 0.30 / (1 + 2));
// table E vs r for 10 nC
for (const rr of [0.05, 0.10, 0.20, 0.40]) console.log(rr, sfStr(k * 10e-9 / rr / rr, 3));
