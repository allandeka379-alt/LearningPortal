// W2a: amaths.integ.recognition-substitution (ZIMSEC; Cambridge P3 with a given substitution).
import { concept, P, t, chk, checkAntideriv, integrate } from "../lib.mjs";

const { exp, log, sin, cos, tan, sqrt, PI, asin, abs } = Math;
const I = (f, a, b, exact, label) => chk(integrate(f, a, b), exact, 1e-7 * Math.max(1, abs(exact)), label);

concept("amaths.integ.recognition-substitution", { file: "integ/recognition-substitution", keyPrefix: "integ.recognition-substitution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which result is correct for any differentiable function $f$ with $f(x) \neq 0$?`,
    options: [
      [t`$\displaystyle\int\frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + c$`, "Correct: the derivative of ln|f(x)| is f′(x)/f(x)."],
      [t`$\displaystyle\int\frac{f'(x)}{f(x)}\,dx = \frac{1}{f(x)} + c$`, "Differentiating 1/f(x) gives −f′(x)/[f(x)]², not f′(x)/f(x)."],
      [t`$\displaystyle\int\frac{f'(x)}{f(x)}\,dx = \ln|f'(x)| + c$`, "The logarithm is of the function, not of its derivative."],
      [t`$\displaystyle\int\frac{f'(x)}{f(x)}\,dx = f(x)\ln|f(x)| + c$`, "This has an extra factor f(x); its derivative contains f′(x)ln|f(x)|."],
    ],
    answer: "A",
    explanation: t`By the chain rule, $\frac{d}{dx}\ln|f(x)| = \frac{f'(x)}{f(x)}$, so reversing it gives the result.`,
  });

  checkAntideriv((x) => log(x * x + 5), (x) => (2 * x) / (x * x + 5), 0, 2, "q2");
  b.expr({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find $\displaystyle\int\frac{2x}{x^{2} + 5}\,dx$. Type ln for the natural logarithm and include the constant, for example ln(x^2+1)+c.`,
    accepted: ["ln(x^2+5)+c", "ln|x^2+5|+c", "ln(5+x^2)+c", "ln(x²+5)+c", "ln(x^2+5)+k", "ln(x^2+5)+C"],
    wrong: ["2ln(x^2+5)+c"],
    explanation: t`The numerator $2x$ is the derivative of the denominator, so the integral is $\ln(x^{2} + 5) + c$ (no modulus needed since $x^{2} + 5 > 0$).`,
  });

  checkAntideriv((x) => log(sin(x) + 3), (x) => cos(x) / (sin(x) + 3), 0, 2, "q3");
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\frac{\cos x}{\sin x + 3}\,dx$.`,
    options: [
      [t`$\ln(\sin x + 3) + c$`, t`Correct: $\cos x$ is the derivative of $\sin x + 3$.`],
      [t`$-\ln(\sin x + 3) + c$`, t`The derivative of $\sin x$ is $+\cos x$, so no minus sign is needed.`],
      [t`$\dfrac{\sin x}{\sin x + 3} + c$`, "Integrating the numerator alone does not integrate the fraction."],
      [t`$\ln(\cos x) + c$`, "The logarithm is of the denominator, not of the numerator."],
    ],
    answer: "A",
    explanation: t`$\int\frac{f'(x)}{f(x)}\,dx = \ln|f(x)|$ with $f(x) = \sin x + 3 > 0$.`,
  });

  const v4 = I((x) => (3 * x) / (x * x + 4), 0, 2, 1.5 * log(2), "q4");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{2}\frac{3x}{x^{2} + 4}\,dx$, correct to 3 significant figures.`,
    value: v4, wrong: [2.08, 0.693],
    explanation: t`$\frac{3x}{x^{2} + 4} = \frac{3}{2} \cdot \frac{2x}{x^{2} + 4}$. So the integral is $\frac{3}{2}\Big[\ln(x^{2} + 4)\Big]_{0}^{2} = \frac{3}{2}(\ln 8 - \ln 4) = \frac{3}{2}\ln 2 \approx 1.04$. (2.08 forgets the $\frac{1}{2}$.)`,
    hints: ["The derivative of x² + 4 is 2x.", "ln 8 − ln 4 = ln 2."],
  });

  checkAntideriv((x) => (x ** 3 - 1) ** 5 / 15, (x) => x * x * (x ** 3 - 1) ** 4, 0, 1.5, "q5");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$\displaystyle\int x^{2}(x^{3} - 1)^{4}\,dx = \frac{(x^{3} - 1)^{5}}{k} + c$. Find $k$.`,
    template: "k = {{blank:k}}",
    blanks: [{ id: "k", input: "number", accepted: [15], wrong: 5 }],
    explanation: t`$x^{2} = \frac{1}{3} \cdot 3x^{2}$, so the integral is $\frac{1}{3} \cdot \frac{(x^{3} - 1)^{5}}{5} + c$ and $k = 15$.`,
    hints: ["The derivative of x³ − 1 is 3x²."],
  });

  const v6 = I(tan, 0, PI / 4, log(sqrt(2)), "q6");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Evaluate $\displaystyle\int_{0}^{\pi/4}\tan x\,dx$, correct to 3 significant figures.`,
    value: v6, wrong: [1, 0.693],
    explanation: t`$\int \tan x\,dx = \ln|\sec x|$. $\Big[\ln\sec x\Big]_{0}^{\pi/4} = \ln\sqrt{2} - \ln 1 = \frac{1}{2}\ln 2 \approx 0.347$.`,
    hints: [t`$\tan x = \frac{\sin x}{\cos x}$, and $-\sin x$ is the derivative of $\cos x$.`],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Using the substitution $u = 1 + x^{2}$, which integral is equal to $\displaystyle\int x\sqrt{1 + x^{2}}\,dx$?`,
    options: [
      [t`$\dfrac{1}{2}\displaystyle\int\sqrt{u}\,du$`, t`Correct: $du = 2x\,dx$, so $x\,dx = \frac{1}{2}du$.`],
      [t`$\displaystyle\int\sqrt{u}\,du$`, t`$du = 2x\,dx$, so $x\,dx$ is half of $du$.`],
      [t`$2\displaystyle\int\sqrt{u}\,du$`, t`This multiplies by $2$ instead of dividing: $x\,dx = \frac{1}{2}du$.`],
      [t`$\displaystyle\int x\sqrt{u}\,du$`, t`The $x$ must be absorbed into $du$; the integral cannot mix $x$ and $u$.`],
    ],
    answer: "A",
    explanation: t`$\frac{du}{dx} = 2x$, so $x\,dx = \frac{1}{2}\,du$, and the integral becomes $\frac{1}{2}\int u^{\frac{1}{2}}\,du = \frac{1}{3}u^{\frac{3}{2}} + c$.`,
    hints: ["Find du in terms of dx."],
  });

  const v8 = I((x) => x * (1 - x) ** 5, 0, 1, 1 / 42, "q8");
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Use the substitution $u = 1 - x$ to evaluate $\displaystyle\int_{0}^{1}x(1 - x)^{5}\,dx$, correct to 3 significant figures.`,
    value: v8, wrong: [0.167, -0.0238],
    explanation: t`$x = 1 - u$, $dx = -du$; $x = 0 \Rightarrow u = 1$, $x = 1 \Rightarrow u = 0$. $\int_{1}^{0}(1 - u)u^{5}(-du) = \int_{0}^{1}(u^{5} - u^{6})\,du = \frac{1}{6} - \frac{1}{7} = \frac{1}{42} \approx 0.0238$.`,
    hints: ["dx = −du; the minus sign swaps the limits back.", "Expand (1 − u)u⁵."],
  });

  checkAntideriv((x) => exp(x * x), (x) => 2 * x * exp(x * x), 0, 1, "q9");
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\int 2x\,\mathrm{e}^{x^{2}}\,dx = \mathrm{e}^{x^{2}} + c$.`,
    answer: true,
    explanation: t`True. $2x$ is the derivative of the power $x^{2}$, so this is a chain-rule derivative in reverse: $\frac{d}{dx}\mathrm{e}^{x^{2}} = 2x\mathrm{e}^{x^{2}}$. (Without the factor $x$, $\int \mathrm{e}^{x^{2}}\,dx$ has no elementary answer.)`,
  });

  checkAntideriv((x) => -log(cos(x)), tan, 0, 1, "q10a");
  checkAntideriv((x) => log(exp(x) + 2), (x) => exp(x) / (exp(x) + 2), 0, 1, "q10b");
  checkAntideriv((x) => sin(x) ** 4 / 4, (x) => sin(x) ** 3 * cos(x), 0, 1, "q10c");
  checkAntideriv((x) => -1 / (x * x + 1), (x) => (2 * x) / (x * x + 1) ** 2, 0, 1, "q10d");
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each integrand with its indefinite integral (the + c is omitted).",
    pairs: [
      [t`$\tan x$`, t`$-\ln|\cos x|$`],
      [t`$\dfrac{\mathrm{e}^{x}}{\mathrm{e}^{x} + 2}$`, t`$\ln(\mathrm{e}^{x} + 2)$`],
      [t`$\sin^{3}x\cos x$`, t`$\tfrac{1}{4}\sin^{4}x$`],
      [t`$\dfrac{2x}{(x^{2} + 1)^{2}}$`, t`$-\dfrac{1}{x^{2} + 1}$`],
    ],
    explanation: t`Each integrand is $f'(x)/f(x)$ or $f'(x)[f(x)]^{n}$ for a suitable $f$: $\cos x$, $\mathrm{e}^{x} + 2$, $\sin x$ and $x^{2} + 1$.`,
    hints: ["For each, look for a function whose derivative is also present."],
  });

  const v11 = I((x) => sin(x) * cos(x) ** 3, 0, PI / 2, 0.25, "q11");
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Evaluate $\displaystyle\int_{0}^{\pi/2}\sin x\cos^{3}x\,dx$ exactly, as a decimal.`,
    value: v11, dp: 2, wrong: [-0.25, 1],
    explanation: t`$-\sin x$ is the derivative of $\cos x$: $\int\sin x\cos^{3}x\,dx = -\frac{1}{4}\cos^{4}x$. $\Big[-\tfrac{1}{4}\cos^{4}x\Big]_{0}^{\pi/2} = 0 - (-\tfrac{1}{4}) = 0.25$.`,
    workedSolution: [
      t`1. With $u = \cos x$, $du = -\sin x\,dx$.`,
      t`2. $\displaystyle\int\sin x\cos^{3}x\,dx = -\int u^{3}\,du = -\tfrac{1}{4}\cos^{4}x + c$.`,
      t`3. $\Big[-\tfrac{1}{4}\cos^{4}x\Big]_{0}^{\pi/2} = 0 + \tfrac{1}{4} = 0.25$.`,
    ].join("\n"),
    hints: ["Which factor is (minus) the derivative of the other?"],
  });

  const v12 = I((x) => 1 / (sqrt(x) * (1 + sqrt(x))), 1, 4, 2 * log(1.5), "q12");
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Use the substitution $u = \sqrt{x}$ to evaluate $\displaystyle\int_{1}^{4}\frac{1}{\sqrt{x}\,(1 + \sqrt{x})}\,dx$, correct to 3 significant figures.`,
    value: v12, wrong: [0.405, 1.10],
    explanation: t`$x = u^{2}$, $dx = 2u\,du$; limits $u = 1$ to $u = 2$. The integral becomes $\int_{1}^{2}\frac{2u}{u(1 + u)}\,du = 2\Big[\ln(1 + u)\Big]_{1}^{2} = 2\ln\frac{3}{2} \approx 0.811$. (0.405 loses the factor 2.)`,
    hints: ["dx = 2u du.", "New limits: √1 and √4."],
  });

  checkAntideriv((x) => log(exp(x) + 1), (x) => exp(x) / (exp(x) + 1), 0, 2, "q13");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int\frac{\mathrm{e}^{x}}{\mathrm{e}^{x} + 1}\,dx$. Type e^x for the exponential and include the constant, for example ln(e^x+4)+c.`,
    accepted: ["ln(e^x+1)+c", "ln|e^x+1|+c", "ln(1+e^x)+c", "ln(e^x+1)+k", "ln(e^x+1)+C", "ln(e^(x)+1)+c"],
    wrong: ["x+c"],
    explanation: t`The numerator $\mathrm{e}^{x}$ is the derivative of the denominator $\mathrm{e}^{x} + 1$, so the integral is $\ln(\mathrm{e}^{x} + 1) + c$.`,
    hints: ["Differentiate the denominator."],
  });

  I((x) => x / sqrt(2 * x + 1), 0, 4, 10 / 3, "q14");
  b.proof({
    d: 4, skill: "ANALYSIS", marks: 4, calculator: false,
    stem: t`Use the substitution $u = 2x + 1$ to show that $\displaystyle\int_{0}^{4}\frac{x}{\sqrt{2x + 1}}\,dx = \frac{10}{3}$.`,
    points: [
      t`B1 states $x = \frac{u - 1}{2}$, $dx = \frac{1}{2}du$ and the new limits $u = 1$, $u = 9$`,
      t`M1 obtains $\frac{1}{4}\displaystyle\int_{1}^{9}\left(u^{\frac{1}{2}} - u^{-\frac{1}{2}}\right)du$`,
      t`M1 integrates to $\frac{1}{4}\Big[\tfrac{2}{3}u^{\frac{3}{2}} - 2u^{\frac{1}{2}}\Big]_{1}^{9}$`,
      t`A1 evaluates $\frac{1}{4}\left[(18 - 6) - \left(\tfrac{2}{3} - 2\right)\right] = \frac{10}{3}$`,
    ],
    modelAnswer: ["$$", t`\int_{1}^{9}\frac{u - 1}{2}u^{-\frac{1}{2}} \cdot \frac{1}{2}\,du = \frac{1}{4}\int_{1}^{9}\left(u^{\frac{1}{2}} - u^{-\frac{1}{2}}\right)du`, "$$", "", "$$", t`= \frac{1}{4}\Big[\tfrac{2}{3}u^{\frac{3}{2}} - 2u^{\frac{1}{2}}\Big]_{1}^{9} = \frac{1}{4}\left[(18 - 6) - \left(\tfrac{2}{3} - 2\right)\right] = \frac{1}{4} \cdot \frac{40}{3} = \frac{10}{3}`, "$$"].join("\n"),
    explanation: "Rearrange the substitution for x, replace dx, change the limits, then split the fraction.",
    hints: ["x = (u − 1)/2.", "When x = 4, u = 9."],
  });

  checkAntideriv((x) => log(log(x)), (x) => 1 / (x * log(x)), 2, 5, "q15");
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find $\displaystyle\int\frac{1}{x\ln x}\,dx$ for $x > 1$.`,
    options: [
      [t`$\ln(\ln x) + c$`, t`Correct: $\frac{1/x}{\ln x}$ is $f'(x)/f(x)$ with $f(x) = \ln x$.`],
      [t`$\dfrac{(\ln x)^{2}}{2} + c$`, t`This is $\int \frac{\ln x}{x}\,dx$, with the logarithm in the numerator.`],
      [t`$\ln x \cdot \ln x + c$`, "This is the same mistake as squaring ln x; its derivative is 2 ln x / x."],
      [t`$\ln(x\ln x) + c$`, t`Its derivative is $\frac{\ln x + 1}{x\ln x}$, not $\frac{1}{x\ln x}$.`],
    ],
    answer: "A",
    explanation: t`Write the integrand as $\dfrac{1/x}{\ln x}$. Since $\frac{d}{dx}\ln x = \frac{1}{x}$, the integral is $\ln|\ln x| + c = \ln(\ln x) + c$ for $x > 1$.`,
    hints: ["Which function has derivative 1/x?"],
  });

  // struct 4: ∫₀^{π/2} sin³x dx = 2/3 via u = cos x
  const v16 = I((x) => sin(x) ** 3, 0, PI / 2, 2 / 3, "q16");
  I((x) => cos(x) ** 3, 0, PI / 2, 2 / 3, "q16c");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`This question uses the substitution $u = \cos x$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\displaystyle\int_{0}^{\pi/2}\sin^{3}x\,dx = \int_{0}^{1}(1 - u^{2})\,du$.`,
        points: [t`M1 writes $\sin^{3}x = \sin x(1 - \cos^{2}x)$ and uses $du = -\sin x\,dx$`, t`A1 changes the limits ($x = 0 \to u = 1$, $x = \frac{\pi}{2} \to u = 0$) and uses the minus sign to swap them`],
        modelAnswer: ["$$", t`\int_{0}^{\pi/2}\sin x(1 - \cos^{2}x)\,dx = \int_{1}^{0}(1 - u^{2})(-du) = \int_{0}^{1}(1 - u^{2})\,du`, "$$"].join("\n"),
        explanation: "The minus sign from du = −sin x dx reverses the limits." }),
      P.num({ label: "(b)", marks: 1, stem: "Hence evaluate the integral, correct to 3 significant figures.", value: v16, wrong: [0.333],
        explanation: t`$\Big[u - \tfrac{u^{3}}{3}\Big]_{0}^{1} = \tfrac{2}{3} \approx 0.667$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Using a similar substitution, $u = \sin x$, evaluate $\displaystyle\int_{0}^{\pi/2}\cos^{3}x\,dx$, correct to 3 significant figures.`, value: 2 / 3, wrong: [-0.667],
        explanation: t`$\cos^{3}x = \cos x(1 - \sin^{2}x)$ and $du = \cos x\,dx$: $\int_{0}^{1}(1 - u^{2})\,du = \tfrac{2}{3}$.` }),
    ],
    explanation: "Odd powers of sine or cosine: keep one factor for du and write the rest with sin²x + cos²x = 1.",
    hints: ["sin²x = 1 − cos²x.", "Change the limits with u = cos x."],
  });

  // struct 5: ∫₀¹ 1/√(4 − x²) dx with x = 2 sin θ = π/6
  const v17 = I((x) => 1 / sqrt(4 - x * x), 0, 1, PI / 6, "q17");
  chk(asin(0.5), PI / 6, 1e-12);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Use the substitution $x = 2\sin\theta$ to evaluate $\displaystyle\int_{0}^{1}\frac{1}{\sqrt{4 - x^{2}}}\,dx$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the integral becomes $\displaystyle\int d\theta$ between suitable limits.`,
        points: [t`M1 uses $dx = 2\cos\theta\,d\theta$ and $\sqrt{4 - 4\sin^{2}\theta} = 2\cos\theta$`, t`A1 simplifies the integrand to 1`],
        modelAnswer: ["$$", t`\frac{1}{\sqrt{4 - 4\sin^{2}\theta}} \cdot 2\cos\theta\,d\theta = \frac{2\cos\theta}{2\cos\theta}\,d\theta = d\theta`, "$$"].join("\n"),
        explanation: t`$1 - \sin^{2}\theta = \cos^{2}\theta$, and $\cos\theta > 0$ for the angles used.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the new limits for θ, in radians to 3 decimal places.", template: "From θ = {{blank:a}} to θ = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: ["0"], tolerance: 0.0005, wrong: 1 }, { id: "b", input: "number", accepted: ["0.524"], tolerance: 0.0005, wrong: 30 }],
        explanation: t`$x = 0 \Rightarrow \sin\theta = 0$, $\theta = 0$. $x = 1 \Rightarrow \sin\theta = \frac{1}{2}$, $\theta = \frac{\pi}{6} \approx 0.524$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Hence evaluate the integral, correct to 3 significant figures.", value: v17, wrong: [30],
        explanation: t`$\int_{0}^{\pi/6} d\theta = \frac{\pi}{6} \approx 0.524$.` }),
    ],
    explanation: t`A trigonometric substitution turns $\sqrt{a^{2} - x^{2}}$ into $a\cos\theta$.`,
    hints: ["Replace dx as well as x.", "Use radians for the limits."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2, calculator: false,
    stem: t`Thandeka evaluates $\displaystyle\int_{0}^{\pi/2}\sin^{2}2x\cos x\,dx$ with $u = \sin x$ but keeps the limits $0$ and $\frac{\pi}{2}$ for $u$. Explain her error and how to correct it.`,
    points: [t`The limits are $x$-values; after substituting, the integral is in $u$, so the limits must be $u$-values`, t`Correct limits: $u = \sin 0 = 0$ and $u = \sin\frac{\pi}{2} = 1$ (or substitute back to $x$ before using the original limits)`],
    modelAnswer: "The limits 0 and π/2 belong to x. Once the integral is in terms of u, she must use the u-values: u = sin 0 = 0 and u = sin(π/2) = 1. Alternatively she could integrate, write the answer back in terms of x, and then use the x-limits.",
    explanation: "A definite substitution changes the variable, so the limits must change with it.",
    hints: ["What does u equal when x = π/2?"],
  });

  b.card("FORMULA", "Recognition: logarithm pattern", t`$\displaystyle\int\frac{f'(x)}{f(x)}\,dx = \ln|f(x)| + c$`);
  b.card("FORMULA", "Recognition: power pattern", t`$\displaystyle\int f'(x)[f(x)]^{n}\,dx = \frac{[f(x)]^{n + 1}}{n + 1} + c$, $n \neq -1$`);
  b.card("FACT", "Integral of tan x", t`$\displaystyle\int\tan x\,dx = \ln|\sec x| + c = -\ln|\cos x| + c$`);
  b.card("CONCEPT", "Substitution steps", "Choose u; replace dx using du/dx; write everything in u; change the limits; integrate.");
  b.card("CONCEPT", "Changing limits", t`For $\int_{a}^{b}$ with $u = g(x)$, the new limits are $g(a)$ and $g(b)$.`);
  b.card("FACT", "Who chooses the substitution?", "Cambridge Paper 3 always gives it; ZIMSEC may ask you to choose a suitable one.");
  b.card("CONCEPT", "Odd powers of sin or cos", t`Keep one factor for $du$; write the rest using $\sin^{2}x + \cos^{2}x = 1$.`);
  b.card("CONCEPT", "Adjusting a constant", t`$\displaystyle\int\frac{x}{x^{2} + 1}\,dx = \frac{1}{2}\int\frac{2x}{x^{2} + 1}\,dx = \frac{1}{2}\ln(x^{2} + 1) + c$`);
});
