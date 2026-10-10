// W1b: amaths.trig.harmonic-form
import { concept, P, t, chk, same, solveTrig, rnd, rad, deg } from "../lib.mjs";

const { sin, cos, sqrt, atan, PI } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const A1 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong, ...(marks ? { marks } : {}) });
const S3 = (id, x, dp, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, dp))], tolerance: 0.5 * 10 ** -dp, wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, value, wrong, marks) => ({ id, input: "number", accepted: list, tolerance: 0.002, wrong, ...(marks ? { marks } : {}) });

concept("amaths.trig.harmonic-form", { file: "trig/harmonic-form", keyPrefix: "trig.harmonic-form" }, (b) => {
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The expression $5\sin\theta + 12\cos\theta$ is written as $R\sin(\theta + \alpha)$ with $R > 0$. What is $R$?`,
    options: [
      ["13", t`Correct: $R = \sqrt{5^2 + 12^2} = \sqrt{169} = 13$.`],
      ["17", t`This adds the coefficients; $R$ is $\sqrt{a^2 + b^2}$.`],
      ["169", t`This is $R^2$; take the square root.`],
      ["7", t`This subtracts the coefficients; signs do not matter in $\sqrt{a^2 + b^2}$.`],
    ],
    answer: "A",
    explanation: t`$R\cos\alpha = 5$ and $R\sin\alpha = 12$; squaring and adding gives $R^2 = 169$, so $R = 13$.`,
  });

  const al2 = atan(3 / 4);
  ident((x) => 4 * cos(x) - 3 * sin(x), (x) => 5 * cos(x + al2), "4cos-3sin");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Express $4\cos\theta - 3\sin\theta$ in the form $R\cos(\theta + \alpha)$, where $R > 0$ and $0^\circ < \alpha < 90^\circ$. Give $\alpha$ to 1 decimal place.`,
    template: "R = {{blank:R}}, α = {{blank:a}}°",
    blanks: [N("R", 5, "25"), A1("a", deg(al2), "53.1")],
    explanation: t`$R\cos(\theta + \alpha) = R\cos\theta\cos\alpha - R\sin\theta\sin\alpha$, so $R\cos\alpha = 4$ and $R\sin\alpha = 3$. $R = 5$, $\tan\alpha = \frac{3}{4}$, $\alpha = 36.9^\circ$. ($53.1^\circ$ uses $\tan\alpha = \frac{4}{3}$.)`,
    hints: ["Expand R cos(θ + α) and compare coefficients of cos θ and sin θ."],
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the greatest value of $6\sin x + 8\cos x$.`,
    value: 10, wrong: [14, 8],
    explanation: t`$6\sin x + 8\cos x = 10\sin(x + \alpha)$ with $R = \sqrt{36 + 64} = 10$, and the greatest value of $\sin$ is 1. (14 adds the coefficients, but the two terms are never both at their maximum.)`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the least value of $7 - 3\sin x - 4\cos x$.`,
    value: 2, wrong: [0, 12],
    explanation: t`$3\sin x + 4\cos x = 5\sin(x + \alpha)$ takes values from $-5$ to $5$. The least value of $7 - 5\sin(x + \alpha)$ is $7 - 5 = 2$. (12 is the greatest value.)`,
  });

  ident((x) => sqrt(3) * sin(x) + cos(x), (x) => 2 * sin(x + PI / 6), "√3 sin + cos");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $\sqrt{3}\sin x + \cos x$ in the form $R\sin(x + \alpha)$, where $R > 0$ and $0^\circ < \alpha < 90^\circ$.`,
    template: "R = {{blank:R}}, α = {{blank:a}}°",
    blanks: [N("R", 2, "4"), N("a", 30, "60")],
    explanation: t`$R\cos\alpha = \sqrt{3}$, $R\sin\alpha = 1$. $R = \sqrt{3 + 1} = 2$; $\tan\alpha = \frac{1}{\sqrt{3}}$, $\alpha = 30^\circ$.`,
    hints: [t`$\tan\alpha = \frac{1}{\sqrt{3}}$ is an exact value.`],
  });

  // 4 sin θ + 3 cos θ = 1 → 5 sin(θ + 36.87°) = 1
  const s6 = solveTrig({ fn: "sin", k: 0.2, b: deg(atan(0.75)), lo: 0, hi: 360 });
  s6.forEach((x) => chk(4 * sin(rad(x)) + 3 * cos(rad(x)), 1, 1e-9));
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`By first writing $4\sin\theta + 3\cos\theta$ in the form $R\sin(\theta + \alpha)$, solve $4\sin\theta + 3\cos\theta = 1$ for $0^\circ \le \theta \le 360^\circ$. Give answers to 1 decimal place in ascending order.`,
    template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
    blanks: [A1("a", s6[0], "11.5"), A1("b", s6[1], "168.5")],
    explanation: t`$R = 5$, $\alpha = \tan^{-1}\frac{3}{4} = 36.87^\circ$. $\sin(\theta + 36.87^\circ) = 0.2$ with $36.87^\circ \le \theta + 36.87^\circ \le 396.87^\circ$: $\theta + 36.87^\circ = 168.46^\circ$ or $371.54^\circ$. So $\theta = 131.6^\circ$ or $334.7^\circ$.`,
    hints: [t`$\sin^{-1}0.2 = 11.54^\circ$, which is below the shifted interval: use $180^\circ - 11.54^\circ$ and $360^\circ + 11.54^\circ$.`],
  });

  chk(20 / (15 - 13), 10);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the greatest value of $\dfrac{20}{15 - 5\sin x - 12\cos x}$.`,
    value: 10, wrong: [20 / 28, 20 / 15],
    explanation: t`$5\sin x + 12\cos x = 13\sin(x + \alpha)$ lies between $-13$ and $13$, so the denominator lies between $2$ and $28$ (always positive). The fraction is greatest when the denominator is least: $\frac{20}{2} = 10$.`,
    hints: ["Write 5 sin x + 12 cos x in harmonic form.", "A positive fraction is largest when its denominator is smallest."],
  });

  const al8 = atan(4 / 3);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Given that $3\cos\theta + 4\sin\theta = 5\cos(\theta - 53.13^\circ)$, for which value of $\theta$ between $0^\circ$ and $360^\circ$ is $3\cos\theta + 4\sin\theta$ greatest?`,
    options: [
      [t`$53.1^\circ$`, t`Correct: the maximum of $\cos(\theta - 53.13^\circ)$ occurs when $\theta - 53.13^\circ = 0^\circ$.`],
      [t`$233.1^\circ$`, t`Here $\theta - 53.13^\circ = 180^\circ$, which gives the minimum, $-5$.`],
      [t`$143.1^\circ$`, t`Here the cosine is zero, so the expression is 0.`],
      [t`$306.9^\circ$`, t`This is $360^\circ - 53.13^\circ$; the shift is $-53.13^\circ$, so the maximum is at $+53.13^\circ$.`],
    ],
    answer: "A",
    explanation: t`$5\cos(\theta - \alpha)$ is greatest (5) when $\theta = \alpha = 53.1^\circ$. Check: $3\cos 53.13^\circ + 4\sin 53.13^\circ = 1.8 + 3.2 = 5$.`,
    hints: ["Where does cos u reach its maximum?"],
  });
  chk(3 * cos(al8) + 4 * sin(al8), 5);

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The equation $2\sin x + \cos x = 3$ has no real solutions.`,
    answer: true,
    explanation: t`$2\sin x + \cos x = \sqrt{5}\sin(x + \alpha)$, which never exceeds $\sqrt{5} \approx 2.24 < 3$. So no solutions.`,
    hints: [t`Compare 3 with $\sqrt{a^2 + b^2}$.`],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`To write $2\cos\theta + 5\sin\theta$ as $R\cos(\theta - \alpha)$, which pair of equations do you solve?`,
    options: [
      [t`$R\cos\alpha = 2$ and $R\sin\alpha = 5$`, t`Correct: $R\cos(\theta - \alpha) = R\cos\theta\cos\alpha + R\sin\theta\sin\alpha$; match the coefficients of $\cos\theta$ and $\sin\theta$.`],
      [t`$R\cos\alpha = 5$ and $R\sin\alpha = 2$`, t`The coefficient of $\cos\theta$ is matched to $R\cos\alpha$, so this pair is swapped.`],
      [t`$R\cos\alpha = 2$ and $R\sin\alpha = -5$`, t`$\cos(\theta - \alpha)$ expands with a plus sign, so $R\sin\alpha = +5$.`],
      [t`$R = 2 + 5$ and $\tan\alpha = \frac{2}{5}$`, t`$R$ is not the sum of the coefficients, and $\tan\alpha = \frac{5}{2}$.`],
    ],
    answer: "A",
    explanation: t`Expanding gives $R\cos\alpha = 2$, $R\sin\alpha = 5$, so $R = \sqrt{29}$ and $\tan\alpha = \frac{5}{2}$.`,
    hints: [t`Expand $R\cos(\theta - \alpha)$ first.`],
  });

  // sin x + √3 cos x = √2 → 2 sin(x + π/3) = √2; x in (0, 2π): x = 5π/12, 23π/12
  const s11 = solveTrig({ fn: "sin", k: sqrt(2) / 2, b: PI / 3, lo: 0, hi: 2 * PI, unit: "rad" });
  s11.forEach((v, i) => chk(v, [(5 * PI) / 12, (23 * PI) / 12][i], 1e-8));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Find the smallest positive solution of $\sin x + \sqrt{3}\cos x = \sqrt{2}$, in radians correct to 3 significant figures.`,
    value: s11[0], unit: "rad", wrong: [PI / 4 - PI / 3 + 2 * PI, PI / 4],
    explanation: t`$\sin x + \sqrt{3}\cos x = 2\sin\left(x + \frac{\pi}{3}\right)$. So $\sin\left(x + \frac{\pi}{3}\right) = \frac{\sqrt{2}}{2}$. For $x > 0$, $x + \frac{\pi}{3} > \frac{\pi}{3}$, so $x + \frac{\pi}{3} = \frac{3\pi}{4}$ (not $\frac{\pi}{4}$): $x = \frac{5\pi}{12} = 1.31$.`,
    hints: [t`$R = 2$ and $\alpha = \frac{\pi}{3}$.`, t`The compound angle must exceed $\frac{\pi}{3}$.`],
  });

  ident((x) => sqrt(3) * cos(x) + sin(x), (x) => 2 * cos(x - PI / 6), "√3cos+sin");
  b.proof({
    d: 4, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`Show that $\sqrt{3}\cos x + \sin x \equiv 2\cos\left(x - \frac{\pi}{6}\right)$.`,
    points: [
      t`M1 expands $2\cos\left(x - \frac{\pi}{6}\right) = 2\cos x\cos\frac{\pi}{6} + 2\sin x\sin\frac{\pi}{6}$.`,
      t`M1 uses $\cos\frac{\pi}{6} = \frac{\sqrt{3}}{2}$ and $\sin\frac{\pi}{6} = \frac{1}{2}$.`,
      t`A1 obtains $\sqrt{3}\cos x + \sin x$.`,
    ],
    modelAnswer: t`$$
