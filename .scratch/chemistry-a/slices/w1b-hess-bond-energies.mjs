// W1b: achem.energetics.hess-bond-energies
import { concept, P, t, ce, hessFormation, hessCombustion, bondEnergyDH, sfStr, dpStr, chk } from "../lib.mjs";

const neg = (x, d = 1) => (x < 0 ? `−${dpStr(-x, d)}` : `+${dpStr(x, d)}`);

concept("achem.energetics.hess-bond-energies", { file: "energetics/hess-bond-energies", keyPrefix: "energetics.hess-bond-energies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is Hess's law?",
    options: [
      ["The enthalpy change of a reaction is independent of the route, provided the initial and final conditions are the same.", "Correct: this is the statement of Hess's law."],
      ["The enthalpy change of a reaction depends on the number of steps by which the products are made.", "This contradicts Hess's law: the route does not matter."],
      ["Energy is released when bonds are broken and taken in when bonds are made.", "This is backwards: bond breaking takes in energy."],
      ["The enthalpy change of formation of an element in its standard state is one.", "It is zero, and this is a convention, not Hess's law."],
    ],
    answer: "A",
    explanation: "Hess's law follows from conservation of energy: if two routes between the same states gave different ΔH, energy could be created by going one way and returning the other.",
  });
  {
    const v = hessFormation([[1, -1675.7], [2, 0]], [[1, -824.2], [2, 0]]);
    chk(v, -851.5, 1e-9, "thermite");
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`Data: ΔH⦵f $\ce{Fe2O3(s)}$ = −824.2 kJ mol⁻¹; ΔH⦵f $\ce{Al2O3(s)}$ = −1675.7 kJ mol⁻¹. What is ΔH for $\ce{Fe2O3(s) + 2Al(s) -> Al2O3(s) + 2Fe(s)}$?`,
      options: [
        ["−851.5 kJ mol⁻¹", "Correct: products minus reactants, (−1675.7) − (−824.2); the elements count as zero."],
        ["+851.5 kJ mol⁻¹", "This is reactants minus products: the sign is reversed."],
        ["−2499.9 kJ mol⁻¹", "This adds the two values instead of subtracting the reactant's value."],
        ["−1675.7 kJ mol⁻¹", "This ignores the iron(III) oxide that has to be decomposed."],
      ],
      answer: "A",
      explanation: "ΔH = ΣΔHf(products) − ΣΔHf(reactants) = (−1675.7 + 0) − (−824.2 + 0) = −851.5 kJ mol⁻¹. The thermite reaction is strongly exothermic, enough to melt the iron formed.",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which pair of standard enthalpy changes always have the same value?",
    options: [
      ["ΔH⦵c of carbon (graphite) and ΔH⦵f of carbon dioxide", "Correct: both are C(s) + O₂(g) → CO₂(g) for one mole."],
      ["ΔH⦵c of hydrogen and ΔH⦵f of water vapour", "ΔH⦵c of hydrogen forms liquid water (the standard state), not water vapour."],
      ["ΔH⦵f of carbon monoxide and ΔH⦵c of carbon", "Carbon monoxide is incomplete combustion; ΔH⦵c needs complete combustion to CO₂."],
      ["ΔH⦵c of methane and ΔH⦵f of methane", "One burns methane, the other forms it from its elements: different reactions."],
    ],
    answer: "A",
    explanation: "When an element burns completely to form one mole of a single product in its standard state, the combustion and formation equations are identical. C(s) + O₂(g) → CO₂(g) is both; for hydrogen it is ΔHf of H₂O(l), not H₂O(g).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why the enthalpy change of combustion of methane calculated from bond energies differs from the value found with a Hess cycle?\n\n1. Bond energies are measured at 0 K, so they cannot be used at 298 K.\n2. The C–H bond energy is an average value from many compounds.\n3. The water formed under standard conditions is a liquid, but bond energies apply to gases.",
    options: [
      ["1, 2 and 3", "Statement 1 is not a reason: bond energies are quoted for 298 K."],
      ["2 and 3 only", "Correct: average values and the liquid state of water are the two reasons."],
      ["1 and 2 only", "Statement 1 is not a reason, and statement 3 is."],
      ["1 only", "Statement 1 is false; statements 2 and 3 are the reasons."],
    ],
    answer: "B",
    hints: ["What do bond energies assume about the states of all substances?"],
    explanation: "Bond energies give ΔH for gaseous species with averaged values. Combustion forms liquid water, and the energy released when the vapour condenses is not included, so the bond-energy estimate is less exothermic.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statements about bond energies are correct?\n\n1. The H–H bond energy is an exact value because it refers to one bond in one molecule.\n2. Breaking a bond is always endothermic.\n3. A double bond between two carbon atoms has exactly twice the energy of a single C–C bond.",
    options: [
      ["1 and 2 only", "Correct: statement 3 is false, since a π bond is weaker than a σ bond."],
      ["1, 2 and 3", "Statement 3 is false: C=C is less than twice C–C (610 compared with 2 × 350 = 700 kJ mol⁻¹)."],
      ["2 and 3 only", "Statement 1 is true, and statement 3 is false."],
      ["1 only", "Statement 2 is also true: energy is always needed to separate bonded atoms."],
    ],
    answer: "A",
    hints: ["Compare the σ and π components of a double bond."],
    explanation: "Diatomic bond energies (H–H, Cl–Cl, H–Cl) are exact. All bond breaking is endothermic. The second bond in C=C is a π bond with poorer overlap, so C=C (610) is less than 2 × C–C (700).",
  });
  {
    const v = bondEnergyDH([[0.5, 436], [0.5, 158]], [[1, 562]]);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "Use the bond energies H–H 436, F–F 158 and H–F 562 kJ mol⁻¹ to find the enthalpy change of formation of hydrogen fluoride, HF(g).",
      options: [
        [`${neg(v, 0)} kJ mol⁻¹`, "Correct: ½(436 + 158) − 562 for one mole of HF."],
        [`${neg(2 * v, 0)} kJ mol⁻¹`, "This is for two moles of HF; formation is per mole."],
        [`${neg(-v, 0)} kJ mol⁻¹`, "This is made minus broken: the sign is reversed."],
        [`${neg(436 + 158 - 562, 0)} kJ mol⁻¹`, "This breaks a whole H₂ and F₂ but makes only one H–F bond."],
      ],
      answer: "A",
      hints: ["Formation is for one mole of HF: ½H₂ + ½F₂ → HF.", "ΔH = broken − made."],
      explanation: `½H₂(g) + ½F₂(g) → HF(g): broken = ½(436) + ½(158) = 297 kJ; made = 562 kJ. ΔHf = 297 − 562 = ${neg(v, 0)} kJ mol⁻¹. The very weak F–F bond and the very strong H–F bond make this strongly exothermic.`,
    });
  }
  {
    const v = hessFormation([[4, 90.3], [6, -241.8]], [[4, -46.1], [5, 0]]);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Data: ΔH⦵f / kJ mol⁻¹: $\ce{NH3(g)}$ −46.1, $\ce{NO(g)}$ +90.3, $\ce{H2O(g)}$ −241.8. Calculate ΔH, in kJ mol⁻¹, for the first step of nitric acid manufacture:

$\ce{4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)}$

