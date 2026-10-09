// W2a: amath.coordinate.parallel-perpendicular
import { concept, P, t, chk, same, simplifySurd } from "../lib.mjs";

const grad = ([x1, y1], [x2, y2]) => (y2 - y1) / (x2 - x1);
const dist = ([x1, y1], [x2, y2]) => Math.hypot(x2 - x1, y2 - y1);
const shoelace = (pts) => Math.abs(pts.reduce((s, [x, y], i) => { const [u, v] = pts[(i + 1) % pts.length]; return s + x * v - u * y; }, 0)) / 2;

concept("amath.coordinate.parallel-perpendicular", { file: "coordinate/parallel-perpendicular", keyPrefix: "coordinate.parallel-perpendicular" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A line has gradient $\frac{3}{4}$. What is the gradient of a line perpendicular to it?`,
    options: [
      [t`$-\frac{4}{3}$`, t`Correct: $\frac{3}{4} \times \left(-\frac{4}{3}\right) = -1$.`],
      [t`$\frac{4}{3}$`, t`The fraction is flipped but the sign must change too.`],
      [t`$-\frac{3}{4}$`, t`The sign is changed but the fraction must be flipped too.`],
      [t`$\frac{3}{4}$`, t`An equal gradient gives a parallel line.`],
    ],
    answer: "A",
    explanation: t`$m_2 = -\dfrac{1}{m_1} = -\dfrac{4}{3}$.`,
  });

  b.tf({
    d: 1, skill: "APPLICATION", calculator: false,
    stem: t`The lines $y = 3x - 2$ and $6x - 2y = 5$ are parallel.`,
    answer: true,
    explanation: t`True. $6x - 2y = 5$ gives $y = 3x - 2.5$, which has gradient 3, the same as $y = 3x - 2$ (and a different intercept, so they never meet).`,
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the gradient of a normal to the line $5x + 2y = 9$. You may type a fraction.`,
    value: 0.4, wrong: [-2.5, -0.4],
    explanation: t`$2y = -5x + 9$ gives gradient $-\frac{5}{2}$. A normal is perpendicular, so its gradient is $\frac{2}{5}$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Which line is perpendicular to $y = -\frac{1}{2}x + 3$?`,
    options: [
      [t`$y = 2x - 7$`, t`Correct: $-\frac{1}{2} \times 2 = -1$.`],
      [t`$y = -2x + 1$`, t`$-\frac{1}{2} \times (-2) = 1$, not $-1$.`],
      [t`$y = \frac{1}{2}x + 4$`, t`$-\frac{1}{2} \times \frac{1}{2} = -\frac{1}{4}$, not $-1$.`],
      [t`$y = -\frac{1}{2}x - 5$`, t`This has the same gradient, so it is parallel.`],
    ],
    answer: "A",
    explanation: t`The perpendicular gradient is $-1 \div \left(-\frac{1}{2}\right) = 2$; only $y = 2x - 7$ has gradient 2.`,
  });

  chk(4 * 2 - 11, -3);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the line parallel to $y = 4x - 1$ that passes through $(2, -3)$, in the form $y = mx + c$.`,
    template: "m = {{blank:m}}, c = {{blank:c}}",
    blanks: [{ id: "m", input: "number", accepted: [4], wrong: "-0.25" }, { id: "c", input: "number", accepted: [-11], wrong: "-1" }],
    explanation: t`Parallel: $m = 4$. Then $-3 = 4(2) + c$, so $c = -11$: $y = 4x - 11$.`,
  });

  chk(6 + 3 * 1 - 9, 0); chk(3 * (-1 / 3), -1);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the line through $(6, 1)$ that is perpendicular to $3x - y + 4 = 0$. Write it in the form $x + by + c = 0$.`,
    template: "x + ({{blank:b}})y + ({{blank:c}}) = 0",
    blanks: [{ id: "b", input: "number", accepted: [3], wrong: "-3" }, { id: "c", input: "number", accepted: [-9], wrong: "9" }],
    explanation: t`$3x - y + 4 = 0$ has gradient 3, so the perpendicular has gradient $-\frac{1}{3}$. $y - 1 = -\frac{1}{3}(x - 6)$ gives $3y - 3 = -x + 6$, so $x + 3y - 9 = 0$: $b = 3$, $c = -9$.`,
    hints: ["Make y the subject to read off the gradient.", "Multiply through by 3 to clear the fraction."],
  });

  chk((-2 / 1.5) * (3 / 4), -1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The lines $2x + ky = 5$ and $3x - 4y = 1$ are perpendicular. Find the value of $k$.`,
    value: 1.5, prefix: "k =", wrong: [-1.5, -8 / 3],
    explanation: t`Gradients: $-\frac{2}{k}$ and $\frac{3}{4}$. Perpendicular: $-\frac{2}{k} \times \frac{3}{4} = -1$, so $\frac{6}{4k} = 1$ and $k = \frac{3}{2}$.`,
    hints: ["Write each gradient in terms of k, then use m₁m₂ = −1."],
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The lines $y = (k - 1)x + 2$ and $y = 3x - 4$ are parallel. Find $k$.`,
    value: 4, prefix: "k =", wrong: [3, 2 / 3],
    explanation: t`Parallel lines have equal gradients: $k - 1 = 3$, so $k = 4$.`,
  });

  {
    const A = [-3, 2], B = [5, 6];
    same([(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], [1, 4]);
    chk(grad(A, B), 0.5); chk(-2 * 1 + 6, 4);
    chk(dist(A, [0, 6]), dist(B, [0, 6]));
  }
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the perpendicular bisector of the segment joining $(-3, 2)$ and $(5, 6)$, in the form $y = mx + c$.`,
    template: "m = {{blank:m}}, c = {{blank:c}}",
    blanks: [{ id: "m", input: "number", accepted: [-2], wrong: "0.5" }, { id: "c", input: "number", accepted: [6], wrong: "2" }],
    explanation: t`Midpoint $(1, 4)$; gradient of the segment $\frac{4}{8} = \frac{1}{2}$, so the bisector has gradient $-2$. $y - 4 = -2(x - 1)$ gives $y = -2x + 6$.`,
    hints: ["The bisector passes through the midpoint."],
  });

  {
    chk(3 + 1, 4); chk(-3 + 7, 4); chk(-(-1) + 7, 8);
  }
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the coordinates of the foot of the perpendicular from the point $(-1, 8)$ to the line $y = x + 1$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [3], wrong: "-1" }, { id: "y", input: "number", accepted: [4], wrong: "0" }],
    explanation: t`The perpendicular has gradient $-1$: $y - 8 = -(x + 1)$, so $y = -x + 7$. Solve with $y = x + 1$: $x + 1 = -x + 7$, $x = 3$, $y = 4$.`,
    hints: ["Write the equation of the perpendicular through the point.", "Solve it simultaneously with the given line."],
  });

  chk(grad([0, 0], [4, 2]) * grad([4, 2], [2, 6]), -1);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Triangle $ABC$ has vertices $A(0, 0)$, $B(4, 2)$ and $C(2, 6)$. Which statement is true?`,
    options: [
      [t`angle $B$ is a right angle`, t`Correct: gradient $AB = \frac{1}{2}$, gradient $BC = -2$, product $-1$.`],
      [t`angle $A$ is a right angle`, t`Gradient $AB = \frac{1}{2}$ and gradient $AC = 3$: product $\frac{3}{2}$.`],
      [t`angle $C$ is a right angle`, t`Gradient $AC = 3$ and gradient $BC = -2$: product $-6$.`],
      [t`there is no right angle`, t`Check the gradients at $B$: their product is $-1$.`],
    ],
    answer: "A",
    explanation: t`$m_{AB} = \frac{2}{4} = \frac{1}{2}$, $m_{BC} = \frac{6 - 2}{2 - 4} = -2$, $m_{AC} = 3$. Only $m_{AB}m_{BC} = -1$, so the right angle is at $B$.`,
    hints: ["Find the three gradients and test each pair."],
  });

  chk((-4 / 6) * (3 / 2), -1);
  b.tf({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The lines $4x + 6y = 1$ and $3x - 2y = 7$ are perpendicular.`,
    answer: true,
    explanation: t`True. The gradients are $-\frac{4}{6} = -\frac{2}{3}$ and $\frac{3}{2}$, and $-\frac{2}{3} \times \frac{3}{2} = -1$.`,
    hints: ["Rearrange each equation to find its gradient."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each line with the gradient of a line perpendicular to it.",
    pairs: [
      [t`$y = 5x$`, t`$-\frac{1}{5}$`],
      [t`$2y = x + 3$`, t`$-2$`],
      [t`$x + y = 4$`, t`$1$`],
      [t`$y = -\frac{1}{4}x + 2$`, t`$4$`],
    ],
    explanation: t`Gradients: $5$, $\frac{1}{2}$, $-1$, $-\frac{1}{4}$. Flip each and change its sign: $-\frac{1}{5}$, $-2$, $1$, $4$.`,
  });

  chk(2 * 0 - 3 * 0, 0); chk((2 / 3) * (-3 / 2), -1);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which is the equation of the line through the origin perpendicular to $2x - 3y = 6$?`,
    options: [
      [t`$3x + 2y = 0$`, t`Correct: gradient $-\frac{3}{2}$, and $(0, 0)$ satisfies it.`],
      [t`$2x - 3y = 0$`, t`This is parallel to the given line (gradient $\frac{2}{3}$).`],
      [t`$3x - 2y = 0$`, t`Gradient $\frac{3}{2}$: flipped but the sign was not changed.`],
      [t`$2x + 3y = 0$`, t`Gradient $-\frac{2}{3}$: the sign changed but the fraction was not flipped.`],
    ],
    answer: "A",
    explanation: t`$2x - 3y = 6$ has gradient $\frac{2}{3}$, so the perpendicular gradient is $-\frac{3}{2}$: $y = -\frac{3}{2}x$, that is $3x + 2y = 0$.`,
  });

  {
    const Pp = [-1, 2], Q = [3, 4], R = [5, 0], S = [1, -2];
    chk(grad(Pp, Q), 0.5); chk(grad(Q, R), -2); chk(grad(R, S), 0.5); chk(grad(S, Pp), -2);
    for (const [u, v] of [[Pp, Q], [Q, R], [R, S], [S, Pp]]) chk(dist(u, v), Math.sqrt(20));
  }
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`The points $P(-1, 2)$, $Q(3, 4)$, $R(5, 0)$ and $S(1, -2)$ are the vertices of a quadrilateral. Show that $PQRS$ is a square.`,
    points: [
      t`M1 finds the four gradients: $PQ$ and $RS$ are $\frac{1}{2}$, $QR$ and $SP$ are $-2$.`,
      t`A1 states that opposite sides are parallel and $\frac{1}{2} \times (-2) = -1$, so adjacent sides are perpendicular.`,
      t`M1 finds the side lengths, e.g. $PQ = \sqrt{4^2 + 2^2} = \sqrt{20}$ and $QR = \sqrt{2^2 + 4^2} = \sqrt{20}$.`,
      t`A1 concludes: a rectangle with equal adjacent sides is a square.`,
    ],
    modelAnswer: t`$$
m_{PQ} = \frac{4 - 2}{3 + 1} = \frac{1}{2}, \quad m_{QR} = \frac{0 - 4}{5 - 3} = -2, \quad m_{RS} = \frac{-2 - 0}{1 - 5} = \frac{1}{2}, \quad m_{SP} = \frac{2 + 2}{-1 - 1} = -2
$$

Opposite sides are parallel, and $\frac{1}{2} \times (-2) = -1$, so every angle is a right angle: $PQRS$ is a rectangle.

$$
PQ = \sqrt{16 + 4} = \sqrt{20}, \quad QR = \sqrt{4 + 16} = \sqrt{20}
$$

Adjacent sides are equal, so the rectangle $PQRS$ is a square.`,
    explanation: "A square needs right angles (gradients) and equal sides (lengths).",
    hints: ["Find all four gradients, then two adjacent lengths."],
  });

  {
    const A = [-2, 3], B = [4, 5], C = [6, -1];
    chk(grad(A, B) * grad(B, C), -1);
    same([(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], [2, 1]);
    chk(grad(A, C), -0.5); chk(2 * 2 - 3, 1);
    const area = shoelace([A, B, C]);
    chk(area, 0.5 * dist(A, B) * dist(B, C)); chk(area, 20);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`Triangle $ABC$ has vertices $A(-2, 3)$, $B(4, 5)$ and $C(6, -1)$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that angle $ABC$ is a right angle.`,
          points: [t`M1 finds $m_{AB} = \frac{1}{3}$ and $m_{BC} = -3$.`, t`A1 shows the product is $-1$ and concludes $AB \perp BC$.`],
          modelAnswer: t`$$
m_{AB} = \frac{5 - 3}{4 + 2} = \frac{1}{3}, \qquad m_{BC} = \frac{-1 - 5}{6 - 4} = -3
$$

$\frac{1}{3} \times (-3) = -1$, so $AB$ is perpendicular to $BC$ and angle $ABC = 90^\circ$.`,
          explanation: "Perpendicular arms have gradients with product −1." }),
        P.fib({ label: "(b)", marks: 3, stem: t`Find the equation of the perpendicular bisector of $AC$ in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [2], wrong: "-0.5" }, { id: "c", input: "number", accepted: [-3], wrong: "1" }],
          explanation: t`Midpoint of $AC$: $(2, 1)$. $m_{AC} = \frac{-4}{8} = -\frac{1}{2}$, so the bisector has gradient 2: $y - 1 = 2(x - 2)$, $y = 2x - 3$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the area of triangle $ABC$.`, value: area, unit: "units²", wrong: [40],
          explanation: t`Right angle at $B$: area $= \frac{1}{2} \times AB \times BC = \frac{1}{2}\sqrt{40}\sqrt{40} = 20$.` }),
      ],
      explanation: "Gradients prove the right angle; midpoint and perpendicular gradient give the bisector; the two perpendicular sides give the area. (The bisector of AC passes through B, since the midpoint of the hypotenuse is the centre of the circle through A, B and C.)",
      hints: [t`$AB = \sqrt{6^2 + 2^2}$ and $BC = \sqrt{2^2 + 6^2}$.`],
    });
  }

  {
    const A = [4, 0], B = [0, 6], C = [8, 7], D = [2, 3];
    chk(3 * A[0] + 2 * A[1], 12); chk(3 * B[0] + 2 * B[1], 12); chk(3 * D[0] + 2 * D[1], 12);
    chk(2 * C[0] - 3 * C[1] + 5, 0); chk(2 * D[0] - 3 * D[1] + 5, 0);
    chk((-3 / 2) * (2 / 3), -1);
    const cd = dist(C, D);
    chk(cd, Math.sqrt(52)); same(simplifySurd(52).tex, "2\\sqrt{13}");
    const area = shoelace([A, B, C]);
    chk(area, 0.5 * dist(A, B) * cd); chk(area, 26);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The line $l_1$ has equation $3x + 2y = 12$ and meets the $x$-axis at $A$ and the $y$-axis at $B$. The line $l_2$ passes through $C(8, 7)$ and is perpendicular to $l_1$; it meets $l_1$ at $D$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the coordinates of $A$ and $B$.`, template: "A({{blank:ax}}, 0), B(0, {{blank:by}})",
          blanks: [{ id: "ax", input: "number", accepted: [4], wrong: "6" }, { id: "by", input: "number", accepted: [6], wrong: "4" }],
          explanation: t`$y = 0$: $3x = 12$, $x = 4$. $x = 0$: $2y = 12$, $y = 6$.` }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the equation of $l_2$ in the form $2x + by + c = 0$.`, template: "b = {{blank:b}}, c = {{blank:c}}",
          blanks: [{ id: "b", input: "number", accepted: [-3], wrong: "3" }, { id: "c", input: "number", accepted: [5], wrong: "-5" }],
          explanation: t`$l_1$ has gradient $-\frac{3}{2}$, so $l_2$ has gradient $\frac{2}{3}$: $y - 7 = \frac{2}{3}(x - 8)$, $3y - 21 = 2x - 16$, so $2x - 3y + 5 = 0$.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`Find the coordinates of $D$.`, template: "D({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [2], wrong: "8" }, { id: "y", input: "number", accepted: [3], wrong: "7" }],
          explanation: t`Solve $3x + 2y = 12$ and $2x - 3y = -5$: multiply to get $9x + 6y = 36$ and $4x - 6y = -10$; add: $13x = 26$, so $x = 2$ and $y = 3$.` }),
        P.fib({ label: "(d)", marks: 1, stem: t`Find the exact length of $CD$ in the form $k\sqrt{13}$.`, template: "k = {{blank:k}}",
          blanks: [{ id: "k", input: "number", accepted: [2], wrong: "4" }],
          explanation: t`$CD = \sqrt{6^2 + 4^2} = \sqrt{52} = 2\sqrt{13}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Hence find the area of triangle $ABC$.`, value: area, unit: "units²", wrong: [52],
          explanation: t`$CD$ is the perpendicular height from $C$ to $AB$, and $AB = \sqrt{16 + 36} = \sqrt{52}$. Area $= \frac{1}{2} \times \sqrt{52} \times \sqrt{52} = 26$.` }),
      ],
      explanation: "The foot of the perpendicular D gives the perpendicular height CD of triangle ABC on the base AB.",
      hints: [t`The gradient of $l_1$ is $-\frac{3}{2}$.`, "For (c), solve the two line equations simultaneously.", "For (e), use ½ × base × perpendicular height."],
    });
  }

  b.card("FACT", "Parallel lines", "Equal gradients: m₁ = m₂.");
  b.card("FACT", "Perpendicular lines", t`$m_1m_2 = -1$, so $m_2 = -\dfrac{1}{m_1}$ (flip and change sign).`);
  b.card("DEFINITION", "Normal to a line", "A line perpendicular to the given line at a point on it.");
  b.card("DEFINITION", "Perpendicular bisector of AB", "The line through the midpoint of AB perpendicular to AB; every point on it is equidistant from A and B.");
  b.card("CONCEPT", "Foot of the perpendicular from P to a line", "Write the perpendicular through P, solve it with the line; the shortest distance is P to the foot.");
  b.card("CONCEPT", t`Lines parallel / perpendicular to $ax + by = c$`, t`Parallel: $ax + by = k$. Perpendicular: $bx - ay = k$.`);
  b.card("CONCEPT", "Proving a right angle at B", t`Show $m_{AB} \times m_{BC} = -1$.`);
  b.card("FACT", "Diagonals of a rhombus", "They bisect each other at right angles; area = ½ × d₁ × d₂.");
  b.card("FACT", "Horizontal and vertical lines", "Perpendicular to each other; the product rule does not apply (a vertical line has no gradient).");
});
