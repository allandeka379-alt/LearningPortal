// Slice G3a: skills.data-analysis (averages, spread, IQR, percentages, rates, ratios, s.f., standard form,
// interpolation/extrapolation, anomalies, limitations). Computed: pebbles sorted 28..60, sum 474, mean 43.09,
// median 43, LQ 34, UQ 52, IQR 18, range 32; downstream median 25, mean 25.86; (43-25)/43 = 41.9%;
// 945/35000 x 1000 = 27; (4000-3200)/3200 = 25%; (3200-4000)/4000 = -20%. Quartiles: medians of the halves (n odd).
import { concept, P, geographyLevels } from "../lib.mjs";

const PEBBLES = [
  "Table 1 shows the long-axis length of eleven pebbles collected at an upstream site on a river (Form 4 fieldwork, fictional data).",
  "",
  "| Pebble | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |",
  "|---|---|---|---|---|---|---|---|---|---|---|---|",
  "| Length (mm) | 34 | 52 | 41 | 28 | 60 | 45 | 38 | 47 | 55 | 31 | 43 |",
].join("\n");

const DOWNSTREAM = [
  "At a downstream site on the same river the class measured seven pebbles (fictional data).",
  "",
  "| Pebble | 1 | 2 | 3 | 4 | 5 | 6 | 7 |",
  "|---|---|---|---|---|---|---|---|",
  "| Length (mm) | 25 | 34 | 18 | 27 | 25 | 22 | 30 |",
  "",
  "The median length at the upstream site was 43 mm.",
].join("\n");

