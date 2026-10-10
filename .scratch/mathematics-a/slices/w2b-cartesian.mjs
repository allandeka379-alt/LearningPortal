// W2b: amaths.complex.cartesian
import { concept, P, t, chk, same, cx, quad } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const FR = (id, list, wrong, tol = 0.001, marks) => ({ id, input: "number", accepted: list, tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const eq = (z, w, label) => { chk(z[0], w[0], 1e-9, `${label} re`); chk(z[1], w[1], 1e-9, `${label} im`); return w; };

concept("amaths.complex.cartesian", { file: "complex/cartesian", keyPrefix: "complex.cartesian" }, (b) => {
  // i^7
  const i7 = [[1, 0], [0, 1], [-1, 0], [0, -1]][7 % 4];
  same(i7, [0, -1]);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Simplify $\mathrm{i}^7$.`,
    options: [
      [t`$-\mathrm{i}$`, t`Correct: $\mathrm{i}^7 = \mathrm{i}^4 \times \mathrm{i}^3 = 1 \times (-\mathrm{i}) = -\mathrm{i}$.`],
      [t`$\mathrm{i}$`, t`This is $\mathrm{i}^5$ (or $\mathrm{i}^1$); $7$ leaves remainder 3 on division by 4, not 1.`],
      [t`$-1$`, t`This is $\mathrm{i}^2$ or $\mathrm{i}^6$; one more factor of $\mathrm{i}$ is needed.`],
      [t`$1$`, t`Only multiples of 4 give 1; $\mathrm{i}^8 = 1$.`],
    ],
    answer: "A",
    explanation: t`Powers of $\mathrm{i}$ repeat every 4: $\mathrm{i}, -1, -\mathrm{i}, 1$. Since $7 = 4 + 3$, $\mathrm{i}^7 = \mathrm{i}^3 = -\mathrm{i}$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the imaginary part of $z = 4 - 5\mathrm{i}$?`,
    options: [
      ["−5", t`Correct: $\mathrm{Im}(z)$ is the real number multiplying $\mathrm{i}$, including its sign.`],
      ["5", "The sign belongs to the imaginary part: the coefficient of i is −5."],
      [t`$-5\mathrm{i}$`, t`The imaginary part is a real number; it does not include $\mathrm{i}$.`],
      ["4", "4 is the real part."],
    ],
    answer: "A",
    explanation: t`For $z = x + \mathrm{i}y$, $\mathrm{Re}(z) = x$ and $\mathrm{Im}(z) = y$. Here $y = -5$.`,
  });

  const p3 = eq(cx.mul([5, 2], [3, -4]), [23, -14], "q3");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Express $(5 + 2\mathrm{i})(3 - 4\mathrm{i})$ in the form $x + \mathrm{i}y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", p3[0], "7"), N("y", p3[1], "-26")],
    explanation: t`$(5 + 2\mathrm{i})(3 - 4\mathrm{i}) = 15 - 20\mathrm{i} + 6\mathrm{i} - 8\mathrm{i}^2 = 15 - 14\mathrm{i} + 8 = 23 - 14\mathrm{i}$. (7 comes from treating $-8\mathrm{i}^2$ as $-8$.)`,
  });

  const q4 = eq(cx.div([1, 3], [2, -1]), [-0.2, 1.4], "q4");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Express $\dfrac{1 + 3\mathrm{i}}{2 - \mathrm{i}}$ in the form $x + \mathrm{i}y$. Give exact values (fractions or decimals).`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [FR("x", ["-1/5", "-0.2"], "0.5"), FR("y", ["7/5", "1.4"], "-3")],
    explanation: t`Multiply top and bottom by $2 + \mathrm{i}$: $\dfrac{(1 + 3\mathrm{i})(2 + \mathrm{i})}{4 + 1} = \dfrac{2 + \mathrm{i} + 6\mathrm{i} - 3}{5} = \dfrac{-1 + 7\mathrm{i}}{5}$. So $x = -\frac{1}{5}$ and $y = \frac{7}{5}$. (Dividing part by part, $\frac{1}{2}$ and $-3$, is not valid.)`,
  });
  chk(q4[0], -1 / 5); chk(q4[1], 7 / 5);

  const zz = cx.mul([4, -3], cx.conj([4, -3]));
  same(zz, [25, 0]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Given $z = 4 - 3\mathrm{i}$, find $zz^{*}$.`,
    options: [
      ["25", t`Correct: $zz^{*} = 4^2 + 3^2 = 25$.`],
      ["7", t`This is $4^2 - 3^2$: the product $(4 - 3\mathrm{i})(4 + 3\mathrm{i})$ gives $16 - 9\mathrm{i}^2 = 16 + 9$.`],
      [t`$7 - 24\mathrm{i}$`, t`This is $z^2$, not $z$ times its conjugate.`],
      ["5", t`This is $|z| = \sqrt{25}$; $zz^{*}$ is $|z|^2$.`],
    ],
    answer: "A",
    explanation: t`$zz^{*} = (x + \mathrm{i}y)(x - \mathrm{i}y) = x^2 + y^2$, always real and non-negative.`,
  });
  chk(cx.mul([4, -3], [4, -3])[0], 7); chk(cx.mul([4, -3], [4, -3])[1], -24);

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`For every complex number $z$, the number $z + z^{*}$ is real.`,
    answer: true,
    explanation: t`$(x + \mathrm{i}y) + (x - \mathrm{i}y) = 2x$, which is real. (By contrast $z - z^{*} = 2\mathrm{i}y$ is imaginary.)`,
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every complex number $z$, the number $z - z^{*}$ is real.`,
    answer: false,
    explanation: t`$(x + \mathrm{i}y) - (x - \mathrm{i}y) = 2\mathrm{i}y$, which is purely imaginary (and is real only when $y = 0$).`,
    hints: [t`Write $z = x + \mathrm{i}y$ and subtract.`],
  });

  const r7 = [[-2, 3], [-2, -3]];
  chk(quad.disc(1, 4, 13), -36);
  for (const r of r7) same(cx.add(cx.add(cx.mul(r, r), [4 * r[0], 4 * r[1]]), [13, 0]).map((v) => Math.round(v * 1e9) / 1e9), [0, 0]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $z^2 + 4z + 13 = 0$. Write the roots as $z = a \pm b\mathrm{i}$ with $b > 0$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [N("a", -2, "2"), N("b", 3, "6")],
    explanation: t`Discriminant $16 - 52 = -36$, so $\sqrt{-36} = 6\mathrm{i}$ and $z = \dfrac{-4 \pm 6\mathrm{i}}{2} = -2 \pm 3\mathrm{i}$. (6 forgets to halve.)`,
  });

  // square roots of -15 + 8i = ±(1 + 4i)
  same(cx.mul([1, 4], [1, 4]), [-15, 8]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the square roots of $-15 + 8\mathrm{i}$, showing all your working. Give the root with positive real part in the form $x + \mathrm{i}y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 1, "4"), N("y", 4, "1")],
    explanation: t`Let $(x + \mathrm{i}y)^2 = -15 + 8\mathrm{i}$: $x^2 - y^2 = -15$ and $2xy = 8$. With $y = \frac{4}{x}$: $x^4 + 15x^2 - 16 = 0$, $(x^2 + 16)(x^2 - 1) = 0$, so $x^2 = 1$ ($x$ real). $x = 1$, $y = 4$: the roots are $\pm(1 + 4\mathrm{i})$.`,
    hints: [t`Equate real parts and imaginary parts of $(x + \mathrm{i}y)^2$.`, t`You get a quadratic in $x^2$; reject the negative value.`],
  });

  same(cx.mul([4, -3], [4, -3]), [7, -24]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the square roots of $7 - 24\mathrm{i}$. Give the root with positive real part in the form $x + \mathrm{i}y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 4, "3"), N("y", -3, "3")],
    explanation: t`$x^2 - y^2 = 7$, $2xy = -24$. With $y = -\frac{12}{x}$: $x^4 - 7x^2 - 144 = 0$, $(x^2 - 16)(x^2 + 9) = 0$, so $x = \pm 4$ and $y = \mp 3$. The roots are $\pm(4 - 3\mathrm{i})$; the one with positive real part is $4 - 3\mathrm{i}$. ($y = +3$ would give $2xy = +24$.)`,
    hints: [t`$2xy$ is negative, so $x$ and $y$ have opposite signs.`],
  });

  const ab = eq(cx.div([13, 1], [1, 2]), [3, -5], "q10");
  same(cx.mul([3, -5], [1, 2]), [13, 1]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The real numbers $a$ and $b$ satisfy $(a + b\mathrm{i})(1 + 2\mathrm{i}) = 13 + \mathrm{i}$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [N("a", ab[0], "5"), N("b", ab[1], "3")],
    explanation: t`Expand: $(a - 2b) + (2a + b)\mathrm{i} = 13 + \mathrm{i}$, so $a - 2b = 13$ and $2a + b = 1$. Solving: $a = 3$, $b = -5$. (Equivalently $a + b\mathrm{i} = \dfrac{13 + \mathrm{i}}{1 + 2\mathrm{i}} = 3 - 5\mathrm{i}$.)`,
    hints: ["Equate real parts and imaginary parts to get two simultaneous equations."],
  });

  // z + 2z* = 9 - 4i → 3x - iy → z = 3 + 4i
  const z11 = [3, 4];
  same(cx.add(z11, cx.mul([2, 0], cx.conj(z11))), [9, -4]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the complex number $z$ such that $z + 2z^{*} = 9 - 4\mathrm{i}$. Give $z$ in the form $x + \mathrm{i}y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 3, "9"), N("y", 4, "-4")],
    explanation: t`With $z = x + \mathrm{i}y$: $x + \mathrm{i}y + 2x - 2\mathrm{i}y = 3x - \mathrm{i}y$. So $3x = 9$ and $-y = -4$: $z = 3 + 4\mathrm{i}$. ($y = -4$ forgets that the conjugate changes the sign of the imaginary part.)`,
    hints: [t`Write $z = x + \mathrm{i}y$ and $z^{*} = x - \mathrm{i}y$.`],
  });

  eq(cx.div([1, 0], [1, -1]), [0.5, 0.5], "q12");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Which of the following equals $\dfrac{1}{1 - \mathrm{i}}$?`,
    options: [
      [t`$\frac{1}{2} + \frac{1}{2}\mathrm{i}$`, t`Correct: $\dfrac{1 + \mathrm{i}}{(1 - \mathrm{i})(1 + \mathrm{i})} = \dfrac{1 + \mathrm{i}}{2}$.`],
      [t`$1 + \mathrm{i}$`, t`The denominator $(1 - \mathrm{i})(1 + \mathrm{i}) = 2$ has been forgotten.`],
      [t`$\frac{1}{2} - \frac{1}{2}\mathrm{i}$`, t`This is $\frac{1}{2}(1 - \mathrm{i})$: multiplying by the conjugate puts $1 + \mathrm{i}$ in the numerator.`],
      [t`$-\frac{1}{2} + \frac{1}{2}\mathrm{i}$`, t`$(1 - \mathrm{i})(1 + \mathrm{i}) = 1 - \mathrm{i}^2 = +2$, not $-2$.`],
    ],
    answer: "A",
    explanation: t`Multiply top and bottom by $1 + \mathrm{i}$; the denominator becomes $1^2 + 1^2 = 2$.`,
    hints: ["Multiply by the conjugate of the denominator."],
  });

  const cube = cx.mul(cx.mul([1, 2], [1, 2]), [1, 2]);
  same(cube, [-11, -2]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the imaginary part of $(1 + 2\mathrm{i})^3$.`,
    value: cube[1], wrong: [8, 2],
    explanation: t`$(1 + 2\mathrm{i})^2 = 1 + 4\mathrm{i} - 4 = -3 + 4\mathrm{i}$. Then $(-3 + 4\mathrm{i})(1 + 2\mathrm{i}) = -3 - 6\mathrm{i} + 4\mathrm{i} + 8\mathrm{i}^2 = -11 - 2\mathrm{i}$. The imaginary part is $-2$. (8 is $(2\mathrm{i})^3$'s coefficient ignoring $\mathrm{i}^3 = -\mathrm{i}$ and the other terms.)`,
    hints: ["Square first, then multiply by (1 + 2i) again."],
  });

  // roots 2 ± 5i → z² − 4z + 29
  chk(2 + 2, 4); chk(2 * 2 + 5 * 5, 29);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`One root of a quadratic equation with real coefficients is $2 - 5\mathrm{i}$. Which equation is it?`,
    options: [
      [t`$z^2 - 4z + 29 = 0$`, t`Correct: the roots are $2 \pm 5\mathrm{i}$, with sum 4 and product $4 + 25 = 29$.`],
      [t`$z^2 + 4z + 29 = 0$`, t`This has roots $-2 \pm 5\mathrm{i}$: the sum of the roots is $-b$, so $b = -4$.`],
      [t`$z^2 - 4z - 21 = 0$`, t`The product $(2 - 5\mathrm{i})(2 + 5\mathrm{i})$ is $4 + 25$, not $4 - 25$.`],
      [t`$z^2 - 4z + 21 = 0$`, t`The product of the roots is $2^2 + 5^2 = 29$.`],
    ],
    answer: "A",
    explanation: t`Real coefficients force the other root to be the conjugate $2 + 5\mathrm{i}$. Then $z^2 - (\text{sum})z + \text{product} = z^2 - 4z + 29$.`,
    hints: ["The other root is the conjugate."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each power of i with its value.",
    pairs: [
      [t`$\mathrm{i}^2$`, t`$-1$`],
      [t`$\mathrm{i}^3$`, t`$-\mathrm{i}$`],
      [t`$\mathrm{i}^4$`, t`$1$`],
      [t`$\mathrm{i}^5$`, t`$\mathrm{i}$`],
    ],
    explanation: t`Each extra factor of $\mathrm{i}$ moves one step round the cycle $\mathrm{i} \to -1 \to -\mathrm{i} \to 1 \to \mathrm{i}$.`,
  });

  const s = cx.mul([1, 1], [1, 1]);
  same(s, [0, 2]);
  same(cx.mul(s, s), [-4, 0]);
  b.proof({
    d: 4, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`Show that $z = 1 + \mathrm{i}$ is a root of the equation $z^4 + 4 = 0$.`,
    points: [
      t`M1 finds $(1 + \mathrm{i})^2 = 1 + 2\mathrm{i} + \mathrm{i}^2 = 2\mathrm{i}$.`,
      t`M1 squares again: $(2\mathrm{i})^2 = 4\mathrm{i}^2 = -4$.`,
      t`A1 concludes $(1 + \mathrm{i})^4 + 4 = -4 + 4 = 0$.`,
    ],
    modelAnswer: t`$$
(1 + \mathrm{i})^2 = 1 + 2\mathrm{i} - 1 = 2\mathrm{i}
$$
$$
(1 + \mathrm{i})^4 = (2\mathrm{i})^2 = -4
$$
$$
(1 + \mathrm{i})^4 + 4 = 0, \text{ so } 1 + \mathrm{i} \text{ is a root.}
$$`,
    explanation: "Squaring twice is quicker than expanding the fourth power with the binomial theorem.",
    hints: ["Find (1 + i)² first."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why, when the quadratic $az^2 + bz + c = 0$ (with $a$, $b$, $c$ real) has a negative discriminant, its two roots are complex conjugates.`,
    points: [
      t`The formula gives $z = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$ with $\sqrt{b^2 - 4ac} = \mathrm{i}k$ for a real $k > 0$.`,
      t`So the roots are $-\frac{b}{2a} \pm \frac{k}{2a}\mathrm{i}$: same real part, imaginary parts of opposite sign, which is a conjugate pair.`,
    ],
    modelAnswer: "With b² − 4ac = −k² (k > 0), the square root is ki, so z = (−b ± ki)/(2a). Both roots have real part −b/(2a) and imaginary parts ±k/(2a), so each is the conjugate of the other.",
    explanation: "The ± in the formula only affects the imaginary part when the discriminant is negative.",
    hints: ["Write the square root of the negative discriminant as ki."],
  });

  // Struct 12: u = 2 + i, v = 1 - 3i
  const u = [2, 1], v = [1, -3];
  const u2 = eq(cx.mul(u, u), [3, 4], "u2");
  const uv = eq(cx.div(u, v), [-0.1, 0.7], "u/v");
  // p u + q v = 7: 2p + q = 7, p - 3q = 0
  const q = 1, p = 3;
  same(cx.add([p * u[0], p * u[1]], [q * v[0], q * v[1]]), [7, 0]);
  for (const r of [u, cx.conj(u)]) same(cx.add(cx.sub(cx.mul(r, r), [4 * r[0], 4 * r[1]]), [5, 0]), [0, 0]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The complex numbers $u$ and $v$ are given by $u = 2 + \mathrm{i}$ and $v = 1 - 3\mathrm{i}$. Do not use a calculator in complex mode.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $u^2$ in the form $x + \mathrm{i}y$.`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [N("x", u2[0], "5"), N("y", u2[1], "2")],
        explanation: t`$(2 + \mathrm{i})^2 = 4 + 4\mathrm{i} + \mathrm{i}^2 = 3 + 4\mathrm{i}$.` }),
      P.fib({ label: "(b)", marks: 1, stem: t`Hence write down the square root of $3 + 4\mathrm{i}$ that has a negative real part, in the form $x + \mathrm{i}y$.`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [N("x", -2, "2"), N("y", -1, "1")],
        explanation: t`The square roots are $\pm u = \pm(2 + \mathrm{i})$; the one with negative real part is $-2 - \mathrm{i}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Find $\dfrac{u}{v}$ in the form $x + \mathrm{i}y$ (exact decimals or fractions).`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [FR("x", ["-1/10", "-0.1"], "2"), FR("y", ["7/10", "0.7"], "-1/3")],
        explanation: t`$\dfrac{(2 + \mathrm{i})(1 + 3\mathrm{i})}{1 + 9} = \dfrac{2 + 6\mathrm{i} + \mathrm{i} - 3}{10} = \dfrac{-1 + 7\mathrm{i}}{10}$.` }),
      P.fib({ label: "(d)", marks: 3, stem: t`Find the real numbers $p$ and $q$ such that $pu + qv = 7$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [N("p", p, "1"), N("q", q, "3")],
        explanation: t`$p(2 + \mathrm{i}) + q(1 - 3\mathrm{i}) = (2p + q) + (p - 3q)\mathrm{i} = 7$. So $2p + q = 7$ and $p - 3q = 0$: $p = 3$, $q = 1$.` }),
      P.proof({ label: "(e)", marks: 3, stem: t`Show that $u$ and $u^{*}$ are the roots of the equation $z^2 - 4z + 5 = 0$.`,
        points: [t`M1 substitutes $u$: $3 + 4\mathrm{i} - 8 - 4\mathrm{i} + 5 = 0$.`, t`M1 uses $u^{*} = 2 - \mathrm{i}$ (or the quadratic formula / conjugate-pair argument).`, t`A1 shows both satisfy the equation (or sum 4 and product 5).`],
        modelAnswer: t`$$
\text{At } z = u: \quad u^2 - 4u + 5 = (3 + 4\mathrm{i}) - (8 + 4\mathrm{i}) + 5 = 0
$$
$$
(u^{*})^2 = (2 - \mathrm{i})^2 = 3 - 4\mathrm{i}, \quad (3 - 4\mathrm{i}) - (8 - 4\mathrm{i}) + 5 = 0
$$
Both $u$ and $u^{*}$ satisfy the equation, and a quadratic has exactly two roots.`,
        explanation: "Substitute each root, or note that the sum of the roots is 4 and the product is uu* = 5." }),
    ],
    explanation: "Cartesian arithmetic: squaring, dividing by the conjugate, equating parts and checking roots.",
    hints: ["Equal complex numbers have equal real parts and equal imaginary parts.", t`$uu^{*} = |u|^2 = 5$.`],
  });

  // Struct 13: z + iw = 3 + 2i, 2z - w = 3 + 3i; z = 2 + i, w = 1 - i
  const z = [2, 1], w = [1, -1];
  same(cx.add(z, cx.mul([0, 1], w)), [3, 2]);
  same(cx.sub([2 * z[0], 2 * z[1]], w), [3, 3]);
  same(cx.mul(w, [1, 2]), [3, 1]);
  const zw = eq(cx.div(z, w), [0.5, 1.5], "z/w");
  const zws = same(cx.mul(z, cx.conj(w)), [1, 3]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The complex numbers $z$ and $w$ satisfy the simultaneous equations $z + \mathrm{i}w = 3 + 2\mathrm{i}$ and $2z - w = 3 + 3\mathrm{i}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $(1 + 2\mathrm{i})w = 3 + \mathrm{i}$.`,
        points: [t`M1 makes $z$ the subject of the first equation: $z = 3 + 2\mathrm{i} - \mathrm{i}w$.`, "M1 substitutes into the second equation and expands.", t`A1 reaches $(1 + 2\mathrm{i})w = 3 + \mathrm{i}$ correctly.`],
        modelAnswer: t`$$
z = 3 + 2\mathrm{i} - \mathrm{i}w
$$
$$
2(3 + 2\mathrm{i} - \mathrm{i}w) - w = 3 + 3\mathrm{i}
$$
$$
6 + 4\mathrm{i} - 2\mathrm{i}w - w = 3 + 3\mathrm{i}
$$
$$
(1 + 2\mathrm{i})w = 3 + \mathrm{i}
$$`,
        explanation: "Eliminate z exactly as you would with real simultaneous equations." }),
      P.fib({ label: "(b)", marks: 3, stem: t`Hence find $w$ in the form $x + \mathrm{i}y$.`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [N("x", w[0], "3"), N("y", w[1], "1")],
        explanation: t`$w = \dfrac{(3 + \mathrm{i})(1 - 2\mathrm{i})}{1 + 4} = \dfrac{3 - 6\mathrm{i} + \mathrm{i} + 2}{5} = \dfrac{5 - 5\mathrm{i}}{5} = 1 - \mathrm{i}$.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Find $z$ in the form $x + \mathrm{i}y$.`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [N("x", z[0], "4"), N("y", z[1], "3")],
        explanation: t`$z = 3 + 2\mathrm{i} - \mathrm{i}(1 - \mathrm{i}) = 3 + 2\mathrm{i} - \mathrm{i} + \mathrm{i}^2 = 2 + \mathrm{i}$.` }),
      P.fib({ label: "(d)", marks: 3, stem: t`Find $\dfrac{z}{w}$ in the form $x + \mathrm{i}y$.`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [FR("x", ["1/2", "0.5"], "2"), FR("y", ["3/2", "1.5"], "-1")],
        explanation: t`$\dfrac{(2 + \mathrm{i})(1 + \mathrm{i})}{1 + 1} = \dfrac{2 + 2\mathrm{i} + \mathrm{i} - 1}{2} = \dfrac{1 + 3\mathrm{i}}{2}$.` }),
      P.fib({ label: "(e)", marks: 2, stem: t`Find $zw^{*}$ in the form $x + \mathrm{i}y$.`, template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [N("x", zws[0], "3"), N("y", zws[1], "-1")],
        explanation: t`$w^{*} = 1 + \mathrm{i}$; $(2 + \mathrm{i})(1 + \mathrm{i}) = 2 + 3\mathrm{i} - 1 = 1 + 3\mathrm{i}$. (Notice $zw^{*} = |w|^2 \cdot \frac{z}{w} = 2 \times \frac{1 + 3\mathrm{i}}{2}$.)` }),
    ],
    explanation: "Simultaneous equations with complex unknowns are solved by elimination; division uses the conjugate.",
    hints: ["Make z the subject of the first equation.", "Divide by 1 + 2i by multiplying by 1 − 2i."],
  });
  chk(zw[0], 0.5);

  b.card("DEFINITION", "The imaginary unit", t`$\mathrm{i}$ with $\mathrm{i}^2 = -1$; e.g. $\sqrt{-25} = 5\mathrm{i}$.`);
  b.card("DEFINITION", "Real and imaginary parts", t`For $z = x + \mathrm{i}y$: $\mathrm{Re}(z) = x$, $\mathrm{Im}(z) = y$ (both real).`);
  b.card("DEFINITION", "Complex conjugate", t`$z^{*} = x - \mathrm{i}y$: change the sign of the imaginary part.`);
  b.card("FORMULA", "z times its conjugate", t`$zz^{*} = x^2 + y^2$ (real, non-negative).`);
  b.card("CONCEPT", "Dividing complex numbers", "Multiply numerator and denominator by the conjugate of the denominator, then split into real and imaginary parts.");
  b.card("FACT", "Equality of complex numbers", t`$a + \mathrm{i}b = c + \mathrm{i}d \iff a = c$ and $b = d$ (one complex equation gives two real ones).`);
  b.card("CONCEPT", "Square roots of a + ib", t`Set $(x + \mathrm{i}y)^2 = a + \mathrm{i}b$: $x^2 - y^2 = a$, $2xy = b$; solve the quadratic in $x^2$ and reject negative $x^2$.`);
  b.card("FACT", "Quadratic with negative discriminant", t`Roots $p \pm \mathrm{i}q$, a conjugate pair; sum $2p$, product $p^2 + q^2$.`);
  b.card("FACT", "Powers of i", t`$\mathrm{i}, -1, -\mathrm{i}, 1$ repeat with period 4: $\mathrm{i}^{4k} = 1$.`);
});
