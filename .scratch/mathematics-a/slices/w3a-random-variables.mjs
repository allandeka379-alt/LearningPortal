// W3a: amaths.discrete.random-variables (every distribution checked: probabilities sum to 1, moments by code)
import { concept, P, t, chk, same, F, nCr, sfStr, table, ZS } from "../lib.mjs";

const ev = (d) => d.reduce((s, [x, p]) => s + x * p, 0);
const ex2 = (d) => d.reduce((s, [x, p]) => s + x * x * p, 0);
const vr = (d) => ex2(d) - ev(d) ** 2;
const ok = (d) => chk(d.reduce((s, [, p]) => s + p, 0), 1, 1e-12, "sum of probabilities");
const S3 = (x) => sfStr(x, 3);
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });

concept("amaths.discrete.random-variables", { file: "discrete/random-variables", keyPrefix: "discrete.random-variables" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which expression gives $\mathrm{Var}(X)$ for a discrete random variable $X$?`,
    options: [
      [t`$\sum x^2\,\mathrm{P}(X = x) - [\mathrm{E}(X)]^2$`, "Correct: E(X²) minus the square of the mean."],
      [t`$\sum x^2\,\mathrm{P}(X = x)$`, t`This is $\mathrm{E}(X^2)$; the square of the mean has not been subtracted.`],
      [t`$\sum x\,[\mathrm{P}(X = x)]^2 - [\mathrm{E}(X)]^2$`, "The values, not the probabilities, are squared."],
      [t`$[\sum x\,\mathrm{P}(X = x)]^2$`, "This is the square of the mean."],
    ],
    answer: "A",
    explanation: t`$\mathrm{Var}(X) = \mathrm{E}(X^2) - [\mathrm{E}(X)]^2$, with $\mathrm{E}(X^2) = \sum x^2\,\mathrm{P}(X = x)$.`,
  });

  const d1 = [[0, 0.1], [1, 0.45], [2, 0.3], [3, 0.15]];
  ok(d1); chk(ev(d1), 1.5);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The number of punctures, $X$, that a kombi on the Mutare road has in a month has the distribution below. Find $\mathrm{E}(X)$.

${table(["x", 0, 1, 2, 3], [["P(X = x)", 0.1, 0.45, 0.3, 0.15]])}`,
    value: ev(d1), wrong: [0.25, 1.2],
    explanation: t`$\mathrm{E}(X) = 0(0.1) + 1(0.45) + 2(0.3) + 3(0.15) = 0.45 + 0.6 + 0.45 = 1.5$. (0.25 is the mean of the four probabilities, which is always $\frac{1}{4}$.)`,
  });

  const dg = [[0, 0.2], [1, 0.5], [2, 0.2], [3, 0.1]]; ok(dg);
  chk(ev(dg), 1.2); chk(ex2(dg), 2.2); chk(vr(dg), 0.76);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The number of goats, $Y$, that a farmer near Beitbridge sells in a week has the distribution below, with $\mathrm{E}(Y) = 1.2$. Find $\mathrm{Var}(Y)$.

${table(["y", 0, 1, 2, 3], [["P(Y = y)", 0.2, 0.5, 0.2, 0.1]])}`,
    value: vr(dg), wrong: [2.2, 1],
    explanation: t`$\mathrm{E}(Y^2) = 0 + 0.5 + 4(0.2) + 9(0.1) = 0.5 + 0.8 + 0.9 = 2.2$. $\mathrm{Var}(Y) = 2.2 - 1.2^2 = 0.76$. (2.2 is $\mathrm{E}(Y^2)$, before subtracting the square of the mean.)`,
  });
  void d1;

  // unknown p
  const d2 = [[1, 0.2], [2, 0.35], [3, 0.25], [5, 0.2]];
  ok(d2);
  b.num({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`The random variable $X$ has the distribution below. Find the value of $p$.

