// W1a: amath.polynomials.cubic-equations — first factor by trial, quadratic factor, solving cubics.
import { concept, P, t, chk, same, poly, quad } from "../lib.mjs";

const r = Math.sqrt;
const perms3 = (a, b2, c) => [[a, b2, c], [a, c, b2], [b2, a, c], [b2, c, a], [c, a, b2], [c, b2, a]].map((x) => x.join(""));

concept("amath.polynomials.cubic-equations", { file: "polynomials/cubic-equations", keyPrefix: "polynomials.cubic-equations" }, (b) => {
  same(poly.rationalRoots([1, -4, 1, 6]), [-1, 2, 3]);
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`You want an integer root of $x^{3} - 4x^{2} + x + 6 = 0$ by trial. Which list contains every integer worth trying?`,
    options: [
      [t`$\pm 1, \pm 2, \pm 3, \pm 6$`, "Correct: an integer root must divide the constant term 6."],
      [t`$\pm 1, \pm 2, \pm 4$`, "The leading coefficient is 1 here; it is the constant term 6 whose divisors matter, not the coefficient 4."],
      [t`$1, 2, 3, 6$`, "Negative divisors must be tried too (in fact x = −1 is a root)."],
      [t`$\pm 1, \pm 6$`, "2 and 3 also divide 6 and must be tried."],
    ],
    answer: "A",
    explanation: t`If $x = a$ is an integer root, then $a$ divides the constant term. The divisors of 6 are $\pm 1, \pm 2, \pm 3, \pm 6$. (The roots are $-1$, $2$ and $3$.)`,
  });

  same(poly.div([1, -6, 11, -6], [1, -1]), { q: [1, -5, 6], r: [0] });
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given that $x - 1$ is a factor of $x^{3} - 6x^{2} + 11x - 6$, which is the quadratic factor?`,
    options: [
      [t`$x^{2} - 5x + 6$`, t`Correct: $(x - 1)\left(x^{2} - 5x + 6\right) = x^{3} - 6x^{2} + 11x - 6$.`],
      [t`$x^{2} - 7x + 6$`, t`$(x - 1)\left(x^{2} - 7x + 6\right)$ has $x^{2}$ coefficient $-8$, not $-6$.`],
      [t`$x^{2} - 5x - 6$`, t`The constant must be $+6$ so that $-1 \times 6 = -6$.`],
      [t`$x^{2} + 5x + 6$`, t`$(x - 1)\left(x^{2} + 5x + 6\right)$ gives $+4x^{2}$, not $-6x^{2}$.`],
    ],
    answer: "A",
    explanation: t`The $x^{2}$ coefficient of the product is $q - 1$ where $q$ is the middle coefficient, so $q - 1 = -6$ gives $q = -5$; the constant is $6$ because $(-1)(6) = -6$.`,
  });

  same(poly.mul([1, 2], [1, 0, -1]), [1, 2, -1, -2]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`It is given that $x^{3} + 2x^{2} - x - 2 \equiv (x + 2)\left(x^{2} + px + q\right)$. Find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [{ id: "p", input: "number", accepted: [0], wrong: 2 }, { id: "q", input: "number", accepted: [-1], wrong: 1 }],
    explanation: t`Constants: $2q = -2$, so $q = -1$. $x^{2}$ terms: $p + 2 = 2$, so $p = 0$. Check the $x$ terms: $q + 2p = -1$. ✓ So the quadratic factor is $x^{2} - 1$.`,
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x^{3} - 4x^{2} + x + 6 = 0$.`,
    template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order)",
    blanks: [{ id: "x1", input: "number", accepted: [-1], wrong: 1 }, { id: "x2", input: "number", accepted: [2], wrong: -2 }, { id: "x3", input: "number", accepted: [3], wrong: -3 }],
    explanation: t`$f(-1) = -1 - 4 - 1 + 6 = 0$, so $x + 1$ is a factor. Dividing gives $x^{2} - 5x + 6 = (x - 2)(x - 3)$. Roots: $-1$, $2$, $3$.`,
    hints: ["Try x = 1 and x = −1 first.", "Divide by the factor you found, then factorise the quadratic."],
  });

  same(poly.rationalRoots([2, -5, -4, 3]), [-1, 0.5, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2x^{3} - 5x^{2} - 4x + 3 = 0$.`,
    template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order; fractions or decimals)",
    blanks: [{ id: "x1", input: "number", accepted: [-1], wrong: 1 }, { id: "x2", input: "number", accepted: [0.5], wrong: 2 }, { id: "x3", input: "number", accepted: [3], wrong: -3 }],
    explanation: t`$f(-1) = -2 - 5 + 4 + 3 = 0$, so $x + 1$ is a factor. The quotient is $2x^{2} - 7x + 3 = (2x - 1)(x - 3)$. Roots: $-1$, $\frac{1}{2}$, $3$.`,
    hints: ["Try x = −1.", "The quadratic factor has leading coefficient 2."],
  });

  same(poly.mul(poly.mul([1, 1], [1, -4]), [1, 2]), [1, -1, -10, -8]);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Factorise $x^{3} - x^{2} - 10x - 8$ completely. Type it like (x+a)(x+b)(x+c).`,
    accepted: perms3("(x+1)", "(x-4)", "(x+2)"),
    explanation: t`$f(-1) = -1 - 1 + 10 - 8 = 0$, so $x + 1$ is a factor. Dividing gives $x^{2} - 2x - 8 = (x - 4)(x + 2)$. So $x^{3} - x^{2} - 10x - 8 = (x + 1)(x - 4)(x + 2)$.`,
    hints: ["Try the divisors of −8: ±1, ±2, ±4, ±8."],
  });

  same(poly.div([1, -5, 2, 8], [1, -2]), { q: [1, -3, -4], r: [0] });
  same(quad.roots(1, -3, -4), [-1, 4]);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`$x = 2$ is a root of $x^{3} - 5x^{2} + 2x + 8 = 0$. Find the sum of the other two roots.`,
    value: 3, wrong: [5, -3],
    explanation: t`Dividing by $x - 2$ gives $x^{2} - 3x - 4 = (x - 4)(x + 1)$. The other roots are $4$ and $-1$, with sum $3$.`,
    hints: ["Divide by x − 2 to find the quadratic factor."],
  });

  chk(quad.disc(1, 1, 5), -19);
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`How many real roots does the equation $(x - 1)\left(x^{2} + x + 5\right) = 0$ have?`,
    value: 1, wrong: [3, 2],
    explanation: t`$x = 1$ is one root. The quadratic $x^{2} + x + 5$ has discriminant $1 - 20 = -19 < 0$, so it gives no real roots. There is exactly one real root.`,
  });

  same(poly.div([1, 1, -7, -3], [1, 3]), { q: [1, -2, -1], r: [0] });
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x^{3} + x^{2} - 7x - 3 = 0$. Give non-integer roots correct to 3 significant figures.`,
    template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order)",
    blanks: [
      { id: "x1", input: "number", accepted: [-3], wrong: 3 },
      { id: "x2", input: "number", accepted: [-0.414], tolerance: 0.0005, wrong: 0.414 },
      { id: "x3", input: "number", accepted: [2.41], tolerance: 0.005, wrong: -2.41 },
    ],
    explanation: t`$f(-3) = -27 + 9 + 21 - 3 = 0$, so $x + 3$ is a factor and the quotient is $x^{2} - 2x - 1$. The formula gives $x = 1 \pm \sqrt{2}$, that is $-0.414$ and $2.41$ (3 s.f.).`,
    hints: ["Try x = −3.", "The quadratic factor does not factorise: use the formula."],
  });
  chk(1 - r(2), -0.41421356, 1e-8);
  chk(1 + r(2), 2.41421356, 1e-8);

  same(poly.div([1, -4, 1, 2], [1, -1]), { q: [1, -3, -2], r: [0] });
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`One root of $x^{3} - 4x^{2} + x + 2 = 0$ is $x = 1$. The other two roots are $\dfrac{a \pm \sqrt{b}}{2}$, where $a$ and $b$ are integers. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: -3 }, { id: "b", input: "number", accepted: [17], wrong: 1 }],
    explanation: t`Dividing by $x - 1$ gives $x^{2} - 3x - 2$. Then $x = \dfrac{3 \pm \sqrt{9 + 8}}{2} = \dfrac{3 \pm \sqrt{17}}{2}$.`,
    hints: ["Divide by x − 1.", t`Use $x = \frac{-b \pm \sqrt{b^{2} - 4ac}}{2a}$ on the quadratic factor.`],
  });
  same(quad.roots(1, -3, -2), [(3 - r(17)) / 2, (3 + r(17)) / 2]);

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Every cubic equation with integer coefficients has at least one integer root.",
    answer: false,
    explanation: t`For example $x^{3} - 2 = 0$ has only the root $\sqrt[3]{2}$, which is not an integer. Trial of divisors works for the cubics set in exams, but not for every cubic.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A cubic equation has at most three real roots.",
    answer: true,
    explanation: "A cubic has at most three linear factors, so at most three real roots (and always at least one).",
  });

  same(poly.rationalRoots([1, -6, 11, -6]), [1, 2, 3]);
  same(poly.rationalRoots([1, 1, -6, 0]), [-3, 0, 2]);
  same(poly.mul(poly.mul([1, 1], [1, 1]), [1, -2]), [1, 0, -3, -2]);
  same(poly.mul([1, -1], [1, 0, 1]), [1, -1, 1, -1]);
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each cubic equation to its set of real roots.",
    pairs: [
      [t`$x^{3} - 6x^{2} + 11x - 6 = 0$`, t`$1, 2, 3$`],
      [t`$x^{3} + x^{2} - 6x = 0$`, t`$-3, 0, 2$`],
      [t`$x^{3} - 3x - 2 = 0$`, t`$-1$ (repeated) and $2$`],
      [t`$x^{3} - x^{2} + x - 1 = 0$`, t`$1$ only`],
    ],
    explanation: t`$x^{3} - 6x^{2} + 11x - 6 = (x - 1)(x - 2)(x - 3)$; $x^{3} + x^{2} - 6x = x(x + 3)(x - 2)$; $x^{3} - 3x - 2 = (x + 1)^{2}(x - 2)$; $x^{3} - x^{2} + x - 1 = (x - 1)\left(x^{2} + 1\right)$.`,
    hints: ["Find one root of each by trial, then factorise the quadratic."],
  });

  same(poly.mul([1, -2], [2, 5, -3]), [2, 1, -13, 6]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$2x^{3} + x^{2} - 13x + 6 \equiv (x - 2)\left(2x^{2} + bx + c\right)$. What is the value of $b$?`,
    options: [
      [t`$5$`, t`Correct: the $x^{2}$ terms give $b - 4 = 1$.`],
      [t`$-3$`, t`That is $c$, from $-2c = 6$.`],
      [t`$1$`, t`The $x^{2}$ coefficient of the product is $b - 4$, not $b$.`],
      [t`$-3.5$`, t`The $x^{2}$ coefficient is $b + 2(-2) = b - 4$; it is not found by halving.`],
    ],
    answer: "A",
    explanation: t`Constants: $-2c = 6$, $c = -3$. $x^{2}$ terms: $b - 4 = 1$, $b = 5$. Check $x$ terms: $c - 2b = -3 - 10 = -13$. ✓`,
    hints: [t`Expand $(x - 2)\left(2x^{2} + bx + c\right)$ and compare the $x^{2}$ terms.`],
  });

  same(poly.mul([1, 2], [1, 0, 3]), [1, 2, 3, 6]);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Nyasha says the equation $x^{3} + 2x^{2} + 3x + 6 = 0$ has three real roots. How many real roots does it actually have?`,
    options: [
      [t`$1$`, t`Correct: it factorises as $(x + 2)\left(x^{2} + 3\right)$, and $x^{2} + 3 = 0$ has no real roots.`],
      [t`$3$`, t`The quadratic factor $x^{2} + 3$ has a negative discriminant.`],
      [t`$2$`, t`$x^{2} + 3 = 0$ gives no real roots at all, not one.`],
      [t`$0$`, "Every cubic has at least one real root; here it is x = −2."],
    ],
    answer: "A",
    explanation: t`Group the terms: $x^{2}(x + 2) + 3(x + 2) = (x + 2)\left(x^{2} + 3\right)$. The only real root is $x = -2$.`,
    hints: ["Try x = −2.", "Check the discriminant of the quadratic factor."],
  });

  chk(poly.eval([2, -1, 2, -1], 0.5), 0);
  chk(poly.eval([2, 1, 2, 1], 0.5), 2.5);
  chk(poly.eval([1, -2, 1, -2], 0.5), -1.875);
  chk(poly.eval([2, -1, -2, -1], 0.5), -2);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Which equation has $x = \frac{1}{2}$ as a root?`,
    options: [
      [t`$2x^{3} - x^{2} + 2x - 1 = 0$`, t`Correct: $\frac{1}{4} - \frac{1}{4} + 1 - 1 = 0$; it is $(2x - 1)\left(x^{2} + 1\right)$.`],
      [t`$2x^{3} + x^{2} + 2x + 1 = 0$`, t`At $x = \frac{1}{2}$ this gives $\frac{5}{2}$; its root is $x = -\frac{1}{2}$.`],
      [t`$x^{3} - 2x^{2} + x - 2 = 0$`, t`This is $(x - 2)\left(x^{2} + 1\right)$, with root $x = 2$.`],
      [t`$2x^{3} - x^{2} - 2x - 1 = 0$`, t`At $x = \frac{1}{2}$ this gives $-2$, not 0.`],
    ],
    answer: "A",
    explanation: t`Substitute $x = \frac{1}{2}$ into each; only the first gives 0. Equivalently, $2x - 1$ is a factor of $2x^{3} - x^{2} + 2x - 1 = x^{2}(2x - 1) + (2x - 1)$.`,
    hints: [t`$\left(\frac{1}{2}\right)^{3} = \frac{1}{8}$, so $2x^{3} = \frac{1}{4}$.`],
  });

  const pos = (-1 + r(5)) / 2;
  chk(poly.eval([1, -2, -4, 3], 3), 0);
  same(poly.div([1, -2, -4, 3], [1, -3]), { q: [1, 1, -1], r: [0] });
  chk(poly.eval([1, -2, -4, 3], pos), 0, 1e-9);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The equation $x^{3} - 2x^{2} - 4x + 3 = 0$ has one integer root and two other roots. Find the root that lies between 0 and 1, correct to 3 significant figures.`,
    value: pos, prefix: "x =", wrong: [1.62, -1.62],
    explanation: t`$f(3) = 27 - 18 - 12 + 3 = 0$, so $x - 3$ is a factor. The quotient is $x^{2} + x - 1$, so $x = \dfrac{-1 \pm \sqrt{5}}{2}$. The root between 0 and 1 is $\dfrac{-1 + \sqrt{5}}{2} = 0.618$.`,
    workedSolution: t`1. Try divisors of 3: $f(3) = 0$, so $x - 3$ is a factor.
2. Divide: $x^{3} - 2x^{2} - 4x + 3 = (x - 3)\left(x^{2} + x - 1\right)$.
3. $x = \dfrac{-1 \pm \sqrt{1 + 4}}{2} = \dfrac{-1 \pm \sqrt{5}}{2}$.
4. $\dfrac{-1 + \sqrt{5}}{2} = 0.618$ (3 s.f.); the other root is $-1.62$.`,
    hints: ["Try x = 3.", "Use the formula on the quadratic factor."],
  });

  // Structured (7 marks): x^3 + 3x^2 − 6x − 8 with root −4
  const f17 = [1, 3, -6, -8];
  chk(poly.eval(f17, -4), 0);
  same(poly.div(f17, [1, 4]), { q: [1, -1, -2], r: [0] });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`It is given that $f(x) = x^{3} + 3x^{2} - 6x - 8$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that $x = -4$ is a root of $f(x) = 0$.`,
        points: [t`M1 substitutes: $-64 + 48 + 24 - 8$`, t`A1 obtains $0$ and concludes`],
        modelAnswer: t`$$
f(-4) = (-4)^{3} + 3(-4)^{2} - 6(-4) - 8 = -64 + 48 + 24 - 8 = 0
$$

So $x = -4$ is a root (and $x + 4$ is a factor).`,
      }),
      P.expr({
        label: "(b)", marks: 2, stem: t`Find the quadratic factor of $f(x)$. Type it like x^2+px+q.`,
        accepted: ["x^2-x-2", "x²-x-2"],
        explanation: t`Dividing by $x + 4$: $x^{2}(x + 4) = x^{3} + 4x^{2}$ leaves $-x^{2} - 6x$; $-x(x + 4)$ leaves $-2x - 8$; $-2(x + 4)$ leaves 0. Quotient $x^{2} - x - 2$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: t`Hence solve $f(x) = 0$.`,
        template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order)",
        blanks: [{ id: "x1", input: "number", accepted: [-4], wrong: 4 }, { id: "x2", input: "number", accepted: [-1], wrong: 1 }, { id: "x3", input: "number", accepted: [2], wrong: -2 }],
        explanation: t`$x^{2} - x - 2 = (x - 2)(x + 1)$, so $x = -4$, $-1$ or $2$.`,
      }),
    ],
    explanation: t`$f(-4) = 0$ gives the factor $x + 4$; the quotient $x^{2} - x - 2 = (x - 2)(x + 1)$ gives the other roots.`,
    hints: ["For (b), divide by x + 4.", "Factorise the quadratic to finish."],
  });

  // Structured (9 marks): open box from 10 cm × 8 cm sheet, volume 48 cm³
  const V = poly.mul(poly.mul([1, 0], [-2, 10]), [-2, 8]);
  same(V, [4, -36, 80, 0]);
  const cubic = poly.sub(V, [48]).map((c) => c / 4);
  same(cubic, [1, -9, 20, -12]);
  same(poly.rationalRoots(cubic), [1, 2, 6]);
  chk(1 * 8 * 6, 48); chk(2 * 6 * 4, 48);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Chipo cuts a square of side $x$ cm from each corner of a rectangular metal sheet $10$ cm long and $8$ cm wide, and folds up the sides to make an open box. The volume of the box is $48$ cm³.`,
    parts: [
      P.proof({
        label: "(a)", marks: 3, stem: t`Show that $x^{3} - 9x^{2} + 20x - 12 = 0$.`,
        points: [
          t`B1 dimensions $(10 - 2x)$, $(8 - 2x)$ and $x$`,
          t`M1 expands $x(10 - 2x)(8 - 2x) = 4x^{3} - 36x^{2} + 80x$`,
          t`A1 sets equal to 48 and divides by 4 to reach the given equation`,
        ],
        modelAnswer: t`The base is $(10 - 2x)$ cm by $(8 - 2x)$ cm and the height is $x$ cm.

$$
V = x(10 - 2x)(8 - 2x) = x\left(80 - 36x + 4x^{2}\right) = 4x^{3} - 36x^{2} + 80x
$$

$$
4x^{3} - 36x^{2} + 80x = 48 \;\Rightarrow\; x^{3} - 9x^{2} + 20x - 12 = 0
$$`,
      }),
      P.expr({
        label: "(b)", marks: 3, stem: t`Factorise $x^{3} - 9x^{2} + 20x - 12$ completely. Type it like (x-a)(x-b)(x-c).`,
        accepted: perms3("(x-1)", "(x-2)", "(x-6)"),
        explanation: t`$f(1) = 1 - 9 + 20 - 12 = 0$, so $x - 1$ is a factor; the quotient is $x^{2} - 8x + 12 = (x - 2)(x - 6)$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Find the possible values of x for the box.",
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
        blanks: [{ id: "x1", input: "number", accepted: [1], wrong: 2 }, { id: "x2", input: "number", accepted: [2], wrong: 6 }],
        explanation: t`The roots are 1, 2 and 6, but the width $8 - 2x$ must be positive, so $x < 4$. Hence $x = 1$ or $x = 2$.`,
      }),
      P.manual({
        label: "(d)", marks: 1, stem: t`Explain why $x = 6$ is not a possible value.`,
        points: [t`With $x = 6$ the width $8 - 2x = -4$ cm (and the length $-2$ cm) would be negative, so no box can be made`],
        modelAnswer: "If x = 6, the width 8 − 2(6) = −4 cm is negative, which is impossible.",
      }),
    ],
    explanation: t`The volume $x(10 - 2x)(8 - 2x) = 48$ reduces to $(x - 1)(x - 2)(x - 6) = 0$. Only $0 < x < 4$ makes a real box, so $x = 1$ cm or $x = 2$ cm (volumes $1 \times 8 \times 6$ and $2 \times 6 \times 4$, both 48 cm³).`,
    hints: ["The base of the box is (10 − 2x) by (8 − 2x).", "Try x = 1 in the cubic."],
  });

  b.card("CONCEPT", "Solving a cubic equation: three steps", "1. Find a root a by trial (divisors of the constant term). 2. Divide by x − a to get a quadratic. 3. Solve the quadratic (factorise or formula).");
  b.card("FACT", "Which integers to try as roots", t`Divisors of the constant term (both signs). If the leading coefficient is $a \neq 1$, also try $\pm\frac{\text{divisor of } d}{\text{divisor of } a}$.`);
  b.card("FACT", "Quick test for the root x = 1", t`$f(1)$ is the sum of the coefficients; if they add to 0, $x - 1$ is a factor.`);
  b.card("CONCEPT", "Comparing coefficients", t`Write $f(x) \equiv (x - a)(px^{2} + qx + r)$; match the $x^{3}$ and constant terms first, then one middle term, and check with the other.`);
  b.card("FACT", "Number of real roots of a cubic", "At least one and at most three; a repeated factor gives a repeated root.");
  b.card("FACT", "Quadratic factor with negative discriminant", t`It gives no real roots, e.g. $(x + 2)(x^{2} + 3) = 0$ has only $x = -2$.`);
  b.card("DEFINITION", "Factorise completely", t`Write as a product of factors that cannot be factorised further, e.g. $(x - 1)(x - 3)(x + 2)$, not $(x - 1)(x^{2} - x - 6)$.`);
  b.card("CONCEPT", "Roots and factors", t`Root $x = a$ ⇔ factor $x - a$; root $x = \frac{b}{a}$ ⇔ factor $ax - b$.`);
});
