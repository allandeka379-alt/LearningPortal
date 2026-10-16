import { table, chk, invest } from "../lib.mjs";
const stages=[["Ideas generated",200],["Passed screening",40],["Developed into prototypes",12],["Passed market tests",6],["Launched",4],["Still selling after two years",2]];
console.log(table(["Stage","Number of products","% of ideas remaining"],stages.map(([n,v])=>[n,v,(v/200*100)+"%"])));
const cost=30000+10000; const per=16000; const pb=invest.payback(cost,[per,per,per,per,per]); chk(pb,2.5,1e-9);
console.log(cost, pb, per*5, per*5-cost);
const rdTotal=60000, successful=2; console.log(rdTotal/successful);
