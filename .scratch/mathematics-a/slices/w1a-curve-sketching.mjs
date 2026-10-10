// W1a: amaths.graphs.curve-sketching (ZIMSEC only: Pure F5, Graphs and coordinate geometry).
import { concept, P, t, chk, same, poly, quad } from "../lib.mjs";

/** Counts the real solutions of g(x) = 0 on [lo, hi] (sign changes on a fine grid, skipping undefined points). */
function countRoots(g, lo = -20, hi = 20, n = 400000) {
  let c = 0;
  let prev = g(lo);
  for (let i = 1; i <= n; i++) {
    const v = g(lo + ((hi - lo) * i) / n);
    if (Number.isFinite(v) && Number.isFinite(prev) && (v === 0 || prev * v < 0)) c++;
    prev = v;
  }
  return c;
}
function scan(pred, lo = -30, hi = 30, step = 0.0005) {
  const out = [];
  let s = null;
  for (let i = 0; ; i++) {
    const x = lo + i * step;
    if (x > hi) break;
    const ok = pred(x);
    if (ok && s === null) s = x;
    if (!ok && s !== null) {
      out.push([s, x - step]);
      s = null;
    }
  }
  if (s !== null) out.push([s, hi]);
  return out.map((iv) => iv.map((v) => Math.round(v * 100) / 100));
}

