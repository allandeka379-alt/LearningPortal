// W1b: amath.graphs.cubic (Cambridge only)
import { concept, P, t, chk, same, poly, quad, root } from "../lib.mjs";

const prod = (...fs) => fs.reduce((a, f) => poly.mul(a, f), [1]);
/** Solution set of pred on [-30, 30] as maximal intervals (grid 1/1024). */
function solve(pred) {
  const out = [];
  let start = null;
  const N = 1024;
  for (let i = -30 * N; i <= 30 * N + 1; i++) {
    const x = i / N;
    const ok = i <= 30 * N && pred(x);
    if (ok && start === null) start = x;
    if (!ok && start !== null) { out.push([start, (i - 1) / N]); start = null; }
  }
  return out;
}
function expect(pred, intervals, label) {
  const got = solve(pred);
  const near = (a, b) => Math.abs(a - b) <= 2 / 1024;
  if (got.length !== intervals.length || !got.every(([a, b], i) => near(a, intervals[i][0]) && near(b, intervals[i][1]))) throw new Error(`${label}: got ${JSON.stringify(got)}`);
}
/** Number of real roots of the cubic c (sign changes on a fine grid plus exact zeros at turning points). */
function countRoots(c) {
  const f = (x) => poly.eval(c, x);
  const xs = [];
  for (let i = -4000; i < 4000; i++) {
    const a = i / 100, b2 = (i + 1) / 100;
    if (Math.abs(f(a)) < 1e-12) xs.push(a);
    else if (f(a) * f(b2) < 0) xs.push(root(f, a, b2));
  }
  return xs.length;
}
const INF = 30;

