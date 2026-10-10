// W2a: amaths.diff.product-quotient (both boards).
import { concept, P, t, chk, checkDeriv, same } from "../lib.mjs";

const XS = [0.5, 1.2, 2.6];
const { exp, log, sin, cos, sqrt, PI, E } = Math;

concept("amaths.diff.product-quotient", { file: "diff/product-quotient", keyPrefix: "diff.product-quotient" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`If $y = uv$, where $u$ and $v$ are functions of $x$, which expression is $\dfrac{dy}{dx}$?`,
    options: [
      [t`$u\dfrac{dv}{dx} + v\dfrac{du}{dx}$`, "Correct: the product rule."],
      [t`$\dfrac{du}{dx} \times \dfrac{dv}{dx}$`, "The derivative of a product is not the product of the derivatives."],
      [t`$u\dfrac{dv}{dx} - v\dfrac{du}{dx}$`, "The two terms are added; a minus sign appears only in the quotient rule."],
      [t`$\dfrac{du}{dv}$`, "This is the rate of change of u with respect to v, unrelated to the product."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}(uv) = u\dfrac{dv}{dx} + v\dfrac{du}{dx}$ (MF19).`,
  });

  const g2 = (x) => sin(x) + x * cos(x);
  checkDeriv((x) => x * sin(x), g2, XS, "q2");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the gradient of the curve $y = x\sin x$ at the point where $x = \dfrac{\pi}{2}$.`,
    value: chk(g2(PI / 2), 1, 1e-12), wrong: [0, 1.57],
    explanation: t`$\dfrac{dy}{dx} = \sin x + x\cos x$. At $x = \frac{\pi}{2}$: $1 + \frac{\pi}{2} \times 0 = 1$.`,
  });

  checkDeriv((x) => x * exp(2 * x), (x) => exp(2 * x) * (1 + 2 * x), XS, "q3");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = x\mathrm{e}^{2x}$, write $\dfrac{dy}{dx}$ in the form $\mathrm{e}^{2x}(a + bx)$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [1], wrong: 2 },
      { id: "b", input: "number", accepted: [2], wrong: 1 },
    ],
    explanation: t`$u = x$, $v = \mathrm{e}^{2x}$: $\dfrac{dy}{dx} = x \cdot 2\mathrm{e}^{2x} + \mathrm{e}^{2x} \cdot 1 = \mathrm{e}^{2x}(1 + 2x)$.`,
    hints: ["Remember the chain-rule factor 2 in the derivative of e^(2x)."],
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`If $y = \dfrac{u}{v}$, which expression is $\dfrac{dy}{dx}$?`,
    options: [
      [t`$\dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^{2}}$`, "Correct: the quotient rule."],
      [t`$\dfrac{u\frac{dv}{dx} - v\frac{du}{dx}}{v^{2}}$`, "The numerator is the wrong way round, which reverses the sign of the answer."],
      [t`$\dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v}$`, "The denominator must be squared."],
      [t`$\dfrac{du/dx}{dv/dx}$`, "Dividing the derivatives does not give the derivative of the quotient."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\left(\dfrac{u}{v}\right) = \dfrac{v u' - u v'}{v^{2}}$: bottom times derivative of top, minus top times derivative of bottom, over bottom squared.`,
  });

  const g5 = (x) => (2 * x * (x - 2) - (x * x + 1)) / (x - 2) ** 2;
  checkDeriv((x) => (x * x + 1) / (x - 2), g5, [2.5, 3, 4], "q5");
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the gradient of $y = \dfrac{x^{2} + 1}{x - 2}$ at the point where $x = 3$.`,
    value: chk(g5(3), -4), wrong: [4, 16],
    explanation: t`$\dfrac{dy}{dx} = \dfrac{(x - 2)(2x) - (x^{2} + 1)(1)}{(x - 2)^{2}}$. At $x = 3$: $\dfrac{1 \times 6 - 10}{1} = -4$. (+4 has the numerator reversed.)`,
    hints: ["u = x² + 1, v = x − 2."],
  });

  checkDeriv((x) => x / (x + 1), (x) => 1 / (x + 1) ** 2, XS, "q6");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $\dfrac{x}{x + 1}$ with respect to $x$, simplifying fully. Type your answer as a single fraction, for example 2/(x+3)^2.`,
    accepted: ["1/(x+1)^2", "1/(1+x)^2", "(x+1)^-2", "(x+1)^(-2)", "1/(x^2+2x+1)", "1/((x+1)^2)"],
    wrong: ["-1/(x+1)^2", "(2x+1)/(x+1)^2"],
    explanation: t`$\dfrac{(x + 1)(1) - x(1)}{(x + 1)^{2}} = \dfrac{1}{(x + 1)^{2}}$.`,
    hints: ["Expand the numerator: the x terms cancel."],
  });

  const g7 = (x) => 2 * x * log(x) + x;
  checkDeriv((x) => x * x * log(x), g7, XS, "q7");
  chk(g7(E ** 3), 7 * E ** 3, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the gradient of the curve $y = x^{2}\ln x$ at the point where $x = \mathrm{e}^{3}$, correct to 3 significant figures.`,
    value: g7(E ** 3), wrong: [121, 20.1],
    explanation: t`$\dfrac{dy}{dx} = 2x\ln x + x$. At $x = \mathrm{e}^{3}$: $2\mathrm{e}^{3}(3) + \mathrm{e}^{3} = 7\mathrm{e}^{3} \approx 141$. (121 omits the term $x^{2} \cdot \frac{1}{x}$.)`,
    hints: [t`$\ln \mathrm{e}^{3} = 3$.`],
  });

  checkDeriv((x) => exp(x) / x, (x) => (exp(x) * (x - 1)) / (x * x), XS, "q8");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is $\dfrac{d}{dx}\left(\dfrac{\mathrm{e}^{x}}{x}\right)$?`,
    options: [
      [t`$\dfrac{\mathrm{e}^{x}(x - 1)}{x^{2}}$`, t`Correct: $\frac{x\mathrm{e}^{x} - \mathrm{e}^{x}}{x^{2}}$, with $\mathrm{e}^{x}$ taken out.`],
      [t`$\dfrac{\mathrm{e}^{x}(1 - x)}{x^{2}}$`, "The numerator has been reversed (top × derivative of bottom first)."],
      [t`$\dfrac{\mathrm{e}^{x}(x - 1)}{x}$`, "The denominator should be x²."],
      [t`$\mathrm{e}^{x}$`, "The derivatives of top and bottom were divided: eˣ ÷ 1."],
    ],
    answer: "A",
    explanation: t`$u = \mathrm{e}^{x}$, $v = x$: $\dfrac{x\mathrm{e}^{x} - \mathrm{e}^{x} \cdot 1}{x^{2}} = \dfrac{\mathrm{e}^{x}(x - 1)}{x^{2}}$.`,
    hints: ["Bottom times derivative of top comes first."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Applying the quotient rule to $\tan x = \dfrac{\sin x}{\cos x}$ gives $\dfrac{d}{dx}\tan x = \dfrac{1}{\cos^{2}x}$.`,
    answer: true,
    explanation: t`True. $\dfrac{\cos x\cos x - \sin x(-\sin x)}{\cos^{2}x} = \dfrac{\cos^{2}x + \sin^{2}x}{\cos^{2}x} = \dfrac{1}{\cos^{2}x} = \sec^{2}x$.`,
  });

  const g10 = (x) => x * (2 - x) * exp(-x);
  checkDeriv((x) => x * x * exp(-x), g10, XS, "q10");
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the $x$-coordinates of the stationary points of $y = x^{2}\mathrm{e}^{-x}$, smaller first.`,
    template: "x = {{blank:a}} and x = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [0], wrong: -2 },
      { id: "b", input: "number", accepted: [2], wrong: 1 },
    ],
    explanation: t`$\dfrac{dy}{dx} = 2x\mathrm{e}^{-x} - x^{2}\mathrm{e}^{-x} = x(2 - x)\mathrm{e}^{-x}$. Since $\mathrm{e}^{-x} > 0$, $\frac{dy}{dx} = 0$ at $x = 0$ and $x = 2$.`,
    hints: ["The derivative of e^(−x) is −e^(−x).", "Factorise out x e^(−x)."],
  });

  const y11 = (x) => log(x) / x;
  checkDeriv(y11, (x) => (1 - log(x)) / (x * x), XS, "q11");
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Find the maximum value of $y = \dfrac{\ln x}{x}$ for $x > 0$, correct to 3 significant figures.`,
    value: y11(E), prefix: "y =", wrong: [2.72, 1],
    explanation: t`$\dfrac{dy}{dx} = \dfrac{x \cdot \frac{1}{x} - \ln x}{x^{2}} = \dfrac{1 - \ln x}{x^{2}} = 0$ when $\ln x = 1$, $x = \mathrm{e}$. The maximum value is $\dfrac{1}{\mathrm{e}} \approx 0.368$.`,
    workedSolution: [
      t`1. Quotient rule with $u = \ln x$, $v = x$: $\dfrac{dy}{dx} = \dfrac{1 - \ln x}{x^{2}}$.`,
      t`2. Zero when $\ln x = 1$, so $x = \mathrm{e}$.`,
      t`3. For $x < \mathrm{e}$ the derivative is positive and for $x > \mathrm{e}$ negative, so this is a maximum.`,
      t`4. $y = \dfrac{\ln \mathrm{e}}{\mathrm{e}} = \dfrac{1}{\mathrm{e}} = 0.368$ (3 s.f.).`,
    ].join("\n"),
    hints: ["Set the numerator of the derivative to zero.", "Give the value of y."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each function with the most efficient method of differentiating it.",
    pairs: [
      [t`$x^{3}\cos x$`, "product rule"],
      [t`$\dfrac{\sin x}{x^{2} + 1}$`, "quotient rule (or product rule with a negative power)"],
      [t`$\sin(x^{3})$`, "chain rule only"],
      [t`$\dfrac{x^{3} + 2x}{x}$`, "divide first, then the power rule"],
    ],
    explanation: "Products need the product rule, quotients the quotient rule, a function of a function the chain rule; a single-term denominator can be divided out.",
  });

  const g13 = (x) => 4 / (x + 1) ** 2;
  checkDeriv((x) => (3 * x - 1) / (x + 1), g13, XS, "q13");
  chk(g13(1), 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The normal to the curve $y = \dfrac{3x - 1}{x + 1}$ at the point where $x = 1$ crosses the $x$-axis at $(k, 0)$. Find $k$.`,
    value: 2, prefix: "k =", wrong: [0, -2],
    explanation: t`At $x = 1$: $y = \frac{2}{2} = 1$. $\dfrac{dy}{dx} = \dfrac{3(x + 1) - (3x - 1)}{(x + 1)^{2}} = \dfrac{4}{(x + 1)^{2}} = 1$. The normal has gradient $-1$: $y - 1 = -(x - 1)$, i.e. $y = 2 - x$, which meets $y = 0$ at $x = 2$.`,
    hints: ["Find the point and the gradient first.", "The normal gradient is −1."],
  });

  checkDeriv((x) => 1 / cos(x), (x) => sin(x) / cos(x) ** 2, [0.3, 0.8, 1.2], "q14");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 3, calculator: false,
    stem: t`By writing $\sec x = \dfrac{1}{\cos x}$, use the quotient rule to show that $\dfrac{d}{dx}(\sec x) = \sec x\tan x$.`,
    points: [
      t`M1 uses $u = 1$, $u' = 0$, $v = \cos x$, $v' = -\sin x$ in the quotient rule`,
      t`A1 obtains $\dfrac{\sin x}{\cos^{2}x}$`,
      t`A1 writes it as $\dfrac{1}{\cos x} \cdot \dfrac{\sin x}{\cos x} = \sec x\tan x$`,
    ],
    modelAnswer: ["$$", t`\frac{d}{dx}\left(\frac{1}{\cos x}\right) = \frac{\cos x \cdot 0 - 1 \cdot (-\sin x)}{\cos^{2}x} = \frac{\sin x}{\cos^{2}x} = \frac{1}{\cos x} \cdot \frac{\sin x}{\cos x} = \sec x\tan x`, "$$"].join("\n"),
    explanation: "The derivative of a constant numerator is 0, which leaves one term.",
    hints: ["The derivative of the numerator 1 is 0."],
  });

  checkDeriv((x) => x * sin(2 * x), (x) => sin(2 * x) + 2 * x * cos(2 * x), XS, "q15");
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`What is $\dfrac{d}{dx}(x\sin 2x)$?`,
    options: [
      [t`$\sin 2x + 2x\cos 2x$`, "Correct: product rule with the chain rule on sin 2x."],
      [t`$\sin 2x + x\cos 2x$`, "The factor 2 from differentiating sin 2x is missing."],
      [t`$2\cos 2x$`, "This multiplies the derivatives of x and sin 2x instead of using the product rule."],
      [t`$\sin 2x - 2x\cos 2x$`, "The product rule adds the two terms; the derivative of sin is +cos."],
    ],
    answer: "A",
    explanation: t`$u = x$, $v = \sin 2x$, $v' = 2\cos 2x$: $\dfrac{dy}{dx} = x \cdot 2\cos 2x + \sin 2x$.`,
    hints: ["Use the chain rule for sin 2x inside the product rule."],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\dfrac{d}{dx}\big(x^{2}\mathrm{e}^{x}\big) = 2x\mathrm{e}^{x}$.`,
    answer: false,
    explanation: t`False. That multiplies the two derivatives. The product rule gives $x^{2}\mathrm{e}^{x} + 2x\mathrm{e}^{x} = x\mathrm{e}^{x}(x + 2)$.`,
    hints: ["Two terms come from the product rule."],
  });
  checkDeriv((x) => x * x * exp(x), (x) => x * exp(x) * (x + 2), XS, "q16");

  checkDeriv((x) => x * log(x), (x) => log(x) + 1, XS, "q17");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the gradient of the curve $y = x\ln x$ at the point $(1, 0)$.`,
    value: 1, wrong: [0],
    explanation: t`$\dfrac{dy}{dx} = x \cdot \dfrac{1}{x} + \ln x = 1 + \ln x$. At $x = 1$: $1 + 0 = 1$.`,
  });

  // struct 5: y = (x − 1)/(x² + 3); y' = (−x² + 2x + 3)/(x² + 3)²; max at x = 3, y = 1/6
  const yq = (x) => (x - 1) / (x * x + 3);
  checkDeriv(yq, (x) => (-x * x + 2 * x + 3) / (x * x + 3) ** 2, XS, "q18");
  chk(yq(3), 1 / 6, 1e-12); chk(yq(-1), -0.5, 1e-12);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A curve has equation $y = \dfrac{x - 1}{x^{2} + 3}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $\dfrac{dy}{dx} = \dfrac{3 + 2x - x^{2}}{(x^{2} + 3)^{2}}$.`,
        points: [t`M1 applies the quotient rule: $\dfrac{(x^{2} + 3)(1) - (x - 1)(2x)}{(x^{2} + 3)^{2}}$`, t`A1 simplifies the numerator to $3 + 2x - x^{2}$`],
        modelAnswer: ["$$", t`\frac{dy}{dx} = \frac{(x^{2} + 3) - (x - 1)(2x)}{(x^{2} + 3)^{2}} = \frac{x^{2} + 3 - 2x^{2} + 2x}{(x^{2} + 3)^{2}} = \frac{3 + 2x - x^{2}}{(x^{2} + 3)^{2}}`, "$$"].join("\n"),
        explanation: "Expand −(x − 1)(2x) carefully." }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the x-coordinates of the stationary points, smaller first.", template: "x = {{blank:a}} and x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: 1 }, { id: "b", input: "number", accepted: [3], wrong: -3 }],
        explanation: t`$3 + 2x - x^{2} = -(x - 3)(x + 1) = 0$ gives $x = -1$ or $x = 3$; the denominator is never zero.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the maximum value of y, correct to 3 significant figures.", value: 1 / 6, wrong: [-0.5],
        explanation: t`At $x = 3$: $y = \frac{2}{12} = \frac{1}{6} \approx 0.167$ (the maximum; at $x = -1$, $y = -\frac{1}{2}$ is the minimum).` }),
    ],
    explanation: "A quotient whose derivative's numerator is a quadratic: its roots give the stationary points.",
    hints: ["u = x − 1, v = x² + 3.", "Factorise 3 + 2x − x²."],
  });

  // struct 5: y = e^x sin x on [0, π]: max at 3π/4
  const yy = (x) => exp(x) * sin(x);
  checkDeriv(yy, (x) => exp(x) * (sin(x) + cos(x)), XS, "q19");
  const xm = (3 * PI) / 4;
  chk(sin(xm) + cos(xm), 0, 1e-12);
  same(Number(xm.toFixed(3)), 2.356);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The curve $y = \mathrm{e}^{x}\sin x$, for $0 \leq x \leq \pi$, has one maximum point $M$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that at $M$, $\tan x = -1$.`,
        points: [t`M1 obtains $\dfrac{dy}{dx} = \mathrm{e}^{x}(\sin x + \cos x)$`, t`A1 uses $\mathrm{e}^{x} \neq 0$ to get $\sin x = -\cos x$, so $\tan x = -1$`],
        modelAnswer: ["$$", t`\frac{dy}{dx} = \mathrm{e}^{x}\sin x + \mathrm{e}^{x}\cos x = \mathrm{e}^{x}(\sin x + \cos x) = 0`, "$$", "", t`Since $\mathrm{e}^{x} > 0$, $\sin x = -\cos x$, so $\tan x = -1$.`].join("\n"),
        explanation: "Divide by cos x (non-zero at the solution) to get tan x." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the x-coordinate of M, in radians, correct to 3 significant figures.", prefix: "x =", value: xm, wrong: [135, 0.785],
        explanation: t`$\tan x = -1$ with $0 \leq x \leq \pi$ gives $x = \frac{3\pi}{4} \approx 2.36$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the y-coordinate of M, correct to 3 significant figures.", prefix: "y =", value: yy(xm), wrong: [10.6],
        explanation: t`$y = \mathrm{e}^{3\pi/4}\sin\frac{3\pi}{4} = \frac{\sqrt{2}}{2}\mathrm{e}^{3\pi/4} \approx 7.46$. (10.6 forgets the factor $\sin\frac{3\pi}{4}$.)` }),
    ],
    explanation: "Product rule, factorise out eˣ, then solve the trigonometric equation in the given interval.",
    hints: ["Factorise e^x out of the derivative.", "tan x = −1 has one solution between 0 and π."],
  });

  b.card("FORMULA", "Product rule", t`$\dfrac{d}{dx}(uv) = u\dfrac{dv}{dx} + v\dfrac{du}{dx}$`, "In MF19.");
  b.card("FORMULA", "Quotient rule", t`$\dfrac{d}{dx}\left(\dfrac{u}{v}\right) = \dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^{2}}$`, "In MF19.");
  b.card("CONCEPT", "Quotient rule in words", "Bottom times derivative of top, minus top times derivative of bottom, all over bottom squared.");
  b.card("CONCEPT", "First step for product/quotient", "Write u, v, u′ and v′ (using the chain rule where needed) before substituting.");
  b.card("FACT", "Derivative of sec x", t`$\sec x\tan x$, from the quotient rule on $\frac{1}{\cos x}$.`);
  b.card("CONCEPT", "Solving dy/dx = 0 with exponentials", t`Factorise out $\mathrm{e}^{f(x)}$; it is never zero, so set the other factor to zero.`);
  b.card("FACT", t`Derivative of $\dfrac{\ln x}{x}$`, t`$\dfrac{1 - \ln x}{x^{2}}$: maximum at $x = \mathrm{e}$, value $\frac{1}{\mathrm{e}}$.`);
  b.card("CONCEPT", "When to avoid the quotient rule", t`If the denominator is a single term, divide first: $\dfrac{x^{2} + 3}{x} = x + 3x^{-1}$.`);
});
