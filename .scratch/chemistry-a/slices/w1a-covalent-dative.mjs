// W1a: bonding.covalent-dative — covalent bonds, dot-and-cross, expanded octets, odd-electron species, dative bonds,
// bond energy and length, reactivity.
import { concept, P, t, chk, L, sfStr, sciStr } from "../lib.mjs";

// Data booklet bond energies (kJ mol⁻¹)
const BE = { HH: 436, NN3: 944, OO2: 496, FF: 158, ClCl: 242, BrBr: 193, II: 151, HF: 562, HCl: 431, HBr: 366, HI: 299, CH: 410, CC: 350, CC2: 610, CC3: 840, CCl: 340, CBr: 280, CI: 240, NH: 390, OH: 460, CO: 360, CO2: 740 };

concept("achem.bonding.covalent-dative", { file: "bonding/covalent-dative", keyPrefix: "bonding.covalent-dative" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best describes a covalent bond?",
    options: [
      ["The attraction between two nuclei and a shared pair of electrons.", "Correct: the bond is an electrostatic attraction involving the shared pair."],
      ["The attraction between oppositely charged ions.", "This is an ionic bond."],
      ["The attraction between positive ions and delocalised electrons.", "This is a metallic bond."],
      ["The transfer of a pair of electrons from one atom to another.", "Transfer gives ions; a covalent bond involves sharing."],
    ],
    answer: "A",
    explanation: "A covalent bond is the electrostatic attraction between the nuclei of two atoms and the pair of electrons shared between them.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`How many lone pairs of electrons are there in one molecule of carbon dioxide, $\ce{CO2}$?`,
    options: [["4", "Correct: two lone pairs on each oxygen atom; carbon has none."], ["2", "Each oxygen has two lone pairs, so there are four in total."], ["0", "The oxygen atoms each keep two non-bonding pairs."], ["6", "Six would be correct if each O had three lone pairs, but each O shares two pairs with carbon."]],
    answer: "A",
    explanation: "O=C=O: each oxygen shares two pairs with carbon and keeps two lone pairs. Carbon uses all four outer electrons in bonding.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which species contains a coordinate (dative covalent) bond?",
    options: [[t`$\ce{NH4+}$`, "Correct: nitrogen donates its lone pair to H⁺."], [t`$\ce{NH3}$`, "Ammonia has three ordinary N–H bonds and a lone pair, but no dative bond."], [t`$\ce{CH4}$`, "Each C–H bond uses one electron from C and one from H."], [t`$\ce{C2H4}$`, "Ethene has ordinary single and double covalent bonds."]],
    answer: "A",
    explanation: "NH₃ + H⁺ → NH₄⁺: the N lone pair forms the fourth N–H bond.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`In the dimer $\ce{Al2Cl6}$, how many coordinate bonds are there, and which atom donates the electron pair in each?`,
    options: [["two; a chlorine atom donates to an aluminium atom", "Correct: each bridging Cl donates a lone pair to the electron-deficient Al of the other unit."], ["two; an aluminium atom donates to a chlorine atom", "Aluminium in AlCl₃ is electron-deficient; it accepts, not donates."], ["one; a chlorine atom donates to an aluminium atom", "Each AlCl₃ unit accepts one pair, so there are two coordinate bonds."], ["six; every Al–Cl bond is a coordinate bond", "Only the two bonds from bridging chlorines to aluminium are dative."]],
    answer: "A",
    hints: ["Which atom in AlCl₃ has only six outer electrons?"],
    explanation: "Al in AlCl₃ has six outer electrons. A Cl of each unit donates a lone pair to the Al of the other: two coordinate bonds, giving each Al an octet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which molecule has an expanded octet (more than eight electrons around the central atom)?",
    options: [[t`$\ce{SF6}$`, "Correct: six bonding pairs, twelve electrons around sulfur."], [t`$\ce{BF3}$`, "BF₃ has only six electrons around boron: an incomplete octet."], [t`$\ce{NH3}$`, "N has eight electrons: three bonding pairs and one lone pair."], [t`$\ce{H2O}$`, "O has eight electrons: two bonding pairs and two lone pairs."]],
    answer: "A",
    explanation: "Period 3 elements such as S and P can have more than eight outer electrons (SF₆, PCl₅); Period 2 elements cannot.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`Bromochloromethane, $\ce{CH2BrCl}$, is warmed with aqueous sodium hydroxide. Which halogen is replaced first, and why?`,
    options: [["bromine, because the C–Br bond is weaker than the C–Cl bond", "Correct: the weaker bond breaks more easily; bond strength outweighs polarity."], ["chlorine, because the C–Cl bond is more polar than the C–Br bond", "C–Cl is more polar, but polarity is not the deciding factor; bond strength is."], ["chlorine, because chlorine is the more electronegative halogen", "Higher electronegativity makes C–Cl more polar but also stronger, so it is broken less easily."], ["bromine, because the C–Br bond is shorter than the C–Cl bond", "C–Br is longer than C–Cl because bromine is the larger atom."]],
    answer: "A",
    hints: ["Which matters more for these reactions: bond polarity or bond energy?"],
    explanation: `C–Br (${BE.CBr} kJ mol⁻¹) is weaker than C–Cl (${BE.CCl} kJ mol⁻¹), so the C–Br bond breaks first and bromide is replaced first, even though C–Cl is the more polar bond.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about bonds between two carbon atoms:\n\n1. C≡C is shorter than C=C.\n2. C≡C has a larger bond energy than C=C.\n3. C=C has exactly twice the bond energy of C–C.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", `Correct: C≡C ${BE.CC3}, C=C ${BE.CC2}, C–C ${BE.CC} kJ mol⁻¹, so the C=C value is less than double.`], ["1, 2 and 3", `Statement 3 is wrong: 2 × ${BE.CC} = ${2 * BE.CC}, more than ${BE.CC2}.`], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: more shared pairs, stronger bond."]],
    answer: "A",
    hints: ["Check statement 3 with the data booklet values."],
    explanation: `More shared pairs give shorter, stronger bonds. C=C (${BE.CC2}) is less than 2 × C–C (${2 * BE.CC}) because the second (π) bond is weaker than the first (σ).`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Statements about nitrogen monoxide, NO:\n\n1. It has an odd number of electrons.\n2. It is a free radical.\n3. Both atoms have an octet of electrons.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: 5 + 6 = 11 outer electrons, so one is unpaired; an octet on both atoms is impossible."], ["1, 2 and 3", "With 11 outer electrons, both atoms cannot have eight."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 follows from statement 1: an unpaired electron makes it a radical."]],
    answer: "A",
    hints: ["Add the outer electrons of N and O."],
    explanation: "N (5) + O (6) = 11 outer electrons: odd, so one is unpaired and NO is a radical. With an odd number of electrons, one electron must be unpaired, so both atoms cannot have complete octets.",
  });

  // ---- numerical
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many electrons are shared between the two atoms in a nitrogen molecule, N₂?",
    value: chk(3 * 2, 6), wrong: [3, 2],
    explanation: "A triple bond is three shared pairs: six electrons.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Use the data booklet average bond energy of C–H (${BE.CH} kJ mol⁻¹) to calculate the energy, in kJ, needed to break all the C–H bonds in one mole of methane, CH₄(g).`,
    value: chk(4 * BE.CH, 1640), unit: "kJ", wrong: [BE.CH],
    hints: ["How many C–H bonds are in each molecule?"],
    explanation: `CH₄ has four C–H bonds: 4 × ${BE.CH} = ${4 * BE.CH} kJ per mole of methane.`,
  });
  {
    const perBond = (BE.NN3 * 1000) / L;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`The bond energy of N≡N is ${BE.NN3} kJ mol⁻¹. Calculate the energy, in J, needed to break the bond in **one** nitrogen molecule. ($L = 6.022 \times 10^{23}\ \text{mol}^{-1}$)`,
      value: perBond, unit: "J", wrong: [BE.NN3 / L],
      hints: ["Convert kJ to J, then divide by L."],
      explanation: `1. ${BE.NN3} kJ mol⁻¹ = ${BE.NN3 * 1000} J mol⁻¹.\n2. Per molecule: ${BE.NN3 * 1000} ÷ 6.022 × 10²³ = ${sciStr(perBond)} J. (Not converting kJ to J gives a value 1000 times too small.)`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "How many electrons are in the outer shell of phosphorus in PCl₅?",
    value: chk(5 * 2, 10), wrong: [8, 5],
    explanation: "Five P–Cl bonding pairs: ten electrons around phosphorus, an expanded octet.",
  });
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the ammonium ion, the N–H bond formed by the coordinate bond is longer than the other three N–H bonds.",
    answer: false,
    explanation: "False. Once formed, a coordinate bond is identical to the others: all four N–H bonds have the same length and energy.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Boron trifluoride, BF₃, has only six electrons in the outer shell of boron.",
    answer: true,
    explanation: "True. Boron has three outer electrons and forms three B–F bonds: six electrons, so BF₃ can accept a lone pair (e.g. from NH₃).",
  });
  // ---- matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each molecule or ion with a feature of its bonding.",
    pairs: [[t`$\ce{N2}$`, "a triple bond"], [t`$\ce{SF6}$`, "an expanded octet"], [t`$\ce{H3O+}$`, "a coordinate bond"], [t`$\ce{NO2}$`, "an odd number of electrons"], [t`$\ce{C2H4}$`, "a carbon-carbon double bond"]],
    explanation: "N≡N; twelve electrons around S; O lone pair donated to H⁺; 5 + 6 + 6 = 17 outer electrons; C=C.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Going from F–F to I–I, the halogen-halogen bond becomes {{blank:a}} because the shared pair is {{blank:b}} from the nuclei. A C=C bond is {{blank:c}} than a C–C bond.",
    blanks: [
      { id: "a", accepted: ["longer"], choices: ["longer", "shorter", "more polar"] },
      { id: "b", accepted: ["further"], choices: ["further", "closer", "equally far"] },
      { id: "c", accepted: ["shorter"], choices: ["shorter", "longer", "weaker"] },
    ],
    explanation: "Larger atoms give longer bonds; more shared pairs give shorter, stronger bonds. (F–F is unusually weak, 158 kJ mol⁻¹, because of lone-pair repulsion in the very short bond.)",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the formula of the ion formed when a water molecule forms a coordinate bond to a hydrogen ion (type it as, for example, NH4+).",
    accepted: ["H3O+", "H₃O⁺", "H3O^+"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["H2O+", "OH-"],
    explanation: "H₂O + H⁺ → H₃O⁺ (the oxonium or hydronium ion).",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the dot-and-cross diagram of the ammonium ion, NH₄⁺, and explain how the coordinate bond forms.",
    points: ["N at the centre with four shared pairs to four H atoms; no lone pairs on N", "One shared pair has both electrons from nitrogen (shown as two dots / two of the same symbol)", "The ion is in square brackets with a + charge; the bond forms when the N lone pair is donated to H⁺ (which has an empty orbital)"],
    modelAnswer: "Nitrogen sits at the centre with four bonding pairs to four hydrogen atoms and no lone pair. Three pairs contain one electron from N and one from H; the fourth contains two electrons from nitrogen, because it formed when ammonia's lone pair was donated into the empty 1s orbital of H⁺. The whole ion is shown in square brackets with a + charge.",
    hints: ["Start from ammonia's lone pair."],
    explanation: "NH₃ + H⁺ → NH₄⁺ by donation of the lone pair.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Explain why nitrogen, N₂, is much less reactive than chlorine, Cl₂. Use the bond energies N≡N ${BE.NN3} and Cl–Cl ${BE.ClCl} kJ mol⁻¹.`,
    points: ["N₂ has a triple bond; Cl₂ has a single bond", `N≡N bond energy (${BE.NN3}) is much larger than Cl–Cl (${BE.ClCl})`, "So reactions of N₂ have a high activation energy / much energy is needed to break the bond", "N≡N is non-polar (and N₂ has no low-energy empty orbitals), so it is not attacked by nucleophiles or electrophiles"],
    modelAnswer: `Nitrogen has a triple bond with a very large bond energy (${BE.NN3} kJ mol⁻¹), compared with the single Cl–Cl bond (${BE.ClCl} kJ mol⁻¹). Breaking or weakening the N≡N bond needs a great deal of energy, so the activation energies of nitrogen's reactions are high. The bond is also non-polar, so the molecule does not attract electrophiles or nucleophiles. Chlorine's weak bond breaks easily, so chlorine is very reactive.`,
    hints: ["Compare the bond energies and think about activation energy."],
    explanation: "Strong, non-polar triple bond → high activation energy.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why phosphorus can form PCl₅ but nitrogen cannot form NCl₅.",
    points: ["Phosphorus (Period 3) has vacant 3d orbitals / can have more than eight outer electrons", "Nitrogen (Period 2) has no d orbitals in its outer shell, so it can have at most eight outer electrons (four pairs)"],
    modelAnswer: "Phosphorus is in Period 3 and can use its empty 3d orbitals to hold more than eight electrons, so it forms five bonds. Nitrogen's outer shell (n = 2) has only s and p orbitals, so it is limited to eight electrons and cannot form five bonds.",
    hints: ["Which shell are the outer electrons in?"],
    explanation: "Expanded octets need an outer shell with d orbitals (Period 3 onwards).",
  });
  // ---- practice structured
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Bond energies (kJ mol⁻¹, data booklet): H–F ${BE.HF}, H–Cl ${BE.HCl}, H–Br ${BE.HBr}, H–I ${BE.HI}.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe and explain the trend in the H–X bond energy down Group 17.", points: ["Bond energy decreases from H–F to H–I", "The halogen atom gets larger, so the bond is longer and the shared pair is further from (and more shielded from) the halogen nucleus, so it is attracted less strongly"], modelAnswer: "The bond energy falls from 562 to 299 kJ mol⁻¹ because the halogen atoms get larger: the bond gets longer and the shared pair is further from the halogen nucleus and more shielded, so it is held less strongly." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which hydrogen halide is most easily split into its atoms by heating?", options: [["hydrogen iodide", "Correct: it has the weakest bond."], ["hydrogen fluoride", "HF has the strongest bond."], ["hydrogen chloride", "HCl has the second strongest bond."], ["hydrogen bromide", "H–Br is stronger than H–I."]], answer: "A", explanation: "The weakest bond (H–I, 299 kJ mol⁻¹) breaks most easily; a hot wire dipped into HI gives violet iodine vapour." }),
      P.num({ label: "(c)", marks: 1, stem: "Calculate the difference, in kJ mol⁻¹, between the H–Cl and H–Br bond energies.", value: chk(BE.HCl - BE.HBr, 65), unit: "kJ/mol", wrong: [BE.HCl + BE.HBr], explanation: `${BE.HCl} − ${BE.HBr} = ${BE.HCl - BE.HBr} kJ mol⁻¹.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe the dot-and-cross diagram of hydrogen chloride (outer electrons only).", points: ["One shared pair (one dot from H, one cross from Cl) between H and Cl", "Three lone pairs on chlorine (six crosses)"], modelAnswer: "H and Cl share one pair (one electron from each atom). Chlorine also has three lone pairs, so it has eight outer electrons; hydrogen has two." }),
    ],
    hints: ["Link bond length to atomic size."],
    explanation: "Bond energies fall down the group as bonds lengthen; H–I is the easiest to break.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Aluminium chloride sublimes at about 180 °C. In the vapour at this temperature it exists mainly as Al₂Cl₆ molecules.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many outer electrons does an aluminium atom have in a single AlCl₃ molecule (counting shared electrons)?", value: 6, wrong: [8], explanation: "Three Al–Cl bonding pairs: six electrons." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe how two AlCl₃ molecules join to form Al₂Cl₆.", points: ["A chlorine atom in one AlCl₃ donates a lone pair to the aluminium of the other", "This happens twice / two coordinate (dative) bonds form", "Each aluminium then has eight outer electrons (four chlorine atoms around it)"], modelAnswer: "In each AlCl₃ the aluminium has only six outer electrons. A chlorine atom of one molecule donates a lone pair to the aluminium of the other, and a chlorine of the second molecule does the same in return, forming two coordinate bonds. Each aluminium then has an octet and four chlorine neighbours." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of bond formed between the two AlCl₃ units.", accepted: ["coordinate", "dative", "dative covalent", "coordinate bond", "dative bond", "dative covalent bond", "coordinate covalent"], wrong: ["ionic"], explanation: "Coordinate (dative covalent) bonds." }),
      P.manual({ label: "(d)", marks: 1, stem: "Suggest why aluminium chloride has a much lower melting (sublimation) point than aluminium oxide.", points: ["Aluminium chloride is covalent / simple molecular with weak intermolecular forces, whereas aluminium oxide is a giant ionic lattice with strong ionic bonds"], modelAnswer: "Aluminium chloride consists of covalent molecules held by weak intermolecular forces, whereas aluminium oxide is a giant ionic lattice with strong electrostatic attractions." }),
    ],
    hints: ["Aluminium in AlCl₃ is electron-deficient."],
    explanation: "Electron-deficient Al accepts lone pairs from bridging Cl atoms: two dative bonds in Al₂Cl₆.",
  });

  // ---- flashcards
  b.card("DEFINITION", "Define **covalent bond**.", "The electrostatic attraction between two nuclei and a shared pair of electrons.");
  b.card("DEFINITION", "Define **coordinate (dative covalent) bond**.", "A covalent bond in which both shared electrons come from the same atom.");
  b.card("DEFINITION", "Define **bond energy**.", "Energy needed to break one mole of a covalent bond in gaseous molecules (average value for bonds in different molecules).");
  b.card("FACT", "Examples of coordinate bonds?", "NH₄⁺ (N → H⁺), H₃O⁺ (O → H⁺), Al₂Cl₆ (two Cl → Al bonds), ligands in complex ions.");
  b.card("FACT", "Examples of expanded octets and odd-electron molecules?", "Expanded: PCl₅ (10), SF₆ (12), SO₂. Odd electrons: NO (11), NO₂ (17).");
  b.card("CONCEPT", "How do bond length and bond energy compare for C–C, C=C, C≡C?", "More shared pairs → shorter and stronger: C–C 350, C=C 610, C≡C 840 kJ mol⁻¹.");
  b.card("CONCEPT", "Why is nitrogen unreactive?", "N≡N triple bond with a very high bond energy (944 kJ mol⁻¹), non-polar → high activation energy.");
  b.card("CONCEPT", "Why are iodoalkanes hydrolysed fastest?", "C–I is the weakest C–halogen bond (240 kJ mol⁻¹); bond strength outweighs polarity.");
});
