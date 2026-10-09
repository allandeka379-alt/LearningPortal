// Slice W2b: monohybrid inheritance.
import { concept, P, monohybrid, pct, check, table, agricultureLevels } from "../lib.mjs";

// Cross results computed with the helper (numbers differ from the lesson's 120 calves).
const hetxhet = monohybrid("Tt", "Tt");
const hetxrec = monohybrid("Bb", "bb");
const homxrec = monohybrid("BB", "bb");
check(hetxhet.phenotypes.dominant === 3 && hetxrec.phenotypes.dominant === 2 && homxrec.phenotypes.recessive === 0, "crosses");

const PLANTS = 160;
const tall = (PLANTS * hetxhet.phenotypes.dominant) / 4;
const dwarf = (PLANTS * hetxhet.phenotypes.recessive) / 4;
check(tall === 120 && dwarf === 40, "plants");

const KIDS = 48;
const tcRecessive = (KIDS * hetxrec.phenotypes.recessive) / 4;
check(tcRecessive === 24, "tc");

const recPct = pct(hetxhet.phenotypes.recessive, 4);
check(recPct === 25, "recPct");

// Structured: breeding records of a black bull mated with red cows, and of F1 x F1.
const REC = [
  ["Black bull 'Dumbu' × red cows", 18, 0],
  ["Black bull 'Shumba' × red cows", 9, 11],
  ["F1 black × F1 black (from many matings)", 63, 21],
];
const REC_TABLE = table(["Mating", "Black calves", "Red calves"], REC);
const f2Total = 63 + 21;
const f2Ratio = 63 / 21;
check(f2Total === 84 && f2Ratio === 3, "f2");

