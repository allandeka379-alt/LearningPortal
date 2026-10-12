// W1a: stats.descriptive. All data are illustrative and computed in code.
import { concept, P, t, chk, table, mean, median, mode, range, sd, sdPopulation, quartiles, skewIndicator, sum, dpStr, geographyLevels } from "../lib.mjs";

// Pedestrian counts per 5 minutes at a bus rank (n = 10)
const C = [14, 9, 22, 17, 12, 17, 25, 11, 19, 17];
const Cs = [...C].sort((a, b) => a - b);
chk(sum(C), 163);
chk(mean(C), 16.3);
chk(median(C), 17);
chk(mode(C)[0], 17);
const cq = quartiles(C);
chk(cq.q1, 12);
chk(cq.q3, 19);
chk(cq.iqr, 7);
const V = [0.31, 0.45, 0.52, 0.38, 0.6, 0.47, 0.55, 0.41, 0.7];
const Vs = [...V].sort((x, y) => x - y);
const vq = quartiles(V);
chk(vq.iqr, 0.18, 1e-9);
const PH = [5.3, 5.9, 6.1, 5.5, 6.4, 5.6];
const sdPH = sd(PH);

// Annual rainfall (mm), 10 years, an Eastern Highlands station (illustrative)
const R = [1150, 1210, 980, 1320, 1090, 1260, 1180, 1030, 1400, 1130];
chk(sum(R), 11750);
const mR = mean(R);
chk(mR, 1175);
const medR = median(R);
chk(medR, 1165);
const sR = sd(R);
const skR = skewIndicator(R);

const tab = (headers, rows) => table(headers, rows);

