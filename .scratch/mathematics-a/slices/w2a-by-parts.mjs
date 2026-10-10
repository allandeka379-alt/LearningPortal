// W2a: amaths.integ.by-parts (ZIMSEC; Cambridge P3).
import { concept, P, t, chk, checkAntideriv, integrate } from "../lib.mjs";

const { exp, log, sin, cos, atan, PI, E, abs } = Math;
const I = (f, a, b, exact, label) => chk(integrate(f, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);

concept("amaths.integ.by-parts", { file: "integ/by-parts", keyPrefix: "integ.by-parts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which is the formula for integration by parts?",
    options: [
      [t`$\displaystyle\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx$`, "Correct: the product rule integrated and rearranged (MF19)."],
      [t`$\displaystyle\int u\frac{dv}{dx}\,dx = uv + \int v\frac{du}{dx}\,dx$`, "The second term is subtracted, not added."],
      [t`$\displaystyle\int u\frac{dv}{dx}\,dx = \frac{du}{dx}\frac{dv}{dx}$`, "This multiplies two derivatives and is not an integral rule."],
      [t`$\displaystyle\int u\frac{dv}{dx}\,dx = u\int v\,dx - v\int u\,dx$`, "This mixes up the roles of u and v; there is no such rule."],
    ],
    answer: "A",
    explanation: t`From $\frac{d}{dx}(uv) = u\frac{dv}{dx} + v\frac{du}{dx}$, integrate and rearrange: $\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`To find $\displaystyle\int x\mathrm{e}^{3x}\,dx$ by parts, which choice is best?`,
    options: [
      [t`$u = x$ and $\dfrac{dv}{dx} = \mathrm{e}^{3x}$`, t`Correct: $\frac{du}{dx} = 1$, so the new integral is just $\int\frac{1}{3}\mathrm{e}^{3x}\,dx$.`],
      [t`$u = \mathrm{e}^{3x}$ and $\dfrac{dv}{dx} = x$`, t`Then the new integral contains $x^{2}\mathrm{e}^{3x}$, which is harder than the original.`],
      [t`$u = x\mathrm{e}^{3x}$ and $\dfrac{dv}{dx} = 1$`, "This leads to an integral at least as hard as the original."],
      [t`$u = 3x$ and $\dfrac{dv}{dx} = \mathrm{e}^{x}$`, t`$\mathrm{e}^{3x}$ is not $3x \times \mathrm{e}^{x}$; the factors are wrong.`],
    ],
    answer: "A",
    explanation: t`Take $u$ as the factor that simplifies on differentiation (the power of $x$). Then $\int x\mathrm{e}^{3x}\,dx = \frac{x}{3}\mathrm{e}^{3x} - \frac{1}{9}\mathrm{e}^{3x} + c$.`,
  });
  checkAntideriv((x) => (x / 3) * exp(3 * x) - exp(3 * x) / 9, (x) => x * exp(3 * x), 0, 1, "q2");

  checkAntideriv((x) => (x - 1) * exp(x), (x) => x * exp(x), 0, 2, "q3");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int x\mathrm{e}^{x}\,dx$. Type e^x for the exponential and include the constant, for example (x+2)e^x+c.`,
    accepted: ["(x-1)e^x+c", "xe^x-e^x+c", "e^x(x-1)+c", "-e^x+xe^x+c", "(x-1)e^x+k", "(x-1)e^x+C", "x*e^x-e^x+c"],
    wrong: ["xe^x+c", "(x+1)e^x+c"],
    explanation: t`$u = x$, $v = \mathrm{e}^{x}$: $x\mathrm{e}^{x} - \int\mathrm{e}^{x}\,dx = x\mathrm{e}^{x} - \mathrm{e}^{x} + c = (x - 1)\mathrm{e}^{x} + c$.`,
    hints: ["Let u = x and dv/dx = eˣ."],
  });

  const v4 = I((x) => x * cos(x), 0, PI / 2, PI / 2 - 1, "q4");
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{\pi/2} x\cos x\,dx$, correct to 3 significant figures.`,
    value: v4, wrong: [2.57, 1.57],
    explanation: t`$u = x$, $v = \sin x$: $\Big[x\sin x\Big]_{0}^{\pi/2} - \int_{0}^{\pi/2}\sin x\,dx = \frac{\pi}{2} - \Big[-\cos x\Big]_{0}^{\pi/2} = \frac{\pi}{2} - 1 \approx 0.571$. (2.57 adds the second term.)`,
    hints: ["Let u = x and dv/dx = cos x."],
  });

  checkAntideriv((x) => (x / 3) * sin(3 * x) + cos(3 * x) / 9, (x) => x * cos(3 * x), 0, 1, "q5");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$\displaystyle\int x\cos 3x\,dx = \frac{x}{p}\sin 3x + \frac{1}{q}\cos 3x + c$. Find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: [3], wrong: 1 },
      { id: "q", input: "number", accepted: [9], wrong: -9 },
    ],
    explanation: t`$u = x$, $v = \frac{1}{3}\sin 3x$: $\frac{x}{3}\sin 3x - \frac{1}{3}\int\sin 3x\,dx = \frac{x}{3}\sin 3x + \frac{1}{9}\cos 3x + c$.`,
    hints: ["Integrate cos 3x to (1/3) sin 3x.", "Then −(1/3) ∫ sin 3x dx = +(1/9) cos 3x."],
  });

  const v6 = I((x) => x ** 3 * log(x), 1, E, (3 * E ** 4 + 1) / 16, "q6");
  chk(E ** 4 / 4, 13.6495, 1e-4, "q6 wrong");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{1}^{\mathrm{e}} x^{3}\ln x\,dx$, correct to 3 significant figures.`,
    value: v6, wrong: [13.6, 10.2],
    explanation: t`$u = \ln x$, $v = \frac{x^{4}}{4}$: $\Big[\tfrac{x^{4}}{4}\ln x\Big]_{1}^{\mathrm{e}} - \int_{1}^{\mathrm{e}}\tfrac{x^{3}}{4}\,dx = \tfrac{\mathrm{e}^{4}}{4} - \tfrac{\mathrm{e}^{4} - 1}{16} = \tfrac{3\mathrm{e}^{4} + 1}{16} \approx 10.3$. (13.6 omits the second term.)`,
    hints: ["Take u = ln x.", "ln e = 1 and ln 1 = 0."],
  });

  checkAntideriv((x) => x * log(x) - x, log, 1, 3, "q7");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\ln x\,dx$.`,
    options: [
      [t`$x\ln x - x + c$`, t`Correct: write $\ln x = 1 \times \ln x$ with $u = \ln x$, $v = x$.`],
      [t`$\dfrac{1}{x} + c$`, t`That is the derivative of $\ln x$, not its integral.`],
      [t`$\dfrac{(\ln x)^{2}}{2} + c$`, t`That is $\int\frac{\ln x}{x}\,dx$, which has an extra factor $\frac{1}{x}$.`],
      [t`$x\ln x + c$`, t`Its derivative is $\ln x + 1$; the $-x$ term is missing.`],
    ],
    answer: "A",
    explanation: t`$\int 1 \cdot \ln x\,dx = x\ln x - \int x \cdot \frac{1}{x}\,dx = x\ln x - x + c$.`,
    hints: ["Treat ln x as 1 × ln x."],
  });

  const v8 = I(log, 1, 2, 2 * log(2) - 1, "q8");
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{1}^{2}\ln x\,dx$, correct to 3 significant figures.`,
    value: v8, wrong: [1.39, 0.693],
    explanation: t`$\Big[x\ln x - x\Big]_{1}^{2} = (2\ln 2 - 2) - (0 - 1) = 2\ln 2 - 1 \approx 0.386$. (1.39 omits the $-x$ term.)`,
    hints: ["Use ∫ ln x dx = x ln x − x."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $\displaystyle\int x\sin x\,dx$, choosing $u = \sin x$ and $\dfrac{dv}{dx} = x$ makes the integral simpler.`,
    answer: false,
    explanation: t`False. Then $v = \frac{x^{2}}{2}$ and the new integral is $\int\frac{x^{2}}{2}\cos x\,dx$, which is harder. Choose $u = x$, so $\frac{du}{dx} = 1$.`,
  });

  const v10 = I((x) => x * x * exp(x), 0, 1, E - 2, "q10");
  checkAntideriv((x) => exp(x) * (x * x - 2 * x + 2), (x) => x * x * exp(x), 0, 1, "q10 anti");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{1} x^{2}\mathrm{e}^{x}\,dx$, correct to 3 significant figures.`,
    value: v10, wrong: [2.72, 1],
    explanation: t`Twice by parts: $\int x^{2}\mathrm{e}^{x}\,dx = \mathrm{e}^{x}(x^{2} - 2x + 2) + c$. $\Big[\mathrm{e}^{x}(x^{2} - 2x + 2)\Big]_{0}^{1} = \mathrm{e} - 2 \approx 0.718$.`,
    hints: ["Apply integration by parts twice, with u = x² then u = 2x.", "At x = 0 the bracket equals 2."],
  });

  checkAntideriv((x) => x * sin(x) + cos(x), (x) => x * cos(x), 0, 2, "q11a");
  checkAntideriv((x) => -x * cos(x) + sin(x), (x) => x * sin(x), 0, 2, "q11b");
  checkAntideriv((x) => (x * x / 2) * log(x) - x * x / 4, (x) => x * log(x), 1, 2, "q11c");
  checkAntideriv((x) => -(x + 1) * exp(-x), (x) => x * exp(-x), 0, 2, "q11d");
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each integrand with its indefinite integral (the + c is omitted).",
    pairs: [
      [t`$x\cos x$`, t`$x\sin x + \cos x$`],
      [t`$x\sin x$`, t`$\sin x - x\cos x$`],
      [t`$x\ln x$`, t`$\tfrac{x^{2}}{2}\ln x - \tfrac{x^{2}}{4}$`],
      [t`$x\mathrm{e}^{-x}$`, t`$-(x + 1)\mathrm{e}^{-x}$`],
    ],
    explanation: "Each comes from one application of integration by parts; check by differentiating with the product rule.",
    hints: ["Differentiate each answer to test it."],
  });

  const v12 = I(atan, 0, 1, PI / 4 - 0.5 * log(2), "q12");
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Use integration by parts to evaluate $\displaystyle\int_{0}^{1}\tan^{-1}x\,dx$, correct to 3 significant figures.`,
    value: v12, wrong: [0.785, 1.13],
    explanation: t`$u = \tan^{-1}x$, $v = x$: $\Big[x\tan^{-1}x\Big]_{0}^{1} - \int_{0}^{1}\frac{x}{1 + x^{2}}\,dx = \frac{\pi}{4} - \frac{1}{2}\ln 2 \approx 0.439$.`,
    workedSolution: [
      t`1. Write $\tan^{-1}x = 1 \times \tan^{-1}x$: $u = \tan^{-1}x$, $\frac{du}{dx} = \frac{1}{1 + x^{2}}$, $v = x$.`,
      t`2. $\displaystyle\int_{0}^{1}\tan^{-1}x\,dx = \Big[x\tan^{-1}x\Big]_{0}^{1} - \int_{0}^{1}\frac{x}{1 + x^{2}}\,dx$.`,
      t`3. The last integral is $\Big[\tfrac{1}{2}\ln(1 + x^{2})\Big]_{0}^{1} = \tfrac{1}{2}\ln 2$.`,
      t`4. Answer: $\frac{\pi}{4} - \frac{1}{2}\ln 2 \approx 0.439$.`,
    ].join("\n"),
    hints: ["Treat tan⁻¹ x as 1 × tan⁻¹ x.", "The remaining integral is of the form f′/f."],
  });

  I((x) => exp(x) * sin(x), 0, PI, (exp(PI) + 1) / 2, "q13");
  b.proof({
    d: 5, skill: "ANALYSIS", marks: 4, calculator: false,
    stem: t`Let $I = \displaystyle\int_{0}^{\pi}\mathrm{e}^{x}\sin x\,dx$. By integrating by parts twice, show that $I = \dfrac{\mathrm{e}^{\pi} + 1}{2}$.`,
    points: [
      t`M1 first application: $I = \Big[-\mathrm{e}^{x}\cos x\Big]_{0}^{\pi} + \int_{0}^{\pi}\mathrm{e}^{x}\cos x\,dx = \mathrm{e}^{\pi} + 1 + \int_{0}^{\pi}\mathrm{e}^{x}\cos x\,dx$`,
      t`M1 second application: $\int_{0}^{\pi}\mathrm{e}^{x}\cos x\,dx = \Big[\mathrm{e}^{x}\sin x\Big]_{0}^{\pi} - I = -I$`,
      t`M1 forms the equation $I = \mathrm{e}^{\pi} + 1 - I$`,
      t`A1 solves to $I = \dfrac{\mathrm{e}^{\pi} + 1}{2}$`,
    ],
    modelAnswer: ["With $u = \\mathrm{e}^{x}$ both times (or $u = \\sin x$, then $u = \\cos x$, consistently):", "", "$$", t`I = \Big[-\mathrm{e}^{x}\cos x\Big]_{0}^{\pi} + \int_{0}^{\pi}\mathrm{e}^{x}\cos x\,dx = (\mathrm{e}^{\pi} + 1) + \int_{0}^{\pi}\mathrm{e}^{x}\cos x\,dx`, "$$", "", "$$", t`\int_{0}^{\pi}\mathrm{e}^{x}\cos x\,dx = \Big[\mathrm{e}^{x}\sin x\Big]_{0}^{\pi} - \int_{0}^{\pi}\mathrm{e}^{x}\sin x\,dx = 0 - I`, "$$", "", "$$", t`I = \mathrm{e}^{\pi} + 1 - I \Rightarrow I = \frac{\mathrm{e}^{\pi} + 1}{2}`, "$$"].join("\n"),
    explanation: "The original integral reappears, so treat I as an unknown and solve for it.",
    hints: ["Keep the same type of choice for u in both applications.", "cos π = −1 and sin π = 0."],
  });

  const v14 = I((x) => x * exp(-x), 0, 2, 1 - 3 * exp(-2), "q14");
  b.num({
    d: 4, skill: "APPLICATION", calculator: true, unit: "units²",
    stem: t`Find the area of the region between the curve $y = x\mathrm{e}^{-x}$, the $x$-axis and the line $x = 2$, correct to 3 significant figures.`,
    value: v14, wrong: [0.729, 1.27],
    explanation: t`$\int x\mathrm{e}^{-x}\,dx = -x\mathrm{e}^{-x} - \mathrm{e}^{-x} = -(x + 1)\mathrm{e}^{-x}$. $\Big[-(x + 1)\mathrm{e}^{-x}\Big]_{0}^{2} = -3\mathrm{e}^{-2} + 1 \approx 0.594$.`,
    hints: ["u = x, dv/dx = e^(−x), v = −e^(−x)."],
  });

  checkAntideriv((x) => (x ** 3 / 3) * log(x) - x ** 3 / 9, (x) => x * x * log(x), 1, 3, "q15");
  b.mcq({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int x^{2}\ln x\,dx$.`,
    options: [
      [t`$\dfrac{x^{3}}{3}\ln x - \dfrac{x^{3}}{9} + c$`, t`Correct: $u = \ln x$, $v = \frac{x^{3}}{3}$, then $\int\frac{x^{2}}{3}\,dx = \frac{x^{3}}{9}$.`],
      [t`$\dfrac{x^{3}}{3}\ln x - \dfrac{x^{3}}{3} + c$`, t`The remaining integral is $\int\frac{x^{3}}{3} \cdot \frac{1}{x}\,dx = \frac{x^{3}}{9}$, not $\frac{x^{3}}{3}$.`],
      [t`$\dfrac{x^{3}}{3}\ln x + \dfrac{x^{3}}{9} + c$`, "The second term must be subtracted."],
      [t`$2x\ln x + x + c$`, "This differentiates x² ln x instead of integrating it."],
    ],
    answer: "A",
    explanation: t`$\int x^{2}\ln x\,dx = \frac{x^{3}}{3}\ln x - \int\frac{x^{3}}{3} \cdot \frac{1}{x}\,dx = \frac{x^{3}}{3}\ln x - \frac{x^{3}}{9} + c$.`,
    hints: ["Choose u = ln x."],
  });

  chk(integrate((x) => x * 2 * exp(-2 * x), 0, 30, 200000), 0.5, 1e-7, "q16");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The mean of an exponential distribution with parameter 2 is $\displaystyle\int_{0}^{\infty} 2x\mathrm{e}^{-2x}\,dx$. Evaluate this improper integral, as an exact decimal.`,
    value: 0.5, dp: 1, wrong: [2, 0.25],
    explanation: t`$u = x$, $v = -\mathrm{e}^{-2x}$: $\int_{0}^{N} 2x\mathrm{e}^{-2x}\,dx = \Big[-x\mathrm{e}^{-2x}\Big]_{0}^{N} + \int_{0}^{N}\mathrm{e}^{-2x}\,dx = -N\mathrm{e}^{-2N} + \tfrac{1}{2}(1 - \mathrm{e}^{-2N}) \to \tfrac{1}{2}$ as $N \to \infty$.`,
    hints: [t`$N\mathrm{e}^{-2N} \to 0$ as $N \to \infty$.`],
  });

  // struct 5: I = ∫₀² x e^(−2x) dx = (1 − 5e^(−4))/4
  const v17 = I((x) => x * exp(-2 * x), 0, 2, (1 - 5 * exp(-4)) / 4, "q17");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Let $I = \displaystyle\int_{0}^{2} x\mathrm{e}^{-2x}\,dx$.`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which choice of u and dv/dx should be used?",
        options: [
          [t`$u = x$, $\dfrac{dv}{dx} = \mathrm{e}^{-2x}$`, "Correct: x simplifies to 1 on differentiation."],
          [t`$u = \mathrm{e}^{-2x}$, $\dfrac{dv}{dx} = x$`, "This produces an integral of x² e^(−2x), which is harder."],
          [t`$u = x\mathrm{e}^{-2x}$, $\dfrac{dv}{dx} = 1$`, "This does not simplify the integrand."],
          [t`$u = -2x$, $\dfrac{dv}{dx} = \mathrm{e}^{x}$`, "These are not factors of the integrand."],
        ],
        answer: "A", explanation: t`Choose $u = x$ so that $\frac{du}{dx} = 1$.` }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that $I = \dfrac{1 - 5\mathrm{e}^{-4}}{4}$.`,
        points: [t`M1 obtains $\Big[-\tfrac{x}{2}\mathrm{e}^{-2x}\Big]_{0}^{2} + \tfrac{1}{2}\int_{0}^{2}\mathrm{e}^{-2x}\,dx$`, t`A1 evaluates $-\mathrm{e}^{-4} + \tfrac{1}{4}(1 - \mathrm{e}^{-4}) = \tfrac{1 - 5\mathrm{e}^{-4}}{4}$`],
        modelAnswer: ["$$", t`I = \Big[-\tfrac{x}{2}\mathrm{e}^{-2x}\Big]_{0}^{2} + \tfrac{1}{2}\int_{0}^{2}\mathrm{e}^{-2x}\,dx = -\mathrm{e}^{-4} + \tfrac{1}{2}\Big[-\tfrac{1}{2}\mathrm{e}^{-2x}\Big]_{0}^{2}`, "$$", "", "$$", t`= -\mathrm{e}^{-4} + \tfrac{1}{4}(1 - \mathrm{e}^{-4}) = \frac{1 - 5\mathrm{e}^{-4}}{4}`, "$$"].join("\n"),
        explanation: t`$v = -\tfrac{1}{2}\mathrm{e}^{-2x}$; keep track of the two minus signs.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find I correct to 3 significant figures.", value: v17, wrong: [0.245],
        explanation: t`$\frac{1 - 5\mathrm{e}^{-4}}{4} \approx 0.227$.` }),
    ],
    explanation: "One application of integration by parts on a definite integral, with the limits applied to uv.",
    hints: [t`$v = -\frac{1}{2}\mathrm{e}^{-2x}$.`, "Apply the limits to both parts."],
  });

  // struct 5: ∫₁^e (ln x)² dx = e − 2; volume π(e − 2)
  const v18 = I((x) => log(x) ** 2, 1, E, E - 2, "q18");
  checkAntideriv((x) => x * log(x) ** 2 - 2 * x * log(x) + 2 * x, (x) => log(x) ** 2, 1, 3, "q18 anti");
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The region $R$ is bounded by the curve $y = \ln x$, the $x$-axis and the line $x = \mathrm{e}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\displaystyle\int(\ln x)^{2}\,dx = x(\ln x)^{2} - 2\int\ln x\,dx$.`,
        points: [t`M1 uses $u = (\ln x)^{2}$, $\frac{du}{dx} = \frac{2\ln x}{x}$, $v = x$`, t`A1 simplifies $\int x \cdot \frac{2\ln x}{x}\,dx = 2\int\ln x\,dx$`],
        modelAnswer: ["$$", t`\int 1 \cdot (\ln x)^{2}\,dx = x(\ln x)^{2} - \int x \cdot \frac{2\ln x}{x}\,dx = x(\ln x)^{2} - 2\int\ln x\,dx`, "$$"].join("\n"),
        explanation: "Chain rule for the derivative of (ln x)²." }),
      P.num({ label: "(b)", marks: 2, stem: t`Hence evaluate $\displaystyle\int_{1}^{\mathrm{e}}(\ln x)^{2}\,dx$, correct to 3 significant figures.`, value: v18, wrong: [0.282],
        explanation: t`$\int(\ln x)^{2}\,dx = x(\ln x)^{2} - 2(x\ln x - x)$. $\Big[x(\ln x)^{2} - 2x\ln x + 2x\Big]_{1}^{\mathrm{e}} = (\mathrm{e} - 2\mathrm{e} + 2\mathrm{e}) - 2 = \mathrm{e} - 2 \approx 0.718$.` }),
      P.num({ label: "(c)", marks: 1, stem: "R is rotated through 360° about the x-axis. Find the volume, correct to 3 significant figures.", unit: "units³", value: PI * v18, wrong: [0.718],
        explanation: t`$V = \pi\int_{1}^{\mathrm{e}}(\ln x)^{2}\,dx = \pi(\mathrm{e} - 2) \approx 2.26$.` }),
    ],
    explanation: "Repeated integration by parts gives the integral needed for a volume of revolution.",
    hints: ["Treat (ln x)² as 1 × (ln x)².", "Use ∫ ln x dx = x ln x − x."],
  });

  b.card("FORMULA", "Integration by parts", t`$\displaystyle\int u\frac{dv}{dx}\,dx = uv - \int v\frac{du}{dx}\,dx$`, "In MF19.");
  b.card("CONCEPT", "Choosing u", t`Pick $u$ to simplify when differentiated: $\ln x$, then $\tan^{-1}x$, then powers of $x$, then exponentials and trig.`);
  b.card("FACT", "Integral of ln x", t`$\displaystyle\int\ln x\,dx = x\ln x - x + c$`);
  b.card("FACT", "Integral of x eˣ", t`$\displaystyle\int x\mathrm{e}^{x}\,dx = (x - 1)\mathrm{e}^{x} + c$`);
  b.card("CONCEPT", "Repeated parts", t`For $x^{2}\mathrm{e}^{x}$ or $x^{2}\sin x$, apply the method twice to remove the power.`);
  b.card("CONCEPT", "When the integral reappears", t`For $\int\mathrm{e}^{x}\sin x\,dx$, parts twice gives an equation in $I$: solve for $I$.`);
  b.card("FACT", "Definite integrals by parts", t`$\displaystyle\int_{a}^{b} u v'\,dx = \Big[uv\Big]_{a}^{b} - \int_{a}^{b} v u'\,dx$`);
  b.card("FACT", "Where by parts is examined", "Cambridge Paper 3 only; ZIMSEC Pure Form 5 (and used in ZIMSEC Statistics for the exponential distribution).");
});
