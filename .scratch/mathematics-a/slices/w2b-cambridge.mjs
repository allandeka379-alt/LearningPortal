// W2b exam-format items for Cambridge 9709: C2s ×1 (7 marks, Paper 2), C3s ×3 (6, Paper 3), C3l ×2 (9, Paper 3).
// Every value is computed and checked here.
import { concept, P, t, chk, same, cx, poly, trapezium, integrate, root, iterate, deriv, CAM } from "../lib.mjs";

const { exp, sqrt, log, tan, atan, atan2, asin, PI, hypot } = Math;
const Q = (k) => `amaths.${k}`;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const pev = (c, z) => c.reduce((acc, a) => cx.add(cx.mul(acc, z), [a, 0]), [0, 0]);
const isRoot = (c, z, l) => { const v = pev(c, z); chk(v[0], 0, 1e-9, l); chk(v[1], 0, 1e-9, l); };

concept(Q("numerical.trapezium-errors"), { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C2s (7): trapezium rule, Paper 2
  const f = (x) => sqrt(1 + exp(x));
  const T = trapezium(f, 0, 2, 4);
  chk(T.value > integrate(f, 0, 2) ? 1 : 0, 1);
  for (const x of [0.2, 1, 1.8]) chk((deriv((u) => deriv(f, u, 1e-4), x, 1e-4) > 0) ? 1 : 0, 1);
  b.struct({
    d: 3, marks: 7, secs: 90 * 7, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("numerical.trapezium-errors")],
    stem: t`This question is about $I = \displaystyle\int_0^2 \sqrt{1 + \mathrm{e}^x}\,\mathrm{d}x$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the ordinates at x = 0.5 and x = 1.5, each correct to 4 decimal places.", template: "y(0.5) = {{blank:a}}, y(1.5) = {{blank:b}}",
        blanks: [D("a", T.ys[1].toFixed(4), 0.00005, "1.2840"), D("b", T.ys[3].toFixed(4), 0.00005, "2.1170")],
        explanation: t`$\sqrt{1 + \mathrm{e}^{0.5}} = \sqrt{2.6487} = 1.6275$ and $\sqrt{1 + \mathrm{e}^{1.5}} = \sqrt{5.4817} = 2.3413$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Use the trapezium rule with 4 intervals to find an approximation to I, giving your answer correct to 3 significant figures.", value: T.value, wrong: [2 * T.value, 3.21],
        explanation: t`$h = 0.5$; ordinates $1.4142, 1.6275, 1.9283, 2.3413, 2.8964$. $I \approx 0.25[1.4142 + 2(1.6275 + 1.9283 + 2.3413) + 2.8964] = 0.25 \times 16.1048 = 4.03$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Is the approximation in (b) an over-estimate or an under-estimate of I?",
        options: [
          ["An over-estimate", "Correct: the curve is convex on [0, 2], so the chords lie above it."],
          ["An under-estimate", "That would need the curve to bend downwards (concave)."],
          ["Exactly equal to I", "The trapezium rule is exact only for straight lines."],
          ["It cannot be decided", "The concavity does not change on [0, 2], so it can be decided."],
        ], answer: "A",
        explanation: "Convex curve ⇒ trapezium rule over-estimates." }),
      P.manual({ label: "(d)", marks: 2, stem: "Justify your answer to (c).", points: ["States that the curve y = √(1 + eˣ) bends upwards (is convex) for 0 ≤ x ≤ 2, e.g. from a sketch or because the gradient increases.", "Concludes that the top of each trapezium (a chord) lies above the curve, so the area of the trapezia exceeds I."],
        modelAnswer: "The gradient eˣ/(2√(1 + eˣ)) increases with x, so the curve is convex on [0, 2]. Each chord lies above the curve, so the trapezia include extra area: the estimate is too large.",
        explanation: "Refer to the shape of the curve, not just the answer." }),
    ],
    explanation: "Ordinates, the trapezium rule, and the concavity argument for over- or under-estimation.",
    hints: ["Four intervals need five ordinates.", "Decide whether the curve bends up or down."],
  });

  // ---------------------------------------------------------------- C3s-1 (6): complex division, modulus, argument
  const z1 = cx.div([2, 3], [1, -1]);
  chk(z1[0], -0.5); chk(z1[1], 2.5);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("complex.cartesian"), Q("complex.argand-polar")],
    stem: t`The complex number $u$ is given by $u = \dfrac{2 + 3\mathrm{i}}{1 - \mathrm{i}}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Showing all necessary working, express $u$ in the form $x + \mathrm{i}y$, where $x$ and $y$ are real.`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [D("x", -0.5, 0.001, "2", 1), D("y", 2.5, 0.001, "1", 2)],
        explanation: t`$u = \dfrac{(2 + 3\mathrm{i})(1 + \mathrm{i})}{(1 - \mathrm{i})(1 + \mathrm{i})} = \dfrac{2 + 2\mathrm{i} + 3\mathrm{i} - 3}{2} = -\dfrac{1}{2} + \dfrac{5}{2}\mathrm{i}$.` }),
      P.fib({ label: "(b)", marks: 3, stem: t`Find the modulus and the argument of $u$, giving the argument in radians in the interval $-\pi < \theta \le \pi$. Give both correct to 3 significant figures.`, template: "|u| = {{blank:m}}, arg u = {{blank:a}}",
        blanks: [D("m", 2.55, 0.005, "6.5", 1), D("a", 1.77, 0.005, "-1.37", 2)],
        explanation: t`$|u| = \sqrt{0.25 + 6.25} = \sqrt{6.5} = 2.55$. $u$ is in the second quadrant: $\arg u = \pi - \tan^{-1}5 = 1.77$. (The calculator's $\tan^{-1}(-5) = -1.37$ is in the wrong quadrant.)` }),
    ],
    explanation: "Divide using the conjugate of the denominator, then find modulus and argument from a sketch.",
    hints: ["Multiply numerator and denominator by 1 + i.", "Which quadrant is u in?"],
  });
  chk(cx.mod(z1), sqrt(6.5)); chk(Math.abs(cx.mod(z1) - 2.55) < 0.005 ? 1 : 0, 1); chk(Math.abs(cx.arg(z1) - 1.77) < 0.005 ? 1 : 0, 1);

  // ---------------------------------------------------------------- C3s-2 (6): separable DE with tan⁻¹
  const y = (x) => tan(x * x + PI / 4);
  for (const x of [0.1, 0.3, 0.6]) chk(deriv(y, x), 2 * x * (1 + y(x) ** 2), 1e-5);
  b.struct({
    d: 4, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("de.separable")],
    stem: t`The variables $x$ and $y$ satisfy the differential equation $\dfrac{\mathrm{d}y}{\mathrm{d}x} = 2x(1 + y^2)$, and $y = 1$ when $x = 0$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Solve the differential equation, showing that $\tan^{-1}y = x^2 + \frac{1}{4}\pi$.`,
        points: [t`M1 separates: $\int \frac{1}{1 + y^2}\,\mathrm{d}y = \int 2x\,\mathrm{d}x$.`, t`A1 integrates: $\tan^{-1}y = x^2 + c$.`, t`A1 uses $y = 1$ at $x = 0$: $c = \tan^{-1}1 = \frac{1}{4}\pi$.`],
        modelAnswer: t`$$
\int \frac{1}{1 + y^2}\,\mathrm{d}y = \int 2x\,\mathrm{d}x \Rightarrow \tan^{-1}y = x^2 + c
$$
$$
x = 0, y = 1: \; c = \tan^{-1}1 = \tfrac{1}{4}\pi \Rightarrow \tan^{-1}y = x^2 + \tfrac{1}{4}\pi
$$`,
        explanation: t`$\int \frac{1}{1 + y^2}\,\mathrm{d}y = \tan^{-1}y$ is in MF19.` }),
      P.num({ label: "(b)", marks: 3, stem: t`Hence find the value of $y$ when $x = 0.5$, giving your answer correct to 3 significant figures.`, value: y(0.5), wrong: [tan(0.25) + 1, tan(0.5 + PI / 4)],
        explanation: t`$y = \tan\left(0.25 + \frac{\pi}{4}\right) = \tan 1.0354 = 1.69$ (radians).`,
        hints: ["Use radians."] }),
    ],
    explanation: "Separate the variables; the y-integral is a standard inverse tangent.",
    hints: [t`Divide both sides by $1 + y^2$.`, "Use radians when evaluating tan."],
  });

  // ---------------------------------------------------------------- C3s-3 (6): iteration, Paper 3
  const g = (x) => x - 2 + log(x);
  const a3 = root(g, 1.5, 1.6);
  const xs = iterate((x) => 2 - log(x), 1.5);
  chk(xs[xs.length - 1], a3, 1e-10);
  chk(Math.sign(g(1.5)), -1); chk(Math.sign(g(1.6)), 1);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("numerical.locating-roots")],
    stem: t`The equation $\ln x = 2 - x$ has one root, denoted by $\alpha$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show by calculation that $\alpha$ lies between 1.5 and 1.6.`,
        points: [t`M1 evaluates $g(x) = x - 2 + \ln x$ (or equivalent) at 1.5 and 1.6: $-0.095$ and $0.070$.`, "A1 notes the change of sign and concludes."],
        modelAnswer: t`$$
g(1.5) = 1.5 - 2 + \ln 1.5 = -0.095 < 0, \qquad g(1.6) = 1.6 - 2 + \ln 1.6 = 0.070 > 0
$$
$g$ is continuous for $x > 0$ and changes sign, so $1.5 < \alpha < 1.6$.`,
        explanation: "Sign change of a continuous function." }),
      P.num({ label: "(b)", marks: 4, stem: t`Use the iterative formula $x_{n+1} = 2 - \ln x_n$, with $x_1 = 1.5$, to determine $\alpha$ correct to 2 decimal places. Give the result of each iteration to 4 decimal places.`, value: a3, dp: 2, wrong: [1.55, 1.59],
        explanation: t`$x_2 = 1.5945$, $x_3 = 1.5334$, $x_4 = 1.5725$, $x_5 = 1.5473$, $x_6 = 1.5635$, $x_7 = 1.5531$, $x_8 = 1.5598$, $x_9 = 1.5555$, $x_{10} = 1.5582$, $x_{11} = 1.5565$, $x_{12} = 1.5576$. The iterates oscillate and settle at $1.56$ (2 d.p.).` }),
    ],
    explanation: "Locate the root by a sign change, then iterate until two successive iterates agree to 2 d.p.",
    hints: ["Bring everything to one side for the sign check.", "The iterates alternate either side of α; keep going."],
  });

  // ---------------------------------------------------------------- C3l-1 (9): cubic with complex roots
  const p = poly.mul([1, -2], [1, -2, 5]);
  same(p, [1, -4, 9, -10]);
  isRoot(p, [2, 0], "p 2"); isRoot(p, [1, 2], "p 1+2i");
  // circle through 2, 1 ± 2i: centre (h, 0), (2 − h)² = (1 − h)² + 4 → h = −0.5, r = 2.5
  const h = -0.5;
  chk(hypot(2 - h, 0), hypot(1 - h, 2)); chk(hypot(2 - h, 0), 2.5);
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 3",
    concepts: [Q("complex.polynomial-equations"), Q("complex.loci")],
    stem: t`The polynomial $p(z)$ is defined by $p(z) = z^3 - 4z^2 + 9z - 10$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Given that $z = 2$ is a root of $p(z) = 0$, find the quadratic factor $z^2 + bz + c$ such that $p(z) = (z - 2)(z^2 + bz + c)$.`, template: "b = {{blank:b}}, c = {{blank:c}}",
        blanks: [N("b", -2, "2", 1), N("c", 5, "-5", 2)],
        explanation: t`$p(2) = 8 - 16 + 18 - 10 = 0$. Comparing: constant $-2c = -10$, $c = 5$; $z^2$: $b - 2 = -4$, $b = -2$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Hence find the complex roots of $p(z) = 0$, in the form $a \pm b\mathrm{i}$ with $b > 0$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [N("a", 1, "-1"), N("b", 2, "4")],
        explanation: t`$z^2 - 2z + 5 = 0 \Rightarrow z = \dfrac{2 \pm \sqrt{4 - 20}}{2} = 1 \pm 2\mathrm{i}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the distance between the points representing the two complex roots on an Argand diagram.", value: 4, wrong: [2, 2 * sqrt(5)],
        explanation: t`$|(1 + 2\mathrm{i}) - (1 - 2\mathrm{i})| = |4\mathrm{i}| = 4$.` }),
      P.fib({ label: "(d)", marks: 3, stem: t`The three roots lie on a circle whose centre is on the real axis. Find the centre $(h, 0)$ and the radius $r$ of this circle, and hence write its equation in the form $|z - h| = r$.`, template: "h = {{blank:h}}, r = {{blank:r}}",
        blanks: [D("h", -0.5, 0.001, "0.5", 2), D("r", 2.5, 0.001, "1.5", 1)],
        explanation: t`Equal distances from $(h, 0)$: $(2 - h)^2 = (1 - h)^2 + 4 \Rightarrow 4 - 4h = 5 - 2h \Rightarrow h = -\frac{1}{2}$. Radius $2 - (-\frac{1}{2}) = 2.5$. The circle is $|z + \frac{1}{2}| = \frac{5}{2}$.` }),
    ],
    explanation: "Factor theorem, conjugate roots, and the geometry of the roots on an Argand diagram.",
    hints: ["Compare coefficients after dividing by z − 2.", "The centre is equidistant from 2 and 1 + 2i."],
  });

  // ---------------------------------------------------------------- C3l-2 (9): loci, greatest/least
  const c = [3, 4], r = 2;
  const amin = atan2(4, 3) - asin(r / 5);
  const tl = sqrt(25 - 4);
  chk(tl * Math.cos(amin) >= 3 ? 1 : 0, 1);
  const far = c.map((v) => v + (r * v) / 5);
  chk(far[0] >= 3 ? 1 : 0, 1);
  const leastMod = hypot(3, 2);
  chk(hypot(3 - 3, 2 - 4), 2);
  b.struct({
    d: 5, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("complex.loci")],
    stem: t`The region $R$ of an Argand diagram consists of the points representing complex numbers $z$ that satisfy both $|z - 3 - 4\mathrm{i}| \le 2$ and $\mathrm{Re}\,z \ge 3$.`,
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe how to sketch and shade R.", points: ["Circle with centre (3, 4) and radius 2, drawn solid.", "The vertical line Re z = 3 (x = 3), solid; it passes through the centre.", "R is the right-hand half of the disc (x ≥ 3), including both boundaries."],
        modelAnswer: "Draw the circle centre (3, 4), radius 2, and the line x = 3, which is a diameter of the circle. R is the half-disc on the right of x = 3, including the arc and the diameter from (3, 2) to (3, 6).",
        explanation: "The line Re z = 3 passes through the centre, so R is a half-disc." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the greatest value of |z| for points in R.", value: 7, wrong: [5, 3],
        explanation: t`The centre is 5 from $O$; the farthest point of the disc is $5 + 2 = 7$ from $O$, at $(4.2, 5.6)$, which has $\mathrm{Re}\,z \ge 3$, so it is in $R$.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the least value of arg z for points in R, in radians correct to 3 significant figures.", value: amin, unit: "rad", wrong: [atan2(4, 3) - atan(0.4), atan2(4, 3)],
        explanation: t`The lower tangent from $O$ to the circle makes angle $\sin^{-1}\frac{2}{5} = 0.4115$ with $Oc$, and $\arg(3 + 4\mathrm{i}) = 0.9273$. Least $\arg z = 0.9273 - 0.4115 = 0.516$. The point of contact, about $(3.98, 2.26)$, has $\mathrm{Re}\,z \ge 3$, so it lies in $R$.`,
        hints: ["Draw the tangent from O to the circle below the centre."] }),
      P.num({ label: "(d)", marks: 2, stem: "Find the least value of |z| for points in R, correct to 3 significant figures.", value: leastMod, wrong: [3, sqrt(20)],
        explanation: t`The nearest point of the whole disc, $(1.8, 2.4)$, has $\mathrm{Re}\,z < 3$, so it is not in $R$. On $R$ the distance from $O$ is least at the corner $(3, 2)$, where the line meets the circle: $|3 + 2\mathrm{i}| = \sqrt{13} = 3.61$.`,
        hints: ["Is the point of the disc nearest to O inside R?"] }),
    ],
    explanation: "Sketch the half-disc; use the line through O and the centre, and the tangent from O, but check each extreme point lies in R.",
    hints: ["|3 + 4i| = 5.", "The tangent angle is sin⁻¹(radius ÷ distance)."],
  });
  chk(far[0], 4.2); chk(far[1], 5.6);
});
