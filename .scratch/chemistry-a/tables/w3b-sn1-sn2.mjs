import { orderFrom, rateConstant, rateFrom, sciStr, sfStr, table } from "../lib.mjs";
// Lesson WE: hydrolysis of halogenoalkane Z with OH-: data
const k = 2.4e-4; // dm3 mol-1 s-1 (fictional)
const ex = [[0.010, 0.020], [0.020, 0.020], [0.010, 0.040]];
const r = ex.map(([a, b]) => rateFrom(k, [[a, 1], [b, 1]]));
console.log(table(["Exp.", "[RBr] / mol dm⁻³", "[OH⁻] / mol dm⁻³", "initial rate / mol dm⁻³ s⁻¹"], ex.map(([a, b], i) => [i + 1, sfStr(a, 2), sfStr(b, 2), sciStr(r[i], 2)])));
console.log(orderFrom(r[0], r[1], 0.01, 0.02), orderFrom(r[0], r[2], 0.02, 0.04), rateConstant(r[0], [[0.01, 1], [0.02, 1]]));
// Tertiary
const k2 = 3.5e-3; const ex2 = [[0.05, 0.1], [0.1, 0.1], [0.05, 0.2]];
const r2 = ex2.map(([a]) => rateFrom(k2, [[a, 1]]));
console.log(table(["Exp.", "[RBr] / mol dm⁻³", "[OH⁻] / mol dm⁻³", "initial rate / mol dm⁻³ s⁻¹"], ex2.map(([a, b], i) => [i + 1, sfStr(a, 2), sfStr(b, 2), sciStr(r2[i], 3)])));
console.log(orderFrom(r2[0], r2[1], 0.05, 0.1), orderFrom(r2[0], r2[2], 0.1, 0.2), rateConstant(r2[0], [[0.05, 1]]));
