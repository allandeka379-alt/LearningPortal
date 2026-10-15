import { table, fmt, roundTo, keynes } from "../lib.mjs";
const Y=[0,100,200,300,400,500]; const C=Y.map(y=>40+0.8*y); const S=Y.map((y,i)=>y-C[i]);
console.log(table(["National income Y","Consumption C","Saving S","APC","APS","MPC (from previous row)"],Y.map((y,i)=>[y,C[i],S[i],y?fmt(roundTo(C[i]/y,2),2):"–",y?fmt(roundTo(S[i]/y,2),2):"–",i?fmt((C[i]-C[i-1])/(y-Y[i-1]),2):"–"])));
const out=[100,110,114,114,120]; const v=3;
console.log(table(["Year","Output","Change in output","Induced investment (v=3)"],out.map((o,i)=>[String(i+1),o,i?o-out[i-1]:"–",i?keynes.accelerator(v,o-out[i-1]):"–"])));
