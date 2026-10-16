import { table, chk, cvp } from "../lib.mjs";
const c = cvp({ price: 3, variable: 1.4, fixed: 400 });
chk(c.contribution, 1.6);
chk(c.breakEvenUnits, 250);
console.log(c.table([0, 125, 250, 400]));
chk(c.profitAt(400), 240);
chk(c.profitAt(320), 112);
chk(c.marginOfSafetyPct(400), 37.5, 0.0001);
console.log(c.profitAt(400), c.profitAt(320), c.marginOfSafetyPct(400));
