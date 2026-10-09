// W3b: amath.vectors.notation-magnitude (Cambridge only)
import { concept, P, t, chk, same, vec, quad, halfUnit, dpFor } from "../lib.mjs";

const N = (id, x, wrong) => ({ id, input: "number", accepted: [x], wrong });
// Fraction blank: accepts the exact fraction and any decimal correct to 3 s.f.
const NF = (id, n, d, wrong) => ({ id, input: "number", accepted: [`${n}/${d}`], tolerance: Number(halfUnit(dpFor(n / d, 3)).toPrecision(2)), wrong });

concept("amath.vectors.notation-magnitude", { file: "vectors/notation-magnitude", keyPrefix: "vectors.notation-magnitude" }, (b) => {
  chk(vec.mag([5, 12]), 13);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Find the magnitude of the vector $5\mathbf{i} + 12\mathbf{j}$.`,
    options: [
      [t`$13$`, t`Correct: $\sqrt{5^2 + 12^2} = \sqrt{169} = 13$.`],
      [t`$17$`, "The components were added; the magnitude uses Pythagoras."],
      [t`$7$`, "The components were subtracted; the magnitude uses Pythagoras."],
      [t`$169$`, "This is the square of the magnitude; take the square root."],
    ],
    answer: "A",
    explanation: t`$|x\mathbf{i} + y\mathbf{j}| = \sqrt{x^2 + y^2}$, so $|5\mathbf{i} + 12\mathbf{j}| = \sqrt{25 + 144} = 13$.`,
  });

  chk(vec.mag([7, -24]), 25);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find $|\mathbf{p}|$, where $\mathbf{p} = 7\mathbf{i} - 24\mathbf{j}$.`,
    value: 25, wrong: [17, 31],
    explanation: t`$|\mathbf{p}| = \sqrt{7^2 + (-24)^2} = \sqrt{49 + 576} = \sqrt{625} = 25$. A magnitude is never negative: $(-24)^2 = 576$. Adding or subtracting the components (31 or 17) is wrong.`,
  });

  {
    const ab = vec.sub([-1, 2], [3, 5]);
    same(ab, [-4, -3]);
    b.fib({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`The points $A$ and $B$ have position vectors $\overrightarrow{OA} = 3\mathbf{i} + 5\mathbf{j}$ and $\overrightarrow{OB} = -\mathbf{i} + 2\mathbf{j}$. Find $\overrightarrow{AB}$.`,
      template: "AB = {{blank:x}} i + {{blank:y}} j",
      blanks: [N("x", -4, "4"), N("y", -3, "3")],
      explanation: t`$\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = (-1 - 3)\mathbf{i} + (2 - 5)\mathbf{j} = -4\mathbf{i} - 3\mathbf{j}$. The answer $4\mathbf{i} + 3\mathbf{j}$ is $\overrightarrow{BA}$.`,
    });
  }

  {
    chk(vec.mag([8, -15]), 17);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the unit vector in the direction of $8\mathbf{i} - 15\mathbf{j}$. Type each component as a fraction.`,
      template: "unit vector = {{blank:x}} i + {{blank:y}} j",
      blanks: [NF("x", 8, 17, "8"), NF("y", -15, 17, "15/17")],
      explanation: t`$|8\mathbf{i} - 15\mathbf{j}| = \sqrt{64 + 225} = 17$, so the unit vector is $\frac{8}{17}\mathbf{i} - \frac{15}{17}\mathbf{j}$.`,
      hints: ["Divide the vector by its magnitude."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which vector is parallel to $2\mathbf{i} - 3\mathbf{j}$?`,
    options: [
      [t`$-4\mathbf{i} + 6\mathbf{j}$`, t`Correct: it is $-2(2\mathbf{i} - 3\mathbf{j})$, a scalar multiple (pointing the opposite way).`],
      [t`$3\mathbf{i} - 2\mathbf{j}$`, "The components have been swapped; the ratio 3 : −2 differs from 2 : −3."],
      [t`$4\mathbf{i} + 6\mathbf{j}$`, t`Doubling the $\mathbf{i}$ part needs doubling the $\mathbf{j}$ part too, giving $-6\mathbf{j}$.`],
      [t`$2\mathbf{i} + 3\mathbf{j}$`, "Changing the sign of one component only changes the direction."],
    ],
    answer: "A",
    explanation: t`Parallel vectors are scalar multiples of each other: $-4\mathbf{i} + 6\mathbf{j} = -2(2\mathbf{i} - 3\mathbf{j})$. A negative multiple is still parallel.`,
  });

  {
    const p = 2, q = 1;
    same(vec.add(vec.scale(p, [1, 2]), vec.scale(q, [3, -1])), [5, 3]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the constants $p$ and $q$ such that $p(\mathbf{i} + 2\mathbf{j}) + q(3\mathbf{i} - \mathbf{j}) = 5\mathbf{i} + 3\mathbf{j}$.`,
      template: "p = {{blank:p}}, q = {{blank:q}}",
      blanks: [N("p", p, "1"), N("q", q, "2")],
      explanation: t`$\mathbf{i}$: $p + 3q = 5$. $\mathbf{j}$: $2p - q = 3$. From the second, $q = 2p - 3$; then $p + 6p - 9 = 5$, so $p = 2$ and $q = 1$.`,
      hints: ["Equate the i components and the j components separately."],
    });
  }

  {
    const k = (3 * -6) / 9;
    chk(k, -2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The vector $3\mathbf{i} + k\mathbf{j}$ is parallel to $9\mathbf{i} - 6\mathbf{j}$. Find the value of $k$.`,
      value: k, wrong: [2, -18],
      explanation: t`$9\mathbf{i} - 6\mathbf{j} = 3(3\mathbf{i} - 2\mathbf{j})$, so $3\mathbf{i} + k\mathbf{j}$ must be $3\mathbf{i} - 2\mathbf{j}$: $k = -2$.`,
      hints: [t`Write $9\mathbf{i} - 6\mathbf{j}$ as a multiple of a vector with $\mathbf{i}$ component 3.`],
    });
  }

  {
    const u = vec.scale(15 / 5, [4, 3]);
    same(u, [12, 9]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`Find the vector of magnitude 15 in the direction of $4\mathbf{i} + 3\mathbf{j}$.`,
      template: "{{blank:x}} i + {{blank:y}} j",
      blanks: [N("x", 12, "60"), N("y", 9, "45")],
      explanation: t`$|4\mathbf{i} + 3\mathbf{j}| = 5$, so the unit vector is $\frac{1}{5}(4\mathbf{i} + 3\mathbf{j})$ and the required vector is $15 \times \frac{1}{5}(4\mathbf{i} + 3\mathbf{j}) = 12\mathbf{i} + 9\mathbf{j}$. Multiplying by 15 without dividing by 5 gives a vector of magnitude 75.`,
      hints: ["Magnitude × unit vector."],
    });
  }

  {
    const a = vec.sub(vec.scale(2, [3, 1]), [1, -2]);
    same(a, [5, 4]);
    chk(vec.mag(a), Math.sqrt(41));
    b.expr({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$\mathbf{p} = 3\mathbf{i} + \mathbf{j}$ and $\mathbf{q} = \mathbf{i} - 2\mathbf{j}$. Find the exact value of $|2\mathbf{p} - \mathbf{q}|$, as a surd (type √ or sqrt).`,
      accepted: ["√41", "sqrt(41)", "sqrt41"],
      wrong: ["9", "√25"],
      explanation: t`$2\mathbf{p} - \mathbf{q} = (6 - 1)\mathbf{i} + (2 + 2)\mathbf{j} = 5\mathbf{i} + 4\mathbf{j}$, so $|2\mathbf{p} - \mathbf{q}| = \sqrt{25 + 16} = \sqrt{41}$.`,
      hints: [t`Subtracting $-2\mathbf{j}$ adds $2\mathbf{j}$.`],
    });
  }

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The vectors $\mathbf{a}$ and $-\mathbf{a}$ have the same magnitude.`,
    answer: true,
    explanation: t`True. $-\mathbf{a}$ has the same length as $\mathbf{a}$ but points in the opposite direction; for example $|3\mathbf{i} - 4\mathbf{j}| = |-3\mathbf{i} + 4\mathbf{j}| = 5$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\overrightarrow{AB} = \overrightarrow{OA} - \overrightarrow{OB}$.`,
    answer: false,
    explanation: t`False. $\overrightarrow{AB} = \overrightarrow{AO} + \overrightarrow{OB} = \overrightarrow{OB} - \overrightarrow{OA} = \mathbf{b} - \mathbf{a}$ ("end minus start"). $\mathbf{a} - \mathbf{b}$ is $\overrightarrow{BA}$.`,
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each piece of notation with its meaning.",
    pairs: [
      [t`$\overrightarrow{AB}$`, t`The vector from $A$ to $B$`],
      [t`$|\mathbf{a}|$`, t`The magnitude of $\mathbf{a}$`],
      [t`$\hat{\mathbf{a}}$`, t`The unit vector in the direction of $\mathbf{a}$`],
      [t`$\overrightarrow{OA}$`, t`The position vector of $A$`],
    ],
    explanation: t`$\overrightarrow{AB}$ goes from $A$ to $B$; $|\mathbf{a}|$ is a length; $\hat{\mathbf{a}} = \frac{\mathbf{a}}{|\mathbf{a}|}$; a position vector starts at the origin $O$.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`Which of these is the same vector as $\begin{pmatrix} -3 \\ 4 \end{pmatrix}$?`,
    options: [
      [t`$-3\mathbf{i} + 4\mathbf{j}$`, t`Correct: the top entry is the $\mathbf{i}$ component, the bottom the $\mathbf{j}$ component.`],
      [t`$4\mathbf{i} - 3\mathbf{j}$`, "The entries have been swapped: the top entry goes with i."],
      [t`$3\mathbf{i} - 4\mathbf{j}$`, "This is the negative of the vector, pointing the opposite way."],
      [t`$-3\mathbf{i} - 4\mathbf{j}$`, "The j component is +4, not −4."],
    ],
    answer: "A",
    explanation: t`$\begin{pmatrix} x \\ y \end{pmatrix} = x\mathbf{i} + y\mathbf{j}$, so $\begin{pmatrix} -3 \\ 4 \end{pmatrix} = -3\mathbf{i} + 4\mathbf{j}$.`,
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$A$ and $B$ have position vectors $\mathbf{a}$ and $\mathbf{b}$. What is the position vector of the midpoint $M$ of $AB$?`,
    options: [
      [t`$\frac{1}{2}(\mathbf{a} + \mathbf{b})$`, t`Correct: $\mathbf{a} + \frac{1}{2}(\mathbf{b} - \mathbf{a}) = \frac{1}{2}(\mathbf{a} + \mathbf{b})$.`],
      [t`$\frac{1}{2}(\mathbf{b} - \mathbf{a})$`, t`This is $\overrightarrow{AM}$, the vector from $A$ to $M$, not from $O$.`],
      [t`$\mathbf{a} + \mathbf{b}$`, "This is twice the position vector of the midpoint."],
      [t`$\mathbf{b} - \mathbf{a}$`, t`This is $\overrightarrow{AB}$.`],
    ],
    answer: "A",
    explanation: t`$\overrightarrow{OM} = \overrightarrow{OA} + \frac{1}{2}\overrightarrow{AB} = \mathbf{a} + \frac{1}{2}(\mathbf{b} - \mathbf{a}) = \frac{1}{2}(\mathbf{a} + \mathbf{b})$.`,
  });

  {
    // |t i + (t − 7) j| = 13 → t² − 7t − 60 = 0
    same(quad.roots(1, -7, -60), [-5, 12]);
    for (const x of [-5, 12]) chk(vec.mag([x, x - 7]), 13);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`Find the two values of $t$ for which $|t\mathbf{i} + (t - 7)\mathbf{j}| = 13$, in ascending order.`,
      template: "t = {{blank:a}} or t = {{blank:b}}",
      blanks: [N("a", -5, "5"), N("b", 12, "-12")],
      explanation: t`$t^2 + (t - 7)^2 = 169$ gives $2t^2 - 14t + 49 = 169$, so $2t^2 - 14t - 120 = 0$ and $t^2 - 7t - 60 = (t - 12)(t + 5) = 0$. Check $t = 12$: $|12\mathbf{i} + 5\mathbf{j}| = 13$; $t = -5$: $|-5\mathbf{i} - 12\mathbf{j}| = 13$.`,
      hints: ["Square both sides: the magnitude squared is 169.", "Expand and solve the quadratic."],
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`$A$ is the point $(4, 1)$ and $B$ is the point $(6, 5)$. Explain the difference between the position vector of $B$ and the vector $\overrightarrow{AB}$, giving both.`,
    points: [
      t`The position vector of $B$ starts at the origin: $\overrightarrow{OB} = 6\mathbf{i} + 5\mathbf{j}$.`,
      t`$\overrightarrow{AB}$ starts at $A$ and ends at $B$: $\mathbf{b} - \mathbf{a} = 2\mathbf{i} + 4\mathbf{j}$.`,
    ],
    modelAnswer: t`A position vector always starts at $O$: $\overrightarrow{OB} = 6\mathbf{i} + 5\mathbf{j}$. The vector $\overrightarrow{AB}$ describes the move from $A$ to $B$, whatever the origin: $\overrightarrow{AB} = (6 - 4)\mathbf{i} + (5 - 1)\mathbf{j} = 2\mathbf{i} + 4\mathbf{j}$.`,
    explanation: "Position vectors are tied to the origin; a vector between two points is not.",
  });

  {
    // A(1, 2), B(5, −1)
    const ab = vec.sub([5, -1], [1, 2]);
    same(ab, [4, -3]);
    chk(vec.mag(ab), 5);
    const C = vec.add([1, 2], vec.scale(3, ab));
    same(C, [13, -7]);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`The points $A$ and $B$ have coordinates $(1, 2)$ and $(5, -1)$.`,
      parts: [
        P.fib({ label: "(a)", marks: 1, stem: t`Find $\overrightarrow{AB}$.`, template: "AB = {{blank:x}} i + {{blank:y}} j",
          blanks: [N("x", 4, "-4"), N("y", -3, "3")],
          explanation: t`$\overrightarrow{AB} = (5 - 1)\mathbf{i} + (-1 - 2)\mathbf{j} = 4\mathbf{i} - 3\mathbf{j}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Find $|\overrightarrow{AB}|$.`, value: 5, wrong: [7, 1],
          explanation: t`$\sqrt{16 + 9} = 5$.` }),
        P.fib({ label: "(c)", marks: 2, stem: t`Find the unit vector in the direction of $\overrightarrow{AB}$, as decimals or fractions.`, template: "{{blank:x}} i + {{blank:y}} j",
          blanks: [{ id: "x", input: "number", accepted: [0.8], wrong: "4" }, { id: "y", input: "number", accepted: [-0.6], wrong: "-3" }],
          explanation: t`$\frac{1}{5}(4\mathbf{i} - 3\mathbf{j}) = 0.8\mathbf{i} - 0.6\mathbf{j}$.` }),
        P.fib({ label: "(d)", marks: 2, stem: t`The point $C$ is such that $\overrightarrow{AC}$ is in the same direction as $\overrightarrow{AB}$ and $|\overrightarrow{AC}| = 15$. Find the coordinates of $C$.`, template: "C = ({{blank:x}}, {{blank:y}})",
          blanks: [N("x", 13, "12"), N("y", -7, "-9")],
          explanation: t`$\overrightarrow{AC} = 15(0.8\mathbf{i} - 0.6\mathbf{j}) = 12\mathbf{i} - 9\mathbf{j}$, so $\overrightarrow{OC} = (1 + 12)\mathbf{i} + (2 - 9)\mathbf{j}$: $C$ is $(13, -7)$. The answer $(12, -9)$ forgets to start from $A$.` }),
      ],
      explanation: "End minus start, Pythagoras for the magnitude, divide by it for the unit vector, then scale and add to the position of A.",
      hints: [t`$\overrightarrow{OC} = \overrightarrow{OA} + \overrightarrow{AC}$.`],
    });
  }

  {
    const a = [2, 3], bb = [-1, 4];
    const c = vec.sub(vec.scale(3, a), vec.scale(2, bb));
    same(c, [8, 1]);
    chk(vec.mag(c), Math.sqrt(65));
    const lam = -3 / 4;
    chk(a[1] + lam * bb[1], 0);
    const mu = -0.5;
    const w = vec.add(a, vec.scale(mu, bb));
    chk(w[0] / w[1], 5 / 2);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`$\mathbf{a} = 2\mathbf{i} + 3\mathbf{j}$ and $\mathbf{b} = -\mathbf{i} + 4\mathbf{j}$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $3\mathbf{a} - 2\mathbf{b}$.`, template: "{{blank:x}} i + {{blank:y}} j",
          blanks: [N("x", 8, "4"), N("y", 1, "17")],
          explanation: t`$3\mathbf{a} = 6\mathbf{i} + 9\mathbf{j}$ and $2\mathbf{b} = -2\mathbf{i} + 8\mathbf{j}$; subtracting gives $8\mathbf{i} + \mathbf{j}$.` }),
        P.expr({ label: "(b)", marks: 1, stem: t`Find the exact value of $|3\mathbf{a} - 2\mathbf{b}|$ (type √ or sqrt).`, accepted: ["√65", "sqrt(65)", "sqrt65"], wrong: ["9"],
          explanation: t`$\sqrt{64 + 1} = \sqrt{65}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $\lambda$ for which $\mathbf{a} + \lambda\mathbf{b}$ is parallel to $\mathbf{i}$.`, value: lam, wrong: [2, 0.75],
          explanation: t`$\mathbf{a} + \lambda\mathbf{b} = (2 - \lambda)\mathbf{i} + (3 + 4\lambda)\mathbf{j}$. Parallel to $\mathbf{i}$ means the $\mathbf{j}$ component is 0: $3 + 4\lambda = 0$, $\lambda = -\frac{3}{4}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Find the value of $\mu$ for which $\mathbf{a} + \mu\mathbf{b}$ is parallel to $5\mathbf{i} + 2\mathbf{j}$.`, value: mu, wrong: [0.5, -2],
          explanation: t`$(2 - \mu) : (3 + 4\mu) = 5 : 2$, so $2(2 - \mu) = 5(3 + 4\mu)$: $4 - 2\mu = 15 + 20\mu$, $\mu = -\frac{1}{2}$. Check: $\mathbf{a} - \frac{1}{2}\mathbf{b} = 2.5\mathbf{i} + \mathbf{j} = \frac{1}{2}(5\mathbf{i} + 2\mathbf{j})$.` }),
      ],
      explanation: "Work component by component; parallel means the components are in the same ratio.",
      hints: [t`Parallel to $\mathbf{i}$: no $\mathbf{j}$ component.`, "Cross-multiply the ratio of components in (d)."],
    });
  }

  b.card("DEFINITION", "Vector", "A quantity with magnitude and direction, e.g. displacement, velocity, force.");
  b.card("FORMULA", t`$\overrightarrow{AB}$ from position vectors`, t`$\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$ (end minus start)`);
  b.card("FORMULA", t`Magnitude of $x\mathbf{i} + y\mathbf{j}$`, t`$\sqrt{x^2 + y^2}$`);
  b.card("FORMULA", "Unit vector", t`$\hat{\mathbf{a}} = \dfrac{\mathbf{a}}{|\mathbf{a}|}$`);
  b.card("DEFINITION", "Position vector", t`The vector $\overrightarrow{OA} = \mathbf{a}$ from the origin to the point $A$.`);
  b.card("CONCEPT", "Parallel vectors", t`$\mathbf{u}$ is parallel to $\mathbf{v}$ when $\mathbf{u} = k\mathbf{v}$ for some scalar $k$ (components in the same ratio).`);
  b.card("CONCEPT", "Equal vectors", t`Equal $\mathbf{i}$ components and equal $\mathbf{j}$ components: one vector equation gives two equations.`);
  b.card("FACT", "Midpoint", t`The midpoint of $AB$ has position vector $\frac{1}{2}(\mathbf{a} + \mathbf{b})$.`);
  b.card("FACT", "Vector of given length", "Magnitude × unit vector in the required direction.");
});
