// W1b: chromosomes and the cell cycle.
import { concept, P, t, chk, table, dpStr, rnd } from "../lib.mjs";

concept("abio.division.chromosomes-cell-cycle", { file: "division/chromosomes-cell-cycle", keyPrefix: "division.chromosomes-cell-cycle" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which phase of the cell cycle is DNA replicated?",
    options: [
      ["S phase", "Correct: S stands for synthesis of DNA."],
      ["G1 phase", "In G1 the cell grows and makes proteins; DNA has not yet been copied."],
      ["G2 phase", "In G2 the DNA has already been replicated; the cell prepares for division."],
      ["Prophase", "Prophase is the first stage of mitosis; replication finished before mitosis began."],
    ],
    answer: "A",
    explanation: "DNA replicates during the **S (synthesis) phase** of interphase, producing two sister chromatids per chromosome.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are histone proteins able to bind tightly to DNA?",
    options: [
      ["Histones are positively charged and DNA phosphate groups are negatively charged", "Correct: the opposite charges attract."],
      ["Histones form hydrogen bonds with the bases inside the double helix", "The bases are paired inside the helix; histones interact with the outer sugar-phosphate backbone."],
      ["Histones are joined to DNA by phosphodiester bonds", "Phosphodiester bonds link nucleotides within DNA; histones are not covalently bonded."],
      ["Histones and DNA are both hydrophobic molecules", "DNA's phosphate backbone is charged and hydrophilic."],
    ],
    answer: "A",
    explanation: "Histones are rich in basic (positively charged) amino acids such as lysine and arginine, which attract the **negatively charged phosphate groups** of DNA.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A human cell in G2 is examined. How many chromosomes and how many chromatids does it contain?",
    options: [
      ["46 chromosomes and 92 chromatids", "Correct: replication doubles the chromatids but the chromosome number (counted by centromeres) stays 46."],
      ["92 chromosomes and 92 chromatids", "Sister chromatids joined at one centromere count as one chromosome."],
      ["46 chromosomes and 46 chromatids", "After S phase each chromosome has two chromatids."],
      ["23 chromosomes and 46 chromatids", "23 is the haploid number found in gametes, not body cells."],
    ],
    answer: "A",
    explanation: "After S phase each of the 46 chromosomes consists of two sister chromatids: **46 chromosomes, 92 chromatids**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the main function of telomeres?",
    options: [
      ["To prevent the loss of genes from chromosome ends during replication", "Correct: the repeats are lost instead of coding DNA."],
      ["To attach chromosomes to the spindle during mitosis", "Spindle microtubules attach at the centromere (kinetochore)."],
      ["To code for the histone proteins that pack DNA", "Telomeres are non-coding repeats."],
      ["To start the transcription of the genes that lie near the ends of each chromosome", "Transcription starts at promoters, not telomeres."],
    ],
    answer: "A",
    explanation: "DNA polymerase cannot fully copy the end of a linear chromosome. Telomeres are **non-coding repeats** that are shortened instead of genes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of stem cell is found in adult bone marrow?",
    options: [
      ["Multipotent stem cells that form different types of blood cell", "Correct: they give rise to a limited range of cell types."],
      ["Totipotent stem cells that can form any cell, including placenta", "Only the zygote and the very early embryo are totipotent."],
      ["Pluripotent stem cells taken from the inner cell mass", "Pluripotent cells come from the early embryo (blastocyst)."],
      ["Fully differentiated cells that can no longer divide", "Stem cells are unspecialised and keep dividing."],
    ],
    answer: "A",
    explanation: "Bone marrow stem cells are **multipotent**: they produce red cells, white cells and platelets, but not, for example, neurones.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A graph of DNA content per cell against time for a dividing cell shows the content doubling gradually over several hours and later halving suddenly. What causes the sudden halving?",
    options: [
      ["Separation of the cell into two daughter cells at the end of division", "Correct: the replicated DNA is shared between two cells at cytokinesis."],
      ["Breakdown of half of the DNA by enzymes in the nucleus", "DNA is not destroyed; it is shared between daughter cells."],
      ["Condensation of the chromosomes into short, thick structures at the start of prophase", "Condensation changes packing, not the amount of DNA."],
      ["Separation of the sister chromatids at metaphase", "Chromatids separate at anaphase, and DNA per cell falls only when the cell divides."],
    ],
    answer: "A",
    explanation: "DNA doubles gradually in S phase. The amount **per cell** halves only when the cytoplasm divides at cytokinesis, giving two cells.",
    hints: ["The y-axis is DNA content per cell, not per nucleus or per chromosome."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A drug blocks the synthesis of tubulin, the protein that makes microtubules. In which phase is the cell most likely to be prevented from completing the cycle?",
    options: [
      ["Mitosis, because no spindle can form", "Correct: spindle fibres are microtubules made of tubulin."],
      ["S phase, because DNA polymerase needs tubulin", "DNA polymerase does not need tubulin."],
      ["G1 phase, because cells cannot grow without tubulin", "Growth in G1 involves many proteins; the drug's main target is the spindle."],
      ["Cytokinesis only, because tubulin forms the cell wall", "Cell walls are made of cellulose, not tubulin."],
    ],
    answer: "A",
    explanation: "Tubulin is made in G2 ready for spindle assembly. Without microtubules the **spindle** cannot form, so chromatids cannot be separated in mitosis.",
    hints: ["What structures are made of microtubules during division?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Most human body cells grown in culture stop dividing after a limited number of divisions, but many cancer cells keep dividing. Which explanation is best supported by knowledge of telomeres?",
    options: [
      ["Cancer cells often produce telomerase, which keeps telomeres long", "Correct: telomerase adds repeats, so the cells avoid the limit set by telomere shortening."],
      ["Cancer cells have no telomeres, so nothing can be lost", "Without telomeres, genes would be lost at each replication."],
      ["Cancer cells do not replicate their DNA before dividing", "All dividing cells replicate their DNA in S phase."],
      ["Body cells lose one whole gene at every division until no genes remain at the ends", "Body cells lose telomere repeats, not genes, at each division."],
    ],
    answer: "A",
    explanation: "Telomeres shorten at each replication; when they are very short, normal cells stop dividing. **Telomerase** restores them, and it is active in most cancer cells.",
    hints: ["Which enzyme can lengthen telomeres?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Interphase is the longest part of the cell cycle in most dividing cells.",
    answer: true,
    explanation: "True. G1, S and G2 together take most of the cycle; mitosis is relatively short.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Sister chromatids are genetically different because they come from different parents.",
    answer: false,
    explanation: "False. Sister chromatids are **identical** copies made in S phase. The two members of a homologous pair come from different parents.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each phase of the cell cycle with its main event.",
    pairs: [
      ["G1", "Cell growth and synthesis of proteins and organelles"],
      ["S", "Replication of DNA"],
      ["G2", "Synthesis of proteins needed for division, such as tubulin"],
      ["Cytokinesis", "Division of the cytoplasm into two cells"],
    ],
    explanation: "G1 growth; S DNA replication; G2 preparation for division; mitosis nuclear division; cytokinesis cytoplasmic division.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "A replicated chromosome consists of two sister {{blank:a}} joined at the {{blank:b}}. During interphase the DNA is loosely packed as {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["chromatids"], choices: ["chromatids", "homologues", "centrioles"] },
      { id: "b", accepted: ["centromere"], choices: ["centromere", "telomere", "centriole"] },
      { id: "c", accepted: ["chromatin"], choices: ["chromatin", "chromatids", "nucleolus"] },
    ],
    explanation: "Two chromatids joined at a centromere; uncondensed DNA with histones is chromatin.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the enzyme that adds repeated sequences to the ends of chromosomes in stem cells.",
    accepted: ["telomerase"],
    wrong: ["DNA polymerase", "ligase"],
    explanation: "**Telomerase** lengthens telomeres; it is active in stem cells, germ-line cells and most cancer cells.",
  });

  // Numerical: phase duration from counts (different data from the lesson)
  const cycle = 16;
  const counts = { G1: 112, S: 96, G2: 48, M: 64 };
  const tot = counts.G1 + counts.S + counts.G2 + counts.M;
  chk(tot, 320);
  const sDur = (counts.S / tot) * cycle;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `In a rapidly dividing tissue the cell cycle lasts 16 hours. Of 320 cells classified by their DNA content and appearance, the numbers in each phase were:\n\n${table(["Phase", "G1", "S", "G2", "M"], [["Number of cells", counts.G1, counts.S, counts.G2, counts.M]])}\n\nEstimate the duration of the S phase in hours, to one decimal place.`,
    value: sDur, dp: 1, unit: "h",
    wrong: [rnd((counts.S / cycle), 1), rnd(counts.S / 100 * cycle, 1)],
    explanation: t`1. Fraction of cells in S $= 96 \div 320 = 0.30$.
2. Duration $= 0.30 \times 16 = ${dpStr(sDur, 1)}$ hours.
3. This assumes the cells are dividing independently, so the chance of catching a cell in a phase is proportional to how long the phase lasts.`,
    hints: ["Fraction of cells in a phase × total cycle time.", "Total number of cells = 320."],
  });

  // Numerical: DNA content
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A cell in G1 contains 14 pg (picograms) of DNA. How much DNA, in pg, will the same cell contain in G2?",
    value: 28, wrong: [14, 7],
    explanation: "DNA doubles during S phase, so G2 content = 2 × 14 = 28 pg. It returns to 14 pg in each daughter cell after division.",
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe the events of interphase.",
    points: [
      "G1: the cell grows; proteins / organelles are made (normal metabolism)",
      "S: DNA is replicated (semi-conservatively), so each chromosome has two sister chromatids",
      "G2: the cell grows further; proteins for division (e.g. tubulin) are made / ATP stores built up",
      "Checkpoints: DNA is checked for damage or errors before mitosis / before S",
    ],
    modelAnswer: "In G1 the cell grows and makes proteins and organelles. In S the DNA is replicated, so each chromosome becomes two identical sister chromatids. In G2 the cell continues to grow and makes the proteins it needs for division, such as tubulin for the spindle. Checkpoints check the DNA for damage before the cell proceeds.",
    explanation: "Name each sub-phase with its events.",
    hints: ["Interphase has three parts."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why chromosomes condense at the start of mitosis.",
    points: [
      "Long, thin DNA molecules would tangle / break if moved",
      "Short, thick chromosomes can be separated / pulled by the spindle without tangling",
      "So each daughter nucleus receives a complete, identical set of DNA",
    ],
    modelAnswer: "Uncondensed DNA is extremely long and thin and would tangle or break when moved. Coiling it into short, thick chromosomes lets the spindle separate the chromatids cleanly, so each daughter nucleus receives one complete copy of every chromosome.",
    explanation: "Condensing protects the DNA and makes separation accurate.",
    hints: ["Think about moving long threads without tangling them."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Bone marrow transplants are used to treat some leukaemias. Explain why bone marrow is used, and suggest one difficulty of the treatment.",
    points: [
      "Bone marrow contains multipotent (haematopoietic) stem cells",
      "They divide by mitosis and differentiate into all types of blood cell, replacing the patient's diseased blood-forming cells",
      "Stem cells keep dividing throughout life, so the supply is continuous",
      "Difficulty: finding a donor with matching antigens / risk of rejection or of the donor cells attacking the patient / need for immunosuppression",
    ],
    modelAnswer: "Bone marrow contains multipotent stem cells that divide by mitosis and differentiate into red cells, white cells and platelets. After a transplant they replace the patient's faulty blood-forming cells and keep producing new blood cells for life. A difficulty is finding a donor whose tissue antigens match closely; otherwise the transplant may be rejected or the donor cells may attack the patient's tissues.",
    explanation: "Name the stem cell type, its potency, and one practical or immunological difficulty.",
    hints: ["What kind of stem cell is in bone marrow and what can it become?"],
  });

  // Practice structured: DNA content graph described as a table
  const time = [0, 2, 4, 6, 8, 10, 12, 14, 16];
  const dna = [6, 6, 6, 8, 10, 12, 12, 12, 6];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `The DNA content of a single plant cell was measured every 2 hours through one cell cycle.\n\n${table(["Time / h", ...time.map(String)], [["DNA content / arbitrary units", ...dna.map(String)]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "During which period was the cell in the S phase?",
        options: [
          ["4 to 10 hours", "Correct: DNA content rises from 6 to 12 units."],
          ["0 to 4 hours", "DNA content is constant at 6 units: this is G1."],
          ["10 to 14 hours", "DNA content is constant at 12 units: G2 and mitosis."],
          ["14 to 16 hours", "DNA content halves: cytokinesis."],
        ],
        answer: "A",
        explanation: "DNA is being synthesised when the content rises, from 4 to 10 hours.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "What is the DNA content of each daughter cell, in arbitrary units?",
        value: 6, wrong: [12],
        explanation: "12 units are shared equally between two cells, so each has 6 units.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the DNA content halves between 14 and 16 hours.",
        points: ["Sister chromatids have separated into two nuclei (in mitosis)", "The cytoplasm divides (cytokinesis), so each new cell has half the replicated DNA"],
        modelAnswer: "Mitosis has separated the sister chromatids into two nuclei and cytokinesis has then divided the cell into two, so each daughter cell contains half of the 12 units: 6 units.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two processes, other than DNA replication, that take place between 0 and 4 hours.",
        points: ["Cell growth / increase in cytoplasm", "Synthesis of proteins or organelles (e.g. mitochondria, ribosomes) / transcription and translation"],
        modelAnswer: "The cell grows in size and makes new proteins and organelles, such as ribosomes and mitochondria, by transcription and translation.",
      }),
    ],
    explanation: "Flat at 6 units (G1), rising to 12 (S), flat at 12 (G2 and mitosis), halving at cytokinesis.",
    hints: ["Where does the line rise?"],
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "Researchers compared the average telomere length in white blood cells of people of different ages. Telomeres were longest in young children and became steadily shorter with age.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why telomeres become shorter with age.",
        points: ["DNA polymerase cannot replicate the very end of a linear DNA molecule fully", "So some telomere repeats are lost at each cell division / replication; older people's cells have divided more times"],
        modelAnswer: "At every replication the end of each DNA molecule cannot be copied completely, so a few telomere repeats are lost. Cells in older people have been through more divisions, so their telomeres are shorter.",
      }),
      P.tf({
        label: "(b)", stem: "True or false: the shortening of telomeres removes genes from the chromosome ends at every division.",
        answer: false,
        explanation: "False. The repeats are lost instead of genes; genes are only at risk when telomeres become very short.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why the white blood cells studied are produced from stem cells, yet still show telomere shortening.",
        points: ["Stem cells have some telomerase but its activity may not fully replace the repeats lost", "White blood cells go through further divisions after leaving the stem cell population (without telomerase)"],
        modelAnswer: "Bone marrow stem cells have telomerase, but it may not fully replace the repeats lost over a lifetime, and the blood cells are produced through several further divisions after leaving the stem cell population, each shortening the telomeres.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Give the term for the region of non-coding repeated DNA at each end of a chromosome.",
        accepted: ["telomere", "telomeres"],
        wrong: ["centromere"],
        explanation: "Telomeres cap each chromosome end.",
      }),
    ],
    explanation: "Incomplete replication of chromosome ends shortens telomeres with each division; telomerase can only partly restore them.",
    hints: ["What happens at the very end of a linear DNA molecule at each replication?"],
  });

  b.card("DEFINITION", "What is a **chromosome**?", "One long DNA molecule wound around histone proteins; after replication, two sister chromatids joined at a centromere.");
  b.card("DEFINITION", "What are **telomeres**?", "Non-coding repeated sequences at chromosome ends that are shortened at each replication instead of genes.");
  b.card("CONCEPT", "Phases of the cell cycle", "G1 (growth) → S (DNA replication) → G2 (preparation) → mitosis → cytokinesis.");
  b.card("FACT", "What happens to DNA content in S phase?", "It doubles: 1 unit → 2 units; each chromosome gets two chromatids.");
  b.card("CONCEPT", "Why do histones bind DNA?", "Positively charged histones attract the negatively charged phosphate groups of DNA.");
  b.card("DEFINITION", "Totipotent, pluripotent, multipotent", "Toti: any cell incl. placenta (zygote). Pluri: almost any body cell (embryonic stem cells). Multi: a limited range (bone marrow).");
  b.card("FACT", "What does telomerase do?", "Adds repeats to telomeres; active in stem cells, germ-line cells and most cancer cells.");
  b.card("CONCEPT", "Estimating phase duration from cell counts", "Duration = (cells in phase ÷ total cells) × length of the cell cycle.");
  b.card("FACT", "Chromosomes and chromatids in a human G2 cell", "46 chromosomes, 92 chromatids.");
});
