// W4a: amaths.energy.work-energy
import { concept, P, t, chk, rad, ZM } from "../lib.mjs";
import { f3, N, S } from "../tables/w4a-kit.mjs";

const { sin, cos, sqrt } = Math;
const D = (x) => sin(rad(x));
const C = (x) => cos(rad(x));
const ke = (m, v) => 0.5 * m * v * v;

concept("amaths.energy.work-energy", { file: "energy/work-energy", keyPrefix: "energy.work-energy" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "A box slides along a level rough floor. Which force acting on it does NO work?",
    options: [
      ["The normal reaction from the floor", "Correct: it is perpendicular to the motion."],
      ["Friction", "Friction acts against the motion, so work is done against it."],
      ["A horizontal push in the direction of motion", "A force along the motion does work Fd."],
      ["A rope pulling at 30° above the horizontal", "Its horizontal component does work Fd cos 30°."],
    ],
    answer: "A",
    explanation: t`$W = Fd\cos\theta$ is zero when $\theta = 90°$. The weight also does no work here, since the box does not move vertically.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`Find the kinetic energy of a ball of mass $0.5$ kg moving at $8$ m s$^{-1}$.`,
    value: ke(0.5, 8), unit: "J", wrong: [32, 4],
    explanation: t`$\text{KE} = \frac{1}{2}mv^2 = \frac{1}{2}(0.5)(64) = ${ke(0.5, 8)}$ J. (Forgetting the $\frac{1}{2}$ gives 32.)`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`A sack of maize of mass $25$ kg is lifted from the ground onto a truck bed $1.6$ m high. Taking $g = 10$ m s$^{-2}$, find the gain in gravitational potential energy.`,
    value: 25 * 10 * 1.6, unit: "J", wrong: [25 * 1.6, 0.5 * 25 * 1.6 * 1.6],
    explanation: t`$mgh = 25 \times 10 \times 1.6 = ${25 * 10 * 1.6}$ J.`,
  });

  const W4 = 80 * 15 * C(25);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: t`A trolley is pulled $15$ m along a level path by a force of $80$ N inclined at $25°$ to the path. Find the work done by the force, correct to 3 significant figures.`,
    value: W4, unit: "J", wrong: [80 * 15, 80 * 15 * D(25)],
    explanation: t`$W = Fd\cos\theta = 80 \times 15 \times \cos 25° = ${f3(W4)}$ J. Only the component along the path does work.`,
  });

  const v5 = sqrt(2 * 10 * 8 * D(20));
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A block is released from rest and slides $8$ m down a smooth plane inclined at $20°$ to the horizontal. Use an energy method, with $g = 10$ m s$^{-2}$, to find its speed, correct to 3 significant figures.`,
    value: v5, unit: "m/s", wrong: [sqrt(2 * 10 * 8), sqrt(2 * 10 * 8 * C(20))],
    explanation: t`The vertical drop is $8\sin 20°$ m. $\frac{1}{2}mv^2 = mg(8\sin 20°)$, so $v^2 = 160\sin 20° = ${f3(v5 * v5)}$ and $v = ${f3(v5)}$ m s$^{-1}$. (Using $8$ m as the height gives $${f3(sqrt(160))}$ m s$^{-1}$.)`,
    hints: ["Potential energy uses the vertical height, not the distance along the slope."],
  });

  const v6 = sqrt(144 + 2 * 10 * 30);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A stone is thrown from the top of a cliff $30$ m above the sea with speed $12$ m s$^{-1}$. Ignoring air resistance and taking $g = 10$ m s$^{-2}$, find its speed when it hits the sea, correct to 3 significant figures. (The direction of the throw does not matter.)`,
    value: v6, unit: "m/s", wrong: [12 + sqrt(600), sqrt(600)],
    explanation: t`Energy: $\frac{1}{2}mv^2 = \frac{1}{2}m(12)^2 + m(10)(30)$, so $v^2 = 144 + 600 = 744$ and $v = ${f3(v6)}$ m s$^{-1}$. Speeds do not add: $12 + \sqrt{600}$ is wrong.`,
    hints: ["Only gravity does work, so KE + PE is conserved."],
  });

  const W7 = 80 * 10 * 15 - (ke(80, 12) - ke(80, 4));
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A cyclist and her bicycle, of total mass $80$ kg, freewheel down a hill. Their speed increases from $4$ m s$^{-1}$ to $12$ m s$^{-1}$ while they descend a vertical height of $15$ m, travelling $320$ m along the road. Taking $g = 10$ m s$^{-2}$, find the work done against resistances and the average resistance.`,
    template: "Work done = {{blank:w}} J, average resistance = {{blank:r}} N",
    blanks: [N("w", W7, "5120"), S("r", W7 / 320, "37.5")],
    explanation: t`Loss of PE $= 80 \times 10 \times 15 = 12\,000$ J. Gain of KE $= \frac{1}{2}(80)(144 - 16) = 5120$ J. Work against resistance $= 12\,000 - 5120 = ${W7}$ J. Average resistance $= \frac{${W7}}{320} = ${W7 / 320}$ N.`,
    hints: ["Loss of PE = gain of KE + work done against resistance.", "Resistance acts over the 320 m of road, not the 15 m drop."],
  });

  const R9 = 30 * C(30), d9 = ke(3, 10) / (30 * D(30) + 0.4 * R9);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A block of mass $3$ kg is projected up a line of greatest slope of a rough plane inclined at $30°$, with speed $10$ m s$^{-1}$. The coefficient of friction is $0.4$ and $g = 10$ m s$^{-2}$. Use an energy method to find how far up the plane it travels before coming to rest, correct to 3 significant figures.`,
    value: d9, unit: "m", wrong: [ke(3, 10) / (30 * D(30)), ke(3, 10) / (30 * D(30) + 0.4 * 30)],
    explanation: t`Over a distance $d$: initial KE $= 150$ J $=$ gain in PE $+$ work against friction $= 30d\sin 30° + 0.4(30\cos 30°)d = ${f3(30 * D(30) + 0.4 * R9, 4)}d$. So $d = ${f3(d9)}$ m.`,
    hints: ["Friction = μR with R = mg cos 30°.", "KE lost = PE gained + work against friction."],
  });

  const d10 = 5 / 0.25;
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`A small parcel is released from rest at point $A$ on a smooth curved chute and reaches the bottom $B$, $5$ m below $A$. It then slides along a rough horizontal floor with coefficient of friction $0.25$. Find the distance it slides along the floor before stopping.`,
    value: d10, unit: "m", wrong: [5 * 0.25, 5],
    explanation: t`From $A$ to stopping: the PE lost, $mg(5)$, is all used in work against friction, $0.25mg \times d$. So $d = \frac{5}{0.25} = ${d10}$ m. The mass and $g$ cancel, and the shape of the chute does not matter.`,
    hints: ["Consider the whole motion from A to rest in one energy equation."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "As a child slides down a smooth curved slide, the normal reaction of the slide does no work on her.",
    answer: true,
    explanation: "The normal reaction is always perpendicular to the direction of motion along the surface, so cos 90° = 0 and it does no work.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`For a particle that moves $d$ metres up a slope inclined at $\alpha$, the gain in potential energy is $mgd$.`,
    answer: false,
    explanation: t`PE uses the vertical height gained, $d\sin\alpha$, so the gain is $mgd\sin\alpha$.`,
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Two smooth slides start at the same height and end at the same lower level. One is straight; the other curves steeply at first. Identical children start from rest at the top of each. How do their speeds at the bottom compare?",
    options: [
      ["They are equal", "Correct: with no friction, only the drop in height decides the speed (v² = 2gh)."],
      ["Faster on the steeply curved slide", "A steep start makes her fast sooner, but the final speed depends only on the height dropped."],
      ["Faster on the straight slide", "The path shape does not affect the final speed on a smooth slide."],
      ["It depends on the children's masses", "Mass cancels in mgh = ½mv²."],
    ],
    answer: "A",
    explanation: "Conservation of mechanical energy depends only on the change in height, not on the path.",
    hints: ["Which forces do work on a smooth slide?"],
  });

  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A particle of mass $2$ kg moves $10$ m up a line of greatest slope of a plane inclined at $30°$. Taking $g = 10$ m s$^{-2}$, what is the work done BY gravity on the particle?`,
    options: [
      [t`$-100$ J`, "Correct: gravity opposes the upward motion; the height gained is 10 sin 30° = 5 m, so W = −20 × 5."],
      [t`$-173$ J`, "This uses 10 cos 30° for the height gained."],
      [t`$+100$ J`, "Gravity acts downwards while the particle rises, so its work is negative."],
      [t`$-200$ J`, "This uses the 10 m along the slope as the vertical height."],
    ],
    answer: "A",
    explanation: t`Work by gravity $= -mgh = -2 \times 10 \times 10\sin 30° = -100$ J (equivalently, $100$ J of work is done against gravity).`,
    hints: ["Find the vertical height gained first."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each quantity with its formula.",
    pairs: [
      [t`Work done by a force at angle $\theta$ to the motion`, t`$Fd\cos\theta$`],
      ["Kinetic energy", t`$\tfrac{1}{2}mv^2$`],
      ["Gravitational potential energy", t`$mgh$`],
      [t`Work done against limiting friction over a distance $d$`, t`$\mu Rd$`],
    ],
    explanation: "All four are measured in joules; h is a vertical height and d a distance along the path.",
  });

  b.proof({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: t`A particle is released from rest at the top of a smooth curved track and descends a vertical height $h$. Show that its speed at the bottom is $\sqrt{2gh}$, and explain why it does not depend on the mass or on the shape of the track.`,
    points: [
      "B1 states that only gravity does work, because the normal reaction is perpendicular to the motion.",
      t`M1 loss of PE $=$ gain of KE: $mgh = \frac{1}{2}mv^2$.`,
      t`A1 $v = \sqrt{2gh}$; $m$ cancels and only the height $h$ appears, so the shape does not matter.`,
    ],
    modelAnswer: t`$$
\text{Smooth track: } R \perp \text{motion, so only gravity does work.}
$$
$$
mgh = \tfrac{1}{2}mv^2 \Rightarrow v^2 = 2gh \Rightarrow v = \sqrt{2gh}
$$
$$
m \text{ cancels; the energy equation involves only the vertical drop } h, \text{ not the path.}
$$`,
    explanation: "Energy methods give speeds on curved paths without knowing the acceleration.",
    hints: ["Which forces act, and which of them do work?"],
  });

  b.manualShort({
    d: 2, skill: "RECALL", calculator: false, marks: 2, applies: ZM,
    stem: "State the principle of conservation of mechanical energy, and the condition under which it applies.",
    points: [
      "The total mechanical energy (kinetic + potential) of a body or system remains constant.",
      "Condition: no work is done by external forces other than gravity (and elastic forces), e.g. no friction or air resistance.",
    ],
    modelAnswer: "If the only forces doing work on a system are gravity (and the tension in elastic strings or springs), the sum of its kinetic and potential energies stays constant. Friction or other resistances make the mechanical energy decrease.",
    explanation: "ZIMSEC asks for the principle to be stated before it is used.",
  });

  const v18 = sqrt(2 * 9.8 * 1.2);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, applies: ZM,
    stem: t`A particle is attached to one end of a light inextensible string of length $1.2$ m, whose other end is fixed at $O$. The particle is held with the string taut and horizontal and released from rest. Taking $g = 9.8$ m s$^{-2}$, find its speed when it is directly below $O$, correct to 3 significant figures.`,
    value: v18, unit: "m/s", wrong: [sqrt(9.8 * 1.2), 2 * 9.8 * 1.2],
    explanation: t`The tension is perpendicular to the motion (along the radius), so it does no work. The particle falls $1.2$ m: $\frac{1}{2}v^2 = 9.8 \times 1.2$, $v = ${f3(v18)}$ m s$^{-1}$.`,
    hints: ["The string's tension does no work on a circular path."],
  });

  b.mcq({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`A box is pulled $6$ m along level ground by a rope with tension $40$ N inclined at $60°$ to the horizontal. How much work does the tension do?`,
    options: [
      [t`$120$ J`, t`Correct: $40 \times 6 \times \cos 60° = 120$ J.`],
      [t`$208$ J`, t`This uses $\sin 60°$: the vertical component does no work.`],
      [t`$240$ J`, "This ignores the angle of the rope."],
      [t`$0$ J`, "Only a force perpendicular to the motion does no work; this rope is at 60°."],
    ],
    answer: "A",
    explanation: t`$W = Fd\cos\theta$ with $\theta = 60°$.`,
  });

  // Struct 5: water slide
  const v20 = sqrt(2 * 10 * 7.2), Wr20 = 50 * 10 * 7.2 - ke(50, 10);
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`Tatenda, of mass $50$ kg, starts from rest at the top of a curved water slide and reaches the pool $7.2$ m lower down. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find her speed at the bottom if the slide is smooth, correct to 3 significant figures.", value: v20, unit: "m/s", wrong: [144], explanation: t`$\frac{1}{2}v^2 = 10 \times 7.2$, so $v = \sqrt{144} = ${f3(v20)}$ m s$^{-1}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "In fact her speed at the bottom is 10 m/s. Find the work done against resistances.", value: Wr20, unit: "J", wrong: [ke(50, 10)], explanation: t`PE lost $= 3600$ J; KE gained $= \frac{1}{2}(50)(100) = 2500$ J; work against resistance $= ${Wr20}$ J.` }),
      P.num({ label: "(c)", marks: 1, stem: "The slide is 25 m long. Find the average resistance.", value: Wr20 / 25, unit: "N", wrong: [Wr20 / 8], explanation: t`$\frac{${Wr20}}{25} = ${Wr20 / 25}$ N (the resistance acts along the 25 m, not the 7.2 m drop).` }),
    ],
    explanation: "Energy methods work on curved paths: compare the ideal (smooth) result with the real one to find the work against resistance.",
    hints: ["Loss of PE = gain of KE + work against resistance."],
  });

  // Struct 12: truck up a hill
  const m = 5000, keLoss = ke(m, 15) - ke(m, 10), pe = m * 10 * 20, wr = 800 * 400, we = pe + wr - keLoss, Fd = we / 400;
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A truck of mass $5000$ kg travels $400$ m up a straight road, rising $20$ m vertically. Its speed falls from $15$ m s$^{-1}$ to $10$ m s$^{-1}$. The resistance to motion is a constant $800$ N. Take $g = 10$ m s$^{-2}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Find the loss of kinetic energy.", value: keLoss, unit: "J", wrong: [ke(m, 5)], explanation: t`$\frac{1}{2}(5000)(15^2 - 10^2) = ${keLoss}$ J. (Using the change in speed, $5$, gives the wrong answer: KE depends on $v^2$.)` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the gain in gravitational potential energy.", value: pe, unit: "J", wrong: [m * 10 * 400], explanation: t`$5000 \times 10 \times 20 = ${pe}$ J.` }),
      P.num({ label: "(c)", marks: 1, stem: "Find the work done against the resistance.", value: wr, unit: "J", wrong: [800 * 20], explanation: t`$800 \times 400 = ${wr}$ J.` }),
      P.num({ label: "(d)", marks: 3, stem: "Find the work done by the truck's driving force.", value: we, unit: "J", wrong: [pe + wr + keLoss, pe + wr], explanation: t`Work by driving force $-$ work against resistance $=$ gain in PE $-$ loss of KE: $W = ${pe} + ${wr} - ${keLoss} = ${we}$ J.` }),
      P.num({ label: "(e)", marks: 2, stem: "Assuming the driving force is constant, find its magnitude, correct to 3 significant figures.", value: Fd, unit: "N", wrong: [we / 20], explanation: t`$\frac{${we}}{400} = ${f3(Fd)}$ N.` }),
      P.manual({ label: "(f)", marks: 2, stem: "State one modelling assumption made in this question and its likely effect.", points: ["States an assumption: e.g. the resistance is constant (in fact it increases with speed), or the truck is a particle, or the road is a straight slope.", "Gives its effect, e.g. with a resistance that varies, the driving force found is only an average value."],
        modelAnswer: "The resistance is assumed constant at 800 N; in reality air resistance falls as the truck slows, so the true work against resistance differs and the driving force found is only an average.",
        explanation: "Good modelling answers name the assumption and say how reality differs." }),
    ],
    explanation: "The work–energy principle balances four terms: driving work, resistance work, KE change and PE change.",
    hints: ["Write a word equation before substituting.", "The speed decreases, so the KE term is a loss."],
  });
  chk(we, 1007500);

  b.card("FORMULA", "Work done by a constant force", t`$W = Fd\cos\theta$ (J), $\theta$ the angle between the force and the motion.`);
  b.card("FORMULA", "Kinetic energy", t`$\tfrac{1}{2}mv^2$`);
  b.card("FORMULA", "Gravitational potential energy", t`$mgh$, with $h$ the vertical height above a chosen level.`);
  b.card("FORMULA", "Work–energy principle", "Work by driving forces − work against resistances = gain in KE + gain in PE.");
  b.card("CONCEPT", "Conservation of mechanical energy", "If only gravity does work, KE + PE is constant, whatever the shape of the path.");
  b.card("FACT", "Forces that do no work", "Any force perpendicular to the motion: a normal reaction on a smooth surface, the tension in a pendulum string.");
  b.card("CONCEPT", "Slopes and energy", t`Moving $d$ along a slope of angle $\alpha$ changes the height by $d\sin\alpha$.`);
  b.card("CONCEPT", "Average resistance", "Work done against resistance divided by the distance travelled along the path.");
  b.card("CONCEPT", "Why use energy", "Energy methods give speeds on curved paths where the acceleration is not constant.");
});
