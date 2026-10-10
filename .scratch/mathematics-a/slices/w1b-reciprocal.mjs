// W1b: amaths.trig.reciprocal-functions
import { concept, P, t, chk, same, solveTrig, rnd, quad, rad, sec, cosec, cot } from "../lib.mjs";

const { sin, cos, tan, PI, sqrt } = Math;
const XS = [0.3, 0.9, 1.2, 2.0, 2.7, 4.0, 5.5];
const ident = (f, g, label) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const A1 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong, ...(marks ? { marks } : {}) });

concept("amaths.trig.reciprocal-functions", { file: "trig/reciprocal-functions", keyPrefix: "trig.reciprocal-functions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which of these is the definition of $\sec\theta$?`,
    options: [
      [t`$\dfrac{1}{\cos\theta}$`, "Correct: secant is the reciprocal of cosine (third letter c)."],
      [t`$\dfrac{1}{\sin\theta}$`, t`This is $\operatorname{cosec}\theta$.`],
      [t`$\dfrac{1}{\tan\theta}$`, t`This is $\cot\theta$.`],
      [t`$\cos^{-1}\theta$`, t`$\cos^{-1}$ is the inverse function (an angle), not the reciprocal.`],
    ],
    answer: "A",
    explanation: t`$\sec\theta = \frac{1}{\cos\theta}$, $\operatorname{cosec}\theta = \frac{1}{\sin\theta}$, $\cot\theta = \frac{1}{\tan\theta}$.`,
  });

  chk(cosec(PI / 6), 2);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`What is the exact value of $\operatorname{cosec}\frac{\pi}{6}$?`,
    options: [
      ["2", t`Correct: $\sin\frac{\pi}{6} = \frac{1}{2}$, so its reciprocal is 2.`],
      [t`$\frac{2}{\sqrt{3}}$`, t`This is $\sec\frac{\pi}{6} = \frac{1}{\cos\frac{\pi}{6}}$.`],
      [t`$\frac{1}{2}$`, t`This is $\sin\frac{\pi}{6}$ itself, not its reciprocal.`],
      [t`$\sqrt{3}$`, t`This is $\cot\frac{\pi}{6}$.`],
    ],
    answer: "A",
    explanation: t`$\operatorname{cosec}\frac{\pi}{6} = \frac{1}{\sin\frac{\pi}{6}} = \frac{1}{\frac{1}{2}} = 2$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Find $\sec 50^\circ$, correct to 3 significant figures.`,
    value: sec(rad(50)), wrong: [1 / sin(rad(50)), cos(rad(50))],
    explanation: t`$\sec 50^\circ = \frac{1}{\cos 50^\circ} = \frac{1}{0.6428} = 1.56$. (1.31 is $\operatorname{cosec}50^\circ$.)`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these values can $\sec x$ **never** take?`,
    options: [
      ["0.5", t`Correct: $\sec x = 0.5$ would need $\cos x = 2$, which is impossible. The range of $\sec x$ is $y \le -1$ or $y \ge 1$.`],
      ["−1", t`$\sec 180^\circ = -1$.`],
      ["2", t`$\sec 60^\circ = 2$.`],
      ["−5", t`$\cos x = -0.2$ has solutions, so $\sec x = -5$ is possible.`],
    ],
    answer: "A",
    explanation: t`Since $-1 \le \cos x \le 1$, its reciprocal satisfies $|\sec x| \ge 1$.`,
  });

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`The graph of $y = \cot x$ has period $180^\circ$ and vertical asymptotes at $x = 0^\circ, 180^\circ, 360^\circ$.`,
    answer: true,
    explanation: t`$\cot x = \frac{\cos x}{\sin x}$ is undefined where $\sin x = 0$, i.e. at multiples of $180^\circ$, and it repeats every $180^\circ$ like $\tan x$.`,
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find $\cot 2.1$ (2.1 radians), correct to 3 significant figures.`,
    value: cot(2.1), wrong: [cot(rad(2.1)), tan(2.1)],
    explanation: t`Radian mode: $\tan 2.1 = -1.710$, so $\cot 2.1 = \frac{1}{-1.710} = -0.585$. (Degree mode gives 27.3.)`,
    hints: ["Use 1 ÷ tan in radian mode."],
  });

  same(solveTrig({ fn: "cosec", k: 2, lo: 0, hi: 360 }), [30, 150]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\operatorname{cosec}x = 2$ for $0^\circ \le x \le 360^\circ$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 30, "60"), N("b", 150, "120")],
    explanation: t`$\sin x = \frac{1}{2}$, so $x = 30^\circ$ or $180^\circ - 30^\circ = 150^\circ$.`,
    hints: [t`Turn it into an equation in $\sin x$.`],
  });

  const e8 = solveTrig({ fn: "cot", k: 4 / 3, lo: 0, hi: 360 });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3\cot x = 4$ for $0^\circ \le x \le 360^\circ$, giving answers to 1 decimal place in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [A1("a", e8[0], "53.1"), A1("b", e8[1], "233.1")],
    explanation: t`$\cot x = \frac{4}{3}$, so $\tan x = \frac{3}{4}$: $x = 36.9^\circ$ or $36.9^\circ + 180^\circ = 216.9^\circ$. ($53.1^\circ$ comes from $\tan x = \frac{4}{3}$.)`,
    hints: [t`$\cot x = \frac{4}{3}$ means $\tan x = \frac{3}{4}$.`],
  });

  ident((x) => cosec(x) - sin(x), (x) => cot(x) * cos(x), "cosec-sin");
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`Prove that $\operatorname{cosec}\theta - \sin\theta \equiv \cot\theta\cos\theta$.`,
    points: [
      t`M1 writes $\operatorname{cosec}\theta = \frac{1}{\sin\theta}$ and combines: $\frac{1 - \sin^2\theta}{\sin\theta}$.`,
      t`M1 uses $1 - \sin^2\theta = \cos^2\theta$.`,
      t`A1 splits $\frac{\cos^2\theta}{\sin\theta} = \frac{\cos\theta}{\sin\theta}\cos\theta = \cot\theta\cos\theta$.`,
    ],
    modelAnswer: t`$$
\operatorname{cosec}\theta - \sin\theta = \frac{1}{\sin\theta} - \sin\theta = \frac{1 - \sin^2\theta}{\sin\theta}
$$

$$
= \frac{\cos^2\theta}{\sin\theta} = \frac{\cos\theta}{\sin\theta} \cdot \cos\theta = \cot\theta\cos\theta
$$`,
    explanation: "Write in sin and cos, combine, then use the Pythagorean identity.",
    hints: ["Put both terms over the denominator sin θ."],
  });

  ident((x) => 1 / (cosec(x) - cot(x)) - 1 / (cosec(x) + cot(x)), (x) => 2 * cot(x), "2cot");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Prove that $\dfrac{1}{\operatorname{cosec}\theta - \cot\theta} - \dfrac{1}{\operatorname{cosec}\theta + \cot\theta} \equiv 2\cot\theta$.`,
    points: [
      t`M1 combines over the common denominator $(\operatorname{cosec}\theta - \cot\theta)(\operatorname{cosec}\theta + \cot\theta)$.`,
      t`A1 numerator $= 2\cot\theta$.`,
      t`M1 denominator $= \operatorname{cosec}^2\theta - \cot^2\theta$.`,
      t`A1 uses $\operatorname{cosec}^2\theta - \cot^2\theta = 1$ to obtain $2\cot\theta$.`,
    ],
    modelAnswer: t`$$
