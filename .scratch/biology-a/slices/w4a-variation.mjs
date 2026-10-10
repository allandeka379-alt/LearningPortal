// W4a: variation, genetic and environmental causes (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t, chk, table, dpStr, sfStr, sum, mean, pctChange } from "../lib.mjs";

concept("abio.evolution.variation", { file: "evolution/variation", keyPrefix: "evolution.variation" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which characteristic in humans shows discontinuous variation?",
    options: [
      ["ABO blood group", "Correct: four distinct groups controlled by one gene."],
      ["Height", "Height is continuous: polygenes plus environment."],
      ["Body mass", "Mass varies continuously and depends strongly on diet."],
      ["Skin colour in humans", "Skin colour is controlled by several genes and varies continuously."],
    ],
    answer: "A",
    explanation: "ABO blood groups fall into distinct classes controlled by one gene with three alleles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A Himalayan rabbit has dark fur on its ears, nose and feet but white fur elsewhere. A patch of its back is shaved and kept cold, and the fur grows back dark. What does this show?",
    options: [
      ["Temperature affects the expression of the gene for fur pigment", "Correct: the enzyme for dark pigment is active only at low temperature."],
      ["Cold causes a mutation in the gene for fur colour", "The change is not a mutation and is not inherited."],
      ["Fur colour in Himalayan rabbits is controlled only by the environment", "The rabbit must have the allele for the temperature-sensitive enzyme."],
      ["The rabbit's offspring will have dark fur on their backs", "Environmentally caused changes are not inherited."],
    ],
    answer: "A",
    explanation: "Genotype provides the temperature-sensitive enzyme; temperature determines where it acts.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which process is the only source of completely new alleles?",
    options: [
      ["Mutation", "Correct."],
      ["Crossing over", "Crossing over recombines existing alleles."],
      ["Independent assortment", "This shuffles whole chromosomes with existing alleles."],
      ["Random fertilisation", "This combines existing alleles from two parents."],
    ],
    answer: "A",
    explanation: "Only mutation creates new alleles; the other processes produce new combinations of existing alleles.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "How should the lengths of 200 leaves be displayed to show their variation?",
    options: [
      ["A histogram with touching bars", "Correct: continuous data grouped into classes."],
      ["A bar chart with gaps between the bars", "Gaps suggest separate categories: discontinuous data."],
      ["A pie chart of the leaf lengths", "Pie charts show proportions of a whole, not a distribution."],
      ["A line graph of length against leaf number", "Leaf number is not a continuous variable."],
    ],
    answer: "A",
    explanation: "Continuous data are grouped into equal classes and shown as a histogram.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Identical twins raised apart differ in body mass by 9 kg. What is the most likely cause of this difference?",
    options: [
      ["Different environments, such as diet and exercise", "Correct: identical twins share the same genotype."],
      ["Different alleles inherited from their parents", "Identical twins come from one zygote and have the same alleles."],
      ["Crossing over during their own growth", "Crossing over happens in meiosis, not in growth."],
      ["Independent assortment in their body cells", "Body cells divide by mitosis, which produces identical cells."],
    ],
    answer: "A",
    explanation: "Identical twins are genetically identical, so differences between them are environmental.",
    hints: ["Do identical twins differ in genotype?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a plant, a cross gives offspring with red, pink and white flowers in a 1 : 2 : 1 ratio, whatever the soil or light conditions. What is the best explanation?",
    options: [
      ["One gene with two codominant alleles", "Correct: three distinct classes in a 1 : 2 : 1 ratio, unaffected by environment."],
      ["Many genes with small additive effects", "Polygenes plus environment give a continuous range."],
      ["One gene with a dominant and a recessive allele", "Complete dominance gives a 3 : 1 ratio of two classes."],
      ["Environmental effects on flower pigment", "The ratio does not change with the environment."],
    ],
    answer: "A",
    explanation: "Distinct classes, a 1 : 2 : 1 ratio and no environmental effect point to one gene with codominance (discontinuous variation).",
    hints: ["How many classes, and in what ratio?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Cuttings from one cassava plant are grown in soils with different nitrogen levels, and tuber mass varies widely. Seedlings from many different parents grown in identical soil also vary. What do these results show about tuber mass?",
    options: [
      ["It is affected by both the environment and the genotype", "Correct: clones vary with soil (environment); different genotypes vary in the same soil (genes)."],
      ["It is affected by the environment only, because the cuttings varied", "The seedlings varied in identical soil, so genes matter too."],
      ["It is affected by the genotype only, because the seedlings varied", "The genetically identical cuttings also varied."],
      ["It shows discontinuous variation controlled by one gene", "Wide, graded variation in mass suggests continuous variation."],
    ],
    answer: "A",
    explanation: "Clones separate out environmental effects; a common environment separates out genetic effects. Both contribute.",
    hints: ["What is the same in each experiment?"],
  });

  // Numerical: classes from n additive genes
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Ear length in a type of maize is controlled by three genes, each with a contributing and a non-contributing allele with equal, additive effects. How many different ear-length classes can be produced (ignoring the environment)?",
    value: 7, wrong: [6, 8, 27],
    explanation: "With 3 genes there are 0 to 6 contributing alleles, so 2 × 3 + 1 = **7** classes. (27 is the number of genotypes.)",
  });
  const tallest = (1 / 64) * 100;
  calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Two plants of genotype AaBbCc are crossed. A, B and C are contributing alleles with equal, additive effects on height. What percentage of the offspring are expected to have the maximum height? Give your answer to three significant figures.",
    value: tallest, sf: 3, unit: "%", wrong: [sfStr((1 / 8) * 100, 3), sfStr((1 / 27) * 100, 3)],
    explanation: t`1. Maximum height needs genotype AABBCC (all six alleles contributing).
2. P(AA) $= \frac{1}{4}$, and likewise for BB and CC.
3. P(AABBCC) $= \left(\frac{1}{4}\right)^3 = \frac{1}{64}$.
4. $\frac{1}{64} \times 100 = ${sfStr(tallest, 3)}\%$.`,
    hints: ["What genotype gives the maximum?", "Multiply the probabilities for the three genes."],
  });
  const base = 20, per = 3;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `In a model of an additive polygenic trait, plants with no contributing alleles are ${base} cm tall and each contributing allele (written in capitals) adds ${per} cm. What is the height of a plant of genotype AaBBcc, in cm?`,
    value: base + 3 * per, unit: "cm", wrong: [base + 2 * per, base + 4 * per],
    explanation: t`AaBBcc has 3 contributing alleles (one A and two B), so height $= ${base} + 3 \times ${per} = ${base + 3 * per}$ cm.`,
    hints: ["Count the capital letters."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Differences in phenotype caused by the environment are passed on to the offspring.",
    answer: false,
    explanation: "False. Only genetic differences are inherited.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A characteristic controlled by many genes with additive effects is likely to show a normal distribution.",
    answer: true,
    explanation: "True. Many small additive effects, blurred by the environment, give a bell-shaped distribution.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each example with the main cause of the variation described.",
    pairs: [
      ["Pale, tall bean seedlings grown in a dark cupboard", "Light (environment)"],
      ["Sickle cell anaemia in a child of two carriers", "Inherited alleles of one gene"],
      ["Stunted, yellow maize in nitrogen-poor soil", "Mineral nutrition (environment)"],
      ["A new allele appearing in a bacterial population", "Mutation"],
    ],
    explanation: "Etiolation and nitrogen deficiency are environmental; sickle cell is inherited; new alleles come from mutation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Continuous variation is controlled by {{blank:a}} genes and is {{blank:b}} affected by the environment; discontinuous variation is usually controlled by {{blank:c}} gene(s).",
    blanks: [
      { id: "a", accepted: ["many"], choices: ["many", "one", "no"] },
      { id: "b", accepted: ["strongly"], choices: ["strongly", "not"] },
      { id: "c", accepted: ["one or a few"], choices: ["one or a few", "many", "no"] },
    ],
    explanation: "Continuous: polygenes plus environment. Discontinuous: one or a few genes.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Give the term for several genes at different loci that together control one characteristic with small additive effects.",
    accepted: ["polygenes", "polygene", "polygenic", "polygenic inheritance", "polygenic genes"],
    wrong: ["multiple alleles"],
    explanation: "Polygenes. (Multiple alleles are three or more alleles of one gene.)",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the genetic and environmental factors combine to produce continuous variation in human height.",
    points: [
      "Height is controlled by many genes (polygenes) at different loci",
      "Each contributing allele has a small, additive effect, so many genotypes / phenotype classes are possible",
      "Environment (diet, disease, exercise) affects how far each person reaches their genetic potential",
      "So the classes merge into a complete range of values / a normal distribution",
    ],
    modelAnswer: "Height is controlled by many genes at different loci. Each contributing allele adds a small amount, and the effects are additive, so many different genotypes and many height classes are possible. Diet, illness and other environmental factors then determine how much of the genetic potential each person reaches, blurring the classes into a complete range of heights with a normal distribution.",
    explanation: "Polygenes, additive effects, environment, normal distribution.",
    hints: ["Mention both genes and environment."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe three ways in which meiosis and fertilisation produce genetic variation among the offspring of two parents.",
    points: [
      "Independent assortment of homologous chromosomes in metaphase I / meiosis I",
      "Crossing over between non-sister chromatids of homologous chromosomes in prophase I",
      "Random fertilisation: any male gamete can fuse with any female gamete",
    ],
    modelAnswer: "Homologous chromosomes line up and separate independently of each other in meiosis I, giving many combinations of maternal and paternal chromosomes. Crossing over between non-sister chromatids in prophase I produces new combinations of alleles on each chromosome. At fertilisation any male gamete can fuse with any female gamete.",
    explanation: "Independent assortment, crossing over, random fertilisation.",
    hints: ["Two come from meiosis, one from fertilisation."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A farmer notices that his tallest sorghum plants grow along the edge of a cattle kraal. He keeps their seed, hoping to breed taller sorghum. Suggest why this may not work.",
    points: [
      "Plants near the kraal receive more nutrients (manure / nitrogen) so their height may be environmental",
      "Environmentally caused variation is not inherited",
      "The plants may not differ genetically from the others, so their offspring grown in ordinary soil may not be taller",
    ],
    modelAnswer: "Soil next to the kraal is enriched with manure, so the plants may be tall because of extra nutrients rather than because of their genes. Environmental variation is not inherited, so if these plants have the same genotypes as the rest, their seed grown in ordinary soil will produce plants of ordinary height.",
    explanation: "Distinguish environmental from genetic causes.",
    hints: ["What is different about the soil by a kraal?"],
  });

  // Practice structured 1: histogram data of leaf lengths
  const cls = ["40–49", "50–59", "60–69", "70–79", "80–89", "90–99"];
  const fr = [4, 13, 29, 31, 16, 7];
  const N = sum(fr);
  chk(N, 100);
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Nyasha measured the lengths of 100 leaves from one msasa tree.\n\n${table(["Leaf length / mm", ...cls], [["Number of leaves", ...fr.map(String)]])}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe what a histogram of these data would show.", points: ["Touching bars of equal class width, frequency on the y-axis; lengths range from 40 to 99 mm", "Modal class 70–79 mm (31 leaves); roughly symmetrical / bell-shaped (normal) distribution"], modelAnswer: "A histogram with touching bars of equal width would show lengths from 40 to 99 mm, with the modal class 70–79 mm (31 leaves) and frequencies falling away on both sides in a roughly symmetrical, bell-shaped distribution." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage of leaves that are 80 mm or longer.", value: ((fr[4] + fr[5]) / N) * 100, unit: "%", wrong: [fr[4]], explanation: `(16 + 7) ÷ 100 × 100 = ${fr[4] + fr[5]}%.` }),
      P.manual({ label: "(c)", marks: 3, stem: "The leaves all come from one tree and so have the same genotype. Explain why they still vary in length.", points: ["All leaves share one genotype, so the variation is environmental", "Leaves in different positions receive different light intensity (sun or shade) / water / nutrients", "Leaves were also at different ages / stages of growth when measured"], modelAnswer: "All the leaves have the same genotype, so their variation must be environmental. Leaves in different positions receive different amounts of light, and water and nutrient supply may differ along branches; they may also be of different ages." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how Nyasha could show whether genes also affect leaf length in msasa.", points: ["Compare leaves of several different trees (different genotypes) grown in the same conditions / same position", "Or grow seedlings from different parent trees together in identical conditions and measure their leaves"], modelAnswer: "She could grow seedlings from several different parent trees side by side in identical conditions; differences in their leaf length would then be largely genetic." }),
    ],
    explanation: "Describe the distribution; one genotype means environmental variation.",
    hints: ["What do the leaves of one tree have in common?"],
  });

  // Practice structured 2: clones in different nitrogen
  const nLev = [0, 50, 100, 150];
  const yieldA = [182, 265, 318, 331];
  const yieldB = [176, 241, 279, 287];
  const pcA = pctChange(yieldA[0], yieldA[3]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Rudo grew cuttings of two sweet potato varieties, A and B, in plots given different amounts of nitrogen fertiliser. All cuttings of one variety came from a single parent plant. The table shows the mean tuber mass per plant.\n\n${table(["Nitrogen added / kg per hectare", ...nLev.map(String)], [["Variety A / g", ...yieldA.map(String)], ["Variety B / g", ...yieldB.map(String)]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage increase in mean tuber mass of variety A from 0 to 150 kg per hectare, to three significant figures.", value: pcA, sf: 3, unit: "%", wrong: [sfStr(((yieldA[3] - yieldA[0]) / yieldA[3]) * 100, 3)], explanation: t`$\dfrac{${yieldA[3]} - ${yieldA[0]}}{${yieldA[0]}} \times 100 = ${sfStr(pcA, 3)}\%$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the effect of nitrogen on tuber mass of both varieties.", points: ["Tuber mass increases with nitrogen for both varieties, steeply at first then levelling off above 100 kg per hectare", "Variety A responds more: 331 g against 287 g at 150 kg per hectare (similar at 0 kg: 182 and 176 g)"], modelAnswer: "In both varieties tuber mass increases with nitrogen, steeply up to 100 kg per hectare and then only slightly. Variety A responds more strongly, reaching 331 g compared with 287 g for variety B at 150 kg per hectare, although they are similar without fertiliser (182 g and 176 g)." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why using cuttings from a single parent of each variety makes the investigation more valid.", points: ["Cuttings are clones: genetically identical (produced by mitosis)", "So differences within a variety must be due to the environment (nitrogen), not genotype"], modelAnswer: "Cuttings from one plant are clones, genetically identical because they are produced by mitosis. Any differences in tuber mass within a variety must therefore be caused by the environment, here the nitrogen supply." }),
      P.manual({ label: "(d)", marks: 3, stem: "Use the data to explain how genotype and environment interact to produce the phenotype.", points: ["Environment: within each variety, more nitrogen gives larger tubers", "Genotype: at the same nitrogen level, A gives larger tubers than B (at high nitrogen)", "Interaction: the genotype sets the potential / response; A has a greater potential that is only expressed when nitrogen is plentiful"], modelAnswer: "Within each variety, more nitrogen produces larger tubers, so the environment affects the phenotype. At the same nitrogen level, variety A produces larger tubers than B, so genotype matters too. The two interact: the genotype sets the potential, and A's greater potential is only expressed when nitrogen is plentiful, since at 0 kg per hectare the varieties are similar." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest three variables Rudo should have controlled.", points: ["Water / irrigation and rainfall", "Soil type / other minerals (phosphate, potassium) / plot size and spacing", "Size and age of cuttings / planting and harvest dates / pest and disease control"], modelAnswer: "She should keep the watering, the soil type and other minerals, the plant spacing, the size of cuttings, and the planting and harvest dates the same for all plots." }),
    ],
    explanation: "Clones separate environmental effects; comparing varieties shows genetic effects; together they interact.",
    hints: ["Percentage increase = change ÷ original × 100."],
    calculator: true,
  });

  b.card("DEFINITION", "Continuous variation", "A complete range of values between extremes; many genes (polygenes) plus a strong environmental effect.");
  b.card("DEFINITION", "Discontinuous variation", "Distinct categories with no intermediates; one or a few genes; little environmental effect.");
  b.card("DEFINITION", "Polygenes", "Several genes at different loci that affect one characteristic, each allele making a small additive contribution.");
  b.card("FORMULA", "Number of phenotype classes for n additive genes", "2n + 1 (e.g. 3 genes give 7 classes).");
  b.card("CONCEPT", "Sources of genetic variation", "Mutation (new alleles), independent assortment, crossing over, random fertilisation (and random mating).");
  b.card("FACT", "Environmental effect on fur colour in Himalayan rabbits", "The enzyme for dark pigment works only at low temperature, so cool extremities are dark.");
  b.card("CONCEPT", "Which variation is inherited?", "Only variation caused by differences in genotype; environmental variation is not inherited.");
  b.card("CONCEPT", "Graph for continuous variation", "A histogram with touching bars, often showing a normal distribution.");
});
