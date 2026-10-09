// W3b lesson figures (printed and pasted into the lessons; re-run to re-derive).
import { f, fmt, money, table, check, round } from "../lib.mjs";

// market-research
const sample = 250, yes = 165, pctYes = (yes / sample) * 100;
check("mr pct", pctYes, 66);
const prices = [["US\\$0.50", 40], ["US\\$0.75", 95], ["US\\$1.00", 85], ["US\\$1.25", 30]];
const tot = prices.reduce((s, [, n]) => s + n, 0);
check("mr total", tot, sample);
console.log(table(["Highest price willing to pay", "Number of people", "Percentage of sample %"], prices.map(([p, n]) => [p, n, round((n / tot) * 100, 1)])));
const atLeast1 = 85 + 30;
console.log("MR at least 1.00:", atLeast1, (atLeast1 / sample) * 100);
// quota sample
const pop = { Sakubva: 1800, Dangamvura: 1200, Chikanga: 1000 };
const popT = Object.values(pop).reduce((a, b) => a + b, 0);
const sampleQ = 200;
for (const [k, v] of Object.entries(pop)) console.log("quota", k, (v / popT) * sampleQ);

// demand-forecasting
const sales = [620, 655, 690, 725];
const inc = sales.slice(1).map((x, i) => x - sales[i]);
const avgInc = inc.reduce((a, b) => a + b, 0) / inc.length;
console.log("DF incs", inc, "avg", avgInc, "forecast", sales[3] + avgInc, sales[3] + 2 * avgInc);
console.log(table(["Month", "Sales (crates)", "Change on previous month"], [["March", sales[0], "-"], ["April", sales[1], `+${inc[0]}`], ["May", sales[2], `+${inc[1]}`], ["June", sales[3], `+${inc[2]}`]]));
const y = [2400, 2640, 2904];
console.log("growth", (y[1] - y[0]) / y[0] * 100, (y[2] - y[1]) / y[1] * 100, "forecast", y[2] * 1.1);
const ma = [180, 210, 240, 195, 225, 255];
console.log("3-month moving averages", [0, 1, 2, 3].map((i) => (ma[i] + ma[i + 1] + ma[i + 2]) / 3));

// price: cost-plus
const fixedP = 1800, vc = 4.5, units = 600;
const tc = f.totalCost(fixedP, f.totalVariableCost(vc, units)), ac = f.averageCost(tc, units);
console.log("PRICE tc", tc, "ac", ac, "price at 40%", ac * 1.4);
const cost2 = 12, mu2 = 25;
console.log("PRICE2", cost2 * (1 + mu2 / 100), "margin", f.marginFromMarkUp(mu2));

// technology: labour productivity
const before = f.labourProductivity(4800, 12), after = f.labourProductivity(7200, 10);
console.log("TECH productivity", before, after, ((after - before) / before) * 100);

// quality: reject rate
console.log("QUAL", (36 / 1200) * 100, (9 / 1200) * 100);

// location: monthly cost comparison
const sites = { "Site A (city centre)": [1500, 600, 400], "Site B (industrial area)": [700, 650, 900] };
for (const [k, v] of Object.entries(sites)) console.log("LOC", k, v.reduce((a, b) => a + b, 0));
console.log(table(["Monthly cost US\\$", "Site A (city centre)", "Site B (industrial area)"], [["Rent", 1500, 700], ["Wages", 600, 650], ["Transport of goods to customers", 400, 900], ["Total", 2500, 2250]]));
check("loc A", 1500 + 600 + 400, 2500); check("loc B", 700 + 650 + 900, 2250);

// sustainability
const bill = 380, cut = 0.65, saved = bill * cut;
console.log("SUST monthly saving", saved, "annual", saved * 12, "solar cost 9,000 -> months", 9000 / saved);

// location: relocation example
check("reloc net", (2800 - 1600 - 500) * 12, 8400);
// technology: labour cost per bottle
check("lab before", (12 * 15) / 4800, 0.0375);
console.log("lab after", (10 * 15) / 7200);
// sustainability: fabric waste saving
check("fabric", (0.15 * 2000 - 0.05 * 2000) * 3, 600);
check("solar annual", 380 * 0.65 * 12, 2964);
// quality reject rates
check("rej", (36 / 1200) * 100, 3);
check("rej2", (9 / 1200) * 100, 0.75);
console.log("ALL CHECKS OK");
