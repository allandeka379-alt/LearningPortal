// W1a: six THEORY10 items (ZIMSEC Paper 2; Cambridge Paper 2, AS content) on cells, biological molecules and enzymes.
import { concept, P, t, chk, table, dpStr, EXAM, checkExam, magnification, actualSize, convert, mean } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const TH = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true, paper: "Paper 2" };

concept(A("cells.eukaryotic-ultrastructure"), { file: "exam/w1a-theory", keyPrefix: "exam.w1a-theory" }, (b) => {
  // ---------------------------------------------------------------- 1. Plant cell ultrastructure and microscopy
  const mag = magnification(20, "mm", 5, "µm");
  const chl = actualSize(26, "mm", mag, "µm");
  chk(mag, 4000);
  chk(chl, 6.5);
  b.struct({
    ...TH, d: 3,
    concepts: [A("cells.eukaryotic-ultrastructure"), A("cells.microscopy")],
    stem: "A transmission electron micrograph of a palisade mesophyll cell from a bean leaf shows the following structures.\n\n- Structure J: a lens-shaped body bounded by two membranes, containing stacks of flattened membranes and a pale fluid with dark granules.\n- Structure K: a single membrane surrounding a large, pale central region that occupies most of the cell.\n- Structure L: narrow channels lined with membrane passing through the thick outer layer of the cell and joining it to the next cell.\n\nA scale bar labelled 5 µm is 20 mm long. Structure J is 26 mm long on the micrograph.",
    parts: checkExam(EXAM.THEORY10, [
      P.match({
        label: "(a)", marks: 3, stem: "Identify structures J, K and L.",
        pairs: [["J", "Chloroplast"], ["K", "Tonoplast around the large permanent vacuole"], ["L", "Plasmodesmata"]],
        extraRight: ["Golgi body"],
        explanation: "J: double membrane with grana and stroma = chloroplast. K: single membrane around the sap vacuole = tonoplast. L: channels through the wall = plasmodesmata.",
      }),
      P.group({
        label: "(b)", stem: "Use the scale bar.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the magnification of the micrograph.", value: mag, prefix: "×", wrong: ["4"], explanation: "20 mm = 20 000 µm; 20 000 ÷ 5 = ×4000." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the actual length of structure J in µm.", value: chl, unit: "µm", wrong: ["0.0065"], explanation: "26 mm = 26 000 µm; 26 000 ÷ 4000 = 6.5 µm." }),
        ],
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "The dark granules in J are 70S ribosomes. Explain why they can be seen in this micrograph but not with a light microscope.",
        points: ["Ribosomes (about 20–25 nm) are smaller than the resolution limit of the light microscope (about 200 nm)", "Electrons have a much shorter wavelength than light, so the TEM has a much higher resolution (about 0.5 nm)"],
        modelAnswer: "The ribosomes are only about 20–25 nm across, far below the light microscope's resolution of about 200 nm. Electrons have a much shorter wavelength than light, so the TEM can resolve points about 0.5 nm apart.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "J contains 70S ribosomes and circular DNA. Suggest what this indicates about J.",
        points: ["J can make some of its own proteins (has its own genes and protein synthesis)", "Similar to prokaryotes, suggesting J evolved from a prokaryote taken into an ancestral cell (endosymbiosis)"],
        modelAnswer: "The chloroplast has its own DNA and ribosomes, so it can make some of its own proteins; because prokaryotes also have circular DNA and 70S ribosomes, this suggests chloroplasts evolved from prokaryotes that lived inside an ancestral eukaryotic cell.",
      }),
    ]),
    explanation: "Structures are identified by membranes and contents; the scale bar gives the magnification (×4000) and the actual length (6.5 µm); ribosomes need TEM resolution.",
    hints: ["Count the membranes around each structure.", "Measure the scale bar to get the magnification."],
  });

  // ---------------------------------------------------------------- 2. Prokaryotes and viruses
  const bact = 2.4;
  const vir = 80;
  const ratio = convert(bact, "µm", "nm") / vir;
  chk(ratio, 30);
  b.struct({
    ...TH, d: 3,
    concepts: [A("cells.prokaryotes-viruses")],
    stem: "The table compares three structures examined in a hospital laboratory in Bulawayo.\n\n| Feature | Structure P | Structure Q | Structure R |\n|---|---|---|---|\n| Length | 2.4 µm | 80 nm | 25 µm |\n| Nucleic acid | Circular DNA in cytoplasm | RNA inside a protein coat | Linear DNA in a nucleus |\n| Ribosomes | Present, small | Absent | Present, larger in cytoplasm |\n| Outer layer | Peptidoglycan wall | Envelope from host membrane | Cell surface membrane only |",
    parts: checkExam(EXAM.THEORY10, [
      P.mcq({
        label: "(a)", marks: 1, stem: "Which structure is a prokaryote?",
        options: [["P", "Correct: circular DNA free in the cytoplasm, small ribosomes and a peptidoglycan wall."], ["Q", "Q has no ribosomes and is not a cell: it is a virus."], ["R", "R has a nucleus: it is a eukaryotic (animal) cell."], ["Q and R", "Neither is a prokaryote."]],
        answer: "A", explanation: "P is a bacterium.",
      }),
      P.fib({
        label: "(b)", marks: 3, stem: "Complete the sentences.",
        template: "The small ribosomes of P are {{blank:a}} ribosomes. The protein coat of Q is called the {{blank:b}}. The larger cytoplasmic ribosomes of R are {{blank:c}} ribosomes.",
        blanks: [
          { id: "a", accepted: ["70S"], choices: ["70S", "80S"] },
          { id: "b", accepted: ["capsid"], choices: ["capsid", "capsule", "cell wall", "nucleoid"] },
          { id: "c", accepted: ["80S"], choices: ["70S", "80S"] },
        ],
        explanation: "Prokaryotes: 70S. Eukaryotic cytoplasm: 80S. Virus protein coat: capsid (a capsule is a bacterial slime layer).",
      }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate how many times longer P is than Q.", value: ratio, wrong: ["0.03"], explanation: "2.4 µm = 2400 nm; 2400 ÷ 80 = 30 times." }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why an antibiotic that prevents peptidoglycan synthesis could treat an infection by P but not by Q.",
        points: ["P has a peptidoglycan wall, so it cannot build its wall and bursts / dies (osmotic lysis)", "Q is a virus with no cell wall (or no metabolism of its own), so the antibiotic has nothing to act on"],
        modelAnswer: "P is a bacterium whose wall is made of peptidoglycan; without new wall material it bursts by osmosis as it grows. Q is a virus with no wall or metabolism of its own, so the antibiotic has no target.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** reasons why Q is not usually considered a living organism.",
        points: ["Not made of a cell / no cytoplasm or ribosomes", "Cannot reproduce or carry out metabolism (respire, feed) outside a host cell"],
        modelAnswer: "Q is not a cell: it has no cytoplasm or ribosomes. It cannot respire, feed or reproduce on its own; it reproduces only inside a host cell.",
      }),
    ]),
    explanation: "P is a bacterium (70S, circular DNA, peptidoglycan), Q an enveloped RNA virus, R a eukaryotic animal cell.",
    hints: ["Which structure has no nucleus but does have ribosomes?"],
  });

  // ---------------------------------------------------------------- 3. Carbohydrates and polysaccharides
  const hex = 6 * 180 - 5 * 18;
  chk(hex, 990);
  b.struct({
    ...TH, d: 4,
    concepts: [A("molecules.polysaccharides"), A("molecules.carbohydrates")],
    stem: "Starch extracted from cassava roots was incubated with salivary amylase at 37 °C. Samples taken after 20 minutes gave a negative iodine test and a brick-red precipitate with Benedict's test. Chromatography showed that the main product was maltose, with some short chains of glucose units.",
    parts: checkExam(EXAM.THEORY10, [
      P.short({ label: "(a)", marks: 1, stem: "Name the bond in amylose that amylase hydrolyses.", accepted: ["alpha-1,4 glycosidic bond", "α-1,4 glycosidic bond", "alpha-1,4 glycosidic", "α-1,4 glycosidic", "1,4 glycosidic bond", "glycosidic bond", "glycosidic", "alpha 1,4 glycosidic bond"], explanation: "Amylase hydrolyses α-1,4 glycosidic bonds." }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Why did the samples give a brick-red precipitate with Benedict's test?",
        options: [["Maltose is a reducing sugar", "Correct: maltose has a free reactive carbon 1 and reduces copper(II)."], ["Starch is a reducing sugar", "Starch was no longer present (negative iodine test), and it is not a reducing sugar."], ["Amylase is a protein", "Proteins give a lilac colour with biuret, not a precipitate with Benedict's."], ["Maltose is a non-reducing sugar", "Non-reducing sugars give a negative Benedict's test."]],
        answer: "A", explanation: "Maltose reduces copper(II) ions to copper(I) oxide.",
      }),
      P.num({ label: "(c)", marks: 2, stem: "One short chain contained six glucose units. Calculate its relative molecular mass (glucose Mr 180, water Mr 18).", value: hex, wrong: ["1080", "972"], explanation: "6 × 180 = 1080; five bonds release 5 × 18 = 90; 1080 − 90 = 990." }),
      P.num({ label: "(d)", marks: 1, stem: "How many molecules of water are needed to hydrolyse an unbranched amylose molecule of 900 glucose units completely to glucose?", value: 899, wrong: ["900"], explanation: "900 units are joined by 899 glycosidic bonds, each needing one water molecule." }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how the structure of amylose makes it suitable as an energy store in cassava roots.",
        points: ["Coiled into a helix / compact, so much glucose is stored in a small space", "Insoluble, so it does not affect the water potential of cells (no osmotic uptake of water) / cannot diffuse out"],
        modelAnswer: "Amylose coils into a compact helix, so a lot of glucose is stored in little space, and it is insoluble, so it does not lower the water potential of the cells or diffuse out of them.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Cellulose is also a polymer of glucose, but amylase cannot hydrolyse it. Explain why.",
        points: ["Cellulose is made of β-glucose (amylose of α-glucose)", "Joined by β-1,4 glycosidic bonds, with alternate units inverted / straight chains", "β-1,4 bonds / cellulose not complementary to the active site of amylase, so no enzyme-substrate complex forms (enzymes are specific)"],
        modelAnswer: "Cellulose is a polymer of β-glucose joined by β-1,4 glycosidic bonds, with alternate units inverted to give straight chains. This shape is not complementary to the active site of amylase, which is specific to the α-1,4 bonds of starch, so no enzyme-substrate complex can form.",
      }),
    ]),
    explanation: "Amylase hydrolyses α-1,4 bonds of starch to maltose (a reducing sugar); n units have n − 1 bonds; β-glucose polymers do not fit the active site of amylase.",
    hints: ["Each glycosidic bond formed releases one water molecule."],
  });

  // ---------------------------------------------------------------- 4. Protein structure: collagen
  const gly = 1056 / 3;
  const pb = 3 * (1056 - 1);
  chk(gly, 352);
  chk(pb, 3165);
  b.struct({
    ...TH, d: 4,
    concepts: [A("molecules.haemoglobin-collagen"), A("molecules.protein-structure")],
    stem: "Collagen from a tendon was analysed. Each collagen molecule consists of three polypeptide chains, each 1056 amino acids long, with glycine at every third position. Neighbouring molecules in a fibril are joined by covalent cross-links, and the molecules are staggered so that their ends do not line up.",
    parts: checkExam(EXAM.THEORY10, [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the number of glycine residues in one polypeptide chain.", value: gly, wrong: ["1056"], explanation: "1056 ÷ 3 = 352." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the number of peptide bonds in one collagen molecule.", value: pb, wrong: ["3167", "3168"], explanation: "Each chain has 1055 peptide bonds; 3 × 1055 = 3165." }),
      P.mcq({
        label: "(c)", marks: 1, stem: "Which bonds hold the three chains together in the triple helix?",
        options: [["Hydrogen bonds", "Correct: many hydrogen bonds between the chains."], ["Peptide bonds", "Peptide bonds join amino acids within each chain."], ["Glycosidic bonds", "Glycosidic bonds join sugars."], ["Ester bonds", "Ester bonds are found in lipids."]],
        answer: "A", explanation: "The triple helix is held by hydrogen bonds between chains.",
      }),
      P.mcq({
        label: "(d)", marks: 1, stem: "Which level of protein structure is shown by the triple helix?",
        options: [["Quaternary", "Correct: three polypeptide chains associate."], ["Primary", "Primary structure is the sequence."], ["Secondary", "Secondary structure is local folding of one chain."], ["Tertiary", "Tertiary structure is the folding of a single chain."]],
        answer: "A", explanation: "More than one polypeptide: quaternary structure.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain how the structure of collagen gives tendons high tensile strength.",
        points: ["Glycine (smallest R group) every third position lets the three chains pack tightly into a triple helix", "Many hydrogen bonds hold the triple helix; covalent cross-links join neighbouring molecules", "Staggered molecules / fibrils bundled into fibres, so no line of weakness and resistance to pulling"],
        modelAnswer: "Glycine, with the smallest R group, fits in the centre of the triple helix so the chains wind tightly, held by many hydrogen bonds. Covalent cross-links join neighbouring molecules, and the staggered arrangement means no line of weakness; fibrils are bundled into fibres that resist being pulled apart.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Haemoglobin is a globular protein. Explain why haemoglobin is soluble but collagen is not, and how solubility suits each protein's function.",
        points: ["Haemoglobin folds with hydrophilic R groups on the outside (hydrophobic inside), so it dissolves", "Haemoglobin dissolved at high concentration in red blood cells to carry oxygen", "Collagen is long, fibrous and cross-linked, so it is insoluble and stays in place / is stable in tendons"],
        modelAnswer: "Haemoglobin folds into a compact globule with hydrophilic R groups on its surface, so it dissolves and can be packed at high concentration into red blood cells to carry oxygen. Collagen forms long, cross-linked fibres with no such soluble surface, so it is insoluble, which keeps it stable and in place in tendons.",
      }),
    ]),
    explanation: "Count glycines and peptide bonds from the chain length; the triple helix is quaternary, held by hydrogen bonds; cross-links and staggering give strength.",
    hints: ["Each chain of n amino acids has n − 1 peptide bonds."],
  });

  // ---------------------------------------------------------------- 5. Enzymes: effect of pH
  const pH = [4, 5, 6, 7, 8, 9, 10];
  const tm = [null, 410, 180, 95, 70, 120, 350];
  const r8 = 1000 / 70;
  const pc6 = ((1000 / 180) / r8) * 100;
  b.struct({
    ...TH, d: 4,
    concepts: [A("enzymes.factors"), A("enzymes.mode-of-action")],
    stem: `A protease was added to a cloudy suspension of milk protein (casein) buffered at different pH values at 30 °C. The time for the mixture to become clear was recorded.\n\n${table(["pH", "Time to clear / s"], pH.map((p, i) => [p, tm[i] === null ? "did not clear in 600 s" : tm[i]]))}`,
    parts: checkExam(EXAM.THEORY10, [
      P.group({
        label: "(a)", stem: "Process the results.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the rate (1000/t) at pH 8, in s⁻¹, to one decimal place.", value: r8, dp: 1, unit: "s⁻¹", wrong: ["0.014"], explanation: "1000 ÷ 70 = 14.29, so 14.3 s⁻¹." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the rate at pH 6 as a percentage of the rate at pH 8, to three significant figures.", value: pc6, sf: 3, unit: "%", wrong: ["257"], explanation: "Rate at pH 6 = 1000 ÷ 180 = 5.56; 5.56 ÷ 14.29 × 100 = 38.9%. (Using times: 70 ÷ 180 × 100 gives the same; 180 ÷ 70 × 100 = 257 is inverted.)" }),
        ],
      }),
      P.mcq({
        label: "(b)", marks: 1, stem: "What is the best estimate of the optimum pH of this protease from the data?",
        options: [["About pH 8", "Correct: the shortest time (fastest rate) is at pH 8."], ["About pH 10", "The time at pH 10 (350 s) is long: the rate is low."], ["About pH 4", "The mixture did not clear at pH 4."], ["About pH 6", "The rate at pH 6 is less than 40% of that at pH 8."]],
        answer: "A", explanation: "The fastest rate (shortest time) is at pH 8.",
      }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of solution used to keep each pH constant.", accepted: ["buffer", "buffer solution", "buffers", "buffer solutions"], explanation: "Buffer solutions resist changes in pH." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the rate at pH 10 is much lower than at pH 8.",
        points: ["Change in H⁺ / OH⁻ concentration alters the charges on R groups (in the active site)", "Ionic and hydrogen bonds holding the tertiary structure are broken, so the active site changes shape", "Casein no longer fits / binds less well, so fewer enzyme-substrate complexes form (some enzyme denatured)"],
        modelAnswer: "At pH 10 the lower concentration of hydrogen ions changes the charges on R groups. Ionic and hydrogen bonds that hold the tertiary structure break, so the active site changes shape and its charged groups no longer attract casein. Fewer enzyme-substrate complexes form, so the rate is lower.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** improvements that would allow the optimum pH to be found more precisely.",
        points: ["Test more pH values at smaller intervals around pH 8 (e.g. 7.5, 8.0, 8.5)", "Repeat each pH (at least three times) and calculate means, or use a colorimeter to judge the end point"],
        modelAnswer: "Test pH values at 0.5 intervals between 7 and 9, and repeat each three times, using a colorimeter to judge when the mixture becomes clear.",
      }),
    ]),
    explanation: "Convert times to rates; the optimum is at the shortest time (pH 8); pH changes alter R group charges and the active site.",
    hints: ["Rate = 1000 ÷ time.", "Express the pH 6 rate as a fraction of the pH 8 rate."],
  });

  // ---------------------------------------------------------------- 6. Enzymes: reversible inhibitors
  const low = { none: 0.48, X: 0.24, Y: 0.24 };
  const high = { none: 1.1, X: 1.03, Y: 0.55 };
  const inhXlow = ((low.none - low.X) / low.none) * 100;
  const inhXhigh = ((high.none - high.X) / high.none) * 100;
  chk(inhXlow, 50);
  b.struct({
    ...TH, d: 4,
    concepts: [A("enzymes.inhibition-kinetics"), A("enzymes.mode-of-action")],
    stem: `The initial rate of an enzyme-catalysed reaction was measured at a low and a high substrate concentration, without inhibitor and with equal concentrations of inhibitor X or inhibitor Y.\n\n${table(["Substrate concentration", "No inhibitor", "With X", "With Y"], [["Low", dpStr(low.none, 2), dpStr(low.X, 2), dpStr(low.Y, 2)], ["High", dpStr(high.none, 2), dpStr(high.X, 2), dpStr(high.Y, 2)]])}\n\nRates are in µmol of product per minute.`,
    parts: checkExam(EXAM.THEORY10, [
      P.group({
        label: "(a)", stem: "Calculate the percentage inhibition caused by X.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "At the low substrate concentration.", value: inhXlow, unit: "%", wrong: ["100"], explanation: "(0.48 − 0.24) ÷ 0.48 × 100 = 50%." }),
          P.num({ label: "(ii)", marks: 2, stem: "At the high substrate concentration, to three significant figures.", value: inhXhigh, sf: 3, unit: "%", wrong: ["93.6", "6.80"], explanation: "(1.10 − 1.03) ÷ 1.10 × 100 = 6.36%. 93.6% is the activity remaining; dividing by 1.03 gives 6.80." }),
        ],
      }),
      P.mcq({
        label: "(b)", marks: 1, stem: "Which type of inhibitor is X?",
        options: [["Competitive", "Correct: its effect almost disappears at high substrate concentration."], ["Non-competitive", "A non-competitive inhibitor's effect is not reduced by more substrate."], ["Irreversible", "An irreversible inhibitor could not be overcome by adding substrate."], ["End-product", "Nothing in the data shows a pathway product feeding back."]],
        answer: "A", explanation: "Inhibition falls from 50% to under 7% as substrate increases: competition for the active site.",
      }),
      P.mcq({
        label: "(c)", marks: 1, stem: "Which type of inhibitor is Y?",
        options: [["Non-competitive", "Correct: it halves the rate at both substrate concentrations."], ["Competitive", "Its effect would decrease at high substrate concentration."], ["A substrate of the enzyme", "Y reduces the rate, so it is not acting as substrate."], ["An activator", "Y lowers the rate; an activator would raise it."]],
        answer: "A", explanation: "Y causes 50% inhibition at both concentrations, so extra substrate does not overcome it.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the effect of Y on the enzyme.",
        points: ["Y binds to the enzyme at a site other than the active site", "Changes the tertiary structure / shape of the active site", "Substrate cannot bind / be converted, and because Y does not compete with substrate, adding substrate does not reduce the inhibition"],
        modelAnswer: "Y binds to the enzyme away from the active site and changes its tertiary structure, so the active site changes shape and substrate cannot bind or react. Because Y is not competing with the substrate, adding more substrate cannot reduce its effect.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Some reversible inhibitors are the end-products of metabolic pathways. Suggest how this benefits a cell.",
        points: ["When the end-product accumulates it inhibits an early enzyme, slowing the pathway", "So the cell does not waste substrate / energy making more than it needs; pathway speeds up again when product is used (negative feedback)"],
        modelAnswer: "When the end-product builds up it inhibits an enzyme early in the pathway, so the pathway slows and the cell does not waste resources making more than it needs; when the product is used up, inhibition is released and production resumes.",
      }),
    ]),
    explanation: "A competitive inhibitor's effect falls as substrate concentration rises; a non-competitive inhibitor's does not. End-product inhibition is negative feedback.",
    hints: ["Compare the percentage inhibition at low and high substrate concentration."],
  });
});
