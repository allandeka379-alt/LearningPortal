// W2b: amaths.complex.loci
import { concept, P, t, chk, same, cx, rnd } from "../lib.mjs";

const { hypot, atan2, asin, sqrt, PI } = Math;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });

concept("amaths.complex.loci", { file: "complex/loci", keyPrefix: "complex.loci" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which describes the locus $|z - 2 - 5\mathrm{i}| = 3$ in an Argand diagram?`,
    options: [
      [t`A circle with centre $(2, 5)$ and radius 3`, t`Correct: $|z - (2 + 5\mathrm{i})| = 3$ means the distance from $2 + 5\mathrm{i}$ is 3.`],
      [t`A circle with centre $(-2, -5)$ and radius 3`, t`The centre is the number subtracted from $z$: $|z - a|$ has centre $a$.`],
      [t`A circle with centre $(2, 5)$ and radius 9`, "The radius is 3; 9 is the square of the radius in the Cartesian equation."],
      [t`A circle with centre $(2, -5)$ and radius 3`, t`$-5\mathrm{i}$ inside the modulus means the centre has imaginary part $+5$.`],
    ],
    answer: "A",
    explanation: t`Write the condition as $|z - a| = k$: centre $a = 2 + 5\mathrm{i}$, radius $k = 3$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`Which describes the locus $|z + 1| = |z - 3\mathrm{i}|$?`,
    options: [
      [t`The perpendicular bisector of the segment joining $-1$ and $3\mathrm{i}$`, t`Correct: $|z - (-1)| = |z - 3\mathrm{i}|$, equal distances from $-1$ and $3\mathrm{i}$.`],
      [t`The perpendicular bisector of the segment joining $1$ and $3\mathrm{i}$`, t`$|z + 1|$ is the distance from $-1$, not from $1$.`],
      [t`The perpendicular bisector of the segment joining $-1$ and $-3\mathrm{i}$`, t`$|z - 3\mathrm{i}|$ is the distance from $+3\mathrm{i}$.`],
      [t`The circle through $-1$ and $3\mathrm{i}$ with centre at the origin`, "Equal distances from two fixed points give a straight line, not a circle (and the two points are not equally far from O)."],
    ],
    answer: "A",
    explanation: t`$|z - a| = |z - b|$ is the set of points equidistant from $a$ and $b$: the perpendicular bisector of $ab$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`The locus $\arg(z - 2) = \frac{\pi}{3}$ includes the point $z = 2$.`,
    answer: false,
    explanation: t`At $z = 2$, $z - 2 = 0$ and $\arg 0$ is undefined. The locus is a half-line starting at $2$, with that end point excluded (drawn as an open circle).`,
  });

  // |2z − 6 + 4i| = 10 → |z − 3 + 2i| = 5
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The locus $|2z - 6 + 4\mathrm{i}| = 10$ is a circle. Find its radius.`,
    value: 5, wrong: [10, 20],
    explanation: t`$|2z - 6 + 4\mathrm{i}| = 2|z - 3 + 2\mathrm{i}|$, so $|z - (3 - 2\mathrm{i})| = 5$: centre $3 - 2\mathrm{i}$, radius 5. (10 forgets to divide by $|2|$.)`,
    hints: ["Take the factor 2 out of the modulus."],
  });

  for (const x of [-2, 0, 3, 7]) chk(hypot(x - 2, 0.5 * x + 1.5), hypot(x, 0.5 * x + 1.5 - 4));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the Cartesian equation of the locus $|z - 2| = |z - 4\mathrm{i}|$ in the form $y = mx + c$.`,
    template: "m = {{blank:m}}, c = {{blank:c}}",
    blanks: [D("m", 0.5, 0.001, "-2"), D("c", 1.5, 0.001, "3")],
    explanation: t`$(x - 2)^2 + y^2 = x^2 + (y - 4)^2 \Rightarrow -4x + 4 = -8y + 16 \Rightarrow y = \frac{1}{2}x + \frac{3}{2}$. Check: the midpoint $(1, 2)$ lies on it and the gradient $\frac{1}{2}$ is perpendicular to the segment's gradient $-2$.`,
    hints: [t`Put $z = x + \mathrm{i}y$, square both moduli and simplify.`],
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The locus $|z + 3 - \mathrm{i}| = 2$ is a circle. Give its centre and radius.`,
    template: "centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
    blanks: [N("a", -3, "3"), N("b", 1, "-1"), N("r", 2, "4")],
    explanation: t`$|z - (-3 + \mathrm{i})| = 2$: centre $(-3, 1)$, radius 2. Cartesian form: $(x + 3)^2 + (y - 1)^2 = 4$.`,
    hints: ["Rewrite as |z − a| = r."],
  });

  chk(cx.mod([6, 8]) - 4, 6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The point $z$ lies on the circle $|z - 6 - 8\mathrm{i}| = 4$. Find the least possible value of $|z|$.`,
    value: 6, wrong: [14, 4],
    explanation: t`The centre $6 + 8\mathrm{i}$ is $\sqrt{36 + 64} = 10$ from the origin. The nearest point of the circle is on the line from $O$ to the centre: $10 - 4 = 6$. (14 is the greatest value.)`,
    hints: ["Find the distance from O to the centre."],
  });

  const a8 = PI / 2 + asin(3 / 5);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The complex number $z$ satisfies $|z - 5\mathrm{i}| \le 3$. Find the greatest value of $\arg z$, in radians correct to 3 significant figures.`,
    value: a8, unit: "rad", wrong: [PI / 2 + Math.atan(3 / 5), PI / 2 - asin(3 / 5)],
    explanation: t`The disc has centre $(0, 5)$ and radius 3. The tangent from $O$ makes an angle $\sin^{-1}\frac{3}{5} = 0.6435$ with the imaginary axis (radius ⟂ tangent, hypotenuse 5). Greatest argument $\frac{\pi}{2} + 0.6435 = 2.21$. ($\tan^{-1}\frac{3}{5}$ wrongly treats the radius as perpendicular to the line $Oc$; $0.927$ is the least argument.)`,
    hints: ["Draw the tangent from O to the circle.", "The radius to the point of contact is perpendicular to the tangent."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which region of the Argand diagram is given by $|z - 1| < |z - 5|$?`,
    options: [
      [t`$\mathrm{Re}\, z < 3$`, t`Correct: points nearer to 1 than to 5 lie to the left of the bisector $x = 3$.`],
      [t`$\mathrm{Re}\, z > 3$`, t`These points are nearer to 5 than to 1.`],
      [t`$\mathrm{Im}\, z < 3$`, t`Both points are on the real axis, so the bisector is vertical, not horizontal.`],
      [t`$|z| < 3$`, "The boundary of an equal-distance condition is a straight line, not a circle."],
    ],
    answer: "A",
    explanation: t`The perpendicular bisector of $1$ and $5$ is $x = 3$; the inequality keeps the side containing $1$.`,
    hints: ["Find the perpendicular bisector first, then test the point 1."],
  });

  chk(atan2(5 - 0, 3 - -2), PI / 4);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The half-line $\arg(z + 2) = \frac{\pi}{4}$ meets the line $\mathrm{Re}\, z = 3$ at the point $P$. Find the complex number represented by $P$, in the form $x + \mathrm{i}y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 3, "-2"), N("y", 5, "1")],
    explanation: t`The half-line starts at $(-2, 0)$ with gradient $\tan\frac{\pi}{4} = 1$: $y = x + 2$ for $x > -2$. At $x = 3$, $y = 5$, so $P$ is $3 + 5\mathrm{i}$.`,
    hints: [t`$\arg(z + 2)$ is measured from the point $-2$.`],
  });

  // |z| = |z − 4 − 4i| → x + y = 4; least |z| = 4/√2
  const m11 = 4 / sqrt(2);
  for (const x of [0, 1, 3]) chk(hypot(x, 4 - x), hypot(x - 4, 4 - x - 4));
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The point $z$ moves on the locus $|z| = |z - 4 - 4\mathrm{i}|$. Find the least possible value of $|z|$, correct to 3 significant figures.`,
    value: m11, wrong: [4, sqrt(32)],
    explanation: t`The locus is the perpendicular bisector of $O$ and $4 + 4\mathrm{i}$: the line $x + y = 4$, through the midpoint $(2, 2)$. The nearest point to $O$ is that midpoint, so the least $|z| = \sqrt{8} = 2\sqrt{2} = 2.83$. ($\sqrt{32}$ is the whole distance from $O$ to $4 + 4\mathrm{i}$.)`,
    hints: ["The nearest point of the bisector to O is the midpoint of the segment."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each condition (a, b fixed complex numbers, r > 0) with its locus.",
    pairs: [
      [t`$|z - a| = r$`, "A circle with centre a"],
      [t`$|z - a| = |z - b|$`, "The perpendicular bisector of ab"],
      [t`$\arg(z - a) = \theta$`, "A half-line starting at a"],
      [t`$|z - a| \le r$`, "A disc including its boundary"],
    ],
    explanation: "Modulus conditions are distances; argument conditions are directions.",
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Which inequality describes the inside (not including the boundary) of the circle with centre $-2 + \mathrm{i}$ and radius 3?`,
    options: [
      [t`$|z + 2 - \mathrm{i}| < 3$`, t`Correct: $|z - (-2 + \mathrm{i})| < 3$.`],
      [t`$|z - 2 + \mathrm{i}| < 3$`, t`This is centred on $2 - \mathrm{i}$; subtracting the centre changes both signs.`],
      [t`$|z + 2 - \mathrm{i}| > 3$`, "This is the outside of the circle."],
      [t`$|z + 2 + \mathrm{i}| < 3$`, t`This is centred on $-2 - \mathrm{i}$.`],
    ],
    answer: "A",
    explanation: t`Inside a circle centre $a$, radius $r$: $|z - a| < r$. Here $z - a = z + 2 - \mathrm{i}$.`,
    hints: ["Write the condition as |z − a| < r and substitute a."],
  });

  for (const y of [-2, 0, 5]) chk(hypot(0 - 3, y), hypot(0 + 3, y));
  b.tf({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The locus $|z - 3| = |z + 3|$ is the imaginary axis.`,
    answer: true,
    explanation: t`It is the perpendicular bisector of $3$ and $-3$, which is the line $x = 0$: the imaginary axis.`,
    hints: ["Where are the points 3 and −3?"],
  });

  // |z − 1| = |z − 7| (x = 4) and |z| = 5 → 4 ± 3i
  chk(hypot(4, 3), 5); chk(hypot(4 - 1, 3), hypot(4 - 7, 3));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the point that lies on both loci $|z - 1| = |z - 7|$ and $|z| = 5$ and has positive imaginary part. Give it in the form $x + \mathrm{i}y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 4, "3"), N("y", 3, "4")],
    explanation: t`The bisector of $1$ and $7$ is $x = 4$. On $|z| = 5$: $16 + y^2 = 25$, $y = \pm 3$. The point with positive imaginary part is $4 + 3\mathrm{i}$.`,
    hints: ["The first locus is a vertical line."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`Describe fully the region $R$ of the Argand diagram defined by $|z - 2 - 2\mathrm{i}| \le 2$ and $\arg z \ge \frac{\pi}{4}$, as you would sketch it.`,
    points: [
      t`The disc with centre $(2, 2)$ and radius 2, boundary included (solid circle); it touches both axes.`,
      t`The half-line $\arg z = \frac{\pi}{4}$ from $O$ is the line $y = x$, which passes through the centre.`,
      t`$R$ is the half of the disc on or above the line $y = x$ (the side towards the imaginary axis), boundaries included.`,
    ],
    modelAnswer: "Draw a solid circle centre (2, 2), radius 2, touching both axes at (2, 0) and (0, 2). Draw the half-line y = x from the origin (open circle at O): it goes through the centre and cuts the circle at (2 − √2, 2 − √2) and (2 + √2, 2 + √2). R is the semicircular region on the upper-left side of y = x, including both boundaries.",
    explanation: "Draw each boundary, then keep the side each condition allows.",
    hints: ["Does the half-line pass through the centre of the circle?"],
  });

  // Struct 12: |z − 5 − 12i| = 6
  const c = [5, 12], r = 6, dc = cx.mod(c);
  chk(dc, 13);
  const near = c.map((v) => (v * (dc - r)) / dc);
  same(near.map((v) => Math.round(v * 1e6) / 1e6), [35 / 13, 84 / 13].map((v) => Math.round(v * 1e6) / 1e6));
  const amax = atan2(12, 5) + asin(r / dc);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The complex number $z$ satisfies $|z - 5 - 12\mathrm{i}| = 6$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "State the centre and radius of the circle on which z lies.", template: "centre ({{blank:a}}, {{blank:b}}), radius {{blank:r}}",
        blanks: [N("a", 5, "-5"), N("b", 12, "-12"), N("r", 6, "36")],
        explanation: t`$|z - (5 + 12\mathrm{i})| = 6$: centre $(5, 12)$, radius 6.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the greatest value of |z|.", value: dc + r, wrong: [18, 7],
        explanation: t`$|5 + 12\mathrm{i}| = 13$, so the farthest point is $13 + 6 = 19$ from $O$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the least value of |z|.", value: dc - r, wrong: [19, 6],
        explanation: t`$13 - 6 = 7$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the greatest value of arg z, in radians correct to 3 significant figures.", value: amax, unit: "rad", wrong: [atan2(12, 5) + Math.atan(r / dc), atan2(12, 5) - asin(r / dc)],
        explanation: t`$\arg(5 + 12\mathrm{i}) = \tan^{-1}\frac{12}{5} = 1.1760$. The tangent from $O$ makes angle $\sin^{-1}\frac{6}{13} = 0.4797$ with $Oc$, so the greatest argument is $1.1760 + 0.4797 = 1.66$.` }),
      P.fib({ label: "(e)", marks: 2, stem: "Find the point of the circle nearest to O, in the form x + iy, with x and y correct to 3 significant figures.", template: "x = {{blank:x}}, y = {{blank:y}}",
        blanks: [D("x", rnd(near[0], 2), 0.005, "5"), D("y", rnd(near[1], 2), 0.005, "12")],
        explanation: t`It lies on $Oc$ at distance 7: $\frac{7}{13}(5 + 12\mathrm{i}) = \frac{35}{13} + \frac{84}{13}\mathrm{i} = 2.69 + 6.46\mathrm{i}$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why the greatest value of arg z occurs where the half-line from O touches the circle.", points: ["As arg z increases from arg c, the half-line from O still meets the circle until it only just touches it.", "Beyond the tangent the half-line misses the circle, so the tangent direction gives the greatest argument."],
        modelAnswer: "A half-line from O at angle θ meets the circle only for θ between the two tangent directions. The greatest such θ is the upper tangent, where the half-line touches the circle at one point (radius perpendicular to the half-line).",
        explanation: "Extreme arguments come from tangents." }),
    ],
    explanation: "Distances from O run from |c| − r to |c| + r along the line Oc; extreme arguments are arg c ± sin⁻¹(r/|c|).",
    hints: ["Find |c| first.", "Use the right-angled triangle O, centre, point of contact."],
  });
  chk(near[0], 35 / 13); chk(near[1], 84 / 13);
  chk(Math.abs(35 / 13 - 2.69) < 0.005 ? 1 : 0, 1); chk(Math.abs(84 / 13 - 6.46) < 0.005 ? 1 : 0, 1);

  // Struct 13: |z − 4| = |z − 2i| → y = 2x − 3; with |z| = 3: −3i, 2.4 + 1.8i; least |z − 4| = √5
  for (const x of [0, 1, 2.5]) chk(hypot(x - 4, 2 * x - 3), hypot(x, 2 * x - 3 - 2));
  chk(hypot(0, -3), 3); chk(hypot(2.4, 2 * 2.4 - 3), 3);
  const dmin = Math.abs(2 * 4 - 0 - 3) / sqrt(5);
  chk(dmin, sqrt(5));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`In an Argand diagram, the locus $L$ is given by $|z - 4| = |z - 2\mathrm{i}|$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the Cartesian equation of L in the form y = mx + c.", template: "m = {{blank:m}}, c = {{blank:c}}",
        blanks: [N("m", 2, "-2"), N("c", -3, "3")],
        explanation: t`$(x - 4)^2 + y^2 = x^2 + (y - 2)^2 \Rightarrow -8x + 16 = -4y + 4 \Rightarrow y = 2x - 3$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Find the two points where $L$ meets the circle $|z| = 3$. Give the one with negative imaginary part first, each in the form $x + \mathrm{i}y$.`, template: "First: x = {{blank:a}}, y = {{blank:b}}. Second: x = {{blank:c}}, y = {{blank:d}}.",
        blanks: [N("a", 0, "3"), N("b", -3, "3"), D("c", 2.4, 0.001, "1.8"), D("d", 1.8, 0.001, "2.4")],
        explanation: t`$x^2 + (2x - 3)^2 = 9 \Rightarrow 5x^2 - 12x = 0 \Rightarrow x = 0$ or $x = 2.4$. So the points are $-3\mathrm{i}$ and $2.4 + 1.8\mathrm{i}$.` }),
      P.manual({ label: "(c)", marks: 3, stem: t`Describe the region defined by $|z| \le 3$ and $|z - 4| \ge |z - 2\mathrm{i}|$.`,
        points: ["The disc centre O, radius 3, boundary included.", "The side of L containing 2i (points at least as close to 2i as to 4), i.e. y ≥ 2x − 3.", "The region is the part of the disc on or above the line L, between the points −3i and 2.4 + 1.8i on the circle."],
        modelAnswer: "Draw the circle |z| = 3 (solid) and the line y = 2x − 3 (solid). The condition |z − 4| ≥ |z − 2i| keeps points on the same side as 2i, which is above L. The region is the larger part of the disc above L, cut off by the chord from −3i to 2.4 + 1.8i.",
        explanation: "Test the point 2i (or O) to choose the side of the bisector." }),
      P.num({ label: "(d)", marks: 4, stem: "Find the least value of |z − 4| for points z on L, correct to 3 significant figures.", value: dmin, wrong: [4, 3],
        explanation: t`This is the perpendicular distance from $(4, 0)$ to $2x - y - 3 = 0$: $\dfrac{|8 - 0 - 3|}{\sqrt{4 + 1}} = \dfrac{5}{\sqrt{5}} = \sqrt{5} = 2.24$. (Equivalently, $L$ bisects the segment from 4 to $2\mathrm{i}$, of length $\sqrt{20}$, at right angles, so the least distance is half of it.)`,
        hints: ["The shortest distance from a point to a line is along the perpendicular."] }),
    ],
    explanation: "Square the moduli for the bisector, substitute into the circle, and use the perpendicular distance for the least value.",
    hints: [t`Put $z = x + \mathrm{i}y$.`, "The least distance from a point to a line is the perpendicular distance."],
  });

  b.card("CONCEPT", "|z − a| as a distance", t`$|z - a|$ is the distance from the point $a$. Rewrite $|z + 2 - \mathrm{i}|$ as $|z - (-2 + \mathrm{i})|$.`);
  b.card("FACT", "Circle locus", t`$|z - a| = r$: circle, centre $a$, radius $r$; $|z - a| \le r$ is the disc including the boundary.`);
  b.card("FACT", "Perpendicular bisector locus", t`$|z - a| = |z - b|$: the perpendicular bisector of the segment from $a$ to $b$.`);
  b.card("FACT", "Half-line locus", t`$\arg(z - a) = \alpha$: half-line from $a$ at angle $\alpha$; the point $a$ is excluded.`);
  b.card("CONCEPT", "Dashed or solid boundaries", t`Strict inequalities ($<$, $>$) exclude the boundary (dashed); $\le$, $\ge$ include it (solid).`);
  b.card("FORMULA", "Range of |z| on a disc", t`For $|z - c| \le r$ with $O$ outside: $|c| - r \le |z| \le |c| + r$.`);
  b.card("FORMULA", "Extreme arguments on a disc", t`$\arg c \pm \sin^{-1}\dfrac{r}{|c|}$ (tangents from $O$; radius ⟂ tangent).`);
  b.card("CONCEPT", "Cartesian equation of a locus", t`Put $z = x + \mathrm{i}y$, write each modulus as a square root, square both sides and simplify.`);
  b.card("CONCEPT", "Coefficient of z", t`Divide it out: $|kz - a| = r \iff \left|z - \frac{a}{k}\right| = \frac{r}{|k|}$.`);
});
