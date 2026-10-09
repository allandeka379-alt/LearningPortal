// W1b: amath.quadratics.discriminant
import { concept, P, t, chk, same, quad } from "../lib.mjs";

concept("amath.quadratics.discriminant", { file: "quadratics/discriminant", keyPrefix: "quadratics.discriminant" }, (b) => {
  chk(quad.disc(2, -3, -5), 49);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What is the value of the discriminant of $2x^2 - 3x - 5 = 0$?`,
    options: [
      [t`$49$`, t`Correct: $(-3)^2 - 4(2)(-5) = 9 + 40 = 49$.`],
      [t`$-31$`, t`This uses $-4ac = -40$; with $c = -5$, $-4ac = +40$.`],
      [t`$29$`, t`This uses $4ac = 20$: the 2 (the value of $a$) was left out.`],
      [t`$-11$`, t`This treats $b^2$ as $-9$; a square is never negative.`],
    ],
    answer: "A",
    explanation: t`$a = 2$, $b = -3$, $c = -5$: $b^2 - 4ac = 9 - 4(2)(-5) = 9 + 40 = 49$. It is a perfect square, so the equation factorises: $(2x - 5)(x + 1) = 0$.`,
  });

  chk(quad.disc(1, -10, 25), 0);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`Describe the roots of $x^2 - 10x + 25 = 0$.`,
    options: [
      ["two equal real roots", t`Correct: $b^2 - 4ac = 100 - 100 = 0$.`],
      ["two distinct real roots", t`That needs $b^2 - 4ac > 0$; here it equals 0.`],
      ["no real roots", t`That needs $b^2 - 4ac < 0$; here it equals 0.`],
      ["one positive and one negative root", t`The product of the roots is $25 > 0$, and in fact both roots equal 5.`],
    ],
    answer: "A",
    explanation: t`$b^2 - 4ac = (-10)^2 - 4(1)(25) = 0$, so the roots are equal: $x^2 - 10x + 25 = (x - 5)^2$, giving the repeated root $x = 5$.`,
  });

  chk(quad.disc(1, 1, 1), -3);
  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The equation $x^2 + x + 1 = 0$ has two distinct real roots.`,
    answer: false,
    explanation: t`False. $b^2 - 4ac = 1 - 4 = -3 < 0$, so there are no real roots. The curve $y = x^2 + x + 1$ lies entirely above the $x$-axis.`,
  });

  chk(quad.disc(3, 4, -2), 40);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the value of the discriminant of $3x^2 + 4x - 2 = 0$.`,
    value: 40, wrong: [-8, 16],
    explanation: t`$b^2 - 4ac = 4^2 - 4(3)(-2) = 16 + 24 = 40$. It is positive, so there are two distinct real roots.`,
  });

  chk(quad.disc(1, 0, -9), 36); chk(quad.disc(1, 6, 9), 0); chk(quad.disc(1, 0, 9), -36); chk(quad.disc(1, 1, -1), 5);
  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each equation with the nature of its roots.",
    pairs: [
      [t`$x^2 + 6x + 9 = 0$`, "two equal real roots"],
      [t`$x^2 + 9 = 0$`, "no real roots"],
      [t`$x^2 + x - 1 = 0$`, "two distinct real roots (irrational)"],
      [t`$x^2 - 9 = 0$`, "two distinct real roots (rational)"],
    ],
    explanation: t`Discriminants: $36 - 36 = 0$; $0 - 36 = -36$; $1 + 4 = 5$ (not a perfect square, so irrational roots); $0 + 36 = 36$ (a perfect square, so rational roots $\pm 3$).`,
  });

  for (const k of [-10, 10]) chk(quad.disc(1, k, 25), 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the two values of $k$ for which $x^2 + kx + 25 = 0$ has equal roots. Give them in ascending order.`,
    template: "k = {{blank:a}} or k = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-10], wrong: "-5" },
      { id: "b", input: "number", accepted: [10], wrong: "5" },
    ],
    explanation: t`Equal roots: $k^2 - 4(1)(25) = 0$, so $k^2 = 100$ and $k = \pm 10$.`,
    hints: [t`Set $b^2 - 4ac = 0$ with $b = k$.`, "Remember both square roots."],
  });

  chk(quad.disc(4, 12, 9), 0);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The equation $kx^2 + 12x + 9 = 0$ has equal roots. Find the value of $k$.`,
    value: 4, prefix: "k =", wrong: [16, -4],
    explanation: t`$b^2 - 4ac = 144 - 4(k)(9) = 144 - 36k = 0$, so $k = 4$. Check: $4x^2 + 12x + 9 = (2x + 3)^2$.`,
    hints: [t`Here $a = k$.`],
  });

  chk(quad.disc(1, 6, 9), 0); chk(Math.sign(quad.disc(1, 6, 10)), -1);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the set of values of $k$ for which $x^2 + 6x + k = 0$ has no real roots.`,
    options: [
      [t`$k > 9$`, t`Correct: $36 - 4k < 0$ gives $k > 9$.`],
      [t`$k < 9$`, t`For $k < 9$ the discriminant $36 - 4k$ is positive, giving two roots. Dividing by $-4$ reverses the inequality.`],
      [t`$k \geq 9$`, t`At $k = 9$ the discriminant is 0 and there is a repeated root, so 9 must be excluded.`],
      [t`$k > 36$`, t`The discriminant is $36 - 4k$, not $36 - k$.`],
    ],
    answer: "A",
    explanation: t`No real roots: $b^2 - 4ac < 0$, so $36 - 4k < 0$, $36 < 4k$ and $k > 9$.`,
    hints: ["No real roots means the discriminant is negative."],
  });

  // greatest integer k: 25 - 8k >= 0 -> k <= 3.125
  chk(25 / 8, 3.125);
  chk(Math.sign(quad.disc(2, -5, 3)), 1); chk(Math.sign(quad.disc(2, -5, 4)), -1);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Find the greatest integer value of $k$ for which $2x^2 - 5x + k = 0$ has real roots.`,
    value: 3, prefix: "k =", wrong: [4, 3.125],
    explanation: t`Real roots: $25 - 8k \geq 0$, so $k \leq \frac{25}{8} = 3.125$. The greatest integer is $k = 3$.`,
    hints: [t`Solve $b^2 - 4ac \geq 0$ for $k$.`],
  });

  // y = mx - 3 tangent to y = x^2 + 1 -> x^2 - mx + 4 = 0 -> m = ±4; m = 4 touches at (2, 5)
  for (const m of [-4, 4]) chk(quad.disc(1, -m, 4), 0);
  same(quad.roots(1, -4, 4), [2]);
  chk(2 * 2 + 1, 5); chk(4 * 2 - 3, 5);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The line $y = mx - 3$, where $m > 0$, is a tangent to the curve $y = x^2 + 1$. Find $m$ and the coordinates of the point of contact.`,
    template: "m = {{blank:m}}; point of contact ({{blank:x}}, {{blank:y}})",
    blanks: [
      { id: "m", input: "number", accepted: [4], wrong: "16" },
      { id: "x", input: "number", accepted: [2], wrong: "-2" },
      { id: "y", input: "number", accepted: [5], wrong: "5" },
    ],
    explanation: t`$x^2 + 1 = mx - 3$ gives $x^2 - mx + 4 = 0$. Tangent: $m^2 - 16 = 0$, so $m = 4$ (as $m > 0$). Then $x^2 - 4x + 4 = (x - 2)^2 = 0$, so $x = 2$ and $y = 4(2) - 3 = 5$.`,
    hints: ["Equate the line and the curve and collect terms.", "A tangent gives equal roots."],
  });

  // y = 3x + c tangent to y = 2x^2 - x + 1 -> 2x^2 - 4x + 1 - c = 0 -> c = -1, (1, 2)
  chk(quad.disc(2, -4, 1 - -1), 0);
  same(quad.roots(2, -4, 2), [1]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The line $y = 3x + c$ is a tangent to the curve $y = 2x^2 - x + 1$. Find the value of $c$ and the $x$-coordinate of the point of contact.`,
    template: "c = {{blank:c}}, x = {{blank:x}}",
    blanks: [
      { id: "c", input: "number", accepted: [-1], wrong: "1" },
      { id: "x", input: "number", accepted: [1], wrong: "-1" },
    ],
    explanation: t`$2x^2 - x + 1 = 3x + c$ gives $2x^2 - 4x + (1 - c) = 0$. Tangent: $16 - 8(1 - c) = 0$, so $8 + 8c = 0$ and $c = -1$. Then $2x^2 - 4x + 2 = 2(x - 1)^2 = 0$, so $x = 1$.`,
    hints: [t`The constant term of the combined equation is $1 - c$.`],
  });

  chk(quad.disc(1, -2, 4), -12);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`How many points of intersection do the line $y = 2x - 1$ and the curve $y = x^2 + 3$ have?`,
    options: [
      ["none", t`Correct: $x^2 - 2x + 4 = 0$ has discriminant $4 - 16 = -12 < 0$.`],
      ["one", t`One point (a tangent) needs a discriminant of exactly 0.`],
      ["two", t`Two points need a positive discriminant; here it is $-12$.`],
      ["infinitely many", "A line and a parabola meet at most twice."],
    ],
    answer: "A",
    explanation: t`$x^2 + 3 = 2x - 1$ gives $x^2 - 2x + 4 = 0$, with $b^2 - 4ac = 4 - 16 = -12 < 0$. There are no real solutions, so the line does not meet the curve.`,
    hints: ["Equate the two expressions for $y$ and look at the discriminant."],
  });

  chk(quad.disc(1, -4, 4), 0);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the number of points at which the line $y = x + 5$ meets the curve $y = x^2 - 3x + 9$.`,
    value: 1, wrong: [2, 0],
    explanation: t`$x^2 - 3x + 9 = x + 5$ gives $x^2 - 4x + 4 = 0$, with discriminant $16 - 16 = 0$: the line is a tangent and meets the curve at one point, $(2, 7)$.`,
    hints: ["A zero discriminant means the line touches the curve."],
  });

  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`If $a$ and $c$ have opposite signs, then $ax^2 + bx + c = 0$ always has two distinct real roots.`,
    answer: true,
    explanation: t`True. If $ac < 0$ then $-4ac > 0$, and $b^2 \geq 0$, so $b^2 - 4ac > 0$ whatever the value of $b$.`,
    hints: [t`What is the sign of $-4ac$ when $ac < 0$?`],
  });

  for (const k of [-4, -1, 0, 2.5]) chk(quad.disc(1, k - 1, -k), (k + 1) ** 2);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Show that the equation $x^2 + (k - 1)x - k = 0$ has real roots for all real values of $k$.`,
    points: [
      t`M1 forms the discriminant $(k - 1)^2 - 4(1)(-k)$.`,
      t`M1 simplifies to $k^2 + 2k + 1 = (k + 1)^2$.`,
      t`A1 states $(k + 1)^2 \geq 0$ for all real $k$, so the roots are always real.`,
    ],
    modelAnswer: t`$$
