// W1a: amath.polynomials.remainder-factor — remainder and factor theorems, unknown coefficients.
import { concept, P, t, chk, same, poly } from "../lib.mjs";

concept("amath.polynomials.remainder-factor", { file: "polynomials/remainder-factor", keyPrefix: "polynomials.remainder-factor" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`By the remainder theorem, the remainder when a polynomial $f(x)$ is divided by $x + 4$ is`,
    options: [
      [t`$f(-4)$`, t`Correct: $x + 4 = 0$ when $x = -4$.`],
      [t`$f(4)$`, t`$f(4)$ is the remainder on dividing by $x - 4$.`],
      [t`$-f(4)$`, "The remainder is the value of f at the root of the divisor, not minus another value."],
      [t`$f\left(\frac{1}{4}\right)$`, "The value substituted is the root of the divisor, x = −4."],
    ],
    answer: "A",
    explanation: t`The remainder on dividing by $x - a$ is $f(a)$. Here $x + 4 = x - (-4)$, so $a = -4$ and the remainder is $f(-4)$.`,
  });

  const r2 = poly.eval([1, 2, -5, 1], 2);
  chk(r2, 7);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the remainder when $x^{3} + 2x^{2} - 5x + 1$ is divided by $x - 2$.`,
    value: r2, wrong: [-13, 27],
    explanation: t`$f(2) = 8 + 8 - 10 + 1 = 7$.`,
  });

  const r3 = poly.eval([2, -1, 4, 3], -1);
  chk(r3, -4);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the remainder when $2x^{3} - x^{2} + 4x + 3$ is divided by $x + 1$.`,
    value: r3, wrong: [8, 4],
    explanation: t`Substitute $x = -1$: $2(-1) - (1) + 4(-1) + 3 = -2 - 1 - 4 + 3 = -4$.`,
  });

  const r4 = poly.eval([6, -5, 2, -1], 1 / 3);
  chk(r4, -2 / 3, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the remainder when $6x^{3} - 5x^{2} + 2x - 1$ is divided by $3x - 1$. Give your answer as an exact fraction.`,
    value: r4, answer: "-2/3", wrong: [2, -1],
    explanation: t`$3x - 1 = 0$ when $x = \frac{1}{3}$. $f\left(\frac{1}{3}\right) = \frac{6}{27} - \frac{5}{9} + \frac{2}{3} - 1 = \frac{2}{9} - \frac{5}{9} + \frac{6}{9} - \frac{9}{9} = -\frac{6}{9} = -\frac{2}{3}$.`,
    hints: ["Solve 3x − 1 = 0 to find the value to substitute.", "Put every term over the denominator 9."],
  });

  same(poly.rationalRoots([1, 0, -7, 6]), [-3, 1, 2]);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which of these is a factor of $x^{3} - 7x + 6$?`,
    options: [
      [t`$x - 2$`, t`Correct: $f(2) = 8 - 14 + 6 = 0$.`],
      [t`$x + 2$`, t`$f(-2) = -8 + 14 + 6 = 12 \neq 0$.`],
      [t`$x - 3$`, t`$f(3) = 27 - 21 + 6 = 12 \neq 0$.`],
      [t`$x + 1$`, t`$f(-1) = -1 + 7 + 6 = 12 \neq 0$.`],
    ],
    answer: "A",
    explanation: t`By the factor theorem, $x - a$ is a factor when $f(a) = 0$. Only $f(2) = 0$. (The full factorisation is $(x - 1)(x - 2)(x + 3)$.)`,
  });

  chk(poly.eval([1, 0, -3, 0, 2], 1), 0);
  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$x - 1$ is a factor of $x^{4} - 3x^{2} + 2$.`,
    answer: true,
    explanation: t`$f(1) = 1 - 3 + 2 = 0$, so by the factor theorem $x - 1$ is a factor.`,
  });

  // x − 3 factor of x^3 + kx^2 − 4x + 3: 27 + 9k − 12 + 3 = 0 -> k = −2
  const k7 = -2;
  chk(poly.eval([1, k7, -4, 3], 3), 0);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $x - 3$ is a factor of $x^{3} + kx^{2} - 4x + 3$, find the value of $k$.`,
    value: k7, prefix: "k =", wrong: [2, -42 / 9],
    explanation: t`$f(3) = 0$: $27 + 9k - 12 + 3 = 0$, so $9k = -18$ and $k = -2$.`,
    hints: ["Use the factor theorem: f(3) = 0."],
  });

  // remainder 5 when 2x^3 + ax^2 − 7 ÷ (x + 2): −16 + 4a − 7 = 5 -> a = 7
  const a8 = 7;
  chk(poly.eval([2, a8, 0, -7], -2), 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`When $2x^{3} + ax^{2} - 7$ is divided by $x + 2$, the remainder is $5$. Find $a$.`,
    value: a8, prefix: "a =", wrong: [4.5, 1.5],
    explanation: t`$f(-2) = 5$: $-16 + 4a - 7 = 5$, so $4a = 28$ and $a = 7$.`,
    hints: ["The remainder condition is f(−2) = 5, not f(−2) = 0."],
  });

  // x^3 + ax^2 + bx − 12 with factors x − 2 and x + 3 -> a = 3, b = −4
  const A9 = 3, B9 = -4;
  chk(poly.eval([1, A9, B9, -12], 2), 0);
  chk(poly.eval([1, A9, B9, -12], -3), 0);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$x - 2$ and $x + 3$ are both factors of $x^{3} + ax^{2} + bx - 12$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [A9], wrong: -3 }, { id: "b", input: "number", accepted: [B9], wrong: 4 }],
    explanation: t`$f(2) = 0$: $8 + 4a + 2b - 12 = 0$, so $2a + b = 2$. $f(-3) = 0$: $-27 + 9a - 3b - 12 = 0$, so $3a - b = 13$. Adding: $5a = 15$, $a = 3$, then $b = 2 - 6 = -4$.`,
    hints: ["Each factor gives one equation.", "Simplify each equation before solving them simultaneously."],
  });

  // same remainder on division by x − 1 and x + 2 for x^3 + px − 4: p = −3, remainder −6
  const p10 = -3;
  chk(poly.eval([1, 0, p10, -4], 1), poly.eval([1, 0, p10, -4], -2));
  const R10 = poly.eval([1, 0, p10, -4], 1);
  chk(R10, -6);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The polynomial $x^{3} + px - 4$ leaves the same remainder $R$ when divided by $x - 1$ and when divided by $x + 2$. Find $p$ and $R$.`,
    template: "p = {{blank:p}}, R = {{blank:R}}",
    blanks: [{ id: "p", input: "number", accepted: [p10], wrong: 3 }, { id: "R", input: "number", accepted: [R10], wrong: 0 }],
    explanation: t`$f(1) = 1 + p - 4 = p - 3$ and $f(-2) = -8 - 2p - 4 = -2p - 12$. Equal remainders: $p - 3 = -2p - 12$, so $3p = -9$ and $p = -3$. Then $R = -3 - 3 = -6$.`,
    hints: ["Write both remainders in terms of p and set them equal."],
  });

  same(poly.div([2, 1, 2, 1], [2, 1]), { q: [1, 0, 1], r: [0] });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`To test whether $2x + 1$ is a factor of $2x^{3} + x^{2} + 2x + 1$, which value of $x$ should be substituted?`,
    options: [
      [t`$-\frac{1}{2}$`, t`Correct: $2x + 1 = 0$ when $x = -\frac{1}{2}$ (and $f\left(-\frac{1}{2}\right) = 0$, so it is a factor).`],
      [t`$\frac{1}{2}$`, "The sign is wrong: 2x + 1 = 0 gives a negative value of x."],
      [t`$-1$`, "Only the constant term has been used; divide by the coefficient of x as well."],
      [t`$-2$`, "The coefficient of x has been used as the root; solve 2x + 1 = 0 instead."],
    ],
    answer: "A",
    explanation: t`For a divisor $ax + b$, substitute $x = -\frac{b}{a}$. Here $f\left(-\frac{1}{2}\right) = -\frac{1}{4} + \frac{1}{4} - 1 + 1 = 0$, so $2x + 1$ is a factor: $2x^{3} + x^{2} + 2x + 1 = (2x + 1)\left(x^{2} + 1\right)$.`,
    hints: ["Solve 2x + 1 = 0."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $f(3) = 0$, then $x + 3$ is a factor of $f(x)$.`,
    answer: false,
    explanation: t`$f(3) = 0$ tells you that $x - 3$ is a factor. For $x + 3$ you would need $f(-3) = 0$.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Match each divisor to the value that gives the remainder when $f(x)$ is divided by it.`,
    pairs: [
      [t`$x - 5$`, t`$f(5)$`],
      [t`$x + 5$`, t`$f(-5)$`],
      [t`$2x - 5$`, t`$f\left(\frac{5}{2}\right)$`],
      [t`$5x + 2$`, t`$f\left(-\frac{2}{5}\right)$`],
    ],
    explanation: "Set each divisor equal to zero and solve for x; the remainder is f at that value.",
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Prove the remainder theorem: when a polynomial $f(x)$ is divided by $x - a$, the remainder is $f(a)$.`,
    points: [
      t`M1 writes $f(x) \equiv (x - a)q(x) + r$ with $r$ a constant (remainder of lower degree than $x - a$)`,
      t`M1 substitutes $x = a$, making the factor $(x - a)$ zero`,
      t`A1 concludes $f(a) = r$`,
    ],
    modelAnswer: t`Dividing by the linear expression $x - a$ gives a quotient $q(x)$ and a constant remainder $r$:

