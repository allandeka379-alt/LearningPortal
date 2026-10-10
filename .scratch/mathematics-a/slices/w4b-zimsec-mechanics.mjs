// W4b exam-format items for ZIMSEC A-Level Mechanics: ZM1a ×7 (7 marks, Paper 1), ZM1b ×3 (6, Paper 1),
// ZM2 ×6 (20, Paper 2). g = 9.8 m s⁻² throughout (stated in every stem). Every value is computed and checked here.
import { concept, P, t, chk, rad, deg, checkDeriv, checkAntideriv, ZM } from "../lib.mjs";
import { f3, f4, NB } from "../tables/w4b-kit.mjs";

const { sqrt, sin, cos, tan, atan, acos, asin, PI } = Math;
const g = 9.8;
const G = t`Take $g = 9.8$ m s$^{-2}$.`;
const Q = (k) => `amaths.${k}`;
const base = (marks, paper) => ({ marks, secs: 90 * marks, examStyle: true, calculator: true, paper });

concept(Q("projectiles.motion"), { file: "exam/w4b-zimsec-mechanics", keyPrefix: "exam.w4b-zimsec-mechanics", applies: ZM }, (b) => {
  // ================================================================ ZM1a (7 marks) ×7
  // ZM1a-1 projectile from ground level
  {
    const u = 24, th = rad(38);
    const tUp = (u * sin(th)) / g, H = (u * sin(th)) ** 2 / (2 * g), R = (u * u * sin(2 * th)) / g;
    chk(R, u * cos(th) * 2 * tUp, 1e-9);
    b.struct({
      d: 3, ...base(7, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("projectiles.motion")],
      stem: t`A football is kicked from level ground at Rufaro Stadium with speed $24$ m s$^{-1}$ at $38°$ above the horizontal. Treat the ball as a particle and ignore air resistance. ${G}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the time taken to reach the highest point, correct to 3 significant figures.", value: tUp, unit: "s", wrong: [f3((u * cos(th)) / g)],
          explanation: t`Vertically $0 = 24\sin 38° - 9.8t$, so $t = \frac{24\sin 38°}{9.8} = ${f3(tUp)}$ s.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the greatest height of the ball, correct to 3 significant figures.", value: H, unit: "m", wrong: [f3((u * u) / (2 * g))],
          explanation: t`$H = \frac{(24\sin 38°)^2}{2 \times 9.8} = ${f3(H)}$ m.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the horizontal distance from the point of projection to where the ball lands, correct to 3 significant figures.", value: R, unit: "m", wrong: [f3(R / 2)],
          explanation: t`Time of flight $2 \times ${f4(tUp)} = ${f4(2 * tUp)}$ s; range $= 24\cos 38° \times ${f4(2 * tUp)} = \frac{24^2\sin 76°}{9.8} = ${f3(R)}$ m.` }),
      ],
      explanation: "Resolve the initial velocity; vertical motion has acceleration −g, horizontal motion constant velocity.",
      hints: ["At the top the vertical velocity is zero.", "Time of flight = 2 × time to the top on level ground."],
    });
  }

  // ZM1a-2 moments: plank on two supports
  {
    const RD = (40 * 2 + 50 * 2) / 3.5, RC = 90 - RD;
    chk(RD * g, 504, 1e-9); chk(RC * g, 378, 1e-9);
    const x = 4.5 + (40 * 1.5) / 50;
    chk(x, 5.7, 1e-12);
    b.struct({
      d: 3, ...base(7, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("forces.moments-rigid-body")],
      stem: t`A uniform plank $AB$ of length $6$ m and mass $40$ kg rests horizontally on two supports at $C$ and $D$, where $AC = 1$ m and $AD = 4.5$ m. A man of mass $50$ kg stands on the plank. Model the man as a particle. ${G}`,
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: "The man stands 3 m from A. Find the reactions at C and D.", template: "at C: {{blank:c}} N, at D: {{blank:d}} N",
          blanks: [NB("c", RC * g, 441, 2), NB("d", RD * g, 441, 2)],
          explanation: t`Moments about $C$: $R_D \times 3.5 = 40g \times 2 + 50g \times 2 = 180g$, so $R_D = ${f3(RD * g)}$ N. Resolving: $R_C = 90g - R_D = ${f3(RC * g)}$ N.` }),
        P.num({ label: "(b)", marks: 3, stem: "The man walks towards B. Find his distance from A when the plank is about to tip about D.", value: x, unit: "m", wrong: [6],
          explanation: t`About to tip: $R_C = 0$. Moments about $D$: $40g \times 1.5 = 50g \times (x - 4.5)$, so $x = 4.5 + 1.2 = 5.7$ m.` }),
      ],
      explanation: "Take moments about a support to remove its reaction; tipping about D means the reaction at C is zero.",
      hints: ["The plank's weight acts at its midpoint, 3 m from A.", "On the point of tipping, R_C = 0."],
    });
  }

  // ZM1a-3 centre of mass of an L-shaped lamina
  {
    const xb = (12 * 3 + 12 * 1) / 24, yb = (12 * 1 + 12 * 5) / 24;
    chk(xb, 2); chk(yb, 3);
    const ang = deg(atan(2 / 5));
    b.struct({
      d: 3, ...base(7, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("com.centre-of-mass")],
      stem: t`A uniform lamina is made of two rectangles: $R_1$ with corners $(0, 0)$, $(6, 0)$, $(6, 2)$, $(0, 2)$ and $R_2$ with corners $(0, 2)$, $(2, 2)$, $(2, 8)$, $(0, 8)$ (units: cm).`,
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: "Find the coordinates of the centre of mass of the lamina.", template: "({{blank:x}}, {{blank:y}})",
          blanks: [NB("x", xb, 3, 2), NB("y", yb, 4, 2)],
          explanation: t`Areas $12$ and $12$ with centres $(3, 1)$ and $(1, 5)$: $\bar{x} = \frac{12(3) + 12(1)}{24} = 2$, $\bar{y} = \frac{12(1) + 12(5)}{24} = 3$.` }),
        P.num({ label: "(b)", marks: 3, stem: "The lamina is freely suspended from the corner (0, 8). Find the angle between the edge along the y-axis and the vertical, in degrees correct to 1 decimal place.", value: ang, unit: "°", wrong: [f3(90 - ang)],
          explanation: t`The centre of mass $(2, 3)$ hangs vertically below $(0, 8)$. Horizontal offset $2$, vertical $8 - 3 = 5$: $\tan\theta = \frac{2}{5}$, $\theta = ${ang.toFixed(1)}°$.` }),
      ],
      explanation: "Combine areas as point masses; when suspended, the centre of mass lies vertically below the point of suspension.",
      hints: ["Use Σ(area × centre)/Σarea.", "Draw the line from (0, 8) to the centre of mass."],
    });
  }

  // ZM1a-4 elastic string on a smooth table
  {
    const lam = 25, l0 = 0.75, m = 0.5;
    const T = (lam * 0.3) / l0, E = (lam * 0.3 ** 2) / (2 * l0), v1 = sqrt((2 * E) / m), E2 = (lam * 0.1 ** 2) / (2 * l0), v2 = sqrt((2 * (E - E2)) / m);
    chk(T, 10); chk(E, 1.5);
    b.struct({
      d: 3, ...base(7, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("elasticity.hookes-law-energy")],
      stem: t`A particle of mass $0.5$ kg lies on a smooth horizontal table, attached to a fixed point $O$ by a light elastic string of natural length $0.75$ m and modulus $25$ N. It is pulled until the string has extension $0.3$ m and released from rest.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the tension in the string just before release.", value: T, unit: "N", wrong: [7.5],
          explanation: t`$T = \frac{25 \times 0.3}{0.75} = 10$ N.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the elastic potential energy stored just before release.", value: E, unit: "J", wrong: [3],
          explanation: t`$\frac{\lambda x^2}{2l} = \frac{25 \times 0.09}{1.5} = 1.5$ J. ($3$ J forgets the factor $\frac{1}{2}$.)` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the speed of the particle when the string first becomes slack, correct to 3 significant figures.", value: v1, unit: "m/s", wrong: [f3(sqrt(E / m))],
          explanation: t`All the EPE becomes KE: $\frac{1}{2}(0.5)v^2 = 1.5$, $v = \sqrt{6} = ${f3(v1)}$ m s$^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the speed when the extension is 0.1 m, correct to 3 significant figures.", value: v2, unit: "m/s", wrong: [f3(sqrt((2 * E2) / m))],
          explanation: t`EPE then $= \frac{25 \times 0.01}{1.5} = ${f4(E2)}$ J; $\frac{1}{2}(0.5)v^2 = 1.5 - ${f4(E2)}$, so $v = ${f3(v2)}$ m s$^{-1}$.` }),
      ],
      explanation: "Hooke's law for tension; EPE = λx²/(2l); conservation of energy on the smooth table.",
      hints: ["The table is smooth, so energy is conserved."],
    });
  }

  // ZM1a-5 conical pendulum
  {
    const al = rad(40), m = 0.25, l = 0.9, T = (m * g) / cos(al), w = sqrt(g / (l * cos(al))), per = (2 * PI) / w;
    chk(T * sin(al), m * w * w * l * sin(al), 1e-9);
    b.struct({
      d: 3, ...base(7, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("circular.motion")],
      stem: t`A particle of mass $0.25$ kg is attached to one end of a light inextensible string of length $0.9$ m, the other end fixed. The particle moves in a horizontal circle with the string making $40°$ with the vertical. ${G}`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Find the tension in the string, correct to 3 significant figures.", value: T, unit: "N", wrong: [f3(m * g * cos(al))],
          explanation: t`Vertically: $T\cos 40° = 0.25g$, so $T = ${f3(T)}$ N.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the angular speed, correct to 3 significant figures.", value: w, unit: "rad/s", wrong: [f3(g / (l * cos(al)))],
          explanation: t`Horizontally: $T\sin 40° = 0.25\omega^2(0.9\sin 40°)$, so $\omega^2 = \frac{T}{0.25 \times 0.9} = \frac{g}{0.9\cos 40°}$ and $\omega = ${f3(w)}$ rad s$^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the time for one revolution, correct to 3 significant figures.", value: per, unit: "s", wrong: [f3(1 / w)],
          explanation: t`$\frac{2\pi}{\omega} = ${f3(per)}$ s.` }),
      ],
      explanation: "Vertical equilibrium, then Newton's second law towards the centre with radius l sin α.",
      hints: ["Radius of the circle = 0.9 sin 40°."],
    });
  }

  // ZM1a-6 variable force (time)
  {
    const vf = (s) => 3 * s * s - 0.5 * s ** 3, xf = (s) => s ** 3 - s ** 4 / 8;
    checkDeriv(vf, (s) => 6 * s - 1.5 * s * s, [0.5, 2, 3.5]);
    checkAntideriv(xf, vf, 0, 4);
    chk(vf(2), 8); chk(vf(4), 16); chk(xf(4), 32);
    b.struct({
      d: 3, ...base(7, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("variable.force")],
      stem: t`A particle of mass $2$ kg moves along a straight line under a single force $F = (12t - 3t^2)$ N, where $t$ is the time in seconds. It starts from rest at the origin.`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Find the velocity of the particle when t = 2.", value: 8, unit: "m/s", wrong: [16],
          explanation: t`$a = \frac{F}{2} = 6t - 1.5t^2$; $v = 3t^2 - 0.5t^3$ (since $v = 0$ at $t = 0$); $v(2) = 12 - 4 = 8$ m s$^{-1}$.` }),
        P.fib({ label: "(b)", marks: 2, stem: "Find the time (after t = 0) when the force is next zero, and the velocity then.", template: "t = {{blank:t}} s, v = {{blank:v}} m/s",
          blanks: [NB("t", 4, 2, 1), NB("v", 16, 32, 1)],
          explanation: t`$12t - 3t^2 = 0 \Rightarrow t = 4$; $v(4) = 48 - 32 = 16$ m s$^{-1}$ (the greatest velocity).` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the distance travelled in the first 4 seconds.", value: 32, unit: "m", wrong: [64],
          explanation: t`$x = t^3 - \frac{t^4}{8}$; $x(4) = 64 - 32 = 32$ m ($v \ge 0$ throughout, so this is the distance).` }),
      ],
      explanation: "a = F/m; integrate with respect to t twice, using the initial conditions.",
      hints: ["v = ∫a dt with v = 0 at t = 0."],
    });
  }

  // ZM1a-7 SHM
  {
    const w = PI / 2;
    const vmax = 0.5 * w, v = w * sqrt(0.25 - 0.3 ** 2), tt = asin(0.5) / w;
    chk(tt, 1 / 3, 1e-12);
    b.struct({
      d: 3, ...base(7, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("shm.motion")],
      stem: t`A particle moves with simple harmonic motion about a point $O$ with period $4$ s and amplitude $0.5$ m.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the greatest speed, correct to 3 significant figures.", value: vmax, unit: "m/s", wrong: [f3(0.5 * w * w)],
          explanation: t`$\omega = \frac{2\pi}{4} = \frac{\pi}{2}$; $v_{\max} = a\omega = 0.25\pi = ${f3(vmax)}$ m s$^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the speed when the particle is 0.3 m from O, correct to 3 significant figures.", value: v, unit: "m/s", wrong: [f3(w * sqrt(0.5 - 0.3))],
          explanation: t`$v = \omega\sqrt{a^2 - x^2} = \frac{\pi}{2}\sqrt{0.25 - 0.09} = \frac{\pi}{2}(0.4) = ${f3(v)}$ m s$^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the time taken to travel directly from O to a point 0.25 m from O, correct to 3 significant figures.", value: tt, unit: "s", wrong: [0.5],
          explanation: t`From $O$, $x = 0.5\sin\frac{\pi t}{2}$. $0.25 = 0.5\sin\frac{\pi t}{2} \Rightarrow \frac{\pi t}{2} = \frac{\pi}{6} \Rightarrow t = \frac{1}{3}$ s. ($0.5$ s assumes constant speed.)` }),
      ],
      explanation: "ω = 2π/T, then v_max = aω, v² = ω²(a² − x²), x = a sin ωt from the centre.",
      hints: ["ω = 2π/period.", "Time from O: x = a sin ωt."],
    });
  }

  // ================================================================ ZM1b (6 marks) ×3
  // ZM1b-1 horizontal projection
  {
    const tt = sqrt((2 * 110) / g), X = 15 * tt, V = sqrt(225 + (g * tt) ** 2);
    b.struct({
      d: 3, ...base(6, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("projectiles.motion")],
      stem: t`A stone is thrown horizontally with speed $15$ m s$^{-1}$ from a point $110$ m above the Zambezi river below the Victoria Falls bridge. Ignore air resistance. ${G}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the time taken to reach the river, correct to 3 significant figures.", value: tt, unit: "s", wrong: [f3(110 / g)],
          explanation: t`$110 = \frac{1}{2}(9.8)t^2$, so $t = \sqrt{\frac{220}{9.8}} = ${f3(tt)}$ s.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the horizontal distance travelled, correct to 3 significant figures.", value: X, unit: "m", wrong: [f3(15 * (110 / g))],
          explanation: t`$15 \times ${f4(tt)} = ${f3(X)}$ m.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the speed of the stone as it reaches the river, correct to 3 significant figures.", value: V, unit: "m/s", wrong: [f3(15 + g * tt)],
          explanation: t`Vertical velocity $9.8 \times ${f4(tt)} = ${f4(g * tt)}$; speed $\sqrt{15^2 + ${f4(g * tt)}^2} = ${f3(V)}$ m s$^{-1}$.` }),
      ],
      explanation: "Horizontal: constant 15 m/s. Vertical: starts at 0 with acceleration g.",
      hints: ["The initial vertical velocity is zero."],
    });
  }

  // ZM1b-2 rough turntable
  {
    const w = sqrt((0.4 * g) / 0.15), rpm = (w * 60) / (2 * PI);
    b.struct({
      d: 3, ...base(6, "Paper 1"), skill: "APPLICATION",
      concepts: [Q("circular.motion")],
      stem: t`A coin rests on a rough horizontal turntable $0.15$ m from its centre. The coefficient of friction between the coin and the turntable is $0.4$. The turntable's angular speed is slowly increased. ${G}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain which force provides the centripetal force on the coin and why the coin eventually slides.",
          points: ["Friction (towards the centre) provides the centripetal force mω²r.", "Friction cannot exceed μR = μmg; when mω²r > μmg the coin slides."],
          modelAnswer: "Only friction acts horizontally, so it supplies the force mω²r towards the centre. Friction is limited to μmg, so once ω²r exceeds μg friction cannot hold the coin and it slides outwards.",
          explanation: "Limiting friction sets the maximum speed." }),
        P.num({ label: "(b)", marks: 3, stem: "Find the greatest angular speed for which the coin does not slide, correct to 3 significant figures.", value: w, unit: "rad/s", wrong: [f3((0.4 * g) / 0.15)],
          explanation: t`$m\omega^2(0.15) = 0.4mg \Rightarrow \omega = \sqrt{\frac{0.4 \times 9.8}{0.15}} = ${f3(w)}$ rad s$^{-1}$. The mass cancels.` }),
        P.num({ label: "(c)", marks: 1, stem: "Convert this to revolutions per minute, correct to 3 significant figures.", value: rpm, wrong: [f3(w * 60)],
          explanation: t`$\frac{${f4(w)} \times 60}{2\pi} = ${f3(rpm)}$ rev/min.` }),
      ],
      explanation: "Limiting friction μmg = mω²r.",
      hints: ["Normal reaction = mg."],
    });
  }

  // ZM1b-3 ladder
  {
    const S = (20 * g * 2.5 * cos(rad(60))) / (5 * sin(rad(60))), R = 20 * g, mu = S / R;
    b.struct({
      d: 4, ...base(6, "Paper 1"), skill: "ANALYSIS",
      concepts: [Q("forces.moments-rigid-body")],
      stem: t`A uniform ladder of length $5$ m and mass $20$ kg rests with its top against a smooth vertical wall and its foot on rough horizontal ground, making $60°$ with the ground. The ladder is in limiting equilibrium. ${G}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the normal reaction at the ground.", value: R, unit: "N", wrong: [20],
          explanation: t`Resolving vertically (the wall is smooth): $R = 20g = 196$ N.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the reaction at the wall, correct to 3 significant figures.", value: S, unit: "N", wrong: [f3((20 * g * 2.5 * sin(rad(60))) / (5 * cos(rad(60))))],
          explanation: t`Moments about the foot: $S \times 5\sin 60° = 20g \times 2.5\cos 60°$, so $S = ${f3(S)}$ N.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the coefficient of friction between the ladder and the ground, correct to 3 significant figures.", value: mu, wrong: [f3(R / S)],
          explanation: t`Horizontally $F = S$; limiting: $\mu = \frac{F}{R} = \frac{${f3(S)}}{196} = ${f3(mu)}$.` }),
      ],
      explanation: "Resolve vertically and horizontally, take moments about the foot, then F = μR.",
      hints: ["Take moments about the foot of the ladder."],
    });
  }

  // ================================================================ ZM2 (20 marks) ×6
  // ZM2-1 projectile: trajectory and two angles to hit a target
  {
    const V = 20, X = 28, Y = 5;
    const k = (g * X * X) / (2 * V * V);
    const [T1, T2] = rootsQ(k, -X, Y + k);
    const lo = Math.min(T1, T2), hi = Math.max(T1, T2);
    const a1 = deg(atan(lo)), a2 = deg(atan(hi));
    for (const tn of [lo, hi]) chk(X * tn - (g * X * X * (1 + tn * tn)) / (2 * V * V), Y, 1e-9);
    const th = atan(lo);
    const Hm = (V * sin(th)) ** 2 / (2 * g), tT = X / (V * cos(th)), Rg = (V * V * sin(2 * th)) / g;
    const vT = sqrt(V * V - 2 * g * Y);
    b.struct({
      d: 5, ...base(20, "Paper 2"), skill: "ANALYSIS",
      concepts: [Q("projectiles.motion")],
      stem: t`A particle is projected from a point $O$ on horizontal ground with speed $V$ m s$^{-1}$ at an angle $\theta$ above the horizontal. ${G}`,
      parts: [
        P.proof({ label: "(a)", marks: 4, stem: t`Show that the equation of the trajectory is $y = x\tan\theta - \dfrac{gx^2}{2V^2}\left(1 + \tan^2\theta\right)$.`,
          points: ["M1 x = Vt cos θ and y = Vt sin θ − ½gt².", "M1 eliminates t: t = x/(V cos θ).", "A1 y = x tan θ − gx²/(2V² cos²θ).", "A1 uses sec²θ = 1 + tan²θ to reach the given form."],
          modelAnswer: t`$$
x = Vt\cos\theta, \qquad y = Vt\sin\theta - \tfrac{1}{2}gt^2
$$
$$
t = \frac{x}{V\cos\theta} \;\Rightarrow\; y = x\tan\theta - \frac{gx^2}{2V^2\cos^2\theta} = x\tan\theta - \frac{gx^2}{2V^2}\left(1 + \tan^2\theta\right)
$$`,
          explanation: "Eliminate t and use sec²θ = 1 + tan²θ." }),
        P.fib({ label: "(b)", marks: 6, stem: t`With $V = 20$, the particle must pass through the point $(28, 5)$. Find the two possible values of $\theta$, in degrees correct to 1 decimal place (smaller first).`, template: "θ = {{blank:a}}° or {{blank:b}}°",
          blanks: [{ id: "a", input: "number", accepted: [a1.toFixed(1)], tolerance: 0.05, marks: 3 }, { id: "b", input: "number", accepted: [a2.toFixed(1)], tolerance: 0.05, marks: 3 }],
          explanation: t`$5 = 28T - \frac{9.8 \times 784}{800}(1 + T^2)$ with $T = \tan\theta$: $9.604T^2 - 28T + 14.604 = 0$, so $T = ${f4(lo)}$ or $${f4(hi)}$, giving $\theta = ${a1.toFixed(1)}°$ or $${a2.toFixed(1)}°$.` }),
        P.num({ label: "(c)", marks: 3, stem: "For the smaller angle, find the greatest height reached, correct to 3 significant figures.", value: Hm, unit: "m", wrong: [f3((V * V) / (2 * g))],
          explanation: t`$H = \frac{(20\sin ${a1.toFixed(1)}°)^2}{2 \times 9.8} = ${f3(Hm)}$ m.` }),
        P.num({ label: "(d)", marks: 3, stem: "For the smaller angle, find the time taken to reach (28, 5), correct to 3 significant figures.", value: tT, unit: "s", wrong: [f3(28 / V)],
          explanation: t`$t = \frac{28}{20\cos ${a1.toFixed(1)}°} = ${f3(tT)}$ s.` }),
        P.num({ label: "(e)", marks: 2, stem: "For the smaller angle, find the range on the horizontal ground, correct to 3 significant figures.", value: Rg, unit: "m", wrong: [f3((V * V) / g)],
          explanation: t`$R = \frac{V^2\sin 2\theta}{g} = ${f3(Rg)}$ m.` }),
        P.num({ label: "(f)", marks: 2, stem: "Find the speed of the particle at (28, 5) (the same for both angles), correct to 3 significant figures.", value: vT, unit: "m/s", wrong: [20],
          explanation: t`Energy: $v^2 = 20^2 - 2(9.8)(5) = 302$, so $v = ${f3(vT)}$ m s$^{-1}$, whichever angle is used.` }),
      ],
      explanation: "Trajectory equation → quadratic in tan θ → standard projectile results.",
      hints: ["Substitute x = 28, y = 5, V = 20 and solve for tan θ.", "Speed at a given height follows from energy."],
    });
  }

  // ZM2-2 hinged rod held by a string
  {
    const sa = 0.6, ca = 0.8;
    const T = (8 * g * 1 + 5 * g * 2) / (sa * 2);
    chk(T, 15 * g, 1e-9);
    const H = T * ca, Vr = 13 * g - T * sa;
    chk(Vr, 4 * g, 1e-9);
    const Rm = sqrt(H * H + Vr * Vr), dir = deg(atan(Vr / H));
    const mMax = (210 * sa * 2 - 8 * g) / (2 * g);
    b.struct({
      d: 4, ...base(20, "Paper 2"), skill: "ANALYSIS",
      concepts: [Q("forces.moments-rigid-body")],
      stem: t`A uniform rod $AB$ of length $2$ m and mass $8$ kg is freely hinged to a vertical wall at $A$. It is held horizontal by a light inextensible string joining $B$ to the point $C$ on the wall $1.5$ m vertically above $A$. A load of mass $5$ kg hangs from $B$. ${G}`,
      parts: [
        P.num({ label: "(a)", marks: 5, stem: "Find the tension in the string.", value: T, unit: "N", wrong: [f3(T * 0.6)],
          explanation: t`$BC = 2.5$ m, so the string makes angle $\alpha$ with the rod where $\sin\alpha = 0.6$. Moments about $A$: $T \times 0.6 \times 2 = 8g(1) + 5g(2) = 18g$, so $T = 15g = ${f3(T)}$ N.` }),
        P.fib({ label: "(b)", marks: 6, stem: "Find the horizontal and vertical components of the force exerted by the hinge on the rod (vertical component positive upwards).", template: "horizontal: {{blank:h}} N, vertical: {{blank:v}} N",
          blanks: [NB("h", H, f3(T * sa), 3), NB("v", Vr, f3(13 * g), 3)],
          explanation: t`Horizontally: $H = T\cos\alpha = ${f3(T)} \times 0.8 = ${f3(H)}$ N, acting away from the wall. Vertically: $V + T\sin\alpha = 13g$, so $V = 127.4 - 88.2 = ${f3(Vr)}$ N upwards.` }),
        P.fib({ label: "(c)", marks: 4, stem: "Find the magnitude of the hinge force and the angle it makes with the rod, each correct to 3 significant figures (angle in degrees to 1 decimal place).", template: "magnitude {{blank:m}} N at {{blank:a}}° to the rod",
          blanks: [NB("m", Rm, f3(H + Vr), 2), { id: "a", input: "number", accepted: [dir.toFixed(1)], tolerance: 0.05, marks: 2 }],
          explanation: t`$\sqrt{${f3(H)}^2 + ${f3(Vr)}^2} = ${f3(Rm)}$ N, at $\tan^{-1}\frac{${f3(Vr)}}{${f3(H)}} = ${dir.toFixed(1)}°$ above the rod.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State two modelling assumptions used.",
          points: ["The rod is uniform (weight at its midpoint) and rigid.", "The string is light and inextensible; the hinge is smooth (free)."],
          modelAnswer: "The rod is a uniform rigid body, so its weight acts at its midpoint; the string is light and inextensible, and the hinge is smooth so it exerts no couple.",
          explanation: "Rigid body, light string, smooth hinge." }),
        P.num({ label: "(e)", marks: 3, stem: "The string breaks if its tension exceeds 210 N. Find the greatest mass that can hang from B, correct to 3 significant figures.", value: mMax, unit: "kg", wrong: [f3((210 * 1.2) / (2 * g))],
          explanation: t`$210 \times 1.2 = 8g + 2mg \Rightarrow m = \frac{252 - 78.4}{19.6} = ${f3(mMax)}$ kg.` }),
      ],
      explanation: "Moments about the hinge for T; resolve for the hinge components.",
      hints: ["Take moments about A to avoid the unknown hinge force.", "sin α = 1.5/2.5."],
    });
  }

  // ZM2-3 composite solid: cylinder + cone
  {
    const xb = (90 * 5 + 24 * 12) / 114;
    const hang = deg(atan(3 / xb));
    const h = sqrt(48 / 4.5);
    chk((9 * h * (h / 2) + 24 * (h + 2)) / (9 * h + 24), h, 1e-9);
    const mu = 3 / xb;
    b.struct({
      d: 5, ...base(20, "Paper 2"), skill: "ANALYSIS",
      concepts: [Q("com.centre-of-mass")],
      stem: t`A uniform solid consists of a solid cylinder of radius $3$ cm and height $10$ cm, with a solid cone of base radius $3$ cm and height $8$ cm joined to it so that the base of the cone coincides with the top of the cylinder.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show by integration that the centre of mass of a uniform solid cone of height $h$ is $\dfrac{h}{4}$ from its base.`,
          points: ["M1 slices at distance x from the vertex: radius rx/h, volume element π(rx/h)² dx.", "M1 x̄ from vertex = ∫x·x² dx / ∫x² dx over [0, h] = (h⁴/4)/(h³/3).", "A1 x̄ = 3h/4 from the vertex, so h/4 from the base."],
          modelAnswer: t`$$
\bar{x} = \frac{\int_0^h \pi\frac{r^2x^2}{h^2}\,x\,\mathrm{d}x}{\int_0^h \pi\frac{r^2x^2}{h^2}\,\mathrm{d}x} = \frac{h^4/4}{h^3/3} = \frac{3h}{4}
$$
from the vertex, which is $h - \frac{3h}{4} = \frac{h}{4}$ from the base.`,
          explanation: "Volume of revolution with the vertex at the origin." }),
        P.num({ label: "(b)", marks: 5, stem: "Find the distance of the centre of mass of the composite solid from the base of the cylinder, correct to 3 significant figures.", value: xb, unit: "cm", wrong: [f3((90 * 5 + 24 * 16) / 114)],
          explanation: t`Volumes $90\pi$ (centre $5$ cm up) and $24\pi$ (centre $10 + \frac{8}{4} = 12$ cm up): $\bar{y} = \frac{90(5) + 24(12)}{114} = ${f3(xb)}$ cm. (Using $\frac{3h}{4} = 6$ above the join gives 16 cm, the wrong end.)` }),
        P.num({ label: "(c)", marks: 4, stem: "The solid is freely suspended from a point on the circumference of the base of the cylinder. Find the angle between its axis and the vertical, in degrees correct to 1 decimal place.", value: hang, unit: "°", wrong: [f3(90 - hang)],
          explanation: t`$\tan\phi = \frac{3}{${f4(xb)}}$, $\phi = ${hang.toFixed(1)}°$.` }),
        P.num({ label: "(d)", marks: 4, stem: "Find the height h (cm) of a cylinder (same radius, same cone on top) for which the centre of mass would lie exactly at the join, correct to 3 significant figures.", value: h, unit: "cm", wrong: [f3(48 / 4.5)],
          explanation: t`$\frac{9h \cdot \frac{h}{2} + 24(h + 2)}{9h + 24} = h \Rightarrow 4.5h^2 + 24h + 48 = 9h^2 + 24h \Rightarrow h^2 = \frac{48}{4.5}$, $h = ${f3(h)}$ cm.` }),
        P.num({ label: "(e)", marks: 4, stem: "The original solid stands with its base on a rough plane whose inclination is slowly increased. Find the least coefficient of friction for which it topples before it slides, correct to 3 significant figures.", value: mu, wrong: [f3(xb / 3)],
          explanation: t`It topples when $\tan\alpha = \frac{3}{${f4(xb)}}$; it slides when $\tan\alpha = \mu$. Toppling first needs $\mu > \frac{3}{${f4(xb)}} = ${f3(mu)}$.` }),
      ],
      explanation: "Composite centre of mass by moments of volume; toppling when the vertical through G passes the lowest edge.",
      hints: ["Cone centre of mass: h/4 above its base.", "Toppling: tan α = radius / height of G."],
    });
  }

  // ZM2-4 bungee jump (elastic string and energy)
  {
    const L = 25, Dn = 72, M = 80, ext = Dn - L;
    const lam = (M * g * Dn * 2 * L) / (ext * ext);
    chk(M * g * Dn, (lam * ext * ext) / (2 * L), 1e-9);
    const vTaut = sqrt(2 * g * L), eEq = (M * g * L) / lam;
    const vMax = sqrt(2 * g * (L + eEq) - (lam * eEq * eEq) / (L * M));
    const Tlow = (lam * ext) / L, aLow = (Tlow - M * g) / M;
    b.struct({
      d: 5, ...base(20, "Paper 2"), skill: "ANALYSIS",
      concepts: [Q("elasticity.hookes-law-energy")],
      stem: t`A bungee jumper of mass $80$ kg is attached to a light elastic rope of natural length $25$ m, whose other end is fixed to the Victoria Falls bridge. She steps off the bridge from rest and first comes to rest $72$ m below the bridge. Model her as a particle falling vertically, with no air resistance. ${G}`,
      parts: [
        P.num({ label: "(a)", marks: 5, stem: "Find the modulus of elasticity of the rope, correct to 3 significant figures.", value: lam, unit: "N", wrong: [f3((M * g * ext * 2 * L) / (ext * ext))],
          explanation: t`Loss of GPE $= 80g \times 72$; gain of EPE $= \frac{\lambda \times 47^2}{2 \times 25}$. So $\lambda = \frac{80 \times 9.8 \times 72 \times 50}{2209} = ${f3(lam)}$ N. (Using a fall of $47$ m forgets the first $25$ m of free fall.)` }),
        P.num({ label: "(b)", marks: 3, stem: "Find her speed when the rope first becomes taut, correct to 3 significant figures.", value: vTaut, unit: "m/s", wrong: [f3(g * L)],
          explanation: t`Free fall of $25$ m: $v = \sqrt{2 \times 9.8 \times 25} = ${f3(vTaut)}$ m s$^{-1}$.` }),
        P.num({ label: "(c)", marks: 5, stem: "Find her greatest speed, correct to 3 significant figures.", value: vMax, unit: "m/s", wrong: [f3(vTaut)],
          explanation: t`Greatest speed when the acceleration is zero: $\frac{\lambda e}{25} = 80g \Rightarrow e = ${f4(eEq)}$ m. Energy at $${f4(L + eEq)}$ m below the bridge: $\frac{1}{2}(80)v^2 = 80g(${f4(L + eEq)}) - \frac{\lambda(${f4(eEq)})^2}{50}$, so $v = ${f3(vMax)}$ m s$^{-1}$. (She is still speeding up when the rope becomes taut.)` }),
        P.num({ label: "(d)", marks: 4, stem: "Find the magnitude of her acceleration at the lowest point, correct to 3 significant figures.", value: aLow, unit: "m/s²", wrong: [f3(Tlow / M)],
          explanation: t`Tension $\frac{\lambda \times 47}{25} = ${f3(Tlow)}$ N; $80a = ${f3(Tlow)} - 784$, so $a = ${f3(aLow)}$ m s$^{-2}$ upwards.` }),
        P.manual({ label: "(e)", marks: 3, stem: "State three assumptions in this model and how one of them affects the answers.",
          points: ["The rope is light and obeys Hooke's law throughout.", "There is no air resistance, and the jumper is a particle moving vertically.", "With air resistance the jumper would not fall as far: the actual λ needed would be smaller, or the lowest point higher."],
          modelAnswer: "The rope is light and obeys Hooke's law; there is no air resistance; the jumper is a particle moving in a vertical line. Air resistance would remove energy, so she would not fall the full 72 m with this rope.",
          explanation: "Assumptions about the rope, the jumper and resistance." }),
      ],
      explanation: "Energy between the two rest points gives λ; maximum speed occurs where tension = weight.",
      hints: ["At the lowest point she is momentarily at rest: KE = 0.", "Greatest speed where the acceleration is zero."],
    });
  }

  // ZM2-5 vertical circle
  {
    const l = 1.2, m = 0.5, u = 9.2;
    const umin = sqrt(5 * g * l);
    const vTop = sqrt(u * u - 4 * g * l), Ttop = (m * vTop * vTop) / l - m * g, Tbot = (m * u * u) / l + m * g;
    const u2 = 5.8, c = (u2 * u2 - 2 * g * l) / (3 * g * l), hs = l * c, vs = sqrt(g * l * c);
    chk((m * (u2 * u2 - 2 * g * l * (1 + c))) / l - m * g * c, 0, 1e-9);
    b.struct({
      d: 5, ...base(20, "Paper 2"), skill: "ANALYSIS",
      concepts: [Q("circular.motion")],
      stem: t`A particle of mass $0.5$ kg is attached to one end of a light inextensible string of length $1.2$ m, the other end fixed at $O$. The particle hangs at rest and is then given a horizontal speed $u$ m s$^{-1}$, so that it moves in a vertical circle. ${G}`,
      parts: [
        P.proof({ label: "(a)", marks: 4, stem: t`Show that the particle completes the circle only if $u^2 \ge 5gl$, where $l = 1.2$ m, and hence find the least value of $u$.`,
          points: ["M1 energy: v² = u² − 4gl at the top.", "M1 at the top T + mg = mv²/l.", "A1 T ≥ 0 requires v² ≥ gl, so u² ≥ 5gl.", "A1 u ≥ √(5 × 9.8 × 1.2) = 7.67 m/s."],
          modelAnswer: t`$$
v_{\text{top}}^2 = u^2 - 2g(2l), \qquad T + mg = \frac{mv_{\text{top}}^2}{l}
$$
$$
T \ge 0 \iff v_{\text{top}}^2 \ge gl \iff u^2 \ge 5gl
$$
So $u_{\min} = \sqrt{5 \times 9.8 \times 1.2} = ${f3(umin)}$ m s$^{-1}$.`,
          explanation: "The string must stay taut at the top." }),
        P.num({ label: "(b)", marks: 3, stem: "Given u = 9.2, find the speed at the top of the circle, correct to 3 significant figures.", value: vTop, unit: "m/s", wrong: [f3(sqrt(u * u - 2 * g * l))],
          explanation: t`$v^2 = 9.2^2 - 4(9.8)(1.2) = ${f4(vTop * vTop)}$, $v = ${f3(vTop)}$ m s$^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Given u = 9.2, find the tension at the top, correct to 3 significant figures.", value: Ttop, unit: "N", wrong: [f3((m * vTop * vTop) / l + m * g)],
          explanation: t`$T = \frac{0.5v^2}{1.2} - 0.5g = ${f3(Ttop)}$ N.` }),
        P.num({ label: "(d)", marks: 3, stem: "Given u = 9.2, find the tension at the lowest point, just after projection, correct to 3 significant figures.", value: Tbot, unit: "N", wrong: [f3((m * u * u) / l)],
          explanation: t`$T - 0.5g = \frac{0.5 \times 9.2^2}{1.2}$, so $T = ${f3(Tbot)}$ N.` }),
        P.num({ label: "(e)", marks: 5, stem: "Now u = 5.8. Find the height above O at which the string becomes slack, correct to 3 significant figures.", value: hs, unit: "m", wrong: [f3(l + hs)],
          explanation: t`At height $h = l\cos\phi$ above $O$: $v^2 = 5.8^2 - 2g(l + h)$ and $T + mg\cos\phi = \frac{mv^2}{l}$. $T = 0$ gives $33.64 - 2gl - 3gh = 0$, so $h = \frac{33.64 - 23.52}{29.4} = ${f3(hs)}$ m.` }),
        P.num({ label: "(f)", marks: 2, stem: "Find the speed of the particle at that instant, correct to 3 significant figures.", value: vs, unit: "m/s", wrong: [f3(g * hs)],
          explanation: t`$v^2 = gh = 9.8 \times ${f4(hs)}$, so $v = ${f3(vs)}$ m s$^{-1}$.` }),
      ],
      explanation: "Energy conservation for the speed; Newton's second law along the radius for the tension.",
      hints: ["Use energy between the bottom and the point considered.", "The string goes slack when T = 0."],
    });
  }

  // ZM2-6 SHM between two springs
  {
    const lam = 21, l0 = 0.7, m = 0.5, amp = 0.15, xq = 0.075, xd = 0.12;
    const k = (2 * lam) / l0, w2 = k / m;
    chk(w2, 120, 1e-9);
    const w = sqrt(w2), per = (2 * PI) / w, vmax = amp * w, vq = w * sqrt(amp ** 2 - xd ** 2), tt = (2 * PI) / 3 / w, Tmax = (lam * (0.5 + amp)) / l0;
    chk(amp * cos(w * tt), -xq, 1e-9);
    b.struct({
      d: 5, ...base(20, "Paper 2"), skill: "ANALYSIS",
      concepts: [Q("shm.motion"), Q("elasticity.hookes-law-energy")],
      stem: t`Points $A$ and $B$ are $2.4$ m apart on a smooth horizontal table. A particle $P$ of mass $0.5$ kg is attached to $A$ by a light spring of natural length $0.7$ m and modulus $21$ N, and to $B$ by an identical spring. $P$ rests in equilibrium at the midpoint $M$ of $AB$.`,
      parts: [
        P.proof({ label: "(a)", marks: 5, stem: t`$P$ is displaced $x$ m from $M$ towards $B$ (with $|x| < 0.5$). Show that $\ddot{x} = -120x$.`,
          points: ["B1 at M each spring has extension 1.2 − 0.7 = 0.5 m.", "M1 tension in AP = 21(0.5 + x)/0.7, in PB = 21(0.5 − x)/0.7.", "M1 Newton's second law: 0.5ẍ = 21(0.5 − x)/0.7 − 21(0.5 + x)/0.7.", "A1 simplifies to 0.5ẍ = −60x.", "A1 ẍ = −120x."],
          modelAnswer: t`$$
0.5\ddot{x} = \frac{21(0.5 - x)}{0.7} - \frac{21(0.5 + x)}{0.7} = -\frac{42x}{0.7} = -60x
$$
$$
\ddot{x} = -120x
$$
so the motion is simple harmonic about $M$.`,
          explanation: "Both springs stay stretched while |x| < 0.5." }),
        P.num({ label: "(b)", marks: 2, stem: "Find the period of the motion, correct to 3 significant figures.", value: per, unit: "s", wrong: [f3((2 * PI) / 120)],
          explanation: t`$\omega = \sqrt{120}$, period $\frac{2\pi}{\sqrt{120}} = ${f3(per)}$ s.` }),
        P.num({ label: "(c)", marks: 3, stem: "P is released from rest 0.15 m from M. Find its greatest speed, correct to 3 significant figures.", value: vmax, unit: "m/s", wrong: [f3(amp * 120)],
          explanation: t`$a\omega = 0.15\sqrt{120} = ${f3(vmax)}$ m s$^{-1}$, at $M$.` }),
        P.num({ label: "(d)", marks: 3, stem: "Find the speed of P when it is 0.12 m from M, correct to 3 significant figures.", value: vq, unit: "m/s", wrong: [f3(w * sqrt(amp - xd))],
          explanation: t`$v = \sqrt{120}\sqrt{0.0225 - 0.0144} = ${f3(vq)}$ m s$^{-1}$.` }),
        P.num({ label: "(e)", marks: 4, stem: "Find the time after release when P is first 0.075 m from M on the other side of M, correct to 3 significant figures.", value: tt, unit: "s", wrong: [f3(PI / 3 / w)],
          explanation: t`$x = 0.15\cos\omega t = -0.075 \Rightarrow \omega t = \frac{2\pi}{3}$, $t = \frac{2\pi/3}{\sqrt{120}} = ${f3(tt)}$ s. ($\frac{\pi}{3}$ gives the time to $0.075$ m on the SAME side.)` }),
        P.num({ label: "(f)", marks: 3, stem: "Find the greatest tension in either spring during the motion.", value: Tmax, unit: "N", wrong: [15],
          explanation: t`Greatest extension $0.5 + 0.15 = 0.65$ m: $T = \frac{21 \times 0.65}{0.7} = ${f3(Tmax)}$ N. ($15$ N is the tension at $M$.)` }),
      ],
      explanation: "Net force from both springs is −60x, giving SHM with ω² = 120.",
      hints: ["Each spring's extension changes by x in opposite directions.", "Released from rest at an end: x = a cos ωt."],
    });
  }
});

function rootsQ(a, b2, c) {
  const d = b2 * b2 - 4 * a * c;
  return [(-b2 - sqrt(d)) / (2 * a), (-b2 + sqrt(d)) / (2 * a)];
}
