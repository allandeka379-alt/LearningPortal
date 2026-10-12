import { simpson, table, dpStr, sum, mean } from "../lib.mjs";
const sp = ["Acacia","Combretum","Brachystegia","Dichrostachys","Grass cluster"];
const A=[30,25,20,15,10], B=[70,15,8,5,2];
for (const [n,c] of [["A",A],["B",B]]) { const s=simpson(c); console.log(n, s.N, s.sumFrac2, s.D); console.log(table(["Species","n","n/N","(n/N)²"], c.map((x,i)=>[sp[i],x,dpStr(x/s.N,2),dpStr((x/s.N)**2,4)]))); }
// quadrat density
const q=[3,5,2,4,6,0,3,4,5,3]; console.log(sum(q), mean(q));