${table(["x", 1, 2, 3, 5], [["P(X = x)", 0.2, "p", 0.25, 0.2]])}`,
    value: 0.35, wrong: [0.65, 0.25],
    explanation: t`The probabilities add to 1: $0.2 + p + 0.25 + 0.2 = 1$, so $p = 0.35$.`,
  });

  // kx^2
  const kInv = [1, 2, 3].reduce((s, x) => s + x * x, 0);
  chk(kInv, 14);
  const d3 = [1, 2, 3].map((x) => [x, (x * x) / 14]); ok(d3);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The random variable $X$ takes the values 1, 2 and 3 with $\mathrm{P}(X = x) = kx^2$. Find $k$ (as a fraction) and $\mathrm{E}(X)$ (to 3 significant figures).`,
    template: "k = {{blank:k}}; E(X) = {{blank:e}}",
    blanks: [{ id: "k", input: "number", accepted: ["1/14", "0.0714"], tolerance: 0.00005, wrong: "1/6" }, { id: "e", input: "number", accepted: [S3(ev(d3))], tolerance: 0.005, wrong: "2" }],
    explanation: t`$k(1 + 4 + 9) = 1$ gives $k = \frac{1}{14}$. $\mathrm{E}(X) = \frac{1 \times 1 + 2 \times 4 + 3 \times 9}{14} = \frac{36}{14} = \frac{18}{7} \approx ${S3(18 / 7)}$. ($\frac{1}{6}$ uses $kx$ instead of $kx^2$.)`,
    hints: ["Use the fact that the probabilities add to 1.", "E(X) = Σ x · kx²."],
  });
  chk(ev(d3), 18 / 7);

  // two unknowns with given mean
  // x: 0 1 2 3; p: a 0.3 b 0.1 ; E = 1.3 -> a + b = 0.6; 0.3 + 2b + 0.3 = 1.3 -> b = 0.35, a = 0.25
  const d4 = [[0, 0.25], [1, 0.3], [2, 0.35], [3, 0.1]]; ok(d4); chk(ev(d4), 1.3);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The random variable $X$ has the distribution below and $\mathrm{E}(X) = 1.3$. Find $a$ and $b$.

