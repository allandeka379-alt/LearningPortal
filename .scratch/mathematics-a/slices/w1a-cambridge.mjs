// W1a: Cambridge 9709 exam-format items (in the style of; never official).
// C1s × 3 (Paper 1, 6 marks), C1l × 3 (Paper 1, 9 marks), C2s × 2 (Paper 2, 7 marks), C2l × 1 (Paper 2, 11 marks),
// C3s × 1 (Paper 3, 6 marks, partial fractions).
import { concept, P, t, chk, same, quad, poly, CAM } from "../lib.mjs";

const A = (k) => `amaths.${k}`;
const nb = (id, v, w, tolerance) => (tolerance === undefined ? { id, input: "number", accepted: [v], wrong: w } : { id, input: "number", accepted: [v], wrong: w, tolerance });
const ident = (f, g, label) => {
  for (const x of [0.37, 2.9, -4.3, 5.6, 7.1]) chk(f(x), g(x), 1e-9, label);
};
const L = Math.log;

concept(A("quadratics.completing-square-discriminant"), { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C1s (6): completed square and a tangent
  same(quad.completeSquare(3, -12, 7), { a: 3, p: -2, q: -5, vertex: [2, -5] });
  for (const k of [-6, -18]) chk(quad.disc(3, -(12 + k), 3), 0);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 540,
    concepts: [A("quadratics.completing-square-discriminant")],
    stem: t`The curve $C$ has equation $y = 3x^{2} - 12x + 7$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Express $3x^{2} - 12x + 7$ in the form $a(x + b)^{2} + c$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
        blanks: [nb("a", 3, 3), nb("b", -2, 2), nb("c", -5, 3)],
        explanation: t`$3(x^{2} - 4x) + 7 = 3\left[(x - 2)^{2} - 4\right] + 7 = 3(x - 2)^{2} - 5$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: "Hence state the coordinates of the minimum point of C.",
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [nb("x", 2, -2), nb("y", -5, 5)],
        explanation: t`From $3(x - 2)^{2} - 5$: the minimum point is $(2, -5)$.`,
      }),
      P.proof({
        label: "(c)", marks: 1, stem: t`The line $y = kx + 4$ meets $C$. Show that the $x$-coordinates of the points of intersection satisfy $3x^{2} - (12 + k)x + 3 = 0$.`,
        points: [t`B1 equates $3x^{2} - 12x + 7 = kx + 4$ and rearranges to the given equation`],
        modelAnswer: t`$3x^{2} - 12x + 7 = kx + 4 \Rightarrow 3x^{2} - 12x - kx + 3 = 0 \Rightarrow 3x^{2} - (12 + k)x + 3 = 0$.`,
      }),
      P.fib({
        label: "(d)", marks: 2, stem: t`Find the values of $k$ for which the line $y = kx + 4$ is a tangent to $C$.`,
        template: "k = {{blank:a}} or k = {{blank:b}} (smaller first)",
        blanks: [nb("a", -18, -6), nb("b", -6, 6)],
        explanation: t`Tangent: $(12 + k)^{2} - 4(3)(3) = 0$, so $12 + k = \pm 6$ and $k = -6$ or $k = -18$.`,
      }),
    ],
    explanation: t`$C$: $y = 3(x - 2)^{2} - 5$ with minimum $(2, -5)$. The line is a tangent when the discriminant $(12 + k)^{2} - 36$ is zero: $k = -6$ or $-18$.`,
    hints: ["Take out the factor 3 before completing the square.", "A tangent gives equal roots: b² − 4ac = 0."],
  });

  // ---------------------------------------------------------------- C1s (6): inverse and composite
  const f2 = (x) => (x - 3) ** 2 + 1;
  const f2inv = (x) => 3 + Math.sqrt(x - 1);
  for (const x of [3, 4.5, 8]) chk(f2inv(f2(x)), x, 1e-12);
  const x2 = 3 + Math.sqrt(8);
  chk(2 * f2(x2) - 5, 13, 1e-9);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true, secs: 540,
    concepts: [A("functions.composite-inverse"), A("functions.domain-range")],
    stem: t`The functions $f$ and $g$ are defined by $f(x) = (x - 3)^{2} + 1$ for $x \geq 3$ and $g(x) = 2x - 5$ for $x \in \mathbb{R}$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 1, stem: "State the range of f.",
        template: "f(x) ≥ {{blank:a}}",
        blanks: [nb("a", 1, 3)],
        explanation: t`The vertex $(3, 1)$ is at the end of the domain and $f$ increases from it, so $f(x) \geq 1$.`,
      }),
      P.expr({
        label: "(b)", marks: 2, stem: "Find an expression for f⁻¹(x). Use sqrt( ) for the square root, for example 2+sqrt(x-5).",
        accepted: ["3+√(x-1)", "√(x-1)+3"], wrong: ["3-sqrt(x-1)", "sqrt(x-1)-3"],
        explanation: t`$y = (x - 3)^{2} + 1 \Rightarrow x - 3 = \sqrt{y - 1}$ (positive, as $x \geq 3$), so $f^{-1}(x) = 3 + \sqrt{x - 1}$.`,
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: t`State the domain of $f^{-1}$.`,
        options: [
          [t`$x \geq 1$`, "Correct: the domain of the inverse is the range of f."],
          [t`$x \geq 3$`, "That is the domain of f, which becomes the range of the inverse."],
          [t`$x \in \mathbb{R}$`, t`$\sqrt{x - 1}$ needs $x \geq 1$.`],
          [t`$x > 1$`, t`$x = 1$ is allowed: $f^{-1}(1) = 3$.`],
        ],
        answer: "A",
        explanation: t`Domain of $f^{-1}$ = range of $f$ = $\{x : x \geq 1\}$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Solve $gf(x) = 13$, giving your answer to 3 significant figures.`,
        value: x2, prefix: "x =", wrong: [0.172, 7.24],
        explanation: t`$gf(x) = 2\left[(x - 3)^{2} + 1\right] - 5 = 13$, so $(x - 3)^{2} = 8$ and $x = 3 + 2\sqrt{2} = 5.83$ (the root $3 - 2\sqrt{2}$ is outside the domain $x \geq 3$).`,
      }),
    ],
    explanation: t`Range $f(x) \geq 1$; $f^{-1}(x) = 3 + \sqrt{x - 1}$ for $x \geq 1$; $gf(x) = 13$ gives $(x - 3)^{2} = 8$, so $x = 3 + 2\sqrt{2} \approx 5.83$.`,
    hints: ["Domain of f⁻¹ = range of f.", "gf means apply f first, then g."],
  });

  // ---------------------------------------------------------------- C1s (6): perpendicular bisector and area
  chk(4 + 2 * 3 - 10, 0);
  chk(10 + 2 * 0 - 10, 0);
  chk(0.5 * Math.abs(2 * (7 - 0) + 6 * (0 + 1) + 10 * (-1 - 7)), 30);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false, secs: 540,
    concepts: [A("coordinate.straight-lines")],
    stem: t`The points $A(2, -1)$ and $B(6, 7)$ are given.`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Find the equation of the perpendicular bisector of $AB$, giving your answer in the form $x + py + q = 0$.`,
        template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [nb("p", 2, -2), nb("q", -10, 10)],
        explanation: t`Midpoint $(4, 3)$; gradient $AB = \frac{8}{4} = 2$, so the perpendicular gradient is $-\frac{1}{2}$. $y - 3 = -\frac{1}{2}(x - 4)$ gives $2y - 6 = -x + 4$, i.e. $x + 2y - 10 = 0$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: t`The perpendicular bisector meets the $x$-axis at $C$. Find the coordinates of $C$.`,
        template: "({{blank:x}}, 0)",
        blanks: [nb("x", 10, 5)],
        explanation: t`$y = 0$: $x = 10$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Find the area of triangle ABC.",
        value: 30, wrong: [60, 15],
        explanation: t`$C$ is on the perpendicular bisector, so the triangle is isosceles with apex $C$. Height $CM$ from the midpoint $M(4, 3)$: $\sqrt{6^{2} + 3^{2}} = \sqrt{45}$; base $AB = \sqrt{80}$. Area $= \frac{1}{2}\sqrt{80}\sqrt{45} = \frac{1}{2}\sqrt{3600} = 30$.`,
      }),
    ],
    explanation: t`Perpendicular bisector $x + 2y - 10 = 0$, meeting the $x$-axis at $C(10, 0)$. $CM \perp AB$, so area $= \frac{1}{2} \times AB \times CM = \frac{1}{2} \times \sqrt{80} \times \sqrt{45} = 30$.`,
    hints: ["Midpoint and negative reciprocal gradient.", "CM is perpendicular to AB, so it is the height of the triangle."],
  });

  // ---------------------------------------------------------------- C1l (9): line and curve, discriminant, inequality
  for (const k of [-1, -9]) chk(quad.disc(1, -(5 + k), 4), 0);
  const r4 = quad.roots(1, -6, 4);
  chk(r4[0], 3 - Math.sqrt(5), 1e-12);
  const chord4 = Math.hypot(r4[1] - r4[0], (r4[1] - r4[0]) * 1);
  chk(chord4, 2 * Math.sqrt(10), 1e-12);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 810,
    concepts: [A("quadratics.equations-inequalities"), A("quadratics.completing-square-discriminant")],
    stem: t`The curve $y = x^{2} - 5x + 8$ and the line $y = kx + 4$, where $k$ is a constant, are given.`,
    parts: [
      P.proof({
        label: "(a)", marks: 1, stem: t`Show that the $x$-coordinates of any points of intersection satisfy $x^{2} - (5 + k)x + 4 = 0$.`,
        points: [t`B1 equates and rearranges: $x^{2} - 5x + 8 - kx - 4 = 0$`],
        modelAnswer: t`$x^{2} - 5x + 8 = kx + 4 \Rightarrow x^{2} - (5 + k)x + 4 = 0$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Find the values of k for which the line is a tangent to the curve.",
        template: "k = {{blank:a}} or k = {{blank:b}} (smaller first)",
        blanks: [nb("a", -9, 9), nb("b", -1, 1)],
        explanation: t`$(5 + k)^{2} - 16 = 0$, so $5 + k = \pm 4$: $k = -1$ or $k = -9$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Find the set of values of k for which the line does not meet the curve.",
        template: "{{blank:a}} < k < {{blank:b}}",
        blanks: [nb("a", -9, -1), nb("b", -1, 9)],
        explanation: t`$(5 + k)^{2} < 16$, i.e. $(k + 1)(k + 9) < 0$: $-9 < k < -1$.`,
      }),
      P.group({
        label: "(d)", stem: t`In this part $k = 1$.`,
        parts: [
          P.fib({
            label: "(i)", marks: 2, stem: "Find the x-coordinates of the points of intersection, each to 3 significant figures.",
            template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
            blanks: [nb("a", r4[0], 0.5, 0.0005), nb("b", r4[1], 5, 0.005)],
            explanation: t`$x^{2} - 6x + 4 = 0$, so $x = 3 \pm \sqrt{5}$: $0.764$ and $5.24$.`,
          }),
          P.num({
            label: "(ii)", marks: 1, stem: "Find the distance between the two points of intersection, to 4 significant figures.",
            value: chord4, sf: 4, wrong: [4.472],
            explanation: t`The points are $3 \pm \sqrt{5}$ apart horizontally, and the line has gradient 1, so they are $2\sqrt{5}$ apart vertically too. Distance $= \sqrt{2}\times 2\sqrt{5} = 2\sqrt{10} = 6.325$ (4 s.f.).`,
          }),
          P.mcq({
            label: "(iii)", marks: 1, stem: "For which values of x is the line above the curve?",
            options: [
              [t`$3 - \sqrt{5} < x < 3 + \sqrt{5}$`, "Correct: the quadratic x² − 6x + 4 is negative between its roots."],
              [t`$x < 3 - \sqrt{5}$ or $x > 3 + \sqrt{5}$`, "There the curve is above the line."],
              [t`$-\sqrt{5} < x < \sqrt{5}$`, "The roots are 3 ± √5, not ±√5."],
              [t`$x > 3 + \sqrt{5}$`, "The quadratic grows faster than the line for large x."],
            ],
            answer: "A",
            explanation: t`Line above curve: $x + 4 > x^{2} - 5x + 8 \iff x^{2} - 6x + 4 < 0 \iff 3 - \sqrt{5} < x < 3 + \sqrt{5}$.`,
          }),
        ],
      }),
    ],
    explanation: t`Substituting gives $x^{2} - (5 + k)x + 4 = 0$. Tangent: $k = -1$ or $-9$; no intersection for $-9 < k < -1$. With $k = 1$ the line cuts at $x = 3 \pm \sqrt{5}$, $2\sqrt{10}$ apart, and is above the curve between them.`,
    hints: ["Use the discriminant of the quadratic in x.", "For (c), solve a quadratic inequality in k."],
  });

  // ---------------------------------------------------------------- C1l (9): transformations and inverse
  same(quad.completeSquare(1, -4, 1), { a: 1, p: -2, q: -3, vertex: [2, -3] });
  const f5inv = (x) => 2 - Math.sqrt(x + 3);
  for (const x of [-1, 0, 2]) chk(f5inv(x * x - 4 * x + 1), x, 1e-12);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, secs: 810,
    concepts: [A("functions.transformations"), A("functions.composite-inverse"), A("quadratics.completing-square-discriminant")],
    stem: t`The function $f$ is defined by $f(x) = x^{2} - 4x + 1$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Express $f(x)$ in the form $(x - a)^{2} + b$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [nb("a", 2, -2), nb("b", -3, 1)],
        explanation: t`$x^{2} - 4x + 1 = (x - 2)^{2} - 4 + 1 = (x - 2)^{2} - 3$.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: t`Describe fully a single transformation that maps the graph of $y = x^{2}$ onto the graph of $y = f(x)$.`,
        points: ["Translation", t`by the vector $\begin{pmatrix} 2 \\ -3 \end{pmatrix}$`],
        modelAnswer: "A translation by the vector (2, −3): 2 units in the positive x-direction and 3 units in the negative y-direction.",
      }),
      P.fib({
        label: "(c)", marks: 2, stem: t`The graph of $y = f(x)$ is stretched by scale factor 2 parallel to the $y$-axis and then translated 1 unit in the positive $y$-direction. State the coordinates of the minimum point of the resulting graph.`,
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [nb("x", 2, 4), nb("y", -5, -4)],
        explanation: t`The minimum $(2, -3)$ becomes $(2, -6)$ after the stretch, then $(2, -5)$ after the translation. The new equation is $y = 2f(x) + 1$.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: t`The domain of $f$ is now restricted to $x \leq k$. State the largest value of $k$ for which $f$ has an inverse.`,
        value: 2, prefix: "k =", wrong: [-3],
        explanation: t`$f$ is one-one on one side of the vertex: $x \leq 2$.`,
      }),
      P.expr({
        label: "(e)", marks: 2, stem: t`For this domain, find an expression for $f^{-1}(x)$. Use sqrt( ), for example 1-sqrt(x+2).`,
        accepted: ["2-√(x+3)", "-√(x+3)+2"], wrong: ["2+sqrt(x+3)", "2-sqrt(x-3)"],
        explanation: t`$y = (x - 2)^{2} - 3 \Rightarrow x - 2 = -\sqrt{y + 3}$ (negative root since $x \leq 2$), so $f^{-1}(x) = 2 - \sqrt{x + 3}$ for $x \geq -3$.`,
      }),
    ],
    explanation: t`$f(x) = (x - 2)^{2} - 3$ is $y = x^{2}$ translated by $\begin{pmatrix} 2 \\ -3 \end{pmatrix}$. $2f(x) + 1$ has minimum $(2, -5)$. On $x \leq 2$, $f^{-1}(x) = 2 - \sqrt{x + 3}$.`,
    hints: ["The completed-square form shows the translation directly.", "With x ≤ 2 choose the negative square root."],
  });

  // ---------------------------------------------------------------- C1l (9): line meeting a curve, perpendicular bisector
  same(quad.roots(1, -1, -6), [-2, 3]);
  for (const x of [-2, 3]) chk(2 * x + 4, x * x + x - 2);
  chk(-0.5 * 0.5 + 5.25, 5);
  chk(-0.5 * 10.5 + 5.25, 0);
  const pq = Math.hypot(5, 10);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 810,
    concepts: [A("coordinate.straight-lines"), A("quadratics.equations-inequalities")],
    stem: t`The line $L$ passes through the point $(-1, 2)$ and has gradient 2. It meets the curve $y = x^{2} + x - 2$ at the points $P$ and $Q$, where $P$ has the smaller $x$-coordinate.`,
    parts: [
      P.fib({
        label: "(a)", marks: 1, stem: t`Find the equation of $L$ in the form $y = 2x + c$.`,
        template: "c = {{blank:c}}",
        blanks: [nb("c", 4, 0)],
        explanation: t`$y - 2 = 2(x + 1)$, so $y = 2x + 4$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "Find the coordinates of P and Q.",
        template: "P({{blank:px}}, {{blank:py}}), Q({{blank:qx}}, {{blank:qy}})",
        blanks: [nb("px", -2, 2), nb("py", 0, 8), nb("qx", 3, -3), nb("qy", 10, -2)],
        explanation: t`$x^{2} + x - 2 = 2x + 4 \Rightarrow x^{2} - x - 6 = 0 \Rightarrow (x - 3)(x + 2) = 0$. $P(-2, 0)$, $Q(3, 10)$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find the length PQ, to 3 significant figures.",
        value: pq, wrong: [125],
        explanation: t`$\sqrt{5^{2} + 10^{2}} = \sqrt{125} = 11.2$.`,
      }),
      P.fib({
        label: "(d)", marks: 3, stem: "Find the equation of the perpendicular bisector of PQ in the form y = mx + c.",
        template: "m = {{blank:m}}, c = {{blank:c}}",
        blanks: [nb("m", -0.5, 2), nb("c", 5.25, 5)],
        explanation: t`Midpoint $(0.5, 5)$; gradient $PQ = 2$, so the perpendicular gradient is $-\frac{1}{2}$. $y - 5 = -\frac{1}{2}(x - 0.5)$, i.e. $y = -0.5x + 5.25$.`,
      }),
      P.proof({
        label: "(e)", marks: 1, stem: t`Show that the perpendicular bisector of $PQ$ meets the $x$-axis at $(10.5, 0)$.`,
        points: [t`B1 substitutes $y = 0$: $0 = -0.5x + 5.25 \Rightarrow x = 10.5$`],
        modelAnswer: t`At $y = 0$: $0.5x = 5.25$, so $x = 10.5$; the point is $(10.5, 0)$.`,
      }),
    ],
    explanation: t`$L: y = 2x + 4$ meets the curve at $P(-2, 0)$ and $Q(3, 10)$; $PQ = \sqrt{125}$; the perpendicular bisector $y = -0.5x + 5.25$ crosses the $x$-axis at $(10.5, 0)$.`,
    hints: ["Substitute the line into the curve.", "Perpendicular bisector: through the midpoint, gradient −1/2."],
  });

  // ---------------------------------------------------------------- C2s (7): modulus, then a "hence" with logarithms
  for (const x of [0, 6]) chk(Math.abs(2 * x - 3), Math.abs(x + 3));
  const y7 = L(6) / L(3);
  chk(Math.abs(2 * 3 ** y7 - 3), Math.abs(3 ** y7 + 3), 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 630,
    concepts: [A("algebra.modulus"), A("functions.logarithms")],
    stem: t`This question is about the graphs of $y = |2x - 3|$ and $y = |x + 3|$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`State the coordinates of the points where $y = |2x - 3|$ meets the axes.`,
        template: "({{blank:x}}, 0) and (0, {{blank:y}})",
        blanks: [nb("x", 1.5, -1.5), nb("y", 3, -3)],
        explanation: t`The vertex is where $2x - 3 = 0$, at $(1.5, 0)$; the $y$-intercept is $|-3| = 3$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`Solve the equation $|2x - 3| = |x + 3|$.`,
        template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
        blanks: [nb("a", 0, -6), nb("b", 6, 2)],
        explanation: t`Square: $4x^{2} - 12x + 9 = x^{2} + 6x + 9$, so $3x^{2} - 18x = 0$, $3x(x - 6) = 0$: $x = 0$ or $x = 6$.`,
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: t`Hence solve $|2x - 3| < |x + 3|$.`,
        options: [
          [t`$0 < x < 6$`, "Correct: 3x(x − 6) < 0 between the roots."],
          [t`$x < 0$ or $x > 6$`, "There |2x − 3| is the larger."],
          [t`$1.5 < x < 6$`, "The vertex 1.5 is not a critical value of this inequality."],
          [t`$x < 6$`, t`At $x = -1$: $|{-5}| = 5 > |2| = 2$, so negative $x$ fails.`],
        ],
        answer: "A",
        explanation: t`Squaring: $3x^{2} - 18x < 0$, so $0 < x < 6$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Hence solve $\left|2 \times 3^{y} - 3\right| = \left|3^{y} + 3\right|$, giving your answer to 3 significant figures.`,
        value: y7, prefix: "y =", wrong: [0.613, 6],
        explanation: t`With $x = 3^{y}$ this is the equation in (b): $3^{y} = 0$ (impossible) or $3^{y} = 6$, giving $y = \dfrac{\ln 6}{\ln 3} = 1.63$. (Inverting the fraction gives 0.613.)`,
      }),
    ],
    explanation: t`The V-graph $y = |2x - 3|$ has vertex $(1.5, 0)$. Squaring gives $x = 0$ or $6$, and $|2x - 3| < |x + 3|$ for $0 < x < 6$. With $x = 3^{y}$, only $3^{y} = 6$ is possible, so $y = \frac{\ln 6}{\ln 3} \approx 1.63$.`,
    hints: ["Both sides are moduli, so squaring is safe.", "In (d), let x = 3ʸ; can 3ʸ be 0?"],
  });

  // ---------------------------------------------------------------- C2s (7): factor theorem, then a "hence" with logarithms
  const p8 = [1, -2, 5, -10];
  chk(poly.eval(p8, 2), 0);
  chk(poly.eval(p8, -2), -36);
  same(poly.div(p8, [1, -2]), { q: [1, 0, 5], r: [0] });
  const y8 = L(2) / L(3);
  chk(poly.eval(p8, 3 ** y8), 0, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 630,
    concepts: [A("algebra.polynomials"), A("functions.logarithms")],
    stem: t`The polynomial $p(x) = x^{3} + ax^{2} + bx - 10$, where $a$ and $b$ are constants, has a factor $(x - 2)$. When $p(x)$ is divided by $(x + 2)$ the remainder is $-36$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Find the values of a and b.",
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [nb("a", -2, 2), nb("b", 5, -5)],
        explanation: t`$p(2) = 0$: $8 + 4a + 2b - 10 = 0$, so $2a + b = 1$. $p(-2) = -36$: $-8 + 4a - 2b - 10 = -36$, so $2a - b = -9$. Adding: $4a = -8$, $a = -2$, $b = 5$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: "Find the quadratic factor of p(x).",
        template: "x² + {{blank:b}} x + {{blank:c}}",
        blanks: [nb("b", 0, -2), nb("c", 5, -5)],
        explanation: t`$x^{3} - 2x^{2} + 5x - 10 = x^{2}(x - 2) + 5(x - 2) = (x - 2)(x^{2} + 5)$.`,
      }),
      P.proof({
        label: "(c)", marks: 1, stem: t`Show that $p(x) = 0$ has only one real root.`,
        points: [t`B1 $x^{2} + 5 > 0$ for all real $x$ (discriminant $-20 < 0$), so the only real root is $x = 2$`],
        modelAnswer: t`$p(x) = (x - 2)(x^{2} + 5)$ and $x^{2} + 5 \geq 5 > 0$ for all real $x$, so $x^{2} + 5 = 0$ has no real roots. The only real root is $x = 2$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Hence solve $p\left(3^{y}\right) = 0$, giving $y$ to 3 significant figures.`,
        value: y8, prefix: "y =", wrong: [1.58, 0.301],
        explanation: t`$3^{y} = 2$, so $y = \dfrac{\ln 2}{\ln 3} = 0.631$. (Inverting gives 1.58.)`,
      }),
    ],
    explanation: t`$a = -2$, $b = 5$, $p(x) = (x - 2)(x^{2} + 5)$ with one real root $x = 2$. Then $3^{y} = 2$ gives $y = \frac{\ln 2}{\ln 3} \approx 0.631$.`,
    hints: ["Use p(2) = 0 and p(−2) = −36.", "Only the real root x = 2 gives a value of 3ʸ."],
  });

  // ---------------------------------------------------------------- C2l (11): linear law and exponential models
  const A9 = Math.exp(1.8);
  const b9 = Math.exp(0.4);
  const x9 = (L(50) - 1.8) / 0.4;
  const xm9 = (L(20) - 1.8) / 0.7;
  const xz9 = L(4) / 0.3;
  chk(A9 * b9 ** xm9, 20 * Math.exp(-0.3 * xm9), 1e-9);
  chk(20 * Math.exp(-0.3 * xz9), 5, 1e-9);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 990,
    concepts: [A("functions.linear-law"), A("functions.exponential-log"), A("functions.logarithms")],
    stem: t`The variables $x$ and $y$ satisfy $y = Ab^{x}$, where $A$ and $b$ are constants. The graph of $\ln y$ against $x$ is a straight line passing through the points $(0, 1.8)$ and $(3, 3.0)$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 1, stem: t`Explain why the graph of $\ln y$ against $x$ is a straight line.`,
        points: [t`B1 $\ln y = \ln A + x\ln b$, which is linear in $x$ (gradient $\ln b$, intercept $\ln A$)`],
        modelAnswer: t`Taking logarithms, $\ln y = \ln A + x\ln b$: of the form $Y = mX + c$ with $Y = \ln y$, $X = x$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Find the gradient and the intercept of the line.",
        template: "gradient {{blank:m}}, intercept {{blank:c}}",
        blanks: [nb("m", 0.4, 2.5, 0.0005), nb("c", 1.8, 3, 0.0005)],
        explanation: t`Gradient $\frac{3.0 - 1.8}{3} = 0.4$; the line passes through $(0, 1.8)$, so the intercept is $1.8$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Find the values of A and b, each to 3 significant figures.",
        template: "A = {{blank:A}}, b = {{blank:b}}",
        blanks: [nb("A", A9, 1.8, 0.005), nb("b", b9, 0.4, 0.005)],
        explanation: t`$A = \mathrm{e}^{1.8} = 6.05$ and $b = \mathrm{e}^{0.4} = 1.49$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Find the value of $x$ for which $y = 50$, to 3 significant figures.`,
        value: x9, prefix: "x =", wrong: [125],
        explanation: t`$\ln 50 = 1.8 + 0.4x$, so $x = \dfrac{3.912 - 1.8}{0.4} = 5.28$.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: t`A second variable $z$ is given by $z = 20\mathrm{e}^{-0.3x}$. Find the value of $x$ for which $y = z$, to 3 significant figures.`,
        value: xm9, prefix: "x =", wrong: [11.96, 2.99],
        explanation: t`$\ln y = \ln z$: $1.8 + 0.4x = \ln 20 - 0.3x$, so $0.7x = 2.9957 - 1.8 = 1.1957$ and $x = 1.71$.`,
      }),
      P.mcq({
        label: "(f)", marks: 1, stem: t`Which statement describes $z$ as $x$ increases from 0?`,
        options: [
          ["z decreases from 20 and approaches 0 but never reaches it.", "Correct: exponential decay with k = −0.3."],
          ["z decreases from 20 and reaches 0 at a finite value of x.", "An exponential is never zero."],
          ["z increases from 20 without limit.", "The index −0.3x is negative for x > 0."],
          ["z decreases from 20 towards a long-term value of 0.3.", "There is no added constant, so z tends to 0."],
        ],
        answer: "A",
        explanation: t`$z = 20\mathrm{e}^{-0.3x}$: $z(0) = 20$, decreasing, $z \to 0$ as $x \to \infty$.`,
      }),
      P.num({
        label: "(g)", marks: 1, stem: t`Find the value of $x$ for which $z = 5$, to 3 significant figures.`,
        value: xz9, prefix: "x =", wrong: [2.01],
        explanation: t`$\mathrm{e}^{-0.3x} = 0.25$, so $x = \dfrac{\ln 4}{0.3} = 4.62$.`,
      }),
    ],
    explanation: t`$\ln y = 1.8 + 0.4x$ gives $y = 6.05 \times 1.49^{x}$. $y = 50$ at $x = 5.28$; $y = z$ where $1.8 + 0.4x = \ln 20 - 0.3x$, at $x = 1.71$; $z = 5$ at $x = 4.62$.`,
    hints: ["Gradient = ln b, intercept = ln A.", "Taking ln of both sides turns y = z into a linear equation."],
  });

  // ---------------------------------------------------------------- C3s (6): partial fractions (Paper 3)
  ident((x) => (5 * x * x + 3 * x + 1) / ((x + 2) * (x * x + 1)), (x) => 3 / (x + 2) + (2 * x - 1) / (x * x + 1), "C3s");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false, secs: 540,
    concepts: [A("algebra.partial-fractions")],
    stem: t`Let $f(x) = \dfrac{5x^{2} + 3x + 1}{(x + 2)(x^{2} + 1)}$.`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1, stem: "Which form should be used to express f(x) in partial fractions?",
        options: [
          [t`$\dfrac{A}{x + 2} + \dfrac{Bx + C}{x^{2} + 1}$`, "Correct: x² + 1 is irreducible, so it takes a linear numerator."],
          [t`$\dfrac{A}{x + 2} + \dfrac{B}{x^{2} + 1}$`, "A constant numerator is not general enough over a quadratic factor."],
          [t`$\dfrac{A}{x + 2} + \dfrac{B}{x + 1} + \dfrac{C}{x - 1}$`, t`$x^{2} + 1$ does not factorise; $x^{2} - 1$ would.`],
          [t`$5 + \dfrac{A}{x + 2} + \dfrac{Bx + C}{x^{2} + 1}$`, "The fraction is proper, so there is no constant term."],
        ],
        answer: "A",
        explanation: t`Proper fraction with an irreducible quadratic factor: $\dfrac{A}{x + 2} + \dfrac{Bx + C}{x^{2} + 1}$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "Find the values of A, B and C.",
        template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
        blanks: [nb("A", 3, 15), nb("B", 2, -2), nb("C", -1, 1)],
        explanation: t`$5x^{2} + 3x + 1 \equiv A(x^{2} + 1) + (Bx + C)(x + 2)$. $x = -2$: $20 - 6 + 1 = 15 = 5A$, $A = 3$. $x^{2}$: $5 = A + B$, $B = 2$. Constants: $1 = A + 2C$, $C = -1$.`,
      }),
      P.expr({
        label: "(c)", marks: 2, stem: t`Hence write $f(x) - \dfrac{3}{x + 2}$ as a single fraction in its simplest form.`,
        accepted: ["(2x-1)/(x^2+1)", "(2x-1)/(1+x^2)", "(-1+2x)/(x^2+1)"], wrong: ["(5x^2+3x-2)/(x^2+1)", "(2x+1)/(x^2+1)"],
        explanation: t`By part (b), $f(x) - \dfrac{3}{x + 2} = \dfrac{2x - 1}{x^{2} + 1}$.`,
      }),
    ],
    explanation: t`$f(x) = \dfrac{3}{x + 2} + \dfrac{2x - 1}{x^{2} + 1}$. Check at $x = 0$: $f(0) = \frac{1}{2}$ and $\frac{3}{2} - 1 = \frac{1}{2}$.`,
    hints: ["Substitute x = −2 first.", "Equate the coefficients of x² and the constant terms."],
  });
});
