// W2b: aphys.circuits.potential-dividers — V_out = V_in R2/(R1 + R2), potentiometer, LDR/thermistor sensors, loading, design.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, potentialDivider, parallelR, table } from "../lib.mjs";

concept("aphys.circuits.potential-dividers", { file: "circuits/potential-dividers", keyPrefix: "circuits.potential-dividers" }, (b) => {
  {
    const v = potentialDivider(12, 8.2, 3.3);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`An $8.2\ \text{k}\Omega$ resistor and a $3.3\ \text{k}\Omega$ resistor are connected in series across a $12\ \text{V}$ supply of negligible internal resistance. What is the p.d. across the $3.3\ \text{k}\Omega$ resistor?`,
      options: [
        [`${sfStr(v, 2)} V`, "Correct: 12 × 3.3/(8.2 + 3.3)."],
        [`${sfStr(potentialDivider(12, 3.3, 8.2), 2)} V`, "This is the p.d. across the 8.2 kΩ resistor."],
        [`${sfStr((12 * 3.3) / 8.2, 2)} V`, "The denominator must be the total resistance, not the other resistor."],
        ["6.0 V", "The p.d. is shared equally only when the resistances are equal."],
      ],
      answer: "A",
      explanation: t`$V_{\text{out}} = 12 \times \dfrac{3.3}{8.2 + 3.3} = ${sfStr(v, 3)}\ \text{V}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "An LDR and a fixed resistor form a potential divider across a battery. The output is taken across the fixed resistor. The room is darkened. What happens?",
    options: [
      ["The LDR's resistance rises, so the output p.d. falls.", "Correct: the LDR takes a larger share of the supply p.d."],
      ["The LDR's resistance rises, so the output p.d. rises.", "A larger LDR resistance takes more of the p.d., leaving less for the fixed resistor."],
      ["The LDR's resistance falls, so the output p.d. falls.", "An LDR's resistance rises in the dark."],
      ["The output p.d. is unchanged, because the supply p.d. is unchanged.", "The share depends on the ratio of resistances, which changes."],
    ],
    answer: "A",
    explanation: "In the dark the LDR's resistance increases, so it takes a larger fraction of the supply p.d., and the p.d. across the fixed resistor falls.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A circuit must give an output p.d. that RISES as the temperature rises, to switch on a cooling fan. It uses an NTC thermistor and a fixed resistor in series across a supply. Where should the output be taken, and why?",
    options: [
      ["Across the fixed resistor, whose share grows as the thermistor's resistance falls", "Correct: the fixed resistor's share rises as the thermistor's resistance falls."],
      ["Across the thermistor, because its resistance rises when hot so it takes a larger share", "An NTC thermistor's resistance falls as temperature rises."],
      ["Across the thermistor, because its resistance falls when hot so its p.d. rises", "A smaller share of resistance means a smaller share of p.d."],
      ["Across the whole chain, because the total p.d. rises as the thermistor heats up", "The total equals the supply p.d., which does not change."],
    ],
    answer: "A",
    explanation: "Hot → thermistor resistance falls → its share of the p.d. falls → the fixed resistor's share rises. So take the output across the fixed resistor.",
    hints: ["What happens to an NTC thermistor's resistance when it is heated?"],
  });
  {
    const Rp = parallelR(20, 20);
    const vu = potentialDivider(9.0, 20, 20), vl = potentialDivider(9.0, 20, Rp);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`Two $20\ \text{k}\Omega$ resistors divide a $9.0\ \text{V}$ supply. A load of resistance $20\ \text{k}\Omega$ is connected across the lower resistor. What is the p.d. across the load?`,
      options: [
        [`${sfStr(vl, 2)} V`, "Correct: the lower section becomes 10 kΩ, sharing 9.0 V with 20 kΩ."],
        [`${sfStr(vu, 2)} V`, "This is the unloaded output; the load is in parallel and lowers it."],
        [`${sfStr(potentialDivider(9.0, 20, 40), 2)} V`, "This adds the load in series instead of in parallel."],
        [`${sfStr(vu / 2, 3)} V`, "Halving the unloaded output is not justified; recalculate with 10 kΩ."],
      ],
      answer: "A",
      explanation: t`Lower section $= 20 \parallel 20 = ${Rp}\ \text{k}\Omega$. $V = 9.0 \times \dfrac{${Rp}}{20 + ${Rp}} = ${sfStr(vl, 2)}\ \text{V}$.`,
      hints: ["The load is in parallel with the lower resistor."],
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a potentiometer (a resistor with a sliding contact connected across the supply) preferred to a series rheostat for varying the p.d. across a component from zero upwards?",
    options: [
      ["It can give any p.d. from zero to the full supply p.d.", "Correct: with the slider at one end the output is zero."],
      ["It wastes less energy than a rheostat in every circuit.", "A potentiometer draws current through its whole track, so it can waste more."],
      ["It increases the supply p.d. available to the component.", "It can only divide the supply p.d., never exceed it."],
      ["It keeps the current through the component constant.", "Its purpose is to vary the p.d. (and so the current)."],
    ],
    answer: "A",
    explanation: "A series rheostat can only reduce the p.d. to a minimum above zero; a potentiometer divides the supply and can reach 0 V.",
  });
  {
    // design: choose R so output is 4.0 V at a given LDR resistance
    const Vin = 6.0, Rldr = 1.5, Vout = 4.0; // output across the LDR (dark detector), kΩ
    const R1 = Rldr * (Vin - Vout) / Vout;
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: t`An LDR and a fixed resistor R form a potential divider across a $6.0\ \text{V}$ supply; the output is taken across the LDR. At dusk the LDR's resistance is $1.5\ \text{k}\Omega$, and the output must then be $4.0\ \text{V}$ to switch on a street lamp. What value of R is needed?`,
      options: [
        [`${sfStr(R1, 2)} kΩ`, "Correct: R carries 2.0 V and the LDR 4.0 V, so R = 1.5 × 2.0/4.0."],
        ["3.0 kΩ", "This gives the LDR one third of the supply; the ratio is inverted."],
        ["2.0 kΩ", "This confuses the p.d. across R (2.0 V) with its resistance."],
        ["1.5 kΩ", "Equal resistances would give 3.0 V across the LDR, not 4.0 V."],
      ],
      answer: "A",
      explanation: t`P.d.s are in the ratio of resistances: $\dfrac{R}{1.5} = \dfrac{6.0 - 4.0}{4.0}$, so $R = ${sfStr(R1, 2)}\ \text{k}\Omega$.`,
      hints: ["The p.d.s are in the same ratio as the resistances."],
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`Resistors of $1.0\ \text{k}\Omega$ and $4.0\ \text{k}\Omega$ are connected in series across a $5.0\ \text{V}$ supply of negligible internal resistance. Calculate the p.d. across the $4.0\ \text{k}\Omega$ resistor, in V.`,
    value: potentialDivider(5.0, 1.0, 4.0), dp: 1, unit: "V", wrong: [potentialDivider(5.0, 4.0, 1.0)],
    explanation: t`$V = 5.0 \times \dfrac{4.0}{1.0 + 4.0} = ${dpStr(potentialDivider(5.0, 1.0, 4.0), 1)}\ \text{V}$.`,
  });
  {
    const Vin = 9.0, R = 2.7, Rt = [6.8, 1.8];
    const v = Rt.map((x) => potentialDivider(Vin, x, R));
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An NTC thermistor and a $2.7\ \text{k}\Omega$ resistor are connected in series across a $9.0\ \text{V}$ supply; the output is taken across the resistor. The thermistor's resistance falls from $6.8\ \text{k}\Omega$ in a cool room to $1.8\ \text{k}\Omega$ near a hot oven. Calculate the change in the output p.d., in V, to two significant figures.`,
      value: v[1] - v[0], sf: 2, unit: "V", wrong: [v[1], v[0]],
      explanation: t`1. Cool: $V = 9.0 \times \dfrac{2.7}{6.8 + 2.7} = ${sfStr(v[0], 3)}\ \text{V}$.
2. Hot: $V = 9.0 \times \dfrac{2.7}{1.8 + 2.7} = ${sfStr(v[1], 3)}\ \text{V}$.
3. Change $= ${sfStr(v[1] - v[0], 2)}\ \text{V}$ (a rise).`,
      hints: ["Find the output at each temperature."],
    });
  }
  {
    const Vin = 12, Vout = 3.0, R1 = 33;
    const R2 = (Vout * R1) / (Vin - Vout);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A potential divider must provide $3.0\ \text{V}$ from a $12\ \text{V}$ supply. The upper resistor is $33\ \text{k}\Omega$. Calculate the resistance of the lower resistor, across which the output is taken, in kΩ.`,
      value: R2, unit: "kΩ", wrong: [(Vin * R1) / Vout, R1 / 4],
      explanation: t`The upper resistor has $12 - 3.0 = 9.0\ \text{V}$. Ratio: $\dfrac{R_2}{33} = \dfrac{3.0}{9.0}$, so $R_2 = ${sfStr(R2, 3)}\ \text{k}\Omega$.`,
      hints: ["What p.d. is across the upper resistor?"],
    });
  }
  {
    const Vin = 10, R1 = 47, R2 = 47, RL = 100;
    const Rp = parallelR(R2, RL);
    const v0 = potentialDivider(Vin, R1, R2), v1 = potentialDivider(Vin, R1, Rp);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Two $47\ \text{k}\Omega$ resistors divide a $10\ \text{V}$ supply. A sensor circuit with an input resistance of $100\ \text{k}\Omega$ is connected across the lower resistor. Calculate the percentage fall in the output p.d. caused by connecting it, to two significant figures.`,
      value: ((v0 - v1) / v0) * 100, sf: 2, unit: "%", wrong: [((v0 - potentialDivider(Vin, R1, R2 + RL)) / v0) * 100],
      explanation: t`1. Unloaded output $= ${dpStr(v0, 2)}\ \text{V}$.
2. Lower section $= 47 \parallel 100 = ${sfStr(Rp, 3)}\ \text{k}\Omega$.
3. Loaded output $= 10 \times \dfrac{${sfStr(Rp, 3)}}{47 + ${sfStr(Rp, 3)}} = ${sfStr(v1, 3)}\ \text{V}$.
4. Fall $= \dfrac{${dpStr(v0, 2)} - ${sfStr(v1, 3)}}{${dpStr(v0, 2)}} \times 100 = ${sfStr(((v0 - v1) / v0) * 100, 2)}\%$.`,
      hints: ["The load is in parallel with the lower resistor."],
    });
  }
  {
    // LDR resistance from the divider output
    const Vin = 9.0, Rf = 10, Vout = 6.0;
    const Rldr = (Rf * (Vin - Vout)) / Vout;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An LDR is connected in series with a $10\ \text{k}\Omega$ resistor across a $9.0\ \text{V}$ supply of negligible internal resistance. The p.d. across the $10\ \text{k}\Omega$ resistor is $6.0\ \text{V}$. Calculate the resistance of the LDR, in kΩ.`,
      value: Rldr, unit: "kΩ", wrong: [(Rf * Vout) / (Vin - Vout)],
      explanation: t`The p.d. across the LDR is $9.0 - 6.0 = 3.0\ \text{V}$. In series the current is the same, so the p.d.s are in the ratio of the resistances: $R_{\text{LDR}} = 10 \times \dfrac{3.0}{6.0} = ${sfStr(Rldr, 2)}\ \text{k}\Omega$. Inverting the ratio gives $20\ \text{k}\Omega$, which would put the larger p.d. across the LDR.`,
      hints: ["The larger resistance takes the larger share of the p.d."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Doubling both resistors in a potential divider halves the output p.d.",
    answer: false,
    explanation: "False. The output depends only on the ratio R₂/(R₁ + R₂), which is unchanged. (The current drawn from the supply is halved.)",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "A sensor and a fixed resistor form a potential divider. Match each circuit with how its output changes.",
    pairs: [
      ["LDR; output across the LDR; light gets brighter", "output falls"],
      ["LDR; output across the fixed resistor; light gets brighter", "output rises"],
      ["NTC thermistor; output across the thermistor; temperature falls", "output rises"],
      ["NTC thermistor; output across the fixed resistor; temperature falls", "output falls"],
    ],
    explanation: "Brighter or hotter → sensor resistance falls → sensor's share of p.d. falls and the fixed resistor's share rises; the reverse for darker or colder.",
    hints: ["Decide first whether the sensor's resistance rises or falls."],
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of loading.",
    template: "A load connected across the output is in {{blank:a}} with the lower resistor, so the resistance of that section {{blank:b}} and the output p.d. {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["parallel"], choices: ["parallel", "series"] },
      { id: "b", accepted: ["decreases"], choices: ["decreases", "increases", "stays the same"] },
      { id: "c", accepted: ["decreases"], choices: ["decreases", "increases", "stays the same"] },
    ],
    explanation: "Parallel resistance is smaller, so that section takes a smaller share of the supply p.d.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the variable resistor with a sliding contact that, connected across a supply, gives a p.d. that can be varied from zero to the full supply p.d.",
    accepted: ["potentiometer", "a potentiometer", "pot"],
    explanation: "A **potentiometer** used as a variable potential divider.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a potential divider containing an LDR can be used to switch on a lamp automatically when it gets dark. State where the output is taken.",
    points: [
      "Output taken across the LDR (fixed resistor in series with it across the supply).",
      "As it gets darker, the LDR's resistance increases, so it takes a larger share of the supply p.d.",
      "The output p.d. rises; when it exceeds a set value it switches on the lamp (via a transistor/relay/comparator).",
    ],
    modelAnswer: "Connect the LDR in series with a fixed (or variable) resistor across the supply and take the output across the LDR. As the light fades the LDR's resistance rises, so it takes a larger share of the supply p.d. and the output rises; when it passes a threshold it operates a switching circuit that turns on the lamp.",
    explanation: "Dark → LDR resistance up → p.d. across LDR up.",
    hints: ["Does an LDR's resistance rise or fall in the dark?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: "Show that the output of a potential divider is V_out = V_in R₂/(R₁ + R₂), where the output is across R₂ and no current is drawn from it.",
    points: [
      "Same current through both: I = V_in/(R₁ + R₂).",
      "V_out = IR₂ = V_in R₂/(R₁ + R₂).",
    ],
    modelAnswer: "With no current drawn at the output, the same current I = V_in/(R₁ + R₂) flows through both resistors, so the p.d. across R₂ is IR₂ = V_in R₂/(R₁ + R₂).",
    explanation: "Series current, then V = IR.",
    hints: ["What is the current through the chain?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why the fixed resistor in a thermistor temperature sensor is often replaced by a variable resistor, and why its value is usually chosen to be similar to the thermistor's resistance at the temperature of interest.",
    points: [
      "A variable resistor lets the user set (calibrate) the temperature at which the circuit switches.",
      "When the two resistances are similar, a given change in thermistor resistance gives the largest change in output p.d.",
      "So the sensor is most sensitive around that temperature (if the fixed resistor is much larger or smaller, the output barely changes).",
    ],
    modelAnswer: "A variable resistor lets the switching temperature be adjusted. The output changes most rapidly with thermistor resistance when the fixed resistance is comparable to it, so choosing a similar value makes the sensor most sensitive near the temperature of interest; if the fixed resistor were much larger or smaller, the output would hardly change.",
    explanation: "Adjustable threshold; maximum sensitivity when the resistances match.",
    hints: ["Try extreme values of the fixed resistor in the formula."],
  });

  // Practice structured: calibrating a thermistor sensor (12 marks)
  {
    const T = [20, 30, 40, 50, 60, 70];
    const Rt = [12.5, 8.1, 5.3, 3.6, 2.5, 1.8]; // kΩ, typical NTC
    const Vin = 5.0, R = 4.7;
    const Vout = Rt.map((x) => potentialDivider(Vin, x, R));
    const target = 3.0;
    const RtAt = (R * (Vin - target)) / target;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Thandeka builds a temperature sensor for a chicken brooder: an NTC thermistor in series with a $4.7\ \text{k}\Omega$ resistor across a $5.0\ \text{V}$ supply, with the output taken across the fixed resistor. The thermistor's resistance is:

${table([t`$\theta\,/\,^\circ\text{C}$`, t`$R_T\,/\,\text{k}\Omega$`], T.map((x, i) => [String(x), dpStr(Rt[i], 1)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the output p.d. at $20\ ^\circ\text{C}$, in V, to three significant figures.`, value: Vout[0], unit: "V", wrong: [potentialDivider(Vin, R, Rt[0])], explanation: t`$5.0 \times \dfrac{4.7}{12.5 + 4.7} = ${sfStr(Vout[0], 3)}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the output p.d. at $50\ ^\circ\text{C}$, in V, to three significant figures.`, value: Vout[3], unit: "V", wrong: [potentialDivider(Vin, R, Rt[3])], explanation: t`$5.0 \times \dfrac{4.7}{3.6 + 4.7} = ${sfStr(Vout[3], 3)}\ \text{V}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "The heater must switch off when the output reaches 3.0 V. Calculate the thermistor's resistance at that moment, in kΩ, to two significant figures, and use the table to estimate the temperature.", value: RtAt, sf: 2, unit: "kΩ", wrong: [(R * target) / (Vin - target)], explanation: t`P.d. across the thermistor $= 2.0\ \text{V}$, so $R_T = 4.7 \times \dfrac{2.0}{3.0} = ${sfStr(RtAt, 2)}\ \text{k}\Omega$, which the table places between $50$ and $60\ ^\circ\text{C}$ (roughly $55\ ^\circ\text{C}$).` }),
        P.manual({ label: "(d)", marks: 2, stem: "Describe how the output p.d. varies with temperature over the range in the table, as you would sketch it.", points: ["The output rises as the temperature rises (from about 1.4 V to about 3.6 V).", "The rise is not linear: the curve flattens at higher temperatures as R_T becomes small compared with 4.7 kΩ."], modelAnswer: "The output increases with temperature, from about 1.4 V at 20 °C to about 3.6 V at 70 °C, but not linearly: the graph is steepest in the middle and flattens at high temperatures as the thermistor's resistance becomes small compared with 4.7 kΩ." }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe how Thandeka could calibrate the sensor experimentally, including one precaution.", points: ["Place the thermistor (sealed/insulated leads) in a beaker of water with a thermometer, heated slowly and stirred.", "Record the output p.d. with a high-resistance voltmeter at several temperatures (e.g. every 5 °C) and plot output against temperature.", "Precaution: wait for the thermistor and thermometer to reach the same temperature / stir / keep the current small so the thermistor does not self-heat."], modelAnswer: "Put the thermistor in a beaker of water next to a thermometer, heat the water slowly while stirring, and record the output p.d. with a high-resistance voltmeter every 5 °C, then draw a calibration graph of output against temperature. Stir and wait for readings to settle so the thermistor is at the thermometer's temperature, and keep the current small so the thermistor does not heat itself." }),
      ],
      explanation: "V_out = V_in R/(R_T + R) at each temperature; invert the ratio to find R_T for a given output.",
      hints: ["The output is across the fixed resistor.", "P.d.s are in the ratio of the resistances."],
    });
    chk(Vout.length, 6);
  }
  // Practice structured: uncertainty in a divider output (8 marks)
  {
    const Vin = 6.00, dVin = 0.05, R1 = 1.00, R2 = 2.00, tol = 0.01;
    const v = potentialDivider(Vin, R1, R2);
    const vmax = potentialDivider(Vin + dVin, R1 * (1 - tol), R2 * (1 + tol));
    const vmin = potentialDivider(Vin - dVin, R1 * (1 + tol), R2 * (1 - tol));
    const half = (vmax - vmin) / 2;
    b.struct({
      d: 5, skill: "EVALUATION", calculator: true,
      stem: t`A divider uses resistors of $1.00\ \text{k}\Omega$ (upper) and $2.00\ \text{k}\Omega$ (lower), each with a tolerance of $\pm 1\%$, across a supply of $(6.00 \pm 0.05)\ \text{V}$. The output is across the lower resistor.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the nominal output p.d., in V.", value: v, dp: 2, unit: "V", wrong: [potentialDivider(Vin, R2, R1)], explanation: t`$6.00 \times \dfrac{2.00}{3.00} = ${dpStr(v, 2)}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate the largest possible output p.d., in V, to three significant figures, by choosing the extreme values that make it largest.", value: vmax, unit: "V", wrong: [potentialDivider(Vin + dVin, R1 * 1.01, R2 * 1.01)], explanation: t`Largest supply ($6.05\ \text{V}$), smallest upper ($0.99\ \text{k}\Omega$), largest lower ($2.02\ \text{k}\Omega$): $6.05 \times \dfrac{2.02}{3.01} = ${sfStr(vmax, 3)}\ \text{V}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "The smallest possible output is found in the same way. Calculate the absolute uncertainty in the output (half the difference between the largest and smallest values), in V, to one significant figure.", value: half, sf: 1, unit: "V", wrong: [dVin], explanation: t`Smallest: $5.95 \times \dfrac{1.98}{2.99} = ${sfStr(vmin, 3)}\ \text{V}$. Half the difference $= \dfrac{${sfStr(vmax, 3)} - ${sfStr(vmin, 3)}}{2} \approx ${sfStr(half, 1)}\ \text{V}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest why simply adding the percentage uncertainties of V_in, R₁ and R₂ would overestimate the uncertainty in the output.", points: ["R₂ appears in both the numerator and the denominator, so an increase in R₂ partly cancels.", "Only the ratio R₂/(R₁ + R₂) matters, so errors in the resistors partly compensate (the worst-case method above accounts for this)."], modelAnswer: "R₂ appears in both the numerator and the denominator, so an error in it is partly cancelled; only the ratio of the resistances matters. Adding all the percentages treats the terms as independent factors and overestimates the spread found by trying the extreme values." }),
      ],
      explanation: "Worst-case values give the range of the output; half the range is the absolute uncertainty.",
      hints: ["To make the output largest, make the supply and R₂ large and R₁ small."],
    });
  }

  b.card("DEFINITION", "**Potential divider**", "Resistances in series across a supply, sharing the p.d. in proportion to resistance; the output is taken across one of them.");
  b.card("FORMULA", "Potential divider output", t`$V_{\text{out}} = V_{\text{in}} \dfrac{R_2}{R_1 + R_2}$ (output across $R_2$, no current drawn)`);
  b.card("CONCEPT", "Potentiometer versus rheostat", "A potentiometer across the supply gives 0 V to the full supply p.d.; a series rheostat cannot reach 0 V.");
  b.card("CONCEPT", "Heat sensor", "NTC thermistor + fixed resistor; output across the fixed resistor rises as temperature rises.");
  b.card("CONCEPT", "Dark sensor", "LDR + fixed resistor; output across the LDR rises as it gets darker.");
  b.card("CONCEPT", "Loading a divider", "A load across the output is in parallel with R₂, lowering the output; use a load resistance ≫ R₂.");
  b.card("CONCEPT", "Choosing the fixed resistor", "Similar to the sensor's resistance at the point of interest gives maximum sensitivity; make it variable to set the threshold.");
  b.card("FACT", "What sets a divider's output", "Only the ratio of the resistances (and V_in); scaling both resistors changes the current, not the output.");
});