${table(["x", 0, 1, 2, 3], [["P(X = x)", "a", 0.3, "b", 0.1]])}`,
    template: "a = {{blank:a}}; b = {{blank:b}}",
    blanks: [N("a", 0.25, "0.35"), N("b", 0.35, "0.25")],
    explanation: t`Total: $a + 0.3 + b + 0.1 = 1$, so $a + b = 0.6$. Mean: $0.3 + 2b + 0.3 = 1.3$, so $b = 0.35$ and $a = 0.25$.`,
    hints: ["Form one equation from ΣP = 1 and one from E(X)."],
  });

  // build from counting: 2 cards from 3 red and 5 black, X = number of red
  const d5 = [0, 1, 2].map((x) => [x, (nCr(3, x) * nCr(5, 2 - x)) / nCr(8, 2)]); ok(d5);
  same(d5.map(([, p]) => F(Math.round(p * 28), 28).s), ["5/14", "15/28", "3/28"]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Two cards are taken at random, without replacement, from 3 red and 5 black cards. X is the number of red cards taken. Give each probability as a fraction in its lowest terms.",
    template: "P(X = 0) = {{blank:a}}; P(X = 1) = {{blank:b}}; P(X = 2) = {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: ["5/14", "10/28"], tolerance: 0.0005, wrong: "25/64" },
      { id: "b", input: "number", accepted: ["15/28"], tolerance: 0.0005, wrong: "15/56" },
      { id: "c", input: "number", accepted: ["3/28"], tolerance: 0.0005, wrong: "9/64" },
    ],
    explanation: t`${"$"}{}^8C_2 = 28$ selections. $\mathrm{P}(X = 0) = \frac{{}^5C_2}{28} = \frac{10}{28} = \frac{5}{14}$; $\mathrm{P}(X = 1) = \frac{3 \times 5}{28} = \frac{15}{28}$; $\mathrm{P}(X = 2) = \frac{{}^3C_2}{28} = \frac{3}{28}$. They add to 1.`,
  });

  chk(ev(d5), 0.75);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "For the two cards taken from 3 red and 5 black (X = number of red cards), what is E(X)?",
    options: [
      [t`$\frac{3}{4}$`, t`Correct: $0 + \frac{15}{28} + 2 \times \frac{3}{28} = \frac{21}{28}$.`],
      [t`$\frac{9}{14}$`, t`This is $\frac{15}{28} + \frac{3}{28}$: the value 2 was not used as a multiplier.`],
      [t`$1$`, "This is the middle value of 0, 1, 2, not the mean of the distribution."],
      [t`$\frac{3}{8}$`, "This is the probability that one card is red, not the expected number of red cards in two."],
    ],
    answer: "A",
    explanation: t`$\mathrm{E}(X) = \sum x\,\mathrm{P}(X = x) = \frac{21}{28} = \frac{3}{4}$, which is also $2 \times \frac{3}{8}$.`,
  });

  // game expectation
  // Fete game: pay 50 cents; die thrown; 6 wins US$2, 4 or 5 wins US$0.50, else nothing. Expected profit per game for player
  const gain = [[2 - 0.5, 1 / 6], [0.5 - 0.5, 2 / 6], [-0.5, 3 / 6]]; ok(gain);
  chk(ev(gain), 0);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`At a school fête in Chitungwiza a player pays US\$0.50 to throw a fair die. A six wins US\$2, a 4 or 5 wins US\$0.50 (the stake back), and any other score wins nothing. What is the player's expected gain per game?`,
    options: [
      [t`US\$0, a fair game`, t`Correct: $1.5 \times \frac{1}{6} + 0 \times \frac{2}{6} - 0.5 \times \frac{3}{6} = 0.25 - 0.25 = 0$.`],
      [t`US\$0.50 gain`, t`This is the expected winnings, $2 \times \frac{1}{6} + 0.5 \times \frac{2}{6} = 0.5$, before taking off the stake.`],
      [t`US\$0.25 gain`, "This forgets the losses on scores 1 to 3."],
      [t`US\$0.25 loss`, "This ignores the winnings on a six."],
    ],
    answer: "A",
    explanation: t`Gain $G$ (in US\$): $1.5$ with probability $\frac{1}{6}$, $0$ with probability $\frac{1}{3}$, $-0.5$ with probability $\frac{1}{2}$. $\mathrm{E}(G) = 0.25 + 0 - 0.25 = 0$: on average the player neither wins nor loses.`,
    hints: ["Work with the gain: winnings minus the 50-cent stake."],
  });

  // discrete uniform (ZS)
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZS,
    stem: t`$X$ has a discrete uniform distribution on $1, 2, \ldots, 12$. Find $\mathrm{E}(X)$ and $\mathrm{Var}(X)$.`,
    template: "E(X) = {{blank:e}}; Var(X) = {{blank:v}}",
    blanks: [N("e", 6.5, "6"), { id: "v", input: "number", accepted: ["143/12", sfStr(143 / 12, 4)], tolerance: 0.005, wrong: "12" }],
    explanation: t`$\mathrm{E}(X) = \frac{12 + 1}{2} = 6.5$; $\mathrm{Var}(X) = \frac{12^2 - 1}{12} = \frac{143}{12} \approx ${S3(143 / 12)}$.`,
  });
  { const u = Array.from({ length: 12 }, (_, i) => [i + 1, 1 / 12]); chk(ev(u), 6.5); chk(vr(u), 143 / 12); }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The expectation $\mathrm{E}(X)$ of a discrete random variable must be one of the values that $X$ can take.`,
    answer: false,
    explanation: t`$\mathrm{E}(X)$ is a long-run average. A fair die has $\mathrm{E}(X) = 3.5$, which is not a possible score.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If every value of $X$ is increased by 3, $\mathrm{E}(X)$ increases by 3 but $\mathrm{Var}(X)$ does not change.`,
    answer: true,
    explanation: t`$\mathrm{E}(X + 3) = \mathrm{E}(X) + 3$; shifting every value moves the distribution without changing its spread, so $\mathrm{Var}(X + 3) = \mathrm{Var}(X)$.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each random variable with the set of values it can take.",
    pairs: [
      ["the number of heads when 3 coins are tossed", "0, 1, 2, 3"],
      ["the score on one fair six-sided die", "1, 2, 3, 4, 5, 6"],
      ["the larger score when two dice are thrown", "1 to 6, with 6 the most likely"],
      ["the number of tosses of a coin until the first head", "1, 2, 3, … without limit"],
    ],
    explanation: "List the possible values before finding probabilities: heads 0 to 3; die 1 to 6 equally likely; the larger of two scores is 6 with probability 11/36; waiting for a head has no upper limit.",
  });

  // larger of two dice: distribution, ZIMSEC/Cambridge both
  const dd = []; for (let a = 1; a <= 6; a++) for (let c = 1; c <= 6; c++) dd.push(Math.max(a, c));
  const dmax = [1, 2, 3, 4, 5, 6].map((x) => [x, dd.filter((v) => v === x).length / 36]); ok(dmax);
  chk(dmax[5][1], 11 / 36);
  chk(ev(dmax), 161 / 36);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Two fair six-sided dice are thrown and X is the larger of the two scores (if they are equal, X is that score). Find E(X), correct to 3 significant figures.",
    value: ev(dmax), wrong: [3.5, 4],
    explanation: t`$\mathrm{P}(X = x) = \frac{2x - 1}{36}$: $\frac{1}{36}, \frac{3}{36}, \frac{5}{36}, \frac{7}{36}, \frac{9}{36}, \frac{11}{36}$. $\mathrm{E}(X) = \frac{1 + 6 + 15 + 28 + 45 + 66}{36} = \frac{161}{36} \approx ${S3(161 / 36)}$.`,
    hints: ["Count the outcomes in a 6 by 6 table where the larger score equals x.", "P(X = x) = (2x − 1)/36."],
  });
  dmax.forEach(([x, p]) => chk(p, (2 * x - 1) / 36));

  // E(X^2) given mean and variance
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A discrete random variable $X$ has $\mathrm{E}(X) = 2.4$ and $\mathrm{Var}(X) = 1.04$. Find $\mathrm{E}(X^2)$.`,
    value: 1.04 + 2.4 ** 2, wrong: [3.44, 4.72],
    explanation: t`$\mathrm{E}(X^2) = \mathrm{Var}(X) + [\mathrm{E}(X)]^2 = 1.04 + 5.76 = 6.8$. (3.44 adds 2.4 instead of $2.4^2$.)`,
    hints: ["Rearrange Var(X) = E(X²) − [E(X)]²."],
  });
  chk(1.04 + 2.4 ** 2, 6.8);

  // sd question
  const d6 = [[-2, 0.05], [0, 0.45], [1, 0.25], [4, 0.25]]; ok(d6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The profit, $X$ thousand US dollars, made by a small tobacco grower in a season has the distribution below. Find the standard deviation of $X$, correct to 3 significant figures.

${table(["x", -2, 0, 1, 4], [["P(X = x)", 0.05, 0.45, 0.25, 0.25]])}`,
    value: Math.sqrt(vr(d6)), wrong: [Number(S3(vr(d6))), Number(S3(Math.sqrt(ex2(d6))))],
    explanation: t`$\mathrm{E}(X) = -0.1 + 0 + 0.25 + 1 = 1.15$. $\mathrm{E}(X^2) = 0.2 + 0 + 0.25 + 4 = 4.45$. $\mathrm{Var}(X) = 4.45 - 1.15^2 = 3.1275$, so the standard deviation is $\sqrt{3.1275} \approx ${S3(Math.sqrt(3.1275))}$ (thousand US dollars). ($${S3(vr(d6))}$ is the variance.)`,
    hints: [t`$(-2)^2 = 4$: squares of negative values are positive.`],
  });
  chk(ev(d6), 1.15); chk(ex2(d6), 4.45); chk(vr(d6), 3.1275);

  b.proof({
    d: 4, marks: 4, skill: "ANALYSIS", calculator: false, applies: ZS,
    stem: t`$X$ has a discrete uniform distribution on $1, 2, \ldots, n$. Using $\sum_{r=1}^{n} r = \frac{1}{2}n(n + 1)$ and $\sum_{r=1}^{n} r^2 = \frac{1}{6}n(n + 1)(2n + 1)$, show that $\mathrm{E}(X) = \frac{n + 1}{2}$ and $\mathrm{Var}(X) = \frac{n^2 - 1}{12}$.`,
    points: [t`M1 $\mathrm{E}(X) = \frac{1}{n}\sum r = \frac{n + 1}{2}$.`, t`M1 $\mathrm{E}(X^2) = \frac{1}{n}\sum r^2 = \frac{(n + 1)(2n + 1)}{6}$.`, t`M1 $\mathrm{Var}(X) = \frac{(n + 1)(2n + 1)}{6} - \frac{(n + 1)^2}{4}$ with a common denominator 12.`, t`A1 simplifies $\frac{(n + 1)(4n + 2 - 3n - 3)}{12} = \frac{(n + 1)(n - 1)}{12}$ to the given result.`],
    modelAnswer: t`$$
\mathrm{E}(X) = \sum_{r=1}^{n} r \cdot \frac{1}{n} = \frac{1}{n} \cdot \frac{n(n + 1)}{2} = \frac{n + 1}{2}
$$
$$
\mathrm{E}(X^2) = \frac{1}{n} \cdot \frac{n(n + 1)(2n + 1)}{6} = \frac{(n + 1)(2n + 1)}{6}
$$
$$
\mathrm{Var}(X) = \frac{(n + 1)(2n + 1)}{6} - \frac{(n + 1)^2}{4} = \frac{(n + 1)\left[2(2n + 1) - 3(n + 1)\right]}{12}
$$
$$
= \frac{(n + 1)(n - 1)}{12} = \frac{n^2 - 1}{12}
$$`,
    explanation: "Each value has probability 1/n, so the sums of r and r² give the moments.",
    hints: ["Each probability is 1/n.", "Take out the factor (n + 1) before simplifying."],
  });

  // structured 1 (practice 5 marks)
  // Spinner: 0 with prob 0.4, 1 with 0.3, 2 with 0.2, 5 with 0.1 ... use show that
  const sp = [[0, 0.4], [1, 0.3], [2, 0.2], [5, 0.1]]; ok(sp); chk(ev(sp), 1.2); chk(ex2(sp), 3.6);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A biased spinner gives a score $X$ with the distribution below.

