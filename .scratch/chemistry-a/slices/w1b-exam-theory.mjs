// W1b: six THEORY10 items (ZIMSEC Paper 2; Cambridge Paper 2 for the two AS items, Paper 4 for the four A Level items)
// on energetics and electrochemistry.
import { concept, P, t, CAM, EXAM, checkExam, heatQ, deltaHFromQ, moles, Mr, hessCombustion, latticeEnergyFromCycle, solutionEnthalpy, ecell, charge, molesElectrons, entropyChange, gibbs, feasibilityT, F, sfStr, dpStr, chk } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const AS = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 2" };
const AL = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 4 (CIE), Paper 2 (ZIMSEC)" };

concept(A("energetics.enthalpy-calorimetry"), { file: "exam/w1b-theory", keyPrefix: "exam.w1b-theory" }, (b) => {
  // ------------------------------------------------------------ T1 (AS): LPG (butane) as a cooking fuel
  {
    const q = heatQ(400.0, 12.5);
    const nB = moles(0.85, Mr("C4H10"));
    const dHexp = deltaHFromQ(q, nB);
    const dHf = hessCombustion([[4, -393.5], [5, -285.8]], [[1, -2877]]);
    const eff = (dHexp / -2877) * 100;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("energetics.enthalpy-calorimetry"), A("energetics.hess-bond-energies")],
      stem: t`Liquefied petroleum gas (LPG), used for cooking in many Zimbabwean homes, is mainly butane, $\ce{C4H10}$ (Mr = 58.0). Tendai burned 0.85 g of butane from a small camping burner under a can containing 400.0 g of water; the temperature of the water rose by 12.5 °C.

Data: c(water) = 4.18 J g⁻¹ K⁻¹; ΔH⦵c / kJ mol⁻¹: C(graphite) −393.5, $\ce{H2(g)}$ −285.8, $\ce{C4H10(g)}$ −2877.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define the standard enthalpy change of combustion.", points: ["Enthalpy change when one mole of a substance is burned completely in excess oxygen.", "Under standard conditions (298 K, 101 kPa), all substances in their standard states."], modelAnswer: "The enthalpy change when one mole of a substance is completely burned in excess oxygen under standard conditions of 298 K and 101 kPa." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the enthalpy change of combustion of butane from Tendai's results, in kJ mol⁻¹, to three significant figures.", value: dHexp, sf: 3, unit: "kJ/mol", wrong: [sfStr(-dHexp, 3)], explanation: `q = 400.0 × 4.18 × 12.5 = ${sfStr(q, 4)} J; n = 0.85 ÷ 58.0 = ${sfStr(nB, 3)} mol; ΔHc = −${sfStr(q / 1000, 4)} ÷ ${sfStr(nB, 3)} = ${sfStr(dHexp, 3)} kJ mol⁻¹.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the percentage of the energy released by complete combustion (data value) that was transferred to the water, to two significant figures.", value: eff, sf: 2, unit: "%", explanation: `${sfStr(-dHexp, 3)} ÷ 2877 × 100 = ${sfStr(eff, 2)}%.` }),
        P.num({ label: "(d)", marks: 2, stem: "Use the enthalpy changes of combustion to calculate the standard enthalpy change of formation of butane, in kJ mol⁻¹, to one decimal place.", value: dHf, dp: 1, unit: "kJ/mol", wrong: [dpStr(-dHf, 1)], explanation: `4C + 5H₂ → C₄H₁₀: ΔHf = 4(−393.5) + 5(−285.8) − (−2877) = ${dpStr(dHf, 1)} kJ mol⁻¹.` }),
        P.mcq({ label: "(e)", stem: "Which equation represents the standard enthalpy change of formation of butane?", options: [[t`$\ce{4C(s) + 5H2(g) -> C4H10(g)}$`, "Correct: one mole of butane from its elements in their standard states."], [t`$\ce{C4H10(g) + 13/2O2(g) -> 4CO2(g) + 5H2O(l)}$`, "This is combustion."], [t`$\ce{8C(s) + 10H2(g) -> 2C4H10(g)}$`, "Formation is for one mole of the compound."], [t`$\ce{4C(g) + 10H(g) -> C4H10(g)}$`, "Gaseous atoms are not the standard states of carbon and hydrogen."]], answer: "A", explanation: "Formation: one mole of compound from elements in standard states." }),
        P.manual({ label: "(f)", marks: 2, stem: "Give two reasons why Tendai's value is much less exothermic than the data value.", points: ["Heat lost to the surrounding air (and to the can) rather than the water.", "Incomplete combustion (soot / CO) or some gas escaping unburnt, or water formed as vapour rather than liquid (non-standard conditions)."], modelAnswer: "Much of the heat escaped to the air and warmed the can instead of the water, and some butane burned incompletely to soot and carbon monoxide or escaped unburnt." }),
      ]),
      hints: ["Use the mass of water in q = mcΔT.", "Combustion cycle: ΔH = ΣΔHc(reactants) − ΣΔHc(products)."],
      explanation: `Experimental ΔHc ${sfStr(dHexp, 3)} kJ mol⁻¹ (${sfStr(eff, 2)}% of the data value); ΔHf(butane) = ${dpStr(dHf, 1)} kJ mol⁻¹.`,
    });
  }

  // ------------------------------------------------------------ T2 (AS): sulfur dioxide in fruit juice
  {
    const nI2 = (8.40 / 1000) * 0.00500;
    const mgPerDm3 = nI2 * 20 * Mr("SO2") * 1000;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("electrochem.oxidation-numbers"), A("stoich.solutions-titrations")],
      stem: t`Sulfur dioxide is added to some fruit drinks as a preservative. In an analysis, 50.0 cm³ of a drink needed 8.40 cm³ of 0.00500 mol dm⁻³ iodine solution:

$\ce{SO2 + I2 + 2H2O -> SO4^2- + 2I- + 4H+}$

(Mr of SO₂ = 64.1)`,
      parts: checkExam(EXAM.THEORY10, [
        P.fib({ label: "(a)", stem: "Give the oxidation number of sulfur in each species.", template: "SO₂: {{blank:a}}; SO₄²⁻: {{blank:b}}", blanks: [{ id: "a", accepted: ["+4", "4"], wrong: "+2" }, { id: "b", accepted: ["+6", "6"], wrong: "+8" }], explanation: "SO₂: x − 4 = 0; SO₄²⁻: x − 8 = −2." }),
        P.mcq({ label: "(b)", stem: "Which species is the oxidising agent?", options: [["I₂", "Correct: iodine gains electrons (0 → −1)."], ["SO₂", "SO₂ is oxidised, so it is the reducing agent."], ["H₂O", "Water's oxidation numbers do not change."], ["SO₄²⁻", "Sulfate is a product."]], answer: "A", explanation: "The oxidising agent is reduced: I₂ → 2I⁻." }),
        P.manual({ label: "(c)", marks: 2, stem: "Write the two half-equations for this reaction.", points: ["I₂ + 2e⁻ → 2I⁻", "SO₂ + 2H₂O → SO₄²⁻ + 4H⁺ + 2e⁻"], modelAnswer: "Reduction: I₂ + 2e⁻ → 2I⁻. Oxidation: SO₂ + 2H₂O → SO₄²⁻ + 4H⁺ + 2e⁻." }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the amount, in mol, of iodine used.", value: nI2, sf: 3, unit: "mol", explanation: `8.40 ÷ 1000 × 0.00500 = ${sfStr(nI2, 3)} mol.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the concentration of sulfur dioxide in the drink, in mg per dm³, to three significant figures.", value: mgPerDm3, sf: 3, unit: "mg", wrong: [sfStr(mgPerDm3 / 20, 3)], explanation: `n(SO₂) = ${sfStr(nI2, 3)} mol in 50.0 cm³, so ${sfStr(nI2 * 20, 3)} mol per dm³; mass = ${sfStr(nI2 * 20, 3)} × 64.1 = ${sfStr(mgPerDm3 / 1000, 3)} g = ${sfStr(mgPerDm3, 3)} mg per dm³.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Suggest, in terms of redox, how sulfur dioxide helps to preserve the drink.", points: ["SO₂ is a reducing agent (an antioxidant).", "It is oxidised in preference to the juice, removing dissolved oxygen / preventing oxidation of the juice (and it also kills microbes)."], modelAnswer: "Sulfur dioxide is a reducing agent: it reacts with oxygen and other oxidising agents before they can oxidise the flavour and colour compounds in the juice, and it also inhibits microbes." }),
      ]),
      hints: ["Mole ratio SO₂ : I₂ = 1 : 1.", "Scale from 50.0 cm³ to 1 dm³."],
      explanation: `S: +4 → +6 (SO₂ is the reducing agent); n(I₂) = ${sfStr(nI2, 3)} mol; SO₂ = ${sfStr(mgPerDm3, 3)} mg dm⁻³.`,
    });
  }

  // ------------------------------------------------------------ T3 (A Level): caesium fluoride lattice and solution
  {
    const le = latticeEnergyFromCycle(-553.5, [76, 376, 158 / 2, -328]);
    const sol = solutionEnthalpy(le, [-276, -506]);
    b.struct({
      ...AL, d: 4,
      concepts: [A("energetics.born-haber"), A("energetics.solution-hydration")],
      stem: "Data for caesium fluoride (kJ mol⁻¹): ΔH⦵f(CsF) −553.5; ΔH⦵at(Cs) +76; IE₁(Cs) +376; F–F bond energy +158; EA₁(F) −328; ΔH⦵hyd(Cs⁺) −276; ΔH⦵hyd(F⁻) −506.",
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define lattice energy.", points: ["The enthalpy change when one mole of an ionic compound is formed from its gaseous ions.", "Under standard conditions."], modelAnswer: "The enthalpy change when one mole of an ionic solid is formed from its gaseous ions under standard conditions." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the lattice energy of CsF, in kJ mol⁻¹, to one decimal place.", value: le, dp: 1, unit: "kJ/mol", wrong: [dpStr(latticeEnergyFromCycle(-553.5, [76, 376, 158, -328]), 1)], explanation: `ΔHat(F) = ½ × 158 = 79 kJ. Sum = 76 + 376 + 79 − 328 = 203 kJ. ΔHlatt = −553.5 − 203 = ${dpStr(le, 1)} kJ mol⁻¹.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the enthalpy change of solution of CsF, in kJ mol⁻¹, to one decimal place.", value: sol, dp: 1, unit: "kJ/mol", wrong: [dpStr(le - 276 - 506, 1)], explanation: `ΔHsol = −(${dpStr(le, 1)}) + (−276) + (−506) = ${dpStr(sol, 1)} kJ mol⁻¹.` }),
        P.mcq({ label: "(d)", stem: "What would you observe when caesium fluoride dissolves in water?", options: [["The solution warms up.", "Correct: ΔHsol is negative."], ["The solution cools down.", "That needs a positive ΔHsol."], ["A precipitate forms.", "CsF is soluble."], ["The temperature does not change.", "ΔHsol is not zero."]], answer: "A", explanation: "Exothermic dissolving warms the water." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the lattice energy of CsF is less exothermic than that of NaF.", points: ["Cs⁺ is larger than Na⁺ (same charge).", "So the distance between ion centres is greater and the electrostatic attraction weaker."], modelAnswer: "Cs⁺ has the same charge as Na⁺ but a much larger radius, so the ions in CsF are further apart and attract each other less strongly." }),
        P.fib({ label: "(f)", stem: "Complete the sentence.", template: "The hydration enthalpy of F⁻ is more exothermic than that of Cs⁺ mainly because F⁻ is {{blank:a}}.", blanks: [{ id: "a", accepted: ["smaller"], choices: ["smaller", "larger", "more highly charged"] }], explanation: "Both ions are singly charged; the small F⁻ ion attracts water molecules more strongly." }),
      ]),
      hints: ["Atomisation of F is half the F–F bond energy.", "ΔHsol = −ΔHlatt + ΣΔHhyd."],
      explanation: `ΔHlatt(CsF) = ${dpStr(le, 1)} kJ mol⁻¹; ΔHsol = ${dpStr(sol, 1)} kJ mol⁻¹.`,
    });
  }

  // ------------------------------------------------------------ T4 (A Level): the lead-acid cell
  {
    const e1 = ecell(1.47, -0.13);
    const e2 = ecell(-0.13, -0.25);
    b.struct({
      ...AL, d: 4,
      concepts: [A("electrochem.electrode-potentials")],
      stem: t`The lead-acid batteries used in cars and in solar power systems contain lead(IV) oxide and lead electrodes in sulfuric acid. Data:

| Half-equation | E⦵ / V |
|---|---|
| $\ce{PbO2 + 4H+ + 2e- <=> Pb^2+ + 2H2O}$ | +1.47 |
| $\ce{Pb^2+ + 2e- <=> Pb}$ | −0.13 |
| $\ce{Ni^2+ + 2e- <=> Ni}$ | −0.25 |`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Define standard electrode potential.", points: ["The potential difference (e.m.f.) between the half-cell and a standard hydrogen electrode.", "Under standard conditions: 298 K, 1.00 mol dm⁻³ ions, 101 kPa gases."], modelAnswer: "The e.m.f. of a cell made from the half-cell and a standard hydrogen electrode, measured under standard conditions (298 K, 101 kPa, 1.00 mol dm⁻³)." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate E⦵cell for a cell made from the two lead half-cells, in V.", value: e1, dp: 2, unit: "V", wrong: [dpStr(1.47 - 0.13, 2)], explanation: `1.47 − (−0.13) = ${dpStr(e1, 2)} V.` }),
        P.mcq({ label: "(c)", stem: "Which electrode is the positive electrode?", options: [["the lead(IV) oxide electrode", "Correct: it has the more positive E⦵."], ["the lead electrode", "Lead has the more negative E⦵, so it is negative."], ["neither: both contain lead", "The two couples have different E⦵ values."], ["it changes as the cell discharges", "Polarity is fixed by the E⦵ values."]], answer: "A", explanation: "+1.47 V is more positive than −0.13 V." }),
        P.short({ label: "(d)", marks: 1, stem: "Write the half-equation at the negative electrode as the cell discharges. (Type it as, for example, Pb -> Pb2+ + 2e-.)", accepted: ["Pb -> Pb2+ + 2e-", "Pb → Pb2+ + 2e-", "Pb → Pb²⁺ + 2e⁻", "Pb = Pb2+ + 2e-", "Pb -> Pb^2+ + 2e-"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Pb2+ + 2e- -> Pb"], explanation: "Lead is oxidised at the negative electrode." }),
        P.mcq({ label: "(e)", stem: "Which is the overall cell reaction?", options: [[t`$\ce{PbO2 + Pb + 4H+ -> 2Pb^2+ + 2H2O}$`, "Correct: two electrons are transferred each way."], [t`$\ce{2Pb^2+ + 2H2O -> PbO2 + Pb + 4H+}$`, "This is the charging (reverse) reaction."], [t`$\ce{PbO2 + 4H+ -> Pb + 2H2O}$`, "Charge does not balance and lead metal is not formed."], [t`$\ce{PbO2 + Pb -> 2PbO}$`, "The half-equations show H⁺ and Pb²⁺ taking part."]], answer: "A", explanation: "Add PbO₂ + 4H⁺ + 2e⁻ → Pb²⁺ + 2H₂O and Pb → Pb²⁺ + 2e⁻." }),
        P.fib({ label: "(f)", stem: "Complete the sentence.", template: "In the external circuit electrons flow from the {{blank:a}} electrode to the {{blank:b}} electrode.", blanks: [{ id: "a", accepted: ["lead"], choices: ["lead", "lead(IV) oxide"] }, { id: "b", accepted: ["lead(IV) oxide"], choices: ["lead(IV) oxide", "lead"] }], marks: 1, explanation: "From the negative (Pb) to the positive (PbO₂) electrode." }),
        P.num({ label: "(g)", marks: 1, stem: "Calculate E⦵cell, in V, for nickel metal reducing Pb²⁺ ions to lead.", value: e2, dp: 2, unit: "V", explanation: `−0.13 − (−0.25) = +${dpStr(e2, 2)} V.` }),
        P.manual({ label: "(h)", marks: 2, stem: "The value in (g) is positive, but a nickel strip placed in a dilute solution of lead(II) ions may show no visible change. Suggest two reasons.", points: ["E⦵cell is small, so non-standard (dilute) concentrations can make the actual cell potential zero or negative.", "The reaction may be very slow (high activation energy), or a surface layer on the nickel prevents reaction."], modelAnswer: "The cell potential is only +0.12 V, so in a dilute Pb²⁺ solution (non-standard) the real potential may not be positive; and even if feasible, the reaction may be too slow to see, for example because of an oxide layer on the nickel." }),
      ]),
      hints: ["The more positive E⦵ is the positive electrode.", "E⦵cell = E⦵(positive) − E⦵(negative)."],
      explanation: `E⦵cell (lead cell) = ${dpStr(e1, 2)} V; Ni reducing Pb²⁺ = +${dpStr(e2, 2)} V, small, so conditions and rate matter.`,
    });
  }

  // ------------------------------------------------------------ T5 (A Level): electrolysis of brine in the laboratory
  {
    const Q = charge(0.750, 50.0 * 60);
    const ne = molesElectrons(Q);
    const vCl2 = (ne / 2) * 22.4 * 1000;
    const mNaOH = ne * 40.0;
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("electrochem.electrolysis-products"), A("electrochem.faraday")],
      stem: "Concentrated aqueous sodium chloride was electrolysed with graphite electrodes, with a current of 0.750 A for 50.0 minutes, in apparatus that kept the products apart. (F = 96 500 C mol⁻¹; molar gas volume 22.4 dm³ mol⁻¹ at s.t.p.; Mr NaOH = 40.0)",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", stem: "What is produced at the cathode?", options: [["hydrogen", "Correct: water is reduced (Na⁺ is far harder to reduce)."], ["sodium", "Sodium is never formed from aqueous solution."], ["chlorine", "Chlorine forms at the anode."], ["oxygen", "Oxygen would form at the anode, not the cathode."]], answer: "A", explanation: "2H₂O + 2e⁻ → H₂ + 2OH⁻." }),
        P.short({ label: "(b)", marks: 1, stem: "Write the half-equation at the anode. (Type it as, for example, 2Cl- -> Cl2 + 2e-.)", accepted: ["2Cl- -> Cl2 + 2e-", "2Cl- → Cl2 + 2e-", "2Cl⁻ → Cl₂ + 2e⁻", "2Cl- = Cl2 + 2e-"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Cl2 + 2e- -> 2Cl-"], explanation: "Chloride ions are oxidised at the anode." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why chlorine, not oxygen, is the main product at the anode.", points: ["E⦵ values for Cl₂/Cl⁻ (+1.36 V) and O₂/H₂O (+1.23 V) are close.", "The high concentration of Cl⁻ makes chloride oxidation easier (and oxygen formation needs an overpotential), so chlorine forms."], modelAnswer: "The electrode potentials for chlorine and oxygen are close, so concentration decides: in concentrated brine the large [Cl⁻] makes chloride the more easily oxidised species, and chlorine is released." }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the charge passed, in C.", value: Q, unit: "C", explanation: `Q = 0.750 × 3000 = ${Q} C.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the volume of chlorine produced, in cm³ measured at s.t.p., to three significant figures.", value: vCl2, sf: 3, unit: "cm³", wrong: [sfStr(vCl2 * 2, 3)], explanation: `n(e⁻) = ${Q} ÷ 96 500 = ${sfStr(ne, 3)} mol; n(Cl₂) = ${sfStr(ne / 2, 3)} mol; V = ${sfStr(ne / 2, 3)} × 22 400 = ${sfStr(vCl2, 3)} cm³.` }),
        P.num({ label: "(f)", marks: 2, stem: "Calculate the mass of sodium hydroxide formed, in g, to three significant figures.", value: mNaOH, sf: 3, unit: "g", wrong: [sfStr(mNaOH / 2, 3)], explanation: `One OH⁻ per electron: n(NaOH) = ${sfStr(ne, 3)} mol; mass = ${sfStr(ne, 3)} × 40.0 = ${sfStr(mNaOH, 3)} g.` }),
        P.manual({ label: "(g)", marks: 1, stem: "State why the products must be kept apart.", points: ["Chlorine reacts with sodium hydroxide (forming chlorate(I)) or with hydrogen (explosively)."], modelAnswer: "Chlorine would react with the sodium hydroxide to form sodium chlorate(I), and a hydrogen-chlorine mixture can explode." }),
      ]),
      hints: ["Q = It with t in seconds.", "Two electrons per Cl₂; one OH⁻ per electron."],
      explanation: `Q = ${Q} C; Cl₂ ${sfStr(vCl2, 3)} cm³; NaOH ${sfStr(mNaOH, 3)} g.`,
    });
  }

  // ------------------------------------------------------------ T6 (A Level, Cambridge): splitting water
  {
    const dS = entropyChange([[1, 130.7], [0.5, 205.2]], [[1, 69.9]]);
    const G = gibbs(285.8, 298, dS);
    const Emin = (G * 1000) / (2 * F);
    const T = feasibilityT(285.8, dS);
    b.struct({
      ...AL, paper: "Paper 4", d: 4, calculator: true, applies: CAM,
      concepts: [A("energetics.entropy-gibbs"), A("electrochem.nernst-free-energy")],
      stem: t`Hydrogen can be made by splitting water: $\ce{H2O(l) -> H2(g) + 1/2O2(g)}$, ΔH⦵ = +285.8 kJ mol⁻¹.

Data: S⦵ / J K⁻¹ mol⁻¹: $\ce{H2O(l)}$ 69.9, $\ce{H2(g)}$ 130.7, $\ce{O2(g)}$ 205.2. F = 9.65 × 10⁴ C mol⁻¹.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Predict the sign of ΔS⦵ for this reaction and explain your answer.", points: ["Positive.", "A liquid forms 1.5 mol of gas, which has far more possible arrangements of particles and energy."], modelAnswer: "Positive: one mole of liquid becomes one and a half moles of gas, greatly increasing the number of ways the particles and their energy can be arranged." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate ΔS⦵, in J K⁻¹ mol⁻¹, to one decimal place.", value: dS, dp: 1, unit: "J/K/mol", wrong: [dpStr(entropyChange([[1, 130.7], [1, 205.2]], [[1, 69.9]]), 1)], explanation: `ΔS⦵ = 130.7 + ½(205.2) − 69.9 = ${dpStr(dS, 1)} J K⁻¹ mol⁻¹.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate ΔG⦵ at 298 K, in kJ mol⁻¹, to four significant figures.", value: G, sf: 4, unit: "kJ/mol", wrong: [sfStr(285.8 - 298 * dS, 4)], explanation: `ΔG⦵ = 285.8 − 298 × ${sfStr(dS / 1000, 5)} = ${sfStr(G, 4)} kJ mol⁻¹.` }),
        P.num({ label: "(d)", marks: 2, stem: "Two moles of electrons are transferred per mole of water. Use ΔG⦵ = −nE⦵F to calculate the minimum voltage, in V, needed to electrolyse water under standard conditions, to three significant figures.", value: Emin, sf: 3, unit: "V", wrong: [sfStr(Emin * 2, 3)], explanation: `E = ΔG ÷ (nF) = ${sfStr(G * 1000, 4)} ÷ (2 × 9.65 × 10⁴) = ${sfStr(Emin, 3)} V, the same as E⦵cell of the hydrogen-oxygen fuel cell.` }),
        P.num({ label: "(e)", marks: 1, stem: "Calculate the temperature, in K, above which the thermal decomposition of water would become feasible, to three significant figures.", value: T, sf: 3, unit: "K", explanation: `T = 285 800 ÷ ${dpStr(dS, 1)} = ${sfStr(T, 3)} K.` }),
        P.mcq({ label: "(f)", stem: "Which assumption makes the answer to (e) only approximate?", options: [["ΔH⦵ and ΔS⦵ stay constant, and water stays liquid.", "Correct: at that temperature water is steam, and ΔH and ΔS both change."], ["The Faraday constant changes with the temperature.", "F is a constant and is not used in (e)."], ["Gases have no entropy at very high temperatures.", "Gases have high entropy at high temperature."], ["ΔG⦵ is always negative above 298 K.", "ΔG becomes negative only above the calculated temperature."]], answer: "A", explanation: "The calculation uses 298 K values of ΔH and ΔS and liquid water at a temperature where water is a gas." }),
      ]),
      hints: ["Remember the ½ for O₂.", "Divide ΔS by 1000 before using it with ΔH in kJ."],
      explanation: `ΔS⦵ = +${dpStr(dS, 1)} J K⁻¹ mol⁻¹; ΔG⦵ = +${sfStr(G, 4)} kJ mol⁻¹; minimum voltage ${sfStr(Emin, 3)} V; feasible thermally above about ${sfStr(T, 3)} K.`,
    });
  }
});
