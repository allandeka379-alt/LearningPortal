// W3b: amaths.inference.errors (ZIMSEC Statistics F5 6.8.1; Cambridge P6 6.5). Poisson items are Cambridge only.
import { concept, P, t, chk, sfStr, binom, poisson, criticalRegion, normalProb, CAM } from "../lib.mjs";

const { sqrt } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);

concept("amaths.inference.errors", { file: "inference/errors", keyPrefix: "inference.errors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is a Type I error in a hypothesis test?",
    options: [
      [t`rejecting $H_0$ when $H_0$ is true`, "Correct: the data happen to fall in the critical region although H₀ is true."],
      [t`not rejecting $H_0$ when $H_0$ is false`, "That is a Type II error."],
      [t`rejecting $H_0$ when $H_0$ is false`, "That is a correct decision."],
      ["using the wrong distribution for the test statistic", "That is a mistake in method, not a Type I error."],
    ],
    answer: "A",
    explanation: t`Type I: reject a true $H_0$. Type II: fail to reject a false $H_0$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is a Type II error in a hypothesis test?",
    options: [
      [t`not rejecting $H_0$ when $H_0$ is false`, "Correct: the test misses a real change."],
      [t`rejecting $H_0$ when $H_0$ is true`, "That is a Type I error."],
      [t`not rejecting $H_0$ when $H_0$ is true`, "That is a correct decision."],
      ["choosing a one-tailed test when a two-tailed test was needed", "That is a mistake in method, not a Type II error."],
    ],
    answer: "A",
    explanation: t`A Type II error can only happen when $H_0$ is not rejected; its probability depends on the true value of the parameter.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "For a test based on a continuous test statistic, such as a z-test, the probability of a Type I error equals the significance level.",
    answer: true,
    explanation: t`The critical region is chosen to have probability exactly $\alpha$ under $H_0$. For discrete tests, P(Type I error) is the actual significance level, usually below $\alpha$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "With the same sample size, reducing the significance level from 5% to 1% increases the probability of a Type II error.",
    answer: true,
    explanation: "A smaller critical region makes it harder to reject H₀, so a false H₀ is more likely to survive. Only a larger sample can reduce both error probabilities.",
  });

  const cr5 = criticalRegion((k) => binom.cdf(20, 0.25, k), 0.05, "lower");
  chk(cr5.c, 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A test of $H_0: p = 0.25$ against $H_1: p < 0.25$ uses $X \sim \mathrm{B}(20, 0.25)$ and the critical region $X \le 1$. Find the probability of a Type I error, correct to 3 significant figures.`,
    value: cr5.size, wrong: [0.05, binom.cdf(20, 0.25, 2)],
    explanation: t`P(Type I) $= \mathrm{P}(X \le 1 \mid p = 0.25) = 0.75^{20} + 20(0.25)(0.75)^{19} = ${s(cr5.size)}$, so $${sfStr(cr5.size)}$. It is less than 0.05 because $X$ is discrete.`,
    hints: ["A Type I error happens when X falls in the critical region although p = 0.25."],
  });

  const t2 = 1 - binom.cdf(20, 0.1, 1);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`For the test in the previous question ($H_0: p = 0.25$, critical region $X \le 1$, $n = 20$), find the probability of a Type II error if in fact $p = 0.1$. Give your answer correct to 3 significant figures.`,
    value: t2, wrong: [binom.cdf(20, 0.1, 1), 1 - cr5.size],
    explanation: t`A Type II error means $X$ is **not** in the critical region although $p = 0.1$: $\mathrm{P}(X \ge 2 \mid p = 0.1) = 1 - (0.9^{20} + 20(0.1)(0.9)^{19}) = ${s(t2)}$, so $${sfStr(t2)}$. ($${sfStr(binom.cdf(20, 0.1, 1))}$ is the probability of correctly rejecting $H_0$, the power.)`,
    hints: ["Use the true value p = 0.1.", "Type II: the result falls outside the critical region."],
  });

  const t3 = normalProb(52, 1, -Infinity, 50 + 1.645);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A test of $H_0: \mu = 50$ against $H_1: \mu > 50$ uses a sample of 16 from a normal population with $\sigma = 4$. $H_0$ is rejected if $\bar{x} > 51.645$. Find the probability of a Type II error if in fact $\mu = 52$. Give your answer correct to 3 significant figures.`,
    value: t3.exact, tol: t3.tol, wrong: [1 - t3.exact, normalProb(52, 4, -Infinity, 51.645).exact],
    explanation: t`When $\mu = 52$, $\bar{X} \sim \mathrm{N}(52, 1)$. P(Type II) $= \mathrm{P}(\bar{X} \le 51.645) = \Phi(-0.355) = ${s(t3.exact)}$, i.e. $${sfStr(t3.exact)}$. (Using $\sigma = 4$ instead of $\frac{4}{\sqrt{16}} = 1$ gives $${sfStr(normalProb(52, 4, -Infinity, 51.645).exact)}$.)`,
    hints: ["Use the true mean, 52, with the same critical value.", "The standard deviation of the sample mean is 4/√16."],
  });

  const t4 = 1 - normalProb(50, 1.2, 48, 52).exact;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`In a test of $H_0: \mu = 50$, the sample mean has standard deviation 1.2 under $H_0$, and $H_0$ is accepted if $48 \le \bar{x} \le 52$. Find the probability of a Type I error, correct to 3 significant figures.`,
    value: t4, tol: 0.0012, wrong: [t4 / 2, 0.05],
    explanation: t`P(Type I) $= \mathrm{P}(\bar{X} < 48 \text{ or } \bar{X} > 52 \mid \mu = 50) = 2\left(1 - \Phi\left(\frac{2}{1.2}\right)\right) = 2(1 - \Phi(1.667)) = ${s(t4)}$, i.e. $${sfStr(t4)}$. (From tables with $z = 1.67$: $2 \times 0.0475 = 0.0950$.)`,
    hints: ["The rejection region is outside the acceptance interval, in both tails."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A clinic tests $H_0$: "a new malaria test is no more accurate than the old one" against $H_1$: "it is more accurate". Match each outcome with its description.`,
    pairs: [
      ["Type I error", "concluding the new test is more accurate when it is not"],
      ["Type II error", "failing to conclude the new test is more accurate when it is"],
      ["correct rejection", "concluding the new test is more accurate when it is"],
      ["correct non-rejection", "not concluding the new test is better, and it is not better"],
    ],
    explanation: "Write errors in context by stating what is concluded and what is actually true.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A test has H₀: 'the mean fill of cooking-oil bottles is 750 ml'. After a test, the factory concludes that the mean fill is less than 750 ml. Which error could have been made?",
    options: [
      ["a Type I error only", t`Correct: $H_0$ was rejected, so the only possible error is rejecting a true $H_0$.`],
      ["a Type II error only", t`A Type II error requires not rejecting $H_0$.`],
      ["either a Type I or a Type II error", "Only one type is possible for a given decision."],
      ["no error is possible", "The sample might have been unusual by chance."],
    ],
    answer: "A",
    explanation: "Rejecting H₀ risks a Type I error; not rejecting it risks a Type II error.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A seed company tests H₀: p = 0.8 against H₁: p < 0.8, where p is the proportion of its maize seeds that germinate. Describe, in context, a Type I error and a Type II error.",
    points: [
      "Type I: concluding that fewer than 80% of seeds germinate when in fact 80% do.",
      "Type II: not concluding that fewer than 80% germinate when in fact the proportion is less than 80%.",
    ],
    modelAnswer: "Type I error: the company decides the germination rate has fallen below 80% when it really is 80%. Type II error: the company finds no evidence of a fall although the true germination rate is below 80%.",
    explanation: "Each description should say what is concluded and what is true, in context.",
    hints: ["Type I: reject a true H₀. Type II: keep a false H₀."],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "With a fixed significance level, which change reduces the probability of a Type II error?",
    options: [
      ["increasing the sample size", "Correct: the sample mean becomes less variable, so a real difference is more likely to be detected."],
      ["reducing the significance level", "That makes rejection harder and increases the Type II probability."],
      ["changing to a two-tailed test when the direction is known", "Splitting α between two tails makes a one-directional change harder to detect."],
      ["using fewer observations to save time", "Smaller samples make tests less powerful."],
    ],
    answer: "A",
    explanation: "Larger samples give a narrower distribution of the test statistic, separating the H₀ and H₁ distributions.",
    hints: ["How does n affect the standard deviation of the sample mean?"],
  });

  const cr14 = criticalRegion((k) => poisson.cdf(5, k), 0.05, "upper");
  chk(cr14.c, 10);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true, applies: CAM,
    stem: t`Under $H_0$, the number of breakdowns of minibuses in a fleet per month is $\mathrm{Po}(5)$. A test of $H_0: \lambda = 5$ against $H_1: \lambda > 5$ at the 5% level uses one month's count. Find the critical region $X \ge c$ and the probability of a Type I error (correct to 3 significant figures).`,
    template: "c = {{blank:c}}, P(Type I error) = {{blank:a}}",
    blanks: [D("c", cr14.c, 0, "9"), D("a", sfStr(cr14.size), 0.0005, "0.05")],
    explanation: t`$\mathrm{P}(X \ge 9) = ${s(1 - poisson.cdf(5, 8))} > 0.05$; $\mathrm{P}(X \ge 10) = ${s(cr14.size)} \le 0.05$. Critical region $X \ge 10$; P(Type I) $= ${sfStr(cr14.size)}$.`,
    hints: ["Find the smallest c with P(X ≥ c) ≤ 0.05.", "P(Type I) is the probability of the critical region under H₀."],
  });

  const t15 = poisson.cdf(8, 9);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true, applies: CAM,
    stem: t`For the test in the previous question (critical region $X \ge 10$ under $H_0: \lambda = 5$), find the probability of a Type II error if the true monthly rate is 8. Give your answer correct to 3 significant figures.`,
    value: t15, wrong: [1 - t15, poisson.cdf(8, 8)],
    explanation: t`Type II: $X \le 9$ when $\lambda = 8$: $\mathrm{P}(X \le 9) = ${s(t15)}$, so $${sfStr(t15)}$. The test misses a rise to 8 more often than not.`,
    hints: ["Use Po(8) and the acceptance region X ≤ 9."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A Type II error can only occur when the null hypothesis is not rejected.",
    answer: true,
    explanation: t`By definition a Type II error is failing to reject a false $H_0$.`,
  });

  // ---------------------------------------------------------------- structured (5 marks)
  const crit16 = 80 + 1.645 * 0.75;
  const t16 = normalProb(81.5, 0.75, -Infinity, crit16);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The marks in an aptitude test are normally distributed with standard deviation 3. A test of $H_0: \mu = 80$ against $H_1: \mu > 80$ at the 5% level uses the mean of 16 randomly chosen marks.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: t`Find the critical value $c$ such that $H_0$ is rejected if $\bar{x} > c$, correct to 4 significant figures.`, value: crit16, sf: 4, wrong: [80 + 1.96 * 0.75],
        explanation: t`$c = 80 + 1.645 \times \frac{3}{4} = ${s(crit16)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability of a Type II error when μ = 81.5, correct to 3 significant figures.", value: t16.exact, tol: t16.tol, wrong: [1 - t16.exact],
        explanation: t`$\bar{X} \sim \mathrm{N}(81.5, 0.75^2)$: $\mathrm{P}(\bar{X} \le ${s(crit16)}) = \Phi\left(\frac{${s(crit16)} - 81.5}{0.75}\right) = \Phi(${sfStr((crit16 - 81.5) / 0.75)}) = ${s(t16.exact)}$.` }),
    ],
    explanation: "Find the critical value under H₀, then the probability of falling short of it under the true mean.",
    hints: ["Standard deviation of the mean = 3/√16.", "Type II: the sample mean does not exceed c."],
  });

  // ---------------------------------------------------------------- structured (13 marks)
  const n17 = 50, p0 = 0.3;
  const cr17 = criticalRegion((k) => binom.cdf(n17, p0, k), 0.05, "upper");
  const t17 = binom.cdf(n17, 0.45, cr17.c - 1);
  const zc = 15 + 1.645 * sqrt(n17 * p0 * 0.7);
  chk(cr17.c, 21);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A health worker believes that more than 30% of households in a district in Manicaland use treated mosquito nets. She will survey 50 randomly chosen households and test $H_0: p = 0.3$ against $H_1: p > 0.3$ at the 5% level, where $X$ is the number using nets.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Using B(50, 0.3), find the critical region X ≥ c and the probability of a Type I error (correct to 3 significant figures).", template: "c = {{blank:c}}, P(Type I error) = {{blank:a}}",
        blanks: [D("c", cr17.c, 0, "20", 2), D("a", sfStr(cr17.size), 0.0005, "0.05", 1)],
        explanation: t`$\mathrm{P}(X \ge 20) = ${s(1 - binom.cdf(50, 0.3, 19))} > 0.05$, $\mathrm{P}(X \ge 21) = ${s(cr17.size)} \le 0.05$. So $c = 21$ and P(Type I) $= ${sfStr(cr17.size)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability of a Type II error if in fact p = 0.45, correct to 3 significant figures.", value: t17, wrong: [1 - t17],
        explanation: t`P(Type II) $= \mathrm{P}(X \le 20 \mid p = 0.45) = ${s(t17)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain, in context, the meaning of the probability found in (b).",
        points: ["It is the probability that the survey fails to give evidence that more than 30% use nets,", "when in fact 45% of households use them."],
        modelAnswer: `If really 45% of households use nets, there is a probability of ${sfStr(t17)} that the survey will not find significant evidence that more than 30% do.`,
        explanation: "Describe both the decision and the true situation." }),
      P.num({ label: "(d)", marks: 3, stem: "A colleague uses a normal approximation (without a continuity correction) to the distribution of X under H₀ to find a critical value k such that P(X > k) = 0.05. Find k, correct to 3 significant figures.", value: zc, wrong: [15 + 1.96 * sqrt(10.5)],
        explanation: t`$X \approx \mathrm{N}(15, 10.5)$: $k = 15 + 1.645\sqrt{10.5} = ${s(zc)}$, consistent with the exact critical value 21.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State one way of reducing the probability of a Type II error without increasing the probability of a Type I error, and explain why it works.",
        points: ["Increase the sample size (survey more households).", "The distributions of the proportion under H₀ and under p = 0.45 overlap less, so a true difference is more likely to be detected at the same significance level."],
        modelAnswer: "Survey more households. With a larger sample the observed proportion varies less, so it is more likely to exceed the critical value when p = 0.45, while the significance level stays at 5%.",
        explanation: "Only more data reduces both errors." }),
    ],
    explanation: "P(Type I) is the probability of the critical region under H₀; P(Type II) is the probability of the acceptance region under the true value.",
    hints: ["Work out the critical region first.", "For Type II, use p = 0.45 with the acceptance region X ≤ 20."],
  });

  // ---------------------------------------------------------------- flashcards
  b.card("DEFINITION", "Type I error", t`Rejecting $H_0$ when $H_0$ is true.`);
  b.card("DEFINITION", "Type II error", t`Not rejecting $H_0$ when $H_0$ is false.`);
  b.card("FORMULA", "P(Type I error)", t`$\mathrm{P}(\text{test statistic in critical region} \mid H_0 \text{ true})$; equals $\alpha$ for continuous tests, the actual significance level for discrete tests.`);
  b.card("FORMULA", "P(Type II error)", t`$\mathrm{P}(\text{test statistic not in critical region} \mid \text{true parameter value})$`);
  b.card("CONCEPT", "Trade-off between errors", "Lowering α reduces Type I errors but increases Type II errors; a larger sample can reduce both.");
  b.card("CONCEPT", "Which error is possible?", "If H₀ is rejected, only a Type I error is possible; if not rejected, only a Type II error.");
  b.card("CONCEPT", "Describing errors in context", "Say what is concluded and what is actually true, e.g. 'concluding the rate has fallen when it has not'.");
  b.card("CONCEPT", "Type II calculation steps", "1) Find the critical region using H₀. 2) Use the true parameter value. 3) Find the probability of the acceptance region.");
});
