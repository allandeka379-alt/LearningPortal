// W3b: aphys.ac.transformers-transmission (ZIMSEC only) — transformer principle, ideal transformer equations, losses
// and laminations, efficiency, high-voltage transmission and the grid.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, table } from "../lib.mjs";

concept("aphys.ac.transformers-transmission", { file: "ac/transformers-transmission", keyPrefix: "ac.transformers-transmission" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is the core of a transformer laminated?",
    options: [
      ["To reduce eddy currents induced in the core", "Correct: insulated thin sheets raise the resistance to circulating currents."],
      ["To increase the magnetic flux produced by the primary", "Laminating does not increase the flux; a soft-iron core does that."],
      ["To reduce the resistance of the copper windings", "Winding resistance depends on the wire, not the core."],
      ["To stop the core from becoming magnetised", "The core must be magnetised to carry the flux."],
    ],
    answer: "A",
    explanation: "Laminations (thin insulated sheets) break up eddy-current paths, reducing heating in the core.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does a transformer not work on a steady direct current?",
    options: [
      ["A steady current gives a constant flux, so no e.m.f. is induced.", "Correct: induction needs a changing flux linkage."],
      ["Direct current cannot pass through the turns of the primary coil.", "It can; the coil simply behaves as a resistor."],
      ["The soft-iron core cannot be magnetised by a direct current.", "A steady current magnetises the core, but the flux does not change."],
      ["Direct current would flow through the iron core to the secondary.", "No current passes through the core between the coils."],
    ],
    answer: "A",
    explanation: "Faraday's law: e.m.f. ∝ rate of change of flux linkage, which is zero for a steady current.",
  });
  {
    const Np = 2000, Ns = 150, Vp = 240;
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "An ideal transformer has 2000 primary turns and 150 secondary turns. The primary is connected to a 240 V a.c. supply. What is the secondary voltage?",
      options: [
        [`${(Vp * Ns) / Np} V`, "Correct: Vs = Vp × Ns/Np."],
        [`${sfStr((Vp * Np) / Ns, 3)} V`, "This uses the turns ratio upside down."],
        [`${Vp} V`, "The voltage changes in proportion to the turns."],
        [`${sfStr(Vp * (Ns / Np) ** 2, 3)} V`, "The voltage ratio is the turns ratio, not its square."],
      ],
      answer: "A",
      explanation: t`$V_s = 240 \times \dfrac{150}{2000} = ${(Vp * Ns) / Np}\ \text{V}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "An ideal step-up transformer increases the voltage by a factor of 20. What happens to the current?",
    options: [
      ["It decreases by a factor of 20.", "Correct: VpIp = VsIs."],
      ["It increases by a factor of 20.", "Power cannot increase; the current must fall."],
      ["It is unchanged.", "With the voltage changed and power conserved, the current must change."],
      ["It decreases by a factor of 400.", "The current scales inversely with voltage, not its square."],
    ],
    answer: "A",
    explanation: "Power is conserved in an ideal transformer, so Is/Ip = Vp/Vs = 1/20.",
  });
  {
    const P0 = 2.0e6, V = 25e3, R = 3.0;
    const I = P0 / V;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`$2.0\ \text{MW}$ is transmitted at $25\ \text{kV}$ through cables of total resistance $3.0\ \Omega$. What power is lost in the cables?`,
      options: [
        [`${sfStr(I * I * R / 1000, 2)} kW`, "Correct: I = P/V = 80 A, loss = I²R."],
        [`${sfStr((V * V) / R / 1e6, 3)} MW`, "V²/R uses the transmission voltage, not the p.d. across the cables."],
        [`${sfStr(I * R / 1000, 2)} kW`, "IR is the p.d. across the cables in volts, not a power."],
        [`${sfStr((P0 * P0 * R) / V / 1e6, 2)} MW`, "The voltage must be squared: loss = (P/V)²R."],
      ],
      answer: "A",
      explanation: t`$I = \dfrac{2.0 \times 10^{6}}{25 \times 10^{3}} = ${I}\ \text{A}$; $P_{\text{loss}} = ${I}^2 \times 3.0 = ${sfStr(I * I * R, 2)}\ \text{W}$.`,
      hints: ["Find the current in the cables first."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The transmission voltage of a line is increased by a factor of 5 while the same power is transmitted. By what factor does the power lost in the cables change?",
    options: [
      ["It is divided by 25.", "Correct: I falls by 5, and loss ∝ I²."],
      ["It is divided by 5.", "The loss depends on the square of the current."],
      ["It is multiplied by 25.", "A higher voltage reduces the current, and so the loss."],
      ["It is unchanged.", "The cable resistance is fixed, but the current changes."],
    ],
    answer: "A",
    explanation: "I = P/V falls by a factor of 5; I²R falls by 5² = 25.",
    hints: ["Loss = (P/V)²R."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which material is best for a transformer core?",
    options: [
      ["Laminated soft iron", "Correct: easily magnetised and demagnetised, and laminated against eddy currents."],
      ["Solid hard steel", "Steel is magnetically hard (large hysteresis loss) and a solid core has large eddy currents."],
      ["Solid copper block", "Copper is not magnetic, so it would not guide the flux."],
      ["Laminated aluminium", "Aluminium is not magnetic and would not carry the flux."],
    ],
    answer: "A",
    explanation: "A soft magnetic material keeps hysteresis losses low; laminations keep eddy currents low.",
  });
  {
    const Vp = 230, Ip = 0.50, Vs = 18, Is = 6.0;
    const eta = (Vs * Is) / (Vp * Ip);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: t`A transformer takes $0.50\ \text{A}$ from the $230\ \text{V}$ mains and delivers $6.0\ \text{A}$ at $18\ \text{V}$. Calculate its efficiency, as a percentage, to three significant figures.`,
      value: eta * 100, unit: "%", wrong: [(Vp * Ip) / (Vs * Is) * 100],
      explanation: t`$\eta = \dfrac{V_sI_s}{V_pI_p} = \dfrac{18 \times 6.0}{230 \times 0.50} = \dfrac{108}{115} = ${sfStr(eta * 100, 3)}\%$.`,
    });
  }
  {
    const Vp = 11e3, Vs = 400, Ns = 52;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A distribution transformer steps $11\ \text{kV}$ down to $400\ \text{V}$. Its secondary has 52 turns. Calculate the number of primary turns.`,
      value: (Ns * Vp) / Vs, unit: undefined, wrong: [(Ns * Vs) / Vp],
      explanation: t`$N_p = N_s\dfrac{V_p}{V_s} = 52 \times \dfrac{11\,000}{400} = ${(Ns * Vp) / Vs}$ turns.`,
    });
  }
  {
    // ideal transformer: primary current from load
    const Vp = 230, Vs = 9.0, R = 4.5;
    const Is = Vs / R, Ip = (Vs * Is) / Vp;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An ideal transformer steps $230\ \text{V}$ down to $9.0\ \text{V}$ and supplies a $4.5\ \Omega$ resistor. Calculate the current in the primary coil, in mA, to three significant figures.`,
      value: Ip * 1000, unit: "mA", wrong: [(Vp / R) * 1000, Is * 1000],
      explanation: t`1. $I_s = \dfrac{9.0}{4.5} = 2.0\ \text{A}$.
2. $I_p = I_s\dfrac{V_s}{V_p} = 2.0 \times \dfrac{9.0}{230} = ${sfStr(Ip, 3)}\ \text{A} = ${sfStr(Ip * 1000, 3)}\ \text{mA}$.`,
      hints: ["Find the secondary current first, then use VpIp = VsIs."],
    });
  }
  {
    // transmission: percentage loss at given voltage; cable resistance from resistivity
    const P0 = 12e6, V = 88e3, rho = 2.8e-8, L = 60e3, A = 2.5e-4;
    const R = (rho * 2 * L) / A; // two conductors
    const I = P0 / V;
    const loss = I * I * R;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $60\ \text{km}$ line carries $12\ \text{MW}$ at $88\ \text{kV}$ to a mine. The current flows out along one aluminium conductor and back along another, each of cross-sectional area $2.5 \times 10^{-4}\ \text{m}^2$; aluminium has resistivity $2.8 \times 10^{-8}\ \Omega\ \text{m}$. Treating the line as carrying d.c. with these r.m.s. values, calculate the percentage of the power lost in the line, to two significant figures.`,
      value: (loss / P0) * 100, sf: 2, unit: "%", wrong: [((I * I * R) / 2 / P0) * 100, ((V * V) / R / P0) * 100],
      explanation: t`1. Resistance of $120\ \text{km}$ of conductor: $R = \dfrac{\rho L}{A} = \dfrac{2.8 \times 10^{-8} \times 1.2 \times 10^{5}}{2.5 \times 10^{-4}} = ${sfStr(R, 3)}\ \Omega$.
2. $I = \dfrac{12 \times 10^{6}}{88 \times 10^{3}} = ${sfStr(I, 3)}\ \text{A}$.
3. Loss $= I^2R = ${sciTex(loss)}\ \text{W}$, i.e. $${sfStr((loss / P0) * 100, 2)}\%$ of the power. Using only one conductor's length halves the answer.`,
      hints: ["The current goes out and back: total length 120 km.", "Loss = I²R with I = P/V."],
    });
  }
  {
    // efficiency with losses: find heat per hour
    const Pin = 5.0e3, eta = 0.96;
    const heat = Pin * (1 - eta) * 3600;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A transformer with an efficiency of 96% takes an input power of $5.0\ \text{kW}$. Calculate the energy converted to heat in the transformer in one hour, in J, to two significant figures.`,
      value: heat, sf: 2, unit: "J", wrong: [Pin * eta * 3600, Pin * (1 - eta) * 60],
      explanation: t`Power lost $= 5000 \times 0.04 = 200\ \text{W}$; energy in one hour $= 200 \times 3600 = ${sciTex(heat, 2)}\ \text{J}$.`,
      hints: ["Lost power = input − output."],
    });
  }
  {
    // uncertainty: turns ratio from measured voltages
    const Vp = 12.0, dVp = 0.1, Vs = 3.1, dVs = 0.1;
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`To find the turns ratio of an unmarked transformer, Chipo applies $12.0 \pm 0.1\ \text{V}$ a.c. to the primary and measures $3.1 \pm 0.1\ \text{V}$ across the unloaded secondary. Calculate the percentage uncertainty in the turns ratio, to two significant figures.`,
      value: pctUnc(dVp, Vp) + pctUnc(dVs, Vs), sf: 2, unit: "%", wrong: [pctUnc(dVs, Vs), pctUnc(dVp + dVs, Vp)],
      explanation: t`$\dfrac{0.1}{12.0} \times 100 + \dfrac{0.1}{3.1} \times 100 = ${sfStr(pctUnc(dVp, Vp), 2)} + ${sfStr(pctUnc(dVs, Vs), 2)} = ${sfStr(pctUnc(dVp, Vp) + pctUnc(dVs, Vs), 2)}\%$. The small secondary reading dominates; a meter with a finer resolution (0.01 V) would help.`,
      hints: ["Add the percentage uncertainties of the two voltages."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In an ideal transformer, the output power equals the input power.",
    answer: true,
    explanation: "True. An ideal transformer has no losses: VpIp = VsIs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each transformer energy loss with the way it is reduced.",
    pairs: [
      ["Eddy currents in the core", "Laminated core of thin insulated sheets"],
      ["Heating of the windings", "Thick copper wire of low resistance"],
      ["Hysteresis in the core", "Core of a magnetically soft material"],
      ["Flux leakage", "Coils wound on top of each other on a closed core"],
    ],
    explanation: "Each loss has its own remedy.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the explanation of how a transformer works.",
    template: "An alternating current in the primary coil produces a {{blank:a}} magnetic flux in the core. This flux links the secondary coil, so the flux linkage of the secondary {{blank:b}} and an e.m.f. is {{blank:c}} in it.",
    blanks: [
      { id: "a", accepted: ["changing"], choices: ["changing", "constant"] },
      { id: "b", accepted: ["changes"], choices: ["changes", "stays constant"] },
      { id: "c", accepted: ["induced"], choices: ["induced", "stored", "rectified"] },
    ],
    explanation: "Changing flux linkage induces an e.m.f. (Faraday's law).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how an alternating voltage applied to the primary coil of a transformer produces a voltage across the secondary coil, and why the secondary voltage depends on the number of secondary turns.",
    points: [
      "Alternating current in the primary produces an alternating (changing) magnetic flux in the iron core.",
      "The core links this flux through the secondary coil, so the flux linkage of the secondary changes.",
      "By Faraday's law an alternating e.m.f. is induced in the secondary (same frequency).",
      "Each turn has the same rate of change of flux, so the e.m.f. per turn is the same; the total secondary e.m.f. is proportional to Ns.",
    ],
    modelAnswer: "The alternating current in the primary produces an alternating magnetic flux in the soft-iron core, which carries almost all of it through the secondary. The secondary's flux linkage therefore keeps changing, and by Faraday's law an alternating e.m.f. of the same frequency is induced. The same flux passes through every turn, so each turn has the same induced e.m.f.; the total secondary e.m.f. is proportional to the number of secondary turns.",
    explanation: "Changing current → changing flux → changing flux linkage → induced e.m.f.",
    hints: ["Use Faraday's law."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why electrical energy is transmitted through the national grid at very high voltages, and state one disadvantage of very high voltages.",
    points: [
      "For a given power P = VI, a higher voltage means a smaller current.",
      "Power lost as heat in the cables is I²R, so it falls as the square of the current (much less energy wasted).",
      "Thinner (lighter, cheaper) cables can be used for the same loss, with pylons further apart.",
      "Disadvantage: needs very good insulation and tall pylons for safety (danger of arcing/corona discharge); transformers needed at each end.",
    ],
    modelAnswer: "The power transmitted is P = VI, so for a given power a higher voltage needs a smaller current. The energy wasted as heat in the cables is I²R per second, which falls as the square of the current, so far less energy is lost; lighter, thinner cables can also be used. The disadvantage is that very high voltages need large insulators and tall pylons to keep the lines safely clear, and transformers are needed to step the voltage up and down.",
    explanation: "Smaller current, I²R loss falls as I².",
    hints: ["Write the cable loss in terms of P and V."],
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how laminating the core reduces energy loss in a transformer.",
    points: [
      "The changing flux induces eddy currents that circulate in the core, heating it (I²R).",
      "Thin sheets separated by insulation break up the current paths / increase their resistance, so the eddy currents and the heating are much smaller.",
    ],
    modelAnswer: "The changing flux induces eddy currents circulating in the iron core, which heat it. Building the core from thin sheets insulated from one another breaks these current loops into narrow, high-resistance paths, so the eddy currents and the energy wasted are much smaller.",
    explanation: "Insulated sheets break up eddy-current loops.",
  });

  // Practice structured: supplying a remote village (14 marks)
  {
    const P0 = 150e3, Vgen = 400, Vline = 11e3, R = 6.0;
    const Igen = P0 / Vgen, Iline = P0 / Vline;
    const lossDirect = Igen * Igen * R, lossHV = Iline * Iline * R;
    const turns = Vline / Vgen;
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A small hydro-electric generator in the Eastern Highlands produces $150\ \text{kW}$ at $400\ \text{V}$. A line of total resistance $6.0\ \Omega$ carries the power to a village. Treat transformers as ideal and use r.m.s. values.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the current if the power were sent along the line at 400 V, in A.", value: Igen, unit: "A", wrong: [Vgen / R], explanation: t`$I = \dfrac{P}{V} = \dfrac{150\,000}{400} = ${Igen}\ \text{A}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Show that this would waste more power than is generated: calculate I²R, in kW.", value: lossDirect / 1000, unit: "kW", wrong: [(Igen * R) / 1000], explanation: t`$I^2R = ${Igen}^2 \times 6.0 = ${sciTex(lossDirect)}\ \text{W} = ${sfStr(lossDirect / 1000, 3)}\ \text{kW}$, more than the 150 kW available, so in reality the voltage at the village would collapse: transmission at 400 V is impossible.` }),
        P.num({ label: "(c)", marks: 1, stem: "A step-up transformer raises the voltage to 11 kV. Calculate its turns ratio Ns/Np, to three significant figures.", value: turns, wrong: [1 / turns], explanation: t`$\dfrac{N_s}{N_p} = \dfrac{11\,000}{400} = ${sfStr(turns, 3)}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the current in the line at 11 kV, in A, to three significant figures.", value: Iline, unit: "A", wrong: [Vline / R], explanation: t`$I = \dfrac{150\,000}{11\,000} = ${sfStr(Iline, 3)}\ \text{A}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the power lost in the line at 11 kV, as a percentage of 150 kW, to two significant figures.", value: (lossHV / P0) * 100, sf: 2, unit: "%", wrong: [((Vline * Vline) / R / P0) * 100], explanation: t`$I^2R = ${sfStr(Iline, 3)}^2 \times 6.0 = ${sfStr(lossHV, 3)}\ \text{W}$, which is $${sfStr((lossHV / P0) * 100, 2)}\%$ of the power.` }),
        P.manual({ label: "(f)", marks: 3, stem: "State three causes of energy loss in the real transformers used, and how each is reduced.", points: ["Eddy currents in the core: laminated core.", "Resistance (I²R) of the windings: thick copper wire.", "Hysteresis (repeated magnetisation of the core): soft iron core; or flux leakage: coils wound on top of each other on a closed core."], modelAnswer: "Eddy currents in the core are reduced by laminating it; heating in the windings is reduced by using thick copper wire; hysteresis losses are reduced by using a magnetically soft core (and flux leakage by winding the coils over one another on a closed core)." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why alternating current, not direct current, is used for this system.", points: ["Transformers work only with a changing current (changing flux).", "So a.c. allows the voltage to be stepped up for transmission and down for safe use efficiently."], modelAnswer: "Transformers need a changing current to produce a changing flux, so only a.c. lets the voltage be stepped up for transmission and back down for use, simply and efficiently." }),
      ],
      explanation: "High-voltage transmission cuts the current and so the I²R loss.",
      hints: ["I = P/V, then loss = I²R."],
    });
    chk(lossDirect > P0 ? 1 : 0, 1);
  }
  // Practice structured: measuring transformer efficiency (8 marks)
  {
    const Vp = [230, 230, 230, 230], Ip = [0.062, 0.118, 0.171, 0.226];
    const Vs = [11.9, 11.7, 11.5, 11.3], Is = [1.00, 2.00, 3.00, 4.00];
    const eff = Vp.map((v, i) => (Vs[i] * Is[i]) / (v * Ip[i]) * 100);
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`Tatenda measures a step-down transformer at different loads:

${table([t`$V_p\,/\,\text{V}$`, t`$I_p\,/\,\text{A}$`, t`$V_s\,/\,\text{V}$`, t`$I_s\,/\,\text{A}$`], Vp.map((v, i) => [String(v), dpStr(Ip[i], 3), dpStr(Vs[i], 1), dpStr(Is[i], 2)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: t`Calculate the efficiency for $I_s = 3.00\ \text{A}$, as a percentage, to three significant figures.`, value: eff[2], unit: "%", wrong: [(Vs[2] * Is[2]) / (230 * 0.226) * 100], explanation: t`$\dfrac{11.5 \times 3.00}{230 \times 0.171} \times 100 = ${sfStr(eff[2], 3)}\%$.` }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the power wasted in the transformer for $I_s = 4.00\ \text{A}$, in W, to two significant figures.`, value: 230 * 0.226 - 11.3 * 4, sf: 2, unit: "W", wrong: [230 * 0.226], explanation: t`$230 \times 0.226 - 11.3 \times 4.00 = ${sfStr(230 * 0.226, 3)} - ${sfStr(11.3 * 4, 3)} = ${sfStr(230 * 0.226 - 11.3 * 4, 2)}\ \text{W}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Suggest why the secondary voltage falls as the load current increases.", points: ["The secondary winding has resistance, so there is a p.d. IsR across it ('lost volts').", "This grows with the current, so less p.d. is left across the load (flux leakage also increases)."], modelAnswer: "The secondary winding has resistance, so part of the induced e.m.f. is dropped across the winding itself; this p.d. IR grows with the load current, leaving a smaller terminal voltage." }),
        P.manual({ label: "(d)", marks: 2, stem: "State a safety precaution when making measurements on the primary side of a mains transformer, with a reason.", points: ["Do not touch the primary terminals / use insulated, shrouded connectors and an RCD; switch off at the mains before changing connections.", "Reason: 230 V mains can give a fatal electric shock."], modelAnswer: "Use fully insulated, shrouded connections with the transformer in an enclosure, and switch off at the mains before altering any connection, because a 230 V shock can be fatal." }),
      ],
      explanation: "Efficiency = VsIs/(VpIp); the difference is power lost as heat.",
      hints: ["Power = VI on each side."],
    });
  }

  b.card("DEFINITION", "**Transformer**", "Primary and secondary coils on a common laminated soft-iron core, used to change an alternating voltage.");
  b.card("FORMULA", "Ideal transformer", t`$\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p} = \dfrac{I_p}{I_s}$`);
  b.card("CONCEPT", "How a transformer works", "Alternating primary current → alternating flux in core → changing flux linkage in secondary → induced e.m.f.");
  b.card("CONCEPT", "Why not d.c.?", "Steady current → constant flux → no change of flux linkage → no induced e.m.f.");
  b.card("CONCEPT", "Transformer losses", "Winding resistance (thick wire), eddy currents (laminations), hysteresis (soft iron), flux leakage (closed core, coils wound together).");
  b.card("FORMULA", "Efficiency", t`$\eta = \dfrac{V_sI_s}{V_pI_p} \times 100\%$`);
  b.card("FORMULA", "Cable loss", t`$P_{\text{loss}} = I^2R = \left(\dfrac{P}{V}\right)^2R$`);
  b.card("CONCEPT", "Why high-voltage transmission", "Same power at higher V needs smaller I; loss I²R falls as I², so far less energy is wasted.");
  b.card("CONCEPT", "The grid", "Generator → step-up transformer → high-voltage lines → substations step down → distribution → 230 V to homes.");
});
