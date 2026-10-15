import { population, dependencyRatio, chk, table, fmt } from "../lib.mjs";
const pop=8_000_000, births=240_000, deaths=96_000, imm=10_000, emi=50_000;
const br=population.ratePerThousand(births,pop), dr=population.ratePerThousand(deaths,pop);
const ni=population.naturalIncrease(br,dr); const nm=population.netMigration(imm,emi);
console.log(br,dr,ni, ni/10, nm, population.ratePerThousand(nm,pop), (births-deaths+nm), (births-deaths+nm)/pop*100);
console.log(dependencyRatio(3_200_000+400_000, 4_400_000));
console.log(table(["Age group","Population (millions)"],[["0–14",3.2],["15–64",4.4],["65 and over",0.4]],{dp:[undefined,1]}));
