// W2b: amath.trig.equations-identities
import { concept, P, t, chk, same, rad, sec, cot, cosec, round, root, rnd, sf, dpFor, halfUnit } from "../lib.mjs";

const { sin, cos, tan } = Math;
/** All roots of f on [lo, hi] (grid scan + bisection; skips poles), rounded to 6 d.p. */
function scan(f, lo, hi, n = 360000) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = lo + ((hi - lo) * i) / n;
    const c = lo + ((hi - lo) * (i + 1)) / n;
    const fa = f(a);
    const fc = f(c);
    if (!Number.isFinite(fa) || !Number.isFinite(fc)) continue;
    if (Math.abs(fa) < 1e-10) out.push(a);
    else if (fa * fc < 0 && Math.abs(fa - fc) < 1) out.push(root(f, a, c));
  }
  if (Math.abs(f(hi)) < 1e-10) out.push(hi);
  const uniq = [];
  for (const x of out) if (!uniq.some((y) => Math.abs(y - x) < 1e-6)) uniq.push(x);
  return uniq.map((x) => round(x, 6));
}
const D = (f) => (x) => f(rad(x));
/** Number of solutions in 0° to 360° of f(x) = 0 (x in radians inside f). */
const solveCount = (f) => scan(D(f), 0.001, 359.999).length;
const A1 = (id, x, wrong) => ({ id, input: "number", accepted: [String(rnd(x, 1))], tolerance: 0.05, wrong });
const S3 = (id, x, wrong) => ({ id, input: "number", accepted: [String(sf(x, 3))], tolerance: halfUnit(dpFor(x, 3)), wrong });
const N = (id, x, wrong) => ({ id, input: "number", accepted: [x], wrong });

