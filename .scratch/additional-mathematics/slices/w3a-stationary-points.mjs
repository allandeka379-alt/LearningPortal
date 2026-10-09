// W3a: amath.calculus.stationary-points
import { concept, P, t, chk, same, checkDeriv, deriv, quad, sfStr } from "../lib.mjs";

const XS = [0.4, 1.3, 2.6];
const NATURE = ["maximum", "minimum"];

concept("amath.calculus.stationary-points", { file: "calculus/stationary-points", keyPrefix: "calculus.stationary-points" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which condition defines a stationary point of a curve y = f(x)?",
    options: [
      [t`$\dfrac{dy}{dx} = 0$`, "Correct: the gradient is zero, so the tangent is horizontal."],
      [t`$y = 0$`, "That is where the curve meets the x-axis, which need not be stationary."],
      [t`$\dfrac{d^2y}{dx^2} = 0$`, "The second derivative is used to classify stationary points; being zero does not define them."],
      [t`$x = 0$`, "That is where the curve meets the y-axis."],
    ],
    answer: "A",
    explanation: t`At a stationary point the gradient is zero: $\frac{dy}{dx} = 0$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`At a stationary point of a curve, $\dfrac{d^2y}{dx^2} = 5$. What is the nature of the point?`,
    options: [
      ["A minimum point", "Correct: a positive second derivative means the gradient is increasing through zero."],
      ["A maximum point", "A maximum needs a negative second derivative."],
      ["Neither: the test fails", "The test fails only when the second derivative is zero."],
      ["It cannot be stationary", "Stationary depends on the first derivative, which is zero here."],
    ],
    answer: "A",
    explanation: t`$\frac{d^2y}{dx^2} > 0$: the gradient goes from negative to positive, so the point is a minimum.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $\dfrac{d^2y}{dx^2} = 0$ at a stationary point, the point cannot be a maximum or a minimum.`,
    answer: false,
    explanation: t`False. The second-derivative test is simply inconclusive. For example, $y = x^4$ has $\frac{d^2y}{dx^2} = 0$ at $(0, 0)$, yet the gradient changes from negative to positive there, so it is a minimum.`,
  });

  {
    const f = (x) => x * x - 8 * x + 3;
    chk(2 * 4 - 8, 0); chk(f(4), -13);
    b.fib({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`Find the coordinates of the stationary point of the curve $y = x^2 - 8x + 3$.`,
      template: "({{blank:x}}, {{blank:y}})",
      blanks: [{ id: "x", input: "number", accepted: [4], wrong: "8" }, { id: "y", input: "number", accepted: [-13], wrong: "0" }],
      explanation: t`$\frac{dy}{dx} = 2x - 8 = 0$ gives $x = 4$; $y = 16 - 32 + 3 = -13$. The value $y = 0$ comes from substituting into $\frac{dy}{dx}$ instead of the curve.`,
    });
  }

  chk(6 - 2 * 3, 0);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the $x$-coordinate of the stationary point of the curve $y = 5 + 6x - x^2$.`,
    value: 3, prefix: "x =", wrong: [6, -3],
    explanation: t`$\frac{dy}{dx} = 6 - 2x = 0$ gives $x = 3$. The answer $-3$ is a sign slip.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`Near a stationary point $S$, the gradient of a curve is positive just to the left of $S$ and negative just to the right. What is $S$?`,
    options: [
      ["A maximum point", "Correct: the curve rises, levels off, then falls."],
      ["A minimum point", "A minimum has the pattern negative, zero, positive."],
      ["A point where the curve crosses the x-axis", "The signs of the gradient say nothing about where y = 0."],
      ["A point where the gradient is greatest", "At S the gradient is zero, not greatest."],
    ],
    answer: "A",
    explanation: "Gradient + then 0 then −: the curve goes up and then down, so S is a maximum.",
  });

  {
    const f = (x) => x ** 3 - 3 * x * x - 9 * x + 2, fp = (x) => 3 * x * x - 6 * x - 9, f2 = (x) => 6 * x - 6;
    checkDeriv(f, fp, XS); checkDeriv(fp, f2, XS);
    same(quad.roots(3, -6, -9), [-1, 3]);
    same([f(-1), f(3), f2(-1), f2(3)], [7, -25, -12, 12]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The curve $y = x^3 - 3x^2 - 9x + 2$ has two stationary points. Find them, the one with the smaller $x$-coordinate first, and state the nature of each.`,
      template: "({{blank:a}}, {{blank:b}}), which is a {{blank:n1}}\n\n({{blank:c}}, {{blank:d}}), which is a {{blank:n2}}",
      blanks: [
        { id: "a", input: "number", accepted: [-1], wrong: "1" },
        { id: "b", input: "number", accepted: [7], wrong: "0" },
        { id: "n1", choices: NATURE, accepted: ["maximum"] },
        { id: "c", input: "number", accepted: [3], wrong: "-3" },
        { id: "d", input: "number", accepted: [-25], wrong: "0" },
        { id: "n2", choices: NATURE, accepted: ["minimum"] },
      ],
      explanation: t`$\frac{dy}{dx} = 3x^2 - 6x - 9 = 3(x + 1)(x - 3) = 0$ gives $x = -1$ or $3$. $y(-1) = -1 - 3 + 9 + 2 = 7$; $y(3) = 27 - 27 - 27 + 2 = -25$. $\frac{d^2y}{dx^2} = 6x - 6$: at $x = -1$ it is $-12 < 0$ (maximum); at $x = 3$ it is $12 > 0$ (minimum).`,
      hints: ["Factorise dy/dx after taking out 3.", "Use the second derivative 6x − 6 for the nature."],
    });
  }

  {
    const fp = (x) => 6 * x * x - 6, f2 = (x) => 12 * x;
    checkDeriv((x) => 2 * x ** 3 - 6 * x, fp, XS); checkDeriv(fp, f2, XS);
    chk(fp(1), 0);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The curve $y = 2x^3 - 6x$ has a stationary point with $x > 0$. Find the value of $\dfrac{d^2y}{dx^2}$ at this point.`,
      value: f2(1), wrong: [0, -12],
      explanation: t`$\frac{dy}{dx} = 6x^2 - 6 = 0$ gives $x = \pm 1$; take $x = 1$. $\frac{d^2y}{dx^2} = 12x = 12$ at $x = 1$ (positive, so a minimum). The value $-12$ is at $x = -1$.`,
      hints: ["Find the stationary x-value first."],
    });
  }

  b.match({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`At $x = a$ on the curve $y = f(x)$, the following facts are known. Match each with the correct conclusion.`,
    pairs: [
      [t`$f'(a) = 0$ and $f''(a) = -4$`, t`$x = a$ gives a maximum point`],
      [t`$f'(a) = 0$ and $f''(a) = 3$`, t`$x = a$ gives a minimum point`],
      [t`$f'(a) = 0$ and $f''(a) = 0$`, "Use the change-of-sign test to decide"],
      [t`$f'(a) = 2$`, t`$x = a$ is not a stationary point`],
    ],
    explanation: t`A stationary point needs $f'(a) = 0$. Then $f''(a) < 0$ means maximum, $f''(a) > 0$ minimum, and $f''(a) = 0$ is inconclusive, so check the sign of $f'$ on each side.`,
    hints: ["First check whether each point is stationary at all."],
  });

  {
    const f = (x) => 4 * x + 1 / x, fp = (x) => 4 - 1 / (x * x);
    checkDeriv(f, fp, XS); chk(fp(0.5), 0); chk(f(0.5), 4); chk(2 / 0.5 ** 3, 16);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the stationary point of the curve $y = 4x + \dfrac{1}{x}$ for $x > 0$, and state its nature.`,
      template: "({{blank:x}}, {{blank:y}}), which is a {{blank:n}}",
      blanks: [
        { id: "x", input: "number", accepted: [0.5], wrong: "2" },
        { id: "y", input: "number", accepted: [4], wrong: "8.5" },
        { id: "n", choices: NATURE, accepted: ["minimum"] },
      ],
      explanation: t`$\frac{dy}{dx} = 4 - \frac{1}{x^2} = 0$ gives $x^2 = \frac{1}{4}$, so $x = \frac{1}{2}$ (as $x > 0$) and $y = 2 + 2 = 4$. $\frac{d^2y}{dx^2} = \frac{2}{x^3} = 16 > 0$: a minimum. Solving $x^2 = 4$ by mistake gives $x = 2$.`,
      hints: [t`$\frac{1}{x} = x^{-1}$.`, t`$x^2 = \frac{1}{4}$.`],
    });
  }

  {
    const f = (x) => 12 * x - x ** 3;
    chk(12 - 3 * 4, 0); chk(f(2), 16);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the maximum value of $y = 12x - x^3$ for $x > 0$.`,
      value: f(2), wrong: [2, 8],
      explanation: t`$\frac{dy}{dx} = 12 - 3x^2 = 0$ gives $x = 2$ (as $x > 0$); $\frac{d^2y}{dx^2} = -6x = -12 < 0$, so it is a maximum. The maximum value is $y = 24 - 8 = 16$. The value 2 is the $x$-coordinate, not the maximum value of $y$.`,
      hints: ["The 'value' is the y-coordinate."],
    });
  }

  {
    const xs = 0.5 * Math.log(3);
    chk(deriv((x) => Math.exp(2 * x) - 6 * x, xs), 0, 1e-7);
    b.expr({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`Find the exact $x$-coordinate of the stationary point of the curve $y = \mathrm{e}^{2x} - 6x$. Type it using ln, for example (1/3)ln5.`,
      accepted: ["(1/2)ln3", "1/2ln3", "0.5ln3", "ln3/2", "(ln3)/2", "ln√3", "x=(1/2)ln3", "x=1/2ln3", "x=0.5ln3", "x=ln3/2", "x=(ln3)/2", "x=ln√3"],
      wrong: ["ln3", "ln6"],
      explanation: t`$\frac{dy}{dx} = 2\mathrm{e}^{2x} - 6 = 0$ gives $\mathrm{e}^{2x} = 3$, so $2x = \ln 3$ and $x = \frac{1}{2}\ln 3$. Forgetting to divide by 2 gives $\ln 3$; forgetting the factor 2 in the derivative gives $\mathrm{e}^{2x} = 6$.`,
      hints: [t`$\frac{d}{dx}\mathrm{e}^{2x} = 2\mathrm{e}^{2x}$.`, "Take natural logarithms of both sides."],
    });
  }

  {
    const fp = (x) => 4 * x ** 3 * Math.log(x) + x ** 3;
    checkDeriv((x) => x ** 4 * Math.log(x), fp, XS);
    const xs = Math.exp(-1 / 4);
    chk(fp(xs), 0, 1e-12);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The curve $y = x^4\ln x$, $x > 0$, has one stationary point. Find its $x$-coordinate, correct to 3 significant figures.`,
      value: xs, wrong: [sfStr(Math.exp(-4)), 1],
      explanation: t`$\frac{dy}{dx} = 4x^3\ln x + x^4 \cdot \frac{1}{x} = x^3(4\ln x + 1)$. Since $x > 0$, $4\ln x + 1 = 0$, so $\ln x = -\frac{1}{4}$ and $x = \mathrm{e}^{-\frac{1}{4}} = ${sfStr(xs)}$ (3 s.f.). Solving $\ln x = -4$ gives $${sfStr(Math.exp(-4))}$.`,
      hints: ["Use the product rule, then factorise out x³.", t`$\ln x = k \Rightarrow x = \mathrm{e}^k$.`],
    });
  }

  {
    const f2 = (x) => -Math.sin(x) - Math.cos(x);
    chk(Math.cos(Math.PI / 4) - Math.sin(Math.PI / 4), 0, 1e-12);
    chk(f2(Math.PI / 4), -Math.SQRT2);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The curve $y = \sin x + \cos x$ has a stationary point at $x = \dfrac{\pi}{4}$. Which statement correctly determines its nature?`,
      options: [
        [t`$\frac{d^2y}{dx^2} = -\sqrt{2} < 0$, so it is a maximum`, t`Correct: $\frac{d^2y}{dx^2} = -\sin x - \cos x = -\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2}$.`],
        [t`$\frac{d^2y}{dx^2} = \sqrt{2} > 0$, so it is a minimum`, t`The derivative of $\cos x$ is $-\sin x$, and of $-\sin x$ is $-\cos x$: both terms are negative.`],
        [t`$\frac{d^2y}{dx^2} = 0$, so the test fails`, t`$-\sin\frac{\pi}{4} - \cos\frac{\pi}{4} \neq 0$; perhaps the first derivative was used again.`],
        [t`$\frac{d^2y}{dx^2} = -\sqrt{2} < 0$, so it is a minimum`, "The value is right but the conclusion is reversed: negative means maximum."],
      ],
      answer: "A",
      explanation: t`$\frac{dy}{dx} = \cos x - \sin x$ and $\frac{d^2y}{dx^2} = -\sin x - \cos x$. At $\frac{\pi}{4}$: $-\frac{\sqrt{2}}{2} - \frac{\sqrt{2}}{2} = -\sqrt{2} < 0$, so a maximum.`,
      hints: [t`$\sin\frac{\pi}{4} = \cos\frac{\pi}{4} = \frac{\sqrt{2}}{2}$.`],
    });
  }

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The curve $y = x^3 + 3x$ has no stationary points.`,
    answer: true,
    explanation: t`True. $\frac{dy}{dx} = 3x^2 + 3 \geq 3$ for every $x$, so it is never zero. The curve is increasing everywhere.`,
    hints: [t`Can $3x^2 + 3$ ever be 0?`],
  });

  {
    const a = -3, bb = 3;
    chk(3 * 4 + 2 * a * 2, 0); chk(8 + a * 4 + bb, -1);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The curve $y = x^3 + ax^2 + b$ has a stationary point at $(2, -1)$. Find the constants $a$ and $b$.`,
      template: "a = {{blank:a}}, b = {{blank:b}}",
      blanks: [{ id: "a", input: "number", accepted: [a], wrong: "-6" }, { id: "b", input: "number", accepted: [bb], wrong: "-1" }],
      explanation: t`$\frac{dy}{dx} = 3x^2 + 2ax = 0$ at $x = 2$: $12 + 4a = 0$, so $a = -3$. The point is on the curve: $8 + 4a + b = -1$, so $8 - 12 + b = -1$ and $b = 3$.`,
      hints: ["Use dy/dx = 0 at x = 2 for a.", "Use the coordinates of the point for b."],
    });
  }

  {
    const fp = (x) => 6 * x * x - 6 * x + 6;
    checkDeriv((x) => 2 * x ** 3 - 3 * x * x + 6 * x - 1, fp, XS);
    chk(quad.disc(1, -1, 1), -3);
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
      stem: t`Show that the curve $y = 2x^3 - 3x^2 + 6x - 1$ has no stationary points.`,
      points: [
        t`M1 differentiates: $\frac{dy}{dx} = 6x^2 - 6x + 6 = 6(x^2 - x + 1)$.`,
        t`M1 considers $x^2 - x + 1 = 0$ and finds the discriminant $(-1)^2 - 4(1)(1) = -3$ (or completes the square: $(x - \frac{1}{2})^2 + \frac{3}{4}$).`,
        t`A1 concludes that $\frac{dy}{dx}$ is never zero, so there are no stationary points.`,
      ],
      modelAnswer: t`$$
\frac{dy}{dx} = 6x^2 - 6x + 6 = 6(x^2 - x + 1)
$$

$$
x^2 - x + 1 = \left(x - \frac{1}{2}\right)^2 + \frac{3}{4} > 0 \text{ for all } x
$$

So $\frac{dy}{dx} > 0$ for every $x$: it is never zero, and the curve has no stationary points.`,
      explanation: "A stationary point needs dy/dx = 0; show this quadratic has no real roots.",
      hints: ["Use the discriminant of the quadratic in dy/dx."],
    });
  }

  {
    const fp = (x) => 4 * x ** 3 - 4;
    chk(fp(1), 0);
    const l = fp(0.9), r = fp(1.1);
    chk(Number(l.toFixed(3)), -1.084); chk(Number(r.toFixed(3)), 1.324);
    b.manualShort({
      d: 3, skill: "ANALYSIS", calculator: true, marks: 3,
      stem: t`The curve $y = x^4 - 4x$ has a stationary point at $x = 1$. Use the first-derivative (change of sign) test, with $x = 0.9$ and $x = 1.1$, to determine its nature. Show the values you calculate.`,
      points: [
        t`Finds $\frac{dy}{dx} = 4x^3 - 4$ and evaluates at $x = 0.9$: $-1.084$ (negative).`,
        t`Evaluates at $x = 1.1$: $1.324$ (positive).`,
        "Concludes: the gradient changes from negative to positive, so the point is a minimum.",
      ],
      modelAnswer: t`dy/dx = 4x³ − 4. At x = 0.9: 4(0.729) − 4 = −1.084 < 0. At x = 1.1: 4(1.331) − 4 = 1.324 > 0. The gradient goes from negative to zero to positive, so (1, −3) is a minimum.`,
      explanation: t`Negative to positive gradient means the curve falls then rises: a minimum at $(1, -3)$.`,
      hints: ["Find dy/dx first, then substitute each value."],
    });
  }

  {
    const f = (x) => x ** 3 - 12 * x + 5, f2 = (x) => 6 * x;
    same(quad.roots(3, 0, -12), [-2, 2]);
    same([f(-2), f(2)], [21, -11]);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`A curve has equation $y = x^3 - 12x + 5$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: "Find the x-coordinates of the stationary points, in ascending order.", template: "x = {{blank:a}} and x = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [-2], wrong: "-4" }, { id: "b", input: "number", accepted: [2], wrong: "4" }],
          explanation: t`$\frac{dy}{dx} = 3x^2 - 12 = 0$, so $x^2 = 4$ and $x = \pm 2$.` }),
        P.fib({ label: "(b)", marks: 2, stem: "Find the corresponding y-coordinates.", template: "at x = −2: y = {{blank:a}}; at x = 2: y = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [21], wrong: "-11" }, { id: "b", input: "number", accepted: [-11], wrong: "21" }],
          explanation: t`$y(-2) = -8 + 24 + 5 = 21$; $y(2) = 8 - 24 + 5 = -11$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Determine the nature of each stationary point, giving a reason.",
          points: [t`Finds $\frac{d^2y}{dx^2} = 6x$ and states $-12 < 0$ at $x = -2$, so $(-2, 21)$ is a maximum.`, t`States $12 > 0$ at $x = 2$, so $(2, -11)$ is a minimum.`],
          modelAnswer: t`d²y/dx² = 6x. At x = −2 it is −12 < 0: maximum at (−2, 21). At x = 2 it is 12 > 0: minimum at (2, −11).`,
          explanation: "Second-derivative test with the reason stated." }),
        P.num({ label: "(d)", marks: 1, stem: t`Hence state the number of real roots of the equation $x^3 - 12x + 5 = 0$.`, value: 3, wrong: [1],
          explanation: "The maximum is above the x-axis (21 > 0) and the minimum below it (−11 < 0), so the curve crosses the x-axis three times." }),
      ],
      explanation: "Stationary points and their nature describe the shape of the cubic, which shows how many times it crosses the x-axis.",
      hints: ["Solve 3x² − 12 = 0.", "A cubic with a maximum above the axis and a minimum below it crosses the axis three times."],
    });
  }

  {
    const y = (x) => x * x * Math.exp(-x);
    const fp = (x) => x * Math.exp(-x) * (2 - x);
    const f2 = (x) => Math.exp(-x) * (x * x - 4 * x + 2);
    checkDeriv(y, fp, XS); checkDeriv(fp, f2, XS);
    chk(y(2), 4 * Math.exp(-2)); chk(f2(0), 2); chk(f2(2), -2 * Math.exp(-2));
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A curve has equation $y = x^2\mathrm{e}^{-x}$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $\dfrac{dy}{dx} = x\mathrm{e}^{-x}(2 - x)$.`,
          points: [t`M1 uses the product rule: $2x\mathrm{e}^{-x} - x^2\mathrm{e}^{-x}$.`, t`A1 factorises to $x\mathrm{e}^{-x}(2 - x)$.`],
          modelAnswer: t`$$
\frac{dy}{dx} = 2x\mathrm{e}^{-x} + x^2(-\mathrm{e}^{-x}) = x\mathrm{e}^{-x}(2 - x)
$$`,
          explanation: "Product rule, then factorise." }),
        P.fib({ label: "(b)", marks: 2, stem: "Find the x-coordinates of the stationary points, in ascending order.", template: "x = {{blank:a}} and x = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [0], wrong: "-2" }, { id: "b", input: "number", accepted: [2], wrong: "1" }],
          explanation: t`$\mathrm{e}^{-x} \neq 0$, so $x = 0$ or $x = 2$.` }),
        P.expr({ label: "(c)", marks: 2, stem: "Find the exact y-coordinate of the stationary point with x = 2. Type it, for example 9e^-3.", accepted: ["4e^-2", "4e^(-2)", "4/e^2", "y=4e^-2", "y=4/e^2", "4e^{-2}"],
          wrong: ["4e^2"], explanation: t`$y = 4\mathrm{e}^{-2} = \frac{4}{\mathrm{e}^2}$.` }),
        P.fib({ label: "(d)", marks: 2, stem: t`It is given that $\dfrac{d^2y}{dx^2} = \mathrm{e}^{-x}(x^2 + px + q)$. Find $p$ and $q$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [-4], wrong: "-2" }, { id: "q", input: "number", accepted: [2], wrong: "0" }],
          explanation: t`$\frac{dy}{dx} = \mathrm{e}^{-x}(2x - x^2)$. Product rule: $\mathrm{e}^{-x}(2 - 2x) - \mathrm{e}^{-x}(2x - x^2) = \mathrm{e}^{-x}(x^2 - 4x + 2)$.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "What is the nature of the stationary point at the origin?",
          options: [
            [t`A minimum, since $\frac{d^2y}{dx^2} = 2 > 0$ there`, t`Correct: $\mathrm{e}^0(0 - 0 + 2) = 2$.`],
            [t`A maximum, since $\frac{d^2y}{dx^2} = 2 > 0$ there`, "A positive second derivative means a minimum."],
            [t`A maximum, since $\frac{d^2y}{dx^2} = -2 < 0$ there`, t`That is the sign at $x = 2$ (where the value is $-2\mathrm{e}^{-2}$), not at the origin.`],
            [t`Cannot tell, since $\frac{d^2y}{dx^2} = 0$ there`, t`At $x = 0$ the second derivative is $2$, not $0$.`],
          ], answer: "A", explanation: t`$\frac{d^2y}{dx^2} = 2 > 0$ at $x = 0$, so the origin is a minimum (and $y = x^2\mathrm{e}^{-x} \geq 0$ everywhere confirms it).` }),
      ],
      explanation: "Product rule twice, factorising each time, and using the fact that e^(−x) is never zero.",
      hints: [t`$\frac{d}{dx}\mathrm{e}^{-x} = -\mathrm{e}^{-x}$.`, t`$\mathrm{e}^{-x} > 0$ for all $x$.`],
    });
  }

  b.card("DEFINITION", "Stationary point", t`A point where $\frac{dy}{dx} = 0$: the tangent is horizontal.`);
  b.card("FORMULA", "Second-derivative test", t`$\frac{d^2y}{dx^2} < 0$: maximum; $> 0$: minimum; $= 0$: inconclusive.`);
  b.card("CONCEPT", "First-derivative test", "Gradient + → 0 → −: maximum. Gradient − → 0 → +: minimum.");
  b.card("CONCEPT", "y-coordinate of a stationary point", "Substitute x into the equation of the curve, never into dy/dx (which gives 0).");
  b.card("FACT", "When the second-derivative test fails", t`If $\frac{d^2y}{dx^2} = 0$, use the change-of-sign test: $y = x^4$ has a minimum at the origin.`);
  b.card("CONCEPT", "Full justification", "State the sign or value of the test quantity AND the conclusion, e.g. 'd²y/dx² = −6 < 0, so maximum'.");
  b.card("FACT", "Points of inflexion", "Not examined in ZIMSEC or Cambridge 0606 at this level.");
  b.card("CONCEPT", "Exponential factors", t`$\mathrm{e}^{kx}$ is never zero, so in $x\mathrm{e}^{-x}(2 - x) = 0$ only the other factors give solutions.`);
  b.card("CONCEPT", "No stationary points", t`Show $\frac{dy}{dx} = 0$ has no real solutions, e.g. a quadratic with negative discriminant.`);
});
