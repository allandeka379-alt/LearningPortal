// W3a: amath.calculus.differentiating-powers
import { concept, P, t, chk, same, checkDeriv, quad } from "../lib.mjs";

const XS = [0.4, 1.3, 2, 3.7];

concept("amath.calculus.differentiating-powers", { file: "calculus/differentiating-powers", keyPrefix: "calculus.differentiating-powers" }, (b) => {
  checkDeriv((x) => x ** 7, (x) => 7 * x ** 6, XS);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find $\dfrac{d}{dx}\left(x^7\right)$.`,
    options: [
      [t`$7x^6$`, "Correct: bring the power down and reduce it by one."],
      [t`$6x^7$`, "The new coefficient is the old power, 7, and the new power is 6, not the other way round."],
      [t`$7x^8$`, "The power goes down by one, not up (going up is integration)."],
      [t`$x^6$`, "The power must also be brought down as a multiplier."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d}{dx}(x^n) = nx^{n-1}$, so $\dfrac{d}{dx}(x^7) = 7x^6$.`,
  });

  {
    const fp = (x) => 12 * x ** 3 - 2;
    checkDeriv((x) => 3 * x ** 4 - 2 * x, fp, XS);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`Find the gradient of the curve $y = 3x^4 - 2x$ at the point where $x = 1$.`,
      value: fp(1), wrong: [1, 12],
      explanation: t`$\dfrac{dy}{dx} = 12x^3 - 2$. At $x = 1$: $12 - 2 = 10$. The value 1 is $y$ at $x = 1$, not the gradient; 12 forgets the derivative of $-2x$.`,
    });
  }

  checkDeriv((x) => 5 * x ** 3 - 4 * x * x + 9, (x) => 15 * x * x - 8 * x, XS);
  b.expr({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Differentiate $y = 5x^3 - 4x^2 + 9$ with respect to $x$. Type your answer for $\dfrac{dy}{dx}$ using ^ for powers, for example 2x^2-3x.`,
    accepted: ["15x^2-8x", "dy/dx=15x^2-8x", "-8x+15x^2", "x(15x-8)"],
    wrong: ["15x^2-8x+9", "15x^2-8"],
    explanation: t`Term by term: $5x^3 \to 15x^2$, $-4x^2 \to -8x$, and the constant 9 differentiates to 0. So $\dfrac{dy}{dx} = 15x^2 - 8x$.`,
  });

  checkDeriv((x) => Math.sqrt(x), (x) => 1 / (2 * Math.sqrt(x)), XS);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\dfrac{d}{dx}\left(\sqrt{x}\right)$.`,
    options: [
      [t`$\dfrac{1}{2\sqrt{x}}$`, t`Correct: $x^{\frac{1}{2}} \to \frac{1}{2}x^{-\frac{1}{2}} = \dfrac{1}{2\sqrt{x}}$.`],
      [t`$\dfrac{\sqrt{x}}{2}$`, t`This keeps the power $\frac{1}{2}$; it must be reduced by one to $-\frac{1}{2}$.`],
      [t`$\dfrac{2}{\sqrt{x}}$`, t`The power $\frac{1}{2}$ comes down as a multiplier of $\frac{1}{2}$, not 2.`],
      [t`$\dfrac{3}{2}\sqrt{x}$`, t`This adds one to the power, $\frac{3}{2}$, which is how integration starts.`],
    ],
    answer: "A",
    explanation: t`Rewrite $\sqrt{x} = x^{\frac{1}{2}}$. Then $\dfrac{d}{dx}\left(x^{\frac{1}{2}}\right) = \frac{1}{2}x^{-\frac{1}{2}} = \dfrac{1}{2\sqrt{x}}$.`,
  });

  checkDeriv((x) => 2 / x ** 4, (x) => -8 * x ** -5, XS);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Differentiate $y = \dfrac{2}{x^4}$ with respect to $x$.`,
    options: [
      [t`$-8x^{-5}$`, t`Correct: $2x^{-4} \to 2 \times (-4)x^{-5}$.`],
      [t`$-8x^{-3}$`, t`Reducing $-4$ by one gives $-5$, not $-3$.`],
      [t`$8x^{-5}$`, t`The power $-4$ is negative, so the coefficient becomes negative.`],
      [t`$\dfrac{2}{4x^3}$`, "The x-term in the denominator cannot be differentiated on its own; rewrite as a negative power first."],
    ],
    answer: "A",
    explanation: t`$y = 2x^{-4}$, so $\dfrac{dy}{dx} = -8x^{-5} = -\dfrac{8}{x^5}$.`,
  });

  checkDeriv((x) => 4 * Math.sqrt(x) - 6 / x, (x) => 2 * x ** -0.5 + 6 * x ** -2, XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = 4\sqrt{x} - \dfrac{6}{x}$, write $\dfrac{dy}{dx}$ in the form $a x^{-\frac{1}{2}} + b x^{-2}$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [2], wrong: "4" }, { id: "b", input: "number", accepted: [6], wrong: "-6" }],
    explanation: t`$y = 4x^{\frac{1}{2}} - 6x^{-1}$. Then $4 \times \frac{1}{2}x^{-\frac{1}{2}} = 2x^{-\frac{1}{2}}$ and $-6 \times (-1)x^{-2} = 6x^{-2}$, so $a = 2$, $b = 6$.`,
    hints: ["Rewrite both terms as powers of x first.", "Watch the sign: −6 × (−1) is positive."],
  });

  checkDeriv((x) => (x + 1) * (x + 2), (x) => 2 * x + 3, XS);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The derivative of $(x + 1)(x + 2)$ is $1 \times 1 = 1$, found by differentiating each bracket and multiplying.`,
    answer: false,
    explanation: t`False. Derivatives do not multiply like that. Expand first: $(x + 1)(x + 2) = x^2 + 3x + 2$, whose derivative is $2x + 3$.`,
  });

  {
    const fp = (x) => 18 * x + 12;
    checkDeriv((x) => (3 * x + 2) ** 2, fp, XS);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the gradient of the curve $y = (3x + 2)^2$ at the point where $x = -1$.`,
      value: fp(-1), wrong: [-2, 1],
      explanation: t`Expand: $y = 9x^2 + 12x + 4$, so $\dfrac{dy}{dx} = 18x + 12$. At $x = -1$: $-18 + 12 = -6$. The value $-2$ comes from $2(3x + 2)$ without the factor 3 from the bracket; 1 is $y$ at $x = -1$.`,
      hints: ["Multiply out the bracket before differentiating."],
    });
  }

  checkDeriv((x) => (x ** 3 - 4 * x * x + 2) / (x * x), (x) => 1 - 4 * x ** -3, XS);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Given $y = \dfrac{x^3 - 4x^2 + 2}{x^2}$, write $\dfrac{dy}{dx}$ in the form $a + b x^{-3}$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-4" }, { id: "b", input: "number", accepted: [-4], wrong: "4" }],
    explanation: t`Divide each term by $x^2$: $y = x - 4 + 2x^{-2}$. Then $\dfrac{dy}{dx} = 1 - 4x^{-3}$, so $a = 1$ and $b = -4$.`,
    hints: [t`Split the fraction: $\frac{x^3}{x^2} - \frac{4x^2}{x^2} + \frac{2}{x^2}$.`],
  });

  {
    const fp = (x) => 4 * x ** -0.5 - 16 * x ** -2;
    checkDeriv((x) => 8 * Math.sqrt(x) + 16 / x, fp, XS);
    chk(fp(4), 1);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the gradient of the curve $y = 8\sqrt{x} + \dfrac{16}{x}$ at the point where $x = 4$.`,
      value: fp(4), wrong: [3, 0],
      explanation: t`$y = 8x^{\frac{1}{2}} + 16x^{-1}$, so $\dfrac{dy}{dx} = 4x^{-\frac{1}{2}} - 16x^{-2}$. At $x = 4$: $\dfrac{4}{2} - \dfrac{16}{16} = 2 - 1 = 1$. The value 3 comes from $+16x^{-2}$ (sign lost).`,
      hints: [t`$4^{-\frac{1}{2}} = \frac{1}{2}$ and $4^{-2} = \frac{1}{16}$.`],
    });
  }

  {
    const f2 = (x) => 12 * x * x - 12 * x;
    checkDeriv((x) => x ** 4 - 2 * x ** 3 + 5 * x, (x) => 4 * x ** 3 - 6 * x * x + 5, XS);
    checkDeriv((x) => 4 * x ** 3 - 6 * x * x + 5, f2, XS);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$f(x) = x^4 - 2x^3 + 5x$. Find $f''(x)$ in the form $ax^2 + bx$, and the value of $f''(2)$.`,
      template: "a = {{blank:a}}, b = {{blank:b}}\n\nf″(2) = {{blank:c}}",
      blanks: [
        { id: "a", input: "number", accepted: [12], wrong: "4" },
        { id: "b", input: "number", accepted: [-12], wrong: "-6" },
        { id: "c", input: "number", accepted: [f2(2)], wrong: "21" },
      ],
      explanation: t`$f'(x) = 4x^3 - 6x^2 + 5$ and $f''(x) = 12x^2 - 12x$. $f''(2) = 48 - 24 = 24$. The value 21 is $f'(2)$, the first derivative.`,
      hints: ["Differentiate twice.", "The constant 5 in f′(x) disappears in f″(x)."],
    });
  }

  checkDeriv((x) => 1 / x, (x) => -(x ** -2), XS);
  checkDeriv((x) => Math.cbrt(x), (x) => (1 / 3) * x ** (-2 / 3), XS);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its derivative.",
    pairs: [
      [t`$x^{-1}$`, t`$-x^{-2}$`],
      [t`$x^{\frac{1}{3}}$`, t`$\frac{1}{3}x^{-\frac{2}{3}}$`],
      [t`$5x$`, t`$5$`],
      [t`$5$`, t`$0$`],
    ],
    explanation: t`Use $nx^{n-1}$: $x^{-1} \to -x^{-2}$; $x^{\frac{1}{3}} \to \frac{1}{3}x^{-\frac{2}{3}}$; $5x = 5x^1 \to 5$; a constant $\to 0$.`,
  });

  {
    const f = (x) => x ** 3 - 3 * x * x - 7 * x + 4;
    const fp = (x) => 3 * x * x - 6 * x - 7;
    checkDeriv(f, fp, XS);
    const xs = quad.roots(3, -6, -9);
    same(xs, [-1, 3]);
    for (const x of xs) chk(fp(x), 2);
    same([f(-1), f(3)], [7, -17]);
    b.fib({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: t`Find the coordinates of the two points on the curve $y = x^3 - 3x^2 - 7x + 4$ at which the gradient is $2$. Give the point with the smaller $x$-coordinate first.`,
      template: "({{blank:a}}, {{blank:b}}) and ({{blank:c}}, {{blank:d}})",
      blanks: [
        { id: "a", input: "number", accepted: [-1], wrong: "1" },
        { id: "b", input: "number", accepted: [7], wrong: "2" },
        { id: "c", input: "number", accepted: [3], wrong: "-3" },
        { id: "d", input: "number", accepted: [-17], wrong: "2" },
      ],
      explanation: t`$\dfrac{dy}{dx} = 3x^2 - 6x - 7 = 2$ gives $3x^2 - 6x - 9 = 0$, so $x^2 - 2x - 3 = 0$ and $(x + 1)(x - 3) = 0$. $x = -1$: $y = -1 - 3 + 7 + 4 = 7$. $x = 3$: $y = 27 - 27 - 21 + 4 = -17$. The $y$-coordinates come from the curve, not from the gradient 2.`,
      hints: ["Set dy/dx equal to 2 and solve.", "Substitute each x into the equation of the curve."],
    });
  }

  {
    // y = ax^2 + bx: y' = 2ax + b; y'(1) = 7, y'(2) = 13 -> a = 3, b = 1
    const a = 3, bb = 1;
    chk(2 * a + bb, 7); chk(4 * a + bb, 13);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The curve $y = ax^2 + bx$ has gradient $7$ at the point where $x = 1$ and gradient $13$ at the point where $x = 2$. Find the constants $a$ and $b$.`,
      template: "a = {{blank:a}}, b = {{blank:b}}",
      blanks: [{ id: "a", input: "number", accepted: [a], wrong: "6" }, { id: "b", input: "number", accepted: [bb], wrong: "-5" }],
      explanation: t`$\dfrac{dy}{dx} = 2ax + b$. At $x = 1$: $2a + b = 7$. At $x = 2$: $4a + b = 13$. Subtracting, $2a = 6$, so $a = 3$ and $b = 1$.`,
      hints: ["Differentiate, then substitute each x-value to get two equations.", "Solve the equations simultaneously."],
    });
  }

  checkDeriv((x) => 1 / (2 * x ** 3), (x) => -1.5 * x ** -4, XS);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $\dfrac{dy}{dx}$ when $y = \dfrac{1}{2x^3}$.`,
    options: [
      [t`$-\dfrac{3}{2x^4}$`, t`Correct: $y = \frac{1}{2}x^{-3}$, so $\frac{dy}{dx} = \frac{1}{2} \times (-3)x^{-4}$.`],
      [t`$-\dfrac{6}{x^4}$`, t`This treats $\frac{1}{2x^3}$ as $2x^{-3}$; the 2 stays in the denominator, giving $\frac{1}{2}x^{-3}$.`],
      [t`$-\dfrac{3}{2x^2}$`, t`The power $-3$ reduced by one is $-4$, so $x^4$ goes in the denominator, not $x^2$.`],
      [t`$\dfrac{1}{6x^2}$`, "This differentiates the denominator on its own, which is not a valid rule."],
    ],
    answer: "A",
    explanation: t`Only the $x$ part moves up: $\dfrac{1}{2x^3} = \frac{1}{2}x^{-3}$, whose derivative is $-\frac{3}{2}x^{-4} = -\dfrac{3}{2x^4}$.`,
    hints: [t`$\dfrac{1}{2x^3} = \dfrac{1}{2} \times \dfrac{1}{x^3}$.`],
  });

  {
    const fp = (x) => 2.5 * x ** 1.5 - 3;
    checkDeriv((x) => x ** 2.5 - 3 * x, fp, XS);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Find the gradient of the curve $y = x^{2.5} - 3x$ at the point where $x = 1.7$, giving your answer correct to 3 significant figures.`,
      value: fp(1.7), wrong: [(2.5 * 1.7 ** 2.5 - 3).toFixed(2)],
      explanation: t`$\dfrac{dy}{dx} = 2.5x^{1.5} - 3$. At $x = 1.7$: $2.5 \times 1.7^{1.5} - 3 = 2.5 \times 2.2165\ldots - 3 = 2.54$ (3 s.f.). Keeping the power $2.5$ instead of reducing it to $1.5$ gives a wrong answer.`,
      hints: ["Reduce the power 2.5 by one."],
    });
  }

  checkDeriv((x) => (Math.sqrt(x) - 3) ** 2, (x) => (Math.sqrt(x) - 3) / Math.sqrt(x), XS);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Given that $y = \left(\sqrt{x} - 3\right)^2$ for $x > 0$, show that $\dfrac{dy}{dx} = \dfrac{\sqrt{x} - 3}{\sqrt{x}}$.`,
    points: [
      t`M1 expands: $y = x - 6\sqrt{x} + 9 = x - 6x^{\frac{1}{2}} + 9$.`,
      t`M1 differentiates: $\frac{dy}{dx} = 1 - 3x^{-\frac{1}{2}}$.`,
      t`A1 writes $1 - \frac{3}{\sqrt{x}}$ over the common denominator $\sqrt{x}$ to reach the given result.`,
    ],
    modelAnswer: t`$$
