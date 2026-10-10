// W2a exam-format items for ZIMSEC Pure Mathematics: ZP1 ×4 (10), ZP2A ×2 (8), ZP2B ×2 (16).
// They emphasise ZIMSEC-only content: first principles, points of inflexion, improper partial fractions, a substitution the
// candidate chooses, parametric to Cartesian. Every value is computed and checked here.
import { concept, P, t, chk, same, checkDeriv, checkAntideriv, integrate, quad, ZP } from "../lib.mjs";

const { exp, log, sqrt, PI, E, abs } = Math;
const Q = (k) => `amaths.${k}`;
const XS = [0.6, 1.3, 2.4];
const I = (f, a, b, exact, label) => chk(integrate(f, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);
const N = (id, x, wrong, extra = {}) => ({ id, input: "number", accepted: [x], wrong, ...extra });
const D = (id, x, dp, wrong, extra = {}) => ({ id, input: "number", accepted: [x.toFixed(dp)], tolerance: 0.5 * 10 ** -dp, wrong, ...extra });

concept(Q("diff.first-principles"), { file: "exam/w2a-zimsec-pure", keyPrefix: "exam.w2a-zimsec-pure", applies: ZP }, (b) => {
  // ---------------------------------------------------------------- ZP1-1 (10): first principles f(x) = 2x² − 5x
  const f1 = (x) => 2 * x * x - 5 * x;
  for (const [x, hh] of [[1.5, 0.3], [3, 0.01]]) chk((f1(x + hh) - f1(x)) / hh, 4 * x + 2 * hh - 5, 1e-9, "ZP1-1 chord");
  chk(f1(3), 3); chk(3 + 7 * f1(3), 24); chk(f1(2), -2);
  b.struct({
    d: 3, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("diff.first-principles"), Q("diff.applications")],
    stem: t`Let $f(x) = 2x^{2} - 5x$.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`Differentiate $f(x)$ from first principles.`,
        points: [
          t`M1 writes $f(x + h) = 2(x + h)^{2} - 5(x + h) = 2x^{2} + 4xh + 2h^{2} - 5x - 5h$`,
          t`M1 simplifies $f(x + h) - f(x) = 4xh + 2h^{2} - 5h$`,
          t`M1 divides by $h$: $4x + 2h - 5$`,
          t`A1 lets $h \to 0$ (limit stated) to obtain $f'(x) = 4x - 5$`,
        ],
        modelAnswer: ["$$", t`f(x + h) - f(x) = 2(x + h)^{2} - 5(x + h) - 2x^{2} + 5x = 4xh + 2h^{2} - 5h`, "$$", "", "$$", t`f'(x) = \lim_{h \to 0}\frac{4xh + 2h^{2} - 5h}{h} = \lim_{h \to 0}(4x + 2h - 5) = 4x - 5`, "$$"].join("\n"),
        explanation: "Expand, subtract, cancel h, then take the limit." }),
      P.expr({ label: "(b)", marks: 1, stem: "State f′(x). Type it in terms of x, for example 6x+1.", accepted: ["4x-5", "-5+4x"], wrong: ["4x+2h-5"],
        explanation: t`$f'(x) = 4x - 5$.` }),
      P.expr({ label: "(c)", marks: 2, stem: "Find the equation of the normal to the curve y = f(x) at the point where x = 3, in the form ax + by = c with integers a, b, c.",
        accepted: ["x+7y=24", "7y+x=24", "x+7y-24=0", "y=-x/7+24/7", "y=(24-x)/7", "-x-7y=-24"], wrong: ["7x-y=18"],
        explanation: t`At $x = 3$: $y = 18 - 15 = 3$ and $f'(3) = 7$. Normal gradient $-\frac{1}{7}$: $7y - 21 = -x + 3$, so $x + 7y = 24$.` }),
      P.fib({ label: "(d)", marks: 2, stem: "Find the coordinates of the point on the curve at which the tangent is parallel to the line y = 3x + 1.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 2, 3), N("y", -2, 7)],
        explanation: t`$4x - 5 = 3$ gives $x = 2$, and $y = 8 - 10 = -2$.` }),
      P.mcq({ label: "(e)", marks: 1, stem: t`What is $f''(x)$?`,
        options: [["4", "Correct: the derivative of 4x − 5."], ["4x", "The derivative of 4x is 4, not 4x."], ["4x − 5", "That is f′(x)."], ["0", "Only the derivative of the constant −5 is 0."]],
        answer: "A", explanation: t`$f''(x) = \frac{d}{dx}(4x - 5) = 4$.` }),
    ],
    explanation: "ZIMSEC: first principles, then use the derivative for a normal and a parallel tangent.",
    hints: ["Replace every x by x + h.", "Parallel lines have equal gradients."],
  });

  // ---------------------------------------------------------------- ZP1-2 (10): y = 2x³ + 3x² − 12x + 1
  const g2 = (x) => 2 * x ** 3 + 3 * x * x - 12 * x + 1;
  checkDeriv(g2, (x) => 6 * (x + 2) * (x - 1), XS, "ZP1-2");
  chk(g2(-2), 21); chk(g2(1), -6); chk(g2(-0.5), 7.5);
  b.struct({
    d: 3, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("diff.stationary-points")],
    stem: t`A curve has equation $y = 2x^{3} + 3x^{2} - 12x + 1$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Find the coordinates of the two stationary points, the one with the smaller x first.", template: "({{blank:a}}, {{blank:b}}) and ({{blank:c}}, {{blank:d}})",
        blanks: [N("a", -2, 2), N("b", 21, -11), N("c", 1, -1), N("d", -6, 15)],
        explanation: t`$\frac{dy}{dx} = 6x^{2} + 6x - 12 = 6(x + 2)(x - 1)$: $x = -2$, $y = -16 + 12 + 24 + 1 = 21$; $x = 1$, $y = 2 + 3 - 12 + 1 = -6$.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "Using the second derivative, what is the nature of the stationary point at x = 1?",
        options: [["A minimum, since d²y/dx² = 18 > 0", "Correct: d²y/dx² = 12x + 6."], ["A maximum, since d²y/dx² = 18 > 0", "A positive second derivative indicates a minimum."], ["A minimum, since d²y/dx² = −6 < 0", "12(1) + 6 = 18, not −6."], ["A point of inflexion", "The second derivative is not zero at x = 1."]],
        answer: "A", explanation: t`$\frac{d^{2}y}{dx^{2}} = 12x + 6 = 18 > 0$ at $x = 1$: a minimum.` }),
      P.fib({ label: "(c)", marks: 2, stem: "Find the coordinates of the point of inflexion, as decimals.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [D("x", -0.5, 1, 0.5), D("y", 7.5, 1, 1)],
        explanation: t`$\frac{d^{2}y}{dx^{2}} = 12x + 6 = 0$ at $x = -\frac{1}{2}$, and it changes sign there. $y = -\frac{1}{4} + \frac{3}{4} + 6 + 1 = 7.5$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe a sketch of the curve, labelling the stationary points, the point of inflexion and the y-intercept.",
        points: ["Rises from −∞ to the maximum (−2, 21), falls through the inflexion (−0.5, 7.5) and the y-intercept (0, 1) to the minimum (1, −6), then rises to +∞", "All four labelled points shown with correct coordinates"],
        modelAnswer: "An S-shaped cubic: it comes up from −∞, reaches a maximum at (−2, 21), falls through the point of inflexion (−0.5, 7.5) and crosses the y-axis at (0, 1), reaches a minimum at (1, −6), then rises to +∞.",
        explanation: "Positive leading coefficient: the curve falls to −∞ on the left and rises to +∞ on the right." }),
      P.num({ label: "(e)", marks: 1, stem: "How many real roots does the equation 2x³ + 3x² − 12x + 1 = 0 have?", value: 3, wrong: [1],
        explanation: t`The maximum value 21 is positive and the minimum value $-6$ is negative, so the curve crosses the $x$-axis three times.` }),
    ],
    explanation: "Stationary points, their nature, the ZIMSEC point of inflexion, and a sketch.",
    hints: ["Factorise 6x² + 6x − 12.", "A point of inflexion is where d²y/dx² changes sign."],
  });

  // ---------------------------------------------------------------- ZP1-3 (10): improper PF and a chosen substitution
  const g3 = (x) => (x * x + x + 2) / (x * x - 1);
  for (const x of [1.5, 2.7, 4.1]) chk(g3(x), 1 + 2 / (x - 1) - 1 / (x + 1), 1e-12, "ZP1-3 pf");
  const v3 = I(g3, 2, 3, 1 + log(3), "ZP1-3");
  I((x) => x / (x * x - 1), 2, 3, 0.5 * log(8 / 3), "ZP1-3 sub");
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("integ.partial-fractions"), Q("integ.recognition-substitution")],
    stem: t`Let $g(x) = \dfrac{x^{2} + x + 2}{x^{2} - 1}$, $x > 1$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $g(x)$ in the form $P + \dfrac{A}{x - 1} + \dfrac{B}{x + 1}$.`, template: "P = {{blank:P}}, A = {{blank:A}}, B = {{blank:B}}",
        blanks: [N("P", 1, 0), N("A", 2, 1), N("B", -1, 1)],
        explanation: t`Divide: $g(x) = 1 + \dfrac{x + 3}{x^{2} - 1}$. Then $x + 3 \equiv A(x + 1) + B(x - 1)$: $x = 1$ gives $A = 2$, $x = -1$ gives $B = -1$.` }),
      P.expr({ label: "(b)", marks: 3, stem: t`Hence find $\displaystyle\int_{2}^{3} g(x)\,dx$ in the form $p + \ln q$. Type it as, for example, 2+ln5.`,
        accepted: ["1+ln3", "ln3+1", "1+ln(3)", "ln(3)+1"], wrong: ["ln3"],
        explanation: t`$\Big[x + 2\ln(x - 1) - \ln(x + 1)\Big]_{2}^{3} = (3 + 2\ln 2 - \ln 4) - (2 - \ln 3) = 1 + \ln 3$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Give the value of the integral correct to 3 significant figures.", value: v3, wrong: [1.10],
        explanation: t`$1 + \ln 3 \approx 2.10$.` }),
      P.proof({ label: "(d)", marks: 3, stem: t`Using a suitable substitution, show that $\displaystyle\int_{2}^{3}\frac{x}{x^{2} - 1}\,dx = \frac{1}{2}\ln\frac{8}{3}$.`,
        points: [t`M1 chooses $u = x^{2} - 1$ with $du = 2x\,dx$`, t`M1 changes the limits to $u = 3$ and $u = 8$ and obtains $\frac{1}{2}\int_{3}^{8}\frac{1}{u}\,du$`, t`A1 evaluates $\frac{1}{2}(\ln 8 - \ln 3) = \frac{1}{2}\ln\frac{8}{3}$`],
        modelAnswer: ["With $u = x^{2} - 1$, $du = 2x\\,dx$ and the limits become 3 and 8:", "", "$$", t` \int_{2}^{3}\frac{x}{x^{2} - 1}\,dx = \frac{1}{2}\int_{3}^{8}\frac{du}{u} = \frac{1}{2}\Big[\ln u\Big]_{3}^{8} = \frac{1}{2}\ln\frac{8}{3}`, "$$"].join("\n"),
        explanation: "ZIMSEC expects you to choose the substitution: the denominator, whose derivative appears on top." }),
    ],
    explanation: "ZIMSEC improper partial fractions, then an integral by a chosen substitution.",
    hints: ["The degrees are equal: divide first.", "Let u be the denominator."],
  });

  // ---------------------------------------------------------------- ZP1-4 (10): x = t + 1, y = 2/t
  const X4 = (s) => s + 1;
  const Y4 = (s) => 2 / s;
  const hh = 1e-6;
  chk((Y4(2 + hh) - Y4(2 - hh)) / (X4(2 + hh) - X4(2 - hh)), -0.5, 1e-6, "ZP1-4 slope");
  chk(X4(2) + 2 * Y4(2), 5);
  I((x) => 2 / (x - 1), 2, 3, 2 * log(2), "ZP1-4 area");
  const vol4 = PI * I((x) => 4 / (x - 1) ** 2, 2, 3, 2, "ZP1-4 vol");
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("diff.implicit-parametric"), Q("integ.volumes")],
    stem: t`A curve $C$ has parametric equations $x = t + 1$, $y = \dfrac{2}{t}$, for $t > 0$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: "Find a Cartesian equation of C. Type it as y = …", accepted: ["y=2/(x-1)", "y=2(x-1)^-1", "y=2(x-1)^(-1)", "y=2/(-1+x)"], wrong: ["y=2/(x+1)"],
        explanation: t`$t = x - 1$, so $y = \dfrac{2}{x - 1}$ (for $x > 1$).` }),
      P.expr({ label: "(b)", marks: 2, stem: "Find dy/dx in terms of t. Type it as a fraction, for example -3/t^2.", accepted: ["-2/t^2", "-2t^-2", "-2t^(-2)", "-2/t²", "(-2)/t^2"], wrong: ["2/t^2"],
        explanation: t`$\frac{dx}{dt} = 1$ and $\frac{dy}{dt} = -\frac{2}{t^{2}}$, so $\frac{dy}{dx} = -\frac{2}{t^{2}}$.` }),
      P.expr({ label: "(c)", marks: 2, stem: "Find the equation of the tangent to C at the point where t = 2, in the form ax + by = c with integers a, b, c.",
        accepted: ["x+2y=5", "2y+x=5", "x+2y-5=0", "y=-x/2+5/2", "y=-0.5x+2.5", "y=(5-x)/2"], wrong: ["2x+y=7"],
        explanation: t`At $t = 2$: $(3, 1)$ and $\frac{dy}{dx} = -\frac{1}{2}$. Tangent: $y - 1 = -\frac{1}{2}(x - 3)$, i.e. $x + 2y = 5$.` }),
      P.proof({ label: "(d)", marks: 2, stem: t`The region $R$ is bounded by $C$, the $x$-axis and the lines $x = 2$ and $x = 3$. Show that the area of $R$ is $2\ln 2$.`,
        points: [t`M1 writes the area as $\int_{2}^{3}\frac{2}{x - 1}\,dx = \Big[2\ln(x - 1)\Big]_{2}^{3}$`, t`A1 evaluates $2\ln 2 - 2\ln 1 = 2\ln 2$`],
        modelAnswer: ["$$", t`\int_{2}^{3}\frac{2}{x - 1}\,dx = \Big[2\ln(x - 1)\Big]_{2}^{3} = 2\ln 2 - 0 = 2\ln 2`, "$$"].join("\n"),
        explanation: "Use the Cartesian equation from (a)." }),
      P.num({ label: "(e)", marks: 2, stem: "R is rotated through 360° about the x-axis. Find the volume of the solid formed, correct to 3 significant figures.", unit: "units³", value: vol4, wrong: [2, 4.36],
        explanation: t`$V = \pi\int_{2}^{3}\frac{4}{(x - 1)^{2}}\,dx = 4\pi\Big[-\tfrac{1}{x - 1}\Big]_{2}^{3} = 4\pi\left(-\tfrac{1}{2} + 1\right) = 2\pi \approx 6.28$.` }),
    ],
    explanation: "ZIMSEC: convert parametric equations to Cartesian form, then use both forms for a tangent, an area and a volume.",
    hints: ["Eliminate t using x = t + 1.", "Square y for the volume."],
  });
  chk(PI * 2 * log(2), 4.355, 1e-3, "ZP1-4 wrong");

  // ---------------------------------------------------------------- ZP2A-1 (8): first principles f(x) = 1/(2x + 1)
  const f5 = (x) => 1 / (2 * x + 1);
  checkDeriv(f5, (x) => -2 / (2 * x + 1) ** 2, XS, "ZP2A-1");
  chk(2 * 1 + 9 * f5(1), 5, 1e-12);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 2",
    concepts: [Q("diff.first-principles"), Q("diff.applications")],
    stem: t`Let $f(x) = \dfrac{1}{2x + 1}$, $x \neq -\tfrac{1}{2}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: "Differentiate f(x) from first principles.",
        points: [
          t`M1 writes $f(x + h) - f(x) = \dfrac{1}{2x + 2h + 1} - \dfrac{1}{2x + 1}$`,
          t`M1 combines to $\dfrac{-2h}{(2x + 2h + 1)(2x + 1)}$`,
          t`M1 divides by $h$`,
          t`A1 lets $h \to 0$ to obtain $f'(x) = -\dfrac{2}{(2x + 1)^{2}}$`,
        ],
        modelAnswer: ["$$", t`f(x + h) - f(x) = \frac{(2x + 1) - (2x + 2h + 1)}{(2x + 2h + 1)(2x + 1)} = \frac{-2h}{(2x + 2h + 1)(2x + 1)}`, "$$", "", "$$", t`f'(x) = \lim_{h \to 0}\frac{-2}{(2x + 2h + 1)(2x + 1)} = -\frac{2}{(2x + 1)^{2}}`, "$$"].join("\n"),
        explanation: "A common denominator first; then the factor h cancels." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the gradient of the curve y = f(x) at x = 1, correct to 3 significant figures.", value: -2 / 9, wrong: [-0.667],
        explanation: t`$f'(1) = -\frac{2}{9} \approx -0.222$.` }),
      P.expr({ label: "(c)", marks: 3, stem: "Find the equation of the tangent at x = 1, in the form ax + by = c with integers a, b, c.",
        accepted: ["2x+9y=5", "9y+2x=5", "2x+9y-5=0", "-2x-9y=-5", "y=-2x/9+5/9", "y=(5-2x)/9"], wrong: ["2x+9y=3"],
        explanation: t`At $x = 1$: $y = \frac{1}{3}$. $y - \frac{1}{3} = -\frac{2}{9}(x - 1)$; multiply by 9: $9y - 3 = -2x + 2$, so $2x + 9y = 5$.` }),
    ],
    explanation: "ZIMSEC first principles for a rational function, then a tangent.",
    hints: ["Use the common denominator (2x + 2h + 1)(2x + 1).", "Find y at x = 1 before writing the tangent."],
  });

  // ---------------------------------------------------------------- ZP2A-2 (8): y = ln(x² + 1), inflexion at x = ±1
  const y6 = (x) => log(x * x + 1);
  const y6p = (x) => (2 * x) / (x * x + 1);
  const y6pp = (x) => (2 * (1 - x * x)) / (x * x + 1) ** 2;
  checkDeriv(y6, y6p, XS, "ZP2A-2 y'"); checkDeriv(y6p, y6pp, XS, "ZP2A-2 y''");
  chk(y6pp(1), 0); chk(y6p(1), 1);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("diff.stationary-points"), Q("diff.exp-log-trig"), Q("diff.product-quotient")],
    stem: t`A curve has equation $y = \ln(x^{2} + 1)$.`,
    parts: [
      P.expr({ label: "(a)", marks: 1, stem: "Find dy/dx. Type it as a fraction, for example 3x/(x^2+2).", accepted: ["2x/(x^2+1)", "2x/(1+x^2)", "2x/(x²+1)"], wrong: ["1/(x^2+1)"],
        explanation: t`$\frac{dy}{dx} = \frac{2x}{x^{2} + 1}$.` }),
      P.proof({ label: "(b)", marks: 3, stem: t`Show that $\dfrac{d^{2}y}{dx^{2}} = \dfrac{2(1 - x^{2})}{(x^{2} + 1)^{2}}$.`,
        points: [t`M1 applies the quotient rule to $\frac{2x}{x^{2} + 1}$`, t`A1 obtains $\dfrac{2(x^{2} + 1) - 2x \cdot 2x}{(x^{2} + 1)^{2}}$`, t`A1 simplifies to the given result`],
        modelAnswer: ["$$", t`\frac{d^{2}y}{dx^{2}} = \frac{2(x^{2} + 1) - 2x(2x)}{(x^{2} + 1)^{2}} = \frac{2 - 2x^{2}}{(x^{2} + 1)^{2}} = \frac{2(1 - x^{2})}{(x^{2} + 1)^{2}}`, "$$"].join("\n"),
        explanation: "Quotient rule on the first derivative." }),
      P.fib({ label: "(c)", marks: 2, stem: "Find the coordinates of the point of inflexion with x > 0, giving y correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 1, 0), D("y", log(2), 3, 0)],
        explanation: t`$\frac{d^{2}y}{dx^{2}} = 0$ at $x = \pm 1$ and changes sign there. At $x = 1$: $y = \ln 2 \approx 0.693$.` }),
      P.num({ label: "(d)", marks: 1, stem: "Find the gradient of the curve at this point of inflexion.", value: 1, wrong: [0],
        explanation: t`$\frac{dy}{dx} = \frac{2}{2} = 1$ at $x = 1$: a non-stationary point of inflexion.` }),
      P.mcq({ label: "(e)", marks: 1, stem: "What is the nature of the stationary point at the origin?",
        options: [["A minimum", "Correct: y = ln(x² + 1) ≥ 0, and y = 0 only at x = 0."], ["A maximum", "y is never negative, so the origin is the lowest point."], ["A point of inflexion", "d²y/dx² = 2 > 0 at x = 0."], ["Not stationary", "dy/dx = 0 at x = 0."]],
        answer: "A", explanation: t`$\frac{d^{2}y}{dx^{2}} = 2 > 0$ at $x = 0$: a minimum.` }),
    ],
    explanation: "Logarithm and quotient rule derivatives; ZIMSEC points of inflexion.",
    hints: ["d/dx ln f = f′/f.", "Inflexion: d²y/dx² changes sign."],
  });

  // ---------------------------------------------------------------- ZP2B-1 (16): f(x) = x e^(−x/2)
  const f7 = (x) => x * exp(-x / 2);
  const f7p = (x) => exp(-x / 2) * (1 - x / 2);
  const f7pp = (x) => exp(-x / 2) * (x / 4 - 1);
  checkDeriv(f7, f7p, XS, "ZP2B-1 f'"); checkDeriv(f7p, f7pp, XS, "ZP2B-1 f''");
  const m7 = f7p(4);
  const c7 = f7(4) - 4 * m7;
  chk(c7, 8 * exp(-2), 1e-12);
  checkAntideriv((x) => -2 * (x + 2) * exp(-x / 2), f7, 0, 3, "ZP2B-1 anti");
  const a7 = I(f7, 0, 2, 4 - 8 / E, "ZP2B-1 area");
  b.struct({
    d: 5, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("diff.stationary-points"), Q("diff.product-quotient"), Q("integ.by-parts")],
    stem: t`The function $f$ is defined by $f(x) = x\mathrm{e}^{-\frac{x}{2}}$ for $x \geq 0$.`,
    parts: [
      P.group({ label: "(a)", stem: "Stationary point.", parts: [
        P.fib({ label: "(i)", marks: 2, stem: t`Find $f'(x)$ in the form $\mathrm{e}^{-\frac{x}{2}}(a + bx)$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [N("a", 1, 2), D("b", -0.5, 1, 0.5)],
          explanation: t`$f'(x) = \mathrm{e}^{-\frac{x}{2}} - \frac{x}{2}\mathrm{e}^{-\frac{x}{2}} = \mathrm{e}^{-\frac{x}{2}}\left(1 - \frac{x}{2}\right)$.` }),
        P.fib({ label: "(ii)", marks: 2, stem: "Find the coordinates of the stationary point, giving y correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}})",
          blanks: [N("x", 2, 1), D("y", f7(2), 3, 2)],
          explanation: t`$1 - \frac{x}{2} = 0$ at $x = 2$; $y = 2\mathrm{e}^{-1} \approx 0.736$.` }),
      ] }),
      P.group({ label: "(b)", stem: "Second derivative.", parts: [
        P.proof({ label: "(i)", marks: 2, stem: t`Show that $f''(x) = \mathrm{e}^{-\frac{x}{2}}\left(\dfrac{x}{4} - 1\right)$.`,
          points: [t`M1 differentiates $\mathrm{e}^{-\frac{x}{2}}\left(1 - \frac{x}{2}\right)$ by the product rule`, t`A1 simplifies $-\frac{1}{2}\left(1 - \frac{x}{2}\right) - \frac{1}{2}$ to $\frac{x}{4} - 1$`],
          modelAnswer: ["$$", t`f''(x) = -\tfrac{1}{2}\mathrm{e}^{-\frac{x}{2}}\left(1 - \tfrac{x}{2}\right) + \mathrm{e}^{-\frac{x}{2}}\left(-\tfrac{1}{2}\right) = \mathrm{e}^{-\frac{x}{2}}\left(\tfrac{x}{4} - 1\right)`, "$$"].join("\n"),
          explanation: "Product rule again." }),
        P.mcq({ label: "(ii)", marks: 1, stem: "Hence state the nature of the stationary point.",
          options: [["A maximum, since f″(2) = −e⁻¹/2 < 0", "Correct: x/4 − 1 = −1/2 at x = 2."], ["A minimum, since f″(2) > 0", "f″(2) = e⁻¹(1/2 − 1) is negative."], ["A point of inflexion, since f″(2) = 0", "f″(2) is not zero."], ["A maximum, since f(2) > 0", "The sign of f does not decide the nature."]],
          answer: "A", explanation: t`$f''(2) = \mathrm{e}^{-1}\left(\frac{1}{2} - 1\right) < 0$: a maximum.` }),
      ] }),
      P.fib({ label: "(c)", marks: 2, stem: "Find the coordinates of the point of inflexion, giving y correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 4, 2), D("y", f7(4), 3, 4)],
        explanation: t`$f''(x) = 0$ when $\frac{x}{4} = 1$, $x = 4$, and $f''$ changes sign there. $y = 4\mathrm{e}^{-2} \approx 0.541$.` }),
      P.fib({ label: "(d)", marks: 3, stem: "Hence find the equation of the tangent at the point of inflexion, in the form y = mx + c, with m and c correct to 3 significant figures.", template: "m = {{blank:m}}, c = {{blank:c}}",
        blanks: [D("m", m7, 3, 0.135, { marks: 1 }), D("c", c7, 2, 0.541, { marks: 2 })],
        explanation: t`$m = f'(4) = \mathrm{e}^{-2}(1 - 2) = -\mathrm{e}^{-2} \approx -0.135$. $c = 4\mathrm{e}^{-2} - 4m = 8\mathrm{e}^{-2} \approx 1.08$.` }),
      P.group({ label: "(e)", stem: "Area.", parts: [
        P.proof({ label: "(i)", marks: 2, stem: t`Show that $\displaystyle\int x\mathrm{e}^{-\frac{x}{2}}\,dx = -2(x + 2)\mathrm{e}^{-\frac{x}{2}} + c$.`,
          points: [t`M1 uses parts with $u = x$, $v = -2\mathrm{e}^{-\frac{x}{2}}$: $-2x\mathrm{e}^{-\frac{x}{2}} + \int 2\mathrm{e}^{-\frac{x}{2}}\,dx$`, t`A1 integrates to $-2x\mathrm{e}^{-\frac{x}{2}} - 4\mathrm{e}^{-\frac{x}{2}}$ and factorises`],
          modelAnswer: ["$$", t`\int x\mathrm{e}^{-\frac{x}{2}}\,dx = -2x\mathrm{e}^{-\frac{x}{2}} + \int 2\mathrm{e}^{-\frac{x}{2}}\,dx = -2x\mathrm{e}^{-\frac{x}{2}} - 4\mathrm{e}^{-\frac{x}{2}} + c = -2(x + 2)\mathrm{e}^{-\frac{x}{2}} + c`, "$$"].join("\n"),
          explanation: t`$\int\mathrm{e}^{-\frac{x}{2}}\,dx = -2\mathrm{e}^{-\frac{x}{2}}$.` }),
        P.num({ label: "(ii)", marks: 2, stem: "Hence find the area of the region bounded by the curve, the x-axis and the line x = 2, correct to 3 significant figures.", unit: "units²", value: a7, wrong: [2.94],
          explanation: t`$\Big[-2(x + 2)\mathrm{e}^{-\frac{x}{2}}\Big]_{0}^{2} = -8\mathrm{e}^{-1} + 4 \approx 1.06$.` }),
      ] }),
    ],
    explanation: "A full ZIMSEC curve study: stationary point, inflexion, tangent, and an area by parts.",
    hints: ["Product rule with d/dx e^(−x/2) = −(1/2)e^(−x/2).", "For the area, integrate by parts with u = x."],
  });
  chk(8 / E, 2.943, 1e-3, "ZP2B-1 wrong");

  // ---------------------------------------------------------------- ZP2B-2 (16): y = 3/√((x + 1)(x + 4))
  const y8 = (x) => 3 / sqrt((x + 1) * (x + 4));
  for (const x of [0.4, 1.9, 3.3]) chk(3 / ((x + 1) * (x + 4)), 1 / (x + 1) - 1 / (x + 4), 1e-12, "ZP2B-2 pf");
  const v8a = PI * I((x) => y8(x) ** 2, 0, 2, 3 * log(2), "ZP2B-2 vol");
  const g8 = (x) => -1.5 * (2 * x + 5) * ((x + 1) * (x + 4)) ** -1.5;
  checkDeriv(y8, g8, XS, "ZP2B-2 y'");
  chk(g8(0), -0.9375, 1e-12);
  const vinf = 3 * PI * log(4);
  chk(PI * integrate((x) => y8(x) ** 2, 0, 1e4, 4000000) + 3 * PI * log((1e4 + 4) / (1e4 + 1)), vinf, 1e-5, "ZP2B-2 improper");
  same(Number(((4 * 2 + 4) / (2 + 4)).toFixed(6)), 2);
  b.struct({
    d: 5, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("integ.volumes"), Q("integ.partial-fractions"), Q("diff.powers-chain")],
    stem: t`A curve has equation $y = \dfrac{3}{\sqrt{(x + 1)(x + 4)}}$ for $x \geq 0$. Volumes are of solids formed by rotating regions through $360^\circ$ about the $x$-axis.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Express $\dfrac{3}{(x + 1)(x + 4)}$ in the form $\dfrac{A}{x + 1} + \dfrac{B}{x + 4}$.`, template: "A = {{blank:A}}, B = {{blank:B}}",
        blanks: [N("A", 1, 3), N("B", -1, 1)],
        explanation: t`$3 \equiv A(x + 4) + B(x + 1)$: $x = -1$ gives $A = 1$; $x = -4$ gives $B = -1$.` }),
      P.group({ label: "(b)", stem: "The region between the curve, the axes and the line x = 2 is rotated.", parts: [
        P.expr({ label: "(i)", marks: 3, stem: "Find the exact volume, in the form kπ ln m. Type pi for π, for example 2piln5.",
          accepted: ["3πln2", "3piln2", "3π*ln2", "3pi*ln2", "3πln(2)", "3piln(2)", "πln8", "piln8", "3ln2π", "3ln2*pi"], wrong: ["πln2"],
          explanation: t`$y^{2} = \frac{9}{(x + 1)(x + 4)} = 3\left(\frac{1}{x + 1} - \frac{1}{x + 4}\right)$. $V = 3\pi\Big[\ln\frac{x + 1}{x + 4}\Big]_{0}^{2} = 3\pi\left(\ln\frac{1}{2} - \ln\frac{1}{4}\right) = 3\pi\ln 2$.` }),
        P.num({ label: "(ii)", marks: 1, stem: "Give the volume correct to 3 significant figures.", unit: "units³", value: v8a, wrong: [2.18],
          explanation: t`$3\pi\ln 2 \approx 6.53$.` }),
      ] }),
      P.group({ label: "(c)", stem: "The gradient of the curve.", parts: [
        P.num({ label: "(i)", marks: 2, stem: "Find the gradient of the curve at the point where x = 0, as an exact decimal.", value: g8(0), dp: 4, wrong: [0.9375, -0.3125],
          explanation: t`$y = 3(x^{2} + 5x + 4)^{-\frac{1}{2}}$, so $\frac{dy}{dx} = -\frac{3}{2}(2x + 5)(x^{2} + 5x + 4)^{-\frac{3}{2}}$. At $x = 0$: $-\frac{3}{2} \times 5 \times \frac{1}{8} = -0.9375$.` }),
        P.proof({ label: "(ii)", marks: 2, stem: "Show that y is a decreasing function for x ≥ 0.",
          points: [t`M1 obtains $\frac{dy}{dx} = -\frac{3}{2}(2x + 5)\left[(x + 1)(x + 4)\right]^{-\frac{3}{2}}$`, t`A1 argues that $2x + 5 > 0$ and the bracket is positive for $x \geq 0$, so $\frac{dy}{dx} < 0$`],
          modelAnswer: t`For $x \geq 0$, $2x + 5 > 0$ and $(x + 1)(x + 4) > 0$, so $\frac{dy}{dx} = -\frac{3}{2}(2x + 5)[(x + 1)(x + 4)]^{-3/2} < 0$: y is decreasing.`,
          explanation: "Every factor except the −3/2 is positive." }),
      ] }),
      P.group({ label: "(d)", stem: "The unbounded region between the curve, the x-axis and the y-axis (all x ≥ 0) is rotated.", parts: [
        P.num({ label: "(i)", marks: 2, stem: "Find the volume, correct to 3 significant figures.", unit: "units³", value: vinf, wrong: [6.53, 4.16],
          explanation: t`$3\pi\Big[\ln\frac{x + 1}{x + 4}\Big]_{0}^{N} = 3\pi\left(\ln\frac{N + 1}{N + 4} + \ln 4\right) \to 3\pi\ln 4 \approx 13.1$ as $N \to \infty$.` }),
        P.manual({ label: "(ii)", marks: 2, stem: "Explain why this volume is finite even though the region extends to infinity.",
          points: [t`States that $\ln\frac{N + 1}{N + 4} \to \ln 1 = 0$ as $N \to \infty$, so the integral converges`, t`Links this to $y^{2}$ behaving like $\frac{9}{x^{2}}$ for large $x$, which falls fast enough`],
          modelAnswer: "As N → ∞, (N + 1)/(N + 4) → 1 and ln 1 = 0, so the volume tends to the finite limit 3π ln 4. For large x, y² is about 9/x², and the integral of 1/x² from a positive number to infinity is finite.",
          explanation: "An improper integral converges when the integrand shrinks fast enough." }),
      ] }),
      P.num({ label: "(e)", marks: 2, stem: "Find the value of k for which the volume generated by the region from x = 0 to x = k is half the volume in (d)(i).", prefix: "k =", value: 2, wrong: [4],
        explanation: t`$3\pi\ln\frac{4(k + 1)}{k + 4} = \frac{3\pi\ln 4}{2} = 3\pi\ln 2$, so $\frac{4(k + 1)}{k + 4} = 2$, $4k + 4 = 2k + 8$, $k = 2$ (as in (b)).` }),
    ],
    explanation: "Partial fractions make the volume integral a difference of logarithms; the improper case is a limit.",
    hints: ["Square y first: y² = 9/((x + 1)(x + 4)).", "ln((N + 1)/(N + 4)) → 0 as N → ∞."],
  });
  chk(PI * log(2), 2.178, 1e-3);
});
