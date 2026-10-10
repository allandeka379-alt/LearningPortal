// W1a: dynamics.conservation-momentum — conservation of momentum, elastic and inelastic collisions, explosions, 2-D cases.
import { concept, P, t as raw, chk, sfStr, dpStr, pctDifference, DATA, deg } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.dynamics.conservation-momentum";
const g = DATA.g;

concept(K, { file: "dynamics/conservation-momentum", keyPrefix: "dynamics.conservation-momentum" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Under what condition is the total momentum of a system of interacting objects conserved?",
    options: [
      ["when no resultant external force acts on the system", "Correct: internal forces cancel in pairs (third law); only external forces change the total."],
      ["only when the collisions are elastic", "Momentum is conserved in elastic and inelastic collisions alike."],
      ["only when the objects stick together", "Sticking together is one kind of inelastic collision; momentum is conserved in all kinds."],
      ["when the total kinetic energy stays constant", "Kinetic energy is often not conserved, yet momentum still is."],
    ],
    answer: "A",
    explanation: "The principle applies to a closed system: one with no resultant external force. Then the total momentum is constant whatever the type of collision.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A $2.8\ \text{kg}$ trolley moving at $3.0\ \text{m s}^{-1}$ collides with a stationary $1.2\ \text{kg}$ trolley and they move off together. What is their common velocity?`,
    options: [
      [t`$2.1\ \text{m s}^{-1}$`, "Correct: 8.4 kg m s⁻¹ shared by 4.0 kg."],
      [t`$3.0\ \text{m s}^{-1}$`, "The total mass has increased, so the speed must fall."],
      [t`$8.4\ \text{m s}^{-1}$`, "8.4 is the momentum in kg m s⁻¹; divide by the total mass."],
      [t`$7.0\ \text{m s}^{-1}$`, "This divides the momentum by the stationary trolley's mass only."],
    ],
    answer: "A",
    explanation: t`$2.8 \times 3.0 + 0 = (2.8 + 1.2)v$, so $v = 8.4/4.0 = 2.1\ \text{m s}^{-1}$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two cars collide on an icy road (negligible friction) and crumple. Which quantities are conserved in the collision?",
    options: [
      ["the total momentum and the total energy", "Correct: momentum (no external force) and energy (always) are conserved; kinetic energy is not."],
      ["the total momentum and the total kinetic energy", "The crumpling transfers kinetic energy to other forms, so the collision is inelastic."],
      ["the total kinetic energy only", "Kinetic energy is the quantity that is not conserved here."],
      ["the velocity of each car", "Each car's velocity changes; only totals are conserved."],
    ],
    answer: "A",
    explanation: "Momentum is conserved because there is no resultant external force; total energy is always conserved. Kinetic energy is transferred to internal energy, sound and deformation, so it is not conserved.",
  });
  {
    const v = (1.5 * 3 + 2.5 * -1.6) / 4;
    chk(v, 0.125, 1e-12);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A $1.5\ \text{kg}$ trolley moving at $3.0\ \text{m s}^{-1}$ to the right collides head-on with a $2.5\ \text{kg}$ trolley moving at $1.6\ \text{m s}^{-1}$ to the left. They stick together. What is their velocity after the collision?`,
      options: [
        [t`$0.125\ \text{m s}^{-1}$ to the right`, "Correct: (4.5 − 4.0)/4.0."],
        [t`$2.13\ \text{m s}^{-1}$ to the right`, "This adds the momenta as if both moved to the right: 8.5/4.0."],
        [t`$0.125\ \text{m s}^{-1}$ to the left`, "The right-moving trolley had the larger momentum (4.5 against 4.0)."],
        [t`$1.4\ \text{m s}^{-1}$ to the right`, "This uses the difference of speeds, not of momenta."],
      ],
      answer: "A",
      explanation: t`Right positive: $1.5(3.0) + 2.5(-1.6) = 4.5 - 4.0 = 0.50\ \text{kg m s}^{-1}$. $v = 0.50/4.0 = 0.125\ \text{m s}^{-1}$ to the right.`,
      hints: ["Give the left-moving trolley a negative velocity."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement is true for every perfectly elastic collision between two objects?",
    options: [
      ["The relative speed of approach equals the relative speed of separation.", "Correct: this is equivalent to kinetic energy being conserved (with momentum)."],
      ["Each object keeps the same kinetic energy that it had before the collision.", "Kinetic energy is usually transferred between the objects; only the total is constant."],
      ["The two objects always move off with equal speeds in opposite directions.", "Final speeds depend on the masses; they are not generally equal."],
      ["The total momentum of the two objects is zero after the collision.", "The total momentum stays at its initial value, which need not be zero."],
    ],
    answer: "A",
    explanation: "In an elastic collision total kinetic energy is conserved. Combined with momentum conservation this gives u₁ − u₂ = v₂ − v₁: the speed of approach equals the speed of separation.",
    hints: ["Which quantity defines an elastic collision, and what does that imply about relative speeds?"],
  });
  {
    const v2 = (0.3 * 12) / 0.9;
    chk(v2, 4, 1e-12);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A stationary firework shell of mass $1.2\ \text{kg}$ explodes into two pieces. A $0.30\ \text{kg}$ piece flies off horizontally at $12\ \text{m s}^{-1}$. What is the velocity of the $0.90\ \text{kg}$ piece just after the explosion?`,
      options: [
        [t`$4.0\ \text{m s}^{-1}$ in the opposite direction`, "Correct: total momentum stays zero, so 0.90v = 0.30 × 12 in the opposite direction."],
        [t`$4.0\ \text{m s}^{-1}$ in the same direction`, "Equal and opposite momenta are needed for a total of zero."],
        [t`$12\ \text{m s}^{-1}$ in the opposite direction`, "Equal speeds would need equal masses."],
        [t`$3.0\ \text{m s}^{-1}$ in the opposite direction`, "This divides the momentum by the total mass, 1.2 kg."],
      ],
      answer: "A",
      explanation: t`Before: zero momentum. After: $0.30 \times 12 + 0.90v = 0$, so $v = -4.0\ \text{m s}^{-1}$.`,
      hints: ["What was the total momentum before the explosion?"],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "An object at rest explodes into two fragments, one of mass m and the other of mass 3m. What is the ratio (kinetic energy of the lighter fragment) : (kinetic energy of the heavier fragment)?",
    options: [
      ["3 : 1", "Correct: equal momenta and Eₖ = p²/2m, so Eₖ ∝ 1/m."],
      ["1 : 3", "This assumes kinetic energy is proportional to mass; for equal momenta it is inversely proportional."],
      ["1 : 1", "Equal momenta do not mean equal kinetic energies."],
      ["9 : 1", "The speed ratio is 3 : 1, and Eₖ = ½mv² gives (1 × 9) : (3 × 1) = 3 : 1, not 9 : 1."],
    ],
    answer: "A",
    explanation: t`The fragments have equal and opposite momenta $p$. $E_k = \dfrac{p^2}{2m}$, so the ratio is $\dfrac{1}{m} : \dfrac{1}{3m} = 3 : 1$.`,
    hints: ["What do the two fragments have in common?", "Write Eₖ in terms of p."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A moving ball makes a head-on, perfectly elastic collision with an identical stationary ball. What happens?",
    options: [
      ["The moving ball stops and the second ball moves off with the first ball's velocity.", "Correct: for equal masses, momentum and kinetic energy conservation together require the velocities to exchange."],
      ["Both balls move off together at half the original speed.", "That would conserve momentum but lose half the kinetic energy: an inelastic collision."],
      ["The first ball bounces back with its original speed and the second stays still.", "The second ball would then have no momentum, so momentum would not be conserved."],
      ["Both balls move off at the original speed in the same direction.", "That would double the momentum and the kinetic energy."],
    ],
    answer: "A",
    explanation: t`Momentum: $u = v_1 + v_2$. Elastic: $u = v_2 - v_1$. Adding gives $v_2 = u$ and $v_1 = 0$: the balls exchange velocities.`,
    hints: ["Use momentum and the relative-speed rule together."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In which situation is the momentum of the object named **not** conserved?",
    options: [
      ["a stone falling freely towards the ground", "Correct: its weight, an external force on it, keeps increasing its momentum."],
      ["a puck sliding on frictionless ice at constant velocity", "No resultant force acts, so its momentum is constant."],
      ["a satellite and the gas from its thruster, taken together", "Taken together they form a closed system, so total momentum is conserved."],
      ["two trolleys colliding on a level, frictionless track, taken together", "Internal forces cancel; the total is conserved."],
    ],
    answer: "A",
    explanation: "The stone alone is not a closed system: gravity (from the Earth) is an external force on it. Stone + Earth together conserve momentum.",
    hints: ["Look for an external resultant force on the object named."],
  });

  // Numerical and calculation items
  {
    const v = (12 * 250) / 800;
    b.num({
      d: 2, skill: "APPLICATION",
      stem: t`A $800\ \text{kg}$ field gun, free to recoil, fires a $12\ \text{kg}$ shell horizontally at $250\ \text{m s}^{-1}$. Calculate the recoil speed of the gun, in $\text{m s}^{-1}$.`,
      value: v, unit: "m/s", wrong: [(12 * 250) / 812],
      explanation: t`Total momentum is zero before and after: $800v = 12 \times 250$, so $v = ${sfStr(v, 3)}\ \text{m s}^{-1}$ backwards.`,
    });
  }
  {
    const v = (12000 * 1.5) / 20000;
    const keB = 0.5 * 12000 * 1.5 ** 2;
    const keA = 0.5 * 20000 * v ** 2;
    chk(keB - keA, 5400, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $12\ 000\ \text{kg}$ railway wagon moving at $1.5\ \text{m s}^{-1}$ couples with a stationary $8000\ \text{kg}$ wagon. Calculate the kinetic energy transferred to other forms in the coupling, in J.`,
      value: keB - keA, unit: "J", wrong: [keB, keA],
      explanation: t`1. $v = \dfrac{12\,000 \times 1.5}{20\,000} = ${v}\ \text{m s}^{-1}$.\n2. $E_k$ before $= \tfrac{1}{2}(12\,000)(1.5)^2 = ${keB}\ \text{J}$.\n3. $E_k$ after $= \tfrac{1}{2}(20\,000)(${v})^2 = ${keA}\ \text{J}$.\n4. Transferred $= ${keB} - ${keA} = ${keB - keA}\ \text{J}$.`,
      hints: ["Use momentum to find the common velocity first."],
    });
  }
  {
    const v2 = ((2 * 0.3) / 0.4) * 6;
    const v1 = ((0.3 - 0.1) / 0.4) * 6;
    chk(v2, 9, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $0.30\ \text{kg}$ ball moving at $6.0\ \text{m s}^{-1}$ makes a head-on elastic collision with a stationary $0.10\ \text{kg}$ ball. Calculate the velocity of the $0.10\ \text{kg}$ ball after the collision, in $\text{m s}^{-1}$.`,
      value: v2, unit: "m/s", wrong: [(0.3 * 6) / 0.1, (0.3 * 6) / 0.4],
      explanation: t`1. Momentum: $1.8 = 0.30v_1 + 0.10v_2$.\n2. Elastic: $6.0 = v_2 - v_1$, so $v_1 = v_2 - 6.0$.\n3. $1.8 = 0.30v_2 - 1.8 + 0.10v_2$, so $v_2 = 3.6/0.40 = 9.0\ \text{m s}^{-1}$ and $v_1 = ${v1}\ \text{m s}^{-1}$.\n4. Check $E_k$: before $5.4\ \text{J}$; after $\tfrac{1}{2}(0.30)(3.0)^2 + \tfrac{1}{2}(0.10)(9.0)^2 = 1.35 + 4.05 = 5.4\ \text{J}$.`,
      hints: ["Write the momentum equation.", "Use relative speed of approach = relative speed of separation."],
    });
  }
  {
    const px = 3 * 2.2;
    const py = 1.2 * 4.5;
    const v = Math.hypot(px, py) / 4.2;
    const ang = deg(Math.atan(py / px));
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $3.0\ \text{kg}$ puck moving east at $2.2\ \text{m s}^{-1}$ collides on frictionless ice with a $1.2\ \text{kg}$ puck moving north at $4.5\ \text{m s}^{-1}$. They stick together. Calculate their speed after the collision, in $\text{m s}^{-1}$.`,
      value: v, unit: "m/s", wrong: [(px + py) / 4.2, (2.2 + 4.5) / 2],
      explanation: t`1. East: $3.0 \times 2.2 = 6.6\ \text{kg m s}^{-1}$; north: $1.2 \times 4.5 = 5.4\ \text{kg m s}^{-1}$.\n2. Total momentum $= \sqrt{6.6^2 + 5.4^2} = ${sfStr(Math.hypot(px, py), 3)}\ \text{kg m s}^{-1}$.\n3. $v = ${sfStr(Math.hypot(px, py), 3)}/4.2 =${sfStr(v, 3)}\ \text{m s}^{-1}$, at $${sfStr(ang, 3)}^\circ$ north of east.\n\nAdding the momenta as numbers (12.0) ignores that they are perpendicular.`,
      hints: ["Momentum is conserved separately east and north.", "Combine the components with Pythagoras."],
    });
  }
  {
    const m = 0.015;
    const M = 1.2;
    const h = 0.075;
    const vAfter = Math.sqrt(2 * g * h);
    const u = ((m + M) / m) * vAfter;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $0.015\ \text{kg}$ pellet is fired horizontally into a $1.2\ \text{kg}$ wooden block hanging from strings, and stays in it. The block swings up through a vertical height of $0.075\ \text{m}$. Calculate the speed of the pellet before impact, in $\text{m s}^{-1}$.`,
      value: u, unit: "m/s", wrong: [vAfter, Math.sqrt((((m + M) * 2 * g * h) / m))],
      explanation: t`1. After impact, energy: $\tfrac{1}{2}(m + M)v^2 = (m + M)gh$, so $v = \sqrt{2 \times 9.81 \times 0.075} = ${sfStr(vAfter, 3)}\ \text{m s}^{-1}$.\n2. During impact, momentum: $0.015u = 1.215 \times ${sfStr(vAfter, 3)}$.\n3. $u = ${sfStr(u, 3)}\ \text{m s}^{-1}$.\n\nUsing kinetic energy conservation for the impact is wrong: that collision is very inelastic.`,
      hints: ["Use energy for the swing and momentum for the impact, not the other way round."],
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a stationary object explodes into pieces, the total momentum of the pieces immediately afterwards is zero.",
    answer: true,
    explanation: "True. The total momentum before was zero, and the explosion forces are internal, so the vector sum of the pieces' momenta is still zero.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If momentum is conserved in a collision, kinetic energy must also be conserved.",
    answer: false,
    explanation: "False. Momentum is conserved in every collision of a closed system; kinetic energy is conserved only in elastic collisions.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each interaction with the statement that is always true of it (no external forces).",
    pairs: [
      ["elastic collision", "total kinetic energy is conserved"],
      ["perfectly inelastic collision", "the objects move off together"],
      ["explosion of a stationary object", "the total momentum afterwards is zero"],
      ["any inelastic collision", "some kinetic energy is transferred to other forms"],
    ],
    explanation: "Momentum is conserved in all of them; they differ in what happens to the kinetic energy.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about elastic collisions.",
    template: "In an elastic collision, the relative speed of {{blank:a}} equals the relative speed of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["approach"], choices: ["approach", "separation", "rotation"] },
      { id: "b", accepted: ["separation"], choices: ["approach", "separation", "rotation"] },
    ],
    explanation: "u₁ − u₂ = v₂ − v₁ for an elastic collision; it follows from conserving both momentum and kinetic energy.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State the principle of conservation of momentum.",
    points: [
      "The total momentum of a system (of interacting bodies) remains constant",
      "provided no resultant external force acts on the system (closed / isolated system)",
    ],
    modelAnswer: "The total momentum of a system of interacting bodies remains constant, provided that no resultant external force acts on the system.",
    explanation: "Both the statement and the condition are needed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Use Newton's second and third laws to explain why the total momentum of two colliding trolleys is conserved when no external force acts.",
    points: [
      "Third law: during the collision the force of A on B is equal and opposite to the force of B on A, and they act for the same time",
      "Second law (F = Δp/Δt, i.e. impulse = change in momentum): the change in momentum of A is equal and opposite to that of B",
      "So the momentum gained by one equals the momentum lost by the other and the total is unchanged (no external impulse)",
    ],
    modelAnswer: "By Newton's third law, A pushes on B with a force equal and opposite to the force of B on A, and the two forces act for exactly the same time. By the second law each force equals the rate of change of momentum, so the impulses, and therefore the changes in momentum of A and B, are equal and opposite. The momentum gained by one is lost by the other, so the total momentum is unchanged, provided no external force adds an impulse.",
    explanation: "Equal and opposite forces for equal times give equal and opposite momentum changes.",
    hints: ["How long does each force act?"],
  });

  // Practice structured 1: trolley collision with light gates.
  {
    const card = 0.05;
    const mA = 0.8;
    const mB = 0.4;
    const t1 = 0.125;
    const t2 = 0.193;
    const u = card / t1;
    const v = card / t2;
    const pBefore = mA * u;
    const pAfter = (mA + mB) * v;
    const pd = pctDifference(pBefore, pAfter);
    const keLost = 0.5 * mA * u ** 2 - 0.5 * (mA + mB) * v ** 2;
    console.log("cons trolley", u, v, pBefore, pAfter, pd, keLost);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Tendai tests conservation of momentum on a horizontal runway. Trolley A ($0.80\ \text{kg}$), carrying a card $0.050\ \text{m}$ long, passes through light gate 1 and hits a stationary trolley B ($0.40\ \text{kg}$); a pin and cork make them stick together. The pair then passes through light gate 2. The card blocks gate 1 for $0.125\ \text{s}$ and gate 2 for $0.193\ \text{s}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the speed of A before the collision, in $\text{m s}^{-1}$.`, value: u, unit: "m/s", explanation: t`$0.050/0.125 = ${sfStr(u, 2)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate the momentum before the collision, in $\text{kg m s}^{-1}$.`, value: pBefore, unit: "N s", explanation: t`$0.80 \times ${sfStr(u, 2)} = ${sfStr(pBefore, 2)}\ \text{kg m s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate the speed of the pair after the collision, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", explanation: t`$0.050/0.193 = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Calculate the momentum after the collision, in $\text{kg m s}^{-1}$.`, value: pAfter, unit: "N s", wrong: [mA * v], explanation: t`$(0.80 + 0.40) \times ${sfStr(v, 3)} = ${sfStr(pAfter, 3)}\ \text{kg m s}^{-1}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the percentage difference between the momentum before and after, to two significant figures.", value: pd, sf: 2, unit: "%", explanation: t`$\dfrac{${sfStr(pBefore, 3)} - ${sfStr(pAfter, 3)}}{\tfrac{1}{2}(${sfStr(pBefore, 3)} + ${sfStr(pAfter, 3)})} \times 100 = ${sfStr(pd, 2)}\,\%$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Tendai estimates the uncertainty of his experiment as 5 %. Explain whether his results are consistent with conservation of momentum, and suggest why the momentum after is slightly smaller.", points: [`The difference (${sfStr(pd, 2)} %) is less than 5 %, so the results are consistent with momentum being conserved`, "Friction (an external force) acting on the trolleys between the gates reduces the momentum slightly; or the trolleys slow before reaching gate 2"], modelAnswer: `The percentage difference, ${sfStr(pd, 2)} %, is within the 5 % uncertainty, so the results are consistent with conservation of momentum. The small loss is likely due to friction, an external force, slowing the trolleys between the collision and the light gates.` }),
        P.num({ label: "(g)", marks: 2, stem: "Calculate the kinetic energy transferred to other forms in the collision, in J.", value: keLost, unit: "J", wrong: [0.5 * mA * u ** 2], explanation: t`Before: $\tfrac{1}{2}(0.80)(${sfStr(u, 2)})^2 = ${sfStr(0.5 * mA * u ** 2, 3)}\ \text{J}$; after: $\tfrac{1}{2}(1.20)(${sfStr(v, 3)})^2 = ${sfStr(0.5 * (mA + mB) * v ** 2, 3)}\ \text{J}$; transferred $= ${sfStr(keLost, 2)}\ \text{J}$.` }),
        P.manual({ label: "(h)", marks: 2, stem: "Describe how Tendai could compensate for friction on the runway.", points: ["Tilt the runway slightly (raise one end) so that the component of weight down the slope balances friction", "Check: a trolley given a small push moves at constant speed (equal times through two gates / equally spaced ticker-tape dots)"], modelAnswer: "Raise the start end of the runway slightly until a trolley, given a gentle push, runs down at constant speed (for example, it blocks two light gates for equal times). The component of its weight down the slope then balances friction." }),
      ],
      explanation: t`Momentum before ${sfStr(pBefore, 3)} and after ${sfStr(pAfter, 3)} kg m s⁻¹ agree within ${sfStr(pd, 2)} %; the collision is inelastic, transferring ${sfStr(keLost, 2)} J.`,
      hints: ["Speed = card length ÷ time.", "Momentum after uses the combined mass.", "Friction is an external force."],
    });
  }

  // Practice structured 2: accident reconstruction.
  {
    const m1 = 1800;
    const m2 = 1200;
    const a = 5.5;
    const s = 14;
    const v = Math.sqrt(2 * a * s);
    const u = ((m1 + m2) / m1) * v;
    const keLost = 0.5 * m1 * u ** 2 - 0.5 * (m1 + m2) * v ** 2;
    console.log("accident", v, u, keLost);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`Police investigate a collision in which a $1800\ \text{kg}$ kombi ran into the back of a stationary $1200\ \text{kg}$ car. The vehicles locked together and skidded $14\ \text{m}$ in a straight line before stopping. Tests on the road surface show that the locked vehicles decelerate uniformly at $5.5\ \text{m s}^{-2}$ while skidding.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the speed of the locked vehicles just after the collision, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", wrong: [2 * a * s], explanation: t`$0 = v^2 - 2(5.5)(14)$, so $v = \sqrt{154} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the speed of the kombi just before the collision, in $\text{m s}^{-1}$.`, value: u, unit: "m/s", wrong: [(m1 / (m1 + m2)) * v], explanation: t`$1800u = 3000 \times ${sfStr(v, 3)}$, so $u = ${sfStr(u, 3)}\ \text{m s}^{-1}$ (about $${Math.round(u * 3.6)}\ \text{km h}^{-1}$).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the kinetic energy transferred to other forms in the collision itself, in J.", value: keLost, sf: 3, unit: "J", wrong: [0.5 * m1 * u ** 2], explanation: t`Before: $\tfrac{1}{2}(1800)(${sfStr(u, 3)})^2$; after: $\tfrac{1}{2}(3000)(${sfStr(v, 3)})^2$; difference $= ${sfStr(keLost, 3)}\ \text{J}$, transferred to deformation, internal energy and sound.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Friction from the road acts on the vehicles during the collision. Explain why it is still reasonable to use conservation of momentum for the collision.", points: ["The collision lasts a very short time", "The impulse of friction (force × short time) is negligible compared with the momentum of the vehicles / the large internal forces dominate"], modelAnswer: "The impact lasts only a fraction of a second. Road friction is small compared with the enormous forces between the vehicles, and acting for such a short time its impulse is negligible compared with the vehicles' momentum, so momentum is very nearly conserved during the collision itself." }),
      ],
      explanation: t`Skid: $v = ${sfStr(v, 3)}\ \text{m s}^{-1}$; momentum: $u = \dfrac{3000}{1800}v = ${sfStr(u, 3)}\ \text{m s}^{-1}$. The collision transfers ${sfStr(keLost, 3)} J of kinetic energy.`,
      hints: ["Work backwards: skid first (suvat), then the collision (momentum).", "Kinetic energy is not conserved in the collision."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Principle of conservation of momentum", "The total momentum of a system remains constant provided no resultant external force acts on it.");
  b.card("DEFINITION", "Elastic collision", "A collision in which total kinetic energy is conserved.");
  b.card("DEFINITION", "Inelastic collision", "A collision in which some kinetic energy is transferred to other forms; momentum is still conserved.");
  b.card("FORMULA", "Conservation of momentum (two bodies)", t`$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$, with signs for direction.`);
  b.card("FORMULA", "Elastic collision: relative speeds", t`$u_1 - u_2 = v_2 - v_1$ (speed of approach = speed of separation)`);
  b.card("CONCEPT", "Explosion from rest", "Total momentum stays zero: the pieces have equal and opposite momenta; kinetic energy comes from stored energy.");
  b.card("CONCEPT", "Momentum in two dimensions", "Conserve momentum separately in two perpendicular directions.");
  b.card("CONCEPT", "Why momentum is conserved", "Third law: equal and opposite forces act for equal times, so the momentum changes are equal and opposite.");
  b.card("FACT", "Equal masses, head-on elastic collision, one at rest", "The velocities are exchanged: the moving ball stops and the other moves off with its velocity.");
});
