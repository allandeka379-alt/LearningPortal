// W1a: mean, median, mode and presenting data (ZIMSEC only).
import { concept, P, chk, fmt, mean, median, modes, range, weightedMean, groupedMean, modalClass, pieAngles, pctChange, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.tools.data-analysis", { file: "tools/data-analysis", keyPrefix: "tools.data-analysis" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  // Data set A: daily takings (US$ ) of a fictional stall, 7 days.
  const A = [24, 31, 18, 31, 27, 45, 22];
  const meanA = mean(A), medA = median(A), modeA = modes(A)[0], rngA = range(A);
  chk(medA, 27); chk(modeA, 31); chk(rngA, 27);
  // meanA = 198/7 = 28.285..
  const tableA = table(["Day", "Takings (US\\$)"], ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => [d, [24, 31, 18, 31, 27, 45, 22][i]]));
  const ctxA = `A fictional stall in Gweru recorded its takings for one week.\n\n${tableA}`;
  const Bk = [30, 22, 26, 38, 26, 41, 29];
  const meanB = mean(Bk);
  chk(meanB, 212 / 7);
  const ctxB = `A second fictional stall in Gweru recorded its takings for one week.\n\n${table(['Day', 'Takings (US\\$)'], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => [d, Bk[i]]))}`;

  b.num({ d: 2, skill: "APPLICATION", kind: "money", value: medA, daily: true,
    stem: `${ctxA}\n\nWhat is the median daily takings, in US\\$?`,
    wrong: [meanA, 31],
    explanation: `Order the values: 18, 22, 24, 27, 31, 31, 45. The middle (4th of 7) value is ${medA}. The mean is ${fmt(meanA, 1)} and the mode is 31, which are different averages.` });
  b.num({ d: 2, skill: "APPLICATION", kind: "money", value: meanB, dp: 1, calculator: true,
    stem: `${ctxB}\n\nCalculate the mean daily takings, in US\\$ to one decimal place.`,
    wrong: [26, 212 / 6],
    explanation: `Total = ${Bk.reduce((a, c) => a + c)}; mean = ${Bk.reduce((a, c) => a + c)} ÷ 7 = ${fmt(meanB, 1)}. Dividing by 6 instead of 7 gives 35.3.` });

  mc({ d: 1, skill: "RECALL", stem: "The mode of a set of data is",
    explanation: "The mode is the most frequently occurring value." },
    ["the value that occurs most often", "Correct: definition of the mode."],
    [["the middle value when the data is ordered", "That is the median."],
     ["the total divided by the number of values", "That is the mean."],
     ["the difference between the highest and lowest values", "That is the range."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A fictional village has nine households with incomes of US\\$85, 90, 95, 100, 100, 105, 110, 115 and 1,500 per month. Which average best describes a typical household?",
    hints: ["Which average is distorted by an extreme value?"],
    explanation: "The income of 1,500 pulls the mean far above the other eight values. The median (100) is not affected by the extreme value." },
    ["The median, because it is not distorted by the extreme value", "Correct: the median is 100."],
    [["The mean, because it uses every value in the data", "It uses every value, which is why the extreme value distorts it."],
     ["The range, because it measures the spread of the incomes", "The range measures spread, not a typical value."],
     ["The mode, because 1,500 is the largest income", "The mode is the most common value, not the largest."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A pie chart shows how a fictional household spends US\\$640: food US\\$320, rent US\\$160, transport US\\$96 and other US\\$64. What angle represents food?",
    hints: ["Angle = share × 360°."],
    explanation: "Food is 320 ÷ 640 = 50% of the total, so its angle is 0.5 × 360° = 180°. Rent is 90°, transport 54° and other 36°." },
    ["180°", "Correct: 320 ÷ 640 × 360° = 180°."],
    [["320°", "320 is the amount in US dollars, not the angle."],
     ["90°", "That is the angle for rent (160 ÷ 640 × 360°)."],
     ["50°", "50 is the percentage, not the angle."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Look at where the vertical axis starts."],
    stem: "A bar chart of a fictional firm's profits has a vertical axis that starts at US\\$90 thousand instead of zero. What effect does this have?",
    explanation: "A truncated axis makes differences between bars look larger than they are, which can mislead readers." },
    ["Small differences between the bars look much larger than they are", "Correct: the bars are cut off, exaggerating differences."],
    [["Profits in all years appear lower than they really are", "The bar heights change relative to each other, not the figures."],
     ["The bars can no longer be compared with each other at all", "They can be compared, but differences are exaggerated."],
     ["The bars then show percentage changes rather than amounts", "The type of figure shown does not change."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Percentage point difference or percentage change?"],
    stem: "A fictional bank's interest rate on loans rises from 8% to 10%. Which statement is correct?",
    explanation: "The rate rose by 2 percentage points; as a percentage change it rose by 2 ÷ 8 × 100 = 25%." },
    ["The rate rose by 2 percentage points, a 25% increase", "Correct."],
    [["The rate rose by 2%, a 2 percentage point increase", "2% is not the percentage change; the change is 25%."],
     ["The rate rose by 20 percentage points", "The rise is 2 percentage points."],
     ["The rate rose by 25 percentage points, a 2% increase", "This reverses the two measures."]]);


  // Frequency table
  {
    const f = [4, 11, 15, 12, 8], x = [0, 1, 2, 3, 4];
    const n = f.reduce((a, c) => a + c), tot = f.reduce((s, c, i) => s + c * x[i], 0), mu = tot / n;
    chk(n, 50); chk(tot, 109);
    const tab = table(["Cars owned", "Households"], x.map((v, i) => [v, f[i]]));
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: mu, dp: 2, calculator: true, unit: "units", hints: ["Multiply each value by its frequency first."],
      stem: `A fictional survey recorded the number of cars owned by 50 households.\n\n${tab}\n\nCalculate the mean number of cars per household, to two decimal places.`,
      wrong: [tot / 5, 2],
      explanation: `1. Total cars = 0×4 + 1×11 + 2×15 + 3×12 + 4×8 = ${tot}.\n2. Households = ${n}.\n3. Mean = ${tot} ÷ ${n} = **${fmt(mu, 2)}**.\n\nDividing by the 5 rows gives ${fmt(tot / 5, 1)}; 2 is the mode.` });
    b.mcq({ d: 3, skill: "APPLICATION", hints: ["Cumulative frequency; the middle lies between the 20th and 21st households."],
      stem: `A fictional survey recorded the number of cars owned by 50 households.\n\n${tab}\n\nWhat is the median number of cars?`,
      options: [["2", "Correct: cumulative frequencies 4, 15, 30, 42, 50; the 25th and 26th households each have 2 cars."], ["1", "Only 15 households have 1 car or fewer, fewer than half."], ["3", "30 households have 2 cars or fewer, so the middle is below 3."], ["2.5", "Both middle households own 2 cars, so the median is 2."]],
      answer: "A", explanation: "Cumulative frequencies are 4, 15, 30, 42, 50. The 25th and 26th values both fall in the group with 2 cars, so the median is 2." });
  }

  // Grouped data
  {
    const cls = [[0, 20, 9], [20, 40, 17], [40, 60, 13], [60, 80, 9], [80, 100, 2]];
    const mu = groupedMean(cls), mclass = modalClass(cls);
    chk(mu, 41.2); chk(mclass[0], 20);
    const tab = table(["Weekly sales (units)", "Number of shops"], cls.map(([l, h, f]) => [`${l} to under ${h}`, f]));
    b.num({ d: 4, skill: "APPLICATION", kind: "plain", value: mu, dp: 1, calculator: true, unit: "units", hints: ["Use the mid-point of each class.", "Sum f × mid-point, then divide by the total frequency."],
      stem: `The weekly sales of 50 fictional shops in a town are grouped as follows.\n\n${tab}\n\nCalculate an estimate of the mean weekly sales, to one decimal place.`,
      wrong: [50, (0 + 20 + 40 + 60 + 80) / 5],
      explanation: `1. Mid-points: 10, 30, 50, 70, 90.\n2. Σfx = 10×9 + 30×17 + 50×13 + 70×9 + 90×2 = 90 + 510 + 650 + 630 + 180 = 2,060.\n3. Σf = 50.\n4. Estimated mean = 2,060 ÷ 50 = **${fmt(mu, 1)}**.\n\nThe answer is an estimate because the exact values within each class are unknown.` });
    b.mcq({ d: 2, skill: "UNDERSTANDING", stem: `The weekly sales of 50 fictional shops are grouped as follows.\n\n${tab}\n\nWhat is the modal class?`,
      options: [["20 to under 40", "Correct: it has the highest frequency (17)."], ["0 to under 20", "Frequency 9 is not the highest."], ["40 to under 60", "Frequency 13 is not the highest."], ["80 to under 100", "Frequency 2 is the lowest."]],
      answer: "A", explanation: "The modal class is the class with the highest frequency, 17 shops." });
  }

  // Weighted mean
  {
    const p = [0.8, 1.2, 2.0], q = [50, 40, 10];
    const w = weightedMean(p, q);
    chk(w, 1.08);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: w, dp: 2, calculator: true, hints: ["Multiply price by quantity, add, then divide by total quantity."],
      stem: "A fictional trader sells 50 kg of maize at US\\$0.80 per kg, 40 kg of beans at US\\$1.20 per kg and 10 kg of groundnuts at US\\$2.00 per kg. Calculate the weighted mean price per kg, in US\\$ to two decimal places.",
      wrong: [(0.8 + 1.2 + 2.0) / 3, 4.0],
      explanation: `Revenue = 50×0.80 + 40×1.20 + 10×2.00 = 40 + 48 + 20 = 108; quantity = 100 kg; weighted mean = 108 ÷ 100 = **US\\$1.08**. The simple mean (1.33) ignores how much of each is sold.` });
  }

  // Percentage change and index
  {
    const pc = pctChange(400, 460), idx = (460 / 400) * 100;
    chk(pc, 15); chk(idx, 115);
    b.num({ d: 2, skill: "APPLICATION", kind: "index", value: idx, dp: 0, unit: "index points",
      stem: "A fictional price of a bag of maize meal was US\\$4.00 in the base year (index 100) and US\\$4.60 this year. Calculate this year's price index.",
      wrong: [15, (4 / 4.6) * 100],
      explanation: "Index = 4.60 ÷ 4.00 × 100 = 115. 15 is the percentage increase, not the index; dividing the base by the new price gives 87." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "In a grouped frequency table the mean calculated from class mid-points is an estimate.", answer: true,
    explanation: "True. The exact values within each class are not known, so mid-points are used and the mean is an estimate." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The median can be affected by one very large value in the data in the same way as the mean.", answer: false,
    explanation: "False. The median depends only on the middle position, so an extreme value hardly changes it, while the mean is pulled strongly towards it." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each measure to the correct description.",
    pairs: [["Mean", "Total of the values divided by the number of values"], ["Median", "Middle value of the ordered data"], ["Mode", "Most frequent value"], ["Range", "Highest value minus lowest value"]],
    explanation: "These are the standard measures of average and spread." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "To find an estimated mean from grouped data, multiply each {{blank:a}} by its frequency, add the results and divide by the total {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["mid-point"], choices: ["mid-point", "class width", "lower limit"] }, { id: "b", accepted: ["frequency"], choices: ["frequency", "class width", "range"] }],
    wrong: [["lower limit", "range"]],
    explanation: "Use the class mid-point for x, then divide Σfx by Σf." });



  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3, hints: ["Think of the axis, the sample and the source."],
    stem: "Explain **three** things you should check before relying on a chart of unemployment published in a newspaper.",
    points: ["Source: who collected the data and whether it is reliable.", "Scale: whether the axis is truncated or misleading.", "Sample, definition or date: how many were counted, how unemployment was defined or whether the data is current."],
    modelAnswer: "I would check the source, to see who collected the figures and whether they can be trusted; the scales, to see if the axis exaggerates changes; and the sample size, definition and date, since an old or small survey may not represent the present population.",
    explanation: "Credit any three sensible checks, each explained." });

  b.manualShort({ d: 3, skill: "APPLICATION", marks: 4, hints: ["Find the total first."],
    stem: "A fictional country's exports are: minerals US\\$360 million, tobacco US\\$180 million, horticulture US\\$90 million and other goods US\\$90 million. Describe the pie chart that shows this data, including the angle of each sector.",
    points: ["Total of US\\$720 million is identified.", "Minerals sector 180° (half of the circle).", "Tobacco 90° and horticulture 45°.", "Other goods 45°; the angles add to 360° and the chart is titled with each sector labelled."],
    modelAnswer: "The total is US\\$720 million. Minerals take 360 ÷ 720 × 360° = 180°, tobacco 90°, horticulture 45° and other goods 45°, which add up to 360°. The pie chart has a title and each sector is labelled with its name and value.",
    explanation: "Angles are value ÷ 720 × 360°: 180°, 90°, 45° and 45°." });

  // Structured 1
  {
    const yrs = ["2019", "2020", "2021", "2022"];
    const price = [5.0, 5.4, 5.94, 5.64];
    const idx = price.map((p) => (p / price[0]) * 100);
    const c2 = pctChange(price[0], price[1]), c3 = pctChange(price[1], price[2]), c4 = pctChange(price[2], price[3]);
    chk(c2, 8); chk(c3, 10); chk(Math.round(c4 * 10) / 10, -5.1);
    const tab = table(["Year", "Price of a 10 kg bag of rice (US\\$)"], yrs.map((y, i) => [y, price[i].toFixed(2)]));
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Index = value ÷ base × 100."],
      stem: `The table shows the price of a 10 kg bag of rice in a fictional town (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "index", value: idx[2], dp: 0, unit: "index points", stem: "Using 2019 as the base year (index 100), calculate the index number for 2021.",
          wrong: [10, 5.94], explanation: "5.94 ÷ 5.00 × 100 = 118.8, which is 119 to the nearest whole number." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: c2, dp: 0, unit: "%", stem: "Calculate the percentage change in the price between 2019 and 2020.",
          wrong: [0.4, 7.4], explanation: "(5.40 − 5.00) ÷ 5.00 × 100 = 8%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which type of graph is most suitable for showing how the price changed over the four years?",
          options: [["A line graph", "Correct: it shows change over time."], ["A pie chart", "A pie chart shows shares of a whole."], ["A pictogram of rice bags", "It does not show the trend clearly."], ["A frequency polygon", "It shows grouped distributions."]],
          answer: "A", explanation: "Change over time is shown on a line graph." }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe the trend in the price of rice between 2019 and 2022.",
          points: ["The price rose from 2019 to 2021.", "It reached a peak of US\\$5.94 in 2021 (a 10% rise on 2020).", "It fell in 2022 to US\\$5.64, but stayed above the 2019 price."],
          modelAnswer: "The price rose each year from US\\$5.00 in 2019 to a peak of US\\$5.94 in 2021, a rise of 10% in the last of those years. In 2022 it fell to US\\$5.64, but remained above the 2019 price." }),
      ],
      explanation: "Index 2021 = 118.8 ≈ 119; change 2019–20 = 8%; line graph for time series; description uses the highest point and the direction of change." });
  }

  // Structured 2: grouped data and evaluation
  {
    const cls = [[0, 120, 12], [120, 240, 18], [240, 360, 10], [360, 480, 4], [480, 600, 1]];
    const n = cls.reduce((s, c) => s + c[2], 0), mu = groupedMean(cls);
    chk(n, 45); chk(mu, 204);
    const tab = table(["Monthly rent (US\\$)", "Number of tenants"], cls.map(([l, h, f]) => [`${l} to under ${h}`, f]));
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Mid-points are 60, 180, 300, 420, 540."],
      stem: `A researcher recorded the monthly rent paid by 45 tenants in a fictional suburb of Bulawayo (illustrative data).\n\n${tab}`,
      parts: [
        P.fib({ label: "(a)", marks: 1, stem: "Complete the sentence.", template: "The modal class is {{blank:a}}.",
          blanks: [{ id: "a", accepted: ["120 to under 240"], choices: ["0 to under 120", "120 to under 240", "240 to under 360"] }], explanation: "The class 120 to under 240 has the highest frequency (18)." }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: mu, dp: 0, stem: "Calculate an estimate of the mean monthly rent, to the nearest US\\$.",
          wrong: [(60 + 180 + 300 + 420 + 540) / 5, 240],
          explanation: "Σfx = 12×60 + 18×180 + 10×300 + 4×420 + 1×540 = 720 + 3,240 + 3,000 + 1,680 + 540 = 9,180; Σf = 45; 9,180 ÷ 45 = 204. This is an estimate." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why the answer to (b) is only an estimate.",
          points: ["Exact rents within each class are not known.", "Mid-points are assumed to represent every tenant in the class."],
          modelAnswer: "The table only shows which class each rent lies in, not the exact amounts, so the mean uses class mid-points as if every tenant paid exactly that amount." }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest **one** limitation of using this survey to describe all rents in Bulawayo.",
          points: ["Only 45 tenants in one suburb were recorded, so the sample is small.", "It may not be representative of other suburbs or house types."],
          modelAnswer: "The survey covers only 45 tenants in a single suburb, so the sample is small and rents in other parts of Bulawayo may be higher or lower." }),
      ],
      explanation: "Modal class 120 to under 240; estimated mean US\\$204; estimates and limited samples limit conclusions." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare mean, median and mode for these data.", "End with a judgement."],
    stem: "A fictional village has 100 households. Most have monthly incomes between US\\$60 and US\\$120, but five households earn over US\\$2,000. Evaluate whether the mean, the median or the mode is the most suitable average for describing incomes in the village.",
    points: ["The mean is raised by the five high incomes and is above what most households earn.", "The mean uses all the data and is useful for calculating total income.", "The median is the middle household and is not distorted by the high incomes.", "The median is typical of what most households receive.", "The mode shows the most common income band but ignores the rest of the distribution.", "The mode may be unreliable with grouped data.", "Different purposes need different averages (policy for the poor versus total spending).", "A justified conclusion (e.g. the median is best for describing a typical household; quote the mean as well to show the effect of high incomes)."],
    levels: LV8,
    modelAnswer: "The mean uses every value, so it is useful for estimating total spending power, but the five households earning over US\\$2,000 pull it well above the incomes of most households, so it overstates a typical income. The median is the income of the middle household and is not affected by the extreme values, so it describes a typical household better. The mode shows the most common income band, but ignores everything else and may depend on how the groups are drawn. For describing how most people live, the median is the best choice, though quoting the mean as well shows how much inequality there is.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Compare the sensitivity of each average to extreme values and relate it to the purpose." });

  b.card("FORMULA", "How do you calculate the **mean**?", "Sum of all values ÷ number of values (for a frequency table: Σfx ÷ Σf).");
  b.card("DEFINITION", "Define the **median**.", "The middle value of the data when it is arranged in order; with an even number of values, the mean of the two middle values.");
  b.card("DEFINITION", "Define the **mode** and the **modal class**.", "The mode is the most frequent value; the modal class is the class with the highest frequency in a grouped table.");
  b.card("CONCEPT", "When is the **median** better than the mean?", "When there are extreme values (outliers) that would distort the mean.");
  b.card("FORMULA", "Pie chart **angle**", "Value ÷ total × 360°.");
  b.card("FORMULA", "**Percentage change**", "(New − old) ÷ old × 100.");
  b.card("FORMULA", "**Simple index number**", "Value ÷ base-year value × 100 (base year = 100).");
  b.card("CONCEPT", "Why is a mean from **grouped data** only an estimate?", "Exact values are unknown, so class mid-points are used to represent each class.");
  b.card("CONCEPT", "What is the difference between a **percentage** change and a **percentage point** change?", "A rise from 8% to 10% is 2 percentage points, but a 25% increase in the rate.");
});
