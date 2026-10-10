// W2b: aphys.electricity.resistance-iv — R = V/I, Ohm's law, I-V characteristics (wire, lamp, diode), LDR, NTC thermistor.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, table } from "../lib.mjs";

concept("aphys.electricity.resistance-iv", { file: "electricity/resistance-iv", keyPrefix: "electricity.resistance-iv" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement of Ohm's law is complete and correct?",
    options: [
      ["Current is proportional to p.d. for a conductor at constant temperature.", "Correct: proportionality plus the condition of constant physical conditions."],
      ["Resistance equals p.d. divided by current for every conductor.", "That is the definition of resistance, which applies to all components; it is not Ohm's law."],
      ["Current is proportional to p.d. for every electrical component.", "Lamps and diodes do not obey it; the constant-temperature condition is missing."],
      ["The p.d. across a conductor increases as its temperature rises.", "This is not a statement of proportionality between I and V."],
    ],
    answer: "A",
    explanation: "Ohm's law: the current in a conductor is directly proportional to the p.d. across it, provided its temperature (and other physical conditions) remain constant. R = V/I is the definition of resistance.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the ohm expressed in SI base units?",
    options: [
      [t`$\text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-2}$`, "Correct: V A⁻¹ = (kg m² s⁻³ A⁻¹) ÷ A."],
      [t`$\text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}$`, "This is the volt; the ohm needs one more A⁻¹."],
      [t`$\text{kg m}^2\,\text{s}^{-2}\,\text{A}^{-2}$`, "The power of s is −3, from J s⁻¹ in the watt."],
      [t`$\text{kg}^{-1}\,\text{m}^{-2}\,\text{s}^{3}\,\text{A}^{2}$`, "This is the siemens (A V⁻¹), the reciprocal of the ohm."],
    ],
    answer: "A",
    explanation: t`$\Omega = \text{V A}^{-1}$ and $\text{V} = \text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}$, so $\Omega = \text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-2}$.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "As the p.d. across a filament lamp is increased from zero, which describes how the I-V graph (current on the y-axis) changes and why?",
    options: [
      ["Its gradient decreases, because the hotter filament has a larger resistance.", "Correct: R = V/I rises with temperature, so I rises less steeply."],
      ["Its gradient increases, because the hotter filament has a larger resistance.", "A larger resistance means less current per volt, so the gradient falls."],
      ["Its gradient stays constant, because a filament is a metal conductor.", "Only a metal at constant temperature is ohmic; the filament heats up."],
      ["Its gradient decreases, because the hotter filament releases more free electrons.", "More carriers would lower the resistance; in a metal n is constant and collisions increase."],
    ],
    answer: "A",
    explanation: "A larger current heats the filament; the lattice ions vibrate more and the electrons collide more often, so the resistance rises and the I-V curve bends towards the V-axis.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which component's resistance decreases when the intensity of light falling on it increases?",
    options: [
      ["Light-dependent resistor", "Correct: light frees more charge carriers in the semiconductor."],
      ["NTC thermistor", "Its resistance depends on temperature, not light."],
      ["Filament lamp", "Its resistance rises with the current through it; light falling on it does not matter."],
      ["Fixed metal-film resistor", "Its resistance is (nearly) constant."],
    ],
    answer: "A",
    explanation: "In an LDR, light gives electrons enough energy to become free carriers, so its resistance falls as light intensity increases.",
  });
  {
    // reading a diode: resistance at a point
    const V = 0.68, I = 12e-3;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A silicon diode in forward bias carries $12\ \text{mA}$ when the p.d. across it is $0.68\ \text{V}$. What is its resistance at this point?`,
      options: [
        [`${sfStr(V / I, 3)} Ω`, "Correct: R = V/I with I in amperes."],
        [`${sfStr(V / 12, 3)} Ω`, "This leaves the current in milliamperes."],
        [`${sfStr(I / V, 3)} Ω`, "This is I/V, the reciprocal of resistance."],
        [`${sfStr(V * I * 1000, 3)} Ω`, "This multiplies V and I (in mA), which gives a power in mW, not a resistance."],
      ],
      answer: "A",
      explanation: t`$R = \dfrac{V}{I} = \dfrac{0.68}{12 \times 10^{-3}} = ${sfStr(V / I, 3)}\ \Omega$. The resistance is $V/I$ at the point, not the gradient.`,
      hints: ["Convert mA to A."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A component's I-V graph is a horizontal line along the V-axis for all negative p.d.s and from 0 to about 0.6 V, then rises very steeply. What is the component?",
    options: [
      ["A semiconductor diode", "Correct: no current in reverse bias, conduction above the forward threshold."],
      ["A filament lamp", "A lamp conducts in both directions; its curve is symmetric about the origin."],
      ["An NTC thermistor at constant temperature", "At constant temperature it behaves like an ohmic resistor in both directions."],
      ["An ohmic resistor", "An ohmic resistor gives a straight line through the origin in both directions."],
    ],
    answer: "A",
    explanation: "Only the diode passes negligible current in reverse bias and conducts strongly above a forward threshold of about 0.6-0.7 V for silicon.",
    hints: ["Which component conducts in one direction only?"],
  });
  {
    const pts = [[3.0, 0.45], [5.0, 0.63], [7.0, 0.77]];
    const [, [V2, I2], [V3, I3]] = pts;
    const Rpt = V3 / I3, Rg = (V3 - V2) / (I3 - I2);
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: t`For a filament lamp the current is $0.45\ \text{A}$ at $3.0\ \text{V}$, $0.63\ \text{A}$ at $5.0\ \text{V}$ and $0.77\ \text{A}$ at $7.0\ \text{V}$. A student says the resistance at $7.0\ \text{V}$ is the reciprocal of the gradient between the last two points. What is the correct resistance at $7.0\ \text{V}$, and what does her method give?`,
      options: [
        [`${sfStr(Rpt, 3)} Ω; her method gives ${sfStr(Rg, 3)} Ω`, "Correct: R = V/I at the point; 1/gradient is a different quantity."],
        [`${sfStr(Rg, 3)} Ω; her method gives ${sfStr(Rpt, 3)} Ω`, "These are swapped: V/I = 7.0/0.77 is the resistance."],
        [`${sfStr(Rpt, 3)} Ω; her method gives the same value`, "The curve is not a straight line through the origin, so 1/gradient ≠ V/I."],
        [`${sfStr(I3 / V3, 3)} Ω; her method gives ${sfStr(1 / Rg, 3)} Ω`, "These are I/V and the gradient itself, both reciprocals of what is needed."],
      ],
      answer: "A",
      explanation: t`$R = V/I = 7.0/0.77 = ${sfStr(Rpt, 3)}\ \Omega$. The reciprocal gradient, $\dfrac{7.0 - 5.0}{0.77 - 0.63} = ${sfStr(Rg, 3)}\ \Omega$, is not the resistance.`,
      hints: ["Resistance is defined as V/I at the point."],
    });
    chk(pts.length, 3);
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A resistor carries a current of $25\ \text{mA}$ when the p.d. across it is $5.5\ \text{V}$. Calculate its resistance, in Ω.`,
    value: 5.5 / 0.025, unit: "Ω", wrong: [5.5 / 25, 0.025 / 5.5],
    explanation: t`$R = \dfrac{V}{I} = \dfrac{5.5}{0.025} = ${5.5 / 0.025}\ \Omega$. Leaving the current in mA gives $0.22\ \Omega$.`,
  });
  {
    const R = 330, V = 2.4;
    b.num({
      d: 2, skill: "APPLICATION",
      stem: t`An NTC thermistor has a resistance of $330\ \Omega$ at room temperature. Calculate the current through it, in mA, when the p.d. across it is $2.4\ \text{V}$, to three significant figures.`,
      value: (V / R) * 1000, unit: "mA", wrong: [V / R, R / V],
      explanation: t`$I = \dfrac{V}{R} = \dfrac{2.4}{330} = ${sciTex(V / R)}\ \text{A} = ${sfStr((V / R) * 1000, 3)}\ \text{mA}$.`,
    });
  }
  {
    // LED with series resistor
    const Vs = 9.0, Vd = 2.0, I = 0.015;
    const R = (Vs - Vd) / I;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A red LED needs a current of $15\ \text{mA}$, at which the p.d. across it is $2.0\ \text{V}$. It is connected in series with a resistor to a $9.0\ \text{V}$ battery of negligible internal resistance. Calculate the resistance needed, in Ω, to three significant figures.`,
      value: R, unit: "Ω", wrong: [Vs / I, Vd / I],
      explanation: t`1. P.d. across the resistor $= 9.0 - 2.0 = 7.0\ \text{V}$.
2. The same current flows through both (series): $R = \dfrac{7.0}{0.015} = ${sfStr(R, 3)}\ \Omega$.
3. Using the full 9.0 V forgets the p.d. across the LED.`,
      hints: ["The resistor and LED share the 9.0 V.", "Same current in series."],
    });
  }
  {
    // lamp power at a reading and change of resistance
    const V1 = 3.0, I1 = 0.18, V2 = 12.0, I2 = 0.42;
    const ratio = (V2 / I2) / (V1 / I1);
    b.calc({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`A $12\ \text{V}$ filament lamp carries $0.18\ \text{A}$ at $3.0\ \text{V}$ and $0.42\ \text{A}$ at $12.0\ \text{V}$. Calculate the ratio $\dfrac{\text{resistance at } 12.0\ \text{V}}{\text{resistance at } 3.0\ \text{V}}$, to three significant figures.`,
      value: ratio, wrong: [1 / ratio, 0.42 / 0.18],
      explanation: t`1. $R_{3} = 3.0/0.18 = ${sfStr(V1 / I1, 3)}\ \Omega$.
2. $R_{12} = 12.0/0.42 = ${sfStr(V2 / I2, 3)}\ \Omega$.
3. Ratio $= ${sfStr(ratio, 3)}$: the hot filament's resistance is larger, because the lattice ions vibrate more and electrons collide with them more often.`,
      hints: ["Find R = V/I at each point."],
    });
  }
  {
    // diode in series with a resistor
    const Vs = 6.0, Vd = 0.70, R = 150;
    const I = ((Vs - Vd) / R) * 1000;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A silicon diode is connected in forward bias in series with a $150\ \Omega$ resistor across a $6.0\ \text{V}$ supply of negligible internal resistance. The p.d. across the conducting diode is $0.70\ \text{V}$. Calculate the current, in mA, to three significant figures.`,
      value: I, unit: "mA", wrong: [(Vs / R) * 1000, (Vd / R) * 1000],
      explanation: t`The p.d. across the resistor is $6.0 - 0.70 = 5.3\ \text{V}$, and the same current flows through both components, so $I = \dfrac{5.3}{150} = ${sciTex(I / 1000)}\ \text{A} = ${sfStr(I, 3)}\ \text{mA}$. Using the full 6.0 V gives $40.0\ \text{mA}$, which ignores the p.d. across the diode.`,
      hints: ["The diode takes about 0.7 V of the supply p.d."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The resistance of an NTC thermistor increases as its temperature increases.",
    answer: false,
    explanation: "False. NTC means negative temperature coefficient: heating frees more charge carriers, so the resistance falls as temperature rises.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The equation R = V/I can be used to find the resistance of a diode at any point on its characteristic, even though a diode does not obey Ohm's law.",
    answer: true,
    explanation: "True. R = V/I is the definition of resistance and applies at every point; Ohm's law is the special case where this ratio is constant.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each component with the description of its I-V graph (current on the y-axis).",
    pairs: [
      ["metal wire at constant temperature", "a straight line through the origin in both directions"],
      ["filament lamp", "a curve through the origin, gradient falling as |V| rises, symmetric"],
      ["semiconductor diode", "zero for reverse p.d.; rises steeply above about 0.6 V"],
      ["NTC thermistor heated by the current through it", "a curve through the origin, gradient rising as |V| rises"],
    ],
    explanation: "Wire: ohmic. Lamp: resistance rises with temperature. Diode: one-way conduction above a threshold. Self-heated NTC thermistor: resistance falls as it warms, so the current rises ever more steeply.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation for a filament lamp.",
    template: "As the current increases, the filament's temperature {{blank:a}}. The lattice ions vibrate more, so the electrons make {{blank:b}} collisions with them. The resistance therefore {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["rises"], choices: ["rises", "falls", "stays the same"] },
      { id: "b", accepted: ["more frequent"], choices: ["more frequent", "less frequent", "no"] },
      { id: "c", accepted: ["increases"], choices: ["increases", "decreases", "stays constant"] },
    ],
    explanation: "Hotter filament → larger ion vibrations → more frequent collisions → larger resistance.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to a conductor whose I-V graph is a straight line through the origin at constant temperature?",
    accepted: ["ohmic conductor", "ohmic", "an ohmic conductor", "ohmic resistor"],
    explanation: "An **ohmic** conductor obeys Ohm's law: constant resistance at constant temperature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the I-V characteristic of a silicon semiconductor diode for both directions of p.d., as you would sketch it (current on the y-axis). Include approximate values.",
    points: [
      "Reverse bias (negative V): current zero or negligibly small (line along the V-axis).",
      "Forward bias below about 0.6 V: current still negligible.",
      "Above the threshold (about 0.6-0.7 V) the current rises very steeply (almost vertically).",
      "The graph is not symmetric and not a straight line: the diode is non-ohmic; its resistance falls rapidly above the threshold.",
    ],
    modelAnswer: "For negative p.d.s the graph lies along the V-axis: almost no current in reverse bias. In forward bias the current stays near zero up to about 0.6 V, then rises very steeply above 0.6-0.7 V. The graph is not symmetric and not straight, so the diode is non-ohmic, with a resistance that falls rapidly above the threshold.",
    explanation: "One-way conduction with a forward threshold.",
    hints: ["Start with negative p.d."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain, in terms of charge carriers, why the resistance of an NTC thermistor falls as its temperature rises, whereas that of a metal wire rises.",
    points: [
      "In the thermistor (a semiconductor) heating frees many more charge carriers, so n increases greatly.",
      "This outweighs the extra collisions, so the current for a given p.d. rises: resistance falls.",
      "In a metal n is fixed; heating only increases lattice vibrations and collisions, so the resistance rises.",
    ],
    modelAnswer: "In the semiconductor of a thermistor, heating gives more electrons enough energy to become free, so the number density of carriers rises steeply; this outweighs the extra collisions, so the resistance falls. In a metal the number of free electrons does not change, and the larger lattice vibrations only cause more collisions, so the resistance rises.",
    explanation: "Semiconductor: n rises. Metal: n constant, collisions increase.",
    hints: ["Use I = nAvq."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Describe how you would obtain the I-V characteristic of a filament lamp, including negative values of p.d. Give the circuit in words and two precautions.",
    points: [
      "Lamp in series with an ammeter; voltmeter in parallel across the lamp only.",
      "P.d. varied from zero with a potential divider (rheostat connected across the supply); at least eight readings over the range.",
      "Reverse the connections to the lamp (or the supply) and repeat for negative p.d.s.",
      "Precautions: wait for each reading to settle (filament reaches steady temperature); do not exceed the lamp's rating / switch off between readings; check meter zero errors.",
    ],
    modelAnswer: "Connect the lamp in series with an ammeter to a supply through a rheostat used as a potential divider, with a voltmeter in parallel across the lamp. Increase V from zero in steps, recording at least eight pairs of V and I, then reverse the lamp's connections and repeat for negative values. Wait for each reading to settle before recording it, do not exceed the lamp's rated p.d., and check the meters for zero error.",
    explanation: "Ammeter in series, voltmeter in parallel, potential divider for control, reverse for negative V.",
    hints: ["How do you get p.d.s right down to zero?"],
  });

  // Practice structured: diode data and a protective resistor (12 marks)
  {
    const V = [0.46, 0.52, 0.58, 0.62, 0.66, 0.72];
    const I = [0.05, 0.4, 1.5, 4.2, 11, 46];
    const rows = V.map((v, i) => [dpStr(v, 2), String(I[i])]);
    const R055 = V[2] / (I[2] * 1e-3);
    const R070 = V[5] / (I[5] * 1e-3);
    const Vs = 5.0, Rp = 180, Vd = 0.72;
    const Ic = (Vs - Vd) / Rp;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka measures the forward-bias characteristic of a silicon diode:

${table([t`$V\,/\,\text{V}$`, t`$I\,/\,\text{mA}$`], rows)}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the resistance of the diode at 0.58 V, in Ω, to two significant figures.", value: R055, sf: 2, unit: "Ω", wrong: [V[2] / I[2]], explanation: t`$R = 0.58/(1.5 \times 10^{-3}) = ${sfStr(R055, 2)}\ \Omega$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the resistance of the diode at 0.72 V, in Ω, to two significant figures.", value: R070, sf: 2, unit: "Ω", wrong: [V[5] / I[5]], explanation: t`$R = 0.72/(46 \times 10^{-3}) = ${sfStr(R070, 2)}\ \Omega$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe how the resistance of the diode changes as the forward p.d. increases, and state what this means for the shape of the graph.", points: ["The resistance falls rapidly (by a large factor) as V rises above about 0.5 V.", "So the current rises ever more steeply: the I-V curve becomes almost vertical above the threshold."], modelAnswer: "The resistance falls very rapidly as V increases beyond about 0.5 V, so the current rises ever more steeply and the graph becomes nearly vertical." }),
        P.num({ label: "(d)", marks: 3, stem: t`The diode is connected in series with a $180\ \Omega$ resistor to a $5.0\ \text{V}$ supply of negligible internal resistance. Assuming the p.d. across the conducting diode is $0.72\ \text{V}$, calculate the current, in mA, to two significant figures.`, value: Ic * 1000, sf: 2, unit: "mA", wrong: [(Vs / Rp) * 1000], explanation: t`P.d. across the resistor $= 5.0 - 0.72 = 4.28\ \text{V}$; $I = 4.28/180 =${sciTex(Ic, 2)}\ \text{A} = ${sfStr(Ic * 1000, 2)}\ \text{mA}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the diode must not be connected directly to the 5.0 V supply.", points: ["Above the threshold the diode's resistance is very small, so the current would be very large.", "The large current would overheat and destroy the diode (or damage the supply): the series resistor limits the current."], modelAnswer: "Above about 0.7 V the diode's resistance becomes tiny, so with 5.0 V directly across it the current would be enormous and the diode would overheat and be destroyed. The series resistor limits the current." }),
        P.manual({ label: "(f)", marks: 1, stem: "State the effect on the current of reversing the diode in the circuit of (d).", points: ["The current falls to (almost) zero: the diode is reverse-biased."], modelAnswer: "Almost no current flows, because the diode is now reverse-biased." }),
      ],
      explanation: "R = V/I at each point; in a series circuit the diode and resistor share the supply p.d.",
      hints: ["Convert mA to A.", "The resistor takes the rest of the supply p.d."],
    });
  }
  // Practice structured: resistance of a resistor from repeated readings (8 marks)
  {
    const V = 4.60, dV = 0.05, Is = [0.218, 0.222, 0.220, 0.224, 0.216];
    const Im = Is.reduce((s, x) => s + x, 0) / Is.length;
    const dI = (Math.max(...Is) - Math.min(...Is)) / 2;
    const R = V / Im;
    const pct = pctUnc(dV, V) + pctUnc(dI, Im);
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Sipho measures the current in a resistor five times with the p.d. across it set at $(4.60 \pm 0.05)\ \text{V}$. His current readings are $${Is.map((x) => x.toFixed(3)).join("$, $")}\ \text{A}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the mean current, in A, to three significant figures.", value: Im, unit: "A", wrong: [Is[0]], explanation: t`Mean $= ${sfStr(Im, 3)}\ \text{A}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the resistance, in Ω, to three significant figures.", value: R, unit: "Ω", wrong: [Im / V], explanation: t`$R = 4.60/${sfStr(Im, 3)} = ${sfStr(R, 3)}\ \Omega$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Using half the range of the current readings, calculate the percentage uncertainty in R, to two significant figures.", value: pct, sf: 2, unit: "%", wrong: [pctUnc(dI, Im)], explanation: t`$\Delta I = (0.224 - 0.216)/2 = ${dpStr(dI, 3)}\ \text{A}$: $${sfStr(pctUnc(dI, Im), 2)}\%$. $\Delta V$: $${sfStr(pctUnc(dV, V), 2)}\%$. Total $${sfStr(pct, 2)}\%$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Suggest why the current readings vary, and how to test whether the resistor obeys Ohm's law.", points: ["The resistor warms when current flows (or contacts / supply fluctuate), changing the current slightly.", "Take readings for at least six different p.d.s (switching off between readings) and plot I against V.", "Ohmic if the graph is a straight line through the origin (within the uncertainty)."], modelAnswer: "The readings vary because the resistor warms slightly while current flows and the contacts and supply fluctuate. To test Ohm's law, measure I for at least six different values of V, switching off between readings so the temperature stays constant, and plot I against V: a straight line through the origin shows ohmic behaviour." }),
      ],
      explanation: "R = V/Ī; percentage uncertainties in V and I add.",
      hints: ["Half the range gives the uncertainty in the mean current."],
    });
  }

  b.card("DEFINITION", "**Resistance**", "The ratio of the p.d. across a component to the current in it: R = V/I.");
  b.card("DEFINITION", "**The ohm**", "The resistance through which 1 A flows when the p.d. is 1 V (1 Ω = 1 V A⁻¹).");
  b.card("DEFINITION", "**Ohm's law**", "Current in a conductor is directly proportional to the p.d. across it, provided temperature and other physical conditions stay constant.");
  b.card("CONCEPT", "I-V graph of a filament lamp", "Curve through the origin, symmetric, gradient decreasing as |V| rises: resistance increases as the filament heats.");
  b.card("CONCEPT", "I-V graph of a silicon diode", "Negligible current in reverse bias and below about 0.6 V; rises very steeply above 0.6-0.7 V in forward bias.");
  b.card("FACT", "LDR", "Resistance falls as light intensity rises (light frees more charge carriers).");
  b.card("FACT", "NTC thermistor", "Resistance falls as temperature rises (heating frees more charge carriers).");
  b.card("CONCEPT", "Resistance from an I-V graph", "Use V/I at the point, not the gradient (they agree only for an ohmic conductor).");
  b.card("CONCEPT", "Circuit to obtain a characteristic", "Ammeter in series, voltmeter across the component, potential divider to vary V from zero, reverse connections for negative V.");
});
