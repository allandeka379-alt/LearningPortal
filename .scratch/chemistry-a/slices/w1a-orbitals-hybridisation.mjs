// W1a: bonding.orbitals-hybridisation — σ and π bonds, sp/sp²/sp³ hybridisation, restricted rotation.
import { concept, P, t, chk } from "../lib.mjs";

/** σ and π counts from numbers of single, double and triple bonds. */
const sp = (single, dbl = 0, trip = 0) => ({ s: single + dbl + trip, p: dbl + 2 * trip });

concept("achem.bonding.orbitals-hybridisation", { file: "bonding/orbitals-hybridisation", keyPrefix: "bonding.orbitals-hybridisation" }, (b) => {
  // ---- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is a π bond formed?",
    options: [["By sideways overlap of two parallel p orbitals.", "Correct: the electron density lies above and below the bond axis."], ["By end-on overlap of two p orbitals.", "End-on overlap gives a σ bond."], ["By overlap of two s orbitals.", "s orbitals can only overlap end-on, giving a σ bond."], ["By overlap of two sp² hybrid orbitals.", "Hybrid orbitals form σ bonds; π bonds use unhybridised p orbitals."]],
    answer: "A",
    explanation: "A π bond forms when two parallel p orbitals on adjacent atoms overlap sideways.",
  });
  {
    const c = sp(4, 1); // C2H4: 4 C–H, C=C
    chk(c.s, 5); chk(c.p, 1);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "How many σ bonds and π bonds are there in one molecule of ethene, C₂H₄?",
      options: [[`${c.s} σ and ${c.p} π`, "Correct: four C–H σ, plus one σ and one π in C=C."], ["4 σ and 2 π", "The C=C double bond has one σ and one π, and each C–H is a σ bond."], ["6 σ and 0 π", "This counts the double bond as two σ bonds."], ["5 σ and 2 π", "A double bond contains only one π bond."]],
      answer: "A",
      explanation: "C₂H₄: 4 C–H (σ) + C=C (1σ + 1π) = 5 σ and 1 π.",
    });
  }
  {
    // CH3CN: 3 C–H, C–C, C≡N
    const c = sp(4, 0, 1);
    chk(c.s, 5); chk(c.p, 2);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "How many σ bonds and π bonds are there in one molecule of ethanenitrile, CH₃CN?",
      options: [[`${c.s} σ and ${c.p} π`, "Correct: three C–H, one C–C and one C≡N (σ + 2π)."], ["5 σ and 1 π", "A triple bond contains two π bonds."], ["4 σ and 3 π", "A triple bond has only one σ and two π bonds; the C–C single bond is σ."], ["7 σ and 0 π", "This counts each bond of the triple bond as a σ bond."]],
      answer: "A",
      hints: ["Draw the full structural formula: H₃C–C≡N."],
      explanation: "3 C–H σ + C–C σ + C≡N (1σ + 2π) = 5 σ and 2 π.",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the hybridisation of each carbon atom in ethane, and what is the H–C–H bond angle?",
    options: [["sp³; 109.5°", "Correct: four σ bonds arranged tetrahedrally."], ["sp²; 120°", "sp² carbons have a double bond; ethane has only single bonds."], ["sp; 180°", "sp carbons are found with a triple bond or two double bonds."], ["sp³; 90°", "Tetrahedral sp³ orbitals are 109.5° apart."]],
    answer: "A",
    explanation: "Each carbon in ethane forms four σ bonds using four sp³ hybrid orbitals at 109.5°.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is there no free rotation about the C=C bond in but-2-ene?",
    options: [["Rotation would twist the p orbitals out of line and break the π bond.", "Correct: the π overlap needs the p orbitals to stay parallel."], ["Rotation would break the σ bond between the two carbon atoms.", "A σ bond is symmetrical about the axis, so rotation does not affect it."], ["The methyl groups are too large to pass each other.", "Bulky groups can rotate about single bonds; the restriction comes from the π bond."], ["The two carbon atoms are sp³ hybridised.", "The carbons of a C=C bond are sp² hybridised."]],
    answer: "A",
    hints: ["Think about what must stay parallel for sideways overlap."],
    explanation: "The π bond needs parallel p orbitals. Twisting one carbon relative to the other would destroy the overlap, which costs a lot of energy, so the C=C bond cannot rotate; hence cis and trans isomers.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In propyne, CH₃–C≡CH, what are the hybridisations of the three carbon atoms, reading from left to right?",
    options: [["sp³, sp, sp", "Correct: CH₃ has four σ bonds; each C of the triple bond has two σ bonds."], ["sp³, sp², sp²", "sp² carbons form a double bond, not a triple bond."], ["sp, sp, sp", "The CH₃ carbon has four single bonds, so it is sp³."], ["sp³, sp³, sp", "The middle carbon is part of the triple bond, so it is sp."]],
    answer: "A",
    hints: ["Count the σ bonds around each carbon."],
    explanation: "Four σ bonds → sp³; two σ bonds (plus two π) → sp.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Statements about the bonding in ethene:\n\n1. Each carbon atom uses three sp² hybrid orbitals to form σ bonds.\n2. The π bond is formed from unhybridised 2p orbitals.\n3. All six atoms lie in the same plane.\n\nWhich of the statements are correct?",
    options: [["1, 2 and 3", "Correct: all three are true."], ["1 and 2 only", "Statement 3 is true too: the sp² σ framework is planar and the p orbitals must be parallel."], ["2 and 3 only", "Statement 1 is true: three sp² hybrids per carbon."], ["1 only", "Statements 2 and 3 are also true."]],
    answer: "A",
    hints: ["The p orbitals must be parallel for the π bond."],
    explanation: "Each carbon: three sp² σ bonds in a plane at 120°, one p orbital perpendicular; the two p orbitals overlap sideways (π). This forces the molecule to be planar.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Statements about σ and π bonds:\n\n1. A σ bond has its electron density along the axis between the nuclei.\n2. A π bond is weaker than a σ bond.\n3. A triple bond contains two σ bonds and one π bond.\n\nWhich of the statements are correct?",
    options: [["1 and 2 only", "Correct: a triple bond is one σ and two π."], ["1, 2 and 3", "Statement 3 is wrong: one σ and two π."], ["2 and 3 only", "Statement 1 is correct and statement 3 is wrong."], ["1 only", "Statement 2 is also correct: sideways overlap is less effective."]],
    answer: "A",
    explanation: "σ: density on the axis; π: weaker, density above and below. Triple bond = 1σ + 2π.",
  });

  // ---- numerical
  {
    const c = sp(10 + 3); // butane C4H10: 10 C–H + 3 C–C
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: "How many σ bonds are there in one molecule of butane, C₄H₁₀?",
      value: chk(c.s, 13), wrong: [10, 14],
      explanation: "Ten C–H bonds plus three C–C bonds, all single (σ): 13 σ bonds.",
    });
  }
  {
    // benzene Kekulé-free count: σ = 6 C–C + 6 C–H = 12
    b.num({
      d: 3, skill: "APPLICATION",
      stem: "How many σ bonds are there in one molecule of benzene, C₆H₆?",
      value: chk(6 + 6, 12), wrong: [9, 15],
      hints: ["Each carbon forms three σ bonds: two to neighbouring carbons and one to hydrogen."],
      explanation: "Six C–C σ bonds around the ring plus six C–H σ bonds = 12. The π electrons are delocalised over the ring.",
    });
  }
  {
    // CH2=CH–C≡N (propenenitrile): C–H 3, C=C 1, C–C 1, C≡N 1
    const c = sp(3 + 1, 1, 1);
    b.num({
      d: 4, skill: "ANALYSIS",
      stem: "Propenenitrile, CH₂=CH–C≡N, is used to make acrylic fibres. How many π bonds does one molecule contain?",
      value: chk(c.p, 3), wrong: [2, 1],
      hints: ["Count the π bonds in each multiple bond."],
      explanation: `C=C contributes one π bond and C≡N two: ${c.p} π bonds (and ${c.s} σ bonds).`,
    });
  }
  {
    const c = sp(1 + 1 + 1, 1); // ethanoic acid CH3COOH: C-H x3, C-C, C-O, O-H, C=O
    const ch = sp(3 + 1 + 1 + 1, 1);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: "How many σ bonds are there in one molecule of ethanoic acid, CH₃COOH?",
      value: chk(ch.s, 7), wrong: [8, 6],
      hints: ["Bonds: three C–H, C–C, C=O, C–O and O–H."],
      explanation: "3 C–H + C–C + C–O + O–H (all σ) + C=O (one σ, one π) = 7 σ bonds and 1 π bond.",
    });
    chk(c.s, 4);
  }
  // ---- true/false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In buta-1,3-diene, CH₂=CH–CH=CH₂, all four carbon atoms are sp² hybridised.",
    answer: true,
    explanation: "True. Each carbon is part of a C=C bond and forms three σ bonds, so all four are sp².",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "There is free rotation about a carbon-carbon single bond.",
    answer: true,
    explanation: "True. A σ bond is cylindrically symmetrical about the axis, so rotation does not reduce the overlap.",
  });
  // ---- matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each atom with the bonds it forms.",
    pairs: [["carbon in methane", "four σ bonds and no π bond"], ["carbon in ethene", "three σ bonds and one π bond"], ["carbon in ethyne", "two σ bonds and two π bonds"], ["hydrogen in methane", "one σ bond using its 1s orbital"]],
    explanation: "Methane carbon: sp³, four σ. Ethene carbon: sp², three σ + one π. Ethyne carbon: sp, two σ + two π. Hydrogen: its 1s orbital overlaps end-on with a carbon hybrid orbital.",
  });
  // ---- fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about bonding in hydrogen cyanide, H–C≡N.",
    template: "The carbon atom is {{blank:a}} hybridised, so the molecule is {{blank:b}}. The C≡N bond consists of one σ bond and {{blank:c}} π bonds.",
    blanks: [
      { id: "a", accepted: ["sp"], choices: ["sp", "sp²", "sp³"] },
      { id: "b", accepted: ["linear"], choices: ["linear", "bent", "trigonal planar", "tetrahedral"] },
      { id: "c", accepted: ["two"], choices: ["one", "two", "three"] },
    ],
    explanation: "Two σ bonds around carbon → sp, 180°; a triple bond = σ + 2π.",
  });
  // ---- short
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of covalent bond formed by end-on overlap of orbitals.",
    accepted: ["sigma", "σ", "sigma bond", "σ bond", "a sigma bond"],
    wrong: ["pi"],
    explanation: "End-on (head-on) overlap gives a σ (sigma) bond.",
  });
  // ---- self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the bonding in ethene in terms of orbital overlap and hybridisation, and explain why the molecule is planar.",
    points: ["Each carbon is sp² hybridised: three sp² orbitals in a plane at 120°", "sp² orbitals overlap end-on with H 1s orbitals and with each other to form σ bonds (C–H and C–C)", "The unhybridised p orbital on each carbon overlaps sideways with the other to form a π bond (density above and below the plane)", "The p orbitals must be parallel for overlap, so all six atoms lie in one plane"],
    modelAnswer: "Each carbon atom is sp² hybridised. Its three sp² orbitals lie in a plane at 120° and overlap end-on with two hydrogen 1s orbitals and with an sp² orbital of the other carbon, forming σ bonds. Each carbon has one unhybridised 2p orbital at right angles to this plane; these two p orbitals overlap sideways to form a π bond with electron density above and below the plane. Because the p orbitals must be parallel for this overlap, both CH₂ groups are held in the same plane, so the molecule is planar.",
    hints: ["Start with the hybridisation, then the σ framework, then the π bond."],
    explanation: "sp² σ framework plus a p-p π bond.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the bond energy of a C≡C bond is less than three times that of a C–C bond.",
    points: ["A C≡C bond is one σ bond plus two π bonds", "π bonds are weaker than σ bonds because sideways overlap is less effective than end-on overlap"],
    modelAnswer: "The triple bond is one σ bond and two π bonds. Sideways overlap of p orbitals is less effective than end-on overlap, so each π bond is weaker than a σ bond and the total is less than three times the single bond.",
    hints: ["What are the second and third bonds in a triple bond?"],
    explanation: "π bonds are weaker than σ bonds.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Describe the bonding in the nitrogen molecule, N₂, in terms of σ and π bonds formed from p orbitals.",
    points: ["One σ bond from end-on overlap of a 2p orbital on each N (along the bond axis)", "Two π bonds from sideways overlap of the remaining pairs of parallel 2p orbitals", "The two π bonds are at right angles to each other (each nitrogen keeps a lone pair)"],
    modelAnswer: "Each nitrogen atom has three half-filled 2p orbitals. One pair of 2p orbitals pointing along the axis overlaps end-on to give the σ bond. The other two pairs overlap sideways to give two π bonds, in planes at right angles to each other. Each nitrogen keeps its 2s lone pair.",
    hints: ["Nitrogen has three half-filled 2p orbitals."],
    explanation: "N≡N = 1σ + 2π, the π bonds perpendicular.",
  });
  // ---- practice structured
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "But-3-en-2-one has the structure CH₂=CH–CO–CH₃, in which the C=O carbon is joined to the CH= carbon and to the CH₃ group.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many π bonds are in one molecule?", value: chk(sp(0, 2).p, 2), wrong: [1], explanation: "One in C=C and one in C=O." }),
      P.num({ label: "(b)", marks: 1, stem: "How many σ bonds are in one molecule?", value: chk(sp(6 + 2, 2).s, 10), wrong: [8, 12], explanation: "6 C–H + 2 C–C single + C=C (1σ) + C=O (1σ) = 10." }),
      P.short({ label: "(c)", marks: 1, stem: "State the hybridisation of the carbon atom in the CH₃ group.", accepted: ["sp3", "sp³", "sp^3"], wrong: ["sp2"], explanation: "Four σ bonds: sp³." }),
      P.short({ label: "(d)", marks: 1, stem: "State the approximate C–C–C bond angle around the C=O carbon.", accepted: ["120", "120°", "120 degrees", "about 120°"], wrong: ["109.5"], explanation: "The carbonyl carbon is sp²: about 120°." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain whether the molecule can have cis and trans isomers about the C=C bond.", points: ["No geometric isomers", "One carbon of the C=C bond (the CH₂ end) carries two identical groups (two H atoms)"], modelAnswer: "No. Although rotation about C=C is restricted, the terminal carbon of the double bond carries two hydrogen atoms, so swapping groups gives the same molecule; cis-trans isomerism needs two different groups on each carbon of the C=C bond." }),
    ],
    hints: ["Draw every bond, including the C–H bonds.", "Single = σ; double = σ + π."],
    explanation: "2 π, 10 σ; CH₃ sp³; C=O carbon sp² (120°); no cis-trans isomers because one alkene carbon has two H atoms.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Hydrogen cyanide, HCN, is a very toxic gas. Its structure is H–C≡N.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the hybridisation of the carbon atom.", accepted: ["sp"], wrong: ["sp2", "sp3"], explanation: "Two σ bonds (to H and N): sp." }),
      P.short({ label: "(b)", marks: 1, stem: "State the H–C–N bond angle.", accepted: ["180", "180°", "180 degrees"], wrong: ["120"], explanation: "sp: linear, 180°." }),
      P.num({ label: "(c)", marks: 1, stem: "How many σ bonds does the molecule contain?", value: chk(sp(1, 0, 1).s, 2), wrong: [4], explanation: "H–C σ and the σ of C≡N." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how the C≡N bond is formed from orbitals.", points: ["σ bond: end-on overlap of a carbon sp orbital with a nitrogen orbital (2p / hybrid)", "Two π bonds: sideways overlap of the two unhybridised carbon 2p orbitals with two nitrogen 2p orbitals", "The two π bonds are perpendicular to each other"], modelAnswer: "An sp hybrid orbital on carbon overlaps end-on with an orbital on nitrogen to form the σ bond. The two unhybridised 2p orbitals on carbon, at right angles to each other, overlap sideways with two parallel 2p orbitals on nitrogen, forming two π bonds in perpendicular planes." }),
    ],
    hints: ["sp carbon keeps two p orbitals for π bonding."],
    explanation: "sp carbon; linear; C≡N = σ + 2π.",
  });

  // ---- flashcards
  b.card("DEFINITION", "Define a **σ bond**.", "A bond formed by end-on overlap of orbitals, with electron density on the axis between the nuclei.");
  b.card("DEFINITION", "Define a **π bond**.", "A bond formed by sideways overlap of parallel p orbitals, with electron density above and below the bond axis.");
  b.card("FACT", "σ and π in single, double and triple bonds?", "Single: 1σ. Double: 1σ + 1π. Triple: 1σ + 2π.");
  b.card("FACT", "sp³, sp², sp: shapes and angles?", "sp³: tetrahedral, 109.5°. sp²: trigonal planar, 120°. sp: linear, 180°.");
  b.card("CONCEPT", "Why is a π bond weaker than a σ bond?", "Sideways overlap of p orbitals is less effective than end-on overlap.");
  b.card("CONCEPT", "Why is rotation about C=C restricted?", "Rotation would twist the p orbitals out of line and break the π bond.");
  b.card("CONCEPT", "Why is ethene planar?", "The sp² σ framework is planar, and the two p orbitals forming the π bond must be parallel.");
  b.card("FACT", "Bonding in benzene (outline)?", "Each C is sp² with three σ bonds; the six leftover p orbitals overlap to form a delocalised π system above and below the ring.");
});
