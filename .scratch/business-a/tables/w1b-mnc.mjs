import { table, chk } from "../lib.mjs";
const profit = 2400000, taxRate = 25, repat = 70;
const tax = profit * taxRate / 100, after = profit - tax, out = after * repat / 100, kept = after - out;
chk(out + kept, after, 1e-6);
console.log(table(["Subsidiary of a multinational in the host country (fictional)", "US\$"], [["Profit before tax", profit], ["Corporate tax paid to the host government (25%)", tax], ["Profit after tax", after], ["Profit sent home to the parent company (70%)", out], ["Profit kept and invested in the host country", kept]]));
console.log(tax, after, out, kept);
// location: labour cost per unit
const c = [["Home country", 12, 4], ["Host country", 5, 4.5]]; // wage per hour, hours per unit? 
