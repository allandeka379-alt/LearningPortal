// W2b: amaths.numerical.newton-raphson (ZIMSEC only)
import { concept, P, t, chk, newtonRaphson, root, checkDeriv } from "../lib.mjs";

const { cos, sin, tan, cbrt, sqrt, exp, log } = Math;
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const last = (xs) => xs[xs.length - 1];
const XS = [0.4, 0.9, 1.7, 2.6, 3.3];
const sameFn = (f, g, l) => XS.forEach((x) => chk(f(x), g(x), 1e-9, `${l} at ${x}`));

concept("amaths.numerical.newton-raphson", { file: "numerical/newton-raphson", keyPrefix: "numerical.newton-raphson" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which formula is the Newton–Raphson iteration for solving $f(x) = 0$?`,
    options: [
      [t`$x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$`, "Correct: subtract the function value divided by the gradient."],
      [t`$x_{n+1} = x_n + \dfrac{f(x_n)}{f'(x_n)}$`, "Adding the correction moves away from the root along the tangent."],
      [t`$x_{n+1} = x_n - \dfrac{f'(x_n)}{f(x_n)}$`, "The fraction is upside down: the correction is f ÷ f′."],
      [t`$x_{n+1} = \dfrac{f(x_n)}{f'(x_n)}$`, t`This is only the correction; it must be subtracted from $x_n$.`],
    ],
    answer: "A",
    explanation: t`The tangent at $(x_n, f(x_n))$ meets the $x$-axis at $x_n - \frac{f(x_n)}{f'(x_n)}$.`,
  });

  const x2 = newtonRaphson((x) => x * x - 7, (x) => 2 * x, 3, { maxN: 1 })[1];
  chk(x2, 8 / 3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The Newton–Raphson method is applied to $f(x) = x^2 - 7$ with $x_1 = 3$. Find $x_2$, correct to 3 significant figures.`,
    value: x2, wrong: [3 + 2 / 6, 3 - 6 / 2],
    explanation: t`$f(3) = 2$, $f'(3) = 6$, so $x_2 = 3 - \frac{2}{6} = 2.67$. (3.33 adds the correction; 0 uses $\frac{f'}{f}$.)`,
  });

  const x3 = newtonRaphson((x) => x ** 3 - 4 * x + 1, (x) => 3 * x * x - 4, 0, { maxN: 1 })[1];
  chk(x3, 0.25);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Apply one step of the Newton–Raphson method to $x^3 - 4x + 1 = 0$, starting from $x_1 = 0$. Find $x_2$.`,
    value: x3, wrong: [-0.25, 4],
    explanation: t`$f(0) = 1$ and $f'(x) = 3x^2 - 4$, so $f'(0) = -4$. Then $x_2 = 0 - \frac{1}{-4} = 0.25$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The Newton–Raphson method cannot be used from a starting value $x_1$ at which $f'(x_1) = 0$.`,
    answer: true,
    explanation: t`The formula divides by $f'(x_1)$. Geometrically the tangent is horizontal and never meets the $x$-axis (unless $f(x_1) = 0$ already).`,
  });

  const r5 = root((x) => x ** 3 + x - 1, 0, 1);
  chk(last(newtonRaphson((x) => x ** 3 + x - 1, (x) => 3 * x * x + 1, 1)), r5, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the Newton–Raphson method with $x_1 = 1$ to find the root of $x^3 + x - 1 = 0$, correct to 4 decimal places.`,
    value: r5, dp: 4, wrong: [0.6860, 0.75],
    explanation: t`$x_{n+1} = x_n - \dfrac{x_n^3 + x_n - 1}{3x_n^2 + 1}$: $x_2 = 0.75$, $x_3 = 0.686047$, $x_4 = 0.682340$, $x_5 = 0.682328$. Root $0.6823$ (4 d.p.).`,
    hints: [t`$f'(x) = 3x^2 + 1$.`],
  });

  const r6 = last(newtonRaphson((x) => x ** 3 - 20, (x) => 3 * x * x, 3));
  chk(r6, cbrt(20), 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the Newton–Raphson method on $f(x) = x^3 - 20$ with $x_1 = 3$ to find $\sqrt[3]{20}$, correct to 4 decimal places.`,
    value: r6, dp: 4, wrong: [2.7407, 2.7147],
    explanation: t`$x_{n+1} = x_n - \dfrac{x_n^3 - 20}{3x_n^2} = \dfrac{2x_n^3 + 20}{3x_n^2}$: $x_2 = 2.740741$, $x_3 = 2.714670$, $x_4 = 2.714418$, $x_5 = 2.714418$. So $\sqrt[3]{20} = 2.7144$.`,
    hints: ["The cube root of 20 is a root of x³ − 20 = 0."],
  });

  sameFn((x) => x - (x * x - 5) / (2 * x), (x) => (x * x + 5) / (2 * x), "q7");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Show that the Newton–Raphson iteration for $f(x) = x^2 - 5$ can be written as $x_{n+1} = g(x_n)$ where $g$ is a single fraction. Type $g(x)$, using x for $x_n$ (e.g. (x^2+1)/(3x)).`,
    accepted: ["(x^2+5)/(2x)", "(x²+5)/(2x)", "(5+x^2)/(2x)", "(x^2+5)/2x", "x/2+5/(2x)", "0.5(x+5/x)", "(x+5/x)/2", "1/2(x+5/x)", "(1/2)(x+5/x)", "0.5x+2.5/x", "x/2+2.5/x"],
    wrong: ["(x^2-5)/(2x)"],
    explanation: t`$g(x) = x - \dfrac{x^2 - 5}{2x} = \dfrac{2x^2 - x^2 + 5}{2x} = \dfrac{x^2 + 5}{2x}$, i.e. the average of $x$ and $\frac{5}{x}$.`,
    hints: ["Put everything over the common denominator 2x."],
  });

  const r8 = last(newtonRaphson((x) => x - cos(x), (x) => 1 + sin(x), 1));
  chk(r8, root((x) => x - cos(x), 0, 1), 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Use the Newton–Raphson method with $x_1 = 1$ to solve $x = \cos x$ (radians), giving the root correct to 4 decimal places.`,
    value: r8, dp: 4, wrong: [0.7504, 0.9998],
    explanation: t`$f(x) = x - \cos x$, $f'(x) = 1 + \sin x$. $x_2 = 0.750364$, $x_3 = 0.739113$, $x_4 = 0.739085$, $x_5 = 0.739085$. Root $0.7391$. (Degree mode gives nonsense such as $0.9998$.)`,
    hints: ["Use radians.", t`$\frac{\mathrm{d}}{\mathrm{d}x}(-\cos x) = \sin x$.`],
  });

  const f = (x) => x ** 3 - 3 * x + 1, fp = (x) => 3 * x * x - 3;
  chk(fp(1), 0);
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Why can the Newton–Raphson method for $x^3 - 3x + 1 = 0$ not be started at $x_1 = 1$?`,
    options: [
      [t`$f'(1) = 0$, so the tangent there is horizontal and the formula divides by zero`, t`Correct: $f'(x) = 3x^2 - 3$ vanishes at $x = 1$, a turning point of the curve.`],
      [t`$f(1) = 0$, so 1 is already a root`, t`$f(1) = 1 - 3 + 1 = -1$, not 0.`],
      [t`$f(1)$ is negative, and the method needs a positive value of $f$`, "The sign of f(x₁) does not matter."],
      [t`The method only works for starting values that are not whole numbers`, "Whole-number starting values are often used; the issue is the gradient at x = 1."],
    ],
    answer: "A",
    explanation: t`$x_2 = x_1 - \frac{f(x_1)}{f'(x_1)}$ needs $f'(x_1) \ne 0$. At a turning point the tangent never meets the $x$-axis.`,
    hints: ["Differentiate f and evaluate at 1."],
  });
  chk(f(1), -1);

  const it10 = newtonRaphson(f, fp, 1.1);
  const big = root(f, 1, 2);
  chk(last(it10), big, 1e-12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The Newton–Raphson method is applied to $f(x) = x^3 - 3x + 1$ with $x_1 = 1.1$. Find $x_2$, correct to 3 significant figures, and comment on its size.`,
    value: it10[1], wrong: [1.1 - f(1.1) / fp(1.1) * -1, 1.53],
    explanation: t`$f(1.1) = -0.969$ and $f'(1.1) = 0.63$, so $x_2 = 1.1 + \frac{0.969}{0.63} = 2.64$. Because $x_1$ is close to the turning point at $x = 1$, the tangent is shallow and overshoots the root $1.532$ badly (the iteration does recover: $2.00$, $1.67$, $1.55$, $1.532$).`,
    hints: [t`Evaluate $f(1.1)$ and $f'(1.1)$ carefully.`],
  });
  chk(it10[1], 1.1 + 0.969 / 0.63, 1e-9);

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The equation $x^3 - 3x + 1 = 0$ has roots $-1.879$, $0.347$ and $1.532$ (3 d.p.). Starting the Newton–Raphson method at $x_1 = 0.95$, to which root do the iterates converge?`,
    options: [
      ["−1.879", t`Correct: $f'(0.95) = -0.29$ is small and negative, so $x_2 = 0.95 - \frac{f(0.95)}{f'(0.95)}$ jumps far to the left.`],
      ["0.347", t`The shallow tangent near the turning point at $x = 1$ throws the iterate right past $0.347$.`],
      ["1.532", t`From $0.95$ the tangent slopes downwards and $f(0.95) < 0$, so the step goes left, not right.`],
      ["It diverges and never settles near a root", t`The iterates jump to $-2.44$ and then converge steadily.`],
    ],
    answer: "A",
    explanation: t`$f(0.95) = -0.993$, $f'(0.95) = -0.293$, so $x_2 = 0.95 - \frac{-0.993}{-0.293} = -2.44$, then $-2.02$, $-1.89$, $-1.880$: the iterates converge to $-1.879$, not to the nearest root.`,
    hints: ["Work out x₂ before guessing."],
  });
  {
    const it = newtonRaphson(f, fp, 0.95);
    chk(last(it), root(f, -2, -1), 1e-12);
    chk(it[1], 0.95 - f(0.95) / fp(0.95), 1e-12);
    chk(Math.round(it[1] * 100) / 100, -2.44); chk(Math.round(it[2] * 100) / 100, -2.02); chk(Math.round(f(0.95) * 1000) / 1000, -0.993);
  }

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 5,
    stem: t`By considering the tangent to the curve $y = f(x)$ at the point where $x = x_n$, derive the Newton–Raphson formula $x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$.`,
    points: [
      t`B1 states the tangent at $(x_n, f(x_n))$ has gradient $f'(x_n)$.`,
      t`M1 writes the tangent equation $y - f(x_n) = f'(x_n)(x - x_n)$.`,
      t`M1 sets $y = 0$ for the $x$-intercept.`,
      t`A1 rearranges to $x = x_n - \frac{f(x_n)}{f'(x_n)}$.`,
      t`B1 explains that this intercept is taken as the next approximation $x_{n+1}$ (and requires $f'(x_n) \ne 0$).`,
    ],
    modelAnswer: t`The tangent to $y = f(x)$ at $(x_n, f(x_n))$ has gradient $f'(x_n)$:
$$
y - f(x_n) = f'(x_n)(x - x_n)
$$
It meets the $x$-axis where $y = 0$:
$$
-f(x_n) = f'(x_n)(x - x_n) \Rightarrow x - x_n = -\frac{f(x_n)}{f'(x_n)}
$$
$$
x = x_n - \frac{f(x_n)}{f'(x_n)}
$$
Near a root the tangent is close to the curve, so this intercept is a better approximation: call it $x_{n+1}$. The step needs $f'(x_n) \ne 0$.`,
    explanation: "The method replaces the curve by its tangent line.",
    hints: ["Write the equation of the tangent and find where y = 0."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain, with reference to the tangent, why the Newton–Raphson method can give a very poor $x_2$ when $f'(x_1)$ is close to zero.`,
    points: [
      "When f′(x₁) is close to 0, the tangent at x₁ is almost horizontal.",
      "A nearly horizontal tangent meets the x-axis a long way from x₁ (the correction f/f′ is huge), possibly far from any root or near a different one.",
    ],
    modelAnswer: "x₂ is where the tangent at x₁ crosses the x-axis. If the gradient is nearly zero the tangent is almost flat, so it crosses the axis far away; the step f(x₁)/f′(x₁) is very large and x₂ may be nowhere near the root.",
    explanation: "Small denominators make large corrections.",
    hints: ["What does the tangent look like at a turning point?"],
  });

  sameFn((x) => x - (x * x - 3) / (2 * x), (x) => (x * x + 3) / (2 * x), "m1");
  sameFn((x) => x - (x ** 3 - 3) / (3 * x * x), (x) => (2 * x ** 3 + 3) / (3 * x * x), "m2");
  sameFn((x) => x - (exp(x) - 3) / exp(x), (x) => x - 1 + 3 * exp(-x), "m3");
  sameFn((x) => x - (log(x) - 1) * x, (x) => x * (2 - log(x)), "m4");
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each function f(x) with its Newton–Raphson iteration, written as x_{n+1} = g(x_n) (shown here with x for x_n).",
    pairs: [
      [t`$f(x) = x^2 - 3$`, t`$g(x) = \dfrac{x^2 + 3}{2x}$`],
      [t`$f(x) = x^3 - 3$`, t`$g(x) = \dfrac{2x^3 + 3}{3x^2}$`],
      [t`$f(x) = \mathrm{e}^x - 3$`, t`$g(x) = x - 1 + 3\mathrm{e}^{-x}$`],
      [t`$f(x) = \ln x - 1$`, t`$g(x) = x(2 - \ln x)$`],
    ],
    explanation: t`In each case $g(x) = x - \frac{f(x)}{f'(x)}$ simplified; e.g. for $\ln x - 1$, $f'(x) = \frac{1}{x}$ so $g(x) = x - x(\ln x - 1) = x(2 - \ln x)$.`,
  });

  const it15 = newtonRaphson((x) => tan(x) - x, (x) => tan(x) ** 2, 4.5);
  checkDeriv((x) => tan(x) - x, (x) => tan(x) ** 2, [4.4, 4.5]);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The equation $\tan x = x$ has a root between $\pi$ and $\frac{3\pi}{2}$. Use the Newton–Raphson method with $x_1 = 4.5$ to find it correct to 3 decimal places.`,
    value: last(it15), dp: 3, wrong: [4.494, 4.5],
    explanation: t`$f(x) = \tan x - x$, $f'(x) = \sec^2 x - 1 = \tan^2 x$. $x_2 = 4.493614$, $x_3 = 4.493410$, $x_4 = 4.493409$. Root $4.493$ (3 d.p.).`,
    hints: [t`$\frac{\mathrm{d}}{\mathrm{d}x}\tan x = \sec^2 x$, and $\sec^2 x - 1 = \tan^2 x$.`],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "The Newton–Raphson method always converges to the root nearest to the starting value.",
    answer: false,
    explanation: t`It follows the tangent, which can jump past nearby roots. For $x^3 - 3x + 1 = 0$, starting at $0.95$ (nearest root $1.532$) leads to $-1.879$.`,
    hints: ["Think about a starting value near a turning point."],
  });

  // Struct 12: x³ − 6x + 2
  const g = (x) => x ** 3 - 6 * x + 2, gp = (x) => 3 * x * x - 6;
  chk(g(2), -2); chk(g(3), 11);
  sameFn((x) => x - g(x) / gp(x), (x) => (2 * x ** 3 - 2) / (3 * x * x - 6), "q17 g");
  const it17 = newtonRaphson(g, gp, 2.5);
  chk(last(it17), root(g, 2, 3), 1e-12);
  chk(gp(sqrt(2)), 0, 1e-12);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The function f is defined by $f(x) = x^3 - 6x + 2$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the equation $f(x) = 0$ has a root $\alpha$ between 2 and 3.`,
        points: [t`M1 evaluates $f(2) = -2$ and $f(3) = 11$.`, "A1 states f is continuous and changes sign, so 2 < α < 3."],
        modelAnswer: t`$f(2) = 8 - 12 + 2 = -2 < 0$ and $f(3) = 27 - 18 + 2 = 11 > 0$. $f$ is a polynomial, hence continuous, so there is a root between 2 and 3.`,
        explanation: "Change of sign." }),
      P.proof({ label: "(b)", marks: 3, stem: t`Show that the Newton–Raphson iteration for this equation can be written $x_{n+1} = \dfrac{2x_n^3 - 2}{3x_n^2 - 6}$.`,
        points: [t`B1 $f'(x) = 3x^2 - 6$.`, t`M1 writes $x_{n+1} = x_n - \dfrac{x_n^3 - 6x_n + 2}{3x_n^2 - 6}$ over a common denominator.`, "A1 simplifies the numerator to 2x_n³ − 2."],
        modelAnswer: t`$$
x_{n+1} = x_n - \frac{x_n^3 - 6x_n + 2}{3x_n^2 - 6} = \frac{3x_n^3 - 6x_n - x_n^3 + 6x_n - 2}{3x_n^2 - 6} = \frac{2x_n^3 - 2}{3x_n^2 - 6}
$$`,
        explanation: "Combine over the denominator 3xₙ² − 6." }),
      P.num({ label: "(c)", marks: 3, stem: t`Use this iteration with $x_1 = 2.5$ to find $\alpha$ correct to 4 decimal places.`, value: last(it17), dp: 4, wrong: [2.2625, 2.2941],
        explanation: t`$x_2 = 2.294118$, $x_3 = 2.262533$, $x_4 = 2.261803$, $x_5 = 2.261802$: $\alpha = 2.2618$.` }),
      P.manual({ label: "(d)", marks: 2, stem: t`Explain why $x_1 = \sqrt{2}$ cannot be used as a starting value.`, points: [t`$f'(\sqrt{2}) = 3(2) - 6 = 0$.`, "The tangent there is horizontal (a turning point), so the formula divides by zero / the tangent does not meet the x-axis."],
        modelAnswer: "f′(x) = 3x² − 6 is zero at x = √2, which is a stationary point of the curve. The denominator of the iteration is zero, and geometrically the horizontal tangent never meets the x-axis.",
        explanation: "Check the denominator 3x² − 6 at the starting value." }),
      P.num({ label: "(e)", marks: 2, stem: t`The equation also has a root between 0 and 1. Starting from $x_1 = 0$, find $x_2$, correct to 3 significant figures.`, value: newtonRaphson(g, gp, 0, { maxN: 1 })[1], wrong: [-1 / 3, 3],
        explanation: t`$x_2 = \dfrac{2(0) - 2}{3(0) - 6} = \dfrac{-2}{-6} = 0.333$.` }),
    ],
    explanation: "Locate the root, simplify the Newton–Raphson formula, iterate, and avoid starting at a turning point.",
    hints: [t`$f'(x) = 3x^2 - 6$.`, "Keep full calculator accuracy between iterations."],
  });

  // Struct 13: x = 2 sin x
  const h = (x) => x - 2 * sin(x), hp = (x) => 1 - 2 * cos(x);
  sameFn((x) => x - h(x) / hp(x), (x) => (2 * (sin(x) - x * cos(x))) / (1 - 2 * cos(x)), "q18 g");
  const it18 = newtonRaphson(h, hp, 2);
  const a18 = root(h, 1.5, 2);
  chk(last(it18), a18, 1e-12);
  chk(Math.sign(h(1.5)), -1); chk(Math.sign(h(2)), 1);
  const bad = newtonRaphson(h, hp, 1, { maxN: 1 })[1];
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The equation $x = 2\sin x$, where $x$ is in radians, has a root $\alpha$ with $\alpha > 0$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $1.5 < \alpha < 2$.`,
        points: [t`M1 evaluates $h(x) = x - 2\sin x$: $h(1.5) = -0.495$ and $h(2) = 0.181$.`, "A1 states the change of sign with continuity and concludes."],
        modelAnswer: t`$$
