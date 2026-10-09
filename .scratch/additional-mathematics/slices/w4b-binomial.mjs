// W4b: amath.distributions.binomial (ZIMSEC only)
import { concept, P, t, chk, same, binom, nCr, sfStr } from "../lib.mjs";

const pmf = binom.pmf;
const cdf = binom.cdf;

concept("amath.distributions.binomial", { file: "distributions/binomial", keyPrefix: "distributions.binomial" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which of these is **not** one of the conditions for a binomial model $X \sim B(n, p)$?`,
    options: [
      ["Success and failure are equally likely", "Correct: p can be any value from 0 to 1; it need not be 0.5."],
      ["There is a fixed number of trials", "This is a binomial condition: n is fixed in advance."],
      ["The trials are independent", "This is a binomial condition."],
      ["The probability of success is the same in every trial", "This is a binomial condition: p is constant."],
    ],
    answer: "A",
    explanation: "The conditions are: a fixed number n of independent trials, each with two outcomes, and a constant probability p of success. Nothing requires p = 0.5.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which random variable is best modelled by a binomial distribution?",
    options: [
      ["The number of heads in 15 tosses of a fair coin", "Correct: 15 independent trials, two outcomes, p = 0.5 each time."],
      ["The number of tosses of a coin needed to get the first head", "The number of trials is not fixed, so this is not binomial."],
      ["The number of girls when 4 learners are chosen without replacement from a class of 12", "Without replacement from a small class, p changes after each choice."],
      ["The total score when 3 dice are rolled", "A total score is not a count of successes in trials with two outcomes."],
    ],
    answer: "A",
    explanation: "Binomial: a fixed number of independent trials with constant p, counting successes. The coin tosses meet every condition.",
  });

  {
    const v = pmf(6, 0.4, 2);
    chk(v, 15 * 0.16 * 0.6 ** 4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`$X \sim B(6, 0.4)$. Find $P(X = 2)$, correct to 3 significant figures.`,
      value: v, wrong: [0.16 * 0.6 ** 4, 15 * 0.4 ** 4 * 0.6 ** 2],
      explanation: t`$P(X = 2) = \binom{6}{2}(0.4)^2(0.6)^4 = 15 \times 0.16 \times 0.1296 = 0.311$. Leaving out $\binom{6}{2} = 15$ gives 0.0207; swapping the powers gives 0.138.`,
    });
  }

  {
    const v = binom.mean(40, 0.35);
    chk(v, 14);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`In a large town, 35% of households own a solar panel. A random sample of 40 households is taken. $X$ is the number in the sample with a solar panel. Find $E(X)$.`,
      value: v, wrong: [9.1, 26],
      explanation: t`$X \sim B(40, 0.35)$, so $E(X) = np = 40 \times 0.35 = 14$. 9.1 is the variance $npq$; 26 is the expected number without a panel.`,
    });
  }

  {
    const v = Math.sqrt(binom.variance(25, 0.36));
    chk(v, 2.4);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$X \sim B(25, 0.36)$. Find the standard deviation of $X$.`,
      value: v, wrong: [5.76, 9],
      explanation: t`$\operatorname{Var}(X) = npq = 25 \times 0.36 \times 0.64 = 5.76$, so the standard deviation is $\sqrt{5.76} = 2.4$. 5.76 is the variance; 9 is the mean.`,
      hints: ["The standard deviation is the square root of npq."],
    });
  }

  {
    const v = cdf(9, 0.25, 1);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$X \sim B(9, 0.25)$. Find $P(X \leq 1)$, correct to 3 significant figures.`,
      value: v, wrong: [pmf(9, 0.25, 1), 1 - v],
      explanation: t`$P(X = 0) = 0.75^9 = 0.07508$ and $P(X = 1) = 9 \times 0.25 \times 0.75^8 = 0.22525$. $P(X \leq 1) = 0.07508 + 0.22525 = ${sfStr(v, 3)}$. Forgetting $P(X = 0)$ gives 0.225.`,
      hints: [t`$X \leq 1$ means $X = 0$ or $X = 1$.`],
    });
  }

  {
    const v = 1 - 0.88 ** 7;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Each egg from a farm in Marondera is cracked with probability 0.12, independently. A box holds 7 eggs. Find the probability that at least one egg in the box is cracked, correct to 3 significant figures.",
      value: v, wrong: [0.88 ** 7, 7 * 0.12],
      explanation: t`$X \sim B(7, 0.12)$. $P(X \geq 1) = 1 - P(X = 0) = 1 - 0.88^7 = 1 - 0.40868 = ${sfStr(v, 3)}$. 0.409 is $P(X = 0)$; $7 \times 0.12$ is the mean, not a probability.`,
      hints: ["At least one = 1 − P(none)."],
    });
  }

  {
    const p = 1 / 6;
    const v = pmf(12, p, 2) + pmf(12, p, 3) + pmf(12, p, 4);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A fair die is rolled 12 times. Find the probability of getting between 2 and 4 sixes inclusive, correct to 3 significant figures.",
      value: v, wrong: [pmf(12, p, 3), pmf(12, p, 2) + pmf(12, p, 3)],
      explanation: t`$X \sim B\left(12, \frac{1}{6}\right)$. $P(X = 2) = 66\left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^{10} = 0.29609$, $P(X = 3) = 220\left(\frac{1}{6}\right)^3\left(\frac{5}{6}\right)^9 = 0.19739$, $P(X = 4) = 495\left(\frac{1}{6}\right)^4\left(\frac{5}{6}\right)^8 = 0.08883$. Total $= ${sfStr(v, 3)}$. Leaving out $X = 4$ gives 0.493.`,
      hints: ["'Between 2 and 4 inclusive' means X = 2, 3 or 4."],
    });
    chk(pmf(12, p, 2), 0.29609, 1e-5); chk(pmf(12, p, 3), 0.19739, 1e-5); chk(pmf(12, p, 4), 0.08883, 1e-5);
  }

  {
    const q = 2.88 / 4.8, p = 1 - q, n = 4.8 / p;
    chk(q, 0.6); chk(p, 0.4); chk(n, 12);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`$X \sim B(n, p)$ has mean 4.8 and variance 2.88. Find $n$ and $p$.`,
      template: "n = {{blank:n}}, p = {{blank:p}}",
      blanks: [
        { id: "n", input: "number", accepted: [12], wrong: "8" },
        { id: "p", input: "number", accepted: [0.4], tolerance: 0.0005, wrong: "0.6" },
      ],
      explanation: t`$npq = 2.88$ and $np = 4.8$, so $q = \frac{2.88}{4.8} = 0.6$ and $p = 0.4$. Then $n = \frac{4.8}{0.4} = 12$. Taking $p = 0.6$ (the value of $q$) gives $n = 8$.`,
      hints: ["Divide the variance by the mean to get q."],
    });
  }

  {
    let n = 1;
    while (0.94 ** n >= 0.1) n++;
    same(n, 38);
    chk(Math.log(0.1) / Math.log(0.94), 37.21, 0.01);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A machine makes bolts, and each bolt is faulty with probability 0.06, independently. An inspector takes n bolts. Find the least value of n for which the probability that at least one bolt is faulty is greater than 0.9.",
      value: n, wrong: [37, 15],
      explanation: t`We need $1 - 0.94^n > 0.9$, so $0.94^n < 0.1$. $0.94^{37} = 0.1013$ (not small enough) and $0.94^{38} = 0.0952$. Least $n = 38$. With logarithms, $n > \frac{\lg 0.1}{\lg 0.94} = 37.2$, so $n = 38$; rounding down to 37 is wrong.`,
      hints: ["P(at least one faulty) = 1 − 0.94ⁿ.", "Solve 0.94ⁿ < 0.1 by trial or with logarithms."],
    });
    chk(0.94 ** 37, 0.1013, 1e-4); chk(0.94 ** 38, 0.0952, 1e-4);
  }

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`For $X \sim B(n, p)$, $\operatorname{Var}(X) = np$.`,
    answer: false,
    explanation: t`False. $np$ is the mean. The variance is $np(1 - p)$, which is smaller than the mean.`,
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $X \sim B(10, 0.5)$, then $P(X = 3) = P(X = 7)$.`,
    answer: true,
    explanation: t`True. $P(X = 3) = \binom{10}{3}0.5^{10}$ and $P(X = 7) = \binom{10}{7}0.5^{10}$, and $\binom{10}{3} = \binom{10}{7} = 120$. With $p = 0.5$ the distribution is symmetrical about the mean 5.`,
    hints: [t`Compare $\binom{10}{3}$ and $\binom{10}{7}$.`],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim B(10, 0.35)$. Which expression equals $P(X = 4)$?`,
    options: [
      [t`$\binom{10}{4}(0.35)^4(0.65)^6$`, "Correct: r = 4 successes and n − r = 6 failures."],
      [t`$\binom{10}{4}(0.35)^6(0.65)^4$`, "The power of p must be the number of successes, 4."],
      [t`$(0.35)^4(0.65)^6$`, "This is one particular order; multiply by the number of orders."],
      [t`$\binom{10}{4}(0.35)^4$`, "The failures are missing: (0.65)⁶ is needed too."],
    ],
    answer: "A",
    explanation: t`$P(X = r) = \binom{n}{r}p^r(1 - p)^{n - r}$ with $n = 10$, $r = 4$, $p = 0.35$.`,
  });

  {
    chk(binom.mean(20, 0.25), 5); chk(binom.variance(20, 0.25), 3.75);
    b.match({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`$X \sim B(20, 0.25)$. Match each quantity with its value or expression.`,
      pairs: [
        [t`$E(X)$`, "5"],
        [t`$\operatorname{Var}(X)$`, "3.75"],
        [t`$P(X = 0)$`, t`$0.75^{20}$`],
        [t`$P(X = 20)$`, t`$0.25^{20}$`],
        [t`$P(X \geq 1)$`, t`$1 - 0.75^{20}$`],
      ],
      explanation: t`$np = 5$, $npq = 20 \times 0.25 \times 0.75 = 3.75$. No successes: every trial fails, $0.75^{20}$. All successes: $0.25^{20}$. At least one: $1 - P(X = 0)$.`,
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Four learners are chosen at random, without replacement, from a group of 12 girls and 8 boys. Explain why the number of girls chosen does not have a binomial distribution.",
    points: [
      "Without replacement, the probability that the next learner chosen is a girl changes after each choice (12/20, then 11/19 or 12/19, …).",
      "So p is not constant and the choices are not independent, which breaks the binomial conditions.",
    ],
    modelAnswer: "The probability of choosing a girl is 12/20 for the first learner but 11/19 or 12/19 for the second, depending on the first choice. The probability is not constant and the trials are not independent, so the binomial conditions fail.",
    explanation: "A small population sampled without replacement is not binomial.",
    hints: ["Does the probability of choosing a girl stay the same?"],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Nyasha models the number of days in a 30-day month on which it rains in Harare by a binomial distribution. Give two reasons why this model may not be suitable.",
    points: [
      "The trials (days) may not be independent: a rainy day makes rain the next day more likely (weather comes in spells).",
      "The probability of rain may not be the same on every day of the month (it changes with the season).",
    ],
    modelAnswer: "Rain on one day makes rain on the next day more likely, so the days are not independent; and the probability of rain changes through the month as the season changes, so p is not constant.",
    explanation: "Check each binomial condition in context: independence and constant p are the usual failures.",
    hints: ["Which binomial conditions might fail for weather?"],
  });

  {
    const p = 0.6;
    chk(p ** 5, 0.07776);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`$X \sim B(5, p)$ and $P(X = 5) = 0.07776$. Find $p$.`,
      value: p, wrong: [0.4, 0.07776 / 5],
      explanation: t`$P(X = 5) = p^5 = 0.07776$, so $p = 0.07776^{\frac{1}{5}} = 0.6$. The answer 0.4 would give $P(X = 0) = 0.6^5$ instead.`,
      hints: [t`$P(X = 5) = p^5$.`],
    });
  }

  {
    const p = 0.92, q = 0.08, n = 14;
    const all = p ** n, fail2 = pmf(n, q, 2), mean = n * q, atMost1 = cdf(n, q, 1);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: "The borehole pump at a school in Masvingo starts first time on any morning with probability 0.92, independently of other mornings. Consider a period of 14 mornings.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the probability that the pump starts first time on all 14 mornings, correct to 3 significant figures.", value: all, wrong: [0.92 * 14, 1 - all],
          explanation: t`$0.92^{14} = ${sfStr(all, 3)}$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the probability that it fails to start first time on exactly 2 mornings, correct to 3 significant figures.", value: fail2, wrong: [q ** 2 * p ** 12, pmf(n, p, 2)],
          explanation: t`Let $F \sim B(14, 0.08)$ be the number of failures. $P(F = 2) = \binom{14}{2}(0.08)^2(0.92)^{12} = 91 \times 0.0064 \times ${(0.92 ** 12).toFixed(5)} = ${sfStr(fail2, 3)}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the expected number of mornings on which it fails to start first time.", value: mean, wrong: [12.88],
          explanation: t`$E(F) = 14 \times 0.08 = 1.12$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Find the probability that it fails to start first time on at most one morning, correct to 3 significant figures.", value: atMost1, wrong: [pmf(n, q, 1), all],
          explanation: t`$P(F \leq 1) = 0.92^{14} + 14 \times 0.08 \times 0.92^{13} = ${sfStr(all, 4)} + ${sfStr(pmf(n, q, 1), 4)} = ${sfStr(atMost1, 3)}$.` }),
      ],
      explanation: "Define the number of failures as B(14, 0.08) and use the binomial formula, adding terms for 'at most'.",
      hints: ["Count failures: p = 0.08 for a failure.", "At most one: F = 0 or F = 1."],
    });
  }

  {
    const n = 15, p = 0.2;
    const atLeast3 = 1 - cdf(n, p, 2);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: "A quiz has 15 multiple-choice questions, each with 5 options of which only one is correct. Tatenda guesses every answer at random. X is the number of correct answers.",
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`State the distribution of $X$ in the form $X \sim B(n, p)$.`, template: "n = {{blank:n}}, p = {{blank:p}}",
          blanks: [{ id: "n", input: "number", accepted: [n], wrong: "5" }, { id: "p", input: "number", accepted: [p], tolerance: 0.0005, wrong: "0.8" }],
          explanation: t`15 independent questions, each correct with probability $\frac{1}{5} = 0.2$: $X \sim B(15, 0.2)$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the probability that Tatenda gets at least 3 answers correct, correct to 3 significant figures.", value: atLeast3, wrong: [1 - cdf(n, p, 3), cdf(n, p, 2)],
          explanation: t`$P(X \leq 2) = 0.8^{15} + 15(0.2)(0.8)^{14} + 105(0.2)^2(0.8)^{13} = ${sfStr(pmf(n, p, 0), 4)} + ${sfStr(pmf(n, p, 1), 4)} + ${sfStr(pmf(n, p, 2), 4)} = ${sfStr(cdf(n, p, 2), 4)}$. So $P(X \geq 3) = 1 - ${sfStr(cdf(n, p, 2), 4)} = ${sfStr(atLeast3, 3)}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Find $E(X)$.`, value: n * p, wrong: [2.4],
          explanation: t`$15 \times 0.2 = 3$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Find $\operatorname{Var}(X)$.`, value: n * p * (1 - p), wrong: [3],
          explanation: t`$15 \times 0.2 \times 0.8 = 2.4$.` }),
      ],
      explanation: "Identify n and p, use the complement for 'at least', and np, npq for the mean and variance.",
      hints: ["At least 3 = 1 − P(X ≤ 2)."],
    });
  }

  // flashcards
  b.card("CONCEPT", "Binomial conditions", "Fixed number n of trials; two outcomes; constant probability p of success; independent trials. X counts successes.");
  b.card("FORMULA", "Binomial probability", t`$P(X = r) = \binom{n}{r}p^r(1 - p)^{n - r}$`);
  b.card("FORMULA", "Mean of B(n, p)", t`$E(X) = np$`);
  b.card("FORMULA", "Variance of B(n, p)", t`$\operatorname{Var}(X) = np(1 - p)$`, "The standard deviation is the square root.");
  b.card("CONCEPT", "Finding p from the mean and variance", t`Divide: $\frac{npq}{np} = q$, then $p = 1 - q$ and $n = \frac{\text{mean}}{p}$.`);
  b.card("FORMULA", "At least one success", t`$P(X \geq 1) = 1 - (1 - p)^n$`);
  b.card("CONCEPT", "Least n for P(at least one) > k", t`Solve $(1 - p)^n < 1 - k$ by trial or logarithms; round **up** to the next whole number.`);
  b.card("FACT", "Symmetry", t`$B(n, 0.5)$ is symmetrical about $\frac{n}{2}$; for $p < 0.5$ it is skewed with a long tail to the right.`);
  b.card("CONCEPT", "Why the coefficient nCr", t`Each arrangement of $r$ successes has probability $p^r q^{n - r}$, and there are $\binom{n}{r}$ arrangements.`);
});
