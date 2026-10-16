import { table, chk, market, rd, r2 } from "../lib.mjs";
// Example 1: three firms in a market worth 2,400,000
const mk = 2400000;
const firms = [["Mapfura Bakery", 600000, 38, 9], ["Zuva Breads", 840000, 120, 21], ["Chiedza Foods", 276000, 14, 5]];
const rows = firms.map(([n, s, e, o]) => [n, s, e, o, rd(market.share(s, mk), 1).toFixed(1) + "%"]);
console.log(table(["Firm", "Annual sales (US\\$)", "Employees", "Outlets", "Market share"], rows));
chk(market.share(600000, mk), 25, 0.0001); chk(market.share(840000, mk), 35, 0.0001); chk(market.share(276000, mk), 11.5, 0.0001);
// Example 2: capital-intensive v labour-intensive
console.log(market.growth(2400000, 2640000));
// sales per employee
firms.forEach(([n, s, e]) => console.log(n, r2(s / e)));
