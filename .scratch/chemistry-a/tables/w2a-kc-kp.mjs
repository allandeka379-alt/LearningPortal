import { ice, kEq, partialPressures, sfStr, dpStr } from "../lib.mjs";
// Example 1: esterification, amounts (volume cancels)
const e = ice({ acid: 0.5, alc: 0.6, ester: 0, water: 0 }, { acid: -1, alc: -1, ester: 1, water: 1 }, "ester", 0.362);
console.log("ester eq", e, "Kc", kEq([[1, e.ester], [1, e.water]], [[1, e.acid], [1, e.alc]]));
// Example 2: PCl5 <=> PCl3 + Cl2 in 2.00 dm3: 0.200 mol PCl5 at start, 0.120 mol at equilibrium
const p = ice({ PCl5: 0.2, PCl3: 0, Cl2: 0 }, { PCl5: -1, PCl3: 1, Cl2: 1 }, "PCl5", -0.08);
const c = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, v / 2]));
console.log("PCl5", p, c, "Kc", kEq([[1, c.PCl3], [1, c.Cl2]], [[1, c.PCl5]]));
// Example 3: N2O4 <=> 2NO2, 1.00 mol N2O4, 20.0% dissociated, total 100 kPa
const n = ice({ N2O4: 1, NO2: 0 }, { N2O4: -1, NO2: 2 }, "N2O4", -0.2);
const pp = partialPressures(n, 100);
console.log(n, pp, "Kp", kEq([[2, pp.NO2.p]], [[1, pp.N2O4.p]]));
