// W3b: amaths.estimation.confidence-intervals (ZIMSEC Statistics F6 6.7.2; Cambridge P6 6.4)
import { concept, P, t, chk, sfStr, dpStr, ciMean, ciProp, est, zCrit, Phi, invPhi } from "../lib.mjs";

const { sqrt, ceil } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const s3 = (x) => sfStr(x, 3);

concept("amaths.estimation.confidence-intervals", { file: "estimation/confidence-intervals", keyPrefix: "estimation.confidence-intervals" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`A 95% confidence interval for a population mean $\mu$ is calculated from a random sample. Which statement best describes what "95% confidence" means?`,
    options: [
      [t`In repeated sampling, about 95% of the intervals found would contain $\mu$.`, "Correct: the 95% describes the long-run success rate of the method."],
      [t`About 95% of the individual sample values lie inside the interval.`, "The interval estimates the mean; it does not contain 95% of individual values."],
      [t`The value of $\mu$ varies, and lies in this interval 95% of the time.`, t`$\mu$ is a fixed number; it is the interval that varies from sample to sample.`],
      [t`The sample mean has a 95% chance of lying inside the interval.`, "The sample mean is always at the centre of its own interval."],
    ],
    answer: "A",
    explanation: "A confidence interval is a random interval: before sampling, the probability that it will contain μ is 0.95. Once calculated, it either contains μ or it does not.",
  });

  const c3 = ciMean(48.3, 6, 36, 95);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`The heights of maize plants in a field are normally distributed with standard deviation 6 cm. A random sample of 36 plants has mean height 48.3 cm. Find a 95% confidence interval for the population mean height, giving the limits correct to 4 significant figures.`,
    template: "{{blank:lo}} cm to {{blank:hi}} cm",
    blanks: [D("lo", sfStr(c3.lo, 4), 0.005, "38.5"), D("hi", sfStr(c3.hi, 4), 0.005, "58.1")],
    explanation: t`$48.3 \pm 1.96 \times \frac{6}{\sqrt{36}} = 48.3 \pm 1.96$, giving $(${sfStr(c3.lo, 4)}, ${sfStr(c3.hi, 4)})$. (Using 6 instead of $\frac{6}{\sqrt{36}}$ gives a far too wide interval, about $(36.5, 60.1)$.)`,
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false, daily: true,
    stem: "What value of z is used for a 90% confidence interval for a mean?",
    options: [
      ["1.645", t`Correct: $\Phi(1.645) = 0.95$, leaving 5% in each tail.`],
      ["1.282", t`$\Phi(1.282) = 0.9$; that leaves 10% in one tail, for an 80% interval.`],
      ["1.96", "1.96 is used for a 95% interval."],
      ["2.576", "2.576 is used for a 99% interval."],
    ],
    answer: "A",
    explanation: t`A 90% interval leaves 5% in each tail, so $z = \Phi^{-1}(0.95) = 1.645$.`,
  });

  const e4 = est(80, 2960, 112000);
  const c4 = ciMean(e4.mean, sqrt(e4.s2), 80, 99);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The daily sales, $x$ litres, of milk at a dairy shop in Marondera are recorded on 80 randomly chosen days: $\sum x = 2960$ and $\sum x^2 = 112000$. Find a 99% confidence interval for the population mean daily sales, giving the limits correct to 3 significant figures.`,
    template: "{{blank:lo}} litres to {{blank:hi}} litres",
    blanks: [D("lo", s3(c4.lo), 0.05, s3(ciMean(e4.mean, sqrt(e4.s2), 80, 95).lo)), D("hi", s3(c4.hi), 0.05, s3(ciMean(e4.mean, sqrt(e4.s2), 80, 95).hi))],
    explanation: t`$\bar{x} = 37$, $s^2 = \frac{1}{79}\left(112000 - \frac{2960^2}{80}\right) = ${s(e4.s2)}$. The sample is large, so by the central limit theorem: $37 \pm 2.576\sqrt{\frac{${s(e4.s2)}}{80}} = 37 \pm ${s(c4.hi - 37)}$, giving $(${s3(c4.lo)}, ${s3(c4.hi)})$. (1.96 gives the 95% interval.)`,
    hints: ["Estimate σ² with the divisor n − 1.", "For 99%, z = 2.576."],
  });

  const c5 = ciProp(84 / 240, 240, 95);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`In a random sample of 240 voters in Masvingo, 84 said they listen to a particular radio station. Find an approximate 95% confidence interval for the proportion of all voters who listen to the station, giving the limits correct to 3 significant figures.`,
    template: "{{blank:lo}} to {{blank:hi}}",
    blanks: [D("lo", s3(c5.lo), 0.0005, "0.34"), D("hi", s3(c5.hi), 0.0005, "0.36")],
    explanation: t`$\hat{p} = \frac{84}{240} = 0.35$. Standard error $\sqrt{\frac{0.35 \times 0.65}{240}} = ${s(c5.se)}$. Interval: $0.35 \pm 1.96 \times ${s(c5.se)} = 0.35 \pm ${s(1.96 * c5.se)}$, giving $(${s3(c5.lo)}, ${s3(c5.hi)})$.`,
    hints: [t`Use $\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$ for the standard error.`],
  });

  const n6 = ceil((1.96 * 5) ** 2);
  chk(n6, 97);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`A population has standard deviation 5. Find the smallest sample size for which a 95% confidence interval for the population mean has a total width of at most 2.`,
    value: n6, wrong: [96, 25],
    explanation: t`Width $= 2 \times 1.96 \times \frac{5}{\sqrt{n}} \le 2$, so $\sqrt{n} \ge 9.8$ and $n \ge 96.04$. The smallest integer is $97$. (96 rounds down and gives a width just over 2; 25 leaves out the factor 1.96.)`,
    hints: ["The width is twice 1.96σ/√n.", "Round up."],
  });

  // given interval (73.62, 76.38) from n = 50, σ = 5 → level
  const z7 = 1.38 / (5 / sqrt(50));
  const lvl7 = (2 * Phi(z7) - 1) * 100;
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A symmetric confidence interval for a population mean, using a known standard deviation of 5 and a sample of size 50, is $(73.62, 76.38)$. Find the confidence level of the interval, as a percentage correct to the nearest whole number.`,
    value: lvl7, dp: 0, tol: 0.5, answer: String(Math.round(lvl7)), wrong: [Phi(z7) * 100],
    explanation: t`Half-width $= 1.38 = z \times \frac{5}{\sqrt{50}}$, so $z = ${s(z7)}$. Then $2\Phi(${sfStr(z7, 3)}) - 1 = ${s((2 * Phi(z7) - 1))}$, a $${Math.round(lvl7)}\%$ confidence interval. ($\Phi(z)$ alone, $${Math.round(Phi(z7) * 100)}\%$, forgets the second tail.)`,
    hints: ["Find z from the half-width.", "The level is the area between −z and z."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "From the same sample, a 98% confidence interval for the mean is wider than a 90% confidence interval.",
    answer: true,
    explanation: "A higher confidence level needs a larger z (2.326 instead of 1.645), so the interval must be wider to be more confident of containing μ.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If 20 separate 95% confidence intervals for a mean are calculated from independent random samples, on average 1 of them will not contain the population mean.",
    answer: true,
    explanation: t`Each interval misses $\mu$ with probability 0.05, so the expected number of misses is $20 \times 0.05 = 1$.`,
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A 95% confidence interval for a mean is calculated from a sample of size n. A second interval at the same level uses a sample of size 4n from the same population. How does the width of the second interval compare with the first (assuming the same standard deviation)?",
    options: [
      ["It is half as wide.", t`Correct: width is proportional to $\frac{1}{\sqrt{n}}$, and $\sqrt{4} = 2$.`],
      ["It is a quarter as wide.", "The width depends on √n, not n."],
      ["It is twice as wide.", "Larger samples give narrower intervals."],
      ["It is the same width.", "The width depends on the sample size through the standard error."],
    ],
    answer: "A",
    explanation: t`Width $= 2z\frac{\sigma}{\sqrt{n}}$, so quadrupling $n$ halves the width.`,
    hints: ["How does the width depend on n?"],
  });

  // σ from a known interval: (41.2, 46.8) 95%, n = 25
  const sig11 = (2.8 * 5) / 1.96;
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A 95% confidence interval for a population mean, calculated from a random sample of 25 observations from a normal population with known standard deviation $\sigma$, is $(41.2, 46.8)$. Find the sample mean and $\sigma$, giving $\sigma$ correct to 3 significant figures.`,
    template: "sample mean = {{blank:m}}, σ = {{blank:s}}",
    blanks: [D("m", 44, 0.001, "5.6"), D("s", s3(sig11), 0.05, s3(2.8 / 1.96))],
    explanation: t`The mean is the midpoint: $\frac{41.2 + 46.8}{2} = 44$. Half-width $2.8 = 1.96 \times \frac{\sigma}{5}$, so $\sigma = \frac{14}{1.96} = ${s(sig11)}$, i.e. $${s3(sig11)}$. ($${s3(2.8 / 1.96)}$ forgets the $\sqrt{25}$.)`,
    hints: ["The interval is symmetric about the sample mean.", "Half-width = 1.96σ/√n."],
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A manufacturer claims that the mean lifetime of its batteries is 50 hours. A 95% confidence interval for the mean lifetime, from a random sample, is (46.1, 49.3) hours. What does the interval suggest?",
    options: [
      ["The claim is doubtful, because 50 lies outside the interval.", "Correct: all plausible values of the mean (at 95% confidence) are below 50 hours."],
      ["The claim is supported, because 50 is close to the upper limit.", "Being close is not enough: 50 is outside the interval."],
      ["The claim is proved false.", "A confidence interval gives evidence, not proof; there is a 5% risk with this method."],
      ["Nothing, because the interval does not contain the sample mean.", "The sample mean (47.7) is the centre of the interval."],
    ],
    answer: "A",
    explanation: "A value outside a 95% confidence interval would be rejected by a two-tailed test at the 5% level.",
    hints: ["Is 50 a plausible value of μ according to the interval?"],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`A 95% confidence interval for the mean mass of a population was calculated from a sample of 60 items. The population distribution is unknown and $\sigma$ was estimated from the sample. Explain why the central limit theorem was needed, and why it is valid here.`,
    points: [
      "The population is not known to be normal, so the sample mean is not known to be exactly normal; the interval formula needs the sample mean to be (approximately) normal.",
      "n = 60 is large, so by the central limit theorem the sample mean is approximately normal (and s is a good estimate of σ).",
    ],
    modelAnswer: "The interval x̄ ± 1.96s/√n relies on the sample mean being normally distributed. The population distribution is unknown, so this needs the central limit theorem, which applies because the sample of 60 is large.",
    explanation: "A normal population needs no central limit theorem; an unknown population needs a large sample.",
    hints: ["What must be normal for the interval formula to work?"],
  });

  const p14 = 0.95 ** 2;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Two independent 95% confidence intervals for the same population mean are calculated. Find the probability that both intervals contain the population mean, correct to 4 decimal places.",
    value: p14, dp: 4, wrong: [0.95, 0.9],
    explanation: t`Each interval contains $\mu$ with probability 0.95, independently: $0.95^2 = 0.9025$.`,
    hints: ["Independent events: multiply."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each confidence level with the value of z used in a two-sided confidence interval.",
    pairs: [["90%", "1.645"], ["95%", "1.96"], ["98%", "2.326"], ["99%", "2.576"]],
    explanation: t`For a $C\%$ interval, $z = \Phi^{-1}\left(\frac{1 + C/100}{2}\right)$: e.g. 98% leaves 1% in each tail, $z = \Phi^{-1}(0.99) = 2.326$.`,
  });
  chk(zCrit(98), 2.326); chk(Math.round(invPhi(0.99) * 1000) / 1000, 2.326);

  // ---------------------------------------------------------------- structured (5 marks)
  const e16 = est(50, 1215, 30150);
  const c16 = ciMean(e16.mean, sqrt(e16.s2), 50, 95);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The journey times, $x$ minutes, of 50 randomly chosen kombi trips from the city centre of Harare to Chitungwiza give $\sum x = 1215$ and $\sum x^2 = 30150$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find unbiased estimates of the population mean and variance, giving the variance correct to 3 significant figures.", template: "mean = {{blank:m}} min, variance = {{blank:v}}",
        blanks: [D("m", 24.3, 0.001, "1215"), D("v", s3(e16.s2), 0.05, s3((30150 - 1215 ** 2 / 50) / 50))],
        explanation: t`$\bar{x} = 24.3$; $s^2 = \frac{1}{49}\left(30150 - \frac{1215^2}{50}\right) = \frac{625.5}{49} = ${s(e16.s2)}$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find a 95% confidence interval for the population mean journey time, giving the limits correct to 3 significant figures.", template: "{{blank:lo}} min to {{blank:hi}} min",
        blanks: [D("lo", s3(c16.lo), 0.05, "17.3"), D("hi", s3(c16.hi), 0.05, "31.3")],
        explanation: t`$24.3 \pm 1.96\sqrt{\frac{${s(e16.s2)}}{50}} = 24.3 \pm ${s(c16.hi - 24.3)}$: $(${s3(c16.lo)}, ${s3(c16.hi)})$ minutes.` }),
    ],
    explanation: "Estimate the mean and variance from the sums, then use x̄ ± 1.96 s/√n (valid by the central limit theorem).",
    hints: ["Divide by n − 1 for the variance.", "Use the standard error s/√n."],
  });
  chk(1215 ** 2 / 50, 29524.5, 1e-9);

  // ---------------------------------------------------------------- structured (13 marks)
  const ph = 156 / 400;
  const c17 = ciProp(ph, 400, 90);
  const half17 = 1.645 * c17.se;
  const n17 = ceil((1.96 / 0.03) ** 2 * ph * (1 - ph));
  chk(1.96 * sqrt(ph * (1 - ph) / n17) <= 0.03 && 1.96 * sqrt(ph * (1 - ph) / (n17 - 1)) > 0.03 ? 1 : 0, 1);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A seed company tests a new maize variety. In a random sample of 400 plots in Mashonaland West, 156 plots produced more than 6 tonnes per hectare.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the sample proportion of plots producing more than 6 tonnes per hectare.", value: ph, dp: 2, tol: 0.0005, answer: "0.39", wrong: [156],
        explanation: t`$\hat{p} = \frac{156}{400} = 0.39$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find an approximate 90% confidence interval for the population proportion, giving the limits correct to 3 significant figures.", template: "{{blank:lo}} to {{blank:hi}}",
        blanks: [D("lo", s3(c17.lo), 0.0005, s3(ciProp(ph, 400, 95).lo)), D("hi", s3(c17.hi), 0.0005, s3(ciProp(ph, 400, 95).hi))],
        explanation: t`$0.39 \pm 1.645\sqrt{\frac{0.39 \times 0.61}{400}} = 0.39 \pm ${s(half17)}$: $(${s3(c17.lo)}, ${s3(c17.hi)})$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the interval in (b) is only approximate.",
        points: ["The distribution of the sample proportion is approximated by a normal distribution (valid because n is large).", t`The standard error uses the estimate $\hat{p}$ in place of the unknown $p$.`],
        modelAnswer: t`The number of successful plots is binomial; the interval uses a normal approximation to the distribution of $\hat{p}$ (justified by the large sample), and the standard error uses $\hat{p}$ instead of the unknown $p$.`,
        explanation: "Two sources of approximation: the normal model and the estimated standard error." }),
      P.mcq({ label: "(d)", marks: 1, stem: "The company claims that 45% of plots will produce more than 6 tonnes per hectare. Does the 90% interval support this claim?",
        options: [
          ["No, because 0.45 lies above the upper limit of the interval.", "Correct: 0.45 is not a plausible value at 90% confidence."],
          ["Yes, because 0.45 is close to 0.39.", "The interval, not closeness, decides plausibility."],
          ["Yes, because the interval is only approximate.", "The approximation is good for n = 400."],
          ["It cannot be judged from a confidence interval.", "Values outside the interval are not supported."],
        ], answer: "A", explanation: `The interval (${s3(c17.lo)}, ${s3(c17.hi)}) lies entirely below 0.45.` }),
      P.num({ label: "(e)", marks: 3, stem: "Using 0.39 as an estimate of the proportion, find the smallest sample size for which a 95% confidence interval would have a half-width of at most 0.03.", value: n17, wrong: [n17 - 1],
        explanation: t`$1.96\sqrt{\frac{0.39 \times 0.61}{n}} \le 0.03 \Rightarrow n \ge \left(\frac{1.96}{0.03}\right)^2 \times 0.2379 = ${sfStr((1.96 / 0.03) ** 2 * ph * (1 - ph), 6)}$, so $n = ${n17}$.` }),
      P.manual({ label: "(f)", marks: 3, stem: "The company takes 10 independent random samples and calculates a 90% confidence interval from each. Find the expected number of intervals that contain the true proportion, and explain what this tells you about a single interval.",
        points: ["Expected number = 10 × 0.9 = 9.", "Each interval contains p with probability 0.9 (before the data are collected).", "A single calculated interval either contains p or does not; the 90% describes the method's long-run success rate."],
        modelAnswer: "Each interval has probability 0.9 of containing p, so we expect 10 × 0.9 = 9 of them to contain it. For any single interval we cannot say whether it contains p; 90% is the proportion of such intervals that do in the long run.",
        explanation: "Confidence describes the procedure, not one interval." }),
    ],
    explanation: "Use p̂ ± z√(p̂(1 − p̂)/n), judge claims by whether they lie inside the interval, and solve for n by rounding up.",
    hints: ["For 90%, z = 1.645.", "Round the sample size up."],
  });

  // ---------------------------------------------------------------- flashcards
  b.card("FORMULA", "Confidence interval for μ (σ known, normal population)", t`$\bar{x} \pm z\frac{\sigma}{\sqrt{n}}$`);
  b.card("FORMULA", "Confidence interval for μ (large sample, σ unknown)", t`$\bar{x} \pm z\frac{s}{\sqrt{n}}$, valid by the central limit theorem`);
  b.card("FORMULA", "Approximate confidence interval for a proportion", t`$\hat{p} \pm z\sqrt{\frac{\hat{p}(1 - \hat{p})}{n}}$`, "Large n.");
  b.card("FACT", "z values for confidence intervals", "90%: 1.645; 95%: 1.96; 98%: 2.326; 99%: 2.576.");
  b.card("CONCEPT", "Meaning of a 95% confidence interval", t`In repeated sampling, about 95% of the intervals calculated would contain the true parameter.`);
  b.card("CONCEPT", "Width of a confidence interval", t`Width $= 2z\frac{\sigma}{\sqrt{n}}$: wider for higher confidence, narrower for larger $n$ (quadruple $n$ to halve it).`);
  b.card("CONCEPT", "Using an interval to judge a claim", "A claimed value outside the interval is not supported at that confidence level.");
  b.card("CONCEPT", "Finding the sample size", t`Solve $z\frac{\sigma}{\sqrt{n}} \le$ half-width for $n$, then round up.`);
  b.card("CONCEPT", "Midpoint and half-width", t`The sample mean is the midpoint of a symmetric interval; half-width $= z \times$ standard error.`);
});
