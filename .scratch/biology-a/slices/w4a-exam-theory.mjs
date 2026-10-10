// W4a: THEORY10 exam-format items (ZIMSEC Paper 2; Cambridge Paper 4, A Level concepts): selection and evolution,
// classification and biodiversity.
import { concept, P, t, chk, table, dpStr, sfStr, EXAM, checkExam, CAM, hardyWeinberg, lincoln, simpson, pctChange } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const T = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs };
const diff = (a, b) => [...a].filter((c, i) => c !== b[i]).length;
const grp = (s) => s.match(/.{1,10}/g).join(" ");

concept(A("evolution.natural-selection"), { file: "exam/w4a-theory", keyPrefix: "exam.w4a-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: antibiotic resistance (both boards)
  const transfer = [0, 2, 4];
  const total = [600, 540, 620];
  const resist = [3, 41, 322];
  const pct = resist.map((r, i) => (r / total[i]) * 100);
  const ratio = pct[2] / pct[0];
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("evolution.natural-selection")],
    stem: `Farai grew bacteria in broth containing a low concentration of streptomycin. After each day the culture was transferred to fresh broth with streptomycin. Samples were spread on plain agar and on agar containing a high concentration of streptomycin, which only resistant bacteria survive.\n\n${table(["Transfer number", ...transfer.map(String)], [["Colonies on plain agar", ...total.map(String)], ["Colonies on streptomycin agar", ...resist.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.group({
        label: "(a)", stem: "Calculate the percentage of bacteria that were resistant:",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "at transfer 0;", value: pct[0], unit: "%", wrong: [resist[0]], explanation: `3 ÷ 600 × 100 = ${dpStr(pct[0], 1)}%.` }),
          P.num({ label: "(ii)", marks: 1, stem: "at transfer 4, to three significant figures.", value: pct[2], sf: 3, unit: "%", explanation: `322 ÷ 620 × 100 = ${sfStr(pct[2], 3)}%.` }),
        ],
      }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate how many times greater the percentage of resistant bacteria is at transfer 4 than at transfer 0, to three significant figures.", value: ratio, sf: 3, explanation: `${sfStr(pct[2], 3)} ÷ ${dpStr(pct[0], 1)} = ${sfStr(ratio, 3)}.` }),
      P.mcq({
        label: "(c)", stem: "Which type of selection is shown?",
        options: [["Directional", "Correct: one extreme phenotype (resistance) is favoured."], ["Stabilising", "Stabilising selection favours the mean phenotype."], ["Disruptive", "Disruptive selection favours both extremes."], ["Artificial", "No one chose individual bacteria to breed."]],
        answer: "A", explanation: "Streptomycin favours the resistant extreme: directional selection.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the change in the percentage of resistant bacteria.",
        points: [
          "Resistance allele(s) were present at the start, from random mutation (not caused by streptomycin)",
          "Streptomycin is a selection pressure: susceptible bacteria are killed or cannot divide",
          "Resistant bacteria survive, divide by binary fission and pass on the allele, so their proportion rises each transfer",
        ],
        modelAnswer: "A few bacteria already carried a resistance allele that arose by random mutation. Streptomycin acted as a selection pressure, killing or stopping the division of susceptible bacteria, while resistant bacteria survived, divided by binary fission and passed the allele to their offspring, so their proportion rose with each transfer.",
      }),
      P.short({
        label: "(e)", stem: "Resistance genes are often carried on plasmids. Name the process by which a plasmid can pass from one bacterium to another.",
        accepted: ["conjugation", "bacterial conjugation", "horizontal gene transfer by conjugation"], wrong: ["binary fission"],
        explanation: "Conjugation (horizontal gene transfer).",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest why doctors are advised not to prescribe antibiotics for viral infections.",
        points: ["Antibiotics do not affect viruses (no cell wall / ribosomes / metabolism of their own to target)", "Unnecessary use increases selection pressure on bacteria in the body, favouring resistant strains"],
        modelAnswer: "Antibiotics have no effect on viruses, which lack the cell walls, ribosomes and metabolism that antibiotics target. Using them unnecessarily exposes bacteria in the body to the antibiotic, increasing the selection pressure for resistant strains.",
      }),
    ]),
    explanation: "Process the data, identify directional selection and explain it by mutation and selection.",
    hints: ["Percentage = resistant ÷ total × 100.", "Where did the resistance allele come from?"],
    calculator: true,
  });

  // ---------------------------------------------------------------- T2: Hardy-Weinberg and founder effect (Cambridge)
  const N = 10000, aff = 289;
  const hw = hardyWeinberg({ q2: aff / N });
  b.struct({
    ...T, d: 4, paper: "Cambridge P4", applies: CAM,
    concepts: [A("evolution.allele-frequencies")],
    stem: t`A recessive allele, $d$, causes a hereditary deafness in a species of mouse. In a large mainland population of ${N.toLocaleString("en-GB")} mice, ${aff} were deaf ($dd$). The Hardy-Weinberg equations are $p + q = 1$ and $p^2 + 2pq + q^2 = 1$.`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({ label: "(a)", marks: 1, stem: "Calculate q², the frequency of deaf mice.", value: hw.q2, wrong: [aff], explanation: `${aff} ÷ ${N} = ${hw.q2}.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate q.", value: hw.q, wrong: [hw.q2], explanation: `√${hw.q2} = ${dpStr(hw.q, 2)}.` }),
      P.num({ label: "(c)", marks: 2, stem: "Estimate the number of mice in the population that are carriers ($Dd$).", value: hw.twoPQ * N, unit: "individuals", wrong: [hw.p * hw.q * N], explanation: t`$2pq = 2 \times ${dpStr(hw.p, 2)} \times ${dpStr(hw.q, 2)} = ${dpStr(hw.twoPQ, 4)}$; $\times ${N} = ${Math.round(hw.twoPQ * N)}$ carriers.` }),
      P.mcq({
        label: "(d)", stem: "Deaf mice are more easily caught by owls. Which condition of the Hardy-Weinberg principle does this break?",
        options: [["No selection", "Correct: deaf mice survive less well."], ["Random mating", "Predation does not affect who mates with whom."], ["No migration", "No movement of mice is involved."], ["Large population size", "The population is still large."]],
        answer: "A", explanation: "Differential survival of genotypes is selection.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Six mice from the mainland reached a small island, where their descendants now number a few hundred. The frequency of d on the island is 0.45. Explain how this could have happened.",
        points: [
          "Founder effect: the six founders carried a small, unrepresentative sample of the mainland gene pool / by chance several carried d",
          "Genetic drift in the small island population changed allele frequency by chance over generations",
          "No gene flow from the mainland to restore the original frequency / selection pressure against deafness may be weaker (e.g. no owls)",
        ],
        modelAnswer: "By chance, several of the six founders carried d, so the island gene pool began with a much higher frequency than the mainland: the founder effect. In the small island population, genetic drift then changed allele frequencies randomly from generation to generation, and there was no gene flow from the mainland to bring the frequency back. If there are no owls on the island, selection against deaf mice may also be weaker.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the Hardy-Weinberg equations would not give reliable estimates for the island population.",
        points: ["The population is small, so genetic drift changes allele frequencies", "Mating among close relatives / non-random mating (inbreeding) changes genotype frequencies"],
        modelAnswer: "The island population is small, so genetic drift changes allele frequencies between generations, and the mice are descended from only six founders, so much mating is between relatives, which is non-random and increases homozygotes.",
      }),
    ]),
    explanation: "q² from the recessive phenotype, then q and 2pq; founder effect and drift explain the island frequency.",
    hints: ["q² = deaf ÷ total.", "Carriers = 2pq × population."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T3: speciation and DNA evidence (both boards)
  const s = {
    X: "CTAGGCATTACGGTACCTTA",
    Y: "CTAGGCATCACGGTACCTTG",
    Z: "CTTGGAATCACGCTACGTTG",
  };
  const dXY = diff(s.X, s.Y), dYZ = diff(s.Y, s.Z), dXZ = diff(s.X, s.Z);
  chk(dXY < dYZ && dYZ < dXZ ? 1 : 0, 1);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("evolution.speciation")],
    stem: `Three populations of a small fish, X, Y and Z, live in separate river systems that drain into Lake Kariba from different hills. Fish from X and Y kept together in an aquarium mate and produce fertile offspring; fish from Z do not mate with either. Part of one gene was sequenced from each population (aligned).\n\nX: ${grp(s.X)}\nY: ${grp(s.Y)}\nZ: ${grp(s.Z)}`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({ label: "(a)", marks: 1, stem: "State the number of bases that differ between X and Y.", value: dXY, wrong: [dXY + 1], explanation: `${dXY}.` }),
      P.num({ label: "(b)", marks: 1, stem: "State the number of bases that differ between X and Z.", value: dXZ, wrong: [dXZ - 1], explanation: `${dXZ}.` }),
      P.mcq({
        label: "(c)", stem: "Which conclusion is best supported by all the evidence?",
        options: [["X and Y are one species; Z is a separate species", "Correct: X and Y interbreed fertilely and differ least."], ["X, Y and Z are all one species", "Z does not interbreed with X or Y."], ["X, Y and Z are three separate species, each in its own river", "X and Y produce fertile offspring."], ["Z is the ancestor of X and Y", "Living populations share ancestors; Z is not an ancestor."]],
        answer: "A", explanation: `X and Y produce fertile offspring and differ at only ${dXY} positions; Z is reproductively isolated and differs most.`,
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Explain how population Z could have become a separate species.",
        points: [
          "Geographical isolation in a separate river system / hills prevented gene flow (allopatric)",
          "Different mutations arose in Z",
          "Different selection pressures (e.g. food, predators, water conditions) favoured different alleles / genetic drift if the population was small",
          "Over many generations gene pools diverged until Z could not interbreed with X or Y to produce fertile offspring (e.g. different courtship / mating behaviour)",
        ],
        modelAnswer: "Living in a separate river system, population Z was geographically isolated, so there was no gene flow with the others. Different mutations arose in Z, and different selection pressures, such as food and predators, favoured different alleles; genetic drift may also have acted if the population was small. Over many generations the gene pools diverged until Z could no longer interbreed with X or Y, for example because its courtship behaviour changed: allopatric speciation.",
      }),
      P.short({
        label: "(e)", stem: "Fish from Z do not respond to the courtship displays of fish from X. Name this type of isolating mechanism.",
        accepted: ["behavioural isolation", "behavioural", "behavioral isolation", "behavioural (prezygotic) isolation", "prezygotic behavioural isolation"], wrong: ["temporal isolation"],
        explanation: "Behavioural isolation (a prezygotic mechanism).",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest why fertile offspring are needed, not just offspring, to show that X and Y are the same species.",
        points: ["Different species sometimes produce hybrids that are sterile (e.g. mule)", "Only fertile offspring show that genes can flow between the populations"],
        modelAnswer: "Different species can sometimes produce hybrids, but these are usually sterile, like the mule. Fertile offspring show that alleles can pass into later generations, so the populations share one gene pool.",
      }),
    ]),
    explanation: "Count base differences, combine with breeding evidence and explain allopatric speciation.",
    hints: ["Compare the sequences base by base.", "What prevented gene flow?"],
  });
  // ---------------------------------------------------------------- T4: classification (both boards)
  b.struct({
    ...T, d: 3, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("biodiversity.classification-hierarchy"), A("biodiversity.kingdoms")],
    stem: "The white rhinoceros, *Ceratotherium simum*, and the black rhinoceros, *Diceros bicornis*, both live in Zimbabwe. Both belong to the family Rhinocerotidae, order Perissodactyla, class Mammalia.",
    parts: checkExam(EXAM.THEORY10, [
      P.short({ label: "(a)", stem: "State the genus of the black rhinoceros.", accepted: ["Diceros"], wrong: ["bicornis"], explanation: "*Diceros*: the first word of the binomial name." }),
      P.mcq({
        label: "(b)", stem: "Which is the lowest rank that the two rhinoceroses share?",
        options: [["Family", "Correct: Rhinocerotidae."], ["Genus", "They are in different genera."], ["Order", "They share the order, but also the lower rank of family."], ["Class", "They share class, order and family."]],
        answer: "A", explanation: "Different genera, same family.",
      }),
      P.short({ label: "(c)", stem: "Name the phylum to which both rhinoceroses belong.", accepted: ["Chordata", "chordates", "chordate", "Chordates"], wrong: ["Mammalia"], explanation: "Chordata (mammals are chordates)." }),
      P.num({ label: "(d)", marks: 1, stem: "A dichotomous key is written to identify the seven large herbivores of a game park. How many couplets are needed?", value: 6, wrong: [7], explanation: "7 − 1 = 6 couplets." }),
      P.manual({
        label: "(e)", marks: 2, stem: "State two rules for writing binomial names, using a rhinoceros as an example.",
        points: ["Genus first with a capital letter, specific name second in lower case: *Ceratotherium simum*", "Both words italicised in print (or underlined when handwritten)"],
        modelAnswer: "The genus comes first with a capital letter and the specific name second in lower case, as in *Ceratotherium simum*; both words are printed in italics, or underlined when handwritten.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the biological species concept is difficult to apply to two populations of rhinoceros kept in separate countries.",
        points: ["The concept requires testing whether they interbreed to produce fertile offspring", "Populations that never meet cannot be tested naturally (and captive breeding may not reflect the wild / takes many years)"],
        modelAnswer: "The biological species concept depends on whether the populations interbreed to give fertile offspring. Populations in separate countries never meet, so this cannot be observed naturally, and testing it in captivity would take many years.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Rhinoceros dung is broken down by fungi. State two features that place fungi in a different kingdom from plants.",
        points: ["Cell walls of chitin, not cellulose", "Heterotrophic: no chlorophyll; digest food externally and absorb it (store glycogen, not starch)"],
        modelAnswer: "Fungi have chitin cell walls, whereas plants have cellulose walls, and fungi have no chlorophyll: they digest food outside their hyphae and absorb it, storing glycogen rather than starch.",
      }),
    ]),
    explanation: "Apply the hierarchy, binomial rules and kingdom features.",
    hints: ["The first word of a binomial is the genus.", "n organisms need n − 1 couplets."],
  });

  // ---------------------------------------------------------------- T5: variation and artificial selection (both boards)
  const pA = 3.6, pB = 2.4, f1 = 7.9;
  const mp = (pA + pB) / 2;
  const het = pctChange(mp, f1);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("evolution.variation"), A("evolution.artificial-selection")],
    stem: `Plant breeders produced hybrid maize by crossing two inbred lines. In an illustrative trial, inbred line A yielded ${pA} tonnes per hectare, line B ${pB} tonnes per hectare and the F1 hybrid ${f1} tonnes per hectare. Yield is controlled by many genes with additive effects and is strongly affected by the environment.`,
    parts: checkExam(EXAM.THEORY10, [
      P.mcq({
        label: "(a)", stem: "What type of variation does yield in maize show?",
        options: [["Continuous", "Correct: many genes plus environment."], ["Discontinuous", "Discontinuous variation has distinct classes."], ["Environmental only", "Yield also has a genetic basis."], ["Mutational", "This is not a type of variation."]],
        answer: "A", explanation: "Polygenes plus environment give continuous variation.",
      }),
      P.num({ label: "(b)", marks: 1, stem: "If yield were controlled by four genes, each with a contributing and a non-contributing allele of equal additive effect, how many yield classes could there be (ignoring the environment)?", value: 9, wrong: [8, 16], explanation: "2 × 4 + 1 = 9 classes." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage by which the hybrid's yield exceeds the mean yield of the two inbred lines, to three significant figures.", value: het, sf: 3, unit: "%", wrong: [sfStr(pctChange(pA, f1), 3)], explanation: t`Mean of parents $= ${mp}$; $\dfrac{${f1} - ${mp}}{${mp}} \times 100 = ${sfStr(het, 3)}\%$.` }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the hybrid plants are both more vigorous than their parents and very uniform.",
        points: [
          "Inbred lines are homozygous; harmful recessive alleles are expressed (inbreeding depression)",
          "The hybrid is heterozygous at many loci, so dominant alleles mask harmful recessives: hybrid vigour",
          "Both parents are homozygous, so they produce one type of gamete each and every F1 plant has the same genotype",
        ],
        modelAnswer: "The inbred lines are homozygous at most loci, so harmful recessive alleles are expressed and the plants are weak. The F1 hybrid is heterozygous at many loci, so dominant alleles from one line mask harmful recessive alleles from the other, giving hybrid vigour. Because each parent is homozygous, it produces only one type of gamete, so all F1 plants have the same genotype and are uniform.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Explain why farmers do not save seed from hybrid maize to plant the next season.",
        points: ["F2 plants are variable / have lower yield, because alleles segregate (and recombine) at meiosis in the F1"],
        modelAnswer: "Alleles segregate in meiosis in the F1, so F2 plants have many different genotypes, vary widely and yield less.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why breeders grow candidate lines in the same field under the same conditions when selecting for yield.",
        points: ["Yield is strongly affected by the environment (soil, water, nutrients)", "Uniform conditions mean that differences between lines are mainly genetic, so selection picks the best alleles"],
        modelAnswer: "Yield depends strongly on soil, water and nutrients. Growing all candidates under the same conditions means that differences between them are mainly genetic, so the breeder selects plants with the best alleles rather than the luckiest positions.",
      }),
    ]),
    explanation: "Continuous variation, polygene classes, hybrid vigour and uniformity.",
    hints: ["2n + 1 classes for n additive genes.", "Find the mean of the two parents first."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T6: sampling and Simpson's index (Cambridge)
  const L = { n1: 75, n2: 64, m2: 16 };
  const NL = lincoln(L.n1, L.n2, L.m2);
  chk(NL, 300);
  const sites = { open: [19, 15, 12, 8, 6], fenced: [41, 6, 3, 0, 0] };
  const Sa = simpson(sites.open);
  const Sb = simpson(sites.fenced.filter((x) => x > 0));
  b.struct({
    ...T, d: 4, paper: "Cambridge P4", applies: CAM,
    concepts: [A("biodiversity.sampling"), A("biodiversity.diversity-statistics")],
    stem: `Students studied grasshoppers and plants in two areas of grassland near Bulawayo.\n\nThey caught ${L.n1} grasshoppers with sweep nets in one area, marked them with a small dot of non-toxic paint and released them. Two days later they caught ${L.n2}, of which ${L.m2} were marked. The Lincoln index is $N = \\dfrac{n_1 \\times n_2}{m_2}$.\n\nThey also counted plants of five species in quadrats in an open, grazed area and in a fenced, ungrazed area.\n\n${table(["Species", "1", "2", "3", "4", "5"], [["Open area", ...sites.open.map(String)], ["Fenced area", ...sites.fenced.map(String)]])}\n\nSimpson's index of diversity is $D = 1 - \\sum \\left(\\dfrac{n}{N}\\right)^2$.`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({ label: "(a)", marks: 2, stem: "Estimate the grasshopper population.", value: NL, unit: "individuals", wrong: [(L.n1 * L.m2) / L.n2], explanation: t`$\dfrac{${L.n1} \times ${L.n2}}{${L.m2}} = ${NL}$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "State two assumptions made in using the Lincoln index.", points: ["Marked grasshoppers mix randomly with the population / marking does not affect survival or catchability", "No births, deaths, immigration or emigration between samples / marks not lost"], modelAnswer: "That marked grasshoppers mix randomly back into the population and are not harmed or made easier to catch by the paint, and that there are no significant births, deaths or migration, or loss of marks, between the two samples." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate Simpson's index of diversity for the open area, to three significant figures.", value: Sa.D, sf: 3, wrong: [sfStr(Sa.sumFrac2, 3)], explanation: t`$N = ${Sa.N}$; $\sum (n/N)^2 = ${dpStr(Sa.sumFrac2, 4)}$; $D = ${sfStr(Sa.D, 3)}$.` }),
      P.mcq({
        label: "(d)", stem: `Simpson's index for the fenced area is ${sfStr(Sb.D, 3)}. Which statement is correct?`,
        options: [["The open area has higher diversity because individuals are spread more evenly among more species", "Correct."], ["The fenced area has higher diversity because it has more plants in total", "Total numbers do not determine D; evenness and richness do."], ["Both areas have the same diversity because both were sampled with quadrats of the same size and shape", "Sampling method does not make D equal."], ["Diversity cannot be compared because the totals differ", "D is a proportion-based index and can be compared."]],
        answer: "A", explanation: `Open: D = ${sfStr(Sa.D, 3)}, five species fairly evenly represented; fenced: D = ${sfStr(Sb.D, 3)}, three species dominated by species 1.`,
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why diversity is lower in the fenced, ungrazed area.",
        points: ["Without grazing, one tall/fast-growing species (species 1) dominates / outcompetes others for light", "Grazing removes dominant plants and creates gaps / niches for less competitive species, increasing evenness and richness"],
        modelAnswer: "Without grazing, a tall, fast-growing species (species 1) outcompetes the others for light and dominates. Grazing in the open area keeps the dominant species short and creates gaps in which less competitive species survive, increasing richness and evenness.",
      }),
      P.num({ label: "(f)", marks: 1, stem: "In the open area, 60 plants were counted in twenty 0.25 m² quadrats. Calculate the mean density of plants per m².", value: 60 / (20 * 0.25), unit: "per m²", wrong: [3], explanation: "60 ÷ (20 × 0.25) = 60 ÷ 5 = 12 per m²." }),
    ]),
    explanation: "Lincoln index, Simpson's index and their interpretation.",
    hints: ["N = n₁n₂/m₂.", "Square each proportion n/N before adding."],
    calculator: true,
  });
  chk(Sa.N, 60);
  if (!(Sa.D > Sb.D)) throw new Error("expected open > fenced");
});
