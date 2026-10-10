// W3b: amaths.discrete.poisson (ZIMSEC Statistics F6 6.4.2; Cambridge P6 6.1)
import { concept, P, t, chk, sfStr, poisson, binom, ZS } from "../lib.mjs";

const { exp, log, sqrt, ceil } = Math;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const pm = poisson.pmf;
const cdf = poisson.cdf;
const s = (x) => sfStr(x, 4);

concept("amaths.discrete.poisson", { file: "discrete/poisson", keyPrefix: "discrete.poisson" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these random variables is most suitably modelled by a Poisson distribution?",
    options: [
      ["the number of potholes in a randomly chosen 1 km stretch of a rural road", "Correct: potholes occur singly and at random along the road, at a roughly constant average rate per km, and there is no fixed upper limit."],
      ["the number of heads when a fair coin is tossed 20 times", "There is a fixed number of trials (20) with constant probability: this is binomial, B(20, 0.5)."],
      ["the mass of a randomly chosen 50 kg bag of maize from a Grain Marketing Board depot", "Mass is a continuous measurement; the Poisson distribution models counts."],
      ["the number of throws of a die needed to obtain the first six", "This is the trial on which the first success happens: a geometric distribution."],
    ],
    answer: "A",
    explanation: "A Poisson distribution models the number of random, independent events in a fixed interval of time or space when they occur singly at a constant average rate.",
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The random variable $X$ has the distribution $\mathrm{Po}(9)$. What is the standard deviation of $X$?`,
    options: [
      ["3", t`Correct: $\mathrm{Var}(X) = \lambda = 9$, so the standard deviation is $\sqrt{9} = 3$.`],
      ["9", "9 is the mean and the variance; the standard deviation is the square root of the variance."],
      ["81", t`$81 = 9^2$; squaring is the wrong way round.`],
      ["4.5", "Halving the mean has no meaning here; take the square root of the variance."],
    ],
    answer: "A",
    explanation: t`For $\mathrm{Po}(\lambda)$, $\mathrm{E}(X) = \mathrm{Var}(X) = \lambda$, so the standard deviation is $\sqrt{\lambda}$.`,
  });

  const v1 = pm(3.4, 2);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Cars arrive at a fuel station in Mutare at random at an average rate of 3.4 per five-minute period. Find the probability that exactly 2 cars arrive in a given five-minute period. Give your answer correct to 3 significant figures.`,
    value: v1, wrong: [cdf(3.4, 2), 3.4 ** 2 / 2],
    explanation: t`$X \sim \mathrm{Po}(3.4)$: $\mathrm{P}(X = 2) = \mathrm{e}^{-3.4}\dfrac{3.4^{2}}{2!} = ${s(v1)}$, so $${sfStr(v1)}$. ($${sfStr(cdf(3.4, 2))}$ is $\mathrm{P}(X \le 2)$; $5.78$ forgets the factor $\mathrm{e}^{-3.4}$.)`,
  });

  const v2 = cdf(2.2, 1);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`The number of typing errors on a page of a report has the distribution $\mathrm{Po}(2.2)$. Find the probability that a randomly chosen page has at most one error. Give your answer correct to 3 significant figures.`,
    value: v2, wrong: [pm(2.2, 1), exp(-2.2)],
    explanation: t`$\mathrm{P}(X \le 1) = \mathrm{e}^{-2.2}(1 + 2.2) = 3.2\mathrm{e}^{-2.2} = ${s(v2)}$, so $${sfStr(v2)}$. ($${sfStr(pm(2.2, 1))}$ is $\mathrm{P}(X = 1)$ only.)`,
  });

  const v3 = 1 - cdf(5.1, 3);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Emails arrive in a school office at random at a mean rate of 5.1 per hour. Find the probability that more than 3 emails arrive in an hour. Give your answer correct to 3 significant figures.`,
    value: v3, wrong: [1 - cdf(5.1, 2), cdf(5.1, 3)],
    explanation: t`"More than 3" means $X \ge 4$: $\mathrm{P}(X > 3) = 1 - \mathrm{P}(X \le 3) = 1 - \mathrm{e}^{-5.1}\left(1 + 5.1 + \frac{5.1^2}{2} + \frac{5.1^3}{6}\right) = ${s(v3)}$, so $${sfStr(v3)}$. ($${sfStr(1 - cdf(5.1, 2))}$ is $\mathrm{P}(X \ge 3)$, the wrong boundary.)`,
    workedSolution: t`1. $X \sim \mathrm{Po}(5.1)$; "more than 3" is $X \ge 4$.
