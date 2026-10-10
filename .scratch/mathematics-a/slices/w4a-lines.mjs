// W4a: amaths.vectors.lines
import { concept, P, t, chk, same, v3, ZP } from "../lib.mjs";
import { f3, d1, N, S } from "../tables/w4a-kit.mjs";

const { sqrt } = Math;
const IJK = (u) => v3.ijk(u);
const at = (a, b, s) => v3.add(a, v3.scale(s, b));

concept("amaths.vectors.lines", { file: "vectors/lines", keyPrefix: "vectors.lines" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`In the vector equation of a line $\mathbf{r} = \mathbf{a} + t\mathbf{b}$, what does $\mathbf{b}$ represent?`,
    options: [
      ["A direction vector of the line", "Correct: the line is parallel to b."],
      ["The position vector of a point on the line", "That is a; b gives the direction."],
      ["The position vector of a general point on the line", t`That is $\mathbf{r}$.`],
      ["The distance of the line from the origin", "b is a vector, not a distance; its length can be anything non-zero."],
    ],
    answer: "A",
    explanation: t`$\mathbf{a}$ fixes one point, $\mathbf{b}$ the direction, and $t$ picks out each point in turn.`,
  });

  const d2 = v3.sub([5, 1, 0], [2, -1, 4]);
  same(d2, [3, 2, -4]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A line passes through $A(2, -1, 4)$ and $B(5, 1, 0)$. Complete its vector equation $\mathbf{r} = 2\mathbf{i} - \mathbf{j} + 4\mathbf{k} + t(p\mathbf{i} + q\mathbf{j} + r\mathbf{k})$, using $\overrightarrow{AB}$ as the direction.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [N("p", 3, "7"), N("q", 2, "0"), N("r", -4, "4")],
    explanation: t`Direction $\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = ${IJK(d2)}$. (Adding the position vectors gives $7\mathbf{i} + 4\mathbf{k}$, which is not a direction along the line.)`,
  });

  const p3 = at([1, 3, -2], [2, -1, 3], 4);
  same(p3, [9, -1, 10]);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The point $(9, -1, 10)$ lies on the line $\mathbf{r} = \mathbf{i} + 3\mathbf{j} - 2\mathbf{k} + t(2\mathbf{i} - \mathbf{j} + 3\mathbf{k})$. Find the value of the parameter $t$ at this point.`,
    value: 4, wrong: [5, 9],
    explanation: t`$x$: $1 + 2t = 9$, so $t = 4$. Check: $y = 3 - 4 = -1$ and $z = -2 + 12 = 10$.`,
  });

  b.tf({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The point $(4, 1, 3)$ lies on the line $\mathbf{r} = 2\mathbf{i} + \mathbf{k} + t(\mathbf{i} + \mathbf{j} + \mathbf{k})$.`,
    answer: false,
    explanation: t`The $x$-coordinate needs $t = 2$, which gives the point $(4, 2, 3)$, not $(4, 1, 3)$. One value of $t$ must fit all three coordinates.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which line is parallel to $\mathbf{r} = \mathbf{i} + 5\mathbf{k} + t(2\mathbf{i} - 4\mathbf{j} + 6\mathbf{k})$?`,
    options: [
      [t`$\mathbf{r} = 3\mathbf{j} + s(-\mathbf{i} + 2\mathbf{j} - 3\mathbf{k})$`, t`Correct: $-\mathbf{i} + 2\mathbf{j} - 3\mathbf{k} = -\frac{1}{2}(2\mathbf{i} - 4\mathbf{j} + 6\mathbf{k})$.`],
      [t`$\mathbf{r} = 2\mathbf{i} - 4\mathbf{j} + 6\mathbf{k} + s(\mathbf{i} + 5\mathbf{k})$`, "This swaps the roles of the point and the direction."],
      [t`$\mathbf{r} = 3\mathbf{j} + s(\mathbf{i} + 2\mathbf{j} + 3\mathbf{k})$`, "The j component has the wrong sign, so this is not a multiple."],
      [t`$\mathbf{r} = 3\mathbf{j} + s(2\mathbf{i} + 4\mathbf{j} + 6\mathbf{k})$`, "The j component has the wrong sign."],
    ],
    answer: "A",
    explanation: "Parallel lines have direction vectors that are scalar multiples of each other (a negative multiple is fine).",
  });

  const L6 = v3.lines([2, 1, 0], [1, -1, 2], [-1, -2, 4], [2, 1, -1]);
  same(L6.kind, "intersect"); same(L6.point.map((x) => Math.round(x * 1e9) / 1e9), [3, 0, 2]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The lines $\mathbf{r} = 2\mathbf{i} + \mathbf{j} + s(\mathbf{i} - \mathbf{j} + 2\mathbf{k})$ and $\mathbf{r} = -\mathbf{i} - 2\mathbf{j} + 4\mathbf{k} + t(2\mathbf{i} + \mathbf{j} - \mathbf{k})$ intersect. Find the coordinates of the point of intersection.`,
    template: "({{blank:x}}, {{blank:y}}, {{blank:z}})",
    blanks: [N("x", 3, "1"), N("y", 0, "2"), N("z", 2, "4")],
    explanation: t`Components: $2 + s = -1 + 2t$, $1 - s = -2 + t$, $2s = 4 - t$. Adding the first two: $3 = -3 + 3t$, so $t = 2$ and $s = 1$. Third: $2(1) = 4 - 2$. Consistent. Point: $s = 1$ gives $(3, 0, 2)$.`,
    hints: ["Use different parameters, solve two equations and check the third."],
  });

  const t7 = v3.angle([1, 2, 2], [4, 0, 3]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the acute angle between the lines $\mathbf{r} = \mathbf{j} + s(\mathbf{i} + 2\mathbf{j} + 2\mathbf{k})$ and $\mathbf{r} = 3\mathbf{i} - \mathbf{k} + t(4\mathbf{i} + 3\mathbf{k})$, in degrees correct to 1 decimal place.`,
    value: t7, unit: "°", wrong: [90 - t7],
    explanation: t`Directions: $(1, 2, 2)$ and $(4, 0, 3)$. Scalar product $= 4 + 0 + 6 = 10$; magnitudes $3$ and $5$. $\cos\theta = \frac{2}{3}$, $\theta = ${d1(t7)}°$.`,
    hints: ["Use only the direction vectors."],
  });

  const t8 = v3.angle([1, -1, 2], [2, 1, -3]);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`Find the acute angle between lines with direction vectors $\mathbf{i} - \mathbf{j} + 2\mathbf{k}$ and $2\mathbf{i} + \mathbf{j} - 3\mathbf{k}$, in degrees correct to 1 decimal place.`,
    value: 180 - t8, unit: "°", wrong: [t8],
    explanation: t`Scalar product $= 2 - 1 - 6 = -5$; magnitudes $\sqrt{6}$ and $\sqrt{14}$. $\cos\theta = \frac{-5}{\sqrt{84}}$, $\theta = ${d1(t8)}°$, which is obtuse, so the acute angle between the lines is $${d1(180 - t8)}°$.`,
    hints: ["A negative scalar product gives the obtuse angle: subtract from 180°."],
  });

  same(v3.lines([1, 0, 2], [1, 1, 0], [0, 3, -1], [2, -1, 1]).kind, "skew");
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How are the lines $\mathbf{r} = \mathbf{i} + 2\mathbf{k} + s(\mathbf{i} + \mathbf{j})$ and $\mathbf{r} = 3\mathbf{j} - \mathbf{k} + t(2\mathbf{i} - \mathbf{j} + \mathbf{k})$ related?`,
    options: [
      ["They are skew", t`Correct: not parallel, and the equations $1 + s = 2t$, $s = 3 - t$, $2 = -1 + t$ give $t = 3$, $s = 0$, but then $1 \ne 6$.`],
      ["They intersect at one point", t`The $z$ and $y$ equations force $t = 3$, $s = 0$, which fails the $x$ equation.`],
      ["They are parallel", "The directions (1, 1, 0) and (2, −1, 1) are not multiples."],
      ["They are the same line", "Identical lines would have parallel directions."],
    ],
    answer: "A",
    explanation: "Not parallel and no common point means skew.",
    hints: ["Check the directions first, then try to solve for s and t."],
  });

  const F10 = v3.foot([5, 1, 0], [0, 1, 2], [1, 2, -2]);
  same(F10.foot.map((x) => Math.round(x * 1e9) / 1e9), [1, 3, 0]);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`Find the coordinates of the foot of the perpendicular from $P(5, 1, 0)$ to the line $\mathbf{r} = \mathbf{j} + 2\mathbf{k} + t(\mathbf{i} + 2\mathbf{j} - 2\mathbf{k})$.`,
    template: "({{blank:x}}, {{blank:y}}, {{blank:z}})",
    blanks: [N("x", 1, "5"), N("y", 3, "1"), N("z", 0, "2")],
    explanation: t`General point $F = (t, 1 + 2t, 2 - 2t)$, so $\overrightarrow{PF} = (t - 5, 2t, 2 - 2t)$. Perpendicular to the direction: $(t - 5) + 4t - 2(2 - 2t) = 9t - 9 = 0$, so $t = 1$ and $F = (1, 3, 0)$.`,
    hints: [t`Write $\overrightarrow{PF}$ in terms of $t$ and use $\overrightarrow{PF} \cdot \mathbf{b} = 0$.`],
  });

  b.num({
    d: 4, skill: "APPLICATION", calculator: true, applies: ZP,
    stem: t`Find the perpendicular distance from $P(5, 1, 0)$ to the line $\mathbf{r} = \mathbf{j} + 2\mathbf{k} + t(\mathbf{i} + 2\mathbf{j} - 2\mathbf{k})$, correct to 3 significant figures.`,
    value: F10.dist, wrong: [v3.mag(v3.sub([5, 1, 0], [0, 1, 2]))],
    explanation: t`The foot of the perpendicular is $F(1, 3, 0)$ (from $\overrightarrow{PF} \cdot \mathbf{b} = 0$, giving $t = 1$). $\overrightarrow{PF} = -4\mathbf{i} + 2\mathbf{j}$, so the distance is $\sqrt{20} = ${f3(F10.dist)}$. ($\sqrt{29}$ is the distance to the point $(0, 1, 2)$, which is not the nearest point.)`,
    hints: ["Find the foot of the perpendicular first."],
  });

  b.fib({
    d: 3, skill: "UNDERSTANDING", calculator: false, applies: ZP,
    stem: t`A line has Cartesian equations $\dfrac{x - 4}{3} = \dfrac{y + 2}{-1} = \dfrac{z}{5}$. Write it in the form $\mathbf{r} = \mathbf{a} + t\mathbf{b}$, with $\mathbf{a} = a_1\mathbf{i} + a_2\mathbf{j} + a_3\mathbf{k}$ and $\mathbf{b} = b_1\mathbf{i} + b_2\mathbf{j} + b_3\mathbf{k}$ read directly from the equations.`,
    template: "a = ({{blank:a1}}, {{blank:a2}}, {{blank:a3}}), b = ({{blank:b1}}, {{blank:b2}}, {{blank:b3}})",
    marks: 2,
    blanks: [N("a1", 4, "-4"), N("a2", -2, "2"), N("a3", 0, "5"), N("b1", 3, "4"), N("b2", -1, "1"), N("b3", 5, "0")],
    explanation: t`Each fraction equals $t$: $x = 4 + 3t$, $y = -2 - t$, $z = 5t$. So $\mathbf{a} = 4\mathbf{i} - 2\mathbf{j}$ and $\mathbf{b} = 3\mathbf{i} - \mathbf{j} + 5\mathbf{k}$. The signs of the point are the reverse of those in the numerators.`,
    hints: ["Set each fraction equal to t and rearrange."],
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Two straight lines in three dimensions that do not intersect must be parallel.",
    answer: false,
    explanation: "In three dimensions, non-parallel lines can miss each other: they are then skew. Only in a plane must non-intersecting lines be parallel.",
    hints: ["Think of a road on a bridge and a road passing underneath it."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Two lines have been investigated. Match each finding with the conclusion.",
    pairs: [
      ["Direction vectors are multiples; no common point", "Parallel (distinct) lines"],
      ["Directions not multiples; all three component equations satisfied", "The lines intersect"],
      ["Directions not multiples; the third component equation fails", "The lines are skew"],
      ["Direction vectors are multiples; a common point exists", "The same line"],
    ],
    explanation: "Test the directions first, then the component equations.",
  });

  same(v3.lines([2, 1, 0], [1, -1, 2], [1, 4, 3], [1, -2, 1]).kind, "skew");
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Show that the lines $\mathbf{r} = 2\mathbf{i} + \mathbf{j} + s(\mathbf{i} - \mathbf{j} + 2\mathbf{k})$ and $\mathbf{r} = \mathbf{i} + 4\mathbf{j} + 3\mathbf{k} + t(\mathbf{i} - 2\mathbf{j} + \mathbf{k})$ are skew.`,
    points: [
      "B1 states that the directions (1, −1, 2) and (1, −2, 1) are not multiples, so the lines are not parallel.",
      t`M1 writes the three equations: $2 + s = 1 + t$, $1 - s = 4 - 2t$, $2s = 3 + t$.`,
      t`M1 solves two of them: from the first and third, $t = 1 + s$, so $2s = 4 + s$, giving $s = 4$, $t = 5$.`,
      t`A1 substitutes in the second: $1 - 4 = -3$ but $4 - 10 = -6$; inconsistent, so the lines are skew.`,
    ],
    modelAnswer: t`$$
(1, -1, 2) \ne k(1, -2, 1) \Rightarrow \text{not parallel}
$$
$$
2 + s = 1 + t, \quad 1 - s = 4 - 2t, \quad 2s = 3 + t
$$
$$
t = 1 + s \Rightarrow 2s = 4 + s \Rightarrow s = 4, \; t = 5
$$
$$
1 - s = -3, \quad 4 - 2t = -6: \text{ not equal, so no common point; the lines are skew.}
$$`,
    explanation: "Skew = not parallel AND no point in common; both parts are needed.",
    hints: ["Check the directions first.", "Solve two equations, then test the third."],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The lines $\mathbf{r} = \mathbf{i} + 2\mathbf{j} + 3\mathbf{k} + s(\mathbf{i} + \mathbf{k})$ and $\mathbf{r} = 2\mathbf{i} - \mathbf{j} + a\mathbf{k} + t(\mathbf{j} + \mathbf{k})$ intersect. Find the value of the constant $a$.`,
    value: 1, wrong: [7, 4],
    explanation: t`$x$: $1 + s = 2$, so $s = 1$. $y$: $2 = -1 + t$, so $t = 3$. $z$: $3 + s = a + t$, so $4 = a + 3$ and $a = 1$.`,
    hints: ["The x and y equations fix s and t; the z equation then gives a."],
  });
  same(v3.lines([1, 2, 3], [1, 0, 1], [2, -1, 1], [0, 1, 1]).kind, "intersect");

  same(at([1, 2, 3], [2, 0, -1], 2), [5, 2, 1]);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`How are the lines $\mathbf{r} = \mathbf{i} + 2\mathbf{j} + 3\mathbf{k} + t(2\mathbf{i} - \mathbf{k})$ and $\mathbf{r} = 5\mathbf{i} + 2\mathbf{j} + \mathbf{k} + s(-4\mathbf{i} + 2\mathbf{k})$ related?`,
    options: [
      ["They are the same line", t`Correct: the directions are parallel ($-4\mathbf{i} + 2\mathbf{k} = -2(2\mathbf{i} - \mathbf{k})$) and $(5, 2, 1)$ is on the first line at $t = 2$.`],
      ["They are parallel and distinct", "They share the point (5, 2, 1), so they cannot be distinct parallel lines."],
      ["They intersect at exactly one point", "Parallel directions rule out a single intersection."],
      ["They are skew", "Skew lines are not parallel; these directions are multiples."],
    ],
    answer: "A",
    explanation: "Parallel directions plus a common point means the two equations describe one line.",
    hints: ["Are the directions multiples? Does a point of one line lie on the other?"],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which point lies on the line $\mathbf{r} = 2\mathbf{i} - \mathbf{k} + t(\mathbf{i} + 3\mathbf{j} + 2\mathbf{k})$?`,
    options: [
      [t`$(4, 6, 3)$`, t`Correct: $t = 2$ gives $(2 + 2, 0 + 6, -1 + 4)$.`],
      [t`$(3, 3, 2)$`, t`$t = 1$ gives $(3, 3, 1)$; the $z$-coordinate does not fit.`],
      [t`$(4, 6, 4)$`, t`$t = 2$ fits $x$ and $y$ but gives $z = 3$.`],
      [t`$(0, -6, -4)$`, t`$t = -2$ gives $(0, -6, -5)$.`],
    ],
    answer: "A",
    explanation: "Find t from one coordinate and check the other two.",
  });

  // Struct 5
  const A18 = [1, 2, -1], B18 = [3, 1, 1], C18 = [7, -1, 5];
  same(v3.sub(C18, A18), v3.scale(3, v3.sub(B18, A18)));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The line $l$ passes through $A(1, 2, -1)$ and $B(3, 1, 1)$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Write down a vector equation of $l$ and show that $C(7, -1, 5)$ lies on $l$.`,
        points: [t`B1 $\mathbf{r} = \mathbf{i} + 2\mathbf{j} - \mathbf{k} + t(2\mathbf{i} - \mathbf{j} + 2\mathbf{k})$ (or equivalent).`, t`B1 $t = 3$ gives $(7, -1, 5)$, checked in all three components.`],
        modelAnswer: t`$$
