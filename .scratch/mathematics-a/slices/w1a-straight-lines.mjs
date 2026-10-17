// W1a: amaths.coordinate.straight-lines (ZIMSEC Pure F5 incl. perpendicular distance; Cambridge P1 1.3).
import { concept, P, t, chk, ZP } from "../lib.mjs";

const grad = ([x1, y1], [x2, y2]) => (y2 - y1) / (x2 - x1);
const dist = ([x1, y1], [x2, y2]) => Math.hypot(x2 - x1, y2 - y1);
const pdist = ([x, y], a, bb, c) => Math.abs(a * x + bb * y + c) / Math.hypot(a, bb);

concept("amaths.coordinate.straight-lines", { file: "coordinate/straight-lines", keyPrefix: "coordinate.straight-lines" }, (b) => {
  chk(grad([1, 2], [4, 11]), 3);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find the gradient of the line through $(1, 2)$ and $(4, 11)$.`,
    options: [
      [t`$3$`, t`Correct: $\frac{11 - 2}{4 - 1} = \frac{9}{3}$.`],
      [t`$\frac{1}{3}$`, "The fraction is upside down: change in y over change in x."],
      [t`$-3$`, "The subtraction was done in different orders on top and bottom."],
      [t`$\frac{13}{5}$`, "The coordinates have been added instead of subtracted."],
    ],
    answer: "A",
    explanation: t`$m = \dfrac{y_{2} - y_{1}}{x_{2} - x_{1}} = \dfrac{11 - 2}{4 - 1} = 3$.`,
  });

  chk(dist([-3, 4], [5, -2]), 10);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the distance between the points $(-3, 4)$ and $(5, -2)$.`,
    value: 10, wrong: [2.83, 100],
    explanation: t`$\sqrt{(5 - (-3))^{2} + (-2 - 4)^{2}} = \sqrt{64 + 36} = \sqrt{100} = 10$.`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the midpoint of the line segment joining $(-4, 7)$ and $(6, -1)$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [1], wrong: 5 }, { id: "y", input: "number", accepted: [3], wrong: 4 }],
    explanation: t`$\left(\dfrac{-4 + 6}{2}, \dfrac{7 + (-1)}{2}\right) = (1, 3)$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`What is the gradient of the line $3x + 4y - 12 = 0$?`,
    options: [
      [t`$-\frac{3}{4}$`, t`Correct: $y = -\frac{3}{4}x + 3$.`],
      [t`$3$`, "The coefficient of x is not the gradient until y is the subject."],
      [t`$\frac{3}{4}$`, "Moving 3x to the other side makes it negative."],
      [t`$-\frac{4}{3}$`, "This is the gradient of a perpendicular line."],
    ],
    answer: "A",
    explanation: t`Make $y$ the subject: $4y = -3x + 12$, so $y = -\frac{3}{4}x + 3$ and the gradient is $-\frac{3}{4}$.`,
  });

  chk(4 * (-1 / 4), -1);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`What is the gradient of any line perpendicular to $y = 4x - 3$?`,
    options: [
      [t`$-\frac{1}{4}$`, t`Correct: $4 \times \left(-\frac{1}{4}\right) = -1$.`],
      [t`$\frac{1}{4}$`, "The sign must change as well."],
      [t`$-4$`, "Only the sign has changed; the reciprocal is also needed."],
      [t`$4$`, "That is the gradient of a parallel line."],
    ],
    answer: "A",
    explanation: t`Perpendicular gradients multiply to $-1$, so the required gradient is $-\frac{1}{4}$.`,
  });

  // through (2, −3) parallel to 4x − 2y + 5 = 0 (gradient 2): y = 2x − 7
  chk(2 * 2 - 7, -3);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the line through $(2, -3)$ parallel to $4x - 2y + 5 = 0$, in the form $y = mx + c$.`,
    template: "m = {{blank:m}}, c = {{blank:c}}",
    blanks: [{ id: "m", input: "number", accepted: [2], wrong: 4 }, { id: "c", input: "number", accepted: [-7], wrong: -11 }],
    explanation: t`$4x - 2y + 5 = 0$ gives $y = 2x + \frac{5}{2}$, gradient 2. Then $y + 3 = 2(x - 2)$, so $y = 2x - 7$.`,
    hints: ["Rearrange the given line to find its gradient.", "Parallel lines have equal gradients."],
  });

  // through (−1, 4) perpendicular to 3x + 2y = 6: 2x − 3y + 14 = 0
  chk(2 * -1 - 3 * 4 + 14, 0);
  chk((-3 / 2) * (2 / 3), -1);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the line through $(-1, 4)$ perpendicular to $3x + 2y = 6$. Write it as $2x + by + c = 0$.`,
    template: "b = {{blank:b}}, c = {{blank:c}}",
    blanks: [{ id: "b", input: "number", accepted: [-3], wrong: 3 }, { id: "c", input: "number", accepted: [14], wrong: -10 }],
    explanation: t`$3x + 2y = 6$ has gradient $-\frac{3}{2}$, so the perpendicular gradient is $\frac{2}{3}$. $y - 4 = \frac{2}{3}(x + 1)$ gives $3y - 12 = 2x + 2$, i.e. $2x - 3y + 14 = 0$.`,
    hints: ["Find the gradient of 3x + 2y = 6.", "Use y − y₁ = m(x − x₁), then clear fractions."],
  });

  // perpendicular bisector of A(−3, 2), B(5, 6): y = −2x + 6
  chk(-2 * 1 + 6, 4);
  chk(grad([-3, 2], [5, 6]) * -2, -1);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the perpendicular bisector of $A(-3, 2)$ and $B(5, 6)$, in the form $y = mx + c$.`,
    template: "m = {{blank:m}}, c = {{blank:c}}",
    blanks: [{ id: "m", input: "number", accepted: [-2], wrong: 0.5 }, { id: "c", input: "number", accepted: [6], wrong: 3.5 }],
    explanation: t`Midpoint $(1, 4)$. Gradient of $AB = \frac{4}{8} = \frac{1}{2}$, so the perpendicular gradient is $-2$. $y - 4 = -2(x - 1)$ gives $y = -2x + 6$.`,
    hints: ["The perpendicular bisector passes through the midpoint.", "Its gradient is the negative reciprocal of the gradient of AB."],
  });

  chk(2 * 4 + -1, 7);
  chk(4 - 3 * -1, 7);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the point of intersection of the lines $2x + y = 7$ and $x - 3y = 7$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [{ id: "x", input: "number", accepted: [4], wrong: 2 }, { id: "y", input: "number", accepted: [-1], wrong: 3 }],
    explanation: t`From the first, $y = 7 - 2x$. Then $x - 3(7 - 2x) = 7$, so $7x = 28$, $x = 4$ and $y = -1$.`,
    hints: ["Solve the two equations simultaneously."],
  });

  chk(pdist([2, -1], 5, -12, 4), 2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZP,
    stem: t`Find the perpendicular distance from the point $(2, -1)$ to the line $5x - 12y + 4 = 0$.`,
    value: 2, wrong: [26, 0.462],
    explanation: t`$d = \dfrac{|5(2) - 12(-1) + 4|}{\sqrt{5^{2} + 12^{2}}} = \dfrac{26}{13} = 2$.`,
    hints: [t`$d = \dfrac{|ax_{1} + by_{1} + c|}{\sqrt{a^{2} + b^{2}}}$.`],
  });

  chk(3 * 2 + 4 * -1, 2);
  chk(pdist([2, -1], 3, 4, -17), 3);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`Find the distance between the parallel lines $3x + 4y = 2$ and $3x + 4y = 17$.`,
    value: 3, wrong: [15, 19],
    explanation: t`The point $(2, -1)$ lies on $3x + 4y = 2$. Its distance from $3x + 4y - 17 = 0$ is $\dfrac{|6 - 4 - 17|}{5} = \dfrac{15}{5} = 3$. (In general the distance is $\frac{|17 - 2|}{\sqrt{3^{2} + 4^{2}}}$.)`,
    hints: ["Choose any point on the first line.", "Use the perpendicular distance formula."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The lines $y = 3x + 1$ and $6x - 2y + 5 = 0$ are parallel.`,
    answer: true,
    explanation: t`True. $6x - 2y + 5 = 0$ gives $y = 3x + \frac{5}{2}$, gradient 3, the same as $y = 3x + 1$ (and different intercepts, so they are distinct parallel lines).`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Two lines with gradients $\frac{2}{3}$ and $\frac{3}{2}$ are perpendicular.`,
    answer: false,
    explanation: t`False. $\frac{2}{3} \times \frac{3}{2} = 1$, not $-1$. A line perpendicular to gradient $\frac{2}{3}$ has gradient $-\frac{3}{2}$.`,
  });

  chk(0.5 * 8 * 4, 16);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the area of the triangle enclosed by the line $x + 2y = 8$ and the coordinate axes.`,
    value: 16, wrong: [32, 8],
    explanation: t`The line meets the axes at $(8, 0)$ and $(0, 4)$. Area $= \frac{1}{2} \times 8 \times 4 = 16$ square units.`,
    hints: ["Find both intercepts."],
  });

  chk(grad([1, 2], [5, 4]) * grad([5, 4], [7, 0]), -1);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The points $A(1, 2)$, $B(5, 4)$ and $C(k, 0)$ are such that $AB$ is perpendicular to $BC$. Find $k$.`,
    options: [
      [t`$k = 7$`, t`Correct: gradient $BC = \frac{0 - 4}{k - 5} = -2$ gives $k - 5 = 2$.`],
      [t`$k = 3$`, t`Then gradient $BC = \frac{-4}{-2} = 2$, which is not $-2$.`],
      [t`$k = 13$`, t`This uses gradient $BC = -\frac{1}{2}$, the negative of $AB$'s gradient, not its negative reciprocal.`],
      [t`$k = 9$`, t`This makes gradient $BC = -1$.`],
    ],
    answer: "A",
    explanation: t`Gradient $AB = \frac{2}{4} = \frac{1}{2}$, so gradient $BC = -2$: $\frac{-4}{k - 5} = -2$, $k - 5 = 2$, $k = 7$.`,
    hints: ["Find the gradient that BC must have."],
  });

  chk(dist([4.5, 3], [1, 1]), dist([4.5, 3], [5, 7]));
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The point $(k, 3)$ is the same distance from $(1, 1)$ as from $(5, 7)$. Find $k$.`,
    options: [
      [t`$k = 4.5$`, t`Correct: the point lies on the perpendicular bisector $y - 4 = -\frac{2}{3}(x - 3)$.`],
      [t`$k = 3$`, "That is the x-coordinate of the midpoint, but the midpoint has y = 4, not 3."],
      [t`$k = 1.5$`, t`This comes from using gradient $+\frac{2}{3}$ instead of $-\frac{2}{3}$.`],
      [t`$k = 2.5$`, "Check: (2.5, 3) is √6.25 from (1, 1) but √22.25 from (5, 7)."],
    ],
    answer: "A",
    explanation: t`Equidistant points lie on the perpendicular bisector: midpoint $(3, 4)$, gradient $-\frac{2}{3}$. At $y = 3$: $-1 = -\frac{2}{3}(k - 3)$, so $k - 3 = 1.5$ and $k = 4.5$. Check: both distances are $\sqrt{16.25}$.`,
    hints: ["Equidistant from two points means on their perpendicular bisector.", "Or set the two squared distances equal."],
  });

  chk(grad([1, 1], [5, 3]) * grad([5, 3], [3, 7]), -1);
  chk(dist([1, 1], [5, 3]), dist([5, 3], [3, 7]));
  b.proof({
    d: 3, skill: "ANALYSIS", marks: 3, calculator: false,
    stem: t`The points $P(1, 1)$, $Q(5, 3)$ and $R(3, 7)$ are vertices of a triangle. Show that the triangle is right-angled at $Q$ and isosceles.`,
    points: [
      t`M1 finds gradients $PQ = \frac{2}{4} = \frac{1}{2}$ and $QR = \frac{4}{-2} = -2$`,
      t`A1 product $\frac{1}{2} \times (-2) = -1$, so $PQ \perp QR$: right angle at $Q$`,
      t`B1 $PQ = QR = \sqrt{20}$, so the triangle is isosceles`,
    ],
    modelAnswer: [
      t`Gradient $PQ = \dfrac{3 - 1}{5 - 1} = \dfrac{1}{2}$ and gradient $QR = \dfrac{7 - 3}{3 - 5} = -2$.`,
      "",
      t`Since $\frac{1}{2} \times (-2) = -1$, $PQ$ is perpendicular to $QR$, so angle $PQR = 90^{\circ}$.`,
      "",
      t`$PQ = \sqrt{4^{2} + 2^{2}} = \sqrt{20}$ and $QR = \sqrt{(-2)^{2} + 4^{2}} = \sqrt{20}$, so $PQ = QR$ and the triangle is isosceles.`,
    ].join("\n"),
    explanation: "Perpendicular sides have gradients multiplying to −1; equal lengths come from the distance formula.",
    hints: ["Compare the gradients of the two sides meeting at Q."],
  });

  // A(−1, 3), B(5, 1): perpendicular bisector y = 3x − 4; meets y = x + 2 at C(3, 5)
  chk(3 * 2 - 4, 2);
  chk(grad([-1, 3], [5, 1]) * 3, -1);
  chk(3 * 3 - 4, 3 + 2);
  const ac = dist([-1, 3], [3, 5]);
  chk(ac, dist([5, 1], [3, 5]), 1e-12);
  b.struct({
    examStyle: true, d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The points $A(-1, 3)$ and $B(5, 1)$ are given.`,
    parts: [
      P.fib({
        label: "(a)", marks: 2, stem: t`Find the equation of the perpendicular bisector of $AB$ in the form $y = mx + c$.`,
        template: "m = {{blank:m}}, c = {{blank:c}}",
        blanks: [{ id: "m", input: "number", accepted: [3], wrong: -3 }, { id: "c", input: "number", accepted: [-4], wrong: 8 }],
        explanation: t`Midpoint $(2, 2)$; gradient $AB = \frac{-2}{6} = -\frac{1}{3}$, so the perpendicular gradient is 3. $y - 2 = 3(x - 2)$, i.e. $y = 3x - 4$.`,
      }),
      P.fib({
        label: "(b)", marks: 2, stem: t`The perpendicular bisector meets the line $y = x + 2$ at $C$. Find the coordinates of $C$.`,
        template: "({{blank:x}}, {{blank:y}})",
        blanks: [{ id: "x", input: "number", accepted: [3], wrong: 1 }, { id: "y", input: "number", accepted: [5], wrong: 3 }],
        explanation: t`$3x - 4 = x + 2$ gives $x = 3$, $y = 5$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find the length AC, to 3 significant figures.",
        value: ac, wrong: [20],
        explanation: t`$AC = \sqrt{4^{2} + 2^{2}} = \sqrt{20} = 4.47$. ($BC$ is also $\sqrt{20}$, as expected for a point on the perpendicular bisector.)`,
      }),
    ],
    explanation: t`The perpendicular bisector $y = 3x - 4$ meets $y = x + 2$ at $C(3, 5)$, which is equidistant from $A$ and $B$: $AC = BC = \sqrt{20} \approx 4.47$.`,
    hints: ["Midpoint and negative reciprocal gradient.", "Solve the two line equations simultaneously."],
  });

  // L: 4x − 3y + 12 = 0: A(−3, 0), B(0, 4); AB = 5; d(O) = 12/5; area 6
  chk(dist([-3, 0], [0, 4]), 5);
  chk(pdist([0, 0], 4, -3, 12), 2.4, 1e-12);
  chk(0.5 * 5 * 2.4, 6, 1e-12);
  b.struct({
    examStyle: true, d: 5, skill: "ANALYSIS", calculator: false, applies: ZP,
    stem: t`The line $L$ has equation $4x - 3y + 12 = 0$. It meets the $x$-axis at $A$ and the $y$-axis at $B$; $O$ is the origin.`,
    parts: [
      P.fib({
        label: "(a)", marks: 1, stem: "Find the coordinates of A and B.",
        template: "A({{blank:a}}, 0), B(0, {{blank:b}})",
        blanks: [{ id: "a", input: "number", accepted: [-3], wrong: 3 }, { id: "b", input: "number", accepted: [4], wrong: -4 }],
        explanation: t`$y = 0$: $4x = -12$, $x = -3$. $x = 0$: $-3y = -12$, $y = 4$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Find the length AB.",
        value: 5, wrong: [7],
        explanation: t`$\sqrt{3^{2} + 4^{2}} = 5$.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Find the perpendicular distance from O to L.",
        value: 2.4, wrong: [12, 2.18],
        explanation: t`$\dfrac{|4(0) - 3(0) + 12|}{\sqrt{16 + 9}} = \dfrac{12}{5} = 2.4$.`,
      }),
      P.num({
        label: "(d)", marks: 1, stem: "Find the area of triangle OAB.",
        value: 6, wrong: [12],
        explanation: t`$\frac{1}{2} \times 3 \times 4 = 6$.`,
      }),
      P.proof({
        label: "(e)", marks: 1, stem: "Use your answers to (b) and (d) to check your answer to (c).",
        points: [t`B1 area $= \frac{1}{2} \times AB \times d$, so $6 = \frac{1}{2} \times 5 \times d$, giving $d = 2.4$`],
        modelAnswer: t`Taking $AB$ as the base, the height is the perpendicular distance $d$ from $O$ to $L$: $6 = \frac{1}{2} \times 5 \times d$, so $d = \frac{12}{5} = 2.4$, agreeing with (c).`,
      }),
    ],
    explanation: t`$A(-3, 0)$, $B(0, 4)$, $AB = 5$, area $6$, so the height from $O$ to $AB$ is $\frac{2 \times 6}{5} = 2.4$, matching the formula $\frac{|c|}{\sqrt{a^{2} + b^{2}}} = \frac{12}{5}$.`,
    hints: ["Intercepts: put y = 0, then x = 0.", "Area = ½ × base × perpendicular height."],
  });

  b.card("FORMULA", "Gradient, midpoint and distance", t`$m = \frac{y_{2} - y_{1}}{x_{2} - x_{1}}$; midpoint $\left(\frac{x_{1} + x_{2}}{2}, \frac{y_{1} + y_{2}}{2}\right)$; $d = \sqrt{(x_{2} - x_{1})^{2} + (y_{2} - y_{1})^{2}}$.`);
  b.card("FORMULA", "Point–gradient form of a line", t`$y - y_{1} = m(x - x_{1})$`);
  b.card("FACT", "Parallel and perpendicular gradients", t`Parallel: $m_{1} = m_{2}$. Perpendicular: $m_{1}m_{2} = -1$.`);
  b.card("CONCEPT", "Perpendicular bisector of AB", "The line through the midpoint of AB with gradient the negative reciprocal of the gradient of AB; its points are equidistant from A and B.");
  b.card("CONCEPT", "Gradient of ax + by + c = 0", t`Rearrange to $y = -\frac{a}{b}x - \frac{c}{b}$: the gradient is $-\frac{a}{b}$.`);
  b.card("FORMULA", "Perpendicular distance from a point to a line", t`$d = \dfrac{|ax_{1} + by_{1} + c|}{\sqrt{a^{2} + b^{2}}}$`, undefined, { applies: ZP });
  b.card("CONCEPT", "Finding where two lines meet", "Solve their equations simultaneously; the solution (x, y) is the point of intersection.");
  b.card("FACT", "Form ax + by + c = 0 in answers", "Usually expected with integer a, b, c: multiply out any fractions.");
});
