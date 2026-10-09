// W1b: amath.quadratics.completing-square
import { concept, P, t, chk, same, quad, poly, steps } from "../lib.mjs";

const cs = (a, b, c) => quad.completeSquare(a, b, c);

concept("amath.quadratics.completing-square", { file: "quadratics/completing-square", keyPrefix: "quadratics.completing-square" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What are the coordinates of the vertex of $y = (x - 3)^2 + 5$?`,
    options: [
      [t`$(3, 5)$`, t`Correct: the bracket is zero when $x = 3$, and then $y = 5$.`],
      [t`$(-3, 5)$`, t`The $x$-coordinate makes the bracket zero: $x - 3 = 0$ gives $x = 3$, not $-3$.`],
      [t`$(3, -5)$`, t`The constant term is $+5$, so the least value of $y$ is $5$.`],
      [t`$(5, 3)$`, "The coordinates are reversed."],
    ],
    answer: "A",
    explanation: t`$y = a(x + p)^2 + q$ has vertex $(-p, q)$. Here $p = -3$ and $q = 5$, so the vertex is $(3, 5)$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`What is the minimum value of $(x + 4)^2 - 9$?`,
    options: [
      [t`$-9$`, t`Correct: $(x + 4)^2 \geq 0$, so the expression is never less than $-9$.`],
      [t`$-4$`, t`$-4$ is the value of $x$ where the minimum occurs, not the minimum value.`],
      [t`$9$`, t`The constant is $-9$; a square is added to it, so the least value is $-9$.`],
      [t`$4$`, "This confuses the number in the bracket with the minimum value."],
    ],
    answer: "A",
    explanation: t`A square is never negative, so $(x + 4)^2 - 9 \geq -9$, with equality when $x = -4$. The minimum value is $-9$.`,
  });

  let c = cs(1, 8, 3);
  chk(c.p, 4); chk(c.q, -13);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Write $x^2 + 8x + 3$ in the form $(x + a)^2 + b$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [4], wrong: "8" },
      { id: "b", input: "number", accepted: [-13], wrong: "-61" },
    ],
    explanation: t`Half of 8 is 4: $x^2 + 8x = (x + 4)^2 - 16$, so $x^2 + 8x + 3 = (x + 4)^2 - 13$.`,
  });

  c = cs(2, -12, 11);
  chk(c.p, -3); chk(c.q, -7);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $2x^2 - 12x + 11$ in the form $a(x + b)^2 + c$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
    blanks: [
      { id: "a", input: "number", accepted: [2], wrong: "2" },
      { id: "b", input: "number", accepted: [-3], wrong: "-6" },
      { id: "c", input: "number", accepted: [-7], wrong: "2" },
    ],
    explanation: t`$2x^2 - 12x + 11 = 2(x^2 - 6x) + 11 = 2\left[(x - 3)^2 - 9\right] + 11 = 2(x - 3)^2 - 7$.`,
    hints: [t`Factor 2 out of the first two terms only: $2(x^2 - 6x) + 11$.`, t`Multiply the $-9$ by 2 as well.`],
  });

  c = cs(-1, 6, 5);
  chk(c.p, -3); chk(c.q, 14);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Express $5 + 6x - x^2$ in the form $a - (x + b)^2$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [14], wrong: "-4" },
      { id: "b", input: "number", accepted: [-3], wrong: "3" },
    ],
    explanation: t`$-x^2 + 6x = -(x^2 - 6x) = -\left[(x - 3)^2 - 9\right] = -(x - 3)^2 + 9$, so $5 + 6x - x^2 = 14 - (x - 3)^2$.`,
    hints: [t`Write $6x - x^2 = -(x^2 - 6x)$.`, "Be careful with the sign of the 9 when you remove the square bracket."],
  });

  c = cs(1, -14, 30);
  chk(-c.p, 7);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The line of symmetry of $y = x^2 - 14x + 30$ is $x = k$. Find $k$.`,
    value: 7, prefix: "k =", wrong: [-7, 14],
    explanation: t`$x^2 - 14x + 30 = (x - 7)^2 - 19$. The vertex is $(7, -19)$, so the line of symmetry is $x = 7$.`,
  });

  c = cs(4, 8, 9);
  chk(c.q, 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`By completing the square, find the minimum value of $4x^2 + 8x + 9$.`,
    value: 5, wrong: [8, -1],
    explanation: t`$4x^2 + 8x + 9 = 4(x^2 + 2x) + 9 = 4\left[(x + 1)^2 - 1\right] + 9 = 4(x + 1)^2 + 5$. The minimum value is $5$, when $x = -1$.`,
    hints: [t`Factor 4 out of $4x^2 + 8x$.`, t`$4(x + 1)^2 \geq 0$.`],
  });

  c = cs(-2, -4, 3);
  same(c.vertex, [-1, 5]);
  chk(poly.eval([-2, -4, 3], -2), 3);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the maximum point of the curve $y = 3 - 4x - 2x^2$.`,
    options: [
      [t`$(-1, 5)$`, t`Correct: $3 - 4x - 2x^2 = 5 - 2(x + 1)^2$.`],
      [t`$(1, 5)$`, t`The bracket is $(x + 1)$, which is zero at $x = -1$, not $x = 1$.`],
      [t`$(-2, 3)$`, t`$(-2, 3)$ is on the curve, but it is not the vertex: the $x$-coordinate is $-\frac{b}{2a} = -1$, not $-\frac{b}{a}$.`],
      [t`$(-1, 3)$`, t`The $y$-coordinate is the value of $y$ at $x = -1$: $3 + 4 - 2 = 5$.`],
    ],
    answer: "A",
    explanation: t`$-2x^2 - 4x = -2(x^2 + 2x) = -2\left[(x + 1)^2 - 1\right] = -2(x + 1)^2 + 2$, so $y = 5 - 2(x + 1)^2$. The maximum point is $(-1, 5)$.`,
    hints: [t`Take $-2$ out of the $x^2$ and $x$ terms.`],
  });

  c = cs(1, 2, 5);
  chk(c.q, 4);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Since $x^2 + 2x + 5 = (x + 1)^2 + 4$, the equation $x^2 + 2x + 5 = 0$ has no real roots.`,
    answer: true,
    explanation: t`True. $(x + 1)^2 + 4 \geq 4$ for every real $x$, so the expression can never equal 0. The graph lies entirely above the $x$-axis.`,
  });

  const f10 = (x) => x * x - 6 * x + 4;
  c = cs(1, -6, 4);
  chk(c.q, -5); chk(f10(1), -1); chk(f10(7), 11);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The function $f$ is defined by $f(x) = x^2 - 6x + 4$ for $1 \leq x \leq 7$. Find the range of $f$.`,
    template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: [-5], wrong: "-1" },
      { id: "hi", input: "number", accepted: [11], wrong: "11" },
    ],
    explanation: t`$f(x) = (x - 3)^2 - 5$. The vertex $x = 3$ is inside the domain, so the least value is $-5$. At the ends $f(1) = -1$ and $f(7) = 11$, so the greatest value is $11$. Range: $-5 \leq f(x) \leq 11$.`,
    hints: ["Complete the square to find the vertex.", "Check the values at both ends of the domain."],
  });

  c = cs(2, 4, -1);
  chk(c.q, -3);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Find the range of the function $f(x) = 2x^2 + 4x - 1$, $x \in \mathbb{R}$.`,
    options: [
      [t`$f(x) \geq -3$`, t`Correct: $f(x) = 2(x + 1)^2 - 3$ and $2(x + 1)^2 \geq 0$.`],
      [t`$f(x) \geq -1$`, t`$-1$ is the $y$-intercept, not the minimum value.`],
      [t`$f(x) \leq -3$`, t`$a = 2 > 0$, so the graph is U-shaped and $-3$ is a minimum, not a maximum.`],
      [t`$x \geq -1$`, t`A range describes the outputs $f(x)$; $x = -1$ is only where the minimum occurs.`],
    ],
    answer: "A",
    explanation: t`$2x^2 + 4x - 1 = 2\left[(x + 1)^2 - 1\right] - 1 = 2(x + 1)^2 - 3$. The least value is $-3$ and there is no greatest value, so the range is $f(x) \geq -3$.`,
    hints: ["Complete the square; is the vertex a maximum or a minimum?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each curve with its vertex.",
    pairs: [
      [t`$y = (x - 2)^2 + 6$`, t`$(2, 6)$`],
      [t`$y = (x + 2)^2 - 6$`, t`$(-2, -6)$`],
      [t`$y = 6 - (x - 2)^2$`, t`$(2, 6)$, a maximum`],
      [t`$y = 2(x + 6)^2$`, t`$(-6, 0)$`],
    ],
    explanation: t`For $y = a(x + p)^2 + q$ the vertex is $(-p, q)$: a minimum when $a > 0$ and a maximum when $a < 0$.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The function $f(x) = x^2$, $x \in \mathbb{R}$, is a one-one (one-to-one) function.`,
    answer: false,
    explanation: t`False. $f(-3) = f(3) = 9$: two inputs give the same output, so a quadratic over all real numbers is a two-to-one (many-one) mapping.`,
  });

  // minimum of x^2 - 6x + k is 4 -> k = 13
  c = cs(1, -6, 13);
  chk(c.q, 4);
  b.num({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The minimum value of $x^2 - 6x + k$ is $4$. Find the value of the constant $k$.`,
    value: 13, prefix: "k =", wrong: [-5, 4],
    explanation: t`$x^2 - 6x + k = (x - 3)^2 + k - 9$, so the minimum value is $k - 9 = 4$ and $k = 13$.`,
    hints: ["Complete the square, keeping $k$ as a letter."],
  });

  same(quad.roots(1, -2, -8), [-2, 4]);
  c = cs(1, -2, -8);
  same(c.vertex, [1, -9]);
  b.manualShort({
    d: 3, skill: "APPLICATION", calculator: false, marks: 4,
    stem: t`Describe fully the sketch you would draw of $y = x^2 - 2x - 8$, giving the coordinates of every point where it meets the axes and of its vertex.`,
    points: [
      t`U-shaped parabola (positive $x^2$ coefficient).`,
      t`Crosses the $y$-axis at $(0, -8)$.`,
      t`Crosses the $x$-axis at $(-2, 0)$ and $(4, 0)$.`,
      t`Minimum point (vertex) at $(1, -9)$, with line of symmetry $x = 1$.`,
    ],
    modelAnswer: t`A U-shaped curve, cutting the $y$-axis at $(0, -8)$ and the $x$-axis at $(-2, 0)$ and $(4, 0)$, since $x^2 - 2x - 8 = (x + 2)(x - 4)$. It is lowest at $(1, -9)$, because $x^2 - 2x - 8 = (x - 1)^2 - 9$, and symmetrical about $x = 1$.`,
    explanation: t`Factorise for the $x$-intercepts, put $x = 0$ for the $y$-intercept, and complete the square for the vertex. The vertex lies halfway between the roots: $\frac{-2 + 4}{2} = 1$.`,
    hints: ["Find the shape, both intercepts and the vertex."],
  });

  c = cs(1, 5, 2);
  chk(c.q, -4.25);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the minimum value of $x^2 + 5x + 2$. Give your answer as an exact decimal or fraction.`,
    value: c.q, wrong: [2, -2.5],
    explanation: t`$x^2 + 5x + 2 = \left(x + \frac{5}{2}\right)^2 - \frac{25}{4} + 2 = \left(x + \frac{5}{2}\right)^2 - \frac{17}{4}$. The minimum value is $-\frac{17}{4} = -4.25$.`,
    hints: [t`Half of 5 is $\frac{5}{2}$; its square is $\frac{25}{4}$.`],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which statement describes the graph of $y = 1 - (x - 2)^2$?`,
    options: [
      [t`It has a maximum point at $(2, 1)$.`, t`Correct: $(x - 2)^2 \geq 0$ is subtracted from 1, so $y \leq 1$, with equality at $x = 2$.`],
      [t`It has a minimum point at $(2, 1)$.`, t`The square is subtracted, so the curve is upside down and the vertex is a maximum.`],
      [t`It has a maximum point at $(-2, 1)$.`, t`The bracket $(x - 2)$ is zero when $x = 2$.`],
      [t`It has a minimum point at $(1, 2)$.`, "The coordinates are reversed and the vertex is a maximum."],
    ],
    answer: "A",
    explanation: t`$y = 1 - (x - 2)^2$ is $-(x - 2)^2 + 1$: $a = -1 < 0$, so the vertex $(2, 1)$ is a maximum.`,
  });

  c = cs(1, -4, 7);
  chk(c.q, 3);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`By completing the square, show that $x^2 - 4x + 7 > 0$ for all real values of $x$.`,
    points: [
      t`M1 writes $x^2 - 4x + 7 = (x - 2)^2 + 3$.`,
      t`M1 states $(x - 2)^2 \geq 0$ for all real $x$.`,
      t`A1 concludes $(x - 2)^2 + 3 \geq 3 > 0$, so the expression is always positive.`,
    ],
    modelAnswer: t`$$
x^2 - 4x + 7 = (x - 2)^2 - 4 + 7 = (x - 2)^2 + 3
$$

Since $(x - 2)^2 \geq 0$ for all real $x$,

$$
(x - 2)^2 + 3 \geq 3 > 0
$$

so $x^2 - 4x + 7 > 0$ for all real $x$.`,
    explanation: "A completed square with a positive constant added can never be zero or negative.",
    hints: ["Complete the square, then use the fact that a square is never negative."],
  });

  // Struct 1: f(x) = 2x^2 - 8x + 3 = 2(x - 2)^2 - 5; range on 0 <= x <= 5
  c = cs(2, -8, 3);
  chk(c.p, -2); chk(c.q, -5);
  const f1 = (x) => 2 * x * x - 8 * x + 3;
  chk(f1(0), 3); chk(f1(5), 13);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The function $f$ is defined by $f(x) = 2x^2 - 8x + 3$ for $0 \leq x \leq 5$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $f(x)$ in the form $a(x + b)^2 + c$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: [2], wrong: "2" }, { id: "b", input: "number", accepted: [-2], wrong: "-4" }, { id: "c", input: "number", accepted: [-5], wrong: "-1" }],
        explanation: t`$2(x^2 - 4x) + 3 = 2\left[(x - 2)^2 - 4\right] + 3 = 2(x - 2)^2 - 5$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Hence write down the coordinates of the turning point of $y = f(x)$.`, template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [2], wrong: "-2" }, { id: "y", input: "number", accepted: [-5], wrong: "-5" }],
        explanation: t`The bracket is zero at $x = 2$, where $f(x) = -5$: the minimum point is $(2, -5)$.` }),
      P.fib({ label: "(c)", marks: 2, stem: t`Find the range of $f$.`, template: "{{blank:lo}} ≤ f(x) ≤ {{blank:hi}}",
        blanks: [{ id: "lo", input: "number", accepted: [-5], wrong: "3" }, { id: "hi", input: "number", accepted: [13], wrong: "13" }],
        explanation: t`The minimum $-5$ occurs inside the domain; $f(0) = 3$ and $f(5) = 50 - 40 + 3 = 13$, so $-5 \leq f(x) \leq 13$.` }),
    ],
    explanation: "Complete the square, read off the vertex, then compare the vertex value with the values at the ends of the domain.",
    hints: [t`Take 2 out of $2x^2 - 8x$ first.`, "The range uses the least and greatest values of $f$ on the domain."],
  });

  // Struct 2: profit P = 60x - 2x^2 - 250 = 200 - 2(x - 15)^2; zero at x = 5, 25
  c = cs(-2, 60, -250);
  chk(c.p, -15); chk(c.q, 200);
  same(quad.roots(-2, 60, -250), [5, 25]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Rudo sells crates of tomatoes at Mbare market. When she sells $x$ crates in a day, her profit in US dollars is $P = 60x - 2x^2 - 250$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Express $P$ in the form $a - b(x - c)^2$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: [200], wrong: "-250" }, { id: "b", input: "number", accepted: [2], wrong: "2" }, { id: "c", input: "number", accepted: [15], wrong: "30" }],
        explanation: t`$-2x^2 + 60x = -2(x^2 - 30x) = -2\left[(x - 15)^2 - 225\right] = -2(x - 15)^2 + 450$, so $P = 200 - 2(x - 15)^2$.` }),
      P.group({ label: "(b)", stem: "Hence find", parts: [
        P.num({ label: "(i)", marks: 1, stem: "the number of crates that gives the greatest profit,", value: 15, wrong: [30] , explanation: t`$2(x - 15)^2 \geq 0$, so $P$ is greatest when $x = 15$.` }),
        P.num({ label: "(ii)", marks: 1, stem: "the greatest profit, in US dollars.", value: 200, wrong: [450], explanation: t`$P = 200 - 0 = 200$.` }),
      ] }),
      P.fib({ label: "(c)", marks: 2, stem: t`Find the two numbers of crates for which Rudo makes no profit and no loss. Give them in ascending order.`, template: "x = {{blank:a}} or x = {{blank:b}}",
        blanks: [{ id: "a", input: "number", accepted: [5], wrong: "-5" }, { id: "b", input: "number", accepted: [25], wrong: "10" }],
        explanation: t`$200 - 2(x - 15)^2 = 0$ gives $(x - 15)^2 = 100$, so $x - 15 = \pm 10$ and $x = 5$ or $x = 25$.` }),
      P.manual({ label: "(d)", marks: 2, stem: t`Explain, using your answer to part (a), why the profit can never be more than ${"US\\$"}200.`,
        points: [t`States $(x - 15)^2 \geq 0$ for all $x$, so $2(x - 15)^2 \geq 0$.`, t`Concludes that $200$ minus a non-negative amount is at most $200$ (equal only when $x = 15$).`],
        modelAnswer: t`$(x - 15)^2$ is a square, so it is never negative. $P = 200 - 2(x - 15)^2$ is 200 minus something that is zero or positive, so $P \leq 200$, with equality only when $x = 15$.`,
        explanation: "A square is never negative." }),
    ],
    explanation: t`Writing $P = 200 - 2(x - 15)^2$ shows the greatest profit (US\$200 at 15 crates) and makes the break-even equation easy to solve.`,
    hints: [t`Take $-2$ out of the $x^2$ and $x$ terms.`, t`Set $P = 0$ and solve $(x - 15)^2 = 100$.`],
  });

  // Cards
  b.card("FORMULA", t`Completing the square: $x^2 + bx = \;?$`, t`$\left(x + \frac{b}{2}\right)^2 - \left(\frac{b}{2}\right)^2$`);
  b.card("FACT", t`Vertex of $y = a(x + p)^2 + q$`, t`$(-p,\ q)$; line of symmetry $x = -p$.`);
  b.card("CONCEPT", t`$y = a(x + p)^2 + q$ with $a > 0$`, t`U-shaped; minimum value $q$ when $x = -p$.`);
  b.card("CONCEPT", t`$y = q - a(x + p)^2$ with $a > 0$`, t`Upside down; maximum value $q$ when $x = -p$.`);
  b.card("CONCEPT", t`Completing the square for $ax^2 + bx + c$ with $a \neq 1$`, t`Factor $a$ out of the $x^2$ and $x$ terms only, complete the square inside, then multiply back by $a$.`);
  b.card("CONCEPT", "Range of a quadratic on a restricted domain", "Check whether the vertex is inside the domain, then compare it with the values at both ends.");
  b.card("DEFINITION", "Two-to-one (many-one) mapping", t`Two different inputs give the same output, as for any quadratic: $f(x_1) = f(x_2)$ with $x_1 \neq x_2$.`);
  b.card("CONCEPT", "Features of a quadratic sketch", t`Shape, $y$-intercept $(0, c)$, $x$-intercepts (roots), vertex with coordinates.`);
  b.card("FACT", t`If $ax^2 + bx + c = a(x + p)^2 + q$ with $a > 0$ and $q > 0$`, "The quadratic is always positive, so the equation has no real roots.");
});