\mathbf{r} = \mathbf{i} + 2\mathbf{j} - \mathbf{k} + t(2\mathbf{i} - \mathbf{j} + 2\mathbf{k})
$$
$$
t = 3: \; (1 + 6, \; 2 - 3, \; -1 + 6) = (7, -1, 5) = C
$$`, explanation: "One value of t must fit all three coordinates." }),
      P.num({ label: "(b)", marks: 1, stem: "Find the ratio BC : AB, as a single number BC/AB.", value: 2, wrong: [3], explanation: t`$\overrightarrow{AC} = 3\overrightarrow{AB}$, so $BC = 2AB$ and $\frac{BC}{AB} = 2$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the length AC.", value: 9, wrong: [3], explanation: t`$|\overrightarrow{AB}| = \sqrt{4 + 1 + 4} = 3$, so $AC = 3 \times 3 = 9$.` }),
    ],
    explanation: "The parameter value measures position along the line in units of the direction vector.",
    hints: ["Use AB as the direction vector."],
  });

  // Struct 13
  const a1 = [1, -1, 2], d1v = [1, 2, -1], a2 = [1, 2, -3], d2v = [2, 1, 3];
  const L19 = v3.lines(a1, d1v, a2, d2v);
  same(L19.kind, "intersect"); same(L19.point.map((x) => Math.round(x * 1e9) / 1e9), [3, 3, 0]);
  const th19 = v3.angle(d1v, d2v);
  const Q = [4, 1, 3], F19 = v3.foot(Q, a1, d1v);
  same(F19.foot.map((x) => Math.round(x * 1e9) / 1e9), [2, 1, 1]);
  const Qr = v3.sub(v3.scale(2, F19.foot), Q).map((x) => Math.round(x * 1e9) / 1e9);
  same(Qr, [0, 1, -1]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The lines $l_1$ and $l_2$ have equations $\mathbf{r} = \mathbf{i} - \mathbf{j} + 2\mathbf{k} + s(\mathbf{i} + 2\mathbf{j} - \mathbf{k})$ and $\mathbf{r} = \mathbf{i} + 2\mathbf{j} - 3\mathbf{k} + t(2\mathbf{i} + \mathbf{j} + 3\mathbf{k})$. The point $Q$ has coordinates $(4, 1, 3)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Show that l₁ and l₂ intersect, and find the coordinates of their point of intersection P.", template: "P = ({{blank:x}}, {{blank:y}}, {{blank:z}})",
        blanks: [N("x", 3, "5"), N("y", 3, "4"), N("z", 0, "1")],
        explanation: t`$1 + s = 1 + 2t$, $-1 + 2s = 2 + t$, $2 - s = -3 + 3t$. From the first, $s = 2t$; then the second gives $4t - 1 = 2 + t$, $t = 1$, $s = 2$. Third: $2 - 2 = 0 = -3 + 3$. Consistent: $P = (3, 3, 0)$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the acute angle between l₁ and l₂, in degrees correct to 1 decimal place.", value: th19, unit: "°", wrong: [180 - th19], explanation: t`$(1, 2, -1) \cdot (2, 1, 3) = 2 + 2 - 3 = 1$; magnitudes $\sqrt{6}$ and $\sqrt{14}$. $\cos\theta = \frac{1}{\sqrt{84}}$, $\theta = ${d1(th19)}°$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Find the coordinates of the foot F of the perpendicular from Q to l₁.", template: "F = ({{blank:x}}, {{blank:y}}, {{blank:z}})",
        blanks: [N("x", 2, "4"), N("y", 1, "3"), N("z", 1, "0")],
        explanation: t`$F = (1 + s, -1 + 2s, 2 - s)$, $\overrightarrow{QF} = (s - 3, 2s - 2, -1 - s)$. $\overrightarrow{QF} \cdot (1, 2, -1) = s - 3 + 4s - 4 + 1 + s = 6s - 6 = 0$, so $s = 1$ and $F = (2, 1, 1)$.` }),
      P.fib({ label: "(d)", marks: 3, stem: "Find the coordinates of the reflection Q′ of Q in the line l₁.", template: "Q′ = ({{blank:x}}, {{blank:y}}, {{blank:z}})",
        blanks: [N("x", 0, "6"), N("y", 1, "1.5"), N("z", -1, "5")],
        explanation: t`$F$ is the midpoint of $QQ'$: $\mathbf{q}' = 2\mathbf{f} - \mathbf{q} = (4, 2, 2) - (4, 1, 3) = (0, 1, -1)$.` }),
    ],
    explanation: "Intersection by solving component equations, angles from directions, the foot from a zero scalar product, and reflection by doubling to the foot.",
    hints: ["Use different parameters for the two lines.", "The foot F makes QF perpendicular to the direction of l₁; F is the midpoint of QQ′."],
  });

  b.card("FORMULA", "Vector equation of a line", t`$\mathbf{r} = \mathbf{a} + t\mathbf{b}$: through $\mathbf{a}$, direction $\mathbf{b}$.`);
  b.card("FORMULA", "Line through two points", t`$\mathbf{r} = \mathbf{a} + t(\mathbf{b} - \mathbf{a})$`);
  b.card("DEFINITION", "Skew lines", "Lines in three dimensions that are not parallel and do not intersect.");
  b.card("CONCEPT", "Testing two lines", "Directions multiples → parallel. Otherwise solve two component equations and test the third: consistent → intersect, inconsistent → skew.");
  b.card("CONCEPT", "Angle between two lines", "Use the scalar product of the direction vectors; give the acute angle.");
  b.card("CONCEPT", "Foot of the perpendicular", t`Write $F$ with the parameter and solve $\overrightarrow{PF} \cdot \mathbf{b} = 0$.`);
  b.card("FACT", "Point on a line", "One value of the parameter must fit all three coordinates.");
  b.card("FORMULA", "Cartesian form (ZIMSEC)", t`$\dfrac{x - a_1}{b_1} = \dfrac{y - a_2}{b_2} = \dfrac{z - a_3}{b_3}$`, undefined, { applies: ZP });
  b.card("FACT", "Perpendicular distance (ZIMSEC)", t`The length $|\overrightarrow{PF}|$, where $F$ is the foot of the perpendicular from $P$.`, undefined, { applies: ZP });
});
