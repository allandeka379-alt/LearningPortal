// W4a: amaths.vectors.scalar-product
import { concept, P, t, chk, v3, vec, deg, rad } from "../lib.mjs";
import { f3, d1, N, S, A } from "../tables/w4a-kit.mjs";

const { sqrt, acos, sin } = Math;
const ang = (u, w) => v3.angle(u, w);

concept("amaths.vectors.scalar-product", { file: "vectors/scalar-product", keyPrefix: "vectors.scalar-product" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Non-zero vectors $\mathbf{a}$ and $\mathbf{b}$ satisfy $\mathbf{a} \cdot \mathbf{b} = 0$. What can you conclude?`,
    options: [
      ["The vectors are perpendicular", t`Correct: $|\mathbf{a}||\mathbf{b}|\cos\theta = 0$ with non-zero magnitudes forces $\cos\theta = 0$.`],
      ["The vectors are parallel", "Parallel vectors have a·b = ±|a||b|, which is not zero."],
      ["The vectors have equal magnitudes", "The scalar product says nothing about equal lengths."],
      ["One of the vectors is the zero vector", "The question says both vectors are non-zero."],
    ],
    answer: "A",
    explanation: t`$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta = 0 \Rightarrow \theta = 90°$.`,
  });

  const d2 = v3.dot([3, -2, 5], [4, 1, 2]);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find $(3\mathbf{i} - 2\mathbf{j} + 5\mathbf{k}) \cdot (4\mathbf{i} + \mathbf{j} + 2\mathbf{k})$.`,
    value: d2, wrong: [24, 0],
    explanation: t`$3(4) + (-2)(1) + 5(2) = 12 - 2 + 10 = ${d2}$.`,
  });

  const t3 = ang([1, 2, 2], [2, -1, 2]);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Find the angle between the vectors $\mathbf{i} + 2\mathbf{j} + 2\mathbf{k}$ and $2\mathbf{i} - \mathbf{j} + 2\mathbf{k}$, in degrees correct to 1 decimal place.`,
    value: t3, unit: "°", wrong: [180 - t3],
    explanation: t`Scalar product $= 2 - 2 + 4 = 4$; both magnitudes are $3$. $\cos\theta = \frac{4}{9}$, $\theta = ${d1(t3)}°$.`,
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the value of $k$ for which $k\mathbf{i} + 3\mathbf{j} - 2\mathbf{k}$ is perpendicular to $2\mathbf{i} + k\mathbf{j} + 5\mathbf{k}$.`,
    value: 2, wrong: [-2, 10],
    explanation: t`$2k + 3k - 10 = 0$, so $k = 2$. Check: $(2)(2) + (3)(2) + (-2)(5) = 0$.`,
    hints: ["Set the scalar product equal to zero."],
  });

  const t5 = vec.angle([2, 3]) - vec.angle([1, -4]);
  const t5b = deg(acos(vec.dot([2, 3], [1, -4]) / (vec.mag([2, 3]) * vec.mag([1, -4]))));
  chk(t5, t5b, 1e-9);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the angle between $2\mathbf{i} + 3\mathbf{j}$ and $\mathbf{i} - 4\mathbf{j}$, in degrees correct to 1 decimal place.`,
    value: t5b, unit: "°", wrong: [180 - t5b],
    explanation: t`Scalar product $= 2 - 12 = -10$; magnitudes $\sqrt{13}$ and $\sqrt{17}$. $\cos\theta = \frac{-10}{\sqrt{221}}$, so $\theta = ${d1(t5b)}°$ (obtuse, since the scalar product is negative).`,
    hints: ["A negative scalar product means an obtuse angle."],
  });

  const BA = v3.sub([1, 1, 0], [3, 2, 2]), BC = v3.sub([5, 1, 1], [3, 2, 2]);
  const t6 = ang(BA, BC);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The points $A(1, 1, 0)$, $B(3, 2, 2)$ and $C(5, 1, 1)$ are given. Find angle $ABC$, in degrees correct to 1 decimal place.`,
    value: t6, unit: "°", wrong: [180 - t6],
    explanation: t`Use vectors from $B$: $\overrightarrow{BA} = ${v3.ijk(BA)}$, $\overrightarrow{BC} = ${v3.ijk(BC)}$. Scalar product $= -4 + 1 + 2 = -1$; magnitudes $3$ and $\sqrt{6}$. $\cos ABC = \frac{-1}{3\sqrt{6}}$, angle $ABC = ${d1(t6)}°$. (Using $\overrightarrow{AB}$ instead of $\overrightarrow{BA}$ gives the supplement, $${d1(180 - t6)}°$.)`,
    hints: ["Both vectors must start at B."],
  });

  const area7 = 0.5 * v3.mag(BA) * v3.mag(BC) * sin(rad(t6));
  chk(area7, 0.5 * sqrt(53), 1e-9);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`For the points $A(1, 1, 0)$, $B(3, 2, 2)$ and $C(5, 1, 1)$, find the area of triangle $ABC$, correct to 3 significant figures.`,
    value: area7, wrong: [v3.mag(BA) * v3.mag(BC) / 2],
    explanation: t`With $\cos B = \frac{-1}{3\sqrt{6}}$: $\sin B = \sqrt{1 - \frac{1}{54}} = \sqrt{\frac{53}{54}}$. Area $= \frac{1}{2}(3)(\sqrt{6})\sqrt{\frac{53}{54}} = \frac{1}{2}\sqrt{53} = ${f3(area7)}$.`,
    hints: ["Area = ½ |BA| |BC| sin B.", "Find sin B from cos B exactly."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For every vector $\mathbf{a}$, $\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2$.`,
    answer: true,
    explanation: t`The angle between $\mathbf{a}$ and itself is $0°$, so $\mathbf{a} \cdot \mathbf{a} = |\mathbf{a}|^2\cos 0° = |\mathbf{a}|^2$; in components, $a_1^2 + a_2^2 + a_3^2$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $\mathbf{a} \cdot \mathbf{b} < 0$, the angle between $\mathbf{a}$ and $\mathbf{b}$ is acute.`,
    answer: false,
    explanation: t`$\cos\theta < 0$ means $90° < \theta \le 180°$: the angle is obtuse.`,
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Which of these scalar products equals 1?",
    options: [
      [t`$\mathbf{k} \cdot \mathbf{k}$`, "Correct: a unit vector with itself gives 1 × 1 × cos 0°."],
      [t`$\mathbf{i} \cdot \mathbf{j}$`, "i and j are perpendicular, so their scalar product is 0."],
      [t`$\mathbf{j} \cdot \mathbf{k}$`, "j and k are perpendicular, so their scalar product is 0."],
      [t`$\mathbf{i} \cdot (-\mathbf{i})$`, "The angle is 180°, so the product is −1."],
    ],
    answer: "A",
    explanation: t`$\mathbf{i} \cdot \mathbf{i} = \mathbf{j} \cdot \mathbf{j} = \mathbf{k} \cdot \mathbf{k} = 1$; mixed products are $0$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`To find angle $PQR$ with the scalar product, which pair of vectors should you use?`,
    options: [
      [t`$\overrightarrow{QP}$ and $\overrightarrow{QR}$`, "Correct: both start at the vertex Q."],
      [t`$\overrightarrow{PQ}$ and $\overrightarrow{QR}$`, "One vector points into Q and one out: this gives 180° minus the angle."],
      [t`$\overrightarrow{PQ}$ and $\overrightarrow{PR}$`, "These meet at P, giving angle QPR."],
      [t`$\overrightarrow{OP}$ and $\overrightarrow{OR}$`, "These give the angle POR at the origin."],
    ],
    answer: "A",
    explanation: "For the angle at a vertex, both vectors must point away from that vertex.",
    hints: ["Which point is the vertex of angle PQR?"],
  });

  const pr12 = v3.dot([4, 2, -1], [2, -1, 2]) / v3.mag([2, -1, 2]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the component of $\mathbf{a} = 4\mathbf{i} + 2\mathbf{j} - \mathbf{k}$ in the direction of $\mathbf{b} = 2\mathbf{i} - \mathbf{j} + 2\mathbf{k}$ (the length of the projection of $\mathbf{a}$ on $\mathbf{b}$). Give an exact fraction or 3 significant figures.`,
    value: pr12, wrong: [4, 4 / 9],
    explanation: t`$\mathbf{a} \cdot \hat{\mathbf{b}} = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{b}|} = \frac{8 - 2 - 2}{3} = \frac{4}{3}$.`,
    hints: ["Divide the scalar product by |b|."],
  });

  const OF = [6, 2, 3], OB = [6, 2, 0], t13 = ang(OF, OB);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A cuboid has one vertex at the origin $O$ and edges of lengths $6$, $2$ and $3$ along the $x$-, $y$- and $z$-axes. The opposite vertex is $F(6, 2, 3)$ and $B(6, 2, 0)$ is the vertex of the base below $F$. Find the angle between the diagonal $OF$ and the base diagonal $OB$, in degrees to 1 decimal place.`,
    value: t13, unit: "°", wrong: [90 - t13],
    explanation: t`$\overrightarrow{OF} \cdot \overrightarrow{OB} = 36 + 4 + 0 = 40$; $|\overrightarrow{OF}| = 7$, $|\overrightarrow{OB}| = \sqrt{40}$. $\cos\theta = \frac{40}{7\sqrt{40}} = \frac{\sqrt{40}}{7}$, $\theta = ${d1(t13)}°$.`,
    hints: ["Write both diagonals as vectors from O."],
  });

  const VA = [2, 2, -6], VB = [-2, 2, -6], t14 = ang(VA, VB);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A pyramid has a square base with vertices $A(2, 2, 0)$, $B(-2, 2, 0)$, $C(-2, -2, 0)$ and $D(2, -2, 0)$, and apex $V(0, 0, 6)$. Find angle $AVB$, in degrees correct to 1 decimal place.`,
    value: t14, unit: "°", wrong: [180 - t14],
    explanation: t`$\overrightarrow{VA} = 2\mathbf{i} + 2\mathbf{j} - 6\mathbf{k}$ and $\overrightarrow{VB} = -2\mathbf{i} + 2\mathbf{j} - 6\mathbf{k}$. Scalar product $= -4 + 4 + 36 = 36$; both magnitudes $\sqrt{44}$. $\cos AVB = \frac{36}{44}$, angle $AVB = ${d1(t14)}°$.`,
    hints: ["Use vectors from the apex V."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each statement about non-zero vectors a and b with its meaning.",
    pairs: [
      [t`$\mathbf{a} \cdot \mathbf{b} = 0$`, "a and b are perpendicular"],
      [t`$\mathbf{a} \cdot \mathbf{b} > 0$`, "The angle between a and b is acute"],
      [t`$\mathbf{a} \cdot \mathbf{b} < 0$`, "The angle between a and b is obtuse"],
      [t`$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|$`, "a and b point in the same direction"],
    ],
    explanation: t`All follow from $\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$.`,
  });

  const A16 = [3, 1, 2], B16 = [1, 2, 0], C16 = [1, 4, 1];
  const BA16 = v3.sub(A16, B16), BC16 = v3.sub(C16, B16);
  chk(v3.dot(BA16, BC16), 0); chk(v3.mag(BA16), 3); chk(v3.mag(BC16), sqrt(5));
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`The points $A(3, 1, 2)$, $B(1, 2, 0)$ and $C(1, 4, 1)$ are given. Show that triangle $ABC$ has a right angle at $B$, and that its area is $\dfrac{3\sqrt{5}}{2}$.`,
    points: [
      t`M1 finds $\overrightarrow{BA} = 2\mathbf{i} - \mathbf{j} + 2\mathbf{k}$ and $\overrightarrow{BC} = 2\mathbf{j} + \mathbf{k}$.`,
      t`A1 $\overrightarrow{BA} \cdot \overrightarrow{BC} = 0 - 2 + 2 = 0$, so angle $ABC = 90°$.`,
      t`M1 lengths $BA = 3$ and $BC = \sqrt{5}$.`,
      t`A1 area $= \frac{1}{2} \times 3 \times \sqrt{5} = \frac{3\sqrt{5}}{2}$.`,
    ],
    modelAnswer: t`$$
