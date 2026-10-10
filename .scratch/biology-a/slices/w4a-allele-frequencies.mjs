// W4a: allele frequencies, genetic drift, founder and bottleneck effects, Hardy-Weinberg (Cambridge A Level only).
import { concept, P, t, chk, table, dpStr, sfStr, hardyWeinberg, chiSquared } from "../lib.mjs";

const HW = t`$p + q = 1$ and $p^2 + 2pq + q^2 = 1$`;

concept("abio.evolution.allele-frequencies", { file: "evolution/allele-frequencies", keyPrefix: "evolution.allele-frequencies" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a condition for the Hardy-Weinberg principle to apply?",
    options: [
      ["Mating is random", "Correct."],
      ["The population is small", "A small population is subject to genetic drift; the population must be large."],
      ["Selection favours the dominant allele", "There must be no selection."],
      ["Individuals migrate into the population", "There must be no migration."],
    ],
    answer: "A",
    explanation: "Conditions: large population, random mating, no mutation, no migration, no selection.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which population is genetic drift likely to have the greatest effect on allele frequencies?",
    options: [
      ["Twenty black rhinos in a small fenced sanctuary", "Correct: chance effects are largest in small populations."],
      ["Ten thousand impala across a large national park", "Chance effects average out in a large population."],
      ["Millions of kapenta in Lake Kariba", "A huge population: drift has a tiny effect."],
      ["A large population under strong natural selection", "Selection, not drift, would dominate here."],
    ],
    answer: "A",
    explanation: "Genetic drift is random and its effect is greatest when the population is small.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Northern elephant seals today have very little genetic variation although the population is large. What is the explanation?",
    options: [
      ["Hunting reduced them to very few individuals, a bottleneck", "Correct."],
      ["Strong stabilising selection removed rare alleles", "The loss of variation is explained by the bottleneck, a chance effect."],
      ["They have a very high rate of mutation", "Mutation would increase variation."],
      ["Many seals migrated in from the southern elephant seal population", "Migration would add variation."],
    ],
    answer: "A",
    explanation: "Nineteenth-century hunting left very few survivors; the recovered population carries only their alleles.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In the Hardy-Weinberg equation, what does q² represent?",
    options: [
      ["The frequency of homozygous recessive individuals", "Correct."],
      ["The frequency of the recessive allele", "That is q."],
      ["The frequency of heterozygous individuals", "That is 2pq."],
      ["The frequency of individuals with the dominant phenotype", "That is p² + 2pq."],
    ],
    answer: "A",
    explanation: "q² is the frequency of the homozygous recessive genotype.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Five lizards are carried on floating vegetation to an uninhabited island and start a new population. An allele that is rare on the mainland is carried by two of them. What is the most likely result?",
    options: [
      ["The allele is much more common on the island than on the mainland", "Correct: the founder effect."],
      ["The allele is lost because rare alleles are always disadvantageous", "Rare does not mean disadvantageous; and two of five founders carry it."],
      ["Allele frequencies on the island will match the mainland", "Five individuals are an unrepresentative sample."],
      ["The island population will have more genetic diversity", "Founders carry only a small part of the gene pool."],
    ],
    answer: "A",
    explanation: "Founders are a small random sample of the gene pool, so allele frequencies can differ sharply from the source population.",
    hints: ["What fraction of the founders carry the allele?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a population, 9% of individuals show a recessive phenotype. Assuming Hardy-Weinberg equilibrium, what proportion are heterozygous carriers?",
    options: [["0.42", "Correct: q = 0.3, p = 0.7, 2pq = 0.42."], ["0.21", "This is pq without the 2."], ["0.49", "This is p²."], ["0.91", "This is the dominant phenotype, p² + 2pq."]],
    answer: "A",
    explanation: "q² = 0.09, q = 0.3, p = 0.7, 2pq = 2 × 0.7 × 0.3 = 0.42.",
    hints: ["Start from q² = 0.09."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a small, isolated village population, far fewer heterozygotes were found for a gene than the Hardy-Weinberg equation predicts, while the allele frequencies matched the surrounding region. Which explanation fits best?",
    options: [
      ["Mating is non-random, with many marriages between relatives", "Correct: inbreeding increases homozygotes and reduces heterozygotes without changing allele frequencies."],
      ["A new mutation has produced extra copies of the recessive allele", "That would change allele frequencies."],
      ["Many heterozygotes have migrated in from the surrounding region", "That would increase heterozygotes."],
      ["The population is too large for genetic drift to act", "The population is described as small, and drift would change allele frequencies."],
    ],
    answer: "A",
    explanation: "Inbreeding (non-random mating) shifts genotype frequencies towards homozygotes while leaving allele frequencies unchanged.",
    hints: ["Which condition changes genotype frequencies but not allele frequencies?"],
  });

  // Numerical: q from q²
  const q2a = 0.16;
  const hwA = hardyWeinberg({ q2: q2a });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In a population of moths, the frequency of the homozygous recessive genotype is ${q2a}. What is the frequency of the dominant allele, p?`,
    value: hwA.p, wrong: [hwA.q, 1 - q2a],
    explanation: `q = √${q2a} = ${hwA.q}; p = 1 − ${hwA.q} = ${dpStr(hwA.p, 1)}. (1 − q² = ${1 - q2a} is the dominant phenotype frequency.)`,
  });
  // Calculation: carriers in a population
  const pop = 12500, affected = 50;
  const hwB = hardyWeinberg({ q2: affected / pop });
  const carriers = hwB.twoPQ * pop;
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `In a herd of ${pop.toLocaleString("en-GB")} goats, ${affected} show a recessive coat condition. Using ${HW}, estimate the number of heterozygous carriers. Give your answer to three significant figures.`,
    value: carriers, sf: 3, unit: "individuals", wrong: [sfStr(hwB.q * hwB.p * pop, 3)],
    explanation: t`1. $q^2 = ${affected} \div ${pop} = ${hwB.q2}$.
2. $q = \sqrt{${hwB.q2}} = ${dpStr(hwB.q, 4)}$; $p = ${dpStr(hwB.p, 4)}$.
3. $2pq = 2 \times ${dpStr(hwB.p, 4)} \times ${dpStr(hwB.q, 4)} = ${dpStr(hwB.twoPQ, 4)}$.
4. Carriers $= ${dpStr(hwB.twoPQ, 4)} \times ${pop} = ${sfStr(carriers, 3)}$.
Forgetting the 2 in 2pq halves the answer.`,
    hints: ["q² = affected ÷ total.", "Carrier frequency is 2pq."],
  });
  // Calculation: allele frequency from codominant counts
  const cnt = { AA: 250, Aa: 200, aa: 50 };
  const hwC = hardyWeinberg({ counts: cnt });
  calc({
    d: 3, skill: "APPLICATION",
    stem: `In a sample of 500 people tested for a codominant blood-group gene, ${cnt.AA} were MM, ${cnt.Aa} were MN and ${cnt.aa} were NN. Calculate the frequency of the N allele.`,
    value: hwC.q, wrong: [cnt.aa / 500, Math.sqrt(cnt.aa / 500)],
    explanation: t`1. Total alleles $= 2 \times 500 = 1000$.
2. N alleles $= 2 \times ${cnt.aa} + ${cnt.Aa} = ${2 * cnt.aa + cnt.Aa}$.
3. Frequency of N $= ${2 * cnt.aa + cnt.Aa} \div 1000 = ${hwC.q}$.
With codominance the genotypes are known, so count alleles directly rather than using $\sqrt{q^2}$.`,
    hints: ["Each NN person has two N alleles and each MN person one."],
  });
  // Numerical: dominant phenotype percentage
  const q2d = 0.0256;
  const hwD = hardyWeinberg({ q2: q2d });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `The frequency of a recessive allele in a population is ${dpStr(hwD.q, 2)}. What percentage of the population is homozygous dominant? Give your answer to three significant figures.`,
    value: hwD.p2 * 100, sf: 3, unit: "%", wrong: [sfStr((hwD.p2 + hwD.twoPQ) * 100, 3), sfStr(hwD.p * 100, 3)],
    explanation: `p = 1 − ${dpStr(hwD.q, 2)} = ${dpStr(hwD.p, 2)}; p² = ${dpStr(hwD.p2, 4)}, so ${sfStr(hwD.p2 * 100, 3)}% are homozygous dominant.`,
    hints: ["Find p first, then square it."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Genetic drift always increases the frequency of advantageous alleles.",
    answer: false,
    explanation: "False. Drift is random; it can increase or decrease any allele, including advantageous ones.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A population that has passed through a bottleneck may have low genetic diversity even after its numbers have recovered.",
    answer: true,
    explanation: "True. Lost alleles are not restored by population growth; only mutation or migration can add them back.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Hardy-Weinberg term with what it represents.",
    pairs: [
      ["p", "Frequency of the dominant allele"],
      ["q", "Frequency of the recessive allele"],
      ["p²", "Frequency of homozygous dominant individuals"],
      ["2pq", "Frequency of heterozygous individuals"],
      ["q²", "Frequency of homozygous recessive individuals"],
    ],
    explanation: "p and q are allele frequencies; p², 2pq and q² are genotype frequencies.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "When a new population is started by a few individuals, the change in allele frequencies is called the {{blank:a}} effect. A sharp fall in population size causes the {{blank:b}} effect.",
    blanks: [
      { id: "a", accepted: ["founder"], choices: ["founder", "bottleneck", "Bohr"] },
      { id: "b", accepted: ["bottleneck"], choices: ["bottleneck", "founder", "greenhouse"] },
    ],
    explanation: "Founder effect: a few colonists. Bottleneck effect: a drastic reduction in numbers.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Give the term for all the alleles of all the genes in a population.",
    accepted: ["gene pool", "the gene pool"],
    wrong: ["genome"],
    explanation: "The gene pool.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why genetic drift has a greater effect in small populations than in large ones.",
    points: [
      "Which individuals survive and reproduce is partly due to chance",
      "In a small population, chance events affect a large proportion of the alleles / an allele carried by few individuals can easily be lost or fixed",
      "In a large population chance effects on different individuals average out, so allele frequencies change little",
    ],
    modelAnswer: "Which individuals happen to survive and reproduce is partly a matter of chance. In a small population each individual carries a large share of the gene pool, so the chance loss or success of a few individuals can sharply change allele frequencies, and an allele can be lost or fixed. In a large population these chance effects average out.",
    explanation: "Chance sampling of alleles matters most when numbers are small.",
    hints: ["Think of tossing a coin 10 times versus 1000 times."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest why low genetic diversity could threaten the survival of a cheetah population.",
    points: [
      "Fewer alleles: there may be no alleles giving resistance to a new disease, so many could die",
      "Less variation for natural selection to act on if the environment changes",
      "Inbreeding: more homozygous recessive harmful alleles expressed / poorer sperm quality and fertility",
    ],
    modelAnswer: "With few alleles, there may be none that give resistance to a new disease, so an outbreak could kill many animals. There is little variation for natural selection to act on if conditions change. Inbreeding also makes harmful recessive alleles more likely to be homozygous, reducing fertility, as seen in the poor sperm quality of cheetahs.",
    explanation: "Disease, adaptability, inbreeding depression.",
    hints: ["What does variation allow a population to do?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Explain why the Hardy-Weinberg principle is useful even though no real population meets all of its conditions.",
    points: [
      "It predicts genotype frequencies expected if allele frequencies are not changing (a null model)",
      "Comparing observed with expected frequencies (e.g. by chi-squared) shows whether the population is evolving",
      "It allows carrier (heterozygote) frequencies to be estimated from the frequency of the recessive phenotype",
    ],
    modelAnswer: "It gives a baseline: the genotype frequencies expected if nothing is changing the allele frequencies. If observed frequencies differ significantly from those expected, for example in a chi-squared test, one of the conditions is broken and the population may be evolving. It also allows carrier frequencies to be estimated from the frequency of the recessive phenotype.",
    explanation: "A null model for evolution and a way to estimate carriers.",
    hints: ["What can you compare with the prediction?"],
  });

  // Practice structured 1: carriers from phenotype counts
  const N1 = 2400, rec1 = 96;
  const hw1 = hardyWeinberg({ q2: rec1 / N1 });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: `A recessive allele, b, causes a white coat in a population of field mice; the dominant allele, B, gives a brown coat. In a survey of ${N1} mice, ${rec1} were white. The equations are ${HW}.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate q², the frequency of white mice.", value: hw1.q2, wrong: [rec1], explanation: `${rec1} ÷ ${N1} = ${hw1.q2}.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate q, the frequency of allele b.", value: hw1.q, explanation: `√${hw1.q2} = ${dpStr(hw1.q, 1)}.` }),
      P.num({ label: "(c)", marks: 2, stem: "Estimate the number of heterozygous mice in the survey.", value: hw1.twoPQ * N1, unit: "individuals", wrong: [hw1.p * hw1.q * N1], explanation: t`$2pq = 2 \times ${dpStr(hw1.p, 1)} \times ${dpStr(hw1.q, 1)} = ${dpStr(hw1.twoPQ, 2)}$; $${dpStr(hw1.twoPQ, 2)} \times ${N1} = ${Math.round(hw1.twoPQ * N1)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "State two assumptions you made in this calculation.", points: ["Large population with random mating", "No selection (white and brown survive equally), mutation or migration"], modelAnswer: "That the population is large with random mating, and that there is no selection, mutation or migration affecting coat colour." }),
      P.manual({ label: "(e)", marks: 2, stem: "Owls hunt by sight, and white mice are more visible on dark soil. Predict and explain the change in q over many generations.", points: ["q will decrease", "White (bb) mice are more likely to be eaten, so fewer b alleles are passed on: directional selection against b (b remains hidden in heterozygotes, so the fall slows)"], modelAnswer: "q will decrease, because white mice are more likely to be caught and fewer b alleles are passed on. Some b alleles survive hidden in brown heterozygotes, so the decline slows as q falls." }),
    ],
    explanation: "q² from the recessive phenotype, then q, p and 2pq.",
    hints: ["White mice are bb."],
    calculator: true,
  });

  // Practice structured 2: observed and expected genotype numbers
  const obs = [150, 100, 50];
  const tot = 300;
  const qq = (2 * obs[2] + obs[1]) / (2 * tot);
  const pp = 1 - qq;
  const exp = [pp * pp * tot, 2 * pp * qq * tot, qq * qq * tot];
  b.struct({
    d: 5, skill: "ANALYSIS",
    stem: `A codominant gene with alleles $G^1$ and $G^2$ was studied in 300 plants of a wild grass from a mine dump near Kwekwe.\n\n${table(["Genotype", "$G^1G^1$", "$G^1G^2$", "$G^2G^2$"], [["Number of plants", ...obs.map(String)]])}\n\nThe equations are ${HW}, and $\\chi^2 = \\sum \\dfrac{(O - E)^2}{E}$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the frequency of the $G^2$ allele, q, to two decimal places.", value: qq, dp: 2, explanation: t`$q = \dfrac{2 \times ${obs[2]} + ${obs[1]}}{600} = ${dpStr(qq, 4)}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the expected number of heterozygous plants, to one decimal place.", value: exp[1], dp: 1, explanation: t`$2pq \times 300 = 2 \times ${dpStr(pp, 3)} \times ${dpStr(qq, 3)} \times 300 = ${dpStr(exp[1], 1)}$.` }),
      P.group({ label: "(c)", stem: "Calculate the expected numbers of each homozygote, to one decimal place.", parts: [
        P.num({ label: "(i)", marks: 1, stem: "$G^1G^1$ plants.", value: exp[0], dp: 1, explanation: t`$p^2 \times 300 = ${dpStr(pp * pp, 4)} \times 300 = ${dpStr(exp[0], 1)}$.` }),
        P.num({ label: "(ii)", marks: 1, stem: "$G^2G^2$ plants.", value: exp[2], dp: 1, explanation: t`$q^2 \times 300 = ${dpStr(qq * qq, 4)} \times 300 = ${dpStr(exp[2], 1)}$.` }),
      ] }),
      P.manual({ label: "(d)", marks: 2, stem: "Compare the observed numbers with the expected numbers.", points: [`Fewer heterozygotes observed (${obs[1]}) than expected (${dpStr(exp[1], 1)})`, `More homozygotes of both kinds observed (${obs[0]} and ${obs[2]}) than expected (${dpStr(exp[0], 1)} and ${dpStr(exp[2], 1)})`], modelAnswer: `There are fewer heterozygotes than expected (${obs[1]} against ${dpStr(exp[1], 1)}) and more of both homozygotes (${obs[0]} against ${dpStr(exp[0], 1)}, and ${obs[2]} against ${dpStr(exp[2], 1)}).` }),
      P.manual({ label: "(e)", marks: 2, stem: "There are fewer heterozygotes than expected. Suggest two explanations.", points: ["Selection against heterozygotes / in favour of homozygotes (e.g. tolerance of metals on the mine dump)", "Non-random mating: self-pollination / inbreeding, or the sample contains two subpopulations (mine dump and surrounding soil)"], modelAnswer: "Heterozygotes may be selected against on the mine dump, where homozygotes may tolerate the metals better, or mating may be non-random, for example through self-pollination or because the sample mixes two separate subpopulations." }),
      P.manual({ label: "(f)", marks: 2, stem: "Name the statistical test that could show whether the differences are significant, and state its null hypothesis.", points: ["Chi-squared test", "Null hypothesis: no significant difference between the observed numbers and those expected from the Hardy-Weinberg equations; any difference is due to chance"], modelAnswer: "A chi-squared test, with the null hypothesis that there is no significant difference between the observed genotype numbers and those expected from the Hardy-Weinberg equations, any difference being due to chance." }),
    ],
    explanation: "Find q by counting alleles, calculate expected numbers, compare and interpret.",
    hints: ["Count G² alleles: two in each G²G² plant, one in each G¹G²."],
    calculator: true,
  });
  if (!(obs[1] < exp[1])) throw new Error("expected heterozygote deficit");

  b.card("FORMULA", "Hardy-Weinberg equations", "p + q = 1 and p² + 2pq + q² = 1.");
  b.card("CONCEPT", "Conditions for Hardy-Weinberg equilibrium", "Large population, random mating, no mutation, no migration, no selection.");
  b.card("CONCEPT", "Finding q when there is complete dominance", "q² = frequency of the recessive phenotype; q = √q².");
  b.card("FORMULA", "Carrier frequency", "2pq.");
  b.card("DEFINITION", "Genetic drift", "Random change in allele frequencies between generations, strongest in small populations.");
  b.card("DEFINITION", "Founder effect", "Reduced variation and changed allele frequencies when a few individuals start a new population.");
  b.card("DEFINITION", "Bottleneck effect", "Loss of genetic variation after a drastic reduction in population size.");
  b.card("FACT", "Examples of bottlenecks", "Northern elephant seals (hunting) and cheetahs: very low genetic diversity.");
});
