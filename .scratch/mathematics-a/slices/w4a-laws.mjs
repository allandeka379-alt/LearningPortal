// W4a: amaths.newton.laws
import { concept, P, t, chk, rad, suvat, ZM } from "../lib.mjs";
import { f3, g3, N, S } from "../tables/w4a-kit.mjs";

const { sin, cos, tan, sqrt, hypot } = Math;
const D = (x) => sin(rad(x));
const C = (x) => cos(rad(x));

concept("amaths.newton.laws", { file: "newton/laws", keyPrefix: "newton.laws" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which statement is Newton's first law of motion?",
    options: [
      ["A body stays at rest or moves with constant velocity unless a resultant force acts on it", "Correct: this is the first law."],
      ["The resultant force on a body equals its mass times its acceleration", "That is the second law, F = ma."],
      ["Every force has an equal and opposite reaction on the other body", "That is the third law."],
      ["A body always moves in the direction of the largest force acting on it", "Bodies accelerate in the direction of the RESULTANT force, and need not move that way at all."],
    ],
    answer: "A",
    explanation: "First law: no resultant force means no change in velocity.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A resultant force of $36$ N acts on a particle of mass $8$ kg. Find its acceleration.`,
    value: 4.5, unit: "m/s²", wrong: [288, 8 / 36],
    explanation: t`$a = \frac{F}{m} = \frac{36}{8} = 4.5$ m s$^{-2}$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A car of mass $1200$ kg moves along a level road. The driving force is $3000$ N and the total resistance is $600$ N. Find its acceleration.`,
    value: 2, unit: "m/s²", wrong: [2.5, 3],
    explanation: t`Resultant force $= 3000 - 600 = 2400$ N, so $a = \frac{2400}{1200} = 2$ m s$^{-2}$. (Ignoring the resistance gives 2.5.)`,
  });

  b.num({
    d: 1, skill: "RECALL", calculator: false, applies: ZM,
    stem: t`Find the weight of a student of mass $65$ kg, taking $g = 9.8$ m s$^{-2}$.`,
    value: 65 * 9.8, unit: "N", wrong: [65],
    explanation: t`$W = mg = 65 \times 9.8 = ${65 * 9.8}$ N. Mass is in kg; weight is a force in N.`,
  });

  const R5 = 55 * 10 - 55 * 2;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`Rudo, of mass $55$ kg, stands on a weighing scale in a lift, which accelerates downwards at $2$ m s$^{-2}$. Taking $g = 10$ m s$^{-2}$, find the force the scale exerts on her.`,
    value: R5, unit: "N", wrong: [55 * 12, 550],
    explanation: t`Taking downwards as positive: $550 - R = 55 \times 2$, so $R = ${R5}$ N. She feels lighter. ($660$ N has the acceleration in the wrong direction.)`,
    hints: ["Which way is the acceleration? Write N2L in that direction."],
  });

  const T6 = 860 * (10 + 0.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A lift of mass $800$ kg carries a passenger of mass $60$ kg. The lift cable is vertical, and the lift accelerates upwards at $0.5$ m s$^{-2}$. Taking $g = 10$ m s$^{-2}$, find the tension in the cable.`,
    value: T6, unit: "N", wrong: [800 * 10.5, 8600],
    explanation: t`Treat lift and passenger as one body of mass $860$ kg: $T - 8600 = 860 \times 0.5$, so $T = ${T6}$ N.`,
    hints: ["The cable supports the lift AND the passenger."],
  });

  const a7 = 10 * D(30);
  const v7 = suvat({ u: 0, a: a7, s: 5 }).v;
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A small block is released from rest on a smooth plane inclined at $30°$ to the horizontal. Taking $g = 10$ m s$^{-2}$, find its acceleration and its speed after it has slid $5$ m (speed correct to 3 significant figures).`,
    template: "a = {{blank:a}} m/s², speed = {{blank:v}} m/s",
    blanks: [S("a", a7, f3(10 * C(30))), S("v", v7, "50")],
    explanation: t`Along the plane: $mg\sin 30° = ma$, so $a = 10 \times 0.5 = 5$ m s$^{-2}$ (independent of the mass). $v^2 = 0 + 2(5)(5) = 50$, $v = ${f3(v7)}$ m s$^{-1}$.`,
    hints: ["On a smooth slope a = g sin α."],
  });

  const a8 = (70 - 0.4 * 120) / 12;
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A box of mass $12$ kg is pushed across a rough horizontal floor by a horizontal force of $70$ N. The coefficient of friction is $0.4$. Taking $g = 10$ m s$^{-2}$, find the acceleration of the box, correct to 3 significant figures.`,
    value: a8, unit: "m/s²", wrong: [70 / 12, (70 - 0.4 * 12) / 12],
    explanation: t`$R = 120$ N, friction $= 0.4 \times 120 = 48$ N. N2L: $70 - 48 = 12a$, so $a = ${f3(a8)}$ m s$^{-2}$. (Using friction $0.4 \times 12$ confuses mass with weight.)`,
    hints: ["Friction = μR, and R = mg here."],
  });

  const a9 = 10 * (D(35) - 0.3 * C(35));
  const t9 = sqrt((2 * 5) / a9);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A parcel is released from rest on a rough chute inclined at $35°$ to the horizontal; the coefficient of friction is $0.3$. Taking $g = 10$ m s$^{-2}$, find the time it takes to slide $5$ m down the chute, correct to 3 significant figures.`,
    value: t9, unit: "s", wrong: [sqrt(10 / (10 * D(35))), sqrt(10 / (10 * (D(35) + 0.3 * C(35))))],
    explanation: t`$R = mg\cos 35°$. Down the chute: $mg\sin 35° - 0.3mg\cos 35° = ma$, so $a = 10(\sin 35° - 0.3\cos 35°) = ${f3(a9)}$ m s$^{-2}$. Then $5 = \frac{1}{2}at^2$ gives $t = \sqrt{\frac{10}{a}} = ${f3(t9)}$ s.`,
    hints: ["Friction acts up the chute because the parcel moves down.", "Then use s = ut + ½at² with u = 0."],
  });

  const P10 = 5 * 1.2 + 50 * D(20) + 0.4 * 50 * C(20);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A crate of mass $5$ kg is pulled up a rough plane inclined at $20°$ to the horizontal by a force $P$ N parallel to the plane. The coefficient of friction is $0.4$ and the crate accelerates up the plane at $1.2$ m s$^{-2}$. Taking $g = 10$ m s$^{-2}$, find $P$, correct to 3 significant figures.`,
    value: P10, unit: "N", wrong: [5 * 1.2 + 50 * D(20), 5 * 1.2 + 50 * D(20) - 0.4 * 50 * C(20)],
    explanation: t`$R = 50\cos 20° = ${g3(50 * C(20))}$ N; friction $= 0.4R = ${g3(0.4 * 50 * C(20))}$ N down the plane. N2L up the plane: $P - 50\sin 20° - 0.4R = 5 \times 1.2$, so $P = 6 + ${g3(50 * D(20))} + ${g3(0.4 * 50 * C(20))} = ${f3(P10)}$ N.`,
    hints: ["Both friction and the weight component act down the plane."],
  });

  chk(hypot(6, -8) / 2, 5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZM,
    stem: t`A resultant force $\mathbf{F} = (6\mathbf{i} - 8\mathbf{j})$ N acts on a particle of mass $2$ kg. Find the magnitude of its acceleration.`,
    value: 5, unit: "m/s²", wrong: [-1, 20],
    explanation: t`$\mathbf{a} = \frac{\mathbf{F}}{m} = (3\mathbf{i} - 4\mathbf{j})$ m s$^{-2}$, magnitude $\sqrt{3^2 + 4^2} = 5$ m s$^{-2}$.`,
    hints: [t`Find $\mathbf{a} = \mathbf{F}/m$, then its magnitude.`],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A book rests on a table. By Newton's third law, which force is paired with the Earth's gravitational pull on the book?",
    options: [
      ["The gravitational pull of the book on the Earth", "Correct: third-law pairs act on different bodies and are of the same type."],
      ["The normal reaction of the table on the book", "This balances the weight, but both forces act on the book, so they are not a third-law pair."],
      ["The push of the book on the table", "This is paired with the table's reaction on the book."],
      ["The friction between the book and the table", "There is no friction here, and friction is a contact force, not gravity."],
    ],
    answer: "A",
    explanation: "Third-law pairs: equal, opposite, same type of force, acting on two different bodies.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "On a smooth inclined plane, a heavier particle slides down with a greater acceleration than a lighter one.",
    answer: false,
    explanation: t`$mg\sin\alpha = ma$ gives $a = g\sin\alpha$: the mass cancels.`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "In a lift moving upwards at constant speed, the reading on a weighing scale equals the passenger's weight.",
    answer: true,
    explanation: "Constant velocity means zero acceleration, so R − mg = 0 and R = mg.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A lift is moving upwards and slowing down. How does the reaction R from the floor on a passenger compare with her weight W?",
    options: [
      [t`$R < W$`, "Correct: slowing while moving up means the acceleration is downwards."],
      [t`$R > W$`, "R > W needs an upward acceleration: speeding up going up, or slowing down going down."],
      [t`$R = W$`, "R = W only when the acceleration is zero."],
      [t`$R = 0$`, "R = 0 only in free fall, with acceleration g downwards."],
    ],
    answer: "A",
    explanation: t`Taking downwards as positive: $W - R = ma$ with $a > 0$, so $R < W$.`,
    hints: ["Decide the direction of the acceleration, not of the velocity."],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: t`A particle is projected up a line of greatest slope of a rough plane inclined at $\alpha$, with coefficient of friction $\mu$. What is its deceleration while it moves up?`,
    options: [
      [t`$g(\sin\alpha + \mu\cos\alpha)$`, "Correct: friction and the weight component both act down the slope."],
      [t`$g(\sin\alpha - \mu\cos\alpha)$`, "This is the acceleration when the particle slides DOWN, with friction up the slope."],
      [t`$g\sin\alpha$`, "This ignores friction."],
      [t`$\mu g$`, t`This uses $R = mg$ and ignores the weight component.`],
    ],
    answer: "A",
    explanation: t`$-mg\sin\alpha - \mu mg\cos\alpha = ma$, so the deceleration is $g(\sin\alpha + \mu\cos\alpha)$.`,
    hints: ["Which way does friction act when the particle moves up?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A passenger of mass $m$ stands in a lift. Match each motion with the reaction $R$ from the floor.`,
    pairs: [
      ["Accelerating upwards", t`$R > mg$`],
      ["Moving at constant velocity", t`$R = mg$`],
      ["Accelerating downwards at less than g", t`$R < mg$`],
      ["Falling freely after the cable breaks", t`$R = 0$`],
    ],
    explanation: t`N2L upwards: $R - mg = ma$. The sign of $a$ decides whether $R$ is larger or smaller than $mg$.`,
  });

  b.manualShort({
    d: 2, skill: "RECALL", calculator: false, marks: 2, applies: ZM,
    stem: "State Newton's second and third laws of motion.",
    points: [
      "Second law: the resultant force on a body is proportional to (equal to mass times) its acceleration, in the direction of the acceleration (F = ma).",
      "Third law: if A exerts a force on B, then B exerts an equal and opposite force on A.",
    ],
    modelAnswer: "Second law: the rate of change of momentum (for constant mass, m × acceleration) is proportional to the resultant force and in its direction, so F = ma in SI units. Third law: when body A exerts a force on body B, B exerts a force of equal magnitude in the opposite direction on A.",
    explanation: "ZIMSEC asks for the laws to be stated; mention 'resultant' force and 'different bodies'.",
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 4,
    stem: t`A particle of mass $m$ slides down a line of greatest slope of a rough plane inclined at $\alpha$, with coefficient of friction $\mu$. Show that its acceleration is $g(\sin\alpha - \mu\cos\alpha)$, and explain why a particle placed at rest on the plane will start to slide only if $\tan\alpha > \mu$.`,
    points: [
      t`M1 resolves perpendicular: $R = mg\cos\alpha$, so $F = \mu mg\cos\alpha$ up the plane.`,
      t`M1 N2L down the plane: $mg\sin\alpha - \mu mg\cos\alpha = ma$.`,
      t`A1 cancels $m$: $a = g(\sin\alpha - \mu\cos\alpha)$.`,
      t`B1 sliding needs $a > 0$ (weight component exceeds maximum friction): $\sin\alpha > \mu\cos\alpha \iff \tan\alpha > \mu$.`,
    ],
    modelAnswer: t`$$
\perp: R = mg\cos\alpha, \quad F = \mu R = \mu mg\cos\alpha \text{ (up the plane)}
$$
$$
\text{N2L down the plane: } mg\sin\alpha - \mu mg\cos\alpha = ma \Rightarrow a = g(\sin\alpha - \mu\cos\alpha)
$$
$$
\text{It starts to slide only if } mg\sin\alpha > \mu mg\cos\alpha \iff \tan\alpha > \mu
$$`,
    explanation: t`If $\tan\alpha \le \mu$, friction can match the weight component and the particle stays at rest.`,
    hints: ["Friction opposes the motion down the plane.", "Divide by cos α for the condition."],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle of mass $4$ kg on a smooth horizontal surface is acted on by two horizontal forces: $12$ N due east and $9$ N due north. What is the magnitude of its acceleration?`,
    options: [
      [t`$3.75$ m s$^{-2}$`, t`Correct: the resultant is $\sqrt{12^2 + 9^2} = 15$ N, and $\frac{15}{4} = 3.75$.`],
      [t`$5.25$ m s$^{-2}$`, t`This adds the forces as numbers: $\frac{21}{4}$.`],
      [t`$0.75$ m s$^{-2}$`, t`This subtracts them: $\frac{3}{4}$.`],
      [t`$15$ m s$^{-2}$`, "This is the size of the resultant force, not the acceleration."],
    ],
    answer: "A",
    explanation: "Find the resultant force first (vector addition), then divide by the mass.",
    hints: ["The forces are perpendicular."],
  });

  // Struct 5: car up a hill with sin α = 1/20
  const a20 = (2500 - 400 - 1000 * 10 / 20) / 1000;
  const dec20 = (400 + 500) / 1000;
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A car of mass $1000$ kg travels up a straight hill inclined at $\alpha$ to the horizontal, where $\sin\alpha = \frac{1}{20}$. The resistance to motion is a constant $400$ N. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "The driving force is 2500 N. Find the acceleration of the car.", value: a20, unit: "m/s²", wrong: [2.1], explanation: t`$2500 - 400 - 1000g\sin\alpha = 1000a$: $2500 - 400 - 500 = 1000a$, so $a = ${a20}$ m s$^{-2}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "When the car is travelling at 18 m/s the engine is switched off. Find its deceleration.", value: dec20, unit: "m/s²", wrong: [0.4], explanation: t`Both the resistance and $mg\sin\alpha$ oppose the motion: $\frac{400 + 500}{1000} = ${dec20}$ m s$^{-2}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the distance the car travels up the hill after the engine is switched off before it comes to rest.", value: (18 * 18) / (2 * dec20), unit: "m", wrong: [324 / 0.8], explanation: t`$0 = 18^2 - 2(${dec20})s$, so $s = ${(18 * 18) / (2 * dec20)}$ m.` }),
    ],
    explanation: "The weight component along the hill acts as an extra resistance going up.",
    hints: ["The weight component down the hill is mg sin α = 500 N."],
  });

  // Struct 13: crate pulled up a rough ramp, rope breaks
  const m = 40, al = 15, mu = 0.2, T = 250;
  const R21 = m * 10 * C(al);
  const a21 = (T - m * 10 * D(al) - mu * R21) / m;
  const v21 = sqrt(2 * a21 * 6);
  const dec21 = 10 * (D(al) + mu * C(al));
  const s21 = (v21 * v21) / (2 * dec21);
  const down21 = 10 * (D(al) - mu * C(al));
  chk(tan(rad(al)) > mu ? 1 : 0, 1);
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A crate of mass $40$ kg is pulled from rest up a rough ramp inclined at $15°$ to the horizontal by a rope parallel to the ramp. The tension in the rope is $250$ N and the coefficient of friction is $0.2$. Take $g = 10$ m s$^{-2}$ and give answers to 3 significant figures.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the normal reaction on the crate.", value: R21, unit: "N", wrong: [400], explanation: t`$R = 400\cos 15° = ${f3(R21)}$ N.` }),
      P.num({ label: "(b)", marks: 3, stem: "Find the acceleration of the crate.", value: a21, unit: "m/s²", wrong: [(T - m * 10 * D(al)) / m, (T - mu * R21) / m], explanation: t`$250 - 400\sin 15° - 0.2R = 40a$: $250 - ${f3(m * 10 * D(al))} - ${f3(mu * R21)} = 40a$, so $a = ${f3(a21)}$ m s$^{-2}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the speed of the crate when it has moved 6 m up the ramp.", value: v21, unit: "m/s", wrong: [2 * a21 * 6], explanation: t`$v^2 = 2(${g3(a21, 4)})(6)$, so $v = ${f3(v21)}$ m s$^{-1}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "At that moment the rope breaks. Find the further distance the crate travels up the ramp.", value: s21, unit: "m", wrong: [(v21 * v21) / (2 * 10 * D(al)), (v21 * v21) / (2 * down21)], explanation: t`Now friction and the weight component both act down the ramp: deceleration $10(\sin 15° + 0.2\cos 15°) = ${f3(dec21)}$ m s$^{-2}$. $0 = v^2 - 2(${f3(dec21)})s$, so $s = ${f3(s21)}$ m.` }),
      P.proof({ label: "(e)", marks: 2, stem: "Show that the crate then slides back down the ramp.", points: [t`M1 compares the weight component $400\sin 15° = ${f3(m * 10 * D(al))}$ N with the maximum friction $0.2 \times ${f3(R21)} = ${f3(mu * R21)}$ N (or $\tan 15°$ with $\mu$).`, "A1 weight component is larger, so friction cannot hold the crate: it slides down."],
        modelAnswer: t`$$
400\sin 15° = ${f3(m * 10 * D(al))} \text{ N} > \mu R = 0.2 \times ${f3(R21)} = ${f3(mu * R21)} \text{ N}
$$
$$
\text{(equivalently } \tan 15° = ${f3(tan(rad(al)))} > 0.2\text{), so the crate slides back down.}
$$`,
        explanation: "At rest, compare the force down the slope with the greatest possible friction." }),
      P.num({ label: "(f)", marks: 2, stem: "Find the acceleration of the crate as it slides back down.", value: down21, unit: "m/s²", wrong: [dec21], explanation: t`Friction now acts up the ramp: $a = 10(\sin 15° - 0.2\cos 15°) = ${f3(down21)}$ m s$^{-2}$.` }),
    ],
    explanation: "Friction always opposes the motion, so the acceleration changes each time the direction of motion changes.",
    hints: ["Resolve perpendicular to the ramp first.", "After the rope breaks, find the new acceleration before using suvat."],
  });

  b.card("DEFINITION", "Newton's first law", "A body stays at rest or moves with constant velocity unless a resultant force acts.");
  b.card("FORMULA", "Newton's second law", t`Resultant force $= ma$, in the direction of the acceleration.`);
  b.card("DEFINITION", "Newton's third law", "If A exerts a force on B, B exerts an equal and opposite force on A (on different bodies).");
  b.card("FORMULA", "Weight", t`$W = mg$ (N), acting vertically down; mass in kg does not change.`);
  b.card("CONCEPT", "Lifts", t`Floor reaction: $R - mg = ma$ with upwards positive. Scale reads $R$, not the weight.`);
  b.card("FORMULA", "Smooth slope", t`$a = g\sin\alpha$ down the slope, independent of mass.`);
  b.card("FORMULA", "Rough slope", t`Up: deceleration $g(\sin\alpha + \mu\cos\alpha)$; down: acceleration $g(\sin\alpha - \mu\cos\alpha)$ if $\tan\alpha > \mu$.`);
  b.card("CONCEPT", "ma is not a force", "Draw only real forces; show the acceleration as a separate arrow.");
  b.card("FORMULA", "Vector form", t`$\mathbf{F} = m\mathbf{a}$: divide the force vector by the mass and find the magnitude.`, undefined, { applies: ZM });
});
