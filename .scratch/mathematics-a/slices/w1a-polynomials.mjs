// W1a: amaths.algebra.polynomials — division, identities, remainder and factor theorems (ZIMSEC Pure; Cambridge P2/P3).
import { concept, P, t, chk, same, poly } from "../lib.mjs";

const perms = (arr) => (arr.length <= 1 ? [arr] : arr.flatMap((x, i) => perms([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [x, ...p])));

concept("amaths.algebra.polynomials", { file: "algebra/polynomials", keyPrefix: "algebra.polynomials" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`By the remainder theorem, the remainder when $f(x)$ is divided by $2x + 3$ is`,
    options: [
      [t`$f\left(-\frac{3}{2}\right)$`, t`Correct: $2x + 3 = 0$ when $x = -\frac{3}{2}$.`],
      [t`$f\left(\frac{3}{2}\right)$`, "The sign is wrong: solve 2x + 3 = 0."],
      [t`$f(-3)$`, "The coefficient 2 of x has been ignored."],
      [t`$f\left(-\frac{2}{3}\right)$`, "The fraction is upside down: x = −b/a = −3/2."],
    ],
    answer: "A",
    explanation: t`The remainder on division by $ax + b$ is $f\left(-\frac{b}{a}\right)$, the value of $f$ at the root of the divisor. Here that is $f\left(-\frac{3}{2}\right)$.`,
  });

  const r2 = poly.eval([1, -4, 2, 7], 3);
  chk(r2, 4);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the remainder when $x^{3} - 4x^{2} + 2x + 7$ is divided by $x - 3$.`,
    value: r2, wrong: [-74, 10],
    explanation: t`$f(3) = 27 - 36 + 6 + 7 = 4$.`,
  });

  const r3 = poly.eval([4, 2, -1, 5], 0.5);
  chk(r3, 5.5, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the remainder when $4x^{3} + 2x^{2} - x + 5$ is divided by $2x - 1$. Give your answer exactly.`,
    value: r3, answer: "11/2", wrong: [8, 32],
    explanation: t`Substitute $x = \frac{1}{2}$: $4\left(\frac{1}{8}\right) + 2\left(\frac{1}{4}\right) - \frac{1}{2} + 5 = \frac{1}{2} + \frac{1}{2} - \frac{1}{2} + 5 = \frac{11}{2}$. (Substituting $x = 1$ gives 10; $x = 2$ gives 39.)`,
  });

  const d4 = poly.div([3, -5, 2, -4], [1, -2]);
  same(d4, { q: [3, 1, 4], r: [4] });
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Divide $3x^{3} - 5x^{2} + 2x - 4$ by $x - 2$.`,
    template: "Quotient: {{blank:a}} x² + {{blank:b}} x + {{blank:c}}; remainder: {{blank:r}}",
    blanks: [
      { id: "a", input: "number", accepted: [3], wrong: 3 },
      { id: "b", input: "number", accepted: [1], wrong: -11 },
      { id: "c", input: "number", accepted: [4], wrong: 24 },
      { id: "r", input: "number", accepted: [4], wrong: -52 },
    ],
    explanation: t`$3x^{2}(x - 2) = 3x^{3} - 6x^{2}$ leaves $x^{2} + 2x$; $x(x - 2) = x^{2} - 2x$ leaves $4x - 4$; $4(x - 2) = 4x - 8$ leaves $4$. So $3x^{3} - 5x^{2} + 2x - 4 \equiv (x - 2)(3x^{2} + x + 4) + 4$. Check: $f(2) = 24 - 20 + 4 - 4 = 4$.`,
    hints: ["Divide the leading terms, multiply back, subtract, repeat.", "Check the remainder with f(2)."],
  });

  const d5 = poly.div([1, 3, 0, -2, 1], [1, 1, -1]);
  same(d5, { q: [1, 2, -1], r: [1, 0] });
  same(poly.add(poly.mul([1, 1, -1], d5.q), d5.r), [1, 3, 0, -2, 1]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the quotient and remainder when $x^{4} + 3x^{3} - 2x + 1$ is divided by $x^{2} + x - 1$.`,
    template: "Quotient: x² + {{blank:b}} x + {{blank:c}}; remainder: {{blank:p}} x + {{blank:q}}",
    blanks: [
      { id: "b", input: "number", accepted: [2], wrong: 4 },
      { id: "c", input: "number", accepted: [-1], wrong: 1 },
      { id: "p", input: "number", accepted: [1], wrong: -3 },
      { id: "q", input: "number", accepted: [0], wrong: 1 },
    ],
    explanation: t`Write $x^{4} + 3x^{3} + 0x^{2} - 2x + 1$. Then $x^{2}(x^{2} + x - 1)$ leaves $2x^{3} + x^{2} - 2x + 1$; $2x(x^{2} + x - 1)$ leaves $-x^{2} + 0x + 1$; $-1(x^{2} + x - 1)$ leaves $x + 0$. Quotient $x^{2} + 2x - 1$, remainder $x$. Check: $(x^{2} + x - 1)(x^{2} + 2x - 1) + x = x^{4} + 3x^{3} - 2x + 1$.`,
    hints: [t`Insert $0x^{2}$ for the missing term.`, "With a quadratic divisor the remainder has the form px + q."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $f(-2) = 0$, then $(x - 2)$ is a factor of $f(x)$.`,
    answer: false,
    explanation: t`False. $f(-2) = 0$ shows that $(x + 2)$ is a factor, since $x + 2 = 0$ when $x = -2$.`,
  });

  // 2x² + 7x − 1 ≡ A(x + 2)² + B(x + 2) + C -> A = 2, B = −1, C = −7
  same(poly.add(poly.add(poly.mul([2], [1, 4, 4]), poly.mul([-1], [1, 2])), [-7]), [2, 7, -1]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the constants $A$, $B$ and $C$ such that $2x^{2} + 7x - 1 \equiv A(x + 2)^{2} + B(x + 2) + C$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
    blanks: [
      { id: "A", input: "number", accepted: [2], wrong: 2 },
      { id: "B", input: "number", accepted: [-1], wrong: 7 },
      { id: "C", input: "number", accepted: [-7], wrong: -1 },
    ],
    explanation: t`$x^{2}$: $A = 2$. $x$: $4A + B = 7$, so $B = -1$. Put $x = -2$: $8 - 14 - 1 = C$, so $C = -7$. Check $x = 0$: $-1 = 4A + 2B + C = 8 - 2 - 7 = -1$.`,
    hints: ["Put x = −2 to find C at once.", "Equate the coefficients of x² and of x."],
  });

  // (x − 2) factor of x³ + kx² − 13x + 10 -> k = 2
  chk(poly.eval([1, 2, -13, 10], 2), 0);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $(x - 2)$ is a factor of $x^{3} + kx^{2} - 13x + 10$, find the value of $k$.`,
    value: 2, prefix: "k =", wrong: [-2, 11],
    explanation: t`$f(2) = 0$: $8 + 4k - 26 + 10 = 0$, so $4k = 8$ and $k = 2$. Then $f(x) = (x - 2)(x^{2} + 4x - 5) = (x - 2)(x + 5)(x - 1)$.`,
    hints: ["Use the factor theorem: f(2) = 0."],
  });

  // f = 2x³ + ax² + bx + 3, (2x − 1) factor, remainder −3 on (x + 1) -> a = −7, b = −3
  chk(poly.eval([2, -7, -3, 3], 0.5), 0, 1e-12);
  chk(poly.eval([2, -7, -3, 3], -1), -3);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The polynomial $f(x) = 2x^{3} + ax^{2} + bx + 3$ has a factor $(2x - 1)$ and leaves a remainder of $-3$ when divided by $(x + 1)$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-7], wrong: 7 }, { id: "b", input: "number", accepted: [-3], wrong: 3 }],
    explanation: t`$f\left(\frac{1}{2}\right) = 0$: $\frac{1}{4} + \frac{a}{4} + \frac{b}{2} + 3 = 0$, so $a + 2b = -13$. $f(-1) = -3$: $-2 + a - b + 3 = -3$, so $a - b = -4$. Subtract: $3b = -9$, $b = -3$, then $a = -7$.`,
    hints: ["Substitute x = 1/2 and multiply the equation by 4.", "The remainder condition gives f(−1) = −3."],
  });

  for (const r of [3, 2, -2]) chk(poly.eval([1, -3, -4, 12], r), 0);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which of these is a factor of $x^{3} - 3x^{2} - 4x + 12$?`,
    options: [
      [t`$x - 2$`, t`Correct: $f(2) = 8 - 12 - 8 + 12 = 0$.`],
      [t`$x + 3$`, t`$f(-3) = -27 - 27 + 12 + 12 = -30 \neq 0$.`],
      [t`$x + 1$`, t`$f(-1) = -1 - 3 + 4 + 12 = 12 \neq 0$.`],
      [t`$x - 4$`, t`$f(4) = 64 - 48 - 16 + 12 = 12 \neq 0$.`],
    ],
    answer: "A",
    explanation: t`Only $f(2) = 0$. In fact $x^{3} - 3x^{2} - 4x + 12 = x^{2}(x - 3) - 4(x - 3) = (x - 3)(x - 2)(x + 2)$.`,
  });

  same(poly.rationalRoots([2, 3, -11, -6]), [-3, -0.5, 2]);
  const facs11 = ["(x-2)", "(2x+1)", "(x+3)"];
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Factorise $2x^{3} + 3x^{2} - 11x - 6$ completely. Write your answer as a product of three linear factors, for example (x+1)(2x-3)(x+4).`,
    accepted: perms(facs11).map((p) => p.join("")),
    wrong: ["(x-2)(2x^2+7x+3)", "(x+2)(2x-1)(x-3)"],
    explanation: t`$f(2) = 16 + 12 - 22 - 6 = 0$, so $(x - 2)$ is a factor. Dividing: $f(x) = (x - 2)(2x^{2} + 7x + 3) = (x - 2)(2x + 1)(x + 3)$.`,
    hints: ["Try f(1), f(−1), f(2), … until one is zero.", "Divide by the factor you found and factorise the quadratic."],
  });

  same(poly.rationalRoots([2, -3, -11, 6]), [-2, 0.5, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2x^{3} - 3x^{2} - 11x + 6 = 0$.`,
    template: "In ascending order: x = {{blank:a}}, x = {{blank:b}}, x = {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [-2], wrong: 2 },
      { id: "b", input: "number", accepted: [0.5], wrong: -0.5 },
      { id: "c", input: "number", accepted: [3], wrong: -3 },
    ],
    explanation: t`$f(3) = 54 - 27 - 33 + 6 = 0$, so $(x - 3)$ is a factor and $f(x) = (x - 3)(2x^{2} + 3x - 2) = (x - 3)(2x - 1)(x + 2)$. Roots: $-2$, $\frac{1}{2}$, $3$.`,
    hints: ["Find one root by trying factors of 6.", "Divide to leave a quadratic."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A polynomial of degree 4 is divided by a polynomial of degree 2. What can be said about the remainder?`,
    options: [
      ["Its degree is at most 1.", "Correct: the remainder's degree is less than the divisor's degree, 2."],
      ["Its degree is exactly 2.", "The remainder must have a lower degree than the divisor."],
      ["It is always a constant.", "A constant remainder is certain only for a linear divisor."],
      ["Its degree is at most 3.", "That bounds the remainder by the dividend, not the divisor."],
    ],
    answer: "A",
    explanation: t`In $f(x) \equiv d(x)q(x) + r(x)$ the remainder has degree less than $d(x)$. With a quadratic divisor, $r(x) = px + q$ (possibly constant or zero).`,
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", marks: 3, calculator: false,
    stem: t`Prove that when a polynomial $f(x)$ is divided by $(ax + b)$, where $a \neq 0$, the remainder is $f\left(-\dfrac{b}{a}\right)$.`,
    points: [
      t`M1 writes $f(x) \equiv (ax + b)q(x) + R$ with $R$ a constant, because the divisor is linear`,
      t`M1 substitutes $x = -\frac{b}{a}$, which makes $ax + b = 0$`,
      t`A1 concludes $f\left(-\frac{b}{a}\right) = 0 \times q\left(-\frac{b}{a}\right) + R = R$`,
    ],
    modelAnswer: [
      t`Dividing by a linear polynomial leaves a constant remainder $R$, so for all $x$`,
      "$$",
      t`f(x) \equiv (ax + b)\,q(x) + R.`,
      "$$",
      t`Since this is an identity it holds at $x = -\frac{b}{a}$, where $ax + b = 0$:`,
      "$$",
      t`f\left(-\tfrac{b}{a}\right) = 0 \times q\left(-\tfrac{b}{a}\right) + R = R.`,
      "$$",
      t`So the remainder is $f\left(-\frac{b}{a}\right)$. (When $R = 0$, $(ax + b)$ is a factor: the factor theorem.)`,
    ].join("\n"),
    explanation: t`The proof rests on the division identity holding for every $x$, including the root of the divisor.`,
    hints: ["Start from the division statement f(x) ≡ (divisor)(quotient) + remainder."],
  });

  same([1, -1, 2, -2].map((x) => poly.eval([1, 0, 1, -2], x)), [0, -4, 8, -12]);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Let $f(x) = x^{3} + x - 2$. Match each divisor with the remainder when $f(x)$ is divided by it.`,
    pairs: [[t`$x - 1$`, t`$0$`], [t`$x + 1$`, t`$-4$`], [t`$x - 2$`, t`$8$`], [t`$x + 2$`, t`$-12$`]],
    explanation: t`$f(1) = 0$, $f(-1) = -1 - 1 - 2 = -4$, $f(2) = 8 + 2 - 2 = 8$, $f(-2) = -8 - 2 - 2 = -12$.`,
  });

  // x³ + ax² − 2: same remainder for (x − 1) and (x + 2) -> a = 3
  chk(poly.eval([1, 3, 0, -2], 1), poly.eval([1, 3, 0, -2], -2));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The polynomial $x^{3} + ax^{2} - 2$ leaves the same remainder when divided by $(x - 1)$ as when divided by $(x + 2)$. Find $a$.`,
    value: 3, prefix: "a =", wrong: [-3, 1],
    explanation: t`$f(1) = 1 + a - 2 = a - 1$ and $f(-2) = -8 + 4a - 2 = 4a - 10$. Setting them equal: $a - 1 = 4a - 10$, so $3a = 9$ and $a = 3$ (both remainders are then 2).`,
    hints: ["Write each remainder in terms of a.", "Equal remainders give one equation in a."],
  });

  // f(1) = 4, f(−2) = −5, remainder on (x − 1)(x + 2) is px + q: p = 3, q = 1
  chk(3 * 1 + 1, 4);
  chk(3 * -2 + 1, -5);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`When $f(x)$ is divided by $(x - 1)$ the remainder is $4$, and when it is divided by $(x + 2)$ the remainder is $-5$. Find the remainder when $f(x)$ is divided by $(x - 1)(x + 2)$.`,
    options: [
      [t`$3x + 1$`, t`Correct: $p + q = 4$ and $-2p + q = -5$ give $p = 3$, $q = 1$.`],
      [t`$x + 3$`, "The values of p and q have been swapped."],
      [t`$-3x + 7$`, t`This satisfies $p + q = 4$ but gives $13$, not $-5$, at $x = -2$.`],
      [t`$-20$`, "Multiplying the two remainders is not a valid rule; the remainder is linear, px + q."],
    ],
    answer: "A",
    explanation: t`Write $f(x) \equiv (x - 1)(x + 2)q(x) + px + q$. Then $f(1) = p + q = 4$ and $f(-2) = -2p + q = -5$. Subtracting: $3p = 9$, so $p = 3$, $q = 1$; the remainder is $3x + 1$.`,
    hints: ["With a quadratic divisor the remainder is px + q.", "Substitute x = 1 and x = −2 into the division identity."],
  });

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`If the coefficients of a polynomial $f(x)$ add up to zero, then $(x - 1)$ is a factor of $f(x)$.`,
    answer: true,
    explanation: t`True. $f(1)$ is exactly the sum of the coefficients, since every power of 1 equals 1. If that sum is 0, then $f(1) = 0$ and $(x - 1)$ is a factor by the factor theorem. Example: $3x^{3} - 5x^{2} + 2 \to 3 - 5 + 2 = 0$.`,
    hints: ["What is f(1)?"],
  });

  // f = x³ + px² + qx − 8; f(2) = 0, f(−1) = −18 -> p = −3, q = 6
  const P18 = -3, Q18 = 6;
  const f18 = [1, P18, Q18, -8];
  chk(poly.eval(f18, 2), 0);
  chk(poly.eval(f18, -1), -18);
  same(poly.div(f18, [1, -2]), { q: [1, -1, 4], r: [0] });
  chk(1 - 16, -15);
  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The polynomial $f(x) = x^{3} + px^{2} + qx - 8$, where $p$ and $q$ are constants, has a factor $(x - 2)$. When $f(x)$ is divided by $(x + 1)$ the remainder is $-18$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Find the values of p and q.",
        template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [{ id: "p", input: "number", accepted: [P18], wrong: 3 }, { id: "q", input: "number", accepted: [Q18], wrong: -6 }],
        explanation: t`$f(2) = 0$: $8 + 4p + 2q - 8 = 0$, so $2p + q = 0$. $f(-1) = -18$: $-1 + p - q - 8 = -18$, so $p - q = -9$. Adding: $3p = -9$, $p = -3$, $q = 6$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: "Find the quadratic factor of f(x).",
        template: "f(x) = (x − 2)(x² + {{blank:b}} x + {{blank:c}})",
        blanks: [{ id: "b", input: "number", accepted: [-1], wrong: 1 }, { id: "c", input: "number", accepted: [4], wrong: -4 }],
        explanation: t`$x^{3} - 3x^{2} + 6x - 8 = (x - 2)(x^{2} - x + 4)$: compare $x^{2}$ terms ($-2 + b = -3$) and constants ($-2c = -8$).`,
      }),
      P.proof({
        label: "(c)", marks: 2, stem: "Show that the equation f(x) = 0 has exactly one real root.",
        points: [t`M1 finds the discriminant of $x^{2} - x + 4$: $(-1)^{2} - 4(1)(4) = -15$`, t`A1 states that $-15 < 0$ so the quadratic has no real roots, leaving only $x = 2$`],
        modelAnswer: t`$f(x) = (x - 2)(x^{2} - x + 4)$. For $x^{2} - x + 4$, $b^{2} - 4ac = 1 - 16 = -15 < 0$, so this factor has no real roots. Hence the only real root of $f(x) = 0$ is $x = 2$.`,
      }),
    ],
    explanation: t`Two conditions give $p = -3$, $q = 6$. Then $f(x) = (x - 2)(x^{2} - x + 4)$, and the quadratic factor has discriminant $-15$, so $x = 2$ is the only real root.`,
    hints: ["Use f(2) = 0 and f(−1) = −18.", "A quadratic with negative discriminant has no real roots."],
  });

  const d19 = poly.div([2, -1, 0, 3, -5], [1, 0, 1]);
  same(d19, { q: [2, -1, -2], r: [4, -3] });
  // 2x⁴ − x³ + ax + b divisible by x² + 1 -> a = −1, b = −2
  same(poly.div([2, -1, 0, -1, -2], [1, 0, 1]).r, [0]);
  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Let $f(x) = 2x^{4} - x^{3} + 3x - 5$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 3, stem: t`Find the quotient and the remainder when $f(x)$ is divided by $x^{2} + 1$.`,
        template: "Quotient: 2x² + {{blank:b}} x + {{blank:c}}; remainder: {{blank:p}} x + {{blank:q}}",
        blanks: [
          { id: "b", input: "number", accepted: [-1], wrong: 1 },
          { id: "c", input: "number", accepted: [-2], wrong: 2 },
          { id: "p", input: "number", accepted: [4], wrong: 2 },
          { id: "q", input: "number", accepted: [-3], wrong: -7 },
        ],
        explanation: t`Write $2x^{4} - x^{3} + 0x^{2} + 3x - 5$. $2x^{2}(x^{2} + 1)$ leaves $-x^{3} - 2x^{2} + 3x - 5$; $-x(x^{2} + 1)$ leaves $-2x^{2} + 4x - 5$; $-2(x^{2} + 1)$ leaves $4x - 3$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`Hence find the constants $a$ and $b$ for which $2x^{4} - x^{3} + ax + b$ is exactly divisible by $x^{2} + 1$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: 3 }, { id: "b", input: "number", accepted: [-2], wrong: -5 }],
        explanation: t`$2x^{4} - x^{3} + ax + b = f(x) + (a - 3)x + (b + 5)$, so its remainder is $(4 + a - 3)x + (-3 + b + 5) = (a + 1)x + (b + 2)$. This is zero when $a = -1$ and $b = -2$.`,
      }),
    ],
    explanation: t`$f(x) \equiv (x^{2} + 1)(2x^{2} - x - 2) + 4x - 3$. Changing the $x$ and constant terms changes only the remainder, so choose them to cancel it: $a = -1$, $b = -2$.`,
    hints: [t`Insert $0x^{2}$ before dividing.`, "Only the remainder changes when you change the x-term and the constant."],
  });

  b.card("FORMULA", "Remainder theorem", t`The remainder when $f(x)$ is divided by $(ax + b)$ is $f\left(-\dfrac{b}{a}\right)$.`);
  b.card("FORMULA", "Factor theorem", t`$(ax + b)$ is a factor of $f(x)$ if and only if $f\left(-\dfrac{b}{a}\right) = 0$.`);
  b.card("FORMULA", "The division statement", t`$f(x) \equiv d(x)\,q(x) + r(x)$, with $\deg r < \deg d$.`);
  b.card("DEFINITION", "Identity (compared with an equation)", t`An identity ($\equiv$) is true for every value of $x$; an equation is true only for particular values.`);
  b.card("CONCEPT", "Two ways to find unknown coefficients in an identity", "Substitute convenient values of x (making brackets zero), or equate the coefficients of each power of x.");
  b.card("CONCEPT", "How do you factorise a cubic?", "Find a root c by trying divisors of the constant term (f(c) = 0), divide by (x − c), then factorise the quadratic quotient.");
  b.card("FACT", "What form does the remainder take when dividing by a quadratic?", t`Linear or constant: $px + q$.`);
  b.card("FACT", "Quick test for the factor (x − 1)", t`$(x - 1)$ is a factor exactly when the coefficients of $f(x)$ add up to zero, because that sum is $f(1)$.`);
});
