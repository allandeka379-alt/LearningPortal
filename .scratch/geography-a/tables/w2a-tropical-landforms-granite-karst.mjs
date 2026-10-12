import { chk, rnd, gradient } from "../lib.mjs";
const g = gradient(180, 300);
console.log("dwala gradient %", g.percent, "angle", rnd(g.angleDeg, 1));
console.log("lowering time (yr)", (10 * 1000) / 0.04, "= ", (10 * 1000 * 1000) / 40, " (10 m = 10 000 mm at 40 mm per 1000 yr)");
console.log("cockpit density", chk(48 / 12, 4));
