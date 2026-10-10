import { DATA, sfStr, sciTex, ePotential, table, dpStr } from "../lib.mjs";
const k = DATA.k_e, e = DATA.e;
// WE1: sphere +6.0 nC, potentials at 0.30 and 0.15 m, work to move +2.0 nC
const Q = 6.0e-9, q = 2.0e-9;
const V1 = ePotential(Q, 0.30), V2 = ePotential(Q, 0.15);
console.log("WE1 V(0.30)", sfStr(V1, 3), "V(0.15)", sfStr(V2, 3), "W", sciTex(q * (V2 - V1)));
// WE2: alpha 5.0 MeV on gold Z=79
const Ek = 5.0e6 * e; const r = (k * 2 * e * 79 * e) / Ek;
console.log("WE2 Ek", sciTex(Ek), "r", sciTex(r));
// WE3: +4.0 nC and -2.0 nC 0.20 m apart; midpoint potential; point where V = 0 between them
const Vm = k * (4e-9 / 0.10 - 2e-9 / 0.10); console.log("WE3 Vmid", sfStr(Vm, 3));
// V=0: 4/x = 2/(0.2-x) -> 4(0.2-x) = 2x -> 0.8 = 6x -> x = 0.1333
console.log("V=0 at x from +4", sfStr(0.8 / 6, 3));
// graph table V against r for +10 nC
const rows = [0.10, 0.15, 0.20, 0.30, 0.40, 0.60].map((rr) => [dpStr(rr, 2), sfStr(ePotential(10e-9, rr), 3)]);
console.log(table(["$r\,/\,\text{m}$", "$V\,/\,\text{V}$"], rows));
console.log("E at 0.20 analytic", sfStr(k * 10e-9 / 0.04, 3), "chord 0.15-0.30 slope", sfStr((ePotential(10e-9, 0.15) - ePotential(10e-9, 0.30)) / 0.15, 3));
// lesson graph table (12 nC)
const rows2 = [0.10, 0.15, 0.20, 0.30, 0.40, 0.60].map((rr) => [dpStr(rr, 2), sfStr(ePotential(12e-9, rr), 3)]);
console.log(table(["r / m", "V / V"], rows2));
console.log("E at 0.20 (12 nC)", sfStr(k * 12e-9 / 0.04, 3));
// PE of alpha and gold at r = 4.55e-14 check, and potential at the nucleus surface-like distance
console.log("V due to gold at 1.0e-14", sciTex(ePotential(79 * e, 1.0e-14)));
// equipotential spacing: V(r)=? r for 600,450,300,150 V for 12 nC
for (const V of [600, 450, 300, 150]) console.log("r for", V, sfStr(k * 12e-9 / V, 3));
