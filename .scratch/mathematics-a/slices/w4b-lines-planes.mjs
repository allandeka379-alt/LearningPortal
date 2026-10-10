// W4b: amaths.vectors.lines-planes (ZIMSEC only: Pure F6 6.2.2.3)
import { concept, P, t, chk, same, v3, deg } from "../lib.mjs";
import { f3, fd, NB, NBd, CB } from "../tables/w4b-kit.mjs";

const { asin, acos, abs, sqrt } = Math;

concept("amaths.vectors.lines-planes", { file: "vectors/lines-planes", keyPrefix: "vectors.lines-planes" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`A line has direction $\mathbf{b}$ and a plane has normal $\mathbf{n}$. Which formula gives the acute angle $\phi$ between the line and the plane?`,
    options: [
      [t`$\sin\phi = \dfrac{|\mathbf{b} \cdot \mathbf{n}|}{|\mathbf{b}||\mathbf{n}|}$`, t`Correct: the angle between $\mathbf{b}$ and the normal is $90° - \phi$, and $\cos(90° - \phi) = \sin\phi$.`],
      [t`$\cos\phi = \dfrac{|\mathbf{b} \cdot \mathbf{n}|}{|\mathbf{b}||\mathbf{n}|}$`, "This gives the angle between the line and the NORMAL, not the plane."],
      [t`$\sin\phi = \dfrac{|\mathbf{b} \times \mathbf{n}|}{|\mathbf{b}||\mathbf{n}|}$`, t`This is $\sin$ of the angle between $\mathbf{b}$ and $\mathbf{n}$, i.e. $\cos\phi$.`],
      [t`$\tan\phi = \dfrac{\mathbf{b} \cdot \mathbf{n}}{|\mathbf{b}|}$`, "This is not a standard result and does not give an angle."],
    ],
    answer: "A",
    explanation: t`$\mathbf{b} \cdot \mathbf{n} = |\mathbf{b}||\mathbf{n}|\cos(90° - \phi) = |\mathbf{b}||\mathbf{n}|\sin\phi$.`,
  });

  // q02
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If a line's direction $\mathbf{b}$ satisfies $\mathbf{b} \cdot \mathbf{n} = 0$, where $\mathbf{n}$ is the normal of a plane, then the line lies in the plane.`,
    answer: false,
    explanation: t`$\mathbf{b} \cdot \mathbf{n} = 0$ only shows the line is parallel to the plane. It lies IN the plane only if, in addition, one of its points satisfies the plane's equation; otherwise it never meets the plane.`,
  });

  // q03 distance point to plane
  const d3 = v3.planeDist([1, 2, 3], [2, 2, -1], 10);
  chk(d3, 7 / 3, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the perpendicular distance from the point $(1, 2, 3)$ to the plane $2x + 2y - z = 10$, correct to 3 significant figures.`,
    value: d3, wrong: [7, f3(7 / 9)],
    explanation: t`$\frac{|2(1) + 2(2) - 3 - 10|}{\sqrt{4 + 4 + 1}} = \frac{|-7|}{3} = \frac{7}{3} = ${f3(d3)}$. (Forgetting to divide by $|\mathbf{n}| = 3$ gives $7$.)`,
  });

  // q04 angle between planes
  const th4 = deg(acos(1 / 3));
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`Find the acute angle between the planes $x + y + z = 1$ and $x - y + z = 5$, in degrees correct to 1 decimal place.`,
    value: th4, unit: "°", wrong: [fd(90 - th4, 1)],
    explanation: t`$\mathbf{n}_1 \cdot \mathbf{n}_2 = 1 - 1 + 1 = 1$ and $|\mathbf{n}_1| = |\mathbf{n}_2| = \sqrt{3}$, so $\cos\theta = \frac{1}{3}$ and $\theta = ${fd(th4, 1)}°$.`,
  });

  // q05 intersection of a line and a plane
  const tt5 = (14 - (3 * 2 - 0 + 2 * 1)) / (3 * 1 - 3 + 2 * -1);
  chk(tt5, -3);
  const p5 = v3.add([2, 0, 1], v3.scale(tt5, [1, 3, -1]));
  same(p5, [-1, -9, 4]);
  chk(3 * p5[0] - p5[1] + 2 * p5[2], 14);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the coordinates of the point where the line $\mathbf{r} = (2\mathbf{i} + \mathbf{k}) + t(\mathbf{i} + 3\mathbf{j} - \mathbf{k})$ meets the plane $3x - y + 2z = 14$.`,
    template: "({{blank:x}}, {{blank:y}}, {{blank:z}})",
    blanks: [NB("x", -1, 5), NB("y", -9, 9), NB("z", 4, -2)],
    explanation: t`General point $(2 + t, 3t, 1 - t)$: $3(2 + t) - 3t + 2(1 - t) = 8 - 2t = 14$, so $t = -3$ and the point is $(-1, -9, 4)$. Check: $-3 + 9 + 8 = 14$.`,
    hints: ["Substitute the general point of the line into the plane.", "Solve for t, then substitute back."],
  });

  // q06 angle line–plane
  const ph6 = deg(asin(4 / 9));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the acute angle between the line $\mathbf{r} = (3\mathbf{i} - \mathbf{k}) + t(\mathbf{i} + 2\mathbf{j} + 2\mathbf{k})$ and the plane $2x - y + 2z = 5$, in degrees correct to 1 decimal place.`,
    value: ph6, unit: "°", wrong: [fd(deg(acos(4 / 9)), 1)],
    explanation: t`$\mathbf{b} \cdot \mathbf{n} = 2 - 2 + 4 = 4$, $|\mathbf{b}| = |\mathbf{n}| = 3$. $\sin\phi = \frac{4}{9}$, so $\phi = ${fd(ph6, 1)}°$. ($${fd(deg(acos(4 / 9)), 1)}°$ is the angle with the normal.)`,
    hints: ["Use sine, not cosine, for a line and a plane."],
  });

  // q07 line lies in plane
  chk(v3.dot([1, -1, 0], [1, 1, 3]), 0); chk(v3.dot([1, 1, 1], [1, 1, 3]), 5);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`How is the line $\mathbf{r} = (\mathbf{i} + \mathbf{j} + \mathbf{k}) + t(\mathbf{i} - \mathbf{j})$ related to the plane $x + y + 3z = 5$?`,
    options: [
      ["It lies in the plane", t`Correct: the direction is perpendicular to the normal ($1 - 1 + 0 = 0$) AND the point $(1, 1, 1)$ satisfies $1 + 1 + 3 = 5$.`],
      ["It is parallel to the plane but does not meet it", "That would need the point (1, 1, 1) NOT to satisfy the equation, but it does."],
      ["It meets the plane at exactly one point", t`Substituting gives $(1 + t) + (1 - t) + 3 = 5$, true for every $t$, not for one value.`],
      ["It is perpendicular to the plane", t`For that the direction would be parallel to the normal $(1, 1, 3)$.`],
    ],
    answer: "A",
    explanation: t`Substituting the general point $(1 + t, 1 - t, 1)$ gives $5 = 5$ for all $t$: every point of the line is in the plane.`,
    hints: ["Substitute the general point of the line into the plane."],
  });

  // q08 line of intersection
  const d8 = v3.cross([1, 1, -1], [2, -1, 1]);
  same(d8, [0, -3, -3]);
  chk(2 + -1 - 0, 1); chk(2 * 2 - -1 + 0, 5);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The planes $x + y - z = 1$ and $2x - y + z = 5$ meet in a line $L$. A direction vector of $L$ is $\mathbf{j} + c\mathbf{k}$. Find $c$, and the point of $L$ with $z = 0$.`,
    template: "c = {{blank:c}}; point with z = 0: x = {{blank:x}}, y = {{blank:y}}",
    blanks: [NB("c", 1, -1), NB("x", 2, 1), NB("y", -1, 1)],
    explanation: t`$(1, 1, -1) \times (2, -1, 1) = (0, -3, -3)$, parallel to $\mathbf{j} + \mathbf{k}$, so $c = 1$. With $z = 0$: $x + y = 1$ and $2x - y = 5$ give $x = 2$, $y = -1$. Check: $2 - 1 - 0 = 1$ and $4 + 1 + 0 = 5$.`,
    hints: ["The direction of L is the cross product of the normals.", "Set z = 0 and solve the two equations."],
  });

  // q09 reflection in a plane
  const t9 = (10 - v3.dot([1, 2, 2], [3, 1, -2])) / 9;
  chk(t9, 1);
  const F9 = v3.add([3, 1, -2], v3.scale(t9, [1, 2, 2]));
  same(F9, [4, 3, 0]);
  const R9 = v3.add([3, 1, -2], v3.scale(2 * t9, [1, 2, 2]));
  same(R9, [5, 5, 2]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the foot of the perpendicular from $P(3, 1, -2)$ to the plane $x + 2y + 2z = 10$, and the reflection of $P$ in the plane.`,
    template: "foot = ({{blank:a}}, {{blank:b}}, {{blank:c}}); reflection = ({{blank:d}}, {{blank:e}}, {{blank:f}})",
    blanks: [NB("a", 4, 3), NB("b", 3, 1), NB("c", 0, -2), NB("d", 5, 4), NB("e", 5, 3), NB("f", 2, 0)],
    explanation: t`The normal line $\mathbf{r} = (3, 1, -2) + t(1, 2, 2)$ meets the plane when $(3 + t) + 2(1 + 2t) + 2(-2 + 2t) = 10$, i.e. $1 + 9t = 10$, $t = 1$: foot $F = (4, 3, 0)$. Reflection: $t = 2$, giving $(5, 5, 2)$. (Distance $PF = 1 \times 3 = 3$.)`,
    hints: ["Move from P along the normal until you reach the plane.", "The reflection is twice as far along the normal."],
  });

  // q10 distance between parallel planes
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the distance between the parallel planes $2x - 3y + 6z = 4$ and $2x - 3y + 6z = 25$.`,
    value: 3, wrong: [21, 29 / 7],
    explanation: t`$|\mathbf{n}| = \sqrt{4 + 9 + 36} = 7$; distance $= \frac{|25 - 4|}{7} = 3$. ($21$ forgets to divide by $|\mathbf{n}|$; adding $25 + 4$ treats the planes as on opposite sides of the origin, which they are not.)`,
    hints: [t`Use $\frac{|d_1 - d_2|}{|\mathbf{n}|}$.`],
  });

  // q11 match
  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each task with the key calculation.",
    pairs: [
      ["Direction of the line of intersection of two planes", "cross product of the two normals"],
      ["Angle between two planes", "scalar product of the two normals"],
      ["Point where a line meets a plane", "substitute the line's general point into the plane"],
      ["Distance from a point to a plane", "|px₁ + qy₁ + sz₁ − d| ÷ |n|"],
    ],
    explanation: "Normals carry almost all the information about a plane: their scalar product gives angles, their cross product gives directions.",
  });

  // q12
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The acute angle between two planes is equal to the acute angle between their normal vectors.",
    answer: true,
    explanation: t`Turning both planes turns both normals by the same angle, so $\cos\theta = \frac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|}$ gives the angle between the planes.`,
  });

  // q13
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Two non-parallel planes have normals $\mathbf{n}_1$ and $\mathbf{n}_2$. Which vector gives the direction of their line of intersection?`,
    options: [
      [t`$\mathbf{n}_1 \times \mathbf{n}_2$`, "Correct: the line lies in both planes, so it is perpendicular to both normals."],
      [t`$\mathbf{n}_1 + \mathbf{n}_2$`, "The sum of the normals is not perpendicular to them in general."],
      [t`$\mathbf{n}_1 - \mathbf{n}_2$`, "The difference of the normals is not perpendicular to them in general."],
      [t`$\mathbf{n}_1 \cdot \mathbf{n}_2$`, "This is a scalar, used for the angle between the planes."],
    ],
    answer: "A",
    explanation: t`A direction perpendicular to both $\mathbf{n}_1$ and $\mathbf{n}_2$ is their vector product.`,
  });

  // q14 proof: line lies in plane
  chk(1 - 0 + 2, 3); chk(v3.dot([2, 1, -1], [1, -1, 1]), 0);
  b.proof({
    d: 3, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`Show that the line $\mathbf{r} = (\mathbf{i} + 2\mathbf{k}) + t(2\mathbf{i} + \mathbf{j} - \mathbf{k})$ lies in the plane $x - y + z = 3$.`,
    points: [
      "M1 substitutes the general point (1 + 2t, t, 2 − t) into the plane (or uses b · n and a point).",
      "A1 obtains (1 + 2t) − t + (2 − t) = 3 for all t (or b · n = 0 and the point (1, 0, 2) satisfies the plane).",
      "A1 concludes that every point of the line is in the plane.",
    ],
    modelAnswer: t`General point of the line: $(1 + 2t,\; t,\; 2 - t)$.
