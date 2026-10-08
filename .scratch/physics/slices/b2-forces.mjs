import { concept, P, t } from "../lib.mjs";

const r = (x, n = 3) => Number(x.toPrecision(n));
const Z = ["zimsec"];
const C = ["cambridge"];

// =====================================================================================================================
concept("phys.forces.moments", {
  file: "forces/moments",
  keyPrefix: "forces.moments",
  objectives: { cambridge: ["1.5.2.2", "1.5.2.3"], zimsec: ["3.4.1", "3.4.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the moment of a force about a pivot?",
    options: [["Force × perpendicular distance from the pivot to the line of the force", "Correct."], ["Force ÷ distance from the pivot", "Multiply, do not divide."], ["Force × time", "That is impulse."], ["Mass × velocity", "That is momentum."]],
    answer: "A", explanation: "Moment = force × perpendicular distance from the pivot; it measures the turning effect." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the unit of the moment of a force?",
    options: [["N", "That is the unit of force."], ["N m", "Correct."], ["N/m", "That is the unit of a spring constant."], ["J/s", "That is the watt."]],
    answer: "B", explanation: "Force (N) × distance (m) gives N m." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A force of $45\ \text{N}$ is applied at right angles to a door, $0.80\ \text{m}$ from its hinges. Calculate the moment about the hinges.`,
    value: 36, unit: "N m", wrong: [56.25, 0.0178, 45.8],
    explanation: t`Moment $= F \times d = 45 \times 0.80 = 36\ \text{N m}$.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are door handles fixed as far as possible from the hinges?",
    options: [["To give a larger moment for the same force", "Correct."], ["To make the door lighter", "Position does not change the door's weight."], ["To reduce friction in the hinges", "Friction is not the reason."], ["To balance the door's weight", "Handles are not counterweights."]],
    answer: "A", explanation: "A larger perpendicular distance from the pivot gives a larger turning effect, so less force is needed." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`On a see-saw, Tatenda (weight $420\ \text{N}$) sits $1.5\ \text{m}$ from the pivot. How far from the pivot on the other side must Rudo (weight $350\ \text{N}$) sit for the see-saw to balance?`,
    value: 1.8, answer: "1.8", unit: "m", wrong: [1.25, 2.16, 0.56],
    explanation: t`Principle of moments: $420 \times 1.5 = 350 \times d$, so $d = \dfrac{630}{350} = 1.8\ \text{m}$.`,
    hints: ["Clockwise moments = anticlockwise moments.", "The lighter person must sit further from the pivot."] });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`A uniform metre rule is balanced at its $50\ \text{cm}$ mark. A $3.0\ \text{N}$ weight hangs at the $15\ \text{cm}$ mark. On the other side, a $1.5\ \text{N}$ weight hangs at the $70\ \text{cm}$ mark and a weight $W$ hangs at the $90\ \text{cm}$ mark.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the anticlockwise moment about the pivot, in N cm.", value: 105, unit: "N cm", tol: 0, wrong: [45, 150],
        explanation: t`Distance $= 50 - 15 = 35\ \text{cm}$; moment $= 3.0 \times 35 = 105\ \text{N cm}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the weight W, in newtons.", value: 1.875, answer: "1.9", unit: "N", tol: 0.05, wrong: [2.625, 1.17],
        explanation: t`Clockwise: $1.5 \times 20 + W \times 40 = 30 + 40W$. Balance: $30 + 40W = 105$, so $W = \dfrac{75}{40} = 1.875 \approx 1.9\ \text{N}$.` }),
    ],
    explanation: "Distances are measured from the pivot (the 50 cm mark): 35 cm, 20 cm and 40 cm. 3.0 × 35 = 1.5 × 20 + 40W gives W = 1.875 N.",
    hints: ["Measure each distance from the 50 cm mark, not from the end of the rule.", "Add the two clockwise moments."] });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "An object is in equilibrium only if there is no resultant force AND no resultant moment on it.",
    answer: true, explanation: "Both conditions are needed: no resultant force (no acceleration) and no resultant moment (no turning)." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A spanner $0.25\ \text{m}$ long is used to tighten a bolt. A moment of $30\ \text{N m}$ is needed. What force must be applied at right angles at the end of the spanner?`,
    value: 120, unit: "N", wrong: [7.5, 0.0083, 30.25],
    explanation: t`$F = \dfrac{\text{moment}}{d} = \dfrac{30}{0.25} = 120\ \text{N}$.`,
    hints: ["Rearrange moment = F × d."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "A mechanic cannot loosen a stubborn wheel nut. Which change would help most?",
    options: [["Using a spanner with a longer handle", "Correct: larger distance, larger moment."], ["Pushing the spanner nearer to the nut", "This reduces the moment."], ["Pushing along the length of the handle", "A force along the handle has no moment about the nut."], ["Using a lighter spanner", "The spanner's weight is not the problem."]],
    answer: "A", explanation: "A longer handle increases the perpendicular distance, so the same force gives a larger moment.",
    hints: ["Moment = force × perpendicular distance."] });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true, applies: C,
    stem: "A learner sets out to show that there is no resultant moment on a beam in equilibrium.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the experiment she should carry out.",
        points: ["Balances a metre rule on a pivot at its centre (centre of gravity)", "Hangs known weights at measured distances on both sides and adjusts them until the rule balances horizontally", "Calculates the total clockwise and anticlockwise moments and shows they are equal; repeats for other arrangements"] }),
      P.mcq({ label: "(b)", stem: "Why does she pivot the rule at its centre of gravity?", options: [["So the rule's own weight has no moment about the pivot", "Correct."], ["So the rule is stronger", "Strength is not the issue."], ["Because the rule cannot balance anywhere else", "It can, if the weight's moment is included."], ["To make the weights lighter", "Weights are unchanged."]], answer: "A", explanation: "The rule's weight then acts through the pivot, so its perpendicular distance, and moment, are zero." }),
    ],
    explanation: "Balancing known weights at measured distances and comparing total clockwise with total anticlockwise moments verifies the principle.",
    hints: ["What do you need to measure for each weight?"] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the principle of moments.",
    template: "When an object is in equilibrium, the sum of the {{blank:a}} moments about any point equals the sum of the {{blank:b}} moments about that point.",
    blanks: [{ id: "a", input: "select", choices: ["clockwise", "upward", "resultant"], accepted: ["clockwise"], wrong: "upward" }, { id: "b", input: "select", choices: ["anticlockwise", "downward", "total"], accepted: ["anticlockwise"], wrong: "downward" }],
    explanation: "Sum of clockwise moments = sum of anticlockwise moments, about any point." });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: t`A uniform plank $4.0\ \text{m}$ long weighing $200\ \text{N}$ rests on a pivot $1.0\ \text{m}$ from its left end. What downward force at the left end will balance it?`,
    value: 200, unit: "N", wrong: [100, 400, 50],
    explanation: t`The plank's weight acts at its centre, $2.0\ \text{m}$ from the left end, i.e. $1.0\ \text{m}$ right of the pivot: moment $= 200 \times 1.0 = 200\ \text{N m}$. The left-end force acts $1.0\ \text{m}$ from the pivot: $F \times 1.0 = 200$, so $F = 200\ \text{N}$.`,
    hints: ["The plank's weight acts at its centre (2.0 m from each end).", "Find the distance of that centre from the pivot."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "A wheelbarrow full of sand is lifted at the handles. The wheel is the pivot. Why is it easier to lift when the load is placed nearer the wheel?",
    options: [["The load's moment about the wheel is smaller, so less force is needed at the handles.", "Correct."], ["The load becomes lighter.", "Its weight does not change."], ["The handles become longer.", "The handles are the same length."], ["Friction on the wheel decreases.", "Friction is not the reason."]],
    answer: "A", explanation: "Moving the load nearer the pivot reduces its perpendicular distance, so its moment is smaller and a smaller lifting moment balances it." });

  q.short({ d: 2, skill: "RECALL",
    stem: "What name is given to the point about which a lever or beam turns?",
    accepted: ["pivot", "fulcrum", "the pivot", "the fulcrum"], wrong: ["centre of gravity"],
    explanation: "The turning point is the pivot (fulcrum)." });

  q.card("DEFINITION", "Define the **moment** of a force.", "Force × perpendicular distance from the pivot to the line of the force (N m).");
  q.card("CONCEPT", "State the principle of moments.", "In equilibrium, the sum of clockwise moments about any point equals the sum of anticlockwise moments.");
  q.card("CONCEPT", "What are the two conditions for equilibrium?", "No resultant force and no resultant moment.");
  q.card("CONCEPT", "How can you increase the turning effect of a force?", "Use a larger force or apply it further from the pivot.");
  q.card("FACT", "What is the unit of moment?", "The newton metre, N m (or N cm if distances are in cm).");
  q.card("CONCEPT", "Where does the weight of a uniform beam act?", "At its centre (its centre of gravity).");
  q.card("CONCEPT", "Why do long spanners make bolts easier to loosen?", "The larger distance gives a larger moment for the same force.");
  q.card("CONCEPT", "How do you verify the principle of moments?", "Balance a metre rule with known weights at measured distances and compare clockwise and anticlockwise moments.");
});

