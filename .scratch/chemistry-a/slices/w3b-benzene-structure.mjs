// W3b: achem.hydrocarbons.benzene-structure (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, chk, CAM } from "../lib.mjs";

concept("achem.hydrocarbons.benzene-structure", { file: "hydrocarbons/benzene-structure", keyPrefix: "hydrocarbons.benzene-structure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the hybridisation of each carbon atom in benzene?",
    options: [
      [t`sp$^2$`, "Correct: three σ bonds at 120° plus one unhybridised p orbital."],
      [t`sp$^3$`, "sp³ carbons are tetrahedral, as in cyclohexane."],
      ["sp", "sp carbons are linear, as in ethyne."],
      [t`sp$^3$d`, "Carbon has no d orbitals in its outer shell."],
    ],
    answer: "A",
    explanation: "Each carbon is sp² hybridised; the remaining p orbital forms the delocalised π system.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which observation is evidence against the Kekulé structure of benzene?",
    options: [
      ["All six carbon–carbon bonds in benzene have the same length.", "Correct: Kekulé predicts three short and three long bonds."],
      ["Benzene burns in air with a smoky flame.", "A smoky flame reflects the high C : H ratio, which fits either model."],
      ["Benzene has the molecular formula C₆H₆.", "Kekulé's structure was devised to fit this formula."],
      ["Benzene reacts with chlorine in the presence of AlCl₃.", "This is a substitution, but it does not by itself contradict the Kekulé ring."],
    ],
    answer: "A",
    explanation: "X-ray diffraction shows six equal bonds, intermediate between single and double.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: t`What is the name of $\ce{C6H5NH2}$?`,
    options: [
      ["phenylamine", "Correct: an NH₂ group on a phenyl ring."],
      ["benzylamine", "Benzylamine is C₆H₅CH₂NH₂, with a CH₂ between ring and NH₂."],
      ["aminocyclohexane", "That would be a saturated ring, C₆H₁₁NH₂."],
      ["nitrobenzene", "Nitrobenzene is C₆H₅NO₂."],
    ],
    answer: "A",
    explanation: "C₆H₅– is phenyl, so C₆H₅NH₂ is phenylamine (aniline).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where are the delocalised π electrons in a benzene molecule?",
    options: [
      ["in two rings of electron density, above and below the plane of the carbon ring", "Correct: from sideways overlap of the six perpendicular p orbitals."],
      ["in the plane of the ring, between each pair of carbon nuclei", "That describes the σ bonds."],
      ["in three separate π bonds between alternate pairs of carbon atoms", "That is the Kekulé model, which is not supported by evidence."],
      ["on the hydrogen atoms around the outside of the ring", "Hydrogen atoms are joined by σ bonds only."],
    ],
    answer: "A",
    explanation: "The π cloud lies above and below the planar ring.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "A benzene ring carries an OH group on one carbon and an NO₂ group on the adjacent carbon. What is the name of the compound?",
    options: [
      ["2-nitrophenol", "Correct: phenol is the parent, the OH carbon is C1, and NO₂ is on C2."],
      ["1-nitrophenol", "C1 is taken by the OH group of the parent, phenol."],
      ["2-hydroxynitrobenzene", "When OH is present, the compound is named as a phenol."],
      ["3-nitrophenol", "Adjacent carbons are 1 and 2, not 1 and 3."],
    ],
    answer: "A",
    hints: ["Which group gives the parent name?"],
    explanation: "2-nitrophenol.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does benzene not decolorise bromine water at room temperature, although cyclohexene does?",
    options: [
      ["Addition would destroy the delocalised π system, which gives benzene extra stability.", "Correct: benzene resists reactions that disrupt delocalisation."],
      ["Benzene has no π electrons for an electrophile to attack.", "It has six delocalised π electrons."],
      ["Bromine molecules are too large to approach the flat benzene ring.", "Size is not the reason; bromine reacts with benzene when a halogen carrier is present."],
      ["Benzene's C–H bonds are too strong to be substituted at all.", "Substitution does occur with a catalyst."],
    ],
    answer: "A",
    hints: ["What is lost if bromine adds across a C=C in the ring?"],
    explanation: "The electron density of the delocalised ring is lower than in a localised C=C, and addition would lose about 150 kJ mol⁻¹ of stabilisation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about the benzene molecule are correct?\n\n1. All the C–C–C bond angles are 120°.\n2. All twelve atoms lie in one plane.\n3. Each carbon atom is bonded to two hydrogen atoms.",
    options: [
      ["1 and 2 only", "Correct: each carbon carries only one hydrogen."],
      ["1, 2 and 3", "Statement 3 is false: C₆H₆ has one H per carbon."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Count hydrogens in C₆H₆."],
    explanation: "Planar hexagon, 120°, one H per carbon.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the statements about bond lengths in benzene are correct?\n\n1. The Kekulé model predicts six bonds of equal length.\n2. X-ray diffraction shows six bonds of equal length.\n3. Each C–C bond in benzene is shorter than a C–C single bond but longer than a C=C double bond.",
    options: [
      ["2 and 3 only", "Correct: Kekulé predicts alternating long and short bonds."],
      ["1, 2 and 3", "Statement 1 is false: alternating single and double bonds would differ in length."],
      ["1 and 2 only", "Statement 1 is false and statement 3 is true."],
      ["1 only", "Statement 1 is the false one."],
    ],
    answer: "A",
    hints: ["What would alternating single and double bonds look like?"],
    explanation: "Equal bonds with a length between single and double.",
  });
  {
    const pred = 3 * -113;
    const actual = -205;
    const stab = actual - pred;
    chk(stab, 134, 1e-9, "methylbenzene stabilisation");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "A student obtained these enthalpy changes of hydrogenation in an experiment: 1-methylcyclohexene to methylcyclohexane, −113 kJ mol⁻¹; methylbenzene to methylcyclohexane, −205 kJ mol⁻¹. Calculate the stabilisation (delocalisation) energy of methylbenzene from these results, in kJ mol⁻¹, as a positive number.",
      value: stab, unit: "kJ/mol",
      wrong: [-(pred + actual), -stab],
      hints: ["Predict the value for three localised C=C bonds first."],
      explanation: `1. Predicted for a structure with three localised C=C bonds = 3 × (−113) = ${pred} kJ mol⁻¹.\n2. Actual = −205 kJ mol⁻¹.\n3. Stabilisation = −205 − (${pred}) = +${stab} kJ mol⁻¹: methylbenzene is ${stab} kJ mol⁻¹ more stable than the localised structure.\n4. Adding the magnitudes (339 + 205) is a sign error.`,
    });
  }
  b.num({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the C–C–C bond angle, in degrees, in benzene?",
    value: 120,
    wrong: [109.5],
    explanation: "Each carbon is sp² and trigonal planar: 120°.",
  });
  b.num({
    d: 2, skill: "UNDERSTANDING",
    stem: "How many electrons are in the delocalised π system of one benzene molecule?",
    value: 6,
    wrong: [12],
    explanation: "One electron from the p orbital of each of the six carbons.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The C₆H₅– group is called the phenyl group.",
    answer: true,
    explanation: "True: e.g. phenylamine, C₆H₅NH₂.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In benzene, the unhybridised p orbitals lie in the plane of the ring.",
    answer: false,
    explanation: "False: they are perpendicular to the plane, so they overlap above and below it.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each formula with its name.",
    pairs: [
      [t`$\ce{C6H5CH3}$`, "methylbenzene"],
      [t`$\ce{C6H5OH}$`, "phenol"],
      [t`$\ce{C6H5COOH}$`, "benzoic acid"],
      [t`$\ce{C6H5NO2}$`, "nitrobenzene"],
      [t`$\ce{C6H5Cl}$`, "chlorobenzene"],
    ],
    explanation: "Parent names: phenol, benzoic acid; others are substituted benzenes.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of bonding in benzene.",
    template: "Each carbon forms three {{blank:a}} bonds in the plane of the ring. The remaining {{blank:b}} orbital on each carbon overlaps sideways with those on {{blank:c}} neighbouring carbons, forming a delocalised π system {{blank:d}} the plane of the ring.",
    blanks: [
      { id: "a", accepted: ["σ"], choices: ["σ", "π", "hydrogen"] },
      { id: "b", accepted: ["p"], choices: ["p", "s", "sp³"] },
      { id: "c", accepted: ["both"], choices: ["both", "one of its", "none of its"] },
      { id: "d", accepted: ["above and below"], choices: ["above and below", "in", "only above"] },
    ],
    explanation: "σ framework; p orbital overlap with both neighbours; π density above and below the ring.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: t`Name the compound $\ce{C6H5COOH}$.`,
    accepted: ["benzoic acid", "benzenecarboxylic acid"],
    wrong: ["phenol"],
    explanation: "Benzoic acid.",
  });
  b.short({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "A benzene ring carries a COOH group on one carbon and an NO₂ group on the carbon directly opposite it. Name the compound.",
    accepted: ["4-nitrobenzoic acid", "4 nitrobenzoic acid", "para-nitrobenzoic acid"],
    wrong: ["1-nitrobenzoic acid"],
    hints: ["The COOH carbon is C1; count round to the opposite carbon."],
    explanation: "Opposite carbon is C4: 4-nitrobenzoic acid.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the bonding in a benzene molecule and explain why all the carbon–carbon bonds have the same length.",
    points: ["Each carbon is sp² hybridised, forming σ bonds to two carbons and one hydrogen at 120° (planar hexagon)", "Each carbon has one p orbital (one electron) perpendicular to the plane", "The p orbitals overlap sideways with both neighbours, forming a ring of delocalised π electrons above and below the plane", "The six π electrons are shared equally by all six carbons, so every C–C bond is the same (intermediate between single and double)"],
    modelAnswer: "Each carbon uses sp² orbitals to form three σ bonds (two C–C, one C–H) at 120°, giving a flat hexagonal ring. The remaining p orbital on each carbon, at right angles to the ring, overlaps with the p orbitals on both neighbouring carbons. This creates a delocalised π system of six electrons above and below the ring. Because the π electrons are spread evenly over the ring, every C–C bond is identical, with a length between that of a single and a double bond.",
    hints: ["sp², p orbitals, overlap, delocalisation."],
    explanation: "One mark per stage of the description.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Give three different pieces of evidence that the Kekulé structure (alternating single and double bonds) does not represent benzene correctly.",
    points: ["Bond lengths: all six C–C bonds are equal (X-ray data), not three long and three short", "Thermochemistry: the enthalpy change of hydrogenation is much less exothermic than three times that of cyclohexene (benzene is more stable)", "Reactivity: benzene does not readily undergo addition (does not decolorise bromine water); it undergoes substitution"],
    modelAnswer: "X-ray diffraction shows all carbon–carbon bonds are the same length. The enthalpy change when benzene is hydrogenated is far less negative than predicted from three C=C bonds, so benzene is more stable than the Kekulé structure. Benzene does not decolorise bromine water and prefers substitution to addition, unlike an alkene.",
    hints: ["One structural, one energetic, one chemical."],
    explanation: "Any three valid, different pieces of evidence.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Describe in words an enthalpy level diagram that compares the hydrogenation of the Kekulé structure (cyclohexa-1,3,5-triene) and of benzene, and explain what it shows.",
    points: ["Cyclohexane at the lowest level; both hydrogenations end there (arrows pointing down: exothermic)", "Hypothetical cyclohexatriene drawn highest, about 3 × ΔH(cyclohexene) above cyclohexane; benzene drawn lower, by the delocalisation energy", "The gap shows benzene is more stable than the Kekulé structure because of delocalisation"],
    modelAnswer: "Cyclohexane plus hydrogen is at the bottom. The hypothetical Kekulé structure (plus 3H₂) is drawn high above it, with a long downward arrow equal to three times the enthalpy of hydrogenation of cyclohexene. Benzene (plus 3H₂) is drawn lower than the Kekulé level, with a shorter downward arrow to cyclohexane. The vertical gap between benzene and the Kekulé structure is the delocalisation energy, showing that benzene is more stable.",
    hints: ["Both reactions finish at the same product."],
    explanation: "The diagram makes the stabilisation visible.",
  });
  {
    const dieneExpected = 2 * -119;
    const dieneStab = -232 - dieneExpected;
    const kek = 3 * -119;
    const deloc = -208 - kek;
    chk(dieneStab, 6, 1e-9, "diene");
    chk(deloc, 149, 1e-9, "benzene deloc");
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Data (standard enthalpy changes of hydrogenation, each forming cyclohexane): cyclohexene, −119 kJ mol⁻¹; cyclohexa-1,3-diene, −232 kJ mol⁻¹; benzene, −208 kJ mol⁻¹.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Predict the enthalpy change of hydrogenation of cyclohexa-1,3-diene, in kJ mol⁻¹, assuming its two C=C bonds behave like the one in cyclohexene.", value: dieneExpected, unit: "kJ/mol", wrong: [-dieneExpected], explanation: `2 × (−119) = ${dieneExpected} kJ mol⁻¹.` }),
        P.num({ label: "(b)", marks: 1, stem: "By how much, in kJ mol⁻¹, is the diene more stable than predicted? Give a positive value.", value: dieneStab, unit: "kJ/mol", wrong: [232 + dieneExpected * -1], explanation: `−232 − (${dieneExpected}) = +${dieneStab} kJ mol⁻¹: only a small stabilisation.` }),
        P.num({ label: "(c)", marks: 1, stem: "Predict the enthalpy change of hydrogenation, in kJ mol⁻¹, of the Kekulé structure (cyclohexa-1,3,5-triene).", value: kek, unit: "kJ/mol", wrong: [-232 - 119], explanation: `3 × (−119) = ${kek} kJ mol⁻¹.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the delocalisation energy of benzene, in kJ mol⁻¹, as a positive value.", value: deloc, unit: "kJ/mol", wrong: [-kek + 208], explanation: `−208 − (${kek}) = +${deloc} kJ mol⁻¹.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest why the stabilisation of benzene is much greater than that of cyclohexa-1,3-diene.", points: ["In benzene the p orbitals overlap continuously all round the ring, so the six π electrons are delocalised over all six carbons", "In the diene only four carbons have p orbitals and the system is not a closed ring, so delocalisation (and the stabilisation) is much smaller"], modelAnswer: "Benzene has a closed ring of six overlapping p orbitals, so its six π electrons are delocalised over the whole ring, giving a large stabilisation. In the diene the π electrons can spread only over four adjacent carbons and the overlap is not continuous around the ring, so the extra stability is small." }),
        P.tf({ label: "(f)", marks: 1, stem: "Comparing these hydrogenation enthalpies is valid because all three reactions give the same product.", answer: true, explanation: "All end at cyclohexane, so differences reflect the starting compounds." }),
      ],
      hints: ["Each localised C=C contributes about −119 kJ mol⁻¹."],
      explanation: `Diene predicted ${dieneExpected}, stabilisation ${dieneStab}; Kekulé ${kek}; benzene delocalisation ${deloc} kJ mol⁻¹.`,
    });
  }
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, applies: CAM,
    stem: "Name each aromatic compound described.",
    parts: [
      P.short({ label: "(a)", stem: "Two nitro groups on a benzene ring, with one carbon between them.", accepted: ["1,3-dinitrobenzene", "1 3 dinitrobenzene", "13-dinitrobenzene", "meta-dinitrobenzene"], wrong: ["1,2-dinitrobenzene"], explanation: "Positions 1 and 3." }),
      P.short({ label: "(b)", stem: "Phenol with a methyl group on the carbon opposite the OH.", accepted: ["4-methylphenol", "4 methylphenol"], wrong: ["1-methylphenol"], explanation: "OH carbon is C1; opposite is C4." }),
      P.short({ label: "(c)", stem: "Benzoic acid with chlorine atoms on both carbons adjacent to the COOH carbon.", accepted: ["2,6-dichlorobenzoic acid", "2 6 dichlorobenzoic acid", "26-dichlorobenzoic acid"], wrong: ["2,3-dichlorobenzoic acid"], explanation: "C2 and C6 flank C1." }),
      P.short({ label: "(d)", stem: "A benzene ring carrying a CH₂CH₃ group.", accepted: ["ethylbenzene"], wrong: ["methylbenzene"], explanation: "C₆H₅CH₂CH₃." }),
      P.short({ label: "(e)", stem: t`$\ce{C6H5COCH3}$`, accepted: ["phenylethanone", "acetophenone", "1-phenylethanone"], wrong: ["phenylethanal"], explanation: "A ketone with a phenyl and a methyl group." }),
      P.short({ label: "(f)", stem: "Phenylamine with bromine atoms on carbons 2, 4 and 6.", accepted: ["2,4,6-tribromophenylamine", "2 4 6 tribromophenylamine", "246-tribromophenylamine", "2,4,6-tribromoaniline"], wrong: ["2,4,6-tribromophenol"], explanation: "The NH₂ carbon is C1." }),
    ],
    hints: ["The parent group (OH, COOH, NH₂) takes C1."],
    explanation: "1,3-dinitrobenzene; 4-methylphenol; 2,6-dichlorobenzoic acid; ethylbenzene; phenylethanone; 2,4,6-tribromophenylamine.",
  });

  b.card("CONCEPT", "Three problems with the Kekulé structure", "Equal C–C bond lengths; hydrogenation much less exothermic than 3 × cyclohexene; no ready addition (substitution instead).");
  b.card("CONCEPT", "Delocalised model of benzene", "sp² carbons, σ bonds at 120°, one p orbital each overlapping sideways all round: six π electrons above and below the planar ring.");
  b.card("DEFINITION", "Delocalisation energy", "Predicted ΔH (localised C=C) minus actual ΔH; the extra stability from delocalisation (about 150 kJ mol⁻¹ for benzene).");
  b.card("FACT", "C–C bond length in benzene", "0.139 nm, between C–C (0.154 nm) and C=C (0.134 nm).");
  b.card("FACT", "Shape of benzene", "Planar regular hexagon; all bond angles 120°; all twelve atoms in one plane.");
  b.card("FACT", "Phenyl group", "C₆H₅–, e.g. phenylamine C₆H₅NH₂.");
  b.card("CONCEPT", "Numbering a ring with a parent group", "The carbon bearing OH (phenol), COOH (benzoic acid) or NH₂ (phenylamine) is C1.");
  b.card("CONCEPT", "Why benzene prefers substitution", "Addition would destroy the stable delocalised π system; substitution keeps it.");
  b.card("FACT", "2,4,6-tribromophenol", "White precipitate from phenol and bromine water: Br on both carbons next to the OH carbon and on the opposite carbon.");
});
