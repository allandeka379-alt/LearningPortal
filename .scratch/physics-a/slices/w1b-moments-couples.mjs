// W1b: aphys.forces.moments-couples — centre of gravity, moments, couples and torque.
import { concept, P, t, chk, sfStr, dpStr, rad, pctUnc } from "../lib.mjs";

concept("aphys.forces.moments-couples", { file: "forces/moments-couples", keyPrefix: "forces.moments-couples" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the centre of gravity of an object?",
    options: [
      ["The point at which the whole weight of the object may be taken to act", "Correct: the resultant of the weights of all parts acts through it."],
      ["The point at the geometric centre of the object", "True only for uniform objects of symmetrical shape."],
      ["The point about which the object has the greatest moment", "Moments depend on the chosen point and the forces, not on a property called the centre of gravity."],
      ["The point at which the mass of the object is largest", "Mass is spread through the object; no single point holds most of it."],
    ],
    answer: "A",
    explanation: "The centre of gravity is where the whole weight may be taken to act. For a uniform symmetrical object it is at the geometric centre; for a non-uniform object it is nearer the heavier part.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of forces acting on a rigid body forms a couple?",
    options: [
      ["Two equal, opposite forces acting along parallel lines a distance apart", "Correct: zero resultant force but a non-zero torque."],
      ["Two equal, opposite forces acting along the same line", "These cancel completely: no resultant force and no turning effect."],
      ["Two equal forces in the same direction along parallel lines", "These add to a resultant force of 2F, so the body accelerates."],
      ["Two unequal, opposite forces acting along parallel lines", "Unequal forces leave a resultant force as well as a turning effect."],
    ],
    answer: "A",
    explanation: "A couple: equal magnitude, opposite direction, parallel but different lines of action. The resultant force is zero, so it produces rotation only.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the unit of torque expressed in SI base units?",
    options: [
      [t`$\text{kg m}^2\,\text{s}^{-2}$`, "Correct: N m = (kg m s⁻²) × m."],
      [t`$\text{kg m s}^{-2}$`, "This is the newton; torque has an extra metre."],
      [t`$\text{kg m}^2\,\text{s}^{-1}$`, "This is the unit of angular momentum (or J s), not torque."],
      [t`$\text{kg m}^{-1}\,\text{s}^{-2}$`, "This is the pascal (N m⁻²)."],
    ],
    answer: "A",
    explanation: t`$\text{N m} = \text{kg m s}^{-2} \times \text{m} = \text{kg m}^2\,\text{s}^{-2}$, the same base units as the joule. Torque is still quoted in N m, because it is not an energy.`,
  });
  {
    const F = 80, r = 0.5, th = 30;
    const M = F * r * Math.sin(rad(th));
    chk(M, 20, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION", daily: true,
      stem: t`A force of $80\ \text{N}$ acts at the end of a lever $0.50\ \text{m}$ long, at $30^\circ$ to the lever. What is the moment of the force about the pivot at the other end?`,
      options: [
        ["20 N m", "Correct: 80 × 0.50 × sin 30° = 20 N m."],
        ["35 N m", "This uses cos 30°: the component along the lever has no moment."],
        ["40 N m", "This ignores the angle; only the perpendicular distance counts."],
        ["80 N m", "This divides by sin 30° instead of multiplying."],
      ],
      answer: "A",
      explanation: t`Perpendicular distance $= 0.50\sin 30^\circ = 0.25\ \text{m}$; moment $= 80 \times 0.25 = 20\ \text{N m}$. (With cos the answer would be $${sfStr(F * r * Math.cos(rad(th)), 2)}\ \text{N m}$.)`,
      hints: ["Find the perpendicular distance from the pivot to the line of the force."],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`Two forces of $12\ \text{N}$ form a couple. Their lines of action are $0.25\ \text{m}$ apart. What is the torque of the couple?`,
    options: [
      ["3.0 N m", "Correct: one force × separation = 12 × 0.25."],
      ["6.0 N m", "This adds both forces' moments about one line of action incorrectly (2Fd)."],
      ["1.5 N m", "This uses half the separation for only one force."],
      ["48 N m", "This divides the force by the distance."],
    ],
    answer: "A",
    explanation: t`$\tau = Fd = 12 \times 0.25 = 3.0\ \text{N m}$. (About the midpoint: $2 \times 12 \times 0.125 = 3.0\ \text{N m}$, the same.)`,
    hints: ["Torque of a couple = one force × perpendicular separation."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A couple acts on a body that is free to move. Which statement is correct?",
    options: [
      ["The resultant force is zero and the resultant torque is not zero.", "Correct: equal and opposite forces cancel, but their moments add."],
      ["The resultant force and the resultant torque are both zero.", "The moments of the two forces are in the same sense, so they do not cancel."],
      ["The resultant force is not zero and the resultant torque is zero.", "The forces are equal and opposite, so their resultant is zero."],
      ["The resultant force and the resultant torque are both not zero.", "A couple has zero resultant force by definition."],
    ],
    answer: "A",
    explanation: "A couple produces rotation without translation: zero resultant force, non-zero resultant torque.",
    hints: ["Add the forces as vectors, then add their moments."],
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "A flat irregular sheet of metal hangs freely from a pin through a small hole near its edge and comes to rest. Which statement is correct?",
    options: [
      ["Its centre of gravity lies vertically below the pin.", "Correct: only then does the weight have no moment about the pin."],
      ["Its centre of gravity lies at the pin.", "The pin is at the edge; the weight acts at the centre of gravity, which is below it."],
      ["Its centre of gravity lies on the horizontal line through the pin.", "Then the weight would have its largest moment, and the sheet would swing."],
      ["Its centre of gravity can be anywhere, because the pin supports the weight.", "The sheet rotates until the weight's line of action passes through the pin."],
    ],
    answer: "A",
    explanation: "At rest there is no resultant moment about the pin, so the weight's line of action passes through it: the centre of gravity is directly below the pin. A plumb line marks this line; repeating from a second hole locates the centre of gravity where the lines cross.",
    hints: ["When does the weight have zero moment about the pin?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A force of $45\ \text{N}$ is applied at right angles to a door at a perpendicular distance of $0.28\ \text{m}$ from the hinges. Calculate the moment about the hinges, in N m.`,
    value: 45 * 0.28, unit: "N m", wrong: [45 / 0.28, 45 * 28],
    explanation: t`Moment $= Fd = 45 \times 0.28 = ${dpStr(45 * 0.28, 1)}\ \text{N m}$.`,
  });
  {
    const tau = 1.8, w = 0.06;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A tap handle is turned by a couple of torque $1.8\ \text{N m}$. The two forces from the fingers act on opposite ends of the handle, $6.0\ \text{cm}$ apart, perpendicular to it. Calculate the size of each force, in N.`,
      value: tau / w, unit: "N", wrong: [tau / (2 * w), tau / 6],
      explanation: t`$\tau = Fd$, so $F = \dfrac{1.8}{0.060} = ${tau / w}\ \text{N}$. Halving it (15 N) wrongly shares the torque between the forces; using 6.0 instead of 0.060 m forgets the conversion.`,
      hints: ["Convert 6.0 cm to metres."],
    });
  }
  {
    const tau = 50, r = 0.4, th = 70;
    const F = tau / (r * Math.sin(rad(th)));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A wheel nut on a truck needs a moment of $50\ \text{N m}$ to loosen it. Farai can only pull the end of the $0.40\ \text{m}$ wheel brace at $70^\circ$ to the brace. Calculate the force he must apply, in N, to three significant figures.`,
      value: F, unit: "N", wrong: [tau / (r * Math.cos(rad(th))), tau / r],
      explanation: t`1. Moment $= Fr\sin\theta$.
2. $50 = F \times 0.40 \times \sin 70^\circ$.
3. $F = \dfrac{50}{0.40 \times ${dpStr(Math.sin(rad(th)), 4)}} = ${sfStr(F, 3)}\ \text{N}$.
4. Using $\cos 70^\circ$ gives a much larger, wrong force; ignoring the angle gives 125 N, too small.`,
      hints: ["Moment = F r sin θ.", "Rearrange for F."],
    });
  }
  {
    const W = 700, depth = 0.6, h = 1.5;
    const Pf = (W * depth / 2) / h;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A uniform wardrobe of weight $700\ \text{N}$ stands on a rough floor. It is $0.60\ \text{m}$ deep. A horizontal force is applied to its front face at a height of $1.5\ \text{m}$, pushing towards the back. Calculate the smallest force, in N, that will start to tip it about its back bottom edge (it does not slide).`,
      value: Pf, unit: "N", wrong: [(W * depth) / h, (W * depth / 2) * h],
      explanation: t`1. About the back edge, the weight acts at the centre, $0.30\ \text{m}$ horizontally from the edge: moment $= 700 \times 0.30 = 210\ \text{N m}$.
2. The push acts $1.5\ \text{m}$ above the edge: moment $= 1.5P$.
3. $1.5P = 210$, so $P = ${Pf}\ \text{N}$.
4. Using the full depth (0.60 m) for the weight's distance doubles the answer.`,
      hints: ["Take moments about the edge it tips over.", "The weight acts at the centre of the base width."],
    });
  }
  {
    const L = 2.0, W = 40, RA = 25;
    const RB = W - RA;
    const x = (RB * L) / W;
    chk(x, 0.75);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A non-uniform log of length $2.0\ \text{m}$ and weight $40\ \text{N}$ rests horizontally on two supports at its ends A and B. The support at A pushes up with $25\ \text{N}$. How far from A, in m, is the log's centre of gravity?`,
      value: x, unit: "m", wrong: [(RA * L) / W, L / 2],
      explanation: t`1. Upward forces balance the weight: $R_B = 40 - 25 = ${RB}\ \text{N}$.
2. Moments about A: $40x = ${RB} \times 2.0$.
3. $x = ${x}\ \text{m}$ from A: nearer A, the end with the larger support force, as expected.
4. Using 25 N with moments about A gives 1.25 m, which is the distance from B, not from A: always state the point you measure from.`,
      hints: ["Find the force at B first.", "Take moments about A."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The torque of a couple depends on the point about which the moments are taken.",
    answer: false,
    explanation: "False. For a couple the moments about any point add to one force × the perpendicular separation of the lines of action, so the torque is the same about every point.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A force whose line of action passes through the pivot has no moment about that pivot.",
    answer: true,
    explanation: "True. The perpendicular distance from the pivot to the line of action is zero, so the moment is zero, however large the force.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its description.",
    pairs: [
      ["moment of a force", "force × perpendicular distance from a point to its line of action"],
      ["torque of a couple", "one force × perpendicular separation of the two lines of action"],
      ["centre of gravity", "point where the whole weight may be taken to act"],
      ["couple", "equal, opposite forces with parallel, different lines of action"],
    ],
    explanation: "Moment and torque are both in N m; a couple is a pair of forces; the centre of gravity is a point.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A couple produces {{blank:a}} only, because its resultant {{blank:b}} is zero while its resultant {{blank:c}} is not.",
    blanks: [
      { id: "a", accepted: ["rotation"], choices: ["rotation", "translation", "acceleration in a line"] },
      { id: "b", accepted: ["force"], choices: ["force", "torque", "moment"] },
      { id: "c", accepted: ["torque"], choices: ["torque", "force", "weight"] },
    ],
    explanation: "Equal and opposite forces give zero resultant force (no linear acceleration); their moments add, so there is a resultant torque (rotation).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the SI unit of the torque of a couple (symbols).",
    accepted: ["N m", "Nm", "newton metre", "newton metres", "newton-metre", "N·m"],
    rejected: [{ value: "J", feedback: "Torque has the same base units as energy, but it is quoted in N m." }],
    wrong: ["J"],
    explanation: "Torque is measured in newton metres, **N m**. Although N m equals J in base units, joules are kept for energy.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define the torque of a couple.",
    points: ["(The product of) one of the forces (× …)", "× the perpendicular distance between the lines of action of the two forces."],
    modelAnswer: "The torque of a couple is the product of one of the forces and the perpendicular distance between the lines of action of the two forces.",
    explanation: "Both \"one of the forces\" and \"perpendicular distance between the lines of action\" are needed.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: t`Two forces, each of size $F$, form a couple with lines of action a perpendicular distance $d$ apart. Show that the total moment about any point P in their plane, a perpendicular distance $x$ from the nearer line of action (outside the pair), is $Fd$.`,
    points: [
      t`Moment of the farther force about P $= F(x + d)$, in one sense.`,
      t`Moment of the nearer force about P $= Fx$, in the opposite sense.`,
      t`Resultant moment $= F(x + d) - Fx = Fd$, independent of $x$.`,
    ],
    modelAnswer: t`About P, the farther force has moment $F(x + d)$ and the nearer force has moment $Fx$ in the opposite sense. The resultant moment is $F(x+d) - Fx = Fd$, which does not depend on $x$, so the torque is the same about every point.`,
    explanation: "The x terms cancel because the forces are equal and act in opposite senses about P.",
    hints: ["The forces turn in opposite senses about a point outside them."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how to find the centre of gravity of a flat sheet of card of irregular shape.",
    points: [
      "Make a small hole near the edge and hang the card freely from a pin (in a clamp) so it can swing.",
      "Hang a plumb line from the pin and, when both are at rest, mark the line on the card.",
      "Repeat from a second (and third) hole well away from the first.",
      "The centre of gravity is where the lines cross (it lies below the pin because the weight then has no moment about it).",
    ],
    modelAnswer: "Make a hole near the edge and hang the card freely from a pin held in a clamp. Hang a plumb line from the same pin and, when everything is still, mark the vertical line on the card. Repeat from another hole far from the first. The centre of gravity is where the lines cross, because at rest the weight's line of action passes through the point of suspension.",
    explanation: "At rest the weight has no moment about the pin, so the centre of gravity is on the vertical through it.",
    hints: ["Where must the centre of gravity be when the card hangs at rest?"],
  });

  // Practice structured: wheel brace (8 marks) with uncertainty
  {
    const F = 40, Fu = 1, d = 0.35, du = 0.005;
    const M = F * d;
    const pct = pctUnc(Fu, F) + pctUnc(du, d);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A cross-shaped wheel brace has arms of length $0.35\ \text{m}$ measured from the centre. Tendai pushes down on one arm and pulls up on the opposite arm, each with a force of $40\ \text{N}$ perpendicular to the arms.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why these two forces form a couple.", points: ["The forces are equal in size and opposite in direction.", "Their lines of action are parallel but separated (on opposite sides of the nut)."], modelAnswer: "The two forces are equal and opposite, and act along parallel lines on opposite sides of the nut, so they form a couple." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the torque applied to the nut, in N m.", value: F * 2 * d, unit: "N m", wrong: [F * d], explanation: t`Separation $= 2 \times 0.35 = 0.70\ \text{m}$; torque $= 40 \times 0.70 = ${F * 2 * d}\ \text{N m}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Tendai now pushes on one arm only with the same force. Calculate the moment of his force about the nut, in N m.", value: M, unit: "N m", wrong: [F * 2 * d], explanation: t`$40 \times 0.35 = ${M}\ \text{N m}$: half the torque of the couple.` }),
        P.num({ label: "(d)", marks: 2, stem: t`The force is measured as $(40 \pm 1)\ \text{N}$ and the arm length as $(0.350 \pm 0.005)\ \text{m}$. Calculate the percentage uncertainty in the moment in (c), to two significant figures.`, value: pct, sf: 2, unit: "%", wrong: [pctUnc(Fu, F)], explanation: t`$\dfrac{1}{40} \times 100 = 2.5\%$; $\dfrac{0.005}{0.350} \times 100 = ${sfStr(pctUnc(du, d), 2)}\%$; for a product add: $${sfStr(pct, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Suggest why using one arm only can make the brace slip off the nut.", points: ["With one force there is a resultant (sideways) force on the brace, which must be provided by the nut pushing on it; the brace tends to move sideways or tilt off."], modelAnswer: "A single force gives a resultant force as well as a moment, so the brace is pushed sideways against the nut and can tilt or slip off; a couple turns it without any resultant force." }),
      ],
      explanation: "A couple from two hands gives twice the torque of one hand on one arm, and no resultant force.",
      hints: ["The separation of the lines of action is the full width of the brace.", "Percentage uncertainties add for a product."],
    });
  }
  // Practice structured: centre of gravity of a plank (6 marks)
  {
    const L = 3.0, W = 180, m = 30 * 9.81;
    // Plank balances on a pivot 1.20 m from end A when a 30 kg child... use a 50 N weight at end A
    const w = 50, pivot = 1.2;
    const x = pivot + (w * pivot) / W; // c.g. distance from A
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A non-uniform plank AB is $3.0\ \text{m}$ long and weighs $180\ \text{N}$. It balances horizontally on a pivot $1.20\ \text{m}$ from end A when a $50\ \text{N}$ load hangs from end A.`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "State what is meant by the centre of gravity of the plank.", points: ["The point at which the whole weight of the plank may be taken to act."], modelAnswer: "The point where the whole weight of the plank may be taken to act." }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate the distance of the plank's centre of gravity from end A, in m, to three significant figures.", value: x, unit: "m", wrong: [L / 2, (w * pivot) / W],
          explanation: t`About the pivot: anticlockwise $50 \times 1.20 = 60\ \text{N m}$; clockwise $180 \times y$, where $y$ is the distance of the centre of gravity beyond the pivot. $y = 60/180 = ${sfStr((w * pivot) / W, 3)}\ \text{m}$, so the centre of gravity is $1.20 + ${sfStr((w * pivot) / W, 3)} = ${sfStr(x, 3)}\ \text{m}$ from A.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the upward force of the pivot on the plank, in N.", value: W + w, unit: "N", wrong: [W], explanation: t`No resultant force: $R = 180 + 50 = ${W + w}\ \text{N}$.` }),
        P.manual({ label: "(d)", marks: 1, stem: "State which end of the plank is heavier and give a reason.", points: [t`End B: the centre of gravity (${sfStr(x, 3)} m from A) is beyond the midpoint (1.50 m), nearer B.`], modelAnswer: t`End B, because the centre of gravity is ${sfStr(x, 3)} m from A, past the midpoint, so more of the weight is nearer B.` }),
      ],
      explanation: "The load's moment about the pivot is balanced by the plank's own weight acting at its centre of gravity.",
      hints: ["The plank's weight acts at its centre of gravity, on the other side of the pivot from the load."],
    });
    void m;
  }

  b.card("DEFINITION", "**Centre of gravity**", "The point at which the whole weight of an object may be taken to act.");
  b.card("DEFINITION", "**Moment of a force**", "Force × perpendicular distance from the point to the line of action of the force.");
  b.card("DEFINITION", "**Couple**", "Two equal, opposite forces acting along parallel but different lines of action; they produce rotation only.");
  b.card("DEFINITION", "**Torque of a couple**", "One of the forces × the perpendicular distance between the lines of action of the two forces.");
  b.card("FORMULA", "Moment of a force at angle θ to a lever of length r", t`$M = Fr\sin\theta$ (N m)`);
  b.card("CONCEPT", "Why does a couple produce rotation only?", "Its forces are equal and opposite (zero resultant force) but their moments are in the same sense (non-zero torque).");
  b.card("FACT", "Torque of a couple about different points?", "The same about every point in the plane: Fd.");
  b.card("CONCEPT", "When does an object topple?", "When the vertical line through its centre of gravity falls outside its base.");
  b.card("CONCEPT", "How to find the centre of gravity of a lamina?", "Hang it freely from two points in turn and draw the plumb line each time; the lines cross at the centre of gravity.");
});