\text{LHS} = \frac{(\operatorname{cosec}\theta + \cot\theta) - (\operatorname{cosec}\theta - \cot\theta)}{(\operatorname{cosec}\theta - \cot\theta)(\operatorname{cosec}\theta + \cot\theta)} = \frac{2\cot\theta}{\operatorname{cosec}^2\theta - \cot^2\theta}
$$

Since $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$, the denominator is $1$:

$$
\text{LHS} = 2\cot\theta = \text{RHS}
$$`,
    explanation: "The denominator is a difference of two squares that the identity cosec² − cot² = 1 reduces to 1.",
    hints: ["Combine the fractions; the denominator is a difference of two squares."],
  });

  // cosec²θ = 3 cot θ − 1 → cot² − 3 cot + 2 = 0 → cot = 1, 2 → tan = 1, ½; 0 < θ < 180
  same(quad.roots(1, -3, 2), [1, 2]);
  const e11 = [...solveTrig({ fn: "tan", k: 0.5, lo: 0, hi: 180 }), ...solveTrig({ fn: "tan", k: 1, lo: 0, hi: 180 })].sort((a, c) => a - c);
  e11.forEach((x) => chk(cosec(rad(x)) ** 2, 3 * cot(rad(x)) - 1, 1e-9));
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Solve $\operatorname{cosec}^2\theta = 3\cot\theta - 1$ for $0^\circ < \theta < 180^\circ$. Give answers to 1 decimal place where necessary, in ascending order.`,
    template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
    blanks: [A1("a", e11[0], "63.4"), N("b", 45, "135")],
    explanation: t`$1 + \cot^2\theta = 3\cot\theta - 1 \Rightarrow \cot^2\theta - 3\cot\theta + 2 = 0 \Rightarrow (\cot\theta - 1)(\cot\theta - 2) = 0$. $\cot\theta = 2$: $\tan\theta = \frac{1}{2}$, $\theta = 26.6^\circ$. $\cot\theta = 1$: $\theta = 45^\circ$. (63.4° comes from $\tan\theta = 2$.)`,
    hints: [t`Use $\operatorname{cosec}^2\theta = 1 + \cot^2\theta$.`, t`$\cot\theta = 2$ means $\tan\theta = \frac{1}{2}$.`],
  });

  // 3 sec²θ − 5 tan θ − 5 = 0 → 3t² − 5t − 2 = 0 → t = 2, −1/3
  same(quad.roots(3, -5, -2).map((v) => Number(v.toFixed(12))), [-1 / 3, 2].map((v) => Number(v.toFixed(12))));
  const e12 = [...solveTrig({ fn: "tan", k: 2, lo: 0, hi: 360 }), ...solveTrig({ fn: "tan", k: -1 / 3, lo: 0, hi: 360 })].sort((a, c) => a - c);
  e12.forEach((x) => chk(3 * sec(rad(x)) ** 2 - 5 * tan(rad(x)) - 5, 0, 1e-9));
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3\sec^2\theta - 5\tan\theta - 5 = 0$ for $0^\circ \le \theta \le 360^\circ$, giving all solutions to 1 decimal place in ascending order.`,
    template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
    blanks: [A1("a", e12[0], "18.4"), A1("b", e12[1], "116.6"), A1("c", e12[2], "198.4"), A1("d", e12[3], "296.6")],
    explanation: t`$3(1 + \tan^2\theta) - 5\tan\theta - 5 = 0 \Rightarrow 3\tan^2\theta - 5\tan\theta - 2 = 0 \Rightarrow (3\tan\theta + 1)(\tan\theta - 2) = 0$. $\tan\theta = 2$: $63.4^\circ, 243.4^\circ$. $\tan\theta = -\frac{1}{3}$: $180^\circ - 18.4^\circ = 161.6^\circ$ and $341.6^\circ$.`,
    hints: [t`Replace $\sec^2\theta$ by $1 + \tan^2\theta$.`, "Tangent is negative in the second and fourth quadrants."],
  });

  chk(sec(Math.acos(0.25)) ** 2 - 1, 15);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\cos\theta = 0.25$, find the exact value of $\tan^2\theta$.`,
    value: 15, wrong: [16, 17],
    explanation: t`$\sec\theta = 4$, so $\tan^2\theta = \sec^2\theta - 1 = 16 - 1 = 15$. (16 is $\sec^2\theta$.)`,
    hints: [t`Use $\tan^2\theta = \sec^2\theta - 1$.`],
  });

  const th14 = PI + Math.atan(0.75);
  chk(tan(th14), 0.75); chk(cosec(th14), -5 / 3);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\tan\theta = \frac{3}{4}$ and $180^\circ < \theta < 270^\circ$, what is the exact value of $\operatorname{cosec}\theta$?`,
    options: [
      [t`$-\frac{5}{3}$`, t`Correct: in the third quadrant $\sin\theta = -\frac{3}{5}$, so $\operatorname{cosec}\theta = -\frac{5}{3}$.`],
      [t`$\frac{5}{3}$`, "The size is right, but sine (and cosecant) is negative in the third quadrant."],
      [t`$-\frac{5}{4}$`, t`This is $\sec\theta = \frac{1}{\cos\theta}$ with $\cos\theta = -\frac{4}{5}$.`],
      [t`$-\frac{3}{5}$`, t`This is $\sin\theta$, not its reciprocal.`],
    ],
    answer: "A",
    explanation: t`A 3-4-5 triangle gives $\sin\theta = \pm\frac{3}{5}$; in the third quadrant only tangent is positive, so $\sin\theta = -\frac{3}{5}$ and $\operatorname{cosec}\theta = -\frac{5}{3}$. (Or $\operatorname{cosec}^2\theta = 1 + \cot^2\theta = 1 + \frac{16}{9} = \frac{25}{9}$.)`,
    hints: ["Which ratios are negative in the third quadrant?"],
  });

  chk(sec(PI / 3), 2); chk(cosec(PI / 3), 2 / sqrt(3)); chk(cot(PI / 3), 1 / sqrt(3));
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Match each expression with its exact value.`,
    pairs: [
      [t`$\sec 60^\circ$`, "2"],
      [t`$\operatorname{cosec}60^\circ$`, t`$\frac{2}{\sqrt{3}}$`],
      [t`$\cot 60^\circ$`, t`$\frac{1}{\sqrt{3}}$`],
      [t`$\cos 60^\circ$`, t`$\frac{1}{2}$`],
    ],
    explanation: t`$\cos 60^\circ = \frac{1}{2}$, $\sin 60^\circ = \frac{\sqrt{3}}{2}$, $\tan 60^\circ = \sqrt{3}$; take reciprocals for sec, cosec and cot.`,
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`What is the range of $y = 2\operatorname{cosec}x + 1$?`,
    options: [
      [t`$y \le -1$ or $y \ge 3$`, t`Correct: $\operatorname{cosec}x \le -1$ or $\ge 1$, so $2\operatorname{cosec}x \le -2$ or $\ge 2$; adding 1 gives $y \le -1$ or $y \ge 3$.`],
      [t`$-1 \le y \le 3$`, t`This is the range of $2\sin x + 1$; cosecant takes the values outside $(-1, 1)$, not inside.`],
      [t`$y \le -3$ or $y \ge 3$`, "The +1 shifts both parts of the range up by 1."],
      [t`$y \le 1$ or $y \ge 3$`, t`The lower part comes from $2(-1) + 1 = -1$, not $1$.`],
    ],
    answer: "A",
    explanation: t`$|\operatorname{cosec}x| \ge 1$, stretch by 2 and translate up 1: the gap in the range is $-1 < y < 3$.`,
    hints: ["Start from the range of cosec x, then apply the stretch and translation."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Describe the graph of $y = \sec x$ for $0^\circ \le x \le 360^\circ$: asymptotes, turning points and range.`,
    points: [
      t`Vertical asymptotes at $x = 90^\circ$ and $x = 270^\circ$ (where $\cos x = 0$).`,
      t`Minimum points $(0^\circ, 1)$ and $(360^\circ, 1)$; maximum point $(180^\circ, -1)$.`,
      t`Range $y \le -1$ or $y \ge 1$; U-shaped branches above $y = 1$ on $[0^\circ, 90^\circ)$ and $(270^\circ, 360^\circ]$, an inverted branch below $y = -1$ between the asymptotes.`,
    ],
    modelAnswer: "The graph starts at (0°, 1), rises towards the asymptote x = 90°, reappears from −∞ on the right of it, reaches a maximum (180°, −1), falls towards the asymptote x = 270°, then comes down from +∞ to (360°, 1). No part lies between y = −1 and y = 1.",
    explanation: "Where cos x = 0 the reciprocal is undefined (asymptote); where cos x = ±1 the reciprocal is also ±1.",
    hints: ["Start from y = cos x and take reciprocals of key values."],
  });

  const th18 = PI - Math.acos(1 / 3);
  chk(sec(th18), -3); chk(tan(th18), -2 * sqrt(2));
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\sec\theta = -3$ and $90^\circ < \theta < 180^\circ$, find $\tan\theta$, correct to 3 significant figures.`,
    value: -2 * sqrt(2), wrong: [2 * sqrt(2), -sqrt(10)],
    explanation: t`$\tan^2\theta = \sec^2\theta - 1 = 8$, so $\tan\theta = \pm 2\sqrt{2}$. In the second quadrant tangent is negative: $\tan\theta = -2\sqrt{2} = -2.83$. ($-\sqrt{10}$ uses $\sec^2 + 1$.)`,
    hints: [t`$\tan^2\theta = \sec^2\theta - 1$.`],
  });

  // Struct (12): sec²θ + cosec²θ ≡ sec²θ cosec²θ; = 16/3 → sin²θ = ¼ or ¾
  ident((x) => sec(x) ** 2 + cosec(x) ** 2, (x) => sec(x) ** 2 * cosec(x) ** 2, "sec2+cosec2");
  same(quad.roots(16, -16, 3), [0.25, 0.75]);
  for (const x of [30, 60, 120, 150]) chk(sec(rad(x)) ** 2 + cosec(rad(x)) ** 2, 16 / 3, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`This question is about the equation $\sec^2\theta + \operatorname{cosec}^2\theta = \frac{16}{3}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Prove that $\sec^2\theta + \operatorname{cosec}^2\theta \equiv \sec^2\theta\operatorname{cosec}^2\theta$.`,
        points: [t`M1 writes in terms of $\sin$ and $\cos$ and combines: $\frac{\sin^2\theta + \cos^2\theta}{\cos^2\theta\sin^2\theta}$.`, t`M1 uses $\sin^2\theta + \cos^2\theta = 1$.`, t`A1 $\frac{1}{\cos^2\theta\sin^2\theta} = \sec^2\theta\operatorname{cosec}^2\theta$.`],
        modelAnswer: t`$$
\sec^2\theta + \operatorname{cosec}^2\theta = \frac{1}{\cos^2\theta} + \frac{1}{\sin^2\theta} = \frac{\sin^2\theta + \cos^2\theta}{\cos^2\theta\sin^2\theta}
$$

$$
= \frac{1}{\cos^2\theta\sin^2\theta} = \sec^2\theta\operatorname{cosec}^2\theta
$$`,
        explanation: "Common denominator, then sin² + cos² = 1." }),
      P.proof({ label: "(b)", marks: 3, stem: t`Hence show that the equation leads to $16\sin^4\theta - 16\sin^2\theta + 3 = 0$.`,
        points: [t`M1 uses (a): $\frac{1}{\sin^2\theta\cos^2\theta} = \frac{16}{3}$, so $\sin^2\theta\cos^2\theta = \frac{3}{16}$.`, t`M1 replaces $\cos^2\theta$ by $1 - \sin^2\theta$.`, t`A1 expands and rearranges to the given quartic.`],
        modelAnswer: t`$$
\sin^2\theta\cos^2\theta = \frac{3}{16} \Rightarrow \sin^2\theta(1 - \sin^2\theta) = \frac{3}{16}
$$

$$
16\sin^2\theta - 16\sin^4\theta = 3 \Rightarrow 16\sin^4\theta - 16\sin^2\theta + 3 = 0
$$`,
        explanation: "It is a quadratic in sin²θ." }),
      P.fib({ label: "(c)", marks: 4, stem: t`Solve the equation for $0^\circ < \theta < 180^\circ$, giving the solutions in ascending order.`, template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
        blanks: [N("a", 30, "45"), N("b", 60, "90"), N("c", 120, "135"), N("d", 150, "210")],
        explanation: t`$(4\sin^2\theta - 1)(4\sin^2\theta - 3) = 0$, so $\sin^2\theta = \frac{1}{4}$ or $\frac{3}{4}$. In $0^\circ < \theta < 180^\circ$, $\sin\theta > 0$: $\sin\theta = \frac{1}{2}$ gives $30^\circ, 150^\circ$; $\sin\theta = \frac{\sqrt{3}}{2}$ gives $60^\circ, 120^\circ$.` }),
      P.manual({ label: "(d)", marks: 2, stem: t`Explain why $\theta = 90^\circ$ cannot be a solution, and why only positive values of $\sin\theta$ are used in (c).`,
        points: [t`$\sec 90^\circ$ is undefined because $\cos 90^\circ = 0$.`, t`For $0^\circ < \theta < 180^\circ$, $\sin\theta > 0$, so the negative square roots give no solutions in the interval.`],
        modelAnswer: "At 90°, cos θ = 0 so sec θ is undefined; the equation has no meaning there. Between 0° and 180° sine is positive, so sin θ = −½ and sin θ = −√3/2 give angles outside the interval." }),
    ],
    explanation: "The identity turns the equation into one about sin²θ cos²θ, which becomes a quadratic in sin²θ.",
    hints: ["Combine the reciprocals over a common denominator.", t`Treat $16\sin^4\theta - 16\sin^2\theta + 3 = 0$ as a quadratic in $\sin^2\theta$.`],
  });

  // Struct (13): tan + cot ≡ sec cosec; = 4 → 15°, 75°; no solutions for |k| < 2; k = 2 → 45°
  ident((x) => tan(x) + cot(x), (x) => sec(x) * cosec(x), "tan+cot");
  for (const x of [15, 75]) chk(tan(rad(x)) + cot(rad(x)), 4, 1e-9);
  chk(tan(rad(45)) + cot(rad(45)), 2, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`This question is about the expression $\tan\theta + \cot\theta$, for $0^\circ < \theta < 90^\circ$ unless stated otherwise.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Prove that $\tan\theta + \cot\theta \equiv \sec\theta\operatorname{cosec}\theta$.`,
        points: [t`M1 writes $\frac{\sin\theta}{\cos\theta} + \frac{\cos\theta}{\sin\theta}$ over the common denominator $\sin\theta\cos\theta$.`, t`M1 numerator $\sin^2\theta + \cos^2\theta = 1$.`, t`A1 $\frac{1}{\sin\theta\cos\theta} = \sec\theta\operatorname{cosec}\theta$.`],
        modelAnswer: t`$$
\tan\theta + \cot\theta = \frac{\sin\theta}{\cos\theta} + \frac{\cos\theta}{\sin\theta} = \frac{\sin^2\theta + \cos^2\theta}{\sin\theta\cos\theta} = \frac{1}{\sin\theta\cos\theta} = \sec\theta\operatorname{cosec}\theta
$$`,
        explanation: "Common denominator and the Pythagorean identity." }),
      P.fib({ label: "(b)", marks: 3, stem: t`Solve $\tan\theta + \cot\theta = 4$ for $0^\circ < \theta < 90^\circ$, in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [N("a", 15, "30", 1), N("b", 75, "60", 2)],
        explanation: t`$\tan^2\theta - 4\tan\theta + 1 = 0$, so $\tan\theta = 2 \pm \sqrt{3}$: $\theta = 15^\circ$ or $75^\circ$.` }),
      P.proof({ label: "(c)", marks: 4, stem: t`Show that the equation $\tan\theta + \cot\theta = k$ has no real solutions $\theta$ (any angle) when $-2 < k < 2$.`,
        points: [
          t`M1 multiplies by $\tan\theta$ (non-zero, defined): $\tan^2\theta - k\tan\theta + 1 = 0$.`,
          t`M1 a real value of $\tan\theta$ needs discriminant $k^2 - 4 \ge 0$.`,
          t`A1 for $-2 < k < 2$, $k^2 < 4$ so the discriminant is negative.`,
          t`A1 concludes: no real $\tan\theta$, hence no angle $\theta$.`,
        ],
        modelAnswer: t`Let $t = \tan\theta$ ($t \neq 0$). Then $t + \frac{1}{t} = k$, so

$$
t^2 - kt + 1 = 0
$$

This has real roots only if $k^2 - 4 \ge 0$. When $-2 < k < 2$, $k^2 < 4$, so $k^2 - 4 < 0$: there is no real $t$, and so no angle $\theta$ with $\tan\theta + \cot\theta = k$.`,
        explanation: "Every real tan θ is possible, so the equation fails only if the quadratic in tan θ has no real roots." }),
      P.num({ label: "(d)", marks: 1, stem: t`Find the value of $k > 0$ for which $\tan\theta + \cot\theta = k$ has exactly one solution with $0^\circ < \theta < 90^\circ$.`, prefix: "k =", value: 2, wrong: [4, 0],
        explanation: t`Exactly one solution needs a repeated root: $k^2 = 4$, $k = 2$ (positive).` }),
      P.num({ label: "(e)", marks: 2, stem: "Find that solution θ, in degrees.", value: 45, unit: "°", wrong: [90, 60],
        explanation: t`$t^2 - 2t + 1 = 0 \Rightarrow t = 1 \Rightarrow \theta = 45^\circ$.` }),
    ],
    explanation: "Multiplying by tan θ gives a quadratic in tan θ; the discriminant decides how many solutions exist.",
    hints: [t`Let $t = \tan\theta$ so that $\cot\theta = \frac{1}{t}$.`, "Use the discriminant of the quadratic in t."],
  });

  b.card("DEFINITION", "Secant, cosecant, cotangent", t`$\sec\theta = \frac{1}{\cos\theta}$, $\operatorname{cosec}\theta = \frac{1}{\sin\theta}$, $\cot\theta = \frac{1}{\tan\theta} = \frac{\cos\theta}{\sin\theta}$`);
  b.card("FORMULA", "sec² identity", t`$\sec^2\theta \equiv 1 + \tan^2\theta$`, "Divide sin² + cos² = 1 by cos².");
  b.card("FORMULA", "cosec² identity", t`$\operatorname{cosec}^2\theta \equiv 1 + \cot^2\theta$`, "Divide sin² + cos² = 1 by sin².");
  b.card("FACT", "Range of sec and cosec", t`$y \le -1$ or $y \ge 1$; they never take values strictly between $-1$ and $1$.`);
  b.card("FACT", "Asymptotes of sec x", t`At $x = 90^\circ + 180^\circ n$, where $\cos x = 0$.`);
  b.card("FACT", "Period of cot x", t`$180^\circ$ ($\pi$), with asymptotes where $\sin x = 0$.`);
  b.card("CONCEPT", "Equations with sec² and tan", t`Replace $\sec^2\theta$ by $1 + \tan^2\theta$ to get a quadratic in $\tan\theta$.`);
  b.card("CONCEPT", "Third-letter rule", "sec ↔ cos, cosec ↔ sin, cot ↔ tan (look at the third letter).");
  b.card("CONCEPT", "Solving sec x = k", t`Rewrite as $\cos x = \frac{1}{k}$ and solve as usual; no solution if $|k| < 1$.`);
});