y = x - 6\sqrt{x} + 9 = x - 6x^{\frac{1}{2}} + 9
$$

$$
\frac{dy}{dx} = 1 - 3x^{-\frac{1}{2}} = 1 - \frac{3}{\sqrt{x}}
$$

$$
\frac{dy}{dx} = \frac{\sqrt{x} - 3}{\sqrt{x}}
$$`,
    explanation: "Expand the square, rewrite the root as a power, differentiate, then combine into one fraction.",
    hints: [t`$(\sqrt{x})^2 = x$.`],
  });

  {
    const f = (x) => 2 * x * x - 8 * Math.sqrt(x);
    const fp = (x) => 4 * x - 4 * x ** -0.5;
    const f2 = (x) => 4 + 2 * x ** -1.5;
    checkDeriv(f, fp, XS); checkDeriv(fp, f2, XS);
    chk(fp(4), 14); chk(f2(4), 4.25); chk(fp(1), 0);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`A curve has equation $y = 2x^2 - 8\sqrt{x}$ for $x > 0$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\dfrac{dy}{dx}$ in the form $px + qx^{-\frac{1}{2}}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [4], wrong: "2" }, { id: "q", input: "number", accepted: [-4], wrong: "-8" }],
          explanation: t`$y = 2x^2 - 8x^{\frac{1}{2}}$, so $\frac{dy}{dx} = 4x - 4x^{-\frac{1}{2}}$.` }),
        P.proof({ label: "(b)", marks: 2, stem: t`Show that the gradient of the curve at the point where $x = 4$ is $14$.`,
          points: [t`M1 substitutes $x = 4$ into the derivative, using $4^{-\frac{1}{2}} = \frac{1}{2}$.`, t`A1 obtains $16 - 2 = 14$.`],
          modelAnswer: t`$$
\frac{dy}{dx} = 4(4) - 4 \times 4^{-\frac{1}{2}} = 16 - 4 \times \frac{1}{2} = 16 - 2 = 14
$$`,
          explanation: "Substitute into dy/dx." }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $\dfrac{d^2y}{dx^2}$ when $x = 4$.`, value: f2(4), wrong: [3.75, 4],
          explanation: t`$\frac{d^2y}{dx^2} = 4 + 2x^{-\frac{3}{2}}$. At $x = 4$: $4 + \frac{2}{8} = 4.25$. The value 3.75 comes from $-2x^{-\frac{3}{2}}$ (sign slip).` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the value of x at which the gradient of the curve is zero.", value: 1, prefix: "x =", wrong: [0],
          explanation: t`$4x = 4x^{-\frac{1}{2}}$ gives $x^{\frac{3}{2}} = 1$, so $x = 1$.` }),
      ],
      explanation: "Rewrite the root as a power, differentiate term by term, and differentiate again for the second derivative.",
      hints: [t`$\sqrt{x} = x^{\frac{1}{2}}$.`, t`$4^{-\frac{3}{2}} = \frac{1}{8}$.`],
    });
  }

  {
    const p = 2, q = 4;
    chk(p + q, 6); chk(3 * p - q, 2);
    const fp = (x) => 3 * p * x * x - q / (x * x);
    checkDeriv((x) => p * x ** 3 + q / x, fp, XS);
    chk(fp(2), 23);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The curve $y = px^3 + \dfrac{q}{x}$, where $p$ and $q$ are constants, passes through the point $(1, 6)$, and its gradient at that point is $2$.`,
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: t`Find the values of $p$ and $q$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [p], marks: 2, wrong: "1" }, { id: "q", input: "number", accepted: [q], marks: 2, wrong: "5" }],
          explanation: t`Through $(1, 6)$: $p + q = 6$. $\frac{dy}{dx} = 3px^2 - qx^{-2}$, so at $x = 1$: $3p - q = 2$. Adding: $4p = 8$, $p = 2$, $q = 4$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Find the gradient of the curve at the point where $x = 2$.`, value: fp(2), wrong: [25, 24],
          explanation: t`$\frac{dy}{dx} = 6x^2 - \frac{4}{x^2}$. At $x = 2$: $24 - 1 = 23$. The value 25 comes from $+\frac{4}{x^2}$.` }),
      ],
      explanation: "Use the point for one equation and the gradient for a second, then solve simultaneously.",
      hints: [t`Write $\frac{q}{x}$ as $qx^{-1}$ before differentiating.`, "Substitute x = 1 into y and into dy/dx."],
    });
  }

  b.card("FORMULA", t`$\dfrac{d}{dx}\left(ax^n\right)$`, t`$anx^{n-1}$ for any rational $n$`, "Not in Cambridge's List of formulas: learn it.");
  b.card("FACT", "Derivative of a constant and of ax", t`$\frac{d}{dx}(c) = 0$; $\frac{d}{dx}(ax) = a$.`);
  b.card("CONCEPT", "Roots and reciprocals", t`Rewrite first: $\sqrt{x} = x^{\frac{1}{2}}$, $\frac{1}{x^n} = x^{-n}$, $\frac{1}{3x^2} = \frac{1}{3}x^{-2}$.`);
  b.card("FACT", t`$\dfrac{d}{dx}\left(\sqrt{x}\right)$`, t`$\dfrac{1}{2\sqrt{x}}$`);
  b.card("FACT", t`$\dfrac{d}{dx}\left(\dfrac{1}{x}\right)$`, t`$-\dfrac{1}{x^2}$`);
  b.card("CONCEPT", "Products and quotients of powers", "Expand brackets and split fractions with a single-term denominator before differentiating (or use the product and quotient rules).");
  b.card("CONCEPT", "Gradient at a point", "Differentiate first, then substitute the x-coordinate into dy/dx.");
  b.card("DEFINITION", "Second derivative", t`Differentiate $\frac{dy}{dx}$ again: $\frac{d^2y}{dx^2}$ or $f''(x)$.`);
  b.card("FACT", "Negative powers", t`Reducing $-2$ by one gives $-3$: $\frac{d}{dx}(x^{-2}) = -2x^{-3}$.`);
});
