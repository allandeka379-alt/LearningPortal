// W1a: dynamics.newtons-laws — mass, weight, Newton's three laws, free-body diagrams, lifts, connected bodies, smooth slopes.
import { concept, P, t as raw, chk, sfStr, dpStr, table, linFit, gradient, interceptThrough, DATA, rad } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.dynamics.newtons-laws";
const g = DATA.g;

concept(K, { file: "dynamics/newtons-laws", keyPrefix: "dynamics.newtons-laws" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The Earth pulls a satellite towards it with a gravitational force. What is the Newton's third-law partner of this force?",
    options: [
      ["the gravitational pull of the satellite on the Earth", "Correct: same type, equal size, opposite direction, acting on the other body."],
      ["the centripetal force on the satellite", "This is the resultant force on the satellite (provided by the Earth's pull), not a partner force."],
      ["the satellite's weight", "The satellite's weight is the Earth's pull itself, not its partner."],
      ["the thrust of the satellite's rocket motor", "A different type of force on the same body cannot be the third-law partner."],
    ],
    answer: "A",
    explanation: "Third-law pairs act on different bodies and are of the same type. Earth pulls satellite (gravitational) ↔ satellite pulls Earth (gravitational).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`An astronaut has a mass of $80\ \text{kg}$ on Earth. On the Moon, where $g = 1.6\ \text{N kg}^{-1}$, which statement is correct?`,
    options: [
      [t`Her mass is $80\ \text{kg}$ and her weight is $128\ \text{N}$.`, "Correct: mass does not change; W = mg = 80 × 1.6."],
      [t`Her mass is $13\ \text{kg}$ and her weight is $128\ \text{N}$.`, "Mass is the amount of inertia and is the same everywhere."],
      [t`Her mass is $80\ \text{kg}$ and her weight is $785\ \text{N}$.`, "785 N is her weight on Earth; the Moon's g is smaller."],
      [t`Her mass is $128\ \text{kg}$ and her weight is $80\ \text{N}$.`, "Mass and weight have been swapped; weight is in newtons, mass in kilograms."],
    ],
    answer: "A",
    explanation: t`Mass is unchanged at $80\ \text{kg}$. Weight $W = mg = 80 \times 1.6 = 128\ \text{N}$ on the Moon (compared with $785\ \text{N}$ on Earth).`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A book rests on a table. Which pair of forces is a Newton's third-law pair?",
    options: [
      ["the book pushing down on the table and the table pushing up on the book", "Correct: contact forces on different bodies, equal and opposite."],
      ["the weight of the book and the table pushing up on the book", "Both act on the book and are different types; they balance by the first law, not the third."],
      ["the weight of the book and the weight of the table", "These are separate gravitational forces on two bodies, not an interaction pair."],
      ["the book pushing down on the table and the weight of the table", "These are different types of force with different sizes."],
    ],
    answer: "A",
    explanation: "A third-law pair is one interaction seen from both sides: book on table and table on book (both contact forces). The book's weight pairs with the book's gravitational pull on the Earth.",
  });
  {
    const R = 60 * (g - 2);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $60\ \text{kg}$ person stands in a lift that is moving upwards but slowing down with a deceleration of $2.0\ \text{m s}^{-2}$. What is the normal contact force from the floor on the person?`,
      options: [
        [t`$${sfStr(R, 3)}\ \text{N}$`, "Correct: the acceleration is 2.0 m s⁻² downwards, so R = m(g − a)."],
        [t`$${sfStr(60 * (g + 2), 3)}\ \text{N}$`, "This treats the acceleration as upwards; slowing while rising means the acceleration is downwards."],
        [t`$${sfStr(60 * g, 3)}\ \text{N}$`, "This is the weight, correct only at constant velocity."],
        [t`$120\ \text{N}$`, "ma is the resultant force, not the contact force."],
      ],
      answer: "A",
      explanation: t`Upwards positive: $a = -2.0\ \text{m s}^{-2}$. $R - mg = ma$, so $R = 60(9.81 - 2.0) = ${sfStr(R, 3)}\ \text{N}$. The person feels lighter.`,
      hints: ["A lift slowing down on the way up has a downward acceleration."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A haulage truck travels along a straight level road at a constant speed. Which statement is correct?",
    options: [
      ["The driving force is equal in size to the total resistive force.", "Correct: constant velocity means zero resultant force (first law)."],
      ["The driving force is greater than the resistive force, otherwise it would stop.", "A resultant forward force would make the truck accelerate."],
      ["There are no horizontal forces acting on the truck.", "There are driving and resistive forces; they balance."],
      ["The resultant force is in the direction of motion.", "A resultant force would cause an acceleration; here it is zero."],
    ],
    answer: "A",
    explanation: "By Newton's first law, an object moving with constant velocity has zero resultant force: the forward driving force exactly balances drag and friction.",
  });
  {
    const a = (1 * g) / 4;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $3.0\ \text{kg}$ block on a smooth horizontal table is joined by a light string over a smooth pulley to a $1.0\ \text{kg}$ mass hanging freely. What is the acceleration of the system?`,
      options: [
        [t`$${sfStr(a, 3)}\ \text{m s}^{-2}$`, "Correct: the hanging weight (9.81 N) accelerates the total mass (4.0 kg)."],
        [t`$9.81\ \text{m s}^{-2}$`, "The hanging mass would fall freely only if nothing were attached to it."],
        [t`$${sfStr(g / 3, 3)}\ \text{m s}^{-2}$`, "This divides the hanging weight by the block's mass only; both masses accelerate."],
        [t`$${sfStr((3 * g) / 4, 3)}\ \text{m s}^{-2}$`, "The block's weight is balanced by the table and does not drive the motion."],
      ],
      answer: "A",
      explanation: t`Resultant external force on the system $= 1.0 \times 9.81 = 9.81\ \text{N}$; total mass $= 4.0\ \text{kg}$; $a = 9.81/4.0 = ${sfStr(a, 3)}\ \text{m s}^{-2}$.`,
      hints: ["Treat both masses together as one system.", "Which external force is unbalanced?"],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A bucket hangs from a rope and is lowered into a borehole. While the bucket accelerates downwards from rest, how does the tension in the rope compare with the weight of the bucket?",
    options: [
      ["The tension is less than the weight.", "Correct: the resultant force must be downwards, so W − T = ma > 0."],
      ["The tension equals the weight.", "That is only true at constant velocity (zero acceleration)."],
      ["The tension is greater than the weight.", "That would give an upward resultant, an upward acceleration."],
      ["The tension is zero.", "Zero tension would mean free fall with acceleration g."],
    ],
    answer: "A",
    explanation: "For a downward acceleration the resultant force is downward, so the weight must exceed the tension: T = m(g − a).",
    hints: ["Which way does the resultant force point when the bucket accelerates downwards?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two trolleys of mass 2.0 kg and 4.0 kg are released from rest on the same smooth slope. Which statement about their accelerations is correct?",
    options: [
      ["They are equal, because a = g sin θ does not depend on mass.", "Correct: the force down the slope, mg sin θ, is proportional to m, so m cancels."],
      ["The 4.0 kg trolley's is twice as large, because the force on it is twice as large.", "Its mass is also twice as large, so the acceleration is the same."],
      ["The 2.0 kg trolley's is twice as large, because it has less inertia.", "Less inertia is matched by a smaller driving force."],
      ["Both are equal to g, because the slope is smooth.", "Only the component of weight along the slope accelerates them: g sin θ."],
    ],
    answer: "A",
    explanation: t`Along a smooth slope the resultant force is $mg\sin\theta$, so $a = \dfrac{mg\sin\theta}{m} = g\sin\theta$: the same for all masses.`,
    hints: ["Write F = ma along the slope and see what cancels."],
  });

  // Numerical and calculation items
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`Calculate the weight of an $85\ \text{kg}$ man on the Earth's surface, in N. ($g = 9.81\ \text{N kg}^{-1}$)`,
    value: 85 * g, unit: "N", wrong: [85, 85 / g],
    explanation: t`$W = mg = 85 \times 9.81 = ${sfStr(85 * g, 3)}\ \text{N}$.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: t`A $1500\ \text{kg}$ car accelerates uniformly from rest to $27\ \text{m s}^{-1}$ in $9.0\ \text{s}$. Calculate the resultant force on it, in N.`,
    value: 1500 * 3, unit: "N", wrong: [1500 * 27, 1500 / 3],
    explanation: t`1. $a = \dfrac{27 - 0}{9.0} = 3.0\ \text{m s}^{-2}$.\n2. $F = ma = 1500 \times 3.0 = 4500\ \text{N}$.`,
    hints: ["Find the acceleration first."],
  });
  {
    const a = 3.6e5 / 2.4e4 - g;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A rocket of mass $2.4 \times 10^{4}\ \text{kg}$ lifts off vertically with an engine thrust of $3.6 \times 10^{5}\ \text{N}$. Ignoring air resistance, calculate its initial acceleration, in $\text{m s}^{-2}$.`,
      value: a, unit: "m/s²", wrong: [3.6e5 / 2.4e4],
      explanation: t`1. Weight $= 2.4 \times 10^{4} \times 9.81 = 2.35 \times 10^{5}\ \text{N}$.\n2. Resultant $= 3.6 \times 10^{5} - 2.35 \times 10^{5}\ \text{N}$ upwards.\n3. $a = \dfrac{F}{m} = \dfrac{3.6 \times 10^{5}}{2.4 \times 10^{4}} - 9.81 = ${sfStr(a, 3)}\ \text{m s}^{-2}$.\n\nForgetting the weight gives $15\ \text{m s}^{-2}$.`,
      hints: ["The resultant force is thrust minus weight."],
    });
  }
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A goods lift and its load have a total mass of $800\ \text{kg}$. Calculate the tension in the cable when the lift accelerates upwards at $0.60\ \text{m s}^{-2}$, in N.`,
    value: 800 * (g + 0.6), unit: "N", wrong: [800 * g, 800 * (g - 0.6), 800 * 0.6],
    explanation: t`1. Upwards positive: $T - mg = ma$.\n2. $T = m(g + a) = 800(9.81 + 0.60)$.\n3. $T = ${sfStr(800 * (g + 0.6), 3)}\ \text{N}$.\n\nAt constant speed the tension would be $${sfStr(800 * g, 3)}\ \text{N}$.`,
    hints: ["Draw the two forces on the lift and write F = ma upwards."],
  });
  {
    const a = (9600 - 1200 - 800) / 8000;
    const T = 2000 * a + 800;
    chk(a, 0.95, 1e-12);
    chk(T, 2700, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $6000\ \text{kg}$ truck tows a $2000\ \text{kg}$ trailer along a level road. The driving force on the truck is $9600\ \text{N}$. Resistive forces are $1200\ \text{N}$ on the truck and $800\ \text{N}$ on the trailer. Calculate the tension in the tow bar, in N.`,
      value: T, unit: "N", wrong: [2000 * a, 2000 * (9600 / 8000)],
      explanation: t`1. Whole system: $a = \dfrac{9600 - 1200 - 800}{8000} = 0.95\ \text{m s}^{-2}$.\n2. Trailer: $T - 800 = 2000 \times 0.95$.\n3. $T = 1900 + 800 = 2700\ \text{N}$.\n\nForgetting the trailer's resistance gives 1900 N.`,
      hints: ["Find the common acceleration from the whole system.", "Then apply F = ma to the trailer alone, including its resistance."],
    });
  }
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A trolley runs freely down a smooth ramp inclined at $18^\circ$ to the horizontal. Calculate its acceleration, in $\text{m s}^{-2}$.`,
    value: g * Math.sin(rad(18)), unit: "m/s²", wrong: [g * Math.cos(rad(18))],
    explanation: t`$a = g\sin\theta = 9.81\sin 18^\circ = ${sfStr(g * Math.sin(rad(18)), 3)}\ \text{m s}^{-2}$ (independent of the mass).`,
    hints: ["Only the component of weight along the slope is unbalanced."],
  });

  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "An object moving at constant velocity must have no forces acting on it.",
    answer: false,
    explanation: "False. It must have zero **resultant** force; several forces can act as long as they balance (e.g. driving force and drag).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The weight of a box resting on the floor and the normal contact force of the floor on the box form a Newton's third-law pair.",
    answer: false,
    explanation: "False. Both act on the box and they are different types of force (gravitational and contact). They balance because the box is in equilibrium (first law).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each statement with the law or definition it expresses.",
    pairs: [
      ["Newton's first law", "a body stays at rest or at constant velocity unless a resultant force acts"],
      ["Newton's second law", "resultant force = mass × acceleration, in the direction of the force"],
      ["Newton's third law", "if A exerts a force on B, B exerts an equal and opposite force of the same type on A"],
      ["the newton", "the force that gives 1 kg an acceleration of 1 m s⁻²"],
    ],
    explanation: "First law: inertia; second law: F = ma; third law: interaction pairs; the newton is defined from the second law.",
  });
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mass is measured in {{blank:a}} and does not change from place to place; weight is a force measured in {{blank:b}} that depends on the gravitational field strength.",
    blanks: [
      { id: "a", accepted: ["kilograms"], choices: ["kilograms", "newtons"] },
      { id: "b", accepted: ["newtons"], choices: ["kilograms", "newtons"] },
    ],
    explanation: "Mass (kg) is a scalar measure of inertia; weight (N) = mg is a vector.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State Newton's third law of motion.",
    points: [
      "If body A exerts a force on body B, then B exerts a force on A",
      "The forces are equal in magnitude and opposite in direction",
      "They are of the same type (and act on different bodies)",
    ],
    modelAnswer: "When body A exerts a force on body B, body B exerts a force on body A that is equal in magnitude, opposite in direction and of the same type.",
    explanation: "All three points are needed: two bodies, equal and opposite, same type.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Explain why a passenger in a lift feels heavier as the lift starts to move upwards.",
    points: [
      "The passenger accelerates upwards, so the resultant force on them must be upwards",
      "So the normal contact force from the floor is greater than their weight (R = m(g + a)); this push is what they feel",
    ],
    modelAnswer: "To accelerate upwards there must be an upward resultant force, so the floor pushes up on the passenger with a force greater than their weight: R = m(g + a). The sensation of weight comes from this contact force, so they feel heavier, although their weight mg has not changed.",
    explanation: "What we feel as weight is the contact force, which changes with acceleration; the true weight mg does not.",
    hints: ["Which force on the passenger changes?"],
  });

  // Practice structured 1: a mine hoist.
  {
    const m = 2400;
    const W = m * g;
    const Tdown = m * (g - 0.8);
    const Tconst = W;
    const Tdec = m * (g + 1.2);
    const vmax = 0.8 * 5;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`A mine cage and the miners in it have a total mass of $2400\ \text{kg}$. It is lowered on a steel cable. Starting from rest it accelerates downwards at $0.80\ \text{m s}^{-2}$ for $5.0\ \text{s}$, then moves at constant velocity, and finally decelerates uniformly at $1.2\ \text{m s}^{-2}$ to stop at the bottom. Take $g = 9.81\ \text{m s}^{-2}$ and ignore friction.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the weight of the loaded cage, in N.", value: W, unit: "N", explanation: t`$W = 2400 \times 9.81 = ${sfStr(W, 3)}\ \text{N}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the tension in the cable while the cage accelerates downwards, in N.", value: Tdown, unit: "N", wrong: [m * (g + 0.8)], explanation: t`Downwards positive: $mg - T = ma$, so $T = 2400(9.81 - 0.80) = ${sfStr(Tdown, 3)}\ \text{N}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "State the tension while the cage moves at constant velocity, in N.", value: Tconst, unit: "N", explanation: t`$a = 0$, so $T = W = ${sfStr(W, 3)}\ \text{N}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the tension while the cage decelerates (still moving down), in N.", value: Tdec, unit: "N", wrong: [m * (g - 1.2)], explanation: t`The acceleration is $1.2\ \text{m s}^{-2}$ **upwards**: $T - mg = ma$, so $T = 2400(9.81 + 1.2) = ${sfStr(Tdec, 3)}\ \text{N}$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Calculate the constant speed of the cage, in $\text{m s}^{-1}$.`, value: vmax, unit: "m/s", explanation: t`$v = u + at = 0 + 0.80 \times 5.0 = 4.0\ \text{m s}^{-1}$.` }),
        P.mcq({ label: "(f)", stem: "During which stage is the cable most likely to break?", options: [["while the cage decelerates at the bottom", "Correct: the tension is greatest, m(g + a)."], ["while the cage accelerates downwards at the start", "The tension is smallest then, m(g − a)."], ["while the cage moves at constant velocity", "The tension equals the weight, less than during deceleration."], ["the tension is the same in every stage", "The tension depends on the acceleration."]], answer: "A", explanation: t`Tensions: ${sfStr(Tdown, 3)} N, ${sfStr(Tconst, 3)} N, ${sfStr(Tdec, 3)} N. The largest is while slowing a descending load, when the acceleration is upwards.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Describe the free-body diagram of the cage while it decelerates: name each force, its direction and the body that exerts it.", points: ["Weight (2400 × 9.81 N) vertically downwards, exerted by the Earth", "Tension vertically upwards, exerted by the cable, drawn larger than the weight (resultant upwards)"], modelAnswer: "Two forces act on the cage: its weight, about 23 500 N, vertically downwards, exerted by the Earth; and the tension, about 26 400 N, vertically upwards, exerted by the cable. The upward arrow is longer, giving an upward resultant, as needed for an upward acceleration." }),
        P.manual({ label: "(h)", marks: 2, stem: "The cable pulls up on the cage. State the Newton's third-law partner of this force, giving its type and direction.", points: ["The cage pulls down on the cable", "Equal in magnitude, opposite direction (downwards), same type (contact / tension force)"], modelAnswer: "The partner is the force of the cage on the cable: a downward pull of the same size, of the same type (a contact/tension force), acting on the cable rather than on the cage." }),
      ],
      explanation: t`$T = m(g - a)$ when accelerating down (${sfStr(Tdown, 3)} N), $mg$ at constant speed (${sfStr(W, 3)} N) and $m(g + a)$ when slowing down on the way down (${sfStr(Tdec, 3)} N).`,
      hints: ["Choose a positive direction and write T and mg with signs.", "Slowing down while moving down means the acceleration is upwards."],
    });
  }

  // Practice structured 2: F = ma with a trolley and hanging masses.
  {
    const F = [0.2, 0.4, 0.6, 0.8, 1.0, 1.2];
    const a = [0.16, 0.39, 0.6, 0.85, 1.06, 1.31];
    const fit = linFit(F, a);
    const pA = [0.3, Number(dpStr(fit.m * 0.3 + fit.c, 3))];
    const pB = [1.1, Number(dpStr(fit.m * 1.1 + fit.c, 3))];
    const gr = gradient(pA, pB);
    const M = 1 / gr;
    const Fint = -interceptThrough(gr, pA) / gr;
    console.log("newton FA fit", fit, pA, pB, gr, M, Fint);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, examStyle: true,
      stem: t`Nyasha pulls a trolley along a level bench with a string over a pulley to a hanger of slotted masses. She measures the acceleration $a$ with light gates for different pulling forces $F$ (the weight of the hanger and masses), keeping the total mass of trolley, hanger and masses constant by moving masses between the trolley and the hanger.\n\n${table([t`$F\,/\,\text{N}$`, ...F.map((x) => dpStr(x, 2))], [[t`$a\,/\,\text{m s}^{-2}$`, ...a.map((x) => dpStr(x, 2))]])}`,
      parts: [
        P.mcq({ label: "(a)", stem: "Which graph should she plot to test whether a is proportional to F?", options: [["a against F, expecting a straight line through the origin", "Correct: F = ma predicts a = F/m, a line through the origin of gradient 1/m."], ["a against 1/F, expecting a straight line", "a is predicted to be proportional to F, not to 1/F."], ["F against a², expecting a curve", "There is no square in F = ma."], ["a against F, expecting a curve that levels off", "With constant total mass the relation is linear."]], answer: "A", explanation: "a = F/m: a graph of a against F should be a straight line through the origin with gradient 1/m." }),
        P.num({ label: "(b)", marks: 2, stem: t`Her best-fit line passes through $(${dpStr(pA[0], 2)}\ \text{N},\ ${dpStr(pA[1], 3)}\ \text{m s}^{-2})$ and $(${dpStr(pB[0], 2)}\ \text{N},\ ${dpStr(pB[1], 3)}\ \text{m s}^{-2})$. Calculate the gradient, in $\text{kg}^{-1}$.`, value: gr, unit: "", explanation: t`Gradient $= \dfrac{${dpStr(pB[1], 3)} - ${dpStr(pA[1], 3)}}{${dpStr(pB[0], 2)} - ${dpStr(pA[0], 2)}} = ${sfStr(gr, 3)}\ \text{kg}^{-1}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Use the gradient to find the total mass being accelerated, in kg.", value: M, unit: "kg", wrong: [gr], explanation: t`Gradient $= 1/m$, so $m = 1/${sfStr(gr, 3)} = ${sfStr(M, 3)}\ \text{kg}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The line cuts the F-axis at a small positive value instead of passing through the origin. Explain what this shows.", points: ["A small force is needed before the trolley accelerates at all", "This is friction (in the wheels / pulley), which is subtracted from F: resultant = F − friction, so a = (F − f)/m (the gradient is unaffected)"], modelAnswer: t`The trolley does not accelerate until $F$ exceeds a small value, about $${sfStr(Fint, 1)}\ \text{N}$, because friction in the wheels and pulley opposes the motion. The resultant force is $F - f$, so $a = (F - f)/m$: the line is shifted along the $F$-axis but its gradient, $1/m$, is unchanged.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why masses were moved from the trolley to the hanger, rather than added to the hanger from the bench, to increase F.", points: ["F accelerates the whole system: trolley + hanger + masses", "Moving masses keeps the total accelerated mass constant, so a ∝ F can be tested (adding masses would change m as well as F)"], modelAnswer: "The pulling force accelerates the trolley, the hanger and all the masses together. Moving a mass from the trolley to the hanger increases F while keeping the total mass constant, so only one variable changes; adding masses from the bench would increase the mass as well and the graph would not be a straight line." }),
      ],
      explanation: t`Gradient of $a$ against $F$ $= 1/m = ${sfStr(gr, 3)}\ \text{kg}^{-1}$, so $m = ${sfStr(M, 3)}\ \text{kg}$; the intercept on the $F$-axis shows friction.`,
      hints: ["F = ma gives a = F/m.", "The gradient is 1/m."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Mass", "The property of a body that resists a change in its motion (inertia); a scalar in kg.");
  b.card("DEFINITION", "Weight", t`The gravitational force on a mass, $W = mg$, towards the centre of the Earth; a vector in N.`);
  b.card("DEFINITION", "Newton's first law", "A body stays at rest or moves at constant velocity unless a resultant force acts on it.");
  b.card("DEFINITION", "Newton's second law (constant mass)", "Resultant force = mass × acceleration, with the acceleration in the direction of the resultant force.");
  b.card("DEFINITION", "Newton's third law", "If A exerts a force on B, B exerts on A a force equal in magnitude, opposite in direction and of the same type.");
  b.card("CONCEPT", "Features of a third-law pair", "Different bodies, same type, equal size, opposite directions, same line of action.");
  b.card("FORMULA", "Contact force in a lift accelerating at a", t`Upwards: $R = m(g + a)$; downwards: $R = m(g - a)$; constant velocity: $R = mg$.`);
  b.card("FORMULA", "Acceleration on a smooth slope", t`$a = g\sin\theta$, independent of the mass.`);
  b.card("CONCEPT", "Connected bodies", "Same acceleration: find a from the whole system, then the tension from one body.");
});
