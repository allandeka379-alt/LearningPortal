// W4b: amaths.inference.t-distribution (ZIMSEC only: Statistics F6)
import { concept, P, t, chk, tTable, tCdf, mean, s2, est } from "../lib.mjs";
import { f3, f4, NB, NBd } from "../tables/w4b-kit.mjs";

const { sqrt, abs } = Math;
const T = (nu, p) => tTable(nu, p).toFixed(3);

concept("amaths.inference.t-distribution", { file: "inference/t-distribution", keyPrefix: "inference.t-distribution" }, (b) => {
  // q01 degrees of freedom
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A random sample of 12 observations is taken from a normal population with unknown variance, to test a hypothesis about the population mean using the t-distribution. How many degrees of freedom does the test statistic have?",
    options: [
      ["11", "Correct: ν = n − 1 = 12 − 1, because one degree of freedom is used in estimating the mean."],
      ["12", "This is the sample size; estimating the mean uses up one degree of freedom."],
      ["10", "Only one parameter (the mean) is estimated before the spread, so subtract 1, not 2."],
      ["13", "Degrees of freedom are never more than the number of observations."],
    ],
    answer: "A",
    explanation: t`For a one-sample t method, $\nu = n - 1 = 11$.`,
  });

  // q02 tf heavier tails
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The t-distribution has heavier tails than the standard normal distribution.",
    answer: true,
    explanation: "Using s instead of σ adds uncertainty, so extreme values of the statistic are more likely: the t-distribution is more spread out in the tails, and its critical values are larger than the z values.",
  });

  // q03 limit as ν grows
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "What happens to the t-distribution as the number of degrees of freedom increases?",
    options: [
      ["It approaches the standard normal distribution", "Correct: with more data s becomes a reliable estimate of σ, so the t-distribution's tails become lighter and it tends to N(0, 1)."],
      ["It becomes more spread out in the tails", "The spread decreases as ν increases: critical values shrink towards the z values."],
      ["It becomes positively skewed", "The t-distribution is symmetrical about 0 for every ν."],
      ["Its mean increases with ν", "Its mean is 0 for every ν greater than 1."],
    ],
    answer: "A",
    explanation: "As ν → ∞ the t-distribution tends to N(0, 1); for example the two-tailed 5% value falls from 2.571 (ν = 5) to 2.042 (ν = 30) towards 1.960.",
  });

  // q04 critical value for a 95% interval, n = 6
  const t4 = tTable(5, 0.975);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "A 95% confidence interval for a population mean is to be found from a sample of 6 observations from a normal population with unknown variance. State the t critical value used, correct to 3 decimal places.",
    value: t4, dp: 3, wrong: [T(6, 0.975), T(5, 0.95)],
    explanation: t`$\nu = 5$ and a 95% interval leaves 2.5% in each tail: $t_5(0.975) = ${T(5, 0.975)}$. ($${T(6, 0.975)}$ uses $\nu = 6$; $${T(5, 0.95)}$ is the one-tailed 5% value.)`,
  });

  // q05 t statistic
  const t5 = (52.4 - 50) / (3.6 / sqrt(9));
  chk(t5, 2, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A random sample of $9$ observations from a normal population has mean $52.4$ and unbiased standard deviation estimate $s = 3.6$. Calculate the test statistic $t$ for testing $H_0: \mu = 50$.`,
    value: t5, wrong: [f3(2.4 / 3.6), f3(2.4 / (3.6 / 9))],
    explanation: t`$t = \frac{\bar{x} - \mu_0}{s/\sqrt{n}} = \frac{52.4 - 50}{3.6/3} = \frac{2.4}{1.2} = 2$. (Forgetting $\sqrt{n}$ gives $0.667$; dividing $s$ by $n$ instead of $\sqrt{n}$ gives $6$.)`,
  });

  // q06 CI from summary
  const t6 = tTable(9, 0.975), h6 = (t6 * 2.4) / sqrt(10);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The masses, in kg, of $10$ randomly chosen sacks of groundnuts from a Murehwa co-operative have mean $18.6$ and unbiased standard deviation estimate $s = 2.4$. Assuming masses are normally distributed, find a 95% confidence interval for the mean mass. Give the limits correct to 3 significant figures.`,
    template: "{{blank:lo}} kg to {{blank:hi}} kg",
    blanks: [NB("lo", 18.6 - h6, f3(18.6 - (1.96 * 2.4) / sqrt(10))), NB("hi", 18.6 + h6, f3(18.6 + (1.96 * 2.4) / sqrt(10)))],
    explanation: t`$\nu = 9$, $t_9(0.975) = ${T(9, 0.975)}$. Half-width $= ${T(9, 0.975)} \times \frac{2.4}{\sqrt{10}} = ${f4(h6)}$. Interval $18.6 \pm ${f4(h6)}$: $(${f3(18.6 - h6)}, ${f3(18.6 + h6)})$ kg. (Using $z = 1.96$ gives a narrower, wrong interval.)`,
    hints: ["ν = n − 1 = 9.", "Half-width = t × s/√n."],
  });

  // q07 CI from raw data
  const d7 = [31, 27, 35, 29, 33, 30];
  const m7 = mean(d7), s7 = sqrt(s2(d7)), t7 = tTable(5, 0.95), h7 = (t7 * s7) / sqrt(6);
  chk(m7, 30.833333333333332, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The times, in minutes, taken by six randomly chosen learners to walk to a school in Chivhu were 31, 27, 35, 29, 33, 30. Assuming the times are normally distributed, find a 90% confidence interval for the mean time. Give the limits correct to 3 significant figures.",
    template: "{{blank:lo}} min to {{blank:hi}} min",
    blanks: [NB("lo", m7 - h7, f3(m7 - (tTable(5, 0.975) * s7) / sqrt(6))), NB("hi", m7 + h7, f3(m7 + (tTable(5, 0.975) * s7) / sqrt(6)))],
    explanation: t`$\bar{x} = ${f4(m7)}$, $s^2 = ${f4(s2(d7))}$, $s = ${f4(s7)}$. For 90% with $\nu = 5$: $t_5(0.95) = ${T(5, 0.95)}$. Half-width $= ${T(5, 0.95)} \times \frac{${f4(s7)}}{\sqrt{6}} = ${f4(h7)}$, so the interval is $(${f3(m7 - h7)}, ${f3(m7 + h7)})$ minutes. (The value $${T(5, 0.975)}$ would give a 95% interval.)`,
    hints: ["Find s with divisor n − 1.", "A 90% interval uses t₅(0.95)."],
  });

  // q08 which method
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A sample of 7 observations is taken from a normal population whose variance is unknown. Which method is appropriate for a confidence interval for the population mean?",
    options: [
      ["The t-distribution with 6 degrees of freedom, using s", "Correct: normal population, unknown variance and a small sample call for t with ν = n − 1."],
      ["The normal distribution, using s in place of σ", "With only 7 observations, s is an unreliable estimate of σ; the z value would make the interval too narrow."],
      ["The t-distribution with 7 degrees of freedom, using s", "The degrees of freedom are n − 1 = 6."],
      ["The central limit theorem with the normal distribution", "The central limit theorem needs a large sample; here the population is normal but σ is unknown."],
    ],
    answer: "A",
    explanation: t`Normal population + unknown $\sigma$ + small $n$ → $\bar{x} \pm t_{6}\,\frac{s}{\sqrt{7}}$.`,
  });

  // q09 statistic from Σx, Σx²
  const e9 = est(8, 1236, 191200);
  const t9 = (e9.mean - 150) / sqrt(e9.s2 / 8);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`For a random sample of $8$ bags of cement from a Bulawayo depot, the masses $x$ (in hundreds of grams) give $\sum x = 1236$ and $\sum x^2 = 191\,200$. Calculate the test statistic $t$ for $H_0: \mu = 150$, correct to 3 significant figures.`,
    value: t9, wrong: [f3((e9.mean - 150) / sqrt(((191200 - 1236 ** 2 / 8) / 8) / 8)), f3((e9.mean - 150) / sqrt(e9.s2))],
    explanation: t`$\bar{x} = \frac{1236}{8} = ${e9.mean}$; $s^2 = \frac{1}{7}\left(191\,200 - \frac{1236^2}{8}\right) = ${f4(e9.s2)}$; $t = \frac{${e9.mean} - 150}{\sqrt{${f4(e9.s2)}/8}} = ${f3(t9)}$. (Dividing by $8$ instead of $7$ in $s^2$ gives $${f3((e9.mean - 150) / sqrt(((191200 - 1236 ** 2 / 8) / 8) / 8))}$.)`,
    workedSolution: t`1. $\bar{x} = ${e9.mean}$.
2. $s^2 = \frac{1}{7}\left(191\,200 - ${1236 ** 2 / 8}\right) = ${f4(e9.s2)}$.
3. $\frac{s}{\sqrt{n}} = ${f4(sqrt(e9.s2 / 8))}$.
4. $t = \frac{${e9.mean - 150}}{${f4(sqrt(e9.s2 / 8))}} = ${f3(t9)}$.`,
    hints: ["Unbiased variance: divide by n − 1.", "t = (x̄ − μ₀)/(s/√n)."],
  });

  // q10 decision
  const c10 = tTable(14, 0.975);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A two-tailed t-test at the 5% level uses a sample of $15$ observations, and gives $t = -2.1$. The critical values are $\pm${T(14, 0.975)}$. What is the correct conclusion?`,
    options: [
      [t`Do not reject $H_0$: $|-2.1| < ${T(14, 0.975)}$`, "Correct: the statistic is not in the critical region, so there is insufficient evidence against H₀ at the 5% level."],
      [t`Reject $H_0$: $-2.1 < ${T(14, 0.975)}$`, "In a two-tailed test compare |t| with the critical value, or −2.1 with the lower value −2.145."],
      [t`Reject $H_0$: $|-2.1| > 1.96$`, "1.96 is the z value; with 14 degrees of freedom the t critical value is larger."],
      [t`Accept that $H_0$ is true`, "Failing to reject H₀ does not prove it true; it means the evidence is not strong enough."],
    ],
    answer: "A",
    explanation: t`$-${T(14, 0.975)} < -2.1 < ${T(14, 0.975)}$, so $t$ is outside the critical region. Do not reject $H_0$; there is insufficient evidence at the 5% level that the mean differs from its stated value.`,
    hints: ["Two-tailed: is |t| bigger than the critical value?"],
  });
  chk(c10, 2.145, 1e-9);

  // q11 one-tailed 1% critical value, n = 16
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A one-tailed t-test at the 1% significance level, with H₁: μ > μ₀, uses a sample of 16 observations from a normal population. State the critical value, correct to 3 decimal places.",
    value: tTable(15, 0.99), dp: 3, wrong: [T(15, 0.995), T(16, 0.99)],
    explanation: t`$\nu = 15$, upper tail 1%: $t_{15}(0.99) = ${T(15, 0.99)}$. ($${T(15, 0.995)}$ is the two-tailed 1% value; $${T(16, 0.99)}$ uses $\nu = 16$.)`,
    hints: ["ν = n − 1; one tail of 1% means p = 0.99."],
  });

  // q12 matching critical values
  b.match({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Match each situation (normal population, σ unknown) with its t critical value.",
    pairs: [
      ["95% confidence interval, n = 11", T(10, 0.975)],
      ["One-tailed 5% test, n = 11", T(10, 0.95)],
      ["99% confidence interval, n = 11", T(10, 0.995)],
      ["Two-tailed 10% test, n = 21", T(20, 0.95)],
    ],
    explanation: t`$\nu = 10$: $t_{10}(0.975) = ${T(10, 0.975)}$, $t_{10}(0.95) = ${T(10, 0.95)}$, $t_{10}(0.995) = ${T(10, 0.995)}$. $\nu = 20$, 5% in each tail: $t_{20}(0.95) = ${T(20, 0.95)}$.`,
    hints: ["Work out ν = n − 1 and the probability below the critical value."],
  });

  // q13 assumptions
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "State two assumptions needed for a one-sample t-test of a population mean.",
    points: ["The population is normally distributed (approximately).", "The sample is random (the observations are independent)."],
    modelAnswer: "The population from which the sample is drawn is normally distributed, and the sample is a random sample of independent observations.",
    explanation: "The t-distribution result is exact only for a normal population; randomness justifies treating the observations as independent.",
  });

  // q14 tf width
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "From the same sample, a 99% t-confidence interval for the mean is narrower than a 95% t-confidence interval.",
    answer: false,
    explanation: t`Greater confidence needs a larger critical value ($t_\nu(0.995) > t_\nu(0.975)$), so the 99% interval is wider.`,
  });

  // q15 s from the width
  const t15 = tTable(9, 0.975), s15 = (2 * sqrt(10)) / t15;
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A 95% confidence interval for the mean of a normal population, calculated from a random sample of $10$ observations using the t-distribution, is $(46.3, 50.3)$. Find the value of $s$ used, correct to 3 significant figures.`,
    value: s15, wrong: [f3((2 * sqrt(10)) / 1.96), f3(4 * sqrt(10) / t15)],
    explanation: t`The mean is the midpoint, $48.3$, and the half-width is $2$. So $${T(9, 0.975)} \times \frac{s}{\sqrt{10}} = 2$, giving $s = \frac{2\sqrt{10}}{${T(9, 0.975)}} = ${f3(s15)}$. (Using the full width $4$ doubles the answer; using $1.96$ ignores the small sample.)`,
    workedSolution: t`1. Mean $= \frac{46.3 + 50.3}{2} = 48.3$; half-width $= 2$.
2. $\nu = 9$: $t_9(0.975) = ${T(9, 0.975)}$.
3. $s = \frac{2\sqrt{10}}{${T(9, 0.975)}} = ${f3(s15)}$.`,
    hints: ["Half-width = t × s/√n.", "The half-width is half of 50.3 − 46.3."],
  });

  // q16 why t not z
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A student uses z = 1.645 to find a 90% confidence interval for a mean from a sample of 6 observations, with σ unknown. Explain why this is not appropriate and what effect it has on the interval.",
    points: ["σ is estimated by s from only 6 values, so (x̄ − μ)/(s/√n) follows t with 5 degrees of freedom, not N(0, 1).", `1.645 is smaller than t₅(0.95) = ${T(5, 0.95)}, so the interval is too narrow: it overstates the precision (true confidence below 90%).`],
    modelAnswer: `With a small sample and σ unknown, the standardised mean has a t₅ distribution. Its critical value ${T(5, 0.95)} exceeds 1.645, so using 1.645 gives an interval that is too narrow, with true confidence less than 90%.`,
    explanation: "Small sample + estimated σ → heavier tails → larger critical value.",
    hints: ["Compare 1.645 with t₅(0.95)."],
  });

  // q17 struct 5: one-tailed test from summary
  const t17 = (11.6 - 12.5) / (1.5 / sqrt(10));
  const c17 = tTable(9, 0.95);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A borehole pump in Masvingo is meant to deliver a mean of $12.5$ litres per minute. After a repair, $10$ random readings give $\bar{x} = 11.6$ and $s = 1.5$ litres per minute. Delivery rates are normally distributed. Farai tests, at the 5% level, whether the mean rate has fallen.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the test statistic t, correct to 3 significant figures.", value: t17, wrong: [f3((11.6 - 12.5) / 1.5)],
        explanation: t`$t = \frac{11.6 - 12.5}{1.5/\sqrt{10}} = ${f3(t17)}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "State the critical value of t for this test (give the negative value), correct to 3 decimal places.", value: -c17, dp: 3, wrong: [-tTable(9, 0.975)],
        explanation: t`One-tailed, lower tail, $\nu = 9$: $-t_9(0.95) = -${T(9, 0.95)}$.` }),
      P.mcq({ label: "(c)", marks: 2, stem: "What is the conclusion of the test?",
        options: [
          ["Reject H₀: there is evidence that the mean rate has fallen", t`Correct: $${f3(t17)} < -${T(9, 0.95)}$.`],
          ["Do not reject H₀: there is no evidence that the mean rate has fallen", "The statistic lies in the critical region."],
          ["Reject H₀: the mean rate is now exactly 11.6 litres per minute", "A test gives evidence about μ, not its exact value."],
          ["The test cannot be done because n is less than 30", "The t-test is designed for small samples from a normal population."],
        ],
        answer: "A", explanation: t`$t = ${f3(t17)}$ is below $-${T(9, 0.95)}$, so reject $H_0$ at the 5% level: there is evidence that the mean delivery rate has fallen.` }),
    ],
    explanation: "H₀: μ = 12.5, H₁: μ < 12.5; compare t with the lower 5% point of t₉.",
    hints: ["ν = 9.", "One-tailed: use t₉(0.95)."],
  });

  // q18 struct 14: data, interval, test
  const d18 = [68, 74, 71, 65, 70, 77, 69, 72, 66, 73, 75, 68];
  const n18 = d18.length, m18 = mean(d18), v18 = s2(d18), s18 = sqrt(v18);
  const tc18 = tTable(11, 0.975), h18 = (tc18 * s18) / sqrt(n18);
  const ts18 = (m18 - 68) / (s18 / sqrt(n18));
  chk(m18, 70.66666666666667, 1e-9);
  const p18 = 2 * (1 - tCdf(abs(ts18), 11));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The masses, in kg, of $12$ randomly selected Form 6 learners at a Harare school are:
${d18.join(", ")}.
Masses are assumed to be normally distributed.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Calculate the sample mean and an unbiased estimate of the population variance, each correct to 3 significant figures.", template: "mean = {{blank:m}} kg, variance = {{blank:v}} kg²",
        blanks: [NB("m", m18, undefined, 1), NB("v", v18, f3((v18 * 11) / 12), 2)],
        explanation: t`$\sum x = ${d18.reduce((a, c) => a + c, 0)}$, $\sum x^2 = ${d18.reduce((a, c) => a + c * c, 0)}$. $\bar{x} = ${f4(m18)}$; $s^2 = \frac{1}{11}\left(${d18.reduce((a, c) => a + c * c, 0)} - \frac{${d18.reduce((a, c) => a + c, 0)}^2}{12}\right) = ${f4(v18)}$.` }),
      P.fib({ label: "(b)", marks: 4, stem: "Find a 95% confidence interval for the population mean mass, giving the limits correct to 3 significant figures.", template: "{{blank:lo}} kg to {{blank:hi}} kg",
        blanks: [NB("lo", m18 - h18, f3(m18 - (1.96 * s18) / sqrt(12)), 2), NB("hi", m18 + h18, f3(m18 + (1.96 * s18) / sqrt(12)), 2)],
        explanation: t`$\nu = 11$, $t_{11}(0.975) = ${T(11, 0.975)}$; half-width $${T(11, 0.975)} \times \frac{${f4(s18)}}{\sqrt{12}} = ${f4(h18)}$; interval $(${f3(m18 - h18)}, ${f3(m18 + h18)})$ kg.` }),
      P.num({ label: "(c)", marks: 3, stem: "A health officer claims the mean mass is 68 kg. Calculate the test statistic for a two-tailed t-test of this claim, correct to 3 significant figures.", value: ts18, wrong: [f3((m18 - 68) / s18)],
        explanation: t`$t = \frac{${f4(m18)} - 68}{${f4(s18)}/\sqrt{12}} = ${f3(ts18)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Using the 5% significance level, state the conclusion of the test in context, and explain how it agrees with the interval in (b).",
        points: [t`Critical values $\pm${T(11, 0.975)}$; $${f3(ts18)} > ${T(11, 0.975)}$, so reject $H_0$: evidence that the mean mass is not 68 kg.`, "68 lies outside the 95% interval, which is equivalent to rejecting H₀: μ = 68 in a two-tailed 5% test."],
        modelAnswer: t`$|t| = ${f3(ts18)} > ${T(11, 0.975)}$, so reject $H_0$ at the 5% level: there is evidence that the mean mass of Form 6 learners differs from 68 kg. This agrees with (b): $68$ is not inside $(${f3(m18 - h18)}, ${f3(m18 + h18)})$.`,
        explanation: "A two-tailed 5% test rejects exactly the values outside the 95% interval." }),
      P.manual({ label: "(e)", marks: 2, stem: "State, with a reason, whether the conclusion would change at the 1% significance level.",
        points: [t`The 1% critical value is $${T(11, 0.995)}$.`, t`$${f3(ts18)} < ${T(11, 0.995)}$, so $H_0$ would not be rejected at 1%: the conclusion changes.`],
        modelAnswer: t`At 1%, the critical values are $\pm${T(11, 0.995)}$ and $|t| = ${f3(ts18)}$ is smaller, so $H_0$ is not rejected: the evidence is significant at 5% but not at 1% (two-tailed p-value about $${f3(p18)}$).`,
        explanation: "Compare the same statistic with the stricter critical value." }),
    ],
    explanation: "Summarise the data, build the t-interval, then test using the same distribution.",
    hints: ["ν = 11 throughout.", "A value outside the 95% interval is rejected by a two-tailed 5% test."],
  });
  if (!(ts18 > tTable(11, 0.975) && ts18 < tTable(11, 0.995))) throw new Error("q18 conclusions do not hold");
  if (!(t17 < -c17)) throw new Error("q17 conclusion does not hold");

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "The t statistic", t`$T = \dfrac{\bar{X} - \mu}{S/\sqrt{n}} \sim t_{n-1}$ for a random sample from a normal population with unknown variance.`);
  b.card("DEFINITION", "Degrees of freedom (one sample)", t`$\nu = n - 1$: one degree of freedom is used in estimating the mean.`);
  b.card("FACT", "Shape of the t-distribution", "Symmetrical about 0, bell-shaped, heavier tails than N(0, 1); tends to N(0, 1) as ν increases.");
  b.card("FORMULA", "t confidence interval for a mean", t`$\bar{x} \pm t_{n-1}\,\dfrac{s}{\sqrt{n}}$, with $s^2 = \dfrac{1}{n - 1}\left(\sum x^2 - \dfrac{(\sum x)^2}{n}\right)$.`);
  b.card("FORMULA", "One-sample t-test statistic", t`$t = \dfrac{\bar{x} - \mu_0}{s/\sqrt{n}}$, compared with the $t_{n-1}$ critical value.`);
  b.card("CONCEPT", "Reading t tables", "A 95% interval or two-tailed 5% test uses t_ν(0.975); a one-tailed 5% test uses t_ν(0.95).");
  b.card("CONCEPT", "t or z for a mean?", "σ known → z. σ unknown, large n → z with s (CLT). σ unknown, small n, normal population → t with n − 1 degrees of freedom.");
  b.card("FACT", "Assumptions of a t-test", "Normal population; random sample of independent observations.");
});
