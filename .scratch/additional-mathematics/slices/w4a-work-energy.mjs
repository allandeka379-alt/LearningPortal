// W4a: amath.mechanics.work-energy (ZIMSEC only)
import { concept, P, t, chk, rad, steps } from "../lib.mjs";

const { cos, sqrt } = Math;
const g = 9.8;

concept("amath.mechanics.work-energy", { file: "mechanics/work-energy", keyPrefix: "mechanics.work-energy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In which unit is work measured?",
    options: [
      ["The joule", "Correct: 1 J is the work done when a force of 1 N moves its point of application 1 m."],
      ["The watt", "The watt is the unit of power, the rate of doing work."],
      ["The newton", "The newton is the unit of force."],
      ["The kilogram metre", "This is not a unit of work; work is newtons times metres."],
    ],
    answer: "A",
    explanation: "Work = force × distance, so its unit is the newton metre, called the joule (J). Energy is measured in the same unit.",
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "When a box slides along a horizontal floor, the normal reaction of the floor does no work on the box.",
    answer: true,
    explanation: "True. The normal reaction is perpendicular to the motion, so it has no component along the direction of motion and does no work (cos 90° = 0).",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A ball of mass 0.4 kg moves at 15 m/s. Find its kinetic energy.",
    value: 0.5 * 0.4 * 15 ** 2, unit: "J", wrong: [0.4 * 225, 3],
    explanation: t`$\text{KE} = \frac{1}{2}mv^2 = \frac{1}{2}(0.4)(225) = 45$ J. Forgetting the $\frac{1}{2}$ gives 90 J; not squaring gives 3 J.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A 25 kg bag of fertiliser is lifted 3.2 m onto a lorry. Take g = 9.8 m/s². Find its gain in gravitational potential energy.",
    value: 25 * g * 3.2, unit: "J", wrong: [25 * 3.2],
    explanation: t`$\text{PE} = mgh = 25 \times 9.8 \times 3.2 = 784$ J.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Tendai pushes a wheelbarrow 12 m along a level path with a constant horizontal force of 80 N. Find the work done by the push.",
    value: 80 * 12, unit: "J", wrong: [80 / 12],
    explanation: t`$W = Fd = 80 \times 12 = 960$ J.`,
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A box is dragged 18 m across a floor by a rope inclined at 20° above the horizontal, with tension 45 N. Find the work done by the tension, correct to 3 significant figures.",
    value: 45 * 18 * cos(rad(20)), unit: "J", wrong: [45 * 18, 45 * 18 * Math.sin(rad(20))],
    explanation: t`Only the component along the motion does work: $W = 45\cos 20^\circ \times 18 = 761$ J. Using the full tension gives 810 J.`,
    hints: [t`Work $= Fd\cos\theta$, where $\theta$ is the angle between the force and the motion.`],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A child slides from rest down a smooth playground slide whose top is 3.6 m vertically above its bottom. Take g = 9.8 m/s². Use conservation of energy to find her speed at the bottom.",
    value: sqrt(2 * g * 3.6), unit: "m/s", wrong: [2 * g * 3.6, g * 3.6],
    explanation: t`PE lost = KE gained: $mg(3.6) = \frac{1}{2}mv^2$, so $v^2 = 70.56$ and $v = 8.4$ m s$^{-1}$. The mass cancels and the length of the slide does not matter.`,
    hints: ["The slide is smooth, so mechanical energy is conserved.", "Only the vertical drop matters."],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A ball is thrown vertically upwards at 12 m/s. Take g = 9.8 m/s² and ignore air resistance. Use an energy method to find the greatest height it reaches, correct to 3 significant figures.",
    value: 144 / (2 * g), unit: "m", wrong: [144 / g, 12 / g],
    explanation: t`KE lost = PE gained: $\frac{1}{2}m(12^2) = mgh$, so $h = \frac{144}{19.6} = 7.35$ m. Forgetting the $\frac{1}{2}$ gives 14.7 m.`,
    hints: ["At the top all the kinetic energy has become potential energy."],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A car of mass 1500 kg accelerates from 10 m/s to 20 m/s along a level road. Find the gain in its kinetic energy.",
    value: 0.5 * 1500 * (20 ** 2 - 10 ** 2), unit: "J", wrong: [0.5 * 1500 * 10 ** 2, 0.5 * 1500 * 10],
    explanation: t`$\Delta\text{KE} = \frac{1}{2}(1500)(20^2 - 10^2) = 750 \times 300 = 225\,000$ J (225 kJ). Using $(20 - 10)^2$ gives only 75 000 J.`,
    hints: [t`$\frac{1}{2}m(v^2 - u^2)$, not $\frac{1}{2}m(v - u)^2$.`],
  });

  {
    const R = (0.5 * 0.05 * 300 ** 2) / 0.12;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "A 0.05 kg pellet travelling horizontally at 300 m/s enters a fixed block of wood and stops after penetrating 0.12 m. Use the work–energy principle to find the constant resistance of the wood.",
      value: R, unit: "N", wrong: [(0.05 * 300 ** 2) / 0.12, (0.5 * 0.05 * 300) / 0.12],
      explanation: t`KE lost $= \frac{1}{2}(0.05)(300^2) = 2250$ J = work against resistance $= R(0.12)$, so $R = 18\,750$ N.`,
      workedSolution: steps(
        t`KE at entry $= \frac{1}{2} \times 0.05 \times 90\,000 = 2250$ J.`,
        t`All of it is used against the resistance: $0.12R = 2250$.`,
        t`$R = 18\,750$ N.`,
      ),
      hints: ["All the kinetic energy is used doing work against the resistance."],
    });
  }

  {
    const ke = 15 * g * 3 - 30 * 8;
    chk(ke, 201, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 15 kg sack slides from rest down a rough chute 8 m long whose lower end is 3 m vertically below its upper end. The frictional force is a constant 30 N. Take g = 9.8 m/s². Find the speed of the sack at the bottom, correct to 3 significant figures.",
      value: sqrt((2 * ke) / 15), unit: "m/s", wrong: [sqrt(2 * g * 3), sqrt((2 * (15 * g * 8 - 30 * 8)) / 15)],
      explanation: t`PE lost $= 15(9.8)(3) = 441$ J; work against friction $= 30 \times 8 = 240$ J; KE gained $= 201$ J. $\frac{1}{2}(15)v^2 = 201$ gives $v = 5.18$ m s$^{-1}$. Ignoring friction gives 7.67.`,
      workedSolution: steps(
        t`PE lost $= mgh = 441$ J (vertical drop 3 m).`,
        t`Work against friction $= 30 \times 8 = 240$ J (along the chute).`,
        t`KE at the bottom $= 441 - 240 = 201$ J.`,
        t`$v = \sqrt{\frac{2 \times 201}{15}} = 5.18$ m s$^{-1}$.`,
      ),
      hints: ["PE uses the vertical drop; friction acts along the whole 8 m."],
    });
  }

  {
    const W = 0.5 * 20 * 9 + 20 * g * 2.5 + 40 * 10;
    chk(W, 980, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "A 20 kg crate is pulled 10 m up a rough ramp, rising 2.5 m vertically, by a rope parallel to the ramp. It starts from rest and reaches 3 m/s at the top. The friction is a constant 40 N. Take g = 9.8 m/s². Find the work done by the rope.",
      value: W, unit: "J", wrong: [W - 400, 0.5 * 20 * 9 + 20 * g * 10 + 400],
      explanation: t`Work by rope = KE gain + PE gain + work against friction $= 90 + 490 + 400 = 980$ J. Using the 10 m slope length for the PE gives 2450 J, far too much.`,
      workedSolution: steps(
        t`KE gained $= \frac{1}{2}(20)(3^2) = 90$ J.`,
        t`PE gained $= 20(9.8)(2.5) = 490$ J.`,
        t`Work against friction $= 40 \times 10 = 400$ J.`,
        t`Work by rope $= 980$ J (so the tension is 98 N).`,
      ),
      hints: ["Energy in (rope) = KE gained + PE gained + work against friction."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A car travels along a straight level road. Which two forces on the car do no work?",
    options: [
      ["Its weight and the normal reaction", "Correct: both are vertical, perpendicular to the horizontal motion."],
      ["The driving force and the resistance", "These act along the motion: the driving force does positive work, the resistance negative work."],
      ["Its weight and the driving force", "The driving force acts along the motion and does work."],
      ["The resistance and the normal reaction", "The resistance acts along the motion, so work is done against it."],
    ],
    answer: "A",
    explanation: "A force does work only if it has a component along the motion. Vertical forces do no work when the motion is horizontal.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Two smooth slides start at the same height and end at the same lower level, but one is twice as long as the other. Children start from rest at the top. How do their speeds at the bottom compare?",
    options: [
      ["They are the same", "Correct: with no friction, ½mv² = mgh and only the vertical drop h matters."],
      ["Faster on the longer slide", "A longer slide is less steep; the smaller acceleration acts for longer, and the speeds come out equal."],
      ["Faster on the shorter slide", "The steeper slide gives a larger acceleration but over a shorter distance."],
      ["It depends on each child's mass", "The mass cancels from mgh = ½mv²."],
    ],
    answer: "A",
    explanation: t`Mechanical energy is conserved on a smooth slide: $v = \sqrt{2gh}$, which depends only on the vertical height $h$.`,
    hints: ["Use energy, not forces."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A kombi doubles its speed. What happens to its kinetic energy?",
    options: [
      ["It is multiplied by 4", "Correct: KE ∝ v², and 2² = 4."],
      ["It is multiplied by 2", "This treats KE as proportional to v instead of v²."],
      ["It is multiplied by 8", "KE depends on the square of the speed, not the cube."],
      ["It stays the same", "Kinetic energy depends on speed, so it must change."],
    ],
    answer: "A",
    explanation: t`$\frac{1}{2}m(2v)^2 = 4 \times \frac{1}{2}mv^2$. This is why stopping distances grow so quickly with speed.`,
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each quantity with its formula.",
    pairs: [
      [t`Work done by a force $F$ at angle $\theta$ to the motion over distance $d$`, t`$Fd\cos\theta$`],
      ["Kinetic energy", t`$\frac{1}{2}mv^2$`],
      ["Gain in gravitational potential energy", t`$mgh$`],
      [t`Work done against a constant resistance $R$ over distance $d$`, t`$Rd$`],
    ],
    explanation: "These four expressions make up every work–energy equation: energy in from forces, changes in KE and PE, and energy lost to resistance.",
  });

  b.proof({
    d: 4, skill: "ANALYSIS", calculator: false, marks: 3,
    stem: t`A particle starts from rest and slides down a smooth curved track, ending a vertical height $h$ below its starting point. Show that its speed at the end is $\sqrt{2gh}$, whatever the shape of the track.`,
    points: [
      t`M1 states that the normal reaction is perpendicular to the motion, so only gravity does work and mechanical energy is conserved.`,
      t`M1 equates PE lost $mgh$ with KE gained $\frac{1}{2}mv^2$.`,
      t`A1 cancels $m$ and reaches $v = \sqrt{2gh}$.`,
    ],
    modelAnswer: t`The track is smooth, so the only other force, the normal reaction, is always perpendicular to the motion and does no work. Mechanical energy is conserved:

$$
\tfrac{1}{2}mv^2 = mgh
$$

$$
v^2 = 2gh \quad\Rightarrow\quad v = \sqrt{2gh}
$$

Neither the shape nor the length of the track appears, only $h$.`,
    explanation: "Energy methods need only the start and end positions.",
    hints: ["Which forces do work on the particle?"],
  });

  {
    const pe = 12 * g * 15;
    const ke = 0.5 * 12 * 4;
    const W = pe + ke;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "A 12 kg bucket of water is raised 15 m from rest up a borehole shaft by a rope. It is moving upwards at 2 m/s when it reaches the top. Take g = 9.8 m/s² and ignore resistances.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the gain in potential energy of the bucket.", value: pe, unit: "J", wrong: [12 * 15],
          explanation: t`$mgh = 12 \times 9.8 \times 15 = 1764$ J.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the gain in kinetic energy of the bucket.", value: ke, unit: "J", wrong: [48],
          explanation: t`$\frac{1}{2}(12)(2^2) = 24$ J.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the work done by the tension in the rope.", value: W, unit: "J", wrong: [pe],
          explanation: t`Work by the tension = gain in KE + gain in PE $= 1788$ J.` }),
        P.num({ label: "(d)", marks: 1, stem: "Assuming the tension is constant, find it, correct to 3 significant figures.", value: W / 15, unit: "N", wrong: [12 * g],
          explanation: t`$T \times 15 = 1788$, so $T = 119$ N.` }),
        P.num({ label: "(e)", marks: 2, stem: "At the top the bucket slips off the rope while still moving upwards at 2 m/s and falls back down the shaft. Find its speed when it has fallen back to the starting level, correct to 3 significant figures.", value: sqrt(4 + 2 * g * 15), unit: "m/s", wrong: [sqrt(2 * g * 15)],
          explanation: t`Energy conserved from the top: $\frac{1}{2}v^2 = \frac{1}{2}(2^2) + 9.8(15)$, so $v^2 = 298$ and $v = 17.3$ m s$^{-1}$.` }),
      ],
      explanation: "The work done by the tension supplies both the kinetic and the potential energy. In free motion afterwards, mechanical energy is conserved.",
      hints: ["Work by the tension = KE gain + PE gain.", "In (e), it starts with KE from 2 m/s as well as PE."],
    });
  }

  {
    const h = 500 / 20;
    const pe = 1000 * g * h;
    const ke = 0.5 * 1000 * (19 ** 2 - 11 ** 2);
    const wr = 600 * 500;
    const we = pe + ke + wr;
    chk(we, 665000, 1e-6);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: t`A car of mass 1000 kg travels 500 m up a straight road inclined at an angle $\theta$ to the horizontal, where $\sin\theta = \frac{1}{20}$. Its speed increases from 11 m/s to 19 m/s. The resistance to motion is a constant 600 N. Take g = 9.8 m/s².`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the gain in potential energy.", value: pe, unit: "J", wrong: [1000 * g * 500],
          explanation: t`Height gained $= 500 \times \frac{1}{20} = 25$ m; $\text{PE} = 1000 \times 9.8 \times 25 = 245\,000$ J.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the gain in kinetic energy.", value: ke, unit: "J", wrong: [0.5 * 1000 * 64],
          explanation: t`$\frac{1}{2}(1000)(19^2 - 11^2) = 500 \times 240 = 120\,000$ J.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the work done against the resistance.", value: wr, unit: "J", wrong: [600 * 25],
          explanation: t`$600 \times 500 = 300\,000$ J.` }),
        P.num({ label: "(d)", marks: 2, stem: "Hence find the work done by the car's engine.", value: we, unit: "J", wrong: [pe + ke, we - 2 * wr],
          explanation: t`Work by engine $= 245\,000 + 120\,000 + 300\,000 = 665\,000$ J.` }),
        P.num({ label: "(e)", marks: 2, stem: "Assuming the driving force is constant, find it.", value: we / 500, unit: "N", wrong: [(pe + ke) / 500],
          explanation: t`$F \times 500 = 665\,000$, so $F = 1330$ N.` }),
      ],
      explanation: "Work–energy principle: work by the engine = gain in PE + gain in KE + work against resistance. The PE uses the vertical height, the resistance the distance along the road.",
      hints: ["Vertical height = 500 sin θ.", "Energy in from the engine pays for all three."],
    });
  }

  b.card("DEFINITION", "Work done by a constant force", "Force × distance moved in the direction of the force. Unit: the joule (J = N m).");
  b.card("FORMULA", "Work done by a force at angle θ to the motion", t`$W = Fd\cos\theta$`);
  b.card("FORMULA", "Kinetic energy", t`$\text{KE} = \tfrac{1}{2}mv^2$`);
  b.card("FORMULA", "Gravitational potential energy", t`$\text{PE} = mgh$, with $h$ the vertical height above the zero level.`);
  b.card("CONCEPT", "Conservation of mechanical energy", "If only gravity does work (no friction or resistance, no driving force), KE + PE stays constant.");
  b.card("FORMULA", "Work–energy principle", "Work by driving forces − work against resistances = gain in KE + gain in PE.");
  b.card("FACT", "Forces that do no work", "Any force perpendicular to the motion, e.g. the normal reaction on a body sliding along a surface.");
  b.card("FACT", "Speed at the bottom of a smooth slope from rest", t`$v = \sqrt{2gh}$, independent of the mass, length and shape of the slope.`);
});
