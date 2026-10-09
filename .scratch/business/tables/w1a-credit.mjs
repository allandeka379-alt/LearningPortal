import { r2, money } from "../lib.mjs";
const cash1=450, dep1=r2(cash1*0.2), inst1=36, n1=12; const tot1=r2(dep1+inst1*n1);
console.log("E1", dep1, inst1*n1, tot1, r2(tot1-cash1));
const cash2=600, dep2=r2(cash2*0.15), inst2=58, n2=10; const tot2=r2(dep2+inst2*n2);
console.log("E2", dep2, inst2*n2, tot2, r2(tot2-cash2), r2((tot2-cash2)/cash2*100));
