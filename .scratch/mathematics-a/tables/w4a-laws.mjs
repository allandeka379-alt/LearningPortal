// W4a lesson numbers: amaths.newton.laws
import { rad } from "../lib.mjs";
const S = (d) => Math.sin(rad(d)), C = (d) => Math.cos(rad(d));
console.log("Ex1 up", 70 * (10 + 1.2), "down decel", 70 * (10 + 0.8));
const R2 = 150 - 80 * S(20), F2 = 0.3 * R2, a2 = (80 * C(20) - F2) / 15;
console.log("Ex2", R2, F2, 80 * C(20), a2);
const up = 10 * (S(25) + 0.2 * C(25)), dn = 10 * (S(25) - 0.2 * C(25)), s = 144 / (2 * up);
console.log("Ex3", up, s, dn, Math.sqrt(2 * dn * s), "tan25", Math.tan(rad(25)), 10 * S(25), 2 * C(25));
