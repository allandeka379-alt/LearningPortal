// W3b: amaths.discrete.poisson-approximations (Cambridge P6 6.1 only)
import { concept, P, t, chk, sfStr, poisson, binom, normalProb, CAM } from "../lib.mjs";

const { exp, log, sqrt, ceil } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const pm = poisson.pmf;
const cdf = poisson.cdf;
const s = (x) => sfStr(x, 4);
const z = (x, m, v) => (x - m) / sqrt(v);

concept("amaths.discrete.poisson-approximations", { file: "discrete/poisson-approximations", keyPrefix: "discrete.poisson-approximations", applies: CAM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Under which conditions is $\mathrm{B}(n, p)$ usually approximated by a Poisson distribution?`,
    options: [
      [t`$n > 50$ and $np < 5$`, "Correct: a large number of trials with a small probability, so the mean np is small."],
      [t`$np > 5$ and $nq > 5$`, "These are the conditions for the normal approximation to the binomial."],
      [t`$n < 50$ and $p > 0.5$`, "A small n with a large p is the opposite of what the Poisson approximation needs."],
      [t`$\lambda > 15$`, "This is the condition for approximating a Poisson distribution by a normal distribution."],
    ],
    answer: "A",
    explanation: t`For large $n$ and small $p$ the binomial variance $np(1 - p)$ is close to its mean $np$, as in a Poisson distribution, so $\mathrm{B}(n, p) \approx \mathrm{Po}(np)$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "For which of these binomial distributions is a Poisson approximation most suitable?",
    options: [
      [t`$\mathrm{B}(80, 0.04)$`, t`Correct: $n = 80 > 50$ and $np = 3.2 < 5$.`],
      [t`$\mathrm{B}(30, 0.05)$`, t`$np = 1.5$ is small, but $n = 30$ is not large enough by the usual guide ($n > 50$).`],
      [t`$\mathrm{B}(120, 0.3)$`, t`$np = 36$ is far too large; a normal approximation would suit this one.`],
      [t`$\mathrm{B}(60, 0.1)$`, t`$n > 50$, but $np = 6$ is not less than 5.`],
    ],
    answer: "A",
    explanation: "Check both conditions with numbers: n > 50 and np < 5.",
  });

  const v3 = pm(3, 1);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`The random variable $X$ has the distribution $\mathrm{B}(150, 0.02)$. Use a Poisson approximation to find $\mathrm{P}(X = 1)$, correct to 3 significant figures.`,
    value: v3, wrong: [exp(-3), 1 - exp(-3)],
    explanation: t`$\lambda = np = 150 \times 0.02 = 3$, so $X \approx \mathrm{Po}(3)$ and $\mathrm{P}(X = 1) \approx 3\mathrm{e}^{-3} = ${s(v3)}$, i.e. $${sfStr(v3)}$. (The exact binomial value is $${s(binom.pmf(150, 0.02, 1))}$.)`,
  });

  const r4 = normalProb(25, 5, -Infinity, 20.5);
  chk(z(20.5, 25, 25), -0.9, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{Po}(25)$. Use a suitable normal approximation to find $\mathrm{P}(X \le 20)$. Give your answer correct to 3 significant figures.`,
    value: r4.exact, tol: r4.tol, wrong: [normalProb(25, 5, -Infinity, 20).exact, normalProb(25, 25, -Infinity, 20.5).exact],
    explanation: t`$X \approx Y \sim \mathrm{N}(25, 25)$. With a continuity correction $\mathrm{P}(X \le 20) \approx \mathrm{P}(Y < 20.5)$, $z = \frac{20.5 - 25}{5} = -0.9$, and $\Phi(-0.9) = 1 - 0.8159 = 0.1841$, so $0.184$. (Without the continuity correction you get $${sfStr(normalProb(25, 5, -Infinity, 20).exact)}$; dividing by 25 instead of 5 gives $${sfStr(normalProb(25, 25, -Infinity, 20.5).exact)}$.)`,
    hints: ["The variance is 25, so the standard deviation is 5.", "'At most 20' includes 20: use 20.5."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{Po}(26)$ is approximated by $Y \sim \mathrm{N}(26, 26)$. Which normal probability should be used for $\mathrm{P}(X > 30)$?`,
    options: [
      [t`$\mathrm{P}(Y > 30.5)$`, "Correct: 'more than 30' starts at 31, whose interval begins at 30.5."],
      [t`$\mathrm{P}(Y > 29.5)$`, "This includes 30, so it represents X ≥ 30, not X > 30."],
      [t`$\mathrm{P}(Y > 30)$`, "This has no continuity correction."],
      [t`$\mathrm{P}(Y < 30.5)$`, "This is the complement: it represents X ≤ 30."],
    ],
    answer: "A",
    explanation: t`The whole number $k$ is represented by $k - \frac12 < Y < k + \frac12$. $X > 30$ means $X \ge 31$, so the boundary is $30.5$.`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$X \sim \mathrm{Po}(36)$ is to be approximated by a normal distribution $\mathrm{N}(\mu, \sigma^2)$. State the values of $\mu$, $\sigma^2$ and $\sigma$.`,
    template: "μ = {{blank:m}}, σ² = {{blank:v}}, σ = {{blank:s}}",
    blanks: [D("m", 36, 0.001, "6"), D("v", 36, 0.001, "6"), D("s", 6, 0.001, "36")],
    explanation: t`The normal approximation keeps the mean and the variance: $\mu = 36$, $\sigma^2 = 36$, so $\sigma = 6$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`When $\mathrm{B}(n, p)$ is approximated by $\mathrm{Po}(np)$, a continuity correction must be used.`,
    answer: false,
    explanation: "Both the binomial and the Poisson distributions are discrete, so no continuity correction is needed. A continuity correction is needed only when a discrete distribution is approximated by a continuous (normal) one.",
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The distribution $\mathrm{Po}(4)$ can be approximated well by $\mathrm{N}(4, 4)$.`,
    answer: false,
    explanation: t`With $\lambda = 4$ the Poisson distribution is clearly positively skewed, and $\mathrm{N}(4, 4)$ would give noticeable probability to negative values. The guide is $\lambda > 15$.`,
    hints: ["Recall the guide value of λ for the normal approximation."],
  });

  b.match({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Match each distribution with the most suitable way of finding its probabilities.",
    pairs: [
      [t`$\mathrm{B}(500, 0.006)$`, t`approximate by $\mathrm{Po}(3)$`],
      [t`$\mathrm{Po}(40)$`, t`approximate by $\mathrm{N}(40, 40)$`],
      [t`$\mathrm{B}(60, 0.5)$`, t`approximate by $\mathrm{N}(30, 15)$`],
      [t`$\mathrm{B}(12, 0.3)$`, "use the exact binomial formula"],
    ],
    explanation: t`$\mathrm{B}(500, 0.006)$: $n > 50$, $np = 3 < 5$, Poisson. $\mathrm{Po}(40)$: $\lambda > 15$, normal with variance 40. $\mathrm{B}(60, 0.5)$: $np = nq = 30 > 5$, normal with variance $npq = 15$. $\mathrm{B}(12, 0.3)$: $n$ is small, so calculate exactly.`,
    hints: ["Check n, np and nq (or λ) for each one."],
  });

  const v10 = 1 - cdf(3.6, 1);
  chk(900 * 0.004, 3.6, 1e-12);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`0.4% of the memory chips made in a factory are defective. A batch contains 900 chips. Use a suitable approximation to find the probability that the batch contains at least 2 defective chips. Give your answer correct to 3 significant figures.`,
    value: v10, wrong: [1 - exp(-3.6), 1 - cdf(0.4, 1)],
    explanation: t`$X \sim \mathrm{B}(900, 0.004)$ with $n > 50$, $np = 3.6 < 5$, so $X \approx \mathrm{Po}(3.6)$. $\mathrm{P}(X \ge 2) = 1 - \mathrm{e}^{-3.6}(1 + 3.6) = ${s(v10)}$, so $${sfStr(v10)}$. ($${sfStr(1 - exp(-3.6))}$ is $\mathrm{P}(X \ge 1)$.)`,
    workedSolution: t`1. $X \sim \mathrm{B}(900, 0.004)$: $n = 900 > 50$ and $np = 3.6 < 5$.
2. $X \approx \mathrm{Po}(3.6)$.
3. $\mathrm{P}(X \ge 2) = 1 - \mathrm{P}(X = 0) - \mathrm{P}(X = 1) = 1 - 4.6\mathrm{e}^{-3.6} = ${s(v10)}$.
4. Answer $${sfStr(v10)}$.`,
    hints: ["Compute np and check the conditions.", "Use 1 − P(X = 0) − P(X = 1)."],
  });

  const r11 = normalProb(20, sqrt(20), 19.5, 20.5);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{Po}(20)$. Use a normal approximation to estimate $\mathrm{P}(X = 20)$, giving your answer correct to 3 significant figures.`,
    value: r11.exact, tol: r11.tol, wrong: [0, normalProb(20, sqrt(20), 20, 20.5).exact],
    explanation: t`$X \approx Y \sim \mathrm{N}(20, 20)$. A single value needs an interval: $\mathrm{P}(X = 20) \approx \mathrm{P}(19.5 < Y < 20.5)$. $z = \pm\frac{0.5}{\sqrt{20}} = \pm 0.1118$, so the probability is $2\Phi(0.1118) - 1 = ${s(r11.exact)}$, i.e. $${sfStr(r11.exact)}$. (The exact Poisson value is $${s(pm(20, 20))}$. Answering 0 forgets that the continuous approximation needs an interval.)`,
    workedSolution: t`1. $Y \sim \mathrm{N}(20, 20)$; $\mathrm{P}(X = 20) \approx \mathrm{P}(19.5 < Y < 20.5)$.
2. $z = \dfrac{20.5 - 20}{\sqrt{20}} = 0.1118$ and $-0.1118$.
3. $\Phi(0.1118) - \Phi(-0.1118) = ${s(r11.exact)}$, so $${sfStr(r11.exact)}$ (4-figure tables with $z = 0.11$ give $0.0876$).`,
    hints: ["For one value of X use the interval from 19.5 to 20.5."],
  });

  const v12 = cdf(3.6, 3);
  chk(120 * 0.03, 3.6, 1e-12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`97% of the seeds of a variety of groundnut germinate. Rudo plants 120 seeds. Use a suitable approximation to find the probability that at least 117 of them germinate. Give your answer correct to 3 significant figures.`,
    value: v12, wrong: [1 - cdf(3.6, 2), cdf(3.6, 2)],
    explanation: t`Count the failures: $F \sim \mathrm{B}(120, 0.03)$ with $n > 50$ and $np = 3.6 < 5$, so $F \approx \mathrm{Po}(3.6)$. At least 117 germinate means at most 3 fail: $\mathrm{P}(F \le 3) = \mathrm{e}^{-3.6}\left(1 + 3.6 + \frac{3.6^2}{2} + \frac{3.6^3}{6}\right) = ${s(v12)}$, so $${sfStr(v12)}$.`,
    hints: ["p = 0.97 is not small: count the seeds that fail instead.", "At least 117 germinate ⇔ at most 3 fail."],
  });

  const r13 = normalProb(22.5, sqrt(22.5), 25.5, Infinity);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Faults on a ZESA distribution line occur at random at an average rate of 4.5 per week. Use a suitable approximation to find the probability that more than 25 faults occur in a 5-week period. Give your answer correct to 3 significant figures.`,
    value: r13.exact, tol: r13.tol, wrong: [normalProb(22.5, sqrt(22.5), 24.5, Infinity).exact, normalProb(22.5, 22.5, 25.5, Infinity).exact],
    explanation: t`In 5 weeks $X \sim \mathrm{Po}(22.5)$; $\lambda > 15$, so $X \approx Y \sim \mathrm{N}(22.5, 22.5)$. "More than 25" is $X \ge 26$, so use $\mathrm{P}(Y > 25.5)$: $z = \frac{25.5 - 22.5}{\sqrt{22.5}} = ${sfStr(z(25.5, 22.5, 22.5), 4)}$, probability $1 - \Phi(0.6325) = ${s(r13.exact)}$, so $${sfStr(r13.exact)}$. (Using 24.5 gives $\mathrm{P}(X \ge 25)$.)`,
    workedSolution: t`1. $\lambda = 4.5 \times 5 = 22.5 > 15$: $Y \sim \mathrm{N}(22.5, 22.5)$.
