// W3b: achem.organic.optical-isomerism-drugs (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t } from "../lib.mjs";

concept("achem.organic.optical-isomerism-drugs", { file: "organic/optical-isomerism-drugs", keyPrefix: "organic.optical-isomerism-drugs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are enantiomers?",
    options: [
      ["stereoisomers that are non-superimposable mirror images of each other", "Correct: the definition of optical isomers."],
      ["isomers that differ in the arrangement of groups about a C=C bond", "That describes cis/trans isomers."],
      ["isomers with the same functional group in different positions on a chain", "That describes positional (structural) isomers."],
      ["equimolar mixtures of two compounds that rotate polarised light equally", "That describes a racemic mixture, not the isomers themselves."],
    ],
    answer: "A",
    explanation: "Enantiomers are non-superimposable mirror images.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which compound has a chiral centre?",
    options: [
      [t`$\ce{CH3CH(NH2)CH2CH3}$`, "Correct: C2 carries H, NH₂, CH₃ and C₂H₅."],
      [t`$\ce{CH3CH(NH2)CH3}$`, "Two identical CH₃ groups on C2."],
      [t`$\ce{CH3CH2CH(CH2CH3)NH2}$`, "C3 carries two identical ethyl groups."],
      [t`$\ce{H2NCH2COOH}$`, "The central carbon of glycine carries two H atoms."],
    ],
    answer: "A",
    explanation: "Butan-2-amine has four different groups on C2.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which property do the two enantiomers of a compound differ?",
    options: [
      ["the direction in which they rotate plane-polarised light", "Correct: equal angles in opposite directions."],
      ["their boiling points at the same pressure", "Enantiomers have identical boiling points."],
      ["their rate of reaction with aqueous sodium hydroxide", "With a non-chiral reagent they react identically."],
      ["their solubility in water at the same temperature", "Physical properties such as solubility are identical."],
    ],
    answer: "A",
    explanation: "Only optical rotation (and interaction with chiral molecules) differs.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A single enantiomer of 3-chloro-3-methylhexane is hydrolysed by an SN1 mechanism. Why is the alcohol formed optically inactive?",
    options: [
      ["The planar carbocation is attacked equally from both sides, giving a racemic mixture.", "Correct: equal amounts of the two enantiomers form."],
      ["The product alcohol has no chiral centre after the chlorine is replaced.", "3-methylhexan-3-ol still has four different groups on C3."],
      ["Hydroxide attacks only from the side opposite chlorine, inverting the centre.", "That is SN2 behaviour, which would give one active enantiomer."],
      ["The carbocation is tetrahedral, so its shape cannot be retained by the product.", "The carbocation is trigonal planar, not tetrahedral."],
    ],
    answer: "A",
    hints: ["What is the shape of the intermediate?"],
    explanation: "SN1 → planar carbocation → 50 : 50 attack → racemate, rotations cancel.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Butanal reacts with HCN (in the presence of CN⁻) to form 2-hydroxypentanenitrile, which has a chiral centre. Which statement explains why the product is optically inactive?",
    options: [
      ["The C=O group is planar, so CN⁻ attacks from either face with equal probability.", "Correct: equal amounts of the two enantiomers form."],
      ["The product molecule is superimposable on its mirror image, so it is achiral.", "The product has four different groups on C2, so it is chiral."],
      ["Cyanide ions can only attack from one face, so a single enantiomer is formed.", "A single enantiomer would rotate plane-polarised light."],
      ["The reaction goes through a carbocation, which then loses its chirality.", "Nucleophilic addition does not involve a carbocation."],
    ],
    answer: "A",
    hints: ["Think about the shape around the carbonyl carbon."],
    explanation: "Trigonal planar carbonyl carbon → attack from above or below equally → racemic mixture.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about a racemic mixture are correct?\n\n1. It contains equal amounts of two enantiomers.\n2. It does not rotate plane-polarised light.\n3. Its molecules contain no chiral centres.",
    options: [
      ["1 and 2 only", "Correct: each molecule is chiral; the rotations cancel."],
      ["1, 2 and 3", "Statement 3 is false: every molecule in the mixture is chiral."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["The inactivity comes from cancellation, not from the molecules."],
    explanation: "A racemate is 50 : 50; the opposite rotations cancel.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the statements about the stereochemistry of nucleophilic substitution are correct?\n\n1. SN2 hydrolysis of one enantiomer of 2-bromobutane gives one enantiomer of butan-2-ol.\n2. SN2 hydrolysis of one enantiomer of 2-bromobutane gives a racemic mixture.\n3. SN1 hydrolysis of one enantiomer of 3-bromo-3-methylhexane gives a single enantiomer.",
    options: [
      ["1 only", "Correct: SN2 inverts the centre, giving a single (active) enantiomer; SN1 gives a racemate."],
      ["1 and 2 only", "Statements 1 and 2 contradict each other; SN2 does not racemise."],
      ["2 and 3 only", "Both are the wrong way round: SN2 inverts, SN1 racemises."],
      ["1, 2 and 3", "Statements 2 and 3 are false."],
    ],
    answer: "A",
    hints: ["Backside attack in one step, or a planar intermediate?"],
    explanation: "SN2: one step, backside attack, inversion. SN1: planar carbocation, racemisation.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many chiral centres are there in 2,3-dihydroxypropanal, HOCH₂CH(OH)CHO?",
    value: 1,
    wrong: [2],
    explanation: "Only C2 (H, OH, CHO, CH₂OH) has four different groups; C3 has two H atoms.",
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    stem: "How many chiral centres are there in 2-chloropentan-3-ol, CH₃CH(Cl)CH(OH)CH₂CH₃?",
    value: 2,
    wrong: [1],
    hints: ["Check C2 and C3 separately and compare whole groups."],
    explanation: "C2: H, Cl, CH₃, CH(OH)C₂H₅ – chiral. C3: H, OH, C₂H₅, CH(Cl)CH₃ – chiral. Two chiral centres.",
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    stem: "How many chiral centres are there in 2-methylcyclohexanol (a six-membered carbon ring with OH on carbon 1 and CH₃ on carbon 2)?",
    value: 2,
    wrong: [1],
    hints: ["For a ring carbon, compare the two paths around the ring."],
    explanation: "C1: H, OH, and two different ring paths (one reaches the CH₃-bearing carbon first) – chiral. C2: H, CH₃, and two different ring paths – chiral. The other ring carbons carry two H atoms.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Under fixed conditions, a solution of one enantiomer of a compound rotates plane-polarised light by +23.6°. What is the rotation, in degrees, produced by an identical solution of the other enantiomer? Give the sign.",
    value: -23.6, dp: 1,
    wrong: [23.6],
    hints: ["Same angle, opposite direction."],
    explanation: "The other enantiomer gives −23.6°; a 50 : 50 mixture would give 0°.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The two enantiomers of a chiral compound have different boiling points.",
    answer: false,
    explanation: "False: physical properties are identical, except the direction of rotation of plane-polarised light.",
  });
  b.tf({
    d: 2, skill: "APPLICATION",
    stem: "Glycine, H₂NCH₂COOH, is not optically active.",
    answer: true,
    explanation: "True: its central carbon has two hydrogen atoms, so there is no chiral centre.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each reaction of a single enantiomer (or of a non-chiral carbonyl compound) with the stereochemical outcome.",
    pairs: [
      "SN1 hydrolysis of a chiral tertiary bromoalkane",
      "SN2 hydrolysis of a chiral secondary bromoalkane",
      "addition of HCN to propanal",
      "reaction of a chiral alcohol with sodium (no bond to C* broken)",
    ],
    right: ["racemic mixture", "single enantiomer, configuration inverted", "single enantiomer, configuration unchanged"],
    rightIndex: [0, 1, 0, 2],
    hints: ["Planar intermediates racemise; one-step backside attack inverts."],
    explanation: "SN1 and nucleophilic addition go through planar species → racemate; SN2 inverts; a reaction that does not touch the chiral carbon keeps its configuration.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Enantiomers rotate the plane of {{blank:a}} light by equal angles in {{blank:b}} directions. A 50 : 50 mixture of the two is called a {{blank:c}} mixture and is optically {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["plane-polarised"], choices: ["plane-polarised", "ultraviolet", "infrared"] },
      { id: "b", accepted: ["opposite"], choices: ["opposite", "the same", "random"] },
      { id: "c", accepted: ["racemic"], choices: ["racemic", "eutectic", "azeotropic"] },
      { id: "d", accepted: ["inactive"], choices: ["inactive", "active"] },
    ],
    explanation: "Opposite rotations cancel in a racemic mixture.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name given to an equimolar mixture of two enantiomers?",
    accepted: ["racemic mixture", "racemate", "a racemic mixture", "racemic modification", "a racemate"],
    wrong: ["enantiomer"],
    explanation: "A racemic mixture (racemate) is optically inactive.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the product of the reaction between ethanal and HCN, 2-hydroxypropanenitrile, is optically inactive even though its molecules are chiral.",
    points: ["The carbon of the C=O group is trigonal planar", "CN⁻ (the nucleophile) attacks this carbon from above or below the plane with equal probability", "So equal amounts of the two enantiomers form (a racemic mixture) and their rotations cancel"],
    modelAnswer: "The carbonyl carbon in ethanal is trigonal planar. The cyanide ion is equally likely to attack it from either side of the plane, so the two enantiomers of 2-hydroxypropanenitrile form in equal amounts. The racemic mixture has no net effect on plane-polarised light.",
    hints: ["Shape of the carbonyl carbon → direction of attack → ratio of products."],
    explanation: "Planar reactant site → racemic product.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A pharmaceutical company can sell a chiral drug as a racemic mixture or as a single enantiomer. Suggest two advantages and one disadvantage of producing the single enantiomer.",
    points: ["Advantage: the other enantiomer may be inactive or have harmful side effects, which are avoided", "Advantage: a smaller dose is needed (or less waste of starting materials on an inactive isomer)", "Disadvantage: separation or a chiral catalyst/extra steps increases cost or time"],
    modelAnswer: "The unwanted enantiomer may do nothing or cause side effects, so a single enantiomer is safer and only half the dose of the racemate may be needed, wasting less material. However, separating the enantiomers or using a chiral catalyst adds steps and cost.",
    hints: ["Think about the patient and about manufacturing."],
    explanation: "Any two valid advantages and one valid disadvantage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Describe in words how the two optical isomers of butan-2-ol differ in structure.",
    points: ["The four different groups (H, OH, CH₃, C₂H₅) are arranged tetrahedrally around C2", "The two arrangements are mirror images that cannot be superimposed"],
    modelAnswer: "In both isomers C2 carries H, OH, CH₃ and C₂H₅ at the corners of a tetrahedron. The two arrangements are mirror images of each other, and no rotation makes one coincide with the other.",
    hints: ["Use the words tetrahedral, mirror image and superimposable."],
    explanation: "Non-superimposable mirror-image tetrahedral arrangements.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "2-hydroxybutanoic acid, CH₃CH₂CH(OH)COOH, can be made in two steps from propanal:\n\n| Step | Reagents and conditions | Product |\n|---|---|---|\n| 1 | HCN with a little KCN as catalyst | 2-hydroxybutanenitrile, CH₃CH₂CH(OH)CN |\n| 2 | dilute HCl, heat under reflux | 2-hydroxybutanoic acid |\n\nHydrogen cyanide is extremely toxic; this reaction is carried out only in a fume cupboard under supervision.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many chiral centres are present in 2-hydroxybutanoic acid?", value: 1, wrong: [2], explanation: "Only C2 (H, OH, C₂H₅, COOH)." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe in words the relationship between the two optical isomers of 2-hydroxybutanoic acid.", points: ["Groups H, OH, C₂H₅ and COOH arranged tetrahedrally around C2", "The two isomers are mirror images that are not superimposable"], modelAnswer: "Each isomer has H, OH, C₂H₅ and COOH arranged tetrahedrally around the chiral carbon; the two are mirror images that cannot be superimposed." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What is the effect of the product of step 2, made by this route, on plane-polarised light?", options: [
        ["It has no effect, because it is a racemic mixture.", "Correct: step 1 gives equal amounts of the two enantiomers."],
        ["It rotates the plane clockwise, because only one enantiomer forms.", "Step 1 does not favour one enantiomer."],
        ["It has no effect, because the molecules are not chiral.", "The molecules are chiral; the mixture is inactive."],
        ["It rotates the plane by an angle that depends only on concentration.", "Rotation by a racemate is zero at any concentration."],
      ], answer: "A", explanation: "Racemic mixture → no net rotation." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why step 1 produces the two enantiomers in equal amounts.", points: ["The carbonyl carbon of propanal is trigonal planar", "CN⁻ attacks from either side of the plane with equal probability"], modelAnswer: "The C=O carbon is planar, so the cyanide ion can attack from above or below with equal likelihood, giving the two enantiomers 50 : 50." }),
      P.tf({ label: "(e)", marks: 1, stem: "The two enantiomers of 2-hydroxybutanoic acid have the same melting point.", answer: true, explanation: "Enantiomers have identical physical properties." }),
      P.manual({ label: "(f)", marks: 1, stem: "Suggest one way in which a manufacturer could obtain only one enantiomer of the acid.", points: ["Use a chiral catalyst or an enzyme, or separate (resolve) the racemic mixture, or start from a single-enantiomer natural material"], modelAnswer: "Carry out the synthesis with a chiral catalyst (or an enzyme) that forms mainly one enantiomer." }),
    ],
    hints: ["Look for four different groups.", "What is the shape of the carbonyl carbon?"],
    explanation: "One chiral centre; route via planar C=O gives a racemate; resolve or use a chiral catalyst for one enantiomer.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "2-aminopropanoic acid (alanine), CH₃CH(NH₂)COOH, is one of the amino acids from which proteins are built. Living organisms use almost exclusively one of its two enantiomers.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many chiral centres does alanine have?", value: 1, wrong: [2], explanation: "C2 carries H, NH₂, CH₃ and COOH." }),
      P.manual({ label: "(b)", marks: 2, stem: "A polarimeter is used to examine solutions of equal concentration of each pure enantiomer and of a racemic sample. Describe the results.", points: ["The two pure enantiomers rotate plane-polarised light by the same angle in opposite directions", "The racemic sample gives no rotation (the rotations cancel)"], modelAnswer: "Each enantiomer rotates the plane of polarised light by the same angle, one clockwise and one anticlockwise; the racemic mixture shows no overall rotation." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Why is glycine, H₂NCH₂COOH, the only common amino acid that is not optically active?", options: [
        ["Its central carbon carries two hydrogen atoms, so it has no chiral centre.", "Correct: four different groups are needed."],
        ["It has no carboxylic acid group attached to its central carbon.", "Glycine does have a COOH group."],
        ["It exists only as a racemic mixture in living organisms.", "Glycine is achiral; there are no enantiomers to mix."],
        ["Its amine group cancels the rotation caused by the acid group.", "Groups do not cancel rotation; chirality is the issue."],
      ], answer: "A", explanation: "No carbon with four different groups." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why enzymes act on only one enantiomer of alanine.", points: ["Enzymes (their active sites) are chiral, built from single-enantiomer amino acids", "Only one enantiomer has the three-dimensional arrangement of groups that fits/binds the active site"], modelAnswer: "An enzyme's active site is itself chiral, so only one arrangement of the four groups around alanine's chiral carbon fits it correctly; the mirror-image form cannot bind in the same way." }),
    ],
    hints: ["Four different groups on one carbon.", "Chiral molecules recognise chiral molecules."],
    explanation: "One chiral centre; equal and opposite rotations, zero for a racemate; glycine achiral; chiral active sites fit one enantiomer.",
  });

  b.card("DEFINITION", "Enantiomers", "Optical isomers: non-superimposable mirror images.");
  b.card("DEFINITION", "Optically active", "Rotates the plane of plane-polarised light; enantiomers rotate it by equal angles in opposite directions.");
  b.card("DEFINITION", "Racemic mixture", "An equimolar mixture of two enantiomers; optically inactive because the rotations cancel.");
  b.card("CONCEPT", "How do enantiomers differ?", "Only in the direction of rotation of plane-polarised light and in interactions with other chiral molecules (enzymes, receptors).");
  b.card("CONCEPT", "Why SN1 gives a racemate", "The carbocation is trigonal planar and is attacked equally from both faces.");
  b.card("CONCEPT", "Why HCN addition to an aldehyde gives a racemate", "The C=O carbon is planar, so CN⁻ attacks either face with equal probability.");
  b.card("FACT", "Stereochemical result of SN2 on a chiral centre", "Inversion of configuration: one enantiomer gives a single enantiomer of the product.");
  b.card("CONCEPT", "Why single-enantiomer drugs?", "The other enantiomer may be inactive or harmful; smaller doses, fewer side effects, less waste.");
  b.card("CONCEPT", "Ways to get one enantiomer", "Resolve the racemate; use a chiral catalyst or enzyme; start from a natural single enantiomer.");
});
