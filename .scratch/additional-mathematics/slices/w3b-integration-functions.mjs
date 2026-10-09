// W3b: amath.calculus.integration-functions
import { concept, P, t, chk, checkAntideriv, checkDeriv, sec, CAM } from "../lib.mjs";

const { exp, log, sin, cos, tan, PI } = Math;

concept("amath.calculus.integration-functions", { file: "calculus/integration-functions", keyPrefix: "calculus.integration-functions" }, (b) => {
  checkAntideriv((x) => exp(5 * x) / 5, (x) => exp(5 * x), 0, 1);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find $\displaystyle\int e^{5x}\,dx$.`,
    options: [
      [t`$\frac{1}{5}e^{5x} + c$`, "Correct: integrate the exponential and divide by the coefficient of x, 5."],
      [t`$5e^{5x} + c$`, "Multiplying by 5 is what differentiation does."],
      [t`$\frac{1}{6}e^{6x} + c$`, "The power rule does not apply to an exponential; the index 5x is not a power of x."],
      [t`$e^{5x} + c$`, "Differentiating this gives 5e^{5x}, so a factor 1/5 is missing."],
    ],
    answer: "A",
    explanation: t`$\int e^{ax}\,dx = \frac{1}{a}e^{ax} + c$, so $\int e^{5x}\,dx = \frac{1}{5}e^{5x} + c$.`,
  });

  checkAntideriv((x) => sin(4 * x) / 4, (x) => cos(4 * x), 0, 1);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int \cos 4x\,dx$.`,
    options: [
      [t`$\frac{1}{4}\sin 4x + c$`, t`Correct: $\int \cos(ax)\,dx = \frac{1}{a}\sin(ax) + c$.`],
      [t`$-\frac{1}{4}\sin 4x + c$`, "The minus sign belongs to the integral of sine, not cosine."],
      [t`$4\sin 4x + c$`, "The coefficient 4 must divide, not multiply."],
      [t`$-4\sin 4x + c$`, "This is the derivative of cos 4x, not its integral."],
    ],
    answer: "A",
    explanation: t`$\frac{d}{dx}\sin 4x = 4\cos 4x$, so $\int \cos 4x\,dx = \frac{1}{4}\sin 4x + c$.`,
  });

  checkAntideriv((x) => 0.5 * log(2 * x + 5), (x) => 1 / (2 * x + 5), 0, 3);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int \frac{1}{2x + 5}\,dx$ for $x > -\frac{5}{2}$.`,
    options: [
      [t`$\frac{1}{2}\ln(2x + 5) + c$`, "Correct: integrate 1/u to ln u and divide by the coefficient of x, 2."],
      [t`$2\ln(2x + 5) + c$`, "The coefficient 2 must divide, not multiply."],
      [t`$\ln(2x + 5) + c$`, "Differentiating this gives 2/(2x + 5), twice the integrand."],
      [t`$-\frac{1}{2}(2x + 5)^{-2} + c$`, "This differentiates (2x + 5)^{-1}; the power rule does not apply when n = −1."],
    ],
    answer: "A",
    explanation: t`$\int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln(ax + b) + c$, so the answer is $\frac{1}{2}\ln(2x + 5) + c$.`,
  });

  checkAntideriv((x) => exp(2 * x) / 2 + exp(x), (x) => exp(x) * (exp(x) + 1), 0, 1);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int e^{x}\left(e^{x} + 1\right)dx$.`,
    options: [
      [t`$\frac{1}{2}e^{2x} + e^{x} + c$`, t`Correct: expand to $e^{2x} + e^{x}$ and integrate each term.`],
      [t`$e^{2x} + e^{x} + c$`, t`$\int e^{2x}\,dx$ needs the factor $\frac{1}{2}$.`],
      [t`$2e^{2x} + e^{x} + c$`, "The coefficient 2 of x multiplied instead of divided."],
      [t`$\frac{1}{2}e^{x^2} + e^{x} + c$`, t`$e^{x} \times e^{x} = e^{2x}$, not $e^{x^2}$.`],
    ],
    answer: "A",
    explanation: t`$e^{x}(e^{x} + 1) = e^{2x} + e^{x}$, and $\int e^{2x}\,dx = \frac{1}{2}e^{2x}$, so the integral is $\frac{1}{2}e^{2x} + e^{x} + c$.`,
    hints: ["Expand the bracket using the laws of indices first."],
  });

  checkAntideriv((x) => tan(3 * x) / 3, (x) => sec(3 * x) ** 2, 0, 0.4);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, applies: CAM,
    stem: t`Find $\displaystyle\int \sec^2 3x\,dx$.`,
    options: [
      [t`$\frac{1}{3}\tan 3x + c$`, t`Correct: $\frac{d}{dx}\tan 3x = 3\sec^2 3x$, so divide by 3.`],
      [t`$3\tan 3x + c$`, "The coefficient 3 must divide, not multiply."],
      [t`$\frac{1}{9}\sec^3 3x + c$`, "The power rule cannot be applied to a trigonometric function."],
      [t`$\tan 3x + c$`, "Differentiating this gives 3 sec² 3x, three times too big."],
    ],
    answer: "A",
    explanation: t`$\int \sec^2(ax + b)\,dx = \frac{1}{a}\tan(ax + b) + c$, so $\int \sec^2 3x\,dx = \frac{1}{3}\tan 3x + c$.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`For $x > 0$, $\displaystyle\int \frac{1}{x}\,dx = \ln x + c$.`,
    answer: true,
    explanation: t`True, because $\frac{d}{dx}\ln x = \frac{1}{x}$. This fills the gap in the power rule at $n = -1$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\displaystyle\int \sin x\,dx = \cos x + c$.`,
    answer: false,
    explanation: t`False. $\frac{d}{dx}\cos x = -\sin x$, so $\int \sin x\,dx = -\cos x + c$.`,
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its indefinite integral.",
    pairs: [
      [t`$\sin 2x$`, t`$-\frac{1}{2}\cos 2x + c$`],
      [t`$\cos 2x$`, t`$\frac{1}{2}\sin 2x + c$`],
      [t`$e^{2x}$`, t`$\frac{1}{2}e^{2x} + c$`],
      [t`$\frac{1}{2x + 1}$`, t`$\frac{1}{2}\ln(2x + 1) + c$`],
    ],
    explanation: t`Each inside is linear with coefficient 2, so every integral carries a factor $\frac{1}{2}$; only the integral of sine has a minus sign.`,
  });

  {
    checkAntideriv((x) => (2 * x + 1) ** 6 / 12, (x) => (2 * x + 1) ** 5, 0, 1);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`$\displaystyle\int (2x + 1)^5\,dx = \frac{(2x + 1)^6}{k} + c$. Find the value of the constant $k$.`,
      value: 12, wrong: [6, 3],
      explanation: t`Raise the power to 6 and divide by 6, then divide by the coefficient of $x$, 2: $k = 6 \times 2 = 12$. Check: $\frac{d}{dx}\frac{(2x + 1)^6}{12} = \frac{6 \times 2(2x + 1)^5}{12} = (2x + 1)^5$. The answer 6 forgets to divide by 2.`,
    });
  }

  {
    checkAntideriv((x) => -2 * cos(3 * x), (x) => 6 * sin(3 * x), 0, 1);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`$\displaystyle\int 6\sin 3x\,dx = a\cos 3x + c$. Find the value of the constant $a$.`,
      value: -2, wrong: [2, -18],
      explanation: t`$\int \sin 3x\,dx = -\frac{1}{3}\cos 3x$, so $\int 6\sin 3x\,dx = -2\cos 3x + c$ and $a = -2$. The answer 2 loses the minus sign; $-18$ multiplies by 3 instead of dividing.`,
    });
  }

  {
    checkAntideriv((x) => -2 * exp(-4 * x), (x) => 8 * exp(-4 * x), 0, 1);
    b.expr({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find $\displaystyle\int 8e^{-4x}\,dx$. Use $c$ for the constant and type the exponential as e^(...), for example 3e^(-2x) + c.`,
      accepted: ["-2e^(-4x)+c", "-2e^-4x+c", "c-2e^(-4x)", "-2/e^(4x)+c", "-2e^(-4x)+c", "-2*e^(-4x)+c"],
      wrong: ["2e^(-4x)+c", "-32e^(-4x)+c"],
      explanation: t`$\int e^{-4x}\,dx = \frac{1}{-4}e^{-4x}$, so $\int 8e^{-4x}\,dx = -2e^{-4x} + c$. A positive answer forgets that dividing by $-4$ changes the sign.`,
      hints: ["Divide by the coefficient of x, which is negative here."],
    });
  }

  {
    checkAntideriv((x) => 3 * log(4 * x - 3), (x) => 12 / (4 * x - 3), 1, 3);
    b.expr({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find $\displaystyle\int \frac{12}{4x - 3}\,dx$ for $x > \frac{3}{4}$. Use $c$ for the constant, for example 5ln(2x+1) + c.`,
      accepted: ["3ln(4x-3)+c", "3ln|4x-3|+c", "c+3ln(4x-3)", "3*ln(4x-3)+c", "ln((4x-3)^3)+c", "ln(4x-3)^3+c"],
      wrong: ["12ln(4x-3)+c", "48ln(4x-3)+c"],
      explanation: t`$\int \frac{1}{4x - 3}\,dx = \frac{1}{4}\ln(4x - 3)$, so $\int \frac{12}{4x - 3}\,dx = 3\ln(4x - 3) + c$. Leaving the 12 undivided, or multiplying by 4, are the usual slips.`,
      hints: [t`$\int \frac{1}{ax + b}\,dx = \frac{1}{a}\ln(ax + b)$.`],
    });
  }

  {
    checkAntideriv((x) => 1 / (4 * (5 - 2 * x) ** 2), (x) => (5 - 2 * x) ** -3, 0, 2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$\displaystyle\int \frac{1}{(5 - 2x)^3}\,dx = \frac{1}{k(5 - 2x)^2} + c$. Find the value of the constant $k$.`,
      value: 4, wrong: [-4, -2],
      explanation: t`$\int (5 - 2x)^{-3}\,dx = \frac{(5 - 2x)^{-2}}{(-2)(-2)} + c = \frac{1}{4(5 - 2x)^2} + c$. Dividing by the new power $-2$ and by the coefficient $-2$ makes two minus signs, so $k = 4$. The answer $-4$ misses one of them.`,
      hints: ["The new power is −2 and the coefficient of x is −2: divide by both."],
    });
  }

  {
    checkAntideriv((x) => tan(x) - x, (x) => tan(x) ** 2, 0, 1);
    b.expr({
      d: 4, skill: "ANALYSIS", calculator: false, applies: CAM,
      stem: t`Use the identity $\tan^2 x = \sec^2 x - 1$ to find $\displaystyle\int \tan^2 x\,dx$. Use $c$ for the constant, for example 2sinx - x + c.`,
      accepted: ["tanx-x+c", "tan(x)-x+c", "-x+tanx+c", "c+tanx-x", "tanx+c-x"],
      wrong: ["tan^3x/3+c", "tanx+c"],
      explanation: t`$\int \tan^2 x\,dx = \int (\sec^2 x - 1)\,dx = \tan x - x + c$. The power rule cannot be used on $\tan^2 x$; it is not a power of $x$.`,
      hints: [t`$\int \sec^2 x\,dx = \tan x$.`, "Do not forget to integrate the −1."],
    });
  }

  {
    // f'(x) = 2cos 2x + e^x, f(0) = 3 → f(x) = sin 2x + e^x + 2
    const f = (x) => sin(2 * x) + exp(x) + 2;
    checkDeriv(f, (x) => 2 * cos(2 * x) + exp(x), [0, 0.7, 1]);
    chk(f(0), 3);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`It is given that $f'(x) = 2\cos 2x + e^{x}$ and $f(0) = 3$. Find $f(1)$, correct to 3 significant figures.`,
      value: f(1), wrong: [sin(2 * PI / 180) + exp(1) + 2, sin(2) + exp(1)],
      explanation: t`$f(x) = \sin 2x + e^{x} + c$. $f(0) = 0 + 1 + c = 3$, so $c = 2$. Then $f(1) = \sin 2 + e + 2 = 0.9093 + 2.7183 + 2 = 5.63$ (radians). A calculator in degree mode gives about 4.75; leaving out $c$ gives 3.63.`,
      hints: ["Integrate each term, then use f(0) = 3 to find c.", "Use radians for sin 2."],
    });
  }

  {
    // f'(x) = 4cos 2x, f(π/4) = 5 → f(x) = 2 sin 2x + 3
    const f = (x) => 2 * sin(2 * x) + 3;
    checkDeriv(f, (x) => 4 * cos(2 * x), [0, 0.3]);
    chk(f(PI / 4), 5);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`It is given that $f'(x) = 4\cos 2x$ and $f\left(\frac{\pi}{4}\right) = 5$. Find $f(0)$.`,
      value: f(0), wrong: [5, 1],
      explanation: t`$f(x) = 2\sin 2x + c$. At $x = \frac{\pi}{4}$: $2\sin\frac{\pi}{2} + c = 2 + c = 5$, so $c = 3$. Then $f(0) = 2\sin 0 + 3 = 3$.`,
      hints: [t`$\sin\frac{\pi}{2} = 1$ and $\sin 0 = 0$.`],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Rudo writes $\displaystyle\int \frac{1}{3x + 2}\,dx = \ln(3x + 2) + c$. Explain her error and give the correct answer.`,
    points: [
      t`Explains that differentiating $\ln(3x + 2)$ gives $\frac{3}{3x + 2}$, three times the integrand (she has not divided by the coefficient 3).`,
      t`Gives the correct answer $\frac{1}{3}\ln(3x + 2) + c$.`,
    ],
    modelAnswer: t`By the chain rule $\frac{d}{dx}\ln(3x + 2) = \frac{3}{3x + 2}$, which is three times $\frac{1}{3x + 2}$. She must divide by the coefficient of $x$: $\int \frac{1}{3x + 2}\,dx = \frac{1}{3}\ln(3x + 2) + c$.`,
    explanation: "Differentiate the proposed answer: the chain rule brings out the factor 3.",
    hints: ["Differentiate ln(3x + 2) with the chain rule."],
  });

  {
    // (a) d/dx(x ln x) = ln x + 1; (b) ∫ ln x dx = x ln x − x + c; (c) f' = ln x, f(1) = 0 → f(e) = 1
    checkDeriv((x) => x * log(x), (x) => log(x) + 1, [0.5, 1, 3]);
    checkAntideriv((x) => x * log(x) - x, (x) => log(x), 0.5, 4);
    const f = (x) => x * log(x) - x + 1;
    chk(f(1), 0);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`This question uses a derivative to integrate $\ln x$, for $x > 0$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $\dfrac{d}{dx}(x\ln x) = \ln x + 1$.`,
          points: [t`M1 uses the product rule: $1 \times \ln x + x \times \frac{1}{x}$.`, t`A1 simplifies to $\ln x + 1$.`],
          modelAnswer: t`$$
\frac{d}{dx}(x\ln x) = 1 \times \ln x + x \times \frac{1}{x} = \ln x + 1
$$`,
          explanation: "Product rule with u = x and v = ln x." }),
        P.expr({ label: "(b)", marks: 2, stem: t`Hence find $\displaystyle\int \ln x\,dx$. Use $c$ for the constant, for example 2xlnx + x + c.`,
          accepted: ["xlnx-x+c", "xln(x)-x+c", "x(lnx-1)+c", "x(ln(x)-1)+c", "-x+xlnx+c", "c+xlnx-x"],
          wrong: ["xlnx+c", "1/x+c"],
          explanation: t`Integrating (a): $x\ln x = \int \ln x\,dx + \int 1\,dx$, so $\int \ln x\,dx = x\ln x - x + c$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`A function $f$ has $f'(x) = \ln x$ and $f(1) = 0$. Find the exact value of $f(e)$.`, value: f(Math.E), wrong: [0],
          explanation: t`$f(x) = x\ln x - x + c$; $f(1) = 0 - 1 + c = 0$, so $c = 1$. $f(e) = e - e + 1 = 1$.` }),
      ],
      explanation: "Read the product-rule result backwards: the term ∫ 1 dx = x is moved to the other side.",
      hints: [t`Integrate both sides of (a): $\int (\ln x + 1)\,dx = x\ln x$.`, t`$\ln e = 1$.`],
    });
  }

  {
    // dy/dx = 4e^{2x} − 2 through (0, 5): y = 2e^{2x} − 2x + 3
    const y = (x) => 2 * exp(2 * x) - 2 * x + 3;
    checkDeriv(y, (x) => 4 * exp(2 * x) - 2, [-1, 0, 0.5]);
    chk(y(0), 5);
    const xs = -0.5 * log(2);
    chk(4 * exp(2 * xs) - 2, 0, 1e-12);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`A curve has gradient function $\dfrac{dy}{dx} = 4e^{2x} - 2$ and passes through the point $(0, 5)$.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: t`Find the equation of the curve in the form $y = pe^{2x} + qx + r$.`, template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
          blanks: [{ id: "p", input: "number", accepted: [2], wrong: "8" }, { id: "q", input: "number", accepted: [-2], wrong: "0" }, { id: "r", input: "number", accepted: [3], wrong: "5" }],
          explanation: t`$y = 2e^{2x} - 2x + c$. At $(0, 5)$: $5 = 2 + c$, so $c = 3$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find the value of $y$ when $x = 0.5$, correct to 3 significant figures.`, value: y(0.5), wrong: [y(0.5) - 3],
          explanation: t`$y = 2e - 1 + 3 = 7.44$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the $x$-coordinate of the stationary point of the curve, correct to 3 significant figures.`, value: xs, wrong: [-xs],
          explanation: t`$4e^{2x} = 2$ gives $e^{2x} = \frac{1}{2}$, so $2x = \ln\frac{1}{2}$ and $x = -\frac{1}{2}\ln 2 = -0.347$.` }),
      ],
      explanation: "Integrate the exponential (divide by 2), use the point for c, then solve dy/dx = 0 with logarithms.",
      hints: [t`$\int 4e^{2x}\,dx = 2e^{2x}$.`, t`Take natural logarithms of $e^{2x} = \frac{1}{2}$.`],
    });
  }

  {
    // dy/dx = 6(3x − 2)^{1/2} through (2, 10): y = (4/3)(3x − 2)^{3/2} − 2/3
    const y = (x) => (4 / 3) * (3 * x - 2) ** 1.5 - 2 / 3;
    checkDeriv(y, (x) => 6 * Math.sqrt(3 * x - 2), [1, 2, 6]);
    chk(y(2), 10);
    chk(y(6), 254 / 3);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The gradient of a curve is given by $\dfrac{dy}{dx} = 6\sqrt{3x - 2}$. The curve passes through the point $(2, 10)$.`,
      parts: [
        P.fib({ label: "(a)", marks: 3, stem: t`Find $\displaystyle\int 6\sqrt{3x - 2}\,dx$ in the form $k(3x - 2)^{n} + c$. Type $k$ as a fraction.`, template: "k = {{blank:k}}, n = {{blank:n}}",
          blanks: [{ id: "k", input: "number", accepted: ["4/3"], tolerance: 0.005, wrong: "12" }, { id: "n", input: "number", accepted: ["3/2"], tolerance: 0.005, wrong: "1/2" }],
          explanation: t`$\int 6(3x - 2)^{\frac{1}{2}}\,dx = \frac{6(3x - 2)^{\frac{3}{2}}}{3 \times \frac{3}{2}} + c = \frac{6}{4.5}(3x - 2)^{\frac{3}{2}} + c = \frac{4}{3}(3x - 2)^{\frac{3}{2}} + c$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the constant of integration for this curve, as a fraction.`, value: -2 / 3, wrong: [10],
          explanation: t`At $x = 2$: $\frac{4}{3}(4)^{\frac{3}{2}} = \frac{32}{3}$, so $10 = \frac{32}{3} + c$ and $c = -\frac{2}{3}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $y$ when $x = 6$, as an exact fraction or correct to 3 significant figures.`, value: y(6), wrong: [256 / 3],
          explanation: t`$3(6) - 2 = 16$ and $16^{\frac{3}{2}} = 64$: $y = \frac{4}{3}(64) - \frac{2}{3} = \frac{254}{3} \approx 84.7$.` }),
      ],
      explanation: "Integrate the linear composite (divide by the new power and by 3), then use the point to find c.",
      hints: [t`Write $\sqrt{3x - 2}$ as $(3x - 2)^{\frac{1}{2}}$.`, t`$4^{\frac{3}{2}} = 8$ and $16^{\frac{3}{2}} = 64$.`],
    });
  }

  b.card("FORMULA", t`$\displaystyle\int (ax + b)^n\,dx$`, t`$\dfrac{(ax + b)^{n+1}}{a(n + 1)} + c$, for $n \neq -1$`);
  b.card("FORMULA", t`$\displaystyle\int \frac{1}{ax + b}\,dx$`, t`$\dfrac{1}{a}\ln(ax + b) + c$`, t`Special case: $\int \frac{1}{x}\,dx = \ln x + c$.`);
  b.card("FORMULA", t`$\displaystyle\int e^{ax + b}\,dx$`, t`$\dfrac{1}{a}e^{ax + b} + c$`);
  b.card("FORMULA", t`$\displaystyle\int \sin(ax + b)\,dx$`, t`$-\dfrac{1}{a}\cos(ax + b) + c$`);
  b.card("FORMULA", t`$\displaystyle\int \cos(ax + b)\,dx$`, t`$\dfrac{1}{a}\sin(ax + b) + c$`);
  b.card("FORMULA", t`$\displaystyle\int \sec^2(ax + b)\,dx$`, t`$\dfrac{1}{a}\tan(ax + b) + c$`, "Cambridge only.", { applies: CAM });
  b.card("CONCEPT", "Linear inside: divide by a", "When x is replaced by ax + b, integrate the outer function and divide by a. This works only when the inside is linear.");
  b.card("FACT", "Radians", "The integrals of sin, cos and sec² hold only with angles in radians.");
  b.card("CONCEPT", "Integrating a product with \"hence\"", t`Read a product-rule result backwards, e.g. $\frac{d}{dx}(x\ln x) = \ln x + 1$ gives $\int \ln x\,dx = x\ln x - x + c$.`);
});
