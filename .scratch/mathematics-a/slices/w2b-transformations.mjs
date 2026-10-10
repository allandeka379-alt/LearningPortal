// W2b: amaths.matrices.transformations (ZIMSEC only)
import { concept, P, t, chk, same, mat, deg, rad } from "../lib.mjs";

const { cos, sin, atan2, tan, PI } = Math;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const T = (A) => mat.tex(A);
const r9 = (A) => A.map((r) => r.map((v) => Math.round(v * 1e9) / 1e9 + 0));
const entries = (A) => A.flatMap((row, i) => row.map((v, j) => N(`e${i + 1}${j + 1}`, v, String(v + 1))));
const grid = (A) => A.map((row, i) => "row " + (i + 1) + " (" + row.map((_, j) => `{{blank:e${i + 1}${j + 1}}}`).join(", ") + ")").join(", ");
const rot = (th) => [[cos(th), -sin(th)], [sin(th), cos(th)]];

concept("amaths.matrices.transformations", { file: "matrices/transformations", keyPrefix: "matrices.transformations" }, (b) => {
  same(mat.mul([[1, 0], [0, -1]], [[2], [3]]), [[2], [-3]]);
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`Which matrix represents a reflection in the $x$-axis?`,
    options: [
      [t`$\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$`, t`Correct: $(x, y) \to (x, -y)$; $\mathbf{i}$ is fixed and $\mathbf{j} \to -\mathbf{j}$.`],
      [t`$\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$`, t`This sends $(x, y) \to (-x, y)$: a reflection in the $y$-axis.`],
      [t`$\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$`, t`This swaps $x$ and $y$: a reflection in $y = x$.`],
      [t`$\begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}$`, t`This sends $(x, y) \to (-x, -y)$: a rotation of $180^\circ$ about $O$.`],
    ],
    answer: "A",
    explanation: t`The columns are the images of $\mathbf{i} = (1, 0)$ and $\mathbf{j} = (0, 1)$: $(1, 0)$ and $(0, -1)$.`,
  });

  same(r9(rot(-PI / 2)), [[0, 1], [-1, 0]]);
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`Which transformation is represented by $\begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}$?`,
    options: [
      [t`A rotation of $90^\circ$ clockwise about $O$`, t`Correct: $\mathbf{i} \to (0, -1)$ and $\mathbf{j} \to (1, 0)$, a quarter-turn clockwise.`],
      [t`A rotation of $90^\circ$ anticlockwise about $O$`, t`That matrix is $\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}$; here $\mathbf{i}$ goes down, not up.`],
      [t`A reflection in the line $y = x$`, t`That matrix is $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$, with no minus sign.`],
      [t`A reflection in the line $y = -x$`, t`That matrix is $\begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}$.`],
    ],
    answer: "A",
    explanation: t`It is the rotation matrix with $\cos\theta = 0$, $\sin\theta = -1$, so $\theta = -90^\circ$.`,
  });

  const d3 = mat.det([[2, -1], [3, 4]]);
  chk(d3, 11);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A shape of area 5 cm² is transformed by the matrix $\begin{pmatrix} 2 & -1 \\ 3 & 4 \end{pmatrix}$. Find the area of the image.`,
    value: 5 * d3, unit: "cm²", wrong: [25, 30],
    explanation: t`$\det = 8 - (-3) = 11$, so the area is multiplied by 11: $55$ cm². (25 uses $8 - 3 = 5$.)`,
  });

  const im4 = mat.mul([[2, 1], [-1, 3]], [[3], [-2]]);
  same(im4, [[4], [-9]]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the image of the point $(3, -2)$ under the transformation $\begin{pmatrix} 2 & 1 \\ -1 & 3 \end{pmatrix}$.`,
    template: "({{blank:x}}, {{blank:y}})",
    blanks: [N("x", 4, "8"), N("y", -9, "3")],
    explanation: t`$\begin{pmatrix} 2(3) + 1(-2) \\ -1(3) + 3(-2) \end{pmatrix} = \begin{pmatrix} 4 \\ -9 \end{pmatrix}$.`,
  });

  const R5 = rot(PI / 3);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Write down the matrix for a rotation of $60^\circ$ anticlockwise about the origin. Enter the entries row by row, as decimals correct to 3 significant figures where necessary.`,
    template: grid(R5),
    blanks: [D("e11", 0.5, 0.0005, "0.866"), D("e12", -0.866, 0.0005, "0.866"), D("e21", 0.866, 0.0005, "-0.866"), D("e22", 0.5, 0.0005, "-0.5")],
    explanation: t`$\begin{pmatrix} \cos 60^\circ & -\sin 60^\circ \\ \sin 60^\circ & \cos 60^\circ \end{pmatrix} = \begin{pmatrix} 0.5 & -0.866 \\ 0.866 & 0.5 \end{pmatrix}$ (exactly $\frac{\sqrt{3}}{2} = 0.866$).`,
    hints: [t`$\mathbf{i}$ rotates to $(\cos 60^\circ, \sin 60^\circ)$.`],
  });
  chk(R5[1][0], 0.866, 0.0005);

  // M(1,2) = (5,1), M(0,1) = (2,−1) → M = [[1,2],[3,−1]]
  const M6 = [[1, 2], [3, -1]];
  same(mat.mul(M6, [[1], [2]]), [[5], [1]]); same(mat.mul(M6, [[0], [1]]), [[2], [-1]]);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A transformation $\mathbf{M}$ maps $(1, 2)$ to $(5, 1)$ and $(0, 1)$ to $(2, -1)$. Find $\mathbf{M}$, entering its entries row by row.`,
    template: grid(M6),
    blanks: entries(M6),
    explanation: t`$\mathbf{M}\mathbf{j} = (2, -1)$ is the second column. Since $(1, 2) = \mathbf{i} + 2\mathbf{j}$, $\mathbf{M}\mathbf{i} = (5, 1) - 2(2, -1) = (1, 3)$, the first column. So $\mathbf{M} = ${T(M6)}$.`,
    hints: [t`Write $(1, 2)$ as $\mathbf{i} + 2\mathbf{j}$.`],
  });

  const comp7 = mat.mul([[0, 1], [1, 0]], [[0, -1], [1, 0]]);
  same(comp7, [[1, 0], [0, -1]]);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A rotation of $90^\circ$ anticlockwise about $O$ is followed by a reflection in the line $y = x$. Which single transformation is equivalent?`,
    options: [
      [t`A reflection in the $x$-axis`, t`Correct: $\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}$.`],
      [t`A reflection in the $y$-axis`, t`This is the product in the other order (reflection first): $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$.`],
      [t`A rotation of $180^\circ$ about $O$`, "A rotation combined with one reflection is a reflection, not a rotation."],
      [t`A reflection in the line $y = -x$`, t`Check the image of $\mathbf{i}$: it goes to $(0, 1)$, then to $(1, 0)$, so $\mathbf{i}$ is fixed.`],
    ],
    answer: "A",
    explanation: t`"Rotation then reflection" is (reflection matrix) × (rotation matrix). The result fixes $\mathbf{i}$ and sends $\mathbf{j}$ to $-\mathbf{j}$.`,
    hints: ["The matrix of the transformation applied first goes on the right."],
  });
  same(mat.mul([[0, -1], [1, 0]], [[0, 1], [1, 0]]), [[-1, 0], [0, 1]]);

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`The shear $\begin{pmatrix} 1 & 4 \\ 0 & 1 \end{pmatrix}$ leaves the area of every shape unchanged.`,
    answer: true,
    explanation: t`Its determinant is $1 \times 1 - 4 \times 0 = 1$, so the area scale factor is 1.`,
  });

  const A9 = [[3, 1], [5, 2]];
  const obj9 = r9(mat.mul(mat.inv(A9), [[4], [7]]));
  same(obj9, [[1], [1]]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Under the transformation $${T(A9)}$, the point $P$ is mapped to $(4, 7)$. Find the coordinates of $P$.`,
    template: "P = ({{blank:x}}, {{blank:y}})",
    blanks: [N("x", 1, "19"), N("y", 1, "34")],
    explanation: t`$\det = 6 - 5 = 1$, $\mathbf{A}^{-1} = ${T(r9(mat.inv(A9)))}$. $P = \mathbf{A}^{-1}\begin{pmatrix} 4 \\ 7 \end{pmatrix} = \begin{pmatrix} 8 - 7 \\ -20 + 21 \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$. (19, 34 is the image of (4, 7), not the object.)`,
    hints: ["Use the inverse matrix to go from image back to object."],
  });

  // |k² − 6| × 4 = 40 → k² = 16 (k > 0) → k = 4
  chk(Math.abs(mat.det([[4, 3], [2, 4]])) * 4, 40);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The matrix $\begin{pmatrix} k & 3 \\ 2 & k \end{pmatrix}$, where $k > 0$, maps a triangle of area 4 square units onto a triangle of area 40 square units. Find $k$.`,
    prefix: "k =", value: 4, wrong: [2, 16],
    explanation: t`Area scale factor $|k^2 - 6| = \frac{40}{4} = 10$. Either $k^2 - 6 = 10$, giving $k = 4$, or $k^2 - 6 = -10$, giving $k^2 = -4$ (impossible). So $k = 4$.`,
    hints: ["Area scale factor = |det|.", "Consider both signs inside the modulus."],
  });

  const ang11 = deg(atan2(0.96, 0.28));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The matrix $\begin{pmatrix} 0.28 & -0.96 \\ 0.96 & 0.28 \end{pmatrix}$ represents a rotation about the origin. Find the angle of rotation (anticlockwise), in degrees to 1 decimal place.`,
    value: ang11, unit: "°", wrong: [16.3, -73.7],
    explanation: t`Compare with $\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$: $\cos\theta = 0.28$ and $\sin\theta = 0.96$ (both positive, so the angle is acute), giving $\theta = 73.7^\circ$.`,
    hints: ["Match the matrix with the general rotation matrix."],
  });

  // Reflection with cos 2α = 0.6, sin 2α = 0.8 → tan α = 0.5
  const al12 = atan2(0.8, 0.6) / 2;
  chk(tan(al12), 0.5);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The matrix $\begin{pmatrix} 0.6 & 0.8 \\ 0.8 & -0.6 \end{pmatrix}$ represents a reflection in a line through the origin. Find the gradient of the mirror line, and the angle it makes with the positive $x$-axis in degrees (1 d.p.).`,
    template: "gradient {{blank:m}}, angle {{blank:a}}°",
    blanks: [D("m", 0.5, 0.001, "2"), D("a", Math.round(deg(al12) * 10) / 10, 0.05, "53.1")],
    explanation: t`A reflection in $y = x\tan\alpha$ has matrix $\begin{pmatrix} \cos 2\alpha & \sin 2\alpha \\ \sin 2\alpha & -\cos 2\alpha \end{pmatrix}$. So $\cos 2\alpha = 0.6$, $\sin 2\alpha = 0.8$, $2\alpha = 53.13^\circ$, $\alpha = 26.6^\circ$ and the gradient is $\tan 26.57^\circ = 0.5$. Check: $(2, 1)$ on $y = 0.5x$ is fixed: $(1.2 + 0.8, 1.6 - 0.6) = (2, 1)$.`,
    hints: [t`The matrix entries involve $2\alpha$, not $\alpha$.`],
  });
  same(r9(mat.mul([[0.6, 0.8], [0.8, -0.6]], [[2], [1]])), [[2], [1]]);

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each matrix with the transformation it represents.",
    pairs: [
      [t`$\begin{pmatrix} 3 & 0 \\ 0 & 3 \end{pmatrix}$`, "Enlargement, centre O, scale factor 3"],
      [t`$\begin{pmatrix} 1 & 0 \\ 0 & 3 \end{pmatrix}$`, "Stretch parallel to the y-axis, factor 3"],
      [t`$\begin{pmatrix} 1 & 3 \\ 0 & 1 \end{pmatrix}$`, "Shear with the x-axis invariant"],
      [t`$\begin{pmatrix} -1 & 0 \\ 0 & -1 \end{pmatrix}$`, "Rotation of 180° about O"],
    ],
    explanation: t`Read the columns as the images of $\mathbf{i}$ and $\mathbf{j}$.`,
  });

  let n14 = 1;
  while (Math.abs(mat.pow(rot(PI / 4), n14)[0][0] - 1) > 1e-9) n14++;
  chk(n14, 8);
  b.num({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`$\mathbf{R}$ represents a rotation of $45^\circ$ anticlockwise about $O$. Find the smallest positive integer $n$ such that $\mathbf{R}^n = \mathbf{I}$.`,
    prefix: "n =", value: n14, wrong: [4, 45],
    explanation: t`$\mathbf{R}^n$ is a rotation of $45n^\circ$; this is the identity when $45n$ is a multiple of 360, first at $n = 8$.`,
    hints: ["What single transformation is Rⁿ?"],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`The matrix $\mathbf{A} = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$ has positive entries with $ad > bc$. By considering the image of the unit square, show that the area scale factor of the transformation is $ad - bc$.`,
    points: [
      t`B1 the unit square $O(0,0)$, $(1,0)$, $(1,1)$, $(0,1)$ maps to the parallelogram $O$, $(a, c)$, $(a + b, c + d)$, $(b, d)$.`,
      t`M1 encloses the parallelogram in the rectangle $(a + b)$ by $(c + d)$.`,
      t`M1 subtracts two triangles of area $\frac{1}{2}ac$, two of area $\frac{1}{2}bd$ and two rectangles of area $bc$.`,
      t`A1 obtains $ad - bc$; since the unit square has area 1, every area is multiplied by $ad - bc$.`,
    ],
    modelAnswer: t`The images of $\mathbf{i}$ and $\mathbf{j}$ are $(a, c)$ and $(b, d)$, so the unit square maps to the parallelogram with vertices $O$, $(a, c)$, $(a + b, c + d)$, $(b, d)$.
