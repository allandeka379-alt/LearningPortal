// W4a: achem.carbonyl.nucleophilic-addition (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, moles, sfStr } from "../lib.mjs";

concept("achem.carbonyl.nucleophilic-addition", { file: "carbonyl/nucleophilic-addition", keyPrefix: "carbonyl.nucleophilic-addition" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What type of reaction occurs between ethanal and hydrogen cyanide in the presence of potassium cyanide?",
    options: [
      ["nucleophilic addition", "Correct: CN⁻ attacks the δ+ carbonyl carbon and the π bond breaks."],
      ["electrophilic addition", "C=O attracts nucleophiles; electrophilic addition is typical of C=C."],
      ["nucleophilic substitution", "Nothing is replaced: the two parts of HCN add across C=O."],
      ["free-radical substitution", "No radicals or UV light are involved."],
    ],
    answer: "A",
    explanation: "CH₃CHO + HCN → CH₃CH(OH)CN by nucleophilic addition.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is a small amount of potassium cyanide added when HCN reacts with a ketone?",
    options: [
      ["HCN is a weak acid, so KCN supplies the CN⁻ ions that act as the nucleophile.", "Correct: CN⁻ is regenerated, so KCN acts as a catalyst."],
      ["KCN removes water, shifting the equilibrium towards the hydroxynitrile.", "KCN is not a drying agent; its role is to supply CN⁻."],
      ["K⁺ ions polarise the C=O bond and so act as the electrophile.", "The attacking species is the cyanide ion, a nucleophile."],
      ["KCN reacts with the ketone first to form a potassium alkoxide salt.", "The alkoxide intermediate forms from CN⁻ attack, not from K⁺."],
    ],
    answer: "A",
    explanation: "HCN ⇌ H⁺ + CN⁻ lies far to the left; KCN provides CN⁻.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the first step of the mechanism, where does the curly arrow from the cyanide ion start and finish?",
    options: [
      ["from the lone pair on the carbon of CN⁻ to the carbonyl carbon atom", "Correct: the new bond is C–C."],
      ["from the lone pair on the nitrogen of CN⁻ to the carbonyl carbon atom", "The carbon of cyanide bonds, so the product is a nitrile, not an isonitrile."],
      ["from the lone pair on the carbon of CN⁻ to the carbonyl oxygen atom", "The oxygen is δ−; the nucleophile attacks the δ+ carbon."],
      ["from the C=O π bond to the carbon atom of the cyanide ion", "Electrons move from C=O to oxygen, not towards the nucleophile."],
    ],
    answer: "A",
    explanation: "Arrow 1: lone pair on C of CN⁻ → δ+ C. Arrow 2: C=O π bond → O.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What is the name of the product of propanone with HCN and KCN?",
    options: [
      ["2-hydroxy-2-methylpropanenitrile", "Correct: (CH₃)₂C(OH)CN; the nitrile carbon is included in the chain."],
      ["2-hydroxypropanenitrile", "That is the product from ethanal."],
      ["2-hydroxybutanenitrile", "That is the product from propanal."],
      ["2-methylpropanenitrile", "The –OH group from the carbonyl oxygen is missing."],
    ],
    answer: "A",
    explanation: "CH₃COCH₃ + HCN → (CH₃)₂C(OH)CN.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the product of ethanal with HCN optically inactive?",
    options: [
      ["The planar C=O is attacked equally from both sides, giving equal amounts of two enantiomers.", "Correct: a racemic mixture forms; the rotations cancel."],
      ["The product has no chiral carbon, because two of its groups are identical.", "CH₃CH(OH)CN has four different groups on C2, so it is chiral."],
      ["The cyanide ion attacks from one side only, giving one meso compound.", "There is no meso form; attack from either face is equally likely."],
      ["Light cannot pass through the solution because the nitrile absorbs it.", "Optical inactivity is about rotation of plane-polarised light, not absorption."],
    ],
    answer: "A",
    hints: ["What is the shape around the carbonyl carbon?"],
    explanation: "Trigonal planar C=O → equal attack from both faces → racemate.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the carbonyl compounds give a racemic mixture when they react with HCN/KCN?\n\n1. propanal\n2. butanone\n3. propanone",
    options: [
      ["1 and 2 only", "Correct: propanone's product has two identical CH₃ groups, so it is not chiral."],
      ["1, 2 and 3", "Propanone gives (CH₃)₂C(OH)CN, which is achiral."],
      ["2 and 3 only", "Propanal gives a chiral product; propanone does not."],
      ["1 only", "Butanone has two different groups (CH₃ and C₂H₅), so its product is chiral too."],
    ],
    answer: "A",
    hints: ["After addition, does the central carbon carry four different groups?"],
    explanation: "CH₃CH₂CH(OH)CN and CH₃CH₂C(CH₃)(OH)CN are chiral; (CH₃)₂C(OH)CN is not.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements explain why propanal reacts faster than propanone with nucleophiles?\n\n1. Propanone has two electron-donating alkyl groups on the carbonyl carbon, so it is less δ+.\n2. The two alkyl groups of propanone hinder the approach of the nucleophile.\n3. Propanone has a weaker C=O bond than propanal.",
    options: [
      ["1 and 2 only", "Correct: inductive and steric effects; statement 3 is not the reason."],
      ["1, 2 and 3", "Statement 3 is not the explanation."],
      ["2 and 3 only", "Statement 1 is a valid reason; statement 3 is not."],
      ["1 only", "Statement 2 (steric hindrance) is also a reason."],
    ],
    answer: "A",
    hints: ["Think about electron density at the carbonyl carbon and crowding."],
    explanation: "Electronic (less δ+) and steric effects slow ketones down.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "Which reagents convert ethanal into 2-hydroxypropanoic acid, CH₃CH(OH)COOH, in two steps?",
    options: [
      ["HCN with KCN, then heat under reflux with dilute HCl", "Correct: addition gives CH₃CH(OH)CN, which is hydrolysed to the acid."],
      ["HCN with KCN, then LiAlH₄ in dry ether", "LiAlH₄ reduces the nitrile to an amine, not an acid."],
      ["KCN in ethanol, then acidified dichromate(VI), heat", "Dichromate(VI) oxidises; it does not hydrolyse nitriles."],
      ["NaBH₄ in water, then HCN with KCN", "NaBH₄ first removes the C=O group, so HCN cannot then add."],
    ],
    answer: "A",
    hints: ["Which step adds the extra carbon, and which converts –CN into –COOH?"],
    explanation: "CH₃CHO → CH₃CH(OH)CN → CH₃CH(OH)COOH (lactic acid).",
  });
  {
    const n = moles(2.64, Mr("CH3CHO"));
    const m = n * Mr("C3H5NO");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "2.64 g of ethanal reacts completely with HCN. Calculate the mass, in g, of 2-hydroxypropanenitrile, CH₃CH(OH)CN, formed, to three significant figures. Ar: H 1, C 12, N 14, O 16.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("C2H5NO")],
      hints: ["The reaction is 1 : 1; the product has one more carbon than ethanal."],
      explanation: `1. Mr(CH₃CHO) = 44; n = 2.64 ÷ 44 = ${sfStr(n, 3)} mol.\n2. Mr(C₃H₅NO) = 71; mass = ${sfStr(n, 3)} × 71 = ${sfStr(m, 3)} g.\n3. Forgetting the extra carbon of the nitrile (Mr 59) gives ${sfStr(n * Mr("C2H5NO"), 3)} g.`,
    });
  }
  {
    const y1 = 0.75, y2 = 0.6;
    const overall = y1 * y2 * 100;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "Butanone is converted into a hydroxynitrile in 75% yield, and the hydroxynitrile is hydrolysed to a hydroxy acid in 60% yield. What is the overall percentage yield?",
      value: overall, unit: "%",
      wrong: [(y1 + y2) * 50],
      hints: ["Multiply the fractional yields."],
      explanation: `0.75 × 0.60 = ${overall / 100}, so ${overall}%. Averaging the yields (67.5%) is wrong: losses in each step multiply.`,
    });
  }
  {
    const n = moles(4.35, Mr("C4H7NO"));
    const m = n * Mr("C4H8O3");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "4.35 g of 2-hydroxy-2-methylpropanenitrile, (CH₃)₂C(OH)CN, is completely hydrolysed by heating with dilute hydrochloric acid. Calculate the mass, in g, of 2-hydroxy-2-methylpropanoic acid, (CH₃)₂C(OH)COOH, that forms, to three significant figures. Mr: hydroxynitrile 85, hydroxy acid 104.",
      value: m, sf: 3, unit: "g",
      wrong: [4.35],
      hints: ["–CN becomes –COOH; the ratio is 1 : 1."],
      explanation: `1. Mr((CH₃)₂C(OH)CN) = 85; n = 4.35 ÷ 85 = ${sfStr(n, 3)} mol.\n2. (CH₃)₂C(OH)CN + 2H₂O + H⁺ → (CH₃)₂C(OH)COOH + NH₄⁺.\n3. Mr(acid) = 104; mass = ${sfStr(n, 3)} × 104 = ${sfStr(m, 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the reaction of propanone with HCN, the cyanide ion used in the first step is regenerated in the second step.",
    answer: true,
    explanation: "True: the alkoxide takes H⁺ from HCN, releasing a new CN⁻, so cyanide is a catalyst.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Bromine water adds rapidly to the C=O bond of propanone in the same way that it adds to the C=C bond of propene.",
    answer: false,
    explanation: "False: C=O is polar and attracts nucleophiles; electrophiles such as bromine do not add to it.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put the events of the mechanism for ethanal + HCN in order: match each step number with what happens.",
    pairs: [
      ["Step 1", "the cyanide ion's carbon lone pair attacks the δ+ carbonyl carbon"],
      ["Step 2", "the C=O π electrons move onto the oxygen atom"],
      ["Step 3", "an intermediate with a negative charge on oxygen forms"],
      ["Step 4", "the O⁻ takes a proton from an HCN molecule"],
      ["Step 5", "a new cyanide ion is released"],
    ],
    hints: ["Attack, π bond breaks, intermediate, protonation, catalyst regenerated."],
    explanation: "Nucleophilic attack, alkoxide intermediate, then protonation regenerating CN⁻.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the synthesis route from propanal.",
    template: "Propanal reacts with HCN and KCN to give 2-hydroxybutanenitrile. Heating this with dilute acid gives {{blank:a}}. Reducing it with LiAlH₄ instead gives a compound containing an {{blank:b}} group.",
    blanks: [
      { id: "a", accepted: ["2-hydroxybutanoic acid"], choices: ["2-hydroxybutanoic acid", "2-hydroxypropanoic acid", "butanoic acid"] },
      { id: "b", accepted: ["amine"], choices: ["amine", "aldehyde", "ester"] },
    ],
    hints: ["Hydrolysis turns –CN into –COOH; reduction turns it into –CH₂NH₂."],
    explanation: "CH₃CH₂CH(OH)CN → CH₃CH₂CH(OH)COOH (hydrolysis) or CH₃CH₂CH(OH)CH₂NH₂ (reduction).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the nucleophile in the reaction of a ketone with HCN in the presence of KCN.",
    accepted: ["cyanide ion", "cyanide", "CN-", "CN⁻", "cyanide ions"],
    wrong: ["HCN"],
    explanation: "The cyanide ion, CN⁻, which has a lone pair on carbon.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the structural formula of the hydroxynitrile formed from propanal (for example CH3CH(OH)CN).",
    accepted: ["CH3CH2CH(OH)CN", "CH₃CH₂CH(OH)CN", "C2H5CH(OH)CN", "CH3CH2CHOHCN"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["CH3CH2CH2CN"],
    hints: ["Add H to the O and CN to the carbonyl carbon."],
    explanation: "CH₃CH₂CHO + HCN → CH₃CH₂CH(OH)CN, 2-hydroxybutanenitrile.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the mechanism of the reaction between propanone and HCN in the presence of KCN. Describe each curly arrow and the intermediate.",
    points: ["C=O is polar: C δ+, O δ−", "Arrow from the lone pair on the C of CN⁻ to the carbonyl carbon", "Arrow from the C=O π bond to the O atom", "Intermediate (CH₃)₂C(O⁻)CN with the negative charge on O", "Arrow from O⁻ to the H of HCN (H–CN bond breaks to C), giving (CH₃)₂C(OH)CN and regenerating CN⁻"],
    modelAnswer: "The C=O bond is polarised, Cδ+ and Oδ−. A cyanide ion donates the lone pair on its carbon to the carbonyl carbon (arrow from that lone pair to C) while the π electrons of C=O move onto oxygen (arrow from the double bond to O). This gives the intermediate (CH₃)₂C(O⁻)CN with a negative charge on oxygen. A lone pair on O⁻ then attacks the hydrogen of HCN (arrow from O⁻ to H, and from the H–C bond to the carbon of the cyanide), giving 2-hydroxy-2-methylpropanenitrile and a new cyanide ion.",
    hints: ["Two arrows in step 1, two in step 2."],
    explanation: "One mark per dipole, arrow, intermediate and protonation step.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    stem: "Butanone reacts with HCN/KCN. Explain why the product does not rotate plane-polarised light even though it contains a chiral carbon.",
    points: ["The carbonyl carbon is trigonal planar", "CN⁻ is equally likely to attack from either face (above or below the plane)", "so equal amounts of the two enantiomers form (a racemic mixture), whose rotations cancel"],
    modelAnswer: "The C=O group and the atoms around the carbonyl carbon lie in one plane. The cyanide ion can attack from above or below with equal probability, so the two enantiomers of 2-hydroxy-2-methylbutanenitrile form in equal amounts. This racemic mixture rotates plane-polarised light equally in opposite directions, so there is no overall rotation.",
    hints: ["Shape, attack, consequence."],
    explanation: "Planar carbonyl → racemate.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Outline, in words, how the reduction of ethanal by NaBH₄ can be described as nucleophilic addition.",
    points: ["NaBH₄ provides hydride ions, H⁻, which act as the nucleophile", "H⁻ attacks the δ+ carbonyl carbon as the π electrons move to O, forming an alkoxide intermediate", "The alkoxide is protonated (by water or acid) to give ethanol"],
    modelAnswer: "NaBH₄ acts as a source of hydride ions. A hydride ion attacks the δ+ carbon of C=O while the π electrons move onto oxygen, forming CH₃CH₂O⁻. This intermediate is protonated by water or dilute acid to give ethanol.",
    hints: ["What is the nucleophile in NaBH₄?"],
    explanation: "Hydride addition then protonation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A synthesis scheme starting from ethanal:\n\n| Step | Reagent and conditions | Product |\n|---|---|---|\n| 1 | HCN, KCN catalyst, room temperature | G |\n| 2 | dilute H₂SO₄, heat under reflux | H, CH₃CH(OH)COOH |\n| 3 | NaBH₄ (instead of step 1) | J |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Give the structural formula of G (for example CH3COCH3).", accepted: ["CH3CH(OH)CN", "CH₃CH(OH)CN", "CH3CHOHCN"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2CN"], explanation: "2-hydroxypropanenitrile." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What type of reaction is step 2?", options: [
        ["hydrolysis", "Correct: –CN + 2H₂O → –COOH (+ NH₄⁺)."],
        ["reduction", "Hydrogen is not added; reduction would give an amine."],
        ["oxidation", "No oxygen atom is gained from an oxidising agent."],
        ["elimination", "No small molecule is lost to form a double bond."],
      ], answer: "A", explanation: "Acid hydrolysis of the nitrile." }),
      P.manual({ label: "(c)", marks: 2, stem: "H is formed as a racemic mixture. Explain why.", points: ["G has a chiral carbon (H, CH₃, OH, CN), and H keeps it", "The planar C=O in ethanal is attacked from both sides equally in step 1, so equal amounts of the two enantiomers form"], modelAnswer: "C2 in G and H has four different groups. In step 1 cyanide attacks the planar carbonyl group equally from either face, so equal amounts of the two enantiomers form and are carried through to H." }),
      P.short({ label: "(d)", marks: 1, stem: "Name J.", accepted: ["ethanol", "ethyl alcohol"], wrong: ["ethanoic acid"], explanation: "Reduction of an aldehyde gives a primary alcohol." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why propanone reacts more slowly than ethanal with HCN.", points: ["Two alkyl groups donate electron density, making the carbonyl carbon less δ+", "The two methyl groups also cause steric hindrance to the approaching CN⁻"], modelAnswer: "Propanone's carbonyl carbon carries two electron-donating methyl groups, so it is less δ+ than in ethanal, and the two groups crowd the carbon, hindering attack by cyanide." }),
      P.manual({ label: "(f)", marks: 1, stem: "Give one safety precaution needed in step 1.", points: ["HCN/KCN are highly toxic: use a fume cupboard, gloves, and keep acids away from KCN (supervised laboratory only)"], modelAnswer: "Work in a fume cupboard with gloves because HCN is extremely toxic." }),
    ],
    hints: ["Step 1 adds one carbon.", "Which carbon in G is chiral?"],
    explanation: "G CH₃CH(OH)CN; step 2 hydrolysis; racemate from planar attack; J ethanol; ketones slower (inductive + steric).",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A student compared how quickly three carbonyl compounds react with HCN in the presence of KCN under the same conditions. Her results:\n\n| Compound | Formula | Relative initial rate |\n|---|---|---|\n| methanal | HCHO | fastest |\n| ethanal | CH₃CHO | intermediate |\n| propanone | CH₃COCH₃ | slowest |",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain the order of reactivity.", points: ["Alkyl groups donate electron density (inductive effect), so the carbonyl carbon is less δ+ as the number of alkyl groups increases (0, 1, 2)", "Alkyl groups also hinder the approach of the nucleophile (steric effect); methanal has none, propanone has two"], modelAnswer: "Each alkyl group donates electron density to the carbonyl carbon, reducing its δ+ charge, and crowds it. Methanal has no alkyl groups, ethanal one and propanone two, so attack by cyanide becomes slower in that order." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the product formed from methanal.", accepted: ["2-hydroxyethanenitrile", "hydroxyethanenitrile", "hydroxyacetonitrile", "glycolonitrile"], wrong: ["2-hydroxypropanenitrile"], explanation: "HCHO + HCN → HOCH₂CN, 2-hydroxyethanenitrile." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the first step of the mechanism for ethanal, naming the attacking species and the intermediate.", points: ["The cyanide ion (nucleophile) uses the lone pair on its carbon to attack the δ+ carbonyl carbon", "The C=O π electrons move to O, giving the alkoxide intermediate CH₃CH(O⁻)CN"], modelAnswer: "A cyanide ion attacks the δ+ carbonyl carbon with the lone pair on its carbon while the π electrons of C=O move onto oxygen, forming CH₃CH(O⁻)CN." }),
      P.mcq({ label: "(d)", marks: 1, stem: "How many stereoisomers are present in the product from ethanal?", options: [
        ["two, in equal amounts", "Correct: a racemic mixture of two enantiomers."],
        ["only one, a single enantiomer", "The carbon bearing OH and CN is chiral and both faces are attacked."],
        ["two, in unequal amounts", "Attack from either face is equally likely."],
        ["four, from two chiral centres", "There is only one chiral centre."],
      ], answer: "A", explanation: "One chiral centre, racemate." }),
      P.manual({ label: "(e)", marks: 1, stem: "Suggest why a pharmaceutical company using this reaction to make a drug may need to separate the products.", points: ["Only one enantiomer may have the desired effect (the other may be inactive or harmful), so the racemate must be separated or a single enantiomer made"], modelAnswer: "The two enantiomers can act differently in the body; usually only one is wanted, so the racemic mixture has to be separated." }),
      P.short({ label: "(f)", marks: 1, stem: "Name the product of hydrolysing the ethanal product with dilute acid.", accepted: ["2-hydroxypropanoic acid", "lactic acid", "2 hydroxypropanoic acid"], wrong: ["propanoic acid"], explanation: "CH₃CH(OH)COOH." }),
    ],
    hints: ["Count the alkyl groups on each carbonyl carbon."],
    explanation: "Inductive and steric effects; HOCH₂CN; alkoxide intermediate; racemate; lactic acid.",
  });
  b.card("DEFINITION", "Nucleophilic addition", "A nucleophile attacks the δ+ carbon of C=O, the π bond breaks, and two groups add across the double bond.");
  b.card("FACT", "Conditions for adding HCN to a carbonyl", "HCN with a little KCN catalyst, room temperature (supervised; HCN is extremely toxic).");
  b.card("FORMULA", "Ethanal + HCN", "CH₃CHO + HCN → CH₃CH(OH)CN (2-hydroxypropanenitrile)");
  b.card("CONCEPT", "First step of the mechanism", "Lone pair on C of CN⁻ → δ+ carbonyl C; C=O π electrons → O; alkoxide intermediate.");
  b.card("CONCEPT", "Second step of the mechanism", "O⁻ takes H⁺ from HCN; CN⁻ is regenerated (KCN is a catalyst).");
  b.card("CONCEPT", "Why a racemic mixture forms", "Planar C=O is attacked equally from both faces, giving equal amounts of two enantiomers.");
  b.card("CONCEPT", "Uses of hydroxynitriles", "Add one carbon; hydrolysis (dilute acid, reflux) → hydroxy acid; reduction (LiAlH₄) → amino alcohol.");
  b.card("CONCEPT", "Aldehydes versus ketones with nucleophiles", "Aldehydes react faster: carbonyl C more δ+ (one alkyl group) and less hindered.");
  b.card("CONCEPT", "Hydride reduction as nucleophilic addition", "NaBH₄/LiAlH₄ supply H⁻, which adds to the δ+ C; the alkoxide is then protonated.");
});
