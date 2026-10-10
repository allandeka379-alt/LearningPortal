// W1b: achem.energetics.born-haber
import { concept, P, t, ce, latticeEnergyFromCycle, sfStr, dpStr, chk } from "../lib.mjs";

const sgn = (x) => (x < 0 ? `−${-x}` : `+${x}`);

concept("achem.energetics.born-haber", { file: "energetics/born-haber", keyPrefix: "energetics.born-haber" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which equation represents the lattice energy of potassium fluoride?",
    options: [
      [t`$\ce{K+(g) + F-(g) -> KF(s)}$`, "Correct: one mole of solid formed from its gaseous ions."],
      [t`$\ce{K(s) + 1/2F2(g) -> KF(s)}$`, "This is the enthalpy change of formation (from the elements)."],
      [t`$\ce{K+(aq) + F-(aq) -> KF(s)}$`, "Lattice energy starts from gaseous ions, not aqueous ions."],
      [t`$\ce{KF(s) -> K+(g) + F-(g)}$`, "This is lattice dissociation, the reverse of the process defined as lattice energy here."],
    ],
    answer: "A",
    explanation: "Lattice energy: the enthalpy change when one mole of an ionic compound is formed from its gaseous ions under standard conditions (exothermic).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which equation represents the first electron affinity of bromine?",
    options: [
      [t`$\ce{Br(g) + e- -> Br-(g)}$`, "Correct: one mole of gaseous atoms each gains one electron."],
      [t`$\ce{1/2Br2(l) + e- -> Br-(g)}$`, "This combines atomisation with electron gain; the electron affinity starts from gaseous atoms."],
      [t`$\ce{Br2(g) + 2e- -> 2Br-(g)}$`, "This starts from molecules and forms two moles of ions."],
      [t`$\ce{Br(g) -> Br+(g) + e-}$`, "This is the first ionisation energy, which removes an electron."],
    ],
    answer: "A",
    explanation: "First electron affinity: each atom in one mole of gaseous atoms gains one electron to form one mole of gaseous 1− ions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which equation represents the standard enthalpy change of atomisation of bromine?",
    options: [
      [t`$\ce{1/2Br2(l) -> Br(g)}$`, "Correct: one mole of gaseous atoms from the element in its standard state (liquid)."],
      [t`$\ce{Br2(l) -> 2Br(g)}$`, "This forms two moles of atoms; atomisation is per mole of atoms formed."],
      [t`$\ce{1/2Br2(g) -> Br(g)}$`, "Bromine's standard state is the liquid, so vaporisation must be included."],
      [t`$\ce{Br2(g) -> 2Br(g)}$`, "This is the Br–Br bond energy, for two moles of atoms from gaseous molecules."],
    ],
    answer: "A",
    hints: ["What is the state of bromine at 298 K?", "How many moles of atoms does atomisation form?"],
    explanation: "Bromine is a liquid under standard conditions, so ΔH⦵at(Br) includes vaporising half a mole of Br₂ as well as breaking half a mole of Br–Br bonds.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which list puts the lattice energies in order from most exothermic to least exothermic?",
    options: [
      ["CaO, NaF, KBr", "Correct: CaO has 2+ and 2− ions; NaF and KBr are 1+/1−, with smaller ions in NaF."],
      ["KBr, NaF, CaO", "This is the reverse order: larger, singly charged ions give the least exothermic value."],
      ["NaF, CaO, KBr", "Ionic charge has a larger effect than size: the doubly charged ions in CaO win."],
      ["CaO, KBr, NaF", "K⁺ and Br⁻ are larger than Na⁺ and F⁻, so KBr is less exothermic than NaF."],
    ],
    answer: "A",
    hints: ["Compare charges first, then sizes."],
    explanation: "Charges: Ca²⁺O²⁻ (2 × 2) far outweigh the 1 × 1 salts. Between NaF and KBr, both ions in NaF are smaller, so their centres are closer and the attraction is stronger.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about the second electron affinity of oxygen are correct?\n\n1. It is endothermic.\n2. The electron is added to a negatively charged ion, which repels it.\n3. It is smaller in magnitude than the first electron affinity of oxygen.",
    options: [
      ["1 and 2 only", "Correct: EA₂ is endothermic because of repulsion; at about +798 kJ mol⁻¹ it is much larger in magnitude than EA₁ (about −141)."],
      ["1, 2 and 3", "Statement 3 is false: EA₂ is several times larger in magnitude than EA₁."],
      ["2 and 3 only", "Statement 1 is true (it is endothermic), and statement 3 is false."],
      ["1 only", "Statement 2 is also true: it is the reason for statement 1."],
    ],
    answer: "A",
    hints: ["What charge does the species receiving the electron already have?"],
    explanation: "O⁻(g) + e⁻ → O²⁻(g) needs energy to overcome the repulsion between the O⁻ ion and the incoming electron, so EA₂ is endothermic, and it is far larger in size than the exothermic EA₁.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements explain why the lattice energy of lithium fluoride is more exothermic than that of caesium iodide?\n\n1. Li⁺ and F⁻ have larger charges than Cs⁺ and I⁻.\n2. Li⁺ is smaller than Cs⁺.\n3. F⁻ is smaller than I⁻.",
    options: [
      ["1, 2 and 3", "Statement 1 is false: all four ions are singly charged."],
      ["2 and 3 only", "Correct: both ions in LiF are smaller, so they are closer together; the charges are the same (1+ and 1−)."],
      ["1 and 2 only", "Statement 1 is false, and statement 3 is true."],
      ["1 only", "Statement 1 is the only false statement here."],
    ],
    answer: "B",
    hints: ["Check the charges on all four ions first."],
    explanation: "With equal charges, ionic radius decides: smaller ions pack closer together and the electrostatic attraction, and so the lattice energy, is larger.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Magnesium chloride is MgCl₂, not MgCl, even though the second ionisation energy of magnesium is large. What is the best explanation?",
    options: [
      ["The extra lattice energy from Mg²⁺ ions outweighs IE₂, so ΔHf is more negative.", "Correct: the extra lattice energy from the 2+ ion more than pays for IE₂."],
      ["The second ionisation energy of magnesium is exothermic, so it helps form Mg²⁺.", "All ionisation energies are endothermic."],
      ["MgCl₂ would have a less exothermic lattice energy than MgCl, so less energy is needed.", "A 2+ ion gives a more exothermic lattice energy, not a less exothermic one."],
      ["Chlorine has an exothermic second electron affinity that forms Cl²⁻ ions in the lattice.", "Chloride ions are Cl⁻; no second electron affinity is involved."],
    ],
    answer: "A",
    hints: ["Compare the extra cost (IE₂) with the extra gain (lattice energy)."],
    explanation: "Forming Mg²⁺ costs IE₂ (and an extra Cl atomisation and electron affinity are involved), but the lattice energy of MgCl₂ is much more exothermic than that of a hypothetical MgCl. Overall ΔHf(MgCl₂) is far more negative, so MgCl₂ is the stable compound.",
  });
  {
    const v = latticeEnergyFromCycle(-394, [89, 418, 112, -325]);
    b.num({
      d: 3, skill: "APPLICATION", daily: true,
      stem: "Calculate the lattice energy of potassium bromide, in kJ mol⁻¹, from these data (kJ mol⁻¹): ΔH⦵f(KBr) −394; ΔH⦵at(K) +89; IE₁(K) +418; ΔH⦵at(Br) +112; EA₁(Br) −325.",
      value: v, unit: "kJ/mol",
      wrong: [String(-v), String(latticeEnergyFromCycle(-394, [89, 418, 112, 325]))],
      hints: ["ΔHlatt = ΔHf − (sum of the other terms)."],
      explanation: `Sum of the other terms = 89 + 418 + 112 − 325 = ${89 + 418 + 112 - 325} kJ. ΔHlatt = −394 − ${89 + 418 + 112 - 325} = ${v} kJ mol⁻¹. Using +325 for the electron affinity gives ${latticeEnergyFromCycle(-394, [89, 418, 112, 325])}.`,
    });
  }
  {
    const v = latticeEnergyFromCycle(-1220, [178, 590, 1150, 2 * 79, 2 * -328]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "Calculate the lattice energy of calcium fluoride, CaF₂, in kJ mol⁻¹. Data (kJ mol⁻¹): ΔH⦵f(CaF₂) −1220; ΔH⦵at(Ca) +178; IE₁(Ca) +590; IE₂(Ca) +1150; ΔH⦵at(F) +79; EA₁(F) −328.",
      value: v, unit: "kJ/mol",
      wrong: [String(latticeEnergyFromCycle(-1220, [178, 590, 1150, 79, -328])), String(latticeEnergyFromCycle(-1220, [178, 590, 2 * 79, 2 * -328]))],
      hints: ["Two fluorine atoms must be formed and ionised.", "Ca²⁺ needs both ionisation energies."],
      explanation: `1. Terms to the gaseous ions: 178 + 590 + 1150 + 2(79) + 2(−328) = ${178 + 590 + 1150 + 158 - 656} kJ.\n2. ΔHlatt = −1220 − ${178 + 590 + 1150 + 158 - 656} = ${v} kJ mol⁻¹.\n3. Forgetting to double the fluorine terms gives ${latticeEnergyFromCycle(-1220, [178, 590, 1150, 79, -328])}; leaving out IE₂ gives ${latticeEnergyFromCycle(-1220, [178, 590, 2 * 79, 2 * -328])}.`,
    });
  }
  {
    const ea = -334 - (81 + 403 + 107 + -630);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Use these data (kJ mol⁻¹) to calculate the first electron affinity of iodine: ΔH⦵f(RbI) −334; ΔH⦵at(Rb) +81; IE₁(Rb) +403; ΔH⦵at(I) +107; lattice energy of RbI −630.",
      value: ea, unit: "kJ/mol",
      wrong: [String(-ea)],
      hints: ["ΔHf = ΔHat(K) + IE₁ + ΔHat(I) + EA₁ + ΔHlatt.", "Rearrange for EA₁."],
      explanation: `1. ΔHf = sum of all the other steps: −334 = 81 + 403 + 107 + EA₁ + (−630).\n2. EA₁ = −334 − 81 − 403 − 107 + 630 = ${ea} kJ mol⁻¹.\n3. It is less exothermic than the value for chlorine, as expected: iodine's outer shell is further from the nucleus and more shielded.`,
    });
  }
  {
    const ea2 = -548 - (180 + 502 + 966 + 248 - 141 + -3054);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "Calculate a value for the second electron affinity of oxygen, in kJ mol⁻¹, from these data (kJ mol⁻¹) for barium oxide: ΔH⦵f(BaO) −548; ΔH⦵at(Ba) +180; IE₁(Ba) +502; IE₂(Ba) +966; ΔH⦵at(O) +248; EA₁(O) −141; lattice energy of BaO −3054.",
      value: ea2, unit: "kJ/mol",
      wrong: [String(-ea2)],
      hints: ["Every step from the elements to the solid adds up to ΔHf.", "The answer should be endothermic."],
      explanation: `−548 = 180 + 502 + 966 + 248 − 141 + EA₂ − 3054, so EA₂ = −548 − (${180 + 502 + 966 + 248 - 141 - 3054}) = +${ea2} kJ mol⁻¹: endothermic, as expected for adding an electron to O⁻. (Values from different data sets vary, so quoted EA₂ values for oxygen range from about +750 to +800 kJ mol⁻¹.)`,
    });
  }
  {
    const v = 326 + 577 + 1820 + 2740;
    b.num({
      d: 3, skill: "APPLICATION",
      stem: "Calculate the total enthalpy change, in kJ mol⁻¹, to convert one mole of aluminium metal into gaseous Al³⁺ ions. Data (kJ mol⁻¹): ΔH⦵at(Al) +326; IE₁ +577; IE₂ +1820; IE₃ +2740.",
      value: v, unit: "kJ/mol",
      wrong: [String(577 + 1820 + 2740), String(326 + 577)],
      hints: ["Atomise first, then remove three electrons one at a time."],
      explanation: `Al(s) → Al(g) → Al⁺(g) → Al²⁺(g) → Al³⁺(g): 326 + 577 + 1820 + 2740 = ${v} kJ mol⁻¹. This large energy is repaid by the very exothermic lattice energies of aluminium compounds such as Al₂O₃.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lattice energies are found by measuring the temperature change when gaseous ions combine in a calorimeter.",
    answer: false,
    explanation: "False. Gaseous ions cannot be collected and combined in a calorimeter, so lattice energies are calculated indirectly with Born-Haber cycles (Hess's law).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The first electron affinities of the Group 17 elements are all exothermic.",
    answer: true,
    explanation: "True. Each halogen atom attracts an extra electron into its outer p sub-shell, releasing energy (about −328 to −349 kJ mol⁻¹ for F and Cl, less exothermic for Br and I).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process with its name.",
    pairs: [
      [t`$\ce{Ca(s) -> Ca(g)}$`, "enthalpy change of atomisation"],
      [t`$\ce{Ca+(g) -> Ca^2+(g) + e-}$`, "second ionisation energy"],
      [t`$\ce{S-(g) + e- -> S^2-(g)}$`, "second electron affinity"],
      [t`$\ce{Ca^2+(g) + S^2-(g) -> CaS(s)}$`, "lattice energy"],
    ],
    extraRight: ["enthalpy change of formation"],
    explanation: "Atomisation makes gaseous atoms; ionisation energies remove electrons from gaseous atoms or ions; electron affinities add electrons; lattice energy forms the solid from gaseous ions.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence about lattice energy.",
    template: "Lattice energy becomes more exothermic when the ionic charges are {{blank:a}} and the ionic radii are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["larger"], choices: ["larger", "smaller"] },
      { id: "b", accepted: ["smaller"], choices: ["smaller", "larger"] },
    ],
    explanation: "High charge and small radius (high charge density) give the strongest attraction between ions.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: t`Name the enthalpy change for $\ce{Li(g) -> Li+(g) + e-}$.`,
    accepted: ["first ionisation energy", "1st ionisation energy", "first ionization energy", "ionisation energy", "first ionisation enthalpy", "first ionisation energy of lithium"],
    wrong: ["electron affinity", "atomisation"],
    explanation: "Removing one electron from each atom in a mole of gaseous atoms is the first ionisation energy (endothermic).",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Define the lattice energy of an ionic compound.",
    points: ["The enthalpy change when one mole of the ionic compound is formed", "from its gaseous ions", "under standard conditions."],
    modelAnswer: "The enthalpy change when one mole of an ionic solid is formed from its gaseous ions under standard conditions.",
    explanation: "One mole, gaseous ions, standard conditions: each scores. (Formation from the ions makes it negative.)",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the lattice energy of calcium oxide is much more exothermic than that of potassium fluoride.",
    points: ["Ca²⁺ and O²⁻ have twice the charge of K⁺ and F⁻.", "Ca²⁺ is smaller than K⁺ (higher charge density), so the ions are closer together.", "So the electrostatic attraction between the oppositely charged ions is much stronger in CaO."],
    modelAnswer: "In CaO both ions carry a charge of 2, compared with 1 in KF, and Ca²⁺ is smaller than K⁺, so the ions are closer together. Both effects make the electrostatic attraction between the ions in CaO much stronger, so more energy is released when its lattice forms.",
    hints: ["Charge and ionic radius."],
    explanation: "Name both factors and link them to the strength of electrostatic attraction.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the first electron affinity becomes less exothermic from chlorine to iodine.",
    points: ["The incoming electron enters a shell further from the nucleus (larger atomic radius) with more shielding by inner shells.", "So it is attracted less strongly by the nucleus and less energy is released."],
    modelAnswer: "Down the group the atoms get bigger, so the added electron goes into a shell further from the nucleus and is more shielded; the attraction is weaker, so less energy is released.",
    hints: ["Think about distance and shielding."],
    explanation: "Distance and shielding outweigh the increase in nuclear charge down the group.",
  });
  // Structured: SrCl2 cycle
  {
    const terms = [164, 548, 1060, 242, 2 * -349];
    const v = latticeEnergyFromCycle(-829, terms);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Strontium chloride, SrCl₂, is an ionic solid. Data (kJ mol⁻¹): ΔH⦵f(SrCl₂) −829; ΔH⦵at(Sr) +164; IE₁(Sr) +548; IE₂(Sr) +1060; Cl–Cl bond energy +242; EA₁(Cl) −349.",
      parts: [
        P.short({ label: "(a)", marks: 1, stem: t`Write an equation, with state symbols, for the lattice energy of strontium chloride. (Type it as, for example, Sr2+(g) + 2Cl-(g) -> SrCl2(s).)`, accepted: ["Sr2+(g) + 2Cl-(g) -> SrCl2(s)", "Sr2+(g) + 2Cl-(g) → SrCl2(s)", "Sr^2+(g) + 2Cl^-(g) -> SrCl2(s)", "Sr²⁺(g) + 2Cl⁻(g) → SrCl₂(s)"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["Sr(s) + Cl2(g) -> SrCl2(s)"], explanation: "Gaseous ions in the formula ratio form one mole of solid: Sr²⁺(g) + 2Cl⁻(g) → SrCl₂(s)." }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the total enthalpy change, in kJ mol⁻¹, to form two moles of gaseous chlorine atoms from one mole of Cl₂(g).", value: 242, unit: "kJ/mol", wrong: ["121"], explanation: "Two moles of Cl atoms need one mole of Cl–Cl bonds broken: +242 kJ (2 × ΔHat(Cl), each +121)." }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the lattice energy of strontium chloride, in kJ mol⁻¹.", value: v, unit: "kJ/mol", wrong: [String(latticeEnergyFromCycle(-829, [164, 548, 1060, 121, -349])), String(-v)], explanation: `Terms: 164 + 548 + 1060 + 242 + 2(−349) = ${terms.reduce((a, x) => a + x, 0)} kJ. ΔHlatt = −829 − ${terms.reduce((a, x) => a + x, 0)} = ${v} kJ mol⁻¹.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Predict, with a reason, whether the lattice energy of strontium bromide is more or less exothermic than that of strontium chloride.", points: ["Less exothermic.", "Br⁻ is larger than Cl⁻ (same charge).", "So the ions are further apart and the electrostatic attraction is weaker."], modelAnswer: "Less exothermic: bromide ions have the same charge as chloride ions but a larger radius, so the distance between ion centres is greater and the attraction between Sr²⁺ and Br⁻ is weaker." }),
      ],
      hints: ["Two chloride ions: double the chlorine terms.", "Sr²⁺ needs IE₁ and IE₂."],
      explanation: `Lattice energy of SrCl₂ = ${v} kJ mol⁻¹; SrBr₂ is less exothermic because Br⁻ is larger.`,
    });
  }
  // Structured: sodium halide trend
  b.struct({
    d: 3, skill: "ANALYSIS", examStyle: true,
    stem: "Data: lattice energies / kJ mol⁻¹: NaF −923, NaCl −787, NaBr −747, NaI −704.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which property of the anion explains the trend?", options: [["its ionic radius", "Correct: the charge is the same (1−) for every halide ion; only the size changes."], ["its charge", "All four halide ions have a charge of 1−."], ["its electronegativity", "Electronegativity describes atoms in covalent bonds, not attraction between ions in a lattice."], ["its electron affinity", "Electron affinity is a separate term in the cycle; it does not set the lattice energy."]], answer: "A", explanation: "Same charge, increasing radius from F⁻ to I⁻." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain the trend.", points: ["From F⁻ to I⁻ the anion radius increases, so the distance between ion centres increases.", "The electrostatic attraction between Na⁺ and the halide ion weakens, so less energy is released (lattice energy less exothermic)."], modelAnswer: "The halide ions get larger down the group, so the centres of the Na⁺ and X⁻ ions are further apart, the attraction is weaker and the lattice energy becomes less exothermic." }),
      P.mcq({ label: "(c)", stem: "Which value is most likely for the lattice energy of potassium fluoride, KF?", options: [["−821 kJ mol⁻¹", "Correct: K⁺ is larger than Na⁺, so KF is less exothermic than NaF (−923) but F⁻ is small."], ["−1050 kJ mol⁻¹", "This is more exothermic than NaF, which would need a smaller cation than Na⁺."], ["−3500 kJ mol⁻¹", "Values this large need doubly charged ions, such as in CaO."], ["+821 kJ mol⁻¹", "Lattice energy (formation from gaseous ions) is always negative."]], answer: "A", explanation: "Replacing Na⁺ by the larger K⁺ makes the value less exothermic than NaF." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why the lattice energy of magnesium fluoride (about −2960 kJ mol⁻¹) is so much more exothermic than that of sodium fluoride.", points: ["Mg²⁺ has twice the charge of Na⁺.", "Mg²⁺ is smaller than Na⁺, so the ions are closer and the attraction is much stronger (and there are two F⁻ per formula unit)."], modelAnswer: "Mg²⁺ carries a 2+ charge and is smaller than Na⁺, so its attraction to fluoride ions is much stronger; in addition each formula unit contains two fluoride ions." }),
    ],
    hints: ["Which quantity is the same for all four ions?"],
    explanation: "Charge is the same, so ionic radius explains the halide trend; doubling the cation charge (Mg²⁺) has a much bigger effect.",
  });
  b.card("DEFINITION", "Lattice energy", "Enthalpy change when one mole of an ionic compound is formed from its gaseous ions under standard conditions (exothermic).");
  b.card("DEFINITION", "Enthalpy change of atomisation", "Enthalpy change when one mole of gaseous atoms is formed from the element in its standard state; always endothermic.");
  b.card("DEFINITION", "First electron affinity", "Enthalpy change when each atom in one mole of gaseous atoms gains one electron to form gaseous 1− ions.");
  b.card("CONCEPT", "Why the second electron affinity is endothermic", "The electron is added to a negative ion, which repels it, so energy must be supplied.");
  b.card("FORMULA", "Lattice energy from a Born-Haber cycle", "ΔHlatt = ΔHf − (atomisations + ionisation energies + electron affinities), each multiplied up for the formula.");
  b.card("CONCEPT", "Factors affecting lattice energy", "Larger ionic charges and smaller ionic radii (higher charge density) give a more exothermic lattice energy.");
  b.card("FACT", "Atomisation of chlorine", "½Cl₂(g) → Cl(g): half the Cl–Cl bond energy.");
  b.card("CONCEPT", "Common error in CaCl₂-type cycles", "Double the anion terms (atomisation and electron affinity) and use IE₁ + IE₂ for the 2+ cation.");
  b.card("CONCEPT", "Why first electron affinity is less exothermic from Cl to I", "Electron added further from the nucleus with more shielding, so it is attracted less strongly.");
});
