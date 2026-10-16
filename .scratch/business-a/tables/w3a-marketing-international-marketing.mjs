import { table, chk, r2 } from "../lib.mjs";
const crit=[["Market size",0.30],["Market growth",0.25],["Low competition",0.20],["Low risk",0.15],["Ease of entry",0.10]];
const scores={Zambia:[4,4,3,3,4],Botswana:[2,3,4,5,4],Malawi:[3,5,2,2,3]};
const tot={}; for(const [c,s] of Object.entries(scores)) tot[c]=r2(s.reduce((a,x,i)=>a+x*crit[i][1],0));
console.log(tot);
console.log(table(["Criterion","Weight",...Object.keys(scores)],[...crit.map(([n,w],i)=>[n,(w*100)+"%",...Object.values(scores).map(s=>s[i])]),["**Weighted score**","100%",...Object.values(tot).map(v=>v.toFixed(2))]],["l","r","r","r","r"]));
const cost=30,freight=4,ins=2, tariffRate=0.10; const cif=cost+freight+ins; const tariff=cif*tariffRate; const landed=cif+tariff; const price=48; const pu=price-landed;
console.log(cif,tariff,landed,pu, pu*5000, pu*5000-15000);
