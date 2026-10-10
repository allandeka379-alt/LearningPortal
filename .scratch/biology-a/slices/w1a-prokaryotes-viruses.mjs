// W1a: prokaryotic cells and viruses.
import { concept, P, t, chk, convert, actualSize, magnification } from "../lib.mjs";

concept("abio.cells.prokaryotes-viruses", { file: "cells/prokaryotes-viruses", keyPrefix: "cells.prokaryotes-viruses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main component of the cell wall of a bacterium?",
    options: [
      ["Peptidoglycan", "Correct: bacterial walls are peptidoglycan (murein), polysaccharide chains cross-linked by peptides."],
      ["Cellulose", "Cellulose forms the walls of plant cells."],
      ["Chitin", "Chitin forms the walls of fungi and the exoskeleton of insects."],
      ["Collagen", "Collagen is a fibrous protein found outside animal cells, not a wall component."],
    ],
    answer: "A",
    explanation: "Peptidoglycan gives the bacterial cell its shape and stops it bursting by osmosis. Some antibiotics, such as penicillin, stop it being made.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature is found in **both** a bacterium and a liver cell?",
    options: [
      ["Ribosomes", "Correct: all cells have ribosomes (70S in bacteria, 80S in the cytoplasm of liver cells)."],
      ["Mitochondria", "Bacteria have no mitochondria; respiration happens on their cell surface membrane."],
      ["Nuclear envelope", "Bacteria have no nucleus; their DNA is free in the cytoplasm."],
      ["Golgi body", "Bacteria have no membrane-bound organelles such as the Golgi body."],
    ],
    answer: "A",
    explanation: "Ribosomes, a cell surface membrane, cytoplasm and DNA are common to all cells. Membrane-bound organelles occur only in eukaryotes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about the DNA of a typical bacterium is correct?",
    options: [
      ["It is circular and is not associated with histone proteins", "Correct: bacterial DNA is a circular molecule in the cytoplasm, without histones."],
      ["It is linear and is wound around histones in a nucleus", "This describes the chromosomes of eukaryotic cells."],
      ["It is enclosed in a double membrane, forming a region called the nucleoid", "The nucleoid is the region where the DNA lies; it has no membrane."],
      ["It is replaced by RNA when the bacterium is not dividing", "Bacteria always store their genes as DNA; some viruses use RNA."],
    ],
    answer: "A",
    explanation: "Prokaryotic DNA is circular, lies free in the cytoplasm in the nucleoid region and lacks histones; plasmids are additional small circles of DNA.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a plasmid?",
    options: [
      ["A small loop of DNA separate from the main bacterial chromosome", "Correct: plasmids often carry genes such as antibiotic resistance."],
      ["A protein projection used by bacteria to attach to surfaces", "This describes a pilus."],
      ["A slime layer of polysaccharide outside the bacterial wall", "This describes the capsule."],
      ["A long rotating protein filament used by some bacteria for swimming", "This describes a bacterial flagellum."],
    ],
    answer: "A",
    explanation: "Plasmids are small circular DNA molecules that replicate independently and can be transferred between bacteria; they are also used as vectors in genetic engineering.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which structure is found in **every** virus particle?",
    options: [
      ["A protein capsid around a core of nucleic acid", "Correct: every virus has nucleic acid inside a protein coat."],
      ["A phospholipid envelope taken from the host cell", "Only some viruses, such as HIV and influenza, have an envelope."],
      ["A set of 70S ribosomes for making viral proteins", "Viruses have no ribosomes; they use the host cell's ribosomes."],
      ["Both DNA and RNA enclosed in a protein coat", "A virus contains DNA or RNA, never both."],
    ],
    answer: "A",
    explanation: "Viruses are nucleic acid (DNA or RNA) in a protein capsid. An envelope is present only in some. They have no ribosomes or cytoplasm.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Antibiotics such as penicillin are not effective against HIV. Which reason is correct?",
    options: [
      ["HIV has no peptidoglycan wall or 70S ribosomes to act on", "Correct: antibiotics target bacterial structures and processes that viruses lack."],
      ["HIV is too large for antibiotic molecules to enter its capsid", "HIV is about 120 nm across, much smaller than a bacterium."],
      ["HIV contains DNA instead of RNA, so the antibiotic cannot bind", "HIV is an RNA virus, and the type of nucleic acid is not the reason."],
      ["HIV divides by binary fission too quickly for the antibiotic", "Viruses do not divide; they are assembled inside host cells."],
    ],
    answer: "A",
    explanation: "Penicillin stops bacteria making peptidoglycan walls; other antibiotics target 70S ribosomes. A virus has no wall, ribosomes or metabolism of its own, so antibiotics have nothing to act on (antiviral drugs work differently).",
    hints: ["What do antibiotics such as penicillin act on in a bacterium?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "An unknown cell is 3 µm long, has a wall, 70S ribosomes, no membrane-bound organelles and its DNA free in the cytoplasm. Which conclusion is best supported?",
    options: [
      ["It is a prokaryote", "Correct: no membrane-bound organelles, DNA free in the cytoplasm and 70S ribosomes are prokaryotic features."],
      ["It is a plant cell, because it has a wall", "Plant cells are larger, have a nucleus and 80S cytoplasmic ribosomes."],
      ["It is a fungal cell, because it is very small", "Fungi are eukaryotes with nuclei and membrane-bound organelles."],
      ["It is a virus, because it has 70S ribosomes", "Viruses have no ribosomes at all and are not cells."],
    ],
    answer: "A",
    explanation: "Having a wall does not make a cell a plant cell. The decisive evidence is the absence of a nucleus and of membrane-bound organelles, together with 70S ribosomes and a size of a few µm.",
    hints: ["Which features distinguish prokaryotes from all eukaryotes?"],
  });
  const len = actualSize(36, "mm", 12000, "µm");
  chk(len, 3);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "An electron micrograph at ×12 000 shows a bacterium 36 mm long. Calculate its actual length in µm.",
    value: len, unit: "µm",
    wrong: ["0.003", "333"],
    explanation: "36 mm = 36 000 µm; 36 000 ÷ 12 000 = 3 µm, within the usual 1–5 µm range for bacteria.",
  });
  const virus = convert(actualSize(27, "mm", 300000, "µm"), "µm", "nm");
  chk(virus, 90);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "An electron micrograph of a virus at ×300 000 shows a particle 27 mm across. Calculate the actual diameter of the virus in nm.",
    value: virus, unit: "nm",
    wrong: ["0.09", "11111"],
    explanation: t`1. $27\ \text{mm} = 27 \times 10^{6}\ \text{nm}$.
2. Actual diameter $= 27 \times 10^{6} \div 300\,000 = 90\ \text{nm}$.
3. Working in µm gives 0.09 µm, which must be multiplied by 1000 to give nm. 90 nm is a typical virus size.`,
    hints: ["1 mm = 1 000 000 nm."],
  });
  const ratio = convert(4.5, "µm", "nm") / 150;
  chk(ratio, 30);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A bacterium is 4.5 µm long and a virus is 150 nm across. How many times longer is the bacterium than the virus is wide?",
    value: ratio,
    wrong: ["0.03", "33.3"],
    explanation: "4.5 µm = 4500 nm; 4500 ÷ 150 = 30 times. Comparing 4.5 with 150 without converting gives 0.03.",
    hints: ["Put both lengths in the same unit."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Bacteria contain mitochondria in which aerobic respiration takes place.",
    answer: false,
    explanation: "False. Bacteria have no membrane-bound organelles; the enzymes of aerobic respiration are on the cell surface membrane.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A virus can contain either DNA or RNA as its genetic material, but not both.",
    answer: true,
    explanation: "True. HIV and influenza contain RNA; viruses such as smallpox contain DNA.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each bacterial structure with its function.",
    pairs: [
      ["Capsule", "Protection against drying out and phagocytosis"],
      ["Pilus", "Attachment to surfaces or other bacteria"],
      ["Flagellum", "Movement by rotation"],
      ["Plasmid", "Carries extra genes such as antibiotic resistance"],
      ["Cell wall", "Prevents bursting by osmosis and maintains shape"],
    ],
    explanation: "Capsule: protection; pili: attachment; flagella: locomotion; plasmids: extra genes; peptidoglycan wall: shape and protection against osmotic lysis.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the comparison.",
    template: "Prokaryotic cells have {{blank:a}} ribosomes, whereas the cytoplasm of eukaryotic cells has {{blank:b}} ribosomes. Prokaryotes divide by {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["70S"], choices: ["70S", "80S", "60S", "90S"] },
      { id: "b", accepted: ["80S"], choices: ["70S", "80S", "60S", "90S"] },
      { id: "c", accepted: ["binary fission"], choices: ["binary fission", "mitosis", "meiosis", "budding"] },
    ],
    explanation: "70S in prokaryotes (and in mitochondria and chloroplasts), 80S in eukaryotic cytoplasm. Prokaryotes divide by binary fission; mitosis needs a nucleus and spindle.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the protein coat that surrounds the nucleic acid of a virus.",
    accepted: ["capsid", "the capsid", "protein capsid"],
    wrong: ["envelope", "cell wall"],
    explanation: "The **capsid** is built of repeating protein units (capsomeres). An envelope, when present, lies outside it and comes from the host cell membrane.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Compare the structure of a prokaryotic cell with that of a eukaryotic animal cell. Give **four** differences.",
    points: [
      "Prokaryote has no nucleus / DNA free in cytoplasm; eukaryote has a nucleus with a nuclear envelope",
      "Prokaryote DNA circular without histones; eukaryote DNA linear with histones (or plasmids only in prokaryotes)",
      "Prokaryote has 70S ribosomes; eukaryote cytoplasm has 80S",
      "Prokaryote has no membrane-bound organelles (no mitochondria, ER, Golgi); eukaryote has them (or prokaryote has a peptidoglycan wall, animal cell has no wall; or size 1–5 µm v 10–100 µm)",
    ],
    modelAnswer: "A prokaryote has no nucleus, its DNA lying free in the cytoplasm, whereas an animal cell has a nucleus surrounded by an envelope. Prokaryotic DNA is circular and has no histones, while eukaryotic DNA is linear and wound around histones. Prokaryotes have 70S ribosomes, but the animal cell cytoplasm has 80S ribosomes. Prokaryotes have no membrane-bound organelles, whereas animal cells have mitochondria, ER and a Golgi body. Also, the prokaryote has a peptidoglycan wall, which the animal cell lacks.",
    explanation: "Each difference must refer to both cells.",
    hints: ["Think: nucleus, DNA, ribosomes, organelles, wall, size."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss whether viruses should be considered living organisms.",
    points: [
      "Not alive: not cellular / no cytoplasm or ribosomes",
      "Not alive: no metabolism (do not respire, feed, excrete or grow) / inert outside a host, can be crystallised",
      "Alive: contain genetic material (nucleic acid) that is copied and reproduce inside host cells (or mutate and evolve by natural selection)",
      "Conclusion: they show only some features of life, so usually regarded as non-living or on the boundary",
    ],
    modelAnswer: "Viruses are not made of cells and have no cytoplasm or ribosomes. They do not respire, feed or grow and are inert outside a host; some can even be crystallised. On the other hand, they contain nucleic acid that carries genes, they reproduce inside host cells, and they mutate and evolve, as HIV does. Because they show only some features of life, and only inside other cells, most biologists regard them as non-living or on the border between living and non-living.",
    explanation: "A *discuss* answer needs both sides and a reasoned conclusion.",
    hints: ["List the characteristics of living things and check each one."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the structure of an enveloped virus such as HIV.",
    points: [
      "Core of nucleic acid: RNA (in HIV) / DNA or RNA in general",
      "Surrounded by a protein capsid (made of capsomeres)",
      "Outer envelope of phospholipid taken from the host cell membrane, with viral glycoproteins",
    ],
    modelAnswer: "HIV has a core of RNA (with some enzymes such as reverse transcriptase) enclosed in a protein capsid. Around this is an envelope of phospholipid taken from the host cell's membrane when the virus left the cell, with viral glycoproteins projecting from it.",
    explanation: "Three layers from the inside out: nucleic acid, capsid, envelope.",
    hints: ["Work from the inside outwards."],
  });
  const magE = magnification(30, "mm", 2.5, "µm");
  const capsA = convert(actualSize(9, "mm", magE, "µm"), "µm", "nm");
  chk(magE, 12000);
  chk(capsA, 750);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "An electron micrograph shows a rod-shaped cell with a scale bar of 2.5 µm that is 30 mm long. The cell has a thick outer layer of slime 9 mm thick, a wall, a membrane, dense granules about 20 nm across throughout the cytoplasm, a pale region of fibres in the centre with no surrounding membrane, and several long filaments from one end.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the magnification of the micrograph.", value: magE, prefix: "×", wrong: ["12"], explanation: "30 000 µm ÷ 2.5 µm = ×12 000." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the actual thickness of the slime layer in nm.", value: capsA, unit: "nm", wrong: ["0.75"], explanation: "9 mm = 9000 µm; 9000 ÷ 12 000 = 0.75 µm = 750 nm." }),
      P.mcq({
        label: "(c)", marks: 1, stem: "Which structure is the pale region of fibres in the centre of the cell?",
        options: [["Circular DNA in the nucleoid", "Correct: prokaryotic DNA lies in the cytoplasm with no membrane around it."], ["A nucleus bounded by an envelope", "No membrane surrounds the region, so it is not a nucleus."], ["A large permanent vacuole", "Bacteria have no large permanent vacuole, and a vacuole would be bounded by a membrane."], ["A group of mitochondria", "Bacteria have no mitochondria."]],
        answer: "A", explanation: "The nucleoid region holds the circular DNA without a membrane.",
      }),
      P.manual({ label: "(d)", marks: 2, stem: "Give **two** pieces of evidence from the description that show this is a prokaryotic cell.", points: ["DNA / fibres not surrounded by a membrane (no nucleus)", "Ribosomes about 20 nm (70S) / no membrane-bound organelles described / slime capsule and flagella / small size"], modelAnswer: "The DNA lies free with no nuclear envelope, and the only granules are small (about 20 nm) ribosomes with no membrane-bound organelles." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest the functions of the slime layer and of the long filaments.", points: ["Slime layer / capsule: protection (against drying out / phagocytosis) or attachment to surfaces", "Long filaments / flagella: movement (locomotion)"], modelAnswer: "The slime layer is a capsule that protects the bacterium from drying out and from phagocytosis, and the long filaments are flagella that rotate to move the cell." }),
    ],
    explanation: "Scale bar → magnification → actual size. No nucleus, small ribosomes and no organelles identify a prokaryote; capsule and flagella are optional bacterial features.",
    hints: ["Find the magnification from the scale bar first."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Tendai compares two microorganisms used in a food laboratory in Harare. Organism X (from yoghurt) is 2 µm long, has a peptidoglycan wall, 70S ribosomes and no membrane-bound organelles. Organism Y (baker's yeast) is 8 µm long, has a chitin wall, a nucleus, mitochondria and 80S ribosomes in its cytoplasm.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which organism is a prokaryote?", options: [["X", "Correct: no membrane-bound organelles and 70S ribosomes."], ["Y", "Y has a nucleus and mitochondria: it is a eukaryote (a fungus)."], ["Both X and Y", "Y has a nucleus, so it is not a prokaryote."], ["Neither X nor Y", "X has all the features of a prokaryote."]], answer: "A", explanation: "X is a bacterium." }),
      P.num({ label: "(b)", marks: 1, stem: "How many times longer is Y than X?", value: 8 / 2, wrong: ["0.25"], explanation: "8 ÷ 2 = 4 times." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give **two** differences, other than size and wall material, that would be visible in electron micrographs of X and Y.", points: ["X has no nucleus (DNA free in cytoplasm); Y has a nucleus with an envelope", "X has no mitochondria / membrane-bound organelles; Y has mitochondria (or X has smaller ribosomes)"], modelAnswer: "X has no nucleus, its DNA lying in the cytoplasm, whereas Y has a nucleus with a nuclear envelope; X has no mitochondria or other membrane-bound organelles, whereas Y has mitochondria." }),
      P.manual({ label: "(d)", marks: 2, stem: "An antibiotic binds only to 70S ribosomes. Explain why it stops growth of X but has little effect on Y.", points: ["X's ribosomes are 70S, so protein synthesis in X stops", "Y's cytoplasmic ribosomes are 80S, so the antibiotic does not bind and Y's protein synthesis continues"], modelAnswer: "X has 70S ribosomes, so the antibiotic binds and stops its protein synthesis; Y makes most of its proteins on 80S ribosomes, which the antibiotic does not bind." }),
    ],
    explanation: "Prokaryotes lack membrane-bound organelles and have 70S ribosomes; antibiotics that target 70S ribosomes therefore affect bacteria selectively.",
    hints: ["Which organism has membrane-bound organelles?"],
  });

  b.card("DEFINITION", "What is a prokaryote?", "An organism whose cell lacks a nucleus and membrane-bound organelles; DNA is free in the cytoplasm.");
  b.card("FACT", "Bacterial cell wall material?", "Peptidoglycan (murein).");
  b.card("FACT", "Typical size of a bacterium and of a virus?", "Bacterium about 1–5 µm; virus about 20–300 nm.");
  b.card("CONCEPT", "Bacterial DNA versus eukaryotic DNA?", "Bacteria: circular, no histones, in the cytoplasm, plus plasmids. Eukaryotes: linear chromosomes with histones in a nucleus.");
  b.card("DEFINITION", "What is a plasmid?", "A small circle of DNA separate from the main chromosome, often carrying genes such as antibiotic resistance.");
  b.card("CONCEPT", "Structure of a virus?", "DNA or RNA core, protein capsid; some have an envelope from the host membrane. No ribosomes or cytoplasm.");
  b.card("FACT", "Optional features of bacteria?", "Capsule (slime layer), pili and flagella.");
  b.card("CONCEPT", "Why do antibiotics not work on viruses?", "Viruses lack the bacterial targets (peptidoglycan wall, 70S ribosomes, metabolism).");
  b.card("CONCEPT", "One argument that viruses are alive and one that they are not?", "Alive: they have genes and reproduce and evolve inside hosts. Not alive: not cells, no metabolism, inert outside a host.");
});
