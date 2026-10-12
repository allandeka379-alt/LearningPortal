// W1a: stats.correlation-regression. All data illustrative; every number computed with lib helpers.
import { concept, P, t, chk, table, spearman, pearson, regression, ranks, dpStr, sum, geographyLevels } from "../lib.mjs";

const mt = (x, dp) => dpStr(x, dp).replace("−", "-");

// calc: settlement population ('000) against number of services, 7 settlements
const PX = [11, 34, 7, 56, 23, 4, 43];
const PY = [13, 19, 10, 44, 27, 8, 31];
const spP = spearman(PX, PY);
// struct: building height against distance from the CBD, 9 sites
const DX = [0.4, 1.1, 2.2, 3.0, 4.6, 5.9, 7.2, 8.5, 9.7];
const DY = [15, 11, 9, 12, 6, 4, 7, 3, 2];
const spD = spearman(DX, DY);
// struct: regression of cotton yield on rainfall
const RX = [420, 470, 510, 560, 600, 640, 690, 740];
const RY = [0.55, 0.62, 0.8, 0.84, 1.05, 1.1, 1.3, 1.34];
const rg = regression(RX, RY);
const prR = pearson(RX, RY);
const tabV = (h, r) => table(h, r);

concept("ageo.stats.correlation-regression", { file: "stats/correlation-regression", keyPrefix: "stats.correlation-regression" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a negative correlation between two variables mean?",
    options: [
      ["One variable tends to fall as the other rises", "Correct: the points slope downwards on a scatter graph."],
      ["One variable is caused by the other", "Correlation never proves cause."],
      ["The two variables have no relationship", "No relationship would give a coefficient near zero."],
      ["Both variables fall to zero together", "That would still be a positive relationship."],
    ],
    answer: "A",
    explanation: "A negative correlation means that as one variable increases the other tends to decrease; the coefficient is below zero.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A student has two sets of ranked data, with ten pairs and no normality check. Which coefficient is the usual choice?",
    options: [
      ["Spearman's rank coefficient", "Correct: it works on ranks and does not need normal data."],
      ["The chi-squared test statistic", "Chi-squared compares counts in categories, not ranked pairs."],
      ["The sample standard deviation", "This is a measure of spread, not of relationship."],
      ["The nearest neighbour index", "This describes the pattern of points on a map."],
    ],
    answer: "A",
    explanation: "Spearman's rs is the standard test for the relationship between ranked or non-normal data.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A student finds rs = +0.82 for 10 pairs of data. The critical value at the 5% level for 10 pairs is 0.648. What is the correct conclusion?",
    options: [
      ["A significant strong positive relationship", "Correct: 0.82 is greater than 0.648 and positive."],
      ["A significant strong negative relationship", "The sign is positive, so the relationship is positive."],
      ["A positive relationship that is not significant", "0.82 exceeds the critical value, so it is significant."],
      ["No relationship, because 0.82 is less than 1", "Only values near zero indicate no relationship."],
    ],
    answer: "A",
    explanation: "The coefficient exceeds the critical value, so the null hypothesis is rejected; the sign shows a positive relationship.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Five households have the following number of livestock: 6, 9, 9, 9, 14. What are the ranks (smallest = 1) when tied values share the mean rank?",
    options: [
      ["1, 3, 3, 3, 5", "Correct: the three 9s would take ranks 2, 3 and 4, whose mean is 3."],
      ["1, 2, 3, 4, 5", "This ignores the ties."],
      ["1, 2, 2, 2, 5", "The tied values should share the mean of the ranks they span, not the lowest."],
      ["1, 4, 4, 4, 5", "The tied values take the mean of ranks 2 to 4, which is 3, not 4."],
    ],
    answer: "A",
    explanation: "The tied values span ranks 2, 3 and 4. Their mean is (2 + 3 + 4) ÷ 3 = 3, so each is ranked 3.",
    hints: ["Which ranks would the three 9s have taken if they were different?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A regression line based on rainfall data between 300 mm and 650 mm is used to predict yield at 900 mm. What is the main problem?",
    options: [
      ["This is extrapolation beyond the data, so the relationship may not hold", "Correct: outside the range of the data the pattern may change."],
      ["The regression line cannot pass through the mean", "The line always passes through the mean point."],
      ["Predictions can only be made at the mean rainfall", "A line can predict for any value inside the range of data."],
      ["The correlation coefficient must be negative for predictions", "The sign of the coefficient does not decide whether predictions are possible."],
    ],
    answer: "A",
    explanation: "Estimating outside the data range is extrapolation. Rain beyond a certain amount may cause waterlogging, so the straight line may not continue.",
    hints: ["Is 900 mm inside or outside the data?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A study finds a strong positive correlation between the number of boreholes in a district and the number of cases of a disease. Which is the best interpretation?",
    options: [
      ["A third factor, such as population size, may explain both", "Correct: more people means more boreholes and more cases; correlation is not cause."],
      ["Boreholes cause the disease", "A correlation does not prove that one variable causes the other."],
      ["The disease causes boreholes to be drilled", "The same logic applies: association is not cause in either direction."],
      ["The data must have been collected incorrectly", "A real correlation can arise without any error in the data."],
    ],
    answer: "A",
    explanation: "A strong correlation can be produced by a third factor that affects both variables, so it must not be read as cause and effect.",
    hints: ["Think about what could affect both variables."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student finds rs = −0.31 for 14 pairs; the critical value at the 5% level is 0.538. Which statement is correct?",
    options: [
      ["The weak negative relationship is not significant", "Correct: 0.31 is smaller than 0.538, so it could be chance."],
      ["The strong negative relationship is significant", "A value of 0.31 is weak and below the critical value."],
      ["The weak positive relationship is significant", "The sign is negative and the value is not significant."],
      ["The test is invalid because the value is negative", "Negative coefficients are valid; only the size is compared."],
    ],
    answer: "A",
    explanation: "|rs| = 0.31 is less than 0.538, so do not reject H₀: there is no significant relationship.",
    hints: ["Compare the size, ignoring the sign."],
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`For 10 pairs of data a student found $\sum d^2 = 44$. Use $r_s = 1 - \dfrac{6\sum d^2}{n^3 - n}$ to calculate $r_s$ to three decimal places.`,
    value: 1 - (6 * 44) / (1000 - 10), dp: 3,
    wrong: [1 - (6 * 44) / 1000, 0.267, 3.27],
    explanation: t`$n^3 - n = 1000 - 10 = 990$. $6 \times 44 = 264$. $264 \div 990 = 0.2667$. $r_s = 1 - 0.2667 = 0.733$. Forgetting to subtract from 1 gives 0.267.`,
    hints: ["Work out n³ − n first."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Seven settlements are ranked by population and by the number of services (illustrative data).\n\n${tabV(["Settlement", "A", "B", "C", "D", "E", "F", "G"], [["Population ('000)", ...PX], ["Services", ...PY]])}\n\nCalculate Spearman's rank correlation coefficient, to three decimal places. (The critical value at the 5% level for 7 pairs is ${spP.crit}.)`,
    value: spP.rs, dp: 3,
    wrong: [spP.sumD2, (6 * spP.sumD2) / 336],
    explanation: t`1. Ranks of population: ${spP.rows.map((r) => r.rx).join(", ")}. Ranks of services: ${spP.rows.map((r) => r.ry).join(", ")}.\n2. $d^2$: ${spP.rows.map((r) => r.d2).join(", ")}; $\sum d^2 = ${spP.sumD2}$.\n3. $r_s = 1 - 6 \times ${spP.sumD2} \div (7^3 - 7) = 1 - ${6 * spP.sumD2} \div 336 = ${dpStr(spP.rs, 3)}$.\n4. ${dpStr(spP.rs, 3)} is greater than ${spP.crit}, so the positive relationship is significant.`,
    hints: ["Rank each row from smallest (1) to largest (7).", "Square the differences between the ranks."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A regression of household water use on household size gives y = 18 + 22x, where y is litres per day and x is the number of people. Use the line to estimate daily water use for a household of 6 people, in litres per day.",
    value: 18 + 22 * 6, unit: undefined,
    wrong: [40, 132],
    explanation: "y = 18 + 22 × 6 = 18 + 132 = 150 litres per day. Forgetting the intercept gives 132; using 22 + 18 gives 40.",
    hints: ["Substitute x = 6 into the equation."],
  });
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Six pairs of values have been ranked and two of the values in one set are tied at ranks 3 and 4. What rank does each tied value receive?",
    value: 3.5,
    wrong: [3, 4],
    explanation: "Tied values share the mean of the ranks they would have taken: (3 + 4) ÷ 2 = 3.5.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A Spearman's coefficient of −1 means there is no relationship between the variables.",
    answer: false,
    explanation: "False. −1 is a perfect negative correlation. A coefficient of zero means no relationship.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A regression of crop yield on rainfall gives r² = 0.81. Explain what this value shows.",
    points: ["81% of the variation in yield is accounted for by the variation in rainfall", "The remaining 19% is due to other factors (soil, pests, temperature, management)", "It shows the strength of the relationship but does not prove that rainfall causes the yield"],
    modelAnswer: "About 81% of the variation in yield is accounted for by variation in rainfall. The remaining 19% is due to other factors such as soil, pests, temperature and management. The value shows the strength of the relationship but does not prove that rainfall causes the yield.",
    explanation: "Interpret r² as a share of variation and note other factors and cause.",
    hints: ["Express r² as a percentage."],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each coefficient value to its description.",
    pairs: [
      ["+0.95", "Strong positive correlation"],
      ["−0.92", "Strong negative correlation"],
      ["+0.05", "Almost no correlation"],
      ["−0.35", "Weak negative correlation"],
    ],
    explanation: "Values near ±1 are strong, values near 0 are weak or absent, and the sign gives the direction.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about prediction from a regression line.",
    template: "Estimating a value inside the range of the data is called {{blank:a}}, while estimating outside the range is called {{blank:b}}, which is less reliable.",
    blanks: [
      { id: "a", accepted: ["interpolation"], choices: ["interpolation", "extrapolation", "correlation"] },
      { id: "b", accepted: ["extrapolation"], choices: ["interpolation", "extrapolation", "correlation"] },
    ],
    explanation: "Interpolation stays within the data; extrapolation goes beyond and may assume the pattern continues.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term describes the rank given to two or more equal values, found by averaging the ranks they would have occupied?",
    accepted: ["tied rank", "tied ranks", "ties", "tie", "tied value", "shared rank", "mean rank"],
    wrong: ["rank order", "outlier"],
    explanation: "Equal values are **tied** and each receives the mean of the ranks they span.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe what a scatter graph of rainfall (x-axis) against maize yield (y-axis) would show if the relationship were strong and positive.",
    points: ["Points slope upwards from the lower left to the upper right", "Points lie close to a straight line of best fit (little scatter)", "Few or no anomalies / yield rises as rainfall rises"],
    modelAnswer: "The points would slope upwards from lower left to upper right and lie close to a line of best fit with little scatter, showing that yield rises as rainfall increases, with few or no anomalies.",
    explanation: "Direction, strength and anomalies are the three features to describe.",
    hints: ["Think of direction, closeness to a line and anomalies."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why a significant correlation between two variables does not prove that one causes the other.",
    points: ["Correlation measures association only", "A third factor may affect both variables", "The relationship may be coincidence / the sample may be small or biased"],
    modelAnswer: "Correlation only measures how two variables vary together. A third factor may influence both, for example population size affecting boreholes and disease cases. With a small or biased sample the pattern may also be due to chance.",
    explanation: "Say what correlation measures, name a third factor and note chance.",
    hints: ["Could something else affect both variables?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A regression line of sorghum yield on rainfall is based on seasons with 380 mm to 710 mm of rain. Explain two reasons why it should not be used to predict yield for a season with 1 050 mm.",
    points: ["1 100 mm is outside the range of the data (extrapolation) so the relationship is untested", "Very high rainfall may cause waterlogging or leaching so the yield may fall, not rise", "The line is straight but the true relationship may be curved / levels off", "Other factors (temperature, soil, disease) may become limiting"],
    modelAnswer: "The prediction would be an extrapolation beyond the data range, so the relationship is untested. Also very high rainfall may cause waterlogging and leaching of nutrients, so yield may fall instead of continuing to rise, and other factors may become limiting.",
    explanation: "Any two valid reasons, each explained, for 2 marks each.",
    hints: ["What might happen to a crop in very wet conditions?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A student investigated whether the height of buildings (number of storeys) falls with distance from the CBD of a Zimbabwean town. She measured nine sites (illustrative data).\n\n${tabV(["Site", ...DX.map((_, i) => String(i + 1))], [["Distance (km)", ...DX.map((x) => dpStr(x, 1))], ["Storeys", ...DY]])}\n\nThe critical value of Spearman's rs at the 5% level for 9 pairs is ${spD.crit}.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the null hypothesis and the alternative hypothesis.", points: ["H₀: there is no relationship between building height and distance from the CBD", "H₁: building height decreases with distance from the CBD"], modelAnswer: "H₀: there is no relationship between building height and distance from the CBD. H₁: building height decreases as distance from the CBD increases." }),
      P.num({ label: "(b)", marks: 2, stem: "Rank each set of data and calculate Σd².", value: spD.sumD2, wrong: [spD.sumD2 + 8], explanation: t`Ranks of distance: ${spD.rows.map((r) => r.rx).join(", ")}. Ranks of height: ${spD.rows.map((r) => r.ry).join(", ")}. $d^2$: ${spD.rows.map((r) => r.d2).join(", ")}. The sum is ${spD.sumD2}.` }),
      P.num({ label: "(c)", marks: 3, type: "CALCULATION", stem: "Calculate rs to three decimal places.", value: spD.rs, dp: 3, wrong: [(6 * spD.sumD2) / 720], explanation: t`$r_s = 1 - 6 \times ${spD.sumD2} \div (9^3 - 9) = 1 - ${6 * spD.sumD2} \div 720 = ${mt(spD.rs, 3)}$.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "What decision should be made about the null hypothesis?", options: [["Reject it, because |rs| is greater than the critical value", "Correct."], ["Accept it, because rs is negative", "The sign does not decide; the size is compared with the critical value."], ["Accept it, because |rs| is greater than the critical value", "A larger value leads to rejection."], ["Reject it, because rs is less than 1", "Being below 1 is not the test."]], answer: "A", explanation: `|rs| = ${dpStr(Math.abs(spD.rs), 3)} is greater than ${spD.crit}, so H₀ is rejected.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State the conclusion in geographical terms and suggest one reason for the pattern.", points: ["There is a significant negative relationship: buildings get lower with distance from the CBD", "Reason: land is more valuable/in demand near the CBD so tall buildings are built to use space intensively (accessibility)"], modelAnswer: "There is a significant negative relationship, so buildings become lower with distance from the CBD. Land near the CBD is the most accessible and expensive, so developers build tall buildings to use it intensively." }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest two ways to improve the investigation.", points: ["More sites / a larger sample", "Sites along several transects in different directions / measure at a different time or repeat"], modelAnswer: "Use more sites to give a larger sample, and measure along several transects in different directions from the CBD." }),
    ],
    explanation: "Rank both variables the same way, find Σd², substitute into the formula and compare |rs| with the critical value.",
    hints: ["Rank the smallest value as 1 in both columns.", "Remember the minus sign when stating the relationship."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`A regression of cotton yield $y$ (t/ha) on seasonal rainfall $x$ (mm) for eight seasons, with rainfall from 420 mm to 740 mm, gave the line $y = ${mt(rg.a, 3)} + ${dpStr(rg.b, 5)}x$ (illustrative data). Pearson's $r$ was ${dpStr(prR.r, 3)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Use the line to estimate the yield, in t/ha, for a season with 600 mm of rainfall, to two decimal places.", value: rg.predict(600), dp: 2, unit: "t/ha", wrong: [rg.b * 600], explanation: t`$y = ${mt(rg.a, 3)} + ${dpStr(rg.b, 5)} \times 600 = ${dpStr(rg.predict(600), 2)}$ t/ha. Leaving out the intercept gives ${dpStr(rg.b * 600, 2)}.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain what the value of the gradient shows.", points: [`It shows the change in yield for each extra 1 mm of rain (about ${dpStr(rg.b, 4)} t/ha per mm, or ${dpStr(rg.b * 100, 2)} t/ha per extra 100 mm)`, "The sign is positive, so yield increases with rainfall"], modelAnswer: `The gradient is the change in yield for each additional millimetre of rain: about ${dpStr(rg.b, 4)} t/ha per mm, or about ${dpStr(rg.b * 100, 2)} t/ha for each extra 100 mm. It is positive, so yield rises as rainfall rises.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "The line is used to estimate yield at 900 mm. This is an example of", options: [["extrapolation", "Correct: 900 mm is outside the data range 420 mm to 740 mm."], ["interpolation", "Interpolation stays inside the range of the data."], ["ranking", "Ranking is part of Spearman's method."], ["correlation", "Correlation is a measure of association."]], answer: "A", explanation: "900 mm lies outside 420-740 mm, so it is extrapolation." }),
      P.num({ label: "(d)", marks: 2, type: "CALCULATION", stem: "Calculate r², to three decimal places.", value: prR.r ** 2, dp: 3, wrong: [prR.r], explanation: t`$r^2 = ${dpStr(prR.r, 3)}^2 = ${dpStr(prR.r ** 2, 3)}$.` }),
      P.manual({ label: "(e)", marks: 1, stem: "State what r² shows about this relationship.", points: [`About ${dpStr(prR.r ** 2 * 100, 0)}% of the variation in yield is accounted for by the variation in rainfall`], modelAnswer: `About ${dpStr(prR.r ** 2 * 100, 0)}% of the variation in yield is accounted for by rainfall.` }),
    ],
    explanation: "Substitute into the equation, interpret the gradient, recognise extrapolation and square r.",
    hints: ["Substitute x into y = a + bx.", "The range of the data is 420-740 mm."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the use of Spearman's rank correlation to investigate whether the size of settlements and the number of services they provide are related. [8]",
    points: [
      "Suitable for ranked data and does not need normally distributed data (settlement sizes are usually skewed)",
      "Simple formula that can be completed by hand in an examination",
      "Gives the strength and direction of the relationship as a single value",
      "Can be tested for significance against a critical value for n pairs",
      "Ties reduce accuracy and need mean ranks; many ties make the formula only approximate",
      "Uses ranks only, so it loses information about the size of differences",
      "Shows association, not cause (a third factor such as accessibility or income may explain both)",
      "Judgement: appropriate and effective for this question if n is adequate, but should be supported by a scatter graph and explanations of anomalies",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Spearman's rank is suitable because settlement populations are usually skewed and the test does not need normal data. The formula is simple, gives the strength and direction in one value and can be tested for significance against a critical value. However, ties lower its accuracy and, because only ranks are used, information about how much larger one settlement is than another is lost. It also shows association, not cause: both size and services may be explained by accessibility or income. Overall it is a good, appropriate method for this enquiry provided there are enough settlements, but it should be supported by a scatter graph and by explanations of any anomalies.",
    wordLimit: { max: 300 },
    explanation: "Strengths, limitations and a judgement.",
    hints: ["What kind of data does Spearman suit, and what does it fail to show?"],
  });

  b.card("FORMULA", "Spearman's rank correlation formula?", t`$r_s = 1 - \dfrac{6\sum d^2}{n^3 - n}$`, "d = difference between the ranks of each pair.");
  b.card("CONCEPT", "How are tied values ranked?", "Each tied value receives the mean of the ranks they would have occupied (e.g. ranks 3 and 4 → 3.5 each).");
  b.card("FACT", "What range of values can r or rs take?", "−1 (perfect negative) through 0 (none) to +1 (perfect positive).");
  b.card("CONCEPT", "Decision rule for rs?", "If |rs| is greater than the critical value for n pairs, the relationship is significant: reject H₀.");
  b.card("FORMULA", "The regression line?", t`$y = a + bx$, with $b$ the gradient and $a$ the intercept; it passes through the mean point $(\bar{x}, \bar{y})$.`);
  b.card("DEFINITION", "Interpolation and extrapolation?", "Interpolation: estimating inside the range of the data. Extrapolation: estimating outside it, which is unreliable.");
  b.card("CONCEPT", "When is Pearson's r suitable (rather than Spearman)?", "For measured (interval or ratio) data that are roughly normal and linearly related.");
  b.card("CONCEPT", "What does r² show?", "The proportion of the variation in y that is accounted for by x.");
  b.card("CONCEPT", "Why is correlation not causation?", "A third factor may affect both variables, or the pattern may be chance; correlation only shows association.");
});
