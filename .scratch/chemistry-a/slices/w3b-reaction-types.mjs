// W3b: achem.organic.reaction-types (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t } from "../lib.mjs";

concept("achem.organic.reaction-types", { file: "organic/reaction-types", keyPrefix: "organic.reaction-types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What happens in homolytic fission of a covalent bond?",
    options: [
      ["Each atom keeps one electron of the bonding pair, forming two radicals.", "Correct: the pair is split evenly, so two free radicals form."],
      ["One atom keeps both electrons of the bonding pair, forming two ions.", "That is heterolytic fission."],
      ["A lone pair is donated to an electron-deficient atom to form a bond.", "That describes nucleophilic attack, which makes a bond rather than breaking one."],
      ["Both atoms lose their bonding electrons, forming two positive ions.", "Electrons are not lost from the system when a bond breaks."],
    ],
    answer: "A",
    explanation: "Homolytic: one electron to each atom, e.g. Cl₂ → 2Cl•.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which species can act as a nucleophile?",
    options: [
      [t`$\ce{NH3}$`, "Correct: the lone pair on nitrogen can be donated to a δ+ carbon."],
      [t`$\ce{NO2+}$`, "The nitronium ion accepts electron pairs: an electrophile."],
      [t`$\ce{H+}$`, "H⁺ has no electrons to donate; it is an electrophile."],
      [t`$\ce{CH4}$`, "Methane has no lone pair and no polar bond to donate from."],
    ],
    answer: "A",
    explanation: "A nucleophile is an electron-pair donor: NH₃ has a lone pair on N.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which species is an electrophile?",
    options: [
      [t`$\ce{(CH3)2CH+}$`, "Correct: the positive carbon has only six outer electrons and accepts an electron pair."],
      [t`$\ce{CN-}$`, "The cyanide ion donates a lone pair: a nucleophile."],
      [t`$\ce{H2O}$`, "Water has lone pairs on oxygen and acts as a nucleophile."],
      [t`$\ce{Br-}$`, "Bromide ions have lone pairs and a negative charge: nucleophiles."],
    ],
    answer: "A",
    explanation: "Carbocations are electron-deficient and accept electron pairs, so they are electrophiles.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`Bromoethane is heated with sodium hydroxide dissolved in ethanol: $\ce{CH3CH2Br + OH- -> CH2=CH2 + H2O + Br-}$. What type of reaction is this?`,
    options: [
      ["elimination", "Correct: HBr is removed from one molecule and a C=C bond forms."],
      ["substitution", "In substitution the OH would replace Br to give ethanol; here an alkene forms."],
      ["addition", "Addition joins two molecules into one; here one molecule loses atoms."],
      ["hydrolysis", "Hydrolysis would break a bond using water to give ethanol."],
    ],
    answer: "A",
    explanation: "Loss of H and Br from adjacent carbons to form C=C is elimination.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: t`In the reaction of cyanide ions with bromoethane, $\ce{CH3CH2Br + CN- -> CH3CH2CN + Br-}$, where does the curly arrow that forms the new bond start and end?`,
    options: [
      ["from the lone pair on the carbon of the cyanide ion to the δ+ carbon of the C–Br bond", "Correct: the nucleophile's lone pair moves to the electron-deficient carbon."],
      ["from the δ+ carbon of the C–Br bond to the lone pair on the carbon of the cyanide ion", "Arrows show electrons moving from an electron-rich site, so this is backwards."],
      ["from the C–Br bond to the bromine atom, which leaves as a bromide ion", "This arrow breaks the old bond; it does not form the new C–C bond."],
      ["from the lone pair on the nitrogen of the cyanide ion to the bromine atom", "The nucleophile bonds through carbon, and it attacks carbon, not bromine."],
    ],
    answer: "A",
    hints: ["Arrows start where the electrons are."],
    explanation: "Arrow 1: lone pair on C of :CN⁻ → δ+ carbon. Arrow 2: C–Br bond → Br.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about heterolytic fission are correct?\n\n1. Both electrons of the bond go to one atom.\n2. It is favoured by polar bonds.\n3. It produces free radicals.",
    options: [
      ["1 and 2 only", "Correct: the more electronegative atom usually takes the pair; ions, not radicals, form."],
      ["1, 2 and 3", "Statement 3 describes homolytic fission."],
      ["2 and 3 only", "Statement 3 is wrong and statement 1 is right."],
      ["1 only", "Statement 2 is also correct: polar bonds break heterolytically."],
    ],
    answer: "A",
    hints: ["What do you get when one atom keeps both electrons?"],
    explanation: "Heterolytic fission gives a cation and an anion; it is favoured by polar bonds and polar solvents.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about carbocations are correct?\n\n1. Alkyl groups donate electron density towards the positive carbon.\n2. (CH₃)₃C⁺ is more stable than CH₃CH₂⁺.\n3. A carbocation is a nucleophile.",
    options: [
      ["1 and 2 only", "Correct: the positive inductive effect of three methyl groups disperses the charge most."],
      ["1, 2 and 3", "A carbocation accepts electron pairs, so it is an electrophile, not a nucleophile."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: tertiary is more stable than primary."],
    ],
    answer: "A",
    hints: ["Does a positive ion donate or accept electron pairs?"],
    explanation: "Alkyl groups are electron-donating; tertiary > secondary > primary; carbocations are electrophiles.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`Methyl ethanoate is heated with dilute acid: $\ce{CH3COOCH3 + H2O <=> CH3COOH + CH3OH}$. What type of reaction is this?`,
    options: [
      ["hydrolysis", "Correct: water breaks the ester bond into an acid and an alcohol."],
      ["hydration", "Hydration adds water across a C=C bond; there is no C=C here."],
      ["condensation", "The reverse reaction (acid + alcohol → ester + water) is condensation."],
      ["reduction", "No hydrogen is added to the carbon skeleton; the acid is not reduced."],
    ],
    answer: "A",
    explanation: "Splitting a molecule with water is hydrolysis.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Ethanol is oxidised to ethanoic acid: CH₃CH₂OH + n[O] → CH₃COOH + H₂O. What is the value of n?",
    value: 2,
    wrong: [1],
    explanation: "One [O] removes 2H as H₂O and one [O] enters the product: CH₃CH₂OH + 2[O] → CH₃COOH + H₂O.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Butanal is reduced to butan-1-ol: CH₃CH₂CH₂CHO + n[H] → CH₃CH₂CH₂CH₂OH. What is the value of n?",
    value: 2,
    wrong: [4],
    explanation: "C₄H₈O → C₄H₁₀O: two hydrogen atoms are added, so 2[H].",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A free radical must carry an electrical charge.",
    answer: false,
    explanation: "False. A radical has an unpaired electron; Cl• and CH₃• are neutral.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A water molecule can act as a nucleophile.",
    answer: true,
    explanation: "True: each oxygen lone pair can be donated to an electron-deficient carbon (e.g. in hydrolysis).",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each reaction to its type.",
    pairs: [
      [t`$\ce{CH3CH=CH2 + H2 -> CH3CH2CH3}$`, "addition"],
      [t`$\ce{CH3CH2CH2Cl + OH- -> CH3CH2CH2OH + Cl-}$`, "substitution"],
      [t`$\ce{CH3CH(OH)CH3 -> CH3CH=CH2 + H2O}$`, "elimination"],
      [t`$\ce{CH3COOH + CH3CH2OH -> CH3COOCH2CH3 + H2O}$`, "condensation"],
      [t`$\ce{CH3CH(OH)CH3 + [O] -> CH3COCH3 + H2O}$`, "oxidation"],
    ],
    hints: ["Look at what is gained or lost by the organic molecule."],
    explanation: "Hydrogenation adds H₂ (addition); OH replaces Cl (substitution); loss of water forming C=C (elimination, dehydration); two molecules join losing water (condensation); loss of 2H with [O] (oxidation).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about curly arrows.",
    template: "A full curly arrow shows the movement of {{blank:a}}. It starts at a lone pair or a {{blank:b}} and ends at the atom that receives the electrons. A half-headed (fish-hook) arrow shows the movement of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["a pair of electrons"], choices: ["a pair of electrons", "one electron", "a proton", "an atom"] },
      { id: "b", accepted: ["bond"], choices: ["bond", "nucleus", "positive charge"] },
      { id: "c", accepted: ["one electron"], choices: ["a pair of electrons", "one electron", "a proton", "an atom"] },
    ],
    explanation: "Full arrows: electron pairs (heterolytic chemistry); fish-hooks: single electrons (radical chemistry).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: t`When the C–Br bond in $\ce{(CH3)3CBr}$ breaks to give $\ce{(CH3)3C+}$ and $\ce{Br-}$, what type of bond fission occurs?`,
    accepted: ["heterolytic", "heterolytic fission", "heterolysis"],
    wrong: ["homolytic"],
    explanation: "Bromine takes both electrons: heterolytic fission, forming ions.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to a species, such as CH₃•, that has an unpaired electron?",
    accepted: ["free radical", "radical", "a free radical", "a radical", "methyl radical"],
    wrong: ["carbocation"],
    explanation: "A species with an unpaired electron is a free radical.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: t`Explain why the tertiary carbocation $\ce{(CH3)3C+}$ is more stable than the primary carbocation $\ce{CH3CH2+}$.`,
    points: ["Alkyl (methyl) groups are electron-donating (positive inductive effect)", "The tertiary ion has three alkyl groups on the positive carbon; the primary ion has one", "So the positive charge is dispersed (spread) more in the tertiary ion, making it more stable"],
    modelAnswer: "Alkyl groups push electron density along the σ bonds towards the positive carbon. The tertiary carbocation has three methyl groups doing this, the primary only one ethyl group, so in the tertiary ion the positive charge is spread over more atoms; a more dispersed charge means a more stable ion.",
    hints: ["What do alkyl groups do to electron density?"],
    explanation: "Inductive effect → charge dispersal → stability.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: t`Describe, in words, the curly arrows and partial charges for the reaction $\ce{CH3CH2CH2Br + OH- -> CH3CH2CH2OH + Br-}$ (one step).`,
    points: ["C–Br bond polar: C δ+, Br δ− (Br more electronegative)", "Arrow from a lone pair on the O of OH⁻ to the δ+ carbon", "Arrow from the C–Br bond to the Br atom", "Products: C–O bond formed and Br⁻ released (nucleophilic substitution)"],
    modelAnswer: "Bromine is more electronegative than carbon, so the carbon is δ+ and bromine δ−. A curly arrow goes from a lone pair on the oxygen of the hydroxide ion to the δ+ carbon, forming the C–O bond. At the same time a second arrow goes from the C–Br bond to the bromine atom, which leaves as Br⁻. Propan-1-ol forms; the reaction is nucleophilic substitution.",
    hints: ["Two arrows: one forms a bond, one breaks a bond."],
    explanation: "One mark per partial charge statement, each arrow and the products.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 2,
    stem: "Bromine molecules have no permanent dipole, yet bromine acts as an electrophile towards alkenes. Explain why.",
    points: ["The high electron density of the C=C π bond repels the electrons in the Br–Br bond, inducing a dipole (Brδ+–Brδ−)", "The δ+ bromine atom can then accept a pair of electrons from the π bond"],
    modelAnswer: "As a bromine molecule approaches the electron-rich π bond, the π electrons repel the Br–Br bonding electrons, polarising the molecule so that the nearer bromine becomes δ+. This δ+ atom accepts an electron pair from the π bond, so bromine behaves as an electrophile.",
    hints: ["Think about an induced dipole."],
    explanation: "Induced dipole → electrophilic δ+ bromine.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "A reaction sequence starting from ethene:\n\n| Step | Reactant | Reagent and conditions | Product |\n|---|---|---|---|\n| 1 | ethene | HBr(g), room temperature | bromoethane |\n| 2 | bromoethane | NaOH(aq), heat under reflux | ethanol |\n| 3 | ethanol | acidified K₂Cr₂O₇, heat, distil product out | ethanal |\n| 4 | ethanal | acidified K₂Cr₂O₇, heat under reflux | ethanoic acid |",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What type of reaction is step 1?", options: [
        ["electrophilic addition", "Correct: H–Br adds across the C=C; H^δ+ is the electrophile."],
        ["nucleophilic addition", "Nucleophilic addition is typical of C=O groups, not C=C."],
        ["free-radical substitution", "There is no ultraviolet light and no H is replaced."],
        ["electrophilic substitution", "Nothing is substituted; two molecules join into one."],
      ], answer: "A", explanation: "Alkenes undergo electrophilic addition." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the full name of the type of reaction (mechanism) in step 2.", accepted: ["nucleophilic substitution", "SN2", "SN2 nucleophilic substitution"], wrong: ["substitution only"], explanation: "OH⁻ (nucleophile) replaces Br: nucleophilic substitution." }),
      P.short({ label: "(c)", marks: 1, stem: "Identify the attacking species in step 2.", accepted: ["OH-", "hydroxide ion", "hydroxide", "OH⁻", "hydroxide ions"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["Na+"], explanation: "The hydroxide ion donates a lone pair." }),
      P.manual({ label: "(d)", marks: 2, stem: "Write balanced equations, using [O], for steps 3 and 4.", points: ["Step 3: CH₃CH₂OH + [O] → CH₃CHO + H₂O", "Step 4: CH₃CHO + [O] → CH₃COOH"], modelAnswer: "CH₃CH₂OH + [O] → CH₃CHO + H₂O; CH₃CHO + [O] → CH₃COOH." }),
      P.tf({ label: "(e)", marks: 1, stem: "Steps 3 and 4 are both oxidation reactions.", answer: true, explanation: "Step 3 removes hydrogen; step 4 adds oxygen." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why HBr can act as an electrophile in step 1.", points: ["The H–Br bond is polar: H is δ+ because Br is more electronegative", "The δ+ hydrogen accepts a pair of electrons from the C=C π bond"], modelAnswer: "Bromine is more electronegative than hydrogen, so HBr is polarised Hδ+–Brδ−; the δ+ hydrogen is attacked by the electron-rich π bond, accepting an electron pair." }),
    ],
    hints: ["Electrophiles attack C=C; nucleophiles attack δ+ carbon.", "[O] stands for oxygen from the oxidising agent."],
    explanation: "Step 1 electrophilic addition; step 2 nucleophilic substitution by OH⁻; steps 3-4 oxidation.",
  });
  b.struct({
    d: 4, skill: "UNDERSTANDING", examStyle: true,
    stem: "Four reactions are carried out:\n\n| Reaction | Equation |\n|---|---|\n| W | $\\ce{CH4 + Cl2 -> CH3Cl + HCl}$ (ultraviolet light) |\n| X | $\\ce{CH3CH2I + NH3 -> CH3CH2NH2 + HI}$ (in ethanol, under pressure) |\n| Y | $\\ce{CH2=CHCH3 + Br2 -> CH2BrCHBrCH3}$ |\n| Z | $\\ce{C6H6 + HNO3 -> C6H5NO2 + H2O}$ (concentrated $\\ce{H2SO4}$) |",
    parts: [
      P.match({ label: "(a)", stem: "Match each reaction with the species that attacks the organic molecule.", pairs: [["W", "a chlorine radical"], ["X", "a nucleophile (NH₃)"], ["Y", "an electrophile (polarised Br₂)"], ["Z", "an electrophile (NO₂⁺)"]], explanation: "W radical; X nucleophile; Y and Z electrophiles." }),
      P.short({ label: "(b)", marks: 1, stem: "Which reaction, W, X, Y or Z, involves homolytic fission in its first step?", accepted: ["W"], wrong: ["Y"], explanation: "Ultraviolet light splits Cl₂ homolytically into two Cl• radicals." }),
      P.short({ label: "(c)", marks: 1, stem: "Which reaction, W, X, Y or Z, is an addition reaction?", accepted: ["Y"], wrong: ["Z"], explanation: "Y: two molecules form one product." }),
    ],
    hints: ["Light → radicals; lone pair → nucleophile; positive or δ+ → electrophile."],
    explanation: "W free-radical substitution; X nucleophilic substitution; Y electrophilic addition; Z electrophilic substitution.",
  });

  b.card("DEFINITION", "Homolytic fission", "Bond breaking in which each atom keeps one electron, forming two free radicals (e.g. Cl₂ → 2Cl• in UV light).");
  b.card("DEFINITION", "Heterolytic fission", "Bond breaking in which one atom keeps both electrons, forming a cation and an anion.");
  b.card("DEFINITION", "Nucleophile", "An electron-pair donor that attacks an electron-deficient (δ+) atom, e.g. OH⁻, CN⁻, NH₃, H₂O.");
  b.card("DEFINITION", "Electrophile", "An electron-pair acceptor that attacks an electron-rich region, e.g. H⁺, NO₂⁺, polarised Br₂, carbocations.");
  b.card("DEFINITION", "Free radical", "A species with an unpaired electron, shown with a dot, e.g. Cl•, CH₃•.");
  b.card("CONCEPT", "What does a curly arrow show?", "The movement of a pair of electrons, from a lone pair or bond to an atom. A fish-hook arrow shows one electron.");
  b.card("CONCEPT", "Elimination", "A small molecule (H₂O, HBr) is removed from one molecule, forming a C=C bond.");
  b.card("CONCEPT", "Hydrolysis versus hydration", "Hydrolysis splits a molecule using water; hydration adds water across a C=C bond (addition).");
  b.card("FACT", "Carbocation stability order", "Tertiary > secondary > primary, because electron-donating alkyl groups disperse the positive charge.");
  b.card("FORMULA", "Primary alcohol to carboxylic acid with [O]", "RCH₂OH + 2[O] → RCOOH + H₂O.");
});
