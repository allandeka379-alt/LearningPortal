// W1b: amaths.series.standard-sums-differences (ZIMSEC only)
import { concept, P, t, chk, same, sum, fact } from "../lib.mjs";

const sig = (m, n, f) => sum(Array.from({ length: n - m + 1 }, (_, i) => f(m + i)));
const S1 = (n) => (n * (n + 1)) / 2, S2 = (n) => (n * (n + 1) * (2 * n + 1)) / 6, S3 = (n) => S1(n) ** 2;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const least = (cond) => { for (let n = 1; n < 100000; n++) if (cond(n)) return n; throw new Error("least"); };

concept("amaths.series.standard-sums-differences", { file: "series/standard-sums-differences", keyPrefix: "series.standard-sums-differences" }, (b) => {
  for (const n of [1, 4, 9]) chk(sig(1, n, (r) => r * r), S2(n));
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which is the standard result for $\displaystyle\sum_{r=1}^{n} r^2$?`,
    options: [
      [t`$\dfrac{n(n + 1)(2n + 1)}{6}$`, "Correct: check n = 2: 1 + 4 = 5 = (2 × 3 × 5)/6."],
      [t`$\dfrac{n^2(n + 1)^2}{4}$`, t`This is $\sum r^3$.`],
      [t`$\dfrac{n(n + 1)}{2}$`, t`This is $\sum r$.`],
      [t`$\left(\dfrac{n(n + 1)}{2}\right)^2 - n$`, t`For $n = 2$ this gives $7$, not $5$.`],
    ],
    answer: "A",
    explanation: t`$\sum_{r=1}^{n} r^2 = \frac{n(n + 1)(2n + 1)}{6}$.`,
  });

  chk(sig(1, 20, (r) => r), 210);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{20} r$.`,
    value: 210, wrong: [200, 420],
    explanation: t`$\frac{20 \times 21}{2} = 210$.`,
  });

  chk(sig(1, 10, (r) => r ** 3), 3025);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{10} r^3$.`,
    value: 3025, wrong: [55, 385],
    explanation: t`$\frac{10^2 \times 11^2}{4} = \frac{12\,100}{4} = 3025$, which is $55^2 = \left(\sum r\right)^2$.`,
  });

  chk(sig(1, 15, (r) => r * (r + 2)), 1480);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use standard results to evaluate $\displaystyle\sum_{r=1}^{15} r(r + 2)$.`,
    value: 1480, wrong: [1360, 1240],
    explanation: t`$\sum r^2 + 2\sum r = \frac{15 \times 16 \times 31}{6} + 2 \times \frac{15 \times 16}{2} = 1240 + 240 = 1480$.`,
    hints: [t`Expand $r(r + 2)$ and split the sum.`],
  });

  chk(sig(21, 40, (r) => r * r), 19270); chk(S2(40), 22140); chk(S2(20), 2870);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=21}^{40} r^2$.`,
    value: 19270, wrong: [22140 - S2(21), 22140],
    explanation: t`$\sum_{1}^{40} r^2 - \sum_{1}^{20} r^2 = \frac{40 \times 41 \times 81}{6} - \frac{20 \times 21 \times 41}{6} = 22\,140 - 2870 = 19\,270$. (Subtracting the sum up to 21 removes the term $21^2$ wrongly.)`,
    hints: [t`Subtract $\sum_{r=1}^{20}$, not $\sum_{r=1}^{21}$.`],
  });

  for (const n of [1, 2, 6, 11]) chk(sig(1, n, (r) => r * (r - 1)), (n * (n * n - 1)) / 3);
  b.expr({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find $\displaystyle\sum_{r=1}^{n} r(r - 1)$ in a fully factorised form. Type it like n(n+2)(n-3)/4.`,
    accepted: ["n(n+1)(n-1)/3", "n(n-1)(n+1)/3", "(n-1)n(n+1)/3", "(n-1)(n)(n+1)/3", "1/3n(n+1)(n-1)", "1/3n(n-1)(n+1)", "(1/3)n(n-1)(n+1)", "(1/3)n(n+1)(n-1)", "n(n^2-1)/3", "(n^3-n)/3"],
    wrong: ["n(n+1)(2n+1)/6", "n(n-1)/2"],
    explanation: t`$\sum r^2 - \sum r = \frac{n(n + 1)(2n + 1)}{6} - \frac{n(n + 1)}{2} = \frac{n(n + 1)}{6}(2n + 1 - 3) = \frac{n(n + 1)(2n - 2)}{6} = \frac{n(n + 1)(n - 1)}{3}$.`,
    hints: [t`Take out $\frac{n(n + 1)}{6}$ as a common factor.`],
  });

  chk(sig(1, 99, (r) => 1 / (r * (r + 1))), 0.99, 1e-12);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Use the method of differences to evaluate $\displaystyle\sum_{r=1}^{99} \frac{1}{r(r + 1)}$ exactly, as a decimal.`,
    value: 0.99, wrong: [1, 0.5],
    explanation: t`$\frac{1}{r(r + 1)} = \frac{1}{r} - \frac{1}{r + 1}$; the sum telescopes to $1 - \frac{1}{100} = 0.99$.`,
    hints: [t`Write $\frac{1}{r(r + 1)}$ as a difference of two fractions.`],
  });

  chk(sig(1, 100000, (r) => 1 / (r * (r + 2))), 0.75, 2e-5);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the sum to infinity of the series $\displaystyle\sum_{r=1}^{\infty} \frac{1}{r(r + 2)}$, as a decimal.`,
    value: 0.75, wrong: [0.5, 1.5],
    explanation: t`$\frac{1}{r(r + 2)} = \frac{1}{2}\left(\frac{1}{r} - \frac{1}{r + 2}\right)$. The $n$-term sum is $\frac{1}{2}\left(1 + \frac{1}{2} - \frac{1}{n + 1} - \frac{1}{n + 2}\right)$, which tends to $\frac{1}{2} \times \frac{3}{2} = 0.75$. (0.5 keeps only one surviving term at the start.)`,
    hints: ["The gap between r and r + 2 is 2, so two terms survive at each end."],
  });

  for (const n of [1, 3, 8]) chk(S3(n), S1(n) ** 2);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every positive integer $n$, $\displaystyle\sum_{r=1}^{n} r^3 = \left(\sum_{r=1}^{n} r\right)^2$.`,
    answer: true,
    explanation: t`$\sum r^3 = \frac{n^2(n + 1)^2}{4} = \left(\frac{n(n + 1)}{2}\right)^2$. For example $1 + 8 + 27 = 36 = 6^2$.`,
  });

  for (const r of [1, 2, 5]) chk(2 / (r * (r + 2)), 1 / r - 1 / (r + 2), 1e-12);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $\dfrac{2}{r(r + 2)}$ in the form $\dfrac{A}{r} + \dfrac{B}{r + 2}$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}",
    blanks: [N("A", 1, "2"), N("B", -1, "1")],
    explanation: t`$2 = A(r + 2) + Br$. $r = 0$: $A = 1$. $r = -2$: $B = -1$. So $\frac{2}{r(r + 2)} = \frac{1}{r} - \frac{1}{r + 2}$.`,
    hints: ["Multiply through by r(r + 2), then substitute r = 0 and r = −2."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`In $\displaystyle\sum_{r=1}^{n}\left(\frac{1}{r} - \frac{1}{r + 1}\right)$, which terms remain after cancellation?`,
    options: [
      [t`$1 - \dfrac{1}{n + 1}$`, t`Correct: each $-\frac{1}{r + 1}$ cancels the $+\frac{1}{r + 1}$ of the next row, leaving the first and the last.`],
      [t`$1 - \dfrac{1}{n}$`, t`The last row is $\frac{1}{n} - \frac{1}{n + 1}$; its $\frac{1}{n}$ cancels, but $\frac{1}{n + 1}$ survives.`],
      [t`$1 + \dfrac{1}{2} - \dfrac{1}{n + 1}$`, t`Only one term survives at each end because the gap is 1.`],
      [t`$\dfrac{1}{n + 1}$`, t`The first term $1$ never cancels.`],
    ],
    answer: "A",
    explanation: t`$\left(1 - \frac{1}{2}\right) + \left(\frac{1}{2} - \frac{1}{3}\right) + \cdots + \left(\frac{1}{n} - \frac{1}{n + 1}\right) = 1 - \frac{1}{n + 1}$.`,
    hints: ["Write out the first three rows and the last row."],
  });

  for (const n of [1, 5, 10]) chk(sig(1, n, (r) => r * (r + 1)), (n * (n + 1) * (n + 2)) / 3);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Use standard results to show that $\displaystyle\sum_{r=1}^{n} r(r + 1) = \frac{n(n + 1)(n + 2)}{3}$.`,
    points: [
      t`M1 splits into $\sum r^2 + \sum r$ and substitutes the standard results.`,
      t`M1 takes out the common factor $\frac{n(n + 1)}{6}$: $\frac{n(n + 1)}{6}(2n + 1 + 3)$.`,
      t`A1 simplifies $\frac{n(n + 1)(2n + 4)}{6}$ to $\frac{n(n + 1)(n + 2)}{3}$.`,
    ],
    modelAnswer: t`$$
\sum_{r=1}^{n} r(r + 1) = \frac{n(n + 1)(2n + 1)}{6} + \frac{n(n + 1)}{2} = \frac{n(n + 1)}{6}\left[(2n + 1) + 3\right]
$$

$$
= \frac{n(n + 1)(2n + 4)}{6} = \frac{n(n + 1)(n + 2)}{3}
$$`,
    explanation: "Factorise before expanding to keep the algebra short.",
    hints: [t`$\frac{n(n + 1)}{2} = \frac{3n(n + 1)}{6}$.`],
  });

  for (const n of [1, 4, 30]) chk(sig(1, n, (r) => 1 / ((2 * r - 1) * (2 * r + 1))), n / (2 * n + 1), 1e-12);
  b.proof({
    d: 5, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Use the method of differences to show that $\displaystyle\sum_{r=1}^{n} \frac{1}{(2r - 1)(2r + 1)} = \frac{n}{2n + 1}$.`,
    points: [
      t`M1 partial fractions: $\frac{1}{(2r - 1)(2r + 1)} = \frac{1}{2}\left(\frac{1}{2r - 1} - \frac{1}{2r + 1}\right)$.`,
      t`M1 writes out rows $r = 1, 2, \ldots, n$ showing cancellation.`,
      t`A1 obtains $\frac{1}{2}\left(1 - \frac{1}{2n + 1}\right)$.`,
      t`A1 simplifies to $\frac{n}{2n + 1}$.`,
    ],
    modelAnswer: t`$$
\frac{1}{(2r - 1)(2r + 1)} = \frac{1}{2}\left(\frac{1}{2r - 1} - \frac{1}{2r + 1}\right)
$$

$$
\sum_{r=1}^{n} = \frac{1}{2}\left[\left(1 - \frac{1}{3}\right) + \left(\frac{1}{3} - \frac{1}{5}\right) + \cdots + \left(\frac{1}{2n - 1} - \frac{1}{2n + 1}\right)\right]
$$

$$
= \frac{1}{2}\left(1 - \frac{1}{2n + 1}\right) = \frac{1}{2} \cdot \frac{2n}{2n + 1} = \frac{n}{2n + 1}
$$`,
    explanation: "The difference between consecutive odd denominators is 2, which gives the factor ½.",
    hints: [t`Find $A$ and $B$ in $\frac{A}{2r - 1} + \frac{B}{2r + 1}$.`],
  });

  chk(sig(1, 10, (r) => 6 * r * r + 2 * r), 2420);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\sum_{r=1}^{10}(6r^2 + 2r)$.`,
    value: 2420, wrong: [2330, 2310],
    explanation: t`$6\sum r^2 + 2\sum r = 6 \times 385 + 2 \times 55 = 2310 + 110 = 2420$.`,
    hints: ["Use linearity: 6Σr² + 2Σr."],
  });

  chk(sig(6, 10, (r) => r * r), 330);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Given that $n = 5$, evaluate $\displaystyle\sum_{r=n+1}^{2n} r^2$.`,
    value: 330, wrong: [385, 274],
    explanation: t`$\sum_{r=6}^{10} r^2 = \sum_{1}^{10} - \sum_{1}^{5} = 385 - 55 = 330$ (that is $36 + 49 + 64 + 81 + 100$).`,
    hints: ["The sum runs from r = 6 to r = 10."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each sum (from r = 1 to n) with its closed form.",
    pairs: [
      [t`$\sum 1$`, t`$n$`],
      [t`$\sum r$`, t`$\frac{n(n + 1)}{2}$`],
      [t`$\sum r^2$`, t`$\frac{n(n + 1)(2n + 1)}{6}$`],
      [t`$\sum r^3$`, t`$\frac{n^2(n + 1)^2}{4}$`],
    ],
    explanation: "These four standard results are the building blocks for all sums of polynomial terms.",
  });

  for (const n of [1, 4, 7]) chk(sig(1, n, (r) => r * fact(r)), fact(n + 1) - 1);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Using $r \times r! = (r + 1)! - r!$, find $\displaystyle\sum_{r=1}^{n} r \times r!$.`,
    options: [
      [t`$(n + 1)! - 1$`, t`Correct: the sum telescopes, $(2! - 1!) + (3! - 2!) + \cdots + ((n + 1)! - n!) = (n + 1)! - 1!$.`],
      [t`$(n + 1)!$`, t`The first $-1! = -1$ does not cancel.`],
      [t`$n! - 1$`, t`The last row contributes $(n + 1)!$, not $n!$.`],
      [t`$\dfrac{n(n + 1)}{2} \times n!$`, "The factorials cannot be summed term by term like this; use the differences."],
    ],
    answer: "A",
    explanation: t`Check $n = 2$: $1 \times 1 + 2 \times 2 = 5 = 3! - 1$.`,
    hints: ["Write out the first two rows and the last row."],
  });

  // Struct (12): Σ(3r² − r) = n²(n + 1)
  for (const n of [1, 2, 5, 20]) chk(sig(1, n, (r) => 3 * r * r - r), n * n * (n + 1));
  chk(sig(21, 40, (r) => 3 * r * r - r), 57200);
  chk(10 * 10 * 11, 1100);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`This question is about the series $\displaystyle\sum_{r=1}^{n}(3r^2 - r)$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $\displaystyle\sum_{r=1}^{n}(3r^2 - r) = n^2(n + 1)$.`,
        points: [t`M1 $3 \cdot \frac{n(n + 1)(2n + 1)}{6} - \frac{n(n + 1)}{2}$.`, t`M1 factorises: $\frac{n(n + 1)}{2}(2n + 1 - 1)$.`, t`A1 $= \frac{n(n + 1)}{2} \cdot 2n = n^2(n + 1)$.`],
        modelAnswer: t`$$
\sum (3r^2 - r) = \frac{3n(n + 1)(2n + 1)}{6} - \frac{n(n + 1)}{2} = \frac{n(n + 1)}{2}\left[(2n + 1) - 1\right] = \frac{n(n + 1)}{2} \cdot 2n = n^2(n + 1)
$$`,
        explanation: "Common factor n(n + 1)/2." }),
      P.num({ label: "(b)", marks: 2, stem: t`Evaluate the sum when $n = 20$.`, value: 8400, wrong: [8000, 16800],
        explanation: t`$20^2 \times 21 = 8400$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Evaluate $\displaystyle\sum_{r=21}^{40}(3r^2 - r)$.`, value: 57200, wrong: [65600, 57200 + 3 * 441 - 21],
        explanation: t`$40^2 \times 41 - 20^2 \times 21 = 65\,600 - 8400 = 57\,200$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the value of $n$ for which $\displaystyle\sum_{r=1}^{n}(3r^2 - r) = 1100$.`, prefix: "n =", value: 10, wrong: [11, 100],
        explanation: t`$n^2(n + 1) = 1100 = 10^2 \times 11$, so $n = 10$ (the left side increases with $n$, so this is the only solution).` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Explain why $\displaystyle\sum_{r=1}^{n}(3r^2 - r)$ is always an even number.`,
        points: [t`$3r^2 - r = r(3r - 1)$: if $r$ is even the product is even; if $r$ is odd, $3r - 1$ is even.`, "So every term is even, and a sum of even numbers is even (or: n²(n + 1) contains n(n + 1), a product of consecutive integers)."],
        modelAnswer: "n²(n + 1) = n · n(n + 1), and n(n + 1) is a product of two consecutive integers, one of which is even. So the sum is always even." }),
    ],
    explanation: "Linearity and the standard results give a factorised closed form; differences of closed forms give sums between limits.",
    hints: [t`$\sum_{r=21}^{40} = \sum_{1}^{40} - \sum_{1}^{20}$.`],
  });

  // Struct (13): Σ 1/(r(r + 1)(r + 2)) = 1/4 − 1/(2(n + 1)(n + 2))
  for (const r of [1, 2, 6]) chk(1 / (r * (r + 1)) - 1 / ((r + 1) * (r + 2)), 2 / (r * (r + 1) * (r + 2)), 1e-12);
  for (const n of [1, 3, 25]) chk(sig(1, n, (r) => 1 / (r * (r + 1) * (r + 2))), 0.25 - 1 / (2 * (n + 1) * (n + 2)), 1e-12);
  const n19 = least((n) => 0.25 - 1 / (2 * (n + 1) * (n + 2)) > 0.249);
  chk(n19, 21);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`This question is about $S_n = \displaystyle\sum_{r=1}^{n} \frac{1}{r(r + 1)(r + 2)}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $\dfrac{1}{r(r + 1)} - \dfrac{1}{(r + 1)(r + 2)} = \dfrac{2}{r(r + 1)(r + 2)}$.`,
        points: [t`M1 common denominator $r(r + 1)(r + 2)$.`, t`M1 numerator $(r + 2) - r$.`, t`A1 $= \frac{2}{r(r + 1)(r + 2)}$.`],
        modelAnswer: t`$$
\frac{1}{r(r + 1)} - \frac{1}{(r + 1)(r + 2)} = \frac{(r + 2) - r}{r(r + 1)(r + 2)} = \frac{2}{r(r + 1)(r + 2)}
$$`,
        explanation: "Combine over the common denominator." }),
      P.proof({ label: "(b)", marks: 4, stem: t`Hence show that $S_n = \dfrac{1}{4} - \dfrac{1}{2(n + 1)(n + 2)}$.`,
        points: [
          t`M1 writes $\frac{1}{r(r + 1)(r + 2)} = \frac{1}{2}\left[\frac{1}{r(r + 1)} - \frac{1}{(r + 1)(r + 2)}\right]$.`,
          t`M1 lists rows $r = 1, 2, \ldots, n$ showing the cancellation.`,
          t`A1 obtains $\frac{1}{2}\left[\frac{1}{2} - \frac{1}{(n + 1)(n + 2)}\right]$.`,
          t`A1 simplifies to the given result.`,
        ],
        modelAnswer: t`$$
S_n = \frac{1}{2}\sum_{r=1}^{n}\left[\frac{1}{r(r + 1)} - \frac{1}{(r + 1)(r + 2)}\right]
$$

$$
= \frac{1}{2}\left[\left(\frac{1}{1 \cdot 2} - \frac{1}{2 \cdot 3}\right) + \left(\frac{1}{2 \cdot 3} - \frac{1}{3 \cdot 4}\right) + \cdots + \left(\frac{1}{n(n + 1)} - \frac{1}{(n + 1)(n + 2)}\right)\right]
$$

$$
= \frac{1}{2}\left[\frac{1}{2} - \frac{1}{(n + 1)(n + 2)}\right] = \frac{1}{4} - \frac{1}{2(n + 1)(n + 2)}
$$`,
        explanation: "Each row's second fraction cancels the next row's first fraction." }),
      P.num({ label: "(c)", marks: 2, stem: t`Write down the sum to infinity of the series, as a decimal.`, value: 0.25, wrong: [0.5, 0.125],
        explanation: t`As $n \to \infty$, $\frac{1}{2(n + 1)(n + 2)} \to 0$, so $S_\infty = \frac{1}{4} = 0.25$.` }),
      P.num({ label: "(d)", marks: 4, stem: t`Find the least value of $n$ for which $S_n > 0.249$.`, prefix: "n =", value: n19, wrong: [20, 22],
        explanation: t`$\frac{1}{2(n + 1)(n + 2)} < 0.001 \Rightarrow (n + 1)(n + 2) > 500$. $n = 20$: $21 \times 22 = 462$; $n = 21$: $22 \times 23 = 506 > 500$. So $n = 21$.` }),
    ],
    explanation: "A difference of consecutive two-factor fractions telescopes; the remaining term tends to zero.",
    hints: ["Halve the identity in (a) to write each term as a difference.", "In (d), solve (n + 1)(n + 2) > 500 by trying values near √500."],
  });

  b.card("FORMULA", "Σr", t`$\sum_{r=1}^{n} r = \frac{n(n + 1)}{2}$`);
  b.card("FORMULA", "Σr²", t`$\sum_{r=1}^{n} r^2 = \frac{n(n + 1)(2n + 1)}{6}$`);
  b.card("FORMULA", "Σr³", t`$\sum_{r=1}^{n} r^3 = \frac{n^2(n + 1)^2}{4} = \left(\sum r\right)^2$`);
  b.card("FACT", "Σ1", t`$\sum_{r=1}^{n} 1 = n$`);
  b.card("CONCEPT", "Sums between limits", t`$\sum_{r=m}^{n} f(r) = \sum_{r=1}^{n} f(r) - \sum_{r=1}^{m-1} f(r)$`);
  b.card("DEFINITION", "Method of differences", t`If $u_r = f(r) - f(r + 1)$ then $\sum_{r=1}^{n} u_r = f(1) - f(n + 1)$.`);
  b.card("FACT", "1/(r(r + 1))", t`$= \frac{1}{r} - \frac{1}{r + 1}$; $\sum_{1}^{n} = 1 - \frac{1}{n + 1}$, sum to infinity 1.`);
  b.card("CONCEPT", "Gap k in differences", t`For $f(r) - f(r + k)$, $k$ terms survive at each end.`);
  b.card("CONCEPT", "Check a formula", "Substitute n = 1 and n = 2 and compare with the terms added directly.");
});
