import { chk, same, mdTable, round } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

const D = "US\\$";
export const money = (x) => `${D}${x.toLocaleString("en-US")}`;
// Start-up costs of a repair shop
export const startup = [["Tools and test equipment", 900], ["Furniture and shelving", 350], ["Opening stock of spare parts", 650], ["Registration and licences", 200], ["Launch advertising", 300]];
export const startTotal = startup.reduce((a, [, c]) => a + c, 0);
chk(startTotal, 2400);
export const startMd = mdTable(["Start-up cost", "Amount"], [...startup.map(([n, c]) => [n, money(c)]), ["**Total**", `**${money(startTotal)}**`]]);

// Monthly budget
export const jobs = 70;
export const charge = 14;
export const revenue = jobs * charge;
chk(revenue, 980);
export const costs = [["Rent", 220], ["Electricity and internet", 70], ["Spare parts used", 260], ["Part-time assistant", 200]];
export const costTotal = costs.reduce((a, [, c]) => a + c, 0);
chk(costTotal, 750);
export const profit = revenue - costTotal;
chk(profit, 230);
export const monthlyMd = mdTable(["Item", "Per month"], [["Revenue (70 jobs at US\\$14)", money(revenue)], ...costs.map(([n, c]) => [n, money(c)]), ["Total costs", money(costTotal)], ["**Profit**", `**${money(profit)}**`]]);
export const payback = startTotal / profit;
chk(payback, 10.4348, 1e-3);
export const paybackMonths = Math.ceil(payback);
chk(paybackMonths, 11);
export const annual = profit * 12;
chk(annual, 2760);
export const roi = round((annual / startTotal) * 100, 0);
chk(roi, 115);
// Sensitivity: only 60 jobs
export const lowRevenue = 60 * charge;
export const lowProfit = lowRevenue - costTotal;
chk(lowProfit, 90);
export const lowPayback = round(startTotal / lowProfit, 1);
chk(lowPayback, 26.7, 1e-6);

if (process.argv[1]?.endsWith("w3a-business-proposal.mjs")) {
  console.log(startMd);
  console.log(monthlyMd);
  needs("enterprise/business-proposal", [startMd, monthlyMd, "10.4", "11 months", "115%", "26.7 months"]);
  console.log("lesson values OK");
}
