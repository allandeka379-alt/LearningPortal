// W1b exam-format items for ZIMSEC Pure Mathematics: ZP1 ×4 (10 marks), ZP2A ×1 (8), ZP2B ×2 (16).
// They emphasise ZIMSEC-only content (standard sums and differences, Maclaurin series, small angles, inverse-trig
// graphs, sequence behaviour). Every value is computed and checked here.
import { concept, P, t, chk, same, rnd, solveTrig, quad, gp, sum, rad, deg, ZP } from "../lib.mjs";

const { sin, cos, tan, atan, acos, sqrt, exp, log, PI } = Math;
const Q = (k) => `amaths.${k}`;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
const SMALL = [0.001, -0.002, 0.003];
const seriesChk = (f, s, k, label) => SMALL.forEach((x) => chk(f(x), s(x), 50 * Math.abs(x) ** (k + 1), label));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const A1 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, tol = 0.0005, marks) => ({ id, input: "number", accepted: list, tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const S3 = (id, x, dp, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, dp))], tolerance: 0.5 * 10 ** -dp, wrong, ...(marks ? { marks } : {}) });
const sig = (m, n, f) => sum(Array.from({ length: n - m + 1 }, (_, i) => f(m + i)));
const least = (cond) => { for (let n = 1; n < 100000; n++) if (cond(n)) return n; throw new Error("least"); };

