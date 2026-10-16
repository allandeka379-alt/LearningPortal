import { table, chk, pctChange } from "../lib.mjs";
const market = 2000000;
const a = 480000, b = 360000;
const sa = (a / market) * 100, sb = (b / market) * 100;
chk(sa, 24, 1e-9); chk(sb, 18, 1e-9);
console.log(table(["", "Sales (US\$ a year)", "Share of the Harare bread market (%)"], [
  ["Sunrise Bakery", a, sa], ["Crust & Co", b, sb], ["Combined firm", a + b, ((a + b) / market) * 100], ["All other bakeries", market - a - b, ((market - a - b) / market) * 100], ["Whole market", market, 100]]));
const before = [90000, 70000], after = 125000;
const sumBefore = before[0] + before[1];
console.log(table(["Administration and distribution overheads", "US\$ a year"], [["Sunrise Bakery", before[0]], ["Crust & Co", before[1]], ["Total before the merger", sumBefore], ["Combined firm after the merger", after], ["Annual saving", sumBefore - after]]));
console.log("saving %", ((sumBefore - after) / sumBefore) * 100);
