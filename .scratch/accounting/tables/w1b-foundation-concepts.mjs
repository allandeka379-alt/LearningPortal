// Tables for lessons/concepts/foundation-concepts.md (W1b).
import { statement, journal, check, sum, r2 } from "../lib.mjs";
// Example 1: business entity — Farai's Tuck Shop, profit corrected
const draft = 7420, homeElec = 360, schoolFees = 950, phonePersonal = 145;
const corrected = r2(draft + homeElec + schoolFees + phonePersonal);
console.log(statement("Farai's Tuck Shop: corrected profit for the year ended 31 December 2025", [
  ["Draft profit", null, draft], ["Add back private expenses wrongly charged:", null, null], ["Electricity at Farai's home", homeElec, null], ["Children's school fees", schoolFees, null], ["Farai's personal phone bill", phonePersonal, null], [null, null, r2(homeElec + schoolFees + phonePersonal)], ["**Corrected profit**", null, corrected],
], { checks: [["corr", corrected, draft + 1455]] }));
console.log();
console.log(journal([{ date: "31 Dec", lines: [["Drawings", r2(homeElec + schoolFees + phonePersonal), null], ["Electricity", null, homeElec], ["Sundry expenses", null, schoolFees], ["Telephone", null, phonePersonal]], narrative: "Private expenses paid from the business bank account transferred to drawings" }]));
console.log();
// Example 2: historic cost vs market value vs break-up
const items = [["Premises", 48000, 61000, 39000], ["Delivery vehicle", 14500, 12800, 9000], ["Inventory", 6200, 7100, 3100]];
console.log("| Asset | Historic cost US\$ | Current market value US\$ | Forced-sale value if closing US\$ |\n| --- | ---: | ---: | ---: |");
for (const [a, c, m, f] of items) console.log(`| ${a} | ${c.toLocaleString("en-GB")} | ${m.toLocaleString("en-GB")} | ${f.toLocaleString("en-GB")} |`);
const tc = sum(items.map((x) => x[1])), tm = sum(items.map((x) => x[2])), tf = sum(items.map((x) => x[3]));
console.log(`| **Total** | **${tc.toLocaleString("en-GB")}** | **${tm.toLocaleString("en-GB")}** | **${tf.toLocaleString("en-GB")}** |`);
console.log({ tc, tm, tf });
