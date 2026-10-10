// W3a lesson numbers for respiration/atp.md
import { chk, sfStr, dpStr } from "../lib.mjs";
// Worked example 1: efficiency of aerobic respiration with given values
const atpPerGlucose = 32, perAtp = 30.5, glucose = 2870;
const captured = atpPerGlucose * perAtp;
const eff = (captured / glucose) * 100;
console.log("captured", captured, "eff", dpStr(eff, 1), sfStr(eff, 3));
chk(captured, 976);
// Worked example 2: ATP turnover in a muscle: 0.6 µmol ATP per g muscle per s? -> use moles
// A resting cell store of ATP lasts how long: store 5 mmol per kg; use 2.5 mmol per kg per s in sprinting -> 2 s
const store = 5, use = 2.5;
console.log("seconds", store / use);
// energy released by hydrolysing 0.2 mol ATP
console.log("kJ", 0.2 * perAtp);
