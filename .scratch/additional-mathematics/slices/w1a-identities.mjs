// W1a: amath.algebra.identities (ZIMSEC only) — identities, equating coefficients, substitution.
import { concept, P, t, chk, same, poly, quad } from "../lib.mjs";

const nb = (id, v, w) => ({ id, input: "number", accepted: [v], wrong: w });

concept("amath.algebra.identities", { file: "algebra/identities", keyPrefix: "algebra.identities" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these statements is an identity?",
    options: [
      [t`$(x - 1)(x + 1) \equiv x^{2} - 1$`, "Correct: expanding the left side gives the right side for every value of x."],
      [t`$2x + 3 = 7$`, "This is an equation, true only when x = 2."],
      [t`$x^{2} = 4x$`, "This is an equation, true only when x = 0 or x = 4."],
      [t`$(x + 2)^{2} = x^{2} + 4$`, t`False in general: $(x + 2)^{2} = x^{2} + 4x + 4$, so this holds only when $x = 0$.`],
    ],
    answer: "A",
    explanation: "An identity is true for every value of the variable; an equation is true only for particular values.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For how many values of $x$ is the identity $2(x - 4) + 3 \equiv 2x - 5$ true?`,
    options: [
      ["For every value of x", "Correct: an identity holds for all values of the variable."],
      ["For exactly one value of x", "That describes a linear equation, not an identity."],
      ["For no value of x", "Expanding the left side gives exactly 2x − 5."],
      ["For exactly two values of x", "That is typical of a quadratic equation, not an identity."],
    ],
    answer: "A",
    explanation: t`$2(x - 4) + 3 = 2x - 8 + 3 = 2x - 5$, identical to the right side, so it holds for every $x$.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$x^{2} - 5x + 6 = 0$ is an identity.`,
    answer: false,
    explanation: t`It is an equation: it is true only for $x = 2$ and $x = 3$. For example $x = 0$ gives $6 \neq 0$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $ax^{2} + bx + c \equiv 4x^{2} - 3$, then $b = 0$.`,
    answer: true,
    explanation: t`The right side has no $x$ term, so its coefficient of $x$ is 0. Equating coefficients: $a = 4$, $b = 0$, $c = -3$.`,
  });

  const c4 = quad.completeSquare(2, 12, 13);
  same([c4.a, c4.p, c4.q], [2, 3, -5]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given that $2x^{2} + 12x + 13 \equiv a(x + b)^{2} + c$, find $a$, $b$ and $c$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [nb("a", 2, 1), nb("b", 3, 6), nb("c", -5, 4)],
    explanation: t`$a(x + b)^{2} + c = ax^{2} + 2abx + ab^{2} + c$. So $a = 2$; $2ab = 12$ gives $b = 3$; $ab^{2} + c = 13$ gives $18 + c = 13$, $c = -5$.`,
  });

  // 5 + 8x − 2x^2 ≡ p − q(x − r)^2: 13 − 2(x − 2)^2
  same(poly.sub([13], poly.mul([2], poly.mul([1, -2], [1, -2]))), [-2, 8, 5]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $5 + 8x - 2x^{2}$ in the form $p - q(x - r)^{2}$, where $p$, $q$ and $r$ are constants.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [nb("p", 13, -3), nb("q", 2, -2), nb("r", 2, -2)],
    explanation: t`$p - q(x - r)^{2} = -qx^{2} + 2qrx + p - qr^{2}$. $x^{2}$: $-q = -2$, $q = 2$. $x$: $2qr = 8$, $r = 2$. Constant: $p - qr^{2} = 5$, $p - 8 = 5$, $p = 13$. So $5 + 8x - 2x^{2} \equiv 13 - 2(x - 2)^{2}$.`,
    hints: [t`Expand $p - q(x - r)^{2}$ fully.`, t`Compare the $x^{2}$ coefficients first: $-q = -2$.`],
  });

  // x^3 − 2x^2 + 4 ≡ (x − 1)(x^2 − x − 1) + 3
  same(poly.add(poly.mul([1, -1], [1, -1, -1]), [3]), [1, -2, 0, 4]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $x^{3} - 2x^{2} + 4 \equiv (x - 1)\left(Ax^{2} + Bx + C\right) + R$, find $A$, $B$, $C$ and $R$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}, R = {{blank:R}}",
    blanks: [nb("A", 1, 0), nb("B", -1, -3), nb("C", -1, -4), nb("R", 3, 0)],
    explanation: t`$x = 1$: $1 - 2 + 4 = R$, so $R = 3$. $x^{3}$: $A = 1$. Constant: $-C + R = 4$, so $C = -1$. $x^{2}$: $B - A = -2$, so $B = -1$. Check $x$: $C - B = -1 + 1 = 0$. ✓`,
    hints: ["Substitute x = 1 to find R at once.", "Then compare the x³, constant and x² coefficients."],
  });

  // A(x + 2) + B(x − 3) ≡ 4x + 13: A = 5, B = −1
  same(poly.add(poly.mul([5], [1, 2]), poly.mul([-1], [1, -3])), [4, 13]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the constants $A$ and $B$ such that $4x + 13 \equiv A(x + 2) + B(x - 3)$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}",
    blanks: [nb("A", 5, 1), nb("B", -1, 1)],
    explanation: t`Put $x = 3$: $25 = 5A$, so $A = 5$. Put $x = -2$: $5 = -5B$, so $B = -1$. Check: $5x + 10 - x + 3 = 4x + 13$. ✓`,
    hints: ["Choose values of x that make one bracket zero."],
  });

  // ax + 2(x − b) ≡ 7x − 6: a = 5, b = 3
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given that $ax + 2(x - b) \equiv 7x - 6$, find the value of $a$.`,
    value: 5, prefix: "a =", wrong: [7, 3],
    explanation: t`The left side is $(a + 2)x - 2b$. Equating coefficients of $x$: $a + 2 = 7$, so $a = 5$ (and $-2b = -6$ gives $b = 3$).`,
  });

  // (x + k)^2 − 4 ≡ x^2 − 6x + 5: k = −3
  same(poly.sub(poly.mul([1, -3], [1, -3]), [4]), [1, -6, 5]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given that $(x + k)^{2} - 4 \equiv x^{2} - 6x + 5$, find $k$.`,
    value: -3, prefix: "k =", wrong: [3, -6],
    explanation: t`$(x + k)^{2} - 4 = x^{2} + 2kx + k^{2} - 4$. Equating $x$ terms: $2k = -6$, $k = -3$. Check: $k^{2} - 4 = 9 - 4 = 5$. ✓`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`In the identity $3x + 7 \equiv A(x - 1) + B(x + 2)$, which value of $x$ gives $B$ directly?`,
    options: [
      [t`$x = 1$`, t`Correct: it makes $x - 1 = 0$, so $10 = 3B$ and $B = \frac{10}{3}$.`],
      [t`$x = -2$`, t`This makes the $B$ term vanish and gives $A$, not $B$.`],
      [t`$x = 0$`, t`This gives $7 = -A + 2B$, which still contains both unknowns.`],
      [t`$x = -1$`, t`Neither bracket becomes zero, so both unknowns remain.`],
    ],
    answer: "A",
    explanation: t`To isolate $B$, remove the $A$ term: choose $x = 1$. Then $3 + 7 = B(3)$, $B = \frac{10}{3}$. ($x = -2$ gives $1 = -3A$, so $A = -\frac{1}{3}$.)`,
  });
  chk(-1 / 3 + 10 / 3, 3, 1e-12); // x coefficient
  chk(1 / 3 + 2 * (10 / 3), 7, 1e-12); // constant

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $x^{2} + px + 9 \equiv (x + q)^{2}$ with $q > 0$, what is the value of $p$?`,
    options: [
      [t`$6$`, t`Correct: $q^{2} = 9$ gives $q = 3$, and $p = 2q = 6$.`],
      [t`$3$`, t`3 is $q$; the coefficient of $x$ in $(x + q)^{2}$ is $2q$.`],
      [t`$9$`, "9 is the constant term, equal to q²."],
      [t`$18$`, t`The $x$ coefficient is $2q$, not $2q^{2}$.`],
    ],
    answer: "A",
    explanation: t`$(x + q)^{2} = x^{2} + 2qx + q^{2}$. Constants: $q^{2} = 9$, $q = 3$. $x$ terms: $p = 2q = 6$.`,
    hints: [t`Expand $(x + q)^{2}$.`],
  });

  for (const [bb, c, p, q] of [[4, 1, 2, -3], [-4, 1, -2, -3], [4, 7, 2, 3], [-4, 7, -2, 3]]) { const s = quad.completeSquare(1, bb, c); same([s.p, s.q], [p, q]); }
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each quadratic to the identical completed-square form.",
    pairs: [
      [t`$x^{2} + 4x + 1$`, t`$(x + 2)^{2} - 3$`],
      [t`$x^{2} - 4x + 1$`, t`$(x - 2)^{2} - 3$`],
      [t`$x^{2} + 4x + 7$`, t`$(x + 2)^{2} + 3$`],
      [t`$x^{2} - 4x + 7$`, t`$(x - 2)^{2} + 3$`],
    ],
    explanation: t`$(x \pm 2)^{2} = x^{2} \pm 4x + 4$; subtract 3 to get a constant 1, add 3 to get 7.`,
  });

  // (ax + b)(x − 3) ≡ 2x^2 − 5x − 3: a = 2, b = 1
  same(poly.mul([2, 1], [1, -3]), [2, -5, -3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $(ax + b)(x - 3) \equiv 2x^{2} - 5x - 3$, find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [nb("a", 2, 1), nb("b", 1, -1)],
    explanation: t`Expanding: $ax^{2} + (b - 3a)x - 3b$. $x^{2}$: $a = 2$. Constant: $-3b = -3$, $b = 1$. Check $x$: $b - 3a = 1 - 6 = -5$. ✓`,
    hints: ["Compare the x² terms and the constant terms first."],
  });

  b.proof({
    d: 2, skill: "APPLICATION", calculator: false, marks: 2,
    stem: t`Show that $(n + 1)^{2} - (n - 1)^{2} \equiv 4n$.`,
    points: [t`M1 expands both squares: $n^{2} + 2n + 1$ and $n^{2} - 2n + 1$`, t`A1 subtracts correctly to obtain $4n$`],
    modelAnswer: t`$$
