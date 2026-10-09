// W1a: Cambridge 0606 exam-format items. Paper 1 (non-calculator, 8 marks) × 4 and Paper 2 (calculator, 10 marks) × 3,
// on polynomials, simultaneous equations, equations reducible to quadratics, permutations and combinations.
import { concept, P, t, chk, same, poly, quad, sf, nCr, fact, lg, CAM } from "../lib.mjs";

const A = (k) => `amath.${k}`;
const nb = (id, v, w) => ({ id, input: "number", accepted: [v], wrong: w });
const nb3 = (id, exact, w) => {
  const v = sf(exact, 3);
  const dp = 3 - 1 - Math.floor(Math.log10(Math.abs(exact)));
  return { id, input: "number", accepted: [v], tolerance: Number((0.5 * 10 ** -dp).toPrecision(2)), wrong: w };
};
const perms3 = (a, b2, c) => [[a, b2, c], [a, c, b2], [b2, a, c], [b2, c, a], [c, a, b2], [c, b2, a]].map((x) => x.join(""));
function countArr(items, r, pred = () => true) {
  let n = 0;
  const rec = (cur, rest) => {
    if (cur.length === r) { if (pred(cur)) n++; return; }
    rest.forEach((x, i) => rec([...cur, x], [...rest.slice(0, i), ...rest.slice(i + 1)]));
  };
  rec([], items);
  return n;
}

