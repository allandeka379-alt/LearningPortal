import { statement } from "../lib.mjs";
const U = String.raw`US\$`;
const t = { sales: 48600, ri: 1250, purch: 31400, ro: 890, oi: 3200, ci: 3650 };
const ns = t.sales - t.ri, np = t.purch - t.ro, avail = t.oi + np, cos = avail - t.ci, gp = ns - cos;
console.log("**Farai's Store**\n\n**Income statement (extract)**\n");
console.log(statement("for the year ended 31 December 2025", [
 ["Revenue", null, t.sales, null], ["Less: Returns inwards", null, -t.ri, null], [null, null, null, ns],
 ["Less: Cost of sales", null, null, null], ["Opening inventory", null, t.oi, null],
 ["Purchases", t.purch, null, null], ["Less: Returns outwards", -t.ro, null, null], [null, null, np, null], [null, null, avail, null],
 ["Less: Closing inventory", null, -t.ci, null], [null, null, null, -cos], ["**Gross profit**", null, null, `**${gp.toLocaleString("en-GB")}**`],
], { cols: [U, U, U], checks: [["ns", ns, 47350], ["np", np, 30510], ["avail", avail, 33710], ["cos", cos, 30060], ["gp", gp, 17290]] }));
