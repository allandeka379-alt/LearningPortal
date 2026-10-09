// W2a: amath.coordinate.linear-law (Cambridge only)
import { concept, P, t, chk, sfStr, lg, ln } from "../lib.mjs";

concept("amath.coordinate.linear-law", { file: "coordinate/linear-law", keyPrefix: "coordinate.linear-law" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`It is known that $y = Ax^n$, where $A$ and $n$ are constants. Which graph is a straight line?`,
    options: [
      [t`$\lg y$ against $\lg x$`, t`Correct: $\lg y = n\lg x + \lg A$ has the form $Y = mX + c$.`],
      [t`$y$ against $\lg x$`, t`Only the right-hand side has been transformed; $y = A x^n$ is not linear in $\lg x$.`],
      [t`$\lg y$ against $x$`, t`That straightens $y = Ab^x$, where the unknown is in the index.`],
      [t`$y$ against $x$`, t`$y = Ax^n$ is a curve unless $n = 1$.`],
    ],
    answer: "A",
    explanation: t`Take logarithms: $\lg y = \lg A + n\lg x$. With $Y = \lg y$ and $X = \lg x$ this is $Y = nX + \lg A$, a straight line with gradient $n$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`The variables satisfy $y = Ab^x$. A graph of $\lg y$ against $x$ is a straight line. What does its gradient represent?`,
    options: [
      [t`$\lg b$`, t`Correct: $\lg y = (\lg b)x + \lg A$.`],
      [t`$b$`, t`The gradient is $\lg b$; you must find $b = 10^{\text{gradient}}$.`],
      [t`$\lg A$`, t`$\lg A$ is the intercept on the $\lg y$ axis.`],
      [t`$A$`, t`$A$ comes from the intercept, $A = 10^{c}$.`],
    ],
    answer: "A",
    explanation: t`$\lg y = \lg A + x\lg b$, so the gradient is $\lg b$ and the intercept is $\lg A$.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each relationship with the graph that gives a straight line.",
    pairs: [
      [t`$y = Ax^n$`, t`$\lg y$ against $\lg x$`],
      [t`$y = Ab^x$`, t`$\lg y$ against $x$`],
      [t`$y = \frac{a}{x} + b$`, t`$y$ against $\frac{1}{x}$`],
      [t`$y = ax^2 + bx$`, t`$\frac{y}{x}$ against $x$`],
    ],
    explanation: t`In each case rearrange to $Y = mX + c$ with the unknown constants only in $m$ and $c$; for $y = ax^2 + bx$, divide by $x$ to get $\frac{y}{x} = ax + b$.`,
  });

  for (const x of [2, 5]) chk(lg(3 * x ** 4), 4 * lg(x) + lg(3));
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Write $y = 3x^4$ in straight-line form by taking logarithms to base 10.`,
    template: "lg y = {{blank:m}} lg x + lg {{blank:A}}",
    blanks: [{ id: "m", input: "number", accepted: [4], wrong: "3" }, { id: "A", input: "number", accepted: [3], wrong: "4" }],
    explanation: t`$\lg y = \lg 3 + \lg x^4 = 4\lg x + \lg 3$.`,
  });

  const A5 = 10 ** 0.7;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The variables satisfy $y = Ax^n$. The graph of $\lg y$ against $\lg x$ is a straight line with gradient $1.5$ and intercept $0.7$ on the $\lg y$ axis. Find $A$, correct to 3 significant figures.`,
    value: A5, prefix: "A =", wrong: [0.7, sfStr(Math.exp(0.7))],
    explanation: t`$\lg y = n\lg x + \lg A$, so $\lg A = 0.7$ and $A = 10^{0.7} = 5.01$ (3 s.f.). ($n = 1.5$.) Using $\mathrm{e}^{0.7} = 2.01$ is wrong because the logarithms are to base 10.`,
    hints: [t`The intercept is $\lg A$, not $A$.`],
  });

  const A6 = Math.exp(0.9), b6 = Math.exp(0.35);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The variables satisfy $y = Ab^x$. The graph of $\ln y$ against $x$ is a straight line with gradient $0.35$ that meets the $\ln y$ axis at $0.9$. Find $A$ and $b$, each correct to 3 significant figures.`,
    template: "A = {{blank:A}}, b = {{blank:b}}",
    blanks: [
      { id: "A", input: "number", accepted: [Number(A6.toFixed(3))], tolerance: 0.005, wrong: "0.9" },
      { id: "b", input: "number", accepted: [Number(b6.toFixed(3))], tolerance: 0.005, wrong: "0.35" },
    ],
    explanation: t`$\ln y = (\ln b)x + \ln A$. So $\ln A = 0.9$, $A = \mathrm{e}^{0.9} = ${sfStr(A6)}$, and $\ln b = 0.35$, $b = \mathrm{e}^{0.35} = ${sfStr(b6)}$.`,
    hints: [t`Gradient $= \ln b$; intercept $= \ln A$.`],
  });

  chk((11 - 5) / (3 - 1), 3); chk(5 - 3 * 1, 2);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $y$ against $\frac{1}{x}$ is a straight line through the points $(1, 5)$ and $(3, 11)$. Express $y$ in terms of $x$ in the form $y = \frac{a}{x} + b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: "2" }, { id: "b", input: "number", accepted: [2], wrong: "3" }],
    explanation: t`With $X = \frac{1}{x}$: gradient $= \frac{11 - 5}{3 - 1} = 3$; $5 = 3(1) + c$ gives $c = 2$. So $y = \frac{3}{x} + 2$.`,
    hints: [t`The horizontal coordinate of each point is $\frac{1}{x}$, not $x$.`],
  });

  chk(-2 * 2 + 8, 4);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $y^2$ against $x^3$ is a straight line with gradient $-2$ passing through the point $(2, 4)$. Find the equation connecting $x$ and $y$ in the form $y^2 = px^3 + q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [{ id: "p", input: "number", accepted: [-2], wrong: "2" }, { id: "q", input: "number", accepted: [8], wrong: "0" }],
    explanation: t`$Y = y^2$, $X = x^3$: $Y = -2X + q$. The point has $X = 2$, $Y = 4$, so $4 = -4 + q$ and $q = 8$: $y^2 = -2x^3 + 8$.`,
    hints: [t`The point $(2, 4)$ is $(X, Y) = (x^3, y^2)$.`],
  });

  for (const x of [0.5, 3]) chk(Math.exp(ln(4 * x * x + 1)), 4 * x * x + 1);
  b.expr({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The graph of $\mathrm{e}^{y}$ against $x^2$ is a straight line with gradient 4 and intercept 1. Find $y$ in terms of $x$. Type ln for the natural logarithm, e.g. ln(2x^2+5).`,
    accepted: ["ln(4x^2+1)", "ln(1+4x^2)", "y=ln(4x^2+1)", "y=ln(1+4x^2)"],
    wrong: ["4x^2+1", "ln(4x+1)"],
    explanation: t`$\mathrm{e}^y = 4x^2 + 1$, so $y = \ln(4x^2 + 1)$.`,
    hints: [t`Write $Y = mX + c$ with $Y = \mathrm{e}^y$ and $X = x^2$, then take $\ln$.`],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`To find the constants $A$ and $n$ in $y = Ax^n$ from a straight-line graph, you should plot $\lg y$ against $x$.`,
    answer: false,
    explanation: t`False. $\lg y = n\lg x + \lg A$ is linear in $\lg x$, so plot $\lg y$ against $\lg x$. Plotting $\lg y$ against $x$ straightens $y = Ab^x$ instead.`,
  });

  chk((21 - 9) / (6 - 2), 3); chk(9 - 3 * 2, 3);
  const y11 = 3 + 3 / 4;
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The graph of $xy$ against $x$ is a straight line passing through $(2, 9)$ and $(6, 21)$. Find the value of $y$ when $x = 4$.`,
    value: y11, prefix: "y =", wrong: [15],
    explanation: t`Gradient $= \frac{21 - 9}{6 - 2} = 3$; $9 = 3(2) + c$ gives $c = 3$. So $xy = 3x + 3$ and $y = 3 + \frac{3}{x}$. When $x = 4$: $y = 3.75$. (The value 15 is $xy$, not $y$.)`,
    hints: [t`Find the equation $xy = mx + c$, then divide by $x$.`],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`It is thought that $y = ax^2 + bx$. Which graph should be drawn to find $a$ and $b$ from its gradient and intercept?`,
    options: [
      [t`$\frac{y}{x}$ against $x$`, t`Correct: $\frac{y}{x} = ax + b$, gradient $a$, intercept $b$.`],
      [t`$y$ against $x^2$`, t`$y = ax^2 + bx$ still contains $bx$, so this is not linear in $x^2$.`],
      [t`$\lg y$ against $\lg x$`, t`That works for $y = Ax^n$, a single power, not a sum of two terms.`],
      [t`$y$ against $\frac{1}{x}$`, t`That straightens $y = \frac{a}{x} + b$.`],
    ],
    answer: "A",
    explanation: t`Divide by $x$: $\frac{y}{x} = ax + b$, so $\frac{y}{x}$ against $x$ is a straight line with gradient $a$ and intercept $b$.`,
    hints: ["Divide both sides by x."],
  });

  const b13 = 10 ** -0.2;
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The variables satisfy $y = Ab^x$. The graph of $\lg y$ against $x$ is a straight line with gradient $-0.2$. Find $b$, correct to 3 significant figures.`,
    options: [
      [t`$${sfStr(b13)}$`, t`Correct: $\lg b = -0.2$, so $b = 10^{-0.2}$.`],
      [t`$-0.2$`, t`$-0.2$ is $\lg b$, not $b$.`],
      [t`$${sfStr(Math.exp(-0.2))}$`, t`This is $\mathrm{e}^{-0.2}$; the logarithms here are to base 10.`],
      [t`$${sfStr(10 ** 0.2)}$`, t`This is $10^{0.2}$: the sign of the gradient has been lost.`],
    ],
    answer: "A",
    explanation: t`$\lg y = (\lg b)x + \lg A$, so $\lg b = -0.2$ and $b = 10^{-0.2} = ${sfStr(b13)}$ (3 s.f.). A value of $b$ between 0 and 1 means $y$ decreases as $x$ increases.`,
    hints: [t`Gradient $= \lg b$.`],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Rudo has data that she believes satisfy $y = Ab^x$. Explain how she can use a straight-line graph to find $A$ and $b$.`,
    points: [
      t`Takes logarithms: $\lg y = x\lg b + \lg A$ (or with $\ln$), and plots $\lg y$ against $x$.`,
      t`Draws the line of best fit and finds its gradient $m$ and intercept $c$ (using two points on the line).`,
      t`Uses $b = 10^m$ and $A = 10^c$ (or $\mathrm{e}^m$, $\mathrm{e}^c$ with natural logarithms).`,
    ],
    modelAnswer: t`Taking logarithms gives $\lg y = (\lg b)x + \lg A$. She should calculate $\lg y$ for each value, plot $\lg y$ (vertical) against $x$, draw the line of best fit, and measure its gradient $m = \lg b$ and intercept $c = \lg A$. Then $b = 10^m$ and $A = 10^c$.`,
    explanation: "Taking logarithms turns the unknown index into a gradient.",
    hints: ["What does taking lg of both sides give?"],
  });

  {
    const n = (1.625 - 0.665) / (0.7 - 0.1);
    chk(n, 1.6, 1e-12);
    const c = 0.665 - n * 0.1;
    chk(c, 0.505, 1e-12);
    const A = 10 ** c;
    for (const X of [0.1, 0.7]) chk(lg(3.2) + 1.6 * X, X === 0.1 ? 0.665 : 1.625, 0.0005);
    const y35 = A * 3.5 ** n;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`Two quantities $x$ and $y$ are thought to satisfy $y = Ax^n$. A graph of $\lg y$ against $\lg x$ is a straight line passing through the points $(0.1, 0.665)$ and $(0.7, 1.625)$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $\lg y = n\lg x + \lg A$.`,
          points: [t`M1 takes logarithms of both sides: $\lg y = \lg (Ax^n)$.`, t`A1 uses the product and power laws to reach $\lg y = n\lg x + \lg A$.`],
          modelAnswer: t`$$
