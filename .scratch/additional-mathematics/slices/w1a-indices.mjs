// W1a: amath.indices.indices (ZIMSEC only) — laws of indices and exponential equations.
import { concept, P, t, chk, same, quad } from "../lib.mjs";

concept("amath.indices.indices", { file: "indices/indices", keyPrefix: "indices.indices" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the value of $7^{0}$?`,
    options: [
      [t`$1$`, t`Correct: any non-zero number to the power 0 is 1, because $7^{n} \div 7^{n} = 7^{0}$.`],
      [t`$0$`, "The index 0 does not make the value 0; dividing a power by itself gives 1."],
      [t`$7$`, t`That is $7^{1}$.`],
      [t`$\frac{1}{7}$`, t`That is $7^{-1}$.`],
    ],
    answer: "A",
    explanation: t`$a^{0} = 1$ for every $a \neq 0$, since $a^{n} \div a^{n} = a^{n-n} = a^{0}$ and also equals 1.`,
  });

  const v2 = 32 ** (-2 / 5);
  chk(v2, 1 / 4, 1e-12);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $32^{-\frac{2}{5}}$.`,
    options: [
      [t`$\frac{1}{4}$`, t`Correct: $\sqrt[5]{32} = 2$, $2^{2} = 4$, and the negative index gives the reciprocal.`],
      [t`$-4$`, "A negative index means a reciprocal; it does not make the answer negative."],
      [t`$4$`, "The minus sign in the index has been ignored: take the reciprocal."],
      [t`$-\frac{64}{5}$`, t`The index has been multiplied by the base: $32 \times \left(-\frac{2}{5}\right)$ is not a power.`],
    ],
    answer: "A",
    explanation: t`$32^{-\frac{2}{5}} = \dfrac{1}{\left(\sqrt[5]{32}\right)^{2}} = \dfrac{1}{2^{2}} = \dfrac{1}{4}$.`,
  });

  const v3 = 8 ** (2 / 3) * 4 ** (-1 / 2);
  chk(v3, 2, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Without a calculator, evaluate $8^{\frac{2}{3}} \times 4^{-\frac{1}{2}}$.`,
    value: v3, wrong: [8, -8],
    explanation: t`$8^{\frac{2}{3}} = \left(\sqrt[3]{8}\right)^{2} = 4$ and $4^{-\frac{1}{2}} = \dfrac{1}{\sqrt{4}} = \dfrac{1}{2}$, so the product is $4 \times \dfrac{1}{2} = 2$.`,
  });

  const v4 = 125 ** (-2 / 3);
  chk(v4, 1 / 25, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $125^{-\frac{2}{3}}$. Give your answer as a fraction or an exact decimal.`,
    value: 1 / 25, answer: "1/25", wrong: [25, -25],
    explanation: t`$\sqrt[3]{125} = 5$, $5^{2} = 25$, and the negative index gives the reciprocal: $\dfrac{1}{25} = 0.04$.`,
  });

  // (2x^3)^4 / (4x^5) = 4x^7
  { const x = 1.3; chk((2 * x ** 3) ** 4 / (4 * x ** 5), 4 * x ** 7, 1e-9); }
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\dfrac{\left(2x^{3}\right)^{4}}{4x^{5}}$, giving your answer in the form $ax^{n}$.`,
    template: "a = {{blank:a}}, n = {{blank:n}}",
    blanks: [{ id: "a", input: "number", accepted: [4], wrong: 2 }, { id: "n", input: "number", accepted: [7], wrong: 2 }],
    explanation: t`$\left(2x^{3}\right)^{4} = 2^{4}x^{12} = 16x^{12}$ (the power applies to the 2 as well). Then $\dfrac{16x^{12}}{4x^{5}} = 4x^{7}$.`,
  });

  // x^(1/2) * x^(3/4) / x^(-1/4) = x^(3/2)
  const n6 = 1 / 2 + 3 / 4 + 1 / 4;
  chk(n6, 1.5);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $x^{\frac{1}{2}} \times x^{\frac{3}{4}} \div x^{-\frac{1}{4}}$, giving your answer as a single power $x^{n}$.`,
    template: "n = {{blank:n}} (a fraction or a decimal)",
    blanks: [{ id: "n", input: "number", accepted: [n6], wrong: 1 }],
    explanation: t`Add the indices when multiplying and subtract when dividing: $\frac{1}{2} + \frac{3}{4} - \left(-\frac{1}{4}\right) = \frac{1}{2} + 1 = \frac{3}{2}$. So the expression is $x^{\frac{3}{2}}$.`,
    hints: ["Dividing by a power subtracts its index.", "Subtracting a negative index adds it."],
  });

  // 2^(3x-1) = 32 -> 3x - 1 = 5 -> x = 2
  chk(2 ** (3 * 2 - 1), 32);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $2^{3x-1} = 32$.`,
    value: 2, prefix: "x =", wrong: [11, 4 / 3],
    explanation: t`$32 = 2^{5}$, so $3x - 1 = 5$, $3x = 6$ and $x = 2$.`,
  });

  // 25^(x-1) = 125^(x-2) -> 2x - 2 = 3x - 6 -> x = 4
  chk(25 ** 3, 125 ** 2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $25^{x-1} = 125^{x-2}$.`,
    value: 4, prefix: "x =", wrong: [-4, 0.8],
    explanation: t`Write both sides as powers of 5: $5^{2(x-1)} = 5^{3(x-2)}$. Then $2x - 2 = 3x - 6$, so $x = 4$. Check: $25^{3} = 15\,625 = 125^{2}$.`,
    hints: [t`$25 = 5^{2}$ and $125 = 5^{3}$.`, "Multiply out the brackets in the indices before equating them."],
  });

  // 9^(x+1) * 3^x = 27^3 * 9 = 3^11 -> 3x + 2 = 11 -> x = 3
  chk(9 ** 4 * 3 ** 3, 27 ** 3 * 9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $9^{x+1} \times 3^{x} = 27^{3} \times 9$.`,
    value: 3, prefix: "x =", wrong: [11, 3.5],
    explanation: t`Left side: $3^{2x+2} \times 3^{x} = 3^{3x+2}$. Right side: $3^{9} \times 3^{2} = 3^{11}$. So $3x + 2 = 11$ and $x = 3$.`,
    hints: ["Write every number as a power of 3.", "Multiplying powers of the same base adds their indices."],
  });

  // 2^(2x) - 10*2^x + 16 = 0 -> u = 2, 8 -> x = 1, 3
  same(quad.roots(1, -10, 16), [2, 8]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2^{2x} - 10 \times 2^{x} + 16 = 0$.`,
    template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
    blanks: [{ id: "x1", input: "number", accepted: [1], wrong: 2 }, { id: "x2", input: "number", accepted: [3], wrong: 8 }],
    explanation: t`Let $u = 2^{x}$: $u^{2} - 10u + 16 = 0$, so $(u - 2)(u - 8) = 0$ and $u = 2$ or $u = 8$. Then $2^{x} = 2$ gives $x = 1$ and $2^{x} = 8$ gives $x = 3$.`,
    hints: [t`$2^{2x} = \left(2^{x}\right)^{2}$.`, "Solve for u first, then turn each value of u back into a value of x."],
  });

  // 3^(2x) - 2*3^x - 3 = 0 -> u = 3 or u = -1 (rejected) -> x = 1
  same(quad.roots(1, -2, -3), [-1, 3]);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $3^{2x} - 2 \times 3^{x} - 3 = 0$. (There is exactly one real solution.)`,
    value: 1, prefix: "x =", wrong: [3, -1],
    explanation: t`With $u = 3^{x}$: $u^{2} - 2u - 3 = 0$, so $(u - 3)(u + 1) = 0$. $u = 3$ gives $x = 1$; $u = -1$ is impossible because $3^{x} > 0$ for every real $x$. So $x = 1$.`,
    hints: [t`Substitute $u = 3^{x}$.`, "Can a power of 3 ever be negative?"],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Using the substitution $u = 2^{x}$, which quadratic equation is equivalent to $4^{x} - 6 \times 2^{x} + 8 = 0$?`,
    options: [
      [t`$u^{2} - 6u + 8 = 0$`, t`Correct: $4^{x} = \left(2^{2}\right)^{x} = \left(2^{x}\right)^{2} = u^{2}$.`],
      [t`$2u - 6u + 8 = 0$`, t`$4^{x}$ is not $2 \times 2^{x}$; it is $\left(2^{x}\right)^{2}$.`],
      [t`$u^{4} - 6u + 8 = 0$`, t`$4^{x}$ is $u^{2}$, not $u^{4}$: only the base 4 is rewritten as $2^{2}$.`],
      [t`$u^{2} - 6u^{2} + 8 = 0$`, t`The middle term $6 \times 2^{x}$ is $6u$, not $6u^{2}$.`],
    ],
    answer: "A",
    explanation: t`$4^{x} = 2^{2x} = \left(2^{x}\right)^{2} = u^{2}$, and $6 \times 2^{x} = 6u$, so the equation is $u^{2} - 6u + 8 = 0$ (giving $u = 2$ or $4$, so $x = 1$ or $2$).`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$a^{-3} = -a^{3}$ for every positive number $a$.`,
    answer: false,
    explanation: t`A negative index gives a reciprocal: $a^{-3} = \dfrac{1}{a^{3}}$, which is positive when $a$ is positive.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$3^{x} + 3^{x} + 3^{x} = 3^{x+1}$ for every real $x$.`,
    answer: true,
    explanation: t`Three equal terms add to $3 \times 3^{x} = 3^{1} \times 3^{x} = 3^{x+1}$. (It is not $3^{3x}$: adding terms does not add indices.)`,
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each expression to its value.",
    pairs: [
      [t`$16^{\frac{1}{2}}$`, t`$4$`],
      [t`$16^{\frac{3}{4}}$`, t`$8$`],
      [t`$16^{-\frac{1}{4}}$`, t`$\frac{1}{2}$`],
      [t`$16^{0}$`, t`$1$`],
    ],
    explanation: t`$\sqrt{16} = 4$; $\left(\sqrt[4]{16}\right)^{3} = 2^{3} = 8$; $16^{-\frac{1}{4}} = \frac{1}{\sqrt[4]{16}} = \frac{1}{2}$; any non-zero number to the power 0 is 1.`,
  });

  // (x^2 y^-3)^-2 = x^-4 y^6 = y^6/x^4
  { const x = 1.4, y = 0.7; chk((x ** 2 * y ** -3) ** -2, y ** 6 / x ** 4, 1e-9); }
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Simplify $\left(x^{2}y^{-3}\right)^{-2}$, giving your answer with positive indices only as a single fraction (type it like y^a/x^b).`,
    accepted: ["y^6/x^4", "(y^6)/(x^4)"],
    rejected: [{ value: "x^4/y^6", feedback: "The fraction is upside down: the index −2 also changes the sign of the index of y." }],
    explanation: t`Multiply each index by $-2$: $x^{2 \times (-2)}y^{-3 \times (-2)} = x^{-4}y^{6} = \dfrac{y^{6}}{x^{4}}$.`,
    hints: [t`Use $\left(a^{m}\right)^{n} = a^{mn}$ on each letter.`, "A negative index of x moves x to the denominator."],
  });

  b.proof({
    d: 3, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Show that $5^{x+1} + 5^{x-1} = \dfrac{26}{5} \times 5^{x}$ for every real $x$.`,
    points: [
      t`M1 writes $5^{x+1} = 5 \times 5^{x}$`,
      t`M1 writes $5^{x-1} = \dfrac{5^{x}}{5}$ (or $\frac{1}{5} \times 5^{x}$)`,
      t`A1 collects $\left(5 + \frac{1}{5}\right)5^{x} = \frac{26}{5} \times 5^{x}$ with no errors`,
    ],
    modelAnswer: t`$$
5^{x+1} = 5^{1} \times 5^{x} = 5 \times 5^{x}
$$

$$
5^{x-1} = 5^{x} \times 5^{-1} = \tfrac{1}{5} \times 5^{x}
$$

$$
5^{x+1} + 5^{x-1} = \left(5 + \tfrac{1}{5}\right)5^{x} = \tfrac{26}{5} \times 5^{x}
$$`,
    explanation: t`Split each power with the law $a^{m+n} = a^{m} \times a^{n}$ so that every term is a multiple of $5^{x}$, then collect.`,
    hints: [t`Write each term as (a number) $\times 5^{x}$.`],
  });

  // Structured: 2^(2x+1) - 9*2^x + 4 = 0 -> 2u^2 - 9u + 4 = 0 -> u = 1/2, 4 -> x = -1, 2
  same(quad.roots(2, -9, 4), [0.5, 4]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The equation $2^{2x+1} - 9 \times 2^{x} + 4 = 0$ is to be solved.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2,
        stem: t`Show that, with $u = 2^{x}$, the equation becomes $2u^{2} - 9u + 4 = 0$.`,
        points: [t`M1 writes $2^{2x+1} = 2 \times 2^{2x} = 2\left(2^{x}\right)^{2}$`, t`A1 obtains $2u^{2} - 9u + 4 = 0$`],
        modelAnswer: t`$$
2^{2x+1} = 2^{1} \times 2^{2x} = 2\left(2^{x}\right)^{2} = 2u^{2}
$$

$$
2u^{2} - 9u + 4 = 0
$$`,
      }),
      P.fib({
        label: "(b)", stem: "Solve the quadratic equation for u.",
        template: "u = {{blank:u1}} or u = {{blank:u2}} (smaller value first)",
        blanks: [{ id: "u1", input: "number", accepted: [0.5], wrong: -0.5 }, { id: "u2", input: "number", accepted: [4], wrong: -4 }],
        explanation: t`$2u^{2} - 9u + 4 = (2u - 1)(u - 4) = 0$, so $u = \frac{1}{2}$ or $u = 4$.`,
      }),
      P.fib({
        label: "(c)", stem: "Hence find the two values of x.",
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
        blanks: [{ id: "x1", input: "number", accepted: [-1], wrong: 0.5 }, { id: "x2", input: "number", accepted: [2], wrong: 4 }],
        explanation: t`$2^{x} = \frac{1}{2} = 2^{-1}$ gives $x = -1$; $2^{x} = 4 = 2^{2}$ gives $x = 2$.`,
      }),
    ],
    explanation: t`Split $2^{2x+1}$ as $2 \times \left(2^{x}\right)^{2}$, solve the quadratic $(2u - 1)(u - 4) = 0$, and convert back: $x = -1$ or $x = 2$.`,
    hints: [t`$2^{2x+1} = 2^{1} \times 2^{2x}$.`, t`$\frac{1}{2} = 2^{-1}$.`],
  });

  // Structured: simultaneous exponential equations 2^x * 4^y = 32, 3^x / 9^y = 1/3 -> x + 2y = 5, x - 2y = -1 -> x = 2, y = 1.5
  { const x = 2, y = 1.5; chk(2 ** x * 4 ** y, 32, 1e-9); chk(3 ** x / 9 ** y, 1 / 3, 1e-12); }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Nyasha is given the simultaneous equations $2^{x} \times 4^{y} = 32$ and $\dfrac{3^{x}}{9^{y}} = \dfrac{1}{3}$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 3,
        stem: t`Show that the equations can be written as $x + 2y = 5$ and $x - 2y = -1$.`,
        points: [
          t`M1 writes $4^{y} = 2^{2y}$ and $32 = 2^{5}$`,
          t`A1 obtains $x + 2y = 5$`,
          t`A1 writes $\dfrac{3^{x}}{3^{2y}} = 3^{-1}$ and obtains $x - 2y = -1$`,
        ],
        modelAnswer: t`$$
2^{x} \times 2^{2y} = 2^{5} \;\Rightarrow\; x + 2y = 5
$$

$$
3^{x} \div 3^{2y} = 3^{-1} \;\Rightarrow\; x - 2y = -1
$$`,
      }),
      P.fib({
        label: "(b)", stem: "Hence find x and y.",
        template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: 3 }, { id: "y", input: "number", accepted: [1.5], wrong: 1 }],
        explanation: t`Adding: $2x = 4$, so $x = 2$. Then $2 + 2y = 5$ gives $y = \frac{3}{2}$.`,
      }),
    ],
    explanation: t`Matching bases turns each exponential equation into a linear one: $x + 2y = 5$ and $x - 2y = -1$, so $x = 2$ and $y = 1.5$. Check: $2^{2} \times 4^{1.5} = 4 \times 8 = 32$.`,
    hints: ["Write the first equation with base 2 and the second with base 3.", "Add the two linear equations to eliminate y."],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Farai simplifies $\dfrac{x^{\frac{3}{2}} - x^{\frac{1}{2}}}{x^{\frac{1}{2}}}$ for $x > 0$. Which answer is correct?`,
    options: [
      [t`$x - 1$`, t`Correct: divide each term by $x^{\frac{1}{2}}$: $x^{\frac{3}{2} - \frac{1}{2}} - x^{0} = x - 1$.`],
      [t`$x$`, t`$x^{\frac{1}{2}} \div x^{\frac{1}{2}}$ is 1, not 0, so a term $-1$ remains.`],
      [t`$x^{\frac{3}{4}} - 1$`, "The indices have been divided instead of subtracted."],
      [t`$x^{2} - x$`, "The indices have been added instead of subtracted."],
    ],
    answer: "A",
    explanation: t`Divide every term of the numerator by $x^{\frac{1}{2}}$: $\dfrac{x^{\frac{3}{2}}}{x^{\frac{1}{2}}} - \dfrac{x^{\frac{1}{2}}}{x^{\frac{1}{2}}} = x - 1$.`,
    hints: ["Split the fraction into two fractions with the same denominator."],
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`How many real solutions does $5^{2x} + 4 \times 5^{x} + 3 = 0$ have?`,
    options: [
      [t`$0$`, t`Correct: $u = 5^{x}$ gives $(u + 1)(u + 3) = 0$, and both roots are negative, which $5^{x}$ can never be.`],
      [t`$2$`, "The quadratic in u has two roots, but each must give a positive value of 5 to the power x."],
      [t`$1$`, "Neither root of the quadratic in u is positive, so neither gives a value of x."],
      [t`$3$`, "A quadratic in u has at most two roots, and here neither of them is allowed."],
    ],
    answer: "A",
    explanation: t`With $u = 5^{x}$: $u^{2} + 4u + 3 = (u + 1)(u + 3) = 0$, so $u = -1$ or $u = -3$. Since $5^{x} > 0$ for all real $x$, there are no real solutions.`,
    hints: [t`Substitute $u = 5^{x}$ and solve for $u$.`, t`What sign must $5^{x}$ have?`],
  });

  b.card("FORMULA", t`Laws of indices for multiplying, dividing and powers`, t`$a^{m} \times a^{n} = a^{m+n}$, $a^{m} \div a^{n} = a^{m-n}$, $\left(a^{m}\right)^{n} = a^{mn}$ (same base only).`);
  b.card("DEFINITION", t`What does $a^{-n}$ mean?`, t`The reciprocal of $a^{n}$: $a^{-n} = \dfrac{1}{a^{n}}$. It is never negative for $a > 0$.`);
  b.card("DEFINITION", t`What does $a^{\frac{m}{n}}$ mean?`, t`$\left(\sqrt[n]{a}\right)^{m}$: the denominator is a root, the numerator a power. Take the root first.`);
  b.card("FACT", t`Value of $a^{0}$`, t`$a^{0} = 1$ for every $a \neq 0$.`);
  b.card("CONCEPT", "How do you solve an exponential equation such as 4^(x+1) = 8^x?", t`Write both sides as powers of the same base ($2^{2x+2} = 2^{3x}$), then equate the indices ($2x + 2 = 3x$, $x = 2$).`);
  b.card("CONCEPT", t`Equation containing $a^{2x}$ and $a^{x}$`, t`Substitute $u = a^{x}$ (so $a^{2x} = u^{2}$), solve the quadratic in $u$, then solve $a^{x} = u$.`);
  b.card("FACT", t`Why reject $u \leq 0$ after substituting $u = a^{x}$?`, t`$a^{x} > 0$ for every real $x$ when $a > 0$, so $a^{x}$ can never equal zero or a negative number.`);
  b.card("CONCEPT", t`Rewrite $a^{x+k}$ and $a^{x-k}$`, t`$a^{x+k} = a^{k} \times a^{x}$ and $a^{x-k} = \dfrac{a^{x}}{a^{k}}$, so terms can be collected as multiples of $a^{x}$.`);
  b.card("FACT", t`Is $2^{x} + 2^{x} = 2^{2x}$?`, t`No. $2^{x} + 2^{x} = 2 \times 2^{x} = 2^{x+1}$. Adding terms never adds indices.`);
});
