// W1b: amaths.coordinate.circles
import { concept, P, t, chk, same, quad } from "../lib.mjs";

const onC = (g, f, c, [x, y]) => x * x + y * y + 2 * g * x + 2 * f * y + c;

concept("amaths.coordinate.circles", { file: "coordinate/circles", keyPrefix: "coordinate.circles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`What are the centre and radius of the circle $(x - 3)^2 + (y + 2)^2 = 49$?`,
    options: [
      [t`centre $(3, -2)$, radius $7$`, "Correct: each bracket is zero at the centre, and the radius is the square root of 49."],
      [t`centre $(-3, 2)$, radius $7$`, t`The signs are reversed: $(x - 3)$ is zero when $x = 3$.`],
      [t`centre $(3, -2)$, radius $49$`, t`49 is $r^2$; the radius is $\sqrt{49} = 7$.`],
      [t`centre $(-3, 2)$, radius $49$`, "Both the signs of the centre and the radius are wrong."],
    ],
    answer: "A",
    explanation: t`$(x - a)^2 + (y - b)^2 = r^2$ has centre $(a, b)$ and radius $r$: here $(3, -2)$ and $r = 7$.`,
  });

  // x² + y² + 8x − 2y − 8 = 0 → centre (−4, 1), r = 5
  chk(Math.sqrt(16 + 1 + 8), 5);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the centre and radius of the circle $x^2 + y^2 + 8x - 2y - 8 = 0$.`,
    options: [
      [t`centre $(-4, 1)$, radius $5$`, t`Correct: $(x + 4)^2 + (y - 1)^2 = 8 + 16 + 1 = 25$.`],
      [t`centre $(4, -1)$, radius $5$`, t`The centre is $(-g, -f)$: with $2g = 8$, $g = 4$, so the $x$-coordinate is $-4$.`],
      [t`centre $(-4, 1)$, radius $3$`, t`This uses $r^2 = 16 + 1 - 8 = 9$: the constant must be subtracted as $-c = +8$.`],
      [t`centre $(-8, 2)$, radius $\sqrt{76}$`, t`The coefficients $8$ and $-2$ are $2g$ and $2f$; halve them first.`],
    ],
    answer: "A",
    explanation: t`$(x^2 + 8x) + (y^2 - 2y) = 8 \Rightarrow (x + 4)^2 - 16 + (y - 1)^2 - 1 = 8 \Rightarrow (x + 4)^2 + (y - 1)^2 = 25$. Centre $(-4, 1)$, radius $5$.`,
  });

  // x² + y² − 10x + 6y + 18 = 0 → (5, −3), r = 4
  chk(Math.sqrt(25 + 9 - 18), 4);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The circle $C$ has equation $x^2 + y^2 - 10x + 6y + 18 = 0$. Find its centre and radius.`,
    template: "Centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
    blanks: [
      { id: "a", input: "number", accepted: [5], wrong: "-5" },
      { id: "b", input: "number", accepted: [-3], wrong: "3" },
      { id: "r", input: "number", accepted: [4], wrong: "16" },
    ],
    explanation: t`$(x - 5)^2 - 25 + (y + 3)^2 - 9 + 18 = 0$, so $(x - 5)^2 + (y + 3)^2 = 16$: centre $(5, -3)$, radius $4$.`,
  });

  chk(Math.hypot(7 - 2, 11 - -1), 13);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A circle has centre $(2, -1)$ and passes through the point $(7, 11)$. Find its radius.`,
    value: 13, wrong: [169, Math.hypot(5, 10)],
    explanation: t`$r = \sqrt{(7 - 2)^2 + (11 + 1)^2} = \sqrt{25 + 144} = \sqrt{169} = 13$.`,
  });

  // diameter A(−1, 4), B(5, −4): centre (2, 0), r = 5
  chk(Math.hypot(5 - -1, -4 - 4) / 2, 5);
  b.expr({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The points $A(-1, 4)$ and $B(5, -4)$ are the ends of a diameter of a circle. Find the equation of the circle in the form $(x - a)^2 + (y - b)^2 = r^2$. Type powers with ^, e.g. (x-1)^2+(y+3)^2=16.`,
    accepted: ["(x-2)^2+y^2=25", "(x-2)^2+(y-0)^2=25", "(x-2)^2+(y)^2=25", "x^2+y^2-4x-21=0", "x^2-4x+y^2-21=0", "x^2+y^2-4x=21"],
    wrong: ["(x-2)^2+y^2=100", "(x+2)^2+y^2=25"],
    explanation: t`Centre = midpoint of $AB$ = $\left(\frac{-1 + 5}{2}, \frac{4 - 4}{2}\right) = (2, 0)$. Radius = $\frac{1}{2}AB = \frac{1}{2}\sqrt{36 + 64} = 5$. So $(x - 2)^2 + y^2 = 25$.`,
    hints: ["The centre is the midpoint of a diameter.", "The radius is half the length of the diameter."],
  });

  chk((6 - 2) ** 2 + (1 + 2) ** 2, 25);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The point $(6, 1)$ lies inside the circle $(x - 2)^2 + (y + 2)^2 = 36$.`,
    answer: true,
    explanation: t`Substitute: $(6 - 2)^2 + (1 + 2)^2 = 16 + 9 = 25 < 36$, so the point is closer to the centre than the radius (distance $5 < 6$): inside.`,
  });

  // tangent at (5, 4) on circle centre (2, 0), r 5: radius gradient 4/3, tangent 3x + 4y = 31
  chk((5 - 2) ** 2 + 4 ** 2, 25); chk(3 * 5 + 4 * 4, 31);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The point $P(5, 4)$ lies on the circle $(x - 2)^2 + y^2 = 25$. Find the equation of the tangent to the circle at $P$.`,
    options: [
      [t`$3x + 4y = 31$`, t`Correct: the radius has gradient $\frac{4}{3}$, so the tangent has gradient $-\frac{3}{4}$ through $(5, 4)$.`],
      [t`$4x - 3y = 8$`, t`This line has gradient $\frac{4}{3}$: it is the radius (the normal), not the tangent.`],
      [t`$3x - 4y = -1$`, t`This has gradient $+\frac{3}{4}$; perpendicular means the negative reciprocal, $-\frac{3}{4}$.`],
      [t`$4x + 3y = 32$`, t`This has gradient $-\frac{4}{3}$: the reciprocal was not taken.`],
    ],
    answer: "A",
    explanation: t`Gradient of $CP$ = $\frac{4 - 0}{5 - 2} = \frac{4}{3}$. Tangent gradient $-\frac{3}{4}$: $y - 4 = -\frac{3}{4}(x - 5) \Rightarrow 4y - 16 = -3x + 15 \Rightarrow 3x + 4y = 31$.`,
    hints: ["The tangent is perpendicular to the radius at the point of contact."],
  });

  // y = x + k tangent to x² + y² = 8: 2x² + 2kx + k² − 8 = 0 → k = ±4
  for (const k of [-4, 4]) chk(quad.disc(2, 2 * k, k * k - 8), 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the two values of $k$ for which the line $y = x + k$ is a tangent to the circle $x^2 + y^2 = 8$. Give them in ascending order.`,
    template: "k = {{blank:a}} or k = {{blank:b}}",
    blanks: [
      { id: "a", input: "number", accepted: [-4], wrong: "-2" },
      { id: "b", input: "number", accepted: [4], wrong: "2" },
    ],
    explanation: t`$x^2 + (x + k)^2 = 8 \Rightarrow 2x^2 + 2kx + k^2 - 8 = 0$. Tangent: $4k^2 - 8(k^2 - 8) = 0 \Rightarrow 64 - 4k^2 = 0 \Rightarrow k = \pm 4$.`,
    hints: ["Substitute the line into the circle.", "A tangent gives a repeated root: discriminant = 0."],
  });

  // y = x + 2 and x² + y² − 2x − 4y − 20 = 0 → 2x² − 2x − 24 = 0 → (−3, −1), (4, 6)
  same(quad.roots(2, -2, -24), [-3, 4]);
  for (const p of [[-3, -1], [4, 6]]) chk(onC(-1, -2, -20, p), 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The line $y = x + 2$ meets the circle $x^2 + y^2 - 2x - 4y - 20 = 0$ at two points. Find their coordinates, the point with the smaller $x$-coordinate first.`,
    template: "({{blank:x1}}, {{blank:y1}}) and ({{blank:x2}}, {{blank:y2}})",
    blanks: [
      { id: "x1", input: "number", accepted: [-3], wrong: "3" },
      { id: "y1", input: "number", accepted: [-1], wrong: "5" },
      { id: "x2", input: "number", accepted: [4], wrong: "-4" },
      { id: "y2", input: "number", accepted: [6], wrong: "-2" },
    ],
    explanation: t`$x^2 + (x + 2)^2 - 2x - 4(x + 2) - 20 = 0 \Rightarrow 2x^2 - 2x - 24 = 0 \Rightarrow x^2 - x - 12 = 0 \Rightarrow (x - 4)(x + 3) = 0$. So $x = -3, y = -1$ and $x = 4, y = 6$.`,
    hints: [t`Substitute $y = x + 2$ and simplify to a quadratic in $x$.`, "Find each y from the line, not the circle."],
  });

  // tangent length from T(9, −4) to circle centre (1, 2), r 5: √(100 − 25) = 5√3
  chk((9 - 1) ** 2 + (-4 - 2) ** 2, 100);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The circle $x^2 + y^2 - 2x - 4y - 20 = 0$ has centre $C$. A tangent is drawn from the point $T(9, -4)$ to touch the circle at $A$. Find the length $TA$, correct to 3 significant figures.`,
    value: Math.sqrt(75), wrong: [10, 5],
    explanation: t`Centre $C(1, 2)$, radius $5$. $CT^2 = 8^2 + 6^2 = 100$. Angle $CAT = 90^\circ$, so $TA^2 = 100 - 25 = 75$ and $TA = 5\sqrt{3} = 8.66$. (10 is $CT$, not the tangent length.)`,
    hints: ["The radius CA is perpendicular to the tangent TA.", "Use Pythagoras in triangle CAT."],
  });

  // 3x + 4y = k misses x² + y² = 25 when |k| > 25
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`For which values of $k$ does the line $3x + 4y = k$ **not** meet the circle $x^2 + y^2 = 25$?`,
    options: [
      [t`$k < -25$ or $k > 25$`, t`Correct: the distance from the origin to the line is $\frac{|k|}{5}$, which exceeds the radius 5 when $|k| > 25$.`],
      [t`$-25 < k < 25$`, "These values give two intersection points: the line is close enough to the centre to cut the circle."],
      [t`$k < -5$ or $k > 5$`, t`This compares $|k|$ with the radius directly; the distance from the centre is $\frac{|k|}{5}$, not $|k|$.`],
      [t`$k = -25$ or $k = 25$`, "These two values make the line a tangent, so it touches the circle once."],
    ],
    answer: "A",
    explanation: t`Distance from $(0, 0)$ to $3x + 4y - k = 0$ is $\frac{|k|}{\sqrt{9 + 16}} = \frac{|k|}{5}$. No intersection when $\frac{|k|}{5} > 5$, i.e. $|k| > 25$. (Substituting and using $b^2 - 4ac < 0$ gives the same result.)`,
    hints: ["Compare the distance from the centre to the line with the radius, or use the discriminant."],
  });

  // y = kx meets (x − 5)² + y² = 9 twice: (1 + k²)x² − 10x + 16 = 0, 100 − 64(1 + k²) > 0 → |k| < 3/4
  for (const k of [-0.75, 0.75]) chk(quad.disc(1 + k * k, -10, 16), 0);
  chk(quad.disc(1, -10, 16) > 0 ? 1 : 0, 1);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the set of values of $k$ for which the line $y = kx$ meets the circle $(x - 5)^2 + y^2 = 9$ at two distinct points. Type the end values as decimals or fractions.`,
    template: "The set of values is {{blank:lo}} < k < {{blank:hi}}",
    blanks: [
      { id: "lo", input: "number", accepted: ["-0.75", "-3/4"], wrong: "-0.6" },
      { id: "hi", input: "number", accepted: ["0.75", "3/4"], wrong: "0.6" },
    ],
    explanation: t`$(x - 5)^2 + k^2x^2 = 9 \Rightarrow (1 + k^2)x^2 - 10x + 16 = 0$. Two points: $100 - 64(1 + k^2) > 0 \Rightarrow 64k^2 < 36 \Rightarrow k^2 < \frac{9}{16}$, so $-\frac{3}{4} < k < \frac{3}{4}$.`,
    hints: ["Substitute y = kx and collect the x² terms.", t`Two distinct points need $b^2 - 4ac > 0$.`],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The points $A$, $B$ and $C$ lie on a circle and $\angle ABC = 90^\circ$. Which statement must be true?`,
    options: [
      [t`$AC$ is a diameter of the circle.`, "Correct: the angle in a semicircle is a right angle, and conversely a right angle at the circumference stands on a diameter."],
      [t`$AB$ is a diameter of the circle.`, t`$AB$ is a side of the right angle; the diameter is the side opposite the right angle.`],
      [t`$AB$ is a tangent to the circle.`, t`$A$ and $B$ both lie on the circle, so $AB$ is a chord, not a tangent.`],
      [t`The centre of the circle is $B$.`, t`$B$ is on the circle, so it cannot be the centre.`],
    ],
    answer: "A",
    explanation: t`The angle subtended by a diameter at the circumference is $90^\circ$; so if $\angle ABC = 90^\circ$, the hypotenuse $AC$ is a diameter and its midpoint is the centre.`,
  });

  // through (0, 0), (8, 0), (0, 6): centre (4, 3), r 5
  for (const p of [[0, 0], [8, 0], [0, 6]]) chk(Math.hypot(p[0] - 4, p[1] - 3), 5);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A circle passes through the points $O(0, 0)$, $P(8, 0)$ and $Q(0, 6)$. Find the centre and radius of the circle.`,
    template: "Centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
    blanks: [
      { id: "a", input: "number", accepted: [4], wrong: "8" },
      { id: "b", input: "number", accepted: [3], wrong: "6" },
      { id: "r", input: "number", accepted: [5], wrong: "10" },
    ],
    explanation: t`$\angle POQ = 90^\circ$, so $PQ$ is a diameter. Centre = midpoint of $PQ$ = $(4, 3)$; radius $= \frac{1}{2}\sqrt{8^2 + 6^2} = 5$. (The perpendicular bisectors $x = 4$ of $OP$ and $y = 3$ of $OQ$ give the same centre.)`,
    hints: ["The angle at O between the axes is a right angle.", "Or: the centre lies on the perpendicular bisector of each chord."],
  });

  // shortest distance from (13, 3) to circle centre (1, −2), r 5 → 13 − 5 = 8
  chk(Math.hypot(13 - 1, 3 - -2), 13); chk(Math.sqrt(1 + 4 + 20), 5);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the shortest distance from the point $(13, 3)$ to the circle $x^2 + y^2 - 2x + 4y - 20 = 0$.`,
    value: 8, wrong: [13, 18],
    explanation: t`Centre $(1, -2)$, radius $\sqrt{1 + 4 + 20} = 5$. Distance from the point to the centre $= \sqrt{12^2 + 5^2} = 13$. The nearest point of the circle is on the line to the centre, so the shortest distance is $13 - 5 = 8$. (18 is the greatest distance.)`,
    hints: ["Find the distance from the point to the centre first.", "The nearest point of the circle lies on the line joining the point to the centre."],
  });

  // y = 2x + 5 and x² + y² = 5: 5x² + 20x + 20 = 0 → x = −2, y = 1
  chk(quad.disc(5, 20, 20), 0); same(quad.roots(5, 20, 20), [-2]); chk((-2) ** 2 + 1 ** 2, 5);
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that the line $y = 2x + 5$ is a tangent to the circle $x^2 + y^2 = 5$, and find the coordinates of the point of contact.`,
    points: [
      t`M1 substitutes: $x^2 + (2x + 5)^2 = 5$.`,
      t`A1 simplifies to $5x^2 + 20x + 20 = 0$, i.e. $x^2 + 4x + 4 = 0$.`,
      t`M1 shows a repeated root: $(x + 2)^2 = 0$ (or discriminant $16 - 16 = 0$), so the line is a tangent.`,
      t`A1 point of contact $(-2, 1)$.`,
    ],
    modelAnswer: t`$$
x^2 + (2x + 5)^2 = 5
$$

$$
5x^2 + 20x + 25 = 5 \Rightarrow 5x^2 + 20x + 20 = 0 \Rightarrow x^2 + 4x + 4 = 0
$$

$$
(x + 2)^2 = 0 \Rightarrow x = -2 \text{ (repeated root)}
$$

One point of contact only, so the line is a tangent. When $x = -2$, $y = 2(-2) + 5 = 1$: the point of contact is $(-2, 1)$.`,
    explanation: "A repeated root means the line meets the circle at exactly one point.",
    hints: ["Substitute the line into the circle and look at the discriminant."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each circle with its centre and radius.",
    pairs: [
      [t`$x^2 + y^2 = 16$`, t`centre $(0, 0)$, radius $4$`],
      [t`$(x + 1)^2 + (y - 2)^2 = 9$`, t`centre $(-1, 2)$, radius $3$`],
      [t`$x^2 + y^2 - 4x = 0$`, t`centre $(2, 0)$, radius $2$`],
      [t`$x^2 + y^2 + 6y + 5 = 0$`, t`centre $(0, -3)$, radius $2$`],
    ],
    explanation: t`Complete the square where needed: $x^2 - 4x + y^2 = 0 \Rightarrow (x - 2)^2 + y^2 = 4$; $x^2 + (y + 3)^2 = 9 - 5 = 4$.`,
  });

  // Struct (12): A(1, 1), B(7, 1), C(1, 9)
  chk((7 - 1) * (1 - 1) + (1 - 1) * (9 - 1), 0); // AB · AC = 0
  chk(Math.hypot(7 - 1, 1 - 9) / 2, 5);
  for (const p of [[1, 1], [7, 1], [1, 9]]) chk((p[0] - 4) ** 2 + (p[1] - 5) ** 2, 25);
  chk((9 - 5) / (1 - 4), -4 / 3); chk(3 * 1 - 4 * 9 + 33, 0); chk(3 * -11 + 33, 0);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The points $A(1, 1)$, $B(7, 1)$ and $C(1, 9)$ lie on a circle.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $BC$ is a diameter of the circle.`,
        points: [t`M1 shows $AB$ is horizontal and $AC$ vertical (or gradients/vectors give $AB \perp AC$), so $\angle BAC = 90^\circ$.`, t`A1 uses the angle in a semicircle to conclude $BC$ is a diameter.`],
        modelAnswer: t`$AB$ joins $(1, 1)$ to $(7, 1)$, so it is horizontal; $AC$ joins $(1, 1)$ to $(1, 9)$, so it is vertical. Hence $\angle BAC = 90^\circ$.