// =====================================================================================================================
concept("phys.forces.centre-of-gravity", {
  file: "forces/centre-of-gravity",
  keyPrefix: "forces.cog",
  objectives: { cambridge: ["1.5.3.1", "1.5.3.3"], zimsec: ["3.5.1", "3.5.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the centre of gravity of an object?",
    options: [["The point through which its whole weight can be taken to act", "Correct."], ["The heaviest part of the object", "Not a definition."], ["The point where it is thickest", "Not a definition."], ["The middle of its base", "Not in general."]],
    answer: "A", explanation: "The centre of gravity is the point where the whole weight seems to act." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where is the centre of gravity of a thin uniform ring (like a bangle)?",
    options: [["At the centre of the ring, in the empty space", "Correct."], ["At the top of the ring", "The ring is symmetrical."], ["Spread around the ring", "It is a single point."], ["At the bottom of the ring", "The ring is symmetrical."]],
    answer: "A", explanation: "By symmetry it is at the geometric centre, which is in the empty space inside the ring." });

  q.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true,
    stem: "A learner finds the centre of gravity of an irregularly shaped piece of cardboard.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Describe the method, including the apparatus used.",
        points: ["Makes a hole near the edge and hangs the card freely from a pin in a clamp, with a plumb line from the same pin", "Marks the line of the plumb line on the card when everything is still", "Repeats from another hole; the centre of gravity is where the lines cross"] }),
      P.mcq({ label: "(b)", stem: "How can she check her result?", options: [["Hang the card from a third hole: the third line should pass through the same point.", "Correct."], ["Weigh the card.", "Weighing does not locate the centre of gravity."], ["Measure the card's perimeter.", "Not relevant."], ["Cut the card in half.", "That changes the object."]], answer: "A", explanation: "All lines drawn this way pass through the centre of gravity, so a third line is a check." }),
    ],
    explanation: "A freely hanging card rests with its centre of gravity directly below the pin; two plumb lines cross at it and a third checks it.",
    hints: ["Where does the centre of gravity lie when the card hangs freely?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which change makes a lorry less likely to topple on a sharp bend?",
    options: [["Loading heavy goods low down rather than high up", "Correct: lowers the centre of gravity."], ["Loading heavy goods on the roof", "Raises the centre of gravity."], ["Using narrower axles", "A narrower base is less stable."], ["Driving faster", "That makes toppling more likely."]],
    answer: "A", explanation: "A lower centre of gravity (and a wider base) makes an object more stable." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An object topples over when the vertical line through its centre of gravity falls outside its base.",
    answer: true, explanation: "Then the weight has a moment about the edge of the base that turns the object further over." });

  q.match({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each situation with its type of equilibrium.",
    pairs: [["A cone standing on its flat base", "Stable"], ["A cone balanced on its point", "Unstable"], ["A cone lying on its side", "Neutral"], ["A ball resting on a flat floor", "Neutral"]],
    explanation: "Stable: tilting raises the centre of gravity and it returns. Unstable: tilting lowers it and it falls. Neutral: tilting leaves its height unchanged.",
    hints: ["What happens to the height of the centre of gravity when each object is tilted slightly?"] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Racing cars are built low and wide. Why?",
    options: [["A low centre of gravity and a wide base make them very stable on bends.", "Correct."], ["It makes them lighter.", "Shape does not reduce mass by itself."], ["It increases air resistance.", "That is not the aim."], ["It makes the engine more efficient.", "Not related to stability."]],
    answer: "A", explanation: "A low centre of gravity and wide wheelbase mean the car must tilt a long way before its weight acts outside its base.",
    hints: ["Think about when an object topples."] });

  q.short({ d: 2, skill: "RECALL",
    stem: "What is the name of the thread with a small weight on the end used to mark a vertical line?",
    accepted: ["plumb line", "a plumb line", "plumb-line", "plumbline", "plumb bob"], wrong: ["spring balance"],
    explanation: "A plumb line hangs vertically and is used to mark vertical lines through the pivot." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A full bottle and an empty bottle of the same shape are tilted by the same small angle and released. Which statement is correct?",
    options: [["The full bottle is more stable: its centre of gravity is lower than the empty bottle's.", "Correct: water fills the bottom."], ["The empty bottle is more stable: it is lighter.", "Lighter does not mean more stable."], ["They are equally stable.", "Their centres of gravity are at different heights."], ["Neither will return upright.", "A small tilt keeps the weight over the base."]],
    answer: "A", explanation: "A full bottle has much of its mass near the bottom (and a heavy base), so its centre of gravity is low and it is harder to topple.",
    hints: ["Where is most of the mass in each bottle?"] });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "In a uniform gravitational field, how are the centre of mass and the centre of gravity related?",
    options: [["They are at the same point.", "Correct."], ["The centre of gravity is always above the centre of mass.", "Not in a uniform field."], ["They are on opposite sides of the object.", "No."], ["They are unrelated.", "They coincide in a uniform field."]],
    answer: "A", explanation: "In a uniform field every part's weight is proportional to its mass, so the two points coincide." });

  q.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A tall water tank on a stand stands on a gentle slope at a rural clinic.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why the tank is more likely to topple when it is full than when it is nearly empty.",
        points: ["When full, the heavy water raises the centre of gravity of the tank and stand well above the ground", "so a smaller tilt moves the line of action of the weight outside the base, making it topple"] }),
      P.manual({ label: "(b)", marks: 2, stem: "Suggest two changes to the design that make the stand more stable.",
        points: ["Make the base of the stand wider", "Lower the tank (or add heavy weights/anchors at the bottom) to lower the centre of gravity"] }),
    ],
    explanation: "Stability needs the weight's line of action to stay inside the base: a low centre of gravity and a wide base help.",
    hints: ["Where is the centre of gravity when the tank is full?", "Two things affect stability: the height of the centre of gravity and the width of the base."] });

  q.card("DEFINITION", "Define **centre of gravity**.", "The point through which the whole weight of an object can be taken to act.");
  q.card("CONCEPT", "Where is the centre of gravity of a regular uniform object?", "At its geometric centre (it may be outside the material, e.g. a ring).");
  q.card("CONCEPT", "How do you find the centre of gravity of an irregular lamina?", "Hang it freely, mark plumb-line verticals from two or more points; they cross at the centre of gravity.");
  q.card("CONCEPT", "When does an object topple?", "When the line of action of its weight falls outside its base.");
  q.card("CONCEPT", "What makes an object stable?", "A low centre of gravity and a wide base.");
  q.card("VOCABULARY", "Stable, unstable and neutral equilibrium?", "Stable: returns after tilting. Unstable: falls over. Neutral: stays in the new position.", undefined, { applies: Z });
  q.card("CONCEPT", "Why does a freely hanging object settle with its centre of gravity below the pivot?", "Only then does its weight have no moment about the pivot.");
});

