// W3b: monohybrid inheritance (both boards; Cambridge A Level only).
import { concept, P, t, chk, table, expectedFromRatio } from "../lib.mjs";

concept("abio.inheritance.monohybrid", { file: "inheritance/monohybrid", keyPrefix: "inheritance.monohybrid" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a test cross?",
    options: [
      ["Crossing an individual of unknown genotype with a homozygous recessive", "Correct."],
      ["Crossing two heterozygous individuals to obtain an F2 generation", "That is an F1 × F1 cross."],
      ["Crossing two pure-breeding parents with contrasting phenotypes", "That produces the F1 generation."],
      ["Crossing an individual of unknown genotype with a homozygous dominant one", "A homozygous dominant parent would hide the unknown alleles."],
    ],
    answer: "A",
    explanation: "A test cross uses a **homozygous recessive** partner, whose gametes all carry the recessive allele.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Two roan cattle ($C^R C^W$) are crossed. What proportion of the offspring is expected to be roan?",
    options: [
      ["1/2", "Correct: 1 red : 2 roan : 1 white."],
      ["1/4", "1/4 is the proportion of red, or of white."],
      ["3/4", "3/4 would apply with complete dominance."],
      ["All of them", "Only a red × white cross gives all roan."],
    ],
    answer: "A",
    explanation: "$C^R C^W \\times C^R C^W$ gives 1 $C^R C^R$ : 2 $C^R C^W$ : 1 $C^W C^W$, so half are roan.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A man of blood group AB and a woman of blood group O have children. Which blood groups are possible among the children?",
    options: [
      ["A and B only", "Correct: $I^A I^O$ or $I^B I^O$."],
      ["AB and O only", "Each child gets $I^O$ from the mother and either $I^A$ or $I^B$ from the father."],
      ["A, B, AB and O", "AB and O are impossible here."],
      ["A, B and O only", "No child can be $I^O I^O$, as the father has no $I^O$."],
    ],
    answer: "A",
    explanation: "Father's gametes $I^A$ or $I^B$; mother's all $I^O$: children $I^A I^O$ (A) or $I^B I^O$ (B).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which term describes an organism with two different alleles of a gene?",
    options: [
      ["Heterozygous", "Correct."],
      ["Homozygous", "Homozygous means two identical alleles."],
      ["Codominant", "Codominant describes alleles, not the organism's genotype."],
      ["Haploid", "Haploid cells have only one set of chromosomes."],
    ],
    answer: "A",
    explanation: "Two different alleles: **heterozygous**.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a test cross, a tall pea plant crossed with a dwarf plant gives 46 tall and 41 dwarf offspring. What was the genotype of the tall parent?",
    options: [
      ["Heterozygous, with one of each allele", "Correct: a ratio close to 1 : 1."],
      ["Homozygous dominant, TT", "TT would give only tall offspring."],
      ["Homozygous recessive, tt", "A tt plant would be dwarf, not tall."],
      ["Either genotype, so it cannot be decided from these data", "The dwarf offspring prove it carries t."],
    ],
    answer: "A",
    explanation: "Dwarf offspring (tt) need a t from each parent, so the tall parent is **Tt**; the ratio is close to 1 : 1.",
    hints: ["Where did the dwarf offspring get their alleles from?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two unaffected parents have a child with albinism (a recessive condition). What is the probability that their next child will be unaffected?",
    options: [
      ["3/4", "Correct: both parents must be Aa."],
      ["1/4", "This is the probability of an affected child."],
      ["1/2", "This would apply to Aa × aa."],
      ["2/3", "This is the chance that an unaffected child is a carrier."],
    ],
    answer: "A",
    explanation: "Both parents are Aa; Aa × Aa gives 3/4 unaffected. Each child is independent of the last.",
    hints: ["Work out the parents' genotypes first."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two heterozygous tall pea plants (Tt) are crossed. One of the tall offspring is chosen at random. What is the probability that it is heterozygous?",
    options: [
      ["2/3", "Correct: of 3 tall plants, 2 are Tt."],
      ["1/2", "1/2 of ALL offspring are Tt, but the dwarf ones are excluded here."],
      ["1/4", "1/4 is the proportion of TT among all offspring."],
      ["3/4", "3/4 is the proportion of all offspring that are tall."],
    ],
    answer: "A",
    explanation: "Tall offspring are 1 TT : 2 Tt, so P(Tt | tall) = 2/3.",
    hints: ["Leave out the dwarf plants, which are already excluded."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the genotype ratio the same as the phenotype ratio in the F2 of a cross involving codominant alleles?",
    options: [
      ["Each genotype produces a different phenotype", "Correct: the heterozygote has its own phenotype."],
      ["Codominant alleles are always found on sex chromosomes", "Codominant alleles can be on any chromosome."],
      ["No heterozygotes are produced in the F2 generation", "Half the F2 are heterozygous."],
      ["Codominant alleles do not separate when gametes form", "Alleles separate in meiosis as usual."],
    ],
    answer: "A",
    explanation: "Because both alleles are expressed, the heterozygote is distinguishable: 1 : 2 : 1 genotypes and phenotypes.",
    hints: ["Can you tell a heterozygote from a homozygote by its phenotype?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A gamete from a heterozygous parent (Tt) carries both alleles, T and t.",
    answer: false,
    explanation: "False. Gametes are haploid; each carries one allele, T or t.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If two carriers of a recessive condition already have one affected child, the probability that their next child is affected is still 1/4.",
    answer: true,
    explanation: "True. Each fertilisation is an independent event.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ABO genotype with the blood group it gives.",
    pairs: [
      ["$I^A I^O$", "Group A"],
      ["$I^B I^B$", "Group B"],
      ["$I^A I^B$", "Group AB"],
      ["$I^O I^O$", "Group O"],
    ],
    explanation: "$I^A$ and $I^B$ are codominant, both dominant to $I^O$.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "The ABO gene is an example of {{blank:a}} alleles. Alleles $I^A$ and $I^B$ are {{blank:b}}, and both are {{blank:c}} to $I^O$.",
    blanks: [
      { id: "a", accepted: ["multiple"], choices: ["multiple", "linked", "sex-linked"] },
      { id: "b", accepted: ["codominant"], choices: ["codominant", "recessive", "epistatic"] },
      { id: "c", accepted: ["dominant"], choices: ["dominant", "recessive", "codominant"] },
    ],
    explanation: "Multiple alleles; $I^A$, $I^B$ codominant; both dominant to $I^O$.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a relationship between two alleles in which both are expressed in the phenotype of a heterozygote.",
    accepted: ["codominance", "co-dominance", "codominant", "co-dominant"],
    wrong: ["incomplete dominance"],
    explanation: "**Codominance**.",
  });

  // Numerical: expected numbers
  const total = 312;
  const [expTall, expDwarf] = expectedFromRatio(total, [3, 1]);
  chk(expDwarf, 78);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `Two Tt pea plants are crossed and ${total} offspring are grown. How many dwarf plants are expected?`,
    value: expDwarf, wrong: [expTall, total / 2],
    explanation: `Expected ratio 3 tall : 1 dwarf, so dwarf = ${total} ÷ 4 = **${expDwarf}**.`,
  });
  // Calculation: probability of two independent events
  const p = (1 / 4) * (1 / 4) * 100;
  chk(p, 6.25);
  calc({
    d: 3, skill: "APPLICATION",
    stem: "A couple are both $I^B I^O$. Calculate the percentage probability that their first two children both have blood group O. Give your answer to two decimal places.",
    value: p, dp: 2, unit: "%", wrong: [25, 50],
    explanation: t`1. Each child: $P(I^O I^O) = \dfrac{1}{4}$.
2. The children are independent, so multiply: $\dfrac{1}{4} \times \dfrac{1}{4} = \dfrac{1}{16} = 0.0625$.
3. As a percentage: $6.25\%$. Adding the probabilities (50%) is wrong; so is giving the chance for one child only (25%).`,
    hints: ["Find the probability for one child.", "Multiply for independent events."],
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 5,
    stem: "In snapdragons, flower colour is controlled by two codominant alleles: $C^R$ (red) and $C^W$ (white); heterozygotes are pink. Use a genetic diagram to show the result of crossing two pink plants.",
    points: [
      "Parent phenotypes pink × pink and genotypes $C^R C^W$ × $C^R C^W$",
      "Gametes $C^R$ and $C^W$ from each parent",
      "Punnett square / offspring genotypes $C^R C^R$, $C^R C^W$, $C^R C^W$, $C^W C^W$",
      "Phenotypes linked to genotypes: red, pink, pink, white",
      "Ratio 1 red : 2 pink : 1 white",
    ],
    modelAnswer: "Parent phenotypes: pink × pink. Parent genotypes: $C^R C^W$ × $C^R C^W$. Gametes: $C^R$, $C^W$ from each. Punnett square gives $C^R C^R$ (red), $C^R C^W$ (pink), $C^R C^W$ (pink) and $C^W C^W$ (white). Ratio 1 red : 2 pink : 1 white.",
    explanation: "Full genetic diagram with a 1 : 2 : 1 ratio.",
    hints: ["Set out every line of the diagram."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a test cross can show whether a black guinea pig is homozygous (BB) or heterozygous (Bb), where black is dominant to white.",
    points: [
      "Cross the black guinea pig with a white (homozygous recessive, bb) one",
      "bb parent gives only b gametes, so the offspring phenotype shows the allele from the black parent",
      "All black offspring: BB (probably); any white offspring / about 1 : 1: Bb",
    ],
    modelAnswer: "Cross the black guinea pig with a white one, which must be bb. All its gametes carry b, so each offspring's colour shows which allele it received from the black parent. If all offspring are black (in a large litter) the black parent is probably BB; if any are white, with about half black and half white, it is Bb.",
    explanation: "Homozygous recessive partner reveals the alleles.",
    hints: ["Which gametes does the white parent make?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "In a family, two parents with Huntington's disease have a daughter who does not have the disease. Explain what this shows about the allele, and give the genotypes of all three people.",
    points: [
      "Unaffected child from two affected parents, so the allele must be dominant",
      "Both parents are heterozygous, Hh",
      "Each passed on h",
      "Daughter is hh",
    ],
    modelAnswer: "If the disease allele were recessive, both affected parents would be homozygous recessive and could only have affected children. An unaffected child from two affected parents shows the disease allele is dominant (H). Both parents must be heterozygous, Hh, and each passed on h, so the daughter is hh.",
    explanation: "Unaffected child of two affected parents → dominant allele.",
    hints: ["What would happen if the allele were recessive?"],
  });

  // Practice structured: pedigree + cross
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A pedigree for a condition caused by one gene is described below. Generation I: man I-1 (unaffected) and woman I-2 (unaffected). Generation II: their children II-1 (unaffected son), II-2 (affected daughter) and II-3 (unaffected son). II-3 marries II-4, an affected woman from another family. Generation III: their children III-1 (unaffected daughter) and III-2 (affected son).",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement about the allele causing the condition is correct?",
        options: [
          ["It is recessive, because II-2 is affected but neither parent is", "Correct."],
          ["It is dominant, because III-2 is affected like his mother", "An affected child of unaffected parents (II-2) rules out a dominant allele."],
          ["It is codominant, because affected and unaffected people occur", "Codominance is not shown by this pedigree."],
          ["It cannot be decided from this pedigree", "The parents I-1, I-2 and child II-2 decide it."],
        ],
        answer: "A",
        explanation: "Two unaffected parents with an affected child: recessive.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Using D and d, give the genotype of I-2.",
        accepted: [{ value: "Dd", caseSensitive: true }, { value: "dD", caseSensitive: true }],
        wrong: ["DD"],
        explanation: "I-2 must carry d to have an affected daughter, but is unaffected: Dd.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Give the genotype of II-3.",
        accepted: [{ value: "Dd", caseSensitive: true }, { value: "dD", caseSensitive: true }],
        wrong: ["DD"],
        explanation: "II-3 has an affected son (dd), so must carry d: Dd.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the probability, as a percentage, that the next child of II-3 and II-4 will be affected.",
        value: 50, unit: "%", wrong: [25],
        explanation: "Dd × dd gives 1 Dd : 1 dd, so 50%.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Before II-3 had children, what was the probability that he was a carrier? Explain.",
        points: [
          "2/3 (about 67%)",
          "Parents Dd × Dd give 1 DD : 2 Dd : 1 dd; he is unaffected so dd is excluded, leaving 2 of 3",
        ],
        modelAnswer: "2/3. His parents were both Dd, giving 1 DD : 2 Dd : 1 dd. As he is unaffected he cannot be dd, so 2 of the 3 remaining outcomes are Dd.",
      }),
    ],
    explanation: "Pedigree logic: affected child of unaffected parents shows a recessive allele.",
    hints: ["Start with I-1, I-2 and II-2."],
  });

  const obs = [["Red", 58], ["Roan", 121], ["White", 61]];
  const tot = obs.reduce((s, r) => s + r[1], 0);
  chk(tot, 240);
  const exp = expectedFromRatio(tot, [1, 2, 1]);
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `A farmer near Chinhoyi crossed roan bulls with roan cows over several years. The calves were recorded.\n\n${table(["Coat colour", "Number of calves"], obs.map((r) => [r[0], String(r[1])]))}`,
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Using the symbols $C^R$ and $C^W$, draw a genetic diagram (described in words) to explain these results.",
        points: [
          "Parents roan × roan, genotypes $C^R C^W$ × $C^R C^W$",
          "Gametes $C^R$ and $C^W$ from each parent",
          "Offspring $C^R C^R$ red, $C^R C^W$ roan, $C^W C^W$ white",
          "Expected ratio 1 red : 2 roan : 1 white",
        ],
        modelAnswer: "Parents: roan × roan, $C^R C^W$ × $C^R C^W$. Gametes: $C^R$, $C^W$ from each. Offspring: 1 $C^R C^R$ (red) : 2 $C^R C^W$ (roan) : 1 $C^W C^W$ (white).",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the expected number of roan calves.",
        value: exp[1], wrong: [exp[0]],
        explanation: `240 × 2/4 = ${exp[1]}.`,
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Explain why the observed numbers are not exactly the same as the expected numbers.",
        points: ["Fertilisation is random / which gametes fuse is a matter of chance"],
        modelAnswer: "Which gametes fuse at fertilisation is random, so observed numbers vary by chance around the expected ratio.",
      }),
    ],
    explanation: "Roan × roan: 1 : 2 : 1.",
    hints: ["Roan is the heterozygote."],
  });

  b.card("DEFINITION", "Define **codominance**.", "Both alleles of a gene are expressed in the phenotype of a heterozygote (e.g. roan cattle, $C^R C^W$).");
  b.card("DEFINITION", "Define **test cross**.", "Crossing an individual showing the dominant phenotype with a homozygous recessive to reveal its genotype.");
  b.card("CONCEPT", "Order of a genetic diagram", "Symbols; parent phenotypes; parent genotypes; gametes; Punnett square; offspring genotypes and phenotypes; ratio.");
  b.card("FACT", "F2 ratio, monohybrid, complete dominance", "3 dominant : 1 recessive (genotypes 1 : 2 : 1).");
  b.card("FACT", "F2 ratio with codominance", "1 : 2 : 1 for both genotypes and phenotypes.");
  b.card("FACT", "ABO alleles", "$I^A$ and $I^B$ codominant; both dominant to $I^O$. Group O = $I^O I^O$; AB = $I^A I^B$.");
  b.card("CONCEPT", "Test cross results", "All dominant phenotype → homozygous dominant; 1 : 1 → heterozygous.");
  b.card("CONCEPT", "Probability that a dominant-phenotype offspring of Aa × Aa is a carrier", "2/3 (the aa outcome is excluded).");
  b.card("DEFINITION", "Define **multiple alleles**.", "Three or more alleles of one gene in a population; each individual has only two.");
});
