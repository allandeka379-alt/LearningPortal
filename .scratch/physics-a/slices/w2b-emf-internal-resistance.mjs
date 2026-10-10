// W2b: aphys.circuits.emf-internal-resistance — symbols, e.m.f., internal resistance, E = V + Ir, V-I graph, max power (ZIM ext.).
import { concept, P, t, ZIM, chk, sfStr, dpStr, sciTex, pctUnc, linFit, table } from "../lib.mjs";

concept("aphys.circuits.emf-internal-resistance", { file: "circuits/emf-internal-resistance", keyPrefix: "circuits.emf-internal-resistance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the electromotive force (e.m.f.) of a source?",
    options: [
      ["The energy transferred to electrical energy per unit charge in driving charge round a complete circuit", "Correct: e.m.f. is energy converted TO electrical energy per unit charge."],
      ["The energy transferred from electrical energy to other forms per unit charge passing through a component", "This defines potential difference across a component."],
      ["The force that pushes each electron round a complete circuit from the negative terminal", "E.m.f. is not a force; it is measured in J C⁻¹."],
      ["The power delivered by the source per unit current flowing in the circuit, including lost power", "E.m.f. can be written as P/I, but the definition is in terms of energy per unit charge."],
    ],
    answer: "A",
    explanation: "E.m.f. is the energy transferred from other forms (such as chemical) to electrical energy per unit charge in driving charge round a complete circuit.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In a circuit diagram, a rectangle with an arrow drawn diagonally through it represents which component?",
    options: [
      ["A variable resistor", "Correct: the arrow through the rectangle shows the resistance can be varied."],
      ["A light-dependent resistor", "An LDR has two arrows pointing towards the rectangle (light arriving)."],
      ["A thermistor", "A thermistor has a line through the rectangle with a short flat foot at one end."],
      ["A fuse", "A fuse is a rectangle with the line passing straight through its length."],
    ],
    answer: "A",
    explanation: "A variable resistor (rheostat) is drawn as a resistor rectangle with a diagonal arrow through it.",
  });
  {
    const E = 9.0, r = 1.5, R = 6.0;
    const I = E / (R + r), V = I * R;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`A battery of e.m.f. $9.0\ \text{V}$ and internal resistance $1.5\ \Omega$ is connected to a $6.0\ \Omega$ resistor. What is the p.d. across the resistor?`,
      options: [
        [`${sfStr(V, 2)} V`, "Correct: I = E/(R + r) = 1.2 A, V = IR."],
        ["9.0 V", "This ignores the lost volts across the internal resistance."],
        [`${sfStr(I * r, 2)} V`, "This is the lost volts, Ir, not the terminal p.d."],
        [`${sfStr(E - (E / R) * r, 2)} V`, "This uses I = E/R, ignoring r when finding the current."],
      ],
      answer: "A",
      explanation: t`$I = \dfrac{E}{R + r} = \dfrac{9.0}{7.5} = ${I}\ \text{A}$; $V = IR = ${I} \times 6.0 = ${sfStr(V, 2)}\ \text{V}$ (lost volts $= ${sfStr(I * r, 2)}\ \text{V}$).`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph of terminal p.d. V (y-axis) against current I (x-axis) is plotted for a battery as the external resistance is varied. Which pair correctly gives the e.m.f. and the internal resistance?",
    options: [
      ["E.m.f. = intercept on the V-axis; internal resistance = −gradient", "Correct: V = E − rI."],
      ["E.m.f. = −gradient; internal resistance = intercept on the V-axis", "The two quantities are swapped."],
      ["E.m.f. = intercept on the I-axis; internal resistance = gradient", "The I-intercept is E/r, the short-circuit current; the gradient is negative."],
      ["E.m.f. = intercept on the V-axis; internal resistance = 1/gradient", "The gradient itself is −r; 1/gradient would apply to a graph of I against V."],
    ],
    answer: "A",
    explanation: "V = E − rI has the form y = c + mx with c = E and m = −r.",
    hints: ["Rearrange E = V + Ir for V."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A high-resistance voltmeter connected across the terminals of a torch battery reads 3.0 V. When the torch is switched on, the reading falls to 2.6 V. What is the best explanation?",
    options: [
      ["Current now flows through the battery's internal resistance, so there are lost volts inside it.", "Correct: V = E − Ir, and I is no longer nearly zero."],
      ["The e.m.f. of the battery falls to 2.6 V as soon as a current is drawn.", "The e.m.f. is (approximately) unchanged; the terminal p.d. falls."],
      ["The bulb's resistance takes 0.4 V away from the battery's e.m.f. before it reaches the terminals.", "The p.d. across the bulb is the terminal p.d.; the 0.4 V is lost inside the battery."],
      ["The voltmeter now draws a larger current, which lowers its reading by 0.4 V.", "The voltmeter's current is negligible in both cases."],
    ],
    answer: "A",
    explanation: "With no load, I ≈ 0 so V ≈ E = 3.0 V. With the bulb on, a current flows, and Ir = 0.4 V is dissipated inside the battery, so V = E − Ir = 2.6 V.",
    hints: ["What is the current through the battery in each case?"],
  });
  {
    // two cells in series, one reversed
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`Two cells, each of e.m.f. $1.5\ \text{V}$ and internal resistance $0.50\ \Omega$, are connected in series but with one cell reversed. The combination is connected to a $2.0\ \Omega$ resistor. What is the current?`,
      options: [
        ["0 A", "Correct: the e.m.f.s oppose and cancel, so the net e.m.f. is zero."],
        [`${sfStr(3.0 / 3.0, 2)} A`, "This adds the e.m.f.s although one cell is reversed."],
        [`${sfStr(1.5 / 2.5, 2)} A`, "This uses one cell's e.m.f. alone."],
        [`${sfStr(3.0 / 2.0, 2)} A`, "This adds the e.m.f.s and also ignores the internal resistances."],
      ],
      answer: "A",
      explanation: "Reversing a cell subtracts its e.m.f.: net e.m.f. = 1.5 − 1.5 = 0, so no current flows (the internal resistances still add, to 1.0 Ω, but there is nothing to drive current).",
      hints: ["What is the net e.m.f. when one cell is reversed?"],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`A cell has an e.m.f. of $2.0\ \text{V}$. When it delivers a current of $0.40\ \text{A}$, its terminal p.d. is $1.7\ \text{V}$. Calculate its internal resistance, in Ω, to two significant figures.`,
    value: (2.0 - 1.7) / 0.4, sf: 2, unit: "Ω", wrong: [1.7 / 0.4, 2.0 / 0.4],
    explanation: t`Lost volts $= 2.0 - 1.7 = 0.3\ \text{V}$; $r = \dfrac{0.3}{0.40} = ${sfStr((2.0 - 1.7) / 0.4, 2)}\ \Omega$.`,
  });
  {
    const E = 6.0, r = 0.5, R = 3.5;
    const I = E / (R + r);
    const Pin = E * I, Pout = I * I * R;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A battery of e.m.f. $6.0\ \text{V}$ and internal resistance $0.50\ \Omega$ supplies a $3.5\ \Omega$ lamp. Calculate the percentage of the energy supplied by the battery that is delivered to the lamp, to three significant figures.`,
      value: (Pout / Pin) * 100, unit: "%", wrong: [(r / (R + r)) * 100],
      explanation: t`1. $I = \dfrac{6.0}{3.5 + 0.50} = ${I}\ \text{A}$.
2. Power from the battery $= EI = 6.0 \times ${I} = ${Pin}\ \text{W}$.
3. Power to the lamp $= I^2R = ${I}^2 \times 3.5 = ${sfStr(Pout, 4)}\ \text{W}$.
4. Percentage $= \dfrac{${sfStr(Pout, 4)}}{${Pin}} \times 100 = ${sfStr((Pout / Pin) * 100, 3)}\%$ (equal to $R/(R + r)$). The rest is dissipated inside the battery.`,
      hints: ["Power supplied = EI; power to the load = I²R."],
    });
  }
  {
    const V1 = 1.42, I1 = 0.25, V2 = 1.18, I2 = 0.65;
    const r = (V1 - V2) / (I2 - I1);
    const E = V1 + I1 * r;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`When a cell delivers $0.25\ \text{A}$ its terminal p.d. is $1.42\ \text{V}$; when it delivers $0.65\ \text{A}$ its terminal p.d. is $1.18\ \text{V}$. Calculate its e.m.f., in V, to three significant figures.`,
      value: E, unit: "V", wrong: [V1, V1 + V2],
      explanation: t`1. $E = 1.42 + 0.25r$ and $E = 1.18 + 0.65r$.
2. Subtracting: $0.24 = 0.40r$, so $r = ${sfStr(r, 2)}\ \Omega$.
3. $E = 1.42 + 0.25 \times ${sfStr(r, 2)} = ${sfStr(E, 3)}\ \text{V}$.`,
      hints: ["Write E = V + Ir for both readings.", "Solve the simultaneous equations."],
    });
  }
  {
    const E = 12.4, r = 0.015, Imotor = 180, Rlamp = 2.4;
    // motor draws 180 A; lamps in parallel draw a small extra current (ignore their effect on lost volts? include it)
    const Vterm = E - Imotor * r;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A haulage truck's battery has e.m.f. $12.4\ \text{V}$ and internal resistance $0.015\ \Omega$. Its headlamps have a combined resistance of $2.4\ \Omega$. Calculate the power of the headlamps while the starter motor draws $180\ \text{A}$ (neglect the lamps' own small current when finding the lost volts), in W, to three significant figures.`,
      value: (Vterm * Vterm) / Rlamp, unit: "W", wrong: [(E * E) / Rlamp, (Imotor * r) ** 2 / Rlamp],
      explanation: t`1. Lost volts $= Ir = 180 \times 0.015 = ${sfStr(Imotor * r, 2)}\ \text{V}$.
2. Terminal p.d. $= 12.4 - ${sfStr(Imotor * r, 2)} = ${sfStr(Vterm, 3)}\ \text{V}$.
3. Lamp power $= V^2/R = ${sfStr(Vterm, 3)}^2/2.4 = ${sfStr((Vterm * Vterm) / Rlamp, 3)}\ \text{W}$, compared with $${sfStr((E * E) / Rlamp, 3)}\ \text{W}$ normally, so the lamps dim.`,
      hints: ["Find the terminal p.d. first.", "The lamps are across the terminals: P = V²/R."],
    });
  }
  {
    const E = 4.5, r = 1.8;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true, applies: ZIM,
      stem: t`A source has e.m.f. $4.5\ \text{V}$ and internal resistance $1.8\ \Omega$. Calculate the maximum power it can deliver to an external resistor, in W, to three significant figures.`,
      value: (E * E) / (4 * r), unit: "W", wrong: [(E * E) / r, (E * E) / (2 * r)],
      explanation: t`Maximum power transfer occurs when $R = r = 1.8\ \Omega$: $I = 4.5/3.6 = ${E / (2 * r)}\ \text{A}$, $P = I^2R = ${sfStr((E * E) / (4 * r), 3)}\ \text{W}$ $(= E^2/4r)$. Using $E^2/r$ forgets that half the e.m.f. is lost inside the source.`,
      hints: ["The load resistance for maximum power equals r."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The terminal p.d. of a battery is always equal to its e.m.f.",
    answer: false,
    explanation: "False. The terminal p.d. equals the e.m.f. only when no current flows (or r is negligible). When a current I flows, V = E − Ir.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each circuit symbol description with its component.",
    pairs: [
      ["a circle containing a cross", "filament lamp"],
      ["a triangle pointing at a short bar across the line", "semiconductor diode"],
      ["a rectangle with two arrows pointing towards it", "light-dependent resistor"],
      ["two parallel lines of equal length across a gap", "capacitor"],
      ["a long thin line beside a short thick line", "cell"],
    ],
    explanation: "Lamp: circle with a cross. Diode: triangle and bar. LDR: rectangle with incoming arrows. Capacitor: two equal parallel plates. Cell: long (positive) and short (negative) lines.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the energy description.",
    template: "In a source, energy is transferred {{blank:a}} electrical energy, measured by the e.m.f. In a resistor, energy is transferred {{blank:b}} electrical energy, measured by the p.d. Both are measured in joules per {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["to"], choices: ["to", "from"] },
      { id: "b", accepted: ["from"], choices: ["to", "from"] },
      { id: "c", accepted: ["coulomb"], choices: ["coulomb", "ampere", "second"] },
    ],
    explanation: "E.m.f.: other forms → electrical. P.d.: electrical → other forms. Unit J C⁻¹ = V.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "What name is given to the quantity Ir, the difference between the e.m.f. and the terminal p.d.?",
    accepted: ["lost volts", "lost voltage", "the lost volts", "lost p.d."],
    explanation: "The **lost volts**: the energy per unit charge dissipated inside the source.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between e.m.f. and potential difference in terms of energy transfer.",
    points: [
      "E.m.f.: energy transferred from other forms (e.g. chemical) to electrical energy per unit charge (in a source).",
      "P.d.: energy transferred from electrical energy to other forms per unit charge (in a component / between two points).",
    ],
    modelAnswer: "E.m.f. is the energy converted from other forms into electrical energy per unit charge in a source; p.d. is the electrical energy converted into other forms per unit charge as charge passes between two points such as across a resistor.",
    explanation: "The direction of the energy transfer is the key difference.",
    hints: ["Which way is energy transferred in each case?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the terminal p.d. of a car battery falls when the starter motor is operated, and why a car battery must have a very low internal resistance.",
    points: [
      "The starter motor draws a very large current.",
      "Lost volts Ir increase, so the terminal p.d. V = E − Ir falls.",
      "With a large r, the lost volts would be so big that too little p.d. (power) reached the motor, and the battery would overheat (I²r); low r keeps V high.",
    ],
    modelAnswer: "The starter motor draws a current of well over 100 A, so the lost volts Ir across the internal resistance are large and the terminal p.d. V = E − Ir drops. If r were not tiny, most of the e.m.f. would be lost inside the battery, the motor would receive too little p.d. and power, and the battery would heat up through I²r.",
    explanation: "Large I means large lost volts.",
    hints: ["Use V = E − Ir."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Describe an experiment to determine the e.m.f. and internal resistance of a battery by a graphical method.",
    points: [
      "Battery connected in series with an ammeter, a rheostat (and a protective resistor); voltmeter across the battery terminals.",
      "Vary the rheostat to obtain at least six pairs of terminal p.d. V and current I.",
      "Plot V against I and draw the best-fit straight line.",
      "E = intercept on the V-axis; r = −gradient. (Switch off between readings so the battery does not warm or run down.)",
    ],
    modelAnswer: "Connect the battery in series with an ammeter, a rheostat and a small protective resistor, with a high-resistance voltmeter across the battery's terminals. Adjust the rheostat to give at least six different currents, recording V and I each time, switching off between readings. Plot V against I: the line V = E − rI has intercept E on the V-axis and gradient −r.",
    explanation: "V = E − rI is a straight line.",
    hints: ["What straight-line equation links V and I?"],
  });

  // Practice structured: E and r of a solar cell module (12 marks)
  {
    const I = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65];
    const Etrue = 6.2, rtrue = 2.6;
    const nz = [0.03, -0.04, 0.02, 0.05, -0.03, 0.01];
    const V = I.map((x, i) => Math.round((Etrue - rtrue * x + nz[i]) * 100) / 100);
    const fit = linFit(I, V);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda connects a battery pack to a rheostat and an ammeter, with a voltmeter across the terminals of the pack, and records:

${table([t`$I\,/\,\text{A}$`, t`$V\,/\,\text{V}$`], I.map((x, i) => [dpStr(x, 2), dpStr(V[i], 2)]))}`,
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Show that V = E − rI is the equation of a straight line and state what is plotted.", points: ["Plot V (y) against I (x): y = c + mx with c = E and m = −r."], modelAnswer: "Plotting V on the y-axis against I on the x-axis gives a straight line of the form y = mx + c, with gradient −r and intercept E." }),
        P.num({ label: "(b)", marks: 3, stem: "Determine the e.m.f. from your best-fit line, in V.", value: fit.c, tol: 0.08, unit: "V", wrong: [V[0]], explanation: t`Intercept on the $V$-axis $\approx ${dpStr(fit.c, 2)}\ \text{V}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Determine the internal resistance from the gradient, in Ω.", value: -fit.m, tol: 0.2, unit: "Ω", wrong: [fit.m, -1 / fit.m], explanation: t`Gradient $\approx ${dpStr(fit.m, 2)}\ \text{V A}^{-1}$, so $r \approx ${dpStr(-fit.m, 2)}\ \Omega$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Use your values to predict the current when the terminals are short-circuited (R = 0), in A.", value: fit.c / -fit.m, tol: 0.15, unit: "A", wrong: [fit.c], explanation: t`$I = E/r \approx ${dpStr(fit.c, 2)}/${dpStr(-fit.m, 2)} = ${dpStr(fit.c / -fit.m, 2)}\ \text{A}$ (the $I$-intercept).` }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest why the readings do not lie exactly on a straight line, and give two precautions.", points: ["The e.m.f. or internal resistance may change as the cells warm or discharge (or meter reading errors / contact resistance).", "Switch off between readings so the cells do not heat or run down.", "Include a protective resistor so the current never becomes large; take readings quickly; check meter zero errors."], modelAnswer: "The cells' e.m.f. and internal resistance drift as they warm and discharge, and the meters have reading uncertainties. Switch off between readings, keep a protective resistor in series so the current stays small, and check the meters for zero errors." }),
      ],
      explanation: "V = E − rI: intercept E, gradient −r; short-circuit current E/r.",
      hints: ["The intercept on the V-axis is E.", "Use a large triangle for the gradient."],
    });
  }
  // Practice structured: maximum power transfer (ZIMSEC extension, 8 marks)
  {
    const E = 3.2, r = 1.5;
    const Rs = [0.75, 1.5, 3.0];
    const Pr = (R) => (E * E * R) / (R + r) ** 2;
    const sub = (R) => t`$P = \dfrac{3.2^2 \times ${R}}{(${R} + 1.5)^2} = ${sfStr(Pr(R), 3)}\ \text{W}$.`;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true, applies: ZIM,
      stem: t`A cell of e.m.f. $3.2\ \text{V}$ and internal resistance $1.5\ \Omega$ is connected to a variable resistor $R$.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Show that the power delivered to R is P = E²R/(R + r)².", points: ["I = E/(R + r).", "P = I²R = E²R/(R + r)²."], modelAnswer: "The current is I = E/(R + r), so the power in R is P = I²R = E²R/(R + r)²." }),
        P.group({ label: "(b)", stem: "Calculate P, in W, to three significant figures, for:", parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$R = 0.75\ \Omega$`, value: Pr(Rs[0]), unit: "W", wrong: [(E * E) / Rs[0]], explanation: sub("0.75") }),
          P.num({ label: "(ii)", marks: 1, stem: t`$R = 1.5\ \Omega$`, value: Pr(Rs[1]), unit: "W", wrong: [(E * E) / Rs[1]], explanation: sub("1.5") }),
          P.num({ label: "(iii)", marks: 1, stem: t`$R = 3.0\ \Omega$`, value: Pr(Rs[2]), unit: "W", wrong: [(E * E) / Rs[2]], explanation: sub("3.0") }),
        ] }),
        P.manual({ label: "(c)", marks: 1, stem: "State the condition for maximum power transfer suggested by your results.", points: ["Load resistance equal to the internal resistance (R = r = 1.5 Ω)."], modelAnswer: "Maximum power is delivered when R equals r, 1.5 Ω (the powers at 0.75 Ω and 3.0 Ω are equal and smaller)." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why a power station is not designed to operate at maximum power transfer.", points: ["At maximum power transfer only half the energy reaches the load (efficiency 50%); the other half is wasted in the source.", "Supplies are designed for high efficiency, with load resistance much greater than internal resistance."], modelAnswer: "At R = r half of the energy supplied is dissipated in the source itself, so the efficiency is only 50%. Supplies are designed so the load resistance is much larger than the internal resistance, giving high efficiency." }),
      ],
      explanation: "P = E²R/(R + r)², a maximum when R = r.",
      hints: ["I = E/(R + r)."],
    });
    chk(Pr(1.5), (E * E) / (4 * r));
  }

  b.card("DEFINITION", "**Electromotive force (e.m.f.)**", "Energy transferred from other forms to electrical energy per unit charge in driving charge round a complete circuit.");
  b.card("DEFINITION", "**Internal resistance**", "The resistance of the materials inside a source, causing energy to be dissipated within the source when it supplies current.");
  b.card("FORMULA", "E.m.f., terminal p.d. and internal resistance", t`$E = V + Ir = I(R + r)$`);
  b.card("CONCEPT", "Lost volts", "Ir: the energy per unit charge dissipated inside the source; grows with current, so the terminal p.d. falls.");
  b.card("CONCEPT", "E and r from a graph", "Plot V against I: intercept on the V-axis = E; gradient = −r.");
  b.card("CONCEPT", "E.m.f. versus p.d.", "E.m.f.: other forms → electrical (source). P.d.: electrical → other forms (component). Both J C⁻¹.");
  b.card("FACT", "Symbol: thermistor", "A resistor rectangle with a line through it ending in a short flat foot.");
  b.card("FACT", "Symbol: light-dependent resistor", "A resistor rectangle with two arrows pointing towards it.");
  b.card("FORMULA", "Maximum power transfer (extension)", t`When $R = r$: $P_{\max} = \dfrac{E^2}{4r}$, at 50% efficiency.`, undefined, { applies: ZIM });
});
