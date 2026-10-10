// W1a: bonding.shapes-vsepr — VSEPR shapes and bond angles, analogous species, shape and polarity.
import { concept, P, t, chk, same } from "../lib.mjs";

/** VSEPR count for a central atom with single bonds only: outer electrons, number of bonded atoms, ionic charge. */
function vsepr(outer, bonded, charge = 0) {
  const pairs = (outer + bonded - charge) / 2;
  if (!Number.isInteger(pairs)) throw new Error("odd electron count");
  const lone = pairs - bonded;
  const shape = { "2,0": "linear", "3,0": "trigonal planar", "4,0": "tetrahedral", "3,1": "pyramidal", "2,2": "non-linear (bent)", "5,0": "trigonal bipyramidal", "6,0": "octahedral" }[`${bonded},${lone}`];
  const angle = { "2,0": "180°", "3,0": "120°", "4,0": "109.5°", "3,1": "107°", "2,2": "104.5°", "5,0": "120° and 90°", "6,0": "90°" }[`${bonded},${lone}`];
  return { pairs, lone, shape, angle };
}
same(vsepr(5, 3).shape, "pyramidal");
same(vsepr(3, 4, -1).shape, "tetrahedral"); // BF4-

concept("achem.bonding.shapes-vsepr", { file: "bonding/shapes-vsepr", keyPrefix: "bonding.shapes-vsepr" }, (b) => {
  // ---- MCQs
  {
    const v = vsepr(5, 3); // PH3
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`What is the shape of a phosphine molecule, $\ce{PH3}$?`,
      options: [[v.shape, "Correct: three bonding pairs and one lone pair on phosphorus, like ammonia."], ["trigonal planar", "This would need three bonding pairs and no lone pair, as in BF₃."], ["tetrahedral", "The four pairs are arranged tetrahedrally, but the shape names only the atoms: pyramidal."], ["T-shaped", "A T-shape needs five pairs, including two lone pairs."]],
      answer: "A",
      explanation: `P has 5 outer electrons + 3 from H = 8: ${v.pairs} pairs, ${v.lone} lone pair → ${v.shape}. VSEPR predicts an angle a little below 109.5°; the measured angle in PH₃ is smaller still, about 93.5° (data).`,
    });
  }
  b.mcq({
    d: 1, skill: "RECALL",
    stem: t`What is the bond angle in a molecule of boron trifluoride, $\ce{BF3}$?`,
    options: [["120°", "Correct: three bonding pairs, no lone pairs: trigonal planar."], ["109.5°", "That is the tetrahedral angle for four bonding pairs."], ["107°", "That is the pyramidal angle (three bonding pairs + one lone pair)."], ["90°", "90° occurs in octahedral and trigonal bipyramidal molecules."]],
    answer: "A",
    explanation: "B has three outer electrons and forms three bonds: three pairs repel to 120° in a plane.",
  });
  {
    const v = vsepr(6, 2); // H2S
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: t`How many lone pairs are on the central atom of hydrogen sulfide, $\ce{H2S}$, and what is its shape?`,
      options: [[`${v.lone}; non-linear (bent)`, "Correct: S has 6 + 2 = 8 electrons: two bonding pairs and two lone pairs, like water."], ["0; linear", "S has two lone pairs, which push the bonds into a bent shape."], ["1; non-linear (bent)", "There are two lone pairs: 8 electrons, 4 pairs, 2 bonding."], ["2; linear", "Lone pairs repel the bonding pairs, so the molecule cannot be linear."]],
      answer: "A",
      explanation: `S: 6 outer electrons + 2 from H = 8 → ${v.pairs} pairs, 2 bonding and ${v.lone} lone: bent, like H₂O.`,
    });
  }
  {
    const v = vsepr(3, 4, -1); // BF4-
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`Boron trifluoride reacts with fluoride ions to form the tetrafluoroborate ion, $\ce{BF4-}$. What is the F–B–F bond angle in $\ce{BF4-}$?`,
      options: [["109.5°", `Correct: 3 + 4 + 1 = 8 electrons, ${v.pairs} bonding pairs: ${v.shape}.`], ["120°", "This is the angle in BF₃; the extra bonding pair changes the shape."], ["107°", "There is no lone pair on boron in BF₄⁻."], ["90°", "Four pairs arrange tetrahedrally, not in a square."]],
      answer: "A",
      hints: ["Add one electron for the negative charge."],
      explanation: "B: 3 outer electrons + 4 from F + 1 for the charge = 8 → four bonding pairs, no lone pairs: tetrahedral, 109.5°.",
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the H–O–H bond angle in water smaller than the H–N–H angle in ammonia?",
    options: [["Water has two lone pairs, which repel more than one lone pair.", "Correct: more lone pairs, more lone-pair repulsion, smaller angle."], ["Oxygen is more electronegative, so it pulls the hydrogen atoms closer together.", "The angle is explained by electron-pair repulsion, not by electronegativity."], ["Water has fewer electron pairs around the central atom than ammonia.", "Both central atoms have four electron pairs."], ["Bonding pairs repel more strongly than lone pairs.", "The opposite is true: lone pairs repel more strongly."]],
    answer: "A",
    hints: ["Count the lone pairs on N and on O."],
    explanation: "Both have four pairs. Water has two lone pairs (104.5°), ammonia one (107°); lone pairs repel more than bonding pairs.",
  });
  {
    const v = vsepr(5, 6, -1); // PF6-
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: t`What is the shape of the hexafluorophosphate ion, $\ce{PF6-}$?`,
      options: [[v.shape, "Correct: 5 + 6 + 1 = 12 electrons, six bonding pairs."], ["trigonal bipyramidal", "That shape has five bonding pairs, as in PF₅."], ["hexagonal planar", "Six pairs arrange octahedrally, with 90° angles, not in a flat hexagon."], ["tetrahedral", "Tetrahedral needs four bonding pairs."]],
      answer: "A",
      hints: ["Count six bonded atoms and add one electron for the charge."],
      explanation: `P: 5 + 6 (from F) + 1 (charge) = 12 electrons → ${v.pairs} bonding pairs: ${v.shape}, 90°.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about molecular shapes:\n\n1. CO₂ is linear because the carbon atom has two regions of electron density and no lone pairs.\n2. SiCl₄ is tetrahedral and non-polar.\n3. NH₃ is trigonal planar because it has three bonding pairs.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: ammonia also has a lone pair, so it is pyramidal."], ["1, 2 and 3", "Statement 3 is wrong: NH₃ has a lone pair and is pyramidal."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: four Si–Cl dipoles cancel in a tetrahedron."]],
    answer: "A",
    hints: ["Do not forget lone pairs."],
    explanation: "CO₂: two double bonds, two regions, linear. SiCl₄: tetrahedral, dipoles cancel. NH₃: three bonding pairs + one lone pair = pyramidal.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Statements about the species NH₂⁻, NH₃ and NH₄⁺:\n\n1. All three have four electron pairs around the nitrogen atom.\n2. The H–N–H bond angle increases in the order NH₂⁻ < NH₃ < NH₄⁺.\n3. NH₄⁺ is pyramidal.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: lone pairs 2, 1, 0 give angles about 104.5°, 107°, 109.5°; NH₄⁺ is tetrahedral."], ["1, 2 and 3", "Statement 3 is wrong: NH₄⁺ has four bonding pairs and no lone pair."], ["2 and 3 only", "Statement 1 is correct (8 electrons in each) and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: fewer lone pairs, larger angle."]],
    answer: "A",
    hints: ["Count electrons for each species, adjusting for the charge."],
    explanation: `NH₂⁻: 5 + 2 + 1 = 8 (2 lone pairs, bent ~104.5°). NH₃: 8 (1 lone pair, 107°). NH₄⁺: 5 + 4 − 1 = 8 (no lone pairs, ${vsepr(5, 4, 1).shape}, 109.5°).`,
  });

  // ---- numerical
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: t`How many lone pairs of electrons are on the central atom of the amide ion, $\ce{NH2-}$?`,
    value: chk(vsepr(5, 2, -1).lone, 2), wrong: [1, 3],
    explanation: "N: 5 + 2 (from H) + 1 (charge) = 8 electrons = 4 pairs; 2 bonding, so 2 lone pairs.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "What is the F–S–F bond angle, in degrees, between adjacent fluorine atoms in sulfur hexafluoride, SF₆?",
    value: 90, wrong: [109.5, 120],
    explanation: "Six bonding pairs → octahedral; adjacent bonds are at 90° (opposite ones at 180°).",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: t`How many electron pairs (bonding and lone) surround the central atom in the $\ce{PCl4+}$ ion?`,
    value: chk(vsepr(5, 4, 1).pairs, 4), wrong: [5],
    hints: ["Subtract one electron for the positive charge."],
    explanation: "P: 5 + 4 − 1 = 8 electrons = 4 bonding pairs, no lone pairs: tetrahedral.",
  });
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Tetrachloromethane, CCl₄, is a non-polar molecule even though each C–Cl bond is polar.",
    answer: true,
    explanation: "True. The four bond dipoles point to the corners of a regular tetrahedron and cancel.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The ammonium ion has a smaller H–N–H bond angle than the ammonia molecule.",
    answer: false,
    explanation: "False. NH₄⁺ has no lone pair (109.5°); NH₃ has one lone pair that squeezes the angle to 107°.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each species with its shape.",
    pairs: [[t`$\ce{SiH4}$`, vsepr(4, 4).shape], [t`$\ce{BCl3}$`, vsepr(3, 3).shape], [t`$\ce{H2Se}$`, vsepr(6, 2).shape], [t`$\ce{PCl5}$`, vsepr(5, 5).shape], [t`$\ce{AsH3}$`, vsepr(5, 3).shape]],
    explanation: "SiH₄ 4 bp; BCl₃ 3 bp; H₂Se 2 bp + 2 lp; PCl₅ 5 bp; AsH₃ 3 bp + 1 lp.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement of VSEPR theory.",
    template: "Electron pairs around a central atom {{blank:a}} each other and move as far apart as possible. The strongest repulsion is between two {{blank:b}} pairs, so each one {{blank:c}} the bond angle by about 2.5°.",
    blanks: [
      { id: "a", accepted: ["repel"], choices: ["repel", "attract", "bond to"] },
      { id: "b", accepted: ["lone"], choices: ["lone", "bonding", "shared"] },
      { id: "c", accepted: ["reduces"], choices: ["reduces", "increases", "does not change"] },
    ],
    explanation: "lp-lp > lp-bp > bp-bp; each lone pair closes the angle by about 2.5°.",
  });
  // ---- short
  b.short({
    d: 2, skill: "APPLICATION",
    stem: t`Name the shape of the carbon disulfide molecule, $\ce{CS2}$ (S=C=S).`,
    accepted: ["linear"],
    wrong: ["bent", "non-linear"],
    explanation: "Two double bonds, two regions of electron density, no lone pairs on carbon: linear, 180°, like CO₂.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the shape of a water molecule and its bond angle of 104.5°.",
    points: ["Oxygen has four electron pairs: two bonding pairs and two lone pairs", "Electron pairs repel and get as far apart as possible (roughly tetrahedral arrangement)", "Lone pairs repel more strongly than bonding pairs, so the bond angle is reduced from 109.5°", "Shape is non-linear / bent with angle 104.5°"],
    modelAnswer: "The oxygen atom has two bonding pairs and two lone pairs. These four pairs repel each other and take up a roughly tetrahedral arrangement. Lone pairs repel more strongly than bonding pairs, so they push the O–H bonds closer together, reducing the angle from 109.5° to 104.5°. The atoms are arranged in a bent (non-linear) shape.",
    hints: ["Count the lone pairs on oxygen."],
    explanation: "4 pairs, 2 lone; lone pairs repel more.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Predict the shape and bond angle of the tetrachloroaluminate ion, AlCl₄⁻, explaining your reasoning.",
    points: ["Al: 3 outer electrons + 4 from Cl + 1 for the charge = 8 electrons = 4 pairs", "All four are bonding pairs; no lone pairs", "Tetrahedral, 109.5°"],
    modelAnswer: "Aluminium has three outer electrons; four chlorine atoms add four and the negative charge one more, giving eight electrons in four pairs. All are bonding pairs, which repel equally, so the ion is tetrahedral with angles of 109.5°.",
    hints: ["Include the charge in the count."],
    explanation: "Four bonding pairs: tetrahedral.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Boron trifluoride, BF₃, is non-polar but ammonia, NH₃, is polar, although both have three polar bonds to the central atom. Explain this difference.",
    points: ["BF₃ is trigonal planar (no lone pair): the three B–F dipoles are symmetrical and cancel", "NH₃ is pyramidal because of the lone pair on N", "So the N–H dipoles do not cancel and the molecule has an overall dipole"],
    modelAnswer: "In BF₃ boron has no lone pair, so the molecule is trigonal planar and the three equal B–F dipoles at 120° cancel. In NH₃ the lone pair on nitrogen makes the molecule pyramidal; the three N–H dipoles all point towards the same side, so they do not cancel and the molecule is polar.",
    hints: ["Think about symmetry."],
    explanation: "Symmetrical shape → dipoles cancel.",
  });
  // ---- practice structured
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Phosphorus forms the chlorides PCl₃ and PCl₅. In the solid state, PCl₅ exists as the ions PCl₄⁺ and PCl₆⁻.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the shape of PCl₃.", accepted: ["pyramidal", "trigonal pyramidal", "trigonal pyramid"], wrong: ["trigonal planar"], explanation: "3 bonding pairs + 1 lone pair: pyramidal." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the shape of a PCl₅ molecule in the gas.", accepted: ["trigonal bipyramidal", "trigonal bipyramid"], wrong: ["octahedral"], explanation: "Five bonding pairs." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What are the bond angles in a PCl₅ molecule?", options: [["120° and 90°", "Correct: 120° in the triangle, 90° to the axial bonds."], ["109.5° only", "That is tetrahedral."], ["90° only", "That is octahedral."], ["120° and 180° only", "Axial-equatorial angles of 90° are also present."]], answer: "A", explanation: "Trigonal bipyramid: three equatorial at 120°, two axial at 90° to them." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the shape of the PCl₄⁺ ion.", accepted: ["tetrahedral", "tetrahedron"], wrong: ["square planar"], explanation: "5 + 4 − 1 = 8 electrons: four bonding pairs." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the shape of the PCl₆⁻ ion.", accepted: ["octahedral", "octahedron"], wrong: ["hexagonal"], explanation: "5 + 6 + 1 = 12 electrons: six bonding pairs." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why the Cl–P–Cl bond angle in PCl₃ is smaller than 109.5°.", points: ["P has three bonding pairs and one lone pair (four pairs, tetrahedral arrangement)", "Lone pair repels more strongly than bonding pairs", "So the bonding pairs are pushed closer: angle less than 109.5° (about 107° by VSEPR; accept values below 109.5°)"], modelAnswer: "Phosphorus has four electron pairs: three bonding pairs and one lone pair, arranged approximately tetrahedrally. The lone pair repels the bonding pairs more strongly than they repel each other, so the Cl–P–Cl angles are squeezed to below 109.5° (VSEPR estimate about 107°; the measured value is about 100°)." }),
    ],
    hints: ["Count electrons: central atom + one per Cl, adjusted for charge."],
    explanation: "PCl₃ pyramidal; PCl₅ trigonal bipyramidal; PCl₄⁺ tetrahedral; PCl₆⁻ octahedral.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Hydrogen selenide, H₂Se, and silane, SiH₄, are hydrides of elements near the middle of the Periodic Table.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many lone pairs are on the selenium atom in H₂Se?", value: chk(vsepr(6, 2).lone, 2), wrong: [0], explanation: "Se: 6 + 2 = 8 electrons, 2 bonding pairs, 2 lone pairs." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the shape of H₂Se.", accepted: ["bent", "non-linear", "v-shaped", "angular", "non linear"], wrong: ["linear"], explanation: "Like water: bent." }),
      P.short({ label: "(c)", marks: 1, stem: "State the bond angle in SiH₄.", accepted: ["109.5", "109.5°", "109.5 degrees", "109 degrees", "109°"], wrong: ["90"], explanation: "Four bonding pairs: tetrahedral, 109.5°." }),
      P.manual({ label: "(d)", marks: 3, stem: "Predict, with reasons, whether each molecule is polar or non-polar. (Electronegativity: H 2.1, Si 1.9, Se 2.6)", points: ["SiH₄ is non-polar: tetrahedral, so the bond dipoles cancel", "H₂Se is polar: Se–H bonds are polar (Se more electronegative)", "and the bent shape means the dipoles do not cancel"], modelAnswer: "SiH₄ is non-polar: the Si–H bonds are only slightly polar and, because the molecule is a symmetrical tetrahedron, their dipoles cancel. H₂Se is polar: Se is more electronegative than H, so each bond is polar, and the bent shape means the two dipoles do not cancel." }),
    ],
    hints: ["Shape first, then symmetry."],
    explanation: "H₂Se bent and polar; SiH₄ tetrahedral and non-polar.",
  });

  // ---- flashcards
  b.card("CONCEPT", "State VSEPR theory.", "Electron pairs around a central atom repel each other and arrange themselves as far apart as possible; lone pairs repel more than bonding pairs.");
  b.card("FACT", "Order of electron-pair repulsion?", "lone pair–lone pair > lone pair–bonding pair > bonding pair–bonding pair");
  b.card("FACT", "Shapes and angles with no lone pairs (2 to 6 pairs)?", "2 linear 180°; 3 trigonal planar 120°; 4 tetrahedral 109.5°; 5 trigonal bipyramidal 120° and 90°; 6 octahedral 90°.");
  b.card("FACT", "Shape and angle of NH₃?", "Pyramidal, 107° (3 bonding pairs, 1 lone pair).");
  b.card("FACT", "Shape and angle of H₂O?", "Non-linear (bent), 104.5° (2 bonding pairs, 2 lone pairs).");
  b.card("CONCEPT", "How do you count electron pairs for an ion?", "Central atom's outer electrons + 1 per singly bonded atom; add the negative charge or subtract the positive charge; divide by 2.");
  b.card("FACT", "Shape of NH₄⁺ and H₃O⁺?", "NH₄⁺ tetrahedral, 109.5°. H₃O⁺ pyramidal, about 107°.");
  b.card("CONCEPT", "When is a molecule with polar bonds non-polar?", "When its shape is symmetrical so the bond dipoles cancel (CO₂, BF₃, CCl₄).");
});
