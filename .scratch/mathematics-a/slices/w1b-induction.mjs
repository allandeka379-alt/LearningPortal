// W1b: amaths.proof.induction (ZIMSEC only)
import { concept, P, t, chk, same, sum, mat } from "../lib.mjs";

const sig = (n, f) => sum(Array.from({ length: n }, (_, i) => f(i + 1)));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, tol = 0.0005, marks) => ({ id, input: "number", accepted: list, tolerance: tol, wrong, ...(marks ? { marks } : {}) });

concept("amaths.proof.induction", { file: "proof/induction", keyPrefix: "proof.induction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is the first step (the basis) of a proof by mathematical induction for a statement about all positive integers n?",
    options: [
      ["Show that the statement is true for n = 1.", "Correct: the basis starts the chain, like the first domino falling."],
      ["Assume that the statement is true for n = k.", "That is the inductive hypothesis, the second step."],
      ["Show that the statement is true for n = k + 1.", "That is the target of the inductive step."],
      ["Check the statement for the first ten values of n.", "Checking cases gives evidence, not a proof; the basis needs only n = 1."],
    ],
    answer: "A",
    explanation: "Basis (n = 1), hypothesis (assume n = k), inductive step (deduce n = k + 1), conclusion.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "In the inductive step of a proof by induction, what are you allowed to assume?",
    options: [
      ["That the statement is true for n = k, for some positive integer k.", "Correct: this is the inductive hypothesis; you then deduce the case n = k + 1."],
      ["That the statement is true for n = k + 1.", "This is what must be proved; assuming it is circular."],
      ["That the statement is true for every positive integer n.", "This is the final conclusion, so it cannot be assumed."],
      ["That the statement is false for n = k + 1.", "That is the start of a proof by contradiction, a different method."],
    ],
    answer: "A",
    explanation: "Assume P(k) and show that P(k + 1) follows.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "If P(1) is true, and P(k) true implies P(k + 1) true for every positive integer k, then P(n) is true for every positive integer n.",
    answer: true,
    explanation: "This is the principle of mathematical induction: P(1) gives P(2), which gives P(3), and so on for ever.",
  });

  for (const n of [1, 2, 3, 6]) chk(sig(n, (r) => r ** 3), (n * n * (n + 1) ** 2) / 4);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A student checks $\displaystyle\sum_{r=1}^{n} r^3 = \frac{n^2(n + 1)^2}{4}$ for $n = 3$. What value do both sides take?`,
    value: 36, wrong: [27, 9],
    explanation: t`LHS $= 1 + 8 + 27 = 36$; RHS $= \frac{9 \times 16}{4} = 36$. A check like this is useful, but it is not a proof.`,
  });

  for (const k of [1, 4, 9]) chk(k * k + (2 * k + 1), (k + 1) ** 2);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`In proving $\displaystyle\sum_{r=1}^{n}(2r - 1) = n^2$ by induction, the hypothesis is $\sum_{r=1}^{k}(2r - 1) = k^2$. What must be added to $k^2$ in the inductive step?`,
    options: [
      [t`$2k + 1$`, t`Correct: the $(k + 1)$th term is $2(k + 1) - 1 = 2k + 1$, and $k^2 + 2k + 1 = (k + 1)^2$.`],
      [t`$2k - 1$`, t`This is the $k$th term, already included in $k^2$.`],
      [t`$(k + 1)^2$`, "This is the target sum, not the next term."],
      [t`$2k + 3$`, t`This is the $(k + 2)$th term.`],
    ],
    answer: "A",
    explanation: t`$\sum_{r=1}^{k+1}(2r - 1) = k^2 + (2k + 1) = (k + 1)^2$, which is the statement for $n = k + 1$.`,
    hints: ["Substitute r = k + 1 into the general term."],
  });

  const u6 = [1]; for (let n = 1; n < 6; n++) u6.push(u6[n - 1] + 2 * n + 1);
  same(u6, [1, 4, 9, 16, 25, 36]);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A sequence has $u_1 = 1$ and $u_{n+1} = u_n + 2n + 1$. Find $u_4$ and $u_5$, and hence conjecture a formula of the form $u_n = n^p$.`,
    template: "u₄ = {{blank:a}}, u₅ = {{blank:b}}, p = {{blank:p}}",
    blanks: [N("a", 16, "10"), N("b", 25, "17"), N("p", 2, "3")],
    explanation: t`$u_2 = 1 + 3 = 4$, $u_3 = 4 + 5 = 9$, $u_4 = 9 + 7 = 16$, $u_5 = 16 + 9 = 25$: the squares, so conjecture $u_n = n^2$. (Proof: $k^2 + 2k + 1 = (k + 1)^2$.)`,
    hints: [t`Use the rule with $n = 1, 2, 3, 4$ in turn.`],
  });

  for (const k of [1, 2, 5]) chk(5 ** (k + 1) + 3 - 5 * (5 ** k + 3), -12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Let $f(n) = 5^n + 3$. Simplify $f(k + 1) - 5f(k)$ to a single number.`,
    value: -12, wrong: [12, 4],
    explanation: t`$5^{k+1} + 3 - 5(5^k + 3) = 5^{k+1} + 3 - 5^{k+1} - 15 = -12$. Since $f(1) = 8$ and $-12$ are both multiples of 4, this is the key step in proving $4 \mid f(n)$.`,
    hints: [t`$5 \times 5^k = 5^{k+1}$.`],
  });
  chk(5 + 3, 8);

  for (const n of [1, 2, 9]) chk(sig(n, (r) => 2 * r - 1), n * n);
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Prove by induction that $\displaystyle\sum_{r=1}^{n}(2r - 1) = n^2$ for all positive integers $n$.`,
    points: [
      t`B1 basis: $n = 1$, LHS $= 1$, RHS $= 1$.`,
      t`M1 assumes $\sum_{r=1}^{k}(2r - 1) = k^2$ and adds the $(k + 1)$th term $2k + 1$.`,
      t`A1 obtains $(k + 1)^2$.`,
      "A1 complete conclusion: true for n = 1 and P(k) ⇒ P(k + 1), so true for all positive integers n.",
    ],
    modelAnswer: t`**Basis.** $n = 1$: LHS $= 2(1) - 1 = 1$, RHS $= 1^2 = 1$. True.

**Hypothesis.** Assume $\sum_{r=1}^{k}(2r - 1) = k^2$.

**Step.**

$$
\sum_{r=1}^{k+1}(2r - 1) = k^2 + \left[2(k + 1) - 1\right] = k^2 + 2k + 1 = (k + 1)^2
$$

which is the statement for $n = k + 1$.

**Conclusion.** The result is true for $n = 1$, and if it is true for $n = k$ it is true for $n = k + 1$; hence by induction it is true for all positive integers $n$.`,
    explanation: "The sum of the first n odd numbers is n².",
    hints: [t`The $(k + 1)$th term is $2(k + 1) - 1$.`],
  });

  for (const n of [1, 2, 8]) chk(sig(n, (r) => r * r), (n * (n + 1) * (2 * n + 1)) / 6);
  for (const k of [1, 3, 7]) chk(2 * k * k + 7 * k + 6, (k + 2) * (2 * k + 3));
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`Prove by induction that $\displaystyle\sum_{r=1}^{n} r^2 = \frac{n(n + 1)(2n + 1)}{6}$ for all positive integers $n$.`,
    points: [
      "B1 basis checked for n = 1 (both sides 1).",
      t`M1 hypothesis stated and $(k + 1)^2$ added.`,
      t`M1 takes out the common factor $\frac{k + 1}{6}$: $\frac{k + 1}{6}\left[k(2k + 1) + 6(k + 1)\right]$.`,
      t`A1 factorises $2k^2 + 7k + 6 = (k + 2)(2k + 3)$ to reach $\frac{(k + 1)(k + 2)(2k + 3)}{6}$.`,
      "A1 full conclusion.",
    ],
    modelAnswer: t`**Basis.** $n = 1$: LHS $= 1$, RHS $= \frac{1 \cdot 2 \cdot 3}{6} = 1$.

**Hypothesis.** Assume $\sum_{r=1}^{k} r^2 = \frac{k(k + 1)(2k + 1)}{6}$.

**Step.**

$$
\sum_{r=1}^{k+1} r^2 = \frac{k(k + 1)(2k + 1)}{6} + (k + 1)^2 = \frac{(k + 1)\left[k(2k + 1) + 6(k + 1)\right]}{6}
$$

$$
= \frac{(k + 1)(2k^2 + 7k + 6)}{6} = \frac{(k + 1)(k + 2)(2k + 3)}{6}
$$

which is the formula with $n = k + 1$, since $2(k + 1) + 1 = 2k + 3$.

**Conclusion.** True for $n = 1$; true for $n = k$ implies true for $n = k + 1$; so true for all positive integers $n$ by induction.`,
    explanation: "Factorising early avoids expanding a cubic.",
    hints: [t`Write the target $\frac{(k + 1)(k + 2)(2k + 3)}{6}$ before you start.`],
  });

  for (let n = 1; n <= 10; n++) chk((3 ** (2 * n) - 1) % 8, 0);
  for (let k = 1; k <= 6; k++) chk(3 ** (2 * k + 2) - 1, 9 * (3 ** (2 * k) - 1) + 8);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`Prove by induction that $3^{2n} - 1$ is divisible by 8 for all positive integers $n$.`,
    points: [
      t`B1 basis: $3^2 - 1 = 8$, divisible by 8.`,
      t`M1 hypothesis: $3^{2k} - 1 = 8m$ for some integer $m$.`,
      t`M1 writes $3^{2k + 2} - 1 = 9 \times 3^{2k} - 1$.`,
      t`A1 substitutes $3^{2k} = 8m + 1$: $9(8m + 1) - 1 = 72m + 8 = 8(9m + 1)$, a multiple of 8.`,
      "A1 full conclusion.",
    ],
    modelAnswer: t`Let $f(n) = 3^{2n} - 1$.

**Basis.** $f(1) = 9 - 1 = 8$, divisible by 8.

**Hypothesis.** Assume $f(k) = 3^{2k} - 1 = 8m$ for some integer $m$, so $3^{2k} = 8m + 1$.

**Step.**

$$
f(k + 1) = 3^{2k + 2} - 1 = 9 \times 3^{2k} - 1 = 9(8m + 1) - 1 = 72m + 8 = 8(9m + 1)
$$

which is divisible by 8 because $9m + 1$ is an integer.

**Conclusion.** True for $n = 1$, and true for $n = k$ implies true for $n = k + 1$, so $3^{2n} - 1$ is divisible by 8 for all positive integers $n$.`,
    explanation: "Write f(k + 1) using f(k), then show the result is 8 × (an integer).",
    hints: [t`$3^{2(k + 1)} = 9 \times 3^{2k}$.`],
  });

  const A11 = [[1, 2], [0, 1]];
  for (const n of [1, 2, 5, 9]) same(mat.pow(A11, n), [[1, 2 * n], [0, 1]]);
  b.proof({
    d: 4, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Given $\mathbf{M} = ${mat.tex(A11)}$, prove by induction that $\mathbf{M}^n = \begin{pmatrix} 1 & 2n \\ 0 & 1 \end{pmatrix}$ for all positive integers $n$.`,
    points: [
      t`B1 basis: $n = 1$ gives $\mathbf{M}$.`,
      t`M1 hypothesis and $\mathbf{M}^{k+1} = \mathbf{M}^k\mathbf{M}$.`,
      t`A1 multiplies to $\begin{pmatrix} 1 & 2 + 2k \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 2(k + 1) \\ 0 & 1 \end{pmatrix}$.`,
      "A1 full conclusion.",
    ],
    modelAnswer: t`**Basis.** $n = 1$: $\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix} = \mathbf{M}$. True.

**Hypothesis.** Assume $\mathbf{M}^k = \begin{pmatrix} 1 & 2k \\ 0 & 1 \end{pmatrix}$.

**Step.**

$$
\mathbf{M}^{k+1} = \mathbf{M}^k\mathbf{M} = \begin{pmatrix} 1 & 2k \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 2 + 2k \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 2(k + 1) \\ 0 & 1 \end{pmatrix}
$$

**Conclusion.** By induction, $\mathbf{M}^n = \begin{pmatrix} 1 & 2n \\ 0 & 1 \end{pmatrix}$ for all positive integers $n$.`,
    explanation: "Multiply the hypothesis by M once more.",
    hints: [t`$\mathbf{M}^{k+1} = \mathbf{M}^k \times \mathbf{M}$.`],
  });

  let u = 5; for (let n = 1; n <= 8; n++) { chk(u, 3 + 2 ** n); u = 2 * u - 3; }
  b.proof({
    d: 5, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`A sequence is defined by $u_1 = 5$ and $u_{n+1} = 2u_n - 3$. Prove by induction that $u_n = 2^n + 3$ for all positive integers $n$.`,
    points: [
      t`B1 basis: $2^1 + 3 = 5 = u_1$.`,
      t`M1 hypothesis $u_k = 2^k + 3$ substituted into the recurrence.`,
      t`A1 $u_{k+1} = 2(2^k + 3) - 3 = 2^{k+1} + 3$.`,
      "A1 full conclusion.",
    ],
    modelAnswer: t`**Basis.** $n = 1$: $2^1 + 3 = 5 = u_1$.

**Hypothesis.** Assume $u_k = 2^k + 3$.

**Step.**

$$
{u_{k+1}} = 2u_k - 3 = 2(2^k + 3) - 3 = 2^{k+1} + 6 - 3 = 2^{k+1} + 3
$$

**Conclusion.** True for $n = 1$, and true for $n = k$ implies true for $n = k + 1$; by induction $u_n = 2^n + 3$ for all positive integers $n$.`,
    explanation: "In recurrence proofs, the rule itself gives the step from k to k + 1.",
    hints: ["Substitute the hypothesis into u(k+1) = 2u(k) − 3."],
  });

  const A13 = [[2, 1], [0, 1]];
  chk(mat.pow(A13, 5)[0][1], 31);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}^n = \begin{pmatrix} 2^n & 2^n - 1 \\ 0 & 1 \end{pmatrix}$ (proved by induction), find the top-right entry of $\begin{pmatrix} 2 & 1 \\ 0 & 1 \end{pmatrix}^5$.`,
    value: 31, wrong: [32, 5],
    explanation: t`$2^5 - 1 = 31$.`,
    hints: ["Substitute n = 5 into the proved formula."],
  });

  for (let k = 1; k <= 5; k++) chk(3 ** (2 * k + 2) - 1, 9 * (3 ** (2 * k) - 1) + 8);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Let $f(n) = 3^{2n} - 1$. Which expression for $f(k + 1)$ is most useful in proving by induction that $f(n)$ is divisible by 8?`,
    options: [
      [t`$9f(k) + 8$`, t`Correct: $3^{2k+2} - 1 = 9 \times 3^{2k} - 1 = 9(3^{2k} - 1) + 8$; both parts are multiples of 8 if $f(k)$ is.`],
      [t`$3f(k) + 2$`, t`$3^{2(k+1)} = 9 \times 3^{2k}$, not $3 \times 3^{2k}$.`],
      [t`$f(k) + 8$`, t`$f(2) = 80$ but $f(1) + 8 = 16$, so this is false.`],
      [t`$9f(k)$`, t`$9f(k) = 9 \times 3^{2k} - 9$, which is 8 less than $f(k + 1)$.`],
    ],
    answer: "A",
    explanation: t`$f(k + 1) = 9f(k) + 8$: if $8 \mid f(k)$ then $8 \mid f(k + 1)$.`,
    hints: [t`Write $3^{2k + 2}$ as $9 \times 3^{2k}$, then add and subtract to make $f(k)$ appear.`],
  });

  chk(40 * 40 + 40 + 41, 41 * 41);
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`Chipo checks that $n^2 + n + 41$ is prime for $n = 1, 2, \ldots, 20$ and claims this proves it is prime for every positive integer $n$. Explain why she is wrong.`,
    points: ["Checking finitely many cases cannot prove a statement about all positive integers; a later case may fail.", t`For example $n = 40$ gives $1600 + 40 + 41 = 1681 = 41^2$, which is not prime.`],
    modelAnswer: "Evidence from cases is not a proof; there are infinitely many n. In fact n = 40 gives 1681 = 41 × 41, so the claim is false.",
    explanation: "A single counter-example disproves a general claim; only a valid proof (such as induction) establishes it.",
    hints: ["Try n = 40."],
  });

  for (const n of [1, 2, 3, 4, 9]) chk(sig(n, (r) => 1 / (r * (r + 1))), n / (n + 1), 1e-12);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Let $S_n = \displaystyle\sum_{r=1}^{n} \frac{1}{r(r + 1)}$. Then $S_1 = \frac{1}{2}$, $S_2 = \frac{2}{3}$ and $S_3 = \frac{3}{4}$. Find $S_4$ and, using the pattern (which can be proved by induction), $S_9$. Give decimals or fractions.`,
    template: "S₄ = {{blank:a}}, S₉ = {{blank:b}}",
    blanks: [FR("a", ["0.8", "4/5"], "0.75"), FR("b", ["0.9", "9/10"], "0.8")],
    explanation: t`$S_4 = \frac{3}{4} + \frac{1}{20} = \frac{4}{5}$. Conjecture $S_n = \frac{n}{n + 1}$, so $S_9 = \frac{9}{10}$.`,
    hints: [t`$S_4 = S_3 + \frac{1}{4 \times 5}$.`],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each stage of an induction proof with what it does.",
    pairs: [
      ["Basis", "Show the statement is true for n = 1."],
      ["Hypothesis", "Assume the statement is true for n = k."],
      ["Inductive step", "Use the assumption to show the statement for n = k + 1."],
      ["Conclusion", "State that the statement is true for all positive integers n by induction."],
    ],
    explanation: "All four stages are needed for a complete proof.",
  });

  // Struct (12): f(n) = 7^n − 3^n divisible by 4
  const f17 = (n) => 7 ** n - 3 ** n;
  chk(f17(1), 4); chk(f17(2), 40);
  for (let k = 1; k <= 8; k++) { chk(f17(k + 1), 7 * f17(k) + 4 * 3 ** k); chk(f17(k) % 4, 0); }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Let $f(n) = 7^n - 3^n$, where $n$ is a positive integer.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $f(1)$ and $f(2)$.`, template: "f(1) = {{blank:a}}, f(2) = {{blank:b}}",
        blanks: [N("a", 4, "10"), N("b", 40, "58")],
        explanation: t`$f(1) = 7 - 3 = 4$; $f(2) = 49 - 9 = 40$.` }),
      P.proof({ label: "(b)", marks: 3, stem: t`Show that $f(k + 1) = 7f(k) + 4 \times 3^k$.`,
        points: [t`M1 $f(k + 1) = 7 \times 7^k - 3 \times 3^k$.`, t`M1 writes $7 \times 7^k = 7(f(k) + 3^k)$.`, t`A1 $7f(k) + 7 \times 3^k - 3 \times 3^k = 7f(k) + 4 \times 3^k$.`],
        modelAnswer: t`$$
