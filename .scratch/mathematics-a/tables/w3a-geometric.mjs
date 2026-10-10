// Checks the worked examples of lessons/discrete/geometric.md.
import { geo, chk, sfStr } from "../lib.mjs";
chk(geo.pmf(0.3, 4), 0.1029); chk(geo.gt(0.3, 5), 0.16807); chk(geo.cdf(0.3, 3), 0.657);
console.log("E", 1 / 0.3, "Var", geo.variance(0.3), sfStr(geo.variance(0.3), 3), "sd", sfStr(Math.sqrt(geo.variance(0.3)), 3));
chk(geo.gt(0.3, 1) - geo.gt(0.3, 5), 0.53193);
let s = 0; for (let r = 2; r <= 5; r++) s += geo.pmf(0.3, r); chk(s, 0.53193);
chk(geo.pmf(0.4, 3), 0.144);
console.log(Math.log(0.1) / Math.log(0.7), geo.cdf(0.3, 6), geo.cdf(0.3, 7));