\overrightarrow{BA} = 2\mathbf{i} - \mathbf{j} + 2\mathbf{k}, \qquad \overrightarrow{BC} = 2\mathbf{j} + \mathbf{k}
$$
$$
\overrightarrow{BA} \cdot \overrightarrow{BC} = 0 - 2 + 2 = 0 \Rightarrow \angle ABC = 90°
$$
$$
\text{Area} = \tfrac{1}{2}|\overrightarrow{BA}||\overrightarrow{BC}| = \tfrac{1}{2}(3)(\sqrt{5}) = \frac{3\sqrt{5}}{2}
$$`,
    explanation: "A zero scalar product proves the right angle; the two perpendicular sides then give the area directly.",
    hints: ["Use vectors starting at B."],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Vectors $\mathbf{a}$ and $\mathbf{b}$ have $|\mathbf{a}| = 4$, $|\mathbf{b}| = 5$ and $\mathbf{a} \cdot \mathbf{b} = 10$. What is the angle between them?`,
    options: [
      [t`$60°$`, t`Correct: $\cos\theta = \frac{10}{20} = \frac{1}{2}$.`],
      [t`$30°$`, t`$\cos 30° = \frac{\sqrt{3}}{2}$, not $\frac{1}{2}$; this mixes up sine and cosine.`],
      [t`$120°$`, "A positive scalar product gives an acute angle."],
      [t`$90°$`, "Perpendicular vectors would have a scalar product of 0."],
    ],
    answer: "A",
    explanation: t`$\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}||\mathbf{b}|} = \frac{10}{4 \times 5}$.`,
  });

  // Struct 5: right angle at A
  const A19 = [2, 1, 3], B19 = [4, 0, 5], C19 = [3, 3, 3];
  const AB19 = v3.sub(B19, A19), AC19 = v3.sub(C19, A19);
  chk(v3.dot(AB19, AC19), 0);
  const area19 = 0.5 * v3.mag(AB19) * v3.mag(AC19), angB = ang(v3.sub(A19, B19), v3.sub(C19, B19));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The points $A(2, 1, 3)$, $B(4, 0, 5)$ and $C(3, 3, 3)$ are given.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that angle $BAC = 90°$.`, points: [t`M1 $\overrightarrow{AB} = 2\mathbf{i} - \mathbf{j} + 2\mathbf{k}$, $\overrightarrow{AC} = \mathbf{i} + 2\mathbf{j}$.`, t`A1 scalar product $2 - 2 + 0 = 0$, so the angle is $90°$.`],
        modelAnswer: t`$$
