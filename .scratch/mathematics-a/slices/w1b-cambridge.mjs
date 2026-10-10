// W1b exam-format items for Cambridge 9709: C1s ×3 (6 marks), C1l ×3 (9), C2s ×1 (7), C2l ×1 (11), C3s ×1 (6), C3l ×1 (9).
// Every value is computed and checked here.
import { concept, P, t, chk, same, rnd, solveTrig, quad, gp, ap, binomialCoeffs, rad, deg, cot, CAM } from "../lib.mjs";

const { sin, cos, tan, atan, asin, acos, sqrt, PI, log } = Math;
const Q = (k) => `amaths.${k}`;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const A1 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, tol = 0.0005, marks) => ({ id, input: "number", accepted: list, tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const S3 = (id, x, dp, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, dp))], tolerance: 0.5 * 10 ** -dp, wrong, ...(marks ? { marks } : {}) });
const co = (n, k) => { let c = 1; for (let i = 0; i < k; i++) c *= (n - i) / (i + 1); return c; };
const seriesC = (n, b, terms) => Array.from({ length: terms }, (_, k) => co(n, k) * b ** k);
const mulAsc = (p, q) => { const out = Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((c, j) => (out[i + j] += a * c))); return out; };
const least = (cond) => { for (let n = 1; n < 100000; n++) if (cond(n)) return n; throw new Error("least"); };

concept(Q("coordinate.circles"), { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C1s-1 (6): circle, tangent
  chk(sqrt(16 + 1 + 8), 5); chk(49 + 9 - 56 + 6 - 8, 0); chk((3 + 1) / (7 - 4), 4 / 3); chk(3 * 7 + 4 * 3, 33);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("coordinate.circles")],
    stem: t`The circle $C$ has equation $x^2 + y^2 - 8x + 2y - 8 = 0$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the centre and radius of C.", template: "Centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
        blanks: [N("a", 4, "-4"), N("b", -1, "1"), N("r", 5, "25")],
        explanation: t`$(x - 4)^2 + (y + 1)^2 = 8 + 16 + 1 = 25$: centre $(4, -1)$, radius 5.` }),
      P.expr({ label: "(b)", marks: 3, stem: "The point P(7, 3) lies on C. Find the equation of the tangent to C at P, in the form ax + by = c with integers a, b, c.",
        accepted: ["3x+4y=33", "4y+3x=33", "3x+4y-33=0", "-3x-4y=-33", "y=-3/4x+33/4", "y=-0.75x+8.25", "y=(-3/4)x+33/4", "y=33/4-3x/4"],
        wrong: ["4x-3y=19"],
        explanation: t`Radius gradient $\frac{3 - (-1)}{7 - 4} = \frac{4}{3}$, so the tangent gradient is $-\frac{3}{4}$: $y - 3 = -\frac{3}{4}(x - 7) \Rightarrow 3x + 4y = 33$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the y-coordinate of the point where the tangent crosses the y-axis.", prefix: "y =", value: 33 / 4, wrong: [11, 33],
        explanation: t`$x = 0$: $4y = 33$, $y = 8.25$.` }),
    ],
    explanation: "Complete the square for the centre and radius; the tangent is perpendicular to the radius.",
    hints: ["Halve the coefficients of x and y to find the centre.", "Perpendicular gradients multiply to −1."],
  });

  // ---------------------------------------------------------------- C1s-2 (6): binomial positive
  const c2 = binomialCoeffs(2, -3, 5);
  same(c2.slice(0, 3), [32, -240, 720]);
  chk(mulAsc([1, 4], c2)[2], -240);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("series.binomial-positive")],
    stem: t`This question is about the expansion of $(2 - 3x)^5$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the first three terms in the expansion of (2 − 3x)⁵ in ascending powers of x.", template: "Expansion: ({{blank:a}}) + ({{blank:b}})x + ({{blank:c}})x²",
        blanks: [N("a", 32, "2"), N("b", -240, "240"), N("c", 720, "-720")],
        explanation: t`$2^5 + 5(2^4)(-3x) + 10(2^3)(-3x)^2 = 32 - 240x + 720x^2$.` }),
      P.num({ label: "(b)", marks: 3, stem: t`Hence find the coefficient of $x^2$ in the expansion of $(1 + 4x)(2 - 3x)^5$.`, value: -240, wrong: [720, 1680],
        explanation: t`$1 \times 720 + 4 \times (-240) = 720 - 960 = -240$.` }),
    ],
    explanation: "Keep the −3 inside each power; the x² term of the product has two contributions.",
    hints: [t`$(-3x)^2 = 9x^2$.`, "x² comes from 1 × (x² term) and 4x × (x term)."],
  });

  // ---------------------------------------------------------------- C1s-3 (6): identity + equation
  same(quad.roots(2, -3, -2), [-0.5, 2]);
  same(solveTrig({ fn: "cos", k: -0.5, lo: 0, hi: 360 }), [120, 240]);
  for (const x of [120, 240]) chk(2 * sin(rad(x)) ** 2 + 3 * cos(rad(x)), 0, 1e-12);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("trig.basic-identities-equations")],
    stem: t`This question is about the equation $2\sin^2\theta + 3\cos\theta = 0$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the equation can be written as $2\cos^2\theta - 3\cos\theta - 2 = 0$.`,
        points: [t`M1 replaces $\sin^2\theta$ by $1 - \cos^2\theta$.`, t`A1 rearranges to $2\cos^2\theta - 3\cos\theta - 2 = 0$.`],
        modelAnswer: t`$$
