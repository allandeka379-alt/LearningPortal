// W1a: amaths.algebra.partial-fractions (ZIMSEC Pure incl. improper; Cambridge P3 proper only).
import { concept, P, t, chk, ZP, poly, same } from "../lib.mjs";

/** Asserts two functions agree at several sample points (checks a partial-fraction identity). */
const ident = (f, g, label) => {
  for (const x of [0.37, 2.9, -4.3, 5.6, 7.1, -0.81]) chk(f(x), g(x), 1e-9, label);
};

concept("amaths.algebra.partial-fractions", { file: "algebra/partial-fractions", keyPrefix: "algebra.partial-fractions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which is the correct form of the partial fractions for $\dfrac{x + 5}{(x - 2)(x + 1)^{2}}$?`,
    options: [
      [t`$\dfrac{A}{x - 2} + \dfrac{B}{x + 1} + \dfrac{C}{(x + 1)^{2}}$`, "Correct: a repeated linear factor needs a term for each power."],
      [t`$\dfrac{A}{x - 2} + \dfrac{B}{(x + 1)^{2}}$`, "The term over (x + 1) is missing; two constants cannot fit every such fraction."],
      [t`$\dfrac{A}{x - 2} + \dfrac{Bx + C}{(x + 1)^{2}}$`, "Bx + C is used over an irreducible quadratic, not over a repeated linear factor."],
      [t`$\dfrac{A}{x - 2} + \dfrac{B}{x + 1} + \dfrac{C}{x + 1}$`, "The last two terms are the same type and merge into one; the squared factor is lost."],
    ],
    answer: "A",
    explanation: t`A repeated factor $(x + 1)^{2}$ contributes $\dfrac{B}{x + 1} + \dfrac{C}{(x + 1)^{2}}$, and the linear factor contributes $\dfrac{A}{x - 2}$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which is the correct form of the partial fractions for $\dfrac{3x + 8}{x(x^{2} + 4)}$?`,
    options: [
      [t`$\dfrac{A}{x} + \dfrac{Bx + C}{x^{2} + 4}$`, t`Correct: $x^{2} + 4$ has no real factors, so it takes a linear numerator.`],
      [t`$\dfrac{A}{x} + \dfrac{B}{x^{2} + 4}$`, "A constant numerator over a quadratic factor is not general enough."],
      [t`$\dfrac{A}{x} + \dfrac{B}{x + 2} + \dfrac{C}{x - 2}$`, t`$x^{2} + 4$ does not factorise; $x^{2} - 4$ would.`],
      [t`$\dfrac{Ax + B}{x} + \dfrac{C}{x^{2} + 4}$`, "The numerators are the wrong way round: constant over the linear factor, linear over the quadratic."],
    ],
    answer: "A",
    explanation: t`Over each factor the numerator has degree one less than the factor: a constant over $x$ and $Bx + C$ over the irreducible quadratic $x^{2} + 4$.`,
  });

  // (x + 11)/((x + 3)(x − 1)) = −2/(x + 3) + 3/(x − 1)
  ident((x) => (x + 11) / ((x + 3) * (x - 1)), (x) => -2 / (x + 3) + 3 / (x - 1), "q3");
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\dfrac{x + 11}{(x + 3)(x - 1)} \equiv \dfrac{A}{x + 3} + \dfrac{B}{x - 1}$, find $A$ and $B$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}",
    blanks: [{ id: "A", input: "number", accepted: [-2], wrong: 2 }, { id: "B", input: "number", accepted: [3], wrong: -3 }],
    explanation: t`$x + 11 \equiv A(x - 1) + B(x + 3)$. $x = 1$: $12 = 4B$, $B = 3$. $x = -3$: $8 = -4A$, $A = -2$.`,
  });

  // (x² + 9x − 4)/(x(x − 1)(x + 2)) = 2/x + 2/(x − 1) − 3/(x + 2)
  ident((x) => (x * x + 9 * x - 4) / (x * (x - 1) * (x + 2)), (x) => 2 / x + 2 / (x - 1) - 3 / (x + 2), "q4");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $\dfrac{x^{2} + 9x - 4}{x(x - 1)(x + 2)}$ in the form $\dfrac{A}{x} + \dfrac{B}{x - 1} + \dfrac{C}{x + 2}$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
    blanks: [
      { id: "A", input: "number", accepted: [2], wrong: -2 },
      { id: "B", input: "number", accepted: [2], wrong: 6 },
      { id: "C", input: "number", accepted: [-3], wrong: 3 },
    ],
    explanation: t`$x^{2} + 9x - 4 \equiv A(x - 1)(x + 2) + Bx(x + 2) + Cx(x - 1)$. $x = 0$: $-4 = -2A$, $A = 2$. $x = 1$: $6 = 3B$, $B = 2$. $x = -2$: $4 - 18 - 4 = -18 = 6C$, $C = -3$. Check $x^{2}$: $A + B + C = 1$.`,
    hints: ["Substitute x = 0, x = 1 and x = −2 in turn.", "Check with the coefficient of x²."],
  });

  // (5x² − 2x + 1)/((x + 1)(x − 1)²) = 2/(x + 1) + 3/(x − 1) + 2/(x − 1)²
  ident((x) => (5 * x * x - 2 * x + 1) / ((x + 1) * (x - 1) ** 2), (x) => 2 / (x + 1) + 3 / (x - 1) + 2 / (x - 1) ** 2, "q5");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\dfrac{5x^{2} - 2x + 1}{(x + 1)(x - 1)^{2}} \equiv \dfrac{A}{x + 1} + \dfrac{B}{x - 1} + \dfrac{C}{(x - 1)^{2}}$, find $A$, $B$ and $C$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
    blanks: [
      { id: "A", input: "number", accepted: [2], wrong: 4 },
      { id: "B", input: "number", accepted: [3], wrong: 5 },
      { id: "C", input: "number", accepted: [2], wrong: 4 },
    ],
    explanation: t`$5x^{2} - 2x + 1 \equiv A(x - 1)^{2} + B(x + 1)(x - 1) + C(x + 1)$. $x = -1$: $8 = 4A$, $A = 2$. $x = 1$: $4 = 2C$, $C = 2$. $x^{2}$: $5 = A + B$, $B = 3$.`,
    hints: ["Two substitutions give A and C.", "Equate the coefficients of x² to find B."],
  });

  // (3x² + 4x + 7)/((x + 1)(x² + 2)) = 2/(x + 1) + (x + 3)/(x² + 2)
  ident((x) => (3 * x * x + 4 * x + 7) / ((x + 1) * (x * x + 2)), (x) => 2 / (x + 1) + (x + 3) / (x * x + 2), "q6");
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Express $\dfrac{3x^{2} + 4x + 7}{(x + 1)(x^{2} + 2)}$ in the form $\dfrac{A}{x + 1} + \dfrac{Bx + C}{x^{2} + 2}$.`,
    template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
    blanks: [
      { id: "A", input: "number", accepted: [2], wrong: 6 },
      { id: "B", input: "number", accepted: [1], wrong: -3 },
      { id: "C", input: "number", accepted: [3], wrong: -5 },
    ],
    explanation: t`$3x^{2} + 4x + 7 \equiv A(x^{2} + 2) + (Bx + C)(x + 1)$. $x = -1$: $6 = 3A$, $A = 2$. $x^{2}$: $3 = A + B$, $B = 1$. Constants: $7 = 2A + C$, $C = 3$. Check $x$: $4 = B + C$.`,
    hints: ["Only x = −1 makes a factor zero.", "Then equate the coefficients of x² and the constant terms."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: t`$\dfrac{x^{3} + 1}{x^{2} - 4}$ can be written directly as $\dfrac{A}{x - 2} + \dfrac{B}{x + 2}$ for suitable constants $A$ and $B$.`,
    answer: false,
    explanation: t`False. The fraction is improper (degree 3 over degree 2). A sum $\dfrac{A}{x - 2} + \dfrac{B}{x + 2}$ is always proper, so you must divide first: $\dfrac{x^{3} + 1}{x^{2} - 4} = x + \dfrac{4x + 1}{x^{2} - 4}$, and then split the proper part.`,
  });

  // (7x + 4)/((2x − 1)(x + 2)) = 3/(2x − 1) + 2/(x + 2)
  ident((x) => (7 * x + 4) / ((2 * x - 1) * (x + 2)), (x) => 3 / (2 * x - 1) + 2 / (x + 2), "q8");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given that $\dfrac{7x + 4}{(2x - 1)(x + 2)} \equiv \dfrac{A}{2x - 1} + \dfrac{B}{x + 2}$, find the value of $A$.`,
    value: 3, prefix: "A =", wrong: [7.5, 2],
    explanation: t`$7x + 4 \equiv A(x + 2) + B(2x - 1)$. Put $x = \frac{1}{2}$: $\frac{15}{2} = \frac{5}{2}A$, so $A = 3$. (Then $x = -2$ gives $-10 = -5B$, $B = 2$.)`,
  });

  // improper: (2x² + 5x + 1)/((x + 1)(x + 2)) = 2 − 2/(x + 1) + 1/(x + 2)
  ident((x) => (2 * x * x + 5 * x + 1) / ((x + 1) * (x + 2)), (x) => 2 - 2 / (x + 1) + 1 / (x + 2), "q9");
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Express $\dfrac{2x^{2} + 5x + 1}{(x + 1)(x + 2)}$ in the form $P + \dfrac{A}{x + 1} + \dfrac{B}{x + 2}$.`,
    template: "P = {{blank:P}}, A = {{blank:A}}, B = {{blank:B}}",
    blanks: [
      { id: "P", input: "number", accepted: [2], wrong: 0 },
      { id: "A", input: "number", accepted: [-2], wrong: -2 },
      { id: "B", input: "number", accepted: [1], wrong: 5 },
    ],
    explanation: t`The fraction is improper. $2x^{2} + 5x + 1 = 2(x^{2} + 3x + 2) + (-x - 3)$, so $P = 2$ and $\dfrac{-x - 3}{(x + 1)(x + 2)} = \dfrac{A}{x + 1} + \dfrac{B}{x + 2}$ with $-x - 3 \equiv A(x + 2) + B(x + 1)$. $x = -1$: $A = -2$. $x = -2$: $-1 = -B$, $B = 1$.`,
    hints: ["Degree 2 over degree 2: divide first.", "P is the ratio of the leading coefficients."],
  });

  ident((x) => 6 / (x * (x + 3)), (x) => 2 / x - 2 / (x + 3), "q10");
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Which of these is equal to $\dfrac{6}{x(x + 3)}$?`,
    options: [
      [t`$\dfrac{2}{x} - \dfrac{2}{x + 3}$`, t`Correct: $6 \equiv A(x + 3) + Bx$ gives $A = 2$ ($x = 0$) and $B = -2$ ($x = -3$).`],
      [t`$\dfrac{2}{x} + \dfrac{2}{x + 3}$`, "The sign of B is wrong: at x = −3, 6 = −3B."],
      [t`$\dfrac{6}{x} - \dfrac{6}{x + 3}$`, t`This combines to $\dfrac{18}{x(x + 3)}$.`],
      [t`$\dfrac{1}{x} - \dfrac{1}{x + 3}$`, t`This combines to $\dfrac{3}{x(x + 3)}$, half the required fraction.`],
    ],
    answer: "A",
    explanation: t`$6 \equiv A(x + 3) + Bx$. $x = 0$: $A = 2$; $x = -3$: $B = -2$. Check: $\dfrac{2(x + 3) - 2x}{x(x + 3)} = \dfrac{6}{x(x + 3)}$.`,
  });

  ident((x) => 2 / (x - 1) - 1 / (x + 1), (x) => (x + 3) / (x * x - 1), "q11");
  b.proof({
    d: 2, skill: "UNDERSTANDING", marks: 2, calculator: false,
    stem: t`Show that $\dfrac{2}{x - 1} - \dfrac{1}{x + 1} \equiv \dfrac{x + 3}{x^{2} - 1}$.`,
    points: [t`M1 uses the common denominator $(x - 1)(x + 1)$ with numerator $2(x + 1) - (x - 1)$`, t`A1 simplifies the numerator to $x + 3$ and writes the denominator as $x^{2} - 1$`],
    modelAnswer: ["$$", t`\frac{2}{x - 1} - \frac{1}{x + 1} = \frac{2(x + 1) - (x - 1)}{(x - 1)(x + 1)} = \frac{2x + 2 - x + 1}{x^{2} - 1} = \frac{x + 3}{x^{2} - 1}`, "$$"].join("\n"),
    explanation: t`Combining partial fractions is the reverse of splitting; it is also a quick check on a partial-fraction answer.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each denominator with the form of its partial fractions (for a proper fraction).",
    pairs: [
      [t`$(x + 1)(x - 4)$`, t`$\dfrac{A}{x + 1} + \dfrac{B}{x - 4}$`],
      [t`$(x + 1)(x - 4)^{2}$`, t`$\dfrac{A}{x + 1} + \dfrac{B}{x - 4} + \dfrac{C}{(x - 4)^{2}}$`],
      [t`$(x + 1)(x^{2} + 4)$`, t`$\dfrac{A}{x + 1} + \dfrac{Bx + C}{x^{2} + 4}$`],
      [t`$(x + 1)(x - 4)(x + 4)$`, t`$\dfrac{A}{x + 1} + \dfrac{B}{x - 4} + \dfrac{C}{x + 4}$`],
    ],
    explanation: t`Distinct linear factors each take a constant; a repeated factor takes one term per power; an irreducible quadratic takes a linear numerator. Note $x^{2} - 16$ factorises but $x^{2} + 4$ does not.`,
  });

  // 1/((x + 1)(x + 2)(x + 3)): coefficient over (x + 2) is 1/((−1)(1)) = −1
  ident((x) => 1 / ((x + 1) * (x + 2) * (x + 3)), (x) => 0.5 / (x + 1) - 1 / (x + 2) + 0.5 / (x + 3), "q13");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given that $\dfrac{1}{(x + 1)(x + 2)(x + 3)} \equiv \dfrac{A}{x + 1} + \dfrac{B}{x + 2} + \dfrac{C}{x + 3}$, find the value of $B$.`,
    value: -1, prefix: "B =", wrong: [1, 0.5],
    explanation: t`$1 \equiv A(x + 2)(x + 3) + B(x + 1)(x + 3) + C(x + 1)(x + 2)$. Put $x = -2$: $1 = B(-1)(1)$, so $B = -1$. (Similarly $A = C = \frac{1}{2}$.)`,
    hints: ["Choose the value of x that makes every other term zero."],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`In the identity $3x + 1 \equiv A(x - 2) + B$, coming from $\dfrac{3x + 1}{(x - 2)^{2}} \equiv \dfrac{A}{x - 2} + \dfrac{B}{(x - 2)^{2}}$, substituting $x = 2$ gives $B$ but not $A$.`,
    answer: true,
    explanation: t`True. At $x = 2$ the term $A(x - 2)$ vanishes, leaving $B = 7$. $A$ comes from equating coefficients of $x$: $A = 3$. So $\dfrac{3x + 1}{(x - 2)^{2}} = \dfrac{3}{x - 2} + \dfrac{7}{(x - 2)^{2}}$.`,
    hints: ["Which term is zero when x = 2?"],
  });
  ident((x) => (3 * x + 1) / (x - 2) ** 2, (x) => 3 / (x - 2) + 7 / (x - 2) ** 2, "q14");

  // 5x/((x − 1)(x² + 4)) = 1/(x − 1) + (−x + 4)/(x² + 4)
  ident((x) => (5 * x) / ((x - 1) * (x * x + 4)), (x) => 1 / (x - 1) + (-x + 4) / (x * x + 4), "q15");
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given that $\dfrac{5x}{(x - 1)(x^{2} + 4)} \equiv \dfrac{A}{x - 1} + \dfrac{Bx + C}{x^{2} + 4}$, what is the value of $C$?`,
    options: [
      [t`$4$`, t`Correct: $A = 1$, then the constants give $0 = 4A - C$, so $C = 4$.`],
      [t`$-4$`, "Sign slip: the constant term of (Bx + C)(x − 1) is −C, so 0 = 4A − C."],
      [t`$-1$`, "This is B, from the x² coefficients: 0 = A + B."],
      [t`$0$`, "The numerator 5x has no constant term, but C need not be 0: the constant terms give 0 = 4A − C."],
    ],
    answer: "A",
    explanation: t`$5x \equiv A(x^{2} + 4) + (Bx + C)(x - 1)$. $x = 1$: $5 = 5A$, $A = 1$. $x^{2}$: $0 = A + B$, $B = -1$. Constants: $0 = 4A - C$, $C = 4$. So the fraction is $\dfrac{1}{x - 1} + \dfrac{4 - x}{x^{2} + 4}$.`,
    hints: ["Find A by substituting x = 1.", "Compare the constant terms on each side."],
  });

  // (4x² + x + 5)/((2x − 1)(x² + 3)) = 2/(2x − 1) + (x + 1)/(x² + 3)
  ident((x) => (4 * x * x + x + 5) / ((2 * x - 1) * (x * x + 3)), (x) => 2 / (2 * x - 1) + (x + 1) / (x * x + 3), "q16");
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Let $f(x) = \dfrac{4x^{2} + x + 5}{(2x - 1)(x^{2} + 3)}$.`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1, stem: "Which form should be used for the partial fractions of f(x)?",
        options: [
          [t`$\dfrac{A}{2x - 1} + \dfrac{Bx + C}{x^{2} + 3}$`, "Correct: constant over the linear factor, linear over the irreducible quadratic."],
          [t`$\dfrac{A}{2x - 1} + \dfrac{B}{x^{2} + 3}$`, "A quadratic factor needs a linear numerator."],
          [t`$\dfrac{A}{2x - 1} + \dfrac{B}{x + \sqrt{3}} + \dfrac{C}{x - \sqrt{3}}$`, t`$x^{2} + 3$ does not factorise into real linear factors.`],
          [t`$2 + \dfrac{A}{2x - 1} + \dfrac{Bx + C}{x^{2} + 3}$`, "The fraction is proper (degree 2 over degree 3), so there is no polynomial part."],
        ],
        answer: "A",
        explanation: t`Proper fraction; $x^{2} + 3$ is irreducible, so the form is $\dfrac{A}{2x - 1} + \dfrac{Bx + C}{x^{2} + 3}$.`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "Find the constants.",
        template: "A = {{blank:A}}, B = {{blank:B}}, C = {{blank:C}}",
        blanks: [
          { id: "A", input: "number", accepted: [2], wrong: 4 },
          { id: "B", input: "number", accepted: [1], wrong: 0 },
          { id: "C", input: "number", accepted: [1], wrong: -1 },
        ],
        explanation: t`$4x^{2} + x + 5 \equiv A(x^{2} + 3) + (Bx + C)(2x - 1)$. $x = \frac{1}{2}$: $1 + \frac{1}{2} + 5 = \frac{13}{2} = \frac{13}{4}A$, so $A = 2$. $x^{2}$: $4 = A + 2B$, $B = 1$. Constants: $5 = 3A - C$, $C = 1$.`,
      }),
    ],
    explanation: t`$f(x) = \dfrac{2}{2x - 1} + \dfrac{x + 1}{x^{2} + 3}$. Check at $x = 0$: $f(0) = \frac{5}{-3}$ and $-2 + \frac{1}{3} = -\frac{5}{3}$.`,
    hints: [t`Substitute $x = \frac{1}{2}$ first.`, "Then compare coefficients of x² and constant terms."],
  });

  // ZIMSEC improper: (x³ − 2x² + 4)/((x − 1)(x + 1)) = x − 2 + (3/2)/(x − 1) − (1/2)/(x + 1)
  same(poly.div([1, -2, 0, 4], [1, 0, -1]), { q: [1, -2], r: [1, 2] });
  ident((x) => (x ** 3 - 2 * x * x + 4) / ((x - 1) * (x + 1)), (x) => x - 2 + 1.5 / (x - 1) - 0.5 / (x + 1), "q17");
  b.struct({
    examStyle: true, d: 5, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`Let $g(x) = \dfrac{x^{3} - 2x^{2} + 4}{(x - 1)(x + 1)}$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Divide $x^{3} - 2x^{2} + 4$ by $x^{2} - 1$.`,
        template: "Quotient: x + {{blank:q}}; remainder: x + {{blank:r}}",
        blanks: [{ id: "q", input: "number", accepted: [-2], wrong: 2 }, { id: "r", input: "number", accepted: [2], wrong: 6 }],
        explanation: t`$x(x^{2} - 1) = x^{3} - x$ leaves $-2x^{2} + x + 4$; $-2(x^{2} - 1)$ leaves $x + 2$. So $x^{3} - 2x^{2} + 4 \equiv (x^{2} - 1)(x - 2) + (x + 2)$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`Hence express $g(x)$ in the form $x - 2 + \dfrac{A}{x - 1} + \dfrac{B}{x + 1}$. Give A and B as decimals.`,
        template: "A = {{blank:A}}, B = {{blank:B}}",
        blanks: [{ id: "A", input: "number", accepted: [1.5], wrong: 3 }, { id: "B", input: "number", accepted: [-0.5], wrong: 0.5 }],
        explanation: t`$x + 2 \equiv A(x + 1) + B(x - 1)$. $x = 1$: $3 = 2A$, $A = \frac{3}{2}$. $x = -1$: $1 = -2B$, $B = -\frac{1}{2}$.`,
      }),
    ],
    explanation: t`$g(x) = x - 2 + \dfrac{3}{2(x - 1)} - \dfrac{1}{2(x + 1)}$. The polynomial part comes from division because the fraction is improper.`,
    hints: ["Degree 3 over degree 2: divide first.", "Split the proper remainder fraction as usual."],
  });

  // (x² + 3)/(x(x − 1)) = 1 + (x + 3)/(x(x − 1)) = 1 − 3/x + 4/(x − 1)
  ident((x) => (x * x + 3) / (x * (x - 1)), (x) => 1 - 3 / x + 4 / (x - 1), "q18");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Express $\dfrac{x^{2} + 3}{x(x - 1)}$ in partial fractions.`,
    options: [
      [t`$1 - \dfrac{3}{x} + \dfrac{4}{x - 1}$`, t`Correct: divide to get $1 + \dfrac{x + 3}{x(x - 1)}$, then split.`],
      [t`$-\dfrac{3}{x} + \dfrac{4}{x - 1}$`, "The polynomial part 1 from the division is missing: this sum is proper."],
      [t`$1 + \dfrac{3}{x} - \dfrac{4}{x - 1}$`, "The signs of both constants are reversed."],
      [t`$1 - \dfrac{3}{x} + \dfrac{3}{x - 1}$`, t`At $x = 1$ the remainder $x + 3$ equals 4, so the second constant is 4.`],
    ],
    answer: "A",
    explanation: t`$x^{2} + 3 = 1 \times (x^{2} - x) + (x + 3)$. Then $x + 3 \equiv A(x - 1) + Bx$: $x = 0$ gives $A = -3$, $x = 1$ gives $B = 4$. So the answer is $1 - \dfrac{3}{x} + \dfrac{4}{x - 1}$.`,
    hints: ["The fraction is improper: divide first."],
  });

  b.card("DEFINITION", "Proper rational function", "The degree of the numerator is less than the degree of the denominator. Only proper fractions split directly into partial fractions.");
  b.card("FORMULA", "Partial-fraction form for distinct linear factors", t`$\dfrac{px + q}{(ax + b)(cx + d)} \equiv \dfrac{A}{ax + b} + \dfrac{B}{cx + d}$`);
  b.card("FORMULA", "Partial-fraction form for a repeated linear factor", t`$\dfrac{px^{2} + qx + r}{(ax + b)(cx + d)^{2}} \equiv \dfrac{A}{ax + b} + \dfrac{B}{cx + d} + \dfrac{C}{(cx + d)^{2}}$`);
  b.card("FORMULA", "Partial-fraction form with an irreducible quadratic factor", t`$\dfrac{px^{2} + qx + r}{(ax + b)(cx^{2} + d)} \equiv \dfrac{A}{ax + b} + \dfrac{Bx + C}{cx^{2} + d}$`);
  b.card("CONCEPT", "How do you find the constants?", "Multiply through by the denominator to get an identity; substitute the roots of the factors; equate coefficients for any constant left; check at another value.");
  b.card("CONCEPT", "What do you do with an improper fraction?", "Divide first: polynomial + proper fraction, then split the proper fraction.", undefined, { applies: ZP });
  b.card("FACT", "Which board examines partial fractions of improper fractions?", "ZIMSEC (Form 5). Cambridge 9709 (Paper 3 only) uses proper fractions only.");
  b.card("FACT", "Why are partial fractions useful?", "Each simple fraction is easy to integrate (giving logarithms), to expand as a binomial series, or to sum by the method of differences.");
});
