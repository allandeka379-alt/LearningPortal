// W3a: amaths.discrete.binomial (every probability from binom.pmf/cdf)
import { concept, P, t, chk, binom, nCr, sfStr, ZS } from "../lib.mjs";

const S3 = (x) => sfStr(x, 3);
const between = (n, p, lo, hi) => binom.cdf(n, p, hi) - (lo > 0 ? binom.cdf(n, p, lo - 1) : 0);

concept("amaths.discrete.binomial", { file: "discrete/binomial", keyPrefix: "discrete.binomial" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$X \sim \mathrm{B}(n, p)$. Which expression gives $\mathrm{P}(X = r)$?`,
    options: [
      [t`${"$"}{}^nC_r\,p^r(1 - p)^{n - r}$`, "Correct: the number of orders times the probability of one order."],
      [t`$p^r(1 - p)^{n - r}$`, t`This is the probability of one particular order; the ${"$"}{}^nC_r$ orders are missing.`],
      [t`${"$"}{}^nP_r\,p^r(1 - p)^{n - r}$`, "Permutations overcount: the r successes are not distinguished from each other."],
      [t`${"$"}{}^nC_r\,p^{n - r}(1 - p)^r$`, "The powers are swapped: p goes with the r successes."],
    ],
    answer: "A",
    explanation: t`Choose which $r$ of the $n$ trials succeed (${"$"}{}^nC_r$ ways); each such order has probability $p^r(1 - p)^{n - r}$.`,
  });

  const v1 = binom.pmf(8, 0.4, 3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`$X \sim \mathrm{B}(8, 0.4)$. Find $\mathrm{P}(X = 3)$, correct to 3 significant figures.`,
    value: v1, wrong: [Number(S3(0.4 ** 3 * 0.6 ** 5)), Number(S3(nCr(8, 3) * 0.4 ** 5 * 0.6 ** 3))],
    explanation: t`$\mathrm{P}(X = 3) = {}^8C_3(0.4)^3(0.6)^5 = 56 \times 0.064 \times 0.07776 = ${S3(v1)}$. ($${S3(0.4 ** 3 * 0.6 ** 5)}$ leaves out ${"$"}{}^8C_3 = 56$.)`,
  });

  const v2 = binom.cdf(8, 0.15, 1);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "15% of the eggs from a poultry project in Marondera are cracked during transport. A tray of 8 eggs is chosen at random. Find the probability that at most 1 egg is cracked, correct to 3 significant figures.",
    value: v2, wrong: [Number(S3(binom.pmf(8, 0.15, 1))), Number(S3(1 - v2))],
    explanation: t`$X \sim \mathrm{B}(8, 0.15)$. $\mathrm{P}(X \le 1) = 0.85^8 + 8(0.15)(0.85)^7 = ${S3(binom.pmf(8, 0.15, 0))} + ${S3(binom.pmf(8, 0.15, 1))} = ${S3(v2)}$. ($${S3(binom.pmf(8, 0.15, 1))}$ is only $\mathrm{P}(X = 1)$.)`,
  });

  const v3 = 1 - binom.cdf(14, 0.25, 2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{B}(14, 0.25)$. Find $\mathrm{P}(X \ge 3)$, correct to 3 significant figures.`,
    value: v3, wrong: [Number(S3(1 - binom.cdf(14, 0.25, 3))), Number(S3(binom.cdf(14, 0.25, 2)))],
    explanation: t`$\mathrm{P}(X \ge 3) = 1 - \mathrm{P}(X \le 2) = 1 - (0.75^{14} + 14(0.25)(0.75)^{13} + 91(0.25)^2(0.75)^{12}) = 1 - ${S3(binom.cdf(14, 0.25, 2))} = ${S3(v3)}$. ($${S3(1 - binom.cdf(14, 0.25, 3))}$ subtracts $\mathrm{P}(X \le 3)$, the wrong boundary.)`,
    hints: ["Use the complement: at least 3 = 1 − P(at most 2)."],
  });

  const v4 = between(11, 0.45, 4, 6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{B}(11, 0.45)$. Find $\mathrm{P}(3 < X \le 6)$, correct to 3 significant figures.`,
    value: v4, wrong: [Number(S3(between(11, 0.45, 3, 6))), Number(S3(between(11, 0.45, 4, 5)))],
    explanation: t`$3 < X \le 6$ means $X = 4, 5, 6$: $${S3(binom.pmf(11, 0.45, 4))} + ${S3(binom.pmf(11, 0.45, 5))} + ${S3(binom.pmf(11, 0.45, 6))} = ${S3(v4)}$ (adding unrounded values). ($${S3(between(11, 0.45, 3, 6))}$ wrongly includes $X = 3$.)`,
    hints: ["List the integer values that satisfy 3 < X ≤ 6."],
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$X \sim \mathrm{B}(40, 0.15)$. Find $\mathrm{E}(X)$ and $\mathrm{Var}(X)$.`,
    template: "E(X) = {{blank:e}}; Var(X) = {{blank:v}}",
    blanks: [{ id: "e", input: "number", accepted: ["6"], wrong: "34" }, { id: "v", input: "number", accepted: ["5.1"], tolerance: 0.001, wrong: "0.9" }],
    explanation: t`$\mathrm{E}(X) = 40 \times 0.15 = 6$; $\mathrm{Var}(X) = 40 \times 0.15 \times 0.85 = 5.1$.`,
  });
  chk(binom.mean(40, 0.15), 6); chk(binom.variance(40, 0.15), 5.1);

  // find n, p from mean and variance
  chk(binom.mean(25, 0.36), 9); chk(binom.variance(25, 0.36), 5.76);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A binomial random variable has mean 9 and variance 5.76. Find n and p.",
    template: "n = {{blank:n}}; p = {{blank:p}}",
    blanks: [{ id: "n", input: "number", accepted: ["25"], wrong: "14" }, { id: "p", input: "number", accepted: ["0.36"], tolerance: 0.0005, wrong: "0.64" }],
    explanation: t`$\frac{np(1 - p)}{np} = 1 - p = \frac{5.76}{9} = 0.64$, so $p = 0.36$ and $n = \frac{9}{0.36} = 25$. (0.64 is $1 - p$, not $p$.)`,
    hints: ["Divide the variance by the mean."],
  });

  // least n
  let nMin = 1; while (1 - 0.9 ** nMin <= 0.99) nMin++;
  chk(nMin, 44);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "The probability that a particular ZESA transformer trips during a storm is 0.1, independently of other transformers. Find the least number of transformers that must be checked so that the probability that at least one of them has tripped is greater than 0.99.",
    value: nMin, wrong: [43, 10],
    explanation: t`$1 - 0.9^n > 0.99 \Rightarrow 0.9^n < 0.01 \Rightarrow n > \frac{\ln 0.01}{\ln 0.9} = ${S3(Math.log(0.01) / Math.log(0.9))}$. Check: $1 - 0.9^{43} = ${sfStr(1 - 0.9 ** 43, 4)}$ and $1 - 0.9^{44} = ${sfStr(1 - 0.9 ** 44, 4)}$. Least $n = 44$. (43 rounds down instead of up.)`,
    hints: ["P(at least one) = 1 − 0.9ⁿ.", "Dividing by ln 0.9 (negative) reverses the inequality."],
  });

  // find p from P(X=0)
  // P(X = 0) = 0.0081 with n = 4 -> (1-p)^4 = 0.0081 -> 1-p = 0.3 -> p = 0.7
  chk(0.3 ** 4, 0.0081);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$X \sim \mathrm{B}(4, p)$ and $\mathrm{P}(X = 0) = 0.0081$. Find $p$.`,
    value: 0.7, wrong: [0.3, 0.0081 ** 0.25],
    explanation: t`$(1 - p)^4 = 0.0081$, so $1 - p = 0.3$ and $p = 0.7$. (0.3 is $1 - p$.)`,
    hints: [t`$\mathrm{P}(X = 0) = (1 - p)^n$.`],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "In which situation is a binomial distribution a suitable model for X?",
    options: [
      ["X is the number of sixes in 20 throws of a fair die.", "Correct: fixed n = 20, two outcomes, constant p = 1/6, independent throws."],
      ["X is the number of throws of a die needed to get the first six.", "The number of trials is not fixed: this is geometric."],
      ["X is the number of cars passing a toll gate near Norton in an hour.", "There is no fixed number of trials: this suits a Poisson model."],
      ["X is the total score when 20 dice are thrown.", "Each trial has six outcomes, not success and failure, and X counts score, not successes."],
    ],
    answer: "A",
    explanation: "A binomial variable counts successes in a fixed number of independent trials with the same probability of success.",
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A class of 30 learners includes 12 who wear glasses. Five learners are chosen at random from the class, without replacement. Why is B(5, 0.4) only an approximate model for the number who wear glasses?",
    options: [
      ["The choices are not independent: p changes each time.", "Correct: 12/30, then 11/29 or 12/29, and so on."],
      ["Each learner has more than two possible outcomes.", "Each learner either wears glasses or does not: two outcomes."],
      ["The number of learners chosen is not fixed in advance.", "Exactly 5 are chosen, so n is fixed."],
      ["A probability of 0.4 is too large for a binomial model.", "Any p between 0 and 1 is allowed."],
    ],
    answer: "A",
    explanation: "Without replacement from a small group, p changes from trial to trial. With a large population the change is tiny and B(n, p) is a good approximation.",
    hints: ["Which of the four binomial conditions fails?"],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $X \sim \mathrm{B}(n, p)$, $\mathrm{P}(X > 4) = 1 - \mathrm{P}(X \le 4)$.`,
    answer: true,
    explanation: t`$X > 4$ and $X \le 4$ are complementary for an integer variable, so their probabilities add to 1.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\mathrm{B}(n, 0.5)$ is symmetrical, so $\mathrm{P}(X = r) = \mathrm{P}(X = n - r)$.`,
    answer: true,
    explanation: t`With $p = 1 - p = 0.5$, both probabilities equal ${"$"}{}^nC_r\,0.5^n$, because ${"$"}{}^nC_r = {}^nC_{n - r}$.`,
  });

  // Bernoulli (ZS)
  b.fib({
    d: 2, skill: "RECALL", calculator: false, applies: ZS,
    stem: "A single seed is planted; X = 1 if it germinates and X = 0 if it does not. The probability of germination is 0.72. Find the mean and the variance of this Bernoulli variable.",
    template: "mean {{blank:m}}; variance {{blank:v}}",
    blanks: [{ id: "m", input: "number", accepted: ["0.72"], tolerance: 0.0005, wrong: "0.5" }, { id: "v", input: "number", accepted: ["0.2016"], tolerance: 0.00005, wrong: "0.5184" }],
    explanation: t`Mean $p = 0.72$; variance $p(1 - p) = 0.72 \times 0.28 = 0.2016$. (0.5184 is $p^2$.)`,
  });
  chk(0.72 * 0.28, 0.2016);

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X \sim \mathrm{B}(15, p)$. Match each statement in words with the correct probability.`,
    pairs: [
      ["at most 4 successes", t`$\mathrm{P}(X \le 4)$`],
      ["fewer than 4 successes", t`$\mathrm{P}(X \le 3)$`],
      ["at least 4 successes", t`$1 - \mathrm{P}(X \le 3)$`],
      ["more than 4 successes", t`$1 - \mathrm{P}(X \le 4)$`],
    ],
    explanation: t`"At most" includes the value; "fewer than" excludes it. "At least 4" is the complement of $X \le 3$; "more than 4" is the complement of $X \le 4$.`,
  });

  // mode
  const pm = [...Array(13).keys()].map((r) => binom.pmf(12, 0.35, r));
  const mode = pm.indexOf(Math.max(...pm));
  chk(mode, 4);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`$X \sim \mathrm{B}(12, 0.35)$. Find the most likely value of $X$ (the mode).`,
    value: mode, wrong: [5, 4.2],
    explanation: t`Compare neighbouring probabilities: $\mathrm{P}(X = 3) = ${S3(pm[3])}$, $\mathrm{P}(X = 4) = ${S3(pm[4])}$, $\mathrm{P}(X = 5) = ${S3(pm[5])}$. The largest is at $X = 4$. (The mean $np = 4.2$ is not a possible value; the mode is near it.)`,
    hints: ["Work out P(X = 3), P(X = 4) and P(X = 5).", "The mode is close to np."],
  });

  b.manualShort({
    d: 3, marks: 2, skill: "EVALUATION", calculator: false,
    stem: "A researcher models the number of rainy days in a week in Harare during January by B(7, 0.6). Give two reasons why this model may not be suitable.",
    points: ["Independence fails: a rainy day makes rain the next day more likely (weather comes in spells).", "The probability of rain is unlikely to be the same on every day of the week/month (it varies through the season)."],
    modelAnswer: "Rain on one day is not independent of rain on the next, since wet spells last several days; and the probability of rain changes through January, so p is not constant.",
    explanation: "Comment on the binomial conditions in context.",
    hints: ["Which binomial conditions concern the days being alike and unconnected?"],
  });

  // structured practice 1 (5 marks)
  const pa = binom.pmf(6, 0.6, 4), pb = 1 - binom.cdf(6, 0.6, 3);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: "Rudo scores from a penalty with probability 0.6, independently each time. She takes 6 penalties in a training session.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that she scores exactly 4 times, correct to 3 significant figures.", value: pa, wrong: [Number(S3(0.6 ** 4 * 0.4 ** 2))],
        explanation: t`${"$"}{}^6C_4(0.6)^4(0.4)^2 = 15 \times 0.1296 \times 0.16 = ${S3(pa)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that she scores more than 3 times, correct to 3 significant figures.", value: pb, wrong: [Number(S3(1 - binom.cdf(6, 0.6, 4)))],
        explanation: t`$\mathrm{P}(X \ge 4) = \mathrm{P}(4) + \mathrm{P}(5) + \mathrm{P}(6) = ${S3(pa)} + ${S3(binom.pmf(6, 0.6, 5))} + ${S3(binom.pmf(6, 0.6, 6))} = ${S3(pb)}$.` }),
    ],
    explanation: "B(6, 0.6); 'more than 3' means 4, 5 or 6.",
    hints: ["Define X ~ B(6, 0.6)."],
  });

  // structured practice 2 (13 marks)
  const n2 = 10, p2 = 0.08;
  const q0 = binom.pmf(n2, p2, 0), qle1 = binom.cdf(n2, p2, 1);
  const pAccept = qle1; // batch accepted if at most 1 defective in sample of 10
  const twoOfThree = 3 * pAccept ** 2 * (1 - pAccept) + pAccept ** 3;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "A factory in Ruwa makes light bulbs, and 8% of the bulbs are faulty, independently of each other. An inspector takes a random sample of 10 bulbs from each batch and accepts the batch if at most 1 bulb in the sample is faulty.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the probability that a sample contains no faulty bulbs, correct to 3 significant figures.", value: q0, wrong: [0.08],
        explanation: t`$0.92^{10} = ${S3(q0)}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the probability that a batch is accepted, correct to 3 significant figures.", value: pAccept, wrong: [Number(S3(binom.pmf(n2, p2, 1)))],
        explanation: t`$\mathrm{P}(X \le 1) = 0.92^{10} + 10(0.08)(0.92)^9 = ${S3(q0)} + ${S3(binom.pmf(n2, p2, 1))} = ${S3(pAccept)}$.` }),
      P.num({ label: "(c)", marks: 4, stem: "Three batches are inspected. Find the probability that at least two of them are accepted, correct to 3 significant figures.", value: twoOfThree, wrong: [Number(S3(pAccept ** 3))],
        explanation: t`The number accepted is $\mathrm{B}(3, a)$ with $a = ${S3(pAccept)}$. $\mathrm{P}(\ge 2) = 3a^2(1 - a) + a^3 = ${S3(twoOfThree)}$ (using the unrounded $a$).` }),
      P.fib({ label: "(d)", marks: 2, stem: "For the number of faulty bulbs in a sample of 10, find the mean and the variance.", template: "mean {{blank:m}}; variance {{blank:v}}",
        blanks: [{ id: "m", input: "number", accepted: ["0.8"], tolerance: 0.0005, wrong: "8" }, { id: "v", input: "number", accepted: ["0.736"], tolerance: 0.0005, wrong: "0.0736" }],
        explanation: t`$np = 10 \times 0.08 = 0.8$; $np(1 - p) = 0.8 \times 0.92 = 0.736$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State, in context, two assumptions needed for the binomial model in this question.",
        points: ["Bulbs are faulty independently of each other (e.g. no batch-wide fault).", "Every bulb has the same probability 0.08 of being faulty."],
        modelAnswer: "Whether one bulb is faulty does not affect whether another is (no fault affecting a whole batch), and each bulb has the same probability, 0.08, of being faulty." }),
    ],
    explanation: "A binomial inside a binomial: first the number of faulty bulbs per sample, then the number of accepted batches.",
    hints: ["Accepted means X ≤ 1 where X ~ B(10, 0.08).", "For (c), each batch is a trial with success probability P(accepted)."],
  });
  chk(binom.mean(10, 0.08), 0.8); chk(binom.variance(10, 0.08), 0.736);

  b.card("DEFINITION", "Binomial conditions", "Fixed number of trials n; two outcomes; constant probability p; independent trials.");
  b.card("FORMULA", "Binomial probability", t`$\mathrm{P}(X = r) = {}^nC_r\,p^r(1 - p)^{n - r}$`, "In MF19.");
  b.card("FORMULA", "Binomial mean and variance", t`$\mathrm{E}(X) = np$, $\mathrm{Var}(X) = np(1 - p)$`, "In MF19.");
  b.card("FORMULA", "Bernoulli distribution", "One trial: mean p, variance p(1 − p).", "ZIMSEC (Form 6).", { applies: ZS });
  b.card("CONCEPT", "At least", t`$\mathrm{P}(X \ge k) = 1 - \mathrm{P}(X \le k - 1)$`);
  b.card("CONCEPT", "Finding the least n", t`$1 - (1 - p)^n > c \Rightarrow n > \dfrac{\ln(1 - c)}{\ln(1 - p)}$; round up and check.`);
  b.card("CONCEPT", "Finding n and p", t`$1 - p = \dfrac{\mathrm{Var}(X)}{\mathrm{E}(X)}$, then $n = \dfrac{\mathrm{E}(X)}{p}$.`);
  b.card("FACT", "Without replacement", "Sampling without replacement from a small group breaks independence; B(n, p) is then only approximate.");
  b.card("FACT", "Symmetry", "B(n, 0.5) is symmetrical about n/2.");
});
