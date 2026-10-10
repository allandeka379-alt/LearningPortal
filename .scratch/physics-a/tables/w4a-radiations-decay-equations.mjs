import { DATA, sfStr, sciTex, table } from "../lib.mjs";
const { u, e, me } = DATA;
// beta spectrum shape, Emax 0.546 MeV (Sr-90) illustrative
const Emax = 0.546;
const Es = [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.546];
const f = (E) => Math.sqrt(E) * (Emax - E) ** 2;
const fm = Math.max(...Es.map(f));
console.log(table(["E_k / MeV", "relative number"], Es.map((E) => [E.toFixed(2), sfStr((100 * f(E)) / fm, 2)])));
// alpha speed 4.8 MeV, mass 4.00 u
const Ek = 4.8e6 * e, m = 4.0 * u;
console.log("alpha Ek J", sciTex(Ek), "v", sciTex(Math.sqrt((2 * Ek) / m)));
// mass/charge ratios
console.log("alpha q/m", sciTex((2 * e) / m), "beta q/m", sciTex(e / me), "ratio", sfStr(e / me / ((2 * e) / m), 3));
