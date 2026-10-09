// W1a: ZIMSEC exam-format items. Paper 1 Section A (13 marks, compulsory short structured) × 2 and Paper 1 Section B
// (12 marks, long structured building to a "hence") × 3, on indices, surds, polynomials, identities, inequalities and
// simultaneous equations.
import { concept, P, t, chk, same, poly, quad, ZIM } from "../lib.mjs";

const A = (k) => `amath.${k}`;
const nb = (id, v, w) => ({ id, input: "number", accepted: [v], wrong: w });
const perms3 = (a, b2, c) => [[a, b2, c], [a, c, b2], [b2, a, c], [b2, c, a], [c, a, b2], [c, b2, a]].map((x) => x.join(""));

concept(A("indices.indices"), { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- P1 Section A (13): indices and surds
  const a1 = 81 ** (3 / 4) * 125 ** (-2 / 3);
  chk(a1, 27 / 25, 1e-12);
  same(quad.roots(8, -33, 4), [0.125, 4]);
  const c1 = (3 - Math.sqrt(5)) / (3 + Math.sqrt(5));
  chk(c1, 3.5 - 1.5 * Math.sqrt(5), 1e-12);
  chk((Math.sqrt(7) + Math.sqrt(3)) ** 2 - (Math.sqrt(7) - Math.sqrt(3)) ** 2, 4 * Math.sqrt(21), 1e-12);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    concepts: [A("indices.indices"), A("indices.surds")],
    stem: "Answer all parts. Do not use a calculator.",
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: t`Evaluate $81^{\frac{3}{4}} \times 125^{-\frac{2}{3}}$, giving your answer as a fraction.`,
        value: a1, answer: "27/25", wrong: [675, -675],
        explanation: t`$81^{\frac{3}{4}} = \left(\sqrt[4]{81}\right)^{3} = 27$ and $125^{-\frac{2}{3}} = \dfrac{1}{\left(\sqrt[3]{125}\right)^{2}} = \dfrac{1}{25}$, so the product is $\dfrac{27}{25}$.`,
      }),
      P.group({
        label: "(b)", stem: t`The equation $2^{2x+3} - 33 \times 2^{x} + 4 = 0$ is to be solved.`,
        parts: [
          P.proof({
            label: "(i)", marks: 2, stem: t`Show that, with $u = 2^{x}$, the equation becomes $8u^{2} - 33u + 4 = 0$.`,
            points: [t`M1 writes $2^{2x+3} = 2^{3} \times \left(2^{x}\right)^{2} = 8u^{2}$`, t`A1 obtains $8u^{2} - 33u + 4 = 0$`],
            modelAnswer: t`$$
2^{2x+3} = 2^{3} \times 2^{2x} = 8\left(2^{x}\right)^{2} = 8u^{2}
$$

$$
8u^{2} - 33u + 4 = 0
$$`,
          }),
          P.fib({
            label: "(ii)", marks: 3, stem: "Hence solve the equation for x.",
            template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
            blanks: [nb("x1", -3, 0.125), nb("x2", 2, 4)],
            explanation: t`$(8u - 1)(u - 4) = 0$, so $u = \frac{1}{8}$ or $u = 4$. $2^{x} = \frac{1}{8} = 2^{-3}$ gives $x = -3$; $2^{x} = 4 = 2^{2}$ gives $x = 2$.`,
          }),
        ],
      }),
      P.fib({
        label: "(c)", marks: 3, stem: t`Express $\dfrac{3 - \sqrt{5}}{3 + \sqrt{5}}$ in the form $a + b\sqrt{5}$, where $a$ and $b$ are rational. Give $a$ and $b$ as fractions or decimals.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [nb("a", 3.5, 14), nb("b", -1.5, -6)],
        explanation: t`Multiply top and bottom by $3 - \sqrt{5}$: $\dfrac{\left(3 - \sqrt{5}\right)^{2}}{9 - 5} = \dfrac{14 - 6\sqrt{5}}{4} = \dfrac{7}{2} - \dfrac{3}{2}\sqrt{5}$.`,
      }),
      P.proof({
        label: "(d)", marks: 3, stem: t`Show that $\left(\sqrt{7} + \sqrt{3}\right)^{2} - \left(\sqrt{7} - \sqrt{3}\right)^{2} = 4\sqrt{21}$.`,
        points: [t`M1 expands $\left(\sqrt{7} + \sqrt{3}\right)^{2} = 10 + 2\sqrt{21}$`, t`M1 expands $\left(\sqrt{7} - \sqrt{3}\right)^{2} = 10 - 2\sqrt{21}$`, t`A1 subtracts to obtain $4\sqrt{21}$ with no errors`],
        modelAnswer: t`$$
\left(\sqrt{7} + \sqrt{3}\right)^{2} = 7 + 2\sqrt{21} + 3 = 10 + 2\sqrt{21}
$$

$$
\left(\sqrt{7} - \sqrt{3}\right)^{2} = 7 - 2\sqrt{21} + 3 = 10 - 2\sqrt{21}
$$

$$
\left(10 + 2\sqrt{21}\right) - \left(10 - 2\sqrt{21}\right) = 4\sqrt{21}
$$`,
      }),
    ],
    explanation: t`(a) $\frac{27}{25}$. (b) $8u^{2} - 33u + 4 = (8u - 1)(u - 4)$ gives $x = -3$ or $2$. (c) Rationalise with the conjugate: $\frac{7}{2} - \frac{3}{2}\sqrt{5}$. (d) The rational parts cancel, leaving $4\sqrt{21}$.`,
    hints: ["Take roots before powers with fractional indices.", t`$2^{2x+3} = 8 \times \left(2^{x}\right)^{2}$.`, "Multiply by the conjugate to rationalise."],
  });

  // ---------------------------------------------------------------- P1 Section A (13): identities, polynomials, inequality
  const cs = quad.completeSquare(2, -8, 3);
  same([cs.a, cs.p, cs.q], [2, -2, -5]);
  const fA2 = [1, -3, -7, 9];
  chk(poly.eval(fA2, 1), 0);
  chk(poly.eval(fA2, -2), 3);
  same(poly.div(fA2, [1, -1]), { q: [1, -2, -9], r: [0] });
  same(quad.roots(1, -2, -9), [1 - Math.sqrt(10), 1 + Math.sqrt(10)]);
  const ints = [];
  for (let x = -10; x <= 10; x++) if (-2 < 3 * x + 4 && 3 * x + 4 <= 16) ints.push(x);
  same(ints, [-1, 0, 1, 2, 3, 4]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    concepts: [A("polynomials.remainder-factor"), A("algebra.identities"), A("polynomials.cubic-equations"), A("algebra.linear-inequalities")],
    stem: "Answer all parts.",
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Given that $2x^{2} - 8x + 3 \equiv a(x + b)^{2} + c$, find the values of the constants $a$, $b$ and $c$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
        blanks: [nb("a", 2, 1), nb("b", -2, 2), nb("c", -5, 3)],
        explanation: t`$a(x + b)^{2} + c = ax^{2} + 2abx + ab^{2} + c$. $a = 2$; $4b = -8$, $b = -2$; $8 + c = 3$, $c = -5$.`,
      }),
      P.group({
        label: "(b)", stem: t`$f(x) = x^{3} + px^{2} - 7x + q$. It is given that $x - 1$ is a factor of $f(x)$ and that the remainder when $f(x)$ is divided by $x + 2$ is $3$.`,
        parts: [
          P.fib({
            label: "(i)", marks: 4, stem: "Find the values of p and q.",
            template: "p = {{blank:p}}, q = {{blank:q}}",
            blanks: [nb("p", -3, 3), nb("q", 9, 3)],
            explanation: t`$f(1) = 0$: $1 + p - 7 + q = 0$, so $p + q = 6$. $f(-2) = 3$: $-8 + 4p + 14 + q = 3$, so $4p + q = -3$. Subtracting: $3p = -9$, $p = -3$, $q = 9$.`,
          }),
          P.fib({
            label: "(ii)", marks: 3, stem: t`Hence solve $f(x) = 0$. The two non-integer roots are $a \pm \sqrt{b}$; find $a$ and $b$.`,
            template: "a = {{blank:a}}, b = {{blank:b}}",
            blanks: [nb("a", 1, -1), nb("b", 10, 40)],
            explanation: t`$f(x) = (x - 1)\left(x^{2} - 2x - 9\right)$. The formula gives $x = \dfrac{2 \pm \sqrt{4 + 36}}{2} = 1 \pm \sqrt{10}$. The roots are $1$ and $1 \pm \sqrt{10}$.`,
          }),
        ],
      }),
      P.group({
        label: "(c)", stem: t`Consider the inequality $-2 < 3x + 4 \leq 16$.`,
        parts: [
          P.fib({
            label: "(i)", marks: 2, stem: "Solve the inequality.",
            template: "{{blank:lo}} {{blank:s1}} x {{blank:s2}} {{blank:hi}}",
            blanks: [nb("lo", -2, -6), { id: "s1", choices: ["<", "≤"], accepted: ["<"], wrong: "≤" }, { id: "s2", choices: ["<", "≤"], accepted: ["≤"], wrong: "<" }, nb("hi", 4, 12)],
            explanation: t`Subtract 4: $-6 < 3x \leq 12$. Divide by 3: $-2 < x \leq 4$.`,
          }),
          P.num({
            label: "(ii)", marks: 1, stem: "How many integers satisfy the inequality?",
            value: ints.length, wrong: [7],
            explanation: t`$-1, 0, 1, 2, 3, 4$: six integers ($-2$ is excluded).`,
          }),
        ],
      }),
    ],
    explanation: t`(a) $2(x - 2)^{2} - 5$. (b) The factor and remainder give $p + q = 6$ and $4p + q = -3$, so $p = -3$, $q = 9$, and $f(x) = (x - 1)(x^{2} - 2x - 9)$ has roots $1$, $1 \pm \sqrt{10}$. (c) $-2 < x \leq 4$, six integers.`,
    hints: ["Equate coefficients for (a).", "Factor: f(1) = 0. Remainder: f(−2) = 3.", "Do the same to all three parts of the inequality."],
  });

  // ---------------------------------------------------------------- P1 Section B (12): cubic, remainder, hence exponential
  const fB1 = [2, -3, -11, 6];
  chk(poly.eval(fB1, 3), 0);
  same(poly.div(fB1, [1, -3]), { q: [2, 3, -2], r: [0] });
  same(poly.rationalRoots(fB1), [-2, 0.5, 3]);
  const rB1 = poly.eval(fB1, -0.5);
  chk(rB1, 10.5);
  // 2(8^y) − 3(4^y) − 11(2^y) + 6 = 0 is f(2^y) = 0: 2^y = 1/2 or 3 (2^y = −2 rejected); integer solution y = −1
  chk(poly.eval(fB1, 2 ** -1), 0);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    concepts: [A("polynomials.cubic-equations"), A("polynomials.remainder-factor"), A("indices.indices")],
    stem: t`It is given that $f(x) = 2x^{3} - 3x^{2} - 11x + 6$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that $x - 3$ is a factor of $f(x)$.`,
        points: [t`M1 evaluates $f(3) = 54 - 27 - 33 + 6$`, t`A1 obtains $0$ and concludes by the factor theorem`],
        modelAnswer: t`$$
f(3) = 2(27) - 3(9) - 11(3) + 6 = 54 - 27 - 33 + 6 = 0
$$

So $x - 3$ is a factor of $f(x)$ (factor theorem).`,
      }),
      P.expr({
        label: "(b)", marks: 3, stem: t`Factorise $f(x)$ completely. Type it like (x-a)(bx-c)(x+d).`,
        accepted: perms3("(x-3)", "(2x-1)", "(x+2)"),
        explanation: t`Dividing by $x - 3$ gives $2x^{2} + 3x - 2 = (2x - 1)(x + 2)$, so $f(x) = (x - 3)(2x - 1)(x + 2)$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: t`Hence solve $f(x) = 0$.`,
        template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order)",
        blanks: [nb("x1", -2, 2), nb("x2", 0.5, -0.5), nb("x3", 3, -3)],
        explanation: t`$(x - 3)(2x - 1)(x + 2) = 0$ gives $x = -2$, $\frac{1}{2}$ or $3$.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Find the remainder when $f(x)$ is divided by $2x + 1$.`,
        value: rB1, wrong: [-10.5, 6],
        explanation: t`$f\left(-\frac{1}{2}\right) = 2\left(-\frac{1}{8}\right) - 3\left(\frac{1}{4}\right) + \frac{11}{2} + 6 = -\frac{1}{4} - \frac{3}{4} + \frac{11}{2} + 6 = \frac{21}{2}$.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: t`Hence find the integer value of $y$ that satisfies $2\left(8^{y}\right) - 3\left(4^{y}\right) - 11\left(2^{y}\right) + 6 = 0$.`,
        value: -1, prefix: "y =", wrong: [0.5, 1],
        explanation: t`With $x = 2^{y}$ the equation is $f(x) = 0$, so $2^{y} = -2$, $\frac{1}{2}$ or $3$. $2^{y} = -2$ is impossible; $2^{y} = 3$ gives a non-integer $y$; $2^{y} = \frac{1}{2} = 2^{-1}$ gives $y = -1$.`,
      }),
    ],
    explanation: t`$f(3) = 0$ gives the factor $x - 3$; $f(x) = (x - 3)(2x - 1)(x + 2)$ with roots $-2, \frac{1}{2}, 3$. The remainder theorem gives $f\left(-\frac{1}{2}\right) = 10.5$, and putting $x = 2^{y}$ turns the exponential equation into $f(x) = 0$, so $y = -1$.`,
    hints: ["Use the factor theorem for (a).", "Divide by x − 3 to find the quadratic factor.", t`In (e), $8^{y} = \left(2^{y}\right)^{3}$ and $4^{y} = \left(2^{y}\right)^{2}$.`],
  });

  // ---------------------------------------------------------------- P1 Section B (12): simultaneous equations
  same(quad.roots(1, -7, 12), [3, 4]);
  for (const [x, y] of [[3, 1], [4, -1]]) { chk(2 * x + y, 7); chk(x * x + x * y + y * y, 13); }
  chk((3 - 4) ** 2 + (1 - -1) ** 2, 5);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    concepts: [A("algebra.simultaneous-equations")],
    stem: t`The line $2x + y = 7$ meets the curve $x^{2} + xy + y^{2} = 13$ at the points $A$ and $B$, where $A$ has the smaller $x$-coordinate.`,
    parts: [
      P.proof({
        label: "(a)", marks: 3, stem: t`Show that the $x$-coordinates of $A$ and $B$ satisfy $x^{2} - 7x + 12 = 0$.`,
        points: [t`M1 substitutes $y = 7 - 2x$ into the curve`, t`M1 expands correctly: $x^{2} + 7x - 2x^{2} + 49 - 28x + 4x^{2} = 13$`, t`A1 simplifies $3x^{2} - 21x + 36 = 0$ to the given equation`],
        modelAnswer: t`$$
x^{2} + x(7 - 2x) + (7 - 2x)^{2} = 13
$$

$$
x^{2} + 7x - 2x^{2} + 49 - 28x + 4x^{2} = 13 \;\Rightarrow\; 3x^{2} - 21x + 36 = 0
$$

Dividing by 3: $x^{2} - 7x + 12 = 0$.`,
      }),
      P.fib({
        label: "(b)", marks: 4, stem: t`Find the coordinates of $A$ and $B$.`,
        template: "A({{blank:x1}}, {{blank:y1}}) and B({{blank:x2}}, {{blank:y2}})",
        blanks: [nb("x1", 3, 4), nb("y1", 1, -1), nb("x2", 4, 3), nb("y2", -1, 1)],
        explanation: t`$(x - 3)(x - 4) = 0$. From $y = 7 - 2x$: $x = 3$ gives $y = 1$; $x = 4$ gives $y = -1$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: t`Find $AB^{2}$.`,
        value: 5, wrong: [25, 3],
        explanation: t`$AB^{2} = (4 - 3)^{2} + (-1 - 1)^{2} = 1 + 4 = 5$, so $AB = \sqrt{5}$.`,
      }),
      P.fib({
        label: "(d)", marks: 2, stem: t`Find the coordinates of the midpoint of $AB$.`,
        template: "({{blank:mx}}, {{blank:my}})",
        blanks: [nb("mx", 3.5, 7), nb("my", 0, 1)],
        explanation: t`Midpoint $\left(\frac{3 + 4}{2}, \frac{1 + (-1)}{2}\right) = (3.5, 0)$.`,
      }),
      P.num({
        label: "(e)", marks: 1, stem: t`State the gradient of the line $AB$.`,
        value: -2, wrong: [2],
        explanation: t`$AB$ lies on $2x + y = 7$, i.e. $y = -2x + 7$, so the gradient is $-2$.`,
      }),
    ],
    explanation: t`Substituting $y = 7 - 2x$ gives $x^{2} - 7x + 12 = 0$, so $A(3, 1)$ and $B(4, -1)$; then $AB^{2} = 5$, the midpoint is $(3.5, 0)$ and the gradient is $-2$.`,
    hints: ["Make y the subject of the linear equation.", "Use the line, not the curve, to find each y."],
  });

  // ---------------------------------------------------------------- P1 Section B (12): identity -> cubic -> surds
  const fB3 = [1, -6, 9, -2];
  same(poly.mul([1, -2], [1, -4, 1]), fB3);
  same(quad.roots(1, -4, 1), [2 - Math.sqrt(3), 2 + Math.sqrt(3)]);
  const xs = 2 + Math.sqrt(3);
  chk(xs + 1 / xs, 4, 1e-12);
  chk(xs ** 2 + 1 / xs ** 2, 14, 1e-9);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    concepts: [A("algebra.identities"), A("polynomials.cubic-equations"), A("indices.surds")],
    stem: t`It is given that $x^{3} - 6x^{2} + 9x - 2 \equiv (x - 2)\left(Ax^{2} + Bx + C\right)$. Do not use a calculator.`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Find the values of A, B and C.",
        template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
        blanks: [nb("A", 1, 2), nb("B", -4, -6), nb("C", 1, -1)],
        explanation: t`$x^{3}$: $A = 1$. Constant: $-2C = -2$, $C = 1$. $x^{2}$: $B - 2A = -6$, $B = -4$. Check $x$: $C - 2B = 1 + 8 = 9$. ✓`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: t`Hence solve $x^{3} - 6x^{2} + 9x - 2 = 0$. One root is $2$; the others are $a \pm \sqrt{b}$. Find $a$ and $b$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [nb("a", 2, -2), nb("b", 3, 12)],
        explanation: t`$x^{2} - 4x + 1 = 0$ gives $x = \dfrac{4 \pm \sqrt{12}}{2} = 2 \pm \sqrt{3}$.`,
      }),
      P.proof({
        label: "(c)", marks: 2, stem: t`Show that $\left(2 + \sqrt{3}\right)\left(2 - \sqrt{3}\right) = 1$, and hence that $\dfrac{1}{2 + \sqrt{3}} = 2 - \sqrt{3}$.`,
        points: [t`M1 expands: $4 - 3 = 1$`, t`A1 divides by $2 + \sqrt{3}$ to conclude $\frac{1}{2 + \sqrt{3}} = 2 - \sqrt{3}$`],
        modelAnswer: t`$$
