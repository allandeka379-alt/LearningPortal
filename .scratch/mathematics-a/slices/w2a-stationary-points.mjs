// W2a: amaths.diff.stationary-points (max/min, sketching, optimisation; ZIMSEC-only points of inflexion -> applies ZP).
import { concept, P, t, chk, same, checkDeriv, quad, ZP } from "../lib.mjs";

const XS = [0.6, 1.4, 2.7];
const { PI } = Math;

concept("amaths.diff.stationary-points", { file: "diff/stationary-points", keyPrefix: "diff.stationary-points" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which condition defines a stationary point of the curve $y = f(x)$?`,
    options: [
      [t`$\dfrac{dy}{dx} = 0$`, "Correct: the tangent is horizontal at a stationary point."],
      [t`$\dfrac{d^{2}y}{dx^{2}} = 0$`, "This is the condition tested for a point of inflexion, not for a stationary point."],
      [t`$y = 0$`, "y = 0 gives the x-intercepts of the curve, which need not be stationary."],
      [t`$\dfrac{dy}{dx}$ is undefined`, "A stationary point has a gradient of zero; an undefined gradient means a vertical tangent or a break."],
    ],
    answer: "A",
    explanation: t`At a stationary point the gradient $\frac{dy}{dx}$ is zero, so the function is momentarily neither increasing nor decreasing.`,
  });

  // y = x² − 8x + 3: (4, −13)
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the coordinates of the stationary point of $y = x^{2} - 8x + 3$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [
      { id: "x", input: "number", accepted: [4], wrong: -4 },
      { id: "y", input: "number", accepted: [16 - 32 + 3], wrong: 0 },
    ],
    explanation: t`$\frac{dy}{dx} = 2x - 8 = 0$ at $x = 4$. Then $y = 16 - 32 + 3 = -13$, so the point is $(4, -13)$.`,
  });

  // y = 2x³ − 3x² − 12x + 5: max (−1, 12), min (2, −15)
  const f3 = (x) => 2 * x ** 3 - 3 * x * x - 12 * x + 5;
  checkDeriv(f3, (x) => 6 * (x - 2) * (x + 1), XS, "q3");
  chk(f3(-1), 12); chk(f3(2), -15);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The curve $y = 2x^{3} - 3x^{2} - 12x + 5$ has a maximum point and a minimum point. Find their coordinates.`,
    template: "Maximum ({{blank:a}}, {{blank:b}}); minimum ({{blank:c}}, {{blank:d}})",
    blanks: [
      { id: "a", input: "number", accepted: [-1], wrong: 2 },
      { id: "b", input: "number", accepted: [12], wrong: -15 },
      { id: "c", input: "number", accepted: [2], wrong: -1 },
      { id: "d", input: "number", accepted: [-15], wrong: 12 },
    ],
    explanation: t`$\frac{dy}{dx} = 6x^{2} - 6x - 12 = 6(x - 2)(x + 1)$, so $x = -1$ or $2$. $\frac{d^{2}y}{dx^{2}} = 12x - 6$: at $x = -1$ it is $-18 < 0$ (maximum, $y = 12$); at $x = 2$ it is $18 > 0$ (minimum, $y = -15$).`,
    hints: ["Factorise 6x² − 6x − 12.", "Use the second derivative to decide which is which."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`At a stationary point of a curve, $\dfrac{d^{2}y}{dx^{2}} = -4$. What can you conclude?`,
    options: [
      ["The point is a maximum", "Correct: a negative second derivative means the gradient is decreasing through zero, from positive to negative."],
      ["The point is a minimum", "A minimum has a positive second derivative."],
      ["The point is a point of inflexion", "At an inflexion the second derivative is zero and changes sign; −4 is not zero."],
      ["Nothing, without the sign test", "The sign test is needed only when the second derivative is zero."],
    ],
    answer: "A",
    explanation: t`$\frac{d^{2}y}{dx^{2}} < 0$ at a stationary point means the curve bends downwards there: a maximum.`,
  });

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`If $\dfrac{dy}{dx} = 0$ and $\dfrac{d^{2}y}{dx^{2}} = 0$ at a point, that point must be a point of inflexion.`,
    answer: false,
    explanation: t`False. $y = x^{4}$ has $\frac{dy}{dx} = \frac{d^{2}y}{dx^{2}} = 0$ at the origin, which is a minimum. When the second derivative is zero, test the sign of $\frac{dy}{dx}$ on each side.`,
    hints: ["Think about y = x⁴ at the origin."],
  });

  // y = x + 9/x, x > 0: min at x = 3, y = 6
  checkDeriv((x) => x + 9 / x, (x) => 1 - 9 / (x * x), XS, "q6");
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the least value of $y = x + \dfrac{9}{x}$ for $x > 0$.`,
    value: 3 + 9 / 3, wrong: [3, 10],
    explanation: t`$\frac{dy}{dx} = 1 - \frac{9}{x^{2}} = 0$ gives $x = 3$ ($x > 0$). $\frac{d^{2}y}{dx^{2}} = \frac{18}{x^{3}} > 0$, a minimum. The least value is $3 + 3 = 6$. (3 is the value of $x$, not of $y$.)`,
    hints: ["Solve dy/dx = 0 for x > 0.", "Substitute back into y."],
  });

  // y = 3x⁴ − 8x³: y' = 12x²(x − 2): stationary inflexion at origin
  checkDeriv((x) => 3 * x ** 4 - 8 * x ** 3, (x) => 12 * x * x * (x - 2), XS, "q7");
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The curve $y = 3x^{4} - 8x^{3}$ has $\dfrac{dy}{dx} = 12x^{2}(x - 2)$. What is the nature of the stationary point at the origin?`,
    options: [
      ["A stationary point of inflexion", t`Correct: $\frac{dy}{dx} < 0$ just to the left and just to the right of $x = 0$, because $12x^{2} \geq 0$ and $x - 2 < 0$.`],
      ["A local maximum", "A maximum needs dy/dx positive on the left and negative on the right; here it is negative on both sides."],
      ["A local minimum", t`The minimum is at $x = 2$, where the sign of $\frac{dy}{dx}$ changes from negative to positive.`],
      ["It is not a stationary point", t`$\frac{dy}{dx} = 0$ at $x = 0$, so it is stationary.`],
    ],
    answer: "A",
    explanation: t`$\frac{d^{2}y}{dx^{2}} = 36x^{2} - 48x$ is 0 at $x = 0$, so use signs: for small $x \neq 0$, $12x^{2} > 0$ and $x - 2 < 0$, so $\frac{dy}{dx} < 0$ on both sides. The gradient does not change sign: a stationary point of inflexion.`,
    hints: ["The second derivative is 0 there: test the sign of dy/dx either side."],
  });

  // field against river: A = x(240 − 2x), max at x = 60, A = 7200
  const A8 = (x) => x * (240 - 2 * x);
  checkDeriv(A8, (x) => 240 - 4 * x, XS, "q8");
  chk(A8(60), 7200);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false, unit: "m²",
    stem: t`A farmer in Mashonaland East has 240 m of fencing to enclose a rectangular paddock against a straight stretch of river; no fence is needed along the river. Find the greatest area she can enclose.`,
    value: 7200, wrong: [3600, 14400],
    explanation: t`With the two sides perpendicular to the river $x$ m long, the third side is $240 - 2x$ m, so $A = 240x - 2x^{2}$. $\frac{dA}{dx} = 240 - 4x = 0$ at $x = 60$; $\frac{d^{2}A}{dx^{2}} = -4 < 0$, a maximum. $A = 60 \times 120 = 7200$ m$^2$.`,
    workedSolution: [
      t`1. Let the two sides at right angles to the river be $x$ m. The side parallel to the river is $240 - 2x$ m.`,
      t`2. $A = x(240 - 2x) = 240x - 2x^{2}$.`,
      t`3. $\dfrac{dA}{dx} = 240 - 4x = 0 \Rightarrow x = 60$; $\dfrac{d^{2}A}{dx^{2}} = -4 < 0$, so a maximum.`,
      t`4. Greatest area $= 60 \times 120 = 7200$ m$^2$.`,
    ].join("\n"),
    hints: ["Only three sides need fencing.", "Write the area in terms of one variable."],
  });

  // open box from 24 cm square: V = x(24 − 2x)², x = 4, V = 1024
  const V9 = (x) => x * (24 - 2 * x) ** 2;
  checkDeriv(V9, (x) => (24 - 2 * x) * (24 - 6 * x), XS, "q9");
  same(quad.roots(12, -192, 576), [4, 12]);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false, unit: "cm³",
    stem: t`Equal squares of side $x$ cm are cut from the corners of a square sheet of tin of side 24 cm, and the sides are folded up to make an open box. Find the greatest possible volume of the box.`,
    value: V9(4), wrong: [1152, 0],
    explanation: t`$V = x(24 - 2x)^{2}$. $\frac{dV}{dx} = (24 - 2x)^{2} - 4x(24 - 2x) = (24 - 2x)(24 - 6x)$, zero at $x = 4$ or $x = 12$ ($x = 12$ gives no box). At $x = 4$: $V = 4 \times 16^{2} = 1024$ cm$^3$.`,
    workedSolution: [
      t`1. Base $(24 - 2x)$ by $(24 - 2x)$, height $x$: $V = x(24 - 2x)^{2}$, $0 < x < 12$.`,
      t`2. $\dfrac{dV}{dx} = (24 - 2x)(24 - 6x)$ (product or expand: $V = 4x^{3} - 96x^{2} + 576x$, $V' = 12x^{2} - 192x + 576$).`,
      t`3. $V' = 0$ at $x = 4$ (the root $x = 12$ gives zero volume).`,
      t`4. $V'' = 24x - 192 = -96 < 0$ at $x = 4$: a maximum. $V = 4 \times 16^{2} = 1024$ cm$^3$.`,
    ].join("\n"),
    hints: ["Expand V before differentiating if you prefer.", "Reject the value of x that gives no box."],
  });

  // ZP inflexion: y = x³ + 6x² − 5: y'' = 6x + 12 -> (−2, 11)
  const f11 = (x) => x ** 3 + 6 * x * x - 5;
  chk(f11(-2), 11);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Find the coordinates of the point of inflexion of the curve $y = x^{3} + 6x^{2} - 5$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [
      { id: "x", input: "number", accepted: [-2], wrong: 2 },
      { id: "y", input: "number", accepted: [11], wrong: -5 },
    ],
    explanation: t`$\frac{dy}{dx} = 3x^{2} + 12x$, $\frac{d^{2}y}{dx^{2}} = 6x + 12$, which is 0 at $x = -2$ and changes sign there (negative to positive). $y = -8 + 24 - 5 = 11$.`,
    hints: ["Solve d²y/dx² = 0.", "Check that the second derivative changes sign."],
  });

  // ZP: y = x⁴ − 6x²: y'' = 12x² − 12 -> inflexion at x = ±1, y = −5
  const f12 = (x) => x ** 4 - 6 * x * x;
  chk(f12(1), -5); chk(f12(-1), -5);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`Where are the points of inflexion of the curve $y = x^{4} - 6x^{2}$?`,
    options: [
      [t`$(-1, -5)$ and $(1, -5)$`, t`Correct: $\frac{d^{2}y}{dx^{2}} = 12x^{2} - 12$ is zero at $x = \pm 1$ and changes sign at each.`],
      [t`$(0, 0)$ only`, t`At the origin $\frac{dy}{dx} = 0$ and $\frac{d^{2}y}{dx^{2}} = -12 < 0$: it is a maximum.`],
      [t`$(-\sqrt{3}, -9)$ and $(\sqrt{3}, -9)$`, t`These are the minimum points, where $\frac{dy}{dx} = 4x^{3} - 12x = 0$.`],
      [t`$(-1, 5)$ and $(1, 5)$`, t`The $x$-values are right but $y = 1 - 6 = -5$, not 5.`],
    ],
    answer: "A",
    explanation: t`$\frac{dy}{dx} = 4x^{3} - 12x$, $\frac{d^{2}y}{dx^{2}} = 12x^{2} - 12 = 12(x - 1)(x + 1)$: zero at $x = \pm 1$, with a change of sign at each. $y = 1 - 6 = -5$. They are non-stationary points of inflexion ($\frac{dy}{dx} = \mp 8$).`,
    hints: ["Solve d²y/dx² = 0 and check the change of sign."],
  });
  chk(f12(Math.sqrt(3)), -9, 1e-9);

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: t`At every point of inflexion, $\dfrac{d^{2}y}{dx^{2}}$ changes sign, but $\dfrac{dy}{dx}$ need not be zero.`,
    answer: true,
    explanation: t`True. An inflexion is a change of concavity, so $\frac{d^{2}y}{dx^{2}}$ changes sign. The gradient there can be any value; only a stationary point of inflexion has $\frac{dy}{dx} = 0$.`,
    hints: ["Recall y = x³ − 3x at the origin: is it stationary?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "At a stationary point, match each piece of evidence with the conclusion.",
    pairs: [
      [t`$\dfrac{d^{2}y}{dx^{2}} = 5$`, "minimum"],
      [t`$\dfrac{d^{2}y}{dx^{2}} = -3$`, "maximum"],
      [t`$\dfrac{dy}{dx}$ changes from $+$ to $-$`, "maximum, by the sign test"],
      [t`$\dfrac{d^{2}y}{dx^{2}} = 0$`, "test inconclusive: check the sign of dy/dx"],
    ],
    explanation: "Positive second derivative: minimum; negative: maximum; zero: no conclusion without the sign test.",
  });

  // f = x³ − 12x + k, min at x = 2 has value 0 -> k = 16
  const k15 = -(8 - 24);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The minimum value of $f(x) = x^{3} - 12x + k$ (at its local minimum point) is 0. Find the constant $k$.`,
    value: k15, prefix: "k =", wrong: [-16, 0],
    explanation: t`$f'(x) = 3x^{2} - 12 = 0$ at $x = \pm 2$; $f''(2) = 12 > 0$, so the minimum is at $x = 2$: $8 - 24 + k = 0$, $k = 16$.`,
    hints: ["Find the x-coordinate of the minimum first."],
  });

  // sketch of y = x³ − 3x
  const f16 = (x) => x ** 3 - 3 * x;
  chk(f16(-1), 2); chk(f16(1), -2); chk(f16(Math.sqrt(3)), 0, 1e-12);
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`Describe a sketch of $y = x^{3} - 3x$, giving the coordinates of the stationary points and of the points where the curve meets the axes, and the behaviour as $x \to \pm\infty$.`,
    points: [
      t`Stationary points: maximum $(-1, 2)$ and minimum $(1, -2)$`,
      t`Meets the axes at $(0, 0)$ and $(\pm\sqrt{3}, 0)$`,
      t`$y \to -\infty$ as $x \to -\infty$ and $y \to +\infty$ as $x \to +\infty$ (S-shaped cubic)`,
    ],
    modelAnswer: t`dy/dx = 3x² − 3 = 0 at x = ±1. At x = −1, y = 2 and d²y/dx² = −6, a maximum; at x = 1, y = −2, a minimum. y = x(x² − 3) = 0 at x = 0 and x = ±√3. The curve comes up from −∞, rises through (−√3, 0) to the maximum (−1, 2), falls through the origin to the minimum (1, −2), then rises through (√3, 0) to +∞.`,
    explanation: "Intercepts, stationary points and end behaviour fix the shape of a cubic sketch.",
    hints: ["Factorise y to find the x-intercepts."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`Just to the left of a stationary point $\dfrac{dy}{dx} < 0$, and just to the right $\dfrac{dy}{dx} > 0$. What kind of stationary point is it?`,
    options: [
      ["A minimum", "Correct: the curve falls into the point and rises out of it."],
      ["A maximum", "A maximum has the curve rising then falling (+ then −)."],
      ["A stationary point of inflexion", "At such a point dy/dx has the same sign on both sides."],
      ["A point where the curve crosses the x-axis", "The sign of dy/dx says nothing about where y = 0."],
    ],
    answer: "A",
    explanation: t`Gradient negative then positive: the curve goes down, levels off, then goes up, so the point is a (local) minimum.`,
  });

  // struct 4: closed cylinder volume 16π; A = 2πr² + 32π/r; r = 2, A = 24π
  const A18 = (r) => 2 * PI * r * r + (32 * PI) / r;
  checkDeriv(A18, (r) => 4 * PI * r - (32 * PI) / (r * r), XS, "q18");
  chk(A18(2), 24 * PI, 1e-9);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`A closed cylindrical water container made by a Bulawayo tinsmith has radius $r$ cm, height $h$ cm and volume $16\pi$ cm$^3$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the total surface area is $A = 2\pi r^{2} + \dfrac{32\pi}{r}$.`,
        points: [t`M1 uses $\pi r^{2}h = 16\pi$ to get $h = \dfrac{16}{r^{2}}$`, t`A1 substitutes into $A = 2\pi r^{2} + 2\pi rh$ to reach the given result`],
        modelAnswer: ["$$", t`\pi r^{2}h = 16\pi \Rightarrow h = \frac{16}{r^{2}}`, "$$", "", "$$", t`A = 2\pi r^{2} + 2\pi r \cdot \frac{16}{r^{2}} = 2\pi r^{2} + \frac{32\pi}{r}`, "$$"].join("\n"),
        explanation: "Two circular ends plus the curved surface; eliminate h with the volume." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the value of r for which A is stationary.", prefix: "r =", value: 2, wrong: [4],
        explanation: t`$\frac{dA}{dr} = 4\pi r - \frac{32\pi}{r^{2}} = 0$ gives $r^{3} = 8$, $r = 2$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find this stationary value of A, correct to 3 significant figures, and note that it is a minimum.", unit: "cm²", value: A18(2), wrong: [24],
        explanation: t`$A = 8\pi + 16\pi = 24\pi \approx 75.4$ cm$^2$. $\frac{d^{2}A}{dr^{2}} = 4\pi + \frac{64\pi}{r^{3}} > 0$, so it is the least area.` }),
    ],
    explanation: "Set up A in one variable, differentiate, solve, then check the nature with the second derivative.",
    hints: ["h = 16/r².", "Solve 4πr = 32π/r²."],
  });

  // struct 5: f = x³ − 3x² − 9x + 2: stationary at −1 (max 7) and 3 (min −25); three roots for −25 < k < 7
  const f19 = (x) => x ** 3 - 3 * x * x - 9 * x + 2;
  checkDeriv(f19, (x) => 3 * (x - 3) * (x + 1), XS, "q19");
  chk(f19(-1), 7); chk(f19(3), -25);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Let $f(x) = x^{3} - 3x^{2} - 9x + 2$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the x-coordinates of the stationary points of y = f(x), smaller first.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: 1 }, { id: "b", input: "number", accepted: [3], wrong: -3 }],
        explanation: t`$f'(x) = 3x^{2} - 6x - 9 = 3(x - 3)(x + 1) = 0$ at $x = -1$ and $x = 3$.` }),
      P.mcq({ label: "(b)", marks: 1, stem: t`Using $f''(x)$, what is the nature of the stationary point at $x = 3$?`,
        options: [
          ["A minimum, because f″(3) = 12 > 0", "Correct: f″(x) = 6x − 6 = 12 at x = 3."],
          ["A maximum, because f″(3) = 12 > 0", "A positive second derivative indicates a minimum."],
          ["A maximum, because f″(3) = −12 < 0", "f″(3) = 6(3) − 6 = 12, which is positive."],
          ["A point of inflexion, because f′(3) = 0", "f′(3) = 0 only shows that the point is stationary."],
        ],
        answer: "A", explanation: t`$f''(x) = 6x - 6$; $f''(3) = 12 > 0$, so a minimum.` }),
      P.fib({ label: "(c)", marks: 2, stem: "The equation f(x) = k has three distinct real roots. Find the range of values of k.", template: "{{blank:lo}} < k < {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [-25], wrong: -1 }, { id: "hi", input: "number", accepted: [7], wrong: 3 }],
        explanation: t`The maximum value is $f(-1) = 7$ and the minimum value is $f(3) = -25$. The line $y = k$ cuts the curve three times when $-25 < k < 7$.` }),
    ],
    explanation: "The turning values of a cubic decide how many times a horizontal line meets it.",
    hints: ["f′(x) = 3(x² − 2x − 3).", "Find f(−1) and f(3)."],
  });

  // struct 5 ZP: y = 4x³ − x⁴: stationary x = 0, 3 (max (3, 27)); inflexion x = 0, 2
  const f20 = (x) => 4 * x ** 3 - x ** 4;
  checkDeriv(f20, (x) => 4 * x * x * (3 - x), XS, "q20 y'");
  checkDeriv((x) => 12 * x * x - 4 * x ** 3, (x) => 12 * x * (2 - x), XS, "q20 y''");
  chk(f20(3), 27); chk(f20(2), 16);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, applies: ZP,
    stem: t`A curve has equation $y = 4x^{3} - x^{4}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the coordinates of the maximum point.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [3], wrong: 0 }, { id: "y", input: "number", accepted: [27], wrong: 0 }],
        explanation: t`$\frac{dy}{dx} = 12x^{2} - 4x^{3} = 4x^{2}(3 - x) = 0$ at $x = 0$ or $3$. $\frac{d^{2}y}{dx^{2}} = 24x - 12x^{2} = -36 < 0$ at $x = 3$: maximum $(3, 108 - 81) = (3, 27)$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the x-coordinates of the two points of inflexion, smaller first.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [0], wrong: 3 }, { id: "b", input: "number", accepted: [2], wrong: 3 }],
        explanation: t`$\frac{d^{2}y}{dx^{2}} = 12x(2 - x)$ is zero at $x = 0$ and $x = 2$ and changes sign at each.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement describes the origin?",
        options: [
          ["A stationary point of inflexion", "Correct: dy/dx = 0 there and d²y/dx² changes sign."],
          ["A minimum point", "dy/dx = 4x²(3 − x) is positive on both sides of 0, so there is no turn."],
          ["A maximum point", "The only maximum is at (3, 27)."],
          ["A non-stationary point of inflexion", "dy/dx = 0 at the origin, so this inflexion is stationary."],
        ],
        answer: "A", explanation: t`At $x = 0$: $\frac{dy}{dx} = 0$ and $\frac{d^{2}y}{dx^{2}} = 12x(2 - x)$ changes from negative to positive, so the origin is a stationary point of inflexion.` }),
    ],
    explanation: t`ZIMSEC: points of inflexion are where $\frac{d^{2}y}{dx^{2}}$ changes sign; one of them may also be stationary.`,
    hints: ["Factorise both derivatives.", "Check the sign of d²y/dx² either side of each zero."],
  });

  b.card("DEFINITION", "Stationary point", t`A point where $\dfrac{dy}{dx} = 0$ (horizontal tangent): a maximum, a minimum or a stationary point of inflexion.`);
  b.card("FORMULA", "Second-derivative test", t`At a stationary point: $\dfrac{d^{2}y}{dx^{2}} < 0$ maximum, $> 0$ minimum, $= 0$ inconclusive.`);
  b.card("CONCEPT", "First-derivative (sign) test", t`Sign of $\frac{dy}{dx}$ either side: $+, -$ maximum; $-, +$ minimum; same sign: stationary inflexion.`);
  b.card("DEFINITION", "Point of inflexion (ZIMSEC)", t`A point where $\dfrac{d^{2}y}{dx^{2}}$ changes sign (the curve changes from concave to convex).`, undefined, { applies: ZP });
  b.card("CONCEPT", "Optimisation method", "Express the quantity in one variable using the constraint; differentiate; set to zero; justify max/min; answer with units.");
  b.card("FACT", t`Example: $y = x^{4}$ at the origin`, t`$y' = y'' = 0$, yet it is a minimum: a zero second derivative does not mean inflexion.`);
  b.card("CONCEPT", "Number of roots of f(x) = k", "Count how often the line y = k meets y = f(x); the maximum and minimum values are the boundaries.");
  b.card("FACT", "Points of inflexion in Cambridge 9709", "Excluded: Cambridge classifies stationary points only as maxima or minima.");
});
