// W1a: amath.algebra.simultaneous-equations — one linear and one non-linear equation.
import { concept, P, t, chk, same, quad } from "../lib.mjs";

const nb = (id, v, w) => ({ id, input: "number", accepted: [v], wrong: w });
/** Asserts that every pair satisfies both equations (each given as a function returning 0 when satisfied). */
function sat(pairs, ...eqs) {
  for (const [x, y] of pairs) for (const e of eqs) chk(e(x, y), 0, 1e-9, `pair (${x}, ${y})`);
}

concept("amath.algebra.simultaneous-equations", { file: "algebra/simultaneous-equations", keyPrefix: "algebra.simultaneous-equations" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is the best first step to solve $y = x + 1$ and $x^{2} + y^{2} = 25$ simultaneously?`,
    options: [
      [t`Substitute $y = x + 1$ into $x^{2} + y^{2} = 25$.`, "Correct: this gives a quadratic in x alone."],
      [t`Square $y = x + 1$ to get $y^{2} = x^{2} + 1$.`, t`$(x + 1)^{2} = x^{2} + 2x + 1$, so this step is wrong as well as unhelpful.`],
      [t`Add the two equations to eliminate $y$.`, t`Adding does not remove $y$, because one equation has $y$ and the other $y^{2}$.`],
      [t`Take square roots: $x + y = 5$.`, t`$\sqrt{x^{2} + y^{2}}$ is not $x + y$.`],
    ],
    answer: "A",
    explanation: "With one linear equation, make one unknown the subject and substitute it into the non-linear equation.",
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Substituting $y = 3 - x$ into $xy = 2$ gives which equation?`,
    options: [
      [t`$x^{2} - 3x + 2 = 0$`, t`Correct: $x(3 - x) = 2$, so $3x - x^{2} = 2$, i.e. $x^{2} - 3x + 2 = 0$.`],
      [t`$x^{2} + 3x + 2 = 0$`, t`The sign of the $x$ term is wrong: $x(3 - x) = 3x - x^{2}$.`],
      [t`$3x - x^{2} = 0$`, "The 2 on the right-hand side has been lost."],
      [t`$x^{2} - 3x - 2 = 0$`, t`Moving everything to one side gives $+2$, not $-2$.`],
    ],
    answer: "A",
    explanation: t`$x(3 - x) = 2 \Rightarrow 3x - x^{2} - 2 = 0 \Rightarrow x^{2} - 3x + 2 = 0$, giving $x = 1$ or $2$.`,
  });

  // y = x + 2, y = x^2 -> (−1, 1), (2, 4)
  same(quad.roots(1, -1, -2), [-1, 2]);
  sat([[-1, 1], [2, 4]], (x, y) => y - x - 2, (x, y) => y - x * x);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the coordinates of the points where the line $y = x + 2$ meets the curve $y = x^{2}$. Give the point with the smaller $x$-coordinate first.`,
    template: "({{blank:x1}}, {{blank:y1}}) and ({{blank:x2}}, {{blank:y2}})",
    blanks: [nb("x1", -1, 1), nb("y1", 1, -1), nb("x2", 2, -2), nb("y2", 4, 2)],
    explanation: t`$x^{2} = x + 2$, so $x^{2} - x - 2 = 0$ and $(x - 2)(x + 1) = 0$. $x = -1$ gives $y = 1$; $x = 2$ gives $y = 4$.`,
  });

  // x + y = 7, xy = 10 -> (2, 5), (5, 2)
  same(quad.roots(1, -7, 10), [2, 5]);
  sat([[2, 5], [5, 2]], (x, y) => x + y - 7, (x, y) => x * y - 10);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve the simultaneous equations $x + y = 7$ and $xy = 10$. Give the solution with the smaller value of $x$ first.`,
    template: "x = {{blank:x1}}, y = {{blank:y1}} and x = {{blank:x2}}, y = {{blank:y2}}",
    blanks: [nb("x1", 2, 5), nb("y1", 5, 2), nb("x2", 5, 2), nb("y2", 2, 5)],
    explanation: t`$y = 7 - x$, so $x(7 - x) = 10$, $x^{2} - 7x + 10 = 0$, $(x - 2)(x - 5) = 0$. $x = 2$, $y = 5$; $x = 5$, $y = 2$.`,
    hints: ["Make y the subject of the linear equation.", "Pair each x with its own y from the linear equation."],
  });

  // 2x + y = 5, x^2 + y^2 = 10 -> (1, 3), (3, −1)
  same(quad.roots(5, -20, 15), [1, 3]);
  sat([[1, 3], [3, -1]], (x, y) => 2 * x + y - 5, (x, y) => x * x + y * y - 10);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $2x + y = 5$ and $x^{2} + y^{2} = 10$. Give the solution with the smaller value of $x$ first.`,
    template: "x = {{blank:x1}}, y = {{blank:y1}} and x = {{blank:x2}}, y = {{blank:y2}}",
    blanks: [nb("x1", 1, 3), nb("y1", 3, 1), nb("x2", 3, 1), nb("y2", -1, 1)],
    explanation: t`$y = 5 - 2x$: $x^{2} + 25 - 20x + 4x^{2} = 10$, so $5x^{2} - 20x + 15 = 0$, i.e. $x^{2} - 4x + 3 = 0$. $x = 1$, $y = 3$; $x = 3$, $y = -1$.`,
    hints: [t`$(5 - 2x)^{2} = 25 - 20x + 4x^{2}$.`],
  });

  // y − 2x = 1, x^2 + xy = 10 -> (−2, −3), (5/3, 13/3)
  same(quad.roots(3, 1, -10), [-2, 5 / 3]);
  sat([[-2, -3], [5 / 3, 13 / 3]], (x, y) => y - 2 * x - 1, (x, y) => x * x + x * y - 10);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve $y - 2x = 1$ and $x^{2} + xy = 10$. Give the solution with the smaller value of $x$ first; give fractions as fractions or decimals to 3 significant figures.`,
    template: "x = {{blank:x1}}, y = {{blank:y1}} and x = {{blank:x2}}, y = {{blank:y2}}",
    blanks: [nb("x1", -2, 2), nb("y1", -3, 3), { id: "x2", input: "number", accepted: ["5/3"], tolerance: 0.005, wrong: 1.5 }, { id: "y2", input: "number", accepted: ["13/3"], tolerance: 0.005, wrong: 4 }],
    explanation: t`$y = 2x + 1$: $x^{2} + x(2x + 1) = 10$, so $3x^{2} + x - 10 = 0$ and $(3x - 5)(x + 2) = 0$. $x = -2$, $y = -3$; $x = \frac{5}{3}$, $y = \frac{13}{3}$.`,
    hints: ["Make y the subject.", "The quadratic factorises with a factor 3x − 5."],
  });

  same(quad.roots(1, -2, -3), [-1, 3]);
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true, calculator: false,
    stem: t`At how many points does the line $y = 2x$ meet the curve $y = x^{2} - 3$?`,
    value: 2, wrong: [1, 0],
    explanation: t`$x^{2} - 3 = 2x$ gives $x^{2} - 2x - 3 = 0$, $(x - 3)(x + 1) = 0$: two different roots, so two points, $(3, 6)$ and $(-1, -2)$.`,
  });

  same(quad.roots(1, 1, -12), [-4, 3]);
  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`The line $y = x + 1$ meets the circle $x^{2} + y^{2} = 25$ at points $A$ and $B$. Find the sum of the $x$-coordinates of $A$ and $B$.`,
    value: -1, wrong: [1, 7],
    explanation: t`$x^{2} + (x + 1)^{2} = 25$ gives $2x^{2} + 2x - 24 = 0$, i.e. $x^{2} + x - 12 = 0$, so $x = 3$ or $x = -4$. The sum is $-1$.`,
    hints: ["Substitute and simplify to a quadratic in x."],
  });

  // y = 2x + 1 and y = x^2 − 2 -> (−1, −1), (3, 7); AB = √80
  same(quad.roots(1, -2, -3), [-1, 3]);
  const AB = Math.hypot(3 - -1, 7 - -1);
  chk(AB, 4 * Math.sqrt(5), 1e-12);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The line $y = 2x + 1$ meets the curve $y = x^{2} - 2$ at the points $A$ and $B$. Find the length of $AB$, correct to 3 significant figures.`,
    value: AB, wrong: [4, 8],
    explanation: t`$x^{2} - 2 = 2x + 1$ gives $x^{2} - 2x - 3 = 0$, so $x = -1$ or $3$: $A(-1, -1)$, $B(3, 7)$. $AB = \sqrt{4^{2} + 8^{2}} = \sqrt{80} = 4\sqrt{5} = 8.94$.`,
    workedSolution: t`1. Equate: $x^{2} - 2 = 2x + 1$, so $x^{2} - 2x - 3 = 0$.