concept("agri.breeding.monohybrid", { file: "breeding/monohybrid", keyPrefix: "breeding.monohybrid" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **allele**?",
    options: [
      ["One of the alternative forms of a gene", "Correct: e.g. the polled and horned forms of one gene."],
      ["A thread of DNA carrying many genes in a line", "That describes a chromosome."],
      ["The observable features of an organism", "That is the phenotype."],
      ["A cell with one set of chromosomes", "That describes a haploid cell, such as a gamete."],
    ],
    answer: "A",
    explanation: "Alleles are different versions of the same gene at the same position on a chromosome pair.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which genotype is **heterozygous**?",
    options: [
      ["Tt: one tall and one dwarf allele", "Correct: two different alleles."],
      ["TT: two alleles for tall", "Two identical dominant alleles: homozygous dominant."],
      ["tt: two alleles for dwarf", "Two identical recessive alleles: homozygous recessive."],
      ["T: a single allele for tall", "A single allele is found in a gamete, not a body cell."],
    ],
    answer: "A",
    explanation: "Heterozygous means two different alleles of a gene.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Two heterozygous tall plants (Tt × Tt) are crossed. What ratio of tall to dwarf offspring is expected?",
    options: [
      ["3 tall : 1 dwarf", "Correct: TT, Tt, Tt are tall; tt is dwarf."],
      ["1 tall : 1 dwarf", "1:1 comes from Tt × tt."],
      ["All tall", "All tall comes from TT × any genotype."],
      ["1 tall : 3 dwarf", "This reverses the ratio."],
    ],
    answer: "A",
    explanation: "Tt × Tt gives 1 TT : 2 Tt : 1 tt, so 3 tall : 1 dwarf.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A polled bull is mated with horned cows (polled is dominant). Half the calves are horned. What is the bull's genotype?",
    options: [
      ["Pp, a carrier of horned", "Correct: he passes p to half the calves, giving pp."],
      ["PP, pure-breeding polled", "A PP bull would give only polled calves."],
      ["pp, homozygous horned", "A pp bull would be horned."],
      ["P, a single polled allele", "A body cell has two alleles, not one."],
    ],
    answer: "A",
    explanation: "Pp × pp gives 1 Pp (polled) : 1 pp (horned).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which gametes can be produced by an animal with the genotype Bb?",
    options: [
      ["B and b", "Correct: each gamete carries one allele."],
      ["Bb only", "A gamete carries one allele, not two."],
      ["B only", "Half the gametes carry b."],
      ["BB and bb", "Gametes are haploid, with one allele each."],
    ],
    answer: "A",
    explanation: "Meiosis separates the two alleles, so half the gametes carry B and half carry b.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In rabbits, black coat (B) is dominant to brown (b). A breeder wants to know whether a black buck is BB or Bb. Which mating is the best test cross?",
    options: [
      ["Mate him with brown does (bb)", "Correct: brown does reveal any b allele from the buck."],
      ["Mate him with pure black does", "All young would be black whatever his genotype."],
      ["Mate him with black carrier does", "Possible, but harder to interpret than a cross with bb does."],
      ["Mate him with his own black daughters", "This is inbreeding and is not the standard test cross."],
    ],
    answer: "A",
    hints: ["Which does can only give a recessive allele?"],
    explanation: "A test cross uses a homozygous recessive partner, so each offspring shows the allele from the unknown parent.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Among the polled offspring of a Pp × Pp cross, what fraction is expected to be heterozygous?",
    options: [
      ["Two-thirds", "Correct: of PP, Pp, Pp, two of the three polled are Pp."],
      ["One-half", "Half of all offspring are Pp, but the question asks about polled ones only."],
      ["One-quarter", "One-quarter of all offspring are PP or pp."],
      ["Three-quarters", "Three-quarters of all offspring are polled."],
    ],
    answer: "A",
    hints: ["List the polled genotypes from the Punnett square: PP, Pp, Pp."],
    explanation: "Polled offspring are 1 PP : 2 Pp, so 2/3 are heterozygous carriers of horned.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two black cattle produce a red calf (black is dominant to red). What can be concluded?",
    options: [
      ["Both parents are heterozygous (Bb)", "Correct: a bb calf needs one b from each parent."],
      ["One parent must be homozygous BB", "A BB parent could not give a b allele."],
      ["The red calf must be a mutation", "Two carriers explain it simply."],
      ["The environment turned the calf red", "Coat colour here is controlled by the alleles."],
    ],
    answer: "A",
    hints: ["What genotype must the red calf have?"],
    explanation: "The red calf is bb, so it received b from each black parent; both are Bb.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A recessive allele shows its effect only when the organism is homozygous for it.",
    answer: true,
    explanation: "True. With one dominant allele present, the dominant phenotype appears.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Animals with the same phenotype always have the same genotype.",
    answer: false,
    explanation: "False. PP and Pp animals both look polled; a test cross is needed to tell them apart.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Genotype", "The alleles an organism carries"],
      ["Phenotype", "The observable characteristics"],
      ["Homozygous", "Two identical alleles of a gene"],
      ["Dominant", "Shows its effect even when only one copy is present"],
      ["Gene", "A length of DNA controlling one characteristic"],
    ],
    explanation: "These are the terms both syllabuses require you to define.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences about the cross Bb × bb.",
    template: "The bb parent can only produce gametes carrying the allele {{blank:a}}. The offspring are expected in the ratio {{blank:b}} black to red. This kind of cross with a homozygous recessive is called a {{blank:c}} cross.",
    blanks: [
      { id: "a", accepted: ["b"], normalise: ["trim"] },
      { id: "b", accepted: ["1:1", "1 : 1", "1 to 1", "one to one"] },
      { id: "c", accepted: ["test", "test cross", "back"] },
    ],
    explanation: "bb gives only b gametes; Bb × bb gives 1:1; a cross with a homozygous recessive is a test cross.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State the term for an organism that has two identical alleles of a gene.",
    accepted: ["homozygous", "homozygote", "pure breeding", "true breeding", "pure-breeding", "true-breeding"],
    rejected: ["heterozygous"],
    explanation: "Two identical alleles: **homozygous** (true-breeding).",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `Heterozygous tall bean plants (Tt) are self-pollinated and ${PLANTS} offspring grow. How many are expected to be dwarf?`,
    value: dwarf, unit: "plants", wrong: [tall, PLANTS / 2],
    explanation: `Tt × Tt gives 3 tall : 1 dwarf, so dwarf = 1/4 × ${PLANTS} = ${dwarf}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A heterozygous black buck (Bb) is mated with red does (bb) and ${KIDS} kids are born. How many red kids are expected?`,
    value: tcRecessive, unit: "animals", wrong: [KIDS / 4, (3 * KIDS) / 4],
    explanation: `Bb × bb gives 1 black : 1 red, so red = 1/2 × ${KIDS} = ${tcRecessive}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "What percentage of the offspring of a Tt × Tt cross is expected to be homozygous recessive?",
    value: recPct, unit: "%", wrong: [50, 75],
    hints: ["Draw the Punnett square and count tt."],
    explanation: `1 out of 4 offspring is tt: 1 ÷ 4 × 100 = ${recPct}%.`,
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "In cattle, polled (P) is dominant to horned (p). Using a genetic diagram, show the expected offspring of a cross between a heterozygous polled bull and a horned cow.",
    hints: ["Parents, gametes, Punnett square, genotypes, phenotypes, ratio."],
    points: [
      "Parental genotypes: Pp × pp.",
      "Gametes: P and p from the bull; p from the cow.",
      "Offspring genotypes: Pp and pp (in equal numbers).",
      "Phenotypes: polled and horned in a 1:1 ratio.",
    ],
    modelAnswer: "Parents: polled bull Pp × horned cow pp. Gametes: P, p and p. Offspring: Pp, Pp, pp, pp, i.e. 1 polled : 1 horned.",
    explanation: "One mark for each stage of the diagram.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why knowing the genotype of breeding animals is important to a stud breeder.",
    hints: ["Think about hidden recessive alleles and selling pure-breeding stock."],
    points: [
      "Animals with the dominant phenotype may carry a hidden recessive allele (heterozygous).",
      "Carriers can pass unwanted characteristics (e.g. horns or defects) to offspring.",
      "Knowing genotypes (e.g. by test crosses) lets the breeder keep and sell true-breeding (homozygous) stock and cull carriers.",
    ],
    modelAnswer: "A polled bull may be Pp and carry the horned allele, which he passes to half his calves. Test crosses reveal such carriers, so the breeder can keep only homozygous animals and sell stock that breeds true.",
    explanation: "Hidden alleles, risk, solution.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `In cattle, black coat (B) is dominant to red coat (b). A breeder kept these records.\n\n${REC_TABLE}`,
    hints: ["A red calf is bb.", "A test cross uses homozygous recessive partners."],
    parts: [
      P.short({ label: "(a)", stem: "State the genotype of the red cows.", accepted: ["bb"], normalise: ["trim"], explanation: "Red is recessive, so red cows are bb." }),
      P.short({ label: "(b)", stem: "State the most likely genotype of the bull Dumbu.", accepted: ["BB"], normalise: ["trim"], explanation: "No red calves in 18: most likely BB." }),
      P.short({ label: "(c)", stem: "State the genotype of the bull Shumba.", accepted: ["Bb"], normalise: ["trim"], explanation: "Red calves appeared, so he carries b: Bb." }),
      P.num({
        label: "(d)", stem: "Calculate the ratio of black to red calves in the F1 × F1 matings, as black ÷ red.",
        value: f2Ratio, wrong: [21 / 63],
        explanation: `63 ÷ 21 = ${f2Ratio}, i.e. 3 : 1.`,
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Draw a genetic diagram to explain the result of the F1 × F1 matings.",
        points: ["Parents: Bb × Bb.", "Gametes: B and b from each parent.", "Offspring genotypes: 1 BB : 2 Bb : 1 bb.", "Phenotypes: 3 black : 1 red."],
        explanation: "Heterozygous × heterozygous gives 3:1.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why the breeder cannot be completely certain that Dumbu is BB.",
        points: ["A Bb bull would give a red calf with each red cow only half of the time (by chance).", "So even 18 black calves is a strong indication but not proof; more matings make it more certain."],
        explanation: "Probability, not certainty.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest why the breeder carried out these matings with red cows.",
        points: ["It is a test cross: red cows (bb) can only give b.", "So any red calf reveals that the bull carries b, letting the breeder choose a pure-breeding (BB) bull."],
        explanation: "Purpose of the test cross.",
      }),
    ],
    explanation: "Use phenotypes of offspring to deduce genotypes; F1 × F1 gives 3:1 and a test cross reveals carriers.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "In a plant, tall (T) is dominant to dwarf (t). A farmer crosses two tall plants and gets some dwarf offspring.",
    hints: ["What genotype is a dwarf plant?"],
    parts: [
      P.short({ label: "(a)", stem: "State the genotype of the dwarf offspring.", accepted: ["tt"], normalise: ["trim"], explanation: "Dwarf is recessive: tt." }),
      P.short({ label: "(b)", stem: "State the genotype of both tall parents.", accepted: ["Tt", "Tt and Tt", "Tt x Tt", "Tt × Tt", "both Tt"], normalise: ["trim", "collapse_whitespace"], explanation: "Each gave a t allele, so both are Tt." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how two tall parents can produce dwarf offspring.",
        points: ["Each parent carries a hidden recessive allele t (heterozygous).", "A dwarf offspring receives t from both parents (tt)."],
        explanation: "Recessive alleles can be hidden.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest how the farmer could obtain a true-breeding tall line.",
        points: ["Self-pollinate tall plants and keep seed only from those whose offspring are all tall.", "Repeat over several generations (or test-cross with tt plants) to keep only TT plants."],
        explanation: "Selection plus testing.",
      }),
    ],
    explanation: "Dwarf offspring from tall parents reveal heterozygous carriers.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A farmer selects his breeding cattle only by their appearance. Discuss the strengths and weaknesses of this method using your knowledge of genotype and phenotype.",
    hints: ["What can and cannot be seen?", "How does the environment affect appearance?"],
    points: [
      "Strength: appearance (phenotype) shows dominant characteristics and conformation, quickly and cheaply.",
      "Strength: removing animals with an unwanted recessive phenotype (e.g. horned) reduces that allele over time.",
      "Weakness: heterozygous carriers look like homozygous dominant animals, so recessive alleles stay hidden in the herd.",
      "Weakness: appearance is affected by the environment (feeding, disease), so a good-looking animal may have poor genes and vice versa.",
      "Improvement: use test crosses, performance and progeny records alongside appearance.",
      "Judgement: appearance is a useful first screen but not enough on its own.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Selecting by appearance is quick and cheap, and it does remove animals that show unwanted recessive features, such as horns, so that allele slowly becomes rarer. However, phenotype does not show genotype: a Pp bull looks exactly like a PP bull, so carriers of horns stay hidden and pass the allele on. Appearance is also affected by the environment: a well-fed animal with average genes may look better than a poorly fed animal with excellent genes. The farmer should add test crosses and records of growth, fertility and offspring. Appearance is a useful first step but not a reliable method on its own.",
    explanation: "Weigh phenotype selection against hidden genotypes and environment.",
  });

  b.card("DEFINITION", "Allele", "An alternative form of a gene at the same position on a chromosome pair.");
  b.card("DEFINITION", "Homozygous / heterozygous", "Homozygous: two identical alleles (TT or tt). Heterozygous: two different alleles (Tt).");
  b.card("DEFINITION", "Genotype / phenotype", "Genotype: alleles carried. Phenotype: observable features (genotype + environment).");
  b.card("DEFINITION", "Dominant / recessive", "Dominant shows with one copy (capital letter); recessive shows only when homozygous (small letter).");
  b.card("FACT", "Ratio from heterozygous × heterozygous", "3 dominant : 1 recessive (1 TT : 2 Tt : 1 tt).");
  b.card("FACT", "Ratio from heterozygous × homozygous recessive", "1 dominant : 1 recessive.");
  b.card("CONCEPT", "Test cross", "Cross a dominant-phenotype individual with a homozygous recessive; any recessive offspring show it is heterozygous.");
  b.card("CONCEPT", "Steps of a genetic diagram", "Key, parental phenotypes, genotypes, gametes, Punnett square, offspring genotypes, phenotypes, ratio.");
  b.card("FACT", "In cattle, which is dominant: polled or horned?", "Polled is dominant to horned.");
});
