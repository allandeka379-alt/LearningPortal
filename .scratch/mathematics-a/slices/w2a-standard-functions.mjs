// W2a: amaths.integ.standard-functions (e^(ax+b), 1/(ax+b), sin, cos, sec², identities; 1/(x² + a²) Cambridge P3 / ZIMSEC).
import { concept, P, t, chk, checkAntideriv, integrate } from "../lib.mjs";

const { exp, log, sin, cos, tan, atan, sqrt, PI, E, abs } = Math;
const I = (f, a, b, exact, label) => chk(integrate(f, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);

concept("amaths.integ.standard-functions", { file: "integ/standard-functions", keyPrefix: "integ.standard-functions" }, (b) => {
  checkAntideriv((x) => exp(4 * x) / 4, (x) => exp(4 * x), 0, 1, "q1");
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find $\displaystyle\int \mathrm{e}^{4x}\,dx$.`,
    options: [
      [t`$\tfrac{1}{4}\mathrm{e}^{4x} + c$`, "Correct: divide by the coefficient 4."],
      [t`$4\mathrm{e}^{4x} + c$`, "This is the derivative of e^(4x), not its integral."],
      [t`$\dfrac{\mathrm{e}^{4x + 1}}{4x + 1} + c$`, "The power rule does not apply to exponentials: the variable is in the exponent."],
      [t`$\mathrm{e}^{4x} + c$`, "Differentiating this gives 4e^(4x), so a factor 1/4 is needed."],
    ],
    answer: "A",
    explanation: t`$\int \mathrm{e}^{ax}\,dx = \frac{1}{a}\mathrm{e}^{ax} + c$; check: $\frac{d}{dx}\left(\frac{1}{4}\mathrm{e}^{4x}\right) = \mathrm{e}^{4x}$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Evaluate $\displaystyle\int_{0}^{\pi/2}\cos x\,dx$.`,
    value: I(cos, 0, PI / 2, 1, "q2"), wrong: [0, -1],
    explanation: t`$\Big[\sin x\Big]_{0}^{\pi/2} = 1 - 0 = 1$.`,
  });

  checkAntideriv((x) => log(3 * x + 2) / 3, (x) => 1 / (3 * x + 2), 0, 2, "q3");
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\frac{1}{3x + 2}\,dx$. Type ln for the natural logarithm and include the constant, for example (1/2)ln|2x+5|+c.`,
    accepted: ["(1/3)ln|3x+2|+c", "1/3ln|3x+2|+c", "(1/3)ln(3x+2)+c", "1/3ln(3x+2)+c", "ln|3x+2|/3+c", "ln(3x+2)/3+c", "(1/3)ln|3x+2|+k", "(1/3)ln|3x+2|+C", "1/3*ln|3x+2|+c"],
    wrong: ["ln|3x+2|+c", "3ln|3x+2|+c"],
    explanation: t`$\int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln|ax + b| + c$, so the answer is $\frac{1}{3}\ln|3x + 2| + c$.`,
  });

  checkAntideriv((x) => -cos(5 * x) / 5, (x) => sin(5 * x), 0, 1, "q4");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int \sin 5x\,dx$.`,
    options: [
      [t`$-\tfrac{1}{5}\cos 5x + c$`, "Correct: −cos, divided by 5."],
      [t`$\tfrac{1}{5}\cos 5x + c$`, "The integral of sin is −cos; the minus sign is missing."],
      [t`$-5\cos 5x + c$`, "Multiplying by 5 differentiates; integrating divides by 5."],
      [t`$5\cos 5x + c$`, "This is the derivative of sin 5x, not an integral of it."],
    ],
    answer: "A",
    explanation: t`$\int \sin(ax)\,dx = -\frac{1}{a}\cos(ax) + c$. Check: $\frac{d}{dx}\left(-\frac{1}{5}\cos 5x\right) = \sin 5x$.`,
  });

  const v5 = I((x) => exp(3 * x), 0, 1, (exp(3) - 1) / 3, "q5");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{1}\mathrm{e}^{3x}\,dx$, correct to 3 significant figures.`,
    value: v5, wrong: [6.70, 57.3],
    explanation: t`$\Big[\tfrac{1}{3}\mathrm{e}^{3x}\Big]_{0}^{1} = \tfrac{1}{3}(\mathrm{e}^{3} - 1) \approx 6.36$. (6.70 forgets to subtract the value at 0; 57.3 multiplies by 3.)`,
    hints: [t`At $x = 0$, $\mathrm{e}^{0} = 1$, not 0.`],
  });

  const v6 = I((x) => 2 / (2 * x - 1), 1, 3, log(5), "q6");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{1}^{3}\frac{2}{2x - 1}\,dx$, correct to 3 significant figures.`,
    value: v6, wrong: [3.22, 0.805],
    explanation: t`$\Big[\ln|2x - 1|\Big]_{1}^{3} = \ln 5 - \ln 1 = \ln 5 \approx 1.61$. (3.22 forgets to divide by 2.)`,
    hints: ["The 2 on top cancels the 1/2 from the coefficient of x."],
  });

  checkAntideriv((x) => 0.5 * x + 0.25 * sin(2 * x), (x) => cos(x) ** 2, 0, 2, "q7");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Using $\cos^{2}x = \frac{1}{2}(1 + \cos 2x)$, $\displaystyle\int\cos^{2}x\,dx = px + q\sin 2x + c$. Find $p$ and $q$ as decimals.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: ["0.5", "1/2"], tolerance: 0.0005, wrong: 1 },
      { id: "q", input: "number", accepted: ["0.25", "1/4"], tolerance: 0.0005, wrong: 0.5 },
    ],
    explanation: t`$\int \tfrac{1}{2}(1 + \cos 2x)\,dx = \tfrac{1}{2}x + \tfrac{1}{2} \times \tfrac{1}{2}\sin 2x + c = 0.5x + 0.25\sin 2x + c$.`,
    hints: ["Integrate cos 2x to (1/2) sin 2x."],
  });

  const v8 = I((x) => tan(x) ** 2, 0, PI / 4, 1 - PI / 4, "q8");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{\pi/4}\tan^{2}x\,dx$, correct to 3 significant figures.`,
    value: v8, wrong: [1, 1.79],
    explanation: t`$\tan^{2}x = \sec^{2}x - 1$. $\Big[\tan x - x\Big]_{0}^{\pi/4} = 1 - \tfrac{\pi}{4} \approx 0.215$. (1.79 adds instead of subtracting $x$.)`,
    hints: ["Use tan²x = sec²x − 1."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\int\frac{1}{x}\,dx = \ln|x| + c$ is valid for negative values of $x$ as well as positive ones.`,
    answer: true,
    explanation: t`True. For $x < 0$, $\frac{d}{dx}\ln(-x) = \frac{-1}{-x} = \frac{1}{x}$, so $\ln|x|$ works on both sides of zero (but not across $x = 0$).`,
  });

  checkAntideriv((x) => -2 * exp(-x / 2), (x) => exp(-x / 2), 0, 3, "q10");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int \mathrm{e}^{-\frac{x}{2}}\,dx$.`,
    options: [
      [t`$-2\mathrm{e}^{-\frac{x}{2}} + c$`, t`Correct: divide by $-\frac{1}{2}$, i.e. multiply by $-2$.`],
      [t`$2\mathrm{e}^{-\frac{x}{2}} + c$`, t`The coefficient of $x$ is negative, so the result needs a minus sign.`],
      [t`$-\tfrac{1}{2}\mathrm{e}^{-\frac{x}{2}} + c$`, "This multiplies by the coefficient −1/2 instead of dividing by it."],
      [t`$\mathrm{e}^{-\frac{x}{2}} + c$`, "Its derivative is −(1/2)e^(−x/2), not e^(−x/2)."],
    ],
    answer: "A",
    explanation: t`$\int \mathrm{e}^{ax}\,dx = \frac{1}{a}\mathrm{e}^{ax}$ with $a = -\frac{1}{2}$: $\frac{1}{-1/2} = -2$.`,
    hints: ["Dividing by −1/2 is the same as multiplying by −2."],
  });

  checkAntideriv((x) => tan(3 * x) / 3, (x) => 1 / cos(3 * x) ** 2, 0, 0.4, "q11a");
  checkAntideriv((x) => sin(3 * x) / 3, (x) => cos(3 * x), 0, 1, "q11b");
  checkAntideriv((x) => exp(3 * x) / 3, (x) => exp(3 * x), 0, 1, "q11c");
  checkAntideriv((x) => log(3 * x) , (x) => 1 / x, 1, 2, "q11d");
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each integrand with its indefinite integral (the + c is omitted).",
    pairs: [
      [t`$\sec^{2}3x$`, t`$\tfrac{1}{3}\tan 3x$`],
      [t`$\cos 3x$`, t`$\tfrac{1}{3}\sin 3x$`],
      [t`$\mathrm{e}^{3x}$`, t`$\tfrac{1}{3}\mathrm{e}^{3x}$`],
      [t`$\dfrac{1}{3x}$`, t`$\tfrac{1}{3}\ln|x|$`],
    ],
    explanation: t`Each needs the factor $\frac{1}{3}$. For $\frac{1}{3x} = \frac{1}{3} \cdot \frac{1}{x}$ the integral is $\frac{1}{3}\ln|x|$ (equivalently $\frac{1}{3}\ln|3x|$, which differs only by a constant).`,
  });

  const v12 = I((x) => sin(3 * x) ** 2, 0, PI / 6, PI / 12, "q12");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{\pi/6}\sin^{2}3x\,dx$, correct to 3 significant figures.`,
    value: v12, wrong: [0.0833, 0.524],
    explanation: t`$\sin^{2}3x = \tfrac{1}{2}(1 - \cos 6x)$. $\tfrac{1}{2}\Big[x - \tfrac{1}{6}\sin 6x\Big]_{0}^{\pi/6} = \tfrac{1}{2}\left(\tfrac{\pi}{6} - \tfrac{1}{6}\sin\pi\right) = \tfrac{\pi}{12} \approx 0.262$.`,
    hints: ["Double the angle: sin²3x uses cos 6x.", "sin π = 0."],
  });

  const v13 = I((x) => 1 / (x + 2), 0, 4, log(3), "q13");
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true, unit: "units²",
    stem: t`Find the area of the region bounded by $y = \dfrac{1}{x + 2}$, the axes and the line $x = 4$, correct to 3 significant figures.`,
    value: v13, wrong: [1.79, 0.444],
    explanation: t`Area $= \Big[\ln(x + 2)\Big]_{0}^{4} = \ln 6 - \ln 2 = \ln 3 \approx 1.10$. (1.79 is $\ln 6$, forgetting the lower limit.)`,
    workedSolution: [
      t`1. Area $= \displaystyle\int_{0}^{4}\frac{1}{x + 2}\,dx$.`,
      t`2. $= \Big[\ln(x + 2)\Big]_{0}^{4} = \ln 6 - \ln 2$.`,
      t`3. $= \ln 3 \approx 1.10$.`,
    ].join("\n"),
    hints: ["Use ln a − ln b = ln(a/b)."],
  });

  const v14 = I((x) => 1 / (x * x + 4), 0, 2, PI / 8, "q14");
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Using $\displaystyle\int\frac{1}{x^{2} + a^{2}}\,dx = \frac{1}{a}\tan^{-1}\frac{x}{a} + c$, evaluate $\displaystyle\int_{0}^{2}\frac{1}{x^{2} + 4}\,dx$, correct to 3 significant figures.`,
    value: v14, wrong: [0.785, 0.196],
    explanation: t`$a = 2$: $\Big[\tfrac{1}{2}\tan^{-1}\tfrac{x}{2}\Big]_{0}^{2} = \tfrac{1}{2} \times \tfrac{\pi}{4} = \tfrac{\pi}{8} \approx 0.393$. (0.785 forgets the factor $\frac{1}{2}$.)`,
    hints: ["Here a = 2.", "tan⁻¹ 1 = π/4 (radians)."],
  });

  checkAntideriv((x) => 0.5 * atan(2 * x), (x) => 1 / (1 + 4 * x * x), 0, 2, "q15");
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\frac{1}{1 + 4x^{2}}\,dx$.`,
    options: [
      [t`$\tfrac{1}{2}\tan^{-1}2x + c$`, t`Correct: $\frac{1}{4}\int\frac{1}{x^{2} + \frac{1}{4}}\,dx = \frac{1}{4} \times 2\tan^{-1}2x$.`],
      [t`$2\tan^{-1}2x + c$`, t`The factor $\frac{1}{4}$ taken out of the denominator has been lost.`],
      [t`$\tan^{-1}2x + c$`, "Differentiating gives 2/(1 + 4x²), twice the integrand."],
      [t`$\tfrac{1}{8x}\ln(1 + 4x^{2}) + c$`, "Dividing by the derivative of the denominator is not a valid method."],
    ],
    answer: "A",
    explanation: t`Check by differentiating: $\frac{1}{2} \times \frac{2}{1 + (2x)^{2}} = \frac{1}{1 + 4x^{2}}$.`,
    hints: ["Make the coefficient of x² equal to 1 first."],
  });

  I((x) => cos(x) ** 2, 0, PI / 3, PI / 6 + sqrt(3) / 8, "q16");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`Show that $\displaystyle\int_{0}^{\pi/3}\cos^{2}x\,dx = \frac{\pi}{6} + \frac{\sqrt{3}}{8}$.`,
    points: [
      t`M1 uses $\cos^{2}x = \frac{1}{2}(1 + \cos 2x)$`,
      t`A1 integrates to $\Big[\tfrac{x}{2} + \tfrac{\sin 2x}{4}\Big]$`,
      t`A1 uses $\sin\frac{2\pi}{3} = \frac{\sqrt{3}}{2}$ to reach the given value`,
    ],
    modelAnswer: ["$$", t`\int_{0}^{\pi/3}\tfrac{1}{2}(1 + \cos 2x)\,dx = \Big[\tfrac{x}{2} + \tfrac{\sin 2x}{4}\Big]_{0}^{\pi/3} = \tfrac{\pi}{6} + \tfrac{1}{4} \cdot \tfrac{\sqrt{3}}{2} - 0 = \tfrac{\pi}{6} + \tfrac{\sqrt{3}}{8}`, "$$"].join("\n"),
    explanation: "Exact values of sine at standard angles finish the calculation.",
    hints: ["Rewrite cos²x with the double-angle identity."],
  });

  I((x) => exp(2 * x), 0, log(3), 4, "q17");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Given that $\displaystyle\int_{0}^{k}\mathrm{e}^{2x}\,dx = 4$, find $k$, correct to 3 significant figures.`,
    value: log(3), prefix: "k =", wrong: [1.04, 2.20],
    explanation: t`$\tfrac{1}{2}(\mathrm{e}^{2k} - 1) = 4$ gives $\mathrm{e}^{2k} = 9$, so $2k = \ln 9$ and $k = \ln 3 \approx 1.10$. (1.04 omits the $-1$ from the lower limit.)`,
    hints: ["Evaluate the integral in terms of k.", "Take natural logs."],
  });
  chk(0.5 * log(8), 1.0397, 1e-4, "q17 wrong");

  // struct 5: between y = cos x and y = sin x, 0 to π/4
  const a18 = I((x) => cos(x) - sin(x), 0, PI / 4, sqrt(2) - 1, "q18 area");
  const c18 = I((x) => cos(x) ** 2 - sin(x) ** 2, 0, PI / 4, 0.5, "q18c");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The region $R$ lies between the curves $y = \cos x$ and $y = \sin x$ for $0 \leq x \leq \frac{\pi}{4}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 1, stem: t`Show that the curves meet at $x = \frac{\pi}{4}$ in this interval.`,
        points: [t`B1 solves $\cos x = \sin x \Rightarrow \tan x = 1 \Rightarrow x = \frac{\pi}{4}$`],
        modelAnswer: t`$\cos x = \sin x$ gives $\tan x = 1$, and the only solution in $0 \leq x \leq \frac{\pi}{4}$ is $x = \frac{\pi}{4}$.`,
        explanation: "Divide by cos x." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the area of R, correct to 3 significant figures.", unit: "units²", value: a18, wrong: [2.41],
        explanation: t`$\int_{0}^{\pi/4}(\cos x - \sin x)\,dx = \Big[\sin x + \cos x\Big]_{0}^{\pi/4} = \sqrt{2} - 1 \approx 0.414$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Evaluate $\displaystyle\int_{0}^{\pi/4}(\cos^{2}x - \sin^{2}x)\,dx$ exactly, as a decimal.`, value: c18, dp: 1, wrong: [0.785],
        explanation: t`$\cos^{2}x - \sin^{2}x = \cos 2x$, so $\Big[\tfrac{1}{2}\sin 2x\Big]_{0}^{\pi/4} = \tfrac{1}{2}$.` }),
    ],
    explanation: "Upper minus lower for the area; the double-angle identity collapses cos²x − sin²x to cos 2x.",
    hints: ["On this interval cos x ≥ sin x.", "cos 2x = cos²x − sin²x."],
  });

  // struct 5: ∫₁³ 4/(2x − 1) = 2 ln 5; ∫₀² e^(x/2) = 2(e − 1)
  I((x) => 4 / (2 * x - 1), 1, 3, 2 * log(5), "q19a");
  const b19 = I((x) => exp(x / 2), 0, 2, 2 * (E - 1), "q19b");
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: "This question is about two definite integrals.",
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: t`Find the exact value of $\displaystyle\int_{1}^{3}\frac{4}{2x - 1}\,dx$, in the form $k\ln m$. Type it as, for example, 3ln7.`,
        accepted: ["2ln5", "2ln(5)", "ln25", "ln(25)", "2*ln5", "2*ln(5)"], wrong: ["4ln5"],
        explanation: t`$\Big[2\ln|2x - 1|\Big]_{1}^{3} = 2\ln 5 - 2\ln 1 = 2\ln 5$.` }),
      P.num({ label: "(b)", marks: 2, stem: t`Evaluate $\displaystyle\int_{0}^{2}\mathrm{e}^{\frac{x}{2}}\,dx$, correct to 3 significant figures.`, value: b19, wrong: [0.859, 5.44],
        explanation: t`$\Big[2\mathrm{e}^{\frac{x}{2}}\Big]_{0}^{2} = 2\mathrm{e} - 2 \approx 3.44$. (5.44 forgets the lower limit; 0.859 multiplies by $\frac{1}{2}$ instead of dividing.)` }),
      P.mcq({ label: "(c)", marks: 1, stem: t`Why can $\displaystyle\int_{0}^{1}\frac{4}{2x - 1}\,dx$ not be evaluated in the same way?`,
        options: [
          [t`The integrand is undefined at $x = \frac{1}{2}$, inside the interval`, "Correct: the graph has a vertical asymptote at x = 1/2."],
          [t`Because $\ln 0$ appears at the lower limit $x = 0$`, t`At $x = 0$, $|2x - 1| = 1$ and $\ln 1 = 0$, which is fine.`],
          ["Because the integral of a fraction must be done by parts", "1/(linear) integrates directly to a logarithm."],
          ["Because the answer would be negative", "Negative definite integrals are allowed."],
        ],
        answer: "A", explanation: t`$\frac{4}{2x - 1}$ is unbounded at $x = \frac{1}{2}$, which lies between 0 and 1, so the formula $\ln|2x - 1|$ cannot be used across it.` }),
    ],
    explanation: "Standard integrals of reciprocal and exponential functions of (ax + b), with a check on the interval.",
    hints: ["Divide by the coefficient of x each time.", "Look for a value of x that makes the denominator zero."],
  });

  b.card("FORMULA", "Integral of e^(ax+b)", t`$\displaystyle\int \mathrm{e}^{ax + b}\,dx = \frac{1}{a}\mathrm{e}^{ax + b} + c$`);
  b.card("FORMULA", "Integral of 1/(ax + b)", t`$\displaystyle\int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln|ax + b| + c$`);
  b.card("FORMULA", "Integrals of sin and cos of (ax + b)", t`$\sin(ax + b) \to -\frac{1}{a}\cos(ax + b)$; $\cos(ax + b) \to \frac{1}{a}\sin(ax + b)$`);
  b.card("FORMULA", "Integral of sec²(ax + b)", t`$\displaystyle\int \sec^{2}(ax + b)\,dx = \frac{1}{a}\tan(ax + b) + c$`);
  b.card("FORMULA", "Identities for squared trig functions", t`$\sin^{2}x = \frac{1}{2}(1 - \cos 2x)$, $\cos^{2}x = \frac{1}{2}(1 + \cos 2x)$, $\tan^{2}x = \sec^{2}x - 1$`);
  b.card("FORMULA", "Integral of 1/(x² + a²)", t`$\displaystyle\int \frac{1}{x^{2} + a^{2}}\,dx = \frac{1}{a}\tan^{-1}\frac{x}{a} + c$`, "Cambridge Paper 3 only; a ZIMSEC standard integral.");
  b.card("FACT", "Why |x| in ln|x|?", t`$\frac{1}{x}$ exists for $x < 0$; $\frac{d}{dx}\ln(-x) = \frac{1}{x}$, so $\ln|x|$ covers both signs.`);
  b.card("CONCEPT", "Integrating sin²x", "No direct rule: rewrite with the double-angle identity first.");
});
