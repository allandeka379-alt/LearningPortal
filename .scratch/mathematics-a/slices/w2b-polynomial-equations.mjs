// W2b: amaths.complex.polynomial-equations
import { concept, P, t, chk, same, cx, poly, ZP } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
/** p(z) for a real coefficient list (highest power first) at a complex z. */
const pev = (c, z) => c.reduce((acc, a) => cx.add(cx.mul(acc, z), [a, 0]), [0, 0]);
const isRoot = (c, z, l) => { const v = pev(c, z); chk(v[0], 0, 1e-9, `${l} re`); chk(v[1], 0, 1e-9, `${l} im`); };
/** Monic quadratic with roots a ± bi. */
const qf = (a, s) => [1, -2 * a, a * a + s * s];
const T = (c) => poly.tex(c, "z");

concept("amaths.complex.polynomial-equations", { file: "complex/polynomial-equations", keyPrefix: "complex.polynomial-equations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The number $3 - 4\mathrm{i}$ is a root of a polynomial equation with real coefficients. Which other number must also be a root?`,
    options: [
      [t`$3 + 4\mathrm{i}$`, "Correct: non-real roots of a real polynomial come in conjugate pairs."],
      [t`$-3 + 4\mathrm{i}$`, t`This is $-(3 - 4\mathrm{i})$, the negative, not the conjugate.`],
      [t`$-3 - 4\mathrm{i}$`, "Only the sign of the imaginary part changes in the conjugate."],
      [t`$4 - 3\mathrm{i}$`, "Swapping the real and imaginary parts does not give the conjugate."],
    ],
    answer: "A",
    explanation: t`If $p(w) = 0$ and $p$ has real coefficients, then $p(w^{*}) = 0$. The conjugate of $3 - 4\mathrm{i}$ is $3 + 4\mathrm{i}$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "A cubic equation with real coefficients can have three non-real roots.",
    answer: false,
    explanation: "Non-real roots of a real polynomial come in conjugate pairs, so a cubic has 0 or 2 non-real roots. With three roots in all, at least one is real.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`A quartic equation with real coefficients has roots $1 + \mathrm{i}$ and $2 - 3\mathrm{i}$. How many real roots does it have?`,
    options: [
      ["0", t`Correct: the conjugates $1 - \mathrm{i}$ and $2 + 3\mathrm{i}$ are also roots, which accounts for all four.`],
      ["2", "The two given roots bring their conjugates, so no roots are left over."],
      ["1", "A quartic has four roots; with two conjugate pairs there is no room for a real root."],
      ["4", "The roots given are not real, so at most two of the four could be real; in fact none are."],
    ],
    answer: "A",
    explanation: t`Four roots: $1 \pm \mathrm{i}$ and $2 \pm 3\mathrm{i}$. None of them is real.`,
  });

  const f4 = qf(4, 1);
  same(f4, [1, -8, 17]);
  isRoot(f4, [4, 1], "q4");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the quadratic equation with real coefficients, of the form $z^2 + bz + c = 0$, that has $4 - \mathrm{i}$ as one root.`,
    template: "b = {{blank:b}}, c = {{blank:c}}",
    blanks: [N("b", f4[1], "8"), N("c", f4[2], "15")],
    explanation: t`The roots are $4 \pm \mathrm{i}$: sum 8, product $16 + 1 = 17$. So $z^2 - 8z + 17 = 0$. (15 uses $16 - 1$; $\mathrm{i}^2 = -1$ makes the product $16 + 1$.)`,
  });

  // (z² + 2z + 5)(z − 4) = z³ − 2z² − 3z − 20
  const c5 = poly.mul(qf(-1, 2), [1, -4]);
  same(c5, [1, -2, -3, -20]);
  isRoot(c5, [-1, 2], "q5"); isRoot(c5, [4, 0], "q5 real");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $-1 + 2\mathrm{i}$ is a root of $${T(c5)} = 0$, find the real root.`,
    prefix: "z =", value: 4, wrong: [-4, 20],
    explanation: t`$-1 - 2\mathrm{i}$ is also a root, giving the factor $z^2 + 2z + 5$. Then $${T(c5)} = (z^2 + 2z + 5)(z - 4)$ (constant terms: $5 \times (-4) = -20$). The real root is $z = 4$.`,
    hints: ["Find the quadratic factor from the conjugate pair.", "Compare constant terms to find the linear factor."],
  });

  // (z² − 2z + 2)(z² + 4)
  const c6 = poly.mul(qf(1, 1), [1, 0, 4]);
  same(c6, [1, -2, 6, -8, 8]);
  isRoot(c6, [1, -1], "q6"); isRoot(c6, [0, 2], "q6 2i");
  same(poly.div(c6, qf(1, 1)), { q: [1, 0, 4], r: [0] });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $1 - \mathrm{i}$ is a root of $${T(c6)} = 0$, the polynomial factorises as $(z^2 - 2z + 2)(z^2 + pz + q)$. Find $p$ and $q$, and the remaining roots $\pm k\mathrm{i}$ with $k > 0$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, k = {{blank:k}}",
    blanks: [N("p", 0, "-2"), N("q", 4, "2"), N("k", 2, "4")],
    explanation: t`The conjugate pair $1 \pm \mathrm{i}$ gives $z^2 - 2z + 2$. Constant terms: $2q = 8$, $q = 4$; $z^3$ terms: $p - 2 = -2$, $p = 0$. Then $z^2 + 4 = 0$ gives $z = \pm 2\mathrm{i}$, so $k = 2$.`,
    hints: ["Compare the constant terms and the z³ terms."],
  });

  // 2 − i root of z³ + pz² + qz − 10 → p = −6, q = 13
  const c7 = poly.mul(qf(2, 1), [1, -2]);
  same(c7, [1, -6, 13, -10]);
  isRoot(c7, [2, -1], "q7");
  const w = [2, -1], w2 = cx.mul(w, w), w3 = cx.mul(w2, w);
  same(w2, [3, -4]); same(w3, [2, -11]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $z = 2 - \mathrm{i}$ is a root of $z^3 + pz^2 + qz - 10 = 0$, where $p$ and $q$ are real, find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [N("p", c7[1], "6"), N("q", c7[2], "-13")],
    explanation: t`$(2 - \mathrm{i})^2 = 3 - 4\mathrm{i}$ and $(2 - \mathrm{i})^3 = 2 - 11\mathrm{i}$. Substituting: $(2 - 11\mathrm{i}) + p(3 - 4\mathrm{i}) + q(2 - \mathrm{i}) - 10 = 0$. Real: $3p + 2q = 8$; imaginary: $-11 - 4p - q = 0$. Solving: $p = -6$, $q = 13$. (Check: $(z^2 - 4z + 5)(z - 2) = z^3 - 6z^2 + 13z - 10$.)`,
    hints: [t`Find $(2 - \mathrm{i})^2$ first, then $(2 - \mathrm{i})^3$.`, "Set the real part and the imaginary part to zero."],
  });
  chk(3 * -6 + 2 * 13, 8); chk(-11 - 4 * -6 - 13, 0);

  const c9 = poly.mul([1, 2], qf(1, 3));
  same(c9, [1, 0, 6, 20]);
  isRoot(c9, [1, 3], "q9");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the cubic polynomial $p(z)$ with real coefficients and leading coefficient 1 that has roots $-2$ and $1 + 3\mathrm{i}$. Type it expanded, e.g. z^3-2z^2+5z-1.`,
    accepted: ["z^3+6z+20", "z³+6z+20", "z^3+0z^2+6z+20", "20+6z+z^3"],
    wrong: ["z^3+2z^2+6z+20"],
    explanation: t`The third root is $1 - 3\mathrm{i}$; the pair gives $z^2 - 2z + 10$. Then $(z + 2)(z^2 - 2z + 10) = z^3 - 2z^2 + 10z + 2z^2 - 4z + 20 = z^3 + 6z + 20$. The $z^2$ terms cancel.`,
    hints: ["Do not forget the conjugate root."],
  });

  same(qf(1, 2), [1, -2, 5]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $1 - 2\mathrm{i}$ is a root of a cubic equation with real coefficients, which quadratic must be a factor of the cubic?`,
    options: [
      [t`$z^2 - 2z + 5$`, t`Correct: roots $1 \pm 2\mathrm{i}$ have sum 2 and product $1 + 4 = 5$.`],
      [t`$z^2 + 2z + 5$`, t`This has roots $-1 \pm 2\mathrm{i}$: the middle coefficient is minus the sum of the roots.`],
      [t`$z^2 - 2z - 3$`, t`The product is $1^2 + 2^2 = 5$, not $1^2 - 2^2$.`],
      [t`$z^2 - 2z + 3$`, t`The product of the roots is $(1 - 2\mathrm{i})(1 + 2\mathrm{i}) = 1 + 4 = 5$.`],
    ],
    answer: "A",
    explanation: t`$(z - (1 - 2\mathrm{i}))(z - (1 + 2\mathrm{i})) = (z - 1)^2 + 4 = z^2 - 2z + 5$.`,
    hints: ["Find the sum and the product of the conjugate pair."],
  });

  const c11 = poly.mul(qf(-1, 1), [1, 0, 1]);
  same(c11, [1, 2, 3, 2, 2]);
  isRoot(c11, [-1, 1], "q11"); isRoot(c11, [0, 1], "q11 i");
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Given that $-1 + \mathrm{i}$ is a root of $${T(c11)} = 0$, write the quartic as $(z^2 + 2z + 2)(z^2 + az + b)$ and hence state its other roots. Give $a$, $b$, and the imaginary part $k > 0$ of the roots $\pm k\mathrm{i}$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, k = {{blank:k}}",
    blanks: [N("a", 0, "2"), N("b", 1, "2"), N("k", 1, "2")],
    explanation: t`The pair $-1 \pm \mathrm{i}$ gives $z^2 + 2z + 2$. Constant: $2b = 2$, $b = 1$; $z^3$: $a + 2 = 2$, $a = 0$. So $z^2 + 1 = 0$ and $z = \pm\mathrm{i}$. All four roots: $-1 \pm \mathrm{i}$, $\pm\mathrm{i}$.`,
    hints: [t`The conjugate pair $-1 \pm \mathrm{i}$ has sum $-2$ and product 2.`],
  });

  // ZIMSEC quintic: roots 1, ±2i, 1 ± i
  const c12 = poly.mul(poly.mul([1, -1], [1, 0, 4]), qf(1, 1));
  same(c12, [1, -3, 8, -14, 16, -8]);
  isRoot(c12, [0, 2], "q12 2i"); isRoot(c12, [1, 1], "q12 1+i"); isRoot(c12, [1, 0], "q12 1");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`The equation $${T(c12)} = 0$ has roots $2\mathrm{i}$ and $1 + \mathrm{i}$. Find its real root.`,
    prefix: "z =", value: 1, wrong: [8, -1],
    explanation: t`Real coefficients give the roots $-2\mathrm{i}$ and $1 - \mathrm{i}$ too, so $(z^2 + 4)(z^2 - 2z + 2) = z^4 - 2z^3 + 6z^2 - 8z + 8$ is a factor. Comparing constant terms, the remaining factor is $z - 1$ ($8 \times (-1) = -8$), so the real root is $z = 1$.`,
    hints: ["Each given root brings its conjugate: four roots are known.", "Compare constant terms to find the last factor."],
  });
  same(poly.mul([1, 0, 4], qf(1, 1)), [1, -2, 6, -8, 8]);

  isRoot([1, 0, 4], [0, 2], "q13");
  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $2\mathrm{i}$ is a root of a cubic equation with real coefficients, then $z^2 + 4$ is a factor of the cubic.`,
    answer: true,
    explanation: t`$-2\mathrm{i}$ is also a root, and $(z - 2\mathrm{i})(z + 2\mathrm{i}) = z^2 - 4\mathrm{i}^2 = z^2 + 4$.`,
    hints: ["What is the conjugate of 2i?"],
  });

  const c14 = poly.mul([1, -2], qf(1, 1));
  chk(poly.eval(c14, 0), -4);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The cubic polynomial $f(z)$ has real coefficients and leading coefficient 1. Given that $f(2) = 0$ and $f(1 + \mathrm{i}) = 0$, find $f(0)$.`,
    value: -4, wrong: [4, -2],
    explanation: t`$f(z) = (z - 2)(z^2 - 2z + 2)$, since $1 - \mathrm{i}$ is also a root. So $f(0) = (-2)(2) = -4$. (4 forgets the sign of $-2$; $-2$ forgets the conjugate root.)`,
    hints: ["Write f(z) as a product of factors first."],
  });

  // Proof: 2 + 3i root of z³ − 3z² + 9z + 13
  const c15 = poly.mul(qf(2, 3), [1, 1]);
  same(c15, [1, -3, 9, 13]);
  const u = [2, 3], u2 = cx.mul(u, u), u3 = cx.mul(u2, u);
  same(u2, [-5, 12]); same(u3, [-46, 9]);
  isRoot(c15, u, "q15");
  b.proof({
    d: 4, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Show that $2 + 3\mathrm{i}$ is a root of $z^3 - 3z^2 + 9z + 13 = 0$, and hence find the other two roots.`,
    points: [
      t`M1 finds $(2 + 3\mathrm{i})^2 = -5 + 12\mathrm{i}$ and $(2 + 3\mathrm{i})^3 = -46 + 9\mathrm{i}$.`,
      t`A1 substitutes and simplifies to 0 with all working shown.`,
      t`M1 states $2 - 3\mathrm{i}$ is a root (real coefficients) and forms $z^2 - 4z + 13$.`,
      t`A1 finds the factor $z + 1$ and the third root $-1$.`,
    ],
    modelAnswer: t`$$
(2 + 3\mathrm{i})^2 = 4 + 12\mathrm{i} - 9 = -5 + 12\mathrm{i}, \qquad (2 + 3\mathrm{i})^3 = (-5 + 12\mathrm{i})(2 + 3\mathrm{i}) = -46 + 9\mathrm{i}
$$
$$
(-46 + 9\mathrm{i}) - 3(-5 + 12\mathrm{i}) + 9(2 + 3\mathrm{i}) + 13 = (-46 + 15 + 18 + 13) + (9 - 36 + 27)\mathrm{i} = 0
$$
The coefficients are real, so $2 - 3\mathrm{i}$ is a root and $z^2 - 4z + 13$ is a factor.
$$
z^3 - 3z^2 + 9z + 13 = (z^2 - 4z + 13)(z + 1)
$$
The other roots are $2 - 3\mathrm{i}$ and $-1$.`,
    explanation: "Substitute with every power worked out, then use the conjugate pair to factorise.",
    hints: [t`Work out $z^2$ first, then $z^3 = z^2 \times z$.`],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why every cubic equation with real coefficients has at least one real root.",
    points: [
      "A cubic has exactly three roots (counted with multiplicity) in the complex numbers.",
      "Non-real roots come in conjugate pairs, so there are 0 or 2 of them; the remaining root(s), at least one, must be real.",
    ],
    modelAnswer: "A cubic has three complex roots. Because the coefficients are real, any non-real root comes with its conjugate, so non-real roots come two at a time. Three is odd, so at least one root is left unpaired, and it must be real.",
    explanation: "Odd degree plus conjugate pairing forces a real root.",
    hints: ["Count the roots and think about pairs."],
  });

  for (const [a, s, c] of [[1, 1, [1, -2, 2]], [0, 3, [1, 0, 9]], [-2, 1, [1, 4, 5]], [3, 2, [1, -6, 13]]]) same(qf(a, s), c);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each conjugate pair of roots with its real quadratic factor.",
    pairs: [
      [t`$1 \pm \mathrm{i}$`, t`$z^2 - 2z + 2$`],
      [t`$\pm 3\mathrm{i}$`, t`$z^2 + 9$`],
      [t`$-2 \pm \mathrm{i}$`, t`$z^2 + 4z + 5$`],
      [t`$3 \pm 2\mathrm{i}$`, t`$z^2 - 6z + 13$`],
    ],
    explanation: t`For roots $a \pm b\mathrm{i}$ the factor is $z^2 - 2az + (a^2 + b^2)$.`,
  });

  // Struct 12: (z² − 2z + 2)(z² − 4z + 13)
  const c18 = poly.mul(qf(1, 1), qf(2, 3));
  same(c18, [1, -6, 23, -34, 26]);
  const r = [1, 1], r2 = cx.mul(r, r), r3 = cx.mul(r2, r), r4 = cx.mul(r3, r);
  same(r2, [0, 2]); same(r3, [-2, 2]); same(r4, [-4, 0]);
  isRoot(c18, r, "q18");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The polynomial $p(z)$ is defined by $p(z) = ${T(c18)}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $1 + \mathrm{i}$ is a root of $p(z) = 0$.`,
        points: [t`M1 finds the powers $(1 + \mathrm{i})^2 = 2\mathrm{i}$, $(1 + \mathrm{i})^3 = -2 + 2\mathrm{i}$, $(1 + \mathrm{i})^4 = -4$.`, "M1 substitutes all terms.", "A1 shows the real and imaginary parts are both 0."],
        modelAnswer: t`$$