concept("amath.graphs.cubic", { file: "graphs/cubic", keyPrefix: "graphs.cubic" }, (b) => {
  const c1 = prod([1, -1], [1, 2], [1, -5]);
  chk(poly.eval(c1, 0), 10);
  b.mcq({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`Where does the curve $y = (x - 1)(x + 2)(x - 5)$ cross the $y$-axis?`,
    options: [
      [t`$(0, 10)$`, t`Correct: $(-1)(2)(-5) = 10$.`],
      [t`$(0, -10)$`, t`Two of the constants are negative, so their product is positive.`],
      [t`$(0, -6)$`, "This adds the constants instead of multiplying them."],
      [t`$(0, 5)$`, t`$5$ is one of the roots, not the $y$-intercept.`],
    ],
    answer: "A",
    explanation: t`Put $x = 0$: $y = (0 - 1)(0 + 2)(0 - 5) = (-1)(2)(-5) = 10$.`,
  });

  const c2 = prod([-1, -1], [1, -2], [1, -3]);
  chk(Math.sign(c2[0]), -1);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For the curve $y = -(x + 1)(x - 2)(x - 3)$, what happens to $y$ as $x$ becomes large and positive?`,
    options: [
      [t`$y \to -\infty$`, t`Correct: the leading coefficient is $-1$, so for large positive $x$ the curve heads downwards.`],
      [t`$y \to +\infty$`, t`That is true for $y = (x + 1)(x - 2)(x - 3)$, but the minus sign in front reverses it.`],
      [t`$y \to 0$`, "A cubic never levels off towards a horizontal line."],
      [t`$y \to 3$`, t`$3$ is a root of the cubic, not a limit of $y$.`],
    ],
    answer: "A",
    explanation: t`Expanding, the $x^3$ coefficient is $-1$. A negative cubic falls from the top left to the bottom right, so $y \to -\infty$ as $x \to +\infty$.`,
  });

  same(poly.rationalRoots(prod([2, -1], [1, 3], [1, -4])), [-3, 0.5, 4]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the $x$-intercepts of $y = (2x - 1)(x + 3)(x - 4)$, in ascending order.`,
    template: "x = {{blank:a}}, {{blank:b}}, {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [-3], wrong: "3" },
      { id: "b", input: "number", accepted: [0.5], wrong: "1" },
      { id: "c", input: "number", accepted: [4], wrong: "-4" },
    ],
    explanation: t`Set each factor to zero: $2x - 1 = 0$ gives $x = \frac{1}{2}$; $x + 3 = 0$ gives $x = -3$; $x - 4 = 0$ gives $x = 4$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The curve $y = (x - 3)^2(x + 1)$ touches the $x$-axis at $x = 3$ without crossing it.`,
    answer: true,
    explanation: t`True. $(x - 3)^2 \geq 0$, so near $x = 3$ the sign of $y$ is the sign of $x + 1$, which is positive: the curve comes down to $(3, 0)$ and goes back up. A repeated root is a touching point.`,
  });

  same(poly.rationalRoots(prod([1, 0], [1, -2], [1, 5])), [-5, 0, 2]);
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`How many times does the curve $y = x(x - 2)(x + 5)$ cross the $x$-axis?`,
    value: 3, wrong: [2],
    explanation: t`There are three different single roots, $x = -5$, $0$ and $2$, and the curve crosses the axis at each.`,
  });

  chk(poly.eval(prod([-1, -1], [1, -2], [1, -2]), 0), -4);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A cubic curve crosses the $x$-axis at $(-1, 0)$, touches it at $(2, 0)$, and crosses the $y$-axis at $(0, -4)$. Which could be its equation?`,
    options: [
      [t`$y = -(x + 1)(x - 2)^2$`, t`Correct: roots $-1$ and $2$ (repeated), and at $x = 0$, $y = -(1)(4) = -4$.`],
      [t`$y = (x + 1)(x - 2)^2$`, t`This has the right roots, but its $y$-intercept is $(1)(4) = +4$.`],
      [t`$y = (x - 1)(x + 2)^2$`, t`Its roots are $1$ and $-2$, the wrong way round; it touches at $x = -2$.`],
      [t`$y = (x + 1)^2(x - 2)$`, t`This touches the axis at $x = -1$ and crosses at $x = 2$, the opposite of the description.`],
    ],
    answer: "A",
    explanation: t`Crossing at $-1$ gives a single factor $(x + 1)$; touching at $2$ gives $(x - 2)^2$. $(x + 1)(x - 2)^2$ has $y$-intercept $4$, so multiply by $-1$ to get $-4$.`,
    hints: ["A touching point comes from a squared factor.", "Check the y-intercept of each option."],
  });

  expect((x) => poly.eval(prod([1, 1], [1, -2], [1, -5]), x) > 0, [[-1, 2], [5, INF]], "q7");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $(x + 1)(x - 2)(x - 5) > 0$.`,
    template: "{{blank:a}} < x < {{blank:b}} or x > {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [-1], wrong: "1" },
      { id: "b", input: "number", accepted: [2], wrong: "-2" },
      { id: "c", input: "number", accepted: [5], wrong: "-5" },
    ],
    explanation: t`The cubic has a positive leading coefficient and roots $-1$, $2$, $5$. Its sign is negative for $x < -1$, positive for $-1 < x < 2$, negative for $2 < x < 5$ and positive for $x > 5$. So $-1 < x < 2$ or $x > 5$.`,
    hints: ["Sketch the cubic from bottom left to top right through the three roots."],
  });

  expect((x) => x * (x - 4) * (x + 3) <= 0, [[-INF, -3], [0, 4]], "q8");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x(x - 4)(x + 3) \leq 0$.`,
    options: [
      [t`$x \leq -3$ or $0 \leq x \leq 4$`, "Correct: the curve is on or below the axis there."],
      [t`$-3 \leq x \leq 0$ or $x \geq 4$`, t`These are the regions where the cubic is $\geq 0$.`],
      [t`$-3 \leq x \leq 4$`, t`$x = -1$ gives $(-1)(-5)(2) = 10 > 0$, so not all of this interval works.`],
      [t`$x \leq -3$ or $x \geq 4$`, t`$x = 5$ gives $5(1)(8) = 40 > 0$, so $x \geq 4$ does not work.`],
    ],
    answer: "A",
    explanation: t`Roots $-3$, $0$, $4$; positive cubic. It is negative for $x < -3$ and for $0 < x < 4$, and zero at the roots, so $x \leq -3$ or $0 \leq x \leq 4$.`,
    hints: ["Test one value in each of the four regions."],
  });

  const pos9 = []; for (let x = 1; x <= 50; x++) if ((x + 2) * (x - 1) * (x - 4) < 0) pos9.push(x);
  same(pos9, [2, 3]);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`How many positive integers satisfy $(x + 2)(x - 1)(x - 4) < 0$?`,
    value: pos9.length, wrong: [3, 4],
    explanation: t`The cubic is negative for $x < -2$ and for $1 < x < 4$. The positive integers in these regions are 2 and 3 (1 and 4 make the product zero, which is not less than 0).`,
    hints: ["Find where the cubic is below the axis."],
  });

  expect((x) => (x - 3) ** 2 * (x + 2) > 0, [[-2, 3], [3, INF]], "q10");
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $(x - 3)^2(x + 2) > 0$.`,
    template: "{{blank:a}} < x < {{blank:b}} or x > {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [-2], wrong: "2" },
      { id: "b", input: "number", accepted: [3], wrong: "-3" },
      { id: "c", input: "number", accepted: [3], wrong: "-2" },
    ],
    explanation: t`$(x - 3)^2 > 0$ except at $x = 3$, where it is 0. So the product is positive when $x + 2 > 0$ and $x \neq 3$: $-2 < x < 3$ or $x > 3$.`,
    hints: [t`What is the sign of $(x - 3)^2$? When is it zero?`],
  });

  const c11 = prod([1, -1], [1, 1], [1, -3]);
  expect((x) => poly.eval(c11, x) < 0, [[-INF, -1], [1, 3]], "q11");
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`To sketch $y = |(x - 1)(x + 1)(x - 3)|$, which parts of $y = (x - 1)(x + 1)(x - 3)$ are reflected in the $x$-axis?`,
    options: [
      [t`$x < -1$ and $1 < x < 3$`, "Correct: these are where the cubic is negative."],
      [t`$-1 < x < 1$ and $x > 3$`, "These are where the cubic is positive; they stay as they are."],
      [t`$x < -1$ only`, t`The cubic is also negative between 1 and 3, e.g. $(1)(3)(-1) = -3$ at $x = 2$.`],
      [t`$-1 < x < 3$`, t`Between $-1$ and $1$ the cubic is positive, e.g. $3$ at $x = 0$.`],
    ],
    answer: "A",
    explanation: t`Positive cubic with roots $-1$, $1$, $3$: negative for $x < -1$ and $1 < x < 3$. Only those parts are reflected.`,
    hints: ["Find where the original cubic is below the axis."],
  });

  // |x(x - 2)(x + 2)| = 1: x^3 - 4x = ±1
  const n12 = countRoots([1, 0, -4, -1]) + countRoots([1, 0, -4, 1]);
  chk(n12, 6);
  const localMax = poly.eval([1, 0, -4, 0], -2 / Math.sqrt(3));
  chk(localMax, 16 / (3 * Math.sqrt(3)));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The curve $y = x(x - 2)(x + 2)$ has a maximum point at about $(-1.15, 3.08)$ and a minimum point at about $(1.15, -3.08)$. Using the graph of $y = |x(x - 2)(x + 2)|$, find the number of solutions of $|x(x - 2)(x + 2)| = 1$.`,
    value: n12, wrong: [3, 4],
    explanation: t`Reflecting the parts below the axis gives two humps of height about $3.08$ (between $-2$ and $0$, and between $0$ and $2$) and two outer branches. The line $y = 1$ is lower than both humps, so it crosses each hump twice and each outer branch once: $2 + 2 + 1 + 1 = 6$ solutions.`,
    hints: ["Both turning points become humps of height about 3.08 after reflection.", "Count the crossings with y = 1 on each piece."],
  });

  // f(x) = (x+1)(x-1)(x-3) >= 3 -> x(x^2 - 3x - 1) >= 0
  const c13 = prod([1, 1], [1, -1], [1, -3]);
  same(poly.sub(c13, [3]), [1, -3, -1, 0]);
  const r13 = quad.roots(1, -3, -1);
  expect((x) => poly.eval(c13, x) >= 3, [[r13[0], 0], [r13[1], INF]], "q13");
  b.fib({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: t`Given $f(x) = (x + 1)(x - 1)(x - 3)$, solve $f(x) \geq 3$. Give non-integer values correct to 2 decimal places.`,
    template: "{{blank:a}} ≤ x ≤ {{blank:b}} or x ≥ {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [Number(r13[0].toFixed(2))], tolerance: 0.005, wrong: "-1" },
      { id: "b", input: "number", accepted: [0], wrong: "1" },
      { id: "c", input: "number", accepted: [Number(r13[1].toFixed(2))], tolerance: 0.005, wrong: "3" },
    ],
    explanation: t`$f(0) = 3$, so $x = 0$ is one critical value. $f(x) = x^3 - 3x^2 - x + 3$, so $f(x) = 3$ gives $x(x^2 - 3x - 1) = 0$: $x = 0$ or $x = \frac{3 \pm \sqrt{13}}{2}$, i.e. $${r13[0].toFixed(2)}$ and $${r13[1].toFixed(2)}$. The curve is on or above $y = 3$ for $${r13[0].toFixed(2)} \leq x \leq 0$ and $x \geq ${r13[1].toFixed(2)}$.`,
    hints: [t`Find $f(0)$: it tells you one point where $y = 3$ meets the curve.`, t`Expand $f(x) - 3$ and factor out $x$.`],
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Match each cubic with its $y$-intercept.`,
    pairs: [
      [t`$y = (x + 1)(x + 2)(x + 3)$`, t`$(0, 6)$`],
      [t`$y = (x - 1)(x - 2)(x - 3)$`, t`$(0, -6)$`],
      [t`$y = x(x - 2)(x + 3)$`, t`$(0, 0)$`],
      [t`$y = (x - 2)^2(x + 3)$`, t`$(0, 12)$`],
    ],
    explanation: t`Multiply the constant terms of the factors: $1 \cdot 2 \cdot 3 = 6$; $(-1)(-2)(-3) = -6$; any factor $x$ gives 0; $(-2)^2 \cdot 3 = 12$.`,
  });
  chk(poly.eval(prod([1, -2], [1, -2], [1, 3]), 0), 12);

  const c15 = prod([1, 3], [1, -1], [-1, 2]);
  chk(poly.eval(c15, 0), -6); chk(Math.sign(c15[0]), -1);
  b.manualShort({
    d: 3, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Describe the sketch you would draw of $y = (x + 3)(x - 1)(2 - x)$.`,
    points: [
      t`Negative leading coefficient: the curve comes from the top left and goes to the bottom right.`,
      t`Crosses the $x$-axis at $(-3, 0)$, $(1, 0)$ and $(2, 0)$.`,
      t`Crosses the $y$-axis at $(0, -6)$.`,
      t`Turning points: a minimum between $-3$ and $1$ (below the axis) and a maximum between $1$ and $2$ (above the axis).`,
    ],
    modelAnswer: t`The $x^3$ coefficient is $1 \times 1 \times (-1) = -1$, so the curve falls from the top left. It crosses the axis at $-3$, dips to a minimum below the axis, passing through $(0, -6)$, rises through $(1, 0)$ to a small maximum, then falls through $(2, 0)$ and continues down to the bottom right.`,
    explanation: t`The factor $(2 - x)$ contributes $-x$, making the leading coefficient negative. The $y$-intercept is $(3)(-1)(2) = -6$.`,
    hints: [t`Multiply the $x$ terms of the three factors to find the sign of the $x^3$ coefficient.`],
  });

  // Struct 1: f(x) = (x + 2)(x - 1)(x - 4)
  const s1 = prod([1, 2], [1, -1], [1, -4]);
  chk(poly.eval(s1, 0), 8);
  expect((x) => poly.eval(s1, x) < 0, [[-INF, -2], [1, 4]], "s1");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The function $f$ is given by $f(x) = (x + 2)(x - 1)(x - 4)$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`Find the $y$-intercept of $y = f(x)$.`, value: 8, wrong: [-8], explanation: t`$f(0) = (2)(-1)(-4) = 8$.` }),
      P.manual({ label: "(b)", marks: 3, stem: t`Describe the sketch of $y = f(x)$.`,
        points: [t`Positive cubic shape: from the bottom left to the top right.`, t`Crosses the $x$-axis at $(-2, 0)$, $(1, 0)$ and $(4, 0)$.`, t`Crosses the $y$-axis at $(0, 8)$, with a maximum between $-2$ and $1$ and a minimum between $1$ and $4$.`],
        modelAnswer: t`A curve rising from the bottom left through $(-2, 0)$ and $(0, 8)$ to a maximum, falling through $(1, 0)$ to a minimum below the axis, then rising through $(4, 0)$ to the top right.`,
        explanation: "Intercepts from the factors; shape from the positive leading coefficient." }),
      P.fib({ label: "(c)", marks: 2, stem: t`Solve $f(x) < 0$.`, template: "x < {{blank:a}} or {{blank:b}} < x < {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: [-2], wrong: "2" }, { id: "b", input: "number", accepted: [1], wrong: "-1" }, { id: "c", input: "number", accepted: [4], wrong: "-4" }],
        explanation: t`Below the axis: $x < -2$ or $1 < x < 4$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`State the number of cusps on the graph of $y = |f(x)|$.`, value: 3, wrong: [2],
        explanation: t`Each of the three single roots becomes a cusp when the negative parts are reflected.` }),
    ],
    explanation: "Read every answer from the factors and a sketch: roots, y-intercept, sign of the leading coefficient.",
    hints: ["Multiply the constants for the y-intercept.", "The sign alternates at each single root."],
  });

  // Struct 2: f(x) = x(x - 3)^2; f(x) - 4 = (x - 4)(x - 1)^2
  const s2 = prod([1, 0], [1, -3], [1, -3]);
  same(poly.sub(s2, [4]), prod([1, -4], [1, -1], [1, -1]));
  expect((x) => poly.eval(s2, x) <= 4, [[-INF, 4]], "s2");
  const n2 = countRoots(poly.sub(s2, [4])) + countRoots(poly.add(s2, [4]));
  chk(n2, 3);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The curve $C$ has equation $y = x(x - 3)^2$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find the $x$-coordinates of the points where $C$ meets the $x$-axis, in ascending order.`, template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [0], wrong: "-3" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
        explanation: t`$x = 0$ or $(x - 3)^2 = 0$, so $x = 0$ and $x = 3$.` }),
      P.mcq({ label: "(b)", marks: 1, stem: t`What happens to $C$ at $x = 3$?`,
        options: [
          ["It touches the x-axis (a minimum point) and turns back up.", t`Correct: $(x - 3)^2$ is a repeated factor.`],
          ["It crosses the x-axis there, going from above it to below it.", "A repeated root is a touching point, not a crossing."],
          ["It crosses the x-axis there, going from below it to above it.", t`For $x$ just below and just above 3, $y > 0$: the curve does not cross.`],
          ["It has a vertical asymptote there, because the factor is squared.", "Polynomials have no asymptotes."],
        ],
        answer: "A", explanation: t`Near $x = 3$, $x > 0$ and $(x - 3)^2 \geq 0$, so $y \geq 0$: the curve touches the axis at a minimum point.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that $x(x - 3)^2 - 4 = (x - 4)(x - 1)^2$.`,
        points: [t`M1 expands both sides: $x^3 - 6x^2 + 9x - 4$.`, t`A1 shows both expansions are identical.`],
        modelAnswer: t`$$
