// W4a: amaths.forces.friction
import { concept, P, t, chk, rad, deg, ZM } from "../lib.mjs";
import { f3, g3, d1, N, S, A } from "../tables/w4a-kit.mjs";

const { sin, cos, tan, atan, sqrt } = Math;
const D = (x) => sin(rad(x));
const C = (x) => cos(rad(x));

concept("amaths.forces.friction", { file: "forces/friction", keyPrefix: "forces.friction" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`When is the frictional force $F$ on a body equal to $\mu R$?`,
    options: [
      ["When the body is on the point of moving, or is sliding", "Correct: friction reaches its maximum μR only in limiting equilibrium or when sliding."],
      ["Whenever the surface is rough, whatever the other forces are", "On a rough surface F ≤ μR; it is smaller than μR when less friction is needed."],
      ["Only when the body is at rest and no other force acts on it", "A body at rest usually needs less than the maximum friction; a sliding body has F = μR."],
      ["Only when the surface is horizontal and the body is moving", "The law F ≤ μR applies on slopes too; the slope affects R, not the law."],
    ],
    answer: "A",
    explanation: t`$F \le \mu R$ in general; equality holds in limiting equilibrium and during sliding.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The frictional force on a box resting on a rough floor is always equal to $\mu R$.`,
    answer: false,
    explanation: t`Friction only takes the value needed for equilibrium, up to a maximum of $\mu R$. A box on a level floor with no horizontal force has zero friction.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A box of mass $8$ kg rests on rough horizontal ground. The coefficient of friction is $0.4$. A horizontal force of $20$ N is applied and the box does not move. Taking $g = 10$ m s$^{-2}$, find the frictional force on the box.`,
    value: 20, unit: "N", wrong: [32],
    explanation: t`Maximum friction is $\mu R = 0.4 \times 80 = 32$ N. Only $20$ N is needed to balance the push, so friction is $20$ N and the box stays at rest. ($32$ N would be the answer only if the box were about to slide.)`,
  });

  const F4 = 0.6 * 15 * 9.8;
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true, applies: ZM,
    stem: t`A sack of groundnuts of mass $15$ kg lies on a rough horizontal floor; the coefficient of friction is $0.6$. Taking $g = 9.8$ m s$^{-2}$, find the least horizontal force that will move the sack, correct to 3 significant figures.`,
    value: F4, unit: "N", wrong: [0.6 * 15, 15 * 9.8],
    explanation: t`$R = 15 \times 9.8 = 147$ N, so the sack starts to move when the force exceeds $\mu R = 0.6 \times 147 = ${f3(F4)}$ N.`,
  });

  const mu5 = tan(rad(32));
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`A brick is placed on a plank, and one end of the plank is slowly raised. The brick is on the point of slipping when the plank makes an angle of $32°$ with the horizontal. Find the coefficient of friction between the brick and the plank, correct to 3 significant figures.`,
    value: mu5, wrong: [D(32), C(32)],
    explanation: t`In limiting equilibrium $mg\sin 32° = \mu\,mg\cos 32°$, so $\mu = \tan 32° = ${f3(mu5)}$. The mass cancels.`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A block of mass $m$ rests on a rough plane inclined at $\alpha$ to the horizontal, with no forces other than its weight and the contact force. It is not on the point of slipping. What is the magnitude of the frictional force?`,
    options: [
      [t`$mg\sin\alpha$`, "Correct: friction balances the component of the weight down the slope."],
      [t`$\mu mg\cos\alpha$`, "That is the maximum friction, reached only when the block is about to slip."],
      [t`$mg\cos\alpha$`, "That is the normal reaction, which acts perpendicular to the plane."],
      [t`$\mu mg$`, t`This uses $R = mg$, which is wrong on a slope, and assumes limiting friction.`],
    ],
    answer: "A",
    explanation: t`Resolving along the plane: $F = mg\sin\alpha$. The condition for this to be possible is $mg\sin\alpha \le \mu\,mg\cos\alpha$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A force parallel to a rough slope pushes a crate, which is on the point of moving UP the slope. Which describes the frictional force on the crate?",
    options: [
      [t`Down the slope, of magnitude $\mu R$`, "Correct: friction opposes the tendency to move up, and is limiting."],
      [t`Up the slope, of magnitude $\mu R$`, "Friction acts up the slope only when the crate tends to slide down."],
      [t`Down the slope, less than $\mu R$`, "On the point of moving means limiting equilibrium, so F = μR."],
      ["Zero, because the push balances the weight", "The push must balance the weight component AND the maximum friction."],
    ],
    answer: "A",
    explanation: "The crate is about to move up, so friction acts down the slope and has its maximum value μR.",
    hints: ["Which way would the crate move if friction suddenly disappeared?"],
  });

  const T8 = (0.3 * 40) / (C(30) + 0.3 * D(30));
  const R8 = 40 - T8 * D(30);
  chk(T8 * C(30), 0.3 * R8);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A crate of mass $4$ kg on rough horizontal ground is pulled by a rope inclined at $30°$ above the horizontal. The coefficient of friction is $0.3$ and the crate is in limiting equilibrium. Taking $g = 10$ m s$^{-2}$, find the tension $T$ and the normal reaction $R$, correct to 3 significant figures.`,
    template: "T = {{blank:t}} N, R = {{blank:r}} N",
    blanks: [S("t", T8, "12"), S("r", R8, "40")],
    explanation: t`Vertically: $R = 40 - T\sin 30°$. Horizontally (limiting): $T\cos 30° = 0.3R = 0.3(40 - 0.5T)$. So $T(\cos 30° + 0.15) = 12$ and $T = ${f3(T8)}$ N; $R = 40 - 0.5T = ${f3(R8)}$ N.`,
    hints: ["The rope's vertical component reduces R.", "Write R in terms of T before using F = μR."],
  });

  const F9 = 70 * D(25);
  const max9 = 0.6 * 70 * C(25);
  chk(F9 < max9 ? 1 : 0, 1);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A bag of mass $7$ kg rests on a rough ramp inclined at $25°$ to the horizontal; the coefficient of friction is $0.6$. Taking $g = 10$ m s$^{-2}$, find the frictional force acting on the bag, correct to 3 significant figures.`,
    value: F9, unit: "N", wrong: [max9, 0.6 * 70],
    explanation: t`The friction needed is $70\sin 25° = ${f3(F9)}$ N. The maximum available is $0.6 \times 70\cos 25° = ${g3(max9)}$ N, which is larger, so the bag stays at rest and the friction is $${f3(F9)}$ N. ($${g3(max9)}$ N would assume limiting equilibrium.)`,
    hints: ["Find the friction needed and compare it with μR."],
  });

  const P10 = 20 * D(15) + 0.5 * 20 * C(15);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A block of mass $2$ kg rests on a rough plane inclined at $15°$ to the horizontal; $\mu = 0.5$. Taking $g = 10$ m s$^{-2}$, find the least force acting parallel to the plane that will make the block start to move up the plane, correct to 3 significant figures.`,
    value: P10, unit: "N", wrong: [20 * D(15) - 0.5 * 20 * C(15) < 0 ? 0.5 * 20 * C(15) - 20 * D(15) : 1, 0.5 * 20 + 20 * D(15)],
    explanation: t`About to move up: friction acts down the plane and is limiting. $R = 20\cos 15° = ${f3(20 * C(15))}$ N. $P = 20\sin 15° + 0.5R = ${f3(20 * D(15))} + ${f3(0.5 * 20 * C(15))} = ${f3(P10)}$ N.`,
    hints: ["Friction acts down the plane when the block is about to move up."],
  });

  const P11 = 60 * D(35) - 0.45 * 60 * C(35);
  chk(tan(rad(35)) > 0.45 ? 1 : 0, 1);
  b.num({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A box of mass $6$ kg is placed on a rough plane inclined at $35°$ to the horizontal; $\mu = 0.45$. Taking $g = 10$ m s$^{-2}$, find the least force parallel to the plane needed to stop the box sliding down, correct to 3 significant figures.`,
    value: P11, unit: "N", wrong: [60 * D(35) + 0.45 * 60 * C(35), 60 * D(35)],
    explanation: t`Without help the box slips, since $\tan 35° = ${f3(tan(rad(35)))} > 0.45$. With the least force, the box is about to slip down, so friction acts **up** the plane and is limiting: $P + 0.45 \times 60\cos 35° = 60\sin 35°$, so $P = ${f3(60 * D(35))} - ${f3(0.45 * 60 * C(35))} = ${f3(P11)}$ N. (Adding the friction gives the force to push it up instead.)`,
    hints: ["Which way does the box tend to move without the force?", "Friction helps the force here."],
  });

  const P12 = 50 / (C(22) - 0.5 * D(22));
  const R12 = 100 + P12 * D(22);
  chk(P12 * C(22), 0.5 * R12);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`A trunk of mass $10$ kg rests on a rough horizontal floor; $\mu = 0.5$. Nyasha pushes it with a force $P$ N directed at $22°$ BELOW the horizontal. Taking $g = 10$ m s$^{-2}$, find the value of $P$ for which the trunk is on the point of moving, correct to 3 significant figures.`,
    value: P12, unit: "N", wrong: [50 / (C(22) + 0.5 * D(22)), 50],
    explanation: t`Vertically: $R = 100 + P\sin 22°$ (pushing down increases $R$). Horizontally: $P\cos 22° = 0.5(100 + P\sin 22°)$, so $P(\cos 22° - 0.5\sin 22°) = 50$ and $P = ${f3(P12)}$ N. Pulling upwards at $22°$ would need only $${g3(50 / (C(22) + 0.5 * D(22)))}$ N.`,
    hints: ["A downward push increases the normal reaction.", "Collect the P terms on one side."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Pulling a box along a rough floor with a rope inclined above the horizontal reduces the maximum frictional force compared with pulling horizontally.",
    answer: true,
    explanation: t`The rope's upward component $T\sin\theta$ reduces $R$ to $mg - T\sin\theta$, so the maximum friction $\mu R$ is smaller.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A block is on a slope. Match each situation with the frictional force on the block.",
    pairs: [
      ["At rest on a rough slope, no other forces, not limiting", t`Up the slope, $mg\sin\alpha$`],
      ["On the point of being pushed up a rough slope", t`Down the slope, $\mu R$`],
      ["Sliding down a rough slope", t`Up the slope, $\mu R$`],
      ["On a smooth slope", "Zero"],
    ],
    explanation: "Friction opposes motion or the tendency to move; it equals μR only when limiting or sliding, and a smooth surface gives none.",
  });

  const mu15 = (30 * C(40)) / (5 * 9.8 - 30 * D(40));
  b.num({
    d: 4, skill: "APPLICATION", calculator: true, applies: ZM,
    stem: t`A box of mass $5$ kg rests on rough horizontal ground. A force of $30$ N acting at $40°$ above the horizontal puts the box in limiting equilibrium. Taking $g = 9.8$ m s$^{-2}$, find the coefficient of friction, correct to 3 significant figures.`,
    value: mu15, wrong: [(30 * C(40)) / 49, (30 * C(40)) / (49 + 30 * D(40))],
    explanation: t`$R = 49 - 30\sin 40° = ${f3(49 - 30 * D(40))}$ N and $F = 30\cos 40° = ${f3(30 * C(40))}$ N. Limiting: $\mu = \frac{F}{R} = ${f3(mu15)}$. (Using $R = 49$ forgets the lift from the force.)`,
    hints: ["Find R first by resolving vertically."],
  });

  const a16 = deg(atan(0.5));
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: t`The coefficient of friction between a box and a ramp is $0.5$. For which angles $\alpha$ of the ramp will the box rest on it without any force other than its weight and the contact force?`,
    options: [
      [t`$\alpha \le ${d1(a16)}°$`, t`Correct: it stays at rest when $\tan\alpha \le 0.5$.`],
      [t`$\alpha \le 30°$`, t`This uses $\sin\alpha \le 0.5$ instead of $\tan\alpha \le \mu$.`],
      [t`$\alpha \le 60°$`, t`This uses $\cos\alpha \ge 0.5$, which is not the condition.`],
      [t`$\alpha \le ${d1(90 - a16)}°$`, t`This uses $\tan\alpha \le 2$, i.e. $\frac{1}{\mu}$ instead of $\mu$.`],
    ],
    answer: "A",
    explanation: t`$mg\sin\alpha \le \mu\,mg\cos\alpha \iff \tan\alpha \le \mu = 0.5 \iff \alpha \le ${d1(a16)}°$.`,
    hints: ["Compare the friction needed with the maximum available."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A box rests on a rough horizontal floor. In the standard friction model, which change increases the maximum frictional force on the box?",
    options: [
      ["Placing an extra load on top of the box", "Correct: a heavier load increases R, and so μR."],
      ["Pulling with a rope at a steeper angle above the horizontal", "A steeper rope lifts more, reducing R and so the maximum friction."],
      ["Turning the box onto a larger face", "In the model F ≤ μR, the area of contact does not appear."],
      ["Pulling the box harder horizontally", "A bigger pull uses more of the available friction but does not raise the maximum μR."],
    ],
    answer: "A",
    explanation: t`Maximum friction is $\mu R$: it changes only if $\mu$ (the surfaces) or $R$ changes.`,
  });

  b.proof({
    d: 3, skill: "APPLICATION", calculator: false, marks: 3,
    stem: t`A particle rests on a rough plane inclined at $\alpha$ to the horizontal and is on the point of slipping down. No other forces act. Show that $\mu = \tan\alpha$.`,
    points: [
      t`M1 resolves perpendicular to the plane: $R = mg\cos\alpha$.`,
      t`M1 resolves along the plane with limiting friction acting up the plane: $\mu R = mg\sin\alpha$.`,
      t`A1 divides to obtain $\mu = \tan\alpha$.`,
    ],
    modelAnswer: t`$$
\perp: \; R = mg\cos\alpha
$$
$$
\parallel: \; F = mg\sin\alpha, \text{ and limiting so } F = \mu R
$$
$$
\mu\,mg\cos\alpha = mg\sin\alpha \Rightarrow \mu = \frac{\sin\alpha}{\cos\alpha} = \tan\alpha
$$`,
    explanation: "This is why tilting a plank until a block slips is a simple way to measure μ.",
    hints: ["Friction acts up the plane because the particle tends to slide down."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: t`A wardrobe of weight $500$ N stands on a rough floor with $\mu = 0.3$. Tatenda pushes horizontally with $90$ N and says: "Friction is $0.3 \times 500 = 150$ N, so friction is now pushing the wardrobe back towards me with $150$ N." Explain what is wrong and state the actual friction.`,
    points: [
      "Friction is not always μR: 150 N is only the maximum available; friction cannot exceed the force it opposes when the wardrobe stays at rest.",
      "The wardrobe does not move (90 < 150), so friction is 90 N, equal and opposite to the push.",
    ],
    modelAnswer: "150 N is the limiting (maximum) friction. Since the push of 90 N is less than this, the wardrobe stays at rest and friction is exactly 90 N, balancing the push. A friction of 150 N would give a resultant of 60 N towards Tatenda, and the wardrobe would move towards him, which is absurd.",
    explanation: t`$F \le \mu R$: friction adjusts to what equilibrium needs.`,
    hints: ["Is the wardrobe on the point of moving?"],
  });

  // Struct 5: rough horizontal plane
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A particle of mass $2$ kg rests on a rough horizontal surface. A horizontal force of magnitude $P$ N acts on it. Take $g = 10$ m s$^{-2}$. The particle is on the point of moving when $P = 9$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find the normal reaction.", value: 20, unit: "N", wrong: [2], explanation: "R = mg = 2 × 10 = 20 N (no other vertical forces)." }),
      P.num({ label: "(b)", marks: 2, stem: "Find the coefficient of friction.", value: 0.45, wrong: [9 / 2], explanation: t`Limiting: $9 = \mu \times 20$, so $\mu = 0.45$.` }),
      P.fib({ label: "(c)", marks: 2, stem: "P is reduced to 7. Find the frictional force and say whether the friction is limiting.", template: "Friction = {{blank:f}} N; the friction is {{blank:l}}.",
        blanks: [N("f", 7, "9"), { id: "l", choices: ["limiting", "not limiting"], accepted: ["not limiting"] }],
        explanation: "Friction balances the 7 N push. It is less than the maximum 9 N, so it is not limiting." }),
    ],
    explanation: "Limiting friction gives μ; below the limit, friction equals whatever force it balances.",
    hints: ["On the point of moving means F = μR.", "Compare 7 N with the maximum friction."],
  });

  // Struct 12: force at 20° to a rough 30° plane
  const mu = 0.25, Rc = 20 * sqrt(3);
  const Pmin = (20 - mu * Rc) / (C(15) - mu * D(15));
  const Pmax = (20 + mu * Rc) / (C(15) + mu * D(15));
  chk(Pmin * C(15) + mu * (Rc - Pmin * D(15)), 20); chk(Pmax * C(15), 20 + mu * (Rc - Pmax * D(15)));
  chk(Rc, 40 * C(30));
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A particle of mass $4$ kg is on a rough plane inclined at $30°$ to the horizontal; the coefficient of friction is $0.25$. A force of magnitude $P$ N acts on the particle at an angle of $15°$ above a line of greatest slope, in the vertical plane containing that line, pulling up the plane. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.proof({ label: "(a)", marks: 2, stem: t`Show that the normal reaction is $R = 20\sqrt{3} - P\sin 15°$.`,
        points: [t`M1 resolves perpendicular to the plane: $R + P\sin 15° = 40\cos 30°$.`, t`A1 uses $\cos 30° = \frac{\sqrt{3}}{2}$ to reach the given result.`],
        modelAnswer: t`$$
R + P\sin 15° - 40\cos 30° = 0
$$
$$
R = 40 \times \frac{\sqrt{3}}{2} - P\sin 15° = 20\sqrt{3} - P\sin 15°
$$`,
        explanation: "The force lifts the particle slightly away from the plane." }),
      P.num({ label: "(b)", marks: 4, stem: "Find the least value of P for which the particle remains at rest, correct to 3 significant figures.", value: Pmin, unit: "N", wrong: [Pmax, 20 - mu * Rc],
        explanation: t`About to slip down: friction acts up the plane. $P\cos 15° + 0.25(20\sqrt{3} - P\sin 15°) = 20$, so $P = \dfrac{20 - 5\sqrt{3}}{\cos 15° - 0.25\sin 15°} = ${f3(Pmin)}$ N.` }),
      P.num({ label: "(c)", marks: 4, stem: "Find the greatest value of P for which the particle remains at rest, correct to 3 significant figures.", value: Pmax, unit: "N", wrong: [Pmin, 20 + mu * Rc],
        explanation: t`About to move up: friction acts down the plane. $P\cos 15° = 20 + 0.25(20\sqrt{3} - P\sin 15°)$, so $P = \dfrac{20 + 5\sqrt{3}}{\cos 15° + 0.25\sin 15°} = ${f3(Pmax)}$ N.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Determine whether the particle would remain at rest if the force were removed.", points: [t`Compares: needed friction $20$ N with maximum $0.25 \times 20\sqrt{3} = ${f3(mu * Rc)}$ N (or $\tan 30° = 0.577 > 0.25$).`, "Concludes that the particle would slide down the plane."],
        modelAnswer: t`Without the force, the friction needed is $40\sin 30° = 20$ N but the most available is $0.25 \times 40\cos 30° = ${f3(mu * Rc)}$ N. Since $20 > ${f3(mu * Rc)}$, the particle slides down.`,
        explanation: t`Equivalently, $\tan 30° > \mu$, so the plane is too steep for friction alone.` }),
    ],
    explanation: "Two limiting cases with friction reversed give the range of P; R depends on P because the force is not parallel to the plane.",
    hints: ["Resolve perpendicular to the plane first.", "Least P: about to slip down; greatest P: about to slide up."],
  });

  b.card("FORMULA", "The friction law", t`$F \le \mu R$; $F = \mu R$ in limiting equilibrium or when sliding.`);
  b.card("DEFINITION", "Limiting equilibrium", "At rest but on the point of moving; friction has its maximum value μR.");
  b.card("DEFINITION", "Coefficient of friction", t`The constant $\mu$ with $F_{\max} = \mu R$ for two given surfaces.`);
  b.card("CONCEPT", "Direction of friction", "Friction opposes motion or the tendency to move; it reverses when a body changes from about to slip down to about to slide up.");
  b.card("FACT", "Resting on a rough slope", t`With no other forces, a body stays at rest on a slope of angle $\alpha$ when $\tan\alpha \le \mu$.`);
  b.card("CONCEPT", "Order of working", "Resolve perpendicular to the surface for R first, then along the surface with F = μR.");
  b.card("CONCEPT", "Range of a holding force", "Solve two limiting cases (about to slip down, about to slide up) and give the inequality between them.");
  b.card("CONCEPT", "Smooth contact model", "A smooth surface gives only a normal reaction; it is a simplification that ignores friction.");
  b.card("FACT", "Angle of a pull and friction", t`A rope pulling at $\theta$ above the horizontal reduces $R$ to $mg - T\sin\theta$; a downward push increases it.`);
});
