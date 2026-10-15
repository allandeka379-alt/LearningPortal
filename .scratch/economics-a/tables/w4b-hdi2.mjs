import { hdi } from "../lib.mjs";
for (const c of [{lifeExpectancy:66,meanYears:8,expectedYears:12,gniPerCapita:4500},{lifeExpectancy:70,meanYears:9,expectedYears:13.5,gniPerCapita:3000},{lifeExpectancy:58,meanYears:5,expectedYears:9,gniPerCapita:1500}]) { const h=hdi(c); console.log(h.health, h.education, h.income, h.hdi) }
console.log(4500/3900, 1.06/1.02, 55000/22, 55000/16);
