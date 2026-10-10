// W1a: monosaccharides, disaccharides and the glycosidic bond.
import { concept, P, t, chk } from "../lib.mjs";

const Mr = ({ C = 0, H = 0, O = 0 }) => C * 12 + H * 1 + O * 16;
const GLU = Mr({ C: 6, H: 12, O: 6 });
const WATER = Mr({ H: 2, O: 1 });

concept("abio.molecules.carbohydrates", { file: "molecules/carbohydrates", keyPrefix: "molecules.carbohydrates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pair of monosaccharides forms sucrose?",
    options: [
      ["Glucose and fructose", "Correct: sucrose is α-glucose joined to fructose."],
      ["Glucose and glucose", "Two α-glucose molecules form maltose."],
      ["Glucose and galactose", "Glucose and galactose form lactose."],
      ["Fructose and galactose", "These do not combine to form any of the three common disaccharides."],
    ],
    answer: "A",
    explanation: "Maltose = glucose + glucose; sucrose = glucose + fructose; lactose = glucose + galactose.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does β-glucose differ from α-glucose?",
    options: [
      ["The –OH group on carbon 1 is above the ring instead of below it", "Correct: only the position of the OH on carbon 1 differs."],
      ["It has five carbon atoms in its ring instead of six", "Both have a ring of five carbons and one oxygen; both are hexoses with six carbons in total."],
      ["The –CH₂OH group on carbon 5 is below the ring instead of above it", "Carbon 6 (the CH₂OH) is above the ring in both forms."],
      ["It has the formula C₆H₁₀O₅ instead of C₆H₁₂O₆", "Both have the same formula, C₆H₁₂O₆; they are isomers."],
    ],
    answer: "A",
    explanation: "α- and β-glucose are isomers: same formula, OH on carbon 1 below (α) or above (β) the plane of the ring.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement correctly describes the formation of a glycosidic bond?",
    options: [
      ["A condensation reaction in which a molecule of water is removed", "Correct: two –OH groups react; H₂O is released and C–O–C links the sugars."],
      ["A hydrolysis reaction in which a single molecule of water is removed", "Hydrolysis adds water and breaks bonds."],
      ["A condensation reaction in which a molecule of water is added", "Condensation releases water; it does not add it."],
      ["A hydrolysis reaction in which a molecule of water is added", "This describes breaking a glycosidic bond, not forming one."],
    ],
    answer: "A",
    explanation: "Condensation: bond formed, water removed. Hydrolysis: water added, bond broken.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which sugar is a pentose?",
    options: [
      ["Ribose", "Correct: ribose has five carbon atoms (C₅H₁₀O₅)."],
      ["Glucose", "Glucose is a hexose (six carbons)."],
      ["Fructose", "Fructose is a hexose (six carbons)."],
      ["Maltose", "Maltose is a disaccharide with twelve carbons."],
    ],
    answer: "A",
    explanation: "Pentoses (5C): ribose and deoxyribose, found in RNA and DNA. Hexoses (6C): glucose, fructose, galactose.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is sucrose a non-reducing sugar?",
    options: [
      ["Its glycosidic bond uses the reactive groups of both glucose and fructose", "Correct: carbon 1 of glucose bonds to carbon 2 of fructose, so no free reducing group remains."],
      ["It contains fructose, and fructose on its own is not a reducing sugar at all", "Fructose on its own is a reducing sugar."],
      ["It is too large a molecule to react with copper(II) ions", "Maltose and lactose are the same size and are reducing sugars."],
      ["It is insoluble in water, so it cannot mix with Benedict's", "Sucrose is very soluble in water."],
    ],
    answer: "A",
    explanation: "In maltose and lactose one unit keeps a free carbon 1, so they reduce Benedict's. In sucrose both reactive carbons are in the bond. Acid hydrolysis frees them.",
    hints: ["Which carbons are used to make the bond in sucrose?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A chain of 12 glucose molecules is formed by condensation. How many molecules of water are released?",
    options: [
      ["11", "Correct: a chain of n units has n − 1 bonds, and each bond releases one water molecule."],
      ["12", "This assumes one water per glucose; the end units each make only one bond."],
      ["24", "This counts two waters per glucose; each bond releases only one."],
      ["6", "This would be the number of disaccharide pairs, not the number of bonds in a single chain."],
    ],
    answer: "A",
    explanation: "Twelve units in a single unbranched chain are joined by 11 glycosidic bonds, so 11 molecules of water are released (and 11 would be needed to hydrolyse it completely).",
    hints: ["Count the bonds, not the units."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A sample of a disaccharide gives a positive Benedict's test. After complete hydrolysis, the products are found to be glucose only. Which disaccharide was it?",
    options: [
      ["Maltose", "Correct: maltose is reducing and is hydrolysed to two glucose molecules."],
      ["Sucrose", "Sucrose is non-reducing and hydrolyses to glucose and fructose."],
      ["Lactose", "Lactose is reducing but hydrolyses to glucose and galactose."],
      ["Cellulose", "Cellulose is a polysaccharide, not a disaccharide, and does not dissolve to give a positive Benedict's test."],
    ],
    answer: "A",
    explanation: "Reducing + glucose only → maltose. Lactose also gives galactose; sucrose gives fructose and is non-reducing.",
    hints: ["Use both pieces of evidence: reducing and the products."],
  });
  const sucr = Mr({ C: 12, H: 22, O: 11 });
  chk(sucr, 2 * GLU - WATER);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The relative molecular mass of glucose is 180 and that of fructose is also 180. Calculate the relative molecular mass of sucrose formed from them by condensation (water has Mr 18).",
    value: sucr,
    wrong: ["360", "378"],
    explanation: "180 + 180 − 18 = 342. Forgetting to remove water gives 360; adding it gives 378.",
  });
  const n = 40;
  const poly = n * GLU - (n - 1) * WATER;
  chk(poly, 6498);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Calculate the relative molecular mass of an unbranched chain of 40 glucose molecules (glucose Mr = 180; water Mr = 18).",
    value: poly,
    wrong: ["6480", "7200"],
    explanation: t`1. Mass of 40 glucose units: $40 \times 180 = 7200$.
2. A chain of 40 units has 39 glycosidic bonds, so 39 water molecules are removed: $39 \times 18 = 702$.
3. $M_r = 7200 - 702 = 6498$.
4. Subtracting 40 waters (720) gives 6480; forgetting the water gives 7200.`,
    hints: ["How many bonds join 40 units in a line?"],
  });
  const tri = Mr({ C: 6, H: 12, O: 6 }) * 3 - 2 * WATER;
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Raffinose is a trisaccharide made from three hexose units (each Mr 180) joined by condensation. Calculate its relative molecular mass (water Mr 18).",
    value: tri,
    wrong: ["522", "540"],
    explanation: "3 × 180 = 540; two bonds release 2 × 18 = 36; 540 − 36 = 504. Removing only one water gives 522.",
    hints: ["Three units in a chain are joined by two bonds."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lactose is a disaccharide found in milk.",
    answer: true,
    explanation: "True. Lactose (glucose + galactose) is the main sugar in milk; it is hydrolysed by the enzyme lactase.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Hydrolysis of a glycosidic bond removes a molecule of water.",
    answer: false,
    explanation: "False. Hydrolysis **adds** water to break the bond; condensation removes water to form it.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each disaccharide with the monosaccharides that form it.",
    pairs: [
      ["Maltose", "α-glucose + α-glucose"],
      ["Sucrose", "α-glucose + fructose"],
      ["Lactose", "Glucose + galactose"],
    ],
    extraRight: ["Fructose + galactose"],
    explanation: "Maltose: two glucose; sucrose: glucose + fructose; lactose: glucose + galactose.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "In maltose the two glucose units are joined by an {{blank:a}} glycosidic bond between carbon 1 of one glucose and carbon {{blank:b}} of the other. The enzyme that hydrolyses maltose is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["alpha"], choices: ["alpha", "beta", "ester", "peptide"] },
      { id: "b", accepted: ["4"], choices: ["2", "4", "5", "6"] },
      { id: "c", accepted: ["maltase"], choices: ["maltase", "amylase", "lactase", "sucrase"] },
    ],
    explanation: "Maltose has an α-1,4 glycosidic bond, hydrolysed by maltase. Amylase hydrolyses starch to maltose.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the name of the bond that joins two monosaccharides.",
    accepted: ["glycosidic bond", "glycosidic", "glycosidic linkage", "a glycosidic bond"],
    wrong: ["peptide bond", "ester bond", "hydrogen bond"],
    explanation: "A **glycosidic bond** (C–O–C) is formed by condensation between two sugars.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the general formula of a monosaccharide.",
    accepted: ["(CH2O)n", "CnH2nOn", "(CH₂O)n", "(CH2O)x"],
    normalise: ["trim", "lowercase", "remove_whitespace"],
    wrong: ["C6H12O6"],
    explanation: "Monosaccharides have the general formula **(CH₂O)ₙ**, with n from 3 to 7. C₆H₁₂O₆ is glucose specifically (n = 6).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how two α-glucose molecules join to form maltose and how maltose is broken down again.",
    points: [
      "The –OH on carbon 1 of one α-glucose reacts with the –OH on carbon 4 of the other",
      "Condensation reaction: a molecule of water is removed",
      "Forming an α-1,4 glycosidic bond (C–O–C)",
      "Hydrolysis: water is added to break the bond, catalysed by maltase (or by boiling with acid)",
    ],
    modelAnswer: "The hydroxyl group on carbon 1 of one α-glucose reacts with the hydroxyl group on carbon 4 of a second α-glucose. A molecule of water is removed in this condensation reaction, leaving an α-1,4 glycosidic bond. Maltose is broken down by hydrolysis: a molecule of water is added to the bond, a reaction catalysed by maltase in the small intestine (or by boiling with acid).",
    explanation: "Name the carbons, the reaction type, the water and the bond.",
    hints: ["Which carbons take part, and what is lost?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest why sucrose rather than glucose is the main sugar transported in the phloem of plants such as sugar cane.",
    points: [
      "Sucrose is non-reducing so it is less reactive / is not used up (metabolised) by cells on the way",
      "Sucrose is still very soluble, so it can be transported in solution in phloem sap",
      "Disaccharide carries twice as many sugar units per molecule, so less osmotic effect for the same energy (or transported energy per solute particle greater)",
    ],
    modelAnswer: "Sucrose is non-reducing, so it is chemically less reactive and is less likely to be used in reactions by the cells it passes on its way. It is highly soluble, so it is easily carried in phloem sap. Each sucrose molecule carries two hexose units, so more sugar is transported for a smaller effect on water potential.",
    explanation: "A *suggest* item: any three valid reasons.",
    hints: ["Think about reactivity, solubility and osmotic effect."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Three unlabelled sugar solutions, X, Y and Z, are each known to be one of maltose, sucrose and lactose. A student carries out tests.\n\n| Solution | Benedict's (heated) | Products after complete hydrolysis |\n|---|---|---|\n| X | Blue | Glucose and fructose |\n| Y | Brick-red | Glucose only |\n| Z | Brick-red | Glucose and galactose |",
    parts: [
      P.match({ label: "(a)", marks: 3, stem: "Identify X, Y and Z.", pairs: [["X", "Sucrose"], ["Y", "Maltose"], ["Z", "Lactose"]], explanation: "X: non-reducing, glucose + fructose = sucrose. Y: reducing, glucose only = maltose. Z: reducing, glucose + galactose = lactose." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why X gave a negative result with Benedict's solution, but its hydrolysis products would give a positive result.", points: ["The glycosidic bond in sucrose involves carbon 1 of glucose and carbon 2 of fructose", "So there is no free reducing group to reduce copper(II) ions", "Hydrolysis breaks the bond and frees the reducing groups of glucose and fructose (both reducing sugars)"], modelAnswer: "In sucrose the glycosidic bond joins carbon 1 of glucose to carbon 2 of fructose, so both reducing groups are used and none can reduce the copper(II) ions in Benedict's solution. Hydrolysis breaks this bond, releasing glucose and fructose, which are both reducing sugars." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe how the student could hydrolyse solution X and show that reducing sugars had been produced.", points: ["Boil X with dilute hydrochloric acid", "Cool and neutralise with sodium hydrogencarbonate", "Benedict's test with heating gives brick-red / orange precipitate", "Control: an unhydrolysed sample of X (or acid + alkali + water only) tested in the same way stays blue"], modelAnswer: "Boil a sample of X with dilute hydrochloric acid, cool it, neutralise with sodium hydrogencarbonate, then add Benedict's solution and heat; a brick-red precipitate shows reducing sugars. A sample of X that was not hydrolysed, tested the same way, stays blue as a control." }),
      P.num({ label: "(d)", marks: 1, stem: "The Mr of each monosaccharide is 180 and of water 18. Calculate the Mr of Z.", value: 2 * GLU - WATER, wrong: ["360"], explanation: "180 + 180 − 18 = 342." }),
      P.mcq({
        label: "(e)", marks: 1, stem: "Which enzyme would hydrolyse Z?",
        options: [["Lactase", "Correct: lactase hydrolyses lactose."], ["Maltase", "Maltase hydrolyses maltose."], ["Sucrase", "Sucrase hydrolyses sucrose."], ["Amylase", "Amylase hydrolyses starch."]],
        answer: "A", explanation: "Enzymes are specific: lactase for lactose.",
      }),
    ],
    explanation: "Combine the reducing property with the hydrolysis products to identify each disaccharide.",
    hints: ["Which disaccharide is non-reducing?"],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A dairy in Mutare makes lactose-reduced milk by adding the enzyme lactase. Rudo tests samples of milk before and after treatment.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which products are formed when lactase acts on lactose?", options: [["Glucose and galactose", "Correct: lactose is glucose joined to galactose."], ["Glucose and fructose", "These are the products of sucrose hydrolysis."], ["Two glucose molecules", "These are the products of maltose hydrolysis."], ["Glycerol and fatty acids", "These are the products of lipid hydrolysis."]], answer: "A", explanation: "Lactose = glucose + galactose." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the type of reaction catalysed by lactase.", accepted: ["hydrolysis", "a hydrolysis reaction", "hydrolysis reaction"], explanation: "Water is added to break the glycosidic bond: hydrolysis." }),
      P.manual({ label: "(c)", marks: 2, stem: "Both untreated and treated milk give a positive Benedict's test. Explain why.", points: ["Lactose is a reducing sugar (one unit has a free reactive carbon 1)", "Glucose and galactose (products) are also reducing sugars"], modelAnswer: "Lactose is itself a reducing sugar, because one of its units has a free reactive group, and its products, glucose and galactose, are also reducing sugars." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how a semi-quantitative Benedict's test could show that lactase had acted.", points: ["Treated milk gives a stronger colour / more precipitate / shorter time to colour change under standardised conditions", "Because each lactose gives two reducing monosaccharides, so more reducing groups per volume"], modelAnswer: "Under identical conditions the treated milk would give more precipitate (a colour further towards brick-red) or change colour sooner, because each lactose molecule has become two reducing sugars." }),
    ],
    explanation: "Lactase hydrolyses lactose into glucose and galactose; all three are reducing sugars, but hydrolysis increases the number of reducing groups.",
    hints: ["Which sugars reduce Benedict's solution?"],
  });

  b.card("DEFINITION", "Define **monomer** and **polymer**.", "Monomer: small unit that can join to similar units. Polymer: large molecule of many repeating monomers joined by covalent bonds.");
  b.card("CONCEPT", "α-glucose versus β-glucose?", "Same formula; the OH on carbon 1 is below the ring in α and above it in β.");
  b.card("DEFINITION", "What is a condensation reaction?", "A reaction joining two molecules with the removal of a water molecule (e.g. forming a glycosidic bond).");
  b.card("DEFINITION", "What is hydrolysis?", "Breaking a bond by adding a molecule of water.");
  b.card("FACT", "Monosaccharides of maltose, sucrose and lactose?", "Maltose: glucose + glucose. Sucrose: glucose + fructose. Lactose: glucose + galactose.");
  b.card("FACT", "Which common disaccharide is non-reducing?", "Sucrose.");
  b.card("FORMULA", "General formula of a monosaccharide?", "(CH₂O)ₙ, n = 3 to 7.");
  b.card("FACT", "Mr of glucose and of maltose?", "Glucose 180; maltose 342 (2 × 180 − 18).");
  b.card("FACT", "Examples of pentoses and hexoses?", "Pentoses: ribose, deoxyribose. Hexoses: glucose, fructose, galactose.");
});