// =====================================================================================================================
concept("phys.forces.momentum", {
  file: "forces/momentum",
  keyPrefix: "forces.momentum",
  objectives: { cambridge: ["1.6.1", "1.6.2"], zimsec: ["3.2.1", "3.2.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Momentum is defined as:",
    options: [["mass × velocity", "Correct."], ["mass × acceleration", "That is force."], ["force × distance", "That is work."], ["force × time", "That is impulse."]],
    answer: "A", explanation: "Momentum p = mv." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`Calculate the momentum of a $1500\ \text{kg}$ car travelling at $20\ \text{m/s}$.`,
    value: 30000, unit: "kg m/s", wrong: [75, 1520, 300000],
    explanation: t`$p = mv = 1500 \times 20 = 30\,000\ \text{kg m/s}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A cricket ball has a momentum of $4.8\ \text{kg m/s}$ when moving at $30\ \text{m/s}$. What is its mass?`,
    value: 0.16, answer: "0.16", unit: "kg", wrong: [144, 6.25, 34.8],
    explanation: t`$m = \dfrac{p}{v} = \dfrac{4.8}{30} = 0.16\ \text{kg}$.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which has the greatest momentum?",
    options: [["A 60 kg cyclist at 8 m/s", "p = 480 kg m/s."], ["A 2000 kg truck at 0.5 m/s", "Correct: p = 1000 kg m/s."], ["A 0.01 kg bullet at 400 m/s", "p = 4 kg m/s."], ["A 70 kg runner at 6 m/s", "p = 420 kg m/s."]],
    answer: "B", explanation: "p = mv: 480, 1000, 4 and 420 kg m/s. The slow truck has the most momentum because of its large mass." });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`A force of $250\ \text{N}$ acts on a trolley for $0.40\ \text{s}$. What impulse does it give the trolley?`,
    value: 100, unit: "N s", wrong: [625, 0.0016, 250.4],
    explanation: t`Impulse $= F\Delta t = 250 \times 0.40 = 100\ \text{N s}$.`,
    hints: ["Impulse = force × time."] });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`A tennis ball of mass $0.060\ \text{kg}$ arrives at a racket at $20\ \text{m/s}$ and leaves in the opposite direction at $30\ \text{m/s}$. The contact time is $0.0050\ \text{s}$. Calculate the average force on the ball.`,
    value: 600, unit: "N", wrong: [120, 3, 360],
    explanation: t`Taking the leaving direction as positive: $\Delta p = 0.060 \times 30 - 0.060 \times (-20) = 1.8 + 1.2 = 3.0\ \text{kg m/s}$; $F = \dfrac{3.0}{0.0050} = 600\ \text{N}$.`,
    hints: ["Velocity is a vector: the arriving velocity is negative if the leaving one is positive.", "Then F = Δp/Δt."] });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`A $2.5\ \text{kg}$ trolley moving at $3.6\ \text{m/s}$ collides with a stationary $1.5\ \text{kg}$ trolley. They stick together. What is their common velocity just after the collision?`,
    value: 2.25, answer: "2.25", unit: "m/s", tol: 0.03, wrong: [3.6, 9, 1.8],
    explanation: t`Momentum before $= 2.5 \times 3.6 = 9.0\ \text{kg m/s}$; after $= (2.5 + 1.5)v = 4.0v$; $v = 2.25\ \text{m/s}$.`,
    hints: ["Total momentum before = total momentum after.", "After the collision the total mass is 4.0 kg."] });

  q.struct({ d: 4, skill: "APPLICATION", applies: C, examStyle: true,
    stem: t`A $0.020\ \text{kg}$ dart is fired from a toy gun of mass $0.80\ \text{kg}$ at $15\ \text{m/s}$. The gun is free to move and both are at rest before firing.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What is the total momentum before firing?", value: 0, unit: "kg m/s", wrong: [0.3, 12], explanation: "Both are at rest, so the total momentum is zero." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the recoil speed of the gun.", value: 0.375, answer: "0.38", unit: "m/s", tol: 0.01, wrong: [15, 600], explanation: t`Dart: $0.020 \times 15 = 0.30\ \text{kg m/s}$ forwards, so the gun has $0.30\ \text{kg m/s}$ backwards: $v = \dfrac{0.30}{0.80} = 0.375 \approx 0.38\ \text{m/s}$.` }),
    ],
    explanation: "Total momentum stays zero: the dart's forward momentum (0.30 kg m/s) equals the gun's backward momentum, so the gun recoils at 0.375 m/s.",
    hints: ["Momentum is conserved: the total after firing is still zero.", "The gun moves the opposite way."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why does a car's crumple zone reduce the force on the passengers in a crash?",
    options: [["It increases the time taken for the car to stop, so the rate of change of momentum is smaller.", "Correct."], ["It reduces the passengers' mass.", "Mass does not change."], ["It increases the car's momentum.", "It does not."], ["It stops the car instantly.", "That would increase the force."]],
    answer: "A", explanation: "The change in momentum is fixed; spreading it over a longer time reduces F = Δp/Δt.",
    hints: ["F = Δp/Δt: which part does a crumple zone change?"] });

  q.tf({ d: 2, skill: "RECALL",
    stem: "Momentum is a vector quantity.",
    answer: true, explanation: "Momentum = mass × velocity, and velocity is a vector, so momentum has a direction too." });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "The unit of momentum, kg m/s, is the same as the unit of impulse, the {{blank:a}} second.",
    blanks: [{ id: "a", input: "select", choices: ["newton", "joule", "watt"], accepted: ["newton"], wrong: "joule" }],
    explanation: "Impulse = force × time has the unit N s, which equals kg m/s." });

  q.mcq({ d: 4, skill: "ANALYSIS", applies: C,
    stem: "Two trolleys of equal mass move towards each other at equal speeds, collide and stick together. What is their velocity after the collision?",
    options: [["Zero", "Correct: the momenta were equal and opposite, so the total is zero."], ["Twice the original speed", "Momenta in opposite directions cancel."], ["The original speed", "The total momentum is zero."], ["Half the original speed", "The total momentum is zero."]],
    answer: "A", explanation: "Equal masses at equal speeds in opposite directions have equal and opposite momenta; the total is zero before and after.",
    hints: ["Give one direction a positive sign and the other a negative sign."] });

  q.num({ d: 4, skill: "APPLICATION", applies: C,
    stem: t`The resultant force on a $1200\ \text{kg}$ car changes its momentum from $9600\ \text{kg m/s}$ to $18\,000\ \text{kg m/s}$ in $6.0\ \text{s}$. Calculate the resultant force.`,
    value: 1400, unit: "N", wrong: [4600, 3000, 7],
    explanation: t`$F = \dfrac{\Delta p}{\Delta t} = \dfrac{18\,000 - 9600}{6.0} = \dfrac{8400}{6.0} = 1400\ \text{N}$.`,
    hints: ["Resultant force = change in momentum ÷ time."] });

  q.card("DEFINITION", "Define **momentum**.", "Mass × velocity: p = mv, in kg m/s.");
  q.card("FACT", "Is momentum a scalar or a vector?", "A vector, in the direction of the velocity.");
  q.card("DEFINITION", "Define **impulse**.", "Force × time for which it acts; it equals the change in momentum.", undefined, { applies: C });
  q.card("FORMULA", "How is force related to momentum?", "Resultant force = rate of change of momentum: F = Δp/Δt.", undefined, { applies: C });
  q.card("CONCEPT", "State the principle of conservation of momentum.", "With no external force, total momentum before = total momentum after.", undefined, { applies: C });
  q.card("CONCEPT", "How do crumple zones and airbags protect people?", "They increase the stopping time, so the force (Δp/Δt) is smaller.", undefined, { applies: C });
  q.card("CONCEPT", "Why does a gun recoil?", "Total momentum stays zero: the bullet's forward momentum is balanced by the gun's backward momentum.", undefined, { applies: C });
  q.card("FACT", "What is the unit of momentum?", "kg m/s, which is the same as N s.");
});