2. $\mathrm{P}(X > 25) \approx \mathrm{P}(Y > 25.5)$.
3. $z = \dfrac{3}{\sqrt{22.5}} = 0.6325$; $1 - \Phi(0.6325) = ${s(r13.exact)}$.
4. Answer $${sfStr(r13.exact)}$.`,
    hints: ["Scale the rate to 5 weeks first.", "'More than 25' starts at 26."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Farai wants to use $\mathrm{N}(6, 6)$ to approximate probabilities for $X \sim \mathrm{Po}(6)$. Which is the best reason why this approximation is not suitable?`,
    options: [
      [t`$\lambda = 6$ is too small, so the distribution of $X$ is noticeably skewed.`, t`Correct: the normal approximation needs $\lambda$ to be large (about $\lambda > 15$) for the Poisson distribution to be nearly symmetrical.`],
      ["The mean and the variance of the two distributions are different from each other.", t`$\mathrm{N}(6, 6)$ has the same mean and variance as $\mathrm{Po}(6)$.`],
      ["A continuity correction cannot be used when the mean is a whole number like 6.", "A continuity correction can always be used; the mean being a whole number is irrelevant."],
      ["A normal distribution can never be used for a discrete random variable at all.", "Normal approximations to discrete distributions are standard when the conditions hold."],
    ],
    answer: "A",
    explanation: "For small λ the Poisson distribution is skewed to the right, so a symmetrical normal curve fits badly.",
    hints: ["What does the shape of a Poisson distribution look like for small λ?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`A website receives 2400 visits a day, and each visit independently has probability 0.001 of ending in a purchase. Tendai says that the number of purchases in a day can be approximated by $\mathrm{Po}(2.4)$. Justify Tendai's approximation and explain why its answers differ slightly from exact binomial answers.`,
    points: [
      t`Justifies with numbers: $n = 2400 > 50$ and $np = 2.4 < 5$ (p small), so $\mathrm{B}(2400, 0.001) \approx \mathrm{Po}(2.4)$.`,
      t`Explains the difference: the binomial variance $np(1 - p) = 2.3976$ is slightly less than the Poisson variance $2.4$ (and the binomial stops at $n$), so the distributions are close but not identical.`,
    ],
    modelAnswer: "n = 2400 is large and np = 2.4 is less than 5, so B(2400, 0.001) ≈ Po(2.4). The answers differ slightly because the binomial variance is np(1 − p) = 2.3976 rather than 2.4, and the binomial cannot exceed 2400; the approximation becomes exact only in the limit.",
    explanation: "A justification quotes the conditions with the actual numbers; the approximation is good because 1 − p is close to 1.",
    hints: ["Compare np(1 − p) with np."],
  });

  const n16 = ceil(log(10) / 0.002);
  chk(n16, 1152);
  b.num({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: t`Each bottle filled by a machine independently has probability 0.002 of being underfilled. Using a Poisson approximation, find the smallest number of bottles $n$ for which the probability that **none** of the $n$ bottles is underfilled is less than 0.1.`,
    value: n16, wrong: [1151, 50],
    explanation: t`The number underfilled is approximately $\mathrm{Po}(0.002n)$. $\mathrm{P}(\text{none}) \approx \mathrm{e}^{-0.002n} < 0.1 \Rightarrow 0.002n > \ln 10 \Rightarrow n > ${sfStr(log(10) / 0.002, 6)}$, so $n = 1152$. (1151 rounds down and does not satisfy the inequality.)`,
    hints: ["Write λ in terms of n.", "Solve e^(−0.002n) < 0.1 with logarithms."],
  });

  const r17 = normalProb(24, sqrt(24), 29.5, Infinity);
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{Po}(24)$. Using a normal approximation, which value is closest to $\mathrm{P}(X \ge 30)$?`,
    options: [
      [`${sfStr(r17.exact)}`, t`Correct: $\mathrm{P}(Y > 29.5)$ with $z = \frac{5.5}{\sqrt{24}} = ${sfStr(z(29.5, 24, 24))}$ gives $${sfStr(r17.exact)}$.`],
      [`${sfStr(normalProb(24, sqrt(24), 30.5, Infinity).exact)}`, "This uses 30.5, which represents X > 30 (that is, X ≥ 31)."],
      [`${sfStr(normalProb(24, 24, 29.5, Infinity).exact)}`, "This divides by the variance 24 instead of the standard deviation √24."],
      [`${sfStr(normalProb(24, sqrt(24), 30, Infinity).exact)}`, "This omits the continuity correction."],
    ],
    answer: "A",
    explanation: t`$X \approx Y \sim \mathrm{N}(24, 24)$; "at least 30" includes 30, so use 29.5: $1 - \Phi\left(\frac{29.5 - 24}{\sqrt{24}}\right) = ${sfStr(r17.exact)}$.`,
    hints: ["Does 'at least 30' include 30?"],
  });

  // ------------------------------------------------------------ structured (5 marks)
  const s5b = cdf(3, 1);
  const s5c = 1 - cdf(3, 5);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`On average 1.2% of the eggs delivered to a bakery in Bulawayo are cracked. A delivery contains 250 eggs, and $X$ is the number of cracked eggs in it.`,
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Justify the use of a Poisson approximation for the distribution of X.",
        points: [t`States $n = 250 > 50$ and $np = 3 < 5$ (both values needed).`],
        modelAnswer: "n = 250 is large (> 50) and np = 250 × 0.012 = 3 < 5.", explanation: "Quote both conditions with numbers." }),
      P.num({ label: "(b)", marks: 2, stem: "Use the approximation to find P(X < 2), correct to 3 significant figures.", value: s5b, wrong: [cdf(3, 2)],
        explanation: t`$X \approx \mathrm{Po}(3)$: $\mathrm{P}(X \le 1) = 4\mathrm{e}^{-3} = ${s(s5b)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Use the approximation to find P(X > 5), correct to 3 significant figures.", value: s5c, wrong: [1 - cdf(3, 4)],
        explanation: t`$1 - \mathrm{P}(X \le 5) = 1 - \mathrm{e}^{-3}\left(1 + 3 + 4.5 + 4.5 + 3.375 + 2.025\right) = ${s(s5c)}$.` }),
    ],
    explanation: "B(250, 0.012) ≈ Po(3); then use Poisson probabilities with careful inequalities.",
    hints: ["'Fewer than 2' is X ≤ 1.", "'More than 5' is 1 − P(X ≤ 5)."],
  });

  // ------------------------------------------------------------ structured (13 marks)
  const a13 = pm(1.2, 2);
  const r13b = normalProb(24, sqrt(24), -Infinity, 19.5);
  const d13 = pm(3, 4);
  const q0 = exp(-1.2);
  const e13 = binom.pmf(4, q0, 2);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Accidents on a stretch of the Harare–Bulawayo road occur at random at an average rate of 1.2 per week. Give probabilities correct to 3 significant figures.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability of exactly 2 accidents in a particular week.", value: a13, wrong: [cdf(1.2, 2)],
        explanation: t`$\mathrm{e}^{-1.2}\dfrac{1.2^2}{2} = ${s(a13)}$.` }),
      P.manual({ label: "(b)", marks: 1, stem: "Explain why a normal distribution can be used to approximate the number of accidents in a 20-week period.",
        points: [t`The number in 20 weeks is $\mathrm{Po}(24)$ and $\lambda = 24 > 15$, so the distribution is approximately normal.`],
        modelAnswer: "In 20 weeks the number of accidents is Po(24); since λ = 24 > 15 the normal approximation N(24, 24) is suitable.", explanation: "Give the value of λ and compare it with 15." }),
      P.num({ label: "(c)", marks: 4, stem: "Use a normal approximation to find the probability of fewer than 20 accidents in a 20-week period.", value: r13b.exact, tol: r13b.tol, wrong: [normalProb(24, sqrt(24), -Infinity, 20.5).exact, normalProb(24, sqrt(24), -Infinity, 20).exact],
        explanation: t`$Y \sim \mathrm{N}(24, 24)$; fewer than 20 is $X \le 19$, so use $\mathrm{P}(Y < 19.5)$: $z = \frac{19.5 - 24}{\sqrt{24}} = ${sfStr(z(19.5, 24, 24), 4)}$, probability $${s(r13b.exact)}$.` }),
      P.num({ label: "(d)", marks: 3, stem: t`Each day about 600 heavy vehicles use this stretch, and each independently has probability 0.005 of being stopped at a weighbridge for overloading. Use a suitable approximation to find the probability that exactly 4 vehicles are stopped on a particular day.`, value: d13, wrong: [binom.pmf(600, 0.005, 3), pm(3, 3)],
        explanation: t`$\mathrm{B}(600, 0.005)$ with $n > 50$, $np = 3 < 5$: $\mathrm{Po}(3)$, $\mathrm{P}(X = 4) = \mathrm{e}^{-3}\dfrac{3^4}{24} = ${s(d13)}$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find the probability that in a 4-week period there are exactly 2 weeks with no accidents.", value: e13, wrong: [pm(4.8, 0), q0 ** 2],
        explanation: t`One week with no accidents: $\mathrm{e}^{-1.2} = ${s(q0)}$. The number of such weeks is $\mathrm{B}(4, ${s(q0)})$: $\binom{4}{2}(${s(q0)})^2(${s(1 - q0)})^2 = ${s(e13)}$.` }),
    ],
    explanation: "Poisson for one week, a normal approximation for a large λ, a Poisson approximation to a binomial, and a binomial count of weeks.",
    hints: ["Scale λ before approximating.", "'Fewer than 20' is X ≤ 19, so the boundary is 19.5.", "In (e), each week is a trial with success 'no accidents'."],
  });

  // ------------------------------------------------------------ flashcards
  b.card("FACT", "Poisson approximation to the binomial", t`$\mathrm{B}(n, p) \approx \mathrm{Po}(np)$ when $n > 50$ and $np < 5$.`, "No continuity correction: both are discrete.");
  b.card("FACT", "Normal approximation to the Poisson", t`$\mathrm{Po}(\lambda) \approx \mathrm{N}(\lambda, \lambda)$ when $\lambda > 15$.`, "Use a continuity correction.");
  b.card("CONCEPT", "Why Po(np) approximates B(n, p) when p is small", t`The binomial variance $np(1 - p)$ is then close to its mean $np$, as for a Poisson distribution.`);
  b.card("CONCEPT", "Continuity correction", t`The integer $k$ is represented by $k - \frac12 < Y < k + \frac12$ when a discrete distribution is approximated by a normal one.`);
  b.card("FORMULA", t`$\mathrm{P}(X \ge 25)$, $X \sim \mathrm{Po}(22)$, by a normal approximation`, t`$\mathrm{P}(Y > 24.5)$ with $Y \sim \mathrm{N}(22, 22)$`);
  b.card("FORMULA", t`Standardising for $\mathrm{N}(\lambda, \lambda)$`, t`$z = \dfrac{x - \lambda}{\sqrt{\lambda}}$`, "Divide by the standard deviation √λ, not by λ.");
  b.card("CONCEPT", "B(n, p) with p close to 1", "Count the other outcome (failures), whose probability 1 − p is small, then use a Poisson approximation.");
  b.card("CONCEPT", "Why N(λ, λ) is poor for small λ", "Po(λ) is positively skewed for small λ; a symmetrical normal curve fits badly.");
});
