// W2b: amath.series.sigma-notation (ZIMSEC only: tagged automatically)
import { concept, P, t, chk, same, quad, gp } from "../lib.mjs";

const S = (f, a, c) => {
  let s = 0;
  for (let r = a; r <= c; r++) s += f(r);
  return s;
};

concept("amath.series.sigma-notation", { file: "series/sigma-notation", keyPrefix: "series.sigma-notation" }, (b) => {
  chk(12 - 3 + 1, 10);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`How many terms are there in $\displaystyle\sum_{r=3}^{12} u_r$?`,
    options: [
      ["10", t`Correct: $12 - 3 + 1 = 10$ (both limits are included).`],
      ["9", t`$12 - 3 = 9$ leaves out one of the end terms.`],
      ["12", "This counts from r = 1, but the sum starts at r = 3."],
      ["15", "The limits are added instead of used to count the terms."],
    ],
    answer: "A",
    explanation: t`The terms are $u_3, u_4, \ldots, u_{12}$: $12 - 3 + 1 = 10$ terms.`,
  });

  same([1, 2, 3, 4].map((r) => 2 * r - 1), [1, 3, 5, 7]);
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which series is $\displaystyle\sum_{r=1}^{4} (2r - 1)$?`,
    options: [
      [t`$1 + 3 + 5 + 7$`, t`Correct: $r = 1, 2, 3, 4$ give $1, 3, 5, 7$.`],
      [t`$2 + 4 + 6 + 8$`, t`This is $\sum 2r$; the $-1$ has been left out.`],
      [t`$-1 + 1 + 3 + 5$`, t`This starts at $r = 0$, but the lower limit is 1.`],
      [t`$1 + 3 + 5 + 7 + 9$`, "This has five terms; r runs from 1 to 4 only."],
    ],
    answer: "A",
    explanation: t`Substitute $r = 1, 2, 3, 4$ into $2r - 1$ and add: $1 + 3 + 5 + 7 = 16$.`,
  });

  chk(S((r) => r + 2, 1, 6), 33);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{6} (r + 2)$.`,
    value: 33, wrong: [23, 21],
    explanation: t`$3 + 4 + 5 + 6 + 7 + 8 = 33$. (Or $\Sigma r + \Sigma 2 = 21 + 12 = 33$; adding the 2 only once gives 23.)`,
  });

  chk(S((r) => 3 ** r, 1, 4), 120);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{4} 3^r$.`,
    value: 120, wrong: [40, 121],
    explanation: t`$3 + 9 + 27 + 81 = 120$. (Starting at $r = 0$ would add 1 and give 121.)`,
  });

  chk(S(() => 4, 1, 25), 100);
  b.num({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{25} 4$.`,
    value: 100, wrong: [4, 29],
    explanation: t`The constant 4 is added once for each of the 25 values of $r$: $\Sigma c = nc = 25 \times 4 = 100$.`,
  });

  chk(S((r) => r * r, 1, 3), 14); chk(S((r) => r, 1, 3) ** 2, 36);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every positive integer $n$, $\displaystyle\sum_{r=1}^{n} r^2 = \left(\sum_{r=1}^{n} r\right)^2$.`,
    answer: false,
    explanation: t`False. With $n = 3$: $\Sigma r^2 = 1 + 4 + 9 = 14$, but $(\Sigma r)^2 = 6^2 = 36$. Sigma does not pass through squares or products.`,
  });

  for (const n of [3, 8]) chk(S((r) => 5 * (r * r - 1), 1, n), 5 * S((r) => r * r - 1, 1, n));
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\sum_{r=1}^{n} 5u_r = 5\sum_{r=1}^{n} u_r$ for any sequence $u_r$.`,
    answer: true,
    explanation: t`True. $5u_1 + 5u_2 + \cdots + 5u_n = 5(u_1 + u_2 + \cdots + u_n)$: a constant factor can be taken outside the sum.`,
  });

  chk(S((r) => 2 * r, 1, 20), S((r) => 2 * r, 1, 20)); chk(2 * 20, 40); chk(10 ** 2, 100); chk(3 * 2 ** 7, 384);
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each series with its sigma form.",
    pairs: [
      [t`$2 + 4 + 6 + \cdots + 40$`, t`$\displaystyle\sum_{r=1}^{20} 2r$`],
      [t`$1 + 4 + 9 + \cdots + 100$`, t`$\displaystyle\sum_{r=1}^{10} r^2$`],
      [t`$3 + 6 + 12 + \cdots + 384$`, t`$\displaystyle\sum_{r=1}^{8} 3 \times 2^{r-1}$`],
      [t`$1 - 1 + 1 - 1 + \cdots$ (10 terms)`, t`$\displaystyle\sum_{r=1}^{10} (-1)^{r+1}$`],
    ],
    explanation: t`$40 = 2 \times 20$; $100 = 10^2$; $384 = 3 \times 2^7$, the 8th term of $3 \times 2^{r-1}$; $(-1)^{r+1}$ is $+1$ for odd $r$ and $-1$ for even $r$.`,
    hints: ["Substitute r = 1 and the upper limit into each sigma form and compare with the first and last terms."],
  });

  chk(4 * 20 + 1, 81); chk(4 * 1 + 1, 5);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The series $5 + 9 + 13 + \cdots + 81$ can be written as $\displaystyle\sum_{r=1}^{N} (ar + b)$. Find $a$, $b$ and $N$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, N = {{blank:n}}",
    blanks: [
      { id: "a", input: "number", accepted: [4], wrong: "5" },
      { id: "b", input: "number", accepted: [1], wrong: "5" },
      { id: "n", input: "number", accepted: [20], wrong: "19" },
    ],
    explanation: t`The terms go up by 4, so $a = 4$; $4(1) + b = 5$ gives $b = 1$. The last term: $4N + 1 = 81$ gives $N = 20$.`,
    hints: ["The common difference is the coefficient of r.", "Solve 4N + 1 = 81 for the upper limit."],
  });

  chk(S((r) => 4 * r + 1, 1, 20), 860);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use the properties of sigma notation to evaluate $\displaystyle\sum_{r=1}^{20} (4r + 1)$.`,
    value: 860, wrong: [841, 1680],
    explanation: t`$4\displaystyle\sum_{r=1}^{20} r + \sum_{r=1}^{20} 1 = 4 \times \frac{20 \times 21}{2} + 20 = 4(210) + 20 = 860$. (Adding the 1 only once gives 841.)`,
    hints: [t`$\sum_{r=1}^{n} r = \frac{n(n+1)}{2}$ and $\sum_{r=1}^{n} 1 = n$.`],
  });

  chk(S((r) => r, 6, 15), 105);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=6}^{15} r$.`,
    value: 105, wrong: [99, 120],
    explanation: t`$\displaystyle\sum_{r=1}^{15} r - \sum_{r=1}^{5} r = 120 - 15 = 105$. (Subtracting up to $r = 6$ wrongly removes the 6 and gives 99.)`,
    hints: [t`Subtract $\sum_{r=1}^{5} r$ from $\sum_{r=1}^{15} r$.`],
  });

  same(quad.roots(1, 4, -192), [-16, 12]);
  chk(S((r) => 2 * r + 3, 1, 12), 192);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $\displaystyle\sum_{r=1}^{n} (2r + 3) = 192$, find the value of $n$.`,
    value: 12, prefix: "n =", wrong: [-16, 16],
    explanation: t`$\displaystyle\sum_{r=1}^{n} (2r + 3) = 2 \cdot \frac{n(n + 1)}{2} + 3n = n^2 + 4n$. Then $n^2 + 4n - 192 = 0$, so $(n + 16)(n - 12) = 0$ and $n = 12$ (as $n > 0$).`,
    hints: ["Find a formula for the sum in terms of n first.", "You get a quadratic in n."],
  });

  for (const n of [1, 4, 9]) chk(S((r) => 6 * r - 1, 1, n), 3 * n * n + 2 * n);
  b.expr({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find $\displaystyle\sum_{r=1}^{n} (6r - 1)$ in terms of $n$, in the form $an^2 + bn$. Type it, e.g. 2n^2+5n.`,
    accepted: ["3n^2+2n", "2n+3n^2", "n(3n+2)", "(3n+2)n", "3n²+2n"],
    wrong: ["3n^2+3n-1", "3n^2+3n"],
    explanation: t`$6\displaystyle\sum r - \sum 1 = 6 \cdot \frac{n(n + 1)}{2} - n = 3n^2 + 3n - n = 3n^2 + 2n$. Check $n = 1$: $5 = 3 + 2$.`,
    hints: [t`$\sum_{r=1}^{n} 1 = n$, not 1.`],
  });

  chk(S((r) => (-1) ** r * r, 1, 5), -3);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{5} (-1)^r\, r$.`,
    options: [
      [t`$-3$`, t`Correct: $-1 + 2 - 3 + 4 - 5 = -3$.`],
      [t`$3$`, t`This uses $(-1)^{r+1}$: the first term is $(-1)^1 \times 1 = -1$.`],
      [t`$-15$`, t`This makes every term negative; $(-1)^r$ is $+1$ for even $r$.`],
      [t`$15$`, t`This ignores the factor $(-1)^r$.`],
    ],
    answer: "A",
    explanation: t`$(-1)^r$ is $-1$ for odd $r$ and $+1$ for even $r$: $-1 + 2 - 3 + 4 - 5 = -3$.`,
    hints: ["Write out all five terms with their signs."],
  });

  chk(S((r) => 5 * 0.5 ** (r - 1), 1, 6), 315 / 32); chk(gp.sum(5, 0.5, 6), 315 / 32);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{6} 5\left(\frac{1}{2}\right)^{r-1}$, giving your answer as an exact fraction or a decimal.`,
    value: 315 / 32, wrong: [10, 315 / 64],
    explanation: t`A geometric series with $a = 5$, ratio $\frac{1}{2}$, 6 terms: $S_6 = \dfrac{5\left(1 - \frac{1}{64}\right)}{1 - \frac{1}{2}} = 10 \times \frac{63}{64} = \frac{315}{32} = 9.84375$.`,
    hints: [t`First term $r = 1$: $5 \times 1 = 5$; each term is half the one before.`],
  });

  // Struct 1 (6): Σ(3r - 2) = n(3n - 1)/2
  for (const n of [1, 2, 7, 30]) chk(S((r) => 3 * r - 2, 1, n), (n * (3 * n - 1)) / 2);
  chk(S((r) => 3 * r - 2, 1, 30), 1335); chk(S((r) => 3 * r - 2, 31, 60), 4035);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`This question is about $\displaystyle\sum_{r=1}^{n} (3r - 2)$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\displaystyle\sum_{r=1}^{n} (3r - 2) = \frac{n(3n - 1)}{2}$.`,
        points: [t`M1 uses $3\sum r - \sum 2 = 3 \cdot \frac{n(n + 1)}{2} - 2n$.`, t`A1 simplifies to $\frac{3n^2 + 3n - 4n}{2} = \frac{n(3n - 1)}{2}$.`],
        modelAnswer: t`$$
\sum_{r=1}^{n} (3r - 2) = 3\sum_{r=1}^{n} r - \sum_{r=1}^{n} 2 = \frac{3n(n + 1)}{2} - 2n
$$

$$
= \frac{3n^2 + 3n - 4n}{2} = \frac{3n^2 - n}{2} = \frac{n(3n - 1)}{2}
$$`,
        explanation: "Split the sum, then use Σr = n(n + 1)/2 and Σc = nc." }),
      P.num({ label: "(b)", marks: 1, stem: t`Hence evaluate $\displaystyle\sum_{r=1}^{30} (3r - 2)$.`, value: 1335, wrong: [1365],
        explanation: t`$\frac{30(89)}{2} = 1335$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`State the number of terms in $\displaystyle\sum_{r=31}^{60} (3r - 2)$.`, value: 30, wrong: [29],
        explanation: t`$60 - 31 + 1 = 30$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Evaluate $\displaystyle\sum_{r=31}^{60} (3r - 2)$.`, value: 4035, wrong: [S((r) => 3 * r - 2, 1, 60) - S((r) => 3 * r - 2, 1, 31), 5370],
        explanation: t`$\displaystyle\sum_{r=1}^{60} - \sum_{r=1}^{30} = \frac{60(179)}{2} - 1335 = 5370 - 1335 = 4035$.` }),
    ],
    explanation: "Find a formula for the sum from 1 to n, then subtract to get a sum that starts later.",
    hints: [t`$\sum_{r=31}^{60} = \sum_{r=1}^{60} - \sum_{r=1}^{30}$.`],
  });

  // Struct 2 (7): 2 + 6 + 18 + ... + 1458
  chk(2 * 3 ** 6, 1458);
  chk(S((r) => 2 * 3 ** (r - 1), 1, 7), 2186); chk(gp.sum(2, 3, 7), 2186);
  chk(S((r) => 2 * 3 ** (r - 1) + r, 1, 7), 2214);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The series $2 + 6 + 18 + \cdots + 1458$ has each term three times the one before.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Write the series in the form $\displaystyle\sum_{r=1}^{N} a \times 3^{r-1}$: find $a$ and $N$.`, template: "a = {{blank:a}}, N = {{blank:n}}",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: "6" }, { id: "n", input: "number", accepted: [7], wrong: "6" }],
        explanation: t`First term $a = 2$. Last term $2 \times 3^{N-1} = 1458$ gives $3^{N-1} = 729 = 3^6$, so $N = 7$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the sum of the series.", value: 2186, wrong: [1093, 3279],
        explanation: t`Geometric: $S_7 = \frac{2(3^7 - 1)}{3 - 1} = 3^7 - 1 = 2186$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Hence evaluate $\displaystyle\sum_{r=1}^{N} \left(a \times 3^{r-1} + r\right)$ for the same $a$ and $N$.`, value: 2214, wrong: [2193, 2187],
        explanation: t`$\displaystyle\sum (a \times 3^{r-1}) + \sum r = 2186 + \frac{7 \times 8}{2} = 2186 + 28 = 2214$.` }),
      P.manual({ label: "(d)", marks: 1, stem: "State the property of sigma notation used in part (c).",
        points: [t`$\Sigma(a_r + b_r) = \Sigma a_r + \Sigma b_r$: the sum of a sum is the sum of the separate sums.`],
        modelAnswer: t`$\displaystyle\sum_{r=1}^{n} (a_r + b_r) = \sum_{r=1}^{n} a_r + \sum_{r=1}^{n} b_r$.`,
        explanation: "Sums split over addition." }),
    ],
    explanation: "Identify the general term and the number of terms, use the geometric series formula, then split the combined sum.",
    hints: [t`$729 = 3^6$.`, t`$\sum_{r=1}^{7} r = 28$.`],
  });

  chk(S((r) => 3 * r, 1, 10), 3 + 6 + 9 + 12 + 15 + 18 + 21 + 24 + 27 + 30);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which sigma form equals $3 + 6 + 9 + \cdots + 30$?`,
    options: [
      [t`$\displaystyle\sum_{r=1}^{10} 3r$`, t`Correct: $r = 1$ gives 3 and $r = 10$ gives 30.`],
      [t`$\displaystyle\sum_{r=3}^{30} r$`, t`This adds every whole number from 3 to 30, not just the multiples of 3.`],
      [t`$\displaystyle\sum_{r=1}^{30} 3r$`, t`This goes on to $3 \times 30 = 90$; the upper limit is the value of $r$, not of the last term.`],
      [t`$\displaystyle\sum_{r=1}^{10} (r + 3)$`, t`This gives $4 + 5 + \cdots + 13$: the terms go up by 1, not 3.`],
    ],
    answer: "A",
    explanation: t`The general term is $3r$ and the last term $3r = 30$ gives $r = 10$.`,
  });

  for (const n of [1, 7, 20]) chk(S(() => 2, 1, n), 2 * n);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is $\displaystyle\sum_{r=1}^{n} 2$ equal to?`,
    options: [
      [t`$2n$`, t`Correct: the constant 2 is added $n$ times.`],
      [t`$2$`, t`The sum has $n$ terms, each equal to 2.`],
      [t`$n + 2$`, "The 2 is added once for every value of r, so the total is multiplied, not added."],
      [t`$n(n + 1)$`, t`This is $\sum 2r$; here the term does not depend on $r$.`],
    ],
    answer: "A",
    explanation: t`$\Sigma c = nc$: $2 + 2 + \cdots + 2$ ($n$ times) $= 2n$.`,
  });

  // Cards
  b.card("DEFINITION", "Series", "The sum of the terms of a sequence; Sₙ is the sum of the first n terms.");
  b.card("DEFINITION", t`$\displaystyle\sum_{r=a}^{b} f(r)$`, t`Substitute $r = a, a + 1, \ldots, b$ into $f(r)$ and add the results.`);
  b.card("FORMULA", t`Number of terms in $\displaystyle\sum_{r=a}^{b}$`, t`$b - a + 1$`);
  b.card("FORMULA", t`$\displaystyle\sum_{r=1}^{n} c$`, t`$nc$`);
  b.card("FORMULA", t`$\displaystyle\sum_{r=1}^{n} r$`, t`$\frac{n(n + 1)}{2}$`);
  b.card("FACT", "Properties of Σ", t`$\Sigma(a_r + b_r) = \Sigma a_r + \Sigma b_r$ and $\Sigma k a_r = k\Sigma a_r$; products and squares do not split.`);
  b.card("FORMULA", t`$\displaystyle\sum_{r=a}^{b} f(r)$ with $a > 1$`, t`$\displaystyle\sum_{r=1}^{b} f(r) - \sum_{r=1}^{a-1} f(r)$`);
  b.card("CONCEPT", "Alternating signs in sigma notation", t`Use $(-1)^{r+1}$ to start positive or $(-1)^r$ to start negative (with $r$ from 1).`);
});
