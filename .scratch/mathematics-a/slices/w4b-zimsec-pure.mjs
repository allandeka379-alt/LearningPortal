// W4b exam-format items for ZIMSEC A-Level Pure Mathematics: ZP2B ×1 (16 marks, Paper 2 Section B) on lines and planes.
import { concept, P, t, chk, v3, deg, ZP } from "../lib.mjs";
import { f3, NB } from "../tables/w4b-kit.mjs";

const { sqrt, acos } = Math;
const Q = (k) => `amaths.${k}`;
const D = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: 0, ...(wrong !== undefined ? { wrong: String(wrong) } : {}), ...(marks ? { marks } : {}) });

concept(Q("vectors.lines-planes"), { file: "exam/w4b-zimsec-pure", keyPrefix: "exam.w4b-zimsec-pure", applies: ZP }, (b) => {
  // ---------------------------------------------------------------- ZP2B (16): plane through three points, foot, distance, angle
  const A = [1, 2, 0], B = [3, -1, 4], C = [2, 1, 3], Dp = [8, 3, 7];
  const AB = v3.sub(B, A), AC = v3.sub(C, A);
  const cr = v3.cross(AB, AC);
  same3(cr, [-5, -2, 1]);
  const n = [5, 2, -1];
  const d = v3.dot(n, A);
  chk(d, 9); chk(v3.dot(n, B), 9); chk(v3.dot(n, C), 9);
  const tF = (v3.dot(n, Dp) - d) / v3.dot(n, n);
  chk(tF, 1);
  const F = v3.sub(Dp, n);
  chk(v3.dot(n, F), 9);
  const dist = v3.planeDist(Dp, n, d);
  chk(dist, sqrt(30), 1e-12);
  const ang = deg(acos(v3.dot(n, [1, 1, 1]) / (v3.mag(n) * sqrt(3))));
  const dir = [1, -2, 1];
  chk(v3.dot(n, dir), 0);
  b.struct({
    d: 4, marks: 16, secs: 90 * 16, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("vectors.lines-planes"), Q("vectors.cross-product-planes")],
    stem: t`The points $A$, $B$ and $C$ have coordinates $A(1, 2, 0)$, $B(3, -1, 4)$ and $C(2, 1, 3)$, and the point $D$ is $(8, 3, 7)$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: t`Find the vector product $\overrightarrow{AB} \times \overrightarrow{AC}$ in the form $p\mathbf{i} + q\mathbf{j} + r\mathbf{k}$.`,
        template: "p = {{blank:p}}, q = {{blank:q}}, r = {{blank:r}}",
        blanks: [D("p", cr[0], 5), D("q", cr[1], 2), D("r", cr[2], -1)],
        explanation: t`$\overrightarrow{AB} = ${v3.ijk(AB)}$, $\overrightarrow{AC} = ${v3.ijk(AC)}$. $\overrightarrow{AB} \times \overrightarrow{AC} = \big((-3)(3) - (4)(-1)\big)\mathbf{i} - \big((2)(3) - (4)(1)\big)\mathbf{j} + \big((2)(-1) - (-3)(1)\big)\mathbf{k} = ${v3.ijk(cr)}$. (The reversed order $\overrightarrow{AC} \times \overrightarrow{AB}$ gives the negative.)` }),
      P.fib({ label: "(b)", marks: 2, stem: "Hence find the Cartesian equation of the plane ABC in the form 5x + 2y − z = d. State d.", template: "d = {{blank:d}}",
        blanks: [D("d", d, -9, 2)],
        explanation: t`A normal is $-(${v3.ijk(cr)}) = ${v3.ijk(n)}$. Using $A$: $d = 5(1) + 2(2) - 0 = 9$, so the plane is $5x + 2y - z = 9$. Check with $B$: $15 - 2 - 4 = 9$.` }),
      P.fib({ label: "(c)", marks: 4, stem: "Find the coordinates of the foot F of the perpendicular from D to the plane ABC.", template: "F = ({{blank:x}}, {{blank:y}}, {{blank:z}})",
        blanks: [D("x", F[0], 13), D("y", F[1], 5), D("z", F[2], 6)],
        explanation: t`The line through $D$ along the normal: $\mathbf{r} = (8, 3, 7) + \lambda(5, 2, -1)$. Substituting in the plane: $5(8 + 5\lambda) + 2(3 + 2\lambda) - (7 - \lambda) = 9 \Rightarrow 39 + 30\lambda = 9 \Rightarrow \lambda = -1$. So $F = (${F.join(", ")})$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the perpendicular distance from D to the plane, correct to 3 significant figures.", value: dist, wrong: [f3(30 / 30), 30],
        explanation: t`$DF = |\lambda|\,|\mathbf{n}| = \sqrt{25 + 4 + 1} = \sqrt{30} = ${f3(dist)}$. Or $\frac{|5(8) + 2(3) - 7 - 9|}{\sqrt{30}} = \frac{30}{\sqrt{30}} = \sqrt{30}$.` }),
      P.num({ label: "(e)", marks: 3, stem: "Find the acute angle between the plane ABC and the plane x + y + z = 4, in degrees correct to 1 decimal place.", value: ang, unit: "°", wrong: [f3(90 - ang)],
        explanation: t`The angle between the planes equals the angle between the normals: $\cos\theta = \frac{(5)(1) + (2)(1) + (-1)(1)}{\sqrt{30}\sqrt{3}} = \frac{6}{\sqrt{90}}$, so $\theta = ${ang.toFixed(1)}°$. ($${(90 - ang).toFixed(1)}°$ is the complement, the angle between a normal and the other plane.)` }),
      P.proof({ label: "(f)", marks: 2, stem: t`Show that the line $\mathbf{r} = ${v3.ijk(A)} + t(${v3.ijk(dir)})$ lies in the plane $ABC$.`,
        points: ["M1 shows the direction is perpendicular to the normal: (1)(5) + (−2)(2) + (1)(−1) = 0.", "A1 shows a point of the line, (1, 2, 0), lies in the plane (5 + 4 − 0 = 9), so the whole line lies in it."],
        modelAnswer: t`$$
(\mathbf{i} - 2\mathbf{j} + \mathbf{k}) \cdot (5\mathbf{i} + 2\mathbf{j} - \mathbf{k}) = 5 - 4 - 1 = 0
$$
so the line is parallel to the plane. The point $(1, 2, 0)$ on the line satisfies $5(1) + 2(2) - 0 = 9$, so it lies in the plane. Hence the whole line lies in the plane.`,
        explanation: "Parallel to the plane AND sharing a point with it." }),
    ],
    explanation: "Normal from the vector product; plane through a point; foot of the perpendicular by substituting the normal line; angle between planes from the normals.",
    hints: ["A normal to the plane is AB × AC.", "Substitute the line through D along the normal into the plane equation."],
  });
});

function same3(u, w) {
  u.forEach((x, i) => chk(x, w[i]));
}
