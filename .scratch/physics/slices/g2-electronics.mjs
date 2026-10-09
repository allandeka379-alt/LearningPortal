import { concept, P, t } from "../lib.mjs";

const Z = ["zimsec"];

// =====================================================================================================================
concept("phys.electronics.thermionic-emission", {
  file: "electronics/thermionic-emission",
  keyPrefix: "electronics.thermionic",
  objectives: { zimsec: ["14.1.1", "14.1.2", "14.1.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is thermionic emission?",
    options: [["The release of electrons from a heated metal surface", "Correct."], ["The release of light from a very hot metal", "That is incandescence."], ["The release of heat by electrons moving in a wire", "That is heating by a current, not emission."], ["The release of positive ions from a heated gas", "Thermionic emission releases electrons, not ions."]],
    answer: "A", explanation: "When a metal is heated strongly, some free electrons gain enough energy to escape from its surface." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Why must a cathode-ray tube contain a vacuum?",
    options: [["So electrons do not hit gas molecules and scatter or slow down", "Correct."], ["To keep the filament cool so it lasts much longer", "The filament must be hot."], ["To make the fluorescent screen glow more brightly", "The screen glows where electrons hit it."], ["To give the electrons their negative charge as they leave", "Electrons are always negative."]],
    answer: "A", explanation: "Gas molecules would stop and scatter the electrons, so the tube is evacuated." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What is the job of the anode in an electron gun?",
    options: [["To attract and speed up electrons, which pass through as a beam", "Correct."], ["To emit the electrons that go on to form the beam", "The hot cathode emits them."], ["To heat the cathode filament up to a high temperature", "A separate low-voltage supply does that."], ["To deflect the beam sideways and up and down on the screen", "Deflecting plates or coils do that."]],
    answer: "A", explanation: "The anode is held at a high positive p.d.; it accelerates the electrons, and its central hole lets a narrow beam through." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "An electron beam passing between two charged parallel plates bends towards the positive plate.",
    answer: true, explanation: "Electrons are negative, so they are attracted towards the positive plate." });

  q.mcq({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "An electron beam travels to the right between two horizontal plates. The lower plate is positive and the upper plate is negative. How is the beam deflected?",
    options: [["Downwards, towards the positive plate", "Correct."], ["Upwards, towards the negative plate", "Electrons are repelled by the negative plate."], ["Into the page", "The electric force is towards a plate."], ["It is not deflected.", "There is a force on the charged electrons."]],
    answer: "A", explanation: "The negative electrons are attracted to the lower, positive plate, so the beam curves downwards.",
    hints: ["Opposite charges attract."] });

  q.mcq({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "An electron beam travels to the right through a magnetic field directed out of the page. Which way is the beam deflected?",
    options: [["Upwards", "Correct."], ["Downwards", "Remember the current is opposite to the electrons' motion."], ["Into the page", "The force is at right angles to the field."], ["Out of the page", "The force is at right angles to the field."]],
    answer: "A", explanation: "The conventional current is to the left. Left hand: first finger out of the page, second finger to the left: the thumb points upwards.",
    hints: ["Use Fleming's left-hand rule with the current opposite to the electrons' motion."] });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What makes the spot on the screen of a cathode-ray oscilloscope visible?",
    options: [["The screen's fluorescent coating glows where electrons hit it.", "Correct."], ["The electrons themselves are hot and glow as they fly.", "Electrons are not seen; the coating glows."], ["The vacuum inside the tube glows faintly.", "A vacuum cannot glow."], ["The deflecting plates give out light as they charge up and steer the beam.", "The plates steer the beam; they do not glow."]],
    answer: "A", explanation: "A fluorescent material on the inside of the screen gives out light where the beam hits it." });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "On a CRO with the Y-gain set at 5 V/div, the peaks of an a.c. trace are 2.4 divisions above the centre line. What is the peak p.d.?",
    value: 12, unit: "V", wrong: [2.08, 24],
    explanation: t`Peak p.d. $= 2.4 \times 5 = 12\ \text{V}$.`,
    hints: ["Multiply the number of divisions by the Y-gain."] });

  q.num({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A CRO's time-base is set at 2 ms/div. One complete wave of a signal occupies 5.0 divisions. Calculate the frequency of the signal.",
    value: 100, unit: "Hz", wrong: [0.1, 10],
    explanation: t`Period $= 5.0 \times 2 = 10\ \text{ms} = 0.010\ \text{s}$; $f = \dfrac{1}{0.010} = 100\ \text{Hz}$.`,
    hints: ["Find the period first, in seconds.", t`$f = \dfrac{1}{T}$`] });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "In a cathode-ray oscilloscope, what does the time-base do?",
    options: [["It sweeps the spot steadily across the screen from left to right.", "Correct."], ["It moves the spot up and down in step with the p.d. at the Y-input terminals", "That is the Y-input and Y-plates."], ["It heats the cathode.", "No."], ["It focuses the beam.", "No."]],
    answer: "A", explanation: "The time-base drives the X-plates, moving the spot across the screen at a steady rate so that signals are drawn against time." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A steady d.c. p.d. is connected to the Y-input of a CRO with the time-base switched on. What is seen on the screen?",
    options: [["A horizontal line moved up or down from the centre", "Correct."], ["A wave moving across the screen", "A wave needs a changing p.d."], ["A vertical line through the centre", "That is an a.c. input with the time-base off."], ["Nothing at all, as a steady d.c. input cannot be shown", "The spot is still visible."]],
    answer: "A", explanation: "The steady p.d. shifts the spot a fixed distance up (or down) while the time-base sweeps it across, drawing a horizontal line.",
    hints: ["The p.d. does not change, but the spot still moves across the screen."] });

  q.match({ d: 2, skill: "RECALL", applies: Z,
    stem: "Match each part of a cathode-ray tube with its job.",
    pairs: [["Heated cathode", "Emits electrons"], ["Anode", "Accelerates the electrons into a beam"], ["Y-plates", "Deflect the beam up and down"], ["Fluorescent screen", "Glows where the electrons strike"]],
    explanation: "Cathode: emits. Anode: accelerates. Y-plates: vertical deflection. Screen: glows." });

  q.struct({ d: 3, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: "A signal from a microphone is displayed on a CRO with the Y-gain at 0.5 V/div and the time-base at 1 ms/div. The peaks are 3.0 divisions above the centre line, and 4 complete waves fill 10 divisions.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the peak p.d. of the signal.", value: 1.5, answer: "1.5", unit: "V", wrong: [6],
        explanation: t`$3.0 \times 0.5 = 1.5\ \text{V}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the period of the signal in milliseconds.", value: 2.5, answer: "2.5", unit: "ms", wrong: [10, 0.4],
        explanation: t`One wave spans $\dfrac{10}{4} = 2.5$ divisions, so $T = 2.5 \times 1 = 2.5\ \text{ms}$.` }),
      P.num({ label: "(c)", stem: "Calculate the frequency of the sound.", value: 400, unit: "Hz", wrong: [0.4, 2.5],
        explanation: t`$f = \dfrac{1}{0.0025} = 400\ \text{Hz}$.` }),
      P.mcq({ label: "(d)", stem: "The sound becomes louder but keeps the same pitch. How does the trace change?", options: [["The waves are taller, with the same spacing.", "Correct."], ["There are more waves across the width of the screen.", "That would be a higher pitch."], ["There are fewer waves on the screen.", "That would be a lower pitch."], ["The trace becomes a flat line.", "No."]], answer: "A",
        explanation: "Loudness depends on amplitude (height); pitch depends on frequency (spacing)." }),
    ],
    explanation: "Divisions × Y-gain gives p.d.; divisions × time-base gives time; f = 1/T.",
    hints: ["Convert milliseconds to seconds before finding the frequency."] });

  q.card("DEFINITION", "What is **thermionic emission**?", "The release of electrons from a heated metal surface.", undefined, { applies: Z });
  q.card("CONCEPT", "Parts of an electron gun?", "Heated cathode emits electrons; positive anode accelerates them; a hole in the anode forms a beam; all in a vacuum.", undefined, { applies: Z });
  q.card("FACT", "Why is a cathode-ray tube evacuated?", "So electrons do not collide with gas molecules.", undefined, { applies: Z });
  q.card("FACT", "Electron beam between charged plates?", "It bends towards the positive plate.", undefined, { applies: Z });
  q.card("CONCEPT", "Electron beam in a magnetic field?", "Deflected at right angles: left-hand rule with the current opposite to the electrons' motion.", undefined, { applies: Z });
  q.card("CONCEPT", "CRO settings?", "Y-gain (V/div) × divisions = p.d. Time-base (s/div) × divisions = time.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.electronics.diodes", {
  file: "electronics/diodes",
  keyPrefix: "electronics.diodes",
  objectives: { cambridge: ["4.3.1.2"], zimsec: ["14.2.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "In which direction can conventional current flow through a diode, compared with its circuit symbol?",
    options: [["In the direction the triangle points", "Correct."], ["Against the direction the triangle points", "That is the blocking direction."], ["Either way equally", "A diode conducts one way only."], ["Neither way", "It conducts when forward biased."]],
    answer: "A", explanation: "The triangle in the diode symbol points the way conventional current can flow." });

  q.mcq({ d: 2, skill: "RECALL",
    stem: "Roughly what p.d. must be across a forward-biased silicon diode before it conducts well?",
    options: [["About 0.6 to 0.7 V", "Correct."], ["About 6 to 7 V", "Far too high."], ["0 V: it conducts at any p.d.", "It needs a small forward p.d."], ["About 230 V", "No."]],
    answer: "A", explanation: "A silicon diode conducts once the forward p.d. is about 0.6–0.7 V." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "A reverse-biased diode has a very high resistance.",
    answer: true, explanation: "In reverse bias almost no current flows: the diode's resistance is very high." });

  q.mcq({ d: 2, skill: "APPLICATION",
    stem: "A diode, a lamp and a battery are connected in series and the lamp lights. The diode is then turned round. What happens?",
    options: [["The lamp goes out.", "Correct: the diode is now reverse biased."], ["The lamp gets brighter.", "No."], ["The lamp stays the same.", "The diode now blocks the current."], ["The lamp flickers on and off.", "Not with d.c."]],
    answer: "A", explanation: "Reversing the diode makes it reverse biased, so it blocks the current and the lamp goes out." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why might a diode be connected in series with the battery connection of a radio?",
    options: [["To block current if the batteries are put in the wrong way round", "Correct."], ["To increase the voltage that the batteries supply to the radio", "A diode does not increase voltage."], ["To smooth out the changes in the current from the batteries", "That is a capacitor's job."], ["To store charge for when the batteries begin to run low", "A diode does not store charge."]],
    answer: "A", explanation: "A series diode only conducts when the batteries are the right way round, so reversed batteries cannot damage the circuit." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What is an advantage of LEDs over filament lamps as indicator lights?",
    options: [["They use much less power and last much longer.", "Correct."], ["They work with current in either direction.", "LEDs conduct one way only."], ["They need a much higher voltage.", "No."], ["They give out more heat.", "They waste less energy as heat."]],
    answer: "A", explanation: "LEDs are efficient, long-lasting and switch on instantly." });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "An LED needs 1.8 V across it and a current of 15 mA. It is run from a 6.0 V supply. Calculate the resistance of the resistor needed in series.",
    value: 280, unit: "Ω", wrong: [400, 0.28],
    explanation: t`The resistor takes $6.0 - 1.8 = 4.2\ \text{V}$, so $R = \dfrac{4.2}{0.015} = 280\ \Omega$.`,
    hints: ["The resistor takes the rest of the supply p.d.", "Convert mA to A before using R = V/I."] });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: "An LED in series with a 470 Ω resistor is connected to a 12 V supply. The p.d. across the LED is 2.0 V. Calculate the current in milliamperes.",
    value: 10 / 470 * 1000, unit: "mA", wrong: [25.5, 0.0213],
    explanation: t`P.d. across the resistor $= 12 - 2.0 = 10\ \text{V}$; $I = \dfrac{10}{470} = 0.0213\ \text{A} = 21\ \text{mA}$.`,
    hints: ["Find the p.d. across the resistor first.", "The same current flows through the LED and the resistor."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING",
    stem: "Which description fits the current–voltage graph of a diode?",
    options: [["No current in reverse; current rises steeply above about 0.7 V forward", "Correct."], ["A straight line through the origin in both directions", "That is a fixed resistor."], ["A curve through the origin that flattens at higher p.d.s in both directions", "That is a filament lamp."], ["Equal currents for equal forward and reverse p.d.s", "A diode conducts one way."]],
    answer: "A", explanation: "A diode blocks reverse current and conducts strongly once the forward p.d. passes about 0.6–0.7 V.",
    hints: ["What happens for negative p.d.s?"] });

  q.match({ d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with what happens.",
    pairs: [["Diode forward biased (above about 0.7 V)", "Conducts, with low resistance"], ["Diode reverse biased", "Almost no current: very high resistance"], ["LED forward biased", "Gives out light"]],
    explanation: "Forward bias conducts; reverse bias blocks; a forward-biased LED lights." });

  q.short({ d: 1, skill: "RECALL",
    stem: "What do the letters LED stand for?",
    accepted: ["light-emitting diode", "light emitting diode", "light-emitting diodes", "light emitting diodes"], wrong: ["light energy device"],
    explanation: "LED stands for light-emitting diode." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner wires a red LED and a resistor in series to a 5.0 V USB supply. The LED needs 2.0 V across it and a current of 25 mA.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the resistance needed.", value: 120, unit: "Ω", wrong: [200, 80],
        explanation: t`The resistor takes $5.0 - 2.0 = 3.0\ \text{V}$; $R = \dfrac{3.0}{0.025} = 120\ \Omega$.` }),
      P.mcq({ label: "(b)", stem: "How must the LED be connected?", options: [["With its anode (triangle side) towards the positive terminal", "Correct: forward biased."], ["With its cathode (bar side) towards the positive terminal", "That is reverse bias: it would not light."], ["Either way round, as LEDs conduct both ways", "It conducts in one direction only."], ["In parallel with the resistor, not in series", "It must be in series."]], answer: "A",
        explanation: "The LED must be forward biased to conduct and light." }),
      P.mcq({ label: "(c)", stem: "What would probably happen if the resistor were left out?", options: [["The current would be too large and could destroy the LED.", "Correct."], ["The LED would be dimmer, with less current.", "It would be brighter, then fail."], ["Nothing would change, as the LED itself sets the size of the current.", "The resistor limits the current."], ["The LED would flash on and off rapidly.", "Without the resistor the current is too large, not pulsing."]], answer: "A",
        explanation: "Without a resistor nothing limits the current through the LED." }),
    ],
    explanation: "The resistor takes the supply p.d. minus the LED's p.d.; the LED must be forward biased and current-limited.",
    hints: ["The p.d.s across the LED and the resistor add up to the supply p.d."] });

  q.card("DEFINITION", "What is a **diode**?", "A component that lets current flow in one direction only.");
  q.card("FACT", "Forward and reverse bias?", "Forward: conducts above about 0.6–0.7 V. Reverse: very high resistance, almost no current.");
  q.card("FACT", "Diode symbol direction?", "The triangle points in the direction conventional current can flow.");
  q.card("CONCEPT", "Shape of a diode's I–V graph?", "Flat (no current) in reverse and below about 0.7 V forward, then rising steeply.");
  q.card("FACT", "Why does an LED need a series resistor?", "To limit the current so that the LED is not damaged.");
  q.card("FACT", "Uses of diodes?", "Rectification, protection against reversed batteries, LEDs as indicators and lights.");
});

// =====================================================================================================================
concept("phys.electronics.rectification", {
  file: "electronics/rectification",
  keyPrefix: "electronics.rectification",
  objectives: { zimsec: ["14.3.1", "14.3.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is rectification?",
    options: [["Converting alternating current into direct current", "Correct."], ["Converting direct current into alternating current", "That is the opposite."], ["Stepping up a voltage", "That is a transformer."], ["Making a d.c. supply steadier", "That is smoothing."]],
    answer: "A", explanation: "Rectification is the conversion of a.c. into d.c." });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "Which component is used to rectify a.c.?",
    options: [["A diode", "Correct."], ["A capacitor", "Used for smoothing."], ["A transformer", "Changes the voltage."], ["A resistor", "No."]],
    answer: "A", explanation: "Diodes let current through in one direction only, so they rectify a.c." });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "How many diodes are used in a bridge rectifier?",
    options: [["Four", "Correct."], ["One", "One diode gives half-wave rectification."], ["Two", "No."], ["Three", "No."]],
    answer: "A", explanation: "A bridge rectifier uses four diodes arranged in a diamond." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z, daily: true,
    stem: "What does the output of a half-wave rectifier look like on a voltage–time graph?",
    options: [["Humps in one direction with gaps between them", "Correct."], ["Continuous humps in one direction with no gaps", "That is full-wave."], ["A steady horizontal line above the axis", "That needs smoothing."], ["A wave above and below the time axis", "That is unrectified a.c."]],
    answer: "A", explanation: "Only the positive half-cycles pass, so the output is humps separated by flat gaps." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What does the unsmoothed output of a full-wave bridge rectifier look like?",
    options: [["Continuous humps in one direction with no gaps", "Correct."], ["Humps in one direction with gaps between them", "That is half-wave."], ["A wave going above and below the axis", "That is a.c."], ["A steady line, like a battery's output", "It still rises and falls."]],
    answer: "A", explanation: "Both half-cycles pass through the load in the same direction, giving continuous humps." });

  q.num({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "The 50 Hz mains (reduced by a transformer) is full-wave rectified. How many humps does the output have each second?",
    value: 100, wrong: [50, 25],
    explanation: "Each cycle gives two humps in full-wave rectification: 2 × 50 = 100 humps per second.",
    hints: ["How many half-cycles are there in one second?"] });

  q.num({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A 50 Hz supply is half-wave rectified. How many humps does the output have each second?",
    value: 50, wrong: [100, 25],
    explanation: "Half-wave rectification passes one half-cycle in every cycle: 50 humps per second.",
    hints: ["Only one half of each cycle passes."] });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "What is the purpose of a large capacitor connected across the output of a rectifier?",
    options: [["To smooth the output", "Correct."], ["To increase the frequency", "No."], ["To rectify the a.c.", "The diodes do that."], ["To step down the voltage", "A transformer does that."]],
    answer: "A", explanation: "The capacitor smooths the humps into a nearly steady d.c." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "Why does a capacitor across the load reduce the ripple in a rectified output?",
    options: [["It charges at each peak and discharges slowly between peaks.", "Correct."], ["It blocks all the d.c. from reaching the load.", "It is in parallel with the load."], ["It turns the humps back into a smooth, unbroken a.c. wave for the load.", "It smooths the d.c.; it does not make a.c."], ["It increases the peak voltage of each hump.", "It does not raise the peaks; it fills the gaps."]],
    answer: "A", explanation: "Between peaks the capacitor supplies the load, keeping the voltage up until the next hump recharges it.",
    hints: ["What does a capacitor store?"] });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A half-wave rectifier uses both halves of each a.c. cycle.",
    answer: false, explanation: "It uses only one half of each cycle; the other half is blocked." });

  q.mcq({ d: 3, skill: "EVALUATION", applies: Z,
    stem: "Why is full-wave rectification usually preferred to half-wave rectification?",
    options: [["It uses both halves of each cycle: more power and easier smoothing.", "Correct."], ["Its output is alternating, which most devices need to work.", "Its output is d.c."], ["It needs fewer diodes than a half-wave rectifier circuit does.", "It needs four."], ["It never needs any smoothing capacitor after the bridge.", "It still has humps."]],
    answer: "A", explanation: "Full-wave rectification wastes no half-cycles, and its closer humps are easier to smooth.",
    hints: ["Compare the gaps in the two outputs."] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each circuit with its output.",
    pairs: [["Half-wave rectifier", "One diode: separate humps with gaps"], ["Full-wave bridge rectifier", "Four diodes: continuous humps"], ["Full-wave rectifier with a capacitor", "Nearly steady d.c. with a small ripple"]],
    explanation: "Half-wave: gaps. Full-wave: continuous humps. Smoothed: nearly steady." });

  q.struct({ d: 3, skill: "UNDERSTANDING", applies: Z, examStyle: true,
    stem: "A radio's power supply uses a step-down transformer, a bridge rectifier and a large capacitor.",
    parts: [
      P.mcq({ label: "(a)", stem: "What does the bridge rectifier do?", options: [["It converts the transformer's a.c. into d.c.", "Correct."], ["It steps the mains voltage down.", "The transformer does that."], ["It smooths the output into steady d.c.", "The capacitor does that."], ["It protects the radio against reversed batteries.", "Not its job here."]], answer: "A",
        explanation: "The four diodes rectify the a.c." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the bridge sends current through the radio in the same direction in both half-cycles.",
        points: ["In one half-cycle one pair of opposite diodes conducts, sending current through the load one way", "In the next half-cycle the other pair conducts, and the current through the load is again in the same direction"] }),
      P.mcq({ label: "(c)", stem: "What is the effect of the capacitor?", options: [["It smooths the output into nearly steady d.c.", "Correct."], ["It doubles the frequency of the ripple.", "The bridge already gives two humps per cycle; the capacitor smooths them."], ["It rectifies the a.c. a second time.", "The bridge rectifies; the capacitor smooths."], ["It changes the d.c. back into a smooth a.c.", "A capacitor across the output smooths the d.c."]], answer: "A",
        explanation: "The capacitor fills in the dips between the humps." }),
    ],
    explanation: "Transformer: lower voltage. Bridge: a.c. to d.c. Capacitor: smoothing.",
    hints: ["Each component in a power supply has one job."] });

  q.card("DEFINITION", "What is **rectification**?", "Converting a.c. into d.c., using diodes.", undefined, { applies: Z });
  q.card("FACT", "Half-wave rectification?", "One diode; only one half of each cycle passes; humps with gaps.", undefined, { applies: Z });
  q.card("FACT", "Full-wave (bridge) rectification?", "Four diodes; both halves pass in the same direction; continuous humps (100 per second from 50 Hz).", undefined, { applies: Z });
  q.card("CONCEPT", "How does a smoothing capacitor work?", "It charges at each peak and discharges slowly through the load between peaks.", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.electronics.components", {
  file: "electronics/components",
  keyPrefix: "electronics.components",
  objectives: { zimsec: ["14.4.1", "14.4.2", "14.4.5", "14.4.6"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "In the resistor colour code, which colour stands for the digit 0?",
    options: [["Black", "Correct."], ["Brown", "Brown is 1."], ["Red", "Red is 2."], ["White", "White is 9."]],
    answer: "A", explanation: "Black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9." });

  q.num({ d: 2, skill: "APPLICATION", applies: Z, daily: true,
    stem: "A resistor has the colour bands brown, black, red, gold. What is its resistance?",
    value: 1000, unit: "Ω", wrong: [102, 10],
    explanation: "Brown 1, black 0, red = two zeros: 1000 Ω (1 kΩ), ±5%." });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "A resistor has the colour bands red, red, orange, gold. What is its resistance in kΩ?",
    value: 22, unit: "kΩ", wrong: [223, 2.2],
    explanation: "Red 2, red 2, orange = three zeros: 22 000 Ω = 22 kΩ.",
    hints: ["The third band is the number of zeros."] });

  q.mcq({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "Which colour bands mark a 330 Ω resistor with a tolerance of ±5%?",
    options: [["Orange, orange, brown, gold", "Correct: 33 followed by one zero."], ["Orange, orange, orange, gold", "That is 33 000 Ω."], ["Orange, orange, red, gold", "That is 3300 Ω."], ["Red, red, brown, silver", "That is 220 Ω, ±10%."]],
    answer: "A", explanation: "330 = 3, 3 and one zero: orange, orange, brown; gold for ±5%.",
    hints: ["Write 330 as two digits followed by a number of zeros."] });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "A 220 Ω resistor has a tolerance of ±10%. What is the largest value its resistance could have?",
    value: 242, unit: "Ω", wrong: [230, 198],
    explanation: "10% of 220 Ω is 22 Ω, so the largest value is 220 + 22 = 242 Ω.",
    hints: ["Find 10% of 220 Ω."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What does the tolerance of a resistor tell you?",
    options: [["The % by which its real resistance may differ from its marked value", "Correct."], ["The largest power it can safely transfer as heat in use", "That is the power rating."], ["The largest current it can carry without any damage", "That depends on the power rating, not the tolerance."], ["The temperature at which its marked value was measured in the factory", "Tolerance is about accuracy of the value, not test conditions."]],
    answer: "A", explanation: "A ±5% tolerance means the true resistance is within 5% of the marked value." });

  q.num({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "A current of 0.050 A flows through a 220 Ω resistor. Calculate the power transferred in the resistor.",
    value: 0.55, answer: "0.55", unit: "W", wrong: [11, 0.0114],
    explanation: t`$V = IR = 0.050 \times 220 = 11\ \text{V}$; $P = IV = 0.050 \times 11 = 0.55\ \text{W}$.`,
    hints: ["Find the p.d. with V = IR, then use P = IV."] });

  q.mcq({ d: 3, skill: "EVALUATION", applies: Z,
    stem: "A 150 Ω resistor will carry a current of 0.060 A. Which is the smallest power rating that is safe to use?",
    options: [["1 W", "Correct: the resistor transfers 0.54 W."], ["0.5 W", "Too small: 0.54 W is more than 0.5 W."], ["0.25 W", "Too small."], ["0.125 W", "Too small."]],
    answer: "A", explanation: "V = IR = 0.060 × 150 = 9.0 V and P = IV = 0.060 × 9.0 = 0.54 W, so the rating must be above 0.54 W: 1 W.",
    hints: ["Calculate the power first; the rating must be larger."] });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What does a capacitor store?",
    options: [["Electric charge, and so energy", "Correct."], ["Electric current", "Current is a flow, not something stored."], ["Electrical resistance", "Resistance is a property, not something stored."], ["Magnetic energy between its plates", "A capacitor stores charge in an electric field; coils store magnetic energy."]],
    answer: "A", explanation: "A capacitor stores charge on its plates, and with it energy." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: Z,
    stem: "In a time-delay circuit, a capacitor charges through a resistor. How can the delay be made longer?",
    options: [["Use a larger resistor or a larger capacitor.", "Correct."], ["Use a smaller resistor in the circuit.", "That shortens the delay."], ["Remove the resistor from the circuit.", "Then it would charge almost instantly."], ["Use a smaller capacitor in the circuit.", "That shortens the delay."]],
    answer: "A", explanation: "A larger resistance slows the charging current, and a larger capacitance needs more charge, so both lengthen the delay.",
    hints: ["What slows down the flow of charge onto the plates?"] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "What happens to a reed switch when a magnet is brought near it?",
    options: [["The reeds become magnetised and touch, closing the circuit.", "Correct."], ["The reeds heat up and melt together at the tips.", "A magnet does not heat the reeds."], ["The glass tube is pulled sharply towards the magnet and breaks.", "Glass is not magnetic; the iron reeds respond."], ["Nothing: reed switches respond only to light.", "They respond to magnetic fields."]],
    answer: "A", explanation: "The magnet magnetises the reeds, which attract and make contact." });

  q.mcq({ d: 2, skill: "APPLICATION", applies: Z,
    stem: "Which of these is a typical use of a reed switch?",
    options: [["A door sensor in a burglar alarm", "Correct."], ["Smoothing a power supply", "That is a capacitor."], ["Storing energy for a camera flash", "That is a capacitor."], ["Measuring temperature", "That is a thermistor."]],
    answer: "A", explanation: "A magnet on the door keeps a reed switch on the frame closed; opening the door opens the switch and triggers the alarm." });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Match each transducer with what it does.",
    pairs: [["Microphone", "Changes sound into an electrical signal"], ["Loudspeaker", "Changes an electrical signal into sound"], ["Thermistor", "Changes its resistance with temperature"], ["LED", "Changes electrical energy into light"]],
    explanation: "Input transducers: microphone, thermistor. Output transducers: loudspeaker, LED." });

  q.struct({ d: 3, skill: "APPLICATION", applies: Z, examStyle: true,
    stem: "A learner finds a resistor with the bands green, blue, red, silver.",
    parts: [
      P.num({ label: "(a)", stem: "What is its marked resistance?", value: 5600, unit: "Ω", wrong: [562],
        explanation: "Green 5, blue 6, red = two zeros: 5600 Ω." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the smallest value its resistance could have.", value: 5040, unit: "Ω", wrong: [5320, 5600],
        explanation: "Silver = ±10%; 10% of 5600 is 560, so the smallest value is 5600 − 560 = 5040 Ω." }),
      P.mcq({ label: "(c)", stem: "The resistor is rated 0.25 W. Is it safe to connect it directly across a 9.0 V battery?", options: [["Yes: the power is only about 0.014 W.", "Correct."], ["No: the power is about 2.3 W, far above 0.25 W.", "Recalculate: I = 9.0/5600 A."], ["No: the power is about 0.5 W.", "No."], ["It cannot be worked out.", "It can, from V and R."]], answer: "A",
        explanation: "I = 9.0 ÷ 5600 = 0.0016 A; P = IV = 0.0016 × 9.0 ≈ 0.014 W, well below 0.25 W." }),
    ],
    explanation: "Digits, multiplier and tolerance give the range; P = IV checks the power rating.",
    hints: ["The fourth band gives the tolerance."] });

  q.card("FACT", "Resistor colour code digits?", "Black 0, brown 1, red 2, orange 3, yellow 4, green 5, blue 6, violet 7, grey 8, white 9.", undefined, { applies: Z });
  q.card("CONCEPT", "Reading a four-band resistor?", "Band 1 and 2: digits. Band 3: number of zeros. Band 4: tolerance.", undefined, { applies: Z });
  q.card("DEFINITION", "What is **tolerance**?", "The largest percentage difference between a resistor's true and marked values (gold ±5%, silver ±10%).", undefined, { applies: Z });
  q.card("CONCEPT", "Choosing a power rating?", "Calculate the power (P = IV) and choose a rating above it.", undefined, { applies: Z });
  q.card("DEFINITION", "What is a **capacitor**?", "Two plates separated by an insulator that store charge and energy; used for time delays and smoothing.", undefined, { applies: Z });
  q.card("CONCEPT", "Making a capacitor time delay longer?", "Use a larger resistance or a larger capacitance.", undefined, { applies: Z });
  q.card("DEFINITION", "What is a **reed switch**?", "Two magnetic reeds in a glass tube that close when a magnet is near; used in door alarms.", undefined, { applies: Z });
  q.card("DEFINITION", "What is a **transducer**?", "A device that converts energy between electrical and other forms (microphone, loudspeaker, LDR, LED).", undefined, { applies: Z });
});

// =====================================================================================================================
concept("phys.electronics.logic-gates", {
  file: "electronics/logic-gates",
  keyPrefix: "electronics.logic",
  objectives: { zimsec: ["logic-gates.1"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "What is the output of a NOT gate when its input is 1?",
    options: [["0", "Correct: NOT inverts the input."], ["1", "That would be no change."], ["Either 0 or 1", "The output is fixed by the input."], ["It has no output", "Every gate has an output."]],
    answer: "A", explanation: "A NOT gate gives the opposite of its input." });

  q.mcq({ d: 2, skill: "RECALL", applies: Z, daily: true,
    stem: "For which inputs does a two-input AND gate give an output of 1?",
    options: [["Only when both inputs are 1", "Correct."], ["When either input is 1", "That is OR."], ["When both inputs are 0", "That is NOR."], ["For any inputs", "No."]],
    answer: "A", explanation: "AND gives 1 only if input A and input B are both 1." });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "For which inputs does a two-input NOR gate give an output of 1?",
    options: [["Only when both inputs are 0", "Correct."], ["Only when both inputs are 1", "That is AND."], ["When either input is 1", "That is OR."], ["Never", "No."]],
    answer: "A", explanation: "NOR is NOT OR: the output is 1 only when neither input is 1." });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "Which gate gives an output of 0 only when both of its inputs are 1?",
    options: [["NAND", "Correct."], ["AND", "AND gives 1 when both inputs are 1."], ["NOR", "NOR gives 0 when either input is 1."], ["OR", "OR gives 1 when both inputs are 1."]],
    answer: "A", explanation: "NAND is NOT AND: 0 only for inputs 1 and 1." });

  q.fib({ d: 2, skill: "RECALL", applies: Z,
    stem: "Complete the truth table for a two-input OR gate.",
    template: "Inputs 0, 0 give {{blank:a}}. Inputs 0, 1 give {{blank:b}}. Inputs 1, 1 give {{blank:c}}.",
    blanks: [
      { id: "a", input: "select", choices: ["0", "1"], accepted: ["0"], wrong: "1" },
      { id: "b", input: "select", choices: ["0", "1"], accepted: ["1"], wrong: "0" },
      { id: "c", input: "select", choices: ["0", "1"], accepted: ["1"], wrong: "0" },
    ],
    explanation: "OR gives 1 when either or both inputs are 1, and 0 only for 0, 0." });

  q.mcq({ d: 1, skill: "RECALL", applies: Z,
    stem: "Which gate's symbol is a triangle with a small circle at its tip?",
    options: [["NOT", "Correct."], ["AND", "AND is a D shape."], ["OR", "OR is a curved shield shape."], ["NOR", "NOR is the OR shape with a circle."]],
    answer: "A", explanation: "The NOT gate (inverter) is a triangle with a small circle at the output." });

  q.mcq({ d: 2, skill: "RECALL", applies: Z,
    stem: "Which gate's symbol is a D shape with a small circle at the output?",
    options: [["NAND", "Correct."], ["AND", "AND has no circle."], ["NOR", "NOR is an OR shape with a circle."], ["NOT", "NOT is a triangle."]],
    answer: "A", explanation: "The small circle means NOT, so a D-shaped AND symbol with a circle is NAND." });

  q.match({ d: 2, skill: "RECALL", applies: Z,
    stem: "Match each gate with its rule.",
    pairs: [["AND", "Output 1 only if both inputs are 1"], ["OR", "Output 1 if either input is 1"], ["NAND", "Output 0 only if both inputs are 1"], ["NOR", "Output 1 only if both inputs are 0"]],
    explanation: "AND: both. OR: either. NAND: not both. NOR: neither." });

  q.mcq({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "Input A passes through a NOT gate. Its output and input B are fed into an OR gate. What is the final output when A = 1 and B = 0?",
    options: [["0", "Correct."], ["1", "NOT A is 0, and 0 OR 0 is 0."], ["It cannot be worked out.", "It can, gate by gate."], ["Both 0 and 1", "A gate gives one output."]],
    answer: "A", explanation: "NOT A = 0; then 0 OR 0 = 0.",
    hints: ["Work out the NOT gate's output first."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "The output of an AND gate is fed into a NOT gate. Which single gate does this combination behave like?",
    options: [["NAND", "Correct."], ["NOR", "That is OR followed by NOT."], ["OR", "No."], ["AND", "The NOT inverts it."]],
    answer: "A", explanation: "AND followed by NOT inverts every AND output: that is NAND.",
    hints: ["Invert each row of the AND truth table."] });

  q.mcq({ d: 2, skill: "APPLICATION", applies: Z,
    stem: "A security light must switch on only when it is dark and movement is detected. The light sensor gives 1 when dark; the movement sensor gives 1 when it detects movement. Which gate is needed?",
    options: [["AND", "Correct: both conditions must be true."], ["OR", "That would switch on in the dark with no movement."], ["NOR", "No."], ["NOT", "NOT has only one input."]],
    answer: "A", explanation: "Both inputs must be 1 for the light to switch on: an AND gate." });

  q.mcq({ d: 2, skill: "APPLICATION", applies: Z,
    stem: "A greenhouse fan should switch on if the temperature is too high or the humidity is too high. Each sensor gives 1 when its value is too high. Which gate is needed?",
    options: [["OR", "Correct."], ["AND", "That needs both at once."], ["NAND", "No."], ["NOT", "No."]],
    answer: "A", explanation: "Either condition (or both) should switch the fan on: an OR gate." });

  q.mcq({ d: 3, skill: "APPLICATION", applies: Z,
    stem: "A heater should switch on when a room is cold. The temperature sensor gives 1 when the room is warm. Which gate should connect the sensor to the heater circuit?",
    options: [["NOT", "Correct: it gives 1 when the sensor gives 0 (cold)."], ["AND", "There is only one input."], ["OR", "There is only one input."], ["NOR", "Not needed with one input."]],
    answer: "A", explanation: "The heater needs the opposite of the sensor signal, so a NOT gate is used.",
    hints: ["The output must be 1 when the sensor gives 0."] });

  q.struct({ d: 4, skill: "ANALYSIS", applies: Z, examStyle: true,
    stem: "Inputs A and B both go into a NAND gate, whose output is C. Then C and input A go into an AND gate, whose output is Q.",
    parts: [
      P.fib({ label: "(a)", stem: "Complete column C for the inputs (A, B) = (0, 0), (0, 1), (1, 0) and (1, 1).",
        template: "(0, 0): {{blank:c1}}; (0, 1): {{blank:c2}}; (1, 0): {{blank:c3}}; (1, 1): {{blank:c4}}",
        blanks: [
          { id: "c1", input: "select", choices: ["0", "1"], accepted: ["1"], wrong: "0" },
          { id: "c2", input: "select", choices: ["0", "1"], accepted: ["1"], wrong: "0" },
          { id: "c3", input: "select", choices: ["0", "1"], accepted: ["1"], wrong: "0" },
          { id: "c4", input: "select", choices: ["0", "1"], accepted: ["0"], wrong: "1" },
        ],
        explanation: "NAND gives 0 only when both inputs are 1." }),
      P.fib({ label: "(b)", stem: "Complete column Q for the same four rows.",
        template: "(0, 0): {{blank:q1}}; (0, 1): {{blank:q2}}; (1, 0): {{blank:q3}}; (1, 1): {{blank:q4}}",
        blanks: [
          { id: "q1", input: "select", choices: ["0", "1"], accepted: ["0"], wrong: "1" },
          { id: "q2", input: "select", choices: ["0", "1"], accepted: ["0"], wrong: "1" },
          { id: "q3", input: "select", choices: ["0", "1"], accepted: ["1"], wrong: "0" },
          { id: "q4", input: "select", choices: ["0", "1"], accepted: ["0"], wrong: "1" },
        ],
        explanation: "Q = C AND A: it is 1 only in the row where both C and A are 1, which is (1, 0)." }),
      P.mcq({ label: "(c)", stem: "For which input combination is Q = 1?", options: [["A = 1, B = 0", "Correct."], ["A = 0, B = 1", "There A = 0, so the AND gives 0."], ["A = 1, B = 1", "There C = 0."], ["A = 0, B = 0", "There A = 0."]], answer: "A",
        explanation: "Only A = 1 with B = 0 makes both C and A equal to 1." }),
    ],
    explanation: "Work gate by gate: C = A NAND B; Q = C AND A, which is 1 only for A = 1, B = 0.",
    hints: ["Fill in column C completely before working out Q."] });

  q.card("FACT", "NOT gate rule?", "Output is the opposite of the input (0→1, 1→0).", undefined, { applies: Z });
  q.card("FACT", "AND and OR rules?", "AND: 1 only if both inputs are 1. OR: 1 if either (or both) input is 1.", undefined, { applies: Z });
  q.card("FACT", "NAND and NOR rules?", "NAND: 0 only if both inputs are 1. NOR: 1 only if both inputs are 0.", undefined, { applies: Z });
  q.card("FACT", "Logic gate symbols?", "NOT: triangle with a circle. AND: D shape. OR: curved shield. NAND/NOR: AND/OR with a circle at the output.", undefined, { applies: Z });
  q.card("CONCEPT", "How to analyse a combination of gates?", "Add a truth-table column for each intermediate output and work one gate at a time.", undefined, { applies: Z });
  q.card("DEFINITION", "Logic levels?", "1 = high (e.g. about 5 V); 0 = low (about 0 V).", undefined, { applies: Z });
});
