import { table, chk, mean, range, dpStr } from "../lib.mjs";
const inc = 800;
const surf = [["Open water (calm, high sun)", 0.06], ["Dense forest", 0.12], ["Grassland (savanna)", 0.2], ["Bare dry sand", 0.35], ["Fresh snow", 0.85]];
console.log(table(["Surface","Albedo","Reflected (W/m²)","Absorbed (W/m²)"], surf.map(([n,a])=>[n,a.toFixed(2),dpStr(inc*a,0),dpStr(inc*(1-a),0)])));
const clear=[11,9,8,16,25,28,22,14], cloud=[15,14,14,17,21,22,20,17];
console.log(range(clear), range(cloud), mean(clear), mean(cloud));
console.log(table(["Time","Clear sky (°C)","Cloudy (°C)"],["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00"].map((t,i)=>[t,clear[i],cloud[i]])));
console.log(30+20+50, 100-30);
console.log(15-(-18));
