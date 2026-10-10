// W2b: aphys.circuits.kirchhoff-problems — multi-source / multi-loop networks, sign conventions, negative currents,
// energy balance, real meters (loading).
import { concept, P, t, chk, sfStr, dpStr, sciTex, pctUnc, parallelR } from "../lib.mjs";

// Two nodes joined by branches, each an e.m.f. E (positive terminal towards the top node) in series with R.
// Returns the top-node potential V and the upward current in each branch.
function twoNode(branches) {
  const V = branches.reduce((s, [E, R]) => s + E / R, 0) / branches.reduce((s, [, R]) => s + 1 / R, 0);
  return { V, I: branches.map(([E, R]) => (E - V) / R) };
}

concept("aphys.circuits.kirchhoff-problems", { file: "circuits/kirchhoff-problems", keyPrefix: "circuits.kirchhoff-problems" }, (b) => {
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A network has three branches between two junctions, so there are three unknown branch currents. Which set of equations is needed to find them?",
    options: [
      ["One junction equation and two independent loop equations", "Correct: three independent equations for three unknowns."],
      ["Three junction equations and no loop equations", "With only two junctions, there is only one independent junction equation."],
      ["Three loop equations and no junction equation", "Only two of the loops are independent; the third adds nothing new."],
      ["One loop equation and two junction equations", "The two junction equations are the same equation; a second loop is needed."],
    ],
    answer: "A",
    explanation: "Two junctions give one independent first-law equation; two independent loops give two second-law equations. Three equations solve three unknowns.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Solving a circuit with Kirchhoff's laws gives a branch current of −0.35 A. What does the negative sign show?",
    options: [
      ["The current is 0.35 A in the opposite direction to the one assumed.", "Correct: the magnitude is right; only the assumed direction was wrong."],
      ["The calculation contains an error, because currents cannot be negative.", "A negative result is a valid answer, not an error."],
      ["The current in that branch is 0.35 A smaller than in the other branches.", "The sign gives direction relative to the assumption, not a comparison."],
      ["The branch contains a source that is supplying 0.35 A to the circuit.", "If anything, a current against a source's e.m.f. means the source is being charged."],
    ],
    answer: "A",
    explanation: "Directions are assumed at the start. A negative answer means the actual current flows the other way, with magnitude 0.35 A.",
  });
  {
    const E1 = 5.0, E2 = 1.5, r = 0.4, R = 2.7;
    const I = (E1 - E2) / (R + 2 * r);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`A $5.0\ \text{V}$ battery and a $1.5\ \text{V}$ cell, each of internal resistance $0.40\ \Omega$, are connected in series so that their e.m.f.s oppose. The pair is connected to a $2.7\ \Omega$ resistor. What is the current?`,
      options: [
        [`${sfStr(I, 2)} A`, "Correct: net e.m.f. 3.5 V across total resistance 3.5 Ω."],
        [`${sfStr((E1 + E2) / (R + 2 * r), 2)} A`, "This adds the e.m.f.s although the cells oppose."],
        [`${sfStr((E1 - E2) / R, 2)} A`, "This ignores the internal resistances."],
        [`${sfStr((E1 - E2) / (R + r), 2)} A`, "Both internal resistances are in the loop, even for the reversed cell."],
      ],
      answer: "A",
      explanation: t`Net e.m.f. $= 5.0 - 1.5 = 3.5\ \text{V}$; total resistance $= 2.7 + 0.40 + 0.40 = 3.5\ \Omega$; $I = ${sfStr(I, 2)}\ \text{A}$.`,
      hints: ["Opposing e.m.f.s subtract; resistances always add."],
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Four identical cells, each of e.m.f. E and internal resistance r, are connected in parallel (all positive terminals joined). What are the e.m.f. and internal resistance of the combination?",
    options: [
      [t`$E$ and $r/4$`, "Correct: the same e.m.f.; four internal resistances in parallel."],
      [t`$4E$ and $4r$`, "This is the series combination."],
      [t`$E$ and $4r$`, "Internal resistances in parallel combine to a smaller value."],
      [t`$E/4$ and $r/4$`, "Each cell has e.m.f. E across the same two points, so the e.m.f. is E."],
    ],
    answer: "A",
    explanation: "In parallel, identical cells keep the e.m.f. E; their internal resistances are in parallel, giving r/4, so the combination can supply a larger current.",
    hints: ["What is the p.d. across the combination when no current flows?"],
  });
  {
    const Vs = 12, Ra = 60e3, Rb = 60e3, Rm = 120e3;
    const Rp = parallelR(Rb, Rm);
    const Vread = (Vs * Rp) / (Ra + Rp);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`Two $60\ \text{k}\Omega$ resistors are connected in series across a $12\ \text{V}$ supply. A voltmeter of resistance $120\ \text{k}\Omega$ is connected across one of them. What does the voltmeter read?`,
      options: [
        [`${sfStr(Vread, 2)} V`, "Correct: the meter in parallel lowers that section to 40 kΩ."],
        ["6.0 V", "This is the p.d. with an ideal voltmeter; this meter draws current."],
        [`${sfStr((Vs * Rm) / (Ra + Rm), 2)} V`, "This treats the meter as replacing the resistor, not in parallel with it."],
        [`${sfStr((Vs * Ra) / (Ra + Rp), 2)} V`, "This is the p.d. across the other resistor."],
      ],
      answer: "A",
      explanation: t`$60\ \text{k}\Omega \parallel 120\ \text{k}\Omega = 40\ \text{k}\Omega$. Reading $= 12 \times \dfrac{40}{60 + 40} = ${sfStr(Vread, 2)}\ \text{V}$.`,
      hints: ["Combine the meter with the resistor it is across."],
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An ammeter with a resistance of 0.5 Ω is used to measure the current in a circuit containing a 1.5 V cell of negligible internal resistance and a 1.0 Ω resistor. Which statement is correct?",
    options: [
      ["It reads 1.0 A, a third less than the 1.5 A that flows without it.", "Correct: I = 1.5/(1.0 + 0.5)."],
      ["It reads 1.5 A, because an ammeter does not affect the circuit.", "Only an ideal (zero-resistance) ammeter leaves the current unchanged."],
      ["It reads 3.0 A, because its resistance is in parallel with the resistor.", "An ammeter is connected in series, so its resistance adds."],
      ["It reads 1.0 A, which is the current that flows when it is removed.", "Removing the meter removes its resistance, so the current rises to 1.5 A."],
    ],
    answer: "A",
    explanation: "In series, total resistance = 1.5 Ω, so I = 1.0 A. Without the meter, I = 1.5 A. A good ammeter's resistance must be much smaller than the circuit's.",
    hints: ["An ammeter is in series: add its resistance."],
  });
  {
    const br = [[12, 3.0], [7.5, 1.5], [0, 9.0]];
    const s = twoNode(br);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Three branches connect points X and Y. Branch 1: a $12\ \text{V}$ battery (positive terminal towards X) in series with $3.0\ \Omega$. Branch 2: a $7.5\ \text{V}$ battery (positive terminal towards X) in series with $1.5\ \Omega$. Branch 3: a $9.0\ \Omega$ resistor. The batteries have negligible internal resistance. Calculate the current in the $7.5\ \text{V}$ battery, in A, and state its direction.`,
      value: Math.abs(s.I[1]), sf: 2, unit: "A", wrong: [7.5 / 10.5, 7.5 / 1.5],
      explanation: t`1. Let $V$ be the potential of X above Y. First law at X: $\dfrac{12 - V}{3.0} + \dfrac{7.5 - V}{1.5} = \dfrac{V}{9.0}$.
2. Multiply by 9: $3(12 - V) + 6(7.5 - V) = V$, so $81 = 10V$ and $V = ${sfStr(s.V, 2)}\ \text{V}$.
3. Branch 2: $I_2 = \dfrac{7.5 - ${sfStr(s.V, 2)}}{1.5} = ${dpStr(s.I[1], 2)}\ \text{A}$.
4. Negative: a current of $${sfStr(Math.abs(s.I[1]), 2)}\ \text{A}$ flows into the positive terminal of the 7.5 V battery, charging it. (Branch 1 carries $${sfStr(s.I[0], 3)}\ \text{A}$ and the 9.0 Ω resistor $${sfStr(s.I[2] * -1, 3)}\ \text{A}$.)`,
      hints: ["Call the potential of X above Y V and write each branch current in terms of V.", "Use the first law at X."],
    });
    chk(s.V, 8.1, 1e-9);
  }
  {
    const E1 = 18, r1 = 2.0, E2 = 12, r2 = 0.4;
    const I = (E1 - E2) / (r1 + r2);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A solar panel of e.m.f. $18\ \text{V}$ and internal resistance $2.0\ \Omega$ charges a $12\ \text{V}$ battery of internal resistance $0.40\ \Omega$ (positive terminal to positive terminal). Calculate the charging current, in A, to two significant figures.`,
      value: I, sf: 2, unit: "A", wrong: [(E1 + E2) / (r1 + r2), E1 / (r1 + r2)],
      explanation: t`The e.m.f.s oppose round the loop: net $= 18 - 12 = 6\ \text{V}$; total resistance $= 2.4\ \Omega$; $I = 6/2.4 = ${sfStr(I, 2)}\ \text{A}$.`,
      hints: ["Positive to positive: the e.m.f.s oppose."],
    });
  }
  {
    const E1 = 20, r1 = 1.5, E2 = 12, r2 = 0.5;
    const I = (E1 - E2) / (r1 + r2);
    b.num({
      d: 3, skill: "ANALYSIS", calculator: true,
      stem: t`A larger panel of e.m.f. $20\ \text{V}$ and internal resistance $1.5\ \Omega$ charges a $12\ \text{V}$ battery of internal resistance $0.50\ \Omega$, positive to positive. Calculate the percentage of the power produced by the panel's e.m.f. that is stored as chemical energy in the battery, to two significant figures.`,
      value: ((E2 * I) / (E1 * I)) * 100, sf: 2, unit: "%", wrong: [((E2 * I + I * I * r2) / (E1 * I)) * 100],
      explanation: t`$I = \dfrac{20 - 12}{1.5 + 0.50} = ${sfStr(I, 2)}\ \text{A}$. Panel power $= E_1I = ${sfStr(E1 * I, 2)}\ \text{W}$. Stored $= E_2I = ${sfStr(E2 * I, 2)}\ \text{W}$. Percentage $= ${sfStr(((E2 * I) / (E1 * I)) * 100, 2)}\%$. The rest, $I^2(r_1 + r_2) = ${sfStr(I * I * (r1 + r2), 2)}\ \text{W}$, heats the internal resistances.`,
      hints: ["Find the current first.", "Power into chemical energy = E₂I."],
    });
  }
  {
    const Vs = 9.0, R = 47e3, Rm = 20e3;
    const Rp = parallelR(R, Rm);
    const V = (Vs * Rp) / (R + Rp);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Two $47\ \text{k}\Omega$ resistors are connected in series across a $9.0\ \text{V}$ supply of negligible internal resistance. A voltmeter of resistance $20\ \text{k}\Omega$ is connected across one of them. Calculate its reading, in V, to three significant figures.`,
      value: V, unit: "V", wrong: [4.5, (Vs * Rm) / (R + Rm)],
      explanation: t`$47 \parallel 20 = \dfrac{47 \times 20}{67} = ${sfStr(Rp / 1000, 3)}\ \text{k}\Omega$. Reading $= 9.0 \times \dfrac{${sfStr(Rp / 1000, 3)}}{47 + ${sfStr(Rp / 1000, 3)}} = ${sfStr(V, 3)}\ \text{V}$, less than half the true $4.50\ \text{V}$.`,
      hints: ["The meter is in parallel with the resistor it measures."],
    });
  }
  {
    const E = 1.5, R = 2.0, Ra = 0.25;
    const err = ((E / R - E / (R + Ra)) / (E / R)) * 100;
    b.calc({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`A $1.5\ \text{V}$ cell of negligible internal resistance drives current through a $2.0\ \Omega$ resistor. An ammeter of resistance $0.25\ \Omega$ is inserted to measure the current. Calculate the percentage by which the reading is lower than the current without the ammeter, to two significant figures.`,
      value: err, sf: 2, unit: "%", wrong: [(Ra / R) * 100],
      explanation: t`1. Without the meter: $I_0 = 1.5/2.0 = ${E / R}\ \text{A}$.
2. With it: $I = 1.5/2.25 = ${sfStr(E / (R + Ra), 3)}\ \text{A}$.
3. Percentage lower $= \dfrac{${E / R} - ${sfStr(E / (R + Ra), 3)}}{${E / R}} \times 100 = ${sfStr(err, 2)}\%$ (equal to $R_A/(R + R_A)$). Using $R_A/R$ gives 12.5%.`,
      hints: ["Find the current with and without the ammeter."],
    });
  }
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "An ideal voltmeter has zero resistance.",
    answer: false,
    explanation: "False. An ideal voltmeter has infinite resistance so that it draws no current; an ideal ammeter has zero resistance.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its description.",
    pairs: [
      ["junction", "a point where three or more conductors meet"],
      ["loop", "any closed path round a circuit"],
      ["ideal ammeter", "a meter with zero resistance"],
      ["ideal voltmeter", "a meter with infinite resistance"],
    ],
    explanation: "Junctions use the first law; loops use the second law; ideal meters do not disturb the circuit.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the sign convention for a loop equation.",
    template: "Going round the loop, an e.m.f. is counted as positive when you pass through the source from its {{blank:a}} terminal to its {{blank:b}} terminal. A p.d. IR is counted as positive when your direction is the {{blank:c}} as the assumed current in that resistor.",
    blanks: [
      { id: "a", accepted: ["negative"], choices: ["negative", "positive"] },
      { id: "b", accepted: ["positive"], choices: ["negative", "positive"] },
      { id: "c", accepted: ["same"], choices: ["same", "opposite"] },
    ],
    explanation: "Σ E = Σ IR with consistent signs; any consistent convention works, but it must not change half-way round.",
    hints: ["Passing from − to + raises the potential."],
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a solved network, current flows into the positive terminal of one of the batteries. What is happening to that battery?",
    accepted: ["it is being charged", "being charged", "charging", "it is charging", "the battery is being charged"],
    keywords: { any: ["charg"] },
    explanation: "A current driven into the positive terminal (against its e.m.f.) means the battery is being **charged**: electrical energy is transferred to chemical energy in it.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a voltmeter of resistance 10 kΩ gives a misleading reading when connected across a 100 kΩ resistor in a circuit.",
    points: [
      "The voltmeter is in parallel with the resistor, so the combined resistance of that section falls (to about 9 kΩ).",
      "That section now takes a smaller share of the supply p.d. (and the current in the circuit changes).",
      "So the reading is much lower than the p.d. without the meter; a voltmeter's resistance should be much larger than the resistance it measures.",
    ],
    modelAnswer: "The 10 kΩ meter in parallel with the 100 kΩ resistor gives a combined resistance of only about 9 kΩ, so that part of the circuit takes a far smaller share of the supply p.d. The meter therefore reads much less than the p.d. that exists when it is removed. A voltmeter must have a resistance much greater than the resistance it is connected across.",
    explanation: "Meter loading lowers the parallel resistance.",
    hints: ["What is the resistance of the resistor and meter together?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A 12 V battery of internal resistance 0.80 Ω and a 9.0 V battery of internal resistance 0.60 Ω are connected in parallel (positive to positive) across a 5.0 Ω resistor. Write down, with labelled currents, the junction equation and two loop equations you would use to find the currents. Do not solve them.",
    points: [
      "Currents labelled, e.g. I₁ out of the 12 V battery, I₂ out of the 9.0 V battery, I₃ through the 5.0 Ω resistor.",
      "Junction: I₁ + I₂ = I₃.",
      "Loop with the 12 V battery and resistor: 12 = 0.80 I₁ + 5.0 I₃.",
      "Loop with the 9.0 V battery and resistor: 9.0 = 0.60 I₂ + 5.0 I₃ (or the loop through both batteries: 12 − 9.0 = 0.80 I₁ − 0.60 I₂).",
    ],
    modelAnswer: "Let I₁ leave the positive terminal of the 12 V battery, I₂ leave the positive terminal of the 9.0 V battery and I₃ pass through the 5.0 Ω resistor. Junction: I₁ + I₂ = I₃. Loop (12 V battery and resistor): 12 = 1.0I₁ + 5.0I₃. Loop (9.0 V battery and resistor): 9.0 = 0.60I₂ + 5.0I₃.",
    explanation: "Three unknowns need one junction and two loop equations.",
    hints: ["Each loop contains one battery and the resistor."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Describe how an energy balance can be used to check the solution of a network containing two batteries.",
    points: [
      "Calculate the power supplied by each source (EI), counting a battery being charged as taking in power.",
      "Calculate the total power dissipated in all the resistances (I²R for each, including internal resistances).",
      "If the solution is correct, the net power from the sources equals the total power dissipated.",
    ],
    modelAnswer: "Work out EI for each battery, taking a battery that is being charged as absorbing power, and add them to find the net power supplied. Then add I²R for every resistance, including internal resistances. Energy conservation means the two totals must be equal; if they are not, there is an error.",
    explanation: "Power in = power out, by conservation of energy.",
    hints: ["Use conservation of energy per second."],
  });

  // Practice structured: two batteries in parallel supplying a lamp (12 marks)
  {
    const br = [[9.0, 1.0], [6.0, 0.5], [0, 3.0]];
    const s = twoNode(br);
    const [I1, I2, I3n] = s.I;
    const I3 = -I3n;
    const Pin = 9.0 * I1 + 6.0 * I2;
    const Pdis = I1 * I1 * 1.0 + I2 * I2 * 0.5 + I3 * I3 * 3.0;
    chk(Pin, Pdis, 1e-9);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A $9.0\ \text{V}$ battery of internal resistance $1.0\ \Omega$ and a $6.0\ \text{V}$ battery of internal resistance $0.50\ \Omega$ are connected in parallel, positive terminal to positive terminal, across a $3.0\ \Omega$ resistor. Let $V$ be the p.d. across the resistor.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Write the currents from the two batteries and the current in the resistor in terms of V, and the equation linking them.", points: ["I₁ = (9.0 − V)/1.0, I₂ = (6.0 − V)/0.50, I₃ = V/3.0.", "First law: I₁ + I₂ = I₃."], modelAnswer: "I₁ = (9.0 − V)/1.0; I₂ = (6.0 − V)/0.50; I₃ = V/3.0; and I₁ + I₂ = I₃." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate V, in V, to three significant figures.", value: s.V, unit: "V", wrong: [7.5], explanation: t`$(9.0 - V) + 2(6.0 - V) = V/3.0$ gives $21 = 3.33V$, $V = ${sfStr(s.V, 3)}\ \text{V}$.` }),
        P.group({ label: "(c)", stem: "Calculate, in A, to three significant figures:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the current from the 9.0 V battery", value: I1, unit: "A", wrong: [9.0 / 5.0], explanation: t`$I_1 = 9.0 - ${sfStr(s.V, 3)} = ${sfStr(I1, 3)}\ \text{A}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the current in the 6.0 V battery (give its magnitude)", value: Math.abs(I2), unit: "A", wrong: [6.0 / 4.5], explanation: t`$I_2 = (6.0 - ${sfStr(s.V, 3)})/0.50 = ${dpStr(I2, 3)}\ \text{A}$: magnitude $${sfStr(Math.abs(I2), 3)}\ \text{A}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "the current in the resistor", value: I3, unit: "A", wrong: [I1], explanation: t`$I_3 = ${sfStr(s.V, 3)}/3.0 = ${sfStr(I3, 3)}\ \text{A}$; check $${sfStr(I1, 3)} ${I2 < 0 ? "-" : "+"} ${sfStr(Math.abs(I2), 3)} = ${sfStr(I3, 3)}$.` }),
        ] }),
        P.manual({ label: "(d)", marks: 2, stem: "State what the sign of your answer to (c)(ii) tells you, and what is happening to the 6.0 V battery.", points: [I2 < 0 ? "Negative: the current flows into the positive terminal of the 6.0 V battery (opposite to the assumed direction)." : "Positive: the 6.0 V battery is supplying current.", I2 < 0 ? "So the 6.0 V battery is being charged by the 9.0 V battery." : "Both batteries supply the resistor."], modelAnswer: I2 < 0 ? "The current is negative, so it actually flows into the positive terminal of the 6.0 V battery: the 9.0 V battery is charging it." : "The current is positive: both batteries supply the resistor." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the total power dissipated in the three resistances, in W, to three significant figures, as a check.", value: Pdis, unit: "W", wrong: [I3 * I3 * 3.0], explanation: t`$${sfStr(I1, 3)}^2 \times 1.0 + ${sfStr(Math.abs(I2), 3)}^2 \times 0.50 + ${sfStr(I3, 3)}^2 \times 3.0 = ${sfStr(Pdis, 3)}\ \text{W}$, equal to $9.0I_1 + 6.0I_2 = ${sfStr(Pin, 3)}\ \text{W}$.` }),
        P.manual({ label: "(f)", marks: 1, stem: "Suggest why batteries of different e.m.f. should not be connected in parallel.", points: ["The higher-e.m.f. battery drives current through the lower one, wasting energy as heat (and possibly damaging it), even with no load connected."], modelAnswer: "The higher-e.m.f. battery would drive a current through the other one all the time, wasting energy in their internal resistances and possibly overcharging or damaging the weaker battery." }),
      ],
      explanation: "Node method: write each branch current in terms of V and apply the first law; check with an energy balance.",
      hints: ["Express each current in terms of V.", "Sum of currents into the top junction = current through the resistor."],
    });
  }
  // Practice structured: meter loading in an experiment (8 marks)
  {
    const Vs = 8.0, R = 1.0e6, Rm = 10e6;
    const Rp = parallelR(R, Rm);
    const Vread = (Vs * Rp) / (R + Rp);
    const err = ((4.0 - Vread) / 4.0) * 100;
    b.struct({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`Nyasha uses a digital voltmeter of resistance $10\ \text{M}\Omega$ to check the p.d. across one of two $1.0\ \text{M}\Omega$ resistors connected in series across a $8.0\ \text{V}$ supply of negligible internal resistance.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "State the p.d. across each resistor before the meter is connected, in V.", value: 4.0, dp: 1, unit: "V", wrong: [8.0], explanation: "Equal resistors in series share 8.0 V equally: 4.0 V." }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate the voltmeter's reading, in V, to three significant figures.", value: Vread, unit: "V", wrong: [4.0], explanation: t`$1.0 \parallel 10 = ${sfStr(Rp / 1e6, 3)}\ \text{M}\Omega$; reading $= 8.0 \times \dfrac{${sfStr(Rp / 1e6, 3)}}{1.0 + ${sfStr(Rp / 1e6, 3)}} = ${sfStr(Vread, 3)}\ \text{V}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage by which the reading is below the true p.d., to two significant figures.", value: err, sf: 2, unit: "%", wrong: [10], explanation: t`$\dfrac{4.0 - ${sfStr(Vread, 3)}}{4.0} \times 100 = ${sfStr(err, 2)}\%$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways of reducing this systematic error.", points: ["Use a voltmeter of much higher resistance (e.g. an electrometer, or ≥ 100 MΩ).", "Use a null method (potentiometer) that draws no current at balance, or use smaller resistors in the divider so the meter's resistance is relatively much larger."], modelAnswer: "Use a meter with a much higher resistance, or measure the p.d. with a null method such as a potentiometer, which draws no current at balance; alternatively use much smaller resistors so that the meter's resistance is relatively huge." }),
      ],
      explanation: "A voltmeter in parallel lowers the resistance of the section it measures, so it reads low.",
      hints: ["Combine the meter in parallel with the resistor."],
    });
  }

  b.card("CONCEPT", "Method for multi-loop circuits", "Label branch currents, use the first law at junctions, write one loop equation per remaining unknown, solve, check.");
  b.card("CONCEPT", "Sign convention in a loop", "E.m.f. positive when passed from − to + in the loop direction; IR positive when going with the assumed current.");
  b.card("CONCEPT", "Negative current in a solution", "The current flows opposite to the assumed direction; the magnitude is correct.");
  b.card("CONCEPT", "Battery being charged", "Current is driven into its positive terminal by a larger e.m.f.; electrical energy → chemical energy.");
  b.card("CONCEPT", "Energy balance check", "Net power from sources (ΣEI, with charging batteries counted as taking power) = total I²R dissipated.");
  b.card("FACT", "Ideal meters", "Ideal ammeter: zero resistance. Ideal voltmeter: infinite resistance.");
  b.card("CONCEPT", "Voltmeter loading", "A finite-resistance voltmeter in parallel lowers the resistance of that section, so it reads low; use R_meter ≫ R.");
  b.card("FACT", "Identical cells in parallel", "E.m.f. of one cell; internal resistance r/n.");
  b.card("FORMULA", "Opposing cells in series", "Net e.m.f. = E₁ − E₂; internal resistances still add.");
});
