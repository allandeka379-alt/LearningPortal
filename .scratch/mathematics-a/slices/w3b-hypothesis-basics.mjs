// W3b: amaths.inference.hypothesis-basics (ZIMSEC Statistics F5 6.8.1; Cambridge P6 6.5)
import { concept, P, t, chk, sfStr, binom, normalProb, Phi } from "../lib.mjs";

const { sqrt } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const ge = (n, p, k) => 1 - binom.cdf(n, p, k - 1);

concept("amaths.inference.hypothesis-basics", { file: "inference/hypothesis-basics", keyPrefix: "inference.hypothesis-basics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In a hypothesis test, what is the null hypothesis H₀?",
    options: [
      ["the statement assumed true unless the data give enough evidence against it", t`Correct: $H_0$ states a specific value of the parameter, e.g. $H_0: p = 0.3$, and the test assumes it.`],
      ["the statement about the parameter that the researcher is trying to show is true", t`That is usually the alternative hypothesis $H_1$.`],
      ["the conclusion that is reached about the population after carrying out the test", "Hypotheses are written before the data are examined."],
      ["the range of values of the test statistic that leads to rejection of the claim", "That is the critical (rejection) region."],
    ],
    answer: "A",
    explanation: t`$H_0$ gives a single value of the parameter so that probabilities can be calculated; $H_1$ states how the parameter is thought to differ ($<$, $>$ or $\ne$).`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A bakery in Bulawayo used to sell loaves with mean mass 700 g. After a new oven is installed, the manager wants to test whether the mean mass has changed. Which pair of hypotheses is correct?",
    options: [
      [t`$H_0: \mu = 700$, $H_1: \mu \ne 700$`, "Correct: 'has changed' allows either direction, so the test is two-tailed."],
      [t`$H_0: \mu = 700$, $H_1: \mu > 700$`, "This tests only for an increase; the manager asks about any change."],
      [t`$H_0: \mu \ne 700$, $H_1: \mu = 700$`, "The null hypothesis must give a single value, and the claim being tested goes in H₁."],
      [t`$H_0: \bar{x} = 700$, $H_1: \bar{x} \ne 700$`, t`Hypotheses are about the population mean $\mu$, not the sample mean $\bar{x}$.`],
    ],
    answer: "A",
    explanation: "Use a two-tailed test when the question asks whether a parameter has changed, without a direction.",
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each term with its meaning.",
    pairs: [
      ["significance level", t`the probability of rejecting $H_0$ when it is true (the size of the critical region)`],
      ["test statistic", "the quantity calculated from the sample and used to decide whether to reject the null hypothesis"],
      ["critical region", t`the set of values of the test statistic for which $H_0$ is rejected`],
      ["critical value", "the boundary value of the critical region"],
    ],
    explanation: "The significance level is set before the test; the critical region is chosen so that its probability under H₀ is at most that level.",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A two-tailed test at the 5% significance level puts 2.5% of the probability in each tail of the distribution under H₀.",
    answer: true,
    explanation: t`The 5% is shared equally between the two tails; for a normal test statistic this gives critical values $\pm 1.96$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If a test does not reject H₀, this proves that H₀ is true.",
    answer: false,
    explanation: t`Not rejecting $H_0$ means there is not enough evidence against it at this level. $H_0$ may still be false (a Type II error), especially with a small sample.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "Last year 30% of learners in a district passed A-Level Mathematics. A teacher believes the pass rate has increased this year. Which hypotheses should be used?",
    options: [
      [t`$H_0: p = 0.3$, $H_1: p > 0.3$`, "Correct: the teacher suspects an increase, so the test is one-tailed (upper)."],
      [t`$H_0: p = 0.3$, $H_1: p \ne 0.3$`, "The teacher has a direction in mind (an increase), so a one-tailed test is appropriate."],
      [t`$H_0: p > 0.3$, $H_1: p = 0.3$`, "The hypotheses are the wrong way round; H₀ gives the single value."],
      [t`$H_0: p = 0.3$, $H_1: p < 0.3$`, "This tests for a decrease."],
    ],
    answer: "A",
    explanation: t`$H_0$ states the old value; $H_1$ states the suspected direction of change.`,
  });

  b.fib({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Give the critical values of z for a test on a normal test statistic at the 5% significance level: for an upper one-tailed test, and for a two-tailed test (the positive value).",
    template: "one-tailed: z = {{blank:a}}; two-tailed: z = ±{{blank:b}}",
    blanks: [D("a", 1.645, 0.0005, "1.96"), D("b", 1.96, 0.0005, "1.645")],
    explanation: t`One-tailed 5%: $\Phi(z) = 0.95$, $z = 1.645$. Two-tailed 5%: $\Phi(z) = 0.975$, $z = 1.96$.`,
  });

  const p8 = 1 - Phi(2.15);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`In an upper-tailed test, the test statistic is $z = 2.15$. Find the p-value, $\mathrm{P}(Z \ge 2.15)$, correct to 3 significant figures.`,
    value: p8, tol: 0.0006, wrong: [Phi(2.15), 2 * p8],
    explanation: t`From tables, $\Phi(2.15) = 0.9842$, so the p-value is $1 - 0.9842 = 0.0158$. This is less than 0.05 (and 0.02), so $H_0$ would be rejected at the 5% level. (Doubling it gives the two-tailed p-value.)`,
    hints: ["The p-value is the probability of a result at least this extreme."],
  });
  chk(Math.round(Phi(2.15) * 10000) / 10000, 0.9842);

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "In a one-tailed test at the 5% significance level, the p-value of the observed result is 0.032. What is the correct decision?",
    options: [
      [t`Reject $H_0$, because $0.032 < 0.05$.`, "Correct: the result is in the critical region."],
      [t`Do not reject $H_0$, because $0.032 > 0.025$.`, "0.025 is used for each tail of a two-tailed test at 5%, not a one-tailed test."],
      [t`Accept $H_1$ as proved, because $0.032$ is small.`, "A test gives evidence; it never proves a hypothesis."],
      [t`Do not reject $H_0$, because $0.032 < 0.05$.`, "A p-value below the significance level leads to rejection."],
    ],
    answer: "A",
    explanation: "Compare the p-value with the significance level (for a one-tailed test, the whole 5% is in one tail).",
    hints: ["Is the test one-tailed or two-tailed?"],
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "In a two-tailed test at the 5% significance level, the observed value lies in the lower tail and the probability of a result at least as low is 0.03. What is the correct decision?",
    options: [
      [t`Do not reject $H_0$, because $0.03 > 0.025$.`, "Correct: each tail of a two-tailed 5% test holds only 2.5%."],
      [t`Reject $H_0$, because $0.03 < 0.05$.`, "In a two-tailed test, the one-tail probability must be compared with 0.025 (or doubled to 0.06 and compared with 0.05)."],
      [t`Reject $H_0$, because the result is in the lower tail.`, "Being in the lower tail is not enough; it must be extreme enough."],
      [t`Do not reject $H_0$, because $0.03 > 0.05$.`, "0.03 is less than 0.05; the reason is the 2.5% tail."],
    ],
    answer: "A",
    explanation: "Either compare the tail probability with half the significance level, or double it to get the two-tailed p-value (0.06 > 0.05).",
    hints: ["How is 5% split in a two-tailed test?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A test of H₀: p = 0.4 against H₁: p < 0.4, where p is the proportion of customers at a Gweru supermarket who pay with cash, gives a result in the critical region at the 5% level. Write a conclusion in context.",
    points: [
      t`Reject $H_0$ (the result is significant at the 5% level).`,
      "In context, without certainty: there is evidence at the 5% level that the proportion of customers paying with cash is less than 0.4.",
    ],
    modelAnswer: "The result lies in the critical region, so we reject H₀. There is sufficient evidence at the 5% level to suggest that fewer than 40% of the supermarket's customers pay with cash.",
    explanation: "A full conclusion has a decision about H₀ and a non-definite statement in context ('there is evidence that …', never 'this proves …').",
    hints: ["State the decision, then interpret it in context."],
  });

  const p12 = ge(20, 0.25, 9);
  chk(p12 < 0.05 ? 1 : 0, 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`To test $H_0: p = 0.25$ against $H_1: p > 0.25$, a sample of 20 is taken and 9 successes are observed. Under $H_0$, $X \sim \mathrm{B}(20, 0.25)$. Find the p-value $\mathrm{P}(X \ge 9)$, correct to 3 significant figures.`,
    value: p12, wrong: [binom.pmf(20, 0.25, 9), ge(20, 0.25, 10)],
    explanation: t`$\mathrm{P}(X \ge 9) = 1 - \mathrm{P}(X \le 8) = ${s(p12)}$, so $${sfStr(p12)}$. This is below 0.05, so the result is significant at the 5% level. ($${sfStr(binom.pmf(20, 0.25, 9))}$ is $\mathrm{P}(X = 9)$ only; the p-value includes all more extreme values.)`,
    hints: ["The p-value includes 9 and every value above it."],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Lowering the significance level of a test from 5% to 1% makes it harder to reject the null hypothesis.",
    answer: true,
    explanation: "A 1% test needs more extreme evidence: its critical region is smaller, so fewer results lead to rejection.",
    hints: ["What happens to the critical region?"],
  });

  const c15 = 50 + 1.645 * (9 / 6);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A population is normal with standard deviation 9. To test $H_0: \mu = 50$ against $H_1: \mu > 50$ at the 5% level, a sample of 36 is taken. $H_0$ is rejected if $\bar{x} > c$. Find $c$, correct to 3 significant figures.`,
    value: c15, wrong: [50 + 1.96 * 1.5, 50 + 1.645 * 9],
    explanation: t`Under $H_0$, $\bar{X} \sim \mathrm{N}\left(50, \frac{81}{36}\right)$, standard deviation 1.5. Reject if $\frac{\bar{x} - 50}{1.5} > 1.645$, so $c = 50 + 1.645 \times 1.5 = ${s(c15)}$, i.e. $${sfStr(c15)}$. ($${sfStr(50 + 1.96 * 1.5)}$ uses the two-tailed value 1.96; $${sfStr(50 + 1.645 * 9)}$ uses $\sigma$ instead of $\frac{\sigma}{\sqrt{n}}$.)`,
    hints: ["Find the standard deviation of the sample mean.", "One-tailed 5%: z = 1.645."],
  });

  const p15b = 2 * (1 - Phi(2.3));
  chk(Math.round(Phi(2.3) * 10000) / 10000, 0.9893);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`In a two-tailed test, the test statistic is $z = -2.3$. Find the p-value of the test, correct to 3 significant figures.`,
    value: p15b, tol: 0.0006, wrong: [1 - Phi(2.3), Phi(2.3)],
    explanation: t`One tail: $\mathrm{P}(Z \le -2.3) = 1 - 0.9893 = 0.0107$. A two-tailed p-value counts both tails: $2 \times 0.0107 = 0.0214$. (0.0107 is the one-tailed value.)`,
    hints: ["Find the tail probability beyond −2.3.", "Two-tailed: double it."],
  });

  const p15c = binom.cdf(15, 0.6, 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`To test $H_0: p = 0.6$ against $H_1: p < 0.6$, 15 trials are carried out and 5 successes are observed. Find the p-value $\mathrm{P}(X \le 5)$ for $X \sim \mathrm{B}(15, 0.6)$, correct to 3 significant figures, and hence decide whether the result is significant at the 5% level.`,
    value: p15c, wrong: [binom.pmf(15, 0.6, 5), binom.cdf(15, 0.6, 4)],
    explanation: t`$\mathrm{P}(X \le 5) = ${s(p15c)}$, so $${sfStr(p15c)}$. This is less than 0.05, so the result is significant: reject $H_0$. ($${sfStr(binom.pmf(15, 0.6, 5))}$ is $\mathrm{P}(X = 5)$ only.)`,
    hints: ["Add P(X = 0) to P(X = 5)."],
  });
  chk(p15c < 0.05 ? 1 : 0, 1);

  // ---------------------------------------------------------------- structured (5 marks)
  const z16 = (103.1 - 100) / (12 / sqrt(64));
  const p16 = normalProb(100, 1.5, 103.1, Infinity);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Scores on a national aptitude test are normally distributed with mean 100 and standard deviation 12. A random sample of 64 learners from schools in Matabeleland North has mean score 103.1. A researcher tests, at the 5% level, whether the mean score of learners in the province is greater than 100.`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which hypotheses should be used?",
        options: [
          [t`$H_0: \mu = 100$, $H_1: \mu > 100$`, "Correct: one-tailed, upper."],
          [t`$H_0: \mu = 100$, $H_1: \mu \ne 100$`, "The researcher asks about 'greater than'."],
          [t`$H_0: \mu = 103.1$, $H_1: \mu > 103.1$`, "Hypotheses concern the population value 100, not the sample mean."],
          [t`$H_0: \mu > 100$, $H_1: \mu = 100$`, "Reversed."],
        ], answer: "A", explanation: "The suspected direction goes in H₁." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the value of the test statistic z, correct to 3 significant figures.", value: z16, wrong: [3.1 / 12],
        explanation: t`$z = \frac{103.1 - 100}{12/\sqrt{64}} = \frac{3.1}{1.5} = ${s(z16)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State the conclusion of the test, in context.",
        points: [`Compares ${sfStr(z16)} with 1.645 (or the p-value ${sfStr(p16.exact)} with 0.05) and rejects H₀.`, "There is evidence at the 5% level that the mean score of learners in the province is greater than 100."],
        modelAnswer: `z = ${sfStr(z16)} > 1.645, so the result is in the critical region and H₀ is rejected. There is evidence at the 5% level that learners in Matabeleland North have a mean score greater than 100.`,
        explanation: "Decision plus a non-definite conclusion in context." }),
    ],
    explanation: "State hypotheses about μ, standardise the sample mean, compare with the critical value, conclude in context.",
    hints: ["The standard deviation of the sample mean is σ/√n.", "Compare z with 1.645."],
  });

  // ---------------------------------------------------------------- structured (12 marks)
  const cdf20 = (k) => binom.cdf(20, 0.4, k);
  let cL = -1; while (cdf20(cL + 1) <= 0.025) cL++;
  let cU = 21; while (1 - cdf20(cU - 2) <= 0.025) cU--;
  chk(cL, 3); chk(cU, 13);
  const sizeL = cdf20(cL), sizeU = 1 - cdf20(cU - 1);
  const p17 = binom.cdf(20, 0.4, 4);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A seed merchant claims that 40% of a batch of bean seeds are of a new, drought-resistant variety. Thandeka suspects the proportion is different. She plants 20 seeds chosen at random and counts the number, $X$, that are of the new variety. She tests the claim at the 5% significance level.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State suitable null and alternative hypotheses, explaining why the test is two-tailed.",
        points: [t`$H_0: p = 0.4$, $H_1: p \ne 0.4$, where $p$ is the proportion of new-variety seeds.`, "Two-tailed because Thandeka suspects a difference without a stated direction."],
        modelAnswer: t`$H_0: p = 0.4$ and $H_1: p \ne 0.4$. She only suspects that the proportion is different from 40%, not specifically higher or lower, so both tails are used.`,
        explanation: "Define p in context." }),
      P.fib({ label: "(b)", marks: 4, stem: "Using B(20, 0.4) and 2.5% in each tail, find the critical region: X ≤ a or X ≥ b. Find a and b.", template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [D("a", cL, 0, "4", 2), D("b", cU, 0, "12", 2)],
        explanation: t`Lower: $\mathrm{P}(X \le 3) = ${s(cdf20(3))} \le 0.025$ but $\mathrm{P}(X \le 4) = ${s(cdf20(4))} > 0.025$, so $a = 3$. Upper: $\mathrm{P}(X \ge 13) = ${s(sizeU)} \le 0.025$ but $\mathrm{P}(X \ge 12) = ${s(1 - cdf20(11))} > 0.025$, so $b = 13$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the actual significance level of the test, correct to 3 significant figures.", value: sizeL + sizeU, wrong: [0.05],
        explanation: t`$${s(sizeL)} + ${s(sizeU)} = ${s(sizeL + sizeU)}$, so $${sfStr(sizeL + sizeU)}$, a little below 5% because $X$ is discrete.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "Thandeka finds 4 seeds of the new variety. What is the decision?",
        options: [
          [t`Do not reject $H_0$: 4 is not in the critical region.`, "Correct: the lower critical region is X ≤ 3."],
          [t`Reject $H_0$: 4 is below the expected value of 8.`, "Being below 8 is not enough; it must be in the critical region."],
          [t`Reject $H_0$: $\mathrm{P}(X \le 4) < 0.05$.`, `In a two-tailed 5% test compare with 0.025; P(X ≤ 4) = ${s(p17)} > 0.025.`],
          [t`Accept $H_0$ as proved.`, "Never 'proved'."],
        ], answer: "A", explanation: "4 lies outside the critical region." }),
      P.manual({ label: "(e)", marks: 3, stem: "Write a conclusion in context, and explain why the actual significance level differs from 5%.",
        points: ["There is insufficient evidence at the 5% level to reject the merchant's claim that 40% are the new variety.", "The conclusion is not definite (e.g. 'insufficient evidence', not 'the claim is true').", "X is discrete, so no critical region has probability exactly 0.025 in each tail; the chosen regions have smaller probabilities."],
        modelAnswer: `There is not enough evidence at the 5% level to doubt the merchant's claim that 40% of the seeds are of the new variety. The actual significance level (${sfStr(sizeL + sizeU)}) is below 5% because a binomial variable takes only whole-number values, so the tail probabilities cannot be made exactly 2.5%.`,
        explanation: "Discrete distributions give an actual size at most the nominal level." }),
    ],
    explanation: "For a two-tailed binomial test, find the largest lower and smallest upper critical values with tail probabilities at most 2.5%.",
    hints: ["Work from the tails inwards, checking cumulative probabilities.", "Compare each tail with 0.025."],
  });

  // ---------------------------------------------------------------- flashcards
  b.card("DEFINITION", "Null hypothesis H₀", "The hypothesis assumed true for the test: a single value of a population parameter, e.g. p = 0.3 or μ = 50.");
  b.card("DEFINITION", "Alternative hypothesis H₁", "What we conclude if H₀ is rejected: p > 0.3 (one-tailed), p < 0.3 (one-tailed) or p ≠ 0.3 (two-tailed).");
  b.card("DEFINITION", "Significance level", "The probability of rejecting H₀ when it is true; the size of the critical region (e.g. 5%).");
  b.card("DEFINITION", "Critical region", "The set of values of the test statistic for which H₀ is rejected; the rest is the acceptance region.");
  b.card("DEFINITION", "p-value", "The probability, under H₀, of a result at least as extreme as the one observed. Reject H₀ if p-value < significance level (half of it per tail in a two-tailed test).");
  b.card("FACT", "Critical z values", "5%: 1.645 one-tailed, 1.96 two-tailed. 1%: 2.326 one-tailed, 2.576 two-tailed.");
  b.card("CONCEPT", "Writing a conclusion", "Decision about H₀ + context + non-definite wording: 'there is (in)sufficient evidence at the 5% level that …'.");
  b.card("CONCEPT", "One- or two-tailed?", "'Increased'/'more than': upper tail. 'Decreased'/'less than': lower tail. 'Changed'/'different': two-tailed.");
  b.card("FACT", "Actual significance level (discrete tests)", "The probability of the chosen critical region under H₀; usually below the nominal level.");
});
