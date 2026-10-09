// W2b: amath.sequences.behaviour (ZIMSEC only: tagged automatically)
import { concept, P, t, chk, same, quad } from "../lib.mjs";

const terms = (f, n) => Array.from({ length: n }, (_, i) => f(i + 1));
const rec = (u1, g, n) => {
  const o = [u1];
  while (o.length < n) o.push(g(o[o.length - 1]));
  return o;
};
const close = (a, b) => Math.abs(a - b) < 1e-9;

concept("amath.sequences.behaviour", { file: "sequences/behaviour", keyPrefix: "sequences.behaviour" }, (b) => {
  same(terms((n) => 4 * n - 1, 3), [3, 7, 11]);
  b.mcq({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`The $n$th term of a sequence is $u_n = 4n - 1$. What are the first three terms?`,
    options: [
      [t`$3, 7, 11$`, t`Correct: $4(1) - 1 = 3$, $4(2) - 1 = 7$, $4(3) - 1 = 11$.`],
      [t`$-1, 3, 7$`, t`This starts at $n = 0$; the first term is $u_1$.`],
      [t`$4, 8, 12$`, t`This is $4n$; the $-1$ has been left out.`],
      [t`$3, 6, 9$`, t`The terms go up by 4 each time, the coefficient of $n$.`],
    ],
    answer: "A",
    explanation: t`Substitute $n = 1, 2, 3$: $u_1 = 3$, $u_2 = 7$, $u_3 = 11$.`,
  });

  const s2 = terms((n) => 5 - 2 * n, 6);
  chk(s2[5] - s2[4], -2);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which description fits the sequence $u_n = 5 - 2n$?`,
    options: [
      ["decreasing and divergent", t`Correct: $3, 1, -1, -3, \ldots$ falls by 2 each time and has no limit.`],
      ["decreasing and convergent to 0", "The terms pass 0 and keep falling; they do not settle at any value."],
      ["oscillating and divergent", "The terms do not alternate up and down; every term is smaller than the one before."],
      ["increasing and divergent", t`Each term is 2 **less** than the one before.`],
    ],
    answer: "A",
    explanation: t`$u_{n+1} - u_n = -2 < 0$, so the sequence is decreasing, and $u_n \to -\infty$, so it diverges.`,
  });

  same(terms((n) => (-1) ** n, 4), [-1, 1, -1, 1]);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which description fits the sequence $u_n = (-1)^n$?`,
    options: [
      ["periodic with period 2", t`Correct: $-1, 1, -1, 1, \ldots$ repeats every two terms.`],
      ["convergent to 0", "The terms are always −1 or 1; they never get close to 0."],
      ["convergent to 1", "Every other term is −1, so the terms do not approach 1."],
      ["increasing", "The terms go down as well as up."],
    ],
    answer: "A",
    explanation: t`The terms alternate $-1, 1, -1, 1, \ldots$: the sequence is periodic (period 2), oscillating and divergent, because it does not approach a single value.`,
  });

  const s4 = terms((n) => (n + 4) / n, 6);
  for (let i = 1; i < 6; i++) chk(Math.sign(s4[i] - s4[i - 1]), -1);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Which description fits the sequence $u_n = \dfrac{n + 4}{n}$?`,
    options: [
      ["decreasing and convergent to 1", t`Correct: $u_n = 1 + \frac{4}{n}$: $5, 3, 2.33, 2, \ldots$, and $\frac{4}{n} \to 0$.`],
      ["increasing and convergent to 1", t`The terms fall: $5, 3, 2.33, \ldots$, because $\frac{4}{n}$ gets smaller.`],
      ["decreasing and convergent to 0", t`$u_n = 1 + \frac{4}{n}$ is always greater than 1.`],
      ["decreasing and divergent", "The terms are bounded below by 1 and approach it, so the sequence converges."],
    ],
    answer: "A",
    explanation: t`Write $u_n = 1 + \frac{4}{n}$. As $n$ increases, $\frac{4}{n}$ decreases towards 0, so the terms decrease and converge to 1.`,
    hints: [t`Split the fraction: $\frac{n + 4}{n} = 1 + \frac{4}{n}$.`],
  });

  chk(7 * 7 + 2 * 7, 63);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The $n$th term of a sequence is $u_n = n^2 + 2n$. Find $u_7$.`,
    value: 63, wrong: [49, 56],
    explanation: t`$u_7 = 7^2 + 2(7) = 49 + 14 = 63$.`,
  });

  const r6 = rec(4, (u) => 3 * u - 2, 4);
  same(r6, [4, 10, 28, 82]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`A sequence is defined by $u_1 = 4$ and $u_{n+1} = 3u_n - 2$. Find $u_4$.`,
    value: 82, wrong: [28, 10],
    explanation: t`$u_2 = 3(4) - 2 = 10$, $u_3 = 3(10) - 2 = 28$, $u_4 = 3(28) - 2 = 82$.`,
  });

  chk(2 * 9 * 9 + 3, 165);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The $n$th term of a sequence is $u_n = 2n^2 + 3$. Which term of the sequence is equal to 165?`,
    value: 9, prefix: "n =", wrong: [81, -9],
    explanation: t`$2n^2 + 3 = 165$ gives $2n^2 = 162$, $n^2 = 81$, so $n = 9$ (the position must be a positive integer). It is the 9th term.`,
    hints: [t`Set $u_n = 165$ and solve for $n$.`],
  });

  chk((5 * 1e9 - 2) / (1e9 + 1), 5, 1e-8);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the limit of the sequence $u_n = \dfrac{5n - 2}{n + 1}$ as $n$ becomes very large.`,
    value: 5, wrong: [-2, 3],
    explanation: t`Divide top and bottom by $n$: $u_n = \frac{5 - \frac{2}{n}}{1 + \frac{1}{n}} \to \frac{5}{1} = 5$.`,
    hints: [t`Divide the numerator and denominator by $n$.`],
  });

  const r9 = rec(1, (u) => 0.6 * u + 2, 80);
  chk(r9[79], 5, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The sequence defined by $u_1 = 1$ and $u_{n+1} = 0.6u_n + 2$ converges. Find its limit.`,
    value: 5, wrong: [2, 3.2],
    explanation: t`The limit satisfies $L = 0.6L + 2$, so $0.4L = 2$ and $L = 5$. The terms $1, 2.6, 3.56, 4.136, \ldots$ increase towards 5.`,
    hints: [t`Put $u_{n+1} = u_n = L$.`],
  });

  const r10 = rec(2, (u) => 1 - 1 / u, 7);
  same(r10, [2, 0.5, -1, 2, 0.5, -1, 2]);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A sequence is defined by $u_1 = 2$ and $u_{n+1} = 1 - \dfrac{1}{u_n}$. Find $u_{50}$.`,
    value: 0.5, wrong: [-1, 2],
    explanation: t`$u_1 = 2$, $u_2 = 1 - \frac{1}{2} = \frac{1}{2}$, $u_3 = 1 - 2 = -1$, $u_4 = 1 + 1 = 2$: periodic with period 3. $50 = 3 \times 16 + 2$, so $u_{50} = u_2 = \frac{1}{2}$.`,
    hints: ["Work out terms until one repeats.", "Use the remainder when 50 is divided by the period."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A convergent sequence must be either increasing or decreasing.",
    answer: false,
    explanation: t`False. $u_n = \left(-\frac{1}{3}\right)^n$: $-\frac{1}{3}, \frac{1}{9}, -\frac{1}{27}, \ldots$ oscillates about 0 but converges to 0.`,
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`The sequence $u_n = 2^n$ is divergent.`,
    answer: true,
    explanation: t`True. $2, 4, 8, 16, \ldots$ grows without bound, so it does not approach any limit.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each sequence with its behaviour.",
    pairs: [
      [t`$u_n = 3n + 1$`, "increasing and divergent"],
      [t`$u_n = \left(\frac{1}{2}\right)^n$`, "decreasing and convergent to 0"],
      [t`$u_n = (-3)^n$`, "oscillating and divergent"],
      [t`$u_n = 7 + (-1)^n$`, "periodic with period 2"],
    ],
    explanation: t`$4, 7, 10, \ldots$ grows; $\frac{1}{2}, \frac{1}{4}, \ldots$ falls towards 0; $-3, 9, -27, \ldots$ alternates in sign with growing size; $6, 8, 6, 8, \ldots$ repeats every two terms.`,
  });

  same(rec(1, (u) => u, 1), [1]);
  const r14 = [1];
  for (let n = 1; n < 4; n++) r14.push(r14[n - 1] + 2 * n);
  same(r14, [1, 3, 7, 13]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A sequence is defined by $u_1 = 1$ and $u_{n+1} = u_n + 2n$. Find $u_2$, $u_3$ and $u_4$.`,
    template: "u₂ = {{blank:a}}, u₃ = {{blank:b}}, u₄ = {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: "5" },
      { id: "b", input: "number", accepted: [7], wrong: "9" },
      { id: "c", input: "number", accepted: [13], wrong: "15" },
    ],
    explanation: t`With $n = 1$: $u_2 = 1 + 2 = 3$. With $n = 2$: $u_3 = 3 + 4 = 7$. With $n = 3$: $u_4 = 7 + 6 = 13$.`,
  });

  same(terms((n) => 3 * n + 2, 4), [5, 8, 11, 14]);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find a formula for the $n$th term of the sequence $5, 8, 11, 14, \ldots$ Type it, e.g. 4n-1.`,
    accepted: ["3n+2", "2+3n", "u_n=3n+2", "un=3n+2", "3(n+1)-1"],
    wrong: ["3n+5", "n+3"],
    explanation: t`The terms go up by 3, so $u_n = 3n + c$. With $n = 1$: $3 + c = 5$, so $c = 2$ and $u_n = 3n + 2$.`,
    hints: ["The constant difference is the coefficient of n."],
  });

  same(terms((n) => 2 * 3 ** (n - 1), 4), [2, 6, 18, 54]);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find a formula for the $n$th term of the sequence $2, 6, 18, 54, \ldots$ Type powers with ^, e.g. 5*2^(n-1).`,
    accepted: ["2*3^(n-1)", "2(3^(n-1))", "2×3^(n-1)", "2(3)^(n-1)", "(2/3)*3^n", "(2/3)3^n", "2*3^(n-1)"],
    wrong: ["6^(n-1)", "2*3^n"],
    explanation: t`Each term is 3 times the previous one, starting from 2: $u_n = 2 \times 3^{n-1}$. Check: $u_4 = 2 \times 27 = 54$.`,
    hints: [t`Each term is multiplied by the same number.`],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Describe the behaviour of the sequence $u_n = \dfrac{(-1)^n}{n}$, giving a reason.`,
    points: [
      t`States that it is oscillating (the terms alternate in sign: $-1, \frac{1}{2}, -\frac{1}{3}, \frac{1}{4}, \ldots$).`,
      t`States that it converges to 0 because $|u_n| = \frac{1}{n} \to 0$.`,
    ],
    modelAnswer: t`The terms are $-1, \frac{1}{2}, -\frac{1}{3}, \frac{1}{4}, \ldots$: they alternate in sign, so the sequence oscillates, but their size $\frac{1}{n}$ shrinks towards 0, so it converges to 0.`,
    explanation: "Oscillating and convergent: the sign alternates while the size tends to zero.",
    hints: ["Write down the first five terms."],
  });

  // u_{n+1} = k u_n + 3, u1 = 2, u3 = 23 -> 2k^2 + 3k - 20 = 0 -> k = 2.5 or -4
  same(quad.roots(2, 3, -20), [-4, 2.5]);
  for (const k of [-4, 2.5]) chk(rec(2, (u) => k * u + 3, 3)[2], 23);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A sequence is defined by $u_1 = 2$ and $u_{n+1} = ku_n + 3$, where $k$ is a positive constant. Given that $u_3 = 23$, find $k$.`,
    value: 2.5, prefix: "k =", wrong: [-4, 10],
    explanation: t`$u_2 = 2k + 3$ and $u_3 = k(2k + 3) + 3 = 2k^2 + 3k + 3$. Setting this equal to 23: $2k^2 + 3k - 20 = 0$, so $(2k - 5)(k + 4) = 0$ and $k = 2.5$ (since $k > 0$).`,
    hints: [t`Write $u_2$ and then $u_3$ in terms of $k$.`, "You get a quadratic in k; use the condition k > 0."],
  });

  // Struct 1 (6): u1 = 10, u_{n+1} = 0.8u_n + 6
  const r18 = rec(10, (u) => 0.8 * u + 6, 12);
  chk(r18[1], 14); chk(r18[2], 17.2);
  const first = r18.findIndex((u) => u > 25) + 1;
  chk(first, 8);
  for (let i = 0; i < 12; i++) chk(r18[i], 30 - 20 * 0.8 ** i, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Water is pumped into a tank at a borehole near Gweru each day, and some is used. The amount in the tank at the start of day $n$, in thousands of litres, is modelled by $u_1 = 10$ and $u_{n+1} = 0.8u_n + 6$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $u_2$ and $u_3$.`, template: "u₂ = {{blank:a}}, u₃ = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [14], wrong: "16" }, { id: "b", input: "number", accepted: [17.2], wrong: "18" }],
        explanation: t`$u_2 = 0.8(10) + 6 = 14$; $u_3 = 0.8(14) + 6 = 17.2$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`The sequence converges. Find its limit $L$.`, value: 30, prefix: "L =", wrong: [7.5, 6],
        explanation: t`$L = 0.8L + 6$, so $0.2L = 6$ and $L = 30$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which description fits the sequence?",
        options: [["increasing and convergent", t`Correct: $10, 14, 17.2, \ldots$ rises towards 30.`], ["increasing and divergent", "The increases shrink (4, 3.2, 2.56, …) and the terms approach 30."], ["oscillating and convergent", "Every term is larger than the one before; there is no alternation."], ["periodic", "No term repeats."]],
        answer: "A", explanation: "The gaps shrink by a factor 0.8 each day, so the terms rise towards the limit 30." }),
      P.num({ label: "(d)", marks: 1, stem: t`Find the first value of $n$ for which $u_n > 25$.`, value: 8, prefix: "n =", wrong: [7, 9],
        explanation: t`Continuing: $u_4 = 19.76$, $u_5 = 21.81$, $u_6 = 23.45$, $u_7 = 24.76$, $u_8 = 25.81$. So $n = 8$.` }),
    ],
    explanation: "Generate terms from the recurrence; the limit solves L = 0.8L + 6.",
    hints: [t`Use the previous answer each time: $u_{n+1} = 0.8u_n + 6$.`, "Keep calculating terms until one exceeds 25."],
  });

  // Struct 2 (7): u_n = (3n + 2)/(n + 1) = 3 - 1/(n + 1)
  const u = (n) => (3 * n + 2) / (n + 1);
  chk(u(1), 2.5); chk(u(2), 8 / 3); chk(u(3), 11 / 4);
  for (const n of [1, 2, 5, 40]) chk(u(n + 1) - u(n), 1 / ((n + 1) * (n + 2)));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`A sequence has $n$th term $u_n = \dfrac{3n + 2}{n + 1}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find $u_1$, $u_2$ and $u_3$, as fractions or decimals.`, template: "u₁ = {{blank:a}}, u₂ = {{blank:b}}, u₃ = {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: ["5/2"], wrong: "5" }, { id: "b", input: "number", accepted: ["8/3"], tolerance: 0.005, wrong: "8" }, { id: "c", input: "number", accepted: ["11/4"], wrong: "11" }],
        explanation: t`$u_1 = \frac{5}{2}$, $u_2 = \frac{8}{3}$, $u_3 = \frac{11}{4}$.` }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that $u_n = 3 - \dfrac{1}{n + 1}$, and hence explain why the sequence is increasing.`,
        points: [t`M1 shows $3 - \frac{1}{n + 1} = \frac{3(n + 1) - 1}{n + 1} = \frac{3n + 2}{n + 1}$.`, t`A1 explains that $\frac{1}{n + 1}$ decreases as $n$ increases, so $u_n$ increases.`],
        modelAnswer: t`$$
3 - \frac{1}{n + 1} = \frac{3(n + 1) - 1}{n + 1} = \frac{3n + 2}{n + 1} = u_n
$$

As $n$ increases, $\frac{1}{n + 1}$ gets smaller, so a smaller amount is subtracted from 3 and each term is larger than the one before: the sequence is increasing.`,
        explanation: "Writing u_n as a constant minus a shrinking fraction shows both the direction and the limit." }),
      P.num({ label: "(c)", marks: 1, stem: t`State the limit of the sequence.`, value: 3, wrong: [2, 1],
        explanation: t`$\frac{1}{n + 1} \to 0$, so $u_n \to 3$.` }),
      P.manual({ label: "(d)", marks: 1, stem: t`Explain why no term of the sequence is equal to 3.`,
        points: [t`States that $u_n = 3 - \frac{1}{n + 1}$ and $\frac{1}{n + 1} > 0$ for every $n$, so $u_n < 3$.`],
        modelAnswer: t`$3 - u_n = \frac{1}{n + 1}$, which is positive for every positive integer $n$, so every term is less than 3. The terms approach 3 but never reach it.`,
        explanation: "A limit need not be a term of the sequence." }),
    ],
    explanation: t`Rewriting $u_n = 3 - \frac{1}{n + 1}$ shows the sequence increases towards 3 without reaching it.`,
    hints: [t`Write 3 as $\frac{3(n + 1)}{n + 1}$.`, t`What happens to $\frac{1}{n + 1}$ as $n$ grows?`],
  });

  same(rec(-3, (v) => v + 4, 4), [-3, 1, 5, 9]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A sequence is defined by $u_1 = -3$ and $u_{n+1} = u_n + 4$. What is $u_3$?`,
    options: [
      ["5", t`Correct: $u_2 = -3 + 4 = 1$ and $u_3 = 1 + 4 = 5$.`],
      ["1", t`This is $u_2$; one more step is needed.`],
      ["9", t`This is $u_4$: three steps of 4 have been added instead of two.`],
      ["−7", "The rule adds 4 each time; it does not subtract."],
    ],
    answer: "A",
    explanation: t`Apply the rule twice from $u_1$: $-3 \to 1 \to 5$.`,
  });

  // Cards
  b.card("DEFINITION", "Sequence", t`An ordered list of terms $u_1, u_2, u_3, \ldots$; $u_n$ is the $n$th term.`);
  b.card("DEFINITION", "Recurrence relation", t`A rule giving $u_{n+1}$ from $u_n$, with a first term, e.g. $u_{n+1} = 2u_n - 3$, $u_1 = 5$.`);
  b.card("DEFINITION", "Convergent sequence", "The terms get closer and closer to a fixed value, the limit.");
  b.card("DEFINITION", "Divergent sequence", "A sequence that does not converge: it grows without bound or keeps oscillating without settling.");
  b.card("DEFINITION", "Periodic sequence", "The terms repeat in a cycle; the period is the number of terms in one cycle.");
  b.card("DEFINITION", "Oscillating sequence", t`The terms go up and down alternately, e.g. $(-2)^n$ (divergent) or $\left(-\frac{1}{2}\right)^n$ (convergent).`);
  b.card("FORMULA", t`Limit of a convergent recurrence $u_{n+1} = f(u_n)$`, t`Solve $L = f(L)$.`, "Only valid if the sequence actually converges.");
  b.card("CONCEPT", "Limit of an nth-term fraction", t`Divide top and bottom by $n$; terms like $\frac{1}{n}$ tend to 0.`);
  b.card("CONCEPT", "Finding a term of a periodic sequence", t`Find the period $p$; $u_n$ equals the term at position (remainder of $n \div p$), using $u_p$ if the remainder is 0.`);
});
