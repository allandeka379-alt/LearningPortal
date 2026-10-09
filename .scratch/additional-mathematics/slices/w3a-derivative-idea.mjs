// W3a: amath.calculus.derivative-idea
import { concept, P, t, chk, ZIM } from "../lib.mjs";

concept("amath.calculus.derivative-idea", { file: "calculus/derivative-idea", keyPrefix: "calculus.derivative-idea" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is meant by the gradient of a curve at a point P?",
    options: [
      ["The gradient of the tangent to the curve at P", "Correct: the tangent has the same direction as the curve at P, so its gradient measures the steepness there."],
      ["The gradient of the line joining P to the origin", "That line usually cuts across the curve; its gradient depends on where the origin is, not on the shape of the curve at P."],
      ["The y-coordinate of P divided by its x-coordinate", "This is the gradient of the line OP again, not of the curve itself."],
      ["The gradient of any chord with one end at P", "A chord only approximates the tangent; different chords from P have different gradients."],
    ],
    answer: "A",
    explanation: "A curve's steepness changes from point to point. At P it is defined as the gradient of the tangent at P, the straight line that touches the curve there.",
  });

  {
    const f = (x) => x * x;
    const g = (f(2.1) - f(2)) / 0.1;
    chk(g, 4.1, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`The points $P(2, 4)$ and $Q(2.1, 4.41)$ lie on the curve $y = x^2$. Find the exact gradient of the chord $PQ$.`,
      value: g, dp: 1, wrong: [4, 0.41],
      explanation: t`Gradient $= \dfrac{4.41 - 4}{2.1 - 2} = \dfrac{0.41}{0.1} = 4.1$. The value 0.41 forgets to divide by the change in $x$; 4 is the gradient of the tangent at $P$, which the chord only approximates.`,
    });
  }

  {
    const f = (x) => x ** 3;
    const g = (f(1.1) - f(1)) / 0.1;
    chk(g, 3.31, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: t`$P$ is the point $(1, 1)$ on the curve $y = x^3$ and $Q$ is the point on the curve with $x = 1.1$. Find the exact gradient of the chord $PQ$.`,
      value: g, dp: 2, wrong: [3, 0.331],
      explanation: t`$Q$ is $(1.1, 1.331)$. Gradient $= \dfrac{1.331 - 1}{0.1} = \dfrac{0.331}{0.1} = 3.31$. It is a little more than 3, the gradient of the tangent at $P$.`,
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Chords are drawn from a fixed point $P$ on a curve to points $Q$ that move closer to $P$. Their gradients are $5.3$, $5.03$, $5.003$ and $5.0003$. What is the gradient of the curve at $P$?`,
    options: [
      [t`$5$`, "Correct: the chord gradients approach 5 as Q approaches P, so the tangent at P has gradient 5."],
      [t`$5.0003$`, "This is the last chord gradient, still slightly larger than the limit the sequence approaches."],
      [t`$5.3$`, "This is the first, least accurate chord, with Q furthest from P."],
      [t`$0$`, "The differences from 5 tend to 0, but the gradients themselves tend to 5."],
    ],
    answer: "A",
    explanation: "As Q moves towards P, the chord gradients tend to the gradient of the tangent at P. The sequence 5.3, 5.03, 5.003, … tends to 5.",
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`The symbol $\dfrac{dy}{dx}$ means the number $dy$ divided by the number $dx$.`,
    answer: false,
    explanation: t`False. $\dfrac{dy}{dx}$ is a single symbol for the derivative of $y$ with respect to $x$, the limit of $\dfrac{\delta y}{\delta x}$ as $\delta x \to 0$. There are no separate numbers $dy$ and $dx$ to divide.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each notation with its meaning.",
    pairs: [
      [t`$f'(x)$`, "The gradient function of f"],
      [t`$f''(x)$`, "The rate of change of the gradient"],
      [t`$f'(4)$`, "The gradient of the curve where x = 4"],
      [t`$\dfrac{d}{dx}\left(x^2 + 1\right)$`, t`An instruction to differentiate $x^2 + 1$`],
    ],
    explanation: t`$f'(x)$ (or $\frac{dy}{dx}$) is the gradient function; $f''(x)$ is the second derivative, the derivative of the gradient; $f'(4)$ is one number, the gradient at $x = 4$; $\frac{d}{dx}(\ldots)$ means "differentiate this with respect to $x$".`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $\dfrac{dy}{dx} = -3$ at the point where $x = 1$, then $y$ is decreasing as $x$ increases through $1$.`,
    answer: true,
    explanation: t`True. A negative gradient means the tangent slopes downwards from left to right, so $y$ decreases as $x$ increases through that point.`,
  });

  {
    const f = (x) => x * x - 3 * x;
    for (const h of [0.5, 0.01, -0.2]) chk((f(4 + h) - f(4)) / h, 5 + h, 1e-9);
    chk(f(4), 4);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false, applies: ZIM,
      stem: t`$P(4, 4)$ lies on the curve $y = x^2 - 3x$. The point $Q$ on the curve has $x$-coordinate $4 + h$. Find the gradient of the chord $PQ$ in the form $h + a$, and hence the gradient of the curve at $P$.`,
      template: "gradient of PQ = h + {{blank:a}}\n\ngradient of the curve at P = {{blank:b}}",
      blanks: [{ id: "a", input: "number", accepted: [5], wrong: "8" }, { id: "b", input: "number", accepted: [5], wrong: "4" }],
      explanation: t`$y_Q = (4 + h)^2 - 3(4 + h) = 16 + 8h + h^2 - 12 - 3h = 4 + 5h + h^2$. Gradient $= \dfrac{5h + h^2}{h} = 5 + h$, which tends to $5$ as $h \to 0$.`,
      hints: [t`Find $y_Q - y_P$ and divide by $h$.`, t`Let $h \to 0$ at the end.`],
    });
  }

  {
    const f = (x) => 3 * x * x + x;
    for (const x of [-1, 2]) for (const h of [0.4, 0.001]) chk((f(x + h) - f(x)) / h, 6 * x + 3 * h + 1, 1e-9);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false, applies: ZIM,
      stem: t`For $f(x) = 3x^2 + x$, simplify $\dfrac{f(x + h) - f(x)}{h}$ and hence state $f'(x)$. Fill in the coefficients.`,
      template: "(f(x + h) − f(x))/h = {{blank:a}}x + {{blank:b}}h + {{blank:c}}\n\nf′(x) = {{blank:d}}x + {{blank:e}}",
      blanks: [
        { id: "a", input: "number", accepted: [6], wrong: "3" },
        { id: "b", input: "number", accepted: [3], wrong: "1" },
        { id: "c", input: "number", accepted: [1], wrong: "0" },
        { id: "d", input: "number", accepted: [6], wrong: "3" },
        { id: "e", input: "number", accepted: [1], wrong: "0" },
      ],
      explanation: t`$f(x + h) = 3x^2 + 6xh + 3h^2 + x + h$, so $f(x + h) - f(x) = 6xh + 3h^2 + h$. Dividing by $h$ gives $6x + 3h + 1$, and as $h \to 0$, $f'(x) = 6x + 1$.`,
      hints: [t`$3(x + h)^2 = 3x^2 + 6xh + 3h^2$.`],
    });
  }

  {
    const f = (x) => 2 ** x;
    const g = (f(0.001) - f(0)) / 0.001;
    chk(g, 0.6933874625807, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Estimate the gradient of the curve $y = 2^x$ at the point $(0, 1)$ by finding the gradient of the chord from $(0, 1)$ to the point on the curve where $x = 0.001$. Give your answer correct to 3 significant figures.`,
      value: g, wrong: [0.001, 1],
      explanation: t`At $x = 0.001$, $y = 2^{0.001} = 1.000\,693\,4\ldots$ Gradient $= \dfrac{1.000\,693\,4 - 1}{0.001} = 0.693$ (3 s.f.). (The exact gradient is $\ln 2 = 0.6931\ldots$; the chord is a very good estimate.) The value 0.001 forgets to divide by the change in $x$.`,
      hints: ["Gradient of a chord = change in y ÷ change in x.", "Keep all the calculator digits of 2^0.001 before subtracting 1."],
    });
  }

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a curve $y = f(x)$ it is known that $f(3) = 7$ and $f'(3) = -2$. Which statement is correct?`,
    options: [
      [t`The tangent at $(3, 7)$ has gradient $-2$`, t`Correct: $f'(3)$ is the gradient of the curve, and so of its tangent, where $x = 3$; $f(3) = 7$ gives the point.`],
      [t`The curve passes through $(3, -2)$`, t`That would need $f(3) = -2$; $f'(3)$ is a gradient, not a $y$-coordinate.`],
      [t`The tangent at $(3, 7)$ has gradient $7$`, t`7 is the $y$-coordinate of the point; the gradient is $f'(3)$.`],
      [t`$y$ is increasing where $x = 3$`, t`A negative derivative means $y$ is decreasing there.`],
    ],
    answer: "A",
    explanation: t`$f(3)$ locates the point $(3, 7)$; $f'(3) = -2$ is the gradient of the tangent there, so the curve is decreasing at that point.`,
    hints: [t`Which of $f$ and $f'$ gives a $y$-coordinate, and which a gradient?`],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What does the second derivative $\dfrac{d^2y}{dx^2}$ measure?`,
    options: [
      [t`The rate at which $\dfrac{dy}{dx}$ changes as $x$ changes`, t`Correct: it is the derivative of the gradient function.`],
      [t`The square of the gradient, $\left(\dfrac{dy}{dx}\right)^2$`, "The 2s show that we differentiate twice; nothing is squared."],
      [t`The gradient at the point where $x = 2$`, t`The 2 is not a value of $x$; that would be written $f'(2)$.`],
      [t`Twice the gradient, $2\dfrac{dy}{dx}$`, "The notation means differentiating a second time, not doubling."],
    ],
    answer: "A",
    explanation: t`$\dfrac{d^2y}{dx^2} = \dfrac{d}{dx}\left(\dfrac{dy}{dx}\right)$: differentiate the gradient function again. It tells you how quickly the gradient itself is changing.`,
  });

  {
    const fp = (x) => 3 * x * x - 12;
    chk(fp(2), 0); chk(fp(-2), 0); chk(fp(3), 15);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`It is given that the gradient function of the curve $y = x^3 - 12x$ is $\dfrac{dy}{dx} = 3x^2 - 12$. Find the gradient of the curve at the point where $x = 3$.`,
      value: fp(3), wrong: [-9, 27],
      explanation: t`Substitute $x = 3$ into the gradient function: $3(3)^2 - 12 = 27 - 12 = 15$. The value $-9$ is $y$ at $x = 3$ (the coordinate, not the gradient); 27 forgets the $-12$.`,
      hints: ["Substitute into dy/dx, not into y."],
    });
  }

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4, applies: ZIM,
    stem: t`Find, from first principles, the gradient function of $y = x^2 + 4x$.`,
    points: [
      t`M1 writes $f(x + h) = (x + h)^2 + 4(x + h) = x^2 + 2xh + h^2 + 4x + 4h$.`,
      t`M1 subtracts $f(x)$ to get $2xh + h^2 + 4h$.`,
      t`M1 divides by $h$: $2x + h + 4$.`,
      t`A1 lets $h \to 0$ to reach $\frac{dy}{dx} = 2x + 4$.`,
    ],
    modelAnswer: t`Let $f(x) = x^2 + 4x$.

$$
f(x + h) - f(x) = (x^2 + 2xh + h^2 + 4x + 4h) - (x^2 + 4x) = 2xh + h^2 + 4h
$$

$$
\frac{f(x + h) - f(x)}{h} = 2x + h + 4
$$

$$
\frac{dy}{dx} = \lim_{h \to 0} (2x + h + 4) = 2x + 4
$$`,
    explanation: "Expand f(x + h), subtract f(x), divide by h, then let h tend to 0.",
    hints: ["Start with f(x + h) − f(x).", "Cancel h before letting h tend to 0."],
  });

  {
    const f = (x) => 1 / x;
    for (const x of [1, 2.5, -3]) for (const h of [0.2, 0.001]) chk((f(x + h) - f(x)) / h, -1 / (x * (x + h)), 1e-9);
    b.proof({
      d: 5, skill: "ANALYSIS", calculator: false, marks: 4, applies: ZIM,
      stem: t`Show from first principles that the derivative of $f(x) = \dfrac{1}{x}$ is $f'(x) = -\dfrac{1}{x^2}$.`,
      points: [
        t`M1 writes $f(x + h) - f(x) = \dfrac{1}{x + h} - \dfrac{1}{x}$.`,
        t`M1 combines over a common denominator: $\dfrac{x - (x + h)}{x(x + h)} = \dfrac{-h}{x(x + h)}$.`,
        t`M1 divides by $h$: $\dfrac{-1}{x(x + h)}$.`,
        t`A1 lets $h \to 0$ to reach $-\dfrac{1}{x^2}$, the given result.`,
      ],
      modelAnswer: t`$$
f(x + h) - f(x) = \frac{1}{x + h} - \frac{1}{x} = \frac{x - (x + h)}{x(x + h)} = \frac{-h}{x(x + h)}
$$

$$
\frac{f(x + h) - f(x)}{h} = \frac{-1}{x(x + h)}
$$

$$
f'(x) = \lim_{h \to 0} \frac{-1}{x(x + h)} = -\frac{1}{x^2}
$$`,
      explanation: "With a reciprocal, combine the two fractions first; the h in the numerator then cancels with the division by h.",
      hints: ["Put the two fractions over the common denominator x(x + h).", "After cancelling h, let h tend to 0."],
    });
  }

  {
    const f = (x) => x * x - 2 * x;
    for (const h of [0.1, 0.01, 0.3]) chk((f(3 + h) - f(3)) / h, 4 + h, 1e-9);
    chk(f(3), 3);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: false, applies: ZIM,
      stem: t`The point $P(3, 3)$ lies on the curve $y = x^2 - 2x$. The point $Q$ on the curve has $x$-coordinate $3 + h$, where $h \neq 0$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the gradient of the chord $PQ$ is $4 + h$.`,
          points: [t`M1 finds $y_Q = (3 + h)^2 - 2(3 + h) = 3 + 4h + h^2$.`, t`A1 divides $y_Q - 3 = 4h + h^2$ by $h$ to reach $4 + h$.`],
          modelAnswer: t`$$
y_Q = 9 + 6h + h^2 - 6 - 2h = 3 + 4h + h^2
$$

$$
\text{gradient } PQ = \frac{(3 + 4h + h^2) - 3}{(3 + h) - 3} = \frac{4h + h^2}{h} = 4 + h
$$`,
          explanation: "Gradient of a chord = difference in y ÷ difference in x." }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the gradient of $PQ$ when $h = 0.1$ and when $h = 0.01$.`, template: "h = 0.1: {{blank:a}}; h = 0.01: {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [4.1], wrong: "0.41" }, { id: "b", input: "number", accepted: [4.01], wrong: "0.0401" }],
          explanation: t`$4 + 0.1 = 4.1$ and $4 + 0.01 = 4.01$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Deduce the gradient of the curve at P.", value: 4, wrong: [4.01],
          explanation: t`As $h \to 0$, $4 + h \to 4$.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which statement about the curve at P is correct?",
          options: [
            [t`$y$ is increasing at $P$`, "Correct: the gradient 4 is positive."],
            [t`$y$ is decreasing at $P$`, "That needs a negative gradient."],
            [t`$P$ is a stationary point`, "That needs a gradient of 0."],
            [t`The tangent at $P$ is vertical`, "A vertical line has no gradient; this tangent has gradient 4."],
          ], answer: "A", explanation: "A positive gradient means the curve rises from left to right at P." }),
      ],
      explanation: "The chord gradient 4 + h tends to 4 as Q approaches P, so the tangent at P has gradient 4.",
      hints: [t`Expand $(3 + h)^2$ carefully.`, "Let h become very small in 4 + h."],
    });
  }

  {
    const f = (x) => x ** 3;
    const g1 = (f(2.1) - f(2)) / 0.1;
    const g2 = (f(2.01) - f(2)) / 0.01;
    chk(g1, 12.61, 1e-9); chk(g2, 12.0601, 1e-9);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`$P$ is the point $(2, 8)$ on the curve $y = x^3$. Chords are drawn from $P$ to points $Q$ on the curve.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Find the gradient of the chord $PQ$ when $Q$ has $x$-coordinate $2.1$. Give the exact value.`, value: g1, dp: 2, wrong: [1.261],
          explanation: t`$2.1^3 = 9.261$; gradient $= \dfrac{9.261 - 8}{0.1} = 12.61$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find the gradient of the chord when $Q$ has $x$-coordinate $2.01$. Give the exact value.`, value: g2, dp: 4, wrong: [0.120601],
          explanation: t`$2.01^3 = 8.120601$; gradient $= \dfrac{0.120601}{0.01} = 12.0601$.` }),
        P.num({ label: "(c)", marks: 1, stem: "State the gradient of the curve at P suggested by these results.", value: 12, wrong: [8],
          explanation: "The chord gradients 12.61, 12.0601, … approach 12." }),
        P.mcq({ label: "(d)", marks: 1, stem: "How could the estimate in part (c) be made more convincing?",
          options: [
            ["Use Q with x-coordinates even closer to 2, such as 2.001", "Correct: the closer Q is to P, the closer the chord gradient is to the tangent's gradient."],
            ["Use Q with x-coordinate 3", "A point further away gives a worse approximation (the gradient would be 19)."],
            ["Use the gradient of the line joining P to the origin", "That line is not a chord near P; its gradient is 4."],
            ["Average the y-coordinates of P and Q", "Averaging coordinates says nothing about steepness."],
          ], answer: "A", explanation: "Shrinking the distance between Q and P makes the chord approach the tangent." }),
      ],
      explanation: "Chord gradients from P(2, 8) to nearby points tend to the gradient of the tangent at P, which is 12.",
      hints: ["Gradient = (y_Q − 8) ÷ (x_Q − 2).", "Look at the pattern of the two answers."],
    });
  }

  b.card("DEFINITION", "Gradient of a curve at a point", "The gradient of the tangent to the curve at that point.");
  b.card("CONCEPT", "Chords and the tangent", "As Q moves along the curve towards P, the gradient of the chord PQ tends to the gradient of the tangent at P.");
  b.card("FORMULA", "First principles", t`$f'(x) = \displaystyle\lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$`, "ZIMSEC asks for it in simple cases; Cambridge excludes first principles.", { applies: ZIM });
  b.card("DEFINITION", t`$\dfrac{dy}{dx}$ or $f'(x)$`, "The derived function (derivative): the gradient of the curve at every value of x.");
  b.card("DEFINITION", t`$\dfrac{d^2y}{dx^2}$ or $f''(x)$`, "The second derivative: the derivative of the gradient function, measuring how fast the gradient changes.");
  b.card("FACT", "Sign of the derivative", t`$\frac{dy}{dx} > 0$: increasing; $\frac{dy}{dx} < 0$: decreasing; $\frac{dy}{dx} = 0$: stationary point.`);
  b.card("CONCEPT", t`$f(a)$ versus $f'(a)$`, t`$f(a)$ is the $y$-coordinate at $x = a$; $f'(a)$ is the gradient there.`);
  b.card("FACT", "Why cancel h first?", t`Putting $h = 0$ before simplifying gives $\frac{0}{0}$; divide every term by $h$, then let $h \to 0$.`, undefined, { applies: ZIM });
  b.card("CONCEPT", t`$\dfrac{d}{dx}(\ldots)$`, "An instruction: differentiate the expression in the brackets with respect to x.");
});
