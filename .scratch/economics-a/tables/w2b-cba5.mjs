import { cba } from "../lib.mjs";
const c=[900,40,40,40,40], b=[0,320,320,320,320];
for (const r of [9,10,11,12,13,15]) { const x=cba({costs:c,benefits:b,ratePct:r}); console.log(r, x.pvCosts.toFixed(3), x.pvBenefits.toFixed(3), x.npv.toFixed(3)); }
