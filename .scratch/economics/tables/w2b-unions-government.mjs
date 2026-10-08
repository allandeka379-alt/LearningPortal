// Tables for lessons/labour/unions-government.md (W2b).
import { schedule, check, money } from "../lib.mjs";
const w = [100, 120, 140, 160, 180];
const ld = w.map((x) => 2600 - 10 * x), ls = w.map((x) => -200 + 10 * x);
const A = schedule({ prices: w, qd: ld, qs: ls, priceHeader: "Monthly wage (US\\$)", qdHeader: "Farm workers demanded", qsHeader: "Farm workers supplied", requireEquilibrium: true });
console.log(A.md, A.equilibrium, A.excess);
const i = w.indexOf(160);
console.log("surplus at 160", -A.excess[i], "employment fall", A.equilibrium.quantity - ld[i]);
// Worked example 2: negotiated rise.
const basic = 250, rise = 6, workers = 400;
const newWage = basic * (1 + rise / 100);
check("new", newWage, 265);
console.log(newWage, (newWage - basic) * workers, money((newWage - basic) * workers * 12));
