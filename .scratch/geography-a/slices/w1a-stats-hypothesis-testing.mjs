// W1a: stats.hypothesis-testing (chi-squared). All data illustrative; every value computed with the lib helpers.
import { concept, P, t, chk, table, chiSquared, chiSquaredTable, chiCrit, expectedFromRatio, dpStr, geographyLevels } from "../lib.mjs";

const OBS4 = [35, 52, 41, 72]; // pedestrian crossings at four points, expected equal
const g4 = chiSquared(OBS4, [50, 50, 50, 50]);
chk(g4.chi2, 15.88, 1e-9);

const PH = [[28, 40, 22], [32, 10, 18]]; // owns a phone (yes/no) by age group
const ph = chiSquaredTable(PH);
chk(ph.expected[0][0], 36, 1e-9);

const EL = [[45, 30], [23, 62]]; // electricity by ward
const el = chiSquaredTable(EL);

const VIEW = [62, 58, 30];
const viewE = expectedFromRatio(150, [2, 2, 1]);
const vg = chiSquared(VIEW, viewE);

concept("ageo.stats.hypothesis-testing", { file: "stats/hypothesis-testing", keyPrefix: "stats.hypothesis-testing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a null hypothesis state?",
    options: [
      ["There is no difference or relationship; any pattern is due to chance", "Correct: the null hypothesis is the 'no effect' statement that is tested."],
      ["There is a strong relationship between the two variables being tested", "That describes an alternative hypothesis."],
      ["The sample is large enough for the test to be reliable in practice", "A null hypothesis is about the data, not about the sample size."],
      ["The results will agree with the investigator's original prediction", "The null hypothesis is the opposite of a prediction of an effect."],
    ],
    answer: "A",
    explanation: "H₀ says there is no real difference or relationship. It is rejected only when the test statistic shows the pattern is unlikely to be chance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A student has counts of households in three categories of housing and wants to test whether they are evenly spread. Which test is suitable?",
    options: [
      ["Chi-squared", "Correct: chi-squared compares observed counts in categories with expected counts."],
      ["Spearman's rank correlation", "Spearman tests the relationship between two ranked variables."],
      ["Standard deviation", "This is a measure of spread, not a test."],
      ["Nearest neighbour analysis", "This tests the pattern of points on a map."],
    ],
    answer: "A",
    explanation: "Counts in categories compared with an expected pattern call for a **chi-squared goodness-of-fit test**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A contingency table has 2 rows and 4 columns. How many degrees of freedom does the chi-squared test have?",
    options: [
      ["3", "Correct: (2 − 1) × (4 − 1) = 3."],
      ["8", "This is the number of cells, not the degrees of freedom."],
      ["6", "This is 2 × 4 − 2; the formula is (r − 1)(c − 1)."],
      ["5", "This is r + c − 1, which is not the formula."],
    ],
    answer: "A",
    explanation: "df = (rows − 1) × (columns − 1) = 1 × 3 = 3.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a test of whether rainfall type is linked to crop choice, a student finds χ² = 11.2. The critical value at the 0.05 level for 3 degrees of freedom is 7.81. What is the correct decision?",
    options: [
      ["Reject the null hypothesis: the association is significant", "Correct: 11.2 is greater than 7.81."],
      ["Accept the null hypothesis: the result is not statistically significant", "The calculated value exceeds the critical value, so the null hypothesis is rejected."],
      ["Reject the null hypothesis, because 11.2 is much more than 5", "The comparison is with the critical value, not with 5."],
      ["Accept the alternative hypothesis as proved beyond doubt", "A test shows significance at a stated level; it does not prove anything beyond doubt."],
    ],
    answer: "A",
    explanation: "When χ² is greater than the critical value the null hypothesis is rejected at the 0.05 level.",
    hints: ["Which two numbers do you compare?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "One expected value in a chi-squared table is 3.2. What should the investigator do?",
    options: [
      ["Merge categories or collect more data first", "Correct: expected values below 5 make the test unreliable."],
      ["Round it up to 5 and then continue with the test", "Changing an expected value to suit the rule invalidates the calculation."],
      ["Use percentages instead of counts in the calculation", "The test needs counts, not percentages."],
      ["Ignore the rule because the overall total is large", "The rule applies to each expected value, whatever the total."],
    ],
    answer: "A",
    explanation: "Every expected value should be at least 5. Merging categories or enlarging the sample fixes the problem.",
    hints: ["The rule applies to each cell, not to the total."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student investigates whether the choice of firewood or gas for cooking is linked to whether the household is rural or urban. Which is the correct null hypothesis?",
    options: [
      ["There is no association between household type and fuel", "Correct: the null hypothesis states no association."],
      ["Urban households use gas more often than rural households do", "This is a directional alternative hypothesis."],
      ["Rural and urban households use different fuels", "This claims a difference, so it is an alternative hypothesis."],
      ["Fuel choice causes the type of household", "This reverses the logic; the test cannot show cause."],
    ],
    answer: "A",
    explanation: "H₀: no association between household type and fuel used. H₁: there is an association.",
    hints: ["The null hypothesis never claims an effect."],
  });

  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A planner expects the 240 households in a ward to use three types of fuel (wood, charcoal and gas) in the ratio 3 : 2 : 1. How many households are expected to use wood?",
    value: expectedFromRatio(240, [3, 2, 1])[0], unit: "units",
    wrong: [80, 40],
    explanation: "Total parts = 3 + 2 + 1 = 6; one part = 240 ÷ 6 = 40; wood = 3 × 40 = 120 households. Giving 80 is the expected number for charcoal.",
    hints: ["Add the ratio parts first."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The number of pedestrians crossing a road at four points in a town was counted in one morning: ${OBS4.join(", ")} (total 200). If crossings were evenly spread, the expected count at each point would be 50. Calculate $\chi^2$, to two decimal places.`,
    value: g4.chi2, dp: 2,
    wrong: [794, 3.97],
    explanation: t`1. Differences O − E: ${OBS4.map((o) => o - 50).join(", ")}.\n2. Squared: ${OBS4.map((o) => (o - 50) ** 2).join(", ")}.\n3. Divide each by 50 and add: ${g4.rows.map((r) => dpStr(r.term, 2)).join(" + ")} = ${dpStr(g4.chi2, 2)}.\n4. Forgetting to divide by E gives 794.`,
    hints: ["Calculate (O − E)² ÷ E for each point.", "Add the four terms."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: t`A survey asked 150 people in three age groups whether they own a mobile phone.\n\n${table(["", "Age 15-29", "Age 30-49", "Age 50+", "Total"], [["Owns a phone", ...PH[0], ph.rowT[0]], ["Does not own", ...PH[1], ph.rowT[1]], ["Total", ...ph.colT, ph.total]])}\n\nCalculate the expected number of people aged 15-29 who own a phone if age made no difference.`,
    value: ph.expected[0][0],
    wrong: [28, 40],
    explanation: "Expected = row total × column total ÷ grand total = 90 × 60 ÷ 150 = 36. The observed value is 28.",
    hints: ["Use the row total for 'Owns a phone' and the column total for 'Age 15-29'."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A contingency table has 4 rows and 3 columns. How many degrees of freedom does the chi-squared test have?",
    value: 6,
    wrong: [12, 5],
    explanation: "df = (4 − 1) × (3 − 1) = 3 × 2 = 6.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Chi-squared can be calculated from percentages as well as counts.",
    answer: false,
    explanation: "False. The test needs the actual counts; percentages change the value of χ² and invalidate the test.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by testing a hypothesis at the 0.05 (5%) significance level.",
    points: ["The null hypothesis is rejected only if the result would occur by chance in fewer than 5 in 100 samples", "So there is a 5% (1 in 20) risk of rejecting a null hypothesis that is actually true", "The level is a convention that balances this risk against the risk of missing a real effect"],
    modelAnswer: "The null hypothesis is rejected only if a result as extreme as the one found would occur by chance in fewer than 5 samples in 100. There is therefore a 5% risk of rejecting a null hypothesis that is actually true. The level is a convention that balances this risk against the risk of missing a real effect.",
    explanation: "State the rule, the risk and why 0.05 is used.",
    hints: ["What is the chance of wrongly rejecting a true null hypothesis?"],
  });

  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Null hypothesis", "States that there is no difference or relationship"],
      ["Alternative hypothesis", "States that a real difference or relationship exists"],
      ["Critical value", "The test-statistic value that separates chance from significance"],
      ["Degrees of freedom", "Number of values free to vary once totals are fixed"],
      ["Expected value", "The count predicted if the null hypothesis were true"],
    ],
    explanation: "These are the core terms in any hypothesis test.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the decision rule for a chi-squared test.",
    template: "If the calculated χ² is {{blank:a}} the critical value, the null hypothesis is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["greater than"], choices: ["greater than", "less than"] },
      { id: "b", accepted: ["rejected"], choices: ["rejected", "not rejected"] },
    ],
    explanation: "A calculated value above the critical value is significant, so H₀ is rejected.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which value, found in statistical tables using the significance level and degrees of freedom, is compared with the calculated χ²?",
    accepted: ["critical value", "the critical value"],
    wrong: ["expected value", "mean"],
    explanation: "The **critical value** is compared with the calculated test statistic.",
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "A student wants to test whether the type of shop in a town (food, clothing, services) is linked to location (inside or outside the CBD). State the null hypothesis and the alternative hypothesis.",
    points: ["H₀: there is no association between shop type and location (inside or outside the CBD)", "H₁: there is an association between shop type and location"],
    modelAnswer: "H₀: there is no association between the type of shop and its location inside or outside the CBD. H₁: there is an association between the type of shop and its location.",
    explanation: "Name both variables in each hypothesis and keep H₀ as 'no association'.",
    hints: ["Both variables must appear in each hypothesis."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the chi-squared test requires every expected value to be at least 5.",
    points: ["Small expected values make the (O − E)² ÷ E terms very large / unstable", "So χ² is inflated and the test gives too many false significant results", "The test is unreliable; categories should be combined or more data collected"],
    modelAnswer: "When an expected value is small, dividing by it makes the term (O − E)² ÷ E large, so χ² is inflated and the test often shows a significant result that is not real. The test is therefore unreliable, so categories should be combined or more data collected.",
    explanation: "Link small E to inflated χ² and unreliable decisions.",
    hints: ["What happens when you divide by a very small number?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A chi-squared test of land use against distance from a road is significant at the 0.05 level. Explain two limitations of concluding that the road caused the pattern.",
    points: ["Chi-squared shows association, not cause", "Another factor (such as soil quality or slope, which also relates to where roads are built) may explain both", "Significance at 0.05 leaves a 5% chance that the pattern is due to chance", "Results depend on the sample being representative / unbiased and on the size of the sample"],
    modelAnswer: "The test shows an association but not cause; a third factor such as flat, fertile land may explain both the road's position and the land use. Also, significance at the 0.05 level still leaves a 5% chance that the pattern arose by chance, and the result depends on the sample being large and unbiased.",
    explanation: "Any two valid limitations, each explained, for 2 marks each.",
    hints: ["Does association prove cause?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A student asks whether access to electricity is linked to the ward in which a household lives. A survey of 160 households in two wards produced these results (illustrative data).\n\n${table(["", "Ward P", "Ward Q", "Total"], [["Has electricity", EL[0][0], EL[0][1], el.rowT[0]], ["No electricity", EL[1][0], EL[1][1], el.rowT[1]], ["Total", el.colT[0], el.colT[1], el.total]])}\n\nThe critical value of χ² at the 0.05 level for 1 degree of freedom is ${el.crit}.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the null hypothesis and the alternative hypothesis.", points: ["H₀: there is no association between ward and access to electricity", "H₁: there is an association between ward and access to electricity"], modelAnswer: "H₀: there is no association between ward and access to electricity. H₁: there is an association." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the expected number of households in Ward P with electricity.", value: el.expected[0][0], dp: 1, wrong: [EL[0][0]], explanation: `${el.rowT[0]} × ${el.colT[0]} ÷ ${el.total} = ${dpStr(el.expected[0][0], 3)}.` }),
      P.num({ label: "(c)", marks: 3, type: "CALCULATION", stem: "Calculate χ² to two decimal places.", value: el.chi2, dp: 2, wrong: [4.83], explanation: t`The expected values are ${el.expected.flat().map((e) => dpStr(e, 3)).join(", ")}. Each (O − E)² is ${dpStr((EL[0][0] - el.expected[0][0]) ** 2, 2)}, so the terms are ${el.cells.map((x) => dpStr(x.term, 2)).join(", ")}; the total is ${dpStr(el.chi2, 2)}.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "What decision should be made about the null hypothesis?", options: [["Reject it, because the calculated value is greater than the critical value", "Correct."], ["Accept it, because the calculated value is greater than the critical value", "A value above the critical value leads to rejection."], ["Reject it, because the calculated value is less than the critical value", "A value below would lead to non-rejection."], ["Accept it, because the sample is larger than 100", "Sample size alone does not decide the outcome."]], answer: "A", explanation: `${dpStr(el.chi2, 2)} is greater than ${el.crit}, so H₀ is rejected.` }),
      P.manual({ label: "(e)", marks: 3, stem: "State the conclusion in geographical terms and suggest one reason for the difference.", points: ["There is a significant association between ward and access to electricity at the 0.05 level", "Ward P has more households with electricity than expected (and Ward Q fewer)", "Suggested reason: Ward P is closer to the grid / better planned / more developed, or Ward Q is newer or more remote"], modelAnswer: "There is a significant association between ward and electricity access at the 0.05 level: Ward P has more households with electricity than expected and Ward Q fewer. This could be because Ward P is closer to the grid or older and better serviced, while Ward Q is newer or more remote." }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest two ways to improve the reliability of the survey.", points: ["Larger sample / more households surveyed", "Random or stratified sampling to avoid bias / survey in more wards or at different times"], modelAnswer: "Survey a larger number of households, and use random or stratified sampling so that every part of each ward is represented." }),
    ],
    explanation: "Hypotheses, expected values, the χ² total, the decision and the conclusion in words are the full marking pattern.",
    hints: ["Expected = row total × column total ÷ grand total.", "Check the decision rule."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`A tourism officer expects visitors to a falls to use three viewpoints in the ratio 2 : 2 : 1. A count of 150 visitors gave the observed numbers ${VIEW.join(", ")} for viewpoints 1, 2 and 3 (illustrative data). The critical value of χ² at the 5% level for 2 degrees of freedom is ${vg.crit}.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the expected number of visitors at viewpoint 1.", value: viewE[0], wrong: [50, 70], explanation: "150 × 2 ÷ 5 = 60." }),
      P.num({ label: "(b)", marks: 3, type: "CALCULATION", stem: "Calculate χ² to two decimal places.", value: vg.chi2, dp: 2, wrong: [3.2], explanation: t`Expected values: ${viewE.join(", ")}. Terms: ${vg.rows.map((r) => dpStr(r.term, 3)).join(" + ")} = ${dpStr(vg.chi2, 2)}.` }),
      P.num({ label: "(c)", marks: 1, stem: "State the number of degrees of freedom.", value: 2, wrong: [3], explanation: "3 categories − 1 = 2." }),
      P.manual({ label: "(d)", marks: 2, stem: "State and justify the decision about the null hypothesis that the visitors follow the 2 : 2 : 1 pattern.", points: ["Do not reject H₀ / accept H₀", `Because the calculated χ² (${dpStr(vg.chi2, 2)}) is less than the critical value (${vg.crit})`], modelAnswer: `Do not reject H₀, because χ² (${dpStr(vg.chi2, 2)}) is less than the critical value (${vg.crit}): the visitors' choices are consistent with the 2 : 2 : 1 pattern.` }),
      P.manual({ label: "(e)", marks: 1, stem: "State one reason why this does not prove that the officer's ratio is correct.", points: ["Not rejecting H₀ only means there is insufficient evidence against it / a larger or different sample might give a different result"], modelAnswer: "Failing to reject H₀ means there is not enough evidence against the ratio; a larger sample might give a different result." }),
    ],
    explanation: "Expected values from a ratio, χ² from the terms, df = categories − 1 and a decision against the printed critical value.",
    hints: ["Divide 150 in the ratio 2 : 2 : 1.", "Use (O − E)² ÷ E for each viewpoint."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the use of the chi-squared test in a geographical enquiry into whether land use differs between two settlements. [8]",
    points: [
      "Suitable for count (categorical) data, such as numbers of buildings by land-use category",
      "Simple to calculate with clear steps and a decision rule at 0.05",
      "Tests whether the difference is likely to be chance, which a bar chart cannot show",
      "Needs expected values of at least 5, which may force categories to be merged and detail to be lost",
      "Needs independent observations and counts, not percentages",
      "Shows association/difference but not its strength, direction or cause",
      "Result depends on the sampling method and sample size / bias in the sample",
      "Judgement: useful and appropriate for categorical counts if conditions are met, but should be supported by maps, the cell-by-cell terms and fieldwork evidence",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The chi-squared test suits count data in categories, such as the number of buildings in each land-use class in two settlements, and its steps and decision rule are simple. It also tells the investigator whether a difference is likely to be due to chance, which a bar chart alone cannot do. However, it needs expected values of at least 5, so categories may have to be merged and detail lost; it needs counts rather than percentages and independent observations. It shows that a difference exists but not its strength or cause, and it depends on a representative sample. Overall it is a useful test where conditions are met, but it should be supported by the largest cell terms, maps and fieldwork evidence to explain why the land use differs.",
    wordLimit: { max: 300 },
    explanation: "Strengths, limitations and an overall judgement.",
    hints: ["Think about what kind of data the test needs and what it cannot tell you."],
  });

  b.card("FORMULA", "Chi-squared formula?", t`$\chi^2 = \sum \dfrac{(O - E)^2}{E}$`, "O = observed count, E = expected count.");
  b.card("DEFINITION", "Null hypothesis (H₀)?", "No difference or relationship; any pattern is due to chance.");
  b.card("FORMULA", "Expected value in a contingency table?", "Row total × column total ÷ grand total.");
  b.card("FORMULA", "Degrees of freedom for chi-squared?", "One row: categories − 1. Contingency table: (rows − 1) × (columns − 1).");
  b.card("CONCEPT", "Decision rule for chi-squared?", "If calculated χ² is greater than the critical value, reject H₀; otherwise do not reject.");
  b.card("FACT", "Usual significance level in geography?", "0.05 (5%): a 1 in 20 risk of wrongly rejecting a true null hypothesis.");
  b.card("FACT", "Rule about expected values?", "Every expected value must be at least 5; otherwise combine categories or collect more data.");
  b.card("CONCEPT", "Which data does chi-squared need?", "Counts (frequencies) in categories, not percentages or measurements.");
  b.card("FACT", "Critical value of χ² at 0.05 for 1, 2, 3 and 4 degrees of freedom?", `${chiCrit(1)}, ${chiCrit(2)}, ${chiCrit(3)} and ${chiCrit(4)}.`);
});
