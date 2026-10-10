// W3b exam-format items for Cambridge 9709 Paper 6: C6s ×4 (6 marks), C6l ×5 (8 marks). Every value is computed here.
import { concept, P, t, chk, sfStr, poisson, normalProb, est, ciMean, criticalRegion, integrate, CAM } from "../lib.mjs";

const { sqrt, exp } = Math;
const Q = (k) => `amaths.${k}`;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const area = (f, a, b) => integrate(f, a, b, 20000);
const base = (marks) => ({ marks, secs: 90 * marks, examStyle: true, calculator: true, paper: "Paper 6" });

concept(Q("discrete.poisson"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C6s-1 (6): Poisson
  const a1 = poisson.pmf(2.3, 3);
  const b1 = 1 - poisson.cdf(2.3, 1);
  const c1 = poisson.cdf(6.9, 3);
  b.struct({
    d: 3, ...base(6), skill: "APPLICATION",
    concepts: [Q("discrete.poisson")],
    stem: "The number of punctures repaired per day at a roadside tyre stall in Masvingo has the distribution Po(2.3). Give probabilities correct to 3 significant figures.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the probability that exactly 3 punctures are repaired on a particular day.", value: a1, wrong: [poisson.cdf(2.3, 3)],
        explanation: t`$\mathrm{e}^{-2.3}\dfrac{2.3^3}{3!} = ${s(a1)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that at least 2 punctures are repaired on a particular day.", value: b1, wrong: [1 - poisson.cdf(2.3, 2)],
        explanation: t`$1 - \mathrm{e}^{-2.3}(1 + 2.3) = ${s(b1)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the probability that fewer than 4 punctures are repaired in total over 3 days.", value: c1, wrong: [poisson.cdf(6.9, 4), poisson.cdf(2.3, 3) ** 3],
        explanation: t`Over 3 days, $Y \sim \mathrm{Po}(6.9)$. $\mathrm{P}(Y \le 3) = \mathrm{e}^{-6.9}\left(1 + 6.9 + \frac{6.9^2}{2} + \frac{6.9^3}{6}\right) = ${s(c1)}$.` }),
    ],
    explanation: "Use Po(2.3) for one day and Po(6.9) for three days; 'at least 2' is 1 − P(X ≤ 1).",
    hints: ["Scale λ for three days.", "'Fewer than 4' means at most 3."],
  });

  // ---------------------------------------------------------------- C6s-2 (6): linear combinations
  const muW = 125 - 1.5 * 80, varW = 9 + 1.5 ** 2 * 4;
  chk(muW, 5); chk(varW, 18);
  const pW = normalProb(muW, sqrt(varW), 0, Infinity);
  b.struct({
    d: 4, ...base(6), skill: "ANALYSIS",
    concepts: [Q("rv.linear-combinations")],
    stem: t`The masses of avocados, $A$ grams, and of lemons, $B$ grams, sold at a market in Mutare are independent, with $A \sim \mathrm{N}(125, 9)$ and $B \sim \mathrm{N}(80, 4)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find the mean and the variance of $A - 1.5B$.`, template: "mean = {{blank:m}}, variance = {{blank:v}}",
        blanks: [D("m", muW, 0.001, "5"), D("v", varW, 0.001, "3")],
        explanation: t`Mean $= 125 - 1.5 \times 80 = 5$. Variance $= 9 + 1.5^2 \times 4 = 18$ (variances add, with the coefficient squared).` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that a randomly chosen avocado has a mass more than 1.5 times that of a randomly chosen lemon. Give your answer correct to 3 significant figures.", value: pW.exact, tol: pW.tol, wrong: [normalProb(5, 3, 0, Infinity).exact],
        explanation: t`$\mathrm{P}(A - 1.5B > 0)$, with $A - 1.5B \sim \mathrm{N}(5, 18)$: $z = \frac{0 - 5}{\sqrt{18}} = ${s(-5 / sqrt(18))}$, probability $${s(pW.exact)}$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: t`Which is the variance of the total mass $A_1 + A_2$ of two randomly chosen avocados?`,
        options: [["18", "Correct: Var(A₁ + A₂) = 9 + 9."], ["36", "That is Var(2A) = 4 × 9, one avocado doubled."], ["9", "Variances add."], ["81", "Square the coefficient, not the variance."]],
        answer: "A", explanation: "Independent avocados: add the variances." }),
    ],
    explanation: "Write the event as a linear combination, find its mean and variance, then standardise.",
    hints: [t`$\mathrm{Var}(aX - bY) = a^2\mathrm{Var}(X) + b^2\mathrm{Var}(Y)$.`, "Avocado heavier than 1.5 lemons means A − 1.5B > 0."],
  });

  // ---------------------------------------------------------------- C6s-3 (6): unbiased estimates + CI
  const e3 = est(50, 3640, 266500);
  const c3 = ciMean(e3.mean, sqrt(e3.s2), 50, 98);
  b.struct({
    d: 3, ...base(6), skill: "APPLICATION",
    concepts: [Q("estimation.confidence-intervals"), Q("estimation.unbiased")],
    stem: t`The heights, $x$ cm, of a random sample of 50 Form 5 learners at a school in Kadoma are summarised by $\sum x = 3640$ and $\sum x^2 = 266500$ (heights measured above 100 cm).`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find unbiased estimates of the population mean and variance, giving the variance correct to 3 significant figures.", template: "mean = {{blank:m}}, variance = {{blank:v}}",
        blanks: [D("m", e3.mean, 0.001, "3640", 1), D("v", sfStr(e3.s2), 0.05, sfStr((266500 - 3640 ** 2 / 50) / 50), 2)],
        explanation: t`$\bar{x} = \frac{3640}{50} = ${e3.mean}$. $s^2 = \frac{1}{49}\left(266500 - \frac{3640^2}{50}\right) = \frac{${266500 - 3640 ** 2 / 50}}{49} = ${s(e3.s2)}$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find a 98% confidence interval for the population mean, giving the limits correct to 4 significant figures.", template: "{{blank:lo}} to {{blank:hi}}",
        blanks: [D("lo", sfStr(c3.lo, 4), 0.005, sfStr(ciMean(e3.mean, sqrt(e3.s2), 50, 95).lo, 4)), D("hi", sfStr(c3.hi, 4), 0.005, sfStr(ciMean(e3.mean, sqrt(e3.s2), 50, 95).hi, 4))],
        explanation: t`$z = 2.326$: $${e3.mean} \pm 2.326\sqrt{\frac{${s(e3.s2)}}{50}} = ${e3.mean} \pm ${s(c3.hi - e3.mean)}$, giving $(${sfStr(c3.lo, 4)}, ${sfStr(c3.hi, 4)})$.` }),
    ],
    explanation: "Unbiased estimates use the divisor n − 1; the 98% interval uses z = 2.326 and the estimated standard error.",
    hints: ["98% leaves 1% in each tail.", "Standard error = s/√n."],
  });
  chk(c3.z, 2.326);

  // ---------------------------------------------------------------- C6s-4 (6): pdf
  const f4 = (x) => (3 / 16) * (4 - x * x);
  chk(area(f4, 0, 2), 1, 1e-9);
  const m4 = area((x) => x * f4(x), 0, 2);
  const p4 = area(f4, 0, 1);
  chk(m4, 0.75, 1e-9); chk(p4, 11 / 16, 1e-9);
  b.struct({
    d: 3, ...base(6), skill: "APPLICATION",
    concepts: [Q("continuous.pdf")],
    stem: t`The continuous random variable $X$ has pdf $f(x) = k(4 - x^2)$ for $0 \le x \le 2$, and $f(x) = 0$ otherwise.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $k = \frac{3}{16}$.`,
        points: [t`M1 sets $\int_0^2 k(4 - x^2)\,\mathrm{d}x = 1$ and integrates: $k\left[4x - \frac{x^3}{3}\right]_0^2$.`, t`A1 $k \times \frac{16}{3} = 1$, so $k = \frac{3}{16}$.`],
        modelAnswer: t`$$
\int_0^2 k(4 - x^2)\,\mathrm{d}x = k\left[4x - \frac{x^3}{3}\right]_0^2 = k\left(8 - \frac{8}{3}\right) = \frac{16k}{3} = 1
$$
so $k = \frac{3}{16}$.`,
        explanation: "Total area 1." }),
      P.num({ label: "(b)", marks: 2, stem: "Find E(X).", value: m4, wrong: [1],
        explanation: t`$\frac{3}{16}\int_0^2 (4x - x^3)\,\mathrm{d}x = \frac{3}{16}(8 - 4) = 0.75$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find P(X < 1), giving your answer as an exact fraction or a decimal.", value: p4, tol: 0.0006, answer: "0.6875", wrong: [0.5],
        explanation: t`$\frac{3}{16}\left[4x - \frac{x^3}{3}\right]_0^1 = \frac{3}{16} \times \frac{11}{3} = \frac{11}{16} = 0.6875$.` }),
    ],
    explanation: "Total area 1 gives k; E(X) = ∫x f(x) dx; probabilities are areas.",
    hints: ["Integrate 4 − x² from 0 to 2.", "E(X) needs x f(x)."],
  });

  // ---------------------------------------------------------------- C6l-1 (8): Poisson test + Type I
  const p5 = poisson.cdf(9, 3);
  const cr5 = criticalRegion((k) => poisson.cdf(9, k), 0.05, "lower");
  chk(cr5.c, 3);
  chk(p5 < 0.05 ? 1 : 0, 1);
  b.struct({
    d: 4, ...base(8), skill: "ANALYSIS",
    concepts: [Q("inference.binomial-poisson-tests"), Q("inference.errors")],
    stem: "Calls to a fault line in Gweru used to arrive at random at an average rate of 4.5 per week. After a new maintenance scheme, the number of calls in a randomly chosen 2-week period is 3. A test is carried out at the 5% significance level to decide whether the rate has decreased.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State suitable null and alternative hypotheses, defining your parameter.",
        points: [t`$H_0: \lambda = 9$, $H_1: \lambda < 9$ (or $\lambda = 4.5$, $\lambda < 4.5$ per week).`, t`$\lambda$ is the mean number of calls per 2 weeks (or per week), in context.`],
        modelAnswer: t`Let $\lambda$ be the mean number of calls in 2 weeks. $H_0: \lambda = 9$, $H_1: \lambda < 9$.`,
        explanation: "Scale the rate to the observation period." }),
      P.num({ label: "(b)", marks: 3, stem: "Find the p-value of the observed result, correct to 3 significant figures.", value: p5, wrong: [poisson.cdf(4.5, 3), poisson.pmf(9, 3)],
        explanation: t`Under $H_0$, $X \sim \mathrm{Po}(9)$: $\mathrm{P}(X \le 3) = \mathrm{e}^{-9}\left(1 + 9 + \frac{81}{2} + \frac{729}{6}\right) = ${s(p5)}$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "What is the conclusion of the test?",
        options: [
          ["There is evidence at the 5% level that the rate has decreased.", "Correct: the p-value is below 0.05."],
          ["There is no evidence of a decrease at the 5% level.", "The p-value is below 0.05."],
          ["The rate has definitely decreased to 2 per week.", "A test never proves a value."],
          ["The test is invalid because λ is not an integer per week.", "λ can be any positive number."],
        ], answer: "A", explanation: `${sfStr(p5)} < 0.05: reject H₀.` }),
      P.fib({ label: "(d)", marks: 2, stem: "Find the critical region X ≤ c for this test and the probability of a Type I error (correct to 3 significant figures).", template: "c = {{blank:c}}, P(Type I error) = {{blank:a}}",
        blanks: [D("c", cr5.c, 0, "4"), D("a", sfStr(cr5.size), 0.0005, "0.05")],
        explanation: t`$\mathrm{P}(X \le 3) = ${s(cr5.size)} \le 0.05$ and $\mathrm{P}(X \le 4) = ${s(poisson.cdf(9, 4))} > 0.05$, so $X \le 3$; P(Type I) $= ${sfStr(cr5.size)}$.` }),
    ],
    explanation: "Scale λ to 2 weeks, find the lower-tail probability, then the critical region and its size.",
    hints: ["λ for 2 weeks is 9.", "P(Type I) is the size of the critical region."],
  });

  // ---------------------------------------------------------------- C6l-2 (8): z-test critical value + Type II
  const c6 = 40 - 1.645 * 1.5;
  const t6 = normalProb(36, 1.5, c6, Infinity);
  b.struct({
    d: 4, ...base(8), skill: "ANALYSIS",
    concepts: [Q("inference.normal-mean-test"), Q("inference.errors")],
    stem: t`The time, in minutes, for a kombi to travel a route in Bulawayo is normally distributed with mean 40 and standard deviation 6. After road works, a random sample of 16 journeys is used to test, at the 5% level, whether the mean time has decreased.`,
    parts: [
      P.num({ label: "(a)", marks: 3, stem: t`Find the critical value $c$ such that $H_0: \mu = 40$ is rejected if $\bar{x} < c$. Give $c$ correct to 4 significant figures.`, value: c6, sf: 4, wrong: [40 - 1.96 * 1.5, 40 - 1.645 * 6],
        explanation: t`$\bar{X} \sim \mathrm{N}(40, 2.25)$ under $H_0$; $c = 40 - 1.645 \times \frac{6}{4} = ${s(c6)}$.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "The sample mean is 38.6 minutes. What is the conclusion?",
        options: [
          ["No evidence at the 5% level that the mean time has decreased.", `Correct: 38.6 > ${s(c6)}.`],
          ["Evidence at the 5% level that the mean time has decreased.", "38.6 is not below the critical value."],
          ["The mean time is now exactly 38.6 minutes.", "A sample mean is only an estimate."],
          ["The mean time has increased.", "38.6 < 40, and increases are not tested."],
        ], answer: "A", explanation: "38.6 is outside the critical region." }),
      P.num({ label: "(c)", marks: 3, stem: "The true mean time after the road works is 36 minutes. Find the probability of a Type II error, correct to 3 significant figures.", value: t6.exact, tol: t6.tol, wrong: [1 - t6.exact],
        explanation: t`Type II: $\bar{X} \ge ${s(c6)}$ when $\bar{X} \sim \mathrm{N}(36, 1.5^2)$: $1 - \Phi(${sfStr((c6 - 36) / 1.5, 3)}) = ${s(t6.exact)}$.` }),
      P.manual({ label: "(d)", marks: 1, stem: "Explain, in context, what this Type II error means.",
        points: ["Concluding there is no evidence that journey times have decreased when in fact the mean has fallen to 36 minutes."],
        modelAnswer: "The test fails to show a decrease in mean journey time although the mean really has dropped to 36 minutes.",
        explanation: "State the decision and the true situation." }),
    ],
    explanation: "Find the critical value under H₀, then the probability of the acceptance region when μ = 36.",
    hints: ["σ/√n = 1.", "Type II: the sample mean is not below c."],
  });
  chk(38.6 > c6 ? 1 : 0, 1);

  // ---------------------------------------------------------------- C6l-3 (8): Poisson approximations
  const p7 = poisson.cdf(3, 2);
  const r7 = normalProb(45, sqrt(45), 50.5, Infinity);
  b.struct({
    d: 4, ...base(8), skill: "ANALYSIS",
    concepts: [Q("discrete.poisson-approximations")],
    stem: "A machine in a Harare factory makes bolts, and 2% of bolts are defective, independently. Bolts are packed in boxes of 150.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Use a suitable approximation to find the probability that a box contains at most 2 defective bolts. Give your answer correct to 3 significant figures.", value: p7, wrong: [poisson.cdf(3, 3)],
        explanation: t`$X \sim \mathrm{B}(150, 0.02) \approx \mathrm{Po}(3)$: $\mathrm{P}(X \le 2) = \mathrm{e}^{-3}(1 + 3 + 4.5) = ${s(p7)}$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Justify the approximation used in (a).",
        points: ["n = 150 is large (n > 50).", "np = 3 < 5 (p is small)."],
        modelAnswer: "n = 150 > 50 and np = 150 × 0.02 = 3 < 5, so B(150, 0.02) is well approximated by Po(3).",
        explanation: "Quote both conditions with numbers." }),
      P.num({ label: "(c)", marks: 3, stem: "A crate holds 15 boxes. Use a suitable approximation to find the probability that the crate contains more than 50 defective bolts. Give your answer correct to 3 significant figures.", value: r7.exact, tol: r7.tol, wrong: [normalProb(45, sqrt(45), 50, Infinity).exact],
        explanation: t`Total $\sim \mathrm{Po}(45) \approx \mathrm{N}(45, 45)$ since $\lambda > 15$. $\mathrm{P}(T > 50) = \mathrm{P}(T \ge 51) \approx \mathrm{P}(Y > 50.5)$: $z = \frac{5.5}{\sqrt{45}} = ${s(5.5 / sqrt(45))}$, probability $${s(r7.exact)}$.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "Why is 50.5 used rather than 50 in (c)?",
        options: [
          ["It is a continuity correction for a discrete count.", "Correct: the discrete count is approximated by a continuous variable."],
          ["It makes the answer a deliberate over-estimate for safety.", "The correction improves accuracy, not safety."],
          ["The variance of the total number of defectives is 45.5.", "The variance is 45."],
          ["A total of exactly 50 defective bolts is impossible.", "50 is possible; 'more than 50' starts at 51."],
        ], answer: "A", explanation: "'More than 50' means 51 or more, which corresponds to Y > 50.5." }),
    ],
    explanation: "Poisson approximation for large n and small p; normal approximation to Po(45) with a continuity correction.",
    hints: ["np = 3.", "15 boxes: λ = 45."],
  });

  // ---------------------------------------------------------------- C6l-4 (8): sampling + sample mean
  const se8 = 6 / sqrt(40);
  const r8 = normalProb(22, se8, 23.5, Infinity);
  const n8 = Math.ceil((1.96 * 6 / 1.5) ** 2);
  chk(n8, 62);
  b.struct({
    d: 4, ...base(8), skill: "ANALYSIS",
    concepts: [Q("sampling.sample-mean-clt"), Q("sampling.methods")],
    stem: "The number of minutes that customers spend in a supermarket in Bulawayo has mean 22 and standard deviation 6. The distribution is not normal.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "The manager proposes to record the times of the first 40 customers to enter on a Monday morning. Give two reasons why this sample may not be representative.",
        points: ["It is not random: only early-morning Monday customers can be chosen.", "Early shoppers may behave differently (e.g. quick visits before work), so times may be shorter or longer than typical."],
        modelAnswer: "Only customers arriving first on a Monday morning can be included, so the sample is not random, and such customers may shop differently (quick purchases on the way to work) from customers at other times.",
        explanation: "Explain who is over-represented and why their times differ." }),
      P.num({ label: "(b)", marks: 3, stem: "A random sample of 40 customers is taken. Find the probability that their mean time is more than 23.5 minutes, correct to 3 significant figures.", value: r8.exact, tol: r8.tol, wrong: [normalProb(22, 6, 23.5, Infinity).exact],
        explanation: t`By the central limit theorem ($n = 40$ large), $\bar{X} \approx \mathrm{N}\left(22, \frac{36}{40}\right)$. $z = \frac{1.5}{${s(se8)}} = ${s(1.5 / se8)}$, probability $${s(r8.exact)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the smallest sample size for which the probability that the sample mean differs from 22 by less than 1.5 minutes is at least 0.95.", value: n8, wrong: [61],
        explanation: t`$\frac{1.5}{6/\sqrt{n}} \ge 1.96 \Rightarrow \sqrt{n} \ge 7.84 \Rightarrow n \ge 61.47$, so $n = 62$.` }),
    ],
    explanation: "Judge sampling methods by randomness and context; use the central limit theorem for the mean of a large sample.",
    hints: ["Standard error = 6/√n.", "Round n up."],
  });

  // ---------------------------------------------------------------- C6l-5 (8): pdf on an infinite range
  const med9 = sqrt(2);
  const mean9 = 2;
  const p9 = 1 / 9;
  chk(1 - 1 / med9 ** 2, 0.5, 1e-12);
  chk(area((x) => 2 / x ** 2, 1, 1000), mean9 - 0.002, 1e-4);
  b.struct({
    d: 4, ...base(8), skill: "ANALYSIS",
    concepts: [Q("continuous.pdf")],
    stem: t`The time, $X$ hours, that a customer waits for a reply from an online help desk has pdf $f(x) = \dfrac{k}{x^3}$ for $x \ge 1$, and $f(x) = 0$ for $x < 1$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $k = 2$.`,
        points: [t`M1 $\int_1^\infty kx^{-3}\,\mathrm{d}x = k\left[-\frac{1}{2x^2}\right]_1^\infty$.`, t`A1 $= \frac{k}{2} = 1$, so $k = 2$.`],
        modelAnswer: t`$$
\int_1^\infty \frac{k}{x^3}\,\mathrm{d}x = k\left[-\frac{1}{2x^2}\right]_1^\infty = k\left(0 + \frac{1}{2}\right) = \frac{k}{2} = 1
$$
so $k = 2$.`,
        explanation: "As x → ∞, 1/x² → 0." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the median waiting time, correct to 3 significant figures.", value: med9, unit: "h", wrong: [1.5, 2],
        explanation: t`$\int_1^m \frac{2}{x^3}\,\mathrm{d}x = 1 - \frac{1}{m^2} = \frac{1}{2}$, so $m^2 = 2$ and $m = \sqrt{2} = ${s(med9)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find E(X).", value: mean9, unit: "h", wrong: [med9],
        explanation: t`$\int_1^\infty \frac{2}{x^2}\,\mathrm{d}x = \left[-\frac{2}{x}\right]_1^\infty = 2$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the probability that a customer waits more than 3 hours, correct to 3 significant figures.", value: p9, wrong: [2 / 27],
        explanation: t`$\int_3^\infty \frac{2}{x^3}\,\mathrm{d}x = \frac{1}{9} = ${s(p9)}$. ($\frac{2}{27}$ is $f(3)$, a density, not a probability.)` }),
    ],
    explanation: "Improper integrals: the upper limit ∞ makes terms in 1/x vanish.",
    hints: ["Use x⁻³ and integrate to −1/(2x²).", "Median: area from 1 to m equals 0.5."],
  });
});