2(1 - \cos^2\theta) + 3\cos\theta = 0 \Rightarrow 2 - 2\cos^2\theta + 3\cos\theta = 0 \Rightarrow 2\cos^2\theta - 3\cos\theta - 2 = 0
$$`,
        explanation: "Use sin²θ = 1 − cos²θ and multiply by −1." }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence solve the equation for $0^\circ \le \theta \le 360^\circ$, in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [N("a", 120, "60", 2), N("b", 240, "300", 2)],
        explanation: t`$(2\cos\theta + 1)(\cos\theta - 2) = 0$. $\cos\theta = 2$ is impossible; $\cos\theta = -\frac{1}{2}$ gives $120^\circ$ and $240^\circ$.` }),
    ],
    explanation: "A quadratic in cos θ after the Pythagorean identity.",
    hints: ["Factorise the quadratic in cos θ.", "Reject any value outside −1 ≤ cos θ ≤ 1."],
  });

  // ---------------------------------------------------------------- C1l-1 (9): AP and GP
  for (const a of [9, 3]) { const d = (2 * a) / 3; chk((a + 3 * d) ** 2, a * (a + 12 * d)); }
  chk(ap.nth(9, 6, 4) / 9, 3); chk(ap.nth(9, 6, 13), 81); chk(ap.sum(9, 6, 20), 1320);
  const n4 = least((n) => gp.sum(9, 3, n) > 1e6);
  chk(n4, 12);
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("series.geometric"), Q("series.arithmetic")],
    stem: t`An arithmetic progression has first term $a$ and common difference $d$, where $a > 0$ and $d \neq 0$. The 1st, 4th and 13th terms of the arithmetic progression are the first three terms of a geometric progression.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $d = \frac{2}{3}a$.`,
        points: [t`M1 uses $(a + 3d)^2 = a(a + 12d)$.`, t`A1 expands to $6ad + 9d^2 = 12ad$, so $9d^2 = 6ad$.`, t`A1 divides by $3d$ ($d \neq 0$) to get $d = \frac{2}{3}a$.`],
        modelAnswer: t`$$
(a + 3d)^2 = a(a + 12d) \Rightarrow a^2 + 6ad + 9d^2 = a^2 + 12ad \Rightarrow 9d^2 = 6ad
$$