A right angle at the circumference stands on a diameter (angle in a semicircle), so $BC$ is a diameter.`,
        explanation: "The converse of the angle-in-a-semicircle theorem." }),
      P.fib({ label: "(b)", marks: 3, stem: "Find the centre and the radius of the circle.", template: "Centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
        blanks: [
          { id: "a", input: "number", accepted: [4], wrong: "3" },
          { id: "b", input: "number", accepted: [5], wrong: "4" },
          { id: "r", input: "number", accepted: [5], wrong: "10" },
        ],
        explanation: t`Centre = midpoint of $BC$ = $\left(\frac{7 + 1}{2}, \frac{1 + 9}{2}\right) = (4, 5)$; radius $= \frac{1}{2}\sqrt{6^2 + 8^2} = 5$.` }),
      P.expr({ label: "(c)", marks: 2, stem: "Write down the equation of the circle in the form (x − a)² + (y − b)² = r². Type powers with ^.",
        accepted: ["(x-4)^2+(y-5)^2=25", "(y-5)^2+(x-4)^2=25", "x^2+y^2-8x-10y+16=0"], wrong: ["(x+4)^2+(y+5)^2=25"],
        explanation: t`$(x - 4)^2 + (y - 5)^2 = 25$.` }),
      P.expr({ label: "(d)", marks: 3, stem: "Find the equation of the tangent to the circle at C, in the form ax + by + c = 0 with integer a, b, c.",
        accepted: ["3x-4y+33=0", "-3x+4y-33=0", "4y-3x-33=0", "3x+33-4y=0", "4y=3x+33", "y=0.75x+8.25", "y=3/4x+33/4", "y=(3/4)x+33/4", "y=3x/4+33/4"],
        wrong: ["4x+3y-31=0"],
        explanation: t`Radius from $(4, 5)$ to $C(1, 9)$ has gradient $\frac{9 - 5}{1 - 4} = -\frac{4}{3}$, so the tangent has gradient $\frac{3}{4}$: $y - 9 = \frac{3}{4}(x - 1) \Rightarrow 4y - 36 = 3x - 3 \Rightarrow 3x - 4y + 33 = 0$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`The tangent at $C$ meets the $x$-axis at $D$. Find the $x$-coordinate of $D$.`, value: -11, prefix: "x =", wrong: [11, -8.25],
        explanation: t`Put $y = 0$: $3x + 33 = 0$, so $x = -11$.` }),
    ],
    explanation: "A right angle at A makes BC a diameter; then the centre is its midpoint and the tangent at C is perpendicular to the radius.",
    hints: ["Look at the directions of AB and AC.", "The tangent gradient is the negative reciprocal of the radius gradient."],
  });

  // Struct (13): circle x² + y² − 4x + 6y − 12 = 0 (centre (2, −3), r 5); T(9, −2)
  chk(Math.sqrt(4 + 9 + 12), 5); chk((9 - 2) ** 2 + (-2 + 3) ** 2, 50);
  same(quad.roots(12, -7, -12), [-0.75, 4 / 3]);
  for (const m of [-0.75, 4 / 3]) {
    // y = m(x − 9) − 2 into the circle: (1 + m²)x² + (−18m² − 4m − 4 + 6m)x + (81m² + 36m + 4 − 54m − 12 − 12)
    const A = 1 + m * m;
    const B = -18 * m * m - 4 * m - 4 + 6 * m;
    const Cc = 81 * m * m + 36 * m + 4 - 54 * m - 12 - 12;
    chk(quad.disc(A, B, Cc), 0, 1e-9, `tangent m=${m}`);
  }
  chk(-0.75 * (4 / 3), -1);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The circle $C$ has equation $x^2 + y^2 - 4x + 6y - 12 = 0$, and $T$ is the point $(9, -2)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the centre and radius of C.", template: "Centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
        blanks: [
          { id: "a", input: "number", accepted: [2], wrong: "-2" },
          { id: "b", input: "number", accepted: [-3], wrong: "3" },
          { id: "r", input: "number", accepted: [5], wrong: "1" },
        ],
        explanation: t`$(x - 2)^2 + (y + 3)^2 = 12 + 4 + 9 = 25$: centre $(2, -3)$, radius $5$.` }),
      P.manual({ label: "(b)", marks: 1, stem: "Show that T lies outside the circle.",
        points: [t`Finds the distance from the centre to $T$: $\sqrt{7^2 + 1^2} = \sqrt{50} > 5$, so $T$ is outside.`],
        modelAnswer: "Distance from (2, −3) to (9, −2) is √(49 + 1) = √50 ≈ 7.07, which is greater than the radius 5." }),
      P.num({ label: "(c)", marks: 2, stem: "Find the length of a tangent from T to the circle.", value: 5, wrong: [Math.sqrt(50), Math.sqrt(75)],
        explanation: t`Tangent length $= \sqrt{50 - 25} = 5$.` }),
      P.proof({ label: "(d)", marks: 3, stem: t`A line through $T$ has gradient $m$. Show that it is a tangent to $C$ when $12m^2 - 7m - 12 = 0$.`,
        points: [
          t`M1 writes the line as $y = m(x - 9) - 2$, i.e. $mx - y - 9m - 2 = 0$.`,
          t`M1 sets the perpendicular distance from $(2, -3)$ equal to 5 (or substitutes and sets the discriminant to 0): $\frac{|2m + 3 - 9m - 2|}{\sqrt{m^2 + 1}} = 5$.`,
          t`A1 squares and simplifies $(1 - 7m)^2 = 25(m^2 + 1)$ to $24m^2 - 14m - 24 = 0$, i.e. $12m^2 - 7m - 12 = 0$.`,
        ],
        modelAnswer: t`The line is $mx - y - (9m + 2) = 0$. It is a tangent when its distance from the centre $(2, -3)$ equals the radius:

$$
\frac{|2m + 3 - 9m - 2|}{\sqrt{m^2 + 1}} = 5
$$

$$
(1 - 7m)^2 = 25(m^2 + 1)
$$

$$
1 - 14m + 49m^2 = 25m^2 + 25 \Rightarrow 24m^2 - 14m - 24 = 0 \Rightarrow 12m^2 - 7m - 12 = 0
$$`,
        explanation: "Either the distance test or the discriminant of the substituted quadratic gives the condition." }),
      P.fib({ label: "(e)", marks: 2, stem: "Solve the equation to find the gradients of the two tangents from T. Give them in ascending order as fractions or decimals.", template: "m = {{blank:a}} or m = {{blank:b}}",
        blanks: [
          { id: "a", input: "number", accepted: ["-0.75", "-3/4"], wrong: "0.75" },
          { id: "b", input: "number", accepted: ["4/3", "1.333", "1.33"], tolerance: 0.005, wrong: "-4/3" },
        ],
        explanation: t`$12m^2 - 7m - 12 = (4m + 3)(3m - 4) = 0$, so $m = -\frac{3}{4}$ or $m = \frac{4}{3}$.` }),
      P.num({ label: "(f)", marks: 1, stem: "Find the angle between the two tangents, in degrees.", value: 90, unit: "°", wrong: [45],
        explanation: t`$-\frac{3}{4} \times \frac{4}{3} = -1$, so the tangents are perpendicular: $90^\circ$.` }),
      P.num({ label: "(g)", marks: 2, stem: "The tangents touch the circle at P and Q. Find the area of the quadrilateral CPTQ, where C is the centre of the circle.", value: 25, unit: "units²", wrong: [12.5, 50],
        explanation: t`Angles at $P$, $T$ and $Q$ are right angles and $CP = CQ = TP = TQ = 5$, so $CPTQ$ is a square of side 5: area $25$. (Or $2 \times \frac{1}{2} \times 5 \times 5$.)` }),
    ],
    explanation: "Tangent length from Pythagoras; tangency condition from distance = radius; perpendicular gradients multiply to −1.",
    hints: ["Write the line through T in the form y + 2 = m(x − 9).", "Two gradients whose product is −1 are perpendicular."],
  });

  chk(4 + 9 - 20 < 0 ? 1 : 0, 1);
  b.tf({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The equation $x^2 + y^2 + 4x - 6y + 20 = 0$ represents a circle.`,
    answer: false,
    explanation: t`Completing the square: $(x + 2)^2 + (y - 3)^2 = 4 + 9 - 20 = -7$. A sum of squares cannot be negative, so no point satisfies the equation: it is not a circle ($g^2 + f^2 - c < 0$).`,
    hints: [t`Find $g^2 + f^2 - c$.`],
  });

  // x² + y² = 4 and (x − 5)² + (y − 12)² = 121: distance 13 = 2 + 11
  chk(Math.hypot(5, 12), 13); chk(2 + 11, 13);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`How are the circles $x^2 + y^2 = 4$ and $(x - 5)^2 + (y - 12)^2 = 121$ related?`,
    options: [
      ["They touch externally at one point.", t`Correct: the distance between the centres is $13 = 2 + 11$, the sum of the radii.`],
      ["They intersect at two distinct points.", t`That needs $11 - 2 < d < 11 + 2$, but $d = 13$ is exactly the sum of the radii.`],
      ["They touch internally at one point.", t`Internal touching needs $d = 11 - 2 = 9$.`],
      ["One circle lies inside the other.", t`That needs $d < 11 - 2 = 9$; here $d = 13$.`],
    ],
    answer: "A",
    explanation: t`Centres $(0, 0)$ and $(5, 12)$, radii 2 and 11. $d = \sqrt{25 + 144} = 13 = r_1 + r_2$, so they touch externally.`,
    hints: ["Compare the distance between the centres with the sum and the difference of the radii."],
  });

  b.card("FORMULA", "Circle, centre (a, b), radius r", t`$(x - a)^2 + (y - b)^2 = r^2$`);
  b.card("FORMULA", t`Centre and radius of $x^2 + y^2 + 2gx + 2fy + c = 0$`, t`Centre $(-g, -f)$, radius $\sqrt{g^2 + f^2 - c}$`, "Divide by the coefficient of x² first if it is not 1.");
  b.card("FACT", "Tangent and radius", "A tangent is perpendicular to the radius at the point of contact: tangent gradient = −1 ÷ radius gradient.");
  b.card("FACT", "Angle in a semicircle", t`An angle at the circumference standing on a diameter is $90^\circ$; a right angle at the circumference means the opposite side is a diameter.`);
  b.card("FACT", "Perpendicular bisector of a chord", "It passes through the centre: two such bisectors meet at the centre.");
  b.card("CONCEPT", "Line and circle: the discriminant", t`Substitute the line into the circle: $b^2 - 4ac > 0$ two points, $= 0$ tangent, $< 0$ no intersection.`);
  b.card("FORMULA", "Length of a tangent from T", t`$\sqrt{CT^2 - r^2}$, where $C$ is the centre`);
  b.card("CONCEPT", "Inside, on or outside?", t`Substitute the point into $(x - a)^2 + (y - b)^2$ and compare with $r^2$.`);
  b.card("FACT", "Two circles touch", t`Externally when $d = r_1 + r_2$; internally when $d = |r_1 - r_2|$ ($d$ = distance between centres).`);
});
