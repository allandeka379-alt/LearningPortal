// W2b exam-format items for ZIMSEC Pure Mathematics: ZP1 ×3 (10 marks, Paper 1), ZP2A ×2 (8, Paper 2 Section A),
// ZP2B ×3 (16, Paper 2 Section B). Every value is computed and checked here.
import { concept, P, t, chk, same, cx, poly, mat, root, iterate, newtonRaphson, deriv, ZP } from "../lib.mjs";

const { cos, sin, sqrt, cbrt, PI } = Math;
const Q = (k) => `amaths.${k}`;
const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
const KPI = (id, theta, n, d, wrong, marks) => {
  chk(theta / PI, n / d, 1e-9, `${id} = ${n}/${d} π`);
  const v = n / d;
  return { id, input: "number", accepted: [`${n}/${d}`, v.toFixed(4), v.toFixed(3)], tolerance: 0.002, wrong, ...(marks ? { marks } : {}) };
};
const pev = (c, z) => c.reduce((acc, a) => cx.add(cx.mul(acc, z), [a, 0]), [0, 0]);
const isRoot = (c, z, l) => { const v = pev(c, z); chk(v[0], 0, 1e-9, l); chk(v[1], 0, 1e-9, l); };
const r9 = (A) => A.map((r) => r.map((v) => Math.round(v * 1e9) / 1e9 + 0));
const T = (A) => mat.tex(A);
const last = (xs) => xs[xs.length - 1];

