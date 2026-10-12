import { mean, sum, table, dpStr, rnd, chk } from "../lib.mjs";
const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const R = [190,170,100,35,8,2,1,2,12,45,110,175];
const T = [24,24,23,21,18,15,15,17,21,24,24,24];
console.log(table(["Month",...M],[["Rainfall (mm)",...R],["Mean temperature (°C)",...T]]));
const tot = sum(R); console.log("total",tot);
const wet = R[10]+R[11]+R[0]+R[1]+R[2]; console.log("Nov-Mar",wet, (wet/tot*100));
console.log("dry months <25", R.filter(x=>x<25).length, "mean T", mean(T), "range", Math.max(...T)-Math.min(...T));
// NPP
const npp = {rain:2200,sav:900,des:90}; console.log(npp.rain/npp.des, npp.sav/npp.rain*100, (npp.rain-npp.sav));
const bio={rain:45,sav:4,des:0.7}; console.log(bio.rain/bio.sav, bio.rain/bio.des);
