// W4a exam-format items for Cambridge 9709: C4s ×4 (6 marks, Paper 4), C4l ×5 (8, Paper 4), C3s ×1 (6, Paper 3 vectors),
// C3l ×2 (9, Paper 3 vectors). Paper 4 uses g = 10 m s⁻² and no vector notation. Every value is computed here.
import { concept, P, t, chk, same, v3, rad, suvat, integrate, CAM } from "../lib.mjs";
import { f3, d1, N, S, A } from "../tables/w4a-kit.mjs";

const { sin, cos, sqrt, abs } = Math;
const Q = (k) => `amaths.${k}`;
const g = 10;
const IJK = (u) => v3.ijk(u);
const r9 = (u) => u.map((x) => Math.round(x * 1e9) / 1e9);

concept(Q("forces.equilibrium"), { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------ C4s-1 (6): particle hanging from two strings
  const W1 = 3 * g, al1 = rad(40), be1 = rad(55);
  const T1 = (W1 * cos(be1)) / (sin(al1) * cos(be1) + sin(be1) * cos(al1));
  const T2 = (T1 * cos(al1)) / cos(be1);
  chk(T1 * cos(al1), T2 * cos(be1)); chk(T1 * sin(al1) + T2 * sin(be1), W1);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 4",
    concepts: [Q("forces.equilibrium")],
    stem: t`A particle of mass $3$ kg hangs in equilibrium, supported by two light inextensible strings. One string is inclined at $40°$ to the horizontal and has tension $T_1$ N; the other is on the opposite side of the particle, inclined at $55°$ to the horizontal, with tension $T_2$ N.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: "By resolving horizontally and vertically, write down two equations connecting T₁ and T₂.",
        points: [t`B1 horizontally: $T_1\cos 40° = T_2\cos 55°$.`, t`B1 vertically: $T_1\sin 40° + T_2\sin 55° = 30$.`],
        modelAnswer: t`$$
\rightarrow: \; T_1\cos 40° = T_2\cos 55°
$$
$$
\uparrow: \; T_1\sin 40° + T_2\sin 55° = 3 \times 10 = 30
$$`,
        explanation: "The weight is 3g = 30 N; horizontal components of the tensions balance." }),
      P.fib({ label: "(b)", marks: 4, stem: "Find T₁ and T₂, each correct to 3 significant figures.", template: "T₁ = {{blank:a}} N, T₂ = {{blank:b}} N",
        blanks: [S("a", T1, f3(T2), 2), S("b", T2, f3(T1), 2)],
        explanation: t`From the horizontal equation $T_2 = \dfrac{T_1\cos 40°}{\cos 55°}$. Substituting: $T_1(\sin 40° + \cos 40°\tan 55°) = 30$, so $T_1 = ${f3(T1)}$ and $T_2 = ${f3(T2)}$. The steeper string carries the larger tension.` }),
    ],
    explanation: "Equilibrium of a particle: resolve in two perpendicular directions and solve simultaneously.",
    hints: ["Weight = mg with g = 10.", "Eliminate one tension using the horizontal equation."],
  });

  // ------------------------------------------------------------ C4s-2 (6): variable acceleration, distance with a reversal
  const vv = (s) => 0.3 * s * s - 2.4 * s + 3.6;
  const disp = (s) => 0.1 * s ** 3 - 1.2 * s * s + 3.6 * s;
  for (const s of [0.5, 3, 7]) chk((disp(s + 1e-5) - disp(s - 1e-5)) / 2e-5, vv(s), 1e-6);
  chk(vv(2), 0); chk(vv(6), 0);
  const dist2 = abs(disp(2) - disp(0)) + abs(disp(6) - disp(2));
  chk(dist2, 6.4); chk(integrate((s) => abs(vv(s)), 0, 6, 6000), 6.4, 1e-4);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 4",
    concepts: [Q("kinematics.calculus")],
    stem: t`A particle $P$ moves in a straight line, starting from a point $O$. Its velocity $t$ s after leaving $O$ is $v$ m s$^{-1}$, where $v = 0.3t^2 - 2.4t + 3.6$.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the two values of t at which P is momentarily at rest.", template: "t = {{blank:a}} and t = {{blank:b}}",
        blanks: [N("a", 2, "4"), N("b", 6, "8")],
        explanation: t`$0.3(t^2 - 8t + 12) = 0.3(t - 2)(t - 6) = 0$, so $t = 2$ or $t = 6$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Find the acceleration of P when t = 5.", value: 0.6, unit: "m/s²", wrong: [-0.9],
        explanation: t`$a = \frac{\mathrm{d}v}{\mathrm{d}t} = 0.6t - 2.4 = 0.6$ m s$^{-2}$ at $t = 5$. ($-0.9$ is the velocity at $t = 5$.)` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the total distance travelled by P in the first 6 seconds.", value: 6.4, unit: "m", wrong: [0],
        explanation: t`$s = 0.1t^3 - 1.2t^2 + 3.6t$ (with $s = 0$ at $t = 0$). $s(2) = 3.2$ and $s(6) = 0$. $P$ moves $3.2$ m forwards, then $3.2$ m back: total distance $6.4$ m. (Integrating from 0 to 6 in one go gives the displacement, $0$.)` }),
    ],
    explanation: "Differentiate v for a; integrate v for s, splitting at the time when the direction changes.",
    hints: ["Factorise v.", "Split the distance at t = 2, where P turns round."],
  });

  // ------------------------------------------------------------ C4s-3 (6): momentum, coalescence, loss of KE
  const mP = 0.3, mQ = 0.5, mR = 0.3;
  const vQ1 = (mP * 5 - mQ * 2 - mP * -1) / mQ;
  chk(vQ1, 1.6);
  const vQR = (mQ * vQ1) / (mQ + mR);
  chk(vQR, 1);
  const loss = 0.5 * mQ * vQ1 ** 2 - 0.5 * (mQ + mR) * vQR ** 2;
  chk(loss, 0.24);
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 4",
    concepts: [Q("momentum.collisions"), Q("energy.work-energy")],
    stem: t`Three particles $P$, $Q$ and $R$, of masses $0.3$ kg, $0.5$ kg and $0.3$ kg, lie in a straight line on a smooth horizontal surface, with $Q$ between $P$ and $R$. $P$ moves towards $Q$ with speed $5$ m s$^{-1}$ and $Q$ moves towards $P$ with speed $2$ m s$^{-1}$. $R$ is at rest.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "After P and Q collide, P moves back with speed 1 m s⁻¹. Find the speed of Q after this collision.", value: vQ1, unit: "m/s", wrong: [0.4],
        explanation: t`Taking $P$'s original direction as positive: $0.3(5) + 0.5(-2) = 0.3(-1) + 0.5v$, so $0.5 = -0.3 + 0.5v$ and $v = 1.6$ m s$^{-1}$. (Forgetting that $P$ reverses gives $0.4$.)` }),
      P.num({ label: "(b)", marks: 2, stem: "Q then collides with R and the two particles coalesce. Find their common speed.", value: vQR, unit: "m/s", wrong: [1.6],
        explanation: t`$0.5(1.6) = (0.5 + 0.3)V$, so $V = 1$ m s$^{-1}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the loss of kinetic energy in the collision between Q and R.", value: loss, unit: "J", wrong: [0.4],
        explanation: t`Before: $\frac{1}{2}(0.5)(1.6^2) = 0.64$ J. After: $\frac{1}{2}(0.8)(1^2) = 0.4$ J. Loss $= 0.24$ J.` }),
    ],
    explanation: "Choose a positive direction, conserve momentum in each collision, and compare kinetic energies.",
    hints: ["Velocities in the opposite direction are negative.", "Coalesce means they move together afterwards."],
  });

  // ------------------------------------------------------------ C4s-4 (6): power, maximum speed, hill
  const Pw = 27000, Rr = 900, mc = 1500;
  const vmax = Pw / Rr;
  chk(vmax, 30);
  const acc20 = (Pw / 20 - Rr) / mc;
  chk(acc20, 0.3);
  const vHill = Pw / (Rr + mc * g * 0.04);
  chk(vHill, 18);
  b.struct({
    d: 4, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 4",
    concepts: [Q("energy.power"), Q("newton.laws")],
    stem: t`A car of mass $1500$ kg has an engine that works at a constant rate of $27$ kW. The resistance to the motion of the car is constant and equal to $900$ N.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the greatest possible steady speed of the car on a straight level road.", value: vmax, unit: "m/s", wrong: [0.0333],
        explanation: t`At top speed the driving force equals the resistance: $\frac{27000}{v} = 900$, so $v = 30$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the acceleration of the car on the level road at the instant when its speed is 20 m s⁻¹.", value: acc20, unit: "m/s²", wrong: [0.9],
        explanation: t`Driving force $= \frac{27000}{20} = 1350$ N. $1350 - 900 = 1500a$, so $a = 0.3$ m s$^{-2}$. (Forgetting the resistance gives $0.9$.)` }),
      P.num({ label: "(c)", marks: 3, stem: "The car now climbs a straight hill inclined at an angle α to the horizontal, where sin α = 0.04, with the same power and resistance. Find its greatest possible steady speed up the hill.", value: vHill, unit: "m/s", wrong: [Pw / (Rr + mc * 0.04)],
        explanation: t`At steady speed: $\frac{27000}{v} = 900 + 1500 \times 10 \times 0.04 = 1500$, so $v = 18$ m s$^{-1}$. (Using $m\sin\alpha$ without $g$ gives a much larger speed.)` }),
    ],
    explanation: "P = Fv for the driving force; at steady speed the forces balance; otherwise use F = ma.",
    hints: ["Convert 27 kW to 27 000 W.", "Up the hill the weight component mg sin α also opposes the motion."],
  });

  // ------------------------------------------------------------ C4l-1 (8): rough inclined plane, limiting friction
  const m5 = 5, al5 = rad(25), mu5 = 0.3;
  const R5 = m5 * g * cos(al5);
  const Pmin = m5 * g * sin(al5) - mu5 * R5;
  const Pmax = m5 * g * sin(al5) + mu5 * R5;
  const a5 = (38 - Pmax) / m5;
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 4",
    concepts: [Q("forces.friction"), Q("newton.laws")],
    stem: t`A block of mass $5$ kg rests on a rough plane inclined at $25°$ to the horizontal. The coefficient of friction between the block and the plane is $0.3$. A force of magnitude $P$ N, acting up the plane along a line of greatest slope, is applied to the block.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the normal reaction between the block and the plane.", value: R5, unit: "N", wrong: [50],
        explanation: t`$R = 5 \times 10\cos 25° = ${f3(R5)}$ N.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the least value of P for which the block remains at rest.", value: Pmin, unit: "N", wrong: [Pmax],
        explanation: t`The block is about to slide down, so friction $0.3R$ acts up the plane: $P + 0.3R = 50\sin 25°$, $P = 21.13 - 13.59 = ${f3(Pmin)}$ N.` }),
      P.manual({ label: "(c)", marks: 1, stem: "Explain why friction acts up the plane in part (b).",
        points: ["States that for the least P the block is on the point of sliding DOWN the plane, and friction opposes that motion, so it acts up the plane."],
        modelAnswer: "With the least force the block is about to slip down the slope; friction always opposes the (impending) relative motion, so it acts up the slope.",
        explanation: "Friction opposes the direction in which the block would move." }),
      P.num({ label: "(d)", marks: 2, stem: "Find the greatest value of P for which the block remains at rest.", value: Pmax, unit: "N", wrong: [Pmin],
        explanation: t`Now the block is about to slide up, so friction acts down: $P = 50\sin 25° + 0.3R = ${f3(Pmax)}$ N.` }),
      P.num({ label: "(e)", marks: 2, stem: "Given instead that P = 38, find the acceleration of the block.", value: a5, unit: "m/s²", wrong: [(38 - Pmin) / m5],
        explanation: t`The block moves up the plane, friction $0.3R$ acts down: $38 - 50\sin 25° - 0.3R = 5a$, so $a = ${f3(a5)}$ m s$^{-2}$.` }),
    ],
    explanation: "Limiting friction F = μR acts against the motion that is about to happen (or is happening).",
    hints: ["R = mg cos 25° because P is parallel to the plane.", "Decide which way the block would move before placing friction."],
  });

  // ------------------------------------------------------------ C4l-2 (8): connected particles over a pulley, string goes slack
  const mA = 3, mB = 2, mu6 = 0.2;
  const a6 = (mB * g - mu6 * mA * g) / (mA + mB);
  chk(a6, 2.8);
  const T6 = mB * (g - a6);
  chk(T6, 14.4);
  chk(mA * a6, T6 - mu6 * mA * g);
  const k6 = suvat({ u: 0, a: a6, s: 0.8 });
  const dec6 = mu6 * g;
  const s6 = suvat({ u: k6.v, v: 0, a: -dec6 }).s;
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 4",
    concepts: [Q("newton.connected-particles"), Q("kinematics.constant-acceleration")],
    stem: t`Particle $A$ of mass $3$ kg lies on a rough horizontal table, where the coefficient of friction is $0.2$. It is attached to one end of a light inextensible string that passes over a small smooth pulley at the edge of the table. Particle $B$ of mass $2$ kg hangs from the other end, $0.8$ m above the floor. The system is released from rest with the string taut. $A$ does not reach the pulley.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Find the acceleration of the particles and the tension in the string.", template: "a = {{blank:a}} m/s², T = {{blank:t}} N",
        blanks: [N("a", 2.8, "4", 2), N("t", 14.4, "20", 2)],
        explanation: t`$B$: $20 - T = 2a$. $A$: $T - 0.2 \times 30 = 3a$. Adding: $14 = 5a$, so $a = 2.8$ m s$^{-2}$ and $T = 20 - 5.6 = 14.4$ N.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the speed of B when it reaches the floor.", value: k6.v, unit: "m/s", wrong: [4.48],
        explanation: t`$v^2 = 0 + 2(2.8)(0.8) = 4.48$, so $v = ${f3(k6.v)}$ m s$^{-1}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "B does not rebound. Find the further distance A travels along the table before coming to rest.", value: s6, unit: "m", wrong: [k6.v ** 2 / (2 * a6)],
        explanation: t`The string goes slack; only friction $0.2 \times 30 = 6$ N acts on $A$, a deceleration of $2$ m s$^{-2}$. $0 = 4.48 - 2(2)s$, so $s = ${f3(s6)}$ m.` }),
    ],
    explanation: "Write F = ma for each particle; once the string is slack, each particle moves on its own.",
    hints: ["Use the same acceleration and tension for both particles while the string is taut.", "After B lands, the tension is zero."],
  });
  chk(s6, 1.12);

  // ------------------------------------------------------------ C4l-3 (8): velocity-time graph of a kombi journey
  const V7 = 3000 / (10 + 100 + 15);
  chk(V7, 24);
  const t7 = 20 + (1000 - 0.5 * 20 * V7) / V7;
  b.struct({
    d: 3, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 4",
    concepts: [Q("kinematics.graphs"), Q("kinematics.constant-acceleration")],
    stem: t`A kombi starts from rest and accelerates uniformly for $20$ s to a speed of $V$ m s$^{-1}$. It travels at this speed for $100$ s and then decelerates uniformly to rest in $30$ s. The total distance travelled is $3000$ m.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the velocity–time graph of the journey, giving the coordinates of its corners.",
        points: ["A straight line from (0, 0) up to (20, V), then horizontal to (120, V).", "Then a straight line down to (150, 0); the graph is a trapezium."],
        modelAnswer: "Corners at (0, 0), (20, V), (120, V) and (150, 0): a trapezium with parallel sides 150 and 100 and height V.",
        explanation: "Uniform acceleration is a straight sloping line; constant speed is horizontal." }),
      P.num({ label: "(b)", marks: 3, stem: "Find V.", value: V7, unit: "m/s", wrong: [20],
        explanation: t`Area of the trapezium: $\frac{1}{2}(100 + 150)V = 125V = 3000$, so $V = 24$. ($3000 \div 150 = 20$ ignores the sloping ends.)` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the deceleration of the kombi.", value: 0.8, unit: "m/s²", wrong: [1.2],
        explanation: t`$\frac{24}{30} = 0.8$ m s$^{-2}$. ($\frac{24}{20}$ is the acceleration.)` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the time after the start at which the kombi has travelled 1000 m.", value: t7, unit: "s", wrong: [1000 / 24],
        explanation: t`In the first 20 s it covers $\frac{1}{2}(20)(24) = 240$ m. The remaining $760$ m at $24$ m s$^{-1}$ takes $31.67$ s, so $t = ${f3(t7)}$ s.` }),
    ],
    explanation: "Area under a velocity–time graph is distance; gradient is acceleration.",
    hints: ["Area of a trapezium = ½(sum of parallel sides) × height.", "Work stage by stage for part (d)."],
  });

  // ------------------------------------------------------------ C4l-4 (8): work-energy on a slide, then rough ground
  const m8 = 40, L8 = 6, th8 = rad(30), v8 = 6;
  const PE8 = m8 * g * L8 * sin(th8);
  chk(PE8, 1200);
  const KE8 = 0.5 * m8 * v8 * v8;
  const Wf8 = PE8 - KE8;
  chk(Wf8, 480);
  const F8 = Wf8 / L8;
  const mu8 = F8 / (m8 * g * cos(th8));
  const d8 = KE8 / (mu8 * m8 * g);
  b.struct({
    d: 4, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 4",
    concepts: [Q("energy.work-energy"), Q("forces.friction")],
    stem: t`Tendai, of mass $40$ kg, slides from rest down a straight slide of length $6$ m inclined at $30°$ to the horizontal. He reaches the bottom with speed $6$ m s$^{-1}$. Model Tendai as a particle and the friction force on the slide as constant.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the loss of gravitational potential energy.", value: PE8, unit: "J", wrong: [2400],
        explanation: t`Height lost $= 6\sin 30° = 3$ m, so the loss is $40 \times 10 \times 3 = 1200$ J. (Using the length $6$ m as the height gives $2400$.)` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the work done against friction.", value: Wf8, unit: "J", wrong: [720],
        explanation: t`Gain in KE $= \frac{1}{2}(40)(36) = 720$ J. Work against friction $= 1200 - 720 = 480$ J.` }),
      P.num({ label: "(c)", marks: 3, stem: "Find the coefficient of friction between Tendai and the slide, correct to 3 significant figures.", value: mu8, wrong: [F8 / (m8 * g)],
        explanation: t`Friction $= \frac{480}{6} = 80$ N. $R = 400\cos 30° = 346.4$ N, so $\mu = \frac{80}{346.4} = ${f3(mu8)}$. (Dividing by $400$ forgets that $R = mg\cos 30°$ on the slope.)` }),
      P.num({ label: "(d)", marks: 2, stem: "At the bottom he slides onto horizontal ground with the same coefficient of friction. Find the distance he slides before stopping.", value: d8, unit: "m", wrong: [720 / 80],
        explanation: t`On level ground $R = 400$ N, friction $= ${f3(mu8)} \times 400 = ${f3(mu8 * 400)}$ N. $720 = ${f3(mu8 * 400)}d$ gives $d = ${f3(d8)}$ m.` }),
    ],
    explanation: "Loss of PE = gain of KE + work done against friction.",
    hints: ["Height = length × sin 30°.", "On the level ground the normal reaction changes."],
  });

  // ------------------------------------------------------------ C4l-5 (8): lift
  const ml = 450, mm = 65;
  const Tup = (ml + mm) * (g + 0.8);
  chk(Tup, 5562);
  const Rup = mm * (g + 0.8);
  chk(Rup, 702);
  const dec9 = ((ml + mm) * g - 4635) / (ml + mm);
  chk(dec9, 1);
  const Rdown = mm * (g - dec9);
  chk(Rdown, 585);
  b.struct({
    d: 3, marks: 8, secs: 90 * 8, skill: "APPLICATION", examStyle: true, calculator: false, paper: "Paper 4",
    concepts: [Q("newton.laws")],
    stem: t`A lift of mass $450$ kg carries a woman of mass $65$ kg. The lift is raised by a vertical cable. Air resistance is negligible.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "The lift accelerates upwards at 0.8 m s⁻². Find the tension in the cable and the force exerted on the woman by the floor of the lift.", template: "tension = {{blank:t}} N, floor force = {{blank:r}} N",
        blanks: [N("t", Tup, "5150", 2), N("r", Rup, "650", 2)],
        explanation: t`Whole system: $T - 515 \times 10 = 515 \times 0.8$, so $T = 5562$ N. Woman: $R - 650 = 65 \times 0.8$, so $R = 702$ N.` }),
      P.fib({ label: "(b)", marks: 4, stem: "Later, while the lift is still moving upwards, the tension is 4635 N. Find the deceleration of the lift and the force exerted on the woman by the floor.", template: "deceleration = {{blank:a}} m/s², floor force = {{blank:r}} N",
        blanks: [N("a", dec9, "-1", 2), N("r", Rdown, "715", 2)],
        explanation: t`$4635 - 5150 = 515a$, so $a = -1$: a deceleration of $1$ m s$^{-2}$. Woman: $R - 650 = 65(-1)$, so $R = 585$ N. (Adding instead of subtracting gives 715.)` }),
    ],
    explanation: "Apply F = ma to the whole system for the tension and to the woman alone for the reaction.",
    hints: ["The woman and the lift share the same acceleration.", "A deceleration while moving up is a negative upward acceleration."],
  });

  // ------------------------------------------------------------ C3s (6): angle in a triangle and its area (Paper 3 vectors)
  const A3 = [2, -1, 3], B3 = [4, 1, 2], C3 = [1, 3, 5];
  const AB = v3.sub(B3, A3), AC = v3.sub(C3, A3);
  same(AB, [2, 2, -1]); same(AC, [-1, 4, 2]);
  chk(v3.dot(AB, AC), 4); chk(v3.mag(AB), 3); chk(v3.mag(AC), sqrt(21));
  const area3 = v3.mag(v3.cross(AB, AC)) / 2;
  chk(area3, 0.5 * 3 * sqrt(21) * sin(rad(v3.angle(AB, AC))));
  b.struct({
    d: 3, marks: 6, secs: 90 * 6, skill: "APPLICATION", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("vectors.scalar-product"), Q("vectors.basics")],
    stem: t`Relative to the origin $O$, the points $A$, $B$ and $C$ have position vectors $\overrightarrow{OA} = 2\mathbf{i} - \mathbf{j} + 3\mathbf{k}$, $\overrightarrow{OB} = 4\mathbf{i} + \mathbf{j} + 2\mathbf{k}$ and $\overrightarrow{OC} = \mathbf{i} + 3\mathbf{j} + 5\mathbf{k}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 3, stem: t`Use a scalar product to show that $\cos BAC = \dfrac{4}{3\sqrt{21}}$.`,
        points: [t`B1 $\overrightarrow{AB} = 2\mathbf{i} + 2\mathbf{j} - \mathbf{k}$ and $\overrightarrow{AC} = -\mathbf{i} + 4\mathbf{j} + 2\mathbf{k}$.`, t`M1 $\overrightarrow{AB} \cdot \overrightarrow{AC} = -2 + 8 - 2 = 4$ with $|\overrightarrow{AB}| = 3$, $|\overrightarrow{AC}| = \sqrt{21}$.`, "A1 divides correctly to reach the given result."],
        modelAnswer: t`$$
\overrightarrow{AB} = ${IJK(AB)}, \quad \overrightarrow{AC} = ${IJK(AC)}
$$
$$
\overrightarrow{AB} \cdot \overrightarrow{AC} = -2 + 8 - 2 = 4, \quad |\overrightarrow{AB}| = 3, \quad |\overrightarrow{AC}| = \sqrt{21}
$$
$$
\cos BAC = \frac{4}{3\sqrt{21}}
$$`,
        explanation: "The angle at A uses vectors starting at A: AB and AC, not OB and OC." }),
      P.num({ label: "(b)", marks: 3, stem: "Hence find the area of triangle ABC, correct to 3 significant figures.", value: area3, unit: "units²", wrong: [0.5 * 3 * sqrt(21)],
        explanation: t`$\sin BAC = \sqrt{1 - \frac{16}{189}} = \sqrt{\frac{173}{189}}$. Area $= \frac{1}{2} \times 3 \times \sqrt{21} \times \sin BAC = \frac{1}{2}\sqrt{173} = ${f3(area3)}$. (Leaving out $\sin BAC$ gives $\frac{3\sqrt{21}}{2}$.)` }),
    ],
    explanation: "Scalar product for the angle, then area = ½ab sin C.",
    hints: ["Use AB and AC, both starting at A.", "sin² + cos² = 1 gives the exact sine."],
  });
  chk(area3, 0.5 * sqrt(173));

  // ------------------------------------------------------------ C3l-1 (9): intersecting lines, angle, point on a line
  const a1 = [1, 0, 2], d1v = [2, 1, -1], a2 = [6, 0, 3], d2v = [1, -2, 3];
  const L1 = v3.lines(a1, d1v, a2, d2v);
  same(L1.kind, "intersect"); same(r9(L1.point), [5, 2, 0]); chk(L1.s, 2); chk(L1.t, -1);
  const th1 = v3.angle(d1v, d2v);
  const acute1 = 180 - th1;
  same(v3.add(a1, v3.scale(4, d1v)), [9, 4, -2]);
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("vectors.lines"), Q("vectors.scalar-product")],
    stem: t`The lines $l$ and $m$ have equations $\mathbf{r} = \mathbf{i} + 2\mathbf{k} + s(2\mathbf{i} + \mathbf{j} - \mathbf{k})$ and $\mathbf{r} = 6\mathbf{i} + 3\mathbf{k} + t(\mathbf{i} - 2\mathbf{j} + 3\mathbf{k})$ respectively.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Show that l and m intersect, and find the position vector of their point of intersection X.", template: "X = {{blank:x}}i + {{blank:y}}j + {{blank:z}}k",
        blanks: [N("x", 5, "9"), N("y", 2, "4"), N("z", 0, "-2")],
        explanation: t`$1 + 2s = 6 + t$, $s = -2t$, $2 - s = 3 + 3t$. Substituting $s = -2t$ in the first: $1 - 4t = 6 + t$, so $t = -1$, $s = 2$. Third: $2 - 2 = 0$ and $3 - 3 = 0$: consistent. $X$: $\mathbf{r} = 5\mathbf{i} + 2\mathbf{j}$.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the acute angle between l and m, in degrees correct to 1 decimal place.", value: acute1, unit: "°", wrong: [th1],
        explanation: t`$(2, 1, -1) \cdot (1, -2, 3) = 2 - 2 - 3 = -3$; magnitudes $\sqrt{6}$ and $\sqrt{14}$. $\cos\theta = \frac{-3}{\sqrt{84}}$ gives $${d1(th1)}°$, so the acute angle is $${d1(acute1)}°$.` }),
      P.proof({ label: "(c)", marks: 2, stem: t`Show that the point $Y(9, 4, -2)$ lies on $l$, and find the distance $XY$ in exact form.`,
        points: [t`B1 $s = 4$ gives $(1 + 8, 4, 2 - 4) = (9, 4, -2)$, checked in all three components.`, t`B1 $\overrightarrow{XY} = 4\mathbf{i} + 2\mathbf{j} - 2\mathbf{k}$, so $XY = \sqrt{24} = 2\sqrt{6}$.`],
        modelAnswer: t`$$
s = 4: \; (1 + 8, \; 0 + 4, \; 2 - 4) = (9, 4, -2) = Y
$$
$$
\overrightarrow{XY} = 4\mathbf{i} + 2\mathbf{j} - 2\mathbf{k}, \quad XY = \sqrt{16 + 4 + 4} = 2\sqrt{6}
$$`,
        explanation: "One value of s must fit all three coordinates." }),
    ],
    explanation: "Different parameters for the two lines; the angle from the direction vectors; points on a line from one parameter value.",
    hints: ["Solve two of the component equations and check the third.", "A negative scalar product gives the obtuse angle."],
  });

  // ------------------------------------------------------------ C3l-2 (9): foot of perpendicular, distance, skew lines
  const pa = [2, 1, -1], pd = [2, -1, 2], Pp = [7, 1, 3];
  const Ft = v3.foot(Pp, pa, pd);
  chk(Ft.t, 2); same(r9(Ft.foot), [6, -1, 3]); chk(Ft.dist, sqrt(5));
  same(v3.lines(pa, pd, [0, 2, 1], [1, 1, -1]).kind, "skew");
  same(v3.add(pa, pd), [4, 0, 1]); // B = A + AB
  chk(v3.mag(v3.sub(Pp, pa)), sqrt(41));
  b.struct({
    d: 4, marks: 9, secs: 90 * 9, skill: "ANALYSIS", examStyle: true, calculator: true, paper: "Paper 3",
    concepts: [Q("vectors.lines"), Q("vectors.scalar-product")],
    stem: t`The points $A$ and $B$ have position vectors $2\mathbf{i} + \mathbf{j} - \mathbf{k}$ and $4\mathbf{i} + \mathbf{k}$. The line $l$ passes through $A$ and $B$. The point $P$ has position vector $7\mathbf{i} + \mathbf{j} + 3\mathbf{k}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 4, stem: "Find the position vector of the foot N of the perpendicular from P to l.", template: "N = {{blank:x}}i + {{blank:y}}j + {{blank:z}}k",
        blanks: [N("x", 6, "4"), N("y", -1, "0"), N("z", 3, "1")],
        explanation: t`$l$: $\mathbf{r} = 2\mathbf{i} + \mathbf{j} - \mathbf{k} + \lambda(2\mathbf{i} - \mathbf{j} + 2\mathbf{k})$. $\overrightarrow{PN} = (2\lambda - 5)\mathbf{i} - \lambda\mathbf{j} + (2\lambda - 4)\mathbf{k}$. $\overrightarrow{PN} \cdot (2, -1, 2) = 9\lambda - 18 = 0$, so $\lambda = 2$ and $N = 6\mathbf{i} - \mathbf{j} + 3\mathbf{k}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the perpendicular distance from P to l, correct to 3 significant figures.", value: Ft.dist, wrong: [v3.mag(v3.sub(Pp, pa))],
        explanation: t`$\overrightarrow{PN} = -\mathbf{i} - 2\mathbf{j}$, so the distance is $\sqrt{5} = ${f3(Ft.dist)}$. ($|\overrightarrow{AP}| = \sqrt{41}$ is not perpendicular to $l$.)` }),
      P.proof({ label: "(c)", marks: 3, stem: t`The line $m$ has equation $\mathbf{r} = 2\mathbf{j} + \mathbf{k} + \mu(\mathbf{i} + \mathbf{j} - \mathbf{k})$. Show that $l$ and $m$ are skew.`,
        points: ["B1 the directions (2, −1, 2) and (1, 1, −1) are not multiples, so the lines are not parallel.", t`M1 forms and solves two equations, e.g. $2 + 2\lambda = \mu$ and $1 - \lambda = 2 + \mu$, giving $\lambda = -1$, $\mu = 0$.`, t`A1 shows the third fails: $-1 + 2\lambda = -3$ but $1 - \mu = 1$; so the lines are skew.`],
        modelAnswer: t`$$
(2, -1, 2) \ne k(1, 1, -1) \Rightarrow \text{not parallel}
$$
$$
2 + 2\lambda = \mu, \quad 1 - \lambda = 2 + \mu, \quad -1 + 2\lambda = 1 - \mu
$$
$$
1 - \lambda = 4 + 2\lambda \Rightarrow \lambda = -1, \; \mu = 0
$$
$$
-1 + 2(-1) = -3 \ne 1 = 1 - 0 \Rightarrow \text{no common point: skew}
$$`,
        explanation: "Skew = not parallel and not intersecting; show both." }),
    ],
    explanation: "Foot of the perpendicular from a zero scalar product; skew lines by an inconsistent third equation.",
    hints: ["Write PN in terms of the parameter.", "Check the directions before solving for the parameters."],
  });
});
