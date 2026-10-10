// W1b: meiosis, the reduction division (both boards; Cambridge A Level only).
import { concept, P, t, chk, table } from "../lib.mjs";

concept("abio.division.meiosis", { file: "division/meiosis", keyPrefix: "division.meiosis" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many cells are produced when one diploid cell completes meiosis, and what is their chromosome number?",
    options: [
      ["Four haploid cells", "Correct: two divisions give four cells, each with n chromosomes."],
      ["Two diploid cells", "This is the result of mitosis."],
      ["Two haploid cells", "Two haploid cells exist after meiosis I; meiosis II doubles the number of cells to four."],
      ["Four diploid cells", "Meiosis halves the chromosome number, so the cells are haploid."],
    ],
    answer: "A",
    explanation: "Meiosis has two divisions and produces **four haploid** cells, genetically different from each other.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which stage of meiosis do homologous chromosomes separate and move to opposite poles?",
    options: [
      ["Anaphase I", "Correct: whole homologous chromosomes (each with two chromatids) are separated."],
      ["Anaphase II", "In anaphase II sister chromatids separate."],
      ["Metaphase I", "In metaphase I bivalents line up on the equator; they have not yet separated."],
      ["Prophase II", "In prophase II chromosomes recondense and new spindles form."],
    ],
    answer: "A",
    explanation: "**Anaphase I** separates homologous chromosomes, halving the chromosome number. Centromeres do not divide until anaphase II.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a bivalent?",
    options: [
      ["A pair of homologous chromosomes lying together during prophase I", "Correct: two chromosomes, four chromatids."],
      ["A chromosome made of two sister chromatids", "That is any replicated chromosome, in mitosis or meiosis."],
      ["The point where two non-sister chromatids of a homologous pair cross over and exchange DNA", "That point is a chiasma."],
      ["A cell with two sets of chromosomes", "A cell with two sets is diploid."],
    ],
    answer: "A",
    explanation: "A **bivalent** is a homologous pair associated in prophase I and metaphase I: two chromosomes, four chromatids.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about homologous chromosomes is correct?",
    options: [
      ["They carry the same genes at the same loci but may carry different alleles", "Correct: one is maternal, one paternal."],
      ["They are identical copies made during S phase", "Identical copies made in S phase are sister chromatids."],
      ["They carry different genes but have the same length and centromere position", "Homologues carry the same genes at the same loci."],
      ["They are found together only in haploid cells", "Haploid cells have one chromosome of each pair."],
    ],
    answer: "A",
    explanation: "Homologous chromosomes have the same genes in the same order (and same size and centromere position), but may have **different alleles**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A cell has 2n = 18. How many chromatids are present in the cell during metaphase I of meiosis?",
    options: [
      ["36", "Correct: 18 chromosomes, each of two chromatids, after S phase."],
      ["18", "18 is the number of chromosomes; each has two chromatids."],
      ["9", "9 is the haploid number, reached after meiosis I."],
      ["72", "DNA replicates only once before meiosis."],
    ],
    answer: "A",
    explanation: "After replication each of the 18 chromosomes has two chromatids: **36 chromatids** (in 9 bivalents).",
    hints: ["DNA has replicated before meiosis begins."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a cell produced by meiosis I have the haploid number of chromosomes even though its DNA content is the same as that of a diploid cell in G1?",
    options: [
      ["It has one chromosome from each homologous pair, and each chromosome still has two chromatids", "Correct: number of chromosomes is halved, but chromatids have not yet separated."],
      ["It has lost half of its genes during anaphase I", "No genes are lost; each pair is split between two cells."],
      ["DNA replicated again during telophase I", "There is no replication between meiosis I and II."],
      ["It has two chromosomes from each homologous pair, but each chromosome has only one chromatid", "It has only one chromosome from each pair, and each still has two chromatids."],
    ],
    answer: "A",
    explanation: "Meiosis I halves chromosome number (one of each pair), but each chromosome is still two chromatids, so DNA content equals that of a G1 diploid cell.",
    hints: ["Chromosome number is counted by centromeres."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In an anther squash, a cell shows four groups of condensed chromosomes, each group surrounded by a newly forming nuclear envelope. Which stage is this?",
    options: [
      ["Telophase II", "Correct: four nuclei form at the end of meiosis II (a tetrad)."],
      ["Telophase I", "Telophase I gives two nuclei, not four."],
      ["Anaphase II", "In anaphase II chromatids are still moving apart; envelopes have not reformed."],
      ["Prophase I", "Prophase I has a single nucleus with paired chromosomes."],
    ],
    answer: "A",
    explanation: "Four nuclei forming indicates **telophase II**, producing a tetrad of haploid cells.",
    hints: ["How many nuclei are present at the end of each division?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of stages both show individual chromosomes (not bivalents) lined up on an equator?",
    options: [
      ["Metaphase of mitosis and metaphase II of meiosis", "Correct: in both, single chromosomes (each two chromatids) align."],
      ["Metaphase of mitosis and metaphase I of meiosis", "Metaphase I has bivalents, not single chromosomes."],
      ["Metaphase I and metaphase II of meiosis", "Metaphase I has bivalents."],
      ["Anaphase I and anaphase II of meiosis", "Chromosomes are moving to the poles in anaphase, not lined up."],
    ],
    answer: "A",
    explanation: "Metaphase II resembles mitotic metaphase: single chromosomes on the equator. Only metaphase I has **bivalents**.",
    hints: ["In which metaphase are homologous pairs together?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "DNA replicates between meiosis I and meiosis II.",
    answer: false,
    explanation: "False. DNA replicates only once, in the S phase before meiosis I. This is why the four products are haploid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Chiasmata form between non-sister chromatids of homologous chromosomes during prophase I.",
    answer: true,
    explanation: "True. Chiasmata are the points where non-sister chromatids of a bivalent cross and exchange segments (crossing over).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of meiosis with what happens.",
    pairs: [
      ["Prophase I", "Homologous chromosomes pair to form bivalents"],
      ["Metaphase I", "Bivalents line up on the equator"],
      ["Anaphase I", "Homologous chromosomes move to opposite poles"],
      ["Anaphase II", "Centromeres divide and sister chromatids separate"],
    ],
    explanation: "Pairing (prophase I), alignment of pairs (metaphase I), separation of homologues (anaphase I), separation of chromatids (anaphase II).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Human body cells are {{blank:a}} with 46 chromosomes. Gametes are {{blank:b}} with {{blank:c}} chromosomes, so fertilisation restores the number.",
    blanks: [
      { id: "a", accepted: ["diploid"], choices: ["diploid", "haploid"] },
      { id: "b", accepted: ["haploid"], choices: ["diploid", "haploid"] },
      { id: "c", accepted: ["23"], input: "number", wrong: "46" },
    ],
    explanation: "Body cells are diploid (2n = 46); gametes are haploid (n = 23); 23 + 23 = 46 at fertilisation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a group of four haploid cells produced from one pollen mother cell by meiosis.",
    accepted: ["tetrad", "a tetrad", "tetrads"],
    wrong: ["bivalent", "dyad"],
    explanation: "The four products of meiosis in an anther stay together briefly as a **tetrad** before separating into pollen grains.",
  });

  // Numerical: chromosome and DNA bookkeeping
  const twoN = 38;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A cat body cell has 2n = 38. How many chromosomes are in each cell at the end of meiosis I?",
    value: twoN / 2, wrong: [twoN, twoN * 2],
    explanation: `Meiosis I separates homologous pairs, so each cell receives one chromosome of each pair: ${twoN} ÷ 2 = ${twoN / 2} chromosomes (each still of two chromatids).`,
  });
  const g1 = 7.0;
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A diploid cell in G1 contains 7.0 pg of DNA. It goes on to complete meiosis. What mass of DNA, in pg, is in each cell produced at the end of meiosis II? Give your answer to two significant figures.",
    value: g1 / 2, sf: 2,
    wrong: [g1, g1 / 4],
    explanation: t`1. S phase doubles DNA: $7.0 \times 2 = 14$ pg.
2. Meiosis I halves it: $14 \div 2 = 7.0$ pg per cell.
3. Meiosis II halves it again: $7.0 \div 2 = 3.5$ pg per cell.
4. Each gamete has half the G1 DNA content. Forgetting the S phase gives 1.75 pg.`,
    hints: ["Remember the S phase before meiosis I.", "Two halvings follow."],
  });
  chk(g1 / 2, 3.5);

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Describe what happens to the chromosomes during prophase I and metaphase I of meiosis.",
    points: [
      "Prophase I: chromosomes condense / shorten and thicken",
      "Prophase I: homologous chromosomes pair to form bivalents",
      "Prophase I: chiasmata form between non-sister chromatids / crossing over occurs",
      "Metaphase I: bivalents line up on the equator, homologues attached to spindle fibres from opposite poles (random orientation)",
    ],
    modelAnswer: "In prophase I the chromosomes condense and homologous chromosomes pair up to form bivalents. Non-sister chromatids cross at chiasmata, where crossing over occurs. In metaphase I the bivalents line up on the equator of the spindle, with the centromere of each homologue attached to microtubules from opposite poles; the orientation of each pair is random.",
    explanation: "Condense, pair, chiasmata, bivalents on the equator.",
    hints: ["Use the terms bivalent and chiasmata."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why meiosis is necessary in organisms that reproduce sexually.",
    points: [
      "Gametes must be haploid / have half the chromosome number",
      "So that fusion of two gametes at fertilisation restores the diploid number",
      "Keeping the chromosome number constant from generation to generation (and generating variation)",
    ],
    modelAnswer: "Fertilisation fuses two gametes, so if gametes had the full diploid number the chromosome number would double each generation. Meiosis halves the number, so the zygote is diploid and the number stays constant. It also produces genetic variation.",
    explanation: "Halve → restore at fertilisation → constant number.",
    hints: ["What would happen to chromosome number over generations without meiosis?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Give four differences between anaphase of mitosis and anaphase I of meiosis.",
    points: [
      "Mitosis: centromeres divide; anaphase I: centromeres do not divide",
      "Mitosis: sister chromatids separate; anaphase I: homologous chromosomes separate",
      "Mitosis: each pole receives the diploid number; anaphase I: each pole receives the haploid number",
      "Mitosis: the chromatids moving are identical; anaphase I: each chromosome moving may have non-identical chromatids (after crossing over)",
    ],
    modelAnswer: "In mitotic anaphase the centromeres divide, but in anaphase I they do not. In mitosis sister chromatids are separated, while in anaphase I whole homologous chromosomes are separated. Each pole in mitosis receives the diploid number of chromatids; in anaphase I each pole receives the haploid number of chromosomes. In mitosis the separating chromatids are identical, whereas in anaphase I each chromosome may consist of non-identical chromatids because of crossing over.",
    explanation: "Each difference must give both sides.",
    hints: ["What separates in each: chromatids or homologues?"],
  });

  // Practice structured: DNA per cell through meiosis
  const stagesT = [0, 4, 8, 10, 12, 14, 16];
  const dnaT = [10, 10, 20, 20, 10, 10, 5];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `The DNA content per cell was measured in cells from an anther as they went through interphase and meiosis.\n\n${table(["Time / h", ...stagesT.map(String)], [["DNA per cell / arbitrary units", ...dnaT.map(String)]])}`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Between which times does DNA replication occur?",
        options: [
          ["4 and 8 h", "Correct: DNA doubles from 10 to 20 units."],
          ["10 and 12 h", "DNA halves here: meiosis I and cytokinesis."],
          ["14 and 16 h", "DNA halves here: meiosis II."],
          ["0 and 4 h", "DNA is constant at 10 units (G1)."],
        ],
        answer: "A",
        explanation: "DNA doubles between 4 and 8 h: S phase.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the division that occurs between 10 h and 12 h.",
        accepted: ["meiosis I", "meiosis 1", "first meiotic division", "the first division of meiosis", "meiosis one"],
        wrong: ["meiosis II", "mitosis"],
        explanation: "The first halving from 20 to 10 units is meiosis I (with cytokinesis).",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "The cell at 0 h is diploid. What is the DNA content of a haploid gamete nucleus formed later (in units)?",
        value: 5, wrong: [10],
        explanation: "After meiosis II the DNA content is half the G1 value: 5 units.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the DNA content at 16 h is half the content at 0 h, although the content doubled at 4-8 h.",
        points: [
          "DNA replicated once (S phase) doubling 10 to 20 units",
          "Meiosis I halved it by separating homologous chromosomes (20 to 10 units)",
          "Meiosis II halved it again by separating sister chromatids (10 to 5) with no further replication",
        ],
        modelAnswer: "DNA replicated once in S phase, doubling the content from 10 to 20 units. Meiosis I separated the homologous chromosomes into two cells (10 units each), and meiosis II, with no replication in between, separated the sister chromatids (5 units each). One doubling and two halvings leave half the starting content.",
      }),
    ],
    explanation: "One replication, two divisions: the gametes have half the G1 DNA content.",
    hints: ["Count the doublings and the halvings."],
  });

  b.struct({
    d: 4, skill: "UNDERSTANDING",
    stem: "Nyasha examined an anther squash from a young lily bud. In one cell she saw thick chromosomes arranged in pairs across the middle of the cell, each pair showing one or two points where chromatids crossed.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the stage of meiosis shown.",
        accepted: ["metaphase I", "metaphase 1", "metaphase one"],
        wrong: ["metaphase II", "metaphase"],
        explanation: "Bivalents on the equator: metaphase I.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the points where the chromatids crossed.",
        accepted: ["chiasmata", "chiasma"],
        wrong: ["centromeres"],
        explanation: "The crossing points are chiasmata.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give two reasons why this cell cannot be in metaphase of mitosis.",
        points: ["Chromosomes are in homologous pairs / bivalents (in mitosis they are single)", "Chiasmata are visible (crossing over does not occur in mitosis)"],
        modelAnswer: "The chromosomes are lined up as homologous pairs (bivalents), whereas in mitosis they line up singly, and chiasmata are visible, which never form in mitosis.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe what will happen to these chromosomes in the next stage.",
        points: ["Homologous chromosomes of each pair separate / are pulled to opposite poles by spindle fibres", "Centromeres do not divide; each chromosome still has two chromatids"],
        modelAnswer: "In anaphase I the spindle microtubules pull the homologous chromosomes of each pair to opposite poles. The centromeres do not divide, so each chromosome still consists of two chromatids.",
      }),
    ],
    explanation: "Bivalents with chiasmata on the equator identify metaphase I; next, homologues separate in anaphase I.",
    hints: ["Are the chromosomes single or paired?"],
  });

  b.card("DEFINITION", "Define **meiosis**.", "A reduction division: one diploid nucleus divides twice to form four genetically different haploid nuclei.");
  b.card("DEFINITION", "Define **homologous chromosomes**.", "A maternal and paternal pair with the same genes at the same loci, same size and centromere position; alleles may differ.");
  b.card("DEFINITION", "Haploid versus diploid", "Haploid (n): one set of chromosomes (gametes). Diploid (2n): two sets (body cells).");
  b.card("CONCEPT", "What separates in anaphase I and anaphase II?", "Anaphase I: homologous chromosomes. Anaphase II: sister chromatids (centromeres divide).");
  b.card("DEFINITION", "What is a **bivalent**?", "A pair of homologous chromosomes together in prophase I and metaphase I: four chromatids.");
  b.card("FACT", "Is there an S phase between meiosis I and II?", "No: DNA replicates once, before meiosis I.");
  b.card("CONCEPT", "Metaphase I versus metaphase II", "Metaphase I: bivalents on the equator. Metaphase II: single chromosomes on the equator.");
  b.card("CONCEPT", "Three differences between mitosis and meiosis", "Mitosis: one division, two identical diploid cells, no pairing. Meiosis: two divisions, four different haploid cells, bivalents and chiasmata.");
  b.card("FACT", "What tissue is squashed to see meiosis in plants?", "Anthers of young flower buds (pollen mother cells), stained with acetic orcein.");
});