b^2 - 4ac = (k - 1)^2 - 4(1)(-k)
$$

$$
= k^2 - 2k + 1 + 4k = k^2 + 2k + 1 = (k + 1)^2
$$

A square is never negative, so $b^2 - 4ac \geq 0$ for all real $k$ and the roots are always real (equal when $k = -1$).`,
    explanation: t`The discriminant is a perfect square, so it is never negative. (In fact the equation factorises as $(x + k)(x - 1) = 0$.)`,
    hints: [t`Take $c = -k$, so $-4ac = +4k$.`],
  });

  // Struct 1: y = x^2 - 3x + 6 and y = kx + 2 -> x^2 - (3 + k)x + 4 = 0
  for (const k of [-7, 1]) chk(quad.disc(1, -(3 + k), 4), 0);
  same(quad.roots(1, -4, 4), [2]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`A curve has equation $y = x^2 - 3x + 6$ and a line has equation $y = kx + 2$, where $k$ is a constant.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the $x$-coordinates of any points of intersection satisfy $x^2 - (3 + k)x + 4 = 0$.`,
        points: [t`M1 equates $x^2 - 3x + 6 = kx + 2$.`, t`A1 collects terms to reach $x^2 - (3 + k)x + 4 = 0$.`],
        modelAnswer: t`$$
