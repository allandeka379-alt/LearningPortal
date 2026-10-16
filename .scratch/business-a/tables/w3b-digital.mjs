import { table, chk, r2 } from "../lib.mjs";
const visitors = 12000, orders = 360, aov = 22, spend = 1584;
const conv = orders / visitors * 100, rev = orders * aov, cpo = spend / orders, share = spend / rev * 100;
chk(conv, 3, 1e-9); chk(rev, 7920); chk(cpo, 4.4, 1e-9); chk(share, 20, 1e-9);
console.log(table(["Measure", "Working", "Result"], [["Conversion rate", "360 ÷ 12,000 × 100", "3.0%"], ["Revenue (US\$)", "360 × 22", rev], ["Advertising cost per order (US\$)", "1,584 ÷ 360", cpo.toFixed(2)], ["Advertising as % of revenue", "1,584 ÷ 7,920 × 100", share.toFixed(1) + "%"]], ["l","l","r"]));
// example: compare two channels
const social = { spend: 800, visitors: 5000, orders: 200 }, search = { spend: 784, visitors: 7000, orders: 160 };
for (const [n, c] of [["Social media", social], ["Search", search]]) console.log(n, c.orders / c.visitors * 100, c.spend / c.orders);
