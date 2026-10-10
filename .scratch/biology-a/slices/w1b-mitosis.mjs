// W1b: mitosis, stages and significance.
import { concept, P, t, chk, table, dpStr, rnd, mitoticIndex } from "../lib.mjs";

concept("abio.division.mitosis", { file: "division/mitosis", keyPrefix: "division.mitosis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "During which stage of mitosis do sister chromatids separate and move to opposite poles?",
    options: [
      ["Anaphase", "Correct: centromeres divide and spindle microtubules pull chromatids apart."],
      ["Metaphase", "In metaphase chromosomes line up on the equator; they have not yet separated."],
      ["Prophase", "In prophase chromosomes condense and the spindle starts to form."],
      ["Telophase", "In telophase the chromosomes have already arrived at the poles."],
    ],
    answer: "A",
    explanation: "In **anaphase** the centromeres divide and shortening spindle microtubules pull the sister chromatids to opposite poles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A cell in a root tip squash shows chromosomes arranged in a single line across the middle of the cell. Which stage is it in?",
    options: [
      ["Metaphase", "Correct: centromeres are aligned on the equator of the spindle."],
      ["Anaphase", "In anaphase two groups of chromosomes move apart towards the poles."],
      ["Telophase", "In telophase two groups of chromosomes are at opposite ends."],
      ["Interphase", "In interphase no separate chromosomes are visible."],
    ],
    answer: "A",
    explanation: "Chromosomes lined up across the equator indicate **metaphase**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does cytokinesis in a plant cell differ from cytokinesis in an animal cell?",
    options: [
      ["A cell plate forms from Golgi vesicles at the equator", "Correct: the rigid wall prevents a furrow, so a new wall is built from the middle outwards."],
      ["A cleavage furrow forms as the membrane is pulled inwards", "This is how animal cells divide their cytoplasm."],
      ["Centrioles divide the cytoplasm into two halves", "Flowering plant cells have no centrioles, and centrioles do not divide cytoplasm."],
      ["The nuclear envelope grows across the cell to split it", "The nuclear envelope surrounds each nucleus; it does not divide the cell."],
    ],
    answer: "A",
    explanation: "Plant cells form a **cell plate** from vesicles of the Golgi body; animal cells form a **cleavage furrow**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What happens to the nuclear envelope during mitosis?",
    options: [
      ["It breaks down at the end of prophase and reforms in telophase", "Correct."],
      ["It breaks down in anaphase and reforms in cytokinesis", "It has already broken down before metaphase so the spindle can reach the chromosomes."],
      ["It stays intact throughout while the chromosomes are separated inside it", "The spindle must reach the chromosomes, so the envelope breaks down (in plants and animals)."],
      ["It breaks down in metaphase and reforms in anaphase", "It is absent during both metaphase and anaphase."],
    ],
    answer: "A",
    explanation: "The envelope **breaks down at the end of prophase** so spindle microtubules can attach to centromeres, and **reforms in telophase** around each group of chromosomes.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Colchicine prevents spindle microtubules from forming. Root tips were treated with colchicine for several hours and then squashed. Which observation would be expected?",
    options: [
      ["Many cells with condensed chromosomes but none in anaphase", "Correct: cells enter mitosis and condense chromosomes but cannot separate chromatids without a spindle."],
      ["Many cells in anaphase with chromatids at the poles", "Without a spindle, chromatids cannot be pulled to the poles."],
      ["No cells with visible chromosomes, because DNA cannot replicate", "Colchicine affects microtubules, not DNA replication."],
      ["All cells in interphase, because cells cannot enter prophase", "Chromosome condensation in prophase does not need a spindle."],
    ],
    answer: "A",
    explanation: "Without spindle microtubules, cells condense their chromosomes but **cannot complete metaphase and anaphase**, so condensed chromosomes accumulate and no anaphase figures are seen.",
    hints: ["Which stages need the spindle?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a count of 500 root tip cells, 410 were in interphase and only 6 in anaphase. What is the best conclusion?",
    options: [
      ["Anaphase lasts a much shorter time than interphase", "Correct: the number of cells in a stage is proportional to its duration."],
      ["Anaphase is the least important stage of the cell cycle", "Duration is not a measure of importance."],
      ["Most cells in the root tip will never divide again", "Interphase cells are often preparing for their next division."],
      ["Cells pass through anaphase more than once per cycle", "Each stage occurs once per cycle."],
    ],
    answer: "A",
    explanation: "If cells divide independently, the fraction in a stage reflects the fraction of the cycle it occupies. Few anaphase cells means **anaphase is short**.",
    hints: ["Why would a stage contain few cells at any moment?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which process does NOT depend on mitosis?",
    options: [
      ["Production of gametes with half the chromosome number", "Correct: halving chromosome number needs meiosis."],
      ["Repair of a broken bone", "Repair uses mitosis to make new identical cells."],
      ["Growth of a seedling", "Growth increases cell number by mitosis."],
      ["Production of new potato plants from tubers", "Asexual reproduction uses mitosis, giving clones."],
    ],
    answer: "A",
    explanation: "Mitosis keeps the chromosome number constant. Gametes are haploid, so they need a **reduction division** (meiosis).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A diploid animal cell with 2n = 8 chromosomes is in anaphase of mitosis. How many chromosomes (separated chromatids) are moving towards each pole?",
    options: [
      ["8", "Correct: each pole receives one copy of all 8 chromosomes, so each daughter nucleus is 2n = 8."],
      ["4", "4 would halve the chromosome number, which happens in meiosis I, not mitosis."],
      ["16", "16 is the total number of chromatids in the whole cell, split between two poles."],
      ["2", "This would leave the daughter cells without most of their chromosomes."],
    ],
    answer: "A",
    explanation: "The cell has 8 chromosomes = 16 chromatids. In anaphase they separate: **8 to each pole**, so each daughter nucleus has 2n = 8.",
    hints: ["Mitosis keeps the chromosome number the same."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The two daughter nuclei produced by mitosis are genetically identical to each other and to the parent nucleus.",
    answer: true,
    explanation: "True (apart from rare mutations). Each daughter receives one copy of every chromatid, which were copied exactly in S phase.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In metaphase of mitosis, homologous chromosomes pair up side by side on the equator.",
    answer: false,
    explanation: "False. In mitosis chromosomes line up **individually**. Homologous chromosomes pair only in meiosis I.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of mitosis with an event that happens during it.",
    pairs: [
      ["Prophase", "Chromosomes condense and the nuclear envelope breaks down"],
      ["Metaphase", "Centromeres line up on the equator of the spindle"],
      ["Anaphase", "Centromeres divide and chromatids move to opposite poles"],
      ["Telophase", "Nuclear envelopes reform and chromosomes uncoil"],
    ],
    explanation: "PMAT: condense; line up; separate; reform.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In a root tip squash, the tip is warmed in dilute {{blank:a}} to separate the cells, and stained with {{blank:b}} so the chromosomes are visible.",
    blanks: [
      { id: "a", accepted: ["hydrochloric acid"], choices: ["hydrochloric acid", "sodium hydroxide", "ethanol", "iodine solution"] },
      { id: "b", accepted: ["acetic orcein"], choices: ["acetic orcein", "Benedict's solution", "biuret reagent", "methylene red"] },
    ],
    explanation: "Warm dilute HCl breaks down the middle lamella; acetic orcein (or toluidine blue) stains DNA.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the structure, formed in the cytoplasm of a dividing plant cell, from which the new cell wall develops.",
    accepted: ["cell plate", "the cell plate", "phragmoplast"],
    wrong: ["cleavage furrow", "middle lamella"],
    explanation: "Golgi vesicles fuse at the equator to form the **cell plate**, which becomes the new wall.",
  });

  // Mitotic index (different data from the lesson)
  const inM = 21 + 9 + 5 + 7;
  const total = 280;
  const mi = mitoticIndex(inM, total);
  chk(mi, 0.15);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "In a squash of a garlic root tip, 280 cells were counted: 21 in prophase, 9 in metaphase, 5 in anaphase, 7 in telophase and the rest in interphase. Calculate the mitotic index, as a decimal to two decimal places.",
    value: mi, dp: 2,
    wrong: [rnd(inM / (total - inM), 2), rnd(9 / total, 2)],
    explanation: `Cells in mitosis = 21 + 9 + 5 + 7 = ${inM}. Mitotic index = ${inM} ÷ ${total} = ${dpStr(mi, 2)}. Dividing by the interphase cells only (${total - inM}) gives the wrong denominator.`,
  });

  const cycleMin = 18 * 60;
  const meta = (9 / total) * cycleMin;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Using the same garlic root tip count (280 cells, 9 in metaphase), and assuming the cell cycle lasts 18 hours, estimate the duration of metaphase in minutes. Give your answer to the nearest minute.",
    value: meta, dp: 0, unit: "min",
    wrong: [rnd((9 / total) * 18, 1), Math.round((9 / inM) * cycleMin)],
    explanation: t`1. Cycle length $= 18 \times 60 = 1080$ minutes.
2. Fraction in metaphase $= 9 \div 280$.
3. Duration $= \dfrac{9}{280} \times 1080 = ${dpStr(meta, 1)} \approx ${Math.round(meta)}$ minutes.
4. Dividing by the 42 cells in mitosis instead of all 280 cells, or leaving the answer in hours, are common errors.`,
    hints: ["Convert hours to minutes first.", "Use the total number of cells, including interphase."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe the behaviour of the chromosomes and the spindle during metaphase and anaphase of mitosis.",
    points: [
      "Metaphase: spindle microtubules attach to the centromere of each chromosome (from opposite poles)",
      "Metaphase: chromosomes line up individually on the equator / metaphase plate",
      "Anaphase: centromeres divide / sister chromatids separate",
      "Anaphase: spindle microtubules shorten, pulling chromatids to opposite poles, centromere first",
    ],
    modelAnswer: "In metaphase, microtubules from each pole attach to the centromere of every chromosome and the chromosomes line up individually on the equator. In anaphase the centromeres divide, and the microtubules shorten, pulling the sister chromatids to opposite poles with their centromeres leading.",
    explanation: "Two points per stage: what the spindle does and what the chromosomes do.",
    hints: ["Mention centromeres in both stages."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why it is important that mitosis produces genetically identical cells in a growing leaf.",
    points: [
      "Every cell needs a complete set of the same genes / chromosomes",
      "So that cells can make the same proteins and function as part of the same tissue",
      "Changes in genetic information could produce faulty proteins / non-functional or uncontrolled cells",
    ],
    modelAnswer: "Each new leaf cell needs a complete, identical copy of the genes so it can make the right proteins and work with the other cells of the tissue. Cells with missing or altered genetic information might make faulty proteins, fail to function or divide uncontrollably.",
    explanation: "Identical genes → correct proteins → coordinated tissue.",
    hints: ["What would happen to a cell that lost some genes?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest how a student could make the estimate of the mitotic index of a root tip more reliable and valid.",
    points: [
      "Count more cells / several fields of view, and calculate a mean",
      "Use several root tips (from different bulbs) as replicates",
      "Take the sample from the same region (e.g. within 2 mm of the tip, the zone of division) each time",
      "Use clear criteria for each stage / ignore cells that overlap or are cut off at the edge of the field / count each cell once",
    ],
    modelAnswer: "Count at least 200 cells over several fields of view and take means; repeat with tips from several bulbs; always sample the zone of division just behind the root cap; and decide in advance how to classify each stage and which edge cells to exclude so no cell is counted twice.",
    explanation: "More data, replicates, standard sampling region and clear counting rules.",
    hints: ["Think about sample size and how cells are classified."],
  });

  // Practice structured: mitotic index along a root
  const dist = [1, 3, 5, 7, 9];
  const divN = [[64, 400], [38, 380], [11, 410], [3, 390], [0, 400]];
  const mis = divN.map(([a, n]) => mitoticIndex(a, n));
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Sipho cut sections at different distances from the tip of an onion root and counted cells in mitosis.\n\n${table(["Distance from root tip / mm", "Cells in mitosis", "Total cells counted"], dist.map((d, i) => [d, divN[i][0], divN[i][1]]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the mitotic index at 3 mm from the tip. Give your answer to two decimal places.",
        value: mis[1], dp: 2, wrong: [rnd(38 / (380 - 38), 2)],
        explanation: t`$38 \div 380 = ${dpStr(mis[1], 2)}$.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Describe how the mitotic index changes with distance from the root tip.",
        points: ["Mitotic index decreases as distance from the tip increases", "Quote figures: e.g. 0.16 at 1 mm falling to 0 at 9 mm"],
        modelAnswer: "The mitotic index falls with distance from the tip, from 0.16 at 1 mm to 0.10 at 3 mm and to zero at 9 mm.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the low mitotic index at 7 mm and 9 mm.",
        points: ["Cells in this region have stopped dividing / left the cell cycle", "They are elongating and differentiating into specialised cells (e.g. xylem, root hair cells)"],
        modelAnswer: "Cells further from the tip have stopped dividing; they are elongating and differentiating into specialised tissues such as xylem, so almost none are in mitosis.",
      }),
      P.mcq({
        label: "(d)", stem: "Which cells were included in the 'total cells counted' but not in 'cells in mitosis'?",
        options: [
          ["Cells in interphase", "Correct: interphase cells are counted in the total but are not dividing."],
          ["Cells in prophase", "Prophase is part of mitosis."],
          ["Cells in telophase", "Telophase is part of mitosis."],
          ["Cells in anaphase", "Anaphase is part of mitosis."],
        ],
        answer: "A",
        explanation: "Interphase cells are in the total only.",
      }),
    ],
    explanation: "Mitotic index is highest in the zone of division near the tip and falls to zero where cells elongate and differentiate.",
    hints: ["Mitotic index = cells in mitosis ÷ total cells."],
    calculator: true,
  });
  chk(rnd(mis[0], 2), 0.16);

  b.struct({
    d: 4, skill: "UNDERSTANDING",
    stem: "A photomicrograph of a stained root tip squash shows four labelled cells. Cell P has a round nucleus with evenly stained granular contents and a dark nucleolus. Cell Q has two groups of V-shaped chromosomes near opposite ends of the cell. Cell R has thread-like chromosomes inside an intact nuclear outline. Cell S has two dense groups of chromosomes at the ends of the cell with a faint line across the middle.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each cell with its stage.",
        pairs: [["Cell P", "Interphase"], ["Cell Q", "Anaphase"], ["Cell R", "Prophase"], ["Cell S", "Telophase"]],
        explanation: "P: no visible chromosomes (interphase). Q: V-shaped chromatids moving apart (anaphase). R: condensing chromosomes in a nucleus (prophase). S: two groups with a cell plate forming (telophase).",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the faint line across the middle of cell S.",
        accepted: ["cell plate", "the cell plate", "new cell wall", "developing cell wall"],
        wrong: ["cleavage furrow"],
        explanation: "The cell plate forms during telophase and cytokinesis in plants.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Give one reason for the V shape of the chromosomes in cell Q.",
        points: ["Chromatids are pulled by the centromere (attached to spindle microtubules), so the arms trail behind"],
        modelAnswer: "Each chromatid is pulled at its centromere by spindle microtubules, so its arms trail behind, making a V.",
      }),
    ],
    explanation: "Interphase, anaphase, prophase and telophase are identified by the state of the chromosomes and nuclear envelope.",
    hints: ["Look for whether chromosomes are visible and where they are."],
  });

  b.card("DEFINITION", "Define **mitosis**.", "Nuclear division producing two genetically identical nuclei with the same chromosome number as the parent nucleus.");
  b.card("CONCEPT", "Prophase", "Chromosomes condense (two chromatids visible), nucleolus disappears, spindle forms, nuclear envelope breaks down.");
  b.card("CONCEPT", "Metaphase", "Spindle microtubules attach to centromeres; chromosomes line up individually on the equator.");
  b.card("CONCEPT", "Anaphase", "Centromeres divide; microtubules shorten and pull sister chromatids to opposite poles.");
  b.card("CONCEPT", "Telophase", "Chromosomes reach poles and uncoil; nuclear envelopes and nucleoli reform; spindle breaks down.");
  b.card("CONCEPT", "Cytokinesis in animals versus plants", "Animals: cleavage furrow. Plants: cell plate from Golgi vesicles.");
  b.card("FORMULA", "Mitotic index", "Number of cells in mitosis ÷ total number of cells counted.");
  b.card("FACT", "Why is the root tip used for a mitosis squash?", "The zone just behind the root cap has many dividing cells (high mitotic index).");
  b.card("FACT", "Uses of mitosis", "Growth, replacement, repair, asexual reproduction and clonal expansion of lymphocytes.");
});
