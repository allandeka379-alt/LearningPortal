import { table, money, fmt, check } from "../lib.mjs";
const revenue = 18000, rent = 2400, wages = 7200, loan = 15000, rate = 10, materials = 3100;
const interest = loan * rate / 100, profit = revenue - rent - wages - interest - materials;
check("profit", profit, 3800);
console.log(table(["Item", "Factor of production or other cost", "Amount for the year (US\$)"], [
  ["Sales of tomatoes", "Revenue", revenue], ["Rent of 2 hectares", "Land: rent", rent], ["Pay of three farm workers", "Labour: wages", wages],
  [`Interest on a ${money(loan)} loan at ${rate}%`, "Capital: interest", interest], ["Seed, fertiliser and fuel", "Materials bought from other firms", materials], ["What is left for Chipo", "Enterprise: profit", profit]]));
console.log(interest, profit, (profit/revenue*100).toFixed(1));
