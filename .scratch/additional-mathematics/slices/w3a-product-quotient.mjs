// W3a: amath.calculus.product-quotient
import { concept, P, t, chk, same, checkDeriv, quad, sfStr } from "../lib.mjs";

const XS = [0.6, 1.3, 2.7];

concept("amath.calculus.product-quotient", { file: "calculus/product-quotient", keyPrefix: "calculus.product-quotient" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`If $y = uv$, where $u$ and $v$ are functions of $x$, which expression gives $\dfrac{dy}{dx}$?`,
    options: [
      [t`$u\dfrac{dv}{dx} + v\dfrac{du}{dx}$`, "Correct: the product rule."],
      [t`$\dfrac{du}{dx} \times \dfrac{dv}{dx}$`, "The derivative of a product is not the product of the derivatives."],
      [t`$u\dfrac{dv}{dx} - v\dfrac{du}{dx}$`, "The product rule adds the two terms; a minus sign belongs to the quotient rule."],
      [t`$\dfrac{du}{dx} + \dfrac{dv}{dx}$`, t`That is the derivative of the sum $u + v$, not of the product.`],
    ],
    answer: "A",
    explanation: t`Product rule: $\dfrac{d}{dx}(uv) = u\dfrac{dv}{dx} + v\dfrac{du}{dx}$.`,
  });

  b.mcq({
    d: 2, skill: "RECALL", daily: true, calculator: false,
    stem: t`If $y = \dfrac{u}{v}$, which expression gives $\dfrac{dy}{dx}$?`,
    options: [
      [t`$\dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^2}$`, "Correct: the quotient rule, starting with the bottom function v."],
      [t`$\dfrac{u\frac{dv}{dx} - v\frac{du}{dx}}{v^2}$`, "The numerator is reversed, which changes the sign of the answer."],
      [t`$\dfrac{v\frac{du}{dx} + u\frac{dv}{dx}}{v^2}$`, "The quotient rule has a minus sign in the numerator."],
      [t`$\dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v}$`, t`The denominator must be squared: $v^2$.`],
    ],
    answer: "A",
    explanation: t`Quotient rule: $\dfrac{d}{dx}\left(\dfrac{u}{v}\right) = \dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^2}$.`,
  });

  {
    const fp = (x) => -1 / (x + 1) ** 2;
    checkDeriv((x) => (x + 2) / (x + 1), fp, XS);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`Use the quotient rule to find the gradient of $y = \dfrac{x + 2}{x + 1}$ at the point where $x = 1$. Give your answer as a fraction or a decimal.`,
      value: fp(1), wrong: [0.25, -0.5],
      explanation: t`$\dfrac{dy}{dx} = \dfrac{(x + 1)(1) - (x + 2)(1)}{(x + 1)^2} = \dfrac{-1}{(x + 1)^2}$. At $x = 1$: $-\frac{1}{4}$. The answer $\frac{1}{4}$ reverses the numerator; $-\frac{1}{2}$ forgets to square the denominator.`,
    });
  }

  checkDeriv((x) => x ** 3 * Math.exp(x), (x) => x * x * Math.exp(x) * (x + 3), XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = x^3\mathrm{e}^x$, write $\dfrac{dy}{dx}$ in the form $x^n\mathrm{e}^x(x + a)$. (Use $\dfrac{d}{dx}(\mathrm{e}^x) = \mathrm{e}^x$.)`,
    template: "n = {{blank:n}}, a = {{blank:a}}",
    blanks: [{ id: "n", input: "number", accepted: [2], wrong: "3" }, { id: "a", input: "number", accepted: [3], wrong: "1" }],
    explanation: t`$u = x^3$, $u' = 3x^2$; $v = \mathrm{e}^x$, $v' = \mathrm{e}^x$. $\frac{dy}{dx} = x^3\mathrm{e}^x + 3x^2\mathrm{e}^x = x^2\mathrm{e}^x(x + 3)$.`,
    hints: [t`Take out the common factor $x^2\mathrm{e}^x$.`],
  });

  checkDeriv((x) => x * (x - 3) ** 4, (x) => (x - 3) ** 3 * (5 * x - 3), XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = x(x - 3)^4$, write $\dfrac{dy}{dx}$ in the form $(x - 3)^3(px + q)$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [{ id: "p", input: "number", accepted: [5], wrong: "4" }, { id: "q", input: "number", accepted: [-3], wrong: "3" }],
    explanation: t`$\frac{dy}{dx} = x \times 4(x - 3)^3 + (x - 3)^4 \times 1 = (x - 3)^3[4x + (x - 3)] = (x - 3)^3(5x - 3)$.`,
    hints: ["Product rule with u = x and v = (x − 3)⁴.", t`Factor out the lower power $(x - 3)^3$.`],
  });

  {
    const fp = (x) => 7 / (x + 2) ** 2;
    checkDeriv((x) => (3 * x - 1) / (x + 2), fp, XS);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the gradient of the curve $y = \dfrac{3x - 1}{x + 2}$ at the point where $x = 1$. Give your answer as an exact fraction or correct to 3 significant figures.`,
      value: fp(1), wrong: [-7 / 9, 7 / 3],
      explanation: t`$\dfrac{dy}{dx} = \dfrac{3(x + 2) - (3x - 1)(1)}{(x + 2)^2} = \dfrac{7}{(x + 2)^2}$. At $x = 1$: $\frac{7}{9}$. The answer $-\frac{7}{9}$ reverses the numerator; $\frac{7}{3}$ forgets to square.`,
      hints: ["Simplify the numerator: the x terms cancel."],
    });
  }

  checkDeriv((x) => x * Math.sin(x), (x) => Math.sin(x) + x * Math.cos(x), XS);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`With $x$ in radians, $\dfrac{d}{dx}(x\sin x) = \cos x$.`,
    answer: false,
    explanation: t`False. That multiplies the derivatives ($1 \times \cos x$). By the product rule, $\dfrac{d}{dx}(x\sin x) = x\cos x + \sin x$.`,
  });

  checkDeriv((x) => x * x / (2 * x + 1), (x) => (2 * x * (x + 1)) / (2 * x + 1) ** 2, XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = \dfrac{x^2}{2x + 1}$, write $\dfrac{dy}{dx}$ in the form $\dfrac{kx(x + 1)}{(2x + 1)^2}$.`,
    template: "k = {{blank:k}}",
    blanks: [{ id: "k", input: "number", accepted: [2], wrong: "1" }],
    explanation: t`$\dfrac{dy}{dx} = \dfrac{(2x + 1)(2x) - x^2(2)}{(2x + 1)^2} = \dfrac{4x^2 + 2x - 2x^2}{(2x + 1)^2} = \dfrac{2x^2 + 2x}{(2x + 1)^2} = \dfrac{2x(x + 1)}{(2x + 1)^2}$.`,
    hints: ["Expand the numerator only, then factorise it."],
  });

  checkDeriv((x) => x * Math.log(x), (x) => Math.log(x) + 1, XS);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\dfrac{d}{dx}(x\ln x)$ for $x > 0$.`,
    options: [
      [t`$\ln x + 1$`, t`Correct: $x \times \frac{1}{x} + \ln x \times 1$.`],
      [t`$\dfrac{1}{x}$`, t`This multiplies the derivatives $1 \times \frac{1}{x}$.`],
      [t`$\ln x + x$`, t`The term $x \times \frac{1}{x}$ simplifies to 1, not $x$.`],
      [t`$\ln x$`, t`The term $u\frac{dv}{dx} = x \times \frac{1}{x} = 1$ is missing.`],
    ],
    answer: "A",
    explanation: t`$u = x$, $v = \ln x$: $\frac{dy}{dx} = x \cdot \frac{1}{x} + \ln x \cdot 1 = 1 + \ln x$.`,
    hints: [t`$\frac{d}{dx}(\ln x) = \frac{1}{x}$.`],
  });

  {
    const fp = (x) => Math.cos(x) - x * Math.sin(x);
    checkDeriv((x) => x * Math.cos(x), fp, XS);
    chk(fp(Math.PI / 3), 0.5 - (Math.PI / 3) * (Math.sqrt(3) / 2));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Find the gradient of the curve $y = x\cos x$ at the point where $x = \dfrac{\pi}{3}$, giving your answer correct to 3 significant figures.`,
      value: fp(Math.PI / 3), wrong: [sfStr(-Math.sin(Math.PI / 3)), sfStr(0.5 + (Math.PI / 3) * (Math.sqrt(3) / 2))],
      explanation: t`$\dfrac{dy}{dx} = \cos x - x\sin x$. At $x = \frac{\pi}{3}$: $\frac{1}{2} - \frac{\pi}{3} \times \frac{\sqrt{3}}{2} = ${sfStr(fp(Math.PI / 3))}$ (3 s.f.). The value $${sfStr(-Math.sin(Math.PI / 3))}$ multiplies the derivatives; $${sfStr(0.5 + (Math.PI / 3) * (Math.sqrt(3) / 2))}$ uses $\frac{d}{dx}\cos x = +\sin x$.`,
      hints: ["The calculator must be in radian mode.", t`$\frac{d}{dx}(\cos x) = -\sin x$.`],
    });
  }

  checkDeriv((x) => x * Math.exp(x), (x) => Math.exp(x) * (x + 1), XS);
  checkDeriv((x) => x / (x + 1), (x) => 1 / (x + 1) ** 2, XS);
  checkDeriv((x) => x * x * Math.sin(x), (x) => x * (2 * Math.sin(x) + x * Math.cos(x)), XS);
  checkDeriv((x) => Math.log(x) / x, (x) => (1 - Math.log(x)) / (x * x), XS);
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its derivative (x in radians where needed).",
    pairs: [
      [t`$x\mathrm{e}^x$`, t`$\mathrm{e}^x(x + 1)$`],
      [t`$\dfrac{x}{x + 1}$`, t`$\dfrac{1}{(x + 1)^2}$`],
      [t`$x^2\sin x$`, t`$x(2\sin x + x\cos x)$`],
      [t`$\dfrac{\ln x}{x}$`, t`$\dfrac{1 - \ln x}{x^2}$`],
    ],
    explanation: t`Products use $uv' + vu'$; quotients use $\frac{vu' - uv'}{v^2}$. For example $\frac{\ln x}{x}$: $\frac{x \cdot \frac{1}{x} - \ln x \cdot 1}{x^2} = \frac{1 - \ln x}{x^2}$.`,
    hints: ["Decide first which are products and which are quotients."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Which function can be differentiated with the chain rule alone, without the product or quotient rule?",
    options: [
      [t`$\dfrac{5}{(x + 1)^3}$`, t`Correct: the numerator is a constant, so write $5(x + 1)^{-3}$ and use the chain rule.`],
      [t`$x^2(x + 1)^5$`, "This is a product of two functions of x."],
      [t`$\dfrac{x}{(x + 1)^3}$`, "The numerator x is a function of x, so this is a genuine quotient."],
      [t`$x\,\mathrm{e}^{x + 1}$`, "This is a product of x and an exponential."],
    ],
    answer: "A",
    explanation: t`A quotient with a constant numerator is just a constant times a negative power: $\frac{5}{(x + 1)^3} = 5(x + 1)^{-3}$, derivative $-15(x + 1)^{-4}$.`,
    hints: ["Look for a numerator that does not contain x."],
  });

  {
    const f = (x) => (x * x) / (x - 1);
    const fp = (x) => (x * x - 2 * x) / (x - 1) ** 2;
    checkDeriv(f, fp, [2, 3, -1]);
    same(quad.roots(1, -2, 0), [0, 2]);
    same([f(0), f(2)], [0, 4]);
    b.fib({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`Find the coordinates of the two points on the curve $y = \dfrac{x^2}{x - 1}$ at which the gradient is zero. Give the point with the smaller $x$-coordinate first.`,
      template: "({{blank:a}}, {{blank:b}}) and ({{blank:c}}, {{blank:d}})",
      blanks: [
        { id: "a", input: "number", accepted: [0], wrong: "1" },
        { id: "b", input: "number", accepted: [0], wrong: "1" },
        { id: "c", input: "number", accepted: [2], wrong: "-2" },
        { id: "d", input: "number", accepted: [4], wrong: "0" },
      ],
      explanation: t`$\dfrac{dy}{dx} = \dfrac{(x - 1)(2x) - x^2(1)}{(x - 1)^2} = \dfrac{x^2 - 2x}{(x - 1)^2} = \dfrac{x(x - 2)}{(x - 1)^2}$. This is zero when the numerator is zero: $x = 0$ or $x = 2$. Then $y = 0$ and $y = \frac{4}{1} = 4$.`,
      hints: ["A fraction is zero when its numerator is zero.", "Find y from the equation of the curve."],
    });
  }

  {
    const k = 3;
    const fp = (x) => -(2 + k) / (x - 2) ** 2;
    checkDeriv((x) => (x + k) / (x - 2), fp, [3, 4, 5]);
    chk(fp(3), -5);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The curve $y = \dfrac{x + k}{x - 2}$, where $k$ is a constant, has gradient $-5$ at the point where $x = 3$. Find $k$.`,
      value: k, prefix: "k =", wrong: [-7, 7],
      explanation: t`$\dfrac{dy}{dx} = \dfrac{(x - 2) - (x + k)}{(x - 2)^2} = \dfrac{-(2 + k)}{(x - 2)^2}$. At $x = 3$: $-(2 + k) = -5$, so $k = 3$. Reversing the numerator gives $2 + k = -5$, $k = -7$.`,
      hints: ["Apply the quotient rule with k left as a letter.", "Substitute x = 3 and solve for k."],
    });
  }

  {
    const fp = (x) => (2 * x) / (x * x + 1) ** 2;
    checkDeriv((x) => (x * x) / (x * x + 1), fp, XS);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Find the gradient of the curve $y = \dfrac{x^2}{x^2 + 1}$ at the point where $x = 1.5$, correct to 3 significant figures.`,
      value: fp(1.5), wrong: [sfStr(-fp(1.5)), sfStr(3 / 3.25)],
      explanation: t`$\dfrac{dy}{dx} = \dfrac{(x^2 + 1)(2x) - x^2(2x)}{(x^2 + 1)^2} = \dfrac{2x}{(x^2 + 1)^2}$. At $x = 1.5$: $\dfrac{3}{3.25^2} = ${sfStr(fp(1.5))}$ (3 s.f.). Reversing the numerator gives the negative; not squaring the denominator gives $${sfStr(3 / 3.25)}$.`,
      hints: [t`The $2x^3$ terms in the numerator cancel.`],
    });
  }

  checkDeriv((x) => x * Math.sqrt(2 * x + 1), (x) => (3 * x + 1) / Math.sqrt(2 * x + 1), XS);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that $\dfrac{d}{dx}\left(x\sqrt{2x + 1}\right) = \dfrac{3x + 1}{\sqrt{2x + 1}}$.`,
    points: [
      t`M1 differentiates $v = (2x + 1)^{\frac{1}{2}}$ by the chain rule: $\frac{dv}{dx} = (2x + 1)^{-\frac{1}{2}}$.`,
      t`M1 applies the product rule: $x(2x + 1)^{-\frac{1}{2}} + (2x + 1)^{\frac{1}{2}}$.`,
      t`M1 writes over the common denominator $\sqrt{2x + 1}$: numerator $x + (2x + 1)$.`,
      t`A1 reaches $\dfrac{3x + 1}{\sqrt{2x + 1}}$ with no errors.`,
    ],
    modelAnswer: t`Let $u = x$ and $v = (2x + 1)^{\frac{1}{2}}$, so $\frac{du}{dx} = 1$ and $\frac{dv}{dx} = \frac{1}{2}(2x + 1)^{-\frac{1}{2}} \times 2 = (2x + 1)^{-\frac{1}{2}}$.

$$
\frac{dy}{dx} = \frac{x}{\sqrt{2x + 1}} + \sqrt{2x + 1}
$$

$$
\frac{dy}{dx} = \frac{x + (2x + 1)}{\sqrt{2x + 1}} = \frac{3x + 1}{\sqrt{2x + 1}}
$$`,
    explanation: "Product rule with the chain rule for the root, then one fraction over √(2x + 1).",
    hints: [t`$\sqrt{2x + 1} = \dfrac{2x + 1}{\sqrt{2x + 1}}$.`],
  });

  checkDeriv((x) => Math.log(x) / (x * x), (x) => (1 - 2 * Math.log(x)) / x ** 3, XS);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Given that $y = \dfrac{\ln x}{x^2}$ for $x > 0$, show that $\dfrac{dy}{dx} = \dfrac{1 - 2\ln x}{x^3}$.`,
    points: [
      t`M1 uses the quotient rule with $u = \ln x$, $v = x^2$: $\dfrac{x^2 \cdot \frac{1}{x} - \ln x \cdot 2x}{x^4}$.`,
      t`M1 simplifies the numerator to $x - 2x\ln x = x(1 - 2\ln x)$.`,
      t`A1 cancels $x$ to reach the given result.`,
    ],
    modelAnswer: t`$$
