// W4a lesson numbers: amaths.forces.friction
import { rad, chk } from "../lib.mjs";
const { sin, cos, tan } = Math;
const S = (d) => sin(rad(d)), C = (d) => cos(rad(d));
// Ex1: 12 kg, mu 0.35, g = 10; horizontal 30 N; then P at 25° above horizontal, limiting
const R0 = 120, Fmax = 0.35 * R0;
const P1 = Fmax / (C(25) + 0.35 * S(25));
console.log("Ex1 Fmax", Fmax, "P", P1, "R", 120 - P1 * S(25), "check", P1 * C(25), 0.35 * (120 - P1 * S(25)));
// Ex2: 3 kg, 20°, mu 0.45
console.log("Ex2 tan20", tan(rad(20)), "Fneeded", 30 * S(20), "Fmax", 0.45 * 30 * C(20), "P", 30 * S(20) + 0.45 * 30 * C(20));
// Ex3: 5 kg, 40°, mu 0.3, horizontal P
const W = 50, mu = 0.3;
const Pmin = W * (S(40) - mu * C(40)) / (C(40) + mu * S(40));
const Pmax = W * (S(40) + mu * C(40)) / (C(40) - mu * S(40));
console.log("Ex3 Pmin", Pmin, "Pmax", Pmax, "tan40", tan(rad(40)));
const Rmin = W * C(40) + Pmin * S(40); chk(Pmin * C(40) + mu * Rmin, W * S(40));
const Rmax = W * C(40) + Pmax * S(40); chk(Pmax * C(40), mu * Rmax + W * S(40));
console.log("Rmin", Rmin, "Rmax", Rmax, "Wsin40", W*S(40), "Wcos40", W*C(40), "num", W * (S(40) - mu * C(40)), "den", C(40) + mu * S(40), W * (S(40) + mu * C(40)), C(40) - mu * S(40));