(n + 1)^{2} - (n - 1)^{2} = \left(n^{2} + 2n + 1\right) - \left(n^{2} - 2n + 1\right)
$$

$$
= n^{2} + 2n + 1 - n^{2} + 2n - 1 = 4n
$$`,
    explanation: "Expand both brackets, then subtract every term of the second (the signs change).",
  });

  // x^3 + px^2 + qx + 2 ≡ (x + 1)(x − 2)(x + r): r = −1, p = −2, q = −1
  same(poly.mul(poly.mul([1, 1], [1, -2]), [1, -1]), [1, -2, -1, 2]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $x^{3} + px^{2} + qx + 2 \equiv (x + 1)(x - 2)(x + r)$, find $p$, $q$ and $r$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [nb("p", -2, 0), nb("q", -1, 1), nb("r", -1, 1)],
    explanation: t`$(x + 1)(x - 2) = x^{2} - x - 2$. Then $\left(x^{2} - x - 2\right)(x + r) = x^{3} + (r - 1)x^{2} + (-r - 2)x - 2r$. Constants: $-2r = 2$, $r = -1$. So $p = r - 1 = -2$ and $q = -r - 2 = -1$.`,
    hints: ["Multiply two of the brackets first.", "The constant term gives r."],
  });

  // Thandeka: 3x^2 − 6x + 1 ≡ 3(x − 1)^2 − 2
  const t16 = quad.completeSquare(3, -6, 1);
  same([t16.p, t16.q], [-1, -2]);
  b.mcq({
    d: 4, skill: "EVALUATION", calculator: false,
    stem: t`Thandeka writes $3x^{2} - 6x + 1 \equiv 3(x - 1)^{2} + 1$. Which statement about her work is correct?`,
    options: [
      [t`The constant is wrong: $3(x - 1)^{2} = 3x^{2} - 6x + 3$, so the identity needs $-2$, not $+1$.`, "Correct: comparing constants, 3 + c = 1, so c = −2."],
      [t`It is correct, because the $x^{2}$ and $x$ terms match.`, "All coefficients must match; the constants give 4 on the right and 1 on the left."],
      [t`The bracket is wrong: it should be $(x - 2)^{2}$, because the $x$ coefficient is $-6$.`, t`Inside the bracket, half of $-2$ (from $3(x^{2} - 2x)$) is $-1$, so $(x - 1)$ is right.`],
      [t`The constant is wrong: it should be $-\frac{2}{3}$, found from $1 - 1$ divided by 3.`, t`Expanding $3(x - 1)^{2} - \frac{2}{3}$ gives the constant $3 - \frac{2}{3}$, not 1.`],
    ],
    answer: "A",
    explanation: t`Expand: $3(x - 1)^{2} + c = 3x^{2} - 6x + 3 + c$. Constants: $3 + c = 1$, so $c = -2$: $3x^{2} - 6x + 1 \equiv 3(x - 1)^{2} - 2$.`,
    hints: ["Expand her right-hand side and compare every coefficient."],
  });

  // x^2 − 6xy + 13y^2 ≡ (x + ay)^2 + by^2: a = −3, b = 4
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $x^{2} - 6xy + 13y^{2} \equiv (x + ay)^{2} + by^{2}$, find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [nb("a", -3, -6), nb("b", 4, 13)],
    explanation: t`$(x + ay)^{2} + by^{2} = x^{2} + 2axy + \left(a^{2} + b\right)y^{2}$. $xy$ terms: $2a = -6$, $a = -3$. $y^{2}$ terms: $9 + b = 13$, $b = 4$.`,
    hints: [t`Treat $xy$ and $y^{2}$ as the "powers" to compare.`],
  });
  { const x = 1.7, y = -0.6; chk(x * x - 6 * x * y + 13 * y * y, (x - 3 * y) ** 2 + 4 * y * y, 1e-12); }

  // Structured (7 marks): 2x^3 + 3x^2 − x + 5 ≡ (x + 2)(Ax^2 + Bx + C) + R
  const f18 = [2, 3, -1, 5];
  const R18 = poly.eval(f18, -2);
  chk(R18, 3);
  same(poly.add(poly.mul([1, 2], [2, -1, 1]), [R18]), f18);
  chk(quad.disc(2, -1, 1), -7);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`It is given that $2x^{3} + 3x^{2} - x + 5 \equiv (x + 2)\left(Ax^{2} + Bx + C\right) + R$.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: t`By substituting a suitable value of $x$, find $R$.`,
        value: R18, prefix: "R =", wrong: [-3, 5],
        explanation: t`Put $x = -2$: $2(-8) + 3(4) - (-2) + 5 = -16 + 12 + 2 + 5 = 3$, so $R = 3$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "By equating coefficients, find A, B and C.",
        template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
        blanks: [nb("A", 2, 1), nb("B", -1, 7), nb("C", 1, 4)],
        explanation: t`$x^{3}$: $A = 2$. Constant: $2C + R = 5$, $C = 1$. $x^{2}$: $B + 2A = 3$, $B = -1$. Check $x$: $C + 2B = 1 - 2 = -1$. ✓`,
      }),
      P.proof({
        label: "(c)", marks: 2, stem: t`Show that the equation $Ax^{2} + Bx + C = 0$ has no real roots.`,
        points: [t`M1 discriminant $(-1)^{2} - 4(2)(1)$`, t`A1 $= -7 < 0$, so no real roots`],
        modelAnswer: t`$$
