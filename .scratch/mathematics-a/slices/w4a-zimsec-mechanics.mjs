// W4a exam-format items for ZIMSEC Mechanics: ZM1a ×5 (7 marks, Paper 1), ZM1b ×3 (6, Paper 1), ZM2 ×4 (20, Paper 2).
// g is stated in every item and the same value is used in the computation. Every value is computed here.
import { concept, P, t, chk, same, vec, deg, rad, suvat, integrate, ZM } from "../lib.mjs";
import { f3, d1, N, S, A } from "../tables/w4a-kit.mjs";

const { sin, cos, sqrt, atan2, abs } = Math;
const Q = (k) => `amaths.${k}`;
const at = (r0, v, s) => vec.add(r0, vec.scale(s, v));
const IJ = (u) => vec.ij(u);
const bearing = ([e, n]) => (((90 - deg(atan2(n, e))) % 360) + 360) % 360;

concept(Q("kinematics.vector-motion"), { file: "exam/w4a-zimsec-mechanics", keyPrefix: "exam.w4a-zimsec-mechanics", applies: ZM }, (b) => {
  // ============================================================ ZM1a (7 marks) ×5
  // ZM1a-1: forces as vectors, equilibrium, then acceleration when one force is removed
  const F1 = [3, 4], F2 = [-5, 2];
  const F3 = vec.scale(-1, vec.add(F1, F2));
  same(F3, [2, -6]);
  const Rres = vec.add(F1, F2);
  const acc1 = vec.mag(Rres) / 2;
  const ang1 = vec.angle(Rres);
  b.struct({
    d: 3, marks: 7, secs: 90 * 7, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("vectors.basics"), Q("forces.equilibrium"), Q("newton.laws")],
    stem: t`Three forces $\mathbf{F}_1 = (3\mathbf{i} + 4\mathbf{j})$ N, $\mathbf{F}_2 = (-5\mathbf{i} + 2\mathbf{j})$ N and $\mathbf{F}_3 = (p\mathbf{i} + q\mathbf{j})$ N act in a horizontal plane on a particle of mass $2$ kg resting on a smooth horizontal surface. The particle is in equilibrium.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find p and q.", template: "p = {{blank:p}}, q = {{blank:q}}",
        blanks: [N("p", 2, "-2"), N("q", -6, "6")],
        explanation: t`$\mathbf{F}_1 + \mathbf{F}_2 + \mathbf{F}_3 = \mathbf{0}$: $3 - 5 + p = 0$ and $4 + 2 + q = 0$, so $p = 2$, $q = -6$.` }),
      P.num({ label: "(b)", marks: 3, stem: "The force F₃ is removed. Find the magnitude of the acceleration of the particle, correct to 3 significant figures.", value: acc1, unit: "m/s²", wrong: [vec.mag(Rres)],
        explanation: t`The resultant is now $\mathbf{F}_1 + \mathbf{F}_2 = -2\mathbf{i} + 6\mathbf{j}$ N, of magnitude $\sqrt{40}$. $a = \frac{\sqrt{40}}{2} = ${f3(acc1)}$ m s$^{-2}$. (Forgetting to divide by the mass gives $${f3(vec.mag(Rres))}$.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the angle between the direction of this acceleration and the vector i, in degrees correct to 1 decimal place.", value: ang1, unit: "°", wrong: [180 - ang1],
        explanation: t`The acceleration is parallel to $-2\mathbf{i} + 6\mathbf{j}$, in the second quadrant: $180° - \tan^{-1}3 = ${d1(ang1)}°$. (The calculator's $\tan^{-1}(-3)$ leads to $${d1(180 - ang1)}°$ if the quadrant is not checked.)` }),
    ],
    explanation: "Equilibrium: the vector sum of the forces is zero. Removing one force leaves a resultant equal and opposite to it.",
    hints: ["Add the i parts and the j parts separately.", "Sketch −2i + 6j to see its quadrant."],
  });

  // ZM1a-2: collision of two particles (vector paths)
  const P0 = [2, 3], vP = [3, -1], Q0 = [-4, 11], vQ = [6, -5];
  same(at(P0, vP, 2), at(Q0, vQ, 2)); same(at(P0, vP, 2), [8, 1]);
  b.struct({
    d: 3, marks: 7, secs: 90 * 7, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("kinematics.vector-motion")],
    stem: t`Particles $P$ and $Q$ move on a horizontal plane. At time $t$ seconds their position vectors, in metres, are $\mathbf{r}_P = (2\mathbf{i} + 3\mathbf{j}) + t(3\mathbf{i} - \mathbf{j})$ and $\mathbf{r}_Q = (-4\mathbf{i} + 11\mathbf{j}) + t(6\mathbf{i} - 5\mathbf{j})$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the speed of Q.", value: sqrt(61), unit: "m/s", wrong: [11],
        explanation: t`$|6\mathbf{i} - 5\mathbf{j}| = \sqrt{36 + 25} = \sqrt{61} = ${f3(sqrt(61))}$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the distance between P and Q when t = 0.", value: 10, unit: "m", wrong: [14],
        explanation: t`$\overrightarrow{PQ} = (-4 - 2)\mathbf{i} + (11 - 3)\mathbf{j} = -6\mathbf{i} + 8\mathbf{j}$, so $PQ = 10$ m.` }),
      P.proof({ label: "(c)", marks: 2, stem: "Show that P and Q collide.",
        points: [t`M1 equates the $\mathbf{i}$ components: $2 + 3t = -4 + 6t$, $t = 2$.`, t`A1 the $\mathbf{j}$ components also give $t = 2$: $3 - t = 11 - 5t$; same time, so they collide.`],
        modelAnswer: t`$$
2 + 3t = -4 + 6t \Rightarrow t = 2
$$
$$
3 - t = 11 - 5t \Rightarrow 4t = 8 \Rightarrow t = 2
$$
$$
\text{Both components agree at } t = 2 \text{, so } P \text{ and } Q \text{ collide.}
$$`,
        explanation: "A collision needs the same t in every component." }),
      P.fib({ label: "(d)", marks: 2, stem: "Find the position vector of the point of collision.", template: "{{blank:x}}i + {{blank:y}}j",
        blanks: [N("x", 8, "6"), N("y", 1, "-2")],
        explanation: t`$\mathbf{r}_P(2) = (2 + 6)\mathbf{i} + (3 - 2)\mathbf{j} = 8\mathbf{i} + \mathbf{j}$ m.` }),
    ],
    explanation: "Speed from the velocity, relative position at t = 0, and a collision test with one time.",
    hints: ["Subtract position vectors for the distance.", "Use one value of t in both components."],
  });
  chk(sqrt(61), vec.mag(vQ));

  // ZM1a-3: impulse and coupling trucks (impulse is ZIMSEC only)
  const imp3 = 0.15 * (12 + 8);
  chk(imp3, 3);
  const vc = (7000 * 2.5) / 10000;
  chk(vc, 1.75);
  b.struct({
    d: 3, marks: 7, secs: 90 * 7, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("momentum.collisions")],
    stem: "This question is about impulse and momentum.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "A ball of mass 0.15 kg hits a vertical wall at right angles with speed 12 m s⁻¹ and rebounds along the same line with speed 8 m s⁻¹. Find the magnitude of the impulse exerted by the wall on the ball.", value: imp3, unit: "N s", wrong: [0.6],
        explanation: t`Taking the rebound direction as positive: $I = 0.15(8) - 0.15(-12) = 3$ N s. (Subtracting the speeds gives $0.15 \times 4 = 0.6$, which ignores the change of direction.)` }),
      P.num({ label: "(b)", marks: 1, stem: "The ball is in contact with the wall for 0.04 s. Find the average force exerted by the wall.", value: 75, unit: "N", wrong: [0.12],
        explanation: t`$F = \frac{I}{t} = \frac{3}{0.04} = 75$ N.` }),
      P.num({ label: "(c)", marks: 2, stem: "At Hwange, a coal truck of mass 7000 kg moving at 2.5 m s⁻¹ runs into a stationary truck of mass 3000 kg and the two couple together. Find their common speed.", value: vc, unit: "m/s", wrong: [2.5, 5.83],
        explanation: t`$7000(2.5) = 10000v$, so $v = 1.75$ m s$^{-1}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the magnitude of the impulse exerted on the stationary truck in the collision.", value: 3000 * vc, unit: "N s", wrong: [17500],
        explanation: t`Change in momentum of the second truck: $3000 \times 1.75 - 0 = 5250$ N s. The first truck receives an equal and opposite impulse: $7000(1.75 - 2.5) = -5250$ N s.` }),
    ],
    explanation: "Impulse = change of momentum = force × time; momentum is conserved when two bodies collide.",
    hints: ["Velocity is a vector: a rebound changes its sign.", "Impulse on one truck = its own change of momentum."],
  });
  chk(7000 * (vc - 2.5), -5250); chk(3000 * vc, 5250);

  // ZM1a-4: acceleration–time graph (ZIMSEC only), velocities and distance
  const v4 = 2 * 4;
  const v18 = v4 - 1 * 8;
  chk(v18, 0);
  const dist4 = 0.5 * 4 * v4 + 6 * v4 + 0.5 * 8 * v4;
  chk(dist4, 96);
  b.struct({
    d: 3, marks: 7, secs: 90 * 7, skill: "ANALYSIS", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("kinematics.graphs")],
    stem: t`A cyclist starts from rest. The acceleration–time graph of the motion consists of three horizontal line segments: $a = 2$ m s$^{-2}$ for $0 < t < 4$, $a = 0$ for $4 < t < 10$ and $a = -1$ m s$^{-2}$ for $10 < t < 18$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the velocity of the cyclist when t = 4 and when t = 18.", template: "v(4) = {{blank:a}} m/s, v(18) = {{blank:b}} m/s",
        blanks: [N("a", v4, "2"), N("b", v18, "-8")],
        explanation: t`The area under an acceleration–time graph is the change in velocity: $v(4) = 2 \times 4 = 8$, then no change until $t = 10$, then $v(18) = 8 - 1 \times 8 = 0$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the velocity–time graph for 0 ≤ t ≤ 18.",
        points: ["A straight line from (0, 0) to (4, 8), then horizontal to (10, 8).", "Then a straight line down from (10, 8) to (18, 0)."],
        modelAnswer: "Straight segments joining (0, 0), (4, 8), (10, 8) and (18, 0): a trapezium above the t-axis.",
        explanation: "Constant acceleration gives a straight line on the velocity–time graph." }),
      P.num({ label: "(c)", marks: 3, stem: "Find the total distance travelled by the cyclist.", value: dist4, unit: "m", wrong: [64],
        explanation: t`Area under the velocity–time graph: $\frac{1}{2}(4)(8) + 6(8) + \frac{1}{2}(8)(8) = 16 + 48 + 32 = 96$ m.` }),
    ],
    explanation: "Area under a–t gives the change in v; area under v–t gives the distance.",
    hints: ["Start from rest: v(0) = 0.", "Draw the v–t graph before finding the area."],
  });

  // ZM1a-5: borehole pump, power and efficiency (g = 9.8)
  const mw = 50, gz = 9.8;
  const PE5 = mw * gz * 30;
  chk(PE5, 14700);
  const KE5 = 0.5 * mw * 4 * 4;
  chk(KE5, 400);
  const Pout = (PE5 + KE5) / 60;
  const Pin = Pout / 0.6;
  b.struct({
    d: 3, marks: 7, secs: 90 * 7, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("energy.power"), Q("energy.work-energy")],
    stem: t`A borehole pump in Masvingo raises water from a depth of $30$ m and delivers it at ground level through a pipe with speed $4$ m s$^{-1}$. It delivers $50$ kg of water each minute. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the potential energy gained by the water each minute.", value: PE5, unit: "J", wrong: [1500],
        explanation: t`$mgh = 50 \times 9.8 \times 30 = 14700$ J.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the kinetic energy given to the water each minute.", value: KE5, unit: "J", wrong: [100],
        explanation: t`$\frac{1}{2} \times 50 \times 4^2 = 400$ J.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the useful power output of the pump, in watts correct to 3 significant figures.", value: Pout, unit: "W", wrong: [PE5 + KE5],
        explanation: t`Work per second $= \frac{14700 + 400}{60} = ${f3(Pout)}$ W. (Forgetting to divide by 60 s gives the work per minute.)` }),
      P.num({ label: "(d)", marks: 2, stem: "The pump is 60% efficient. Find the power it takes from its motor, in watts correct to 3 significant figures.", value: Pin, unit: "W", wrong: [Pout * 0.6],
        explanation: t`Input $= \frac{${f3(Pout)}}{0.6} = ${f3(Pin)}$ W. (Multiplying by 0.6 gives a smaller input than output, which is impossible.)` }),
    ],
    explanation: "Power is work done per second; efficiency = useful output ÷ input.",
    hints: ["Work per minute = PE gained + KE given.", "1 minute = 60 seconds."],
  });

  // ============================================================ ZM1b (6 marks) ×3
  // ZM1b-1: rope at 30° on rough horizontal ground (g = 9.8)
  const m6 = 20, mu6 = 0.4, W6 = m6 * 9.8;
  const Plim = (mu6 * W6) / (cos(rad(30)) + mu6 * sin(rad(30)));
  const R100 = W6 - 100 * sin(rad(30));
  const a100 = (100 * cos(rad(30)) - mu6 * R100) / m6;
  b.struct({
    d: 4, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("forces.friction"), Q("newton.laws")],
    stem: t`A crate of mass $20$ kg rests on rough horizontal ground. The coefficient of friction is $0.4$. A rope attached to the crate is pulled with a force of $P$ N at $30°$ above the horizontal. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the normal reaction is $(196 - \frac{1}{2}P)$ N and that the crate is on the point of moving when $P\cos 30° = 0.4(196 - \frac{1}{2}P)$.`,
        points: [t`B1 resolves vertically: $R + P\sin 30° = 196$, so $R = 196 - \frac{1}{2}P$.`, t`B1 limiting friction: $P\cos 30° = \mu R = 0.4(196 - \frac{1}{2}P)$.`],
        modelAnswer: t`$$
\uparrow: \; R + P\sin 30° = 20 \times 9.8 \Rightarrow R = 196 - \tfrac{1}{2}P
$$
$$
\rightarrow: \; P\cos 30° = F = 0.4R = 0.4\left(196 - \tfrac{1}{2}P\right)
$$`,
        explanation: "The upward component of the pull reduces the normal reaction." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the value of P for which the crate is on the point of moving.", value: Plim, unit: "N", wrong: [(mu6 * W6) / cos(rad(30))],
        explanation: t`$P(\cos 30° + 0.2) = 78.4$, so $P = \frac{78.4}{1.0660} = ${f3(Plim)}$ N. (Taking $R = 196$ gives $${f3((mu6 * W6) / cos(rad(30)))}$ N.)` }),
      P.num({ label: "(c)", marks: 2, stem: "The pull is increased to 100 N. Find the acceleration of the crate.", value: a100, unit: "m/s²", wrong: [(100 * cos(rad(30)) - mu6 * W6) / m6],
        explanation: t`$R = 196 - 50 = 146$ N, friction $= 0.4 \times 146 = 58.4$ N. $100\cos 30° - 58.4 = 20a$, so $a = ${f3(a100)}$ m s$^{-2}$.` }),
    ],
    explanation: "Resolve vertically for R, then use F = μR when the crate moves or is about to move.",
    hints: ["The rope pulls partly upwards.", "Friction is μR once the crate moves."],
  });
  chk(R100, 146);

  // ZM1b-2: deriving s = ut + ½at², then a stone thrown upwards (g = 9.8)
  const hmax = (14.7 * 14.7) / (2 * 9.8);
  const k2 = suvat({ u: 14.7, a: -9.8, s: -49, vSign: -1 });
  chk(k2.t, 5);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 1",
    concepts: [Q("kinematics.constant-acceleration")],
    stem: t`Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`A particle moves with constant acceleration $a$, initial velocity $u$ and velocity $v$ at time $t$. Starting from $v = u + at$ and $s = \frac{1}{2}(u + v)t$, derive $s = ut + \frac{1}{2}at^2$.`,
        points: [t`M1 substitutes $v = u + at$ into $s = \frac{1}{2}(u + v)t$.`, t`A1 simplifies $\frac{1}{2}(2u + at)t$ to $ut + \frac{1}{2}at^2$.`],
        modelAnswer: t`$$
