// W4a exam-format item for ZIMSEC Pure Mathematics: ZP1 ×1 (10 marks, vectors; uses the ZIMSEC-only Cartesian form and
// perpendicular distance). Every value is computed here.
import { concept, P, t, chk, same, v3, ZP } from "../lib.mjs";
import { f3, d1, N } from "../tables/w4a-kit.mjs";

const Q = (k) => `amaths.${k}`;
const r9 = (u) => u.map((x) => Math.round(x * 1e9) / 1e9);

concept(Q("vectors.lines"), { file: "exam/w4a-zimsec-pure", keyPrefix: "exam.w4a-zimsec-pure", applies: ZP }, (b) => {
  const OA = [3, -1, 2], OB = [5, 3, -2], OC = [8, 0, 1];
  const AB = v3.sub(OB, OA);
  same(AB, [2, 4, -4]); chk(v3.mag(AB), 6);
  const dir = [1, 2, -2];
  const ang = v3.angle(OA, OB);
  chk(v3.dot(OA, OB), 8);
  const Ft = v3.foot(OC, OA, dir);
  chk(Ft.t, 1); same(r9(Ft.foot), [4, 1, 0]); chk(Ft.dist, Math.sqrt(18));
  b.struct({
    d: 4, marks: 10, secs: 90 * 10, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("vectors.lines"), Q("vectors.basics"), Q("vectors.scalar-product")],
    stem: t`Relative to the origin $O$, the points $A$, $B$ and $C$ have position vectors $\mathbf{a} = 3\mathbf{i} - \mathbf{j} + 2\mathbf{k}$, $\mathbf{b} = 5\mathbf{i} + 3\mathbf{j} - 2\mathbf{k}$ and $\mathbf{c} = 8\mathbf{i} + \mathbf{k}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the length of AB.", value: 6, wrong: [Math.sqrt(36 + 4 + 0)],
        explanation: t`$\overrightarrow{AB} = \mathbf{b} - \mathbf{a} = 2\mathbf{i} + 4\mathbf{j} - 4\mathbf{k}$, so $AB = \sqrt{4 + 16 + 16} = 6$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find angle AOB, in degrees correct to 1 decimal place.", value: ang, unit: "°", wrong: [180 - ang],
        explanation: t`$\mathbf{a} \cdot \mathbf{b} = 15 - 3 - 4 = 8$, $|\mathbf{a}| = \sqrt{14}$, $|\mathbf{b}| = \sqrt{38}$. $\cos AOB = \frac{8}{\sqrt{532}}$, so $AOB = ${d1(ang)}°$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that the line $AB$ has Cartesian equations $\dfrac{x - 3}{1} = \dfrac{y + 1}{2} = \dfrac{z - 2}{-2}$.`,
        points: [t`M1 writes $\mathbf{r} = 3\mathbf{i} - \mathbf{j} + 2\mathbf{k} + \lambda(\mathbf{i} + 2\mathbf{j} - 2\mathbf{k})$ (direction $\frac{1}{2}\overrightarrow{AB}$, or $\overrightarrow{AB}$).`, t`A1 writes $x = 3 + \lambda$, $y = -1 + 2\lambda$, $z = 2 - 2\lambda$ and eliminates $\lambda$ to reach the given form.`],
        modelAnswer: t`$$
\mathbf{r} = 3\mathbf{i} - \mathbf{j} + 2\mathbf{k} + \lambda(\mathbf{i} + 2\mathbf{j} - 2\mathbf{k})
$$
$$
x = 3 + \lambda, \quad y = -1 + 2\lambda, \quad z = 2 - 2\lambda
$$
$$
\lambda = \frac{x - 3}{1} = \frac{y + 1}{2} = \frac{z - 2}{-2}
$$`,
        explanation: "Any multiple of AB is a direction vector; eliminate the parameter." }),
      P.fib({ label: "(d)", marks: 3, stem: "Find the position vector of the foot F of the perpendicular from C to the line AB.", template: "F = {{blank:x}}i + {{blank:y}}j + {{blank:z}}k",
        blanks: [N("x", 4, "8"), N("y", 1, "0"), N("z", 0, "1")],
        explanation: t`$F = (3 + \lambda, -1 + 2\lambda, 2 - 2\lambda)$, $\overrightarrow{CF} = (\lambda - 5, 2\lambda - 1, 1 - 2\lambda)$. $\overrightarrow{CF} \cdot (1, 2, -2) = \lambda - 5 + 4\lambda - 2 - 2 + 4\lambda = 9\lambda - 9 = 0$, so $\lambda = 1$ and $F = 4\mathbf{i} + \mathbf{j}$.` }),
      P.num({ label: "(e)", marks: 1, stem: "Hence find the perpendicular distance from C to the line AB, correct to 3 significant figures.", value: Ft.dist, wrong: [v3.mag(v3.sub(OC, OA))],
        explanation: t`$\overrightarrow{CF} = -4\mathbf{i} + \mathbf{j} - \mathbf{k}$, so the distance is $\sqrt{18} = 3\sqrt{2} = ${f3(Ft.dist)}$. ($|\overrightarrow{AC}| = \sqrt{27}$ is not the perpendicular distance.)` }),
    ],
    explanation: "Magnitudes, the scalar product for angles, the Cartesian form of a line and the foot of a perpendicular.",
    hints: ["The angle AOB uses the position vectors a and b.", "Write CF in terms of the parameter and set CF · direction = 0."],
  });
  chk(v3.mag(v3.sub(OC, OA)), Math.sqrt(27));
  for (const l of [0, 1, -2]) { const p = v3.add(OA, v3.scale(l, dir)); chk((p[0] - 3) / 1, (p[1] + 1) / 2); chk((p[1] + 1) / 2, (p[2] - 2) / -2); }
  same(v3.add(OA, v3.scale(2, dir)), OB);
});