$$
\text{Area} = (a + b)(c + d) - 2 \cdot \tfrac{1}{2}ac - 2 \cdot \tfrac{1}{2}bd - 2bc
$$
$$
= ac + ad + bc + bd - ac - bd - 2bc = ad - bc
$$
The unit square (area 1) becomes area $ad - bc = \det\mathbf{A}$; any shape is made of small squares, so all areas are multiplied by $\det\mathbf{A}$.`,
    explanation: "A sketch of the parallelogram inside its bounding rectangle makes the subtraction clear.",
    hints: ["Draw the image of the unit square and its bounding rectangle."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: t`Describe fully the transformation represented by $\begin{pmatrix} 3 & 0 \\ 0 & 1 \end{pmatrix}$.`,
    points: ["A stretch parallel to the x-axis.", "Scale factor 3, with the y-axis invariant (points on the y-axis do not move)."],
    modelAnswer: "A stretch parallel to the x-axis, scale factor 3, with the y-axis as the invariant line: (x, y) → (3x, y).",
    explanation: "A full description of a stretch gives its direction (or invariant line) and its factor.",
    hints: ["Where do i and j go?"],
  });

  // y = 2x + 1 under diag(1, 3): (x, 2x + 1) → (x, 6x + 3)
  same(mat.mul([[1, 0], [0, 3]], [[2], [5]]), [[2], [6 * 2 + 3]]);
  b.expr({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the equation of the image of the line $y = 2x + 1$ under the transformation $\begin{pmatrix} 1 & 0 \\ 0 & 3 \end{pmatrix}$. Give it in the form y = mx + c.`,
    accepted: ["y=6x+3", "y=3+6x", "y=3(2x+1)"],
    wrong: ["y=2x+3"],
    explanation: t`A point $(x, 2x + 1)$ maps to $(X, Y) = (x, 6x + 3)$. With $x = X$: $Y = 6X + 3$, i.e. $y = 6x + 3$.`,
    hints: ["Transform a general point (x, 2x + 1)."],
  });

  // Struct 14: A shear, B rotation 90°
  const A = [[1, 2], [0, 1]], B = [[0, -1], [1, 0]];
  const sq = mat.mul(A, [[2, 2, 0], [0, 2, 2]]);
  same(sq, [[2, 6, 4], [0, 2, 2]]);
  const BA = mat.mul(B, A);
  same(BA, [[0, -1], [1, 2]]);
  const BAi = r9(mat.inv(BA));
  same(BAi, [[2, 1], [-1, 0]]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The matrices $\mathbf{A} = ${T(A)}$ and $\mathbf{B} = ${T(B)}$ represent transformations of the plane. The square $S$ has vertices $(0, 0)$, $(2, 0)$, $(2, 2)$ and $(0, 2)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`Find the images of $(2, 2)$ and $(0, 2)$ under $\mathbf{A}$.`, template: "(2, 2) → ({{blank:a}}, {{blank:b}}); (0, 2) → ({{blank:c}}, {{blank:d}})",
        blanks: [N("a", 6, "2"), N("b", 2, "6"), N("c", 4, "0"), N("d", 2, "4")],
        explanation: t`$\mathbf{A}\begin{pmatrix} 2 & 0 \\ 2 & 2 \end{pmatrix} = \begin{pmatrix} 6 & 4 \\ 2 & 2 \end{pmatrix}$. The shear keeps the $x$-axis fixed and slides points sideways by twice their height.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Find the matrix of the transformation "$\mathbf{A}$ followed by $\mathbf{B}$", entering it row by row.`, template: grid(BA), blanks: entries(BA),
        explanation: t`$\mathbf{A}$ first, so the matrix is $\mathbf{BA} = ${T(B)}${T(A)} = ${T(BA)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: t`Find the area of the image of $S$ under $\mathbf{BA}$.`, value: 4 * Math.abs(mat.det(BA)), wrong: [8, 2],
        explanation: t`$\det(\mathbf{BA}) = 0 \times 2 - (-1)(1) = 1$, and $S$ has area 4, so the image has area 4: shears and rotations preserve area.` }),
      P.fib({ label: "(d)", marks: 4, stem: t`Find $(\mathbf{BA})^{-1}$, entering it row by row.`, template: grid(BAi), blanks: entries(BAi),
        explanation: t`$\det = 1$, so $(\mathbf{BA})^{-1} = ${T(BAi)}$ (equivalently $\mathbf{A}^{-1}\mathbf{B}^{-1}$: undo the rotation, then undo the shear).` }),
    ],
    explanation: "Transform vertices by multiplication, combine with the first transformation on the right, and use the determinant for area.",
    hints: ["The matrix applied first is written on the right.", "Area scale factor = |det|."],
  });

  // Struct 13: M(1,1) = (4,3), M(1,−1) = (2,−1)
  const M = [[3, 1], [1, 2]];
  same(mat.mul(M, [[1], [1]]), [[4], [3]]); same(mat.mul(M, [[1], [-1]]), [[2], [-1]]);
  chk(mat.det(M), 5);
  const obj = r9(mat.mul(mat.inv(M), [[7], [9]]));
  same(obj, [[1], [4]]);
  const M2 = mat.mul(M, M);
  same(M2, [[10, 5], [5, 5]]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`A transformation of the plane is represented by the matrix $\mathbf{M}$. It maps $(1, 1)$ to $(4, 3)$ and $(1, -1)$ to $(2, -1)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`By finding the images of $\mathbf{i}$ and $\mathbf{j}$, find $\mathbf{M}$. Enter it row by row.`, template: grid(M), blanks: entries(M),
        explanation: t`$\mathbf{i} = \frac{1}{2}[(1, 1) + (1, -1)]$, so $\mathbf{M}\mathbf{i} = \frac{1}{2}[(4, 3) + (2, -1)] = (3, 1)$; $\mathbf{j} = \frac{1}{2}[(1, 1) - (1, -1)]$, so $\mathbf{M}\mathbf{j} = (1, 2)$. Hence $\mathbf{M} = ${T(M)}$.` }),
      P.fib({ label: "(b)", marks: 2, stem: t`Find $\det\mathbf{M}$ and the area of the image of the triangle with vertices $(0, 0)$, $(1, 1)$ and $(1, -1)$.`, template: "det M = {{blank:d}}, area of image = {{blank:a}}",
        blanks: [N("d", 5, "7"), N("a", 5, "1")],
        explanation: t`$\det\mathbf{M} = 6 - 1 = 5$. The triangle has area $\frac{1}{2} \times 2 \times 1 = 1$, so its image has area 5.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Find the point that $\mathbf{M}$ maps to $(7, 9)$.`, template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 1, "30", 1), N("y", 4, "25", 2)],
        explanation: t`$\mathbf{M}^{-1} = \frac{1}{5}\begin{pmatrix} 2 & -1 \\ -1 & 3 \end{pmatrix}$, so the point is $\frac{1}{5}\begin{pmatrix} 14 - 9 \\ -7 + 27 \end{pmatrix} = \begin{pmatrix} 1 \\ 4 \end{pmatrix}$. Check: $\mathbf{M}\begin{pmatrix} 1 \\ 4 \end{pmatrix} = \begin{pmatrix} 7 \\ 9 \end{pmatrix}$.` }),
      P.fib({ label: "(d)", marks: 4, stem: t`Find the matrix of the transformation obtained by applying $\mathbf{M}$ twice. Enter it row by row.`, template: grid(M2),
        blanks: M2.flatMap((row, i) => row.map((v, j) => N(`e${i + 1}${j + 1}`, v, String(v * 2)))),
        explanation: t`$\mathbf{M}^2 = ${T(M)}${T(M)} = ${T(M2)}$, with determinant $25 = 5^2$: areas are multiplied by 25.` }),
    ],
    explanation: "Linearity lets you find the images of i and j from any two independent vectors.",
    hints: [t`Write $\mathbf{i}$ and $\mathbf{j}$ in terms of $(1, 1)$ and $(1, -1)$.`, "Use the inverse matrix to find an object from its image."],
  });
  chk(mat.det(M2), 25);
  chk(rad(90), PI / 2);

  b.card("CONCEPT", "Columns are images", t`The first column of $\mathbf{M}$ is the image of $\mathbf{i}$, the second the image of $\mathbf{j}$.`);
  b.card("FORMULA", "Rotation about O", t`$\begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ (anticlockwise $\theta$)`);
  b.card("FORMULA", "Reflection in y = x tan α", t`$\begin{pmatrix} \cos 2\alpha & \sin 2\alpha \\ \sin 2\alpha & -\cos 2\alpha \end{pmatrix}$`);
  b.card("FORMULA", "Stretches and shears", t`Stretch $\parallel x$-axis: $\begin{pmatrix} k & 0 \\ 0 & 1 \end{pmatrix}$; shear, $x$-axis fixed: $\begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$.`);
  b.card("FACT", "Order of combination", t`$\mathbf{AB}$ means $\mathbf{B}$ first, then $\mathbf{A}$.`);
  b.card("FACT", "Area scale factor", t`Area of image $= |\det\mathbf{M}| \times$ area of object.`);
  b.card("CONCEPT", "Inverse transformation", t`$\mathbf{M}^{-1}$ undoes $\mathbf{M}$: object $= \mathbf{M}^{-1} \times$ image.`);
  b.card("FACT", "Reflections and rotations", t`A reflection satisfies $\mathbf{M}^2 = \mathbf{I}$; a rotation of $\theta$ repeated $n$ times is a rotation of $n\theta$.`);
  b.card("CONCEPT", "Describing a transformation fully", "Rotation: centre, angle, direction. Reflection: mirror line. Stretch: direction/invariant line and factor. Shear: invariant line and one image.");
});
