// W4a: amaths.vectors.basics
import { concept, P, t, chk, same, v3, vec, deg, rad, ZM } from "../lib.mjs";
import { f3, d1, N, S, A } from "../tables/w4a-kit.mjs";

const { sqrt, hypot, atan2 } = Math;
const IJK = (u) => v3.ijk(u);

concept("amaths.vectors.basics", { file: "vectors/basics", keyPrefix: "vectors.basics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which of these quantities is a scalar?",
    options: [
      ["Speed", "Correct: speed has size only."],
      ["Displacement", "Displacement has a direction, so it is a vector."],
      ["Force", "A force has a direction, so it is a vector."],
      ["Velocity", "Velocity is speed in a given direction: a vector."],
    ],
    answer: "A",
    explanation: "Scalars: distance, speed, mass, time, energy. Vectors: displacement, velocity, acceleration, force, momentum.",
  });

  chk(v3.mag([2, -3, 6]), 7);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the magnitude of the vector $2\mathbf{i} - 3\mathbf{j} + 6\mathbf{k}$.`,
    value: 7, wrong: [5, 11],
    explanation: t`$\sqrt{2^2 + (-3)^2 + 6^2} = \sqrt{49} = 7$. (Adding the components gives 5, and adding their sizes gives 11: square, add, then take the root.)`,
  });

  const AB3 = v3.sub([3, -1, 5], [1, 4, -2]);
  same(AB3, [2, -5, 7]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The points $A$ and $B$ have position vectors $\mathbf{i} + 4\mathbf{j} - 2\mathbf{k}$ and $3\mathbf{i} - \mathbf{j} + 5\mathbf{k}$. Write $\overrightarrow{AB} = p\mathbf{i} + q\mathbf{j} + r\mathbf{k}$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [N("p", 2, "-2"), N("q", -5, "5"), N("r", 7, "-7")],
    explanation: t`$\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = ${IJK(AB3)}$. (Working out $\mathbf{a} - \mathbf{b}$ reverses every sign.)`,
  });

  const u4 = v3.scale(21 / 7, [2, -6, 3]);
  same(u4, [6, -18, 9]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false, daily: false,
    stem: t`Find the vector of magnitude $21$ in the same direction as $2\mathbf{i} - 6\mathbf{j} + 3\mathbf{k}$, in the form $p\mathbf{i} + q\mathbf{j} + r\mathbf{k}$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [N("p", 6, "42"), N("q", -18, "-126"), N("r", 9, "63")],
    explanation: t`$|2\mathbf{i} - 6\mathbf{j} + 3\mathbf{k}| = 7$, so the unit vector is $\frac{1}{7}(2\mathbf{i} - 6\mathbf{j} + 3\mathbf{k})$. Multiply by $21$: $${IJK(u4)}$. (Multiplying by 21 without dividing by 7 is the usual slip.)`,
  });

  const w5 = v3.sub(v3.scale(2, [1, 2, -1]), v3.scale(3, [2, 0, 1]));
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Given $\mathbf{a} = \mathbf{i} + 2\mathbf{j} - \mathbf{k}$ and $\mathbf{b} = 2\mathbf{i} + \mathbf{k}$, find $|2\mathbf{a} - 3\mathbf{b}|$, correct to 3 significant figures.`,
    value: v3.mag(w5), wrong: [2 * v3.mag([1, 2, -1]) - 3 * v3.mag([2, 0, 1]), v3.mag(v3.add(v3.scale(2, [1, 2, -1]), v3.scale(3, [2, 0, 1])))],
    explanation: t`$2\mathbf{a} - 3\mathbf{b} = (2 - 6)\mathbf{i} + 4\mathbf{j} + (-2 - 3)\mathbf{k} = ${IJK(w5)}$, magnitude $\sqrt{16 + 16 + 25} = \sqrt{57} = ${f3(v3.mag(w5))}$.`,
  });

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The vectors $p\mathbf{i} + 6\mathbf{j} - 4\mathbf{k}$ and $3\mathbf{i} + q\mathbf{j} + 2\mathbf{k}$ are parallel. Find $p$ and $q$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}",
    blanks: [N("p", -6, "6"), N("q", -3, "3")],
    explanation: t`The $\mathbf{k}$ components fix the multiple: $-4 = -2 \times 2$. So the first vector is $-2$ times the second: $p = -2 \times 3 = -6$ and $6 = -2q$, $q = -3$.`,
    hints: ["Find the scalar multiple from the components you know."],
  });

  const AB7 = [2, 3, 1];
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The points $A(1, 2, 3)$, $B(3, 5, 4)$ and $C(7, 11, k)$ are collinear. Find $k$.`,
    value: 6, wrong: [4, 7],
    explanation: t`$\overrightarrow{AB} = ${IJK(AB7)}$ and $\overrightarrow{AC} = 6\mathbf{i} + 9\mathbf{j} + (k - 3)\mathbf{k}$. Collinear means $\overrightarrow{AC} = 3\overrightarrow{AB}$, so $k - 3 = 3$ and $k = 6$.`,
    hints: [t`$\overrightarrow{AC}$ must be a multiple of $\overrightarrow{AB}$.`],
  });

  const D8 = v3.sub(v3.add([2, 1, 0], [6, 7, 2]), [5, 3, -1]);
  same(D8, [3, 5, 3]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`$ABCD$ is a parallelogram (vertices in that order) with $A(2, 1, 0)$, $B(5, 3, -1)$ and $C(6, 7, 2)$. Find the coordinates of $D$.`,
    template: "D = ({{blank:x}}, {{blank:y}}, {{blank:z}})",
    blanks: [N("x", 3, "9"), N("y", 5, "9"), N("z", 3, "1")],
    explanation: t`$\overrightarrow{AD} = \overrightarrow{BC} = (1, 4, 3)$, so $D = A + (1, 4, 3) = (3, 5, 3)$; equivalently $\mathbf{d} = \mathbf{a} + \mathbf{c} - \mathbf{b}$. ($(9, 9, 1)$ comes from $\mathbf{b} + \mathbf{c} - \mathbf{a}$, a different parallelogram.)`,
    hints: [t`In parallelogram $ABCD$, $\overrightarrow{AD} = \overrightarrow{BC}$.`],
  });

  const P9 = v3.add([4, -2, 8], v3.scale(0.25, v3.sub([12, 6, 0], [4, -2, 8])));
  same(P9, [6, 0, 6]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The points $A(4, -2, 8)$ and $B(12, 6, 0)$ are given. The point $P$ lies on $AB$ with $AP : PB = 1 : 3$. Find the coordinates of $P$.`,
    template: "P = ({{blank:x}}, {{blank:y}}, {{blank:z}})",
    blanks: [N("x", 6, "8"), N("y", 0, "2"), N("z", 6, "4")],
    explanation: t`$AP$ is $\frac{1}{4}$ of $AB$: $\mathbf{p} = \mathbf{a} + \frac{1}{4}(\mathbf{b} - \mathbf{a}) = (4, -2, 8) + \frac{1}{4}(8, 8, -8) = (6, 0, 6)$. ($(8, 2, 4)$ is the midpoint.)`,
    hints: ["P is one quarter of the way from A to B."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For any two vectors $\mathbf{a}$ and $\mathbf{b}$, $|\mathbf{a} + \mathbf{b}| = |\mathbf{a}| + |\mathbf{b}|$.`,
    answer: false,
    explanation: t`Equality holds only when $\mathbf{a}$ and $\mathbf{b}$ point the same way. For example $|\mathbf{i} + \mathbf{j}| = \sqrt{2}$, not $2$. In general $|\mathbf{a} + \mathbf{b}| \le |\mathbf{a}| + |\mathbf{b}|$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The vectors $2\mathbf{i} - 4\mathbf{j} + 6\mathbf{k}$ and $-\mathbf{i} + 2\mathbf{j} - 3\mathbf{k}$ are parallel.`,
    answer: true,
    explanation: t`$2\mathbf{i} - 4\mathbf{j} + 6\mathbf{k} = -2(-\mathbf{i} + 2\mathbf{j} - 3\mathbf{k})$: a negative multiple, so parallel but in opposite directions.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$OABC$ is a parallelogram, with vertices in that order. Which vector equals $\overrightarrow{OB}$?`,
    options: [
      [t`$\overrightarrow{OA} + \overrightarrow{OC}$`, "Correct: go from O to A, then along AB, which equals OC."],
      [t`$\overrightarrow{OA} - \overrightarrow{OC}$`, t`This is $\overrightarrow{CA}$, the other diagonal.`],
      [t`$\overrightarrow{OC} - \overrightarrow{OA}$`, t`This is $\overrightarrow{AC}$, the other diagonal.`],
      [t`$\tfrac{1}{2}(\overrightarrow{OA} + \overrightarrow{OC})$`, "This is the position vector of the centre, where the diagonals meet."],
    ],
    answer: "A",
    explanation: t`$\overrightarrow{OB} = \overrightarrow{OA} + \overrightarrow{AB}$ and $\overrightarrow{AB} = \overrightarrow{OC}$ in a parallelogram.`,
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: t`$A$ and $B$ have position vectors $\mathbf{a}$ and $\mathbf{b}$. What is the position vector of the midpoint of $AB$?`,
    options: [
      [t`$\tfrac{1}{2}(\mathbf{a} + \mathbf{b})$`, "Correct: start at A and go half of AB: a + ½(b − a)."],
      [t`$\tfrac{1}{2}(\mathbf{b} - \mathbf{a})$`, "This is half of the displacement AB, not a position vector."],
      [t`$\mathbf{a} + \mathbf{b}$`, "This is twice the midpoint's position vector."],
      [t`$\mathbf{b} - \tfrac{1}{2}\mathbf{a}$`, "This does not lie on AB in general."],
    ],
    answer: "A",
    explanation: t`$\mathbf{m} = \mathbf{a} + \tfrac{1}{2}(\mathbf{b} - \mathbf{a}) = \tfrac{1}{2}(\mathbf{a} + \mathbf{b})$.`,
  });

  const r14 = vec.polar(10, 30);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: true, applies: ZM,
    stem: t`A force of magnitude $10$ N acts at $30°$ above the direction of $\mathbf{i}$. Write it in the form $(x\mathbf{i} + y\mathbf{j})$ N, giving $x$ correct to 3 significant figures.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [S("x", r14[0], "5"), S("y", r14[1], "8.66")],
    explanation: t`Resolving: $x = 10\cos 30° = ${f3(r14[0])}$ and $y = 10\sin 30° = 5$.`,
  });

  const q15 = vec.polar(10, 120), s15 = vec.add([4, 3], q15);
  const ang15 = vec.angle(s15);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZM,
    stem: t`Two vectors act at a point: $\mathbf{p} = 4\mathbf{i} + 3\mathbf{j}$ and a vector $\mathbf{q}$ of magnitude $10$ at $120°$ to the direction of $\mathbf{i}$ (measured anticlockwise). Find the magnitude of $\mathbf{p} + \mathbf{q}$ (3 significant figures) and the angle it makes with $\mathbf{i}$, measured anticlockwise (degrees, 1 decimal place).`,
    template: "Magnitude = {{blank:m}}, angle = {{blank:a}}°",
    blanks: [S("m", vec.mag(s15), "15"), A("a", ang15, d1(180 - ang15))],
    explanation: t`$\mathbf{q} = 10\cos 120°\,\mathbf{i} + 10\sin 120°\,\mathbf{j} = -5\mathbf{i} + ${f3(q15[1])}\mathbf{j}$. So $\mathbf{p} + \mathbf{q} = -\mathbf{i} + ${f3(s15[1])}\mathbf{j}$, magnitude $${f3(vec.mag(s15))}$. It points into the second quadrant: angle $= 180° - \tan^{-1}\frac{${f3(s15[1])}}{1} = ${d1(ang15)}°$.`,
    hints: ["Resolve q into i and j components first.", "Sketch the resultant to choose the quadrant."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each piece of notation with its meaning.",
    pairs: [
      [t`$\overrightarrow{AB}$`, "The displacement from A to B"],
      [t`$|\mathbf{a}|$`, "The magnitude of a"],
      [t`$\hat{\mathbf{a}}$`, "The unit vector in the direction of a"],
      [t`$\mathbf{k}$`, "The unit vector along the z-axis"],
    ],
    explanation: "Vector notation: arrows or bold for vectors, modulus bars for magnitude, a hat for a unit vector.",
  });

  const A17 = [1, 0, 2], B17 = [3, 2, 3], C17 = [5, 0, 4];
  chk(v3.mag(v3.sub(B17, A17)), 3); chk(v3.mag(v3.sub(C17, B17)), 3); chk(v3.mag(v3.sub(C17, A17)) ** 2, 20, 1e-9);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The points $A(1, 0, 2)$, $B(3, 2, 3)$ and $C(5, 0, 4)$ form a triangle. Which describes it?`,
    options: [
      [t`Isosceles, with $AB = BC = 3$`, t`Correct: $AB = \sqrt{4 + 4 + 1} = 3$, $BC = \sqrt{4 + 4 + 1} = 3$, $AC = \sqrt{20}$.`],
      ["Equilateral", t`$AC = \sqrt{20} \ne 3$.`],
      [t`Right-angled at $B$`, t`$AB^2 + BC^2 = 18 \ne 20 = AC^2$.`],
      ["Scalene", "Two of the sides are equal."],
    ],
    answer: "A",
    explanation: "Compute the three side lengths from the displacement vectors.",
    hints: ["Find |AB|, |BC| and |AC|."],
  });

  const A18 = [2, -1, 4], B18 = [4, 3, 1], C18 = [8, 11, -5];
  same(v3.sub(C18, B18), v3.scale(2, v3.sub(B18, A18)));
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`The points $A$, $B$ and $C$ have position vectors $2\mathbf{i} - \mathbf{j} + 4\mathbf{k}$, $4\mathbf{i} + 3\mathbf{j} + \mathbf{k}$ and $8\mathbf{i} + 11\mathbf{j} - 5\mathbf{k}$. Show that $A$, $B$ and $C$ are collinear and find the ratio $AB : BC$.`,
    points: [
      t`M1 finds $\overrightarrow{AB} = 2\mathbf{i} + 4\mathbf{j} - 3\mathbf{k}$ and $\overrightarrow{BC} = 4\mathbf{i} + 8\mathbf{j} - 6\mathbf{k}$.`,
      t`A1 $\overrightarrow{BC} = 2\overrightarrow{AB}$, parallel with the common point $B$, so collinear.`,
      t`A1 $AB : BC = 1 : 2$.`,
    ],
    modelAnswer: t`$$
\overrightarrow{AB} = 2\mathbf{i} + 4\mathbf{j} - 3\mathbf{k}, \qquad \overrightarrow{BC} = 4\mathbf{i} + 8\mathbf{j} - 6\mathbf{k} = 2\overrightarrow{AB}
$$
$$
\overrightarrow{AB} \parallel \overrightarrow{BC} \text{ and both contain } B \Rightarrow A, B, C \text{ collinear}
$$
$$
AB : BC = 1 : 2
$$`,
    explanation: "Parallel vectors alone are not enough: they must share a point.",
    hints: ["Compare AB and BC."],
  });

  chk(2 ** 2 + 4 + (2 - 1) ** 2, 9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the positive value of $t$ for which $|t\mathbf{i} + 2\mathbf{j} + (t - 1)\mathbf{k}| = 3$.`,
    value: 2, wrong: [-1, 3],
    explanation: t`$t^2 + 4 + (t - 1)^2 = 9 \Rightarrow 2t^2 - 2t - 4 = 0 \Rightarrow t^2 - t - 2 = 0 \Rightarrow (t - 2)(t + 1) = 0$. The positive value is $t = 2$.`,
    hints: ["Square both sides: the magnitude squared is the sum of the squares of the components."],
  });

  // Struct 5
  const a20 = [2, 2, -1], b20 = [4, -1, 5], c20 = v3.sub(v3.scale(2, b20), a20);
  chk(v3.mag(v3.sub(b20, a20)), 7); same(c20, [6, -4, 11]);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`Relative to an origin $O$, the points $A$ and $B$ have position vectors $2\mathbf{i} + 2\mathbf{j} - \mathbf{k}$ and $4\mathbf{i} - \mathbf{j} + 5\mathbf{k}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the length AB.", value: 7, wrong: [sqrt(49 + 1)], explanation: t`$\overrightarrow{AB} = 2\mathbf{i} - 3\mathbf{j} + 6\mathbf{k}$, length $\sqrt{4 + 9 + 36} = 7$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "The point C is such that B is the midpoint of AC. Find the coordinates of C.", template: "C = ({{blank:x}}, {{blank:y}}, {{blank:z}})",
        blanks: [N("x", 6, "3"), N("y", -4, "0.5"), N("z", 11, "2")],
        explanation: t`$\mathbf{b} = \frac{1}{2}(\mathbf{a} + \mathbf{c})$, so $\mathbf{c} = 2\mathbf{b} - \mathbf{a} = ${IJK(c20)}$.` }),
    ],
    explanation: "Displacement = end minus start; the midpoint rule can be rearranged to find an end point.",
    hints: ["AB = b − a.", "Rearrange b = ½(a + c) for c."],
  });

  // Struct 12: trapezium OABC with OC parallel to AB
  const a = [2, 1, -2], bb = [6, 3, 2], c = [2, 1, 2];
  same(v3.sub(bb, a), v3.scale(2, c));
  const X = v3.scale(1 / 3, bb);
  const mu = 2 / 3;
  same(v3.add(a, v3.scale(mu, v3.sub(c, a))).map((x) => Math.round(x * 1e9) / 1e9), X.map((x) => Math.round(x * 1e9) / 1e9));
  const AX = v3.mag(v3.sub(X, a));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Relative to an origin $O$, the points $A$, $B$ and $C$ have position vectors $\mathbf{a} = 2\mathbf{i} + \mathbf{j} - 2\mathbf{k}$, $\mathbf{b} = 6\mathbf{i} + 3\mathbf{j} + 2\mathbf{k}$ and $\mathbf{c} = 2\mathbf{i} + \mathbf{j} + 2\mathbf{k}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $OABC$ is a trapezium with $OC$ parallel to $AB$, and state the ratio $OC : AB$.`,
        points: [t`M1 $\overrightarrow{AB} = 4\mathbf{i} + 2\mathbf{j} + 4\mathbf{k}$.`, t`A1 $\overrightarrow{AB} = 2\overrightarrow{OC}$, so $OC \parallel AB$ and $OC : AB = 1 : 2$.`],
        modelAnswer: t`$$
