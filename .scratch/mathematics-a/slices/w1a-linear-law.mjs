// W1a: amaths.functions.linear-law — reducing y = kx^n, y = ka^x (and ZIMSEC's other forms) to straight lines.
import { concept, P, t, chk, ZP } from "../lib.mjs";

concept("amaths.functions.linear-law", { file: "functions/linear-law", keyPrefix: "functions.linear-law" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`It is thought that $y = kx^{n}$. Which graph should be drawn to test this with a straight line?`,
    options: [
      [t`$\ln y$ against $\ln x$`, t`Correct: $\ln y = n\ln x + \ln k$.`],
      [t`$\ln y$ against $x$`, t`That straightens $y = ka^{x}$, an exponential law.`],
      [t`$y$ against $\ln x$`, "Only y = n ln x + c would give a straight line here."],
      [t`$y$ against $x^{n}$`, "n is unknown, so x^n cannot be calculated."],
    ],
    answer: "A",
    explanation: t`Taking logarithms of $y = kx^{n}$ gives $\ln y = n\ln x + \ln k$: a line with gradient $n$ and intercept $\ln k$ when $\ln y$ is plotted against $\ln x$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $y = ka^{x}$, the graph of $\ln y$ against $x$ is a straight line. What is its gradient?`,
    options: [
      [t`$\ln a$`, t`Correct: $\ln y = (\ln a)x + \ln k$.`],
      [t`$a$`, t`The gradient is $\ln a$; $a = \mathrm{e}^{\text{gradient}}$.`],
      [t`$\ln k$`, "That is the intercept."],
      [t`$k$`, "k appears only in the intercept, as ln k."],
    ],
    answer: "A",
    explanation: t`$\ln y = \ln k + x\ln a$, so the gradient is $\ln a$ and the intercept on the $\ln y$ axis is $\ln k$.`,
  });

  const n3 = (6.1 - 2.5) / (3 - 1);
  chk(n3, 1.8, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The variables satisfy $y = kx^{n}$. The graph of $\ln y$ against $\ln x$ is a straight line through the points $(1, 2.5)$ and $(3, 6.1)$. Find $n$.`,
    value: n3, prefix: "n =", wrong: [0.556, 3.6],
    explanation: t`$n$ is the gradient: $\dfrac{6.1 - 2.5}{3 - 1} = \dfrac{3.6}{2} = 1.8$.`,
  });

  const n4 = (4.3 - 1.9) / (2.5 - 0.5);
  chk(n4, 1.2, 1e-12);
  const k4 = Math.exp(1.9 - n4 * 0.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The variables satisfy $y = kx^{n}$. The graph of $\ln y$ against $\ln x$ is a straight line through $(0.5, 1.9)$ and $(2.5, 4.3)$. Find $k$, to 3 significant figures.`,
    value: k4, prefix: "k =", wrong: [1.3, 6.69],
    explanation: t`Gradient $n = \dfrac{4.3 - 1.9}{2.5 - 0.5} = 1.2$. At $(0.5, 1.9)$: $1.9 = 1.2(0.5) + \ln k$, so $\ln k = 1.3$ and $k = \mathrm{e}^{1.3} = 3.669\ldots \approx 3.67$. (1.3 is $\ln k$, not $k$; using the intercept 1.9 gives 6.69.)`,
    hints: ["Substitute one point into ln y = n ln x + ln k.", "Undo the logarithm."],
  });

  const a5 = Math.exp(0.3);
  const k5 = Math.exp(1.6);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The variables satisfy $y = ka^{x}$. The graph of $\ln y$ against $x$ is a straight line through $(0, 1.6)$ and $(4, 2.8)$. Find $a$ and $k$, each to 3 significant figures.`,
    template: "a = {{blank:a}}, k = {{blank:k}}",
    blanks: [
      { id: "a", input: "number", accepted: [a5], tolerance: 0.005, wrong: 0.3 },
      { id: "k", input: "number", accepted: [k5], tolerance: 0.005, wrong: 1.6 },
    ],
    explanation: t`Gradient $\ln a = \dfrac{2.8 - 1.6}{4} = 0.3$, so $a = \mathrm{e}^{0.3} = 1.35$. Intercept $\ln k = 1.6$, so $k = \mathrm{e}^{1.6} = 4.95$.`,
    hints: ["The gradient is ln a and the intercept is ln k."],
  });

  const n6 = (2.45 - 1.85) / (2 - 1);
  const k6 = 10 ** (1.85 - n6);
  chk(n6, 0.6, 1e-12);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The variables satisfy $y = kx^{n}$. The graph of $\lg y$ against $\lg x$ is a straight line through $(1, 1.85)$ and $(2, 2.45)$. Find $n$, and $k$ to 3 significant figures.`,
    template: "n = {{blank:n}}, k = {{blank:k}}",
    blanks: [
      { id: "n", input: "number", accepted: [n6], tolerance: 0.0005, wrong: 1.85 },
      { id: "k", input: "number", accepted: [k6], tolerance: 0.05, wrong: 3.49 },
    ],
    explanation: t`$\lg y = n\lg x + \lg k$. Gradient $n = \dfrac{2.45 - 1.85}{1} = 0.6$. Then $1.85 = 0.6 + \lg k$, so $\lg k = 1.25$ and $k = 10^{1.25} = 17.8$. (Using $\mathrm{e}^{1.25} = 3.49$ is wrong because the logarithms are base 10.)`,
    hints: ["With lg, undo using powers of 10."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: t`It is thought that $y = \dfrac{a}{x} + b$. Which graph would be a straight line with gradient $a$ and intercept $b$?`,
    options: [
      [t`$y$ against $\dfrac{1}{x}$`, t`Correct: with $X = \frac{1}{x}$, $y = aX + b$.`],
      [t`$y$ against $x$`, "y against x is a hyperbola, not a line."],
      [t`$\ln y$ against $\ln x$`, "Logs do not separate a sum of terms."],
      [t`$xy$ against $\dfrac{1}{x}$`, t`$xy = a + bx$, which is linear in $x$, not in $\frac{1}{x}$.`],
    ],
    answer: "A",
    explanation: t`Put $X = \frac{1}{x}$: $y = aX + b$, a straight line with gradient $a$ and intercept $b$. (Plotting $xy$ against $x$ would also work, with gradient $b$ and intercept $a$.)`,
    hints: ["Let X = 1/x and rewrite the equation."],
  });

  chk((49 - 7) / (25 - 4), 2);
  chk(7 - 2 * 4, -1);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`The variables satisfy $y = ax^{2} + b$. When $x = 2$, $y = 7$, and when $x = 5$, $y = 49$. By plotting $y$ against $x^{2}$, find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [2], wrong: 14 }, { id: "b", input: "number", accepted: [-1], wrong: -21 }],
    explanation: t`The points on the graph of $y$ against $x^{2}$ are $(4, 7)$ and $(25, 49)$. Gradient $a = \dfrac{49 - 7}{25 - 4} = 2$; intercept: $7 = 2(4) + b$, so $b = -1$. (Using $x$ instead of $x^{2}$ gives $a = 14$.)`,
    hints: ["The horizontal coordinates are x², not x."],
  });

  chk((11 - 5) / (3 - 1), 3);
  chk(5 - 3, 2);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`The variables satisfy $y = ax + bx^{2}$. The graph of $\dfrac{y}{x}$ against $x$ is a straight line through $(1, 5)$ and $(3, 11)$. Find $a$ and $b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [2], wrong: 3 }, { id: "b", input: "number", accepted: [3], wrong: 2 }],
    explanation: t`Dividing by $x$: $\dfrac{y}{x} = bx + a$, so the gradient is $b$ and the intercept is $a$. Gradient $b = \dfrac{11 - 5}{3 - 1} = 3$; then $5 = 3(1) + a$, so $a = 2$.`,
    hints: ["Divide the equation by x to see which constant is the gradient."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $y = 5x^{3}$, the graph of $\ln y$ against $\ln x$ is a straight line with gradient 3 and intercept $\ln 5$.`,
    answer: true,
    explanation: t`True. $\ln y = \ln 5 + 3\ln x$.`,
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $y = 2 \times 3^{x}$, the graph of $\lg y$ against $x$ is a straight line with gradient 3.`,
    answer: false,
    explanation: t`False. $\lg y = \lg 2 + x\lg 3$, so the gradient is $\lg 3 \approx 0.477$, not 3.`,
    hints: ["Take lg of both sides carefully."],
  });

  chk(Math.exp(1.2), 3.320116922736548, 1e-12);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The variables $x$ and $y$ satisfy $\ln y = 0.5\ln x + 1.2$. Express $y$ in terms of $x$.`,
    options: [
      [t`$y = 3.32\sqrt{x}$`, t`Correct: $y = \mathrm{e}^{1.2}x^{0.5}$ and $\mathrm{e}^{1.2} = 3.32$.`],
      [t`$y = 1.2\sqrt{x}$`, t`1.2 is $\ln k$; $k = \mathrm{e}^{1.2}$.`],
      [t`$y = 0.5x + 1.2$`, "The logarithms have been removed from each term separately, which is not valid."],
      [t`$y = 3.32 \times 0.5^{x}$`, "That is an exponential law; here ln x appears, so it is a power law."],
    ],
    answer: "A",
    explanation: t`$\ln y = \ln x^{0.5} + 1.2$, so $y = \mathrm{e}^{1.2} \times x^{0.5} = 3.32\sqrt{x}$ (3 s.f.).`,
    hints: ["Write 0.5 ln x as ln x^0.5, then exponentiate."],
  });

  chk(Math.exp(-0.4), 0.6703200460356393, 1e-12);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The variables satisfy $\ln y = 2 - 0.4x$. Which equation gives $y$ in terms of $x$?`,
    options: [
      [t`$y = 7.39 \times 0.670^{x}$`, t`Correct: $y = \mathrm{e}^{2}\left(\mathrm{e}^{-0.4}\right)^{x}$.`],
      [t`$y = 2 \times 0.4^{x}$`, "The constants are logarithms and must be exponentiated."],
      [t`$y = 7.39x^{-0.4}$`, "x is not logged here, so the law is exponential, not a power law."],
      [t`$y = 7.39 \times 1.49^{x}$`, t`$\mathrm{e}^{+0.4} = 1.49$; the gradient is $-0.4$, so $a = \mathrm{e}^{-0.4}$.`],
    ],
    answer: "A",
    explanation: t`$y = \mathrm{e}^{2 - 0.4x} = \mathrm{e}^{2} \times \left(\mathrm{e}^{-0.4}\right)^{x} = 7.39 \times 0.670^{x}$ (3 s.f.), a decreasing exponential.`,
    hints: ["Exponentiate both sides and split the power."],
  });

  b.match({
    d: 3, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: "Match each relationship with the graph that gives a straight line.",
    pairs: [
      [t`$y = kx^{n}$`, t`$\ln y$ against $\ln x$`],
      [t`$y = ka^{x}$`, t`$\ln y$ against $x$`],
      [t`$y = ax^{2} + b$`, t`$y$ against $x^{2}$`],
      [t`$y = ax + bx^{2}$`, t`$\frac{y}{x}$ against $x$`],
    ],
    explanation: "Choose the transformation that leaves a form Y = mX + c in which both Y and X can be calculated from the data.",
    hints: ["Rearrange each law into the form Y = mX + c."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2, calculator: false,
    stem: t`Nyasha has four pairs of values of $x$ and $y$ and suspects $y = kx^{n}$. Explain how she can use her data to check this, and how she then finds $n$ and $k$.`,
    points: ["Plot ln y against ln x (or compute them): the law holds if the points lie (close to) a straight line", "n is the gradient of the line and ln k its intercept on the ln y axis, so k = e^(intercept)"],
    modelAnswer: "She calculates ln x and ln y for each pair and plots ln y against ln x. If the points lie on (or close to) a straight line, the law fits, since ln y = n ln x + ln k. The gradient of the line of best fit is n, and its intercept is ln k, so k = e raised to the intercept.",
    explanation: "A straight line is the test; gradient and intercept give the constants.",
    hints: ["What does taking ln of y = kxⁿ give?"],
  });

  const n18 = Math.log(96 / 12) / Math.log(8 / 2);
  const k18 = 12 / 2 ** n18;
  chk(n18, 1.5, 1e-12);
  chk(k18 * 8 ** n18, 96, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A curve $y = kx^{n}$ passes through the points $(2, 12)$ and $(8, 96)$. Find $n$, and $k$ to 3 significant figures.`,
    template: "n = {{blank:n}}, k = {{blank:k}}",
    blanks: [
      { id: "n", input: "number", accepted: [n18], tolerance: 0.0005, wrong: 14 },
      { id: "k", input: "number", accepted: [k18], tolerance: 0.005, wrong: 6 },
    ],
    explanation: t`Dividing: $\dfrac{96}{12} = \left(\dfrac{8}{2}\right)^{n}$, so $4^{n} = 8$ and $n = \dfrac{\ln 8}{\ln 4} = 1.5$. Then $k = \dfrac{12}{2^{1.5}} = \dfrac{12}{2.828} = 4.24$ (exactly $3\sqrt{2}$).`,
    hints: ["Divide one equation by the other to eliminate k."],
  });

  const n16 = (2.1 - 3.6) / (2.9 - 1.4);
  const k16 = Math.exp(3.6 - n16 * 1.4);
  chk(k16, Math.exp(5), 1e-9);
  chk(n16, -1, 1e-12);
  const y16 = k16 * 5 ** n16;
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The variables $x$ and $y$ satisfy $y = kx^{n}$. The graph of $\ln y$ against $\ln x$ is a straight line passing through $(1.4, 3.6)$ and $(2.9, 2.1)$.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Find the value of n.",
        value: n16, prefix: "n =", wrong: [1],
        explanation: t`$n = \dfrac{2.1 - 3.6}{2.9 - 1.4} = \dfrac{-1.5}{1.5} = -1$.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Find the value of k, to 3 significant figures.",
        value: k16, prefix: "k =", wrong: [5, 22.2],
        explanation: t`$3.6 = -1(1.4) + \ln k$, so $\ln k = 5$ and $k = \mathrm{e}^{5} = 148.41\ldots \approx 148$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find y when x = 5, to 3 significant figures.",
        value: y16, wrong: [742],
        explanation: t`$y = \dfrac{148.41}{5} = 29.68\ldots \approx 29.7$.`,
      }),
    ],
    explanation: t`$\ln y = -\ln x + 5$, so $y = \dfrac{\mathrm{e}^{5}}{x} \approx \dfrac{148}{x}$: $y$ is inversely proportional to $x$.`,
    hints: ["Gradient = n, intercept = ln k.", "Substitute a point to find ln k."],
  });

  // N = 40 × 1.5^t data
  const N = [1, 2, 3, 4, 5].map((tt) => 40 * 1.5 ** tt);
  const Nd = [60, 90, 135, 203, 304];
  N.forEach((v, i) => chk(Nd[i], v, 0.5 + 1e-9));
  const l1 = Math.round(Math.log(60) * 1000) / 1000;
  const l5 = Math.round(Math.log(304) * 1000) / 1000;
  chk(l1, 4.094, 1e-12);
  chk(l5, 5.717, 1e-12);
  const g17 = (l5 - l1) / 4;
  const a17 = Math.exp(g17);
  const k17 = Math.exp(l1 - g17);
  b.struct({
    examStyle: true, d: 5, skill: "ANALYSIS", calculator: true,
    stem: [
      t`An inspector counts the number $N$ of trees affected by a disease in a plantation in the Eastern Highlands, $t$ weeks after it is first noticed. It is thought that $N = ka^{t}$.`,
      "",
      "| t (weeks) | 1 | 2 | 3 | 4 | 5 |",
      "| :--- | :--- | :--- | :--- | :--- | :--- |",
      "| N | 60 | 90 | 135 | 203 | 304 |",
    ].join("\n"),
    parts: [
      P.proof({
        label: "(a)", marks: 1, stem: t`Explain why plotting $\ln N$ against $t$ should give a straight line if the model is correct.`,
        points: [t`B1 $\ln N = \ln k + t\ln a$, which is of the form $Y = mX + c$ with $Y = \ln N$, $X = t$`],
        modelAnswer: t`Taking natural logarithms: $\ln N = \ln k + t\ln a$. This is linear in $t$, with gradient $\ln a$ and intercept $\ln k$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Calculate ln N for t = 1 and for t = 5, to 3 decimal places.",
        template: "t = 1: ln N = {{blank:a}}; t = 5: ln N = {{blank:b}}",
        blanks: [
          { id: "a", input: "number", accepted: [l1], tolerance: 0.0005, wrong: 1.778 },
          { id: "b", input: "number", accepted: [l5], tolerance: 0.0005, wrong: 2.483 },
        ],
        explanation: t`$\ln 60 = 4.094$ and $\ln 304 = 5.717$. (Using $\lg$ gives 1.778 and 2.483.)`,
      }),
      P.fib({
        label: "(c)", marks: 2, stem: "Using these two points, estimate a and k, each to 3 significant figures.",
        template: "a = {{blank:a}}, k = {{blank:k}}",
        blanks: [
          { id: "a", input: "number", accepted: [a17], tolerance: 0.006, wrong: 0.406 },
          { id: "k", input: "number", accepted: [k17], tolerance: 0.06, wrong: 3.69 },
        ],
        explanation: t`Gradient $\ln a = \dfrac{5.717 - 4.094}{5 - 1} = 0.40575$, so $a = \mathrm{e}^{0.40575} = 1.50$. Intercept: $\ln k = 4.094 - 0.40575 = 3.688$, so $k = \mathrm{e}^{3.688} = 40.0$.`,
      }),
    ],
    explanation: t`$\ln N$ against $t$ is (very nearly) linear, gradient about $0.406$ and intercept about $3.688$, giving $N \approx 40.0 \times 1.50^{t}$: the number affected grows by about 50% each week.`,
    hints: ["Take ln of N = kaᵗ.", "Gradient = ln a, intercept = ln k."],
  });

  b.card("FORMULA", t`Linear form of $y = kx^{n}$`, t`$\ln y = n\ln x + \ln k$: plot $\ln y$ against $\ln x$; gradient $n$, intercept $\ln k$.`);
  b.card("FORMULA", t`Linear form of $y = ka^{x}$`, t`$\ln y = x\ln a + \ln k$: plot $\ln y$ against $x$; gradient $\ln a$, intercept $\ln k$.`);
  b.card("CONCEPT", "Recovering k from the intercept", t`If the intercept is $c$ on a $\ln y$ axis, $k = \mathrm{e}^{c}$; on a $\lg y$ axis, $k = 10^{c}$.`);
  b.card("CONCEPT", "Recovering a from the gradient (exponential law)", t`$a = \mathrm{e}^{m}$ (or $10^{m}$ with $\lg$), where $m$ is the gradient.`);
  b.card("FORMULA", t`Linear form of $y = ax^{2} + b$ (ZIMSEC)`, t`Plot $y$ against $x^{2}$: gradient $a$, intercept $b$.`, undefined, { applies: ZP });
  b.card("FORMULA", t`Linear form of $y = ax + bx^{2}$ (ZIMSEC)`, t`Plot $\frac{y}{x}$ against $x$: gradient $b$, intercept $a$.`, undefined, { applies: ZP });
  b.card("CONCEPT", "How do you tell a power law from an exponential law?", t`Power law: $\ln y$ against $\ln x$ is straight. Exponential law: $\ln y$ against $x$ is straight.`);
  b.card("CONCEPT", "Finding the gradient from a drawn line", "Use two points on the line (not raw data points), far apart, then substitute one point to find the intercept.");
});
