// W3b exam-format items for ZIMSEC A-Level Statistics: ZS1 ×6 (10 marks, Paper 1), ZS2A ×2 (8, Paper 2 Section A),
// ZS2B ×4 (16, Paper 2 Section B). Every value is computed and checked here.
import { concept, P, t, chk, sfStr, binom, poisson, normalProb, est, ciMean, criticalRegion, integrate, root, checkDeriv, ZS } from "../lib.mjs";

const { sqrt, exp, log } = Math;
const Q = (k) => `amaths.${k}`;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const area = (f, a, b) => integrate(f, a, b, 20000);
const base = (marks, paper) => ({ marks, secs: 90 * marks, examStyle: true, calculator: true, paper });

concept(Q("continuous.cdf"), { file: "exam/w3b-zimsec-statistics", keyPrefix: "exam.w3b-zimsec-statistics", applies: ZS }, (b) => {
  // ---------------------------------------------------------------- ZS1-1 (10): cdf of a piecewise pdf
  const f1 = (x) => (x <= 2 ? x / 6 : 1 / 3);
  const F1 = (x) => (x <= 2 ? (x * x) / 12 : (x - 1) / 3);
  chk(area(f1, 0, 4), 1, 1e-6);
  for (const x of [0.8, 1.9, 2.6, 3.7]) chk(F1(x), area(f1, 0, x), 1e-6);
  const p1 = F1(3) - F1(1);
  chk(p1, 7 / 12, 1e-12);
  chk(F1(2.5), 0.5, 1e-12); chk(F1(sqrt(3)), 0.25, 1e-12);
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("continuous.cdf"), Q("continuous.pdf")],
    stem: t`The time, $X$ hours, that a borehole pump in Gwanda runs before it needs restarting has pdf $f(x) = \frac{x}{6}$ for $0 \le x \le 2$, $f(x) = \frac{1}{3}$ for $2 < x \le 4$, and $f(x) = 0$ otherwise.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the cumulative distribution function F(x) for 0 ≤ x ≤ 4. It has the forms F(x) = x²/a for 0 ≤ x ≤ 2 and F(x) = (x − b)/c for 2 < x ≤ 4. State a, b and c.",
        template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
        blanks: [D("a", 12, 0, "6"), D("b", 1, 0, "2"), D("c", 3, 0, "6")],
        explanation: t`For $0 \le x \le 2$: $F(x) = \int_0^x \frac{t}{6}\,\mathrm{d}t = \frac{x^2}{12}$, so $F(2) = \frac{1}{3}$. For $2 < x \le 4$: $F(x) = \frac{1}{3} + \frac{x - 2}{3} = \frac{x - 1}{3}$. Check $F(4) = 1$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find P(1 < X < 3), correct to 3 significant figures.", value: p1, wrong: [F1(3)],
        explanation: t`$F(3) - F(1) = \frac{2}{3} - \frac{1}{12} = \frac{7}{12} = ${s(p1)}$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "Find the median and the lower quartile of X, giving the lower quartile correct to 3 significant figures.", template: "median = {{blank:m}} h, lower quartile = {{blank:q}} h",
        blanks: [D("m", 2.5, 0.001, "2", 1), D("q", sfStr(sqrt(3)), 0.005, "0.75", 1)],
        explanation: t`$F(2) = \frac{1}{3} < 0.5$, so the median is in $(2, 4]$: $\frac{m - 1}{3} = 0.5 \Rightarrow m = 2.5$. $F(2) > 0.25$, so the lower quartile is in $[0, 2]$: $\frac{q^2}{12} = 0.25 \Rightarrow q = \sqrt{3} = ${s(sqrt(3))}$.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the graph of y = F(x) for −1 ≤ x ≤ 5.",
        points: ["F = 0 for x < 0 and F = 1 for x > 4 (horizontal lines).", "From (0, 0) to (2, 1/3): a curve (part of a parabola) getting steeper.", "From (2, 1/3) to (4, 1): a straight line of gradient 1/3, joining the curve continuously."],
        modelAnswer: "The graph is 0 for x < 0, rises along the parabola y = x²/12 from (0, 0) to (2, 1/3) with increasing slope, then continues as the straight line y = (x − 1)/3 from (2, 1/3) to (4, 1), and is 1 for x > 4. It is continuous and never decreases.",
        explanation: "A cdf is continuous and non-decreasing; its slope equals the pdf." }),
    ],
    explanation: "Integrate each piece, carrying forward F(2); locate percentiles by checking F at the join.",
    hints: ["F(2) = area of the first piece.", "Decide which piece contains each percentile."],
  });

  // ---------------------------------------------------------------- ZS1-2 (10): stratified sampling + estimates
  const e2 = est(54, 1782, 60100);
  chk(e2.mean, 33); chk(1782 ** 2 / 54, 58806, 1e-9);
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("sampling.methods"), Q("estimation.unbiased")],
    stem: "A district education officer surveys the time, in minutes, that learners spend travelling to school. The district has three secondary schools with 480, 360 and 240 learners.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "A stratified sample of 54 learners is taken, in proportion to school size. Find the number of learners from each school.", template: "first school: {{blank:a}}, second: {{blank:b}}, third: {{blank:c}}",
        blanks: [D("a", 24, 0, "18"), D("b", 18, 0, "18"), D("c", 12, 0, "18")],
        explanation: t`Sampling fraction $\frac{54}{1080} = \frac{1}{20}$: $24$, $18$, $12$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "The sample gives Σx = 1782 and Σx² = 60100. Find unbiased estimates of the population mean and variance, giving the variance correct to 3 significant figures.", template: "mean = {{blank:m}}, variance = {{blank:v}}",
        blanks: [D("m", 33, 0.001, "1782", 1), D("v", sfStr(e2.s2), 0.05, sfStr((60100 - 58806) / 54), 2)],
        explanation: t`$\bar{x} = 33$; $s^2 = \frac{1}{53}(60100 - 58806) = \frac{1294}{53} = ${s(e2.s2)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain the difference between this stratified sample and a quota sample of the same sizes.",
        points: ["In the stratified sample, learners within each school are chosen at random (e.g. random numbers from a school list).", "In a quota sample the interviewer chooses any learners until each quota is filled, so selection is not random and may be biased."],
        modelAnswer: "Both give 24, 18 and 12 learners from the schools, but stratified sampling chooses them at random from each school's register, while quota sampling lets the interviewer pick convenient learners, which can introduce bias.",
        explanation: "The key difference is random selection within groups." }),
      P.manual({ label: "(d)", marks: 2, stem: "State one advantage of stratified sampling here and one practical difficulty.",
        points: ["Advantage: each school is represented in proportion, so differences in travel time between schools (e.g. rural vs urban) are reflected.", "Difficulty: needs an up-to-date register of each school to choose randomly."],
        modelAnswer: "Travel times may differ greatly between schools, and stratifying guarantees each school's share. But the officer needs accurate lists of the learners at every school.",
        explanation: "Link the advantage to the variable studied." }),
    ],
    explanation: "Proportional allocation, then unbiased estimates with divisor n − 1.",
    hints: ["Sampling fraction = 54/1080.", "Divide by 53 for the variance."],
  });

  // ---------------------------------------------------------------- ZS1-3 (10): normal approximation to binomial
  const mu3 = 80 * 0.35, var3 = 80 * 0.35 * 0.65;
  const b3 = normalProb(mu3, sqrt(var3), 29.5, Infinity);
  const c3 = normalProb(mu3, sqrt(var3), 24.5, 35.5);
  const d3 = normalProb(mu3, sqrt(var3), -Infinity, 19.5);
  b.struct({
    d: 4, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("normal.binomial-approximation")],
    stem: t`At a tobacco auction floor in Harare, 35% of bales are graded "top quality", independently. A random sample of 80 bales is inspected, and $X$ is the number graded top quality.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why a normal distribution can be used to approximate the distribution of X, and state its parameters.",
        points: ["np = 28 > 5 and nq = 52 > 5 (n large, p not too close to 0 or 1).", "X ≈ N(28, 18.2)."],
        modelAnswer: "X ~ B(80, 0.35) with np = 28 and nq = 52, both greater than 5, so X ≈ N(28, 18.2).",
        explanation: "Quote both conditions with numbers." }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that at least 30 bales are top quality, correct to 3 significant figures.", value: b3.exact, tol: b3.tol, wrong: [normalProb(mu3, sqrt(var3), 30, Infinity).exact],
        explanation: t`$\mathrm{P}(X \ge 30) \approx \mathrm{P}(Y > 29.5)$: $z = \frac{1.5}{\sqrt{18.2}} = ${s(1.5 / sqrt(var3))}$, probability $${s(b3.exact)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the probability that between 25 and 35 bales inclusive are top quality, correct to 3 significant figures.", value: c3.exact, tol: c3.tol, wrong: [normalProb(mu3, sqrt(var3), 25, 35).exact],
        explanation: t`$\mathrm{P}(24.5 < Y < 35.5)$: $z = ${s(-3.5 / sqrt(var3))}$ and $${s(7.5 / sqrt(var3))}$, probability $${s(c3.exact)}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the probability that fewer than 20 bales are top quality, correct to 3 significant figures.", value: d3.exact, tol: d3.tol, wrong: [normalProb(mu3, sqrt(var3), -Infinity, 20.5).exact],
        explanation: t`$\mathrm{P}(X \le 19) \approx \mathrm{P}(Y < 19.5)$: $z = \frac{-8.5}{\sqrt{18.2}} = ${s(-8.5 / sqrt(var3))}$, probability $${s(d3.exact)}$.` }),
    ],
    explanation: "Check np and nq, use N(np, npq), and apply a continuity correction to every discrete event.",
    hints: ["Variance = np(1 − p).", "'Fewer than 20' means at most 19."],
  });

  // ---------------------------------------------------------------- ZS1-4 (10): binomial test
  const p4 = 1 - binom.cdf(25, 0.15, 7);
  const cr4 = criticalRegion((k) => binom.cdf(25, 0.15, k), 0.05, "upper");
  chk(cr4.c, 8);
  chk(p4 < 0.05 ? 1 : 0, 1);
  b.struct({
    d: 4, ...base(10, "Paper 1"), skill: "ANALYSIS",
    concepts: [Q("inference.binomial-poisson-tests"), Q("inference.hypothesis-basics"), Q("inference.errors")],
    stem: "A seed company states that 15% of its sorghum seeds fail to germinate. A farmer in Matabeleland South suspects the failure rate is higher. She plants 25 randomly chosen seeds and 8 fail to germinate.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State suitable hypotheses for a test at the 5% significance level.",
        points: [t`$H_0: p = 0.15$, $H_1: p > 0.15$.`, "p is the proportion of seeds that fail to germinate."],
        modelAnswer: t`Let $p$ be the proportion of seeds that fail. $H_0: p = 0.15$, $H_1: p > 0.15$.`,
        explanation: "One-tailed: 'higher'." }),
      P.num({ label: "(b)", marks: 3, stem: "Find the p-value of the observed result, correct to 3 significant figures.", value: p4, wrong: [binom.pmf(25, 0.15, 8), 1 - binom.cdf(25, 0.15, 8)],
        explanation: t`Under $H_0$, $X \sim \mathrm{B}(25, 0.15)$: $\mathrm{P}(X \ge 8) = 1 - \mathrm{P}(X \le 7) = ${s(p4)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State the conclusion of the test in context.",
        points: [`${sfStr(p4)} < 0.05, so reject H₀.`, "There is evidence at the 5% level that more than 15% of the seeds fail to germinate."],
        modelAnswer: `P(X ≥ 8) = ${sfStr(p4)} < 0.05: reject H₀. There is evidence at the 5% level that the failure rate is higher than the company states.`,
        explanation: "Decision and context." }),
      P.num({ label: "(d)", marks: 2, stem: "Find the critical region X ≥ c for this test. State c.", value: cr4.c, wrong: [7],
        explanation: t`$\mathrm{P}(X \ge 7) = ${s(1 - binom.cdf(25, 0.15, 6))} > 0.05$, $\mathrm{P}(X \ge 8) = ${s(cr4.size)} \le 0.05$, so $c = 8$.` }),
      P.num({ label: "(e)", marks: 1, stem: "State the probability of a Type I error for this test, correct to 3 significant figures.", value: cr4.size, wrong: [0.05],
        explanation: t`P(Type I) $= \mathrm{P}(X \ge 8 \mid p = 0.15) = ${s(cr4.size)}$.` }),
    ],
    explanation: "Upper-tail binomial test: p-value P(X ≥ 8), critical region, and its size as P(Type I).",
    hints: ["Under H₀, X ~ B(25, 0.15).", "P(Type I) is the size of the critical region."],
  });

  // ---------------------------------------------------------------- ZS1-5 (10): confidence interval
  const e5 = est(64, 2880, 131000);
  const c5 = ciMean(e5.mean, sqrt(e5.s2), 64, 95);
  const w5 = 2 * 1.645 * sqrt(e5.s2 / 64);
  chk(e5.mean, 45);
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("estimation.confidence-intervals"), Q("estimation.unbiased"), Q("sampling.sample-mean-clt")],
    stem: t`The daily maize yield, $x$ kg, from 64 randomly chosen plots of a demonstration farm in Mashonaland Central gives $\sum x = 2880$ and $\sum x^2 = 131000$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find unbiased estimates of the population mean and variance, giving the variance correct to 3 significant figures.", template: "mean = {{blank:m}}, variance = {{blank:v}}",
        blanks: [D("m", 45, 0.001, "2880", 1), D("v", sfStr(e5.s2), 0.05, sfStr(1400 / 64), 2)],
        explanation: t`$\bar{x} = 45$; $s^2 = \frac{1}{63}\left(131000 - \frac{2880^2}{64}\right) = \frac{1400}{63} = ${s(e5.s2)}$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find a 95% confidence interval for the population mean, giving the limits correct to 3 significant figures.", template: "{{blank:lo}} kg to {{blank:hi}} kg",
        blanks: [D("lo", sfStr(c5.lo), 0.05, "35.8"), D("hi", sfStr(c5.hi), 0.05, "54.2")],
        explanation: t`$45 \pm 1.96\sqrt{\frac{${s(e5.s2)}}{64}} = 45 \pm ${s(c5.hi - 45)}$: $(${sfStr(c5.lo)}, ${sfStr(c5.hi)})$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the central limit theorem is used in (b).",
        points: ["The distribution of yields is not known to be normal.", "n = 64 is large, so the sample mean is approximately normal by the central limit theorem."],
        modelAnswer: "The yields may not be normally distributed, but with 64 plots the central limit theorem says the sample mean is approximately normal, so the z-based interval is valid.",
        explanation: "Not known normal + large n." }),
      P.mcq({ label: "(d)", marks: 1, stem: "The farm manager claims the mean daily yield is 47 kg. Is this supported by the interval?",
        options: [["No: 47 lies outside the interval.", "Correct."], ["Yes: 47 is close to 45.", "Closeness is not the test."], ["Yes: the interval is only 95%.", "Values outside a 95% interval are not supported."], ["It cannot be judged.", "It can: 47 is outside."]],
        answer: "A", explanation: `${sfStr(c5.hi)} < 47.` }),
      P.num({ label: "(e)", marks: 1, stem: "Find the width of a 90% confidence interval from the same data, correct to 3 significant figures.", value: w5, wrong: [w5 / 2],
        explanation: t`$2 \times 1.645 \times ${s(sqrt(e5.s2 / 64))} = ${s(w5)}$.` }),
    ],
    explanation: "Estimate, then x̄ ± z s/√n by the central limit theorem; judge claims by the interval.",
    hints: ["Divide by 63 for the variance.", "90%: z = 1.645."],
  });
  chk(c5.hi < 47 ? 1 : 0, 1);

  // ---------------------------------------------------------------- ZS1-6 (10): Poisson sums and linear combinations
  const a6 = poisson.pmf(4.5, 5);
  const b6 = 1 - poisson.cdf(4.5, 2);
  const pW = normalProb(10, 5, 12, Infinity);
  b.struct({
    d: 4, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("rv.linear-combinations"), Q("discrete.poisson")],
    stem: t`(1) The numbers of cars, $X$, and of lorries, $Y$, passing a checkpoint near Beitbridge in a minute are independent with $X \sim \mathrm{Po}(1.6)$ and $Y \sim \mathrm{Po}(2.9)$. (2) Independent random variables $A \sim \mathrm{N}(30, 4)$ and $B \sim \mathrm{N}(50, 9)$; $W = 2A - B$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that exactly 5 vehicles pass in a minute, correct to 3 significant figures.", value: a6, wrong: [poisson.pmf(1.6, 5) + poisson.pmf(2.9, 5)],
        explanation: t`$X + Y \sim \mathrm{Po}(4.5)$: $\mathrm{e}^{-4.5}\frac{4.5^5}{5!} = ${s(a6)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that at least 3 vehicles pass in a minute, correct to 3 significant figures.", value: b6, wrong: [1 - poisson.cdf(4.5, 3)],
        explanation: t`$1 - \mathrm{e}^{-4.5}\left(1 + 4.5 + \frac{4.5^2}{2}\right) = ${s(b6)}$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "Find E(W) and Var(W).", template: "E(W) = {{blank:m}}, Var(W) = {{blank:v}}",
        blanks: [D("m", 10, 0.001, "-20"), D("v", 25, 0.001, "-1")],
        explanation: t`$\mathrm{E}(W) = 60 - 50 = 10$; $\mathrm{Var}(W) = 4 \times 4 + 9 = 25$ (variances add even for a difference).` }),
      P.num({ label: "(d)", marks: 2, stem: "Find P(W > 12), correct to 3 significant figures.", value: pW.exact, tol: pW.tol, wrong: [normalProb(10, sqrt(7), 12, Infinity).exact],
        explanation: t`$W \sim \mathrm{N}(10, 25)$: $z = 0.4$, $1 - \Phi(0.4) = ${s(pW.exact)}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Explain why $\mathrm{Var}(A_1 + A_2) \ne \mathrm{Var}(2A)$, where $A_1$ and $A_2$ are independent observations of $A$, and give both values.`,
        points: [t`$\mathrm{Var}(A_1 + A_2) = 4 + 4 = 8$ but $\mathrm{Var}(2A) = 2^2 \times 4 = 16$.`, "Two independent observations partly cancel each other's variation, whereas doubling one observation doubles its deviation."],
        modelAnswer: t`$\mathrm{Var}(A_1 + A_2) = 8$ and $\mathrm{Var}(2A) = 16$. In $2A$ one random deviation is doubled; in $A_1 + A_2$ two independent deviations are added and can partly cancel.`,
        explanation: "Sum of independent copies vs a multiple of one copy." }),
    ],
    explanation: "Sums of independent Poisson variables are Poisson; Var(aX + bY) = a²Var(X) + b²Var(Y) for independent X, Y.",
    hints: ["Add the Poisson means.", "Variances add, with coefficients squared."],
  });

  // ---------------------------------------------------------------- ZS2A-1 (8): pdf, mode, mean, variance
  const k7 = 2 / 9;
  const f7 = (x) => k7 * x * (3 - x);
  chk(area(f7, 0, 3), 1, 1e-9);
  const m7 = area((x) => x * f7(x), 0, 3);
  const v7 = area((x) => x * x * f7(x), 0, 3) - m7 * m7;
  chk(m7, 1.5, 1e-9); chk(v7, 0.45, 1e-9);
  b.struct({
    d: 3, ...base(8, "Paper 2"), skill: "APPLICATION",
    concepts: [Q("continuous.pdf")],
    stem: t`The continuous random variable $X$ has pdf $f(x) = kx(3 - x)$ for $0 \le x \le 3$, and $f(x) = 0$ otherwise.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the value of k, correct to 3 significant figures (or as a fraction).", value: k7, wrong: [1 / 3, 4.5],
        explanation: t`$\int_0^3 k(3x - x^2)\,\mathrm{d}x = k\left(\frac{27}{2} - 9\right) = 4.5k = 1$, so $k = \frac{2}{9} = ${s(k7)}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the mode of X.", value: 1.5, wrong: [3],
        explanation: t`$f'(x) = k(3 - 2x) = 0$ at $x = 1.5$, a maximum.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find E(X).", value: m7, wrong: [2],
        explanation: t`$\frac{2}{9}\int_0^3 (3x^2 - x^3)\,\mathrm{d}x = \frac{2}{9}\left(27 - \frac{81}{4}\right) = 1.5$ (also clear by symmetry about 1.5).` }),
      P.num({ label: "(d)", marks: 3, stem: "Find Var(X).", value: v7, wrong: [2.7],
        explanation: t`$\mathrm{E}(X^2) = \frac{2}{9}\int_0^3 (3x^3 - x^4)\,\mathrm{d}x = \frac{2}{9}\left(\frac{243}{4} - \frac{243}{5}\right) = 2.7$, so $\mathrm{Var}(X) = 2.7 - 1.5^2 = 0.45$. (2.7 is $\mathrm{E}(X^2)$.)` }),
    ],
    explanation: "Total area 1; the mode maximises f; E(X) and E(X²) by integration.",
    hints: ["Integrate 3x − x² from 0 to 3.", "Var(X) = E(X²) − [E(X)]²."],
  });

  // ---------------------------------------------------------------- ZS2A-2 (8): two-tailed z-test
  const z8 = (154.5 - 150) / (12 / 6);
  chk(z8, 2.25);
  b.struct({
    d: 3, ...base(8, "Paper 2"), skill: "APPLICATION",
    concepts: [Q("inference.normal-mean-test"), Q("inference.hypothesis-basics")],
    stem: "The lengths of steel rods cut by a machine in Kwekwe are normally distributed with standard deviation 12 mm. The machine is set to a mean of 150 mm. A random sample of 36 rods has mean length 154.5 mm. Test, at the 5% significance level, whether the mean length differs from 150 mm.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the hypotheses, explaining your choice of a one- or two-tailed test.",
        points: [t`$H_0: \mu = 150$, $H_1: \mu \ne 150$.`, "Two-tailed because the question asks whether the mean differs, in either direction."],
        modelAnswer: t`$H_0: \mu = 150$, $H_1: \mu \ne 150$, where $\mu$ is the mean length in mm; two-tailed since any change matters.`,
        explanation: "'Differs' means two-tailed." }),
      P.num({ label: "(b)", marks: 3, stem: "Calculate the test statistic z.", value: z8, wrong: [4.5 / 12],
        explanation: t`$z = \frac{154.5 - 150}{12/\sqrt{36}} = \frac{4.5}{2} = 2.25$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Complete the test and state your conclusion in context.",
        points: ["2.25 > 1.96, so reject H₀.", "There is evidence at the 5% level that the mean length of rods is not 150 mm (it appears to be too long)."],
        modelAnswer: "z = 2.25 > 1.96, so the result is in the critical region: reject H₀. There is evidence at the 5% level that the machine's mean length differs from 150 mm.",
        explanation: "Compare with ±1.96." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Would the same conclusion be reached at the 1% level?",
        options: [["No: 2.25 < 2.576.", "Correct."], ["Yes: 2.25 > 1.96.", "1.96 is the 5% value."], ["Yes: 2.25 > 2.326.", "2.326 is the one-tailed 1% value."], ["No: z must be negative to reject.", "Two-tailed tests use both tails."]],
        answer: "A", explanation: "Two-tailed 1%: ±2.576." }),
    ],
    explanation: "Two-tailed z-test: standardise with σ/√n and compare with ±1.96 (±2.576 at 1%).",
    hints: ["σ/√n = 2.", "Two-tailed 5%: ±1.96."],
  });

  // ---------------------------------------------------------------- ZS2B-1 (16): Poisson model
  const b9 = poisson.pmf(1.2, 2);
  const c9 = 1 - poisson.cdf(1.2, 3);
  const d9 = poisson.cdf(2.4, 1);
  const q9 = exp(-1.2);
  const e9 = 1 - binom.cdf(10, q9, 2);
  const n9 = Math.floor(log(20) / 1.2);
  chk(n9, 2); chk(exp(-1.2 * 2) > 0.05 && exp(-1.2 * 3) < 0.05 ? 1 : 0, 1);
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("discrete.poisson"), Q("rv.linear-combinations")],
    stem: "Breakdowns of a borehole pump serving a village near Masvingo occur at random at an average rate of 1.2 per week. Give probabilities correct to 3 significant figures.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State two conditions, in context, for a Poisson distribution to model the number of breakdowns per week.",
        points: ["Breakdowns occur independently of one another.", "Breakdowns occur singly and at a constant average rate (1.2 per week)."],
        modelAnswer: "One breakdown must not make another more likely (independence), and breakdowns must happen one at a time at a constant average rate of 1.2 per week.",
        explanation: "Conditions in context." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability of exactly 2 breakdowns in a week.", value: b9, wrong: [poisson.cdf(1.2, 2)],
        explanation: t`$\mathrm{e}^{-1.2}\frac{1.2^2}{2} = ${s(b9)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the probability of more than 3 breakdowns in a week.", value: c9, wrong: [1 - poisson.cdf(1.2, 2)],
        explanation: t`$1 - \mathrm{P}(X \le 3) = ${s(c9)}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the probability of at most 1 breakdown in a fortnight.", value: d9, wrong: [poisson.cdf(1.2, 1) ** 2],
        explanation: t`$\mathrm{Po}(2.4)$: $\mathrm{e}^{-2.4}(1 + 2.4) = ${s(d9)}$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Over 10 separate weeks, find the probability that there are at least 3 weeks with no breakdown.", value: e9, wrong: [1 - binom.cdf(10, q9, 3)],
        explanation: t`$\mathrm{P}(\text{no breakdown in a week}) = \mathrm{e}^{-1.2} = ${s(q9)}$. The number of such weeks is $\mathrm{B}(10, ${s(q9)})$: $1 - \mathrm{P}(0) - \mathrm{P}(1) - \mathrm{P}(2) = ${s(e9)}$.` }),
      P.fib({ label: "(f)", marks: 2, stem: "State the mean and the variance of the number of breakdowns in 4 weeks.", template: "mean = {{blank:m}}, variance = {{blank:v}}",
        blanks: [D("m", 4.8, 0.001, "1.2"), D("v", 4.8, 0.001, "19.2")],
        explanation: t`$\mathrm{Po}(4.8)$: mean $=$ variance $= 4.8$.` }),
      P.num({ label: "(g)", marks: 2, stem: "Find the largest whole number of weeks n for which the probability of no breakdown in n weeks is greater than 0.05.", value: n9, wrong: [3],
        explanation: t`$\mathrm{e}^{-1.2n} > 0.05 \Rightarrow n < \frac{\ln 20}{1.2} = ${s(log(20) / 1.2)}$, so $n = 2$.` }),
    ],
    explanation: "Scale λ to the period; combine a Poisson probability with a binomial count of weeks.",
    hints: ["Fortnight: λ = 2.4.", "In (e), each week either has no breakdown or not."],
  });

  // ---------------------------------------------------------------- ZS2B-2 (16): cdf with a constant
  const k10 = 1 / 18;
  const F10 = (x) => k10 * (x * x + 3 * x);
  chk(F10(3), 1, 1e-12);
  checkDeriv(F10, (x) => (2 * x + 3) / 18, [0.5, 1.5, 2.5]);
  const med10 = (-3 + sqrt(45)) / 2;
  const lq10 = (-3 + sqrt(27)) / 2;
  const uq10 = (-3 + sqrt(63)) / 2;
  chk(F10(med10), 0.5, 1e-12); chk(F10(lq10), 0.25, 1e-12); chk(F10(uq10), 0.75, 1e-12);
  const mean10 = area((x) => (x * (2 * x + 3)) / 18, 0, 3);
  chk(mean10, 1.75, 1e-9);
  chk(mean10 < med10 ? 1 : 0, 1);
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("continuous.cdf"), Q("continuous.pdf")],
    stem: t`The time, $X$ minutes, that a learner at a school in Bindura takes to answer a quiz question has cdf $F(x) = k(x^2 + 3x)$ for $0 \le x \le 3$, with $F(x) = 0$ for $x < 0$ and $F(x) = 1$ for $x > 3$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the value of k (as a fraction or correct to 3 significant figures).", value: k10, wrong: [1 / 9],
        explanation: t`$F(3) = 1$: $k(9 + 9) = 1$, so $k = \frac{1}{18}$.` }),
      P.expr({ label: "(b)", marks: 2, stem: "Find the pdf f(x) for 0 ≤ x ≤ 3. Type it as a fraction, e.g. (3x+1)/20.", accepted: ["(2x+3)/18", "(3+2x)/18", "2x/18+3/18", "x/9+1/6", "1/6+x/9", "(1/18)(2x+3)", "1/18(2x+3)"], wrong: ["(x^2+3x)/18"],
        explanation: t`$f(x) = F'(x) = \frac{2x + 3}{18}$ for $0 \le x \le 3$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the median of X, correct to 3 significant figures.", value: med10, unit: "min", wrong: [1.5],
        explanation: t`$\frac{m^2 + 3m}{18} = 0.5 \Rightarrow m^2 + 3m - 9 = 0 \Rightarrow m = \frac{-3 + \sqrt{45}}{2} = ${s(med10)}$.` }),
      P.fib({ label: "(d)", marks: 4, stem: "Find the lower and upper quartiles of X, each correct to 3 significant figures.", template: "lower quartile = {{blank:l}}, upper quartile = {{blank:u}}",
        blanks: [D("l", sfStr(lq10), 0.005, "0.75", 2), D("u", sfStr(uq10), 0.005, "2.25", 2)],
        explanation: t`$q^2 + 3q = 4.5 \Rightarrow q = \frac{-3 + \sqrt{27}}{2} = ${s(lq10)}$; $q^2 + 3q = 13.5 \Rightarrow q = \frac{-3 + \sqrt{63}}{2} = ${s(uq10)}$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find E(X).", value: mean10, unit: "min", wrong: [1.5, med10],
        explanation: t`$\int_0^3 x \cdot \frac{2x + 3}{18}\,\mathrm{d}x = \frac{1}{18}\left[\frac{2x^3}{3} + \frac{3x^2}{2}\right]_0^3 = \frac{18 + 13.5}{18} = 1.75$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Comment on the skewness of the distribution, giving a reason.",
        points: [`Mean 1.75 < median ${sfStr(med10)} (or the median is nearer the upper quartile than the lower).`, "So the distribution is negatively skewed."],
        modelAnswer: `The mean (1.75) is less than the median (${sfStr(med10)}), and the median is nearer the upper quartile (${sfStr(uq10)}) than the lower quartile (${sfStr(lq10)}), so the distribution is negatively skewed.`,
        explanation: "Compare mean with median, or the quartile gaps." }),
    ],
    explanation: "F(3) = 1 gives k; differentiate for f; solve F(x) = 0.25, 0.5, 0.75 for the quartiles; integrate x f(x) for the mean.",
    hints: ["Solve each percentile equation as a quadratic.", "E(X) needs the pdf."],
  });

  // ---------------------------------------------------------------- ZS2B-3 (16): sampling and estimation
  const e11 = est(80, 6560, 548000);
  const c11 = ciMean(e11.mean, sqrt(e11.s2), 80, 95);
  const n11 = Math.ceil(1.96 ** 2 * e11.s2 / 4);
  chk(e11.mean, 82); chk(6560 ** 2 / 80, 537920, 1e-9);
  chk(1.96 * sqrt(e11.s2 / n11) <= 2 && 1.96 * sqrt(e11.s2 / (n11 - 1)) > 2 ? 1 : 0, 1);
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("sampling.methods"), Q("estimation.unbiased"), Q("estimation.confidence-intervals")],
    stem: "A health officer studies the systolic blood pressure of adults in a district in Manicaland. The district register lists 2,500 adults in three wards: 1,250 in Ward A, 750 in Ward B and 500 in Ward C.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain what is meant by a sampling frame, and describe how a systematic sample of 80 adults could be taken from the register.",
        points: ["A sampling frame is a list of all members of the population (here, the district register).", "Interval k = 2500/80 = 31.25, so use 31 (or 32) and choose a random start between 1 and k.", "Then take every kth adult on the register until 80 are chosen."],
        modelAnswer: "The sampling frame is the full list of the 2,500 adults. Use an interval of about 2500 ÷ 80 ≈ 31: choose a random number from 1 to 31 as the start, then select every 31st adult on the register.",
        explanation: "Interval, random start, every kth member." }),
      P.fib({ label: "(b)", marks: 3, stem: "Instead, a stratified sample of 80 is taken in proportion to ward size. Find the number from each ward.", template: "Ward A: {{blank:a}}, Ward B: {{blank:b}}, Ward C: {{blank:c}}",
        blanks: [D("a", 40, 0, "27"), D("b", 24, 0, "27"), D("c", 16, 0, "26")],
        explanation: t`Sampling fraction $\frac{80}{2500} = 0.032$: $40$, $24$, $16$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "The 80 readings, x (in mm Hg above 40), give Σx = 6560 and Σx² = 548000. Find unbiased estimates of the population mean and variance of x, giving the variance correct to 4 significant figures.", template: "mean = {{blank:m}}, variance = {{blank:v}}",
        blanks: [D("m", 82, 0.001, "6560", 1), D("v", sfStr(e11.s2, 4), 0.05, sfStr(10080 / 80, 4), 2)],
        explanation: t`$\bar{x} = 82$; $s^2 = \frac{1}{79}(548000 - 537920) = \frac{10080}{79} = ${s(e11.s2)}$.` }),
      P.fib({ label: "(d)", marks: 3, stem: "Find a 95% confidence interval for the population mean of x, giving the limits correct to 3 significant figures.", template: "{{blank:lo}} to {{blank:hi}}",
        blanks: [D("lo", sfStr(c11.lo), 0.05, "59.9"), D("hi", sfStr(c11.hi), 0.05, "104")],
        explanation: t`$82 \pm 1.96\sqrt{\frac{${s(e11.s2)}}{80}} = 82 \pm ${s(c11.hi - 82)}$: $(${sfStr(c11.lo)}, ${sfStr(c11.hi)})$.` }),
      P.num({ label: "(e)", marks: 2, stem: "Using the variance estimate from (c), find the smallest sample size for which a 95% confidence interval would have a half-width of at most 2.", value: n11, wrong: [n11 - 1],
        explanation: t`$1.96\sqrt{\frac{${s(e11.s2)}}{n}} \le 2 \Rightarrow n \ge \frac{1.96^2 \times ${s(e11.s2)}}{4} = ${s(1.96 ** 2 * e11.s2 / 4)}$, so $n = ${n11}$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Interpret the interval found in (d).",
        points: ["If the sampling were repeated many times, about 95% of intervals calculated this way would contain the true mean.", "So we are 95% confident the district's mean of x lies between the limits (not that 95% of adults lie in it)."],
        modelAnswer: "In repeated sampling, 95% of such intervals would contain the population mean, so we can be 95% confident that the mean of x for the district's adults lies in the interval. It does not describe individual adults' readings.",
        explanation: "Confidence describes the method." }),
    ],
    explanation: "Sampling frame and systematic interval; proportional allocation; unbiased estimates; interval and sample size.",
    hints: ["Sampling fraction = 80/2500.", "Round the sample size up."],
  });

  // ---------------------------------------------------------------- ZS2B-4 (16): z-test, critical value, errors
  const se12 = 0.15 / 5;
  const z12 = (9.94 - 10) / se12;
  const c12 = 10 - 1.645 * se12;
  const t12 = normalProb(9.92, se12, c12, Infinity);
  chk(z12, -2, 1e-9);
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("inference.normal-mean-test"), Q("inference.errors"), Q("inference.hypothesis-basics")],
    stem: "Bags of maize meal from a mill in Chegutu are labelled 10 kg. Their masses are normally distributed with standard deviation 0.15 kg. A consumer council suspects underfilling and weighs a random sample of 25 bags; the sample mean is 9.94 kg. The test is at the 5% significance level.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State the null and alternative hypotheses.",
        points: [t`$H_0: \mu = 10$.`, t`$H_1: \mu < 10$, where $\mu$ is the mean mass in kg.`],
        modelAnswer: t`$H_0: \mu = 10$, $H_1: \mu < 10$ (lower-tail test for underfilling).`,
        explanation: "Suspected direction: less." }),
      P.num({ label: "(b)", marks: 3, stem: "Calculate the test statistic z.", value: z12, wrong: [-0.06 / 0.15],
        explanation: t`$z = \frac{9.94 - 10}{0.15/\sqrt{25}} = \frac{-0.06}{0.03} = -2$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Complete the test and state the conclusion in context.",
        points: ["−2 < −1.645, so reject H₀.", "There is evidence at the 5% level that bags are underfilled (mean less than 10 kg)."],
        modelAnswer: "z = −2 < −1.645, so reject H₀: there is evidence at the 5% level that the mean mass of the bags is less than 10 kg.",
        explanation: "Lower-tail critical value −1.645." }),
      P.num({ label: "(d)", marks: 3, stem: "Find the critical value c such that H₀ is rejected when the sample mean is less than c. Give c correct to 4 significant figures.", value: c12, sf: 4, wrong: [10 - 1.96 * se12],
        explanation: t`$c = 10 - 1.645 \times 0.03 = ${s(c12)}$, i.e. $${sfStr(c12, 4)}$ kg.` }),
      P.num({ label: "(e)", marks: 3, stem: "The true mean mass is 9.92 kg. Find the probability of a Type II error, correct to 3 significant figures.", value: t12.exact, tol: t12.tol, wrong: [1 - t12.exact],
        explanation: t`Type II: $\bar{X} \ge ${s(c12)}$ when $\bar{X} \sim \mathrm{N}(9.92, 0.03^2)$: $1 - \Phi\left(\frac{${s(c12)} - 9.92}{0.03}\right) = 1 - \Phi(${sfStr((c12 - 9.92) / se12)}) = ${s(t12.exact)}$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Describe, in context, what a Type I error would be in this test, and state its probability.",
        points: ["Concluding the bags are underfilled when the true mean really is 10 kg.", "P(Type I error) = 0.05."],
        modelAnswer: "A Type I error would be to accuse the mill of underfilling when the mean mass is in fact 10 kg; its probability is the significance level, 0.05.",
        explanation: "Continuous test: P(Type I) = α." }),
      P.mcq({ label: "(g)", marks: 1, stem: "If the test were carried out at the 1% level instead, what would happen to the probability of a Type II error?",
        options: [["It would increase.", "Correct: the critical region shrinks, so a false H₀ is accepted more often."], ["It would decrease.", "Harder rejection means more Type II errors."], ["It would be unchanged.", "The critical value moves."], ["It would equal 0.01.", "0.01 would be P(Type I)."]],
        answer: "A", explanation: "Lower α ⇒ higher β for fixed n." }),
    ],
    explanation: "Lower-tail z-test; critical value from H₀; Type II probability from the true mean.",
    hints: ["σ/√n = 0.03.", "Type II: the sample mean is not below c."],
  });
});