concept(A("polynomials.remainder-factor"), { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- Paper 1 (8): factor theorem, two unknowns
  const pC1 = [6, 11, -3, -2];
  same(poly.mul(poly.mul([2, -1], [1, 2]), [3, 1]), pC1);
  chk(poly.eval(pC1, 0.5), 0);
  chk(poly.eval(pC1, -1), 6);
  same(poly.rationalRoots(pC1), [-2, -1 / 3, 0.5]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    concepts: [A("polynomials.remainder-factor"), A("polynomials.cubic-equations")],
    stem: t`The polynomial $p(x) = 6x^{3} + ax^{2} + bx - 2$, where $a$ and $b$ are constants, has a factor $2x - 1$. When $p(x)$ is divided by $x + 1$ the remainder is $6$.`,
    parts: [
      P.group({
        label: "(a)", stem: "Use the two given conditions.",
        parts: [
          P.proof({
            label: "(i)", marks: 2, stem: t`Show that $a + 2b = 5$.`,
            points: [t`M1 uses $p\left(\frac{1}{2}\right) = 0$: $\frac{6}{8} + \frac{a}{4} + \frac{b}{2} - 2 = 0$`, t`A1 multiplies by 4 and rearranges to $a + 2b = 5$`],
            modelAnswer: t`$$
p\left(\tfrac{1}{2}\right) = \tfrac{3}{4} + \tfrac{a}{4} + \tfrac{b}{2} - 2 = 0
$$

$$
3 + a + 2b - 8 = 0 \;\Rightarrow\; a + 2b = 5
$$`,
          }),
          P.fib({
            label: "(ii)", marks: 2, stem: "Find the values of a and b.",
            template: "a = {{blank:a}}, b = {{blank:b}}",
            blanks: [nb("a", 11, -3), nb("b", -3, 4)],
            explanation: t`$p(-1) = -6 + a - b - 2 = 6$, so $a - b = 14$. With $a + 2b = 5$: $3b = -9$, $b = -3$, $a = 11$.`,
          }),
        ],
      }),
      P.expr({
        label: "(b)", marks: 2, stem: t`Factorise $p(x)$ completely. Type it like (2x-1)(x+a)(bx+c).`,
        accepted: perms3("(2x-1)", "(x+2)", "(3x+1)"),
        explanation: t`$p(x) = 6x^{3} + 11x^{2} - 3x - 2$. Dividing by $2x - 1$ gives $3x^{2} + 7x + 2 = (3x + 1)(x + 2)$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: t`Hence solve $p(x) = 0$.`,
        template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order; fractions allowed)",
        blanks: [nb("x1", -2, 2), { id: "x2", input: "number", accepted: ["-1/3"], tolerance: 0.0005, wrong: -3 }, nb("x3", 0.5, 2)],
        explanation: t`$(2x - 1)(x + 2)(3x + 1) = 0$ gives $x = -2$, $-\frac{1}{3}$ or $\frac{1}{2}$.`,
      }),
    ],
    explanation: t`The factor gives $a + 2b = 5$ and the remainder gives $a - b = 14$, so $a = 11$, $b = -3$ and $p(x) = (2x - 1)(x + 2)(3x + 1)$.`,
    hints: [t`For the factor $2x - 1$, substitute $x = \frac{1}{2}$.`, "The remainder on dividing by x + 1 is p(−1)."],
  });

  // ---------------------------------------------------------------- Paper 1 (8): line and circle, perpendicular bisector
  same(quad.roots(1, 3, -4), [-4, 1]);
  for (const [x, y] of [[-4, -1], [1, 4]]) { chk(y, x + 3); chk(x * x + y * y, 17); }
  chk(Math.hypot(5, 5), 5 * Math.SQRT2, 1e-12);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    concepts: [A("algebra.simultaneous-equations")],
    stem: t`The line $y = x + 3$ meets the curve $x^{2} + y^{2} = 17$ at the points $A$ and $B$, where $A$ has the smaller $x$-coordinate. Do not use a calculator.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that the $x$-coordinates of $A$ and $B$ satisfy $x^{2} + 3x - 4 = 0$.`,
        points: [t`M1 substitutes: $x^{2} + (x + 3)^{2} = 17$`, t`A1 simplifies $2x^{2} + 6x - 8 = 0$ to the given equation`],
        modelAnswer: t`$$
x^{2} + (x + 3)^{2} = 17 \;\Rightarrow\; 2x^{2} + 6x + 9 = 17 \;\Rightarrow\; 2x^{2} + 6x - 8 = 0
$$

Dividing by 2: $x^{2} + 3x - 4 = 0$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: t`Find the coordinates of $A$ and $B$.`,
        template: "A({{blank:x1}}, {{blank:y1}}) and B({{blank:x2}}, {{blank:y2}})",
        blanks: [nb("x1", -4, 4), nb("y1", -1, 1), nb("x2", 1, -1), nb("y2", 4, -4)],
        explanation: t`$(x + 4)(x - 1) = 0$, so $x = -4$ or $1$; from $y = x + 3$: $A(-4, -1)$, $B(1, 4)$.`,
      }),
      P.fib({
        label: "(c)", marks: 1, stem: t`The length $AB$ can be written as $k\sqrt{2}$. Find $k$.`,
        template: "k = {{blank:k}}",
        blanks: [nb("k", 5, 50)],
        explanation: t`$AB = \sqrt{5^{2} + 5^{2}} = \sqrt{50} = 5\sqrt{2}$.`,
      }),
      P.fib({
        label: "(d)", marks: 2, stem: t`Find the equation of the perpendicular bisector of $AB$ in the form $y = mx + c$.`,
        template: "m = {{blank:m}}, c = {{blank:c}}",
        blanks: [nb("m", -1, 1), nb("c", 0, 3)],
        explanation: t`Midpoint $\left(-\frac{3}{2}, \frac{3}{2}\right)$; gradient of $AB$ is 1, so the perpendicular gradient is $-1$. $y - \frac{3}{2} = -\left(x + \frac{3}{2}\right)$ gives $y = -x$ (through the centre of the circle, as expected).`,
      }),
    ],
    explanation: t`Substitution gives $x^{2} + 3x - 4 = 0$, so $A(-4, -1)$, $B(1, 4)$, $AB = 5\sqrt{2}$, and the perpendicular bisector is $y = -x$.`,
    hints: [t`$(x + 3)^{2} = x^{2} + 6x + 9$.`, "Perpendicular gradients multiply to −1."],
  });

  // ---------------------------------------------------------------- Paper 1 (8): equations reducible to quadratics (exact)
  same(quad.roots(3, -11, 6), [2 / 3, 3]);
  chk(3 * (4 / 9) - 11 * Math.sqrt(4 / 9) + 6, 0, 1e-12);
  same(quad.roots(2, -7, 3), [0.5, 3]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    concepts: [A("algebra.substitution")],
    stem: "Do not use a calculator in this question.",
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Solve $3x - 11\sqrt{x} + 6 = 0$. Give your answers as exact fractions or integers.`,
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
        blanks: [{ id: "x1", input: "number", accepted: ["4/9"], tolerance: 0.0005, wrong: 2 / 3 }, nb("x2", 9, 3)],
        explanation: t`Let $u = \sqrt{x}$: $3u^{2} - 11u + 6 = 0$, $(3u - 2)(u - 3) = 0$, so $u = \frac{2}{3}$ or $3$, giving $x = \frac{4}{9}$ or $9$.`,
      }),
      P.group({
        label: "(b)", stem: t`Consider the equation $2e^{x} + 3e^{-x} = 7$.`,
        parts: [
          P.proof({
            label: "(i)", marks: 2, stem: t`Show that, with $u = e^{x}$, the equation becomes $2u^{2} - 7u + 3 = 0$.`,
            points: [t`M1 multiplies by $e^{x}$ (or writes $3e^{-x} = \frac{3}{u}$)`, t`A1 obtains $2u^{2} - 7u + 3 = 0$`],
            modelAnswer: t`$$
2u + \frac{3}{u} = 7 \;\Rightarrow\; 2u^{2} + 3 = 7u \;\Rightarrow\; 2u^{2} - 7u + 3 = 0
$$`,
          }),
          P.fib({
            label: "(ii)", marks: 3, stem: t`Hence find the exact solutions, in the form $x = \ln p$ and $x = \ln q$ with $p < q$.`,
            template: "p = {{blank:p}}, q = {{blank:q}}",
            blanks: [nb("p", 0.5, -0.5), nb("q", 3, -3)],
            explanation: t`$(2u - 1)(u - 3) = 0$, so $e^{x} = \frac{1}{2}$ or $e^{x} = 3$: $x = \ln \frac{1}{2}$ $(= -\ln 2)$ or $x = \ln 3$.`,
          }),
        ],
      }),
    ],
    explanation: t`(a) $u = \sqrt{x}$ gives $u = \frac{2}{3}$ or $3$, so $x = \frac{4}{9}$ or $9$. (b) Multiplying by $e^{x}$ gives $2u^{2} - 7u + 3 = 0$, so $x = \ln \frac{1}{2}$ or $\ln 3$.`,
    hints: [t`In (a), let $u = \sqrt{x}$ so that $x = u^{2}$.`, t`In (b), $e^{-x} = \frac{1}{e^{x}}$.`],
  });

  // ---------------------------------------------------------------- Paper 1 (8): permutations and combinations
  const W = ["M", "U", "T", "A", "R", "E"];
  const V = ["U", "A", "E"];
  const allW = countArr(W, 6);
  const vc = countArr(W, 6, (a) => V.includes(a[0]) && !V.includes(a[5]));
  const vTog = countArr(W, 6, (a) => { const i = V.map((v) => a.indexOf(v)).sort((x, y) => x - y); return i[2] - i[0] === 2; });
  chk(allW, 720); chk(vc, 3 * 3 * fact(4)); chk(vTog, fact(4) * fact(3));
  const team = nCr(11, 4) - nCr(6, 4) - nCr(5, 1) * nCr(6, 3);
  chk(team, nCr(5, 2) * nCr(6, 2) + nCr(5, 3) * nCr(6, 1) + nCr(5, 4));
  chk(team, 215);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    concepts: [A("counting.permutations"), A("counting.combinations")],
    stem: "Do not use a calculator in this question.",
    parts: [
      P.group({
        label: "(a)", stem: "The six letters of the word MUTARE are arranged in a line.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Find the number of different arrangements.", value: allW, wrong: [36], explanation: t`$6! = 720$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "Find the number of arrangements that begin with a vowel and end with a consonant.", value: vc, wrong: [fact(4), 2 * 3 * fact(4)], explanation: t`First letter: 3 vowels (U, A, E). Last letter: 3 consonants (M, T, R). Middle: $4! = 24$. Total $3 \times 3 \times 24 = 216$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "Find the number of arrangements in which the three vowels are next to each other.", value: vTog, wrong: [fact(4), fact(3) * fact(3)], explanation: t`Block of vowels with M, T, R: 4 items, $4! = 24$; inside the block $3! = 6$. Total $144$.` }),
        ],
      }),
      P.num({
        label: "(b)", marks: 3, stem: "A team of 4 is chosen from 6 boys and 5 girls. Find the number of teams that contain at least 2 girls.",
        value: team, wrong: [nCr(5, 2) * nCr(6, 2), nCr(11, 4) - nCr(6, 4)],
        explanation: t`2 girls: $^{5}C_{2} \times {}^{6}C_{2} = 150$; 3 girls: $^{5}C_{3} \times 6 = 60$; 4 girls: $^{5}C_{4} = 5$. Total $215$. (Or $^{11}C_{4} - {}^{6}C_{4} - 5 \times {}^{6}C_{3} = 330 - 15 - 100 = 215$.)`,
      }),
    ],
    explanation: t`(a) $720$; vowel first and consonant last $3 \times 3 \times 4! = 216$; vowels together $4! \times 3! = 144$. (b) At least 2 girls: $150 + 60 + 5 = 215$.`,
    hints: ["Fill restricted positions first; glue items that must be together.", "At least 2 girls: 2, 3 or 4 girls."],
  });

  // ---------------------------------------------------------------- Paper 2 (10): cubic with surd roots, remainder, unknown constant
  const fD1 = [2, -1, -10, 5];
  same(poly.div(fD1, [2, -1]), { q: [1, 0, -5], r: [0] });
  chk(poly.eval(fD1, 2), -3);
  chk(poly.eval(fD1, -1), 12);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    concepts: [A("polynomials.cubic-equations"), A("polynomials.remainder-factor")],
    stem: t`It is given that $f(x) = 2x^{3} - x^{2} - 10x + 5$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that $2x - 1$ is a factor of $f(x)$.`,
        points: [t`M1 evaluates $f\left(\frac{1}{2}\right) = \frac{1}{4} - \frac{1}{4} - 5 + 5$`, t`A1 obtains $0$ and concludes`],
        modelAnswer: t`$$
f\left(\tfrac{1}{2}\right) = 2\left(\tfrac{1}{8}\right) - \tfrac{1}{4} - 5 + 5 = 0
$$

So $2x - 1$ is a factor of $f(x)$.`,
      }),
      P.expr({
        label: "(b)", marks: 2, stem: t`Find the quadratic factor of $f(x)$. Type it like x^2+px+q.`,
        accepted: ["x^2-5", "x²-5"],
        explanation: t`$f(x) = x^{2}(2x - 1) - 5(2x - 1) = (2x - 1)\left(x^{2} - 5\right)$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: t`Solve $f(x) = 0$, giving non-exact roots correct to 3 significant figures.`,
        template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order)",
        blanks: [nb3("x1", -Math.sqrt(5), 5), nb("x2", 0.5, 2), nb3("x3", Math.sqrt(5), 5)],
        explanation: t`$x = \frac{1}{2}$ or $x^{2} = 5$, so $x = \pm\sqrt{5} = \pm 2.24$.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: t`Find the remainder when $f(x)$ is divided by $x - 2$.`,
        value: poly.eval(fD1, 2), wrong: [3],
        explanation: t`$f(2) = 16 - 4 - 20 + 5 = -3$.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: t`Find the value of the constant $k$ for which $x + 1$ is a factor of $f(x) + k$.`,
        value: -poly.eval(fD1, -1), prefix: "k =", wrong: [12, 18],
        explanation: t`$f(-1) + k = 0$. $f(-1) = -2 - 1 + 10 + 5 = 12$, so $k = -12$.`,
      }),
    ],
    explanation: t`$f\left(\frac{1}{2}\right) = 0$, and grouping gives $f(x) = (2x - 1)(x^{2} - 5)$ with roots $\frac{1}{2}$, $\pm 2.24$. The remainder on dividing by $x - 2$ is $-3$, and $f(-1) = 12$ gives $k = -12$.`,
    hints: [t`Substitute $x = \frac{1}{2}$.`, "Group the terms in pairs to factorise.", "For (e), f(−1) + k must be zero."],
  });

  // ---------------------------------------------------------------- Paper 2 (10): line and curve with decimal answers
  const [xa, xb] = quad.roots(7, 3, -20);
  const ya = 2 * xa + 1, yb = 2 * xb + 1;
  for (const [x, y] of [[xa, ya], [xb, yb]]) chk(x * x + 3 * x * y, 20, 1e-9);
  const ABd = Math.hypot(xb - xa, yb - ya);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    concepts: [A("algebra.simultaneous-equations")],
    stem: t`The line $y = 2x + 1$ meets the curve $x^{2} + 3xy = 20$ at the points $A$ and $B$, where $A$ has the smaller $x$-coordinate.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that the $x$-coordinates of $A$ and $B$ satisfy $7x^{2} + 3x - 20 = 0$.`,
        points: [t`M1 substitutes: $x^{2} + 3x(2x + 1) = 20$`, t`A1 simplifies to $7x^{2} + 3x - 20 = 0$`],
        modelAnswer: t`$$
x^{2} + 3x(2x + 1) = 20 \;\Rightarrow\; x^{2} + 6x^{2} + 3x = 20 \;\Rightarrow\; 7x^{2} + 3x - 20 = 0
$$`,
      }),
      P.fib({
        label: "(b)", marks: 4, stem: t`Find the coordinates of $A$ and $B$, giving each value correct to 3 significant figures.`,
        template: "A({{blank:x1}}, {{blank:y1}}) and B({{blank:x2}}, {{blank:y2}})",
        blanks: [nb3("x1", xa, 1.92), nb3("y1", ya, 2.84), nb3("x2", xb, -1.49), nb3("y2", yb, -3.98)],
        explanation: t`$x = \dfrac{-3 \pm \sqrt{9 + 560}}{14} = \dfrac{-3 \pm \sqrt{569}}{14}$, so $x = -1.918\ldots$ or $1.489\ldots$; then $y = 2x + 1$ gives $-2.836\ldots$ and $3.979\ldots$. $A(-1.92, -2.84)$, $B(1.49, 3.98)$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: t`Find the length of $AB$, correct to 3 significant figures.`,
        value: ABd, wrong: [3.41, 58.1],
        explanation: t`$AB = \sqrt{(1.4896 + 1.9181)^{2} + (3.9791 + 2.8362)^{2}} = \sqrt{3.4077^{2} + 6.8153^{2}} = 7.62$. Use unrounded values.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: t`Find the exact $x$-coordinate of the midpoint of $AB$, as a fraction.`,
        value: (xa + xb) / 2, answer: "-3/14", wrong: [-3 / 7, 3 / 14],
        explanation: t`The sum of the roots of $7x^{2} + 3x - 20 = 0$ is $-\frac{3}{7}$, so the midpoint has $x = -\frac{3}{14}$.`,
      }),
    ],
    explanation: t`Substitution gives $7x^{2} + 3x - 20 = 0$; the formula gives $A(-1.92, -2.84)$ and $B(1.49, 3.98)$, so $AB = 7.62$, and the midpoint $x$-coordinate is half the sum of the roots, $-\frac{3}{14}$.`,
    hints: ["Substitute the line into the curve.", "Keep full calculator accuracy until the final answer.", "The sum of the roots of ax² + bx + c = 0 is −b/a."],
  });
  chk((xa + xb) / 2, -3 / 14, 1e-12);

  // ---------------------------------------------------------------- Paper 2 (10): three equations in quadratic form
  same(quad.roots(1, -6, 8), [2, 4]);
  const xs1 = lg(2) / lg(5), xs2 = lg(4) / lg(5);
  same(quad.roots(2, -5, -3), [-0.5, 3]);
  same(quad.roots(1, -3, 2), [1, 2]);
  chk(2 * 27 ** (2 / 3) - 5 * 27 ** (1 / 3) - 3, 0, 1e-9);
  chk(2 * 0.25 - 5 * -0.5 - 3, 0, 1e-12); // x = −1/8: x^(2/3) = 1/4, x^(1/3) = −1/2
  chk((-0.5) ** 3, -1 / 8, 1e-12);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    concepts: [A("algebra.substitution")],
    stem: "Solve the following equations.",
    parts: [
      P.fib({
        label: "(a)", marks: 4, stem: t`$5^{2x} - 6 \times 5^{x} + 8 = 0$. Give your answers correct to 3 significant figures.`,
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
        blanks: [nb3("x1", xs1, 2), nb3("x2", xs2, 4)],
        explanation: t`Let $u = 5^{x}$: $u^{2} - 6u + 8 = 0$, so $u = 2$ or $4$. $x = \dfrac{\lg 2}{\lg 5} = 0.431$ or $x = \dfrac{\lg 4}{\lg 5} = 0.861$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: t`$2x^{\frac{2}{3}} - 5x^{\frac{1}{3}} - 3 = 0$. Give exact answers.`,
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first; fractions allowed)",
        blanks: [{ id: "x1", input: "number", accepted: ["-1/8"], tolerance: 0.0005, wrong: -0.5 }, nb("x2", 27, 3)],
        explanation: t`Let $u = x^{\frac{1}{3}}$: $2u^{2} - 5u - 3 = 0$, $(2u + 1)(u - 3) = 0$, so $u = -\frac{1}{2}$ or $3$. Cube roots can be negative, so both are valid: $x = -\frac{1}{8}$ or $x = 27$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: t`$(\lg x)^{2} - \lg\left(x^{3}\right) + 2 = 0$.`,
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
        blanks: [nb("x1", 10, 1), nb("x2", 100, 2)],
        explanation: t`$\lg\left(x^{3}\right) = 3\lg x$. Let $u = \lg x$: $u^{2} - 3u + 2 = 0$, so $u = 1$ or $2$, giving $x = 10$ or $x = 100$.`,
      }),
    ],
    explanation: t`Each equation is a quadratic in a suitable $u$: $u = 5^{x}$ gives $x = 0.431$ or $0.861$; $u = x^{\frac{1}{3}}$ gives $x = -\frac{1}{8}$ or $27$; $u = \lg x$ gives $x = 10$ or $100$.`,
    hints: [t`$5^{2x} = \left(5^{x}\right)^{2}$.`, "A cube root may be negative, unlike a square root.", t`$\lg\left(x^{3}\right) = 3\lg x$.`],
  });
});
