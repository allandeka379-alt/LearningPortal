// W2a: amaths.diff.exp-log-trig (eˣ, ln x, sin, cos, tan with composites; Cambridge P3-only tan⁻¹x -> applies CAM).
import { concept, P, t, chk, checkDeriv, solveTrig, same, CAM } from "../lib.mjs";

const XS = [0.4, 1.1, 2.3];
const { exp, log, sin, cos, tan, atan, sqrt, PI, asin } = Math;

concept("amaths.diff.exp-log-trig", { file: "diff/exp-log-trig", keyPrefix: "diff.exp-log-trig" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is $\dfrac{d}{dx}(\ln x)$ for $x > 0$?`,
    options: [
      [t`$\dfrac{1}{x}$`, "Correct: a standard result (in MF19)."],
      [t`$\ln x$`, t`Only $\mathrm{e}^{x}$ is its own derivative.`],
      [t`$\dfrac{1}{\ln x}$`, t`The derivative is the reciprocal of $x$, not of $\ln x$.`],
      [t`$x\ln x - x$`, t`This is $\int \ln x\, dx$, an integral, not the derivative.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\ln x = \dfrac{1}{x}$. The integral $\int \ln x\,dx = x\ln x - x + c$ is a different result (integration by parts).`,
  });

  checkDeriv((x) => 3 * exp(2 * x), (x) => 6 * exp(2 * x), XS, "q2");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the gradient of the curve $y = 3\mathrm{e}^{2x}$ at the point where it crosses the $y$-axis.`,
    value: 6, wrong: [3, 2],
    explanation: t`$\dfrac{dy}{dx} = 6\mathrm{e}^{2x}$. At $x = 0$: $6\mathrm{e}^{0} = 6$. (3 is the $y$-intercept.)`,
  });

  checkDeriv((x) => log(5 * x + 1), (x) => 5 / (5 * x + 1), XS, "q3");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $\ln(5x + 1)$ with respect to $x$. Type your answer as a fraction, for example 2/(3x+4).`,
    accepted: ["5/(5x+1)", "5/(1+5x)", "5(5x+1)^-1", "5(5x+1)^(-1)"],
    wrong: ["1/(5x+1)"],
    explanation: t`$\dfrac{d}{dx}\ln f(x) = \dfrac{f'(x)}{f(x)} = \dfrac{5}{5x + 1}$.`,
  });

  checkDeriv((x) => cos(4 * x), (x) => -4 * sin(4 * x), XS, "q4");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`What is $\dfrac{d}{dx}(\cos 4x)$?`,
    options: [
      [t`$-4\sin 4x$`, "Correct: −sin from the cosine, times 4 from the inside."],
      [t`$4\sin 4x$`, t`The derivative of cosine is $-\sin$; the minus sign is missing.`],
      [t`$-\sin 4x$`, "The chain-rule factor 4 is missing."],
      [t`$-\tfrac{1}{4}\sin 4x$`, "Dividing by 4 is what happens in integration, not differentiation."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\cos(ax) = -a\sin(ax)$, so the answer is $-4\sin 4x$.`,
  });

  checkDeriv((x) => exp(x * x - 3 * x), (x) => (2 * x - 3) * exp(x * x - 3 * x), XS, "q5");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $\mathrm{e}^{x^{2} - 3x}$ with respect to $x$. Type e^(…) for the exponential, for example (4x+1)e^(2x²+x).`,
    accepted: ["(2x-3)e^(x^2-3x)", "e^(x^2-3x)(2x-3)", "(2x-3)e^(x²-3x)", "e^(x²-3x)(2x-3)", "(2x-3)exp(x^2-3x)", "(2x-3)*e^(x^2-3x)"],
    wrong: ["e^(x^2-3x)"],
    explanation: t`$\dfrac{d}{dx}\mathrm{e}^{f(x)} = f'(x)\mathrm{e}^{f(x)}$ with $f'(x) = 2x - 3$.`,
    hints: ["Keep the exponential unchanged and multiply by the derivative of the power."],
  });

  const g6 = (x) => (2 * x) / (x * x + 1);
  checkDeriv((x) => log(x * x + 1), g6, XS, "q6");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the gradient of the curve $y = \ln(x^{2} + 1)$ at the point where $x = 3$.`,
    value: chk(g6(3), 0.6), wrong: [0.1, 2.3],
    explanation: t`$\dfrac{dy}{dx} = \dfrac{2x}{x^{2} + 1} = \dfrac{6}{10} = 0.6$ at $x = 3$. (0.1 forgets the factor $2x$; 2.30 is the value of $y$.)`,
    hints: ["Derivative of the inside over the inside."],
  });

  checkDeriv((x) => tan(2 * x), (x) => 2 / cos(2 * x) ** 2, [0.2, 0.5, 0.7], "q7");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is $\dfrac{d}{dx}(\tan 2x)$?`,
    options: [
      [t`$2\sec^{2}2x$`, t`Correct: $\frac{d}{dx}\tan u = \sec^{2}u$, times $\frac{du}{dx} = 2$.`],
      [t`$\sec^{2}2x$`, "The factor 2 from the inner function is missing."],
      [t`$2\sec 2x\tan 2x$`, t`This is the derivative of $\sec 2x$, not of $\tan 2x$.`],
      [t`$-\tfrac{1}{2}\ln|\cos 2x|$`, t`This is $\int \tan 2x\,dx$, an integral, not the derivative.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\tan(ax) = a\sec^{2}(ax)$, so $\dfrac{d}{dx}\tan 2x = 2\sec^{2}2x$.`,
    hints: ["The derivative of tan x is sec² x."],
  });

  checkDeriv((x) => sin(4 * x) ** 2, (x) => 4 * sin(8 * x), XS, "q8");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = \sin^{2}4x$, write $\dfrac{dy}{dx}$ in the form $k\sin mx$.`,
    template: "k = {{blank:k}}, m = {{blank:m}}",
    blanks: [
      { id: "k", input: "number", accepted: [4], wrong: 8 },
      { id: "m", input: "number", accepted: [8], wrong: 4 },
    ],
    explanation: t`$\dfrac{dy}{dx} = 2\sin 4x \times 4\cos 4x = 8\sin 4x\cos 4x = 4(2\sin 4x\cos 4x) = 4\sin 8x$.`,
    hints: ["Chain rule twice: the square, then sin 4x.", "Use 2 sin A cos A = sin 2A."],
  });

  checkDeriv((x) => log(sqrt(2 * x + 5)), (x) => 1 / (2 * x + 5), XS, "q9");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $f(x) = \ln\sqrt{2x + 5}$, find $f'(2)$, correct to 3 significant figures.`,
    value: 1 / 9, wrong: [0.222, 0.0556],
    explanation: t`$f(x) = \frac{1}{2}\ln(2x + 5)$, so $f'(x) = \frac{1}{2} \times \dfrac{2}{2x + 5} = \dfrac{1}{2x + 5}$. $f'(2) = \frac{1}{9} \approx 0.111$. (0.222 ignores the $\frac{1}{2}$ from the square root.)`,
    hints: [t`Use $\ln\sqrt{u} = \frac{1}{2}\ln u$ first.`],
  });

  checkDeriv((x) => log(2 * x), (x) => 1 / x, XS, "q10");
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\dfrac{d}{dx}\ln(2x) = \dfrac{2}{x}$.`,
    answer: false,
    explanation: t`False. $\dfrac{d}{dx}\ln(2x) = \dfrac{2}{2x} = \dfrac{1}{x}$. Equivalently, $\ln(2x) = \ln 2 + \ln x$, and $\ln 2$ is a constant.`,
  });

  checkDeriv((x) => exp(5 * x), (x) => 5 * exp(5 * x), XS, "q11a");
  checkDeriv((x) => log(5 * x), (x) => 1 / x, XS, "q11b");
  checkDeriv((x) => sin(5 * x), (x) => 5 * cos(5 * x), XS, "q11c");
  checkDeriv((x) => cos(5 * x), (x) => -5 * sin(5 * x), XS, "q11d");
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its derivative.",
    pairs: [
      [t`$\mathrm{e}^{5x}$`, t`$5\mathrm{e}^{5x}$`],
      [t`$\ln 5x$`, t`$\dfrac{1}{x}$`],
      [t`$\sin 5x$`, t`$5\cos 5x$`],
      [t`$\cos 5x$`, t`$-5\sin 5x$`],
    ],
    explanation: t`The inner derivative 5 multiplies each result, except for $\ln 5x$, where it cancels: $\frac{5}{5x} = \frac{1}{x}$.`,
  });

  // y = x − 2 ln x: stationary at x = 2, y = 2 − 2 ln 2
  const y12 = (x) => x - 2 * log(x);
  checkDeriv(y12, (x) => 1 - 2 / x, XS, "q12");
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The curve $y = x - 2\ln x$, $x > 0$, has one stationary point. Find its $y$-coordinate, correct to 3 significant figures.`,
    value: y12(2), prefix: "y =", wrong: [2, 1.39],
    explanation: t`$\dfrac{dy}{dx} = 1 - \dfrac{2}{x} = 0$ at $x = 2$. Then $y = 2 - 2\ln 2 \approx 0.614$. ($\frac{d^{2}y}{dx^{2}} = \frac{2}{x^{2}} > 0$: a minimum.)`,
    workedSolution: [
      t`1. $\dfrac{dy}{dx} = 1 - \dfrac{2}{x}$.`,
      t`2. $1 - \dfrac{2}{x} = 0 \Rightarrow x = 2$.`,
      t`3. $y = 2 - 2\ln 2 = 0.614$ (3 s.f.).`,
    ].join("\n"),
    hints: ["Solve dy/dx = 0 first.", "Give y, not x."],
  });

  // tangent to y = e^(−x) + 2x at x = ln 2: y-intercept 0.5 + 0.5 ln 2
  const f13 = (x) => exp(-x) + 2 * x;
  const fp13 = (x) => -exp(-x) + 2;
  checkDeriv(f13, fp13, XS, "q13");
  const x13 = log(2);
  const c13 = f13(x13) - fp13(x13) * x13;
  chk(c13, 0.5 + 0.5 * log(2), 1e-12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The tangent to the curve $y = \mathrm{e}^{-x} + 2x$ at the point where $x = \ln 2$ crosses the $y$-axis at $(0, c)$. Find $c$, correct to 3 significant figures.`,
    value: c13, prefix: "c =", wrong: [1.89, 1.19],
    explanation: t`At $x = \ln 2$: $y = \frac{1}{2} + 2\ln 2$ and $\dfrac{dy}{dx} = 2 - \mathrm{e}^{-x} = 2 - \frac{1}{2} = \frac{3}{2}$. Tangent: $y - (\frac{1}{2} + 2\ln 2) = \frac{3}{2}(x - \ln 2)$. At $x = 0$: $c = \frac{1}{2} + 2\ln 2 - \frac{3}{2}\ln 2 = \frac{1}{2} + \frac{1}{2}\ln 2 \approx 0.847$.`,
    hints: [t`$\mathrm{e}^{-\ln 2} = \frac{1}{2}$.`, "Substitute x = 0 in the tangent's equation."],
  });

  checkDeriv((x) => atan(3 * x), (x) => 3 / (1 + 9 * x * x), XS, "q14");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false, applies: CAM,
    stem: t`What is $\dfrac{d}{dx}\tan^{-1}(3x)$?`,
    options: [
      [t`$\dfrac{3}{1 + 9x^{2}}$`, t`Correct: $\frac{1}{1 + (3x)^{2}} \times 3$.`],
      [t`$\dfrac{1}{1 + 9x^{2}}$`, "The chain-rule factor 3 is missing."],
      [t`$\dfrac{3}{1 + 3x^{2}}$`, t`The whole of $3x$ must be squared: $(3x)^{2} = 9x^{2}$.`],
      [t`$3\sec^{2}(3x)$`, t`That is the derivative of $\tan 3x$, not of its inverse.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{du}\tan^{-1}u = \dfrac{1}{1 + u^{2}}$; with $u = 3x$, multiply by 3: $\dfrac{3}{1 + 9x^{2}}$.`,
    hints: ["Use the MF19 result for tan⁻¹ x with the chain rule."],
  });

  const g15 = (x) => 0.5 / (1 + (x / 2) ** 2);
  checkDeriv((x) => atan(x / 2), g15, XS, "q15");
  b.num({
    d: 4, skill: "APPLICATION", calculator: false, applies: CAM,
    stem: t`Find the gradient of the curve $y = \tan^{-1}\!\left(\dfrac{x}{2}\right)$ at the point where $x = 2$. Give your answer as an exact decimal.`,
    value: chk(g15(2), 0.25), wrong: [0.5, 0.1],
    explanation: t`$\dfrac{dy}{dx} = \dfrac{1}{1 + \frac{x^{2}}{4}} \times \dfrac{1}{2} = \dfrac{2}{4 + x^{2}}$. At $x = 2$: $\dfrac{2}{8} = 0.25$.`,
    hints: ["The inner derivative of x/2 is 1/2."],
  });

  checkDeriv((x) => log(tan(x)), (x) => 2 / sin(2 * x), [0.3, 0.7, 1.2], "q16");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`Show that $\dfrac{d}{dx}\ln(\tan x) = \dfrac{2}{\sin 2x}$ for $0 < x < \frac{\pi}{2}$.`,
    points: [
      t`M1 writes $\dfrac{\sec^{2}x}{\tan x}$`,
      t`M1 simplifies to $\dfrac{1}{\cos^{2}x} \times \dfrac{\cos x}{\sin x} = \dfrac{1}{\sin x\cos x}$`,
      t`A1 uses $\sin 2x = 2\sin x\cos x$ to reach $\dfrac{2}{\sin 2x}$`,
    ],
    modelAnswer: ["$$", t`\frac{d}{dx}\ln(\tan x) = \frac{\sec^{2}x}{\tan x} = \frac{1}{\cos^{2}x} \cdot \frac{\cos x}{\sin x} = \frac{1}{\sin x\cos x} = \frac{2}{2\sin x\cos x} = \frac{2}{\sin 2x}`, "$$"].join("\n"),
    explanation: "Derivative of the inside over the inside, then write everything in sin and cos and use the double-angle formula.",
    hints: ["d/dx ln f = f′/f."],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $x$ is measured in degrees, then $\dfrac{d}{dx}(\sin x) = \cos x$.`,
    answer: false,
    explanation: t`False. The result needs radians. With $x$ in degrees, $\sin x^{\circ} = \sin\frac{\pi x}{180}$, so $\frac{d}{dx}\sin x^{\circ} = \frac{\pi}{180}\cos x^{\circ}$.`,
    hints: ["Convert degrees to radians inside the sine, then use the chain rule."],
  });

  checkDeriv((x) => log(1 / x), (x) => -1 / x, XS, "q18");
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is $\dfrac{d}{dx}\ln\!\left(\dfrac{1}{x}\right)$ for $x > 0$?`,
    options: [
      [t`$-\dfrac{1}{x}$`, t`Correct: $\ln\frac{1}{x} = -\ln x$.`],
      [t`$x$`, t`This inverts $\frac{1}{x}$; the derivative of $\ln u$ is $\frac{u'}{u}$, not $\frac{1}{u}$.`],
      [t`$\dfrac{1}{x}$`, "The minus sign from ln(1/x) = −ln x has been lost."],
      [t`$-\dfrac{1}{x^{2}}$`, t`This is the derivative of $\frac{1}{x}$, not of $\ln\frac{1}{x}$.`],
    ],
    answer: "A",
    explanation: t`By the laws of logs, $\ln\frac{1}{x} = -\ln x$, whose derivative is $-\frac{1}{x}$. (Chain rule: $\frac{-x^{-2}}{x^{-1}} = -\frac{1}{x}$.)`,
  });

  // struct 5: y = e^{2x} − 5e^x + 3x; stationary where 2u² − 5u + 3 = 0
  const y19 = (x) => exp(2 * x) - 5 * exp(x) + 3 * x;
  const yp19 = (x) => 2 * exp(2 * x) - 5 * exp(x) + 3;
  checkDeriv(y19, yp19, XS, "q19");
  chk(yp19(0), 0); chk(yp19(log(1.5)), 0, 1e-12);
  const ypp19 = (x) => 4 * exp(2 * x) - 5 * exp(x);
  chk(ypp19(0), -1);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A curve has equation $y = \mathrm{e}^{2x} - 5\mathrm{e}^{x} + 3x$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that at a stationary point $2u^{2} - 5u + 3 = 0$, where $u = \mathrm{e}^{x}$.`,
        points: [t`M1 differentiates: $\dfrac{dy}{dx} = 2\mathrm{e}^{2x} - 5\mathrm{e}^{x} + 3$`, t`A1 writes $\mathrm{e}^{2x} = u^{2}$ and sets the derivative to zero`],
        modelAnswer: ["$$", t`\frac{dy}{dx} = 2\mathrm{e}^{2x} - 5\mathrm{e}^{x} + 3 = 2(\mathrm{e}^{x})^{2} - 5\mathrm{e}^{x} + 3 = 2u^{2} - 5u + 3 = 0`, "$$"].join("\n"),
        explanation: t`$\mathrm{e}^{2x} = (\mathrm{e}^{x})^{2}$ turns the derivative into a quadratic in $u$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Hence find the x-coordinates of the stationary points, smaller first, correct to 3 decimal places.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [
          { id: "a", input: "number", accepted: ["0"], tolerance: 0.0005, wrong: 1 },
          { id: "b", input: "number", accepted: ["0.405"], tolerance: 0.0005, wrong: 1.5 },
        ],
        explanation: t`$(2u - 3)(u - 1) = 0$ gives $u = 1$ or $u = \frac{3}{2}$, so $x = \ln 1 = 0$ or $x = \ln\frac{3}{2} \approx 0.405$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "What is the nature of the stationary point at x = 0?",
        options: [
          ["A maximum", t`Correct: $\frac{d^{2}y}{dx^{2}} = 4\mathrm{e}^{2x} - 5\mathrm{e}^{x} = -1 < 0$ at $x = 0$.`],
          ["A minimum", t`At $x = 0$ the second derivative is $4 - 5 = -1$, which is negative.`],
          ["A point of inflexion", "The second derivative is not zero there."],
          ["It cannot be decided", "The second derivative is −1, which decides it."],
        ],
        answer: "A", explanation: t`$\frac{d^{2}y}{dx^{2}} = 4\mathrm{e}^{2x} - 5\mathrm{e}^{x}$; at $x = 0$ it equals $-1 < 0$, so a maximum.` }),
    ],
    explanation: "An exponential equation that is quadratic in eˣ: substitute u = eˣ, solve, then take logarithms.",
    hints: ["Let u = eˣ.", "Factorise 2u² − 5u + 3."],
  });
  chk(log(1.5), 0.4054651081, 1e-9);

  // struct 5: y = sin x + cos 2x on [0, π]: stationary where cos x = 0 or sin x = 1/4
  const yp20 = (x) => cos(x) - 2 * sin(2 * x);
  checkDeriv((x) => sin(x) + cos(2 * x), yp20, XS, "q20");
  checkDeriv((x) => sin(x) + cos(2 * x), (x) => cos(x) * (1 - 4 * sin(x)), XS, "q20 factor");
  const s20 = solveTrig({ fn: "sin", k: 0.25, lo: 0, hi: PI, unit: "rad" });
  const c20 = solveTrig({ fn: "cos", k: 0, lo: 0, hi: PI, unit: "rad" });
  const all20 = [...s20, ...c20].sort((a, b) => a - b);
  same(all20.map((x) => Number(x.toFixed(3))), [0.253, 1.571, 2.889]);
  chk(all20[0], asin(0.25), 1e-9);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A curve has equation $y = \sin x + \cos 2x$ for $0 \leq x \leq \pi$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\dfrac{dy}{dx} = \cos x(1 - 4\sin x)$.`,
        points: [t`M1 differentiates: $\cos x - 2\sin 2x$`, t`A1 uses $\sin 2x = 2\sin x\cos x$ and factorises to the given form`],
        modelAnswer: ["$$", t`\frac{dy}{dx} = \cos x - 2\sin 2x = \cos x - 4\sin x\cos x = \cos x(1 - 4\sin x)`, "$$"].join("\n"),
        explanation: t`The derivative of $\cos 2x$ is $-2\sin 2x$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find the x-coordinates of the three stationary points, in radians, in ascending order, correct to 3 decimal places.", template: "x = {{blank:a}}, x = {{blank:b}}, x = {{blank:c}}",
        blanks: [
          { id: "a", input: "number", accepted: ["0.253"], tolerance: 0.0005, wrong: 14.5 },
          { id: "b", input: "number", accepted: ["1.571"], tolerance: 0.0005, wrong: 90 },
          { id: "c", input: "number", accepted: ["2.889"], tolerance: 0.0005, wrong: 165.5 },
        ],
        explanation: t`$\cos x = 0$ gives $x = \frac{\pi}{2} \approx 1.571$. $\sin x = \frac{1}{4}$ gives $x = 0.253$ and $x = \pi - 0.253 = 2.889$. (Degrees, such as 14.5, are wrong: calculus works in radians.)` }),
    ],
    explanation: "Factorised derivatives give each factor = 0 separately; remember the second solution of sin x = k in the interval.",
    hints: ["Each factor can be zero.", "sin x = 1/4 has two solutions between 0 and π."],
  });

  b.card("FORMULA", "Derivatives of eˣ and ln x", t`$\dfrac{d}{dx}\mathrm{e}^{x} = \mathrm{e}^{x}$, $\dfrac{d}{dx}\ln x = \dfrac{1}{x}$`);
  b.card("FORMULA", "Derivatives of sin, cos, tan (radians)", t`$\sin x \to \cos x$, $\cos x \to -\sin x$, $\tan x \to \sec^{2}x$`);
  b.card("FORMULA", "Exponential of a function", t`$\dfrac{d}{dx}\mathrm{e}^{f(x)} = f'(x)\,\mathrm{e}^{f(x)}$`);
  b.card("FORMULA", "Logarithm of a function", t`$\dfrac{d}{dx}\ln f(x) = \dfrac{f'(x)}{f(x)}$`);
  b.card("FORMULA", "Trigonometric functions of (ax + b)", t`$\dfrac{d}{dx}\sin(ax + b) = a\cos(ax + b)$; similarly $\cos \to -a\sin$, $\tan \to a\sec^{2}$.`);
  b.card("FORMULA", "Derivative of tan⁻¹x", t`$\dfrac{d}{dx}\tan^{-1}x = \dfrac{1}{1 + x^{2}}$`, undefined, { applies: CAM });
  b.card("CONCEPT", "Simplify logs first", t`Use log laws before differentiating: $\ln\sqrt{x^{2} + 1} = \frac{1}{2}\ln(x^{2} + 1)$; $\ln(kx) = \ln k + \ln x$.`);
  b.card("FACT", "Why radians in calculus?", t`$\frac{d}{dx}\sin x = \cos x$ relies on $\frac{\sin h}{h} \to 1$, true only in radians.`);
});
