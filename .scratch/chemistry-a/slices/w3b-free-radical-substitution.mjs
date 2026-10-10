// W3b: achem.hydrocarbons.free-radical-substitution (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t } from "../lib.mjs";

concept("achem.hydrocarbons.free-radical-substitution", { file: "hydrocarbons/free-radical-substitution", keyPrefix: "hydrocarbons.free-radical-substitution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What condition is needed for methane to react with chlorine at room temperature?",
    options: [
      ["ultraviolet light", "Correct: UV light splits Cl₂ into radicals."],
      ["a nickel catalyst", "Nickel catalyses hydrogenation of alkenes, not halogenation of alkanes."],
      ["aqueous sodium hydroxide", "Alkanes do not react with aqueous alkali."],
      ["concentrated sulfuric acid", "Alkanes do not react with sulfuric acid."],
    ],
    answer: "A",
    explanation: "Free-radical substitution needs UV light (or sunlight) for initiation.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which equation shows the initiation step when ethane reacts with bromine in ultraviolet light?",
    options: [
      [t`$\ce{Br2 -> 2Br^.}$`, "Correct: homolytic fission of the weakest bond, Br–Br."],
      [t`$\ce{C2H6 -> C2H5^. + H^.}$`, "The C–H bond is much stronger than Br–Br and is not split by the light."],
      [t`$\ce{Br2 -> Br+ + Br-}$`, "That is heterolytic fission, which does not occur here."],
      [t`$\ce{Br^. + C2H6 -> HBr + C2H5^.}$`, "This is a propagation step."],
    ],
    answer: "A",
    explanation: "Initiation makes radicals from a molecule: Br₂ → 2Br•.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which equation is a propagation step in the chlorination of methane?",
    options: [
      [t`$\ce{CH3^. + Cl2 -> CH3Cl + Cl^.}$`, "Correct: a radical reacts with a molecule to give a product and a new radical."],
      [t`$\ce{CH3^. + Cl^. -> CH3Cl}$`, "Two radicals combine: termination."],
      [t`$\ce{Cl2 -> 2Cl^.}$`, "This forms radicals from a molecule: initiation."],
      [t`$\ce{Cl^. + CH4 -> CH3Cl + H^.}$`, "H• is not formed; Cl• removes a hydrogen atom as HCl."],
    ],
    answer: "A",
    explanation: "Propagation: one radical in, one radical out.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "When ethane reacts with bromine in ultraviolet light, a little butane is found among the products. Which equation explains this?",
    options: [
      [t`$\ce{C2H5^. + C2H5^. -> C4H10}$`, "Correct: termination by two ethyl radicals."],
      [t`$\ce{C2H6 + C2H6 -> C4H10 + H2}$`, "Molecules of ethane do not combine directly."],
      [t`$\ce{C2H5^. + C2H6 -> C4H10 + H^.}$`, "Radicals abstract H atoms; they do not add to alkanes forming H•."],
      [t`$\ce{C2H5Br + C2H5^. -> C4H10 + Br^.}$`, "This is not a step of the mechanism."],
    ],
    answer: "A",
    hints: ["Which stage joins two radicals?"],
    explanation: "Two ethyl radicals pair their electrons to form butane.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does using a large excess of methane increase the proportion of chloromethane among the products?",
    options: [
      ["Chlorine radicals are then more likely to collide with CH₄ than with CH₃Cl.", "Correct: further substitution of CH₃Cl becomes less likely."],
      ["Excess methane absorbs the ultraviolet light, slowing the reaction.", "Methane does not absorb the UV that splits Cl₂."],
      ["Methane reacts with dichloromethane to turn it back into chloromethane.", "No such reaction occurs."],
      ["Excess methane stops the termination steps from happening at all.", "Termination still occurs whenever two radicals meet."],
    ],
    answer: "A",
    hints: ["What does a Cl• radical meet most often?"],
    explanation: "With mostly CH₄ present, Cl• attacks CH₄ rather than CH₃Cl, reducing multiple substitution.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about the reaction of methane with chlorine are correct?\n\n1. The Cl–Cl bond breaks in initiation because it is the weakest bond present.\n2. Each propagation step produces a new radical.\n3. The reaction is a chain reaction.",
    options: [
      ["1, 2 and 3", "Correct: every statement is true."],
      ["1 and 2 only", "Statement 3 is also true: propagation regenerates Cl•, so the chain continues."],
      ["2 and 3 only", "Statement 1 is also true: Cl–Cl is weaker than C–H."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Does each propagation step end with a radical?"],
    explanation: "Weakest bond breaks; propagation regenerates radicals; one initiation gives many product molecules.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Ethane reacts with chlorine in ultraviolet light. Which of the statements are correct?\n\n1. 1,1-dichloroethane can be formed.\n2. Butane can be formed.\n3. Chloroethane is the only organic product.",
    options: [
      ["1 and 2 only", "Correct: further substitution and termination give other products."],
      ["1, 2 and 3", "Statement 3 contradicts statements 1 and 2: a mixture forms."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: two ethyl radicals combine."],
    ],
    answer: "A",
    hints: ["Think about further substitution and about termination."],
    explanation: "CH₃CH₂Cl can be substituted again; 2C₂H₅• → C₄H₁₀.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which alkane gives only one monochloro product (one structural isomer) on free-radical substitution?",
    options: [
      ["cyclohexane", "Correct: all twelve hydrogens are equivalent."],
      ["hexane", "Three hydrogen environments (C1, C2, C3), so three products."],
      ["methylcyclohexane", "Several different ring and methyl hydrogens: more than one product."],
      ["2-methylpentane", "Five hydrogen environments, five products."],
    ],
    answer: "A",
    hints: ["Look for complete symmetry."],
    explanation: "Cyclohexane gives only chlorocyclohexane.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "How many structural isomers of C₄H₉Cl can be formed by monochlorination of butane?",
    value: 2,
    wrong: [4],
    explanation: "Butane has two hydrogen environments: CH₃ (1-chlorobutane) and CH₂ (2-chlorobutane).",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "How many structural isomers of C₆H₁₃Cl can be formed by monochlorination of hexane?",
    value: 3,
    wrong: [6],
    hints: ["Hexane is symmetrical about its centre."],
    explanation: "1-, 2- and 3-chlorohexane.",
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    stem: "How many structural isomers can be formed by monochlorination of 2,3-dimethylbutane, (CH₃)₂CHCH(CH₃)₂?",
    value: 2,
    wrong: [4],
    hints: ["Group the hydrogens into environments."],
    explanation: "All four CH₃ groups are equivalent (1-chloro-2,3-dimethylbutane), and the two CH hydrogens are equivalent (2-chloro-2,3-dimethylbutane).",
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    stem: "How many structural isomers can be formed by monochlorination of 2-methylpentane, (CH₃)₂CHCH₂CH₂CH₃?",
    value: 5,
    wrong: [6],
    hints: ["The two CH₃ groups on carbon 2 are equivalent."],
    explanation: "Environments: the two CH₃ on C2; C2–H; C3–H₂; C4–H₂; C5–H₃: five products.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Methane and chlorine react rapidly in the dark at room temperature.",
    answer: false,
    explanation: "False: ultraviolet light is needed to start the reaction.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding the two propagation steps gives the overall equation for the monosubstitution.",
    answer: true,
    explanation: "True: Cl• + CH₄ → HCl + CH₃• and CH₃• + Cl₂ → CH₃Cl + Cl• add to CH₄ + Cl₂ → CH₃Cl + HCl.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each step from the bromination of ethane with its stage.",
    pairs: [
      t`$\ce{Br2 -> 2Br^.}$`,
      t`$\ce{Br^. + C2H6 -> HBr + C2H5^.}$`,
      t`$\ce{C2H5^. + Br2 -> C2H5Br + Br^.}$`,
      t`$\ce{C2H5^. + Br^. -> C2H5Br}$`,
    ],
    right: ["initiation", "propagation", "termination"],
    rightIndex: [0, 1, 1, 2],
    hints: ["Count radicals on each side."],
    explanation: "No radicals → two (initiation); one → one (propagation); two → none (termination).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "In free-radical substitution, ultraviolet light causes {{blank:a}} fission of the halogen molecule. In propagation a radical removes a {{blank:b}} atom from the alkane. Termination occurs when two {{blank:c}} combine.",
    blanks: [
      { id: "a", accepted: ["homolytic"], choices: ["homolytic", "heterolytic"] },
      { id: "b", accepted: ["hydrogen"], choices: ["hydrogen", "carbon", "chlorine"] },
      { id: "c", accepted: ["radicals"], choices: ["radicals", "ions", "molecules"] },
    ],
    explanation: "Homolytic fission; H-atom abstraction; radicals pair up.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Name the organic product formed when two methyl radicals combine.",
    accepted: ["ethane", "C2H6"],
    wrong: ["methane"],
    explanation: "CH₃• + CH₃• → C₂H₆.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe the mechanism of the reaction between ethane and bromine in ultraviolet light to form bromoethane. Name each stage and give equations.",
    points: ["Initiation: Br₂ → 2Br• (homolytic fission by UV light)", "Propagation: Br• + C₂H₆ → HBr + C₂H₅•", "Propagation: C₂H₅• + Br₂ → C₂H₅Br + Br•", "Termination: any two radicals combine, e.g. C₂H₅• + Br• → C₂H₅Br or 2C₂H₅• → C₄H₁₀ or 2Br• → Br₂"],
    modelAnswer: "Initiation: ultraviolet light splits bromine homolytically, Br₂ → 2Br•. Propagation: Br• + CH₃CH₃ → HBr + CH₃CH₂•, then CH₃CH₂• + Br₂ → CH₃CH₂Br + Br•, regenerating Br•. Termination: radicals combine, for example CH₃CH₂• + Br• → CH₃CH₂Br, or 2CH₃CH₂• → C₄H₁₀.",
    hints: ["Three stages; radicals with dots."],
    explanation: "One mark for each correct equation with its stage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the reaction of chlorine with excess propane gives a mixture of organic products even when only monosubstitution occurs.",
    points: ["Propane has two different hydrogen environments (CH₃ and CH₂)", "Cl• can remove either type, giving 1-chloropropane and 2-chloropropane (and termination products such as hexanes)"],
    modelAnswer: "The chlorine radical can remove a hydrogen from a CH₃ group or from the central CH₂ group, so both 1-chloropropane and 2-chloropropane form; termination steps also give products such as hexane isomers.",
    hints: ["Are all the hydrogens equivalent?"],
    explanation: "Different H environments → positional isomers.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why ultraviolet light is needed for the chlorination of methane.",
    points: ["UV provides the energy to break the Cl–Cl bond homolytically", "producing chlorine radicals that start the chain (initiation)"],
    modelAnswer: "The photons of ultraviolet light have enough energy to break the Cl–Cl bond homolytically into two chlorine radicals; without these radicals the chain reaction cannot start.",
    hints: ["What must be formed before propagation can begin?"],
    explanation: "Light → radicals → chain.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "2-methylpropane, (CH₃)₃CH, reacts with chlorine to give a mixture that includes two monochloro isomers of formula C₄H₉Cl.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the condition needed.", accepted: ["ultraviolet light", "UV light", "uv", "sunlight", "ultraviolet radiation", "UV radiation"], wrong: ["heat with nickel"], explanation: "Ultraviolet light (or sunlight)." }),
      P.manual({ label: "(b)", marks: 1, stem: "Write the equation for the initiation step.", points: ["Cl₂ → 2Cl•"], modelAnswer: "Cl₂ → 2Cl•" }),
      P.manual({ label: "(c)", marks: 2, stem: "Write two propagation steps that lead to 2-chloro-2-methylpropane.", points: ["Cl• + (CH₃)₃CH → HCl + (CH₃)₃C•", "(CH₃)₃C• + Cl₂ → (CH₃)₃CCl + Cl•"], modelAnswer: "Cl• + (CH₃)₃CH → HCl + (CH₃)₃C•; (CH₃)₃C• + Cl₂ → (CH₃)₃CCl + Cl•" }),
      P.num({ label: "(d)", marks: 1, stem: "How many hydrogen environments does 2-methylpropane have?", value: 2, wrong: [4], explanation: "Nine equivalent CH₃ hydrogens and one CH hydrogen." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the other monochloro isomer.", accepted: ["1-chloro-2-methylpropane", "1 chloro 2 methylpropane"], wrong: ["1-chlorobutane"], explanation: "(CH₃)₂CHCH₂Cl." }),
      P.mcq({ label: "(f)", marks: 1, stem: "A small amount of C₈H₁₈ is also formed. Which compound is it most likely to include?", options: [
        ["2,2,3,3-tetramethylbutane", "Correct: two (CH₃)₃C• radicals combine."],
        ["octane", "Joining radicals from 2-methylpropane cannot give an unbranched chain."],
        ["2-methylheptane", "This would need a seven-carbon chain, not available from C₄ radicals."],
        ["3-ethylhexane", "Not formed from two C₄ branched radicals."],
      ], answer: "A", explanation: "(CH₃)₃C–C(CH₃)₃ from termination." }),
      P.tf({ label: "(g)", marks: 1, stem: "The formation of C₈H₁₈ is evidence for a radical mechanism.", answer: true, explanation: "True: it can only come from two radicals combining." }),
    ],
    hints: ["Which H does the radical remove to give a tertiary product?"],
    explanation: "UV; Cl₂ → 2Cl•; abstraction of the tertiary H then Cl transfer; two environments; termination gives 2,2,3,3-tetramethylbutane.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A few drops of bromine are added to cyclohexane, C₆H₁₂, in two test tubes. Tube 1 is wrapped in foil; tube 2 is left in bright sunlight. After 20 minutes the orange colour has faded only in tube 2, and misty fumes are seen at its mouth. The reaction is carried out in a fume cupboard.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What type of reaction takes place in tube 2?", options: [
        ["free-radical substitution", "Correct: UV in sunlight; an H is replaced by Br."],
        ["electrophilic addition", "Cyclohexane has no C=C bond."],
        ["nucleophilic substitution", "There is no nucleophile or polar C–X bond in the reactant."],
        ["elimination", "No double bond forms in the organic product."],
      ], answer: "A", explanation: "C₆H₁₂ + Br₂ → C₆H₁₁Br + HBr in light." }),
      P.num({ label: "(b)", marks: 1, stem: "How many monobromo structural isomers can form?", value: 1, wrong: [6], explanation: "All hydrogens of cyclohexane are equivalent: only bromocyclohexane." }),
      P.manual({ label: "(c)", marks: 2, stem: "Write the two propagation steps.", points: ["Br• + C₆H₁₂ → HBr + C₆H₁₁•", "C₆H₁₁• + Br₂ → C₆H₁₁Br + Br•"], modelAnswer: "Br• + C₆H₁₂ → HBr + C₆H₁₁•; C₆H₁₁• + Br₂ → C₆H₁₁Br + Br•" }),
      P.manual({ label: "(d)", marks: 1, stem: "Identify the misty fumes and explain why the colour faded only in tube 2.", points: ["Hydrogen bromide; light is needed to split Br₂ into radicals, so no reaction occurs in the dark tube"], modelAnswer: "The fumes are HBr. Only in the light is Br₂ split into radicals, so only tube 2 reacts and uses up the orange bromine." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the C₁₂H₂₂ hydrocarbon formed when two cyclohexyl radicals combine.", accepted: ["bicyclohexyl", "cyclohexylcyclohexane", "1,1'-bicyclohexyl", "dicyclohexyl"], wrong: ["dodecane"], explanation: "C₆H₁₁–C₆H₁₁, cyclohexylcyclohexane (bicyclohexyl)." }),
    ],
    hints: ["Compare the light and dark tubes."],
    explanation: "Light-dependent free-radical substitution; one product isomer; HBr fumes; bicyclohexyl from termination.",
  });

  b.card("DEFINITION", "Free-radical substitution", "Replacement of an H atom in an alkane by a halogen atom via a radical chain mechanism (UV light).");
  b.card("FORMULA", "Initiation (chlorination)", "Cl₂ → 2Cl• (homolytic fission in UV light)");
  b.card("FORMULA", "Propagation steps for methane", "Cl• + CH₄ → HCl + CH₃•; CH₃• + Cl₂ → CH₃Cl + Cl•");
  b.card("FORMULA", "Termination examples", "2Cl• → Cl₂; CH₃• + Cl• → CH₃Cl; 2CH₃• → C₂H₆");
  b.card("CONCEPT", "Why a mixture forms", "Further substitution of the product, termination products (e.g. ethane, butane), and different H environments.");
  b.card("CONCEPT", "How to favour monosubstitution", "Use a large excess of the alkane, so radicals meet alkane rather than product.");
  b.card("CONCEPT", "Identifying the stage from an equation", "0 → 2 radicals: initiation; 1 → 1: propagation; 2 → 0: termination.");
  b.card("CONCEPT", "Counting monosubstituted isomers", "Count the different hydrogen environments in the alkane.");
  b.card("FACT", "Evidence for a radical mechanism with ethane", "Butane is formed: 2C₂H₅• → C₄H₁₀.");
});
