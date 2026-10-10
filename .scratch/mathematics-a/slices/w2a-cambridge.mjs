// W2a exam-format items for Cambridge 9709: C1s ×2 (6), C1l ×2 (9), C2s ×2 (7), C2l ×1 (11), C3s ×2 (6), C3l ×3 (9).
// Every value is computed and checked here.
import { concept, P, t, chk, same, checkDeriv, checkAntideriv, integrate, quad, CAM } from "../lib.mjs";

const { exp, log, sin, cos, tan, sqrt, PI, E, abs } = Math;
const Q = (k) => `amaths.${k}`;
const XS = [0.6, 1.3, 2.4];
const I = (f, a, b, exact, label) => chk(integrate(f, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);
const N = (id, x, wrong, extra = {}) => ({ id, input: "number", accepted: [x], wrong, ...extra });
const D = (id, x, dp, wrong, extra = {}) => ({ id, input: "number", accepted: [x.toFixed(dp)], tolerance: 0.5 * 10 ** -dp, wrong, ...extra });
const h = 1e-6;

concept(Q("diff.stationary-points"), { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C1s-1 (6): y = 3√x + 12/x, minimum at (4, 9)
  const y1 = (x) => 3 * sqrt(x) + 12 / x;
  const y1p = (x) => 1.5 * x ** -0.5 - 12 * x ** -2;
  const y1pp = (x) => -0.75 * x ** -1.5 + 24 * x ** -3;
  checkDeriv(y1, y1p, XS, "C1s-1 y'"); checkDeriv(y1p, y1pp, XS, "C1s-1 y''");
  chk(y1p(4), 0, 1e-12); chk(y1(4), 9); chk(y1pp(4), 0.28125, 1e-12);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("diff.stationary-points"), Q("diff.powers-chain")],
    stem: t`A curve has equation $y = 3\sqrt{x} + \dfrac{12}{x}$ for $x > 0$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $\dfrac{dy}{dx}$ in the form $px^{-\frac{1}{2}} + qx^{-2}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [D("p", 1.5, 1, 3), N("q", -12, 12)],
        explanation: t`$y = 3x^{\frac{1}{2}} + 12x^{-1}$, so $\frac{dy}{dx} = \frac{3}{2}x^{-\frac{1}{2}} - 12x^{-2}$: $p = 1.5$, $q = -12$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the coordinates of the stationary point.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 4, 2), N("y", 9, 0)],
        explanation: t`$\frac{3}{2}x^{-\frac{1}{2}} = 12x^{-2}$ gives $x^{\frac{3}{2}} = 8$, so $x = 4$ and $y = 3 \times 2 + 3 = 9$.` }),
      P.mcq({ label: "(c)", marks: 2, stem: "Determine the nature of the stationary point.",
        options: [
          [t`Minimum, since $\frac{d^{2}y}{dx^{2}} = \frac{9}{32} > 0$ at $x = 4$`, t`Correct: $\frac{d^{2}y}{dx^{2}} = -\frac{3}{4}x^{-\frac{3}{2}} + 24x^{-3} = -\frac{3}{32} + \frac{12}{32}$.`],
          [t`Maximum, since $\frac{d^{2}y}{dx^{2}} = -\frac{3}{32} < 0$ at $x = 4$`, "Only the first term of the second derivative has been used."],
          [t`Maximum, since $\frac{d^{2}y}{dx^{2}} = \frac{9}{32} > 0$ at $x = 4$`, "A positive second derivative indicates a minimum."],
          [t`Minimum, since $y = 9 > 0$ at $x = 4$`, "The sign of y says nothing about the nature of a stationary point."],
        ],
        answer: "A", explanation: t`$\frac{d^{2}y}{dx^{2}} = -\frac{3}{4}x^{-\frac{3}{2}} + 24x^{-3}$; at $x = 4$ this is $-\frac{3}{32} + \frac{24}{64} = \frac{9}{32} > 0$, a minimum.` }),
    ],
    explanation: "Rewrite in index form, differentiate, solve dy/dx = 0, and classify with the second derivative.",
    hints: ["Write √x and 12/x as powers of x.", "x^(3/2) = 8 gives x = 4."],
  });

  // ---------------------------------------------------------------- C1s-2 (6): area between y = x² − 4x + 5 and y = 2x
  same(quad.roots(1, -6, 5), [1, 5]);
  const a2 = I((x) => 2 * x - (x * x - 4 * x + 5), 1, 5, 32 / 3, "C1s-2");
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("integ.definite-area")],
    stem: t`The curve $y = x^{2} - 4x + 5$ and the line $y = 2x$ intersect at the points $A$ and $B$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the x-coordinates of A and B, smaller first.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [N("a", 1, -1), N("b", 5, -5)],
        explanation: t`$x^{2} - 4x + 5 = 2x$ gives $x^{2} - 6x + 5 = (x - 1)(x - 5) = 0$.` }),
      P.proof({ label: "(b)", marks: 1, stem: t`Show that the area of the region enclosed by the curve and the line is $\displaystyle\int_{1}^{5}(6x - x^{2} - 5)\,dx$.`,
        points: [t`B1 states the line is above the curve between the intersections and writes $\int_{1}^{5}\left[2x - (x^{2} - 4x + 5)\right]dx$`],
        modelAnswer: t`Between $x = 1$ and $x = 5$ the line is above the curve (at $x = 3$: $6 > 2$), so the area is $\int_{1}^{5}\left[2x - (x^{2} - 4x + 5)\right]dx = \int_{1}^{5}(6x - x^{2} - 5)\,dx$.`,
        explanation: "Upper minus lower." }),
      P.num({ label: "(c)", marks: 3, stem: "Find this area, giving your answer as an exact fraction or to 3 significant figures.", unit: "units²", value: a2, wrong: [-10.67, 18.67],
        explanation: t`$\Big[3x^{2} - \tfrac{x^{3}}{3} - 5x\Big]_{1}^{5} = \left(75 - \tfrac{125}{3} - 25\right) - \left(3 - \tfrac{1}{3} - 5\right) = \tfrac{25}{3} + \tfrac{7}{3} = \tfrac{32}{3}$.` }),
    ],
    explanation: "Find the intersections, then integrate upper minus lower between them.",
    hints: ["Set the two expressions equal.", "Check which graph is on top at x = 3."],
  });

  // ---------------------------------------------------------------- C1l-1 (9): open tank, square base, volume 32
  const A3 = (x) => x * x + 128 / x;
  const A3p = (x) => 2 * x - 128 / (x * x);
  checkDeriv(A3, A3p, XS, "C1l-1");
  chk(A3p(4), 0, 1e-12); chk(A3(4), 48);
  const rate3 = A3p(2) * 0.05;
  chk(rate3, -1.4, 1e-12);
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("diff.stationary-points"), Q("diff.applications")],
    stem: t`An open water tank at a fish farm near Kariba has a square base of side $x$ m and height $h$ m. Its volume is 32 m$^3$. The tank has no lid.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the total outer surface area is $A = x^{2} + \dfrac{128}{x}$.`,
        points: [t`M1 uses $x^{2}h = 32$ to write $h = \dfrac{32}{x^{2}}$`, t`A1 substitutes into $A = x^{2} + 4xh$ to reach the given result`],
        modelAnswer: ["$$", t`x^{2}h = 32 \Rightarrow h = \frac{32}{x^{2}}, \qquad A = x^{2} + 4xh = x^{2} + 4x \cdot \frac{32}{x^{2}} = x^{2} + \frac{128}{x}`, "$$"].join("\n"),
        explanation: "The base plus four vertical sides; no lid." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the value of x for which A is stationary.", prefix: "x =", unit: "m", value: 4, wrong: [8],
        explanation: t`$\frac{dA}{dx} = 2x - \frac{128}{x^{2}} = 0$ gives $x^{3} = 64$, $x = 4$.` }),
      P.mcq({ label: "(c)", marks: 2, stem: "Determine whether this stationary value is a maximum or a minimum.",
        options: [
          [t`Minimum: $\frac{d^{2}A}{dx^{2}} = 2 + \frac{256}{x^{3}} = 6 > 0$`, "Correct: the second derivative is positive."],
          [t`Maximum: $\frac{d^{2}A}{dx^{2}} = 2 - \frac{256}{x^{3}} = -2 < 0$`, t`Sign slip: $\frac{d}{dx}(-128x^{-2}) = +256x^{-3}$.`],
          [t`Minimum: $\frac{d^{2}A}{dx^{2}} = 2x = 8 > 0$`, t`The derivative of $-\frac{128}{x^{2}}$ has been left out.`],
          [t`Maximum: $\frac{dA}{dx} = 0$ there`, "dA/dx = 0 only shows that the point is stationary."],
        ],
        answer: "A", explanation: t`$\frac{d^{2}A}{dx^{2}} = 2 + 256x^{-3} = 2 + 4 = 6 > 0$ at $x = 4$, so $A$ is a minimum.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the least possible surface area.", unit: "m²", value: A3(4), wrong: [16],
        explanation: t`$A = 16 + 32 = 48$ m$^2$.` }),
      P.num({ label: "(e)", marks: 1, stem: "A design is tested in which x increases at 0.05 m per second. Find the rate of change of A, in m² per second, at the instant when x = 2.", value: rate3, wrong: [1.4],
        explanation: t`$\frac{dA}{dt} = \frac{dA}{dx} \times \frac{dx}{dt} = (4 - 32) \times 0.05 = -1.4$ m$^2$ per second, i.e. decreasing.` }),
    ],
    explanation: "Optimisation with a constraint, followed by a connected rate of change.",
    hints: ["Eliminate h using the volume.", "dA/dt = dA/dx × dx/dt."],
  });

  // ---------------------------------------------------------------- C1l-2 (9): dy/dx = 3√x − 4 through (4, 5)
  const y4 = (x) => 2 * x ** 1.5 - 4 * x + 5;
  checkDeriv(y4, (x) => 3 * sqrt(x) - 4, XS, "C1l-2");
  chk(y4(4), 5);
  const xs4 = 16 / 9;
  chk(3 * sqrt(xs4) - 4, 0, 1e-12);
  const ys4 = y4(xs4);
  chk(ys4, 71 / 27, 1e-12);
  const area4 = 0.8 * 32 - 32 + 20;
  chk(integrate(y4, 0, 4, 400000), area4, 1e-6, "C1l-2 area");
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("integ.reverse-powers"), Q("integ.definite-area"), Q("diff.stationary-points")],
    stem: t`A curve has $\dfrac{dy}{dx} = 3\sqrt{x} - 4$ for $x \geq 0$, and passes through the point $P(4, 5)$.`,
    parts: [
      P.expr({ label: "(a)", marks: 3, stem: "Find the equation of the curve. Type it as y = …, for example y=3x^(3/2)-x+2.",
        accepted: ["y=2x^(3/2)-4x+5", "y=2x^1.5-4x+5", "y=2x√x-4x+5", "y=5-4x+2x^(3/2)", "y=2x^(3/2)+5-4x"], wrong: ["y=2x^(3/2)-4x"],
        explanation: t`$y = \frac{3x^{3/2}}{3/2} - 4x + c = 2x^{\frac{3}{2}} - 4x + c$. At $P$: $16 - 16 + c = 5$, so $c = 5$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the coordinates of the stationary point, correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [D("x", xs4, 2, 1.33), D("y", ys4, 2, 5)],
        explanation: t`$3\sqrt{x} = 4$ gives $x = \frac{16}{9} \approx 1.78$; $y = 2\left(\frac{4}{3}\right)^{3} - \frac{64}{9} + 5 = \frac{71}{27} \approx 2.63$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the area of the region bounded by the curve, the axes and the line x = 4.", unit: "units²", value: area4, wrong: [6.4],
        explanation: t`$\int_{0}^{4}\left(2x^{\frac{3}{2}} - 4x + 5\right)dx = \Big[\tfrac{4}{5}x^{\frac{5}{2}} - 2x^{2} + 5x\Big]_{0}^{4} = 25.6 - 32 + 20 = 13.6$. (The curve is above the axis throughout, since its minimum value is positive.)` }),
      P.expr({ label: "(d)", marks: 2, stem: "Find the equation of the normal to the curve at P, in the form y = mx + c.",
        accepted: ["y=-0.5x+7", "y=-x/2+7", "y=-1/2x+7", "y=7-x/2", "y=7-0.5x", "y=(-1/2)x+7"], wrong: ["y=2x-3"],
        explanation: t`At $x = 4$: $\frac{dy}{dx} = 6 - 4 = 2$, so the normal gradient is $-\frac{1}{2}$: $y - 5 = -\frac{1}{2}(x - 4)$, $y = -\frac{1}{2}x + 7$.` }),
    ],
    explanation: "Integrate the gradient with the point to fix c, then use the curve for a stationary point, an area and a normal.",
    hints: ["∫ 3x^(1/2) dx = 2x^(3/2).", "The minimum of the curve is above the x-axis."],
  });

  // ---------------------------------------------------------------- C2s-1 (7): y = x² e^(−x/2)
  const y5 = (x) => x * x * exp(-x / 2);
  const y5p = (x) => exp(-x / 2) * (2 * x - 0.5 * x * x);
  checkDeriv(y5, y5p, XS, "C2s-1");
  chk(y5p(4), 0, 1e-12);
  const n5 = -1 / y5p(2);
  chk(n5, -E / 2, 1e-12);
  b.struct({
    d: 3, marks: 7, secs: 90 * 7, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("diff.product-quotient"), Q("diff.exp-log-trig")],
    stem: t`A curve has equation $y = x^{2}\mathrm{e}^{-\frac{x}{2}}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $\dfrac{dy}{dx}$ in the form $\mathrm{e}^{-\frac{x}{2}}(ax + bx^{2})$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [N("a", 2, 1), D("b", -0.5, 1, 0.5)],
        explanation: t`Product rule: $2x\mathrm{e}^{-\frac{x}{2}} + x^{2} \cdot \left(-\tfrac{1}{2}\right)\mathrm{e}^{-\frac{x}{2}} = \mathrm{e}^{-\frac{x}{2}}\left(2x - \tfrac{1}{2}x^{2}\right)$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "The curve has a stationary point other than the origin. Find its coordinates, giving y correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 4, 2), D("y", y5(4), 2, 16)],
        explanation: t`$x\left(2 - \tfrac{x}{2}\right) = 0$ gives $x = 4$; $y = 16\mathrm{e}^{-2} \approx 2.17$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the gradient of the normal to the curve at the point where x = 2, correct to 3 significant figures.", value: n5, wrong: [0.736, 1.36],
        explanation: t`At $x = 2$: $\frac{dy}{dx} = \mathrm{e}^{-1}(4 - 2) = \frac{2}{\mathrm{e}}$, so the normal gradient is $-\frac{\mathrm{e}}{2} \approx -1.36$.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "What is the nature of the stationary point at the origin?",
        options: [
          ["A minimum", t`Correct: $y = x^{2}\mathrm{e}^{-x/2} \geq 0$ with $y = 0$ only at the origin.`],
          ["A maximum", "y is never negative, so the origin cannot be a maximum."],
          ["Neither, because dy/dx is not zero there", "dy/dx = 0 at x = 0."],
          ["A point where the curve crosses the x-axis", "The curve touches the x-axis at the origin but does not cross it."],
        ],
        answer: "A", explanation: t`$\frac{dy}{dx} = x\mathrm{e}^{-x/2}(2 - \frac{x}{2})$ changes from negative to positive at $x = 0$, so the origin is a minimum.` }),
    ],
    explanation: "Product rule with an exponential factor; factorise before solving dy/dx = 0.",
    hints: ["d/dx e^(−x/2) = −(1/2)e^(−x/2).", "Factorise x e^(−x/2) out of the derivative."],
  });

  // ---------------------------------------------------------------- C2s-2 (7): x² + 2xy − 3y² = 9
  const F6 = (x, y) => x * x + 2 * x * y - 3 * y * y - 9;
  const sl6 = (x, y) => -((F6(x + h, y) - F6(x - h, y)) / (2 * h)) / ((F6(x, y + h) - F6(x, y - h)) / (2 * h));
  chk(F6(3, 0), 0); chk(sl6(3, 0), -1, 1e-6);
  const xv6 = (3 * sqrt(3)) / 2;
  chk(F6(xv6, xv6 / 3), 0, 1e-12);
  b.struct({
    d: 4, marks: 7, secs: 90 * 7, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("diff.implicit-parametric")],
    stem: t`A curve has equation $x^{2} + 2xy - 3y^{2} = 9$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $\dfrac{dy}{dx} = \dfrac{x + y}{3y - x}$.`,
        points: [t`B1 differentiates $2xy$ correctly: $2x\frac{dy}{dx} + 2y$`, t`B1 differentiates $3y^{2}$ correctly: $6y\frac{dy}{dx}$`, t`A1 rearranges to the given result`],
        modelAnswer: ["$$", t`2x + 2x\frac{dy}{dx} + 2y - 6y\frac{dy}{dx} = 0 \Rightarrow (2x - 6y)\frac{dy}{dx} = -(2x + 2y) \Rightarrow \frac{dy}{dx} = \frac{x + y}{3y - x}`, "$$"].join("\n"),
        explanation: "Product rule on 2xy and the chain rule on y²." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the gradient of the curve at the point (3, 0).", value: -1, wrong: [1],
        explanation: t`$\frac{3 + 0}{0 - 3} = -1$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "The tangent to the curve is parallel to the y-axis at two points. Find the coordinates of the one with x > 0, correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [D("x", xv6, 2, 3, { marks: 2 }), D("y", xv6 / 3, 3, 1, { marks: 1 })],
        explanation: t`Vertical tangent: $3y - x = 0$, so $x = 3y$. Then $9y^{2} + 6y^{2} - 3y^{2} = 12y^{2} = 9$, $y = \frac{\sqrt{3}}{2} \approx 0.866$ and $x = \frac{3\sqrt{3}}{2} \approx 2.60$.` }),
    ],
    explanation: "Implicit differentiation; a vertical tangent is where the denominator of dy/dx is zero.",
    hints: ["Use the product rule on 2xy.", "Substitute x = 3y into the curve's equation."],
  });

  // ---------------------------------------------------------------- C2l (11): standard integrals
  const a7 = I((x) => (sin(x) + cos(x)) ** 2, 0, PI / 4, PI / 4 + 0.5, "C2l a");
  const b7 = I((x) => (exp(x) + 1) ** 2, 0, log(3), 8 + log(3), "C2l b");
  const c7 = I((x) => 1 / (2 * x + 1), 0, 4, log(3), "C2l c");
  const d7 = I((x) => tan(x) ** 2, 0, PI / 3, sqrt(3) - PI / 3, "C2l d");
  b.struct({
    d: 4, marks: 11, secs: 90 * 11, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("integ.standard-functions")],
    stem: "This question is about four definite integrals. Give exact answers where asked.",
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $\displaystyle\int_{0}^{\pi/4}(\sin x + \cos x)^{2}\,dx = \frac{\pi}{4} + \frac{1}{2}$.`,
        points: [t`M1 expands and uses $\sin^{2}x + \cos^{2}x = 1$ and $2\sin x\cos x = \sin 2x$`, t`M1 integrates to $\Big[x - \tfrac{1}{2}\cos 2x\Big]$`, t`A1 substitutes the limits to obtain $\frac{\pi}{4} + \frac{1}{2}$`],
        modelAnswer: ["$$", t`(\sin x + \cos x)^{2} = 1 + \sin 2x`, "$$", "", "$$", t`\int_{0}^{\pi/4}(1 + \sin 2x)\,dx = \Big[x - \tfrac{1}{2}\cos 2x\Big]_{0}^{\pi/4} = \left(\tfrac{\pi}{4} - 0\right) - \left(0 - \tfrac{1}{2}\right) = \tfrac{\pi}{4} + \tfrac{1}{2}`, "$$"].join("\n"),
        explanation: "Expanding the square and using two identities leaves 1 + sin 2x." }),
      P.expr({ label: "(b)", marks: 3, stem: t`Find the exact value of $\displaystyle\int_{0}^{\ln 3}(\mathrm{e}^{x} + 1)^{2}\,dx$, in the form $a + \ln b$. Type it as, for example, 5+ln2.`,
        accepted: ["8+ln3", "ln3+8", "8+ln(3)", "ln(3)+8"], wrong: ["10.5+ln3"],
        explanation: t`$\int(\mathrm{e}^{2x} + 2\mathrm{e}^{x} + 1)\,dx = \Big[\tfrac{1}{2}\mathrm{e}^{2x} + 2\mathrm{e}^{x} + x\Big]_{0}^{\ln 3} = (4.5 + 6 + \ln 3) - (0.5 + 2) = 8 + \ln 3$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the area of the region bounded by $y = \dfrac{1}{2x + 1}$, the axes and the line $x = 4$, correct to 3 significant figures.`, unit: "units²", value: c7, wrong: [2.20],
        explanation: t`$\Big[\tfrac{1}{2}\ln(2x + 1)\Big]_{0}^{4} = \tfrac{1}{2}\ln 9 = \ln 3 \approx 1.10$. (2.20 forgets the $\frac{1}{2}$.)` }),
      P.num({ label: "(d)", marks: 3, stem: t`Evaluate $\displaystyle\int_{0}^{\pi/3}\tan^{2}x\,dx$, correct to 3 significant figures.`, value: d7, wrong: [2.78, 1.73],
        explanation: t`$\tan^{2}x = \sec^{2}x - 1$: $\Big[\tan x - x\Big]_{0}^{\pi/3} = \sqrt{3} - \frac{\pi}{3} \approx 0.685$.` }),
    ],
    explanation: "Each integral needs an identity or an expansion before a standard result applies.",
    hints: ["(sin x + cos x)² = 1 + sin 2x.", "tan²x = sec²x − 1."],
  });
  chk(c7, log(3), 1e-9);

  // ---------------------------------------------------------------- C3s-1 (6): ∫₀^{π/2} x² sin x dx = π − 2
  const v8 = I((x) => x * x * sin(x), 0, PI / 2, PI - 2, "C3s-1");
  b.struct({
    d: 4, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("integ.by-parts")],
    stem: t`Let $I = \displaystyle\int_{0}^{\pi/2} x^{2}\sin x\,dx$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $I = 2\displaystyle\int_{0}^{\pi/2} x\cos x\,dx$.`,
        points: [t`M1 uses $u = x^{2}$, $v = -\cos x$: $\Big[-x^{2}\cos x\Big]_{0}^{\pi/2} + \int_{0}^{\pi/2} 2x\cos x\,dx$`, t`A1 notes $\Big[-x^{2}\cos x\Big]_{0}^{\pi/2} = 0$`],
        modelAnswer: ["$$", t`I = \Big[-x^{2}\cos x\Big]_{0}^{\pi/2} + \int_{0}^{\pi/2} 2x\cos x\,dx = (0 - 0) + 2\int_{0}^{\pi/2} x\cos x\,dx`, "$$"].join("\n"),
        explanation: t`$\cos\frac{\pi}{2} = 0$ makes the boundary term vanish.` }),
      P.expr({ label: "(b)", marks: 2, stem: "Hence find the exact value of I. Type pi for π, for example 2pi-3.",
        accepted: ["π-2", "pi-2", "-2+π", "-2+pi"], wrong: ["π+2"],
        explanation: t`$\int_{0}^{\pi/2} x\cos x\,dx = \Big[x\sin x + \cos x\Big]_{0}^{\pi/2} = \frac{\pi}{2} - 1$, so $I = \pi - 2$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Give the value of I correct to 3 significant figures.", value: v8, wrong: [5.14],
        explanation: t`$\pi - 2 \approx 1.14$.` }),
    ],
    explanation: "Integration by parts twice, the second time on x cos x.",
    hints: ["Take u = x² first.", "Then u = x for the remaining integral."],
  });

  // ---------------------------------------------------------------- C3s-2 (6): ∫₂⁵ x/√(x − 1) dx, u = √(x − 1) -> 20/3
  const v9 = I((x) => x / sqrt(x - 1), 2, 5, 20 / 3, "C3s-2");
  I((u) => 2 * (u * u + 1), 1, 2, 20 / 3, "C3s-2 u");
  b.struct({
    d: 4, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("integ.recognition-substitution")],
    stem: t`Use the substitution $u = \sqrt{x - 1}$ to evaluate $\displaystyle\int_{2}^{5}\frac{x}{\sqrt{x - 1}}\,dx$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that the integral becomes $2\displaystyle\int_{1}^{2}(u^{2} + 1)\,du$.`,
        points: [t`B1 writes $x = u^{2} + 1$ and $dx = 2u\,du$`, t`B1 changes the limits: $x = 2 \to u = 1$, $x = 5 \to u = 2$`, t`A1 simplifies $\dfrac{u^{2} + 1}{u} \cdot 2u$ to $2(u^{2} + 1)$`],
        modelAnswer: ["$$", t`\int_{2}^{5}\frac{x}{\sqrt{x - 1}}\,dx = \int_{1}^{2}\frac{u^{2} + 1}{u} \cdot 2u\,du = 2\int_{1}^{2}(u^{2} + 1)\,du`, "$$"].join("\n"),
        explanation: "Replace x, dx and the limits." }),
      P.num({ label: "(b)", marks: 3, stem: "Hence find the value of the integral, as an exact fraction or correct to 3 significant figures.", value: v9, wrong: [3.33, 10],
        explanation: t`$2\Big[\tfrac{u^{3}}{3} + u\Big]_{1}^{2} = 2\left(\tfrac{8}{3} + 2 - \tfrac{1}{3} - 1\right) = 2 \times \tfrac{10}{3} = \tfrac{20}{3} \approx 6.67$.` }),
    ],
    explanation: "A given substitution: change x, dx and the limits, then integrate a polynomial.",
    hints: ["u² = x − 1, so 2u du = dx.", "When x = 5, u = 2."],
  });

  // ---------------------------------------------------------------- C3l-1 (9): (3x² + 10x + 10)/((x + 2)(x + 1)²)
  const f10 = (x) => (3 * x * x + 10 * x + 10) / ((x + 2) * (x + 1) ** 2);
  for (const x of [0.3, 1.7, 4.2]) chk(f10(x), 2 / (x + 2) + 1 / (x + 1) + 3 / (x + 1) ** 2, 1e-12, "C3l-1 pf");
  const v10 = I(f10, 0, 1, log(4.5) + 1.5, "C3l-1");
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("integ.partial-fractions")],
    stem: t`Let $f(x) = \dfrac{3x^{2} + 10x + 10}{(x + 2)(x + 1)^{2}}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`Express $f(x)$ in the form $\dfrac{A}{x + 2} + \dfrac{B}{x + 1} + \dfrac{C}{(x + 1)^{2}}$.`, template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
        blanks: [N("A", 2, 6, { marks: 1 }), N("B", 1, -1, { marks: 2 }), N("C", 3, -3, { marks: 1 })],
        explanation: t`$3x^{2} + 10x + 10 \equiv A(x + 1)^{2} + B(x + 2)(x + 1) + C(x + 2)$. $x = -2$: $12 - 20 + 10 = 2 = A$. $x = -1$: $3 = C$. $x^{2}$: $3 = A + B$, $B = 1$.` }),
      P.expr({ label: "(b)", marks: 3, stem: t`Hence find $\displaystyle\int_{0}^{1} f(x)\,dx$ in the form $p + \ln q$. Type it as, for example, 2.5+ln(7/2).`,
        accepted: ["1.5+ln(9/2)", "3/2+ln(9/2)", "1.5+ln4.5", "ln(9/2)+3/2", "ln(9/2)+1.5", "ln4.5+1.5", "3/2+ln4.5", "1.5+ln(4.5)"], wrong: ["1.5+ln(9/4)"],
        explanation: t`$\Big[2\ln(x + 2) + \ln(x + 1) - \tfrac{3}{x + 1}\Big]_{0}^{1} = (2\ln 3 + \ln 2 - \tfrac{3}{2}) - (2\ln 2 - 3) = \tfrac{3}{2} + \ln\tfrac{9}{2}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Give the value of the integral correct to 3 significant figures.", value: v10, wrong: [2.31],
        explanation: t`$1.5 + \ln 4.5 \approx 3.00$.` }),
    ],
    explanation: "Partial fractions with a repeated factor; the squared term integrates to a power, not a logarithm.",
    hints: ["Substitute x = −2 and x = −1, then compare x² coefficients.", "∫ 3/(x + 1)² dx = −3/(x + 1)."],
  });

  // ---------------------------------------------------------------- C3l-2 (9): x = 3t − t³, y = 3t²
  const X11 = (s) => 3 * s - s ** 3;
  const Y11 = (s) => 3 * s * s;
  const ps = (s) => (Y11(s + h) - Y11(s - h)) / (X11(s + h) - X11(s - h));
  for (const s of [0.3, 2, 2.5]) chk(ps(s), (2 * s) / (1 - s * s), 1e-5, "C3l-2");
  chk(X11(2), -2); chk(Y11(2), 12); chk(ps(2), -4 / 3, 1e-6);
  chk(X11(1), 2); chk(Y11(1), 3);
  chk(-1 / ps(0.5), -0.75, 1e-6);
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 3",
    concepts: [Q("diff.implicit-parametric")],
    stem: t`A curve has parametric equations $x = 3t - t^{3}$, $y = 3t^{2}$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: "Find dy/dx in terms of t. Type it as a single fraction, for example 3t/(2-t^2).",
        accepted: ["2t/(1-t^2)", "6t/(3-3t^2)", "-2t/(t^2-1)", "2t/(1-t²)", "2t/((1-t)(1+t))", "2t/((1+t)(1-t))"], wrong: ["(1-t^2)/(2t)"],
        explanation: t`$\frac{dx}{dt} = 3 - 3t^{2}$, $\frac{dy}{dt} = 6t$, so $\frac{dy}{dx} = \frac{6t}{3 - 3t^{2}} = \frac{2t}{1 - t^{2}}$.` }),
      P.expr({ label: "(b)", marks: 3, stem: "Find the equation of the tangent at the point where t = 2, in the form ax + by = c with integers a, b, c.",
        accepted: ["4x+3y=28", "3y+4x=28", "4x+3y-28=0", "-4x-3y=-28", "y=-4/3x+28/3", "y=(28-4x)/3"], wrong: ["4x+3y=36"],
        explanation: t`At $t = 2$: $(-2, 12)$ and $\frac{dy}{dx} = \frac{4}{-3}$. Tangent: $y - 12 = -\frac{4}{3}(x + 2)$, so $3y - 36 = -4x - 8$, i.e. $4x + 3y = 28$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "The tangent is parallel to the y-axis at two points. Find the coordinates of the one with x > 0.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 2, -2), N("y", 3, 12)],
        explanation: t`Vertical tangent: $1 - t^{2} = 0$, $t = \pm 1$. $t = 1$ gives $(2, 3)$; $t = -1$ gives $(-2, 3)$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the gradient of the normal at the point where t = 1/2.", value: -0.75, wrong: [1.33, 0.75],
        explanation: t`At $t = \frac{1}{2}$: $\frac{dy}{dx} = \frac{1}{3/4} = \frac{4}{3}$, so the normal gradient is $-\frac{3}{4}$.` }),
    ],
    explanation: "Parametric gradient, then tangents and normals identified by the parameter.",
    hints: ["dy/dx = (dy/dt) ÷ (dx/dt).", "A vertical tangent has dx/dt = 0."],
  });

  // ---------------------------------------------------------------- C3l-3 (9): y = ln x / √x; max at x = e²; area 1..e² = 4
  const y12 = (x) => log(x) / sqrt(x);
  checkDeriv(y12, (x) => (2 - log(x)) / (2 * x ** 1.5), XS, "C3l-3");
  const ym = y12(E * E);
  chk(ym, 2 / E, 1e-12);
  checkAntideriv((x) => 2 * sqrt(x) * log(x) - 4 * sqrt(x), y12, 1, 5, "C3l-3 anti");
  const ar12 = I(y12, 1, E * E, 4, "C3l-3 area");
  b.struct({
    d: 5, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("integ.by-parts"), Q("diff.product-quotient")],
    stem: t`The curve $y = \dfrac{\ln x}{\sqrt{x}}$, for $x > 0$, has one maximum point $M$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: "Find the exact x-coordinate of M. Type e^ for powers of e, for example e^3.",
        accepted: ["e^2", "e²", "exp(2)", "e^(2)"], wrong: ["2", "e"],
        explanation: t`Quotient rule: $\frac{dy}{dx} = \dfrac{\sqrt{x} \cdot \frac{1}{x} - \ln x \cdot \frac{1}{2\sqrt{x}}}{x} = \dfrac{2 - \ln x}{2x^{3/2}}$, zero when $\ln x = 2$, $x = \mathrm{e}^{2}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the y-coordinate of M, correct to 3 significant figures.", value: ym, wrong: [0.270],
        explanation: t`$y = \dfrac{2}{\mathrm{e}} \approx 0.736$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that $\displaystyle\int\frac{\ln x}{\sqrt{x}}\,dx = 2\sqrt{x}\ln x - 4\sqrt{x} + c$.`,
        points: [t`M1 uses $u = \ln x$, $v = 2\sqrt{x}$: $2\sqrt{x}\ln x - \int 2\sqrt{x} \cdot \frac{1}{x}\,dx$`, t`A1 integrates $2x^{-\frac{1}{2}}$ to $4\sqrt{x}$ and reaches the given result`],
        modelAnswer: ["$$", t`\int x^{-\frac{1}{2}}\ln x\,dx = 2x^{\frac{1}{2}}\ln x - \int 2x^{\frac{1}{2}} \cdot \frac{1}{x}\,dx = 2\sqrt{x}\ln x - \int 2x^{-\frac{1}{2}}\,dx = 2\sqrt{x}\ln x - 4\sqrt{x} + c`, "$$"].join("\n"),
        explanation: "Take u = ln x so that it simplifies to 1/x." }),
      P.num({ label: "(d)", marks: 3, stem: t`Hence find the area of the region bounded by the curve, the $x$-axis and the line $x = \mathrm{e}^{2}$.`, unit: "units²", value: ar12, wrong: [0, 8],
        explanation: t`The curve meets the $x$-axis at $x = 1$. Area $= \Big[2\sqrt{x}\ln x - 4\sqrt{x}\Big]_{1}^{\mathrm{e}^{2}} = (4\mathrm{e} - 4\mathrm{e}) - (0 - 4) = 4$.` }),
    ],
    explanation: "Quotient rule for the maximum; integration by parts for the area, starting where the curve crosses the axis.",
    hints: ["Use the quotient rule or write y = x^(−1/2) ln x.", "The region starts at x = 1, where ln x = 0."],
  });
});
