// W4b: amath.distributions.discrete-random-variables (ZIMSEC only)
import { concept, P, t, chk, same, F, Fr, table, money } from "../lib.mjs";

const E = (xs, ps) => xs.reduce((s, x, i) => s + x * ps[i], 0);
const E2 = (xs, ps) => xs.reduce((s, x, i) => s + x * x * ps[i], 0);
const tbl = (xs, ps) => table(["$x$", ...xs.map(String)], [["$P(X = x)$", ...ps.map(String)]]);

concept("amath.distributions.discrete-random-variables", { file: "distributions/discrete-random-variables", keyPrefix: "distributions.discrete-random-variables" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which property must every probability distribution of a discrete random variable have?",
    options: [
      ["The probabilities add up to exactly 1", "Correct: the values listed cover every possible outcome."],
      ["The probabilities are all equal", "Only a uniform distribution has equal probabilities."],
      ["The values of x add up to 1", "It is the probabilities, not the values, that add up to 1."],
      ["The mean E(X) is one of the values of x", "E(X) is a long-run average and need not be a possible value."],
    ],
    answer: "A",
    explanation: t`For any probability distribution, $0 \leq P(X = x) \leq 1$ for every $x$ and $\sum P(X = x) = 1$.`,
  });

  {
    const k = 1 - 0.12 - 0.33 - 0.17;
    chk(k, 0.38);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: `The discrete random variable $X$ has this probability distribution. Find $k$.\n\n${tbl([1, 2, 3, 5], [0.12, 0.33, "$k$", 0.17])}`,
      value: k, wrong: [0.62, 0.25],
      explanation: t`$0.12 + 0.33 + k + 0.17 = 1$, so $k = 1 - 0.62 = 0.38$. The answer 0.62 is the sum of the known probabilities, not what is left.`,
    });
  }

  {
    const v = E([0, 1, 2, 3], [0.25, 0.35, 0.3, 0.1]);
    chk(v, 1.25);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: `Find $E(X)$ for this distribution.\n\n${tbl([0, 1, 2, 3], [0.25, 0.35, 0.3, 0.1])}`,
      value: v, wrong: [1.5, 0.25],
      explanation: t`$E(X) = 0(0.25) + 1(0.35) + 2(0.3) + 3(0.1) = 0.35 + 0.6 + 0.3 = 1.25$. The answer 1.5 is the mean of the values 0 to 3, ignoring the probabilities.`,
    });
  }

  {
    const xs = [2, 4, 6], ps = [0.55, 0.25, 0.2];
    const m = E(xs, ps), m2 = E2(xs, ps), v = m2 - m * m;
    chk(m, 3.3); chk(m2, 13.4); chk(v, 2.51);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `Find $\\operatorname{Var}(X)$ for this distribution.\n\n${tbl(xs, ps)}`,
      value: v, wrong: [13.4 - 3.3, 13.4],
      explanation: t`$E(X) = 2(0.55) + 4(0.25) + 6(0.2) = 1.1 + 1 + 1.2 = 3.3$. $E(X^2) = 4(0.55) + 16(0.25) + 36(0.2) = 2.2 + 4 + 7.2 = 13.4$. $\operatorname{Var}(X) = 13.4 - 3.3^2 = 13.4 - 10.89 = 2.51$. The answer 10.1 forgets to square $E(X)$.`,
      hints: [t`$\operatorname{Var}(X) = E(X^2) - [E(X)]^2$.`],
    });
  }

  {
    const k = 1 / (1 + 2 + 5);
    chk(k, 0.125);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The random variable $X$ takes the values 0, 1 and 2 with $P(X = x) = k(x^2 + 1)$. Find $k$, as a fraction or a decimal.`,
      value: k, wrong: [1 / 3, 1 / 5],
      explanation: t`$P(0) = k$, $P(1) = 2k$, $P(2) = 5k$. Sum: $8k = 1$, so $k = \frac{1}{8}$. The answer $\frac{1}{5}$ leaves out the $+1$ (it solves $k(0 + 1 + 4) = 1$); $\frac{1}{3}$ assumes the three values are equally likely.`,
      hints: ["Substitute each value of x and add the probabilities."],
    });
  }

  {
    const ps = [0.05, 0.22, 0.36, 0.24, 0.13];
    chk(ps.reduce((a, c) => a + c), 1);
    const v = ps[1] + ps[2] + ps[3];
    chk(v, 0.82);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `Use the distribution below to find $P(2 \\leq X < 5)$.\n\n${tbl([1, 2, 3, 4, 5], ps)}`,
      value: v, wrong: [0.95, 0.6],
      explanation: t`$2 \leq X < 5$ means $X = 2, 3$ or $4$: $0.22 + 0.36 + 0.24 = 0.82$. Including 5 gives 0.95; leaving out 2 gives 0.6.`,
      hints: ["List the whole-number values included before adding."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X$ is the number of customers who arrive at a bank counter in a minute, and $E(X) = 2.5$. Which statement is correct?`,
    options: [
      ["Over many minutes, arrivals average about 2.5 per minute.", "Correct: E(X) is a long-run average."],
      ["In most minutes exactly 2.5 customers arrive.", "X takes whole-number values; 2.5 customers can never arrive."],
      ["The most likely number of arrivals in a minute is 2.5.", "The most likely value (the mode) must be a possible value."],
      ["Half of the minutes have more than 2.5 arrivals.", "That describes a median, which E(X) need not equal."],
    ],
    answer: "A",
    explanation: "The expectation is a weighted average of the values. It need not be a value X can take; it is the average over a very large number of trials.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A student finds $\operatorname{Var}(X) = -0.6$. This can be correct if $E(X)$ is negative.`,
    answer: false,
    explanation: t`False. A variance measures spread and is never negative, whatever the sign of $E(X)$. A negative answer means an error, often forgetting to square the values of $x$ in $E(X^2)$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any discrete random variable, $E(X^2) = [E(X)]^2$.`,
    answer: false,
    explanation: t`False. Their difference is $\operatorname{Var}(X)$, which is positive unless $X$ always takes the same value. In general $E(X^2) > [E(X)]^2$.`,
  });

  {
    const p = 0.35, q = 0.25;
    chk(0.15 + p + q + 0.25, 1); chk(E([1, 2, 3, 4], [0.15, p, q, 0.25]), 2.6);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: `The random variable $X$ has the distribution below, and $E(X) = 2.6$. Find $p$ and $q$.\n\n${tbl([1, 2, 3, 4], [0.15, "$p$", "$q$", 0.25])}`,
      template: "p = {{blank:p}}, q = {{blank:q}}",
      blanks: [
        { id: "p", input: "number", accepted: [p], tolerance: 0.0005, wrong: "0.3" },
        { id: "q", input: "number", accepted: [q], tolerance: 0.0005, wrong: "0.3" },
      ],
      explanation: t`Sum: $0.15 + p + q + 0.25 = 1$ gives $p + q = 0.6$. Mean: $0.15 + 2p + 3q + 1 = 2.6$ gives $2p + 3q = 1.45$. Subtracting $2(p + q) = 1.2$: $q = 0.25$, then $p = 0.35$.`,
      hints: ["You need two equations: one from ΣP = 1 and one from E(X).", "Solve them simultaneously."],
    });
  }

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$X$ takes whole-number values. Match each phrase with the correct inequality.`,
    pairs: [
      ["at most 3", t`$X \leq 3$`],
      ["fewer than 3", t`$X \leq 2$`],
      ["at least 3", t`$X \geq 3$`],
      ["more than 3", t`$X \geq 4$`],
    ],
    explanation: "'At most' and 'at least' include 3; 'fewer than' and 'more than' exclude it, so for whole numbers they stop at 2 or start at 4.",
  });

  {
    const xs = [1, 2, 3, 4, 5, 6], ps = xs.map(() => 1 / 6);
    const m = E(xs, ps), v = E2(xs, ps) - m * m;
    chk(m, 3.5); chk(v, 35 / 12);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`$X$ is the score on one roll of a fair six-sided die. What is $E(X)$?`,
      options: [
        ["3.5", t`Correct: $\frac{1 + 2 + 3 + 4 + 5 + 6}{6} = \frac{21}{6}$.`],
        ["3", "3 is a possible score but not the mean of the six equally likely scores."],
        ["21", "21 is the sum of the scores; each must be weighted by 1/6."],
        [t`$\frac{1}{6}$`, "This is the probability of each score, not the mean."],
      ],
      answer: "A",
      explanation: t`$E(X) = \sum x \cdot \frac{1}{6} = \frac{21}{6} = 3.5$.`,
    });

    b.num({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`$X$ is the score on one roll of a fair six-sided die. Find $\operatorname{Var}(X)$, as a fraction or correct to 3 significant figures.`,
      value: v, wrong: [91 / 6 - 3.5, 91 / 6],
      explanation: t`$E(X) = 3.5$ and $E(X^2) = \frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \frac{91}{6}$. $\operatorname{Var}(X) = \frac{91}{6} - \frac{49}{4} = \frac{182 - 147}{12} = \frac{35}{12} \approx 2.92$.`,
      hints: [t`$E(X^2) = \frac{91}{6}$.`],
    });
  }

  {
    const gain = 5 * 0.1 + 1 * 0.3 - 1;
    chk(gain, -0.2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `At a school fun day, a game costs ${money(1)} to play. A player wins ${money(5)} with probability 0.1, wins ${money(1)} with probability 0.3, and otherwise wins nothing. Find the player's expected gain per game, in US dollars (a loss is negative).`,
      value: gain, wrong: [0.8, 0.2],
      explanation: t`Expected winnings $= 5(0.1) + 1(0.3) + 0(0.6) = 0.8$ dollars. Subtract the cost: $0.8 - 1 = -0.2$, an expected loss of 20 cents per game. The answer 0.8 forgets the cost of playing.`,
      hints: ["Find the expected winnings, then subtract the cost of a game."],
    });
  }

  {
    const ps = [1, 2, 3, 4].map((x) => (x + 1) / 14);
    chk(ps.reduce((a, c) => a + c), 1);
    chk(ps[2] + ps[3], 9 / 14);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The random variable $X$ has $P(X = x) = \dfrac{x + 1}{14}$ for $x = 1, 2, 3, 4$. Find $P(X > 2)$.`,
      options: [
        [t`$\frac{9}{14}$`, t`Correct: $X = 3$ or $4$, so $\frac{4}{14} + \frac{5}{14}$.`],
        [t`$\frac{12}{14}$`, t`This is $P(X \geq 2)$: "more than 2" does not include 2.`],
        [t`$\frac{5}{14}$`, t`This is $P(X = 4)$ only; $X = 3$ is also more than 2.`],
        [t`$\frac{4}{14}$`, t`This is $P(X = 3)$ only; $X = 4$ is also more than 2.`],
      ],
      answer: "A",
      explanation: t`$P(X = 3) = \frac{4}{14}$ and $P(X = 4) = \frac{5}{14}$, so $P(X > 2) = \frac{9}{14}$. (Check: $\frac{2 + 3 + 4 + 5}{14} = 1$.)`,
      hints: ["Which whole-number values are more than 2?"],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: `Explain why the table below is not a probability distribution.\n\n${tbl([0, 1, 2], [0.5, 0.6, -0.1])}`,
    points: [
      t`$P(X = 2) = -0.1$ is negative, but every probability must be between 0 and 1.`,
      t`So although the probabilities add up to 1, the table is not valid (equally, $0.5 + 0.6 > 1$ for the first two values).`,
    ],
    modelAnswer: "A probability cannot be negative, but P(X = 2) = −0.1. Adding to 1 is not enough: every probability must also lie between 0 and 1.",
    explanation: "Check both conditions: each P between 0 and 1, and ΣP = 1.",
    hints: ["Check each probability, not only the total."],
  });

  {
    const ps = [1, 2, 3, 4, 5, 6].map((x) => (2 * x - 1) / 36);
    // check against direct enumeration of the larger score
    const cnt = [0, 0, 0, 0, 0, 0];
    for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) cnt[Math.max(i, j) - 1]++;
    same(cnt, [1, 3, 5, 7, 9, 11]);
    const m = E([1, 2, 3, 4, 5, 6], ps);
    chk(m, 161 / 36);
    const atLeast5 = (9 + 11) / 36;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: false, examStyle: true,
      stem: t`Two fair dice are rolled. The random variable $X$ is the larger of the two scores (if the scores are equal, $X$ is that score).`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $P(X = 3) = \dfrac{5}{36}$.`,
          points: [t`M1 lists the outcomes with larger score 3: (1, 3), (2, 3), (3, 3), (3, 2), (3, 1).`, t`A1 5 of the 36 equally likely outcomes, so $\frac{5}{36}$.`],
          modelAnswer: t`The outcomes whose larger score is 3 are (1, 3), (2, 3), (3, 3), (3, 2) and (3, 1): 5 of the 36 equally likely outcomes, so $P(X = 3) = \frac{5}{36}$.`,
          explanation: t`In general $P(X = x) = \frac{2x - 1}{36}$.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Given that $P(X = x) = \dfrac{2x - 1}{36}$ for $x = 1, 2, \ldots, 6$, find $E(X)$, correct to 3 significant figures.`, value: m, wrong: [3.5, 161],
          explanation: t`$E(X) = \frac{1(1) + 2(3) + 3(5) + 4(7) + 5(9) + 6(11)}{36} = \frac{1 + 6 + 15 + 28 + 45 + 66}{36} = \frac{161}{36} \approx 4.47$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $P(X \geq 5)$, as a fraction or a decimal.`, value: atLeast5, wrong: [11 / 36, 2 / 6],
          explanation: t`$P(5) + P(6) = \frac{9 + 11}{36} = \frac{20}{36} = \frac{5}{9}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find $P(X = 6 \mid X \geq 5)$, as a fraction or a decimal.`, value: (11 / 36) / atLeast5, wrong: [11 / 36],
          explanation: t`$\frac{11/36}{20/36} = \frac{11}{20} = 0.55$.` }),
      ],
      explanation: "Count outcomes for the distribution, use Σxp for the mean and divide by the given event's probability for the conditional part.",
      hints: ["Draw the 6 × 6 table of the larger score.", "In (d) the given event is X ≥ 5."],
    });
  }

  {
    const p0 = Fr.mul(F(8, 10), F(7, 9)), p1 = Fr.mul(2, Fr.mul(F(2, 10), F(8, 9))), p2 = Fr.mul(F(2, 10), F(1, 9));
    same([p0.s, p1.s, p2.s], ["28/45", "16/45", "1/45"]);
    const m = p1.v + 2 * p2.v, v = p1.v + 4 * p2.v - m * m;
    chk(m, 0.4); chk(v, 4 / 9 - 0.16);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: false, examStyle: true,
      stem: t`A box of 10 light bulbs contains 2 faulty bulbs. Farai takes 2 bulbs at random without replacement. $X$ is the number of faulty bulbs he takes.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: "Find the probability distribution of X. Give each probability as a fraction.",
          template: "P(X = 0) = {{blank:a}}, P(X = 1) = {{blank:b}}, P(X = 2) = {{blank:c}}",
          blanks: [
            { id: "a", input: "number", accepted: ["28/45"], tolerance: 0.0005, wrong: "16/25" },
            { id: "b", input: "number", accepted: ["16/45"], tolerance: 0.0005, wrong: "8/45" },
            { id: "c", input: "number", accepted: ["1/45"], tolerance: 0.0005, wrong: "1/25" },
          ],
          explanation: t`$P(0) = \frac{8}{10} \times \frac{7}{9} = \frac{56}{90}$; $P(1) = 2 \times \frac{2}{10} \times \frac{8}{9} = \frac{32}{90}$; $P(2) = \frac{2}{10} \times \frac{1}{9} = \frac{2}{90}$. They add to 1.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find $E(X)$.`, value: m, wrong: [1, 0.2],
          explanation: t`$E(X) = \frac{16}{45} + 2 \times \frac{1}{45} = \frac{18}{45} = 0.4$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $\operatorname{Var}(X)$, as a fraction or correct to 3 significant figures.`, value: v, wrong: [4 / 9 - 0.4, 4 / 9],
          explanation: t`$E(X^2) = \frac{16}{45} + 4 \times \frac{1}{45} = \frac{20}{45} = \frac{4}{9}$. $\operatorname{Var}(X) = \frac{4}{9} - 0.4^2 = \frac{4}{9} - \frac{4}{25} = \frac{64}{225} \approx 0.284$.` }),
      ],
      explanation: "Use a tree diagram without replacement for the distribution, then Σxp and Σx²p − μ².",
      hints: ["After a faulty bulb is taken, 1 faulty and 8 good bulbs remain."],
    });
  }

  // flashcards
  b.card("DEFINITION", "Discrete random variable", "A quantity decided by chance that takes separate (countable) values, e.g. the number of heads in three tosses.");
  b.card("DEFINITION", "Probability distribution", t`A list of every value $x$ of $X$ with $P(X = x)$; each probability is between 0 and 1 and $\sum P(X = x) = 1$.`);
  b.card("FORMULA", "Expectation of a discrete random variable", t`$E(X) = \sum x\,P(X = x)$`);
  b.card("FORMULA", "Variance of a discrete random variable", t`$\operatorname{Var}(X) = \sum x^2P(X = x) - [E(X)]^2$`, "Mean of the squares minus the square of the mean.");
  b.card("CONCEPT", "Finding an unknown probability", t`Use $\sum P = 1$; with two unknowns, also use the given value of $E(X)$.`);
  b.card("CONCEPT", "Meaning of E(X)", "The long-run average value of X over many trials; it need not be a value X can take.");
  b.card("FACT", "Fair die", t`$E(X) = 3.5$ and $\operatorname{Var}(X) = \frac{35}{12}$ for the score on a fair six-sided die.`);
  b.card("CONCEPT", "Cumulative probability words", t`At most 3: $X \leq 3$. Fewer than 3: $X \leq 2$. At least 3: $X \geq 3$. More than 3: $X \geq 4$.`);
  b.card("FORMULA", "Complement for 'at least'", t`$P(X \geq a) = 1 - P(X \leq a - 1)$ for whole-number values.`);
});
