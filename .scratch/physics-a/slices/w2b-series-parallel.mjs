// W2b: aphys.circuits.series-parallel — Kirchhoff's laws (conservation), series and parallel formulae, networks, sharing.
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, parallelR, seriesR } from "../lib.mjs";

concept("aphys.circuits.series-parallel", { file: "circuits/series-parallel", keyPrefix: "circuits.series-parallel" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Kirchhoff's first law is a consequence of the conservation of which quantity?",
    options: [
      ["Charge", "Correct: charge entering a junction per second equals charge leaving it."],
      ["Energy", "Energy conservation gives Kirchhoff's second law."],
      ["Current", "Current is not a conserved quantity in its own right; it is a rate of flow of charge."],
      ["Potential difference", "P.d. is not conserved; it is shared round a loop by the second law."],
    ],
    answer: "A",
    explanation: "The first law (sum of currents in = sum of currents out at a junction) expresses conservation of charge.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which statement of Kirchhoff's second law is correct?",
    options: [
      ["Round any closed loop, the sum of the e.m.f.s equals the sum of the p.d.s.", "Correct: conservation of energy per unit charge round a loop."],
      ["At any junction, the sum of the currents in equals the sum of the currents out.", "This is the first law."],
      ["Round any closed loop, the sum of the currents is zero.", "Currents are summed at junctions, not round loops."],
      ["In any circuit, the e.m.f. of the source equals the p.d. across each component.", "This is true only for components connected directly in parallel with an ideal source."],
    ],
    answer: "A",
    explanation: "Second law: Σ e.m.f. = Σ IR round any closed loop, a consequence of conservation of energy.",
  });
  {
    const R = parallelR(20, 30) + 8;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`Resistors of $20\ \Omega$ and $30\ \Omega$ are connected in parallel, and this combination is connected in series with an $8.0\ \Omega$ resistor. What is the total resistance?`,
      options: [
        [`${sfStr(R, 2)} Ω`, "Correct: 20 ∥ 30 = 12 Ω, plus 8.0 Ω."],
        ["58 Ω", "This adds all three as if they were in series."],
        [`${sfStr(parallelR(20, 30, 8), 2)} Ω`, "This puts all three in parallel."],
        [`${sfStr(1 / 20 + 1 / 30 + 8, 2)} Ω`, "This adds 1/Rₚ (0.083) to the 8.0 Ω instead of Rₚ: the sum of reciprocals was not inverted."],
      ],
      answer: "A",
      explanation: t`$\dfrac{1}{R_p} = \dfrac{1}{20} + \dfrac{1}{30} = \dfrac{1}{12}$, so $R_p = 12\ \Omega$; total $= 12 + 8.0 = ${sfStr(R, 2)}\ \Omega$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A further resistor is connected in parallel with an existing resistor in a circuit. What happens to the combined resistance of the pair?",
    options: [
      ["It decreases, whatever the value of the added resistor.", "Correct: an extra parallel path always lets more current flow for the same p.d."],
      ["It increases, because there is now more resistance in the circuit.", "Adding in parallel adds a path, lowering the total."],
      ["It decreases only if the added resistor is smaller than the existing one.", "Any parallel resistor lowers the combined value, even a very large one."],
      ["It stays the same if the two resistors are equal.", "Two equal resistors in parallel give half of one."],
    ],
    answer: "A",
    explanation: "1/R = 1/R₁ + 1/R₂ is larger than 1/R₁ for any positive R₂, so R is always less than R₁.",
  });
  {
    // current at a junction
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`At a junction, currents of $2.5\ \text{A}$ and $0.70\ \text{A}$ flow in along two wires, and $1.1\ \text{A}$ flows out along a third. A fourth wire is also connected. What is the current in the fourth wire?`,
      options: [
        ["2.1 A out of the junction", "Correct: 2.5 + 0.70 = 1.1 + I, so I = 2.1 A outwards."],
        ["2.1 A into the junction", "The incoming currents already exceed the outgoing one, so the extra current must leave."],
        ["4.3 A out of the junction", "This adds all three currents instead of balancing in against out."],
        ["2.9 A out of the junction", "This treats the 0.70 A wire as an outgoing current."],
      ],
      answer: "A",
      explanation: "Kirchhoff's first law: total in = total out. 2.5 + 0.70 = 3.2 A in; 1.1 A out, so 2.1 A must leave along the fourth wire.",
    });
  }
  {
    const R1 = 10, R2 = 40, V = 6.0;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`Resistors of $10\ \Omega$ and $40\ \Omega$ are connected in series to a $6.0\ \text{V}$ supply of negligible internal resistance. What is the p.d. across the $40\ \Omega$ resistor?`,
      options: [
        [`${sfStr((V * R2) / (R1 + R2), 2)} V`, "Correct: p.d. shared in proportion to resistance."],
        [`${sfStr((V * R1) / (R1 + R2), 2)} V`, "This is the p.d. across the 10 Ω resistor."],
        ["6.0 V", "In series the supply p.d. is shared, not applied in full to each."],
        [`${sfStr(V / 2, 2)} V`, "The p.d. is shared equally only when the resistances are equal."],
      ],
      answer: "A",
      explanation: t`$I = 6.0/50 = 0.12\ \text{A}$; $V_{40} = 0.12 \times 40 = ${sfStr((V * R2) / (R1 + R2), 2)}\ \text{V}$.`,
      hints: ["Find the current first, or share the p.d. in the ratio of the resistances."],
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Three identical lamps X, Y and Z are connected to a battery of negligible internal resistance: X is in series with a parallel pair formed by Y and Z. Lamp Z is then removed. What happens to the brightness of X and of Y?",
    options: [
      ["X becomes dimmer and Y becomes brighter.", "Correct: total resistance rises, so less current through X; the p.d. across Y rises."],
      ["X becomes brighter and Y becomes dimmer.", "Removing a parallel branch increases the total resistance, so the current through X falls."],
      ["Both X and Y become dimmer.", "Y now gets a larger share of the supply p.d."],
      ["X is unchanged and Y becomes brighter.", "The current through X changes because the total resistance changes."],
    ],
    answer: "A",
    explanation: "Before: Y∥Z = R/2, total 1.5R; X has 2/3 of the p.d., Y has 1/3. After: X and Y in series, each has 1/2. So X falls from 2/3 to 1/2 of the p.d. (dimmer) and Y rises from 1/3 to 1/2 (brighter).",
    hints: ["Work out the fraction of the supply p.d. across each lamp before and after."],
  });
  {
    const R = parallelR(seriesR(47, 33), 120);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $47\ \Omega$ resistor and a $33\ \Omega$ resistor are connected in series, and the pair is connected in parallel with a $120\ \Omega$ resistor. Calculate the combined resistance, in Ω, to three significant figures.`,
      value: R, unit: "Ω", wrong: [47 + 33 + 120, parallelR(47, 33, 120)],
      explanation: t`Series pair $= 47 + 33 = 80\ \Omega$. $R = \dfrac{80 \times 120}{80 + 120} = ${sfStr(R, 3)}\ \Omega$.`,
      hints: ["Combine the series pair first."],
    });
  }
  {
    const I = 2.1, R1 = 16, R2 = 8;
    const I1 = (I * R2) / (R1 + R2);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`A current of $2.1\ \text{A}$ divides between a $16\ \Omega$ resistor and an $8.0\ \Omega$ resistor connected in parallel. Calculate the current in the $16\ \Omega$ resistor, in A, to two significant figures.`,
      value: I1, sf: 2, unit: "A", wrong: [(I * R1) / (R1 + R2), I / 2],
      explanation: t`$I_{16} = 2.1 \times \dfrac{8.0}{16 + 8.0} = ${sfStr(I1, 2)}\ \text{A}$: the larger resistance takes the smaller share.`,
    });
  }
  {
    const E = 9.0, Ra = 3.0, Rb = 10, Rc = 40;
    const Rp = parallelR(Rb, Rc);
    const I = E / (Ra + Rp);
    const Vp = I * Rp;
    const Ic = Vp / Rc;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A $9.0\ \text{V}$ battery of negligible internal resistance is connected to a $3.0\ \Omega$ resistor in series with a parallel combination of $10\ \Omega$ and $40\ \Omega$. Calculate the current in the $40\ \Omega$ resistor, in A, to three significant figures.`,
      value: Ic, unit: "A", wrong: [E / Rc, I],
      explanation: t`1. $R_p = \dfrac{10 \times 40}{50} = ${Rp}\ \Omega$; total $= ${Ra + Rp}\ \Omega$.
2. $I = 9.0/${Ra + Rp} = ${sfStr(I, 4)}\ \text{A}$.
3. P.d. across the parallel pair $= ${sfStr(I, 4)} \times ${Rp} = ${sfStr(Vp, 3)}\ \text{V}$.
4. $I_{40} = ${sfStr(Vp, 3)}/40 = ${sfStr(Ic, 3)}\ \text{A}$.`,
      hints: ["Find the total resistance and total current.", "Then find the p.d. across the parallel pair."],
    });
  }
  {
    // n identical lamps in parallel each drawing power; find R of each
    const V = 12, n = 5, Itot = 2.5;
    const Reach = V / (Itot / n);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`Five identical lamps are connected in parallel to a $12\ \text{V}$ supply on a bus. The total current from the supply is $2.5\ \text{A}$. Calculate the resistance of each lamp, in Ω.`,
      value: Reach, unit: "Ω", wrong: [V / Itot, (V / Itot) / n],
      explanation: t`Each lamp has the full $12\ \text{V}$ and carries $2.5/5 = ${Itot / n}\ \text{A}$, so $R = 12/${Itot / n} = ${Reach}\ \Omega$. ($12/2.5 = 4.8\ \Omega$ is the combined resistance.)`,
      hints: ["What is the p.d. across each lamp in parallel?"],
    });
  }
  {
    // resistor needed to make combined value
    const R1 = 150, Rt = 100;
    const R2 = 1 / (1 / Rt - 1 / R1);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A technician needs a resistance of $100\ \Omega$ but has only a $150\ \Omega$ resistor and a selection of others. What resistance must be connected in parallel with the $150\ \Omega$ resistor? Give your answer in Ω.`,
      value: R2, unit: "Ω", wrong: [Rt - R1, R1 - Rt],
      explanation: t`1. $\dfrac{1}{100} = \dfrac{1}{150} + \dfrac{1}{R}$.
2. $\dfrac{1}{R} = 0.0100 - 0.00667 = 0.00333\ \Omega^{-1}$.
3. $R = ${sfStr(R2, 3)}\ \Omega$. Check: $\dfrac{150 \times 300}{450} = 100\ \Omega$.`,
      hints: ["Rearrange 1/R = 1/R₁ + 1/R₂."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When two unequal resistors are connected in parallel, the larger current flows through the smaller resistor.",
    answer: true,
    explanation: "True. Both have the same p.d., so I = V/R is larger for the smaller resistance.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Four identical resistors, each of resistance R, are arranged in different ways. Match each arrangement with its combined resistance.",
    pairs: [
      ["all four in series", "4R"],
      ["all four in parallel", "R/4"],
      ["three in parallel, then in series with the fourth", "4R/3"],
      ["three in series, then in parallel with the fourth", "3R/4"],
    ],
    explanation: "Series adds; parallel of n equal resistors gives R/n. R/3 + R = 4R/3; (3R × R)/(4R) = 3R/4.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the derivation for resistors in parallel.",
    template: "Each resistor has the same {{blank:a}} across it. By Kirchhoff's {{blank:b}} law the total current is the sum of the branch currents, so V/R = V/R₁ + V/R₂, and dividing by V gives 1/R = 1/R₁ + 1/R₂.",
    blanks: [
      { id: "a", accepted: ["p.d."], choices: ["p.d.", "current", "charge"] },
      { id: "b", accepted: ["first"], choices: ["first", "second"] },
    ],
    explanation: "Same p.d. in parallel; first law at the junction; substitute I = V/R.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Kirchhoff's second law is a consequence of the conservation of which quantity?",
    accepted: ["energy", "conservation of energy"],
    explanation: "**Energy**: each coulomb gains as much energy from the e.m.f.s as it transfers in the p.d.s round a loop.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Use Kirchhoff's laws to derive the formula for the combined resistance R of three resistors R₁, R₂ and R₃ connected in series.",
    points: [
      "The same current I passes through each resistor (no junctions; first law).",
      "By the second law, the total p.d. V = V₁ + V₂ + V₃.",
      "Substituting V = IR: IR = IR₁ + IR₂ + IR₃.",
      "Dividing by I: R = R₁ + R₂ + R₃.",
    ],
    modelAnswer: "In series the current I is the same in every resistor. By Kirchhoff's second law the total p.d. is V = V₁ + V₂ + V₃. Writing each as IR gives IR = IR₁ + IR₂ + IR₃, and dividing by I gives R = R₁ + R₂ + R₃.",
    explanation: "Same current; p.d.s add; substitute and cancel I.",
    hints: ["What is the same for every resistor in series?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain, in terms of charge and energy, why Kirchhoff's two laws hold.",
    points: [
      "Charge is conserved and does not accumulate at a junction, so the charge flowing in per second equals that flowing out: first law.",
      "Energy is conserved: a unit charge going once round a loop returns to the same potential.",
      "So the energy gained per unit charge from e.m.f.s equals the energy transferred per unit charge in p.d.s: second law.",
    ],
    modelAnswer: "Charge cannot be created, destroyed or stored at a junction, so the rate at which charge enters equals the rate at which it leaves: the first law. A charge travelling round a closed loop returns to its starting potential, so by conservation of energy the energy it gains from the e.m.f.s must equal the energy it gives up across the components: the second law.",
    explanation: "First law: charge. Second law: energy.",
    hints: ["Which conservation law applies to each?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the lights and sockets in a house are connected in parallel rather than in series.",
    points: [
      "In parallel each appliance receives the full mains p.d., for which it is designed.",
      "Each can be switched on or off independently without affecting the others.",
      "If one appliance fails (open circuit), the others keep working; in series all would go off, and the p.d. per appliance would change as others were added.",
    ],
    modelAnswer: "In parallel every appliance has the full supply p.d., so it works at its rated power, and each has its own switch so it can be used independently. A fault that breaks one branch leaves the others working, whereas in series one break would switch everything off and the p.d. across each appliance would depend on what else was connected.",
    explanation: "Same p.d., independent control, fault tolerance.",
    hints: ["Compare the p.d. across each appliance in the two arrangements."],
  });

  // Practice structured: a ladder network (12 marks)
  {
    const E = 12, R1 = 4.0, R2 = 12, R3 = 3.0, R4 = 3.0;
    const R34 = seriesR(R3, R4);
    const Rp = parallelR(R2, R34);
    const Rt = R1 + Rp;
    const I = E / Rt;
    const Vp = I * Rp;
    const I2 = Vp / R2, I34 = Vp / R34;
    const Ptot = E * I;
    chk(I2 + I34, I, 1e-9);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A $12\ \text{V}$ battery of negligible internal resistance is connected in series with a $4.0\ \Omega$ resistor P. After P, the circuit divides into two parallel branches that rejoin before returning to the battery: branch 1 is a $12\ \Omega$ resistor Q; branch 2 is two $3.0\ \Omega$ resistors S and T in series.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the total resistance of the circuit, in Ω.", value: Rt, unit: "Ω", wrong: [R1 + R2 + R3 + R4], explanation: t`Branch 2 $= 6.0\ \Omega$; $Q \parallel (S + T) = \dfrac{12 \times 6.0}{18} = ${Rp}\ \Omega$; total $= 4.0 + ${Rp} = ${Rt}\ \Omega$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the current from the battery, in A, to three significant figures.", value: I, unit: "A", wrong: [E / R1], explanation: t`$I = 12/${Rt} = ${sfStr(I, 3)}\ \text{A}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the p.d. across Q, in V, to three significant figures.", value: Vp, unit: "V", wrong: [E - Vp], explanation: t`$V = IR_p = ${sfStr(I, 4)} \times ${Rp} = ${sfStr(Vp, 3)}\ \text{V}$ (P takes the remaining $${sfStr(E - Vp, 3)}\ \text{V}$).` }),
        P.group({ label: "(d)", stem: "Calculate, in A, to three significant figures, the current in:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "Q", value: I2, unit: "A", wrong: [I / 2], explanation: t`$${sfStr(Vp, 3)}/12 = ${sfStr(I2, 3)}\ \text{A}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "S", value: I34, unit: "A", wrong: [Vp / R3], explanation: t`$${sfStr(Vp, 3)}/6.0 = ${sfStr(I34, 3)}\ \text{A}$; check $${sfStr(I2, 3)} + ${sfStr(I34, 3)} = ${sfStr(I, 3)}\ \text{A}$.` }),
        ] }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the total power supplied by the battery, in W, to three significant figures.", value: Ptot, unit: "W", wrong: [(E * E) / R1], explanation: t`$P = EI = 12 \times ${sfStr(I, 4)} = ${sfStr(Ptot, 3)}\ \text{W}$.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Resistor T is short-circuited by a wire. State and explain the effect on the current from the battery and on the p.d. across Q.", points: ["Branch 2 resistance falls from 6.0 Ω to 3.0 Ω, so the parallel (and total) resistance falls.", "The current from the battery increases.", "More p.d. is now across P (IR₁ rises), so the p.d. across Q decreases."], modelAnswer: "Shorting T reduces branch 2 to 3.0 Ω, so the parallel combination and the total resistance fall and the battery current rises. The p.d. across P (= I × 4.0 Ω) increases, so the p.d. left across the parallel section, and across Q, decreases." }),
      ],
      explanation: "Reduce the network, find the total current, then share the p.d. and current.",
      hints: ["Combine S and T first.", "Q is in parallel with S + T."],
    });
  }
  // Practice structured: measuring a combined resistance with uncertainty (8 marks)
  {
    const R1 = 220, d1 = 0.02, R2 = 330, d2 = 0.02;
    const Rs = R1 + R2;
    const dRs = R1 * d1 + R2 * d2;
    const Rp = parallelR(R1, R2);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Rudo has two resistors marked $220\ \Omega \pm 2\%$ and $330\ \Omega \pm 2\%$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate their combined resistance in series, in Ω.", value: Rs, unit: "Ω", wrong: [Rp], explanation: t`$220 + 330 = ${Rs}\ \Omega$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the absolute uncertainty in the series combination, in Ω, to two significant figures.", value: dRs, sf: 2, unit: "Ω", wrong: [d1 * R1], explanation: t`Absolute uncertainties add for a sum: $0.02 \times 220 + 0.02 \times 330 = 4.4 + 6.6 = ${sfStr(dRs, 2)}\ \Omega$ (still 2%).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate their combined resistance in parallel, in Ω.", value: Rp, unit: "Ω", wrong: [Rs, 1 / (1 / R1 + 1 / R2) / 2], explanation: t`$\dfrac{220 \times 330}{550} = ${sfStr(Rp, 3)}\ \Omega$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "She measures the parallel combination with an ohmmeter and obtains 131 Ω. Discuss whether this is consistent with the markings.", points: ["If both resistors are 2% low or high, the parallel value is also 2% from 132 Ω (the formula scales with R).", "So the expected range is about 129 Ω to 135 Ω.", "131 Ω lies inside this range, so the measurement is consistent with the markings (the ohmmeter's own uncertainty also helps)."], modelAnswer: "If both resistors are 2% low the parallel value is 2% below 132 Ω, about 129 Ω; if both are 2% high it is about 135 Ω. The reading of 131 Ω lies within 129-135 Ω, so it is consistent with the stated tolerances." }),
      ],
      explanation: "Series: values and absolute uncertainties add; the parallel value scales with the resistors.",
      hints: ["For a sum, add the absolute uncertainties."],
    });
    chk(Math.round(Rp), 132);
  }

  b.card("DEFINITION", "**Kirchhoff's first law**", "The sum of the currents entering a junction equals the sum leaving it (conservation of charge).");
  b.card("DEFINITION", "**Kirchhoff's second law**", "Round any closed loop, the sum of the e.m.f.s equals the sum of the p.d.s (conservation of energy).");
  b.card("FORMULA", "Resistors in series", t`$R = R_1 + R_2 + R_3 + \dots$`);
  b.card("FORMULA", "Resistors in parallel", t`$\dfrac{1}{R} = \dfrac{1}{R_1} + \dfrac{1}{R_2} + \dots$; for two: $R = \dfrac{R_1R_2}{R_1 + R_2}$`);
  b.card("CONCEPT", "Sharing in series", "Same current; p.d. shared in proportion to resistance.");
  b.card("CONCEPT", "Sharing in parallel", "Same p.d.; current shared in inverse proportion to resistance (smaller R takes more current).");
  b.card("FORMULA", "Current divider (two branches)", t`$I_1 = I\dfrac{R_2}{R_1 + R_2}$`);
  b.card("FACT", "n identical resistors R in parallel", "Combined resistance R/n.");
  b.card("CONCEPT", "Deriving the series formula", "Same I in each; V = V₁ + V₂ (2nd law); IR = IR₁ + IR₂; cancel I.");
});
