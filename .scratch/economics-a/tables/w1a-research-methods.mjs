import { table, chk } from "../lib.mjs";
// Stratified sample: 2,400 households, three suburbs; sample 120.
const N = [1200, 800, 400], tot = N.reduce((a, b) => a + b), n = 120;
const alloc = N.map((x) => (x / tot) * n);
console.log(alloc, tot);
console.log(table(["Suburb", "Households", "Share of population (%)", "Sample"], [["Suburb A", 1200, 50, alloc[0]], ["Suburb B", 800, 100 / 3 , alloc[1]], ["Suburb C", 400, 100 / 6, alloc[2]]]));
console.log("interval", tot / n);
// Sampling error example: 4 of 50 vs 40 of 500 -> proportion
console.log(18 / 60 * 100, 45 / 150 * 100);
// Non-response: 200 questionnaires sent, 62 returned
console.log(62 / 200 * 100);
// sample 150 from 3,000 -> 5%
console.log(150 / 3000 * 100, 3000 / 150);
// pilot: 15 respondents
