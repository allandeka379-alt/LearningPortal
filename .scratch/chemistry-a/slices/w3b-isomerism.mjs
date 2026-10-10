// W3b: achem.organic.isomerism (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t } from "../lib.mjs";

concept("achem.organic.isomerism", { file: "organic/isomerism", keyPrefix: "organic.isomerism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are structural isomers?",
    options: [
      ["compounds with the same molecular formula but different structural formulae", "Correct: same atoms, connected differently."],
      ["compounds with the same structural formula but a different arrangement in space", "That describes stereoisomers (cis/trans or optical)."],
      ["compounds with the same functional group whose formulae differ by CH₂", "That describes members of a homologous series."],
      ["compounds with the same empirical formula but different molecular formulae", "Ethene and cyclohexane share CH₂ but are not isomers."],
    ],
    answer: "A",
    explanation: "Structural isomers have the same molecular formula and different structural formulae.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which pair of compounds are positional isomers?",
    options: [
      ["propan-1-ol and propan-2-ol", "Correct: same chain and functional group; only the OH position differs."],
      ["propanal and propanone", "These have different functional groups: functional group isomers."],
      ["butane and 2-methylpropane", "These differ in the carbon skeleton: chain isomers."],
      ["cis-but-2-ene and trans-but-2-ene", "These are stereoisomers, with the same structural formula."],
    ],
    answer: "A",
    explanation: "Positional isomers differ only in where the functional group sits on the same skeleton.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which alkene shows cis/trans isomerism?",
    options: [
      [t`$\ce{CH3CH=CHCH2CH3}$`, "Correct: each C of the C=C carries H and an alkyl group."],
      [t`$\ce{CH2=CHCH2CH3}$`, "The first carbon carries two H atoms."],
      [t`$\ce{(CH3)2C=CHCH3}$`, "The second carbon carries two identical CH₃ groups."],
      [t`$\ce{CH2=C(CH3)CH2CH3}$`, "The terminal =CH₂ carbon has two identical H atoms."],
    ],
    answer: "A",
    explanation: "Pent-2-ene has two different groups on each double-bond carbon.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`Which compound is a functional group isomer of propanoic acid, $\ce{CH3CH2COOH}$?`,
    options: [
      [t`$\ce{CH3COOCH3}$`, "Correct: methyl ethanoate, an ester, is also C₃H₆O₂."],
      [t`$\ce{CH3COOH}$`, "Ethanoic acid is C₂H₄O₂, a different molecular formula."],
      [t`$\ce{CH3CH2CHO}$`, "Propanal is C₃H₆O, one oxygen fewer."],
      [t`$\ce{CH3CH2CH2OH}$`, "Propan-1-ol is C₃H₈O."],
    ],
    answer: "A",
    explanation: "Acids and esters with the same number of carbons share CₙH₂ₙO₂.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is there no free rotation about a carbon–carbon double bond?",
    options: [
      ["Rotation would break the sideways overlap of p orbitals that forms the π bond.", "Correct: the π bond needs the p orbitals to stay parallel."],
      ["The σ bond in C=C is much stronger than a C–C σ bond and resists twisting.", "A σ bond is symmetrical about the axis, so it allows rotation."],
      ["The groups attached to the double bond are too large to move past each other.", "Even ethene, with only H atoms, cannot rotate about C=C."],
      ["The carbon atoms of a double bond are sp³ hybridised and so are held rigidly.", "They are sp² hybridised; the unhybridised p orbitals form the π bond."],
    ],
    answer: "A",
    hints: ["Which part of the double bond lies above and below the plane?"],
    explanation: "Twisting would destroy the π overlap, which needs energy, so groups are fixed on one side.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`Consider hex-3-ene, $\ce{CH3CH2CH=CHCH2CH3}$. Which of the statements are correct?\n\n1. It shows cis/trans isomerism.\n2. It is a positional isomer of hex-2-ene.\n3. It is a chain isomer of cyclohexane.`,
    options: [
      ["1 and 2 only", "Correct: cyclohexane is a functional group (ring) isomer, not a chain isomer."],
      ["1, 2 and 3", "An alkene and a cycloalkane belong to different series: functional group isomers."],
      ["2 and 3 only", "Statement 1 is true: each double-bond carbon has H and C₂H₅."],
      ["1 only", "Statement 2 is also true: only the position of C=C differs."],
    ],
    answer: "A",
    hints: ["Is a ring a different chain or a different type of compound?"],
    explanation: "Hex-3-ene: cis/trans yes; positional isomer of hex-2-ene; functional group isomer of cyclohexane.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about the isomers of C₂H₂Cl₂ are correct?\n\n1. 1,1-dichloroethene has cis and trans isomers.\n2. cis-1,2-dichloroethene has a permanent dipole.\n3. 1,1-dichloroethene and 1,2-dichloroethene are structural isomers.",
    options: [
      ["2 and 3 only", "Correct: 1,1-dichloroethene has two H on one carbon, so no cis/trans isomers."],
      ["1, 2 and 3", "Statement 1 is false: one carbon carries two identical H atoms."],
      ["1 and 2 only", "Statement 1 is false and statement 3 is true."],
      ["1 only", "Statement 1 is the false one; statements 2 and 3 are true."],
    ],
    answer: "A",
    hints: ["Check the groups on each double-bond carbon of CCl₂=CH₂."],
    explanation: "CCl₂=CH₂ has no stereoisomers; cis-ClCH=CHCl is polar; 1,1- and 1,2- are positional isomers.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which compound contains a chiral centre?",
    options: [
      [t`$\ce{CH3CH2CHBrCH3}$`, "Correct: C2 carries H, Br, CH₃ and C₂H₅."],
      [t`$\ce{CH3CHBrCH3}$`, "The central carbon has two identical CH₃ groups."],
      [t`$\ce{(CH3)3CBr}$`, "Three identical CH₃ groups."],
      [t`$\ce{CH3CH2CH2CH2Br}$`, "No carbon has four different groups; CH₂Br carries two H atoms."],
    ],
    answer: "A",
    hints: ["Look for a carbon with four different groups."],
    explanation: "2-bromobutane has a chiral centre at C2.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many structural isomers have the molecular formula C₆H₁₄?",
    value: 5,
    wrong: [4],
    hints: ["Chains of 6, 5 and 4 carbons; place the branches carefully."],
    explanation: "Hexane; 2-methylpentane; 3-methylpentane; 2,2-dimethylbutane; 2,3-dimethylbutane: five.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many structural isomers have the molecular formula C₄H₉Cl?",
    value: 4,
    wrong: [2],
    hints: ["Use both four-carbon skeletons and every distinct Cl position."],
    explanation: "1-chlorobutane, 2-chlorobutane, 1-chloro-2-methylpropane, 2-chloro-2-methylpropane: four.",
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    stem: "How many alkenes have the formula C₅H₁₀? Count cis and trans isomers separately and ignore rings.",
    value: 6,
    wrong: [5],
    hints: ["Find the structural alkene isomers first, then test each for cis/trans."],
    explanation: "Pent-1-ene; cis- and trans-pent-2-ene; 2-methylbut-1-ene; 3-methylbut-1-ene; 2-methylbut-2-ene. Only pent-2-ene has cis/trans forms, so 5 + 1 = 6.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "How many isomers have the formula C₂H₂Cl₂? Count cis and trans isomers separately.",
    value: 3,
    wrong: [2],
    hints: ["Both Cl atoms on one carbon, or one on each."],
    explanation: "1,1-dichloroethene, cis-1,2-dichloroethene and trans-1,2-dichloroethene.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "But-1-ene, CH₂=CHCH₂CH₃, shows cis/trans isomerism.",
    answer: false,
    explanation: "False: the first carbon of the double bond carries two hydrogen atoms.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Of two chain isomers, the more branched one usually has the lower boiling point.",
    answer: true,
    explanation: "True: branching reduces surface contact, so London forces are weaker.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each pair of compounds with the type of isomerism they show.",
    pairs: [
      ["pentane and 2,2-dimethylpropane", "chain"],
      ["1-bromopropane and 2-bromopropane", "positional"],
      ["ethanol and methoxymethane", "functional group"],
      ["cis- and trans-1,2-dibromoethene", "cis/trans (geometrical)"],
    ],
    hints: ["Same skeleton? Same functional group? Same structural formula?"],
    explanation: "Different skeleton → chain; group position → positional; alcohol vs ether → functional group; same structure, different spatial arrangement about C=C → cis/trans.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the conditions for cis/trans isomerism.",
    template: "The molecule must contain a C=C bond, about which there is {{blank:a}} rotation because of the {{blank:b}} bond, and each carbon atom of the double bond must carry {{blank:c}} groups.",
    blanks: [
      { id: "a", accepted: ["restricted"], choices: ["restricted", "free", "rapid"] },
      { id: "b", accepted: ["π"], choices: ["π", "σ", "hydrogen"] },
      { id: "c", accepted: ["two different"], choices: ["two different", "two identical", "three different"] },
    ],
    explanation: "Restricted rotation (π bond) and two different groups on each double-bond carbon.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the name of the chain isomer of butane.",
    accepted: ["2-methylpropane", "methylpropane", "isobutane"],
    wrong: ["2-methylbutane"],
    explanation: "2-methylpropane, (CH₃)₃CH, is the only other C₄H₁₀ isomer.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why but-2-ene exists as two stereoisomers.",
    points: ["There is restricted (no free) rotation about the C=C bond because of the π bond", "Each carbon of the C=C carries two different groups (H and CH₃), so the CH₃ groups can be on the same side (cis) or opposite sides (trans)"],
    modelAnswer: "The π bond prevents rotation about the C=C bond. Each double-bond carbon holds an H atom and a CH₃ group, so the two CH₃ groups are either on the same side (cis-but-2-ene) or on opposite sides (trans-but-2-ene); these cannot interconvert.",
    hints: ["Two conditions are needed."],
    explanation: "Restricted rotation plus two different groups on each carbon.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Give the structural formulae and names of the two carbonyl compounds with the formula C₃H₆O, and state the type of isomerism between them.",
    points: ["CH₃CH₂CHO, propanal", "CH₃COCH₃, propanone", "Functional group isomerism (aldehyde and ketone)"],
    modelAnswer: "Propanal, CH₃CH₂CHO, an aldehyde, and propanone, CH₃COCH₃, a ketone. They are functional group isomers.",
    hints: ["The C=O can be at the end or in the middle of the chain."],
    explanation: "Aldehydes and ketones share CₙH₂ₙO.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "cis-1,2-dichloroethene boils at a higher temperature than trans-1,2-dichloroethene. Explain this difference.",
    points: ["In the cis isomer both C–Cl dipoles are on the same side, so they do not cancel: the molecule is polar", "In the trans isomer the dipoles are opposite and cancel: non-polar", "So the cis isomer has permanent dipole–dipole forces in addition to London forces, needing more energy to separate the molecules"],
    modelAnswer: "Each C–Cl bond is polar. In the cis isomer the two dipoles point the same way and give the molecule an overall dipole; in the trans isomer they point in opposite directions and cancel. The cis molecules therefore attract each other by permanent dipole–dipole forces as well as London forces, so more energy is needed to boil it.",
    hints: ["Compare the directions of the two C–Cl dipoles."],
    explanation: "Polarity from the geometry controls the intermolecular forces.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Compound Q has the molecular formula C₄H₈O. It contains a C=O group and no C=C bond or ring.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many structures are possible for Q?", value: 3, wrong: [2], explanation: "Butanal, 2-methylpropanal and butanone." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the ketone that fits the description of Q.", accepted: ["butanone", "butan-2-one", "2-butanone", "methyl ethyl ketone"], wrong: ["butanal"], explanation: "CH₃COCH₂CH₃, butanone." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give the structural formulae of the two aldehydes and state the type of isomerism between them.", points: ["CH₃CH₂CH₂CHO and (CH₃)₂CHCHO", "Chain isomerism"], modelAnswer: "Butanal, CH₃CH₂CH₂CHO, and 2-methylpropanal, (CH₃)₂CHCHO; they are chain isomers." }),
      P.mcq({ label: "(d)", marks: 1, stem: "What type of isomerism is shown by butanal and butanone?", options: [
        ["functional group", "Correct: an aldehyde and a ketone."],
        ["chain", "The carbon skeleton is the same unbranched chain."],
        ["cis/trans", "There is no C=C bond in either."],
        ["optical", "Neither has a chiral centre, and they have different structural formulae."],
      ], answer: "A", explanation: "Different homologous series: functional group isomerism." }),
      P.manual({ label: "(e)", marks: 2, stem: t`Another isomer of $\ce{C4H8O}$ is but-2-en-1-ol, $\ce{CH3CH=CHCH2OH}$. State and explain whether it shows cis/trans isomerism.`, points: ["Yes, it shows cis/trans isomerism", "Restricted rotation about C=C and each double-bond carbon carries two different groups (H and CH₃; H and CH₂OH)"], modelAnswer: "Yes. Rotation about the C=C is restricted, and one double-bond carbon carries H and CH₃ while the other carries H and CH₂OH, so cis and trans forms exist." }),
      P.tf({ label: "(f)", marks: 1, stem: "Butanone contains a chiral centre.", answer: false, explanation: "No carbon in CH₃COCH₂CH₃ has four different groups." }),
    ],
    hints: ["The C=O can be at the end (aldehyde) or inside the chain (ketone).", "Check both double-bond carbons for two different groups."],
    explanation: "Three carbonyl isomers; aldehyde pair are chain isomers; but-2-en-1-ol has cis/trans forms.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "This question is about the open-chain (non-cyclic) isomers of C₃H₅Cl, which all contain one C=C bond.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many structural isomers are there (do not count cis and trans separately)?", value: 3, wrong: [2], explanation: "1-chloropropene, 2-chloropropene and 3-chloropropene." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the isomer that shows cis/trans isomerism.", accepted: ["1-chloropropene", "1-chloroprop-1-ene", "1 chloropropene"], wrong: ["3-chloropropene"], explanation: "ClCH=CHCH₃: H and Cl on C1, H and CH₃ on C2." }),
      P.manual({ label: "(c)", marks: 2, stem: t`Explain why 2-chloropropene, $\ce{CH2=CClCH3}$, does not show cis/trans isomerism.`, points: ["Carbon 1 of the C=C carries two identical groups (two H atoms)", "So swapping sides gives the same molecule: no cis and trans forms"], modelAnswer: "The =CH₂ carbon carries two hydrogen atoms; with two identical groups on one end of the double bond, the two possible arrangements are identical, so there are no cis/trans isomers." }),
      P.num({ label: "(d)", marks: 1, stem: "How many open-chain isomers are there in total, counting cis and trans separately?", value: 4, wrong: [3], explanation: "Three structural isomers, one of which has two stereoisomers: 4." }),
      P.short({ label: "(e)", marks: 1, stem: "C₃H₅Cl also has a cyclic isomer. Name it.", accepted: ["chlorocyclopropane", "1-chlorocyclopropane"], wrong: ["chloropropane"], explanation: "A three-membered ring with one Cl: chlorocyclopropane." }),
    ],
    hints: ["Place Cl on each carbon of CH₂=CHCH₃ in turn."],
    explanation: "3 structural open-chain isomers; 1-chloropropene has cis/trans forms; 4 in total; chlorocyclopropane is cyclic.",
  });

  b.card("DEFINITION", "Structural isomers", "Same molecular formula, different structural formula (chain, positional or functional group).");
  b.card("DEFINITION", "Stereoisomers", "Same molecular and structural formula, different arrangement of atoms in space (cis/trans, optical).");
  b.card("CONCEPT", "Two conditions for cis/trans isomerism", "A C=C bond (restricted rotation because of the π bond) and two different groups on each double-bond carbon.");
  b.card("CONCEPT", "Cis and trans", "Cis: similar groups on the same side of the C=C. Trans: on opposite sides.");
  b.card("FACT", "Common functional group isomer pairs", "Aldehydes/ketones (CₙH₂ₙO); acids/esters (CₙH₂ₙO₂); alkenes/cycloalkanes (CₙH₂ₙ); alcohols/ethers.");
  b.card("CONCEPT", "Effect of branching on boiling point", "More branching → less surface contact → weaker London forces → lower boiling point.");
  b.card("DEFINITION", "Chiral centre", "A carbon atom bonded to four different atoms or groups.");
  b.card("FACT", "Number of structural isomers of C₅H₁₂", "Three: pentane, 2-methylbutane, 2,2-dimethylpropane.");
  b.card("CONCEPT", "Why cis-1,2-dichloroethene is polar", "Its two C–Cl dipoles point the same way and do not cancel; in the trans isomer they cancel.");
});
