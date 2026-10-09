// W1b exam-format items: ZIMSEC Paper 1 (Section A 13 marks, Section B 12 marks) and Cambridge 0606 Paper 1 (8 marks,
// no calculator) and Paper 2 (10 marks). Every value is computed and checked below.
import { concept, P, t, chk, same, quad, poly, root, solveTrig, money, ZIM, CAM } from "../lib.mjs";

const Q = (k) => `amath.${k}`;
const agree = (f, g, label) => [-2.5, -1, 0.3, 2.7, 3.5, 7].forEach((x) => chk(f(x), g(x), 1e-9, `${label} at ${x}`));
/** Distinct real roots of a polynomial (coefficients, highest power first) found on a grid. */
function realRoots(c) {
  const f = (x) => poly.eval(c, x);
  const out = [];
  for (let i = -4000; i < 4000; i++) {
    const a = i / 100, b2 = (i + 1) / 100;
    if (Math.abs(f(a)) < 1e-12) out.push(a);
    else if (f(a) * f(b2) < 0) out.push(root(f, a, b2));
  }
  return out;
}
const fixed = (x, n) => Number(x.toFixed(n));

// ---------------------------------------------------------------------------------------------------------------------
concept(Q("quadratics.completing-square"), { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  // Z1 (13): f(x) = 2x^2 + 8x - 1 = 2(x + 2)^2 - 9
  const cs = quad.completeSquare(2, 8, -1);
  chk(cs.p, 2); chk(cs.q, -9);
  const r = quad.roots(2, 8, -1);
  chk(r[0], -2 - Math.sqrt(4.5)); chk(r[1], -2 + Math.sqrt(4.5));
  const f1 = (x) => 2 * x * x + 8 * x - 1;
  chk(f1(-3), -7); chk(f1(1), 9); chk(f1(-4), f1(0));
  b.struct({
    d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("quadratics.completing-square"), Q("quadratics.solving"), Q("functions.domain-range")],
    stem: t`The function $f$ is defined by $f(x) = 2x^2 + 8x - 1$.`,
    parts: [
      P.group({ label: "(a)", stem: "By completing the square:", parts: [
        P.fib({ label: "(i)", marks: 3, stem: t`Express $f(x)$ in the form $a(x + b)^2 + c$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
          blanks: [{ id: "a", input: "number", accepted: [2], wrong: "2" }, { id: "b", input: "number", accepted: [2], wrong: "4" }, { id: "c", input: "number", accepted: [-9], wrong: "-5" }],
          explanation: t`$2(x^2 + 4x) - 1 = 2\left[(x + 2)^2 - 4\right] - 1 = 2(x + 2)^2 - 9$.` }),
        P.fib({ label: "(ii)", marks: 2, stem: t`Hence state the minimum value of $f(x)$ and the value of $x$ at which it occurs.`, template: "minimum value = {{blank:m}} when x = {{blank:x}}",
          blanks: [{ id: "m", input: "number", accepted: [-9], wrong: "-1" }, { id: "x", input: "number", accepted: [-2], wrong: "2" }],
          explanation: t`$2(x + 2)^2 \geq 0$, so $f(x) \geq -9$, with equality at $x = -2$.` }),
      ] }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence solve $f(x) = 0$, giving your answers correct to 3 significant figures, in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [
          { id: "a", input: "number", accepted: [fixed(r[0], 2)], tolerance: 0.005, marks: 2, wrong: "-4.21" },
          { id: "b", input: "number", accepted: [fixed(r[1], 3)], tolerance: 0.0005, marks: 2, wrong: "0.212" },
        ],
        explanation: t`$2(x + 2)^2 = 9$, so $(x + 2)^2 = 4.5$ and $x = -2 \pm \sqrt{4.5}$: $x = ${fixed(r[0], 2)}$ or $x = ${fixed(r[1], 3)}$.` }),
      P.group({ label: "(c)", stem: t`The domain of $f$ is now restricted to $-3 \leq x \leq 1$.`, parts: [
        P.fib({ label: "(i)", marks: 2, stem: t`Find the range of $f$.`, template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
          blanks: [{ id: "lo", input: "number", accepted: [-9], wrong: "-7" }, { id: "hi", input: "number", accepted: [9], wrong: "9" }],
          explanation: t`The vertex $x = -2$ is inside the domain, so the least value is $-9$; $f(-3) = -7$ and $f(1) = 9$, so the greatest is $9$.` }),
        P.manual({ label: "(ii)", marks: 2, stem: t`Explain why $f$ is not a one-to-one mapping on this domain.`,
          points: [t`Gives two inputs in the domain with equal outputs, e.g. $f(-3) = f(-1) = -7$.`, "States that a one-to-one mapping needs distinct images for distinct inputs (the domain contains points on both sides of x = −2)."],
          modelAnswer: t`$f(-3) = 18 - 24 - 1 = -7$ and $f(-1) = 2 - 8 - 1 = -7$. Two different inputs have the same image, so $f$ is two-to-one on this domain, not one-to-one.`,
          explanation: "The domain contains points on both sides of the line of symmetry x = −2." }),
      ] }),
    ],
    explanation: t`Completing the square gives the vertex $(-2, -9)$, which answers (a), solves (b) by square roots, and decides the range in (c).`,
    hints: [t`Take 2 out of $2x^2 + 8x$ first.`, t`For (b), $(x + 2)^2 = \frac{9}{2}$.`, "For (c), check whether the vertex lies in the domain."],
  });
  chk(f1(-1), -7);

  // Z2 (13): f(x) = 2x + 3, g(x) = 6/(x - 2)
  const f = (x) => 2 * x + 3;
  const g = (x) => 6 / (x - 2);
  agree((x) => f(g(x)), (x) => (3 * x + 6) / (x - 2), "fg");
  agree((x) => g(f(x)), (x) => 6 / (2 * x + 1), "gf");
  agree((x) => (f(x) - 3) / 2, (x) => x, "finv");
  agree((x) => g((2 * x + 6) / x), (x) => x, "ginv");
  chk(f(g(4)), 9);
  b.struct({
    d: 4, marks: 13, secs: 90 * 13, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("functions.composite"), Q("functions.inverse"), Q("functions.domain-range")],
    stem: t`The functions $f$ and $g$ are defined by $f(x) = 2x + 3$ for $x \in \mathbb{R}$, and $g(x) = \dfrac{6}{x - 2}$ for $x \neq 2$.`,
    parts: [
      P.group({ label: "(a)", stem: "Find, in its simplest form,", parts: [
        P.expr({ label: "(i)", marks: 2, stem: t`$fg(x)$, as a single fraction. Type it with /, e.g. (4x+1)/(x-5).`, accepted: ["(3x+6)/(x-2)", "(6+3x)/(x-2)", "3(x+2)/(x-2)", "12/(x-2)+3", "3+12/(x-2)"], wrong: ["6/(2x+1)"],
          explanation: t`$fg(x) = 2\left(\frac{6}{x - 2}\right) + 3 = \frac{12 + 3(x - 2)}{x - 2} = \frac{3x + 6}{x - 2}$.` }),
        P.expr({ label: "(ii)", marks: 2, stem: t`$gf(x)$. Type it with /, e.g. 5/(3x-1).`, accepted: ["6/(2x+1)", "6/(1+2x)"], wrong: ["(3x+6)/(x-2)", "6/(2x+3)"],
          explanation: t`$gf(x) = \frac{6}{(2x + 3) - 2} = \frac{6}{2x + 1}$.` }),
      ] }),
      P.group({ label: "(b)", stem: "Find", parts: [
        P.expr({ label: "(i)", marks: 2, stem: t`$f^{-1}(x)$. Type it with /, e.g. (x+1)/4.`, accepted: ["(x-3)/2", "x/2-3/2", "0.5x-1.5", "0.5(x-3)", "(1/2)(x-3)", "1/2(x-3)"], wrong: ["(x+3)/2", "1/(2x+3)"],
          explanation: t`$y = 2x + 3$ gives $x = \frac{y - 3}{2}$, so $f^{-1}(x) = \frac{x - 3}{2}$.` }),
        P.expr({ label: "(ii)", marks: 2, stem: t`$g^{-1}(x)$. Type it with /, e.g. (3x+1)/x.`, accepted: ["(2x+6)/x", "(6+2x)/x", "2+6/x", "6/x+2", "2(x+3)/x"], wrong: ["(x-2)/6", "6/(x+2)"],
          explanation: t`$y = \frac{6}{x - 2}$ gives $x - 2 = \frac{6}{y}$, so $x = 2 + \frac{6}{y}$ and $g^{-1}(x) = \frac{2x + 6}{x}$.` }),
      ] }),
      P.num({ label: "(c)", marks: 2, stem: t`Solve $fg(x) = 9$.`, value: 4, prefix: "x =", wrong: [3],
        explanation: t`$\frac{12}{x - 2} + 3 = 9$ gives $\frac{12}{x - 2} = 6$, so $x - 2 = 2$ and $x = 4$.` }),
      P.group({ label: "(d)", stem: t`The function $g^{-1}$ is not defined for one real value of $x$.`, parts: [
        P.num({ label: "(i)", marks: 1, stem: "State this value.", value: 0, prefix: "x =", wrong: [2], explanation: t`$g^{-1}(x) = \frac{2x + 6}{x}$ needs $x \neq 0$.` }),
        P.manual({ label: "(ii)", marks: 2, stem: t`Explain, with reference to $g$, why this value is excluded.`,
          points: [t`States that the domain of $g^{-1}$ is the range of $g$.`, t`States that $\frac{6}{x - 2}$ can never equal 0 (the numerator is never zero), so 0 is not in the range of $g$.`],
          modelAnswer: t`The inputs of $g^{-1}$ are the outputs of $g$. Since $\frac{6}{x - 2} \neq 0$ for every $x$, the value 0 is never an output of $g$, so $g^{-1}(0)$ is undefined.`,
          explanation: "Domain of the inverse = range of the function." }),
      ] }),
    ],
    explanation: "Substitute the inner function in brackets for composites; rearrange y = f(x) for inverses; the domain of an inverse is the range of the original function.",
    hints: [t`$fg(x) = f\left(\frac{6}{x - 2}\right)$.`, t`For $g^{-1}$, make $x$ the subject of $y = \frac{6}{x - 2}$.`],
  });

  // Z3 (12): y = x^2 - 2x + 5 and y = mx + 1 -> x^2 - (2 + m)x + 4 = 0
  for (const m of [-6, 2]) chk(quad.disc(1, -(2 + m), 4), 0);
  same(quad.roots(1, -4, 4), [2]);
  chk(2 * 2 + 1, 5); chk(4 - 4 + 5, 5);
  const r6 = quad.roots(1, -8, 4);
  chk(r6[0], 4 - 2 * Math.sqrt(3)); chk(r6[1], 4 + 2 * Math.sqrt(3));
  chk(Math.sign(quad.disc(1, -(2 - 3), 4)), -1);
  b.struct({
    d: 5, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("quadratics.discriminant"), Q("quadratics.inequalities"), Q("quadratics.solving")],
    stem: t`A curve has equation $y = x^2 - 2x + 5$ and a line has equation $y = mx + 1$, where $m$ is a constant.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the $x$-coordinates of the points where the line meets the curve satisfy $x^2 - (2 + m)x + 4 = 0$.`,
        points: [t`M1 equates $x^2 - 2x + 5 = mx + 1$.`, t`A1 rearranges to $x^2 - (2 + m)x + 4 = 0$.`],
        modelAnswer: t`$$
x^2 - 2x + 5 = mx + 1
$$

$$
x^2 - 2x - mx + 4 = 0
$$

$$
x^2 - (2 + m)x + 4 = 0
$$`,
        explanation: "At a common point both equations give the same y." }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the values of $m$ for which the line is a tangent to the curve, in ascending order.`, template: "m = {{blank:a}} or m = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-6], wrong: "-2" }, { id: "b", input: "number", accepted: [2], wrong: "6" }],
        explanation: t`Equal roots: $(2 + m)^2 - 16 = 0$, so $2 + m = \pm 4$ and $m = 2$ or $m = -6$.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`For the positive value of $m$, find the coordinates of the point of contact.`, template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: "-2" }, { id: "y", input: "number", accepted: [5], wrong: "3" }],
        explanation: t`$m = 2$: $x^2 - 4x + 4 = (x - 2)^2 = 0$, so $x = 2$ and $y = 2(2) + 1 = 5$.` }),
      P.fib({ label: "(d)", marks: 2, stem: t`Hence find the set of values of $m$ for which the line meets the curve at two distinct points.`, template: "m < {{blank:a}} or m > {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-6], wrong: "2" }, { id: "b", input: "number", accepted: [2], wrong: "-6" }],
        explanation: t`$(2 + m)^2 > 16$: $2 + m < -4$ or $2 + m > 4$, so $m < -6$ or $m > 2$.` }),
      P.mcq({ label: "(e)", marks: 1, stem: t`State the number of points where the line $y = -3x + 1$ meets the curve.`,
        options: [["0", t`Correct: $m = -3$ lies between $-6$ and $2$, so the discriminant is negative.`], ["1", "One point needs m = −6 or m = 2."], ["2", "Two points need m < −6 or m > 2."], ["3", "A line meets a parabola at most twice."]],
        answer: "A", explanation: t`With $m = -3$: $x^2 + x + 4 = 0$ has discriminant $1 - 16 < 0$, so there are no points of intersection.` }),
      P.fib({ label: "(f)", marks: 3, stem: t`For $m = 6$, find the exact $x$-coordinates of the points of intersection in the form $p \pm q\sqrt{3}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [{ id: "p", input: "number", accepted: [4], marks: 1, wrong: "8" }, { id: "q", input: "number", accepted: [2], marks: 2, wrong: "4" }],
        explanation: t`$x^2 - 8x + 4 = 0$: $x = \frac{8 \pm \sqrt{64 - 16}}{2} = \frac{8 \pm \sqrt{48}}{2} = \frac{8 \pm 4\sqrt{3}}{2} = 4 \pm 2\sqrt{3}$.` }),
    ],
    explanation: "One quadratic, formed by equating line and curve, answers every part through its discriminant: zero for a tangent, positive for two points, negative for none.",
    hints: [t`The combined quadratic has $b = -(2 + m)$ and $c = 4$.`, t`$\sqrt{48} = 4\sqrt{3}$.`],
  });

  // Z4 (12): f(x) = 5 + 4x - x^2 = 9 - (x - 2)^2
  const c4 = quad.completeSquare(-1, 4, 5);
  chk(c4.p, -2); chk(c4.q, 9);
  same(quad.roots(-1, 4, 5), [-1, 5]);
  same(quad.roots(1, -4, -12), [-2, 6]);
  agree((x) => 2 + Math.sqrt(9 - (5 + 4 * x - x * x)), (x) => 2 + Math.abs(x - 2), "inv4");
  b.struct({
    d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("quadratics.completing-square"), Q("quadratics.inequalities"), Q("quadratics.discriminant"), Q("functions.inverse")],
    stem: t`The function $f$ is defined by $f(x) = 5 + 4x - x^2$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Express $f(x)$ in the form $a - (x - b)^2$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [9], wrong: "1" }, { id: "b", input: "number", accepted: [2], wrong: "-2" }],
        explanation: t`$-(x^2 - 4x) + 5 = -\left[(x - 2)^2 - 4\right] + 5 = 9 - (x - 2)^2$.` }),
      P.manual({ label: "(b)", marks: 3, stem: t`Describe the sketch of $y = f(x)$, stating the coordinates of the turning point and of the points where the curve meets the axes.`,
        points: [t`An upside-down parabola with maximum point $(2, 9)$.`, t`Meets the $x$-axis at $(-1, 0)$ and $(5, 0)$.`, t`Meets the $y$-axis at $(0, 5)$.`],
        modelAnswer: t`A ∩-shaped curve with its maximum at $(2, 9)$, symmetrical about $x = 2$, crossing the $x$-axis at $(-1, 0)$ and $(5, 0)$ (since $5 + 4x - x^2 = -(x - 5)(x + 1)$) and the $y$-axis at $(0, 5)$.`,
        explanation: "Use the completed square for the vertex and factorise for the roots." }),
      P.fib({ label: "(c)", marks: 2, stem: t`Hence solve $5 + 4x - x^2 > 0$.`, template: "{{blank:a}} < x < {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: "-5" }, { id: "b", input: "number", accepted: [5], wrong: "1" }],
        explanation: t`The curve is above the $x$-axis between its roots: $-1 < x < 5$.` }),
      P.fib({ label: "(d)", marks: 2, stem: t`Solve $5 + 4x - x^2 \geq -7$.`, template: "{{blank:a}} ≤ x ≤ {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-2], wrong: "-6" }, { id: "b", input: "number", accepted: [6], wrong: "2" }],
        explanation: t`$x^2 - 4x - 12 \leq 0$, so $(x - 6)(x + 2) \leq 0$ and $-2 \leq x \leq 6$.` }),
      P.num({ label: "(e)", marks: 1, stem: t`The equation $f(x) = k$ has two distinct real roots. State the set of values of $k$ in the form $k < c$; find $c$.`, value: 9, prefix: "c =", wrong: [5],
        explanation: t`The horizontal line $y = k$ meets the curve twice when it is below the maximum value 9: $k < 9$.` }),
      P.expr({ label: "(f)", marks: 2, stem: t`The domain of $f$ is restricted to $x \geq 2$. Find $f^{-1}(x)$. Type sqrt(...) or √(...), e.g. 3+sqrt(4-x).`,
        accepted: ["2+sqrt(9-x)", "2+√(9-x)", "sqrt(9-x)+2", "√(9-x)+2", "2+sqrt(-x+9)"], wrong: ["2-sqrt(9-x)", "sqrt(x-9)+2"],
        explanation: t`$y = 9 - (x - 2)^2$ gives $(x - 2)^2 = 9 - y$; with $x \geq 2$, $x - 2 = \sqrt{9 - y}$. So $f^{-1}(x) = 2 + \sqrt{9 - x}$, for $x \leq 9$.` }),
    ],
    explanation: t`The completed square $9 - (x - 2)^2$ gives the maximum, the line of symmetry, the inequality regions and the inverse on $x \geq 2$.`,
    hints: [t`Write $5 + 4x - x^2 = -(x^2 - 4x) + 5$.`, "The curve is ∩-shaped: positive between its roots.", "For the inverse, use the positive square root because x ≥ 2."],
  });

  // Z5 (12): f(x) = x^2 - 6x + 11 = (x - 3)^2 + 2, x >= 3; g(x) = 2x - 1
  const f5 = (x) => x * x - 6 * x + 11;
  agree((x) => f5(3 + Math.sqrt(Math.abs(x) + 0.5 - 2 + 2)) , (x) => Math.abs(x) + 0.5 + 2, "f5 inverse");
  agree((x) => 2 * f5(x) - 1, (x) => 2 * x * x - 12 * x + 21, "gf5");
  chk(2 * f5(3 + Math.sqrt(7)) - 1, 17); chk(2 * f5(3 - Math.sqrt(7)) - 1, 17);
  b.struct({
    d: 4, marks: 12, secs: 90 * 12, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("functions.inverse"), Q("quadratics.completing-square"), Q("functions.composite"), Q("functions.domain-range")],
    stem: t`The functions $f$ and $g$ are defined by $f(x) = x^2 - 6x + 11$ for $x \geq 3$, and $g(x) = 2x - 1$ for $x \in \mathbb{R}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Express $f(x)$ in the form $(x - a)^2 + b$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [3], wrong: "-3" }, { id: "b", input: "number", accepted: [2], wrong: "20" }],
        explanation: t`$x^2 - 6x + 11 = (x - 3)^2 - 9 + 11 = (x - 3)^2 + 2$.` }),
      P.num({ label: "(b)", marks: 1, stem: t`The range of $f$ is $f(x) \geq m$. Find $m$.`, value: 2, prefix: "m =", wrong: [11, 3], explanation: t`The least value, at $x = 3$, is 2.` }),
      P.expr({ label: "(c)", marks: 3, stem: t`Find $f^{-1}(x)$. Type sqrt(...) or √(...), e.g. 4+sqrt(x-1).`,
        accepted: ["3+sqrt(x-2)", "3+√(x-2)", "sqrt(x-2)+3", "√(x-2)+3", "3+sqrt(-2+x)"], wrong: ["3-sqrt(x-2)", "sqrt(x+2)-3"],
        explanation: t`$y = (x - 3)^2 + 2$ gives $(x - 3)^2 = y - 2$; since $x \geq 3$, $x - 3 = \sqrt{y - 2}$. So $f^{-1}(x) = 3 + \sqrt{x - 2}$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`The domain of $f^{-1}$ is $x \geq k$. Find $k$.`, value: 2, prefix: "k =", wrong: [3], explanation: t`Domain of $f^{-1}$ = range of $f$: $x \geq 2$.` }),
      P.expr({ label: "(e)", marks: 2, stem: t`Find $gf(x)$ in the form $ax^2 + bx + c$. Type it, e.g. 3x^2-4x+5.`, accepted: ["2x^2-12x+21", "21-12x+2x^2"], wrong: ["4x^2-16x+18"],
        explanation: t`$gf(x) = 2(x^2 - 6x + 11) - 1 = 2x^2 - 12x + 21$.` }),
      P.group({ label: "(f)", stem: t`Solve $gf(x) = 17$.`, parts: [
        P.fib({ label: "(i)", marks: 2, stem: t`Give the solution in the form $x = p + \sqrt{q}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [3], wrong: "-3" }, { id: "q", input: "number", accepted: [7], wrong: "9" }],
          explanation: t`$2(x - 3)^2 + 3 = 17$, so $(x - 3)^2 = 7$ and $x = 3 \pm \sqrt{7}$; only $3 + \sqrt{7}$ is in the domain.` }),
        P.manual({ label: "(ii)", marks: 1, stem: t`Explain why $x = 3 - \sqrt{7}$ is not a solution.`,
          points: [t`States that $3 - \sqrt{7} < 3$, so it is outside the domain $x \geq 3$ of $f$ (and so of $gf$).`],
          modelAnswer: t`$3 - \sqrt{7} \approx 0.35$, which is less than 3, so it is not in the domain of $f$.`, explanation: "gf only accepts inputs in the domain of f." }),
      ] }),
    ],
    explanation: t`The completed square gives the range and the inverse; the composite $gf$ is solved most easily as $2(x - 3)^2 + 3 = 17$.`,
    hints: [t`$gf(x) = 2f(x) - 1 = 2(x - 3)^2 + 3$.`, "The domain x ≥ 3 decides which square root to keep."],
  });
});

