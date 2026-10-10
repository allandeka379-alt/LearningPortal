// W4a: amaths.momentum.collisions
import { concept, P, t, chk, ZM } from "../lib.mjs";
import { f3, N, S } from "../tables/w4a-kit.mjs";

const ke = (m, v) => 0.5 * m * v * v;

concept("amaths.momentum.collisions", { file: "momentum/collisions", keyPrefix: "momentum.collisions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which is a correct unit of linear momentum?",
    options: [
      ["N s", "Correct: momentum mv has units kg m s⁻¹, which is the same as N s."],
      ["N m", "N m is the unit of work (joule) or of a moment."],
      [t`kg m s$^{-2}$`, "That is a newton, the unit of force."],
      ["J s", "J s is not the unit of momentum; it is the unit of action."],
    ],
    answer: "A",
    explanation: t`$mv$: kg × m s$^{-1}$ = (kg m s$^{-2}$) × s = N s.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the momentum of a car of mass $1500$ kg travelling at $12$ m s$^{-1}$.`,
    value: 1500 * 12, unit: "N s", wrong: [ke(1500, 12), 125],
    explanation: t`Momentum $= mv = 1500 \times 12 = ${1500 * 12}$ N s. ($${ke(1500, 12)}$ is the kinetic energy in J.)`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A trolley of mass $3$ kg moving at $6$ m s$^{-1}$ collides with a trolley of mass $2$ kg at rest, and the two coalesce. Find their common speed.`,
    value: 18 / 5, unit: "m/s", wrong: [3, 6],
    explanation: t`$3 \times 6 + 0 = 5v$, so $v = 3.6$ m s$^{-1}$.`,
  });

  const v4 = (2.5 * 4 - 2.5 * 1.6) / 1.5;
  chk(v4, 4);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Sphere $A$, of mass $2.5$ kg, moving at $4$ m s$^{-1}$, hits sphere $B$, of mass $1.5$ kg, which is at rest. After the impact $A$ continues in the same direction at $1.6$ m s$^{-1}$. Find the speed of $B$ after the impact.`,
    value: v4, unit: "m/s", wrong: [(2.5 * 4) / 1.5, (2.5 * 4 + 2.5 * 1.6) / 1.5],
    explanation: t`$2.5(4) = 2.5(1.6) + 1.5v$: $10 = 4 + 1.5v$, so $v = ${v4}$ m s$^{-1}$.`,
    hints: ["Total momentum before = total momentum after."],
  });

  const v5 = (5 * 3 - 3 * 4) / 8;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Particles of mass $5$ kg and $3$ kg move directly towards each other along a smooth straight line with speeds $3$ m s$^{-1}$ and $4$ m s$^{-1}$ respectively. They collide and coalesce. Find the speed of the combined particle.`,
    value: v5, unit: "m/s", wrong: [(15 + 12) / 8, 3.5],
    explanation: t`Positive in the direction of the $5$ kg particle: $5(3) + 3(-4) = 8v$, so $v = \frac{3}{8} = ${v5}$ m s$^{-1}$ (in the direction the $5$ kg particle was moving). Adding the momenta without the sign gives $\frac{27}{8}$.`,
    hints: ["The 3 kg particle has a negative velocity."],
  });

  const v6 = (1.2 * 5 - 0.8 * 8) / 1.2;
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Particle $P$, of mass $1.2$ kg, moving at $5$ m s$^{-1}$, collides with particle $Q$, of mass $0.8$ kg, at rest. After the collision $Q$ moves at $8$ m s$^{-1}$ in $P$'s original direction. Find the velocity of $P$ after the collision, taking $P$'s original direction as positive (3 significant figures), and state its direction.`,
    template: "v = {{blank:v}} m/s; P now moves {{blank:d}} its original direction.",
    blanks: [S("v", v6, "0.333"), { id: "d", choices: ["in", "opposite to"], accepted: ["opposite to"] }],
    explanation: t`$1.2(5) = 1.2v + 0.8(8)$: $6 = 1.2v + 6.4$, so $v = -\frac{1}{3} = ${f3(v6)}$ m s$^{-1}$. The minus sign means $P$ rebounds.`,
    hints: ["Keep the sign of your answer: it gives the direction."],
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In every collision between two bodies, the total kinetic energy is conserved.",
    answer: false,
    explanation: "Momentum is conserved (with no external impulse), but kinetic energy is usually lost as heat, sound and deformation; for bodies that coalesce it is always lost.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "When two bodies coalesce on a smooth surface, their total momentum after the impact equals their total momentum before it, even though kinetic energy is lost.",
    answer: true,
    explanation: "Conservation of momentum needs only the absence of an external impulse; it does not depend on what happens to kinetic energy.",
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A $4$ kg particle moves east at $3$ m s$^{-1}$ and a $2$ kg particle moves west at $5$ m s$^{-1}$. What is the total momentum of the two particles?`,
    options: [
      ["2 N s east", "Correct: 4(3) + 2(−5) = 2, and the positive direction is east."],
      ["22 N s east", "This adds the sizes of the momenta, ignoring the directions."],
      ["2 N s west", "The eastward momentum (12 N s) is the larger, so the total is eastward."],
      ["11 N s east", "This halves the sum of the momentum sizes; momentum is not averaged."],
    ],
    answer: "A",
    explanation: "Momentum is a vector: take east as positive, so the westward particle contributes −10 N s.",
  });

  const m10 = (0.3 * 8) / 2 - 0.3;
  chk(m10, 0.9);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A ball of mass $0.3$ kg moving at $8$ m s$^{-1}$ hits a stationary ball of mass $m$ kg. The balls stick together and move off at $2$ m s$^{-1}$. Find $m$.`,
    value: m10, unit: "kg", wrong: [1.2, 0.3 * 8 / 2],
    explanation: t`$0.3 \times 8 = (0.3 + m) \times 2$, so $0.3 + m = 1.2$ and $m = ${m10}$ kg. ($1.2$ kg is the combined mass.)`,
    hints: ["After coalescing, the mass is 0.3 + m."],
  });

  const v11 = 12 / 6, loss11 = ke(2, 6) - ke(6, v11);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle of mass $2$ kg moving at $6$ m s$^{-1}$ hits a particle of mass $4$ kg at rest, and they coalesce. Find the loss of kinetic energy in the collision.`,
    value: loss11, unit: "J", wrong: [ke(2, 6), ke(6, v11)],
    explanation: t`Common speed: $2(6) = 6v$, $v = 2$ m s$^{-1}$. KE before $= \frac{1}{2}(2)(36) = 36$ J; after $= \frac{1}{2}(6)(4) = 12$ J. Loss $= ${loss11}$ J.`,
    hints: ["Find the common velocity first, by conservation of momentum."],
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, applies: ZM,
    stem: t`A constant force of $40$ N acts on a body for $0.3$ s. Find the magnitude of the impulse of the force.`,
    value: 12, unit: "N s", wrong: [133, 40.3],
    explanation: t`Impulse $= Ft = 40 \times 0.3 = 12$ N s.`,
  });

  const I13 = 0.2 * (25 - -15);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZM,
    stem: t`A cricket ball of mass $0.2$ kg travelling at $15$ m s$^{-1}$ is struck by a bat and moves back along the same line at $25$ m s$^{-1}$. Find the magnitude of the impulse exerted by the bat on the ball.`,
    value: I13, unit: "N s", wrong: [0.2 * 10, 0.2 * 25],
    explanation: t`Taking the ball's final direction as positive: $u = -15$, $v = 25$. Impulse $= m(v - u) = 0.2(25 + 15) = ${I13}$ N s. ($0.2 \times 10 = 2$ forgets that the ball reversed.)`,
    hints: ["The velocity before is negative if the velocity after is positive."],
  });

  const I14 = 0.06 * (5 + 7), F14 = I14 / 0.04;
  b.fib({
    d: 4, skill: "APPLICATION", calculator: false, applies: ZM,
    stem: t`A ball of mass $0.06$ kg hits the floor vertically at $7$ m s$^{-1}$ and rebounds vertically at $5$ m s$^{-1}$. The contact lasts $0.04$ s. Find the magnitude of the impulse on the ball and the average force exerted by the floor during the impact (ignore the weight of the ball during the impact).`,
    template: "Impulse = {{blank:i}} N s, average force = {{blank:f}} N",
    blanks: [S("i", I14, "0.12"), S("f", F14, "3")],
    explanation: t`Upwards positive: $u = -7$, $v = 5$. Impulse $= 0.06(5 + 7) = ${f3(I14)}$ N s upwards. Average force $= \frac{${f3(I14)}}{0.04} = ${f3(F14)}$ N.`,
    hints: ["Change in velocity = 5 − (−7).", "Impulse = force × time."],
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false, applies: ZM,
    stem: t`A body of mass $m$ changes velocity from $u$ to $v$ (along one line) because of a force acting for a time $t$. Which expression is the impulse of the force?`,
    options: [
      [t`$m(v - u)$`, "Correct: impulse = change in momentum."],
      [t`$m(u - v)$`, "This is minus the impulse: final momentum minus initial momentum is the convention."],
      [t`$\frac{m(v - u)}{t}$`, "This is the average FORCE, impulse divided by time."],
      [t`$\tfrac{1}{2}m(v^2 - u^2)$`, "This is the change in kinetic energy (work done)."],
    ],
    answer: "A",
    explanation: t`Impulse $I = Ft = mv - mu$.`,
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each quantity with its formula.",
    pairs: [
      ["Momentum", t`$mv$`],
      ["Kinetic energy", t`$\tfrac{1}{2}mv^2$`],
      ["Common velocity after coalescing", t`$\dfrac{m_1u_1 + m_2u_2}{m_1 + m_2}$`],
      ["Impulse of a constant force", t`$Ft$`],
    ],
    explanation: "Momentum and impulse are vectors (N s); kinetic energy is a scalar (J).",
  });

  const vB = 6 / 2, vBC = (2 * vB) / 5;
  chk(1 * 6, 1 * 0 + 2 * vB);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Three particles $A$, $B$ and $C$, of masses $1$ kg, $2$ kg and $3$ kg, lie in a straight line on a smooth surface, with $B$ and $C$ at rest. $A$ is projected towards $B$ at $6$ m s$^{-1}$; after hitting $B$, $A$ is at rest. $B$ then hits $C$ and they coalesce. Find the speed of the combined particle.`,
    value: vBC, unit: "m/s", wrong: [6 / 6, vB],
    explanation: t`$A$ hits $B$: $1(6) = 1(0) + 2v_B$, so $v_B = 3$ m s$^{-1}$. $B$ hits $C$: $2(3) = 5w$, so $w = ${vBC}$ m s$^{-1}$.`,
    hints: ["Treat the two collisions one at a time."],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Particle $A$, of mass $m$, moving with speed $u$, collides directly with particle $B$, of mass $2m$, which is at rest. After the collision $A$ moves back along its original line with speed $\frac{1}{5}u$. Show that $B$ moves with speed $\frac{3}{5}u$, and that kinetic energy is lost in the collision.`,
    points: [
      t`M1 momentum equation with correct signs: $mu = m\left(-\frac{1}{5}u\right) + 2mv$.`,
      t`A1 $v = \frac{3}{5}u$.`,
      t`M1 kinetic energy after: $\frac{1}{2}m\frac{u^2}{25} + \frac{1}{2}(2m)\frac{9u^2}{25} = \frac{19}{25}\cdot\frac{1}{2}mu^2$.`,
      t`A1 compares with $\frac{1}{2}mu^2$ before: a loss of $\frac{6}{25}\cdot\frac{1}{2}mu^2 = \frac{3}{25}mu^2$.`,
    ],
    modelAnswer: t`$$
mu = -\tfrac{1}{5}mu + 2mv \Rightarrow 2mv = \tfrac{6}{5}mu \Rightarrow v = \tfrac{3}{5}u
$$
$$
\text{KE after} = \tfrac{1}{2}m\left(\tfrac{u}{5}\right)^2 + \tfrac{1}{2}(2m)\left(\tfrac{3u}{5}\right)^2 = \tfrac{1}{2}mu^2\left(\tfrac{1}{25} + \tfrac{18}{25}\right) = \tfrac{19}{25}\cdot\tfrac{1}{2}mu^2
$$
$$
\text{KE before} = \tfrac{1}{2}mu^2 > \tfrac{19}{25}\cdot\tfrac{1}{2}mu^2, \text{ so } \tfrac{3}{25}mu^2 \text{ is lost.}
$$`,
    explanation: "Momentum fixes the velocity; kinetic energy then shows the collision is not perfectly elastic.",
    hints: ["A's velocity after the collision is negative."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Two trolleys collide on a slightly rough floor. Explain why it is still reasonable to use conservation of momentum to find their velocities immediately after the collision.",
    points: [
      "Friction is a small force, and the collision lasts a very short time.",
      "So the impulse of friction during the impact (force × time) is negligible compared with the momenta involved, and momentum is effectively conserved.",
    ],
    modelAnswer: "Momentum is conserved when no external impulse acts. Friction does act, but it is small and the impact lasts only a fraction of a second, so its impulse Ft is tiny compared with the trolleys' momenta. The velocities just after the impact are therefore given accurately by conservation of momentum.",
    explanation: "Impulsive forces in the collision are huge; ordinary forces such as friction contribute almost nothing during the impact.",
    hints: ["Think about impulse = force × time."],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A $2$ kg particle moving at $3$ m s$^{-1}$ collides directly with a $1$ kg particle moving towards it at $3$ m s$^{-1}$. They coalesce. What is the velocity of the combined particle?`,
    options: [
      [t`$1$ m s$^{-1}$ in the original direction of the $2$ kg particle`, t`Correct: $\frac{2(3) + 1(-3)}{3} = 1$.`],
      [t`$3$ m s$^{-1}$ in the original direction of the $2$ kg particle`, "This adds the momenta as if both moved the same way."],
      [t`$1$ m s$^{-1}$ in the original direction of the $1$ kg particle`, "The 2 kg particle had the larger momentum, so the combined particle moves its way."],
      ["Zero: the particles stop", "Equal speeds do not mean equal momenta; the masses differ."],
    ],
    answer: "A",
    explanation: "Total momentum = 6 − 3 = 3 N s, shared by 3 kg.",
    hints: ["Take the 2 kg particle's direction as positive."],
  });

  // Struct 5: railway trucks
  const vc20 = (6000 * 2) / 10000, loss20 = ke(6000, 2) - ke(10000, vc20);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A railway truck of mass $6$ tonnes moving at $2$ m s$^{-1}$ collides with a stationary truck of mass $4$ tonnes on a straight level track, and the two couple together.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find their common speed after the collision.", value: vc20, unit: "m/s", wrong: [1, 3], explanation: t`$6000(2) = 10000v$, so $v = ${vc20}$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the loss of kinetic energy.", value: loss20, unit: "J", wrong: [ke(6000, 2)], explanation: t`Before: $\frac{1}{2}(6000)(4) = 12\,000$ J. After: $\frac{1}{2}(10\,000)(1.44) = 7200$ J. Loss $= ${loss20}$ J.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "What happens to the kinetic energy that is lost?",
        options: [["It is transferred to heat, sound and the deformation of the couplings", "Correct: energy is conserved overall but leaves the moving trucks."], ["It is destroyed at the instant the couplings lock", "Energy cannot be destroyed."], ["It becomes extra momentum shared by the two trucks", "Momentum and energy are different quantities; the momentum is unchanged."], ["It becomes gravitational potential energy of the trucks", "The track is level, so the trucks do not rise."]],
        answer: "A", explanation: "Kinetic energy is lost from the trucks but not from the universe." }),
    ],
    explanation: "Momentum gives the common speed; kinetic energy shows how much is lost.",
    hints: ["Use kilograms: 6 tonnes = 6000 kg."],
  });

  // Struct 12: three particles A (3 kg), B (2 kg), C (4 kg)
  const vB1 = (3 * 5 - 3 * 1) / 2, vC = (2 * vB1 - 2 * -2) / 4, vAB = (3 * 1 + 2 * -2) / 5;
  chk(vB1, 6); chk(vC, 4); chk(vAB, -0.2);
  const lossT = ke(3, 5) - ke(5, vAB) - ke(4, vC);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`Three particles $A$, $B$ and $C$, of masses $3$ kg, $2$ kg and $4$ kg, lie in that order on a smooth horizontal straight line, with $B$ and $C$ at rest. $A$ is projected towards $B$ with speed $5$ m s$^{-1}$. After $A$ hits $B$, $A$ continues in the same direction with speed $1$ m s$^{-1}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the speed of B after this collision.", value: vB1, unit: "m/s", wrong: [7.5], explanation: t`$3(5) = 3(1) + 2v_B$, so $v_B = 6$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "B then hits C. After this collision B moves back towards A with speed 2 m/s. Find the speed of C.", value: vC, unit: "m/s", wrong: [2], explanation: t`$2(6) = 2(-2) + 4v_C$, so $v_C = 4$ m s$^{-1}$.` }),
      P.proof({ label: "(c)", marks: 2, stem: "Explain why A and B must collide again.", points: ["States the velocities: A moves at +1 m/s, B at −2 m/s (towards A).", "They are moving towards each other on the same line, so they must meet."],
        modelAnswer: t`$$
v_A = +1 \text{ m s}^{-1}, \quad v_B = -2 \text{ m s}^{-1}
$$
$$
\text{B is between A and C and moves towards A while A moves towards B, so they collide.}
$$`,
        explanation: "Compare the directions and positions of the two particles." }),
      P.num({ label: "(d)", marks: 3, stem: "In this second collision A and B coalesce. Find the velocity of the combined particle, taking A's original direction as positive.", value: vAB, unit: "m/s", wrong: [0.2, 1], explanation: t`$3(1) + 2(-2) = 5w$, so $w = ${vAB}$ m s$^{-1}$: it moves slowly back, away from $C$.` }),
      P.mcq({ label: "(e)", marks: 1, stem: "Are there any further collisions?",
        options: [["No: AB moves away from C, which moves away from AB", "Correct: AB has velocity −0.2 m/s and C has +4 m/s."], ["Yes: AB will catch C", "AB moves in the negative direction, away from C."], ["Yes: C will rebound and hit AB", "C has nothing to rebound from on a smooth line."], ["It cannot be decided without the distances", "The directions alone show that they separate."]],
        answer: "A", explanation: "Particles moving apart never meet again." }),
      P.num({ label: "(f)", marks: 2, stem: "Find the total loss of kinetic energy in the three collisions.", value: lossT, unit: "J", wrong: [ke(3, 5) - ke(4, vC)], explanation: t`Initially $\frac{1}{2}(3)(25) = 37.5$ J. Finally $\frac{1}{2}(5)(0.04) + \frac{1}{2}(4)(16) = 0.1 + 32 = 32.1$ J. Loss $= ${f3(lossT)}$ J.` }),
    ],
    explanation: "Apply conservation of momentum to each collision in turn, keeping signs, then compare velocities to decide on further collisions.",
    hints: ["Take A's original direction as positive throughout.", "After each collision, check which particles are moving towards each other."],
  });

  b.card("DEFINITION", "Linear momentum", t`$mv$, measured in N s; a vector (its sign gives the direction in one dimension).`);
  b.card("FORMULA", "Conservation of momentum", t`$m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2$ (no external impulse).`);
  b.card("FORMULA", "Coalescing bodies", t`Common velocity $= \dfrac{m_1u_1 + m_2u_2}{m_1 + m_2}$`);
  b.card("FACT", "Kinetic energy in collisions", "Not conserved in general; always lost when bodies coalesce.");
  b.card("CONCEPT", "Signs in collision problems", "Choose a positive direction; a body moving the other way has negative velocity; a negative answer means a reversed direction.");
  b.card("CONCEPT", "No further collisions", "Compare final velocities: a body behind must not be moving faster (in the same direction) than the one in front.");
  b.card("FORMULA", "Impulse (ZIMSEC)", t`$I = Ft = mv - mu$ (N s).`, undefined, { applies: ZM });
  b.card("CONCEPT", "Impulse in a rebound (ZIMSEC)", t`The change in velocity is $v - (-u) = v + u$: add the two speeds.`, undefined, { applies: ZM });
  b.card("CONCEPT", "Why momentum is conserved", "In an impact the bodies exert equal and opposite impulses on each other (Newton's third law), so the total momentum is unchanged.");
});
