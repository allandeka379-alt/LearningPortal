// W2a: aphys.waves.polarisation-malus (Cambridge only) — plane polarisation, filters, microwaves and grilles, I = I₀cos²θ.
import { concept, P, t, chk, sfStr, dpStr, malus, deg, rad, pctUnc, linFit, table } from "../lib.mjs";

const cos2 = (th) => Math.cos(rad(th)) ** 2;
concept("aphys.waves.polarisation-malus", { file: "waves/polarisation-malus", keyPrefix: "waves.polarisation-malus" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by saying that a light wave is plane polarised?",
    options: [
      ["Its oscillations are in one plane only, which contains the direction of travel.", "Correct: this is the definition."],
      ["It travels in a single plane only, so the beam never spreads out sideways.", "Polarisation concerns the direction of oscillation, not the direction of travel."],
      ["Its oscillations are all parallel to the direction in which the wave travels.", "That describes a longitudinal wave, which cannot be polarised."],
      ["It has a single frequency and a single wavelength throughout the beam.", "That describes monochromatic light, not polarised light."],
    ],
    answer: "A",
    explanation: "Plane polarised: the oscillations (of the electric field, for light) are confined to one plane containing the direction of propagation.",
  });
  {
    const I0 = 40, th = 60;
    const I = malus(I0, th);
    chk(I, 10, 1e-9);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`Plane-polarised light of intensity $40\ \text{W m}^{-2}$ is incident on a polarising filter whose transmission axis is at $60^\circ$ to the plane of polarisation. What is the transmitted intensity?`,
      options: [
        [t`$10\ \text{W m}^{-2}$`, "Correct: 40 × cos²60° = 40 × 0.25."],
        [t`$20\ \text{W m}^{-2}$`, "This uses cos 60° without squaring."],
        [t`$30\ \text{W m}^{-2}$`, "This uses sin²60° instead of cos²60°."],
        [t`$35\ \text{W m}^{-2}$`, "This uses sin 60° without squaring (40 × 0.866)."],
      ],
      answer: "A",
      explanation: t`$I = I_0\cos^2\theta = 40 \times (0.5)^2 = ${I}\ \text{W m}^{-2}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A polarising filter is rotated through 360° in a beam of plane-polarised light. How many times does the transmitted intensity fall to zero?",
    options: [
      ["2", "Correct: zero at 90° and 270°, where cos²θ = 0."],
      ["1", "cos²θ is zero twice in a full turn, at 90° and at 270°."],
      ["4", "There are four quarter-turns, but the zeros occur only at 90° and 270°."],
      ["0", "When the axis is perpendicular to the plane of polarisation, no light passes."],
    ],
    answer: "A",
    explanation: "I = I₀cos²θ: maxima at 0° and 180°, zeros at 90° and 270°.",
  });
  {
    const I0 = 1, a = 30, b2 = 60; // filter 1 at 30°, filter 2 at 90° to original
    const I = malus(malus(I0, a), b2);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Vertically polarised light of intensity $I_0$ passes through filter X, whose axis is at $30^\circ$ to the vertical, and then filter Y, whose axis is horizontal. What is the final intensity?`,
      options: [
        [t`$${dpStr(I, 4)}I_0$`, "Correct: I₀cos²30° × cos²60° = 0.75 × 0.25."],
        ["zero", "Y is horizontal, but the light reaching it is polarised along X's axis at 60° to Y, not 90°."],
        [t`$${dpStr(cos2(30) * cos2(30), 4)}I_0$`, "This uses 30° for both filters; the angle between X and Y is 60°."],
        [t`$${dpStr(Math.cos(rad(30)) * Math.cos(rad(60)), 3)}I_0$`, "This multiplies cos θ, not cos²θ, at each filter."],
      ],
      answer: "A",
      explanation: t`After X: $I_0\cos^2 30^\circ = 0.75I_0$, polarised at $30^\circ$. Angle between X and Y $= 60^\circ$: $0.75I_0 \times 0.25 = ${dpStr(I, 4)}I_0$.`,
      hints: ["The light leaving X is polarised along X's axis."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Microwaves from a transmitter with a vertical aerial pass through a grille of parallel metal rods to a receiver. When is the received signal smallest?",
    options: [
      ["when the rods are vertical", "Correct: rods parallel to the vertical electric-field oscillation absorb the wave."],
      ["when the rods are horizontal", "Horizontal rods are perpendicular to the oscillation, so the wave passes."],
      ["when the rods are at 45° to the vertical", "At 45° about half the intensity passes, which is not the minimum."],
      ["The signal does not depend on the orientation of the rods.", "The microwaves are polarised, so the orientation matters."],
    ],
    answer: "A",
    explanation: "The vertical aerial produces vertically polarised microwaves. Electrons in vertical rods are driven along them, absorbing the energy, so the transmitted signal is a minimum.",
  });
  {
    const th = deg(Math.acos(Math.sqrt(0.36)));
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The intensity of plane-polarised light falls to 36% of its value on passing through a polarising filter. What is the angle between the plane of polarisation and the filter's transmission axis?`,
      options: [
        [`${sfStr(th, 3)}°`, "Correct: cos θ = √0.36 = 0.60."],
        [`${sfStr(deg(Math.acos(0.36)), 3)}°`, "This forgets the square: cos θ = 0.36."],
        [`${sfStr(90 - th, 3)}°`, "This uses sin θ = 0.60, measuring from the wrong line."],
        [`${sfStr(deg(Math.acos(0.6 ** 4)), 3)}°`, "This squares 0.36 instead of taking its square root."],
      ],
      answer: "A",
      explanation: t`$\cos^2\theta = 0.36 \Rightarrow \cos\theta = 0.60 \Rightarrow \theta = ${sfStr(th, 3)}^\circ$.`,
      hints: ["Take the square root before the inverse cosine."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`In an experiment, the transmitted intensity $I$ of plane-polarised light is measured at several angles $\theta$. Which graph should give a straight line through the origin if Malus's law holds?`,
    options: [
      [t`$I$ against $\cos^2\theta$`, "Correct: I = I₀cos²θ is of the form y = mx with gradient I₀."],
      [t`$I$ against $\theta$`, "This gives a cos² curve, not a straight line."],
      [t`$I$ against $\cos\theta$`, "This is a parabola, because I depends on the square of cos θ."],
      [t`$\cos^2\theta$ against $\theta$`, "This does not involve the measured intensity and is a curve."],
    ],
    answer: "A",
    explanation: "Plot I (y) against cos²θ (x): a straight line through the origin with gradient I₀ confirms the law.",
    hints: ["Compare I = I₀cos²θ with y = mx."],
  });
  {
    const I0 = 250, th = 35;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Plane-polarised light of intensity $${I0}\ \text{W m}^{-2}$ is incident on a polarising filter with its axis at $${th}^\circ$ to the plane of polarisation. Calculate the transmitted intensity, in $\text{W m}^{-2}$, to three significant figures.`,
      value: malus(I0, th), unit: "W/m²", wrong: [I0 * Math.cos(rad(th)), I0 * Math.sin(rad(th)) ** 2],
      explanation: t`$I = 250 \times \cos^2 35^\circ = 250 \times ${dpStr(cos2(th), 4)} = ${sfStr(malus(I0, th), 3)}\ \text{W m}^{-2}$.`,
    });
  }
  {
    const I0 = 80, a = 20, b2 = 50;
    const I = malus(malus(I0, a), b2 - a);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Plane-polarised light of intensity $80\ \text{W m}^{-2}$, polarised vertically, passes through two filters. The first has its axis at $20^\circ$ to the vertical; the second has its axis at $50^\circ$ to the vertical (on the same side). Calculate the final intensity, in $\text{W m}^{-2}$, to three significant figures.`,
      value: I, unit: "W/m²", wrong: [malus(malus(I0, a), b2), malus(I0, b2)],
      explanation: t`1. After filter 1: $80\cos^2 20^\circ = ${sfStr(malus(I0, a), 4)}\ \text{W m}^{-2}$, polarised at $20^\circ$.
2. Angle between the filters $= 50^\circ - 20^\circ = 30^\circ$.
3. After filter 2: $${sfStr(malus(I0, a), 4)} \times \cos^2 30^\circ = ${sfStr(I, 3)}\ \text{W m}^{-2}$.
4. Using $50^\circ$ for the second filter ignores the change in polarisation at the first.`,
      hints: ["Light leaving filter 1 is polarised at 20° to the vertical."],
    });
  }
  {
    const n = 3, step = 30; // 3 filters each 30° beyond the last, from 0 to 90
    const I = cos2(step) ** n;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Vertically polarised light of intensity $I_0$ passes through three filters whose axes are at $30^\circ$, $60^\circ$ and $90^\circ$ to the vertical, in that order. Calculate the final intensity as a fraction of $I_0$, to three significant figures.`,
      value: I, wrong: [0, cos2(30) * cos2(60) * cos2(90)],
      explanation: t`1. Each filter is $30^\circ$ beyond the plane of the light reaching it.
2. $I = I_0(\cos^2 30^\circ)^3 = I_0 \times 0.75^3 = ${sfStr(I, 3)}I_0$.
3. Without the first two filters the horizontal filter would transmit nothing; rotating the plane in small steps lets ${Math.round(I * 100)}% through.`,
      hints: ["Apply Malus's law three times with the angle between successive axes."],
    });
  }
  {
    const I0 = 6.0, I = 1.5;
    const th = deg(Math.acos(Math.sqrt(I / I0)));
    chk(th, 60, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A light meter reads $6.0\ \text{W m}^{-2}$ for plane-polarised light with no filter in place. With a polarising filter in the beam the reading is $1.5\ \text{W m}^{-2}$. Calculate the smallest angle between the filter's axis and the plane of polarisation, in degrees.`,
      value: th, unit: "°", wrong: [deg(Math.acos(I / I0))],
      explanation: t`$\cos^2\theta = 1.5/6.0 = 0.25$, so $\cos\theta = 0.50$ and $\theta = ${th}^\circ$.`,
      hints: ["Find cos²θ, then take the square root."],
    });
  }
  // Uncertainty
  {
    const th = 50, dth = 2;
    const f = cos2(th), fHi = cos2(th - dth), fLo = cos2(th + dth);
    const absU = (fHi - fLo) / 2;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`In a Malus's law experiment the angle between the filter axis and the plane of polarisation is read as $(${th} \pm ${dth})^\circ$. Find the percentage uncertainty in $\cos^2\theta$ by calculating $\cos^2\theta$ at $${th - dth}^\circ$ and $${th + dth}^\circ$ and taking half the difference, to two significant figures.`,
      value: pctUnc(absU, f), sf: 2, unit: "%", wrong: [pctUnc(dth, th)],
      explanation: t`$\cos^2 ${th - dth}^\circ = ${dpStr(fHi, 4)}$, $\cos^2 ${th + dth}^\circ = ${dpStr(fLo, 4)}$; half the difference $= ${dpStr(absU, 4)}$ on $\cos^2 ${th}^\circ = ${dpStr(f, 4)}$, i.e. $${sfStr(pctUnc(absU, f), 2)}\%$. This is much larger than the ${sfStr(pctUnc(dth, th), 2)}% uncertainty in the angle, because cos²θ changes steeply near 50°.`,
      hints: ["Work out cos²θ at both limits of the angle."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Light that has passed through a polarising filter is polarised in the plane of that filter's transmission axis.",
    answer: true,
    explanation: "True. Only the component along the axis is transmitted, so the emerging light oscillates in that plane.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the angle between the plane of polarisation and a filter's axis is halved, the transmitted intensity doubles.",
    answer: false,
    explanation: "False. I depends on cos²θ, not on θ. For example, from 60° (I = 0.25I₀) to 30° (I = 0.75I₀) the intensity triples.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: t`Match each angle between the plane of polarisation and the filter axis with the fraction $I/I_0$ transmitted.`,
    pairs: [
      ["0°", "1"],
      ["30°", "0.75"],
      ["45°", "0.50"],
      ["60°", "0.25"],
      ["90°", "0"],
    ],
    explanation: "cos²0° = 1, cos²30° = 0.75, cos²45° = 0.50, cos²60° = 0.25, cos²90° = 0.",
    hints: ["Square the cosine of each angle."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete Malus's law.",
    template: "The intensity transmitted by a polarising filter is I = I₀ {{blank:a}}, where θ is the angle between the {{blank:b}} of the incident light and the filter's transmission axis.",
    blanks: [
      { id: "a", accepted: ["cos²θ"], choices: ["cos²θ", "cos θ", "sin²θ"] },
      { id: "b", accepted: ["plane of polarisation"], choices: ["plane of polarisation", "direction of travel", "wavelength"] },
    ],
    explanation: "I = I₀cos²θ; θ is measured from the plane of polarisation of the incident light.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Explain why the intensity transmitted by a polarising filter is proportional to $\cos^2\theta$ rather than $\cos\theta$.`,
    points: [
      "The filter transmits only the component of the oscillation (amplitude) along its axis.",
      t`So the transmitted amplitude is $A_0\cos\theta$.`,
      t`Intensity is proportional to amplitude squared, so $I \propto A_0^2\cos^2\theta$, i.e. $I = I_0\cos^2\theta$.`,
    ],
    modelAnswer: "A polarising filter passes only the component of the oscillation along its transmission axis, so the transmitted amplitude is A₀cos θ. Intensity is proportional to the square of the amplitude, so I = I₀cos²θ.",
    explanation: "Component of amplitude, then intensity ∝ amplitude².",
    hints: ["What does the filter do to the amplitude?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Two polarising filters are crossed so that no light passes. A third filter is placed between them with its axis at 45° to each. Explain why light now emerges.",
    points: [
      "The middle filter transmits the component of the light from the first filter along its own axis (cos²45° of the intensity).",
      "The light leaving it is polarised at 45° to the axis of the last filter, not 90°.",
      "So the last filter transmits a component, cos²45° of what reaches it: one quarter of the light leaving the first filter.",
    ],
    modelAnswer: "Light from the first filter is polarised along its axis. The middle filter passes the component at 45°, half the intensity, and re-polarises it at 45°. This light is now at 45° to the last filter rather than 90°, so the last filter passes half of it again: a quarter of the light leaving the first filter emerges.",
    explanation: "Each filter re-defines the plane of polarisation.",
    hints: ["What is the plane of polarisation after the middle filter?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Describe how you would test Malus's law in the laboratory using a laser that emits plane-polarised light, a polarising filter on a rotating mount with an angle scale, and a light sensor.",
    points: [
      "Shine the laser through the filter onto the light sensor (connected to a meter or data logger) in a darkened room.",
      "Rotate the filter to find the maximum reading (θ = 0) and record I₀.",
      "Record the reading I for a range of angles (e.g. every 10° from 0° to 90°), subtracting the background reading with the laser off.",
      "Plot I against cos²θ: a straight line through the origin with gradient I₀ confirms the law.",
    ],
    modelAnswer: "In a darkened room, shine the laser through the filter onto the light sensor. Turn the filter to give the maximum reading and call this θ = 0, recording I₀. Record the sensor reading at 10° intervals up to 90°, subtracting the background reading measured with the laser off. Plot I against cos²θ; Malus's law predicts a straight line through the origin with gradient I₀. Do not look into the laser beam.",
    explanation: "Arrangement, θ = 0 reference, range of readings with background correction, and the straight-line graph.",
    hints: ["Which graph gives a straight line?"],
  });
  // Practice structured: Malus data with a graph (14 marks)
  {
    const I0 = 4.80; // mW
    const ths = [0, 15, 30, 45, 60, 75];
    const noise = [0.04, -0.06, 0.05, -0.03, 0.02, -0.01];
    const Is = ths.map((th, i) => Number((malus(I0, th) + noise[i]).toFixed(2)));
    const xs = ths.map(cos2);
    const fit = linFit(xs, Is);
    const tab = table([t`$\theta\,/\,^\circ$`, t`$P\,/\,\text{mW}$`], ths.map((th, i) => [String(th), Is[i].toFixed(2)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Rudo shines plane-polarised laser light through a polarising filter onto a power meter. The angle $\theta$ between the filter axis and the plane of polarisation is varied and the power $P$ reaching the meter is recorded.

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate $\cos^2\theta$ for $\theta = 75^\circ$, to three significant figures.`, value: cos2(75), wrong: [Math.cos(rad(75))], explanation: t`$\cos^2 75^\circ = ${dpStr(cos2(75), 4)}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: t`Describe the graph you would plot to test Malus's law and the result you would expect.`, points: [t`Plot $P$ (y-axis) against $\cos^2\theta$ (x-axis).`, "Expect a straight line through the origin (gradient = power with no angle, P₀)."], modelAnswer: t`Plot $P$ against $\cos^2\theta$; if Malus's law holds the points lie on a straight line through the origin whose gradient is the incident power $P_0$.` }),
        P.num({ label: "(c)", marks: 3, stem: t`Determine the gradient of the best-fit line of $P$ against $\cos^2\theta$, in mW.`, value: fit.m, tol: 0.15, unit: "mW", wrong: [fit.m / 2], explanation: t`A line through the six points has gradient about $${sfStr(fit.m, 3)}\ \text{mW}$ (any good line gives 4.65 to 4.95 mW).` }),
        P.num({ label: "(d)", marks: 2, stem: t`Use your gradient to predict the power at $\theta = 52^\circ$, in mW, to two significant figures.`, value: fit.m * cos2(52), tol: 0.06, unit: "mW", wrong: [fit.m * Math.cos(rad(52))], explanation: t`$P = ${sfStr(fit.m, 3)} \times \cos^2 52^\circ = ${sfStr(fit.m * cos2(52), 2)}\ \text{mW}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`The power meter reading fluctuates by $\pm 0.05\ \text{mW}$. Calculate the percentage uncertainty in the reading at $\theta = 60^\circ$, to two significant figures.`, value: pctUnc(0.05, Is[4]), sf: 2, unit: "%", wrong: [pctUnc(0.05, Is[0])], explanation: t`$\dfrac{0.05}{${Is[4].toFixed(2)}} \times 100 = ${sfStr(pctUnc(0.05, Is[4]), 2)}\%$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the percentage uncertainty in P is larger at large angles, and suggest how this could be reduced.", points: ["The absolute fluctuation is about the same at every angle, but P is small at large angles, so the fractional uncertainty is larger.", "Use a more intense source / a more sensitive meter on a lower range / repeat and average readings / darken the room and subtract the background."], modelAnswer: "The fluctuation is roughly constant while P becomes small near 90°, so the percentage uncertainty grows. Repeating and averaging readings, using a more sensitive range and subtracting the background reading in a darkened room would reduce it." }),
        P.manual({ label: "(g)", marks: 2, stem: "State two safety precautions when using the laser.", points: ["Never look directly into the beam or its reflections (keep the beam below eye level).", "Remove reflective jewellery / block the beam with a matt screen beyond the meter / use a low-power (class 2) laser."], modelAnswer: "Never look into the beam or its reflections and keep it below eye level; end the beam on a matt screen and remove reflective items such as watches." }),
      ],
      explanation: "P = P₀cos²θ: P against cos²θ is a straight line through the origin with gradient P₀.",
      hints: ["Convert each angle to cos²θ before plotting."],
    });
  }

  // Practice structured: microwave receiver (6 marks)
  {
    const R0 = 0.90, th = 40, frac = 0.20;
    const thF = deg(Math.acos(Math.sqrt(frac)));
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A microwave transmitter with a vertical aerial faces a receiver $0.50\ \text{m}$ away. The receiver's meter reading is proportional to the intensity received and is $0.90\ \text{mA}$ when the receiver aerial is also vertical. The receiver is then rotated about the line joining them.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the reading when the receiver aerial is at $40^\circ$ to the vertical, in mA, to two significant figures.`, value: malus(R0, th), sf: 2, unit: "mA", wrong: [R0 * Math.cos(rad(th))], explanation: t`$0.90 \times \cos^2 40^\circ = ${sfStr(malus(R0, th), 2)}\ \text{mA}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the smallest angle from the vertical at which the reading is 20% of its maximum, in degrees, to three significant figures.", value: thF, unit: "°", wrong: [deg(Math.acos(frac))], explanation: t`$\cos^2\theta = 0.20 \Rightarrow \cos\theta = ${dpStr(Math.sqrt(frac), 3)} \Rightarrow \theta = ${sfStr(thF, 3)}^\circ$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "The receiver is returned to vertical and a grille of vertical metal rods is placed between transmitter and receiver. State and explain what happens to the reading.", points: ["The reading falls to (nearly) zero.", "The electric field of the wave oscillates vertically, parallel to the rods; it drives electrons along the rods, so the wave's energy is absorbed/reflected rather than transmitted."], modelAnswer: "The reading falls almost to zero. The microwaves are vertically polarised, so their electric field drives electrons up and down the vertical rods; the energy is absorbed and reflected by the grille and very little reaches the receiver." }),
      ],
      explanation: "Microwaves from a rod aerial are plane polarised; I = I₀cos²θ applies to the received intensity.",
      hints: ["The reading is proportional to intensity, so use cos²θ."],
    });
  }

  b.card("DEFINITION", "**Plane polarised**", "Oscillations in one plane only, containing the direction of travel.");
  b.card("FORMULA", "Malus's law", t`$I = I_0\cos^2\theta$ (θ between the plane of polarisation and the filter axis)`);
  b.card("CONCEPT", "Why cos²θ?", t`Transmitted amplitude $A_0\cos\theta$; intensity ∝ amplitude².`);
  b.card("FACT", "Filters in series", "Apply Malus's law at each filter using the angle between successive axes; a middle filter at 45° lets I₀/4 through crossed filters.");
  b.card("CONCEPT", "Metal grille and microwaves", "Rods parallel to the electric-field oscillation absorb the wave; perpendicular rods let it through.");
  b.card("FACT", "Straight-line test of Malus's law", t`Plot $I$ against $\cos^2\theta$: straight line through the origin, gradient $I_0$.`);
  b.card("FACT", "Syllabus scope", "Cambridge only; incident light is already plane polarised (the drop for unpolarised light is not examined).");
  b.card("FACT", "Zeros in a full turn", "Two: at 90° and 270°; maxima at 0° and 180°.");
});