concept("ageo.stats.descriptive", { file: "stats/descriptive", keyPrefix: "stats.descriptive" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Rock type (granite, sandstone, basalt) recorded at sampling sites is which level of measurement?",
    options: [
      ["Nominal", "Correct: the rock types are names with no natural order."],
      ["Ordinal", "Ordinal data can be ranked, and rock types cannot."],
      ["Interval", "Interval data are numbers with equal gaps."],
      ["Ratio", "Ratio data have a true zero, which a category does not."],
    ],
    answer: "A",
    explanation: "Categories without order are **nominal** data. Only the mode and frequencies are meaningful.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Wind direction recorded in degrees from 0° to 360° is an example of which type of data?",
    options: [
      ["Cyclic", "Correct: 359° is next to 1°, so the scale repeats."],
      ["Nominal", "Degrees are numbers on a scale, not unordered names."],
      ["Ratio", "Zero degrees is only a direction, not an absence of direction."],
      ["Ordinal", "Directions are measured, not just ranked."],
    ],
    answer: "A",
    explanation: "The scale loops back on itself, so the data are **cyclic** and the ordinary mean of directions can mislead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The populations of 12 settlements in a district include one large town far bigger than the rest. Which measure of central tendency is most representative?",
    options: [
      ["The median population", "Correct: the median is not pulled up by the one large town."],
      ["The mean of all twelve populations", "The large town would drag the mean far above a typical settlement."],
      ["The range of the populations", "The range measures spread, not the centre."],
      ["The total population of the district", "A total is not an average."],
    ],
    answer: "A",
    explanation: "Skewed data are better summarised by the **median**, together with the inter-quartile range.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two stations have the same mean annual rainfall. Station X has a standard deviation of 90 mm and Station Y of 240 mm. What does this show?",
    options: [
      ["Station Y rainfall varies more between years", "Correct: a larger standard deviation means more scatter around the mean."],
      ["Rainfall at Station X is higher in most years", "The means are equal, so no station is wetter on average."],
      ["Rainfall at Station Y is more reliable", "More variation means less reliable rainfall."],
      ["Station X has a larger range than Station Y", "A smaller standard deviation normally goes with a smaller spread."],
    ],
    answer: "A",
    explanation: "Equal means but different standard deviations: the data at Station Y are more spread out, so its rainfall is less reliable for farmers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "The sum of squared deviations for a sample of 9 river-width measurements is 72. Which expression gives the sample standard deviation?",
    options: [
      [t`$\sqrt{72 \div 8}$`, "Correct: divide by n − 1 = 8 and take the square root."],
      [t`$\sqrt{72 \div 9}$`, "This divides by n, which gives the population standard deviation."],
      [t`$72 \div 8$`, "This is the variance; the square root is still needed."],
      [t`$\sqrt{72} \div 8$`, "Only the sum of squares should be square-rooted after dividing, not before."],
    ],
    answer: "A",
    explanation: t`Sample standard deviation: $s = \sqrt{\sum (x - \bar{x})^2 \div (n - 1)} = \sqrt{72 \div 8} = 3$.`,
    hints: ["Which number do you divide by for a sample?", "The square root is taken after dividing."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A data set of soil depths has mean 48 cm and median 41 cm, and a histogram with a long tail of deep values. What does this show?",
    options: [
      ["Positive skew, so the distribution is not normal", "Correct: the mean is above the median and the tail is to the right."],
      ["Negative skew, so the mean is the best average", "A negative skew would put the mean below the median."],
      ["A normal distribution, since the mean and median differ by only 7 cm", "A normal distribution has the mean and median almost equal, and a symmetrical histogram."],
      ["No skew, since the mode is unknown", "Skew depends on the tail of the histogram, not on the mode being known."],
    ],
    answer: "A",
    explanation: "A mean above the median and a tail of high values are the signs of **positive skew**. The median is the safer average.",
    hints: ["Which side is the long tail on?", "Is the mean above or below the median?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student ranks 15 village markets from 1 to 15 by size and wants to describe the centre of the ranks. Which statistic is valid for these ordinal data?",
    options: [
      ["The median rank", "Correct: the median needs order only."],
      ["The mean of the sizes in square metres", "The student has ranks, not measured sizes."],
      ["The standard deviation of the ranks", "Standard deviation needs equal intervals between values, which ranks do not give."],
      ["The modal wind direction", "Wind direction is a different variable."],
    ],
    answer: "A",
    explanation: "Ordinal data can be ordered but their gaps are unknown, so the median and quartiles are valid.",
    hints: ["What can you say about the gaps between ranks?"],
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`Pedestrians passing a point outside a Gweru bus rank were counted in ten consecutive five-minute periods (illustrative data):\n\n${tab(["Period", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], [["Count", ...C]])}\n\nCalculate the mean number of pedestrians per five minutes, to one decimal place.`,
    value: mean(C), dp: 1, unit: undefined,
    wrong: [17, 163],
    explanation: "The total is 163 and there are 10 periods: 163 ÷ 10 = 16.3. Giving 17 is the median/mode; 163 forgets to divide.",
    hints: ["Add all ten counts first."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: t`Stream velocity (m/s) was measured at nine sites along a river (illustrative data): ${V.join(", ")}.

Calculate the inter-quartile range, in m/s. Take $Q_1$ and $Q_3$ as the medians of the lower and upper halves of the ordered data, leaving out the median.`,
    value: vq.iqr, unit: "m/s", dp: 2,
    wrong: [Math.max(...V) - Math.min(...V), 0.575],
    explanation: "Ordered: " + Vs.join(", ") + ". The median is the 5th value (0.47). Lower half (0.31, 0.38, 0.41, 0.45): Q1 = 0.395. Upper half (0.52, 0.55, 0.60, 0.70): Q3 = 0.575. IQR = 0.575 − 0.395 = 0.18 m/s. Giving 0.39 is the range (0.70 − 0.31), not the IQR.",
    hints: ["Put the values in order and find the middle one.", "Find the median of each half."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Soil pH was measured at six sampling points in a field (illustrative data): ${PH.join(", ")}. The mean is ${dpStr(mean(PH), 3)}.

Calculate the **sample standard deviation**, to two decimal places.`,
    value: sdPH, dp: 2,
    wrong: [sdPopulation(PH)],
    explanation: t`1. Square each deviation from the mean: ${PH.map((x) => dpStr((x - mean(PH)) ** 2, 4)).join(", ")}.
2. Sum of squares = ${dpStr(sum(PH.map((x) => (x - mean(PH)) ** 2)), 3)}.
3. Divide by $n - 1 = 5$: ${dpStr(sum(PH.map((x) => (x - mean(PH)) ** 2)) / 5, 4)}.
4. Square root: ${dpStr(sdPH, 2)}.
5. Dividing by 6 instead of 5 gives the population value ${dpStr(sdPopulation(PH), 2)}.`,
    hints: ["Square each deviation from the mean.", "Divide by n − 1, not n."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A class sampled 56 farms in a district and found that 14 grow cotton. A farm is chosen at random. What is the probability that it grows cotton? Give your answer as a decimal.",
    value: 14 / 56,
    wrong: [14, 0.14],
    explanation: "Probability = favourable ÷ total = 14 ÷ 56 = 0.25.",
    hints: ["Probability is between 0 and 1."],
  });

  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "A standard deviation can never be negative.",
    answer: true,
    explanation: "True. It is the square root of an average of squared deviations, so it is zero or positive.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "The mean population of the villages in a district is 640 and the median is 410. Explain what this shows about the distribution.",
    points: ["The mean is greater than the median, so the distribution is positively skewed", "A few very large villages pull the mean up, with a long tail of high values", "So the median is the better measure of a typical village / the data are not normally distributed"],
    modelAnswer: "The mean is much greater than the median, so the distribution is positively skewed. A few very large villages pull the mean up, creating a long tail of high values, so the median is the better measure of a typical village and the data are not normally distributed.",
    explanation: "Compare mean and median, give the cause and the consequence for choosing an average.",
    hints: ["Which average is larger and what pulls it up?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each variable to its level of measurement.",
    pairs: [
      ["Land use type at survey points", "Nominal"],
      ["Settlement order (1st, 2nd, 3rd)", "Ordinal"],
      ["Midday temperature in °C", "Interval"],
      ["Annual rainfall in mm", "Ratio"],
      ["Month of the year", "Cyclic"],
    ],
    explanation: "Names are nominal; ranked order is ordinal; temperature in °C has equal gaps but no true zero (interval); rainfall has a true zero (ratio); months repeat each year (cyclic).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about a skewed data set.",
    template: "In a data set with positive skew the mean is {{blank:a}} the median, and the better measure of the centre is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["above"], choices: ["above", "below", "equal to"] },
      { id: "b", accepted: ["median"], choices: ["mean", "median", "range"] },
    ],
    explanation: "A tail of high values pulls the mean above the median, so the median is a more representative average.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the measure of spread that shows the range of the middle half of the ordered data.",
    accepted: ["inter-quartile range", "interquartile range", "IQR", "inter quartile range"],
    wrong: ["range", "standard deviation"],
    explanation: "The **inter-quartile range** is the upper quartile minus the lower quartile.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the median, not the mean, is the better average for the sizes of settlements in a district that contains one very large city.",
    points: [
      "The city is an extreme (outlying) value",
      "It pulls the mean upwards / the mean is not typical of most settlements",
      "The median depends on the middle value, so it is not affected by the extreme",
    ],
    modelAnswer: "The city is an extreme value. It pulls the mean far above the size of most settlements, so the mean is not typical. The median is the middle value of the ordered data and is not affected by the extreme, so it describes a typical settlement better.",
    explanation: "Name the extreme value, say what it does to the mean and why the median resists it.",
    hints: ["Which value is much larger than the rest?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe three checks a student can make to decide whether a set of river-width data is normally distributed.",
    points: [
      "Draw a histogram and check that it is symmetrical and bell-shaped",
      "Compare the mean and the median: they should be almost equal",
      "Calculate a skew indicator, (mean − median) ÷ standard deviation, which should be close to zero / check that about 68% of values lie within one standard deviation of the mean",
    ],
    modelAnswer: "Draw a histogram and see whether it is symmetrical and bell-shaped. Compare the mean with the median, which should be nearly equal. Calculate a skew indicator, (mean − median) divided by the standard deviation, which should be close to zero.",
    explanation: "Any three of the checks: shape, mean against median, skew indicator or the 68% rule.",
    hints: ["Think about a picture, a comparison and a calculation."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: t`A farmer in a rain-fed area is told that the mean annual rainfall is 700 mm with a standard deviation of 210 mm. Explain what the standard deviation tells the farmer and suggest one way the farmer might respond.`,
    points: [
      "The standard deviation measures how much annual rainfall varies from the mean",
      "A value of 210 mm (30% of the mean) is large / rainfall varies a lot from year to year",
      "So many years will be well above or well below 700 mm / the mean is an unreliable guide to any one season",
      "Suggested response: drought-tolerant crops (e.g. sorghum, millet) or water harvesting or crop diversification or insurance, linked to unreliable rainfall",
    ],
    modelAnswer: "The standard deviation shows how far annual rainfall typically departs from the mean. At 210 mm, about 30% of the mean, rainfall varies a great deal, so many years are well above or below 700 mm and the mean is an unreliable guide for any one season. The farmer could grow drought-tolerant crops such as sorghum or harvest water.",
    explanation: "Define what SD shows, quote the size relative to the mean, interpret and apply.",
    hints: ["Compare 210 mm with 700 mm."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true, examStyle: false,
    stem: t`The table shows annual rainfall (mm) at a station in the Eastern Highlands over ten years (illustrative data).\n\n${tab(["Year", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], [["Rainfall (mm)", ...R]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean annual rainfall, in mm.", value: mR, unit: "mm", wrong: [1165], explanation: "11 750 ÷ 10 = 1175 mm. The value 1165 is the median." }),
      P.num({ label: "(b)", marks: 1, stem: "State the median annual rainfall, in mm.", value: medR, unit: "mm", wrong: [1175], explanation: "Ordered: " + [...R].sort((a, b) => a - b).join(", ") + ". Median = (1150 + 1180) ÷ 2 = 1165 mm." }),
      P.num({ label: "(c)", marks: 3, type: "CALCULATION", stem: "Calculate the sample standard deviation, in mm, to the nearest whole number.", value: sR, dp: 0, unit: "mm", wrong: [Math.round(sdPopulation(R))], explanation: t`1. Sum of squared deviations from 1175 = ${dpStr(sum(R.map((x) => (x - mR) ** 2)), 0)}.\n2. Divide by $n - 1 = 9$: ${dpStr(sum(R.map((x) => (x - mR) ** 2)) / 9, 0)}.\n3. Square root: ${dpStr(sR, 0)} mm. Dividing by 10 gives ${dpStr(sdPopulation(R), 0)} mm.` }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the skew indicator (mean − median) ÷ standard deviation, to two decimal places.", value: skR, dp: 2, wrong: [10], explanation: t`$(1175 - 1165) \div ${dpStr(sR, 1)} = ${dpStr(skR, 2)}$.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Using your answers to (a), (b) and (d), comment on whether the rainfall is normally distributed.", points: ["Mean (1175 mm) and median (1165 mm) are very close", "Skew indicator close to zero, so almost no skew", "So the distribution is roughly symmetrical / roughly normal, though a histogram of ten values would confirm this"], modelAnswer: "The mean (1175 mm) and median (1165 mm) are very close and the skew indicator is near zero, so the data are almost symmetrical. The distribution is roughly normal, although a histogram would be needed to confirm it with only ten values." }),
      P.manual({ label: "(f)", marks: 2, stem: "Comment on what the standard deviation shows about the reliability of the rainfall.", points: ["The standard deviation is about 11% of the mean / fairly small relative to the mean, so rainfall is fairly reliable from year to year", "Individual years can still differ from the mean by roughly 130 mm"], modelAnswer: "The standard deviation is about 11% of the mean, so rainfall is fairly consistent from year to year, although a typical year can still be roughly 130 mm above or below the mean." }),
    ],
    explanation: "Mean, median and sample SD are calculated from the data; a skew indicator close to zero supports a roughly normal distribution.",
    hints: ["Work out the mean first; it is needed for everything else."],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: t`A survey of 50 households in a peri-urban ward recorded their main source of drinking water (illustrative data).\n\n${tab(["Main source", "Piped to the yard", "Borehole", "Protected well", "River or stream"], [["Households", 20, 15, 10, 5]])}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which level of measurement describes the variable 'main source of water'?", options: [["Nominal", "Correct: unordered categories."], ["Ordinal", "The sources are not ranked in the data."], ["Interval", "No numerical scale is involved."], ["Ratio", "There is no measured quantity with a true zero."]], answer: "A", explanation: "Categories without order are nominal." }),
      P.short({ label: "(b)", marks: 1, stem: "Which source is the modal category?", accepted: ["piped to the yard", "piped", "piped water"], explanation: "The largest frequency, 20 households, is piped to the yard." }),
      P.num({ label: "(c)", marks: 2, stem: "A household is chosen at random. What is the probability that it uses a borehole or a protected well? Give a decimal.", value: (15 + 10) / 50, wrong: [0.3, 0.5 * 0.5], explanation: "The events are mutually exclusive, so add: 15/50 + 10/50 = 25/50 = 0.5." }),
      P.num({ label: "(d)", marks: 2, stem: "Two different households are chosen. Treat the choices as independent. What is the probability that both use the river or stream? Give a decimal.", value: (5 / 50) ** 2, wrong: [0.1, 0.2], explanation: "Independent events: 0.1 × 0.1 = 0.01." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the mean cannot be used to summarise these data.", points: ["The data are nominal / categories, not numbers", "Categories cannot be added and divided; only the mode and percentages make sense"], modelAnswer: "The sources are names, not numbers, so they cannot be added and divided. For nominal data only the mode and percentages or frequencies are valid." }),
    ],
    explanation: "Nominal data: mode, frequencies and probabilities; add probabilities for 'or' and multiply them for 'and'.",
    hints: ["Divide each frequency by 50 to get a probability."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the usefulness of the mean and the standard deviation for describing the rainfall of a farming area where rainfall varies greatly between years. [8]",
    points: [
      "Mean gives a single summary / a long-term expectation useful for comparing places",
      "Standard deviation shows variability around the mean, which the mean hides",
      "Large SD relative to the mean means the mean seldom occurs in practice / unreliable",
      "Use together (for example, the coefficient of variation or the SD as a percentage of the mean) to compare areas",
      "Mean affected by extreme years (floods, droughts); median and IQR may be better if skewed",
      "Neither shows timing (distribution within the season), dry spells or intensity, which matter for crops",
      "A short record (10 years) makes both estimates uncertain",
      "Judgement: useful as a starting point but limited; farmers need the distribution, the probability of drought and seasonal timing as well",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The mean gives a simple long-term expectation and allows places to be compared, but on its own it hides variability. The standard deviation shows how far years depart from the mean; if it is large relative to the mean, the mean seldom occurs in practice and planning on it is risky. Used together, and expressed as a percentage of the mean, they let one area be compared with another. However, both are affected by extreme years, so in skewed data the median and IQR are safer, and neither shows when in the season rain falls, the length of dry spells or storm intensity, which strongly affect crops. A ten-year record also gives uncertain estimates. Overall, the mean and standard deviation are a useful first summary but should be supported by the median, the probability of drought years and seasonal data.",
    wordLimit: { max: 300 },
    explanation: "A balanced answer: what each statistic shows, its limits, and a supported judgement.",
    hints: ["Say what each statistic tells you, then what it cannot tell you."],
  });

  b.card("DEFINITION", "What are the four levels of measurement (and a fifth type of data)?", "Nominal, ordinal, interval, ratio; cyclic data repeat after a fixed cycle (e.g. wind direction).");
  b.card("FORMULA", "Sample standard deviation formula?", t`$s = \sqrt{\dfrac{\sum (x - \bar{x})^2}{n - 1}}$`, "Divide by n − 1 for a sample, n for a whole population.");
  b.card("CONCEPT", "Which average suits skewed data?", "The median (with the inter-quartile range); the mean is pulled by extreme values.");
  b.card("DEFINITION", "Inter-quartile range?", t`$IQR = Q_3 - Q_1$: the spread of the middle half of the ordered data.`);
  b.card("CONCEPT", "Which statistics are allowed for nominal data?", "Mode, frequencies and percentages (and chi-squared); no mean or median.");
  b.card("FACT", "Probability rules for two events?", "Independent 'and': multiply. Mutually exclusive 'or': add. Probability lies between 0 and 1.");
  b.card("CONCEPT", "Three signs of a roughly normal distribution?", "Symmetrical bell-shaped histogram; mean close to median; skew indicator near zero.");
  b.card("FACT", "Roughly what share of a normal distribution lies within 1 and 2 standard deviations of the mean?", "About 68% within one and about 95% within two.");
  b.card("CONCEPT", "What does positive skew look like?", "A long tail of high values; mean greater than median.");
});
