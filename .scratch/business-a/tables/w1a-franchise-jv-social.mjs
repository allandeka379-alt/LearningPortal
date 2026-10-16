import { chk, table, sum, r2 } from "../lib.mjs";
const rev = 240000, cos = 120000, run = 70000, roy = rev * 0.05;
chk(roy, 12000);
const profit = rev - cos - run - roy; chk(profit, 38000);
console.log(table(["Item", "US\\$"], [["Revenue", rev], ["Cost of sales", -cos], ["Running costs", -run], ["Royalty (5% of revenue)", -roy], ["Profit before the initial fee", profit]]));
const fee = 30000; console.log(fee / profit);
const jv = 90000; console.log(jv * 0.6, jv * 0.4, 450000 * 0.6, 450000 * 0.4);
