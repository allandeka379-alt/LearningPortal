// W2a: amaths.diff.implicit-parametric (both boards; ZIMSEC-only parametric -> Cartesian conversion -> applies ZP).
import { concept, P, t, chk, ZP } from "../lib.mjs";

const { exp, log, sin, cos, sqrt, PI } = Math;
const h = 1e-6;
/** Gradient of the implicit curve F(x, y) = 0 at a point on it: −F_x / F_y (numerical partials). */
const islope = (F, x, y, label) => {
  chk(F(x, y), 0, 1e-9, `${label} point on curve`);
  const fx = (F(x + h, y) - F(x - h, y)) / (2 * h);
  const fy = (F(x, y + h) - F(x, y - h)) / (2 * h);
  return -fx / fy;
};
/** Parametric gradient (dy/dt)/(dx/dt) at t, numerically. */
const pslope = (X, Y, t0) => (Y(t0 + h) - Y(t0 - h)) / (X(t0 + h) - X(t0 - h));

concept("amaths.diff.implicit-parametric", { file: "diff/implicit-parametric", keyPrefix: "diff.implicit-parametric" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`When differentiating an implicit equation with respect to $x$, what is $\dfrac{d}{dx}\left(y^{3}\right)$?`,
    options: [
      [t`$3y^{2}\dfrac{dy}{dx}$`, "Correct: chain rule, since y is a function of x."],
      [t`$3y^{2}$`, "The factor dy/dx from the chain rule is missing."],
      [t`$3x^{2}$`, "y cannot be replaced by x."],
      [t`$y^{3}\dfrac{dy}{dx}$`, "The power must come down and reduce by one: 3y²."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}(y^{3}) = \dfrac{d}{dy}(y^{3}) \times \dfrac{dy}{dx} = 3y^{2}\dfrac{dy}{dx}$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is $\dfrac{d}{dx}(xy)$, where $y$ is a function of $x$?`,
    options: [
      [t`$x\dfrac{dy}{dx} + y$`, "Correct: the product rule with u = x and v = y."],
      [t`$\dfrac{dy}{dx}$`, "This treats x as a constant; the product rule gives two terms."],
      [t`$x + y\dfrac{dy}{dx}$`, "The factor dy/dx belongs with x (the derivative of y), not with y."],
      [t`$y\dfrac{dy}{dx}$`, "The derivative of x, which is 1, multiplies y; and x multiplies dy/dx."],
    ],
    answer: "A",
    explanation: t`Product rule: $x \cdot \dfrac{dy}{dx} + y \cdot 1$.`,
  });

  const g3 = islope((x, y) => x * x + y * y - 25, 3, 4, "q3");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the gradient of the circle $x^{2} + y^{2} = 25$ at the point $(3, 4)$, as an exact decimal.`,
    value: chk(g3, -0.75, 1e-6), wrong: [0.75, -1.33],
    explanation: t`$2x + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{x}{y} = -\dfrac{3}{4} = -0.75$. (The radius has gradient $\frac{4}{3}$; the tangent is perpendicular to it.)`,
  });

  const g4 = islope((x, y) => x * x + x * y + y * y - 7, 1, 2, "q4");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The curve $x^{2} + xy + y^{2} = 7$ passes through $(1, 2)$. Find the gradient of the curve at this point, as an exact decimal.`,
    value: chk(g4, -0.8, 1e-6), wrong: [-1.25, -2],
    explanation: t`$2x + x\dfrac{dy}{dx} + y + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = -\dfrac{2x + y}{x + 2y} = -\dfrac{4}{5} = -0.8$.`,
    hints: ["Use the product rule on xy.", "Collect the dy/dx terms."],
  });

  chk(islope((x, y) => y * y - 4 * x, 4, 4, "q5"), 2 / 4, 1e-6);
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given $y^{2} = 4x$, find $\dfrac{dy}{dx}$ in terms of $y$. Type your answer as a fraction, for example 3/y.`,
    accepted: ["2/y", "2y^-1", "2y^(-1)", "4/(2y)"],
    wrong: ["4/y", "4"],
    explanation: t`$2y\dfrac{dy}{dx} = 4$, so $\dfrac{dy}{dx} = \dfrac{2}{y}$.`,
  });

  const g6 = islope((x, y) => log(y) + x * x - 1, 1, 1, "q6");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The curve $\ln y + x^{2} = 1$ passes through $(1, 1)$. Find $\dfrac{dy}{dx}$ at this point.`,
    value: chk(g6, -2, 1e-6), wrong: [2, -0.5],
    explanation: t`$\dfrac{1}{y}\dfrac{dy}{dx} + 2x = 0$, so $\dfrac{dy}{dx} = -2xy = -2$ at $(1, 1)$.`,
    hints: ["The derivative of ln y with respect to x is (1/y)(dy/dx)."],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A curve has parametric equations $x = t^{2}$, $y = t^{3}$. Find $\dfrac{dy}{dx}$ in terms of $t$.`,
    options: [
      [t`$\dfrac{3t}{2}$`, t`Correct: $\frac{3t^{2}}{2t} = \frac{3t}{2}$.`],
      [t`$\dfrac{2}{3t}$`, "This is dx/dy: the fraction is upside down."],
      [t`$6t^{3}$`, t`The derivatives $3t^{2}$ and $2t$ must be divided, not multiplied.`],
      [t`$\dfrac{3t^{2}}{2}$`, "The t in the denominator 2t has not been cancelled correctly."],
    ],
    answer: "A",
    explanation: t`$\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt} = \dfrac{3t^{2}}{2t} = \dfrac{3t}{2}$ for $t \neq 0$.`,
  });

  const g8 = pslope((s) => 3 * s + 1, (s) => s * s - 4, 6);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`A curve has parametric equations $x = 3t + 1$, $y = t^{2} - 4$. Find the gradient of the curve at the point where $t = 6$.`,
    value: chk(g8, 4, 1e-6), wrong: [36, 0.25],
    explanation: t`$\dfrac{dx}{dt} = 3$, $\dfrac{dy}{dt} = 2t$, so $\dfrac{dy}{dx} = \dfrac{2t}{3} = 4$ at $t = 6$.`,
  });

  for (const s of [-1.3, 0.4, 2.2]) chk(s * s, (s + 2 - 2) ** 2, 1e-12, "q9");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Find a Cartesian equation of the curve with parametric equations $x = t + 2$, $y = t^{2}$. Type it in the form y = …, for example y=(x+1)^2.`,
    accepted: ["y=(x-2)^2", "y=x^2-4x+4", "y=(2-x)^2", "y=(-2+x)^2"],
    wrong: ["y=(x+2)^2"],
    explanation: t`From $x = t + 2$, $t = x - 2$. Substitute: $y = (x - 2)^{2}$.`,
  });

  for (const th of [0.3, 1.1, 2.5]) chk((4 * cos(th)) ** 2 / 16 + (3 * sin(th)) ** 2 / 9, 1, 1e-12, "q10");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`The curve $C$ has parametric equations $x = 4\cos\theta$, $y = 3\sin\theta$. A Cartesian equation of $C$ is $\dfrac{x^{2}}{a} + \dfrac{y^{2}}{b} = 1$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [16], wrong: 4 },
      { id: "b", input: "number", accepted: [9], wrong: 3 },
    ],
    explanation: t`$\cos\theta = \frac{x}{4}$, $\sin\theta = \frac{y}{3}$; $\cos^{2}\theta + \sin^{2}\theta = 1$ gives $\dfrac{x^{2}}{16} + \dfrac{y^{2}}{9} = 1$.`,
    hints: ["Make cos θ and sin θ the subjects.", "Use cos²θ + sin²θ = 1."],
  });

  const g11 = pslope((s) => 2 * cos(s), (s) => sin(2 * s), PI / 6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A curve has parametric equations $x = 2\cos\theta$, $y = \sin 2\theta$. Find the gradient of the curve at the point where $\theta = \dfrac{\pi}{6}$.`,
    value: chk(g11, -1, 1e-6), wrong: [1, -0.5],
    explanation: t`$\dfrac{dx}{d\theta} = -2\sin\theta$, $\dfrac{dy}{d\theta} = 2\cos 2\theta$. At $\theta = \frac{\pi}{6}$: $\dfrac{2 \times \frac{1}{2}}{-2 \times \frac{1}{2}} = \dfrac{1}{-1} = -1$.`,
    hints: ["Remember the chain-rule factor 2 when differentiating sin 2θ."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`When differentiating implicitly with respect to $x$, $\dfrac{d}{dx}(y^{2}) = 2y$.`,
    answer: false,
    explanation: t`False. $y$ is a function of $x$, so the chain rule gives $\dfrac{d}{dx}(y^{2}) = 2y\dfrac{dy}{dx}$.`,
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each term with its derivative with respect to x.",
    pairs: [
      [t`$x^{2}$`, t`$2x$`],
      [t`$y^{2}$`, t`$2y\dfrac{dy}{dx}$`],
      [t`$xy$`, t`$x\dfrac{dy}{dx} + y$`],
      [t`$\sin y$`, t`$\cos y\dfrac{dy}{dx}$`],
    ],
    explanation: t`Terms in $x$ alone differentiate normally; each $y$ term gets a factor $\frac{dy}{dx}$; a product of $x$ and $y$ needs the product rule.`,
  });

  const g14 = islope((x, y) => x ** 3 + y ** 3 - 9 * x * y, 2, 4, "q14");
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The curve $x^{3} + y^{3} = 9xy$ passes through the point $(2, 4)$. Find the gradient of the curve at this point, as an exact decimal.`,
    value: chk(g14, 0.8, 1e-6), wrong: [1.25, -0.8],
    explanation: t`$3x^{2} + 3y^{2}\dfrac{dy}{dx} = 9y + 9x\dfrac{dy}{dx}$, so $\dfrac{dy}{dx} = \dfrac{9y - 3x^{2}}{3y^{2} - 9x} = \dfrac{3y - x^{2}}{y^{2} - 3x}$. At $(2, 4)$: $\dfrac{12 - 4}{16 - 6} = 0.8$.`,
    hints: ["Use the product rule on 9xy.", "Divide numerator and denominator by 3."],
  });

  // x² − xy + y² = 12: horizontal tangent where y = 2x -> (2, 4) and (−2, −4)
  chk(islope((x, y) => x * x - x * y + y * y - 12, 2, 4, "q15"), 0, 1e-6);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The curve $x^{2} - xy + y^{2} = 12$ has a horizontal tangent at two points. Find the coordinates of the one with $x > 0$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [
      { id: "x", input: "number", accepted: [2], wrong: 4 },
      { id: "y", input: "number", accepted: [4], wrong: 2 },
    ],
    explanation: t`$2x - x\dfrac{dy}{dx} - y + 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = \dfrac{y - 2x}{2y - x}$. Horizontal tangent: $y = 2x$. Substitute: $x^{2} - 2x^{2} + 4x^{2} = 3x^{2} = 12$, so $x = \pm 2$; with $x > 0$ the point is $(2, 4)$.`,
    hints: ["Set the numerator of dy/dx to zero.", "Substitute back into the curve's equation."],
  });

  for (const s of [0.5, 2, 3.5]) chk(pslope((u) => u - log(u), (u) => u + log(u), s), (s + 1) / (s - 1), 1e-5, "q16");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`A curve has parametric equations $x = t - \ln t$, $y = t + \ln t$, for $t > 0$. Show that $\dfrac{dy}{dx} = \dfrac{t + 1}{t - 1}$, and explain why the curve has no tangent parallel to the $x$-axis.`,
    points: [
      t`M1 finds $\dfrac{dx}{dt} = 1 - \dfrac{1}{t}$ and $\dfrac{dy}{dt} = 1 + \dfrac{1}{t}$`,
      t`A1 divides and multiplies through by $t$ to reach $\dfrac{t + 1}{t - 1}$`,
      t`B1 notes $t + 1 > 0$ for $t > 0$, so $\dfrac{dy}{dx} \neq 0$`,
    ],
    modelAnswer: ["$$", t`\frac{dy}{dx} = \frac{1 + \frac{1}{t}}{1 - \frac{1}{t}} = \frac{t + 1}{t - 1}`, "$$", "", t`A tangent parallel to the $x$-axis needs $\frac{dy}{dx} = 0$, i.e. $t = -1$, which is impossible since $t > 0$.`].join("\n"),
    explanation: "Multiply the top and bottom of the compound fraction by t.",
    hints: ["d/dt(ln t) = 1/t."],
  });

  const g17 = pslope((s) => s * s, (s) => 2 * s, 3);
  chk(g17, 1 / 3, 1e-6);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the tangent to the curve $x = t^{2}$, $y = 2t$ at the point where $t = 3$.`,
    options: [
      [t`$3y = x + 9$`, t`Correct: point $(9, 6)$, gradient $\frac{2}{2t} = \frac{1}{3}$.`],
      [t`$y = 3x - 21$`, "The gradient has been inverted: dy/dx = (dy/dt)/(dx/dt) = 1/3, not 3."],
      [t`$3y = x + 3$`, "The point is (9, 6), not (3, 6): x = t² = 9."],
      [t`$y = -3x + 33$`, "This is the normal at (9, 6), not the tangent."],
    ],
    answer: "A",
    explanation: t`At $t = 3$: $(9, 6)$. $\dfrac{dy}{dx} = \dfrac{2}{2t} = \dfrac{1}{3}$. Tangent: $y - 6 = \frac{1}{3}(x - 9)$, i.e. $3y = x + 9$.`,
    hints: ["Find the point from both equations.", "Then the gradient at t = 3."],
  });

  // struct 5: x = t² − 2t, y = t³ − 3t; dy/dx = 3(t + 1)/2; gradient 6 at t = 3 -> (3, 18)
  const X18 = (s) => s * s - 2 * s;
  const Y18 = (s) => s ** 3 - 3 * s;
  for (const s of [-1.5, 0.3, 2.4]) chk(pslope(X18, Y18, s), (3 * (s + 1)) / 2, 1e-5, "q18");
  chk(X18(3), 3); chk(Y18(3), 18);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A curve has parametric equations $x = t^{2} - 2t$, $y = t^{3} - 3t$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that, for $t \neq 1$, $\dfrac{dy}{dx} = \dfrac{3(t + 1)}{2}$.`,
        points: [t`M1 obtains $\dfrac{dy}{dx} = \dfrac{3t^{2} - 3}{2t - 2}$`, t`A1 factorises $\dfrac{3(t - 1)(t + 1)}{2(t - 1)}$ and cancels to the given result`],
        modelAnswer: ["$$", t`\frac{dy}{dx} = \frac{3t^{2} - 3}{2t - 2} = \frac{3(t - 1)(t + 1)}{2(t - 1)} = \frac{3(t + 1)}{2}`, "$$"].join("\n"),
        explanation: "Factorise and cancel the common factor t − 1." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the value of t at the point where the gradient is 6.", prefix: "t =", value: 3, wrong: [4],
        explanation: t`$\frac{3(t + 1)}{2} = 6$ gives $t + 1 = 4$, $t = 3$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "Find the coordinates of this point.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [3], wrong: 15 }, { id: "y", input: "number", accepted: [18], wrong: 27 }],
        explanation: t`$x = 9 - 6 = 3$, $y = 27 - 9 = 18$.` }),
    ],
    explanation: "Parametric gradient, solve for the parameter, then substitute into both equations.",
    hints: ["dy/dx = (dy/dt) ÷ (dx/dt).", "Use the value of t in both x and y."],
  });

  // struct 5: 2x² + xy − y² = 8 at (2, 0): gradient −4; normal x − 4y = 2; vertical tangent where x = 2y
  const F19 = (x, y) => 2 * x * x + x * y - y * y - 8;
  const g19 = islope(F19, 2, 0, "q19");
  const m19 = chk(g19, -4, 1e-6);
  const yv = sqrt(8 / 9);
  chk(F19(2 * yv, yv), 0, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A curve has equation $2x^{2} + xy - y^{2} = 8$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the gradient of the curve at the point (2, 0).", value: m19, wrong: [4, -0.25],
        explanation: t`$4x + x\dfrac{dy}{dx} + y - 2y\dfrac{dy}{dx} = 0$, so $\dfrac{dy}{dx} = \dfrac{4x + y}{2y - x}$. At $(2, 0)$: $\dfrac{8}{-2} = -4$.` }),
      P.expr({ label: "(b)", marks: 2, stem: "Find the equation of the normal at (2, 0), in the form ax + by = c with integers a, b, c.",
        accepted: ["x-4y=2", "-x+4y=-2", "x-4y-2=0", "4y=x-2", "y=x/4-1/2", "y=0.25x-0.5", "y=1/4x-1/2", "4y-x=-2"], wrong: ["4x+y=8"],
        explanation: t`Normal gradient $\frac{1}{4}$: $y = \frac{1}{4}(x - 2)$, i.e. $x - 4y = 2$.` }),
      P.num({ label: "(c)", marks: 1, stem: "The tangent is parallel to the y-axis where x = 2y. Find the positive y-coordinate of such a point, correct to 3 significant figures.", prefix: "y =", value: yv, wrong: [0.816],
        explanation: t`Vertical tangent: denominator $2y - x = 0$. With $x = 2y$: $8y^{2} + 2y^{2} - y^{2} = 9y^{2} = 8$, so $y = \frac{2\sqrt{2}}{3} \approx 0.943$.` }),
    ],
    explanation: "Implicit differentiation gives a fraction; its numerator and denominator locate horizontal and vertical tangents.",
    hints: ["Product rule on xy.", "A vertical tangent has the denominator of dy/dx equal to zero."],
  });

  b.card("FORMULA", "Implicit differentiation of yⁿ", t`$\dfrac{d}{dx}(y^{n}) = ny^{n - 1}\dfrac{dy}{dx}$`);
  b.card("FORMULA", "Derivative of xy", t`$\dfrac{d}{dx}(xy) = x\dfrac{dy}{dx} + y$`);
  b.card("FORMULA", "Parametric gradient", t`$\dfrac{dy}{dx} = \dfrac{dy/dt}{dx/dt}$`, "In MF19.");
  b.card("CONCEPT", "Implicit method", t`Differentiate every term with respect to $x$, collect $\frac{dy}{dx}$ terms, factorise, then substitute both coordinates.`);
  b.card("CONCEPT", "Horizontal and vertical tangents", t`Horizontal: numerator of $\frac{dy}{dx}$ is zero. Vertical: denominator is zero. Solve with the curve's equation.`);
  b.card("CONCEPT", "Parametric to Cartesian (ZIMSEC)", t`Eliminate the parameter: make $t$ the subject, or use $\cos^{2}\theta + \sin^{2}\theta = 1$.`, undefined, { applies: ZP });
  b.card("FACT", t`Gradient of $x^{2} + y^{2} = r^{2}$`, t`$\dfrac{dy}{dx} = -\dfrac{x}{y}$: the tangent is perpendicular to the radius.`);
  b.card("DEFINITION", "Parameter", t`A third variable (often $t$ or $\theta$) in terms of which both $x$ and $y$ are given.`);
});
