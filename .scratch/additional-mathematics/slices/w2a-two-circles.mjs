// W2a: amath.circle.two-circles (Cambridge only)
import { concept, P, t, chk, same, quad, sfStr } from "../lib.mjs";

const on = ([a, b], [x, y]) => (x - a) ** 2 + (y - b) ** 2;
const dist = ([x1, y1], [x2, y2]) => Math.hypot(x2 - x1, y2 - y1);
const fromExpanded = (D, E, F) => ({ a: -D / 2, b: -E / 2, r2: (D * D + E * E) / 4 - F });
/** Number of common points of two circles. */
const common = (d, r1, r2) => (d === 0 && r1 === r2 ? Infinity : d > r1 + r2 || d < Math.abs(r1 - r2) ? 0 : d === r1 + r2 || d === Math.abs(r1 - r2) ? 1 : 2);

concept("amath.circle.two-circles", { file: "circle/two-circles", keyPrefix: "circle.two-circles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Two circles have radii $r_1$ and $r_2$, and their centres are a distance $d$ apart. Which condition means they touch externally?`,
    options: [
      [t`$d = r_1 + r_2$`, "Correct: the gap between the circles has just closed."],
      [t`$d = |r_1 - r_2|$`, "That is the condition for touching internally."],
      [t`$d < r_1 + r_2$`, "That allows two points of intersection, or one circle inside the other."],
      [t`$d > r_1 + r_2$`, "Then there is a gap: the circles are separate."],
    ],
    answer: "A",
    explanation: t`Touching externally, the two radii lie end to end along the line of centres, so $d = r_1 + r_2$.`,
  });

  same(common(10, 4, 3), 0);
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "Two circles have radii 4 and 3, and their centres are 10 units apart. How are they related?",
    options: [
      ["they are separate", "Correct: 10 > 4 + 3 = 7."],
      ["they touch externally", "That needs the centres exactly 7 apart."],
      ["they meet at two points", "That needs a distance between 1 and 7."],
      ["one lies inside the other", "That needs a distance less than 4 − 3 = 1."],
    ],
    answer: "A",
    explanation: t`$r_1 + r_2 = 7 < 10 = d$, so there is a gap between the circles: no common point.`,
  });

  chk(dist([0, 0], [5, -12]), 13);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: t`Find the distance between the centres of the circles $x^2 + y^2 = 9$ and $(x - 5)^2 + (y + 12)^2 = 4$.`,
    value: 13, wrong: [Math.sqrt(119), 17],
    explanation: t`Centres $(0, 0)$ and $(5, -12)$: $d = \sqrt{25 + 144} = \sqrt{169} = 13$.`,
  });

  same(common(3, 1, 2), 1);
  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The circles $x^2 + y^2 = 1$ and $(x - 3)^2 + y^2 = 4$ touch each other.`,
    answer: true,
    explanation: t`True. Centres $(0, 0)$ and $(3, 0)$, so $d = 3$; radii 1 and 2, so $r_1 + r_2 = 3 = d$. They touch externally at $(1, 0)$.`,
  });

  same([common(8, 5, 3), common(2, 5, 3), common(6, 5, 3), common(1, 5, 3)], [1, 1, 2, 0]);
  b.match({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`Two circles have radii 5 and 3. Match each distance $d$ between their centres with how the circles are related.`,
    pairs: [
      [t`$d = 8$`, "touch externally"],
      [t`$d = 2$`, "touch internally"],
      [t`$d = 6$`, "intersect at two points"],
      [t`$d = 1$`, "one inside the other, no common point"],
    ],
    explanation: t`$r_1 + r_2 = 8$ and $r_1 - r_2 = 2$. $d = 8$: external touch; $d = 2$: internal touch; $2 < 6 < 8$: two points; $1 < 2$: the smaller circle is inside the larger without touching.`,
    hints: ["Work out r₁ + r₂ and r₁ − r₂ first."],
  });

  chk(dist([2, 1], [5, 5]), 5); same(common(5, 4, 1), 1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`How many points do the circles $(x - 2)^2 + (y - 1)^2 = 16$ and $(x - 5)^2 + (y - 5)^2 = 1$ have in common?`,
    value: 1, wrong: [2, 0],
    explanation: t`Centres $(2, 1)$ and $(5, 5)$: $d = \sqrt{9 + 16} = 5$. Radii 4 and 1: $r_1 + r_2 = 5 = d$, so they touch externally at one point.`,
    hints: ["Compare d with r₁ + r₂ and r₁ − r₂."],
  });

  {
    const c2 = fromExpanded(-6, -2, 0);
    same(c2, { a: 3, b: 1, r2: 10 });
    const d = dist([0, 0], [3, 1]);
    same(common(d, Math.sqrt(20), Math.sqrt(10)), 2);
    for (const x of [2, 4]) { const y = 10 - 3 * x; chk(on([0, 0], [x, y]), 20); chk(x * x + y * y - 6 * x - 2 * y, 0); }
  }
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The circles $x^2 + y^2 = 20$ and $x^2 + y^2 - 6x - 2y = 0$ intersect at two points. The line through these points has equation $ax + y = c$. Find $a$ and $c$.`,
    template: "a = {{blank:a}}, c = {{blank:c}}",
    blanks: [{ id: "a", input: "number", accepted: [3], wrong: "6" }, { id: "c", input: "number", accepted: [10], wrong: "20" }],
    explanation: t`Subtract: $(x^2 + y^2 - 20) - (x^2 + y^2 - 6x - 2y) = 0$ gives $6x + 2y - 20 = 0$, that is $3x + y = 10$.`,
    hints: ["Write both equations with 0 on the right, then subtract."],
  });

  chk(2 + 8, 10); chk(12 - 2, 10);
  chk(dist([0, 0], [6, 8]), 10);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The circles $x^2 + y^2 = 4$ and $(x - 6)^2 + (y - 8)^2 = k^2$, where $k > 0$, touch. Find the value of $k$ when they touch externally and when they touch internally.`,
    template: "externally: k = {{blank:e}}; internally: k = {{blank:i}}",
    blanks: [{ id: "e", input: "number", accepted: [8], wrong: "12" }, { id: "i", input: "number", accepted: [12], wrong: "8" }],
    explanation: t`$d = \sqrt{36 + 64} = 10$. Externally: $2 + k = 10$, $k = 8$. Internally: $k - 2 = 10$, $k = 12$ (the small circle inside the large one).`,
    hints: ["Find the distance between the centres.", "Internal touching: the difference of the radii equals d."],
  });

  chk(dist([0, 0], [1, 1]), Math.SQRT2); same(common(Math.SQRT2, 6, 2), 0);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How are the circles $x^2 + y^2 = 36$ and $(x - 1)^2 + (y - 1)^2 = 4$ related?`,
    options: [
      ["one lies inside the other, not touching", t`Correct: $d = \sqrt{2} < 6 - 2 = 4$.`],
      ["they meet at two distinct points", t`Two points need $4 < d < 8$; here $d = \sqrt{2}$.`],
      ["they touch each other internally", t`Internal touching needs $d = 4$ exactly.`],
      ["they are separate, each outside the other", t`Separate circles need $d > 8$.`],
    ],
    answer: "A",
    explanation: t`Centres $(0, 0)$ and $(1, 1)$, so $d = \sqrt{2} \approx 1.41$. Radii 6 and 2: $d < 6 - 2 = 4$, so the small circle sits inside the large one without touching.`,
    hints: ["Compare d with the difference of the radii."],
  });

  same(fromExpanded(-4, 6, -3), { a: 2, b: -3, r2: 16 });
  same(fromExpanded(8, -10, 5), { a: -4, b: 5, r2: 36 });
  chk(dist([2, -3], [-4, 5]), 10);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the distance between the centres of the circles $x^2 + y^2 - 4x + 6y - 3 = 0$ and $x^2 + y^2 + 8x - 10y + 5 = 0$.`,
    value: 10, wrong: [Math.hypot(6, 2)],
    explanation: t`Centres $(2, -3)$ and $(-4, 5)$ (halve the coefficients of $x$ and $y$ and change their signs). $d = \sqrt{36 + 64} = 10$.`,
    hints: [t`The centre of $x^2 + y^2 + 2gx + 2fy + c = 0$ is $(-g, -f)$.`],
  });

  for (const y of [2.4, -2.4]) { chk(on([0, 0], [3.2, y]), 16, 1e-9); chk(on([5, 0], [3.2, y]), 9, 1e-9); }
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The circles $x^2 + y^2 = 16$ and $(x - 5)^2 + y^2 = 9$ intersect at $P$ and $Q$. The common chord $PQ$ lies on the line $x = h$. Find $h$ and the length of $PQ$.`,
    template: "h = {{blank:h}}, PQ = {{blank:L}}",
    blanks: [{ id: "h", input: "number", accepted: [3.2], wrong: "2.5" }, { id: "L", input: "number", accepted: [4.8], wrong: "2.4" }],
    explanation: t`Expand the second: $x^2 + y^2 - 10x + 16 = 0$. Subtract from $x^2 + y^2 - 16 = 0$: $10x - 32 = 0$, so $x = 3.2$. Then $y^2 = 16 - 10.24 = 5.76$, $y = \pm 2.4$, and $PQ = 4.8$.`,
    hints: ["Subtract the equations to find the chord.", "Substitute back to find the two y-values."],
  });

  b.num({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Two circles of radii 6 and 4 touch internally. Find the distance between their centres.",
    value: 2, wrong: [10, 24],
    explanation: t`Touching internally: $d = |r_1 - r_2| = 6 - 4 = 2$.`,
  });

  {
    const c2 = fromExpanded(-16, -12, 51);
    same(c2, { a: 8, b: 6, r2: 49 });
    chk(dist([0, 0], [8, 6]), 10);
  }
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that the circles $x^2 + y^2 = 9$ and $x^2 + y^2 - 16x - 12y + 51 = 0$ touch externally.`,
    points: [
      t`M1 completes the square: $(x - 8)^2 + (y - 6)^2 = 49$.`,
      t`A1 states centres $(0, 0)$, $(8, 6)$ and radii 3, 7.`,
      t`M1 finds $d = \sqrt{64 + 36} = 10$.`,
      t`A1 compares: $d = 10 = 3 + 7$, so the circles touch externally.`,
    ],
    modelAnswer: t`$$
