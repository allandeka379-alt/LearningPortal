// W4a: amath.mechanics.newtons-laws (ZIMSEC only)
import { concept, P, t, chk, suvat, steps } from "../lib.mjs";

const { sqrt } = Math;
const g = 9.8;

concept("amath.mechanics.newtons-laws", { file: "mechanics/newtons-laws", keyPrefix: "mechanics.newtons-laws" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which statement is Newton's first law of motion?",
    options: [
      ["A body keeps a constant velocity unless a resultant force acts on it", "Correct: with no resultant force there is no change in velocity (rest is velocity zero)."],
      ["The resultant force on a body equals its mass times its acceleration", "This is Newton's second law, F = ma."],
      ["Every force has an equal and opposite force acting on another body", "This is Newton's third law."],
      ["A body falls with acceleration g whatever its mass is", "This is a result about free fall, not one of Newton's three laws."],
    ],
    answer: "A",
    explanation: "First law: rest or uniform motion in a straight line continues unless a resultant force acts. Second law: F = ma. Third law: action and reaction are equal and opposite on different bodies.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A book rests on a table. The Earth pulls the book down with its weight. According to Newton's third law, what is the partner of this force?",
    options: [
      ["The book pulling the Earth upwards", "Correct: a gravitational force on the Earth from the book, equal and opposite."],
      ["The table pushing the book upwards", "This acts on the same body (the book) and is a contact force, so it is not the third-law partner."],
      ["The book pushing the table downwards", "This is the partner of the normal reaction, not of the weight."],
      ["The table's own weight acting downwards", "The table's weight is a separate force between the table and the Earth."],
    ],
    answer: "A",
    explanation: "Third-law pairs act on different bodies and are of the same type. Earth pulls book (gravity) pairs with book pulls Earth (gravity).",
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "A kombi moving along a straight level road at a constant 25 m/s has zero resultant force acting on it.",
    answer: true,
    explanation: "True. Constant velocity means zero acceleration, so by F = ma the resultant force is zero: the driving force balances the resistances.",
  });

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Which combination of SI units is equal to one newton?",
    options: [
      [t`kg m s$^{-2}$`, "Correct: F = ma, so 1 N = 1 kg × 1 m/s²."],
      [t`kg m s$^{-1}$`, "This is the unit of momentum (mass × velocity)."],
      [t`kg m$^{2}$ s$^{-2}$`, "This is the joule, the unit of energy."],
      [t`kg s$^{-2}$`, "The metre is missing: acceleration is in m/s²."],
    ],
    answer: "A",
    explanation: t`From $F = ma$: newtons = kilograms × metres per second squared.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A resultant force of 18 N acts on a particle of mass 4 kg. Find its acceleration.",
    value: 18 / 4, unit: "m/s²", wrong: [72, 14],
    explanation: t`$a = \frac{F}{m} = \frac{18}{4} = 4.5$ m s$^{-2}$. Multiplying gives 72, which is not an acceleration.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "A car of mass 1500 kg accelerates at 1.2 m/s². Find the resultant force on it.",
    value: 1500 * 1.2, unit: "N", wrong: [1250],
    explanation: t`$F = ma = 1500 \times 1.2 = 1800$ N.`,
  });

  b.calc({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "A pick-up truck of mass 1000 kg has a driving force of 2400 N and experiences resistance of 900 N. Find its acceleration.",
    value: (2400 - 900) / 1000, unit: "m/s²", wrong: [2.4, 3.3],
    explanation: t`Resultant $= 2400 - 900 = 1500$ N, so $a = \frac{1500}{1000} = 1.5$ m s$^{-2}$. Ignoring the resistance gives 2.4.`,
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Chipo, of mass 45 kg, stands on a bathroom scale in a lift that is accelerating downwards at 1.2 m/s². Take g = 9.8 m/s². Find the reaction of the scale on her.",
    value: 45 * (g - 1.2), unit: "N", wrong: [45 * (g + 1.2), 45 * g],
    explanation: t`Downwards positive: $45(9.8) - R = 45(1.2)$, so $R = 45(8.6) = 387$ N, less than her weight (441 N). Adding the accelerations (495 N) is the case of upward acceleration.`,
    hints: ["Take the direction of the acceleration as positive.", "Weight minus reaction gives the resultant force."],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A crane lifts a 300 kg load of bricks vertically with an upward acceleration of 0.5 m/s². Take g = 9.8 m/s². Find the tension in the cable.",
    value: 300 * (g + 0.5), unit: "N", wrong: [300 * (g - 0.5), 150],
    explanation: t`Upwards positive: $T - 300(9.8) = 300(0.5)$, so $T = 300(10.3) = 3090$ N. The value 150 N is only the resultant force.`,
    hints: ["The resultant force is T − mg."],
  });

  {
    const r = suvat({ u: 20, v: 0, s: 40 });
    chk(r.a, -5);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A car of mass 1100 kg travelling at 20 m/s brakes uniformly and stops in 40 m. Ignoring other resistances, find the braking force.",
      value: 1100 * -r.a, unit: "N", wrong: [1100 * 10, 1100 * 0.5],
      explanation: t`$0 = 400 + 2a(40)$ gives $a = -5$ m s$^{-2}$, so the braking force is $1100 \times 5 = 5500$ N. Using $v^2 = 2as$ without the 2 gives a deceleration of 10.`,
      workedSolution: steps(
        t`$v^2 = u^2 + 2as$: $0 = 400 + 80a$, so $a = -5$ m s$^{-2}$.`,
        t`Newton's second law: braking force $= 1100 \times 5 = 5500$ N.`,
      ),
      hints: ["Find the deceleration from the equations of motion first."],
    });
  }

  {
    const a = (15 - 5) / 20;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "A lorry of mass 8000 kg on the Beitbridge road has a constant driving force of 12 000 N. It accelerates uniformly from 5 m/s to 15 m/s in 20 s. Find the resistance to its motion, assumed constant.",
      value: 12000 - 8000 * a, unit: "N", wrong: [8000 * a, 12000],
      explanation: t`$a = \frac{15 - 5}{20} = 0.5$ m s$^{-2}$. N2L: $12000 - R = 8000 \times 0.5 = 4000$, so $R = 8000$ N. The value 4000 N is the resultant force, not the resistance.`,
      workedSolution: steps(
        t`$a = \frac{v - u}{t} = \frac{10}{20} = 0.5$ m s$^{-2}$.`,
        t`$12000 - R = 8000 \times 0.5$.`,
        t`$R = 8000$ N.`,
      ),
      hints: ["Use v = u + at to find a.", "Resultant force = driving force − resistance."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A passenger stands on a scale in a lift. In which situation does the scale read more than the passenger's weight?",
    options: [
      ["The lift accelerates upwards", "Correct: R − mg = ma with a upwards, so R > mg."],
      ["The lift accelerates downwards", "Then mg − R = ma and the reading is less than the weight."],
      ["The lift moves up at constant speed", "Constant speed means a = 0 and R = mg."],
      ["The lift moves down at constant speed", "Constant speed means a = 0 and R = mg."],
    ],
    answer: "A",
    explanation: "The reading is R. With acceleration a upwards, R = m(g + a) > mg. (A lift slowing down on its way down also accelerates upwards.)",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A lift is moving downwards and slowing down. How does the reaction R of the floor on a passenger of mass m compare with mg?",
    options: [
      [t`$R > mg$`, "Correct: slowing while moving down means the acceleration is upwards."],
      [t`$R < mg$`, "This happens when the acceleration is downwards: speeding up on the way down."],
      [t`$R = mg$`, "This needs zero acceleration, but the lift is slowing down."],
      [t`$R = 0$`, "R = 0 only in free fall, with acceleration g downwards."],
    ],
    answer: "A",
    explanation: t`The velocity is downwards and decreasing, so the acceleration is upwards: $R - mg = ma$ gives $R = m(g + a) > mg$.`,
    hints: ["Which way does the acceleration point when a downward velocity decreases?"],
  });

  {
    const v = sqrt(2 * g * 5);
    const dec = (v * v) / (2 * 0.04);
    const F = 0.2 * (dec + g);
    chk(F, 246.96, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "A 0.2 kg stone falls from rest through 5 m onto soft sand and sinks 0.04 m into the sand before stopping. Take g = 9.8 m/s² and assume the resistance of the sand is constant. Find the resistance of the sand, correct to 3 significant figures.",
      value: F, unit: "N", wrong: [0.2 * dec, 0.2 * (dec - g)],
      explanation: t`Speed at the sand: $v^2 = 2(9.8)(5) = 98$. In the sand: $0 = 98 + 2a(0.04)$, so $a = -1225$ m s$^{-2}$. Downwards positive: $0.2(9.8) - R = 0.2(-1225)$, so $R = 245 + 1.96 = 247$ N. Leaving out the weight gives 245 N.`,
      workedSolution: steps(
        t`Free fall: $v^2 = 0 + 2(9.8)(5) = 98$.`,
        t`In the sand: $0 = 98 + 2a(0.04)$, so $a = -1225$ m s$^{-2}$.`,
        t`N2L (downwards): $1.96 - R = 0.2(-1225) = -245$.`,
        t`$R = 246.96 \approx 247$ N.`,
      ),
      hints: ["Two stages: free fall, then deceleration in the sand.", "The weight still acts while the stone is in the sand."],
    });
  }

  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A resultant force of 30 N gives a trolley an acceleration of 6 m/s². Find the mass of the trolley, and the acceleration that a resultant force of 45 N would give it.",
    template: "mass = {{blank:m}} kg, new acceleration = {{blank:a}} m/s²",
    blanks: [{ id: "m", input: "number", accepted: [30 / 6], wrong: "180" }, { id: "a", input: "number", accepted: [45 / 5], wrong: "7.5" }],
    explanation: t`$m = \frac{30}{6} = 5$ kg; then $a = \frac{45}{5} = 9$ m s$^{-2}$.`,
    hints: ["Use F = ma twice."],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each law or rule with its content.",
    pairs: [
      ["Newton's first law", "No resultant force means constant velocity or rest"],
      ["Newton's second law", "Resultant force equals mass times acceleration"],
      ["Newton's third law", "Forces between two bodies are equal and opposite"],
      ["Weight", "The force of gravity on a body, mg"],
    ],
    explanation: "The three laws and the definition of weight are the starting point for every dynamics question.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "A bag of maize meal rests on a shelf. Explain why its weight and the normal reaction of the shelf on it are NOT a pair of forces in the sense of Newton's third law, even though they are equal and opposite.",
    points: [
      "Both forces act on the same body (the bag); a third-law pair acts on two different bodies.",
      "They are equal only because the bag is in equilibrium (first or second law); they are of different types (gravity and contact).",
    ],
    modelAnswer: "Newton's third-law pairs act on different bodies and are of the same type. The weight (Earth on bag) and the reaction (shelf on bag) both act on the bag, and one is gravitational while the other is a contact force. They are equal only because the bag has no acceleration. The partner of the weight is the bag's pull on the Earth; the partner of the reaction is the bag's push on the shelf.",
    explanation: "Ask 'which body does each force act on?'",
    hints: ["Which body does each force act on?"],
  });

  {
    const T = 680 * (g + 1.5);
    const Rm = 80 * (g - 1);
    const v = 1.5 * 2;
    const s = 0.5 * 1.5 * 4 + v * 4 + (v * v) / 2;
    chk(s, 19.5);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: "A lift of mass 600 kg carries a passenger of mass 80 kg. From rest it accelerates upwards at 1.5 m/s² for 2 s, moves at constant speed for 4 s, then decelerates at 1 m/s² until it stops. Take g = 9.8 m/s².",
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Find the tension in the lift cable while the lift accelerates.", value: T, unit: "N", wrong: [600 * (g + 1.5), 680 * g],
          explanation: t`Lift and passenger together: $T - 680(9.8) = 680(1.5)$, so $T = 680(11.3) = 7684$ N.` }),
        P.num({ label: "(b)", marks: 2, stem: "Find the reaction of the floor on the passenger while the lift decelerates.", value: Rm, unit: "N", wrong: [80 * (g + 1), 80 * g],
          explanation: t`Moving up and slowing, so the acceleration is 1 m s$^{-2}$ downwards: $80(9.8) - R = 80(1)$, $R = 704$ N.` }),
        P.num({ label: "(c)", marks: 3, stem: "Find the total distance the lift rises.", value: s, unit: "m", wrong: [15, 3 + 12 + 9],
          explanation: t`Top speed $= 1.5 \times 2 = 3$ m s$^{-1}$. Distances: $\frac{1}{2}(1.5)(2^2) = 3$, $3 \times 4 = 12$, and $\frac{3^2}{2(1)} = 4.5$. Total 19.5 m.` }),
      ],
      explanation: "Treat the lift and passenger as one body for the cable tension, and the passenger alone for the floor reaction. The equations of motion give the distance stage by stage.",
      hints: ["For the cable, the mass is 680 kg.", "While slowing on the way up, the acceleration points downwards."],
    });
  }

  {
    const a = (3200 - 500 - 220) / 1600;
    const T = 220 + 400 * a;
    const d = 220 / 400;
    const s = (16 * 16) / (2 * d);
    chk(3200 - 500 - T, 1200 * a, 1e-9);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "A car of mass 1200 kg tows a trailer of mass 400 kg along a straight level road using a light rigid tow bar. The engine's driving force is 3200 N. The resistances to motion are 500 N on the car and 220 N on the trailer.",
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Find the acceleration of the car and trailer.", value: a, unit: "m/s²", wrong: [3200 / 1600, 2700 / 1600],
          explanation: t`Whole system: $3200 - 500 - 220 = 1600a$, so $a = \frac{2480}{1600} = 1.55$ m s$^{-2}$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Find the tension in the tow bar.", value: T, unit: "N", wrong: [400 * a, 3200 - 500],
          explanation: t`Trailer alone: $T - 220 = 400(1.55)$, so $T = 840$ N. Check with the car: $3200 - 500 - 840 = 1860 = 1200(1.55)$.` }),
        P.num({ label: "(c)", marks: 1, stem: "When the speed is 16 m/s the tow bar breaks. Find the deceleration of the trailer.", value: d, unit: "m/s²", wrong: [220 / 1600],
          explanation: t`Only the resistance acts: $a = \frac{220}{400} = 0.55$ m s$^{-2}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Find how far the trailer travels after the tow bar breaks before it stops, correct to 3 significant figures.", value: s, unit: "m", wrong: [(16 * 16) / d],
          explanation: t`$0 = 16^2 - 2(0.55)s$, so $s = \frac{256}{1.1} = 233$ m.` }),
      ],
      explanation: "Apply F = ma to the whole system for the acceleration (the tow bar tension is internal), then to the trailer alone for the tension.",
      hints: ["The tension in the tow bar does not appear when you treat car and trailer together.", "After the break, only the resistance acts on the trailer."],
    });
  }

  b.card("DEFINITION", "Newton's first law", "A body remains at rest or moves with constant velocity unless a resultant force acts on it.");
  b.card("FORMULA", "Newton's second law", t`$F = ma$, where $F$ is the resultant force (N), $m$ the mass (kg), $a$ the acceleration (m s$^{-2}$).`);
  b.card("DEFINITION", "Newton's third law", "If A exerts a force on B, then B exerts an equal and opposite force on A. The pair acts on different bodies.");
  b.card("FORMULA", "Lift accelerating upwards at a", t`Reaction on a passenger: $R = m(g + a)$.`);
  b.card("FORMULA", "Lift accelerating downwards at a", t`Reaction on a passenger: $R = m(g - a)$.`);
  b.card("CONCEPT", "Constant velocity", "Zero acceleration, so the resultant force is zero: driving force = resistance.");
  b.card("CONCEPT", "Connected bodies in a line (tow bar)", "Whole system for the acceleration (internal tension cancels); one body alone for the tension.");
  b.card("FACT", "Mass and weight", "Mass in kg is the same everywhere; weight W = mg in newtons depends on g.");
});