\lg y = \lg (Ax^n) = \lg A + \lg x^n = n\lg x + \lg A
$$`,
          explanation: "Product law, then power law." }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the value of $n$.`, value: n, prefix: "n =", wrong: [0.625],
          explanation: t`Gradient $= \frac{1.625 - 0.665}{0.7 - 0.1} = \frac{0.96}{0.6} = 1.6$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $A$, correct to 3 significant figures.`, value: A, prefix: "A =", wrong: [0.505],
          explanation: t`$0.665 = 1.6(0.1) + \lg A$, so $\lg A = 0.505$ and $A = 10^{0.505} = ${sfStr(A)}$ (3 s.f.).` }),
        P.num({ label: "(d)", marks: 1, stem: t`Estimate $y$ when $x = 3.5$, correct to 3 significant figures.`, value: y35, wrong: [sfStr(A * 3.5 * n)],
          explanation: t`$y = ${sfStr(A)} \times 3.5^{1.6} = ${sfStr(y35)}$ (3 s.f.).` }),
      ],
      explanation: "The gradient of the lg–lg line is the power n and the intercept is lg A.",
      hints: [t`Gradient of $\lg y$ against $\lg x$ is $n$.`, t`Intercept $= \lg A$, so $A = 10^{\text{intercept}}$.`],
    });
  }

  {
    const m = (3.0 - 1.8) / (6 - 2);
    chk(m, 0.3, 1e-12);
    const c = 1.8 - 2 * m;
    chk(c, 1.2, 1e-12);
    const B = Math.exp(m), A = Math.exp(c);
    const x50 = (ln(50) - c) / m;
    chk(A * B ** x50, 50, 1e-9);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`The number of bacteria, $y$ (in thousands), in a culture $x$ hours after it was set up is modelled by $y = Ab^x$. A graph of $\ln y$ against $x$ is a straight line passing through $(2, 1.8)$ and $(6, 3.0)$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $\ln y = x\ln b + \ln A$.`,
          points: [t`M1 takes natural logarithms: $\ln y = \ln (Ab^x)$.`, t`A1 uses the product and power laws to reach $\ln y = x\ln b + \ln A$.`],
          modelAnswer: t`$$
\ln y = \ln A + \ln b^x = x\ln b + \ln A
$$`,
          explanation: "The power law brings the index x down." }),
        P.num({ label: "(b)", marks: 2, stem: t`Find $b$, correct to 3 significant figures.`, value: B, prefix: "b =", wrong: [0.3],
          explanation: t`Gradient $\ln b = \frac{3.0 - 1.8}{6 - 2} = 0.3$, so $b = \mathrm{e}^{0.3} = ${sfStr(B)}$ (3 s.f.).` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $A$, correct to 3 significant figures.`, value: A, prefix: "A =", wrong: [1.2],
          explanation: t`$1.8 = 0.3(2) + \ln A$, so $\ln A = 1.2$ and $A = \mathrm{e}^{1.2} = ${sfStr(A)}$ (3 s.f.).` }),
        P.num({ label: "(d)", marks: 3, stem: t`Find the time, in hours, at which the model predicts 50 thousand bacteria, correct to 3 significant figures.`, value: x50, wrong: [sfStr(ln(50) / m)],
          explanation: t`$\ln 50 = 0.3x + 1.2$, so $x = \dfrac{\ln 50 - 1.2}{0.3} = \dfrac{3.912 - 1.2}{0.3} = ${sfStr(x50)}$ hours (3 s.f.).` }),
      ],
      explanation: "Gradient = ln b and intercept = ln A; then solve the straight-line equation for x.",
      hints: [t`$b = \mathrm{e}^{\text{gradient}}$.`, t`For (d), use $\ln y = 0.3x + 1.2$ with $y = 50$.`],
    });
  }

  b.card("FORMULA", t`$y = Ax^n$ in straight-line form`, t`$\lg y = n\lg x + \lg A$: plot $\lg y$ against $\lg x$; gradient $n$, intercept $\lg A$.`);
  b.card("FORMULA", t`$y = Ab^x$ in straight-line form`, t`$\lg y = (\lg b)x + \lg A$: plot $\lg y$ against $x$; gradient $\lg b$, intercept $\lg A$.`);
  b.card("FORMULA", t`$y = \frac{a}{x} + b$ in straight-line form`, t`Plot $y$ against $\frac{1}{x}$: gradient $a$, intercept $b$.`);
  b.card("FORMULA", t`$y = ax^2 + bx$ in straight-line form`, t`$\frac{y}{x} = ax + b$: plot $\frac{y}{x}$ against $x$.`);
  b.card("CONCEPT", "Choosing X and Y", "Rearrange to Y = mX + c so that the unknown constants appear only in m and c.");
  b.card("CONCEPT", "From the intercept to A", t`Intercept $c = \lg A$ gives $A = 10^c$; with $\ln$, $A = \mathrm{e}^c$.`);
  b.card("CONCEPT", "Converting a line back", t`Write $Y = mX + c$ with the given $X$ and $Y$, then make $y$ the subject (e.g. $\mathrm{e}^y = 3x^2 + 2 \Rightarrow y = \ln(3x^2 + 2)$).`);
  b.card("DEFINITION", "Plot Y against X", "Y on the vertical axis, X on the horizontal axis.");
  b.card("FACT", "Which board?", "Reducing to straight-line form is in Cambridge 0606 (topic 7.4) only, not in the ZIMSEC syllabus.");
});