$$
(1 + 2t) - t + (2 - t) = 3
$$
This holds for every value of $t$, so every point of the line lies in the plane. (Equivalently: $(2, 1, -1) \cdot (1, -1, 1) = 0$ and $(1, 0, 2)$ satisfies $1 - 0 + 2 = 3$.)`,
    explanation: "Either substitute the general point, or show both b · n = 0 and that one point is in the plane.",
    hints: ["Write the general point of the line."],
  });

  // q15 explain
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Describe how to find the foot of the perpendicular from a point P to a plane without using the distance formula.",
    points: [
      "Form the line through P with direction the normal n of the plane: r = p + tn.",
      "Substitute its general point into the plane's equation, solve for t, and substitute back to get the foot F.",
    ],
    modelAnswer: "The perpendicular from P is along the normal, so write the line r = p + tn. Substituting (x, y, z) of this line into px + qy + sz = d gives one value of t; putting it back into the line gives the foot F, and |PF| is the distance.",
    explanation: "The perpendicular from a point to a plane runs along the normal.",
    hints: ["Which direction is perpendicular to the plane?"],
  });

  // q16 parallel condition
  chk(3 * 1 + 1 - 2 * 2, 0); chk(3 * 1 + 2 - 0, 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The line $\mathbf{r} = (\mathbf{i} + 2\mathbf{j}) + t(k\mathbf{i} + \mathbf{j} + 2\mathbf{k})$ is parallel to the plane $3x + y - 2z = 7$. Find $k$.`,
    value: 1, wrong: [-1, 3],
    explanation: t`Parallel means the direction is perpendicular to the normal: $3k + 1 - 4 = 0$, so $k = 1$. (The point $(1, 2, 0)$ gives $3 + 2 = 5 \ne 7$, so the line is parallel to the plane and does not lie in it.)`,
    hints: ["b · n = 0."],
  });

  // q17 struct 5
  const t17 = (21 - (0 + 1 - 2)) / (6 + 1 + 4);
  chk(t17, 2);
  const p17 = v3.add([0, 1, -2], v3.scale(t17, [3, 1, 4]));
  same(p17, [6, 3, 6]);
  const ph17 = deg(asin(11 / sqrt(26 * 6)));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The line $L$ has equation $\mathbf{r} = (\mathbf{j} - 2\mathbf{k}) + t(3\mathbf{i} + \mathbf{j} + 4\mathbf{k})$ and the plane $\Pi$ has equation $2x + y + z = 21$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the coordinates of the point where L meets Π.", template: "({{blank:x}}, {{blank:y}}, {{blank:z}})",
        blanks: [NB("x", 6, 3), NB("y", 3, 2), NB("z", 6, 2)],
        explanation: t`$2(3t) + (1 + t) + (-2 + 4t) = 11t - 1 = 21$, so $t = 2$: point $(6, 3, 6)$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the acute angle between L and Π, in degrees correct to 1 decimal place.", value: ph17, unit: "°", wrong: [fd(90 - ph17, 1)],
        explanation: t`$\mathbf{b} \cdot \mathbf{n} = 6 + 1 + 4 = 11$; $\sin\phi = \frac{11}{\sqrt{26}\sqrt{6}}$, $\phi = ${fd(ph17, 1)}°$.` }),
    ],
    explanation: "Substitute the general point for the intersection; use sine for the angle with a plane.",
    hints: ["Substitute (3t, 1 + t, −2 + 4t).", "sin φ = |b · n| / (|b||n|)."],
  });

  // q18 struct 13
  const th18 = deg(acos(14 / 15));
  same(v3.cross([1, 2, 2], [0, 3, 4]), [2, -4, 3]);
  chk(3 + 4 + 2, 9); chk(6 + 4, 10);
  const d18 = v3.planeDist([5, 6, -1], [1, 2, 2], 9);
  chk(d18, 2, 1e-12);
  const t18 = (9 - v3.dot([1, 2, 2], [5, 6, -1])) / 9;
  const F18 = v3.add([5, 6, -1], v3.scale(t18, [1, 2, 2]));
  chk(v3.dot([1, 2, 2], F18), 9, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The planes $\Pi_1$ and $\Pi_2$ have equations $x + 2y + 2z = 9$ and $3y + 4z = 10$ respectively. The point $A$ is $(5, 6, -1)$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the acute angle between Π₁ and Π₂, in degrees correct to 1 decimal place.", value: th18, unit: "°", wrong: [fd(90 - th18, 1)],
        explanation: t`$\mathbf{n}_1 \cdot \mathbf{n}_2 = 0 + 6 + 8 = 14$, $|\mathbf{n}_1| = 3$, $|\mathbf{n}_2| = 5$: $\cos\theta = \frac{14}{15}$, $\theta = ${fd(th18, 1)}°$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`The planes meet in the line $L$. A direction vector of $L$ is $2\mathbf{i} + p\mathbf{j} + q\mathbf{k}$. Find $p$ and $q$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [NB("p", -4, 4), NB("q", 3, -3)],
        explanation: t`$(1, 2, 2) \times (0, 3, 4) = (8 - 6,\; 0 - 4,\; 3 - 0) = (2, -4, 3)$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that the point $(3, 2, 1)$ lies on $L$, and write down a vector equation of $L$.`,
        points: ["M1 substitutes into both planes: 3 + 4 + 2 = 9 and 6 + 4 = 10.", "A1 r = (3i + 2j + k) + s(2i − 4j + 3k)."],
        modelAnswer: t`$\Pi_1$: $3 + 2(2) + 2(1) = 9$; $\Pi_2$: $3(2) + 4(1) = 10$. The point is in both planes, so it is on $L$:
