// W2a: amaths.diff.powers-chain (power rule for rational n, chain rule, second derivatives; both boards).
import { concept, P, t, chk, checkDeriv, root } from "../lib.mjs";

const XS = [0.7, 1.6, 2.9];

concept("amaths.diff.powers-chain", { file: "diff/powers-chain", keyPrefix: "diff.powers-chain" }, (b) => {
  checkDeriv((x) => x ** -3, (x) => -3 * x ** -4, XS, "q1");
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is $\dfrac{d}{dx}\left(x^{-3}\right)$?`,
    options: [
      [t`$-3x^{-4}$`, "Correct: multiply by the power, then subtract 1 from it: −3 − 1 = −4."],
      [t`$-3x^{-2}$`, "The power has been increased by 1 instead of decreased: −3 − 1 is −4, not −2."],
      [t`$3x^{-4}$`, "The new coefficient is the old power, −3, so the sign is negative."],
      [t`$-\tfrac{1}{4}x^{-4}$`, "This mixes up differentiation with integration; the power is the multiplier, not the divisor."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}(x^{n}) = nx^{n - 1}$ with $n = -3$: $-3x^{-4} = -\dfrac{3}{x^{4}}$.`,
  });

  checkDeriv((x) => 2 * x ** 3 - 5 * x + 1, (x) => 6 * x * x - 5, XS, "q2");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the gradient of the curve $y = 2x^{3} - 5x + 1$ at the point where $x = 2$.`,
    value: 6 * 4 - 5, wrong: [24, 7],
    explanation: t`$\dfrac{dy}{dx} = 6x^{2} - 5$. At $x = 2$: $24 - 5 = 19$. (7 is the $y$-coordinate, not the gradient.)`,
  });

  checkDeriv((x) => 6 * x ** (2 / 3), (x) => 4 * x ** (-1 / 3), XS, "q3");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $y = 6x^{\frac{2}{3}}$ with respect to $x$. Type your answer as a power of x, for example 5x^(1/2).`,
    accepted: ["4x^(-1/3)", "4x^-1/3", "4/x^(1/3)", "4/∛x", "4x^(-1÷3)", "4/(x^(1/3))"],
    wrong: ["4x^(1/3)"],
    explanation: t`$6 \times \frac{2}{3}x^{\frac{2}{3} - 1} = 4x^{-\frac{1}{3}}$. The power drops from $\frac{2}{3}$ to $-\frac{1}{3}$.`,
  });

  checkDeriv((x) => 1 / (2 * Math.sqrt(x)), (x) => -1 / (4 * x ** 1.5), XS, "q4");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $y = \dfrac{1}{2\sqrt{x}}$ with respect to $x$.`,
    options: [
      [t`$-\dfrac{1}{4}x^{-\frac{3}{2}}$`, t`Correct: $y = \frac{1}{2}x^{-\frac{1}{2}}$, so $\frac{dy}{dx} = \frac{1}{2} \times (-\frac{1}{2})x^{-\frac{3}{2}}$.`],
      [t`$\dfrac{1}{4}x^{-\frac{1}{2}}$`, t`This treats $\frac{1}{2\sqrt{x}}$ as $\frac{1}{2}x^{\frac{1}{2}}$; the root is in the denominator, so the power is negative.`],
      [t`$-\dfrac{1}{4}x^{-\frac{1}{2}}$`, "The coefficient is right but the power should drop by 1, from −1/2 to −3/2."],
      [t`$-x^{-\frac{3}{2}}$`, t`The coefficient $\frac{1}{2}$ in front has been lost: $\frac{1}{2} \times (-\frac{1}{2}) = -\frac{1}{4}$.`],
    ],
    answer: "A",
    explanation: t`Rewrite: $y = \frac{1}{2}x^{-\frac{1}{2}}$. Then $\dfrac{dy}{dx} = -\dfrac{1}{4}x^{-\frac{3}{2}} = -\dfrac{1}{4x\sqrt{x}}$.`,
  });

  checkDeriv((x) => (x * x + 3) / Math.sqrt(x), (x) => 1.5 * x ** 0.5 - 1.5 * x ** -1.5, XS, "q5");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = \dfrac{x^{2} + 3}{\sqrt{x}}$, the derivative can be written as $\dfrac{dy}{dx} = ax^{\frac{1}{2}} + bx^{-\frac{3}{2}}$. Find $a$ and $b$ as decimals.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [1.5], wrong: 2 },
      { id: "b", input: "number", accepted: [-1.5], wrong: 1.5 },
    ],
    explanation: t`Divide first: $y = x^{\frac{3}{2}} + 3x^{-\frac{1}{2}}$. Then $\dfrac{dy}{dx} = \frac{3}{2}x^{\frac{1}{2}} - \frac{3}{2}x^{-\frac{3}{2}}$, so $a = 1.5$ and $b = -1.5$.`,
    hints: [t`Write each term as a power of $x$: $\frac{x^{2}}{x^{1/2}} = x^{3/2}$.`, "Then use the power rule on each term."],
  });

  const g6 = (x) => x / Math.sqrt(x * x + 9);
  checkDeriv((x) => Math.sqrt(x * x + 9), g6, XS, "q6");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the gradient of $y = \sqrt{x^{2} + 9}$ at the point where $x = 4$. Give your answer as an exact decimal.`,
    value: chk(g6(4), 0.8), wrong: [0.1, 4],
    explanation: t`$\dfrac{dy}{dx} = \frac{1}{2}(x^{2} + 9)^{-\frac{1}{2}} \times 2x = \dfrac{x}{\sqrt{x^{2} + 9}}$. At $x = 4$: $\dfrac{4}{\sqrt{25}} = 0.8$.`,
    hints: ["Use the chain rule with u = x² + 9.", "Remember to multiply by du/dx = 2x."],
  });

  checkDeriv((x) => (5 - 2 * x) ** 6, (x) => -12 * (5 - 2 * x) ** 5, XS, "q7");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $(5 - 2x)^{6}$ with respect to $x$. Type your answer in the form k(5-2x)^n.`,
    accepted: ["-12(5-2x)^5", "12(2x-5)^5", "-12(-2x+5)^5", "(-12)(5-2x)^5"],
    wrong: ["6(5-2x)^5", "12(5-2x)^5"],
    explanation: t`$6(5 - 2x)^{5} \times (-2) = -12(5 - 2x)^{5}$. The derivative of the bracket, $-2$, supplies the minus sign.`,
    hints: ["What is the derivative of the inner function 5 − 2x?"],
  });

  checkDeriv((x) => (3 * x * x + 1) ** -2, (x) => -12 * x * (3 * x * x + 1) ** -3, XS, "q8");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $y = \dfrac{1}{(3x^{2} + 1)^{2}}$ with respect to $x$.`,
    options: [
      [t`$-\dfrac{12x}{(3x^{2} + 1)^{3}}$`, t`Correct: $-2(3x^{2} + 1)^{-3} \times 6x$.`],
      [t`$-\dfrac{2}{(3x^{2} + 1)^{3}}$`, "The inner derivative 6x has been left out of the chain rule."],
      [t`$-\dfrac{12x}{(3x^{2} + 1)}$`, "The power of the bracket should become −3; it has been reduced too far."],
      [t`$\dfrac{1}{2(3x^{2} + 1) \times 6x}$`, "This differentiates the denominator and takes a reciprocal, which is not a rule of differentiation."],
    ],
    answer: "A",
    explanation: t`$y = (3x^{2} + 1)^{-2}$, so $\dfrac{dy}{dx} = -2(3x^{2} + 1)^{-3} \times 6x = -\dfrac{12x}{(3x^{2} + 1)^{3}}$.`,
    hints: ["Rewrite y as a negative power of the bracket."],
  });

  const f9p = (x) => -48 * (2 * x - 1) ** -4;
  checkDeriv((x) => 8 / (2 * x - 1) ** 3, f9p, [1.2, 2, 3], "q9");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = \dfrac{8}{(2x - 1)^{3}}$, find $f'(1.5)$.`,
    value: chk(f9p(1.5), -3), wrong: [-1.5, 3],
    explanation: t`$f(x) = 8(2x - 1)^{-3}$, so $f'(x) = -24(2x - 1)^{-4} \times 2 = -\dfrac{48}{(2x - 1)^{4}}$. At $x = 1.5$: $2x - 1 = 2$, so $f'(1.5) = -\dfrac{48}{16} = -3$. (−1.5 forgets the factor 2 from the chain rule.)`,
    hints: ["Write f(x) = 8(2x − 1)⁻³.", "Multiply by the derivative of 2x − 1."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\dfrac{d}{dx}(2x + 1)^{3} = 3(2x + 1)^{2}$.`,
    answer: false,
    explanation: t`False. The chain rule multiplies by the derivative of $2x + 1$, which is 2: $\dfrac{d}{dx}(2x + 1)^{3} = 6(2x + 1)^{2}$.`,
  });
  checkDeriv((x) => (2 * x + 1) ** 3, (x) => 6 * (2 * x + 1) ** 2, XS, "q10");

  checkDeriv((x) => Math.sqrt(x), (x) => 0.5 / Math.sqrt(x), XS, "q11a");
  checkDeriv((x) => 1 / x, (x) => -1 / x ** 2, XS, "q11b");
  checkDeriv((x) => Math.sqrt(4 * x + 1), (x) => 2 / Math.sqrt(4 * x + 1), XS, "q11c");
  checkDeriv((x) => 1 / (4 * x + 1), (x) => -4 / (4 * x + 1) ** 2, XS, "q11d");
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its derivative.",
    pairs: [
      [t`$\sqrt{x}$`, t`$\dfrac{1}{2\sqrt{x}}$`],
      [t`$\dfrac{1}{x}$`, t`$-\dfrac{1}{x^{2}}$`],
      [t`$\sqrt{4x + 1}$`, t`$\dfrac{2}{\sqrt{4x + 1}}$`],
      [t`$\dfrac{1}{4x + 1}$`, t`$-\dfrac{4}{(4x + 1)^{2}}$`],
    ],
    explanation: t`The two bracketed functions use the chain rule: the inner derivative 4 multiplies $\frac{1}{2}(4x + 1)^{-\frac{1}{2}}$ to give $\frac{2}{\sqrt{4x + 1}}$, and multiplies $-(4x + 1)^{-2}$ to give $-\frac{4}{(4x + 1)^{2}}$.`,
  });

  const y12 = (x) => 6 * x - 8 / x ** 3;
  checkDeriv((x) => x ** 3 - 4 / x, (x) => 3 * x * x + 4 / x ** 2, XS, "q12 y'");
  checkDeriv((x) => 3 * x * x + 4 / x ** 2, y12, XS, "q12 y''");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given $y = x^{3} - \dfrac{4}{x}$, find the value of $\dfrac{d^{2}y}{dx^{2}}$ when $x = 2$.`,
    value: chk(y12(2), 11), wrong: [13, 14],
    explanation: t`$y = x^{3} - 4x^{-1}$, so $\dfrac{dy}{dx} = 3x^{2} + 4x^{-2}$ and $\dfrac{d^{2}y}{dx^{2}} = 6x - 8x^{-3}$. At $x = 2$: $12 - 1 = 11$. (13 is $\frac{dy}{dx}$ at $x = 2$; 14 comes from $6x + 8x^{-3}$, a sign slip.)`,
  });

  checkDeriv((x) => (x ** 3 - 2) ** 4, (x) => 12 * x * x * (x ** 3 - 2) ** 3, XS, "q13");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = (x^{3} - 2)^{4}$, write $\dfrac{dy}{dx}$ in the form $ax^{p}(x^{3} - 2)^{q}$.`,
    template: "a = {{blank:a}}, p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "a", input: "number", accepted: [12], wrong: 4 },
      { id: "p", input: "number", accepted: [2], wrong: 3 },
      { id: "q", input: "number", accepted: [3], wrong: 4 },
    ],
    explanation: t`$4(x^{3} - 2)^{3} \times 3x^{2} = 12x^{2}(x^{3} - 2)^{3}$.`,
    hints: ["Outer: 4(…)³. Inner derivative: 3x²."],
  });

  // gradient of √(4x + 1) + 2x equal to 3: 2/√(4x+1) = 1 -> x = 0.75
  const gp14 = (x) => 2 / Math.sqrt(4 * x + 1) + 2;
  checkDeriv((x) => Math.sqrt(4 * x + 1) + 2 * x, gp14, XS, "q14");
  const x14 = root((x) => gp14(x) - 3, 0, 5);
  chk(x14, 0.75, 1e-9, "q14 root");
  b.calc({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The curve $y = \sqrt{4x + 1} + 2x$ is defined for $x \geq -\tfrac{1}{4}$. Find the $x$-coordinate of the point where the gradient of the curve is 3.`,
    value: 0.75, prefix: "x =", wrong: [2, 0],
    explanation: t`$\dfrac{dy}{dx} = \dfrac{2}{\sqrt{4x + 1}} + 2$. Setting it equal to 3: $\dfrac{2}{\sqrt{4x + 1}} = 1$, so $\sqrt{4x + 1} = 2$, $4x + 1 = 4$ and $x = 0.75$.`,
    workedSolution: [
      t`1. $\dfrac{d}{dx}\sqrt{4x + 1} = \frac{1}{2}(4x + 1)^{-\frac{1}{2}} \times 4 = \dfrac{2}{\sqrt{4x + 1}}$.`,
      t`2. $\dfrac{dy}{dx} = \dfrac{2}{\sqrt{4x + 1}} + 2 = 3$ gives $\sqrt{4x + 1} = 2$.`,
      t`3. Square: $4x + 1 = 4$, so $x = \frac{3}{4} = 0.75$.`,
    ].join("\n"),
    hints: ["Differentiate √(4x + 1) with the chain rule.", "Solve dy/dx = 3 for √(4x + 1) first."],
  });

  checkDeriv((x) => (1 - x * x) ** 5, (x) => -10 * x * (1 - x * x) ** 4, XS, "q15");
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Given $y = u^{5}$ where $u = 1 - x^{2}$, what is $\dfrac{dy}{dx}$ in terms of $x$?`,
    options: [
      [t`$-10x(1 - x^{2})^{4}$`, t`Correct: $\frac{dy}{du} = 5u^{4}$ and $\frac{du}{dx} = -2x$.`],
      [t`$5(1 - x^{2})^{4}$`, t`This is $\frac{dy}{du}$ only; it must be multiplied by $\frac{du}{dx} = -2x$.`],
      [t`$10x(1 - x^{2})^{4}$`, t`The sign is wrong: the derivative of $1 - x^{2}$ is $-2x$.`],
      [t`$-10x(1 - x^{2})^{5}$`, "The power of the bracket must drop by one, from 5 to 4."],
    ],
    answer: "A",
    explanation: t`$\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx} = 5(1 - x^{2})^{4} \times (-2x) = -10x(1 - x^{2})^{4}$.`,
    hints: ["Find dy/du and du/dx separately, then multiply."],
  });

  checkDeriv((x) => Math.sqrt(2 * x + 3), (x) => 1 / Math.sqrt(2 * x + 3), XS, "q16");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 2, calculator: false,
    stem: t`Given that $y = \sqrt{2x + 3}$, show that $y\dfrac{dy}{dx} = 1$.`,
    points: [t`M1 uses the chain rule: $\dfrac{dy}{dx} = \frac{1}{2}(2x + 3)^{-\frac{1}{2}} \times 2 = (2x + 3)^{-\frac{1}{2}}$`, t`A1 multiplies by $y = (2x + 3)^{\frac{1}{2}}$ to obtain 1`],
    modelAnswer: ["$$", t`\frac{dy}{dx} = \frac{1}{2}(2x + 3)^{-\frac{1}{2}} \times 2 = \frac{1}{\sqrt{2x + 3}}`, "$$", "", "$$", t`y\frac{dy}{dx} = \sqrt{2x + 3} \times \frac{1}{\sqrt{2x + 3}} = 1`, "$$"].join("\n"),
    explanation: t`The 2 from the inner derivative cancels the $\frac{1}{2}$ from the power, and the product of $\sqrt{2x + 3}$ and its reciprocal is 1.`,
    hints: ["Find dy/dx by the chain rule first."],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`To differentiate $y = \dfrac{x^{2} - 4}{x}$ you may first write $y = x - 4x^{-1}$, which gives $\dfrac{dy}{dx} = 1 + \dfrac{4}{x^{2}}$.`,
    answer: true,
    explanation: t`True. Dividing each term by $x$ gives $x - 4x^{-1}$; differentiating gives $1 + 4x^{-2}$. Dividing out first avoids the quotient rule.`,
    hints: ["Differentiate −4x⁻¹ carefully: two minus signs."],
  });
  checkDeriv((x) => (x * x - 4) / x, (x) => 1 + 4 / (x * x), XS, "q17");

  // struct 4: f(x) = (3x − 2)^(4/3); at x = 10/3, 3x − 2 = 8
  const f1 = (x) => 4 * (3 * x - 2) ** (1 / 3);
  const f2 = (x) => 4 * (3 * x - 2) ** (-2 / 3);
  checkDeriv((x) => (3 * x - 2) ** (4 / 3), f1, [1, 2, 3], "q18 f'");
  checkDeriv(f1, f2, [1, 2, 3], "q18 f''");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = (3x - 2)^{\frac{4}{3}}$ for $x > \tfrac{2}{3}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: t`Find $f'(x)$ in the form $a(3x - 2)^{n}$.`, template: "a = {{blank:a}}, n = {{blank:n}} (as a fraction or decimal)",
        blanks: [
          { id: "a", input: "number", accepted: [4], wrong: 1 },
          { id: "n", input: "number", accepted: ["1/3", "0.333", "0.3333"], tolerance: 0.0005, wrong: 1 },
        ],
        explanation: t`$f'(x) = \frac{4}{3}(3x - 2)^{\frac{1}{3}} \times 3 = 4(3x - 2)^{\frac{1}{3}}$.` }),
      P.num({ label: "(b)", marks: 1, stem: t`Find $f'\left(\tfrac{10}{3}\right)$.`, value: chk(f1(10 / 3), 8, 1e-9), wrong: [2],
        explanation: t`$3x - 2 = 8$ and $\sqrt[3]{8} = 2$, so $f'\left(\tfrac{10}{3}\right) = 4 \times 2 = 8$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Find $f''\left(\tfrac{10}{3}\right)$.`, value: chk(f2(10 / 3), 1, 1e-9), wrong: [4],
        explanation: t`$f''(x) = 4 \times \frac{1}{3}(3x - 2)^{-\frac{2}{3}} \times 3 = 4(3x - 2)^{-\frac{2}{3}}$. At $3x - 2 = 8$: $8^{-\frac{2}{3}} = \frac{1}{4}$, so $f'' = 1$.` }),
    ],
    explanation: "Each differentiation brings down the power and multiplies by 3, the derivative of 3x − 2.",
    hints: ["The inner derivative is 3 each time.", "8^(1/3) = 2 and 8^(−2/3) = 1/4."],
  });

  // struct 5: y = k/√(2x + 5); gradient −1/9 at x = 2 -> k = 3; y'' at 2
  const k = 3;
  const yp = (x) => -k * (2 * x + 5) ** -1.5;
  const ypp = (x) => 3 * k * (2 * x + 5) ** -2.5;
  checkDeriv((x) => k / Math.sqrt(2 * x + 5), yp, XS, "q19 y'");
  checkDeriv(yp, ypp, XS, "q19 y''");
  chk(yp(2), -1 / 9, 1e-12, "q19 gradient");
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A curve has equation $y = \dfrac{k}{\sqrt{2x + 5}}$, where $k$ is a constant. The gradient of the curve at the point where $x = 2$ is $-\dfrac{1}{9}$.`,
    parts: [
      P.expr({ label: "(a)", marks: 1, stem: t`Find $\dfrac{dy}{dx}$ in terms of $k$ and $x$. Type it in the form -k(2x+5)^(n).`,
        accepted: ["-k(2x+5)^(-3/2)", "-k(2x+5)^-3/2", "-k/(2x+5)^(3/2)", "-k(2x+5)^(-1.5)", "-k/(2x+5)^1.5", "-k/(2x+5)^(1.5)"], wrong: ["-k/2(2x+5)^(-3/2)"],
        explanation: t`$y = k(2x + 5)^{-\frac{1}{2}}$, so $\dfrac{dy}{dx} = -\frac{1}{2}k(2x + 5)^{-\frac{3}{2}} \times 2 = -k(2x + 5)^{-\frac{3}{2}}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the value of k.", prefix: "k =", value: k, wrong: [-3, 1],
        explanation: t`At $x = 2$: $2x + 5 = 9$ and $9^{\frac{3}{2}} = 27$, so $-\dfrac{k}{27} = -\dfrac{1}{9}$, giving $k = 3$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the value of $\dfrac{d^{2}y}{dx^{2}}$ at the point where $x = 2$, correct to 3 significant figures.`, value: ypp(2), wrong: [0.012345679],
        explanation: t`$\dfrac{d^{2}y}{dx^{2}} = \frac{3}{2}k(2x + 5)^{-\frac{5}{2}} \times 2 = 3k(2x + 5)^{-\frac{5}{2}} = \dfrac{9}{243} = \dfrac{1}{27} \approx 0.0370$. (0.0123 forgets the factor 2 from the inner derivative.)` }),
    ],
    explanation: t`Find the derivative with $k$ left as a letter, use the given gradient to find $k$, then differentiate again.`,
    hints: [t`$9^{\frac{3}{2}} = 27$ and $9^{\frac{5}{2}} = 243$.`, "The inner derivative 2 multiplies at each stage."],
  });

  b.card("FORMULA", "Power rule", t`$\dfrac{d}{dx}\left(x^{n}\right) = nx^{n - 1}$ for any rational $n$`, "Rewrite roots and fractions as powers first.");
  b.card("FORMULA", "Chain rule", t`$\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$`, "Not printed in MF19.");
  b.card("FORMULA", "Derivative of (ax + b)ⁿ", t`$\dfrac{d}{dx}(ax + b)^{n} = an(ax + b)^{n - 1}$`);
  b.card("CONCEPT", "Chain rule in words", "Differentiate the outer function leaving the inside alone, then multiply by the derivative of the inside.");
  b.card("FACT", t`Derivative of $\sqrt{x}$`, t`$\dfrac{1}{2\sqrt{x}}$, from $\frac{1}{2}x^{-\frac{1}{2}}$.`);
  b.card("FACT", t`Derivative of $\dfrac{1}{x^{2}}$`, t`$-\dfrac{2}{x^{3}}$, from $-2x^{-3}$.`);
  b.card("CONCEPT", "Fraction with a single-term denominator", t`Divide each term by the denominator first: $\dfrac{x^{2} + 3}{x} = x + 3x^{-1}$, then use the power rule.`);
  b.card("DEFINITION", "Second derivative", t`$\dfrac{d^{2}y}{dx^{2}}$: differentiate the (simplified) first derivative again.`);
});