concept(Q("complex.de-moivre"), { file: "exam/w2b-zimsec-pure", keyPrefix: "exam.w2b-zimsec-pure", applies: ZP }, (b) => {
  // ---------------------------------------------------------------- ZP1-1 (10): de Moivre, cos 3θ, cubic
  const sols = [PI / 9, (5 * PI) / 9, (7 * PI) / 9].map(cos);
  for (const x of sols) chk(8 * x ** 3 - 6 * x - 1, 0, 1e-12);
  for (const th of [0.3, 1.2, 2.6]) chk(cos(3 * th), 4 * cos(th) ** 3 - 3 * cos(th));
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("complex.de-moivre")],
    stem: t`This question uses de Moivre's theorem to solve a cubic equation.`,
    parts: [
      P.proof({ label: "(a)", marks: 4, stem: t`Use de Moivre's theorem to show that $\cos 3\theta = 4\cos^3\theta - 3\cos\theta$.`,
        points: [t`M1 writes $\cos 3\theta + \mathrm{i}\sin 3\theta = (\cos\theta + \mathrm{i}\sin\theta)^3$.`, t`M1 expands binomially: $c^3 + 3\mathrm{i}c^2s - 3cs^2 - \mathrm{i}s^3$.`, t`M1 equates real parts and uses $s^2 = 1 - c^2$.`, "A1 reaches the given result."],
        modelAnswer: t`$$
\cos 3\theta + \mathrm{i}\sin 3\theta = (c + \mathrm{i}s)^3 = c^3 + 3\mathrm{i}c^2s - 3cs^2 - \mathrm{i}s^3
$$
$$
\cos 3\theta = c^3 - 3cs^2 = c^3 - 3c(1 - c^2) = 4c^3 - 3c
$$`,
        explanation: "Real parts of both sides." }),
      P.fib({ label: "(b)", marks: 6, stem: t`By substituting $x = \cos\theta$, solve the equation $8x^3 - 6x - 1 = 0$. Give the three roots correct to 3 significant figures, in descending order.`, template: "x = {{blank:a}}, {{blank:b}}, {{blank:c}}",
        blanks: [D("a", 0.940, 0.0005, "0.5", 2), D("b", -0.174, 0.0005, "0.174", 2), D("c", -0.766, 0.0005, "-0.940", 2)],
        explanation: t`$8x^3 - 6x = 1 \Rightarrow 2\cos 3\theta = 1 \Rightarrow \cos 3\theta = \frac{1}{2}$. With $0 \le \theta \le \pi$: $3\theta = \frac{\pi}{3}, \frac{5\pi}{3}, \frac{7\pi}{3}$, so $\theta = \frac{\pi}{9}, \frac{5\pi}{9}, \frac{7\pi}{9}$. Roots $\cos\frac{\pi}{9} = 0.940$, $\cos\frac{5\pi}{9} = -0.174$, $\cos\frac{7\pi}{9} = -0.766$.` }),
    ],
    explanation: "A multiple-angle identity converts a cubic into a trigonometric equation with three distinct solutions.",
    hints: [t`$8x^3 - 6x = 2(4\cos^3\theta - 3\cos\theta)$.`, t`Find three values of $3\theta$ in $[0, 3\pi]$.`],
  });
  chk(Math.abs(sols[0] - 0.940) < 0.0005 ? 1 : 0, 1); chk(Math.abs(sols[1] + 0.174) < 0.0005 ? 1 : 0, 1); chk(Math.abs(sols[2] + 0.766) < 0.0005 ? 1 : 0, 1);

  // ---------------------------------------------------------------- ZP1-2 (10): Newton–Raphson
  const f = (x) => x ** 4 - 3 * x - 5, fp = (x) => 4 * x ** 3 - 3;
  chk(f(1), -7); chk(f(2), 5);
  for (const x of [1.3, 2, 2.7]) chk(x - f(x) / fp(x), (3 * x ** 4 + 5) / (4 * x ** 3 - 3));
  const a2 = last(newtonRaphson(f, fp, 2));
  chk(a2, root(f, 1, 2), 1e-12);
  chk(newtonRaphson(f, fp, 1, { maxN: 1 })[1], 8);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("numerical.newton-raphson"), Q("numerical.locating-roots")],
    stem: t`The function f is defined by $f(x) = x^4 - 3x - 5$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the equation $f(x) = 0$ has a root $\alpha$ between 1 and 2.`,
        points: [t`M1 $f(1) = -7$ and $f(2) = 5$.`, "A1 change of sign, f continuous, so 1 < α < 2."],
        modelAnswer: t`$f(1) = 1 - 3 - 5 = -7 < 0$ and $f(2) = 16 - 6 - 5 = 5 > 0$. $f$ is continuous, so there is a root between 1 and 2.`,
        explanation: "Change of sign." }),
      P.proof({ label: "(b)", marks: 2, stem: t`Show that the Newton–Raphson iteration for $f(x) = 0$ can be written $x_{n+1} = \dfrac{3x_n^4 + 5}{4x_n^3 - 3}$.`,
        points: [t`M1 $f'(x) = 4x^3 - 3$ and $x_{n+1} = x_n - \frac{x_n^4 - 3x_n - 5}{4x_n^3 - 3}$.`, "A1 simplifies over a common denominator to the given form."],
        modelAnswer: t`$$
x_{n+1} = x_n - \frac{x_n^4 - 3x_n - 5}{4x_n^3 - 3} = \frac{4x_n^4 - 3x_n - x_n^4 + 3x_n + 5}{4x_n^3 - 3} = \frac{3x_n^4 + 5}{4x_n^3 - 3}
$$`,
        explanation: "The −3xₙ terms cancel." }),
      P.num({ label: "(c)", marks: 4, stem: t`Use the iteration with $x_1 = 2$ to find $\alpha$ correct to 4 decimal places.`, value: a2, dp: 4, wrong: [1.7961, 1.8276],
        explanation: t`$x_2 = 1.827586$, $x_3 = 1.796148$, $x_4 = 1.795177$, $x_5 = 1.795177$: $\alpha = 1.7952$.` }),
      P.num({ label: "(d)", marks: 2, stem: t`Find the value of $x_2$ obtained when $x_1 = 1$ is used instead.`, value: 8, wrong: [-6, 1.7952],
        explanation: t`$x_2 = \frac{3 + 5}{4 - 3} = 8$. The gradient $f'(1) = 1$ is small compared with $f(1) = -7$, so the tangent meets the axis far beyond the root (the curve has a turning point near $x = 0.91$).` }),
    ],
    explanation: "Locate, derive the iteration, iterate, and see how a poor start overshoots.",
    hints: [t`$f'(x) = 4x^3 - 3$.`, "Keep full calculator accuracy between steps."],
  });

  // ---------------------------------------------------------------- ZP1-3 (10): group mod 9
  const S = [1, 2, 4, 5, 7, 8], m9 = (a, c) => (a * c) % 9;
  for (const a of S) for (const c of S) chk(S.includes(m9(a, c)) ? 1 : 0, 1);
  same([m9(2, 4), m9(4, 7), m9(5, 8), m9(7, 7)], [8, 1, 4, 4]);
  same([2, 4, 8].map((a) => S.find((c) => m9(a, c) === 1)), [5, 7, 8]);
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("groups.binary-operations-groups")],
    stem: t`The set $G = \{1, 2, 4, 5, 7, 8\}$ is combined under multiplication modulo 9.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Find these entries of the Cayley table.", template: "2 × 4 = {{blank:a}}, 4 × 7 = {{blank:b}}, 5 × 8 = {{blank:c}}, 7 × 7 = {{blank:d}} (mod 9)",
        blanks: [N("a", 8, "6"), N("b", 1, "28"), N("c", 4, "40"), N("d", 4, "49")],
        explanation: t`$8$; $28 = 3 \times 9 + 1$; $40 = 4 \times 9 + 4$; $49 = 5 \times 9 + 4$.` }),
      P.num({ label: "(b)", marks: 1, stem: "State the identity element.", value: 1, wrong: [0],
        explanation: "1 × a = a for every a." }),
      P.fib({ label: "(c)", marks: 3, stem: "Find the inverses of 2, 4 and 8.", template: "2⁻¹ = {{blank:a}}, 4⁻¹ = {{blank:b}}, 8⁻¹ = {{blank:c}}",
        blanks: [N("a", 5, "7"), N("b", 7, "5"), N("c", 8, "1")],
        explanation: t`$2 \times 5 = 10 \equiv 1$, $4 \times 7 = 28 \equiv 1$, $8 \times 8 = 64 \equiv 1 \pmod 9$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Hence show that G is a group and state whether it is abelian.", points: ["Closure (all entries of the table lie in G) and associativity (inherited from multiplication of integers), with identity 1 and an inverse for every element (1, 2↔5, 4↔7, 8).", "Abelian, since multiplication is commutative (the table is symmetric)."],
        modelAnswer: "Every product lies in G, modular multiplication is associative, 1 is the identity, and each element has an inverse (1⁻¹ = 1, 2 and 5, 4 and 7, 8⁻¹ = 8). So G is a group; it is abelian because a × b = b × a.",
        explanation: "List all four axioms with reasons." }),
    ],
    explanation: "Cayley-table work: products, identity, inverses, then the group axioms.",
    hints: ["Reduce each product modulo 9.", "An inverse gives the identity 1."],
  });

  // ---------------------------------------------------------------- ZP2A-1 (8): transformations
  const A = [[3, 1], [1, 1]], B = [[0, 1], [1, 0]];
  const BA = mat.mul(B, A);
  same(BA, [[1, 1], [3, 1]]);
  chk(mat.det(BA), -2);
  same(r9(mat.mul(mat.inv(BA), [[5], [7]])), [[1], [4]]);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 2",
    concepts: [Q("matrices.transformations"), Q("matrices.operations-inverses")],
    stem: t`The transformation $T$ is represented by $\mathbf{A} = ${T(A)}$, and $\mathbf{B} = ${T(B)}$ represents a reflection in the line $y = x$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: t`Find the matrix of the transformation "$T$ followed by the reflection". Enter it row by row.`, template: "row 1 ({{blank:a}}, {{blank:b}}), row 2 ({{blank:c}}, {{blank:d}})",
        blanks: [N("a", 1, "3"), N("b", 1, "1"), N("c", 3, "1"), N("d", 1, "1")],
        explanation: t`$T$ first, so the matrix is $\mathbf{BA} = ${T(B)}${T(A)} = ${T(BA)}$: the reflection swaps the rows of $\mathbf{A}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "A triangle of area 3 square units is transformed by this combined transformation. Find the area of its image.", value: 6, wrong: [-6, 3],
        explanation: t`$\det(\mathbf{BA}) = 1 - 3 = -2$; area scale factor $|-2| = 2$, so the image has area 6 (the negative sign shows the orientation is reversed).` }),
      P.fib({ label: "(c)", marks: 2, stem: "Find the point that the combined transformation maps to (5, 7).", template: "({{blank:x}}, {{blank:y}})",
        blanks: [N("x", 1, "12"), N("y", 4, "22")],
        explanation: t`$(\mathbf{BA})^{-1} = -\frac{1}{2}\begin{pmatrix} 1 & -1 \\ -3 & 1 \end{pmatrix}$, so the point is $-\frac{1}{2}\begin{pmatrix} 5 - 7 \\ -15 + 7 \end{pmatrix} = \begin{pmatrix} 1 \\ 4 \end{pmatrix}$. Check: $${T(BA)}\begin{pmatrix} 1 \\ 4 \end{pmatrix} = \begin{pmatrix} 5 \\ 7 \end{pmatrix}$.` }),
    ],
    explanation: "Combine with the first transformation on the right; |det| gives the area factor; the inverse finds the object.",
    hints: ["The matrix applied first goes on the right.", "Area scale factor is |det|."],
  });

  // ---------------------------------------------------------------- ZP2A-2 (8): DE and family of curves
  const ysol = (x) => 4 / (x * x);
  for (const x of [0.5, 1.5, 3]) chk(deriv(ysol, x), (-2 * ysol(x)) / x, 1e-5);
  b.struct({
    d: 3, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 2",
    concepts: [Q("de.separable")],
    stem: t`The differential equation $x\dfrac{\mathrm{d}y}{\mathrm{d}x} = -2y$ holds for $x > 0$.`,
    parts: [
      P.expr({ label: "(a)", marks: 3, stem: "Find the general solution, using A for the arbitrary constant, in the form y = f(x). Type e.g. y=A/x^3.",
        accepted: ["y=A/x^2", "y=Ax^-2", "y=A/x²", "y=Ax^(-2)", "y=c/x^2", "y=k/x^2", "y=C/x^2", "y=Ae^(-2lnx)"], wrong: ["y=A/x"],
        explanation: t`$\int \frac{1}{y}\,\mathrm{d}y = -2\int \frac{1}{x}\,\mathrm{d}x \Rightarrow \ln y = -2\ln x + \ln A \Rightarrow y = \dfrac{A}{x^2}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the value of A for the solution curve that passes through (1, 4).", prefix: "A =", value: 4, wrong: [0.25],
        explanation: t`$4 = \frac{A}{1}$, so $A = 4$.` }),
      P.num({ label: "(c)", marks: 2, stem: "For this particular solution, find y when x = 2.", value: ysol(2), wrong: [2, 16],
        explanation: t`$y = \frac{4}{2^2} = 1$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe the shapes of typical members of the family of solution curves for x > 0 (for example A = 1, A = 4 and A = −1).", points: ["For A > 0: curves in the first quadrant, decreasing, with the y-axis and the x-axis as asymptotes (larger A further from the axes).", "For A < 0: reflections of these in the x-axis (fourth quadrant), increasing towards 0; A = 0 gives the x-axis itself."],
        modelAnswer: "Each curve y = A/x² has asymptotes x = 0 and y = 0. For A = 1 and A = 4 the curves lie in the first quadrant and fall steeply then level off, the A = 4 curve above the A = 1 curve; for A = −1 the curve is the reflection of the A = 1 curve in the x-axis.",
        explanation: "The constant scales the curve vertically." }),
    ],
    explanation: "Separate, integrate, write the constant as ln A, then use the condition and sketch the family.",
    hints: [t`Divide by $xy$ before integrating.`, t`$-2\ln x = \ln x^{-2}$.`],
  });

  // ---------------------------------------------------------------- ZP2B-1 (16): quintic with complex roots
  const p = poly.mul(poly.mul([1, 1], [1, -2, 2]), [1, 0, 9]);
  same(p, [1, -1, 9, -7, 0, 18]);
  isRoot(p, [1, 1], "1+i"); isRoot(p, [0, 3], "3i"); isRoot(p, [-1, 0], "-1");
  const u = [1, 1], u2 = cx.mul(u, u), u3 = cx.mul(u2, u), u4 = cx.mul(u3, u), u5 = cx.mul(u4, u);
  same([u2, u3, u4, u5], [[0, 2], [-2, 2], [-4, 0], [-4, -4]]);
  const p8 = cx.pow(u, 8);
  chk(p8[0], 16, 1e-9); chk(p8[1], 0, 1e-9);
  b.struct({
    d: 5, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("complex.polynomial-equations"), Q("complex.argand-polar"), Q("complex.de-moivre")],
    stem: t`The polynomial $p(z)$ is defined by $p(z) = ${poly.tex(p, "z")}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Show that $1 + \mathrm{i}$ is a root of $p(z) = 0$.`,
        points: [t`M1 finds $(1 + \mathrm{i})^2 = 2\mathrm{i}$, $(1 + \mathrm{i})^3 = -2 + 2\mathrm{i}$, $(1 + \mathrm{i})^4 = -4$, $(1 + \mathrm{i})^5 = -4 - 4\mathrm{i}$.`, "M1 substitutes every term.", "A1 shows real and imaginary parts are both 0."],
        modelAnswer: t`$$
p(1 + \mathrm{i}) = (-4 - 4\mathrm{i}) - (-4) + 9(-2 + 2\mathrm{i}) - 7(2\mathrm{i}) + 18
$$
$$
= (-4 + 4 - 18 + 18) + (-4 + 18 - 14)\mathrm{i} = 0
$$`,
        explanation: "Build the powers one at a time." }),
      P.fib({ label: "(b)", marks: 4, stem: t`Given also that $3\mathrm{i}$ is a root, write down two real quadratic factors of $p(z)$, as $z^2 + az + b$ (from the roots $1 \pm \mathrm{i}$) and $z^2 + cz + d$ (from the roots $\pm 3\mathrm{i}$).`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, d = {{blank:d}}",
        blanks: [N("a", -2, "2"), N("b", 2, "-2"), N("c", 0, "3"), N("d", 9, "-9")],
        explanation: t`Real coefficients: $1 - \mathrm{i}$ and $-3\mathrm{i}$ are also roots. $(z - 1)^2 + 1 = z^2 - 2z + 2$ and $(z - 3\mathrm{i})(z + 3\mathrm{i}) = z^2 + 9$.` }),
      P.num({ label: "(c)", marks: 3, stem: t`Hence find the real root of $p(z) = 0$.`, prefix: "z =", value: -1, wrong: [1, 18],
        explanation: t`$(z^2 - 2z + 2)(z^2 + 9) = z^4 - 2z^3 + 11z^2 - 18z + 18$. Comparing constant terms, $p(z) = (z^4 - 2z^3 + 11z^2 - 18z + 18)(z + 1)$, so the real root is $-1$.` }),
      P.fib({ label: "(d)", marks: 2, stem: t`Find the modulus of $1 + \mathrm{i}$ (to 4 s.f.) and its argument as kπ.`, template: "modulus {{blank:m}}, k = {{blank:k}}",
        blanks: [D("m", "1.414", 0.0005, "2"), KPI("k", cx.arg(u), 1, 4, "1/2")],
        explanation: t`$|1 + \mathrm{i}| = \sqrt{2} = 1.414$ and $\arg(1 + \mathrm{i}) = \frac{\pi}{4}$.` }),
      P.num({ label: "(e)", marks: 2, stem: t`Hence use de Moivre's theorem to evaluate $(1 + \mathrm{i})^8$.`, value: 16, wrong: [256, -16],
        explanation: t`$(\sqrt{2}\,\mathrm{e}^{\mathrm{i}\pi/4})^8 = 16\mathrm{e}^{2\pi\mathrm{i}} = 16$.` }),
      P.num({ label: "(f)", marks: 2, stem: t`The five roots of $p(z) = 0$ are plotted on an Argand diagram. Find the greatest distance of any root from the origin.`, value: 3, wrong: [sqrt(2), 9],
        explanation: t`The moduli are $1$ (for $-1$), $\sqrt{2}$ (for $1 \pm \mathrm{i}$) and $3$ (for $\pm 3\mathrm{i}$). The greatest is 3.` }),
    ],
    explanation: "Substitute a root, use conjugate pairs to build quadratic factors, and finish with polar form and de Moivre.",
    hints: ["Real coefficients: non-real roots come in conjugate pairs.", "Compare constant terms to find the last factor."],
  });
  same(poly.mul([1, -2, 2], [1, 0, 9]), [1, -2, 11, -18, 18]);
  same(poly.mul([1, -2, 11, -18, 18], [1, 1]), p);
  chk(cx.mod(u), sqrt(2));

  // ---------------------------------------------------------------- ZP2B-2 (16): 3 × 3 system with a parameter
  const Ak = (k) => [[1, 1, 1], [1, 2, k], [2, 1, 1]];
  for (const k of [-1, 0, 2, 3, 5]) chk(mat.det(Ak(k)), k - 2);
  const A3 = Ak(3), adj3 = r9(mat.adj(A3));
  same(adj3, [[-1, 0, 1], [5, -1, -2], [-3, 1, 1]]);
  same(r9(mat.mul(A3, adj3)), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
  same(r9(mat.mul(adj3, [[6], [14], [7]])), [[1], [2], [3]]);
  const grid = adj3.map((row, i) => "row " + (i + 1) + " (" + row.map((_, j) => `{{blank:e${i + 1}${j + 1}}}`).join(", ") + ")").join(", ");
  b.struct({
    d: 5, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 2",
    concepts: [Q("matrices.operations-inverses")],
    stem: t`The matrix $\mathbf{A}$ is $\begin{pmatrix} 1 & 1 & 1 \\ 1 & 2 & k \\ 2 & 1 & 1 \end{pmatrix}$, where $k$ is a constant.`,
    parts: [
      P.expr({ label: "(a)", marks: 2, stem: t`Find $\det\mathbf{A}$ in terms of $k$. Type it in simplest form, e.g. 3k+1.`, accepted: ["k-2", "-2+k"], wrong: ["2-k"],
        explanation: t`$1(2 - k) - 1(1 - 2k) + 1(1 - 4) = 2 - k - 1 + 2k - 3 = k - 2$.` }),
      P.num({ label: "(b)", marks: 1, stem: t`State the value of $k$ for which $\mathbf{A}$ is singular.`, prefix: "k =", value: 2, wrong: [-2],
        explanation: t`$\det\mathbf{A} = 0 \iff k = 2$.` }),
      P.fib({ label: "(c)", marks: 9, stem: t`For $k = 3$, $\det\mathbf{A} = 1$. Find $\mathbf{A}^{-1}$, entering its entries row by row.`, template: grid,
        blanks: adj3.flatMap((row, i) => row.map((v, j) => N(`e${i + 1}${j + 1}`, v, String(-v || 7)))),
        explanation: t`Cofactors of $${T(A3)}$ by rows: $-1, 5, -3$; $0, -1, 1$; $1, -2, 1$. Transposing and dividing by $\det = 1$: $\mathbf{A}^{-1} = ${T(adj3)}$.` }),
      P.fib({ label: "(d)", marks: 3, stem: t`Hence solve $x + y + z = 6$, $x + 2y + 3z = 14$, $2x + y + z = 7$.`, template: "x = {{blank:x}}, y = {{blank:y}}, z = {{blank:z}}",
        blanks: [N("x", 1, "2"), N("y", 2, "1"), N("z", 3, "1")],
        explanation: t`$\mathbf{X} = \mathbf{A}^{-1}\begin{pmatrix} 6 \\ 14 \\ 7 \end{pmatrix} = \begin{pmatrix} -6 + 0 + 7 \\ 30 - 14 - 14 \\ -18 + 14 + 7 \end{pmatrix} = \begin{pmatrix} 1 \\ 2 \\ 3 \end{pmatrix}$.` }),
      P.num({ label: "(e)", marks: 1, stem: t`When $k = 2$, the equations $x + y + z = 1$, $x + 2y + 2z = 2$, $2x + y + z = c$ have no unique solution. Find the value of $c$ for which they are consistent.`, prefix: "c =", value: 1, wrong: [3, 0],
        explanation: t`Subtracting the first equation from the second: $y + z = 1$, so $x = 0$. The third then reads $y + z = c$, so the system is consistent (with infinitely many solutions) only when $c = 1$.` }),
    ],
    explanation: "Determinant in terms of a parameter, inverse by cofactors, X = A⁻¹b, and the singular case.",
    hints: ["Expand along the first row.", "Remember to transpose the matrix of cofactors."],
  });

  // ---------------------------------------------------------------- ZP2B-3 (16): iteration, convergence, Newton–Raphson
  const g = (x) => x ** 3 - 5 * x + 1, gp = (x) => 3 * x * x - 5;
  const al = root(g, 2, 3);
  chk(g(2), -1); chk(g(3), 13);
  const F1p = (x) => (3 * x * x) / 5, F2p = (x) => 5 / (3 * cbrt(5 * x - 1) ** 2);
  for (const x of [1.7, 2.2]) { chk(deriv((v) => (v ** 3 + 1) / 5, x), F1p(x), 1e-6); chk(deriv((v) => cbrt(5 * v - 1), x), F2p(x), 1e-6); }
  const it = iterate((x) => cbrt(5 * x - 1), 2);
  chk(last(it), al, 1e-10);
  const nrIt = newtonRaphson(g, gp, 2);
  chk(last(nrIt), al, 1e-12);
  chk(gp(sqrt(5 / 3)), 0, 1e-12);
  b.struct({
    d: 5, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("numerical.locating-roots"), Q("numerical.newton-raphson")],
    stem: t`The equation $x^3 - 5x + 1 = 0$ has a root $\alpha$ between 2 and 3.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that $2 < \alpha < 3$.`,
        points: [t`M1 $f(2) = -1$ and $f(3) = 13$ for $f(x) = x^3 - 5x + 1$.`, "A1 change of sign of a continuous function, so 2 < α < 3."],
        modelAnswer: t`$f(2) = 8 - 10 + 1 = -1 < 0$ and $f(3) = 27 - 15 + 1 = 13 > 0$. $f$ is continuous, so $2 < \alpha < 3$.`,
        explanation: "Change of sign." }),
      P.fib({ label: "(b)", marks: 4, stem: t`Two rearrangements are $x = F_1(x) = \dfrac{x^3 + 1}{5}$ and $x = F_2(x) = \sqrt[3]{5x - 1}$. Using $\alpha \approx 2.13$, evaluate $F_1'(\alpha)$ and $F_2'(\alpha)$ correct to 2 decimal places, and hence decide which iteration converges to $\alpha$ (type 1 or 2).`, template: "F₁′(α) = {{blank:a}}, F₂′(α) = {{blank:c}}, converging iteration: {{blank:k}}",
        blanks: [D("a", F1p(2.13).toFixed(2), 0.015, "0.37", 1), D("c", F2p(2.13).toFixed(2), 0.015, "2.72", 2), N("k", 2, "1", 1)],
        explanation: t`$F_1'(x) = \frac{3x^2}{5}$, so $F_1'(2.13) = 2.72 > 1$: diverges. $F_2'(x) = \frac{5}{3(5x - 1)^{2/3}}$, so $F_2'(2.13) = 0.37 < 1$: converges. Use $F_2$.` }),
      P.num({ label: "(c)", marks: 4, stem: t`Use the converging iteration with $x_1 = 2$ to find $\alpha$ correct to 3 decimal places.`, value: al, dp: 3, wrong: [2.127, 2.121],
        explanation: t`$x_2 = 2.08008$, $x_3 = 2.11049$, $x_4 = 2.12180$, $x_5 = 2.12598$, $x_6 = 2.12752$, $x_7 = 2.12809$, $x_8 = 2.12830$, $x_9 = 2.12837$: $\alpha = 2.128$.` }),
      P.num({ label: "(d)", marks: 3, stem: t`Use the Newton–Raphson method with $x_1 = 2$ to find $\alpha$ correct to 5 decimal places.`, value: al, dp: 5, wrong: [2.14286, 2.12857],
        explanation: t`$x_{n+1} = x_n - \frac{x_n^3 - 5x_n + 1}{3x_n^2 - 5}$: $x_2 = 2.142857$, $x_3 = 2.128571$, $x_4 = 2.128419$, $x_5 = 2.128419$. $\alpha = 2.12842$. Newton–Raphson needs far fewer steps.` }),
      P.manual({ label: "(e)", marks: 3, stem: t`Explain why $x_1 = 1.29$ would be a poor starting value for the Newton–Raphson method here.`, points: [t`$f'(x) = 3x^2 - 5 = 0$ at $x = \sqrt{5/3} \approx 1.291$, a turning point of the curve.`, "So f′(1.29) is almost zero and the tangent is nearly horizontal.", "The tangent meets the x-axis very far away (x₂ ≈ −428), nowhere near α."],
        modelAnswer: "The curve y = x³ − 5x + 1 has a minimum at x = √(5/3) ≈ 1.291, where f′ = 0. At x₁ = 1.29 the gradient is almost zero, so x₂ = x₁ − f(x₁)/f′(x₁) is huge (about −428) and the method fails to approach α.",
        explanation: "Starting near a stationary point is the classic failure of Newton–Raphson." }),
    ],
    explanation: "Locating a root, choosing a convergent rearrangement with |F′(α)| < 1, and comparing with Newton–Raphson.",
    hints: ["Iteration converges when |F′(α)| < 1.", "Find where f′(x) = 0."],
  });
  chk(Math.abs(F1p(2.13) - 2.72) < 0.006 ? 1 : 0, 1); chk(Math.abs(F2p(2.13) - 0.37) < 0.006 ? 1 : 0, 1);
  chk(Math.round(newtonRaphson(g, gp, 1.29, { maxN: 1 })[1]), -428);
});