${table(["x", 0, 1, 2, 5], [["P(X = x)", 0.4, 0.3, 0.2, 0.1]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`Find $\mathrm{E}(X)$.`, value: ev(sp), wrong: [2],
        explanation: t`$0 + 0.3 + 0.4 + 0.5 = 1.2$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Find $\mathrm{Var}(X)$.`, value: vr(sp), wrong: [3.6],
        explanation: t`$\mathrm{E}(X^2) = 0.3 + 0.8 + 2.5 = 3.6$; $\mathrm{Var}(X) = 3.6 - 1.44 = 2.16$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`The spinner is spun twice and the scores are added. Find the probability that the total is 5 or more.`, value: 1 - (0.4 * 0.4 + 2 * 0.4 * 0.3 + 0.3 * 0.3 + 2 * 0.4 * 0.2 + 2 * 0.3 * 0.2 + 0.2 * 0.2), wrong: [0.1],
        explanation: t`A total of 5 or more needs a 5 on at least one spin (the other scores give at most $2 + 2 = 4$): $1 - 0.9^2 = 0.19$.` }),
    ],
    explanation: "Moments from the table; for (c), notice which totals can reach 5.",
    hints: ["Without a 5, the largest total is 4."],
  });
  chk(1 - 0.9 ** 2, 0.19); chk(vr(sp), 2.16);

  // structured 2 (practice 13 marks): build a distribution by counting, then moments
  // Bag: 4 white, 2 red counters. Counters drawn one at a time without replacement until a red is drawn. X = number drawn.
  const pX = [1, 2, 3, 4, 5].map((x) => {
    let p = 1, w = 4, n = 6;
    for (let i = 1; i < x; i++) { p *= w / n; w--; n--; }
    return [x, p * (2 / n)];
  });
  ok(pX);
  same(pX.map(([, p]) => F(Math.round(p * 15), 15).s), ["1/3", "4/15", "1/5", "2/15", "1/15"]);
  chk(ev(pX), 7 / 3); chk(vr(pX), 14 / 9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: "A bag contains 4 white counters and 2 red counters. Nyasha takes counters from the bag one at a time, at random and without replacement, until she takes a red counter. X is the number of counters she takes.",
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\mathrm{P}(X = 3) = \frac{1}{5}$.`,
        points: [t`M1 multiplies $\frac{4}{6} \times \frac{3}{5} \times \frac{2}{4}$ (white, white, red).`, "A1 simplifies to 1/5."],
        modelAnswer: t`$$
\mathrm{P}(X = 3) = \mathrm{P}(WWR) = \frac{4}{6} \times \frac{3}{5} \times \frac{2}{4} = \frac{24}{120} = \frac{1}{5}
$$` }),
      P.fib({ label: "(b)", marks: 4, stem: "Complete the probability distribution of X, giving each probability as a fraction.", template: "P(X = 1) = {{blank:a}}; P(X = 2) = {{blank:b}}; P(X = 4) = {{blank:c}}; P(X = 5) = {{blank:d}}",
        blanks: [
          { id: "a", input: "number", accepted: ["1/3"], tolerance: 0.0005, wrong: "1/6" },
          { id: "b", input: "number", accepted: ["4/15"], tolerance: 0.0005, wrong: "2/9" },
          { id: "c", input: "number", accepted: ["2/15"], tolerance: 0.0005, wrong: "1/10" },
          { id: "d", input: "number", accepted: ["1/15"], tolerance: 0.0005, wrong: "0" },
        ],
        explanation: t`$\mathrm{P}(X = 1) = \frac{2}{6} = \frac{1}{3}$; $\mathrm{P}(X = 2) = \frac{4}{6} \times \frac{2}{5} = \frac{4}{15}$; $\mathrm{P}(X = 4) = \frac{4}{6} \cdot \frac{3}{5} \cdot \frac{2}{4} \cdot \frac{2}{3} = \frac{2}{15}$; $\mathrm{P}(X = 5) = \frac{4}{6} \cdot \frac{3}{5} \cdot \frac{2}{4} \cdot \frac{1}{3} \cdot 1 = \frac{1}{15}$. Check: $\frac{5 + 4 + 3 + 2 + 1}{15} = 1$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find $\mathrm{E}(X)$. Give your answer as a fraction or a decimal correct to 3 significant figures.`, value: ev(pX), wrong: [3],
        explanation: t`$\mathrm{E}(X) = \frac{1(5) + 2(4) + 3(3) + 4(2) + 5(1)}{15} = \frac{35}{15} = \frac{7}{3}$.` }),
      P.num({ label: "(d)", marks: 3, stem: t`Find $\mathrm{Var}(X)$. Give your answer as a fraction or a decimal correct to 3 significant figures.`, value: vr(pX), wrong: [Number(S3(ex2(pX)))],
        explanation: t`$\mathrm{E}(X^2) = \frac{1(5) + 4(4) + 9(3) + 16(2) + 25(1)}{15} = \frac{105}{15} = 7$. $\mathrm{Var}(X) = 7 - \frac{49}{9} = \frac{14}{9} \approx ${S3(14 / 9)}$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`Find $\mathrm{P}(X > \mathrm{E}(X))$. Give your answer as a fraction or a decimal.`, value: 6 / 15, wrong: [9 / 15],
        explanation: t`$\mathrm{E}(X) = 2\frac{1}{3}$, so $X > \mathrm{E}(X)$ means $X \ge 3$: $\frac{3 + 2 + 1}{15} = \frac{2}{5}$.` }),
    ],
    explanation: "Build each probability from a sequence of draws without replacement; the probabilities over 15 are 5, 4, 3, 2, 1.",
    hints: ["X = k means k − 1 white counters, then a red.", "Write the probabilities over 15."],
  });
  chk(ex2(pX), 7);

  b.card("DEFINITION", "Discrete random variable", "A variable whose values are numbers decided by chance and can be listed (0, 1, 2, …).");
  b.card("FACT", "Probability distribution", t`Every value with its probability; $\sum \mathrm{P}(X = x) = 1$.`);
  b.card("FORMULA", "Expectation", t`$\mathrm{E}(X) = \sum x\,\mathrm{P}(X = x)$`, "In MF19.");
  b.card("FORMULA", "Variance", t`$\mathrm{Var}(X) = \sum x^2\,\mathrm{P}(X = x) - [\mathrm{E}(X)]^2$`, "In MF19.");
  b.card("FORMULA", "Discrete uniform on 1 to n", t`$\mathrm{E}(X) = \dfrac{n + 1}{2}$, $\mathrm{Var}(X) = \dfrac{n^2 - 1}{12}$`, "ZIMSEC.", { applies: ZS });
  b.card("CONCEPT", "Unknown probabilities", "Use ΣP = 1 and any given mean to form simultaneous equations.");
  b.card("CONCEPT", "Meaning of E(X)", "The long-run average value of X; it need not be a possible value.");
  b.card("FACT", "Adding a constant", t`$\mathrm{E}(X + c) = \mathrm{E}(X) + c$; $\mathrm{Var}(X + c) = \mathrm{Var}(X)$.`);
  b.card("CONCEPT", "Standard deviation", t`$\sqrt{\mathrm{Var}(X)}$, in the units of $X$.`);
});
