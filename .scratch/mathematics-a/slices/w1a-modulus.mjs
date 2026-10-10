// W1a: amaths.algebra.modulus — |ax + b|, equations and inequalities (ZIMSEC Pure; Cambridge P2/P3).
import { concept, P, t, chk, same, quad } from "../lib.mjs";

/** Solution set of pred on [lo, hi] as intervals (approximate endpoints) — used to confirm inequality answers. */
function scan(pred, lo = -30, hi = 30, step = 0.0005) {
  const out = [];
  let start = null;
  for (let i = 0; ; i++) {
    const x = lo + i * step;
    if (x > hi) break;
    const ok = pred(x);
    if (ok && start === null) start = x;
    if (!ok && start !== null) {
      out.push([start, x - step]);
      start = null;
    }
  }
  if (start !== null) out.push([start, hi]);
  return out.map(([a, b]) => [Math.round(a * 1000) / 1000, Math.round(b * 1000) / 1000]);
}
const near = (got, want) => same(got.map((iv) => iv.map((v) => Math.round(v * 100) / 100)), want);

concept("amaths.algebra.modulus", { file: "algebra/modulus", keyPrefix: "algebra.modulus" }, (b) => {
  chk(Math.abs(-3) - Math.abs(5 - 9), -1);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Evaluate $|-3| - |5 - 9|$.`,
    options: [
      [t`$-1$`, t`Correct: $3 - 4 = -1$.`],
      [t`$1$`, t`The modulus applies to each bracket separately; the final subtraction can still be negative: $3 - 4 = -1$.`],
      [t`$7$`, t`$|5 - 9| = 4$, not $-4$; the modulus is never negative.`],
      [t`$-7$`, t`$|-3| = 3$, not $-3$.`],
    ],
    answer: "A",
    explanation: t`$|-3| = 3$ and $|5 - 9| = |-4| = 4$, so the value is $3 - 4 = -1$. A modulus is never negative, but an expression containing moduli can be.`,
  });

  for (const x of [3, -1.5]) chk(Math.abs(4 * x - 3), 9);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|4x - 3| = 9$.`,
    template: "Smaller solution x = {{blank:a}}; larger solution x = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-1.5], wrong: -3 }, { id: "b", input: "number", accepted: [3], wrong: 1.5 }],
    explanation: t`$4x - 3 = 9$ gives $x = 3$; $4x - 3 = -9$ gives $x = -\frac{3}{2}$. Check: $|12 - 3| = 9$ and $|-6 - 3| = 9$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`What are the coordinates of the vertex of the graph of $y = |3x - 6|$?`,
    options: [
      [t`$(2, 0)$`, t`Correct: $3x - 6 = 0$ when $x = 2$, and the vertex lies on the $x$-axis.`],
      [t`$(-2, 0)$`, "Sign error: solve 3x − 6 = 0."],
      [t`$(0, 6)$`, "This is the y-intercept, not the vertex."],
      [t`$(6, 0)$`, "The 3 has been ignored: the vertex is where 3x = 6."],
    ],
    answer: "A",
    explanation: t`The V-shaped graph of $y = |ax + b|$ touches the $x$-axis where $ax + b = 0$. Here $x = 2$, so the vertex is $(2, 0)$; the $y$-intercept is $(0, 6)$.`,
  });

  same(quad.roots(1, 6, 5), [-5, -1]);
  for (const x of [-1, -5]) chk(Math.abs(x - 1), Math.abs(2 * x + 4));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|x - 1| = |2x + 4|$.`,
    template: "Smaller solution x = {{blank:a}}; larger solution x = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-5], wrong: 5 }, { id: "b", input: "number", accepted: [-1], wrong: 1 }],
    explanation: t`Square: $x^{2} - 2x + 1 = 4x^{2} + 16x + 16$, so $3x^{2} + 18x + 15 = 0$, i.e. $x^{2} + 6x + 5 = 0$ and $(x + 5)(x + 1) = 0$. Check $x = -5$: $|-6| = |-6|$; $x = -1$: $|-2| = |2|$.`,
    hints: ["Both sides are moduli, so squaring is safe.", "Or solve x − 1 = 2x + 4 and x − 1 = −(2x + 4)."],
  });

  near(scan((x) => Math.abs(x - 3) < 2), [[1, 5]]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|x - 3| < 2$.`,
    options: [
      [t`$1 < x < 5$`, "Correct: x is within 2 of 3."],
      [t`$x < 5$`, "The lower bound is missing: x must also be greater than 1."],
      [t`$-5 < x < -1$`, "The centre is 3, not −3."],
      [t`$x < 1$ or $x > 5$`, "That is the solution of |x − 3| > 2."],
    ],
    answer: "A",
    explanation: t`$|x - 3| < 2 \iff -2 < x - 3 < 2 \iff 1 < x < 5$.`,
  });

  near(scan((x) => Math.abs(2 * x - 3) > 7), [[-30, -2], [5, 30]]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $|2x - 3| > 7$.`,
    options: [
      [t`$x < -2$ or $x > 5$`, t`Correct: $2x - 3 > 7$ or $2x - 3 < -7$.`],
      [t`$-2 < x < 5$`, "That is the solution of |2x − 3| < 7."],
      [t`$x > 5$`, t`Only one case has been used; $2x - 3 < -7$ also gives solutions.`],
      [t`$x < -5$ or $x > 2$`, "The signs of the critical values are reversed."],
    ],
    answer: "A",
    explanation: t`$2x - 3 > 7$ gives $x > 5$; $2x - 3 < -7$ gives $x < -2$. A "greater than" modulus inequality gives two separate intervals.`,
    hints: ["Think: 2x − 3 is more than 7 away from 0."],
  });

  near(scan((x) => Math.abs(x + 1) <= Math.abs(x - 5)), [[-30, 2]]);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The solution of $|x + 1| \leq |x - 5|$ is $x \leq k$. Find $k$.`,
    value: 2, prefix: "k =", wrong: [3, -2],
    explanation: t`Square: $x^{2} + 2x + 1 \leq x^{2} - 10x + 25$, so $12x \leq 24$ and $x \leq 2$. Geometrically, $x$ is at least as close to $-1$ as to $5$, so it lies on or to the left of the midpoint $2$.`,
    hints: ["Square both sides; the x² terms cancel."],
  });

  same(quad.roots(1, 4, -5), [-5, 1]);
  near(scan((x) => Math.abs(2 * x + 1) > Math.abs(x - 4)), [[-30, -5], [1, 30]]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve the inequality $|2x + 1| > |x - 4|$.`,
    template: "x < {{blank:a}} or x > {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-5], wrong: 1 }, { id: "b", input: "number", accepted: [1], wrong: -5 }],
    explanation: t`Square: $4x^{2} + 4x + 1 > x^{2} - 8x + 16$, so $3x^{2} + 12x - 15 > 0$, i.e. $x^{2} + 4x - 5 > 0$ and $(x + 5)(x - 1) > 0$. A positive quadratic is outside its roots: $x < -5$ or $x > 1$.`,
    hints: ["Square both sides and collect terms on one side.", "Is the quadratic positive between or outside its roots?"],
  });

  // |x − 2| = 2x + 1: x = −3 rejected, x = 1/3 valid
  chk(Math.abs(1 / 3 - 2), 2 / 3 + 1, 1e-12);
  chk(Math.abs(-3 - 2) === 2 * -3 + 1 ? 1 : 0, 0);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|x - 2| = 2x + 1$. Give your answer as an exact fraction.`,
    value: 1 / 3, answer: "1/3", prefix: "x =", wrong: [-3],
    explanation: t`Case $x - 2 = 2x + 1$ gives $x = -3$, but then the right side is $-5 < 0$, so it is rejected. Case $-(x - 2) = 2x + 1$ gives $3x = 1$, $x = \frac{1}{3}$; check: $\left|\frac{1}{3} - 2\right| = \frac{5}{3}$ and $2\left(\frac{1}{3}\right) + 1 = \frac{5}{3}$.`,
    workedSolution: [
      t`1. Case 1: $x - 2 = 2x + 1 \Rightarrow x = -3$. Check: $|{-5}| = 5$ but $2(-3) + 1 = -5$. Reject.`,
      t`2. Case 2: $-(x - 2) = 2x + 1 \Rightarrow -x + 2 = 2x + 1 \Rightarrow x = \frac{1}{3}$.`,
      t`3. Check: $\left|\frac{1}{3} - 2\right| = \frac{5}{3} = 2\left(\frac{1}{3}\right) + 1$. So $x = \frac{1}{3}$ only.`,
    ].join("\n"),
    hints: ["The right side is not a modulus, so check every answer.", "A modulus can never equal a negative number."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$|a + b| = |a| + |b|$ for all real numbers $a$ and $b$.`,
    answer: false,
    explanation: t`False. It fails when $a$ and $b$ have opposite signs: $|3 + (-5)| = 2$ but $|3| + |-5| = 8$. In general $|a + b| \leq |a| + |b|$ (the triangle inequality).`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The equation $|x + 3| = -2$ has exactly one solution.`,
    answer: false,
    explanation: t`False. A modulus is never negative, so $|x + 3| = -2$ has no solutions.`,
  });

  near(scan((x) => Math.abs(x - 1) < 3), [[-2, 4]]);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each inequality with its solution.",
    pairs: [
      [t`$|x| < 3$`, t`$-3 < x < 3$`],
      [t`$|x - 1| < 3$`, t`$-2 < x < 4$`],
      [t`$|x + 1| < 3$`, t`$-4 < x < 2$`],
      [t`$|x - 1| > 3$`, t`$x < -2$ or $x > 4$`],
    ],
    explanation: t`$|x - a| < 3$ means within 3 of $a$: centre 0 gives $(-3, 3)$, centre 1 gives $(-2, 4)$, centre $-1$ gives $(-4, 2)$. "Greater than" gives the two outer intervals.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`For which value of the constant $c$ does the equation $|x - 3| = c$ have exactly one solution?`,
    options: [
      [t`$c = 0$`, t`Correct: the horizontal line $y = 0$ meets the V only at its vertex $(3, 0)$.`],
      [t`$c = 3$`, t`$|x - 3| = 3$ has two solutions, $x = 0$ and $x = 6$.`],
      [t`$c = -3$`, "A negative value of c gives no solutions."],
      [t`$c = 1$`, t`$|x - 3| = 1$ has two solutions, $x = 2$ and $x = 4$.`],
    ],
    answer: "A",
    explanation: t`The line $y = c$ meets the V-shape $y = |x - 3|$ twice when $c > 0$, once (at the vertex) when $c = 0$, and not at all when $c < 0$.`,
    hints: ["Sketch the V and slide a horizontal line up and down."],
  });

  near(scan((x) => x + 2 > Math.abs(2 * x - 2)), [[0, 4]]);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $|2x - 2| < x + 2$.`,
    options: [
      [t`$0 < x < 4$`, t`Correct: $-(x + 2) < 2x - 2 < x + 2$ gives $x > 0$ and $x < 4$.`],
      [t`$x < 4$`, "Only the right-hand inequality has been used."],
      [t`$x < 0$ or $x > 4$`, "That is where the V lies above the line."],
      [t`$-4 < x < 0$`, "Sign errors in both critical values."],
    ],
    answer: "A",
    explanation: t`$|2x - 2| < x + 2 \iff -(x + 2) < 2x - 2 < x + 2$. Right: $x < 4$. Left: $-x - 2 < 2x - 2 \Rightarrow 3x > 0 \Rightarrow x > 0$. So $0 < x < 4$. On a sketch, the line $y = x + 2$ lies above the V between $(0, 2)$ and $(4, 6)$.`,
    hints: ["Write the inequality as a double inequality.", "A sketch of the V and the line shows the answer is one interval."],
  });

  chk(Math.abs(-2 - 3), Math.abs(-2 + 7));
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the $x$-coordinate of the point where the graphs of $y = |x - 3|$ and $y = |x + 7|$ meet.`,
    value: -2, prefix: "x =", wrong: [2, 5],
    explanation: t`$|x - 3| = |x + 7|$: squaring gives $-6x + 9 = 14x + 49$, so $20x = -40$ and $x = -2$. It is the midpoint of $3$ and $-7$, equally far from both.`,
  });

  // |2x − 5| = x + 1 -> x = 4/3 or 6 (both valid); |2x − 5| < x + 1 -> 4/3 < x < 6
  for (const x of [4 / 3, 6]) chk(Math.abs(2 * x - 5), x + 1, 1e-12);
  near(scan((x) => Math.abs(2 * x - 5) < x + 1), [[1.33, 6]]);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $y = |2x - 5|$ and the line $y = x + 1$ are drawn on the same axes.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`State the coordinates of the points where $y = |2x - 5|$ meets the axes.`,
        template: "Vertex on the x-axis at x = {{blank:v}}; y-intercept at y = {{blank:c}}",
        blanks: [{ id: "v", input: "number", accepted: [2.5], wrong: -2.5 }, { id: "c", input: "number", accepted: [5], wrong: -5 }],
        explanation: t`$2x - 5 = 0$ at $x = 2.5$, so the vertex is $(2.5, 0)$. At $x = 0$, $y = |-5| = 5$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`Solve $|2x - 5| = x + 1$. Give the smaller answer to 3 decimal places.`,
        template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [4 / 3], tolerance: 0.001, wrong: 4 }, { id: "b", input: "number", accepted: [6], wrong: 2 }],
        explanation: t`$2x - 5 = x + 1$ gives $x = 6$. $-(2x - 5) = x + 1$ gives $3x = 4$, $x = \frac{4}{3} \approx 1.333$. Both are valid because $x + 1 > 0$ for each.`,
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: t`Hence write down the solution of $|2x - 5| < x + 1$.`,
        options: [
          [t`$\frac{4}{3} < x < 6$`, "Correct: the line is above the V between the intersections."],
          [t`$x < \frac{4}{3}$ or $x > 6$`, "There the V is above the line."],
          [t`$x < 6$`, t`For $x < \frac{4}{3}$ the V is above the line.`],
          [t`$2.5 < x < 6$`, "The vertex is not a boundary of the solution set."],
        ],
        answer: "A",
        explanation: t`Between $x = \frac{4}{3}$ and $x = 6$ the line lies above the V, so $\frac{4}{3} < x < 6$.`,
      }),
    ],
    explanation: t`The V has vertex $(2.5, 0)$ and $y$-intercept $5$; the line cuts both arms, at $x = \frac{4}{3}$ and $x = 6$, and lies above the V between them.`,
    hints: ["Treat the two arms of the V separately.", "Use the sketch to read off the inequality."],
  });

  b.struct({
    examStyle: true, d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A mill near Chinhoyi fills bags of maize-meal. A bag of mass $m$ kg is accepted if $|m - 10| \leq 0.15$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "State the least and greatest acceptable masses.",
        template: "Least mass {{blank:a}} kg; greatest mass {{blank:b}} kg",
        blanks: [{ id: "a", input: "number", accepted: [9.85], wrong: 9.15 }, { id: "b", input: "number", accepted: [10.15], wrong: 10.85 }],
        explanation: t`$-0.15 \leq m - 10 \leq 0.15$, so $9.85 \leq m \leq 10.15$.`,
      }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Which bag is rejected?",
        options: [
          ["A bag of 9.82 kg", "Correct: |9.82 − 10| = 0.18 > 0.15."],
          ["A bag of 10.15 kg", "|10.15 − 10| = 0.15, which is allowed (≤)."],
          ["A bag of 9.90 kg", "|9.90 − 10| = 0.10 ≤ 0.15."],
          ["A bag of 10.06 kg", "|10.06 − 10| = 0.06 ≤ 0.15."],
        ],
        answer: "A",
        explanation: "Only 9.82 kg is more than 0.15 kg from 10 kg.",
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: "The tolerance is changed so that a bag must be within 2% of 10 kg. Which inequality describes the accepted bags?",
        options: [
          [t`$|m - 10| \leq 0.2$`, "Correct: 2% of 10 kg is 0.2 kg."],
          [t`$|m - 10| \leq 2$`, "2 kg is 20% of 10 kg."],
          [t`$|m - 0.2| \leq 10$`, "The centre and the tolerance have been swapped."],
          [t`$|m - 10| \geq 0.2$`, "This describes the rejected bags."],
        ],
        answer: "A",
        explanation: t`2% of 10 kg is 0.2 kg, so the condition is $|m - 10| \leq 0.2$.`,
      }),
    ],
    explanation: t`$|m - 10| \leq 0.15$ means $m$ is within 0.15 kg of 10 kg: $9.85 \leq m \leq 10.15$.`,
    hints: ["|m − a| ≤ b means a − b ≤ m ≤ a + b."],
  });

  chk(Math.abs(1 - 4), Math.abs(1 + 2));
  b.proof({
    d: 3, skill: "ANALYSIS", marks: 3, calculator: false,
    stem: t`Show that the equation $|x - 4| = |x + 2|$ has exactly one solution, and find it.`,
    points: [
      t`M1 squares both sides (valid as both are non-negative): $x^{2} - 8x + 16 = x^{2} + 4x + 4$`,
      t`A1 the $x^{2}$ terms cancel leaving the linear equation $12x = 12$, so exactly one solution`,
      t`A1 $x = 1$, checked: $|1 - 4| = 3 = |1 + 2|$`,
    ],
    modelAnswer: [
      t`Both sides are non-negative, so squaring gives an equivalent equation:`,
      "$$",
      t`x^{2} - 8x + 16 = x^{2} + 4x + 4`,
      "$$",
      "$$",
      t`-12x = -12 \quad\Rightarrow\quad x = 1`,
      "$$",
      t`The $x^{2}$ terms cancel, so the equation is linear and has exactly one solution, $x = 1$. Check: $|1 - 4| = 3$ and $|1 + 2| = 3$. (Geometrically, $x = 1$ is the point midway between $4$ and $-2$.)`,
    ].join("\n"),
    explanation: t`When the two linear expressions have equal and opposite coefficients of $x$ in size (here both 1), squaring cancels the $x^{2}$ terms, leaving one solution: the midpoint.`,
    hints: ["Square both sides and simplify."],
  });

  b.card("DEFINITION", "Modulus of x", t`$|x| = x$ if $x \geq 0$ and $|x| = -x$ if $x < 0$; it is the distance of $x$ from 0.`);
  b.card("FACT", t`Shape and key points of $y = |ax + b|$`, t`A V shape with vertex $\left(-\frac{b}{a}, 0\right)$, $y$-intercept $|b|$, arms of gradient $\pm a$.`);
  b.card("FORMULA", t`$|a| = |b|$ is equivalent to …`, t`$a^{2} = b^{2}$, i.e. $a = b$ or $a = -b$.`);
  b.card("FORMULA", t`$|x - a| < b$ (with $b > 0$)`, t`$a - b < x < a + b$: one interval, centre $a$.`);
  b.card("FORMULA", t`$|x - a| > b$ (with $b > 0$)`, t`$x < a - b$ or $x > a + b$: two separate intervals.`);
  b.card("CONCEPT", "When is it safe to square a modulus equation?", "When both sides are non-negative (e.g. a modulus on each side). Otherwise use cases and check each answer.");
  b.card("CONCEPT", "How do you solve |2x − 1| < x + 4?", t`Write $-(x + 4) < 2x - 1 < x + 4$ and solve both parts, or sketch the V and the line and read off where the line is above.`);
  b.card("FACT", "Triangle inequality", t`$|a + b| \leq |a| + |b|$, with equality when $a$ and $b$ have the same sign (or one is 0).`);
});
