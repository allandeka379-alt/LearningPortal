import { hdi, pppRate, growthRate, roundTo, chk, table, fmt } from "../lib.mjs";
for (const c of [{n:"A",lifeExpectancy:60,meanYears:6,expectedYears:10,gniPerCapita:2000},{n:"B",lifeExpectancy:75,meanYears:11,expectedYears:15,gniPerCapita:12000}]) {
 const h=hdi(c); console.log(c.n, h.health.toFixed(4), h.education.toFixed(4), h.income.toFixed(4), h.hdi.toFixed(4));
}
console.log(36000/24, 36000/18, pppRate(540,30), (5-2.5), (1.05/1.025-1)*100);