\overrightarrow{AB} \cdot \overrightarrow{AC} = (2)(1) + (-1)(2) + (2)(0) = 0 \Rightarrow \angle BAC = 90°
$$`, explanation: "Zero scalar product ⇒ perpendicular." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the area of triangle ABC, correct to 3 significant figures.", value: area19, wrong: [2 * area19], explanation: t`$AB = 3$, $AC = \sqrt{5}$, area $= \frac{1}{2}(3)\sqrt{5} = ${f3(area19)}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find angle ABC, in degrees correct to 1 decimal place.", value: angB, unit: "°", wrong: [90 - angB], explanation: t`$\tan ABC = \frac{AC}{AB} = \frac{\sqrt{5}}{3}$, so angle $ABC = ${d1(angB)}°$ (or use $\overrightarrow{BA} \cdot \overrightarrow{BC} = 9$ with $|\overrightarrow{BC}| = \sqrt{14}$).` }),
    ],
    explanation: "A zero scalar product gives the right angle; right-angled trigonometry finishes the triangle.",
    hints: ["Use vectors starting at A for angle BAC."],
  });

  // Struct 13: pyramid with rectangular base
  const O = [0, 0, 0], Ap = [6, 0, 0], Bp = [6, 4, 0], Cp = [0, 4, 0], V = [3, 2, 5];
  const VA20 = v3.sub(Ap, V), VB20 = v3.sub(Bp, V), angAVB = ang(VA20, VB20);
  const angVAO = ang(v3.sub(V, Ap), v3.sub(O, Ap));
  const VC = v3.sub(Cp, V), angBase = ang(VC, [VC[0], VC[1], 0]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A pyramid $OABCV$ has a rectangular base $O(0, 0, 0)$, $A(6, 0, 0)$, $B(6, 4, 0)$, $C(0, 4, 0)$ and apex $V(3, 2, 5)$, with distances in metres. Give angles in degrees to 1 decimal place and lengths to 3 significant figures.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the length of the edge VA.", value: v3.mag(VA20), unit: "m", wrong: [38], explanation: t`$\overrightarrow{VA} = 3\mathbf{i} - 2\mathbf{j} - 5\mathbf{k}$, length $\sqrt{38} = ${f3(v3.mag(VA20))}$ m.` }),
      P.proof({ label: "(b)", marks: 2, stem: "Show that triangle VAB is isosceles.", points: [t`M1 $\overrightarrow{VB} = 3\mathbf{i} + 2\mathbf{j} - 5\mathbf{k}$.`, t`A1 $|\overrightarrow{VB}| = \sqrt{38} = |\overrightarrow{VA}|$, so $VA = VB$.`],
        modelAnswer: t`$$
|\overrightarrow{VA}| = \sqrt{9 + 4 + 25} = \sqrt{38}, \qquad |\overrightarrow{VB}| = \sqrt{9 + 4 + 25} = \sqrt{38}
$$
$$
VA = VB \Rightarrow \triangle VAB \text{ is isosceles.}
$$`, explanation: "The apex is above the centre of the rectangle, so all four slant edges are equal." }),
      P.num({ label: "(c)", marks: 3, stem: "Find angle AVB.", value: angAVB, unit: "°", wrong: [180 - angAVB], explanation: t`$\overrightarrow{VA} \cdot \overrightarrow{VB} = 9 - 4 + 25 = 30$; $\cos AVB = \frac{30}{38}$, angle $AVB = ${d1(angAVB)}°$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find angle VAO.", value: angVAO, unit: "°", wrong: [180 - angVAO], explanation: t`From $A$: $\overrightarrow{AV} = -3\mathbf{i} + 2\mathbf{j} + 5\mathbf{k}$, $\overrightarrow{AO} = -6\mathbf{i}$. Scalar product $18$; $\cos VAO = \frac{18}{6\sqrt{38}}$, angle $VAO = ${d1(angVAO)}°$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find the angle between the edge VC and the base OABC.", value: angBase, unit: "°", wrong: [90 - angBase], explanation: t`The base is horizontal, so the angle is between $\overrightarrow{VC} = -3\mathbf{i} + 2\mathbf{j} - 5\mathbf{k}$ and its horizontal part $-3\mathbf{i} + 2\mathbf{j}$: $\cos\theta = \frac{13}{\sqrt{38}\sqrt{13}} = \sqrt{\frac{13}{38}}$, so $\theta = ${d1(angBase)}°$.` }),
    ],
    explanation: "Angles in a solid: write the two edges at the vertex as vectors from that vertex, then use the scalar product.",
    hints: ["Use vectors that start at the vertex of the angle.", "For the angle with the horizontal base, compare the edge with its horizontal projection."],
  });

  b.card("DEFINITION", "Scalar (dot) product", t`$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$, a number.`);
  b.card("FORMULA", "Scalar product in components", t`$a_1b_1 + a_2b_2 + a_3b_3$`);
  b.card("FORMULA", "Angle between vectors", t`$\cos\theta = \dfrac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$`);
  b.card("FACT", "Perpendicular vectors", t`Non-zero $\mathbf{a}$, $\mathbf{b}$ are perpendicular $\iff \mathbf{a} \cdot \mathbf{b} = 0$.`);
  b.card("FACT", "Unit vector products", t`$\mathbf{i} \cdot \mathbf{i} = \mathbf{j} \cdot \mathbf{j} = \mathbf{k} \cdot \mathbf{k} = 1$; $\mathbf{i} \cdot \mathbf{j} = \mathbf{j} \cdot \mathbf{k} = \mathbf{k} \cdot \mathbf{i} = 0$.`);
  b.card("CONCEPT", "Angle at a vertex", "Use two vectors that both start at the vertex; one reversed vector gives 180° − θ.");
  b.card("FACT", "Sign of the scalar product", "Positive: acute angle; zero: right angle; negative: obtuse angle.");
  b.card("FORMULA", "Component of a in the direction of b", t`$\mathbf{a} \cdot \hat{\mathbf{b}} = \dfrac{\mathbf{a} \cdot \mathbf{b}}{|\mathbf{b}|}$`);
  b.card("FORMULA", "Area of a triangle from vectors", t`$\tfrac{1}{2}|\overrightarrow{AB}||\overrightarrow{AC}|\sin A$`);
});