2. $\mathrm{P}(X \le 3) = \mathrm{e}^{-5.1}(1 + 5.1 + 13.005 + 22.1085) = ${s(cdf(5.1, 3))}$.
3. $\mathrm{P}(X > 3) = 1 - ${s(cdf(5.1, 3))} = ${s(v3)}$, so $${sfStr(v3)}$.`,
    hints: ["Write 'more than 3' as an inequality on whole numbers.", "Use 1 − P(X ≤ 3)."],
  });

  const v4 = pm(4, 4);
  chk(0.8 * 5, 4);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A borehole pump in Masvingo needs a minor repair at random at an average rate of 0.8 per working day. Find the probability that exactly 4 repairs are needed in a 5-day working week. Give your answer correct to 3 significant figures.`,
    value: v4, wrong: [pm(0.8, 4), cdf(4, 4)],
    explanation: t`Scale the rate: $\lambda = 0.8 \times 5 = 4$, so $Y \sim \mathrm{Po}(4)$ and $\mathrm{P}(Y = 4) = \mathrm{e}^{-4}\dfrac{4^4}{4!} = ${s(v4)}$, so $${sfStr(v4)}$. ($${sfStr(pm(0.8, 4))}$ uses $\lambda = 0.8$ without scaling to the week.)`,
    hints: ["Find the mean number of repairs in 5 days first."],
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZS,
    stem: t`The random variable $X$ has the distribution $\mathrm{Po}(6.25)$. Write down the mean, the variance and the standard deviation of $X$.`,
    template: "mean = {{blank:m}}, variance = {{blank:v}}, standard deviation = {{blank:s}}",
    blanks: [D("m", 6.25, 0.001, "2.5"), D("v", 6.25, 0.001, "39.0625"), D("s", 2.5, 0.001, "6.25")],
    explanation: t`For $\mathrm{Po}(\lambda)$ the mean and variance are both $\lambda = 6.25$, and the standard deviation is $\sqrt{6.25} = 2.5$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "For any Poisson distribution, the variance is greater than the mean.",
    answer: false,
    explanation: t`For $\mathrm{Po}(\lambda)$ the mean and the variance are **equal** (both $\lambda$). A sample whose variance is much larger than its mean suggests that a Poisson model is not suitable.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A Poisson random variable can take any non-negative whole-number value $0, 1, 2, 3, \dots$, with no upper limit.`,
    answer: true,
    explanation: t`Unlike $\mathrm{B}(n, p)$, which stops at $n$, the Poisson distribution has no upper limit, although large values have very small probabilities.`,
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A Poisson distribution is suggested as a model for the number of customers who arrive at a restaurant in Victoria Falls in a 10-minute period during an evening. Which observation gives the strongest reason to doubt the model?",
    options: [
      ["Customers usually arrive in groups of friends or families.", "Correct: arrivals do not occur singly or independently when people come in groups."],
      ["The average number of customers arriving per 10-minute period is 3.6.", "Any positive mean is possible for a Poisson model; a mean of 3.6 is no reason to doubt it."],
      ["Some 10-minute periods have no customers at all.", "Zero is a possible Poisson value; periods with no arrivals are expected."],
      ["The number of customers in a period has no fixed maximum.", "No fixed upper limit is a feature of the Poisson model, not a problem."],
    ],
    answer: "A",
    explanation: "The Poisson conditions are that events occur singly, independently, at random and at a constant average rate. Group arrivals break the 'singly' and 'independently' conditions (and a busy dinner hour would break the constant rate).",
    hints: ["List the conditions for a Poisson model and test each against the context."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{Po}(\lambda)$. Match each event with the probability expression that gives it.`,
    pairs: [
      ["fewer than 3", t`$\mathrm{P}(X \le 2)$`],
      ["at least 3", t`$1 - \mathrm{P}(X \le 2)$`],
      ["more than 3", t`$1 - \mathrm{P}(X \le 3)$`],
      ["at most 3", t`$\mathrm{P}(X \le 3)$`],
    ],
    explanation: t`For a whole-number variable: fewer than 3 is $X \le 2$; at least 3 is $X \ge 3$, the complement of $X \le 2$; more than 3 is $X \ge 4$, the complement of $X \le 3$; at most 3 is $X \le 3$.`,
  });

  const lam12 = log(10 / 3);
  chk(exp(-lam12), 0.3, 1e-12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The number of faulty bulbs in a box has a Poisson distribution. The probability that a box contains no faulty bulbs is 0.3. Find the mean number of faulty bulbs per box, correct to 3 significant figures.`,
    value: lam12, wrong: [0.3, -log(0.7)],
    explanation: t`$\mathrm{P}(X = 0) = \mathrm{e}^{-\lambda} = 0.3$, so $\lambda = -\ln 0.3 = \ln\frac{10}{3} = ${s(lam12)}$, i.e. $${sfStr(lam12)}$. ($${sfStr(-log(0.7))}$ solves $\mathrm{e}^{-\lambda} = 0.7$, mixing up "none" with "at least one".)`,
    hints: [t`Write $\mathrm{P}(X = 0)$ from the formula.`, "Take natural logarithms."],
  });

  // P(X = 3) = 2 P(X = 2) → λ/3 = 2 → λ = 6
  chk(pm(6, 3) / pm(6, 2), 2, 1e-12);
  const v13 = cdf(6, 2);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The random variable $X$ has a Poisson distribution, and $\mathrm{P}(X = 3) = 2\,\mathrm{P}(X = 2)$. Find $\mathrm{P}(X \le 2)$, correct to 3 significant figures.`,
    value: v13, wrong: [cdf(2, 2), cdf(1.5, 2)],
    explanation: t`$\dfrac{\mathrm{P}(X = 3)}{\mathrm{P}(X = 2)} = \dfrac{\mathrm{e}^{-\lambda}\lambda^3/6}{\mathrm{e}^{-\lambda}\lambda^2/2} = \dfrac{\lambda}{3} = 2$, so $\lambda = 6$. Then $\mathrm{P}(X \le 2) = \mathrm{e}^{-6}(1 + 6 + 18) =${s(v13)}$, so $${sfStr(v13)}$. (Using $\lambda = 2$ copies the factor 2 as the mean.)`,
    workedSolution: t`1. Divide: $\dfrac{\mathrm{P}(X = 3)}{\mathrm{P}(X = 2)} = \dfrac{\lambda}{3}$.
2. $\dfrac{\lambda}{3} = 2 \Rightarrow \lambda = 6$.
3. $\mathrm{P}(X \le 2) = \mathrm{e}^{-6}(1 + 6 + 18) = 25\mathrm{e}^{-6} = ${s(v13)}$, so $${sfStr(v13)}$.`,
    hints: ["Divide one probability by the other: the e^(−λ) cancels.", "The ratio simplifies to λ/3."],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`$X \sim \mathrm{Po}(3.7)$. What is the most likely value of $X$ (the mode)?`,
    options: [
      ["3", t`Correct: $\mathrm{P}(X = r) = \frac{3.7}{r}\mathrm{P}(X = r - 1)$ increases while $\frac{3.7}{r} > 1$, i.e. up to $r = 3$, and decreases from $r = 4$. $\mathrm{P}(X = 3) = ${sfStr(pm(3.7, 3))}$ and $\mathrm{P}(X = 4) = ${sfStr(pm(3.7, 4))}$.`],
      ["4", t`Rounding 3.7 up gives 4, but $\mathrm{P}(X = 4) = ${sfStr(pm(3.7, 4))}$ is less than $\mathrm{P}(X = 3) = ${sfStr(pm(3.7, 3))}$.`],
      ["3.7", "The mean need not be a possible value; X takes whole-number values only."],
      ["0", t`$\mathrm{P}(X = 0) = \mathrm{e}^{-3.7} = ${sfStr(exp(-3.7))}$ is small; 0 is the mode only when $\lambda < 1$.`],
    ],
    answer: "A",
    explanation: t`The ratio of successive probabilities is $\lambda / r$; the probabilities rise while this exceeds 1. For a non-integer $\lambda$ the mode is the integer part of $\lambda$.`,
    hints: [t`Compare $\mathrm{P}(X = 3)$ and $\mathrm{P}(X = 4)$.`],
  });
  chk(pm(3.7, 3) > pm(3.7, 4) && pm(3.7, 3) > pm(3.7, 2) ? 1 : 0, 1);

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "Nyasha counts the number of minibuses passing her gate in each of 60 one-minute periods during the morning rush. The sample mean is 2.4 and the sample variance is 5.9. Comment on whether a Poisson distribution is a suitable model, giving a reason from the context.",
    points: [
      "States that for a Poisson model the mean and variance should be about equal, but 5.9 is much larger than 2.4, so the model is not suitable.",
      "Gives a contextual reason, e.g. minibuses travel in bunches (not independently) or the rate is not constant during the rush hour.",
    ],
    modelAnswer: "A Poisson distribution has mean equal to variance, but here the variance (5.9) is more than twice the mean (2.4), so the model does not fit well. Minibuses tend to arrive in bunches after traffic lights, so they are not independent, and the rate changes during the rush hour.",
    explanation: "Comparing the mean and variance is the standard quick check of a Poisson model; a large variance indicates clustering.",
    hints: ["What is true of the mean and variance of any Poisson distribution?"],
  });

  const p16 = pm(2.5, 2);
  const v16 = p16 ** 3;
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Calls to a helpline arrive at random at an average rate of 2.5 per hour. Find the probability that there are exactly 2 calls in **each** of three separate one-hour periods. Give your answer correct to 3 significant figures.`,
    value: v16, wrong: [pm(7.5, 6), p16],
    explanation: t`For one hour, $\mathrm{P}(X = 2) = \mathrm{e}^{-2.5}\dfrac{2.5^2}{2} = ${s(p16)}$. The hours are independent, so the probability is $${s(p16)}^3 = ${sfStr(v16, 4)}$, i.e. $${sfStr(v16)}$. ($${sfStr(pm(7.5, 6))}$ is the probability of 6 calls in 3 hours in total, which allows other splits such as 3, 1, 2.)`,
    workedSolution: t`1. One hour: $X \sim \mathrm{Po}(2.5)$, $\mathrm{P}(X = 2) = ${s(p16)}$.
