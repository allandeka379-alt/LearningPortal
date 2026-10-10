// W4b: aphys.electronics.op-amp-amplifiers (ZIMSEC only) — negative feedback, virtual earth, inverting and
// non-inverting amplifiers, voltage follower, saturation and clipping, simple design.
import { concept, P, t, chk, sfStr, dpStr, table, linFit } from "../lib.mjs";

concept("aphys.electronics.op-amp-amplifiers", { file: "electronics/op-amp-amplifiers", keyPrefix: "electronics.op-amp-amplifiers" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the effect of negative feedback on the voltage gain and on the bandwidth of an op-amp amplifier?",
    options: [
      ["The gain decreases and the bandwidth increases.", "Correct: gain × bandwidth is roughly constant, so a smaller gain gives a wider bandwidth."],
      ["The gain increases and the bandwidth decreases.", "Negative feedback opposes the output change, so it reduces the gain."],
      ["The gain and the bandwidth both decrease.", "Lowering the gain extends the range of frequencies amplified equally."],
      ["The gain and the bandwidth both increase.", "Feeding back part of the output to the inverting input cannot increase the gain."],
    ],
    answer: "A",
    explanation: "Negative feedback trades gain for bandwidth and stability; the closed-loop gain depends only on resistors.",
  });
  {
    const Rin = 10, Rf = 220;
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`An inverting amplifier has an input resistor of $10\ \text{k}\Omega$ and a feedback resistor of $220\ \text{k}\Omega$. What is its voltage gain?`,
      options: [
        [String(-Rf / Rin).replace("-", "−"), "Correct: G = −R_f/R_in."],
        [String(Rf / Rin), "The inverting amplifier's output has the opposite sign to its input."],
        [String(-(1 + Rf / Rin)).replace("-", "−"), "1 + R_f/R₁ is the non-inverting formula, and it has no minus sign."],
        [String(1 + Rf / Rin), "This is the non-inverting amplifier formula."],
      ],
      answer: "A",
      explanation: t`$G = -\dfrac{R_f}{R_{\text{in}}} = -\dfrac{220}{10} = ${-Rf / Rin}$.`,
    });
  }
  {
    const R1 = 2.2, Rf = 33;
    const G = 1 + Rf / R1;
    chk(G, 16);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`A non-inverting amplifier has $R_f = 33\ \text{k}\Omega$ (output to inverting input) and $R_1 = 2.2\ \text{k}\Omega$ (inverting input to 0 V). What is its voltage gain?`,
      options: [
        ["16", "Correct: G = 1 + 33/2.2 = 16."],
        ["15", "This is R_f/R₁ only: the gain of a non-inverting amplifier is 1 + R_f/R₁."],
        ["−15", "This is the inverting amplifier formula; the non-inverting output is in phase."],
        ["0.067", "This is R₁/R_f, the divider ratio upside down."],
      ],
      answer: "A",
      explanation: t`$G = 1 + \dfrac{R_f}{R_1} = 1 + \dfrac{33}{2.2} = ${G}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the inverting input of an inverting amplifier called a virtual earth?",
    options: [
      ["It is held at almost 0 V by feedback, although it is not connected to 0 V.", "Correct: with a very large gain, V⁻ ≈ V⁺ = 0."],
      ["It is connected directly to the 0 V line of the supply.", "If it were, no current could pass from R_in to R_f and the circuit would not amplify."],
      ["All the input current flows into it and on to the 0 V line.", "No current enters the op-amp input; it all flows on through R_f."],
      ["Its voltage is always equal to the output voltage.", "That describes the voltage follower; in the inverting amplifier the output is −(R_f/R_in)V_in."],
    ],
    answer: "A",
    explanation: "V⁺ = 0 and the op-amp is not saturated, so V⁺ − V⁻ = V_out/A₀ ≈ 0: V⁻ ≈ 0 although it is not wired to 0 V.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A sensor with a high internal resistance must drive a moving-coil meter. Why is a voltage follower placed between them?",
    options: [
      ["It draws almost no current from the sensor but can supply the current the meter needs.", "Correct: very high input resistance, very low output resistance, gain 1."],
      ["It increases the voltage so that the meter gives a larger deflection.", "A voltage follower has a gain of exactly 1."],
      ["It inverts the sensor voltage so that the meter reads forwards.", "The follower is non-inverting: the output follows the input."],
      ["It reduces the sensor voltage so that the meter is not overloaded.", "The output equals the input; it is not reduced."],
    ],
    answer: "A",
    explanation: "A buffer isolates the source: the sensor's voltage is not pulled down by the meter's current.",
    hints: ["Think about input and output resistance, not gain."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`An inverting amplifier of gain $-15$ uses an op-amp that saturates at $\pm 12\ \text{V}$. A sinusoidal input of peak $1.0\ \text{V}$ is applied. Which describes the output?`,
    options: [
      [t`An inverted wave with its peaks clipped flat at $\pm 12\ \text{V}$`, "Correct: −15 × 1.0 = −15 V would exceed the supply, so the peaks are clipped."],
      [t`An inverted sine wave of peak $15\ \text{V}$`, "The output cannot go beyond the saturation voltage."],
      [t`A sine wave in phase with the input, of peak $12\ \text{V}$`, "An inverting amplifier gives an output in antiphase, and the wave is clipped, not a pure sine."],
      [t`A square wave switching between $+12\ \text{V}$ and $-12\ \text{V}$`, "Only the parts of the cycle where |V_in| > 0.8 V are clipped; the rest is amplified linearly."],
    ],
    answer: "A",
    explanation: "Linear up to |V_in| = 12/15 = 0.8 V; beyond that the output stays at ±12 V, giving flat-topped inverted peaks.",
    hints: ["Find the largest input that is amplified linearly."],
  });
  {
    const GBW = 1.0e6, G = 50;
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An op-amp has a gain-bandwidth product of $1.0\ \text{MHz}$. It is used in an amplifier with a closed-loop gain of 50. What is the approximate bandwidth?`,
      options: [
        [t`$20\ \text{kHz}$`, "Correct: bandwidth ≈ 1.0 × 10⁶ / 50."],
        [t`$50\ \text{MHz}$`, "This multiplies by the gain; a higher gain gives a narrower bandwidth."],
        [t`$1.0\ \text{MHz}$`, "1 MHz is the bandwidth only at a gain of 1."],
        [t`$50\ \text{Hz}$`, "This confuses the gain with a frequency."],
      ],
      answer: "A",
      explanation: t`Bandwidth $\approx \dfrac{\text{gain-bandwidth product}}{\text{gain}} = \dfrac{1.0 \times 10^{6}}{50} = ${GBW / G / 1000}\ \text{kHz}$.`,
      hints: ["Gain × bandwidth is roughly constant."],
    });
  }
  {
    const Rin = 3.3, Rf = 39, Vin = 0.2;
    const Vout = (-Rf / Rin) * Vin;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`An inverting amplifier has $R_{\text{in}} = 3.3\ \text{k}\Omega$ and $R_f = 39\ \text{k}\Omega$. Calculate the output voltage, in V, for an input of $+0.20\ \text{V}$, to three significant figures.`,
      value: Vout, unit: "V", wrong: [-Vout, -(1 + Rf / Rin) * Vin],
      explanation: t`$V_{\text{out}} = -\dfrac{R_f}{R_{\text{in}}}V_{\text{in}} = -\dfrac{39}{3.3} \times 0.20 = ${sfStr(Vout, 3).replace("-", "−")}\ \text{V}$. The answer is negative: the output is inverted.`,
    });
  }
  {
    const Rf = 56, R1 = 4.7, Vin = 0.3;
    const Vout = (1 + Rf / R1) * Vin;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A non-inverting amplifier has $R_f = 56\ \text{k}\Omega$ and $R_1 = 4.7\ \text{k}\Omega$ and runs from a $\pm 15\ \text{V}$ supply. Calculate the output voltage, in V, for an input of $0.30\ \text{V}$, to three significant figures.`,
      value: Vout, unit: "V", wrong: [(Rf / R1) * Vin],
      explanation: t`$G = 1 + \dfrac{56}{4.7} = ${sfStr(1 + Rf / R1, 3)}$; $V_{\text{out}} = ${sfStr(1 + Rf / R1, 3)} \times 0.30 = ${sfStr(Vout, 3)}\ \text{V}$ (well inside $\pm 15\ \text{V}$). Leaving out the 1 gives $${sfStr((Rf / R1) * Vin, 3)}\ \text{V}$.`,
      hints: ["The non-inverting gain is 1 + R_f/R₁."],
    });
  }
  {
    const G = 25, Rin = 2.2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An inverting amplifier must have a gain of $-25$. The input resistor is $2.2\ \text{k}\Omega$. Calculate the feedback resistance needed, in kΩ.`,
      value: G * Rin, unit: "kΩ", wrong: [Rin / G, (G - 1) * Rin],
      explanation: t`1. $|G| = \dfrac{R_f}{R_{\text{in}}}$, so $R_f = 25 \times 2.2 = ${G * Rin}\ \text{k}\Omega$.
2. $(G - 1)R$ would be the non-inverting design; dividing by 25 inverts the ratio.`,
      hints: ["R_f = |G| × R_in."],
    });
  }
  {
    const G = 12, Vsat = 9;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`An inverting amplifier with $R_{\text{in}} = 5.6\ \text{k}\Omega$ and $R_f = 67.2\ \text{k}\Omega$ uses an op-amp that saturates at $\pm 9.0\ \text{V}$. Calculate the largest peak value of a sinusoidal input, in V, that is amplified without clipping, to two significant figures.`,
      value: Vsat / G, sf: 2, unit: "V", wrong: [(2 * Vsat) / G, Vsat * G],
      explanation: t`1. $|G| = \dfrac{67.2}{5.6} = ${G}$.
2. The output reaches $9.0\ \text{V}$ when $|V_{\text{in}}| = \dfrac{9.0}{12} = ${sfStr(Vsat / G, 2)}\ \text{V}$; any larger peak is clipped. Using the 18 V peak-to-peak range of the output gives twice this.`,
      hints: ["Find the gain, then divide the saturation voltage by it."],
    });
  }
  {
    const Vin = 0.5, Rin = 10e3;
    const I = Vin / Rin;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In an inverting amplifier, $R_{\text{in}} = 10\ \text{k}\Omega$, $R_f = 82\ \text{k}\Omega$ and $V_{\text{in}} = 0.50\ \text{V}$. Calculate the current in the feedback resistor, in µA.`,
      value: I * 1e6, unit: "µA", wrong: [(Vin / 82e3) * 1e6],
      explanation: t`1. The inverting input is a virtual earth at 0 V, so the p.d. across $R_{\text{in}}$ is $0.50\ \text{V}$: $I = \dfrac{0.50}{10 \times 10^{3}} = ${I * 1e6}\ \mu\text{A}$.
2. No current enters the op-amp, so the same $${I * 1e6}\ \mu\text{A}$ flows through $R_f$ (giving $V_{\text{out}} = -IR_f = -4.1\ \text{V}$).`,
      hints: ["The inverting input is at 0 V and draws no current."],
    });
    chk(-I * 82e3, -4.1, 1e-9);
  }
  b.num({
    d: 4, skill: "EVALUATION", calculator: false,
    stem: "The two resistors of an inverting amplifier each have a tolerance of ±5%. Calculate the largest percentage uncertainty in the magnitude of the gain, in %.",
    value: 10, unit: "%", wrong: [5, 25],
    explanation: "Gain = R_f/R_in is a quotient, so the percentage uncertainties add: 5% + 5% = 10%. For better accuracy use 1% resistors or measure the resistors with an ohmmeter.",
    hints: ["For a quotient, add percentage uncertainties."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The output of a non-inverting amplifier is in phase with its input.",
    answer: true,
    explanation: "True. The input goes to the non-inverting input, so a rise in V_in gives a rise in V_out.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "The closed-loop gain of an inverting amplifier changes noticeably if the op-amp is replaced by one with twice the open-loop gain.",
    answer: false,
    explanation: "False. With A₀ very large, the gain is −R_f/R_in, set by the resistors alone; this is a main advantage of negative feedback.",
    hints: ["Does A₀ appear in the formula for the closed-loop gain?"],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each circuit with its voltage gain.",
    pairs: [
      ["Inverting amplifier", t`$-R_f/R_{\text{in}}$`],
      ["Non-inverting amplifier", t`$1 + R_f/R_1$`],
      ["Voltage follower", "1"],
      ["Op-amp with no feedback (linear region)", t`$A_0$`],
    ],
    explanation: "Feedback sets the gain by resistors; without feedback the gain is the open-loop gain A₀.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the steps in the derivation of the gain of an inverting amplifier.",
    template: "Because the open-loop gain is very large, the inverting input is at almost {{blank:a}}, a virtual earth. Because the input resistance is very large, the current in the input resistor is {{blank:b}} the current in the feedback resistor. So V_in/R_in = −V_out/R_f.",
    blanks: [
      { id: "a", accepted: ["0 V"], choices: ["0 V", "the supply voltage", "the output voltage"] },
      { id: "b", accepted: ["equal to"], choices: ["equal to", "larger than", "smaller than"] },
    ],
    explanation: "V⁻ ≈ V⁺ = 0 and no current enters the op-amp, so I_in = I_f.",
    hints: ["Use the two ideal-op-amp assumptions."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the circuit of an inverting amplifier in words and derive the expression G = −R_f/R_in for its voltage gain.",
    points: [
      "Circuit: input through R_in to the inverting input; R_f from the output to the inverting input; non-inverting input to 0 V.",
      "Very large A₀ and output not saturated, so V⁺ − V⁻ ≈ 0; V⁺ = 0, so V⁻ ≈ 0 (virtual earth).",
      "Very large input resistance: no current into the op-amp, so the current in R_in equals the current in R_f.",
      "I = (V_in − 0)/R_in and I = (0 − V_out)/R_f.",
      "Equating: V_in/R_in = −V_out/R_f, so G = V_out/V_in = −R_f/R_in.",
    ],
    modelAnswer: "The input voltage is applied through R_in to the inverting input, R_f connects the output back to the inverting input, and the non-inverting input is at 0 V. Since A₀ is very large and the output is not saturated, V⁺ − V⁻ = V_out/A₀ ≈ 0, so the inverting input is at about 0 V, a virtual earth. The op-amp's input resistance is very large, so no current enters it and the current I in R_in also flows through R_f. Then I = V_in/R_in = (0 − V_out)/R_f, so V_out/V_in = −R_f/R_in.",
    explanation: "Virtual earth + no input current → equal currents → G = −R_f/R_in.",
    hints: ["State both ideal assumptions before writing the currents."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Derive the expression G = 1 + R_f/R₁ for the gain of a non-inverting amplifier.",
    points: [
      "Input to the non-inverting input; R_f (output to inverting input) and R₁ (inverting input to 0 V) form a potential divider across the output.",
      "No current into the inverting input, so V⁻ = V_out R₁/(R₁ + R_f).",
      "Very large gain, not saturated: V⁻ ≈ V⁺ = V_in.",
      "So V_in = V_out R₁/(R₁ + R_f), giving G = (R₁ + R_f)/R₁ = 1 + R_f/R₁.",
    ],
    modelAnswer: "The input goes to the non-inverting input, and R_f and R₁ form a potential divider between the output and 0 V with its junction at the inverting input. No current enters the op-amp, so V⁻ = V_out R₁/(R₁ + R_f). The open-loop gain is very large and the output is not saturated, so V⁻ ≈ V⁺ = V_in. Hence V_in = V_out R₁/(R₁ + R_f) and G = (R₁ + R_f)/R₁ = 1 + R_f/R₁.",
    explanation: "Feedback divider + V⁻ ≈ V⁺.",
    hints: ["Treat R_f and R₁ as a potential divider across the output."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three advantages of using negative feedback in an op-amp amplifier.",
    points: [
      "The gain is set by resistor values only, so it is predictable and the same for every op-amp.",
      "The gain is stable: it does not drift with temperature or supply changes (A₀ varies but G does not).",
      "Wider bandwidth (gain × bandwidth ≈ constant) / less distortion / wider linear range of input.",
    ],
    modelAnswer: "With negative feedback the gain depends only on resistor values, so it is known and the same for any op-amp; it stays stable when temperature or supply voltage change the open-loop gain; and the amplifier has a much wider bandwidth and less distortion than the op-amp alone.",
    explanation: "Feedback trades gain for predictability, stability and bandwidth.",
    hints: ["Think about what happens to A₀ from chip to chip."],
  });

  // Practice structured: characterising an inverting amplifier (14 marks)
  {
    const xs = [-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8];
    const ys = [10.6, 10.6, 7.3, 3.6, 0.0, -3.7, -7.1, -10.6, -10.6];
    const lin = xs.map((x, i) => [x, ys[i]]).filter(([x]) => Math.abs(x) <= 0.4);
    const fit = linFit(lin.map(([x]) => x), lin.map(([, y]) => y));
    const G = fit.m;
    const Rf = -G * 1.0;
    const vmax = 10.6 / -G;
    const Rtrue = 18, Rs = 2.0;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka builds an inverting amplifier with an input resistor of $1.0\ \text{k}\Omega$ and a feedback resistor whose value is unknown. The op-amp runs from a $\pm 12\ \text{V}$ supply. She applies steady input voltages and records:

${table([t`$V_{\text{in}}\,/\,\text{V}$`, t`$V_{\text{out}}\,/\,\text{V}$`], xs.map((x, i) => [dpStr(x, 1), dpStr(ys[i], 1)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe the amplifier circuit in words.", points: [
          "Input voltage through the 1.0 kΩ resistor to the inverting input; feedback resistor from the output to the inverting input.",
          "Non-inverting input connected to 0 V; op-amp powered from +12 V, 0 and −12 V with V_out measured from 0 V.",
        ], modelAnswer: "The input voltage is applied through the 1.0 kΩ resistor to the inverting input, and the feedback resistor connects the output back to the inverting input. The non-inverting input is joined to 0 V, the op-amp is powered from +12 V, 0 and −12 V, and the output is measured relative to 0 V." }),
        P.num({ label: "(b)", marks: 2, stem: "Use the linear part of the data to determine the voltage gain (include its sign).", value: G, tol: 0.6, wrong: [-G], explanation: t`Gradient of the straight section from $-0.4$ to $+0.4\ \text{V}$: about $\dfrac{-7.1 - 7.3}{0.8} = ${sfStr(G, 3).replace("-", "−")}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Hence determine the resistance of the feedback resistor, in kΩ.", value: Rf, tol: 0.6, unit: "kΩ", wrong: [1 / Rf], explanation: t`$R_f = |G| \times R_{\text{in}} \approx ${sfStr(Rf, 2)}\ \text{k}\Omega$ (an $18\ \text{k}\Omega$ resistor).` }),
        P.num({ label: "(d)", marks: 1, stem: "State the magnitude of the saturation voltage, in V.", value: 10.6, unit: "V", wrong: [12], explanation: "The output levels off at ±10.6 V, a little inside the ±12 V supply." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the largest input voltage that is amplified without clipping, in V, to two significant figures.", value: vmax, tol: 0.04, unit: "V", wrong: [12 / -G], explanation: t`$\dfrac{10.6}{${sfStr(-G, 3)}} \approx ${sfStr(vmax, 2)}\ \text{V}$.` }),
        P.manual({ label: "(f)", marks: 3, stem: "A sinusoidal input of peak 0.80 V and frequency 1.0 kHz is applied. Describe the output waveform.", points: [
          "Same frequency (1.0 kHz) and inverted (antiphase, 180° out of phase) with the input.",
          "Sinusoidal shape (gain about 18) for most of the cycle, while |V_in| < about 0.59 V.",
          "Peaks clipped flat at +10.6 V and −10.6 V (it would have reached about 14 V).",
        ], modelAnswer: "The output has the same 1.0 kHz frequency but is inverted relative to the input. It follows the sine shape, about 18 times larger, while the input is below about 0.59 V in size, but its peaks are clipped flat at +10.6 V and −10.6 V instead of reaching about 14 V." }),
        P.num({ label: "(g)", marks: 2, stem: t`The amplifier, with $R_f = 18\ \text{k}\Omega$, is connected to a microphone of internal resistance $2.0\ \text{k}\Omega$. Explain why the gain changes and calculate the magnitude of the gain measured from the microphone's e.m.f.`, value: Rtrue / (1.0 + Rs), unit: undefined, wrong: [Rtrue / 1.0], explanation: t`The amplifier's input resistance is only $R_{\text{in}} = 1.0\ \text{k}\Omega$ (virtual earth), so the microphone's resistance adds in series: $|G| = \dfrac{18}{1.0 + 2.0} = ${Rtrue / (1.0 + Rs)}$. A non-inverting amplifier or a buffer would avoid this.` }),
      ],
      explanation: "Gain from the gradient of the linear section; saturation clips the output; the inverting amplifier's input resistance is R_in.",
      hints: ["Use only the straight part for the gradient.", "The source resistance is in series with R_in."],
    });
  }
  // Practice structured: designing a thermocouple amplifier (8 marks)
  {
    const Vin = 0.040, target = 4.0, R1 = 1.0;
    const G = target / Vin;
    const Rf = (G - 1) * R1;
    const G2 = 1 + 100 / R1;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A thermocouple probe in a solar geyser gives an output from 0 to $40\ \text{mV}$. Rudo wants a non-inverting amplifier that turns this into 0 to about $4.0\ \text{V}$ for a data logger. The op-amp runs from $\pm 9\ \text{V}$ and has a gain-bandwidth product of $1.0\ \text{MHz}$; $R_1 = 1.0\ \text{k}\Omega$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the voltage gain needed.", value: G, wrong: [Vin / target], explanation: t`$G = \dfrac{4.0}{0.040} = ${G}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the value of R_f needed, in kΩ.", value: Rf, unit: "kΩ", wrong: [G * R1], explanation: t`$1 + \dfrac{R_f}{1.0} = 100$, so $R_f = ${Rf}\ \text{k}\Omega$.` }),
        P.num({ label: "(c)", marks: 2, stem: t`She uses the standard value $R_f = 100\ \text{k}\Omega$. Calculate the output for an input of $40\ \text{mV}$, in V, to three significant figures.`, value: G2 * Vin, unit: "V", wrong: [100 * Vin], explanation: t`$G = 1 + \dfrac{100}{1.0} = ${G2}$; $V_{\text{out}} = ${G2} \times 0.040 = ${sfStr(G2 * Vin, 3)}\ \text{V}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why a non-inverting amplifier is more suitable here than an inverting one.", points: [
          "Very high input resistance: it draws almost no current from the thermocouple, so the sensor voltage is not pulled down.",
          "Output is positive (in phase) for a positive input, matching a 0 to 4 V logger input.",
        ], modelAnswer: "The non-inverting amplifier has a very high input resistance, so it draws almost no current from the thermocouple and does not change its voltage, and its output is positive for a positive input, which suits a logger expecting 0 to 4 V." }),
        P.num({ label: "(e)", marks: 1, stem: "Estimate the bandwidth of the amplifier, in kHz, to two significant figures.", value: 1.0e6 / G2 / 1000, sf: 2, unit: "kHz", wrong: [1.0e6 * G2 / 1000], explanation: t`$\dfrac{1.0 \times 10^{6}}{${G2}} \approx ${sfStr(1.0e6 / G2 / 1000, 2)}\ \text{kHz}$, far more than a slowly changing temperature signal needs.` }),
      ],
      explanation: "Design: G from the voltage ranges, R_f = (G − 1)R₁; check output and bandwidth.",
      hints: ["G = 1 + R_f/R₁."],
    });
  }

  b.card("DEFINITION", "**Negative feedback**", "Returning a fraction of the output to the inverting input so that it opposes the change that produced it.");
  b.card("CONCEPT", "Effects of negative feedback", "Lower gain, but stable and set by resistors; wider bandwidth; less distortion.");
  b.card("DEFINITION", "**Virtual earth**", "A point held at almost 0 V by feedback without being connected to 0 V (the inverting input of an inverting amplifier).");
  b.card("FORMULA", "Inverting amplifier gain", t`$G = -\dfrac{R_f}{R_{\text{in}}}$ (output inverted; input resistance $R_{\text{in}}$)`);
  b.card("FORMULA", "Non-inverting amplifier gain", t`$G = 1 + \dfrac{R_f}{R_1}$ (output in phase; very high input resistance)`);
  b.card("CONCEPT", "Voltage follower", "Output joined to the inverting input, input to the non-inverting input: gain 1. Used as a buffer between a weak source and a load.");
  b.card("CONCEPT", "Two ideal assumptions in derivations", "Very large A₀ (not saturated) so V⁺ ≈ V⁻; very large input resistance so no current enters the inputs.");
  b.card("FACT", "Gain-bandwidth product", "Gain × bandwidth ≈ constant (about 1 MHz for a 741): a gain of 100 gives about 10 kHz bandwidth.");
  b.card("CONCEPT", "Clipping", "If |G × V_in| exceeds the saturation voltage, the output is flat at ±V_sat: sine-wave peaks are clipped.");
});
