// W4a: achem.amines.amino-acids (both boards; ZIMSEC Form 6, Cambridge A Level only) ★ free preview lesson
import { concept, P, t, ZIM, Mr, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";

concept("achem.amines.amino-acids", { file: "amines/amino-acids", keyPrefix: "amines.amino-acids" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a zwitterion?",
    options: [
      ["an ion with a positive and a negative charge but no overall charge", "Correct: for example H₃N⁺CH₂COO⁻."],
      ["an ion with two positive charges on the same atom", "A zwitterion carries opposite charges on different atoms."],
      ["a neutral molecule with no charged groups at all", "A zwitterion has charged groups, although the net charge is zero."],
      ["an ion formed only when an amino acid is dissolved in alkali", "In alkali the anion H₂NCH(R)COO⁻ forms, not the zwitterion."],
    ],
    answer: "A",
    explanation: "Internal proton transfer from –COOH to –NH₂ gives H₃N⁺CH(R)COO⁻.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which form of alanine is present mainly in a solution of pH 1?",
    options: [
      [t`$\ce{H3N+CH(CH3)COOH}$`, "Correct: in strong acid both groups are protonated."],
      [t`$\ce{H3N+CH(CH3)COO-}$`, "The zwitterion is the main form near the isoelectric point, about pH 6."],
      [t`$\ce{H2NCH(CH3)COO-}$`, "This anion is the main form in alkaline solution."],
      [t`$\ce{H2NCH(CH3)COOH}$`, "The un-ionised form is never the main species in water."],
    ],
    answer: "A",
    explanation: "Excess H⁺ protonates –COO⁻, giving the cation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does glycine have a much higher melting point than ethanoic acid, although their Mr values are similar?",
    options: [
      ["Glycine exists as zwitterions held by strong ionic attractions.", "Correct: an ionic lattice needs much more energy to break."],
      ["Glycine forms a giant covalent structure like diamond.", "The solid is ionic (zwitterions), not giant covalent."],
      ["Glycine molecules are larger and have stronger dispersion forces.", "The Mr values are similar; the difference is ionic bonding."],
      ["Glycine is a stronger acid than ethanoic acid.", "Acid strength does not determine melting point."],
    ],
    answer: "A",
    explanation: "Ionic attraction between –NH₃⁺ and –COO⁻ of neighbouring zwitterions.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reagent and conditions hydrolyse a protein to its amino acids in the laboratory?",
    options: [
      ["6 mol dm⁻³ HCl, heat under reflux for several hours", "Correct: the peptide bonds are broken by hot concentrated acid."],
      ["cold dilute HCl, stirred at room temperature for a few minutes", "Peptide bonds are very stable; mild conditions do not break them."],
      ["ninhydrin solution, sprayed on and warmed in an oven", "Ninhydrin is a locating agent for amino acids, not a hydrolysing agent."],
      ["NaBH₄ in water, warmed under reflux for several hours", "This is a reducing agent; it does not hydrolyse amides."],
    ],
    answer: "A",
    explanation: "Prolonged reflux with hot acid (or alkali), or enzymes at body temperature.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A mixture of serine (isoelectric point 5.7), arginine (10.8) and glutamic acid (3.2) is separated by electrophoresis in a buffer of pH 5.7. Which statement is correct?",
    options: [
      ["Arginine moves to the negative electrode and glutamic acid to the positive electrode.", "Correct: arginine is positive and glutamic acid negative at pH 5.7."],
      ["Serine moves furthest because it is the smallest of the three amino acids.", "At its isoelectric point serine has no net charge and does not move."],
      ["All three amino acids move towards the positive electrode at this pH.", "Arginine is positively charged at pH 5.7."],
      ["Glutamic acid moves to the negative electrode, and serine stays put.", "Glutamic acid (pI 3.2) is negative at pH 5.7, so it moves to the positive electrode."],
    ],
    answer: "A",
    hints: ["Compare each isoelectric point with the buffer pH."],
    explanation: "pH > pI → negative; pH < pI → positive; pH = pI → no movement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about the dipeptides formed from glycine and alanine are correct?\n\n1. Gly-Ala and Ala-Gly are different compounds.\n2. Both have the same relative molecular mass.\n3. Each contains one peptide bond.",
    options: [
      ["1, 2 and 3", "Correct: structural isomers with one –CONH– link each."],
      ["1 and 2 only", "Statement 3 is also true."],
      ["2 and 3 only", "Statement 1 is also true: the sequence differs."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Which end has the free –NH₂ group in each?"],
    explanation: "H₂NCH₂CONHCH(CH₃)COOH and H₂NCH(CH₃)CONHCH₂COOH.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the amino acids is not chiral?",
    options: [
      ["glycine, H₂NCH₂COOH", "Correct: carbon 2 carries two hydrogen atoms."],
      ["alanine, H₂NCH(CH₃)COOH", "Carbon 2 has four different groups."],
      ["serine, H₂NCH(CH₂OH)COOH", "Carbon 2 has four different groups."],
      ["aspartic acid, H₂NCH(CH₂COOH)COOH", "Carbon 2 has four different groups."],
    ],
    answer: "A",
    hints: ["Look for four different groups on carbon 2."],
    explanation: "Glycine's R group is H, so C2 has two identical H atoms.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In electrophoresis at pH 11.0, glycine (pI 6.0) and the dipeptide Gly-Gly (pI 5.7) both move towards the positive electrode. Which moves further, and why?",
    options: [
      ["glycine, because it has the same charge (−1) but is smaller", "Correct: smaller ions with the same charge move faster."],
      ["Gly-Gly, because it is larger and carries more charge", "Both carry a charge of −1 at pH 11.0; the larger ion moves less far."],
      ["Gly-Gly, because its isoelectric point is lower", "Both are fully deprotonated anions at pH 11.0; size decides."],
      ["neither, because both are at their isoelectric points", "pH 11.0 is well above both isoelectric points."],
    ],
    answer: "A",
    hints: ["Compare charge first, then size."],
    explanation: "Same charge, smaller size → further movement.",
  });
  {
    const mr = Mr("C5H11NO2") + Mr("C2H5NO2") + Mr("C6H13NO2") - 2 * Mr("H2O");
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Calculate the relative molecular mass of the tripeptide Val-Gly-Leu. Mr: valine 117, glycine 75, leucine 131, water 18.",
      value: mr,
      wrong: [117 + 75 + 131, 117 + 75 + 131 - 54],
      hints: ["A tripeptide has two peptide bonds."],
      explanation: `117 + 75 + 131 − 2 × 18 = ${mr}. Subtracting 3 × 18 counts one peptide bond too many.`,
    });
  }
  {
    const n = 4 * 3 * 2;
    b.num({
      d: 3, skill: "APPLICATION",
      stem: "How many different tripeptides can be made from four different amino acids if each tripeptide contains three different amino acids (no amino acid used twice)?",
      value: n,
      wrong: [4 ** 3, 4],
      hints: ["Choices for the first position, then the second, then the third."],
      explanation: `4 × 3 × 2 = ${n}. Allowing repeats would give 4³ = 64.`,
    });
  }
  {
    const nG = molesFromSolution(25, 0.08);
    const v1 = (nG / 0.1) * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "25.0 cm³ of 0.0800 mol dm⁻³ glycine hydrochloride, H₃N⁺CH₂COOH Cl⁻, is titrated with 0.100 mol dm⁻³ NaOH. Calculate the total volume of NaOH, in cm³, needed to reach the second equivalence point, where H₂NCH₂COO⁻ is the main species.",
      value: 2 * v1, sf: 3, unit: "cm³",
      wrong: [v1],
      hints: ["Two protons are removed from each H₃N⁺CH₂COOH."],
      explanation: `1. n(glycine hydrochloride) = 0.0250 × 0.0800 = ${sciStr(nG, 3)} mol.\n2. Two H⁺ per ion: n(NaOH) = ${sfStr(2 * nG, 3)} mol.\n3. V = ${sfStr(2 * nG, 3)} ÷ 0.100 = ${sfStr((2 * v1) / 1000, 3)} dm³ = ${sfStr(2 * v1, 3)} cm³. The first equivalence point is at ${sfStr(v1, 3)} cm³.`,
    });
  }
  {
    const pI = (2.32 + 9.62) / 2;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, applies: ZIM,
      stem: "Data for valine: pKa(–COOH) = 2.32, pKa(–NH₃⁺) = 9.62. Its isoelectric point is the mean of the two pKa values. Calculate the isoelectric point to two decimal places.",
      value: pI, dp: 2,
      wrong: [9.62 - 2.32],
      hints: ["Add the two pKa values and divide by two."],
      explanation: `(2.32 + 9.62) ÷ 2 = ${dpStr(pI, 2)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "At its isoelectric point an amino acid does not move towards either electrode in electrophoresis.",
    answer: true,
    explanation: "True: the zwitterion has no overall charge.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hydrolysing a dipeptide with sodium hydroxide gives the amino acids as cations, H₃N⁺CH(R)COOH.",
    answer: false,
    explanation: "False: in alkali the products are the anions, H₂NCH(R)COO⁻ (as sodium salts); cations form in acid.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each pH with the main form of glycine (isoelectric point about 6.0).",
    pairs: [
      ["pH 1", "H₃N⁺CH₂COOH"],
      ["pH 6", "H₃N⁺CH₂COO⁻"],
      ["pH 12", "H₂NCH₂COO⁻"],
    ],
    extraRight: ["H₂NCH₂COOH"],
    hints: ["Acid protonates; alkali removes protons."],
    explanation: "Cation in acid; zwitterion at pI; anion in alkali.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about peptides.",
    template: "Amino acids join by a {{blank:a}} reaction, eliminating {{blank:b}}. The link formed, –CONH–, is called a {{blank:c}} bond.",
    blanks: [
      { id: "a", accepted: ["condensation"], choices: ["condensation", "addition", "substitution"] },
      { id: "b", accepted: ["water"], choices: ["water", "hydrogen chloride", "ammonia"] },
      { id: "c", accepted: ["peptide"], choices: ["peptide", "ester", "glycosidic"] },
    ],
    explanation: "Condensation, loss of H₂O, peptide (amide) bond.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the structural formula of the dipeptide Ala-Gly, with the free –NH₂ group written first (for example H2NCH2CONHCH2COOH).",
    accepted: ["H2NCH(CH3)CONHCH2COOH", "H₂NCH(CH₃)CONHCH₂COOH", "NH2CH(CH3)CONHCH2COOH"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["H2NCH2CONHCH(CH3)COOH"],
    hints: ["Alanine provides the free –NH₂ end."],
    explanation: "Ala's –COOH condenses with Gly's –NH₂.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why amino acids are crystalline solids that dissolve in water but not in hexane.",
    points: ["They exist as zwitterions, H₃N⁺CH(R)COO⁻", "held in the solid by strong ionic attractions (high melting point, crystalline)", "The ions are hydrated by polar water molecules (ion-dipole attractions and hydrogen bonds); non-polar hexane cannot interact strongly with ions"],
    modelAnswer: "Amino acids exist as zwitterions, so the solid is an ionic lattice with strong attractions between –NH₃⁺ and –COO⁻ groups of neighbouring ions. Water molecules, being polar, hydrate the charged groups and release enough energy to separate the ions, but hexane is non-polar and cannot.",
    hints: ["What kind of particles make up the solid?"],
    explanation: "Zwitterions explain physical properties.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A mixture of phenylalanine (pI 5.5), arginine (pI 10.8) and the dipeptide Phe-Phe is placed at the centre of a strip in a buffer of pH 1.0 and a voltage is applied. At pH 1.0 the dipeptide carries a charge of +1. Predict what happens to each, with reasons.",
    points: ["At pH 1.0 the amino acids are below their isoelectric points, so all three species are positively charged", "All three move towards the negative electrode (cathode)", "Arginine carries a larger positive charge (+2: its side chain is also protonated), so it moves furthest", "Phe-Phe (+1) is larger than phenylalanine (+1), so it moves less far than phenylalanine"],
    modelAnswer: "pH 1.0 is below the isoelectric points of both amino acids, so they are protonated and positive, as is the dipeptide; all move towards the negative electrode. Arginine has a protonated side chain as well as –NH₃⁺ (charge +2) and moves furthest. Phenylalanine and Phe-Phe each carry +1, but the dipeptide is larger, so it moves less far than phenylalanine.",
    hints: ["Charge decides direction; charge and size decide distance."],
    explanation: "Electrophoresis reasoning.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2, applies: ZIM,
    stem: "Explain why the titration curve of glycine hydrochloride with NaOH shows two buffer regions.",
    points: ["H₃N⁺CH₂COOH has two acidic protons, removed one after the other (–COOH first, then –NH₃⁺)", "Each buffer region occurs where a weak acid and its conjugate base are present in similar amounts (pH ≈ pKa = 2.34 and 9.60)"],
    modelAnswer: "Glycine hydrochloride loses two protons in turn, first from –COOH and then from –NH₃⁺. While each is being removed the solution contains a weak acid and its conjugate base, giving buffer regions centred on pH 2.34 and 9.60.",
    hints: ["How many protons can each ion lose?"],
    explanation: "Two dissociations → two buffer regions (ZIMSEC).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "The tripeptide below is hydrolysed and the products are analysed.\n\nH₂NCH(CH₃)CONHCH₂CONHCH(CH₂OH)COOH",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "How many peptide bonds does the tripeptide contain?", accepted: ["2", "two"], wrong: ["3"], explanation: "Two –CONH– links." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which three amino acids are released, in order from the free –NH₂ end?", options: [
        ["alanine, glycine, serine", "Correct: Ala-Gly-Ser."],
        ["serine, glycine, alanine", "That reads the chain from the –COOH end."],
        ["glycine, alanine, serine", "The first residue carries a CH₃ side chain: alanine."],
        ["alanine, serine, glycine", "The middle residue has no side chain: glycine."],
      ], answer: "A", explanation: "R groups: CH₃, H, CH₂OH." }),
      P.manual({ label: "(c)", marks: 1, stem: "Give the reagent and conditions for hydrolysing the tripeptide in the laboratory.", points: ["Heat under reflux with 6 mol dm⁻³ HCl for several hours (or with NaOH(aq))"], modelAnswer: "Heat under reflux with about 6 mol dm⁻³ hydrochloric acid for several hours." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give the form of glycine in the hydrolysis mixture if acid is used, and its form at pH 12.", points: ["In acid: H₃N⁺CH₂COOH", "At pH 12: H₂NCH₂COO⁻"], modelAnswer: "In acid, H₃N⁺CH₂COOH; at pH 12, H₂NCH₂COO⁻." }),
      P.num({ label: "(e)", marks: 1, stem: "The tripeptide has the molecular formula C₈H₁₅N₃O₅. Calculate its relative molecular mass. (Ar: H 1, C 12, N 14, O 16)", value: Mr("C8H15N3O5"), wrong: [Mr("C8H19N3O7")], explanation: "8(12) + 15(1) + 3(14) + 5(16) = 233. (Check: alanine + glycine + serine − 2H₂O.)" }),
      P.manual({ label: "(f)", marks: 2, stem: "How many different tripeptides could be made using each of these three amino acids once? Explain.", points: ["6", "3 choices for the first position × 2 for the second × 1 for the third (3! = 6)"], modelAnswer: "Six: 3 × 2 × 1 = 6 possible sequences." }),
    ],
    hints: ["Read the chain from the free –NH₂ end."],
    explanation: "Ala-Gly-Ser; two peptide bonds; Mr 233; six sequences.",
  });

  {
    const vEq = 18.0, cNa = 0.125, pk1 = 2.21, pk2 = 9.15;
    const c = ((vEq / 1000) * cNa) / 0.025;
    const vols = [4.5, 9, 13.5, 18, 22.5, 27, 31.5];
    const pHs = vols.map((v) => (v < vEq ? pk1 + Math.log10(v / (vEq - v)) : v === vEq ? (pk1 + pk2) / 2 : pk2 + Math.log10((v - vEq) / (2 * vEq - v))));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, applies: ZIM,
      stem: `25.0 cm³ of serine hydrochloride solution, HOCH₂CH(NH₃⁺)COOH Cl⁻, was titrated with 0.125 mol dm⁻³ NaOH. Readings from the titration curve:\n\n| Volume of NaOH / cm³ | ${vols.map((v) => v.toFixed(2)).join(" | ")} |\n|---|---|---|---|---|---|---|---|\n| pH | ${pHs.map((p) => p.toFixed(2)).join(" | ")} |\n\nThe first steep rise in pH occurs at 18.00 cm³ and the second at 36.00 cm³.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Use the table to give pKa of the –COOH group of serine.", value: pk1, dp: 2, wrong: [pHs[2]], explanation: `At 9.00 cm³ (half of 18.00 cm³) [acid form] = [zwitterion], so pH = pKa = ${pk1.toFixed(2)}.` }),
        P.num({ label: "(b)", marks: 1, stem: "Give the isoelectric point of serine.", value: (pk1 + pk2) / 2, dp: 2, wrong: [7], explanation: `The pH at the first equivalence point, ${((pk1 + pk2) / 2).toFixed(2)}, where the zwitterion is the main species.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Give the main serine species present at 18.00 cm³ and at 36.00 cm³ of NaOH.", points: ["18.00 cm³: the zwitterion HOCH₂CH(NH₃⁺)COO⁻", "36.00 cm³: the anion HOCH₂CH(NH₂)COO⁻"], modelAnswer: "At 18.00 cm³, HOCH₂CH(NH₃⁺)COO⁻; at 36.00 cm³, HOCH₂CH(NH₂)COO⁻." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the concentration of the serine hydrochloride solution, in mol dm⁻³.", value: c, sf: 3, unit: "mol/dm³", wrong: [c * 2], explanation: `n(NaOH) to the first equivalence = 0.01800 × 0.125 = ${sciStr((vEq / 1000) * cNa, 3)} mol = n(serine hydrochloride); c = ${sciStr((vEq / 1000) * cNa, 3)} ÷ 0.0250 = ${sfStr(c, 3)} mol dm⁻³. Using the second equivalence volume doubles the answer.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the pH changes only slowly between 4.50 and 13.50 cm³ of NaOH.", points: ["The solution contains both the fully protonated form (a weak acid) and the zwitterion (its conjugate base): a buffer", "Added OH⁻ is removed by the –COOH group of the protonated form, so [H⁺] changes little"], modelAnswer: "Between these volumes both the protonated acid form and its conjugate base, the zwitterion, are present, so the mixture is a buffer: added hydroxide ions react with the –COOH groups and the pH rises only slowly." }),
      ],
      hints: ["At half-neutralisation, pH = pKa."],
      explanation: `pKa(COOH) ${pk1.toFixed(2)}; pI ${((pk1 + pk2) / 2).toFixed(2)}; zwitterion then anion; c = ${sfStr(c, 3)} mol dm⁻³; buffer region (ZIMSEC titration curves).`,
    });
  }
  b.card("DEFINITION", "Zwitterion", "An ion with + and − charges but no net charge: H₃N⁺CH(R)COO⁻.");
  b.card("DEFINITION", "Isoelectric point", "The pH at which an amino acid is mainly zwitterion with no overall charge; it does not move in electrophoresis.");
  b.card("FACT", "Forms of an amino acid", "Low pH: H₃N⁺CH(R)COOH; pI: H₃N⁺CH(R)COO⁻; high pH: H₂NCH(R)COO⁻.");
  b.card("CONCEPT", "Why amino acids have high melting points", "Zwitterions form an ionic lattice with strong electrostatic attractions.");
  b.card("DEFINITION", "Peptide bond", "–CO–NH– formed by condensation of –COOH and –NH₂ with loss of water.");
  b.card("CONCEPT", "Number of peptide sequences", "n different amino acids, each used once: n! sequences; with repeats allowed: nᵏ for length k.");
  b.card("FACT", "Hydrolysis of proteins", "6 mol dm⁻³ HCl, reflux for hours; or alkali; or protease enzymes. Products: amino acids (as cations in acid).");
  b.card("CONCEPT", "Electrophoresis", "Direction set by charge at the buffer pH; distance increases with charge and decreases with size.");
  b.card("FACT", "Glycine titration curve (ZIMSEC)", "Two buffer regions (pH ≈ 2.34 and 9.60) and two equivalence points; pI ≈ 5.97.", undefined, { applies: ZIM });
});
