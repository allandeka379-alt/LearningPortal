// W3a: price indices, inflation and real values (both boards; ZIMSEC Form 5, Cambridge AS Level).
import { concept, P, chk, table, fmt, prices, deflator, pctChange, round } from "../lib.mjs";
import { mc, LV5, LV8, LV10 } from "../tables/w3a-kit.mjs";

const items = [
  { name: "Food", weight: 45, p0: 8.0, p1: 8.8 },
  { name: "Transport", weight: 20, p0: 1.0, p1: 1.3 },
  { name: "Housing", weight: 25, p0: 150, p1: 159 },
  { name: "Other goods", weight: 10, p0: 20, p1: 22 },
];
const wt = prices.weightedTable(items, { dp: 1 });
chk(wt.index, 113.0, 1e-9);

concept("aecon.macro.price-indices-real-values", { file: "macro/price-indices-real-values", keyPrefix: "macro.price-indices-real-values" }, (b) => {
  mc(b, [1, "RECALL"], "In a consumer price index, the base year always has an index value of",
    ["100", "Correct: the base year is the reference point."],
    [["0", "A zero index would mean prices were zero."], ["1,000", "The base is not set at 1,000."], ["the inflation rate", "The index is not the inflation rate."]],
    "The base year index is set at 100.");

  mc(b, [2, "UNDERSTANDING"], "The weights in a consumer price index are based on",
    ["the share of household spending on each item", "Correct: weights show the importance of each item in the typical budget."],
    [["the number of shops that sell each item in the country", "Weights come from spending, not from the number of shops."], ["the price of each item in the base year only", "Prices give price relatives, not weights."], ["the quantity of each item imported from abroad", "Imports are not the basis of CPI weights."]],
    "Weights are taken from household expenditure surveys so that more important items count more.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The consumer price index rises from 120 to 126. The rate of inflation is",
    ["5%", "Correct: (126 − 120) ÷ 120 × 100."],
    [["6%", "That is the rise in index points, not a percentage of 120."], ["26%", "That is the index above the base year."], ["4.8%", "That divides by the new index instead of the old one."]],
    "Inflation = (126 − 120) ÷ 120 × 100 = 5%.", { hints: ["Divide the change by the earlier index."], calculator: true });

  mc(b, [2, "UNDERSTANDING"], "A real value is one that",
    ["has been adjusted to remove the effect of price changes", "Correct: it measures purchasing power or quantity."],
    [["is measured only in the currency of a foreign country", "That describes a value in another currency."], ["is always larger than the nominal value in every year", "Real values can be smaller or larger than nominal values."], ["includes taxes and subsidies on all products", "That is about market and basic prices."]],
    "A real value is a nominal value adjusted for changes in the price level.");

  mc(b, [3, "APPLICATION"], "A worker's nominal wage rises from US\\$400 to US\\$440 while the price index rises from 100 to 112. The worker's real wage",
    ["falls, because prices rose by more than wages", "Correct: wages rose 10% but prices rose 12%."],
    [["rises, because the nominal wage has increased", "A higher nominal wage does not guarantee a higher real wage."], ["is unchanged, because both have increased", "The rises are not equal, so purchasing power changes."], ["rises by 22%, the sum of the two rates", "Rates are not added to find the real change."]],
    "Real wage before = 400; real wage after = 440 ÷ 112 × 100 = US\\$392.86, so it falls.", { hints: ["Divide the new nominal wage by the new index and multiply by 100."], calculator: true });

  mc(b, [3, "APPLICATION"], "Nominal GDP is US\\$7,200 million and the GDP deflator is 120. Real GDP is",
    ["US\\$6,000 million", "Correct: 7,200 ÷ 120 × 100."],
    [["US\\$8,640 million", "That multiplies by the deflator instead of dividing."], ["US\\$7,080 million", "That subtracts 120 from the nominal figure."], ["US\\$60 million", "That divides by the deflator without scaling by 100."]],
    "Real GDP = nominal GDP ÷ deflator × 100 = 7,200 ÷ 120 × 100 = US\\$6,000 million.", { hints: ["Real = nominal ÷ index × 100."], calculator: true });

  mc(b, [3, "EVALUATION"], "Which of the following is a reason why a CPI may overstate the true rise in the cost of living?",
    ["Consumers switch to cheaper goods when some prices rise", "Correct: a fixed basket does not allow for this substitution."],
    [["The basket includes only goods that never change in price", "Then the index would show no inflation."], ["The index uses the prices of exports only", "A CPI uses consumer goods, not exports."], ["Weights are changed every day to match spending", "Frequent updating would reduce this problem."]],
    "Substitution toward cheaper goods means the fixed-basket cost of living rises less than the CPI suggests.", { hints: ["What do consumers do when a price rises a lot?"] });

  mc(b, [4, "ANALYSIS"], "Nominal GDP rises by 12% in a year when the GDP deflator rises by 9%. Real GDP rises by approximately",
    ["3%", "Correct: 12 − 9 (more exactly 2.8%)."],
    [["21%", "That adds the two rates."], ["12%", "That is the nominal growth."], ["9%", "That is the price rise."]],
    "Real growth ≈ nominal growth − price inflation = 12 − 9 = 3% (exactly 1.12 ÷ 1.09 − 1 = 2.8%).", { hints: ["Real growth is nominal growth with the price effect removed."] });

  {
    const rel = 159 / 150 * 100;
    chk(rel, 106, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "index", value: rel, dp: 1, calculator: true, daily: true,
      stem: "The price of a standard rental unit rose from US\\$150 in the base year to US\\$159 this year. Calculate its price relative (base year = 100), to one decimal place.",
      wrong: [94.3, 9, 159], explanation: "159 ÷ 150 × 100 = 106.0." });
    b.calc({ d: 3, skill: "APPLICATION", kind: "index", value: wt.index, dp: 1, calculator: true, hints: ["Weight × price relative for each item, add, divide by the total weights."],
      stem: `A weighted CPI uses four items. Weights and price relatives (base year = 100): food 45 and 110; transport 20 and 130; housing 25 and 106; other goods 10 and 110. Calculate the weighted index, to one decimal place.`,
      wrong: [114.0, 114.0 - 2, 111.5], explanation: "1. Weight × index: food 45 × 110 = 4,950; transport 20 × 130 = 2,600; housing 25 × 106 = 2,650; other 10 × 110 = 1,100.\n2. Total = 11,300.\n3. Divide by the total weights, 100: index = 113.0. (A simple average of 110, 130, 106 and 110 = 114.0 ignores weights.)" });
    const inf = prices.inflationRate(107.5, 113);
    chk(inf, 5.116279069767442, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: inf, dp: 1, calculator: true, hints: ["Inflation = change in index ÷ earlier index × 100."],
      stem: "The consumer price index was 107.5 last year and is 113.0 this year. Calculate the inflation rate, to one decimal place.",
      wrong: [13, 5.5, 4.9], explanation: "(113.0 − 107.5) ÷ 107.5 × 100 = 5.1%. (13% is the rise above the base year; 4.9% divides by the new index.)" });
    const r0 = prices.realValue(480, 110), r1 = prices.realValue(520, 118);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "pct", value: pctChange(r0, r1), dp: 1, calculator: true, hints: ["Convert both wages to base-year prices first."],
      stem: "A worker earned US\\$480 a month when the price index was 110.0 and earns US\\$520 when it is 118.0. Calculate the percentage change in her real wage, to one decimal place.",
      wrong: [8.3, 0.5, 7.3], explanation: "1. Real wage before = 480 ÷ 110.0 × 100 = US\\$436.36.\n2. Real wage now = 520 ÷ 118.0 × 100 = US\\$440.68.\n3. Change = (440.68 − 436.36) ÷ 436.36 × 100 = 1.0%. (8.3% is the nominal rise.)" });
    const d1 = 9350 / 125 * 100;
    chk(d1, 7480, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: d1, unit: "US$ million", calculator: true, hints: ["Real GDP = nominal GDP ÷ deflator × 100."],
      stem: "Nominal GDP is US\\$9,350 million and the GDP deflator is 125 (base year = 100). Calculate real GDP, in US\\$ million.",
      wrong: [11687.5, 9225, 75], explanation: "9,350 ÷ 125 × 100 = 7,480." });
    const g = pctChange(7150, 7700);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "pct", value: g, dp: 1, calculator: true, hints: ["Real growth compares real GDP in the two years."],
      stem: "Real GDP was US\\$7,150 million last year. This year nominal GDP is US\\$10,010 million and the GDP deflator is 130. Calculate real GDP growth, to one decimal place.",
      wrong: [40, 8.3, 6.5], explanation: "1. Real GDP this year = 10,010 ÷ 130 × 100 = US\\$7,700 million.\n2. Growth = (7,700 − 7,150) ÷ 7,150 × 100 = 7.7%. (Comparing nominal 10,010 with real 7,150 would give 40.0%.)" });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "If a consumer price index is 130 this year, the inflation rate this year is 30%.", answer: false,
    explanation: "False. The index of 130 means prices are 30% above the base year; the inflation rate is the percentage change from last year's index." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Who does the average basket represent?"], stem: "A CPI based on an average household's spending measures the cost of living equally accurately for rich and poor households.", answer: false,
    explanation: "False. Households spend in different patterns (poorer households spend more on food), so the index may understate or overstate their individual price changes." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Base year", "The year with an index of 100"], ["Weights", "Importance of each item in household spending"], ["GDP deflator", "Nominal GDP ÷ real GDP × 100"], ["Disinflation", "A fall in the rate of inflation"]],
    explanation: "Base year = 100; weights from spending; deflator covers the whole economy; disinflation means slower price rises." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Real value = nominal value ÷ price {{blank:a}} × {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["index"], choices: ["index", "rate", "weight"] }, { id: "b", accepted: ["100"], choices: ["100", "10", "1"] }],
    explanation: "Real value = nominal ÷ price index × 100." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the index that measures the average change in prices of all goods and services produced in an economy and is used to convert nominal GDP to real GDP.",
    accepted: ["GDP deflator", "the GDP deflator", "deflator", "GDP price deflator"], wrong: ["consumer price index"],
    explanation: "The GDP deflator." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between nominal and real values.",
    points: ["A nominal value is measured at current prices (not adjusted for inflation).", "A real value is adjusted for changes in prices, so it shows purchasing power or volume."],
    modelAnswer: "A nominal value is measured at current prices and is not adjusted for inflation, while a real value is adjusted for price changes so that it shows purchasing power or the volume of output.",
    explanation: "One mark for each definition." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Describe the steps in order."],
    stem: "Explain how a consumer price index is constructed.",
    points: ["A base year is chosen and set at 100.", "A representative basket of goods and services is selected, and prices are collected in the base year and the current year.", "Each item's price relative (current price ÷ base price × 100) is calculated.", "Items are weighted by their share in household spending, and the weighted average is found."],
    modelAnswer: "A base year is chosen and given an index of 100. A representative basket of goods and services is selected and prices are collected in the base year and the current year. The price relative of each item is calculated as the current price divided by the base price times 100. Each is multiplied by its weight, the share of household spending on it, and the weighted average gives the index.",
    explanation: "Base year, basket and prices, price relatives, weights." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 5, hints: ["Name problems and say why they matter."],
    stem: "Discuss two difficulties in measuring the cost of living using a consumer price index.",
    points: ["The basket reflects an average household, so it may not represent particular groups such as the poor.", "So the index may understate or overstate the inflation they actually face.", "Consumers substitute cheaper goods when prices rise, which a fixed basket does not allow for.", "So the index may overstate the rise in the cost of living.", "A judgement: the CPI is useful for the average, but needs supplementing."],
    modelAnswer: "The basket reflects an average household, so it may not represent groups such as the poor, who spend more on food, and the index may understate or overstate the inflation they actually face. Consumers also substitute cheaper goods when prices rise, which a fixed basket does not allow for, so the index may overstate the rise in the cost of living. Overall the CPI is a useful measure of average price changes, but it needs to be supplemented by indices for particular groups.",
    explanation: "Two difficulties, each developed, and a judgement." });

  {
    const its = [
      { name: "Maize meal", weight: 50, p0: 2.0, p1: 2.3 },
      { name: "Bus fares", weight: 30, p0: 0.5, p1: 0.65 },
      { name: "Rent", weight: 20, p0: 60, p1: 63 },
    ];
    const w2 = prices.weightedTable(its, { dp: 1 });
    chk(w2.index, 0.5 * 115 + 0.3 * 130 + 0.2 * 105, 1e-9); chk(w2.index, 117.5, 1e-9);
    const t1 = table(["Item", "Weight", "Price in base year (US\\$)", "Price this year (US\\$)"], its.map((x) => [x.name, x.weight, fmt(x.p0, 2), fmt(x.p1, 2)]));
    const rw0 = prices.realValue(300, 100), rw1 = prices.realValue(330, 117.5);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Price relative = current ÷ base × 100.", "Real value = nominal ÷ index × 100."],
      stem: `**A basket for a low-income household (illustrative data)**\n\nA statistics office constructs a simple price index for low-income households in a fictional town.\n\n${t1}\n\nA worker's monthly pay was US\\$300 in the base year and is US\\$330 this year.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "index", value: 130, dp: 1, stem: "Calculate the price relative for bus fares (base year = 100), to one decimal place.", wrong: [30, 76.9, 15], explanation: "0.65 ÷ 0.50 × 100 = 130.0." }),
        P.num({ label: "(b)", marks: 2, kind: "index", value: w2.index, dp: 1, stem: "Calculate the weighted price index (base year = 100), to one decimal place.", wrong: [116.7, 117, 112.5], explanation: "Price relatives: maize meal 115, bus fares 130, rent 105. (50 × 115 + 30 × 130 + 20 × 105) ÷ 100 = (5,750 + 3,900 + 2,100) ÷ 100 = 117.5." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: rw1, stem: "Calculate the worker's real monthly pay this year, in US\\$ at base-year prices (to the nearest cent).", wrong: [330, 280.9, 387.75], explanation: "330 ÷ 117.5 × 100 = US\\$280.85." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why the worker is worse off this year, although her nominal pay has risen.",
          points: ["Nominal pay rose by 10% (300 to 330).", "The price index rose by 17.5%, so prices rose faster than pay.", "Her real pay fell from US\\$300 to US\\$280.85 (at base-year prices).", "So her pay buys less than before: her purchasing power has fallen."],
          modelAnswer: "Her nominal pay rose by 10%, from US\\$300 to US\\$330, but the price index rose by 17.5%, so prices rose faster than her pay. Her real pay fell from US\\$300 to US\\$280.85 at base-year prices, which means her pay buys less than before and her purchasing power has fallen." }),
      ],
      explanation: "Bus fares 130.0; index 117.5; real pay US\\$280.85; prices rose by more than pay." });
  }
  {
    const t2 = table(["Year", "Nominal GDP (US\\$ million)", "GDP deflator (base year = 100)"], [["Year 1", 7590, 115], ["Year 2", 8840, 130]]);
    const r1 = 7590 / 115 * 100, r2 = 8840 / 130 * 100;
    chk(r1, 6600, 1e-9); chk(r2, 6800, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Real GDP = nominal ÷ deflator × 100.", "Growth = change ÷ original × 100."],
      stem: `**Growth in a fictional economy (illustrative data)**\n\n${t2}\n\nA newspaper reports that "the economy grew by more than 16%".`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: r1, unit: "US$ million", stem: "Calculate real GDP in Year 1, in US\\$ million.", wrong: [8728.5, 7475, 66], explanation: "7,590 ÷ 115 × 100 = 6,600." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(7590, 8840), dp: 1, stem: "Calculate the percentage growth of nominal GDP between the two years, to one decimal place.", wrong: [3, 15.5, 14.1], explanation: "(8,840 − 7,590) ÷ 7,590 × 100 = 16.5%." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: pctChange(r1, r2), dp: 1, stem: "Calculate the percentage growth of real GDP, to one decimal place.", wrong: [16.5, 13, 2.2], explanation: "Real GDP: 6,600 to 6,800. (6,800 − 6,600) ÷ 6,600 × 100 = 3.0%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why the newspaper's report is misleading as a measure of economic growth.",
          points: ["The 16.5% is the growth of nominal GDP, measured at current prices.", "Much of it reflects higher prices (the deflator rose from 115 to 130).", "Real GDP rose by only 3.0%, which measures the change in output.", "Economic growth should be measured using real GDP, so that the effect of inflation is removed."],
          modelAnswer: "The 16.5% is the growth of nominal GDP, which is measured at current prices, so much of it reflects higher prices: the deflator rose from 115 to 130. Real GDP rose by only 3.0%, which is the true growth of output. Economic growth should be measured with real GDP so that the effect of inflation is removed." }),
      ],
      explanation: "Real GDP 6,600 and 6,800; nominal growth 16.5%; real growth 3.0%; the newspaper used nominal data." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both the usefulness and the limits of the CPI.", "Reach a judgement."],
    stem: "Assess the usefulness of the consumer price index as a measure of changes in the cost of living.",
    points: ["It is simple, widely available and tracks average price changes over time.", "It is used to adjust wages, pensions and benefits, and to measure real values.", "The basket reflects a typical household, not particular groups.", "Substitution toward cheaper goods and quality improvements mean a fixed basket may overstate inflation.", "New goods and informal prices are hard to include.", "Weights are updated only occasionally, so spending patterns may change.", "Regional differences in prices are averaged out.", "A justified conclusion."],
    levels: LV8,
    modelAnswer: "The consumer price index is simple, widely available and tracks the average change in prices over time, so it is used to adjust wages, pensions and benefits and to convert nominal values to real ones. However, the basket reflects a typical household and may not represent particular groups such as the poor. A fixed basket also ignores substitution to cheaper goods and improvements in quality, so it may overstate inflation, and new goods and informal prices are difficult to include. Weights are updated only occasionally, and regional differences are averaged out. Overall the CPI is a useful guide to average price changes, but it should be used with care and supplemented with indices for specific groups.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the uses of the CPI against its measurement limitations." });

  b.card("FORMULA", "How do you calculate a **weighted price index**?", "Σ (weight × price relative) ÷ Σ weights, where price relative = current price ÷ base price × 100.");
  b.card("FORMULA", "How do you calculate the **inflation rate**?", "(Index this year − index last year) ÷ index last year × 100.");
  b.card("FORMULA", "How do you convert a nominal value to a real value?", "Real value = nominal value ÷ price index × 100.");
  b.card("FORMULA", "What is the **GDP deflator**?", "Nominal GDP ÷ real GDP × 100; real GDP = nominal GDP ÷ deflator × 100.");
  b.card("DEFINITION", "What is the **base year** of an index?", "The year used for comparison, with an index value of 100.");
  b.card("CONCEPT", "Why are weights used in a price index?", "Items differ in importance in household spending; weights make the index reflect how much is spent on each.");
  b.card("CONCEPT", "What is the difference between inflation and disinflation?", "Inflation is a rise in the price level; disinflation is a fall in the rate of inflation (prices still rising, but more slowly).");
  b.card("CONCEPT", "Give four difficulties in measuring price changes.", "Choice of basket and weights, substitution, quality change and new goods, and informal prices.");
  b.card("CONCEPT", "Why use real GDP to measure growth?", "It removes the effect of price changes so that only the change in output is shown.");
});
