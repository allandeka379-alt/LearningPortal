// W3b: achem.halogen.sn1-sn2 (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, orderFrom, rateConstant, rateFrom, sciStr, sfStr } from "../lib.mjs";

concept("achem.halogen.sn1-sn2", { file: "halogen/sn1-sn2", keyPrefix: "halogen.sn1-sn2" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the rate equation for the SN2 hydrolysis of a halogenoalkane RX by hydroxide ions?",
    options: [
      ["rate = k[RX][OH⁻]", "Correct: both species are in the single, rate-determining step."],
      ["rate = k[RX]", "This is the SN1 rate equation."],
      ["rate = k[OH⁻]", "The halogenoalkane must be in the rate-determining step."],
      ["rate = k[RX]²", "Only one RX takes part in the step."],
    ],
    answer: "A",
    explanation: "SN2 is bimolecular: second order overall.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which halogenoalkane is hydrolysed mainly by an SN1 mechanism?",
    options: [
      [t`$\ce{(CH3)3CCl}$`, "Correct: tertiary, forming a stable tertiary carbocation."],
      [t`$\ce{CH3CH2CH2Cl}$`, "Primary halogenoalkanes react mainly by SN2."],
      [t`$\ce{CH3Cl}$`, "Halogenomethanes react by SN2: a methyl cation is very unstable."],
      [t`$\ce{(CH3)2CHCH2Cl}$`, "Despite the branch, the C–Cl carbon is primary."],
    ],
    answer: "A",
    explanation: "2-chloro-2-methylpropane is tertiary.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the SN2 mechanism, from which direction does the nucleophile approach the carbon atom?",
    options: [
      ["from the side opposite the halogen atom", "Correct: backside attack, least repulsion from the halogen."],
      ["from the same side as the halogen atom", "The halogen's electron density repels the nucleophile."],
      ["from above or below a planar carbocation", "That describes the second step of SN1."],
      ["along the line of a neighbouring C–H bond", "Attack is at the δ+ carbon opposite the leaving group."],
    ],
    answer: "A",
    explanation: "Backside attack leads to inversion of configuration.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement describes the transition state in the SN2 hydrolysis of bromoethane?",
    options: [
      ["Carbon is partly bonded to both O and Br, and the structure carries an overall negative charge.", "Correct: bonds partly formed and partly broken."],
      ["Carbon is fully bonded to both O and Br, and the structure is a stable intermediate.", "It is not stable and cannot be isolated; the bonds are partial."],
      ["The carbon carries a positive charge and is bonded only to three groups.", "That is the SN1 carbocation."],
      ["The bromine atom has left as a radical and OH has not yet bonded.", "No radicals form in SN2."],
    ],
    answer: "A",
    hints: ["Bonds are breaking and forming at the same time."],
    explanation: "[HO···CH₂(CH₃)···Br]⁻ with partial bonds.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do tertiary halogenoalkanes not react by the SN2 mechanism?",
    options: [
      ["The three alkyl groups hinder backside attack and stabilise the carbocation needed for SN1.", "Correct: steric hindrance plus carbocation stability."],
      ["Tertiary halogenoalkanes have no δ+ carbon atom for the nucleophile to attack.", "The C–X carbon is still δ+."],
      ["The C–X bond in tertiary halogenoalkanes is too strong to break in one step.", "Bond strength depends mainly on the halogen, not on the class."],
      ["Hydroxide ions cannot act as nucleophiles towards tertiary compounds.", "OH⁻ still attacks, but only the carbocation, in SN1."],
    ],
    answer: "A",
    hints: ["Think of crowding and charge stability."],
    explanation: "Steric hindrance and inductive stabilisation favour SN1.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "2-bromo-2-methylbutane is hydrolysed by aqueous hydroxide. What is the effect on the initial rate of doubling [OH⁻] while keeping [halogenoalkane] constant?",
    options: [
      ["no change", "Correct: tertiary, SN1, zero order in OH⁻."],
      ["the rate doubles", "That would be true for an SN2 (first-order in OH⁻) reaction."],
      ["the rate quadruples", "That would need second order in OH⁻."],
      ["the rate halves", "Adding a reactant never halves the rate here."],
    ],
    answer: "A",
    hints: ["Is OH⁻ in the slow step?"],
    explanation: "Rate = k[RBr]; OH⁻ reacts after the slow step.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about the SN1 mechanism are correct?\n\n1. It involves a carbocation intermediate.\n2. The rate does not depend on [OH⁻].\n3. It always gives inversion of configuration at a chiral centre.",
    options: [
      ["1 and 2 only", "Correct: SN1 gives racemisation, not inversion."],
      ["1, 2 and 3", "Statement 3 describes SN2."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["What shape is the carbocation?"],
    explanation: "Planar carbocation → attack on both faces → racemic mixture.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the statements about the SN2 reaction of 1-iodopropane with hydroxide ions are correct?\n\n1. The reaction is second order overall.\n2. It occurs in one step.\n3. The transition state carries a negative charge.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: the −1 charge of OH⁻ is spread over O and I."],
      ["2 and 3 only", "Statement 1 is also true: first order in each reactant."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Where is the charge of OH⁻ in the transition state?"],
    explanation: "rate = k[C₃H₇I][OH⁻]; one step; [HO···C···I]⁻.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A single enantiomer of 2-bromobutane is hydrolysed under conditions where only SN2 occurs. Which description of the product is correct?",
    options: [
      ["one enantiomer of butan-2-ol, with inverted configuration", "Correct: backside attack inverts the chiral centre."],
      ["a racemic mixture of the two enantiomers of butan-2-ol", "Racemisation needs a planar carbocation (SN1)."],
      ["butan-2-ol in a form that has no chiral centre", "C2 of butan-2-ol is still chiral."],
      ["but-2-ene, because SN2 always gives elimination", "SN2 is a substitution mechanism."],
    ],
    answer: "A",
    hints: ["What happens to the other three groups in SN2?"],
    explanation: "The umbrella flip gives a single, optically active product.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "What is the order of reaction with respect to hydroxide ions for the hydrolysis of 2-bromo-2-methylpropane?",
    value: 0,
    wrong: [1],
    hints: ["SN1 or SN2?"],
    explanation: "SN1: rate = k[(CH₃)₃CBr], zero order in OH⁻.",
  });
  {
    const k = rateConstant(3.6e-6, [[0.05, 1], [0.12, 1]]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "1-bromobutane reacts with hydroxide ions by SN2. When [C₄H₉Br] = 0.050 mol dm⁻³ and [OH⁻] = 0.12 mol dm⁻³, the initial rate is 3.6 × 10⁻⁶ mol dm⁻³ s⁻¹. Calculate the rate constant, in dm³ mol⁻¹ s⁻¹.",
      value: k, sf: 2, unit: "dm³/mol/s",
      wrong: [rateConstant(3.6e-6, [[0.05, 1]])],
      hints: ["Rate = k[RBr][OH⁻]."],
      explanation: `1. k = rate ÷ ([RBr][OH⁻]) = 3.6 × 10⁻⁶ ÷ (0.050 × 0.12).\n2. k = ${sciStr(k, 2)} dm³ mol⁻¹ s⁻¹.\n3. Dividing by [RBr] only (as for SN1) gives ${sciStr(rateConstant(3.6e-6, [[0.05, 1]]), 2)}, with the wrong units.`,
    });
  }
  {
    const k = rateConstant(4.2e-5, [[0.06, 1]]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "2-chloro-2-methylpropane is hydrolysed by SN1. When [C₄H₉Cl] = 0.060 mol dm⁻³ and [OH⁻] = 0.20 mol dm⁻³, the initial rate is 4.2 × 10⁻⁵ mol dm⁻³ s⁻¹. Calculate the rate constant, in s⁻¹.",
      value: k, sf: 2, unit: "s⁻¹",
      wrong: [rateConstant(4.2e-5, [[0.06, 1], [0.2, 1]])],
      hints: ["Which concentrations appear in the SN1 rate equation?"],
      explanation: `1. Rate = k[RCl], so k = 4.2 × 10⁻⁵ ÷ 0.060.\n2. k = ${sciStr(k, 2)} s⁻¹.\n3. Including [OH⁻] gives ${sciStr(rateConstant(4.2e-5, [[0.06, 1], [0.2, 1]]), 2)}, which treats the reaction as SN2.`,
    });
  }
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "For an SN2 hydrolysis, both [RBr] and [OH⁻] are doubled at the same time. By what factor does the initial rate increase?",
    value: 4,
    wrong: [2],
    hints: ["First order in each reactant."],
    explanation: "2 × 2 = 4.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an SN2 reaction at a chiral centre, the configuration of the carbon atom is inverted.",
    answer: true,
    explanation: "True: backside attack flips the other three groups (umbrella inversion).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Secondary halogenoalkanes react only by the SN1 mechanism.",
    answer: false,
    explanation: "False: secondary halogenoalkanes react by a mixture of SN1 and SN2.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each feature with the mechanism it describes.",
    pairs: [
      "one step with a transition state",
      "a carbocation intermediate",
      "rate = k[RX]",
      "inversion of configuration",
      "typical of 1-bromobutane",
      "racemisation at a chiral centre",
    ],
    right: ["SN1", "SN2"],
    rightIndex: [1, 0, 0, 1, 1, 0],
    hints: ["Unimolecular or bimolecular slow step?"],
    explanation: "SN2: one step, inversion, primary. SN1: carbocation, rate = k[RX], racemisation, tertiary.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Primary halogenoalkanes react mainly by {{blank:a}}. Tertiary halogenoalkanes react mainly by {{blank:b}} because the {{blank:c}} carbocation is stabilised by three alkyl groups and the alkyl groups cause {{blank:d}} hindrance.",
    blanks: [
      { id: "a", accepted: ["SN2"], choices: ["SN1", "SN2"] },
      { id: "b", accepted: ["SN1"], choices: ["SN1", "SN2"] },
      { id: "c", accepted: ["tertiary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "d", accepted: ["steric"], choices: ["steric", "inductive", "hydrogen-bond"] },
    ],
    explanation: "SN2 primary; SN1 tertiary (carbocation stability, steric hindrance).",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 5,
    stem: "Describe the SN2 mechanism for the reaction of 1-chloropropane with hydroxide ions.",
    points: ["C–Cl bond polar: C δ+, Cl δ−", "OH⁻ attacks the δ+ carbon from the side opposite Cl: arrow from an O lone pair to the carbon", "Arrow from the C–Cl bond to Cl", "Transition state with partial C···O and C···Cl bonds and overall negative charge", "Cl⁻ leaves and propan-1-ol forms (with inversion of the other three groups)"],
    modelAnswer: "Chlorine is more electronegative, so the carbon of C–Cl is δ+. The hydroxide ion attacks this carbon from the side opposite the chlorine: one curly arrow goes from a lone pair on O to the carbon, and another from the C–Cl bond to Cl. A transition state forms, [HO···CH₂(C₂H₅)···Cl]⁻, with partial bonds to both O and Cl. The C–Cl bond then breaks, Cl⁻ leaves, and propan-1-ol forms; the three other groups on carbon are inverted.",
    hints: ["Partial charges, two arrows, transition state, products."],
    explanation: "One mark per stage.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe the SN1 mechanism for the hydrolysis of 2-bromo-2-methylbutane, (CH₃)₂CBrCH₂CH₃, by aqueous hydroxide ions.",
    points: ["Slow step: heterolytic fission of C–Br (arrow from the C–Br bond to Br), giving Br⁻ and the tertiary carbocation (CH₃)₂C⁺CH₂CH₃", "Fast step: arrow from a lone pair on OH⁻ to the positive carbon", "Product 2-methylbutan-2-ol, (CH₃)₂C(OH)CH₂CH₃"],
    modelAnswer: "In the slow step the C–Br bond breaks heterolytically, the bromine taking both electrons, to give Br⁻ and the tertiary carbocation (CH₃)₂C⁺CH₂CH₃. In the fast step a lone pair on a hydroxide ion bonds to the positive carbon, giving 2-methylbutan-2-ol.",
    hints: ["Ionisation first."],
    explanation: "Two-step SN1.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why 2-bromo-2-methylpropane reacts by SN1, whereas 1-bromobutane reacts by SN2.",
    points: ["The tertiary carbocation from 2-bromo-2-methylpropane is stabilised by three electron-donating alkyl groups (inductive effect), so ionisation is possible", "The three methyl groups crowd the back of the carbon (steric hindrance), blocking SN2 attack", "1-bromobutane would give an unstable primary carbocation, and its CH₂Br carbon is open to backside attack, so it reacts by SN2"],
    modelAnswer: "Three methyl groups push electron density towards a tertiary carbocation and disperse its charge, so 2-bromo-2-methylpropane can ionise; they also block the approach of a nucleophile to the back of the carbon. 1-bromobutane would form an unstable primary carbocation, but its carbon is unhindered, so the one-step SN2 route is faster.",
    hints: ["Inductive effect and steric hindrance."],
    explanation: "Two factors decide the mechanism.",
  });
  {
    const kA = 5.0e-3, kB = 1.2e-4;
    const ex = [[0.03, 0.08], [0.06, 0.08], [0.03, 0.16]];
    const rA = ex.map(([a, c]) => rateFrom(kA, [[a, 1], [c, 1]]));
    const rB = ex.map(([a]) => rateFrom(kB, [[a, 1]]));
    const oA = orderFrom(rA[0], rA[2], 0.08, 0.16);
    const oB = orderFrom(rB[0], rB[2], 0.08, 0.16);
    const kAc = rateConstant(rA[0], [[0.03, 1], [0.08, oA]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Two isomers of C₄H₉Br, A and B, were each hydrolysed by aqueous OH⁻ at 25 °C. Initial rates:

| Exp. | [C₄H₉Br] / mol dm⁻³ | [OH⁻] / mol dm⁻³ | rate with A / mol dm⁻³ s⁻¹ | rate with B / mol dm⁻³ s⁻¹ |
|---|---|---|---|---|
${ex.map(([a, c], i) => `| ${i + 1} | ${sfStr(a, 2)} | ${sfStr(c, 2)} | ${sciStr(rA[i], 2)} | ${sciStr(rB[i], 2)} |`).join("\n")}`,
      parts: [
        P.group({ label: "(a)", stem: "Deduce the order with respect to OH⁻ for:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "isomer A;", value: oA, wrong: [0], explanation: "Exp. 1 and 3: [OH⁻] doubles, rate doubles: first order." }),
          P.num({ label: "(ii)", marks: 1, stem: "isomer B.", value: oB, wrong: [1], explanation: "Exp. 1 and 3: rate unchanged: zero order." }),
        ] }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which isomer reacts by SN1?", options: [
          ["isomer B", "Correct: its rate is independent of [OH⁻]."],
          ["isomer A", "The rate of A depends on [OH⁻], so OH⁻ is in its slow step (SN2)."],
          ["both isomers", "Only B shows zero order in OH⁻."],
          ["neither isomer", "The data for B fit rate = k[RBr]."],
        ], answer: "A", explanation: "B: rate = k[RBr]." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the rate constant for A, in dm³ mol⁻¹ s⁻¹.", value: kAc, sf: 2, unit: "dm³/mol/s", wrong: [rateConstant(rA[0], [[0.03, 1]])], explanation: `k = ${sciStr(rA[0], 2)} ÷ (0.030 × 0.080) = ${sciStr(kAc, 2)} dm³ mol⁻¹ s⁻¹.` }),
        P.short({ label: "(d)", marks: 1, stem: "Suggest the name of isomer B.", accepted: ["2-bromo-2-methylpropane", "2 bromo 2 methylpropane", "tert-butyl bromide"], wrong: ["1-bromobutane"], explanation: "The only tertiary C₄H₉Br." }),
        P.manual({ label: "(e)", marks: 2, stem: "Suggest an identity for A and explain your choice.", points: ["1-bromobutane (or 1-bromo-2-methylpropane), a primary halogenoalkane", "Primary halogenoalkanes react by SN2 (both RBr and OH⁻ in the one step), matching first order in OH⁻"], modelAnswer: "A is a primary bromoalkane such as 1-bromobutane: primary halogenoalkanes react by SN2, in which OH⁻ is in the single rate-determining step, so the rate is first order in OH⁻." }),
      ],
      hints: ["Compare experiments 1 and 3 for each isomer."],
      explanation: `A: rate = k[RBr][OH⁻], k = ${sciStr(kAc, 2)} dm³ mol⁻¹ s⁻¹ (SN2, primary). B: rate = k[RBr] (SN1, tertiary).`,
    });
  }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Two optically active halogenoalkanes are hydrolysed separately: P is a single enantiomer of 2-iodobutane (reacts by SN2 under the conditions used); Q is a single enantiomer of 3-chloro-3-methylhexane (reacts by SN1).",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What is the product from P?", options: [
        ["a single enantiomer of butan-2-ol, optically active", "Correct: inversion gives one enantiomer."],
        ["a racemic mixture of the two enantiomers of butan-2-ol", "Racemisation needs SN1."],
        ["butan-1-ol, formed by attack on the end carbon", "The OH replaces I on the same carbon."],
        ["but-1-ene, formed by elimination of HI", "Substitution, not elimination, occurs here."],
      ], answer: "A", explanation: "SN2 inverts configuration." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the product from Q is optically inactive.", points: ["SN1 forms a trigonal planar carbocation intermediate", "OH⁻ attacks equally from both faces, giving a racemic mixture (rotations cancel)"], modelAnswer: "Q ionises to a planar tertiary carbocation; hydroxide attacks from either side with equal probability, giving equal amounts of the two enantiomers of 3-methylhexan-3-ol, so the product is a racemate." }),
      P.tf({ label: "(c)", marks: 1, stem: "Q is a tertiary halogenoalkane.", answer: true, explanation: "C3 carries CH₃, C₂H₅ and C₃H₇." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how the rate of hydrolysis of P would change if [OH⁻] were tripled, and explain.", points: ["The rate triples", "OH⁻ is in the single rate-determining step (first order in OH⁻)"], modelAnswer: "The rate would triple, because in SN2 the hydroxide ion is involved in the rate-determining step and the reaction is first order in OH⁻." }),
    ],
    hints: ["Inversion versus racemisation."],
    explanation: "P: SN2 → single inverted enantiomer; Q: SN1 → racemic mixture.",
  });

  b.card("DEFINITION", "SN2", "One-step nucleophilic substitution: Nu attacks from the back as X leaves; rate = k[RX][Nu]; inversion.");
  b.card("DEFINITION", "SN1", "Two steps: slow ionisation to a carbocation, then fast attack by Nu; rate = k[RX]; racemisation.");
  b.card("CONCEPT", "Which halogenoalkanes use which mechanism?", "Primary: SN2. Tertiary: SN1. Secondary: both.");
  b.card("CONCEPT", "Why tertiary → SN1", "Tertiary carbocation stabilised by three alkyl groups (inductive effect); bulky groups block backside attack (steric hindrance).");
  b.card("DEFINITION", "Transition state", "Highest-energy arrangement with partial bonds; cannot be isolated (unlike an intermediate).");
  b.card("CONCEPT", "SN2 transition state for OH⁻ + RBr", "[HO···C···Br]⁻: partial C–O and C–Br bonds, three other groups in a plane, overall −1 charge.");
  b.card("CONCEPT", "Using rate data to decide the mechanism", "Rate depends on [OH⁻] → SN2; independent of [OH⁻] → SN1.");
  b.card("CONCEPT", "Substitution or elimination?", "Aqueous OH⁻ favours substitution (alcohol); ethanolic OH⁻, hot, favours elimination (alkene).");
  b.card("FACT", "Stereochemistry at a chiral centre", "SN2: inversion (single enantiomer). SN1: racemic mixture.");
});