b^{2} - 4ac = (-1)^{2} - 4(2)(1) = 1 - 8 = -7 < 0
$$

The discriminant is negative, so $2x^{2} - x + 1 = 0$ has no real roots.`,
      }),
    ],
    explanation: t`$x = -2$ gives $R = 3$ at once; comparing coefficients gives the quotient $2x^{2} - x + 1$, whose discriminant $-7$ is negative.`,
    hints: ["Choose x to make x + 2 zero.", "Compare x³, then the constants, then x²; use x as a check."],
  });

  // Structured (9 marks): 4x^2 − 12x + 15 ≡ (2x − a)^2 + b, a = 3, b = 6
  same(poly.add(poly.mul([2, -3], [2, -3]), [6]), [4, -12, 15]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`It is given that $4x^{2} - 12x + 15 \equiv (2x - a)^{2} + b$ for all values of $x$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: "Find the constants a and b.",
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [nb("a", 3, 6), nb("b", 6, 15)],
        explanation: t`$(2x - a)^{2} + b = 4x^{2} - 4ax + a^{2} + b$. $x$ terms: $-4a = -12$, $a = 3$. Constants: $9 + b = 15$, $b = 6$.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: t`Hence state the minimum value of $4x^{2} - 12x + 15$.`,
        value: 6, wrong: [15, 3],
        explanation: t`$(2x - 3)^{2} \geq 0$, so the expression is at least $0 + 6 = 6$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Find the value of x at which this minimum occurs.",
        value: 1.5, prefix: "x =", wrong: [3, -1.5],
        explanation: t`The minimum occurs when $2x - 3 = 0$, that is $x = \frac{3}{2}$.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: t`Explain why $4x^{2} - 12x + 15 > 0$ for every real value of $x$.`,
        points: [t`States $(2x - 3)^{2} \geq 0$ for all real $x$ (a square is never negative)`, t`So the expression is at least $6 > 0$`],
        modelAnswer: "(2x − 3)² is a square, so it is never negative. Adding 6 gives a value of at least 6, which is positive for every x.",
      }),
    ],
    explanation: t`Equating coefficients gives $(2x - 3)^{2} + 6$. The square is never negative, so the expression has minimum 6 at $x = 1.5$ and is always positive.`,
    hints: [t`Expand $(2x - a)^{2} + b$ and compare coefficients.`, "A square is never negative."],
  });

  b.card("DEFINITION", "Identity", t`A statement true for every value of the variable, written with $\equiv$, e.g. $(x + 3)^{2} \equiv x^{2} + 6x + 9$.`);
  b.card("DEFINITION", "Equation", t`A statement true only for particular values, found by solving, e.g. $(x + 3)^{2} = 16$ gives $x = 1$ or $-7$.`);
  b.card("FACT", "Key property of identical polynomials", "Their coefficients of each power of x are equal.");
  b.card("CONCEPT", "Method 1: equating coefficients", t`Expand the side with unknowns and match the coefficients of $x^{3}$, $x^{2}$, $x$ and the constant.`);
  b.card("CONCEPT", "Method 2: substituting convenient values", t`An identity holds for every $x$, so choose values that make brackets zero, e.g. $x = 2$ in $A(x + 1) + B(x - 2)$.`);
  b.card("FORMULA", t`Expansion of $a(x + b)^{2} + c$`, t`$ax^{2} + 2abx + ab^{2} + c$.`);
  b.card("CONCEPT", "Finding R in f(x) ≡ (x − a)(Ax² + Bx + C) + R", t`Substitute $x = a$: $R = f(a)$ (the remainder theorem).`);
  b.card("FACT", "Checking constants in an identity", "Keep one coefficient unused; if it does not match after finding the constants, an earlier value is wrong.");
});
