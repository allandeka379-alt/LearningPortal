// W4a exam-format items: ZIMSEC Paper 2 Section A (10 marks, mechanics), Section B (12 marks, mechanics) and
// Section C (12 marks, averages and dispersion of grouped data). Every value is computed and checked.
import { concept, P, t, chk, same, rad, deg, resultant, grouped, cv, quad, table, ZIM } from "../lib.mjs";

const Q = (k) => `amath.${k}`;
const N = (id, x, wrong, extra = {}) => ({ id, input: "number", accepted: [x], wrong, ...extra });
const { sin, cos, tan, sqrt } = Math;
const g = 9.8;
const paras = (...l) => l.join("\n\n");
const A = { examStyle: true, paper: "Paper 2", skill: "APPLICATION" };

concept(Q("mechanics.kinematics-graphs"), { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  // ===================================================================================================================
  // Section A (10 marks)

  // A1: three-stage journey, unknown time
  {
    const T = (280 - 16 - 24) / 8;
    chk(T, 30);
    b.struct({
      ...A, d: 3, marks: 10, secs: 900, calculator: false,
      concepts: [Q("mechanics.kinematics-graphs"), Q("mechanics.constant-acceleration")],
      stem: t`A cyclist starts from rest and accelerates uniformly to 8 m s$^{-1}$ in 4 s. She then rides at 8 m s$^{-1}$ for $T$ seconds, and finally decelerates uniformly, coming to rest 6 s later. She travels 280 m altogether.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find her acceleration in the first stage.", value: 2, unit: "m/s²", wrong: [32],
          explanation: t`$\frac{8}{4} = 2$ m s$^{-2}$.` }),
        P.proof({ label: "(b)", marks: 2, stem: t`Show that the total distance travelled is $(8T + 40)$ metres.`,
          points: [t`M1 area of the velocity–time graph in three parts (or as a trapezium): $\frac{1}{2}(4)(8) + 8T + \frac{1}{2}(6)(8)$.`, t`A1 simplifies to $8T + 40$.`],
          modelAnswer: t`$$
\text{distance} = \tfrac{1}{2}(4)(8) + 8T + \tfrac{1}{2}(6)(8) = 16 + 8T + 24 = 8T + 40
$$`,
          explanation: "Distance = area under the velocity–time graph." }),
        P.num({ label: "(c)", marks: 2, stem: t`Hence find $T$.`, value: T, unit: "s", wrong: [35],
          explanation: t`$8T + 40 = 280$ gives $T = 30$ s.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find her average speed for the whole journey.", value: 280 / 40, unit: "m/s", wrong: [4, 280 / 30],
          explanation: t`Total time $= 4 + 30 + 6 = 40$ s; average speed $= \frac{280}{40} = 7$ m s$^{-1}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe the velocity–time graph of the journey, giving the coordinates of each point where the graph changes direction.",
          points: [t`A straight line from $(0, 0)$ to $(4, 8)$.`, t`A horizontal line from $(4, 8)$ to $(34, 8)$.`, t`A straight line down from $(34, 8)$ to $(40, 0)$, less steep than the first stage.`],
          modelAnswer: t`Time (s) across, velocity (m s$^{-1}$) up: a trapezium. The graph rises in a straight line from $(0, 0)$ to $(4, 8)$, stays level at 8 until $(34, 8)$, then falls in a straight line to $(40, 0)$.`,
          explanation: "Each stage of constant acceleration is a straight line." }),
      ],
      explanation: "The area under the velocity–time graph is the distance; write it in terms of T and solve.",
      hints: ["Sketch the velocity–time graph first.", "Average speed = total distance ÷ total time."],
    });
  }

  // A2: vertical motion from the top of a building
  {
    same(quad.roots(1, -2, -8), [-2, 4]);
    const vImp = 9.8 - 9.8 * 4;
    chk(vImp, -29.4, 1e-9);
    b.struct({
      ...A, d: 3, marks: 10, secs: 900, calculator: false,
      concepts: [Q("mechanics.constant-acceleration")],
      stem: t`A stone is thrown vertically upwards at 9.8 m s$^{-1}$ from the edge of a flat roof 39.2 m above the ground. It misses the roof on the way down and falls to the ground. Take $g = 9.8$ m s$^{-2}$ and ignore air resistance.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the time taken to reach the highest point.", value: 1, unit: "s", wrong: [2],
          explanation: t`$0 = 9.8 - 9.8t$ gives $t = 1$ s.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the greatest height of the stone above the ground.", value: 4.9 + 39.2, unit: "m", wrong: [4.9],
          explanation: t`Rise $= \frac{9.8^2}{2(9.8)} = 4.9$ m, so $39.2 + 4.9 = 44.1$ m above the ground.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the time at which the stone passes the edge of the roof on its way down.", value: 2, unit: "s", wrong: [1],
          explanation: t`$s = 0$: $9.8t - 4.9t^2 = 0$ gives $t = 2$ s.` }),
        P.proof({ label: "(d)", marks: 2, stem: t`Show that the time $t$ seconds at which the stone hits the ground satisfies $t^2 - 2t - 8 = 0$.`,
          points: [t`M1 uses $s = ut + \frac{1}{2}at^2$ with $s = -39.2$, $u = 9.8$, $a = -9.8$ (upwards positive).`, t`A1 divides by $-4.9$ to reach $t^2 - 2t - 8 = 0$.`],
          modelAnswer: t`$$
-39.2 = 9.8t - 4.9t^2
$$

$$
4.9t^2 - 9.8t - 39.2 = 0 \quad\Rightarrow\quad t^2 - 2t - 8 = 0
$$`,
          explanation: "The ground is 39.2 m below the point of projection." }),
        P.num({ label: "(e)", marks: 1, stem: "Hence find the time at which the stone hits the ground.", value: 4, unit: "s", wrong: [-2, 2],
          explanation: t`$(t - 4)(t + 2) = 0$; $t = 4$ s ($t = -2$ is rejected).` }),
        P.num({ label: "(f)", marks: 2, stem: "Find the speed with which the stone hits the ground.", value: -vImp, unit: "m/s", wrong: [9.8, 39.2],
          explanation: t`$v = 9.8 - 9.8(4) = -29.4$, so the speed is 29.4 m s$^{-1}$ (downwards).` }),
      ],
      explanation: "Take upwards as positive with a = −9.8 throughout; the ground is at s = −39.2.",
      hints: ["At the highest point v = 0.", "Below the point of projection, s is negative."],
    });
  }

  // A3: resultant and equilibrium
  {
    const r = resultant([[6, 0], [10, 120]]);
    chk(r.mag, sqrt(76), 1e-9);
    b.struct({
      ...A, d: 4, marks: 10, secs: 900, calculator: true,
      concepts: [Q("mechanics.forces-resultants"), Q("mechanics.equilibrium")],
      stem: t`Two forces act on a particle at $O$: a force of 6 N in the direction of the positive $x$-axis, and a force of 10 N in the direction making $120^\circ$ anticlockwise with the positive $x$-axis.`,
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: t`Find the $x$- and $y$-components of the 10 N force, giving the $y$-component correct to 3 significant figures.`, template: "x-component = {{blank:x}} N, y-component = {{blank:y}} N",
          blanks: [N("x", -5, "5"), N("y", Number((10 * sin(rad(120))).toFixed(4)), "5", { tolerance: 0.005 })],
          explanation: t`$10\cos 120^\circ = -5$ and $10\sin 120^\circ = 5\sqrt{3} = 8.66$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the magnitude of the resultant of the two forces, correct to 3 significant figures.", value: r.mag, unit: "N", wrong: [16, sqrt(196)],
          explanation: t`$X = 6 - 5 = 1$, $Y = 5\sqrt{3}$: $R = \sqrt{1 + 75} = \sqrt{76} = 8.72$ N.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the angle the resultant makes with the positive $x$-axis, correct to 1 decimal place.`, value: r.angle, unit: "°", wrong: [90 - r.angle],
          explanation: t`$\tan^{-1}\frac{8.660}{1} = 83.4^\circ$.` }),
        P.fib({ label: "(d)", marks: 2, stem: t`A third force $F$ is added so that the particle is in equilibrium. Find the magnitude of $F$ (3 significant figures) and its direction measured anticlockwise from the positive $x$-axis (1 decimal place).`, template: "magnitude = {{blank:m}} N, direction = {{blank:d}}°",
          blanks: [N("m", Number(r.mag.toFixed(4)), "16", { tolerance: 0.005 }), N("d", Number((r.angle + 180).toFixed(4)), "83.4", { tolerance: 0.05 })],
          explanation: t`$F$ is equal and opposite to the resultant: 8.72 N at $83.4^\circ + 180^\circ = 263.4^\circ$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State the condition for a particle to be in equilibrium and explain how it gives your answer to (d).",
          points: ["The vector sum (resultant) of all the forces must be zero.", "So F must have the same magnitude as the resultant of the other two forces and act in the opposite direction."],
          modelAnswer: "A particle is in equilibrium when the resultant force on it is zero. The two given forces have a resultant of 8.72 N at 83.4°, so the third force must cancel it exactly: 8.72 N in the opposite direction, at 263.4°.",
          explanation: "Equilibrium: resultant force zero." }),
      ],
      explanation: "Resolve each force, add the components, recombine; the equilibrant is equal and opposite to the resultant.",
      hints: [t`$\cos 120^\circ = -\frac{1}{2}$, $\sin 120^\circ = \frac{\sqrt{3}}{2}$.`, "The equilibrant points the opposite way to the resultant."],
    });
  }

  // A4: limiting friction with an angled rope, then motion
  {
    const W = 6 * g;
    const P0 = (0.4 * W) / (cos(rad(30)) + 0.4 * sin(rad(30)));
    chk(P0 * cos(rad(30)), 0.4 * (W - P0 * sin(rad(30))), 1e-9);
    const R1 = W - 30 * sin(rad(30));
    const a1 = (30 * cos(rad(30)) - 0.4 * R1) / 6;
    b.struct({
      ...A, d: 4, marks: 10, secs: 900, calculator: true,
      concepts: [Q("mechanics.friction"), Q("mechanics.newtons-laws-planes")],
      stem: t`A box of mass 6 kg rests on a rough horizontal floor; the coefficient of friction is 0.4. A light rope attached to the box is pulled with tension $P$ N at $30^\circ$ above the horizontal. Take $g = 9.8$ m s$^{-2}$.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that the normal reaction is $R = 58.8 - 0.5P$.`,
          points: [t`M1 resolves vertically with the component $P\sin 30^\circ$ upwards: $R + P\sin 30^\circ = 6g$.`, t`A1 obtains $R = 58.8 - 0.5P$.`],
          modelAnswer: t`$$
R + P\sin 30^\circ = 6(9.8) \quad\Rightarrow\quad R = 58.8 - 0.5P
$$`,
          explanation: "The rope lifts the box slightly." }),
        P.num({ label: "(b)", marks: 3, stem: t`The box is on the point of moving. Find $P$, correct to 3 significant figures.`, value: P0, unit: "N", wrong: [0.4 * W / cos(rad(30)), 0.4 * W],
          explanation: t`Limiting: $P\cos 30^\circ = 0.4(58.8 - 0.5P)$, so $P(0.8660 + 0.2) = 23.52$ and $P = 22.1$ N.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Now $P = 30$. Find the normal reaction.`, value: R1, unit: "N", wrong: [W],
          explanation: t`$R = 58.8 - 15 = 43.8$ N.` }),
        P.num({ label: "(d)", marks: 3, stem: t`With $P = 30$, find the acceleration of the box, correct to 3 significant figures.`, value: a1, unit: "m/s²", wrong: [(30 * cos(rad(30)) - 0.4 * W) / 6, 30 / 6],
          explanation: t`Sliding: $F = 0.4 \times 43.8 = 17.52$ N. N2L: $30\cos 30^\circ - 17.52 = 6a$, so $25.98 - 17.52 = 6a$ and $a = 1.41$ m s$^{-2}$.` }),
        P.manual({ label: "(e)", marks: 1, stem: t`Explain why the frictional force in (d) is $\mu R$.`,
          points: ["The box is sliding, so friction takes its limiting value μR (opposing the motion)."],
          modelAnswer: "Since 30 N is more than the 22.1 N needed to start motion, the box slides, and while sliding the friction is at its maximum value μR, acting against the motion.",
          explanation: "F = μR in limiting equilibrium and while sliding." }),
      ],
      explanation: "Resolve vertically for R (the rope's upward component reduces it), use F = μR in limiting equilibrium and while sliding, and apply N2L horizontally.",
      hints: ["The rope's vertical component reduces R.", "Horizontally: P cos 30° − μR = ma."],
    });
  }

  // A5: power, maximum speed and energy
  {
    const vmax = 30000 / 750;
    chk(vmax, 40);
    const a = (30000 / 15 - 750) / 1200;
    b.struct({
      ...A, d: 3, marks: 10, secs: 900, calculator: true,
      concepts: [Q("mechanics.power"), Q("mechanics.work-energy")],
      stem: "A car of mass 1200 kg moves along a straight level road. Its engine works at a constant 30 kW and the resistance to motion is a constant 750 N.",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the maximum speed of the car.", value: vmax, unit: "m/s", wrong: [0.04],
          explanation: t`At maximum speed the driving force equals 750 N: $v = \frac{30\,000}{750} = 40$ m s$^{-1}$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the acceleration of the car when its speed is 15 m/s, correct to 3 significant figures.", value: a, unit: "m/s²", wrong: [30000 / 15 / 1200],
          explanation: t`$F = \frac{30\,000}{15} = 2000$ N; $2000 - 750 = 1200a$, so $a = 1.04$ m s$^{-2}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the work done by the engine in 20 s.", value: 30000 * 20, unit: "J", wrong: [30 * 20],
          explanation: t`$W = Pt = 30\,000 \times 20 = 600\,000$ J (600 kJ).` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the kinetic energy of the car at its maximum speed.", value: 0.5 * 1200 * vmax ** 2, unit: "J", wrong: [1200 * vmax ** 2],
          explanation: t`$\frac{1}{2}(1200)(40^2) = 960\,000$ J.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the car's acceleration decreases as its speed increases.",
          points: [t`At constant power the driving force is $\frac{P}{v}$, which falls as $v$ rises.`, "The resistance stays the same, so the resultant force and hence the acceleration fall (to zero at 40 m/s)."],
          modelAnswer: "The driving force is P/v. As the speed increases this force gets smaller while the resistance stays at 750 N, so the resultant force, and therefore the acceleration, decreases until it is zero at the maximum speed of 40 m/s.",
          explanation: "Combine P = Fv with F = ma." }),
      ],
      explanation: "Use F = P/v for the driving force, N2L for the acceleration, W = Pt for the work and ½mv² for kinetic energy.",
      hints: ["Convert 30 kW to 30 000 W.", "At maximum speed the acceleration is zero."],
    });
  }

  // ===================================================================================================================
  // Section B (12 marks)

  // B1: train between stations
  {
    const V = 90 / 6;
    chk(2 * V + 90 + 4 * V, 180);
    const dist = 0.5 * 30 * V + 90 * V + 0.5 * 60 * V;
    chk(dist, 2025);
    b.struct({
      ...A, d: 4, marks: 12, secs: 1080, calculator: false,
      concepts: [Q("mechanics.kinematics-graphs"), Q("mechanics.constant-acceleration")],
      stem: t`A train starts from rest at station $A$ and accelerates uniformly at 0.5 m s$^{-2}$ until it reaches a speed of $V$ m s$^{-1}$. It travels at this speed for 90 s and then decelerates uniformly at 0.25 m s$^{-2}$, coming to rest at station $B$. The whole journey takes 180 s.`,
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $6V + 90 = 180$.`,
          points: [t`M1 times of the stages: $\frac{V}{0.5} = 2V$ and $\frac{V}{0.25} = 4V$.`, t`A1 $2V + 90 + 4V = 180$, i.e. $6V + 90 = 180$.`],
          modelAnswer: t`Accelerating takes $\frac{V}{0.5} = 2V$ s and decelerating takes $\frac{V}{0.25} = 4V$ s, so

$$
2V + 90 + 4V = 180 \quad\Rightarrow\quad 6V + 90 = 180
$$`,
          explanation: "Time = change in speed ÷ acceleration." }),
        P.num({ label: "(b)", marks: 2, stem: t`Hence find $V$.`, value: V, unit: "m/s", wrong: [45, 30],
          explanation: t`$6V = 90$, so $V = 15$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Find the distance between $A$ and $B$.`, value: dist, unit: "m", wrong: [180 * V, 90 * V],
          explanation: t`Stage times 30 s, 90 s, 60 s. Area $= \frac{1}{2}(180 + 90)(15) = 2025$ m.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find the average speed of the train for the journey.", value: dist / 180, dp: 2, unit: "m/s", wrong: [7.5],
          explanation: t`$\frac{2025}{180} = 11.25$ m s$^{-1}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe the velocity–time graph of the journey, giving the coordinates of its corners.",
          points: [t`Straight line from $(0, 0)$ to $(30, 15)$.`, t`Horizontal line from $(30, 15)$ to $(120, 15)$.`, t`Straight line from $(120, 15)$ to $(180, 0)$, half as steep as the first stage.`],
          modelAnswer: t`A trapezium on axes of time (s) and velocity (m s$^{-1}$): up from $(0, 0)$ to $(30, 15)$, level to $(120, 15)$, then down to $(180, 0)$ with gradient $-0.25$.`,
          explanation: "Corners at the ends of the three stages." }),
      ],
      explanation: "Express the stage times in terms of V, solve, then use the trapezium area for the distance.",
      hints: ["Time to reach V at 0.5 m/s² is V ÷ 0.5.", "Distance = area under the velocity–time graph."],
    });
  }

  // B2: overtaking
  {
    same(quad.roots(1, -10, 9), [1, 9]);
    const tc = 9;
    chk(10 * tc, 2.5 * (tc - 3) ** 2, 1e-9);
    const te = 3 + 10 / 5;
    const gap = 10 * te - 2.5 * (te - 3) ** 2;
    chk(gap, 40);
    b.struct({
      ...A, d: 5, marks: 12, secs: 1080, calculator: false, skill: "ANALYSIS",
      concepts: [Q("mechanics.constant-acceleration")],
      stem: t`A kombi passes a point $O$ on a straight road at a constant speed of 10 m s$^{-1}$. Three seconds later a motorcycle starts from rest at $O$ and accelerates uniformly at 5 m s$^{-2}$ in the same direction. Let $t$ seconds be the time since the kombi passed $O$.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Show that the motorcycle catches up with the kombi when $t^2 - 10t + 9 = 0$.`,
          points: [t`M1 kombi: $s = 10t$.`, t`M1 motorcycle: $s = \frac{1}{2}(5)(t - 3)^2$.`, t`A1 equates and simplifies: $(t - 3)^2 = 4t$, so $t^2 - 10t + 9 = 0$.`],
          modelAnswer: t`$$
10t = \tfrac{5}{2}(t - 3)^2
$$

$$
4t = t^2 - 6t + 9 \quad\Rightarrow\quad t^2 - 10t + 9 = 0
$$`,
          explanation: "The motorcycle has been moving for (t − 3) seconds." }),
        P.num({ label: "(b)", marks: 1, stem: "Find the time at which the motorcycle catches the kombi.", value: tc, unit: "s", wrong: [1],
          explanation: t`$(t - 1)(t - 9) = 0$; $t = 9$ s.` }),
        P.manual({ label: "(c)", marks: 1, stem: t`Explain why the root $t = 1$ is rejected.`,
          points: [t`At $t = 1$ the motorcycle has not yet started (it starts at $t = 3$); the equation for its displacement only holds for $t \geq 3$.`],
          modelAnswer: t`The motorcycle starts at $t = 3$, so its displacement formula is valid only for $t \geq 3$; $t = 1$ is not a real meeting time.`,
          explanation: "Check roots against the situation." }),
        P.num({ label: "(d)", marks: 1, stem: t`How far from $O$ does this happen?`, value: 10 * tc, unit: "m", wrong: [9],
          explanation: t`$10 \times 9 = 90$ m.` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the speed of the motorcycle at that moment.", value: 5 * (tc - 3), unit: "m/s", wrong: [45],
          explanation: t`It has been accelerating for 6 s: $v = 5 \times 6 = 30$ m s$^{-1}$.` }),
        P.num({ label: "(f)", marks: 2, stem: "Find the value of t at which the two vehicles have the same speed.", value: te, unit: "s", wrong: [2],
          explanation: t`$5(t - 3) = 10$ gives $t = 5$.` }),
        P.num({ label: "(g)", marks: 3, stem: "Find the greatest distance between the two vehicles before the motorcycle catches up.", value: gap, unit: "m", wrong: [30, 50],
          explanation: t`The gap grows while the kombi is faster, so it is greatest at $t = 5$: $10(5) - 2.5(2)^2 = 50 - 10 = 40$ m.` }),
      ],
      explanation: "Write both displacements from O in terms of the same t (the motorcycle moves for t − 3 s); equate for the meeting, and maximise the gap where the speeds are equal.",
      hints: ["The motorcycle's time of motion is t − 3.", "The gap is greatest when the speeds are equal."],
    });
  }

  // B3: resultant of four forces
  {
    const F = [[5, 0], [8, 60], [6, 150], [4, 270]];
    const r = resultant(F);
    b.struct({
      ...A, d: 4, marks: 12, secs: 1080, calculator: true,
      concepts: [Q("mechanics.forces-resultants"), Q("mechanics.equilibrium")],
      stem: t`Four horizontal forces act on a particle. Their magnitudes are 5 N, 8 N, 6 N and 4 N, and their directions make angles of $0^\circ$, $60^\circ$, $150^\circ$ and $270^\circ$ respectively with the positive $x$-axis, measured anticlockwise.`,
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: t`Find the sum $X$ of the $x$-components and the sum $Y$ of the $y$-components, correct to 3 significant figures.`, template: "X = {{blank:x}} N, Y = {{blank:y}} N",
          blanks: [N("x", Number(r.x.toFixed(4)), "19", { tolerance: 0.005, marks: 2 }), N("y", Number(r.y.toFixed(4)), "13", { tolerance: 0.005, marks: 2 })],
          explanation: t`$X = 5 + 8\cos 60^\circ + 6\cos 150^\circ + 0 = 5 + 4 - 5.196 = 3.80$. $Y = 0 + 8\sin 60^\circ + 6\sin 150^\circ - 4 = 6.928 + 3 - 4 = 5.93$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the magnitude of the resultant force, correct to 3 significant figures.", value: r.mag, unit: "N", wrong: [23],
          explanation: t`$R = \sqrt{3.804^2 + 5.928^2} = 7.04$ N.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the angle the resultant makes with the positive $x$-axis, correct to 1 decimal place.`, value: r.angle, unit: "°", wrong: [90 - r.angle],
          explanation: t`$\tan^{-1}\frac{5.928}{3.804} = 57.3^\circ$ (both components positive: first quadrant).` }),
        P.fib({ label: "(d)", marks: 2, stem: t`A fifth force $(p\mathbf{i} + q\mathbf{j})$ N is added so that the particle is in equilibrium. Find $p$ and $q$, correct to 3 significant figures.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [N("p", Number((-r.x).toFixed(4)), "3.80", { tolerance: 0.005 }), N("q", Number((-r.y).toFixed(4)), "5.93", { tolerance: 0.005 })],
          explanation: t`The fifth force cancels the resultant: $p = -3.80$, $q = -5.93$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State the magnitude and direction of this fifth force.",
          points: ["Magnitude 7.04 N (the same as the resultant).", "Direction 237.3° anticlockwise from the positive x-axis (opposite to the resultant)."],
          modelAnswer: "The fifth force has magnitude 7.04 N and acts at 57.3° + 180° = 237.3° to the positive x-axis, directly opposite to the resultant.",
          explanation: "The equilibrant is equal and opposite to the resultant." }),
      ],
      explanation: "Tabulate the components with signs from cosine and sine, add, recombine; the equilibrant is the negative of the resultant.",
      hints: [t`$\cos 270^\circ = 0$, $\sin 270^\circ = -1$.`, "Keep 4 significant figures until the end."],
    });
  }

  // B4: particle on two perpendicular strings, then a horizontal force
  {
    const W = 6 * g;
    const T1 = W * sin(rad(40));
    const T2 = W * cos(rad(40));
    chk(T1 * cos(rad(40)), T2 * cos(rad(50)), 1e-9);
    chk(T1 * sin(rad(40)) + T2 * sin(rad(50)), W, 1e-9);
    const Ph = W / tan(rad(50));
    const Th = W / sin(rad(50));
    b.struct({
      ...A, d: 4, marks: 12, secs: 1080, calculator: true,
      concepts: [Q("mechanics.equilibrium"), Q("mechanics.forces-resultants")],
      stem: t`A particle of mass 6 kg hangs in equilibrium from two light inextensible strings. String $AC$ makes an angle of $40^\circ$ with the horizontal and string $BC$ makes an angle of $50^\circ$ with the horizontal, on the other side of the particle $C$. Take $g = 9.8$ m s$^{-2}$.`,
      parts: [
        P.proof({ label: "(a)", marks: 3, stem: t`Writing $T_1$ and $T_2$ for the tensions in $AC$ and $BC$, show that $T_1\cos 40^\circ = T_2\cos 50^\circ$ and $T_1\sin 40^\circ + T_2\sin 50^\circ = 58.8$.`,
          points: ["M1 resolves horizontally: the horizontal components of the tensions are equal and opposite.", "M1 resolves vertically: the vertical components balance the weight.", "A1 weight 6 × 9.8 = 58.8 N used correctly in both equations."],
          modelAnswer: t`Horizontally: $T_1\cos 40^\circ = T_2\cos 50^\circ$.

Vertically: $T_1\sin 40^\circ + T_2\sin 50^\circ = 6 \times 9.8 = 58.8$.`,
          explanation: "Equilibrium: resolve in two perpendicular directions." }),
        P.num({ label: "(b)", marks: 2, stem: t`Find $T_1$, correct to 3 significant figures.`, value: T1, unit: "N", wrong: [T2, W / 2],
          explanation: t`From the first equation $T_2 = T_1\frac{\cos 40^\circ}{\cos 50^\circ}$. Substituting, $T_1 = 37.8$ N (equivalently $T_1 = 58.8\sin 40^\circ$, since the strings are perpendicular).` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find $T_2$, correct to 3 significant figures.`, value: T2, unit: "N", wrong: [T1],
          explanation: t`$T_2 = 58.8\cos 40^\circ = 45.0$ N.` }),
        P.num({ label: "(d)", marks: 2, stem: t`String $AC$ is removed and the particle is held in equilibrium by a horizontal force $P$ N, with $BC$ still at $50^\circ$ to the horizontal. Find $P$, correct to 3 significant figures.`, value: Ph, unit: "N", wrong: [W * tan(rad(50))],
          explanation: t`Vertically $T\sin 50^\circ = 58.8$; horizontally $P = T\cos 50^\circ$. So $P = \frac{58.8}{\tan 50^\circ} = 49.3$ N.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Find the new tension in $BC$, correct to 3 significant figures.`, value: Th, unit: "N", wrong: [T2, W * sin(rad(50))],
          explanation: t`$T = \frac{58.8}{\sin 50^\circ} = 76.8$ N.` }),
        P.manual({ label: "(f)", marks: 1, stem: t`Show that your answers to (b) and (c) satisfy $T_1^2 + T_2^2 = 58.8^2$, and explain why.`,
          points: [t`The strings are perpendicular ($40^\circ + 50^\circ = 90^\circ$), so the triangle of forces is right-angled with the weight as hypotenuse: $37.8^2 + 45.0^2 \approx 58.8^2$.`],
          modelAnswer: t`$40^\circ + 50^\circ = 90^\circ$, so the strings meet at a right angle and the triangle of forces is right-angled with hypotenuse 58.8 N. Hence $T_1^2 + T_2^2 = 58.8^2$; numerically $1428.5 + 2028.9 = 3457.4 \approx 58.8^2$.`,
          explanation: "Pythagoras in the triangle of forces." }),
      ],
      explanation: "Resolve horizontally and vertically and solve the pair of equations; with one string replaced by a horizontal force, resolve again.",
      hints: [t`Substitute $T_2 = T_1\frac{\cos 40^\circ}{\cos 50^\circ}$ into the vertical equation.`, "The two strings are at right angles."],
    });
  }

  // B5: rough inclined plane: range of holding force, then sliding
  {
    const W = 8 * g;
    const R = W * cos(rad(30));
    const Ws = W * sin(rad(30));
    const F = 0.3 * R;
    const a = g * (sin(rad(30)) - 0.3 * cos(rad(30)));
    b.struct({
      ...A, d: 4, marks: 12, secs: 1080, calculator: true,
      concepts: [Q("mechanics.friction"), Q("mechanics.newtons-laws-planes")],
      stem: t`A parcel of mass 8 kg is on a rough plane inclined at $30^\circ$ to the horizontal; the coefficient of friction is 0.3. A force of $P$ N acts on the parcel up a line of greatest slope. Take $g = 9.8$ m s$^{-2}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the normal reaction, correct to 3 significant figures.", value: R, unit: "N", wrong: [W],
          explanation: t`$R = 78.4\cos 30^\circ = 67.9$ N.` }),
        P.num({ label: "(b)", marks: 3, stem: t`Find the least value of $P$ that prevents the parcel sliding down the plane, correct to 3 significant figures.`, value: Ws - F, unit: "N", wrong: [Ws + F, Ws],
          explanation: t`About to slide down, friction up the plane: $P = 78.4\sin 30^\circ - 0.3(67.90) = 39.2 - 20.37 = 18.8$ N.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Find the value of $P$ for which the parcel is about to move up the plane, correct to 3 significant figures.`, value: Ws + F, unit: "N", wrong: [Ws - F],
          explanation: t`Friction down the plane: $P = 39.2 + 20.37 = 59.6$ N.` }),
        P.manual({ label: "(d)", marks: 1, stem: t`State the set of values of $P$ for which the parcel remains at rest.`,
          points: [t`$18.8 \leq P \leq 59.6$.`],
          modelAnswer: t`$18.8 \leq P \leq 59.6$ (newtons).`,
          explanation: "Between the two limiting cases." }),
        P.num({ label: "(e)", marks: 3, stem: t`The force $P$ is removed and the parcel slides down the plane from rest. Find its acceleration, correct to 3 significant figures.`, value: a, unit: "m/s²", wrong: [g * sin(rad(30)), g * (sin(rad(30)) + 0.3 * cos(rad(30)))],
          explanation: t`$8a = 39.2 - 20.37$, so $a = 2.35$ m s$^{-2}$.` }),
        P.num({ label: "(f)", marks: 2, stem: "Find its speed after it has slid 3 m, correct to 3 significant figures.", value: sqrt(2 * a * 3), unit: "m/s", wrong: [sqrt(a * 3)],
          explanation: t`$v^2 = 2(2.354)(3) = 14.12$, so $v = 3.76$ m s$^{-1}$.` }),
      ],
      explanation: "Friction opposes the motion that is about to happen: up the plane when the parcel would slide down, down the plane when it would move up. While sliding, F = μR.",
      hints: ["Find R first.", "About to slide down: friction acts up the plane."],
    });
  }

  // B6: crane lifting a crate in three stages
  {
    const m = 500;
    const T1 = m * (g + 0.6);
    const T2 = m * g;
    const dec = 3 / 4;
    const T3 = m * (g - dec);
    const h = 0.5 * 0.6 * 25 + 3 * 10 + 0.5 * 3 * 4;
    chk(h, 43.5);
    b.struct({
      ...A, d: 4, marks: 12, secs: 1080, calculator: false,
      concepts: [Q("mechanics.newtons-laws"), Q("mechanics.constant-acceleration")],
      stem: t`A crane lifts a crate of mass 500 kg vertically from rest by a cable. The crate accelerates uniformly at 0.6 m s$^{-2}$ for 5 s, moves at constant speed for 10 s, then decelerates uniformly and comes to rest after a further 4 s. Take $g = 9.8$ m s$^{-2}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the tension in the cable during the first stage.", value: T1, unit: "N", wrong: [m * 0.6, m * (g - 0.6)],
          explanation: t`$T - 500(9.8) = 500(0.6)$, so $T = 500(10.4) = 5200$ N.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the tension during the second stage.", value: T2, unit: "N", wrong: [0],
          explanation: t`Constant speed: $T = mg = 4900$ N.` }),
        P.fib({ label: "(c)", marks: 3, stem: "Find the deceleration in the third stage and the tension in the cable during it.", template: "deceleration = {{blank:d}} m/s², tension = {{blank:t}} N",
          blanks: [N("d", dec, "0.6", { marks: 1 }), N("t", T3, "5275", { marks: 2 })],
          explanation: t`Top speed $= 0.6 \times 5 = 3$ m s$^{-1}$, so the deceleration is $\frac{3}{4} = 0.75$ m s$^{-2}$. $500(9.8) - T = 500(0.75)$, so $T = 4525$ N.` }),
        P.num({ label: "(d)", marks: 3, stem: "Find the total height through which the crate is lifted.", value: h, unit: "m", wrong: [37.5, 30],
          explanation: t`$\frac{1}{2}(0.6)(5^2) + 3(10) + \frac{1}{2}(3)(4) = 7.5 + 30 + 6 = 43.5$ m.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Explain why the tension is least in the third stage.",
          points: ["The acceleration is downwards (the crate slows while moving up), so the resultant force is downwards and T < mg."],
          modelAnswer: "In the third stage the crate slows down while rising, so its acceleration is downwards. The resultant force must then be downwards, so the tension is less than the weight; in the other stages T ≥ mg.",
          explanation: "Direction of acceleration decides whether T is above or below mg." }),
        P.num({ label: "(f)", marks: 2, stem: "Find the average speed of the crate for the whole lift, correct to 3 significant figures.", value: h / 19, unit: "m/s", wrong: [3, 1.5],
          explanation: t`$\frac{43.5}{19} = 2.29$ m s$^{-1}$.` }),
      ],
      explanation: "Apply N2L in each stage with the acceleration's direction as positive; the equations of motion (or the velocity–time graph) give the height.",
      hints: ["Top speed = 0.6 × 5.", "In the last stage the acceleration points downwards."],
    });
  }

  // B7: block pulled up a rough slope by an angled rope; rope breaks
  {
    const m = 10;
    const al = 18;
    const mu = 0.3;
    const T = 85;
    const ph = 12;
    const R = m * g * cos(rad(al)) - T * sin(rad(ph));
    const F = mu * R;
    const a = (T * cos(rad(ph)) - m * g * sin(rad(al)) - F) / m;
    const v = 3 * a;
    const s = 0.5 * a * 9;
    const dec = g * (sin(rad(al)) + mu * cos(rad(al)));
    b.struct({
      ...A, d: 5, marks: 12, secs: 1080, calculator: true, skill: "ANALYSIS",
      concepts: [Q("mechanics.newtons-laws-planes"), Q("mechanics.friction")],
      stem: t`A block of mass 10 kg is pulled up a rough slope inclined at $18^\circ$ to the horizontal by a rope with tension 85 N. The rope makes an angle of $12^\circ$ above the line of greatest slope. The coefficient of friction is 0.3. The block starts from rest. Take $g = 9.8$ m s$^{-2}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the normal reaction, correct to 3 significant figures.", value: R, unit: "N", wrong: [m * g * cos(rad(al)), m * g * cos(rad(al)) + T * sin(rad(ph))],
          explanation: t`$R = 98\cos 18^\circ - 85\sin 12^\circ = 93.20 - 17.67 = 75.5$ N.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the frictional force, correct to 3 significant figures.", value: F, unit: "N", wrong: [mu * m * g],
          explanation: t`$F = 0.3 \times 75.53 = 22.7$ N, down the slope.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the acceleration of the block, correct to 3 significant figures.", value: a, unit: "m/s²", wrong: [(T - m * g * sin(rad(al)) - F) / m],
          explanation: t`$85\cos 12^\circ - 98\sin 18^\circ - 22.66 = 10a$: $83.14 - 30.28 - 22.66 = 30.20$, so $a = 3.02$ m s$^{-2}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Find the speed of the block after 3 s, correct to 3 significant figures.", value: v, unit: "m/s", wrong: [a],
          explanation: t`$v = 3.020 \times 3 = 9.06$ m s$^{-1}$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the distance travelled in these 3 s, correct to 3 significant figures.", value: s, unit: "m", wrong: [v * 3],
          explanation: t`$s = \frac{1}{2}(3.020)(9) = 13.6$ m.` }),
        P.num({ label: "(f)", marks: 2, stem: "At this moment the rope breaks. Find the deceleration of the block as it continues up the slope, correct to 3 significant figures.", value: dec, unit: "m/s²", wrong: [g * (sin(rad(al)) - mu * cos(rad(al)))],
          explanation: t`Now $R = 98\cos 18^\circ$ and friction acts down the slope: deceleration $= 9.8(\sin 18^\circ + 0.3\cos 18^\circ) = 5.82$ m s$^{-2}$.` }),
        P.num({ label: "(g)", marks: 2, stem: "Find how much further up the slope the block travels, correct to 3 significant figures.", value: (v * v) / (2 * dec), unit: "m", wrong: [v / dec],
          explanation: t`$0 = 9.060^2 - 2(5.824)s$, so $s = 7.05$ m.` }),
      ],
      explanation: "The rope's component perpendicular to the slope reduces R; after the rope breaks, R returns to mg cos α and both friction and mg sin α act down the slope.",
      hints: ["Resolve the tension along and perpendicular to the slope.", "After the rope breaks, find the new R."],
    });
  }

  // B8: work–energy on a hill, then power on the level
  {
    const pe = 1100 * g * 30;
    const ke = 0.5 * 1100 * (20 ** 2 - 14 ** 2);
    const wr = 450 * 640;
    const we = pe + wr - ke;
    chk(we, 499200, 1e-6);
    const a = (40000 / 14 - 450) / 1100;
    b.struct({
      ...A, d: 4, marks: 12, secs: 1080, calculator: true,
      concepts: [Q("mechanics.work-energy"), Q("mechanics.power")],
      stem: "A car of mass 1100 kg climbs a straight hill 640 m long whose top is 30 m vertically above its foot. Its speed falls from 20 m/s at the foot to 14 m/s at the top, and the climb takes 36 s. The resistance to motion is a constant 450 N. Take g = 9.8 m/s².",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the gain in potential energy.", value: pe, unit: "J", wrong: [1100 * g * 640],
          explanation: t`$1100 \times 9.8 \times 30 = 323\,400$ J.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the loss in kinetic energy.", value: ke, unit: "J", wrong: [0.5 * 1100 * 36],
          explanation: t`$\frac{1}{2}(1100)(20^2 - 14^2) = 550 \times 204 = 112\,200$ J.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the work done against the resistance.", value: wr, unit: "J", wrong: [450 * 30],
          explanation: t`$500 \times 600 = 300\,000$ J.` }),
        P.num({ label: "(d)", marks: 2, stem: "Use the work–energy principle to find the work done by the engine.", value: we, unit: "J", wrong: [pe + wr + ke],
          explanation: t`Work by engine + KE lost = PE gained + work against resistance: $W = 323\,400 + 288\,000 - 112\,200 = 499\,200$ J.` }),
        P.num({ label: "(e)", marks: 2, stem: "Find the average power of the engine during the climb, in kilowatts, correct to 3 significant figures.", value: we / 36 / 1000, unit: "kW", wrong: [we / 36],
          explanation: t`$\frac{499\,200}{36} = 13\,870$ W $= 13.9$ kW.` }),
        P.num({ label: "(f)", marks: 3, stem: "At the top the road becomes level. The engine then works at 40 kW and the resistance is still 450 N. Find the acceleration of the car at the instant its speed is 14 m/s, correct to 3 significant figures.", value: a, unit: "m/s²", wrong: [40000 / 14 / 1100],
          explanation: t`$F = \frac{40\,000}{14} = 2857$ N; $2857 - 450 = 1100a$, so $a = 2.19$ m s$^{-2}$.` }),
      ],
      explanation: "Energy budget: work by the engine plus the kinetic energy lost pays for the potential energy gained and the work against resistance. Power = work ÷ time; at an instant, driving force = P/v.",
      hints: ["The PE uses the 30 m height; the resistance acts over 640 m.", "The car loses KE, which helps the engine."],
    });
  }

  // ===================================================================================================================
  // Section C (12 marks): averages and dispersion of grouped data

  // C1: masses of pumpkins
  {
    const cls = [[1, 2, 4], [2, 3, 12], [3, 4, 26], [4, 5, 16], [5, 6, 11], [6, 7, 6]];
    const G = grouped(cls);
    same(G.cf, [4, 16, 42, 58, 69, 75]);
    chk(G.sumfx, 298.5, 1e-9);
    chk(G.sumfx2, 1312.75, 1e-9);
    b.struct({
      ...A, d: 4, marks: 12, secs: 1080, calculator: true,
      concepts: [Q("statistics.dispersion"), Q("statistics.central-tendency")],
      stem: paras("The masses of 75 pumpkins harvested on a farm near Rusape are summarised below.", table(["Mass m (kg)", "Frequency"], [["1 ≤ m < 2", 4], ["2 ≤ m < 3", 12], ["3 ≤ m < 4", 26], ["4 ≤ m < 5", 16], ["5 ≤ m < 6", 11], ["6 ≤ m < 7", 6]])),
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate an estimate of the mean mass, correct to 3 significant figures.", value: G.mean, unit: "kg", wrong: [4, 298.5 / 6],
          explanation: t`Midpoints 1.5, 2.5, …, 6.5: $\sum fm = 298.5$, so $\bar{m} = \frac{298.5}{75} = 3.98$ kg.` }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate an estimate of the standard deviation, correct to 3 significant figures.", value: G.sd, unit: "kg", wrong: [G.variance, sqrt(G.sumfx2 / 75)],
          explanation: t`$\sum fm^2 = 9 + 75 + 318.5 + 324 + 332.75 + 253.5 = 1312.75$. $\sigma^2 = \frac{1312.75}{75} - 3.98^2 = 17.503 - 15.840 = 1.663$, so $\sigma = 1.29$ kg.` }),
        P.num({ label: "(c)", marks: 2, stem: "Estimate the median mass by interpolation, correct to 3 significant figures.", value: G.median, unit: "kg", wrong: [3.5, 4],
          explanation: t`Position 37.5: cumulative frequencies 4, 16, 42: median class $3 \leq m < 4$. Median $= 3 + \frac{37.5 - 16}{26} \times 1 = 3.83$ kg.` }),
        P.fib({ label: "(d)", marks: 2, stem: "Estimate the lower and upper quartiles, correct to 3 significant figures.", template: "Q₁ = {{blank:a}} kg, Q₃ = {{blank:b}} kg",
          blanks: [N("a", Number(G.q1.toFixed(4)), "3", { tolerance: 0.005 }), N("b", Number(G.q3.toFixed(4)), "5", { tolerance: 0.005 })],
          explanation: t`$Q_1$ (position 18.75): $3 + \frac{18.75 - 16}{26} = 3.11$. $Q_3$ (position 56.25): $4 + \frac{56.25 - 42}{16} = 4.89$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the coefficient of variation as a percentage, correct to 3 significant figures.", value: cv(G.sd, G.mean), unit: "%", wrong: [cv(G.mean, G.sd)],
          explanation: t`$\frac{1.290}{3.98} \times 100\% = 32.4\%$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Compare the mean and the median, and say what this suggests about the shape of the distribution.",
          points: ["The mean (3.98 kg) is a little greater than the median (3.83 kg).", "This suggests slight positive skew: a tail of heavier pumpkins pulls the mean up."],
          modelAnswer: "The mean, 3.98 kg, is slightly larger than the median, 3.83 kg, so the distribution has a slight positive skew: a few heavy pumpkins (the 6–7 kg class) raise the mean.",
          explanation: "Mean > median indicates positive skew." }),
      ],
      explanation: "Use midpoints for the mean and standard deviation, interpolation at n/2, n/4 and 3n/4 for the median and quartiles, and CV = σ ÷ mean × 100%.",
      hints: [t`$\sigma^2 = \frac{\sum fm^2}{\sum f} - \bar{m}^2$.`, "For 75 values the median is at position 37.5."],
    });
  }

  // C2: compare two groups
  {
    const cls = [[0, 20, 4], [20, 30, 10], [30, 40, 16], [40, 50, 12], [50, 70, 8]];
    const G = grouped(cls);
    same(G.cf, [4, 14, 30, 42, 50]);
    same(G.fd, [0.2, 1, 1.6, 1.2, 0.4]);
    chk(G.mean, 37.4, 1e-9);
    const cvA = cv(G.sd, G.mean);
    const cvB = cv(9.2, 41.5);
    chk(cvA > cvB ? 1 : 0, 1);
    b.struct({
      ...A, d: 5, marks: 12, secs: 1080, calculator: true, skill: "EVALUATION",
      concepts: [Q("statistics.dispersion"), Q("statistics.central-tendency")],
      stem: paras("The times taken by 50 Form 4 learners at school A to complete a mathematics task are shown.", table(["Time t (min)", "Frequency"], [["0 ≤ t < 20", 4], ["20 ≤ t < 30", 10], ["30 ≤ t < 40", 16], ["40 ≤ t < 50", 12], ["50 ≤ t < 70", 8]])),
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which is the modal class?", options: [
          ["30 ≤ t < 40", "Correct: greatest frequency density, 1.6."],
          ["50 ≤ t < 70", "Its frequency density is only 0.4; it is a wide class."],
          ["40 ≤ t < 50", "Frequency density 1.2, less than 1.6."],
          ["20 ≤ t < 30", "Frequency density 1.0, less than 1.6."],
        ], answer: "A", explanation: "Frequency densities 0.2, 1.0, 1.6, 1.2, 0.4: the greatest is 30 ≤ t < 40." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate an estimate of the mean time.", value: G.mean, unit: "min", wrong: [35, G.sumfx / 5],
          explanation: t`Midpoints 10, 25, 35, 45, 60: $\sum ft = 40 + 250 + 560 + 540 + 480 = 1870$; mean $= \frac{1870}{50} = 37.4$ min.` }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate an estimate of the standard deviation, correct to 3 significant figures.", value: G.sd, unit: "min", wrong: [G.variance, sqrt(G.sumfx2 / 50)],
          explanation: t`$\sum ft^2 = 400 + 6250 + 19\,600 + 24\,300 + 28\,800 = 79\,350$. $\sigma^2 = \frac{79\,350}{50} - 37.4^2 = 1587 - 1398.76 = 188.24$, so $\sigma = 13.7$ min.` }),
        P.num({ label: "(d)", marks: 2, stem: "Estimate the median time, correct to 3 significant figures.", value: G.median, unit: "min", wrong: [35, 40],
          explanation: t`25th value: cumulative frequencies 4, 14, 30: median class $30 \leq t < 40$. Median $= 30 + \frac{25 - 14}{16} \times 10 = 36.9$ min.` }),
        P.num({ label: "(e)", marks: 1, stem: "Find the coefficient of variation for school A, correct to 3 significant figures.", value: cvA, unit: "%", wrong: [cv(G.mean, G.sd)],
          explanation: t`$\frac{13.72}{37.4} \times 100\% = 36.7\%$.` }),
        P.manual({ label: "(f)", marks: 3, stem: "At school B the same task gave a mean time of 41.5 minutes with standard deviation 9.2 minutes. Compare the performance of the two schools.",
          points: ["School A's learners were faster on average (mean 37.4 min compared with 41.5 min).", "School A's times were more spread out (standard deviation 13.7 min compared with 9.2 min).", "Relative spread: CV for A 36.7% against about 22.2% for B, so B's times were more consistent."],
          modelAnswer: "On average school A finished the task faster (37.4 min against 41.5 min). However, A's times varied much more (σ = 13.7 min against 9.2 min; CV 36.7% against 22.2%), so school B's learners were slower but more consistent.",
          explanation: "Compare an average and a spread, in context." }),
      ],
      explanation: "With unequal class widths use frequency density for the modal class; midpoints give estimates of the mean and standard deviation; compare groups using an average and a measure of spread.",
      hints: ["The first and last classes are 20 minutes wide.", "CV = σ ÷ mean × 100%."],
    });
  }
});
