// W3a: amath.calculus.chain-rule
import { concept, P, t, chk, same, checkDeriv, sfStr } from "../lib.mjs";

const XS = [0.3, 1.1, 2.4];

concept("amath.calculus.chain-rule", { file: "calculus/chain-rule", keyPrefix: "calculus.chain-rule" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`If $y$ is a function of $u$ and $u$ is a function of $x$, which statement is the chain rule?`,
    options: [
      [t`$\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$`, "Correct: the rates along the chain multiply."],
      [t`$\dfrac{dy}{dx} = \dfrac{dy}{du} \div \dfrac{du}{dx}$`, t`Dividing would give $\frac{dy}{du} \times \frac{dx}{du}$, which does not "cancel" to $\frac{dy}{dx}$.`],
      [t`$\dfrac{dy}{dx} = \dfrac{dy}{du} + \dfrac{du}{dx}$`, "Rates along a chain multiply; they do not add."],
      [t`$\dfrac{dy}{dx} = \dfrac{du}{dy} \times \dfrac{dx}{du}$`, t`Both fractions are upside down; this gives $\frac{dx}{dy}$.`],
    ],
    answer: "A",
    explanation: t`The chain rule: $\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$. If $y$ changes 5 times as fast as $u$ and $u$ 3 times as fast as $x$, $y$ changes 15 times as fast as $x$.`,
  });

  checkDeriv((x) => (2 * x + 1) ** 4, (x) => 8 * (2 * x + 1) ** 3, XS);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Differentiate $y = (2x + 1)^4$ with respect to $x$.`,
    options: [
      [t`$8(2x + 1)^3$`, t`Correct: $4(2x + 1)^3 \times 2$.`],
      [t`$4(2x + 1)^3$`, "This forgets to multiply by 2, the derivative of the inside."],
      [t`$8(2x + 1)^4$`, "The power must go down by one, to 3."],
      [t`$4(2)^3$`, "The inside is left unchanged when the outside is differentiated; it does not become its derivative."],
    ],
    answer: "A",
    explanation: t`Outside: $4(2x + 1)^3$; inside: $\frac{d}{dx}(2x + 1) = 2$. So $\frac{dy}{dx} = 8(2x + 1)^3$.`,
  });

  {
    const fp = (x) => -3 * (5 - x) ** 2;
    checkDeriv((x) => (5 - x) ** 3, fp, XS);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`Find the gradient of the curve $y = (5 - x)^3$ at the point where $x = 3$.`,
      value: fp(3), wrong: [12, 8],
      explanation: t`$\dfrac{dy}{dx} = 3(5 - x)^2 \times (-1) = -3(5 - x)^2$. At $x = 3$: $-3 \times 4 = -12$. The answer $12$ forgets the inner derivative $-1$; 8 is $y$ at $x = 3$.`,
    });
  }

  checkDeriv((x) => (x * x + 3) ** 5, (x) => 10 * x * (x * x + 3) ** 4, XS);
  b.expr({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Differentiate $y = (x^2 + 3)^5$. Give $\dfrac{dy}{dx}$ in a factorised form such as 4x(x^2+1)^3, using ^ for powers.`,
    accepted: ["10x(x^2+3)^4", "10x(3+x^2)^4", "(x^2+3)^4(10x)", "10(x^2+3)^4x", "5(x^2+3)^4(2x)", "5(x^2+3)^4*2x", "2x*5(x^2+3)^4", "dy/dx=10x(x^2+3)^4"],
    wrong: ["5(x^2+3)^4", "10x(x^2+3)^5"],
    explanation: t`Let $u = x^2 + 3$: $\frac{dy}{du} = 5u^4$ and $\frac{du}{dx} = 2x$, so $\frac{dy}{dx} = 5(x^2 + 3)^4 \times 2x = 10x(x^2 + 3)^4$.`,
  });

  checkDeriv((x) => Math.sqrt(6 * x - 2), (x) => 3 * (6 * x - 2) ** -0.5, [0.5, 1, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = \sqrt{6x - 2}$, write $\dfrac{dy}{dx}$ in the form $k(6x - 2)^n$.`,
    template: "k = {{blank:k}}, n = {{blank:n}}",
    blanks: [{ id: "k", input: "number", accepted: [3], wrong: "0.5" }, { id: "n", input: "number", accepted: [-0.5], wrong: "0.5" }],
    explanation: t`$y = (6x - 2)^{\frac{1}{2}}$, so $\frac{dy}{dx} = \frac{1}{2}(6x - 2)^{-\frac{1}{2}} \times 6 = 3(6x - 2)^{-\frac{1}{2}}$: $k = 3$, $n = -\frac{1}{2}$.`,
    hints: ["Write the root as a power of the bracket.", "Multiply by the derivative of 6x − 2."],
  });

  {
    const fp = (x) => 3 / Math.sqrt(6 * x - 3);
    checkDeriv((x) => Math.sqrt(6 * x - 3), fp, [1, 2, 3]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the exact gradient of the curve $y = \sqrt{6x - 3}$ at the point $(2, 3)$.`,
      value: fp(2), wrong: [1 / 6, 3],
      explanation: t`$\dfrac{dy}{dx} = \frac{1}{2}(6x - 3)^{-\frac{1}{2}} \times 6 = \dfrac{3}{\sqrt{6x - 3}}$. At $x = 2$: $\dfrac{3}{\sqrt{9}} = 1$. The value $\frac{1}{6}$ forgets the factor 6 from the inside.`,
      hints: [t`$\sqrt{6(2) - 3} = 3$.`],
    });
  }

  checkDeriv((x) => (4 * x - 1) ** 3, (x) => 12 * (4 * x - 1) ** 2, XS);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\dfrac{d}{dx}\left[(4x - 1)^3\right] = 3(4x - 1)^2$.`,
    answer: false,
    explanation: t`False. The derivative of the inside, 4, is missing: $\dfrac{d}{dx}(4x - 1)^3 = 3(4x - 1)^2 \times 4 = 12(4x - 1)^2$.`,
  });

  checkDeriv((x) => 2 / (x ** 3 + 1) ** 2, (x) => -12 * x * x * (x ** 3 + 1) ** -3, XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = \dfrac{2}{(x^3 + 1)^2}$, write $\dfrac{dy}{dx}$ in the form $a x^2 (x^3 + 1)^n$.`,
    template: "a = {{blank:a}}, n = {{blank:n}}",
    blanks: [{ id: "a", input: "number", accepted: [-12], wrong: "-4" }, { id: "n", input: "number", accepted: [-3], wrong: "-1" }],
    explanation: t`$y = 2(x^3 + 1)^{-2}$. Outside: $-4(x^3 + 1)^{-3}$; inside: $3x^2$. So $\frac{dy}{dx} = -12x^2(x^3 + 1)^{-3}$.`,
    hints: ["Rewrite with a negative power.", t`The derivative of $x^3 + 1$ is $3x^2$.`],
  });

  {
    const fp = (x) => -6 / (3 * x - 5) ** 3;
    checkDeriv((x) => 1 / (3 * x - 5) ** 2, fp, [2, 2.5, 4]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the gradient of the curve $y = \dfrac{1}{(3x - 5)^2}$ at the point where $x = 2$.`,
      value: fp(2), wrong: [-2, 6],
      explanation: t`$y = (3x - 5)^{-2}$, so $\dfrac{dy}{dx} = -2(3x - 5)^{-3} \times 3 = \dfrac{-6}{(3x - 5)^3}$. At $x = 2$: $3x - 5 = 1$, so the gradient is $-6$. The value $-2$ forgets the factor 3.`,
      hints: ["Rewrite as a negative power of the bracket first."],
    });
  }

  checkDeriv((x) => (1 - x) ** 2, (x) => -2 * (1 - x), XS);
  checkDeriv((x) => Math.sqrt(3 * x + 2), (x) => 3 / (2 * Math.sqrt(3 * x + 2)), XS);
  checkDeriv((x) => (x * x + 1) ** 3, (x) => 6 * x * (x * x + 1) ** 2, XS);
  checkDeriv((x) => 1 / (4 - x * x), (x) => 2 * x / (4 - x * x) ** 2, [0.3, 1.1, 2.5]);
  b.match({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its derivative.",
    pairs: [
      [t`$(1 - x)^2$`, t`$-2(1 - x)$`],
      [t`$\sqrt{3x + 2}$`, t`$\dfrac{3}{2\sqrt{3x + 2}}$`],
      [t`$(x^2 + 1)^3$`, t`$6x(x^2 + 1)^2$`],
      [t`$\dfrac{1}{4 - x^2}$`, t`$\dfrac{2x}{(4 - x^2)^2}$`],
    ],
    explanation: t`Each time: outside derivative × inside derivative. $(1 - x)^2 \to 2(1 - x)(-1)$; $(3x + 2)^{\frac{1}{2}} \to \frac{1}{2}(3x + 2)^{-\frac{1}{2}} \times 3$; $(x^2 + 1)^3 \to 3(x^2 + 1)^2 \times 2x$; $(4 - x^2)^{-1} \to -(4 - x^2)^{-2} \times (-2x)$.`,
    hints: ["Find the inner function of each and its derivative."],
  });

  checkDeriv((x) => Math.sqrt(x * x - 7), (x) => x / Math.sqrt(x * x - 7), [3, 4, 5.5]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\dfrac{dy}{dx}$ when $y = \sqrt{x^2 - 7}$.`,
    options: [
      [t`$\dfrac{x}{\sqrt{x^2 - 7}}$`, t`Correct: $\frac{1}{2}(x^2 - 7)^{-\frac{1}{2}} \times 2x$.`],
      [t`$\dfrac{1}{2\sqrt{x^2 - 7}}$`, t`This forgets the inner derivative $2x$.`],
      [t`$\dfrac{2x}{\sqrt{x^2 - 7}}$`, t`The $\frac{1}{2}$ from the power has been dropped.`],
      [t`$\dfrac{x}{2\sqrt{x^2 - 7}}$`, t`The $\frac{1}{2}$ and the 2 from $2x$ cancel; this halves the answer again.`],
    ],
    answer: "A",
    explanation: t`$y = (x^2 - 7)^{\frac{1}{2}}$, so $\dfrac{dy}{dx} = \frac{1}{2}(x^2 - 7)^{-\frac{1}{2}} \times 2x = \dfrac{x}{\sqrt{x^2 - 7}}$.`,
    hints: ["Outside derivative, then multiply by the derivative of x² − 7."],
  });

  {
    const fp = (x) => 4 * x * (x * x - 4);
    checkDeriv((x) => (x * x - 4) ** 2, fp, XS);
    same([-2, 0, 2].map(fp), [0, 0, 0]);
    b.fib({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`The curve $y = (x^2 - 4)^2$ has three points at which the gradient is zero. Find their $x$-coordinates, in ascending order.`,
      template: "x = {{blank:a}}, x = {{blank:b}}, x = {{blank:c}}",
      blanks: [
        { id: "a", input: "number", accepted: [-2], wrong: "-4" },
        { id: "b", input: "number", accepted: [0], wrong: "1" },
        { id: "c", input: "number", accepted: [2], wrong: "4" },
      ],
      explanation: t`$\dfrac{dy}{dx} = 2(x^2 - 4) \times 2x = 4x(x^2 - 4) = 4x(x - 2)(x + 2)$. This is zero when $x = -2$, $0$ or $2$. Forgetting the inner derivative $2x$ loses the solution $x = 0$.`,
      hints: ["Differentiate with the chain rule and factorise fully.", "Do not lose the factor x from the inside."],
    });
  }

  {
    const a = 4;
    chk(3 * a * (a * 0 + 1) ** 2, 12);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The curve $y = (ax + 1)^3$, where $a$ is a constant, has gradient $12$ at the point where it crosses the $y$-axis. Find $a$.`,
      value: a, prefix: "a =", wrong: [12, 2],
      explanation: t`$\dfrac{dy}{dx} = 3(ax + 1)^2 \times a = 3a(ax + 1)^2$. On the $y$-axis $x = 0$, so the gradient is $3a(1)^2 = 3a = 12$ and $a = 4$. The value 12 ignores the factor 3 from the power.`,
      hints: ["The curve crosses the y-axis where x = 0.", "The inner derivative is a."],
    });
  }

  {
    const fp = (x) => ((8 * x) / 3) * (2 * x * x + 1) ** (-1 / 3);
    checkDeriv((x) => (2 * x * x + 1) ** (2 / 3), fp, XS);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Find the gradient of the curve $y = (2x^2 + 1)^{\frac{2}{3}}$ at the point where $x = 1.6$, giving your answer correct to 3 significant figures.`,
      value: fp(1.6), wrong: [sfStr(fp(1.6) / (4 * 1.6))],
      explanation: t`$\dfrac{dy}{dx} = \frac{2}{3}(2x^2 + 1)^{-\frac{1}{3}} \times 4x = \dfrac{8x}{3(2x^2 + 1)^{\frac{1}{3}}}$. At $x = 1.6$: $2x^2 + 1 = 6.12$, so the gradient is $\dfrac{12.8}{3 \times 6.12^{\frac{1}{3}}} = ${sfStr(fp(1.6))}$ (3 s.f.). The wrong value $${sfStr(fp(1.6) / (4 * 1.6))}$ forgets the inner derivative $4x$.`,
      hints: ["Reduce the power 2/3 by one: it becomes −1/3."],
    });
  }

  checkDeriv((x) => (x * x + 4) ** 1.5, (x) => 3 * x * Math.sqrt(x * x + 4), XS);
  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`Given that $y = (x^2 + 4)^{\frac{3}{2}}$, show that $\dfrac{dy}{dx} = 3x\sqrt{x^2 + 4}$.`,
    points: [
      t`M1 differentiates the outside: $\frac{3}{2}(x^2 + 4)^{\frac{1}{2}}$.`,
      t`M1 multiplies by the inner derivative $2x$.`,
      t`A1 simplifies to $3x(x^2 + 4)^{\frac{1}{2}} = 3x\sqrt{x^2 + 4}$.`,
    ],
    modelAnswer: t`Let $u = x^2 + 4$, so $y = u^{\frac{3}{2}}$.

$$
\frac{dy}{du} = \frac{3}{2}u^{\frac{1}{2}}, \qquad \frac{du}{dx} = 2x
$$

$$
\frac{dy}{dx} = \frac{3}{2}(x^2 + 4)^{\frac{1}{2}} \times 2x = 3x\sqrt{x^2 + 4}
$$`,
    explanation: "Chain rule with the inner function x² + 4.",
    hints: [t`$\frac{3}{2} \times 2x = 3x$.`],
  });

  {
    const y = (x) => 1 / (2 * x + 3);
    checkDeriv(y, (x) => -2 * y(x) ** 2, [0, 1, 2.5]);
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
      stem: t`Given that $y = \dfrac{1}{2x + 3}$, show that $\dfrac{dy}{dx} = -2y^2$.`,
      points: [
        t`M1 writes $y = (2x + 3)^{-1}$ and differentiates: $-(2x + 3)^{-2} \times 2$.`,
        t`M1 obtains $\frac{dy}{dx} = -\dfrac{2}{(2x + 3)^2}$.`,
        t`A1 notes $\dfrac{1}{(2x + 3)^2} = y^2$ to reach $-2y^2$.`,
      ],
      modelAnswer: t`$$
y = (2x + 3)^{-1} \Rightarrow \frac{dy}{dx} = -1(2x + 3)^{-2} \times 2 = -\frac{2}{(2x + 3)^2}
$$

$$
y^2 = \frac{1}{(2x + 3)^2} \Rightarrow \frac{dy}{dx} = -2y^2
$$`,
      explanation: "Differentiate with the chain rule, then recognise the square of y in the answer.",
      hints: [t`Square both sides of $y = \frac{1}{2x + 3}$.`],
    });
  }

  {
    const f = (x) => Math.sqrt(8 * x + 1);
    const fp = (x) => 4 * (8 * x + 1) ** -0.5;
    const f2 = (x) => -16 * (8 * x + 1) ** -1.5;
    checkDeriv(f, fp, XS); checkDeriv(fp, f2, XS);
    chk(fp(3), 0.8); chk(fp(1), 4 / 3); chk(f(1), 3);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The function $f$ is defined by $f(x) = \sqrt{8x + 1}$ for $x > 0$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $f'(x)$ in the form $k(8x + 1)^{-\frac{1}{2}}$.`, template: "k = {{blank:k}}",
          blanks: [{ id: "k", input: "number", accepted: [4], marks: 2, wrong: "0.5" }],
          explanation: t`$\frac{1}{2}(8x + 1)^{-\frac{1}{2}} \times 8 = 4(8x + 1)^{-\frac{1}{2}}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find the gradient of the curve $y = f(x)$ where $x = 3$.`, value: fp(3), wrong: [0.1],
          explanation: t`$\frac{4}{\sqrt{25}} = \frac{4}{5}$.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`Find the coordinates of the point on the curve at which the gradient is $\frac{4}{3}$.`, template: "({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [1], wrong: "9" }, { id: "y", input: "number", accepted: [3], wrong: "9" }],
          explanation: t`$\frac{4}{\sqrt{8x + 1}} = \frac{4}{3}$ gives $\sqrt{8x + 1} = 3$, so $8x + 1 = 9$, $x = 1$ and $y = 3$.` }),
        P.fib({ label: "(d)", marks: 1, stem: t`Find $f''(x)$ in the form $m(8x + 1)^{-\frac{3}{2}}$.`, template: "m = {{blank:m}}",
          blanks: [{ id: "m", input: "number", accepted: [-16], wrong: "-2" }],
          explanation: t`$4 \times \left(-\frac{1}{2}\right)(8x + 1)^{-\frac{3}{2}} \times 8 = -16(8x + 1)^{-\frac{3}{2}}$.` }),
      ],
      explanation: "Each derivative of a power of (8x + 1) brings down the power and an extra factor of 8 from the inside.",
      hints: [t`$\sqrt{8x + 1} = (8x + 1)^{\frac{1}{2}}$.`, "Every differentiation multiplies by the inner derivative 8."],
    });
  }

  {
    const y = (x) => (1 + x * x) ** -2;
    const fp = (x) => -4 * x * (1 + x * x) ** -3;
    checkDeriv(y, fp, XS);
    for (const x of XS) chk(fp(x), -4 * x * y(x) ** 1.5, 1e-9);
    chk(fp(1), -0.5);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A curve has equation $y = \dfrac{1}{(1 + x^2)^2}$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\dfrac{dy}{dx}$ in the form $ax(1 + x^2)^n$.`, template: "a = {{blank:a}}, n = {{blank:n}}",
          blanks: [{ id: "a", input: "number", accepted: [-4], wrong: "-2" }, { id: "n", input: "number", accepted: [-3], wrong: "-1" }],
          explanation: t`$y = (1 + x^2)^{-2}$: $-2(1 + x^2)^{-3} \times 2x = -4x(1 + x^2)^{-3}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the gradient of the curve at the point where $x = 1$.`, value: fp(1), wrong: [-0.25, -4],
          explanation: t`$\frac{-4(1)}{(1 + 1)^3} = -\frac{4}{8} = -\frac{1}{2}$.` }),
        P.proof({ label: "(c)", marks: 2, stem: t`Show that $\dfrac{dy}{dx} = -4xy^{\frac{3}{2}}$.`,
          points: [t`M1 finds $y^{\frac{3}{2}} = \left[(1 + x^2)^{-2}\right]^{\frac{3}{2}} = (1 + x^2)^{-3}$.`, t`A1 substitutes into $-4x(1 + x^2)^{-3}$ to reach the result.`],
          modelAnswer: t`$$
y^{\frac{3}{2}} = \left[(1 + x^2)^{-2}\right]^{\frac{3}{2}} = (1 + x^2)^{-3}
$$

$$
\frac{dy}{dx} = -4x(1 + x^2)^{-3} = -4xy^{\frac{3}{2}}
$$`,
          explanation: "Use the power law of indices on y." }),
        P.mcq({ label: "(d)", marks: 1, stem: t`What can you say about the gradient of the curve for $x > 0$?`,
          options: [
            ["It is always negative", t`Correct: $-4x < 0$ and $(1 + x^2)^{-3} > 0$ when $x > 0$.`],
            ["It is always positive", t`The factor $-4x$ is negative for positive $x$.`],
            ["It is zero", t`It is zero only at $x = 0$.`],
            ["It changes sign at x = 1", t`$(1 + x^2)^{-3}$ is never zero or negative, so nothing changes at $x = 1$.`],
          ], answer: "A", explanation: "For x > 0 the gradient is a negative number times a positive number: y decreases as x increases." }),
      ],
      explanation: "Rewrite with a negative power, apply the chain rule, and use index laws to express the result in terms of y.",
      hints: [t`$\frac{1}{(1 + x^2)^2} = (1 + x^2)^{-2}$.`, t`$(a^{-2})^{\frac{3}{2}} = a^{-3}$.`],
    });
  }

  b.card("FORMULA", "Chain rule", t`$\dfrac{dy}{dx} = \dfrac{dy}{du} \times \dfrac{du}{dx}$`, "Not in Cambridge's List of formulas.");
  b.card("FORMULA", "Power of a function", t`$\dfrac{d}{dx}[f(x)]^n = n[f(x)]^{n-1}f'(x)$`);
  b.card("FORMULA", t`$\dfrac{d}{dx}(ax + b)^n$`, t`$an(ax + b)^{n-1}$`);
  b.card("CONCEPT", "Outside, then inside", "Differentiate the outside function leaving the inside unchanged, then multiply by the derivative of the inside.");
  b.card("FACT", t`$\dfrac{d}{dx}\sqrt{f(x)}$`, t`$\dfrac{f'(x)}{2\sqrt{f(x)}}$`);
  b.card("CONCEPT", "Composite function", t`A function of a function: in $(3x^2 + 4)^5$ the inner function $3x^2 + 4$ is put into the outer function $u^5$.`);
  b.card("FACT", "Sign of a linear inside", t`For $(2 - 5x)^n$ the inner derivative is $-5$: $\frac{d}{dx}(2 - 5x)^{-3} = 15(2 - 5x)^{-4}$.`);
  b.card("CONCEPT", "Final answer", t`Substitute back so that $\frac{dy}{dx}$ is in terms of $x$ only; never leave $u$.`);
});