\frac{dy}{dx} = \frac{x^2 \cdot \frac{1}{x} - \ln x \cdot 2x}{(x^2)^2} = \frac{x - 2x\ln x}{x^4}
$$

$$
\frac{dy}{dx} = \frac{x(1 - 2\ln x)}{x^4} = \frac{1 - 2\ln x}{x^3}
$$`,
    explanation: "Quotient rule, then factor x out of the numerator and cancel.",
    hints: [t`$(x^2)^2 = x^4$.`],
  });

  {
    const f = (x) => (x * x + 5) / (x + 2);
    const fp = (x) => (x * x + 4 * x - 5) / (x + 2) ** 2;
    checkDeriv(f, fp, XS);
    same(quad.roots(1, 4, -5), [-5, 1]);
    chk(fp(0), -1.25);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The function $f$ is defined by $f(x) = \dfrac{x^2 + 5}{x + 2}$ for $x \neq -2$.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that $f'(x) = \dfrac{x^2 + 4x - 5}{(x + 2)^2}$.`,
          points: [t`M1 applies the quotient rule: $\dfrac{(x + 2)(2x) - (x^2 + 5)(1)}{(x + 2)^2}$.`, t`M1 expands the numerator: $2x^2 + 4x - x^2 - 5$.`, t`A1 simplifies to $x^2 + 4x - 5$.`],
          modelAnswer: t`$$
f'(x) = \frac{(x + 2)(2x) - (x^2 + 5)(1)}{(x + 2)^2} = \frac{2x^2 + 4x - x^2 - 5}{(x + 2)^2} = \frac{x^2 + 4x - 5}{(x + 2)^2}
$$`,
          explanation: "Quotient rule; simplify the numerator only." }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the values of $x$ for which $f'(x) = 0$, in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [-5], wrong: "5" }, { id: "b", input: "number", accepted: [1], wrong: "-1" }],
          explanation: t`$x^2 + 4x - 5 = (x + 5)(x - 1) = 0$, so $x = -5$ or $x = 1$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $f'(0)$.`, value: fp(0), wrong: [-2.5, 1.25],
          explanation: t`$f'(0) = \frac{-5}{4} = -1.25$. Forgetting to square the denominator gives $-2.5$.` }),
      ],
      explanation: "Use the quotient rule, simplify the numerator, and set it equal to zero for stationary values.",
      hints: [t`$u = x^2 + 5$, $v = x + 2$.`, "A fraction is zero only when its numerator is zero."],
    });
  }

  {
    const f = (x) => (x - 1) * Math.sqrt(x + 2);
    const fp = (x) => (3 * (x + 1)) / (2 * Math.sqrt(x + 2));
    checkDeriv(f, fp, XS);
    chk(fp(2), 2.25); chk(fp(-1), 0); chk(f(-1), -2); chk(fp(7), 4);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`A curve has equation $y = (x - 1)\sqrt{x + 2}$ for $x > -2$.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that $\dfrac{dy}{dx} = \dfrac{3(x + 1)}{2\sqrt{x + 2}}$.`,
          points: [t`M1 uses the product rule with $\frac{d}{dx}\sqrt{x + 2} = \frac{1}{2}(x + 2)^{-\frac{1}{2}}$.`, t`M1 writes $\sqrt{x + 2} + \dfrac{x - 1}{2\sqrt{x + 2}}$ over the denominator $2\sqrt{x + 2}$.`, t`A1 simplifies the numerator $2(x + 2) + x - 1 = 3x + 3$.`],
          modelAnswer: t`$$
\frac{dy}{dx} = (x - 1) \cdot \frac{1}{2\sqrt{x + 2}} + \sqrt{x + 2} \cdot 1
$$

$$
\frac{dy}{dx} = \frac{(x - 1) + 2(x + 2)}{2\sqrt{x + 2}} = \frac{3x + 3}{2\sqrt{x + 2}} = \frac{3(x + 1)}{2\sqrt{x + 2}}
$$`,
          explanation: "Product rule, then a single fraction." }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the gradient of the curve at the point where $x = 2$.`, value: fp(2), wrong: [4.5],
          explanation: t`$\frac{3(3)}{2\sqrt{4}} = \frac{9}{4}$.` }),
        P.fib({ label: "(c)", marks: 2, stem: "Find the coordinates of the point on the curve where the gradient is zero.", template: "({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [-1], wrong: "1" }, { id: "y", input: "number", accepted: [-2], wrong: "0" }],
          explanation: t`$3(x + 1) = 0$ gives $x = -1$; $y = (-2)\sqrt{1} = -2$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the gradient of the curve at the point where $x = 7$.`, value: fp(7), wrong: [8],
          explanation: t`$\frac{3(8)}{2\sqrt{9}} = \frac{24}{6} = 4$.` }),
      ],
      explanation: "The product rule with a chain-rule factor gives a derivative that is easy to evaluate once written as a single fraction.",
      hints: [t`$u = x - 1$, $v = (x + 2)^{\frac{1}{2}}$.`, "The gradient is zero when the numerator is zero."],
    });
  }

  b.card("FORMULA", "Product rule", t`$\dfrac{d}{dx}(uv) = u\dfrac{dv}{dx} + v\dfrac{du}{dx}$`, "Not in Cambridge's List of formulas.");
  b.card("FORMULA", "Quotient rule", t`$\dfrac{d}{dx}\left(\dfrac{u}{v}\right) = \dfrac{v\frac{du}{dx} - u\frac{dv}{dx}}{v^2}$`, "Bottom times derivative of top, minus top times derivative of bottom, over bottom squared.");
  b.card("CONCEPT", "Derivative of a product", "It is NOT the product of the derivatives.");
  b.card("CONCEPT", "Order in the quotient rule", "Reversing the numerator gives the right size with the wrong sign: start with v.");
  b.card("CONCEPT", "Factorising a product-rule answer", t`Take out the lowest power of each repeated bracket, e.g. $2x(3x - 1)^3(9x - 1)$.`);
  b.card("CONCEPT", "Constant numerator", t`$\frac{5}{(x + 1)^3} = 5(x + 1)^{-3}$: chain rule only, no quotient rule needed.`);
  b.card("FACT", t`$\dfrac{d}{dx}(x\ln x)$`, t`$\ln x + 1$`);
  b.card("FACT", t`$\dfrac{d}{dx}(x\mathrm{e}^x)$`, t`$\mathrm{e}^x(x + 1)$`);
  b.card("CONCEPT", "Simplifying a quotient-rule answer", "Expand and simplify the numerator; leave the denominator as a squared bracket.");
});
