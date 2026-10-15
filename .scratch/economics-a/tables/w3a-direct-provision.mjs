import { chk, fmt, table, pctChange } from "../lib.mjs";
// Example 1: district clinic provision (illustrative)
const budget = 4_200_000, pop = 600_000, visits = 210_000;
console.log("per head", budget / pop, "per visit", budget / visits);
// Example 2: information campaign
const adults = 50_000, before = 18, after = 15.5;
const fewer = adults * (before - after) / 100;
console.log("fewer smokers", fewer, "cost per", 60_000 / fewer);
// Example 3: provision vs contracting out schools: cost per pupil
const costs = [["Public clinic A", 900_000, 30_000], ["Public clinic B", 1_200_000, 32_000], ["Contracted clinic C", 1_000_000, 40_000]];
console.log(table(["Clinic", "Annual cost (US\$)", "Patient visits", "Cost per visit (US\$)"], costs.map(([n,c,v]) => [n,c,v,fmt(c/v,2)])));
// Opportunity cost: 1.5 million for road vs clinics: 1.5m / 4.2m
console.log(1_500_000 / 4_200_000 * 100);
