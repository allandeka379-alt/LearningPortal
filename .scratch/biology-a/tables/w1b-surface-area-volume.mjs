import { table, sav, dpStr, sfStr } from "../lib.mjs";
console.log(table(["Side / cm","Surface area / cm²","Volume / cm³","SA:V"], [1,2,3,4,5].map(s=>{const r=sav(s);return [s,r.area,r.vol,dpStr(r.ratio,1)+" : 1"]})));
const c = sav([4,2,1]); console.log("cuboid", c);
const cy = sav({r:0.5,h:4}); console.log("cyl", cy, sfStr(cy.area,3), sfStr(cy.vol,3), sfStr(cy.ratio,3));
// agar: cube side s, colour penetrates d=0.25cm from each face in given time -> % coloured
for (const s of [0.5,1,2]) { const inner = Math.max(0,s-2*0.25); const pc = (1-inner**3/s**3)*100; console.log(s, pc); }
