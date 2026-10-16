import { table, fmt, pctChange, r2, market, chk } from "../lib.mjs";
const prods = [["Maize meal", 480000, 300000, 2], ["Peanut butter", 210000, 350000, 14], ["Chilli sauce", 300000, 250000, 12], ["Dried fruit", 60000, 240000, 3]];
const rows = prods.map(([n, s, r, g]) => { const rel = market.relativeShare(s, r); const hi = rel > 1; const hg = g >= 10; const cat = hi && hg ? "Star" : hi ? "Cash cow" : hg ? "Question mark" : "Dog"; return [n, s, r, r2(rel).toFixed(2), g + "%", cat]; });
console.log(table(["Product", "Sales (US\$)", "Largest rival (US\$)", "Relative share", "Market growth", "Category"], rows, ["l","r","r","r","r","l"]));
const sales = [2000, 6500, 14000, 22000, 24000, 23500, 19000, 12000];
console.log(table(["Year", "Sales (units)", "Change on previous year"], sales.map((s, i) => [`Year ${i + 1}`, s, i ? (pctChange(sales[i - 1], s) >= 0 ? "+" : "") + pctChange(sales[i - 1], s).toFixed(1) + "%" : "-"]), ["l","r","r"]));
