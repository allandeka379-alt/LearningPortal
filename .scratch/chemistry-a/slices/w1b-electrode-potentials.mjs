// W1b: achem.electrochem.electrode-potentials
import { concept, P, t, ce, ecell, dpStr, chk } from "../lib.mjs";

const v2 = (x) => (x < 0 ? `−${dpStr(-x, 2)}` : `+${dpStr(x, 2)}`);

concept("achem.electrochem.electrode-potentials", { file: "electrochem/electrode-potentials", keyPrefix: "electrochem.electrode-potentials" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which conditions are used in the standard hydrogen electrode?",
    options: [
      ["H₂ at 101 kPa, [H⁺] = 1.00 mol dm⁻³, 298 K, platinum electrode", "Correct: these are the standard conditions with an inert, catalytic platinum electrode."],
      ["H₂ at 101 kPa, [H⁺] = 1.00 mol dm⁻³, 273 K, copper electrode", "Standard temperature is 298 K and the electrode must be platinum."],
      ["H₂ at 1 kPa, [H⁺] = 0.100 mol dm⁻³, 298 K, platinum electrode", "Both the pressure and the concentration are non-standard."],
      ["H₂ at 101 kPa, pure water, 298 K, platinum electrode", "Pure water has [H⁺] = 1.0 × 10⁻⁷ mol dm⁻³, not 1.00 mol dm⁻³."],
    ],
    answer: "A",
    explanation: "SHE: hydrogen gas at 101 kPa over platinum (black) in 1.00 mol dm⁻³ H⁺(aq) at 298 K; E⦵ = 0.00 V by definition.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: t`Why is a platinum electrode used in the half-cell $\ce{Fe^3+(aq) + e- <=> Fe^2+(aq)}$?`,
    options: [
      ["No metal is in the half-equation, so an inert conductor is needed.", "Correct: platinum carries electrons to and from the ions without reacting."],
      ["Platinum reduces the Fe³⁺ ions all the way to iron metal.", "Platinum is inert; the half-reaction is between Fe³⁺ and Fe²⁺ only."],
      ["Platinum keeps both ions at 1.00 mol dm⁻³ during the reading.", "The concentrations are set when the solution is made, not by the electrode."],
      ["An iron electrode would always make the cell potential zero.", "An iron electrode would react with Fe³⁺, setting up a different equilibrium."],
    ],
    answer: "A",
    explanation: "When both species are ions (or a gas and an ion), electrons must be transferred at an unreactive conducting surface: platinum.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the salt bridge in an electrochemical cell are correct?\n\n1. Electrons flow through it from the negative to the positive electrode.\n2. It completes the circuit by allowing ions to move between the two solutions.\n3. It is often filter paper soaked in saturated potassium nitrate solution.",
    options: [
      ["1, 2 and 3", "Statement 1 is false: electrons cannot travel through a solution."],
      ["2 and 3 only", "Correct: ions carry the charge through the salt bridge; electrons travel only through the wire."],
      ["1 and 2 only", "Statement 1 is false, and statement 3 is true."],
      ["1 only", "Statement 1 is the false one; 2 and 3 are true."],
    ],
    answer: "B",
    hints: ["What carries charge in a solution?"],
    explanation: "The salt bridge lets ions flow to balance charge without mixing the solutions. KNO₃ is chosen because nitrates are soluble, so no precipitates form. Electrons only move through the metal wire.",
  });
  {
    const v = ecell(0.80, -0.25);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`A cell is made from the half-cells $\ce{Ni^2+/Ni}$ (E⦵ = −0.25 V) and $\ce{Ag+/Ag}$ (E⦵ = +0.80 V). What is the standard cell potential?`,
      options: [
        [`${dpStr(v, 2)} V`, "Correct: +0.80 − (−0.25)."],
        [`${dpStr(0.80 - 0.25, 2)} V`, "This subtracts 0.25 instead of −0.25."],
        [`${dpStr(2 * 0.80 + 0.25, 2)} V`, "E⦵ values are not doubled when the silver half-equation is multiplied by two."],
        [`${dpStr(-0.25 - 0.80, 2)} V`, "This is negative minus positive; a cell potential is positive minus negative."],
      ],
      answer: "A",
      explanation: `E⦵cell = E⦵(positive) − E⦵(negative) = 0.80 − (−0.25) = ${dpStr(v, 2)} V. The silver electrode is positive.`,
    });
  }
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`Use these values to choose the strongest oxidising agent.

| Half-equation | E⦵ / V |
|---|---|
| $\ce{VO2+ + 2H+ + e- <=> VO^2+ + H2O}$ | +1.00 |
| $\ce{Cr2O7^2- + 14H+ + 6e- <=> 2Cr^3+ + 7H2O}$ | +1.33 |
| $\ce{PbO2 + 4H+ + 2e- <=> Pb^2+ + 2H2O}$ | +1.47 |
| $\ce{S2O8^2- + 2e- <=> 2SO4^2-}$ | +2.01 |`,
    options: [
      [t`$\ce{S2O8^2-}$`, "Correct: the most positive E⦵, so it gains electrons most readily."],
      [t`$\ce{PbO2}$ in acid`, "Lead(IV) oxide is strong, but its E⦵ is less positive than that of peroxodisulfate."],
      [t`$\ce{VO^2+}$`, "VO²⁺ is on the right of a half-equation here: the reduced form, not the oxidising agent."],
      [t`$\ce{Cr^3+}$`, "Cr³⁺ is a reduced form; the oxidising agent of that couple is Cr₂O₇²⁻."],
    ],
    answer: "A",
    explanation: "Oxidising agents are on the left of the half-equations; the strongest has the most positive E⦵ (+2.01 V for the peroxodisulfate ion).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`Data: $\ce{V^3+ + e- <=> V^2+}$ E⦵ = −0.26 V; $\ce{Cr^3+ + 3e- <=> Cr}$ E⦵ = −0.74 V; $\ce{Ni^2+ + 2e- <=> Ni}$ E⦵ = −0.25 V; $\ce{Cr^3+ + e- <=> Cr^2+}$ E⦵ = −0.41 V. Which statements are correct under standard conditions?

