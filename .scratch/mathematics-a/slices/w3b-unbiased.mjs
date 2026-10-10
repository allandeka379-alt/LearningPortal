// W3b: amaths.estimation.unbiased (ZIMSEC Statistics F5 6.7.1; Cambridge P6 6.4)
import { concept, P, t, chk, sfStr, est, mean, s2, variance, sum, ZS } from "../lib.mjs";

const { sqrt } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const sq = (xs) => sum(xs.map((x) => x * x));

concept("amaths.estimation.unbiased", { file: "estimation/unbiased", keyPrefix: "estimation.unbiased" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "What does it mean to say that a statistic is an unbiased estimator of a population parameter?",
    options: [
      ["Its mean value over all possible samples equals the parameter.", "Correct: an unbiased estimator is right on average, although any one estimate may be too high or too low."],
      ["It always gives exactly the value of the parameter for any sample.", "Estimates vary from sample to sample; unbiased does not mean exact."],
      ["It is calculated from a sample that was chosen without any bias.", "A random sample is needed, but 'unbiased estimator' is about the formula's average value."],
      ["It has the smallest possible variance of all estimators.", "That describes an efficient estimator, a different property."],
    ],
    answer: "A",
    explanation: t`$T$ is an unbiased estimator of $\theta$ if $\mathrm{E}(T) = \theta$. $\bar{X}$ is unbiased for $\mu$, and $s^2$ (divisor $n - 1$) is unbiased for $\sigma^2$.`,
  });

  const d2 = [12.4, 13.1, 11.8, 12.9, 13.6];
  const v2 = s2(d2);
  chk(v2, 0.473, 1e-9);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`The masses, in kg, of five randomly chosen pockets of potatoes are 12.4, 13.1, 11.8, 12.9 and 13.6. Find an unbiased estimate of the population variance, correct to 3 significant figures.`,
    value: v2, wrong: [variance(d2), sqrt(v2)],
    explanation: t`$\bar{x} = ${mean(d2)}$, $\sum x^2 = ${s(sq(d2))}$. $s^2 = \frac{1}{4}\left(\sum x^2 - \frac{(\sum x)^2}{5}\right) = \frac{1}{4}\left(${s(sq(d2))} - \frac{63.8^2}{5}\right) = ${s(v2)}$. (Dividing by 5 gives the biased value $${sfStr(variance(d2))}$.)`,
  });

  const e3 = est(20, 310, 5100);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A random sample of 20 observations of $X$ gives $\sum x = 310$ and $\sum x^2 = 5100$. Find an unbiased estimate of the population variance, correct to 3 significant figures.`,
    value: e3.s2, wrong: [(5100 - 310 ** 2 / 20) / 20, 5100 / 19 - 15.5 ** 2],
    explanation: t`$s^2 = \frac{1}{19}\left(5100 - \frac{310^2}{20}\right) = \frac{1}{19}(5100 - 4805) = \frac{295}{19} = ${s(e3.s2)}$, so $${sfStr(e3.s2)}$. (Dividing by 20 gives $14.75$, the biased sample variance.)`,
  });

  const e4 = est(12, 30, 210);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The times, $x$ seconds, of 12 sprinters are summarised by $\sum (x - 50) = 30$ and $\sum (x - 50)^2 = 210$. Find unbiased estimates of the population mean and variance of the times, each correct to 3 significant figures.`,
    template: "mean = {{blank:m}} s, variance = {{blank:v}}",
    blanks: [D("m", 52.5, 0.05, "2.5"), D("v", sfStr(e4.s2), 0.05, "11.25")],
    explanation: t`Let $y = x - 50$: $\bar{y} = \frac{30}{12} = 2.5$, so $\bar{x} = 52.5$. Subtracting a constant does not change the variance: $s^2 = \frac{1}{11}\left(210 - \frac{30^2}{12}\right) = \frac{135}{11} = ${s(e4.s2)}$, so $${sfStr(e4.s2)}$. (2.5 forgets to add back 50; 11.25 divides by 12.)`,
    hints: ["Work with y = x − 50, then add 50 back to the mean only.", "Coding by subtraction does not change the variance."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`An unbiased estimate of the population variance from a sample of size $n$ uses the divisor $n - 1$.`,
    answer: true,
    explanation: t`$s^2 = \frac{1}{n - 1}\sum (x - \bar{x})^2 = \frac{1}{n - 1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A student estimates the population variance using the divisor n instead of n − 1. Over many samples, what happens to her estimates?",
    options: [
      ["On average they are too small.", t`Correct: $\mathrm{E}\left(\frac{1}{n}\sum (X - \bar{X})^2\right) = \frac{n - 1}{n}\sigma^2 < \sigma^2$.`],
      ["On average they are too large.", "Dividing by the larger number n makes the estimate smaller, not larger."],
      ["On average they are exactly right.", t`Only the divisor $n - 1$ gives estimates whose average is $\sigma^2$.`],
      ["They are always exactly right for large samples.", t`For large $n$ the bias is small but the estimates still vary from sample to sample.`],
    ],
    answer: "A",
    explanation: t`Deviations are measured from $\bar{x}$, which is closer to the data than $\mu$ is, so $\sum (x - \bar{x})^2$ tends to be too small; dividing by $n - 1$ corrects this.`,
  });

  const xs7 = [0, 1, 2, 3, 4];
  const fs7 = [14, 18, 11, 5, 2];
  const n7 = sum(fs7);
  const sx7 = sum(xs7.map((x, i) => x * fs7[i]));
  const sxx7 = sum(xs7.map((x, i) => x * x * fs7[i]));
  const e7 = est(n7, sx7, sxx7);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The numbers of goals scored by a football club in Harare in 50 randomly chosen matches are: 0 goals in 14 matches, 1 in 18, 2 in 11, 3 in 5 and 4 in 2. Find an unbiased estimate of the population variance of the number of goals per match, correct to 3 significant figures.`,
    value: e7.s2, wrong: [(sxx7 - sx7 ** 2 / n7) / n7, sqrt(e7.s2)],
    explanation: t`$n = ${n7}$, $\sum fx = ${sx7}$, $\sum fx^2 = ${sxx7}$. $s^2 = \frac{1}{49}\left(${sxx7} - \frac{${sx7}^2}{50}\right) = ${s(e7.s2)}$, so $${sfStr(e7.s2)}$.`,
    workedSolution: t`1. $\sum f = ${n7}$, $\sum fx = 0 + 18 + 22 + 15 + 8 = ${sx7}$.
2. $\sum fx^2 = 0 + 18 + 44 + 45 + 32 = ${sxx7}$.
3. $\bar{x} = \frac{${sx7}}{50} = ${s(e7.mean)}$.
4. $s^2 = \frac{1}{49}\left(${sxx7} - \frac{${sx7}^2}{50}\right) = \frac{${s(sxx7 - sx7 ** 2 / n7)}}{49} = ${s(e7.s2)}$, so $${sfStr(e7.s2)}$.`,
    hints: ["Use Σf, Σfx and Σfx².", "Divide by n − 1 = 49."],
  });
  chk(sx7, 63); chk(sxx7, 139);

  const k8 = [3.2, 2.8, 3.5, 4.1, 2.9, 3.6, 3.3, 3.0];
  chk(variance(k8), 0.16, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZS,
    stem: t`The daily rainfall, in mm, at a weather station in Chimanimani on 8 randomly chosen days is 3.2, 2.8, 3.5, 4.1, 2.9, 3.6, 3.3 and 3.0. Find the sample variance (divisor $n$) and an unbiased estimate of the population variance (divisor $n - 1$). Give the second correct to 3 significant figures.`,
    template: "sample variance = {{blank:a}}, unbiased estimate = {{blank:b}}",
    blanks: [D("a", 0.16, 0.0005, "0.183"), D("b", sfStr(s2(k8)), 0.0005, "0.16")],
    explanation: t`$\sum x = ${s(sum(k8))}$, $\sum x^2 = ${s(sq(k8))}$, $\bar{x} = 3.3$. Sample variance $= \frac{${s(sq(k8))}}{8} - 3.3^2 = 0.16$. Unbiased estimate $= \frac{8}{7} \times 0.16 = ${s(s2(k8))}$, so $${sfStr(s2(k8))}$.`,
    hints: [t`Unbiased estimate $= \frac{n}{n - 1} \times$ sample variance.`],
  });

  const nA = 10, sxA = 152, sxxA = 2350, nB = 15, sxB = 240, sxxB = 3900;
  const e9 = est(nA + nB, sxA + sxB, sxxA + sxxB);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Two random samples are taken from the same population. Sample A: $n = 10$, $\sum x = 152$, $\sum x^2 = 2350$. Sample B: $n = 15$, $\sum x = 240$, $\sum x^2 = 3900$. Combine the samples to find an unbiased estimate of the population variance, correct to 3 significant figures.`,
    value: e9.s2, wrong: [(est(nA, sxA, sxxA).s2 + est(nB, sxB, sxxB).s2) / 2, (6250 - 392 ** 2 / 25) / 25],
    explanation: t`Combined: $n = 25$, $\sum x = 392$, $\sum x^2 = 6250$. $s^2 = \frac{1}{24}\left(6250 - \frac{392^2}{25}\right) = ${s(e9.s2)}$, so $${sfStr(e9.s2)}$. (Averaging the two separate estimates, $${sfStr((est(nA, sxA, sxxA).s2 + est(nB, sxB, sxxB).s2) / 2)}$, ignores the different sample sizes and the difference between the sample means.)`,
    hints: ["Add the n's, the Σx's and the Σx²'s.", "Then use the usual formula with n − 1 = 24."],
  });

  const sxx10 = 9 * 4.5 + 10 * 144;
  chk(est(10, 120, sxx10).s2, 4.5, 1e-12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A random sample of 10 observations has mean 12, and an unbiased estimate of the population variance from the sample is 4.5. Find $\sum x^2$ for the sample.`,
    value: sxx10, dp: 1, wrong: [10 * 4.5 + 1440, 9 * 4.5 + 144],
    explanation: t`$s^2 = \frac{1}{9}\left(\sum x^2 - 10 \times 12^2\right) = 4.5$, so $\sum x^2 = 40.5 + 1440 = 1480.5$. (Using 10 instead of 9 gives 1485.)`,
    hints: [t`$\sum x = 10 \times 12 = 120$, so $\frac{(\sum x)^2}{n} = 1440$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The sample mean $\bar{X}$ is an unbiased estimator of the population mean $\mu$.`,
    answer: true,
    explanation: t`$\mathrm{E}(\bar{X}) = \mu$ for a random sample of any size.`,
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each quantity with its formula (sample of size n).",
    pairs: [
      ["unbiased estimate of the population mean", t`$\frac{\sum x}{n}$`],
      ["unbiased estimate of the population variance", t`$\frac{1}{n - 1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)$`],
      ["sample variance (divisor n)", t`$\frac{\sum x^2}{n} - \bar{x}^2$`],
      ["estimated standard error of the mean", t`$\sqrt{\frac{s^2}{n}}$`],
    ],
    explanation: t`The unbiased variance estimate is $\frac{n}{n - 1}$ times the sample variance; the standard error of the mean is estimated by $\frac{s}{\sqrt{n}}$.`,
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`From a sample of 5 values, an unbiased estimate of the population variance is 10. What is the sample variance with divisor $n$?`,
    options: [
      ["8", t`Correct: $\sum (x - \bar{x})^2 = 4 \times 10 = 40$, and $\frac{40}{5} = 8$.`],
      ["12.5", t`$10 \times \frac{5}{4}$ converts in the wrong direction.`],
      ["10", "The two divisors give different values."],
      ["2", "Dividing 10 by 5 confuses the variance with the variance of the mean."],
    ],
    answer: "A",
    explanation: t`Sample variance $= \frac{n - 1}{n}s^2 = \frac{4}{5} \times 10 = 8$.`,
    hints: [t`Find $\sum (x - \bar{x})^2$ first.`],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain what is meant by saying that $s^2 = \frac{1}{n - 1}\sum (x - \bar{x})^2$ is an unbiased estimate of $\sigma^2$, and why the divisor is $n - 1$ rather than $n$.`,
    points: [
      t`If many random samples were taken, the mean of all the values of $s^2$ would be $\sigma^2$ (i.e. $\mathrm{E}(S^2) = \sigma^2$).`,
      t`Deviations are measured from $\bar{x}$, not $\mu$, which makes $\sum (x - \bar{x})^2$ too small on average; dividing by $n - 1$ compensates.`,
    ],
    modelAnswer: t`Unbiased means that, over all possible samples, the average value of $s^2$ equals $\sigma^2$. The sum of squared deviations is taken about the sample mean, which is always the closest point to the data, so it underestimates the spread about $\mu$; dividing by $n - 1$ instead of $n$ corrects this exactly.`,
    explanation: "An unbiased estimator is correct on average, not in every sample.",
    hints: ["Think about the average over many samples."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Every value in a sample is increased by 5. What happens to the unbiased estimates of the population mean and variance?",
    options: [
      ["The mean estimate increases by 5; the variance estimate is unchanged.", "Correct: adding a constant shifts the data without changing their spread."],
      ["Both estimates increase by 5.", "The spread of the data does not change when every value shifts by the same amount."],
      ["The mean estimate increases by 5; the variance estimate increases by 25.", t`Variance is multiplied by $a^2$ only when values are multiplied by $a$.`],
      ["Neither estimate changes.", "The centre of the data moves up by 5."],
    ],
    answer: "A",
    explanation: t`For $y = x + 5$: $\bar{y} = \bar{x} + 5$ and $s_y^2 = s_x^2$. This is why coded sums such as $\sum (x - a)$ make calculations easier.`,
    hints: ["Which of the two measures depends on position, and which on spread?"],
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The values $x$ in a sample are converted using $y = 2x - 3$. The unbiased estimate of the variance of $x$ is 6. What is the unbiased estimate of the variance of $y$?`,
    options: [
      ["24", t`Correct: $s_y^2 = 2^2 s_x^2 = 4 \times 6 = 24$.`],
      ["9", t`$2 \times 6 - 3$ applies the transformation to the variance as if it were a value.`],
      ["12", "Multiplying the values by 2 multiplies the variance by 4, not 2."],
      ["21", t`$4 \times 6 - 3$: the constant $-3$ does not affect the variance.`],
    ],
    answer: "A",
    explanation: t`$\mathrm{Var}(aX + b) = a^2\mathrm{Var}(X)$, and the same holds for the estimates.`,
    hints: ["Constants added do not change the spread."],
  });

  // ---------------------------------------------------------------- structured (5 marks)
  const e17 = est(40, 1880, 89200);
  const se17 = sqrt(e17.s2 / 40);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The masses, $x$ grams, of 40 randomly chosen mangoes from an orchard in Mutoko are summarised by $\sum x = 1880$ and $\sum x^2 = 89200$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find unbiased estimates of the population mean and variance, each correct to 3 significant figures.", template: "mean = {{blank:m}} g, variance = {{blank:v}}",
        blanks: [D("m", 47, 0.05, "1880", 1), D("v", sfStr(e17.s2), 0.05, sfStr((89200 - 1880 ** 2 / 40) / 40), 2)],
        explanation: t`$\bar{x} = \frac{1880}{40} = 47$. $s^2 = \frac{1}{39}\left(89200 - \frac{1880^2}{40}\right) = \frac{1}{39}(89200 - 88360) = \frac{840}{39} = ${s(e17.s2)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Estimate the standard deviation of the sample mean (the standard error), correct to 3 significant figures.", value: se17, wrong: [e17.s2 / 40, sqrt(e17.s2)],
        explanation: t`$\sqrt{\frac{s^2}{n}} = \sqrt{\frac{${s(e17.s2)}}{40}} = ${s(se17)}$.` }),
    ],
    explanation: "Compute the mean and the unbiased variance from the sums, then the estimated standard error s/√n.",
    hints: ["Divide by n − 1 for the variance.", "Standard error = √(s²/n)."],
  });

  // ---------------------------------------------------------------- structured (12 marks)
  const k18 = [478.2, 477.9, 478.6, 478.1, 477.7, 478.4, 478.0, 478.3];
  const y18 = k18.map((x) => Math.round((x - 478) * 10) / 10);
  const sy = sum(y18), syy = sq(y18);
  chk(sy, 1.2, 1e-9); chk(syy, 0.76, 1e-9);
  const e18 = est(8, sy, syy);
  const n2 = 12, sy2 = 0.6, syy2 = 1.1;
  const e18c = est(8 + n2, sy + sy2, syy + syy2);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The water level of Lake Kariba, $x$ metres above sea level, was recorded on 8 randomly chosen days: 478.2, 477.9, 478.6, 478.1, 477.7, 478.4, 478.0, 478.3. Let $y = x - 478$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $\sum y$ and $\sum y^2$.`, template: "Σy = {{blank:a}}, Σy² = {{blank:b}}",
        blanks: [D("a", 1.2, 0.001, "3824.2"), D("b", 0.76, 0.001, "1.44")],
        explanation: t`$y$: $0.2, -0.1, 0.6, 0.1, -0.3, 0.4, 0, 0.3$. $\sum y = 1.2$; $\sum y^2 = 0.04 + 0.01 + 0.36 + 0.01 + 0.09 + 0.16 + 0 + 0.09 = 0.76$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find an unbiased estimate of the population mean water level, in metres.", value: 478 + sy / 8, tol: 0.001, answer: "478.15", unit: "m", wrong: [0.15],
        explanation: t`$\bar{y} = 0.15$, so $\bar{x} = 478.15$ m.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find an unbiased estimate of the population variance of the water level, correct to 3 significant figures.", value: e18.s2, wrong: [(syy - sy ** 2 / 8) / 8],
        explanation: t`$s^2 = \frac{1}{7}\left(0.76 - \frac{1.2^2}{8}\right) = \frac{0.58}{7} = ${s(e18.s2)}$, so $${sfStr(e18.s2)}$ m$^2$ (unchanged by the coding).` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why coding the data as y = x − 478 does not change the estimate of the variance, and why it is useful.",
        points: ["Subtracting a constant moves every value by the same amount, so the deviations from the mean (the spread) are unchanged.", "The coded values are small, which reduces arithmetic and rounding errors in Σy²."],
        modelAnswer: "Every level is reduced by 478, so all deviations from the mean are unchanged and so is the variance. The coded numbers are small, so squaring and adding them is quicker and avoids large-number rounding errors.",
        explanation: "Coding by subtraction changes the mean only." }),
      P.num({ label: "(e)", marks: 4, stem: t`On 12 further randomly chosen days the readings give $\sum y = 0.6$ and $\sum y^2 = 1.1$, with the same coding. Using all 20 readings, find an unbiased estimate of the population variance, correct to 3 significant figures.`, value: e18c.s2, wrong: [(e18.s2 + est(n2, sy2, syy2).s2) / 2],
        explanation: t`Combined: $n = 20$, $\sum y = 1.8$, $\sum y^2 = 1.86$. $s^2 = \frac{1}{19}\left(1.86 - \frac{1.8^2}{20}\right) = \frac{1.698}{19} = ${s(e18c.s2)}$, so $${sfStr(e18c.s2)}$.` }),
    ],
    explanation: "Code the data to simplify the sums, divide by n − 1 for the unbiased variance, and combine samples by adding their sums.",
    hints: ["Coding by subtraction leaves the variance unchanged.", "To combine samples, add the n's, Σy's and Σy²'s."],
  });

  // ---------------------------------------------------------------- flashcards
  b.card("DEFINITION", "Unbiased estimator", t`A statistic $T$ with $\mathrm{E}(T) = \theta$: correct on average over all samples.`);
  b.card("FORMULA", "Unbiased estimate of the population mean", t`$\bar{x} = \frac{\sum x}{n}$`);
  b.card("FORMULA", "Unbiased estimate of the population variance", t`$s^2 = \frac{1}{n - 1}\left(\sum x^2 - \frac{(\sum x)^2}{n}\right)$`, "Given in MF19 (Cambridge).");
  b.card("FORMULA", "Unbiased estimate from the sample variance", t`$s^2 = \frac{n}{n - 1} \times \left(\frac{\sum x^2}{n} - \bar{x}^2\right)$`);
  b.card("CONCEPT", "Why divide by n − 1", t`Deviations from $\bar{x}$ are smaller on average than deviations from $\mu$; the divisor $n - 1$ corrects this bias.`);
  b.card("CONCEPT", "Coded data", t`For $y = x - a$: $\bar{x} = \bar{y} + a$ and $s_x^2 = s_y^2$. For $y = \frac{x - a}{c}$: $s_x^2 = c^2 s_y^2$.`);
  b.card("CONCEPT", "Combining two samples", t`Add the $n$'s, the $\sum x$'s and the $\sum x^2$'s, then apply the formula once.`);
  b.card("FORMULA", "Estimated standard error of the mean", t`$\frac{s}{\sqrt{n}}$`);
});
