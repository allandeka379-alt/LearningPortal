// W2a: amaths.integ.reverse-powers (both boards).
import { concept, P, t, chk, checkAntideriv } from "../lib.mjs";

const { sqrt } = Math;

concept("amaths.integ.reverse-powers", { file: "integ/reverse-powers", keyPrefix: "integ.reverse-powers" }, (b) => {
  checkAntideriv((x) => x ** 6 / 6, (x) => x ** 5, 0, 2, "q1");
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find $\displaystyle\int x^{5}\,dx$.`,
    options: [
      [t`$\dfrac{x^{6}}{6} + c$`, "Correct: add one to the power and divide by the new power."],
      [t`$5x^{4} + c$`, "This is the derivative of x⁵, not its integral."],
      [t`$\dfrac{x^{6}}{5} + c$`, "Divide by the new power, 6, not the old power, 5."],
      [t`$6x^{6} + c$`, "The new power divides; it does not multiply."],
    ],
    answer: "A",
    explanation: t`$\int x^{n}\,dx = \dfrac{x^{n + 1}}{n + 1} + c$, so $\int x^{5}\,dx = \dfrac{x^{6}}{6} + c$. Check: $\frac{d}{dx}\frac{x^{6}}{6} = x^{5}$.`,
  });

  checkAntideriv((x) => x ** 4 - 3 * x * x, (x) => 4 * x ** 3 - 6 * x, -1, 2, "q2");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int (4x^{3} - 6x)\,dx$. Include the constant, for example x^3+2x+c.`,
    accepted: ["x^4-3x^2+c", "-3x^2+x^4+c", "c+x^4-3x^2", "x^4-3x^2+k", "x^4-3x^2+C"],
    wrong: ["x^4-3x^2", "12x^2-6+c"],
    explanation: t`$\int 4x^{3}\,dx = x^{4}$ and $\int 6x\,dx = 3x^{2}$, so the answer is $x^{4} - 3x^{2} + c$.`,
  });

  checkAntideriv((x) => -1 / x, (x) => 1 / (x * x), 1, 3, "q3");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int \frac{1}{x^{2}}\,dx$.`,
    options: [
      [t`$-\dfrac{1}{x} + c$`, t`Correct: $\int x^{-2}\,dx = \frac{x^{-1}}{-1} + c$.`],
      [t`$\dfrac{1}{x} + c$`, "Dividing by the new power −1 makes the result negative."],
      [t`$-\dfrac{2}{x^{3}} + c$`, t`That is the derivative of $\frac{1}{x^{2}}$.`],
      [t`$\ln(x^{2}) + c$`, t`Only $\frac{1}{x}$ integrates to a logarithm.`],
    ],
    answer: "A",
    explanation: t`$\int x^{-2}\,dx = \dfrac{x^{-1}}{-1} + c = -\dfrac{1}{x} + c$.`,
  });

  checkAntideriv((x) => (3 * x - 2) ** 6 / 18, (x) => (3 * x - 2) ** 5, 0, 2, "q4");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$\displaystyle\int (3x - 2)^{5}\,dx = \frac{(3x - 2)^{6}}{k} + c$. Find $k$.`,
    template: "k = {{blank:k}}",
    blanks: [{ id: "k", input: "number", accepted: [18], wrong: 6 }],
    explanation: t`Divide by the new power 6 and by the coefficient 3: $k = 3 \times 6 = 18$. Check: $\frac{d}{dx}\frac{(3x - 2)^{6}}{18} = \frac{6 \times 3(3x - 2)^{5}}{18} = (3x - 2)^{5}$.`,
    hints: ["Differentiate (3x − 2)⁶ to see which factor must be cancelled."],
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`A curve has gradient $\dfrac{dy}{dx} = 4x - 3$ and passes through $(1, 6)$. Its equation is $y = 2x^{2} - 3x + c$. Find $c$.`,
    value: 6 - (2 - 3), prefix: "c =", wrong: [5, 6],
    explanation: t`Substitute $(1, 6)$: $6 = 2 - 3 + c$, so $c = 7$.`,
  });

  checkAntideriv((x) => (16 / 3) * x ** 1.5, (x) => 8 * sqrt(x), 1, 4, "q6");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int 8\sqrt{x}\,dx$. Type the answer with a fractional power and the constant, for example (2/5)x^(5/2)+c.`,
    accepted: ["(16/3)x^(3/2)+c", "16/3x^(3/2)+c", "16x^(3/2)/3+c", "(16/3)x^1.5+c", "16/3x^1.5+c", "(16x^(3/2))/3+c", "(16/3)x√x+c", "(16/3)x^(3/2)+k", "(16/3)x^(3/2)+C"],
    wrong: ["12x^(3/2)+c", "4x^(-1/2)+c"],
    explanation: t`$\int 8x^{\frac{1}{2}}\,dx = \dfrac{8x^{\frac{3}{2}}}{\frac{3}{2}} + c = \dfrac{16}{3}x^{\frac{3}{2}} + c$. (12 multiplies by $\frac{3}{2}$ instead of dividing.)`,
    hints: ["Dividing by 3/2 means multiplying by 2/3."],
  });

  checkAntideriv((x) => 0.4 * x ** 2.5 + 10 * sqrt(x), (x) => (x * x + 5) / sqrt(x), 1, 4, "q7");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$\displaystyle\int \frac{x^{2} + 5}{\sqrt{x}}\,dx = ax^{\frac{5}{2}} + bx^{\frac{1}{2}} + c$. Find $a$ and $b$ (give $a$ as a decimal).`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: ["0.4", "2/5"], tolerance: 0.0005, wrong: 2.5 },
      { id: "b", input: "number", accepted: [10], wrong: 2.5 },
    ],
    explanation: t`Divide first: $x^{\frac{3}{2}} + 5x^{-\frac{1}{2}}$. Integrate: $\frac{2}{5}x^{\frac{5}{2}} + 5 \times 2x^{\frac{1}{2}} = 0.4x^{\frac{5}{2}} + 10x^{\frac{1}{2}}$.`,
    hints: ["Write each term as a power of x before integrating."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\int (2x + 3)^{2}\,dx = \frac{(2x + 3)^{3}}{3} + c$.`,
    answer: false,
    explanation: t`False. Differentiating $\frac{(2x + 3)^{3}}{3}$ gives $2(2x + 3)^{2}$, twice the integrand. The correct answer is $\frac{(2x + 3)^{3}}{6} + c$: divide by the coefficient 2 as well.`,
  });
  checkAntideriv((x) => (2 * x + 3) ** 3 / 6, (x) => (2 * x + 3) ** 2, 0, 1, "q8");

  // dy/dx = 6/(2x+1)², through (1, 2): y = −3/(2x+1) + 3; y(4) = 8/3
  const y9 = (x) => -3 / (2 * x + 1) + 3;
  checkAntideriv(y9, (x) => 6 / (2 * x + 1) ** 2, 0, 3, "q9");
  chk(y9(1), 2, 1e-12);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`A curve has $\dfrac{dy}{dx} = \dfrac{6}{(2x + 1)^{2}}$ and passes through $(1, 2)$. Find the value of $y$ when $x = 4$, correct to 3 significant figures.`,
    value: y9(4), prefix: "y =", wrong: [1.67, 2.33],
    explanation: t`$y = \dfrac{6(2x + 1)^{-1}}{2 \times (-1)} + c = -\dfrac{3}{2x + 1} + c$. At $(1, 2)$: $2 = -1 + c$, $c = 3$. At $x = 4$: $y = -\frac{3}{9} + 3 = \frac{8}{3} \approx 2.67$.`,
    hints: ["Integrate 6(2x + 1)⁻²: divide by −1 and by 2.", "Use the point to find c first."],
  });

  checkAntideriv((x) => x ** 3 / 3, (x) => x * x, 0, 2, "q10a");
  checkAntideriv((x) => -1 / (2 * x * x), (x) => x ** -3, 1, 2, "q10b");
  checkAntideriv((x) => (2 / 3) * x ** 1.5, (x) => sqrt(x), 1, 2, "q10c");
  checkAntideriv((x) => (x + 4) ** 3 / 3, (x) => (x + 4) ** 2, 0, 2, "q10d");
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each integrand with its indefinite integral (the + c is omitted).",
    pairs: [
      [t`$x^{2}$`, t`$\dfrac{x^{3}}{3}$`],
      [t`$x^{-3}$`, t`$-\dfrac{1}{2x^{2}}$`],
      [t`$\sqrt{x}$`, t`$\dfrac{2}{3}x^{\frac{3}{2}}$`],
      [t`$(x + 4)^{2}$`, t`$\dfrac{(x + 4)^{3}}{3}$`],
    ],
    explanation: t`Add one to the power and divide by the new power: $x^{-3} \to \frac{x^{-2}}{-2}$ and $x^{\frac{1}{2}} \to \frac{x^{3/2}}{3/2}$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Why does $\displaystyle\int 2x\,dx$ include an arbitrary constant $c$?`,
    options: [
      ["Because every function x² + c has derivative 2x, so the integral is not unique", "Correct: constants vanish on differentiation, so integration cannot recover them."],
      ["Because the area under y = 2x always includes an extra constant region", "An indefinite integral is a family of functions, not an area."],
      ["Because 2x is not defined at x = 0", "2x is defined everywhere; the constant has nothing to do with this."],
      ["Because integration rounds the answer, and c is the rounding error", "Integration is exact; c represents every possible constant."],
    ],
    answer: "A",
    explanation: t`$\frac{d}{dx}(x^{2} + c) = 2x$ for every constant $c$, so $\int 2x\,dx = x^{2} + c$ describes the whole family of curves.`,
  });

  const F12 = (x) => (x * x + 1) ** 1.5 / 3;
  checkAntideriv(F12, (x) => x * sqrt(x * x + 1), 0, 2, "q12");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`Show that $\dfrac{d}{dx}\left[(x^{2} + 1)^{\frac{3}{2}}\right] = 3x\sqrt{x^{2} + 1}$. Hence find $\displaystyle\int x\sqrt{x^{2} + 1}\,dx$.`,
    points: [
      t`M1 uses the chain rule: $\frac{3}{2}(x^{2} + 1)^{\frac{1}{2}} \times 2x$`,
      t`A1 simplifies to $3x\sqrt{x^{2} + 1}$`,
      t`A1 deduces $\int x\sqrt{x^{2} + 1}\,dx = \frac{1}{3}(x^{2} + 1)^{\frac{3}{2}} + c$`,
    ],
    modelAnswer: ["$$", t`\frac{d}{dx}(x^{2} + 1)^{\frac{3}{2}} = \frac{3}{2}(x^{2} + 1)^{\frac{1}{2}} \cdot 2x = 3x\sqrt{x^{2} + 1}`, "$$", "", "$$", t`\int x\sqrt{x^{2} + 1}\,dx = \frac{1}{3}(x^{2} + 1)^{\frac{3}{2}} + c`, "$$"].join("\n"),
    explanation: "Integration reverses differentiation, so a derivative you have just found gives an integral; divide by the constant factor 3.",
    hints: ["Differentiate with the chain rule.", "The integrand is one third of the derivative."],
  });

  // d²y/dx² = 6x; gradient 2 at origin... y = x³ + 2x + 1; y(2) = 13
  const y13 = (x) => x ** 3 + 2 * x + 1;
  chk(y13(2), 13);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A curve has $\dfrac{d^{2}y}{dx^{2}} = 6x$. At the point $(0, 1)$ the gradient of the curve is 2. Find the value of $y$ when $x = 2$.`,
    value: y13(2), prefix: "y =", wrong: [11, 9],
    explanation: t`$\dfrac{dy}{dx} = 3x^{2} + c_{1}$; at $x = 0$ the gradient is 2, so $c_{1} = 2$. Then $y = x^{3} + 2x + c_{2}$; at $(0, 1)$, $c_{2} = 1$. At $x = 2$: $8 + 4 + 1 = 13$. (9 forgets the $2x$ term; 11 forgets $c_{2}$.)`,
    hints: ["Integrate twice; each integration gives a constant.", "Use the gradient for the first constant and the point for the second."],
  });

  checkAntideriv((x) => (1 - 2 * x) ** -2, (x) => 4 / (1 - 2 * x) ** 3, 1, 3, "q14");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int \frac{4}{(1 - 2x)^{3}}\,dx$.`,
    options: [
      [t`$\dfrac{1}{(1 - 2x)^{2}} + c$`, t`Correct: $\frac{4(1 - 2x)^{-2}}{(-2)(-2)} = (1 - 2x)^{-2}$.`],
      [t`$-\dfrac{1}{(1 - 2x)^{2}} + c$`, "The two negative factors, −2 from the power and −2 from the bracket, multiply to +4."],
      [t`$-\dfrac{2}{(1 - 2x)^{2}} + c$`, "The division by −2 from the bracket has been forgotten."],
      [t`$\dfrac{1}{(1 - 2x)^{4}} + c$`, "The power must increase by one, from −3 to −2."],
    ],
    answer: "A",
    explanation: t`$\int 4(1 - 2x)^{-3}\,dx = \dfrac{4(1 - 2x)^{-2}}{(-2) \times (-2)} + c = (1 - 2x)^{-2} + c$. Check by differentiating: $-2(1 - 2x)^{-3} \times (-2) = 4(1 - 2x)^{-3}$.`,
    hints: ["Divide by the new power and by the coefficient of x, both negative."],
  });

  // dy/dx = k√x − 2, through (0, 1) and (4, 9): k = 3
  const k15 = (9 - 1 + 8) / ((2 / 3) * 8);
  chk(k15, 3, 1e-12);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A curve has gradient $\dfrac{dy}{dx} = k\sqrt{x} - 2$, where $k$ is a constant. The curve passes through $(0, 1)$ and $(4, 9)$. Find $k$.`,
    value: k15, prefix: "k =", wrong: [2, 4.5],
    explanation: t`$y = \frac{2k}{3}x^{\frac{3}{2}} - 2x + c$. $(0, 1)$ gives $c = 1$. $(4, 9)$: $\frac{2k}{3} \times 8 - 8 + 1 = 9$, so $\frac{16k}{3} = 16$ and $k = 3$.`,
    workedSolution: [
      t`1. Integrate: $y = \dfrac{2k}{3}x^{\frac{3}{2}} - 2x + c$.`,
      t`2. At $(0, 1)$: $c = 1$.`,
      t`3. At $(4, 9)$: $4^{\frac{3}{2}} = 8$, so $\dfrac{16k}{3} - 8 + 1 = 9$.`,
      t`4. $\dfrac{16k}{3} = 16$, so $k = 3$.`,
    ].join("\n"),
    hints: ["Two points give two equations: one for c, one for k.", "4^(3/2) = 8."],
  });

  // struct 5: dy/dx = 3x² − 12, through (0, 5)
  const y16 = (x) => x ** 3 - 12 * x + 5;
  chk(y16(2), -11);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A curve has gradient function $\dfrac{dy}{dx} = 3x^{2} - 12$ and passes through the point $(0, 5)$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: "Find the equation of the curve. Type it as y = …",
        accepted: ["y=x^3-12x+5", "y=5-12x+x^3", "y=x^3+5-12x"], wrong: ["y=x^3-12x"],
        explanation: t`$y = x^{3} - 12x + c$ and $(0, 5)$ gives $c = 5$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the coordinates of the minimum point of the curve.", template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: -2 }, { id: "y", input: "number", accepted: [-11], wrong: 21 }],
        explanation: t`$3x^{2} - 12 = 0$ at $x = \pm 2$; $\frac{d^{2}y}{dx^{2}} = 6x > 0$ at $x = 2$. $y = 8 - 24 + 5 = -11$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the gradient of the normal to the curve at the point where x = 1, correct to 3 significant figures.", value: 1 / 9, wrong: [-9],
        explanation: t`The tangent gradient at $x = 1$ is $3 - 12 = -9$, so the normal gradient is $\frac{1}{9} \approx 0.111$.` }),
    ],
    explanation: "Integrate the gradient, use the point for c, and then use the gradient function directly for stationary points and normals.",
    hints: ["Do not forget the constant of integration.", "The gradient function is given: use it for (b) and (c)."],
  });

  // struct 4: dy/dx = √(2x + 5), through (2, 10): y = (2x+5)^{3/2}/3 + 1
  const y17 = (x) => (2 * x + 5) ** 1.5 / 3 + 1;
  checkAntideriv(y17, (x) => sqrt(2 * x + 5), 0, 3, "q17");
  chk(y17(2), 10, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A curve has $\dfrac{dy}{dx} = \sqrt{2x + 5}$ and passes through the point $(2, 10)$.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: "Find the equation of the curve. Type it as y = (1/3)(2x+5)^(3/2)+k with your value of k, or equivalent.",
        accepted: ["y=(1/3)(2x+5)^(3/2)+1", "y=1/3(2x+5)^(3/2)+1", "y=(2x+5)^(3/2)/3+1", "y=(1/3)(2x+5)^1.5+1", "y=(2x+5)^1.5/3+1", "y=1+(1/3)(2x+5)^(3/2)"], wrong: ["y=(2/3)(2x+5)^(3/2)-8"],
        explanation: t`$y = \dfrac{(2x + 5)^{\frac{3}{2}}}{2 \times \frac{3}{2}} + c = \frac{1}{3}(2x + 5)^{\frac{3}{2}} + c$. At $(2, 10)$: $\frac{1}{3} \times 27 + c = 10$, so $c = 1$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the y-coordinate of the point where the curve crosses the y-axis, correct to 3 significant figures.", prefix: "y =", value: y17(0), wrong: [3.24],
        explanation: t`$y = \frac{1}{3} \times 5^{\frac{3}{2}} + 1 = \frac{5\sqrt{5}}{3} + 1 \approx 4.73$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the value of x at which the gradient of the curve is 5.", prefix: "x =", value: 10, wrong: [0],
        explanation: t`$\sqrt{2x + 5} = 5$ gives $2x + 5 = 25$, $x = 10$.` }),
    ],
    explanation: "Integrate a power of a linear bracket by dividing by both the new power and the coefficient of x.",
    hints: ["(2x + 5)^(1/2) integrates to (2x + 5)^(3/2) ÷ (2 × 3/2).", "9^(3/2) = 27."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, calculator: false,
    stem: t`Chipo tries to find $\displaystyle\int \frac{1}{x}\,dx$ with the rule $\int x^{n}\,dx = \frac{x^{n + 1}}{n + 1} + c$. Explain why this fails and state the correct integral.`,
    points: [t`With $n = -1$ the rule gives $\frac{x^{0}}{0}$, division by zero, so it does not apply`, t`States $\int \frac{1}{x}\,dx = \ln|x| + c$`],
    modelAnswer: t`For n = −1 the formula would divide by n + 1 = 0, which is impossible, so the power rule excludes n = −1. Instead ∫ 1/x dx = ln|x| + c, because the derivative of ln x is 1/x.`,
    explanation: t`The power rule covers every rational $n$ except $-1$; that gap is filled by the natural logarithm.`,
    hints: ["What is n + 1 when n = −1?"],
  });

  b.card("FORMULA", "Integral of xⁿ", t`$\displaystyle\int x^{n}\,dx = \frac{x^{n + 1}}{n + 1} + c$, $n \neq -1$`);
  b.card("FORMULA", "Integral of (ax + b)ⁿ", t`$\displaystyle\int (ax + b)^{n}\,dx = \frac{(ax + b)^{n + 1}}{a(n + 1)} + c$, $n \neq -1$`);
  b.card("DEFINITION", "Constant of integration", t`The arbitrary constant $c$ in an indefinite integral: every $F(x) + c$ has the same derivative.`);
  b.card("CONCEPT", "Finding a curve from its gradient", "Integrate dy/dx, then substitute the given point to find c.");
  b.card("CONCEPT", "Before integrating", t`Rewrite roots and fractions as powers; expand products; divide out single-term denominators.`);
  b.card("FACT", "Checking an integral", "Differentiate the answer: it must give the integrand exactly.");
  b.card("FACT", t`Integral of $\frac{1}{x}$`, t`$\ln|x| + c$: the power rule does not apply when $n = -1$.`);
  b.card("CONCEPT", "Second derivative given", "Integrate twice; two constants need two conditions (for example a gradient and a point).");
});