Since $d \neq 0$, $9d = 6a$, so $d = \frac{2}{3}a$.`,
        explanation: "Three numbers in GP: (middle)² = first × third." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the common ratio of the geometric progression.", prefix: "r =", value: 3, wrong: [2, 4],
        explanation: t`$r = \frac{a + 3d}{a} = \frac{a + 2a}{a} = 3$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Given that $a = 9$, find the sum of the first 20 terms of the arithmetic progression.`, value: 1320, wrong: [1230, 2640],
        explanation: t`$d = 6$: $S_{20} = \frac{20}{2}(18 + 19 \times 6) = 10 \times 132 = 1320$.` }),
      P.num({ label: "(d)", marks: 3, stem: t`With $a = 9$, find the least number of terms of the geometric progression whose sum exceeds $10^6$.`, prefix: "n =", value: n4, wrong: [11, 13],
        explanation: t`$\frac{9(3^n - 1)}{2} > 10^6 \Rightarrow 3^n > 222\,223.2 \Rightarrow n > \frac{\ln 222\,223.2}{\ln 3} = 11.21$, so $n = 12$.` }),
    ],
    explanation: "Translate 'terms in GP' into an equation in a and d, then use AP and GP sum formulas.",
    hints: [t`The 4th term is $a + 3d$ and the 13th is $a + 12d$.`, "Use logarithms for (d)."],
  });

  // ---------------------------------------------------------------- C1l-2 (9): sector and segment
  const th = (32 - 20) / 10;
  chk(th, 1.2); chk(0.5 * 100 * th, 60);
  const seg = 50 * (1.2 - sin(1.2));
  const chord = 20 * sin(0.6);
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("trig.radians-arcs-sectors")],
    stem: t`The sector $OAB$ of a circle with centre $O$ and radius 10 cm has perimeter 32 cm. The angle $AOB$ is $\theta$ radians.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find θ.", prefix: "θ =", value: th, unit: "rad", wrong: [3.2, 2.2],
        explanation: t`$2(10) + 10\theta = 32 \Rightarrow \theta = 1.2$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the area of the sector.", value: 60, unit: "cm²", wrong: [120, 12],
        explanation: t`$\frac{1}{2} \times 100 \times 1.2 = 60$ cm$^2$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the area of the segment cut off by the chord AB, correct to 3 significant figures.", value: seg, unit: "cm²", wrong: [60 - 50 * sin(rad(1.2)), 46.6],
        explanation: t`$60 - \frac{1}{2} \times 100 \times \sin 1.2 = 60 - 46.60 = 13.4$ cm$^2$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the length of the chord AB, correct to 3 significant figures.", value: chord, unit: "cm", wrong: [12, 20 * sin(1.2)],
        explanation: t`$AB = 2 \times 10\sin 0.6 = 11.3$ cm.` }),
      P.num({ label: "(e)", marks: 2, stem: "Find the perimeter of the segment, correct to 3 significant figures.", value: 12 + chord, unit: "cm", wrong: [32, 20 + chord],
        explanation: t`Arc $= 10 \times 1.2 = 12$; perimeter $= 12 + 11.29 = 23.3$ cm.` }),
    ],
    explanation: "Perimeter 2r + rθ gives θ; segment = sector − triangle; chord from the isosceles triangle.",
    hints: ["Use radian mode.", t`Chord $= 2r\sin\frac{\theta}{2}$.`],
  });
  chk(rnd(seg, 1), 13.4); chk(rnd(chord, 1), 11.3);

  // ---------------------------------------------------------------- C1l-3 (9): trig graph a − b cos x
  chk(2 - 3 * cos(0), -1); chk(2 - 3 * cos(PI), 5);
  const z = solveTrig({ fn: "cos", k: 2 / 3, lo: 0, hi: 2 * PI, unit: "rad" });
  chk(solveTrig({ fn: "cos", k: -2 / 3, lo: 0, hi: 2 * PI, unit: "rad" }).length, 2);
  chk(2 - 3 * cos(PI / 3), 0.5);
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("trig.graphs-exact-values")],
    stem: t`The function f is defined by $f(x) = a - b\cos x$ for $0 \le x \le 2\pi$, where $a$ and $b$ are positive constants. The range of f is $-1 \le f(x) \le 5$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find a and b.", template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [N("a", 2, "3"), N("b", 3, "6")],
        explanation: t`$a - b = -1$ and $a + b = 5$, so $a = 2$, $b = 3$.` }),
      P.num({ label: "(b)", marks: 1, stem: t`Find the exact value of $f\left(\frac{\pi}{3}\right)$, as a decimal.`, value: 0.5, wrong: [3.5, -0.598],
        explanation: t`$2 - 3\cos\frac{\pi}{3} = 2 - \frac{3}{2} = \frac{1}{2}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Solve $f(x) = 0$, giving the solutions in radians correct to 3 significant figures, in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [S3("a", z[0], 3, "2.30", 1), S3("b", z[1], 2, "3.98", 2)],
        explanation: t`$\cos x = \frac{2}{3}$: $x = 0.841$ or $2\pi - 0.841 = 5.44$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`State the number of points at which the line $y = 4$ meets the graph of $y = f(x)$.`, value: 2, wrong: [1, 0],
        explanation: t`$2 - 3\cos x = 4 \Rightarrow \cos x = -\frac{2}{3}$, which has two solutions in $[0, 2\pi]$.` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Describe a sequence of two transformations that maps $y = \cos x$ onto $y = f(x)$.`,
        points: ["A stretch parallel to the y-axis with scale factor −3 (or: stretch factor 3 and reflection in the x-axis).", "Then a translation of 2 units in the positive y-direction."],
        modelAnswer: "Stretch y = cos x by factor 3 parallel to the y-axis and reflect it in the x-axis (giving −3 cos x), then translate by (0, 2)." }),
    ],
    explanation: "The maximum and minimum give a and b; solve a cos equation in radians; count intersections from the range.",
    hints: ["The maximum is a + b and the minimum is a − b.", "Radian mode."],
  });

  // ---------------------------------------------------------------- C2s (7): harmonic form, Paper 2
  const al = atan(12 / 5);
  ident((x) => 5 * sin(x) + 12 * cos(x), (x) => 13 * sin(x + al), "5sin+12cos");
  const s = solveTrig({ fn: "sin", k: 6 / 13, b: deg(al), lo: 0, hi: 360 });
  s.forEach((x) => chk(5 * sin(rad(x)) + 12 * cos(rad(x)), 6, 1e-9));
  b.struct({
    d: 4, marks: 7, secs: 90 * 7, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("trig.harmonic-form")],
    stem: t`This question is about the expression $5\sin\theta + 12\cos\theta$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $5\sin\theta + 12\cos\theta$ in the form $R\sin(\theta + \alpha)$, where $R > 0$ and $0^\circ < \alpha < 90^\circ$. Give $\alpha$ correct to 2 decimal places.`, template: "R = {{blank:R}}, α = {{blank:a}}°",
        blanks: [N("R", 13, "17", 1), { id: "a", input: "number", accepted: [String(rnd(deg(al), 2))], tolerance: 0.005, wrong: "22.62", marks: 2 }],
        explanation: t`$R\cos\alpha = 5$, $R\sin\alpha = 12$: $R = 13$, $\alpha = \tan^{-1}\frac{12}{5} = 67.38^\circ$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence solve $5\sin\theta + 12\cos\theta = 6$ for $0^\circ \le \theta \le 360^\circ$, giving answers to 1 decimal place in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [A1("a", s[0], "320.1", 2), A1("b", s[1], "85.1", 2)],
        explanation: t`$\sin(\theta + 67.38^\circ) = \frac{6}{13}$; $\sin^{-1}\frac{6}{13} = 27.49^\circ$. With $67.38^\circ \le \theta + 67.38^\circ \le 427.38^\circ$: $\theta + 67.38^\circ = 152.51^\circ$ or $387.49^\circ$, so $\theta = 85.1^\circ$ or $320.1^\circ$.` }),
    ],
    explanation: "Harmonic form, then solve over the shifted interval.",
    hints: ["Expand R sin(θ + α) and compare coefficients.", "27.49° itself is below the shifted interval."],
  });

  // ---------------------------------------------------------------- C2l (11): cot − tan ≡ 2 cot 2θ, Paper 2
  ident((x) => cot(x) - tan(x), (x) => 2 * cot(2 * x), "cot-tan");
  const sl = solveTrig({ fn: "cot", k: 2.5, a: 2, lo: 0, hi: 180 });
  sl.forEach((x) => chk(cot(rad(x)) - tan(rad(x)), 5, 1e-9));
  chk(cot(rad(15)) - tan(rad(15)), 2 * sqrt(3), 1e-12);
  same(solveTrig({ fn: "tan", k: 1 / sqrt(3), lo: 0, hi: 180 }).concat(solveTrig({ fn: "tan", k: -1 / sqrt(3), lo: 0, hi: 180 })), [30, 150]);
  for (const x of [30, 150]) chk(cot(rad(x)) - tan(rad(x)), 2 * tan(rad(x)), 1e-9);
  b.struct({
    d: 5, marks: 11, secs: 90 * 11, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("trig.compound-double-angle"), Q("trig.reciprocal-functions")],
    stem: t`This question is about the expression $\cot\theta - \tan\theta$, for $0^\circ < \theta < 180^\circ$, $\theta \neq 90^\circ$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Prove that $\cot\theta - \tan\theta \equiv 2\cot 2\theta$.`,
        points: [t`M1 writes in sin and cos and combines: $\frac{\cos^2\theta - \sin^2\theta}{\sin\theta\cos\theta}$.`, t`M1 uses $\cos 2\theta$ and $\sin 2\theta = 2\sin\theta\cos\theta$.`, t`A1 $\frac{\cos 2\theta}{\frac{1}{2}\sin 2\theta} = 2\cot 2\theta$.`],
        modelAnswer: t`$$
\cot\theta - \tan\theta = \frac{\cos\theta}{\sin\theta} - \frac{\sin\theta}{\cos\theta} = \frac{\cos^2\theta - \sin^2\theta}{\sin\theta\cos\theta} = \frac{\cos 2\theta}{\frac{1}{2}\sin 2\theta} = 2\cot 2\theta
$$`,
        explanation: "Common denominator, then the double-angle formulae." }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence solve $\cot\theta - \tan\theta = 5$, giving answers to 1 decimal place in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [A1("a", sl[0], "34.1", 2), A1("b", sl[1], "124.1", 2)],
        explanation: t`$\cot 2\theta = \frac{5}{2}$, so $\tan 2\theta = \frac{2}{5}$, with $0^\circ < 2\theta < 360^\circ$: $2\theta = 21.80^\circ$ or $201.80^\circ$, so $\theta = 10.9^\circ$ or $100.9^\circ$. (Using $\tan 2\theta = \frac{5}{2}$ gives $34.1^\circ$.)` }),
      P.num({ label: "(c)", marks: 2, stem: t`Use the identity to find the exact value of $\cot 15^\circ - \tan 15^\circ$, and give it to 3 significant figures.`, value: 2 * sqrt(3), wrong: [sqrt(3), 2 / sqrt(3)],
        explanation: t`$2\cot 30^\circ = 2\sqrt{3} = 3.46$.` }),
      P.fib({ label: "(d)", marks: 2, stem: t`Solve $\cot\theta - \tan\theta = 2\tan\theta$, in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [N("a", 30, "60"), N("b", 150, "120")],
        explanation: t`$\cot\theta = 3\tan\theta \Rightarrow \tan^2\theta = \frac{1}{3} \Rightarrow \tan\theta = \pm\frac{1}{\sqrt{3}}$: $\theta = 30^\circ$ or $150^\circ$.` }),
    ],
    explanation: "Reciprocal functions in sin and cos, then double-angle formulae; 'hence' means use the identity.",
    hints: [t`$\cos^2\theta - \sin^2\theta = \cos 2\theta$.`, t`For (b), $0^\circ < 2\theta < 360^\circ$.`],
  });

  // ---------------------------------------------------------------- C3s (6): rational binomial, Paper 3
  const c = seriesC(-1 / 3, 3, 3);
  c.forEach((v, i) => chk(v, [1, -1, 2][i], 1e-12));
  chk(mulAsc([2, -1], c)[2], 5);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 3",
    concepts: [Q("series.binomial-rational")],
    stem: t`This question is about the expansion of $(1 + 3x)^{-\frac{1}{3}}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Expand (1 + 3x)^(−1/3) in ascending powers of x, up to and including the term in x².", template: "1 + ({{blank:a}})x + ({{blank:b}})x²",
        blanks: [N("a", -1, "1", 1), N("b", 2, "0.222", 2)],
        explanation: t`$1 + \left(-\frac{1}{3}\right)(3x) + \frac{\left(-\frac{1}{3}\right)\left(-\frac{4}{3}\right)}{2}(3x)^2 = 1 - x + \frac{2}{9} \times 9x^2 = 1 - x + 2x^2$.` }),
      P.fib({ label: "(b)", marks: 1, stem: "State the set of values of x for which the expansion is valid.", template: "|x| < {{blank:k}}",
        blanks: [FR("k", ["1/3", "0.3333", "0.333"], "3", 0.0005, 1)],
        explanation: t`$|3x| < 1$, i.e. $|x| < \frac{1}{3}$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Hence find the coefficient of $x^2$ in the expansion of $(2 - x)(1 + 3x)^{-\frac{1}{3}}$.`, value: 5, wrong: [3, 4],
        explanation: t`$2 \times 2 + (-1) \times (-1) = 4 + 1 = 5$.` }),
    ],
    explanation: "Binomial series with n = −1/3 and 3x in place of x.",
    hints: [t`$(3x)^2 = 9x^2$.`],
  });

  // ---------------------------------------------------------------- C3l (9): partial fractions + expansion, Paper 3
  for (const x of [0.1, -0.2, 0.3]) chk((7 + 4 * x) / ((2 - x) * (1 + 2 * x)), 3 / (2 - x) + 2 / (1 + 2 * x), 1e-12);
  const e = seriesC(-1, -0.5, 3).map((v, k) => 1.5 * v + 2 * seriesC(-1, 2, 3)[k]);
  e.forEach((v, i) => chk(v, [3.5, -3.25, 8.375][i], 1e-12));
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 3",
    concepts: [Q("series.binomial-rational")],
    stem: t`Let $f(x) = \dfrac{7 + 4x}{(2 - x)(1 + 2x)}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $f(x)$ in partial fractions in the form $\dfrac{A}{2 - x} + \dfrac{B}{1 + 2x}$.`, template: "A = {{blank:A}}, B = {{blank:B}}",
        blanks: [N("A", 3, "2", 2), N("B", 2, "3", 1)],
        explanation: t`$7 + 4x = A(1 + 2x) + B(2 - x)$. $x = 2$: $15 = 5A$, $A = 3$. $x = -\frac{1}{2}$: $5 = \frac{5}{2}B$, $B = 2$.` }),
      P.fib({ label: "(b)", marks: 4, stem: "Hence obtain the expansion of f(x) in ascending powers of x, up to and including the term in x². Give coefficients as decimals or fractions.", template: "f(x) ≈ ({{blank:a}}) + ({{blank:b}})x + ({{blank:c}})x²",
        blanks: [FR("a", ["3.5", "7/2"], "5", 0.0005, 1), FR("b", ["-3.25", "-13/4"], "-4.75", 0.0005, 1), FR("c", ["8.375", "67/8"], "8.75", 0.0005, 2)],
        explanation: t`$\frac{3}{2 - x} = \frac{3}{2}\left(1 - \frac{x}{2}\right)^{-1} = \frac{3}{2} + \frac{3}{4}x + \frac{3}{8}x^2$; $\frac{2}{1 + 2x} = 2 - 4x + 8x^2$. Sum: $\frac{7}{2} - \frac{13}{4}x + \frac{67}{8}x^2$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "State the set of values of x for which the expansion is valid.", template: "|x| < {{blank:k}}",
        blanks: [FR("k", ["0.5", "1/2"], "2", 0.0005, 2)],
        explanation: t`$\frac{3}{2 - x}$ needs $|x| < 2$; $\frac{2}{1 + 2x}$ needs $|x| < \frac{1}{2}$. Both: $|x| < \frac{1}{2}$.` }),
    ],
    explanation: "Partial fractions, then a binomial expansion of each; the narrower range of validity applies.",
    hints: [t`Take out $2^{-1}$ from $(2 - x)^{-1}$.`, "The expansion is valid only where both parts are valid."],
  });
});