concept("amath.trig.equations-identities", { file: "trig/equations-identities", keyPrefix: "trig.equations-identities" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`To solve $3\cos^2 x + 4\sin x - 4 = 0$, which identity should you use first?`,
    options: [
      [t`$\cos^2 x = 1 - \sin^2 x$`, t`Correct: $\sin x$ appears unsquared, so keep it and replace $\cos^2 x$; the result is a quadratic in $\sin x$.`],
      [t`$\sin x = \sqrt{1 - \cos^2 x}$`, "This introduces a square root and loses the sign of sin x; replace the squared function instead."],
      [t`$\sec^2 x = 1 + \tan^2 x$`, "Neither sec nor tan appears in the equation."],
      [t`$\tan x = \frac{\sin x}{\cos x}$`, "This does not reduce the equation to one function."],
    ],
    answer: "A",
    explanation: t`$3(1 - \sin^2 x) + 4\sin x - 4 = 0$ gives $3\sin^2 x - 4\sin x + 1 = 0$, a quadratic in $\sin x$.`,
  });

  for (const x of [0.4, 1.3, 2.9, 4.4]) chk(2 * sin(x) ** 2 + 3 * cos(x), -(2 * cos(x) ** 2 - 3 * cos(x) - 2));
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Which quadratic in $\cos x$ is equivalent to $2\sin^2 x + 3\cos x = 0$?`,
    options: [
      [t`$2\cos^2 x - 3\cos x - 2 = 0$`, t`Correct: $2(1 - \cos^2 x) + 3\cos x = 0$, then multiply by $-1$.`],
      [t`$2\cos^2 x + 3\cos x - 2 = 0$`, t`When multiplying $-2\cos^2 x + 3\cos x + 2 = 0$ by $-1$, every term changes sign, including $3\cos x$.`],
      [t`$2\cos^2 x - 3\cos x = 0$`, t`$2\sin^2 x = 2 - 2\cos^2 x$: the constant 2 has been dropped.`],
      [t`$2\cos^2 x - 3\cos x + 2 = 0$`, t`The constant term should change sign along with the others.`],
    ],
    answer: "A",
    explanation: t`$2 - 2\cos^2 x + 3\cos x = 0$, so $2\cos^2 x - 3\cos x - 2 = 0$, which factorises as $(2\cos x + 1)(\cos x - 2) = 0$.`,
  });

  chk(solveCount((x) => sec(x) - 0.5), 0); chk(solveCount((x) => sec(x) + 2), 2); chk(cosec(Math.PI / 2), 1); chk(solveCount((x) => cot(x) - 0.5), 2);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these equations has no solutions?`,
    options: [
      [t`$\sec x = 0.5$`, t`Correct: it needs $\cos x = 2$, and $|\cos x| \leq 1$, so $|\sec x| \geq 1$ always.`],
      [t`$\sec x = -2$`, t`This means $\cos x = -\frac{1}{2}$, which has solutions such as $120°$.`],
      [t`$\operatorname{cosec} x = 1$`, t`This means $\sin x = 1$, solved by $x = 90°$.`],
      [t`$\cot x = 0.5$`, t`Cotangent takes every real value: $\tan x = 2$ has solutions.`],
    ],
    answer: "A",
    explanation: t`$\sec x = \frac{1}{\cos x}$ and $-1 \leq \cos x \leq 1$, so $\sec x \geq 1$ or $\sec x \leq -1$. A value such as 0.5 is impossible and must be rejected when it comes out of a quadratic.`,
  });

  same(scan(D((x) => 2 * cos(x) ** 2 + sin(x) - 1), 0, 360), [90, 210, 330]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2\cos^2 x + \sin x = 1$ for $0° \leq x \leq 360°$.`,
    options: [
      [t`$x = 90°, 210°, 330°$`, t`Correct: $2\sin^2 x - \sin x - 1 = 0$ gives $\sin x = 1$ or $-\frac{1}{2}$.`],
      [t`$x = 30°, 90°, 150°$`, t`These come from $\sin x = +\frac{1}{2}$: a sign slip when factorising $(2\sin x + 1)(\sin x - 1)$.`],
      [t`$x = 210°, 330°$`, t`$\sin x = 1$ is a valid value too: it gives $x = 90°$.`],
      [t`$x = 30°, 150°, 270°$`, t`These solve $\sin x = \frac{1}{2}$ or $\sin x = -1$: both signs are reversed.`],
    ],
    answer: "A",
    explanation: t`$2(1 - \sin^2 x) + \sin x - 1 = 0$ gives $2\sin^2 x - \sin x - 1 = 0$, so $(2\sin x + 1)(\sin x - 1) = 0$. $\sin x = 1$: $90°$. $\sin x = -\frac{1}{2}$: $210°, 330°$.`,
    hints: [t`Replace $\cos^2 x$ by $1 - \sin^2 x$ and factorise.`],
  });

  same(scan(D((x) => tan(x) ** 2 - 3), 0, 180), [60, 120]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\tan^2 x = 3$ for $0° \leq x \leq 180°$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 60, "30"), N("b", 120, "240")],
    explanation: t`$\tan x = \sqrt{3}$ gives $x = 60°$; $\tan x = -\sqrt{3}$ gives $x = 180° - 60° = 120°$. Both square roots are needed.`,
  });

  same(scan(D((x) => 2 * cos(x) ** 2 - 5 * cos(x) + 2), 0, 360), [60, 300]);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$2\cos^2 x - 5\cos x + 2 = 0$ factorises as $(2\cos x - 1)(\cos x - 2) = 0$. The value $\cos x = 2$ gives no solutions, so only $\cos x = \frac{1}{2}$ is used.`,
    answer: true,
    explanation: t`True. $-1 \leq \cos x \leq 1$, so $\cos x = 2$ is impossible and is rejected. $\cos x = \frac{1}{2}$ gives $x = 60°$ and $300°$ in $0°$ to $360°$.`,
  });

  chk(scan(D((x) => sin(x) ** 2 - 0.25), 0, 360).length, 4);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`How many solutions does $\sin^2 x = \frac{1}{4}$ have for $0° \leq x \leq 360°$?`,
    value: 4, wrong: [2, 1],
    explanation: t`$\sin x = \frac{1}{2}$ gives $30°$ and $150°$; $\sin x = -\frac{1}{2}$ gives $210°$ and $330°$: 4 solutions.`,
  });

  same(scan(D((x) => 3 * cos(x) ** 2 - 4 * cos(x) + 1), 0, 360).map((x) => round(x, 1)), [0, 70.5, 289.5, 360]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3\cos^2 x - 4\cos x + 1 = 0$ for $0° \leq x \leq 360°$. Give all four solutions in ascending order, to 1 decimal place where necessary.`,
    template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
    blanks: [N("a", 0, "90"), A1("b", 70.52877936550931, "109.5"), A1("c", 289.4712206344907, "250.5"), N("d", 360, "180")],
    explanation: t`$(3\cos x - 1)(\cos x - 1) = 0$. $\cos x = 1$: $x = 0°$ or $360°$ (both ends are included). $\cos x = \frac{1}{3}$: $x = 70.5°$ or $360° - 70.5° = 289.5°$.`,
    hints: [t`Treat it as $3c^2 - 4c + 1 = 0$ with $c = \cos x$.`, "The interval includes both 0° and 360°."],
  });
  chk(Math.acos(1 / 3) * 180 / Math.PI, 70.52877936550931);

  same(scan(D((x) => sec(x) ** 2 - 2 * tan(x)), 0, 360), [45, 225]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $\sec^2 x = 2\tan x$ for $0° \leq x \leq 360°$, in ascending order.`,
    template: "x = {{blank:a}}° or x = {{blank:b}}°",
    blanks: [N("a", 45, "135"), N("b", 225, "315")],
    explanation: t`$1 + \tan^2 x = 2\tan x$ gives $\tan^2 x - 2\tan x + 1 = 0$, that is $(\tan x - 1)^2 = 0$. So $\tan x = 1$: $x = 45°$ or $225°$.`,
    hints: [t`Replace $\sec^2 x$ by $1 + \tan^2 x$.`],
  });

  const r8 = scan(D((x) => 6 * cos(x) ** 2 + sin(x) - 5), 0, 360);
  same(r8.map((x) => round(x, 1)), [30, 150, 199.5, 340.5]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $6\cos^2 x + \sin x - 5 = 0$ for $0° \leq x \leq 360°$. Give the solutions in ascending order, to 1 decimal place where necessary.`,
    template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
    blanks: [N("a", 30, "19.5"), N("b", 150, "160.5"), A1("c", r8[2], "19.5"), A1("d", r8[3], "160.5")],
    explanation: t`$6(1 - \sin^2 x) + \sin x - 5 = 0$ gives $6\sin^2 x - \sin x - 1 = 0$, so $(2\sin x - 1)(3\sin x + 1) = 0$. $\sin x = \frac{1}{2}$: $30°, 150°$. $\sin x = -\frac{1}{3}$: related angle $19.47°$, third and fourth quadrants: $199.5°, 340.5°$.`,
    hints: [t`Replace $\cos^2 x$ by $1 - \sin^2 x$.`, t`$\sin x = -\frac{1}{3}$ has solutions in the third and fourth quadrants.`],
  });

  const r9 = scan(D((x) => 3 * sec(x) ** 2 - 5 * tan(x) - 5), 0, 360);
  same(r9.map((x) => round(x, 1)), [63.4, 161.6, 243.4, 341.6]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Solve $3\sec^2\theta - 5\tan\theta - 5 = 0$ for $0° \leq \theta \leq 360°$, giving the solutions to 1 decimal place in ascending order.`,
    template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
    blanks: [A1("a", r9[0], "18.4"), A1("b", r9[1], "116.6"), A1("c", r9[2], "198.4"), A1("d", r9[3], "296.6")],
    explanation: t`$3(1 + \tan^2\theta) - 5\tan\theta - 5 = 0$ gives $3\tan^2\theta - 5\tan\theta - 2 = 0$, so $(3\tan\theta + 1)(\tan\theta - 2) = 0$. $\tan\theta = 2$: $63.4°, 243.4°$. $\tan\theta = -\frac{1}{3}$: related angle $18.43°$, so $161.6°, 341.6°$.`,
    hints: [t`Replace $\sec^2\theta$ by $1 + \tan^2\theta$.`, t`For $\tan\theta = -\frac{1}{3}$ use the second and fourth quadrants.`],
  });

  same(scan((x) => 2 * sin(x) ** 2 + 3 * cos(x) - 3, 0, 2 * Math.PI).map((x) => round(x / (Math.PI / 3), 6)), [0, 1, 5, 6]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $2\sin^2 x + 3\cos x - 3 = 0$ for $0 \leq x \leq 2\pi$. Every solution can be written as $x = \frac{k\pi}{3}$; give the four values of $k$ in ascending order.`,
    template: "k = {{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}",
    blanks: [N("a", 0, "1"), N("b", 1, "2"), N("c", 5, "4"), N("d", 6, "5")],
    explanation: t`$2(1 - \cos^2 x) + 3\cos x - 3 = 0$ gives $2\cos^2 x - 3\cos x + 1 = 0$, so $(2\cos x - 1)(\cos x - 1) = 0$. $\cos x = 1$: $x = 0, 2\pi$. $\cos x = \frac{1}{2}$: $x = \frac{\pi}{3}, \frac{5\pi}{3}$. So $k = 0, 1, 5, 6$.`,
    hints: [t`Replace $\sin^2 x$ by $1 - \cos^2 x$.`, t`$\cos x = 1$ at both ends of the interval.`],
  });

  same(scan(D((x) => 3 * tan(x) - cot(x)), 1, 359), [30, 150, 210, 330]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $3\tan\theta = \cot\theta$ for $0° < \theta < 360°$, in ascending order.`,
    template: "θ = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
    blanks: [N("a", 30, "60"), N("b", 150, "120"), N("c", 210, "240"), N("d", 330, "300")],
    explanation: t`$3\tan\theta = \frac{1}{\tan\theta}$ gives $\tan^2\theta = \frac{1}{3}$, so $\tan\theta = \pm\frac{1}{\sqrt{3}}$. $+$: $30°, 210°$. $-$: $150°, 330°$.`,
    hints: [t`Write $\cot\theta = \frac{1}{\tan\theta}$ and multiply by $\tan\theta$.`, "Take both square roots."],
  });

  chk(scan(D((x) => 3 * cos(x) ** 2 + 2 * cos(x) - 8), 0, 360).length, 0);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How many solutions does $3\cos^2 x + 2\cos x - 8 = 0$ have for $0° \leq x \leq 360°$?`,
    options: [
      ["0", t`Correct: $(3\cos x - 4)(\cos x + 2) = 0$ gives $\cos x = \frac{4}{3}$ or $-2$, and both lie outside $[-1, 1]$.`],
      ["2", t`This assumes one valid value of $\cos x$; check both against $-1 \leq \cos x \leq 1$.`],
      ["4", "This assumes both values of cos x are possible."],
      ["1", t`No value of $\cos x$ here is $\pm 1$, so there is no single touching solution.`],
    ],
    answer: "A",
    explanation: t`The quadratic gives $\cos x = \frac{4}{3}$ or $\cos x = -2$. Since $-1 \leq \cos x \leq 1$, both are rejected and the equation has no solutions.`,
    hints: ["Factorise, then check each value of cos x."],
  });

  chk(scan(D((x) => 2 * sin(x) ** 2 - sin(x)), 0, 360).length, 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the number of solutions of $2\sin^2 x = \sin x$ for $0° \leq x \leq 360°$.`,
    value: 5, wrong: [2, 4],
    explanation: t`$\sin x\,(2\sin x - 1) = 0$. $\sin x = 0$: $0°, 180°, 360°$. $\sin x = \frac{1}{2}$: $30°, 150°$. Total 5. (Dividing by $\sin x$ would leave only 2.)`,
    hints: ["Factorise instead of dividing by sin x.", "The interval includes both 0° and 360°."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`Chipo solves $\cot^2\theta = 1$ for $0° < \theta < 360°$ and writes "$\cot\theta = 1$, so $\theta = 45°$ or $225°$". Explain what is wrong and state the missing solutions.`,
    points: [
      t`States that $\cot^2\theta = 1$ gives $\cot\theta = \pm 1$: she has ignored $\cot\theta = -1$.`,
      t`Gives the missing solutions $\theta = 135°$ and $\theta = 315°$.`,
    ],
    modelAnswer: t`Taking the square root gives $\cot\theta = 1$ or $\cot\theta = -1$. The negative root, $\tan\theta = -1$, gives $\theta = 135°$ and $315°$, so the full set is $45°, 135°, 225°, 315°$.`,
    explanation: "A square has two square roots; each gives its own set of angles.",
    hints: [t`What are the square roots of 1?`],
  });

  // Struct 1 (6): 3 cos θ = 8 tan θ -> 3 sin² + 8 sin - 3 = 0
  for (const x of [0.3, 1.1, 2.2, 4.0]) chk(3 * cos(x) ** 2 - 8 * sin(x), -(3 * sin(x) ** 2 + 8 * sin(x) - 3));
  const r15 = scan(D((x) => 3 * cos(x) - 8 * tan(x)), 0, 360);
  same(r15.map((x) => round(x, 1)), [19.5, 160.5]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`This question is about the equation $3\cos\theta = 8\tan\theta$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that the equation can be written as $3\sin^2\theta + 8\sin\theta - 3 = 0$.`,
        points: [t`M1 writes $\tan\theta = \frac{\sin\theta}{\cos\theta}$ and multiplies by $\cos\theta$: $3\cos^2\theta = 8\sin\theta$.`, t`M1 uses $\cos^2\theta = 1 - \sin^2\theta$.`, "A1 rearranges to the given equation with no errors."],
        modelAnswer: t`$$
3\cos\theta = \frac{8\sin\theta}{\cos\theta}
$$

$$
3\cos^2\theta = 8\sin\theta
$$

$$
3(1 - \sin^2\theta) = 8\sin\theta
$$

$$
3\sin^2\theta + 8\sin\theta - 3 = 0
$$`,
        explanation: "Clear the fraction first, then change cos² into sin²." }),
      P.fib({ label: "(b)", marks: 2, stem: t`Hence solve $3\cos\theta = 8\tan\theta$ for $0° \leq \theta \leq 360°$, giving your answers to 1 decimal place in ascending order.`, template: "θ = {{blank:a}}° or θ = {{blank:b}}°",
        blanks: [A1("a", r15[0], "-19.5"), A1("b", r15[1], "340.5")],
        explanation: t`$(3\sin\theta - 1)(\sin\theta + 3) = 0$. $\sin\theta = \frac{1}{3}$: $\theta = 19.5°$ or $180° - 19.5° = 160.5°$.` }),
      P.manual({ label: "(c)", marks: 1, stem: t`Explain why the other root of the quadratic gives no solutions.`,
        points: [t`States that $\sin\theta = -3$ is impossible because $-1 \leq \sin\theta \leq 1$.`],
        modelAnswer: t`The other factor gives $\sin\theta = -3$, but $\sin\theta$ always lies between $-1$ and $1$, so it is rejected.`,
        explanation: "Sine is bounded by −1 and 1." }),
    ],
    explanation: "Write tan as sin/cos, clear the fraction, use cos² = 1 − sin², factorise and reject the impossible root.",
    hints: [t`Multiply both sides by $\cos\theta$.`, t`Factorise $3s^2 + 8s - 3$.`],
  });

  // Struct 2 (9): 2 tan²x + sec x = 1 -> 2 sec² + sec - 3 = 0
  for (const x of [0.3, 1.1, 2.2, 4.0]) chk(2 * tan(x) ** 2 + sec(x) - 1, 2 * sec(x) ** 2 + sec(x) - 3);
  const r16 = scan((x) => 2 * tan(x) ** 2 + sec(x) - 1, 0, 2 * Math.PI);
  chk(r16.length, 4);
  chk(r16[1], Math.acos(-2 / 3), 1e-6); chk(r16[2], 2 * Math.PI - Math.acos(-2 / 3), 1e-6); chk(r16[3], 2 * Math.PI, 1e-6);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`This question is about the equation $2\tan^2 x + \sec x = 1$, for $0 \leq x \leq 2\pi$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that the equation can be written as $2\sec^2 x + \sec x - 3 = 0$.`,
        points: [t`M1 uses $\tan^2 x = \sec^2 x - 1$.`, t`M1 expands $2(\sec^2 x - 1) = 2\sec^2 x - 2$.`, "A1 collects terms to reach the given equation."],
        modelAnswer: t`$$
2(\sec^2 x - 1) + \sec x = 1
$$

$$
2\sec^2 x - 2 + \sec x - 1 = 0
$$

$$
2\sec^2 x + \sec x - 3 = 0
$$`,
        explanation: "sec x appears unsquared, so replace tan² x." }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the two values of $\sec x$ that satisfy this equation, in ascending order.`, template: "sec x = {{blank:a}} or sec x = {{blank:b}}",
        blanks: [N("a", -1.5, "-1"), N("b", 1, "1.5")],
        explanation: t`$(2\sec x + 3)(\sec x - 1) = 0$, so $\sec x = -\frac{3}{2}$ or $\sec x = 1$.` }),
      P.fib({ label: "(c)", marks: 4, stem: t`Hence solve the equation for $0 \leq x \leq 2\pi$. Give all four solutions in radians, in ascending order, correct to 3 significant figures where necessary.`, template: "x = {{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}",
        blanks: [N("a", 0, "1"), S3("b", r16[1], "0.841"), S3("c", r16[2], "5.44"), S3("d", r16[3], "3.14")],
        explanation: t`$\sec x = 1$: $\cos x = 1$, so $x = 0$ or $2\pi \approx 6.28$. $\sec x = -\frac{3}{2}$: $\cos x = -\frac{2}{3}$, so $x = \cos^{-1}\left(-\frac{2}{3}\right) = 2.30$ or $x = 2\pi - 2.30 = 3.98$.` }),
    ],
    explanation: "Replace tan² by sec² − 1, solve the quadratic in sec x, then turn each value of sec into a value of cos.",
    hints: [t`$\tan^2 x = \sec^2 x - 1$.`, t`$\sec x = -\frac{3}{2}$ means $\cos x = -\frac{2}{3}$.`, t`$2\pi \approx 6.28$ is in the interval.`],
  });

  // Cards
  b.card("CONCEPT", "Which identity to use", "Keep the function that appears unsquared; replace the squared one with an identity.");
  b.card("CONCEPT", t`Equation with $\sin^2 x$ and $\cos x$`, t`Use $\sin^2 x = 1 - \cos^2 x$ to get a quadratic in $\cos x$.`);
  b.card("CONCEPT", t`Equation with $\sec^2 x$ and $\tan x$`, t`Use $\sec^2 x = 1 + \tan^2 x$ to get a quadratic in $\tan x$.`);
  b.card("CONCEPT", t`Equation with $\cot^2 x$ and $\operatorname{cosec} x$`, t`Use $\cot^2 x = \operatorname{cosec}^2 x - 1$.`);
  b.card("CONCEPT", t`Equation with $\cot x$ and $\tan x$`, t`Write $\cot x = \frac{1}{\tan x}$ and multiply through by $\tan x$.`);
  b.card("FACT", "Values to reject", t`$|\sin x| > 1$ or $|\cos x| > 1$; $|\sec x| < 1$ or $|\operatorname{cosec} x| < 1$.`);
  b.card("FACT", t`$\tan^2 x = k$ (with $k > 0$)`, t`$\tan x = \pm\sqrt{k}$: four solutions in $0°$ to $360°$.`);
  b.card("CONCEPT", "Common factor in a trigonometric equation", "Factorise and solve each factor; dividing by it loses the solutions where it is zero.");
});
