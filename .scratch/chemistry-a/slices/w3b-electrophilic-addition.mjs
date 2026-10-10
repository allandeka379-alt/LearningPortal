// W3b: achem.hydrocarbons.electrophilic-addition (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t } from "../lib.mjs";

concept("achem.hydrocarbons.electrophilic-addition", { file: "hydrocarbons/electrophilic-addition", keyPrefix: "hydrocarbons.electrophilic-addition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the reaction of hydrogen bromide with ethene, what type of species attacks the double bond first?",
    options: [
      ["an electrophile", "Correct: the δ+ hydrogen of HBr accepts electrons from the π bond."],
      ["a nucleophile", "Br⁻ acts as a nucleophile only in the second step."],
      ["a free radical", "No radicals are involved; there is no UV light."],
      ["a carbanion", "No negatively charged carbon is formed in this mechanism."],
    ],
    answer: "A",
    explanation: "Electrophilic addition begins with attack of the π electrons on an electrophile.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can a non-polar bromine molecule act as an electrophile towards ethene?",
    options: [
      ["The π electrons repel the Br–Br electrons, inducing a dipole so one Br atom becomes δ+.", "Correct: an induced dipole makes the nearer bromine electron-deficient."],
      ["Bromine molecules split into Br• radicals as soon as they meet a double bond.", "Radicals form only in UV light; this reaction is ionic."],
      ["Bromine has a permanent dipole because one atom is more electronegative.", "Both atoms are identical, so Br₂ has no permanent dipole."],
      ["The ethene molecule donates a hydrogen ion to bromine, forming HBr.", "No H⁺ is transferred; Br adds to carbon."],
    ],
    answer: "A",
    explanation: "Induced dipole Brδ+–Brδ−; the δ+ atom accepts the π electron pair.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What is the major product when hydrogen bromide reacts with but-1-ene, CH₂=CHCH₂CH₃?",
    options: [
      ["2-bromobutane", "Correct: H adds to C1, giving the more stable secondary carbocation at C2."],
      ["1-bromobutane", "This is the minor product, formed via the less stable primary carbocation."],
      ["1,2-dibromobutane", "This forms with Br₂, not HBr."],
      ["2-bromobut-1-ene", "Addition removes the double bond; nothing is substituted."],
    ],
    answer: "A",
    explanation: "Markovnikov: H to the CH₂ end, Br to C2.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the first step of the reaction between propene and hydrogen bromide, where does the curly arrow that forms the new C–H bond start and end?",
    options: [
      ["from the C=C π bond to the δ+ hydrogen atom of HBr", "Correct: the π electron pair moves to the electrophile."],
      ["from the δ+ hydrogen atom of HBr to the C=C π bond", "Arrows show electrons moving from an electron-rich site, so this is backwards."],
      ["from the H–Br bond to the bromine atom of HBr", "This arrow breaks H–Br; it does not form C–H."],
      ["from a lone pair on bromine to the C=C double bond", "Bromide attacks only after the carbocation has formed."],
    ],
    answer: "A",
    hints: ["Arrows start at electrons."],
    explanation: "Arrow 1: π bond → Hδ+. Arrow 2: H–Br bond → Br.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which intermediate forms in the main pathway when hydrogen chloride adds to 2-methylpropene, (CH₃)₂C=CH₂?",
    options: [
      [t`$\ce{(CH3)3C+}$`, "Correct: a tertiary carbocation, the most stable possible."],
      [t`$\ce{(CH3)2CHCH2+}$`, "This primary carbocation forms only in the minor pathway."],
      [t`$\ce{(CH3)2CClCH2+}$`, "Chlorine adds in the second step, not the first."],
      [t`$\ce{(CH3)3C^.}$`, "Radicals are not involved in electrophilic addition."],
    ],
    answer: "A",
    hints: ["Which carbon receives the H to give the most alkyl groups on C⁺?"],
    explanation: "H adds to the CH₂ end; the positive charge sits on the carbon with three methyl groups.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Ethene is bubbled into bromine water that also contains dissolved sodium chloride. Which compound would NOT be expected among the products?",
    options: [
      [t`$\ce{CH2ClCH2Cl}$`, "Correct: every product must contain the bromine that added first."],
      [t`$\ce{CH2BrCH2Br}$`, "Br⁻ attacking the carbocation gives this."],
      [t`$\ce{CH2BrCH2Cl}$`, "Cl⁻ attacking the carbocation gives this."],
      [t`$\ce{CH2BrCH2OH}$`, "Water attacking the carbocation (then losing H⁺) gives this."],
    ],
    answer: "A",
    hints: ["Which species can start the reaction?"],
    explanation: "Cl⁻ is not an electrophile, so it cannot start the addition; it can only attack the bromine-containing carbocation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about the reaction of bromine with ethene are correct?\n\n1. A carbocation intermediate is formed.\n2. A bromide ion attacks in the second step.\n3. The Br–Br bond breaks homolytically.",
    options: [
      ["1 and 2 only", "Correct: the Br–Br bond breaks heterolytically, forming Br⁻."],
      ["1, 2 and 3", "Statement 3 is false: both bonding electrons go to one bromine atom."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["Are ions or radicals formed?"],
    explanation: "Heterolytic fission gives the carbocation and Br⁻.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the statements about the addition of HBr to propene are correct?\n\n1. The secondary carbocation is more stable than the primary carbocation.\n2. 1-bromopropane is formed as a minor product.\n3. The major product forms through the more stable carbocation.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: it is the reason for Markovnikov addition."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Minor products still form, just more slowly."],
    explanation: "Secondary cation more stable → 2-bromopropane major; 1-bromopropane minor.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "2-methylbut-2-ene, (CH₃)₂C=CHCH₃, is hydrated with steam and an acid catalyst. What is the major product?",
    options: [
      ["2-methylbutan-2-ol", "Correct: H⁺ adds to the CH carbon, giving a tertiary carbocation that water attacks."],
      ["3-methylbutan-2-ol", "This forms via the less stable secondary carbocation: minor."],
      ["2-methylbutane-2,3-diol", "Two OH groups come from cold dilute manganate(VII), not hydration."],
      ["3-methylbutan-1-ol", "No carbocation in the mechanism leads to OH on the end carbon."],
    ],
    answer: "A",
    hints: ["Compare the two possible carbocations."],
    explanation: "Tertiary carbocation (CH₃)₂C⁺CH₂CH₃ → (CH₃)₂C(OH)CH₂CH₃.",
  });
  b.num({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many curly arrows are needed to describe the first step of the reaction of bromine with ethene?",
    value: 2,
    wrong: [1],
    explanation: "One from the π bond to the δ+ Br, one from the Br–Br bond to the δ− Br.",
  });
  b.num({
    d: 3, skill: "ANALYSIS",
    stem: "Ethene reacts with bromine dissolved in aqueous sodium chloride. How many different organic products (each containing at least one bromine atom) are expected? Consider attack on the carbocation by Br⁻, Cl⁻ and H₂O.",
    value: 3,
    wrong: [4],
    hints: ["Every product contains the first bromine atom."],
    explanation: "CH₂BrCH₂Br, CH₂BrCH₂Cl and CH₂BrCH₂OH.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Markovnikov's rule is explained by the greater stability of the carbocation with more alkyl groups attached to the positive carbon.",
    answer: true,
    explanation: "True: the more substituted carbocation forms faster.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Aqueous sodium chloride alone reacts with ethene by electrophilic addition.",
    answer: false,
    hints: ["Is Cl⁻ an electrophile?"],
    explanation: "False: Cl⁻ is a nucleophile; it cannot attack the π bond.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each alkene with the major product of its reaction with HBr.",
    pairs: [
      ["ethene", "bromoethane"],
      ["propene", "2-bromopropane"],
      ["2-methylpropene", "2-bromo-2-methylpropane"],
      ["but-2-ene", "2-bromobutane"],
    ],
    hints: ["Find the more stable carbocation each time."],
    explanation: "Symmetrical alkenes give one product; unsymmetrical ones give mainly the Markovnikov product.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of the electrophilic addition of HBr to an alkene.",
    template: "The H–Br bond is polar, with hydrogen {{blank:a}}. A curly arrow goes from the {{blank:b}} bond to this hydrogen, forming a {{blank:c}} and a bromide ion. The bromide ion then donates a {{blank:d}} to the positive carbon.",
    blanks: [
      { id: "a", accepted: ["δ+"], choices: ["δ+", "δ−"] },
      { id: "b", accepted: ["π"], choices: ["π", "σ", "C–H"] },
      { id: "c", accepted: ["carbocation"], choices: ["carbocation", "free radical", "carbanion"] },
      { id: "d", accepted: ["lone pair"], choices: ["lone pair", "single electron", "proton"] },
    ],
    explanation: "Hδ+; π bond; carbocation; lone pair.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Name the major organic product of the reaction between hydrogen chloride and 2-methylpropene.",
    accepted: ["2-chloro-2-methylpropane", "2 chloro 2 methylpropane", "tert-butyl chloride"],
    wrong: ["1-chloro-2-methylpropane"],
    hints: ["The tertiary carbocation forms."],
    explanation: "(CH₃)₃C⁺ + Cl⁻ → (CH₃)₃CCl.",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Propene reacts with HBr. Is the carbocation in the main pathway primary, secondary or tertiary?",
    accepted: ["secondary", "a secondary carbocation", "secondary carbocation", "2°"],
    wrong: ["primary"],
    explanation: "CH₃CH⁺CH₃ has two alkyl groups on the positive carbon: secondary.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe the mechanism of the reaction between bromine and propene, naming the product.",
    points: ["The π electrons induce a dipole in Br₂ (Brδ+–Brδ−)", "Arrow from the C=C π bond to the δ+ Br; arrow from the Br–Br bond to the δ− Br, forming Br⁻", "Carbocation intermediate CH₃CH⁺CH₂Br (positive charge on the carbon not bonded to Br)", "Arrow from a lone pair on Br⁻ to the C⁺; product 1,2-dibromopropane CH₃CHBrCH₂Br"],
    modelAnswer: "As Br₂ approaches the electron-rich C=C, a dipole is induced (Brδ+–Brδ−). A curly arrow goes from the π bond to the δ+ bromine and another from the Br–Br bond to the δ− bromine, which leaves as Br⁻. The secondary carbocation CH₃CH⁺CH₂Br forms. A lone pair on Br⁻ attacks the positive carbon, giving 1,2-dibromopropane, CH₃CHBrCH₂Br.",
    hints: ["Dipole, two arrows, carbocation, final arrow."],
    explanation: "One mark per stage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the reaction of hydrogen chloride with propene gives mainly 2-chloropropane rather than 1-chloropropane.",
    points: ["H can add to C1 to give a secondary carbocation CH₃CH⁺CH₃, or to C2 to give a primary carbocation CH₃CH₂CH₂⁺", "The secondary carbocation is more stable because two alkyl groups donate electron density (inductive effect), dispersing the charge", "It forms faster, and Cl⁻ attacks it to give 2-chloropropane"],
    modelAnswer: "If H adds to the end carbon, a secondary carbocation forms; if it adds to the middle carbon, a primary one forms. Two electron-releasing methyl groups stabilise the secondary ion more, so it forms more readily, and Cl⁻ then bonds to the middle carbon: 2-chloropropane is the major product.",
    hints: ["Compare both carbocations."],
    explanation: "Carbocation stability → major product.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "When ethene reacts with bromine in the presence of nitrate ions, CH₂BrCH₂ONO₂ is among the products, but no CH₂(ONO₂)CH₂(ONO₂) forms. Explain what this shows about the mechanism.",
    points: ["Nitrate ions cannot start the reaction (they are not electrophiles), so bromine must add first", "The second group adds to a positive intermediate (carbocation) formed in a separate step, which any nucleophile present can attack"],
    modelAnswer: "Every product contains bromine, so Br must attack the alkene first; NO₃⁻ only joins afterwards by attacking the positive carbocation. This supports a two-step mechanism with a carbocation intermediate rather than a single step in which Br₂ adds as a whole.",
    hints: ["Which species can start the reaction?"],
    explanation: "Mixed products support a carbocation intermediate.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    stem: "But-1-ene, CH₂=CHCH₂CH₃, reacts with hydrogen bromide at room temperature.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the type of mechanism.", accepted: ["electrophilic addition"], wrong: ["nucleophilic addition"], explanation: "Electrophilic addition." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the first step of the mechanism leading to the major product, including the curly arrows and the intermediate.", points: ["H–Br is polar, Hδ+–Brδ−", "Arrow from the C=C π bond to Hδ+ (H adds to C1); arrow from the H–Br bond to Br, giving Br⁻", "Secondary carbocation CH₃CH₂CH⁺CH₃ (positive charge on C2)"], modelAnswer: "HBr is polarised Hδ+–Brδ−. A curly arrow goes from the π bond to the δ+ hydrogen, which bonds to C1, and a second arrow from the H–Br bond to bromine, which leaves as Br⁻. The secondary carbocation CH₃CH₂C⁺HCH₃ forms." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the major product.", accepted: ["2-bromobutane", "2 bromobutane"], wrong: ["1-bromobutane"], explanation: "Br⁻ attacks C2." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the minor product.", accepted: ["1-bromobutane", "1 bromobutane"], wrong: ["2-bromobutane"], explanation: "Via the primary carbocation." }),
      P.manual({ label: "(e)", marks: 1, stem: "Explain why the major product forms in larger amount.", points: ["It forms via the more stable secondary carbocation (two electron-donating alkyl groups), which forms faster than the primary one"], modelAnswer: "The secondary carbocation is stabilised by two alkyl groups, so it forms faster than the primary carbocation." }),
      P.tf({ label: "(f)", marks: 1, stem: "The major product contains a chiral centre.", answer: true, explanation: "C2 of 2-bromobutane carries H, Br, CH₃ and C₂H₅." }),
    ],
    hints: ["Which carbocation is more substituted?"],
    explanation: "Electrophilic addition via the secondary carbocation; 2-bromobutane major, 1-bromobutane minor.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "1-methylcyclohexene is a six-membered carbon ring containing one C=C bond; one carbon of the double bond (C1) carries a methyl group and the other (C2) carries a hydrogen atom. It reacts with hydrogen bromide.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "To which carbon does the hydrogen of HBr mainly add?", options: [
        ["C2, the ring carbon that carries a hydrogen", "Correct: this leaves a tertiary carbocation at C1."],
        ["C1, the ring carbon that carries the methyl group", "This would leave a less stable secondary carbocation at C2."],
        ["the carbon of the methyl group", "The methyl carbon is not part of the double bond."],
        ["C3, the ring carbon next to C2", "C3 is not part of the double bond."],
      ], answer: "A", explanation: "Markovnikov: H to the carbon with more H atoms." }),
      P.short({ label: "(b)", marks: 1, stem: "Is the carbocation formed in the main pathway primary, secondary or tertiary?", accepted: ["tertiary", "3°", "a tertiary carbocation", "tertiary carbocation"], wrong: ["secondary"], explanation: "C1 is bonded to three carbons (methyl, C2, C6)." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the major product.", accepted: ["1-bromo-1-methylcyclohexane", "1 bromo 1 methylcyclohexane"], wrong: ["1-bromo-2-methylcyclohexane"], explanation: "Br on the carbon carrying the methyl group." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the product of (c) is the major product.", points: ["Its carbocation (positive charge on C1) is tertiary, stabilised by three alkyl groups", "So it forms faster than the secondary carbocation that leads to the other product"], modelAnswer: "Adding H to C2 puts the positive charge on C1, which has three alkyl groups; this tertiary ion is more stable than the secondary ion formed by adding H to C1, so its route is faster and gives 1-bromo-1-methylcyclohexane." }),
      P.tf({ label: "(e)", marks: 1, stem: "The minor product, 1-bromo-2-methylcyclohexane, contains chiral centres.", answer: true, explanation: "C1 (H, Br, two different ring paths) and C2 (H, CH₃, two different ring paths) are chiral." }),
    ],
    hints: ["Count the alkyl groups on each possible positive carbon."],
    explanation: "H adds to C2; tertiary carbocation at C1; 1-bromo-1-methylcyclohexane major.",
  });

  b.card("DEFINITION", "Electrophilic addition", "Addition to C=C started by an electrophile accepting the π electrons, via a carbocation intermediate.");
  b.card("CONCEPT", "Why Br₂ is electrophilic towards alkenes", "The π electrons induce a dipole in Br–Br; the δ+ Br accepts an electron pair.");
  b.card("CONCEPT", "First step: arrows", "π bond → δ+ atom of the electrophile; X–Y bond → δ− atom, which leaves as an anion.");
  b.card("CONCEPT", "Second step", "A lone pair on the anion (Br⁻) attacks the carbocation's positive carbon.");
  b.card("DEFINITION", "Markovnikov's rule", "With HX and an unsymmetrical alkene, H adds mainly to the double-bond carbon with more hydrogens.");
  b.card("CONCEPT", "Reason for Markovnikov addition", "The more substituted (more stable) carbocation forms faster: tertiary > secondary > primary.");
  b.card("FACT", "Major product of HBr + propene", "2-bromopropane (minor: 1-bromopropane).");
  b.card("CONCEPT", "Evidence for a carbocation intermediate", "Ethene + Br₂ in NaCl(aq) also gives CH₂BrCH₂Cl and CH₂BrCH₂OH: nucleophiles attack an intermediate formed after Br adds.");
  b.card("FACT", "Major product of hydrating propene", "Propan-2-ol (via the secondary carbocation).");
});