// =====================================================================================================================
concept("phys.forces.pressure", {
  file: "forces/pressure",
  keyPrefix: "forces.pressure",
  objectives: { cambridge: ["1.8.1", "1.8.2", "1.8.3"], zimsec: ["3.6.1", "3.6.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which equation defines pressure?",
    options: [["p = F × A", "Divide, do not multiply."], ["p = F / A", "Correct."], ["p = A / F", "Upside down."], ["p = m / V", "That is density."]],
    answer: "B", explanation: "Pressure is force per unit area: p = F/A." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: t`A box of weight $450\ \text{N}$ rests on a base of area $0.15\ \text{m}^2$. Calculate the pressure it exerts on the floor.`,
    value: 3000, unit: "Pa", wrong: [67.5, 0.00033, 450.15],
    explanation: t`$p = \dfrac{F}{A} = \dfrac{450}{0.15} = 3000\ \text{Pa}$.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does a sharp knife cut better than a blunt one?",
    options: [["The edge has a smaller area, so the same force gives a greater pressure.", "Correct."], ["A sharp knife is heavier.", "Sharpness does not add mass."], ["A sharp edge has a larger area.", "It is a smaller area."], ["Sharp knives have less friction only.", "The main reason is pressure."]],
    answer: "A", explanation: "Pressure = force ÷ area: a smaller area gives a larger pressure for the same force." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A drawing pin is pushed with a force of $12\ \text{N}$. Its point has an area of $0.000\,000\,30\ \text{m}^2$. Calculate the pressure at the point.`,
    value: 4e7, answer: "4.0e7", unit: "Pa", wrong: [3.6e-6, 2.5e-8, 4000000],
    explanation: t`$p = \dfrac{12}{3.0 \times 10^{-7}} = 4.0 \times 10^{7}\ \text{Pa}$.`,
    hints: ["0.000 000 30 = 3.0 × 10⁻⁷."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`A force spread over $2.5\ \text{m}^2$ produces a pressure of $800\ \text{Pa}$. What is the force?`,
    value: 2000, unit: "N", wrong: [320, 0.003125, 802.5],
    explanation: t`$F = pA = 800 \times 2.5 = 2000\ \text{N}$.`,
    hints: ["Rearrange p = F/A."] });

  q.num({ d: 3, skill: "APPLICATION",
    stem: t`What is the pressure due to water at a depth of $12\ \text{m}$ in a dam? Take the density of water as $1000\ \text{kg/m}^3$ and $g = 9.8\ \text{N/kg}$.`,
    value: 117600, unit: "Pa", wrong: [11760, 120, 1176000],
    explanation: t`$\Delta p = \rho g \Delta h = 1000 \times 9.8 \times 12 = 117\,600\ \text{Pa}$.`,
    hints: ["Use Δp = ρgΔh."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why is the wall of a dam thicker at the bottom than at the top?",
    options: [["Water pressure increases with depth.", "Correct."], ["The water at the bottom is colder.", "Temperature is not the reason."], ["Water pressure is greatest at the surface.", "It is smallest there."], ["The top needs less concrete because the sun heats it.", "Not the reason."]],
    answer: "A", explanation: "Pressure increases with depth, so the bottom of the wall must withstand the greatest push." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "At the same depth, the pressure of water is greater in a wide reservoir than in a narrow pipe.",
    answer: false, explanation: "Liquid pressure depends only on depth and density (Δp = ρgΔh), not on the width or shape of the container." });

  q.struct({ d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`A concrete block of mass $96\ \text{kg}$ measures $0.40\ \text{m} \times 0.30\ \text{m} \times 0.20\ \text{m}$. Take $g = 9.8\ \text{N/kg}$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the weight of the block.", value: 940.8, answer: "941", unit: "N", wrong: [96, 9.8], explanation: t`$W = 96 \times 9.8 = 940.8 \approx 941\ \text{N}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the greatest pressure it can exert when resting on one face.", value: r(940.8 / 0.06), unit: "Pa", wrong: [7840, 1600], explanation: t`Smallest face $= 0.30 \times 0.20 = 0.060\ \text{m}^2$; $p = \dfrac{940.8}{0.060} = 15\,680 \approx 15\,700\ \text{Pa}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the least pressure it can exert when resting on one face.", value: 7840, unit: "Pa", wrong: [15680, 940.8], explanation: t`Largest face $= 0.40 \times 0.30 = 0.12\ \text{m}^2$; $p = \dfrac{940.8}{0.12} = 7840\ \text{Pa}$.` }),
    ],
    explanation: "Weight 941 N; the smallest face (0.060 m²) gives the greatest pressure, about 15 700 Pa; the largest face (0.12 m²) gives the least, 7840 Pa.",
    hints: ["Work out the area of each face.", "The greatest pressure comes from the smallest area."] });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "A tall can full of water has three holes at different heights. Which hole has the water spurting out furthest?",
    options: [["The lowest hole", "Correct: pressure is greatest at the greatest depth."], ["The highest hole", "Pressure is least near the surface."], ["The middle hole", "The lowest hole is deepest."], ["All the same", "Pressure increases with depth."]],
    answer: "A", explanation: "The deepest hole has the greatest pressure behind it, so water leaves fastest there.",
    hints: ["Where is the water pressure greatest?"] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each object with the reason for its shape.",
    pairs: [["Wide tractor tyres", "Large area, low pressure, so they do not sink into soft ground"], ["Pointed nail", "Small area, high pressure, so it goes into wood easily"], ["Wide straps on a school bag", "Large area, low pressure on the shoulders"], ["Thin needle", "Small area, high pressure, so it pierces cloth"]],
    explanation: "Small areas concentrate a force into a high pressure; large areas spread it out." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "At a depth of 5.0 m, which liquid exerts the greatest pressure?",
    options: [["Water (1000 kg/m³)", "Not the densest."], ["Paraffin (800 kg/m³)", "Least dense."], ["Sea water (1030 kg/m³)", "Correct: the densest of these."], ["They all exert the same pressure", "Pressure depends on density."]],
    answer: "C", explanation: "Δp = ρgΔh: at the same depth, the densest liquid gives the greatest pressure.",
    hints: ["Use Δp = ρgΔh with the same depth for each."] });

  q.short({ d: 2, skill: "RECALL", daily: true,
    stem: "What is the name of the SI unit of pressure, equal to 1 N/m²?",
    accepted: ["pascal", "the pascal", "Pa", "pascals"], wrong: ["newton"],
    explanation: "The pascal: 1 Pa = 1 N/m²." });

  q.card("DEFINITION", "Define **pressure**.", "Force per unit area, acting at right angles to a surface.");
  q.card("FORMULA", "What is the equation for pressure?", "p = F / A, in pascals (1 Pa = 1 N/m²).");
  q.card("CONCEPT", "How does area affect pressure?", "For the same force, a smaller area gives a larger pressure.");
  q.card("CONCEPT", "How does liquid pressure change with depth?", "It increases with depth (and with the density of the liquid).");
  q.card("FORMULA", "Pressure change with depth in a liquid?", "Δp = ρgΔh.");
  q.card("CONCEPT", "Does liquid pressure depend on the container's shape?", "No: only on depth and density.");
  q.card("CONCEPT", "Why is a dam wall thicker at the bottom?", "Water pressure is greatest at the bottom (greatest depth).");
  q.card("CONCEPT", "In which directions does pressure act in a liquid?", "Equally in all directions at a given point.");
});

