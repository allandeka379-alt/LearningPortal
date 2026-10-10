// W4a: amaths.newton.connected-particles
import { concept, P, t, chk, rad, ZM } from "../lib.mjs";
import { f3, g3, N, S } from "../tables/w4a-kit.mjs";

const { sin, cos, tan, sqrt } = Math;
const D = (x) => sin(rad(x));
const C = (x) => cos(rad(x));

concept("amaths.newton.connected-particles", { file: "newton/connected-particles", keyPrefix: "newton.connected-particles" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "Two particles are joined by a light inextensible string over a smooth pulley. What does the word 'inextensible' allow you to assume?",
    options: [
      ["The two particles have accelerations of the same magnitude", "Correct: the string does not stretch, so the particles move together."],
      ["The tension is the same on both sides of the pulley", "That follows from the pulley being smooth (and the string light)."],
      ["The string has no mass", "That is what 'light' means."],
      ["The string can push as well as pull", "No string can push; only a rod can provide a thrust."],
    ],
    answer: "A",
    explanation: "Inextensible → same speed and same size of acceleration; light → same tension along the string; smooth pulley → tension unchanged by the pulley.",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "For a light string passing over a smooth fixed pulley, the tension is the same on both sides of the pulley.",
    answer: true,
    explanation: "A smooth pulley exerts no frictional force along the string, and a light string needs no resultant force, so the tension is unchanged.",
  });

  const a3 = (70 - 30) / 10, T3 = 3 * (10 + a3);
  chk(70 - T3, 7 * a3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Particles of mass $7$ kg and $3$ kg hang at the ends of a light inextensible string passing over a smooth fixed pulley, and are released from rest. Taking $g = 10$ m s$^{-2}$, find the magnitude of their acceleration.`,
    value: a3, unit: "m/s²", wrong: [40 / 7, 10],
    explanation: t`$7$ kg (down): $70 - T = 7a$; $3$ kg (up): $T - 30 = 3a$. Adding: $40 = 10a$, so $a = ${a3}$ m s$^{-2}$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`For the particles of mass $7$ kg and $3$ kg hanging over a smooth pulley (with $g = 10$ m s$^{-2}$), find the tension in the string.`,
    value: T3, unit: "N", wrong: [70, 30],
    explanation: t`With $a = ${a3}$ m s$^{-2}$: $T = 3(10 + ${a3}) = ${T3}$ N. Check: $70 - ${T3} = 28 = 7 \times 4$. The tension lies between the two weights.`,
  });

  const a5 = 20 / 8, T5 = 6 * a5;
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A block of mass $6$ kg on a smooth horizontal table is joined by a light inextensible string, passing over a smooth pulley at the edge, to a particle of mass $2$ kg hanging freely. Taking $g = 10$ m s$^{-2}$, find the acceleration and the tension.`,
    template: "a = {{blank:a}} m/s², T = {{blank:t}} N",
    blanks: [S("a", a5, "10"), S("t", T5, "20")],
    explanation: t`Block: $T = 6a$. Hanging particle: $20 - T = 2a$. Adding: $20 = 8a$, $a = ${a5}$ m s$^{-2}$, and $T = ${T5}$ N.`,
    hints: ["Only the hanging weight drives the system; the table is smooth."],
  });

  const a6 = (24 - 0.4 * 30) / 5.4, T6 = 2.4 * (10 - a6);
  chk(T6 - 12, 3 * a6);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A box of mass $3$ kg on a rough horizontal table ($\mu = 0.4$) is joined by a light inextensible string over a smooth pulley at the edge to a particle of mass $2.4$ kg hanging freely. The system is released from rest. Taking $g = 10$ m s$^{-2}$, find the tension in the string, correct to 3 significant figures.`,
    value: T6, unit: "N", wrong: [24, 12],
    explanation: t`Friction $= 0.4 \times 30 = 12$ N (it moves, since $24 > 12$). Box: $T - 12 = 3a$; particle: $24 - T = 2.4a$. Adding: $12 = 5.4a$, $a = ${f3(a6)}$ m s$^{-2}$. Then $T = 2.4(10 - a) = ${f3(T6)}$ N.`,
    hints: ["Check that the system moves: compare the hanging weight with the greatest friction."],
  });

  const a7 = (2000 - 300) / 1200, T7 = 100 + 300 * a7;
  chk(T7, 525);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A pick-up truck of mass $900$ kg tows a cart of mass $300$ kg along a level road with a horizontal rope. The driving force is $2000$ N, and the resistances are $200$ N on the truck and $100$ N on the cart. Find the tension in the rope.`,
    value: T7, unit: "N", wrong: [300 * a7, 2000 / 4],
    explanation: t`Whole system: $2000 - 300 = 1200a$, so $a = \frac{17}{12}$ m s$^{-2}$. Cart: $T - 100 = 300 \times \frac{17}{12} = 425$, so $T = ${T7}$ N. (Forgetting the cart's resistance gives 425.)`,
    hints: ["Find a from the whole system, then use the cart alone."],
  });

  const d8 = (2200 + 350 + 150) / 1250, F8 = 250 * d8 - 150;
  chk(2200 + 350 - F8, 1000 * d8);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A car of mass $1000$ kg tows a trailer of mass $250$ kg with a light rigid tow-bar on a level road. The engine is disengaged and the brakes exert a force of $2200$ N on the car. The resistances are $350$ N on the car and $150$ N on the trailer. Find the magnitude of the force in the tow-bar.`,
    value: F8, unit: "N", wrong: [250 * d8, 400],
    explanation: t`System: $2200 + 350 + 150 = 1250d$, so $d = ${d8}$ m s$^{-2}$. Trailer: it needs $250 \times ${d8} = ${250 * d8}$ N backwards but its resistance gives only $150$ N, so the bar pushes back on it with $${F8}$ N: a thrust. Car check: $2200 + 350 - ${F8} = ${1000 * d8} = 1000 \times ${d8}$.`,
    hints: ["Find the deceleration of the whole system first.", "Then ask what extra force the trailer needs besides its own resistance."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A car towing a trailer with a rigid tow-bar brakes sharply on a level road. The trailer has no brakes. Which statement is most likely to be true?",
    options: [
      ["The tow-bar is in thrust, pushing back on the trailer", "Correct: the trailer's own resistance cannot slow it as fast as the car, so the bar pushes it back."],
      ["The tow-bar is in tension, pulling the trailer forwards", "A forward pull would make the trailer slow less, not keep pace with the braking car."],
      ["The force in the tow-bar is zero", "Zero force would need the trailer's resistance alone to give the same deceleration as the car."],
      ["The trailer decelerates more than the car", "The bar is rigid, so car and trailer have the same deceleration."],
    ],
    answer: "A",
    explanation: "Under braking, the force in the bar is usually a thrust; that is why trailers need a rigid bar rather than a rope.",
    hints: ["Compare the deceleration the trailer needs with what its own resistance gives."],
  });

  const a10 = (30 - 40 * D(30)) / 7;
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A particle of mass $4$ kg lies on a smooth plane inclined at $30°$ to the horizontal. It is joined by a light inextensible string, passing over a smooth pulley at the top of the plane, to a particle of mass $3$ kg hanging freely. Taking $g = 10$ m s$^{-2}$, find the acceleration of the system, correct to 3 significant figures.`,
    value: a10, unit: "m/s²", wrong: [30 / 7, 10 / 3],
    explanation: t`The hanging weight ($30$ N) exceeds the weight component down the plane ($40\sin 30° = 20$ N), so the $3$ kg particle descends. $30 - T = 3a$ and $T - 20 = 4a$, so $10 = 7a$ and $a = ${f3(a10)}$ m s$^{-2}$.`,
    hints: ["Only the component mg sin 30° of the 4 kg particle's weight acts along the plane."],
  });

  const R11 = 40, F11 = 0.5 * R11, a11 = (70 - 30 - F11) / 12, T11 = 7 * (10 - a11);
  chk(T11 - 30 - F11, 5 * a11);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A block of mass $5$ kg is on a rough plane inclined at $\alpha$ to the horizontal, where $\sin\alpha = 0.6$; the coefficient of friction is $0.5$. A light inextensible string attached to the block passes over a smooth pulley at the top of the plane to a particle of mass $7$ kg hanging freely. The block moves up the plane. Taking $g = 10$ m s$^{-2}$, find the tension in the string, correct to 3 significant figures.`,
    value: T11, unit: "N", wrong: [70, 7 * (10 - (70 - 30) / 12)],
    explanation: t`$\cos\alpha = 0.8$, so $R = 50 \times 0.8 = 40$ N and friction $= 20$ N down the plane. Block: $T - 30 - 20 = 5a$; particle: $70 - T = 7a$. Adding: $20 = 12a$, $a = ${f3(a11)}$ m s$^{-2}$, so $T = 7(10 - a) = ${f3(T11)}$ N.`,
    hints: ["Friction acts down the plane because the block moves up.", "Use cos α = 0.8."],
  });

  const a12 = 20 / 10, v12sq = 2 * a12 * 1.2, up12 = v12sq / 20;
  chk(up12, 0.24);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Particles $A$ (mass $6$ kg) and $B$ (mass $4$ kg) hang at the ends of a light inextensible string over a smooth pulley and are released from rest with $A$ $1.2$ m above the floor. $A$ hits the floor and does not rebound. Taking $g = 10$ m s$^{-2}$, find how much further $B$ rises after $A$ hits the floor (the string is long enough that $B$ does not reach the pulley).`,
    value: up12, unit: "m", wrong: [1.2 + up12, v12sq / (2 * a12)],
    explanation: t`$a = \frac{60 - 40}{10} = 2$ m s$^{-2}$. When $A$ lands, $v^2 = 2(2)(1.2) = 4.8$. The string goes slack and $B$ moves freely with deceleration $10$: further rise $= \frac{4.8}{20} = 0.24$ m.`,
    hints: ["After A lands, the tension is zero and B is a projectile moving vertically.", "B's deceleration is then g, not 2."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "When a particle hanging from a string over a pulley accelerates downwards, the tension in the string is greater than the particle's weight.",
    answer: false,
    explanation: "Downwards: mg − T = ma with a > 0, so T < mg. The tension exceeds the weight only when the particle accelerates upwards.",
  });

  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`A block of mass $5$ kg rests on a rough horizontal table with $\mu = 0.5$. It is joined by a light string over a smooth pulley at the edge to a particle of mass $2$ kg hanging freely, and released. Taking $g = 10$ m s$^{-2}$, what happens?`,
    options: [
      ["The system stays at rest and the friction on the block is 20 N", "Correct: the greatest friction is 25 N, more than the 20 N pull, so friction only needs to be 20 N."],
      ["The system stays at rest and the friction on the block is 25 N", "25 N is the greatest possible friction; only 20 N is needed."],
      [t`The system accelerates at $\frac{5}{7}$ m s$^{-2}$`, t`This takes friction as $0.5 \times 2 \times 10 = 10$ N, using the hanging mass instead of the block's.`],
      [t`The system accelerates at $\frac{20}{7}$ m s$^{-2}$`, "This ignores friction altogether."],
    ],
    answer: "A",
    explanation: "Always check whether motion occurs: here the hanging weight (20 N) is less than μR = 25 N.",
    hints: ["Compare the hanging weight with μR for the block."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each modelling assumption with what it allows you to say.",
    pairs: [
      ["The string is light", "The tension is the same all along the string"],
      ["The string is inextensible", "Both particles have the same magnitude of acceleration"],
      ["The pulley is smooth", "The tension is the same on both sides of the pulley"],
      ["The bodies are particles", "Their sizes are ignored and they do not rotate"],
    ],
    explanation: "Each word in the standard wording of a pulley question justifies one simplification.",
  });

  const a16 = (3 - 2) * 9.8 / 5, T16 = 2 * (9.8 + a16);
  chk(3 * 9.8 - T16, 3 * a16);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZM,
    stem: t`Particles of mass $3$ kg and $2$ kg are connected by a light inextensible string passing over a smooth fixed pulley and released from rest. Taking $g = 9.8$ m s$^{-2}$, find the acceleration and the tension (tension correct to 3 significant figures).`,
    template: "a = {{blank:a}} m/s², T = {{blank:t}} N",
    blanks: [S("a", a16, "9.8"), S("t", T16, "29.4")],
    explanation: t`$29.4 - T = 3a$ and $T - 19.6 = 2a$, so $9.8 = 5a$, $a = ${a16}$ m s$^{-2}$, and $T = 2(9.8 + 1.96) = ${f3(T16)}$ N.`,
    hints: ["Write an equation for each particle and add them."],
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`Particles of masses $m_1$ and $m_2$, with $m_1 > m_2$, hang at the ends of a light inextensible string over a smooth fixed pulley. Show that their acceleration is $\dfrac{(m_1 - m_2)g}{m_1 + m_2}$ and that the tension is $\dfrac{2m_1m_2g}{m_1 + m_2}$.`,
    points: [
      t`M1 writes $m_1g - T = m_1a$ and $T - m_2g = m_2a$.`,
      t`M1 adds to eliminate $T$.`,
      t`A1 $a = \frac{(m_1 - m_2)g}{m_1 + m_2}$.`,
      t`A1 substitutes: $T = m_2(g + a) = \frac{2m_1m_2g}{m_1 + m_2}$.`,
    ],
    modelAnswer: t`$$
m_1g - T = m_1a, \qquad T - m_2g = m_2a
$$
$$
(m_1 - m_2)g = (m_1 + m_2)a \Rightarrow a = \frac{(m_1 - m_2)g}{m_1 + m_2}
$$
$$
T = m_2(g + a) = m_2g\cdot\frac{(m_1 + m_2) + (m_1 - m_2)}{m_1 + m_2} = \frac{2m_1m_2g}{m_1 + m_2}
$$`,
    explanation: "With m₁ = m₂ the acceleration is zero and T = mg, as expected.",
    hints: ["Take the direction of motion as positive for each particle."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A farmer plans to tow a loaded trailer behind a tractor using a rope instead of a rigid tow-bar. Explain, using the idea of the force in the connection, why this is unsafe when the tractor brakes.",
    points: [
      "When the tractor brakes, the trailer (with only its own resistance) would decelerate less, so a thrust is needed to slow it at the same rate as the tractor.",
      "A rope can only provide tension, not thrust, so the rope goes slack and the trailer runs into the back of the tractor.",
    ],
    modelAnswer: "Under braking the trailer needs a backward force larger than its own resistance to slow down with the tractor; a rigid bar supplies this as a thrust. A rope cannot push: it goes slack, and the trailer keeps moving and collides with the tractor.",
    explanation: "Strings and ropes can only be in tension; rods can be in tension or thrust.",
    hints: ["Can a rope push?"],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A lorry of mass $3500$ kg pulls a trailer of mass $1500$ kg. The driving force is $6300$ N and the total resistance on lorry and trailer together is $1300$ N. What is their common acceleration?`,
    options: [
      [t`$1$ m s$^{-2}$`, t`Correct: $\frac{6300 - 1300}{5000} = 1$.`],
      [t`$1.26$ m s$^{-2}$`, "This ignores the resistance: 6300 ÷ 5000."],
      [t`$\frac{10}{7}$ m s$^{-2}$`, "This uses only the lorry's mass, but the force must accelerate both."],
      [t`$\frac{10}{3}$ m s$^{-2}$`, "This divides by the trailer's mass only."],
    ],
    answer: "A",
    explanation: "Treat lorry and trailer as one body: the tension is internal and cancels.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Two particles of EQUAL mass hang at the ends of a light inextensible string over a smooth pulley. One is given a downward push and then released. What happens next?",
    options: [
      ["Both move at constant speed", "Correct: the weights balance, so the acceleration is zero and the speed set by the push continues."],
      ["Both stop at once", "No resultant force acts to slow them down."],
      ["Both accelerate in the direction of the push", "The push has ended; equal weights give a zero resultant force."],
      ["They swing back to their original positions", "Nothing pulls them back: the system is in neutral equilibrium."],
    ],
    answer: "A",
    explanation: t`$a = \frac{(m - m)g}{2m} = 0$: Newton's first law for the system.`,
    hints: ["What is the resultant force on the system?"],
  });

  // Struct 5: A (2 kg) on smooth table, B (3 kg) hanging, A 1.5 m from pulley
  const a20 = 30 / 5, T20 = 2 * a20, t20 = sqrt((2 * 1.5) / a20);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Particle $A$, of mass $2$ kg, rests on a smooth horizontal table, $1.5$ m from a smooth pulley at the edge. It is joined by a light inextensible string over the pulley to particle $B$, of mass $3$ kg, hanging freely. The system is released from rest. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the acceleration of the particles.", value: a20, unit: "m/s²", wrong: [10], explanation: t`$30 = 5a$, $a = ${a20}$ m s$^{-2}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the tension in the string.", value: T20, unit: "N", wrong: [30], explanation: t`For $A$: $T = 2a = ${T20}$ N.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the time taken for A to reach the pulley, correct to 3 significant figures.", value: t20, unit: "s", wrong: [1.5 / 6], explanation: t`$1.5 = \frac{1}{2}(6)t^2$, so $t = \sqrt{0.5} = ${f3(t20)}$ s.` }),
    ],
    explanation: "One equation per particle (or the whole system for a), then suvat for the time.",
    hints: ["Only B's weight drives the system."],
  });

  // Struct 12: P (3 kg) on rough 30° plane, Q (5 kg) hanging 2 m above the ground
  const R21 = 30 * C(30), F21 = 0.25 * R21;
  const a21 = (50 - 30 * D(30) - F21) / 8, T21 = 5 * (10 - a21);
  const v2 = 2 * a21 * 2.5, dec21 = 10 * (D(30) + 0.25 * C(30)), s21 = v2 / (2 * dec21);
  chk(T21 - 15 - F21, 3 * a21);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`Particle $P$, of mass $3$ kg, lies on a rough plane inclined at $30°$ to the horizontal; the coefficient of friction is $0.25$. A light inextensible string attached to $P$ passes over a smooth pulley at the top of the plane and carries particle $Q$, of mass $5$ kg, hanging freely $2.5$ m above the ground. The system is released from rest. Take $g = 10$ m s$^{-2}$ and give answers to 3 significant figures.`,
    parts: [
      P.num({ label: "(a)", marks: 3, stem: "Find the acceleration of the particles.", value: a21, unit: "m/s²", wrong: [(50 - 15) / 8, (50 - 15 - 0.25 * 30) / 8], explanation: t`$R = 30\cos 30° = ${f3(R21)}$ N, friction $= 0.25R = ${f3(F21)}$ N down the plane. $P$: $T - 15 - ${f3(F21)} = 3a$; $Q$: $50 - T = 5a$. Adding: $8a = ${f3(50 - 15 - F21)}$, $a = ${f3(a21)}$ m s$^{-2}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the tension in the string.", value: T21, unit: "N", wrong: [50], explanation: t`$T = 5(10 - a) = ${f3(T21)}$ N.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the speed of Q when it reaches the ground.", value: sqrt(v2), unit: "m/s", wrong: [v2], explanation: t`$v^2 = 2a(2.5) = ${f3(v2)}$, so $v = ${f3(sqrt(v2))}$ m s$^{-1}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "Q does not rebound. Find the further distance P travels up the plane before coming to rest (P does not reach the pulley).", value: s21, unit: "m", wrong: [v2 / 20, v2 / (2 * 10 * D(30))], explanation: t`The string is slack: $P$ decelerates at $10(\sin 30° + 0.25\cos 30°) = ${f3(dec21)}$ m s$^{-2}$. $0 = ${f3(v2)} - 2(${f3(dec21)})s$, so $s = ${f3(s21)}$ m.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Determine whether P remains at rest when it stops.", points: [t`Compares $mg\sin 30° = 15$ N with the greatest friction $0.25 \times ${f3(R21)} = ${f3(F21)}$ N (or $\tan 30° = 0.577$ with $\mu = 0.25$).`, "Concludes that P slides back down the plane."],
        modelAnswer: t`At rest the weight component down the plane is $15$ N, but friction can provide at most $${f3(F21)}$ N. Since $15 > ${f3(F21)}$ (equivalently $\tan 30° > 0.25$), $P$ does not stay at rest: it slides back down.`,
        explanation: "When a particle stops on a rough slope, compare the force down the slope with μR." }),
    ],
    explanation: "Two connected stages: with the string taut (common acceleration), then P alone once Q has landed.",
    hints: ["While the string is taut, write one equation for each particle.", "After Q lands, P is decelerated by its weight component AND friction."],
  });

  b.card("DEFINITION", "Light inextensible string", "No mass and no stretch: one tension throughout, and equal speeds and accelerations at its ends.");
  b.card("DEFINITION", "Smooth light pulley", "The tension is the same on both sides.");
  b.card("CONCEPT", "Method for connected particles", "Write F = ma for each particle in its own direction of motion; add the equations to eliminate T.");
  b.card("FORMULA", "Two hanging particles", t`$a = \dfrac{(m_1 - m_2)g}{m_1 + m_2}$, $T = \dfrac{2m_1m_2g}{m_1 + m_2}$`);
  b.card("CONCEPT", "Whole-system method", "For bodies moving in one straight line, total external force = total mass × a; internal forces cancel.");
  b.card("CONCEPT", "Tension and thrust", "A string can only pull; a rigid rod or tow-bar can pull (tension) or push (thrust).");
  b.card("CONCEPT", "After a particle lands", "The string goes slack (T = 0); the other particle moves on under gravity (and friction) alone.");
  b.card("FACT", "Check that motion occurs", "On a rough table, the system moves only if the hanging weight exceeds μR for the block.");
  b.card("FACT", "Tension and hanging weight", "A hanging particle accelerating down has T < mg; accelerating up, T > mg.");
});
