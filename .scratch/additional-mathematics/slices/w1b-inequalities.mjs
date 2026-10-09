// W1b: amath.quadratics.inequalities
import { concept, P, t, chk, same, quad, poly } from "../lib.mjs";

const sol = (a, b, c) => quad.roots(a, b, c);
const ints = (f, lo, hi) => { const out = []; for (let x = lo; x <= hi; x++) if (f(x)) out.push(x); return out; };

concept("amath.quadratics.inequalities", { file: "quadratics/inequalities", keyPrefix: "quadratics.inequalities" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`Solve $(x - 2)(x - 5) < 0$.`,
    options: [
      [t`$2 < x < 5$`, "Correct: the U-shaped curve is below the axis between its roots 2 and 5."],
      [t`$x < 2$ or $x > 5$`, t`This is where the product is **positive**, the solution of $(x - 2)(x - 5) > 0$.`],
      [t`$-5 < x < -2$`, t`The roots are $x = 2$ and $x = 5$ (each bracket equals zero there), not $-2$ and $-5$.`],
      [t`$x < 5$`, t`For $x < 2$, e.g. $x = 0$, the product is $10 > 0$, so those values do not satisfy the inequality.`],
    ],
    answer: "A",
    explanation: t`The critical values are 2 and 5. For a U-shaped parabola the expression is negative between the roots, so $2 < x < 5$.`,
  });

  same(sol(1, 0, -16), [-4, 4]);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Solve $x^2 - 16 > 0$.`,
    options: [
      [t`$x < -4$ or $x > 4$`, t`Correct: $(x - 4)(x + 4) > 0$ outside the roots.`],
      [t`$x > 4$`, t`This misses the negative solutions: $x = -5$ gives $25 - 16 > 0$ too.`],
      [t`$-4 < x < 4$`, t`Between the roots $x^2 - 16$ is negative, e.g. $x = 0$ gives $-16$.`],
      [t`$x > \pm 4$`, "This is not a valid way of writing a solution set and does not describe the region correctly."],
    ],
    answer: "A",
    explanation: t`$x^2 - 16 = (x - 4)(x + 4)$. The U-shaped curve is above the axis outside the roots: $x < -4$ or $x > 4$.`,
  });

  same(sol(1, -7, 10), [2, 5].map(Number));
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x^2 - 7x + 10 \leq 0$.`,
    template: "{{blank:a}} ≤ x ≤ {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [2], wrong: "-5" },
      { id: "b", input: "number", accepted: [5], wrong: "-2" },
    ],
    explanation: t`$(x - 2)(x - 5) \leq 0$. Between the roots, inclusive: $2 \leq x \leq 5$.`,
  });

  same(sol(1, 2, -24), [-6, 4]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $x^2 + 2x - 24 > 0$.`,
    template: "x < {{blank:a}} or x > {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-6], wrong: "-4" },
      { id: "b", input: "number", accepted: [4], wrong: "6" },
    ],
    explanation: t`$(x + 6)(x - 4) > 0$. The critical values are $-6$ and $4$, and the curve is positive outside them: $x < -6$ or $x > 4$.`,
    hints: ["Find the critical values first.", "A U-shaped curve is positive outside its roots."],
  });

  same(sol(2, -3, -20), [-2.5, 4]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2x^2 - 3x - 20 \geq 0$.`,
    template: "x ≤ {{blank:a}} or x ≥ {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-2.5], wrong: "-5" },
      { id: "b", input: "number", accepted: [4], wrong: "4" },
    ],
    explanation: t`$2x^2 - 3x - 20 = (2x + 5)(x - 4)$, so the critical values are $-\frac{5}{2}$ and $4$. Outside the roots, inclusive: $x \leq -2.5$ or $x \geq 4$.`,
    hints: [t`Factorise: $(2x + 5)(x - 4)$.`],
  });

  same(sol(1, -3, -10), [-2, 5]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $10 + 3x - x^2 > 0$.`,
    options: [
      [t`$-2 < x < 5$`, t`Correct: $x^2 - 3x - 10 < 0$, so $(x - 5)(x + 2) < 0$, between the roots.`],
      [t`$x < -2$ or $x > 5$`, t`This forgets to reverse the inequality after multiplying by $-1$.`],
      [t`$-5 < x < 2$`, t`The roots of $x^2 - 3x - 10 = 0$ are $5$ and $-2$, not $-5$ and $2$.`],
      [t`$x < -5$ or $x > 2$`, "Both the roots and the region are wrong."],
    ],
    answer: "A",
    explanation: t`Multiply by $-1$ and reverse: $x^2 - 3x - 10 < 0$. Critical values $-2$ and $5$; negative between them, so $-2 < x < 5$. Check $x = 0$: $10 > 0$, true.`,
    hints: ["Make the $x^2$ coefficient positive first, reversing the sign."],
  });

  const n7 = ints((x) => poly.eval([1, -6, 5], x) < 0, -20, 20);
  same(n7, [2, 3, 4]);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`How many integers $x$ satisfy $x^2 - 6x + 5 < 0$?`,
    value: n7.length, wrong: [5, 4],
    explanation: t`$(x - 1)(x - 5) < 0$ gives $1 < x < 5$. The integers are 2, 3 and 4: three of them (1 and 5 are excluded because the inequality is strict).`,
  });

  const n8 = ints((x) => x * x + 3 * x < 28, -50, 50);
  chk(Math.max(...n8), 3);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the largest integer that satisfies $x^2 + 3x < 28$.`,
    value: 3, wrong: [4, -7],
    explanation: t`$x^2 + 3x - 28 < 0$, so $(x + 7)(x - 4) < 0$ and $-7 < x < 4$. The largest integer is $3$ ($4$ is excluded: $16 + 12 = 28$ is not less than 28).`,
    hints: ["Bring 28 to the left-hand side and factorise."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The inequality $x^2 + 4 > 0$ is true for every real number $x$.`,
    answer: true,
    explanation: t`True. $x^2 \geq 0$, so $x^2 + 4 \geq 4 > 0$. The parabola $y = x^2 + 4$ never meets the $x$-axis.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The solution of $x^2 \geq 9$ is $x \geq 3$.`,
    answer: false,
    explanation: t`False. $x^2 - 9 \geq 0$ means $(x - 3)(x + 3) \geq 0$, so $x \leq -3$ or $x \geq 3$. For example $x = -4$ gives $16 \geq 9$.`,
  });

  const r11 = sol(1, -6, 4);
  chk(r11[0], 3 - Math.sqrt(5)); chk(r11[1], 3 + Math.sqrt(5));
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`The solution of $x^2 - 6x + 4 \leq 0$ can be written as $p - \sqrt{q} \leq x \leq p + \sqrt{q}$, where $p$ and $q$ are integers. Find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [
      { id: "p", input: "number", accepted: [3], wrong: "-3" },
      { id: "q", input: "number", accepted: [5], wrong: "13" },
    ],
    explanation: t`$x^2 - 6x + 4 = (x - 3)^2 - 5$, so the critical values are $3 \pm \sqrt{5}$. Between them, inclusive: $3 - \sqrt{5} \leq x \leq 3 + \sqrt{5}$.`,
    hints: ["Complete the square to find the critical values.", "The curve is negative between its roots."],
  });

  for (const k of [-6, 6]) chk(quad.disc(1, k, 9), 0);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the set of values of $k$ for which $x^2 + kx + 9 = 0$ has two distinct real roots.`,
    options: [
      [t`$k < -6$ or $k > 6$`, t`Correct: $k^2 - 36 > 0$ outside the roots $\pm 6$.`],
      [t`$-6 < k < 6$`, t`This is where $k^2 - 36 < 0$: no real roots.`],
      [t`$k > 6$`, t`This misses the negative values; $k = -7$ also gives $49 - 36 > 0$.`],
      [t`$k \leq -6$ or $k \geq 6$`, t`At $k = \pm 6$ the roots are equal, not distinct, so the inequality must be strict.`],
    ],
    answer: "A",
    explanation: t`Two distinct real roots: $k^2 - 4(1)(9) > 0$, so $k^2 - 36 > 0$, $(k - 6)(k + 6) > 0$, giving $k < -6$ or $k > 6$.`,
    hints: ["Write the discriminant condition, then solve the quadratic inequality in $k$."],
  });

  for (const k of [-5, 3]) chk(quad.disc(1, k + 1, 4), 0);
  chk(Math.sign(quad.disc(1, 1, 4)), -1);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the set of values of $k$ for which $x^2 + (k + 1)x + 4 = 0$ has no real roots.`,
    template: "{{blank:lo}} < k < {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: [-5], wrong: "-3" },
      { id: "hi", input: "number", accepted: [3], wrong: "5" },
    ],
    explanation: t`No real roots: $(k + 1)^2 - 16 < 0$, so $-4 < k + 1 < 4$ and $-5 < k < 3$. (Or expand: $k^2 + 2k - 15 < 0$, $(k + 5)(k - 3) < 0$.)`,
    hints: [t`Use $b^2 - 4ac < 0$ with $b = k + 1$.`],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each inequality with its solution set.",
    pairs: [
      [t`$(x + 1)(x - 3) < 0$`, t`$-1 < x < 3$`],
      [t`$(x + 1)(x - 3) \geq 0$`, t`$x \leq -1$ or $x \geq 3$`],
      [t`$(x - 1)(x + 3) \leq 0$`, t`$-3 \leq x \leq 1$`],
      [t`$(x - 1)(x + 3) > 0$`, t`$x < -3$ or $x > 1$`],
    ],
    explanation: "Each product is a U-shaped quadratic: negative between its roots and positive outside them. Equality signs include the roots.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Chipo says: "To solve $x^2 - 2x - 3 > 0$ I sketch a graph." Describe the sketch she should draw and how she reads the answer from it.`,
    points: [
      t`A U-shaped parabola $y = x^2 - 2x - 3$ crossing the $x$-axis at $x = -1$ and $x = 3$ (the critical values).`,
      t`The inequality asks where $y > 0$, i.e. where the curve is above the $x$-axis: outside the roots.`,
      t`Solution $x < -1$ or $x > 3$ (critical values not included because the inequality is strict).`,
    ],
    modelAnswer: t`Since $x^2 - 2x - 3 = (x + 1)(x - 3)$, the graph is a U-shaped curve through $(-1, 0)$ and $(3, 0)$. She wants the parts of the curve above the $x$-axis, which are to the left of $-1$ and to the right of $3$, so $x < -1$ or $x > 3$.`,
    explanation: "The sketch only needs the shape and the critical values; the region is read from where the curve lies above or below the axis.",
    hints: ["What are the critical values, and is the curve U-shaped?"],
  });

  // Struct 1: plot x by (x + 3): area > 40 and perimeter < 34
  same(sol(1, 3, -40), [-8, 5]);
  chk((34 - 6) / 4, 7);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A rectangular plot at a school in Gweru is $x$ metres wide and $(x + 3)$ metres long. Its area must be more than $40\ \text{m}^2$ and its perimeter must be less than $34$ m.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: t`Form and solve an inequality for the area condition. Write down the least value that $x$ must exceed.`, value: 5, prefix: "x >", wrong: [-8, 8],
        explanation: t`$x(x + 3) > 40$, so $x^2 + 3x - 40 > 0$ and $(x + 8)(x - 5) > 0$: $x < -8$ or $x > 5$. Since $x > 0$, $x > 5$.` }),
      P.manual({ label: "(b)", marks: 1, stem: t`Explain why the part $x < -8$ of the solution in part (a) is rejected.`,
        points: [t`States that $x$ is a width, so it must be positive; $x < -8$ is impossible.`],
        modelAnswer: "A width cannot be negative, so the values below −8 have no meaning for the plot.", explanation: "Lengths are positive." }),
      P.num({ label: "(c)", marks: 1, stem: "Form and solve an inequality for the perimeter condition.", value: 7, prefix: "x <", wrong: [8.5],
        explanation: t`$2x + 2(x + 3) < 34$, so $4x + 6 < 34$ and $x < 7$.` }),
      P.fib({ label: "(d)", marks: 2, stem: t`Hence write down the range of possible values of $x$.`, template: "{{blank:lo}} < x < {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [5], wrong: "-8" }, { id: "hi", input: "number", accepted: [7], wrong: "7" }],
        explanation: t`Both conditions: $x > 5$ and $x < 7$, so $5 < x < 7$.` }),
    ],
    explanation: "Form one inequality for each condition, solve each, reject impossible values and combine.",
    hints: ["Area = width × length; perimeter = 2(width + length).", "Combine the two conditions on a number line."],
  });

  // Struct 2: x^2 + (k - 3)x + (k + 5) = 0 -> disc k^2 - 10k - 11 = (k - 11)(k + 1)
  for (const k of [-3, 0, 4, 12]) chk(quad.disc(1, k - 3, k + 5), (k - 11) * (k + 1));
  same(quad.roots(1, -10, -11), [-1, 11]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The equation $x^2 + (k - 3)x + (k + 5) = 0$, where $k$ is a constant, has two distinct real roots.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $k^2 - 10k - 11 > 0$.`,
        points: [t`M1 uses $b^2 - 4ac > 0$ with $b = k - 3$ and $c = k + 5$.`, t`A1 expands $(k - 3)^2 - 4(k + 5) = k^2 - 6k + 9 - 4k - 20$ to reach $k^2 - 10k - 11 > 0$.`],
        modelAnswer: t`$$
(k - 3)^2 - 4(1)(k + 5) > 0
$$

$$
k^2 - 6k + 9 - 4k - 20 > 0
$$

$$
k^2 - 10k - 11 > 0
$$`,
        explanation: "Distinct real roots: discriminant positive." }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the critical values of $k$, in ascending order.", template: "k = {{blank:a}} and k = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-1], wrong: "1" }, { id: "b", input: "number", accepted: [11], wrong: "-11" }],
        explanation: t`$k^2 - 10k - 11 = (k - 11)(k + 1) = 0$ gives $k = -1$ or $k = 11$.` }),
      P.mcq({ label: "(c)", marks: 1, stem: t`Hence state the set of values of $k$.`,
        options: [
          [t`$k < -1$ or $k > 11$`, "Correct: positive outside the critical values."],
          [t`$-1 < k < 11$`, "Between the critical values the discriminant is negative: no real roots."],
          [t`$k \leq -1$ or $k \geq 11$`, "At the critical values the roots are equal, not distinct."],
          [t`$k > 11$`, t`Values below $-1$ also work, e.g. $k = -2$ gives $4 + 20 - 11 = 13 > 0$.`],
        ],
        answer: "A", explanation: t`$(k - 11)(k + 1) > 0$ outside the roots: $k < -1$ or $k > 11$.` }),
      P.mcq({ label: "(d)", marks: 2, stem: t`Describe the roots of the equation when $k = 11$.`,
        options: [
          [t`two equal roots, $x = -4$`, t`Correct: $x^2 + 8x + 16 = (x + 4)^2$.`],
          [t`two equal roots, $x = 4$`, t`The equation is $x^2 + 8x + 16 = 0$, whose repeated root is $-4$.`],
          ["two distinct real roots", "At a critical value the discriminant is zero."],
          ["no real roots", "At a critical value the discriminant is zero, not negative."],
        ],
        answer: "A", explanation: t`$k = 11$: $x^2 + 8x + 16 = 0$, discriminant $64 - 64 = 0$, repeated root $x = -4$.` }),
    ],
    explanation: "Form the discriminant inequality, find its critical values, then choose the region from a sketch of the U-shaped curve in $k$.",
    hints: [t`Keep $(k - 3)$ and $(k + 5)$ in brackets when you substitute.`, "Sketch $y = (k - 11)(k + 1)$ against $k$."],
  });

  same(poly.eval([1, 8, 16], -4), 0);

  // Cards
  b.card("DEFINITION", "Critical values of a quadratic inequality", t`The roots of $ax^2 + bx + c = 0$: the boundaries of the solution set.`);
  b.card("FACT", t`$(x - \alpha)(x - \beta) < 0$ with $\alpha < \beta$`, t`$\alpha < x < \beta$ (between the roots).`);
  b.card("FACT", t`$(x - \alpha)(x - \beta) > 0$ with $\alpha < \beta$`, t`$x < \alpha$ or $x > \beta$ (outside the roots).`);
  b.card("CONCEPT", t`Negative $x^2$ coefficient in an inequality`, "Multiply by −1 and reverse the inequality sign.");
  b.card("FACT", t`Solution of $x^2 > a^2$ ($a > 0$)`, t`$x < -a$ or $x > a$, not just $x > a$.`);
  b.card("CONCEPT", t`$\leq$ / $\geq$ compared with $<$ / $>$`, "Include the critical values for ≤ and ≥; exclude them for < and >.");
  b.card("CONCEPT", t`$ax^2 + bx + c > 0$ with $a > 0$ and $b^2 - 4ac < 0$`, t`True for every real $x$ (the curve never meets the axis).`);
  b.card("CONCEPT", "Writing a two-piece solution", t`Use "or": $x < -5$ or $x > 3$. Never write $3 < x < -5$.`);
});
