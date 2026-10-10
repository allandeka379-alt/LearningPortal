// W4a: artificial selection (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t, chk, table, dpStr, sfStr, mean, pctChange, CAM } from "../lib.mjs";

concept("abio.evolution.artificial-selection", { file: "evolution/artificial-selection", keyPrefix: "evolution.artificial-selection" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main difference between artificial and natural selection?",
    options: [
      ["In artificial selection humans choose which individuals breed", "Correct."],
      ["Artificial selection creates new alleles by mutation", "Neither type of selection creates alleles."],
      ["Natural selection works only on plants", "Natural selection acts on all organisms."],
      ["Artificial selection does not change the frequencies of alleles in a population", "It changes allele frequencies, often rapidly."],
    ],
    answer: "A",
    explanation: "In artificial selection, humans act as the selection pressure, choosing parents with desired traits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are inbred lines of maize less vigorous than ordinary maize plants?",
    options: [
      ["Harmful recessive alleles become homozygous and are expressed", "Correct: inbreeding depression."],
      ["Inbreeding produces new harmful mutations", "Inbreeding does not raise the mutation rate."],
      ["Self-pollination reduces the number of chromosomes in each cell of the offspring", "Chromosome number does not change."],
      ["Inbred plants have more heterozygous loci", "Inbreeding reduces heterozygosity."],
    ],
    answer: "A",
    explanation: "Inbreeding increases homozygosity, exposing harmful recessive alleles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do the F1 plants from a cross between two inbred maize lines all look alike?",
    options: [
      ["Both parents are homozygous, so every F1 plant gets the same genotype", "Correct."],
      ["The F1 plants are produced asexually by mitosis from only one of the two parents", "They are produced sexually by cross-pollination."],
      ["Hybrid vigour removes all variation in phenotype", "Uniformity comes from identical genotypes."],
      ["The two lines carry exactly the same alleles", "The lines differ, which is why the hybrid is heterozygous."],
    ],
    answer: "A",
    explanation: "Each homozygous parent produces only one type of gamete, so all F1 offspring share one heterozygous genotype.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a bull's breeding value for milk yield judged by progeny testing?",
    options: [
      ["Bulls do not produce milk, so their alleles are judged from their daughters", "Correct."],
      ["Bulls have different milk-yield genes from cows", "Bulls carry the same genes; they are simply not expressed as milk."],
      ["Daughters inherit all of their alleles from their father, so they are copies of him", "Daughters inherit half their alleles from each parent."],
      ["Progeny testing makes the bull produce more sperm", "Testing does not change the bull."],
    ],
    answer: "A",
    explanation: "Milk yield is sex-limited; a bull's alleles show in the yields of his daughters.",
    hints: ["Can a bull's own phenotype show milk yield?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "A breeder crosses a high-yielding rice variety with a low-yielding variety resistant to blast disease. What should be done with the resistant offspring to recover high yield?",
    options: [
      ["Backcross them repeatedly to the high-yielding parent, selecting resistant plants each time", "Correct."],
      ["Self-pollinate them once and sow all the seed", "Resistance and yield would segregate; most plants would not combine both."],
      ["Cross them back to the low-yielding resistant parent", "This would bring back the low-yield alleles."],
      ["Treat them repeatedly with the pathogen until each plant becomes more resistant to it", "Exposure does not change their alleles."],
    ],
    answer: "A",
    explanation: "Backcrossing to the high-yielding parent restores its genome while selection keeps the resistance allele.",
    hints: ["Which parent's genome do you want most of?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A farmer saves seed from his hybrid maize crop and plants it. Which result is most likely?",
    options: [
      ["A variable crop with a lower mean yield", "Correct: the F2 segregates and loses much hybrid vigour."],
      ["A uniform crop with the same high yield", "F2 plants have different genotypes."],
      ["A crop with higher yield because of extra hybrid vigour", "Heterozygosity falls in the F2."],
      ["A crop identical to one of the original inbred parents", "F2 plants are recombinants of both lines."],
    ],
    answer: "A",
    explanation: "Alleles segregate in meiosis in the F1, so F2 plants vary and many are more homozygous, with lower vigour.",
    hints: ["What happens to heterozygous alleles at meiosis?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A new fungal disease appears that attacks one high-yielding variety grown across a whole region. Why are losses likely to be severe?",
    options: [
      ["The plants are genetically uniform, so if one is susceptible almost all are", "Correct: low genetic diversity."],
      ["High-yielding plants always have weaker cell walls", "This is not a general rule."],
      ["Selective breeding causes mutations that increase the susceptibility of every plant", "Breeding does not cause such mutations."],
      ["Hybrid vigour makes plants attract fungal spores", "Vigour does not attract pathogens."],
    ],
    answer: "A",
    explanation: "Selective breeding reduces genetic diversity; with no resistance alleles in the crop, the whole area is vulnerable.",
    hints: ["Think about genetic diversity."],
  });

  // Calculation: hybrid vigour percentage (different numbers from the lesson)
  const pA = 2.6, pB = 3.4, f1 = 6.9;
  const mp = (pA + pB) / 2;
  const het = pctChange(mp, f1);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Two inbred lines of sorghum yielded ${pA} and ${pB} tonnes per hectare; their F1 hybrid yielded ${f1} tonnes per hectare. Calculate the percentage by which the hybrid's yield exceeds the mean of its parents, to three significant figures.`,
    value: het, sf: 3, unit: "%", wrong: [sfStr(pctChange(pB, f1), 3)],
    explanation: t`1. Parental mean $= (${pA} + ${pB}) \div 2 = ${mp}$ tonnes per hectare.
2. Increase $= ${f1} - ${mp} = ${dpStr(f1 - mp, 1)}$.
3. $\dfrac{${dpStr(f1 - mp, 1)}}{${mp}} \times 100 = ${sfStr(het, 3)}\%$.
Comparing with the better parent only gives ${sfStr(pctChange(pB, f1), 3)}%, which answers a different question.`,
    hints: ["Find the mean of the two parents first."],
  });
  // Numerical: number of genotypes in F2 for one gene
  const mY = [4120, 4390, 4610, 4930, 5180];
  const gain = (mY[4] - mY[0]) / 4;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In a dairy herd, the mean milk yield per lactation over five generations of selection was ${mY.join(", ")} kg. Calculate the mean increase per generation, in kg.`,
    value: gain, unit: "kg", wrong: [(mY[4] - mY[0]) / 5],
    explanation: `(${mY[4]} − ${mY[0]}) ÷ 4 = ${gain} kg per generation (four intervals between five generations).`,
  });
  // Calculation: proportion of AI daughters
  const straws = 2400, success = 0.62, daughters = straws * success * 0.5;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `Semen from a progeny-tested bull is used to inseminate ${straws} cows. ${Math.round(success * 100)}% of the inseminations produce a calf, and half the calves are female. How many daughters are expected?`,
    value: daughters, wrong: [straws * success],
    explanation: t`1. Calves $= ${straws} \times ${success} = ${straws * success}$.
2. Daughters $= ${straws * success} \times 0.5 = ${daughters}$.
Artificial insemination lets one bull father far more daughters than natural mating could.`,
    hints: ["Find the number of calves first."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Hybrid maize is produced by inserting genes from another species into maize plants.",
    answer: false,
    explanation: "False. Hybrid maize comes from crossing two inbred maize lines; inserting foreign genes is genetic engineering.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Selective breeding usually reduces the genetic diversity of a crop or breed.",
    answer: true,
    explanation: "True. Alleles not chosen by the breeder are lost over generations.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each breeding technique with its purpose.",
    pairs: [
      ["Self-pollinating maize for several generations", "Produces homozygous inbred lines"],
      ["Crossing two inbred maize lines", "Produces uniform, vigorous F1 hybrid seed"],
      ["Progeny testing of bulls", "Judges a bull's alleles from his daughters' milk yields"],
      ["Artificial insemination", "Lets one selected bull father many calves"],
      ["Detasselling one line", "Prevents self-pollination so only the other line's pollen fertilises it"],
    ],
    explanation: "Inbreeding gives homozygous lines; crossing them gives hybrids; progeny testing and AI spread the best bulls' alleles.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The F1 offspring of two inbred lines show hybrid {{blank:a}} because they are {{blank:b}} at many loci.",
    blanks: [
      { id: "a", accepted: ["vigour"], choices: ["vigour", "depression", "resistance"] },
      { id: "b", accepted: ["heterozygous"], choices: ["heterozygous", "homozygous", "haploid"] },
    ],
    explanation: "Hybrid vigour (heterosis) comes from heterozygosity at many loci.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Give the term for the reduced fertility and vigour that results from repeated breeding between close relatives.",
    accepted: ["inbreeding depression"],
    wrong: ["hybrid vigour"],
    explanation: "Inbreeding depression.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a farmer could use selective breeding to produce goats that are more tolerant of drought.",
    points: [
      "Identify goats that stay in good condition / keep producing during drought",
      "Breed these together (or with tolerant males)",
      "Select the most drought-tolerant offspring and breed from them",
      "Repeat over many generations, so alleles for drought tolerance increase in frequency",
    ],
    modelAnswer: "Identify the goats that keep their condition and continue to breed during dry seasons, and mate them together. From their offspring, select the most drought-tolerant and breed from them. Repeating this over many generations increases the frequency of alleles that contribute to drought tolerance.",
    explanation: "Select, breed, select offspring, repeat.",
    hints: ["Four steps, ending with allele frequencies."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Compare artificial selection with genetic engineering as ways of improving a crop.",
    points: [
      "Artificial selection uses alleles already in the species (or close relatives); genetic engineering can use genes from any organism",
      "Artificial selection takes many generations / years; genetic engineering can add a gene in one generation",
      "Artificial selection moves whole genomes, so unwanted linked alleles may come too; genetic engineering transfers a specific gene",
      "Both are directed by humans for useful traits and both can reduce genetic diversity",
    ],
    modelAnswer: "Both are directed by humans to produce useful traits, and both can reduce genetic diversity. Artificial selection uses alleles already present in the species or close relatives, whereas genetic engineering can transfer genes from any organism. Selective breeding takes many generations, whereas a gene can be inserted in one. Selective breeding combines whole genomes, so unwanted alleles linked to the desired one may be carried along, whereas genetic engineering transfers one specific gene.",
    explanation: "Source of alleles, speed, precision, similarities.",
    hints: ["Give matched points of comparison."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain why seed banks are important for future plant breeding, even for crops that already yield well.",
    points: [
      "Selective breeding has reduced the genetic diversity of modern varieties",
      "Old varieties and wild relatives in seed banks hold alleles, e.g. for resistance to new diseases or for drought tolerance",
      "These alleles can be bred into crops when conditions change (new pathogens, climate change)",
    ],
    modelAnswer: "Modern varieties have lost much genetic diversity through selective breeding. Seed banks store old varieties and wild relatives that carry other alleles, for example for resistance to new diseases or tolerance of drought. These can be bred into crops when new pathogens appear or the climate changes.",
    explanation: "Seed banks conserve alleles lost from modern crops.",
    hints: ["What is lost during selective breeding?"],
  });

  // Practice structured 1: hybrid maize trial
  const plots = ["Inbred line R", "Inbred line S", "F1 hybrid R × S", "F2 from saved F1 seed"];
  const yld = [2.9, 3.3, 8.1, 5.4];
  const cv = [22, 25, 18, 95]; // illustrative range of plant height
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `An illustrative trial at a research station near Harare compared maize grown from four kinds of seed under the same conditions.\n\n${table(["Seed", "Mean yield / tonnes per hectare", "Range of plant heights / cm"], plots.map((p, i) => [p, yld[i].toFixed(1), String(cv[i])]))}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage decrease in yield from the F1 to the F2, to three significant figures.", value: -pctChange(yld[2], yld[3]), sf: 3, unit: "%", wrong: [sfStr(((yld[2] - yld[3]) / yld[3]) * 100, 3)], explanation: t`$\dfrac{${yld[2]} - ${yld[3]}}{${yld[2]}} \times 100 = ${sfStr(-pctChange(yld[2], yld[3]), 3)}\%$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the inbred lines yield less than the F1 hybrid.", points: ["Inbred lines are homozygous at most loci, so harmful recessive alleles are expressed (inbreeding depression)", "The hybrid is heterozygous at many loci; dominant alleles from one line mask harmful recessives from the other (hybrid vigour)"], modelAnswer: "The inbred lines are homozygous at most loci, so harmful recessive alleles are expressed and the plants show inbreeding depression. The F1 hybrid is heterozygous at many loci, so dominant alleles from one line mask harmful recessive alleles from the other, giving hybrid vigour." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the F2 plants vary much more in height than the F1 plants.", points: ["All F1 plants have the same heterozygous genotype (parents homozygous)", "In the F1, alleles segregate and assort independently at meiosis, so F2 plants have many different genotypes"], modelAnswer: "Both inbred parents were homozygous, so every F1 plant has the same genotype. When the F1 plants form gametes, alleles segregate and assort independently, so F2 plants have many different genotypes and vary in height." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why farmers buy new hybrid seed every season, and one disadvantage of doing so.", points: ["Saved F2 seed gives lower, uneven yields / F1 seed gives high uniform yield, easy to manage and harvest", "Disadvantage: cost of buying seed each season / dependence on seed companies / low genetic diversity in the crop"], modelAnswer: "Saved seed gives a variable crop with lower yield, whereas F1 seed gives high, uniform yields that ripen together. The disadvantage is the cost of buying seed every season and dependence on seed suppliers." }),
    ],
    explanation: "Inbreeding depression, hybrid vigour and segregation in the F2.",
    hints: ["Percentage decrease = decrease ÷ original × 100."],
    calculator: true,
  });

  // Practice structured 2: progeny test
  const bulls = ["P", "Q", "R"];
  const d1 = [6150, 5820, 6480, 6010, 6300];
  const d2 = [5710, 5930, 5580, 6040, 5840];
  const d3 = [6720, 6590, 6910, 6640, 6880];
  const ms = [mean(d1), mean(d2), mean(d3)];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `A dairy cooperative near Marondera progeny-tested three young bulls. The table shows the first-lactation milk yields of five daughters of each bull, all kept in the same herd.\n\n${table(["Bull", "Daughters' yields / kg"], bulls.map((bb, i) => [bb, [d1, d2, d3][i].join(", ")]))}`,
    parts: [
      P.group({
        label: "(a)", stem: "Calculate the mean yield of the daughters of each bull, in kg.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Bull P.", value: ms[0], unit: "kg", explanation: `${d1.join(" + ")} = ${d1.reduce((s, x) => s + x, 0)}; ÷ 5 = ${ms[0]} kg.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Bull R.", value: ms[2], unit: "kg", explanation: `÷ 5 = ${ms[2]} kg.` }),
        ],
      }),
      P.manual({ label: "(b)", marks: 2, stem: "The mean for bull Q is " + ms[1] + " kg. Which bull should be used for artificial insemination? Explain your choice.", points: ["Bull R", `His daughters have the highest mean yield (${ms[2]} kg), so he probably carries the most alleles for high milk yield`], modelAnswer: `Bull R, because his daughters have the highest mean yield (${ms[2]} kg), suggesting that he carries the most alleles for high milk yield.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the daughters were all kept in the same herd.", points: ["Milk yield is strongly affected by environment (feed, health, management)", "So differences between the bulls' daughters are more likely to be genetic"], modelAnswer: "Milk yield depends heavily on feed, health and management, so keeping all daughters in one herd means that differences between the groups are more likely to reflect the bulls' alleles." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways the test could be made more reliable.", points: ["Test many more daughters per bull", "Use daughters from mothers of similar yield / several herds, record several lactations"], modelAnswer: "Use many more daughters per bull, mated to cows of similar yield, and record yields over several lactations and in several herds." }),
    ],
    explanation: "Progeny testing judges a bull's alleles by his daughters' yields.",
    hints: ["Add the five yields and divide by 5."],
    calculator: true,
  });
  chk(ms[2] > ms[0] && ms[0] > ms[1] ? 1 : 0, 1);

  b.card("DEFINITION", "Artificial selection", "Humans choose individuals with desired traits to breed, increasing the frequency of the alleles for those traits.");
  b.card("DEFINITION", "Inbreeding depression", "Reduced vigour and fertility from inbreeding, as harmful recessive alleles become homozygous.");
  b.card("DEFINITION", "Hybrid vigour (heterosis)", "Greater growth or yield of hybrids than of either parent, from heterozygosity at many loci.");
  b.card("CONCEPT", "Why F1 hybrid maize is uniform", "Both inbred parents are homozygous, so all F1 plants have the same genotype.");
  b.card("CONCEPT", "Why hybrid seed is bought each year", "Saved F1 seed gives a variable F2 with lower yield because alleles segregate.");
  b.card("DEFINITION", "Progeny testing", "Judging a male's genetic merit from the performance of his offspring, e.g. daughters' milk yields.");
  b.card("CONCEPT", "Breeding disease resistance into wheat or rice", "Cross with a resistant variety, then backcross repeatedly to the high-yielding parent, selecting resistant offspring.");
  b.card("CONCEPT", "Main cost of selective breeding", "Loss of genetic diversity, making crops and breeds vulnerable to new diseases or conditions.");
});
