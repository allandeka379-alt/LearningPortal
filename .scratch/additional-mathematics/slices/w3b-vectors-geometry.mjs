// W3b: amath.vectors.geometry (Cambridge only). Vectors in terms of a and b are checked as [coef of a, coef of b].
import { concept, P, t, chk, same, vec } from "../lib.mjs";

const N = (id, x, wrong) => ({ id, input: "number", accepted: [x], wrong });
const NF = (id, n, d, wrong) => ({ id, input: "number", accepted: [`${n}/${d}`], tolerance: 0.005, wrong });
const r9 = (u) => u.map((v) => Math.round(v * 1e9) / 1e9);

concept("amath.vectors.geometry", { file: "vectors/geometry", keyPrefix: "vectors.geometry" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`In triangle $OAB$, $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. Which expression is $\overrightarrow{AB}$?`,
    options: [
      [t`$\mathbf{b} - \mathbf{a}$`, t`Correct: $\overrightarrow{AB} = \overrightarrow{AO} + \overrightarrow{OB} = -\mathbf{a} + \mathbf{b}$.`],
      [t`$\mathbf{a} - \mathbf{b}$`, t`This is $\overrightarrow{BA}$, the opposite direction.`],
      [t`$\mathbf{a} + \mathbf{b}$`, t`Going from $A$ to $O$ is $-\mathbf{a}$, not $+\mathbf{a}$.`],
      [t`$\frac{1}{2}(\mathbf{a} + \mathbf{b})$`, "This is the position vector of the midpoint of AB."],
    ],
    answer: "A",
    explanation: t`Route $A \to O \to B$: $\overrightarrow{AB} = -\mathbf{a} + \mathbf{b} = \mathbf{b} - \mathbf{a}$.`,
  });

  {
    const M = vec.scale(0.5, vec.add([6, -2], [2, 8]));
    same(M, [4, 3]);
    b.fib({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`$\overrightarrow{OA} = 6\mathbf{i} - 2\mathbf{j}$ and $\overrightarrow{OB} = 2\mathbf{i} + 8\mathbf{j}$. $M$ is the midpoint of $AB$. Find $\overrightarrow{OM}$.`,
      template: "OM = {{blank:x}} i + {{blank:y}} j",
      blanks: [N("x", 4, "-2"), N("y", 3, "5")],
      explanation: t`$\overrightarrow{OM} = \frac{1}{2}(\mathbf{a} + \mathbf{b}) = \frac{1}{2}(8\mathbf{i} + 6\mathbf{j}) = 4\mathbf{i} + 3\mathbf{j}$. The answer $-2\mathbf{i} + 5\mathbf{j}$ is $\frac{1}{2}\overrightarrow{AB}$.`,
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$A$ and $B$ have position vectors $\mathbf{a}$ and $\mathbf{b}$. $P$ lies on $AB$ with $AP : PB = 1 : 3$. Find $\overrightarrow{OP}$.`,
    options: [
      [t`$\frac{3}{4}\mathbf{a} + \frac{1}{4}\mathbf{b}$`, t`Correct: $\mathbf{a} + \frac{1}{4}(\mathbf{b} - \mathbf{a})$.`],
      [t`$\frac{1}{4}\mathbf{a} + \frac{3}{4}\mathbf{b}$`, "This point is a quarter of the way from B, i.e. AP : PB = 3 : 1."],
      [t`$\frac{2}{3}\mathbf{a} + \frac{1}{3}\mathbf{b}$`, "This uses 1/3 (m/n) instead of 1/4 (m/(m + n))."],
      [t`$\mathbf{a} + \frac{1}{3}\mathbf{b}$`, t`$\frac{1}{3}\mathbf{b}$ was added instead of $\frac{1}{4}$ of $\overrightarrow{AB} = \mathbf{b} - \mathbf{a}$.`],
    ],
    answer: "A",
    explanation: t`$AP : PB = 1 : 3$ splits $AB$ into 4 equal parts, so $\overrightarrow{AP} = \frac{1}{4}(\mathbf{b} - \mathbf{a})$ and $\overrightarrow{OP} = \frac{3}{4}\mathbf{a} + \frac{1}{4}\mathbf{b}$.`,
  });

  {
    const A = [-3, 1], B = [9, 4];
    const Pp = vec.add(A, vec.scale(2 / 3, vec.sub(B, A)));
    same(r9(Pp), [5, 3]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$A$ is the point $(-3, 1)$ and $B$ is the point $(9, 4)$. The point $P$ lies on $AB$ with $AP : PB = 2 : 1$. Find the coordinates of $P$.`,
      template: "P = ({{blank:x}}, {{blank:y}})",
      blanks: [N("x", 5, "1"), N("y", 3, "2")],
      explanation: t`$\overrightarrow{AB} = 12\mathbf{i} + 3\mathbf{j}$ and $\overrightarrow{AP} = \frac{2}{3}\overrightarrow{AB} = 8\mathbf{i} + 2\mathbf{j}$. So $\overrightarrow{OP} = (-3 + 8)\mathbf{i} + (1 + 2)\mathbf{j}$: $P$ is $(5, 3)$. The answer $(1, 2)$ goes only $\frac{1}{3}$ of the way.`,
      hints: [t`$AP : PB = 2 : 1$ means $AP = \frac{2}{3}AB$.`],
    });
  }

  {
    const A = [2, 9], B = [10, 1];
    const Pp = vec.add(A, vec.scale(1 / 4, vec.sub(B, A)));
    same(r9(Pp), [4, 7]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$\overrightarrow{OA} = 2\mathbf{i} + 9\mathbf{j}$ and $\overrightarrow{OB} = 10\mathbf{i} + \mathbf{j}$. The point $P$ divides $AB$ in the ratio $1 : 3$. Find $\overrightarrow{OP}$.`,
      template: "OP = {{blank:x}} i + {{blank:y}} j",
      blanks: [N("x", 4, "2"), N("y", 7, "-2")],
      explanation: t`$\overrightarrow{AB} = 8\mathbf{i} - 8\mathbf{j}$ and $\overrightarrow{AP} = \frac{1}{4}\overrightarrow{AB} = 2\mathbf{i} - 2\mathbf{j}$. So $\overrightarrow{OP} = 4\mathbf{i} + 7\mathbf{j}$. The answer $2\mathbf{i} - 2\mathbf{j}$ is $\overrightarrow{AP}$, not the position vector.`,
      hints: ["A ratio 1 : 3 splits the line into 4 equal parts."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $\overrightarrow{AB} = 2\overrightarrow{BC}$, then the points $A$, $B$ and $C$ are collinear.`,
    answer: true,
    explanation: t`True. The vectors are parallel (one is a multiple of the other) and they share the point $B$, so $A$, $B$ and $C$ lie on one line, with $AB$ twice as long as $BC$.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If $\overrightarrow{AB} = 3\overrightarrow{CD}$, then $A$, $B$, $C$ and $D$ must lie on one straight line.`,
    answer: false,
    explanation: t`False. $\overrightarrow{AB} = 3\overrightarrow{CD}$ shows only that $AB$ is parallel to $CD$ (and three times as long). The lines can be separate parallel lines, as in a trapezium; collinearity needs a shared point.`,
  });

  {
    const k = 8;
    const AB = vec.sub([5, 7], [2, 1]);
    const BC = vec.sub([k, 13], [5, 7]);
    same(BC, AB);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The points $A(2, 1)$, $B(5, 7)$ and $C(k, 13)$ are collinear. Find the value of $k$.`,
      value: k, wrong: [3, 6.5],
      explanation: t`$\overrightarrow{AB} = 3\mathbf{i} + 6\mathbf{j}$ and $\overrightarrow{BC} = (k - 5)\mathbf{i} + 6\mathbf{j}$. For $\overrightarrow{BC}$ to be a multiple of $\overrightarrow{AB}$, the equal $\mathbf{j}$ components force the multiple to be 1, so $k - 5 = 3$ and $k = 8$.`,
      hints: [t`Compare the $\mathbf{j}$ components of $\overrightarrow{AB}$ and $\overrightarrow{BC}$ first.`],
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`$OABC$ is a parallelogram with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OC} = \mathbf{c}$. Which expression is $\overrightarrow{AC}$?`,
    options: [
      [t`$\mathbf{c} - \mathbf{a}$`, t`Correct: $\overrightarrow{AC} = \overrightarrow{AO} + \overrightarrow{OC} = -\mathbf{a} + \mathbf{c}$.`],
      [t`$\mathbf{a} + \mathbf{c}$`, t`This is the other diagonal, $\overrightarrow{OB}$.`],
      [t`$\mathbf{a} - \mathbf{c}$`, t`This is $\overrightarrow{CA}$, the opposite direction.`],
      [t`$\frac{1}{2}(\mathbf{a} + \mathbf{c})$`, "This is the position vector of the centre of the parallelogram."],
    ],
    answer: "A",
    explanation: t`End minus start: $\overrightarrow{AC} = \mathbf{c} - \mathbf{a}$. The diagonal from $O$ is $\overrightarrow{OB} = \mathbf{a} + \mathbf{c}$.`,
  });

  {
    // parallelogram OABC: M midpoint of BC → OM = a/2 + c
    const OM = vec.add([1, 1], vec.scale(0.5, [-1, 0]));
    same(OM, [0.5, 1]);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`$OABC$ is a parallelogram with $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OC} = \mathbf{c}$. $M$ is the midpoint of $BC$. Write $\overrightarrow{OM}$ in the form $p\mathbf{a} + q\mathbf{c}$.`,
      template: "p = {{blank:p}}, q = {{blank:q}}",
      blanks: [N("p", 0.5, "1"), N("q", 1, "0.5")],
      explanation: t`$\overrightarrow{OB} = \mathbf{a} + \mathbf{c}$ and $\overrightarrow{BC} = -\mathbf{a}$. So $\overrightarrow{OM} = \mathbf{a} + \mathbf{c} - \frac{1}{2}\mathbf{a} = \frac{1}{2}\mathbf{a} + \mathbf{c}$. (Or: $\overrightarrow{OC} + \overrightarrow{CM} = \mathbf{c} + \frac{1}{2}\mathbf{a}$.)`,
      hints: [t`$\overrightarrow{CB} = \overrightarrow{OA} = \mathbf{a}$ in a parallelogram.`],
    });
  }

  {
    // (2k − 1)a + 4b = 5a + (k + h)b → k = 3, h = 1
    const k = 3, h = 4 - k;
    chk(2 * k - 1, 5);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: t`The vectors $\mathbf{a}$ and $\mathbf{b}$ are non-zero and not parallel. Given that $(2k - 1)\mathbf{a} + 4\mathbf{b} = 5\mathbf{a} + (k + h)\mathbf{b}$, find $k$ and $h$.`,
      template: "k = {{blank:k}}, h = {{blank:h}}",
      blanks: [N("k", k, "2"), N("h", h, "4")],
      explanation: t`Equate coefficients. $\mathbf{a}$: $2k - 1 = 5$, so $k = 3$. $\mathbf{b}$: $4 = k + h$, so $h = 1$.`,
      hints: ["Because a and b are not parallel, the coefficients of a must be equal, and so must those of b."],
    });
  }

  b.match({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`In triangle $OAB$, $\overrightarrow{OA} = \mathbf{a}$, $\overrightarrow{OB} = \mathbf{b}$, $M$ is the midpoint of $AB$ and $N$ is the midpoint of $OA$. Match each vector with its expression.`,
    pairs: [
      [t`$\overrightarrow{OM}$`, t`$\frac{1}{2}(\mathbf{a} + \mathbf{b})$`],
      [t`$\overrightarrow{AB}$`, t`$\mathbf{b} - \mathbf{a}$`],
      [t`$\overrightarrow{NM}$`, t`$\frac{1}{2}\mathbf{b}$`],
      [t`$\overrightarrow{BN}$`, t`$\frac{1}{2}\mathbf{a} - \mathbf{b}$`],
    ],
    explanation: t`$\overrightarrow{NM} = \frac{1}{2}\mathbf{a} + \frac{1}{2}(\mathbf{b} - \mathbf{a}) = \frac{1}{2}\mathbf{b}$ and $\overrightarrow{BN} = -\mathbf{b} + \frac{1}{2}\mathbf{a}$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`In triangle $OAB$, $N$ and $M$ are the midpoints of $OA$ and $AB$, and $\overrightarrow{NM} = \frac{1}{2}\overrightarrow{OB}$. What does this show?`,
    options: [
      [t`$NM$ is parallel to $OB$ and half its length`, "Correct: a scalar multiple means parallel, and the scalar ½ gives the length ratio."],
      [t`$N$, $M$ and $B$ lie on one straight line`, "Collinearity needs vectors sharing a point; NM and OB share none."],
      [t`$NM$ is perpendicular to $OB$`, "A scalar multiple is parallel, never perpendicular."],
      [t`$NM$ is twice as long as $OB$`, "The scalar is ½, so NM is half as long as OB."],
    ],
    answer: "A",
    explanation: t`$\overrightarrow{NM} = \frac{1}{2}\overrightarrow{OB}$ says the two vectors have the same direction and $NM = \frac{1}{2}OB$: the midpoint theorem.`,
    hints: ["What does a scalar multiple tell you about direction and length?"],
  });

  {
    // OP = a + 2b, OQ = 3a + 3b, OR = 7a + 5b
    const PQ = vec.sub([3, 3], [1, 2]);
    const QR = vec.sub([7, 5], [3, 3]);
    same(PQ, [2, 1]);
    same(QR, vec.scale(2, PQ));
    b.proof({
      d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
      stem: t`Relative to an origin $O$, the points $P$, $Q$ and $R$ have position vectors $\mathbf{a} + 2\mathbf{b}$, $3\mathbf{a} + 3\mathbf{b}$ and $7\mathbf{a} + 5\mathbf{b}$, where $\mathbf{a}$ and $\mathbf{b}$ are not parallel. Show that $P$, $Q$ and $R$ are collinear, and state the ratio $PQ : QR$.`,
      points: [
        t`M1 finds $\overrightarrow{PQ} = 2\mathbf{a} + \mathbf{b}$.`,
        t`M1 finds $\overrightarrow{QR} = 4\mathbf{a} + 2\mathbf{b}$.`,
        t`A1 states $\overrightarrow{QR} = 2\overrightarrow{PQ}$, so the lines are parallel, and they share the point $Q$, so $P$, $Q$, $R$ are collinear.`,
        t`B1 states $PQ : QR = 1 : 2$.`,
      ],
      modelAnswer: t`$$
\overrightarrow{PQ} = (3\mathbf{a} + 3\mathbf{b}) - (\mathbf{a} + 2\mathbf{b}) = 2\mathbf{a} + \mathbf{b}
$$

$$
\overrightarrow{QR} = (7\mathbf{a} + 5\mathbf{b}) - (3\mathbf{a} + 3\mathbf{b}) = 4\mathbf{a} + 2\mathbf{b} = 2(2\mathbf{a} + \mathbf{b}) = 2\overrightarrow{PQ}
$$

So $PQ$ is parallel to $QR$; since $Q$ is a common point, $P$, $Q$ and $R$ are collinear, with $PQ : QR = 1 : 2$.`,
      explanation: "Show one vector is a multiple of the other, then mention the common point.",
      hints: ["End minus start for each vector.", "Do not forget the common point."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Explain why, when $\mathbf{a}$ and $\mathbf{b}$ are non-zero and not parallel, the equation $p\mathbf{a} + q\mathbf{b} = 3\mathbf{a} - 2\mathbf{b}$ means that $p = 3$ and $q = -2$.`,
    points: [
      t`Rearranges to $(p - 3)\mathbf{a} = (-2 - q)\mathbf{b}$.`,
      t`Explains that a multiple of $\mathbf{a}$ can equal a multiple of $\mathbf{b}$ only if both multiples are zero (they are not parallel), so $p = 3$ and $q = -2$.`,
    ],
    modelAnswer: t`Rearranging gives $(p - 3)\mathbf{a} = (-2 - q)\mathbf{b}$. If $p - 3 \neq 0$, this would make $\mathbf{a}$ a multiple of $\mathbf{b}$, i.e. parallel to it, which is false. So $p - 3 = 0$ and then $(-2 - q)\mathbf{b} = \mathbf{0}$, so $q = -2$.`,
    explanation: "Non-parallel vectors are independent directions: one cannot be built from the other.",
    hints: ["Collect the a terms on one side and the b terms on the other."],
  });

  {
    // trapezium OABC: OA = 6i, OC = 2i + 4j, B = (5, 4)
    const OA = [6, 0], OC = [2, 4], OB = [5, 4];
    const CB = vec.sub(OB, OC);
    same(CB, [3, 0]);
    same(vec.scale(2, CB), OA);
    const AB = vec.sub(OB, OA);
    same(AB, [-1, 4]);
    chk(vec.mag(AB), Math.sqrt(17));
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: t`Relative to an origin $O$, the points $A$, $B$ and $C$ have position vectors $6\mathbf{i}$, $5\mathbf{i} + 4\mathbf{j}$ and $2\mathbf{i} + 4\mathbf{j}$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find $\overrightarrow{CB}$.`, template: "CB = {{blank:x}} i + {{blank:y}} j",
          blanks: [N("x", 3, "-3"), N("y", 0, "8")],
          explanation: t`$\overrightarrow{CB} = (5\mathbf{i} + 4\mathbf{j}) - (2\mathbf{i} + 4\mathbf{j}) = 3\mathbf{i}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`$\overrightarrow{OA} = k\overrightarrow{CB}$. Find $k$.`, value: 2, wrong: [0.5],
          explanation: t`$6\mathbf{i} = 2(3\mathbf{i})$, so $k = 2$.` }),
        P.manual({ label: "(c)", marks: 1, stem: t`Explain what your answer to (b) tells you about the quadrilateral $OABC$.`,
          points: [t`$OA$ is parallel to $CB$ (and twice as long), so $OABC$ is a trapezium.`],
          modelAnswer: t`$\overrightarrow{OA} = 2\overrightarrow{CB}$, so the sides $OA$ and $CB$ are parallel, with $OA$ twice as long: $OABC$ is a trapezium.`,
          explanation: "A pair of parallel sides of different lengths makes a trapezium." }),
        P.fib({ label: "(d)", marks: 1, stem: t`Find $\overrightarrow{AB}$.`, template: "AB = {{blank:x}} i + {{blank:y}} j",
          blanks: [N("x", -1, "1"), N("y", 4, "-4")],
          explanation: t`$(5 - 6)\mathbf{i} + (4 - 0)\mathbf{j} = -\mathbf{i} + 4\mathbf{j}$.` }),
        P.expr({ label: "(e)", marks: 1, stem: t`Find the exact length of $AB$ (type √ or sqrt).`, accepted: ["√17", "sqrt(17)", "sqrt17"], wrong: ["5"],
          explanation: t`$\sqrt{1 + 16} = \sqrt{17}$.` }),
      ],
      explanation: "Subtract position vectors (end minus start), compare by scalar multiples, and use Pythagoras for lengths.",
      hints: [t`$\overrightarrow{CB} = \mathbf{b} - \mathbf{c}$.`],
    });
  }

  {
    // OA = a, OB = b, OC = ¾a, D midpoint of OB; AD and BC meet at X: λ = 2/5, μ = 4/5, OX = 3/5 a + 1/5 b
    const lam = 2 / 5, mu = 4 / 5;
    const viaAD = vec.add([1, 0], vec.scale(lam, [-1, 0.5]));
    const viaBC = vec.add([0, 1], vec.scale(mu, [0.75, -1]));
    chk(viaAD[0], viaBC[0], 1e-12); chk(viaAD[1], viaBC[1], 1e-12);
    same(r9(viaAD), [0.6, 0.2]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`In triangle $OAB$, $\overrightarrow{OA} = \mathbf{a}$ and $\overrightarrow{OB} = \mathbf{b}$. The point $C$ lies on $OA$ with $OC = \frac{3}{4}OA$, and $D$ is the midpoint of $OB$. The lines $AD$ and $BC$ meet at $X$.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Write $\overrightarrow{AD}$ in the form $p\mathbf{a} + q\mathbf{b}$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [N("p", -1, "1"), N("q", 0.5, "1")],
          explanation: t`$\overrightarrow{AD} = -\mathbf{a} + \frac{1}{2}\mathbf{b}$.` }),
        P.fib({ label: "(b)", marks: 1, stem: t`Write $\overrightarrow{BC}$ in the form $r\mathbf{a} + s\mathbf{b}$.`, template: "r = {{blank:r}}, s = {{blank:s}}",
          blanks: [N("r", 0.75, "-0.75"), N("s", -1, "1")],
          explanation: t`$\overrightarrow{BC} = -\mathbf{b} + \frac{3}{4}\mathbf{a}$.` }),
        P.proof({ label: "(c)", marks: 1, stem: t`Given that $\overrightarrow{AX} = \lambda\overrightarrow{AD}$, show that $\overrightarrow{OX} = (1 - \lambda)\mathbf{a} + \frac{1}{2}\lambda\mathbf{b}$.`,
          points: [t`A1 writes $\overrightarrow{OX} = \mathbf{a} + \lambda\left(-\mathbf{a} + \frac{1}{2}\mathbf{b}\right)$ and simplifies to the given result.`],
          modelAnswer: t`$$
\overrightarrow{OX} = \overrightarrow{OA} + \lambda\overrightarrow{AD} = \mathbf{a} + \lambda\left(-\mathbf{a} + \tfrac{1}{2}\mathbf{b}\right) = (1 - \lambda)\mathbf{a} + \tfrac{1}{2}\lambda\mathbf{b}
$$`,
          explanation: "Start at O, go to A, then a fraction λ of the way along AD." }),
        P.fib({ label: "(d)", marks: 2, stem: t`Given also that $\overrightarrow{BX} = \mu\overrightarrow{BC}$, find $\lambda$ and $\mu$. Type fractions.`, template: "λ = {{blank:l}}, μ = {{blank:m}}",
          blanks: [NF("l", 2, 5, "3/5"), NF("m", 4, 5, "1/5")],
          explanation: t`$\overrightarrow{OX} = \mathbf{b} + \mu\left(\frac{3}{4}\mathbf{a} - \mathbf{b}\right) = \frac{3\mu}{4}\mathbf{a} + (1 - \mu)\mathbf{b}$. Equating: $1 - \lambda = \frac{3\mu}{4}$ and $\frac{\lambda}{2} = 1 - \mu$. Then $\lambda = 2 - 2\mu$, so $2\mu - 1 = \frac{3\mu}{4}$, $\mu = \frac{4}{5}$ and $\lambda = \frac{2}{5}$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Hence find the coefficient of $\mathbf{a}$ in $\overrightarrow{OX}$, as a fraction or a decimal.`, value: 0.6, wrong: [0.4],
          explanation: t`$1 - \lambda = \frac{3}{5}$, so $\overrightarrow{OX} = \frac{3}{5}\mathbf{a} + \frac{1}{5}\mathbf{b}$.` }),
      ],
      explanation: "Write OX along each line with its own scalar, then equate the coefficients of the non-parallel vectors a and b.",
      hints: ["Use different letters for the two scalars.", t`From the $\mathbf{b}$ coefficients: $\lambda = 2(1 - \mu)$.`],
    });
  }

  b.card("FORMULA", "Point dividing AB in the ratio m : n", t`$\overrightarrow{OP} = \mathbf{a} + \dfrac{m}{m + n}(\mathbf{b} - \mathbf{a}) = \dfrac{n\mathbf{a} + m\mathbf{b}}{m + n}$`);
  b.card("FACT", "Midpoint of AB", t`$\frac{1}{2}(\mathbf{a} + \mathbf{b})$`);
  b.card("CONCEPT", "Route-finding", t`$\overrightarrow{AC} = \overrightarrow{AB} + \overrightarrow{BC}$; going against a known vector changes its sign.`);
  b.card("DEFINITION", "Collinear points", t`Points on one straight line: $\overrightarrow{AB} = k\overrightarrow{BC}$ (parallel) and a shared point $B$.`);
  b.card("CONCEPT", "Equating coefficients", t`If $\mathbf{a}$, $\mathbf{b}$ are non-zero and not parallel and $p\mathbf{a} + q\mathbf{b} = r\mathbf{a} + s\mathbf{b}$, then $p = r$ and $q = s$.`);
  b.card("CONCEPT", "Intersection of two lines", "Write the position vector of the meeting point along each line with different scalars (λ and μ), then equate coefficients.");
  b.card("FACT", "Parallelogram OABC", t`$\overrightarrow{OB} = \mathbf{a} + \mathbf{c}$ and $\overrightarrow{AC} = \mathbf{c} - \mathbf{a}$.`);
  b.card("FACT", "Midpoint theorem by vectors", t`The line joining the midpoints of two sides is $\frac{1}{2}$ of the third side vector: parallel and half as long.`);
});
