// Figures for lessons/unemployment/job-creation.md (W2a). Illustrative, invented prices.
import { table, money, check } from "../lib.mjs";
const costs = [["100 day-old chicks at US\$0.90 each", 100 * 0.9], ["8 bags of feed at US\$30 each", 8 * 30], ["Vaccines and medicines", 15], ["Transport to market", 20], ["Drinkers, feeders and heat lamp", 60]];
const total = costs.reduce((s, c) => s + c[1], 0);
console.log(table(["Item", "Cost (US\$)"], [...costs.map(([a, b]) => [a, b.toFixed(2)]), ["**Total cost**", total.toFixed(2)]]));
const sold = 100 - 5, price = 5.5, revenue = sold * price, profit = revenue - total;
check("total", total, 425); check("rev", revenue, 522.5);
console.log({ total, sold, revenue, profit, breakEvenBirds: Math.ceil(total / price), secondBatchProfit: revenue - (total - 60) });
