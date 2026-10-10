// W3a lesson numbers for respiration/substrates-rq.md
import { chk, sfStr, dpStr, rq, rqFormula, capillaryVolume } from "../lib.mjs";
// Worked 1: tripalmitin C51H98O6 + 72.5 O2 -> 51 CO2 + 49 H2O
const tp = rqFormula({ C: 51, H: 98, O: 6 });
console.log("O2 needed", 51 + 98 / 4 - 6 / 2, "RQ", tp, sfStr(tp, 2));
// glucose
console.log("glucose", rqFormula({ C: 6, H: 12, O: 6 }));
// Worked 2: respirometer with groundnut seeds
const r = 0.5, withKOH = 30, without = 9, mins = 10;
const vO2 = capillaryVolume(r, withKOH), vNet = capillaryVolume(r, without);
const vCO2 = vO2 - vNet;
console.log("vO2", sfStr(vO2, 4), "vNet", sfStr(vNet, 4), "vCO2", sfStr(vCO2, 4), "RQ", rq(vCO2, vO2), "rate O2", sfStr(vO2 / mins, 3));
chk(rq(vCO2, vO2), 0.7);
