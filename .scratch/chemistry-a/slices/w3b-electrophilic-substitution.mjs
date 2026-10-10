// W3b: achem.hydrocarbons.electrophilic-substitution (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, CAM } from "../lib.mjs";

concept("achem.hydrocarbons.electrophilic-substitution", { file: "hydrocarbons/electrophilic-substitution", keyPrefix: "hydrocarbons.electrophilic-substitution" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the electrophile in the nitration of benzene?",
    options: [
      [t`$\ce{NO2+}$`, "Correct: the nitronium ion."],
      [t`$\ce{NO3-}$`, "The nitrate ion is negative and cannot accept electrons from the ring."],
      [t`$\ce{HNO3}$`, "Nitric acid itself is not electrophilic enough; it must first form NO₂⁺."],
      [t`$\ce{HSO4-}$`, "The hydrogensulfate ion is formed alongside NO₂⁺ but does not attack the ring."],
    ],
    answer: "A",
    explanation: "Sulfuric acid protonates nitric acid, which loses water to form NO₂⁺.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the role of iron(III) bromide in the bromination of benzene?",
    options: [
      ["It accepts a lone pair from bromine, generating a strong electrophile, Br⁺.", "Correct: a Lewis acid halogen carrier."],
      ["It donates electrons to the ring, making benzene more reactive.", "FeBr₃ acts on bromine, not on the ring."],
      ["It reduces bromine to bromide ions, which attack the ring.", "Bromide ions are nucleophiles and cannot attack the ring."],
      ["It absorbs the HBr produced, driving the equilibrium to the right.", "HBr is released; the catalyst is regenerated, not used to absorb it."],
    ],
    answer: "A",
    explanation: "Br₂ + FeBr₃ → Br⁺ + FeBr₄⁻.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", applies: CAM,
    stem: "Which equation shows the formation of the electrophile in the Friedel-Crafts acylation of benzene with ethanoyl chloride?",
    options: [
      [t`$\ce{CH3COCl + AlCl3 -> CH3CO+ + AlCl4-}$`, "Correct: the acylium ion forms."],
      [t`$\ce{CH3COCl + AlCl3 -> CH3+ + COCl2 + AlCl2}$`, "This is not balanced and does not give an acylium ion."],
      [t`$\ce{CH3COCl -> CH3CO^. + Cl^.}$`, "Radicals are not involved; AlCl₃ is needed."],
      [t`$\ce{CH3COCl + AlCl3 -> CH3COCl2- + AlCl2+}$`, "Chloride is transferred to aluminium, not the other way."],
    ],
    answer: "A",
    explanation: "AlCl₃ removes Cl⁻ from the acyl chloride, leaving CH₃CO⁺.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the nitration of benzene, where does the first curly arrow start and end?",
    options: [
      ["from the delocalised π system of the ring to the nitrogen atom of NO₂⁺", "Correct: the ring donates an electron pair to the electrophile."],
      ["from the nitrogen atom of NO₂⁺ to a carbon atom of the ring", "Arrows show electrons moving from the electron-rich ring, so this is backwards."],
      ["from a C–H bond of the ring to the nitrogen atom of NO₂⁺", "The C–H bond breaks only in the last step, returning electrons to the ring."],
      ["from an oxygen lone pair of NO₂⁺ to the ring", "NO₂⁺ is the electron-pair acceptor, not a donor."],
    ],
    answer: "A",
    hints: ["Which species is electron-rich?"],
    explanation: "Arrow from the ring to N; then arrow from C–H back into the ring.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement describes the intermediate in the bromination of benzene?",
    options: [
      ["One sp³ carbon carries H and Br; the positive charge is delocalised over the other five carbons.", "Correct: the ring's delocalisation is partly disrupted."],
      ["All six carbons remain sp² and the full delocalised ring is kept, with a positive charge on bromine.", "The attacked carbon becomes sp³ and the full ring is interrupted."],
      ["A carbon radical forms, with an unpaired electron on the carbon bonded to bromine.", "The mechanism is ionic, not radical."],
      ["Two bromine atoms are bonded to adjacent carbons of the ring.", "That would be an addition product, which is not formed."],
    ],
    answer: "A",
    hints: ["What happens to the attacked carbon's hybridisation?"],
    explanation: "The intermediate is a cation with four π electrons spread over five carbons.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the intermediate in the bromination of benzene lose H⁺ rather than gain Br⁻?",
    options: [
      ["Losing H⁺ restores the stable delocalised ring.", "Correct: the aromatic stabilisation is regained."],
      ["Bromide ions are not present in the reaction mixture at any stage.", "Br⁻ is present as FeBr₄⁻."],
      ["Gaining Br⁻ would form a carbon radical, which is unstable.", "Gaining Br⁻ would give a neutral addition product, not a radical."],
      ["H⁺ is a better nucleophile than Br⁻, so it leaves more easily.", "H⁺ is not a nucleophile; it has no electron pair."],
    ],
    answer: "A",
    hints: ["What would addition destroy?"],
    explanation: "Substitution keeps about 150 kJ mol⁻¹ of delocalisation energy.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the statements about the bromination of benzene with a FeBr₃ catalyst are correct?\n\n1. FeBr₃ is regenerated at the end of the mechanism.\n2. Hydrogen bromide is a by-product.\n3. FeBr₃ accepts a lone pair of electrons from a bromine atom.",
    options: [
      ["1, 2 and 3", "Correct: all three statements are true."],
      ["1 and 2 only", "Statement 3 is also true: FeBr₃ is a Lewis acid."],
      ["2 and 3 only", "Statement 1 is also true: H⁺ + FeBr₄⁻ → FeBr₃ + HBr."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Follow FeBr₃ through the mechanism."],
    explanation: "FeBr₃ + Br₂ → FeBr₄⁻ + Br⁺; H⁺ + FeBr₄⁻ → FeBr₃ + HBr.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the statements comparing the reactions of bromine with ethene and with benzene are correct?\n\n1. Benzene needs a halogen carrier but ethene does not.\n2. Both mechanisms involve a positively charged intermediate.\n3. Both mechanisms end with a bromide ion bonding to carbon.",
    options: [
      ["1 and 2 only", "Correct: benzene's intermediate loses H⁺ instead of gaining Br⁻."],
      ["1, 2 and 3", "Statement 3 is false for benzene."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["How does each mechanism finish?"],
    explanation: "Alkene: Br⁻ adds (addition). Benzene: H⁺ lost (substitution).",
  });
  b.mcq({
    d: 4, skill: "UNDERSTANDING",
    stem: "In the nitrating mixture, what is the role of concentrated sulfuric acid?",
    options: [
      ["It protonates nitric acid, which then loses water to form NO₂⁺.", "Correct: H₂SO₄ is the stronger acid; HNO₃ acts as a base."],
      ["It provides the electrophile, HSO₄⁻, which attacks the ring.", "HSO₄⁻ is a negative ion, not an electrophile."],
      ["It oxidises benzene so that it can react with nitric acid.", "Benzene is not oxidised in nitration."],
      ["It dissolves benzene, which is insoluble in nitric acid.", "Its role is chemical, generating NO₂⁺."],
    ],
    answer: "A",
    hints: ["Which acid is stronger?"],
    explanation: "HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻; H₂SO₄ is regenerated, acting as a catalyst.",
  });
  b.num({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the intermediate formed during the nitration of benzene, over how many carbon atoms is the positive charge delocalised?",
    value: 5,
    wrong: [6],
    explanation: "Five: the sixth carbon is sp³ and carries H and NO₂.",
  });
  b.num({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "How many π electrons remain delocalised in the cation intermediate of electrophilic substitution of benzene?",
    value: 4,
    wrong: [6],
    hints: ["Two of the six π electrons formed the new bond."],
    explanation: "Two of the six π electrons form the bond to the electrophile, leaving four.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the nitrating mixture, nitric acid acts as a base.",
    answer: true,
    explanation: "True: it accepts a proton from the stronger acid, sulfuric acid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the cation intermediate of electrophilic substitution, all six ring carbons are sp² hybridised.",
    answer: false,
    explanation: "False: the attacked carbon is sp³, bonded to both H and the new group.",
  });
  b.match({
    d: 3, skill: "RECALL", applies: CAM,
    stem: "Match each reaction of benzene with its electrophile.",
    pairs: [
      ["nitration", "NO₂⁺"],
      ["bromination with FeBr₃", "Br⁺"],
      ["methylation with CH₃Cl and AlCl₃", "CH₃⁺"],
      ["acylation with CH₃COCl and AlCl₃", "CH₃CO⁺"],
      ["chlorination with AlCl₃", "Cl⁺"],
    ],
    hints: ["The catalyst removes a group or ion from the reagent."],
    explanation: "Each catalyst system generates a cation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of electrophilic substitution.",
    template: "A curly arrow goes from the delocalised ring to the {{blank:a}}. The intermediate is a {{blank:b}} ion. A second arrow goes from the {{blank:c}} bond back into the ring, so that {{blank:d}} is lost and the delocalised system is restored.",
    blanks: [
      { id: "a", accepted: ["electrophile"], choices: ["electrophile", "nucleophile", "catalyst"] },
      { id: "b", accepted: ["positive"], choices: ["positive", "negative"] },
      { id: "c", accepted: ["C–H"], choices: ["C–H", "C–C", "N–O"] },
      { id: "d", accepted: ["H⁺"], choices: ["H⁺", "H⁻", "H•"] },
    ],
    explanation: "Ring → electrophile; cation; C–H → ring; H⁺ lost.",
  });
  b.short({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "Give the formula of the electrophile formed when chloroethane reacts with aluminium chloride in a Friedel-Crafts alkylation.",
    accepted: ["CH3CH2+", "C2H5+", "CH₃CH₂⁺", "C₂H₅⁺"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["Cl+"],
    hints: ["AlCl₃ removes a chloride ion."],
    explanation: "CH₃CH₂Cl + AlCl₃ → CH₃CH₂⁺ + AlCl₄⁻.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the inorganic by-product formed when benzene is chlorinated using chlorine and aluminium chloride.",
    accepted: ["hydrogen chloride", "HCl", "hydrochloric acid"],
    wrong: ["chlorine"],
    explanation: "H⁺ + AlCl₄⁻ → AlCl₃ + HCl.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 5,
    stem: "Describe the mechanism of the reaction of benzene with chlorine in the presence of aluminium chloride. Include the formation of the electrophile and the regeneration of the catalyst.",
    points: ["Cl₂ + AlCl₃ → Cl⁺ + AlCl₄⁻", "Curly arrow from the delocalised π ring to Cl⁺", "Intermediate: sp³ carbon carrying H and Cl; positive charge delocalised over the other five carbons", "Curly arrow from the C–H bond into the ring, restoring delocalisation; H⁺ lost; chlorobenzene formed", "H⁺ + AlCl₄⁻ → AlCl₃ + HCl"],
    modelAnswer: "Aluminium chloride accepts a lone pair from chlorine: Cl₂ + AlCl₃ → Cl⁺ + AlCl₄⁻. A curly arrow goes from the delocalised π electrons of the ring to Cl⁺, forming a C–Cl bond. The intermediate has one sp³ carbon bonded to both H and Cl, with the positive charge spread over the other five carbons. A curly arrow from the C–H bond back into the ring restores the delocalised system and releases H⁺, giving chlorobenzene. Finally H⁺ + AlCl₄⁻ → AlCl₃ + HCl regenerates the catalyst.",
    hints: ["Electrophile, attack, intermediate, loss of H⁺, catalyst."],
    explanation: "One mark per step.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Cyclohexene reacts with bromine at room temperature without a catalyst, but benzene needs a halogen carrier. Explain this difference.",
    points: ["In cyclohexene the π electrons are localised in one C=C bond, giving a region of high electron density that can polarise Br₂", "In benzene the π electrons are delocalised over six carbons, so the electron density is lower and Br₂ is not polarised enough", "Benzene also loses its delocalisation stability on attack, so a stronger electrophile (Br⁺ from the halogen carrier) is needed"],
    modelAnswer: "The π electrons of cyclohexene are concentrated in a single double bond, so they can induce a dipole in Br₂ and attack it. In benzene the six π electrons are spread around the ring, so the electron density at any point is lower, and attacking disrupts the stable delocalised system. A halogen carrier is therefore needed to produce the more powerful electrophile Br⁺.",
    hints: ["Localised versus delocalised electron density."],
    explanation: "Electron density and stability explain the need for a catalyst.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Write an equation for the formation of the electrophile in the nitrating mixture and state the role of each acid.",
    points: ["HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻ (or HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O)", "H₂SO₄ acts as an acid (proton donor); HNO₃ acts as a base (proton acceptor)"],
    modelAnswer: "HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻. Sulfuric acid is the stronger acid and donates a proton; nitric acid accepts it, acting as a base.",
    hints: ["Which acid donates the proton?"],
    explanation: "Generation of NO₂⁺.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, applies: CAM,
    stem: "Ethylbenzene, C₆H₅CH₂CH₃, can be made from benzene and chloroethane using aluminium chloride as a catalyst, in dry conditions under reflux.",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "Write an equation for the formation of the electrophile.", points: ["CH₃CH₂Cl + AlCl₃ → CH₃CH₂⁺ + AlCl₄⁻"], modelAnswer: "CH₃CH₂Cl + AlCl₃ → CH₃CH₂⁺ + AlCl₄⁻" }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the mechanism of the reaction of this electrophile with benzene.", points: ["Arrow from the delocalised ring to the positive carbon of CH₃CH₂⁺", "Intermediate cation: sp³ carbon with H and C₂H₅; positive charge over the other five carbons", "Arrow from the C–H bond into the ring; H⁺ lost, giving ethylbenzene"], modelAnswer: "A curly arrow goes from the ring's π electrons to the positive carbon of the ethyl cation. The intermediate has one sp³ carbon bearing H and C₂H₅, with the charge delocalised over five carbons. A curly arrow from the C–H bond back into the ring restores the delocalisation and H⁺ leaves." }),
      P.manual({ label: "(c)", marks: 1, stem: "Write an equation to show how the catalyst is regenerated.", points: ["H⁺ + AlCl₄⁻ → AlCl₃ + HCl"], modelAnswer: "H⁺ + AlCl₄⁻ → AlCl₃ + HCl" }),
      P.mcq({ label: "(d)", marks: 1, stem: "Why must the apparatus be dry?", options: [
        ["Water reacts with aluminium chloride and destroys the catalyst.", "Correct: AlCl₃ is hydrolysed by water."],
        ["Water would add across the ring, forming an alcohol.", "Benzene does not react with water like this."],
        ["Water would oxidise the ethylbenzene product.", "Water is not an oxidising agent here."],
        ["Water would make the chloroethane polymerise.", "Chloroethane does not polymerise."],
      ], answer: "A", explanation: "Anhydrous AlCl₃ is needed." }),
      P.short({ label: "(e)", marks: 1, stem: "Name the type of reaction.", accepted: ["electrophilic substitution", "Friedel-Crafts alkylation", "Friedel Crafts alkylation", "alkylation"], wrong: ["electrophilic addition"], explanation: "Electrophilic substitution (Friedel-Crafts alkylation)." }),
      P.tf({ label: "(f)", marks: 1, stem: "The ethyl group in the product makes the ring more reactive towards further electrophilic substitution than benzene.", answer: true, explanation: "Alkyl groups are electron-donating and activating." }),
    ],
    hints: ["AlCl₃ removes Cl⁻ to make a carbocation."],
    explanation: "C₂H₅⁺ attacks the ring; H⁺ lost; AlCl₃ regenerated; electrophilic substitution.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Methylbenzene is nitrated with a mixture of concentrated nitric acid and concentrated sulfuric acid at about 30 °C.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Give the formula of the electrophile.", accepted: ["NO2+", "NO₂⁺"], normalise: ["trim", "collapse_whitespace"], wrong: ["NO3-"], explanation: "The nitronium ion." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the intermediate formed when the electrophile attacks carbon 4 of the ring.", points: ["Carbon 4 becomes sp³, bonded to both H and NO₂", "Positive charge (four π electrons) delocalised over the other five ring carbons"], modelAnswer: "C4 is sp³ and carries H and NO₂; the remaining four π electrons and the positive charge are spread over the other five carbons." }),
      P.manual({ label: "(c)", marks: 1, stem: "Describe the final step of the mechanism.", points: ["Arrow from the C–H bond (on C4) into the ring; H⁺ lost and delocalisation restored"], modelAnswer: "The C–H bond electrons move back into the ring, restoring the delocalised system, and H⁺ is lost (it reforms H₂SO₄ with HSO₄⁻)." }),
      P.manual({ label: "(d)", marks: 2, stem: "Name the two main products.", points: ["2-nitromethylbenzene", "4-nitromethylbenzene"], modelAnswer: "2-nitromethylbenzene and 4-nitromethylbenzene." }),
    ],
    hints: ["The methyl group is 2,4-directing."],
    explanation: "NO₂⁺ attacks; sp³ carbon in the intermediate; loss of H⁺; 2- and 4-nitromethylbenzene.",
  });

  b.card("DEFINITION", "Electrophilic substitution", "An electrophile replaces an H on an aromatic ring; the delocalised ring is disrupted then restored.");
  b.card("FORMULA", "Formation of NO₂⁺", "HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻");
  b.card("FORMULA", "Formation of Br⁺", "Br₂ + FeBr₃ → Br⁺ + FeBr₄⁻ (FeBr₃ is a Lewis acid halogen carrier).");
  b.card("FORMULA", "Electrophile in Friedel-Crafts acylation", "CH₃COCl + AlCl₃ → CH₃CO⁺ + AlCl₄⁻ (acylium ion).");
  b.card("CONCEPT", "The intermediate", "One sp³ carbon carries H and the electrophile; four π electrons and the + charge are spread over five carbons.");
  b.card("CONCEPT", "Last step", "Arrow from C–H into the ring; H⁺ lost; aromatic ring restored.");
  b.card("FORMULA", "Regenerating the halogen carrier", "H⁺ + FeBr₄⁻ → FeBr₃ + HBr");
  b.card("CONCEPT", "Why substitution, not addition?", "Losing H⁺ restores the delocalised ring (about 150 kJ mol⁻¹ stabilisation); addition would lose it.");
  b.card("CONCEPT", "Why benzene needs a catalyst but alkenes do not", "Benzene's π electrons are delocalised (lower electron density) and attack costs stability, so a stronger electrophile is required.");
});
