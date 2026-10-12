import { table, sum, chk, rnd } from "../lib.mjs";
const lat = [["0-10",45],["10-20",45],["20-30",35],["30-40",10],["40-50",-30],["50-60",-70],["60-70",-95],["70-80",-110],["80-90",-115]];
console.log(table(["Latitude band","Net radiation (W/m²)","Surplus or deficit"], lat.map(([l,v])=>[l,(v>0?"+":"−")+Math.abs(v),v>0?"Surplus":"Deficit"])));
// linear interpolation of zero crossing between band midpoints 35 (+10) and 45 (-30)
console.log(35 + (10/(10+30))*10);
const rain=[190,160,100,30,8,2,1,2,8,35,105,170];
const tot=sum(rain); const nm=rain[10]+rain[11]+rain[0]+rain[1]+rain[2];
console.log(tot, nm, rnd(nm/tot*100,1), rain[11]+rain[0]+rain[1], rnd((rain[11]+rain[0]+rain[1])/tot*100,1));
console.log(table(["Month","J","F","M","A","M","J","J","A","S","O","N","D"],[["Rainfall (mm)",...rain]]));
