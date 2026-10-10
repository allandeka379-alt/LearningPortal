// W3b: the chi-squared test in genetics (both boards; Cambridge A Level only).
import { concept, P, t, chk, table, chiSquared, expectedFromRatio, dpStr, sfStr } from "../lib.mjs";

const FORMULA = t`$\chi^2 = \sum \dfrac{(O - E)^2}{E}$`;

concept("abio.inheritance.chi-squared", { file: "inheritance/chi-squared", keyPrefix: "inheritance.chi-squared" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a chi-squared test on a genetic cross, how are the degrees of freedom calculated?",
    options: [
      ["Number of phenotype classes minus one", "Correct."],
      ["Number of phenotype classes", "This is one too many."],
      ["Total number of offspring minus one", "That is used for other tests, not χ² on classes."],
      ["Number of parents in the cross", "Unrelated to degrees of freedom."],
    ],
    answer: "A",
    explanation: "Degrees of freedom = classes − 1.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the correct null hypothesis for a chi-squared test on a cross expected to give a 3 : 1 ratio?",
    options: [
      ["There is no significant difference between the observed and expected 3 : 1 numbers", "Correct."],
      ["There is a significant difference between the observed and expected 3 : 1 numbers", "This is the alternative hypothesis."],
      ["The observed numbers will be exactly in a 3 : 1 ratio", "A null hypothesis allows for chance differences."],
      ["The dominant allele is passed on to offspring more often than the recessive allele", "This is not a null hypothesis."],
    ],
    answer: "A",
    explanation: "The null hypothesis states no significant difference; any difference is due to chance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A chi-squared value is smaller than the critical value at p = 0.05. What should be concluded?",
    options: [
      ["The difference is not significant; accept the null hypothesis", "Correct."],
      ["The difference is significant; reject the null hypothesis", "That applies when χ² exceeds the critical value."],
      ["The hypothesis has been proved to be true", "A statistical test never proves a hypothesis."],
      ["The experiment must be repeated using more phenotype classes", "No need: the result is clear."],
    ],
    answer: "A",
    explanation: "Below the critical value: not significant, due to chance, accept the null hypothesis.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the critical value of χ² at p = 0.05 for 3 degrees of freedom?",
    options: [
      ["7.81", "Correct."],
      ["3.84", "This is for 1 degree of freedom."],
      ["5.99", "This is for 2 degrees of freedom."],
      ["11.34", "This is for 3 degrees of freedom at p = 0.01."],
    ],
    answer: "A",
    explanation: "df = 3, p = 0.05: **7.81**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why should the chi-squared test be carried out on numbers of individuals rather than percentages?",
    options: [
      ["The size of χ² depends on the actual sample size", "Correct: percentages hide the sample size."],
      ["Percentages cannot be squared in the calculation", "They can be squared; the test would just be invalid."],
      ["Percentages always add up to more than the total", "Percentages add to 100."],
      ["The critical values are only printed for whole numbers", "Critical values depend on df, not on the data format."],
    ],
    answer: "A",
    explanation: "The same proportions are more convincing in a bigger sample; χ² must use counts to reflect this.",
    hints: ["Would 3 : 1 from 4 offspring be as convincing as from 400?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A dihybrid test cross is expected to give 1 : 1 : 1 : 1. The χ² value is 24.6 (critical value 7.81). Which is the most likely biological explanation?",
    options: [
      ["The genes are linked on the same chromosome", "Correct: a significant departure from 1 : 1 : 1 : 1 in a test cross."],
      ["The difference between the classes is just due to chance", "χ² is far above the critical value, so chance is unlikely."],
      ["Too few degrees of freedom were used in the test", "df = 3 is correct for four classes."],
      ["The two genes show codominance at both loci", "Codominance would not change a test-cross ratio this way."],
    ],
    answer: "A",
    explanation: "A significant difference in a dihybrid test cross commonly indicates linkage.",
    hints: ["Compare χ² with the critical value first."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two crosses gave the same percentages of each phenotype, but cross X had 80 offspring and cross Y had 800. How would their χ² values compare?",
    options: [
      ["The χ² for Y would be ten times the χ² for X", "Correct: each (O − E)²/E term scales with sample size."],
      ["The χ² values would be the same", "χ² depends on the numbers, not just the proportions."],
      ["The χ² for X would be ten times the χ² for Y", "The larger sample gives the larger χ²."],
      ["The χ² for Y would be one hundred times that for X", "(O − E)² rises 100-fold but E rises 10-fold."],
    ],
    answer: "A",
    explanation: "Multiplying all numbers by 10 multiplies (O − E)² by 100 and E by 10, so each term and χ² rise tenfold.",
    hints: ["Scale O and E by 10 and see what happens to each term."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What does a probability of p = 0.05 mean in a chi-squared test?",
    options: [
      ["A 5% probability that a difference this large arises by chance", "Correct."],
      ["The results are 5% different from the expected numbers", "p is a probability, not a percentage difference."],
      ["There is a 95% chance that the null hypothesis is false", "This is a common misreading."],
      ["Five per cent of the offspring were counted incorrectly", "p has nothing to do with counting errors."],
    ],
    answer: "A",
    explanation: "p = 0.05: a 5% (1 in 20) probability that a deviation at least this large would occur by chance alone.",
    hints: ["p stands for probability."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A larger value of χ² means a larger difference between observed and expected results.",
    answer: true,
    explanation: "True. Larger deviations give larger (O − E)² terms.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If χ² is less than the critical value, the null hypothesis is rejected.",
    answer: false,
    explanation: "False. Below the critical value, the difference is not significant and the null hypothesis is accepted.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each number of phenotype classes with the critical value of χ² at p = 0.05.",
    pairs: [
      ["Two classes", "3.84"],
      ["Three classes", "5.99"],
      ["Four classes", "7.81"],
      ["Five classes", "9.49"],
    ],
    explanation: "df = classes − 1: 1 → 3.84, 2 → 5.99, 3 → 7.81, 4 → 9.49.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "If the calculated χ² is greater than the critical value, the difference is {{blank:a}} and the null hypothesis is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["significant"], choices: ["significant", "not significant"] },
      { id: "b", accepted: ["rejected"], choices: ["rejected", "accepted"] },
    ],
    explanation: "Above the critical value: significant; reject the null hypothesis.",
  });

  // Numerical: degrees of freedom
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A cross involving codominance and complete dominance produces six phenotype classes. How many degrees of freedom are used in the chi-squared test?",
    value: 5, wrong: [6, 4],
    explanation: "df = 6 − 1 = **5**.",
  });
  // Calculation: two-class chi-squared
  const obs1 = [148, 32];
  const exp1 = expectedFromRatio(180, [3, 1]);
  const r1 = chiSquared(obs1, exp1);
  chk(exp1[0], 135);
  calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Two heterozygous plants were crossed. Of 180 offspring, ${obs1[0]} had red flowers and ${obs1[1]} had white flowers; a 3 : 1 ratio was expected. Using ${FORMULA}, calculate χ². Give your answer to three significant figures.`,
    value: r1.chi2, sf: 3, wrong: [Number(sfStr(r1.rows.reduce((s, x) => s + x.diff2 / x.o, 0), 3))],
    explanation: t`1. Expected: red $= 180 \times \frac{3}{4} = ${exp1[0]}$; white $= 180 \times \frac{1}{4} = ${exp1[1]}$.
