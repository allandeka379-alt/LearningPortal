import { chk, mdTable, round } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// Market research: 120 learners asked whether they would buy a revision app.
export const survey = [["Yes", 66], ["Maybe", 30], ["No", 24]];
export const n = survey.reduce((a, [, c]) => a + c, 0);
chk(n, 120);
export const surveyMd = mdTable(["Answer", "Number of people", "Percentage"], survey.map(([a, c]) => [a, c, `${round((c / n) * 100, 1)}%`]));
chk((66 / 120) * 100, 55);

// Pricing: cost US$4.50 and mark-up of 40%.
export const cost = 4.5;
export const markup = 0.4;
export const price = round(cost * (1 + markup), 2);
chk(price, 6.3);
export const profitUnit = round(price - cost, 2);
chk(profitUnit, 1.8);

// Digital advert: 4000 views, 160 clicks, 16 sales, advert cost US$20.
export const views = 4000;
export const clicks = 160;
export const sales = 16;
export const adCost = 20;
export const ctr = (clicks / views) * 100;
export const conv = (sales / clicks) * 100;
chk(ctr, 4);
chk(conv, 10);
export const revenue = round(sales * price, 2);
chk(revenue, 100.8);
export const goods = sales * cost;
chk(goods, 72);
export const profit = round(revenue - goods - adCost, 2);
chk(profit, 8.8);
export const cps = adCost / sales;
chk(cps, 1.25);

if (process.argv[1]?.endsWith("w3a-marketing.mjs")) {
  console.log(surveyMd);
  needs("enterprise/marketing", [surveyMd, "US\\$6.30", "4%", "10%", "US\\$100.80", "US\\$8.80", "US\\$1.25"]);
  console.log("lesson values OK");
}
