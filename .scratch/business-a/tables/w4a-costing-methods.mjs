import { costing, table, r2, chk } from "../lib.mjs";
const oh = 6000;
const prods = [{ n:"Bread", units:4000, dc:0.55, hrs:600, price:1.80 }, { n:"Cakes", units:1000, dc:2.30, hrs:400, price:6.00 }];
const byHrs = costing.apportion(oh, prods.map(p=>[p.n,p.hrs])); const byUnits = costing.apportion(oh, prods.map(p=>[p.n,p.units]));
const rows = prods.map((p,i)=>{ const o=byHrs[i].share, rev=p.units*p.price, d=p.units*p.dc; return [p.n, rev, d, o, rev-d-o, (p.dc+o/p.units), p.price-p.dc, (p.price-p.dc)*p.units]; });
console.log(rows); const tot = rows.reduce((s,r)=>s+r[4],0); console.log(tot);
console.log(byUnits, prods.map((p,i)=>p.units*p.price-p.units*p.dc-byUnits[i].share));
console.log(table(["","Bread","Cakes","Total"],[["Units made",4000,1000,5000],["Selling price per unit (US\$)","1.80","6.00",""],["Revenue",7200,6000,13200],["Direct costs (0.55 and 2.30 per unit)",2200,2300,4500],["Labour hours",600,400,1000],["Overheads absorbed (US\$6 per hour)",3600,2400,6000],["**Profit**",1400,1300,2700]]));
console.log(costing.priceFromMarkUp(1.45,25), costing.priceFromMarkUp(4.70,25));