f(k + 1) = 7^{k+1} - 3^{k+1} = 7 \cdot 7^k - 3 \cdot 3^k = 7(7^k - 3^k) + 7 \cdot 3^k - 3 \cdot 3^k = 7f(k) + 4 \times 3^k
$$`,
        explanation: "Add and subtract 7 × 3ᵏ to make f(k) appear." }),
      P.proof({ label: "(c)", marks: 5, stem: t`Hence prove by induction that $f(n)$ is divisible by 4 for all positive integers $n$.`,
        points: [
          t`B1 basis: $f(1) = 4$, divisible by 4.`,
          t`M1 hypothesis: $f(k) = 4m$ for some integer $m$.`,
          t`M1 uses (b): $f(k + 1) = 7(4m) + 4 \times 3^k$.`,
          t`A1 $= 4(7m + 3^k)$, a multiple of 4 since $7m + 3^k$ is an integer.`,
          "A1 full conclusion.",
        ],
        modelAnswer: t`**Basis.** $f(1) = 4 = 4 \times 1$.

**Hypothesis.** Assume $f(k) = 4m$ for some integer $m$.

**Step.** By (b),

$$
f(k + 1) = 7f(k) + 4 \times 3^k = 28m + 4 \times 3^k = 4(7m + 3^k)
$$

