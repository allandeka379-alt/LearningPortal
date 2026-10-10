import { table, dpStr, pctChange } from "../lib.mjs";
const T=[10,20,30,40,50,60], tm=[480,250,140,95,160,520];
console.log(table(["Temperature / °C","Time to end point / s","Rate (1000/t) / s⁻¹"], T.map((x,i)=>[x,tm[i],dpStr(1000/tm[i],1)])));
const S=[0,0.5,1.0,2.0,3.0,4.0,5.0], r=[0,0.21,0.36,0.52,0.58,0.60,0.60];
console.log(table(["Hydrogen peroxide / mol dm⁻³", ...S.map(x=>dpStr(x,1))], [["Initial rate / cm³ O₂ s⁻¹", ...r.map(x=>dpStr(x,2))]]));
console.log("pct change rate 30->40", pctChange(1000/140, 1000/95));