\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = 4\mathbf{i} + 2\mathbf{j} + 4\mathbf{k} = 2(2\mathbf{i} + \mathbf{j} + 2\mathbf{k}) = 2\overrightarrow{OC}
$$
$$
\text{so } OC \parallel AB \text{ (a trapezium) and } OC : AB = 1 : 2.
$$`,
        explanation: "One pair of parallel sides makes a trapezium." }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the lengths OA and AB.", template: "OA = {{blank:oa}}, AB = {{blank:ab}}", blanks: [N("oa", 3, "9"), N("ab", 6, "36")],
        explanation: t`$|\mathbf{a}| = \sqrt{4 + 1 + 4} = 3$; $|\overrightarrow{AB}| = \sqrt{16 + 4 + 16} = 6$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`The diagonals $OB$ and $AC$ meet at $X$, where $OX : XB = 1 : 2$. Find the position vector of $X$ as $p\mathbf{i} + q\mathbf{j} + r\mathbf{k}$ (give $r$ as a fraction or to 3 significant figures).`, template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
        blanks: [N("p", 2, "3"), N("q", 1, "1.5"), { id: "r", input: "number", accepted: ["2/3", "0.667"], tolerance: 0.0005, wrong: "1" }],
        explanation: t`$\overrightarrow{OX} = \frac{1}{3}\mathbf{b} = 2\mathbf{i} + \mathbf{j} + \frac{2}{3}\mathbf{k}$. (The ratio comes from the similar triangles $OXC$ and $BXA$, since $OC : AB = 1 : 2$.)` }),
      P.proof({ label: "(d)", marks: 3, stem: t`Verify that $X$ lies on $AC$, and find $AX : XC$.`,
        points: [t`M1 $\overrightarrow{AC} = \mathbf{c} - \mathbf{a} = 4\mathbf{k}$ and $\overrightarrow{AX} = \mathbf{x} - \mathbf{a} = \frac{8}{3}\mathbf{k}$.`, t`A1 $\overrightarrow{AX} = \frac{2}{3}\overrightarrow{AC}$, so $X$ lies on $AC$.`, t`A1 $AX : XC = 2 : 1$.`],
        modelAnswer: t`$$
\overrightarrow{AX} = \left(2\mathbf{i} + \mathbf{j} + \tfrac{2}{3}\mathbf{k}\right) - (2\mathbf{i} + \mathbf{j} - 2\mathbf{k}) = \tfrac{8}{3}\mathbf{k}
$$
$$
\overrightarrow{AC} = \mathbf{c} - \mathbf{a} = 4\mathbf{k}, \quad \overrightarrow{AX} = \tfrac{2}{3}\overrightarrow{AC}
$$
$$
X \text{ lies on } AC \text{ with } AX : XC = 2 : 1.
$$`,
        explanation: "Both diagonals are cut in the ratio 1 : 2 (from the shorter parallel side)." }),
      P.num({ label: "(e)", marks: 2, stem: "Find the length AX, correct to 3 significant figures.", value: AX, wrong: [4], explanation: t`$|\overrightarrow{AX}| = \frac{8}{3} = ${f3(AX)}$.` }),
    ],
    explanation: "Parallel vectors give the trapezium; ratios along the diagonals follow from similar triangles and are checked with vectors.",
    hints: ["Compare AB with OC.", "A point dividing OB in the ratio 1 : 2 has position vector ⅓b."],
  });

  b.card("DEFINITION", "Vector", "A quantity with magnitude and direction; a scalar has magnitude only.");
  b.card("FORMULA", "Displacement vector", t`$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$ ("end minus start").`);
  b.card("FORMULA", "Magnitude", t`$|x\mathbf{i} + y\mathbf{j} + z\mathbf{k}| = \sqrt{x^2 + y^2 + z^2}$`);
  b.card("FORMULA", "Unit vector", t`$\hat{\mathbf{a}} = \dfrac{\mathbf{a}}{|\mathbf{a}|}$`);
  b.card("CONCEPT", "Parallel vectors", t`$\mathbf{b} = k\mathbf{a}$ for a scalar $k$; with a common point, the points are collinear.`);
  b.card("FORMULA", "Midpoint", t`Midpoint of $AB$: $\tfrac{1}{2}(\mathbf{a} + \mathbf{b})$.`);
  b.card("CONCEPT", "Parallelogram OABC", t`$\overrightarrow{OB} = \overrightarrow{OA} + \overrightarrow{OC}$, i.e. $\overrightarrow{AB} = \overrightarrow{OC}$.`);
  b.card("DEFINITION", "Position vector", t`The vector $\overrightarrow{OA}$ from the origin to the point $A$.`);
  b.card("FORMULA", "Resolving (ZIMSEC Mechanics)", t`Magnitude $r$ at angle $\theta$ to $\mathbf{i}$: $r\cos\theta\,\mathbf{i} + r\sin\theta\,\mathbf{j}$.`, undefined, { applies: ZM });
});
