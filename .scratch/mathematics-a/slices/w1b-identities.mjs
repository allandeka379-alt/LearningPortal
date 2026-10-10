// W1b: amaths.trig.basic-identities-equations
import { concept, P, t, chk, same, solveTrig, rnd, quad, rad } from "../lib.mjs";

const { sin, cos, tan, PI } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
const near = (a, e) => { chk(a.length, e.length); a.forEach((v, i) => chk(v, e[i], 1e-7)); };
/** Number blank, exact integer value. */
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
/** Number blank to 1 d.p. (degrees). */
const A1 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong, ...(marks ? { marks } : {}) });
/** Number blank to 3 s.f. (radians, |x| ≥ 1 → 2 d.p.). */
const R3 = (id, x, dp, wrong) => ({ id, input: "number", accepted: [String(rnd(x, dp))], tolerance: 0.5 * 10 ** -dp, wrong });

concept("amaths.trig.basic-identities-equations", { file: "trig/basic-identities-equations", keyPrefix: "trig.basic-identities-equations" }, (b) => {
  ident((x) => 1 - sin(x) ** 2, (x) => cos(x) ** 2, "1-sin2");
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which expression is identical to $1 - \sin^2\theta$?`,
    options: [
      [t`$\cos^2\theta$`, t`Correct: rearrange $\sin^2\theta + \cos^2\theta \equiv 1$.`],
      [t`$\tan^2\theta$`, t`$\tan^2\theta = \frac{\sin^2\theta}{\cos^2\theta}$; it is not $1 - \sin^2\theta$.`],
      [t`$(1 - \sin\theta)^2$`, t`This expands to $1 - 2\sin\theta + \sin^2\theta$.`],
      [t`$-\cos^2\theta$`, t`$1 - \sin^2\theta$ is never negative, so it cannot equal $-\cos^2\theta$.`],
    ],
    answer: "A",
    explanation: t`$\sin^2\theta + \cos^2\theta \equiv 1$, so $1 - \sin^2\theta \equiv \cos^2\theta$.`,
  });

  same(solveTrig({ fn: "sin", k: -0.5, lo: 0, hi: 360 }), [210, 330]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Solve $\sin x = -\frac{1}{2}$ for $0^\circ \le x \le 360^\circ$.`,
    options: [
      [t`$x = 210^\circ, 330^\circ$`, t`Correct: related angle $30^\circ$; sine is negative in the third and fourth quadrants.`],
      [t`$x = 30^\circ, 150^\circ$`, t`These solve $\sin x = +\frac{1}{2}$.`],
      [t`$x = -30^\circ, 210^\circ$`, t`$-30^\circ$ is outside the interval; add $360^\circ$ to get $330^\circ$.`],
      [t`$x = 150^\circ, 210^\circ$`, t`$\sin 150^\circ = +\frac{1}{2}$; the fourth-quadrant solution $330^\circ$ is missing.`],
    ],
    answer: "A",
    explanation: t`$180^\circ + 30^\circ = 210^\circ$ and $360^\circ - 30^\circ = 330^\circ$.`,
  });

  same(solveTrig({ fn: "tan", k: 1, lo: 0, hi: 360 }), [45, 225]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\tan x = 1$ for $0^\circ \le x \le 360^\circ$. Give the solutions in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 45, "135"), N("b", 225, "315")],
    explanation: t`$\tan^{-1}1 = 45^\circ$; tangent repeats every $180^\circ$, so $x = 45^\circ$ or $225^\circ$.`,
  });

  const e4 = solveTrig({ fn: "cos", k: -2 / 3, lo: 0, hi: 2 * PI, unit: "rad" });
  const al4 = Math.acos(2 / 3);
  near(e4, [PI - al4, PI + al4]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3\cos x + 2 = 0$ for $0 \le x \le 2\pi$, giving the solutions in radians correct to 3 significant figures, in ascending order.`,
    template: "x = {{blank:a}} or x = {{blank:b}}",
    blanks: [R3("a", e4[0], 2, "0.84"), R3("b", e4[1], 2, "5.44")],
    explanation: t`$\cos x = -\frac{2}{3}$. Related angle $\alpha = \cos^{-1}\frac{2}{3} = 0.8411$; cosine is negative in quadrants 2 and 3: $x = \pi - 0.8411 = 2.30$ and $x = \pi + 0.8411 = 3.98$. (The calculator's $\cos^{-1}\left(-\frac{2}{3}\right) = 2.30$ gives the first directly; $2\pi - 2.30 = 3.98$ gives the second.)`,
    hints: [t`Find the acute angle with $\cos\alpha = \frac{2}{3}$; where is cosine negative?`],
  });

  // 2cos²θ + 3 sin θ = 3 → 2s² − 3s + 1 = 0 → s = ½, 1
  same(quad.roots(2, -3, 1), [0.5, 1]);
  const e5 = [...solveTrig({ fn: "sin", k: 0.5, lo: 0, hi: 360 }), ...solveTrig({ fn: "sin", k: 1, lo: 0, hi: 360 })].sort((a, b2) => a - b2);
  same(e5, [30, 90, 150]);
  e5.forEach((x) => chk(2 * cos(rad(x)) ** 2 + 3 * sin(rad(x)), 3, 1e-12));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2\cos^2\theta + 3\sin\theta = 3$ for $0^\circ \le \theta \le 360^\circ$. Give the solutions in ascending order.`,
    template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°",
    blanks: [N("a", 30, "210"), N("b", 90, "270"), N("c", 150, "330")],
    explanation: t`$2(1 - \sin^2\theta) + 3\sin\theta - 3 = 0 \Rightarrow 2\sin^2\theta - 3\sin\theta + 1 = 0 \Rightarrow (2\sin\theta - 1)(\sin\theta - 1) = 0$. $\sin\theta = \frac{1}{2}$: $30^\circ, 150^\circ$; $\sin\theta = 1$: $90^\circ$.`,
    hints: [t`Replace $\cos^2\theta$ by $1 - \sin^2\theta$.`, "Factorise the quadratic in sin θ."],
  });

  chk(-Math.sqrt(1 - 0.36), -0.8);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Given that $\sin\theta = 0.6$ and $\theta$ is obtuse, find the exact value of $\cos\theta$.`,
    value: -0.8, wrong: [0.8, 0.4],
    explanation: t`$\cos^2\theta = 1 - 0.36 = 0.64$, so $\cos\theta = \pm 0.8$. An obtuse angle is in the second quadrant, where cosine is negative: $\cos\theta = -0.8$.`,
  });

  for (const x of [0, 60, 180, 300, 360]) chk(tan(rad(x)) - 2 * sin(rad(x)), 0, 1e-12);
  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: t`Nyasha solves $\tan\theta = 2\sin\theta$ for $0^\circ \le \theta \le 360^\circ$ by dividing both sides by $\sin\theta$, and gets $\theta = 60^\circ, 300^\circ$. Which solutions has he lost?`,
    options: [
      [t`$0^\circ, 180^\circ, 360^\circ$`, t`Correct: these make $\sin\theta = 0$, and dividing by $\sin\theta$ removes them. Factorise instead: $\sin\theta\left(\frac{1}{\cos\theta} - 2\right) = 0$.`],
      [t`$90^\circ, 270^\circ$`, t`At these angles $\tan\theta$ is undefined, so they cannot be solutions.`],
      [t`$120^\circ, 240^\circ$`, t`These give $\cos\theta = -\frac{1}{2}$, but the equation needs $\cos\theta = +\frac{1}{2}$.`],
      ["He has lost no solutions.", t`Substituting $\theta = 0^\circ$ gives $0 = 0$, so solutions were lost.`],
    ],
    answer: "A",
    explanation: t`Dividing by an expression that can be zero loses the solutions where it is zero. The full set is $0^\circ, 60^\circ, 180^\circ, 300^\circ, 360^\circ$.`,
    hints: ["What happens when sin θ = 0?"],
  });

  same(solveTrig({ fn: "sin", k: 0.5, a: 2, lo: 0, hi: 180 }), [15, 75]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\sin 2x = 0.5$ for $0^\circ \le x \le 180^\circ$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 15, "30"), N("b", 75, "150")],
    explanation: t`$0^\circ \le 2x \le 360^\circ$: $2x = 30^\circ$ or $150^\circ$, so $x = 15^\circ$ or $75^\circ$.`,
    hints: [t`Find all values of $2x$ in $0^\circ$ to $360^\circ$ first, then halve.`],
  });

  same(solveTrig({ fn: "tan", k: -1, b: -30, lo: 0, hi: 360 }), [165, 345]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\tan(x - 30^\circ) = -1$ for $0^\circ \le x \le 360^\circ$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 165, "105"), N("b", 345, "285")],
    explanation: t`$-30^\circ \le x - 30^\circ \le 330^\circ$. $\tan u = -1$ gives $u = 135^\circ$ or $315^\circ$ (and $-45^\circ$, outside the range). So $x = 165^\circ$ or $345^\circ$.`,
    hints: [t`Let $u = x - 30^\circ$ and find the interval for $u$.`],
  });

  ident((x) => (1 - cos(x) ** 2) / (1 - sin(x) ** 2), (x) => tan(x) ** 2, "tan2");
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 2,
    stem: t`Prove that $\dfrac{1 - \cos^2 x}{1 - \sin^2 x} \equiv \tan^2 x$.`,
    points: [t`M1 uses $\sin^2 x + \cos^2 x \equiv 1$ to write the numerator as $\sin^2 x$ and the denominator as $\cos^2 x$.`, t`A1 $\frac{\sin^2 x}{\cos^2 x} = \tan^2 x$.`],
    modelAnswer: t`$$
\frac{1 - \cos^2 x}{1 - \sin^2 x} = \frac{\sin^2 x}{\cos^2 x} = \left(\frac{\sin x}{\cos x}\right)^2 = \tan^2 x
$$`,
    explanation: "Both rearrangements come from sin²x + cos²x ≡ 1.",
    hints: [t`What is $1 - \cos^2 x$?`],
  });

  ident((x) => sin(x) ** 4 - cos(x) ** 4, (x) => 2 * sin(x) ** 2 - 1, "sin4");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Prove that $\sin^4\theta - \cos^4\theta \equiv 2\sin^2\theta - 1$.`,
    points: [
      t`M1 factorises as a difference of two squares: $(\sin^2\theta - \cos^2\theta)(\sin^2\theta + \cos^2\theta)$.`,
      t`M1 uses $\sin^2\theta + \cos^2\theta = 1$, leaving $\sin^2\theta - \cos^2\theta$.`,
      t`A1 replaces $\cos^2\theta$ by $1 - \sin^2\theta$ to reach $2\sin^2\theta - 1$.`,
    ],
    modelAnswer: t`$$
