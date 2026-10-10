// W1a: temporary preparations, plant and animal cells in micrographs.
import { concept, P, t, chk, convert, magnification } from "../lib.mjs";

concept("abio.cells.slides-and-cells", { file: "cells/slides-and-cells", keyPrefix: "cells.slides-and-cells" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Why is a stain such as iodine solution added to a temporary mount of onion epidermis?",
    options: [
      ["To increase contrast so that nearly transparent structures become visible", "Correct: onion bulb cells are colourless, so the stain makes the nucleus and walls show up."],
      ["To fix the cells so that they do not decay while being examined", "Fixing preserves cells for permanent slides; it is not the purpose of a stain in a wet mount."],
      ["To increase the resolution of the light microscope at high power", "Resolution depends on the wavelength of light, not on the stain used."],
      ["To make the cells take up water so that they become turgid and lie flat on the slide", "Stains do not work osmotically; a single layer is flat because it is thin."],
    ],
    answer: "A",
    explanation: "Stains bind to particular components (iodine to starch and to nuclei and walls; methylene blue to nuclei and cytoplasm), increasing contrast. They do not change resolution.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which structure is present in a typical animal cell but **absent** from a typical flowering-plant cell?",
    options: [
      ["Centrioles", "Correct: flowering plants lack centrioles; animal cells have a pair near the nucleus."],
      ["Mitochondria", "Both plant and animal cells respire aerobically in mitochondria."],
      ["Golgi body", "Both cell types have a Golgi body for modifying and packaging proteins."],
      ["Ribosomes", "Every cell, plant or animal (and prokaryotic), has ribosomes for protein synthesis."],
    ],
    answer: "A",
    explanation: "Animal-only: centrioles. Plant-only: cellulose cell wall, plasmodesmata, chloroplasts (in photosynthetic cells) and a large permanent vacuole with a tonoplast. Mitochondria, ribosomes, ER and Golgi occur in both.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the coverslip lowered onto a wet mount at an angle using a mounted needle?",
    options: [
      ["To prevent air bubbles from being trapped under it", "Correct: air bubbles appear as dark-ringed circles that hide cells and can be mistaken for structures."],
      ["To spread the stain evenly into every cell of the tissue", "The stain diffuses in by itself; the angle is to push out air."],
      ["To make the specimen thinner so that more light passes through", "Thinness comes from peeling a single layer of epidermis, not from the coverslip."],
      ["To stop the stain evaporating during a long observation", "A coverslip slows evaporation however it is lowered; the angle prevents bubbles."],
    ],
    answer: "A",
    explanation: "Lowering the coverslip from one edge lets the liquid push the air out ahead of it, so no bubbles are trapped.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Cells from an onion bulb are examined at high power. Which feature would **not** be seen?",
    options: [
      ["Chloroplasts", "Correct: bulb cells grow underground without light and contain no chloroplasts."],
      ["A cell wall", "The cellulose walls show clearly as outlines between the cells."],
      ["A nucleus", "With iodine the nucleus is clearly visible, often near the wall."],
      ["A large vacuole", "The vacuole fills most of each cell, leaving only a thin layer of cytoplasm."],
    ],
    answer: "A",
    explanation: "Chloroplasts develop only in cells exposed to light, such as leaf mesophyll. Onion bulb epidermis shows walls, nuclei and a large vacuole but no chloroplasts.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A light micrograph of a leaf of a water plant shows green bodies moving slowly around the edge of each cell. What does this movement show?",
    options: [
      ["The cells are alive and their cytoplasm is streaming", "Correct: cytoplasmic streaming carries chloroplasts around the cell and only happens in living cells."],
      ["The chloroplasts are dividing to produce new chloroplasts", "Division would not appear as steady movement around the cell."],
      ["The stain is diffusing into the cells from the mountant", "Chloroplasts are green without a stain; diffusion of stain would not move organelles."],
      ["The cells are plasmolysing because the mountant is dilute", "Plasmolysis happens in concentrated solutions and shrinks the cytoplasm away from the wall."],
    ],
    answer: "A",
    explanation: "Cytoplasmic streaming is an energy-requiring process of living cells, using ATP from respiration; dead cells show no movement of their contents.",
    hints: ["The green bodies are chloroplasts; what moves them?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An electron micrograph of a cell shows a cellulose wall crossed by narrow channels lined with membrane that connect the cytoplasm of neighbouring cells. What are these channels?",
    options: [
      ["Plasmodesmata", "Correct: plasmodesmata link the cytoplasm of adjacent plant cells through the walls."],
      ["Microvilli", "Microvilli are finger-like extensions of the cell surface membrane of some animal cells."],
      ["Nuclear pores", "Nuclear pores cross the nuclear envelope, not the cell wall."],
      ["Cilia", "Cilia are hair-like projections that beat; they do not cross cell walls."],
    ],
    answer: "A",
    explanation: "Plasmodesmata are cytoplasmic connections through plant cell walls, allowing substances to move from cell to cell (the symplast route).",
    hints: ["Which structures join plant cells together?"],
  });
  const fov = convert(2.4, "mm", "µm");
  const meanLen = fov / 16;
  chk(meanLen, 150);
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "The field of view of a light microscope at low power is 2.4 mm across. Sixteen onion epidermal cells lie end to end across it. Calculate the mean length of one cell in µm.",
    value: meanLen, unit: "µm",
    wrong: ["0.15", "6.67"],
    explanation: "2.4 mm = 2400 µm; 2400 ÷ 16 = 150 µm. Leaving the field in mm gives 0.15; dividing 16 by 2.4 gives 6.67.",
    hints: ["Convert the field of view to µm first."],
  });
  const m8 = magnification(48, "mm", 60, "µm");
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A cheek cell 60 µm across is drawn 48 mm across. Calculate the magnification of the drawing.",
    value: m8, prefix: "×",
    wrong: ["0.8", "1.25"],
    explanation: "48 mm = 48 000 µm; 48 000 ÷ 60 = ×800.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Both plant and animal cells contain mitochondria.",
    answer: true,
    explanation: "True. All eukaryotic cells respire aerobically in mitochondria, including photosynthesising plant cells.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If ribosomes cannot be seen in a light micrograph of a cheek cell, the cell has no ribosomes.",
    answer: false,
    explanation: "False. Ribosomes are about 20–30 nm across, below the resolution of a light microscope (about 200 nm). Not seeing a structure does not mean it is absent.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stain or reagent with what it shows in a temporary preparation.",
    pairs: [
      ["Iodine solution", "Starch grains blue-black; plant nuclei and walls yellow-brown"],
      ["Methylene blue", "Nucleus and cytoplasm of animal cells blue"],
      ["Distilled water", "No staining; used as a mountant only"],
    ],
    explanation: "Iodine is used for plant tissue and to show starch; methylene blue for animal cells such as cheek cells. A drop of water mounts a specimen without staining it.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the comparison.",
    template: "Plant cells have a cell wall made of {{blank:a}}, and their large permanent vacuole is bounded by a membrane called the {{blank:b}}. Plant cells store carbohydrate as {{blank:c}}, whereas animal cells store it as {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["cellulose"], choices: ["cellulose", "chitin", "peptidoglycan", "collagen"] },
      { id: "b", accepted: ["tonoplast"], choices: ["tonoplast", "nuclear envelope", "plasmodesma", "cristae"] },
      { id: "c", accepted: ["starch"], choices: ["starch", "glycogen", "sucrose", "cellulose"] },
      { id: "d", accepted: ["glycogen"], choices: ["starch", "glycogen", "sucrose", "cellulose"] },
    ],
    explanation: "Plant cell walls are cellulose (chitin is in fungal walls, peptidoglycan in bacterial walls). The tonoplast surrounds the vacuole. Plants store starch grains; animals store glycogen granules.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the substance, made in respiration, that every cell uses as its immediate energy source for processes such as active transport.",
    accepted: ["ATP", "adenosine triphosphate"],
    wrong: ["glucose", "ADP"],
    explanation: "**ATP** (adenosine triphosphate) is made in respiration and hydrolysed to release energy in small, manageable amounts. Glucose is the respiratory substrate, not the immediate source.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name a stain suitable for a temporary mount of human cheek cells.",
    accepted: ["methylene blue", "methylene-blue"],
    wrong: ["iodine", "Benedict's"],
    explanation: "**Methylene blue** stains the nucleus and cytoplasm of animal cells. Iodine is used for plant cells and starch.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how to prepare a temporary mount of onion epidermis stained with iodine, giving a reason for **two** of the steps.",
    points: [
      "Peel the thin inner epidermis from a fleshy scale leaf with forceps",
      "Lay it flat (not folded) in a drop of iodine solution on a slide",
      "Lower a coverslip at an angle with a mounted needle and blot off excess stain",
      "Any two reasons: a single layer lets light through / cells do not overlap; iodine increases contrast; angle avoids air bubbles (both reasons needed for the mark)",
    ],
    modelAnswer: "Peel the thin inner epidermis from a fleshy onion scale leaf with forceps, because it is only one cell thick so light passes through and the cells do not overlap. Lay a small piece flat in a drop of iodine solution on a clean slide; the iodine increases contrast so the walls and nuclei can be seen. Lower a coverslip at an angle using a mounted needle so air bubbles are not trapped, and blot away excess stain.",
    explanation: "Method marks for the three key steps, plus one mark for two correct reasons.",
    hints: ["Think about thinness, stain and the coverslip."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Explain the safety precautions needed when preparing a slide of cheek cells, and assess the overall risk.",
    points: [
      "Cotton buds and slides go into disinfectant immediately (each student uses only their own cells) because body fluids may carry pathogens",
      "Wear eye protection / avoid skin contact because methylene blue is an irritant and stains; handle glass carefully",
      "Risk assessed as low (with these precautions)",
    ],
    modelAnswer: "Saliva and cheek cells may contain pathogens, so each student uses only their own cells and puts the cotton bud and slide straight into disinfectant. Methylene blue is an irritant and stains skin, so eye protection is worn and contact avoided; coverslips are handled carefully because broken glass cuts. With these precautions the risk is low.",
    explanation: "Each precaution needs its reason; the risk level is part of a Cambridge risk assessment.",
    hints: ["Consider the biological material, the chemical and the glass."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A light micrograph shows cells with a thick outline shared with neighbours, a clear central area, and many small green oval bodies around the edge of each cell. Identify the cell type and explain **three** features that support your identification.",
    points: [
      "Plant cell from a photosynthetic (leaf / mesophyll) tissue",
      "Thick shared outline = cellulose cell wall (absent from animal cells)",
      "Green oval bodies = chloroplasts (only in plant cells)",
      "Clear central area = large permanent vacuole pushing cytoplasm / organelles to the edge",
    ],
    modelAnswer: "These are plant cells from a photosynthetic tissue such as leaf mesophyll. The thick outline shared by neighbouring cells is a cellulose cell wall, which animal cells lack. The green oval bodies are chloroplasts. The clear centre is a large permanent vacuole, which pushes the cytoplasm and chloroplasts to the edge of the cell.",
    explanation: "Identification plus three feature-to-structure links; each link must name the structure and why it indicates a plant cell.",
    hints: ["Which three structures distinguish plant cells in a light micrograph?"],
  });
  const fovS = convert(1.6, "mm", "µm");
  const lenS = fovS / 20;
  chk(lenS, 80);
  const drawS = magnification(40, "mm", lenS, "µm");
  chk(drawS, 500);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Tendai examined a temporary mount of a thin layer of cells peeled from a leaf of a water plant, mounted in water. At low power the field of view was 1.6 mm across and 20 cells lay end to end across it. At high power each cell had a thick outline, a clear centre and green oval bodies that moved slowly round the edge of the cell. Tendai then drew one cell 40 mm long.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean length of a cell in µm.", value: lenS, unit: "µm", wrong: ["0.08"], explanation: "1.6 mm = 1600 µm; 1600 ÷ 20 = 80 µm." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the magnification of Tendai's drawing.", value: drawS, prefix: "×", wrong: ["0.5"], explanation: "40 000 µm ÷ 80 µm = ×500." }),
      P.mcq({
        label: "(c)", marks: 1, stem: "Which conclusion about the moving green bodies is correct?",
        options: [["They are chloroplasts carried by cytoplasmic streaming in living cells", "Correct: streaming happens only in living cells."], ["They are nuclei dividing by mitosis as the leaf grows", "Each cell has one nucleus; it is not green."], ["They are starch grains stained by the mountant solution", "The mountant is water, which stains nothing; starch grains are not green."], ["They are air bubbles moving under the coverslip edge", "Air bubbles are colourless and lie outside the cells."]],
        answer: "A", explanation: "Green, oval and moving round the cell edge: chloroplasts in streaming cytoplasm.",
      }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why no stain was needed to see the main features of these cells.", points: ["Chloroplasts are naturally green / pigmented, so they are visible without staining", "Cell walls are thick and refract light, so the outline is visible (or the tissue is one cell thick)"], modelAnswer: "The chloroplasts contain green chlorophyll, so they show up without a stain, and the thick cellulose walls give a clear outline in a thin layer one cell thick." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** structures present in these cells that Tendai could not see, and explain why.", points: ["Any two of: ribosomes / ER / Golgi body / plasmodesmata / cell surface membrane / mitochondria detail", "Below the resolution of the light microscope (about 200 nm) / not stained so no contrast"], modelAnswer: "Ribosomes and the endoplasmic reticulum are present but are too small to be resolved by a light microscope, whose resolution is about 200 nm." }),
    ],
    explanation: "Field of view ÷ number of cells gives the mean length; drawing ÷ actual gives the magnification. Natural pigment and thick walls make a leaf of a water plant easy to see unstained; ultrastructure needs an electron microscope.",
    hints: ["Convert 1.6 mm to µm.", "What makes chloroplasts visible without stain?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Rudo prepared one slide of onion epidermis in iodine and one slide of her own cheek cells in methylene blue. She recorded her observations in a table with the headings: feature, onion epidermal cell, cheek cell.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "State **three** observable differences she would record in the table.", points: ["Onion cell has a cell wall / clear outline; cheek cell has only a membrane", "Onion cells regular / rectangular in rows; cheek cells irregular / rounded", "Onion cell has a large vacuole (thin layer of cytoplasm); cheek cell has none / cytoplasm throughout (or nucleus at edge v central)"], modelAnswer: "Cell wall present in onion, absent in cheek. Onion cells regular and rectangular in rows, cheek cells irregular and flattened. Onion cells have a large central vacuole with cytoplasm in a thin layer; cheek cells have no large vacuole." }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Which observation would be the same for both cells?",
        options: [["Each cell contains a stained nucleus", "Correct: both cell types are eukaryotic and have a nucleus that takes up stain."], ["Each cell contains green chloroplasts", "Neither onion bulb cells nor cheek cells contain chloroplasts."], ["Each cell is enclosed by a cellulose wall", "Cheek cells, like all animal cells, have no cell wall."], ["Each cell has a large permanent vacuole", "Animal cells do not have a large permanent vacuole."]],
        answer: "A", explanation: "A nucleus is the common observable feature.",
      }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the onion epidermis must be laid flat and not folded.", points: ["A single layer of cells lets light pass through", "Folding makes cells overlap so outlines / nuclei cannot be distinguished"], modelAnswer: "A flat single layer lets light pass through each cell; a fold puts several layers on top of each other so the cells overlap and cannot be seen clearly." }),
    ],
    explanation: "Observable differences are wall, shape and vacuole; both show a stained nucleus. A thin, flat specimen transmits light without overlapping cells.",
    hints: ["Record only what a light microscope shows."],
  });

  b.card("DEFINITION", "What is the purpose of a stain in a temporary mount?", "To increase contrast so that nearly transparent structures (nucleus, walls) become visible.");
  b.card("FACT", "Stain for onion epidermis? Stain for cheek cells?", "Iodine solution for onion (and starch); methylene blue for cheek cells.");
  b.card("CONCEPT", "Why lower a coverslip at an angle?", "So the liquid pushes air out ahead of it and no air bubbles are trapped.");
  b.card("CONCEPT", "Structures found in plant cells but not animal cells?", "Cellulose cell wall, plasmodesmata, chloroplasts (in photosynthetic cells), large permanent vacuole with tonoplast.");
  b.card("FACT", "Structure found in animal cells but not flowering-plant cells?", "Centrioles.");
  b.card("FACT", "Carbohydrate store in plant cells and in animal cells?", "Starch grains in plants; glycogen granules in animals.");
  b.card("CONCEPT", "Why put used cheek-cell swabs into disinfectant?", "Body fluids may carry pathogens; disinfectant kills them. Use only your own cells.");
  b.card("FACT", "What do all cells use as their immediate energy source?", "ATP made in respiration, for active transport, protein synthesis, movement and division.");
  b.card("CONCEPT", "Why can onion bulb cells not show chloroplasts?", "They grow underground without light, so no chloroplasts develop; a stain is needed to see their structures.");
});