2. $(x - 3)(x + 1) = 0$: $x = 3$ or $x = -1$.
3. From the line: $A(-1, -1)$ and $B(3, 7)$.
4. $AB = \sqrt{(3 - (-1))^{2} + (7 - (-1))^{2}} = \sqrt{16 + 64} = \sqrt{80}$.
5. $AB = 4\sqrt{5} = 8.94$ (3 s.f.).`,
    hints: ["Find both intersection points first.", "Distance = √[(x₂ − x₁)² + (y₂ − y₁)²]."],
  });

  // x/y + 3y/x = 4, x − y = 2 -> x = 3, y = 1
  sat([[3, 1]], (x, y) => x / y + (3 * y) / x - 4, (x, y) => x - y - 2);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Solve the simultaneous equations $x - y = 2$ and $\dfrac{x}{y} + \dfrac{3y}{x} = 4$. (There is exactly one solution.)`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [nb("x", 3, 1), nb("y", 1, 3)],
    explanation: t`Multiply by $xy$: $x^{2} + 3y^{2} = 4xy$, so $x^{2} - 4xy + 3y^{2} = 0$ and $(x - y)(x - 3y) = 0$. $x = y$ contradicts $x - y = 2$. So $x = 3y$, giving $2y = 2$: $y = 1$, $x = 3$.`,
    hints: ["Clear the fractions by multiplying every term by xy.", "Factorise the result as a quadratic in x and y."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A straight line can meet a circle at exactly three points.",
    answer: false,
    explanation: "Substituting a line into a circle gives a quadratic, which has at most two roots, so a line meets a circle at most twice.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If, after substituting a line into a curve, the resulting quadratic has a negative discriminant, then the line and the curve do not meet.",
    answer: true,
    explanation: "A negative discriminant means the quadratic has no real roots, so there is no point common to the line and the curve.",
  });

  same(quad.roots(1, -5, 4), [1, 4]);
  sat([[1, 4], [4, 1]], (x, y) => y - 5 + x, (x, y) => x * y - 4);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Tatenda solves $y = 5 - x$ and $xy = 4$ and finds $x = 1$ or $x = 4$. Which is the complete solution?`,
    options: [
      [t`$(1, 4)$ and $(4, 1)$`, t`Correct: from $y = 5 - x$, $x = 1$ gives $y = 4$ and $x = 4$ gives $y = 1$.`],
      [t`$(1, 1)$ and $(4, 4)$`, t`$y$ is not equal to $x$; use $y = 5 - x$.`],
      [t`$(1, 4)$ and $(4, 4)$`, t`$(4, 4)$ gives $xy = 16$, not 4.`],
      [t`$(1, 4)$ only`, "The second value of x gives a second valid solution."],
    ],
    answer: "A",
    explanation: "Each value of x is paired with its own y from the linear equation, and both pairs satisfy xy = 4.",
    hints: ["Find each y from the linear equation y = 5 − x."],
  });

  chk(quad.disc(1, -2, 1), 0);
  chk(quad.disc(1, -1, -2), 9);
  chk(quad.disc(1, -1, 1), -3);
  b.match({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Match each line to the number of points where it meets the curve $y = x^{2}$.`,
    pairs: [
      [t`$y = x + 2$`, "two points"],
      [t`$y = 2x - 1$`, "one point (the line is a tangent)"],
      [t`$y = x - 1$`, "no points"],
    ],
    explanation: t`Set $x^{2}$ equal to each line: $x^{2} - x - 2 = 0$ (discriminant 9), $x^{2} - 2x + 1 = 0$ (discriminant 0), $x^{2} - x + 1 = 0$ (discriminant $-3$).`,
    hints: ["Form the quadratic and look at its discriminant."],
  });

  // y = x + 1, x^2 + xy + y^2 = 7 -> (1, 2), (−2, −1)
  same(quad.roots(1, 1, -2), [-2, 1]);
  sat([[1, 2], [-2, -1]], (x, y) => y - x - 1, (x, y) => x * x + x * y + y * y - 7);
  chk(2 * 2 + 2 * 1 + 1, 7); chk(1 + 2 + 4, 7); // (2, 1) and (−1, −2) lie on the curve only
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Which of these is a solution of the simultaneous equations $y = x + 1$ and $x^{2} + xy + y^{2} = 7$?`,
    options: [
      [t`$(-2, -1)$`, t`Correct: $-1 = -2 + 1$ and $4 + 2 + 1 = 7$.`],
      [t`$(2, 1)$`, t`It satisfies the curve ($4 + 2 + 1 = 7$) but not the line: $x + 1 = 3$, not 1.`],
      [t`$(-1, -2)$`, t`It satisfies the curve but not the line: $x + 1 = 0$, not $-2$.`],
      [t`$(0, 1)$`, t`It lies on the line, but $0 + 0 + 1 = 1 \neq 7$.`],
    ],
    answer: "A",
    explanation: t`Substituting $y = x + 1$: $3x^{2} + 3x + 1 = 7$, so $x^{2} + x - 2 = 0$, $x = 1$ or $-2$. Solutions $(1, 2)$ and $(-2, -1)$.`,
    hints: ["A solution must satisfy both equations."],
  });

  chk(quad.disc(1, 0, 3), -12);
  b.proof({
    d: 3, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Show that the line $y = 2x + 7$ does not meet the curve $y = x^{2} + 2x + 10$.`,
    points: [t`M1 equates: $x^{2} + 2x + 10 = 2x + 7$`, t`A1 simplifies to $x^{2} + 3 = 0$`, t`A1 concludes no real solutions ($x^{2} = -3$ impossible, or discriminant $-12 < 0$), so they do not meet`],
    modelAnswer: t`At any meeting point,

$$
x^{2} + 2x + 10 = 2x + 7 \;\Rightarrow\; x^{2} + 3 = 0 \;\Rightarrow\; x^{2} = -3
$$

No real number squared is negative (discriminant $0 - 12 = -12 < 0$), so there are no real solutions and the line does not meet the curve.`,
    explanation: "Equate the two expressions for y and show the resulting quadratic has no real roots.",
    hints: ["Set the two expressions for y equal."],
  });

  // Structured (7 marks): y = x − 1 and x^2 + 2y^2 = 22
  same(quad.roots(3, -4, -20), [-2, 10 / 3]);
  sat([[-2, -3], [10 / 3, 7 / 3]], (x, y) => y - x + 1, (x, y) => x * x + 2 * y * y - 22);
  const midx = (-2 + 10 / 3) / 2;
  chk(midx, 2 / 3, 1e-12);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The line $y = x - 1$ meets the curve $x^{2} + 2y^{2} = 22$ at the points $A$ and $B$.`,
    parts: [
      P.proof({
        label: "(a)", marks: 2, stem: t`Show that the $x$-coordinates of $A$ and $B$ satisfy $3x^{2} - 4x - 20 = 0$.`,
        points: [t`M1 substitutes: $x^{2} + 2(x - 1)^{2} = 22$`, t`A1 expands and simplifies to $3x^{2} - 4x - 20 = 0$`],
        modelAnswer: t`$$
