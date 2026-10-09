// W3b: amath.calculus.integration-basics
import { concept, P, t, chk, checkAntideriv, checkDeriv } from "../lib.mjs";

concept("amath.calculus.integration-basics", { file: "calculus/integration-basics", keyPrefix: "calculus.integration-basics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find $\displaystyle\int 4x^3\,dx$.`,
    options: [
      [t`$x^4 + c$`, t`Correct: add one to the power (4) and divide by the new power: $\frac{4x^4}{4} = x^4$.`],
      [t`$12x^2 + c$`, "This differentiates 4x³ instead of integrating it."],
      [t`$4x^4 + c$`, "The power was raised but the coefficient was not divided by the new power 4."],
      [t`$\frac{4x^4}{3} + c$`, "This divides by the old power 3 instead of the new power 4."],
    ],
    answer: "A",
    explanation: t`$\displaystyle\int 4x^3\,dx = \frac{4x^4}{4} + c = x^4 + c$. Check: $\frac{d}{dx}(x^4) = 4x^3$.`,
  });

  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Why is a constant $c$ added when finding $\displaystyle\int 2x\,dx = x^2 + c$?`,
    options: [
      [t`Every function $x^2 + k$ has derivative $2x$`, "Correct: the derivative of any constant is 0, so the integral is a whole family of functions."],
      [t`The constant makes the answer exact`, "The constant has nothing to do with accuracy; it records the lost information about the constant term."],
      [t`It is the value of $x^2$ when $x = 0$`, "x² is 0 when x = 0; c is the value of the whole integral there, which is unknown."],
      [t`It replaces the $dx$ after integrating`, "The dx only shows the variable; it is not turned into c."],
    ],
    answer: "A",
    explanation: t`Differentiating removes any constant term, so integrating cannot know what it was: $x^2$, $x^2 + 7$ and $x^2 - 3$ all differentiate to $2x$. The $+\,c$ stands for all of them.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The rule $\displaystyle\int x^n\,dx = \frac{x^{n+1}}{n+1} + c$ works for every value of $n$.`,
    answer: false,
    explanation: t`False. For $n = -1$ it would divide by $n + 1 = 0$. The integral of $x^{-1} = \frac{1}{x}$ is $\ln x + c$, a different rule.`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int (10x^4 - 9x^2 + 3)\,dx$ by filling in the coefficients.`,
    template: "∫(10x⁴ − 9x² + 3) dx = {{blank:a}}x⁵ + {{blank:b}}x³ + {{blank:c}}x + c",
    blanks: [
      { id: "a", input: "number", accepted: [2], wrong: "40" },
      { id: "b", input: "number", accepted: [-3], wrong: "-18" },
      { id: "c", input: "number", accepted: [3], wrong: "0" },
    ],
    explanation: t`$\dfrac{10x^5}{5} = 2x^5$, $\dfrac{-9x^3}{3} = -3x^3$ and $\int 3\,dx = 3x$. Answers 40 and $-18$ come from differentiating instead of integrating.`,
  });

  checkAntideriv((x) => x ** 3 / 3 + x * x - 3 * x, (x) => (x + 3) * (x - 1), -2, 2);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $\displaystyle\int (x + 3)(x - 1)\,dx$.`,
    options: [
      [t`$\frac{x^3}{3} + x^2 - 3x + c$`, t`Correct: expand to $x^2 + 2x - 3$ and integrate each term.`],
      [t`$\left(\frac{x^2}{2} + 3x\right)\left(\frac{x^2}{2} - x\right) + c$`, "Each bracket was integrated separately and the results multiplied; there is no product rule like this."],
      [t`$\frac{x^3}{3} + 2x^2 - 3x + c$`, t`The $2x$ term was not divided by its new power 2.`],
      [t`$2x + 2 + c$`, t`This differentiates $x^2 + 2x - 3$ instead of integrating it.`],
    ],
    answer: "A",
    explanation: t`$(x + 3)(x - 1) = x^2 + 2x - 3$, so the integral is $\frac{x^3}{3} + x^2 - 3x + c$. Always expand a product before integrating.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Two different curves can have exactly the same gradient function.",
    answer: true,
    explanation: t`True. $y = x^3 + 1$ and $y = x^3 - 5$ both have $\frac{dy}{dx} = 3x^2$; one is a vertical translation of the other. That is why a point is needed to find the equation of a curve from its gradient.`,
  });

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each function with its indefinite integral.",
    pairs: [
      [t`$3x^2$`, t`$x^3 + c$`],
      [t`$x^{-2}$`, t`$-x^{-1} + c$`],
      [t`$x^{\frac{1}{2}}$`, t`$\frac{2}{3}x^{\frac{3}{2}} + c$`],
      [t`$5$`, t`$5x + c$`],
    ],
    explanation: t`Add one to the power and divide by the new power: $x^{-2} \to \frac{x^{-1}}{-1}$; $x^{\frac{1}{2}} \to \frac{x^{\frac{3}{2}}}{\frac{3}{2}} = \frac{2}{3}x^{\frac{3}{2}}$; a constant $5 = 5x^0 \to 5x$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which curve passes through the point $(1, 2)$ and has gradient function $\dfrac{dy}{dx} = 3x^2$?`,
    options: [
      [t`$y = x^3 + 1$`, t`Correct: integrating gives $y = x^3 + c$, and $2 = 1 + c$ gives $c = 1$.`],
      [t`$y = x^3 + 2$`, t`The y-coordinate 2 was taken as c; at x = 1 this curve gives y = 3.`],
      [t`$y = 6x - 4$`, t`This differentiates $3x^2$ and then fits the point; its gradient is 6 everywhere.`],
      [t`$y = 3x^3 - 1$`, t`The coefficient was not divided by the new power; its gradient is $9x^2$.`],
    ],
    answer: "A",
    explanation: t`$y = \int 3x^2\,dx = x^3 + c$. At $(1, 2)$: $2 = 1 + c$, so $c = 1$ and $y = x^3 + 1$.`,
  });

  {
    // dy/dx = 1/√x through (1, 3): y = 2√x + 1
    const y = (x) => 2 * Math.sqrt(x) + 1;
    checkDeriv(y, (x) => 1 / Math.sqrt(x), [1, 4, 9]);
    chk(y(1), 3);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`A curve has gradient function $\dfrac{dy}{dx} = \dfrac{1}{\sqrt{x}}$ and passes through the point $(1, 3)$. Find the value of $y$ when $x = 16$.`,
      value: y(16), wrong: [8, 10],
      explanation: t`$\dfrac{dy}{dx} = x^{-\frac{1}{2}}$, so $y = \dfrac{x^{\frac{1}{2}}}{\frac{1}{2}} + c = 2\sqrt{x} + c$. At $(1, 3)$: $3 = 2 + c$, $c = 1$. When $x = 16$: $y = 2(4) + 1 = 9$. The answer 8 forgets $c$; 10 takes $c = 3 - 1$ wrongly as 2.`,
    });
  }

  {
    // f'(x) = 6x − 5, f(2) = 4: f(x) = 3x² − 5x + 2
    const f = (x) => 3 * x * x - 5 * x + 2;
    checkDeriv(f, (x) => 6 * x - 5, [0, 2]);
    chk(f(2), 4);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: t`It is given that $f'(x) = 6x - 5$ and $f(2) = 4$. Find $f(-1)$.`,
      value: f(-1), wrong: [8, -11],
      explanation: t`$f(x) = 3x^2 - 5x + c$. From $f(2) = 4$: $12 - 10 + c = 4$, so $c = 2$. Then $f(-1) = 3 + 5 + 2 = 10$. The answer 8 leaves out $c$; $-11$ is $f'(-1)$, the gradient, not the value of the function.`,
    });
  }

  {
    checkAntideriv((x) => -1 / (x * x), (x) => 2 / x ** 3, 0.5, 3);
    b.expr({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find $\displaystyle\int \frac{2}{x^3}\,dx$. Use $c$ for the constant and write powers with ^, for example -1/x^2 + c.`,
      accepted: ["-1/x^2+c", "-x^-2+c", "-x^(-2)+c", "c-1/x^2", "c-x^-2", "-1/(x^2)+c", "-(1/x^2)+c"],
      wrong: ["-1/x^4+c", "1/x^2+c"],
      explanation: t`$\dfrac{2}{x^3} = 2x^{-3}$. Add one to the power: $-2$. Divide by $-2$: $\dfrac{2x^{-2}}{-2} = -x^{-2}$. So the integral is $-\dfrac{1}{x^2} + c$. Going to $x^{-4}$ subtracts one instead of adding one.`,
      hints: [t`Write $\frac{2}{x^3}$ as $2x^{-3}$.`, t`The new power is $-3 + 1 = -2$.`],
    });
  }

  {
    checkAntideriv((x) => 4 * x ** 1.5 - 8 * Math.sqrt(x), (x) => 6 * Math.sqrt(x) - 4 / Math.sqrt(x), 0.5, 5);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find $\displaystyle\int \left(6\sqrt{x} - \frac{4}{\sqrt{x}}\right)dx$ by filling in the coefficients.`,
      template: "integral = {{blank:a}}x^(3/2) + {{blank:b}}x^(1/2) + c",
      blanks: [
        { id: "a", input: "number", accepted: [4], wrong: "9" },
        { id: "b", input: "number", accepted: [-8], wrong: "-2" },
      ],
      explanation: t`$6x^{\frac{1}{2}} \to 6 \times \frac{2}{3}x^{\frac{3}{2}} = 4x^{\frac{3}{2}}$ and $-4x^{-\frac{1}{2}} \to -4 \times 2x^{\frac{1}{2}} = -8x^{\frac{1}{2}}$. The values 9 and $-2$ multiply by the new power instead of dividing by it.`,
      hints: [t`Dividing by $\frac{3}{2}$ is the same as multiplying by $\frac{2}{3}$.`, t`$\frac{1}{\sqrt{x}} = x^{-\frac{1}{2}}$, whose new power is $\frac{1}{2}$.`],
    });
  }

  {
    checkAntideriv((x) => x + 4 / x, (x) => (x * x - 4) / (x * x), 0.5, 4);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find $\displaystyle\int \frac{x^2 - 4}{x^2}\,dx$.`,
      options: [
        [t`$x + \frac{4}{x} + c$`, t`Correct: $\frac{x^2 - 4}{x^2} = 1 - 4x^{-2}$, which integrates to $x + 4x^{-1}$.`],
        [t`$x - \frac{4}{x} + c$`, t`Sign slip: $\int -4x^{-2}\,dx = \frac{-4x^{-1}}{-1} = +4x^{-1}$.`],
        [t`$x + \frac{8}{x^3} + c$`, t`$-4x^{-2}$ was differentiated, not integrated.`],
        [t`$\frac{x^3/3 - 4x}{x^3/3} + c$`, "The numerator and denominator were integrated separately; split the fraction first."],
      ],
      answer: "A",
      explanation: t`Divide each term by $x^2$: $1 - 4x^{-2}$. Then $\int 1\,dx = x$ and $\int -4x^{-2}\,dx = \frac{-4x^{-1}}{-1} = \frac{4}{x}$. Total: $x + \frac{4}{x} + c$.`,
      hints: ["Split the fraction into separate terms before integrating."],
    });
  }

  {
    // dy/dx = 3√x through (4, 10): y = 2x^{3/2} − 6
    const y = (x) => 2 * x ** 1.5 - 6;
    checkDeriv(y, (x) => 3 * Math.sqrt(x), [1, 4, 9]);
    chk(y(4), 10);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The gradient of a curve at the point $(x, y)$ is $3\sqrt{x}$. The curve passes through $(4, 10)$. Find the value of $y$ when $x = 9$.`,
      value: y(9), wrong: [54, 64],
      explanation: t`$y = \int 3x^{\frac{1}{2}}\,dx = 3 \times \frac{2}{3}x^{\frac{3}{2}} + c = 2x^{\frac{3}{2}} + c$. At $(4, 10)$: $10 = 2(8) + c$, so $c = -6$. At $x = 9$: $y = 2(27) - 6 = 48$. The answer 54 forgets $c$.`,
      hints: [t`$4^{\frac{3}{2}} = 8$ and $9^{\frac{3}{2}} = 27$.`],
    });
  }

  {
    // dy/dx = kx − 4 with a stationary point at x = 2: k = 2; through (2, −1): y = x² − 4x + 3
    const k = 4 / 2;
    const y = (x) => (k / 2) * x * x - 4 * x + 3;
    chk(y(2), -1);
    checkDeriv(y, (x) => k * x - 4, [0, 1, 3]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`A curve has gradient function $\dfrac{dy}{dx} = kx - 4$, where $k$ is a constant. The curve has a stationary point at $(2, -1)$. Find $k$, and the $y$-coordinate of the point where the curve crosses the $y$-axis.`,
      template: "k = {{blank:k}}; the curve crosses the y-axis at y = {{blank:c}}",
      blanks: [
        { id: "k", input: "number", accepted: [k], wrong: "4" },
        { id: "c", input: "number", accepted: [y(0)], wrong: "-1" },
      ],
      explanation: t`At a stationary point $\frac{dy}{dx} = 0$: $2k - 4 = 0$, so $k = 2$. Then $y = x^2 - 4x + c$; at $(2, -1)$: $-1 = 4 - 8 + c$, so $c = 3$. The $y$-intercept is $y = 3$.`,
      hints: [t`Stationary point: $\frac{dy}{dx} = 0$ at $x = 2$.`, "The y-intercept is the value of c."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Tatenda writes $\displaystyle\int (3x^2 + 2)\,dx = x^3 + 2x$. Explain what is missing and why it matters when the integral is used to find the equation of a curve.`,
    points: [
      t`States that the arbitrary constant $+\,c$ is missing (derivatives of all $x^3 + 2x + c$ are equal).`,
      "Explains that a given point on the curve is used to find c; without it the curve cannot be fixed (the wrong curve is found).",
    ],
    modelAnswer: t`The answer needs $+\,c$, because $x^3 + 2x + c$ has derivative $3x^2 + 2$ for every constant $c$. To find the equation of a particular curve, you substitute a known point to find $c$; leaving it out gives a different curve that does not pass through the point.`,
    explanation: "Integration gives a family of curves; a point picks one of them.",
    hints: ["Differentiate x³ + 2x + 5. What do you get?"],
  });

  {
    // (a) d/dx[(x − 2)√x] = (3x − 2)/(2√x); (b) ∫(3x − 2)/√x dx = 2(x − 2)√x + c
    checkDeriv((x) => (x - 2) * Math.sqrt(x), (x) => (3 * x - 2) / (2 * Math.sqrt(x)), [0.5, 1, 4]);
    checkAntideriv((x) => 2 * (x - 2) * Math.sqrt(x), (x) => (3 * x - 2) / Math.sqrt(x), 0.5, 6);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`This question uses a derivative to find an integral.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that $\dfrac{d}{dx}\left[(x - 2)\sqrt{x}\right] = \dfrac{3x - 2}{2\sqrt{x}}$.`,
          points: [
            t`M1 writes $(x - 2)\sqrt{x} = x^{\frac{3}{2}} - 2x^{\frac{1}{2}}$ (or uses the product rule).`,
            t`M1 differentiates: $\frac{3}{2}x^{\frac{1}{2}} - x^{-\frac{1}{2}}$.`,
            t`A1 writes over the common denominator $2\sqrt{x}$ to reach $\frac{3x - 2}{2\sqrt{x}}$.`,
          ],
          modelAnswer: t`$$
(x - 2)\sqrt{x} = x^{\frac{3}{2}} - 2x^{\frac{1}{2}}
$$

$$
\frac{d}{dx}\left(x^{\frac{3}{2}} - 2x^{\frac{1}{2}}\right) = \frac{3}{2}x^{\frac{1}{2}} - x^{-\frac{1}{2}}
$$

$$
= \frac{3x}{2\sqrt{x}} - \frac{2}{2\sqrt{x}} = \frac{3x - 2}{2\sqrt{x}}
$$`,
          explanation: t`Expand to powers of $x$, differentiate, then combine over $2\sqrt{x}$.` }),
        P.expr({ label: "(b)", marks: 2, stem: t`Hence find $\displaystyle\int \frac{3x - 2}{\sqrt{x}}\,dx$. Use $c$ for the constant and write the square root as sqrt(x) or √x, for example 5(x-1)√x + c.`,
          accepted: ["2(x-2)√x+c", "2(x-2)sqrt(x)+c", "(2x-4)√x+c", "2x√x-4√x+c", "2x^(3/2)-4x^(1/2)+c", "2x^1.5-4x^0.5+c", "2√x(x-2)+c", "c+2(x-2)√x"],
          wrong: ["(x-2)√x+c", "(x-2)√x/2+c"],
          explanation: t`From (a), $\int \frac{3x - 2}{2\sqrt{x}}\,dx = (x - 2)\sqrt{x} + c$. The integrand $\frac{3x - 2}{\sqrt{x}}$ is twice this, so the integral is $2(x - 2)\sqrt{x} + c$.` }),
      ],
      explanation: t`Read part (a) backwards: if $F'(x) = f(x)$ then $\int 2f(x)\,dx = 2F(x) + c$.`,
      hints: [t`Compare $\frac{3x - 2}{\sqrt{x}}$ with $\frac{3x - 2}{2\sqrt{x}}$: what is the multiple?`],
    });
  }

  {
    // dy/dx = 3x² − 6x through (3, 2): y = x³ − 3x² + 2; stationary points (0, 2) and (2, −2)
    const y = (x) => x ** 3 - 3 * x * x + 2;
    checkDeriv(y, (x) => 3 * x * x - 6 * x, [-1, 1, 3]);
    chk(y(3), 2); chk(y(0), 2); chk(y(2), -2);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`A curve has gradient function $\dfrac{dy}{dx} = 3x^2 - 6x$ and passes through the point $(3, 2)$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the equation of the curve in the form $y = x^3 + px^2 + q$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [-3], wrong: "-6" }, { id: "q", input: "number", accepted: [2], wrong: "0" }],
          explanation: t`$y = x^3 - 3x^2 + c$. At $(3, 2)$: $2 = 27 - 27 + c$, so $c = 2$.` }),
        P.fib({ label: "(b)", marks: 4, stem: t`Find the coordinates of the two stationary points of the curve, the one with the smaller $x$-coordinate first.`, template: "({{blank:x1}}, {{blank:y1}}) and ({{blank:x2}}, {{blank:y2}})",
          blanks: [
            { id: "x1", input: "number", accepted: [0], wrong: "2" },
            { id: "y1", input: "number", accepted: [2], wrong: "0" },
            { id: "x2", input: "number", accepted: [2], wrong: "0" },
            { id: "y2", input: "number", accepted: [-2], wrong: "-4" },
          ],
          explanation: t`$3x^2 - 6x = 3x(x - 2) = 0$ gives $x = 0$ or $x = 2$. Then $y(0) = 2$ and $y(2) = 8 - 12 + 2 = -2$.` }),
      ],
      explanation: "Integrate, use the point to find c, then set dy/dx = 0 for the stationary points and substitute into y.",
      hints: [t`$\int (3x^2 - 6x)\,dx = x^3 - 3x^2 + c$.`, "Substitute the x-values into the equation of the curve, not into dy/dx."],
    });
  }

  {
    // dy/dx = 2x + k/x², stationary at x = 1 → k = −2; through (1, 4): y = x² + 2/x + 1
    const k = -2;
    chk(2 * 1 + k / 1, 0);
    const y = (x) => x * x + 2 / x + 1;
    checkDeriv(y, (x) => 2 * x + k / (x * x), [0.5, 1, 3]);
    chk(y(1), 4);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The gradient of a curve at the point $(x, y)$ is given by $\dfrac{dy}{dx} = 2x + \dfrac{k}{x^2}$, where $k$ is a constant. The curve has a stationary point at $(1, 4)$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Find the value of $k$.`, value: k, wrong: [2],
          explanation: t`At $x = 1$, $\frac{dy}{dx} = 0$: $2 + k = 0$, so $k = -2$.` }),
        P.fib({ label: "(b)", marks: 3, stem: t`Find the equation of the curve in the form $y = x^2 + \dfrac{a}{x} + b$.`, template: "a = {{blank:a}}, b = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [2], wrong: "-2" }, { id: "b", input: "number", accepted: [1], wrong: "3" }],
          explanation: t`$\int (2x - 2x^{-2})\,dx = x^2 - \frac{2x^{-1}}{-1} + c = x^2 + \frac{2}{x} + c$. At $(1, 4)$: $4 = 1 + 2 + c$, so $c = 1$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $y$ when $x = 2$.`, value: y(2), wrong: [4, 7],
          explanation: t`$y = 4 + \frac{2}{2} + 1 = 6$.` }),
      ],
      explanation: "Use the stationary point twice: dy/dx = 0 gives k, and the coordinates give the constant of integration.",
      hints: [t`$\frac{k}{x^2} = kx^{-2}$ integrates to $-kx^{-1}$.`, t`Stationary point: $\frac{dy}{dx} = 0$.`],
    });
  }

  b.card("DEFINITION", "Integration", "The reverse process of differentiation: if F′(x) = f(x), then ∫ f(x) dx = F(x) + c.");
  b.card("FORMULA", t`$\displaystyle\int ax^n\,dx$`, t`$\dfrac{a x^{n+1}}{n+1} + c$, for $n \neq -1$`, "Add one to the power, divide by the new power. Not in Cambridge's List of formulas.");
  b.card("CONCEPT", "Why + c?", "The derivative of any constant is 0, so an indefinite integral is a family of functions that differ by a constant.");
  b.card("FACT", t`$\displaystyle\int k\,dx$ (k a constant)`, t`$kx + c$`);
  b.card("CONCEPT", "Before integrating", "Rewrite roots and reciprocals as powers of x, expand brackets and split fractions with a single-term denominator. There is no product or quotient rule for integration.");
  b.card("FACT", t`$\displaystyle\int \frac{1}{\sqrt{x}}\,dx$`, t`$2\sqrt{x} + c$ (since $x^{-\frac{1}{2}} \to \frac{x^{\frac{1}{2}}}{\frac{1}{2}}$)`);
  b.card("CONCEPT", "Equation of a curve from its gradient", "Integrate dy/dx, then substitute a known point (x, y) to find c, and write the final answer as y = ….");
  b.card("CONCEPT", "\"Hence\" integration", t`If $\frac{d}{dx}F(x) = f(x)$, then $\int f(x)\,dx = F(x) + c$ and $\int kf(x)\,dx = kF(x) + c$.`);
  b.card("FACT", "Checking an integral", "Differentiate your answer: you must get back exactly the function you integrated.");
});
