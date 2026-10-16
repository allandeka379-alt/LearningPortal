import { table, r2, chk } from "../lib.mjs";
// overdraft vs loan for a 3-month seasonal need of 12,000
const need = 12000, od = 0.18, ln = 0.10; const odCost = need*od*3/12, lnCost = need*ln;
console.log(odCost, lnCost);
// weighted scoring
const crit = [["Cost", 30], ["Control kept", 25], ["Flexibility", 20], ["Speed of arranging", 15], ["Low risk", 10]];
const scores = { Overdraft: [3,5,5,5,2], "Bank loan": [4,5,2,3,3], "Share issue": [3,2,3,1,5] };
const tot = (s)=>s.reduce((t,v,i)=>t+v*crit[i][1],0);
for (const [k,v] of Object.entries(scores)) console.log(k, tot(v));
console.log(table(["Criterion","Weight","Overdraft","Bank loan","Share issue"],[...crit.map((c,i)=>[c[0],String(c[1]),...Object.values(scores).map(s=>String(s[i]))]),["**Weighted total**","100",...Object.values(scores).map(s=>String(tot(s)))]],["l","r","r","r","r"]));
