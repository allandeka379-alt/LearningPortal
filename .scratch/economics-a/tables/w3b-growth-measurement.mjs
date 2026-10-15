import { table, fmt, deflator, growthRate, compoundRate, roundTo } from "../lib.mjs";
const yrs=[2021,2022,2023], defl=[100,105,110], real=[8000,8400,8820], pop=[12.0,12.3,12.6];
const nom=real.map((r,i)=>deflator.nominal(r,defl[i]));
console.log(nom);
console.log(table(["Year","Nominal GDP (US$ million)","GDP deflator (2021 = 100)","Population (million)"],yrs.map((y,i)=>[String(y),nom[i],defl[i],fmt(pop[i],1)])));
console.log("real", real, "growth22", growthRate(real[0],real[1]), "g23", growthRate(real[1],real[2]));
console.log("nominal growth 23", growthRate(nom[1],nom[2]));
const ph=real.map((r,i)=>r/pop[i]); console.log("per head",ph, growthRate(ph[1],ph[2]), "g22", growthRate(ph[0],ph[1]));
console.log("compound 2021-23 real", compoundRate(real[0],real[2],2));
// lesson example 2: average growth over 4 years
console.log("compound 5000->6083.. ", compoundRate(5000, 6000, 4), growthRate(5000,6000)/4);
