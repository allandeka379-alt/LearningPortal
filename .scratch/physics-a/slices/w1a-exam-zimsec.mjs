// W1a: three ZIM_P3_FREE items (ZIMSEC Paper 3 longer free-response; format assumed, see BRIEF): kinematics,
// momentum, Newton's laws with drag and vectors. (a) definitions, (b) derivation/explanation (self-marked);
// (c), (d) multi-step calculations (auto-marked).
import { concept, P, t as raw, chk, sfStr, EXAM, checkExam, ZIM, DATA, rad } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const A = (k) => `aphys.${k}`;
const g = DATA.g;
const PLAN = EXAM.ZIM_P3_FREE;
const common = { skill: PLAN.skill, secs: PLAN.secs, examStyle: true, paper: "Paper 3", calculator: true, applies: PLAN.applies };

concept(A("kinematics.suvat"), { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // Z1: kinematics.
  {
    const u = 28;
    const tr = 0.8;
    const dec = 5.6;
    const sr = u * tr;
    const sb = u ** 2 / (2 * dec);
    const tb = u / dec;
    const v0 = 14;
    const h0 = 1.6;
    const H = h0 + v0 ** 2 / (2 * g);
    const vg = Math.sqrt(v0 ** 2 + 2 * g * h0);
    const T = (v0 + vg) / g;
    console.log("Z1", sr, sb, tb, H, T, vg);
    b.struct({
      ...common, d: 4,
      concepts: [A("kinematics.suvat"), A("kinematics.motion-graphs")],
      stem: "This question is about uniformly accelerated motion.",
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 5, stem: "Define displacement, velocity and acceleration, explain the difference between speed and velocity, and state the condition under which the equations of uniformly accelerated motion apply.", points: ["Displacement: distance moved in a specified direction (from a reference point)", "Velocity: rate of change of displacement", "Acceleration: rate of change of velocity", "Speed is a scalar (rate of change of distance, magnitude only); velocity is a vector (has direction)", "The equations apply only when the acceleration is constant (uniform) in magnitude and direction, in a straight line"], modelAnswer: "Displacement is the distance moved in a specified direction from a reference point. Velocity is the rate of change of displacement, and acceleration is the rate of change of velocity. Speed is a scalar, the rate of change of distance, while velocity is a vector with a direction. The equations of uniformly accelerated motion apply only when the acceleration is constant in size and direction." }),
        P.manual({ label: "(b)", marks: 5, stem: t`An object accelerates uniformly from velocity $u$ to velocity $v$ in time $t$. Using a velocity-time graph, derive the equations $v = u + at$ and $s = ut + \tfrac{1}{2}at^2$.`, points: ["The v-t graph is a straight line from u (at t = 0) to v (at time t)", t`Its gradient is the acceleration: $a = \dfrac{v - u}{t}$, which rearranges to $v = u + at$`, "The displacement is the area under the graph", t`Area = rectangle $ut$ plus triangle $\tfrac{1}{2} \times t \times (v - u)$`, t`Substituting $v - u = at$: $s = ut + \tfrac{1}{2}at^2$`], modelAnswer: t`For uniform acceleration the velocity-time graph is a straight line from $u$ to $v$. Its gradient is the acceleration, $a = (v - u)/t$, so $v = u + at$. The displacement is the area under the line: a rectangle of area $ut$ and a triangle of area $\tfrac{1}{2}t(v - u)$. Since $v - u = at$, the triangle is $\tfrac{1}{2}at^2$, so $s = ut + \tfrac{1}{2}at^2$.` }),
        P.group({ label: "(c)", stem: t`A driver travelling at $28\ \text{m s}^{-1}$ on the Harare–Bulawayo road sees an obstruction. Her reaction time is $0.80\ \text{s}$; the car then decelerates uniformly at $5.6\ \text{m s}^{-2}$. Calculate`, parts: [
          P.num({ label: "(i)", marks: 1, stem: "the distance travelled during her reaction time, in m;", value: sr, unit: "m", explanation: t`$28 \times 0.80 = ${sr}\ \text{m}$ at constant speed.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the braking distance, in m;", value: sb, unit: "m", wrong: [u ** 2 / dec], explanation: t`$0 = 28^2 - 2(5.6)s$, so $s = 784/11.2 = ${sfStr(sb, 3)}\ \text{m}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "the time taken to brake to rest, in s.", value: tb, unit: "s", wrong: [dec / u], explanation: t`$0 = 28 - 5.6t$, so $t = ${sfStr(tb, 3)}\ \text{s}$.` }),
        ] }),
        P.group({ label: "(d)", stem: t`A ball is thrown vertically upwards at $14\ \text{m s}^{-1}$ from a point $1.6\ \text{m}$ above the ground and is not caught. Air resistance is negligible; $g = 9.81\ \text{m s}^{-2}$. Calculate`, parts: [
          P.num({ label: "(i)", marks: 2, stem: "the greatest height of the ball above the ground, in m;", value: H, unit: "m", wrong: [v0 ** 2 / (2 * g)], explanation: t`Rise $= \dfrac{14^2}{2 \times 9.81} = ${sfStr(v0 ** 2 / (2 * g), 3)}\ \text{m}$; above the ground $1.6 + ${sfStr(v0 ** 2 / (2 * g), 3)} = ${sfStr(H, 3)}\ \text{m}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the time from release until it hits the ground, in s;", value: T, unit: "s", wrong: [(2 * v0) / g], explanation: t`Upwards positive, $s = -1.6\ \text{m}$: $4.905t^2 - 14t - 1.6 = 0$, so $t = \dfrac{14 + \sqrt{196 + 4(4.905)(1.6)}}{9.81} = ${sfStr(T, 3)}\ \text{s}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: t`its speed as it hits the ground, in $\text{m s}^{-1}$.`, value: vg, unit: "m/s", wrong: [v0], explanation: t`$v^2 = 14^2 + 2(9.81)(1.6)$, so $v = ${sfStr(vg, 3)}\ \text{m s}^{-1}$.` }),
        ] }),
      ]),
      explanation: t`Definitions and the derivation from gradient and area; then stopping distance $${sr} + ${sfStr(sb, 3)}\ \text{m}$ and a vertical throw reaching $${sfStr(H, 3)}\ \text{m}$ and landing after $${sfStr(T, 3)}\ \text{s}$.`,
      hints: ["Gradient of v-t = a; area = s.", "Constant speed during the reaction time.", "Take upwards as positive: the ground is at s = −1.6 m."],
    });
  }

  // Z2: momentum.
  {
    const mP = 0.3;
    const mQ = 0.2;
    const u = 0.7;
    const vQ = ((2 * mP) / (mP + mQ)) * u;
    const vP = ((mP - mQ) / (mP + mQ)) * u;
    const keAfter = 0.5 * mP * vP ** 2 + 0.5 * mQ * vQ ** 2;
    chk(keAfter, 0.5 * mP * u ** 2, 1e-12);
    const Fjet = 2.2 * 7.5;
    const imp = 0.5 * 520 * 4e-3;
    const vball = imp / 0.058;
    console.log("Z2", vQ, vP, keAfter, Fjet, imp, vball);
    b.struct({
      ...common, d: 4,
      concepts: [A("dynamics.conservation-momentum"), A("dynamics.momentum-force")],
      stem: "This question is about momentum.",
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 5, stem: "Define linear momentum and impulse, state the principle of conservation of momentum, and distinguish between an elastic and an inelastic collision.", points: ["Linear momentum: product of mass and velocity (a vector)", "Impulse: force × time for which it acts (= change in momentum)", "Principle: total momentum of a system is constant", "… provided no resultant external force acts", "Elastic: total kinetic energy conserved; inelastic: kinetic energy not conserved (some transferred to other forms), momentum conserved in both"], modelAnswer: "Linear momentum is the product of an object's mass and velocity. Impulse is the product of a force and the time for which it acts, equal to the change in momentum. The principle of conservation of momentum states that the total momentum of a system remains constant provided no resultant external force acts on it. In an elastic collision the total kinetic energy is conserved; in an inelastic collision some kinetic energy is transferred to other forms, although momentum is still conserved." }),
        P.manual({ label: "(b)", marks: 5, stem: "Two bodies A and B collide. Use Newton's second and third laws to show that their total momentum is conserved, stating any assumption.", points: ["Third law: force of A on B is equal and opposite to force of B on A (F_AB = −F_BA)", "The forces act for the same time Δt", "Second law: force = rate of change of momentum, so F_AB Δt = Δp_B and F_BA Δt = Δp_A", "Hence Δp_B = −Δp_A, i.e. Δp_A + Δp_B = 0", "So the total momentum is unchanged; assumption: no external force acts (closed system)"], modelAnswer: "By Newton's third law the force exerted by A on B is equal and opposite to the force exerted by B on A, and both act for the same time Δt. By the second law each force equals the rate of change of momentum of the body it acts on, so Δp_B = F Δt and Δp_A = −F Δt. Adding, Δp_A + Δp_B = 0: the momentum gained by one body is lost by the other and the total is constant, assuming no external force acts on the system." }),
        P.group({ label: "(c)", stem: t`On a level air track, glider P ($0.30\ \text{kg}$) moving at $0.70\ \text{m s}^{-1}$ collides elastically and head-on with a stationary glider Q ($0.20\ \text{kg}$). Calculate`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the velocity of Q after the collision, in $\text{m s}^{-1}$;`, value: vQ, unit: "m/s", wrong: [(mP * u) / mQ], explanation: t`Momentum: $0.21 = 0.30v_P + 0.20v_Q$. Elastic: $0.70 = v_Q - v_P$. Solving: $v_Q = ${sfStr(vQ, 2)}\ \text{m s}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the velocity of P after the collision, in $\text{m s}^{-1}$;`, value: vP, unit: "m/s", wrong: [0], explanation: t`$v_P = v_Q - 0.70 = ${sfStr(vP, 2)}\ \text{m s}^{-1}$ (still forwards).` }),
          P.num({ label: "(iii)", marks: 1, stem: "the total kinetic energy after the collision, in J.", value: keAfter, unit: "J", explanation: t`$\tfrac{1}{2}(0.30)(${sfStr(vP, 2)})^2 + \tfrac{1}{2}(0.20)(${sfStr(vQ, 2)})^2 = ${sfStr(keAfter, 2)}\ \text{J}$, the same as before ($\tfrac{1}{2}(0.30)(0.70)^2$), as expected for an elastic collision.` }),
        ] }),
        P.group({ label: "(d)", stem: "Calculate", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the force on a wall from a horizontal jet of water that strikes it at $2.2\ \text{kg s}^{-1}$ and $7.5\ \text{m s}^{-1}$ and does not bounce back, in N;`, value: Fjet, unit: "N", wrong: [2 * Fjet], explanation: t`$F = \dfrac{\Delta m}{\Delta t}v = 2.2 \times 7.5 = ${sfStr(Fjet, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 3, stem: t`the speed of a $0.058\ \text{kg}$ ball, initially at rest, after it is struck by a racket whose force on it rises steadily from zero to $520\ \text{N}$ and falls steadily back to zero during a contact time of $4.0\ \text{ms}$, in $\text{m s}^{-1}$.`, value: vball, unit: "m/s", wrong: [(520 * 4e-3) / 0.058], explanation: t`Impulse $=$ area of the triangle $= \tfrac{1}{2} \times 520 \times 4.0 \times 10^{-3} = ${sfStr(imp, 2)}\ \text{N s}$; $v = ${sfStr(imp, 2)}/0.058 = ${sfStr(vball, 3)}\ \text{m s}^{-1}$.` }),
        ] }),
      ]),
      explanation: t`Elastic collision: $v_Q = ${sfStr(vQ, 2)}$, $v_P = ${sfStr(vP, 2)}\ \text{m s}^{-1}$ with kinetic energy conserved; jet force ${sfStr(Fjet, 3)} N; impulse ${sfStr(imp, 2)} N s gives $${sfStr(vball, 3)}\ \text{m s}^{-1}$.`,
      hints: ["Use momentum and relative speeds together for the elastic collision.", "Impulse = area under the force-time graph."],
    });
  }

  // Z3: Newton's laws, drag and vectors.
  {
    const M = 900;
    const T1 = M * (g + 1.4);
    const T2 = M * (g - 0.7);
    const R1 = 60 * (g + 1.4);
    const F = 140;
    const th = 25;
    const m = 40;
    const Fx = F * Math.cos(rad(th));
    const a = (Fx - 95) / m;
    const N = m * g - F * Math.sin(rad(th));
    console.log("Z3", T1, T2, R1, Fx, a, N);
    b.struct({
      ...common, d: 5,
      concepts: [A("dynamics.newtons-laws"), A("dynamics.drag-terminal-velocity"), A("measurement.scalars-vectors")],
      stem: "This question is about forces and motion.",
      parts: checkExam(PLAN, [
        P.manual({ label: "(a)", marks: 6, stem: "State Newton's three laws of motion.", points: ["First law: a body remains at rest or moves with constant velocity", "… unless acted on by a resultant (external) force", "Second law: the resultant force is equal to (proportional to) the rate of change of momentum (F = ma for constant mass)", "… and acts in the direction of the change in momentum (acceleration)", "Third law: if body A exerts a force on body B, B exerts a force on A that is equal in magnitude and opposite in direction", "… and of the same type (the forces act on different bodies)"], modelAnswer: "First law: a body stays at rest or continues to move with constant velocity unless a resultant force acts on it. Second law: the resultant force on a body is equal to its rate of change of momentum (F = ma for constant mass) and acts in the direction of that change. Third law: if body A exerts a force on body B, then B exerts on A a force that is equal in magnitude, opposite in direction and of the same type." }),
        P.manual({ label: "(b)", marks: 4, stem: "A raindrop falls from rest through still air. Explain why it reaches a terminal velocity.", points: ["At first (speed zero) there is no air resistance, so the only force is the weight and a = g", "As the speed increases, the air resistance (drag) increases", "So the resultant force (weight − drag) and hence the acceleration decrease", "When drag equals weight the resultant force is zero, acceleration is zero and the velocity stays constant (terminal velocity)"], modelAnswer: "On release the raindrop's speed is zero, so there is no drag and it accelerates at g under its weight. As it speeds up the drag increases, so the resultant force, weight minus drag, decreases and the acceleration falls. Eventually the drag equals the weight; the resultant force is zero, so the acceleration is zero and the drop falls at a constant terminal velocity." }),
        P.group({ label: "(c)", stem: t`A lift and its passengers have a total mass of $900\ \text{kg}$. Take $g = 9.81\ \text{m s}^{-2}$. Calculate`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`the tension in the cable when the lift accelerates upwards at $1.4\ \text{m s}^{-2}$, in N;`, value: T1, unit: "N", wrong: [M * g], explanation: t`$T - mg = ma$: $T = 900(9.81 + 1.4) = ${sfStr(T1, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the tension when the lift, still moving upwards, slows down at $0.70\ \text{m s}^{-2}$, in N;`, value: T2, unit: "N", wrong: [M * (g + 0.8)], explanation: t`The acceleration is downwards: $T = 900(9.81 - 0.70) = ${sfStr(T2, 3)}\ \text{N}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: t`the force from the floor on a $60\ \text{kg}$ passenger during the acceleration in (i), in N.`, value: R1, unit: "N", wrong: [60 * g], explanation: t`$R = 60(9.81 + 1.4) = ${sfStr(R1, 3)}\ \text{N}$.` }),
        ] }),
        P.group({ label: "(d)", stem: t`A child pulls a $40\ \text{kg}$ sledge across level ground with a rope at $25^\circ$ above the horizontal. The tension is $140\ \text{N}$ and the friction on the sledge is $95\ \text{N}$. Calculate`, parts: [
          P.num({ label: "(i)", marks: 1, stem: "the horizontal component of the tension, in N;", value: Fx, unit: "N", wrong: [F * Math.sin(rad(th))], explanation: t`$140\cos 25^\circ = ${sfStr(Fx, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the acceleration of the sledge, in $\text{m s}^{-2}$;`, value: a, unit: "m/s²", wrong: [(F - 95) / m], explanation: t`$a = \dfrac{${sfStr(Fx, 3)} - 95}{40} = ${sfStr(a, 3)}\ \text{m s}^{-2}$.` }),
          P.num({ label: "(iii)", marks: 2, stem: "the normal contact force of the ground on the sledge, in N.", value: N, unit: "N", wrong: [m * g], explanation: t`Vertically: $N + 140\sin 25^\circ = 40 \times 9.81$, so $N = 392.4 - ${sfStr(F * Math.sin(rad(th)), 3)} = ${sfStr(N, 3)}\ \text{N}$.` }),
        ] }),
      ]),
      explanation: t`Laws stated in full; terminal velocity from drag rising to equal weight; lift tensions ${sfStr(T1, 3)} N and ${sfStr(T2, 3)} N; sledge acceleration $${sfStr(a, 3)}\ \text{m s}^{-2}$ with normal force ${sfStr(N, 3)} N.`,
      hints: ["For the lift, write T − mg = ma with the sign of a.", "Resolve the rope tension horizontally and vertically."],
    });
  }
});
