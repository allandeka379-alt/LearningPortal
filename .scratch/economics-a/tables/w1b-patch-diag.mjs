import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-diagrams-and-data.mjs";
let s = fs.readFileSync(p, "utf8");
const R = (a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a.slice(0, 70));
  s = s.split(a).join(b);
};
// q06 wage MCQ
R(String.raw`A worker's nominal wage rises from US\\$400 to US\\$462 while the price index rises from 100 to 110. The real wage in the original prices is`, String.raw`A worker's nominal wage rises from US\\$500 to US\\$630 while the price index rises from 100 to 120. The real wage in the original prices is`);
R(String.raw`Real wage = 462 ÷ 110 × 100 = US\\$420, a rise of 5% against the nominal rise of 15.5%.`, String.raw`Real wage = 630 ÷ 120 × 100 = US\\$525, a rise of 5% against the nominal rise of 26%.`);
R(String.raw`["US\\$420", "Correct: deflated by the price index."], [["US\\$462", "This is the nominal wage."], ["US\\$508", "This multiplies by the index instead of dividing."], ["US\\$400"`, String.raw`["US\\$525", "Correct: deflated by the price index."], [["US\\$630", "This is the nominal wage."], ["US\\$756", "This multiplies by the index instead of dividing."], ["US\\$500"`);
// q08
R("const g = pctChange(275, 330);", "const g = pctChange(320, 384);");
R(String.raw`sales are US\\$275 thousand in 2023 and US\\$330 thousand in 2024.`, String.raw`sales are US\\$320 thousand in 2023 and US\\$384 thousand in 2024.`);
R("(330 − 275) ÷ 275 × 100 = ${dpStr(g, 0)}%. Using 330 as the base gives 16.7%.", "(384 − 320) ÷ 320 × 100 = ${dpStr(g, 0)}%. Using 384 as the base gives 16.7%.");
// q09 index
R("const idx = (330 / 250) * 100;", "const idx = (300 / 240) * 100;");
R("chk(idx, 132, 1e-9);", "chk(idx, 125, 1e-9);");
R(String.raw`stem: "The same firm's sales were US\\$250 thousand in 2022. Taking 2022 as the base year (= 100), calculate the index of sales in 2024 (US\\$330 thousand).",
      wrong: [32, 120, 110],
      explanation: ` + "`Index = 330 ÷ 250 × 100 = ${idx}. Sales in 2024 are 32% above the base year.`", String.raw`stem: "A fictional firm's sales were US\\$240 thousand in the base year 2020 (= 100) and US\\$300 thousand in 2024. Calculate the index of sales in 2024.",
      wrong: [25, 120, 80],
      explanation: ` + "`Index = 300 ÷ 240 × 100 = ${idx}. Sales in 2024 are 25% above the base year.`");
// q10 real
R("const real = prices.realValue(330, 120);\n    chk(real, 275, 1e-9);", "const real = prices.realValue(351, 130);\n    chk(real, 270, 1e-9);");
R(String.raw`stem: "Nominal sales in 2024 are US\\$330 thousand and the price index (2022 = 100) is 120. Calculate real sales in 2022 prices, in US\\$ thousand.",
      wrong: [396, 330, 250],`, String.raw`stem: "Nominal sales in 2025 are US\\$351 thousand and the price index (2020 = 100) is 130. Calculate real sales in 2020 prices, in US\\$ thousand.",
      wrong: [456.3, 351, 221],`);
R("Real sales = 330 ÷ 120 × 100 = US\\\\$${fmt(real)} thousand. Multiplying by 120 ÷ 100 gives 396.", "Real sales = 351 ÷ 130 × 100 = US\\\\$${fmt(real)} thousand. Multiplying by 130 ÷ 100 gives 456.3.");
// struct 2
R("prices.inflationRate(100, 110), real = prices.realValue(462, 110);\n    chk(infl, 10, 1e-9); chk(real, 420, 1e-9);", "prices.inflationRate(100, 108), real = prices.realValue(594, 108);\n    chk(infl, 8, 1e-9); chk(real, 550, 1e-9);");
R(String.raw`table(["", "2022", "2023"], [["Unemployment rate (%)", "8", "10"], ["Consumer price index (2022 = 100)", "100", "110"], ["Average monthly nominal wage (US\\$)", "400", "462"]]`, String.raw`table(["", "2024", "2025"], [["Unemployment rate (%)", "7", "9"], ["Consumer price index (2024 = 100)", "100", "108"], ["Average monthly nominal wage (US\\$)", "500", "594"]]`);
R(`stem: "Calculate the inflation rate between 2022 and 2023.", wrong: [9.1, 100], explanation: "(110 − 100) ÷ 100 × 100 = 10%."`, `stem: "Calculate the inflation rate between 2024 and 2025.", wrong: [7.4, 108], explanation: "(108 − 100) ÷ 100 × 100 = 8%."`);
R(`explanation: "10 − 8 = 2 percentage points."`, `explanation: "9 − 7 = 2 percentage points."`);
R(String.raw`stem: "Calculate the average real wage in 2023, in 2022 prices.", wrong: [462, 508], explanation: "462 ÷ 110 × 100 = US\\$420."`, String.raw`stem: "Calculate the average real wage in 2025, in 2024 prices.", wrong: [594, 641.5], explanation: "594 ÷ 108 × 100 = US\\$550."`);
R(`points: ["Prices rose by 10% (inflation).", "Nominal wages rose by 15.5% but part of the rise only keeps up with prices, so the real rise is 5%."]`, `points: ["Prices rose by 8% (inflation).", "Nominal wages rose by 18.8% but part of the rise only keeps up with prices, so the real rise is 10%."]`);
R(String.raw`Prices rose by 10%, so part of the 15.5% rise in nominal wages was needed just to keep up with higher prices. The rise in purchasing power is only 5%, from US\\$400 to US\\$420 in 2022 prices.`, String.raw`Prices rose by 8%, so part of the 18.8% rise in nominal wages was needed just to keep up with higher prices. The rise in purchasing power is only 10%, from US\\$500 to US\\$550 in 2024 prices.`);
R(`better off in 2023.`, `better off in 2025.`);
R(`real wage up 5% so purchasing power rose`, `real wage up 10% so purchasing power rose`);
R(`The average employed worker is better off because the real wage rose by 5%.`, `The average employed worker is better off because the real wage rose by 10%.`);
R(`explanation: "Inflation 10%; unemployment +2 percentage points; real wage 420."`, `explanation: "Inflation 8%; unemployment +2 percentage points; real wage 550."`);
fs.writeFileSync(p, s);
console.log("patched");
