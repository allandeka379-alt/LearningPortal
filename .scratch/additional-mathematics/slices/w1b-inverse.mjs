// W1b: amath.functions.inverse
import { concept, P, t, chk, sfStr } from "../lib.mjs";

/** Asserts fi undoes f at the sample points. */
const inv = (f, fi, xs, label) => xs.forEach((x) => chk(fi(f(x)), x, 1e-9, `${label}: fi(f(${x}))`));

concept("amath.functions.inverse", { file: "functions/inverse", keyPrefix: "functions.inverse" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these functions, each defined for all real $x$, has an inverse?`,
    options: [
      [t`$f(x) = 3x - 2$`, "Correct: a non-horizontal straight line is one-one."],
      [t`$f(x) = x^2 + 3$`, t`Many-one: $f(-1) = f(1) = 4$, so it has no inverse on all real numbers.`],
      [t`$f(x) = (x - 2)^2$`, t`Many-one: $f(0) = f(4) = 4$.`],
      [t`$f(x) = 5 - x^2$`, t`Many-one: $f(-2) = f(2) = 1$.`],
    ],
    answer: "A",
    explanation: "Only one-one functions have inverses. Each quadratic is symmetrical about its vertex, so it is many-one unless its domain is restricted.",
  });

  inv((x) => 5 * x + 2, (x) => (x - 2) / 5, [-3, 0, 1.5, 7], "q2");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = 5x + 2$, find $f^{-1}(x)$. Type a fraction with /, e.g. (x+1)/3.`,
    accepted: ["(x-2)/5", "x/5-2/5", "0.2x-0.4", "1/5(x-2)", "(1/5)(x-2)", "0.2(x-2)", "(-2+x)/5"],
    wrong: ["1/(5x+2)", "(x+2)/5", "5x-2"],
    explanation: t`$y = 5x + 2$, so $x = \frac{y - 2}{5}$ and $f^{-1}(x) = \frac{x - 2}{5}$. Check: $f(1) = 7$ and $f^{-1}(7) = 1$.`,
  });

  inv((x) => 3 * x - 4, (x) => (x + 4) / 3, [5], "q3");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $f(x) = 3x - 4$, find $f^{-1}(11)$.`,
    value: 5, wrong: [29, 2.33],
    explanation: t`$f^{-1}(11)$ is the input that $f$ sends to 11: $3x - 4 = 11$, so $x = 5$. (Equivalently $f^{-1}(x) = \frac{x + 4}{3}$ gives $\frac{15}{3} = 5$.)`,
  });

  inv((x) => x ** 3 + 1, (x) => Math.cbrt(x - 1), [-2, 0, 1.3, 3], "q4");
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $f(x) = x^3 + 1$, $x \in \mathbb{R}$, find $f^{-1}(x)$.`,
    options: [
      [t`$\sqrt[3]{x - 1}$`, t`Correct: $y = x^3 + 1$ gives $x^3 = y - 1$, so $x = \sqrt[3]{y - 1}$.`],
      [t`$\sqrt[3]{x} - 1$`, t`Subtract 1 before taking the cube root: undo the operations in reverse order.`],
      [t`$\dfrac{1}{x^3 + 1}$`, "This is the reciprocal of f(x), not its inverse."],
      [t`$x^3 - 1$`, t`Cubing again does not undo cubing; you need a cube root.`],
    ],
    answer: "A",
    explanation: t`$f$ cubes and then adds 1, so $f^{-1}$ subtracts 1 and then takes the cube root: $f^{-1}(x) = \sqrt[3]{x - 1}$.`,
  });

  b.tf({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`The graph of $y = f^{-1}(x)$ is the reflection of the graph of $y = f(x)$ in the line $y = x$.`,
    answer: true,
    explanation: t`True. If $(a, b)$ is on $y = f(x)$ then $(b, a)$ is on $y = f^{-1}(x)$; swapping coordinates is reflection in $y = x$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any one-one function, $f^{-1}(x) = \dfrac{1}{f(x)}$.`,
    answer: false,
    explanation: t`False. The $-1$ means "inverse function", not reciprocal. For $f(x) = x + 2$, $f^{-1}(x) = x - 2$ but $\frac{1}{f(x)} = \frac{1}{x + 2}$.`,
  });

  inv((x) => (x + 3) / (x - 2), (x) => (2 * x + 3) / (x - 1), [-5, 0, 1.5, 3, 8], "q7");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = \dfrac{x + 3}{x - 2}$, $x \neq 2$, find $f^{-1}(x)$. Type a fraction with /, e.g. (4x+1)/(x-3).`,
    accepted: ["(2x+3)/(x-1)", "(3+2x)/(x-1)", "(-2x-3)/(1-x)", "(2x+3)/(-1+x)"],
    wrong: ["(x-2)/(x+3)", "(x+3)/(x-2)"],
    explanation: t`$y(x - 2) = x + 3$, so $xy - 2y = x + 3$, $xy - x = 2y + 3$, $x(y - 1) = 2y + 3$ and $x = \dfrac{2y + 3}{y - 1}$. So $f^{-1}(x) = \dfrac{2x + 3}{x - 1}$, $x \neq 1$.`,
    hints: [t`Multiply by $(x - 2)$, then collect the $x$ terms on one side.`, t`Factorise: $x(y - 1) = \ldots$`],
  });

  inv((x) => Math.exp(x) - 2, (x) => Math.log(x + 2), [-3, 0, 1, 2.5], "q8");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = \mathrm{e}^x - 2$, $x \in \mathbb{R}$, find $f^{-1}(x)$ and its domain.`,
    options: [
      [t`$f^{-1}(x) = \ln(x + 2)$, $x > -2$`, t`Correct: $\mathrm{e}^x = y + 2$, so $x = \ln(y + 2)$; the range of $f$ is $f(x) > -2$.`],
      [t`$f^{-1}(x) = \ln x + 2$, $x > 0$`, t`Add 2 before taking the logarithm: undo the operations in reverse order.`],
      [t`$f^{-1}(x) = \ln(x + 2)$, $x \in \mathbb{R}$`, t`$\ln(x + 2)$ is only defined for $x > -2$, which is the range of $f$.`],
      [t`$f^{-1}(x) = \ln(x - 2)$, $x > 2$`, t`From $y = \mathrm{e}^x - 2$, $\mathrm{e}^x = y + 2$, not $y - 2$.`],
    ],
    answer: "A",
    explanation: t`$y = \mathrm{e}^x - 2$ gives $\mathrm{e}^x = y + 2$, so $x = \ln(y + 2)$. The domain of $f^{-1}$ is the range of $f$: since $\mathrm{e}^x > 0$, $f(x) > -2$.`,
    hints: [t`$\ln$ undoes $\mathrm{e}$.`],
  });

  inv((x) => Math.log(3 * x), (x) => Math.exp(x) / 3, [0.2, 1, 4], "q9");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = \ln 3x$, $x > 0$, find $f^{-1}(x)$. Type e^x for the exponential, e.g. 2e^x.`,
    accepted: ["e^x/3", "(1/3)e^x", "(e^x)/3", "e^(x)/3", "1/3*e^x", "(1/3)*e^x"],
    wrong: ["3e^x", "e^(3x)", "e^x-3"],
    explanation: t`$y = \ln 3x$ gives $3x = \mathrm{e}^y$, so $x = \frac{\mathrm{e}^y}{3}$ and $f^{-1}(x) = \frac{\mathrm{e}^x}{3}$, for $x \in \mathbb{R}$.`,
    hints: [t`Take $\mathrm{e}$ to the power of both sides.`],
  });

  b.fib({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`The function $f(x) = 2x + 1$ is defined for $0 \leq x \leq 4$. State the domain of $f^{-1}$.`,
    template: "{{blank:lo}} ≤ x ≤ {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: [1], wrong: "0" },
      { id: "hi", input: "number", accepted: [9], wrong: "4" },
    ],
    explanation: t`The domain of $f^{-1}$ is the range of $f$: $f(0) = 1$ and $f(4) = 9$, so $1 \leq x \leq 9$.`,
    hints: ["Domain of the inverse = range of the function."],
  });

  inv((x) => (x - 2) ** 2 + 1, (x) => 2 + Math.sqrt(x - 1), [5], "q11");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The function $f(x) = (x - 2)^2 + 1$ is defined for $x \geq 2$. Find $f^{-1}(10)$.`,
    value: 5, wrong: [-1, 82],
    explanation: t`Solve $(x - 2)^2 + 1 = 10$: $(x - 2)^2 = 9$, so $x - 2 = \pm 3$ and $x = 5$ or $x = -1$. Only $x = 5$ is in the domain $x \geq 2$, so $f^{-1}(10) = 5$.`,
    hints: ["Use the domain to choose between the two square roots."],
  });

  inv((x) => (x + 1) ** 2 - 3, (x) => -1 + Math.sqrt(x + 3), [-1, 0, 2.5, 6], "q12");
  b.expr({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The function $f(x) = (x + 1)^2 - 3$ is defined for $x \geq -1$. Find $f^{-1}(x)$. Type sqrt(...) or √(...) for the square root.`,
    accepted: ["-1+√(x+3)", "√(x+3)-1", "-1+sqrt(x+3)", "sqrt(x+3)-1", "-1+√(3+x)", "√(3+x)-1", "sqrt(3+x)-1", "-1+sqrt(3+x)"],
    wrong: ["-1-√(x+3)", "√(x-3)+1", "1+√(x+3)"],
    explanation: t`$y = (x + 1)^2 - 3$, so $(x + 1)^2 = y + 3$ and $x + 1 = \pm\sqrt{y + 3}$. Since $x \geq -1$, $x + 1 \geq 0$: take $+$. So $f^{-1}(x) = -1 + \sqrt{x + 3}$, for $x \geq -3$.`,
    hints: ["Rearrange to make the bracket the subject, then take square roots.", "The domain x ≥ −1 decides the sign of the root."],
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The function $f(x) = x^2 - 4x + 7$ is defined for $x \geq 2$. What is the domain of $f^{-1}$?`,
    options: [
      [t`$x \geq 3$`, t`Correct: $f(x) = (x - 2)^2 + 3$, so the range of $f$ is $f(x) \geq 3$.`],
      [t`$x \geq 2$`, t`That is the domain of $f$, which becomes the range of $f^{-1}$.`],
      [t`$x \geq 7$`, t`$7 = f(0)$, but 0 is not in the domain; the least value of $f$ is $f(2) = 3$.`],
      [t`$x \in \mathbb{R}$`, t`$f^{-1}$ can only accept outputs of $f$, which are all at least 3.`],
    ],
    answer: "A",
    explanation: t`Complete the square: $(x - 2)^2 + 3$. On $x \geq 2$ the least value is $3$, so the range of $f$, and hence the domain of $f^{-1}$, is $x \geq 3$.`,
    hints: ["The domain of the inverse is the range of f."],
  });

  inv((x) => x * x - 2, (x) => Math.sqrt(x + 2), [0, 1, 2, 3], "q14");
  chk(2 * 2 - 2, 2);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The function $f(x) = x^2 - 2$ is defined for $x \geq 0$. The graphs of $y = f(x)$ and $y = f^{-1}(x)$ meet at one point. Find its $x$-coordinate.`,
    value: 2, wrong: [-1],
    explanation: t`$f$ is increasing on $x \geq 0$, so the graphs meet on $y = x$. Solve $x^2 - 2 = x$: $x^2 - x - 2 = 0$, $(x - 2)(x + 1) = 0$. Only $x = 2$ is in the domain, so the point is $(2, 2)$.`,
    hints: [t`For an increasing function, $f$ and $f^{-1}$ meet on the line $y = x$.`],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`Explain in words why the function $f(x) = x^2 + 1$, $x \in \mathbb{R}$, does not have an inverse.`,
    points: [t`States that $f$ is many-one (not one-one), with an example such as $f(-2) = f(2) = 5$.`, t`States that an inverse would map one value (e.g. 5) to two values, so it would not be a function.`],
    modelAnswer: t`$f(-2) = 5$ and $f(2) = 5$, so $f$ is many-one. An inverse would have to send 5 back to both $-2$ and $2$, but a function gives only one output for each input, so $f^{-1}$ does not exist.`,
    explanation: t`Restricting the domain to $x \geq 0$ (or $x \leq 0$) would make $f$ one-one and give it an inverse.`,
    hints: ["Find two inputs with the same output."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Match each function $f$ with its inverse $f^{-1}$.`,
    pairs: [
      [t`$f(x) = 2x$`, t`$f^{-1}(x) = \frac{x}{2}$`],
      [t`$f(x) = x + 5$`, t`$f^{-1}(x) = x - 5$`],
      [t`$f(x) = \mathrm{e}^x$`, t`$f^{-1}(x) = \ln x$`],
      [t`$f(x) = x^3$`, t`$f^{-1}(x) = \sqrt[3]{x}$`],
    ],
    explanation: "Each inverse undoes its function: halving undoes doubling, subtracting 5 undoes adding 5, ln undoes e to the power, the cube root undoes cubing.",
  });

  const v17 = Math.log(4);
  inv((x) => 3 * Math.exp(x), (x) => Math.log(x / 3), [v17], "q17");
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Given $f(x) = 3\mathrm{e}^x$, $x \in \mathbb{R}$, find $f^{-1}(12)$, giving your answer correct to 3 significant figures.`,
    value: v17, wrong: [sfStr(Math.log(12) / 3), 4],
    explanation: t`$3\mathrm{e}^x = 12$ gives $\mathrm{e}^x = 4$, so $x = \ln 4 = ${sfStr(v17)}$. In general $f^{-1}(x) = \ln\frac{x}{3}$.`,
    hints: [t`Solve $3\mathrm{e}^x = 12$.`],
  });

  inv((x) => (3 * x - 1) / (x + 2), (x) => (2 * x + 1) / (3 - x), [-5, 0, 1, 4], "q18");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Given $f(x) = \dfrac{3x - 1}{x + 2}$, $x \neq -2$, show that $f^{-1}(x) = \dfrac{2x + 1}{3 - x}$.`,
    points: [
      t`M1 writes $y(x + 2) = 3x - 1$ and expands to $xy + 2y = 3x - 1$.`,
      t`M1 collects the $x$ terms and factorises: $x(y - 3) = -2y - 1$ (or $x(3 - y) = 2y + 1$).`,
      t`A1 reaches $f^{-1}(x) = \dfrac{2x + 1}{3 - x}$ with correct signs.`,
    ],
    modelAnswer: t`$$
y = \frac{3x - 1}{x + 2}
$$

$$
xy + 2y = 3x - 1
$$

$$
2y + 1 = 3x - xy = x(3 - y)
$$

$$
x = \frac{2y + 1}{3 - y}
$$

So $f^{-1}(x) = \dfrac{2x + 1}{3 - x}$, for $x \neq 3$.`,
    explanation: t`Collecting the $x$ terms on the side where they are positive avoids sign errors. Check: $f(1) = \frac{2}{3}$ and $f^{-1}\left(\frac{2}{3}\right) = \frac{7/3}{7/3} = 1$.`,
    hints: [t`Multiply both sides by $(x + 2)$.`, t`Get every term containing $x$ on one side.`],
  });

  // Struct 1: f(x) = 2x^2 - 12x + 23 = 2(x - 3)^2 + 5, x >= 3
  const sf = (x) => 2 * x * x - 12 * x + 23;
  inv(sf, (x) => 3 + Math.sqrt((x - 5) / 2), [3, 4, 6.5, 10], "s1");
  chk(sf(3), 5);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 2x^2 - 12x + 23$ for $x \geq 3$. It can be written as $f(x) = 2(x - 3)^2 + 5$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`The range of $f$ is $f(x) \geq m$. Find $m$.`, value: 5, prefix: "m =", wrong: [23, 3], explanation: t`The least value is at $x = 3$: $f(3) = 5$.` }),
      P.expr({ label: "(b)", marks: 3, stem: t`Find $f^{-1}(x)$. Type sqrt(...) or √(...) for the square root, e.g. 2+sqrt((x-1)/3).`,
        accepted: ["3+sqrt((x-5)/2)", "3+√((x-5)/2)", "sqrt((x-5)/2)+3", "√((x-5)/2)+3", "3+sqrt(x/2-5/2)", "3+sqrt(0.5x-2.5)"],
        wrong: ["3-sqrt((x-5)/2)", "sqrt((x+5)/2)-3"],
        explanation: t`$y = 2(x - 3)^2 + 5$, so $(x - 3)^2 = \frac{y - 5}{2}$ and $x - 3 = +\sqrt{\frac{y - 5}{2}}$ (positive because $x \geq 3$). So $f^{-1}(x) = 3 + \sqrt{\frac{x - 5}{2}}$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`The domain of $f^{-1}$ is $x \geq k$. Find $k$.`, value: 5, prefix: "k =", wrong: [3], explanation: t`The domain of $f^{-1}$ is the range of $f$: $x \geq 5$.` }),
      P.manual({ label: "(d)", marks: 2, stem: t`Describe how the graphs of $y = f(x)$ and $y = f^{-1}(x)$ are related, giving the end point of each graph.`,
        points: [t`One graph is the reflection of the other in the line $y = x$.`, t`$y = f(x)$ starts at $(3, 5)$ and $y = f^{-1}(x)$ starts at $(5, 3)$.`],
        modelAnswer: t`They are reflections of each other in $y = x$. The graph of $f$ is half a parabola starting at its vertex $(3, 5)$; the graph of $f^{-1}$ starts at $(5, 3)$ and rises more and more slowly.`,
        explanation: "Reflection in y = x swaps the coordinates of every point." }),
    ],
    explanation: "The domain x ≥ 3 is the right half of the parabola, so f is one-one; the positive square root gives the inverse.",
    hints: [t`Rearrange $y = 2(x - 3)^2 + 5$ for $x$.`, "Domain of the inverse = range of the function."],
  });

  // Struct 2: f(x) = 2e^x + 1, x in R
  const g = (x) => 2 * Math.exp(x) + 1;
  const gi = (x) => Math.log((x - 1) / 2);
  inv(g, gi, [-2, 0, 1.5], "s2");
  chk(gi(7), Math.log(3)); chk(g(gi(5)), 5);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 2\mathrm{e}^x + 1$ for $x \in \mathbb{R}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`The range of $f$ is $f(x) > m$. Find $m$.`, value: 1, prefix: "m =", wrong: [3, 0], explanation: t`$2\mathrm{e}^x > 0$, so $f(x) > 1$.` }),
      P.expr({ label: "(b)", marks: 3, stem: t`Find $f^{-1}(x)$. Type ln(...) for the natural logarithm, e.g. ln((x+2)/5).`,
        accepted: ["ln((x-1)/2)", "ln(x-1)-ln2", "ln(x-1)-ln(2)", "ln(0.5(x-1))", "ln(0.5x-0.5)", "ln(x/2-1/2)", "ln(1/2(x-1))", "ln((1/2)(x-1))"],
        wrong: ["ln(x-1)/2", "ln((x+1)/2)", "(ln x-1)/2"],
        explanation: t`$y = 2\mathrm{e}^x + 1$, so $\mathrm{e}^x = \frac{y - 1}{2}$ and $x = \ln\left(\frac{y - 1}{2}\right)$. So $f^{-1}(x) = \ln\left(\frac{x - 1}{2}\right)$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`The domain of $f^{-1}$ is $x > k$. Find $k$.`, value: 1, prefix: "k =", wrong: [0], explanation: t`Domain of $f^{-1}$ = range of $f$: $x > 1$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Solve $f^{-1}(x) = \ln 3$.`, value: 7, prefix: "x =", wrong: [4, 6.5],
        explanation: t`$\ln\left(\frac{x - 1}{2}\right) = \ln 3$, so $\frac{x - 1}{2} = 3$ and $x = 7$. (Equivalently $x = f(\ln 3) = 2(3) + 1 = 7$.)` }),
      P.num({ label: "(e)", marks: 1, stem: t`Write down the value of $ff^{-1}(5)$.`, value: 5, wrong: [11], explanation: t`$ff^{-1}(x) = x$ for every $x$ in the domain of $f^{-1}$, so $ff^{-1}(5) = 5$.` }),
      P.mcq({ label: "(f)", marks: 1, stem: t`The graph of $y = f(x)$ has the asymptote $y = 1$. Which line is an asymptote of $y = f^{-1}(x)$?`,
        options: [
          [t`$x = 1$`, "Correct: reflecting in y = x turns the horizontal asymptote y = 1 into the vertical asymptote x = 1."],
          [t`$y = 1$`, "Asymptotes are reflected too: horizontal becomes vertical."],
          [t`$x = -1$`, t`The reflection of $y = 1$ in $y = x$ is $x = 1$, not $x = -1$.`],
          [t`$y = x$`, t`$y = x$ is the mirror line, not an asymptote.`],
        ],
        answer: "A", explanation: t`$f^{-1}(x) = \ln\left(\frac{x - 1}{2}\right) \to -\infty$ as $x \to 1^+$: the line $x = 1$ is a vertical asymptote.` }),
    ],
    explanation: t`Undo the operations of $f$ in reverse order: subtract 1, divide by 2, take $\ln$. Domains, ranges and asymptotes all swap between $f$ and $f^{-1}$.`,
    hints: [t`Make $\mathrm{e}^x$ the subject first.`, t`$\ln$ and $\mathrm{e}$ undo each other.`],
  });

  // Cards
  b.card("DEFINITION", t`Inverse function $f^{-1}$`, t`The function that reverses $f$: if $f(a) = b$ then $f^{-1}(b) = a$.`);
  b.card("FACT", "Which functions have inverses?", "Only one-one functions.");
  b.card("FACT", t`Domain and range of $f^{-1}$`, t`Domain of $f^{-1}$ = range of $f$; range of $f^{-1}$ = domain of $f$.`);
  b.card("CONCEPT", t`Finding $f^{-1}(x)$`, t`Write $y = f(x)$, make $x$ the subject, then replace $y$ by $x$.`);
  b.card("FACT", t`Graph of $y = f^{-1}(x)$`, t`The reflection of $y = f(x)$ in the line $y = x$.`);
  b.card("FACT", t`$ff^{-1}(x)$ and $f^{-1}f(x)$`, t`Both equal $x$.`);
  b.card("CONCEPT", "Inverse of a quadratic", "Restrict the domain to one side of the vertex, complete the square, and choose the sign of the root from the domain.");
  b.card("FACT", t`Inverse of $\mathrm{e}^x$`, t`$\ln x$, for $x > 0$.`);
  b.card("FACT", t`Is $f^{-1}(x) = \dfrac{1}{f(x)}$?`, "No: the −1 means inverse function, not reciprocal.");
});