2\cos\left(x - \frac{\pi}{6}\right) = 2\left(\cos x \cdot \frac{\sqrt{3}}{2} + \sin x \cdot \frac{1}{2}\right) = \sqrt{3}\cos x + \sin x
$$`,
    explanation: "Expanding the right-hand side is the quickest proof.",
    hints: ["Start from the right-hand side and expand."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why the greatest value of $a\sin\theta + b\cos\theta$ is $\sqrt{a^2 + b^2}$ and not $a + b$ (for positive $a$ and $b$).`,
    points: [
      t`The expression equals $R\sin(\theta + \alpha)$ with $R = \sqrt{a^2 + b^2}$, and $\sin$ is at most 1.`,
      t`$\sin\theta$ and $\cos\theta$ cannot both equal 1 at the same angle, so $a + b$ is never reached.`,
    ],
    modelAnswer: "Writing a sin θ + b cos θ = R sin(θ + α) with R = √(a² + b²) shows the values range from −R to R. The sum a + b would need sin θ = cos θ = 1 together, which never happens (sin²θ + cos²θ = 1).",
    explanation: "The two waves peak at different angles, so their maxima do not add.",
    hints: ["Can sin θ and cos θ both equal 1 at the same angle?"],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each harmonic form with its expansion.",
    pairs: [
      [t`$R\sin(\theta + \alpha)$`, t`$R\sin\theta\cos\alpha + R\cos\theta\sin\alpha$`],
      [t`$R\sin(\theta - \alpha)$`, t`$R\sin\theta\cos\alpha - R\cos\theta\sin\alpha$`],
      [t`$R\cos(\theta + \alpha)$`, t`$R\cos\theta\cos\alpha - R\sin\theta\sin\alpha$`],
      [t`$R\cos(\theta - \alpha)$`, t`$R\cos\theta\cos\alpha + R\sin\theta\sin\alpha$`],
    ],
    explanation: "These are the compound-angle formulae multiplied by R; compare coefficients with the given expression to find R and α.",
  });

  // 2 + 5 sin θ − 12 cos θ = 2 + 13 sin(θ − α), α = tan⁻¹(12/5); max 15 at θ = 90° + α
  const al15 = atan(12 / 5);
  ident((x) => 5 * sin(x) - 12 * cos(x), (x) => 13 * sin(x - al15), "5sin-12cos");
  chk(2 + 5 * sin(rad(90) + al15) - 12 * cos(rad(90) + al15), 15);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Find the greatest value of $2 + 5\sin\theta - 12\cos\theta$ and the value of $\theta$, for $0^\circ \le \theta \le 360^\circ$, at which it occurs (1 decimal place).`,
    template: "greatest value {{blank:m}} at θ = {{blank:t}}°",
    blanks: [N("m", 15, "13"), A1("t", 90 + deg(al15), "67.4")],
    explanation: t`$5\sin\theta - 12\cos\theta = 13\sin(\theta - \alpha)$ with $\tan\alpha = \frac{12}{5}$, $\alpha = 67.38^\circ$. Greatest value $2 + 13 = 15$ when $\theta - 67.38^\circ = 90^\circ$: $\theta = 157.4^\circ$.`,
    hints: [t`Use $R\sin(\theta - \alpha)$.`, "sin u is greatest when u = 90°."],
  });

  // depth d = 10 + 0.5 cos(0.5t) + 1.2 sin(0.5t), t hours
  const al16 = atan(1.2 / 0.5);
  ident((x) => 0.5 * cos(x) + 1.2 * sin(x), (x) => 1.3 * cos(x - al16), "depth");
  b.calc({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: t`A model for the depth of water, $d$ metres, at a jetty on Lake Kariba during a storm surge is $d = 10 + 0.5\cos(0.5t) + 1.2\sin(0.5t)$, where $t$ is the time in hours after midnight and angles are in radians. Find the first time after midnight at which the depth is greatest, in hours correct to 3 significant figures.`,
    value: al16 / 0.5, unit: "h", wrong: [al16, atan(0.5 / 1.2) / 0.5],
    explanation: t`$0.5\cos(0.5t) + 1.2\sin(0.5t) = 1.3\cos(0.5t - \alpha)$ with $\tan\alpha = \frac{1.2}{0.5}$, $\alpha = 1.176$. Greatest when $0.5t = \alpha$: $t = \frac{1.176}{0.5} = 2.35$ hours. The greatest depth is $10 + 1.3 = 11.3$ m.`,
    hints: [t`Write the trigonometric part as $R\cos(0.5t - \alpha)$.`, "Do not forget to divide by 0.5 at the end."],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For which value of $k$ does the equation $3\sin x + 4\cos x = k$ have **no** solutions?`,
    options: [
      ["6", t`Correct: $3\sin x + 4\cos x$ never exceeds $\sqrt{9 + 16} = 5$.`],
      ["5", t`$k = 5$ is the greatest value, reached at one point in each cycle.`],
      ["−5", t`$k = -5$ is the least value, reached at one point in each cycle.`],
      ["4", t`$4 < 5$, so the line $y = 4$ cuts the curve twice in each cycle.`],
    ],
    answer: "A",
    explanation: t`$3\sin x + 4\cos x = 5\sin(x + \alpha)$, so the possible values are $-5 \le k \le 5$.`,
    hints: [t`Find $R = \sqrt{a^2 + b^2}$.`],
  });

  // Struct (12): 5 cos x − 12 sin x = 13 cos(x + α), α = 67.38°
  const al17 = atan(12 / 5);
  ident((x) => 5 * cos(x) - 12 * sin(x), (x) => 13 * cos(x + al17), "5cos-12sin");
  const s17 = solveTrig({ fn: "cos", k: 0.5, b: deg(al17), lo: 0, hi: 360 });
  s17.forEach((x) => chk(5 * cos(rad(x)) - 12 * sin(rad(x)), 6.5, 1e-9));
  const xMin = 360 - deg(al17);
  chk(15 + 5 * cos(rad(xMin)) - 12 * sin(rad(xMin)), 28, 1e-9);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`This question is about the expression $5\cos x - 12\sin x$, for $0^\circ \le x \le 360^\circ$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $5\cos x - 12\sin x$ in the form $R\cos(x + \alpha)$, where $R > 0$ and $0^\circ < \alpha < 90^\circ$. Give $\alpha$ to 2 decimal places.`, template: "R = {{blank:R}}, α = {{blank:a}}°",
        blanks: [N("R", 13, "17", 1), { id: "a", input: "number", accepted: [String(rnd(deg(al17), 2))], tolerance: 0.005, wrong: "22.62", marks: 2 }],
        explanation: t`$R\cos\alpha = 5$, $R\sin\alpha = 12$: $R = 13$, $\alpha = \tan^{-1}\frac{12}{5} = 67.38^\circ$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence solve $5\cos x - 12\sin x = 6.5$, giving answers to 1 decimal place in ascending order.`, template: "x = {{blank:a}}° or x = {{blank:b}}°",
        blanks: [A1("a", s17[0], "352.6", 2), A1("b", s17[1], "232.6", 2)],
        explanation: t`$\cos(x + 67.38^\circ) = \frac{1}{2}$ with $67.38^\circ \le x + 67.38^\circ \le 427.38^\circ$: $x + 67.38^\circ = 300^\circ$ or $420^\circ$ ($60^\circ$ is too small). So $x = 232.6^\circ$ or $352.6^\circ$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Find the greatest and least values of $\dfrac{1}{15 + 5\cos x - 12\sin x}$, giving the least value correct to 3 significant figures.`, template: "greatest {{blank:g}}, least {{blank:l}}",
        blanks: [N("g", 0.5, "0.0357", 1), S3("l", 1 / 28, 4, "0.5", 2)],
        explanation: t`The denominator $15 + 13\cos(x + \alpha)$ lies between $2$ and $28$. Greatest value $\frac{1}{2} = 0.5$; least value $\frac{1}{28} = 0.0357$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the value of x at which the least value in (c) occurs, to 1 decimal place.", value: xMin, unit: "°", wrong: [deg(al17), 180 - deg(al17)],
        explanation: t`Least value of the fraction when the denominator is greatest: $\cos(x + 67.38^\circ) = 1$, $x + 67.38^\circ = 360^\circ$, $x = 292.6^\circ$.` }),
    ],
    explanation: "Harmonic form, then shifted-interval solving, then extreme values of a reciprocal.",
    hints: ["Keep α to 2 decimal places for the later parts.", "A reciprocal is least when its denominator is greatest."],
  });

  // Struct (13): f(x) = √3 sin 2x + cos 2x = 2 sin(2x + π/6), 0 < x < π
  ident((x) => sqrt(3) * sin(2 * x) + cos(2 * x), (x) => 2 * sin(2 * x + PI / 6), "f");
  const s18 = solveTrig({ fn: "sin", k: -0.5, a: 2, b: PI / 6, lo: 0, hi: PI, unit: "rad" });
  s18.forEach((v, i) => chk(v, [PI / 2, (5 * PI) / 6][i], 1e-8));
  chk(2 * sin(2 * (PI / 6) + PI / 6), 2); chk(2 * sin(2 * ((2 * PI) / 3) + PI / 6), -2, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The function f is defined by $f(x) = \sqrt{3}\sin 2x + \cos 2x$ for $0 < x < \pi$. Give angles in radians.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $f(x)$ in the form $R\sin(2x + \alpha)$, where $R > 0$ and $0 < \alpha < \frac{\pi}{2}$. Give $\alpha$ as a multiple of π: α = kπ.`, template: "R = {{blank:R}}, k = {{blank:k}}",
        blanks: [N("R", 2, "4", 1), FR("k", ["1/6", "0.1667", "0.167"], 1 / 6, "1/3", 2)],
        explanation: t`$R\cos\alpha = \sqrt{3}$, $R\sin\alpha = 1$: $R = 2$, $\tan\alpha = \frac{1}{\sqrt{3}}$, $\alpha = \frac{\pi}{6}$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence solve $f(x) = -1$. Give each solution as a multiple of π, x = kπ, in ascending order (fractions allowed).`, template: "x = {{blank:a}}π or x = {{blank:b}}π",
        blanks: [FR("a", ["1/2", "0.5"], 0.5, "7/12", 2), FR("b", ["5/6", "0.8333", "0.833"], 5 / 6, "11/12", 2)],
        explanation: t`$\sin\left(2x + \frac{\pi}{6}\right) = -\frac{1}{2}$ with $\frac{\pi}{6} < 2x + \frac{\pi}{6} < \frac{13\pi}{6}$: $2x + \frac{\pi}{6} = \frac{7\pi}{6}$ or $\frac{11\pi}{6}$, so $x = \frac{\pi}{2}$ or $\frac{5\pi}{6}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`State the greatest value of $f(x)$ and the value of $x$ at which it occurs, as x = kπ.`, template: "greatest value {{blank:m}} at x = {{blank:k}}π",
        blanks: [N("m", 2, "4", 1), FR("k", ["1/6", "0.1667", "0.167"], 1 / 6, "1/4", 2)],
        explanation: t`Greatest value $R = 2$ when $2x + \frac{\pi}{6} = \frac{\pi}{2}$, i.e. $x = \frac{\pi}{6}$.` }),
      P.fib({ label: "(d)", marks: 3, stem: t`Find the greatest value of $\dfrac{1}{3 + f(x)}$ and the value of $x$ at which it occurs, as x = kπ.`, template: "greatest value {{blank:m}} at x = {{blank:k}}π",
        blanks: [N("m", 1, "0.2", 1), FR("k", ["2/3", "0.6667", "0.667"], 2 / 3, "1/6", 2)],
        explanation: t`$3 + f(x)$ lies between $1$ and $5$, so the greatest value is $\frac{1}{1} = 1$, when $\sin\left(2x + \frac{\pi}{6}\right) = -1$: $2x + \frac{\pi}{6} = \frac{3\pi}{2}$, $x = \frac{2\pi}{3}$.` }),
    ],
    explanation: "Exact harmonic form with α = π/6; solve over the shifted interval for 2x + π/6; extremes from sin = ±1.",
    hints: [t`For $0 < x < \pi$, the compound angle $2x + \frac{\pi}{6}$ runs from $\frac{\pi}{6}$ to $\frac{13\pi}{6}$.`],
  });

  b.card("FORMULA", "R in the harmonic form", t`$R = \sqrt{a^2 + b^2}$ for $a\sin\theta \pm b\cos\theta$ or $a\cos\theta \pm b\sin\theta$`);
  b.card("CONCEPT", "Finding α", t`Expand $R\sin(\theta \pm \alpha)$ or $R\cos(\theta \pm \alpha)$, match coefficients to get $R\cos\alpha$ and $R\sin\alpha$, then divide for $\tan\alpha$.`);
  b.card("FACT", "Range of a sin θ + b cos θ", t`From $-\sqrt{a^2 + b^2}$ to $\sqrt{a^2 + b^2}$.`);
  b.card("CONCEPT", "Solving a sin θ + b cos θ = c", "Convert to R sin(θ + α) = c, solve for θ + α over the shifted interval, then subtract α.");
  b.card("FACT", "When there is no solution", t`$a\sin\theta + b\cos\theta = c$ has no solution if $|c| > \sqrt{a^2 + b^2}$.`);
  b.card("CONCEPT", "Greatest value of a reciprocal", "k ÷ (c + R cos(θ − α)) is greatest when the denominator is least, c − R (if positive).");
  b.card("CONCEPT", "Matching form to signs", t`$a\cos\theta + b\sin\theta \to R\cos(\theta - \alpha)$; $a\sin\theta - b\cos\theta \to R\sin(\theta - \alpha)$ (keeps $\alpha$ acute).`);
  b.card("FACT", "Where the maximum occurs", t`$R\cos(\theta - \alpha)$ is greatest at $\theta = \alpha$; $R\sin(\theta + \alpha)$ at $\theta + \alpha = 90^\circ$.`);
  b.card("CONCEPT", "Accuracy of α", "Keep α to 2 d.p. (degrees) or 4 s.f. (radians) when it is used in later parts.");
});