// ---------------------------------------------------------------------------------------------------------------------
concept(Q("modulus.equations"), { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  // C1 (8, Paper 1): |3x - 4| = |x + 2| -> 0.5, 3 ; > -> x < 0.5 or x > 3 ; |3x - 4| = x -> 1, 2 ; |3x - 4| = 2x - 6 -> none
  for (const x of [0.5, 3]) chk(Math.abs(3 * x - 4), Math.abs(x + 2));
  for (const x of [1, 2]) chk(Math.abs(3 * x - 4), x);
  for (const x of [-2, 2]) if (Math.abs(Math.abs(3 * x - 4) - (2 * x - 6)) < 1e-9) throw new Error("C1 d");
  for (const [x, ok] of [[0, true], [1, false], [4, true]]) chk(Math.abs(3 * x - 4) > Math.abs(x + 2) ? 1 : 0, ok ? 1 : 0);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("modulus.equations"), Q("modulus.inequalities")],
    stem: t`Answer this question without a calculator.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Solve $|3x - 4| = |x + 2|$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [0.5], wrong: "-0.5" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
        explanation: t`$3x - 4 = x + 2$ gives $x = 3$; $3x - 4 = -(x + 2)$ gives $4x = 2$, $x = \frac{1}{2}$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Hence solve $|3x - 4| > |x + 2|$.`, template: "x < {{blank:a}} or x > {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [0.5], wrong: "3" }, { id: "b", input: "number", accepted: [3], wrong: "0.5" }],
        explanation: t`Squaring: $8x^2 - 28x + 12 > 0$, i.e. $2x^2 - 7x + 3 > 0$, $(2x - 1)(x - 3) > 0$: outside the critical values. Test $x = 1$: $1 > 3$ is false, confirming.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Solve $|3x - 4| = x$, giving the solutions in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-1" }, { id: "b", input: "number", accepted: [2], wrong: "-2" }],
        explanation: t`$3x - 4 = x$ gives $x = 2$; $-(3x - 4) = x$ gives $x = 1$. Both make the right-hand side positive.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the number of solutions of $|3x - 4| = 2x - 6$.`, value: 0, wrong: [2, 1],
        explanation: t`Case 1 gives $x = -2$, where $2x - 6 = -10 < 0$; case 2 gives $x = 2$, where $2x - 6 = -2 < 0$. Both are rejected, so there are no solutions.` }),
    ],
    explanation: "Use cases (or squaring when both sides are moduli), and always check that a right-hand side equal to a modulus is non-negative.",
    hints: ["Both sides of (a) are moduli: use ± or square.", "In (d), check the sign of 2x − 6 for each candidate."],
  });

  // C2 (8, Paper 1): f(x) = (x + 1)(x - 2)(x - 4)
  const c2 = poly.mul(poly.mul([1, 1], [1, -2]), [1, -4]);
  same(c2, [1, -5, 2, 8]);
  const tp = quad.roots(3, -10, 2);
  chk(fixed(tp[0], 2), 0.21); chk(fixed(poly.eval(c2, tp[0]), 2), 8.21);
  chk(fixed(tp[1], 2), 3.12); chk(fixed(poly.eval(c2, tp[1]), 2), -4.06);
  const n5 = realRoots(poly.sub(c2, [5])).length + realRoots(poly.add(c2, [5])).length;
  chk(n5, 4);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("graphs.cubic"), Q("graphs.modulus-functions")],
    stem: t`The function $f$ is defined by $f(x) = (x + 1)(x - 2)(x - 4)$. The curve $y = f(x)$ has turning points at approximately $(0.21, 8.21)$ and $(3.12, -4.06)$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`Find the $y$-intercept of $y = f(x)$.`, value: 8, wrong: [-8], explanation: t`$f(0) = (1)(-2)(-4) = 8$.` }),
      P.manual({ label: "(b)", marks: 3, stem: t`Describe the sketch of $y = |f(x)|$.`,
        points: [t`Cusps on the $x$-axis at $(-1, 0)$, $(2, 0)$ and $(4, 0)$.`, t`The parts for $x < -1$ and $2 < x < 4$ are reflected, so the graph is never below the axis; between 2 and 4 there is a hump with maximum about $(3.12, 4.06)$.`, t`Passes through $(0, 8)$ with a maximum about $(0.21, 8.21)$; $y \to \infty$ at both ends.`],
        modelAnswer: t`Coming down from the top left to a cusp at $(-1, 0)$, rising through $(0, 8)$ to a maximum near $(0.21, 8.21)$, falling to a cusp at $(2, 0)$, rising to a reflected maximum near $(3.12, 4.06)$, falling to a cusp at $(4, 0)$, then rising steeply.`,
        explanation: "Reflect the negative parts of the cubic: x < −1 and 2 < x < 4." }),
      P.fib({ label: "(c)", marks: 2, stem: t`Solve $f(x) \geq 0$.`, template: "{{blank:a}} ≤ x ≤ {{blank:b}} or x ≥ {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: "1" }, { id: "b", input: "number", accepted: [2], wrong: "-2" }, { id: "c", input: "number", accepted: [4], wrong: "-4" }],
        explanation: t`Positive cubic with roots $-1$, $2$, $4$: on or above the axis for $-1 \leq x \leq 2$ and $x \geq 4$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the number of solutions of $|f(x)| = 5$.`, value: n5, wrong: [3, 6],
        explanation: t`The line $y = 5$ is below the maximum 8.21, so it meets the part between $-1$ and $2$ twice and the branch for $x > 4$ once; it is above the reflected hump of height 4.06, so it misses that; and it meets the reflected branch for $x < -1$ once. Total 4.` }),
    ],
    explanation: "Factors give the intercepts; the sign of the leading coefficient gives the shape; reflecting the negative parts gives the modulus graph.",
    hints: ["Multiply the constants for the y-intercept.", "After reflection, the turning point (3.12, −4.06) becomes a maximum of height 4.06."],
  });

  // C3 (8, Paper 1): y = 2x^2 - 3x + 5 and y = x + k -> 2x^2 - 4x + 5 - k = 0 ; tangent k = 3 at (1, 4); no intersection k < 3
  chk(quad.disc(2, -4, 5 - 3), 0);
  same(quad.roots(2, -4, 2), [1]);
  chk(2 - 3 + 5, 4); chk(1 + 3, 4);
  chk(Math.sign(quad.disc(2, -4, 5 - 2)), -1);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("quadratics.discriminant"), Q("quadratics.inequalities")],
    stem: t`A curve has equation $y = 2x^2 - 3x + 5$ and a line has equation $y = x + k$, where $k$ is a constant.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the $x$-coordinates of any points of intersection satisfy $2x^2 - 4x + 5 - k = 0$.`,
        points: [t`M1 equates $2x^2 - 3x + 5 = x + k$.`, t`A1 rearranges to $2x^2 - 4x + 5 - k = 0$.`],
        modelAnswer: t`$$
