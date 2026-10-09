// W1b: amath.functions.domain-range
import { concept, P, t, chk, same, quad } from "../lib.mjs";

concept("amath.functions.domain-range", { file: "functions/domain-range", keyPrefix: "functions.domain-range" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these functions, each defined for all real $x$, is many-one?`,
    options: [
      [t`$f(x) = x^2 - 1$`, t`Correct: $f(-2) = f(2) = 3$, so two inputs share an output.`],
      [t`$f(x) = 2x + 1$`, "A non-horizontal straight line: every output comes from exactly one input."],
      [t`$f(x) = x^3$`, "Always increasing, so different inputs give different outputs: one-one."],
      [t`$f(x) = \mathrm{e}^x$`, "Always increasing, so it is one-one."],
    ],
    answer: "A",
    explanation: t`A function is many-one when some horizontal line meets its graph more than once. The parabola $y = x^2 - 1$ is symmetrical about $x = 0$, so it is many-one (ZIMSEC: a two-to-one mapping).`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = 2x + 3$ for $0 \leq x \leq 5$.`,
    options: [
      [t`$3 \leq f(x) \leq 13$`, t`Correct: $f(0) = 3$ and $f(5) = 13$, and $f$ is increasing.`],
      [t`$0 \leq f(x) \leq 5$`, "This repeats the domain; the range is the set of outputs."],
      [t`$3 \leq x \leq 13$`, t`The values are right, but a range must be written in terms of $f(x)$, not $x$.`],
      [t`$5 \leq f(x) \leq 13$`, t`$f(0) = 2(0) + 3 = 3$, not 5.`],
    ],
    answer: "A",
    explanation: t`A linear function with positive gradient is increasing, so its least and greatest values are at the ends of the domain: $3 \leq f(x) \leq 13$.`,
  });

  const f3 = (x) => 5 - 2 * x;
  chk(f3(-1), 7); chk(f3(3), -1);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = 5 - 2x$ for $-1 \leq x \leq 3$.`,
    template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: [-1], wrong: "7" },
      { id: "hi", input: "number", accepted: [7], wrong: "3" },
    ],
    explanation: t`$f(-1) = 7$ and $f(3) = -1$. The function is decreasing, so the greatest value is at the left end: $-1 \leq f(x) \leq 7$.`,
  });

  chk(3 * (-2) ** 2 - 4, 8);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $f(x) = 3x^2 - 4$, find $f(-2)$.`,
    value: 8, wrong: [-16, 32],
    explanation: t`$f(-2) = 3(-2)^2 - 4 = 3(4) - 4 = 8$. Square first, then multiply by 3.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The mapping $\{1 \mapsto 4,\ 2 \mapsto 4,\ 3 \mapsto 5\}$ is a function.`,
    answer: true,
    explanation: "True. Each input has exactly one output. Two inputs share the output 4, so it is a many-one function, but it is still a function.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`The mapping $x \mapsto \pm\sqrt{x}$ for $x > 0$ is a function.`,
    answer: false,
    explanation: t`False. The input 4 is mapped to both $2$ and $-2$. A function must give exactly one output for each input.`,
  });

  chk(quad.completeSquare(1, 4, 7).q, 3);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = x^2 + 4x + 7$, $x \in \mathbb{R}$.`,
    options: [
      [t`$f(x) \geq 3$`, t`Correct: $f(x) = (x + 2)^2 + 3$.`],
      [t`$f(x) \geq 7$`, t`7 is $f(0)$, but $f(-2) = 3$ is smaller.`],
      [t`$f(x) \geq -2$`, t`$-2$ is the $x$-value of the vertex, not the least value of $f$.`],
      [t`$f(x) \in \mathbb{R}$`, "A U-shaped parabola has a least value, so not every real number is an output."],
    ],
    answer: "A",
    explanation: t`$x^2 + 4x + 7 = (x + 2)^2 + 3 \geq 3$, with equality at $x = -2$. Range: $f(x) \geq 3$.`,
    hints: ["Complete the square."],
  });

  const f8 = (x) => x * x - 2 * x - 3;
  chk(quad.completeSquare(1, -2, -3).q, -4); chk(f8(-2), 5); chk(f8(2), -3);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Find the range of $f(x) = x^2 - 2x - 3$ for $-2 \leq x \leq 2$.`,
    template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: [-4], wrong: "-3" },
      { id: "hi", input: "number", accepted: [5], wrong: "5" },
    ],
    explanation: t`$f(x) = (x - 1)^2 - 4$: least value $-4$ at $x = 1$, which is in the domain. Ends: $f(-2) = 5$, $f(2) = -3$. Range $-4 \leq f(x) \leq 5$.`,
    hints: ["Find the vertex first.", "Compare the values at both ends of the domain."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Find the range of $f(x) = \mathrm{e}^x + 3$, $x \in \mathbb{R}$.`,
    options: [
      [t`$f(x) > 3$`, t`Correct: $\mathrm{e}^x > 0$ for all $x$, so $\mathrm{e}^x + 3 > 3$.`],
      [t`$f(x) \geq 3$`, t`$\mathrm{e}^x$ is never 0, so $f(x)$ never equals 3.`],
      [t`$f(x) \geq 4$`, t`$4 = f(0)$, but negative $x$ give values between 3 and 4.`],
      [t`$f(x) > 0$`, t`Adding 3 shifts the graph up: all outputs exceed 3.`],
    ],
    answer: "A",
    explanation: t`$y = \mathrm{e}^x + 3$ has the horizontal asymptote $y = 3$: it approaches 3 as $x \to -\infty$ but never reaches it, and grows without limit as $x$ increases.`,
    hints: [t`What values can $\mathrm{e}^x$ take?`],
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Find the range of $g(x) = 4 - 3\mathrm{e}^{x}$, $x \in \mathbb{R}$.`,
    options: [
      [t`$g(x) < 4$`, t`Correct: $3\mathrm{e}^x > 0$, so $4 - 3\mathrm{e}^x < 4$, and it takes every value below 4.`],
      [t`$g(x) > 4$`, "Subtracting a positive quantity makes the value less than 4, not more."],
      [t`$g(x) \leq 1$`, t`$1 = g(0)$, but for negative $x$, $g(x)$ lies between 1 and 4.`],
      [t`$g(x) < 3$`, t`The asymptote comes from the constant term 4, not from the coefficient 3.`],
    ],
    answer: "A",
    explanation: t`As $x \to -\infty$, $3\mathrm{e}^x \to 0$ and $g(x) \to 4$ from below; as $x \to \infty$, $g(x) \to -\infty$. So the range is $g(x) < 4$.`,
    hints: [t`Start from $\mathrm{e}^x > 0$ and build up $4 - 3\mathrm{e}^x$ step by step.`],
  });

  chk(Math.log10(1), 0); chk(Math.log10(1000), 3);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = \log_{10} x$ for $1 \leq x \leq 1000$.`,
    template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: [0], wrong: "1" },
      { id: "hi", input: "number", accepted: [3], wrong: "1000" },
    ],
    explanation: t`$\log_{10} x$ is increasing: $\log_{10} 1 = 0$ and $\log_{10} 1000 = 3$, so $0 \leq f(x) \leq 3$.`,
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The function $f(x) = \sqrt{6 - 2x}$ is defined for $x \leq k$. Find the largest possible value of $k$.`,
    value: 3, prefix: "k =", wrong: [6, -3],
    explanation: t`The square root needs $6 - 2x \geq 0$, so $2x \leq 6$ and $x \leq 3$. So $k = 3$.`,
    hints: ["The expression under a square root must not be negative."],
  });

  chk(quad.completeSquare(1, -8, 5).p, -4);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The function $g(x) = x^2 - 8x + 5$ is defined for $x \geq k$. Find the least value of $k$ for which $g$ is one-one.`,
    value: 4, prefix: "k =", wrong: [-4, 8],
    explanation: t`$g(x) = (x - 4)^2 - 11$, with vertex at $x = 4$. For $x \geq 4$ the graph is always increasing, so $g$ is one-one; any smaller $k$ includes points either side of the vertex with equal outputs. Least $k = 4$.`,
    hints: ["Find the x-coordinate of the vertex."],
  });

  chk(0 * 0 - 4 * 0, 4 * 4 - 4 * 4);
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`Explain why the function $f(x) = x^2 - 4x$, $x \in \mathbb{R}$, is not one-one.`,
    points: [
      t`Gives two different inputs with the same output, e.g. $f(0) = f(4) = 0$ (or any symmetric pair about $x = 2$).`,
      "States that a one-one function needs different inputs to give different outputs, so f is many-one.",
    ],
    modelAnswer: t`$f(0) = 0$ and $f(4) = 16 - 16 = 0$. Two different inputs have the same image, so $f$ is many-one, not one-one. (Its graph is a parabola symmetrical about $x = 2$, so a horizontal line can meet it twice.)`,
    explanation: "One counter-example with specific numbers is the clearest explanation.",
    hints: ["Find two different x-values with the same f(x)."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Match each function, defined for all real $x$, with its range.`,
    pairs: [
      [t`$f(x) = x^2$`, t`$f(x) \geq 0$`],
      [t`$f(x) = \mathrm{e}^x$`, t`$f(x) > 0$`],
      [t`$f(x) = 2x + 1$`, t`$f(x) \in \mathbb{R}$`],
      [t`$f(x) = 1 - x^2$`, t`$f(x) \leq 1$`],
    ],
    explanation: t`$x^2$ reaches 0 but never goes below it; $\mathrm{e}^x$ approaches 0 but never reaches it; a non-horizontal line takes every value; $1 - x^2$ has maximum 1.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is the largest possible domain of $h(x) = \dfrac{1}{x - 5}$?`,
    options: [
      [t`$x \in \mathbb{R}$, $x \neq 5$`, "Correct: only x = 5 makes the denominator zero."],
      [t`$x > 5$`, t`Values below 5 are fine too: $h(0) = -\frac{1}{5}$.`],
      [t`$x \in \mathbb{R}$, $x \neq -5$`, t`At $x = -5$ the denominator is $-10$, which is allowed.`],
      [t`$x \neq 0$`, t`$x = 0$ gives $-\frac{1}{5}$; the problem value is where $x - 5 = 0$.`],
    ],
    answer: "A",
    explanation: "Division by zero is undefined, so exclude the value that makes the denominator zero: x = 5.",
  });

  chk(12 / (1 + 1), 6); chk(12 / (5 + 1), 2);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the range of $f(x) = \dfrac{12}{x + 1}$ for $1 \leq x \leq 5$.`,
    template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: [2], wrong: "6" },
      { id: "hi", input: "number", accepted: [6], wrong: "12" },
    ],
    explanation: t`For $x > -1$ the function is decreasing (a bigger denominator gives a smaller value). $f(1) = 6$ and $f(5) = 2$, so $2 \leq f(x) \leq 6$.`,
    hints: ["Is the function increasing or decreasing on this domain?"],
  });

  // Struct 1: f(x) = 2x^2 - 8x + 1 = 2(x - 2)^2 - 7 on 0 <= x <= 5
  const fs = (x) => 2 * x * x - 8 * x + 1;
  chk(quad.completeSquare(2, -8, 1).q, -7); chk(fs(0), 1); chk(fs(5), 11); chk(fs(4), 1);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 2x^2 - 8x + 1$ for $0 \leq x \leq 5$. It can be written as $f(x) = 2(x - 2)^2 - 7$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $f(0)$ and $f(5)$.`, template: "f(0) = {{blank:a}}, f(5) = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-7" }, { id: "b", input: "number", accepted: [11], wrong: "91" }],
        explanation: t`$f(0) = 1$; $f(5) = 50 - 40 + 1 = 11$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the range of $f$.`, template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [-7], wrong: "1" }, { id: "hi", input: "number", accepted: [11], wrong: "11" }],
        explanation: t`The vertex $(2, -7)$ is in the domain, so the least value is $-7$; the greatest is $f(5) = 11$.` }),
      P.manual({ label: "(c)", marks: 2, stem: t`Explain why $f$ does not have an inverse.`,
        points: [t`Shows $f$ is many-one with an example, e.g. $f(0) = f(4) = 1$.`, "States that only one-one functions have inverses."],
        modelAnswer: t`$f(0) = 1$ and $f(4) = 32 - 32 + 1 = 1$, so two inputs have the same image: $f$ is many-one. An inverse would have to send 1 back to both 0 and 4, so it would not be a function.`,
        explanation: "The domain contains points on both sides of the vertex." }),
      P.num({ label: "(d)", marks: 1, stem: t`The domain is changed to $k \leq x \leq 5$. Find the least value of $k$ for which $f$ is one-one.`, value: 2, prefix: "k =", wrong: [0, -2],
        explanation: t`The vertex is at $x = 2$; for $2 \leq x \leq 5$, $f$ is increasing.` }),
    ],
    explanation: "Use the completed square for the vertex; the vertex both gives the least value and splits the domain into one-one pieces.",
    hints: [t`The vertex of $2(x - 2)^2 - 7$ is $(2, -7)$.`, "A function has an inverse only if it is one-one."],
  });

  // Struct 2: f(x) = 2e^x - 1, x >= 0; g(x) = ln(x + 3), x > -3
  chk(2 * Math.exp(0) - 1, 1); chk(Math.log(-2 + 3), 0); chk(Math.log(Math.exp(2) - 3 + 3), 2);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The functions $f$ and $g$ are defined by $f(x) = 2\mathrm{e}^x - 1$ for $x \geq 0$, and $g(x) = \ln(x + 3)$ for $x > -3$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`Find $f(0)$.`, value: 1, wrong: [2], explanation: t`$f(0) = 2\mathrm{e}^0 - 1 = 2 - 1 = 1$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`State the range of $f$. The range has the form $f(x) \geq m$; find $m$.`, value: 1, prefix: "m =", wrong: [-1, 0],
        explanation: t`$f$ is increasing and its least value, at $x = 0$, is 1. Range: $f(x) \geq 1$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: t`Is $f$ one-one?`,
        options: [
          ["Yes, because it is increasing on its whole domain.", t`Correct: $\mathrm{e}^x$ is increasing, so $2\mathrm{e}^x - 1$ is too.`],
          ["No, because exponential graphs have an asymptote.", "Having an asymptote does not make a function many-one."],
          [t`No, because $f(0) = f(1)$.`, t`$f(1) = 2\mathrm{e} - 1 \approx 4.44$, which is not $f(0) = 1$.`],
          ["Yes, because its domain is restricted.", "Restricting the domain is not the reason here; any increasing function is one-one."],
        ],
        answer: "A", explanation: "An increasing function never takes the same value twice." }),
      P.num({ label: "(d)", marks: 1, stem: t`Find $g(-2)$.`, value: 0, wrong: [1], explanation: t`$g(-2) = \ln 1 = 0$.` }),
      P.fib({ label: "(e)", marks: 2, stem: t`Find the range of $g$ when its domain is restricted to $-2 \leq x \leq \mathrm{e}^2 - 3$.`, template: "{{blank:lo}} ≤ g(x) ≤ {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [0], wrong: "-2" }, { id: "hi", input: "number", accepted: [2], wrong: "4.39" }],
        explanation: t`$g$ is increasing; $g(-2) = \ln 1 = 0$ and $g(\mathrm{e}^2 - 3) = \ln \mathrm{e}^2 = 2$.` }),
      P.manual({ label: "(f)", marks: 2, stem: t`Explain why $x = -4$ cannot be in the domain of $g$.`,
        points: [t`States $x + 3 = -1$ when $x = -4$.`, "States that the logarithm of a negative number (or zero) is not defined."],
        modelAnswer: t`At $x = -4$, $x + 3 = -1$, and $\ln$ is only defined for positive numbers, so $g(-4)$ does not exist.`,
        explanation: t`$\ln u$ needs $u > 0$, which is why the domain of $g$ is $x > -3$.` }),
    ],
    explanation: t`Use $\mathrm{e}^x > 0$ and the fact that $\ln$ needs a positive input; both functions are increasing, so ranges come from the end values.`,
    hints: [t`$\mathrm{e}^0 = 1$ and $\ln 1 = 0$.`, t`$\ln \mathrm{e}^2 = 2$.`],
  });

  same([1, 2].length, 2);

  // Cards
  b.card("DEFINITION", "Function", "A mapping in which every input in the domain has exactly one output.");
  b.card("DEFINITION", "Domain", "The set of input values for which the function is defined.");
  b.card("DEFINITION", "Range (image set)", t`The set of all outputs $f(x)$ for $x$ in the domain.`);
  b.card("DEFINITION", "One-one function (ZIMSEC: one-to-one mapping)", "Different inputs always give different outputs.");
  b.card("DEFINITION", "Many-one function (ZIMSEC: e.g. two-to-one mapping)", t`Some output comes from two or more inputs, e.g. $f(x) = x^2$.`);
  b.card("CONCEPT", "Vertical line test", "A graph is a function of x if no vertical line meets it more than once.");
  b.card("CONCEPT", "Horizontal line test", "A function is one-one if no horizontal line meets its graph more than once.");
  b.card("FACT", t`Range of $\mathrm{e}^x$, $x \in \mathbb{R}$`, t`$\mathrm{e}^x > 0$ (never 0).`);
  b.card("FACT", t`Domain and range of $\ln x$`, t`Domain $x > 0$; range all real numbers.`);
  b.card("CONCEPT", "Range of a quadratic on an interval", "Use the vertex if it lies in the interval, and compare the values at both ends.");
});