x^2 - 16x + y^2 - 12y = -51 \Rightarrow (x - 8)^2 + (y - 6)^2 = 64 + 36 - 51 = 49
$$

The circles have centres $(0, 0)$ and $(8, 6)$ and radii 3 and 7.

$$
d = \sqrt{8^2 + 6^2} = 10 = 3 + 7 = r_1 + r_2
$$

so the circles touch externally.`,
    explanation: "Find both centres and radii, then compare the distance between the centres with the sum of the radii.",
    hints: ["Complete the square on the second circle."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Two intersecting circles have equations of the form $x^2 + y^2 + 2gx + 2fy + c = 0$. How is the equation of their common chord found?`,
    options: [
      ["subtract one equation from the other", "Correct: the squared terms cancel, leaving a straight line."],
      ["add the two equations together", t`Adding keeps $2x^2 + 2y^2$, which is not a line.`],
      [t`put $x = 0$ in both equations and solve`, t`That finds where each circle meets the $y$-axis.`],
      ["equate the two radii and the two centres", "The radii are fixed numbers, not equations."],
    ],
    answer: "A",
    explanation: "Points on both circles satisfy both equations, so they satisfy their difference. The x² and y² terms cancel, leaving the linear equation of the common chord.",
  });

  {
    for (const [x, y] of [[1, 3], [3, -1]]) { chk(on([0, 0], [x, y]), 10); chk(on([4, 2], [x, y]), 10); chk(2 * x + y, 5); }
    same(quad.roots(1, -4, 3), [1, 3]);
    const len = dist([1, 3], [3, -1]);
    chk(len, Math.sqrt(20));
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: t`The circles $C_1: x^2 + y^2 = 10$ and $C_2: (x - 4)^2 + (y - 2)^2 = 10$ intersect at $A$ and $B$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $A$ and $B$ lie on the line $2x + y = 5$.`,
          points: [t`M1 expands $C_2$ to $x^2 + y^2 - 8x - 4y + 10 = 0$ and subtracts it from $x^2 + y^2 - 10 = 0$.`, t`A1 obtains $8x + 4y - 20 = 0$, i.e. $2x + y = 5$.`],
          modelAnswer: t`$$
C_2: x^2 - 8x + 16 + y^2 - 4y + 4 = 10 \Rightarrow x^2 + y^2 - 8x - 4y + 10 = 0
$$

$$
(x^2 + y^2 - 10) - (x^2 + y^2 - 8x - 4y + 10) = 0 \Rightarrow 8x + 4y - 20 = 0 \Rightarrow 2x + y = 5
$$`,
          explanation: "A and B satisfy both equations, hence their difference." }),
        P.fib({ label: "(b)", marks: 3, stem: t`Find the coordinates of $A$ and $B$, with $A$ having the smaller $x$-coordinate.`, template: "A({{blank:ax}}, {{blank:ay}}), B({{blank:bx}}, {{blank:by}})",
          blanks: [{ id: "ax", input: "number", accepted: [1], wrong: "-1" }, { id: "ay", input: "number", accepted: [3], wrong: "7" }, { id: "bx", input: "number", accepted: [3], wrong: "-3" }, { id: "by", input: "number", accepted: [-1], wrong: "11" }],
          explanation: t`$y = 5 - 2x$ in $C_1$: $x^2 + 25 - 20x + 4x^2 = 10$, so $5x^2 - 20x + 15 = 0$, $x^2 - 4x + 3 = 0$, $x = 1$ or $3$. Then $A(1, 3)$ and $B(3, -1)$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Find the length of the common chord $AB$, correct to 3 significant figures.`, value: len, wrong: [20],
          explanation: t`$AB = \sqrt{2^2 + 4^2} = \sqrt{20} = ${sfStr(len)}$ (3 s.f.).` }),
      ],
      explanation: "Subtracting the circle equations gives the common chord; substituting it into one circle gives the intersection points.",
      hints: ["Expand C₂ before subtracting.", t`Substitute $y = 5 - 2x$ into the simpler circle.`],
    });
  }

  {
    const c1 = fromExpanded(-2, -6, 6);
    same(c1, { a: 1, b: 3, r2: 4 });
    const d = dist([1, 3], [7, 11]);
    chk(d, 10);
    const T = [1 + (2 / 10) * 6, 3 + (2 / 10) * 8];
    chk(on([1, 3], T), 4, 1e-9); chk(on([7, 11], T), 64, 1e-9); chk(T[0], 2.2); chk(T[1], 4.6);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`The circle $C_1$ has equation $x^2 + y^2 - 2x - 6y + 6 = 0$. A second circle $C_2$ has centre $(7, 11)$ and touches $C_1$ externally at the point $T$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the centre and radius of $C_1$.`, template: "centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
          blanks: [{ id: "a", input: "number", accepted: [1], wrong: "-1" }, { id: "b", input: "number", accepted: [3], wrong: "-3" }, { id: "r", input: "number", accepted: [2], wrong: "4" }],
          explanation: t`$(x - 1)^2 + (y - 3)^2 = 1 + 9 - 6 = 4$: centre $(1, 3)$, radius 2.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the distance between the centres of the two circles.", value: d, wrong: [100], explanation: t`$\sqrt{6^2 + 8^2} = 10$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Find the radius of $C_2$.`, value: 8, wrong: [12], explanation: t`Touching externally: $2 + r_2 = 10$, so $r_2 = 8$.` }),
        P.fib({ label: "(d)", marks: 2, stem: t`Find the coordinates of $T$.`, template: "T({{blank:x}}, {{blank:y}})",
          blanks: [{ id: "x", input: "number", accepted: [2.2], wrong: "4" }, { id: "y", input: "number", accepted: [4.6], wrong: "7" }],
          explanation: t`$T$ is on the line of centres, 2 units from $(1, 3)$: $\frac{2}{10}$ of the way to $(7, 11)$. $T = (1 + 0.2 \times 6, 3 + 0.2 \times 8) = (2.2, 4.6)$. (The midpoint $(4, 7)$ would be correct only for equal radii.)` }),
        P.num({ label: "(e)", marks: 1, stem: t`The equation of $C_2$ is $(x - 7)^2 + (y - 11)^2 = k$. State the value of $k$.`, value: 64, prefix: "k =", wrong: [8], explanation: t`$k = r_2^2 = 64$.` }),
      ],
      explanation: "Centre and radius by completing the square; touching externally means the distance between centres is the sum of the radii; the contact point divides the line of centres in the ratio of the radii.",
      hints: ["Complete the square for C₁.", "The contact point is r₁ from the centre of C₁ along the line of centres."],
    });
  }

  b.card("FACT", "Circles touch externally", t`$d = r_1 + r_2$`);
  b.card("FACT", "Circles touch internally", t`$d = |r_1 - r_2|$`);
  b.card("FACT", "Circles meet at two points", t`$|r_1 - r_2| < d < r_1 + r_2$`);
  b.card("FACT", "Circles do not meet", t`$d > r_1 + r_2$ (separate) or $d < |r_1 - r_2|$ (one inside the other).`);
  b.card("CONCEPT", "Common chord", "Subtract the two equations (x² and y² coefficients 1): the result is the line through both intersection points.");
  b.card("CONCEPT", "Point of contact (external)", t`On the line of centres, $r_1$ from $C_1$: $C_1 + \frac{r_1}{r_1 + r_2}(C_2 - C_1)$.`);
  b.card("FACT", "Common chord and line of centres", "They are perpendicular.");
  b.card("DEFINITION", "Concentric circles", "Circles with the same centre (d = 0).");
  b.card("CONCEPT", "Method for two circles", "Find both centres and radii → find d → compare d with r₁ + r₂ and |r₁ − r₂|.");
});
