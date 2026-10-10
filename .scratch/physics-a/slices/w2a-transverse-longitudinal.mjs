// W2a: aphys.waves.transverse-longitudinal — comparing the two kinds, compressions/rarefactions, graphs, polarisation (qualitative).
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, mean, halfRange, table } from "../lib.mjs";

concept("aphys.waves.transverse-longitudinal", { file: "waves/transverse-longitudinal", keyPrefix: "waves.transverse-longitudinal" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a longitudinal wave?",
    options: [
      ["ultrasound in body tissue", "Correct: ultrasound is sound, and sound is longitudinal."],
      ["a radio wave from a transmitter", "Radio waves are electromagnetic, so they are transverse."],
      ["a wave on a guitar string", "The string moves at right angles to its length: a transverse wave."],
      ["an X-ray beam", "X-rays are electromagnetic, so they are transverse."],
    ],
    answer: "A",
    explanation: "All sound, including ultrasound, is longitudinal; electromagnetic waves and waves on strings are transverse.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement correctly describes a longitudinal wave?",
    options: [
      ["The particles oscillate parallel to the direction of energy transfer.", "Correct: this is the defining property."],
      ["The particles move along with the wave at the wave speed.", "Particles oscillate about fixed positions; there is no net transfer of the medium."],
      ["The particles oscillate perpendicular to the direction of energy transfer.", "This describes a transverse wave."],
      ["The wave can travel through a vacuum.", "Longitudinal waves are mechanical and need a medium."],
    ],
    answer: "A",
    explanation: "Longitudinal: oscillations along the direction of energy transfer, forming compressions and rarefactions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which observation shows that light is a transverse wave?",
    options: [
      ["Light can be plane polarised by a filter.", "Correct: only transverse waves can be polarised."],
      ["Light can be diffracted by a narrow slit.", "All waves diffract, transverse and longitudinal alike."],
      ["Light shows an interference pattern from two slits.", "Interference is shown by every kind of wave, including sound."],
      ["Light is refracted when it enters glass.", "Refraction happens to sound waves too, so it cannot distinguish them."],
    ],
    answer: "A",
    explanation: "Polarisation selects one plane of oscillation; a longitudinal wave has no such plane, so polarisation is the evidence for transverse waves.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A displacement-distance graph for a longitudinal wave travelling in the +x direction is a sine curve, with displacement to the right taken as positive. Where on the graph is the centre of a compression?",
    options: [
      ["where the curve crosses zero going from positive to negative as x increases", "Correct: particles on the left move right and those on the right move left, so they crowd together."],
      ["at a maximum positive displacement", "Particles here are displaced most, but their neighbours are displaced almost equally, so the spacing is normal."],
      ["where the curve crosses zero going from negative to positive as x increases", "Here the neighbours move apart: this is a rarefaction."],
      ["at a maximum negative displacement", "As at a positive peak, the spacing of particles here is normal."],
    ],
    answer: "A",
    explanation: "A compression is where the neighbours converge: positive (right) displacement on the left side, negative (left) on the right side, a downward zero-crossing.",
    hints: ["Which way are the particles on each side of the point pushed?"],
  });
  {
    const f = 425, v = 340;
    const d = v / f / 2;
    chk(d, 0.4);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A sound of frequency $${f}\ \text{Hz}$ travels through air at $${v}\ \text{m s}^{-1}$. What is the distance between a compression and the nearest rarefaction?`,
      options: [
        ["0.40 m", "Correct: λ = 340/425 = 0.80 m, and a compression to the nearest rarefaction is λ/2."],
        ["0.80 m", "This is a full wavelength, the distance between adjacent compressions."],
        ["0.20 m", "This is a quarter of a wavelength, from a compression to a point of maximum displacement."],
        ["1.25 m", "This inverts the wave equation, using f/v."],
      ],
      answer: "A",
      explanation: t`$\lambda = v/f = ${v}/${f} = ${v / f}\ \text{m}$; compression to rarefaction $= \lambda/2 = ${d}\ \text{m}$.`,
      hints: ["How many wavelengths separate a compression from the next rarefaction?"],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A microwave transmitter emits plane-polarised waves towards a receiver. A grille of parallel metal rods is placed between them. The received signal is a maximum. What happens to the signal as the grille is rotated slowly through 90° about the beam direction?",
    options: [
      ["It falls to a minimum, because the rods become parallel to the oscillations and absorb them.", "Correct: with rods perpendicular the wave passes; with rods parallel to the electric-field oscillation it is absorbed."],
      ["It stays the same, because microwaves cannot be polarised.", "Microwaves are electromagnetic and transverse, so they can be polarised."],
      ["It rises further, because the rods focus the waves on the receiver.", "The grille cannot add energy; it only removes the component it absorbs."],
      ["It falls to a minimum, because the rods diffract all the waves sideways.", "The effect depends on the orientation of the rods to the oscillation, which is absorption, not diffraction."],
    ],
    answer: "A",
    explanation: "A maximum means the rods are perpendicular to the oscillation. Rotating through 90° makes them parallel: the oscillations drive currents in the rods, the energy is absorbed and the signal falls to a minimum.",
    hints: ["Microwaves are transverse. What does the grille select?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which statement is true of both transverse and longitudinal waves?",
    options: [
      ["They both obey v = fλ.", "Correct: the wave equation applies to every progressive wave."],
      ["They can both be plane polarised.", "Only transverse waves can be polarised."],
      ["They can both travel through a vacuum.", "Longitudinal waves (sound) need a medium; only electromagnetic waves cross a vacuum."],
      ["They both have compressions and rarefactions.", "Compressions and rarefactions belong to longitudinal waves only."],
    ],
    answer: "A",
    explanation: "Both kinds transfer energy, obey v = fλ, reflect, refract, diffract and interfere; only transverse waves polarise.",
  });
  {
    const tP = 6.0, tS = 10.5, vP = 6.0e3;
    const d = vP * tP, vS = d / tS;
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`After an earth tremor, the longitudinal P-waves reach a seismometer in Kariba $6.0\ \text{s}$ after the tremor began and the transverse S-waves arrive $4.5\ \text{s}$ later. The P-waves travel at $6.0\ \text{km s}^{-1}$ along the same path. What is the speed of the S-waves?`,
      options: [
        [t`$${sfStr(vS / 1000, 2)}\ \text{km s}^{-1}$`, "Correct: distance = 6.0 × 6.0 = 36 km; the S-waves take 6.0 + 4.5 = 10.5 s."],
        [t`$${sfStr(d / 4.5 / 1000, 2)}\ \text{km s}^{-1}$`, "This uses only the 4.5 s delay as the S-wave travel time."],
        [t`$${sfStr(vP / 1000, 2)}\ \text{km s}^{-1}$`, "This is the P-wave speed; the later arrival means the S-waves are slower."],
        [t`$${sfStr((vP * 4.5) / tP / 1000, 2)}\ \text{km s}^{-1}$`, "This scales the P-wave speed by 4.5/6.0, using the delay instead of the S-wave travel time of 10.5 s."],
      ],
      answer: "A",
      explanation: t`Distance $= 6.0 \times 10^{3} \times 6.0 = 3.6 \times 10^{4}\ \text{m}$. S-wave time $= 10.5\ \text{s}$, so $v_S = 3.6 \times 10^{4}/10.5 = ${sfStr(vS / 1000, 2)}\ \text{km s}^{-1}$.`,
      hints: ["Find the distance from the P-wave data first.", "The S-waves arrive 4.5 s after the P-waves, not 4.5 s after the tremor."],
    });
  }
  {
    const v = 5.1e3, f = 1.7e4;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A longitudinal wave of frequency $17\ \text{kHz}$ travels along a steel rail at $5.1 \times 10^{3}\ \text{m s}^{-1}$. Calculate the distance between adjacent compressions, in m.`,
      value: v / f, unit: "m", wrong: [v / f / 2, v / 17],
      explanation: t`Adjacent compressions are one wavelength apart: $\lambda = v/f = \dfrac{5.1 \times 10^{3}}{1.7 \times 10^{4}} = ${v / f}\ \text{m}$.`,
    });
  }
  {
    const lam = 0.72;
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`In a sound wave the distance from the centre of a compression to the centre of the nearest rarefaction is $0.36\ \text{m}$. The frequency is $470\ \text{Hz}$. Calculate the speed of the sound, in $\text{m s}^{-1}$, to three significant figures.`,
      value: 470 * lam, unit: "m/s", wrong: [470 * 0.36],
      explanation: t`Compression to rarefaction is $\lambda/2$, so $\lambda = 0.72\ \text{m}$; $v = f\lambda = 470 \times 0.72 = ${sfStr(470 * lam, 3)}\ \text{m s}^{-1}$. Using 0.36 m as the wavelength halves the answer.`,
      hints: ["What fraction of a wavelength is 0.36 m?"],
    });
  }
  {
    const f = 1.2e3;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`Compressions of a $1.2\ \text{kHz}$ sound wave pass a microphone. Calculate the time interval between successive compressions arriving at the microphone, in ms, to three significant figures.`,
      value: 1000 / f, unit: "ms", wrong: [1 / f, 1000 / f / 2],
      explanation: t`Successive compressions arrive once per period: $T = 1/f = 1/1200 = ${sfStr(1 / f, 3)}\ \text{s} = ${sfStr(1000 / f, 3)}\ \text{ms}$.`,
    });
  }
  // Experiment with uncertainty: speed of sound by echo timing
  {
    const d = 85.0, ts = [0.51, 0.49, 0.53, 0.50, 0.52];
    const tm = mean(ts), v = (2 * d) / tm, pct = pctUnc(halfRange(ts), tm);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda stands $${d.toFixed(1)}\ \text{m}$ from a tall wall and claps. Chipo uses a stop-watch to time the interval between the clap and its echo. Five trials give ${ts.map((x) => x.toFixed(2)).join(", ")} s. Calculate the speed of sound from the mean time, in $\text{m s}^{-1}$, to three significant figures.`,
      value: v, unit: "m/s", wrong: [d / tm],
      explanation: t`1. Mean time $= ${dpStr(tm, 2)}\ \text{s}$.
2. The sound travels to the wall and back: distance $= 2 \times ${d.toFixed(1)} = ${2 * d}\ \text{m}$.
3. $v = ${2 * d}/${dpStr(tm, 2)} = ${sfStr(v, 3)}\ \text{m s}^{-1}$.
4. The half-range of the times is $${dpStr(halfRange(ts), 2)}\ \text{s}$, a ${sfStr(pct, 2)}% uncertainty; human reaction time is the main limitation, so timing many claps in rhythm with the echoes is better.`,
      hints: ["The echo travels to the wall and back."],
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sound waves can be plane polarised.",
    answer: false,
    explanation: "False. Sound is longitudinal: its oscillations are along the direction of travel, so there is no plane to select.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a longitudinal wave, the pressure is greatest at a compression.",
    answer: true,
    explanation: "True. Particles are closest together at a compression, so the pressure is above normal there; at a rarefaction it is below normal.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each wave with its type and a correct property.",
    pairs: [
      ["sound in air", "longitudinal; needs a medium"],
      ["light from the Sun", "transverse; crosses a vacuum"],
      ["a wave on a stretched rope", "transverse; mechanical"],
      ["seismic P-wave", "longitudinal; travels through rock and liquid"],
    ],
    explanation: "Sound and P-waves are longitudinal; light (electromagnetic) and rope waves are transverse. Only light needs no medium.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct terms.",
    template: "In a longitudinal wave, a region where the particles are further apart than normal is a {{blank:a}}. The distance between two adjacent compressions is one {{blank:b}}. Only {{blank:c}} waves can be polarised.",
    blanks: [
      { id: "a", accepted: ["rarefaction"], choices: ["rarefaction", "compression", "trough"] },
      { id: "b", accepted: ["wavelength"], choices: ["wavelength", "amplitude", "half-wavelength"] },
      { id: "c", accepted: ["transverse"], choices: ["transverse", "longitudinal", "mechanical"] },
    ],
    explanation: "Rarefaction = low-pressure region; compression to compression = λ; polarisation needs transverse oscillations.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the region of a sound wave where the air molecules are closest together.",
    accepted: ["compression", "a compression", "compressions"],
    wrong: ["rarefaction"],
    explanation: "A **compression** is a region of higher-than-normal pressure where particles are crowded together.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State the difference between a transverse wave and a longitudinal wave.",
    points: ["Transverse: oscillations (of particles) are perpendicular to the direction of energy transfer / wave travel.", "Longitudinal: oscillations are parallel to the direction of energy transfer / wave travel."],
    modelAnswer: "In a transverse wave the particles oscillate at right angles to the direction of energy transfer; in a longitudinal wave they oscillate parallel to it.",
    explanation: "Both directions must be compared with the direction of energy transfer.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why light can be polarised but sound cannot.",
    points: [
      "Light is a transverse wave: its oscillations can be in any plane perpendicular to the direction of travel.",
      "A polarising filter transmits only the oscillations in one plane, so the light emerging is plane polarised.",
      "Sound is longitudinal: its oscillations are along the direction of travel, so there is no plane to select / a filter affects every orientation equally.",
    ],
    modelAnswer: "Light is transverse, so its oscillations can lie in many planes perpendicular to its direction of travel; a polarising filter passes only one plane, so the light becomes plane polarised. Sound is longitudinal: its oscillations are along the direction of travel, so there is no plane to select and it cannot be polarised.",
    explanation: "Link polarisation to the direction of oscillation for each kind of wave.",
    hints: ["What does a polariser select?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A long slinky spring lies on a smooth bench. Describe how you would use it to show (i) a transverse wave and (ii) a longitudinal wave, and how you would show that only one of them can be polarised.",
    points: [
      "Transverse: move one end repeatedly from side to side, at right angles to the slinky's length.",
      "Longitudinal: push and pull one end repeatedly along the slinky's length, producing compressions and rarefactions.",
      "Pass the slinky through a narrow vertical slot: the side-to-side (horizontal) transverse wave is stopped but a vertical one passes; the longitudinal wave passes whatever the slot's orientation.",
    ],
    modelAnswer: "For a transverse wave, move one end from side to side across the slinky's length. For a longitudinal wave, push and pull the end along its length so that compressions and rarefactions travel along it. Thread the slinky through a narrow slot: a transverse wave oscillating across the slot is stopped while one along the slot passes, but the longitudinal wave passes for every orientation of the slot.",
    explanation: "Direction of hand movement relative to the slinky defines the wave type; a slot tests for polarisation.",
    hints: ["Which way does your hand move relative to the slinky in each case?"],
  });
  // Practice structured: longitudinal wave snapshot (12 marks)
  {
    const lam = 0.80, A = 6.0, f = 425;
    const xs = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    const s = xs.map((x) => -A * Math.sin((2 * Math.PI * x) / lam));
    const tab = table([t`$x\,/\,\text{m}$`, t`$s\,/\,\mu\text{m}$`], xs.map((x, i) => [x.toFixed(1), dpStr(Math.abs(s[i]) < 1e-9 ? 0 : s[i], 1)]));
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A sound wave travels through air in the $+x$ direction. The table gives the displacement $s$ of air layers at one instant; displacement in the $+x$ direction is positive. The frequency is $${f}\ \text{Hz}$.

${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`State the amplitude of the wave, in $\mu\text{m}$.`, value: A, unit: "µm", wrong: [2 * A], explanation: t`The largest displacement is $${A.toFixed(1)}\ \mu\text{m}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "State the wavelength, in m.", value: lam, unit: "m", wrong: [lam / 2], explanation: t`The pattern repeats after $${lam.toFixed(2)}\ \text{m}$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the speed of the sound, in $\text{m s}^{-1}$.`, value: f * lam, unit: "m/s", wrong: [f / lam], explanation: t`$v = f\lambda = ${f} \times ${lam} = ${f * lam}\ \text{m s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "State the value of x, in m, at the centre of the rarefaction shown in the table.", value: 0.4, unit: "m", wrong: [0.2], explanation: t`At $x = 0.3\ \text{m}$ the layer is displaced in the $-x$ direction (away from 0.4 m) and at $x = 0.5\ \text{m}$ in the $+x$ direction (also away), so the layers spread apart: a rarefaction centred at $x = 0.4\ \text{m}$, where $s = 0$ and changes from negative to positive. Compressions are at $x = 0$ and $x = 0.8\ \text{m}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain how you decided where the rarefaction is.", points: ["At a rarefaction, layers on the side of smaller x are displaced in the −x direction and layers on the side of larger x in the +x direction…", "…so the layers move apart there; the centre is at zero displacement, where s changes from negative to positive."], modelAnswer: "The layer just before x = 0.4 m is pushed back (−x) and the layer just after it is pushed forward (+x), so the layers move apart; the centre of the rarefaction is the zero-displacement point where s changes from negative to positive." }),
        P.manual({ label: "(f)", marks: 2, stem: "Describe the motion of the air layer at x = 0.2 m over the next period.", points: ["It oscillates back and forth along the x-direction about its equilibrium position (amplitude 6.0 µm)…", "…returning to its starting displacement after one period, 1/425 s; it does not travel with the wave."], modelAnswer: "The layer oscillates to and fro along the x-axis about its equilibrium position with amplitude 6.0 µm, completing one oscillation in 1/425 s, and has no net movement along the direction of travel." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why the displacement-distance graph of this wave looks like a transverse wave even though the wave is longitudinal.", points: ["The graph plots the size of the (longitudinal) displacement on the y-axis against position…", "…so a sinusoidal variation of displacement gives a sine curve; the y-axis shows displacement along x, not sideways movement."], modelAnswer: "The y-axis shows how far each layer is displaced along the x-direction, not sideways. Because the displacement varies sinusoidally with position, the graph is a sine curve, like that of a transverse wave." }),
      ],
      explanation: "Compressions are at zero-displacement points where neighbours converge; rarefactions where they diverge; v = fλ.",
      hints: ["Compare the displacement of the layers on each side of a zero point.", "The pattern repeats every wavelength."],
    });
  }

  // Practice structured: sound passing from air into water (6 marks)
  {
    const f = 1.7e3, va = 340, vw = 1.48e3;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $1.7\ \text{kHz}$ sound from a speaker boat travels through air ($340\ \text{m s}^{-1}$) and then into the water of Lake Kariba ($1.48 \times 10^{3}\ \text{m s}^{-1}$).`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the distance between adjacent compressions in the air, in m, to three significant figures.", value: va / f, unit: "m", wrong: [va / f / 2], explanation: t`$\lambda = 340/1700 = ${sfStr(va / f, 3)}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the distance between adjacent compressions in the water, in m, to three significant figures.", value: vw / f, unit: "m", wrong: [vw / f / 2, va / f], explanation: t`The frequency is unchanged: $\lambda = 1480/1700 = ${sfStr(vw / f, 3)}\ \text{m}$.` }),
        P.short({ label: "(c)", marks: 1, stem: "Name the wave quantity that is the same in the air and in the water.", accepted: ["frequency", "the frequency", "period", "the period"], wrong: ["wavelength"], explanation: "The source fixes the **frequency** (and so the period); speed and wavelength change." }),
        P.manual({ label: "(d)", marks: 2, stem: "A student says the sound in the water could be detected with a polarising filter arranged like the one used for light. Explain why this is wrong.", points: ["Sound is longitudinal: the water oscillates along the direction of travel.", "There is no plane of oscillation perpendicular to the direction of travel to select, so sound cannot be polarised."], modelAnswer: "Sound is longitudinal, so the water oscillates along the direction of travel; there is no transverse plane of oscillation for a filter to select, so sound cannot be polarised." }),
      ],
      explanation: "Frequency is fixed by the source; λ = v/f changes with the medium; longitudinal waves cannot be polarised.",
      hints: ["Which quantity does the source fix?"],
    });
  }

  b.card("DEFINITION", "**Transverse wave**", "Oscillations perpendicular to the direction of energy transfer.");
  b.card("DEFINITION", "**Longitudinal wave**", "Oscillations parallel to the direction of energy transfer.");
  b.card("DEFINITION", "**Compression / rarefaction**", "Regions of a longitudinal wave where particles are closer together (higher pressure) / further apart (lower pressure) than normal.");
  b.card("FACT", "Compression to adjacent rarefaction", "Half a wavelength.");
  b.card("CONCEPT", "Compressions on a displacement-distance graph", "At zero displacement, where neighbouring particles move towards each other (+ on the left, − on the right).");
  b.card("CONCEPT", "Evidence that light is transverse", "Light can be plane polarised; longitudinal waves cannot.");
  b.card("FACT", "Examples", "Transverse: strings, all EM waves, S-waves. Longitudinal: sound, ultrasound, P-waves.");
  b.card("DEFINITION", "**Plane polarised**", "Oscillations confined to one plane containing the direction of travel.");
});
