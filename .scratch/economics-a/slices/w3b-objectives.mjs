// W3b: macroeconomic policy objectives (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, fmt, currentAccount, growthRate, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.policy.objectives", { file: "policy/objectives", keyPrefix: "policy.objectives" }, (b) => {
  mc(b, [1, "RECALL"], "Which indicator is used to measure success in achieving price stability?",
    ["The annual rate of change of the consumer price index", "Correct: the inflation rate."],
    [["The annual growth rate of real GDP per head", "That measures growth."],
     ["The unemployment rate as a percentage of the labour force", "That measures employment."],
     ["The current account balance as a percentage of GDP", "That measures the balance of payments."]],
    "Price stability is judged by the inflation rate.");

  mc(b, [2, "UNDERSTANDING"], "Full employment as a policy objective means",
    ["that cyclical unemployment is removed, though some remains", "Correct: it does not mean zero unemployment."],
    [["that the measured unemployment rate is always exactly zero in every year", "Some unemployment remains."],
     ["that every adult in the whole population has a paid job", "Not everyone is in the labour force."],
     ["that wages are exactly the same in every occupation and region", "Full employment says nothing about wage equality."]],
    "Full employment aims at the natural rate, with no cyclical unemployment.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which indicator is most suitable for judging balance of payments stability?",
    ["The current account balance as a percentage of GDP", "Correct: it shows the size of the deficit or surplus relative to the economy."],
    [["The rate of inflation in the consumer price index each year", "That measures price stability."],
     ["The share of the poorest fifth in national income", "That measures equity."],
     ["The growth rate of the population", "That is not an indicator of the balance of payments."]],
    "The current account relative to GDP shows how large the external imbalance is.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The interest rate set by a central bank is an example of",
    ["a policy instrument", "Correct: a tool controlled by the authorities."],
    [["a policy target", "A target is a goal such as 3% inflation."],
     ["a policy objective", "An objective is a goal such as price stability."],
     ["an economic indicator of growth", "It is a tool, not a measure of performance."]],
    "Instruments (interest rates, tax rates, spending) are used to reach targets and objectives.");

  mc(b, [3, "APPLICATION"], "A government's target for inflation is 2% to 4%. Actual inflation is 6.5%. The objective is",
    ["not met, because inflation is above the range by 2.5 percentage points", "Correct: 6.5 − 4 = 2.5."],
    [["met, because inflation is positive and the economy is growing", "The target is a range."],
     ["not met, because inflation is above the range by 4.5 percentage points", "The gap is measured from the top of the range."],
     ["met, because inflation is below the figure for the previous decade", "The question is about the target."]],
    "Inflation exceeds the upper end of the target range by 6.5 − 4.0 = 2.5 percentage points.", { hints: ["Compare actual inflation with the top of the range."] });

  mc(b, [3, "ANALYSIS"], "A fall in a country's Gini coefficient from 0.46 to 0.43, with real GDP growth unchanged, suggests that",
    ["progress has been made towards the objective of equity", "Correct: a lower Gini means less inequality."],
    [["the objective of price stability has been met", "The Gini does not measure prices."],
     ["unemployment has fallen below the natural rate", "The Gini does not measure unemployment."],
     ["the current account has moved into surplus", "The Gini does not measure the balance of payments."]],
    "A lower Gini coefficient means a fairer distribution of income.", { hints: ["What does the Gini coefficient measure?"] });

  mc(b, [3, "ANALYSIS"], "Which indicator would best show progress towards sustainable growth?",
    ["Emissions of greenhouse gases relative to output", "Correct: it shows the environmental impact of output."],
    [["The nominal value of GDP in the current financial year", "Nominal GDP says nothing about sustainability."],
     ["The rate of inflation over the past year", "That measures price stability."],
     ["The number of registered unemployed workers", "That measures employment."]],
    "Sustainability is shown by environmental indicators such as emissions per unit of output.", { hints: ["Which indicator relates to the environment?"] });

  mc(b, [4, "EVALUATION"], "Why can it be misleading to judge a government's performance only by the growth rate of GDP?",
    ["Growth says nothing about inflation, jobs, the external balance or inequality", "Correct: the other objectives also matter."],
    [["Growth is always negative whenever the rate of inflation is positive", "The two can both be positive."],
     ["GDP can only be measured by the government that reports the figure", "It can be measured by independent agencies."],
     ["Growth rates are exactly the same in every country in each year", "Growth rates differ between countries."]],
    "Performance depends on the full set of objectives, not one indicator.", { hints: ["List the other objectives."] });

  {
    const ca = currentAccount({ goods: [5600, 6300], services: [1100, 950], primary: [250, 520], secondary: [880, 260] }); chk(ca.total, -200);
    const v = (ca.total / 5000) * 100; chk(v, -4, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: v, dp: 1, unit: "%", hints: ["Balance ÷ GDP × 100; a deficit is negative."],
      stem: "A fictional economy has GDP of US\\$5,000 million. Its current account (US\\$ million) is: goods exports 5,600 and imports 6,300; services exports 1,100 and imports 950; primary income received 250 and paid 520; secondary income received 880 and paid 260. Calculate the current account balance as a percentage of GDP, to one decimal place (a deficit is a negative number).",
      wrong: [4.0, -14.0, -2.5], explanation: "1. Goods −700; services +150; primary −270; secondary +620.\n2. Balance = −700 + 150 − 270 + 620 = −US\\$200 million.\n3. As a percentage of GDP = −200 ÷ 5,000 × 100 = −4.0%." });
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: 8.4 - 5.0, unit: "percentage points", dp: 1,
      stem: "The inflation target of a fictional government is 3% to 5% and actual inflation is 8.4%. By how many percentage points does inflation exceed the upper end of the target range? Give the answer to one decimal place.",
      wrong: [5.4, 3.4 + 2, 8.4], explanation: "Excess = 8.4 − 5.0 = 3.4 percentage points (measured from the top of the range)." });
    const gr = growthRate(5000, 5225); chk(gr, 4.5, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: gr, dp: 1, unit: "%",
      stem: "Real GDP of a fictional economy rises from US\\$5,000 million to US\\$5,225 million. The government's growth target is 5%. Calculate the growth rate achieved, to one decimal place.",
      wrong: [4.3, 225, 5.0], explanation: "Growth = (5,225 − 5,000) ÷ 5,000 × 100 = 4.5%, below the 5% target." });
    const ur = (720 / 9000) * 100; chk(ur, 8, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: ur, dp: 1, unit: "%",
      stem: "A fictional economy has a labour force of 9,000 thousand, of which 720 thousand are unemployed. The government's target is an unemployment rate below 7%. Calculate the unemployment rate, to one decimal place.",
      wrong: [7.2, 8.7, 12.5], explanation: "Rate = 720 ÷ 9,000 × 100 = 8.0%, above the 7% limit, so the target is not met." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A government can pursue an inflation target of exactly zero and always expect this to be best for the economy.", answer: false,
    explanation: "False. Low, stable inflation is the usual aim; zero or negative inflation risks deflation and weak demand." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each objective with its best indicator.",
    pairs: [["Price stability", "Inflation rate"], ["Economic growth", "Growth of real GDP"], ["Equity", "Gini coefficient"], ["Balance of payments stability", "Current account balance as a percentage of GDP"]],
    explanation: "Each objective has a standard indicator." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A numerical value that the government aims to achieve, such as 4% inflation, is a policy {{blank:a}}. A tool such as the tax rate used to achieve it is a policy {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["target"], choices: ["target", "instrument"] }, { id: "b", accepted: ["instrument"], choices: ["target", "instrument"] }],
    explanation: "Targets are goals; instruments are tools." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the statistic, with a value between 0 and 1, that is used to measure inequality in the distribution of income.",
    accepted: ["Gini coefficient", "the Gini coefficient", "Gini", "Gini index"], wrong: ["inflation rate"],
    explanation: "The Gini coefficient measures income inequality." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "State two macroeconomic objectives of a government.",
    points: ["Price stability (low and stable inflation) or low unemployment.", "Economic growth, balance of payments stability, equity or sustainability."],
    modelAnswer: "Price stability and low unemployment.",
    explanation: "One mark for each objective." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Costs of an imbalance that has to be financed."],
    stem: "Explain why a large and persistent current account deficit may be a problem.",
    points: ["It must be financed by borrowing, foreign investment or using reserves.", "Borrowing builds up debt and interest payments.", "Reserves may run out, forcing a fall in the exchange rate.", "A fall in the currency raises import prices and inflation."],
    modelAnswer: "A deficit has to be financed by borrowing, by foreign investment or by running down reserves. Borrowing builds up debt and interest payments, and if reserves run out the exchange rate may fall, which raises the price of imports and may increase inflation.",
    explanation: "Financing, debt, reserves and the exchange rate." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Costs of inflation for savers, firms and competitiveness."],
    stem: "Explain why price stability is an important objective for a government.",
    points: ["High inflation reduces the real value of savings and fixed incomes.", "Unpredictable prices make planning and investment harder.", "Higher domestic prices reduce the competitiveness of exports.", "It can lead to a loss of confidence in the currency.", "Stable prices support growth and a fairer distribution of income."],
    modelAnswer: "High inflation reduces the real value of savings and of fixed incomes, so people on low incomes lose. Unpredictable prices make it harder for firms to plan and invest, which may reduce growth, and if prices rise faster than abroad exports become less competitive. Price stability therefore supports growth and a fairer distribution of income.",
    explanation: "Savings, planning, competitiveness and confidence." });

  {
    const ca = currentAccount({ goods: [3000, 3400], services: [500, 450], primary: [180, 380], secondary: [320, 210] }); chk(ca.total, -440);
    const v = (ca.total / 8000) * 100; chk(v, -5.5, 1e-9);
    const t1 = table(["Indicator", "Target", "Actual"], [["Real GDP growth", "4.0%", "3.1%"], ["Inflation", "3% to 6%", "12.0%"], ["Unemployment rate", "Below 8%", "10.5%"], ["Current account", "Deficit below 4% of GDP", "See data below"], ["Gini coefficient", "Below 0.46", "0.47"]], { align: ["l", "l", "r"] });
    b.struct({ d: 3, skill: "EVALUATION", examStyle: true, hints: ["Inflation excess = actual − upper end of the range.", "Count the objectives met and the objectives not met."],
      stem: `**Macroeconomic scorecard for Mbira (fictional, illustrative data)**\n\n${t1}\n\nCurrent account (US\\$ million): goods exports 3,000 and imports 3,400; services exports 500 and imports 450; primary income received 180 and paid 380; secondary income received 320 and paid 210. GDP is US\\$8,000 million.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 12.0 - 6.0, unit: "percentage points", dp: 1, stem: "By how many percentage points does inflation exceed the top of its target range? Give the answer to one decimal place.", wrong: [9.0, 8.5, 3.0], explanation: "Excess = 12.0 − 6.0 = 6.0 percentage points." }),
        P.num({ label: "(b)", marks: 3, kind: "pct", value: v, dp: 1, unit: "%", stem: "Calculate the current account balance as a percentage of GDP, to one decimal place (a deficit is negative).", wrong: [5.5, -4.0, -440], explanation: "Balance = (3,000 − 3,400) + (500 − 450) + (150 − 350) + (320 − 210) = −400 + 50 − 200 + 110 = −440. As a percentage of GDP = −440 ÷ 8,000 × 100 = −5.5%." }),
        P.manual({ label: "(c)", marks: 2, stem: "Identify the objectives that have not been met.",
          points: ["Growth (3.1% against 4.0%), inflation and unemployment are not met.", "The current account (deficit 5.5% against 4%) and the Gini coefficient (0.47 against below 0.46) are not met."],
          modelAnswer: "None of the five targets has been met: growth is below 4.0%, inflation is above 6%, unemployment is above 8%, the current account deficit is larger than 4% of GDP and the Gini coefficient is above 0.46." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain which objective the government should give the highest priority to, using the data.",
          points: ["Inflation is furthest from its target (12.0% against 3% to 6%).", "High inflation damages savings, competitiveness (and the deficit) and confidence.", "Reducing inflation may help the other objectives in the longer run, though it may cost jobs and growth in the short run."],
          modelAnswer: "Inflation is furthest from its target at 12.0%, twice the top of the range. High inflation damages savings and competitiveness, which may also be worsening the current account deficit, and it reduces confidence, so bringing it down is likely to help the other objectives in the long run, though it may cost some jobs and growth in the short run." }),
      ],
      explanation: "Inflation exceeds the range by 6 points; current account −5.5% of GDP; no target met; inflation the priority." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) weigh growth against inflation and say which is more urgent."],
    stem: "**Choosing priorities in Dambo (fictional)**\n\nA new government in Dambo says that its main aim is faster growth. Real GDP has grown by 2% a year for four years, while inflation has risen from 4% to 14%. The government plans to cut interest rates and to increase public spending. The central bank warns that the currency is falling and that import prices are rising, and that the current account deficit is widening because imports are growing faster than exports.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define price stability.",
        points: ["A situation in which the general price level is stable or rises only slowly.", "Low and predictable inflation."],
        modelAnswer: "Price stability is where the general level of prices is stable or rises only slowly, so that inflation is low and predictable." }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how the government's plans might make the current account deficit worse.",
        points: ["Lower interest rates and higher public spending raise aggregate demand.", "Higher incomes raise spending on imports (marginal propensity to import).", "Higher inflation reduces the competitiveness of exports.", "A falling currency raises import prices and may not raise export volumes quickly."],
        modelAnswer: "Lower interest rates and higher public spending raise aggregate demand and incomes, and some of the extra income is spent on imports. Higher inflation at home makes exports less competitive. A fall in the currency raises the price of imports and may not raise export volumes quickly, so the deficit may widen." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess whether the government is right to give priority to growth over price stability.",
        points: ["Growth raises incomes and jobs and has been slow (2%).", "Inflation at 14% is high and rising, hurting savers, firms and competitiveness.", "Policies to boost demand may raise inflation and imports further.", "Growth is hard to sustain if inflation and the currency are unstable.", "Supply-side policies could raise growth without inflation.", "Judgement: price stability should be restored first or at least alongside growth."],
        modelAnswer: "Growth of 2% a year is low and the government is right to want faster growth, which would raise incomes and create jobs. But inflation of 14% is high and rising, and it hurts savers and firms and damages competitiveness, and the policies of lower interest rates and more spending would raise demand and could increase inflation and imports further. Lasting growth is hard to achieve when prices and the currency are unstable. The government would do better to restore price stability first, or at least to combine its plans with supply-side measures that raise growth without adding to inflation." }),
    ],
    explanation: "Define price stability; higher demand increases imports; inflation and the currency threaten lasting growth." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare objectives for a developing economy and give a judgement."],
    stem: "Assess which macroeconomic objective is the most important for a developing economy.",
    points: ["Growth and development raise incomes and reduce poverty.", "Employment gives people a livelihood and income.", "Price stability protects incomes and savings and supports investment.", "Balance of payments stability avoids debt crises and currency collapse.", "Equity ensures that growth reduces poverty.", "Sustainability protects future growth.", "The objectives are linked and some may conflict.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "For many developing economies growth and development come first, because higher incomes and better health and education reduce poverty, and productive jobs give people a livelihood. But growth is hard to sustain without price stability, which protects savings and encourages investment, and without a manageable balance of payments, because debt crises and currency collapse can reverse progress. Equity matters because it determines whether growth reduces poverty, and sustainability protects future output. The objectives are linked and may conflict in the short run, so the most important depends on the country's circumstances: for a country with very high inflation that damages everything else, price stability may be the priority, while for a stable economy with widespread poverty it is growth that shares its benefits.",
    explanation: "Weigh the objectives for a developing economy and judge according to circumstances." });

  b.card("DEFINITION", "What is a **macroeconomic objective**?", "A goal for the performance of the whole economy, such as price stability, low unemployment or growth.");
  b.card("CONCEPT", "List the main macroeconomic objectives.", "Price stability, low unemployment, economic growth and development, balance of payments stability, equity and sustainability.");
  b.card("DEFINITION", "Policy target against policy instrument?", "A target is a goal value (for example 4% inflation); an instrument is a tool (interest rate, tax rate, spending) used to reach it.");
  b.card("CONCEPT", "Indicator for price stability?", "The inflation rate, from the consumer price index.");
  b.card("CONCEPT", "Indicator for balance of payments stability?", "The current account balance as a percentage of GDP.");
  b.card("CONCEPT", "Indicator for equity?", "The Gini coefficient, the share of the poorest fifth or the poverty rate.");
  b.card("CONCEPT", "Does price stability mean zero inflation?", "No: it means low, stable and predictable inflation; deflation is also harmful.");
  b.card("FORMULA", "Current account as a percentage of GDP?", "Current account balance ÷ GDP × 100 (a deficit is negative).");
  b.card("CONCEPT", "Name two limits of macroeconomic indicators.", "Data may be inaccurate or revised, and averages hide differences; GDP leaves out the environment and unpaid work.");
});
