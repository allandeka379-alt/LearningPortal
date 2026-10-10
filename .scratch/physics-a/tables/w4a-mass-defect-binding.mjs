import { DATA, sfStr, sciTex, table, dpStr } from "../lib.mjs";
const { u, c, e } = DATA;
const mp = 1.007276, mn = 1.008665, me_u = 0.000549;
const atomic = { "H-2": [1, 2, 2.014102], "He-4": [2, 4, 4.002602], "Li-7": [3, 7, 7.016003], "C-12": [6, 12, 12.0], "O-16": [8, 16, 15.994915], "Fe-56": [26, 56, 55.934936], "Ba-141": [56, 141, 140.914411], "U-235": [92, 235, 235.043930], "U-238": [92, 238, 238.050788] };
const rows = [];
for (const [k, [Z, A, m]] of Object.entries(atomic)) {
  const mN = m - Z * me_u;
  const dm = Z * mp + (A - Z) * mn - mN;
  rows.push([k, A, dpStr(mN, 6), dpStr(dm, 6), dpStr((dm * 931.5) / A, 2)]);
}
console.log(table(["nuclide", "A", "nuclear mass / u", "Δm / u", "BE per nucleon / MeV"], rows));
console.log("1u c^2 J", sciTex(u * c * c), "MeV", sfStr(u * c * c / e / 1e6, 4));
// WE He-4
const mHe = 4.002602 - 2 * me_u, dm = 2 * mp + 2 * mn - mHe;
console.log("He nuc", mHe, "dm", dm, "kg", sciTex(dm * u), "E J", sciTex(dm * u * c * c), "MeV via J", sfStr(dm * u * c * c / e / 1e6, 4), "via 931.5", sfStr(dm * 931.5, 4), "per nucleon", sfStr(dm * 931.5 / 4, 3));
// WE 2: N-14 + He-4 -> O-17 + H-1 using atomic masses (electrons balance)
const N14 = 14.003074, He4 = 4.002602, O17 = 16.999132, H1 = 1.007825;
const q = (N14 + He4) - (O17 + H1); console.log("reaction dm", q, "MeV", sfStr(q * 931.5, 3));
// E=mc2: 1.0 g
console.log("1 g", sciTex(1e-3 * c * c));