x^2 - 3x + 6 = kx + 2
$$

$$
x^2 - 3x - kx + 4 = 0
$$

$$
x^2 - (3 + k)x + 4 = 0
$$`,
        explanation: "At an intersection both equations give the same $y$." }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find the two values of $k$ for which the line is a tangent to the curve. Give them in ascending order.`, template: "k = {{blank:a}} or k = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-7], wrong: "-1" }, { id: "b", input: "number", accepted: [1], wrong: "7" }],
        explanation: t`$(3 + k)^2 - 16 = 0$, so $3 + k = \pm 4$, giving $k = 1$ or $k = -7$.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Find the set of values of $k$ for which the line does not meet the curve.`, template: "{{blank:lo}} < k < {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [-7], wrong: "1" }, { id: "hi", input: "number", accepted: [1], wrong: "7" }],
        explanation: t`No intersection: $(3 + k)^2 < 16$, so $-4 < 3 + k < 4$ and $-7 < k < 1$.` }),
      P.num({ label: "(d)", marks: 1, stem: t`For the positive value of $k$ in part (b), find the $x$-coordinate of the point of contact.`, value: 2, prefix: "x =", wrong: [-2],
        explanation: t`With $k = 1$: $x^2 - 4x + 4 = (x - 2)^2 = 0$, so $x = 2$.` }),
    ],
    explanation: "Equate the line and the curve, then use the discriminant of the combined quadratic: zero for a tangent, negative for no intersection.",
    hints: [t`The combined quadratic has $b = -(3 + k)$ and $c = 4$.`, t`$(3 + k)^2 < 16$ means $3 + k$ lies between $-4$ and $4$.`],
  });

  // Struct 2: (k - 2)x^2 + 4x + (k + 1) = 0 equal roots -> k^2 - k - 6 = 0 -> k = -2, 3
  for (const k of [-2, 3]) chk(quad.disc(k - 2, 4, k + 1), 0);
  same(quad.roots(1, 4, 4), [-2]);
  same(quad.roots(-4, 4, -1), [0.5]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The equation $(k - 2)x^2 + 4x + (k + 1) = 0$, where $k$ is a constant and $k \neq 2$, has two equal roots.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $k^2 - k - 6 = 0$.`,
        points: [t`M1 uses $b^2 - 4ac = 0$ with $a = k - 2$, $b = 4$, $c = k + 1$.`, t`M1 expands $16 - 4(k - 2)(k + 1) = 0$ correctly to $16 - 4k^2 + 4k + 8 = 0$.`, t`A1 divides by $-4$ to reach $k^2 - k - 6 = 0$.`],
        modelAnswer: t`$$
4^2 - 4(k - 2)(k + 1) = 0
$$

$$
16 - 4(k^2 - k - 2) = 0
$$

$$
16 - 4k^2 + 4k + 8 = 0
$$

$$
4k^2 - 4k - 24 = 0 \Rightarrow k^2 - k - 6 = 0
$$`,
        explanation: "Equal roots: the discriminant is zero." }),
      P.fib({ label: "(b)", marks: 2, stem: t`Hence find the possible values of $k$, in ascending order.`, template: "k = {{blank:a}} or k = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [-2], wrong: "2" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }],
        explanation: t`$(k - 3)(k + 2) = 0$, so $k = -2$ or $k = 3$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`For $k = 3$, find the repeated root.`, value: -2, prefix: "x =", wrong: [2],
        explanation: t`$k = 3$: $x^2 + 4x + 4 = (x + 2)^2 = 0$, so $x = -2$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`For $k = -2$, find the repeated root.`, value: 0.5, prefix: "x =", wrong: [-0.5],
        explanation: t`$k = -2$: $-4x^2 + 4x - 1 = 0$, that is $4x^2 - 4x + 1 = (2x - 1)^2 = 0$, so $x = \frac{1}{2}$.` }),
    ],
    explanation: t`Set the discriminant to zero, solve for $k$, then substitute each $k$ back: a repeated root is $x = -\frac{b}{2a}$.`,
    hints: [t`Here $a = k - 2$ and $c = k + 1$: keep the brackets.`, t`A repeated root of $ax^2 + bx + c = 0$ is $-\frac{b}{2a}$.`],
  });

  // Cards
  b.card("DEFINITION", t`Discriminant of $ax^2 + bx + c = 0$`, t`$b^2 - 4ac$`);
  b.card("FACT", t`$b^2 - 4ac > 0$`, "Two distinct real roots; the curve crosses the $x$-axis twice.");
  b.card("FACT", t`$b^2 - 4ac = 0$`, "Two equal real roots (a repeated root); the curve touches the $x$-axis.");
  b.card("FACT", t`$b^2 - 4ac < 0$`, "No real roots; the curve does not meet the $x$-axis.");
  b.card("CONCEPT", "Condition for real roots", t`$b^2 - 4ac \geq 0$ (equal roots are allowed).`);
  b.card("CONCEPT", "Line tangent to a curve", "Equate them, form one quadratic, set its discriminant equal to 0.");
  b.card("CONCEPT", "Line does not meet a curve", "The discriminant of the combined quadratic is negative.");
  b.card("CONCEPT", t`Showing real roots for all $k$`, t`Write the discriminant as a square plus a non-negative number, e.g. $(k - 2)^2 + 4 > 0$.`);
  b.card("FACT", "Discriminant a perfect square (with integer coefficients)", "The roots are rational, so the quadratic factorises.");
});
