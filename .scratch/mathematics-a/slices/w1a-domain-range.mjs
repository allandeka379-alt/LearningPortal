// W1a: amaths.functions.domain-range (ZIMSEC Pure F5 Relations; Cambridge P1 1.2).
import { concept, P, t, chk, same, quad, ZP } from "../lib.mjs";

/** Numerical [min, max] of f on [lo, hi] (sampling) — confirms ranges. */
const rng = (f, lo, hi, n = 100000) => {
  let mn = Infinity;
  let mx = -Infinity;
  for (let i = 0; i <= n; i++) {
    const v = f(lo + ((hi - lo) * i) / n);
    mn = Math.min(mn, v);
    mx = Math.max(mx, v);
  }
  return [mn, mx];
};

concept("amaths.functions.domain-range", { file: "functions/domain-range", keyPrefix: "functions.domain-range" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these relations is NOT a function of x on the stated domain?",
    options: [
      [t`$y^{2} = x$, $x > 0$`, t`Correct: each $x > 0$ gives two values, $y = \pm\sqrt{x}$ (one-many).`],
      [t`$y = x^{2}$, $x \in \mathbb{R}$`, "Many-one: two inputs can share an output, but each input has one output, so it is a function."],
      [t`$y = 2x - 1$, $x \in \mathbb{R}$`, "One-one: a function."],
      [t`$y = \frac{1}{x}$, $x > 0$`, "Each positive x gives exactly one output."],
    ],
    answer: "A",
    explanation: "A function gives exactly one output for every input. y² = x gives two outputs for each positive x, so it is a one-many relation, not a function.",
  });

  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the range of $f(x) = x^{2} + 3$, $x \in \mathbb{R}$.`,
    options: [
      [t`$f(x) \geq 3$`, t`Correct: $x^{2} \geq 0$, so $x^{2} + 3 \geq 3$.`],
      [t`$f(x) > 3$`, t`$f(0) = 3$, so the value 3 is attained.`],
      [t`$x \geq 3$`, "The range describes outputs f(x), not inputs x."],
      [t`$f(x) \in \mathbb{R}$`, "f(x) is never less than 3."],
    ],
    answer: "A",
    explanation: t`$x^{2} \geq 0$ for all real $x$, with equality at $x = 0$, so the range is $f(x) \geq 3$.`,
  });

  same(rng((x) => 2 * x - 1, 1, 4), [1, 7]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = 2x - 1$ for the domain $1 \leq x \leq 4$.`,
    template: "{{blank:a}} ≤ f(x) ≤ {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [1], wrong: 1 }, { id: "b", input: "number", accepted: [7], wrong: 4 }],
    explanation: t`$f$ is increasing, so the range runs from $f(1) = 1$ to $f(4) = 7$: $1 \leq f(x) \leq 7$.`,
  });

  same(rng((x) => (x - 3) ** 2 - 2, 0, 4), [-2, 7]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = (x - 3)^{2} - 2$ for the domain $0 \leq x \leq 4$.`,
    template: "{{blank:a}} ≤ f(x) ≤ {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-2], wrong: -1 }, { id: "b", input: "number", accepted: [7], wrong: -1 }],
    explanation: t`The vertex $(3, -2)$ is inside the domain, so the least value is $-2$. At the ends, $f(0) = 7$ and $f(4) = -1$; the greatest is $7$. Range: $-2 \leq f(x) \leq 7$.`,
    hints: ["Is the vertex inside the domain?", "Compare the values at both ends."],
  });

  same(quad.completeSquare(1, 6, 1).vertex, [-3, -8]);
  chk(rng((x) => x * x + 6 * x + 1, 0, 10)[0], 1);
  b.num({
    d: 3, skill: "ANALYSIS", daily: true, calculator: false,
    stem: t`Find the least value of $f(x) = x^{2} + 6x + 1$ for the domain $x \geq 0$.`,
    value: 1, wrong: [-8, 0],
    explanation: t`$f(x) = (x + 3)^{2} - 8$ has its vertex at $x = -3$, outside the domain. For $x \geq 0$ the function is increasing, so the least value is $f(0) = 1$. (The value $-8$ is not attained on this domain.)`,
    hints: ["Find the vertex, then check whether it lies in the domain."],
  });

  const r6 = rng((x) => 4 / (x - 1), 3.0000001, 1e7);
  chk(r6[1], 2, 1e-5);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = \dfrac{4}{x - 1}$ for $x > 3$.`,
    options: [
      [t`$0 < f(x) < 2$`, t`Correct: $x - 1 > 2$, so $0 < \frac{4}{x - 1} < 2$.`],
      [t`$0 < f(x) \leq 2$`, t`$x = 3$ is not in the domain, so $f(x) = 2$ is never reached.`],
      [t`$f(x) > 2$`, "As x increases the fraction decreases, so values are below 2."],
      [t`$f(x) > 0$`, "Values of 2 or more are not reached for x > 3."],
    ],
    answer: "A",
    explanation: t`For $x > 3$, $x - 1 > 2$, so $\frac{4}{x - 1} < 2$; it is always positive and tends to 0 as $x$ grows. Range: $0 < f(x) < 2$.`,
    hints: ["Find the range of x − 1 first."],
  });

  const r7 = rng((x) => 5 - 3 / (x + 2), 1, 1e7);
  chk(r7[0], 4, 1e-9);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the range of $f(x) = 5 - \dfrac{3}{x + 2}$ for $x \geq 1$.`,
    template: "{{blank:a}} ≤ f(x) < {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [4], wrong: 2 }, { id: "b", input: "number", accepted: [5], wrong: 6 }],
    explanation: t`$x + 2 \geq 3$, so $0 < \dfrac{3}{x + 2} \leq 1$. Subtracting from 5 reverses the inequalities: $4 \leq f(x) < 5$. The value 4 is attained at $x = 1$; 5 is approached but never reached.`,
    hints: ["Work out the range of 3/(x + 2) first.", "Subtracting reverses the order."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The function $f(x) = x^{3}$, $x \in \mathbb{R}$, is one-one.`,
    answer: true,
    explanation: t`True. $x^{3}$ is strictly increasing, so different inputs always give different outputs: every horizontal line meets $y = x^{3}$ exactly once.`,
  });

  chk((2) ** 2 - 6 * 2, 4 ** 2 - 6 * 4);
  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The function $f(x) = x^{2} - 6x$ with domain $x \geq 2$ is one-one.`,
    answer: false,
    explanation: t`False. The vertex is at $x = 3$, inside the domain, and $f(2) = -8 = f(4)$: two inputs give the same output. It would be one-one for $x \geq 3$.`,
  });

  same(quad.completeSquare(2, -12, 5).vertex, [3, -13]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The function $f(x) = 2x^{2} - 12x + 5$ is defined for $x \geq k$. Find the least value of $k$ for which $f$ is one-one.`,
    value: 3, prefix: "k =", wrong: [-3, 6],
    explanation: t`$f(x) = 2(x - 3)^{2} - 13$, with vertex at $x = 3$. To the right of the vertex the function is increasing, so it is one-one for $x \geq 3$; the least $k$ is $3$.`,
    hints: ["Complete the square to find the line of symmetry."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: t`The function $f : \mathbb{R} \to \mathbb{R}$ is defined by $f(x) = x^{2} - 1$. Which statement is true?`,
    options: [
      ["f is neither injective nor surjective.", "Correct: f(−1) = f(1), and values below −1 in the co-domain are never reached."],
      ["f is injective but not surjective.", "f(−2) = f(2) = 3, so it is not injective."],
      ["f is surjective but not injective.", "The co-domain ℝ includes −2, which is never an output."],
      ["f is bijective.", "It fails both conditions."],
    ],
    answer: "A",
    explanation: t`Not injective: $f(-1) = f(1) = 0$. Not surjective: the range is $f(x) \geq -1$, which is smaller than the co-domain $\mathbb{R}$.`,
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`The function $g : \mathbb{R} \to \mathbb{R}$ is defined by $g(x) = x^{3} + 1$. Which statement is true?`,
    options: [
      ["g is bijective.", t`Correct: $x^{3} + 1$ is strictly increasing and every real $y$ is reached by $x = \sqrt[3]{y - 1}$.`],
      ["g is injective but not surjective.", "Every real number is an output, so g is surjective."],
      ["g is surjective but not injective.", "x³ + 1 is strictly increasing, so it is injective."],
      ["g is neither injective nor surjective.", "It is both."],
    ],
    answer: "A",
    explanation: t`$g$ is strictly increasing (injective), and for any real $y$, $x = \sqrt[3]{y - 1}$ gives $g(x) = y$ (surjective). So $g$ is bijective.`,
    hints: ["Can every real number y be written as x³ + 1?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: "Match each relation with its type.",
    pairs: [
      [t`$y = 3x + 2$, $x \in \mathbb{R}$`, "one-one"],
      [t`$y = x^{2}$, $x \in \mathbb{R}$`, "many-one"],
      [t`$y^{2} = x$, $x > 0$`, "one-many"],
      [t`$x^{2} + y^{2} = 25$, $-5 < x < 5$`, "many-many"],
    ],
    explanation: t`$3x + 2$ is one-one. $x^{2}$ sends $\pm a$ to the same value (many-one). $y^{2} = x$ gives two $y$ for each $x$ (one-many). On the circle each $x$ in $(-5, 5)$ has two $y$ values and most $y$ values have two $x$ values (many-many). Only the first two are functions.`,
  });

  same(rng((x) => x * x - 2 * x + 5, -2, 3), [4, 13]);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the range of $f(x) = x^{2} - 2x + 5$ for the domain $-2 \leq x \leq 3$.`,
    options: [
      [t`$4 \leq f(x) \leq 13$`, t`Correct: the vertex $(1, 4)$ is in the domain, and $f(-2) = 13$ is the larger end value.`],
      [t`$8 \leq f(x) \leq 13$`, "Only the end values have been used; the vertex at x = 1 gives a smaller value."],
      [t`$4 \leq f(x) \leq 8$`, "The greatest value is at x = −2, not x = 3."],
      [t`$f(x) \geq 4$`, "The domain is limited, so the range has an upper bound too."],
    ],
    answer: "A",
    explanation: t`$f(x) = (x - 1)^{2} + 4$: minimum $4$ at $x = 1$ (in the domain). Ends: $f(-2) = 13$, $f(3) = 8$. Range: $4 \leq f(x) \leq 13$.`,
    hints: ["Complete the square and check the vertex.", "Evaluate f at both ends of the domain."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, calculator: false, applies: ZP,
    stem: t`The function $g : \mathbb{R} \to \mathbb{R}$ is defined by $g(x) = x^{2} + 2$. Explain why $g$ is not surjective, and state a co-domain for which $g$ would be surjective.`,
    points: ["The range is g(x) ≥ 2, so co-domain values such as 0 (any value below 2) are never outputs", "A suitable co-domain is {y : y ≥ 2}"],
    modelAnswer: "Since x² ≥ 0, g(x) = x² + 2 ≥ 2; for example 0 is in the co-domain ℝ but no x gives g(x) = 0. With co-domain {y ∈ ℝ : y ≥ 2} every element is an output, so g would be surjective.",
    explanation: "Surjective means the range equals the co-domain; shrinking the co-domain to the range makes any function surjective.",
    hints: ["Find the range of g first."],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", marks: 3, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = \dfrac{2x + 1}{x - 3}$ for $x > 3$. Show that $f$ is one-one.`,
    points: [
      t`M1 assumes $f(a) = f(b)$ and cross-multiplies: $(2a + 1)(b - 3) = (2b + 1)(a - 3)$`,
      t`A1 expands and simplifies to $-7a = -7b$ (the $ab$ terms cancel)`,
      t`A1 concludes $a = b$, so $f$ is one-one`,
    ],
    modelAnswer: [
      t`Suppose $f(a) = f(b)$ with $a, b > 3$. Then`,
      "$$",
      t`(2a + 1)(b - 3) = (2b + 1)(a - 3)`,
      "$$",
      "$$",
      t`2ab - 6a + b - 3 = 2ab - 6b + a - 3`,
      "$$",
      "$$",
      t`-7a = -7b \quad\Rightarrow\quad a = b`,
      "$$",
      t`Equal outputs only come from equal inputs, so $f$ is one-one. (Alternatively, $f(x) = 2 + \frac{7}{x - 3}$ is strictly decreasing for $x > 3$.)`,
    ].join("\n"),
    explanation: t`Show that $f(a) = f(b)$ forces $a = b$; the $2ab$ and $-3$ terms cancel on both sides.`,
    hints: ["Start from f(a) = f(b) and cross-multiply."],
  });
  for (const [a2, b2] of [[4, 5], [3.5, 10]]) chk(((2 * a2 + 1) / (a2 - 3)) === ((2 * b2 + 1) / (b2 - 3)) ? 1 : 0, 0);

  same(rng((x) => 1 / (x * x + 1), -1000, 1000, 2000000).map((v) => Math.round(v * 1e5) / 1e5), [0, 1]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = \dfrac{1}{x^{2} + 1}$, $x \in \mathbb{R}$.`,
    template: "{{blank:a}} < f(x) ≤ {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [0], wrong: 1 }, { id: "b", input: "number", accepted: [1], wrong: 0 }],
    explanation: t`$x^{2} + 1 \geq 1$, so $0 < \dfrac{1}{x^{2} + 1} \leq 1$, with the value 1 at $x = 0$ and values tending to 0 as $|x|$ grows.`,
    hints: ["What is the least value of x² + 1?"],
  });

  same(quad.completeSquare(2, -8, 11), { a: 2, p: -2, q: 3, vertex: [2, 3] });
  same(rng((x) => 2 * x * x - 8 * x + 11, 0, 5), [3, 21]);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 2x^{2} - 8x + 11$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Express $f(x)$ in the form $a(x - h)^{2} + k$.`,
        template: "a = {{blank:a}}, h = {{blank:h}}, k = {{blank:k}}",
        blanks: [
          { id: "a", input: "number", accepted: [2], wrong: 2 },
          { id: "h", input: "number", accepted: [2], wrong: 4 },
          { id: "k", input: "number", accepted: [3], wrong: 7 },
        ],
        explanation: t`$2(x^{2} - 4x) + 11 = 2\left[(x - 2)^{2} - 4\right] + 11 = 2(x - 2)^{2} + 3$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: t`State the range of $f$ when the domain is $\mathbb{R}$.`,
        template: "f(x) ≥ {{blank:a}}",
        blanks: [{ id: "a", input: "number", accepted: [3], wrong: 11 }],
        explanation: t`The minimum value is $k = 3$.`,
      }),
      P.fib({
        label: "(c)", marks: 1, stem: t`Find the range of $f$ when the domain is $0 \leq x \leq 5$.`,
        template: "{{blank:a}} ≤ f(x) ≤ {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [3], wrong: 11 }, { id: "b", input: "number", accepted: [21], wrong: 11 }],
        explanation: t`The vertex $x = 2$ is in the domain (least value 3); $f(0) = 11$ and $f(5) = 21$, so $3 \leq f(x) \leq 21$.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: t`The domain is now $x \geq m$. State the least value of $m$ for which $f$ is one-one.`,
        value: 2, prefix: "m =", wrong: [3],
        explanation: t`One-one to the right of the vertex: $x \geq 2$.`,
      }),
    ],
    explanation: t`$f(x) = 2(x - 2)^{2} + 3$. Over $\mathbb{R}$ the range is $f(x) \geq 3$; on $[0, 5]$ it is $3 \leq f(x) \leq 21$; it is one-one on $x \geq 2$.`,
    hints: ["Take out the factor 2 before completing the square.", "The vertex decides both the range and where f is one-one."],
  });

  b.struct({
    examStyle: true, d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`The function $f : A \to \mathbb{R}$, where $A = \{x \in \mathbb{R} : x \geq 0\}$, is defined by $f(x) = \sqrt{x} + 1$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 1, stem: "State the range of f.",
        template: "f(x) ≥ {{blank:a}}",
        blanks: [{ id: "a", input: "number", accepted: [1], wrong: 0 }],
        explanation: t`$\sqrt{x} \geq 0$, so $f(x) \geq 1$.`,
      }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Is f injective?",
        options: [
          [t`Yes: $\sqrt{x}$ is increasing, so different inputs give different outputs.`, "Correct."],
          [t`No: $\sqrt{4}$ can be either $2$ or $-2$, giving two outputs.`, t`The symbol $\sqrt{\ }$ means the non-negative root only.`],
          ["No: the co-domain ℝ is larger than the range of f, so f fails.", "That concerns surjectivity, not injectivity."],
          ["Yes: every real number is an output of f, so f is one-one.", "That describes surjectivity, and it is false here anyway."],
        ],
        answer: "A",
        explanation: t`$\sqrt{x}$ is strictly increasing on $x \geq 0$, so $f$ is injective.`,
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: "Is f surjective?",
        options: [
          ["No: values less than 1 in the co-domain are never outputs.", "Correct."],
          ["Yes: every non-negative input x gives an output, so f is onto.", "Surjective is about every element of the co-domain being reached."],
          ["Yes: f is injective, and every injective function is surjective.", "Injective and surjective are independent properties."],
          [t`No: $f(0)$ is undefined, so the domain must exclude 0.`, t`$f(0) = 1$ is defined.`],
        ],
        answer: "A",
        explanation: t`The co-domain is $\mathbb{R}$ but the range is only $f(x) \geq 1$, so $f$ is not surjective.`,
      }),
      P.fib({
        label: "(d)", marks: 1, stem: "Complete the co-domain that would make f bijective.",
        template: "{y ∈ ℝ : y ≥ {{blank:a}}}",
        blanks: [{ id: "a", input: "number", accepted: [1], wrong: 0 }],
        explanation: "Make the co-domain equal to the range: {y : y ≥ 1}.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Explain why only a bijective function has an inverse function defined on its whole co-domain.",
        points: ["The inverse must send every element of the co-domain to exactly one input: surjective gives at least one input, injective gives at most one"],
        modelAnswer: "For f⁻¹(y) to be defined for every y in the co-domain, each y must come from some x (surjective), and for f⁻¹(y) to be a single value that x must be unique (injective).",
      }),
    ],
    explanation: t`$f$ is injective (increasing) but not surjective onto $\mathbb{R}$ because its range is $f(x) \geq 1$. Restricting the co-domain to $\{y : y \geq 1\}$ makes it bijective, so it then has an inverse $f^{-1}(x) = (x - 1)^{2}$, $x \geq 1$.`,
    hints: ["Compare the range with the co-domain.", "Is √x increasing?"],
  });

  b.card("DEFINITION", "Function", "A relation that maps every element of the domain to exactly one output (one-one or many-one, never one-many).");
  b.card("DEFINITION", "Domain and range", "Domain: the set of allowed inputs. Range: the set of outputs actually produced.");
  b.card("DEFINITION", "One-one function", t`Different inputs give different outputs: $f(a) = f(b) \Rightarrow a = b$. Every horizontal line meets the graph at most once.`);
  b.card("DEFINITION", "Surjective and bijective (ZIMSEC)", "Surjective: the range equals the co-domain. Bijective: both injective (one-one) and surjective.", undefined, { applies: ZP });
  b.card("DEFINITION", "Co-domain (ZIMSEC)", t`In $f : A \to B$, the set $B$ in which outputs are declared to lie; the range is a subset of $B$.`, undefined, { applies: ZP });
  b.card("CONCEPT", "How do you find the range of a quadratic on a restricted domain?", "Complete the square; if the vertex is in the domain it gives the least (or greatest) value; also evaluate both end points.");
  b.card("CONCEPT", "How do you make a quadratic one-one?", t`Restrict the domain to one side of the vertex: $x \geq h$ or $x \leq h$.`);
  b.card("FACT", t`Range of $\frac{1}{x}$ for $x \geq 2$`, t`$0 < f(x) \leq \frac{1}{2}$: the value 0 is approached but never reached.`);
});
