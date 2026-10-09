// W1a: amath.polynomials.operations — vocabulary, + − ×, long division by ax + b.
import { concept, P, t, chk, same, poly } from "../lib.mjs";

const coeffBlanks = (ids, values, wrongs) => ids.map((id, i) => ({ id, input: "number", accepted: [values[i]], wrong: wrongs[i] }));

concept("amath.polynomials.operations", { file: "polynomials/operations", keyPrefix: "polynomials.operations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the degree of the polynomial $5 - 3x^{2} + x^{4} - 2x$?`,
    options: [
      [t`$4$`, t`Correct: the highest power of $x$ is $x^{4}$.`],
      [t`$5$`, "5 is the constant term, not the degree."],
      [t`$2$`, t`$x^{2}$ is not the highest power present.`],
      [t`$1$`, "The degree is the highest power, not the coefficient of the leading term."],
    ],
    answer: "A",
    explanation: t`Write it in descending powers, $x^{4} - 3x^{2} - 2x + 5$: the highest power is 4, so it is a quartic of degree 4.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the leading coefficient of $3x - 7x^{3} + 2$?`,
    options: [
      [t`$-7$`, t`Correct: the leading term is $-7x^{3}$, and the sign belongs to the coefficient.`],
      [t`$3$`, t`3 is the coefficient of $x$, the first term written but not the highest power.`],
      [t`$7$`, "The coefficient includes its sign."],
      [t`$2$`, "2 is the constant term."],
    ],
    answer: "A",
    explanation: t`The leading term is the term with the highest power, $-7x^{3}$; its coefficient is $-7$.`,
  });

  const a3 = poly.sub([3, 0, -2, 5], [1, 4, -6, -1]);
  same(a3, [2, -4, 4, 6]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\left(3x^{3} - 2x + 5\right) - \left(x^{3} + 4x^{2} - 6x - 1\right)$ and write it as $ax^{3} + bx^{2} + cx + d$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, d = {{blank:d}}",
    blanks: coeffBlanks(["a", "b", "c", "d"], a3, [2, 4, -8, 4]),
    explanation: t`Change every sign in the second bracket: $3x^{3} - 2x + 5 - x^{3} - 4x^{2} + 6x + 1 = 2x^{3} - 4x^{2} + 4x + 6$.`,
  });

  const a4 = poly.mul([1, 3], [1, -2, 5]);
  same(a4, [1, 1, -1, 15]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Expand $(x + 3)\left(x^{2} - 2x + 5\right)$ and write it as $x^{3} + px^{2} + qx + r$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: coeffBlanks(["p", "q", "r"], a4.slice(1), [-5, 11, 8]),
    explanation: t`$x\left(x^{2} - 2x + 5\right) = x^{3} - 2x^{2} + 5x$ and $3\left(x^{2} - 2x + 5\right) = 3x^{2} - 6x + 15$. Adding: $x^{3} + x^{2} - x + 15$.`,
  });

  const a5 = poly.mul([3, -2], [1, 1, -5]);
  same(a5, [3, 1, -17, 10]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the coefficient of $x$ in the expansion of $(3x - 2)\left(x^{2} + x - 5\right)$.`,
    value: a5[2], wrong: [-13, 1],
    explanation: t`The $x$ terms come from $3x \times (-5) = -15x$ and $-2 \times x = -2x$, giving $-17x$. The full expansion is $3x^{3} + x^{2} - 17x + 10$.`,
  });

  const v6 = poly.eval([2, -1, 0, 4], -2);
  chk(v6, -16);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $f(x) = 2x^{3} - x^{2} + 4$, find $f(-2)$.`,
    value: v6, wrong: [-8, 16],
    explanation: t`$f(-2) = 2(-8) - (4) + 4 = -16 - 4 + 4 = -16$. Note $(-2)^{2} = 4$, so $-x^{2}$ gives $-4$.`,
  });

  const d7 = poly.div([1, -4, 1, 7], [1, -3]);
  same(d7, { q: [1, -1, -2], r: [1] });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Use long division to divide $x^{3} - 4x^{2} + x + 7$ by $x - 3$. The quotient is $x^{2} + px + q$ and the remainder is $R$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, R = {{blank:R}}",
    blanks: coeffBlanks(["p", "q", "R"], [d7.q[1], d7.q[2], d7.r[0]], [-7, 4, 13]),
    explanation: t`$x^{3} \div x = x^{2}$; subtract $x^{3} - 3x^{2}$ to leave $-x^{2} + x$. Then $-x$: subtract $-x^{2} + 3x$ to leave $-2x + 7$. Then $-2$: subtract $-2x + 6$ to leave $1$. Quotient $x^{2} - x - 2$, remainder $1$.`,
    hints: ["Divide the leading term each time by x.", "Subtract the whole product at each stage."],
  });

  const d8 = poly.div([3, 7, -5, 2], [1, 3]);
  same(d8, { q: [3, -2, 1], r: [-1] });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Divide $3x^{3} + 7x^{2} - 5x + 2$ by $x + 3$. The quotient is $ax^{2} + bx + c$ and the remainder is $R$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, R = {{blank:R}}",
    blanks: coeffBlanks(["a", "b", "c", "R"], [...d8.q, d8.r[0]], [3, 16, 43, 131]),
    explanation: t`$3x^{2}(x + 3) = 3x^{3} + 9x^{2}$ leaves $-2x^{2} - 5x$; $-2x(x + 3) = -2x^{2} - 6x$ leaves $x + 2$; $1(x + 3)$ leaves $-1$. Quotient $3x^{2} - 2x + 1$, remainder $-1$.`,
    hints: [t`Subtracting $9x^{2}$ from $7x^{2}$ gives $-2x^{2}$.`, "A remainder can be negative."],
  });

  const d9 = poly.div([6, 1, 0, 4], [2, -1]);
  same(d9, { q: [3, 2, 1], r: [5] });
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Divide $6x^{3} + x^{2} + 4$ by $2x - 1$. The quotient is $ax^{2} + bx + c$ and the remainder is $R$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, R = {{blank:R}}",
    blanks: coeffBlanks(["a", "b", "c", "R"], [...d9.q, d9.r[0]], [6, 7, 7, 11]),
    explanation: t`Write $6x^{3} + x^{2} + 0x + 4$. $6x^{3} \div 2x = 3x^{2}$; subtract $6x^{3} - 3x^{2}$ to leave $4x^{2} + 0x$. $4x^{2} \div 2x = 2x$; subtract $4x^{2} - 2x$ to leave $2x + 4$. $2x \div 2x = 1$; subtract $2x - 1$ to leave $5$. Quotient $3x^{2} + 2x + 1$, remainder $5$.`,
    hints: ["Insert 0x for the missing x term.", "Each quotient term is found by dividing by 2x, not by x."],
  });

  const f10 = poly.add(poly.mul([1, -2], [1, 0, 1]), [3]);
  same(f10, [1, -2, 1, 1]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`When $f(x)$ is divided by $x - 2$, the quotient is $x^{2} + 1$ and the remainder is $3$. Which is $f(x)$?`,
    options: [
      [t`$x^{3} - 2x^{2} + x + 1$`, t`Correct: $f(x) = (x - 2)\left(x^{2} + 1\right) + 3 = x^{3} - 2x^{2} + x - 2 + 3$.`],
      [t`$x^{3} - 2x^{2} + x - 5$`, "The remainder is added, not subtracted."],
      [t`$x^{3} - 2x^{2} + x + 3$`, t`The constant $-2$ from $(x - 2)\left(x^{2} + 1\right)$ has been lost.`],
      [t`$x^{3} + 2x^{2} + x + 5$`, t`The divisor is $x - 2$, not $x + 2$.`],
    ],
    answer: "A",
    explanation: t`Use dividend $=$ divisor $\times$ quotient $+$ remainder: $(x - 2)\left(x^{2} + 1\right) + 3 = x^{3} - 2x^{2} + x + 1$.`,
    hints: ["dividend = divisor × quotient + remainder"],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The product of a polynomial of degree 2 and a polynomial of degree 3 has degree 6.",
    answer: false,
    explanation: t`The leading terms multiply: $x^{2} \times x^{3} = x^{5}$, so the degrees add to give 5.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The sum of two cubic polynomials is always a cubic polynomial.",
    answer: false,
    explanation: t`The $x^{3}$ terms can cancel: $\left(x^{3} + x\right) + \left(-x^{3} + 2\right) = x + 2$, which is linear.`,
  });

  same(poly.mul([1, 1], [1, -1]), [1, 0, -1]);
  same(poly.mul([1, 1], [1, 1]), [1, 2, 1]);
  same(poly.mul([1, -1], [1, -1]), [1, -2, 1]);
  same(poly.mul([1, 1], [1, -1, 1]), [1, 0, 0, 1]);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each product to its expansion.",
    pairs: [
      [t`$(x + 1)(x - 1)$`, t`$x^{2} - 1$`],
      [t`$(x + 1)^{2}$`, t`$x^{2} + 2x + 1$`],
      [t`$(x - 1)^{2}$`, t`$x^{2} - 2x + 1$`],
      [t`$(x + 1)\left(x^{2} - x + 1\right)$`, t`$x^{3} + 1$`],
    ],
    explanation: t`Multiply every term by every term. In the last one the $x^{2}$ and $x$ terms cancel: $x^{3} - x^{2} + x + x^{2} - x + 1 = x^{3} + 1$.`,
  });

  same(poly.div([1, 0, 0, -8], [1, -2]), { q: [1, 2, 4], r: [0] });
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the quotient when $x^{3} - 8$ is divided by $x - 2$. Type it like x^2+ax+b.`,
    accepted: ["x^2+2x+4", "x²+2x+4"],
    explanation: t`Write $x^{3} + 0x^{2} + 0x - 8$. The quotient terms are $x^{2}$, then $2x$, then $4$, and the remainder is $0$: $x^{3} - 8 = (x - 2)\left(x^{2} + 2x + 4\right)$.`,
    hints: ["Insert 0x² and 0x before dividing."],
  });

  // (x^2 + kx − 2)(x + 3): x coefficient 3k − 2 = 13 -> k = 5
  const k15 = 5;
  same(poly.mul([1, k15, -2], [1, 3])[2], 13);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The coefficient of $x$ in the expansion of $\left(x^{2} + kx - 2\right)(x + 3)$ is $13$. Find the constant $k$.`,
    value: k15, prefix: "k =", wrong: [11 / 3, 15],
    explanation: t`The $x$ terms are $kx \times 3 = 3kx$ and $-2 \times x = -2x$. So $3k - 2 = 13$, giving $k = 5$.`,
    hints: ["List only the pairs of terms whose product contains x to the power 1."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these expressions is **not** a polynomial in $x$?`,
    options: [
      [t`$x^{2} + 3x^{-1}$`, t`Correct: $x^{-1} = \frac{1}{x}$ has a negative index, so this is not a polynomial.`],
      [t`$\sqrt{5}\,x^{3} - 1$`, "Coefficients may be any constants, including surds; the powers of x are whole numbers."],
      [t`$7$`, t`A constant is a polynomial of degree 0.`],
      [t`$(x - 2)^{3}$`, "Expanded, this is a cubic polynomial."],
    ],
    answer: "A",
    explanation: "In a polynomial every power of x is a whole number 0, 1, 2, …; the coefficients can be any constants.",
  });

  same(poly.add(poly.mul([1, -1], [3, 3, 1]), [2]), [3, 0, -2, 1]);
  b.mcq({
    d: 4, skill: "EVALUATION", calculator: false,
    stem: t`Tatenda divides $3x^{3} - 2x + 1$ by $x - 1$ and writes $3x^{3} - 2x + 1 = (x - 1)\left(3x^{2} + 3x + 1\right) + 2$. Which statement is true?`,
    options: [
      [t`The working is correct: the quotient is $3x^{2} + 3x + 1$ and the remainder is $2$.`, "Correct: expanding the right side gives back the dividend exactly."],
      [t`The remainder is wrong: it should be $0$ because $x - 1$ is a factor.`, t`Expanding $(x - 1)\left(3x^{2} + 3x + 1\right)$ gives $3x^{3} - 2x - 1$, so the remainder 2 is needed.`],
      [t`The quotient is wrong: it should be $3x^{2} - 2$ because the dividend has no $x^{2}$ term.`, t`The missing $x^{2}$ term is a zero coefficient; the quotient still has an $x$ term.`],
      [t`The quotient is wrong: it should be $3x^{2} + 3x - 2$ with remainder $3$.`, t`$(x - 1)\left(3x^{2} + 3x - 2\right) + 3 = 3x^{3} - 5x + 5$, which is not the dividend.`],
    ],
    answer: "A",
    explanation: t`Check with the identity: $(x - 1)\left(3x^{2} + 3x + 1\right) = 3x^{3} + 3x^{2} + x - 3x^{2} - 3x - 1 = 3x^{3} - 2x - 1$; adding 2 gives $3x^{3} - 2x + 1$. ✓`,
    hints: ["Expand the right-hand side and compare."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A cubic polynomial is divided by $3x - 2$. What can you say about the quotient and the remainder?`,
    options: [
      ["The quotient is a quadratic and the remainder is a constant.", "Correct: degrees subtract (3 − 1 = 2) and the remainder has lower degree than the divisor."],
      ["The quotient is a quadratic and the remainder is linear.", "The remainder must have lower degree than the linear divisor, so it is a constant."],
      ["The quotient is linear and the remainder is a constant.", "Dividing degree 3 by degree 1 leaves degree 2, not 1."],
      ["The quotient is a cubic and the remainder is zero.", "Division lowers the degree; and the remainder is zero only when 3x − 2 is a factor."],
    ],
    answer: "A",
    explanation: "Degree of quotient = 3 − 1 = 2. Division stops when what is left has lower degree than the divisor, so the remainder is a constant (possibly 0).",
  });

  // Structured: f(x) = 2x^3 + 3x^2 − 8x + 5 divided by x + 3
  const f17 = [2, 3, -8, 5];
  const d17 = poly.div(f17, [1, 3]);
  same(d17, { q: [2, -3, 1], r: [2] });
  same(poly.mul(poly.mul([1, 3], [2, -1]), [1, -1]), poly.sub(f17, [2]));
  same(poly.rationalRoots(poly.sub(f17, [2])), [-3, 0.5, 1]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`It is given that $f(x) = 2x^{3} + 3x^{2} - 8x + 5$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 4, stem: t`Divide $f(x)$ by $x + 3$. The quotient is $ax^{2} + bx + c$ and the remainder is $R$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, R = {{blank:R}}",
        blanks: coeffBlanks(["a", "b", "c", "R"], [...d17.q, d17.r[0]], [2, 9, 19, 62]),
        explanation: t`$2x^{2}(x + 3)$ leaves $-3x^{2} - 8x$; $-3x(x + 3)$ leaves $x + 5$; $1(x + 3)$ leaves $2$. Quotient $2x^{2} - 3x + 1$, remainder $2$.`,
      }),
      P.expr({
        label: "(b)", marks: 2, stem: t`Hence write $f(x) - 2$ as a product of three linear factors. Type it like (x+a)(bx+c)(x+d).`,
        accepted: ["(x+3)(2x-1)(x-1)", "(x+3)(x-1)(2x-1)", "(2x-1)(x+3)(x-1)", "(2x-1)(x-1)(x+3)", "(x-1)(x+3)(2x-1)", "(x-1)(2x-1)(x+3)"],
        explanation: t`From (a), $f(x) - 2 = (x + 3)\left(2x^{2} - 3x + 1\right)$, and $2x^{2} - 3x + 1 = (2x - 1)(x - 1)$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: t`Hence solve $f(x) = 2$.`,
        template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order)",
        blanks: [{ id: "x1", input: "number", accepted: [-3], wrong: 3 }, { id: "x2", input: "number", accepted: [0.5], wrong: -0.5 }, { id: "x3", input: "number", accepted: [1], wrong: -1 }],
        explanation: t`$f(x) = 2$ means $(x + 3)(2x - 1)(x - 1) = 0$, so $x = -3$, $x = \frac{1}{2}$ or $x = 1$.`,
      }),
    ],
    explanation: t`The division identity $f(x) = (x + 3)\left(2x^{2} - 3x + 1\right) + 2$ shows that $f(x) - 2$ has the factor $x + 3$; factorising the quotient gives all three solutions of $f(x) = 2$.`,
    hints: ["Use dividend = divisor × quotient + remainder.", "f(x) − 2 removes the remainder."],
  });

  // Structured: tank with sides (x + 2), (x − 1), (2x + 3) m
  const V = poly.mul(poly.mul([1, 2], [1, -1]), [2, 3]);
  same(V, [2, 5, -1, -6]);
  const v15 = poly.eval(V, 1.5);
  chk(v15, 10.5);
  chk(1.5 + 2, 3.5); chk(1.5 - 1, 0.5); chk(2 * 1.5 + 3, 6); chk(3.5 * 0.5 * 6, v15);
  const d18 = poly.div(V, [1, -2]);
  same(d18.r, [28]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A concrete water tank in Masvingo is a cuboid with length $(2x + 3)$ m, width $(x + 2)$ m and depth $(x - 1)$ m, where $x > 1$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that the volume of the tank is $V(x) = 2x^{3} + 5x^{2} - x - 6$ cubic metres.`,
        points: [t`M1 multiplies two brackets correctly, e.g. $(x + 2)(x - 1) = x^{2} + x - 2$`, t`A1 multiplies by $(2x + 3)$ and collects to $2x^{3} + 5x^{2} - x - 6$`],
        modelAnswer: t`$$
(x + 2)(x - 1) = x^{2} + x - 2
$$

$$
\left(x^{2} + x - 2\right)(2x + 3) = 2x^{3} + 3x^{2} + 2x^{2} + 3x - 4x - 6 = 2x^{3} + 5x^{2} - x - 6
$$`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: t`Find the volume of the tank when $x = 1.5$.`,
        value: v15, unit: "m³", wrong: [12, 9],
        explanation: t`$V(1.5) = 2(3.375) + 5(2.25) - 1.5 - 6 = 6.75 + 11.25 - 7.5 = 10.5$ m³ (check: $6 \times 3.5 \times 0.5 = 10.5$).`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: t`Use long division to find the remainder when $V(x)$ is divided by $x - 2$.`,
        value: d18.r[0], wrong: [-28, 0],
        explanation: t`The quotient is $2x^{2} + 9x + 17$ and $(x - 2)\left(2x^{2} + 9x + 17\right) = 2x^{3} + 5x^{2} - x - 34$, so the remainder is $-6 - (-34) = 28$.`,
      }),
    ],
    explanation: t`Multiply the three dimensions to get the cubic, substitute $x = 1.5$, and divide by $x - 2$ (quotient $2x^{2} + 9x + 17$, remainder 28).`,
    hints: ["Expand two brackets first, then multiply by the third.", "For (c), divide, multiply, subtract, bring down."],
  });

  b.card("DEFINITION", "Polynomial", "An expression whose terms are constants times whole-number powers of x (0, 1, 2, …), e.g. 4x³ − 2x² + 7.");
  b.card("DEFINITION", "Degree of a polynomial", "The highest power of x with a non-zero coefficient. Degree 1, 2, 3, 4: linear, quadratic, cubic, quartic.");
  b.card("DEFINITION", "Leading coefficient and constant term", t`The coefficient of the highest power, and the term with no $x$. In $-7x^{3} + 3x + 2$: $-7$ and $2$.`);
  b.card("FORMULA", "The division identity", t`dividend $\equiv$ divisor $\times$ quotient $+$ remainder, e.g. $f(x) \equiv (x - a)q(x) + r$.`);
  b.card("CONCEPT", "Long division rhythm", "Divide the leading terms, multiply back, subtract the whole product, bring down the next term; repeat until the remainder has lower degree than the divisor.");
  b.card("FACT", "Missing powers in long division", t`Insert zero coefficients: divide $x^{3} - 8$ as $x^{3} + 0x^{2} + 0x - 8$.`);
  b.card("FACT", "Degree of a product", t`Degrees add: (degree $m$) $\times$ (degree $n$) has degree $m + n$.`);
  b.card("FACT", "Remainder on dividing by a linear expression", "A constant (degree 0), because the remainder must have lower degree than the divisor.");
  b.card("CONCEPT", "Finding one coefficient of a product quickly", t`Add the products of pairs of terms whose powers sum to the power you want, e.g. the $x$ term of $(3x - 2)(x^{2} + x - 5)$ is $3x(-5) + (-2)x = -17x$.`);
});
