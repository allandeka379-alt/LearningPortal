// W4a: the t-test (Cambridge A Level only).
import { concept, P, t, chk, table, dpStr, sfStr, mean, sd, sum, tTest, tCrit } from "../lib.mjs";

const T_F = t`$t = \dfrac{|\bar{x}_1 - \bar{x}_2|}{\sqrt{\dfrac{s_1^2}{n_1} + \dfrac{s_2^2}{n_2}}}$`;
const SD_F = t`$s = \sqrt{\dfrac{\sum (x - \bar{x})^2}{n - 1}}$`;
const tFrom = (m1, s1, n1, m2, s2, n2) => Math.abs(m1 - m2) / Math.sqrt((s1 * s1) / n1 + (s2 * s2) / n2);

concept("abio.evolution.t-test", { file: "evolution/t-test", keyPrefix: "evolution.t-test" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "For which comparison is the t-test the appropriate statistical test?",
    options: [
      ["The mean lengths of leaves from two different sites", "Correct: two means of continuous data."],
      ["Numbers of offspring in four phenotype classes against a 9 : 3 : 3 : 1 ratio", "Counts in categories against expected numbers need chi-squared."],
      ["Whether light intensity is related to the number of plant species in quadrats", "A relationship between two variables needs a correlation test."],
      ["The diversity of insect species in a sample from one field", "Diversity is measured with Simpson's index."],
    ],
    answer: "A",
    explanation: "The t-test compares the means of two samples of continuous data.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the null hypothesis for a t-test comparing the masses of seeds from irrigated and unirrigated plots?",
    options: [
      ["There is no significant difference between the mean seed masses of the two plots", "Correct."],
      ["Seeds from the irrigated plot are significantly heavier than seeds from the other plot", "This is an alternative hypothesis."],
      ["Irrigation causes an increase in the mean mass of the seeds produced", "A null hypothesis states no difference, and tests do not show cause."],
      ["The seed masses in each plot follow a normal distribution", "This is an assumption of the test, not its null hypothesis."],
    ],
    answer: "A",
    explanation: "Null hypothesis: no significant difference between the means; any difference is due to chance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A t-test gives t = 1.46. The critical value at p = 0.05 is 2.12. What should be concluded?",
    options: [
      ["The difference is not significant; accept the null hypothesis", "Correct: t is below the critical value."],
      ["The difference is significant; reject the null hypothesis", "That needs t greater than 2.12."],
      ["The two samples have been shown to have identical means", "Accepting the null hypothesis does not show the means are equal."],
      ["The test is invalid because t is smaller than 2", "Any positive value of t is valid."],
    ],
    answer: "A",
    explanation: "1.46 < 2.12, so the difference is not significant and is due to chance; accept the null hypothesis.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Two pairs of samples have the same difference between their means. In the first pair the standard deviations are much larger. How will t compare?",
    options: [
      ["t will be smaller for the first pair", "Correct: larger s gives a larger denominator."],
      ["t will be larger for the first pair", "Greater variability reduces t."],
      ["t will be the same, because the means differ equally", "t depends on the spread as well as the difference."],
      ["t cannot be calculated when the standard deviations are large", "It can; it will simply be small."],
    ],
    answer: "A",
    explanation: "t = difference ÷ √(s₁²/n₁ + s₂²/n₂); larger standard deviations increase the denominator and reduce t.",
    hints: ["Where does s appear in the formula?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which condition is an assumption of the t-test?",
    options: [
      ["Data in each sample are approximately normally distributed", "Correct."],
      ["Every expected value in each category is at least 5", "This applies to the chi-squared test."],
      ["Both samples must contain more than 30 values", "The t-test is designed for small samples."],
      ["The two variables must have been measured on each individual", "That describes paired data for correlation."],
    ],
    answer: "A",
    explanation: "The t-test assumes continuous, roughly normally distributed data with similar standard deviations.",
    hints: ["Think about the shape of the distribution."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A student finds t = 3.40 with 10 values in each sample. Critical values: 2.10 at p = 0.05 and 2.88 at p = 0.01 (18 degrees of freedom). Which statement is correct?",
    options: [
      ["The probability that the difference is due to chance is less than 1%", "Correct: t exceeds even the p = 0.01 value."],
      ["The difference is significant at p = 0.05 but not at p = 0.01", "t (3.40) is also above 2.88."],
      ["The degrees of freedom should be 9, so the critical values are wrong", "df = 10 + 10 − 2 = 18."],
      ["There is a 3.40% chance that the null hypothesis is true", "t is not a probability."],
    ],
    answer: "A",
    explanation: "3.40 > 2.88, so p < 0.01: the difference is highly significant.",
    hints: ["Compare t with both critical values."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Students compared the heights of maize plants grown with and without manure, using 5 plants per treatment, and found t below the critical value. What is the best next step?",
    options: [
      ["Repeat with many more plants, because small samples make real differences hard to detect", "Correct: larger n reduces the standard errors and increases t if the difference is real."],
      ["Conclude that manure has no effect on the growth of maize plants of any variety", "A non-significant result with tiny samples is weak evidence of no effect."],
      ["Use the chi-squared test instead, as it is more sensitive", "Chi-squared is for counts in categories, not heights."],
      ["Remove the tallest unmanured plant so that the means differ more", "Removing data to get a result is not valid."],
    ],
    answer: "A",
    explanation: "With n = 5 the standard errors are large; a bigger sample gives the test more power to detect a real difference.",
    hints: ["What does n do to the denominator of t?"],
  });

  // Numerical: degrees of freedom
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A t-test compares 11 leaves from one tree with 13 leaves from another. How many degrees of freedom are used?",
    value: 22, wrong: [23, 24],
    explanation: "df = n₁ + n₂ − 2 = 11 + 13 − 2 = **22**.",
  });
  // Calculation from summary statistics
  const S = { m1: 34.2, s1: 4.1, n1: 12, m2: 29.8, s2: 3.6, n2: 12 };
  const tS = tFrom(S.m1, S.s1, S.n1, S.m2, S.s2, S.n2);
  const tWrong = Math.abs(S.m1 - S.m2) / Math.sqrt(S.s1 / S.n1 + S.s2 / S.n2);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The tail lengths of 12 mice from a grassland site had a mean of ${S.m1} mm (s = ${S.s1} mm); 12 mice from a woodland site had a mean of ${S.m2} mm (s = ${S.s2} mm). Using ${T_F}, calculate t to three significant figures.`,
    value: tS, sf: 3, wrong: [sfStr(tWrong, 3)],
    explanation: t`1. $\dfrac{s_1^2}{n_1} = \dfrac{${S.s1}^2}{12} = ${dpStr(S.s1 ** 2 / 12, 4)}$ and $\dfrac{s_2^2}{n_2} = \dfrac{${S.s2}^2}{12} = ${dpStr(S.s2 ** 2 / 12, 4)}$.
2. $\sqrt{${dpStr(S.s1 ** 2 / 12 + S.s2 ** 2 / 12, 4)}} = ${dpStr(Math.sqrt(S.s1 ** 2 / 12 + S.s2 ** 2 / 12), 4)}$.
3. $t = \dfrac{${S.m1} - ${S.m2}}{${dpStr(Math.sqrt(S.s1 ** 2 / 12 + S.s2 ** 2 / 12), 4)}} = ${sfStr(tS, 3)}$.
With 22 degrees of freedom the critical value is ${tCrit(22)}, so the difference is ${tS > tCrit(22) ? "significant" : "not significant"}. Forgetting to square s gives ${sfStr(tWrong, 3)}.`,
    hints: ["Square each standard deviation before dividing by n."],
  });
  if (Math.abs(tS - tCrit(22)) < 0.1) throw new Error("t too close to crit");
  // Calculation from raw data
  const hyb = [182, 195, 176, 201, 188, 190];
  const opv = [165, 178, 160, 172, 181, 168];
  const rr = tTest(hyb, opv);
  calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Rudo measured the heights (cm) of six hybrid maize plants (${hyb.join(", ")}) and six open-pollinated plants (${opv.join(", ")}) of the same age. Using ${SD_F} and ${T_F}, calculate t to three significant figures.`,
    value: rr.t, sf: 3,
    explanation: t`1. Means: hybrid $= ${sum(hyb)} \div 6 = ${dpStr(rr.mean1, 2)}$ cm; open-pollinated $= ${sum(opv)} \div 6 = ${dpStr(rr.mean2, 2)}$ cm.
2. Standard deviations (dividing by 5): $s_1 = ${dpStr(rr.s1, 3)}$ cm; $s_2 = ${dpStr(rr.s2, 3)}$ cm.
3. $\dfrac{s_1^2}{6} + \dfrac{s_2^2}{6} = ${dpStr(rr.s1 ** 2 / 6, 3)} + ${dpStr(rr.s2 ** 2 / 6, 3)} = ${dpStr(rr.s1 ** 2 / 6 + rr.s2 ** 2 / 6, 3)}$; square root $= ${dpStr(Math.sqrt(rr.s1 ** 2 / 6 + rr.s2 ** 2 / 6), 3)}$.
4. $t = ${dpStr(rr.mean1 - rr.mean2, 2)} \div ${dpStr(Math.sqrt(rr.s1 ** 2 / 6 + rr.s2 ** 2 / 6), 3)} = ${sfStr(rr.t, 3)}$.
With ${rr.df} degrees of freedom the critical value is ${rr.crit}: the difference is ${rr.significant ? "significant" : "not significant"}.`,
    hints: ["Find both means and both standard deviations first.", "df = 6 + 6 − 2."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A larger difference between the two sample means, with everything else unchanged, gives a larger value of t.",
    answer: true,
    explanation: "True. The difference between the means is the numerator of t.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If t is greater than the critical value, the difference between the means is due to chance.",
    answer: false,
    explanation: "False. t above the critical value means the difference is significant: unlikely to be due to chance; reject the null hypothesis.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each investigation with the most appropriate statistical test.",
    pairs: [
      ["Mean wing length of mosquitoes from two villages", "t-test"],
      ["Numbers of red, roan and white calves against a 1 : 2 : 1 ratio", "Chi-squared test"],
      ["Whether soil pH is linearly related to plant height, data normally distributed", "Pearson's correlation"],
      ["Whether distance from a path is related to the abundance rank of a weed", "Spearman's rank correlation"],
    ],
    explanation: "Two means: t-test; counts against a ratio: χ²; linear relationship with normal data: Pearson; ranked or non-normal data: Spearman.",
    hints: ["Is the question about a difference, a fit to a ratio, or a relationship?"],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "For a t-test on two samples of 9 and 7 values, the degrees of freedom are {{blank:a}}, and the test assumes that the data are {{blank:b}} distributed.",
    blanks: [
      { id: "a", accepted: ["14"], input: "number" },
      { id: "b", accepted: ["normally"], choices: ["normally", "evenly", "randomly"] },
    ],
    explanation: "9 + 7 − 2 = 14; data approximately normally distributed.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the statistical test used to find whether the means of two samples of continuous data differ significantly.",
    accepted: ["t-test", "t test", "ttest", "Student's t-test", "Students t-test", "Student t-test", "unpaired t-test"],
    wrong: ["chi-squared"],
    explanation: "The t-test.",
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain why the t-test is suitable for comparing the masses of hens' eggs from two farms, and why chi-squared would not be.",
    points: [
      "Two samples / two means are being compared",
      "Mass is continuous data, likely normally distributed with similar spread",
      "Chi-squared needs counts in categories compared with expected numbers, which these data are not",
    ],
    modelAnswer: "The investigation compares the means of two samples, and egg mass is a continuous measurement that is likely to be roughly normally distributed with similar spread on both farms, so the t-test fits. Chi-squared compares observed counts in categories with expected counts from a hypothesis, so it cannot be used on masses.",
    explanation: "Match the test to the data type and question.",
    hints: ["What kind of data does each test need?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "In a t-test comparing the lengths of bean seeds from two varieties, t = 4.62 with 20 degrees of freedom (critical value at p = 0.05 is 2.09). Write a full conclusion.",
    points: [
      "4.62 is greater than the critical value of 2.09 (20 df, p = 0.05)",
      "So the difference between the means is significant / unlikely to be due to chance (p < 0.05)",
      "Reject the null hypothesis: the two varieties differ in mean seed length",
    ],
    modelAnswer: "The calculated t of 4.62 is greater than the critical value of 2.09 for 20 degrees of freedom at p = 0.05. The probability that the difference is due to chance is less than 5%, so it is significant. The null hypothesis is rejected: the mean seed lengths of the two varieties are significantly different.",
    explanation: "Compare, state significance, decide on the null hypothesis.",
    hints: ["Three parts: compare, interpret, decide."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A t-test shows that sorghum plants on one farm are significantly taller than on a neighbouring farm. The farmer concludes that his new fertiliser caused the difference. Evaluate this conclusion.",
    points: [
      "The test shows only that the means differ significantly, not what caused the difference",
      "Other variables may differ between farms: soil type, water / rainfall, variety, planting date, pests",
      "A controlled trial on one farm with randomly assigned fertilised and unfertilised plots (with replicates) is needed",
    ],
    modelAnswer: "The t-test only shows that the difference in mean height is unlikely to be due to chance; it says nothing about the cause. The farms may differ in soil, water supply, variety, planting date or pests, any of which could explain the difference. To test the fertiliser, plots on the same farm should be randomly assigned to fertilised and unfertilised treatments, with replicates.",
    explanation: "Significance is not causation.",
    hints: ["List the uncontrolled variables."],
  });

  // Practice structured 1: partly completed t-test on mosquito larvae
  const p1 = [7.2, 6.8, 7.9, 7.5, 6.6, 7.1, 7.7, 7.0];
  const p2 = [6.1, 6.6, 5.8, 6.4, 6.9, 6.0, 6.3, 5.9];
  const R = tTest(p1, p2);
  const m1 = mean(p1);
  const ss1 = sum(p1.map((x) => (x - m1) ** 2));
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Chipo measured the lengths of eight mosquito larvae from each of two breeding pools in the Zambezi valley.\n\n${table(["Pool", "Lengths of larvae / mm"], [["Pool 1", p1.map((x) => x.toFixed(1)).join(", ")], ["Pool 2", p2.map((x) => x.toFixed(1)).join(", ")]])}\n\nFor pool 2, the mean is ${dpStr(R.mean2, 3)} mm and the standard deviation is ${dpStr(R.s2, 3)} mm. The formulae are ${SD_F} and ${T_F}.`,
    parts: [
      P.manual({
        label: "(a)", marks: 1, stem: "State a null hypothesis for this investigation.",
        points: ["There is no significant difference between the mean lengths of larvae in the two pools; any difference is due to chance"],
        modelAnswer: "There is no significant difference between the mean larval lengths in the two pools; any difference is due to chance.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Give two reasons why a t-test is appropriate.",
        points: ["Comparing the means of two (independent) samples", "Length is continuous data, approximately normally distributed / similar standard deviations"],
        modelAnswer: "The means of two independent samples are being compared, and length is continuous data that is likely to be roughly normally distributed with similar spread in both pools.",
      }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the mean length for pool 1, in mm, to three decimal places.", value: m1, dp: 3, unit: "mm", explanation: `${dpStr(sum(p1), 1)} ÷ 8 = ${dpStr(m1, 3)} mm.` }),
      P.num({
        label: "(d)", marks: 2, stem: `Σ(x − x̄)² for pool 1 is ${dpStr(ss1, 3)} mm². Calculate the standard deviation for pool 1, in mm, to three decimal places.`,
        value: R.s1, dp: 3, unit: "mm", wrong: [dpStr(Math.sqrt(ss1 / 8), 3)],
        explanation: t`$s_1 = \sqrt{${dpStr(ss1, 3)} \div 7} = ${dpStr(R.s1, 3)}$ mm.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: "Calculate t, to three significant figures.",
        value: R.t, sf: 3,
        explanation: t`$t = \dfrac{${dpStr(R.mean1, 3)} - ${dpStr(R.mean2, 3)}}{\sqrt{${dpStr(R.s1, 3)}^2/8 + ${dpStr(R.s2, 3)}^2/8}} = ${sfStr(R.t, 3)}$.`,
      }),
      P.num({ label: "(f)", marks: 1, stem: "State the number of degrees of freedom.", value: R.df, wrong: [7, 15], explanation: "8 + 8 − 2 = 14." }),
      P.manual({
        label: "(g)", marks: 2, stem: `The critical value at p = 0.05 is ${R.crit}. State your conclusion.`,
        points: [`t (${sfStr(R.t, 3)}) is greater than ${R.crit}, so the difference is significant / not due to chance`, "Reject the null hypothesis: larvae in pool 1 are significantly longer"],
        modelAnswer: `t = ${sfStr(R.t, 3)} is greater than the critical value of ${R.crit}, so the difference is significant and the null hypothesis is rejected: larvae in pool 1 are significantly longer.`,
      }),
      P.manual({
        label: "(h)", marks: 1, stem: "Suggest one variable that might explain the difference between the pools.",
        points: ["Water temperature, food supply / organic matter, larval age or density, predators, species of mosquito (any one)"],
        modelAnswer: "The larvae in pool 1 may be older, or the water may be warmer or richer in food.",
      }),
    ],
    explanation: "Null hypothesis, justify the test, mean, SD, t, df and conclude.",
    hints: ["Divide by n − 1 for s.", "df = n₁ + n₂ − 2."],
    calculator: true,
  });
  if (!R.significant) throw new Error("expected significant");

  // Practice structured 2: summary data, inhibition zones
  const Z = { m1: 14.3, s1: 1.9, n1: 7, m2: 12.6, s2: 2.2, n2: 7 };
  const tZ = tFrom(Z.m1, Z.s1, Z.n1, Z.m2, Z.s2, Z.n2);
  const cz = tCrit(12);
  if (tZ > cz || Math.abs(tZ - cz) < 0.1) throw new Error("expected clearly non-significant");
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Tatenda tested extracts of two plants for antibacterial activity. Seven paper discs soaked in each extract were placed on agar plates seeded with bacteria, and the diameter of the clear zone around each disc was measured.\n\n${table(["Extract", "Mean diameter / mm", "Standard deviation / mm", "Number of discs"], [["A", Z.m1.toFixed(1), Z.s1.toFixed(1), "7"], ["B", Z.m2.toFixed(1), Z.s2.toFixed(1), "7"]])}\n\nThe formula is ${T_F}.`,
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "State the null hypothesis.", points: ["No significant difference between the mean diameters of the clear zones for extracts A and B"], modelAnswer: "There is no significant difference between the mean zone diameters for extracts A and B; any difference is due to chance." }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate t, to three significant figures.",
        value: tZ, sf: 3,
        explanation: t`$t = \dfrac{${Z.m1} - ${Z.m2}}{\sqrt{${Z.s1}^2/7 + ${Z.s2}^2/7}} = \dfrac{${dpStr(Z.m1 - Z.m2, 1)}}{${dpStr(Math.sqrt(Z.s1 ** 2 / 7 + Z.s2 ** 2 / 7), 3)}} = ${sfStr(tZ, 3)}$.`,
      }),
      P.num({ label: "(c)", marks: 1, stem: "State the degrees of freedom.", value: 12, wrong: [6, 13], explanation: "7 + 7 − 2 = 12." }),
      P.manual({
        label: "(d)", marks: 2, stem: `The critical value at p = 0.05 is ${cz}. What can Tatenda conclude?`,
        points: [`t (${sfStr(tZ, 3)}) is less than ${cz}, so the difference is not significant / due to chance`, "Accept the null hypothesis: no evidence that extract A is more effective"],
        modelAnswer: `t = ${sfStr(tZ, 3)} is less than ${cz}, so the difference is not significant and is likely to be due to chance. The null hypothesis is accepted: there is no evidence that extract A is more effective than B.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest two changes that would make the comparison more reliable.",
        points: ["Use more discs / replicate plates (larger n reduces the standard errors)", "Standardise extract concentration, disc size, volume absorbed, incubation time and temperature / use the same bacterial lawn density"],
        modelAnswer: "Use more discs on more plates, so the standard errors are smaller. Make sure the extracts are at the same concentration and that disc size, volume absorbed, incubation temperature and time and the density of bacteria are kept the same.",
      }),
    ],
    explanation: "A non-significant t: accept the null hypothesis and suggest ways to reduce variability or increase n.",
    hints: ["Square each standard deviation and divide by 7."],
    calculator: true,
  });

  b.card("FORMULA", "t-test formula", "t = |x̄₁ − x̄₂| ÷ √(s₁²/n₁ + s₂²/n₂).");
  b.card("FORMULA", "Degrees of freedom for a t-test (two samples)", "n₁ + n₂ − 2.");
  b.card("CONCEPT", "When to use a t-test", "Comparing the means of two samples of continuous, roughly normally distributed data with similar standard deviations.");
  b.card("DEFINITION", "Null hypothesis for a t-test", "No significant difference between the two means; any difference is due to chance.");
  b.card("CONCEPT", "t greater than the critical value at p = 0.05", "Difference is significant (less than 5% probability of being due to chance); reject the null hypothesis.");
  b.card("CONCEPT", "What makes t large", "A big difference between means, small standard deviations and large samples.");
  b.card("FACT", "Critical value of t at p = 0.05, 14 degrees of freedom", "2.14 (and 2.10 for 18 degrees of freedom).");
  b.card("CONCEPT", "Limitation of a significant t-test", "It shows the means differ, not what caused the difference.");
});
