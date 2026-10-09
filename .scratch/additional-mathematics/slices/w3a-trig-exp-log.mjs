// W3a: amath.calculus.trig-exp-log
import { concept, P, t, chk, checkDeriv, deriv, sfStr } from "../lib.mjs";

const XS = [0.3, 0.8, 1.4];
const E = Math.exp, L = Math.log, S = Math.sin, C = Math.cos;

concept("amath.calculus.trig-exp-log", { file: "calculus/trig-exp-log", keyPrefix: "calculus.trig-exp-log" }, (b) => {
  checkDeriv(C, (x) => -S(x), XS);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`With $x$ in radians, find $\dfrac{d}{dx}(\cos x)$.`,
    options: [
      [t`$-\sin x$`, "Correct: the derivative of cosine is minus sine."],
      [t`$\sin x$`, "The sign is wrong: cosine decreases where sine is positive (just after x = 0)."],
      [t`$-\cos x$`, t`That is the second derivative of $\cos x$.`],
      [t`$\sec^2 x$`, t`That is the derivative of $\tan x$.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\cos x = -\sin x$ and $\dfrac{d}{dx}\sin x = \cos x$, with $x$ in radians.`,
  });

  checkDeriv(S, C, XS); checkDeriv(E, E, XS); checkDeriv(L, (x) => 1 / x, XS); checkDeriv(Math.tan, (x) => 1 / C(x) ** 2, XS);
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each function with its derivative (x in radians).",
    pairs: [
      [t`$\sin x$`, t`$\cos x$`],
      [t`$\mathrm{e}^x$`, t`$\mathrm{e}^x$`],
      [t`$\ln x$`, t`$\dfrac{1}{x}$`],
      [t`$\tan x$`, t`$\sec^2 x$`],
    ],
    explanation: t`The standard derivatives: $\sin x \to \cos x$, $\mathrm{e}^x \to \mathrm{e}^x$, $\ln x \to \frac{1}{x}$, $\tan x \to \sec^2 x$.`,
  });

  checkDeriv((x) => E(5 * x), (x) => 5 * E(5 * x), XS);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find $\dfrac{d}{dx}\left(\mathrm{e}^{5x}\right)$.`,
    options: [
      [t`$5\mathrm{e}^{5x}$`, t`Correct: the inside $5x$ has derivative 5 and the exponential stays the same.`],
      [t`$\mathrm{e}^{5x}$`, "The derivative of the inside, 5, is missing."],
      [t`$5x\mathrm{e}^{4x}$`, t`The power rule does not apply: the exponent of $\mathrm{e}$ does not come down or reduce.`],
      [t`$\tfrac{1}{5}\mathrm{e}^{5x}$`, "Dividing by 5 is what integration does."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\mathrm{e}^{ax + b} = a\mathrm{e}^{ax + b}$, so $\dfrac{d}{dx}\mathrm{e}^{5x} = 5\mathrm{e}^{5x}$.`,
  });

  {
    const fp = (x) => 4 / (4 * x - 3);
    checkDeriv((x) => L(4 * x - 3), fp, [1, 2, 3]);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`Find the gradient of the curve $y = \ln(4x - 3)$ at the point where $x = 1$.`,
      value: fp(1), wrong: [1, 0],
      explanation: t`$\dfrac{dy}{dx} = \dfrac{4}{4x - 3}$. At $x = 1$: $\frac{4}{1} = 4$. The value 1 forgets the inner derivative 4; 0 is $y$ at $x = 1$ ($\ln 1 = 0$).`,
    });
  }

  checkDeriv((x) => S(4 * x), (x) => 4 * C(4 * x), XS);
  b.expr({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $y = \sin 4x$ with respect to $x$. Type your answer for $\dfrac{dy}{dx}$, for example 2cos(2x).`,
    accepted: ["4cos(4x)", "4cos4x", "dy/dx=4cos(4x)", "dy/dx=4cos4x"],
    wrong: ["cos(4x)", "4cos(x)"],
    explanation: t`$\dfrac{d}{dx}\sin(ax) = a\cos(ax)$, so $\dfrac{dy}{dx} = 4\cos 4x$. The angle stays $4x$; the 4 also appears in front.`,
  });

  checkDeriv((x) => L(5 * x), (x) => 1 / x, XS);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For $x > 0$, $\dfrac{d}{dx}\big(\ln 5x\big) = \dfrac{1}{x}$.`,
    answer: true,
    explanation: t`True. $\dfrac{d}{dx}\ln 5x = \dfrac{5}{5x} = \dfrac{1}{x}$. Equivalently, $\ln 5x = \ln 5 + \ln x$ and the constant $\ln 5$ differentiates to 0.`,
  });

  {
    const fp = (x) => 6 * C(2 * x);
    checkDeriv((x) => 3 * S(2 * x), fp, XS);
    chk(fp(Math.PI / 6), 3);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the exact gradient of the curve $y = 3\sin 2x$ at the point where $x = \dfrac{\pi}{6}$.`,
      value: fp(Math.PI / 6), wrong: [1.5, 6 * Math.sqrt(3) / 2],
      explanation: t`$\dfrac{dy}{dx} = 6\cos 2x$. At $x = \frac{\pi}{6}$: $6\cos\frac{\pi}{3} = 6 \times \frac{1}{2} = 3$. The value 1.5 forgets the factor 2 from the inside.`,
      hints: [t`$\cos\frac{\pi}{3} = \frac{1}{2}$.`],
    });
  }

  {
    const fp = (x) => 2 * E(2 * x) - 4;
    checkDeriv((x) => E(2 * x) - 4 * x, fp, XS);
    chk(fp(0.5), 2 * Math.E - 4);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Find the gradient of the curve $y = \mathrm{e}^{2x} - 4x$ at the point where $x = 0.5$, correct to 3 significant figures.`,
      value: fp(0.5), wrong: [sfStr(Math.E - 4)],
      explanation: t`$\dfrac{dy}{dx} = 2\mathrm{e}^{2x} - 4$. At $x = 0.5$: $2\mathrm{e} - 4 = ${sfStr(fp(0.5))}$ (3 s.f.). Forgetting the factor 2 gives $\mathrm{e} - 4 = ${sfStr(Math.E - 4)}$.`,
      hints: [t`$\mathrm{e}^{2 \times 0.5} = \mathrm{e}$.`],
    });
  }

  checkDeriv((x) => S(x) ** 3, (x) => 3 * S(x) ** 2 * C(x), XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = \sin^3 x$, write $\dfrac{dy}{dx}$ in the form $a\sin^n x\cos x$.`,
    template: "a = {{blank:a}}, n = {{blank:n}}",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: "1" }, { id: "n", input: "number", accepted: [2], wrong: "3" }],
    explanation: t`$\sin^3 x = (\sin x)^3$. Outside: $3(\sin x)^2$; inside: $\cos x$. So $\frac{dy}{dx} = 3\sin^2 x\cos x$.`,
    hints: [t`$\sin^3 x$ means $(\sin x)^3$: use the chain rule.`],
  });

  checkDeriv((x) => L(x * x + 1), (x) => (2 * x) / (x * x + 1), XS);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\dfrac{d}{dx}\big(\ln(x^2 + 1)\big)$.`,
    options: [
      [t`$\dfrac{2x}{x^2 + 1}$`, t`Correct: $\frac{f'(x)}{f(x)}$ with $f(x) = x^2 + 1$.`],
      [t`$\dfrac{1}{x^2 + 1}$`, t`The derivative of the inside, $2x$, is missing.`],
      [t`$\dfrac{1}{2x}$`, "This differentiates the inside and takes its reciprocal, which is not the rule."],
      [t`$\dfrac{2}{x} + 1$`, t`$\ln(x^2 + 1)$ cannot be split into $\ln x^2 + \ln 1$: the log of a sum does not split.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\ln f(x) = \dfrac{f'(x)}{f(x)}$, so $\dfrac{d}{dx}\ln(x^2 + 1) = \dfrac{2x}{x^2 + 1}$.`,
    hints: [t`Derivative of the inside over the inside.`],
  });

  checkDeriv((x) => x * x * E(-x), (x) => x * E(-x) * (2 - x), XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = x^2\mathrm{e}^{-x}$, write $\dfrac{dy}{dx}$ in the form $x\mathrm{e}^{-x}(a - x)$.`,
    template: "a = {{blank:a}}",
    blanks: [{ id: "a", input: "number", accepted: [2], wrong: "1" }],
    explanation: t`Product rule: $x^2 \times (-\mathrm{e}^{-x}) + \mathrm{e}^{-x} \times 2x = x\mathrm{e}^{-x}(2 - x)$, so $a = 2$.`,
    hints: [t`$\frac{d}{dx}\mathrm{e}^{-x} = -\mathrm{e}^{-x}$.`],
  });

  {
    const fp = (x) => 3 / x - 1 / (x + 2);
    checkDeriv((x) => L(x ** 3 / (x + 2)), fp, XS);
    chk(fp(1), 8 / 3);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Given $y = \ln\left(\dfrac{x^3}{x + 2}\right)$ for $x > 0$, find the gradient of the curve at $x = 1$. Give your answer as an exact fraction or correct to 3 significant figures.`,
      value: fp(1), wrong: [10 / 3, 3],
      explanation: t`Split first: $y = 3\ln x - \ln(x + 2)$, so $\dfrac{dy}{dx} = \dfrac{3}{x} - \dfrac{1}{x + 2}$. At $x = 1$: $3 - \frac{1}{3} = \frac{8}{3}$. Adding instead of subtracting gives $\frac{10}{3}$.`,
      hints: ["Use the laws of logarithms before differentiating."],
    });
  }

  checkDeriv((x) => Math.tan(3 * x), (x) => 3 / C(3 * x) ** 2, [0.1, 0.2, 0.4]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\dfrac{d}{dx}(\tan 3x)$, with $x$ in radians.`,
    options: [
      [t`$3\sec^2 3x$`, "Correct: the derivative of tan is sec², times 3 from the inside."],
      [t`$\sec^2 3x$`, "The factor 3 from the inside is missing."],
      [t`$3\sec 3x\tan 3x$`, t`That pattern belongs to the derivative of $\sec 3x$, not $\tan 3x$.`],
      [t`$3\cos^2 3x$`, t`$\sec^2 3x = \frac{1}{\cos^2 3x}$, not $\cos^2 3x$.`],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}\tan(ax) = a\sec^2(ax)$, so the answer is $3\sec^2 3x$.`,
    hints: [t`$\frac{d}{dx}\tan x = \sec^2 x$.`],
  });

  {
    chk(deriv((x) => E(x) - 2 * x, L(2)), 0, 1e-8);
    b.expr({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`The curve $y = \mathrm{e}^x - 2x$ has one point at which the gradient is zero. Find the exact $x$-coordinate of this point. Type your answer, for example ln5.`,
      accepted: ["ln2", "ln(2)", "x=ln2", "x=ln(2)"],
      wrong: ["2", "e^2"],
      explanation: t`$\dfrac{dy}{dx} = \mathrm{e}^x - 2 = 0$ gives $\mathrm{e}^x = 2$, so $x = \ln 2$. Writing $x = \mathrm{e}^2$ confuses the logarithm with the exponential.`,
      hints: ["Set dy/dx = 0.", t`Take natural logarithms of $\mathrm{e}^x = 2$.`],
    });
  }

  {
    const fp = (x) => -E(-x) * (C(x) + S(x));
    checkDeriv((x) => E(-x) * C(x), fp, XS);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Find the gradient of the curve $y = \mathrm{e}^{-x}\cos x$ at the point where $x = 1$, correct to 3 significant figures.`,
      value: fp(1), wrong: [sfStr(E(-1) * (S(1) - C(1)))],
      explanation: t`Product rule: $\dfrac{dy}{dx} = \mathrm{e}^{-x}(-\sin x) + \cos x(-\mathrm{e}^{-x}) = -\mathrm{e}^{-x}(\sin x + \cos x)$. At $x = 1$ (radians): $-\mathrm{e}^{-1}(0.8415 + 0.5403) = ${sfStr(fp(1))}$ (3 s.f.). Using $\frac{d}{dx}\mathrm{e}^{-x} = +\mathrm{e}^{-x}$ gives $${sfStr(E(-1) * (S(1) - C(1)))}$.`,
      hints: ["Use radian mode.", t`Both derivatives, of $\mathrm{e}^{-x}$ and of $\cos x$, are negative.`],
    });
  }

  checkDeriv((x) => L((x + 1) / (x - 1)), (x) => -2 / (x * x - 1), [1.5, 2, 4]);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Given that $y = \ln\left(\dfrac{x + 1}{x - 1}\right)$ for $x > 1$, show that $\dfrac{dy}{dx} = -\dfrac{2}{x^2 - 1}$.`,
    points: [
      t`M1 splits with the quotient law: $y = \ln(x + 1) - \ln(x - 1)$.`,
      t`M1 differentiates: $\dfrac{1}{x + 1} - \dfrac{1}{x - 1}$.`,
      t`A1 combines: $\dfrac{(x - 1) - (x + 1)}{(x + 1)(x - 1)} = \dfrac{-2}{x^2 - 1}$.`,
    ],
    modelAnswer: t`$$
y = \ln(x + 1) - \ln(x - 1)
$$

$$
\frac{dy}{dx} = \frac{1}{x + 1} - \frac{1}{x - 1} = \frac{(x - 1) - (x + 1)}{(x + 1)(x - 1)} = -\frac{2}{x^2 - 1}
$$`,
    explanation: "Split the logarithm first; then two simple derivatives combine over a common denominator.",
    hints: [t`$\ln\frac{a}{b} = \ln a - \ln b$.`],
  });

  {
    const y = (x) => E(-x) * S(x);
    const y1 = (x) => E(-x) * (C(x) - S(x));
    const y2 = (x) => -2 * E(-x) * C(x);
    checkDeriv(y, y1, XS); checkDeriv(y1, y2, XS);
    for (const x of XS) chk(y2(x) + 2 * y1(x) + 2 * y(x), 0, 1e-12);
    b.proof({
      d: 5, skill: "ANALYSIS", calculator: false, marks: 4,
      stem: t`Given that $y = \mathrm{e}^{-x}\sin x$, show that $\dfrac{d^2y}{dx^2} + 2\dfrac{dy}{dx} + 2y = 0$.`,
      points: [
        t`M1 uses the product rule: $\frac{dy}{dx} = \mathrm{e}^{-x}\cos x - \mathrm{e}^{-x}\sin x$.`,
        t`M1 differentiates again with the product rule on each term.`,
        t`A1 obtains $\frac{d^2y}{dx^2} = -2\mathrm{e}^{-x}\cos x$.`,
        t`A1 substitutes all three and shows the sum is 0.`,
      ],
      modelAnswer: t`$$
\frac{dy}{dx} = \mathrm{e}^{-x}\cos x - \mathrm{e}^{-x}\sin x = \mathrm{e}^{-x}(\cos x - \sin x)
$$

$$
\frac{d^2y}{dx^2} = -\mathrm{e}^{-x}(\cos x - \sin x) + \mathrm{e}^{-x}(-\sin x - \cos x) = -2\mathrm{e}^{-x}\cos x
$$

$$
\frac{d^2y}{dx^2} + 2\frac{dy}{dx} + 2y = -2\mathrm{e}^{-x}\cos x + 2\mathrm{e}^{-x}\cos x - 2\mathrm{e}^{-x}\sin x + 2\mathrm{e}^{-x}\sin x = 0
$$`,
      explanation: "Differentiate twice with the product rule, then substitute; every term cancels.",
      hints: [t`Factor out $\mathrm{e}^{-x}$ after each differentiation.`, t`$\frac{d}{dx}\mathrm{e}^{-x} = -\mathrm{e}^{-x}$.`],
    });
  }

  {
    const f = (x) => 2 * S(x) + C(2 * x);
    const fp = (x) => 2 * C(x) - 2 * S(2 * x);
    const f2 = (x) => -2 * S(x) - 4 * C(2 * x);
    checkDeriv(f, fp, XS); checkDeriv(fp, f2, XS);
    for (const x of XS) chk(fp(x), 2 * C(x) * (1 - 2 * S(x)), 1e-12);
    chk(fp(Math.PI / 6), 0, 1e-12); chk(f2(Math.PI / 6), -3);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The function $f$ is defined by $f(x) = 2\sin x + \cos 2x$, with $x$ in radians.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $f'(x)$ in the form $a\cos x + b\sin 2x$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [2], wrong: "-2" }, { id: "b", input: "number", accepted: [-2], wrong: "-1" }],
          explanation: t`$\frac{d}{dx}2\sin x = 2\cos x$ and $\frac{d}{dx}\cos 2x = -2\sin 2x$.` }),
        P.proof({ label: "(b)", marks: 2, stem: t`Show that $f'(x) = 2\cos x(1 - 2\sin x)$.`,
          points: [t`M1 uses $\sin 2x = 2\sin x\cos x$: $f'(x) = 2\cos x - 4\sin x\cos x$.`, t`A1 factorises to $2\cos x(1 - 2\sin x)$.`],
          modelAnswer: t`$$
f'(x) = 2\cos x - 2(2\sin x\cos x) = 2\cos x - 4\sin x\cos x = 2\cos x(1 - 2\sin x)
$$`,
          explanation: "Double-angle identity, then factorise." }),
        P.num({ label: "(c)", marks: 1, stem: t`Find the value of $f'\left(\dfrac{\pi}{6}\right)$.`, value: 0, wrong: [1],
          explanation: t`$\sin\frac{\pi}{6} = \frac{1}{2}$, so $1 - 2\sin\frac{\pi}{6} = 0$ and $f'\left(\frac{\pi}{6}\right) = 0$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the value of $f''\left(\dfrac{\pi}{6}\right)$.`, value: f2(Math.PI / 6), wrong: [1, -5],
          explanation: t`$f''(x) = -2\sin x - 4\cos 2x$. At $\frac{\pi}{6}$: $-2\left(\frac{1}{2}\right) - 4\left(\frac{1}{2}\right) = -3$.` }),
      ],
      explanation: "Differentiate each trigonometric term with the chain rule, factorise with sin 2x = 2 sin x cos x, and use exact values.",
      hints: [t`$\frac{d}{dx}\cos 2x = -2\sin 2x$.`, t`$\cos\frac{\pi}{3} = \frac{1}{2}$.`],
    });
  }

  {
    const f = (x) => L(2 * x + 1) - x;
    const fp = (x) => 2 / (2 * x + 1) - 1;
    const f2 = (x) => -4 / (2 * x + 1) ** 2;
    checkDeriv(f, fp, XS); checkDeriv(fp, f2, XS);
    chk(fp(0.5), 0); chk(f(0.5), L(2) - 0.5); chk(f2(0.5), -1);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`A curve has equation $y = \ln(2x + 1) - x$ for $x > -\frac{1}{2}$.`,
      parts: [
        P.fib({ label: "(a)", marks: 1, stem: t`Write $\dfrac{dy}{dx}$ in the form $\dfrac{a}{2x + 1} - 1$.`, template: "a = {{blank:a}}",
          blanks: [{ id: "a", input: "number", accepted: [2], wrong: "1" }],
          explanation: t`$\frac{d}{dx}\ln(2x + 1) = \frac{2}{2x + 1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the x-coordinate of the point where the gradient is zero.", value: 0.5, prefix: "x =", wrong: [0],
          explanation: t`$\frac{2}{2x + 1} = 1$ gives $2x + 1 = 2$, so $x = \frac{1}{2}$.` }),
        P.expr({ label: "(c)", marks: 2, stem: "Find the exact y-coordinate of this point. Type it, for example ln3-1/3.", accepted: ["ln2-1/2", "ln2-0.5", "-1/2+ln2", "-0.5+ln2", "y=ln2-1/2", "y=ln2-0.5"],
          wrong: ["ln2"], explanation: t`$y = \ln 2 - \frac{1}{2}$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Find the value of $\dfrac{d^2y}{dx^2}$ at this point.`, value: f2(0.5), wrong: [-2],
          explanation: t`$\frac{d^2y}{dx^2} = -\frac{4}{(2x + 1)^2} = -\frac{4}{4} = -1$.` }),
      ],
      explanation: "Differentiate the logarithm with the chain rule, set the gradient to zero, and keep the y-coordinate exact.",
      hints: [t`$2(2x + 1)^{-1}$ differentiates to $-4(2x + 1)^{-2}$.`],
    });
  }

  b.card("FORMULA", "Derivatives of sin, cos and tan", t`$\sin x \to \cos x$, $\cos x \to -\sin x$, $\tan x \to \sec^2 x$ ($x$ in radians)`, "Not in Cambridge's List of formulas.");
  b.card("FORMULA", t`Derivatives of $\mathrm{e}^x$ and $\ln x$`, t`$\frac{d}{dx}\mathrm{e}^x = \mathrm{e}^x$; $\frac{d}{dx}\ln x = \frac{1}{x}$ ($x > 0$)`);
  b.card("FORMULA", t`$\dfrac{d}{dx}\mathrm{e}^{f(x)}$`, t`$f'(x)\mathrm{e}^{f(x)}$, e.g. $\frac{d}{dx}\mathrm{e}^{3x - 1} = 3\mathrm{e}^{3x - 1}$`);
  b.card("FORMULA", t`$\dfrac{d}{dx}\ln f(x)$`, t`$\dfrac{f'(x)}{f(x)}$, e.g. $\frac{d}{dx}\ln(2x + 5) = \frac{2}{2x + 5}$`);
  b.card("FORMULA", t`$\dfrac{d}{dx}\sin(ax + b)$ and $\dfrac{d}{dx}\cos(ax + b)$`, t`$a\cos(ax + b)$ and $-a\sin(ax + b)$`);
  b.card("FACT", "Why radians?", t`$\frac{d}{dx}\sin x = \cos x$ only in radians; in degrees a factor $\frac{\pi}{180}$ appears.`);
  b.card("CONCEPT", t`$\cos^2 x$`, t`Means $(\cos x)^2$; its derivative is $-2\sin x\cos x = -\sin 2x$.`);
  b.card("CONCEPT", "Logarithm of a product or quotient", t`Split with the laws of logarithms before differentiating: $\ln\frac{x^3}{x + 2} = 3\ln x - \ln(x + 2)$.`);
  b.card("FACT", t`$\dfrac{d}{dx}\ln(kx)$`, t`$\frac{1}{x}$ for any positive constant $k$, because $\ln kx = \ln k + \ln x$.`);
});