// =====================================================================================================================
concept("phys.forces.atmospheric-pressure", {
  file: "forces/atmospheric-pressure",
  keyPrefix: "forces.atmos",
  objectives: { zimsec: ["3.6.3", "3.6.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What causes atmospheric pressure?",
    options: [["The weight of the air above a surface", "Correct."], ["The heat of the Sun", "Heating affects it, but weight is the cause."], ["The rotation of the Earth", "Not the cause."], ["Clouds pushing down", "Clouds are not the cause."]],
    answer: "A", explanation: "Atmospheric pressure is caused by the weight of the air above pressing on surfaces." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "How does atmospheric pressure change as you climb a high mountain?",
    options: [["It decreases.", "Correct: there is less air above you."], ["It increases.", "There is less air above, not more."], ["It stays the same.", "It falls with height."], ["It becomes zero at the top.", "It is smaller, but far from zero."]],
    answer: "A", explanation: "Higher up there is less air above, so its weight per unit area is smaller." });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`A mercury barometer shows a column of height $0.74\ \text{m}$. The density of mercury is $13\,600\ \text{kg/m}^3$. Taking $g = 9.8\ \text{N/kg}$, calculate the atmospheric pressure.`,
    value: r(13600 * 9.8 * 0.74), unit: "Pa", wrong: [10064, 9862720, 7252],
    explanation: t`$p = \rho g h = 13\,600 \times 9.8 \times 0.74 = 98\,627\ \text{Pa} \approx 98\,600\ \text{Pa}$.`,
    hints: ["Use p = ρgh with h in metres."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "The tube of a mercury barometer is tilted. What happens to the vertical height of the mercury column?",
    options: [["It stays the same.", "Correct: atmospheric pressure supports a fixed vertical height."], ["It increases.", "The vertical height depends only on the pressure."], ["It decreases.", "Only the length along the tube changes."], ["It becomes zero.", "Air pressure still holds it up."]],
    answer: "A", explanation: "Pressure depends on vertical height. Tilting makes more of the tube fill with mercury, but the vertical height above the dish stays the same.",
    hints: ["Pressure depends on vertical depth, not on the length of liquid."] });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "When you drink through a straw, atmospheric pressure pushes the drink up the straw.",
    answer: true, explanation: "Sucking lowers the pressure inside the straw; the greater atmospheric pressure on the drink's surface pushes it up." });

  q.struct({ d: 4, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: t`A water manometer is connected to a gas tap. The water level on the open side is $15\ \text{cm}$ higher than on the gas side. The atmospheric pressure is $98\,000\ \text{Pa}$. Take the density of water as $1000\ \text{kg/m}^3$ and $g = 9.8\ \text{N/kg}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate how much the gas pressure exceeds atmospheric pressure.", value: 1470, unit: "Pa", wrong: [147000, 147], explanation: t`$\rho g h = 1000 \times 9.8 \times 0.15 = 1470\ \text{Pa}$.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the gas pressure.", value: 99470, unit: "Pa", wrong: [96530, 1470], explanation: t`$98\,000 + 1470 = 99\,470\ \text{Pa}$.` }),
    ],
    explanation: "The level difference gives the excess pressure ρgh = 1470 Pa; add atmospheric pressure for the total, 99 470 Pa.",
    hints: ["Convert 15 cm to metres.", "The manometer shows the pressure ABOVE atmospheric."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: t`In a hydraulic lift, a force of $80\ \text{N}$ is applied to a piston of area $5.0\ \text{cm}^2$. The large piston has an area of $400\ \text{cm}^2$. What force does the large piston exert?`,
    value: 6400, unit: "N", wrong: [1, 25, 16000],
    explanation: t`Pressure $= \dfrac{80}{5.0} = 16\ \text{N/cm}^2$; force $= 16 \times 400 = 6400\ \text{N}$.`,
    hints: ["The pressure is the same on both pistons.", "Force = pressure × area."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A weather map shows isobars very close together over a region. What weather is likely there?",
    options: [["Strong winds", "Correct: a steep pressure change drives strong winds."], ["Calm, still air", "That goes with widely spaced isobars."], ["Very cold temperatures", "Isobars show pressure, not temperature."], ["No change in weather", "Close isobars indicate strong winds."]],
    answer: "A", explanation: "Closely spaced isobars mean pressure changes rapidly over a short distance, which drives strong winds." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A barometer reading falls steadily over a day. What is the most likely change in the weather?",
    options: [["Cloud and rain are becoming more likely.", "Correct: falling pressure often brings unsettled weather."], ["Clear, dry weather is coming.", "That goes with rising or high pressure."], ["Frost is certain.", "Pressure alone does not predict frost."], ["Nothing: pressure does not affect weather.", "Pressure patterns are used to forecast weather."]],
    answer: "A", explanation: "Low or falling pressure is associated with rising air, clouds and rain." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Why does food cook faster in a pressure cooker?",
    options: [["The higher pressure raises the boiling point of water, so the food is cooked at a higher temperature.", "Correct."], ["The pressure squeezes heat into the food.", "Not the reason."], ["Steam is colder at high pressure.", "It is hotter."], ["The pot is thicker.", "Thickness is not the reason."]],
    answer: "A", explanation: "Trapped steam raises the pressure, so water boils above 100 °C and the food cooks at a higher temperature.",
    hints: ["How does pressure affect the boiling point of water?"] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each instrument or device with what it does.",
    pairs: [["Mercury barometer", "Measures atmospheric pressure"], ["Manometer", "Measures gas pressure compared with the atmosphere"], ["Hydraulic jack", "Uses liquid pressure to lift heavy loads"], ["Aneroid barometer", "Measures air pressure with a sealed metal box"]],
    explanation: "Barometers measure atmospheric pressure; a manometer measures excess gas pressure; hydraulic machines multiply force." });

  q.short({ d: 2, skill: "RECALL", applies: Z,
    stem: "What name is given to lines on a weather map joining places with the same atmospheric pressure?",
    accepted: ["isobars", "isobar"], wrong: ["isotherms", "contours"],
    explanation: "Isobars join places of equal pressure." });

  q.mcq({ d: 4, skill: "ANALYSIS", applies: Z,
    stem: "A little water is boiled in a metal can, the cap is screwed on and the heating stopped. As the can cools, it collapses. What is the best explanation?",
    options: [["The steam condenses, so the pressure inside falls and the larger atmospheric pressure outside crushes the can.", "Correct."], ["The metal shrinks as it cools.", "Thermal contraction is far too small to crush it."], ["The water inside pulls the walls in.", "Water does not pull on the walls."], ["The steam inside expands and bends the can.", "Expansion would push outwards."]],
    answer: "A", explanation: "Condensing steam leaves a low pressure inside; the atmosphere outside now pushes harder than the gas inside.",
    hints: ["What happens to steam when it cools?"] });

  q.card("DEFINITION", "What is **atmospheric pressure**?", "The pressure caused by the weight of the air above; about 1.0 × 10⁵ Pa at sea level.", undefined, { applies: Z });
  q.card("CONCEPT", "How does atmospheric pressure change with altitude?", "It decreases, because there is less air above.", undefined, { applies: Z });
  q.card("CONCEPT", "How does a mercury barometer work?", "Atmospheric pressure holds up a mercury column; its vertical height (about 760 mm at sea level) measures the pressure.", undefined, { applies: Z });
  q.card("CONCEPT", "What does a manometer measure?", "Gas pressure above (or below) atmospheric, from the difference in liquid levels: ρgh.", undefined, { applies: Z });
  q.card("CONCEPT", "What weather goes with high and low pressure?", "High: usually fine and dry. Low: clouds and rain; wind blows from high to low.", undefined, { applies: Z });
  q.card("CONCEPT", "How does a hydraulic machine multiply force?", "Pressure is transmitted equally through the liquid: F₁/A₁ = F₂/A₂.", undefined, { applies: Z });
  q.card("CONCEPT", "Why does food cook faster in a pressure cooker?", "Higher pressure raises the boiling point, so the food cooks at a higher temperature.", undefined, { applies: Z });
  q.card("FACT", "Give two demonstrations of atmospheric pressure.", "Collapsing can; drinking straw; rubber sucker; Magdeburg hemispheres.", undefined, { applies: Z });
});
