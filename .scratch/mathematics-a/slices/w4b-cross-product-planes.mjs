// W4b: amaths.vectors.cross-product-planes (ZIMSEC only: Pure F6 6.2.2.3)
import { concept, P, t, chk, same, v3, deg } from "../lib.mjs";
import { f3, fd, NB, NBd } from "../tables/w4b-kit.mjs";

const { sqrt, asin } = Math;
const X = (a, b) => v3.cross(a, b);

concept("amaths.vectors.cross-product-planes", { file: "vectors/cross-product-planes", keyPrefix: "vectors.cross-product-planes" }, (b) => {
  // q01
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$\mathbf{a}$ and $\mathbf{b}$ are non-parallel, non-zero vectors. Which statement about $\mathbf{a} \times \mathbf{b}$ is true?`,
    options: [
      [t`It is perpendicular to both $\mathbf{a}$ and $\mathbf{b}$`, "Correct: the vector product is normal to the plane containing a and b."],
      ["It is a scalar", t`That is the scalar (dot) product $\mathbf{a} \cdot \mathbf{b}$; the cross product is a vector.`],
      [t`It is parallel to $\mathbf{a} + \mathbf{b}$`, t`$\mathbf{a} + \mathbf{b}$ lies in the plane of $\mathbf{a}$ and $\mathbf{b}$; the cross product is perpendicular to that plane.`],
      [t`Its magnitude is $|\mathbf{a}||\mathbf{b}|\cos\theta$`, t`The magnitude is $|\mathbf{a}||\mathbf{b}|\sin\theta$; $\cos\theta$ belongs to the scalar product.`],
    ],
    answer: "A",
    explanation: t`$\mathbf{a} \times \mathbf{b}$ is a vector of magnitude $|\mathbf{a}||\mathbf{b}|\sin\theta$, perpendicular to both $\mathbf{a}$ and $\mathbf{b}$ (right-hand rule).`,
  });

  // q02
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`For any vectors $\mathbf{a}$ and $\mathbf{b}$, $\mathbf{a} \times \mathbf{b} = \mathbf{b} \times \mathbf{a}$.`,
    answer: false,
    explanation: t`The vector product is anti-commutative: $\mathbf{b} \times \mathbf{a} = -(\mathbf{a} \times \mathbf{b})$. The two products have the same magnitude but opposite directions.`,
  });

  // q03 compute a cross product
  const c3 = X([3, 1, -2], [1, -1, 4]);
  same(c3, [2, -14, -4]);
  chk(v3.dot(c3, [3, 1, -2]), 0); chk(v3.dot(c3, [1, -1, 4]), 0);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find $(3\mathbf{i} + \mathbf{j} - 2\mathbf{k}) \times (\mathbf{i} - \mathbf{j} + 4\mathbf{k})$ in the form $p\mathbf{i} + q\mathbf{j} + r\mathbf{k}$.`,
    template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
    blanks: [NB("p", 2, -6), NB("q", -14, 14), NB("r", -4, 4)],
    explanation: t`$\mathbf{i}$: $(1)(4) - (-2)(-1) = 2$; $\mathbf{j}$: $(-2)(1) - (3)(4) = -14$; $\mathbf{k}$: $(3)(-1) - (1)(1) = -4$. So the product is $2\mathbf{i} - 14\mathbf{j} - 4\mathbf{k}$. Check: dotting with $3\mathbf{i} + \mathbf{j} - 2\mathbf{k}$ gives $6 - 14 + 8 = 0$. (A $q$ of $+14$ is the usual middle-sign slip.)`,
  });

  // q04 i × k
  same(X([1, 0, 0], [0, 0, 1]), [0, -1, 0]);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`What is $\mathbf{i} \times \mathbf{k}$?`,
    options: [
      [t`$-\mathbf{j}$`, t`Correct: $\mathbf{k} \times \mathbf{i} = \mathbf{j}$, so $\mathbf{i} \times \mathbf{k} = -\mathbf{j}$.`],
      [t`$\mathbf{j}$`, t`That is $\mathbf{k} \times \mathbf{i}$; reversing the order changes the sign.`],
      [t`$\mathbf{0}$`, t`$\mathbf{i}$ and $\mathbf{k}$ are perpendicular, not parallel, so their cross product is not zero.`],
      ["1", "This would be a scalar; the cross product of two vectors is a vector."],
    ],
    answer: "A",
    explanation: t`Cyclic order $\mathbf{i} \to \mathbf{j} \to \mathbf{k} \to \mathbf{i}$ gives positive products ($\mathbf{k} \times \mathbf{i} = \mathbf{j}$); against the cycle the sign is negative.`,
  });

  // q05 parallelogram area
  const c5 = X([1, 2, 2], [3, 0, 4]);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`A parallelogram has adjacent sides given by the vectors $\mathbf{i} + 2\mathbf{j} + 2\mathbf{k}$ and $3\mathbf{i} + 4\mathbf{k}$. Find its area, correct to 3 significant figures.`,
    value: v3.mag(c5), unit: "units²", wrong: [f3(v3.mag(c5) / 2), 15],
    explanation: t`$(\mathbf{i} + 2\mathbf{j} + 2\mathbf{k}) \times (3\mathbf{i} + 4\mathbf{k}) = 8\mathbf{i} + 2\mathbf{j} - 6\mathbf{k}$, so the area is $\sqrt{64 + 4 + 36} = \sqrt{104} = ${f3(v3.mag(c5))}$. (Half of this is the area of the triangle; $15 = 3 \times 5$ multiplies the side lengths, which is right only for a rectangle.)`,
  });

  // q06 triangle area
  const PQ = v3.sub([4, 3, 1], [2, 1, 0]), PR = v3.sub([1, 4, 2], [2, 1, 0]);
  const c6 = X(PQ, PR);
  same(c6, [1, -5, 8]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`Find the area of the triangle with vertices $P(2, 1, 0)$, $Q(4, 3, 1)$ and $R(1, 4, 2)$, correct to 3 significant figures.`,
    value: v3.mag(c6) / 2, unit: "units²", wrong: [f3(v3.mag(c6)), f3(v3.mag(X([4, 3, 1], [1, 4, 2])) / 2)],
    explanation: t`$\overrightarrow{PQ} = (2, 1, 1)$, $\overrightarrow{PR} = (-1, 3, 2)$; $\overrightarrow{PQ} \times \overrightarrow{PR} = (1, -5, 8)$ with magnitude $\sqrt{90}$. Area $= \frac{1}{2}\sqrt{90} = ${f3(v3.mag(c6) / 2)}$. (Crossing the position vectors of $Q$ and $R$ instead of the sides gives a wrong area.)`,
    hints: ["Use two sides from the same vertex.", "Take half the magnitude."],
  });

  // q07 plane through a point with given normal
  chk(v3.dot([2, -1, 4], [3, -2, 1]), 12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The plane $\Pi$ passes through $(3, -2, 1)$ and has normal vector $2\mathbf{i} - \mathbf{j} + 4\mathbf{k}$. Its Cartesian equation is $2x - y + 4z = d$. Find $d$.`,
    value: 12, wrong: [8, 4],
    explanation: t`$d = \mathbf{a} \cdot \mathbf{n} = 2(3) - (-2) + 4(1) = 6 + 2 + 4 = 12$. ($8$ comes from $-1 \times -2 = -2$, a sign slip.)`,
  });

  // q08 plane through three points
  const n8 = X(v3.sub([2, 0, 3], [1, 1, 0]), v3.sub([0, 3, 1], [1, 1, 0]));
  same(n8, [-7, -4, 1]);
  for (const p of [[1, 1, 0], [2, 0, 3], [0, 3, 1]]) chk(7 * p[0] + 4 * p[1] - p[2], 11);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the Cartesian equation of the plane through $A(1, 1, 0)$, $B(2, 0, 3)$ and $C(0, 3, 1)$, in the form $7x + by + cz = d$.`,
    template: "b = {{blank:b}}, c = {{blank:c}}, d = {{blank:d}}",
    blanks: [NB("b", 4, -4), NB("c", -1, 1), NB("d", 11, -11)],
    explanation: t`$\overrightarrow{AB} = (1, -1, 3)$, $\overrightarrow{AC} = (-1, 2, 1)$; $\overrightarrow{AB} \times \overrightarrow{AC} = (-7, -4, 1)$, so a normal is $(7, 4, -1)$. Then $d = 7(1) + 4(1) - 0 = 11$: $7x + 4y - z = 11$. Check $B$: $14 + 0 - 3 = 11$; $C$: $0 + 12 - 1 = 11$.`,
    hints: ["Find two direction vectors in the plane from A.", "Their cross product is a normal; multiply by −1 to make the x-coefficient 7."],
  });

  // q09 parametric to Cartesian
  const n9 = X([1, 1, 0], [0, 2, 1]);
  same(n9, [1, -1, 2]);
  chk(v3.dot(n9, [2, 0, 1]), 4);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The plane $\Pi$ has vector equation $\mathbf{r} = (2\mathbf{i} + \mathbf{k}) + \lambda(\mathbf{i} + \mathbf{j}) + \mu(2\mathbf{j} + \mathbf{k})$. Find its Cartesian equation in the form $x + ay + bz = d$.`,
    template: "a = {{blank:a}}, b = {{blank:b}}, d = {{blank:d}}",
    blanks: [NB("a", -1, 1), NB("b", 2, -2), NB("d", 4, 2)],
    explanation: t`Normal: $(1, 1, 0) \times (0, 2, 1) = (1, -1, 2)$. $d = (2, 0, 1) \cdot (1, -1, 2) = 2 + 0 + 2 = 4$. So $x - y + 2z = 4$.`,
    hints: ["The normal is the cross product of the two direction vectors."],
  });

  // q10 point on a plane
  for (const [p, v] of [[[2, 1, 3], 7], [[1, 2, 3], 2], [[3, 2, 0], 5], [[2, -1, 0], 8]]) chk(3 * p[0] - 2 * p[1] + p[2], v);
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Which point lies in the plane $3x - 2y + z = 7$?`,
    options: [
      [t`$(2, 1, 3)$`, t`Correct: $6 - 2 + 3 = 7$.`],
      [t`$(1, 2, 3)$`, t`$3 - 4 + 3 = 2 \ne 7$.`],
      [t`$(3, 2, 0)$`, t`$9 - 4 + 0 = 5 \ne 7$.`],
      [t`$(2, -1, 0)$`, t`$6 + 2 + 0 = 8 \ne 7$.`],
    ],
    answer: "A",
    explanation: "Substitute each point; only (2, 1, 3) satisfies the equation.",
  });

  // q11
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $\mathbf{a}$ and $\mathbf{b}$ are non-zero vectors with $\mathbf{a} \times \mathbf{b} = \mathbf{0}$, then $\mathbf{a}$ and $\mathbf{b}$ are parallel.`,
    answer: true,
    explanation: t`$|\mathbf{a} \times \mathbf{b}| = |\mathbf{a}||\mathbf{b}|\sin\theta = 0$ with non-zero lengths forces $\sin\theta = 0$, so $\theta = 0°$ or $180°$: the vectors are parallel.`,
  });

  // q12 angle from cross product magnitude
  const th12 = deg(asin(12 / 20));
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`Vectors $\mathbf{a}$ and $\mathbf{b}$ have $|\mathbf{a}| = 4$, $|\mathbf{b}| = 5$ and $|\mathbf{a} \times \mathbf{b}| = 12$. Find the acute angle between them, in degrees correct to 1 decimal place.`,
    value: th12, unit: "°", wrong: [fd(90 - th12, 1)],
    explanation: t`$|\mathbf{a} \times \mathbf{b}| = |\mathbf{a}||\mathbf{b}|\sin\theta$: $12 = 20\sin\theta$, so $\sin\theta = 0.6$ and $\theta = ${fd(th12, 1)}°$. ($${fd(90 - th12, 1)}°$ uses cosine, which belongs to the scalar product.)`,
  });

  // q13 match
  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each equation of a plane with its name.",
    pairs: [
      [t`$\mathbf{r} = \mathbf{a} + \lambda\mathbf{b} + \mu\mathbf{c}$`, "vector (parametric) form"],
      [t`$\mathbf{r} \cdot \mathbf{n} = d$`, "scalar-product (normal) form"],
      [t`$px + qy + sz = d$`, "Cartesian form"],
      [t`$x = 1 + \lambda,\; y = 2 + \mu,\; z = \lambda - \mu$`, "parametric equations"],
    ],
    explanation: t`All describe a plane: a point and two directions, or a point and a normal. The coefficients $(p, q, s)$ in Cartesian form are a normal vector.`,
  });

  // q14 proof: a × b perpendicular to a
  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`For $\mathbf{a} = a_1\mathbf{i} + a_2\mathbf{j} + a_3\mathbf{k}$ and $\mathbf{b} = b_1\mathbf{i} + b_2\mathbf{j} + b_3\mathbf{k}$, show that $\mathbf{a} \cdot (\mathbf{a} \times \mathbf{b}) = 0$, and state what this shows.`,
    points: [
      "M1 writes a × b = (a₂b₃ − a₃b₂, a₃b₁ − a₁b₃, a₁b₂ − a₂b₁).",
      "A1 expands a · (a × b) and shows every term cancels to 0.",
      "B1 concludes a × b is perpendicular to a.",
    ],
    modelAnswer: t`$$
