import { table, r2, chk } from "../lib.mjs";
const fixed = 1500; const vc = (q) => (q<=3000? q*0.40 : 3000*0.40 + (q-3000)*0.50);
const outs=[0,1000,2000,3000,4000,5000]; let prev=null;
const rows = outs.map(q=>{ const v=r2(vc(q)), tc=r2(fixed+v); const ac = q? r2(tc/q):null; const mc = prev===null? null : r2((tc-prev)/1000); prev=tc; return [q,fixed,v,tc,ac,mc]; });
console.log(rows.map(r=>r.join(" | ")).join("\n"));
console.log(table(["Output (loaves)","Fixed cost (US\$)","Variable cost (US\$)","Total cost (US\$)","Average cost per loaf (US\$)","Marginal cost per loaf (US\$)"], rows.map(r=>[String(r[0]),String(r[1]),String(r[2]),String(r[3]),r[4]===null?"-":r[4].toFixed(2),r[5]===null?"-":r[5].toFixed(2)]),["r","r","r","r","r","r"]));
