// W1b: amath.modulus.equations (Cambridge only)
import { concept, P, t, chk, same, quad } from "../lib.mjs";

const sat = (f, xs) => xs.forEach((x) => chk(f(x), 0, 1e-9, `solution ${x}`));
const fails = (f, xs) => xs.forEach((x) => { if (Math.abs(f(x)) < 1e-9) throw new Error(`should fail ${x}`); });

concept("amath.modulus.equations", { file: "modulus/equations", keyPrefix: "modulus.equations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find the value of $|3 - 8| - |-2|$.`,
    options: [
      [t`$3$`, t`Correct: $|-5| - |-2| = 5 - 2 = 3$.`],
      [t`$-7$`, t`This ignores both moduli: $-5 - 2$. A modulus is never negative.`],
      [t`$7$`, t`$|-2| = 2$ is subtracted, not added.`],
      [t`$-3$`, t`$|3 - 8| = 5$, not $-5$.`],
    ],
    answer: "A",
    explanation: t`$|3 - 8| = |-5| = 5$ and $|-2| = 2$, so the value is $5 - 2 = 3$.`,
  });

  sat((x) => Math.abs(x - 3) - 5, [-2, 8]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|x - 3| = 5$. Give the solutions in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-2], wrong: "2" },
      { id: "b", input: "number", accepted: [8], wrong: "8" },
    ],
    explanation: t`$x - 3 = 5$ gives $x = 8$; $x - 3 = -5$ gives $x = -2$.`,
  });

  sat((x) => Math.abs(2 * x + 1) - 9, [4, -5]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the positive solution of $|2x + 1| = 9$.`,
    value: 4, prefix: "x =", wrong: [-5, 5],
    explanation: t`$2x + 1 = 9$ gives $x = 4$; $2x + 1 = -9$ gives $x = -5$. The positive solution is $x = 4$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`How many solutions does $|x + 2| = -3$ have?`,
    options: [
      ["none", t`Correct: a modulus is never negative, so it cannot equal $-3$.`],
      ["one", t`$x + 2 = -3$ gives $x = -5$, but $|-5 + 2| = 3$, not $-3$.`],
      ["two", t`Writing $x + 2 = \pm 3$ solves $|x + 2| = 3$, a different equation.`],
      ["infinitely many", "No value of $x$ works at all."],
    ],
    answer: "A",
    explanation: t`$|x + 2| \geq 0$ for every $x$, so it can never equal $-3$. There are no solutions.`,
  });

  sat((x) => Math.abs(3 * x - 2) - Math.abs(x + 6), [-1, 4]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|3x - 2| = |x + 6|$. Give the solutions in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-1], wrong: "2" },
      { id: "b", input: "number", accepted: [4], wrong: "4" },
    ],
    explanation: t`Case 1: $3x - 2 = x + 6$, so $x = 4$. Case 2: $3x - 2 = -(x + 6) = -x - 6$, so $4x = -4$ and $x = -1$. (Squaring: $9x^2 - 12x + 4 = x^2 + 12x + 36$, so $8x^2 - 24x - 32 = 0$, $x^2 - 3x - 4 = 0$, the same roots.)`,
    hints: [t`Either $3x - 2 = x + 6$ or $3x - 2 = -(x + 6)$.`, "Put the second right-hand side in brackets before removing them."],
  });

  sat((x) => Math.abs(x - 2) - (2 * x + 5), [-1]);
  fails((x) => Math.abs(x - 2) - (2 * x + 5), [-7]);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|x - 2| = 2x + 5$.`,
    value: -1, prefix: "x =", wrong: [-7],
    explanation: t`Case 1: $x - 2 = 2x + 5$ gives $x = -7$, but then $2x + 5 = -9 < 0$, so reject it. Case 2: $x - 2 = -(2x + 5)$ gives $3x = -3$, $x = -1$; check: $|-3| = 3 = 2(-1) + 5$. The only solution is $x = -1$.`,
    hints: ["Solve both cases.", "The right-hand side must not be negative: check each answer."],
  });

  sat((x) => Math.abs(x * x - 3 * x) - 4, [-1, 4]);
  same(quad.roots(1, -3, 4), []);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find all the solutions of $|x^2 - 3x| = 4$.`,
    options: [
      [t`$x = -1$ and $x = 4$ only`, t`Correct: $x^2 - 3x - 4 = 0$ gives $-1$ and $4$; $x^2 - 3x + 4 = 0$ has discriminant $-7$, so no roots.`],
      [t`$x = -4$ and $x = 1$ only`, t`These solve $x^2 + 3x - 4 = 0$: the sign of the $3x$ term has been changed.`],
      [t`$x = -1$, $x = 1$, $x = -4$ and $x = 4$`, t`The second case $x^2 - 3x = -4$ has no real roots; $x = 1$ gives $|1 - 3| = 2$, not 4.`],
      [t`$x = 4$ only`, t`$x = -1$ also works: $|1 + 3| = 4$.`],
    ],
    answer: "A",
    explanation: t`Case 1: $x^2 - 3x - 4 = (x - 4)(x + 1) = 0$, so $x = -1$ or $x = 4$. Case 2: $x^2 - 3x + 4 = 0$ has $b^2 - 4ac = 9 - 16 < 0$: no real roots.`,
    hints: ["Solve both quadratics; check the discriminant of the second."],
  });

  const sols8 = [-Math.sqrt(14), -2, 2, Math.sqrt(14)];
  sat((x) => Math.abs(x * x - 9) - 5, sols8);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How many real solutions does $|x^2 - 9| = 5$ have?`,
    value: sols8.length, wrong: [2],
    explanation: t`Case 1: $x^2 - 9 = 5$, so $x^2 = 14$ and $x = \pm\sqrt{14}$. Case 2: $x^2 - 9 = -5$, so $x^2 = 4$ and $x = \pm 2$. Four solutions. (Graphically, the line $y = 5$ is below the top of the reflected arch, which is at height 9, so it meets the graph four times.)`,
    hints: ["Each case gives a quadratic; count the roots of both."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For all real numbers $a$ and $b$, $|a + b| = |a| + |b|$.`,
    answer: false,
    explanation: t`False. It fails when $a$ and $b$ have opposite signs: $|4 + (-6)| = 2$ but $|4| + |-6| = 10$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every real number $x$, $|x|^2 = x^2$.`,
    answer: true,
    explanation: t`True. Squaring removes the sign, so $|x|^2 = x^2$. This is why $|P| = |Q|$ can be solved by squaring both sides: $P^2 = Q^2$.`,
  });

  // |x^2 - 6| = x -> x = 2, 3
  sat((x) => Math.abs(x * x - 6) - x, [2, 3]);
  fails((x) => Math.abs(x * x - 6) - x, [-2, -3]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|x^2 - 6| = x$. Give the solutions in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [2], wrong: "-2" },
      { id: "b", input: "number", accepted: [3], wrong: "-3" },
    ],
    explanation: t`The right-hand side must be non-negative, so $x \geq 0$. Case 1: $x^2 - x - 6 = 0$, $(x - 3)(x + 2) = 0$: keep $x = 3$, reject $x = -2$. Case 2: $x^2 + x - 6 = 0$, $(x + 3)(x - 2) = 0$: keep $x = 2$, reject $x = -3$. Solutions $x = 2$ and $x = 3$.`,
    hints: [t`Since the modulus equals $x$, any solution must satisfy $x \geq 0$.`, "Solve $x^2 - 6 = x$ and $x^2 - 6 = -x$."],
  });

  // |x^2 + 2x - 5| = 3 -> 2, -4, -1 ± √3
  const r12 = quad.roots(1, 2, -2);
  chk(r12[0], -1 - Math.sqrt(3)); chk(r12[1], -1 + Math.sqrt(3));
  sat((x) => Math.abs(x * x + 2 * x - 5) - 3, [-4, 2, ...r12]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The equation $|x^2 + 2x - 5| = 3$ has four solutions. Two are integers $a < b$; the other two are $p \pm \sqrt{q}$, where $p$ and $q$ are integers. Find $a$, $b$, $p$ and $q$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "a", input: "number", accepted: [-4], wrong: "-2" },
      { id: "b", input: "number", accepted: [2], wrong: "4" },
      { id: "p", input: "number", accepted: [-1], wrong: "1" },
      { id: "q", input: "number", accepted: [3], wrong: "12" },
    ],
    explanation: t`Case 1: $x^2 + 2x - 8 = 0$, $(x + 4)(x - 2) = 0$, so $x = -4$ or $x = 2$. Case 2: $x^2 + 2x - 2 = 0$, so $(x + 1)^2 = 3$ and $x = -1 \pm \sqrt{3}$.`,
    hints: ["Write the two cases: the quadratic equals 3 or −3.", "Complete the square on the case that does not factorise."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each equation with its solution set.",
    pairs: [
      [t`$|x - 1| = 4$`, t`$x = -3$ or $x = 5$`],
      [t`$|x + 1| = 4$`, t`$x = -5$ or $x = 3$`],
      [t`$|x - 1| = 0$`, t`$x = 1$ only`],
      [t`$|x + 1| = -4$`, "no solution"],
    ],
    explanation: t`$|x - 1| = 4$: $x - 1 = \pm 4$. $|x + 1| = 4$: $x + 1 = \pm 4$. A modulus equal to 0 gives one solution; a modulus can never equal a negative number.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why the solutions of $|ax + b| = cx + d$ must be checked, but the solutions of $|ax + b| = 7$ need not be.`,
    points: [
      t`A modulus is never negative, so a valid solution needs $cx + d \geq 0$; a case can give an $x$ where $cx + d < 0$, which must be rejected.`,
      t`When the right-hand side is the positive constant 7, both cases $ax + b = \pm 7$ automatically give a modulus of 7, so no root is false.`,
    ],
    modelAnswer: t`Solving $ax + b = -(cx + d)$ can give an $x$ for which $cx + d$ is negative; the modulus would then equal a negative number, which is impossible, so that root is rejected. With $|ax + b| = 7$, any $x$ with $ax + b = 7$ or $ax + b = -7$ really has $|ax + b| = 7$.`,
    explanation: "The check is about the sign of the right-hand side.",
    hints: ["Can a modulus equal a negative number?"],
  });

  // y = |2x - 4| meets y = x at x = 4/3 and x = 4
  sat((x) => Math.abs(2 * x - 4) - x, [4 / 3, 4]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the $x$-coordinates of the points where the graph of $y = |2x - 4|$ meets the line $y = x$.`,
    options: [
      [t`$\frac{4}{3}$ and $4$`, t`Correct: $2x - 4 = x$ gives $4$; $-(2x - 4) = x$ gives $\frac{4}{3}$.`],
      [t`$4$ only`, t`The line also meets the reflected (left) arm of the V: $4 - 2x = x$ gives $x = \frac{4}{3}$.`],
      [t`$-4$ and $\frac{4}{3}$`, t`At $x = -4$, $y = x$ is negative, but $|2x - 4|$ is never negative.`],
      [t`$\frac{4}{3}$ and $-4$`, t`$2x - 4 = x$ gives $x = +4$, not $-4$.`],
    ],
    answer: "A",
    explanation: t`Solve $|2x - 4| = x$ (so $x \geq 0$). Case 1: $2x - 4 = x$, $x = 4$. Case 2: $-(2x - 4) = x$, $4 = 3x$, $x = \frac{4}{3}$. Both are non-negative, so both are valid.`,
    hints: ["Set up $|2x - 4| = x$ and solve both cases."],
  });

  // Struct 1: |2x - 3| = x -> 1, 3 ; |2x - 3| = |x - 6| -> -3, 3; squaring gives 3x^2 = 27
  sat((x) => Math.abs(2 * x - 3) - x, [1, 3]);
  sat((x) => Math.abs(2 * x - 3) - Math.abs(x - 6), [-3, 3]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`This question is about the function $f(x) = |2x - 3|$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Solve $f(x) = x$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-1" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
        explanation: t`$2x - 3 = x$ gives $x = 3$; $2x - 3 = -x$ gives $x = 1$. Both make the right-hand side positive.` }),
      P.proof({ label: "(b)", marks: 3, stem: t`By squaring both sides, show that the equation $f(x) = |x - 6|$ reduces to $x^2 = 9$.`,
        points: [t`M1 writes $(2x - 3)^2 = (x - 6)^2$, justified because both sides are non-negative.`, t`M1 expands both sides correctly: $4x^2 - 12x + 9 = x^2 - 12x + 36$.`, t`A1 simplifies to $3x^2 = 27$, so $x^2 = 9$.`],
        modelAnswer: t`$$
(2x - 3)^2 = (x - 6)^2
$$

$$
4x^2 - 12x + 9 = x^2 - 12x + 36
$$

$$
3x^2 = 27
$$

$$
x^2 = 9
$$`,
        explanation: t`Both sides are moduli, so squaring keeps exactly the same solutions.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Hence solve $f(x) = |x - 6|$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-3], wrong: "3" }, { id: "b", input: "number", accepted: [3], wrong: "9" }],
        explanation: t`$x^2 = 9$ gives $x = \pm 3$. Check: $|{-9}| = |{-9}|$ and $|3| = |-3|$.` }),
    ],
    explanation: "Use cases when one side is linear, and squaring (or cases) when both sides are moduli.",
    hints: [t`For part (a), the right-hand side $x$ must be non-negative.`, t`$(2x - 3)^2 = 4x^2 - 12x + 9$.`],
  });

  // Struct 2: |x^2 - 4x| = 3 -> 2 ± √7, 1, 3; |x^2 - 4x| = 4 has 3 solutions
  const r2 = quad.roots(1, -4, -3);
  chk(r2[0], 2 - Math.sqrt(7));
  sat((x) => Math.abs(x * x - 4 * x) - 3, [...r2, 1, 3]);
  const s4 = [...quad.roots(1, -4, -4), ...quad.roots(1, -4, 4)];
  chk(s4.length, 3);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The graph of $y = |x^2 - 4x|$ is the parabola $y = x^2 - 4x$ with the part below the $x$-axis (between $x = 0$ and $x = 4$) reflected in the $x$-axis.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Two solutions of $|x^2 - 4x| = 3$ come from $x^2 - 4x = 3$. Write them in the form $p \pm \sqrt{q}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [{ id: "p", input: "number", accepted: [2], wrong: "-2" }, { id: "q", input: "number", accepted: [7], wrong: "28" }],
        explanation: t`$x^2 - 4x - 3 = 0$: $(x - 2)^2 = 7$, so $x = 2 \pm \sqrt{7}$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the other two solutions of $|x^2 - 4x| = 3$, in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-1" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
        explanation: t`$x^2 - 4x = -3$: $x^2 - 4x + 3 = (x - 1)(x - 3) = 0$, so $x = 1$ or $x = 3$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`State the number of solutions of $|x^2 - 4x| = 4$.`, value: 3, wrong: [4, 2],
        explanation: t`The reflected arch has its maximum at $(2, 4)$, so $y = 4$ touches the top of the arch once and cuts the outer branches twice ($x = 2 \pm 2\sqrt{2}$): three solutions.` }),
    ],
    explanation: t`Each case gives a quadratic. The reflected arch reaches height 4 at $x = 2$, which decides how many times a horizontal line meets the graph.`,
    hints: [t`Complete the square: $x^2 - 4x = (x - 2)^2 - 4$.`, t`What is the highest point of the reflected arch?`],
  });

  // Cards
  b.card("DEFINITION", t`Modulus $|x|$`, t`The size of $x$ without its sign: $|x| = x$ if $x \geq 0$, $|x| = -x$ if $x < 0$.`);
  b.card("CONCEPT", t`Solving $|ax + b| = c$ with $c > 0$`, t`$ax + b = c$ or $ax + b = -c$.`);
  b.card("FACT", t`$|ax + b| = c$ with $c < 0$`, "No solution: a modulus is never negative.");
  b.card("CONCEPT", t`Solving $|ax + b| = cx + d$`, t`Solve both cases, then reject any root with $cx + d < 0$.`);
  b.card("CONCEPT", t`Solving $|P| = |Q|$`, t`$P = Q$ or $P = -Q$; or square both sides: $P^2 = Q^2$.`);
  b.card("FACT", t`$|x|^2$`, t`$= x^2$ for every real $x$.`);
  b.card("FACT", t`Is $|a + b| = |a| + |b|$ always true?`, t`No: only when $a$ and $b$ have the same sign (or one is 0).`);
  b.card("CONCEPT", t`$|ax^2 + bx + c| = d$`, "Two quadratics (= d and = −d): up to four solutions.");
});
