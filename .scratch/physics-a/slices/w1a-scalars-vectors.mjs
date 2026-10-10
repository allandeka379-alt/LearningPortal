// W1a: measurement.scalars-vectors — scalars and vectors, adding, subtracting and resolving.
import { concept, P, t as raw, chk, sfStr, dpStr, DATA, deg, rad } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.measurement.scalars-vectors";
const sin = (d) => Math.sin(rad(d));
const cos = (d) => Math.cos(rad(d));

concept(K, { file: "measurement/scalars-vectors", keyPrefix: "measurement.scalars-vectors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which list contains **only** vector quantities?",
    options: [
      ["displacement, acceleration, momentum", "Correct: each has a magnitude and a direction."],
      ["velocity, mass, force", "Mass is a scalar: it has no direction."],
      ["speed, weight, momentum", "Speed is a scalar; its vector partner is velocity."],
      ["energy, displacement, acceleration", "Energy is a scalar, even though it is calculated from vectors."],
    ],
    answer: "A",
    explanation: "Vectors: displacement, velocity, acceleration, force (including weight), momentum, field strength. Scalars: distance, speed, mass, time, energy, power, temperature, charge.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`Two forces of $7\ \text{N}$ and $4\ \text{N}$ act at a point; the angle between them can be anything. Which value could **not** be the magnitude of their resultant?`,
    options: [
      [t`$2\ \text{N}$`, "Correct: the smallest possible resultant is 7 − 4 = 3 N, when the forces are opposite."],
      [t`$3\ \text{N}$`, "Possible: the forces act in opposite directions."],
      [t`$8\ \text{N}$`, "Possible: some angle between the forces gives 8 N."],
      [t`$11\ \text{N}$`, "Possible: the forces act in the same direction."],
    ],
    answer: "A",
    explanation: t`The resultant of two forces lies between their difference and their sum: $3\ \text{N} \le R \le 11\ \text{N}$. $2\ \text{N}$ is outside this range.`,
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`A ball is kicked with a velocity of $20\ \text{m s}^{-1}$ at $30^\circ$ above the horizontal. What is the vertical component of its velocity?`,
    options: [
      [t`$10\ \text{m s}^{-1}$`, "Correct: 20 sin 30° = 10 m s⁻¹."],
      [t`$17\ \text{m s}^{-1}$`, "This is 20 cos 30°, the horizontal component."],
      [t`$20\ \text{m s}^{-1}$`, "This is the whole velocity, not its vertical component."],
      [t`$12\ \text{m s}^{-1}$`, "This is 20 tan 30°, which is not a component of the velocity."],
    ],
    answer: "A",
    explanation: t`The vertical component is opposite the $30^\circ$ angle: $v_y = 20\sin 30^\circ = 10\ \text{m s}^{-1}$; the horizontal component is $20\cos 30^\circ = 17\ \text{m s}^{-1}$.`,
  });
  {
    const W = 5 * DATA.g;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $5.0\ \text{kg}$ box rests on a ramp inclined at $30^\circ$ to the horizontal. What is the component of its weight acting down the ramp? ($g = 9.81\ \text{m s}^{-2}$)`,
      options: [
        [t`$${sfStr(W * sin(30), 3)}\ \text{N}$`, "Correct: mg sin 30°."],
        [t`$${sfStr(W * cos(30), 3)}\ \text{N}$`, "This is mg cos 30°, the component perpendicular to the ramp."],
        [t`$${sfStr(W, 3)}\ \text{N}$`, "This is the whole weight, not its component along the ramp."],
        [t`$${sfStr(W * Math.tan(rad(30)), 3)}\ \text{N}$`, "mg tan 30° is not a component of the weight."],
      ],
      answer: "A",
      explanation: t`Along the slope: $mg\sin\theta = 5.0 \times 9.81 \times \sin 30^\circ = ${sfStr(W * sin(30), 3)}\ \text{N}$. Check: on a flat surface ($\theta = 0$) the component along the surface is zero, so it must be the sine.`,
      hints: ["Which trigonometric function gives zero on a flat surface?"],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: t`A ball hits a wall at $12\ \text{m s}^{-1}$ and rebounds along the same line at $10\ \text{m s}^{-1}$. What is its change in velocity?`,
    options: [
      [t`$22\ \text{m s}^{-1}$ away from the wall`, "Correct: taking 'away' as positive, Δv = (+10) − (−12) = +22 m s⁻¹."],
      [t`$2\ \text{m s}^{-1}$ towards the wall`, "Subtracting the speeds ignores the reversal of direction."],
      [t`$2\ \text{m s}^{-1}$ away from the wall`, "Velocity is a vector: the reversal makes the change much larger than the change in speed."],
      [t`$22\ \text{m s}^{-1}$ towards the wall`, "The size is right but the change is in the direction of the final velocity, away from the wall."],
    ],
    answer: "A",
    explanation: t`Take away from the wall as positive: $u = -12\ \text{m s}^{-1}$, $v = +10\ \text{m s}^{-1}$, so $\Delta v = v - u = 10 - (-12) = +22\ \text{m s}^{-1}$, away from the wall.`,
    hints: ["Choose a positive direction and give each velocity a sign."],
  });
  {
    const R = Math.hypot(12, 9);
    const a = deg(Math.atan(9 / 12));
    chk(R, 15);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Forces of $12\ \text{N}$ and $9.0\ \text{N}$ act at right angles to each other on a point. What is their resultant?`,
      options: [
        [t`$15\ \text{N}$ at ${sfStr(a, 2)}° to the $12\ \text{N}$ force`, "Correct: √(12² + 9²) = 15 N and tan⁻¹(9/12) = 37°."],
        [t`$21\ \text{N}$ at ${sfStr(a, 2)}° to the $12\ \text{N}$ force`, "21 N is the arithmetic sum, correct only for parallel forces."],
        [t`$15\ \text{N}$ at ${sfStr(90 - a, 2)}° to the $12\ \text{N}$ force`, "53° is the angle to the 9.0 N force, not to the 12 N force."],
        [t`$3.0\ \text{N}$ at ${sfStr(a, 2)}° to the $12\ \text{N}$ force`, "3.0 N is the difference, correct only for opposite forces."],
      ],
      answer: "A",
      explanation: t`$R = \sqrt{12^2 + 9.0^2} = 15\ \text{N}$; $\tan\alpha = 9.0/12$, so $\alpha = ${sfStr(a, 2)}^\circ$ from the $12\ \text{N}$ force.`,
      hints: ["Perpendicular vectors: Pythagoras for size, tangent for direction."],
    });
  }
  {
    const x = 10 - 10 * cos(45);
    const y = 10 - 10 * sin(45);
    const R = Math.hypot(x, y);
    b.mcq({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Three forces of $10\ \text{N}$ each act on a point: one due east, one due north, and one towards the south-west ($45^\circ$ south of west). What is the magnitude of the resultant?`,
      options: [
        [t`$${sfStr(R, 3)}\ \text{N}$`, "Correct: each of the east and north totals is 10 − 10 cos 45° = 2.93 N, so R = √2 × 2.93 N."],
        [t`$${sfStr(Math.hypot(10, 10), 3)}\ \text{N}$`, "This ignores the third force."],
        [t`$10.0\ \text{N}$`, "The south-west force does not cancel exactly one of the others."],
        [t`$0\ \text{N}$`, "The south-west force is only 10 N; it would need to be 14.1 N to balance the other two."],
      ],
      answer: "A",
      explanation: t`East: $10 - 10\cos 45^\circ = ${sfStr(x, 3)}\ \text{N}$. North: $10 - 10\sin 45^\circ = ${sfStr(y, 3)}\ \text{N}$. $R = \sqrt{${sfStr(x, 3)}^2 + ${sfStr(y, 3)}^2} = ${sfStr(R, 3)}\ \text{N}$ towards the north-east.`,
      hints: ["Resolve every force into east and north components.", "Add the components, then use Pythagoras."],
    });
  }

  // Numerical and calculation items
  {
    const R = Math.sqrt(5 ** 2 + 7 ** 2 + 2 * 5 * 7 * cos(50));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Two forces of $5.0\ \text{N}$ and $7.0\ \text{N}$ act at a point with an angle of $50^\circ$ between them. Calculate the magnitude of the resultant, in N.`,
      value: R, unit: "N", wrong: [Math.sqrt(5 ** 2 + 7 ** 2 - 2 * 5 * 7 * cos(50)), 12, Math.hypot(5, 7)],
      explanation: t`1. Tip to tail, the angle in the triangle opposite the resultant is $180^\circ - 50^\circ = 130^\circ$.\n2. $R^2 = 5.0^2 + 7.0^2 - 2(5.0)(7.0)\cos 130^\circ = ${sfStr(R ** 2, 4)}$.\n3. $R = ${sfStr(R, 3)}\ \text{N}$.\n\nUsing $50^\circ$ in the cosine rule gives ${sfStr(Math.sqrt(74 - 70 * cos(50)), 3)} N (the difference of the vectors); adding magnitudes gives 12 N; Pythagoras gives ${sfStr(Math.hypot(5, 7), 3)} N.`,
      hints: ["Draw the triangle tip to tail; the angle opposite R is 130°."],
    });
  }
  {
    const Fx = 120 * cos(40);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`Nyasha pushes a lawn mower with a force of $120\ \text{N}$ along the handle, which is at $40^\circ$ below the horizontal. Calculate the horizontal component of the force, in N.`,
      value: Fx, unit: "N", wrong: [120 * sin(40)],
      explanation: t`Horizontal component $= 120\cos 40^\circ = ${sfStr(Fx, 3)}\ \text{N}$. ($120\sin 40^\circ = ${sfStr(120 * sin(40), 3)}\ \text{N}$ is the vertical, downward component, which presses the mower onto the grass.)`,
    });
  }
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "At what angle to the horizontal, in degrees, must a smooth ramp be set so that the component of an object's weight along the ramp is exactly half of its weight?",
    value: 30, unit: "°", wrong: [60, 45],
    explanation: t`$mg\sin\theta = \tfrac{1}{2}mg$, so $\sin\theta = 0.5$ and $\theta = 30^\circ$. ($\cos\theta = 0.5$ gives $60^\circ$, the angle at which the perpendicular component is half the weight.)`,
    hints: ["Set mg sin θ equal to ½mg."],
  });
  {
    const v = Math.hypot(60, 18);
    const a = deg(Math.atan(18 / 60));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A light aircraft heads due north with an airspeed of $60\ \text{m s}^{-1}$. A wind blows due east at $18\ \text{m s}^{-1}$. Calculate the speed of the aircraft relative to the ground, in $\text{m s}^{-1}$.`,
      value: v, unit: "m/s", wrong: [78, 42],
      explanation: t`1. The two velocities are perpendicular.\n2. $v = \sqrt{60^2 + 18^2} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.\n3. Direction: $\tan\theta = 18/60$, so $${sfStr(a, 3)}^\circ$ east of north.\n\n$78$ and $42\ \text{m s}^{-1}$ treat the wind as along the flight path.`,
      hints: ["The two velocities are at right angles."],
    });
  }
  {
    const T = 6.8 / cos(62);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`The string of a kite makes an angle of $62^\circ$ with the horizontal. The horizontal component of the tension in the string is $6.8\ \text{N}$. Calculate the tension in the string, in N.`,
      value: T, unit: "N", wrong: [6.8 * cos(62), 6.8 / sin(62)],
      explanation: t`1. Horizontal component $= T\cos 62^\circ$.\n2. $T = \dfrac{6.8}{\cos 62^\circ} = ${sfStr(T, 3)}\ \text{N}$.\n\nMultiplying instead of dividing gives ${sfStr(6.8 * cos(62), 3)} N, smaller than the component, which is impossible: a component is never larger than the vector.`,
      hints: ["Write the horizontal component in terms of T.", "A component cannot be bigger than the whole vector."],
    });
  }
  {
    const lo = 50 * sin(29);
    const hi = 50 * sin(31);
    const unc = (hi - lo) / 2;
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`A force of $50.0\ \text{N}$ acts at $30^\circ$ to a surface; the angle was measured with a protractor to $\pm 1^\circ$. Estimate the absolute uncertainty in the component $50.0\sin\theta$ by finding its values at $29^\circ$ and $31^\circ$, in N, to two significant figures.`,
      value: unc, sf: 2, unit: "N", wrong: [hi - lo],
      explanation: t`At $29^\circ$: $${sfStr(lo, 4)}\ \text{N}$; at $31^\circ$: $${sfStr(hi, 4)}\ \text{N}$. Half the difference is $${sfStr(unc, 2)}\ \text{N}$, so the component is $25.0 \pm ${sfStr(unc, 1)}\ \text{N}$, about 3 %. A small angle error matters: measure angles with a large protractor, or calculate them from measured lengths ($\sin\theta$ = height ÷ length of slope).`,
      hints: ["Calculate the component at the two extreme angles.", "The uncertainty is half the difference."],
    });
  }

  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "Weight is a vector quantity, but mass is a scalar quantity.",
    answer: true,
    explanation: "True. Weight is a force with a direction (towards the centre of the Earth); mass has magnitude only.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The resultant of two forces can be larger than the arithmetic sum of their magnitudes if the angle between them is chosen well.",
    answer: false,
    explanation: "False. The largest possible resultant is the arithmetic sum, reached when the forces are parallel. At any angle the resultant is smaller.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Classify each quantity as a scalar or a vector.",
    pairs: ["speed", "momentum", "kinetic energy", "electric field strength", "displacement", "temperature"],
    right: ["scalar", "vector"],
    rightIndex: [0, 1, 0, 1, 1, 0],
    explanation: "Scalars: speed, kinetic energy, temperature. Vectors: momentum, electric field strength (force per unit charge, with a direction) and displacement.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: t`Complete the components of the weight $mg$ of an object on a slope inclined at $\theta$ to the horizontal.`,
    template: "Along the slope the component is $mg$ {{blank:a}} $\\theta$; perpendicular to the slope it is $mg$ {{blank:b}} $\\theta$.",
    blanks: [
      { id: "a", accepted: ["sin"], choices: ["sin", "cos", "tan"] },
      { id: "b", accepted: ["cos"], choices: ["sin", "cos", "tan"] },
    ],
    explanation: t`$mg\sin\theta$ along the slope (zero on the flat) and $mg\cos\theta$ into the slope (the whole weight on the flat).`,
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to the single vector that has the same effect as two or more vectors acting together?",
    accepted: ["resultant", "the resultant", "resultant vector", "resultant force"],
    wrong: ["component"],
    explanation: "The **resultant** is the vector sum. Components are the reverse idea: two perpendicular vectors that together replace one vector.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Describe how to find the resultant of a $40\ \text{N}$ force and a $25\ \text{N}$ force at $70^\circ$ to each other by scale drawing.`,
    points: [
      t`Choose a suitable (large) scale, e.g. $1\ \text{cm}$ to $5\ \text{N}$, and draw the first force as an arrow of the correct length and direction`,
      t`Draw the second force tip to tail from the end of the first, at the correct angle ($70^\circ$ between their directions), measured with a protractor`,
      "Draw the resultant from the tail of the first to the tip of the second; measure its length (convert with the scale) and its angle with a protractor",
    ],
    modelAnswer: "Choose a scale such as 1 cm to 5 N. Draw an 8.0 cm arrow for the 40 N force. From its tip draw a 5.0 cm arrow for the 25 N force, turned through 70° from the direction of the first. Join the tail of the first arrow to the tip of the second: this is the resultant. Measure its length and multiply by 5 N cm⁻¹ for the magnitude, and measure its angle to the 40 N force with a protractor.",
    explanation: "Tip to tail, a stated scale, and the resultant measured for both magnitude and direction.",
    hints: ["Think: scale, tip to tail, measure."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "A kombi drives round a roundabout at a constant speed. Explain why its velocity is changing even though its speed is constant.",
    points: [
      "Velocity is a vector: it has magnitude (speed) and direction",
      "The direction of motion changes continuously, so the velocity changes (the kombi is accelerating)",
    ],
    modelAnswer: "Velocity is a vector quantity, made up of speed and direction. Although the speed stays the same, the kombi's direction of travel keeps changing as it goes round, so its velocity changes and it is accelerating.",
    explanation: "A change of direction is a change of velocity.",
    hints: ["What two things make up a velocity?"],
  });

  // Practice structured 1: crate pulled up a ramp by a rope at an angle to the ramp.
  {
    const m = 48;
    const th = 15;
    const T = 300;
    const phi = 25;
    const W = m * DATA.g;
    const Wpar = W * sin(th);
    const Wperp = W * cos(th);
    const Tpar = T * cos(phi);
    const Tperp = T * sin(phi);
    const N = Wperp - Tperp;
    const Fnet = Tpar - Wpar - 60;
    console.log("vectors ramp", W, Wpar, Wperp, Tpar, Tperp, N, Fnet);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`Workers at a Bulawayo warehouse pull a $48\ \text{kg}$ crate up a ramp inclined at $15^\circ$ to the horizontal. The rope pulls with a tension of $300\ \text{N}$ at $25^\circ$ above the surface of the ramp. A frictional force of $60\ \text{N}$ acts down the ramp. Take $g = 9.81\ \text{m s}^{-2}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the weight of the crate, in N.", value: W, unit: "N", wrong: [m], explanation: t`$W = mg = 48 \times 9.81 = ${sfStr(W, 3)}\ \text{N}$.` }),
        P.group({ label: "(b)", stem: "Calculate the components of the weight", parts: [
          P.num({ label: "(i)", marks: 1, stem: "down the ramp, in N;", value: Wpar, unit: "N", wrong: [Wperp], explanation: t`$W\sin 15^\circ = ${sfStr(Wpar, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "perpendicular to (into) the ramp, in N.", value: Wperp, unit: "N", wrong: [Wpar], explanation: t`$W\cos 15^\circ = ${sfStr(Wperp, 3)}\ \text{N}$.` }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate the components of the tension", parts: [
          P.num({ label: "(i)", marks: 1, stem: "along (up) the ramp, in N;", value: Tpar, unit: "N", wrong: [Tperp], explanation: t`$300\cos 25^\circ = ${sfStr(Tpar, 3)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "perpendicular to the ramp, away from its surface, in N.", value: Tperp, unit: "N", wrong: [Tpar], explanation: t`$300\sin 25^\circ = ${sfStr(Tperp, 3)}\ \text{N}$.` }),
        ] }),
        P.num({ label: "(d)", marks: 2, stem: "The crate does not accelerate perpendicular to the ramp. Calculate the normal contact force from the ramp on the crate, in N.", value: N, unit: "N", wrong: [Wperp, Wperp + Tperp], explanation: t`Perpendicular forces balance: $N + T\sin 25^\circ = W\cos 15^\circ$, so $N = ${sfStr(Wperp, 3)} - ${sfStr(Tperp, 3)} = ${sfStr(N, 3)}\ \text{N}$. The rope's upward pull reduces the contact force.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the resultant force on the crate along the ramp, in N.", value: Fnet, unit: "N", wrong: [Tpar - Wpar, T - Wpar - 60], explanation: t`Up the ramp: $${sfStr(Tpar, 3)} - ${sfStr(Wpar, 3)} - 60 = ${sfStr(Fnet, 3)}\ \text{N}$ (up the ramp). Forgetting friction gives ${sfStr(Tpar - Wpar, 3)} N; using the full 300 N ignores the angle.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why pulling the rope at an angle above the ramp, rather than parallel to it, can make the crate easier to move.", points: ["The perpendicular component of the tension lifts the crate slightly, reducing the normal contact force", "Friction depends on the normal contact force, so friction is reduced (although the component along the ramp is slightly smaller)"], modelAnswer: "Part of the tension acts away from the ramp surface and reduces the normal contact force between crate and ramp. The frictional force depends on how hard the surfaces are pressed together, so friction falls. If this reduction is more than the small loss in the component along the ramp (300 cos 25° instead of 300 N), the crate is easier to move." }),
        P.mcq({ label: "(g)", stem: "Which change would increase the component of the weight acting down the ramp?", options: [["Making the ramp steeper", "Correct: mg sin θ increases with θ."], ["Pulling the rope at a larger angle", "The rope angle affects the tension's components, not the weight's."], ["Lubricating the ramp", "This changes friction, not the weight or its components."], ["Pulling with a larger tension", "The tension does not change the weight or how it resolves."]], answer: "A", explanation: t`The component of weight along the ramp is $mg\sin\theta$, which increases as the ramp becomes steeper.` }),
      ],
      explanation: t`Resolve along and perpendicular to the ramp: weight components $${sfStr(Wpar, 3)}\ \text{N}$ and $${sfStr(Wperp, 3)}\ \text{N}$; tension components $${sfStr(Tpar, 3)}\ \text{N}$ and $${sfStr(Tperp, 3)}\ \text{N}$; $N = ${sfStr(N, 3)}\ \text{N}$; net force up the ramp $${sfStr(Fnet, 3)}\ \text{N}$.`,
      hints: ["Resolve every force along and perpendicular to the ramp.", "Perpendicular to the ramp the forces balance.", "Along the ramp, add the components with signs."],
    });
  }

  // Practice structured 2: crossing a river.
  {
    const vb = 3;
    const vc = 1.2;
    const w = 60;
    const v = Math.hypot(vb, vc);
    const ang = deg(Math.atan(vc / vb));
    const time = w / vb;
    const drift = vc * time;
    chk(time, 20);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`Tendai paddles a canoe at $3.0\ \text{m s}^{-1}$ relative to the water, always pointing straight across a river $60\ \text{m}$ wide. The river flows at $1.2\ \text{m s}^{-1}$ parallel to its banks.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the speed of the canoe relative to the river bank, in $\text{m s}^{-1}$.`, value: v, unit: "m/s", wrong: [vb + vc, vb - vc], explanation: t`The velocities are perpendicular: $\sqrt{3.0^2 + 1.2^2} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the angle between the canoe's path and the direction straight across the river, in degrees.", value: ang, unit: "°", wrong: [90 - ang], explanation: t`$\tan\theta = \dfrac{1.2}{3.0}$, so $\theta = ${sfStr(ang, 3)}^\circ$ downstream of straight across.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the time taken to cross the river, in s.", value: time, unit: "s", wrong: [w / v], explanation: t`Only the component across the river carries the canoe across: $t = 60/3.0 = 20\ \text{s}$. Dividing by the resultant speed (${sfStr(w / v, 3)} s) uses the wrong distance: the path is longer than 60 m.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate how far downstream the canoe lands, in m.", value: drift, unit: "m", explanation: t`$1.2 \times 20 = ${drift}\ \text{m}$ downstream.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Tendai wants to land directly opposite his starting point. Explain how he must point the canoe, and why the crossing then takes longer.", points: [t`Point the canoe partly upstream so that the upstream component of its velocity ($3.0\sin\alpha$) cancels the $1.2\ \text{m s}^{-1}$ current (at $\sin\alpha = 1.2/3.0$, about $24^\circ$ upstream)`, "Only the remaining component (3.0 cos α, less than 3.0 m s⁻¹) carries him across, so the crossing takes longer than 20 s"], modelAnswer: t`He must aim upstream at an angle $\alpha$ where $3.0\sin\alpha = 1.2$, so $\alpha \approx 24^\circ$, so that the upstream component of his velocity cancels the current. His velocity across the river is then $3.0\cos\alpha \approx 2.7\ \text{m s}^{-1}$, less than $3.0\ \text{m s}^{-1}$, so the crossing takes longer (about 22 s).` }),
      ],
      explanation: t`Velocities add as vectors: $${sfStr(v, 3)}\ \text{m s}^{-1}$ at $${sfStr(ang, 3)}^\circ$ downstream; the crossing time depends only on the component across the river ($20\ \text{s}$), giving a drift of $${drift}\ \text{m}$.`,
      hints: ["The two velocities are perpendicular.", "Which component of the velocity carries the canoe across?"],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Scalar quantity", "A quantity with magnitude only (e.g. mass, speed, energy, time).");
  b.card("DEFINITION", "Vector quantity", "A quantity with magnitude and direction (e.g. displacement, velocity, force, momentum).");
  b.card("DEFINITION", "Resultant", "The single vector with the same effect as two or more vectors acting together: their vector sum.");
  b.card("FORMULA", "Components of a vector F at angle θ to the x-axis", t`$F_x = F\cos\theta$, $F_y = F\sin\theta$`);
  b.card("FORMULA", "Weight components on a slope at angle θ", t`$mg\sin\theta$ along the slope; $mg\cos\theta$ perpendicular to it.`);
  b.card("CONCEPT", "How are vectors added graphically?", "Tip to tail; the resultant runs from the tail of the first to the tip of the last.");
  b.card("CONCEPT", "Range of the resultant of forces A and B", t`From $|A - B|$ (opposite) to $A + B$ (parallel).`);
  b.card("CONCEPT", "Change in velocity", t`$\Delta\mathbf{v} = \mathbf{v} - \mathbf{u}$, a vector subtraction: a rebound at the same speed changes the velocity by twice the speed.`);
  b.card("FORMULA", "Resultant of two forces with angle θ between them", t`$R^2 = A^2 + B^2 + 2AB\cos\theta$ (cosine rule with the triangle angle $180^\circ - \theta$)`);
});