concept("amaths.graphs.curve-sketching", { file: "graphs/curve-sketching", keyPrefix: "graphs.curve-sketching" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which description fits the graph of $y = \dfrac{4}{x^{2}}$?`,
    options: [
      [t`Two branches, both above the $x$-axis, symmetrical about the $y$-axis`, t`Correct: $x^{2} > 0$, so $y > 0$, and $y$ is the same for $x$ and $-x$.`],
      [t`Two branches, one in the first quadrant and one in the third quadrant`, t`That is the shape of $y = \frac{4}{x}$.`],
      [t`A $\cup$-shape through the origin, symmetrical about the $y$-axis`, t`That is $y = 4x^{2}$; here $x = 0$ is not allowed.`],
      [t`One branch above the $x$-axis, defined only for $x > 0$`, t`Negative $x$ is allowed: $(-x)^{2} = x^{2}$.`],
    ],
    answer: "A",
    explanation: t`$y = \dfrac{4}{x^{2}}$ is positive for every $x \neq 0$, has asymptotes $x = 0$ and $y = 0$, and is symmetrical in the $y$-axis.`,
  });

  chk(poly.eval(poly.mul(poly.mul([1, -2], [1, 1]), [1, 4]), 0), -8);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Where does the graph of $y = (x - 2)(x + 1)(x + 4)$ cross the $y$-axis?`,
    options: [
      [t`$(0, -8)$`, t`Correct: $(-2)(1)(4) = -8$.`],
      [t`$(0, 8)$`, "The sign of −2 has been lost."],
      [t`$(0, 3)$`, "The constants have been added instead of multiplied."],
      [t`$(-8, 0)$`, "The y-intercept lies on the y-axis, so its x-coordinate is 0."],
    ],
    answer: "A",
    explanation: t`Put $x = 0$: $y = (-2)(1)(4) = -8$, so the $y$-intercept is $(0, -8)$.`,
  });

  same(poly.rationalRoots(poly.mul(poly.mul([2, -1], [1, 3]), [1, -5])), [-3, 0.5, 5]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`State the $x$-coordinates where the graph of $y = (2x - 1)(x + 3)(x - 5)$ meets the $x$-axis.`,
    template: "In ascending order: {{blank:a}}, {{blank:b}}, {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [-3], wrong: 3 },
      { id: "b", input: "number", accepted: [0.5], wrong: 1 },
      { id: "c", input: "number", accepted: [5], wrong: -5 },
    ],
    explanation: t`Each factor is zero at a root: $2x - 1 = 0$ gives $x = \frac{1}{2}$; also $x = -3$ and $x = 5$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What happens to the graph of $y = x(x - 4)^{2}$ at $x = 4$?`,
    options: [
      ["It touches the x-axis and turns back.", "Correct: (x − 4)² is a repeated factor."],
      ["It crosses the x-axis.", "Only single factors give crossings."],
      ["It has a vertical asymptote.", "A polynomial has no asymptotes."],
      ["It does not meet the x-axis.", "y = 0 when x = 4."],
    ],
    answer: "A",
    explanation: t`The squared factor $(x - 4)^{2}$ does not change sign at $x = 4$, so the curve touches the axis there (a minimum, here) instead of crossing.`,
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A cubic curve comes down from the top left, touches the x-axis at x = −1, then turns and crosses the x-axis at x = 2, ending at the bottom right. Which could be its equation?",
    options: [
      [t`$y = (x + 1)^{2}(2 - x)$`, t`Correct: repeated root at $-1$, single root at $2$, leading term $-x^{3}$.`],
      [t`$y = (x + 1)^{2}(x - 2)$`, "The leading term is +x³, so it would end at the top right."],
      [t`$y = (x - 1)^{2}(2 - x)$`, "This touches at x = +1, not −1."],
      [t`$y = (x + 1)(x - 2)^{2}$`, "Here the repeated root is at 2, so it would touch at 2 and cross at −1."],
    ],
    answer: "A",
    explanation: t`Touching at $x = -1$ needs $(x + 1)^{2}$; crossing at $x = 2$ needs a single factor; ending at the bottom right needs a negative $x^{3}$ coefficient: $(x + 1)^{2}(2 - x)$.`,
    hints: ["Repeated factor ⇒ touch; single factor ⇒ cross.", "Check the sign of the x³ term."],
  });

  for (const x of [0, 3, -4]) chk((3 * x - 2) / (x + 1), 3 - 5 / (x + 1), 1e-12);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`State the equations of the asymptotes of $y = \dfrac{3x - 2}{x + 1}$.`,
    template: "Vertical: x = {{blank:v}}; horizontal: y = {{blank:h}}",
    blanks: [{ id: "v", input: "number", accepted: [-1], wrong: 1 }, { id: "h", input: "number", accepted: [3], wrong: -2 }],
    explanation: t`$\dfrac{3x - 2}{x + 1} = 3 - \dfrac{5}{x + 1}$. The denominator is zero at $x = -1$; as $x \to \pm\infty$ the fraction tends to 0, so $y \to 3$.`,
    hints: ["Write the function as a constant plus a fraction."],
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find where the graph of $y = \dfrac{3x - 2}{x + 1}$ meets the axes. Give the $x$-intercept to 3 decimal places.`,
    template: "x-intercept: x = {{blank:a}}; y-intercept: y = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [2 / 3], tolerance: 0.001, wrong: -1 },
      { id: "b", input: "number", accepted: [-2], wrong: 2 },
    ],
    explanation: t`$y = 0$ when $3x - 2 = 0$, so $x = \frac{2}{3} \approx 0.667$. At $x = 0$, $y = \frac{-2}{1} = -2$.`,
    hints: ["A fraction is zero when its numerator is zero."],
  });

  chk(countRoots((x) => x ** 3 - 4 * x + 1), 3);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`By sketching $y = x^{3}$ and $y = 4x - 1$ on the same axes, find the number of real roots of $x^{3} - 4x + 1 = 0$.`,
    value: 3, wrong: [1, 2],
    explanation: t`The line $y = 4x - 1$ cuts $y = x^{3}$ three times. Sign changes confirm it: with $f(x) = x^{3} - 4x + 1$, $f(-3) = -14$, $f(-2) = 1$, $f(0) = 1$, $f(1) = -2$, $f(2) = 1$: roots in $(-3, -2)$, $(0, 1)$ and $(1, 2)$.`,
    hints: ["The line has gradient 4 and passes through (0, −1).", "Look for sign changes of x³ − 4x + 1."],
  });

  same(poly.rationalRoots([1, 0, -2, -1]), [-1]);
  chk(countRoots((x) => (x === 0 ? NaN : 1 / x - (x * x - 2))), 3);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`By sketching $y = \dfrac{1}{x}$ and $y = x^{2} - 2$ on the same axes, find the number of real solutions of $\dfrac{1}{x} = x^{2} - 2$.`,
    value: 3, wrong: [2, 1],
    explanation: t`The parabola $y = x^{2} - 2$ crosses the branch of $\frac{1}{x}$ in the first quadrant once and the branch in the third quadrant twice. Algebraically, $x^{3} - 2x - 1 = 0$, i.e. $(x + 1)(x^{2} - x - 1) = 0$, with roots $-1$ and $\frac{1 \pm \sqrt{5}}{2}$ (none is 0): three solutions.`,
    hints: ["Where is the parabola below the x-axis?", "Multiply through by x to check algebraically."],
  });

  chk(countRoots((x) => (x < 0 ? NaN : Math.sqrt(x) + x * x - 2), 0, 20), 1);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`By sketching suitable graphs, find the number of real solutions of $\sqrt{x} = 2 - x^{2}$.`,
    value: 1, wrong: [2, 0],
    explanation: t`$y = \sqrt{x}$ exists only for $x \geq 0$ and increases from $(0, 0)$; $y = 2 - x^{2}$ decreases for $x \geq 0$ from $(0, 2)$. An increasing and a decreasing graph meet at most once, and they do meet (at $x = 1$): one solution.`,
    hints: [t`$\sqrt{x}$ is not defined for $x < 0$.`],
  });

  same(scan((x) => (x + 1) * (x - 2) * (x - 4) < 0), [[-30, -1], [2, 4]]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Use a sketch of $y = (x + 1)(x - 2)(x - 4)$ to solve $(x + 1)(x - 2)(x - 4) < 0$.`,
    template: "x < {{blank:a}} or {{blank:b}} < x < {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [-1], wrong: 1 },
      { id: "b", input: "number", accepted: [2], wrong: -2 },
      { id: "c", input: "number", accepted: [4], wrong: -4 },
    ],
    explanation: t`The positive cubic rises from bottom-left, crosses at $-1$, $2$ and $4$. It is below the axis for $x < -1$ and between $2$ and $4$.`,
    hints: ["A positive cubic starts below the x-axis on the left."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The graph of $y = -2x^{3}$ comes down from the top left and continues to the bottom right.`,
    answer: true,
    explanation: t`True. For large negative $x$, $-2x^{3}$ is large and positive; for large positive $x$, it is large and negative. It is $y = 2x^{3}$ reflected in the $x$-axis.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The graph of $y = \sqrt{x}$ is defined for all real values of $x$.`,
    answer: false,
    explanation: t`False. $\sqrt{x}$ is real only for $x \geq 0$, so the graph starts at the origin and lies only to its right.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each equation with a description of its graph.",
    pairs: [
      [t`$y = 3x^{2}$`, "∪-shape through the origin, symmetrical about the y-axis"],
      [t`$y = \frac{3}{x}$`, "Branches in the 1st and 3rd quadrants, asymptotes on both axes"],
      [t`$y = 3\sqrt{x}$`, "Starts at the origin and rises ever more slowly, x ≥ 0 only"],
      [t`$y = 3x^{3}$`, "Rises from bottom-left to top-right through the origin"],
    ],
    explanation: t`Even powers give $\cup$-shapes, odd powers rise through the origin, $n = -1$ gives two branches with asymptotes, and $n = \frac{1}{2}$ exists only for $x \geq 0$.`,
  });

  chk(poly.eval(poly.mul(poly.mul([1, -1], [1, -1]), [1, 2]), 0), 2);
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, calculator: false,
    stem: t`Describe a sketch of $y = (x - 1)^{2}(x + 2)$, giving all its intercepts and its behaviour at each root.`,
    points: ["Positive cubic: from bottom-left to top-right", "Crosses the x-axis at (−2, 0) and touches it at (1, 0) (a minimum on the axis)", "Meets the y-axis at (0, 2)"],
    modelAnswer: "Leading term +x³, so the curve rises from bottom-left to top-right. It crosses the x-axis at (−2, 0), rises through the y-intercept (0, 2) to a maximum, comes down to touch the x-axis at (1, 0), where it has a minimum, and then rises again.",
    explanation: "Single factor (x + 2): crossing. Repeated factor (x − 1)²: touching. y-intercept (−1)²(2) = 2.",
    hints: ["Which factor is repeated?"],
  });

  const f16 = [1, -4, 1, 6];
  same(poly.rationalRoots(f16), [-1, 2, 3]);
  same(scan((x) => poly.eval(f16, x) >= 0), [[-1, 2], [3, 30]]);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Let $f(x) = x^{3} - 4x^{2} + x + 6$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Given that $f(-1) = 0$, find all the roots of $f(x) = 0$.`,
        template: "In ascending order: {{blank:a}}, {{blank:b}}, {{blank:c}}",
        blanks: [
          { id: "a", input: "number", accepted: [-1], wrong: 1 },
          { id: "b", input: "number", accepted: [2], wrong: -2 },
          { id: "c", input: "number", accepted: [3], wrong: -3 },
        ],
        explanation: t`$f(x) = (x + 1)(x^{2} - 5x + 6) = (x + 1)(x - 2)(x - 3)$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: t`State the $y$-intercept of $y = f(x)$.`,
        template: "(0, {{blank:a}})",
        blanks: [{ id: "a", input: "number", accepted: [6], wrong: -6 }],
        explanation: t`$f(0) = 6$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: t`Use a sketch of $y = f(x)$ to solve $f(x) \geq 0$.`,
        template: "{{blank:a}} ≤ x ≤ {{blank:b}} or x ≥ {{blank:c}}",
        blanks: [
          { id: "a", input: "number", accepted: [-1], wrong: 2 },
          { id: "b", input: "number", accepted: [2], wrong: 3 },
          { id: "c", input: "number", accepted: [3], wrong: 2 },
        ],
        explanation: t`The positive cubic is on or above the axis from $-1$ to $2$ and from $3$ onwards.`,
      }),
    ],
    explanation: t`$f(x) = (x + 1)(x - 2)(x - 3)$: a positive cubic through $(-1, 0)$, $(0, 6)$, $(2, 0)$, $(3, 0)$, so $f(x) \geq 0$ for $-1 \leq x \leq 2$ or $x \geq 3$.`,
    hints: ["Divide by (x + 1) to find the quadratic factor.", "Read the inequality from the sketch."],
  });

  const r17 = quad.roots(1, -3, -3);
  for (const x of r17) chk((x + 3) / (x - 2), x, 1e-9);
  b.struct({
    examStyle: true, d: 5, skill: "ANALYSIS", calculator: true,
    stem: t`The curve $C$ has equation $y = \dfrac{x + 3}{x - 2}$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "State the equations of the asymptotes of C.",
        template: "x = {{blank:v}} and y = {{blank:h}}",
        blanks: [{ id: "v", input: "number", accepted: [2], wrong: -3 }, { id: "h", input: "number", accepted: [1], wrong: 3 }],
        explanation: t`$\dfrac{x + 3}{x - 2} = 1 + \dfrac{5}{x - 2}$: asymptotes $x = 2$ and $y = 1$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`Find the $x$-coordinates of the points where $C$ meets the line $y = x$, to 3 significant figures.`,
        template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
        blanks: [
          { id: "a", input: "number", accepted: [r17[0]], tolerance: 0.0005, wrong: 3 },
          { id: "b", input: "number", accepted: [r17[1]], tolerance: 0.005, wrong: -3 },
        ],
        explanation: t`$x + 3 = x(x - 2) \Rightarrow x^{2} - 3x - 3 = 0 \Rightarrow x = \dfrac{3 \pm \sqrt{21}}{2}$, i.e. $-0.791$ or $3.79$.`,
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: t`How many solutions does $\dfrac{x + 3}{x - 2} = 1$ have?`,
        options: [
          ["None", "Correct: y = 1 is the horizontal asymptote, which the curve never reaches."],
          ["One", t`Solving gives $x + 3 = x - 2$, i.e. $3 = -2$, which is impossible.`],
          ["Two", "A horizontal line meets this curve at most once, and y = 1 not at all."],
          ["Infinitely many", "The equation reduces to a false statement, not an identity."],
        ],
        answer: "A",
        explanation: t`$x + 3 = x - 2$ has no solution: $y = 1$ is the asymptote.`,
      }),
    ],
    explanation: t`$C$ is $y = \frac{5}{x}$ translated by $\begin{pmatrix} 2 \\ 1 \end{pmatrix}$. The line $y = x$ cuts both branches, at $x = \frac{3 \pm \sqrt{21}}{2}$, while the asymptote $y = 1$ is never reached.`,
    hints: ["Write the function as 1 + 5/(x − 2).", "Multiply through by (x − 2) to find intersections."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which description fits the graph of $y = -\sqrt{x}$?`,
    options: [
      [t`Starts at the origin and falls ever more slowly, for $x \geq 0$ only`, t`Correct: the reflection of $y = \sqrt{x}$ in the $x$-axis.`],
      [t`Starts at the origin and rises, for $x \leq 0$ only`, t`That is $y = \sqrt{-x}$, a reflection in the $y$-axis.`],
      ["A ∩-shape through the origin", t`That is $y = -x^{2}$.`],
      ["Falls from top-left to bottom-right through the origin", t`That is $y = -x^{3}$; $\sqrt{x}$ needs $x \geq 0$.`],
    ],
    answer: "A",
    explanation: t`$\sqrt{x} \geq 0$ for $x \geq 0$, so $-\sqrt{x} \leq 0$: the curve starts at $(0, 0)$ and goes down to the right, flattening as it goes.`,
    hints: ["Start from y = √x and apply the minus sign to y."],
  });

  b.card("FACT", t`Shape of $y = kx^{n}$, $n$ even positive, $k > 0$`, t`$\cup$-shape through the origin, symmetrical about the $y$-axis.`);
  b.card("FACT", t`Shape of $y = \frac{k}{x}$, $k > 0$`, t`Two branches in the 1st and 3rd quadrants; asymptotes $x = 0$ and $y = 0$.`);
  b.card("FACT", t`Shape of $y = \frac{k}{x^{2}}$, $k > 0$`, t`Two branches above the $x$-axis, symmetrical about the $y$-axis; asymptotes $x = 0$ and $y = 0$.`);
  b.card("CONCEPT", "Single and repeated roots of a polynomial graph", "A single factor (x − p): the curve crosses at x = p. A repeated factor (x − p)²: the curve touches the axis and turns back.");
  b.card("CONCEPT", "End behaviour of a cubic", t`Leading coefficient positive: bottom-left to top-right. Negative: top-left to bottom-right.`);
  b.card("CONCEPT", t`Asymptotes of $y = \dfrac{ax + b}{cx + d}$`, t`Vertical: $cx + d = 0$. Horizontal: $y = \frac{a}{c}$ (write as constant + fraction).`);
  b.card("CONCEPT", "How does a sketch help solve f(x) = g(x)?", "Sketch y = f(x) and y = g(x); the number of intersections is the number of real solutions, and their x-coordinates locate them.");
  b.card("FACT", "Sketch versus plot", "Sketch: shape and labelled key features, freehand. Plot/draw: accurate points on graph paper.");
});