1. Chromium metal reduces V³⁺ to V²⁺.
2. Chromium metal reduces Ni²⁺ to nickel.
3. V²⁺ reduces Cr³⁺ to Cr²⁺.`,
    options: [
      ["1 and 2 only", "Correct: E⦵cell is +0.48 V for 1 and +0.49 V for 2, but −0.15 V for 3."],
      ["1, 2 and 3", "Statement 3 gives E⦵cell = −0.41 − (−0.26) = −0.15 V: not feasible."],
      ["2 and 3 only", "Statement 1 is feasible (+0.48 V) and statement 3 is not."],
      ["1 only", "Statement 2 is also feasible: −0.25 − (−0.74) = +0.49 V."],
    ],
    answer: "A",
    hints: ["For each, E⦵cell = E⦵(species reduced) − E⦵(species oxidised).", "In 3, V²⁺ would be oxidised to V³⁺."],
    explanation: "1: −0.26 − (−0.74) = +0.48 V ✓. 2: −0.25 − (−0.74) = +0.49 V ✓. 3: Cr³⁺ is reduced (−0.41) and V²⁺ oxidised (−0.26 couple): −0.41 − (−0.26) = −0.15 V ✗. In fact Cr²⁺ reduces V³⁺.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`A cell is made from $\ce{Co^2+/Co}$ (E⦵ = −0.28 V) and $\ce{Ag+/Ag}$ (E⦵ = +0.80 V). Which statement is correct when the cell delivers a current?`,
    options: [
      ["Electrons flow through the external wire from the cobalt electrode to the silver electrode.", "Correct: cobalt is oxidised at the negative electrode and its electrons travel to the positive silver electrode."],
      ["Electrons flow through the external wire from the silver electrode to the cobalt electrode.", "Silver is the positive electrode, where electrons are consumed, not released."],
      ["Silver dissolves and cobalt is deposited.", "This is the reverse of the feasible reaction."],
      ["Electrons flow through the salt bridge from cobalt to silver.", "Ions, not electrons, move through the salt bridge."],
    ],
    answer: "A",
    hints: ["Which electrode has the more negative E⦵?"],
    explanation: "Co (more negative E⦵) is the negative electrode: Co → Co²⁺ + 2e⁻. Silver is positive: Ag⁺ + e⁻ → Ag. Electrons go from Co to Ag through the wire.",
  });
  {
    const v = ecell(-0.13, -0.74);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`Calculate the standard cell potential, in V, of a cell made from $\ce{Cr^3+/Cr}$ (E⦵ = −0.74 V) and $\ce{Pb^2+/Pb}$ (E⦵ = −0.13 V). Give your answer to two decimal places.`,
      value: v, dp: 2, unit: "V",
      wrong: [dpStr(-0.13 - 0.74, 2), dpStr(-v, 2)],
      explanation: `The lead electrode is positive (less negative). E⦵cell = −0.13 − (−0.74) = ${dpStr(v, 2)} V.`,
    });
  }
  {
    const x = 0.34 - 0.59;
    b.num({
      d: 3, skill: "ANALYSIS",
      stem: t`A cell made from a metal X in a standard solution of $\ce{X^2+(aq)}$ and a standard $\ce{Cu^2+/Cu}$ half-cell (E⦵ = +0.34 V) has E⦵cell = 0.59 V, with the copper electrode positive. Calculate E⦵ for $\ce{X^2+/X}$, in V, to two decimal places.`,
      value: x, dp: 2, unit: "V",
      wrong: [dpStr(0.34 + 0.59, 2), dpStr(0.59 - 0.34, 2)],
      hints: ["E⦵cell = E⦵(positive) − E⦵(negative).", "Copper is positive, so X is the negative electrode."],
      explanation: `0.59 = 0.34 − E⦵(X), so E⦵(X²⁺/X) = 0.34 − 0.59 = ${dpStr(x, 2)} V. (This matches nickel.)`,
    });
  }
  {
    const v = ecell(1.52, 1.36);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: t`Data: $\ce{MnO4- + 8H+ + 5e- <=> Mn^2+ + 4H2O}$ E⦵ = +1.52 V; $\ce{Cl2 + 2e- <=> 2Cl-}$ E⦵ = +1.36 V. Calculate E⦵cell, in V, for the reaction of acidified manganate(VII) with chloride ions, to two decimal places.`,
      value: v, dp: 2, unit: "V",
      wrong: [dpStr(-v, 2)],
      hints: ["Manganate(VII) is reduced; chloride is oxidised."],
      explanation: `1. Reduced: MnO₄⁻ (+1.52 V). Oxidised: Cl⁻ (+1.36 V).\n2. E⦵cell = 1.52 − 1.36 = +${dpStr(v, 2)} V: positive, so manganate(VII) oxidises chloride to chlorine.\n3. This is why manganate(VII) titrations are acidified with sulfuric acid, not hydrochloric acid.`,
    });
  }
  {
    const v = ecell(0.34, -1.66);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: t`Calculate the standard cell potential, in V, of a cell made from $\ce{Al^3+/Al}$ (E⦵ = −1.66 V) and $\ce{Cu^2+/Cu}$ (E⦵ = +0.34 V), to two decimal places.`,
      value: v, dp: 2, unit: "V",
      wrong: [dpStr(0.34 - 1.66, 2)],
      explanation: `Copper is the positive electrode: E⦵cell = 0.34 − (−1.66) = ${dpStr(v, 2)} V. In practice aluminium's oxide layer makes the measured value lower.`,
    });
  }
  {
    const v = ecell(1.07, 0.15);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: t`Calculate E⦵cell, in V, for bromine oxidising tin(II) ions to tin(IV) ions. (E⦵ / V: $\ce{Br2/Br-}$ +1.07; $\ce{Sn^4+/Sn^2+}$ +0.15.)`,
      value: v, dp: 2, unit: "V",
      wrong: [dpStr(-v, 2)],
      hints: ["Bromine is reduced; tin(II) is oxidised."],
      explanation: `E⦵cell = E⦵(reduced) − E⦵(oxidised) = 1.07 − 0.15 = +${dpStr(v, 2)} V: feasible, Br₂ + Sn²⁺ → 2Br⁻ + Sn⁴⁺.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A high-resistance voltmeter is used to measure a cell potential so that almost no current flows.",
    answer: true,
    explanation: "True. If current flowed, the reactions would change the concentrations and the measured potential would not be the e.m.f. under standard conditions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A reaction with a large positive E⦵cell always takes place rapidly when the reagents are mixed.",
    answer: false,
    explanation: "False. E⦵cell shows feasibility, not rate. A reaction with a high activation energy can be very slow even when E⦵cell is large.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of the apparatus for measuring E⦵ with its purpose.",
    pairs: [
      ["salt bridge of KNO₃(aq)", "completes the circuit by letting ions move"],
      ["high-resistance voltmeter", "measures the e.m.f. while almost no current flows"],
      ["platinum electrode", "inert conductor for half-cells with no metal in the equation"],
      ["1.00 mol dm⁻³ solutions", "standard concentration so values can be compared"],
    ],
    explanation: "Each feature keeps the measurement under standard conditions or allows it to be made at all.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "The more positive the E⦵ of a half-equation, the {{blank:a}} the species on the left is as an oxidising agent. The species on the right of the most negative half-equation is the strongest {{blank:b}} agent.",
    blanks: [
      { id: "a", accepted: ["stronger"], choices: ["stronger", "weaker"] },
      { id: "b", accepted: ["reducing"], choices: ["reducing", "oxidising"] },
    ],
    explanation: "Positive E⦵: the left-hand species readily gains electrons (strong oxidising agent). Negative E⦵: the right-hand species readily loses electrons (strong reducing agent).",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the reference electrode against which standard electrode potentials are measured.",
    accepted: ["standard hydrogen electrode", "hydrogen electrode", "SHE", "the standard hydrogen electrode"],
    wrong: ["calomel electrode", "platinum electrode"],
    explanation: "The standard hydrogen electrode, assigned E⦵ = 0.00 V.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the standard electrode potential of the Cu²⁺/Cu half-cell is measured.",
    points: [
      "A copper electrode dips into 1.00 mol dm⁻³ Cu²⁺(aq) (e.g. CuSO₄) at 298 K.",
      "It is connected to a standard hydrogen electrode (H₂ at 101 kPa, 1.00 mol dm⁻³ H⁺, platinum).",
      "The solutions are joined by a salt bridge (e.g. saturated KNO₃).",
      "The electrodes are joined through a high-resistance voltmeter; the reading (+0.34 V, copper positive) is E⦵.",
    ],
    modelAnswer: "Set up a copper rod in 1.00 mol dm⁻³ copper(II) sulfate at 298 K. Connect it by a salt bridge of filter paper soaked in saturated KNO₃ to a standard hydrogen electrode (H₂ at 101 kPa bubbling over platinum black in 1.00 mol dm⁻³ HCl). Join the copper and platinum through a high-resistance voltmeter: the e.m.f., with copper positive, is E⦵(Cu²⁺/Cu).",
    hints: ["Two half-cells, a salt bridge and a voltmeter."],
    explanation: "Credit the copper half-cell, the SHE, the salt bridge and the voltmeter, all under standard conditions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "For the reaction Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂, E⦵cell = +0.29 V; for I₂ + 2Br⁻ → 2I⁻ + Br₂, E⦵cell = −0.53 V. Explain what these values show about the reactions and about the relative oxidising power of the three halogens.",
    points: [
      "+0.29 V is positive, so chlorine oxidising bromide is feasible (chlorine is a stronger oxidising agent than bromine).",
      "−0.53 V is negative, so iodine cannot oxidise bromide (the reverse, bromine oxidising iodide, is feasible).",
      "So oxidising power (and E⦵) falls Cl₂ > Br₂ > I₂ down Group 17.",
    ],
    modelAnswer: "For chlorine with bromide, E⦵cell = 1.36 − 1.07 = +0.29 V, so the reaction is feasible. For iodine with bromide, E⦵cell = 0.54 − 1.07 = −0.53 V, so it is not. Oxidising power follows E⦵: Cl₂ > Br₂ > I₂.",
    hints: ["Calculate E⦵cell for each possible reaction."],
    explanation: "Always show the E⦵cell calculation and its sign, then relate it to oxidising strength.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "E⦵ values predict that a reaction is feasible, but when the reagents are mixed nothing is seen to happen. Give two possible reasons.",
    points: ["The activation energy is high, so the rate is very slow.", "The conditions are not standard (concentrations, temperature or pressure), so the actual E for the cell differs and may be negative."],
    modelAnswer: "The reaction may have a high activation energy and so be too slow to observe; or the concentrations, temperature or pressure are not standard, so the real cell potential differs from E⦵cell and may not be positive.",
    hints: ["One kinetic reason, one about conditions."],
    explanation: "E⦵ predictions are about feasibility under standard conditions only.",
  });
  {
    const e1 = ecell(0.15, -0.76);
    const e2 = ecell(-0.14, -0.76);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true,
      stem: t`Under standard conditions, a cell is set up from a zinc electrode in $\ce{Zn^2+(aq)}$ and a platinum electrode in a solution containing both $\ce{Sn^4+(aq)}$ and $\ce{Sn^2+(aq)}$.

Data: $\ce{Zn^2+ + 2e- <=> Zn}$ E⦵ = −0.76 V; $\ce{Sn^4+ + 2e- <=> Sn^2+}$ E⦵ = +0.15 V; $\ce{Sn^2+ + 2e- <=> Sn}$ E⦵ = −0.14 V.`,
      parts: [
        P.mcq({ label: "(a)", stem: "Which electrode is positive?", options: [["the platinum electrode", "Correct: the Sn⁴⁺/Sn²⁺ couple has the more positive E⦵."], ["the zinc electrode", "Zinc has the more negative E⦵, so it is the negative electrode."], ["neither: both electrodes are at the same potential", "The E⦵ values differ, so there is a potential difference."], ["it depends on the size of the electrodes", "Electrode size does not affect the electrode potential."]], answer: "A", explanation: "+0.15 V is more positive than −0.76 V." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate E⦵cell, in V, to two decimal places.", value: e1, dp: 2, unit: "V", wrong: [dpStr(0.15 - 0.76, 2)], explanation: `E⦵cell = 0.15 − (−0.76) = ${dpStr(e1, 2)} V.` }),
        P.mcq({ label: "(c)", stem: "Which is the overall cell reaction?", options: [[t`$\ce{Zn + Sn^4+ -> Zn^2+ + Sn^2+}$`, "Correct: zinc is oxidised, tin(IV) reduced; two electrons each."], [t`$\ce{Zn^2+ + Sn^2+ -> Zn + Sn^4+}$`, "This is the reverse, non-feasible reaction."], [t`$\ce{Zn + 2Sn^4+ -> Zn^2+ + 2Sn^2+}$`, "Each Sn⁴⁺ gains two electrons, so one Zn reduces one Sn⁴⁺."], [t`$\ce{Zn + Sn^2+ -> Zn^2+ + Sn}$`, "This uses the other tin couple, which is not present in this half-cell."]], answer: "A", explanation: "Zn → Zn²⁺ + 2e⁻ and Sn⁴⁺ + 2e⁻ → Sn²⁺." }),
        P.fib({ label: "(d)", stem: "Complete the sentence.", template: "In the external circuit, electrons flow from the {{blank:a}} electrode to the {{blank:b}} electrode.", blanks: [{ id: "a", accepted: ["zinc"], choices: ["zinc", "platinum"] }, { id: "b", accepted: ["platinum"], choices: ["platinum", "zinc"] }], marks: 1, explanation: "Electrons leave the negative (zinc) electrode and arrive at the positive (platinum) electrode." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why a platinum electrode is used in the tin half-cell, and why it must be in contact with both tin ions.", points: ["No metal takes part in the Sn⁴⁺/Sn²⁺ half-reaction, so an inert conducting electrode (Pt) is needed to transfer electrons.", "The potential depends on the equilibrium between Sn⁴⁺ and Sn²⁺, so both must be present (at 1.00 mol dm⁻³ each for E⦵)."], modelAnswer: "The half-reaction involves only ions, so platinum acts as an unreactive conductor where electrons are exchanged; the electrode potential is set by the Sn⁴⁺/Sn²⁺ equilibrium, so both ions must be present at standard concentration." }),
        P.manual({ label: "(f)", marks: 2, stem: `If zinc powder is added directly to a solution of tin(IV) ions, tin metal may eventually form. Use the data to explain why. (E⦵cell for Zn reducing Sn²⁺ to Sn is ${dpStr(e2, 2)} V.)`, points: ["Zinc first reduces Sn⁴⁺ to Sn²⁺ (E⦵cell positive).", `Zinc can then reduce Sn²⁺ to Sn, because E⦵cell = −0.14 − (−0.76) = +${dpStr(e2, 2)} V is also positive (feasible).`], modelAnswer: `Zinc is a strong enough reducing agent to reduce Sn⁴⁺ to Sn²⁺ and then, since −0.14 − (−0.76) = +${dpStr(e2, 2)} V is positive, to reduce Sn²⁺ further to tin metal.` }),
      ],
      hints: ["The more positive E⦵ is the positive electrode.", "Compare zinc with both tin couples."],
      explanation: `E⦵cell = ${dpStr(e1, 2)} V; zinc reduces Sn⁴⁺ to Sn²⁺ and, given time, Sn²⁺ to Sn.`,
    });
  }
  {
    const a = ecell(1.77, 0.77);
    const c = ecell(1.52, 0.68);
    const d = ecell(1.77, 0.68);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true,
      stem: t`Hydrogen peroxide can act as an oxidising agent and as a reducing agent. Data:

| Half-equation | E⦵ / V |
|---|---|
| $\ce{O2 + 2H+ + 2e- <=> H2O2}$ | +0.68 |
| $\ce{Fe^3+ + e- <=> Fe^2+}$ | +0.77 |
| $\ce{MnO4- + 8H+ + 5e- <=> Mn^2+ + 4H2O}$ | +1.52 |
| $\ce{H2O2 + 2H+ + 2e- <=> 2H2O}$ | +1.77 |`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate E⦵cell, in V, for acidified hydrogen peroxide oxidising iron(II) ions.", value: a, dp: 2, unit: "V", explanation: `1.77 − 0.77 = ${dpStr(a, 2)} V.` }),
        P.mcq({ label: "(b)", stem: "Which equation represents that reaction?", options: [[t`$\ce{H2O2 + 2H+ + 2Fe^2+ -> 2H2O + 2Fe^3+}$`, "Correct: two Fe²⁺ supply the two electrons H₂O₂ needs."], [t`$\ce{H2O2 + 2Fe^2+ -> O2 + 2H+ + 2Fe^3+}$`, "H₂O₂ is reduced to water here, not oxidised to oxygen."], [t`$\ce{H2O2 + 2H+ + Fe^2+ -> 2H2O + Fe^3+}$`, "Electrons do not balance: Fe²⁺ loses one electron, H₂O₂ gains two."], [t`$\ce{2H2O + 2Fe^3+ -> H2O2 + 2H+ + 2Fe^2+}$`, "This is the reverse, non-feasible direction."]], answer: "A", explanation: "Multiply the iron half-equation by 2 and add." }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate E⦵cell, in V, for acidified manganate(VII) oxidising hydrogen peroxide to oxygen.", value: c, dp: 2, unit: "V", wrong: [dpStr(1.52 - 1.77, 2)], explanation: `MnO₄⁻ is reduced (+1.52 V); H₂O₂ is oxidised to O₂ (+0.68 V couple): 1.52 − 0.68 = ${dpStr(c, 2)} V.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain, in terms of oxidation numbers, how hydrogen peroxide can be both an oxidising agent and a reducing agent.", points: ["Oxygen in H₂O₂ is −1, between −2 (in H₂O) and 0 (in O₂).", "It can gain electrons (reduced to −2, acting as an oxidising agent) or lose electrons (oxidised to 0, acting as a reducing agent) depending on the other reagent."], modelAnswer: "The oxygen atoms in H₂O₂ are at −1. With reducing agents such as Fe²⁺ they gain electrons to become −2 in water; with stronger oxidising agents such as MnO₄⁻ they lose electrons to become 0 in O₂." }),
        P.mcq({ label: "(e)", stem: `Is the decomposition 2H₂O₂ → 2H₂O + O₂ feasible under standard conditions? (E⦵cell = ${dpStr(d, 2)} V for this reaction.)`, options: [["Yes: E⦵cell is positive, but it is slow uncatalysed.", "Correct: feasible, but kinetically slow (catalysed by MnO₂ or catalase)."], ["No: E⦵cell for the decomposition is negative.", "1.77 − 0.68 is positive."], ["Yes, and it must be rapid as E⦵cell is large.", "A positive E⦵cell says nothing about rate."], ["No: one substance cannot oxidise and reduce itself.", "Disproportionation is a reaction of one substance with itself."]], answer: "A", explanation: "H₂O₂ is reduced (+1.77) and oxidised (+0.68) at once: 1.77 − 0.68 > 0, so disproportionation is feasible; it is slow at room temperature without a catalyst." }),
      ],
      hints: ["Decide which species is reduced in each reaction.", "E⦵cell = E⦵(reduced) − E⦵(oxidised)."],
      explanation: `Oxidising Fe²⁺: ${dpStr(a, 2)} V. Oxidised by MnO₄⁻: ${dpStr(c, 2)} V. Decomposition: ${dpStr(d, 2)} V, feasible but slow.`,
    });
  }
  b.card("DEFINITION", "Standard electrode potential", "E.m.f. of a half-cell connected to a standard hydrogen electrode under standard conditions (298 K, 101 kPa, 1.00 mol dm⁻³), written for the reduction.");
  b.card("FACT", "Standard hydrogen electrode", "H₂ at 101 kPa over platinum (black) in 1.00 mol dm⁻³ H⁺(aq) at 298 K; E⦵ = 0.00 V.");
  b.card("FORMULA", "Standard cell potential", "E⦵cell = E⦵(positive electrode) − E⦵(negative electrode); never multiply E⦵ by coefficients.");
  b.card("CONCEPT", "Reading the electrochemical series", "More positive E⦵: stronger oxidising agent (left side). More negative E⦵: stronger reducing agent (right side).");
  b.card("CONCEPT", "Feasibility from E⦵", "Feasible under standard conditions if E⦵(species reduced) − E⦵(species oxidised) is positive.");
  b.card("CONCEPT", "Salt bridge", "Filter paper soaked in saturated KNO₃: completes the circuit by ion movement without mixing solutions.");
  b.card("CONCEPT", "Why a platinum electrode", "Used when no metal appears in the half-equation (Fe³⁺/Fe²⁺, Cl₂/Cl⁻, H⁺/H₂): inert conductor.");
  b.card("CONCEPT", "Limits of E⦵ predictions", "Says nothing about rate; conditions may be non-standard; products may differ.");
  b.card("FACT", "Halogen oxidising power from E⦵", "F₂ > Cl₂ > Br₂ > I₂: E⦵ falls down Group 17, so each halogen oxidises the halide ions below it.");
});
