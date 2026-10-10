// W3a: achem.transition.stereoisomerism (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t } from "../lib.mjs";

concept("achem.transition.stereoisomerism", { file: "transition/stereoisomerism", keyPrefix: "transition.stereoisomerism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which shape of complex of the type MA₂B₂ can NOT show cis/trans isomerism?",
    options: [
      ["tetrahedral", "Correct: all four positions are adjacent to each other, so only one arrangement exists."],
      ["square planar", "Square planar MA₂B₂ complexes, such as [Pt(NH₃)₂Cl₂], have cis and trans isomers."],
      ["octahedral with two other ligands as well", "Octahedral MA₄B₂ complexes have cis and trans isomers."],
      ["every shape can show it", "Tetrahedral complexes cannot: no two positions are opposite each other."],
    ],
    answer: "A",
    explanation: "Cis/trans isomerism needs positions that are adjacent (90°) and positions that are opposite (180°). In a tetrahedron every angle is 109.5°.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the Cl-Pt-Cl bond angle in cisplatin, cis-[Pt(NH₃)₂Cl₂]?",
    options: [
      ["90°", "Correct: the chloride ligands occupy adjacent corners of a square."],
      ["180°", "180° is the angle in the trans isomer."],
      ["109.5°", "109.5° is a tetrahedral angle; cisplatin is square planar."],
      ["120°", "120° is a trigonal planar angle."],
    ],
    answer: "A",
    explanation: "Square planar: adjacent (cis) ligands at 90°, opposite (trans) ligands at 180°.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which complex ion exists as a pair of optical isomers?",
    options: [
      [t`$\ce{[Ni(en)3]^2+}$`, "Correct: three bidentate ligands give a propeller shape with no plane of symmetry."],
      [t`$\ce{[Ni(NH3)6]^2+}$`, "Six identical monodentate ligands: many planes of symmetry, so no optical isomers."],
      [t`trans-$\ce{[Ni(en)2(H2O)2]^2+}$`, "The trans isomer has a plane of symmetry containing both en ligands."],
      [t`$\ce{[Ni(H2O)6]^2+}$`, "Six identical ligands: highly symmetrical, not chiral."],
    ],
    answer: "A",
    explanation: "[Ni(en)₃]²⁺ and cis-[Ni(en)₂(H₂O)₂]²⁺ are chiral; their mirror images are non-superimposable.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about cisplatin are correct?\n\n1. It is a square planar complex of platinum(II).\n2. Inside cells its chloride ligands are replaced by water molecules.\n3. It is effective because its two chloride ligands are trans to each other.",
    options: [
      ["1 and 2 only", "Correct: the chloride ligands are cis (adjacent), so statement 3 is false."],
      ["1, 2 and 3", "Statement 3 is false: in cisplatin the two chloride ligands are adjacent."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: the low chloride concentration in cells allows water to replace Cl⁻."],
    ],
    answer: "A",
    hints: ["What does 'cis' mean?"],
    explanation: "Cisplatin is cis-[Pt(NH₃)₂Cl₂]. In cells H₂O replaces the Cl⁻ ligands and the two adjacent sites bind to neighbouring guanine bases on DNA.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which isomer has no overall dipole?",
    options: [
      [t`trans-$\ce{[Pt(NH3)2Cl2]}$`, "Correct: identical ligands are opposite each other, so the bond dipoles cancel."],
      [t`cis-$\ce{[Pt(NH3)2Cl2]}$`, "Adjacent Pt-Cl dipoles add up, so cisplatin is polar."],
      [t`cis-$\ce{[Co(NH3)4(H2O)2]^2+}$`, "The two water ligands at 90° give a resultant dipole."],
      [t`cis-$\ce{[Ni(en)2(H2O)2]^2+}$`, "The cis isomer has no centre of symmetry, so its dipoles do not cancel."],
    ],
    answer: "A",
    hints: ["Look for identical ligands at 180°."],
    explanation: "In trans isomers equal and opposite bond dipoles cancel.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a 1,2-diaminoethane ligand always occupy two adjacent positions in an octahedral complex?",
    options: [
      ["Its two nitrogen atoms are too close together to reach opposite sides of the metal ion.", "Correct: the short CH₂CH₂ chain can only bridge positions at 90°."],
      ["Its two nitrogen atoms repel each other strongly, so they keep as far apart as possible.", "If repulsion decided it, the N atoms would go trans; they cannot because the chain is short."],
      ["It donates only one lone pair, so it occupies one position at a time.", "1,2-diaminoethane is bidentate: both N atoms donate lone pairs."],
      ["Adjacent positions are always lower in energy than opposite positions.", "The constraint is the length of the ligand, not orbital energy."],
    ],
    answer: "A",
    hints: ["Think about the length of the ligand."],
    explanation: "The N-C-C-N backbone of en forms a five-membered ring with the metal ion, which only fits across adjacent (cis) positions.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: t`Which statements about the complex ion $\ce{[Cr(C2O4)3]^3-}$ are correct? (Ethanedioate, $\ce{C2O4^2-}$, is bidentate.)` + "\n\n1. It is octahedral.\n2. It exists as a pair of optical isomers.\n3. It exists as cis and trans isomers.",
    options: [
      ["1 and 2 only", "Correct: three bidentate ligands give a chiral octahedral ion with no cis/trans form."],
      ["1, 2 and 3", "With three identical bidentate ligands there is no cis/trans isomerism."],
      ["2 and 3 only", "Statement 1 is true: six donor atoms give an octahedron."],
      ["1 only", "Statement 2 is also true: like [Ni(en)₃]²⁺, it is chiral."],
    ],
    answer: "A",
    hints: ["Compare it with [Ni(en)₃]²⁺."],
    explanation: "M(AA)₃ complexes are octahedral and chiral (two enantiomers) but have no cis/trans isomers.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which complex has a cis isomer and a trans isomer, but no optical isomers?",
    options: [
      [t`$\ce{[Co(NH3)4Cl2]+}$`, "Correct: MA₄B₂ with monodentate ligands; both isomers have planes of symmetry."],
      [t`$\ce{[Co(en)2Cl2]+}$`, "Its cis isomer is chiral, so it has optical isomers as well."],
      [t`$\ce{[Co(en)3]^3+}$`, "It has optical isomers only, with no cis/trans form."],
      [t`$\ce{[CoCl4]^2-}$`, "A tetrahedral complex with four identical ligands has no stereoisomers."],
    ],
    answer: "A",
    hints: ["Optical isomerism in these complexes needs bidentate ligands."],
    explanation: "[Co(NH₃)₄Cl₂]⁺: cis and trans, both with a plane of symmetry. [Co(en)₂Cl₂]⁺: trans plus a pair of cis enantiomers.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: t`How many stereoisomers does the octahedral ion $\ce{[Co(en)2Cl2]+}$ have in total?`,
    value: 3,
    wrong: [2],
    hints: ["Consider trans and cis separately; is either chiral?"],
    explanation: "Trans (a plane of symmetry: 1 isomer) + cis (chiral: 2 enantiomers) = 3.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`How many stereoisomers does the square planar complex $\ce{[Pt(NH3)2Br2]}$ have?`,
    value: 2,
    wrong: [1],
    explanation: "Cis (Br ligands adjacent) and trans (Br ligands opposite). Square planar complexes are flat, so neither is chiral.",
  });
  b.num({
    d: 3, skill: "UNDERSTANDING",
    stem: t`What is the Cl-Co-Cl bond angle, in degrees, in trans-$\ce{[Co(NH3)4Cl2]+}$?`,
    value: 180,
    wrong: [90],
    hints: ["Trans means opposite."],
    explanation: "In the trans isomer the two chloride ligands are on opposite sides of the octahedron: 180°.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: t`trans-$\ce{[Ni(en)2(H2O)2]^2+}$ is chiral.`,
    answer: false,
    explanation: "False. The trans isomer has a plane of symmetry (containing the two en ligands), so it is superimposable on its mirror image. The cis isomer is chiral.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each complex with the description that fits it.",
    pairs: [
      [t`cis-$\ce{[Pt(NH3)2Cl2]}$`, "square planar and polar"],
      [t`trans-$\ce{[Pt(NH3)2Cl2]}$`, "square planar with no overall dipole"],
      [t`$\ce{[Ni(en)3]^2+}$`, "octahedral; a pair of enantiomers"],
      [t`$\ce{[CoCl4]^2-}$`, "tetrahedral; no stereoisomers"],
    ],
    extraRight: ["linear; cis and trans isomers"],
    hints: ["Linear complexes have only two ligands, at 180°."],
    explanation: "A linear complex cannot have cis/trans isomers: there is only one angle, 180°.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: t`Complete the sentences about the isomers of $\ce{[Co(NH3)4(H2O)2]^2+}$.`,
    template: "In the cis isomer the two water ligands are at {{blank:a}}° to each other; in the trans isomer they are at {{blank:b}}°. The {{blank:c}} isomer has an overall dipole.",
    blanks: [
      { id: "a", accepted: ["90"], choices: ["90", "109.5", "120", "180"] },
      { id: "b", accepted: ["180"], choices: ["90", "109.5", "120", "180"] },
      { id: "c", accepted: ["cis"], choices: ["cis", "trans"] },
    ],
    explanation: "Cis: adjacent (90°), polar. Trans: opposite (180°), dipoles cancel.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: t`Name the type of stereoisomerism shown by $\ce{[Ni(en)3]^2+}$.`,
    accepted: ["optical", "optical isomerism", "enantiomerism", "enantiomers", "mirror image isomerism", "optical isomers"],
    wrong: ["cis-trans", "geometrical"],
    hints: ["Its two forms are mirror images."],
    explanation: "Optical isomerism: two non-superimposable mirror images (enantiomers).",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline how cisplatin acts as an anticancer drug, and explain why the trans isomer is not effective in the same way.",
    points: [
      "In cells (low chloride concentration) water molecules replace the chloride ligands",
      "Platinum bonds (through dative bonds) to nitrogen atoms of guanine bases in DNA",
      "Binding to two adjacent bases on the same strand distorts/kinks the DNA so it cannot be replicated; the cell cannot divide (dies)",
      "In the trans isomer the two leaving groups are opposite each other (180°), so it cannot bind to two adjacent bases in the same way",
    ],
    modelAnswer: "Inside cells the chloride concentration is low, so water replaces the two chloride ligands. The platinum then forms dative bonds to nitrogen atoms on two neighbouring guanine bases of the same DNA strand, bending the DNA so it cannot be copied; the cancer cell cannot divide. The trans isomer's leaving groups are on opposite sides of the platinum, so it cannot bind to two adjacent bases.",
    hints: ["Ligand exchange first, then binding to DNA."],
    explanation: "The 90° geometry of cisplatin matches two adjacent bases on DNA.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: t`Explain why $\ce{[Ni(en)3]^2+}$ shows optical isomerism, and describe how the two isomers differ.`,
    points: [
      "The three bidentate en ligands are arranged around the octahedron like propeller blades; the ion has no plane of symmetry",
      "So its mirror image cannot be superimposed on it (it is chiral)",
      "The two isomers are mirror images: the propeller twists one way (clockwise) in one and the other way (anticlockwise) in the other",
    ],
    modelAnswer: "Each en ligand spans two adjacent positions, so the three ligands wrap around the nickel ion like the blades of a propeller. There is no plane of symmetry, so the ion and its mirror image are non-superimposable: two optical isomers, one twisted clockwise and the other anticlockwise.",
    hints: ["Use the words 'plane of symmetry' and 'non-superimposable'."],
    explanation: "Chirality comes from the arrangement of the three chelate rings.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`Describe the two stereoisomers of $\ce{[Co(NH3)4(H2O)2]^2+}$ and state which one is polar.`,
    points: [
      "Cis: the two water ligands on adjacent positions, at 90°",
      "Trans: the two water ligands on opposite positions, at 180° (above and below the plane of the four NH₃)",
      "The cis isomer is polar (its dipoles do not cancel); the trans isomer has no overall dipole",
    ],
    modelAnswer: "Both are octahedral. In the cis isomer the two water molecules are next to each other at 90°; in the trans isomer they are opposite each other at 180°, above and below the square of four ammonia ligands. In the trans isomer the bond dipoles cancel, so only the cis isomer is polar.",
    hints: ["Describe where the two water ligands sit in each isomer."],
    explanation: "MA₄B₂ octahedral complexes have cis and trans isomers; the cis one is polar.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: t`Two yellow solids, **P** and **Q**, both have the formula $\ce{[Pt(NH3)2Cl2]}$. **P** is more soluble in water than **Q**, and **P** has a dipole moment while **Q** has none. Only **P** is used to treat cancer.`,
    parts: [
      P.mcq({ label: "(a)", stem: "What is the shape of these complexes?", options: [
        ["square planar", "Correct: platinum(II) complexes with four ligands are square planar."],
        ["tetrahedral", "A tetrahedral MA₂B₂ complex could not have two stereoisomers."],
        ["octahedral", "There are only four ligands."],
        ["trigonal bipyramidal", "That shape needs five ligands."],
      ], answer: "A", explanation: "Two isomers of MA₂B₂ prove the complex is square planar, not tetrahedral." }),
      P.num({ label: "(b)", stem: "Give the oxidation state of platinum in these complexes.", value: 2, wrong: [4], explanation: "x + 2(0) + 2(−1) = 0, so x = +2." }),
      P.short({ label: "(c)", stem: "Which solid, **P** or **Q**, is cisplatin? (Type the letter.)", accepted: ["P"], wrong: ["Q"], explanation: "The polar, more water-soluble isomer is cis." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why **P** has a dipole moment but **Q** does not.", points: ["In P (cis) the two Cl ligands are adjacent (90°), so the Pt-Cl bond dipoles do not cancel and there is a resultant dipole", "In Q (trans) identical ligands are opposite (180°), so equal bond dipoles cancel"], modelAnswer: "In the cis isomer both chloride ligands are on the same side, so the polar Pt-Cl bonds give a resultant dipole. In the trans isomer each Pt-Cl dipole is opposed by an equal one, so they cancel." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest why only **P** is effective as an anticancer drug.", points: ["After the Cl ligands are replaced (by water), P can bond to two adjacent guanine bases on the same strand of DNA", "Its two free sites are at 90°; in Q they are at 180°, which cannot fit two neighbouring bases"], modelAnswer: "Cisplatin's two leaving groups are adjacent, so after hydrolysis it binds to two neighbouring bases on one DNA strand and stops replication. In the trans isomer the leaving groups are opposite each other and cannot bind two neighbouring bases." }),
      P.tf({ label: "(f)", stem: "**P** and **Q** are optical isomers.", answer: false, explanation: "False: they are cis/trans (geometrical) isomers. A flat square planar complex has a plane of symmetry and cannot be chiral." }),
    ],
    hints: ["Two isomers of MA₂B₂ rule out a tetrahedral shape.", "Polarity: do the bond dipoles cancel?"],
    explanation: "P is cisplatin (cis, polar, active); Q is transplatin (trans, non-polar).",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    stem: t`Cobalt(III) forms the octahedral complex ion $\ce{[Co(en)2Cl2]+}$, where en is 1,2-diaminoethane, $\ce{H2NCH2CH2NH2}$. Its trans isomer is green and its cis isomer is violet.`,
    parts: [
      P.num({ label: "(a)", stem: "Show that the oxidation state of cobalt is +3: give the oxidation state as a number.", value: 3, wrong: [1], explanation: "x + 2(0) + 2(−1) = +1, so x = +3." }),
      P.num({ label: "(b)", stem: "What is the coordination number of cobalt?", value: 6, wrong: [4], explanation: "2 en × 2 + 2 Cl⁻ × 1 = 6." }),
      P.num({ label: "(c)", stem: "How many nitrogen atoms are bonded directly to the cobalt ion?", value: 4, wrong: [2], explanation: "Each en bonds through both of its N atoms: 2 × 2 = 4." }),
      P.mcq({ label: "(d)", stem: "Which statement about the shape is correct?", options: [
        ["Each en ligand spans two adjacent positions of an octahedron.", "Correct: en is too short to span opposite positions."],
        ["Each en ligand spans two opposite positions of an octahedron.", "Opposite positions are 180° apart; en cannot reach."],
        ["The complex is square planar with the Cl ligands above and below.", "Six donor atoms make it octahedral."],
        ["The complex is tetrahedral because it has four ligands.", "Coordination number, not the number of ligands, decides the shape."],
      ], answer: "A", explanation: "Bidentate ligands occupy cis positions." }),
      P.num({ label: "(e)", stem: "How many stereoisomers does this complex ion have?", value: 3, wrong: [2], explanation: "Trans (1) + cis (a pair of enantiomers, 2) = 3." }),
      P.manual({ label: "(f)", marks: 2, stem: "Describe the trans isomer and explain why it is not chiral.", points: ["The two Cl ligands are opposite each other (180°), with the two en ligands in one plane between them", "It has a plane of symmetry (through the Co and the four N atoms), so it is superimposable on its mirror image"], modelAnswer: "In the trans isomer the chloride ligands are above and below the cobalt, and both en ligands lie in the plane between them. That plane is a plane of symmetry, so the mirror image can be superimposed: the trans isomer is not chiral." }),
      P.manual({ label: "(g)", marks: 2, stem: "Describe the cis isomer and explain why it is chiral.", points: ["The two Cl ligands are adjacent (90°), and the two en ligands are twisted out of one plane", "There is no plane of symmetry, so its mirror image is non-superimposable: a pair of optical isomers"], modelAnswer: "In the cis isomer the chloride ligands are next to each other and the two en rings are arranged in a twisted, propeller-like way. There is no plane of symmetry, so the complex and its mirror image cannot be superimposed: it exists as two enantiomers." }),
      P.mcq({ label: "(h)", stem: "Which isomer has no overall dipole?", options: [
        ["the trans isomer", "Correct: the opposite Co-Cl dipoles cancel."],
        ["both cis enantiomers", "In the cis form the Co-Cl dipoles are at 90° and do not cancel."],
        ["all three isomers", "Only the trans isomer has its Cl ligands opposite each other."],
        ["none of the isomers", "The trans isomer is symmetrical enough for its dipoles to cancel."],
      ], answer: "A", explanation: "Trans: equal and opposite dipoles cancel." }),
      P.manual({ label: "(i)", marks: 2, stem: "Rudo prepared a sample of the cis isomer. It did not rotate the plane of plane-polarised light. Suggest why.", points: ["The sample is a racemic mixture: equal amounts of the two enantiomers were formed", "Each enantiomer rotates the plane by the same amount in opposite directions, so the rotations cancel"], modelAnswer: "The synthesis produced equal amounts of the two cis enantiomers (a racemic mixture). They rotate plane-polarised light equally in opposite directions, so the overall rotation is zero." }),
    ],
    hints: ["Treat trans and cis separately.", "A chiral complex has no plane of symmetry."],
    explanation: "[Co(en)₂Cl₂]⁺: Co(III), coordination number 6; trans (non-polar, not chiral) and a pair of cis enantiomers (polar).",
  });
  b.card("DEFINITION", "Cis/trans isomers of complexes", "Stereoisomers in which two identical ligands are adjacent (cis, 90°) or opposite (trans, 180°).");
  b.card("FACT", "Which complexes show cis/trans isomerism?", "Square planar MA₂B₂ (e.g. [Pt(NH₃)₂Cl₂]) and octahedral MA₄B₂ (e.g. [Co(NH₃)₄(H₂O)₂]²⁺); not tetrahedral complexes.");
  b.card("FACT", "Cisplatin", "cis-[Pt(NH₃)₂Cl₂], square planar Pt(II); an anticancer drug. The trans isomer is not used clinically.");
  b.card("CONCEPT", "How cisplatin works (outline)", "In cells, water replaces the Cl⁻ ligands; Pt binds to two adjacent guanine bases on DNA, which stops replication.");
  b.card("FACT", "Optical isomerism in complexes", "Octahedral complexes with three bidentate ligands ([Ni(en)₃]²⁺) or the cis form of M(AA)₂B₂ (cis-[Ni(en)₂(H₂O)₂]²⁺).");
  b.card("FACT", "Stereoisomers of [Ni(en)₂(H₂O)₂]²⁺", "Three: trans (plane of symmetry, not chiral) and a pair of cis enantiomers.");
  b.card("CONCEPT", "Polarity of isomeric complexes", "Cis isomers are polar; in trans isomers equal bond dipoles are opposite and cancel.");
  b.card("CONCEPT", "Why bidentate ligands go cis", "The donor atoms are joined by a short chain, so they can only reach adjacent positions (90°).");
});