\mathbf{a} \cdot (\mathbf{a} \times \mathbf{b}) = a_1(a_2b_3 - a_3b_2) + a_2(a_3b_1 - a_1b_3) + a_3(a_1b_2 - a_2b_1)
$$
$$
= a_1a_2b_3 - a_1a_3b_2 + a_2a_3b_1 - a_1a_2b_3 + a_1a_3b_2 - a_2a_3b_1 = 0
$$
The scalar product is zero, so $\mathbf{a} \times \mathbf{b}$ is perpendicular to $\mathbf{a}$ (and similarly to $\mathbf{b}$).`,
    explanation: "Expand and pair the six terms; each appears once with each sign.",
    hints: ["Write out the components of a × b first."],
  });

  // q15 explain
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why the points $A(1, 2, -1)$, $B(3, 1, 2)$ and $C(5, 0, 5)$ do not determine a unique plane.`,
    points: [
      "AB = (2, −1, 3) and AC = (4, −2, 6) = 2AB, so AB × AC = 0 (the vectors are parallel).",
      "So A, B and C are collinear, and infinitely many planes contain the line through them; there is no unique normal.",
    ],
    modelAnswer: "AC = 2AB, so the three points lie on one straight line. The cross product AB × AC is the zero vector and gives no normal; any plane containing that line passes through all three points.",
    explanation: "A plane needs three non-collinear points (two non-parallel directions).",
    hints: ["Compare AB and AC."],
  });

  // q16 unit vector perpendicular to two vectors
  same(X([1, 1, 0], [0, 1, 1]), [1, -1, 1]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Which is a unit vector perpendicular to both $\mathbf{i} + \mathbf{j}$ and $\mathbf{j} + \mathbf{k}$?`,
    options: [
      [t`$\frac{1}{\sqrt{3}}(\mathbf{i} - \mathbf{j} + \mathbf{k})$`, t`Correct: $(\mathbf{i} + \mathbf{j}) \times (\mathbf{j} + \mathbf{k}) = \mathbf{i} - \mathbf{j} + \mathbf{k}$, of length $\sqrt{3}$.`],
      [t`$\frac{1}{\sqrt{3}}(\mathbf{i} + \mathbf{j} + \mathbf{k})$`, t`Its scalar product with $\mathbf{i} + \mathbf{j}$ is $\frac{2}{\sqrt{3}} \ne 0$, so it is not perpendicular.`],
      [t`$\frac{1}{3}(\mathbf{i} - \mathbf{j} + \mathbf{k})$`, t`The direction is right but its length is $\frac{\sqrt{3}}{3}$, not 1.`],
      [t`$\frac{1}{\sqrt{3}}(-\mathbf{i} + \mathbf{j} + \mathbf{k})$`, t`Its scalar product with $\mathbf{j} + \mathbf{k}$ is $\frac{2}{\sqrt{3}} \ne 0$.`],
    ],
    answer: "A",
    explanation: t`Cross product: $(1, 1, 0) \times (0, 1, 1) = (1, -1, 1)$; divide by its magnitude $\sqrt{3}$. ($-\frac{1}{\sqrt{3}}(\mathbf{i} - \mathbf{j} + \mathbf{k})$ would also be correct.)`,
    hints: ["Find the cross product, then divide by its length."],
  });

  // q17 struct 5
  const pq17 = v3.sub([2, 2, 0], [0, 1, 2]), pr17 = v3.sub([1, -1, 4], [0, 1, 2]);
  const m17 = X(pq17, pr17);
  same(m17, [-2, -6, -5]);
  for (const p of [[0, 1, 2], [2, 2, 0], [1, -1, 4]]) chk(2 * p[0] + 6 * p[1] + 5 * p[2], 16);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`The points $P(0, 1, 2)$, $Q(2, 2, 0)$ and $R(1, -1, 4)$ are given.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find $\overrightarrow{PQ} \times \overrightarrow{PR}$ in the form $a\mathbf{i} + b\mathbf{j} + c\mathbf{k}$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}",
        blanks: [NB("a", -2, 2), NB("b", -6, 6), NB("c", -5, 5)],
        explanation: t`$\overrightarrow{PQ} = (2, 1, -2)$, $\overrightarrow{PR} = (1, -2, 2)$: $\mathbf{i}$: $(1)(2) - (-2)(-2) = -2$; $\mathbf{j}$: $(-2)(1) - (2)(2) = -6$; $\mathbf{k}$: $(2)(-2) - (1)(1) = -5$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the area of triangle PQR, correct to 3 significant figures.", value: v3.mag(m17) / 2, unit: "units²", wrong: [f3(v3.mag(m17))],
        explanation: t`$\frac{1}{2}\sqrt{4 + 36 + 25} = \frac{\sqrt{65}}{2} = ${f3(v3.mag(m17) / 2)}$.` }),
      P.num({ label: "(c)", marks: 1, stem: "The plane PQR has equation 2x + 6y + 5z = d. Find d.", value: 16, wrong: [-16],
        explanation: t`$d = 2(0) + 6(1) + 5(2) = 16$ (normal $(2, 6, 5)$ is minus the cross product).` }),
    ],
    explanation: "One cross product gives both the area and the normal of the plane.",
    hints: ["Use PQ and PR from the same vertex."],
  });

  // q18 struct 12
  const n18 = X([2, 1, 0], [1, 0, 3]);
  same(n18, [3, -6, -1]);
  chk(v3.dot(n18, [1, -1, 2]), 7);
  chk(v3.dot(n18, [4, 1, -1]), 7);
  same(v3.add([1, -1, 2], v3.add(v3.scale(2, [2, 1, 0]), v3.scale(-1, [1, 0, 3]))), [4, 1, -1]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The plane $\Pi$ has vector equation $\mathbf{r} = (\mathbf{i} - \mathbf{j} + 2\mathbf{k}) + \lambda(2\mathbf{i} + \mathbf{j}) + \mu(\mathbf{i} + 3\mathbf{k})$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find a normal vector to $\Pi$ in the form $3\mathbf{i} + b\mathbf{j} + c\mathbf{k}$.`, template: "b = {{blank:b}}, c = {{blank:c}}",
        blanks: [NB("b", -6, 6, 2), NB("c", -1, 1, 1)],
        explanation: t`$(2, 1, 0) \times (1, 0, 3) = \big((1)(3) - (0)(0),\; (0)(1) - (2)(3),\; (2)(0) - (1)(1)\big) = (3, -6, -1)$.` }),
      P.num({ label: "(b)", marks: 2, stem: "The Cartesian equation of Π is 3x − 6y − z = d. Find d.", value: 7, wrong: [-3],
        explanation: t`$d = (1, -1, 2) \cdot (3, -6, -1) = 3 + 6 - 2 = 7$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "The point D(4, 1, −1) lies in Π. Find the values of λ and μ that give D.", template: "λ = {{blank:l}}, μ = {{blank:m}}",
        blanks: [NB("l", 2, 1, 2), NB("m", -1, 1, 1)],
        explanation: t`Components: $x = 1 + 2\lambda + \mu = 4$, $y = -1 + \lambda = 1$, $z = 2 + 3\mu = -1$. So $\lambda = 2$, $\mu = -1$, and $x = 1 + 4 - 1 = 4$ checks. (Also $3(4) - 6(1) - (-1) = 7$.)` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the area of the parallelogram whose adjacent sides are the two direction vectors of Π, correct to 3 significant figures.", value: v3.mag(n18), unit: "units²", wrong: [f3(v3.mag(n18) / 2)],
        explanation: t`Area $= |(3, -6, -1)| = \sqrt{9 + 36 + 1} = \sqrt{46} = ${f3(v3.mag(n18))}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: t`Explain why $\mathbf{r} = (\mathbf{i} - \mathbf{j} + 2\mathbf{k}) + \lambda(2\mathbf{i} + \mathbf{j}) + \mu(4\mathbf{i} + 2\mathbf{j})$ does not describe a plane.`,
        points: ["4i + 2j = 2(2i + j): the two direction vectors are parallel (their cross product is 0).", "So the equation describes only a line through (1, −1, 2) in direction 2i + j, not a plane."],
        modelAnswer: "The directions 2i + j and 4i + 2j are parallel, so λ(2i + j) + μ(4i + 2j) = (λ + 2μ)(2i + j): every point lies on one line. A plane needs two non-parallel directions.",
        explanation: "Two directions must be non-parallel." }),
    ],
    explanation: "Normal from the cross product of the directions; then Cartesian form, membership and area.",
    hints: ["The normal is the cross product of the two direction vectors.", "Equate components to find λ and μ."],
  });

  // ---------------------------------------------------------------- cards
  b.card("FORMULA", "Vector product a × b", t`$\begin{pmatrix} a_2b_3 - a_3b_2 \\ a_3b_1 - a_1b_3 \\ a_1b_2 - a_2b_1 \end{pmatrix}$, perpendicular to $\mathbf{a}$ and $\mathbf{b}$.`);
  b.card("FORMULA", "Magnitude of a × b", t`$|\mathbf{a} \times \mathbf{b}| = |\mathbf{a}||\mathbf{b}|\sin\theta$`);
  b.card("FACT", "Properties of the vector product", t`$\mathbf{b} \times \mathbf{a} = -\mathbf{a} \times \mathbf{b}$; $\mathbf{a} \times \mathbf{a} = \mathbf{0}$; parallel vectors give $\mathbf{0}$; $\mathbf{i} \times \mathbf{j} = \mathbf{k}$, $\mathbf{j} \times \mathbf{k} = \mathbf{i}$, $\mathbf{k} \times \mathbf{i} = \mathbf{j}$.`);
  b.card("FORMULA", "Areas with the vector product", t`Parallelogram $|\mathbf{a} \times \mathbf{b}|$; triangle $ABC$: $\tfrac{1}{2}|\overrightarrow{AB} \times \overrightarrow{AC}|$.`);
  b.card("FORMULA", "Plane through a with normal n", t`$\mathbf{r} \cdot \mathbf{n} = \mathbf{a} \cdot \mathbf{n}$; Cartesian $px + qy + sz = d$ with $\mathbf{n} = (p, q, s)$.`);
  b.card("FORMULA", "Vector (parametric) form of a plane", t`$\mathbf{r} = \mathbf{a} + \lambda\mathbf{b} + \mu\mathbf{c}$ with $\mathbf{b}$, $\mathbf{c}$ non-parallel directions in the plane; normal $\mathbf{b} \times \mathbf{c}$.`);
  b.card("CONCEPT", "Plane through three points A, B, C", t`$\mathbf{n} = \overrightarrow{AB} \times \overrightarrow{AC}$, then $d = \mathbf{n} \cdot \overrightarrow{OA}$; check with B and C.`);
  b.card("CONCEPT", "Checking a cross product", "Dot the answer with each original vector: both results must be 0.");
});
