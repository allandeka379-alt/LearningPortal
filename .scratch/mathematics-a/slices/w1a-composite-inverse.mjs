// W1a: amaths.functions.composite-inverse (ZIMSEC Pure F5; Cambridge P1 1.2).
import { concept, P, t, chk } from "../lib.mjs";

/** Asserts g undoes f at sample points. */
const inverseOk = (f, g, xs, label) => {
  for (const x of xs) chk(g(f(x)), x, 1e-9, label);
};
const sameFn = (f, g, xs, label) => {
  for (const x of xs) chk(f(x), g(x), 1e-9, label);
};

concept("amaths.functions.composite-inverse", { file: "functions/composite-inverse", keyPrefix: "functions.composite-inverse" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What does $fg(x)$ mean?`,
    options: [
      [t`$f\big(g(x)\big)$: apply $g$ first, then $f$`, "Correct."],
      [t`$g\big(f(x)\big)$: apply $f$ first, then $g$`, "That is gf(x)."],
      [t`$f(x) \times g(x)$`, "A composite is not a product."],
      [t`$f(x) + g(x)$`, "A composite is not a sum."],
    ],
    answer: "A",
    explanation: t`In $fg(x)$ the function nearest $x$ acts first: $fg(x) = f\big(g(x)\big)$.`,
  });

  const f2 = (x) => 3 * x - 2;
  const g2 = (x) => x * x + 1;
  chk(f2(g2(2)), 13);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`$f(x) = 3x - 2$ and $g(x) = x^{2} + 1$ for $x \in \mathbb{R}$. Find $fg(2)$.`,
    value: 13, wrong: [17, 4],
    explanation: t`$g(2) = 5$, then $f(5) = 15 - 2 = 13$. (Applying $f$ first gives $gf(2) = g(4) = 17$.)`,
  });

  chk(g2(f2(2)), 17);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`$f(x) = 3x - 2$ and $g(x) = x^{2} + 1$ for $x \in \mathbb{R}$. Find $gf(-1)$.`,
    value: g2(f2(-1)), wrong: [4, 2],
    explanation: t`$f(-1) = -3 - 2 = -5$, then $g(-5) = 25 + 1 = 26$. (The other order gives $fg(-1) = f(2) = 4$.)`,
  });
  chk(g2(f2(-1)), 26);

  sameFn((x) => (2 * x - 5) ** 2, (x) => 4 * x * x - 20 * x + 25, [-2, 0.3, 4], "q4");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$f(x) = 2x - 5$ and $g(x) = x^{2}$ for $x \in \mathbb{R}$. Find an expression for $gf(x)$.`,
    accepted: ["(2x-5)^2", "4x^2-20x+25", "(5-2x)^2", "(2x-5)(2x-5)"],
    wrong: ["2x^2-5", "2x-5^2"],
    explanation: t`$gf(x) = g\big(f(x)\big) = (2x - 5)^{2} = 4x^{2} - 20x + 25$. ($2x^{2} - 5$ is $fg(x)$.)`,
  });

  inverseOk((x) => 4 * x - 7, (x) => (x + 7) / 4, [-3, 0, 2.5], "q5");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $f^{-1}(x)$ for $f(x) = 4x - 7$, $x \in \mathbb{R}$. Write your answer as a single fraction, for example (x+1)/3.`,
    accepted: ["(x+7)/4", "(7+x)/4", "x/4+7/4", "0.25x+1.75", "(1/4)(x+7)"],
    wrong: ["(x-7)/4", "1/(4x-7)"],
    explanation: t`$y = 4x - 7 \Rightarrow x = \dfrac{y + 7}{4}$, so $f^{-1}(x) = \dfrac{x + 7}{4}$. Check: $f(2) = 1$ and $f^{-1}(1) = 2$.`,
  });

  inverseOk((x) => (x + 5) / (x - 2), (x) => (2 * x + 5) / (x - 1), [-4, 0, 3, 7.5], "q6");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $f^{-1}(x)$ for $f(x) = \dfrac{x + 5}{x - 2}$, $x \neq 2$. Write your answer as a single fraction, for example (3x+1)/(x-4).`,
    accepted: ["(2x+5)/(x-1)", "(5+2x)/(x-1)", "(-2x-5)/(1-x)", "-(2x+5)/(1-x)"],
    wrong: ["(x-2)/(x+5)", "(2x-5)/(x+1)"],
    explanation: t`$y(x - 2) = x + 5 \Rightarrow xy - 2y = x + 5 \Rightarrow x(y - 1) = 2y + 5 \Rightarrow x = \dfrac{2y + 5}{y - 1}$. So $f^{-1}(x) = \dfrac{2x + 5}{x - 1}$, $x \neq 1$. ($\frac{x - 2}{x + 5}$ is the reciprocal, not the inverse.)`,
    hints: ["Multiply both sides by (x − 2).", "Collect all the x terms on one side and factorise."],
  });

  inverseOk((x) => (x + 1) ** 2 - 4, (x) => -1 + Math.sqrt(x + 4), [-1, 0, 2.5], "q7");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The function $f$ is defined by $f(x) = (x + 1)^{2} - 4$ for $x \geq -1$. Find $f^{-1}(x)$ and its domain.`,
    options: [
      [t`$f^{-1}(x) = -1 + \sqrt{x + 4}$, $x \geq -4$`, t`Correct: positive root because $x + 1 \geq 0$; domain = range of $f$.`],
      [t`$f^{-1}(x) = -1 - \sqrt{x + 4}$, $x \geq -4$`, t`The negative root gives values below $-1$, outside the domain of $f$.`],
      [t`$f^{-1}(x) = 1 + \sqrt{x - 4}$, $x \geq 4$`, "The signs have been changed instead of reversing each step."],
      [t`$f^{-1}(x) = -1 + \sqrt{x + 4}$, $x \geq -1$`, "The domain of the inverse is the range of f, which is x ≥ −4."],
    ],
    answer: "A",
    explanation: t`$y = (x + 1)^{2} - 4 \Rightarrow x + 1 = \sqrt{y + 4}$ (positive since $x \geq -1$). So $f^{-1}(x) = -1 + \sqrt{x + 4}$ with domain the range of $f$, $x \geq -4$.`,
    hints: ["Which square root keeps x ≥ −1?", "Domain of f⁻¹ = range of f."],
  });

  const fi8 = (x) => (x - 3) ** 2 + 2;
  inverseOk((x) => 3 + Math.sqrt(x - 2), fi8, [2, 3, 11], "q8");
  chk(fi8(7), 18);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 3 + \sqrt{x - 2}$ for $x \geq 2$.`,
    template: "The domain of f⁻¹ is x ≥ {{blank:a}}, and f⁻¹(7) = {{blank:b}}.",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: 2 }, { id: "b", input: "number", accepted: [18], wrong: 4 }],
    explanation: t`The range of $f$ is $f(x) \geq 3$, so $f^{-1}$ has domain $x \geq 3$. $f^{-1}(x) = (x - 3)^{2} + 2$, so $f^{-1}(7) = 16 + 2 = 18$. Check: $f(18) = 3 + 4 = 7$.`,
    hints: ["Domain of f⁻¹ = range of f.", "Solve f(x) = 7 directly if you prefer."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any one-one function, $f^{-1}(x) = \dfrac{1}{f(x)}$.`,
    answer: false,
    explanation: t`False. The inverse reverses the function; it is not the reciprocal. For $f(x) = x + 1$, $f^{-1}(x) = x - 1$ but $\frac{1}{f(x)} = \frac{1}{x + 1}$.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The graph of $y = f^{-1}(x)$ is the reflection of the graph of $y = f(x)$ in the line $y = x$.`,
    answer: true,
    explanation: t`True. The inverse swaps inputs and outputs, so each point $(a, b)$ on $y = f(x)$ corresponds to $(b, a)$ on $y = f^{-1}(x)$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`The point $(2, 7)$ lies on the graph of the one-one function $y = f(x)$. Which point must lie on the graph of $y = f^{-1}(x)$?`,
    options: [
      [t`$(7, 2)$`, "Correct: the inverse swaps the coordinates."],
      [t`$(-2, -7)$`, "That is a rotation through 180° about the origin."],
      [t`$\left(2, \frac{1}{7}\right)$`, "The inverse is not the reciprocal."],
      [t`$(2, -7)$`, "That is a reflection in the x-axis."],
    ],
    answer: "A",
    explanation: t`$f(2) = 7$ means $f^{-1}(7) = 2$, so $(7, 2)$ is on $y = f^{-1}(x)$: the reflection of $(2, 7)$ in $y = x$.`,
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = x^{2} + 1$ for $x \in \mathbb{R}$, and $g(x) = \sqrt{x - 2}$ for $x \geq 2$. Which statement about the composite $gf$ is correct?`,
    options: [
      [t`$gf$ does not exist, because the range of $f$ includes values less than 2.`, t`Correct: e.g. $f(0) = 1$ and $g(1)$ is undefined.`],
      [t`$gf$ exists, because the range of $g$ lies within the domain of $f$.`, "For gf the condition is on the range of f and the domain of g."],
      [t`$gf$ exists and $gf(x) = \sqrt{x^{2} - 1}$ for all real $x$.`, t`$\sqrt{x^{2} - 1}$ is undefined for $-1 < x < 1$.`],
      [t`$gf$ does not exist, because $f$ is not one-one.`, "Composites do not need one-one functions; inverses do."],
    ],
    answer: "A",
    explanation: t`$gf$ needs every output of $f$ to be in the domain of $g$ ($x \geq 2$). The range of $f$ is $f(x) \geq 1$, which includes values in $[1, 2)$, so $gf$ is not defined on all of $\mathbb{R}$.`,
    hints: ["Find the range of f and compare it with the domain of g."],
  });

  const x12 = Math.sqrt(8);
  chk(2 * (x12 * x12 - 3) + 1, 11, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$f(x) = 2x + 1$ for $x \in \mathbb{R}$, and $g(x) = x^{2} - 3$ for $x \geq 0$. Solve $fg(x) = 11$, giving your answer to 3 significant figures.`,
    value: x12, prefix: "x =", wrong: [2.24, 2],
    explanation: t`$fg(x) = 2(x^{2} - 3) + 1 = 2x^{2} - 5$. Then $2x^{2} - 5 = 11$ gives $x^{2} = 8$, so $x = \sqrt{8} = 2\sqrt{2} \approx 2.83$ (the negative root is outside the domain of $g$).`,
    hints: ["Find fg(x) first.", "Which root is allowed by the domain x ≥ 0?"],
  });

  inverseOk((x) => 5 * x - 3, (x) => (x + 3) / 5, [0, 1, 4], "q13");
  chk(5 * 0.75 - 3, (0.75 + 3) / 5, 1e-12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = 5x - 3$ for $x \in \mathbb{R}$. Solve the equation $f(x) = f^{-1}(x)$.`,
    value: 0.75, prefix: "x =", wrong: [-0.75, 0.6],
    explanation: t`$f^{-1}(x) = \dfrac{x + 3}{5}$. Then $5x - 3 = \dfrac{x + 3}{5}$ gives $25x - 15 = x + 3$, so $24x = 18$ and $x = 0.75$. As expected for an increasing function, this is where $f(x) = x$: $5x - 3 = x$ gives $x = 0.75$ too.`,
    hints: ["Find f⁻¹(x) and set it equal to f(x).", "For an increasing f, the graphs meet on y = x."],
  });

  // ff(x) = 9x − 8 with f(x) = ax + b, a > 0 -> a = 3, b = −2
  sameFn((x) => 3 * (3 * x - 2) - 2, (x) => 9 * x - 8, [-1, 0, 2], "q14");
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = ax + b$, where $a > 0$, and $ff(x) = 9x - 8$ for all $x$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: 9 }, { id: "b", input: "number", accepted: [-2], wrong: -4 }],
    explanation: t`$ff(x) = a(ax + b) + b = a^{2}x + ab + b$. Comparing: $a^{2} = 9$, so $a = 3$ (as $a > 0$); $ab + b = 4b = -8$, so $b = -2$.`,
    hints: ["Write ff(x) in terms of a and b.", "Compare coefficients with 9x − 8."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each function (on a suitable domain) with its inverse.",
    pairs: [
      [t`$x + 4$`, t`$x - 4$`],
      [t`$3x$`, t`$\frac{x}{3}$`],
      [t`$x^{3}$`, t`$\sqrt[3]{x}$`],
      [t`$\frac{1}{x}$, $x \neq 0$`, t`$\frac{1}{x}$, $x \neq 0$`],
    ],
    explanation: t`Each inverse undoes its function. $\frac{1}{x}$ is self-inverse: applying it twice gives $x$, and its graph is symmetrical in $y = x$.`,
  });

  const f16 = (x) => (2 * x + 3) / (x - 2);
  inverseOk(f16, f16, [-3, 0, 5, 9.5], "q16");
  b.proof({
    d: 4, skill: "ANALYSIS", marks: 3, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = \dfrac{2x + 3}{x - 2}$ for $x \neq 2$. Show that $ff(x) = x$, and state what this tells you about $f^{-1}$.`,
    points: [
      t`M1 substitutes $f(x)$ into $f$: $\dfrac{2\left(\frac{2x + 3}{x - 2}\right) + 3}{\frac{2x + 3}{x - 2} - 2}$`,
      t`A1 simplifies numerator to $\frac{7x}{x - 2}$ and denominator to $\frac{7}{x - 2}$, giving $x$`,
      t`B1 concludes $f^{-1} = f$ (f is self-inverse)`,
    ],
    modelAnswer: [
      "$$",
      t`ff(x) = \frac{2\left(\frac{2x + 3}{x - 2}\right) + 3}{\frac{2x + 3}{x - 2} - 2} = \frac{\frac{4x + 6 + 3x - 6}{x - 2}}{\frac{2x + 3 - 2x + 4}{x - 2}} = \frac{7x}{7} = x`,
      "$$",
      t`Since applying $f$ twice returns $x$, $f$ undoes itself: $f^{-1}(x) = f(x) = \dfrac{2x + 3}{x - 2}$.`,
    ].join("\n"),
    explanation: t`Multiply numerator and denominator by $(x - 2)$ to clear the inner fractions; the result is $\frac{7x}{7} = x$.`,
    hints: ["Multiply the top and bottom of the compound fraction by (x − 2)."],
  });

  inverseOk((x) => x * x - 6 * x + 11, (x) => 3 + Math.sqrt(x - 2), [3, 4, 8], "q17");
  chk(2 * (16 - 24 + 11) - 1, 5);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The functions $f$ and $g$ are defined by $f(x) = x^{2} - 6x + 11$ for $x \geq 3$, and $g(x) = 2x - 1$ for $x \in \mathbb{R}$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 1, stem: t`Express $f(x)$ in the form $(x - p)^{2} + q$.`,
        template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [{ id: "p", input: "number", accepted: [3], wrong: 6 }, { id: "q", input: "number", accepted: [2], wrong: 11 }],
        explanation: t`$x^{2} - 6x + 11 = (x - 3)^{2} - 9 + 11 = (x - 3)^{2} + 2$.`,
      }),
      P.expr({
        label: "(b)", marks: 2, stem: "Find an expression for f⁻¹(x). Use sqrt( ) for the square root, for example 1+sqrt(x-4).",
        accepted: ["3+√(x-2)", "√(x-2)+3"], wrong: ["3-sqrt(x-2)", "3+sqrt(x+2)"],
        explanation: t`$y = (x - 3)^{2} + 2 \Rightarrow x - 3 = \sqrt{y - 2}$ (positive since $x \geq 3$), so $f^{-1}(x) = 3 + \sqrt{x - 2}$.`,
      }),
      P.fib({
        label: "(c)", marks: 1, stem: t`State the domain of $f^{-1}$.`,
        template: "x ≥ {{blank:a}}",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: 3 }],
        explanation: t`The domain of $f^{-1}$ is the range of $f$: $f(x) \geq 2$.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: t`Find $gf(4)$.`,
        value: 5, wrong: [3, 35],
        explanation: t`$f(4) = 16 - 24 + 11 = 3$, then $g(3) = 5$.`,
      }),
    ],
    explanation: t`$f(x) = (x - 3)^{2} + 2$ on $x \geq 3$ is one-one with range $f(x) \geq 2$, so $f^{-1}(x) = 3 + \sqrt{x - 2}$ for $x \geq 2$. $gf(4) = g(3) = 5$.`,
    hints: ["Complete the square first.", "Take the positive root because x ≥ 3."],
  });

  inverseOk((x) => 3 / (x - 1), (x) => 1 + 3 / x, [1.5, 2, 10], "q18");
  sameFn((x) => 3 / (x * x + 2 - 1), (x) => 3 / (x * x + 1), [-2, 0, 3], "q18 fg");
  chk(((u) => u * u + 2)(3 / (4 - 1)), 3);
  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The functions $f$ and $g$ are defined by $f(x) = \dfrac{3}{x - 1}$ for $x > 1$, and $g(x) = x^{2} + 2$ for $x \in \mathbb{R}$.`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1, stem: "State the range of f.",
        options: [
          [t`$f(x) > 0$`, "Correct: x − 1 takes every positive value, so 3/(x − 1) takes every positive value."],
          [t`$f(x) > 1$`, "This is the domain condition, not the range."],
          [t`$f(x) > 3$`, t`For large $x$, $f(x)$ is small, e.g. $f(4) = 1$.`],
          [t`$f(x) \neq 0$`, "Negative values are not produced when x > 1."],
        ],
        answer: "A",
        explanation: t`For $x > 1$, $x - 1 > 0$ takes all positive values, so $f(x) > 0$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: t`Find $gf(4)$.`,
        value: 3, wrong: [0.167, 18],
        explanation: t`$f(4) = \frac{3}{3} = 1$, then $g(1) = 3$.`,
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: t`Explain whether the composite $fg$ exists.`,
        options: [
          [t`It exists: the range $g(x) \geq 2$ lies inside the domain $x > 1$ of $f$.`, "Correct."],
          [t`It does not exist: $g$ is not one-one, since $g(-1) = g(1) = 3$.`, "Composites do not require one-one functions."],
          [t`It does not exist: the range of $f$ is not within the domain of $g$.`, "That would concern gf, and anyway the domain of g is all of ℝ."],
          [t`It exists, but only for values of $x$ with $x > 1$.`, "Every real x gives g(x) ≥ 2 > 1, so fg is defined for all real x."],
        ],
        answer: "A",
        explanation: t`$fg$ needs the range of $g$ ($g(x) \geq 2$) inside the domain of $f$ ($x > 1$). It is, so $fg$ exists for all real $x$.`,
      }),
      P.expr({
        label: "(d)", marks: 1, stem: "Find an expression for fg(x), simplified.",
        accepted: ["3/(x^2+1)", "3/(1+x^2)"], wrong: ["3/(x^2+2)", "9/(x-1)^2+2"],
        explanation: t`$fg(x) = \dfrac{3}{(x^{2} + 2) - 1} = \dfrac{3}{x^{2} + 1}$.`,
      }),
      P.expr({
        label: "(e)", marks: 1, stem: "Find an expression for f⁻¹(x).",
        accepted: ["1+3/x", "3/x+1", "(x+3)/x", "(3+x)/x"], wrong: ["(x-1)/3", "3/x-1"],
        explanation: t`$y = \dfrac{3}{x - 1} \Rightarrow x - 1 = \dfrac{3}{y} \Rightarrow x = 1 + \dfrac{3}{y}$, so $f^{-1}(x) = 1 + \dfrac{3}{x}$ for $x > 0$.`,
      }),
    ],
    explanation: t`Range of $f$: $f(x) > 0$. $gf(4) = g(1) = 3$. $fg$ exists because $g(x) \geq 2 > 1$, and $fg(x) = \frac{3}{x^{2} + 1}$. $f^{-1}(x) = 1 + \frac{3}{x}$, $x > 0$.`,
    hints: ["For fg, compare the range of g with the domain of f.", "For the inverse, make x the subject."],
  });

  inverseOk((x) => 3 * (x - 4) + 2, (x) => (x + 10) / 3, [-2, 0, 7], "q19 inv");
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$f(x) = 3x + 2$ and $g(x) = x - 4$ for $x \in \mathbb{R}$. Find $(fg)^{-1}(x)$.`,
    options: [
      [t`$\dfrac{x + 10}{3}$`, t`Correct: $fg(x) = 3(x - 4) + 2 = 3x - 10$, whose inverse is $\frac{x + 10}{3}$.`],
      [t`$\dfrac{x - 10}{3}$`, "The sign of 10 has not been reversed."],
      [t`$\dfrac{1}{3x - 10}$`, "This is the reciprocal of fg(x), not its inverse."],
      [t`$\dfrac{x - 2}{3} - 4$`, t`This applies $f^{-1}$ then $g$, but $(fg)^{-1} = g^{-1}f^{-1}$: add 4 instead.`],
    ],
    answer: "A",
    explanation: t`$fg(x) = 3x - 10$. Solving $y = 3x - 10$ gives $x = \frac{y + 10}{3}$, so $(fg)^{-1}(x) = \frac{x + 10}{3}$. Equivalently $(fg)^{-1} = g^{-1}f^{-1}$: $f^{-1}(x) = \frac{x - 2}{3}$, then add 4.`,
    hints: ["Find fg(x) first, then its inverse."],
  });

  b.card("DEFINITION", "Composite function fg", t`$fg(x) = f\big(g(x)\big)$: apply $g$ first, then $f$. Usually $fg \neq gf$.`);
  b.card("CONCEPT", "Condition for gf to exist", t`The range of $f$ must lie within the domain of $g$.`);
  b.card("DEFINITION", "Inverse function", t`$f^{-1}$ reverses a one-one function $f$: $f^{-1}\big(f(x)\big) = x$.`);
  b.card("FACT", "Domain and range of an inverse", t`Domain of $f^{-1}$ = range of $f$; range of $f^{-1}$ = domain of $f$.`);
  b.card("CONCEPT", "Steps to find an inverse", t`Write $y = f(x)$, make $x$ the subject, swap $x$ and $y$, then state the domain of $f^{-1}$.`);
  b.card("FACT", "Graph of an inverse function", t`The reflection of $y = f(x)$ in the line $y = x$; $(a, b)$ maps to $(b, a)$.`);
  b.card("CONCEPT", "Which square root for the inverse of a restricted quadratic?", t`Choose the sign that matches the domain of $f$: for $x \geq h$, $x = h + \sqrt{\ldots}$.`);
  b.card("FACT", "Inverse of a composite", t`$(fg)^{-1} = g^{-1}f^{-1}$: undo the last function first.`);
});
