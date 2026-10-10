// W1a: amaths.quadratics.completing-square-discriminant (ZIMSEC Pure F5; Cambridge P1 1.1).
import { concept, P, t, chk, same, quad } from "../lib.mjs";

concept("amaths.quadratics.completing-square-discriminant", { file: "quadratics/completing-square-discriminant", keyPrefix: "quadratics.completing-square-discriminant" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The equation $ax^{2} + bx + c = 0$ has no real roots exactly when`,
    options: [
      [t`$b^{2} - 4ac < 0$`, "Correct: the square root in the quadratic formula would be of a negative number."],
      [t`$b^{2} - 4ac = 0$`, "That gives one repeated real root."],
      [t`$b^{2} - 4ac > 0$`, "That gives two distinct real roots."],
      [t`$b^{2} - 4ac \leq 0$`, "This includes the case of equal roots, which are real."],
    ],
    answer: "A",
    explanation: t`$b^{2} - 4ac > 0$: two distinct real roots; $= 0$: equal roots; $< 0$: no real roots.`,
  });

  same(quad.completeSquare(1, 8, -3), { a: 1, p: 4, q: -19, vertex: [-4, -19] });
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Express $x^{2} + 8x - 3$ in the form $(x + p)^{2} + q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [{ id: "p", input: "number", accepted: [4], wrong: 8 }, { id: "q", input: "number", accepted: [-19], wrong: 13 }],
    explanation: t`Half of 8 is 4: $x^{2} + 8x = (x + 4)^{2} - 16$, so $x^{2} + 8x - 3 = (x + 4)^{2} - 19$.`,
  });

  same(quad.completeSquare(3, 12, 5), { a: 3, p: 2, q: -7, vertex: [-2, -7] });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $3x^{2} + 12x + 5$ in the form $a(x + p)^{2} + q$.`,
    template: "a = {{blank:a}}, p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: 3 },
      { id: "p", input: "number", accepted: [2], wrong: 6 },
      { id: "q", input: "number", accepted: [-7], wrong: 1 },
    ],
    explanation: t`$3(x^{2} + 4x) + 5 = 3\left[(x + 2)^{2} - 4\right] + 5 = 3(x + 2)^{2} - 12 + 5 = 3(x + 2)^{2} - 7$. (Writing $q = 1$ forgets to multiply the $-4$ by 3.)`,
    hints: ["Take out the factor 3 from the x² and x terms first.", "Multiply the −4 inside the bracket by 3."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`Which statement describes the graph of $y = (x - 5)^{2} + 2$?`,
    options: [
      [t`It has a minimum point at $(5, 2)$.`, "Correct: the square is least (zero) when x = 5."],
      [t`It has a minimum point at $(-5, 2)$.`, "The bracket is zero when x = +5."],
      [t`It has a maximum point at $(5, 2)$.`, "The coefficient of the square is positive, so the vertex is a minimum."],
      [t`It has a minimum point at $(2, 5)$.`, "The coordinates are the wrong way round."],
    ],
    answer: "A",
    explanation: t`$(x - 5)^{2} \geq 0$, so $y \geq 2$, with equality at $x = 5$. The vertex is the minimum point $(5, 2)$.`,
  });

  chk(quad.disc(2, -5, 4), -7);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the value of the discriminant of $2x^{2} - 5x + 4$.`,
    value: -7, wrong: [57, 7],
    explanation: t`$b^{2} - 4ac = (-5)^{2} - 4(2)(4) = 25 - 32 = -7$. It is negative, so $2x^{2} - 5x + 4 = 0$ has no real roots.`,
  });

  chk(quad.disc(9, -12, 4), 0);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`How many real roots does $9x^{2} - 12x + 4 = 0$ have?`,
    options: [
      ["One repeated root", t`Correct: $144 - 144 = 0$; in fact $9x^{2} - 12x + 4 = (3x - 2)^{2}$.`],
      ["Two distinct roots", "That needs a positive discriminant; here it is 0."],
      ["No real roots", "That needs a negative discriminant; here it is 0."],
      ["Three roots", "A quadratic equation has at most two roots."],
    ],
    answer: "A",
    explanation: t`$b^{2} - 4ac = 144 - 4(9)(4) = 0$, so there is one repeated root, $x = \frac{2}{3}$.`,
  });

  same(quad.completeSquare(-1, 6, 7).vertex, [3, 16]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the greatest value of $7 + 6x - x^{2}$.`,
    value: 16, wrong: [7, 3],
    explanation: t`$7 + 6x - x^{2} = 7 - (x^{2} - 6x) = 7 - \left[(x - 3)^{2} - 9\right] = 16 - (x - 3)^{2}$. The greatest value is $16$, when $x = 3$.`,
    hints: ["Complete the square on −x² + 6x.", "A square subtracted from 16 is largest when the square is 0."],
  });

  same(quad.completeSquare(1, -10, 30).vertex, [5, 5]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = x^{2} - 10x + 30$, $x \in \mathbb{R}$.`,
    template: "f(x) ≥ {{blank:a}}",
    blanks: [{ id: "a", input: "number", accepted: [5], wrong: 30 }],
    explanation: t`$f(x) = (x - 5)^{2} + 5$, and $(x - 5)^{2} \geq 0$, so $f(x) \geq 5$.`,
    hints: ["Complete the square; the least value of the function is q."],
  });

  for (const k of [6, -6]) chk(quad.disc(1, k, 9), 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the values of $k$ for which $x^{2} + kx + 9 = 0$ has equal roots.`,
    template: "k = {{blank:a}} or k = {{blank:b}} (negative value first)",
    blanks: [{ id: "a", input: "number", accepted: [-6], wrong: -3 }, { id: "b", input: "number", accepted: [6], wrong: 3 }],
    explanation: t`$k^{2} - 4(1)(9) = 0$, so $k^{2} = 36$ and $k = \pm 6$. (Then the equation is $(x \pm 3)^{2} = 0$.)`,
    hints: ["Equal roots: b² − 4ac = 0."],
  });

  chk(quad.disc(2, 4, 1.9) > 0 ? 1 : 0, 1);
  chk(quad.disc(2, 4, 2), 0);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the set of values of $k$ for which $2x^{2} + 4x + k = 0$ has two distinct real roots.`,
    options: [
      [t`$k < 2$`, t`Correct: $16 - 8k > 0$ gives $k < 2$.`],
      [t`$k > 2$`, "The inequality has been reversed when dividing by −8."],
      [t`$k \leq 2$`, "k = 2 gives equal roots, not two distinct roots."],
      [t`$k < 8$`, t`The factor $4a = 8$ has been left out: $b^{2} - 4ac = 16 - 8k$.`],
    ],
    answer: "A",
    explanation: t`$b^{2} - 4ac = 16 - 8k > 0 \iff 8k < 16 \iff k < 2$.`,
    hints: ["Two distinct roots: b² − 4ac > 0."],
  });

  for (const k of [-4.9, 0, 2.9]) chk(quad.disc(1, k + 1, 4) < 0 ? 1 : 0, 1);
  for (const k of [-5, 3]) chk(quad.disc(1, k + 1, 4), 0);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the set of values of $k$ for which $x^{2} + (k + 1)x + 4 = 0$ has no real roots.`,
    template: "{{blank:a}} < k < {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-5], wrong: -3 }, { id: "b", input: "number", accepted: [3], wrong: 5 }],
    explanation: t`$(k + 1)^{2} - 16 < 0$, so $(k + 1 - 4)(k + 1 + 4) < 0$, i.e. $(k - 3)(k + 5) < 0$. A quadratic in $k$ is negative between its roots: $-5 < k < 3$.`,
    hints: ["No real roots: b² − 4ac < 0.", "Solve the quadratic inequality in k with a sketch."],
  });

  // y = 2x + c tangent to y = x² + 4x + 7 -> c = 6 at (−1, 4)
  chk(quad.disc(1, 2, 7 - 6), 0);
  same(quad.roots(1, 2, 1), [-1]);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The line $y = 2x + c$ is a tangent to the curve $y = x^{2} + 4x + 7$. Find the value of $c$.`,
    value: 6, prefix: "c =", wrong: [7, 8],
    explanation: t`$x^{2} + 4x + 7 = 2x + c$ gives $x^{2} + 2x + (7 - c) = 0$. Tangent: $4 - 4(7 - c) = 0$, so $7 - c = 1$ and $c = 6$. The point of contact is $x = -1$, $y = 4$.`,
    hints: ["Substitute the line into the curve.", "A tangent gives equal roots."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $a > 0$, the graph of $y = a(x + p)^{2} + q$ has a maximum point at $(-p, q)$.`,
    answer: false,
    explanation: t`False. With $a > 0$ the parabola opens upwards ($\cup$), so $(-p, q)$ is a **minimum** point.`,
  });

  chk(quad.disc(1, 2, 5), -16);
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`$x^{2} + 2x + 5 > 0$ for every real value of $x$.`,
    answer: true,
    explanation: t`True. $x^{2} + 2x + 5 = (x + 1)^{2} + 4 \geq 4 > 0$. Equivalently the discriminant is $4 - 20 = -16 < 0$ and the coefficient of $x^{2}$ is positive, so the graph lies entirely above the $x$-axis.`,
    hints: ["Complete the square."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Match each fact about $y = x^{2} + bx + c$ with a description of its graph.`,
    pairs: [
      [t`$b^{2} - 4c > 0$`, t`crosses the $x$-axis at two points`],
      [t`$b^{2} - 4c = 0$`, t`touches the $x$-axis at its vertex`],
      [t`$b^{2} - 4c < 0$`, t`lies entirely above the $x$-axis`],
      [t`$c = 0$`, "passes through the origin"],
    ],
    explanation: t`The discriminant counts the $x$-intercepts (with $a = 1 > 0$, a negative discriminant puts the whole graph above the axis). The $y$-intercept is $c$, so $c = 0$ means the graph passes through $(0, 0)$.`,
  });

  for (const k of [-3, -1, 1, 5]) chk(quad.disc(k, k + 2, 1), k * k + 4);
  b.proof({
    d: 4, skill: "ANALYSIS", marks: 3, calculator: false,
    stem: t`Show that the equation $kx^{2} + (k + 2)x + 1 = 0$, where $k$ is a non-zero constant, has two distinct real roots for every value of $k$.`,
    points: [
      t`M1 writes the discriminant $(k + 2)^{2} - 4k$`,
      t`A1 simplifies to $k^{2} + 4$`,
      t`A1 argues $k^{2} \geq 0$ so $k^{2} + 4 \geq 4 > 0$, hence two distinct real roots`,
    ],
    modelAnswer: [
      "$$",
      t`b^{2} - 4ac = (k + 2)^{2} - 4(k)(1) = k^{2} + 4k + 4 - 4k = k^{2} + 4`,
      "$$",
      t`Since $k^{2} \geq 0$ for all real $k$, $k^{2} + 4 \geq 4 > 0$. The discriminant is always positive, so the equation has two distinct real roots for every non-zero $k$ (for $k = 0$ it is not a quadratic).`,
    ].join("\n"),
    explanation: t`The $4k$ terms cancel, leaving $k^{2} + 4$, which is always positive.`,
    hints: ["Write down b² − 4ac in terms of k and simplify."],
  });

  same(quad.completeSquare(2, 8, 3), { a: 2, p: 2, q: -5, vertex: [-2, -5] });
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Let $f(x) = 2x^{2} + 8x + 3$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Express $f(x)$ in the form $a(x + p)^{2} + q$.`,
        template: "a = {{blank:a}}, p = {{blank:p}}, q = {{blank:q}}",
        blanks: [
          { id: "a", input: "number", accepted: [2], wrong: 2 },
          { id: "p", input: "number", accepted: [2], wrong: 4 },
          { id: "q", input: "number", accepted: [-5], wrong: -1 },
        ],
        explanation: t`$2(x^{2} + 4x) + 3 = 2\left[(x + 2)^{2} - 4\right] + 3 = 2(x + 2)^{2} - 5$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: "State the coordinates of the vertex of y = f(x).",
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [-2], wrong: 2 }, { id: "y", input: "number", accepted: [-5], wrong: 5 }],
        explanation: t`From $2(x + 2)^{2} - 5$: vertex $(-2, -5)$, a minimum.`,
      }),
      P.fib({
        label: "(c)", marks: 1, stem: t`Find the range of $f(x)$ for the domain $x \geq 0$.`,
        template: "f(x) ≥ {{blank:a}}",
        blanks: [{ id: "a", input: "number", accepted: [3], wrong: -5 }],
        explanation: t`The vertex is at $x = -2$, outside the domain; $f$ is increasing for $x \geq -2$, so the least value on $x \geq 0$ is $f(0) = 3$.`,
      }),
      P.mcq({
        label: "(d)", marks: 1, stem: t`For which values of $k$ does $f(x) = k$ (with $x \in \mathbb{R}$) have no real solutions?`,
        options: [
          [t`$k < -5$`, "Correct: the horizontal line y = k lies below the minimum point."],
          [t`$k > -5$`, "Then the line cuts the curve twice."],
          [t`$k < 3$`, "3 is the y-intercept, not the least value."],
          [t`$k = -5$`, "Then the line touches the curve at the vertex: one solution."],
        ],
        answer: "A",
        explanation: t`The least value of $f(x)$ is $-5$, so $f(x) = k$ has no solutions when $k < -5$.`,
      }),
    ],
    explanation: t`$f(x) = 2(x + 2)^{2} - 5$: vertex $(-2, -5)$. On $x \geq 0$ the range is $f(x) \geq 3$; over all reals it is $f(x) \geq -5$, so $f(x) = k$ has no solution for $k < -5$.`,
    hints: ["Take out the factor 2 before completing the square.", "Where is the vertex compared with the domain x ≥ 0?"],
  });

  for (const m of [3, -5]) chk(quad.disc(1, -(1 + m), 4), 0);
  same(quad.roots(1, -4, 4), [2]);
  chk(3 * 2 - 1, 2 * 2 - 2 + 3);
  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The line $y = mx - 1$ and the curve $y = x^{2} - x + 3$ are given.`,
    parts: [
      P.proof({
        label: "(a)", marks: 1, stem: t`Show that the $x$-coordinates of any points of intersection satisfy $x^{2} - (m + 1)x + 4 = 0$.`,
        points: [t`B1 equates $x^{2} - x + 3 = mx - 1$ and rearranges to the given equation`],
        modelAnswer: t`At an intersection $x^{2} - x + 3 = mx - 1$, so $x^{2} - x - mx + 4 = 0$, i.e. $x^{2} - (m + 1)x + 4 = 0$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Find the values of m for which the line is a tangent to the curve.",
        template: "m = {{blank:a}} or m = {{blank:b}} (negative value first)",
        blanks: [{ id: "a", input: "number", accepted: [-5], wrong: -3 }, { id: "b", input: "number", accepted: [3], wrong: 5 }],
        explanation: t`$(m + 1)^{2} - 16 = 0$, so $m + 1 = \pm 4$, giving $m = 3$ or $m = -5$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "For the positive value of m, find the coordinates of the point of contact.",
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: -2 }, { id: "y", input: "number", accepted: [5], wrong: 9 }],
        explanation: t`With $m = 3$: $x^{2} - 4x + 4 = 0$, so $(x - 2)^{2} = 0$ and $x = 2$; $y = 3(2) - 1 = 5$.`,
      }),
    ],
    explanation: t`Tangency means equal roots: $(m + 1)^{2} = 16$, so $m = 3$ or $-5$. With $m = 3$ the repeated root is $x = 2$, giving the point $(2, 5)$, which also lies on the curve ($4 - 2 + 3 = 5$).`,
    hints: ["Equate the line and the curve.", "Tangent ⇔ discriminant = 0."],
  });

  same(quad.completeSquare(-2, 8, -3), { a: -2, p: -2, q: 5, vertex: [2, 5] });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $-2x^{2} + 8x - 3$ in completed-square form.`,
    options: [
      [t`$5 - 2(x - 2)^{2}$`, t`Correct: $-2\left[(x - 2)^{2} - 4\right] - 3 = -2(x - 2)^{2} + 8 - 3$.`],
      [t`$-1 - 2(x - 2)^{2}$`, "The −4 inside the bracket has not been multiplied by −2."],
      [t`$5 - 2(x + 2)^{2}$`, t`The sign inside the bracket is wrong: $x^{2} - 4x = (x - 2)^{2} - 4$.`],
      [t`$13 - 2(x - 2)^{2}$`, "−2 × (−4) is +8, so the constant is 8 − 3 = 5."],
    ],
    answer: "A",
    explanation: t`$-2x^{2} + 8x - 3 = -2(x^{2} - 4x) - 3 = -2\left[(x - 2)^{2} - 4\right] - 3 = 5 - 2(x - 2)^{2}$, with maximum point $(2, 5)$.`,
    hints: ["Take out −2 from the first two terms."],
  });

  b.card("FORMULA", "Completed-square form", t`$ax^{2} + bx + c = a\left(x + \frac{b}{2a}\right)^{2} + c - \frac{b^{2}}{4a}$`);
  b.card("CONCEPT", t`Vertex of $y = a(x + p)^{2} + q$`, t`$(-p, q)$: a minimum if $a > 0$, a maximum if $a < 0$; line of symmetry $x = -p$.`);
  b.card("FORMULA", "Discriminant conditions", t`$b^{2} - 4ac > 0$: two distinct real roots; $= 0$: equal roots; $< 0$: no real roots.`);
  b.card("CONCEPT", "Condition for real roots (not necessarily distinct)", t`$b^{2} - 4ac \geq 0$.`);
  b.card("CONCEPT", "How do you decide whether a line meets a curve?", "Substitute the line into the curve to get a quadratic; its discriminant > 0 (cuts twice), = 0 (tangent), < 0 (misses).");
  b.card("CONCEPT", "How do you show a quadratic expression is always positive?", t`Complete the square to get $a(x + p)^{2} + q$ with $a > 0$ and $q > 0$ (or show $a > 0$ and $b^{2} - 4ac < 0$).`);
  b.card("FACT", t`Range of $f(x) = a(x + p)^{2} + q$ with $a > 0$, $x \in \mathbb{R}$`, t`$f(x) \geq q$.`);
  b.card("CONCEPT", t`Solving $(k - 3)(k + 5) < 0$`, t`Negative between the roots: $-5 < k < 3$. (Positive outside: $k < -5$ or $k > 3$.)`);
});
