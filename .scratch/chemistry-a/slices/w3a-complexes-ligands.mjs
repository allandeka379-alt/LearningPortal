// W3a: achem.transition.complexes-ligands (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t, chk, Mr, sfStr, dpStr } from "../lib.mjs";

concept("achem.transition.complexes-ligands", { file: "transition/complexes-ligands", keyPrefix: "transition.complexes-ligands" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which definition of a ligand is correct?",
    options: [
      ["a species with a lone pair that forms a dative bond to a central metal atom or ion", "Correct: the ligand donates both electrons of the bond."],
      ["a species that accepts a lone pair from a central metal atom or ion to form a covalent bond", "The metal ion is the lone-pair acceptor; the ligand is the donor."],
      ["a negative ion that is attracted to a metal ion by ionic bonding in a crystal lattice", "Ligands can be neutral (H₂O, NH₃) and are bonded by dative bonds, not ionic attraction."],
      ["a metal ion that is surrounded by water molecules in aqueous solution", "That describes the central ion of an aqua complex, not a ligand."],
    ],
    answer: "A",
    explanation: "A ligand is a Lewis base: it has a lone pair that it donates to the metal ion, forming a dative (coordinate) bond.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the coordination number of chromium in $\ce{[Cr(C2O4)3]^3-}$?`,
    options: [
      ["6", "Correct: each ethanedioate ion is bidentate, so 3 × 2 = 6 dative bonds."],
      ["3", "Three is the number of ligands, not the number of dative bonds."],
      ["4", "Four-coordination needs four dative bonds; here there are six."],
      ["9", "Each ethanedioate forms two bonds to the metal, not three."],
    ],
    answer: "A",
    explanation: "Coordination number = number of dative bonds to the central ion = 3 ligands × 2 bonds each = 6 (octahedral).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: t`What are the shape and bond angle of the $\ce{[CuCl4]^2-}$ ion?`,
    options: [
      ["tetrahedral, 109.5°", "Correct: four large chloride ligands arranged tetrahedrally."],
      ["square planar, 90°", "Square planar four-coordination is found in cisplatin and [Ni(CN)₄]²⁻."],
      ["octahedral, 90°", "Octahedral complexes have six ligands, as in [Cu(H₂O)₆]²⁺."],
      ["linear, 180°", "Linear complexes are two-coordinate, as in [CuCl₂]⁻."],
    ],
    answer: "A",
    explanation: "[CuCl₄]²⁻ and [CoCl₄]²⁻ are tetrahedral, with Cl-M-Cl angles of 109.5°.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the ligands are bidentate?\n\n1. 1,2-diaminoethane, H₂NCH₂CH₂NH₂\n2. ethanedioate, C₂O₄²⁻\n3. ammonia, NH₃",
    options: [
      ["1 and 2 only", "Correct: en donates from two N atoms and ethanedioate from two O atoms."],
      ["1, 2 and 3", "Ammonia has only one lone pair, so it is monodentate."],
      ["2 and 3 only", "1,2-diaminoethane is bidentate and ammonia is monodentate."],
      ["1 only", "Ethanedioate is also bidentate: two O⁻ atoms bond to the same metal ion."],
    ],
    answer: "A",
    hints: ["Count the donor atoms that can reach the same metal ion."],
    explanation: "A bidentate ligand forms two dative bonds to the same central ion: en (two N) and C₂O₄²⁻ (two O). NH₃ has one N lone pair.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Iron(III) forms a complex with six cyanide ligands. What is the formula of the complex?",
    options: [
      [t`$\ce{[Fe(CN)6]^3-}$`, "Correct: +3 + 6 × (−1) = −3."],
      [t`$\ce{[Fe(CN)6]^3+}$`, "This ignores the negative charges of the six cyanide ligands."],
      [t`$\ce{[Fe(CN)6]^4-}$`, "This is the iron(II) complex, hexacyanoferrate(II)."],
      [t`$\ce{[Fe(CN)3]}$`, "Iron(III) bonds to six cyanide ligands here, not three."],
    ],
    answer: "A",
    hints: ["Add the oxidation state of iron to the charges of the ligands."],
    explanation: "Charge of a complex = oxidation state of the metal + sum of ligand charges = +3 − 6 = −3: [Fe(CN)₆]³⁻, hexacyanoferrate(III).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Aqueous ammonia is added drop by drop, and then in excess, to aqueous copper(II) sulfate. What is seen?",
    options: [
      ["a pale blue precipitate, which dissolves to give a deep blue solution", "Correct: Cu(OH)₂ precipitates, then [Cu(NH₃)₄(H₂O)₂]²⁺ forms."],
      ["a pale blue precipitate, which does not dissolve in excess ammonia", "That is the result with excess sodium hydroxide, not ammonia."],
      ["a white precipitate, which dissolves to give a colourless solution", "That describes zinc ions with aqueous ammonia."],
      ["no precipitate; the solution turns yellow-green at once", "The yellow-green colour comes from chloride complexes with concentrated HCl."],
    ],
    answer: "A",
    hints: ["Ammonia solution contains a little hydroxide; excess ammonia acts as a ligand."],
    explanation: "Few drops: [Cu(OH)₂(H₂O)₄] (pale blue precipitate). Excess: ligand exchange gives soluble deep blue [Cu(NH₃)₄(H₂O)₂]²⁺.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`Which statements about the ion $\ce{[Cu(NH3)4(H2O)2]^2+}$ are correct?` + "\n\n1. The coordination number of copper is 6.\n2. The oxidation state of copper is +2.\n3. The complex is tetrahedral.",
    options: [
      ["1 and 2 only", "Correct: six ligands around Cu(II) in an (elongated) octahedron."],
      ["1, 2 and 3", "Statement 3 is false: six ligands give an octahedral shape."],
      ["2 and 3 only", "Statement 1 is true (four NH₃ and two H₂O) and statement 3 is false."],
      ["1 only", "Statement 2 is also true: the ligands are neutral, so the charge 2+ is copper's."],
    ],
    answer: "A",
    hints: ["Count every ligand, including the water molecules.", "Neutral ligands do not change the charge."],
    explanation: "4 NH₃ + 2 H₂O = 6 dative bonds (octahedral); all ligands are neutral, so the 2+ charge equals copper's oxidation state.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "EDTA⁴⁻ is a hexadentate ligand. What is the formula of the complex formed between a nickel(II) ion and one EDTA⁴⁻ ion?",
    options: [
      [t`$\ce{[Ni(EDTA)]^2-}$`, "Correct: +2 + (−4) = −2, with six dative bonds from one ligand."],
      [t`$\ce{[Ni(EDTA)]^2+}$`, "This ignores the 4− charge of the EDTA ligand."],
      [t`$\ce{[Ni(EDTA)]^6-}$`, "The ligand charge is 4−, and nickel(II) contributes 2+."],
      [t`$\ce{[Ni(EDTA)3]^10-}$`, "One hexadentate ligand already fills all six positions."],
    ],
    answer: "A",
    hints: ["How many positions does one EDTA⁴⁻ occupy?"],
    explanation: "One EDTA⁴⁻ occupies all six octahedral positions; charge = +2 − 4 = −2.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`What is the coordination number of nickel in $\ce{[Ni(en)2(H2O)2]^2+}$? (en = 1,2-diaminoethane, a bidentate ligand)`,
    value: 6,
    wrong: [4],
    explanation: "2 en × 2 bonds + 2 H₂O × 1 bond = 6.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: t`Give the oxidation number of cobalt in the complex ion $\ce{[CoCl(NH3)5]^2+}$.`,
    value: 3,
    wrong: [2],
    hints: ["Chloride is 1− and ammonia is neutral."],
    explanation: "x + (−1) + 5(0) = +2, so x = +3.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Chromium(III) forms an octahedral complex with two ethanedioate ions (C₂O₄²⁻) and two water molecules. What is the overall charge on the complex? (Type a signed number, such as +2 or −2.)",
    value: -1,
    wrong: [3],
    hints: ["Each ethanedioate is 2−; water is neutral."],
    explanation: "+3 + 2 × (−2) + 2 × 0 = −1: [Cr(C₂O₄)₂(H₂O)₂]⁻, coordination number 2 × 2 + 2 = 6.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`When excess aqueous ammonia is added to aqueous copper(II) ions, all six water ligands are replaced to form $\ce{[Cu(NH3)6]^2+}$.`,
    answer: false,
    explanation: "False. Only four water ligands are replaced: [Cu(NH₃)₄(H₂O)₂]²⁺ (partial substitution). Cobalt(II), by contrast, forms [Co(NH₃)₆]²⁺.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each complex with its shape.",
    pairs: [
      [t`$\ce{[Ag(NH3)2]+}$`, "linear"],
      [t`$\ce{[CoCl4]^2-}$`, "tetrahedral"],
      [t`$\ce{[Pt(NH3)2Cl2]}$`, "square planar"],
      [t`$\ce{[Co(H2O)6]^2+}$`, "octahedral"],
    ],
    extraRight: ["trigonal bipyramidal"],
    explanation: "Two ligands: linear; four large Cl⁻: tetrahedral; Pt(II): square planar; six water ligands: octahedral.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the description of the reaction of aqueous cobalt(II) chloride with concentrated hydrochloric acid.",
    template: "The {{blank:a}} solution of [Co(H₂O)₆]²⁺ turns {{blank:b}} as chloride ions replace the water ligands. The new complex is [CoCl₄]²⁻, which is {{blank:c}} in shape.",
    blanks: [
      { id: "a", accepted: ["pink"], choices: ["pink", "blue", "green", "yellow"] },
      { id: "b", accepted: ["blue"], choices: ["pink", "blue", "green", "yellow"] },
      { id: "c", accepted: ["tetrahedral"], choices: ["tetrahedral", "octahedral", "square planar", "linear"] },
    ],
    hints: ["Chloride ions are large: how many fit around the cobalt ion?"],
    explanation: "[Co(H₂O)₆]²⁺ (pink, octahedral) + 4Cl⁻ ⇌ [CoCl₄]²⁻ (blue, tetrahedral) + 6H₂O.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the formula, with its charge, of the copper complex ion formed when a large excess of concentrated hydrochloric acid is added to aqueous copper(II) sulfate. (Type it as, for example, [NiCl4]2-.)",
    accepted: ["[CuCl4]2-", "[CuCl4]^2-", "[CuCl₄]²⁻", "CuCl4 2-", "CuCl42-", "[CuCl4]-2"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["[CuCl4]2+", "[Cu(H2O)6]2+"],
    hints: ["Four chloride ions replace six water molecules."],
    explanation: "[Cu(H₂O)₆]²⁺ + 4Cl⁻ ⇌ [CuCl₄]²⁻ + 6H₂O; charge = +2 + 4(−1) = −2.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe what is seen when aqueous ammonia is added drop by drop, and then in excess, to aqueous copper(II) sulfate. Write an equation for each change.",
    points: [
      "A pale blue precipitate forms at first",
      t`Equation: $\ce{[Cu(H2O)6]^2+ + 2OH- -> [Cu(OH)2(H2O)4] + 2H2O}$ (or with NH₃ and NH₄⁺)`,
      "In excess the precipitate dissolves to give a deep (dark) blue solution",
      t`Equation: $\ce{[Cu(H2O)6]^2+ + 4NH3 <=> [Cu(NH3)4(H2O)2]^2+ + 4H2O}$`,
    ],
    modelAnswer: "A pale blue precipitate of copper(II) hydroxide forms: [Cu(H₂O)₆]²⁺ + 2OH⁻ → [Cu(OH)₂(H₂O)₄] + 2H₂O. In excess ammonia it dissolves to give a deep blue solution as ammonia replaces four water ligands: [Cu(H₂O)₆]²⁺ + 4NH₃ ⇌ [Cu(NH₃)₄(H₂O)₂]²⁺ + 4H₂O.",
    hints: ["Two stages: precipitation, then ligand exchange."],
    explanation: "Precipitation by OH⁻, then partial ligand exchange by NH₃.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: t`When concentrated HCl is added to $\ce{[Cu(H2O)6]^2+}$, the coordination number changes from 6 to 4. Explain why, and state how the shape and the charge of the complex change.`,
    points: [
      "Chloride ions are larger than water molecules, so only four fit around the Cu²⁺ ion",
      "The shape changes from octahedral to tetrahedral",
      "The charge changes from 2+ to 2− because four 1− ligands replace neutral water molecules",
    ],
    modelAnswer: "Chloride ions are much larger than water molecules, so there is room for only four around the copper(II) ion. The complex changes from octahedral [Cu(H₂O)₆]²⁺ to tetrahedral [CuCl₄]²⁻, and the charge changes from 2+ to 2− because each chloride ligand carries a 1− charge.",
    hints: ["Compare the sizes and charges of the two ligands."],
    explanation: "Ligand size sets the coordination number; ligand charge sets the overall charge.",
  });
  b.manualShort({
    d: 3, skill: "RECALL", marks: 2,
    stem: "Explain what is meant by a bidentate ligand, and give one example.",
    points: [
      "A ligand that forms two dative bonds to the same central metal ion (it has two donor atoms with lone pairs)",
      "Example: 1,2-diaminoethane (en) or ethanedioate (C₂O₄²⁻)",
    ],
    modelAnswer: "A bidentate ligand has two atoms with lone pairs that each form a dative bond to the same metal ion, for example 1,2-diaminoethane, H₂NCH₂CH₂NH₂, which bonds through both nitrogen atoms.",
    hints: ["Think of how many bonds one ligand makes to the metal."],
    explanation: "Bidentate ligands are chelating ligands that form a ring with the metal ion.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "Chipo dissolves some cobalt(II) chloride in water and divides the pink solution between three test tubes.\n\n| tube | reagent added | observation |\n|---|---|---|\n| 1 | concentrated hydrochloric acid | the solution turns blue |\n| 2 | aqueous sodium hydroxide | a blue precipitate forms |\n| 3 | aqueous ammonia, in excess | a blue precipitate forms, then dissolves to give a straw-coloured solution, which darkens on standing in air |",
    parts: [
      P.short({ label: "(a)", stem: "Give the formula of the pink complex ion. (Type it as, for example, [Ni(H2O)6]2+.)", accepted: ["[Co(H2O)6]2+", "[Co(H2O)6]^2+", "[Co(H₂O)₆]²⁺", "Co(H2O)6 2+"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["[CoCl4]2-"], explanation: "The hexaaquacobalt(II) ion, [Co(H₂O)₆]²⁺, is pink." }),
      P.mcq({ label: "(b)", stem: "What is the shape of the blue complex formed in tube 1?", options: [
        ["tetrahedral", "Correct: [CoCl₄]²⁻ has four large chloride ligands."],
        ["octahedral", "The pink aqua complex is octahedral; the chloro complex is not."],
        ["square planar", "Square planar complexes are typical of Pt(II) and Ni(CN)₄²⁻, not CoCl₄²⁻."],
        ["linear", "Linear complexes are two-coordinate."],
      ], answer: "A", explanation: "[CoCl₄]²⁻ is tetrahedral." }),
      P.num({ label: "(c)", stem: "State the coordination number of cobalt in the complex in the straw-coloured solution in tube 3.", value: 6, wrong: [4], explanation: "[Co(NH₃)₆]²⁺: six ammonia ligands." }),
      P.manual({ label: "(d)", marks: 2, stem: "Write an equation for the reaction in tube 1 and explain why adding water to the blue solution turns it pink again.", points: [t`$\ce{[Co(H2O)6]^2+ + 4Cl- <=> [CoCl4]^2- + 6H2O}$`, "Adding water (and diluting Cl⁻) moves the equilibrium to the left, re-forming pink [Co(H₂O)₆]²⁺"], modelAnswer: "[Co(H₂O)₆]²⁺ + 4Cl⁻ ⇌ [CoCl₄]²⁻ + 6H₂O. The reaction is reversible; adding water increases the concentration of a product and lowers [Cl⁻], so the position of equilibrium moves left and the pink aqua ion re-forms." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the straw-coloured solution in tube 3 darkens on standing in air.", points: ["Oxygen in the air oxidises cobalt(II) to cobalt(III)", t`Forming $\ce{[Co(NH3)6]^3+}$, which is darker in colour`], modelAnswer: "Air oxidises [Co(NH₃)₆]²⁺ to the cobalt(III) complex [Co(NH₃)₆]³⁺, which is a darker colour." }),
      P.tf({ label: "(f)", stem: "The blue precipitate in tube 2 is cobalt(II) hydroxide.", answer: true, explanation: "True: [Co(H₂O)₆]²⁺ + 2OH⁻ → [Co(OH)₂(H₂O)₄] + 2H₂O." }),
    ],
    hints: ["Large ligands give four-coordinate complexes.", "Ligand exchange reactions are equilibria."],
    explanation: "Pink [Co(H₂O)₆]²⁺; blue tetrahedral [CoCl₄]²⁻ with HCl; [Co(NH₃)₆]²⁺ with excess ammonia, oxidised by air to cobalt(III).",
  });
  {
    const M = chk(Mr("CrCl3.6H2O"), 266.5);
    const n = 5.33 / M;
    const MAgCl = chk(Mr("AgCl"), 143.4);
    const mA = n * 3 * MAgCl;
    const mB = n * 2 * MAgCl;
    const mC = n * 1 * MAgCl;
    const nB = Number(mB.toFixed(2)) / MAgCl;
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Three different solids, **A**, **B** and **C**, all have the formula CrCl₃·6H₂O. In each, chromium(III) is octahedral, surrounded only by water molecules and chloride ions. Tendai dissolved 5.33 g of each solid in water and immediately added excess aqueous silver nitrate. Only chloride ions that are not bonded to chromium are precipitated as AgCl.\n\n| solid | colour | mass of AgCl formed / g |\n|---|---|---|\n| **A** | violet | ${mA.toFixed(2)} |\n| **B** | pale green | ${mB.toFixed(2)} |\n| **C** | dark green | ${mC.toFixed(2)} |\n\n(Ar: H 1.0, O 16.0, Cl 35.5, Cr 52.0, Ag 107.9)`,
      parts: [
        P.num({ label: "(a)", stem: "Calculate the relative formula mass of CrCl₃·6H₂O.", value: M, dp: 1, explanation: `52.0 + 3(35.5) + 6(18.0) = ${dpStr(M, 1)}.` }),
        P.num({ label: "(b)", stem: "Calculate the amount, in mol, of AgCl formed from solid **B**.", value: nB, sf: 3, unit: "mol", explanation: `Mr(AgCl) = 143.4; ${mB.toFixed(2)} ÷ 143.4 = ${sfStr(nB, 3)} mol.` }),
        P.num({ label: "(c)", stem: "Deduce how many chloride ions per formula unit of **C** are free (not bonded to chromium).", value: 1, wrong: [2], explanation: `n(C) = 5.33 ÷ ${dpStr(M, 1)} = ${sfStr(n, 3)} mol; n(AgCl) = ${mC.toFixed(2)} ÷ 143.4 = ${sfStr(mC / MAgCl, 3)} mol, so one free Cl⁻ per formula unit.` }),
        P.short({ label: "(d)", stem: "Give the formula of the complex ion in **A**. (Type it as, for example, [Fe(H2O)6]3+.)", accepted: ["[Cr(H2O)6]3+", "[Cr(H2O)6]^3+", "[Cr(H₂O)₆]³⁺", "Cr(H2O)6 3+"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["[CrCl3(H2O)3]"], explanation: "Three free chloride ions per formula unit, so all six ligands are water: [Cr(H₂O)₆]³⁺ with 3Cl⁻." }),
        P.fib({ label: "(e)", stem: "Choose the formula of the complex ion in **B**.", template: "{{blank:a}}", blanks: [{ id: "a", accepted: ["[CrCl(H₂O)₅]²⁺"], choices: ["[CrCl(H₂O)₅]²⁺", "[CrCl₂(H₂O)₄]⁺", "[Cr(H₂O)₆]³⁺", "[CrCl(H₂O)₅]⁺"] }], explanation: "Two free Cl⁻, so one chloride is a ligand with five water molecules: +3 − 1 = +2, [CrCl(H₂O)₅]²⁺ (the sixth water is water of crystallisation)." }),
        P.mcq({ label: "(f)", stem: "What is the coordination number of chromium in all three solids?", options: [
          ["6", "Correct: the stem says chromium is octahedral in each solid."],
          ["4", "Four-coordinate chromium would be tetrahedral or square planar."],
          ["3", "Three is the number of chloride ions, not the number of ligands."],
          ["9", "There are nine ligand-forming species in the formula, but only six bond to chromium."],
        ], answer: "A", explanation: "Octahedral: six dative bonds in each case." }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why the chloride ions bonded to chromium are not precipitated by silver nitrate.", points: ["They are bonded to Cr³⁺ by dative bonds (part of the complex ion), not free Cl⁻(aq)", "So they are not available to combine with Ag⁺ to form AgCl (ligand exchange is slow)"], modelAnswer: "Chloride ligands are held to the chromium(III) ion by dative bonds within the complex, so they are not present as free chloride ions in solution and cannot meet Ag⁺ ions to form silver chloride; only the chloride ions outside the square brackets precipitate." }),
        P.manual({ label: "(h)", marks: 2, stem: "Deduce the formula, with its charge, of the complex ion in **C**, and show how you worked out the charge.", points: [t`$\ce{[CrCl2(H2O)4]+}$`, "Charge = +3 + 2 × (−1) + 4 × 0 = +1, balanced by the one free chloride ion"], modelAnswer: "C has one free chloride, so two chlorides are ligands: [CrCl₂(H₂O)₄]⁺. Charge = +3 + 2(−1) + 4(0) = +1, balanced by one Cl⁻ (two water molecules are water of crystallisation)." }),
        P.num({ label: "(i)", stem: "Calculate the mass, in g, of AgCl that would form if all the chloride in 5.33 g of any of the solids were precipitated, to three significant figures.", value: mA, sf: 3, unit: "g", wrong: [sfStr(mA / 3, 3)], explanation: `${sfStr(n, 3)} mol × 3 × 143.4 = ${sfStr(mA, 3)} g (the same as for **A**).` }),
        P.mcq({ label: "(j)", stem: "Which complex ion is responsible for the violet colour of **A**?", options: [
          [t`$\ce{[Cr(H2O)6]^3+}$`, "Correct: the hexaaquachromium(III) ion is violet."],
          [t`$\ce{[CrCl2(H2O)4]+}$`, "This is the dark green ion in **C**."],
          [t`$\ce{[CrCl(H2O)5]^2+}$`, "This is the pale green ion in **B**."],
          [t`$\ce{[CrCl4]-}$`, "None of the solids has four chloride ligands."],
        ], answer: "A", explanation: "Replacing water by chloride ligands changes the d-orbital splitting and the colour from violet to green." }),
      ],
      hints: ["Free Cl⁻ per formula unit = mol AgCl ÷ mol solid.", "Charge of a complex = oxidation state + ligand charges."],
      explanation: `n(solid) = ${sfStr(n, 3)} mol: A gives 3, B 2 and C 1 mol AgCl per mol, so A is [Cr(H₂O)₆]Cl₃, B [CrCl(H₂O)₅]Cl₂·H₂O and C [CrCl₂(H₂O)₄]Cl·2H₂O.`,
    });
  }
  b.card("DEFINITION", "Ligand", "A molecule or ion with a lone pair that forms a dative (coordinate) bond to a central metal atom or ion.");
  b.card("DEFINITION", "Coordination number", "The number of dative bonds from ligands to the central metal ion (not the number of ligands).");
  b.card("FACT", "Bidentate and hexadentate ligands", "Bidentate: 1,2-diaminoethane (en, two N) and ethanedioate (C₂O₄²⁻, two O). Hexadentate: EDTA⁴⁻ (four O, two N).");
  b.card("FACT", "Shapes of complexes", "2: linear 180°. 4: tetrahedral 109.5° or square planar 90°. 6: octahedral 90°.");
  b.card("FORMULA", "Charge on a complex", "Oxidation state of the metal + sum of the ligand charges, e.g. [Fe(CN)₆]: +3 − 6 = 3−.");
  b.card("FACT", "Cu²⁺(aq) with excess NH₃(aq)", "Pale blue precipitate, then deep blue solution of [Cu(NH₃)₄(H₂O)₂]²⁺ (only four water ligands replaced).");
  b.card("FACT", "Cu²⁺(aq) with concentrated HCl", "[Cu(H₂O)₆]²⁺ + 4Cl⁻ ⇌ [CuCl₄]²⁻ + 6H₂O: pale blue to yellow-green, then yellow; octahedral to tetrahedral.");
  b.card("FACT", "Co²⁺(aq) with concentrated HCl", "[Co(H₂O)₆]²⁺ (pink, octahedral) + 4Cl⁻ ⇌ [CoCl₄]²⁻ (blue, tetrahedral) + 6H₂O.");
  b.card("FACT", "Co²⁺(aq) with excess NH₃(aq)", "Blue precipitate, then straw-coloured [Co(NH₃)₆]²⁺, which darkens in air as it is oxidised to [Co(NH₃)₆]³⁺.");
});