\left(2 + \sqrt{3}\right)\left(2 - \sqrt{3}\right) = 4 - 3 = 1
$$

Dividing both sides by $2 + \sqrt{3}$:

$$
2 - \sqrt{3} = \frac{1}{2 + \sqrt{3}}
$$`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Given that $x = 2 + \sqrt{3}$, find the exact value of $x + \dfrac{1}{x}$.`,
        value: 4, wrong: [2 * Math.sqrt(3), 2],
        explanation: t`$x + \dfrac{1}{x} = \left(2 + \sqrt{3}\right) + \left(2 - \sqrt{3}\right) = 4$.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: t`Hence find the exact value of $x^{2} + \dfrac{1}{x^{2}}$.`,
        value: 14, wrong: [16, 18],
        explanation: t`$\left(x + \dfrac{1}{x}\right)^{2} = x^{2} + 2 + \dfrac{1}{x^{2}}$, so $x^{2} + \dfrac{1}{x^{2}} = 4^{2} - 2 = 14$.`,
      }),
    ],
    explanation: t`Comparing coefficients gives $(x - 2)(x^{2} - 4x + 1)$, so the roots are $2$ and $2 \pm \sqrt{3}$. Because $\left(2 + \sqrt{3}\right)\left(2 - \sqrt{3}\right) = 1$, the two surd roots are reciprocals: $x + \frac{1}{x} = 4$ and $x^{2} + \frac{1}{x^{2}} = 14$.`,
    hints: ["Compare the x³, constant and x² coefficients.", "Use the quadratic formula on the quadratic factor.", t`Square $x + \frac{1}{x}$ for (e).`],
  });
});
