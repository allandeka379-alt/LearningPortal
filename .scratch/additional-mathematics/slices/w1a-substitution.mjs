// W1a: amath.algebra.substitution (Cambridge only) — equations reducible to quadratic form.
import { concept, P, t, chk, same, quad, sf, ln, lg } from "../lib.mjs";

const nb = (id, v, w) => ({ id, input: "number", accepted: [v], wrong: w });
/** Number blank for a 3-s.f. answer: accepts the rounded value with a half-unit tolerance. */
const nb3 = (id, exact, w) => {
  const v = sf(exact, 3);
  const dp = 3 - 1 - Math.floor(Math.log10(Math.abs(exact)));
  return { id, input: "number", accepted: [v], tolerance: Number((0.5 * 10 ** -dp).toPrecision(2)), wrong: w };
};

concept("amath.algebra.substitution", { file: "algebra/substitution", keyPrefix: "algebra.substitution" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which substitution turns $x^{\frac{2}{3}} + 2x^{\frac{1}{3}} - 8 = 0$ into a quadratic equation?`,
    options: [
      [t`$u = x^{\frac{1}{3}}$`, t`Correct: then $x^{\frac{2}{3}} = u^{2}$ and the equation is $u^{2} + 2u - 8 = 0$.`],
      [t`$u = x^{\frac{2}{3}}$`, t`Then $x^{\frac{1}{3}} = \sqrt{u}$, which does not give a quadratic.`],
      [t`$u = x^{3}$`, "The indices are thirds; cubing x makes them more complicated."],
      [t`$u = \sqrt{x}$`, t`$x^{\frac{1}{3}}$ is a cube root, not a square root.`],
    ],
    answer: "A",
    explanation: t`$x^{\frac{2}{3}} = \left(x^{\frac{1}{3}}\right)^{2}$, so $u = x^{\frac{1}{3}}$ gives $u^{2} + 2u - 8 = 0$.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`With $u = e^{x}$, which expression equals $e^{2x}$?`,
    options: [
      [t`$u^{2}$`, t`Correct: $e^{2x} = \left(e^{x}\right)^{2}$.`],
      [t`$2u$`, t`$e^{2x}$ is a square, not double: $e^{2x} \neq 2e^{x}$.`],
      [t`$u + 2$`, "Indices multiply when you square; nothing is added."],
      [t`$e^{u}$`, t`$e^{u} = e^{e^{x}}$, which is a different expression.`],
    ],
    answer: "A",
    explanation: t`By the laws of indices, $e^{2x} = e^{x \times 2} = \left(e^{x}\right)^{2} = u^{2}$.`,
  });

  same(quad.roots(1, -7, 10), [2, 5]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x - 7\sqrt{x} + 10 = 0$.`,
    template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
    blanks: [nb("x1", 4, 2), nb("x2", 25, 5)],
    explanation: t`Let $u = \sqrt{x}$: $u^{2} - 7u + 10 = 0$, so $u = 2$ or $u = 5$. Then $x = 2^{2} = 4$ or $x = 5^{2} = 25$.`,
  });

  same(quad.roots(1, -3, 2), [1, 2]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x^{\frac{2}{3}} - 3x^{\frac{1}{3}} + 2 = 0$.`,
    template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
    blanks: [nb("x1", 1, 2), nb("x2", 8, 2)],
    explanation: t`Let $u = x^{\frac{1}{3}}$: $u^{2} - 3u + 2 = 0$, so $u = 1$ or $u = 2$. Cubing: $x = 1$ or $x = 8$.`,
    hints: [t`$x^{\frac{2}{3}} = \left(x^{\frac{1}{3}}\right)^{2}$.`, t`If $x^{\frac{1}{3}} = 2$, cube both sides.`],
  });

  same(quad.roots(1, -9, 20), [4, 5]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Solve $e^{2x} - 9e^{x} + 20 = 0$, giving your answers correct to 3 significant figures.`,
    template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
    blanks: [nb3("x1", ln(4), 4), nb3("x2", ln(5), 5)],
    explanation: t`Let $u = e^{x}$: $u^{2} - 9u + 20 = 0$, so $u = 4$ or $u = 5$. Then $x = \ln 4 = 1.39$ or $x = \ln 5 = 1.61$.`,
    hints: [t`Let $u = e^{x}$.`, t`$e^{x} = k$ gives $x = \ln k$.`],
  });

  same(quad.roots(2, 1, -3), [-1.5, 1]);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $2x + \sqrt{x} - 3 = 0$.`,
    value: 1, prefix: "x =", wrong: [2.25, -1.5],
    explanation: t`Let $u = \sqrt{x}$: $2u^{2} + u - 3 = 0$, so $(2u + 3)(u - 1) = 0$. $u = -\frac{3}{2}$ is rejected because $\sqrt{x} \geq 0$. So $\sqrt{x} = 1$ and $x = 1$.`,
    hints: [t`Let $u = \sqrt{x}$ and factorise.`, "Can a square root be negative?"],
  });

  same(quad.roots(1, -2, -8), [-2, 4]);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $4^{x} - 2^{x+1} - 8 = 0$.`,
    value: 2, prefix: "x =", wrong: [4, -1],
    explanation: t`Let $u = 2^{x}$: $4^{x} = u^{2}$ and $2^{x+1} = 2u$. So $u^{2} - 2u - 8 = 0$, $(u - 4)(u + 2) = 0$. Reject $u = -2$ ($2^{x} > 0$). $2^{x} = 4$ gives $x = 2$.`,
    hints: [t`$2^{x+1} = 2 \times 2^{x}$.`],
  });

  same(quad.roots(3, 1, -10), [-2, 5 / 3]);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Solve $3e^{2x} + e^{x} - 10 = 0$, giving your answer correct to 3 significant figures.`,
    value: ln(5 / 3), prefix: "x =", wrong: [1.67, 1.61],
    explanation: t`Let $u = e^{x}$: $3u^{2} + u - 10 = 0$, so $(3u - 5)(u + 2) = 0$. Reject $u = -2$ because $e^{x} > 0$. Then $e^{x} = \frac{5}{3}$ and $x = \ln \frac{5}{3} = 0.511$.`,
    workedSolution: t`1. Let $u = e^{x}$: $3u^{2} + u - 10 = 0$.
2. $(3u - 5)(u + 2) = 0$, so $u = \frac{5}{3}$ or $u = -2$.
3. $e^{x} = -2$ is impossible because $e^{x} > 0$.
4. $e^{x} = \frac{5}{3}$, so $x = \ln \frac{5}{3} = 0.511$ (3 s.f.).`,
    hints: [t`Let $u = e^{x}$.`, "One of the values of u must be rejected."],
  });

  same(quad.roots(1, -1, -6), [-2, 3]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Solve $(\ln x)^{2} - \ln x - 6 = 0$, giving your answers correct to 3 significant figures.`,
    template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
    blanks: [nb3("x1", Math.exp(-2), -2), nb3("x2", Math.exp(3), 3)],
    explanation: t`Let $u = \ln x$: $u^{2} - u - 6 = 0$, so $u = 3$ or $u = -2$. Both are allowed ($\ln x$ can be negative). $x = e^{-2} = 0.135$ or $x = e^{3} = 20.1$.`,
    hints: [t`Let $u = \ln x$.`, t`$\ln x = k$ gives $x = e^{k}$.`],
  });

  same(quad.roots(1, -1, -6), [-2, 3]);
  chk(Math.exp(ln(3)) - 6 * Math.exp(-ln(3)), 1);
  b.expr({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $e^{x} - 6e^{-x} = 1$, giving your answer in exact form (for example ln 7).`,
    accepted: ["ln3", "ln(3)", "x=ln3", "x=ln(3)"],
    rejected: [{ value: "ln(-2)", feedback: "e^x = −2 is impossible because e^x > 0; reject it." }],
    explanation: t`Multiply by $e^{x}$: $e^{2x} - 6 = e^{x}$, so $u^{2} - u - 6 = 0$ with $u = e^{x}$. $(u - 3)(u + 2) = 0$; reject $u = -2$. So $e^{x} = 3$ and $x = \ln 3$.`,
    hints: [t`Multiply every term by $e^{x}$.`, t`$e^{-x} \times e^{x} = 1$.`],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The equation $\sqrt{x} = -2$ has a real solution.`,
    answer: false,
    explanation: t`The symbol $\sqrt{x}$ means the non-negative square root, so it can never equal $-2$. (Squaring gives $x = 4$, but $\sqrt{4} = 2$, not $-2$.)`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The equation $e^{x} = -3$ has no real solution.`,
    answer: true,
    explanation: t`$e^{x} > 0$ for every real $x$, so it can never equal a negative number.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each equation to the substitution that makes it a quadratic.",
    pairs: [
      [t`$x - 4\sqrt{x} + 3 = 0$`, t`$u = \sqrt{x}$`],
      [t`$x^{\frac{2}{3}} + x^{\frac{1}{3}} - 2 = 0$`, t`$u = x^{\frac{1}{3}}$`],
      [t`$e^{2x} - e^{x} - 2 = 0$`, t`$u = e^{x}$`],
      [t`$(\ln x)^{2} - 4\ln x + 3 = 0$`, t`$u = \ln x$`],
    ],
    explanation: "In each equation, one term is the square of another; that other term becomes u.",
  });

  same(quad.roots(1, 2, -8), [-4, 2]);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`What is the complete solution of $x + 2\sqrt{x} - 8 = 0$?`,
    options: [
      [t`$x = 4$ only`, t`Correct: $u = \sqrt{x}$ gives $(u + 4)(u - 2) = 0$; $u = -4$ is rejected, so $x = 4$.`],
      [t`$x = 4$ or $x = 16$`, t`$x = 16$ comes from $\sqrt{x} = -4$, which is impossible; check: $16 + 8 - 8 = 16 \neq 0$.`],
      [t`$x = 2$ or $x = -4$`, "These are the values of u = √x, not of x."],
      [t`$x = 16$ only`, t`The valid value is $\sqrt{x} = 2$, which gives $x = 4$.`],
    ],
    answer: "A",
    explanation: t`$u^{2} + 2u - 8 = 0$ gives $u = 2$ or $u = -4$. Since $\sqrt{x} \geq 0$, only $\sqrt{x} = 2$ is possible, so $x = 4$.`,
    hints: [t`Let $u = \sqrt{x}$.`],
  });

  same(quad.roots(1, -4, 3), [1, 3]);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $9^{x} - 4 \times 3^{x} + 3 = 0$.`,
    options: [
      [t`$x = 0$ or $x = 1$`, t`Correct: $u = 3^{x}$ gives $(u - 1)(u - 3) = 0$, so $3^{x} = 1$ or $3$.`],
      [t`$x = 1$ or $x = 3$`, "These are the values of u = 3ˣ, not of x."],
      [t`$x = 1$ only`, t`$3^{x} = 1$ also gives a solution, $x = 0$.`],
      [t`$x = 0$ or $x = \frac{1}{3}$`, t`$3^{x} = 3$ gives $x = 1$, not $\frac{1}{3}$.`],
    ],
    answer: "A",
    explanation: t`$9^{x} = \left(3^{x}\right)^{2}$. With $u = 3^{x}$: $u^{2} - 4u + 3 = 0$, $u = 1$ or $3$. So $x = 0$ or $x = 1$.`,
    hints: [t`$9^{x} = \left(3^{2}\right)^{x}$.`],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What are the solutions of $x - 3\sqrt{x} = 0$?`,
    options: [
      [t`$x = 0$ or $x = 9$`, t`Correct: $\sqrt{x}\left(\sqrt{x} - 3\right) = 0$, so $\sqrt{x} = 0$ or $3$.`],
      [t`$x = 9$ only`, t`Dividing by $\sqrt{x}$ loses the solution $\sqrt{x} = 0$.`],
      [t`$x = 0$ or $x = 3$`, t`$\sqrt{x} = 3$ gives $x = 9$, not 3.`],
      [t`$x = 3$ only`, "These are values of √x, and one of them has been lost."],
    ],
    answer: "A",
    explanation: t`Let $u = \sqrt{x}$: $u^{2} - 3u = 0$, $u(u - 3) = 0$, so $u = 0$ or $3$, giving $x = 0$ or $x = 9$.`,
  });

  // Structured (7 marks): 3^(2x) − 3^(x+2) + 14 = 0 -> u = 2, 7
  same(quad.roots(1, -9, 14), [2, 7]);
  const x17a = lg(2) / lg(3), x17b = lg(7) / lg(3);
  chk(3 ** (2 * x17a) - 3 ** (x17a + 2) + 14, 0, 1e-9);
  chk(3 ** (2 * x17b) - 3 ** (x17b + 2) + 14, 0, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The equation $3^{2x} - 3^{x+2} + 14 = 0$ is to be solved.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that the substitution $u = 3^{x}$ gives $u^{2} - 9u + 14 = 0$.`,
        points: [t`M1 writes $3^{2x} = u^{2}$ and $3^{x+2} = 9 \times 3^{x} = 9u$`, t`A1 obtains $u^{2} - 9u + 14 = 0$`],
        modelAnswer: t`$$
3^{2x} = \left(3^{x}\right)^{2} = u^{2}, \qquad 3^{x+2} = 3^{2} \times 3^{x} = 9u
$$

$$
3^{2x} - 3^{x+2} + 14 = u^{2} - 9u + 14 = 0
$$`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Solve the equation for u.",
        template: "u = {{blank:u1}} or u = {{blank:u2}} (smaller value first)",
        blanks: [nb("u1", 2, -2), nb("u2", 7, -7)],
        explanation: t`$(u - 2)(u - 7) = 0$, so $u = 2$ or $u = 7$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: "Hence find the values of x, correct to 3 significant figures.",
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
        blanks: [nb3("x1", x17a, 2), nb3("x2", x17b, 7)],
        explanation: t`$3^{x} = 2$: $x = \dfrac{\lg 2}{\lg 3} = 0.631$. $3^{x} = 7$: $x = \dfrac{\lg 7}{\lg 3} = 1.77$.`,
      }),
    ],
    explanation: t`Writing $3^{x+2} = 9 \times 3^{x}$ gives $u^{2} - 9u + 14 = 0$, so $3^{x} = 2$ or $7$, and taking logarithms gives $x = 0.631$ or $1.77$.`,
    hints: [t`$3^{x+2} = 3^{x} \times 3^{2}$.`, t`To solve $3^{x} = k$, take logarithms: $x = \frac{\lg k}{\lg 3}$.`],
  });

  // Structured (9 marks): e^x + 12e^(−x) = 7 -> u = 3, 4; e^x + 12e^(−x) = 6 has no solution
  same(quad.roots(1, -7, 12), [3, 4]);
  chk(quad.disc(1, -6, 12), -12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Consider the equation $e^{x} + 12e^{-x} = 7$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that, with $u = e^{x}$, the equation becomes $u^{2} - 7u + 12 = 0$.`,
        points: [t`M1 multiplies through by $e^{x}$ (or writes $12e^{-x} = \frac{12}{u}$)`, t`A1 reaches $u^{2} - 7u + 12 = 0$`],
        modelAnswer: t`$$
{e^{x}} + 12e^{-x} = u + \frac{12}{u} = 7 \;\Rightarrow\; u^{2} + 12 = 7u \;\Rightarrow\; u^{2} - 7u + 12 = 0
$$`,
      }),
      P.fib({
        label: "(b)", marks: 3, stem: t`Find the exact solutions in the form $x = \ln a$ and $x = \ln b$, where $a < b$.`,
        template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [nb("a", 3, -3), nb("b", 4, -4)],
        explanation: t`$(u - 3)(u - 4) = 0$, so $e^{x} = 3$ or $e^{x} = 4$, giving $x = \ln 3$ or $x = \ln 4$.`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Give both solutions correct to 3 significant figures.",
        template: "x = {{blank:x1}} or x = {{blank:x2}} (smaller value first)",
        blanks: [nb3("x1", ln(3), 3), nb3("x2", ln(4), 4)],
        explanation: t`$\ln 3 = 1.10$ and $\ln 4 = 1.39$ (3 s.f.).`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: t`Explain why the equation $e^{x} + 12e^{-x} = 6$ has no real solutions.`,
        points: [t`The same substitution gives $u^{2} - 6u + 12 = 0$`, t`Its discriminant $36 - 48 = -12 < 0$, so there is no real $u$ and hence no real $x$`],
        modelAnswer: "With u = eˣ the equation becomes u² − 6u + 12 = 0. The discriminant is 36 − 48 = −12, which is negative, so there are no real values of u and therefore no real solutions.",
      }),
    ],
    explanation: t`Multiplying by $e^{x}$ gives a quadratic in $u = e^{x}$. With 7 on the right it factorises to $(u - 3)(u - 4)$; with 6 the discriminant is negative, so there is no solution.`,
    hints: [t`Multiply every term by $e^{x}$.`, "For (d), find the discriminant of the new quadratic."],
  });

  b.card("CONCEPT", "Equation in quadratic form", "One term is the square of another; let u be that other term to get au² + bu + c = 0.");
  b.card("FACT", t`Substitution for $x$ and $\sqrt{x}$`, t`$u = \sqrt{x}$, so $x = u^{2}$.`);
  b.card("FACT", t`Substitution for $e^{2x}$ and $e^{x}$`, t`$u = e^{x}$, so $e^{2x} = u^{2}$.`);
  b.card("FACT", t`Substitution for $x^{\frac{2}{3}}$ and $x^{\frac{1}{3}}$`, t`$u = x^{\frac{1}{3}}$, so $x^{\frac{2}{3}} = u^{2}$; then $x = u^{3}$.`);
  b.card("FACT", "Values to reject", t`$\sqrt{x} < 0$, $e^{x} \leq 0$ and $a^{x} \leq 0$ are impossible for real $x$. ($\ln x$ and $x^{\frac{1}{3}}$ can be negative.)`);
  b.card("CONCEPT", t`Equation containing $e^{-x}$`, t`Multiply every term by $e^{x}$ first: $e^{x} - 6e^{-x} = 1 \Rightarrow e^{2x} - e^{x} - 6 = 0$.`);
  b.card("FORMULA", "Undoing the substitution", t`$e^{x} = k \Rightarrow x = \ln k$; $a^{x} = k \Rightarrow x = \dfrac{\lg k}{\lg a}$; $\ln x = k \Rightarrow x = e^{k}$.`);
  b.card("FACT", t`Rewriting $a^{x+k}$`, t`$a^{x+k} = a^{k} \times a^{x}$, e.g. $3^{x+2} = 9 \times 3^{x}$.`);
});
