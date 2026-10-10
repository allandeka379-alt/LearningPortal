// W3b: amaths.inference.normal-mean-test (ZIMSEC Statistics F5 6.8.1; Cambridge P6 6.5)
import { concept, P, t, chk, sfStr, est, normalProb, Phi } from "../lib.mjs";

const { sqrt, ceil } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);

concept("amaths.inference.normal-mean-test", { file: "inference/normal-mean-test", keyPrefix: "inference.normal-mean-test" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A test of $H_0: \mu = \mu_0$ uses a random sample of size $n$ from a normal population with known standard deviation $\sigma$. What is the test statistic?`,
    options: [
      [t`$z = \dfrac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$`, "Correct: the sample mean standardised using its own standard deviation σ/√n."],
      [t`$z = \dfrac{\bar{x} - \mu_0}{\sigma}$`, "This uses the standard deviation of one observation, not of the sample mean."],
      [t`$z = \dfrac{\bar{x} - \mu_0}{\sigma/n}$`, t`The standard deviation of $\bar{X}$ is $\sigma/\sqrt{n}$, not $\sigma/n$.`],
      [t`$z = \dfrac{\mu_0 - \sigma}{\bar{x}/\sqrt{n}}$`, "The quantities are in the wrong places."],
    ],
    answer: "A",
    explanation: t`Under $H_0$, $\bar{X} \sim \mathrm{N}\left(\mu_0, \frac{\sigma^2}{n}\right)$, so $Z = \frac{\bar{X} - \mu_0}{\sigma/\sqrt{n}} \sim \mathrm{N}(0, 1)$.`,
  });

  const z2 = (52.1 - 50) / (6 / 6);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A sample of 36 observations from a normal population with standard deviation 6 has mean 52.1. Calculate the test statistic $z$ for testing $H_0: \mu = 50$.`,
    value: z2, wrong: [2.1 / 6, 2.1 / (6 / 36)],
    explanation: t`$z = \frac{52.1 - 50}{6/\sqrt{36}} = \frac{2.1}{1} = 2.1$. (0.35 divides by $\sigma$ instead of $\frac{\sigma}{\sqrt{n}}$.)`,
  });

  const pv3 = normalProb(0, 1, 2.1, Infinity);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`In an upper-tailed z-test, the test statistic is $z = 2.1$. Find the p-value, correct to 3 significant figures, and state whether the result is significant at the 1% level.`,
    value: pv3.exact, tol: pv3.tol, wrong: [Phi(2.1), 2 * pv3.exact],
    explanation: t`From tables $\Phi(2.1) = 0.9821$, so the p-value is $1 - 0.9821 = 0.0179$. Since $0.0179 > 0.01$, the result is **not** significant at the 1% level (although it is at 5%).`,
    hints: [t`p-value $= \mathrm{P}(Z \ge 2.1)$.`],
  });
  chk(Math.round(Phi(2.1) * 10000) / 10000, 0.9821);

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A two-tailed test of $H_0: \mu = 80$ at the 5% significance level gives $z = -1.83$. What is the correct conclusion?`,
    options: [
      [t`Do not reject $H_0$, because $|{-1.83}| < 1.96$.`, "Correct: the two-tailed 5% critical values are ±1.96."],
      [t`Reject $H_0$, because $-1.83 < -1.645$.`, "1.645 is the one-tailed critical value; a two-tailed test uses 1.96."],
      [t`Reject $H_0$, because $z$ is negative.`, "The sign shows the direction, not the significance."],
      [t`Do not reject $H_0$, because $-1.83 < 1.96$.`, "Compare |z| with 1.96, or z with −1.96 for the lower tail."],
    ],
    answer: "A",
    explanation: t`For a two-tailed 5% test, reject $H_0$ if $z < -1.96$ or $z > 1.96$. Here $-1.96 < -1.83 < 1.96$.`,
    hints: ["Which critical value applies to a two-tailed 5% test?"],
  });

  const se5 = 4 / sqrt(25);
  const lo5 = 120 - 2.576 * se5, hi5 = 120 + 2.576 * se5;
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A normal population has standard deviation 4. A test of $H_0: \mu = 120$ against $H_1: \mu \ne 120$ at the 1% level uses a sample of 25. Find the critical region for $\bar{x}$: reject $H_0$ if $\bar{x} < a$ or $\bar{x} > b$. Give $a$ and $b$ correct to 4 significant figures.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [D("a", sfStr(lo5, 4), 0.005, sfStr(120 - 1.96 * se5, 4)), D("b", sfStr(hi5, 4), 0.005, sfStr(120 + 1.96 * se5, 4))],
    explanation: t`Standard deviation of $\bar{X}$: $\frac{4}{5} = 0.8$. Two-tailed 1%: $z = \pm 2.576$. $a = 120 - 2.576 \times 0.8 = ${s(lo5)}$, $b = 120 + 2.576 \times 0.8 = ${s(hi5)}$, i.e. $${sfStr(lo5, 4)}$ and $${sfStr(hi5, 4)}$.`,
    hints: ["Two-tailed 1%: 0.5% in each tail."],
  });

  const e6 = est(60, 2940, 145200);
  const z6 = (e6.mean - 50) / sqrt(e6.s2 / 60);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The masses, $x$ kg, of 60 randomly chosen sacks of fertiliser at a depot in Chinhoyi give $\sum x = 2940$ and $\sum x^2 = 145200$. Test $H_0: \mu = 50$ against $H_1: \mu < 50$. Calculate the test statistic $z$, correct to 3 significant figures, using an unbiased estimate of the variance.`,
    value: z6, wrong: [(e6.mean - 50) / sqrt((145200 - 2940 ** 2 / 60) / 60 / 60), (e6.mean - 50) / sqrt(e6.s2)],
    explanation: t`$\bar{x} = 49$, $s^2 = \frac{1}{59}\left(145200 - \frac{2940^2}{60}\right) = \frac{1140}{59} = ${s(e6.s2)}$. The sample is large, so $z = \frac{49 - 50}{\sqrt{${s(e6.s2)}/60}} = ${s(z6)}$, i.e. $${sfStr(z6)}$. Since $${sfStr(z6)} < -1.645$, this is significant at the 5% level.`,
    workedSolution: t`1. $\bar{x} = \frac{2940}{60} = 49$.
2. $s^2 = \frac{1}{59}(145200 - 144060) = ${s(e6.s2)}$.
3. Standard error $= \sqrt{\frac{${s(e6.s2)}}{60}} = ${s(sqrt(e6.s2 / 60))}$.
4. $z = \frac{49 - 50}{${s(sqrt(e6.s2 / 60))}} = ${sfStr(z6)}$.`,
    hints: ["Estimate σ² with the divisor n − 1.", "The large sample justifies using s in place of σ."],
  });
  chk(2940 ** 2 / 60, 144060, 1e-9);

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "For a large sample from a population of unknown distribution and unknown variance, a z-test for the mean can be carried out using the sample estimate s in place of σ.",
    answer: true,
    explanation: "By the central limit theorem the sample mean is approximately normal for large n, and s is then a good estimate of σ.",
  });

  b.tf({
    d: 2, skill: "RECALL", calculator: false, daily: true,
    stem: "The critical value of z for a two-tailed test at the 5% significance level is 1.645.",
    answer: false,
    explanation: t`For a two-tailed 5% test the critical values are $\pm 1.96$ (2.5% in each tail). 1.645 is the one-tailed 5% value.`,
  });

  const x9 = 300 + 1.645 * (15 / sqrt(40));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A test of $H_0: \mu = 300$ against $H_1: \mu > 300$ at the 5% level uses a sample of 40 from a normal population with standard deviation 15. Find the largest value of the sample mean for which $H_0$ is not rejected, correct to 4 significant figures.`,
    value: x9, sf: 4, wrong: [300 + 1.96 * (15 / sqrt(40)), 300 + 1.645 * 15],
    explanation: t`$H_0$ is not rejected while $\frac{\bar{x} - 300}{15/\sqrt{40}} \le 1.645$: $\bar{x} \le 300 + 1.645 \times ${s(15 / sqrt(40))} = ${s(x9)}$, i.e. $${sfStr(x9, 4)}$.`,
    hints: ["Set z equal to the critical value and solve for the sample mean."],
  });

  const n10 = ceil((1.645 * 8 / 2) ** 2);
  chk(n10, 44);
  chk((2 / (8 / sqrt(44))) > 1.645 && (2 / (8 / sqrt(43))) < 1.645 ? 1 : 0, 1);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A population is normal with standard deviation 8. A sample of size $n$ has mean 2 units above the value $\mu_0$ in $H_0$. Find the smallest $n$ for which this result would be significant in an upper-tailed test at the 5% level.`,
    value: n10, wrong: [43, 62],
    explanation: t`Need $\frac{2}{8/\sqrt{n}} > 1.645$, so $\sqrt{n} > 6.58$ and $n > 43.3$. The smallest integer is $n = 44$. (62 uses 1.96, the two-tailed value.)`,
    hints: [t`Solve $\frac{2\sqrt{n}}{8} > 1.645$.`],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each alternative hypothesis (tested at the 5% level with a z statistic) with its critical region.",
    pairs: [
      [t`$H_1: \mu > \mu_0$`, t`$z > 1.645$`],
      [t`$H_1: \mu < \mu_0$`, t`$z < -1.645$`],
      [t`$H_1: \mu \ne \mu_0$`, t`$|z| > 1.96$`],
    ],
    extraRight: [t`$|z| > 1.645$`],
    explanation: "One-tailed tests put all 5% in one tail; the two-tailed test puts 2.5% in each.",
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Packets of sugar from a refinery in Chiredzi are labelled 500 g. A consumer group suspects that the mean mass is less than this. Which hypotheses should be tested?",
    options: [
      [t`$H_0: \mu = 500$, $H_1: \mu < 500$`, "Correct: a lower-tail test of the labelled mean."],
      [t`$H_0: \mu = 500$, $H_1: \mu \ne 500$`, "The group suspects a specific direction (less)."],
      [t`$H_0: \mu < 500$, $H_1: \mu = 500$`, "The null hypothesis must be the single value 500."],
      [t`$H_0: \mu = 500$, $H_1: \mu > 500$`, "The suspicion is that packets are underweight."],
    ],
    answer: "A",
    explanation: "The claim being questioned (500 g) is H₀; the suspected direction is H₁.",
    hints: ["Which direction does the consumer group suspect?"],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A z-test on the mean daily water use of 80 households used the central limit theorem. Explain why the theorem was needed and why it applies.",
    points: [
      "The distribution of daily water use is not known to be normal, so the sample mean cannot be assumed to be exactly normal.",
      "The sample of 80 is large, so by the central limit theorem the sample mean is approximately normal, which justifies the z-test.",
    ],
    modelAnswer: "The z-test needs the sample mean to be normally distributed. Household water use is probably skewed, not normal, but with 80 households the central limit theorem says that the sample mean is approximately normal.",
    explanation: "State both the reason it is needed (population not known to be normal) and why it applies (large n).",
    hints: ["What must be normal for a z-test?"],
  });

  const z14 = (17.6 - 18.5) / (2.4 / sqrt(30));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The times taken to serve customers at a Harare bank are normally distributed with standard deviation 2.4 minutes. After a new system is introduced, a random sample of 30 customers has a mean service time of 17.6 minutes. Calculate the test statistic $z$ for $H_0: \mu = 18.5$ against $H_1: \mu < 18.5$, correct to 3 significant figures.`,
    value: z14, wrong: [(17.6 - 18.5) / 2.4, (18.5 - 17.6) / (2.4 / sqrt(30))],
    explanation: t`$z = \frac{17.6 - 18.5}{2.4/\sqrt{30}} = \frac{-0.9}{${s(2.4 / sqrt(30))}} = ${s(z14)}$, i.e. $${sfStr(z14)}$. Since $${sfStr(z14)} < -1.645$, there is evidence at the 5% level that the mean service time has decreased.`,
    hints: ["Standardise using σ/√n.", "Keep the sign: the test is lower-tailed."],
  });

  b.mcq({
    d: 4, skill: "EVALUATION", calculator: false,
    stem: t`In an upper-tailed z-test, $z = 2.05$. Which statement is correct?`,
    options: [
      [t`$H_0$ is rejected at the 5% level but not at the 1% level.`, t`Correct: $1.645 < 2.05 < 2.326$.`],
      [t`$H_0$ is rejected at both the 5% and the 1% levels.`, "The one-tailed 1% critical value is 2.326, which 2.05 does not exceed."],
      [t`$H_0$ is rejected at neither level.`, "2.05 exceeds the 5% critical value 1.645."],
      [t`$H_0$ is rejected at the 1% level but not at the 5% level.`, "Anything significant at 1% is also significant at 5%."],
    ],
    answer: "A",
    explanation: "A smaller significance level needs a more extreme test statistic; results significant at 1% are always significant at 5%.",
    hints: ["Compare 2.05 with 1.645 and 2.326."],
  });

  // ---------------------------------------------------------------- structured (5 marks)
  const z16 = (1012 - 1000) / (40 / sqrt(50));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The lifetimes of a brand of bulb are normally distributed with mean 1000 hours and standard deviation 40 hours. After a change in the filament, a random sample of 50 bulbs has mean lifetime 1012 hours. Test, at the 5% level, whether the mean lifetime has increased.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the test statistic z, correct to 3 significant figures.", value: z16, wrong: [12 / 40],
        explanation: t`$z = \frac{1012 - 1000}{40/\sqrt{50}} = ${s(z16)}$.` }),
      P.manual({ label: "(b)", marks: 3, stem: "State the hypotheses and complete the test, giving your conclusion in context.",
        points: [t`$H_0: \mu = 1000$, $H_1: \mu > 1000$.`, `Compares ${sfStr(z16)} > 1.645 and rejects H₀.`, "There is evidence at the 5% level that the mean lifetime has increased."],
        modelAnswer: `H₀: μ = 1000, H₁: μ > 1000. z = ${sfStr(z16)} > 1.645, so reject H₀: there is evidence at the 5% level that the change has increased the mean lifetime of the bulbs.`,
        explanation: "Hypotheses, comparison, conclusion in context." }),
    ],
    explanation: "Standardise the sample mean with σ/√n and compare with the one-tailed critical value 1.645.",
    hints: ["Use σ/√n.", "Upper-tailed 5%: 1.645."],
  });

  // ---------------------------------------------------------------- structured (13 marks)
  const e17 = est(100, 4720, 224300);
  const se17 = sqrt(e17.s2 / 100);
  const z17 = (e17.mean - 48) / se17;
  const p17 = 2 * (1 - Phi(Math.abs(z17)));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A tea estate in Chipinge states that its pickers harvest a mean of 48 kg of tea leaves per day. A manager records the daily harvest, $x$ kg, of 100 randomly chosen pickers: $\sum x = 4720$ and $\sum x^2 = 224300$. She tests, at the 5% level, whether the mean daily harvest is different from 48 kg.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find unbiased estimates of the population mean and variance, giving the variance correct to 3 significant figures.", template: "mean = {{blank:m}} kg, variance = {{blank:v}}",
        blanks: [D("m", 47.2, 0.001, "4720", 1), D("v", sfStr(e17.s2), 0.05, sfStr((224300 - 4720 ** 2 / 100) / 100), 2)],
        explanation: t`$\bar{x} = 47.2$; $s^2 = \frac{1}{99}\left(224300 - \frac{4720^2}{100}\right) = \frac{1516}{99} = ${s(e17.s2)}$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "State the hypotheses and explain why a z-test may be used although the distribution of daily harvests is unknown.",
        points: [t`$H_0: \mu = 48$, $H_1: \mu \ne 48$.`, "n = 100 is large, so by the central limit theorem the sample mean is approximately normal (and s² estimates σ² well)."],
        modelAnswer: t`$H_0: \mu = 48$, $H_1: \mu \ne 48$. The sample is large, so the central limit theorem makes $\bar{X}$ approximately normal.`,
        explanation: "Two-tailed: 'different from'." }),
      P.num({ label: "(c)", marks: 3, stem: "Calculate the test statistic z, correct to 3 significant figures.", value: z17, wrong: [(47.2 - 48) / sqrt(e17.s2)],
        explanation: t`$z = \frac{47.2 - 48}{\sqrt{${s(e17.s2)}/100}} = \frac{-0.8}{${s(se17)}} = ${s(z17)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Complete the test, giving your conclusion in context.",
        points: [`|z| = ${sfStr(Math.abs(z17))} > 1.96 (or z < −1.96), so reject H₀.`, "There is evidence at the 5% level that the mean daily harvest is different from 48 kg."],
        modelAnswer: `z = ${sfStr(z17)} < −1.96, so reject H₀. There is evidence at the 5% level that the pickers' mean daily harvest differs from 48 kg (it appears to be lower).`,
        explanation: "Compare with ±1.96." }),
      P.num({ label: "(e)", marks: 2, stem: "Find the p-value of the test, correct to 2 significant figures.", value: p17, sf: 2, tol: 0.0015, answer: sfStr(p17, 2), wrong: [p17 / 2],
        explanation: t`Two-tailed: $2 \times \mathrm{P}(Z < ${sfStr(z17)}) = ${s(p17)}$, about $${sfStr(p17, 2)}$.` }),
      P.mcq({ label: "(f)", marks: 1, stem: "Would the conclusion be the same at the 1% level?",
        options: [
          ["No: the p-value exceeds 0.01, so H₀ would not be rejected.", "Correct."],
          ["Yes: the p-value is less than 0.05, so H₀ is still rejected.", "At 1% the comparison is with 0.01."],
          ["Yes: a smaller significance level makes rejection easier.", "A smaller level makes rejection harder."],
          ["No: a test at the 1% level must always be one-tailed.", "Any level can be one- or two-tailed."],
        ], answer: "A", explanation: `p = ${sfStr(p17, 2)} > 0.01 (|z| < 2.576).` }),
    ],
    explanation: "Large-sample z-test: estimate σ² from the sums, use the central limit theorem, compare with ±1.96 and interpret.",
    hints: ["Divide by n − 1 for the variance.", "Two-tailed 5%: ±1.96."],
  });
  chk(Math.abs(z17) > 1.96 && Math.abs(z17) < 2.576 ? 1 : 0, 1);

  // ---------------------------------------------------------------- flashcards
  b.card("FORMULA", "z-test statistic for a mean", t`$z = \dfrac{\bar{x} - \mu_0}{\sigma/\sqrt{n}}$`);
  b.card("CONCEPT", "When a z-test for a mean is valid", "Normal population with known σ (any n), or a large sample (central limit theorem, s in place of σ).");
  b.card("FACT", "Critical values at 5%", "One-tailed: 1.645. Two-tailed: ±1.96.");
  b.card("FACT", "Critical values at 1%", "One-tailed: 2.326. Two-tailed: ±2.576.");
  b.card("CONCEPT", "Critical region for the sample mean", t`Reject $H_0$ if $\bar{x} > \mu_0 + z\frac{\sigma}{\sqrt{n}}$ (upper tail); similarly for the lower tail.`);
  b.card("CONCEPT", "Comparing probabilities instead", t`Find the p-value $\mathrm{P}(\bar{X} \ge \bar{x})$ under $H_0$ and compare with the significance level.`);
  b.card("CONCEPT", "Effect of the significance level", "Significant at 1% ⟹ significant at 5%, but not the other way round.");
  b.card("CONCEPT", "Conclusion wording", "'There is (in)sufficient evidence at the 5% level that the mean … has increased/decreased/changed.'");
  b.card("FACT", "Hypotheses are about μ", t`Never write $H_0: \bar{x} = \dots$; hypotheses concern the population parameter.`);
});