which is divisible by 4.

**Conclusion.** True for $n = 1$, and true for $n = k$ implies true for $n = k + 1$, so $f(n)$ is divisible by 4 for all positive integers $n$.`,
        explanation: "The identity in (b) splits f(k + 1) into two multiples of 4." }),
      P.num({ label: "(d)", marks: 2, stem: t`State the largest integer that divides $f(n)$ for every positive integer $n$.`, value: 4, wrong: [8, 40],
        explanation: t`Every $f(n)$ is a multiple of 4, and $f(1) = 4$ itself, so no larger integer divides them all.` }),
    ],
    explanation: "Find a recurrence linking f(k + 1) to f(k), then use it in the inductive step.",
    hints: [t`Write $7^{k+1}$ as $7 \times 7^k$ and $7^k$ as $f(k) + 3^k$.`],
  });

  // Struct (13): Σ r·2^(r−1) = (n − 1)2^n + 1
  const s18 = (n) => sig(n, (r) => r * 2 ** (r - 1));
  same([1, 2, 3, 4].map(s18), [1, 5, 17, 49]);
  for (let n = 1; n <= 12; n++) chk(s18(n), (n - 1) * 2 ** n + 1);
  chk(s18(8), 1793);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Let $S_n = \displaystyle\sum_{r=1}^{n} r \times 2^{r-1}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`Find $S_1$, $S_2$, $S_3$ and $S_4$.`, template: "S₁ = {{blank:a}}, S₂ = {{blank:b}}, S₃ = {{blank:c}}, S₄ = {{blank:d}}",
        blanks: [N("a", 1, "2"), N("b", 5, "4"), N("c", 17, "12"), N("d", 49, "32")],
        explanation: t`$1$; $1 + 4 = 5$; $5 + 12 = 17$; $17 + 32 = 49$. These fit $(n - 1)2^n + 1$: $1, 5, 17, 49$.` }),
      P.proof({ label: "(b)", marks: 6, stem: t`Prove by induction that $S_n = (n - 1)2^n + 1$ for all positive integers $n$.`,
        points: [
          t`B1 basis: $S_1 = 1 = 0 \times 2 + 1$.`,
          t`M1 hypothesis $S_k = (k - 1)2^k + 1$.`,
          t`M1 adds the $(k + 1)$th term $(k + 1)2^k$.`,
          t`M1 collects: $2^k\left[(k - 1) + (k + 1)\right] + 1 = 2k \cdot 2^k + 1$.`,
          t`A1 $= k \cdot 2^{k+1} + 1$, the formula with $n = k + 1$.`,
          "A1 full conclusion.",
        ],
        modelAnswer: t`**Basis.** $S_1 = 1 \times 2^0 = 1$ and $(1 - 1)2^1 + 1 = 1$.

