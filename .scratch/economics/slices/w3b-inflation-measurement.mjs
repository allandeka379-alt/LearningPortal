// W3b: econ.inflation.measurement — CPI (and RPI for ZIMSEC): base year, basket, weights, weighted index, rate of
// inflation, comparing periods, real values. Figures differ from the lesson's worked examples.
import { concept, P, ZIM, table, prices, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.inflation.measurement", { file: "inflation/measurement", keyPrefix: "inflation.measurement" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a price index, the base year always has an index number of",
    options: [["100", "Correct: other years are compared with the base year at 100."], ["0", "An index of 0 would mean prices of zero."], ["1", "Indices are expressed relative to 100, not 1."], ["1,000", "The usual convention is 100."]],
    answer: "A",
    explanation: "The base year is set at 100; an index of 108 means prices are 8% higher than in the base year.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are **weights** used when calculating a consumer price index?",
    options: [
      ["To give more importance to items on which households spend more", "Correct: weights reflect shares of spending."],
      ["To show how heavy each item in the basket is", "Weights measure importance in spending, not physical weight."],
      ["To make the index equal 100 every year", "Only the base year is 100."],
      ["To leave out items whose prices have fallen since the base year", "All items in the basket are included."],
    ],
    answer: "A",
    explanation: "A price change in a large spending item (such as food) affects living costs more, so it gets a larger weight.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How are the items in the CPI basket and their weights chosen?",
    options: [
      ["From a survey of what households spend their income on", "Correct: a household expenditure survey."],
      ["From the list of goods that the country exports", "Exports are bought by foreigners, not households."],
      ["From the goods with the highest prices", "The basket represents typical spending, not the dearest goods."],
      ["From the goods produced by government-owned firms", "Ownership does not decide the basket."],
    ],
    answer: "A",
    explanation: "A household expenditure survey shows what typical households buy and how much they spend on each group.",
  });
  {
    const i0 = 150, i1 = 165, r = prices.inflationRate(i0, i1);
    check("r", r, 10);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `A fictional country's CPI rises from ${i0} to ${i1} in a year. What is the rate of inflation?`,
      options: [
        [`${pct(r, 1)}`, `Correct: (${i1} − ${i0}) ÷ ${i0} × 100 = ${pct(r, 1)}.`],
        ["15.0%", "15 is the rise in index points, not the percentage."],
        [`${pct(((i1 - i0) / i1) * 100, 1)}`, "This divides by the new index instead of the old one."],
        ["65.0%", "This compares the new index with the base year (100), not with last year."],
      ],
      answer: "A",
      hints: ["Divide the change by last year's index."],
      explanation: "Rate of inflation = change in the index ÷ previous index × 100.",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The price index for clothing this year is 94 (base year = 100). What does this mean?",
    options: [
      ["Clothing prices are 6% lower than in the base year", "Correct: 94 is 6 below 100."],
      ["Clothing prices rose by 94% since the base year", "That would be an index of 194."],
      ["Clothing prices rose by 6% since the base year", "An index below 100 shows a fall."],
      ["Clothing has a weight of 94 in the CPI", "The index and the weight are different numbers."],
    ],
    answer: "A",
    explanation: "An index below 100 means prices are lower than in the base year.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Besides the Consumer Price Index, which index does the ZIMSEC syllabus name for calculating the rate of inflation?",
    options: [
      ["The Retail Price Index", "Correct: ZIMSEC names both the CPI and the RPI."],
      ["The Human Development Index", "The HDI measures development, not prices."],
      ["The terms of trade index", "This compares export and import prices."],
      ["The unemployment index", "This is not a measure of prices."],
    ],
    answer: "A",
    explanation: "ZIMSEC asks learners to calculate inflation using the CPI and the RPI.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Why might the CPI understate the rise in the cost of living for a poor household?",
    options: [
      ["Poor households spend a larger share on food, whose prices may rise faster than average", "Correct: their spending pattern differs from the average basket."],
      ["Poor households do not pay any prices included in the CPI", "Poor households buy many items in the basket."],
      ["The CPI includes only luxury goods", "The basket covers typical household spending."],
      ["The CPI is calculated only once every ten years, so it is always out of date", "It is usually published monthly."],
    ],
    answer: "A",
    hints: ["Does every household spend its money in the same way as the 'average' basket?"],
    explanation: "The CPI weights reflect average spending; a household with a different pattern can face a different rate of inflation.",
  });
  {
    const items = [{ name: "Food", weight: 60, p0: 1, p1: 1.2 }, { name: "Other", weight: 40, p0: 1, p1: 1.05 }];
    const w = prices.weightedIndex(items), simple = (120 + 105) / 2;
    check("w", w, 114); check("simple", simple, 112.5);
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: "Food has a weight of 60 and all other items a weight of 40. Food prices rise by 20% and other prices by 5%. What is the weighted price index (base = 100)?",
      options: [
        [fmt(w, 1), `Correct: (60 × 120 + 40 × 105) ÷ 100 = ${fmt(w, 1)}.`],
        [fmt(simple, 1), "This is a simple average that ignores the weights."],
        ["125.0", "This adds the two percentage rises."],
        ["111.0", "This applies the weights the wrong way round (40 on food, 60 on other items)."],
      ],
      answer: "A",
      hints: ["Item indices are 120 and 105; multiply each by its weight."],
      explanation: `Weighted index = (60 × 120 + 40 × 105) ÷ 100 = ${fmt(w, 1)}. Swapping the weights gives 111.0; a simple average gives 112.5.`,
    });
    check("swap", (40 * 120 + 60 * 105) / 100, 111);
  }

  // Numericals.
  {
    const p0 = 3.2, p1 = 3.68, i = prices.simpleIndex(p0, p1);
    check("i", i, 115);
    b.num({
      d: 2, skill: "APPLICATION", kind: "index", value: i, daily: true, calculator: true,
      stem: `A loaf of bread cost US\\$${fmt(p0, 2)} in the base year and costs US\\$${fmt(p1, 2)} now. Calculate the price index for bread. Give your answer to one decimal place.`,
      wrong: [(p0 / p1) * 100],
      explanation: `Index = ${fmt(p1, 2)} ÷ ${fmt(p0, 2)} × 100 = **${fmt(i, 1)}**. Dividing the old price by the new one gives ${fmt((p0 / p1) * 100, 1)}.`,
    });
  }
  {
    const items = [{ name: "Food", weight: 50, p0: 4, p1: 4.6 }, { name: "Fuel and transport", weight: 30, p0: 1.5, p1: 1.8 }, { name: "Clothing", weight: 20, p0: 10, p1: 9.5 }];
    const W = prices.weightedTable(items), simple = items.reduce((s, x) => s + (x.p1 / x.p0) * 100, 0) / 3;
    check("W", W.index, 112.5);
    const T = table(["Item", "Weight", "Base-year price (US\\$)", "Current price (US\\$)"], items.map((x) => [x.name, x.weight, fmt(x.p0, 2), fmt(x.p1, 2)]));
    b.calc({
      d: 3, skill: "APPLICATION", kind: "index", value: W.index, calculator: true,
      stem: `The table shows a simple basket used by a fictional statistics office.\n\n${T}\n\nCalculate the weighted price index for the current year (base year = 100). Give your answer to one decimal place.`,
      wrong: [simple],
      hints: ["Find each item's index: current price ÷ base price × 100.", "Multiply by the weights, add, and divide by the total weight."],
      explanation: `1. Item indices: food ${fmt(460 / 4, 1)}; fuel and transport ${fmt(180 / 1.5, 1)}; clothing ${fmt(950 / 10, 1)}.\n2. Weighted total = 50 × 115 + 30 × 120 + 20 × 95 = 5,750 + 3,600 + 1,900 = 11,250.\n3. Index = 11,250 ÷ 100 = **${fmt(W.index, 1)}**.\n4. The unweighted average (${fmt(simple, 1)}) ignores how much households spend on each item.`,
    });
  }
  {
    const i0 = 132, i1 = 141.9, r = prices.inflationRate(i0, i1);
    check("r2", r, 7.5);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: r, calculator: true,
      stem: `A fictional country's CPI was ${i0}.0 in 2025 and ${fmt(i1, 1)} in 2026. Calculate the rate of inflation in 2026. Give your answer to one decimal place.`,
      wrong: [i1 - i0, i1 - 100],
      hints: ["The change in points is not the percentage change."],
      explanation: `1. Change = ${fmt(i1, 1)} − ${i0} = ${fmt(i1 - i0, 1)} points.\n2. Rate = ${fmt(i1 - i0, 1)} ÷ ${i0} × 100 = **${pct(r, 1)}**.\n3. ${fmt(i1 - 100, 1)}% is the rise since the base year, not in 2026.`,
    });
  }
  {
    const w1 = 455, idx = 108, real = prices.realValue(w1, idx);
    check("real", real, 421.296, 0.001);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: real, dp: 2, tol: 0.006, calculator: true,
      stem: `Tatenda's monthly wage rises from US\\$420 to US\\$${w1} over a year in which the CPI rises from 100 to ${idx}. Calculate the real value of his new wage in base-year prices, in US\\$, to two decimal places.`,
      wrong: [w1 * idx / 100, w1 - 8],
      hints: ["Real value = money value ÷ price index × 100."],
      explanation: `1. Real wage = ${w1} ÷ ${idx} × 100 = **US\\$${fmt(real, 2)}**.\n2. This is slightly more than US\\$420, so his real wage rose a little: his wage rose by ${pct(((w1 - 420) / 420) * 100, 1)} while prices rose by 8%.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A consumer price index measures changes in the prices of goods and services bought by households.",
    answer: true,
    explanation: "True. It is based on a basket of typical household purchases.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the CPI rises from 120 to 130, the rate of inflation is 10%.",
    answer: false,
    explanation: `False. The rise is 10 points; the rate is 10 ÷ 120 × 100 = ${pct((10 / 120) * 100, 1)}.`,
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each step in building a CPI with what it does.",
    pairs: [
      ["Household expenditure survey", "Finds out what households buy"],
      ["Basket of goods", "A representative list of items to price"],
      ["Weights", "Show each item's share of spending"],
      ["Base year", "The comparison year, with index 100"],
    ],
    explanation: "Survey → basket → weights → price collection → weighted index compared with the base year.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "The CPI was 100 in the base year and is 96 this year, so prices have {{blank:a}} by {{blank:b}}% since the base year. If wages have stayed the same, real wages have {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["fallen"], choices: ["risen", "fallen"] },
      { id: "b", accepted: ["4"], choices: ["4", "96", "104"] },
      { id: "c", accepted: ["risen"], choices: ["risen", "fallen"] },
    ],
    wrong: [["risen", "96", "fallen"]],
    hints: ["An index below 100 shows lower prices."],
    explanation: "96 is 4% below 100: prices fell (deflation). The same money wage buys more, so real wages rose.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a consumer price index is calculated.",
    points: [
      "A base year is chosen and given an index of 100.",
      "A household expenditure survey identifies a basket of typical goods and services.",
      "Each item is given a weight according to its share of household spending.",
      "Prices are collected regularly; item indices are multiplied by weights, added and divided by total weight.",
    ],
    modelAnswer: "A base year is chosen and its index is set at 100. A survey of household spending shows what typical households buy, and a basket of representative goods and services is chosen. Each group is given a weight according to its share of spending. Prices are collected regularly from shops and markets, an index is calculated for each item, and the item indices are multiplied by their weights, added together and divided by the total of the weights to give the CPI.",
    hints: ["Base year, survey, basket, weights, prices, weighted average."],
    explanation: "One mark per step, up to four.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain **three** reasons why the CPI may not measure accurately the change in the cost of living.",
    points: [
      "Weights are based on average spending, which differs from that of particular households.",
      "Spending patterns, new products and quality changes are not reflected quickly.",
      "Prices in the informal sector or rural areas may not be collected accurately; people switch to cheaper substitutes.",
    ],
    modelAnswer: "First, the weights reflect an average household, so families who spend more on food or transport face a different rate of inflation. Second, the basket and weights are updated only occasionally, so new products, quality improvements and changes in what people buy are missed. Third, prices in informal markets and rural areas are hard to collect, and the fixed basket ignores households switching to cheaper goods when prices rise.",
    hints: ["Think about the basket, the weights and price collection."],
    explanation: "One mark per explained reason.",
  });

  // Structured 1: weighted index and inflation.
  {
    const items0 = [{ name: "Food", weight: 45, p0: 2.4, p1: 2.7 }, { name: "Housing and energy", weight: 25, p0: 60, p1: 63 }, { name: "Transport", weight: 20, p0: 1.0, p1: 1.15 }, { name: "Clothing", weight: 10, p0: 12, p1: 11.4 }];
    const W = prices.weightedTable(items0), i2025 = 103.5, r = prices.inflationRate(i2025, W.index);
    check("W1", W.index, 109.375, 1e-9);
    const T = table(["Item", "Weight", "Price in 2024 (US\\$)", "Price in 2026 (US\\$)"], items0.map((x) => [x.name, x.weight, fmt(x.p0, 2), fmt(x.p1, 2)]));
    const foodIdx = (2.7 / 2.4) * 100, transIdx = 115;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `A fictional town's statistics office uses the basket below (2024 = 100). Its index for 2025 was ${fmt(i2025, 1)}.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "index", value: foodIdx, stem: "Calculate the 2026 price index for food. Give your answer to one decimal place.", wrong: [(2.4 / 2.7) * 100], explanation: `2.70 ÷ 2.40 × 100 = ${fmt(foodIdx, 1)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "index", value: W.index, stem: "Calculate the weighted price index for 2026. Give your answer to one decimal place.", wrong: [items0.reduce((s, x) => s + (x.p1 / x.p0) * 100, 0) / 4], explanation: `Indices: food ${fmt(foodIdx, 1)}, housing and energy 105.0, transport ${fmt(transIdx, 1)}, clothing 95.0. Weighted total = 45 × 112.5 + 25 × 105 + 20 × 115 + 10 × 95 = 5,062.5 + 2,625 + 2,300 + 950 = 10,937.5; ÷ 100 = ${fmt(W.index, 1)}. (Using item indices rounded to one decimal place gives the same answer.)` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: r, stem: `Using your answer to (b), calculate the rate of inflation in 2026 (the 2025 index was ${fmt(i2025, 1)}). Give your answer to one decimal place.`, wrong: [W.index - i2025, W.index - 100], explanation: `(${fmt(W.index, 2)} − ${fmt(i2025, 1)}) ÷ ${fmt(i2025, 1)} × 100 = ${pct(r, 1)}.` }),
        P.manual({
          label: "(d)", marks: 2,
          stem: "Explain why the rise in food prices has a large effect on the index.",
          points: ["Food has the largest weight (45), because households spend the largest share of income on it.", `Its price rose by ${fmt(foodIdx - 100, 1)}%, so it contributes most to the rise in the weighted index.`],
          modelAnswer: `Food has the largest weight, 45 out of 100, because households spend the biggest share of their income on it. So its ${fmt(foodIdx - 100, 1)}% price rise counts for much more in the weighted index than, for example, the fall in clothing prices, which has a weight of only 10.`,
          explanation: "Weight × price change.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether this index is a good measure of the change in the cost of living for all households in the town.",
          points: [
            "Good: uses weights based on household spending; covers the main spending groups; regular prices.",
            "Poor: only four groups; weights for an average household (poor households spend more on food, so face higher inflation; car owners more on transport).",
            "Poor: misses quality changes, new products, substitution and informal prices.",
            "Justified conclusion.",
          ],
          modelAnswer: "The index is a reasonable guide because it uses weights based on what households spend and covers the main groups of spending. However, it has only four groups, and its weights describe an average household. A poor household spending far more than 45% of its income on food faces a higher rate of inflation than the index shows, while a household that spends little on transport is less affected by the 15% rise in transport prices. The index also misses quality changes, new products and households switching to cheaper goods. It is a useful average, but it does not measure accurately the change in the cost of living for every household, especially the poorest.",
          explanation: "Strengths of weighting versus differences between households; conclude.",
        }),
      ],
      hints: ["Item index = current price ÷ base price × 100.", "Weighted index = Σ(weight × index) ÷ Σweights."],
      explanation: `Weighted index for 2026 = ${fmt(W.index, 1)}; inflation in 2026 = ${pct(r, 1)}.`,
    });
  }
  // Structured 2: comparing periods.
  {
    const yrs = ["2022", "2023", "2024", "2025", "2026"], idx = [100, 106, 114.48, 120.204, 124.4111];
    const rates = idx.slice(1).map((v, k) => prices.inflationRate(idx[k], v));
    check("r23", rates[0], 6); check("r24", rates[1], 8); check("r25", rates[2], 5); check("r26", rates[3], 3.5, 0.001);
    const T = table(["Year", "CPI (2022 = 100)"], yrs.map((y, k) => [y, fmt(idx[k], 1)]));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
      stem: `The table shows the CPI of a fictional country.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: prices.inflationRate(106, 114.5), stem: "Using the figures in the table, calculate the rate of inflation in 2024. Give your answer to one decimal place.", wrong: [114.5 - 106], explanation: `(114.5 − 106.0) ÷ 106.0 × 100 = ${pct(prices.inflationRate(106, 114.5), 1)}.` }),
        P.mcq({
          label: "(b)", marks: 1,
          stem: "In which year was the rate of inflation lowest?",
          options: [["2026", "Correct: about 3.5%."], ["2023", "6.0% in 2023."], ["2024", "About 8.0% in 2024."], ["2025", "About 5.0% in 2025."]],
          answer: "A",
          explanation: "Calculate each year's rate on the previous year's index: 6.0%, 8.0%, 5.0%, 3.5%.",
        }),
        P.manual({
          label: "(c)", marks: 2,
          stem: "A student says: \"Prices fell after 2024, because inflation fell.\" Explain why the student is wrong.",
          points: ["The CPI kept rising every year (114.5 → 120.2 → 124.4).", "A lower but positive rate means prices rose more slowly; only a negative rate (deflation) means prices fell."],
          modelAnswer: "The CPI still rose every year after 2024, from 114.5 to 120.2 and then 124.4. The rate of inflation fell, which means prices rose more slowly, but they did not fall; falling prices would need a negative rate of inflation (deflation).",
          explanation: "Falling inflation ≠ falling prices.",
        }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether a worker whose wage rose by 5% every year from 2022 to 2026 became better off.",
          points: [
            "Compare wage rises with each year's inflation: worse off in 2023 (6%) and 2024 (8%), about the same in 2025 (5%), better off in 2026 (3.5%).",
            "Overall: wages rose about 21.6% (1.05⁴) against prices about 24.4%, so the real wage fell slightly.",
            "Conclusion: slightly worse off overall, although improving at the end.",
          ],
          modelAnswer: "A 5% rise was less than inflation in 2023 (6%) and 2024 (8%), so the worker's real wage fell in those years; it was about equal in 2025 and above inflation in 2026 (3.5%). Over the four years the wage rose by about 21.6% (1.05 × 1.05 × 1.05 × 1.05), while prices rose by about 24.4% (from 100 to 124.4), so overall the worker is slightly worse off, even though the position improved in the last year.",
          explanation: "Compare wage growth with inflation year by year and overall; conclude.",
        }),
      ],
      hints: ["Each year's rate uses the previous year's index as the base."],
      explanation: `Rates: 2023 ${pct(rates[0], 1)}, 2024 ${pct(rates[1], 1)}, 2025 ${pct(rates[2], 1)}, 2026 ${pct(rates[3], 1)}.`,
    });
    check("wage", 1.05 ** 4 * 100 - 100, 21.55, 0.01);
  }

  b.card("DEFINITION", "Define the **Consumer Price Index (CPI)**.", "A weighted index of the prices of a typical basket of goods and services bought by households, compared with a base year (= 100).");
  b.card("DEFINITION", "What is a **base year**?", "The year with which other years are compared; its index is 100.");
  b.card("DEFINITION", "What are **weights** in a price index?", "Numbers showing each item's share of household spending, so that important items count more.");
  b.card("FORMULA", "Item price index = ?", "Current price ÷ base-year price × 100");
  b.card("FORMULA", "Weighted price index = ?", "Σ(weight × item index) ÷ Σ(weights)");
  b.card("FORMULA", "Rate of inflation from index numbers = ?", "(Index this year − index last year) ÷ index last year × 100");
  b.card("FACT", "The CPI rises from 120 to 132. Is inflation 12%?", "No. The rise is 12 points; the rate is 12 ÷ 120 × 100 = 10%.");
  b.card("CONCEPT", "Give three limitations of the CPI.", "Average weights do not suit every household; spending patterns, new products and quality change; informal and rural prices are hard to collect; substitution is ignored.");
  b.card("FACT", "Which price indices does ZIMSEC name for measuring inflation?", "The Consumer Price Index (CPI) and the Retail Price Index (RPI).", undefined, { applies: ZIM });
});
