import { ecell, Mr, massLiberated, charge, sfStr, dpStr, sciStr, VM_RTP } from "../lib.mjs";
const E = { Co3Co2: 1.82, O2acid: 1.23, CoNH3: 0.11, O2alk: 0.40, Ni: -0.25 };
console.log("Co3+ + water", dpStr(ecell(E.Co3Co2, E.O2acid), 2), "O2 + [Co(NH3)6]2+", dpStr(ecell(E.O2alk, E.CoNH3), 2), "O2 acid + Co2+aq", dpStr(ecell(E.O2acid, E.Co3Co2), 2));
const Q = charge(200, 10 * 3600), m = massLiberated(Q, 58.7, 2); console.log("Q", Q, "mass Ni g", m, sfStr(m/1000, 3));
const Mt = Mr("C57H104O6"); const n = 1000 / Mt; console.log("Mr triolein", Mt, "mol", sfStr(n, 3), "H2 dm3", sfStr(n * 3 * VM_RTP, 3));
const a = Mr("CoCl2"), h = Mr("CoCl2.6H2O"); console.log("CoCl2", a, "hexa", h, "mass from 1.30", sfStr(1.30 / a * h, 3));
