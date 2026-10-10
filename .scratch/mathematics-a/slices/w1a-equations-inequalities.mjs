// W1a: amaths.quadratics.equations-inequalities (ZIMSEC Pure F5 incl. cubic/rational inequalities and modelling; Cambridge P1 1.1).
import { concept, P, t, chk, same, quad, ZP } from "../lib.mjs";

function scan(pred, lo = -30, hi = 30, step = 0.0005) {
  const out = [];
  let s = null;
  for (let i = 0; ; i++) {
    const x = lo + i * step;
    if (x > hi) break;
    const ok = pred(x);
    if (ok && s === null) s = x;
    if (!ok && s !== null) {
      out.push([s, x - step]);
      s = null;
    }
  }
  if (s !== null) out.push([s, hi]);
  return out.map((iv) => iv.map((v) => Math.round(v * 100) / 100));
}

concept("amaths.quadratics.equations-inequalities", { file: "quadratics/equations-inequalities", keyPrefix: "quadratics.equations-inequalities" }, (b) => {
  same(scan((x) => (x - 1) * (x - 6) < 0), [[1, 6]]);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Solve $(x - 1)(x - 6) < 0$.`,
    options: [
      [t`$1 < x < 6$`, "Correct: the ∪-shaped parabola is below the axis between its roots."],
      [t`$x < 1$ or $x > 6$`, "That is where the product is positive."],
      [t`$-6 < x < -1$`, "The roots are +1 and +6."],
      [t`$x < 6$`, "For x < 1 both factors are negative, so the product is positive."],
    ],
    answer: "A",
    explanation: t`The critical values are 1 and 6. The graph of $y = (x - 1)(x - 6)$ is $\cup$-shaped, so it is negative between the roots: $1 < x < 6$.`,
  });

  same(scan((x) => x * x - x - 12 >= 0), [[-30, -3], [4, 30]]);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $x^{2} - x - 12 \geq 0$.`,
    options: [
      [t`$x \leq -3$ or $x \geq 4$`, t`Correct: $(x - 4)(x + 3) \geq 0$ outside the roots.`],
      [t`$-3 \leq x \leq 4$`, "That is where the quadratic is less than or equal to 0."],
      [t`$x \leq -4$ or $x \geq 3$`, t`The factorisation is $(x - 4)(x + 3)$, not $(x + 4)(x - 3)$.`],
      [t`$x \geq 4$`, "Only one of the two intervals has been given."],
    ],
    answer: "A",
    explanation: t`$x^{2} - x - 12 = (x - 4)(x + 3)$, with roots $-3$ and $4$. A $\cup$-shaped graph is on or above the axis outside its roots: $x \leq -3$ or $x \geq 4$.`,
  });

  same(quad.roots(2, 1, -15), [-3, 2.5]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2x^{2} + x - 15 = 0$.`,
    template: "x = {{blank:a}} or x = {{blank:b}} (smaller value first)",
    blanks: [{ id: "a", input: "number", accepted: [-3], wrong: 3 }, { id: "b", input: "number", accepted: [2.5], wrong: -2.5 }],
    explanation: t`$2x^{2} + x - 15 = (2x - 5)(x + 3) = 0$, so $x = \frac{5}{2}$ or $x = -3$.`,
  });

  const r4 = quad.roots(2, 3, -7)[1];
  chk(r4, (-3 + Math.sqrt(65)) / 4, 1e-12);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: true,
    stem: t`Find the positive root of $2x^{2} + 3x - 7 = 0$, giving your answer to 3 significant figures.`,
    value: r4, prefix: "x =", wrong: [2.77, 2.53],
    explanation: t`$x = \dfrac{-3 \pm \sqrt{9 + 56}}{4} = \dfrac{-3 \pm \sqrt{65}}{4}$. The positive root is $\dfrac{-3 + 8.0623}{4} = 1.2656\ldots \approx 1.27$. (Dividing by 2 instead of $2a = 4$ gives 2.53.)`,
    hints: ["Use the quadratic formula with a = 2, b = 3, c = −7."],
  });

  same(scan((x) => 12 + x - x * x > 0), [[-3, 4]]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $12 + x - x^{2} > 0$.`,
    template: "{{blank:a}} < x < {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-3], wrong: -4 }, { id: "b", input: "number", accepted: [4], wrong: 3 }],
    explanation: t`Multiply by $-1$ and reverse the sign: $x^{2} - x - 12 < 0$, i.e. $(x - 4)(x + 3) < 0$, so $-3 < x < 4$. (Equivalently, the $\cap$-shaped graph of $12 + x - x^{2}$ is above the axis between its roots.)`,
    hints: ["Multiply by −1 and reverse the inequality.", "Factorise and find the critical values."],
  });

  for (const [x, y] of [[2, 3], [3, 2]]) {
    chk(x + y, 5);
    chk(x * x + y * y, 13);
  }
  same(quad.roots(1, -5, 6), [2, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve the simultaneous equations $x + y = 5$ and $x^{2} + y^{2} = 13$.`,
    template: "When x = 2, y = {{blank:a}}; when x = 3, y = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: -3 }, { id: "b", input: "number", accepted: [2], wrong: -2 }],
    explanation: t`$y = 5 - x$, so $x^{2} + (5 - x)^{2} = 13$, giving $2x^{2} - 10x + 12 = 0$, i.e. $x^{2} - 5x + 6 = 0$ and $x = 2$ or $3$. Then $y = 5 - x$: the solutions are $(2, 3)$ and $(3, 2)$.`,
    hints: ["Make y the subject of the linear equation and substitute."],
  });

  for (const x of [2, 3, -2, -3]) chk(x ** 4 - 13 * x * x + 36, 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the two positive solutions of $x^{4} - 13x^{2} + 36 = 0$.`,
    template: "x = {{blank:a}} and x = {{blank:b}} (smaller first)",
    blanks: [{ id: "a", input: "number", accepted: [2], wrong: 4 }, { id: "b", input: "number", accepted: [3], wrong: 9 }],
    explanation: t`Let $u = x^{2}$: $u^{2} - 13u + 36 = 0$, so $(u - 4)(u - 9) = 0$. Then $x^{2} = 4$ or $9$, giving $x = \pm 2$ or $\pm 3$; the positive solutions are $2$ and $3$. (4 and 9 are the values of $u$, not $x$.)`,
    hints: ["Substitute u = x²."],
  });

  // 3x + 5√x − 2 = 0 -> u = 1/3 (u = −2 rejected) -> x = 1/9
  same(quad.roots(3, 5, -2), [-2, 1 / 3]);
  chk(3 / 9 + 5 * Math.sqrt(1 / 9) - 2, 0, 1e-12);
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve $3x + 5\sqrt{x} - 2 = 0$. Give your answer as an exact fraction.`,
    value: 1 / 9, answer: "1/9", prefix: "x =", wrong: [1 / 3, 4],
    explanation: t`Let $u = \sqrt{x}$: $3u^{2} + 5u - 2 = 0$, so $(3u - 1)(u + 2) = 0$. $u = -2$ is rejected because $\sqrt{x} \geq 0$. So $\sqrt{x} = \frac{1}{3}$ and $x = \frac{1}{9}$.`,
    workedSolution: [
      t`1. Let $u = \sqrt{x}$, so $x = u^{2}$: $3u^{2} + 5u - 2 = 0$.`,
      t`2. $(3u - 1)(u + 2) = 0$, so $u = \frac{1}{3}$ or $u = -2$.`,
      t`3. $\sqrt{x} = -2$ is impossible (the square root is never negative): reject.`,
      t`4. $\sqrt{x} = \frac{1}{3}$ gives $x = \frac{1}{9}$. Check: $\frac{1}{3} + \frac{5}{3} - 2 = 0$.`,
    ].join("\n"),
    hints: ["Let u = √x.", "Which value of u is impossible?"],
  });

  same(quad.roots(1, 3, -4), [-4, 1]);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How many real solutions does $x^{4} + 3x^{2} - 4 = 0$ have?`,
    options: [
      [t`$2$`, t`Correct: $x^{2} = 1$ gives $x = \pm 1$; $x^{2} = -4$ has no real solutions.`],
      [t`$4$`, t`$x^{2} = -4$ gives no real values of $x$.`],
      [t`$1$`, t`$x^{2} = 1$ has two solutions, $1$ and $-1$.`],
      [t`$0$`, t`$x^{2} = 1$ does give real solutions.`],
    ],
    answer: "A",
    explanation: t`With $u = x^{2}$: $u^{2} + 3u - 4 = (u + 4)(u - 1) = 0$. $x^{2} = 1$ gives $x = \pm 1$, and $x^{2} = -4$ is impossible, so there are two real solutions.`,
    hints: ["Substitute u = x² and solve for u first."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The inequality $x^{2} > 9$ is equivalent to $x > 3$.`,
    answer: false,
    explanation: t`False. $x^{2} > 9$ means $x < -3$ or $x > 3$; for example $x = -4$ gives $16 > 9$.`,
  });

  same(scan((x) => x * x <= 4), [[-2, 2]]);
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The solution of $x^{2} \leq 4$ is $-2 \leq x \leq 2$.`,
    answer: true,
    explanation: t`True. $x^{2} - 4 = (x - 2)(x + 2) \leq 0$ between (and at) the roots.`,
  });

  same(scan((x) => x !== -1 && (x - 3) / (x + 1) < 0), [[-1, 3]]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Solve $\dfrac{x - 3}{x + 1} < 0$.`,
    options: [
      [t`$-1 < x < 3$`, "Correct: numerator and denominator have opposite signs exactly between −1 and 3."],
      [t`$x < -1$ or $x > 3$`, "There the fraction is positive."],
      [t`$x < 3$`, "For x < −1 both parts are negative, so the fraction is positive."],
      [t`$-1 \leq x < 3$`, "x = −1 makes the denominator zero, so it must be excluded."],
    ],
    answer: "A",
    explanation: t`Critical values $-1$ (denominator zero) and $3$ (numerator zero). The fraction has the same sign as $(x - 3)(x + 1)$, which is negative between them: $-1 < x < 3$.`,
    hints: ["Multiply both sides by (x + 1)², which is positive."],
  });

  same(scan((x) => x * (x - 3) * (x + 2) < 0), [[-30, -2], [0, 3]]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Solve the cubic inequality $x(x - 3)(x + 2) < 0$.`,
    template: "x < {{blank:a}} or {{blank:b}} < x < {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [-2], wrong: 0 },
      { id: "b", input: "number", accepted: [0], wrong: -2 },
      { id: "c", input: "number", accepted: [3], wrong: 2 },
    ],
    explanation: t`Critical values $-2, 0, 3$. Sign table: for $x < -2$ all three factors are negative (product negative); for $-2 < x < 0$ the product is positive; for $0 < x < 3$ negative; for $x > 3$ positive. So $x < -2$ or $0 < x < 3$.`,
    hints: ["List the critical values in order.", "Record the sign of each factor in each interval."],
  });

  same(scan((x) => x !== 1 && (2 * x + 1) / (x - 1) <= 1), [[-2, 1]]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`Solve $\dfrac{2x + 1}{x - 1} \leq 1$.`,
    template: "{{blank:a}} ≤ x < {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-2], wrong: 2 }, { id: "b", input: "number", accepted: [1], wrong: -1 }],
    explanation: t`Bring to one side: $\dfrac{2x + 1}{x - 1} - 1 = \dfrac{x + 2}{x - 1} \leq 0$. This is zero at $x = -2$ (included) and undefined at $x = 1$ (excluded), and negative between: $-2 \leq x < 1$. (Multiplying straight through by $x - 1$ gives $x \leq -2$, which is wrong.)`,
    hints: ["Subtract 1 and write the left side as a single fraction.", "The denominator can never be zero."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2, calculator: false, applies: ZP,
    stem: t`Farai solves $\dfrac{x + 4}{x - 2} > 3$ by writing $x + 4 > 3(x - 2)$ and obtaining $x < 5$. Explain what is wrong with his method and give the correct solution.`,
    points: [
      "Multiplying by (x − 2) is only valid when x − 2 > 0; for x < 2 the inequality sign must be reversed (so his answer wrongly includes values below 2)",
      "Correct solution 2 < x < 5 (e.g. by multiplying by (x − 2)²)",
    ],
    modelAnswer: "x − 2 may be negative, and multiplying an inequality by a negative number reverses it, so his step is invalid for x < 2 (for example x = 0 gives 4/(−2) = −2, which is not greater than 3). Multiplying by (x − 2)² > 0 gives (x − 2)(x − 5) < 0, so 2 < x < 5.",
    explanation: t`Never multiply an inequality by an expression whose sign is unknown. Multiplying by $(x - 2)^{2}$ gives $(x - 2)(10 - 2x) > 0$, i.e. $2 < x < 5$.`,
    hints: ["Test x = 0 in the original inequality."],
  });

  same(scan((x) => x * x - 7 * x + 10 < 0), [[2, 5]]);
  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Match each inequality with its solution.",
    pairs: [
      [t`$x^{2} - 7x + 10 < 0$`, t`$2 < x < 5$`],
      [t`$x^{2} - 7x + 10 > 0$`, t`$x < 2$ or $x > 5$`],
      [t`$x^{2} - 3x - 10 < 0$`, t`$-2 < x < 5$`],
      [t`$x^{2} - 3x - 10 > 0$`, t`$x < -2$ or $x > 5$`],
    ],
    explanation: t`$x^{2} - 7x + 10 = (x - 2)(x - 5)$ and $x^{2} - 3x - 10 = (x - 5)(x + 2)$. "Less than 0" is between the roots; "greater than 0" is outside them.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which substitution turns $x^{\frac{2}{3}} - 5x^{\frac{1}{3}} + 4 = 0$ into a quadratic equation?`,
    options: [
      [t`$u = x^{\frac{1}{3}}$`, t`Correct: then $x^{\frac{2}{3}} = u^{2}$, giving $u^{2} - 5u + 4 = 0$.`],
      [t`$u = x^{\frac{2}{3}}$`, t`Then $x^{\frac{1}{3}} = \sqrt{u}$, which is not a quadratic in $u$.`],
      [t`$u = x^{3}$`, "The powers are thirds, not cubes."],
      [t`$u = \frac{1}{3}x$`, "This does not remove the fractional powers."],
    ],
    answer: "A",
    explanation: t`Since $x^{\frac{2}{3}} = \left(x^{\frac{1}{3}}\right)^{2}$, the substitution $u = x^{\frac{1}{3}}$ gives $u^{2} - 5u + 4 = 0$, so $u = 1$ or $4$ and $x = 1$ or $64$.`,
  });

  // fence: A = x(60 − 2x)
  same(quad.roots(1, -30, 200), [10, 20]);
  same(scan((x) => x > 0 && x < 30 && x * (60 - 2 * x) >= 400), [[10, 20]]);
  chk(15 * 30, 450);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Thandeka has 60 m of fencing to enclose a rectangular vegetable plot beside a straight river; the river side needs no fence. The two sides perpendicular to the river are each $x$ m long, so the area is $A = x(60 - 2x)$ m².`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Find the values of x for which the area is exactly 400 m².",
        template: "x = {{blank:a}} or x = {{blank:b}} (smaller first)",
        blanks: [{ id: "a", input: "number", accepted: [10], wrong: 20 }, { id: "b", input: "number", accepted: [20], wrong: 40 }],
        explanation: t`$x(60 - 2x) = 400 \Rightarrow 2x^{2} - 60x + 400 = 0 \Rightarrow x^{2} - 30x + 200 = 0 \Rightarrow (x - 10)(x - 20) = 0$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: "Find the range of values of x for which the area is at least 400 m².",
        template: "{{blank:a}} ≤ x ≤ {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [10], wrong: 0 }, { id: "b", input: "number", accepted: [20], wrong: 30 }],
        explanation: t`$x^{2} - 30x + 200 \leq 0$ between the roots: $10 \leq x \leq 20$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find the greatest possible area.",
        value: 450, unit: "m²", wrong: [400, 900],
        explanation: t`$A = 60x - 2x^{2} = 450 - 2(x - 15)^{2}$, so the greatest area is 450 m² when $x = 15$.`,
      }),
    ],
    explanation: t`The model $A = x(60 - 2x)$ turns the conditions into a quadratic equation and inequality: $10 \leq x \leq 20$ gives at least 400 m², and completing the square gives the maximum 450 m² at $x = 15$.`,
    hints: ["Rearrange A ≥ 400 into a quadratic inequality with 0 on one side.", "Complete the square for the maximum."],
  });

  same(quad.roots(1, -3, -4), [-1, 4]);
  const chord = Math.hypot(5, 5);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The line $y = x + 3$ meets the curve $y = x^{2} - 2x - 1$ at the points $A$ and $B$.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: "Find the x-coordinates of A and B.",
        template: "x = {{blank:a}} and x = {{blank:b}} (smaller first)",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: 1 }, { id: "b", input: "number", accepted: [4], wrong: -4 }],
        explanation: t`$x^{2} - 2x - 1 = x + 3 \Rightarrow x^{2} - 3x - 4 = 0 \Rightarrow (x - 4)(x + 1) = 0$.`,
      }),
      P.fib({
        label: "(b)", marks: 1, stem: "Find the corresponding y-coordinates.",
        template: "At x = −1, y = {{blank:a}}; at x = 4, y = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: -4 }, { id: "b", input: "number", accepted: [7], wrong: -1 }],
        explanation: t`Use the line: $y = -1 + 3 = 2$ and $y = 4 + 3 = 7$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find the length AB, to 3 significant figures.",
        value: chord, wrong: [50, 5],
        explanation: t`$AB = \sqrt{(4 - (-1))^{2} + (7 - 2)^{2}} = \sqrt{50} = 7.07$.`,
      }),
      P.mcq({
        label: "(d)", marks: 1, stem: "For which values of x is the line above the curve?",
        options: [
          [t`$-1 < x < 4$`, t`Correct: $x^{2} - 3x - 4 < 0$ between the roots.`],
          [t`$x < -1$ or $x > 4$`, "There the curve is above the line."],
          [t`$2 < x < 7$`, "These are y-coordinates, not x-values."],
          [t`$x > 4$`, "For large x the quadratic grows faster than the line."],
        ],
        answer: "A",
        explanation: t`Line above curve: $x + 3 > x^{2} - 2x - 1 \iff x^{2} - 3x - 4 < 0 \iff -1 < x < 4$.`,
      }),
    ],
    explanation: t`Substituting gives $x^{2} - 3x - 4 = 0$, so $A(-1, 2)$ and $B(4, 7)$; $AB = \sqrt{50} \approx 7.07$. The line is above the curve between the intersections.`,
    hints: ["Equate the two expressions for y.", "Use the line to find y; it is simpler."],
  });

  b.card("CONCEPT", "Steps to solve a quadratic inequality", "Rearrange to 0 on one side, find the critical values, sketch the parabola, read off where it is above or below the axis.");
  b.card("FORMULA", t`$a(x - \alpha)(x - \beta) < 0$ with $a > 0$, $\alpha < \beta$`, t`$\alpha < x < \beta$ (between the roots).`);
  b.card("FORMULA", t`$a(x - \alpha)(x - \beta) > 0$ with $a > 0$, $\alpha < \beta$`, t`$x < \alpha$ or $x > \beta$ (outside the roots).`);
  b.card("CONCEPT", "Solving one linear and one quadratic equation simultaneously", "Make one variable the subject of the linear equation, substitute into the quadratic, solve, then use the linear equation for the other coordinate. Keep answers in pairs.");
  b.card("CONCEPT", "Hidden quadratics", t`Substitute $u$ for the repeated function ($x^{2}$, $\sqrt{x}$, $a^{x}$, $\tan x$), solve for $u$, then for $x$; reject impossible values such as $\sqrt{x} < 0$.`);
  b.card("CONCEPT", "Rational inequalities (ZIMSEC)", t`Never multiply by a denominator of unknown sign. Multiply by its square, or rearrange to a single fraction $\le 0$ and use a sign table.`, undefined, { applies: ZP });
  b.card("CONCEPT", "Sign table for a cubic inequality (ZIMSEC)", "Mark the critical values, record the sign of each factor in each interval, and multiply the signs.", undefined, { applies: ZP });
  b.card("FACT", "Reversing an inequality", "Multiplying or dividing both sides by a negative number reverses the inequality sign.");
});
