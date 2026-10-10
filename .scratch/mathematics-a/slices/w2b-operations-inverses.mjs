// W2b: amaths.matrices.operations-inverses (ZIMSEC only)
import { concept, P, t, chk, same, mat } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const T = (A) => mat.tex(A);
const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const rounded = (A) => A.map((r) => r.map((v) => Math.round(v * 1e9) / 1e9 + 0));
/** One number blank per matrix entry, row by row: ids e11, e12, ... */
const entries = (A, wrongShift = 1) => A.flatMap((row, i) => row.map((v, j) => N(`e${i + 1}${j + 1}`, v, String(v + wrongShift))));
const grid = (A) => A.map((row, i) => row.map((_, j) => `{{blank:e${i + 1}${j + 1}}}`).join(", ")).join("; ");

concept("amaths.matrices.operations-inverses", { file: "matrices/operations-inverses", keyPrefix: "matrices.operations-inverses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`$\mathbf{A}$ is a $3 \times 2$ matrix and $\mathbf{B}$ is a $2 \times 4$ matrix. What is the order of $\mathbf{AB}$?`,
    options: [
      [t`$3 \times 4$`, "Correct: (3 × 2)(2 × 4) gives the outer numbers, 3 × 4."],
      [t`$2 \times 2$`, "The inner numbers (2 and 2) must match; the result takes the outer numbers."],
      [t`$4 \times 3$`, "This would be the order of (AB) transposed; rows come from A, columns from B."],
      [t`$\mathbf{AB}$ is not defined`, "It is defined: A has 2 columns and B has 2 rows."],
    ],
    answer: "A",
    explanation: t`An $m \times n$ matrix times an $n \times p$ matrix is $m \times p$.`,
  });

  const P1 = [[1, 2], [0, 1]], Q1 = [[1, 0], [3, 1]];
  chk(JSON.stringify(mat.mul(P1, Q1)) === JSON.stringify(mat.mul(Q1, P1)) ? 1 : 0, 0);
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: t`For any two $2 \times 2$ matrices $\mathbf{A}$ and $\mathbf{B}$, $\mathbf{AB} = \mathbf{BA}$.`,
    answer: false,
    explanation: t`Matrix multiplication is not commutative. For example, with $\mathbf{A} = ${T(P1)}$ and $\mathbf{B} = ${T(Q1)}$, $\mathbf{AB} = ${T(mat.mul(P1, Q1))}$ but $\mathbf{BA} = ${T(mat.mul(Q1, P1))}$.`,
  });

  const d3 = mat.det([[4, -3], [2, 5]]);
  chk(d3, 26);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the determinant of $${T([[4, -3], [2, 5]])}$.`,
    value: d3, wrong: [14, -26],
    explanation: t`$ad - bc = 4(5) - (-3)(2) = 20 + 6 = 26$. (14 forgets that subtracting $-6$ adds 6.)`,
  });

  const A4 = [[5, 3], [3, 2]];
  const inv4 = rounded(mat.inv(A4));
  same(inv4, [[2, -3], [-3, 5]]);
  same(rounded(mat.mul(A4, inv4)), [[1, 0], [0, 1]]);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`Find the inverse of $${T(A4)}$. Enter the entries row by row.`,
    template: `Inverse: row 1 ({{blank:e11}}, {{blank:e12}}), row 2 ({{blank:e21}}, {{blank:e22}})`,
    blanks: [N("e11", 2, "5"), N("e12", -3, "3"), N("e21", -3, "3"), N("e22", 5, "2")],
    explanation: t`$\det = 10 - 9 = 1$. Swap the leading diagonal, change the signs of the other two entries, divide by 1: $${T(inv4)}$.`,
  });

  const p5 = mat.mul([[3, -1], [2, 4]], [[1, 5], [-2, 0]]);
  same(p5, [[5, 15], [-6, 10]]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find $${T([[3, -1], [2, 4]])}${T([[1, 5], [-2, 0]])}$. Enter the entries row by row.`,
    template: "Row 1 ({{blank:e11}}, {{blank:e12}}), row 2 ({{blank:e21}}, {{blank:e22}})",
    blanks: entries(p5),
    explanation: t`Row × column: $3(1) + (-1)(-2) = 5$, $3(5) + (-1)(0) = 15$, $2(1) + 4(-2) = -6$, $2(5) + 4(0) = 10$. So the product is $${T(p5)}$.`,
    hints: ["Each entry is a row of the first matrix times a column of the second."],
  });

  const C6 = [[3, 0, 2], [1, 4, -1], [2, -1, 5]];
  const d6 = mat.det(C6);
  chk(d6, 39);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the determinant of $${T(C6)}$.`,
    value: d6, wrong: [75, 57],
    explanation: t`Expand along row 1: $3(20 - 1) - 0(5 + 2) + 2(-1 - 8) = 57 - 0 - 18 = 39$.`,
    hints: ["Use the sign pattern + − + along the first row.", "A zero entry saves a calculation."],
  });

  // k(k − 1) − 12 = 0 → k = −3, 4
  for (const k of [-3, 4]) chk(mat.det([[k, 2], [6, k - 1]]), 0);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Find the values of $k$ for which $\begin{pmatrix} k & 2 \ 6 & k - 1 \end{pmatrix}$ is singular. Give them in ascending order.`,
    template: "k = {{blank:a}} or k = {{blank:b}}",
    blanks: [N("a", -3, "3"), N("b", 4, "-4")],
    explanation: t`Singular means $\det = 0$: $k(k - 1) - 12 = 0 \Rightarrow k^2 - k - 12 = 0 \Rightarrow (k - 4)(k + 3) = 0$, so $k = -3$ or $4$.`,
    hints: ["Set the determinant equal to 0."],
  });

  // det [[1,2,k],[0,1,3],[2,1,4]] = 13 − 2k
  const k8 = 6.5;
  chk(mat.det([[1, 2, k8], [0, 1, 3], [2, 1, 4]]), 0);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Find the value of $k$ for which the matrix $\begin{pmatrix} 1 & 2 & k \\ 0 & 1 & 3 \\ 2 & 1 & 4 \end{pmatrix}$ has no inverse.`,
    prefix: "k =", value: k8, wrong: [-6.5, 5.5],
    explanation: t`$\det = 1(4 - 3) - 2(0 - 6) + k(0 - 2) = 1 + 12 - 2k = 13 - 2k$. No inverse when $13 - 2k = 0$, i.e. $k = 6.5$.`,
    hints: ["Expand the determinant in terms of k and set it equal to 0."],
  });

  const A9 = [[2, 0, 1], [1, 1, 0], [0, 3, 1]];
  const adj9 = mat.adj(A9);
  same(adj9, [[1, 3, -1], [-1, 2, 1], [3, -6, 2]]);
  chk(mat.det(A9), 5);
  same(rounded(mat.mul(A9, mat.scale(1 / 5, adj9))), I3);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false,
    stem: t`For $\mathbf{A} = ${T(A9)}$, $\mathbf{A}^{-1} = \dfrac{1}{\det\mathbf{A}}\operatorname{adj}\mathbf{A}$. Find $\det\mathbf{A}$ and the adjoint, entering its entries row by row.`,
    template: `det A = {{blank:d}}. adj A: ${grid(adj9)}`,
    blanks: [N("d", 5, "-5"), ...entries(adj9)],
    explanation: t`$\det\mathbf{A} = 2(1 - 0) - 0 + 1(3 - 0) = 5$. Cofactors by rows: $1, -1, 3$; $3, 2, -6$; $-1, 1, 2$. Transposing gives $\operatorname{adj}\mathbf{A} = ${T(adj9)}$, so $\mathbf{A}^{-1} = \frac{1}{5}${T(adj9)}$.`,
    hints: ["Find all nine cofactors with the sign pattern, then transpose."],
  });

  const A10 = [[4, 3], [5, 4]];
  const X10 = rounded(mat.mul(mat.inv(A10), [[11], [14]]));
  same(X10, [[2], [1]]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Write the equations $4x + 3y = 11$ and $5x + 4y = 14$ as a matrix equation and solve them using an inverse matrix.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 2, "1"), N("y", 1, "2")],
    explanation: t`$${T(A10)}\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 11 \\ 14 \end{pmatrix}$. $\det = 16 - 15 = 1$, inverse $${T(rounded(mat.inv(A10)))}$. So $\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} 44 - 42 \\ -55 + 56 \end{pmatrix} = \begin{pmatrix} 2 \\ 1 \end{pmatrix}$.`,
    hints: [t`$\mathbf{X} = \mathbf{A}^{-1}\mathbf{b}$, with $\mathbf{A}^{-1}$ on the left.`],
  });

  const M11 = [[1, 0, 2], [2, 1, 0], [0, 1, 1]];
  const X11 = rounded(mat.mul(mat.inv(M11), [[7], [4], [5]]));
  same(X11, [[1], [2], [3]]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Solve the simultaneous equations $x + 2z = 7$, $2x + y = 4$, $y + z = 5$ using matrices.`,
    template: "x = {{blank:x}}, y = {{blank:y}}, z = {{blank:z}}",
    blanks: [N("x", 1, "2"), N("y", 2, "1"), N("z", 3, "2")],
    explanation: t`$\mathbf{M} = ${T(M11)}$ has $\det = 1(1 - 0) - 0 + 2(2 - 0) = 5$ and $\operatorname{adj}\mathbf{M} = ${T(mat.adj(M11))}$. Then $\mathbf{X} = \frac{1}{5}\operatorname{adj}\mathbf{M}\begin{pmatrix} 7 \\ 4 \\ 5 \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$. Check: $1 + 6 = 7$, $2 + 2 = 4$, $2 + 3 = 5$.`,
    hints: ["Put the coefficients in a 3 × 3 matrix, with 0 for missing variables."],
  });

  b.mcq({
    d: 3, skill: "RECALL", calculator: false,
    stem: t`$\mathbf{A}$ and $\mathbf{B}$ are non-singular square matrices of the same order. Which expression equals $(\mathbf{AB})^{-1}$?`,
    options: [
      [t`$\mathbf{B}^{-1}\mathbf{A}^{-1}$`, t`Correct: $(\mathbf{AB})(\mathbf{B}^{-1}\mathbf{A}^{-1}) = \mathbf{A}\mathbf{I}\mathbf{A}^{-1} = \mathbf{I}$.`],
      [t`$\mathbf{A}^{-1}\mathbf{B}^{-1}$`, t`The order reverses; $\mathbf{A}^{-1}\mathbf{B}^{-1}$ is $(\mathbf{BA})^{-1}$, which is different in general.`],
      [t`$\mathbf{BA}$`, "This is not an inverse at all."],
      [t`$\dfrac{1}{\mathbf{AB}}$`, "Division by a matrix is not defined; use the inverse matrix."],
    ],
    answer: "A",
    explanation: "Like socks and shoes: undo the last operation first.",
    hints: [t`Multiply $\mathbf{AB}$ by each option and see which gives $\mathbf{I}$.`],
  });

  const A13 = [[1, 2, 0], [0, 3, 1], [1, 0, 1]];
  chk(mat.det(A13), 5);
  chk(mat.det(mat.scale(2, A13)), 8 * 5);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`$\mathbf{A}$ is a $3 \times 3$ matrix with $\det\mathbf{A} = 5$. Find $\det(2\mathbf{A})$.`,
    value: 40, wrong: [10, 20],
    explanation: t`Multiplying the matrix by 2 multiplies each of the 3 rows by 2, and each row factor multiplies the determinant by 2: $\det(2\mathbf{A}) = 2^3 \times 5 = 40$. (10 multiplies only once.)`,
    hints: ["Each row of 2A is twice a row of A."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each term with its description.",
    pairs: [
      ["Identity matrix", "Square, with 1s on the leading diagonal and 0s elsewhere"],
      ["Null matrix", "Every entry is 0"],
      ["Singular matrix", "A square matrix whose determinant is 0"],
      ["Adjoint (adjugate)", "The transpose of the matrix of cofactors"],
    ],
    explanation: t`Only non-singular matrices have inverses: $\mathbf{A}^{-1} = \frac{1}{\det\mathbf{A}}\operatorname{adj}\mathbf{A}$.`,
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`$\mathbf{A}$ and $\mathbf{B}$ are non-singular $n \times n$ matrices. Prove that $(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$.`,
    points: [
      t`M1 multiplies $(\mathbf{AB})(\mathbf{B}^{-1}\mathbf{A}^{-1})$ and uses associativity to regroup as $\mathbf{A}(\mathbf{BB}^{-1})\mathbf{A}^{-1}$.`,
      t`M1 uses $\mathbf{BB}^{-1} = \mathbf{I}$ and $\mathbf{AI} = \mathbf{A}$ to reach $\mathbf{AA}^{-1} = \mathbf{I}$.`,
      t`A1 concludes that $\mathbf{B}^{-1}\mathbf{A}^{-1}$ is the inverse of $\mathbf{AB}$ (inverses are unique).`,
    ],
    modelAnswer: t`$$
(\mathbf{AB})(\mathbf{B}^{-1}\mathbf{A}^{-1}) = \mathbf{A}(\mathbf{B}\mathbf{B}^{-1})\mathbf{A}^{-1} = \mathbf{A}\mathbf{I}\mathbf{A}^{-1} = \mathbf{A}\mathbf{A}^{-1} = \mathbf{I}
$$
So $\mathbf{B}^{-1}\mathbf{A}^{-1}$ multiplied by $\mathbf{AB}$ gives the identity; since a matrix has only one inverse, $(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$.`,
    explanation: "Associativity lets you move the brackets; commutativity is never needed.",
    hints: ["Multiply AB by B⁻¹A⁻¹ and regroup."],
  });

  // x + 2y = 3, 2x + 4y = k: infinitely many solutions iff k = 6
  chk(mat.det([[1, 2], [2, 4]]), 0);
  b.fib({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The equations $x + 2y = 3$ and $2x + 4y = k$ have no unique solution. Find the value of $k$ for which they have infinitely many solutions.`,
    template: "k = {{blank:k}}",
    blanks: [N("k", 6, "3")],
    explanation: t`$\det\begin{pmatrix} 1 & 2 \\ 2 & 4 \end{pmatrix} = 0$, so the lines are parallel. They coincide (infinitely many solutions) when the second equation is twice the first: $k = 6$. For any other $k$ the lines are parallel and distinct: no solution.`,
    hints: ["Compare the second equation with twice the first."],
  });

  b.manualShort({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`The system $x + y + z = 2$, $x - y + 2z = 1$, $2x + 3z = 4$ has a coefficient matrix with determinant 0. Show, by eliminating a variable, whether the system has no solutions or infinitely many, and interpret this geometrically.`,
    points: [
      "Adds the first two equations to get 2x + 3z = 3.",
      "Compares with the third equation 2x + 3z = 4: a contradiction (3 ≠ 4), so the system is inconsistent and has no solution.",
      "Geometrically the three planes have no common point (they form a triangular prism).",
    ],
    modelAnswer: "Adding the first two equations gives 2x + 3z = 3, but the third says 2x + 3z = 4. Both cannot hold, so there is no solution: the equations are inconsistent. The three planes meet in pairs along three parallel lines (a triangular prism) with no point common to all three.",
    explanation: "A zero determinant means no unique solution; elimination decides between none and infinitely many.",
    hints: ["Add the first two equations."],
  });
  chk(mat.det([[1, 1, 1], [1, -1, 2], [2, 0, 3]]), 0);

  // Struct 14: A = [[1,2,1],[0,1,2],[1,0,3]]
  const A = [[1, 2, 1], [0, 1, 2], [1, 0, 3]];
  const adj = mat.adj(A);
  same(adj, [[3, -6, 3], [2, 2, -2], [-1, 2, 1]]);
  chk(mat.det(A), 6);
  same(rounded(mat.mul(A, mat.scale(1 / 6, adj))), I3);
  const X = rounded(mat.mul(mat.inv(A), [[3], [5], [11]]));
  same(X, [[2], [-1], [3]]);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`The matrix $\mathbf{A}$ is $${T(A)}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: t`Find $\det\mathbf{A}$.`, value: 6, wrong: [-6, 2],
        explanation: t`$1(3 - 0) - 2(0 - 2) + 1(0 - 1) = 3 + 4 - 1 = 6$.` }),
      P.fib({ label: "(b)", marks: 9, stem: t`Find the adjoint $\operatorname{adj}\mathbf{A}$, entering the entries row by row, so that $\mathbf{A}^{-1} = \frac{1}{6}\operatorname{adj}\mathbf{A}$.`, template: grid(adj),
        blanks: entries(adj),
        explanation: t`Cofactors by rows: $3, 2, -1$; $-6, 2, 2$; $3, -2, 1$. Transposing: $\operatorname{adj}\mathbf{A} = ${T(adj)}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: t`Hence solve $x + 2y + z = 3$, $y + 2z = 5$, $x + 3z = 11$.`, template: "x = {{blank:x}}, y = {{blank:y}}, z = {{blank:z}}",
        blanks: [N("x", 2, "1"), N("y", -1, "1"), N("z", 3, "2")],
        explanation: t`$\mathbf{X} = \frac{1}{6}${T(adj)}\begin{pmatrix} 3 \\ 5 \\ 11 \end{pmatrix} = \frac{1}{6}\begin{pmatrix} 12 \\ -6 \\ 18 \end{pmatrix} = \begin{pmatrix} 2 \\ -1 \\ 3 \end{pmatrix}$.` }),
    ],
    explanation: "Determinant, cofactors, transpose, then X = A⁻¹b.",
    hints: ["Use the sign pattern for cofactors.", "Remember to transpose the matrix of cofactors."],
  });

  // Struct 13: P, Q, (PQ)^{-1} = Q^{-1}P^{-1}
  const Pm = [[3, 2], [4, 3]], Qm = [[2, -1], [-3, 2]];
  const Pi = rounded(mat.inv(Pm)), Qi = rounded(mat.inv(Qm));
  same(Pi, [[3, -2], [-4, 3]]); same(Qi, [[2, 1], [3, 2]]);
  const PQi = rounded(mat.inv(mat.mul(Pm, Qm)));
  same(PQi, rounded(mat.mul(Qi, Pi)));
  same(PQi, [[2, -1], [1, 0]]);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The matrices $\mathbf{P} = ${T(Pm)}$ and $\mathbf{Q} = ${T(Qm)}$ are given. Enter matrices row by row.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: t`Find $\det\mathbf{P}$.`, value: 1, wrong: [17],
        explanation: t`$9 - 8 = 1$.` }),
      P.fib({ label: "(b)", marks: 4, stem: t`Find $\mathbf{P}^{-1}$.`, template: grid(Pi), blanks: entries(Pi),
        explanation: t`$\mathbf{P}^{-1} = \frac{1}{1}${T(Pi)}$.` }),
      P.fib({ label: "(c)", marks: 4, stem: t`Find $\mathbf{Q}^{-1}$.`, template: grid(Qi), blanks: entries(Qi),
        explanation: t`$\det\mathbf{Q} = 4 - 3 = 1$, so $\mathbf{Q}^{-1} = ${T(Qi)}$.` }),
      P.fib({ label: "(d)", marks: 4, stem: t`Hence, without finding $\mathbf{PQ}$ first, find $(\mathbf{PQ})^{-1}$.`, template: grid(PQi), blanks: entries(PQi),
        explanation: t`$(\mathbf{PQ})^{-1} = \mathbf{Q}^{-1}\mathbf{P}^{-1} = ${T(Qi)}${T(Pi)} = ${T(PQi)}$. Check: $\mathbf{PQ} = ${T(mat.mul(Pm, Qm))}$ and $${T(mat.mul(Pm, Qm))}${T(PQi)} = \mathbf{I}$.` }),
    ],
    explanation: "The inverse of a product is the product of the inverses in reverse order.",
    hints: [t`$(\mathbf{PQ})^{-1} = \mathbf{Q}^{-1}\mathbf{P}^{-1}$, not $\mathbf{P}^{-1}\mathbf{Q}^{-1}$.`],
  });
  same(rounded(mat.mul(mat.mul(Pm, Qm), PQi)), [[1, 0], [0, 1]]);

  b.card("DEFINITION", "Conformable matrices", t`$\mathbf{AB}$ exists when the number of columns of $\mathbf{A}$ equals the number of rows of $\mathbf{B}$; $(m \times n)(n \times p) = m \times p$.`);
  b.card("FACT", "Not commutative", t`In general $\mathbf{AB} \ne \mathbf{BA}$; but $(\mathbf{AB})\mathbf{C} = \mathbf{A}(\mathbf{BC})$.`);
  b.card("FORMULA", "2 × 2 inverse", t`$\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \frac{1}{ad - bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$`);
  b.card("CONCEPT", "3 × 3 determinant", "Expand along a row: entry × cofactor, with signs + − + / − + − / + − +.");
  b.card("FORMULA", "3 × 3 inverse", t`$\mathbf{A}^{-1} = \dfrac{1}{\det\mathbf{A}}\operatorname{adj}\mathbf{A}$, adj = transpose of the matrix of cofactors.`);
  b.card("DEFINITION", "Singular matrix", "A square matrix with determinant 0; it has no inverse.");
  b.card("FORMULA", "Inverse of a product", t`$(\mathbf{AB})^{-1} = \mathbf{B}^{-1}\mathbf{A}^{-1}$`);
  b.card("CONCEPT", "Solving AX = b", t`$\mathbf{X} = \mathbf{A}^{-1}\mathbf{b}$ (inverse on the left) when $\det\mathbf{A} \ne 0$.`);
  b.card("FACT", "Zero determinant systems", "No unique solution: either inconsistent (no solution) or infinitely many solutions; eliminate to decide.");
});