x(x - 3)^2 - 4 = x(x^2 - 6x + 9) - 4 = x^3 - 6x^2 + 9x - 4
$$

$$
(x - 4)(x - 1)^2 = (x - 4)(x^2 - 2x + 1) = x^3 - 2x^2 + x - 4x^2 + 8x - 4 = x^3 - 6x^2 + 9x - 4
$$

The two sides are equal.`,
        explanation: "Expand both sides fully and compare." }),
      P.num({ label: "(d)", marks: 2, stem: t`Hence solve $x(x - 3)^2 \leq 4$. The solution has the form $x \leq a$; find $a$.`, value: 4, prefix: "a =", wrong: [1],
        explanation: t`$(x - 4)(x - 1)^2 \leq 0$. Since $(x - 1)^2 \geq 0$, this holds when $x - 4 \leq 0$ (and also at $x = 1$, which is already included). So $x \leq 4$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`$C$ has a maximum point at $(1, 4)$. Find the number of solutions of $|x(x - 3)^2| = 4$.`, value: n2, wrong: [2, 4],
        explanation: t`$x(x - 3)^2 = 4$ gives $(x - 4)(x - 1)^2 = 0$: $x = 1$ and $x = 4$. $x(x - 3)^2 = -4$ has one solution, for $x < 0$, because the curve is only below the axis for $x < 0$. Total: 3 solutions.` }),
    ],
    explanation: t`The repeated factor makes $C$ touch the axis at $(3, 0)$; the identity in (c) shows the line $y = 4$ touches $C$ at its maximum $(1, 4)$ and crosses it at $x = 4$.`,
    hints: [t`$(x - 3)^2$ is never negative.`, t`For (e), solve $y = 4$ and $y = -4$ separately using the sketch.`],
  });

  // Cards
  b.card("CONCEPT", t`$y$-intercept of $y = (x - p)(x - q)(x - r)$`, t`$(0, -pqr)$: multiply the constants, signs included.`);
  b.card("FACT", "Shape of a cubic with positive leading coefficient", "From the bottom left to the top right.");
  b.card("FACT", "Shape of a cubic with negative leading coefficient", "From the top left to the bottom right.");
  b.card("CONCEPT", t`Repeated factor $(x - a)^2$ in a cubic`, t`The curve touches the $x$-axis at $x = a$ (a turning point) instead of crossing.`);
  b.card("CONCEPT", "Sign pattern of a cubic with three single roots", "The sign alternates each time the curve crosses a root.");
  b.card("CONCEPT", t`Solving $f(x) > 0$ for a factorised cubic`, "Sketch it and read off where the curve is above the x-axis (usually two intervals).");
  b.card("CONCEPT", t`Solving $f(x) > d$ ($d \neq 0$)`, t`Find the critical values from $f(x) = d$, then read where the curve is above $y = d$.`);
  b.card("FACT", t`Cusps of $y = |f(x)|$ for a cubic with three single roots`, "Three cusps, one at each root.");
  b.card("FACT", t`Leading coefficient of $(x + 3)(x - 1)(2 - x)$`, t`$-1$, because $(2 - x)$ contributes $-x$.`);
});
