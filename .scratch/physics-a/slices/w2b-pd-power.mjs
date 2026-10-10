// W2b: aphys.electricity.pd-power — p.d. as energy per unit charge, the volt, P = VI = I²R = V²/R, W = VIt, kW h, cost.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc } from "../lib.mjs";

concept("aphys.electricity.pd-power", { file: "electricity/pd-power", keyPrefix: "electricity.pd-power" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement defines the potential difference between two points in a circuit?",
    options: [
      ["The energy transferred to other forms per unit charge passing between them", "Correct: V = W/Q."],
      ["The energy transferred to other forms per unit time between the two points", "Energy per unit time is power."],
      ["The charge that flows per unit time between the points", "Charge per unit time is current."],
      ["The force acting on each unit of charge placed between the two points", "Force per unit charge is electric field strength."],
    ],
    answer: "A",
    explanation: "The p.d. is the energy transferred from electrical to other forms per unit charge passing between the two points: V = W/Q.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the volt expressed in SI base units?",
    options: [
      [t`$\text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}$`, "Correct: J C⁻¹ = kg m² s⁻² ÷ (A s)."],
      [t`$\text{kg m}^2\,\text{s}^{-2}\,\text{A}^{-1}$`, "This divides the joule by the ampere only; a coulomb is A s."],
      [t`$\text{kg m}^2\,\text{s}^{-3}\,\text{A}$`, "The ampere should be in the denominator: V = P/I."],
      [t`$\text{kg m s}^{-2}\,\text{A}^{-1}\,\text{s}^{-1}$`, "This uses the newton instead of the joule (a metre is missing)."],
    ],
    answer: "A",
    explanation: t`$\text{V} = \text{J C}^{-1} = \dfrac{\text{kg m}^2\,\text{s}^{-2}}{\text{A s}} = \text{kg m}^2\,\text{s}^{-3}\,\text{A}^{-1}$. Equivalently $\text{V} = \text{W A}^{-1}$.`,
  });
  {
    // two resistors in parallel: P ratio = R2/R1
    b.mcq({
      d: 3, skill: "APPLICATION", daily: true,
      stem: t`Resistors of $4.0\ \Omega$ and $12\ \Omega$ are connected in parallel across a battery. What is the ratio $\dfrac{\text{power in the } 4.0\ \Omega \text{ resistor}}{\text{power in the } 12\ \Omega \text{ resistor}}$?`,
      options: [
        ["3", "Correct: same V, so P = V²/R and P ∝ 1/R."],
        [t`$\tfrac{1}{3}$`, "This uses P = I²R with equal currents, but parallel resistors have equal p.d., not equal current."],
        ["9", "The ratio of resistances is not squared: P ∝ 1/R at fixed V."],
        ["1", "The p.d. is the same, but the powers are not."],
      ],
      answer: "A",
      explanation: t`In parallel both have the same p.d. $V$. $P = V^2/R$, so $\dfrac{P_4}{P_{12}} = \dfrac{12}{4.0} = 3$: the smaller resistor dissipates more power.`,
      hints: ["What is the same for resistors in parallel?"],
    });
  }
  {
    const R = 230 * 230 / 1500;
    const Pnew = 200 * 200 / R;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A heater of constant resistance is rated $1500\ \text{W}$ at $230\ \text{V}$. During a period of low mains voltage the supply falls to $200\ \text{V}$. What is the power of the heater now?`,
      options: [
        [`${sfStr(Pnew, 3)} W`, "Correct: P = V²/R with R unchanged, so P ∝ V²."],
        [`${sfStr(1500 * 200 / 230, 3)} W`, "This assumes P ∝ V; with constant R, P ∝ V²."],
        ["1500 W", "The rated power applies only at the rated voltage."],
        [`${sfStr(1500 * (230 / 200) ** 2, 3)} W`, "This inverts the ratio; the power must fall when the voltage falls."],
      ],
      answer: "A",
      explanation: t`$R = \dfrac{230^2}{1500} = ${sfStr(R, 3)}\ \Omega$. $P = \dfrac{200^2}{${sfStr(R, 3)}} = ${sfStr(Pnew, 3)}\ \text{W}$, i.e. $1500 \times (200/230)^2$.`,
      hints: ["Find the resistance from the rating.", "P = V²/R."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two lamps, P and Q, are connected in series to a battery. The resistance of P is twice that of Q. Which statement is correct?",
    options: [
      ["P dissipates twice the power of Q.", "Correct: same current, so P = I²R ∝ R."],
      ["Q dissipates twice the power of P.", "That would be true in parallel (same V), not in series."],
      ["P and Q dissipate equal power because they share the same current.", "Equal current does not mean equal power when the resistances differ."],
      ["P dissipates four times the power of Q.", "Power is proportional to R at fixed current, not to R²."],
    ],
    answer: "A",
    explanation: "In series the current is the same in both lamps. P = I²R, so the lamp with twice the resistance dissipates twice the power.",
  });
  {
    const W = 5.4e3, Q = 450;
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`When $450\ \text{C}$ of charge passes through a motor, $5.4\ \text{kJ}$ of energy is transferred. What is the p.d. across the motor?`,
      options: [
        [`${W / Q} V`, "Correct: V = W/Q."],
        [t`$${sciTex(W * Q)}\ \text{V}$`,"This multiplies energy and charge instead of dividing."],
        [`${sfStr(Q / W, 3)} V`, "This divides charge by energy (inverted)."],
        [`${sfStr(5.4 / Q, 3)} V`, "This forgets to convert kJ to J."],
      ],
      answer: "A",
      explanation: t`$V = \dfrac{W}{Q} = \dfrac{5400}{450} = ${W / Q}\ \text{V}$.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`An immersion heater has a resistance of $20\ \Omega$ and carries a current of $11\ \text{A}$. Calculate its power, in W.`,
    value: 11 * 11 * 20, unit: "W", wrong: [11 * 20, 20 * 20 / 11],
    explanation: t`$P = I^2R = 11^2 \times 20 = ${11 * 11 * 20}\ \text{W}$. Using $P = IR$ forgets the square.`,
  });
  {
    const P1 = 9.0, V = 6.0;
    b.num({
      d: 2, skill: "APPLICATION",
      stem: t`A car's interior lamp is rated $6.0\ \text{V}$, $9.0\ \text{W}$ (the lamp runs from a low-voltage supply). Calculate its resistance at its working temperature, in Ω.`,
      value: (V * V) / P1, unit: "Ω", wrong: [P1 / (V * V), V / P1],
      explanation: t`$R = \dfrac{V^2}{P} = \dfrac{6.0^2}{9.0} = ${(V * V) / P1}\ \Omega$.`,
    });
  }
  {
    const kW = 1.2, h = 3.5, days = 31, price = 0.14;
    const E = kW * h * days;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $1.2\ \text{kW}$ borehole pump runs for $3.5$ hours every day for 31 days. Electricity costs US\$0.14 per kW h (illustrative). Calculate the cost of running the pump for the month, in US dollars, to two decimal places.`,
      value: E * price, dp: 2, wrong: [kW * 1000 * h * days * price, kW * h * price],
      explanation: t`1. Energy $= 1.2\ \text{kW} \times 3.5\ \text{h} \times 31 = ${sfStr(E, 4)}\ \text{kW h}$.
2. Cost $= ${sfStr(E, 4)} \times 0.14 =$ US\$${dpStr(E * price, 2)}.
3. Using 1200 (watts) instead of 1.2 kW gives a cost 1000 times too large.`,
      hints: ["Energy in kW h = power in kW × time in hours."],
    });
  }
  {
    const P = 60, tt = 8 * 3600;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A $60\ \text{W}$ television is left on for 8.0 hours. Calculate the energy transferred, in MJ, to three significant figures.`,
      value: (P * tt) / 1e6, unit: "MJ", wrong: [P * 8 / 1e6, (P * tt) / 1e3],
      explanation: t`$W = Pt = 60 \times (8.0 \times 3600) = ${sciTex(P * tt)}\ \text{J} = ${sfStr((P * tt) / 1e6, 3)}\ \text{MJ}$ (that is $0.48\ \text{kW h}$).`,
    });
  }
  {
    const L = 2 * 45, Rpm = 0.0072, I = 18, V = 230;
    const Rc = L * Rpm;
    const Ploss = I * I * Rc;
    const Vapp = V - I * Rc;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A workshop $45\ \text{m}$ from a house is supplied through a two-core cable; each core has a resistance of $0.0072\ \Omega$ per metre. A $230\ \text{V}$ supply at the house drives a current of $18\ \text{A}$ to a maize mill motor. Calculate the p.d. across the motor, in V, to three significant figures.`,
      value: Vapp, unit: "V", wrong: [V - I * 45 * Rpm, V - I * I * Rc],
      explanation: t`1. The current travels out and back: cable length $= 2 \times 45 = ${L}\ \text{m}$; $R_{\text{cable}} = ${L} \times 0.0072 = ${sfStr(Rc, 3)}\ \Omega$.
2. P.d. lost in the cable $= IR = 18 \times ${sfStr(Rc, 3)} = ${sfStr(I * Rc, 3)}\ \text{V}$.
3. P.d. across the motor $= 230 - ${sfStr(I * Rc, 3)} = ${sfStr(Vapp, 3)}\ \text{V}$.
4. The cable also wastes $I^2R = ${sfStr(Ploss, 3)}\ \text{W}$. Using only one core (45 m) halves the loss wrongly.`,
      hints: ["Both cores carry the current: double the length.", "Lost volts = I × R of the cable."],
    });
  }
  {
    const m = 1.5, c = 4200, dT = 70, Pw = 2400, eff = 0.9;
    const tt = (m * c * dT) / (Pw * eff);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`An urn heats $1.5\ \text{kg}$ of water (specific heat capacity $4200\ \text{J kg}^{-1}\,\text{K}^{-1}$) from $25\ ^\circ\text{C}$ to $95\ ^\circ\text{C}$. Its element is rated $2.4\ \text{kW}$ and 90% of the electrical energy goes into the water. Calculate the heating time, in s, to three significant figures.`,
      value: tt, unit: "s", wrong: [(m * c * dT) / Pw, (m * c * dT * eff) / Pw],
      explanation: t`1. Energy needed by the water $= mc\Delta\theta = 1.5 \times 4200 \times 70 = ${sciTex(m * c * dT)}\ \text{J}$.
2. Useful power $= 0.90 \times 2400 = ${Pw * eff}\ \text{W}$.
3. $t = \dfrac{${sciTex(m * c * dT)}}{${Pw * eff}} = ${sfStr(tt, 3)}\ \text{s}$ (about ${sfStr(tt / 60, 2)} minutes).
4. Ignoring the efficiency gives too short a time.`,
      hints: ["Energy = mcΔθ.", "Only 90% of the power heats the water."],
    });
  }
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "One kilowatt-hour is equal to 3.6 × 10⁶ J.",
    answer: true,
    explanation: t`True: $1000\ \text{W} \times 3600\ \text{s} = 3.6 \times 10^{6}\ \text{J}$.`,
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with an equivalent unit.",
    pairs: [
      ["potential difference", t`$\text{J C}^{-1}$`],
      ["power", t`$\text{J s}^{-1}$`],
      ["charge", "A s"],
      ["electrical energy", "kW h"],
    ],
    explanation: "V = J C⁻¹; W = J s⁻¹; C = A s; the kW h is a unit of energy.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the derivation of the power equations.",
    template: "Energy transferred W = VQ and Q = It, so W = VIt and P = W/t = {{blank:a}}. Substituting V = IR gives P = {{blank:b}}, and substituting I = V/R gives P = {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["VI"], choices: ["VI", "V/I", "VQ"] },
      { id: "b", accepted: ["I²R"], choices: ["I²R", "IR²", "I/R"] },
      { id: "c", accepted: ["V²/R"], choices: ["V²/R", "VR²", "R/V²"] },
    ],
    explanation: "P = VI = I²R = V²/R.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the unit equal to one joule per coulomb.",
    accepted: ["volt", "volts", "V"],
    explanation: "The **volt**: 1 V = 1 J C⁻¹.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why electrical energy is transmitted over long distances at a high voltage rather than at a low voltage.",
    points: [
      "For a given power P = VI, a higher voltage means a smaller current.",
      "Power lost as heat in the cables is I²R.",
      "So a smaller current greatly reduces the energy wasted (the loss falls with the square of the current); thinner, cheaper cables can be used.",
    ],
    modelAnswer: "To deliver a given power P = VI, a higher voltage needs a smaller current. The power wasted in the line is I²R, which depends on the square of the current, so the losses are much smaller at high voltage, and lighter, cheaper conductors can be used.",
    explanation: "P = VI fixes the current for a given power; losses are I²R.",
    hints: ["Which formula gives the power lost in the cables?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: t`Show that the power dissipated in a resistor of resistance $R$ with p.d. $V$ across it is $V^2/R$, starting from the definition of potential difference.`,
    points: [
      t`$V = W/Q$, so energy $W = VQ$; with $Q = It$, $W = VIt$.`,
      t`Power $P = W/t = VI$.`,
      t`$R = V/I$ gives $I = V/R$, so $P = V \times V/R = V^2/R$.`,
    ],
    modelAnswer: t`From the definition, $W = VQ = VIt$, so $P = W/t = VI$. Since $I = V/R$, $P = V^2/R$.`,
    explanation: "Combine V = W/Q, Q = It and R = V/I.",
    hints: ["Start from W = VQ."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Rudo says: 'A 100 W lamp is always brighter than a 60 W lamp.' The two filament lamps, both rated for 230 V, are connected in series across a 230 V supply. Explain which lamp is brighter and comment on her statement.",
    points: [
      "Using R = V²/P at the rated values, the 60 W lamp has the larger resistance.",
      "In series the current is the same in both lamps.",
      "P = I²R, so the 60 W lamp (larger R) dissipates more power and is brighter.",
      "So her statement is only true when each lamp works at its rated p.d. (e.g. in parallel); ratings apply at the rated voltage.",
    ],
    modelAnswer: "From R = V²/P, the 60 W lamp has the higher resistance. In series both lamps carry the same current, and P = I²R, so the 60 W lamp dissipates more power and glows brighter. Rudo is right only when each lamp has its rated 230 V across it, as in parallel. (The filament resistances change with temperature, but the 60 W lamp still has the larger resistance.)",
    explanation: "Series: same I, so the larger R gives the larger I²R.",
    hints: ["Which lamp has the larger resistance?", "What is common to lamps in series?"],
  });

  // Practice structured: a solar geyser backup element (12 marks)
  {
    const V = 230, Pw = 3000, h = 1.8, days = 30, price = 0.11;
    const I = Pw / V, R = (V * V) / Pw;
    const kWh = (Pw / 1000) * h * days;
    const Vlow = 210, Plow = (Vlow * Vlow) / R;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The backup heating element of a solar geyser in Masvingo is rated $3.0\ \text{kW}$ at $230\ \text{V}$. Assume its resistance is constant.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the current in the element, in A, to three significant figures.", value: I, unit: "A", wrong: [V / Pw], explanation: t`$I = P/V = 3000/230 = ${sfStr(I, 3)}\ \text{A}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the resistance of the element, in Ω, to three significant figures.", value: R, unit: "Ω", wrong: [Pw / (V * V)], explanation: t`$R = V^2/P = 230^2/3000 = ${sfStr(R, 3)}\ \Omega$.` }),
        P.num({ label: "(c)", marks: 2, stem: "The element runs for an average of 1.8 hours a day for 30 days. Calculate the energy used, in kW h.", value: kWh, unit: "kW h", wrong: [kWh * 3.6e6], explanation: t`$3.0 \times 1.8 \times 30 = ${sfStr(kWh, 3)}\ \text{kW h}$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`At US\$0.11 per kW h (illustrative), calculate the cost, in US dollars, to two decimal places.`, value: kWh * price, dp: 2, wrong: [kWh], explanation: t`$${sfStr(kWh, 3)} \times 0.11 =$ US\$${dpStr(kWh * price, 2)}.` }),
        P.num({ label: "(e)", marks: 2, stem: "The mains p.d. falls to 210 V. Calculate the power of the element now, in W, to three significant figures.", value: Plow, unit: "W", wrong: [Pw * Vlow / V], explanation: t`$P = V^2/R = 210^2/${sfStr(R, 3)} = ${sfStr(Plow, 3)}\ \text{W}$.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain why using the solar collector for most of the heating saves money, and why the element needs a thick cable.", points: ["Solar heating uses free energy from the Sun, so fewer kW h are bought from the supply.", t`The element draws about $${sfStr(I, 2)}\ \text{A}$, a large current.`, "A thick cable has low resistance, so the I²R heating (and voltage drop) in it is small and it does not overheat."], modelAnswer: "The Sun supplies most of the energy free of charge, so far fewer kilowatt-hours are bought. The element draws a current of about 13 A, so its cable must be thick (low resistance) to keep the I²R heating in the cable, and the voltage lost along it, small enough that it does not overheat." }),
      ],
      explanation: "I = P/V, R = V²/P, energy in kW h = kW × h, power at a new p.d. from V²/R.",
      hints: ["The rating gives P and V.", "kW h = kW × hours."],
    });
  }
  // Practice structured: measuring the power of a lamp with uncertainties (8 marks)
  {
    const V = 5.80, dV = 0.05, I = 0.430, dI = 0.005;
    const Pw = V * I;
    const pct = pctUnc(dV, V) + pctUnc(dI, I);
    const absP = (pct / 100) * Pw;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Farai measures the p.d. across a small lamp as $(5.80 \pm 0.05)\ \text{V}$ and the current through it as $(0.430 \pm 0.005)\ \text{A}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the power of the lamp, in W, to three significant figures.", value: Pw, unit: "W", wrong: [V / I], explanation: t`$P = VI = 5.80 \times 0.430 = ${sfStr(Pw, 3)}\ \text{W}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage uncertainty in the power, to two significant figures.", value: pct, sf: 2, unit: "%", wrong: [pctUnc(dV, V) * pctUnc(dI, I)], explanation: t`$\dfrac{0.05}{5.80} \times 100 + \dfrac{0.005}{0.430} \times 100 = ${sfStr(pctUnc(dV, V), 2)} + ${sfStr(pctUnc(dI, I), 2)} = ${sfStr(pct, 2)}\%$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the absolute uncertainty in the power, in W, to one significant figure.", value: absP, sf: 1, unit: "W", wrong: [dV * dI], explanation: t`$${sfStr(pct, 2)}\% \text{ of } ${sfStr(Pw, 3)} = ${sfStr(absP, 1)}\ \text{W}$, so $P = (${dpStr(Pw, 2)} \pm ${sfStr(absP, 1)})\ \text{W}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe the circuit used, in words.", points: ["Lamp in series with the supply (via a variable resistor) and an ammeter.", "Voltmeter connected in parallel across the lamp only."], modelAnswer: "The lamp is connected to a d.c. supply in series with an ammeter (and a variable resistor to set the current); a voltmeter is connected in parallel directly across the lamp." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the power calculated from the rated values on the lamp's cap may differ from this measured value.", points: ["The measured p.d. may differ from the rated p.d.", "The filament resistance depends on temperature, so the power does not scale simply (and manufacturing tolerances exist)."], modelAnswer: "The lamp may not be working at exactly its rated p.d., and because the filament's resistance changes with temperature the power is not a simple fraction of the rated value; manufacturing tolerances also affect it." }),
      ],
      explanation: "P = VI; percentage uncertainties add for a product.",
      hints: ["For a product, add the percentage uncertainties."],
    });
  }

  b.card("DEFINITION", "**Potential difference**", "The energy transferred from electrical to other forms per unit charge passing between two points: V = W/Q.");
  b.card("DEFINITION", "**The volt**", "One joule per coulomb (1 V = 1 J C⁻¹ = 1 kg m² s⁻³ A⁻¹).");
  b.card("FORMULA", "Electrical power (three forms)", t`$P = VI = I^2R = \dfrac{V^2}{R}$`);
  b.card("FORMULA", "Electrical energy", t`$W = VIt = Pt$`);
  b.card("FACT", "1 kW h in joules", t`$3.6 \times 10^{6}\ \text{J}$`);
  b.card("CONCEPT", "Comparing power in series", "Same current, so P = I²R: the larger resistance dissipates more power.");
  b.card("CONCEPT", "Comparing power in parallel", "Same p.d., so P = V²/R: the smaller resistance dissipates more power.");
  b.card("CONCEPT", "Why transmit at high voltage", "Same power with a smaller current, so I²R losses in the lines are much smaller.");
  b.card("FORMULA", "Cost of electrical energy", "cost = power (kW) × time (h) × price per kW h");
});
