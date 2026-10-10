// W1b: how meiosis and fertilisation produce genetic variation (both boards; Cambridge A Level only).
import { concept, P, t, chk, assortmentCombos } from "../lib.mjs";

concept("abio.division.genetic-variation", { file: "division/genetic-variation", keyPrefix: "division.genetic-variation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "During which stage of meiosis does crossing over occur?",
    options: [
      ["Prophase I", "Correct: homologous chromosomes pair and chiasmata form."],
      ["Metaphase I", "Metaphase I is when independent assortment of homologous pairs occurs."],
      ["Anaphase II", "In anaphase II sister chromatids separate; there is no pairing."],
      ["Telophase I", "Crossing over needs homologues paired, which happens in prophase I."],
    ],
    answer: "A",
    explanation: "**Crossing over** happens in **prophase I**, when homologous chromosomes are paired as bivalents.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Between which chromatids does crossing over take place?",
    options: [
      ["Non-sister chromatids of homologous chromosomes", "Correct: one chromatid from each homologue exchange sections."],
      ["Sister chromatids of the same chromosome", "Sister chromatids are identical, so swapping between them would not create new combinations."],
      ["Chromatids of non-homologous chromosomes", "Exchange between non-homologous chromosomes is a translocation mutation, not normal crossing over."],
      ["Chromatids of the X and Y chromosomes only", "Crossing over happens in every bivalent."],
    ],
    answer: "A",
    explanation: "Crossing over is between **non-sister chromatids** of a homologous pair, exchanging equivalent sections of DNA.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "An organism has a diploid number of 8. How many genetically different gametes can it produce by independent assortment alone?",
    options: [
      ["16", "Correct: n = 4, so 2⁴ = 16."],
      ["256", "2⁸ uses the diploid number; the formula uses the number of pairs."],
      ["8", "8 is 2n, not the number of combinations."],
      ["4", "4 is the number of pairs, n."],
    ],
    answer: "A",
    explanation: "2n = 8, so n = 4 pairs. Combinations = 2⁴ = **16**.",
  });
  chk(assortmentCombos(4), 16);
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What causes independent assortment of chromosomes in meiosis?",
    options: [
      ["Random orientation of homologous pairs on the equator at metaphase I", "Correct: each pair can face either way, independently."],
      ["Exchange of sections of DNA between non-sister chromatids at chiasmata in prophase I", "That is crossing over, a separate source of variation."],
      ["Fusion of male and female gametes at fertilisation", "That is random fertilisation, after meiosis."],
      ["Replication of DNA in the S phase before meiosis", "Replication copies DNA; it does not mix maternal and paternal chromosomes."],
    ],
    answer: "A",
    explanation: "**Independent assortment** results from the random orientation of each bivalent at metaphase I (and of chromatids at metaphase II).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: t`A bivalent has alleles $G^1$ and $H^1$ on one homologue and $G^2$ and $H^2$ on the other. A single chiasma forms between the two loci. Which set of chromatids is produced?`,
    options: [
      [t`$G^1H^1$, $G^1H^2$, $G^2H^1$ and $G^2H^2$`, "Correct: two parental and two recombinant chromatids."],
      [t`$G^1H^1$, $G^1H^1$, $G^2H^2$ and $G^2H^2$`, "This is the result without crossing over between the loci."],
      [t`$G^1H^2$, $G^1H^2$, $G^2H^1$ and $G^2H^1$`, "Only the two chromatids involved in the chiasma are recombinant."],
      [t`$G^1G^2$, $H^1H^2$, $G^1G^1$ and $H^2H^2$`, "Each chromatid carries one allele of each gene."],
    ],
    answer: "A",
    explanation: t`Only two of the four chromatids take part in one chiasma: they become $G^1H^2$ and $G^2H^1$; the other two remain $G^1H^1$ and $G^2H^2$.`,
    hints: ["How many of the four chromatids are involved in one chiasma?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the sources of genetic variation in sexual reproduction is correct?",
    options: [
      ["Meiosis produces new combinations of alleles, but new alleles arise only by mutation", "Correct: meiosis and fertilisation reshuffle; mutation creates."],
      ["Crossing over produces new alleles of genes", "Crossing over swaps existing alleles between chromatids."],
      ["Independent assortment changes the base sequence of genes on homologous chromosomes", "Assortment distributes whole chromosomes; it does not alter DNA sequence."],
      ["Fertilisation produces new alleles by joining two gametes", "Fertilisation combines existing alleles from two parents."],
    ],
    answer: "A",
    explanation: "Crossing over, independent assortment and random fertilisation produce **new combinations**. Only **mutation** produces new alleles.",
    hints: ["Which process changes the base sequence?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two genes are on the same chromosome. Recombinant gametes are found far less often for genes P and Q than for genes P and R. What is the most likely explanation?",
    options: [
      ["P and Q are closer together on the chromosome than P and R", "Correct: a chiasma is less likely to form between loci that are close together."],
      ["P and Q are on different chromosomes", "The question states both genes are on the same chromosome; unlinked genes would recombine freely."],
      ["P and R never undergo crossing over during prophase I of meiosis", "Frequent recombinants between P and R show crossing over between them."],
      ["Gene Q is on a sex chromosome", "Sex linkage does not explain lower recombination between linked loci."],
    ],
    answer: "A",
    explanation: "The closer two loci are, the less likely a chiasma is to form **between** them, so fewer recombinants are produced.",
    hints: ["Where must a chiasma form to separate two alleles on a chromosome?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A plant has 2n = 14. Ignoring crossing over, how many different chromosome combinations are possible in the zygotes produced when it self-fertilises?",
    options: [
      ["16 384", "Correct: (2⁷)² = 2¹⁴ = 16 384."],
      ["128", "128 = 2⁷ is the number of gamete combinations from one parent."],
      ["196", "14² treats the formula as n², not 2ⁿ."],
      ["256", "256 = 2⁸ does not correspond to n = 7."],
    ],
    answer: "A",
    explanation: "n = 7, so each parent's gametes have 2⁷ = 128 combinations. Zygotes: 128 × 128 = **16 384**.",
    hints: ["Find the gamete combinations first, then combine two gametes."],
  });
  chk(assortmentCombos(7) ** 2, 16384);
  b.tf({
    d: 1, skill: "RECALL",
    stem: "After crossing over, the two chromatids of a chromosome may no longer be genetically identical.",
    answer: true,
    explanation: "True. If one chromatid took part in a chiasma and the other did not, they carry different combinations of alleles.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Independent assortment can only produce variation if crossing over has also taken place.",
    answer: false,
    explanation: "False. Random orientation of homologous pairs at metaphase I produces 2ⁿ combinations even without crossing over.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of variation with when it happens.",
    pairs: [
      ["Crossing over at chiasmata", "Prophase I"],
      ["Random orientation of homologous pairs", "Metaphase I"],
      ["Random orientation of non-identical sister chromatids", "Metaphase II"],
      ["Fusion of any male gamete with any female gamete", "Fertilisation"],
    ],
    explanation: "Prophase I: crossing over. Metaphase I and II: independent assortment. Fertilisation: random combination of gametes.",
  });
  b.fib({
    d: 2,
    stem: "Complete the statements.",
    template: "Humans have 2n = 46, so the number of chromosome combinations in one person's gametes by independent assortment is 2 to the power {{blank:a}}. The points where crossing over occurs are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["23"], input: "number", wrong: "46" },
      { id: "b", accepted: ["chiasmata", "chiasma"], wrong: "centromeres" },
    ],
    explanation: "n = 23, so 2²³ combinations; crossing over occurs at chiasmata.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a chromatid that carries a new combination of alleles as a result of crossing over.",
    accepted: ["recombinant", "recombinant chromatid", "a recombinant chromatid", "recombinant chromosome"],
    wrong: ["parental"],
    explanation: "A chromatid with a new combination of alleles after crossing over is **recombinant**.",
  });

  const n = 12;
  const combos = assortmentCombos(n);
  chk(combos, 4096);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A tomato plant has 2n = 24. How many genetically different combinations of chromosomes can its gametes contain as a result of independent assortment alone?",
    value: combos,
    wrong: [assortmentCombos(24), 24],
    explanation: `n = 24 ÷ 2 = ${n} pairs. Combinations = 2^${n} = ${combos}. Using 2^24 (${assortmentCombos(24)}) wrongly takes the diploid number.`,
  });
  const nb = 9;
  const zyg = assortmentCombos(nb) ** 2;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Cabbage has 2n = 18. Two cabbage plants are crossed. Ignoring crossing over, calculate the number of different chromosome combinations possible in their offspring.",
    value: zyg,
    wrong: [assortmentCombos(nb), assortmentCombos(18) ** 2],
    explanation: t`1. $n = 18 \div 2 = 9$.
2. Gamete combinations from each parent $= 2^{9} = ${assortmentCombos(nb)}$.
3. Each zygote combines one gamete from each parent: $${assortmentCombos(nb)} \times ${assortmentCombos(nb)} = ${zyg}$ (that is, $2^{18}$).
4. Stopping at ${assortmentCombos(nb)} gives only one parent's gametes.`,
    hints: ["Work out the number of gamete types from one parent first.", "Then combine one gamete from each parent."],
  });
  chk(zyg, 262144);

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 5,
    stem: "Explain how meiosis produces genetically different gametes.",
    points: [
      "Homologous chromosomes pair in prophase I and chiasmata form between non-sister chromatids",
      "Crossing over exchanges sections of DNA, producing new combinations of alleles on chromatids (recombinants)",
      "At metaphase I homologous pairs line up randomly on the equator (independent assortment)",
      "So gametes receive different mixtures of maternal and paternal chromosomes: 2ⁿ combinations",
      "At metaphase II non-identical sister chromatids also orient randomly",
    ],
    modelAnswer: "In prophase I homologous chromosomes pair and non-sister chromatids form chiasmata, where they exchange sections of DNA. This crossing over produces chromatids with new combinations of alleles. At metaphase I each homologous pair lines up on the equator in a random orientation, independently of the other pairs, so each gamete receives a different mixture of maternal and paternal chromosomes, giving 2ⁿ combinations. At metaphase II the sister chromatids, no longer identical, are also oriented at random.",
    explanation: "Crossing over plus independent assortment at both metaphases.",
    hints: ["Name two processes and the stage of each."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why genetic variation is important for a population of wild antelope in a changing environment.",
    points: [
      "Individuals differ in characteristics (e.g. resistance to a disease, drought tolerance)",
      "When conditions change, some are better adapted, survive and reproduce more (natural selection)",
      "They pass on their alleles, so the population can adapt / is less likely to become extinct",
    ],
    modelAnswer: "Because the antelope differ genetically, some will have features, such as resistance to a new disease or tolerance of drought, that suit changed conditions. These survive and reproduce more and pass on their alleles, so the population adapts rather than dying out.",
    explanation: "Variation → selection → adaptation.",
    hints: ["Link variation to natural selection."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student says: '2²³ gives the number of genetically different eggs a woman can produce.' Evaluate this statement.",
    points: [
      "2²³ is the number of combinations from independent assortment (random orientation of 23 pairs) alone",
      "Crossing over in prophase I produces many more combinations, so the true number is far greater",
      "It is the number of possible combinations, not the number of eggs actually produced (a woman releases only a few hundred eggs) / mutations add further differences",
    ],
    modelAnswer: "2²³ counts only the combinations produced by the random orientation of the 23 homologous pairs at metaphase I. Crossing over creates recombinant chromatids, so the true number of genetically different eggs possible is far larger. It is also the number of possible combinations, not the number of eggs a woman actually produces in her lifetime.",
    explanation: "The figure is an underestimate of possible variety, and a possibility, not a count of eggs.",
    hints: ["What other source of variation does 2²³ leave out?"],
  });

  // Practice structured: diagram of a cell with 2n = 4 described in words
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A cell with 2n = 4 has one long pair of homologous chromosomes and one short pair. On the long pair, the maternal chromosome carries allele A and the paternal chromosome carries a. On the short pair, the maternal chromosome carries B and the paternal carries b. Assume no crossing over.",
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "How many different gamete genotypes can this cell's parent produce by independent assortment?",
        value: assortmentCombos(2), wrong: [assortmentCombos(4)],
        explanation: "n = 2, so 2² = 4.",
      }),
      P.mcq({
        label: "(b)", stem: "One cell undergoing meiosis has its bivalents arranged so that A and B face the same pole at metaphase I. Which gametes does this one cell produce?",
        options: [
          ["Only gametes with both maternal chromosomes or both paternal chromosomes", "Correct: one orientation sends A with B and a with b, so the gametes are AB and ab."],
          ["Only gametes with one maternal and one paternal chromosome", "Mixed gametes (A with b, a with B) need the opposite orientation of one bivalent."],
          ["All four combinations of maternal and paternal chromosomes", "One cell has one orientation, giving only two kinds of gamete (without crossing over)."],
          ["Gametes with both chromosomes of the long pair together", "Each gamete has one chromosome of each pair, so one allele of each gene."],
        ],
        answer: "A",
        explanation: "One meiotic division with A and B on the same side gives two AB and two ab gametes. Other cells with the other orientation give Ab and aB.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how a single chiasma between the gene locus and the centromere on the long pair could allow one cell to produce all four gamete genotypes.",
        points: ["Crossing over swaps A and a between non-sister chromatids, so each long chromosome has one A chromatid and one a chromatid", "At anaphase II the non-identical chromatids separate, so the pole with B receives A in one gamete and a in the other (AB, aB, Ab, ab)"],
        modelAnswer: "Crossing over exchanges the A and a sections between non-sister chromatids, so each long chromosome now has one A chromatid and one a chromatid. When the chromatids separate in meiosis II, the cells carrying B receive A in one gamete and a in the other, and likewise for b, giving AB, aB, Ab and ab.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State two further ways, apart from meiosis, in which genetic variation arises in a sexually reproducing species.",
        points: ["Random fertilisation (any gamete may fuse with any other)", "Mutation (gene or chromosome mutation, producing new alleles)"],
        modelAnswer: "Random fertilisation, in which any male gamete can fuse with any female gamete, and mutation, which creates new alleles.",
      }),
    ],
    explanation: "Independent assortment gives 2ⁿ combinations across many cells; crossing over can create all combinations in a single cell; fertilisation and mutation add more.",
    hints: ["n = number of homologous pairs.", "One cell has one orientation of each bivalent."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A geneticist counted chiasmata in 50 cells at prophase I from the anthers of a plant with 2n = 12. The mean number of chiasmata per cell was 9.6.",
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "How many bivalents are present in each cell at prophase I?",
        value: 6, wrong: [12],
        explanation: "2n = 12, so there are 6 homologous pairs, forming 6 bivalents.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the mean number of chiasmata per bivalent. Give your answer to two significant figures.",
        value: 9.6 / 6, sf: 2, wrong: [9.6 / 12],
        explanation: t`$9.6 \div 6 = 1.6$ chiasmata per bivalent.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the number of chiasmata affects the amount of genetic variation in the gametes.",
        points: ["Each chiasma is a site of crossing over / exchange between non-sister chromatids", "More chiasmata produce more recombinant chromatids / new combinations of alleles"],
        modelAnswer: "Each chiasma marks a crossing over between non-sister chromatids, so more chiasmata mean more exchanges of alleles and more recombinant chromatids, increasing the variety of gametes.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest why the geneticist counted 50 cells rather than one.",
        points: ["The number of chiasmata varies from cell to cell (position and number are random)", "A mean from many cells is more representative / reliable"],
        modelAnswer: "The number and position of chiasmata differ between cells, so a mean from 50 cells gives a more reliable, representative estimate than one cell.",
      }),
    ],
    explanation: "Six bivalents with an average of 1.6 chiasmata each; more chiasmata, more recombination.",
    hints: ["Number of bivalents = haploid number."],
  });
  chk(9.6 / 6, 1.6, 1e-12);

  b.card("DEFINITION", "Define **crossing over**.", "Exchange of corresponding sections between non-sister chromatids of homologous chromosomes at chiasmata in prophase I.");
  b.card("DEFINITION", "Define **independent assortment**.", "Random orientation of homologous pairs at metaphase I (and chromatids at metaphase II), giving random mixtures of maternal and paternal chromosomes.");
  b.card("FORMULA", "Number of chromosome combinations in gametes", "2ⁿ, where n = haploid number (number of homologous pairs).");
  b.card("FACT", "Gamete combinations in humans (independent assortment only)", "2²³ = 8 388 608.");
  b.card("CONCEPT", "Three sources of variation in sexual reproduction", "Crossing over (prophase I), independent assortment (metaphase I and II), random fertilisation.");
  b.card("CONCEPT", "Where do new alleles come from?", "Only from mutation; meiosis and fertilisation produce new combinations of existing alleles.");
  b.card("DEFINITION", "What is a **chiasma**?", "A point where non-sister chromatids of a bivalent are joined and crossing over has occurred.");
  b.card("CONCEPT", "Why is variation important?", "It allows natural selection: some individuals survive changed conditions and pass on their alleles.");
  b.card("FORMULA", "Zygote combinations from two parents (assortment only)", "2ⁿ × 2ⁿ = 2²ⁿ.");
});
