// W1a: eukaryotic ultrastructure.
import { concept, P, t, chk, actualSize } from "../lib.mjs";

concept("abio.cells.eukaryotic-ultrastructure", { file: "cells/eukaryotic-ultrastructure", keyPrefix: "cells.eukaryotic-ultrastructure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the function of the nucleolus?",
    options: [
      ["Making ribosomal RNA and assembling ribosome subunits", "Correct: the nucleolus is the dense region of the nucleus where rRNA is made."],
      ["Controlling which substances enter and leave the nucleus", "This is the role of the nuclear envelope and its pores."],
      ["Synthesising lipids and steroid hormones for export", "Lipid synthesis is a function of the smooth ER."],
      ["Organising the spindle fibres during nuclear division", "The centrosome (with centrioles in animal cells) organises the spindle."],
    ],
    answer: "A",
    explanation: "The nucleolus has no membrane; it transcribes rRNA genes and assembles ribosome subunits, which leave through nuclear pores.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which organelle contains 70S ribosomes and its own small circular DNA?",
    options: [
      ["Mitochondrion", "Correct: mitochondria (and chloroplasts) contain circular DNA and 70S ribosomes."],
      ["Golgi body", "The Golgi body has no DNA or ribosomes; it modifies and packages proteins."],
      ["Rough endoplasmic reticulum", "Ribosomes on the RER are 80S, and the RER contains no DNA."],
      ["Lysosome", "Lysosomes contain hydrolytic enzymes, not DNA or ribosomes."],
    ],
    answer: "A",
    explanation: "Mitochondria and chloroplasts contain small circular DNA and 70S ribosomes like prokaryotes. Cytoplasmic and RER ribosomes are 80S.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which structure contains hydrolytic enzymes that digest worn-out organelles?",
    options: [
      ["Lysosome", "Correct: lysosomes are vesicles of hydrolytic enzymes made by the Golgi body."],
      ["Ribosome", "Ribosomes synthesise proteins; they do not digest organelles."],
      ["Centriole", "Centrioles are microtubule cylinders involved in spindle formation."],
      ["Nucleolus", "The nucleolus makes ribosomal RNA."],
    ],
    answer: "A",
    explanation: "Lysosomes are single-membrane vesicles containing hydrolytic enzymes; they fuse with vesicles containing engulfed material or old organelles and digest them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do cilia differ from microvilli?",
    options: [
      ["Cilia contain microtubules and beat; microvilli are membrane folds that increase surface area", "Correct: the microtubule core lets cilia move, while microvilli only add membrane area."],
      ["Cilia increase surface area for absorption; microvilli beat to move mucus along the airway", "This reverses their functions."],
      ["Cilia are found only in plant cells, whereas microvilli are found only in the cells of animals", "Both structures are found in animal cells; flowering-plant cells have neither."],
      ["Cilia are made of cellulose fibres, whereas microvilli are made of phospholipid only", "Cilia are membrane-covered extensions with a protein (tubulin) core; neither is cellulose."],
    ],
    answer: "A",
    explanation: "Cilia have a 9 + 2 arrangement of microtubules and beat (for example to move mucus in the trachea). Microvilli are much smaller extensions of the cell surface membrane, with no microtubules, found on absorptive cells.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An electron micrograph of a cell shows very large amounts of rough ER, many Golgi stacks and numerous vesicles near the cell surface membrane. What is the most likely main function of this cell?",
    options: [
      ["Secreting a protein, such as a digestive enzyme", "Correct: RER, Golgi and secretory vesicles form the protein secretion pathway."],
      ["Storing lipid droplets as an energy reserve", "Lipid storage cells contain large lipid droplets and SER, not mainly RER."],
      ["Photosynthesis in the palisade layer of a leaf", "A photosynthetic cell would show many chloroplasts."],
      ["Contraction of a skeletal muscle in the leg", "Muscle cells are packed with contractile filaments and mitochondria."],
    ],
    answer: "A",
    explanation: "Proteins for export are made on ribosomes of the RER, modified and packaged in the Golgi body and released by exocytosis from secretory vesicles. Much RER and Golgi indicates a secretory cell.",
    hints: ["Which organelles make, modify and package proteins?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A radioactive amino acid is supplied to a secretory cell. In which order would the radioactivity appear in these structures?",
    options: [
      ["Rough ER → Golgi body → secretory vesicles → outside the cell", "Correct: the protein is made on RER ribosomes, modified in the Golgi and released by exocytosis."],
      ["Golgi body → rough ER → secretory vesicles → outside the cell", "Proteins are made on the RER before they reach the Golgi body."],
      ["Nucleus → rough ER → lysosomes → outside the cell", "Amino acids are not built into proteins in the nucleus, and lysosomes keep their enzymes inside the cell."],
      ["Smooth ER → Golgi body → rough ER → outside the cell", "The smooth ER makes lipids; protein synthesis starts on the rough ER."],
    ],
    answer: "A",
    explanation: "Amino acids are incorporated into polypeptides on ribosomes of the RER; transport vesicles carry them to the Golgi body; secretory vesicles carry them to the membrane for exocytosis.",
    hints: ["Where are amino acids joined into proteins?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Cells from the flight muscles of an insect and cells from fat tissue of the same insect are compared in electron micrographs. Which difference is most likely?",
    options: [
      ["Muscle cells have more mitochondria with more densely packed cristae", "Correct: flight muscle needs a very high rate of ATP production."],
      ["Fat cells have more mitochondria because lipids release more energy per gram", "Storing lipid does not require a high rate of respiration in the storage cell itself."],
      ["Muscle cells have more rough ER because they secrete many proteins", "Muscle cells contract; they are not specialised for secretion."],
      ["Fat cells have more ribosomes because lipids are made on ribosomes", "Lipids are made in the smooth ER, not on ribosomes."],
    ],
    answer: "A",
    explanation: "The number of mitochondria and the surface area of cristae reflect the cell's demand for ATP. Flight muscle has a very high energy demand; fat storage cells are dominated by lipid droplets.",
    hints: ["Which activity needs more ATP?", "Where is most ATP made?"],
  });
  const a1 = actualSize(1.5, "mm", 60000, "nm");
  chk(a1, 25);
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "In an electron micrograph at ×60 000, a ribosome measures 1.5 mm across. Calculate its actual diameter in nm.",
    value: a1, unit: "nm",
    wrong: ["0.025", "40"],
    explanation: "1.5 mm = 1 500 000 nm; 1 500 000 ÷ 60 000 = 25 nm. Working in µm gives 0.025 µm, which must then be multiplied by 1000.",
    hints: ["1 mm = 1 000 000 nm."],
  });
  const m2 = actualSize(54, "mm", 18000, "µm");
  chk(m2, 3);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A chloroplast in an electron micrograph at ×18 000 is 54 mm long. Calculate its actual length in µm.",
    value: m2, unit: "µm",
    wrong: ["0.003", "333"],
    explanation: "54 mm = 54 000 µm; 54 000 ÷ 18 000 = 3 µm, within the typical range for chloroplasts.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Golgi body synthesises proteins from amino acids.",
    answer: false,
    explanation: "False. Proteins are made on ribosomes. The Golgi body modifies (for example glycosylates), sorts and packages them into vesicles.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The inner membrane of a mitochondrion is folded into cristae, which increases the surface area available for ATP synthesis.",
    answer: true,
    explanation: "True. The cristae carry the electron transport chain and ATP synthase; more folding means more ATP can be made.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each organelle with its main function.",
    pairs: [
      ["Smooth endoplasmic reticulum", "Synthesis of lipids and steroids"],
      ["Golgi body", "Modifying and packaging proteins into vesicles"],
      ["Centriole", "Organising spindle microtubules in animal cells"],
      ["Chloroplast", "Photosynthesis"],
      ["Ribosome", "Protein synthesis (translation)"],
    ],
    explanation: "SER: lipids; Golgi: modify and package; centrioles: spindle organisation; chloroplasts: photosynthesis; ribosomes: translation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of a chloroplast.",
    template: "A chloroplast is surrounded by a double membrane called the {{blank:a}}. Inside, stacks of thylakoids called {{blank:b}} carry chlorophyll, and the surrounding fluid, the {{blank:c}}, contains enzymes of the Calvin cycle.",
    blanks: [
      { id: "a", accepted: ["envelope"], choices: ["envelope", "tonoplast", "cristae", "cell wall"] },
      { id: "b", accepted: ["grana"], choices: ["grana", "cristae", "cisternae", "microvilli"] },
      { id: "c", accepted: ["stroma"], choices: ["stroma", "matrix", "cytosol", "sap"] },
    ],
    explanation: "Envelope (double membrane), grana (stacks of thylakoids) and stroma (fluid with Calvin cycle enzymes, starch grains, circular DNA and 70S ribosomes). Cristae and matrix belong to mitochondria.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the protein that forms microtubules.",
    accepted: ["tubulin", "tubulins"],
    wrong: ["actin", "collagen"],
    explanation: "Microtubules are hollow tubes of **tubulin**. Actin forms microfilaments; collagen is an extracellular fibrous protein.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the membrane that surrounds the large permanent vacuole of a plant cell.",
    accepted: ["tonoplast", "the tonoplast"],
    wrong: ["nuclear envelope", "cell wall"],
    explanation: "The **tonoplast** is the partially permeable membrane around the vacuole; it controls the movement of substances into and out of the cell sap.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the structure of the nucleus as seen in an electron micrograph and state the function of **two** of its parts.",
    points: [
      "Nuclear envelope: double membrane (outer continuous with RER)",
      "Nuclear pores in the envelope",
      "Chromatin (DNA with histones) and a dense nucleolus",
      "Any two functions: pores let mRNA / ribosome subunits out (and proteins in); nucleolus makes rRNA / ribosomes; chromatin holds genes that control the cell (both needed)",
    ],
    modelAnswer: "The nucleus is bounded by a double membrane, the nuclear envelope, whose outer membrane is continuous with the rough ER. The envelope has nuclear pores, which allow mRNA and ribosome subunits to leave. Inside is chromatin, DNA wound round histones, which carries the genes, and a dense nucleolus, which makes ribosomal RNA and assembles ribosomes.",
    explanation: "Three structural points and one mark for two correct functions.",
    hints: ["Start with the boundary of the nucleus, then the contents."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Mitochondria and chloroplasts contain small circular DNA and 70S ribosomes. Suggest what this shows about how these organelles may have originated, and explain why.",
    points: [
      "They may be descended from prokaryotes / bacteria that were taken into an ancestral eukaryotic cell (endosymbiosis)",
      "Prokaryotes have circular DNA not associated with histones",
      "Prokaryotes have 70S ribosomes, unlike the 80S ribosomes in eukaryotic cytoplasm (or double membrane / divide independently)",
    ],
    modelAnswer: "The features suggest that mitochondria and chloroplasts are descended from free-living prokaryotes that were engulfed by an ancestral cell and lived inside it. Like prokaryotes, they have small circular DNA and 70S ribosomes, whereas the eukaryotic cytoplasm has 80S ribosomes; they are also surrounded by two membranes and divide on their own.",
    explanation: "A *suggest* question: the endosymbiont idea, supported by the prokaryote-like features.",
    hints: ["Which other cells have circular DNA and 70S ribosomes?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain how the structure of a mitochondrion is related to its function.",
    points: [
      "Inner membrane folded into cristae gives a large surface area",
      "For the electron transport chain / ATP synthase, so more ATP can be made (oxidative phosphorylation)",
      "Matrix contains enzymes of the Krebs cycle / link reaction (or DNA and ribosomes to make some of its own proteins)",
    ],
    modelAnswer: "The inner membrane is folded into cristae, giving a large surface area for the electron transport chain and ATP synthase, so much ATP can be made. The matrix contains the enzymes of the link reaction and Krebs cycle, and its own DNA and 70S ribosomes to make some mitochondrial proteins.",
    explanation: "Each structural feature must be linked to its role in aerobic respiration.",
    hints: ["Consider the inner membrane and the matrix separately."],
  });
  const golgi = actualSize(42, "mm", 60000, "nm");
  chk(golgi, 700);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "An electron micrograph at ×60 000 of a cell from a salivary gland shows: structure P, flattened sacs studded with dark granules, filling much of the cytoplasm; structure Q, a stack of curved flattened sacs 42 mm wide with small vesicles at its edges; structure R, rod-shaped bodies with a folded inner membrane; and structure S, many dense round vesicles near the edge of the cell facing a duct.",
    parts: [
      P.match({
        label: "(a)", marks: 4, stem: "Identify structures P, Q, R and S.",
        pairs: [["P", "Rough endoplasmic reticulum"], ["Q", "Golgi body"], ["R", "Mitochondrion"], ["S", "Secretory vesicle"]],
        extraRight: ["Lysosome"],
        explanation: "P: RER (ribosomes on sacs); Q: Golgi body (stack with vesicles); R: mitochondrion (cristae); S: secretory vesicles (dense, at the membrane facing the duct).",
      }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the actual width of structure Q in nm.", value: golgi, unit: "nm", wrong: ["0.7"], explanation: "42 mm = 42 000 000 nm; 42 000 000 ÷ 60 000 = 700 nm." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe how a molecule of salivary amylase is made and released from this cell, referring to P, Q and S.", points: ["mRNA for amylase is translated on ribosomes on P (RER) and the polypeptide enters the cisternae / folds", "Transport vesicles carry it from P to Q (Golgi body)", "Q modifies (e.g. adds carbohydrate) and packages it into secretory vesicles S", "S moves to and fuses with the cell surface membrane, releasing amylase by exocytosis (using ATP)"], modelAnswer: "Ribosomes on the rough ER (P) translate the mRNA for amylase; the polypeptide enters the cisternae and folds. Vesicles bud off and carry it to the Golgi body (Q), where it is modified and packaged into secretory vesicles (S). These move to the cell surface membrane and fuse with it, releasing amylase by exocytosis, using ATP from the mitochondria." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why this cell contains many structures R.", points: ["Mitochondria (R) make ATP by aerobic respiration", "ATP needed for protein synthesis / vesicle movement / exocytosis"], modelAnswer: "R are mitochondria, which provide ATP by aerobic respiration for protein synthesis and for moving and fusing vesicles during exocytosis." }),
    ],
    explanation: "A secretory cell has abundant RER, Golgi and secretory vesicles plus mitochondria to supply ATP. Actual size = image ÷ magnification, in consistent units.",
    hints: ["Which organelle is covered in ribosomes?", "1 mm = 1 000 000 nm."],
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "The table compares three organelles. For each row an electron micrograph description is given.\n\n| Organelle | Description |\n|---|---|\n| X | Double membrane, inner membrane folded, small circular DNA in a fluid |\n| Y | Single membrane, spherical, about 0.5 µm, dark uniform contents |\n| Z | No membrane, two short hollow cylinders at right angles near the nucleus |",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Organelle X is a:", options: [["mitochondrion", "Correct: cristae and circular DNA."], ["nucleus", "The nucleus has pores and chromatin, not folded inner membranes."], ["Golgi body", "The Golgi body has a single membrane."], ["vacuole", "A vacuole has a single membrane (tonoplast)."]], answer: "A", explanation: "Double membrane with folded inner membrane = mitochondrion." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Organelle Y is most likely a:", options: [["lysosome", "Correct: a single-membrane vesicle of about 0.1–1 µm with dense enzyme contents."], ["ribosome", "Ribosomes have no membrane and are about 25 nm."], ["chloroplast", "Chloroplasts have a double membrane and are several µm long."], ["centriole", "Centrioles have no membrane."]], answer: "A", explanation: "Lysosome." }),
      P.short({ label: "(c)", marks: 1, stem: "Name organelle Z.", accepted: ["centrioles", "centriole", "a pair of centrioles", "centrosome"], explanation: "Two hollow cylinders of microtubules at right angles: centrioles." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the enzymes inside organelle Y do not normally digest the rest of the cell.", points: ["Y / lysosomes contain hydrolytic enzymes that could digest cell components", "Enzymes are kept inside a membrane (separated from the cytoplasm / compartmentalisation)", "Released only into vesicles containing material to be digested (or into the cell when it is to be destroyed)"], modelAnswer: "Lysosomes hold hydrolytic enzymes that could break down the cell's own molecules. The membrane keeps the enzymes separate from the cytoplasm; they act only when the lysosome fuses with a vesicle containing material to be digested." }),
    ],
    explanation: "Membranes, shape and contents identify organelles: double membrane + cristae = mitochondrion; small single-membrane vesicle with hydrolytic enzymes = lysosome; microtubule cylinders = centrioles.",
    hints: ["Count the membranes first."],
  });

  b.card("FACT", "Which organelles contain small circular DNA and 70S ribosomes?", "Mitochondria and chloroplasts.");
  b.card("FACT", "Ribosomes in the eukaryotic cytoplasm are...?", "80S (about 25 nm); 70S ribosomes are in prokaryotes, mitochondria and chloroplasts.");
  b.card("CONCEPT", "Function of the Golgi body?", "Modifies proteins (e.g. adds carbohydrate), sorts and packages them into vesicles; makes lysosomes.");
  b.card("CONCEPT", "Rough ER versus smooth ER?", "RER has ribosomes and transports proteins being made; SER has no ribosomes and makes lipids and steroids.");
  b.card("FACT", "What does a lysosome contain?", "Hydrolytic enzymes, inside a single membrane.");
  b.card("CONCEPT", "Route of a secreted protein?", "RER ribosomes → vesicle → Golgi body → secretory vesicle → exocytosis at the cell surface membrane.");
  b.card("DEFINITION", "What are cristae?", "Folds of the inner mitochondrial membrane that increase the surface area for the electron transport chain and ATP synthase.");
  b.card("CONCEPT", "Cilia versus microvilli?", "Cilia: microtubule core (9 + 2), beat to move fluid. Microvilli: small membrane folds, no microtubules, increase surface area.");
  b.card("FACT", "What do centrioles do?", "In animal cells, a pair of microtubule cylinders in the centrosome that organises the spindle during division.");
  b.card("CONCEPT", "Function of the nucleolus?", "Makes ribosomal RNA and assembles ribosome subunits.");
});
