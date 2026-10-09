// Slice W2b: cell division, mitosis and meiosis (ZIMSEC only).
import { concept, P, check, agricultureLevels } from "../lib.mjs";

// Numbers differ from the lesson (16 cells, cattle 60/30, 12 gametes).
const DIV = 5;
const cells = 2 ** DIV;
check(cells === 32, "cells");
const MAIZE = 20;
const maizeGamete = MAIZE / 2;
const MEIO_CELLS = 7;
const gametes = MEIO_CELLS * 4;
check(maizeGamete === 10 && gametes === 28, "maize");
const GOAT = 60; // goat 2n = 60
const goatEgg = GOAT / 2;

concept("agri.breeding.cell-division", { file: "breeding/cell-division", keyPrefix: "breeding.cell-division" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a gene?",
    options: [
      ["A length of DNA that controls one characteristic", "Correct: genes lie in a line along a chromosome."],
      ["A whole chromosome found in the nucleus of a cell", "A chromosome carries many genes."],
      ["The fluid that fills a cell around the nucleus", "That is the cytoplasm."],
      ["A cell that is produced in the testes of a male animal", "That describes a sperm cell."],
    ],
    answer: "A",
    explanation: "A gene is a section of DNA on a chromosome that controls a characteristic.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which stage of mitosis do the chromosomes line up across the equator of the spindle?",
    options: [
      ["Metaphase", "Correct: the chromosomes line up at the equator."],
      ["Prophase", "In prophase the chromosomes shorten and become visible."],
      ["Anaphase", "In anaphase the chromatids move to the poles."],
      ["Telophase", "In telophase new nuclei form."],
    ],
    answer: "A",
    explanation: "Prophase, metaphase (line up), anaphase (separate), telophase (new nuclei).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How many cells are produced when one cell divides by meiosis?",
    options: [
      ["Four, each with half the chromosome number", "Correct: two divisions give four haploid cells."],
      ["Two, each with the same chromosome number", "This describes mitosis."],
      ["Two, each with half the chromosome number", "Meiosis has two divisions, giving four cells."],
      ["Four, each with the same chromosome number", "Meiosis halves the number."],
    ],
    answer: "A",
    explanation: "Meiosis: two divisions, four haploid cells that differ genetically.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where in a maize plant does meiosis take place?",
    options: [
      ["In the anthers and ovules", "Correct: meiosis produces pollen and egg cells."],
      ["In the root tips", "Root tips grow by mitosis."],
      ["In the cambium of the stem", "Maize has no cambium; cambium divides by mitosis in dicotyledons."],
      ["In the leaf mesophyll", "Leaf cells do not divide by meiosis."],
    ],
    answer: "A",
    explanation: "Meiosis happens only in reproductive organs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why are all the plants grown from cuttings of one cassava plant genetically identical?",
    options: [
      ["The new cells are all made by mitosis", "Correct: mitosis copies chromosomes exactly."],
      ["Meiosis in the cuttings removes any differences", "Cuttings do not undergo meiosis; it would create differences."],
      ["Cassava has fewer chromosomes than most crops", "Chromosome number does not explain identical offspring."],
      ["Cuttings are taken only from the oldest stems", "The age of the stem does not affect genetic identity."],
    ],
    answer: "A",
    hints: ["Which kind of division produces identical cells?"],
    explanation: "Vegetative growth is by mitosis, so the new plants are clones.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does meiosis produce variation among the offspring of two parents?",
    options: [
      ["Pairs separate randomly and crossing over occurs", "Correct: these shuffle the genes in every gamete."],
      ["Meiosis copies each chromosome exactly into all four of the new cells", "Exact copying would not cause variation; that is closer to mitosis."],
      ["The environment changes the genes during meiosis", "The environment affects how genes are expressed, not meiosis."],
      ["Meiosis doubles the number of chromosomes in each gamete", "Meiosis halves the number."],
    ],
    answer: "A",
    hints: ["Think about what happens to homologous pairs in the first division."],
    explanation: "Independent assortment and crossing over give every gamete a different set of genes.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two calves have the same sire and very similar genes for growth. One gains weight much faster than the other. What is the best explanation?",
    options: [
      ["Their feeding and health care differed", "Correct: the environment affects how far genes are expressed."],
      ["Mitosis does not take place in slow-growing calves", "All growing calves grow by mitosis."],
      ["The slower calf has fewer chromosomes in its cells", "Calves of one species have the same chromosome number."],
      ["Meiosis in the faster calf's muscles added many extra muscle cells", "Muscle grows by mitosis; meiosis makes gametes only."],
    ],
    answer: "A",
    hints: ["Phenotype = genotype + environment."],
    explanation: "Similar genotypes give different phenotypes in different environments.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gametes are haploid.",
    answer: true,
    explanation: "True. They have one set of chromosomes, so fertilisation restores the diploid number.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Mitosis produces cells that are genetically different from the parent cell.",
    answer: false,
    explanation: "False. Mitosis produces cells identical to the parent; meiosis produces different cells.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of mitosis with what happens in it.",
    pairs: [
      ["Prophase", "Chromosomes shorten and become visible; nuclear membrane breaks down"],
      ["Metaphase", "Chromosomes line up on the equator of the spindle"],
      ["Anaphase", "Chromatids are pulled to opposite poles"],
      ["Telophase", "New nuclear membranes form and the cytoplasm divides"],
    ],
    explanation: "PMAT: prophase, metaphase, anaphase, telophase.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Body cells with two sets of chromosomes are {{blank:a}}. Before division each chromosome copies itself to form two {{blank:b}} joined at a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["diploid"] },
      { id: "b", accepted: ["chromatids", "chromatid", "sister chromatids"] },
      { id: "c", accepted: ["centromere"] },
    ],
    explanation: "Diploid cells; chromatids joined at the centromere.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the type of cell division that produces sperm in the testes of a bull.",
    accepted: ["meiosis", "meiotic division", "reduction division"],
    rejected: ["mitosis"],
    explanation: "Gametes are produced by **meiosis**.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A cell in a shoot tip divides by mitosis, and every new cell divides again, ${DIV} times in all. How many cells are there at the end?`,
    value: cells, wrong: [DIV * 2, 2 ** (DIV - 1)],
    explanation: `The number doubles each time: 2 × 2 × 2 × 2 × 2 = 2^${DIV} = ${cells} cells.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `Goat body cells have ${GOAT} chromosomes. How many chromosomes are there in a goat egg cell?`,
    value: goatEgg, wrong: [GOAT, GOAT * 2],
    explanation: `Meiosis halves the number: ${GOAT} ÷ 2 = ${goatEgg}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **four** differences between mitosis and meiosis.",
    hints: ["Number of divisions and cells, chromosome number, genetic make-up, where."],
    points: [
      "Mitosis has one division; meiosis has two.",
      "Mitosis gives two cells; meiosis gives four.",
      "Mitosis keeps the chromosome number (diploid); meiosis halves it (haploid).",
      "Mitosis gives identical cells (in body tissues); meiosis gives genetically different cells (in reproductive organs).",
    ],
    modelAnswer: "Mitosis has one division and gives two identical diploid cells in growing tissues; meiosis has two divisions and gives four different haploid cells in reproductive organs.",
    explanation: "Matched pairs of differences.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the importance of mitosis in crop production.",
    hints: ["Think of growth, repair and propagation."],
    points: [
      "Growth of roots, shoots and fruits at meristems / increase in plant size.",
      "Repair of damaged tissues, e.g. after hail or pruning.",
      "Asexual (vegetative) propagation and tissue culture give identical, true-to-type plants.",
    ],
    modelAnswer: "Mitosis at root and shoot tips makes the crop grow; it repairs damage from hail or pruning; and it allows cuttings, tubers and tissue culture to produce plants identical to a good parent.",
    explanation: "Three uses of mitosis.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Maize body cells have ${MAIZE} chromosomes. A pupil describes four drawings of dividing root-tip cells: (W) chromosomes in a line across the middle of the cell; (X) two groups of chromosomes at opposite ends of the cell; (Y) two new nuclei and a new cell wall forming; (Z) chromosomes shortening and thickening inside the nucleus.`,
    hints: ["Put the stages in order: prophase, metaphase, anaphase, telophase.", "Root tips grow by mitosis."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which order of the drawings shows the stages correctly?",
        options: [
          ["Z, W, X, Y", "Correct: prophase, metaphase, anaphase, telophase."],
          ["W, Z, X, Y", "The chromosomes become visible (Z) before they line up (W)."],
          ["Z, X, W, Y", "Lining up (W) comes before separation (X)."],
          ["Y, Z, W, X", "New nuclei (Y) form last."],
        ],
        answer: "A",
        explanation: "Z prophase, W metaphase, X anaphase, Y telophase.",
      }),
      P.short({ label: "(b)", stem: "Name the stage shown in drawing X.", accepted: ["anaphase"], explanation: "Chromatids moving to the poles: anaphase." }),
      P.num({
        label: "(c)", stem: "How many chromosomes will each daughter cell have?",
        value: MAIZE, wrong: [maizeGamete],
        explanation: `Mitosis keeps the number: ${MAIZE}.`,
      }),
      P.num({
        label: "(d)", stem: `How many chromosomes are there in a maize pollen grain's male nucleus?`,
        value: maizeGamete, wrong: [MAIZE],
        explanation: `Gametes are haploid: ${MAIZE} ÷ 2 = ${maizeGamete}.`,
      }),
      P.num({
        label: "(e)", stem: `${MEIO_CELLS} cells in an anther divide by meiosis. How many haploid cells are produced?`,
        value: gametes, wrong: [MEIO_CELLS * 2],
        explanation: `Each meiosis gives 4 cells: ${MEIO_CELLS} × 4 = ${gametes}.`,
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Explain why gametes must be haploid.",
        points: [
          "At fertilisation two gametes fuse.",
          "If each had the full (diploid) number, the zygote would have double the number.",
          "Haploid gametes restore the diploid number, keeping the chromosome number constant each generation.",
        ],
        explanation: "Meiosis keeps the species number constant.",
      }),
    ],
    explanation: "Order the mitosis stages, then apply chromosome numbers to mitosis, meiosis and fertilisation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Nyasha plants seed of the same maize hybrid in two fields. Field A is fertilised, weeded and planted on time; field B is planted late into poor soil and not weeded. Field A yields far more grain.",
    hints: ["The seed is the same, so what differs?"],
    parts: [
      P.short({
        label: "(a)", stem: "State the term for the genetic make-up of the plants, which is the same in both fields.",
        accepted: ["genotype", "the genotype"],
        explanation: "Same seed, same genotype.",
      }),
      P.short({
        label: "(b)", stem: "State the term for the observable characteristics, such as yield, that differ between the fields.",
        accepted: ["phenotype", "the phenotype"],
        explanation: "Yield is part of the phenotype.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the difference in yield.",
        points: ["The genotype sets the yield potential, which is the same in both fields.", "The environment in B (poor nutrients, weed competition, late planting) stopped the genes being fully expressed."],
        explanation: "Phenotype = genotype + environment.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Give **two** other farm examples of the environment affecting the expression of genes.",
        points: ["A high-producing dairy cow gives little milk if underfed or heat-stressed.", "Seedlings grown in darkness are pale (etiolated) although they have genes for chlorophyll (or: exotic breeds grow poorly with heavy tick loads)."],
        explanation: "Any two valid examples.",
      }),
    ],
    explanation: "Genes set the potential; the environment decides the result.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer says: \"Buying an expensive bull with excellent genes is all I need to improve my herd.\" Evaluate this statement using your knowledge of genes, cell division and the environment.",
    hints: ["What does meiosis do to the bull's genes in his offspring?", "What else affects performance?"],
    points: [
      "The bull passes on genes through sperm made by meiosis, each carrying half his chromosomes.",
      "Each calf gets half its genes from the cow, so cows' quality matters too.",
      "Meiosis gives variation, so not every calf inherits the best combination of genes.",
      "Calves grow by mitosis, but their growth depends on feeding, water and health (environment).",
      "Poor nutrition, disease or ticks prevent good genes from being expressed.",
      "Judgement: a good bull helps but improvement needs good cows, selection of offspring and good management.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "A good bull does improve a herd, because his sperm, made by meiosis, carry his genes for growth into many calves. But each sperm carries only half of his chromosomes, and each calf receives the other half from its dam, so the cows also matter. Because meiosis shuffles genes, the calves vary and not all inherit his best qualities, so the farmer must still select the best offspring. Finally, genes only set potential: calves that are underfed, short of water or carrying heavy tick and worm loads will not grow well. So the statement is too simple: the bull is one part of improvement, together with good cows, selection and good management.",
    explanation: "Weigh genetic and environmental factors and judge.",
  });

  b.card("DEFINITION", "Chromosome", "Thread-like structure of DNA and protein in the nucleus, carrying genes.");
  b.card("DEFINITION", "Diploid and haploid", "Diploid (2n): two sets of chromosomes (body cells). Haploid (n): one set (gametes).");
  b.card("CONCEPT", "Stages of mitosis", "Prophase (chromosomes visible), metaphase (line up at equator), anaphase (chromatids to poles), telophase (new nuclei, cytoplasm divides).");
  b.card("CONCEPT", "Result of meiosis", "Two divisions; four haploid cells, genetically different; in testes, ovaries, anthers, ovules.");
  b.card("CONCEPT", "Importance of mitosis", "Growth, repair, asexual reproduction and tissue culture; identical cells.");
  b.card("CONCEPT", "Importance of meiosis", "Makes gametes, keeps chromosome number constant over generations, creates variation.");
  b.card("FACT", "Chromosome number in a cattle sperm (body cells 60)", "30.");
  b.card("FORMULA", "Phenotype", "Phenotype = genotype + environment.");
  b.card("CONCEPT", "Sources of variation in meiosis", "Independent assortment of chromosome pairs and crossing over.");
});
