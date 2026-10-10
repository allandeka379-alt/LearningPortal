// W1b: aphys.forces.equilibrium — conditions for equilibrium, principle of moments, vector triangles.
import { concept, P, t, chk, sfStr, dpStr, rad, deg, pctUnc, mean, halfRange } from "../lib.mjs";

concept("aphys.forces.equilibrium", { file: "forces/equilibrium", keyPrefix: "forces.equilibrium" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which are the conditions for a rigid body to be in equilibrium?",
    options: [
      ["The resultant force is zero and the resultant torque is zero.", "Correct: no linear and no angular acceleration."],
      ["The resultant force is zero; the torque may have any value.", "A non-zero torque would make the body rotate faster and faster."],
      ["The body is at rest and no forces act on it.", "Bodies in equilibrium usually have several forces acting; they balance. They may also move at constant velocity."],
      ["The clockwise moments are larger than the anticlockwise moments.", "Equilibrium needs them to be equal."],
    ],
    answer: "A",
    explanation: "Equilibrium: zero resultant force (translational equilibrium) and zero resultant torque about any point (rotational equilibrium).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Three non-parallel coplanar forces act on a body in equilibrium. Which statement must be true?",
    options: [
      ["Their lines of action pass through a single point.", "Correct: otherwise the third force would have a moment about the intersection of the other two."],
      ["The three forces are equal in magnitude.", "They form a closed triangle, which need not be equilateral."],
      ["Two of the forces are perpendicular to each other.", "This is a special case, not a requirement."],
      ["The largest force equals the sum of the other two.", "Vectors add by direction too; the largest force is less than the sum of the other two unless they are parallel."],
    ],
    answer: "A",
    explanation: "With zero resultant force the vectors form a closed triangle; with zero resultant torque their lines of action are concurrent (meet at one point).",
  });
  {
    const w = 0.5, dw = 40 - 10, dW = 50 - 40;
    const W = (w * dw) / dW;
    chk(W, 1.5, 1e-9);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A uniform metre rule balances on a pivot at the $40.0\ \text{cm}$ mark when a $0.50\ \text{N}$ weight hangs at the $10.0\ \text{cm}$ mark. What is the weight of the rule?`,
      options: [
        ["1.5 N", "Correct: 0.50 × 30 = W × 10."],
        ["0.17 N", "This inverts the ratio of the distances."],
        ["0.50 N", "The weights are at different distances, so they are not equal."],
        ["0.10 N", "This uses distances from the zero end (10 cm and 50 cm) instead of from the pivot."],
      ],
      answer: "A",
      explanation: t`The rule's weight acts at its centre (50.0 cm), $10.0\ \text{cm}$ from the pivot; the load is $30.0\ \text{cm}$ from the pivot. Moments: $0.50 \times 30.0 = W \times 10.0$, so $W = ${W}\ \text{N}$.`,
      hints: ["Where does the weight of a uniform rule act?", "Measure every distance from the pivot."],
    });
  }
  {
    const W = 30, th = 20;
    const T = W / (2 * Math.sin(rad(th)));
    b.mcq({
      d: 3, skill: "APPLICATION", daily: true,
      stem: t`A $30\ \text{N}$ lamp hangs from the midpoint of a wire. Each half of the wire makes $20^\circ$ with the horizontal. What is the tension in the wire?`,
      options: [
        [`${sfStr(T, 2)} N`, "Correct: 2T sin 20° = 30 N."],
        [`${sfStr(W / (2 * Math.cos(rad(th))), 2)} N`, "This uses cos 20°: the vertical component of a wire at 20° to the horizontal is T sin 20°."],
        [`${W / 2} N`, "Each half supports 15 N vertically, but the wire must pull much harder because it is nearly horizontal."],
        [`${sfStr(W / Math.sin(rad(th)), 2)} N`, "This forgets that both halves of the wire share the weight."],
      ],
      answer: "A",
      explanation: t`Vertically: $2T\sin 20^\circ = 30$, so $T = \dfrac{30}{2 \times ${dpStr(Math.sin(rad(th)), 3)}} = ${sfStr(T, 3)}\ \text{N}$. A nearly horizontal wire needs a tension much larger than the weight.`,
      hints: ["Resolve vertically.", "Each half has a vertical component T sin 20°."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A uniform ladder rests against a smooth vertical wall on rough ground. A painter climbs slowly up the ladder. Which statement is correct?",
    options: [
      ["The friction force needed at the ground increases as she climbs.", "Correct: her moment about the foot grows, so the wall must push harder, and friction must balance the wall's push."],
      ["The normal reaction of the ground increases as she climbs.", "The ground reaction equals the total weight throughout; it does not change as she moves."],
      ["The force of the wall on the ladder decreases as she climbs.", "Her moment about the foot increases, so the wall force increases."],
      ["The friction force at the ground stays constant as she climbs.", "Friction equals the wall force, which grows as she climbs."],
    ],
    answer: "A",
    explanation: "Moments about the foot: wall force × height = weights × horizontal distances. As she climbs her horizontal distance increases, so the wall force rises. Horizontally, friction = wall force, so the friction needed rises; if it exceeds the maximum friction the ladder slips. The vertical ground reaction stays equal to the total weight.",
    hints: ["Take moments about the foot of the ladder.", "Then resolve horizontally."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which object is in equilibrium?",
    options: [
      ["A kombi travelling at a constant 60 km/h along a straight, level road", "Correct: constant velocity means no resultant force; it is not rotating faster or slower."],
      ["A car going round a roundabout at a constant speed", "Its velocity changes direction, so there is a resultant (centripetal) force."],
      ["A ball at the top of its flight after being thrown upwards", "Its weight is an unbalanced force, even though it is momentarily at rest."],
      ["A wheel speeding up as a motor turns it", "There is a resultant torque, so it has angular acceleration."],
    ],
    answer: "A",
    explanation: "Equilibrium means zero resultant force and torque: the body is at rest or moving at constant velocity without changing its rotation. Momentarily at rest is not enough.",
  });
  {
    const w1 = 400, d1 = 1.5, w2 = 750;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`On a see-saw pivoted at its centre, Chipo (weight $400\ \text{N}$) sits $1.5\ \text{m}$ from the pivot. How far from the pivot, on the other side, must her father (weight $750\ \text{N}$) sit to balance her? Give your answer in m.`,
      value: (w1 * d1) / w2, unit: "m", wrong: [(w2 * d1) / w1],
      explanation: t`Principle of moments: $750d = 400 \times 1.5 = 600\ \text{N m}$, so $d = ${(w1 * d1) / w2}\ \text{m}$.`,
    });
  }
  {
    const L = 6.0, W = 900, a = 1.0, load = 1500, xl = 4.5;
    // supports at x = a and x = L (end B). Moments about the support at x=a
    const RB = (W * (L / 2 - a) + load * (xl - a)) / (L - a);
    const RA = W + load - RB;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A uniform beam $6.0\ \text{m}$ long and of weight $900\ \text{N}$ rests on two supports: P, $1.0\ \text{m}$ from the left end, and Q at the right end. A load of $1500\ \text{N}$ sits $4.5\ \text{m}$ from the left end. Calculate the force of support P on the beam, in N.`,
      value: RA, unit: "N", wrong: [RB, (W + load) / 2],
      explanation: t`Moments about P: $R_Q \times 5.0 = 900 \times 2.0 + 1500 \times 3.5 = ${W * 2 + load * 3.5}\ \text{N m}$, so $R_Q = ${RB}\ \text{N}$. Vertically: $R_P = 900 + 1500 - ${RB} = ${RA}\ \text{N}$.`,
      hints: ["Take moments about P to find the force at Q first.", "Distances are measured from P."],
    });
  }
  {
    const l = 0.9, Wr = 30, Wl = 45, th = 40;
    const T = (Wr * l / 2 + Wl * l) / (l * Math.sin(rad(th)));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A uniform horizontal bracket of length $0.90\ \text{m}$ and weight $30\ \text{N}$ is hinged to a wall. A wire from its outer end to a point higher up the wall makes $40^\circ$ with the bracket. A flower basket of weight $45\ \text{N}$ hangs from the outer end. Calculate the tension in the wire, in N, to three significant figures.`,
      value: T, unit: "N", wrong: [(Wr * l / 2 + Wl * l) / (l * Math.cos(rad(th))), (Wr + Wl) / Math.sin(rad(th))],
      explanation: t`1. Moments about the hinge (removes the hinge force).
2. Perpendicular distance of the wire from the hinge $= 0.90\sin 40^\circ = ${sfStr(l * Math.sin(rad(th)), 3)}\ \text{m}$.
3. $T \times ${sfStr(l * Math.sin(rad(th)), 3)} = 30 \times 0.45 + 45 \times 0.90 = ${Wr * 0.45 + Wl * 0.9}\ \text{N m}$.
4. $T = ${sfStr(T, 3)}\ \text{N}$. (Using $\cos 40^\circ$ gives the wrong perpendicular distance.)`,
      hints: ["Take moments about the hinge.", "Perpendicular distance from hinge to wire = length × sin 40°."],
    });
    const V = Wr + Wl - T * Math.sin(rad(th));
    const H = T * Math.cos(rad(th));
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`For the same bracket (length $0.90\ \text{m}$, weight $30\ \text{N}$, wire at $40^\circ$ to the bracket, $45\ \text{N}$ basket at the end, tension $${sfStr(T, 3)}\ \text{N}$), calculate the magnitude of the force exerted by the hinge on the bracket, in N, to three significant figures.`,
      value: Math.hypot(H, V), unit: "N", wrong: [H, Wr + Wl],
      explanation: t`1. Horizontally: $H = T\cos 40^\circ = ${sfStr(H, 3)}\ \text{N}$ (outwards from the wall).
2. Vertically: $V = 30 + 45 - T\sin 40^\circ = ${sfStr(V, 3)}\ \text{N}$ (upwards).
3. Magnitude $= \sqrt{H^2 + V^2} = ${sfStr(Math.hypot(H, V), 3)}\ \text{N}$, at $${sfStr(deg(Math.atan2(V, H)), 2)}^\circ$ above the horizontal.
4. The hinge force is not along the bracket because the bracket has weight.`,
      hints: ["Resolve horizontally and vertically.", "Combine the components with Pythagoras."],
    });
  }
  {
    const L = 6.0, W = 250, a = 70;
    const Nw = (W * (L / 2) * Math.cos(rad(a))) / (L * Math.sin(rad(a)));
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A uniform ladder $6.0\ \text{m}$ long and of weight $250\ \text{N}$ leans against a smooth vertical wall at $70^\circ$ to the horizontal ground. Calculate the friction force at the foot of the ladder, in N, to three significant figures.`,
      value: Nw, unit: "N", wrong: [(W * (L / 2) * Math.sin(rad(a))) / (L * Math.cos(rad(a))), W / 2],
      explanation: t`1. Moments about the foot: the weight acts $3.0\cos 70^\circ$ horizontally from it; the wall force acts $6.0\sin 70^\circ$ vertically above it.
2. $N_w \times 6.0\sin 70^\circ = 250 \times 3.0\cos 70^\circ$, so $N_w = ${sfStr(Nw, 3)}\ \text{N}$.
3. Horizontally, friction $= N_w = ${sfStr(Nw, 3)}\ \text{N}$.
4. Swapping sin and cos gives a friction nearly eight times too large.`,
      hints: ["Take moments about the foot.", "Friction balances the wall's push."],
    });
  }
  {
    const W = 120, a1 = 50, a2 = 50;
    const T = W / (2 * Math.sin(rad(a1)));
    void a2;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $120\ \text{N}$ picture hangs from a nail by a cord attached at two points on its frame. Each half of the cord makes $50^\circ$ with the horizontal. Calculate the tension in the cord, in N, to three significant figures.`,
      value: T, unit: "N", wrong: [W / (2 * Math.cos(rad(a1))), W / 2],
      explanation: t`$2T\sin 50^\circ = 120$, so $T = ${sfStr(T, 3)}\ \text{N}$.`,
      hints: ["Resolve vertically at the nail."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An object in equilibrium must be at rest.",
    answer: false,
    explanation: "False. Zero resultant force and torque mean no acceleration: the object may be at rest or moving at constant velocity (and rotating at a constant rate).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If three coplanar forces keep a body in equilibrium, their vectors drawn tip to tail form a closed triangle.",
    answer: true,
    explanation: "True. The resultant force is zero, so adding the three vectors tip to tail brings you back to the starting point.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each problem with the most efficient first step.",
    pairs: [
      ["A beam on two supports: find one support force", "take moments about the other support"],
      ["A hinged rod held by a cable: find the tension", "take moments about the hinge"],
      ["A weight held by two strings at an angle: find the tensions", "draw a closed vector triangle (or resolve)"],
      ["A ladder against a smooth wall: find the wall force", "take moments about the foot of the ladder"],
    ],
    explanation: "Take moments about the point where unknown forces act so that they drop out; for three concurrent forces use the closed triangle.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the principle of moments.",
    template: "For a body in equilibrium, the sum of the {{blank:a}} moments about any point equals the sum of the {{blank:b}} moments about the {{blank:c}} point.",
    blanks: [
      { id: "a", accepted: ["clockwise"], choices: ["clockwise", "upward", "resultant"] },
      { id: "b", accepted: ["anticlockwise"], choices: ["anticlockwise", "downward", "clockwise"] },
      { id: "c", accepted: ["same"], choices: ["same", "pivot", "central"] },
    ],
    explanation: "The point may be anywhere (not only the pivot), as long as both sums are taken about the same point.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the principle: for a body in equilibrium, the total clockwise moment about any point equals the total anticlockwise moment about that point.",
    accepted: ["principle of moments", "the principle of moments", "law of moments"],
    explanation: "The **principle of moments** is the rotational condition for equilibrium.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State the two conditions for a body to be in equilibrium.",
    points: ["The resultant force (in any direction) is zero.", "The resultant torque (moment) about any point is zero."],
    modelAnswer: "There is no resultant force acting on the body, and there is no resultant torque about any point.",
    explanation: "One condition is about forces (translation), the other about moments (rotation).",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the lines of action of three non-parallel forces that keep a body in equilibrium must pass through a single point.",
    points: [
      "The lines of action of two of the forces meet at a point; these two forces have no moment about that point.",
      "For no resultant torque, the third force must also have zero moment about that point.",
      "So its line of action must pass through the same point.",
    ],
    modelAnswer: "Take moments about the point where the lines of action of two of the forces cross: those two forces have no moment about it. For the resultant torque to be zero, the third force must also have zero moment there, so its line of action passes through the same point.",
    explanation: "Use the rotational condition about a cleverly chosen point.",
    hints: ["Choose the point where two of the lines of action meet."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A uniform ladder leans against a smooth wall on rough ground. Explain why it is more likely to slip when a person stands near the top than near the bottom.",
    points: [
      "Taking moments about the foot: the person's weight has a larger perpendicular (horizontal) distance from the foot when near the top.",
      "So the wall must exert a larger horizontal force to balance the moments.",
      "Horizontal equilibrium: friction at the foot must equal the wall's force, so the friction needed increases.",
      "Friction has a maximum value; when the friction needed exceeds it, the ladder slips.",
    ],
    modelAnswer: "About the foot of the ladder, the person's weight has a larger moment when they are near the top because its horizontal distance from the foot is greater. The wall's horizontal push must increase to balance it. Horizontally, the friction at the foot must equal the wall's push, so more friction is needed. Friction cannot exceed its maximum value, so the ladder slips when the required friction is greater than this.",
    explanation: "Moments give the wall force; horizontal balance links it to friction.",
    hints: ["Take moments about the foot.", "What balances the wall's horizontal push?"],
  });

  // Practice structured: crane jib with uncertainty (12 marks)
  {
    const l = 4.0, Wj = 2000, load = 5000, th = 35;
    const T = (Wj * l / 2 + load * l) / (l * Math.sin(rad(th)));
    const H = T * Math.cos(rad(th));
    const V = Wj + load - T * Math.sin(rad(th));
    const m = [512, 507, 515, 509]; // kg readings of the load's mass
    const mm = mean(m), dm = halfRange(m);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A small crane at a Gweru builders' yard has a uniform horizontal jib $4.0\ \text{m}$ long and of weight $2000\ \text{N}$, hinged to a vertical mast. A tie cable from the outer end of the jib to the top of the mast makes $35^\circ$ with the jib. A load of weight $5000\ \text{N}$ hangs from the outer end.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "State the principle of moments.", points: ["For a body in equilibrium, the sum of clockwise moments about any point…", "…equals the sum of anticlockwise moments about the same point."], modelAnswer: "For a body in equilibrium, the total clockwise moment about any point equals the total anticlockwise moment about the same point." }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate the tension in the tie cable, in N, to three significant figures.", value: T, unit: "N", wrong: [(Wj * l / 2 + load * l) / (l * Math.cos(rad(th)))],
          explanation: t`About the hinge: $T \times 4.0\sin 35^\circ = 2000 \times 2.0 + 5000 \times 4.0 = 24\,000\ \text{N m}$; $T = ${sfStr(T, 3)}\ \text{N}$.` }),
        P.group({ label: "(c)", stem: "Calculate the components of the force of the hinge on the jib, in N, to three significant figures.", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the horizontal component", value: H, unit: "N", wrong: [T], explanation: t`$H = T\cos 35^\circ = ${sfStr(H, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the vertical component (give a negative value if it acts downwards)", value: V, unit: "N", wrong: [-V], explanation: t`$V = 2000 + 5000 - T\sin 35^\circ = 7000 - ${sfStr(T * Math.sin(rad(th)), 3)} = ${sfStr(V, 3)}\ \text{N}$, upwards: the cable's vertical pull supports most, but not all, of the weight.` }),
        ] }),
        P.num({ label: "(d)", marks: 2, stem: t`The load's mass is weighed four times: $${m[0]}$, $${m[1]}$, $${m[2]}$ and $${m[3]}\ \text{kg}$. Calculate the percentage uncertainty in the mean mass, using half the range, to two significant figures.`, value: pctUnc(dm, mm), sf: 2, unit: "%", wrong: [pctUnc(2 * dm, mm)],
          explanation: t`Mean $= ${dpStr(mm, 1)}\ \text{kg}$; half-range $= (515 - 507)/2 = ${dm}\ \text{kg}$; percentage $= ${sfStr(pctUnc(dm, mm), 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the tension in the cable would increase if the cable were attached lower down the mast.", points: ["The angle between cable and jib decreases, so the perpendicular distance from the hinge to the cable (4.0 sin θ) decreases.", "The moment needed is unchanged, so a larger tension is required."], modelAnswer: "Attaching the cable lower makes its angle with the jib smaller, so its perpendicular distance from the hinge, 4.0 sin θ, is smaller. The same moment (24 000 N m) must still be provided, so the tension must be larger." }),
      ],
      explanation: "Moments about the hinge give the tension; resolving gives the hinge force, which here has a small upward component.",
      hints: ["Take moments about the hinge.", "Resolve horizontally and vertically for the hinge force."],
    });
  }
  // Practice structured: vector triangle with a string pulled aside (8 marks)
  {
    const W = 6.0, ang = 25; // bob of weight 6.0 N pulled aside by a horizontal force, string at 25° to vertical
    const F = W * Math.tan(rad(ang));
    const T = W / Math.cos(rad(ang));
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A small ball of weight $6.0\ \text{N}$ hangs on a string. A horizontal force $F$ pulls it aside and holds it at rest with the string at $25^\circ$ to the vertical.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the closed vector triangle for the three forces on the ball (sides, directions and the angle between the weight and the tension).", points: ["A vertical side for the weight (downwards), a horizontal side for F, and the tension closing the triangle, tip to tail.", "The angle between the weight side and the tension side is 25°, and the triangle is right-angled between W and F."], modelAnswer: "Draw the weight as a vertical arrow downwards, then F horizontally from its tip, and the tension from the tip of F back to the start, along the string direction. The triangle has a right angle between W and F, and the angle between W and T is 25°." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate F, in N, to two significant figures.", value: F, sf: 2, unit: "N", wrong: [W * Math.sin(rad(ang))], explanation: t`$F = W\tan 25^\circ = 6.0 \times ${dpStr(Math.tan(rad(ang)), 3)} = ${sfStr(F, 2)}\ \text{N}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the tension in the string, in N, to two significant figures.", value: T, sf: 2, unit: "N", wrong: [W * Math.cos(rad(ang))], explanation: t`$T = \dfrac{W}{\cos 25^\circ} = ${sfStr(T, 2)}\ \text{N}$, larger than the weight.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the string can never be made exactly horizontal by increasing F.", points: ["The string's tension must have an upward vertical component to balance the weight.", "A horizontal string has no vertical component, so the weight would be unbalanced (T would need to be infinite)."], modelAnswer: "The tension is the only force with an upward component to balance the weight. If the string were horizontal it would have no vertical component, so no finite tension could support the ball." }),
      ],
      explanation: "Three forces in equilibrium form a closed right-angled triangle here: F = W tan θ, T = W / cos θ.",
      hints: ["Draw the triangle tip to tail.", "Use tan and cos with the 25° angle."],
    });
  }

  b.card("DEFINITION", "**Equilibrium** (of a rigid body)", "No resultant force and no resultant torque act on it.");
  b.card("DEFINITION", "**Principle of moments**", "For a body in equilibrium, total clockwise moment = total anticlockwise moment about any point.");
  b.card("CONCEPT", "Three coplanar forces in equilibrium: two facts", "Their lines of action pass through one point, and their vectors form a closed triangle.");
  b.card("CONCEPT", "Best point to take moments about?", "A point through which an unknown force acts, so that force has no moment and drops out.");
  b.card("CONCEPT", "How do you deal with a hinge force?", "Treat it as unknown horizontal and vertical components; take moments about the hinge to remove both.");
  b.card("FORMULA", "Tension in a wire with a central weight W, each side at θ to the horizontal", t`$T = \dfrac{W}{2\sin\theta}$`);
  b.card("FACT", "Ladder against a smooth wall: what equals the friction at the foot?", "The horizontal normal force of the wall.");
  b.card("CONCEPT", "Can a moving body be in equilibrium?", "Yes: if it moves at constant velocity and does not change its rotation.");
});
