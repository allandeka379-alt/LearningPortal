// W3b: amaths.inference.binomial-poisson-tests (ZIMSEC Statistics F5: binomial; Cambridge P6 6.5: binomial and Poisson)
// Tests on a Poisson mean are Cambridge only (applies: CAM).
import { concept, P, t, chk, sfStr, binom, poisson, criticalRegion, normalProb, CAM } from "../lib.mjs";

const { sqrt } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const s = (x) => sfStr(x, 4);
const Bc = (n, p) => (k) => binom.cdf(n, p, k);
const Pc = (l) => (k) => poisson.cdf(l, k);

concept("amaths.inference.binomial-poisson-tests", { file: "inference/binomial-poisson-tests", keyPrefix: "inference.binomial-poisson-tests" }, (b) => {
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, applies: CAM,
    stem: "Road accidents at a junction in Harare occurred at an average rate of 3.2 per month. Speed humps are installed, and the council wants to test whether the rate has decreased. Which hypotheses should be used?",
    options: [
      [t`$H_0: \lambda = 3.2$, $H_1: \lambda < 3.2$`, t`Correct: $\lambda$ is the mean number of accidents per month; a decrease is suspected.`],
      [t`$H_0: \lambda = 3.2$, $H_1: \lambda \ne 3.2$`, "The council has a direction in mind (a decrease), so the test is one-tailed."],
      [t`$H_0: \lambda < 3.2$, $H_1: \lambda = 3.2$`, "H₀ must give the single value 3.2."],
      [t`$H_0: p = 3.2$, $H_1: p < 3.2$`, "A rate of events is a Poisson mean λ, not a binomial probability p (which cannot exceed 1)."],
    ],
    answer: "A",
    explanation: t`For a Poisson test the parameter is the mean rate $\lambda$ (scaled to the period observed).`,
  });

  const p2 = binom.cdf(12, 0.4, 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Under $H_0$, $X \sim \mathrm{B}(12, 0.4)$, and $H_1: p < 0.4$. The observed value is $x = 1$. Find $\mathrm{P}(X \le 1)$, correct to 3 significant figures.`,
    value: p2, wrong: [binom.pmf(12, 0.4, 1), binom.cdf(12, 0.4, 0)],
    explanation: t`$\mathrm{P}(X \le 1) = 0.6^{12} + 12 \times 0.4 \times 0.6^{11} = ${s(p2)}$, so $${sfStr(p2)}$. This is below 0.05, so the result is significant at the 5% level.`,
    hints: ["Include P(X = 0)."],
  });

  const cr3 = criticalRegion(Bc(20, 0.3), 0.05, "upper");
  chk(cr3.c, 10);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A test of $H_0: p = 0.3$ against $H_1: p > 0.3$ uses $X \sim \mathrm{B}(20, 0.3)$ at the 5% significance level. The critical region is $X \ge c$. Find $c$ and the actual significance level (correct to 3 significant figures).`,
    template: "c = {{blank:c}}, actual significance level = {{blank:a}}",
    blanks: [D("c", cr3.c, 0, "9"), D("a", sfStr(cr3.size), 0.0005, sfStr(1 - binom.cdf(20, 0.3, 7)))],
    explanation: t`$\mathrm{P}(X \ge 9) = ${s(1 - binom.cdf(20, 0.3, 8))} > 0.05$ but $\mathrm{P}(X \ge 10) = ${s(cr3.size)} \le 0.05$, so the critical region is $X \ge 10$ with actual significance level $${sfStr(cr3.size)}$.`,
    hints: ["Find the smallest c with P(X ≥ c) ≤ 0.05."],
  });

  const lo4 = criticalRegion(Bc(25, 0.5), 0.025, "lower");
  const up4 = criticalRegion(Bc(25, 0.5), 0.025, "upper");
  chk(lo4.c, 7); chk(up4.c, 18);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A coin is tossed 25 times to test whether it is biased, using $H_0: p = 0.5$ and $H_1: p \ne 0.5$ at the 5% significance level, where $X$ is the number of heads. The critical region is $X \le a$ or $X \ge b$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [D("a", lo4.c, 0, "8"), D("b", up4.c, 0, "17")],
    explanation: t`Use 2.5% in each tail. $\mathrm{P}(X \le 7) = ${s(lo4.size)} \le 0.025$ but $\mathrm{P}(X \le 8) = ${s(binom.cdf(25, 0.5, 8))} > 0.025$, so $a = 7$. By symmetry $\mathrm{P}(X \ge 18) = ${s(up4.size)}$, so $b = 18$.`,
    hints: ["Two-tailed at 5%: 2.5% in each tail.", "B(25, 0.5) is symmetrical about 12.5."],
  });

  const p5 = 1 - poisson.cdf(3.5, 7);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, applies: CAM,
    stem: t`The number of complaints a phone company in Bulawayo receives per week has had mean 3.5. After a price rise there are 8 complaints in one week. Under $H_0: \lambda = 3.5$, find $\mathrm{P}(X \ge 8)$, correct to 3 significant figures.`,
    value: p5, wrong: [1 - poisson.cdf(3.5, 8), poisson.pmf(3.5, 8)],
    explanation: t`$\mathrm{P}(X \ge 8) = 1 - \mathrm{P}(X \le 7) = ${s(p5)}$, so $${sfStr(p5)}$. Less than 0.05, so there is evidence at the 5% level of an increase. ($${sfStr(1 - poisson.cdf(3.5, 8))}$ is $\mathrm{P}(X \ge 9)$.)`,
    hints: ["'At least 8' is 1 − P(X ≤ 7)."],
  });

  const cr6 = criticalRegion(Pc(10), 0.05, "upper");
  chk(cr6.c, 16);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true, applies: CAM,
    stem: t`Faults on a ZESA power line occur at an average rate of 2.5 per week. An engineer will count the faults in a 4-week period to test, at the 5% level, whether the rate has increased. Find the critical region $X \ge c$ and the actual significance level (correct to 3 significant figures).`,
    template: "c = {{blank:c}}, actual significance level = {{blank:a}}",
    blanks: [D("c", cr6.c, 0, "6"), D("a", sfStr(cr6.size), 0.0005, sfStr(1 - poisson.cdf(10, 14)))],
    explanation: t`For 4 weeks, $X \sim \mathrm{Po}(10)$ under $H_0$. $\mathrm{P}(X \ge 15) = ${s(1 - poisson.cdf(10, 14))} > 0.05$, $\mathrm{P}(X \ge 16) = ${s(cr6.size)} \le 0.05$. Critical region $X \ge 16$, actual level $${sfStr(cr6.size)}$. (Using $\mathrm{Po}(2.5)$ for a 4-week count forgets to scale $\lambda$.)`,
    hints: ["Scale λ to 4 weeks.", "Find the smallest c with P(X ≥ c) ≤ 0.05."],
  });

  const r7 = normalProb(30, sqrt(21), 39.5, Infinity);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Nationally, 30% of mobile-money users in Zimbabwe use a particular app. In a random sample of 100 users in Mutare, 40 use it. Using a normal approximation, find the probability under $H_0: p = 0.3$ of 40 or more users, $\mathrm{P}(X \ge 40)$, correct to 3 significant figures.`,
    value: r7.exact, tol: r7.tol, wrong: [normalProb(30, sqrt(21), 40, Infinity).exact, normalProb(30, sqrt(30), 39.5, Infinity).exact],
    explanation: t`$X \sim \mathrm{B}(100, 0.3) \approx \mathrm{N}(30, 21)$. With a continuity correction, $\mathrm{P}(X \ge 40) \approx \mathrm{P}(Y > 39.5)$: $z = \frac{9.5}{\sqrt{21}} = ${s(9.5 / sqrt(21))}$, probability $${s(r7.exact)}$, i.e. $${sfStr(r7.exact)}$. This is below 0.05: evidence that the proportion in Mutare is higher. (Without the continuity correction: $${sfStr(normalProb(30, sqrt(21), 40, Infinity).exact)}$.)`,
    hints: ["Mean np, variance np(1 − p).", "Use 39.5 for 'at least 40'."],
  });

  const r8 = normalProb(40, sqrt(40), 51.5, Infinity);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true, applies: CAM,
    stem: t`Under $H_0$, the number of customers at a fuel station in an hour is $\mathrm{Po}(40)$. In one hour after a promotion, 52 customers arrive. Using a suitable normal approximation, find $\mathrm{P}(X \ge 52)$ under $H_0$, correct to 3 significant figures.`,
    value: r8.exact, tol: r8.tol, wrong: [normalProb(40, sqrt(40), 52, Infinity).exact, normalProb(40, 40, 51.5, Infinity).exact],
    explanation: t`$\lambda = 40 > 15$, so $X \approx \mathrm{N}(40, 40)$. $\mathrm{P}(X \ge 52) \approx \mathrm{P}(Y > 51.5)$, $z = \frac{11.5}{\sqrt{40}} = ${s(11.5 / sqrt(40))}$, probability $${sfStr(r8.exact)}$.`,
    hints: ["Variance = mean for a Poisson variable.", "Apply a continuity correction."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "In a test based on a binomial distribution at the nominal 5% level, the actual significance level is usually a little less than 5%.",
    answer: true,
    explanation: "A discrete variable cannot generally give a tail probability of exactly 0.05, so the critical region is chosen with probability as close as possible to, but not above, 0.05.",
  });

  const p10 = 1 - binom.cdf(15, 0.2, 5);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`To test $H_0: p = 0.2$ against $H_1: p > 0.2$ at the 5% level, 15 trials give 6 successes. Under $H_0$, $\mathrm{P}(X \ge 6) = ${s(p10)}$. What is the correct conclusion?`,
    options: [
      [t`Do not reject $H_0$: $${s(p10)} > 0.05$; insufficient evidence that $p > 0.2$.`, "Correct: the p-value exceeds the significance level."],
      [t`Reject $H_0$: 6 is more than the expected value of 3, so $p > 0.2$.`, "A result above the mean is not automatically significant."],
      [t`Reject $H_0$: $${s(p10)} < 0.1$, so there is evidence that $p > 0.2$.`, "The test is at the 5% level, not 10%."],
      [t`Do not reject $H_0$: the result proves that $p = 0.2$ exactly.`, "Not rejecting H₀ never proves it."],
    ],
    answer: "A",
    explanation: "Compare the p-value with the significance level and conclude without certainty.",
    hints: ["Compare the probability with 0.05."],
  });
  chk(p10 > 0.05 && p10 < 0.1 ? 1 : 0, 1);

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "A manufacturer claims that 10% of its light bulbs are faulty. A retailer believes the proportion is lower. Which tail of the binomial distribution contains the critical region?",
    options: [
      ["the lower tail (small numbers of faulty bulbs)", t`Correct: $H_1: p < 0.1$, so small counts are evidence against $H_0$.`],
      ["the upper tail (large numbers of faulty bulbs)", "Large counts would be evidence that p is higher, not lower."],
      ["both tails", "The retailer has a direction in mind."],
      ["the middle of the distribution", "Results near the expected value support H₀."],
    ],
    answer: "A",
    explanation: "The critical region lies in the direction of H₁.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Tendai tests whether a die is biased towards six by throwing it 30 times and counting the sixes, using B(30, 1/6) under H₀. State two assumptions needed for the binomial model to be valid.",
    points: ["The throws are independent of each other.", "The probability of a six is the same on every throw (and each throw is either a six or not)."],
    modelAnswer: "Each throw must be independent of the others, and the probability of a six must stay constant from throw to throw, with a fixed number (30) of throws.",
    explanation: "The binomial conditions: fixed n, two outcomes, independence, constant p.",
    hints: ["List the binomial conditions in context."],
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false, applies: CAM,
    stem: "Match each situation with the distribution of the test statistic under H₀.",
    pairs: [
      ["number of defective items in a sample of 50, when 4% are claimed defective", t`$\mathrm{B}(50, 0.04)$`],
      ["number of calls in 2 hours, when calls arrive at 3 per hour", t`$\mathrm{Po}(6)$`],
      ["number of sixes in 30 throws of a fair die", t`$\mathrm{B}\left(30, \frac{1}{6}\right)$`],
      ["number of flaws in 5 m of cloth, when flaws occur at 0.6 per metre", t`$\mathrm{Po}(3)$`],
    ],
    explanation: "Fixed number of trials with a constant probability: binomial. Random events at a constant rate: Poisson, with λ scaled to the interval.",
  });

  const sz15 = binom.cdf(30, 0.2, 2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A test of $H_0: p = 0.2$ against $H_1: p < 0.2$ uses $X \sim \mathrm{B}(30, 0.2)$ and the critical region $X \le 2$. Find the actual significance level of the test, correct to 3 significant figures.`,
    value: sz15, wrong: [binom.pmf(30, 0.2, 2), binom.cdf(30, 0.2, 1)],
    explanation: t`The actual significance level is $\mathrm{P}(X \le 2) = 0.8^{30} + 30(0.2)(0.8)^{29} + 435(0.2)^2(0.8)^{28} = ${s(sz15)}$, so $${sfStr(sz15)}$.`,
    hints: ["The significance level is the probability of the critical region when H₀ is true."],
  });

  const lo16 = criticalRegion(Bc(40, 0.15), 0.025, "lower");
  const up16 = criticalRegion(Bc(40, 0.15), 0.025, "upper");
  chk(lo16.c, 1); chk(up16.c, 12);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A two-tailed test of $H_0: p = 0.15$ at the 5% level uses $X \sim \mathrm{B}(40, 0.15)$, with 2.5% in each tail. Which observed value of $X$ would lead to rejecting $H_0$?`,
    options: [
      ["1", t`Correct: $\mathrm{P}(X \le 1) = ${s(lo16.size)} \le 0.025$, so 1 is in the lower critical region.`],
      ["2", t`$\mathrm{P}(X \le 2) = ${s(binom.cdf(40, 0.15, 2))} > 0.025$, so 2 is not in the critical region.`],
      ["11", t`$\mathrm{P}(X \ge 11) = ${s(1 - binom.cdf(40, 0.15, 10))} > 0.025$; the upper critical region starts at 12.`],
      ["6", "6 is the expected value under H₀, the least extreme result possible."],
    ],
    answer: "A",
    explanation: t`The critical region is $X \le 1$ or $X \ge 12$.`,
    hints: ["Check each tail probability against 0.025."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: CAM,
    stem: "If faults occur at 2.5 per week under H₀, then the number of faults in a 4-week period has the distribution Po(10) under H₀.",
    answer: true,
    explanation: t`The Poisson mean scales with the length of the interval: $4 \times 2.5 = 10$.`,
  });

  // ---------------------------------------------------------------- structured (5 marks)
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: "A supplier of chicks to farmers in Mashonaland East claims that 20% of chicks die in the first week. A farmer who uses a new brooder believes the death rate is lower. Of 30 chicks raised with the brooder, 2 die in the first week.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which hypotheses should be tested?",
        options: [
          [t`$H_0: p = 0.2$, $H_1: p < 0.2$`, "Correct."],
          [t`$H_0: p = 0.2$, $H_1: p > 0.2$`, "The farmer suspects a lower rate."],
          [t`$H_0: p = 0.2$, $H_1: p \ne 0.2$`, "A direction is suspected."],
          [t`$H_0: p = \frac{2}{30}$, $H_1: p < 0.2$`, "H₀ is the claimed value 0.2."],
        ], answer: "A", explanation: "Lower-tail test." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the p-value P(X ≤ 2) under H₀, correct to 3 significant figures.", value: sz15, wrong: [binom.pmf(30, 0.2, 2)],
        explanation: t`$X \sim \mathrm{B}(30, 0.2)$: $\mathrm{P}(X \le 2) = ${s(sz15)}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Carry out the test at the 5% significance level and state your conclusion in context.",
        points: [`Compares ${sfStr(sz15)} < 0.05 and rejects H₀.`, "There is evidence at the 5% level that the death rate with the new brooder is less than 20%."],
        modelAnswer: `P(X ≤ 2) = ${sfStr(sz15)} < 0.05, so reject H₀. There is evidence at the 5% level that fewer than 20% of chicks die in the first week when the new brooder is used.`,
        explanation: "Decision and contextual conclusion." }),
    ],
    explanation: "A lower-tail binomial test: find P(X ≤ observed) and compare with the significance level.",
    hints: ["Under H₀, X ~ B(30, 0.2).", "Compare with 0.05."],
  });

  // ---------------------------------------------------------------- structured (13 marks, Cambridge: Poisson)
  const p18b = poisson.cdf(6, 0);
  const cr18 = criticalRegion(Pc(6), 0.05, "lower");
  chk(cr18.c, 1);
  const r18e = normalProb(18, sqrt(18), -Infinity, 10.5);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, applies: CAM,
    stem: "Before speed humps were built on a road in Gweru, accidents occurred at random at an average rate of 6 per month. In the first month after the humps were built there were no accidents.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State suitable hypotheses for a test of whether the accident rate has decreased, defining your parameter.",
        points: [t`$H_0: \lambda = 6$, $H_1: \lambda < 6$.`, t`$\lambda$ is the mean number of accidents per month.`],
        modelAnswer: t`Let $\lambda$ be the mean number of accidents per month. $H_0: \lambda = 6$, $H_1: \lambda < 6$.`,
        explanation: "Define λ in context." }),
      P.num({ label: "(b)", marks: 3, stem: "Find the p-value of the observed result, correct to 3 significant figures.", value: p18b, wrong: [poisson.pmf(6, 1)],
        explanation: t`$\mathrm{P}(X = 0) = \mathrm{e}^{-6} = ${s(p18b)}$. (For a lower-tail test with an observed 0, the p-value is just $\mathrm{P}(X = 0)$.)` }),
      P.manual({ label: "(c)", marks: 2, stem: "Carry out the test at the 5% significance level, stating your conclusion in context.",
        points: [`${sfStr(p18b)} < 0.05, so reject H₀.`, "There is evidence at the 5% level that the accident rate has decreased."],
        modelAnswer: `P(X = 0) = ${sfStr(p18b)} < 0.05: reject H₀. There is evidence at the 5% level that the mean number of accidents per month has decreased since the humps were built.`,
        explanation: "Decision then context." }),
      P.fib({ label: "(d)", marks: 2, stem: "Find the critical region X ≤ c for this one-month test at the 5% level, and its actual significance level (correct to 3 significant figures).", template: "c = {{blank:c}}, actual level = {{blank:a}}",
        blanks: [D("c", cr18.c, 0, "2"), D("a", sfStr(cr18.size), 0.0005, sfStr(poisson.cdf(6, 2)))],
        explanation: t`$\mathrm{P}(X \le 1) = ${s(cr18.size)} \le 0.05$, $\mathrm{P}(X \le 2) = ${s(poisson.cdf(6, 2))} > 0.05$, so $X \le 1$.` }),
      P.num({ label: "(e)", marks: 3, stem: "The council instead counts accidents over the first 3 months, finding 10. Using a suitable approximation, find the probability under H₀ of 10 or fewer accidents in 3 months, correct to 3 significant figures.", value: r18e.exact, tol: r18e.tol, wrong: [normalProb(18, sqrt(18), -Infinity, 10).exact],
        explanation: t`Under $H_0$, $X \sim \mathrm{Po}(18) \approx \mathrm{N}(18, 18)$ ($\lambda > 15$). $\mathrm{P}(X \le 10) \approx \mathrm{P}(Y < 10.5)$, $z = \frac{-7.5}{\sqrt{18}} = ${s(-7.5 / sqrt(18))}$, probability $${sfStr(r18e.exact)}$.` }),
      P.mcq({ label: "(f)", marks: 1, stem: "What is the conclusion of the 3-month test at the 5% level?",
        options: [
          ["Reject H₀: evidence that the rate has decreased.", "Correct: the probability is below 0.05."],
          ["Do not reject H₀: 10 is close to 18.", "The probability, not closeness, decides."],
          ["Reject H₀: evidence that the rate has increased.", "Ten is below the expected 18."],
          ["The test is invalid because λ > 15.", "λ > 15 is what justifies the normal approximation."],
        ], answer: "A", explanation: `${sfStr(r18e.exact)} < 0.05.` }),
    ],
    explanation: "A lower-tail Poisson test: scale λ to the period, use exact Poisson probabilities for small λ and a normal approximation with continuity correction for λ > 15.",
    hints: ["For 3 months, λ = 18.", "Use 10.5 for 'at most 10'."],
  });
  chk(r18e.exact < 0.05 ? 1 : 0, 1);

  // ---------------------------------------------------------------- flashcards
  b.card("CONCEPT", "Binomial test procedure", "State H₀: p = p₀ and H₁; under H₀ X ~ B(n, p₀); find P(X ≤ x) or P(X ≥ x) and compare with the significance level; conclude in context.");
  b.card("CONCEPT", "Critical region for a discrete test", "Lower: largest c with P(X ≤ c) ≤ α. Upper: smallest c with P(X ≥ c) ≤ α. Two-tailed: α/2 in each tail.");
  b.card("DEFINITION", "Actual significance level", "The probability of the critical region when H₀ is true; for discrete tests usually below the nominal level.");
  b.card("CONCEPT", "Poisson test", t`$H_0: \lambda = \lambda_0$; scale $\lambda$ to the period observed; find the tail probability of the observed count.`, undefined, { applies: CAM });
  b.card("CONCEPT", "Normal approximation in a binomial test", t`If $np > 5$ and $nq > 5$: $X \approx \mathrm{N}(np, npq)$ with a continuity correction (e.g. $X \ge 40 \to Y > 39.5$).`);
  b.card("CONCEPT", "Normal approximation in a Poisson test", t`If $\lambda > 15$: $X \approx \mathrm{N}(\lambda, \lambda)$ with a continuity correction.`, undefined, { applies: CAM });
  b.card("FACT", "Which tail is the p-value?", "The tail in the direction of H₁, including the observed value: P(X ≥ x) for '>', P(X ≤ x) for '<'.");
  b.card("CONCEPT", "Binomial model assumptions", "Fixed number of independent trials, two outcomes, constant probability of success.");
  b.card("FACT", "Two-tailed discrete test", "Compare each tail probability with half the significance level (0.025 for a 5% test).");
});