h(1.5) = 1.5 - 2\sin 1.5 = -0.495 < 0, \qquad h(2) = 2 - 2\sin 2 = 0.181 > 0
$$
$h$ is continuous, so $1.5 < \alpha < 2$.`,
        explanation: "Radians throughout." }),
      P.proof({ label: "(b)", marks: 3, stem: t`Show that the Newton–Raphson iteration for $h(x) = x - 2\sin x$ is $x_{n+1} = \dfrac{2(\sin x_n - x_n\cos x_n)}{1 - 2\cos x_n}$.`,
        points: [t`B1 $h'(x) = 1 - 2\cos x$.`, "M1 uses a common denominator.", t`A1 obtains the numerator $2\sin x_n - 2x_n\cos x_n$.`],
        modelAnswer: t`$$
x_{n+1} = x_n - \frac{x_n - 2\sin x_n}{1 - 2\cos x_n} = \frac{x_n - 2x_n\cos x_n - x_n + 2\sin x_n}{1 - 2\cos x_n} = \frac{2(\sin x_n - x_n\cos x_n)}{1 - 2\cos x_n}
$$`,
        explanation: "The x_n terms cancel in the numerator." }),
      P.fib({ label: "(c)", marks: 2, stem: t`Using $x_1 = 2$, find $x_2$ and $x_3$, correct to 4 decimal places.`, template: "x₂ = {{blank:a}}, x₃ = {{blank:b}}",
        blanks: [D("a", it18[1].toFixed(4), 0.00005, "1.8955"), D("b", it18[2].toFixed(4), 0.00005, "1.9010")],
        explanation: t`$x_2 = 1.9010$, $x_3 = 1.8955$ (to 4 d.p.).` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find $\alpha$ correct to 4 decimal places.`, value: a18, dp: 4, wrong: [1.8955 + 0.0055, 1.9010],
        explanation: t`$x_4 = 1.895494$, $x_5 = 1.895494$, so $\alpha = 1.8955$.` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Explain why $x_1 = 1$ would be a poor starting value.`, points: [t`$h'(x) = 1 - 2\cos x = 0$ at $x = \frac{\pi}{3} = 1.047$, which is close to 1.`, "So the tangent at x = 1 is nearly horizontal and x₂ is thrown far from α."],
        modelAnswer: "The curve y = x − 2 sin x has a minimum at x = π/3 ≈ 1.05. At x = 1 the gradient h′(1) = 1 − 2cos 1 ≈ −0.08 is tiny, so the tangent is almost flat and meets the x-axis a long way off.",
        explanation: "Starting near a stationary point is the classic failure." }),
      P.num({ label: "(f)", marks: 2, stem: t`Find the value of $x_2$ obtained from $x_1 = 1$, correct to 3 significant figures.`, value: bad, wrong: [-bad, 1.9],
        explanation: t`$h(1) = 1 - 2\sin 1 = -0.6829$ and $h'(1) = 1 - 2\cos 1 = -0.0806$, so $x_2 = 1 - \frac{-0.6829}{-0.0806} = -7.47$: nowhere near $\alpha$.` }),
    ],
    explanation: "Newton–Raphson converges rapidly from a good start and fails near a stationary point.",
    hints: [t`$h'(x) = 1 - 2\cos x$.`, "Use radians."],
  });
  chk(Math.round(bad * 100) / 100, -7.47);

  b.card("FORMULA", "Newton–Raphson", t`$x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$`);
  b.card("CONCEPT", "Where the formula comes from", t`The tangent at $(x_n, f(x_n))$ crosses the $x$-axis at $x_{n+1}$: set $y = 0$ in $y - f(x_n) = f'(x_n)(x - x_n)$.`);
  b.card("FACT", "Speed of convergence", "Near a simple root, Newton–Raphson converges very fast: correct decimal places roughly double each step.");
  b.card("FACT", "Failure: stationary point", t`If $f'(x_n) = 0$ (or is very small) the tangent is (nearly) horizontal and $x_{n+1}$ is undefined or far away.`);
  b.card("FACT", "Failure: wrong root", "A start between roots or near a turning point can send the iterates to a different root from the one wanted.");
  b.card("CONCEPT", "Square roots by Newton–Raphson", t`For $x^2 - N = 0$: $x_{n+1} = \frac{1}{2}\left(x_n + \frac{N}{x_n}\right)$.`);
  b.card("CONCEPT", "Simplifying the iteration", t`Write $x - \frac{f(x)}{f'(x)}$ as one fraction before iterating, e.g. $\frac{2x^3 - 2}{3x^2 - 6}$.`);
  b.card("CONCEPT", "Justifying accuracy", "Finish with a change of sign half a unit either side of the answer.");
  b.card("FACT", "Trigonometric equations", "Use radians: the derivatives of sin x and cos x are cos x and −sin x only in radians.");
});