2x^2 - 3x + 5 = x + k
$$

$$
2x^2 - 4x + 5 - k = 0
$$`,
        explanation: "Equate the two expressions for y." }),
      P.num({ label: "(b)", marks: 2, stem: t`Find the value of $k$ for which the line is a tangent to the curve.`, value: 3, prefix: "k =", wrong: [-3, 5],
        explanation: t`Equal roots: $16 - 8(5 - k) = 0$, so $8k = 24$ and $k = 3$.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Find the coordinates of the point of contact.`, template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [1], wrong: "-1" }, { id: "y", input: "number", accepted: [4], wrong: "3" }],
        explanation: t`$k = 3$: $2x^2 - 4x + 2 = 2(x - 1)^2 = 0$, so $x = 1$ and $y = 1 + 3 = 4$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the set of values of $k$ for which the line does not meet the curve, in the form $k < c$. Give $c$.`, value: 3, prefix: "c =", wrong: [5],
        explanation: t`No intersection: $16 - 8(5 - k) < 0$, so $8k < 24$ and $k < 3$.` }),
    ],
    explanation: "The discriminant of the combined quadratic is 8k − 24: zero for a tangent, negative when the line misses the curve.",
    hints: [t`Here $a = 2$, $b = -4$, $c = 5 - k$.`],
  });

  // C4 (8, Paper 1): f(x) = (x - 2)^2 + 3, x >= 2; g(x) = 2x + 1
  const f4 = (x) => (x - 2) ** 2 + 3;
  agree((x) => f4(2 + Math.sqrt(Math.abs(x))), (x) => Math.abs(x) + 3, "C4 inverse");
  chk(f4(2 * 2 + 1), 12); chk(f4(2 * -1 + 1), 12);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("functions.inverse"), Q("functions.composite"), Q("functions.domain-range")],
    stem: t`The functions $f$ and $g$ are defined by $f(x) = (x - 2)^2 + 3$ for $x \geq 2$, and $g(x) = 2x + 1$ for $x \in \mathbb{R}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`The range of $f$ is $f(x) \geq m$. Find $m$.`, value: 3, prefix: "m =", wrong: [2, 7], explanation: t`The least value is $f(2) = 3$.` }),
      P.expr({ label: "(b)", marks: 2, stem: t`Find $f^{-1}(x)$. Type sqrt(...) or √(...), e.g. 1+sqrt(x-5).`,
        accepted: ["2+sqrt(x-3)", "2+√(x-3)", "sqrt(x-3)+2", "√(x-3)+2", "2+sqrt(-3+x)"], wrong: ["2-sqrt(x-3)", "sqrt(x+3)-2"],
        explanation: t`$(x - 2)^2 = y - 3$; with $x \geq 2$, $x - 2 = \sqrt{y - 3}$, so $f^{-1}(x) = 2 + \sqrt{x - 3}$, $x \geq 3$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Solve $fg(x) = 12$.`, value: 2, prefix: "x =", wrong: [-1],
        explanation: t`$fg(x) = (2x + 1 - 2)^2 + 3 = (2x - 1)^2 + 3 = 12$, so $(2x - 1)^2 = 9$, $2x - 1 = \pm 3$, giving $x = 2$ or $x = -1$. For $fg$ to be defined, $g(x) \geq 2$, i.e. $x \geq \frac{1}{2}$, so $x = 2$ only.` }),
      P.manual({ label: "(d)", marks: 2, stem: t`Explain why $x = -1$ is not a solution of $fg(x) = 12$.`,
        points: [t`Finds $g(-1) = -1$.`, t`States that $-1$ is not in the domain of $f$ ($x \geq 2$), so $fg(-1)$ is not defined.`],
        modelAnswer: t`$g(-1) = -1$, and $f$ is only defined for inputs $x \geq 2$, so $f(g(-1))$ does not exist.`,
        explanation: "The range of the inner function must lie in the domain of the outer one." }),
    ],
    explanation: "Restricted domains matter: the inverse uses the positive square root, and the composite only accepts x with g(x) ≥ 2.",
    hints: [t`$fg(x) = f(2x + 1)$: replace $x$ by $2x + 1$ in $(x - 2)^2 + 3$.`, t`Check each answer: is $g(x)$ in the domain of $f$?`],
  });

  // P2-1 (10, Paper 2): lawn 12 by 8 with path x: (12 + 2x)(8 + 2x) = 160 -> x^2 + 10x - 16 = 0
  same(poly.sub(poly.mul([2, 12], [2, 8]), [160]), [4, 40, -64]);
  const w = quad.roots(1, 10, -16);
  const pathArea = 160 - 96;
  chk(pathArea * 12, 768);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("quadratics.solving")],
    stem: t`A rectangular lawn at a clinic in Bulawayo measures 12 m by 8 m. A path of constant width $x$ metres is laid all the way round the outside of the lawn. The lawn and the path together cover $160\ \text{m}^2$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $x^2 + 10x - 16 = 0$.`,
        points: [t`M1 writes the outer dimensions as $(12 + 2x)$ and $(8 + 2x)$.`, t`M1 forms $(12 + 2x)(8 + 2x) = 160$ and expands to $96 + 40x + 4x^2$.`, t`A1 simplifies $4x^2 + 40x - 64 = 0$ to the given equation.`],
        modelAnswer: t`$$
(12 + 2x)(8 + 2x) = 160
$$

$$
96 + 24x + 16x + 4x^2 = 160
$$

$$
4x^2 + 40x - 64 = 0 \Rightarrow x^2 + 10x - 16 = 0
$$`,
        explanation: "The path adds x on each side, so 2x to each dimension." }),
      P.num({ label: "(b)", marks: 3, stem: t`Solve the equation to find the width of the path, giving your answer correct to 3 significant figures.`, value: w[1], unit: "m", prefix: "x =", wrong: [w[0], 2 * w[1]],
        explanation: t`$x = \frac{-10 \pm \sqrt{100 + 64}}{2} = \frac{-10 \pm \sqrt{164}}{2} = -5 \pm \sqrt{41}$. The positive root is $x = ${w[1].toFixed(4)}\ldots \approx ${fixed(w[1], 2).toFixed(2)}$ m.` }),
      P.manual({ label: "(c)", marks: 2, stem: t`Explain why the other root of the equation is rejected.`,
        points: [t`States the other root is negative (about $${w[0].toFixed(1)}$).`, "States that a width cannot be negative."],
        modelAnswer: t`The other root is $x \approx ${w[0].toFixed(2)}$, which is negative, and the width of a path must be positive.`, explanation: "Interpret roots in context." }),
      P.num({ label: "(d)", marks: 2, stem: t`Paving costs ${money(12)} per square metre. Find the cost of paving the path.`, value: 768, prefix: "US$", wrong: [1920, 1152],
        explanation: t`Path area $= 160 - 12 \times 8 = 64\ \text{m}^2$; cost $= 64 \times 12$, which is ${money(768)}.` }),
    ],
    explanation: "Form the area equation from the outer dimensions, solve with the formula and keep the positive root.",
    hints: ["The outer rectangle is (12 + 2x) m by (8 + 2x) m.", "Use the quadratic formula; only the positive root is a width."],
  });

  // P2-2 (10, Paper 2): y = |3 sin 2x - 1|, 0 <= x <= 180
  const zeros = solveTrig({ fn: "sin", k: 1 / 3, a: 2, lo: 0, hi: 180 });
  chk(zeros.length, 2);
  const sol2 = [...solveTrig({ fn: "sin", k: 1, a: 2, lo: 0, hi: 180 }), ...solveTrig({ fn: "sin", k: -1 / 3, a: 2, lo: 0, hi: 180 })].sort((m, n) => m - n);
  chk(sol2.length, 3); chk(sol2[0], 45);
  const n1 = new Set([...solveTrig({ fn: "sin", k: 2 / 3, a: 2, lo: 0, hi: 180 }), ...solveTrig({ fn: "sin", k: 0, a: 2, lo: 0, hi: 180 })].map((x) => x.toFixed(6))).size;
  chk(n1, 5);
  b.struct({
    d: 5, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("graphs.modulus-functions")],
    stem: t`The graph of $y = |3\sin 2x - 1|$ is drawn for $0^\circ \leq x \leq 180^\circ$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`State the greatest value of $y$ and the value of $y$ when $x = 0^\circ$.`, template: "greatest value = {{blank:m}}; y at 0° = {{blank:y}}",
        blanks: [{ id: "m", input: "number", accepted: [4], wrong: "2" }, { id: "y", input: "number", accepted: [1], wrong: "-1" }],
        explanation: t`$3\sin 2x - 1$ ranges from $-4$ to $2$, so the greatest value of its modulus is 4 (at $x = 135^\circ$). At $x = 0$, $y = |-1| = 1$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the $x$-coordinates of the points where the graph meets the $x$-axis, correct to 1 decimal place, in ascending order.`, template: "x = {{blank:a}}° and x = {{blank:b}}°",
        blanks: [{ id: "a", input: "number", accepted: [fixed(zeros[0], 1)], tolerance: 0.05, wrong: "19.5" }, { id: "b", input: "number", accepted: [fixed(zeros[1], 1)], tolerance: 0.05, wrong: "160.5" }],
        explanation: t`$\sin 2x = \frac{1}{3}$: $2x = ${(2 * zeros[0]).toFixed(2)}^\circ$ or $${(2 * zeros[1]).toFixed(2)}^\circ$, so $x = ${fixed(zeros[0], 1)}^\circ$ or $${fixed(zeros[1], 1)}^\circ$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Solve $|3\sin 2x - 1| = 2$, giving your answers correct to 1 decimal place where necessary, in ascending order.`, template: "x = {{blank:a}}°, {{blank:b}}°, {{blank:c}}°",
        blanks: [{ id: "a", input: "number", accepted: [45], tolerance: 0.05, wrong: "90" }, { id: "b", input: "number", accepted: [fixed(sol2[1], 1)], tolerance: 0.05, wrong: "9.7" }, { id: "c", input: "number", accepted: [fixed(sol2[2], 1)], tolerance: 0.05, wrong: "80.3" }],
        explanation: t`$3\sin 2x - 1 = 2$ gives $\sin 2x = 1$, $2x = 90^\circ$, $x = 45^\circ$. $3\sin 2x - 1 = -2$ gives $\sin 2x = -\frac{1}{3}$, $2x = ${(2 * sol2[1]).toFixed(2)}^\circ$ or $${(2 * sol2[2]).toFixed(2)}^\circ$, so $x = ${fixed(sol2[1], 1)}^\circ$ or $${fixed(sol2[2], 1)}^\circ$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`State the number of solutions of $|3\sin 2x - 1| = 1$ for $0^\circ \leq x \leq 180^\circ$.`, value: n1, wrong: [4, 3],
        explanation: t`$\sin 2x = \frac{2}{3}$ gives 2 solutions; $\sin 2x = 0$ gives $x = 0^\circ, 90^\circ, 180^\circ$. Total 5.` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Describe the shape of the graph between $x = 90^\circ$ and $x = 180^\circ$.`,
        points: [t`For $90^\circ < x < 180^\circ$, $3\sin 2x - 1 < 0$, so this whole section is reflected above the axis.`, t`It rises from $(90^\circ, 1)$ to a maximum $(135^\circ, 4)$ and falls back to $(180^\circ, 1)$, with no cusps in this section.`],
        modelAnswer: t`Between $90^\circ$ and $180^\circ$, $\sin 2x \leq 0$, so $3\sin 2x - 1 \leq -1$ and the graph is the reflection: a smooth arch from $(90^\circ, 1)$ up to $(135^\circ, 4)$ and down to $(180^\circ, 1)$.`,
        explanation: "The cusps are only where the original graph crosses the axis, both of which lie between 0° and 90°." }),
    ],
    explanation: t`Find where $3\sin 2x - 1$ is negative (from $x \approx ${fixed(zeros[1], 1)}^\circ$ to $180^\circ$ and from $0^\circ$ to $${fixed(zeros[0], 1)}^\circ$) and reflect those sections; count intersections with horizontal lines.`,
    hints: [t`$3\sin 2x - 1$ takes values from $-4$ to $2$.`, t`Solve each case for $2x$ in $0^\circ \leq 2x \leq 360^\circ$, then halve.`],
  });

  // P2-3 (10, Paper 2): f(x) = 3e^{2x} - 1, g(x) = ln(x + 4), x > -4
  const F = (x) => 3 * Math.exp(2 * x) - 1;
  const Fi = (x) => 0.5 * Math.log((x + 1) / 3);
  const G = (x) => Math.log(x + 4);
  agree((x) => Fi(F(x)), (x) => x, "P2-3 inverse");
  [-3, -1, 0, 2].forEach((x) => chk(F(G(x)), 3 * (x + 4) ** 2 - 1, 1e-9, "fg"));
  chk(F(G(1)), 74);
  const v5 = Fi(5);
  chk(v5, 0.5 * Math.log(2));
  b.struct({
    d: 5, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("functions.inverse"), Q("functions.composite"), Q("functions.domain-range")],
    stem: t`The functions $f$ and $g$ are defined by $f(x) = 3\mathrm{e}^{2x} - 1$ for $x \in \mathbb{R}$, and $g(x) = \ln(x + 4)$ for $x > -4$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`The range of $f$ is $f(x) > m$. Find $m$.`, value: -1, prefix: "m =", wrong: [2, 0], explanation: t`$3\mathrm{e}^{2x} > 0$, so $f(x) > -1$.` }),
      P.expr({ label: "(b)", marks: 2, stem: t`Find $f^{-1}(x)$. Type ln(...) for the natural logarithm, e.g. (1/2)ln((x+2)/5).`,
        accepted: ["(1/2)ln((x+1)/3)", "1/2ln((x+1)/3)", "0.5ln((x+1)/3)", "ln((x+1)/3)/2", "(ln((x+1)/3))/2", "(1/2)(ln(x+1)-ln3)", "ln(sqrt((x+1)/3))", "0.5*ln((x+1)/3)"],
        wrong: ["ln((x+1)/3)", "(1/2)ln(x/3+1)"],
        explanation: t`$\mathrm{e}^{2x} = \frac{y + 1}{3}$, so $2x = \ln\frac{y + 1}{3}$ and $f^{-1}(x) = \frac{1}{2}\ln\left(\frac{x + 1}{3}\right)$, for $x > -1$.` }),
      P.expr({ label: "(c)", marks: 2, stem: t`Show that $fg(x)$ can be written as a polynomial, and give it in the form $a(x + b)^2 + c$. Type it, e.g. 2(x+5)^2-3.`,
        accepted: ["3(x+4)^2-1", "-1+3(x+4)^2", "3x^2+24x+47", "3(4+x)^2-1"], wrong: ["3e^(2ln(x+4))-1", "3(x+4)-1"],
        explanation: t`$fg(x) = 3\mathrm{e}^{2\ln(x + 4)} - 1 = 3\mathrm{e}^{\ln (x + 4)^2} - 1 = 3(x + 4)^2 - 1$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Hence solve $fg(x) = 74$.`, value: 1, prefix: "x =", wrong: [-9],
        explanation: t`$3(x + 4)^2 = 75$, so $(x + 4)^2 = 25$ and $x + 4 = \pm 5$: $x = 1$ or $x = -9$. Only $x = 1$ satisfies $x > -4$.` }),
      P.num({ label: "(e)", marks: 1, stem: t`Find $f^{-1}(5)$, giving your answer correct to 3 significant figures.`, value: v5, wrong: [Math.log(2)],
        explanation: t`$f^{-1}(5) = \frac{1}{2}\ln 2 = ${v5.toFixed(4)}\ldots \approx 0.347$.` }),
      P.manual({ label: "(f)", marks: 2, stem: t`Explain why $x = -9$ is not a solution in part (d).`,
        points: [t`States that $-9$ is not in the domain of $g$ ($x > -4$).`, t`Because $\ln(-5)$ is undefined, so $fg(-9)$ does not exist (even though the polynomial gives 74).`],
        modelAnswer: t`$g(-9) = \ln(-5)$, which is undefined, so $-9$ is outside the domain of $g$ and of $fg$. The polynomial form $3(x + 4)^2 - 1$ is only valid for $x > -4$.`,
        explanation: "Simplifying a composite does not change its domain." }),
    ],
    explanation: t`Use $\mathrm{e}^{\ln u} = u$ to simplify $fg$, and keep track of domains: $fg$ is only defined for $x > -4$.`,
    hints: [t`$2\ln(x + 4) = \ln (x + 4)^2$.`, t`Make $\mathrm{e}^{2x}$ the subject to find $f^{-1}$.`],
  });
});