**Hypothesis.** Assume $S_k = (k - 1)2^k + 1$.

**Step.**

$$
S_{k+1} = (k - 1)2^k + 1 + (k + 1)2^k = 2^k(k - 1 + k + 1) + 1 = 2k \cdot 2^k + 1 = k \cdot 2^{k+1} + 1
$$

which is $\left((k + 1) - 1\right)2^{k+1} + 1$, the formula for $n = k + 1$.

**Conclusion.** True for $n = 1$, and true for $n = k$ implies true for $n = k + 1$; by induction, $S_n = (n - 1)2^n + 1$ for all positive integers $n$.`,
        explanation: "The (k + 1)th term is (k + 1)·2ᵏ; it combines with (k − 1)·2ᵏ." }),
      P.num({ label: "(c)", marks: 3, stem: t`Find the value of $n$ for which $S_n = 1793$.`, prefix: "n =", value: 8, wrong: [7, 9],
        explanation: t`$(n - 1)2^n = 1792 = 7 \times 256 = 7 \times 2^8$, so $n = 8$.` }),
    ],
    explanation: "Calculate cases, prove the general formula by induction, then use it.",
    hints: [t`The $(k + 1)$th term is $(k + 1) \times 2^k$.`, "Factorise 1792 as (odd number) × (power of 2)."],
  });

  b.card("DEFINITION", "Principle of induction", "If P(1) is true and P(k) ⇒ P(k + 1) for every positive integer k, then P(n) is true for all positive integers n.");
  b.card("CONCEPT", "Four parts of an induction proof", "Basis (n = 1), hypothesis (assume n = k), inductive step (show n = k + 1), conclusion.");
  b.card("CONCEPT", "Induction for sums", t`$S_{k+1} = S_k + u_{k+1}$; substitute the hypothesis for $S_k$, then factorise to the target.`);
  b.card("CONCEPT", "Induction for divisibility", t`Write $f(k + 1)$ in terms of $f(k)$ and show the result is (divisor) × (integer).`);
  b.card("CONCEPT", "Induction for matrix powers", t`$\mathbf{A}^{k+1} = \mathbf{A}^k\mathbf{A}$: multiply the hypothesis by $\mathbf{A}$.`);
  b.card("CONCEPT", "Induction for recurrences", "Substitute the hypothesis for u(k) into the rule that gives u(k+1).");
  b.card("FACT", "Checking cases is not proof", t`$n^2 + n + 41$ is prime for $n = 0$ to $39$ but $40^2 + 40 + 41 = 41^2$.`);
  b.card("CONCEPT", "Write the target first", "Before the inductive step, write P(k + 1) in full so you know what to aim for.");
  b.card("CONCEPT", "Conjecture", "A formula suggested by calculated cases; it must then be proved, e.g. by induction.");
});
