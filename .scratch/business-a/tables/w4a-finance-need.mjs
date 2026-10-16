import { table, sum, check } from "../lib.mjs";
const items = [["Day-old chicks (500)", 1800], ["Feed for the first three months", 2700], ["Chicken house", 4500], ["Drinkers, feeders and heaters", 1200], ["Registration and licence", 300], ["Cash for the first month's wages and transport", 1500]];
const total = sum(items.map(i=>i[1]));
console.log(table(["Start-up item","US\$"],[...items,["**Total start-up finance**",total]]), total);
const lt = sum([4500,1200]), st = sum([1800,2700,300,1500]); console.log(lt, st, check("s",lt+st,total));
const profit = 20000-8000-6000-1500, cash = -(8000+6000+1500); console.log(profit, cash, 10000+cash);