concept(Q("series.standard-sums-differences"), { file: "exam/w1b-zimsec-pure", keyPrefix: "exam.w1b-zimsec-pure", applies: ZP }, (b) => {
  // ---------------------------------------------------------------- ZP1-1 (10): standard sums
  for (const n of [1, 2, 3, 10, 20]) chk(sig(1, n, (r) => r * (r + 3)), (n * (n + 1) * (n + 5)) / 3);
  same([1, 2, 3].map((n) => sig(1, n, (r) => r * (r + 3))), [4, 14, 32]);
  chk(sig(11, 20, (r) => r * (r + 3)), 2950);
  const n1 = least((n) => (n * (n + 1) * (n + 5)) / 3 > 1000);
  chk(n1, 13);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("series.standard-sums-differences")],
    stem: t`This question is about $S_n = \displaystyle\sum_{r=1}^{n} r(r + 3)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Write down $S_1$, $S_2$ and $S_3$.`, template: "S₁ = {{blank:a}}, S₂ = {{blank:b}}, S₃ = {{blank:c}}",
        blanks: [N("a", 4, "3"), N("b", 14, "10"), N("c", 32, "18")],
        explanation: t`$1 \times 4 = 4$; $4 + 2 \times 5 = 14$; $14 + 3 \times 6 = 32$.` }),
      P.proof({ label: "(b)", marks: 3, stem: t`Use standard results to show that $S_n = \dfrac{n(n + 1)(n + 5)}{3}$.`,
        points: [t`M1 $\sum r^2 + 3\sum r = \frac{n(n + 1)(2n + 1)}{6} + \frac{3n(n + 1)}{2}$.`, t`M1 takes out $\frac{n(n + 1)}{6}$: $\frac{n(n + 1)}{6}(2n + 1 + 9)$.`, t`A1 $= \frac{n(n + 1)(2n + 10)}{6} = \frac{n(n + 1)(n + 5)}{3}$.`],
        modelAnswer: t`$$
S_n = \sum r^2 + 3\sum r = \frac{n(n + 1)(2n + 1)}{6} + \frac{3n(n + 1)}{2} = \frac{n(n + 1)}{6}\left[(2n + 1) + 9\right] = \frac{n(n + 1)(n + 5)}{3}
$$`,
        explanation: "Linearity, standard results and a common factor." }),
      P.num({ label: "(c)", marks: 2, stem: t`Hence evaluate $\displaystyle\sum_{r=11}^{20} r(r + 3)$.`, value: 2950, wrong: [3500, 2758],
        explanation: t`$S_{20} - S_{10} = \frac{20 \times 21 \times 25}{3} - \frac{10 \times 11 \times 15}{3} = 3500 - 550 = 2950$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the least value of $n$ for which $S_n > 1000$.`, prefix: "n =", value: n1, wrong: [12, 14],
        explanation: t`$S_{12} = \frac{12 \times 13 \times 17}{3} = 884$ and $S_{13} = \frac{13 \times 14 \times 18}{3} = 1092$, so $n = 13$.` }),
    ],
    explanation: "Standard results give a factorised closed form; differences of closed forms give sums between limits.",
    hints: [t`Expand $r(r + 3) = r^2 + 3r$.`, t`$\sum_{11}^{20} = S_{20} - S_{10}$.`],
  });

  // ---------------------------------------------------------------- ZP1-2 (10): Maclaurin products
  seriesChk((x) => exp(2 * x), (x) => 1 + 2 * x + 2 * x * x + (4 / 3) * x ** 3, 3, "e2x");
  seriesChk((x) => log(1 - x), (x) => -x - x * x / 2 - x ** 3 / 3, 3, "ln(1-x)");
  seriesChk((x) => exp(2 * x) * log(1 - x), (x) => -x - 2.5 * x * x - (10 / 3) * x ** 3, 3, "product");
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("series.maclaurin-taylor")],
    stem: t`This question uses the Maclaurin series of $\mathrm{e}^{2x}$ and $\ln(1 - x)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Write down the Maclaurin series of e^(2x) up to and including the term in x³. Give coefficients as fractions or decimals.", template: "e^(2x) ≈ 1 + ({{blank:a}})x + ({{blank:b}})x² + ({{blank:c}})x³",
        blanks: [N("a", 2, "1"), N("b", 2, "4"), FR("c", ["4/3", "1.333", "1.3333"], "8", 0.0005)],
        explanation: t`$1 + 2x + \frac{(2x)^2}{2!} + \frac{(2x)^3}{3!} = 1 + 2x + 2x^2 + \frac{4}{3}x^3$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Write down the Maclaurin series of ln(1 − x) up to and including the term in x³.", template: "ln(1 − x) ≈ −x + ({{blank:a}})x² + ({{blank:b}})x³",
        blanks: [FR("a", ["-0.5", "-1/2"], "0.5"), FR("b", ["-1/3", "-0.333", "-0.3333"], "1/3")],
        explanation: t`Replace $x$ by $-x$ in $x - \frac{x^2}{2} + \frac{x^3}{3}$: $-x - \frac{x^2}{2} - \frac{x^3}{3}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Hence find the Maclaurin series of e^(2x) ln(1 − x) up to and including the term in x³.", template: "e^(2x) ln(1 − x) ≈ ({{blank:a}})x + ({{blank:b}})x² + ({{blank:c}})x³",
        blanks: [N("a", -1, "1"), FR("b", ["-2.5", "-5/2"], "-1.5"), FR("c", ["-10/3", "-3.333", "-3.3333"], "-7/3", 0.0005)],
        explanation: t`$(1 + 2x + 2x^2)(-x - \frac{x^2}{2} - \frac{x^3}{3})$: $x$: $-1$; $x^2$: $-\frac{1}{2} - 2 = -\frac{5}{2}$; $x^3$: $-\frac{1}{3} - 1 - 2 = -\frac{10}{3}$.` }),
      P.mcq({ label: "(d)", marks: 2, stem: "For which values of x is the series in (c) valid?",
        options: [
          [t`$-1 \le x < 1$`, t`Correct: $\mathrm{e}^{2x}$ is valid for all $x$, so the range is that of $\ln(1 - x)$.`],
          [t`$-1 < x \le 1$`, t`This is the range for $\ln(1 + x)$.`],
          ["all real x", t`$\ln(1 - x)$ is undefined for $x \ge 1$.`],
          [t`$-\frac{1}{2} < x \le \frac{1}{2}$`, t`The factor $2x$ is in the exponential, whose series converges everywhere.`],
        ],
        answer: "A",
        explanation: t`A product series is valid where both series are valid: here $-1 \le x < 1$.` }),
    ],
    explanation: "Substitute into standard series, then multiply keeping powers up to x³.",
    hints: [t`$(2x)^3 = 8x^3$ and $3! = 6$.`, "Only products giving x, x², x³ are needed."],
  });

  // ---------------------------------------------------------------- ZP1-3 (10): sector, small angles, inverse trig graph
  const th3 = (2 * 15) / 36;
  chk(th3, 5 / 6);
  const seg3 = 18 * (th3 - sin(th3));
  for (const x of [0.01, 0.002]) chk((1 - cos(2 * x)) / (x * tan(x)), 2, 1e-3);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("trig.radians-arcs-sectors"), Q("trig.graphs-exact-values")],
    stem: "This question is about circular measure, small angles and an inverse trigonometric graph.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "A sector of a circle of radius 6 cm has area 15 cm². Find the angle of the sector in radians, correct to 3 significant figures.", value: th3, unit: "rad", wrong: [2.5, 0.417],
        explanation: t`$\frac{1}{2} \times 36 \times \theta = 15 \Rightarrow \theta = \frac{5}{6} = 0.833$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the area of the segment cut off by the chord of this sector, correct to 3 significant figures.", value: seg3, unit: "cm²", wrong: [15, 18 * sin(th3)],
        explanation: t`$\frac{1}{2} \times 36(\theta - \sin\theta) = 18(0.8333 - 0.7402) = 1.68$ cm$^2$.` }),
      P.proof({ label: "(c)", marks: 3, stem: t`Using small-angle approximations, show that $\dfrac{1 - \cos 2x}{x\tan x} \approx 2$ when $x$ is small.`,
        points: [t`M1 $\cos 2x \approx 1 - \frac{(2x)^2}{2} = 1 - 2x^2$.`, t`M1 $\tan x \approx x$, so the denominator $\approx x^2$.`, t`A1 $\frac{2x^2}{x^2} = 2$.`],
        modelAnswer: t`$$
\frac{1 - \cos 2x}{x\tan x} \approx \frac{1 - (1 - 2x^2)}{x \cdot x} = \frac{2x^2}{x^2} = 2
$$`,
        explanation: "Replace each function by its small-angle approximation (x in radians)." }),
      P.fib({ label: "(d)", marks: 3, stem: t`The graph of $y = 2\cos^{-1}(2x)$ is sketched. State its domain and its greatest value of $y$, correct to 3 significant figures.`, template: "Domain {{blank:a}} ≤ x ≤ {{blank:b}}; greatest y = {{blank:c}}",
        blanks: [FR("a", ["-0.5", "-1/2"], "-1", 0.0005, 1), FR("b", ["0.5", "1/2"], "1", 0.0005, 1), S3("c", 2 * PI, 2, "3.14", 1)],
        explanation: t`$\cos^{-1}u$ needs $-1 \le 2x \le 1$, so $-\frac{1}{2} \le x \le \frac{1}{2}$. Its range $[0, \pi]$ becomes $[0, 2\pi]$; the greatest value $2\pi = 6.28$ occurs at $x = -\frac{1}{2}$.` }),
    ],
    explanation: "Sector and segment formulas in radians; small-angle approximations; transformed inverse cosine.",
    hints: ["Use radian mode.", t`$\cos\theta \approx 1 - \frac{\theta^2}{2}$ with $\theta = 2x$.`],
  });
  chk(rnd(seg3, 2), 1.68);

  // ---------------------------------------------------------------- ZP1-4 (10): circle, tangents
  chk(sqrt(9 + 4 + 12), 5); chk(1 + 25 + 6 - 20 - 12, 0);
  const cs = [8 - 5 * sqrt(5), 8 + 5 * sqrt(5)];
  for (const c of cs) chk(quad.disc(5, 4 * c - 2, c * c - 4 * c - 12), 0, 1e-9); // x² + (2x + c)² + 6x − 4(2x + c) − 12
  chk(4 * 1 + 3 * 5, 19);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("coordinate.circles")],
    stem: t`The circle $C$ has equation $x^2 + y^2 + 6x - 4y - 12 = 0$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the centre and the radius of C.", template: "Centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
        blanks: [N("a", -3, "3"), N("b", 2, "-2"), N("r", 5, "25")],
        explanation: t`$(x + 3)^2 + (y - 2)^2 = 12 + 9 + 4 = 25$: centre $(-3, 2)$, radius 5.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Show that the point A(1, 5) lies on C.",
        points: [t`Substitutes: $1 + 25 + 6 - 20 - 12$.`, "Obtains 0, so A lies on C."],
        modelAnswer: "1² + 5² + 6(1) − 4(5) − 12 = 1 + 25 + 6 − 20 − 12 = 0, so A satisfies the equation of C." }),
      P.expr({ label: "(c)", marks: 2, stem: "Find the equation of the tangent to C at A, in the form ax + by = c with integers a, b, c.",
        accepted: ["4x+3y=19", "3y+4x=19", "4x+3y-19=0", "y=-4/3x+19/3", "y=(-4/3)x+19/3", "y=19/3-4x/3"],
        wrong: ["3x-4y=-17"],
        explanation: t`Radius gradient $\frac{5 - 2}{1 + 3} = \frac{3}{4}$, tangent gradient $-\frac{4}{3}$: $y - 5 = -\frac{4}{3}(x - 1) \Rightarrow 4x + 3y = 19$.` }),
      P.fib({ label: "(d)", marks: 3, stem: "The line y = 2x + c is a tangent to C. Find the two possible values of c, correct to 3 significant figures, the smaller first.", template: "c = {{blank:a}} or c = {{blank:b}}",
        blanks: [S3("a", cs[0], 2, "-8.00", 1), S3("b", cs[1], 2, "8.00", 2)],
        explanation: t`Distance from $(-3, 2)$ to $2x - y + c = 0$ equals 5: $\frac{|-6 - 2 + c|}{\sqrt{5}} = 5 \Rightarrow c - 8 = \pm 5\sqrt{5}$, so $c = 8 - 5\sqrt{5} = -3.18$ or $c = 8 + 5\sqrt{5} = 19.2$.` }),
    ],
    explanation: "Centre and radius by completing the square; tangent ⟂ radius; tangency from distance = radius (or a zero discriminant).",
    hints: ["Halve the coefficients of x and y for the centre.", "A tangent is at distance r from the centre."],
  });

  // ---------------------------------------------------------------- ZP2A (8): recurrence, limit, GP
  const u = [2]; for (let i = 0; i < 12; i++) u.push(0.5 * u[i] + 3);
  same(u.slice(1, 4), [4, 5, 5.5]);
  for (let n = 1; n <= 10; n++) chk(u[n - 1] - 6, -4 * 0.5 ** (n - 1), 1e-12);
  const s10 = sig(1, 10, (n) => u[n - 1]);
  chk(s10, 60 + gp.sum(-4, 0.5, 10), 1e-9);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("series.arithmetic"), Q("series.geometric")],
    stem: t`A sequence is defined by $u_1 = 2$ and $u_{n+1} = \frac{1}{2}u_n + 3$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find $u_2$, $u_3$ and $u_4$.`, template: "u₂ = {{blank:a}}, u₃ = {{blank:b}}, u₄ = {{blank:c}}",
        blanks: [N("a", 4, "7"), N("b", 5, "6.5"), N("c", 5.5, "6")],
        explanation: t`$u_2 = 1 + 3 = 4$, $u_3 = 2 + 3 = 5$, $u_4 = 2.5 + 3 = 5.5$.` }),
      P.num({ label: "(b)", marks: 1, stem: "The sequence is convergent. State its limit.", value: 6, wrong: [3, 0],
        explanation: t`At the limit $L = \frac{1}{2}L + 3$, so $L = 6$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Let $v_n = u_n - 6$. Show that $v_{n+1} = \frac{1}{2}v_n$, so that $v_n$ is a geometric progression.`,
        points: [t`M1 $v_{n+1} = u_{n+1} - 6 = \frac{1}{2}u_n + 3 - 6 = \frac{1}{2}u_n - 3$.`, t`A1 $= \frac{1}{2}(u_n - 6) = \frac{1}{2}v_n$: a GP with ratio $\frac{1}{2}$ and first term $v_1 = -4$.`],
        modelAnswer: t`$$
v_{n+1} = u_{n+1} - 6 = \frac{1}{2}u_n - 3 = \frac{1}{2}(u_n - 6) = \frac{1}{2}v_n
$$

So $(v_n)$ is geometric with first term $v_1 = 2 - 6 = -4$ and common ratio $\frac{1}{2}$.`,
        explanation: "Subtracting the limit turns the recurrence into a pure multiplication." }),
      P.num({ label: "(d)", marks: 2, stem: t`Hence find $\displaystyle\sum_{n=1}^{10} u_n$, correct to 3 significant figures.`, value: s10, wrong: [60, 68],
        explanation: t`$\sum u_n = \sum (6 + v_n) = 60 + \frac{-4(1 - 0.5^{10})}{0.5} = 60 - 7.992 = 52.0$.` }),
    ],
    explanation: "A convergent recurrence: find the limit, subtract it to get a GP, then sum.",
    hints: ["At the limit, u(n+1) = u(n) = L.", "Write u(n) = 6 + v(n)."],
  });

  // ---------------------------------------------------------------- ZP2B-1 (16): harmonic form, building to "hence"
  const al = atan(4 / 3);
  ident((x) => 3 * cos(x) + 4 * sin(x), (x) => 5 * cos(x - al), "3cos+4sin");
  const s1 = solveTrig({ fn: "cos", k: -0.2, b: -deg(al), lo: 0, hi: 360 });
  s1.forEach((x) => chk(3 * cos(rad(x)) + 4 * sin(rad(x)), -1, 1e-9));
  const s2 = solveTrig({ fn: "cos", k: -0.2, a: 2, b: -deg(al), lo: 0, hi: 180 });
  s2.forEach((x, i) => { chk(3 * cos(rad(2 * x)) + 8 * sin(rad(x)) * cos(rad(x)), -1, 1e-9); chk(x, s1[i] / 2, 1e-9); });
  b.struct({
    d: 5, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("trig.harmonic-form"), Q("trig.compound-double-angle")],
    stem: t`This question is about the expression $3\cos\theta + 4\sin\theta$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $3\cos\theta + 4\sin\theta$ in the form $R\cos(\theta - \alpha)$, where $R > 0$ and $0^\circ < \alpha < 90^\circ$. Give $\alpha$ to 2 decimal places.`, template: "R = {{blank:R}}, α = {{blank:a}}°",
        blanks: [N("R", 5, "7", 1), { id: "a", input: "number", accepted: [String(rnd(deg(al), 2))], tolerance: 0.005, wrong: "36.87", marks: 2 }],
        explanation: t`$R\cos\alpha = 3$, $R\sin\alpha = 4$: $R = 5$, $\alpha = \tan^{-1}\frac{4}{3} = 53.13^\circ$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence solve $3\cos\theta + 4\sin\theta = -1$ for $0^\circ \le \theta \le 360^\circ$, giving answers to 1 decimal place in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [A1("a", s1[0], "101.5", 2), A1("b", s1[1], "48.4", 2)],
        explanation: t`$\cos(\theta - 53.13^\circ) = -0.2$; $\cos^{-1}(-0.2) = 101.54^\circ$. So $\theta - 53.13^\circ = 101.54^\circ$ or $-101.54^\circ$, giving $\theta = 154.7^\circ$ or $-48.41^\circ + 360^\circ = 311.6^\circ$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Find the greatest and least values of $\dfrac{1}{7 - 3\cos\theta - 4\sin\theta}$, giving the least value to 3 significant figures.`, template: "greatest {{blank:g}}, least {{blank:l}}",
        blanks: [N("g", 0.5, "0.0833", 1), S3("l", 1 / 12, 4, "0.5", 2)],
        explanation: t`The denominator $7 - 5\cos(\theta - \alpha)$ lies between $2$ and $12$: greatest $\frac{1}{2} = 0.5$, least $\frac{1}{12} = 0.0833$.` }),
      P.proof({ label: "(d)", marks: 2, stem: t`Show that the equation $3\cos 2x + 8\sin x\cos x = -1$ can be written as $3\cos 2x + 4\sin 2x = -1$.`,
        points: [t`M1 uses $\sin 2x = 2\sin x\cos x$.`, t`A1 $8\sin x\cos x = 4\sin 2x$, giving the result.`],
        modelAnswer: t`$$
8\sin x\cos x = 4(2\sin x\cos x) = 4\sin 2x \Rightarrow 3\cos 2x + 8\sin x\cos x = 3\cos 2x + 4\sin 2x
$$`,
        explanation: "Recognise the double-angle formula." }),
      P.fib({ label: "(e)", marks: 4, stem: t`Hence solve $3\cos 2x + 8\sin x\cos x = -1$ for $0^\circ \le x \le 180^\circ$, giving answers to 1 decimal place in ascending order.`, template: "x = {{blank:a}}° or x = {{blank:b}}°",
        blanks: [A1("a", s2[0], "154.7", 2), A1("b", s2[1], "311.6", 2)],
        explanation: t`With $\theta = 2x$ and $0^\circ \le 2x \le 360^\circ$, (b) gives $2x = 154.67^\circ$ or $311.59^\circ$, so $x = 77.3^\circ$ or $155.8^\circ$.` }),
    ],
    explanation: "Harmonic form gives solutions and extreme values; a double-angle rewrite turns a new equation into the old one in 2x.",
    hints: ["Keep α to 2 d.p.", "In (e), let θ = 2x and use your answers to (b)."],
  });

  // ---------------------------------------------------------------- ZP2B-2 (16): method of differences
  for (const r of [1, 2, 7]) chk(2 / ((r + 1) * (r + 3)), 1 / (r + 1) - 1 / (r + 3), 1e-12);
  const Sn = (n) => sig(1, n, (r) => 2 / ((r + 1) * (r + 3)));
  for (const n of [1, 2, 5, 40]) chk(Sn(n), 5 / 6 - 1 / (n + 2) - 1 / (n + 3), 1e-12);
  const n2 = least((n) => Sn(n) > 0.7);
  chk(n2, 13);
  const s1020 = Sn(20) - Sn(9);
  chk(s1020, 1 / 11 + 1 / 12 - 1 / 22 - 1 / 23, 1e-12);
  b.struct({
    d: 5, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("series.standard-sums-differences")],
    stem: t`Let $S_n = \displaystyle\sum_{r=1}^{n} \frac{2}{(r + 1)(r + 3)}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Express $\dfrac{2}{(r + 1)(r + 3)}$ in the form $\dfrac{A}{r + 1} + \dfrac{B}{r + 3}$.`, template: "A = {{blank:A}}, B = {{blank:B}}",
        blanks: [N("A", 1, "2"), N("B", -1, "1")],
        explanation: t`$2 = A(r + 3) + B(r + 1)$. $r = -1$: $A = 1$; $r = -3$: $B = -1$.` }),
      P.proof({ label: "(b)", marks: 4, stem: t`Use the method of differences to show that $S_n = \dfrac{5}{6} - \dfrac{1}{n + 2} - \dfrac{1}{n + 3}$.`,
        points: [
          t`M1 writes terms as $\frac{1}{r + 1} - \frac{1}{r + 3}$ for $r = 1, 2, \ldots, n$.`,
          t`M1 shows the cancellation pattern (first rows and last rows).`,
          t`A1 identifies the survivors $\frac{1}{2} + \frac{1}{3} - \frac{1}{n + 2} - \frac{1}{n + 3}$.`,
          t`A1 simplifies $\frac{1}{2} + \frac{1}{3} = \frac{5}{6}$.`,
        ],
        modelAnswer: t`$$
S_n = \left(\frac{1}{2} - \frac{1}{4}\right) + \left(\frac{1}{3} - \frac{1}{5}\right) + \left(\frac{1}{4} - \frac{1}{6}\right) + \cdots + \left(\frac{1}{n + 1} - \frac{1}{n + 3}\right)
$$

Every term from $\frac{1}{4}$ to $\frac{1}{n + 1}$ appears once with each sign and cancels, leaving

$$
S_n = \frac{1}{2} + \frac{1}{3} - \frac{1}{n + 2} - \frac{1}{n + 3} = \frac{5}{6} - \frac{1}{n + 2} - \frac{1}{n + 3}
$$`,
        explanation: "The gap between r + 1 and r + 3 is 2, so two terms survive at each end." }),
      P.num({ label: "(c)", marks: 2, stem: "Write down the sum to infinity of the series, correct to 3 significant figures.", value: 5 / 6, wrong: [0.5, 1],
        explanation: t`As $n \to \infty$ the last two terms tend to 0, so $S_\infty = \frac{5}{6} = 0.833$.` }),
      P.num({ label: "(d)", marks: 4, stem: t`Find the least value of $n$ for which $S_n > 0.7$.`, prefix: "n =", value: n2, wrong: [12, 14],
        explanation: t`Need $\frac{1}{n + 2} + \frac{1}{n + 3} < \frac{5}{6} - 0.7 = 0.1\dot{3}$. $n = 12$: $\frac{1}{14} + \frac{1}{15} = 0.138$ (too big); $n = 13$: $\frac{1}{15} + \frac{1}{16} = 0.129$. So $n = 13$.` }),
      P.num({ label: "(e)", marks: 4, stem: t`Find $\displaystyle\sum_{r=10}^{20} \frac{2}{(r + 1)(r + 3)}$, correct to 3 significant figures.`, value: s1020, wrong: [Sn(20) - Sn(10), Sn(20)],
        explanation: t`$S_{20} - S_9 = \left(\frac{1}{11} + \frac{1}{12}\right) - \left(\frac{1}{22} + \frac{1}{23}\right) = 0.0853$.` }),
    ],
    explanation: "Partial fractions make the series telescope; the closed form gives the sum to infinity, a 'least n' and sums between limits.",
    hints: ["Write out the first three and last two rows of the cancellation.", t`$\sum_{10}^{20} = S_{20} - S_9$.`],
  });
  chk(rnd(s1020, 4), 0.0853);
});