x^{2} + 2(x - 1)^{2} = 22 \;\Rightarrow\; x^{2} + 2x^{2} - 4x + 2 = 22 \;\Rightarrow\; 3x^{2} - 4x - 20 = 0
$$`,
      }),
      P.fib({
        label: "(b)", marks: 4, stem: t`Find the coordinates of $A$ and $B$, with $A$ having the smaller $x$-coordinate. Give fractions as fractions or as decimals to 3 significant figures.`,
        template: "A({{blank:x1}}, {{blank:y1}}) and B({{blank:x2}}, {{blank:y2}})",
        blanks: [nb("x1", -2, 2), nb("y1", -3, -1), { id: "x2", input: "number", accepted: ["10/3"], tolerance: 0.005, wrong: 3 }, { id: "y2", input: "number", accepted: ["7/3"], tolerance: 0.005, wrong: 2 }],
        explanation: t`$(3x - 10)(x + 2) = 0$, so $x = -2$ or $x = \frac{10}{3}$. From $y = x - 1$: $A(-2, -3)$ and $B\left(\frac{10}{3}, \frac{7}{3}\right)$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: t`Find the $x$-coordinate of the midpoint of $AB$.`,
        value: midx, answer: "2/3", wrong: [4 / 3, 0.5],
        explanation: t`$\frac{1}{2}\left(-2 + \frac{10}{3}\right) = \frac{1}{2} \times \frac{4}{3} = \frac{2}{3}$.`,
      }),
    ],
    explanation: t`Substituting gives $3x^{2} - 4x - 20 = (3x - 10)(x + 2) = 0$; the line then gives the $y$-coordinates, $A(-2, -3)$ and $B\left(\frac{10}{3}, \frac{7}{3}\right)$, with midpoint $x$-coordinate $\frac{2}{3}$.`,
    hints: [t`$(x - 1)^{2} = x^{2} - 2x + 1$.`, "Use the line, not the curve, to find each y."],
  });

  // Structured (9 marks): rectangle perimeter 46 m, diagonal 17 m -> 8 by 15
  same(quad.roots(1, -23, 120), [8, 15]);
  sat([[8, 15]], (x, y) => 2 * (x + y) - 46, (x, y) => x * x + y * y - 289);
  b.struct({
    d: 5, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A rectangular vegetable plot near Chinhoyi has length $x$ metres and width $y$ metres, with $x > y$. Its perimeter is $46$ m and each diagonal is $17$ m long.`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Write down two equations in x and y.",
        points: [t`$2x + 2y = 46$ (or $x + y = 23$)`, t`$x^{2} + y^{2} = 289$ (Pythagoras with the diagonal $17$)`],
        modelAnswer: "Perimeter: 2x + 2y = 46, so x + y = 23. Diagonal (Pythagoras): x² + y² = 17² = 289.",
      }),
      P.proof({
        label: "(b)", marks: 2, stem: t`Show that $x^{2} - 23x + 120 = 0$.`,
        points: [t`M1 substitutes $y = 23 - x$ into $x^{2} + y^{2} = 289$`, t`A1 simplifies $2x^{2} - 46x + 240 = 0$ to the given equation`],
        modelAnswer: t`$$
x^{2} + (23 - x)^{2} = 289 \;\Rightarrow\; 2x^{2} - 46x + 529 = 289 \;\Rightarrow\; 2x^{2} - 46x + 240 = 0
$$

Dividing by 2: $x^{2} - 23x + 120 = 0$.`,
      }),
      P.fib({
        label: "(c)", marks: 3, stem: "Find the length and the width of the plot.",
        template: "length = {{blank:L}} m, width = {{blank:W}} m",
        blanks: [nb("L", 15, 8), nb("W", 8, 15)],
        explanation: t`$(x - 8)(x - 15) = 0$, so $x = 8$ or $15$. Since $x > y$ and $x + y = 23$, the length is $15$ m and the width $8$ m.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Find the area of the plot.",
        value: 120, unit: "m²", wrong: [289, 23],
        explanation: t`$15 \times 8 = 120$ m². (Also the constant term of the quadratic, because $xy = 120$.)`,
      }),
    ],
    explanation: t`$x + y = 23$ and $x^{2} + y^{2} = 289$ give $x^{2} - 23x + 120 = 0$, so the sides are 15 m and 8 m, and the area is 120 m².`,
    hints: ["Perimeter = 2(length + width).", "The diagonal is the hypotenuse of a right-angled triangle."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The real solutions of a pair of simultaneous equations y = (linear) and y = (quadratic) represent",
    options: [
      ["the coordinates of the points where the line meets the curve", "Correct: each solution pair satisfies both equations, so it lies on both graphs."],
      ["the points where the curve crosses the x-axis", "Those are the roots of the quadratic equal to zero, not its meeting points with the line."],
      ["the turning point of the curve and the y-intercept of the line", "Neither of these needs to lie on both graphs."],
      ["the gradients of the line and the curve where they meet", "The solutions are coordinates, not gradients."],
    ],
    answer: "A",
    explanation: "A point lies on a graph exactly when its coordinates satisfy the graph's equation; a solution pair lies on both.",
  });

  // x − y = 1, x^2 − y^2 = 9 -> x + y = 9 -> (5, 4)
  sat([[5, 4]], (x, y) => x - y - 1, (x, y) => x * x - y * y - 9);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Solve the simultaneous equations $x - y = 1$ and $x^{2} - y^{2} = 9$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [nb("x", 5, 4), nb("y", 4, 5)],
    explanation: t`$x^{2} - y^{2} = (x - y)(x + y) = 1 \times (x + y) = 9$, so $x + y = 9$. With $x - y = 1$: $x = 5$, $y = 4$. (Substitution gives the same: $(y + 1)^{2} - y^{2} = 9$, $2y + 1 = 9$.)`,
    hints: [t`Factorise $x^{2} - y^{2}$ as a difference of two squares.`],
  });

  b.card("CONCEPT", "Method for one linear and one non-linear equation", "Make x or y the subject of the linear equation, substitute into the other, solve the quadratic, then find each partner value from the linear equation.");
  b.card("FACT", "Which equation to use for the partner values", "The linear one: using the curve can introduce values that do not satisfy both equations.");
  b.card("CONCEPT", "Meaning of a solution pair", "The coordinates of a point where the line meets the curve.");
  b.card("FACT", "Discriminant after substitution", "Positive: two meeting points. Zero: the line is a tangent. Negative: no meeting points.");
  b.card("FACT", "Presenting solutions", "Write them as pairs, e.g. x = 2, y = 3 and x = −6/5, y = −17/5, or as coordinates.");
  b.card("CONCEPT", t`Equations with $\frac{x}{y}$ terms`, t`Multiply through by $xy$ first, e.g. $\frac{x}{y} + \frac{2y}{x} = 3 \Rightarrow x^{2} + 2y^{2} = 3xy$, then factorise.`);
  b.card("FORMULA", "Distance between two intersection points", t`$AB = \sqrt{(x_{2} - x_{1})^{2} + (y_{2} - y_{1})^{2}}$`);
  b.card("FACT", "Maximum number of meeting points of a line and a circle or parabola", "Two, because substitution gives a quadratic.");
});