$$
\mathbf{r} = (3\mathbf{i} + 2\mathbf{j} + \mathbf{k}) + s(2\mathbf{i} - 4\mathbf{j} + 3\mathbf{k})
$$`,
        explanation: "A point on the line of intersection must satisfy both plane equations." }),
      P.num({ label: "(d)", marks: 2, stem: "Find the perpendicular distance from A to Π₁.", value: d18, wrong: [6],
        explanation: t`$\frac{|5 + 12 - 2 - 9|}{3} = \frac{6}{3} = 2$.` }),
      P.fib({ label: "(e)", marks: 3, stem: "Find the coordinates of the foot of the perpendicular from A to Π₁, correct to 3 significant figures.", template: "({{blank:x}}, {{blank:y}}, {{blank:z}})",
        blanks: [NB("x", F18[0], 5), NB("y", F18[1], 6), NB("z", F18[2], -1)],
        explanation: t`Line $(5 + t, 6 + 2t, -1 + 2t)$ in $\Pi_1$: $15 + 9t = 9$, $t = -\frac{2}{3}$. Foot $= \left(\frac{13}{3}, \frac{14}{3}, -\frac{7}{3}\right) = (${f3(F18[0])}, ${f3(F18[1])}, ${f3(F18[2])})$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why the direction of L must be perpendicular to both normal vectors.",
        points: ["L lies in Π₁, so its direction is perpendicular to the normal of Π₁.", "L also lies in Π₂, so it is perpendicular to the normal of Π₂ as well; hence it is parallel to n₁ × n₂."],
        modelAnswer: "Every direction within a plane is perpendicular to that plane's normal. L is in both planes, so its direction is perpendicular to n₁ and to n₂, which is the direction of n₁ × n₂.",
        explanation: "Lines in a plane are perpendicular to its normal." }),
    ],
    explanation: "Normals give the angle (dot product) and the direction of intersection (cross product); the normal line from A gives the distance and the foot.",
    hints: ["n₁ = (1, 2, 2), n₂ = (0, 3, 4).", "The perpendicular from A runs along n₁."],
  });

  // ---------------------------------------------------------------- cards
  b.card("FORMULA", "Angle φ between a line (direction b) and a plane (normal n)", t`$\sin\phi = \dfrac{|\mathbf{b} \cdot \mathbf{n}|}{|\mathbf{b}||\mathbf{n}|}$`);
  b.card("FORMULA", "Angle θ between two planes", t`$\cos\theta = \dfrac{|\mathbf{n}_1 \cdot \mathbf{n}_2|}{|\mathbf{n}_1||\mathbf{n}_2|}$`);
  b.card("FORMULA", "Distance from (x₁, y₁, z₁) to the plane px + qy + sz = d", t`$\dfrac{|px_1 + qy_1 + sz_1 - d|}{\sqrt{p^2 + q^2 + s^2}}$`);
  b.card("CONCEPT", "Line and plane: substitute the general point", "One value of t: they meet at a point; no solution: parallel, no meeting; true for all t: the line lies in the plane.");
  b.card("CONCEPT", "Line of intersection of two planes", t`Direction $\mathbf{n}_1 \times \mathbf{n}_2$; a point by setting one coordinate to 0 and solving both plane equations.`);
  b.card("CONCEPT", "Foot of the perpendicular from P to a plane", t`Intersect the line $\mathbf{r} = \mathbf{p} + t\mathbf{n}$ with the plane; the reflection of P uses $2t$.`);
  b.card("FACT", "Line parallel to a plane", t`$\mathbf{b} \cdot \mathbf{n} = 0$; it lies in the plane only if one of its points also satisfies the plane's equation.`);
  b.card("FORMULA", "Distance between parallel planes r · n = d₁ and r · n = d₂", t`$\dfrac{|d_1 - d_2|}{|\mathbf{n}|}$`);
});