2. Three independent hours, each with exactly 2: $${s(p16)}^3 = ${sfStr(v16, 4)}$.
3. Answer $${sfStr(v16)}$.`,
    hints: ["Find the probability for one hour first.", "The three hours are independent: multiply."],
  });

  const n17 = ceil(log(100) / 0.35);
  chk(n17, 14);
  chk(exp(-0.35 * 13) > 0.01 && exp(-0.35 * 14) < 0.01 ? 1 : 0, 1);
  b.num({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: t`Sightings of a rare bird at a dam near Kariba occur at random at an average rate of 0.35 per day. Find the smallest number of days for which the probability of at least one sighting is greater than 0.99.`,
    value: n17, wrong: [13, 3],
    explanation: t`In $n$ days the number of sightings is $\mathrm{Po}(0.35n)$. We need $1 - \mathrm{e}^{-0.35n} > 0.99$, i.e. $\mathrm{e}^{-0.35n} < 0.01$, so $0.35n > \ln 100$ and $n > ${sfStr(log(100) / 0.35, 4)}$. The smallest whole number is $n = 14$. (13 rounds down; check: $\mathrm{e}^{-0.35 \times 13} = ${sfStr(exp(-0.35 * 13))}$, which is not below 0.01.)`,
    hints: ["Write the mean for n days as 0.35n.", "P(at least one) = 1 − P(none)."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{Po}(\lambda)$. Which expression equals $\mathrm{P}(X \ge 2)$?`,
    options: [
      [t`$1 - \mathrm{e}^{-\lambda}(1 + \lambda)$`, t`Correct: $\mathrm{P}(X \ge 2) = 1 - \mathrm{P}(X = 0) - \mathrm{P}(X = 1) = 1 - \mathrm{e}^{-\lambda} - \lambda\mathrm{e}^{-\lambda}$.`],
      [t`$1 - \mathrm{e}^{-\lambda}$`, t`This is $\mathrm{P}(X \ge 1)$; it leaves out $\mathrm{P}(X = 1)$.`],
      [t`$1 - \mathrm{e}^{-\lambda}\left(1 + \lambda + \frac{\lambda^2}{2}\right)$`, t`This subtracts $\mathrm{P}(X = 2)$ as well, giving $\mathrm{P}(X \ge 3)$.`],
      [t`$\mathrm{e}^{-\lambda}\frac{\lambda^2}{2}$`, t`This is $\mathrm{P}(X = 2)$ only, not the probability of 2 or more.`],
    ],
    answer: "A",
    explanation: t`"At least 2" is the complement of "0 or 1": $\mathrm{P}(X \ge 2) = 1 - \mathrm{e}^{-\lambda}(1 + \lambda)$.`,
  });

  // ------------------------------------------------------------ structured (5 marks)
  const a5 = pm(2.8, 2);
  const b5 = 1 - cdf(2.8, 3);
  const c5 = (1 - exp(-2.8)) ** 2;
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Emergency calls to a fire station in Gweru occur at random at an average rate of 2.8 per day. Give answers correct to 3 significant figures.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the probability of exactly 2 calls on a particular day.", value: a5, wrong: [cdf(2.8, 2)],
        explanation: t`$\mathrm{e}^{-2.8}\dfrac{2.8^2}{2} = ${s(a5)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability of more than 3 calls on a particular day.", value: b5, wrong: [1 - cdf(2.8, 2)],
        explanation: t`$1 - \mathrm{P}(X \le 3) = 1 - \mathrm{e}^{-2.8}\left(1 + 2.8 + 3.92 + 3.6587\right) = ${s(b5)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the probability that there is at least one call on each of two consecutive days.", value: c5, wrong: [1 - exp(-5.6)],
        explanation: t`One day: $\mathrm{P}(X \ge 1) = 1 - \mathrm{e}^{-2.8} = ${s(1 - exp(-2.8))}$. Two independent days: $${s(1 - exp(-2.8))}^2 = ${s(c5)}$. ($1 - \mathrm{e}^{-5.6}$ is "at least one call in the two days altogether".)` }),
    ],
    explanation: "Define X ~ Po(2.8) for one day; use complements for 'more than' and 'at least', and multiply for independent days.",
    hints: ["'More than 3' is X ≥ 4.", "'At least one on each day' is not the same as 'at least one in two days'."],
  });

  // ------------------------------------------------------------ structured (12 marks)
  const l2 = 0.6 * 2;
  const bb = exp(-l2);
  const cc = 1 - cdf(3, 2);
  const A = log(20) / 0.6;
  chk(exp(-0.6 * A), 0.05, 1e-12);
  const ee = binom.pmf(10, bb, 2);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A factory in Chitungwiza makes tarpaulin. Flaws occur at random in the tarpaulin at an average rate of 0.6 per square metre. Give probabilities correct to 3 significant figures.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State two conditions, in context, needed for a Poisson distribution to be a suitable model for the number of flaws in a sheet.",
        points: ["Flaws occur independently of one another (one flaw does not make another nearby more likely).", "Flaws occur singly and at a constant average rate per square metre (uniformly through the material)."],
        modelAnswer: "Flaws must occur independently of each other, singly, and at a constant average rate of 0.6 per square metre throughout the tarpaulin.",
        explanation: "Each condition should mention flaws or the tarpaulin." }),
      P.num({ label: "(b)", marks: 1, stem: t`Find the probability that a sheet of area 2 m$^2$ has no flaws.`, value: bb, wrong: [exp(-0.6)],
        explanation: t`$\lambda = 0.6 \times 2 = 1.2$: $\mathrm{P}(X = 0) = \mathrm{e}^{-1.2} = ${s(bb)}$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Find the probability that a sheet of area 5 m$^2$ has at least 3 flaws.`, value: cc, wrong: [1 - cdf(3, 3), 1 - cdf(0.6, 2)],
        explanation: t`$\lambda = 3$: $1 - \mathrm{e}^{-3}(1 + 3 + 4.5) = 1 - 8.5\mathrm{e}^{-3} = ${s(cc)}$.` }),
      P.num({ label: "(d)", marks: 3, stem: t`A sheet of area $A$ m$^2$ has probability 0.05 of having no flaws. Find $A$.`, value: A, unit: "m²", wrong: [0.05 / 0.6, log(20)],
        explanation: t`$\mathrm{e}^{-0.6A} = 0.05 \Rightarrow 0.6A = \ln 20 \Rightarrow A = ${s(A)}$, i.e. $${sfStr(A)}$ m$^2$. ($${sfStr(log(20))}$ is the mean number of flaws, not the area.)` }),
      P.num({ label: "(e)", marks: 3, stem: t`Ten sheets, each of area 2 m$^2$, are chosen at random. Find the probability that exactly 2 of them have no flaws.`, value: ee, wrong: [pm(10 * bb, 2), bb ** 2],
        explanation: t`The number of flawless sheets is $\mathrm{B}(10, p)$ with $p = ${s(bb)}$ from (b): $\binom{10}{2}p^2(1 - p)^8 = ${s(ee)}$.` }),
    ],
    explanation: "Scale λ to each area; part (e) combines the Poisson probability with a binomial count of sheets.",
    hints: ["Mean flaws in A m² = 0.6A.", "In (e), each sheet either has no flaws or not: a binomial situation."],
  });

  // ------------------------------------------------------------ flashcards
  b.card("FORMULA", t`Poisson probability: $\mathrm{P}(X = r)$ for $X \sim \mathrm{Po}(\lambda)$`, t`$\mathrm{e}^{-\lambda}\dfrac{\lambda^r}{r!}$ for $r = 0, 1, 2, \dots$`, "Given in MF19 (Cambridge); learn it for ZIMSEC.");
  b.card("FACT", t`Mean and variance of $\mathrm{Po}(\lambda)$`, t`Both equal $\lambda$; standard deviation $\sqrt{\lambda}$.`);
  b.card("CONCEPT", "Conditions for a Poisson model", "Events occur singly, independently, at random, at a constant average rate in time or space.", "Always state them in context.");
  b.card("CONCEPT", "Scaling a Poisson parameter", t`The mean is proportional to the interval: 1.5 per week gives $\mathrm{Po}(3)$ per fortnight.`);
  b.card("FORMULA", t`Recurrence for Poisson probabilities`, t`$\mathrm{P}(X = r) = \dfrac{\lambda}{r}\,\mathrm{P}(X = r - 1)$`, "Useful for quick checks and for finding the mode.");
  b.card("FACT", t`Mode of $\mathrm{Po}(\lambda)$ when $\lambda$ is not an integer`, t`The integer part of $\lambda$ (e.g. 3 for $\lambda = 3.7$).`, t`If $\lambda$ is an integer, $\lambda - 1$ and $\lambda$ are both modes.`);
  b.card("CONCEPT", "Quick data check for a Poisson model", "Sample mean and sample variance should be roughly equal; a much larger variance suggests clustering.");
  b.card("FORMULA", t`$\mathrm{P}(X \ge 1)$ for $\mathrm{Po}(\lambda)$`, t`$1 - \mathrm{e}^{-\lambda}$`);
  b.card("DEFINITION", "Poisson distribution", "The distribution of the number of random events in a fixed interval of time or space, taking values 0, 1, 2, … with no upper limit.");
});