(1 + \mathrm{i})^2 = 2\mathrm{i}, \quad (1 + \mathrm{i})^3 = -2 + 2\mathrm{i}, \quad (1 + \mathrm{i})^4 = -4
$$
$$
p(1 + \mathrm{i}) = -4 - 6(-2 + 2\mathrm{i}) + 23(2\mathrm{i}) - 34(1 + \mathrm{i}) + 26
$$
$$
= (-4 + 12 - 34 + 26) + (-12 + 46 - 34)\mathrm{i} = 0
$$`,
        explanation: "Square twice to get the fourth power quickly." }),
      P.expr({ label: "(b)", marks: 1, stem: t`Write down another root of $p(z) = 0$, in the form $x + \mathrm{i}y$ (type e.g. 3-2i).`,
        accepted: ["1-i", "-i+1", "1+(-1)i", "1-1i"], wrong: ["-1-i"],
        explanation: t`The coefficients are real, so the conjugate $1 - \mathrm{i}$ is a root.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Hence find a quadratic factor of $p(z)$ in the form $z^2 + bz + c$.`, template: "b = {{blank:b}}, c = {{blank:c}}",
        blanks: [N("b", -2, "2"), N("c", 2, "0")],
        explanation: t`$(z - 1 - \mathrm{i})(z - 1 + \mathrm{i}) = (z - 1)^2 + 1 = z^2 - 2z + 2$.` }),
      P.fib({ label: "(d)", marks: 3, stem: t`Find the other quadratic factor of $p(z)$, in the form $z^2 + dz + e$.`, template: "d = {{blank:d}}, e = {{blank:e}}",
        blanks: [N("d", -4, "-6", 1), N("e", 13, "26", 2)],
        explanation: t`$p(z) = (z^2 - 2z + 2)(z^2 + dz + e)$. Constant: $2e = 26$, $e = 13$. $z^3$: $d - 2 = -6$, $d = -4$. Check $z$: $2d - 2e = -8 - 26 = -34$.` }),
      P.fib({ label: "(e)", marks: 3, stem: t`Hence find the remaining roots of $p(z) = 0$, written as $a \pm b\mathrm{i}$ with $b > 0$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [N("a", 2, "4", 1), N("b", 3, "9", 2)],
        explanation: t`$z^2 - 4z + 13 = 0$: $z = \dfrac{4 \pm \sqrt{16 - 52}}{2} = \dfrac{4 \pm 6\mathrm{i}}{2} = 2 \pm 3\mathrm{i}$.` }),
    ],
    explanation: "Substitute, use the conjugate pair to get one quadratic factor, compare coefficients for the other, then solve.",
    hints: ["Real coefficients: the conjugate is also a root.", "Compare the constant terms and the z³ terms."],
  });
  isRoot(c18, [2, 3], "q18 2+3i");
  same(poly.div(c18, qf(1, 1)), { q: [1, -4, 13], r: [0] });

  // Struct 13: 3 − i root of z³ + az² + bz − 20 → a = −8, b = 22, real root 2; triangle area 1
  const c19 = poly.mul(qf(3, 1), [1, -2]);
  same(c19, [1, -8, 22, -20]);
  const s = [3, -1], s2 = cx.mul(s, s), s3 = cx.mul(s2, s);
  same(s2, [8, -6]); same(s3, [18, -26]);
  isRoot(c19, s, "q19");
  chk(18 + 8 * -8 + 3 * 22 - 20, 0); chk(-26 - 6 * -8 - 22, 0);
  const area = 0.5 * Math.abs((3 - 2) * (-1 - 0) - (3 - 2) * (1 - 0));
  chk(area, 1);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The equation $z^3 + az^2 + bz - 20 = 0$, where $a$ and $b$ are real, has a root $z = 3 - \mathrm{i}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`Find $(3 - \mathrm{i})^2$ and $(3 - \mathrm{i})^3$ in the form $x + \mathrm{i}y$.`, template: "Square: real part {{blank:a}}, imaginary part {{blank:b}}. Cube: real part {{blank:c}}, imaginary part {{blank:d}}.",
        blanks: [N("a", s2[0], "10"), N("b", s2[1], "6"), N("c", s3[0], "24"), N("d", s3[1], "-18")],
        explanation: t`$(3 - \mathrm{i})^2 = 9 - 6\mathrm{i} - 1 = 8 - 6\mathrm{i}$; $(8 - 6\mathrm{i})(3 - \mathrm{i}) = 24 - 8\mathrm{i} - 18\mathrm{i} - 6 = 18 - 26\mathrm{i}$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Hence find $a$ and $b$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [N("a", -8, "8", 2), N("b", 22, "-22", 2)],
        explanation: t`$(18 - 26\mathrm{i}) + a(8 - 6\mathrm{i}) + b(3 - \mathrm{i}) - 20 = 0$. Real: $8a + 3b = 2$. Imaginary: $-26 - 6a - b = 0$. Solving: $a = -8$, $b = 22$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the real root of the equation.", prefix: "z =", value: 2, wrong: [-2, 20],
        explanation: t`The pair $3 \pm \mathrm{i}$ gives $z^2 - 6z + 10$; constant terms give $10 \times (-2) = -20$, so the factor is $z - 2$ and the real root is 2.` }),
      P.num({ label: "(d)", marks: 3, stem: "The three roots are shown as points on an Argand diagram. Find the area of the triangle they form.", value: area, unit: "units²", wrong: [2, 0.5],
        explanation: t`The vertices are $(3, 1)$, $(3, -1)$ and $(2, 0)$. The side from $(3, 1)$ to $(3, -1)$ has length 2 and the third vertex is 1 unit from the line $x = 3$, so the area is $\frac{1}{2} \times 2 \times 1 = 1$.` }),
    ],
    explanation: "Substitute the root, equate real and imaginary parts, then use the conjugate pair to factorise.",
    hints: ["Equate real parts and imaginary parts to zero.", "Conjugate roots are mirror images in the real axis."],
  });

  b.card("FACT", "Conjugate root theorem", t`If a polynomial has real coefficients and $w$ is a root, then $w^{*}$ is a root.`);
  b.card("FORMULA", "Quadratic factor for a ± bi", t`$z^2 - 2az + (a^2 + b^2)$`);
  b.card("FACT", "Number of roots", "A polynomial of degree n has exactly n complex roots, counted with multiplicity.");
  b.card("FACT", "Real cubics", "Either three real roots, or one real root and one conjugate pair: always at least one real root.");
  b.card("CONCEPT", "Solving with one complex root given", "Write the conjugate, form the quadratic factor, divide or compare coefficients, solve the remaining factor.");
  b.card("CONCEPT", "Finding unknown coefficients", "Substitute the root, simplify powers, then set the real part and the imaginary part to zero.");
  b.card("CONCEPT", "Building a polynomial from roots", "Include the conjugate of every non-real root, then multiply the factors.");
  b.card("FACT", "ZIMSEC degree", "ZIMSEC asks for polynomial equations up to degree five; Cambridge P3 usually up to four.", undefined, { applies: ZP });
  b.card("CONCEPT", "Quick power of 1 + i", t`$(1 + \mathrm{i})^2 = 2\mathrm{i}$, so $(1 + \mathrm{i})^4 = -4$.`);
});