concept("geo.skills.data-analysis", { file: "skills/data-analysis", keyPrefix: "skills.data-analysis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **median** of a set of data?",
    options: [
      ["The middle value when the data are in order", "Correct: half the values lie below it and half above."],
      ["The value that occurs most often", "That is the mode."],
      ["The total divided by the number of values", "That is the mean."],
      ["The highest value minus the lowest value", "That is the range."],
    ],
    answer: "A",
    explanation: "The **median** is the middle value of the ordered data.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Monthly incomes of ten households include one that is ten times larger than all the others. Which average best represents a typical household?",
    options: [
      ["The median", "Correct: one extreme value hardly affects the middle of the ordered data."],
      ["The mean", "One very large income drags the mean upwards."],
      ["The range", "The range measures spread, not a typical value."],
      ["The total income", "A total is not an average."],
    ],
    answer: "A",
    explanation: "The **median** is not pulled by extreme values, unlike the mean.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A survey records the type of each shop at a growth point (grocer, butcher, hardware, bottle store...). Which average can describe these data?",
    options: [
      ["The mode", "Correct: the most common category can be found for non-numerical data."],
      ["The mean", "Shop types are categories; you cannot add them up and divide."],
      ["The median", "Categories such as shop types cannot be put in numerical order."],
      ["The interquartile range", "IQR is a measure of spread for numerical data."],
    ],
    answer: "A",
    explanation: "For categories, only the **mode** (most frequent category) makes sense.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: "A town's population grew from **3 200** to **4 000**. What is the percentage increase?",
    options: [
      ["25%", "Correct: (4 000 − 3 200) ÷ 3 200 × 100 = 25%."],
      ["20%", "This divides the change by the new value (4 000); always divide by the original."],
      ["80%", "80% is 3 200 as a percentage of 4 000, not the change."],
      ["8%", "The change is 800 people, but 800 ÷ 3 200 = 0.25, i.e. 25%."],
    ],
    answer: "A",
    explanation: "Change = 800. 800 ÷ 3 200 × 100 = **25%**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 90,
    stem: "A district of **35 000** people records **945** births in a year. What is the birth rate?",
    hints: ["Rates of births are usually given per 1 000 people.", "Birth rate = births ÷ population × 1 000."],
    options: [
      ["27 per 1 000", "Correct: 945 ÷ 35 000 × 1 000 = 27."],
      ["2.7 per 1 000", "This gives the rate per 100 (as a percentage), not per 1 000."],
      ["37 per 1 000", "This divides 35 000 by 945 and treats the result (about 37) as the rate."],
      ["270 per 1 000", "This multiplies by 10 000 instead of 1 000."],
    ],
    answer: "A",
    explanation: "945 ÷ 35 000 = 0.027; × 1 000 = **27 per 1 000**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A class has **20** boys and **25** girls. What is the ratio of boys to girls in its simplest form?",
    options: [
      ["4 : 5", "Correct: divide both by 5."],
      ["5 : 4", "This is girls to boys, the wrong way round."],
      ["20 : 45", "45 is the total; a ratio of boys to girls compares the two parts."],
      ["2 : 3", "20 : 30 would be 2 : 3; there are 25 girls."],
    ],
    answer: "A",
    explanation: "20 : 25, dividing by 5, = **4 : 5**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Round **38 451** to **2 significant figures**.",
    options: [
      ["38 000", "Correct: the first two significant digits are 3 and 8; the next digit (4) rounds down."],
      ["39 000", "The third digit is 4, so the 8 does not round up."],
      ["38", "Rounding must keep the size of the number; 38 needs three zeros."],
      ["38 500", "This keeps 3 significant figures."],
    ],
    answer: "A",
    explanation: "2 s.f.: 38 | 451 → the next digit is 4, so round down: **38 000**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Write **4 600 000** in standard form.",
    options: [
      ["4.6 × 10⁶", "Correct: 4.6 multiplied by one million."],
      ["46 × 10⁵", "In standard form the first number must be between 1 and 10."],
      ["4.6 × 10⁵", "4.6 × 10⁵ is 460 000, ten times too small."],
      ["4.6 × 10⁷", "4.6 × 10⁷ is 46 000 000, ten times too large."],
    ],
    answer: "A",
    explanation: "Move the decimal point 6 places: 4 600 000 = **4.6 × 10⁶**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A student uses temperature readings taken at 06:00 and 12:00 to estimate the temperature at 09:00. What is this called?",
    options: [
      ["Interpolation", "Correct: estimating a value between two measured points."],
      ["Extrapolation", "Extrapolation estimates beyond the measured data."],
      ["Correlation", "Correlation is a relationship between two variables."],
      ["Standardisation", "Standardisation is not the term for estimating between readings."],
    ],
    answer: "A",
    explanation: "Estimating **within** the data range is **interpolation**; beyond it is extrapolation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main advantage of the **interquartile range** over the range?",
    options: [
      ["It is not affected by extreme values", "Correct: it uses only the middle half of the data."],
      ["It uses every value equally", "The IQR deliberately ignores the top and bottom quarters."],
      ["It is always larger than the range", "The IQR is never larger than the range."],
      ["It gives the average value", "The IQR measures spread, not the average."],
    ],
    answer: "A",
    explanation: "The **IQR** describes the spread of the middle 50%, so outliers do not distort it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: "The number of fishing boats at a lake fell from **4 000** to **3 200**. What is the percentage change?",
    hints: ["Percentage change = (new − old) ÷ old × 100.", "The old value is 4 000."],
    options: [
      ["A decrease of 20%", "Correct: (3 200 − 4 000) ÷ 4 000 × 100 = −20%."],
      ["A decrease of 25%", "This divides the change by the new value (3 200)."],
      ["An increase of 20%", "The number fell, so the change is a decrease."],
      ["A decrease of 80%", "3 200 is 80% of 4 000; the change is 20%."],
    ],
    answer: "A",
    explanation: "Change = −800; −800 ÷ 4 000 × 100 = **−20%**, a 20% decrease.",
  });
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "A bar graph of crop yields starts its vertical axis at 900 kg instead of 0 kg. What effect does this have?",
    options: [
      ["It exaggerates the differences between bars", "Correct: small differences look large when the bottom of the axis is cut off."],
      ["It makes all the bars the same height", "Bars still differ; the differences look bigger, not equal."],
      ["It makes the data more accurate", "The data are unchanged; only the appearance is distorted."],
      ["It has no effect on how the graph looks", "Cutting the axis changes the visual impression a great deal."],
    ],
    answer: "A",
    explanation: "A truncated axis **exaggerates** differences, a common way statistics mislead.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", secs: 120,
    stem: `${PEBBLES}\n\nCalculate the mean pebble length, to one decimal place.`,
    value: 43.1, tol: 0.05, unit: "mm", answer: "43.1",
    wrong: [43, 47.4],
    hints: ["Add all eleven lengths.", "Divide the total by 11."],
    explanation: "Total = 474 mm. 474 ÷ 11 = 43.09 ≈ **43.1 mm**.",
    workedSolution: "1. Sum: 34 + 52 + 41 + 28 + 60 + 45 + 38 + 47 + 55 + 31 + 43 = 474 mm.\n2. Mean = 474 ÷ 11 = 43.09… mm.\n3. To 1 d.p.: 43.1 mm.",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 120,
    stem: `${PEBBLES}\n\nCalculate the interquartile range. (Take the lower quartile as the median of the five values below the median, and the upper quartile as the median of the five values above it.)`,
    value: 18, unit: "mm",
    wrong: [32, 9],
    hints: ["Order the data: 28, 31, 34, ...", "LQ is the 3rd value and UQ the 9th value of the ordered list."],
    explanation: "Ordered: 28, 31, **34**, 38, 41, 43, 45, 47, **52**, 55, 60. LQ = 34, UQ = 52, IQR = 52 − 34 = **18 mm**.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the average that is the value occurring most often.",
    accepted: ["mode", "the mode", "modal value"],
    wrong: ["median"],
    explanation: "The **mode** is the most frequent value or category.",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "Extrapolation is generally more reliable than interpolation.",
    answer: false,
    feedbackFalse: "Correct: extrapolating beyond the data assumes the trend continues, which may not happen.",
    feedbackTrue: "Not so: interpolation stays within measured data; extrapolation guesses beyond it and is riskier.",
    explanation: "**Interpolation** (within the data) is usually more reliable than **extrapolation** (beyond it).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "The highest value minus the lowest is the {{blank:a}}. The upper quartile minus the lower quartile is the {{blank:b}} range. A value that does not fit the pattern is an {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["range"], choices: ["range", "mean", "mode"] },
      { id: "b", accepted: ["interquartile"], choices: ["interquartile", "standard", "relative"] },
      { id: "c", accepted: ["anomaly"], choices: ["anomaly", "average", "extrapolation"] },
    ],
    explanation: "Range; interquartile range; anomaly.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Mean", "Sum of the values divided by the number of values"],
      ["Ratio", "A comparison of one part with another, e.g. 3 : 2"],
      ["Proportion", "A part compared with the whole, e.g. 0.4"],
      ["Rate", "Events compared with the population, e.g. per 1 000"],
      ["Standard form", "A number between 1 and 10 times a power of 10"],
    ],
    explanation: "These terms appear in every data-response question.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A group concludes from one 10-minute pedestrian count on a Saturday morning that 'the high street is always busier than the side road'. Give three reasons why this conclusion may be unreliable.",
    hints: ["Think about sample size, timing and method."],
    points: [
      "Only one count was taken at each site; a single small sample may be untypical.",
      "Saturday morning may not represent other days or times (e.g. weekday rush hours, market days).",
      "Counting errors or different counters/methods at the two sites (e.g. not counting at exactly the same time).",
    ],
    modelAnswer: "One 10-minute count is a very small sample, a Saturday morning may be untypical of weekdays or other times, and errors in counting or differences in timing between the two sites could bias the result.",
    explanation: "Reliability depends on sample size, timing and consistent method.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: `${DOWNSTREAM}\n\nThe class concludes that 'pebbles get smaller downstream'. Evaluate how far the data support this conclusion.`,
    hints: ["Use statistics from both sites as evidence.", "Then consider sample size, number of sites, sampling method and measurement error."],
    points: [
      "Evidence for: the downstream median (25 mm) is well below the upstream median (43 mm).",
      "The downstream mean (about 25.9 mm) is lower than the upstream mean (about 43.1 mm); the largest downstream pebble (34 mm) is close to the upstream LQ (34 mm).",
      "This fits attrition/abrasion reducing pebble size downstream.",
      "Limitation: only two sites, so a trend along the whole river cannot be shown.",
      "Limitation: small samples (11 and 7) and possibly non-random selection (choosing larger or smaller pebbles); measurement error with a ruler.",
      "Judgement: the data suggest the conclusion is likely, but more sites and larger random samples are needed to confirm it.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "The data support the conclusion: the median length falls from 43 mm upstream to 25 mm downstream, and the mean falls from about 43.1 mm to about 25.9 mm; even the longest downstream pebble (34 mm) is only as long as the upstream lower quartile. This fits attrition and abrasion wearing pebbles down as they travel. However, only two sites were sampled, so this is a difference between two points rather than a trend along the river, the samples are small (11 and 7), and if pebbles were picked by hand rather than randomly the choice may be biased; measurements to the nearest millimetre also carry some error. The conclusion is therefore probably correct but should be tested with more sites and larger random samples.",
    explanation: "Support the conclusion with statistics, then weigh the sampling limitations and reach a judgement.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: PEBBLES,
    hints: ["Put the values in order first."],
    parts: [
      P.num({
        label: "(a)", stem: "State the median pebble length.",
        value: 43, unit: "mm", wrong: [45],
        explanation: "Ordered: 28, 31, 34, 38, 41, 43, 45, 47, 52, 55, 60. The 6th value is 43 mm.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the range.",
        value: 32, unit: "mm", wrong: [18],
        explanation: "60 − 28 = 32 mm.",
      }),
      P.num({
        label: "(c)", stem: "State the upper quartile (the median of the five values above the median).",
        value: 52, unit: "mm", wrong: [55],
        explanation: "Values above the median: 45, 47, 52, 55, 60; the middle one is 52 mm.",
      }),
      P.mcq({
        label: "(d)", stem: "Which statement about this data set is correct?",
        options: [
          ["The mean and median are almost equal", "Correct: mean ≈ 43.1 mm and median = 43 mm."],
          ["The mode is 43 mm", "Every value occurs once, so there is no mode."],
          ["The range is smaller than the IQR", "The range (32 mm) is larger than the IQR (18 mm)."],
          ["The median is the largest value", "The median is the middle value, 43 mm."],
        ],
        answer: "A",
        explanation: "Mean 43.09 mm and median 43 mm: the data are fairly evenly spread about the middle.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest two ways the class could make its sample more reliable.",
        points: [
          "Measure more pebbles (a larger sample, e.g. 30).",
          "Select pebbles randomly (e.g. at set points along a tape) / repeat at several sites or on another day.",
        ],
        explanation: "Larger, random, repeated samples are more reliable.",
      }),
    ],
    explanation: "Order the data, then find averages and spread.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: DOWNSTREAM,
    hints: ["Order the seven downstream values.", "Percentage change = (new − old) ÷ old × 100."],
    parts: [
      P.num({
        label: "(a)", stem: "State the median downstream pebble length.",
        value: 25, unit: "mm", wrong: [27],
        explanation: "Ordered: 18, 22, 25, 25, 27, 30, 34. The 4th value is 25 mm.",
      }),
      P.num({
        label: "(b)", stem: "State the mode of the downstream lengths.",
        value: 25, unit: "mm", wrong: [34],
        explanation: "25 mm occurs twice; every other value once.",
      }),
      P.num({
        label: "(c)", stem: "Calculate the percentage decrease in median length from upstream (43 mm) to downstream. Give your answer to one decimal place.",
        value: 41.9, tol: 0.06, unit: "%", answer: "41.9", wrong: [72, 18],
        explanation: "(43 − 25) ÷ 43 × 100 = 18 ÷ 43 × 100 = 41.9%.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest one physical process that explains the difference, and describe how it works.",
        points: [
          "Names attrition (or abrasion).",
          "Describes it: pebbles knock against each other (attrition) or against the bed and banks (abrasion) as they are carried, breaking off pieces so they become smaller and rounder downstream.",
        ],
        explanation: "Attrition and abrasion reduce load size downstream.",
      }),
    ],
    explanation: "Comparing two sites uses the same statistics at each, then a percentage change.",
  });

  b.card("DEFINITION", "Mean, median, mode", "Mean: sum ÷ number. Median: middle ordered value. Mode: most frequent value or category.");
  b.card("DEFINITION", "Interquartile range", "Upper quartile − lower quartile: the spread of the middle 50%, unaffected by extremes.");
  b.card("CONCEPT", "Percentage change", "(new − old) ÷ old × 100; positive = increase, negative = decrease.");
  b.card("CONCEPT", "Rates per 1 000", "Rate = events ÷ population × 1 000, e.g. 945 births in 35 000 people = 27 per 1 000.");
  b.card("VOCABULARY", "Ratio vs proportion", "Ratio compares parts (3 : 2); proportion compares a part with the whole (0.4 or 40%).");
  b.card("CONCEPT", "Significant figures and standard form", "Count s.f. from the first non-zero digit (38 451 → 38 000 at 2 s.f.); 4 600 000 = 4.6 × 10⁶.");
  b.card("VOCABULARY", "Interpolation vs extrapolation", "Interpolation: estimate within the data (safer). Extrapolation: estimate beyond it (riskier).");
  b.card("CONCEPT", "Limitations of data", "Small or non-random samples, untypical timing, instrument precision, old secondary data, misleading presentation.");
});
