// W2a: amath.coordinate.lines
import { concept, P, t, chk, same, simplifySurd } from "../lib.mjs";

const shoelace = (pts) => Math.abs(pts.reduce((s, [x, y], i) => { const [u, v] = pts[(i + 1) % pts.length]; return s + x * v - u * y; }, 0)) / 2;
const grad = ([x1, y1], [x2, y2]) => (y2 - y1) / (x2 - x1);
const dist = ([x1, y1], [x2, y2]) => Math.hypot(x2 - x1, y2 - y1);

concept("amath.coordinate.lines", { file: "coordinate/lines", keyPrefix: "coordinate.lines" }, (b) => {
  chk(grad([2, 3], [6, 11]), 2);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find the gradient of the line joining $(2, 3)$ and $(6, 11)$.`,
    options: [
      [t`$2$`, t`Correct: $\frac{11 - 3}{6 - 2} = \frac{8}{4} = 2$.`],
      [t`$\frac{1}{2}$`, t`This is $\frac{\Delta x}{\Delta y}$, upside down.`],
      [t`$-2$`, t`Subtracting in opposite orders on the top and the bottom gives the wrong sign.`],
      [t`$8$`, t`8 is the change in $y$; divide it by the change in $x$.`],
    ],
    answer: "A",
    explanation: t`$m = \dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{11 - 3}{6 - 2} = 2$.`,
  });

  chk(dist([-1, 2], [11, 7]), 13);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the distance between the points $(-1, 2)$ and $(11, 7)$.`,
    value: 13, wrong: [17, 169],
    explanation: t`$\sqrt{(11 - (-1))^2 + (7 - 2)^2} = \sqrt{144 + 25} = \sqrt{169} = 13$.`,
  });

  same([(-3 + 7) / 2, (8 + -2) / 2], [2, 3]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the midpoint of the line segment joining $(-3, 8)$ and $(7, -2)$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [2], wrong: "5" }, { id: "y", input: "number", accepted: [3], wrong: "5" }],
    explanation: t`$\left(\frac{-3 + 7}{2}, \frac{8 + (-2)}{2}\right) = (2, 3)$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the gradient of the line $3x - 4y + 7 = 0$. You may type a fraction.`,
    value: 0.75, wrong: [3, -0.75],
    explanation: t`$4y = 3x + 7$, so $y = \frac{3}{4}x + \frac{7}{4}$ and the gradient is $\frac{3}{4}$.`,
  });

  chk(-3 * 2 + 11, 5);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the equation of the line with gradient $-3$ that passes through $(2, 5)$.`,
    options: [
      [t`$y = -3x + 11$`, t`Correct: $y - 5 = -3(x - 2)$ gives $y = -3x + 11$.`],
      [t`$y = -3x - 1$`, t`This uses $-3(x - 2) = -3x - 6$; in fact it equals $-3x + 6$.`],
      [t`$y = -3x + 17$`, t`This substitutes $x = -2$ instead of $x = 2$.`],
      [t`$y = 5x - 3$`, t`The gradient and the $y$-coordinate have been swapped.`],
    ],
    answer: "A",
    explanation: t`$y - 5 = -3(x - 2) = -3x + 6$, so $y = -3x + 11$. Check: $-3(2) + 11 = 5$.`,
  });

  chk(grad([-2, 7], [4, -5]), -2); chk(-2 * 4 + 3, -5);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The line through $(-2, 7)$ and $(4, -5)$ has equation $y = mx + c$. Find $m$ and $c$.`,
    template: "m = {{blank:m}}, c = {{blank:c}}",
    blanks: [{ id: "m", input: "number", accepted: [-2], wrong: "2" }, { id: "c", input: "number", accepted: [3], wrong: "11" }],
    explanation: t`$m = \frac{-5 - 7}{4 - (-2)} = \frac{-12}{6} = -2$. Then $7 = -2(-2) + c$, so $c = 3$. Check: $-2(4) + 3 = -5$.`,
    hints: ["Find the gradient first, then substitute one of the points."],
  });

  chk(4 * 4.5, 18); chk(-3 * -6, 18);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The line $4x - 3y = 18$ meets the $x$-axis at $A$ and the $y$-axis at $B$. Find the coordinates of $A$ and $B$.`,
    template: "A({{blank:ax}}, 0), B(0, {{blank:by}})",
    blanks: [{ id: "ax", input: "number", accepted: [4.5], wrong: "-4.5" }, { id: "by", input: "number", accepted: [-6], wrong: "6" }],
    explanation: t`$y = 0$: $4x = 18$, $x = 4.5$. $x = 0$: $-3y = 18$, $y = -6$.`,
  });

  chk(3 * 4 - 5, 7); chk(2 * 4 + 7, 15);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the point of intersection of the lines $y = 3x - 5$ and $2x + y = 15$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [4], wrong: "2" }, { id: "y", input: "number", accepted: [7], wrong: "1" }],
    explanation: t`Substitute: $2x + 3x - 5 = 15$, so $5x = 20$, $x = 4$ and $y = 3(4) - 5 = 7$. Check: $8 + 7 = 15$.`,
    hints: [t`Replace $y$ in the second equation by $3x - 5$.`],
  });

  chk(5 * 3 + 2 * -2, 11);
  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The point $(3, -2)$ lies on the line $5x + 2y = 11$.`,
    answer: true,
    explanation: t`True: $5(3) + 2(-2) = 15 - 4 = 11$, so the coordinates satisfy the equation.`,
  });

  chk(grad([4, 7], [6, 11]), 2); chk(grad([1, 1], [4, 7]), 2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The points $A(1, k)$, $B(4, 7)$ and $C(6, 11)$ are collinear. Find $k$.`,
    value: 1, prefix: "k =", wrong: [13, 5],
    explanation: t`Gradient $BC = \frac{11 - 7}{6 - 4} = 2$. Gradient $AB$ must also be 2: $\frac{7 - k}{4 - 1} = 2$, so $7 - k = 6$ and $k = 1$.`,
    hints: ["Collinear points give equal gradients."],
  });

  chk(shoelace([[2, 1], [8, 3], [4, 7]]), 16);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the area of the triangle with vertices $(2, 1)$, $(8, 3)$ and $(4, 7)$.`,
    value: 16, unit: "units²", wrong: [32, 8],
    explanation: t`Shoelace: $\frac{1}{2}\left|(2 \cdot 3 - 8 \cdot 1) + (8 \cdot 7 - 4 \cdot 3) + (4 \cdot 1 - 2 \cdot 7)\right| = \frac{1}{2}\left|-2 + 44 - 10\right| = 16$. Forgetting the half gives 32.`,
    hints: ["Take the vertices in order and repeat the first one at the end."],
  });

  const quadA = shoelace([[-1, 0], [5, -2], [6, 4], [1, 5]]);
  chk(quadA, 32.5);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`A quadrilateral has vertices $P(-1, 0)$, $Q(5, -2)$, $R(6, 4)$ and $S(1, 5)$, in that order. Find its area.`,
    value: quadA, unit: "units²", wrong: [65],
    explanation: t`Products in order: $(-1)(-2) - 5(0) = 2$; $5(4) - 6(-2) = 32$; $6(5) - 1(4) = 26$; $1(0) - (-1)(5) = 5$. Area $= \frac{1}{2}\left|2 + 32 + 26 + 5\right| = \frac{1}{2}(65) = 32.5$ square units. Forgetting the half gives 65.`,
    hints: ["Use the shoelace method with the vertices in the given order."],
  });

  chk(dist([4, 3], [1, -1]), 5); chk(dist([-2, 3], [1, -1]), 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The distance from $(a, 3)$ to $(1, -1)$ is 5 units, and $a > 1$. Find $a$.`,
    value: 4, prefix: "a =", wrong: [-2, 2],
    explanation: t`$(a - 1)^2 + (3 - (-1))^2 = 25$, so $(a - 1)^2 = 9$, $a - 1 = \pm 3$ and $a = 4$ or $a = -2$. Since $a > 1$, $a = 4$.`,
    hints: ["Square both sides of the distance formula."],
  });

  chk(2 * -1 - 3 * 4 + 14, 0); chk(3 * -1 - 2 * 4 + 11, 0); chk(2 * -1 + 3 * 4 - 10, 0);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Which is the equation of the line through $(-1, 4)$ with gradient $\frac{2}{3}$?`,
    options: [
      [t`$2x - 3y + 14 = 0$`, t`Correct: the gradient is $\frac{2}{3}$ and $(-1, 4)$ satisfies it.`],
      [t`$2x - 3y - 14 = 0$`, t`Gradient $\frac{2}{3}$, but $(-1, 4)$ gives $-2 - 12 - 14 \neq 0$.`],
      [t`$3x - 2y + 11 = 0$`, t`It passes through $(-1, 4)$ but its gradient is $\frac{3}{2}$.`],
      [t`$2x + 3y - 10 = 0$`, t`It passes through $(-1, 4)$ but its gradient is $-\frac{2}{3}$.`],
    ],
    answer: "A",
    explanation: t`$y - 4 = \frac{2}{3}(x + 1)$; multiply by 3: $3y - 12 = 2x + 2$, so $2x - 3y + 14 = 0$.`,
    hints: [t`The gradient of $ax + by + c = 0$ is $-\frac{a}{b}$.`],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each description with the equation of the line.",
    pairs: [
      ["gradient 4, y-intercept −1", t`$y = 4x - 1$`],
      [t`horizontal, through $(2, -3)$`, t`$y = -3$`],
      [t`vertical, through $(2, -3)$`, t`$x = 2$`],
      [t`through the origin, gradient $-\frac{1}{2}$`, t`$x + 2y = 0$`],
    ],
    explanation: t`A horizontal line has a constant $y$; a vertical line has a constant $x$. $x + 2y = 0$ is $y = -\frac{1}{2}x$, through $(0, 0)$.`,
  });

  same([2 * 3 - 7, 2 * -1 - 2], [-1, -4]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The midpoint of $AB$ is $M(3, -1)$ and $A$ is $(7, 2)$. Find the coordinates of $B$.`,
    options: [
      [t`$(-1, -4)$`, t`Correct: $B = (2 \times 3 - 7, 2 \times (-1) - 2)$.`],
      [t`$(5, 0.5)$`, t`This is the midpoint of $A$ and $M$, not the other end.`],
      [t`$(11, 5)$`, t`This goes from $M$ to $A$ and beyond: the step is applied in the wrong direction.`],
      [t`$(-4, -3)$`, t`This is $M - A$, the step from $A$ to $M$, not a point.`],
    ],
    answer: "A",
    explanation: t`$\frac{7 + x}{2} = 3$ gives $x = -1$; $\frac{2 + y}{2} = -1$ gives $y = -4$. So $B = (-1, -4)$.`,
    hints: ["Go from A to M, then the same step again."],
  });

  chk(dist([-2, 1], [4, 3]), Math.sqrt(40)); chk(dist([4, 3], [2, 9]), Math.sqrt(40));
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`The points $P(-2, 1)$, $Q(4, 3)$ and $R(2, 9)$ are the vertices of a triangle. Show that the triangle is isosceles.`,
    points: [
      t`M1 uses the distance formula for two sides: $PQ = \sqrt{6^2 + 2^2}$, $QR = \sqrt{(-2)^2 + 6^2}$.`,
      t`A1 obtains $PQ = QR = \sqrt{40}$.`,
      t`A1 concludes that two sides are equal, so the triangle is isosceles.`,
    ],
    modelAnswer: t`$$
PQ = \sqrt{(4 - (-2))^2 + (3 - 1)^2} = \sqrt{36 + 4} = \sqrt{40}
$$

$$
QR = \sqrt{(2 - 4)^2 + (9 - 3)^2} = \sqrt{4 + 36} = \sqrt{40}
$$

$PQ = QR$, so triangle $PQR$ is isosceles (with $Q$ the apex).`,
    explanation: "Two equal side lengths make a triangle isosceles; compare the lengths with the distance formula.",
    hints: ["Find the lengths of PQ and QR."],
  });

  {
    const A = [-4, 2], B = [6, 7], C = [5, -1];
    chk(grad(A, B), 0.5); chk(0.5 * -4 + 4, 2); chk(0.5 * 6 + 4, 7);
    chk(-2 * C[0] + 9, C[1]);
    const D = [2, 5];
    chk(0.5 * 2 + 4, 5); chk(-2 * 2 + 9, 5);
    chk(dist(C, D), Math.sqrt(45));
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`The points $A(-4, 2)$, $B(6, 7)$ and $C(5, -1)$ are given. The line $L$ has equation $y = -2x + 9$ and passes through $C$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Find the gradient of $AB$.`, value: 0.5, wrong: [2], explanation: t`$\frac{7 - 2}{6 - (-4)} = \frac{5}{10} = \frac{1}{2}$.` }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the equation of $AB$ in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [0.5], wrong: "2" }, { id: "c", input: "number", accepted: [4], wrong: "0" }],
          explanation: t`$y - 2 = \frac{1}{2}(x + 4)$, so $y = \frac{1}{2}x + 4$.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`The line $L$ meets $AB$ at $D$. Find the coordinates of $D$.`, template: "D({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [2], wrong: "-2" }, { id: "y", input: "number", accepted: [5], wrong: "13" }],
          explanation: t`$\frac{1}{2}x + 4 = -2x + 9$ gives $\frac{5}{2}x = 5$, so $x = 2$ and $y = 5$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the length of $CD$, correct to 3 significant figures.`, value: Math.sqrt(45), wrong: [45],
          explanation: t`$CD = \sqrt{(2 - 5)^2 + (5 - (-1))^2} = \sqrt{9 + 36} = \sqrt{45} = 6.71$ (3 s.f.).` }),
      ],
      explanation: "Gradient, then the equation of AB, then solve simultaneously with L, then the distance formula.",
      hints: ["Use point–gradient form for AB.", t`At $D$ both equations give the same $y$.`],
    });
  }

  {
    const A = [-2, -1], B = [6, 3], C = [1, 7];
    const ab = dist(A, B);
    chk(ab, Math.sqrt(80));
    same(simplifySurd(80).tex, "4\\sqrt{5}");
    same([(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], [2, 1]);
    const area = shoelace([A, B, C]);
    chk(area, 26);
    const h = (2 * area) / ab;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`A triangular plot of land near Gweru has corners at $A(-2, -1)$, $B(6, 3)$ and $C(1, 7)$, where the units are tens of metres.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the exact length of $AB$ in the form $k\sqrt{5}$.`, template: "k = {{blank:k}}",
          blanks: [{ id: "k", input: "number", accepted: [4], wrong: "16" }],
          explanation: t`$AB = \sqrt{8^2 + 4^2} = \sqrt{80} = \sqrt{16 \times 5} = 4\sqrt{5}$.` }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the coordinates of the midpoint of $AB$.`, template: "({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [2], wrong: "4" }, { id: "y", input: "number", accepted: [1], wrong: "2" }],
          explanation: t`$\left(\frac{-2 + 6}{2}, \frac{-1 + 3}{2}\right) = (2, 1)$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Find the area of triangle $ABC$ in square units.`, value: area, unit: "units²", wrong: [52],
          explanation: t`$\frac{1}{2}\left|(-2)(3) - 6(-1) + 6(7) - 1(3) + 1(-1) - (-2)(7)\right| = \frac{1}{2}\left|0 + 39 + 13\right| = 26$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Hence find the perpendicular distance from $C$ to $AB$, in units, correct to 3 significant figures.`, value: h, wrong: [Number((area / ab).toFixed(2))],
          explanation: t`Area $= \frac{1}{2} \times AB \times h$, so $h = \frac{2 \times 26}{4\sqrt{5}} = \frac{13}{\sqrt{5}} = 5.81$ (3 s.f.).` }),
      ],
      explanation: "Exact lengths come from the distance formula; the area from the shoelace method; then the area formula ½ × base × height gives the perpendicular height.",
      hints: [t`$80 = 16 \times 5$.`, t`For (d), use Area $= \frac{1}{2} \times$ base $\times$ height with $AB$ as the base.`],
    });
  }

  b.card("FORMULA", "Distance between two points", t`$\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$`);
  b.card("FORMULA", "Midpoint", t`$\left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)$`);
  b.card("FORMULA", "Gradient", t`$m = \frac{y_2 - y_1}{x_2 - x_1}$`);
  b.card("FORMULA", "Line through a point with gradient m", t`$y - y_1 = m(x - x_1)$`);
  b.card("FACT", t`Gradient of $ax + by + c = 0$`, t`$-\frac{a}{b}$`);
  b.card("CONCEPT", "Point of intersection of two lines", "Solve the two equations simultaneously.");
  b.card("CONCEPT", "Collinear points P, Q, R", "Gradient PQ = gradient QR (with the common point Q).");
  b.card("FORMULA", "Area of a polygon from its vertices (in order)", t`$\frac{1}{2}\left|\sum (x_iy_{i+1} - x_{i+1}y_i)\right|$ (shoelace method)`);
  b.card("CONCEPT", "Intercepts", "x-intercept: put y = 0. y-intercept: put x = 0.");
});
