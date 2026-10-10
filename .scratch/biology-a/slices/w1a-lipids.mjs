// W1a: triglycerides and phospholipids.
import { concept, P, t, chk } from "../lib.mjs";

const Mr = ({ C = 0, H = 0, O = 0 }) => C * 12 + H + O * 16;
const GLYCEROL = Mr({ C: 3, H: 8, O: 3 });

concept("abio.molecules.lipids", { file: "molecules/lipids", keyPrefix: "molecules.lipids" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which bond joins a fatty acid to glycerol in a triglyceride?",
    options: [
      ["Ester bond", "Correct: the –COOH of the fatty acid condenses with an –OH of glycerol."],
      ["Glycosidic bond", "Glycosidic bonds join monosaccharides."],
      ["Peptide bond", "Peptide bonds join amino acids."],
      ["Hydrogen bond", "Hydrogen bonds are weak attractions, not the covalent link in a triglyceride."],
    ],
    answer: "A",
    explanation: "Each of the three fatty acids is joined to glycerol by an ester bond formed in a condensation reaction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many molecules of water are released when one triglyceride is formed?",
    options: [
      ["Three", "Correct: one water for each of the three ester bonds."],
      ["One", "One water is released per ester bond, and a triglyceride has three."],
      ["Two", "This would be a diglyceride with two fatty acids."],
      ["Four", "Glycerol has only three –OH groups, so only three ester bonds can form."],
    ],
    answer: "A",
    explanation: "Glycerol + 3 fatty acids → triglyceride + 3 H₂O. Hydrolysis needs three water molecules.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are triglycerides rich in unsaturated fatty acids usually liquid at room temperature?",
    options: [
      ["C=C double bonds kink the chains, so they cannot pack closely together", "Correct: loose packing lowers the melting point, giving oils."],
      ["Unsaturated fatty acids are shorter than saturated fatty acids", "Chain length is not what distinguishes them; the double bonds are."],
      ["Unsaturated fatty acids form hydrogen bonds with water", "Hydrocarbon chains are non-polar whether saturated or not."],
      ["Unsaturated fatty acids contain more hydrogen atoms", "Unsaturated chains contain fewer hydrogen atoms than saturated ones."],
    ],
    answer: "A",
    explanation: "Saturated chains are straight and pack tightly (solid fats). Each C=C bond bends the chain, so molecules cannot pack closely and the melting point falls (oils).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which part of a phospholipid is hydrophilic?",
    options: [
      ["The phosphate head", "Correct: the charged phosphate group is attracted to water."],
      ["The fatty acid tails", "The hydrocarbon tails are non-polar and hydrophobic."],
      ["The C=C double bonds", "Double bonds in the tails do not make them hydrophilic."],
      ["The ester bonds only", "The ester bonds link the parts; the charged phosphate makes the head hydrophilic."],
    ],
    answer: "A",
    explanation: "Phospholipids are amphipathic: a hydrophilic (charged) phosphate head and two hydrophobic fatty acid tails.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Phospholipids are shaken with water. Which arrangement forms when they are completely surrounded by water?",
    options: [
      ["A bilayer with heads facing the water on both sides and tails pointing inwards", "Correct: tails are hidden from water inside; heads face water on both surfaces."],
      ["A bilayer with tails facing the water on both sides and heads pointing inwards", "Hydrophobic tails are repelled by water, so they would not face it."],
      ["A single layer with tails dissolved in the water and heads in the air", "Tails do not dissolve in water; at an air-water surface the heads are in the water."],
      ["Separate molecules dissolved evenly through the water", "Phospholipids do not dissolve; they cluster to hide their tails."],
    ],
    answer: "A",
    explanation: "Surrounded by water, phospholipids form a bilayer: hydrophilic heads face the water on each side; hydrophobic tails face each other in the middle.",
    hints: ["Which part is attracted to water, and which is repelled?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do lipids release more energy per gram than carbohydrates when respired?",
    options: [
      ["They have a higher proportion of C–H bonds and less oxygen per gram", "Correct: more hydrogen per gram means more reduced NAD/FAD and more ATP from oxidative phosphorylation."],
      ["They are larger molecules, so each molecule contains more atoms", "Energy per gram does not depend on molecular size."],
      ["They are insoluble, so they cannot be lost from cells by diffusion", "Insolubility suits storage but does not change the energy released per gram."],
      ["They are respired anaerobically, which releases more energy", "Fatty acids are respired aerobically; anaerobic respiration releases less energy."],
    ],
    answer: "A",
    explanation: "Lipids are more reduced (many C–H bonds, little oxygen), so their oxidation releases about 37–39 kJ/g compared with about 16–17 kJ/g for carbohydrate.",
    hints: ["Compare the proportions of hydrogen and oxygen."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Camels can go for long periods without drinking. Which property of the fat in a camel's hump is most directly involved?",
    options: [
      ["Its oxidation in respiration releases a large amount of metabolic water", "Correct: respiring fat produces water as well as energy, although extra oxygen must be breathed in."],
      ["It is less dense than water, giving buoyancy when the camel swims", "Buoyancy matters to aquatic animals, not to water balance in camels."],
      ["It insulates the whole body against heat from the desert sand", "The hump concentrates fat in one place, allowing heat loss from the rest of the body; this is not about water."],
      ["It absorbs water from the blood and stores it in the hump", "Fat is hydrophobic and does not store water."],
    ],
    answer: "A",
    explanation: "Each gram of fat respired releases more metabolic water than a gram of carbohydrate. (The water gain is partly offset by water lost in breathing, but metabolic water is the property asked about.)",
    hints: ["What is produced when fat is respired?"],
  });
  const trip = GLYCEROL + 3 * Mr({ C: 16, H: 32, O: 2 }) - 3 * 18;
  chk(trip, 806);
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "Palmitic acid has the formula C₁₆H₃₂O₂ and glycerol is C₃H₈O₃. Using C = 12, H = 1 and O = 16, calculate the relative molecular mass of a triglyceride made of glycerol and three palmitic acids.",
    value: trip,
    wrong: ["860", "842"],
    explanation: t`1. Palmitic acid: $16 \times 12 + 32 \times 1 + 2 \times 16 = 256$.
2. Glycerol: $3 \times 12 + 8 + 3 \times 16 = 92$.
3. Total before condensation: $92 + 3 \times 256 = 860$.
4. Three ester bonds release $3 \times 18 = 54$: $860 - 54 = 806$.
5. Forgetting the water gives 860; removing only one water gives 842.`,
    hints: ["Find the Mr of each component first.", "How many water molecules are lost?"],
  });
  const fatE = 25 * 37;
  const carbM = fatE / 16;
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A seed stores 25 g of lipid, which releases about 37 kJ/g when respired. Carbohydrate releases about 16 kJ/g. Calculate the mass of carbohydrate, in g, that would release the same energy. Give your answer to three significant figures.",
    value: carbM, unit: "g", sf: 3,
    wrong: ["10.8", "925"],
    explanation: "Energy = 25 × 37 = 925 kJ; mass of carbohydrate = 925 ÷ 16 = 57.8 g. Dividing the other way (25 × 16 ÷ 37) gives 10.8 g.",
    hints: ["Find the total energy in the lipid first."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lipids are soluble in ethanol but insoluble in water.",
    answer: true,
    explanation: "True. This is the basis of the emulsion test: dissolve in ethanol, then add water to form a milky emulsion.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A triglyceride is a polymer of fatty acids.",
    answer: false,
    explanation: "False. A triglyceride is one glycerol joined to three fatty acids; it is not built of many repeating monomer units, so it is not a polymer.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each property of triglycerides with the function it suits.",
    pairs: [
      ["Poor conductor of heat", "Insulation under the skin"],
      ["Less dense than water", "Buoyancy in aquatic animals"],
      ["High proportion of C–H bonds", "Compact energy store"],
      ["Much water produced on oxidation", "Metabolic water for desert animals"],
    ],
    explanation: "Each property links to one function: heat insulation, buoyancy, energy storage and metabolic water.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of a phospholipid.",
    template: "A phospholipid has {{blank:a}} fatty acid tails, which are {{blank:b}}, and a phosphate head, which is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["two"], choices: ["one", "two", "three", "four"] },
      { id: "b", accepted: ["hydrophobic"], choices: ["hydrophobic", "hydrophilic"] },
      { id: "c", accepted: ["hydrophilic"], choices: ["hydrophobic", "hydrophilic"] },
    ],
    explanation: "Two hydrophobic fatty acid tails and one hydrophilic phosphate-containing head.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the enzyme that hydrolyses triglycerides into glycerol and fatty acids.",
    accepted: ["lipase", "lipases"],
    wrong: ["amylase", "protease"],
    explanation: "**Lipase** hydrolyses ester bonds in triglycerides.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a triglyceride is formed from its components.",
    points: [
      "One glycerol and three fatty acids",
      "–COOH (carboxyl) group of each fatty acid reacts with an –OH group of glycerol",
      "Condensation reaction releasing water (three water molecules in total)",
      "Forming three ester bonds",
    ],
    modelAnswer: "A triglyceride forms from one glycerol molecule and three fatty acids. The carboxyl group of each fatty acid reacts with one of the three hydroxyl groups of glycerol in a condensation reaction, releasing a molecule of water each time, so three water molecules are released and three ester bonds are formed.",
    explanation: "Components, groups, reaction type and bond.",
    hints: ["Which groups react, and what is removed?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why phospholipids form a bilayer when surrounded by water.",
    points: [
      "Phosphate heads are hydrophilic / charged / polar and are attracted to water",
      "Fatty acid tails are hydrophobic / non-polar and are repelled by water",
      "So two layers form with heads facing the water on each side and tails facing each other inside, away from water",
    ],
    modelAnswer: "The phosphate heads are charged and hydrophilic, so they are attracted to water, while the fatty acid tails are non-polar and hydrophobic. Surrounded by water, two layers form: heads point outwards into the water on both sides, and the tails point inwards towards each other, shielded from water.",
    explanation: "Link each part's property to its position in the bilayer.",
    hints: ["Which part wants to be near water?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Many small wind-dispersed seeds store lipid, whereas many large seeds such as maize store starch. Suggest the advantages of each type of store.",
    points: [
      "Lipid releases about twice as much energy per gram as starch",
      "So a lipid store is lighter for the same energy: small seeds stay light enough for wind dispersal",
      "Starch is hydrolysed rapidly to glucose / glucose can be used directly in glycolysis, including anaerobically when oxygen is short",
      "Starch formed directly from glucose of photosynthesis / large seeds do not need to be light, so cheaper store (or starch also insoluble and compact)",
    ],
    modelAnswer: "A gram of lipid releases about twice as much energy as a gram of starch, so a lipid store is lighter for the same energy, which suits small seeds that must be carried by wind. Starch is easily hydrolysed to glucose, which can be respired directly, even anaerobically if the soil is waterlogged during germination; it is made directly from the glucose of photosynthesis, and large seeds such as maize do not need to be light.",
    explanation: "A *suggest* item: credit valid points on both stores.",
    hints: ["Compare energy per gram and how quickly each can be used."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A biochemist hydrolysed 1 mole of a lipid X. The products were 1 mole of glycerol, 2 moles of fatty acids and 1 mole of a phosphate-containing compound.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What type of lipid is X?", options: [["A phospholipid", "Correct: glycerol + two fatty acids + phosphate."], ["A triglyceride", "A triglyceride gives three fatty acids and no phosphate."], ["A steroid", "Steroids are ring-based lipids, not built on glycerol."], ["A polysaccharide", "Polysaccharides are carbohydrates, not lipids."]], answer: "A", explanation: "Two fatty acids and a phosphate group on glycerol: a phospholipid." }),
      P.num({ label: "(b)", marks: 1, stem: "How many moles of water were needed for the complete hydrolysis of 1 mole of X?", value: 3, wrong: ["2"], explanation: "Three bonds join glycerol to its three groups (two ester bonds with fatty acids and one with the phosphate group), so three water molecules are needed." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how the structure of X allows it to form the basis of cell membranes.", points: ["Phosphate head hydrophilic, fatty acid tails hydrophobic", "Form a bilayer with heads facing the aqueous cytoplasm and tissue fluid, tails inwards", "Hydrophobic core is a barrier to ions / polar (water-soluble) molecules"], modelAnswer: "Phospholipids have a hydrophilic phosphate head and two hydrophobic tails, so in water they form a bilayer with heads facing the watery cytoplasm and tissue fluid and tails inside. The hydrophobic core stops ions and polar molecules passing freely, so the membrane controls what enters and leaves." }),
      P.manual({ label: "(d)", marks: 3, stem: "One of the two fatty acids in X has two C=C double bonds. State the term for this fatty acid and explain its likely effect on a membrane.", points: ["Polyunsaturated (unsaturated)", "Double bonds kink the tail so phospholipids cannot pack closely", "Membrane more fluid (flexible) / remains fluid at lower temperatures"], modelAnswer: "It is a polyunsaturated fatty acid. Its double bonds put kinks in the tail, so the phospholipids pack less tightly and the membrane is more fluid, staying fluid at low temperatures." }),
    ],
    explanation: "Hydrolysis products identify a phospholipid; its amphipathic structure explains bilayers, and unsaturated tails increase fluidity.",
    hints: ["Which lipid contains phosphate?"],
  });

  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "The table describes the fatty acids in two triglycerides found in a kitchen in Gweru.\n\n| Triglyceride | Source | C=C double bonds per fatty acid | State at 25 °C |\n|---|---|---|---|\n| P | Beef fat | 0 | Solid |\n| Q | Groundnut oil | 1 or 2 | Liquid |",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which term describes the fatty acids in P?", options: [["Saturated", "Correct: no C=C double bonds."], ["Monounsaturated", "Monounsaturated fatty acids have one C=C bond."], ["Polyunsaturated", "Polyunsaturated fatty acids have two or more C=C bonds."], ["Hydrophilic", "Fatty acid tails are hydrophobic."]], answer: "A", explanation: "No double bonds: saturated." }),
      P.num({ label: "(b)", marks: 1, stem: "How many molecules of water are needed to hydrolyse 4 molecules of Q completely?", value: 12, wrong: ["4", "3"], explanation: "Each triglyceride has three ester bonds: 4 × 3 = 12." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why Q is liquid but P is solid at 25 °C.", points: ["C=C double bonds in Q put kinks in the chains", "So Q's molecules cannot pack closely together, lowering the melting point (P's straight chains pack tightly)"], modelAnswer: "The double bonds in Q's fatty acids kink the chains, so the molecules cannot pack closely and the melting point is low; P's saturated chains are straight and pack tightly, so P is solid." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why triglycerides such as P are a good energy store in animals.", points: ["Release about twice as much energy per gram as carbohydrate (many C–H bonds)", "Insoluble, so stored without affecting water potential (also insulate / compact)"], modelAnswer: "Triglycerides release about twice as much energy per gram as carbohydrate because they have many C–H bonds, and being insoluble they can be stored in large amounts without affecting the water potential of cells." }),
    ],
    explanation: "Saturation determines packing and melting point; three ester bonds per triglyceride; triglycerides are compact, insoluble, energy-rich stores.",
    hints: ["What does a C=C bond do to the shape of a chain?"],
  });

  b.card("DEFINITION", "Define **triglyceride**.", "A lipid made of one glycerol and three fatty acids joined by ester bonds.");
  b.card("FACT", "Bond between glycerol and a fatty acid?", "Ester bond, formed by condensation (water released).");
  b.card("CONCEPT", "Saturated v unsaturated fatty acids?", "Saturated: no C=C, straight chains, pack tightly (solid fats). Unsaturated: C=C bonds kink chains (oils).");
  b.card("FACT", "Energy per gram: lipid v carbohydrate?", "Lipid about 37–39 kJ/g; carbohydrate about 16–17 kJ/g.");
  b.card("CONCEPT", "Functions of triglycerides?", "Energy store, heat insulation, buoyancy, protection of organs, metabolic water, electrical insulation (myelin).");
  b.card("DEFINITION", "Structure of a phospholipid?", "Glycerol + two fatty acids (hydrophobic tails) + phosphate group (hydrophilic head).");
  b.card("CONCEPT", "Why do phospholipids form bilayers in water?", "Hydrophilic heads face water on both sides; hydrophobic tails face inwards away from water.");
  b.card("FACT", "Water released when one triglyceride forms?", "Three molecules (one per ester bond).");
  b.card("DEFINITION", "What is a lipid?", "An organic molecule insoluble in water but soluble in organic solvents such as ethanol.");
});
