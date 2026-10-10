// W4a: evolution and speciation (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t, chk, table, dpStr, sfStr } from "../lib.mjs";

const diff = (a, b) => {
  if (a.length !== b.length) throw new Error("sequences differ in length");
  return [...a].filter((c, i) => c !== b[i]).length;
};
const grp = (s) => s.match(/.{1,10}/g).join(" ");

concept("abio.evolution.speciation", { file: "evolution/speciation", keyPrefix: "evolution.speciation" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What must happen for two populations of one species to become two separate species?",
    options: [
      ["They must become unable to interbreed to produce fertile offspring", "Correct: reproductive isolation."],
      ["They must live in different countries", "Location alone does not make species."],
      ["They must differ from each other in at least one feature that can be seen", "Many separate species look alike, and varieties of one species can look different."],
      ["They must have different numbers of individuals", "Population size does not define species."],
    ],
    answer: "A",
    explanation: "Speciation is complete when the populations can no longer interbreed to produce fertile offspring.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In allopatric speciation, what is the role of the geographical barrier?",
    options: [
      ["It prevents gene flow between the populations", "Correct."],
      ["It causes mutations in the separated populations", "Mutations are random and are not caused by the barrier."],
      ["It makes the separated populations identical", "The populations diverge."],
      ["It produces polyploid offspring", "Polyploidy is a sympatric mechanism."],
    ],
    answer: "A",
    explanation: "The barrier stops interbreeding; mutation, selection and drift then make the gene pools diverge.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Two species of frog live in the same pond but breed at different times of year. What type of isolating mechanism is this?",
    options: [
      ["Temporal isolation", "Correct: different breeding seasons."],
      ["Geographical isolation", "They live in the same pond."],
      ["Mechanical isolation", "This concerns incompatible reproductive structures."],
      ["Hybrid sterility", "This is postzygotic; here no hybrids are formed."],
    ],
    answer: "A",
    explanation: "Different breeding times prevent mating: temporal (seasonal) isolation, a prezygotic mechanism.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a mule (horse × donkey) sterile?",
    options: [
      ["Its chromosomes from the two parents cannot pair properly in meiosis", "Correct: 32 horse and 31 donkey chromosomes do not form homologous pairs."],
      ["It has no chromosomes from the donkey", "It has one set from each parent."],
      ["Its cells cannot divide by mitosis", "Mules grow normally by mitosis."],
      ["It inherits two complete sets of chromosomes from the donkey and none from the horse", "Their chromosomes differ in number and structure."],
    ],
    answer: "A",
    explanation: "Without homologous pairs, meiosis fails and no viable gametes form: hybrid sterility.",
    hints: ["Which kind of division makes gametes?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A diploid plant (2n = 12) produces unreduced diploid gametes, which fuse to form a tetraploid (4n = 24) plant. Why is the tetraploid immediately a new species?",
    options: [
      ["Its offspring with the diploid parent are triploid and sterile", "Correct: 3n hybrids cannot form balanced gametes."],
      ["It cannot reproduce at all", "The tetraploid can reproduce with other tetraploids or by self-pollination."],
      ["It always lives in a different habitat from the diploid parent species", "Polyploid speciation is sympatric."],
      ["Its DNA has a different base-pairing rule", "Base pairing is the same."],
    ],
    answer: "A",
    explanation: "A 4n × 2n cross gives 3n offspring that are sterile, so the tetraploid is reproductively isolated in one generation.",
    hints: ["What chromosome number would a hybrid with the parent have?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "The amino acid sequence of a protein differs at 2 positions between species J and K, at 9 positions between J and L, and at 10 positions between K and L. Which conclusion is best supported?",
    options: [
      ["J and K share a more recent common ancestor with each other than either does with L", "Correct: fewest differences."],
      ["L is the ancestor of both J and K", "Living species are not ancestors of each other; they share ancestors."],
      ["J and L are the most closely related pair", "J and L differ at 9 positions, more than J and K."],
      ["All three species diverged from their common ancestor at exactly the same time", "The unequal differences suggest different times of divergence."],
    ],
    answer: "A",
    explanation: "Fewer differences mean less time for mutations to accumulate since the common ancestor.",
    hints: ["Which pair has the fewest differences?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Why are DNA sequence comparisons more informative than comparisons of the amino acid sequence of the protein the DNA codes for?",
    options: [
      ["Some base substitutions do not change the amino acid, so DNA shows more differences", "Correct: the code is degenerate."],
      ["Proteins are not inherited at all, so their sequences show nothing about evolution", "Protein sequences are coded by inherited genes and are useful evidence."],
      ["DNA never mutates, so its sequence is a perfect record", "DNA does mutate; that is why sequences differ."],
      ["Amino acid sequences are identical in all species", "They differ, and the differences are informative."],
    ],
    answer: "A",
    explanation: "Silent substitutions and non-coding DNA reveal differences invisible in the protein.",
    hints: ["Think about the degenerate genetic code."],
  });

  // Numerical: count differences
  const s1 = "TACGGATCCATGGCTAAGTTC";
  const s2 = "TACGGTTCCATGGATAAGTCC";
  const nd = diff(s1, s2);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Count the number of bases that differ between these two aligned DNA sequences from related species of tilapia.\n\nSpecies 1: ${grp(s1)}\nSpecies 2: ${grp(s2)}`,
    value: nd, wrong: [nd + 1, s1.length - nd],
    explanation: `Comparing position by position, the sequences differ at ${nd} positions.`,
  });
  // Calculation: percentage similarity
  const L = 60, d2 = 4;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `Two aligned DNA sequences of ${L} bases differ at ${d2} positions. Calculate the percentage of bases that are identical, to three significant figures.`,
    value: ((L - d2) / L) * 100, sf: 3, unit: "%", wrong: [sfStr((d2 / L) * 100, 3)],
    explanation: t`$\dfrac{${L} - ${d2}}{${L}} \times 100 = ${sfStr(((L - d2) / L) * 100, 3)}\%$. (${sfStr((d2 / L) * 100, 3)}% is the percentage that differs.)`,
    hints: ["Identical positions = total − different positions."],
  });
  // Numerical: chromosome number
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "Species A (2n = 18) and species B (2n = 14) hybridise. The hybrid is sterile, but the chromosome number of one hybrid plant doubles and it becomes fertile. What is the chromosome number of the new fertile plant?",
    value: 32, wrong: [16, 64],
    explanation: "Gametes carry 9 and 7 chromosomes, so the hybrid has 16; doubling gives **32**, so every chromosome now has a homologous partner in meiosis.",
    hints: ["First find the hybrid's chromosome number from the two gametes."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In sympatric speciation, the new species arises without a geographical barrier.",
    answer: true,
    explanation: "True. Sympatric speciation happens within one area, through ecological or behavioural separation or polyploidy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hybrid sterility is a prezygotic isolating mechanism.",
    answer: false,
    explanation: "False. A sterile hybrid has already been formed from a zygote, so hybrid sterility is postzygotic.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each observation with the isolating mechanism it shows.",
    pairs: [
      ["Two bird species have different courtship songs", "Behavioural"],
      ["Pollen of one plant species cannot grow a tube on the stigma of another", "Gametic"],
      ["Two plant species flower in different months", "Temporal"],
      ["A hybrid embryo dies before birth", "Hybrid inviability"],
      ["Flower shapes let only one kind of pollinator reach the nectar", "Mechanical"],
    ],
    explanation: "Song: behavioural; pollen tube: gametic; flowering time: temporal; embryo death: hybrid inviability; flower shape: mechanical.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Speciation after separation by a mountain range is {{blank:a}} speciation. Speciation by polyploidy in plants is usually {{blank:b}} speciation.",
    blanks: [
      { id: "a", accepted: ["allopatric"], choices: ["allopatric", "sympatric"] },
      { id: "b", accepted: ["sympatric"], choices: ["sympatric", "allopatric"] },
    ],
    explanation: "Geographical barrier: allopatric. Polyploidy: sympatric.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Give the term for having more than two complete sets of chromosomes in each cell.",
    accepted: ["polyploidy", "polyploid"],
    wrong: ["aneuploidy"],
    explanation: "Polyploidy.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how a river that changes its course and divides a population of small mammals could lead to the formation of two species.",
    points: [
      "The river is a geographical barrier: no interbreeding / gene flow between the two populations (allopatric)",
      "Different mutations occur in each population",
      "Different selection pressures on each side (food, predators, habitat) favour different alleles",
      "Genetic drift changes allele frequencies, especially in small populations; over many generations gene pools diverge",
      "Eventually they cannot interbreed to produce fertile offspring even if they meet: reproductive isolation / new species",
    ],
    modelAnswer: "The river acts as a geographical barrier, so there is no gene flow between the two populations. Different mutations arise on each side, and different selection pressures, such as food and predators, favour different alleles by natural selection. Genetic drift also changes allele frequencies, especially if a population is small. Over many generations the gene pools diverge so much that, even if the populations meet again, they cannot interbreed to produce fertile offspring: they have become two species by allopatric speciation.",
    explanation: "Barrier, no gene flow, mutation, selection, drift, isolation.",
    hints: ["Follow the sequence from barrier to reproductive isolation."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest how sympatric speciation might occur in a lake where one fish species feeds both on the bottom and in open water.",
    points: [
      "Fish feeding on the bottom and in open water face different selection pressures (mouth shape, colour)",
      "Fish mate mainly with others in the same feeding area / females choose mates by colour, reducing gene flow (ecological / behavioural isolation)",
      "Over many generations the gene pools diverge until the groups cannot interbreed",
    ],
    modelAnswer: "Fish that feed on the bottom and those that feed in open water face different selection pressures, for example on mouth shape. If they mate mainly with fish from the same feeding zone, or females choose mates by colours linked to each zone, gene flow between the groups is reduced. Over many generations their gene pools diverge until they can no longer interbreed.",
    explanation: "Ecological and behavioural separation within one area.",
    hints: ["What could stop the two groups mating with each other?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Two populations of a beetle, isolated on different hills for a long time, look identical. Suggest how a biologist could find out whether they are separate species.",
    points: [
      "Try to cross them / bring them together and see if they mate (behavioural isolation)",
      "See whether offspring are produced and whether the offspring are fertile (cross the hybrids)",
      "Compare DNA base sequences: many differences suggest long separation (supporting evidence only)",
    ],
    modelAnswer: "The biologist could bring beetles from the two hills together and see whether they mate. If they do, she should check whether offspring are produced and whether those offspring are themselves fertile. Comparing DNA sequences would show how much the populations have diverged, which supports, but does not prove, a species difference.",
    explanation: "The test of a species is fertile interbreeding.",
    hints: ["What defines a species?"],
  });

  // Practice structured 1: DNA sequences of four species
  const seqs = {
    P: "GCTAAGCTTCGAATGCCTGA",
    Q: "GCTAAGCTCCGAATGCCTGA",
    R: "GCAAAGCTCCGTATGCCAGA",
    S: "GCAAGGCTCCGTATACCAGG",
  };
  const dPQ = diff(seqs.P, seqs.Q), dPR = diff(seqs.P, seqs.R), dQR = diff(seqs.Q, seqs.R), dRS = diff(seqs.R, seqs.S), dPS = diff(seqs.P, seqs.S);
  chk(dPQ < dQR && dQR < dPS ? 1 : 0, 1);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Part of a gene was sequenced in four species of antelope, P, Q, R and S. The sequences are aligned.\n\nP: ${grp(seqs.P)}\nQ: ${grp(seqs.Q)}\nR: ${grp(seqs.R)}\nS: ${grp(seqs.S)}`,
    parts: [
      P.group({
        label: "(a)", stem: "State the number of bases that differ between:",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "P and Q.", value: dPQ, wrong: [dPQ + 1], explanation: `${dPQ}.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Q and R.", value: dQR, wrong: [dQR + 1], explanation: `${dQR}.` }),
          P.num({ label: "(iii)", marks: 1, stem: "R and S.", value: dRS, wrong: [dRS - 1], explanation: `${dRS}.` }),
        ],
      }),
      P.manual({ label: "(b)", marks: 2, stem: `P and S differ at ${dPS} positions and P and R at ${dPR}. Which two species are most closely related? Explain your answer.`, points: [`P and Q: they differ at only ${dPQ} position(s), the fewest`, "Fewer differences mean less time for mutations to accumulate / a more recent common ancestor"], modelAnswer: `P and Q, which differ at only ${dPQ} position, the fewest of any pair, so they have had the least time to accumulate mutations since their common ancestor.` }),
      P.manual({ label: "(c)", marks: 1, stem: "Suggest which species diverged earliest from the others.", points: [`S: it differs most from P and Q (${dPS} differences from P)`], modelAnswer: `S, because it shows the most differences from the other species (${dPS} from P).` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why a base difference in DNA may not cause a difference in the protein, and why biologists compare many genes rather than one.", points: ["The genetic code is degenerate (several triplets code for the same amino acid) or the difference is in a non-coding region (intron)", "One short sequence is a small sample; different genes evolve at different rates, so many genes give a more reliable picture"], modelAnswer: "The genetic code is degenerate, so a substitution may produce a triplet that codes for the same amino acid; or the difference may lie in an intron that is not translated. One short sequence is a small sample and different genes change at different rates, so comparing many genes gives a more reliable picture of relationships." }),
    ],
    explanation: "Count differences; fewer differences mean closer relationship.",
    hints: ["Compare the sequences position by position."],
  });

  // Practice structured 2: polyploid speciation and isolating mechanisms
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A grass species A (2n = 14) and a related species B (2n = 28) grow together on a riverbank near Chiredzi. Hybrids between them are found but set almost no seed. In one area, a population of plants with 2n = 42 has appeared, which set seed normally and produce only sterile offspring when crossed with either A or B.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number of chromosomes in the hybrids between A and B.", value: 21, wrong: [42, 14], explanation: "Gametes carry 7 (from A) and 14 (from B): 7 + 14 = 21." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the A × B hybrids are almost sterile.", points: ["Chromosomes from A and B are not homologous / cannot pair in prophase I of meiosis", "So gametes receive unbalanced sets of chromosomes and are not viable"], modelAnswer: "The chromosomes from A and B are not homologous, so they cannot pair properly in prophase I of meiosis. The gametes receive unbalanced sets of chromosomes and are not viable." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest how the 2n = 42 plants arose and why they are fertile.", points: ["Chromosome number of a hybrid (21) doubled, e.g. by failure of cell division after chromosome replication / unreduced gametes", "Every chromosome now has a homologous partner, so pairing in meiosis is normal", "So balanced gametes are formed and seed is set"], modelAnswer: "The chromosome number of a hybrid doubled from 21 to 42, perhaps because a cell replicated its chromosomes but did not divide, or because unreduced gametes fused. Each chromosome now has a homologous partner, so pairing in meiosis is normal, balanced gametes form and seed is set." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the 2n = 42 population is regarded as a new species, and name this type of speciation.", points: ["It cannot interbreed with A or B to produce fertile offspring: reproductively isolated (postzygotic, hybrid sterility)", "Sympatric speciation (by polyploidy) because it arose in the same area as its parents"], modelAnswer: "It produces only sterile offspring with A or B, so it is reproductively isolated by hybrid sterility and is a separate species. Because it arose in the same place as its parent species, this is sympatric speciation by polyploidy." }),
    ],
    explanation: "Hybridisation and chromosome doubling give a fertile polyploid isolated from its parents.",
    hints: ["Each parent's gametes contain n chromosomes."],
  });

  b.card("DEFINITION", "Speciation", "Formation of a new species when populations become reproductively isolated and their gene pools diverge.");
  b.card("DEFINITION", "Allopatric speciation", "Speciation after populations are separated by a geographical barrier.");
  b.card("DEFINITION", "Sympatric speciation", "Speciation within one area by ecological or behavioural separation, or polyploidy.");
  b.card("CONCEPT", "Prezygotic isolating mechanisms", "Ecological, temporal, behavioural, mechanical and gametic: they prevent fertilisation.");
  b.card("CONCEPT", "Postzygotic isolating mechanisms", "Hybrid inviability, hybrid sterility (e.g. mule) and hybrid breakdown.");
  b.card("CONCEPT", "Why a mule is sterile", "Horse (32) and donkey (31) chromosomes cannot form homologous pairs in meiosis.");
  b.card("CONCEPT", "Molecular evidence of relationship", "Fewer differences in DNA or protein sequences mean a more recent common ancestor.");
  b.card("FACT", "An example of a polyploid crop species", "Bread wheat, which arose by hybridisation between three ancestral grass species.");
});
