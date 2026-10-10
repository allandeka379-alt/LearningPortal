// W2a: amaths.diff.first-principles (ZIMSEC formal first principles; Cambridge P1 informal chords + notation).
import { concept, P, t, chk, checkDeriv, ZP } from "../lib.mjs";

const XS = [0.4, 1.3, 2.7];
const chord = (f, a, h) => (f(a + h) - f(a)) / h;

concept("amaths.diff.first-principles", { file: "diff/first-principles", keyPrefix: "diff.first-principles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which expression defines the derivative $f'(x)$ from first principles?`,
    options: [
      [t`$\lim_{h \to 0} \dfrac{f(x + h) - f(x)}{h}$`, "Correct: the limit of the chord gradient as the horizontal step h shrinks to zero."],
      [t`$\lim_{h \to 0} \big(f(x + h) - f(x)\big)$`, "This is the change in y only; it always tends to 0 for a continuous function. You must divide by the step h."],
      [t`$\dfrac{f(x + h) - f(x)}{h}$ with $h = 0$`, "Putting h = 0 gives 0/0, which has no value. The derivative is a limit, found after cancelling h."],
      [t`$\lim_{h \to 0} \dfrac{f(x + h) + f(x)}{h}$`, "The numerator must be a difference of y-values (rise), not a sum."],
    ],
    answer: "A",
    explanation: t`The chord from $(x, f(x))$ to $(x + h, f(x + h))$ has gradient $\dfrac{f(x + h) - f(x)}{h}$. The derivative is its limit as $h \to 0$.`,
  });

  // chord of y = x² from 3 to 3.1: 6.1
  const g2 = chk(chord((x) => x * x, 3, 0.1), 6.1, 1e-9, "q2");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`$P$ and $Q$ are the points on $y = x^{2}$ with $x$-coordinates 3 and 3.1. Find the gradient of the chord $PQ$.`,
    value: g2, wrong: [6, 0.61],
    explanation: t`$P(3, 9)$ and $Q(3.1, 9.61)$. Gradient $= \dfrac{9.61 - 9}{3.1 - 3} = \dfrac{0.61}{0.1} = 6.1$. (The gradient of the curve at $x = 3$ is 6; the chord gradient is slightly larger.)`,
  });

  // x^4 chord from 1: (f(1+h) - f(1))/h = 4 + 6h + 4h² + h³
  for (const h of [0.3, 0.7, 1.5]) chk(chord((x) => x ** 4, 1, h), 4 + 6 * h + 4 * h * h + h ** 3, 1e-9, "q3");
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$P$ and $Q$ are the points on $y = x^{4}$ with $x$-coordinates 1 and $1 + h$. The gradient of $PQ$ can be written as $a + bh + ch^{2} + h^{3}$. Find $a$, $b$ and $c$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [4], wrong: 1 },
      { id: "b", input: "number", accepted: [6], wrong: 4 },
      { id: "c", input: "number", accepted: [4], wrong: 6 },
    ],
    explanation: t`$(1 + h)^{4} = 1 + 4h + 6h^{2} + 4h^{3} + h^{4}$ (coefficients 1, 4, 6, 4, 1). Subtract $1$ and divide by $h$: $4 + 6h + 4h^{2} + h^{3}$. As $h \to 0$ the gradient tends to 4, the gradient of the curve at $x = 1$.`,
    hints: ["Expand (1 + h)⁴ with the binomial coefficients 1, 4, 6, 4, 1.", "Subtract f(1) = 1 and divide every term by h."],
  });

  b.num({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a curve $y = f(x)$, the gradient of the chord joining the points with $x$-coordinates 4 and $4 + h$ is $8 + h$. State the gradient of the curve at $x = 4$.`,
    value: 8, wrong: [9, 12],
    explanation: t`The gradient of the curve is the limit of the chord gradient as $h \to 0$: $8 + h \to 8$.`,
  });

  // f(x) = x² + 5x: f(x+h) − f(x) = 2xh + h² + 5h
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`For $f(x) = x^{2} + 5x$, which expression is $f(x + h) - f(x)$?`,
    options: [
      [t`$2xh + h^{2} + 5h$`, "Correct: (x + h)² + 5(x + h) − x² − 5x = 2xh + h² + 5h."],
      [t`$2xh + h^{2} + 5x$`, "The 5x terms cancel; the term left over from 5(x + h) is 5h."],
      [t`$h^{2} + 5h$`, "The cross term 2xh from (x + h)² is missing: (x + h)² is not x² + h²."],
      [t`$2x + h + 5$`, "This is the chord gradient after dividing by h, not the difference itself."],
    ],
    answer: "A",
    explanation: t`$f(x + h) = x^{2} + 2xh + h^{2} + 5x + 5h$. Subtracting $f(x)$ leaves $2xh + h^{2} + 5h$. Dividing by $h$ and letting $h \to 0$ gives $f'(x) = 2x + 5$.`,
  });

  checkDeriv((x) => 3 * x * x - 7 * x, (x) => 6 * x - 7, XS, "q6");
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For $f(x) = 3x^{2} - 7x$, the gradient of the chord from $x$ to $x + h$ simplifies to $6x + 3h - 7$. Hence state $f'(x)$. Type your answer in terms of $x$, for example 4x+1.`,
    accepted: ["6x-7", "-7+6x"],
    wrong: ["6x+3h-7"],
    explanation: t`$f(x + h) - f(x) = 6xh + 3h^{2} - 7h$; dividing by $h$ gives $6x + 3h - 7$, and as $h \to 0$ this tends to $6x - 7$.`,
    hints: ["Let h tend to 0: which term disappears?"],
  });

  // ZIMSEC proof: d/dx 3/(x + 1) = −3/(x + 1)²
  checkDeriv((x) => 3 / (x + 1), (x) => -3 / (x + 1) ** 2, XS, "q7");
  b.proof({
    d: 3, skill: "APPLICATION", marks: 4, calculator: false, applies: ZP,
    stem: t`Differentiate $f(x) = \dfrac{3}{x + 1}$ from first principles.`,
    points: [
      t`M1 writes $f(x + h) - f(x) = \dfrac{3}{x + h + 1} - \dfrac{3}{x + 1}$`,
      t`M1 combines over the common denominator to get $\dfrac{-3h}{(x + h + 1)(x + 1)}$`,
      t`M1 divides by $h$ to get $\dfrac{-3}{(x + h + 1)(x + 1)}$`,
      t`A1 lets $h \to 0$ to reach $f'(x) = -\dfrac{3}{(x + 1)^{2}}$`,
    ],
    modelAnswer: ["$$", t`f(x + h) - f(x) = \frac{3}{x + h + 1} - \frac{3}{x + 1} = \frac{3(x + 1) - 3(x + h + 1)}{(x + h + 1)(x + 1)} = \frac{-3h}{(x + h + 1)(x + 1)}`, "$$", "", "$$", t`\frac{f(x + h) - f(x)}{h} = \frac{-3}{(x + h + 1)(x + 1)} \to -\frac{3}{(x + 1)^{2}} \text{ as } h \to 0`, "$$"].join("\n"),
    explanation: t`Combine the two fractions before dividing by $h$; the factor $h$ then cancels. Check: the power rule gives $\dfrac{d}{dx}3(x + 1)^{-1} = -3(x + 1)^{-2}$.`,
    hints: ["Put the two fractions over the common denominator (x + h + 1)(x + 1)."],
  });

  // ZIMSEC proof: d/dx cos x = −sin x
  checkDeriv(Math.cos, (x) => -Math.sin(x), XS, "q8");
  b.proof({
    d: 4, skill: "ANALYSIS", marks: 4, calculator: false, applies: ZP,
    stem: t`Given that, for $h$ in radians, $\dfrac{\sin h}{h} \to 1$ and $\dfrac{\cos h - 1}{h} \to 0$ as $h \to 0$, prove from first principles that $\dfrac{d}{dx}(\cos x) = -\sin x$.`,
    points: [
      t`M1 uses $\cos(x + h) = \cos x \cos h - \sin x \sin h$`,
      t`M1 writes $\cos(x + h) - \cos x = \cos x(\cos h - 1) - \sin x \sin h$`,
      t`M1 divides by $h$ to get $\cos x \cdot \dfrac{\cos h - 1}{h} - \sin x \cdot \dfrac{\sin h}{h}$`,
      t`A1 applies both limits to reach $-\sin x$, with the limit stated`,
    ],
    modelAnswer: ["$$", t`\cos(x + h) - \cos x = \cos x \cos h - \sin x \sin h - \cos x = \cos x(\cos h - 1) - \sin x \sin h`, "$$", "", "$$", t`\frac{\cos(x + h) - \cos x}{h} = \cos x \cdot \frac{\cos h - 1}{h} - \sin x \cdot \frac{\sin h}{h} \to \cos x \times 0 - \sin x \times 1 = -\sin x`, "$$"].join("\n"),
    explanation: t`Group the terms so that each contains one of the two standard limits. The minus sign comes from the compound-angle formula for cosine.`,
    hints: ["Expand cos(x + h) with the compound-angle formula.", "Group the cos x terms together."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $y = f(x)$, then $\dfrac{d^{2}y}{dx^{2}}$ is the rate at which the gradient $\dfrac{dy}{dx}$ changes with $x$.`,
    answer: true,
    explanation: t`True. The second derivative is the derivative of the gradient function, so it measures how quickly the gradient changes. It is also written $f''(x)$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: true,
    stem: t`For $y = x^{3}$, the chord from $x = 5$ to $x = 5.001$ has a gradient exactly equal to the gradient of the curve at $x = 5$.`,
    answer: false,
    explanation: t`False. The chord gradient is $3(5)^{2} + 3(5)h + h^{2}$ with $h = 0.001$, which is about $75.015$, slightly more than the gradient 75 of the curve. A chord gives only an approximation; the exact gradient is the limit as $h \to 0$.`,
  });
  chk(chord((x) => x ** 3, 5, 0.001), 75 + 15 * 0.001 + 1e-6, 1e-6, "q10");

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each piece of notation with its meaning.",
    pairs: [
      [t`$\dfrac{dy}{dx}$`, "the gradient function of the curve"],
      [t`$\dfrac{d^{2}y}{dx^{2}}$`, "the rate of change of the gradient"],
      [t`$f'(3)$`, "the gradient of the curve at the point where x = 3"],
      [t`$\dfrac{\delta y}{\delta x}$`, "the gradient of a chord for small changes in x and y"],
    ],
    explanation: t`$\frac{dy}{dx}$ and $f'(x)$ name the gradient function; a number in the bracket, $f'(3)$, evaluates it at one point; $\frac{\delta y}{\delta x}$ is the chord gradient whose limit is $\frac{dy}{dx}$.`,
  });

  // y = √x chord from 4 to 4.41: (2.1 − 2)/0.41
  const g12 = chord(Math.sqrt, 4, 0.41);
  chk(g12, 0.1 / 0.41, 1e-12, "q12");
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`$A$ and $B$ are the points on $y = \sqrt{x}$ with $x$-coordinates 4 and 4.41. Find the gradient of the chord $AB$, giving your answer correct to 3 significant figures.`,
    value: g12, wrong: [0.25, 0.1],
    explanation: t`$A(4, 2)$ and $B(4.41, 2.1)$ since $\sqrt{4.41} = 2.1$. Gradient $= \dfrac{2.1 - 2}{0.41} = 0.2439\ldots \approx 0.244$. The curve's gradient at $x = 4$ is $\frac{1}{2\sqrt{4}} = 0.25$, so the chord to the right is a little less steep.`,
    hints: ["Find both y-coordinates first.", "Gradient = change in y ÷ change in x."],
  });

  // √x conjugate
  checkDeriv(Math.sqrt, (x) => 1 / (2 * Math.sqrt(x)), [0.5, 2, 6], "q13");
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`To differentiate $f(x) = \sqrt{x}$ from first principles, the chord gradient $\dfrac{\sqrt{x + h} - \sqrt{x}}{h}$ is multiplied above and below by $\sqrt{x + h} + \sqrt{x}$. What does the chord gradient become?`,
    options: [
      [t`$\dfrac{1}{\sqrt{x + h} + \sqrt{x}}$, which tends to $\dfrac{1}{2\sqrt{x}}$`, t`Correct: the numerator becomes $(x + h) - x = h$, which cancels with the $h$ below.`],
      [t`$\dfrac{h}{\sqrt{x + h} + \sqrt{x}}$, which tends to $0$`, "The numerator h should cancel with the h in the denominator; it does not remain on top."],
      [t`$\dfrac{2x + h}{h\big(\sqrt{x + h} + \sqrt{x}\big)}$, which has no limit`, "Wrong product: (√(x + h) − √x)(√(x + h) + √x) is a difference of two squares, (x + h) − x."],
      [t`$\sqrt{x + h} + \sqrt{x}$, which tends to $2\sqrt{x}$`, "This inverts the result: the conjugate ends up in the denominator, not the numerator."],
    ],
    answer: "A",
    explanation: t`$(\sqrt{x + h} - \sqrt{x})(\sqrt{x + h} + \sqrt{x}) = (x + h) - x = h$. So the chord gradient is $\dfrac{h}{h(\sqrt{x + h} + \sqrt{x})} = \dfrac{1}{\sqrt{x + h} + \sqrt{x}} \to \dfrac{1}{2\sqrt{x}}$.`,
    hints: ["Use (a − b)(a + b) = a² − b².", "After cancelling h, let h → 0."],
  });

  // second derivative y = x⁴ − 3x² at x = 2: 12x² − 6 = 42
  checkDeriv((x) => x ** 4 - 3 * x * x, (x) => 4 * x ** 3 - 6 * x, XS, "q14 y'");
  checkDeriv((x) => 4 * x ** 3 - 6 * x, (x) => 12 * x * x - 6, XS, "q14 y''");
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Given that $y = x^{4} - 3x^{2}$, so that $\dfrac{dy}{dx} = 4x^{3} - 6x$, find the value of $\dfrac{d^{2}y}{dx^{2}}$ when $x = 2$.`,
    value: 12 * 4 - 6, wrong: [20, 10],
    explanation: t`Differentiate the gradient function: $\dfrac{d^{2}y}{dx^{2}} = 12x^{2} - 6$. At $x = 2$: $48 - 6 = 42$. (20 is the value of $\frac{dy}{dx}$ at $x = 2$.)`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Why is $x$ measured in radians when we state that $\dfrac{d}{dx}(\sin x) = \cos x$?`,
    options: [
      [t`Because the limit $\dfrac{\sin h}{h} \to 1$ as $h \to 0$ holds only when $h$ is in radians`, "Correct: in degrees the limit is π/180, and an extra factor π/180 would appear in the derivative."],
      [t`Because the sine of an angle in degrees cannot be found exactly without a calculator`, "Exactness of values is not the issue; the limit used in the proof depends on the unit."],
      [t`Because $\cos x$ is negative for some angles in degrees but never in radians`, "Cosine takes negative values in both units (for example at π radians or 180°)."],
      [t`Because the compound-angle formula for $\sin(x + h)$ is false in degrees`, "The compound-angle formula holds in any unit; the limit of sin h / h is what changes."],
    ],
    answer: "A",
    explanation: t`The first-principles proof uses $\lim_{h \to 0} \frac{\sin h}{h} = 1$, true only in radians. With $x$ in degrees, $\frac{d}{dx}(\sin x) = \frac{\pi}{180}\cos x$.`,
    hints: ["Which standard limit does the proof use?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2, calculator: false,
    stem: t`Rudo says: "To find the gradient of $y = x^{2}$ at $x = 6$, I put $h = 0$ into $\dfrac{(6 + h)^{2} - 36}{h}$." Explain what goes wrong and how she should find the gradient.`,
    points: [
      t`States that $h = 0$ gives $\frac{0}{0}$, which is undefined`,
      t`Says she must simplify to $12 + h$ first (cancelling $h$) and then let $h \to 0$, giving 12`,
    ],
    modelAnswer: t`Putting h = 0 gives 0/0, which has no value. She should expand: (6 + h)² − 36 = 12h + h², divide by h to get 12 + h, and then let h tend to 0, so the gradient is 12.`,
    explanation: t`The derivative is a limit. The expression is undefined at $h = 0$ but tends to 12 as $h$ approaches 0.`,
    hints: ["What is 0 ÷ 0?"],
  });

  // struct 4 marks: y = 2x² − x at x = 3: chord 11 + 2h
  for (const h of [0.2, 0.9]) chk(chord((x) => 2 * x * x - x, 3, h), 11 + 2 * h, 1e-9, "q17");
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The points $P$ and $Q$ lie on the curve $y = 2x^{2} - x$ and have $x$-coordinates 3 and $3 + h$, where $h > 0$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that the gradient of $PQ$ is $11 + 2h$.`,
        points: [t`M1 finds $y_{Q} - y_{P} = 2(3 + h)^{2} - (3 + h) - 15 = 11h + 2h^{2}$`, t`A1 divides by $h$ to obtain $11 + 2h$`],
        modelAnswer: ["$$", t`y_P = 18 - 3 = 15, \quad y_Q = 2(9 + 6h + h^{2}) - 3 - h = 15 + 11h + 2h^{2}`, "$$", "", "$$", t`\text{gradient } PQ = \frac{11h + 2h^{2}}{h} = 11 + 2h`, "$$"].join("\n"),
        explanation: "Expand fully and check that every term of the difference contains h.",
      }),
      P.num({ label: "(b)", marks: 1, stem: "Hence state the gradient of the curve at P.", value: 11, wrong: [13],
        explanation: t`As $h \to 0$, $11 + 2h \to 11$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the value of h for which the gradient of PQ is 11.5.", prefix: "h =", value: 0.25, wrong: [0.5],
        explanation: t`$11 + 2h = 11.5$ gives $2h = 0.5$, $h = 0.25$.` }),
    ],
    explanation: t`The chord gradient $11 + 2h$ approaches the curve's gradient 11 as $Q$ slides towards $P$. (Check: $\frac{dy}{dx} = 4x - 1 = 11$ at $x = 3$.)`,
    hints: ["Find the y-coordinates of P and Q first.", "Let h tend to 0 for part (b)."],
  });

  // struct 5 marks ZP: f(x) = 1/x² from first principles
  checkDeriv((x) => 1 / (x * x), (x) => -2 / x ** 3, XS, "q18");
  const g18 = -2 / (-0.5) ** 3;
  chk(g18, 16);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, applies: ZP,
    stem: t`Let $f(x) = \dfrac{1}{x^{2}}$, $x \neq 0$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 3, stem: t`Show that $\dfrac{f(x + h) - f(x)}{h} = -\dfrac{2x + h}{x^{2}(x + h)^{2}}$.`,
        points: [
          t`M1 writes $\dfrac{1}{(x + h)^{2}} - \dfrac{1}{x^{2}}$ over the common denominator $x^{2}(x + h)^{2}$`,
          t`M1 simplifies the numerator $x^{2} - (x + h)^{2}$ to $-2xh - h^{2} = -h(2x + h)$`,
          t`A1 divides by $h$ to reach the given expression`,
        ],
        modelAnswer: ["$$", t`f(x + h) - f(x) = \frac{x^{2} - (x + h)^{2}}{x^{2}(x + h)^{2}} = \frac{-2xh - h^{2}}{x^{2}(x + h)^{2}} = \frac{-h(2x + h)}{x^{2}(x + h)^{2}}`, "$$", "", "$$", t`\frac{f(x + h) - f(x)}{h} = -\frac{2x + h}{x^{2}(x + h)^{2}}`, "$$"].join("\n"),
        explanation: "Combine the fractions, factorise the numerator, then cancel h.",
      }),
      P.expr({ label: "(b)", marks: 1, stem: t`Hence find $f'(x)$. Type it in the form k/x^n, for example 5/x^4.`,
        accepted: ["-2/x^3", "-2x^-3", "-2x^(-3)", "(-2)/x^3", "-(2/x^3)"], wrong: ["-2/x^4"],
        explanation: t`As $h \to 0$: $-\dfrac{2x}{x^{2} \cdot x^{2}} = -\dfrac{2}{x^{3}}$.` }),
      P.num({ label: "(c)", marks: 1, stem: t`Find the gradient of the curve $y = f(x)$ at the point where $x = -\tfrac{1}{2}$.`, value: g18, wrong: [-16],
        explanation: t`$f'(-\tfrac{1}{2}) = -\dfrac{2}{(-\frac{1}{2})^{3}} = -\dfrac{2}{-\frac{1}{8}} = 16$.` }),
    ],
    explanation: t`From first principles $\dfrac{d}{dx}\left(x^{-2}\right) = -2x^{-3}$, agreeing with the power rule.`,
    hints: ["Common denominator x²(x + h)².", "(x + h)² − x² = 2xh + h²."],
  });

  b.card("DEFINITION", "Gradient of a curve at a point", "The gradient of the tangent at that point: the limit of the gradients of chords PQ as Q approaches P along the curve.");
  b.card("FORMULA", "Derivative from first principles", t`$f'(x) = \lim_{h \to 0} \dfrac{f(x + h) - f(x)}{h}$`, "Not in MF19; learn it.");
  b.card("CONCEPT", "Steps of differentiation from first principles", t`1. Simplify $f(x + h) - f(x)$. 2. Divide by $h$ and cancel. 3. Let $h \to 0$ and state the limit.`);
  b.card("FORMULA", "Two trigonometric limits (radians)", t`$\dfrac{\sin h}{h} \to 1$ and $\dfrac{\cos h - 1}{h} \to 0$ as $h \to 0$`, "Used to differentiate sin x and cos x from first principles.");
  b.card("DEFINITION", "Second derivative", t`$\dfrac{d^{2}y}{dx^{2}} = f''(x)$: the derivative of the gradient function; it measures how fast the gradient changes.`);
  b.card("FACT", "Why not put h = 0 directly?", t`It gives $\frac{0}{0}$, which is undefined. Cancel $h$ first, then take the limit.`);
  b.card("FACT", "Which board examines first-principles proofs?", t`ZIMSEC (Form 5): polynomials, rational functions, $\sin x$ and $\cos x$. Cambridge Paper 1 needs only the informal chord idea and notation.`);
  b.card("CONCEPT", "Chord gradient for y = x³ near x = 2", t`$\dfrac{(2 + h)^{3} - 8}{h} = 12 + 6h + h^{2} \to 12$ as $h \to 0$.`);
});
