import { chk, marshallLerner, table, fmt } from "../lib.mjs";
const dep=10, pedx=-1.2, pedm=-0.6;
const qx=1+ (pedx*(-dep))/100 ; // export price falls 10% in foreign currency -> Qx +12%
const qm=1+ (pedm*dep)/100;    // import price rises 10% -> Qm -6%
const X=1000*qx, M=1000*1.10*qm;
console.log(qx,qm,X,M,X-M, marshallLerner(pedx,pedm), Math.abs(pedx)+Math.abs(pedm));
console.log(marshallLerner(-0.3,-0.5), 0.3+0.5);
console.log(table(["Quarter","Trade balance (US$ million)"],[[ "0 (before)",-100],["1",-140],["2",-120],["3",-60],["4",10],["5",40]]));