\sin^4\theta - \cos^4\theta = (\sin^2\theta - \cos^2\theta)(\sin^2\theta + \cos^2\theta)
$$

$$
= \sin^2\theta - \cos^2\theta = \sin^2\theta - (1 - \sin^2\theta) = 2\sin^2\theta - 1
$$`,
    explanation: t`$a^4 - b^4 = (a^2 - b^2)(a^2 + b^2)$ with $a = \sin\theta$, $b = \cos\theta$.`,
    hints: ["Treat sin⁴θ − cos⁴θ as a difference of two squares."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\cos^2\theta \equiv 1 + \sin^2\theta$ for all $\theta$.`,
    answer: false,
    explanation: t`From $\sin^2\theta + \cos^2\theta \equiv 1$, $\cos^2\theta \equiv 1 - \sin^2\theta$. At $\theta = 90^\circ$: $\cos^2\theta = 0$ but $1 + \sin^2\theta = 2$.`,
  });

  const e13 = solveTrig({ fn: "tan", k: 0.4, lo: 0, hi: 360 });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the smallest positive solution of $5\sin x = 2\cos x$, in degrees correct to 1 decimal place.`,
    value: e13[0], unit: "°", wrong: [rnd(Math.atan(2.5) * 180 / PI, 1), 23.6],
    explanation: t`Divide by $5\cos x$ ($\cos x \neq 0$ here): $\tan x = \frac{2}{5} = 0.4$, so $x = \tan^{-1}0.4 = 21.8^\circ$. ($68.2^\circ$ comes from $\tan x = 2.5$, the ratio upside down.)`,
    hints: ["Divide both sides by cos x to get tan x."],
  });

  chk(solveTrig({ fn: "sin", k: 0.2, lo: 0, hi: 4 * PI, unit: "rad" }).length, 4);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How many solutions does $\sin x = 0.2$ have for $0 \le x \le 4\pi$?`,
    options: [
      ["4", t`Correct: the interval is two full cycles of $\sin x$, and $y = 0.2$ crosses each cycle twice.`],
      ["2", t`That is the number in one cycle ($0$ to $2\pi$); the interval is two cycles.`],
      ["8", t`That would need four cycles; $4\pi$ is two periods of $2\pi$.`],
      ["1", t`The calculator gives one value, but sine repeats and is symmetrical.`],
    ],
    answer: "A",
    explanation: t`$\sin x = 0.2$ at $x = \alpha$ and $\pi - \alpha$ in each cycle ($\alpha = 0.201$), and $[0, 4\pi]$ contains two cycles.`,
    hints: ["How many periods of sin x are in the interval?"],
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Match each equation with its complete solution set for $0^\circ \le x \le 360^\circ$.`,
    pairs: [
      [t`$\cos x = 0$`, t`$90^\circ, 270^\circ$`],
      [t`$\sin x = -1$`, t`$270^\circ$`],
      [t`$\tan x = -1$`, t`$135^\circ, 315^\circ$`],
      [t`$\cos x = 1$`, t`$0^\circ, 360^\circ$`],
    ],
    explanation: t`Read each from the graphs: $\cos x = 0$ at the axis crossings $90^\circ$ and $270^\circ$; $\sin x = -1$ only at the minimum $270^\circ$; $\tan x = -1$ at $180^\circ - 45^\circ$ and $360^\circ - 45^\circ$; $\cos x = 1$ at both ends.`,
  });

  // tan θ = −8/15, 90° < θ < 180°: sin = 8/17, cos = −15/17
  const th16 = PI - Math.atan(8 / 15);
  chk(tan(th16), -8 / 15); chk(sin(th16) + cos(th16), -7 / 17);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $\tan\theta = -\frac{8}{15}$ and $90^\circ < \theta < 180^\circ$, find the exact value of $\sin\theta + \cos\theta$. Give your answer as a fraction.`,
    value: -7 / 17, wrong: [7 / 17, 23 / 17],
    explanation: t`A right-angled triangle with sides 8 and 15 has hypotenuse $\sqrt{64 + 225} = 17$. In the second quadrant $\sin\theta = \frac{8}{17}$ (positive) and $\cos\theta = -\frac{15}{17}$. Sum $= -\frac{7}{17}$.`,
    hints: ["Draw the right-angled triangle for the related angle.", "Which ratios are positive in the second quadrant?"],
  });

  ident((x) => 4 * sin(x) ** 2 - 3 * cos(x), (x) => -4 * cos(x) ** 2 - 3 * cos(x) + 4, "quad in cos");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $4\sin^2 x - 3\cos x$ in the form $a\cos^2 x + b\cos x + c$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [N("a", -4, "4"), N("b", -3, "3"), N("c", 4, "0")],
    explanation: t`$4\sin^2 x = 4(1 - \cos^2 x) = 4 - 4\cos^2 x$, so the expression is $-4\cos^2 x - 3\cos x + 4$.`,
    hints: [t`Replace $\sin^2 x$ by $1 - \cos^2 x$.`],
  });

  // 2 sin²θ = sin θ → 0, 30, 150, 180, 360
  for (const x of [0, 30, 150, 180, 360]) chk(2 * sin(rad(x)) ** 2 - sin(rad(x)), 0, 1e-12);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Which of these angles is a solution of $2\sin^2\theta = \sin\theta$?`,
    options: [
      [t`$150^\circ$`, t`Correct: $\sin 150^\circ = \frac{1}{2}$, and $2 \times \frac{1}{4} = \frac{1}{2}$.`],
      [t`$60^\circ$`, t`$\sin 60^\circ = \frac{\sqrt{3}}{2}$, and $2 \times \frac{3}{4} \neq \frac{\sqrt{3}}{2}$.`],
      [t`$210^\circ$`, t`$\sin 210^\circ = -\frac{1}{2}$: then $2\sin^2\theta = \frac{1}{2}$ but $\sin\theta = -\frac{1}{2}$.`],
      [t`$90^\circ$`, t`$\sin 90^\circ = 1$ gives $2 = 1$, which is false.`],
    ],
    answer: "A",
    explanation: t`$\sin\theta(2\sin\theta - 1) = 0$: $\sin\theta = 0$ or $\sin\theta = \frac{1}{2}$, giving $0^\circ, 30^\circ, 150^\circ, 180^\circ, 360^\circ$ in $[0^\circ, 360^\circ]$.`,
    hints: ["Factorise; do not divide by sin θ."],
  });

  // Struct (12): 2 tan θ sin θ = 3 → 2c² + 3c − 2 = 0
  same(quad.roots(2, 3, -2), [-2, 0.5]);
  same(solveTrig({ fn: "cos", k: 0.5, lo: 0, hi: 360 }), [60, 300]);
  same(solveTrig({ fn: "cos", k: 0.5, a: 2, lo: 0, hi: 180 }), [30, 150]);
  for (const x of [60, 300]) chk(2 * tan(rad(x)) * sin(rad(x)), 3, 1e-9);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`This question is about the equation $2\tan\theta\sin\theta = 3$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that the equation can be written as $2\cos^2\theta + 3\cos\theta - 2 = 0$.`,
        points: [t`M1 writes $\tan\theta = \frac{\sin\theta}{\cos\theta}$ and multiplies by $\cos\theta$: $2\sin^2\theta = 3\cos\theta$.`, t`M1 replaces $\sin^2\theta$ by $1 - \cos^2\theta$.`, t`A1 rearranges to the given quadratic.`],
        modelAnswer: t`$$