s = \tfrac{1}{2}(u + v)t = \tfrac{1}{2}(u + u + at)t
$$
$$
= \tfrac{1}{2}(2u + at)t = ut + \tfrac{1}{2}at^2
$$`,
        explanation: "The area of the trapezium under the velocity–time graph is ½(u + v)t." }),
      P.num({ label: "(b)", marks: 2, stem: "A stone is thrown vertically upwards with speed 14.7 m s⁻¹ from a point 49 m above the river below the Victoria Falls bridge. Find the greatest height of the stone above its point of projection.", value: hmax, unit: "m", wrong: [hmax * 2],
        explanation: t`At the top $v = 0$: $0 = 14.7^2 - 2(9.8)s$, so $s = \frac{216.09}{19.6} = ${f3(hmax)}$ m.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the time from projection until the stone hits the water.", value: k2.t, unit: "s", wrong: [3],
        explanation: t`Taking upwards as positive, $s = -49$: $-49 = 14.7t - 4.9t^2$, so $t^2 - 3t - 10 = 0$, $(t - 5)(t + 2) = 0$ and $t = 5$ s. (Using $s = +49$ has no real solution; $t = 3$ is the time to return to the bridge.)` }),
    ],
    explanation: "Derivations from the definitions, then vertical motion with a consistent sign convention.",
    hints: ["Substitute for v.", "Below the point of projection the displacement is negative."],
  });
  chk(suvat({ u: 14.7, a: -9.8, v: -14.7 }).t, 3);

  // ZM1b-3: two particles over a fixed pulley (g = 9.8)
  const a7 = ((5 - 3) * 9.8) / 8;
  chk(a7, 2.45);
  const T7 = 3 * (9.8 + a7);
  chk(T7, 36.75);
  chk(5 * (9.8 - a7), T7);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 1",
    concepts: [Q("newton.connected-particles")],
    stem: t`Particles of masses $5$ kg and $3$ kg are attached to the ends of a light inextensible string that passes over a fixed smooth light pulley. The particles hang freely and are released from rest. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the acceleration of the particles.", value: a7, unit: "m/s²", wrong: [3.92],
        explanation: t`$5g - T = 5a$ and $T - 3g = 3a$. Adding: $2g = 8a$, so $a = \frac{19.6}{8} = 2.45$ m s$^{-2}$. (Dividing by 5 instead of the total mass 8 gives 3.92.)` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the tension in the string.", value: T7, unit: "N", tol: 0.051, answer: "36.75", wrong: [29.4],
        explanation: t`$T = 3(9.8 + 2.45) = 36.75$ N. Check: $5(9.8 - 2.45) = 36.75$. ($29.4$ N is the weight of the lighter particle: the string must pull harder than that to accelerate it upwards.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the force exerted by the string on the pulley.", value: 2 * T7, unit: "N", wrong: [78.4],
        explanation: t`Both parts of the string pull vertically down on the pulley: $2T = 73.5$ N. (It is less than the total weight $78.4$ N because the system is accelerating.)` }),
    ],
    explanation: "Write F = ma for each particle with the same acceleration and tension.",
    hints: ["The heavier particle moves down.", "Two strands of the string act on the pulley."],
  });

  // ============================================================ ZM2 (20 marks) ×4
  // ZM2-1: projected up a rough plane, comes back down (g = 9.8)
  const m21 = 2, sa = 0.6, ca = 0.8, mu21 = 0.25, u21 = 8, gz2 = 9.8;
  const R21 = m21 * gz2 * ca, F21 = mu21 * R21;
  chk(R21, 15.68); chk(F21, 3.92);
  const dUp = gz2 * sa + mu21 * gz2 * ca;
  chk(dUp, 7.84);
  const sUp = (u21 * u21) / (2 * dUp);
  const aDown = gz2 * sa - mu21 * gz2 * ca;
  chk(aDown, 3.92);
  const vBack = sqrt(2 * aDown * sUp);
  chk(vBack ** 2, 32);
  const Wf = F21 * 2 * sUp;
  chk(Wf, 32);
  chk(0.5 * m21 * u21 * u21 - 0.5 * m21 * vBack ** 2, Wf);
  b.struct({
    d: 4, marks: 20, secs: 90 * 20, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("newton.laws"), Q("forces.friction"), Q("energy.work-energy"), Q("kinematics.constant-acceleration")],
    stem: t`A particle of mass $2$ kg is projected up a line of greatest slope of a rough plane inclined at $\alpha$ to the horizontal, where $\sin\alpha = 0.6$ and $\cos\alpha = 0.8$. Its initial speed is $8$ m s$^{-1}$ and the coefficient of friction is $0.25$. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the normal reaction and the magnitude of the friction force while the particle is moving.", template: "R = {{blank:r}} N, F = {{blank:f}} N",
        blanks: [S("r", R21, "19.6", 2), S("f", F21, "4.9", 1)],
        explanation: t`$R = 2 \times 9.8 \times 0.8 = 15.68$ N; $F = 0.25 \times 15.68 = 3.92$ N.` }),
      P.proof({ label: "(b)", marks: 3, stem: t`Show that, while the particle moves up the plane, its deceleration is $7.84$ m s$^{-2}$.`,
        points: [t`M1 both the weight component $mg\sin\alpha$ and friction act down the plane.`, t`A1 $2 \times 9.8 \times 0.6 + 3.92 = 11.76 + 3.92 = 15.68$ N.`, t`A1 $15.68 = 2a$, so the deceleration is $7.84$ m s$^{-2}$.`],
        modelAnswer: t`$$
\text{Down the plane: } mg\sin\alpha + F = 11.76 + 3.92 = 15.68 \text{ N}
$$
$$
15.68 = 2a \Rightarrow a = 7.84 \text{ m s}^{-2}
$$`,
        explanation: "Moving up, friction acts down the slope, together with the weight component." }),
      P.num({ label: "(c)", marks: 2, stem: "Find the distance the particle travels up the plane before coming to instantaneous rest.", value: sUp, unit: "m", wrong: [(u21 * u21) / (2 * gz2 * sa)],
        explanation: t`$0 = 64 - 2(7.84)s$, so $s = \frac{64}{15.68} = ${f3(sUp)}$ m. (Leaving out friction gives $${f3((u21 * u21) / (2 * gz2 * sa))}$ m.)` }),
      P.manual({ label: "(d)", marks: 2, stem: "Show that the particle does not remain at rest, but slides back down the plane.",
        points: ["Compares mg sin α = 11.76 N with the maximum friction μR = 3.92 N.", "Concludes that 11.76 > 3.92, so friction cannot hold the particle and it slides down (equivalently μ = 0.25 < tan α = 0.75)."],
        modelAnswer: "At rest the weight component down the slope is 11.76 N but friction can provide at most 3.92 N, so the particle cannot stay at rest and slides back.",
        explanation: "A particle stays at rest on a rough slope only if mg sin α ≤ μR." }),
      P.num({ label: "(e)", marks: 2, stem: "Find the acceleration of the particle as it slides down the plane.", value: aDown, unit: "m/s²", wrong: [dUp],
        explanation: t`Now friction acts up the plane: $11.76 - 3.92 = 2a$, so $a = 3.92$ m s$^{-2}$.` }),
      P.num({ label: "(f)", marks: 3, stem: "Find the speed of the particle when it returns to its point of projection.", value: vBack, unit: "m/s", wrong: [8],
        explanation: t`$v^2 = 2(3.92)(${f3(sUp)}) = 32$, so $v = \sqrt{32} = ${f3(vBack)}$ m s$^{-1}$. (Friction removes energy, so the speed is less than 8.)` }),
      P.num({ label: "(g)", marks: 3, stem: "Find the total work done against friction from projection until the particle returns to its point of projection.", value: Wf, unit: "J", wrong: [Wf / 2],
        explanation: t`Friction $3.92$ N acts over $2 \times ${f3(sUp)}$ m: $W = 3.92 \times \frac{128}{15.68} = 32$ J. (Using only the upward journey gives 16 J.)` }),
      P.manual({ label: "(h)", marks: 2, stem: "Verify your answer to (g) using kinetic energy.",
        points: ["Initial KE = ½ × 2 × 64 = 64 J and final KE = ½ × 2 × 32 = 32 J.", "The particle is back at the same height, so the loss of KE, 32 J, equals the work done against friction."],
        modelAnswer: "KE falls from 64 J to 32 J; with no net change in height, the 32 J lost is the work done against friction.",
        explanation: "Work–energy principle over the whole round trip." }),
    ],
    explanation: "Resolve along and perpendicular to the plane; friction changes direction when the motion does.",
    hints: ["Friction always opposes the motion.", "The distance down equals the distance up."],
  });

  // ZM2-2: two ships, bearings, closest approach, due north (vectors)
  const A0 = [2, 1], vA = [4, 3], B0 = [14, -5], vB = [-2, 7];
  const rel = (s) => vec.sub(at(B0, vB, s), at(A0, vA, s));
  // AB = (12 - 6t, -6 + 4t); |AB|² = 52t² - 192t + 180
  for (const s of [0, 1, 2, 3]) chk(vec.mag(rel(s)) ** 2, 52 * s * s - 192 * s + 180, 1e-9);
  const tmin = 192 / 104;
  const dmin = vec.mag(rel(tmin));
  chk(dmin ** 2, 180 - (192 * 192) / 208, 1e-9);
  const brA = bearing(vA);
  same(rel(2), [0, 2]);
  b.struct({
    d: 5, marks: 20, secs: 90 * 20, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("kinematics.vector-motion"), Q("vectors.basics")],
    stem: t`In this question $\mathbf{i}$ and $\mathbf{j}$ are unit vectors due east and due north; distances are in kilometres and time $t$ is in hours after 08:00. Two boats on Lake Kariba have position vectors $\mathbf{r}_A = (2\mathbf{i} + \mathbf{j}) + t(4\mathbf{i} + 3\mathbf{j})$ and $\mathbf{r}_B = (14\mathbf{i} - 5\mathbf{j}) + t(-2\mathbf{i} + 7\mathbf{j})$ relative to a jetty $O$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the speed of boat A.", value: 5, unit: "km/h", wrong: [7],
        explanation: t`$\sqrt{4^2 + 3^2} = 5$ km h$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the bearing on which boat A moves, in degrees correct to 1 decimal place.", value: brA, unit: "°", wrong: [90 - brA],
        explanation: t`East of north: $\tan^{-1}\frac{4}{3} = ${d1(brA)}°$, so the bearing is $0${d1(brA)}°$. ($${d1(90 - brA)}°$ is measured from east.)` }),
      P.proof({ label: "(c)", marks: 2, stem: "Show that the boats do not collide.",
        points: [t`M1 equates the $\mathbf{i}$ components: $2 + 4t = 14 - 2t$, so $t = 2$.`, t`A1 the $\mathbf{j}$ components give $1 + 3t = -5 + 7t$, $t = 1.5$; different times, so no collision.`],
        modelAnswer: t`$$
2 + 4t = 14 - 2t \Rightarrow t = 2
$$
$$
1 + 3t = -5 + 7t \Rightarrow t = 1.5
$$
$$
2 \ne 1.5 \Rightarrow \text{the boats never occupy the same point at the same time.}
$$`,
        explanation: "One time for both components is needed for a collision." }),
      P.fib({ label: "(d)", marks: 4, stem: t`Find the position vector of $B$ relative to $A$ at time $t$, in the form $(a + bt)\mathbf{i} + (c + dt)\mathbf{j}$.`, template: "a = {{blank:a}}, b = {{blank:b}}, c = {{blank:c}}, d = {{blank:d}}",
        blanks: [N("a", 12, "-12"), N("b", -6, "6"), N("c", -6, "6"), N("d", 4, "-4")],
        explanation: t`$\overrightarrow{AB} = \mathbf{r}_B - \mathbf{r}_A = (14 - 2 - 2t - 4t)\mathbf{i} + (-5 - 1 + 7t - 3t)\mathbf{j} = (12 - 6t)\mathbf{i} + (-6 + 4t)\mathbf{j}$.` }),
      P.proof({ label: "(e)", marks: 3, stem: t`Show that $AB^2 = 52t^2 - 192t + 180$.`,
        points: [t`M1 squares and adds: $(12 - 6t)^2 + (4t - 6)^2$.`, t`A1 $144 - 144t + 36t^2$ and $16t^2 - 48t + 36$.`, "A1 collects to the given result."],
        modelAnswer: t`$$
AB^2 = (12 - 6t)^2 + (4t - 6)^2 = 144 - 144t + 36t^2 + 16t^2 - 48t + 36
$$
$$
= 52t^2 - 192t + 180
$$`,
        explanation: "Square each component of the relative position vector." }),
      P.fib({ label: "(f)", marks: 4, stem: "Hence find the time, in hours after 08:00, at which the boats are closest together, and the least distance between them. Give both correct to 3 significant figures.", template: "t = {{blank:t}} h, least distance = {{blank:d}} km",
        blanks: [S("t", tmin, "3.69", 2), S("d", dmin, f3(sqrt(180)), 2)],
        explanation: t`$\frac{\mathrm{d}}{\mathrm{d}t}(AB^2) = 104t - 192 = 0$, so $t = \frac{24}{13} = ${f3(tmin)}$ h. Then $AB^2 = 180 - \frac{192^2}{208} = ${f3(dmin ** 2)}$ and $AB = ${f3(dmin)}$ km.` }),
      P.fib({ label: "(g)", marks: 4, stem: "At one instant boat B is due north of boat A. Find this time and the distance between the boats at that instant.", template: "t = {{blank:t}} h, distance = {{blank:d}} km",
        blanks: [N("t", 2, "1.5", 2), N("d", 2, "0", 2)],
        explanation: t`Due north means the $\mathbf{i}$ component of $\overrightarrow{AB}$ is zero: $12 - 6t = 0$, $t = 2$ (10:00). Then $\overrightarrow{AB} = 2\mathbf{j}$, positive, so $B$ is $2$ km due north of $A$.` }),
    ],
    explanation: "Speed and bearing from a velocity, the collision test, relative position, and the minimum of a quadratic.",
    hints: ["Bearings are measured clockwise from north.", "Due north of A: the i component of AB is zero and the j component is positive."],
  });

  // ZM2-3: lorry and trailer, power, tow-bar, hill (g = 9.8)
  const mL = 5500, mT = 2500, RL = 1750, RT = 250, Pw = 60000, g3 = 9.8;
  const vmax3 = Pw / (RL + RT);
  chk(vmax3, 30);
  const a3 = (Pw / 15 - RL - RT) / (mL + mT);
  chk(a3, 0.25);
  const Tbar = RT + mT * a3;
  chk(Tbar, 875);
  const wHill = (mL + mT) * g3 / 49;
  chk(wHill, 1600);
  const vHill = Pw / (RL + RT + wHill);
  const Thill = RT + (mT * g3) / 49;
  chk(Thill, 750);
  const sDet = (20 * 20) / (2 * (RT / mT));
  chk(sDet, 2000);
  const KEdet = 0.5 * mT * 400;
  chk(KEdet, RT * sDet);
  b.struct({
    d: 4, marks: 20, secs: 90 * 20, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 2",
    concepts: [Q("energy.power"), Q("newton.connected-particles"), Q("energy.work-energy")],
    stem: t`A lorry of mass $5500$ kg tows a trailer of mass $2500$ kg along a straight road by a light rigid horizontal tow-bar. The resistances to motion are $1750$ N on the lorry and $250$ N on the trailer. The lorry's engine works at a constant rate of $60$ kW. Take $g = 9.8$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the greatest steady speed of the lorry and trailer on a level road.", value: vmax3, unit: "m/s", wrong: [Pw / RL],
        explanation: t`At top speed the driving force equals the total resistance: $\frac{60000}{v} = 1750 + 250 = 2000$, so $v = 30$ m s$^{-1}$. (Using only the lorry's resistance gives ${f3(Pw / RL)}.)` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the acceleration on the level road at the instant when the speed is 15 m s⁻¹.", value: a3, unit: "m/s²", wrong: [0.5],
        explanation: t`Driving force $= \frac{60000}{15} = 4000$ N. $4000 - 2000 = 8000a$, so $a = 0.25$ m s$^{-2}$. (Forgetting the resistances gives 0.5.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the tension in the tow-bar at this instant.", value: Tbar, unit: "N", wrong: [625],
        explanation: t`Trailer: $T - 250 = 2500 \times 0.25$, so $T = 875$ N. (Leaving out the trailer's resistance gives 625 N.)` }),
      P.num({ label: "(d)", marks: 3, stem: "The lorry and trailer climb a hill inclined at an angle α to the horizontal, where sin α = 1/49, with the same power and resistances. Find their greatest steady speed up the hill.", value: vHill, unit: "m/s", wrong: [Pw / (RL + RT + (mL + mT) / 49)],
        explanation: t`Weight component $= 8000 \times 9.8 \times \frac{1}{49} = 1600$ N. $\frac{60000}{v} = 2000 + 1600 = 3600$, so $v = ${f3(vHill)}$ m s$^{-1}$.` }),
      P.num({ label: "(e)", marks: 2, stem: "Find the tension in the tow-bar when they move up the hill at this steady speed.", value: Thill, unit: "N", wrong: [250],
        explanation: t`Trailer, no acceleration: $T = 250 + 2500 \times 9.8 \times \frac{1}{49} = 250 + 500 = 750$ N.` }),
      P.num({ label: "(f)", marks: 3, stem: "Later, on a level road, the trailer becomes detached when the speed is 20 m s⁻¹. Assuming the resistance on the trailer stays 250 N, find how far the trailer travels before it stops.", value: sDet, unit: "m", wrong: [1000],
        explanation: t`Deceleration $= \frac{250}{2500} = 0.1$ m s$^{-2}$. $0 = 400 - 2(0.1)s$, so $s = 2000$ m. Or by energy: $\frac{1}{2}(2500)(20^2) = 250s$.` }),
      P.num({ label: "(g)", marks: 2, stem: "Find, in kJ, the work done against resistance by the trailer after it becomes detached.", value: KEdet / 1000, unit: "kJ", wrong: [1000],
        explanation: t`All its kinetic energy is removed: $\frac{1}{2}(2500)(20)^2 = 500000$ J $= 500$ kJ $= 250 \times 2000$ J.` }),
      P.manual({ label: "(h)", marks: 3, stem: "State one modelling assumption about the tow-bar used in this question, and explain why the force in the tow-bar could be a thrust when the lorry brakes.",
        points: ["States that the tow-bar is light (its mass ignored) and/or rigid and horizontal.", "When the lorry brakes, the trailer tends to keep moving (or its resistance alone cannot slow it as quickly).", "So the tow-bar pushes back on the trailer: the force is a compression (thrust), not a tension."],
        modelAnswer: "The tow-bar is light and rigid, so it transmits the same force to both vehicles. When the lorry brakes hard, the trailer's own resistance is not enough to give it the same deceleration, so the tow-bar must push it backwards: a thrust.",
        explanation: "A rigid bar can push as well as pull; a rope can only pull." }),
    ],
    explanation: "P = Fv, F = ma for the whole system and for the trailer alone, and work–energy after detachment.",
    hints: ["Use the whole system for the acceleration and the trailer alone for the tow-bar force.", "On the hill add mg sin α for each vehicle."],
  });

  // ZM2-4: variable velocity, maximum, distance, force, impulse, then resistance
  const v4f = (s) => 6 * s - s * s;
  const s4f = (s) => 3 * s * s - (s ** 3) / 3;
  for (const s of [0.5, 2, 5]) chk((s4f(s + 1e-5) - s4f(s - 1e-5)) / 2e-5, v4f(s), 1e-6);
  chk(s4f(6), 36); chk(integrate(v4f, 0, 6), 36, 1e-6);
  const vAfter = 3 / 0.5;
  const sRes = (vAfter * vAfter) / (2 * (1.5 / 0.5));
  chk(sRes, 6);
  b.struct({
    d: 4, marks: 20, secs: 90 * 20, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 2",
    concepts: [Q("kinematics.calculus"), Q("newton.laws"), Q("momentum.collisions")],
    stem: t`A particle of mass $0.5$ kg moves along a straight line. At time $t$ seconds its velocity is $v$ m s$^{-1}$, where $v = 6t - t^2$ for $0 \le t \le 6$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the acceleration of the particle when t = 1.", value: 4, unit: "m/s²", wrong: [5],
        explanation: t`$a = \frac{\mathrm{d}v}{\mathrm{d}t} = 6 - 2t = 4$ m s$^{-2}$. ($5$ is the velocity at $t = 1$.)` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find the maximum velocity of the particle and the time at which it occurs.", template: "v max = {{blank:v}} m/s at t = {{blank:t}} s",
        blanks: [N("v", 9, "6", 2), N("t", 3, "6", 1)],
        explanation: t`$a = 6 - 2t = 0$ at $t = 3$; $v = 18 - 9 = 9$ m s$^{-1}$. It is a maximum because $a$ changes from positive to negative.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the distance travelled by the particle from t = 0 to t = 6.", value: 36, unit: "m", wrong: [72],
        explanation: t`$v \ge 0$ throughout, so distance $= \int_0^6 (6t - t^2)\,\mathrm{d}t = \left[3t^2 - \frac{t^3}{3}\right]_0^6 = 108 - 72 = 36$ m.` }),
      P.num({ label: "(d)", marks: 1, stem: "Find the average speed of the particle for 0 ≤ t ≤ 6.", value: 6, unit: "m/s", wrong: [4.5],
        explanation: t`$\frac{36}{6} = 6$ m s$^{-1}$. (The mean of the maximum and zero, $4.5$, is not the average speed.)` }),
      P.num({ label: "(e)", marks: 2, stem: "Find the resultant force on the particle when t = 1.", value: 2, unit: "N", wrong: [2.5],
        explanation: t`$F = ma = 0.5 \times 4 = 2$ N.` }),
      P.num({ label: "(f)", marks: 2, stem: "Find the magnitude of the impulse of the resultant force from t = 0 to t = 3.", value: 4.5, unit: "N s", wrong: [9],
        explanation: t`Impulse = change of momentum $= 0.5(9 - 0) = 4.5$ N s.` }),
      P.manual({ label: "(g)", marks: 3, stem: "Describe the velocity–time graph for 0 ≤ t ≤ 6.",
        points: ["An arch (inverted parabola) starting at the origin.", "Maximum point at (3, 9).", "Returning to v = 0 at t = 6, symmetrical about t = 3, never below the t-axis."],
        modelAnswer: "A ∩-shaped parabola through (0, 0), rising to a maximum at (3, 9) and falling symmetrically to (6, 0); v ≥ 0 throughout.",
        explanation: "v = t(6 − t) has roots 0 and 6 and its maximum midway." }),
      P.num({ label: "(h)", marks: 1, stem: "At t = 6 the particle is at rest. It is then given an impulse of 3 N s along the line. Find its speed immediately afterwards.", value: vAfter, unit: "m/s", wrong: [1.5],
        explanation: t`$3 = 0.5v - 0$, so $v = 6$ m s$^{-1}$.` }),
      P.num({ label: "(i)", marks: 3, stem: "After the impulse the particle moves against a constant resistance of 1.5 N and no other horizontal force. Find the distance it travels before coming to rest.", value: sRes, unit: "m", wrong: [12],
        explanation: t`Deceleration $= \frac{1.5}{0.5} = 3$ m s$^{-2}$. $0 = 36 - 2(3)s$, so $s = 6$ m. (Using the deceleration $1.5$ forgets to divide by the mass and gives 12 m.)` }),
    ],
    explanation: "Differentiate for acceleration, integrate for distance, F = ma for force, and impulse = change of momentum.",
    hints: ["Check that v does not change sign before integrating.", "Impulse = mv − mu."],
  });
});