Give your answer to one decimal place.`,
      value: v, dp: 1, unit: "kJ/mol",
      wrong: [dpStr(-v, 1), dpStr(hessFormation([[1, 90.3], [1, -241.8]], [[1, -46.1]]), 1)],
      hints: ["Multiply each ΔHf by its coefficient.", "O₂ is an element: ΔHf = 0."],
      explanation: `Products: 4(+90.3) + 6(−241.8) = ${dpStr(4 * 90.3 + 6 * -241.8, 1)} kJ. Reactants: 4(−46.1) + 0 = ${dpStr(4 * -46.1, 1)} kJ. ΔH = ${dpStr(4 * 90.3 + 6 * -241.8, 1)} − (${dpStr(4 * -46.1, 1)}) = ${dpStr(v, 1)} kJ mol⁻¹ (for the equation as written).`,
    });
  }
  {
    const v = hessCombustion([[1, -393.5]], [[1, -395.4]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Data: ΔH⦵c / kJ mol⁻¹: C(graphite) −393.5, C(diamond) −395.4. Calculate the enthalpy change, in kJ mol⁻¹, for $ce{C(graphite) -> C(diamond)}$, to one decimal place.`,
      value: v, dp: 1, unit: "kJ/mol",
      wrong: [dpStr(-v, 1), dpStr(-393.5 - 395.4, 1)],
      hints: ["Both forms of carbon burn to the same product, CO₂.", "With combustion data: ΔH = ΔHc(reactant) − ΔHc(product)."],
      explanation: `1. Cycle: graphite → CO₂ (−393.5 kJ), then CO₂ → diamond (the reverse of diamond's combustion, +395.4 kJ).
2. ΔH = −393.5 − (−395.4) = +${dpStr(v, 1)} kJ mol⁻¹.
3. The change is slightly endothermic and cannot be measured directly: it needs very high pressure and temperature, and graphite and diamond do not interconvert at room conditions.`,
    });
  }
  {
    const h1 = -67.0, h2 = 11.5;
    const v = h1 - h2;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`In an experiment, Rudo found these enthalpy changes of solution (to form the same dilute solution):

| Process | ΔH / kJ mol⁻¹ |
|---|---|
| $\ce{CuSO4(s) + aq -> CuSO4(aq)}$ | −67.0 |
| $\ce{CuSO4.5H2O(s) + aq -> CuSO4(aq)}$ | +11.5 |

Calculate the enthalpy change for $\ce{CuSO4(s) + 5H2O(l) -> CuSO4.5H2O(s)}$, in kJ mol⁻¹.`,
      value: v, dp: 1, unit: "kJ/mol",
      wrong: [dpStr(h1 + h2, 1), dpStr(h2 - h1, 1)],
      hints: ["Both solids give the same solution.", "Go anhydrous → solution, then solution → hydrated (reverse of the second)."],
      explanation: `1. Route: CuSO₄(s) → CuSO₄(aq) (−67.0), then CuSO₄(aq) → CuSO₄·5H₂O(s), the reverse of the second process (−11.5).\n2. ΔH = −67.0 − (+11.5) = ${dpStr(v, 1)} kJ mol⁻¹.\n3. This cannot be measured directly because the anhydrous solid does not absorb exactly five moles of water in a controlled way.`,
    });
  }
  {
    const v = bondEnergyDH([[1, 242]], [[2, 330]]);
    b.num({
      d: 3, skill: "APPLICATION", daily: true,
      stem: t`Estimate ΔH, in kJ mol⁻¹, for $\ce{PCl3(g) + Cl2(g) -> PCl5(g)}$, using the bond energies Cl–Cl 242 kJ mol⁻¹ and P–Cl 330 kJ mol⁻¹.`,
      value: v, unit: "kJ/mol",
      wrong: [String(-v), String(bondEnergyDH([[3, 330], [1, 242]], [[3, 330]]))],
      hints: ["The three P–Cl bonds of PCl₃ are not broken: count only the bonds that change.", "Two new P–Cl bonds form."],
      explanation: `Only one Cl–Cl bond breaks (242 kJ) and two new P–Cl bonds form (2 × 330 = 660 kJ). ΔH = 242 − 660 = ${v} kJ mol⁻¹. (Breaking and remaking the three original P–Cl bonds would cancel.)`,
    });
  }
  {
    const v = hessFormation([[1, -395.7]], [[1, -296.8], [0.5, 0]]);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: t`Data: ΔH⦵f / kJ mol⁻¹: $\ce{SO2(g)}$ −296.8, $\ce{SO3(g)}$ −395.7. Calculate ΔH, in kJ mol⁻¹, for $\ce{SO2(g) + 1/2O2(g) -> SO3(g)}$, the key step of the Contact process, to one decimal place.`,
      value: v, dp: 1, unit: "kJ/mol",
      wrong: [dpStr(-v, 1), dpStr(-395.7 - 296.8, 1)],
      explanation: `ΔH = ΔHf(SO₃) − ΔHf(SO₂) − 0 = −395.7 − (−296.8) = ${dpStr(v, 1)} kJ mol⁻¹ (oxygen is an element, so its ΔHf is zero).`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Because most bond energies are average values, an enthalpy change calculated from them is only an estimate.",
    answer: true,
    explanation: "True. Average bond energies are means over many compounds; the bond in a particular molecule may be stronger or weaker, so the result is approximate.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "According to Hess's law, a reaction carried out in two steps has a different overall enthalpy change from the same reaction carried out in one step.",
    answer: false,
    explanation: "False. The overall enthalpy change depends only on the initial and final states, not on the number of steps.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each set of data with the expression used to find ΔH of a reaction from it.",
    pairs: [
      ["enthalpies of formation", "Σ(products) − Σ(reactants)"],
      ["enthalpies of combustion", "Σ(reactants) − Σ(products)"],
      ["bond energies", "Σ(bonds broken) − Σ(bonds made)"],
    ],
    extraRight: ["Σ(bonds made) − Σ(bonds broken)"],
    explanation: "Formation cycles go through the elements (products minus reactants); combustion cycles go through CO₂ and H₂O (reactants minus products); bond energies: breaking (endothermic) minus making (exothermic).",
  });
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Breaking a covalent bond is {{blank:a}}, and forming a covalent bond is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["endothermic"], choices: ["endothermic", "exothermic"] },
      { id: "b", accepted: ["exothermic"], choices: ["exothermic", "endothermic"] },
    ],
    explanation: "Energy must be supplied to separate bonded atoms (endothermic); the same energy is released when the bond forms (exothermic).",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: t`State the enthalpy change of formation, in kJ mol⁻¹, of $\ce{Br2(l)}$ under standard conditions.`,
    accepted: ["0", "zero", "0 kJ/mol", "0 kJ mol-1"],
    wrong: ["30.9"],
    explanation: "Bromine's standard state is the liquid, so ΔH⦵f of Br₂(l) is zero by definition. (ΔH⦵f of Br₂(g) is not zero: it includes vaporisation.)",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State Hess's law.",
    points: ["The enthalpy change of a reaction is independent of the route (or the number of steps) taken.", "Provided the initial and final conditions (states) are the same."],
    modelAnswer: "The total enthalpy change for a reaction is the same whatever route is taken, provided the initial and final conditions are the same.",
    explanation: "Both ideas are needed for full marks: route independence and the same initial and final conditions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Explain why the standard enthalpy change of formation of carbon monoxide, $\ce{C(s) + 1/2O2(g) -> CO(g)}$, cannot be measured directly, and outline how Hess's law allows it to be found.`,
    points: [
      "Burning carbon in limited oxygen gives a mixture of CO and CO₂ (some carbon may remain), so the heat measured is not for this reaction alone.",
      "Use the enthalpy changes of combustion of carbon and of carbon monoxide (both measurable: complete combustion to CO₂).",
      "ΔHf(CO) = ΔHc(C) − ΔHc(CO).",
    ],
    modelAnswer: "Carbon cannot be made to burn to carbon monoxide only: some CO₂ always forms, so a calorimeter measures a mixture. Instead measure ΔHc of carbon and ΔHc of CO, both of which give CO₂ only. In the cycle C + O₂ → CO₂ directly or via CO, ΔHf(CO) = ΔHc(C) − ΔHc(CO).",
    hints: ["Can you stop carbon burning at CO?"],
    explanation: "This is the classic use of Hess's law: an enthalpy change that cannot be isolated experimentally is found from two that can.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student calculates the enthalpy change of combustion of propan-1-ol from average bond energies and obtains a value about 20% less exothermic than the data-book value. Explain the difference.",
    points: [
      "Bond energies used are average values from many compounds, not the exact values in propan-1-ol, CO₂ and H₂O.",
      "Bond energies refer to gaseous species, but propan-1-ol and water are liquids under standard conditions.",
      "Extra energy is released when water vapour condenses (and needed to vaporise propan-1-ol) that the calculation leaves out; overall the data value is more exothermic.",
    ],
    modelAnswer: "The calculation uses average bond energies, which are not exact for these molecules. More importantly, bond energies assume all species are gases, but in the standard combustion propan-1-ol is a liquid and the water formed is liquid. The energy released when four moles of water condense outweighs the energy needed to vaporise one mole of propan-1-ol, so the true value is more exothermic than the estimate.",
    hints: ["Think about states and about where bond energy values come from."],
    explanation: "Name both reasons and say which way the state effect pushes the answer.",
  });
  // Structured practice: hydrazine
  {
    const dHess = hessFormation([[1, 0], [2, -241.8]], [[1, 95.4], [1, 0]]);
    const dBE = bondEnergyDH([[4, 390], [1, 160], [1, 496]], [[1, 944], [4, 460]]);
    const nn = dHess - (4 * 390 + 496 - 944 - 4 * 460);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true,
      stem: t`Hydrazine, $\ce{N2H4}$ (structure $\ce{H2N-NH2}$), has been used as a rocket fuel. In the gas phase:

$\ce{N2H4(g) + O2(g) -> N2(g) + 2H2O(g)}$

Data: ΔH⦵f / kJ mol⁻¹: $\ce{N2H4(g)}$ +95.4, $\ce{H2O(g)}$ −241.8. Bond energies / kJ mol⁻¹: N–H 390, N–N 160, O=O 496, N≡N 944, O–H 460.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Use the enthalpies of formation to calculate ΔH for the reaction, in kJ mol⁻¹, to one decimal place.", value: dHess, dp: 1, unit: "kJ/mol", wrong: [dpStr(-dHess, 1), dpStr(hessFormation([[1, -241.8]], [[1, 95.4]]), 1)], explanation: `ΔH = 2(−241.8) − (+95.4) = ${dpStr(dHess, 1)} kJ mol⁻¹ (N₂ and O₂ are elements).` }),
        P.num({ label: "(b)", marks: 2, stem: "Use the bond energies to calculate ΔH for the reaction, in kJ mol⁻¹.", value: dBE, unit: "kJ/mol", wrong: [String(-dBE)], explanation: `Broken: 4(390) + 160 + 496 = ${4 * 390 + 160 + 496} kJ. Made: 944 + 4(460) = ${944 + 4 * 460} kJ. ΔH = ${dBE} kJ mol⁻¹.` }),
        P.num({ label: "(c)", marks: 2, stem: "Assume the value in (a) is correct and that the other bond energies are exact. Calculate the N–N bond energy in hydrazine, in kJ mol⁻¹, to the nearest whole number.", value: nn, dp: 0, unit: "kJ/mol", explanation: `${dpStr(dHess, 1)} = (4 × 390 + E(N–N) + 496) − (944 + 4 × 460), so E(N–N) = ${dpStr(dHess, 1)} + ${944 + 4 * 460} − ${4 * 390 + 496} = ${dpStr(nn, 0)} kJ mol⁻¹.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest why your answer to (c) differs from the average N–N bond energy of 160 kJ mol⁻¹.", points: ["160 kJ mol⁻¹ is an average over several compounds; the N–N bond in hydrazine has its own exact value.", "The N–H and O–H values used are also averages, so their errors are carried into the deduced N–N value (lone-pair repulsion between the two N atoms weakens the bond in hydrazine)."], modelAnswer: "The data value is an average over many molecules containing N–N, while (c) gives the value in hydrazine itself; also the N–H and O–H values are averages, so any error in them ends up in the calculated N–N energy." }),
      ],
      hints: ["Elements have ΔHf = 0.", "In (c), put E(N–N) in place of 160 and use the Hess value for ΔH."],
      explanation: `Hess value ${dpStr(dHess, 1)} kJ mol⁻¹; bond-energy estimate ${dBE} kJ mol⁻¹; implied N–N energy ${dpStr(nn, 0)} kJ mol⁻¹.`,
    });
  }
  // Structured practice: limestone cycle with measured data
  {
    const h1 = -18.5, h2 = -191.0;
    const dH = h1 - h2;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: t`Sipho wants ΔH for the decomposition of magnesium carbonate, $\ce{MgCO3(s) -> MgO(s) + CO2(g)}$, which cannot be measured directly. He measures:

| Reaction | ΔH / kJ mol⁻¹ |
|---|---|
| 1: $\ce{MgCO3(s) + 2HCl(aq) -> MgCl2(aq) + H2O(l) + CO2(g)}$ | −18.5 |
| 2: $\ce{MgO(s) + 2HCl(aq) -> MgCl2(aq) + H2O(l)}$ | −191.0 |`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the decomposition cannot be measured directly in a calorimeter.", points: ["It needs a high temperature (strong heating), which cannot be done in a calorimeter.", "The reaction is slow and may not go to completion, so the heat change cannot be measured accurately."], modelAnswer: "Magnesium carbonate only decomposes on strong heating, so you cannot measure a small temperature change of surroundings at the same time; and the decomposition is slow and incomplete." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate ΔH for the decomposition, in kJ mol⁻¹, to one decimal place.", value: dH, dp: 1, unit: "kJ/mol", wrong: [dpStr(h2 - h1, 1), dpStr(h1 + h2, 1)], explanation: `ΔH = ΔH₁ − ΔH₂ = −18.5 − (−191.0) = +${dpStr(dH, 1)} kJ mol⁻¹.` }),
        P.mcq({ label: "(c)", stem: "Why must excess acid be used in both experiments?", options: [["So that all the solid reacts and the moles reacting are known", "Correct: the amount of solid fixes n in ΔH = −q/n."], ["So that the temperature rise is as small as possible", "A small rise would increase the percentage uncertainty."], ["So that the acid acts as a catalyst", "The acid is a reactant, not a catalyst."], ["So that no carbon dioxide is produced", "Reaction 1 always produces carbon dioxide."]], answer: "A", explanation: "With excess acid every mole of solid reacts, so n is the amount of solid weighed out." }),
        P.manual({ label: "(d)", marks: 1, stem: "State one reason why the answer from this method may differ from the data-book value.", points: ["Heat loss to the surroundings (or heat capacity of the cup ignored), or CO₂ escaping carries away spray/energy, or solutions assumed to have c and density of water."], modelAnswer: "Heat is lost from the polystyrene cup to the surroundings in both experiments." }),
      ],
      hints: ["Both routes reach MgCl₂(aq) + H₂O(l) + CO₂(g).", "Subtract reaction 2 from reaction 1."],
      explanation: `ΔH(decomposition) = ΔH₁ − ΔH₂ = +${dpStr(dH, 1)} kJ mol⁻¹: endothermic, as expected for a carbonate decomposition.`,
    });
  }
  b.card("DEFINITION", "Hess's law", "The enthalpy change of a reaction is independent of the route, provided the initial and final conditions are the same.");
  b.card("FORMULA", "ΔH from enthalpies of formation", "ΔHr = ΣΔHf(products) − ΣΔHf(reactants); elements in standard states = 0.");
  b.card("FORMULA", "ΔH from enthalpies of combustion", "ΔHr = ΣΔHc(reactants) − ΣΔHc(products).");
  b.card("FORMULA", "ΔH from bond energies", "ΔH ≈ Σ(bonds broken) − Σ(bonds made); gases only.");
  b.card("DEFINITION", "Bond energy", "Energy needed to break one mole of a given covalent bond in gaseous molecules.");
  b.card("CONCEPT", "Exact vs average bond energy", "Exact: one bond in one molecule (H–H, Cl–Cl). Average: mean over many compounds (C–H, C–C).");
  b.card("CONCEPT", "Why bond-energy ΔH values are approximate", "Average bond energies are used, and substances that are liquids or solids in standard states are treated as gases.");
  b.card("CONCEPT", "Finding ΔH for CaCO₃ → CaO + CO₂", "Measure ΔH of CaCO₃ + acid and of CaO + acid; ΔH = ΔH₁ − ΔH₂.");
  b.card("FACT", "ΔHc of graphite and ΔHf of CO₂", "The same reaction, C(s) + O₂(g) → CO₂(g), so the same value.");
});