2\frac{\sin\theta}{\cos\theta}\sin\theta = 3 \Rightarrow 2\sin^2\theta = 3\cos\theta
$$

$$
2(1 - \cos^2\theta) = 3\cos\theta \Rightarrow 2\cos^2\theta + 3\cos\theta - 2 = 0
$$`,
        explanation: "Write tan in terms of sin and cos, clear the fraction, then use the Pythagorean identity." }),
      P.fib({ label: "(b)", marks: 3, stem: t`Hence solve $2\tan\theta\sin\theta = 3$ for $0^\circ \le \theta \le 360^\circ$, in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [N("a", 60, "120", 1), N("b", 300, "240", 2)],
        explanation: t`$(2\cos\theta - 1)(\cos\theta + 2) = 0$. $\cos\theta = -2$ is impossible; $\cos\theta = \frac{1}{2}$ gives $60^\circ$ and $300^\circ$.` }),
      P.fib({ label: "(c)", marks: 4, stem: t`Hence solve $2\tan 2\phi\sin 2\phi = 3$ for $0^\circ \le \phi \le 180^\circ$, in ascending order.`, template: "φ = {{blank:a}}° or φ = {{blank:b}}°",
        blanks: [N("a", 30, "60", 2), N("b", 150, "300", 2)],
        explanation: t`With $\theta = 2\phi$ and $0^\circ \le 2\phi \le 360^\circ$: $2\phi = 60^\circ$ or $300^\circ$, so $\phi = 30^\circ$ or $150^\circ$.` }),
      P.manual({ label: "(d)", marks: 2, stem: t`Explain why the factor $\cos\theta + 2$ gives no solutions, and why no solution was lost when the equation was multiplied by $\cos\theta$.`,
        points: [t`$\cos\theta = -2$ is impossible because $-1 \le \cos\theta \le 1$.`, t`Multiplying by $\cos\theta$ only adds possible roots with $\cos\theta = 0$, and $\cos\theta = 0$ is not a root of the quadratic (it gives $-2 \neq 0$); $\tan\theta$ is undefined there anyway.`],
        modelAnswer: "The cosine of any angle lies between −1 and 1, so cos θ = −2 has no solution. Values with cos θ = 0 make tan θ undefined, so they were never in the domain, and they do not satisfy 2cos²θ + 3cos θ − 2 = 0." }),
    ],
    explanation: "Use tan = sin/cos and sin² = 1 − cos² to get a quadratic in cos θ; 'hence' with 2φ means doubling the interval.",
    hints: [t`Multiply both sides by $\cos\theta$.`, t`For (c), $0^\circ \le 2\phi \le 360^\circ$.`],
  });

  // Struct (13): cos/(1 − sin) − cos/(1 + sin) ≡ 2 tan
  ident((x) => cos(x) / (1 - sin(x)) - cos(x) / (1 + sin(x)), (x) => 2 * tan(x), "2tan");
  const e19 = solveTrig({ fn: "tan", k: 2.5, lo: 0, hi: 360 });
  for (const x of [0, 60, 180, 300, 360]) chk(cos(rad(x)) / (1 - sin(rad(x))) - cos(rad(x)) / (1 + sin(rad(x))), 4 * sin(rad(x)), 1e-9);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Let $f(\theta) = \dfrac{\cos\theta}{1 - \sin\theta} - \dfrac{\cos\theta}{1 + \sin\theta}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`Prove that $f(\theta) \equiv 2\tan\theta$.`,
        points: [
          t`M1 combines over the common denominator $(1 - \sin\theta)(1 + \sin\theta)$.`,
          t`A1 numerator simplifies to $2\sin\theta\cos\theta$.`,
          t`M1 denominator $1 - \sin^2\theta = \cos^2\theta$.`,
          t`A1 cancels $\cos\theta$ to reach $2\tan\theta$.`,
        ],
        modelAnswer: t`$$
f(\theta) = \frac{\cos\theta(1 + \sin\theta) - \cos\theta(1 - \sin\theta)}{(1 - \sin\theta)(1 + \sin\theta)}
$$

$$
= \frac{2\sin\theta\cos\theta}{1 - \sin^2\theta} = \frac{2\sin\theta\cos\theta}{\cos^2\theta} = \frac{2\sin\theta}{\cos\theta} = 2\tan\theta
$$`,
        explanation: "Common denominator, difference of two squares, then the Pythagorean identity." }),
      P.manual({ label: "(b)", marks: 1, stem: t`Explain why $\theta = 90^\circ$ must be excluded.`,
        points: [t`At $90^\circ$, $1 - \sin\theta = 0$ (and $\cos\theta = 0$), so $f(\theta)$ and $\tan\theta$ are undefined.`],
        modelAnswer: "sin 90° = 1 makes the first denominator zero, so f(90°) is undefined (as is tan 90°)." }),
      P.fib({ label: "(c)", marks: 3, stem: t`Hence solve $f(\theta) = 5$ for $0^\circ \le \theta \le 360^\circ$, giving answers to 1 decimal place in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [A1("a", e19[0], "21.8", 1), A1("b", e19[1], "201.8", 2)],
        explanation: t`$2\tan\theta = 5 \Rightarrow \tan\theta = 2.5 \Rightarrow \theta = 68.2^\circ$ or $68.2^\circ + 180^\circ = 248.2^\circ$.` }),
      P.fib({ label: "(d)", marks: 5, stem: t`Hence solve $f(\theta) = 4\sin\theta$ for $0^\circ \le \theta \le 360^\circ$, in ascending order.`, template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°, {{blank:e}}°",
        blanks: [N("a", 0, "30"), N("b", 60, "120"), N("c", 180, "150"), N("d", 300, "240"), N("e", 360, "330")],
        explanation: t`$2\tan\theta = 4\sin\theta \Rightarrow \sin\theta\left(\frac{1}{\cos\theta} - 2\right) = 0$. $\sin\theta = 0$: $0^\circ, 180^\circ, 360^\circ$. $\cos\theta = \frac{1}{2}$: $60^\circ, 300^\circ$. None of these is $90^\circ$ or $270^\circ$, so all five are valid.` }),
    ],
    explanation: "Prove the identity, then use it to replace f(θ) by 2 tan θ in each equation; factorise rather than divide.",
    hints: ["Combine the fractions in (a).", "In (d), do not divide by sin θ."],
  });

  b.card("FORMULA", "Quotient identity", t`$\tan\theta \equiv \frac{\sin\theta}{\cos\theta}$`);
  b.card("FORMULA", "Pythagorean identity", t`$\sin^2\theta + \cos^2\theta \equiv 1$`, "Rearranged: sin²θ ≡ 1 − cos²θ, cos²θ ≡ 1 − sin²θ.");
  b.card("CONCEPT", "Second solution in one cycle", t`$\sin$: $180^\circ - \alpha$; $\cos$: $360^\circ - \alpha$; $\tan$: $\alpha + 180^\circ$.`);
  b.card("CONCEPT", "Multiple angles", t`For $\sin kx$ on $a \le x \le b$, solve for $kx$ on $ka \le kx \le kb$, then divide by $k$.`);
  b.card("CONCEPT", "Never divide by sin θ or cos θ", "Factorise instead; dividing loses the solutions where the divisor is zero.");
  b.card("CONCEPT", "Quadratic in sin or cos", t`Use $\sin^2 = 1 - \cos^2$ (or the reverse) so only one function appears, then factorise.`);
  b.card("FACT", "Impossible values", t`$\sin\theta$ and $\cos\theta$ lie in $[-1, 1]$; reject $\cos\theta = -2$, $\sin\theta = 1.5$.`);
  b.card("CONCEPT", "Proving an identity", "Start from one side and transform it into the other; never operate on both sides at once.");
  b.card("CONCEPT", "a sin x = b cos x", t`Divide by $a\cos x$: $\tan x = \frac{b}{a}$.`);
});
