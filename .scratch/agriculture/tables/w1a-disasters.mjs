import { field, money } from "../lib.mjs";
// Worked example 1: hail insurance premium, 4 ha tobacco insured at US$2,500/ha, premium 4%
const sum = 4 * 2500; const premium = (sum * 4) / 100;
console.log(sum, premium, money(premium));
// payout if 30% of the crop damaged
console.log("payout 30%", (sum * 30) / 100);
// Worked example 2: fire guard 10 m wide around a 600 m x 400 m paddock (outer strip)
const p = field(600, 400);
const guardM2 = p.perimeterM * 10; // approx (ignores corners)
console.log(p.perimeterM, guardM2, guardM2 / 10000);
