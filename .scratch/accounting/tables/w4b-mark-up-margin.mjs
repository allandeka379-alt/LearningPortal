import { ratios, d1, r2 } from "./w4b-lib.mjs";
for (const m of [25, 50, 100/3, 60]) console.log("mu", d1(m), "-> margin", d1(ratios.marginFromMarkUp(m)));
for (const g of [20, 40, 25, 37.5]) console.log("margin", g, "-> mu", d1(ratios.markUpFromMargin(g)));
const rev = 40000, mu = 100/3; const gp = r2(rev * mu / (100 + mu)); const cos = rev - gp; console.log(gp, cos, 4300 + 31500 - cos);
