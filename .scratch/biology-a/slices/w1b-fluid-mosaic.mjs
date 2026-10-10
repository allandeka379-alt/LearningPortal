// W1b: the fluid mosaic model and cell signalling.
import { concept, P, t, actualSize, magnification, chk, pctChange } from "../lib.mjs";

concept("abio.membranes.fluid-mosaic", { file: "membranes/fluid-mosaic", keyPrefix: "membranes.fluid-mosaic" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the fluid mosaic model, how are the phospholipid molecules arranged in the cell surface membrane?",
    options: [
      ["Two layers, with the hydrophobic tails facing each other in the middle", "Correct: the heads face the water on both sides and the tails form a non-polar core."],
      ["Two layers, with the hydrophilic heads facing each other in the middle", "The heads are polar and attract water, so they face the watery cytoplasm and tissue fluid, not the core."],
      ["One layer, with the heads facing out and the tails facing the cytoplasm", "A single layer would expose the tails to the water of the cytoplasm; with water on both sides a bilayer forms."],
      ["One layer, with the heads facing the cytoplasm and the tails facing out", "This would expose the tails to tissue fluid; there are two layers."],
    ],
    answer: "A",
    explanation: "With water on both sides of the membrane, phospholipids form a **bilayer**: hydrophilic phosphate heads face outwards on both surfaces and hydrophobic fatty acid tails meet in the middle.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which property of cholesterol explains its effect on membrane fluidity at high temperatures?",
    options: [
      ["It restricts the movement of phospholipid fatty acid tails", "Correct: lodged between the tails, cholesterol limits their movement, so the membrane does not become too fluid."],
      ["It forms covalent bonds between neighbouring phospholipid heads", "Cholesterol is not covalently bonded to phospholipids; it interacts with the tails by weak hydrophobic interactions."],
      ["It increases the number of double bonds in the fatty acid tails", "Cholesterol does not change fatty acid structure; unsaturation is a separate factor."],
      ["It carries charged ions across the bilayer in carrier proteins", "Cholesterol is a lipid, not a transport protein, and it reduces ion leakage."],
    ],
    answer: "A",
    explanation: "Cholesterol sits between fatty acid tails. At high temperature it **restricts their movement**, reducing fluidity and leakiness; at low temperature it prevents close packing so the membrane does not solidify.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which molecule would cross a phospholipid bilayer most rapidly by simple diffusion without the help of a protein?",
    options: [
      ["Oxygen", "Correct: oxygen is small and non-polar, so it dissolves in the hydrophobic core."],
      ["Glucose", "Glucose is polar and relatively large; it needs carrier proteins (such as GLUT transporters)."],
      ["Sodium ions", "Ions are charged and surrounded by water molecules, so they cannot cross the hydrophobic core; they use channels or pumps."],
      ["Amino acids", "Amino acids are polar (and usually charged at cell pH); they need carrier proteins."],
    ],
    answer: "A",
    explanation: "The hydrophobic core is a barrier to ions and polar molecules. Small **non-polar** molecules such as O₂ and CO₂ (and lipid-soluble steroid hormones) pass straight through.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where are the carbohydrate chains of glycoproteins found in the cell surface membrane?",
    options: [
      ["On the outer surface, facing the tissue fluid", "Correct: they form the glycocalyx used in recognition and adhesion."],
      ["On the inner surface, facing the cytoplasm", "Carbohydrate chains face outwards, where other cells and molecules can bind them."],
      ["In the hydrophobic core between the fatty acid tails", "Carbohydrates are polar and hydrophilic, so they cannot sit in the non-polar core."],
      ["Inside channel proteins, lining the pore", "Channel pores are lined by polar R groups of amino acids, not carbohydrate chains."],
    ],
    answer: "A",
    explanation: "Glycoproteins and glycolipids carry their carbohydrate chains on the **outside** of the cell, forming the glycocalyx. These chains act as antigens and receptors and help cells adhere.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A peptide hormone travels in the blood to every organ but affects only cells in the liver. What is the best explanation?",
    options: [
      ["Only liver cells have receptors with a shape complementary to the hormone", "Correct: a ligand only triggers a response in cells carrying its specific receptor."],
      ["Only liver cells take the hormone in by diffusion across the phospholipid bilayer", "A peptide hormone is too large and polar to diffuse across the bilayer; it acts on surface receptors."],
      ["The hormone is broken down by enzymes in every organ except the liver", "Breakdown elsewhere does not explain specificity; non-target cells lack receptors."],
      ["Only liver cells have cholesterol in their cell surface membranes", "All animal cell surface membranes contain cholesterol; it is not involved in hormone recognition."],
    ],
    answer: "A",
    explanation: "In cell signalling the ligand binds a **specific receptor** whose binding site is complementary to it. Only target cells express that receptor, so only they respond.",
    hints: ["Think about what the hormone must bind to on the target cell."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A bacterium living in hot springs has membranes with more saturated fatty acids than a related bacterium living in soil at 20 °C. Which statement explains this difference?",
    options: [
      ["Saturated tails pack closely, so the membrane does not become too fluid when hot", "Correct: straight saturated tails pack tightly, reducing fluidity, which offsets the effect of high temperature."],
      ["Saturated tails have kinks, so the membrane stays fluid at high temperatures", "Kinks are caused by C=C double bonds in unsaturated tails, not saturated ones."],
      ["Saturated tails are hydrophilic, so they bond to water in the hot spring", "Fatty acid tails are hydrophobic whether saturated or not."],
      ["Saturated tails are shorter, so the membrane is thinner and more permeable", "Saturation refers to the absence of double bonds, not chain length, and a more permeable membrane would be a disadvantage."],
    ],
    answer: "A",
    explanation: "High temperature increases kinetic energy and fluidity. Saturated fatty acid tails are straight and pack closely, which **reduces fluidity**, so the membrane keeps its structure and stays less leaky in heat.",
    hints: ["Which kind of fatty acid has kinks at C=C double bonds?", "Does high temperature make membranes more or less fluid?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What holds an intrinsic protein in position within the phospholipid bilayer?",
    options: [
      ["Hydrophobic amino acid R groups interacting with the fatty acid tails", "Correct: non-polar R groups on the part of the protein in the core interact with the tails."],
      ["Covalent bonds between the protein and the phosphate heads", "Proteins are not covalently bonded into the bilayer; they can move sideways."],
      ["Hydrogen bonds between the protein and the cholesterol molecules", "Cholesterol is not what anchors proteins; hydrophobic interactions with the tails are."],
      ["Disulfide bridges between the protein and neighbouring glycolipids", "Disulfide bridges form within or between proteins, not with lipids."],
    ],
    answer: "A",
    explanation: "Intrinsic proteins have a band of **non-polar R groups** where they cross the core, interacting with fatty acid tails, and polar R groups where they face water. This is why they stay in the membrane yet drift sideways.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Beetroot discs were kept at 25 °C in water containing increasing concentrations of ethanol. The colour of the water increased steeply above a certain ethanol concentration. Which explanation is best?",
    options: [
      ["Ethanol dissolves lipids, disrupting the tonoplast and cell surface membrane", "Correct: ethanol is a lipid solvent; it disrupts the phospholipid bilayers, so the red pigment leaks out of the vacuole."],
      ["Ethanol denatures the pigment, making it a deeper red colour", "Ethanol does not make the pigment darker; the colour change comes from more pigment escaping."],
      ["Ethanol raises the temperature of the water above 40 °C", "The discs were kept at 25 °C; the effect is chemical, not thermal."],
      ["Ethanol enters the cells by osmosis, making them swell until the cell walls burst", "Osmosis is the movement of water; plant cell walls do not burst in this way."],
    ],
    answer: "A",
    explanation: "Organic solvents such as ethanol dissolve in and disrupt the phospholipid bilayer (and can denature membrane proteins). Above a threshold concentration the tonoplast and cell surface membrane become very leaky and betalain pigment escapes.",
    hints: ["Ethanol is an organic solvent.", "Where is the red pigment stored, and what keeps it there?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the fluid mosaic model, phospholipid molecules can move sideways within their own layer of the membrane.",
    answer: true,
    explanation: "True. This sideways (lateral) movement is what 'fluid' refers to. Flipping from one layer to the other is much rarer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Steroid hormones such as oestrogen need channel proteins to enter their target cells.",
    answer: false,
    explanation: "False. Steroid hormones are lipid-soluble, so they diffuse through the phospholipid bilayer and bind to receptors **inside** the cell.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each membrane component with its main role.",
    pairs: [
      ["Cholesterol", "Regulates fluidity and reduces leakage of ions"],
      ["Channel protein", "Water-filled pore for facilitated diffusion of specific ions"],
      ["Glycolipid", "Acts as an antigen in cell recognition"],
      ["Receptor protein", "Binds a specific ligand such as a hormone"],
    ],
    explanation: "Cholesterol buffers fluidity; channel proteins provide hydrophilic pores; glycolipids (and glycoproteins) carry carbohydrate antigens; receptors bind ligands in cell signalling.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Phospholipid heads are {{blank:a}} because they contain a charged phosphate group, while the fatty acid tails are {{blank:b}}. Proteins attached only to the surface of the bilayer are called {{blank:c}} proteins.",
    blanks: [
      { id: "a", accepted: ["hydrophilic"], choices: ["hydrophilic", "hydrophobic"] },
      { id: "b", accepted: ["hydrophobic"], choices: ["hydrophilic", "hydrophobic"] },
      { id: "c", accepted: ["extrinsic"], choices: ["extrinsic", "intrinsic", "integral", "channel"] },
    ],
    explanation: "Heads are hydrophilic (polar, charged phosphate); tails are hydrophobic (non-polar hydrocarbon chains). Extrinsic (peripheral) proteins sit on a surface; intrinsic (integral) proteins are embedded.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the term for a signalling molecule, such as a hormone, that binds to a specific receptor protein on a target cell.",
    accepted: ["ligand", "a ligand", "ligands"],
    wrong: ["receptor", "antigen"],
    explanation: "A **ligand** is any molecule that binds specifically to a receptor. Hormones and neurotransmitters are ligands.",
  });
  const img = 0.6; // mm
  const mag = 80000;
  const thick = actualSize(img, "mm", mag, "nm");
  chk(thick, 7.5);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`An electron micrograph of a cell surface membrane has a magnification of $\times 80\,000$. On the micrograph the membrane is $0.6\ \text{mm}$ thick. Calculate the actual thickness of the membrane in nanometres.`,
    value: thick, unit: "nm",
    wrong: [actualSize(img, "mm", mag, "µm"), img * mag],
    explanation: t`1. Actual size = image size ÷ magnification.
2. Convert the image size: $0.6\ \text{mm} = 0.6 \times 10^{6}\ \text{nm} = 600\,000\ \text{nm}$.
3. Actual thickness $= 600\,000 \div 80\,000 = 7.5\ \text{nm}$.
4. Giving $0.0075$ forgets that the answer is wanted in nm (that is the value in µm); multiplying by the magnification inverts the formula.`,
    hints: ["Actual size = image size ÷ magnification.", "1 mm = 1 000 000 nm."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why phospholipids form a bilayer when they are mixed with water.",
    points: [
      "Phosphate heads are hydrophilic / polar and attract water (form hydrogen bonds with it)",
      "Fatty acid tails are hydrophobic / non-polar and are excluded from water",
      "With water on both sides, heads face outwards on both surfaces and tails point inwards, forming a non-polar core",
    ],
    modelAnswer: "The phosphate head is charged and hydrophilic, so it interacts with water. The two fatty acid tails are non-polar and hydrophobic, so they are excluded from water and cluster together. With water on both sides, the molecules form two layers with the heads facing the water on each side and the tails meeting in the middle.",
    explanation: "A bilayer is the arrangement that keeps every head in contact with water and every tail away from it.",
    hints: ["Consider each end of the molecule separately.", "There is water on both sides of a cell membrane."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Outline the stages of cell signalling, from the release of a peptide hormone to a response in a target cell.",
    points: [
      "The hormone / ligand is secreted by the signalling cell (by exocytosis)",
      "It is transported to target cells, for example in the blood plasma",
      "It binds to a specific receptor on the cell surface membrane whose binding site is complementary in shape",
      "Binding changes the receptor's shape and triggers a response / chain of reactions inside the cell (which may amplify the signal)",
    ],
    modelAnswer: "The signalling cell secretes the hormone by exocytosis. The hormone is carried in the blood to all tissues. On a target cell it binds to a specific receptor protein in the cell surface membrane, whose binding site has a complementary shape. Binding changes the shape of the receptor, which sets off a chain of reactions inside the cell that leads to the response.",
    explanation: "Secretion, transport, binding to a specific receptor, response inside the cell.",
    hints: ["Start with the signalling cell and end inside the target cell."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Before 1972 some biologists thought the membrane was a phospholipid bilayer sandwiched between two continuous layers of protein. Suggest how evidence that some proteins span the whole membrane, and that proteins can move sideways, supports the fluid mosaic model instead.",
    points: [
      "Proteins spanning the bilayer must be embedded in it / have hydrophobic regions in the core, not just coat the surfaces",
      "Continuous protein layers could not allow proteins to pass through the bilayer (so the sandwich model cannot explain channels or carriers)",
      "Sideways movement shows the bilayer is fluid and proteins are scattered individually (a mosaic), not fixed in sheets",
    ],
    modelAnswer: "If proteins run right through the membrane, they must sit within the bilayer with hydrophobic regions in the core, which a sandwich of continuous surface protein layers cannot explain. That they move sideways shows they float as separate units in a fluid lipid layer, scattered like a mosaic, rather than forming fixed continuous sheets.",
    explanation: "Transmembrane proteins and lateral mobility are the two observations the fluid mosaic model explains and the sandwich model does not.",
    hints: ["What would a continuous protein sheet prevent?", "What does movement tell you about the layer the proteins sit in?"],
  });

  // Practice structured: beetroot temperature data (original numbers).
  const temps = [20, 30, 40, 50, 60, 70];
  const absorb = [0.08, 0.1, 0.13, 0.42, 0.95, 1.31];
  const pc = pctChange(absorb[2], absorb[4]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: t`Rudo cut equal-sized cubes of beetroot, rinsed them, and placed them in distilled water at six temperatures for 30 minutes. She then measured the absorbance of the water with a colorimeter (higher absorbance = more red pigment in the water).

| Temperature / °C | ${temps.join(" | ")} |
|---|---|---|---|---|---|---|
| Absorbance / arbitrary units | ${absorb.map((x) => x.toFixed(2)).join(" | ")} |`,
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the independent variable in this investigation.",
        accepted: ["temperature", "the temperature", "temperature of the water"],
        wrong: ["absorbance"],
        explanation: "Temperature is the variable Rudo changed.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage increase in absorbance between 40 °C and 60 °C. Give your answer to the nearest whole number.",
        value: pc, dp: 0, unit: "%",
        wrong: [Math.round(pctChange(absorb[4], absorb[2]))],
        explanation: t`$\dfrac{0.95 - 0.13}{0.13} \times 100 = ${Math.round(pc)}\%$ (to the nearest whole number). Dividing by 0.95 instead of the starting value gives the wrong base.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe the effect of temperature on absorbance shown by the results.",
        points: [
          "Absorbance rises only slightly from 20 °C to 40 °C (0.08 to 0.13)",
          "Absorbance rises steeply above 40 °C, reaching 1.31 at 70 °C",
        ],
        modelAnswer: "Between 20 °C and 40 °C absorbance increases only slightly, from 0.08 to 0.13. Above 40 °C it rises steeply, to 0.42 at 50 °C and 1.31 at 70 °C.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the results above 40 °C.",
        points: [
          "Pigment is in the vacuole, held in by the tonoplast and cell surface membrane",
          "High temperature denatures membrane proteins / leaves gaps in the membranes",
          "Phospholipids have more kinetic energy so the bilayer becomes more fluid / leaky; more pigment leaks out",
        ],
        modelAnswer: "The red pigment is stored in the vacuole, enclosed by the tonoplast and the cell surface membrane. Above 40 °C membrane proteins denature, leaving gaps, and the phospholipids move more, so the bilayers become more fluid and leaky. Much more pigment escapes into the water, so absorbance rises steeply.",
      }),
    ],
    explanation: "Small rises at moderate temperatures come from increased fluidity; the steep rise above about 40 °C comes from denaturation of membrane proteins and disruption of the bilayers.",
    hints: ["Percentage change = (new − original) ÷ original × 100.", "Which membranes separate the pigment from the water?"],
    calculator: true,
  });

  b.struct({
    d: 4, skill: "UNDERSTANDING",
    stem: "An electron micrograph of a cell surface membrane at very high magnification shows two dark lines separated by a pale band. Freeze-fracture images of the same membrane show particles scattered across the inner face of the bilayer.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What do the two dark lines most likely represent?",
        options: [
          ["The phosphate heads of the two phospholipid layers", "Correct: the heads stain darkly with heavy metal stains; the pale band is the tails."],
          ["The two carbohydrate layers on either side", "Carbohydrate chains are only on the outer surface."],
          ["Two layers of cholesterol molecules", "Cholesterol lies among the tails in the pale band."],
          ["The inner and outer mitochondrial membranes", "This is a single cell surface membrane, not a double membrane."],
        ],
        answer: "A",
        explanation: "The polar heads take up stain and appear as two dark lines; the non-polar tails form the pale band.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the type of molecule that forms the scattered particles seen in freeze-fracture images.",
        accepted: ["protein", "proteins", "intrinsic protein", "intrinsic proteins", "integral proteins", "integral protein", "transmembrane proteins"],
        wrong: ["cholesterol"],
        explanation: "The particles are intrinsic (integral) proteins embedded in the bilayer.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the freeze-fracture evidence supports the 'mosaic' part of the model.",
        points: ["Proteins are embedded within the bilayer (not only on the surfaces)", "They are scattered irregularly / in a pattern among the phospholipids, like a mosaic"],
        modelAnswer: "The particles show proteins sitting within the bilayer itself, scattered irregularly among the phospholipids rather than in continuous sheets, which is the mosaic pattern.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State two roles of glycoproteins in the cell surface membrane.",
        points: ["Cell recognition / acting as antigens (self and non-self)", "Receptors for hormones or other ligands, or cell adhesion"],
        modelAnswer: "Glycoproteins act as antigens for cell recognition and as receptors for hormones; they also help cells stick together.",
      }),
    ],
    explanation: "Stained heads make the 'railway track' appearance; freeze-fracture reveals proteins embedded in the bilayer in a mosaic.",
    hints: ["Which part of a phospholipid is polar and takes up stain?"],
  });

  b.card("DEFINITION", "What is the **fluid mosaic model**?", "A model of membrane structure: a fluid phospholipid bilayer with proteins of many kinds scattered through it like a mosaic, plus cholesterol, glycolipids and glycoproteins.");
  b.card("CONCEPT", "Why do phospholipids form a **bilayer** in water?", "Hydrophilic heads face the water on both sides; hydrophobic tails are excluded from water and meet in the middle.");
  b.card("CONCEPT", "What does **cholesterol** do in a membrane?", "Restricts tail movement at high temperature (less fluid) and stops close packing at low temperature (stays fluid); reduces leakage of ions and water.");
  b.card("DEFINITION", "**Intrinsic** versus **extrinsic** protein", "Intrinsic: embedded in the bilayer, often spanning it (channels, carriers, receptors). Extrinsic: attached to one surface only.");
  b.card("FACT", "Which molecules cross the bilayer without a protein?", "Small non-polar molecules such as O₂ and CO₂, and lipid-soluble ones such as steroid hormones.");
  b.card("CONCEPT", "Roles of **glycoproteins** and **glycolipids**", "Carbohydrate chains on the outside act as antigens (cell recognition), receptors and adhesion sites.");
  b.card("CONCEPT", "Stages of **cell signalling**", "Ligand secreted → transported (e.g. in blood) → binds a specific complementary receptor → shape change triggers a response inside the cell.");
  b.card("CONCEPT", "How does fatty acid saturation affect fluidity?", "Unsaturated tails have kinks (C=C), pack loosely: more fluid. Saturated tails are straight, pack closely: less fluid.");
  b.card("FACT", "How thick is a cell surface membrane?", "About 7-10 nm: visible only with an electron microscope.");
});
