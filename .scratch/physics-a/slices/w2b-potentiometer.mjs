// W2b: aphys.circuits.potentiometer — slide-wire potentiometer, null methods, comparing e.m.f.s, internal resistance,
// Wheatstone and metre bridge (ZIMSEC detail).
import { concept, P, t, ZIM, chk, sfStr, dpStr, sciTex, pctUnc, mean, halfRange } from "../lib.mjs";

concept("aphys.circuits.potentiometer", { file: "circuits/potentiometer", keyPrefix: "circuits.potentiometer" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a potentiometer at balance measure the e.m.f. of a cell, whereas a moving-coil voltmeter connected across the cell does not?",
    options: [
      ["At balance no current flows in the cell, so no p.d. is lost across its internal resistance.", "Correct: the null condition means I = 0 in the test cell."],
      ["The potentiometer wire has a much smaller resistance than the voltmeter connected across the cell.", "The wire's resistance is not the reason; the absence of current in the cell is."],
      ["The galvanometer used at balance is more accurately calibrated than any voltmeter.", "A null method does not rely on the detector's calibration at all."],
      ["The driver cell adds its e.m.f. to that of the test cell at balance.", "The two p.d.s oppose round the test loop; nothing is added."],
    ],
    answer: "A",
    explanation: "At balance the galvanometer shows zero, so no current is drawn from the test cell and its terminal p.d. equals its e.m.f.",
  });
  {
    const Vw = 1.80, L = 100, l = 62.5;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`The p.d. across a $100.0\ \text{cm}$ potentiometer wire is $1.80\ \text{V}$. A cell balances at $62.5\ \text{cm}$. What is its e.m.f.?`,
      options: [
        [`${sfStr((Vw * l) / L, 3)} V`, "Correct: (1.80/100.0) × 62.5."],
        [`${sfStr((Vw * L) / l, 3)} V`, "The ratio is inverted."],
        [`${sfStr(Vw - (Vw * l) / L, 3)} V`, "This is the p.d. across the rest of the wire."],
        ["1.80 V", "This is the p.d. across the whole wire, not across the balance length."],
      ],
      answer: "A",
      explanation: t`P.d. per cm $= 1.80/100.0 = 0.0180\ \text{V cm}^{-1}$; $E = 0.0180 \times 62.5 = ${sfStr((Vw * l) / L, 3)}\ \text{V}$.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a potentiometer experiment the galvanometer deflects in the same direction wherever the jockey touches the wire. Which is a possible cause?",
    options: [
      ["The test cell is reversed, so like terminals are not joined at the same end.", "Correct: like terminals must be joined, or the p.d.s add rather than oppose."],
      ["The galvanometer is far too sensitive for the currents in this circuit.", "Sensitivity affects precision, not whether a balance exists."],
      ["The p.d. across the whole wire is larger than the test e.m.f.", "That is required for a balance to exist."],
      ["The protective resistor in series with the galvanometer is too large.", "This makes the deflection small but does not prevent a balance."],
    ],
    answer: "A",
    explanation: "No balance is possible if the test cell is reversed, if the driver p.d. across the wire is smaller than the test e.m.f., or if there is a broken connection.",
    hints: ["What must be true for the p.d.s round the test loop to cancel?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which property of the potentiometer wire is essential for balance length to be proportional to p.d.?",
    options: [
      ["The wire is uniform, so its resistance per unit length is constant.", "Correct: with a steady current, p.d. ∝ resistance ∝ length."],
      ["The wire has a very small resistivity, like copper.", "A high-resistivity alloy is usually used, to give a measurable p.d. per cm."],
      ["The wire is exactly one metre long.", "Any length works; one metre is merely convenient."],
      ["The wire carries no current when the jockey is lifted.", "The driver cell keeps a steady current in the wire at all times."],
    ],
    answer: "A",
    explanation: "A uniform wire carrying a steady current has the same p.d. per unit length all along it.",
  });
  {
    const l0 = 82.0, l = 68.0, R = 4.0;
    const r = R * (l0 / l - 1);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A cell balances at $82.0\ \text{cm}$ on open circuit and at $68.0\ \text{cm}$ when a $4.0\ \Omega$ resistor is connected across it. What is its internal resistance?`,
      options: [
        [`${sfStr(r, 2)} Ω`, "Correct: r = R(l₀/l − 1)."],
        [`${sfStr(R * (l / l0 - 1) * -1, 2)} Ω`, "This uses l/l₀ instead of l₀/l."],
        [`${sfStr(R * (l0 / l), 2)} Ω`, "This forgets to subtract 1."],
        [`${sfStr((l0 - l) / R, 2)} Ω`, "This divides a length difference by R; the units do not even give ohms."],
      ],
      answer: "A",
      explanation: t`$r = 4.0\left(\dfrac{82.0}{68.0} - 1\right) = ${sfStr(r, 2)}\ \Omega$.`,
      hints: ["E ∝ l₀ and V ∝ l; use E = V + (V/R)r."],
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: t`In a balanced Wheatstone bridge, P = $100\ \Omega$, Q = $250\ \Omega$ and R = $40\ \Omega$, where P/Q = R/S at balance. What is S?`,
    options: [
      ["100 Ω", "Correct: S = RQ/P = 40 × 250/100."],
      ["16 Ω", "This uses S = RP/Q, inverting the ratio."],
      ["250 Ω", "This assumes S = Q, which would need P = R."],
      ["40 Ω", "This assumes S = R, which would need P = Q."],
    ],
    answer: "A",
    explanation: t`$\dfrac{P}{Q} = \dfrac{R}{S}$ gives $S = \dfrac{RQ}{P} = \dfrac{40 \times 250}{100} = 100\ \Omega$.`,
    hints: ["Rearrange P/Q = R/S for S."],
  });
  {
    const Es = 1.018, ls = 48.6, lx = 71.2;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`A standard cell of e.m.f. $1.018\ \text{V}$ balances at $48.6\ \text{cm}$ on a potentiometer wire. A second cell balances at $71.2\ \text{cm}$ with the same current in the wire. Calculate the e.m.f. of the second cell, in V, to three significant figures.`,
      value: (Es * lx) / ls, unit: "V", wrong: [(Es * ls) / lx],
      explanation: t`$E_x = 1.018 \times \dfrac{71.2}{48.6} = ${sfStr((Es * lx) / ls, 3)}\ \text{V}$.`,
    });
  }
  {
    // driver cell with internal resistance and series rheostat: p.d. across wire
    const Ed = 2.0, rd = 0.5, Rrh = 2.5, Rw = 5.0, L = 1.0;
    const I = Ed / (rd + Rrh + Rw);
    const Vw = I * Rw;
    const l = 0.55 / (Vw / L);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A driver cell of e.m.f. $2.0\ \text{V}$ and internal resistance $0.50\ \Omega$ is connected in series with a $2.5\ \Omega$ rheostat across a $1.00\ \text{m}$ potentiometer wire of resistance $5.0\ \Omega$. A thermocouple of e.m.f. $0.55\ \text{V}$ is balanced on the wire. Calculate the balance length, in m, to three significant figures.`,
      value: l, unit: "m", wrong: [0.55 / Ed, 0.55 / (Ed * (Rw / (Rw + Rrh)))],
      explanation: t`1. Current in the wire $I = \dfrac{2.0}{0.50 + 2.5 + 5.0} = ${I}\ \text{A}$.
2. P.d. across the wire $= ${I} \times 5.0 = ${Vw}\ \text{V}$, i.e. $${Vw}\ \text{V m}^{-1}$.
3. Balance length $= \dfrac{0.55}{${Vw}} = ${sfStr(l, 3)}\ \text{m}$.
4. Assuming the full 2.0 V is across the wire ignores the rheostat and internal resistance.`,
      hints: ["Find the current in the driver circuit.", "Then the p.d. per metre of wire."],
    });
  }
  {
    const l0 = 0.735, l = 0.588, R = 6.0;
    const r = R * (l0 / l - 1);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A cell balances at $0.735\ \text{m}$ on open circuit. When a $6.0\ \Omega$ resistor is connected across it, the balance length becomes $0.588\ \text{m}$. Calculate the internal resistance of the cell, in Ω, to two significant figures.`,
      value: r, sf: 2, unit: "Ω", wrong: [R * (l0 / l), R * (1 - l / l0)],
      explanation: t`1. $E \propto l_0$ and the terminal p.d. $V \propto l$.
2. $E = V + Ir$ with $I = V/R$: $r = R\left(\dfrac{E}{V} - 1\right) = R\left(\dfrac{l_0}{l} - 1\right)$.
3. $r = 6.0 \times \left(\dfrac{0.735}{0.588} - 1\right) = ${sfStr(r, 2)}\ \Omega$.`,
      hints: ["The open-circuit balance gives E; the loaded balance gives V."],
    });
  }
  {
    const Rk = 12, l = 0.628;
    const X = (Rk * l) / (1 - l);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: t`In a metre bridge, an unknown resistor X is in the left-hand gap and a $12.0\ \Omega$ resistor in the right-hand gap. Balance is obtained $62.8\ \text{cm}$ from the left-hand end. Calculate X, in Ω, to three significant figures.`,
      value: X, unit: "Ω", wrong: [(Rk * (1 - l)) / l],
      explanation: t`$\dfrac{X}{12.0} = \dfrac{62.8}{37.2}$, so $X = ${sfStr(X, 3)}\ \Omega$. Inverting the lengths gives the wrong gap.`,
      hints: ["X/R = l/(100 − l), with l measured from X's end."],
    });
  }
  {
    // series resistor to set the p.d. across the wire
    const E = 2.0, Rw = 4.0, Vw = 1.20;
    const I = Vw / Rw;
    const Rs = E / I - Rw;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A potentiometer wire of resistance $4.0\ \Omega$ is connected in series with a resistor and a driver cell of e.m.f. $2.0\ \text{V}$ and negligible internal resistance. Calculate the resistance of the series resistor needed to make the p.d. across the whole wire $1.20\ \text{V}$, in Ω, to three significant figures.`,
      value: Rs, unit: "Ω", wrong: [E / I],
      explanation: t`Current in the wire $I = \dfrac{1.20}{4.0} = ${sfStr(I, 2)}\ \text{A}$. Total resistance $= \dfrac{2.0}{${sfStr(I, 2)}} = ${sfStr(E / I, 3)}\ \Omega$, so the series resistor is $${sfStr(E / I, 3)} - 4.0 = ${sfStr(Rs, 3)}\ \Omega$. Giving the total, $${sfStr(E / I, 3)}\ \Omega$, forgets that the wire itself supplies $4.0\ \Omega$.`,
      hints: ["Find the current from the wire's p.d. and resistance."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a null method, the accuracy of the result depends on the galvanometer being accurately calibrated.",
    answer: false,
    explanation: "False. The galvanometer only needs to show when the current is zero; its calibration is irrelevant, which is one strength of null methods.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the potentiometer circuit with its purpose.",
    pairs: [
      ["driver cell", "maintains a steady current in the wire"],
      ["jockey", "makes a sliding contact at any point on the wire"],
      ["galvanometer", "detects when no current flows in the test circuit"],
      ["protective resistor in series with the galvanometer", "limits the current far from balance"],
      ["rheostat in the driver circuit", "sets the p.d. per unit length of the wire"],
    ],
    explanation: "Driver: steady current. Jockey: contact. Galvanometer: null detector. Protective resistor: protects the galvanometer and cell far from balance (shorted near balance). Rheostat: adjusts the p.d. gradient.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about the potentiometer.",
    template: "With a steady current in a uniform wire, the p.d. between one end and the jockey is {{blank:a}} to the length of wire. At balance, the current through the galvanometer is {{blank:b}}, so the balance p.d. equals the cell's {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["proportional"], choices: ["proportional", "inversely proportional", "unrelated"] },
      { id: "b", accepted: ["zero"], choices: ["zero", "a maximum", "equal to the wire current"] },
      { id: "c", accepted: ["e.m.f."], choices: ["e.m.f.", "terminal p.d. on load", "internal resistance"] },
    ],
    explanation: "V ∝ l; null current; no lost volts, so the e.m.f. is measured.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the sensitive meter used to detect zero current in a potentiometer circuit.",
    accepted: ["galvanometer", "a galvanometer", "centre-zero galvanometer", "centre zero galvanometer"],
    explanation: "A (centre-zero) **galvanometer**.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a potentiometer is used to compare the e.m.f.s of two cells. Describe the circuit in words.",
    points: [
      "Driver cell (with rheostat) across a uniform wire; test cell with like terminal to the same end, through a galvanometer to a jockey.",
      "Find the balance length l₁ for cell 1 (galvanometer reads zero), then l₂ for cell 2 without changing the wire current.",
      "E₁/E₂ = l₁/l₂.",
    ],
    modelAnswer: "Connect a driver cell and rheostat across a uniform metre wire. Connect cell 1, positive terminal to the same end as the driver's positive terminal, through a galvanometer (with protective resistor) to a jockey. Find the balance length l₁ where the galvanometer reads zero, then replace it with cell 2 and find l₂ without touching the rheostat. Then E₁/E₂ = l₁/l₂.",
    explanation: "Balance lengths are proportional to e.m.f.s when the wire current is fixed.",
    hints: ["What must not be changed between the two balances?"],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Show that the internal resistance of a cell is r = R(l₀/l − 1), where l₀ is the balance length on open circuit and l the balance length when a resistor R is connected across the cell.",
    points: [
      "On open circuit no current flows, so the balance p.d. is E: E = kl₀ (k = p.d. per unit length).",
      "With R connected the balance p.d. is the terminal p.d. V = kl, and the current is I = V/R.",
      "E = V + Ir gives r = (E − V)/I = R(E − V)/V = R(l₀/l − 1).",
    ],
    modelAnswer: "On open circuit, E = kl₀. With R across the cell, the terminal p.d. V = kl and I = V/R. From E = V + Ir, r = (E − V)R/V = R(l₀ − l)/l = R(l₀/l − 1).",
    explanation: "Combine E = V + Ir with the proportionality of p.d. and length.",
    hints: ["Write E and V in terms of balance lengths."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3, applies: ZIM,
    stem: "Explain why, in a metre-bridge experiment, the known resistance should be chosen so that the balance point is near the middle of the wire, and give one other precaution.",
    points: [
      "The absolute uncertainty in locating the balance point is about the same everywhere.",
      "Near the middle both l and (100 − l) are large, so the percentage uncertainty in X = R l/(100 − l) is smallest (and end-contact errors matter least).",
      "Other precaution: repeat with X and R interchanged and average / avoid sliding the jockey (press lightly) / switch off between readings so the wire does not heat.",
    ],
    modelAnswer: "The balance point can be located only to about ±1 mm wherever it is. With balance near the middle, both l and 100 − l are large, so their percentage uncertainties, and that of X, are smallest, and the resistance of the end contacts matters least. Interchange X and the known resistor and average the two results; press the jockey lightly rather than sliding it.",
    explanation: "Large lengths give small percentage uncertainties.",
    hints: ["Think about the percentage uncertainty in l and in (100 − l)."],
  });

  // Practice structured: potentiometer measurements with repeats (12 marks)
  {
    const l0s = [77.6, 78.0, 77.8];
    const ls = [64.1, 64.5, 64.3];
    const R = 3.3;
    const l0 = mean(l0s), l = mean(ls);
    const dl0 = halfRange(l0s), dl = halfRange(ls);
    const r = R * (l0 / l - 1);
    const Vcm = 1.95 / 100;
    const E = Vcm * l0;
    const dDiff = dl0 + dl;
    const pctR = pctUnc(dDiff, l0 - l) + pctUnc(dl, l) + 1;
    b.struct({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: t`Farai uses a potentiometer whose $100.0\ \text{cm}$ wire has a p.d. of $1.95\ \text{V}$ across it. She finds the balance length for a dry cell three times on open circuit: $${l0s.map((x) => x.toFixed(1)).join("$, $")}\ \text{cm}$; and three times with a $3.3\ \Omega$ resistor ($\pm 1\%$) across the cell: $${ls.map((x) => x.toFixed(1)).join("$, $")}\ \text{cm}$.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the e.m.f. of the cell, in V, to three significant figures.", value: E, unit: "V", wrong: [1.95], explanation: t`Mean $l_0 = ${dpStr(l0, 1)}\ \text{cm}$; $E = \dfrac{1.95}{100.0} \times ${dpStr(l0, 1)} = ${sfStr(E, 3)}\ \text{V}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the internal resistance, in Ω, to two significant figures.", value: r, sf: 2, unit: "Ω", wrong: [R * (l / l0 - 1) * -1], explanation: t`$r = 3.3\left(\dfrac{${dpStr(l0, 1)}}{${dpStr(l, 1)}} - 1\right) = ${sfStr(r, 2)}\ \Omega$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`State the absolute uncertainty in each mean balance length, using half the range, in cm.`, value: dl0, dp: 1, unit: "cm", wrong: [dl0 * 2], explanation: t`Both sets have a range of $0.4\ \text{cm}$, so $\pm ${dpStr(dl0, 1)}\ \text{cm}$.` }),
        P.num({ label: "(d)", marks: 3, stem: t`Writing $r = R\dfrac{l_0 - l}{l}$, estimate the percentage uncertainty in $r$ by adding the percentage uncertainties in $(l_0 - l)$, in $l$ and in $R$, to two significant figures.`, value: pctR, sf: 2, unit: "%", wrong: [pctUnc(dl0, l0) + pctUnc(dl, l) + 1], explanation: t`$l_0 - l = ${dpStr(l0 - l, 1)} \pm ${dpStr(dDiff, 1)}\ \text{cm}$: $${sfStr(pctUnc(dDiff, l0 - l), 2)}\%$. $l$: $${sfStr(pctUnc(dl, l), 2)}\%$. $R$: $1\%$. Total $${sfStr(pctR, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the uncertainty in r is so much larger than that in E.", points: ["r depends on the difference l₀ − l, which is small compared with the lengths themselves.", "The absolute uncertainties add for a difference, so its percentage uncertainty is large."], modelAnswer: "r depends on l₀ − l, a small difference of two similar lengths. The absolute uncertainties of both lengths add, so the difference has a large percentage uncertainty, which carries into r." }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest two improvements.", points: ["Use a smaller resistor R so that l is much smaller than l₀ (a larger difference), or a longer wire / smaller p.d. per cm.", "Take readings quickly / disconnect R between readings so the cell does not run down; press the jockey lightly to avoid damaging the wire."], modelAnswer: "Use a smaller R so that the loaded balance length is much shorter, making l₀ − l larger; and connect R only briefly while balancing, so the cell does not run down and change its e.m.f. A longer wire (or a smaller p.d. per cm) would also give longer, more precise balance lengths." }),
      ],
      explanation: "E = (p.d. per cm) × l₀; r = R(l₀/l − 1); uncertainties from half-ranges.",
      hints: ["Use mean balance lengths.", "For a difference, add the absolute uncertainties."],
    });
    chk(dl0, dl, 1e-9);
  }
  // Practice structured: Wheatstone bridge and a resistance thermometer (ZIMSEC, 8 marks)
  {
    const P1 = 100, Q1 = 100, R0 = 50.0, S = 160;
    const R = (P1 * S) / Q1;
    const alpha = 0.0039;
    const theta = (R / R0 - 1) / alpha;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: t`A platinum resistance thermometer forms arm R of a Wheatstone bridge with arms P and Q both $100\ \Omega$. The fourth arm S is a calibrated variable resistor. At balance P/Q = R/S. When the thermometer is in a furnace, balance is obtained with S = $160\ \Omega$. The thermometer's resistance is $50.0\ \Omega$ at $0\ ^\circ\text{C}$ and increases by $0.39\%$ of this value per kelvin (assume linear).`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the resistance of the thermometer in the furnace, in Ω.", value: R, unit: "Ω", wrong: [(Q1 * S) / P1 / 2], explanation: t`$R = \dfrac{P}{Q}S = 1 \times 160 = ${dpStr(R, 1)}\ \Omega$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the temperature of the furnace, in °C, to two significant figures.", value: theta, sf: 2, unit: "°C", wrong: [theta + 273], explanation: t`Increase $= 160 - 50.0 = 110\ \Omega$; per kelvin $= 0.0039 \times 50.0 = 0.195\ \Omega$; $\theta = 110/0.195 = ${sfStr(theta, 2)}\ ^\circ\text{C}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State two advantages of measuring R with a balanced bridge rather than with an ammeter and voltmeter.", points: ["At balance the galvanometer current is zero, so the result does not depend on the meter's calibration (a null method).", "The result is independent of the supply e.m.f. / its fluctuations, and no meter resistance disturbs the measurement."], modelAnswer: "It is a null method, so the galvanometer's calibration does not matter; and the balance condition does not depend on the supply e.m.f. or meter resistances." }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest why the leads to the thermometer can cause an error, and how it could be reduced.", points: ["The connecting leads have resistance (which also changes with temperature), adding to R.", "Use compensating (dummy) leads in arm S / thick short leads / measure lead resistance and subtract it."], modelAnswer: "The leads add their own resistance to arm R, and part of them is heated, so R appears too large. Put an identical pair of dummy leads alongside them in arm S so their effects cancel, or measure and subtract the lead resistance." }),
      ],
      explanation: "Bridge balance gives R = PS/Q; then use the linear temperature coefficient.",
      hints: ["P/Q = R/S at balance."],
    });
    chk(R, 160, 1e-9);
  }

  b.card("DEFINITION", "**Null method**", "A measurement in which a circuit is adjusted until a detector reads zero; the detector's calibration does not matter.");
  b.card("CONCEPT", "Potentiometer principle", "A steady current in a uniform wire gives p.d. ∝ length, so balance lengths compare p.d.s.");
  b.card("FORMULA", "Comparing e.m.f.s", t`$\dfrac{E_1}{E_2} = \dfrac{l_1}{l_2}$ (same wire current)`);
  b.card("FORMULA", "Internal resistance by potentiometer", t`$r = R\left(\dfrac{l_0}{l} - 1\right)$`);
  b.card("CONCEPT", "Why a potentiometer measures e.m.f.", "At balance no current is drawn from the cell, so there are no lost volts.");
  b.card("CONCEPT", "No balance point found", "Driver p.d. across the wire too small, test cell reversed (like terminals not joined), or a broken connection.");
  b.card("FORMULA", "Wheatstone bridge balance", t`$\dfrac{P}{Q} = \dfrac{R}{S}$`, undefined, { applies: ZIM });
  b.card("FORMULA", "Metre bridge", t`$\dfrac{X}{R} = \dfrac{l}{100 - l}$, $l$ in cm from $X$'s end`, undefined, { applies: ZIM });
});
