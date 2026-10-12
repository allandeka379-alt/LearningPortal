import { table, mean, sum, rnd, chk } from "../lib.mjs";
const U=[21,20,19,24,29,32,28,24], R=[17,15,14,21,28,30,25,20];
const D=U.map((u,i)=>u-R[i]); console.log(D, sum(D), mean(D), Math.max(...D));
const city=[910,840,1010,770,880], rur=[860,800,940,760,820];
console.log(sum(city),sum(rur),mean(city),mean(rur), mean(city)-mean(rur), (mean(city)-mean(rur))/mean(rur)*100);
