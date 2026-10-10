import { Mr, sfStr, dpStr, sciStr, pH } from "../lib.mjs";
// oxygen demand of glucose: C6H12O6 + 6O2 -> 6CO2 + 6H2O; 12.0 mg/dm3 glucose
const g = Mr("C6H12O6"); console.log("Mr glucose", g, "O2 mg per dm3 for 12.0 mg", sfStr(12.0 / g * 6 * 32, 3));
// ion exchange: 500 dm3 with 0.0200 g/dm3 Pb2+
const nPb = 500 * 0.02 / 207.2; console.log("nPb", sciStr(nPb), "H+ released", sciStr(2 * nPb), "resin g at 2.00 mol/kg", sfStr(2 * nPb / 2.0 * 1000, 3));
// AMD pH 6.00e-4 mol/dm3 H2SO4 fully dissociated
console.log("pH", dpStr(pH(2 * 6.0e-4), 2));
// lime to neutralise 1000 dm3 of 6.00e-4 H2SO4 : Ca(OH)2
const n = 1000 * 6e-4; console.log("Ca(OH)2 g", sfStr(n * Mr("Ca(OH)2"), 3), Mr("Ca(OH)2"));
// pyrite: mass of H2SO4 from 1.00 kg FeS2 via 2FeS2 + 7O2 + 2H2O -> 2FeSO4 + 2H2SO4
console.log("FeS2", Mr("FeS2"), "H2SO4 g", sfStr(1000 / Mr("FeS2") * Mr("H2SO4"), 3));
// ppm: 0.0035 g Hg in 5.00 kg fish -> ppm
console.log("ppm Hg", sfStr(0.0035 / 5000 * 1e6, 3));
