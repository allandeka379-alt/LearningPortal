// W2a: amath.circle.line-tangents (Cambridge only)
import { concept, P, t, chk, same, quad, sfStr } from "../lib.mjs";

const on = ([a, b], [x, y]) => (x - a) ** 2 + (y - b) ** 2;

concept("amath.circle.line-tangents", { file: "circle/line-tangents", keyPrefix: "circle.line-tangents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The tangent to a circle with centre $C$ at the point $P$ is always perpendicular to which line?`,
    options: [
      [t`the radius $CP$`, "Correct: a tangent meets the radius at the point of contact at right angles."],
      ["the x-axis", "Only tangents at the top and bottom of a circle are parallel to the x-axis; none are perpendicular to it in general."],
      ["any chord through P", "Only the chord through the centre (the diameter) is perpendicular to the tangent at P."],
      [t`the line from $P$ to the origin`, "That holds only when the centre is the origin."],
    ],
    answer: "A",
    explanation: "Tangent ⊥ radius at the point of contact. This gives the tangent's gradient as the negative reciprocal of the radius's gradient.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A line is substituted into the equation of a circle and the resulting quadratic has discriminant zero. What does this show?",
    options: [
      ["the line is a tangent to the circle", "Correct: equal roots mean exactly one common point."],
      ["the line meets the circle at two points", "Two points need a positive discriminant."],
      ["the line does not meet the circle", "No intersection needs a negative discriminant."],
      ["the line passes through the centre", "A line through the centre meets the circle twice (a diameter)."],
    ],
    answer: "A",
    explanation: "Discriminant zero gives one repeated root: the line and the circle share exactly one point, so the line is a tangent.",
  });

  chk(on([0, 0], [0, 7]), 49);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`How many points do the line $y = 7$ and the circle $x^2 + y^2 = 49$ have in common?`,
    value: 1, wrong: [2, 0],
    explanation: t`$x^2 + 49 = 49$ gives $x^2 = 0$, a repeated root: the line touches the circle at $(0, 7)$, the top of the circle of radius 7.`,
  });

  same(quad.roots(1, -1, -6), [-2, 3]);
  for (const x of [-2, 3]) chk(on([0, 0], [x, x - 1]), 13);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the points where the line $y = x - 1$ meets the circle $x^2 + y^2 = 13$. Give the point with the smaller $x$-coordinate first.`,
    template: "({{blank:x1}}, {{blank:y1}}) and ({{blank:x2}}, {{blank:y2}})",
    blanks: [
      { id: "x1", input: "number", accepted: [-2], wrong: "-3" },
      { id: "y1", input: "number", accepted: [-3], wrong: "3" },
      { id: "x2", input: "number", accepted: [3], wrong: "2" },
      { id: "y2", input: "number", accepted: [2], wrong: "-2" },
    ],
    explanation: t`$x^2 + (x - 1)^2 = 13$ gives $2x^2 - 2x - 12 = 0$, so $x^2 - x - 6 = 0$ and $(x - 3)(x + 2) = 0$. From the line: $(-2, -3)$ and $(3, 2)$.`,
    hints: [t`Expand $(x - 1)^2$ carefully.`, "Use the line to find each y."],
  });

  chk(on([1, -2], [4, 2]), 25);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The point $(4, 2)$ lies on the circle $(x - 1)^2 + (y + 2)^2 = 25$. Find the gradient of the tangent at this point. You may type a fraction.`,
    value: -0.75, wrong: [4 / 3, 0.75],
    explanation: t`Centre $(1, -2)$. Radius gradient $= \frac{2 - (-2)}{4 - 1} = \frac{4}{3}$, so the tangent gradient is $-\frac{3}{4}$.`,
    hints: ["The tangent is perpendicular to the radius."],
  });

  chk(on([0, 0], [3, 1]), 10); chk(-3 * 3 + 10, 1);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the equation of the tangent to the circle $x^2 + y^2 = 10$ at the point $(3, 1)$, in the form $y = mx + c$.`,
    template: "m = {{blank:m}}, c = {{blank:c}}",
    blanks: [{ id: "m", input: "number", accepted: [-3], wrong: "0.333" }, { id: "c", input: "number", accepted: [10], wrong: "0" }],
    explanation: t`The radius from $(0, 0)$ to $(3, 1)$ has gradient $\frac{1}{3}$, so the tangent has gradient $-3$: $y - 1 = -3(x - 3)$, $y = -3x + 10$.`,
    hints: ["Find the gradient of the radius to (3, 1) first."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The line $x = 5$ is a tangent to the circle $x^2 + y^2 = 25$.`,
    answer: true,
    explanation: t`True. Substituting $x = 5$ gives $y^2 = 0$, a single point $(5, 0)$. The line is vertical and the radius to $(5, 0)$ is horizontal, so they are perpendicular.`,
  });

  chk(quad.disc(1, 6, 14), -20);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Describe how the line $y = x + 6$ and the circle $x^2 + y^2 = 8$ are related.`,
    options: [
      ["the line does not meet the circle", t`Correct: $x^2 + 6x + 14 = 0$ has discriminant $36 - 56 < 0$.`],
      ["the line is a tangent to the circle", "A tangent needs a zero discriminant; here it is −20."],
      ["the line cuts the circle at two points", "Two points need a positive discriminant."],
      ["the line passes through the centre", t`At $x = 0$ the line has $y = 6$, so it misses $(0, 0)$.`],
    ],
    answer: "A",
    explanation: t`$x^2 + (x + 6)^2 = 8$ gives $2x^2 + 12x + 28 = 0$, that is $x^2 + 6x + 14 = 0$, with discriminant $36 - 56 = -20 < 0$. There are no common points.`,
    hints: ["Substitute and look at the discriminant."],
  });

  for (const k of [-6, 6]) chk(quad.disc(2, 2 * k, k * k - 18), 0);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the values of $k$ for which the line $y = x + k$ is a tangent to the circle $x^2 + y^2 = 18$. Give them in ascending order.`,
    template: "k = {{blank:a}} or k = {{blank:b}}",
    blanks: [{ id: "a", input: "number", accepted: [-6], wrong: "-3" }, { id: "b", input: "number", accepted: [6], wrong: "3" }],
    explanation: t`$x^2 + (x + k)^2 = 18$ gives $2x^2 + 2kx + k^2 - 18 = 0$. Tangent: $4k^2 - 8(k^2 - 18) = 0$, so $144 - 4k^2 = 0$, $k^2 = 36$ and $k = \pm 6$.`,
    hints: ["Substitute and collect terms.", "Set the discriminant to zero."],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The line $y = 3$ cuts the circle $x^2 + y^2 = 25$ at $A$ and $B$. Find the length of the chord $AB$.`,
    value: 8, wrong: [4, 6],
    explanation: t`$x^2 + 9 = 25$, so $x = \pm 4$: $A(-4, 3)$ and $B(4, 3)$. $AB = 8$.`,
    hints: [t`Substitute $y = 3$ and remember both square roots.`],
  });

  chk(on([1, -1], [9, 5]), 100); chk(Math.sqrt(100 - 36), 8);
  b.num({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`A tangent is drawn from the point $P(9, 5)$ to the circle $(x - 1)^2 + (y + 1)^2 = 36$, touching it at $T$. Find the length $PT$.`,
    value: 8, wrong: [10, 4],
    explanation: t`Centre $C(1, -1)$. $CP^2 = 8^2 + 6^2 = 100$. Angle $CTP = 90^\circ$, so $PT^2 = 100 - 36 = 64$ and $PT = 8$. ($CP = 10$; $CP - r = 4$ is not the tangent length.)`,
    hints: ["Triangle CTP has a right angle at T."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A circle has centre $C$ and radius $r$; $d$ is the shortest distance from $C$ to a straight line. Match each condition with what the line does.`,
    pairs: [
      [t`$d < r$`, "cuts the circle at two points"],
      [t`$d = r$`, "touches the circle (tangent)"],
      [t`$d > r$`, "does not meet the circle"],
      [t`$d = 0$`, "passes through the centre (contains a diameter)"],
    ],
    explanation: "Compare the distance from the centre to the line with the radius: closer than r means two points, exactly r a tangent, further than r no intersection.",
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A circle has centre $(2, 3)$ and radius 4. How does the line $x = 7$ relate to it?`,
    options: [
      ["it does not meet the circle", t`Correct: the distance from the centre is $7 - 2 = 5 > 4$.`],
      ["it is a tangent to the circle", "A tangent would be at distance 4, i.e. x = 6."],
      ["it cuts the circle at two points", "That needs a distance less than 4."],
      ["it is a line of symmetry", "A line of symmetry passes through the centre, x = 2."],
    ],
    answer: "A",
    explanation: t`The shortest distance from $(2, 3)$ to the vertical line $x = 7$ is $5$, which is greater than the radius 4, so the line misses the circle.`,
    hints: ["The distance from a point to a vertical line is the difference in x-coordinates."],
  });

  {
    chk(quad.disc(5, -40, 80), 0);
    same(quad.roots(1, -8, 16), [4]);
    chk(4 * 4 + 2 * 2 - 4 * 4 - 2 * 2, 0); chk(2 * 4 + 2, 10);
    for (const x of [0, 1.5, 7]) { const y = 10 - 2 * x; chk(x * x + y * y - 4 * x - 2 * y, 5 * (x - 4) ** 2); }
  }
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that the line $2x + y = 10$ is a tangent to the circle $x^2 + y^2 - 4x - 2y = 0$, and find the point of contact.`,
    points: [
      t`M1 substitutes $y = 10 - 2x$ into the circle's equation.`,
      t`A1 simplifies to $5x^2 - 40x + 80 = 0$ (or $x^2 - 8x + 16 = 0$).`,
      t`M1 shows equal roots: discriminant $64 - 64 = 0$ or $(x - 4)^2 = 0$, so the line is a tangent.`,
      t`A1 finds the point of contact $(4, 2)$.`,
    ],
    modelAnswer: t`$$
x^2 + (10 - 2x)^2 - 4x - 2(10 - 2x) = 0
$$

$$
x^2 + 100 - 40x + 4x^2 - 4x - 20 + 4x = 0 \Rightarrow 5x^2 - 40x + 80 = 0
$$

$$
x^2 - 8x + 16 = 0 \Rightarrow (x - 4)^2 = 0
$$

Equal roots, so the line touches the circle: it is a tangent. $x = 4$ gives $y = 10 - 8 = 2$, so the point of contact is $(4, 2)$.`,
    explanation: "A repeated root means exactly one common point.",
    hints: ["Make y the subject of the line and substitute."],
  });

  {
    const c = [3, 2];
    const rts = quad.roots(1, -2, -2);
    chk(rts[0], 1 - Math.sqrt(3)); chk(rts[1], 1 + Math.sqrt(3));
    for (const x of rts) chk(on(c, [x, 2 * x + 1]), 20);
    const len = Math.hypot(rts[1] - rts[0], 2 * (rts[1] - rts[0]));
    chk(len, Math.sqrt(60)); chk(len, 2 * Math.sqrt(15));
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`The line $y = 2x + 1$ meets the circle $(x - 3)^2 + (y - 2)^2 = 20$ at the points $A$ and $B$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the $x$-coordinates of $A$ and $B$ satisfy $x^2 - 2x - 2 = 0$.`,
          points: [t`M1 substitutes: $(x - 3)^2 + (2x - 1)^2 = 20$.`, t`A1 expands to $5x^2 - 10x - 10 = 0$ and divides by 5.`],
          modelAnswer: t`$$
(x - 3)^2 + (2x + 1 - 2)^2 = 20
$$

$$
x^2 - 6x + 9 + 4x^2 - 4x + 1 = 20 \Rightarrow 5x^2 - 10x - 10 = 0
$$

$$
x^2 - 2x - 2 = 0
$$`,
          explanation: "Substitute the line into the circle." }),
        P.fib({ label: "(b)", marks: 2, stem: t`Find the exact $x$-coordinates of $A$ and $B$ in the form $p \pm \sqrt{q}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [1], wrong: "2" }, { id: "q", input: "number", accepted: [3], wrong: "12" }],
          explanation: t`$x = \dfrac{2 \pm \sqrt{4 + 8}}{2} = \dfrac{2 \pm 2\sqrt{3}}{2} = 1 \pm \sqrt{3}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the length of $AB$, correct to 3 significant figures.`, value: len, wrong: [sfStr(2 * Math.sqrt(3))],
          explanation: t`The $x$-coordinates differ by $2\sqrt{3}$; on a line of gradient 2 the $y$-coordinates differ by $4\sqrt{3}$. $AB = \sqrt{12 + 48} = \sqrt{60} = 2\sqrt{15} = ${sfStr(len)}$ (3 s.f.).` }),
      ],
      explanation: "Substitute the line into the circle, solve the quadratic exactly, then use the distance formula.",
      hints: [t`$2x + 1 - 2 = 2x - 1$.`, t`The change in $y$ is twice the change in $x$.`],
    });
  }

  {
    const C = [3, -2];
    const r2 = 9 + 4 - 8;
    chk(r2, 5);
    chk(on(C, [4, 0]), 5);
    chk((0 - -2) / (4 - 3), 2);
    chk(-0.5 * 4 + 2, 0);
    const area = 0.5 * Math.sqrt(5) * Math.hypot(4, 2);
    chk(area, 5);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The circle $x^2 + y^2 - 6x + 4y + 8 = 0$ has centre $C$. The point $A(4, 0)$ lies on the circle.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the coordinates of $C$ and the value of $r^2$, where $r$ is the radius.`, template: "C({{blank:a}}, {{blank:b}}), r² = {{blank:r2}}",
          blanks: [{ id: "a", input: "number", accepted: [3], wrong: "-3" }, { id: "b", input: "number", accepted: [-2], wrong: "2" }, { id: "r2", input: "number", accepted: [5], wrong: "21" }],
          explanation: t`$(x - 3)^2 - 9 + (y + 2)^2 - 4 + 8 = 0$, so $(x - 3)^2 + (y + 2)^2 = 5$.` }),
        P.fib({ label: "(b)", marks: 3, stem: t`Find the equation of the tangent to the circle at $A$, in the form $y = mx + c$.`, template: "m = {{blank:m}}, c = {{blank:c}}",
          blanks: [{ id: "m", input: "number", accepted: [-0.5], wrong: "2" }, { id: "c", input: "number", accepted: [2], wrong: "-8" }],
          explanation: t`Gradient $CA = \frac{0 - (-2)}{4 - 3} = 2$, so the tangent has gradient $-\frac{1}{2}$: $y = -\frac{1}{2}(x - 4) = -\frac{1}{2}x + 2$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`The tangent meets the $y$-axis at $B$. Find the area of triangle $CAB$.`, value: area, unit: "units²", wrong: [10],
          explanation: t`$B = (0, 2)$. Angle $CAB = 90^\circ$, $CA = \sqrt{5}$ and $AB = \sqrt{16 + 4} = \sqrt{20}$, so the area is $\frac{1}{2}\sqrt{5}\sqrt{20} = \frac{1}{2}(10) = 5$.` }),
      ],
      explanation: "The radius to the point of contact is perpendicular to the tangent, which gives both the tangent's gradient and a right-angled triangle.",
      hints: ["Complete the square for the centre.", "The tangent is perpendicular to CA.", "Triangle CAB has its right angle at A."],
    });
  }

  {
    const rts = quad.roots(5, -20, 9);
    for (const x of rts) chk(on([0, 0], [x, 5 - 2 * x]), 16);
    b.fib({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The line $2x + y = 5$ meets the circle $x^2 + y^2 = 16$ at two points. Find their $x$-coordinates, each correct to 3 significant figures, in ascending order.`,
      template: "x = {{blank:a}} or x = {{blank:b}}",
      blanks: [
        { id: "a", input: "number", accepted: [Number(rts[0].toFixed(4))], tolerance: 0.0005, wrong: "-0.517" },
        { id: "b", input: "number", accepted: [Number(rts[1].toFixed(3))], tolerance: 0.005, wrong: "-3.48" },
      ],
      explanation: t`$x^2 + (5 - 2x)^2 = 16$ gives $5x^2 - 20x + 9 = 0$. $x = \dfrac{20 \pm \sqrt{400 - 180}}{10} = \dfrac{20 \pm \sqrt{220}}{10}$, so $x = ${sfStr(rts[0])}$ or $x = ${sfStr(rts[1])}$.`,
      hints: [t`$(5 - 2x)^2 = 25 - 20x + 4x^2$.`, "Use the quadratic formula."],
    });
  }

  b.card("FACT", "Tangent and radius", "The tangent at P is perpendicular to the radius CP.");
  b.card("CONCEPT", "Gradient of the tangent at P", t`$-\dfrac{1}{m_{CP}}$, where $m_{CP}$ is the gradient of the radius.`);
  b.card("CONCEPT", "Points where a line meets a circle", "Substitute the line into the circle, solve the quadratic, then find the other coordinate from the line.");
  b.card("FACT", "Discriminant of the line–circle quadratic", "> 0: two points (chord); = 0: tangent; < 0: no intersection.");
  b.card("FACT", "Distance test", "Distance from centre to line: less than r → two points; equal to r → tangent; greater than r → misses.");
  b.card("FORMULA", "Length of a tangent from an external point P", t`$PT = \sqrt{CP^2 - r^2}$`);
  b.card("CONCEPT", "Tangent with an unknown constant", "Substitute, form the quadratic, set its discriminant equal to zero.");
  b.card("FACT", "Two tangents from an external point", "They have equal length and are symmetrical about the line through P and the centre.");
  b.card("DEFINITION", "Chord", "A line segment joining two points on a circle; a diameter is a chord through the centre.");
});
