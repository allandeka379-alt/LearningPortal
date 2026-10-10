// W4b: aphys.electronics.sensors-output-devices (ZIMSEC only) — LDR, thermistor, strain gauge, piezoelectric
// transducer, microphone; potential dividers and op-amps; calibration; relays, LEDs, calibrated meters; systems.
import { concept, P, t, chk, sfStr, dpStr, table, pctUnc } from "../lib.mjs";

concept("aphys.electronics.sensors-output-devices", { file: "electronics/sensors-output-devices", keyPrefix: "electronics.sensors-output-devices" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How does the resistance of a light-dependent resistor change as the light falling on it becomes brighter?",
    options: [
      ["It decreases, because more charge carriers are released.", "Correct: an LDR is a semiconductor; more light frees more charge carriers."],
      ["It increases, because the LDR becomes warmer.", "Heating is not the main effect, and an LDR's resistance falls in light."],
      ["It stays the same, but the LDR produces a p.d.", "That describes a photocell or solar cell, not an LDR."],
      ["It increases, because light scatters the electrons.", "Brighter light lowers the resistance of an LDR."],
    ],
    answer: "A",
    explanation: "LDR: resistance falls as light intensity rises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A metal-foil strain gauge is glued to a steel beam which is then stretched. Why does the resistance of the gauge increase?",
    options: [
      ["The track becomes longer and thinner.", "Correct: R = ρL/A, so increasing L and decreasing A both increase R."],
      ["The resistivity of the metal increases sharply.", "The main change is in the dimensions, not the resistivity."],
      ["The track becomes shorter and wider.", "That happens under compression, which lowers the resistance."],
      ["Stretching heats the metal.", "Any heating is negligible; the effect is geometrical."],
    ],
    answer: "A",
    explanation: "Stretching increases L and reduces A, so R = ρL/A increases (ΔR/R ≈ 2 × strain at constant volume).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which sensor produces a p.d. across itself when it is squeezed, without needing a supply?",
    options: [
      ["A piezoelectric crystal", "Correct: compressing the crystal displaces its ions and gives a p.d."],
      ["A strain gauge", "A strain gauge changes resistance; it needs a supply to give a voltage."],
      ["An NTC thermistor", "A thermistor changes resistance with temperature."],
      ["A light-dependent resistor", "An LDR changes resistance with light."],
    ],
    answer: "A",
    explanation: "Piezoelectric effect: mechanical stress → p.d.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An NTC thermistor and a fixed resistor are connected in series across a steady supply, with the thermistor connected to the positive terminal. The output is taken across the fixed resistor. What happens to the output as the temperature rises?",
    options: [
      ["It increases.", "Correct: the thermistor's resistance falls, so the fixed resistor takes a larger share of the p.d."],
      ["It decreases.", "This would be the p.d. across the thermistor, not across the fixed resistor."],
      ["It stays constant, since the supply is constant.", "The supply is shared in the ratio of the resistances, which changes."],
      ["It first rises and then falls.", "The resistance falls steadily with temperature, so the output changes in one direction."],
    ],
    answer: "A",
    explanation: "Thermistor resistance down → share across the fixed resistor up.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a relay used between an op-amp and a borehole pump motor?",
    options: [
      ["The small output current operates the coil, which closes a separate high-current circuit.", "Correct: and it isolates the electronics from the motor supply."],
      ["The relay increases the op-amp's output voltage to the mains voltage.", "A relay is a switch; it does not change voltages."],
      ["The relay converts the op-amp's d.c. output into a.c. for the motor.", "The motor runs from its own supply; the relay only switches it."],
      ["The relay smooths the output so the motor runs evenly.", "Smoothing is done with capacitors, not relays."],
    ],
    answer: "A",
    explanation: "A relay lets a current of a few milliamperes switch amperes in an isolated circuit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The calibration curve of a thermistor thermometer (output voltage against temperature) is steep at low temperatures and flatter at high temperatures. What does this tell you?",
    options: [
      ["The thermometer is most sensitive at low temperatures.", "Correct: sensitivity = change in output per unit change in temperature, the gradient."],
      ["The thermometer is most sensitive at high temperatures.", "A flatter curve means a smaller change in output per kelvin: less sensitive."],
      ["The thermometer is equally sensitive at all temperatures.", "That would need a straight-line calibration."],
      ["The thermometer cannot be used above room temperature.", "It can; readings are just less precise where the curve is flat."],
    ],
    answer: "A",
    explanation: "Sensitivity is the gradient of the calibration curve.",
    hints: ["Sensitivity is output change per unit input change."],
  });
  {
    const R = 350, eps = 5.0e-4;
    const dR = 2 * eps * R;
    chk(dR, 0.35);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A strain gauge of resistance $350\ \Omega$ is stretched by a strain of $5.0 \times 10^{-4}$. Assuming its volume stays constant, so that $\Delta R/R \approx 2\varepsilon$, what is the change in its resistance?`,
      options: [
        [t`$0.35\ \Omega$`, "Correct: ΔR = 2 × 5.0 × 10⁻⁴ × 350."],
        [t`$0.18\ \Omega$`, "This leaves out the factor 2 (length up and area down both raise R)."],
        [t`$7.0 \times 10^{5}\ \Omega$`, "This divides by the strain instead of multiplying."],
        [t`$350\ \Omega$`, "This is the gauge's resistance, not the change in it."],
      ],
      answer: "A",
      explanation: t`$\Delta R = 2\varepsilon R = 2 \times 5.0 \times 10^{-4} \times 350 = ${dR}\ \Omega$.`,
      hints: ["ΔR = 2εR."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: t`An LDR and a $10\ \text{k}\Omega$ resistor are in series across a $9.0\ \text{V}$ supply. In daylight the LDR's resistance is $2.0\ \text{k}\Omega$. Calculate the p.d. across the LDR, in V.`,
    value: (9 * 2) / 12, unit: "V", wrong: [(9 * 10) / 12],
    explanation: t`$V = 9.0 \times \dfrac{2.0}{2.0 + 10} = ${sfStr((9 * 2) / 12, 3)}\ \text{V}$. The p.d. across the fixed resistor would be $${sfStr((9 * 10) / 12, 3)}\ \text{V}$.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`An LED lights with a current of $15\ \text{mA}$ and a p.d. of $1.8\ \text{V}$. It is driven from an op-amp output of $+9.0\ \text{V}$. Calculate the resistance of the series resistor needed, in Ω.`,
    value: (9 - 1.8) / 0.015, unit: "Ω", wrong: [9 / 0.015, (9 + 1.8) / 0.015],
    explanation: t`$R = \dfrac{9.0 - 1.8}{0.015} = ${(9 - 1.8) / 0.015}\ \Omega$. Ignoring the LED's p.d. gives $600\ \Omega$ and a dimmer LED.`,
    hints: ["Subtract the LED's p.d. from the supply first."],
  });
  {
    const Vs = 5.0, Rf = 4.7, Vout = 3.0;
    const Rth = (Rf * (Vs - Vout)) / Vout;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A thermistor (connected to $+5.0\ \text{V}$) and a $4.7\ \text{k}\Omega$ resistor (connected to 0 V) form a potential divider. The p.d. across the fixed resistor is $3.0\ \text{V}$. Calculate the resistance of the thermistor, in kΩ, to three significant figures.`,
      value: Rth, unit: "kΩ", wrong: [(Rf * Vout) / (Vs - Vout)],
      explanation: t`1. p.d. across the thermistor $= 5.0 - 3.0 = 2.0\ \text{V}$.
2. Same current: $\dfrac{R_{\text{th}}}{4.7} = \dfrac{2.0}{3.0}$, so $R_{\text{th}} = ${sfStr(Rth, 3)}\ \text{k}\Omega$.`,
      hints: ["In a divider, p.d.s are in the ratio of the resistances."],
    });
  }
  {
    const R0 = 120, eps = 1.2e-3, Vs = 9.0, G = 101;
    const dR = 2 * eps * R0;
    const dV = (Vs * (R0 + dR)) / (2 * R0 + dR) - Vs / 2;
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`A $120\ \Omega$ strain gauge and a fixed $120\ \Omega$ resistor are in series across $9.0\ \text{V}$; the change in the p.d. across the gauge is amplified by an amplifier of gain 101. A load produces a strain of $1.2 \times 10^{-3}$ in the gauge ($\Delta R/R \approx 2\varepsilon$). Calculate the change in the amplifier's output voltage, in V, to three significant figures.`,
      value: dV * G, unit: "V", wrong: [(Vs / 2) * 2 * eps * G, dV],
      explanation: t`1. $\Delta R = 2 \times 1.2 \times 10^{-3} \times 120 = ${sfStr(dR, 3)}\ \Omega$.
2. New p.d. across the gauge: $9.0 \times \dfrac{${sfStr(R0 + dR, 5)}}{${sfStr(2 * R0 + dR, 5)}}$, an increase of $${sfStr(dV * 1000, 3)}\ \text{mV}$ over 4.5 V.
3. Output change $= 101 \times ${sfStr(dV, 3)} = ${sfStr(dV * G, 3)}\ \text{V}$. The divider change is tiny, which is why amplification is needed.`,
      hints: ["Find ΔR, then the new divider output, then multiply by the gain."],
    });
  }
  {
    const d = 1.0, rise = 40.0;
    b.num({
      d: 3, skill: "EVALUATION", calculator: false,
      stem: t`During a calibration, the water bath is heated from $25.0\ ^\circ\text{C}$ to $65.0\ ^\circ\text{C}$, each reading having an uncertainty of $\pm 0.5\ ^\circ\text{C}$. Calculate the percentage uncertainty in the temperature rise, in %, to two significant figures.`,
      value: pctUnc(d, rise), sf: 2, unit: "%", wrong: [pctUnc(0.5, rise), pctUnc(0.5, 65)],
      explanation: t`A difference of two readings: absolute uncertainties add, $0.5 + 0.5 = 1.0\ ^\circ\text{C}$. Percentage $= \dfrac{1.0}{40.0} \times 100 = ${sfStr(pctUnc(d, rise), 2)}\%$.`,
      hints: ["The rise is a difference: add the two absolute uncertainties."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The protective diode across a relay coil is forward-biased while the relay is switched on.",
    answer: false,
    explanation: "False. It is reverse-biased in normal use (otherwise it would short-circuit the coil); it conducts only the current driven by the induced e.m.f. at switch-off.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each device with the physical principle it uses.",
    pairs: [
      ["Piezoelectric microphone", "Stress on a crystal produces a p.d."],
      ["Moving-coil microphone", "Electromagnetic induction in a coil moving in a magnetic field"],
      ["Strain gauge", "Resistance rises as a track gets longer and thinner"],
      ["LDR", "Light releases charge carriers in a semiconductor"],
      ["Relay", "A current in a coil magnetises a core that closes a switch"],
    ],
    explanation: "Each sensor or output device converts one form of signal into another by a different principle.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the block description of an electronic system.",
    template: "A sensor responds to a physical quantity; a {{blank:a}} stage, such as a potential divider and an op-amp, produces a useful voltage; an {{blank:b}} device, such as a relay or an LED, acts on or displays the result.",
    blanks: [
      { id: "a", accepted: ["processing"], choices: ["processing", "output", "input"] },
      { id: "b", accepted: ["output"], choices: ["output", "input", "sensing"] },
    ],
    explanation: "Sensor → processing → output.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the output device that allows the small current from an op-amp to switch on a mains-powered pump in a separate circuit.",
    accepted: ["relay", "a relay", "electromagnetic relay"],
    explanation: "A relay: the op-amp current energises its coil, which closes contacts in the pump circuit.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would calibrate a thermistor thermometer whose output voltage is read on a digital voltmeter.",
    points: [
      "Place the thermistor next to an accurate (reference) thermometer in a water bath.",
      "Heat the bath in steps (e.g. from ice-water to boiling), stirring and waiting for steady readings.",
      "Record the output voltage and the thermometer reading at each temperature (at least six values over the range).",
      "Plot output voltage against temperature (calibration curve) and read unknown temperatures from it.",
    ],
    modelAnswer: "Put the thermistor beside an accurate thermometer in a water bath. Starting with melting ice, heat the water in steps up to boiling, stirring and waiting each time until both readings are steady, and record the voltmeter reading and the temperature at six or more points. Plot output voltage against temperature; an unknown temperature is then read from this calibration curve.",
    explanation: "Calibration: known values against output, then a curve.",
    hints: ["You need a known temperature for each reading."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: t`Show that, for a strain gauge wire whose volume stays constant when it is stretched, $\dfrac{\Delta R}{R} \approx 2\varepsilon$, where $\varepsilon$ is the strain.`,
    points: [
      "R = ρL/A and constant volume V = AL, so A = V/L and R = ρL²/V.",
      "So R ∝ L², and for a small change ΔR/R ≈ 2ΔL/L.",
      "ΔL/L is the strain ε, so ΔR/R ≈ 2ε.",
    ],
    modelAnswer: "R = ρL/A. With the volume V = AL constant, A = V/L, so R = ρL²/V and R is proportional to L². For a small change, the fractional change in R is twice the fractional change in L: ΔR/R ≈ 2ΔL/L = 2ε.",
    explanation: "Constant volume makes R ∝ L².",
    hints: ["Eliminate A using the volume."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A tobacco grower near Marondera needs an alarm that sounds a buzzer when the air temperature in a seedbed falls close to freezing. Describe a suitable electronic system block by block.",
    points: [
      "Sensor: an NTC thermistor in a potential divider with a fixed resistor, so the divider voltage changes as the temperature falls.",
      "Processing: an op-amp comparator compares the divider voltage with a reference set by a variable resistor (for about 2 °C).",
      "Output: when the temperature falls below the set value the output switches to positive saturation.",
      "This energises a relay (with a protective diode) that switches on the buzzer (and/or an LED with a series resistor).",
    ],
    modelAnswer: "An NTC thermistor and a fixed resistor form a potential divider whose output voltage changes as the temperature falls. This voltage goes to one input of an op-amp comparator; the other input is a reference from a divider containing a variable resistor, set so that switching happens at about 2 °C. When the seedbed cools below this, the comparator output switches to positive saturation, energising a relay (with a protective diode across its coil) that switches on the buzzer, and an LED with a series resistor can show the alarm state.",
    explanation: "Sensor → comparator with adjustable reference → relay → buzzer.",
    hints: ["Name the sensor, the processing and the output."],
  });

  // Practice structured: calibrating a thermistor thermometer (12 marks)
  {
    const temps = [10, 20, 30, 40, 50, 60, 70];
    const V = [1.71, 2.47, 3.3, 4.22, 5.07, 5.86, 6.5];
    const Rth40 = (4.7 * (9 - V[3])) / V[3];
    const Tread = 30 + (10 * (3.8 - V[2])) / (V[3] - V[2]);
    const sens = (V[2] - V[1]) / 10;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Sipho builds a thermometer from an NTC thermistor (connected to $+9.0\ \text{V}$) in series with a $4.7\ \text{k}\Omega$ resistor (connected to 0 V); a digital voltmeter reads the p.d. $V$ across the fixed resistor. His calibration readings are:

${table([t`$\theta\,/\,^\circ\text{C}$`, t`$V\,/\,\text{V}$`], temps.map((c, i) => [String(c), dpStr(V[i], 2)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Describe how these readings should be obtained so that they are reliable.", points: [
          "Thermistor beside a reference thermometer in a stirred water bath, heated in steps.",
          "Wait until both readings are steady before recording (thermal equilibrium); repeat while cooling and average.",
        ], modelAnswer: "Put the thermistor next to a reference thermometer in a water bath, stir and heat in steps, and record only when both readings have stopped changing; repeat the readings while the bath cools and average them." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the resistance of the thermistor at 40 °C, in kΩ, to three significant figures.", value: Rth40, unit: "kΩ", wrong: [(4.7 * V[3]) / (9 - V[3])], explanation: t`p.d. across the thermistor $= 9.0 - 4.22 = 4.78\ \text{V}$; $R = 4.7 \times \dfrac{4.78}{4.22} = ${sfStr(Rth40, 3)}\ \text{k}\Omega$.` }),
        P.num({ label: "(c)", marks: 2, stem: "The voltmeter reads 3.80 V. Use the readings to estimate the temperature, in °C.", value: Tread, tol: 1.5, unit: "°C", wrong: [40], explanation: t`3.80 V lies between 3.30 V (30 °C) and 4.22 V (40 °C): $30 + 10 \times \dfrac{0.50}{0.92} \approx ${sfStr(Tread, 3)}\ ^\circ\text{C}$ (reading from a smooth curve gives a similar value).` }),
        P.num({ label: "(d)", marks: 2, stem: t`Calculate the average sensitivity of the thermometer between 20 °C and 30 °C, in $\text{V}\,^\circ\text{C}^{-1}$, to two significant figures.`, value: sens, sf: 2, wrong: [1 / sens], explanation: t`$\dfrac{3.30 - 2.47}{30 - 20} = ${sfStr(sens, 2)}\ \text{V}\,^\circ\text{C}^{-1}$; between 60 and 70 °C it is only $${sfStr((V[6] - V[5]) / 10, 2)}\ \text{V}\,^\circ\text{C}^{-1}$, so the thermometer is less sensitive at high temperatures.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Sipho replaces the digital voltmeter by a cheap moving-coil meter of resistance 5 kΩ and finds the readings are too low. Explain why, and how a voltage follower would solve the problem.", points: [
          "The meter draws current and is in parallel with the 4.7 kΩ resistor, lowering the combined resistance and so the divider output.",
          "A voltage follower (very high input resistance, low output resistance, gain 1) between the divider and the meter draws no current from the divider but supplies the meter.",
        ], modelAnswer: "The 5 kΩ meter in parallel with the 4.7 kΩ resistor lowers the resistance of the bottom of the divider, so the p.d. across it falls. A voltage follower draws almost no current from the divider, so its voltage is unchanged, and its low output resistance supplies the meter's current." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest one source of error in the calibration and how to reduce it.", points: [
          "Self-heating: the current warms the thermistor above the water temperature / thermistor and thermometer not at the same temperature (lag).",
          "Use a smaller current (larger resistances or lower supply) / stir and wait longer, place them close together.",
        ], modelAnswer: "The current through the thermistor heats it slightly above the water temperature, so readings are offset; using larger resistances to keep the current small, and stirring well with the two sensors close together, reduces the error." }),
      ],
      explanation: "Calibration curve; divider calculations; sensitivity = gradient; buffers prevent loading.",
      hints: ["p.d.s in a divider are in the ratio of the resistances.", "Sensitivity is the gradient of V against θ."],
    });
  }
  // Practice structured: weighbridge strain gauge (8 marks)
  {
    const R0b = 240, eps2 = 8.0e-4, Vs2 = 5.0, G2 = 220;
    const dR = 2 * eps2 * R0b;
    const dV = (Vs2 * (R0b + dR)) / (2 * R0b + dR) - Vs2 / 2;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A weighbridge for haulage trucks uses a $240\ \Omega$ strain gauge glued to a steel beam. The gauge is in series with a fixed $240\ \Omega$ resistor across a $5.0\ \text{V}$ supply. The change in p.d. across the gauge is amplified by an amplifier of gain 220. A loaded truck produces a strain of $8.0 \times 10^{-4}$ in the gauge. Take $\Delta R/R \approx 2\varepsilon$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the change in resistance of the gauge, in Ω, to two significant figures.", value: dR, sf: 2, unit: "Ω", wrong: [eps2 * R0b], explanation: t`$\Delta R = 2 \times 8.0 \times 10^{-4} \times 240 = ${sfStr(dR, 2)}\ \Omega$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the change in the p.d. across the gauge, in mV, to two significant figures.", value: dV * 1000, sf: 2, wrong: [(Vs2 * dR) / (2 * R0b) * 1000], explanation: t`$5.0 \times \dfrac{240 + ${sfStr(dR, 3)}}{480 + ${sfStr(dR, 3)}} - 2.5 = ${sfStr(dV * 1000, 2)}\ \text{mV}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the change in the amplifier output, in V, to two significant figures.", value: dV * G2, sf: 2, unit: "V", wrong: [dV * 1000 * G2], explanation: t`$220 \times ${sfStr(dV, 2)} = ${sfStr(dV * G2, 2)}\ \text{V}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The resistance of the gauge also changes with temperature. Suggest how the effect of temperature can be cancelled.", points: [
          "Replace the fixed resistor with an identical (dummy) gauge on the same beam at the same temperature but not strained (mounted across the strain direction).",
          "Temperature changes both resistances equally, so the divider ratio, and the output, do not change; only strain does.",
        ], modelAnswer: "Use a second, identical gauge as the other half of the divider, mounted on the same beam so it is at the same temperature but placed across the direction of stretching so it is not strained. A temperature change alters both resistances equally and leaves the divider ratio unchanged, so only the strain affects the output." }),
      ],
      explanation: "Small resistance change → tiny divider change → amplification; a dummy gauge compensates for temperature.",
      hints: ["ΔR = 2εR.", "Compare the new divider output with 2.5 V."],
    });
  }

  b.card("DEFINITION", "**Sensor**", "A device whose resistance or p.d. changes with a physical quantity so that it can be measured or detected electrically.");
  b.card("FACT", "LDR and NTC thermistor", "LDR: resistance falls as light intensity rises. NTC thermistor: resistance falls (non-linearly) as temperature rises.");
  b.card("CONCEPT", "Strain gauge", t`Stretched: longer and thinner, so $R = \rho L/A$ rises. At constant volume $\Delta R/R \approx 2\varepsilon$.`);
  b.card("DEFINITION", "**Piezoelectric effect**", "A p.d. appears across a crystal (e.g. quartz) when it is compressed or stretched; it changes shape when a p.d. is applied.");
  b.card("FORMULA", "Potential divider", t`$V_{\text{out}} = V_{\text{in}}\dfrac{R_2}{R_1 + R_2}$ (output across $R_2$, negligible current drawn)`);
  b.card("DEFINITION", "**Calibration**", "Recording a system's output against known values of the quantity, then reading unknowns from the calibration curve.");
  b.card("FORMULA", "LED series resistor", t`$R = \dfrac{V_{\text{supply}} - V_{\text{LED}}}{I}$`);
  b.card("CONCEPT", "Relay and diode", "A small current in the coil closes contacts in a separate high-current circuit; a reverse diode across the coil protects against the induced e.m.f. at switch-off.");
  b.card("CONCEPT", "System blocks", "Sensor → processing (divider, comparator or amplifier) → output (relay, LED, meter).");
});