$$
f(x) \equiv (x - a)\,q(x) + r
$$

This is an identity, true for all $x$. Put $x = a$:

$$
f(a) = (a - a)\,q(a) + r = 0 + r = r
$$

So the remainder is $f(a)$.`,
    explanation: "The division identity holds for every x, so choosing x = a kills the term containing the quotient and leaves only the remainder.",
    hints: ["Start from dividend = divisor × quotient + remainder."],
  });

  chk(poly.eval([1, -3, -6, 8], 4), 0);
  b.proof({
    d: 2, skill: "APPLICATION", calculator: false, marks: 2,
    stem: t`Show that $x - 4$ is a factor of $x^{3} - 3x^{2} - 6x + 8$.`,
    points: [t`M1 substitutes $x = 4$: $64 - 48 - 24 + 8$`, t`A1 obtains $0$ and states that $x - 4$ is a factor (factor theorem)`],
    modelAnswer: t`$$
f(4) = 4^{3} - 3(4)^{2} - 6(4) + 8 = 64 - 48 - 24 + 8 = 0
$$

Since $f(4) = 0$, $x - 4$ is a factor of $f(x)$ by the factor theorem.`,
    explanation: "Substitute the value that makes the divisor zero and show the result is 0, then state the conclusion.",
  });

  // f(x) = x^3 + ax + b, f(1) = 0, f(−1) = 4 -> a + b = −1, −a + b = 5 -> b = 2, a = −3
  const a16 = -3, b16 = 2;
  chk(poly.eval([1, 0, a16, b16], 1), 0);
  chk(poly.eval([1, 0, a16, b16], -1), 4);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = x^{3} + ax + b$. The expression $x - 1$ is a factor of $f(x)$, and the remainder when $f(x)$ is divided by $x + 1$ is $4$. What is the value of $b$?`,
    options: [
      [t`$2$`, t`Correct: $a + b = -1$ and $-a + b = 5$; adding gives $2b = 4$.`],
      [t`$-3$`, t`That is the value of $a$, not $b$.`],
      [t`$-2$`, t`Check the sign: $f(-1) = -1 - a + b = 4$ gives $-a + b = 5$, and adding to $a + b = -1$ gives $b = 2$.`],
      [t`$3$`, t`The condition $f(-1) = 4$ has been written as $-a + b = 4$; the $-1$ from $(-1)^{3}$ was dropped.`],
    ],
    answer: "A",
    explanation: t`$f(1) = 1 + a + b = 0 \Rightarrow a + b = -1$. $f(-1) = -1 - a + b = 4 \Rightarrow -a + b = 5$. Adding: $2b = 4$, $b = 2$ (and $a = -3$).`,
    hints: ["Write one equation from the factor and one from the remainder."],
  });

  const r17 = poly.eval([1, -2, 0, 1, -5], -2);
  chk(r17, 25);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the remainder when $x^{4} - 2x^{3} + x - 5$ is divided by $x + 2$.`,
    value: r17, wrong: [-7, 9],
    explanation: t`$f(-2) = 16 - 2(-8) + (-2) - 5 = 16 + 16 - 2 - 5 = 25$.`,
    hints: [t`$(-2)^{4} = 16$ and $(-2)^{3} = -8$.`],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is the remainder when $3x^{4} - 2x + 7$ is divided by $x$?`,
    options: [
      [t`$7$`, t`Correct: dividing by $x = x - 0$ leaves $f(0) = 7$, the constant term.`],
      [t`$8$`, t`That is $f(1)$, the remainder on dividing by $x - 1$.`],
      [t`$3$`, "The leading coefficient is not the remainder."],
      [t`$0$`, "Only the terms containing x divide exactly by x; the constant term is left over."],
    ],
    answer: "A",
    explanation: t`$x = x - 0$, so the remainder is $f(0)$, the constant term $7$.`,
  });

  // Structured (7 marks): f(x) = 2x^3 + ax^2 + bx + 6, x + 1 factor, remainder 2 on x − 1
  const f18 = [2, -5, -1, 6];
  chk(poly.eval(f18, -1), 0);
  chk(poly.eval(f18, 1), 2);
  const r18 = poly.eval(f18, 0.5);
  chk(r18, 4.5);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`$f(x) = 2x^{3} + ax^{2} + bx + 6$, where $a$ and $b$ are constants. $x + 1$ is a factor of $f(x)$, and when $f(x)$ is divided by $x - 1$ the remainder is $2$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that $a - b = -4$.`,
        points: [t`M1 uses $f(-1) = 0$: $-2 + a - b + 6 = 0$`, t`A1 rearranges to $a - b = -4$`],
        modelAnswer: t`$$
f(-1) = 2(-1)^{3} + a(-1)^{2} + b(-1) + 6 = -2 + a - b + 6 = 0
$$

$$
a - b = -4
$$`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "Find a second equation in a and b and hence find a and b.",
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-5], wrong: -3 }, { id: "b", input: "number", accepted: [-1], wrong: 1 }],
        explanation: t`$f(1) = 2 + a + b + 6 = 2$, so $a + b = -6$. With $a - b = -4$: $2a = -10$, $a = -5$, $b = -1$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: t`Find the remainder when $f(x)$ is divided by $2x - 1$.`,
        value: r18, wrong: [0, 2],
        explanation: t`$f\left(\frac{1}{2}\right) = \frac{1}{4} - \frac{5}{4} - \frac{1}{2} + 6 = \frac{9}{2}$.`,
      }),
    ],
    explanation: t`The factor gives $a - b = -4$, the remainder gives $a + b = -6$, so $f(x) = 2x^{3} - 5x^{2} - x + 6$ and the remainder on dividing by $2x - 1$ is $f\left(\frac{1}{2}\right) = 4.5$.`,
    hints: ["Factor: f(−1) = 0. Remainder: f(1) = 2.", "For 2x − 1, substitute x = ½."],
  });

  // Structured (9 marks): g(x) = x^3 + 2x^2 + px + q; remainders −8 (x − 1) and 4 (x + 2)
  const g19 = [1, 2, -5, -6];
  chk(poly.eval(g19, 1), -8);
  chk(poly.eval(g19, -2), 4);
  chk(poly.eval(g19, 2), 0);
  same(poly.rationalRoots(g19), [-3, -1, 2]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`$g(x) = x^{3} + 2x^{2} + px + q$. When $g(x)$ is divided by $x - 1$ the remainder is $-8$, and when it is divided by $x + 2$ the remainder is $4$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 3, stem: t`Show that $p + q = -11$ and $-2p + q = 4$.`,
        points: [t`M1 uses $g(1) = -8$: $1 + 2 + p + q = -8$`, t`A1 obtains $p + q = -11$`, t`B1 uses $g(-2) = 4$: $-8 + 8 - 2p + q = 4$, so $-2p + q = 4$`],
        modelAnswer: t`$$
g(1) = 1 + 2 + p + q = -8 \;\Rightarrow\; p + q = -11
$$

$$
g(-2) = -8 + 8 - 2p + q = 4 \;\Rightarrow\; -2p + q = 4
$$`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Find p and q.",
        template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [{ id: "p", input: "number", accepted: [-5], wrong: 5 }, { id: "q", input: "number", accepted: [-6], wrong: -16 }],
        explanation: t`Subtract: $(p + q) - (-2p + q) = -11 - 4$, so $3p = -15$, $p = -5$ and $q = -6$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: t`Evaluate $g(2)$.`,
        value: poly.eval(g19, 2), wrong: [12],
        explanation: t`$g(2) = 8 + 8 - 10 - 6 = 0$, so $x - 2$ is a factor.`,
      }),
      P.fib({
        label: "(d)", marks: 3, stem: t`Hence solve $g(x) = 0$.`,
        template: "x = {{blank:x1}}, x = {{blank:x2}} or x = {{blank:x3}} (in ascending order)",
        blanks: [{ id: "x1", input: "number", accepted: [-3], wrong: 3 }, { id: "x2", input: "number", accepted: [-1], wrong: 1 }, { id: "x3", input: "number", accepted: [2], wrong: -2 }],
        explanation: t`$g(x) = (x - 2)\left(x^{2} + 4x + 3\right) = (x - 2)(x + 1)(x + 3)$, so $x = -3$, $-1$ or $2$.`,
      }),
    ],
    explanation: t`Two remainder conditions give $p = -5$, $q = -6$; $g(2) = 0$ shows $x - 2$ is a factor, and dividing leaves $x^{2} + 4x + 3 = (x + 1)(x + 3)$.`,
    hints: ["Each remainder condition gives one linear equation.", "Divide g(x) by x − 2 to find the quadratic factor."],
  });

  b.card("DEFINITION", "Remainder theorem", t`The remainder when $f(x)$ is divided by $x - a$ is $f(a)$; by $ax + b$ it is $f\left(-\frac{b}{a}\right)$.`);
  b.card("DEFINITION", "Factor theorem", t`$x - a$ is a factor of $f(x)$ if and only if $f(a) = 0$.`);
  b.card("CONCEPT", "Which value do you substitute?", "Set the divisor equal to zero and solve: x + 3 → x = −3; 2x − 5 → x = 5/2.");
  b.card("CONCEPT", "Why the remainder theorem works", t`$f(x) \equiv (x - a)q(x) + r$; putting $x = a$ gives $f(a) = r$.`);
  b.card("FACT", "A given remainder", t`"Remainder 7 on division by $x - 2$" means $f(2) = 7$, not $f(2) = 0$.`);
  b.card("CONCEPT", "Two unknown coefficients", "Use two conditions (factors or remainders); each gives a linear equation. Solve them simultaneously and check both.");
  b.card("FACT", t`Remainder on dividing by $x$`, t`$f(0)$, the constant term.`);
  b.card("FACT", "Showing something is a factor", t`Substitute, show the result is 0, and conclude "so $x - a$ is a factor" (factor theorem).`);
});