2. Red: $\dfrac{(${obs1[0]} - ${exp1[0]})^2}{${exp1[0]}} = \dfrac{${r1.rows[0].diff2}}{${exp1[0]}} = ${dpStr(r1.rows[0].term, 3)}$.
3. White: $\dfrac{(${obs1[1]} - ${exp1[1]})^2}{${exp1[1]}} = \dfrac{${r1.rows[1].diff2}}{${exp1[1]}} = ${dpStr(r1.rows[1].term, 3)}$.
4. $\chi^2 = ${dpStr(r1.rows[0].term, 3)} + ${dpStr(r1.rows[1].term, 3)} = ${sfStr(r1.chi2, 3)}$.
With 1 degree of freedom the critical value is ${r1.crit}, so the difference is ${r1.significant ? "significant" : "not significant"}. Dividing by O instead of E gives a different, wrong value.`,
    hints: ["Find the expected numbers first.", "Divide each (O − E)² by E, not O."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline the steps used to carry out a chi-squared test on the results of a genetic cross.",
    points: [
      "State the null hypothesis: no significant difference between observed and expected; differences due to chance",
      "Calculate expected numbers from the total and the predicted ratio",
      "Calculate Σ(O − E)²/E and find degrees of freedom = classes − 1",
      "Compare χ² with the critical value at p = 0.05: below, accept the null hypothesis; above, reject it",
    ],
    modelAnswer: "State the null hypothesis that there is no significant difference between observed and expected numbers. Use the total and the predicted ratio to calculate the expected numbers. For each class calculate (O − E)²/E and add them to give χ², and find the degrees of freedom as the number of classes minus one. Compare χ² with the critical value at p = 0.05: if smaller, the difference is not significant and the null hypothesis is accepted; if larger, it is rejected.",
    explanation: "Null hypothesis, expected, χ², df, compare and conclude.",
    hints: ["Four stages."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student found that the χ² value for a monohybrid cross was below the critical value and wrote: 'This proves that the plants were heterozygous.' Evaluate this statement.",
    points: [
      "The test does not prove a hypothesis; it only shows the results are consistent with the expected ratio",
      "The difference is not significant / is likely to be due to chance at p = 0.05",
      "There is still a (5%) possibility of error / another hypothesis might also fit the data",
    ],
    modelAnswer: "The statement is too strong. A χ² below the critical value shows the difference from the expected ratio is not significant and is probably due to chance, so the results are consistent with the parents being heterozygous. It does not prove it: another hypothesis might fit the data too, and decisions at p = 0.05 carry a risk of error.",
    explanation: "Consistent with, not proof of.",
    hints: ["What does 'accept the null hypothesis' actually mean?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest three biological reasons why the results of a dihybrid cross might differ significantly from 9 : 3 : 3 : 1.",
    points: [
      "Linkage of the two genes on the same chromosome",
      "Epistasis / interaction between the genes",
      "One genotype has lower survival / is lethal, or the sample was not random",
    ],
    modelAnswer: "The genes might be linked on the same chromosome; one gene might be epistatic to the other; or some genotypes might survive less well (or be lethal), so fewer of them are counted.",
    explanation: "Linkage, epistasis, differential survival.",
    hints: ["Think about the assumptions behind 9 : 3 : 3 : 1."],
  });

  // Practice structured: full test on a 1:2:1 cross
  const cls = ["Red", "Roan", "White"];
  const obs = [54, 123, 63];
  const exp = expectedFromRatio(240, [1, 2, 1]);
  const r = chiSquared(obs, exp);
  chk(exp[1], 120);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Roan cattle ($C^R C^W$) were crossed with each other on a farm near Gweru. The calves were: ${obs.map((o, i) => `${cls[i].toLowerCase()} ${o}`).join(", ")} (total 240). A 1 : 2 : 1 ratio is expected. The formula is ${FORMULA}.`,
    parts: [
      P.manual({
        label: "(a)", marks: 1, stem: "State a suitable null hypothesis.",
        points: ["No significant difference between the observed numbers and those expected from a 1 : 2 : 1 ratio; differences due to chance"],
        modelAnswer: "There is no significant difference between the observed numbers and the 1 : 2 : 1 expected numbers; any difference is due to chance.",
      }),
      P.group({
        label: "(b)", stem: "Calculate the expected numbers.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Expected number of red calves.", value: exp[0], wrong: [80], explanation: `240 × 1/4 = ${exp[0]}.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Expected number of roan calves.", value: exp[1], wrong: [80], explanation: `240 × 2/4 = ${exp[1]}.` }),
        ],
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate χ². Give your answer to three significant figures.",
        value: r.chi2, sf: 3,
        explanation: t`$\dfrac{(${obs[0]}-60)^2}{60} + \dfrac{(${obs[1]}-120)^2}{120} + \dfrac{(${obs[2]}-60)^2}{60} = ${dpStr(r.rows[0].term, 3)} + ${dpStr(r.rows[1].term, 3)} + ${dpStr(r.rows[2].term, 3)} = ${sfStr(r.chi2, 3)}$.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: "State the number of degrees of freedom.",
        value: r.df, wrong: [3],
        explanation: "3 classes − 1 = 2.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: `The critical value at p = 0.05 is ${r.crit}. What can you conclude?`,
        points: [
          `χ² (${sfStr(r.chi2, 3)}) is less than ${r.crit}, so the difference is not significant / due to chance`,
          "Accept the null hypothesis: results fit 1 : 2 : 1 (codominance)",
        ],
        modelAnswer: `χ² = ${sfStr(r.chi2, 3)} is less than the critical value of ${r.crit}, so the difference between observed and expected is not significant and is due to chance. The null hypothesis is accepted: the results fit a 1 : 2 : 1 ratio.`,
      }),
    ],
    explanation: "Expected, χ², df, compare and conclude.",
    hints: ["Expected numbers: 240 × 1/4, 2/4, 1/4."],
    calculator: true,
  });
  if (r.significant) throw new Error("expected non-significant");

  const cls2 = ["Purple, spiny", "Purple, smooth", "White, spiny", "White, smooth"];
  const obs2 = [92, 18, 21, 69];
  const exp2 = expectedFromRatio(200, [1, 1, 1, 1]);
  const r2 = chiSquared(obs2, exp2);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `In a plant, purple fruit (P) is dominant to white (p) and spiny fruit (S) is dominant to smooth (s). A plant heterozygous for both genes, from a cross of pure-breeding purple spiny × white smooth, was test-crossed with a white smooth plant.\n\n${table(["Offspring", "Number"], cls2.map((c, i) => [c, String(obs2[i])]))}\n\nThe formula is ${FORMULA}.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the expected number in each class if the genes are unlinked.",
        value: exp2[0], wrong: [exp2[0] / 4],
        explanation: "200 ÷ 4 = 50 in each class.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate χ². Give your answer to three significant figures.",
        value: r2.chi2, sf: 3,
        explanation: t`Terms: ${r2.rows.map((x) => dpStr(x.term, 2)).join(" + ")} $= ${sfStr(r2.chi2, 3)}$.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: `With 3 degrees of freedom, the critical value at p = 0.05 is ${r2.crit}. State and explain your conclusion.`,
        points: [
          `χ² (${sfStr(r2.chi2, 3)}) is greater than ${r2.crit}, so the difference is significant / not due to chance`,
          "Reject the null hypothesis: the results do not fit 1 : 1 : 1 : 1",
        ],
        modelAnswer: `χ² = ${sfStr(r2.chi2, 3)} is much greater than ${r2.crit}, so the difference is significant and not due to chance alone. The null hypothesis is rejected.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest an explanation for the results.",
        points: [
          "The genes are linked (on the same chromosome)",
          "Parental combinations purple spiny and white smooth are the large classes (92 and 69)",
          "Recombinants (purple smooth, white spiny: 18 and 21) produced by crossing over are fewer",
        ],
        modelAnswer: "The genes are probably linked. The large classes, purple spiny (92) and white smooth (69), have the parental combinations of alleles, which are inherited together. The small classes, purple smooth (18) and white spiny (21), are recombinants formed by crossing over between the loci.",
      }),
    ],
    explanation: "A significant χ² in a test cross, explained by linkage.",
    hints: ["Which classes are largest?"],
    calculator: true,
  });
  if (!r2.significant) throw new Error("expected significant");

  b.card("FORMULA", "Chi-squared formula", "χ² = Σ (O − E)² / E.");
  b.card("DEFINITION", "Null hypothesis for a genetic cross", "No significant difference between observed and expected numbers; any difference is due to chance.");
  b.card("FORMULA", "Degrees of freedom for χ² on one row", "Number of classes − 1.");
  b.card("FACT", "Critical values of χ² at p = 0.05", "1 df: 3.84; 2 df: 5.99; 3 df: 7.81; 4 df: 9.49.");
  b.card("CONCEPT", "χ² below the critical value", "Not significant; due to chance; accept the null hypothesis.");
  b.card("CONCEPT", "χ² above the critical value", "Significant; not due to chance alone; reject the null hypothesis.");
  b.card("CONCEPT", "Conditions for using χ²", "Counts (not percentages) in categories; expected values from a hypothesis; each expected value at least 5.");
  b.card("CONCEPT", "Possible reasons for a significant result in a cross", "Linkage, epistasis, lethal genotypes or differential survival, non-random sample.");
});
