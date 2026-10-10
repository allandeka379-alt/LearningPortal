// W3b: autosomal linkage and epistasis (Cambridge only, A Level).
import { concept, P, t, chk, table, expectedFromRatio, sfStr } from "../lib.mjs";

concept("abio.inheritance.linkage-epistasis", { file: "inheritance/linkage-epistasis", keyPrefix: "inheritance.linkage-epistasis" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by autosomal linkage?",
    options: [
      ["Two genes on the same autosome tend to be inherited together", "Correct."],
      ["A gene is carried on the X chromosome and not on the Y", "That is sex linkage."],
      ["Two alleles of one gene are both expressed in a heterozygote", "That is codominance."],
      ["One gene masks the expression of a different gene", "That is epistasis."],
    ],
    answer: "A",
    explanation: "Linked genes share an autosome, so they do not assort independently.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a test cross involving two linked genes, how are recombinant offspring produced?",
    options: [
      ["By crossing over between the two loci in prophase I", "Correct."],
      ["By independent assortment of the two chromosomes carrying them", "Linked genes are on one chromosome."],
      ["By mutation of one allele during DNA replication", "Mutation is far too rare to explain recombinant classes."],
      ["By non-disjunction of the homologous pair in anaphase I", "Non-disjunction changes chromosome number."],
    ],
    answer: "A",
    explanation: "A chiasma between the loci exchanges segments of non-sister chromatids, forming new allele combinations.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a test cross of a double heterozygote for two linked genes, which offspring classes are most numerous?",
    options: [
      ["The two parental classes", "Correct."],
      ["The two recombinant classes", "Recombinants need a crossover between the loci and are fewer."],
      ["All four classes are about equal", "Equal classes indicate unlinked genes."],
      ["Only the double recessive class", "Both parental classes are large."],
    ],
    answer: "A",
    explanation: "Parental combinations are inherited together unless a crossover occurs between the loci.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which term describes an interaction in which one gene masks the expression of another gene?",
    options: [
      ["Epistasis", "Correct."],
      ["Codominance", "Codominance involves alleles of one gene."],
      ["Linkage", "Linkage is about genes sharing a chromosome."],
      ["Recessiveness", "Recessiveness is between alleles of one gene."],
    ],
    answer: "A",
    explanation: "**Epistasis**: one gene affects the expression of another.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In Labradors, black (B) is dominant to brown (b), but dogs homozygous ee are yellow whatever their B alleles. What colour is a dog with genotype $Bbee$?",
    options: [
      ["Yellow", "Correct: ee prevents pigment deposition."],
      ["Black", "B is masked by ee."],
      ["Brown", "Brown needs bb with at least one E."],
      ["Black and yellow patches", "There is no patchiness; ee masks the B gene in all hairs."],
    ],
    answer: "A",
    explanation: "ee is epistatic to the B gene, so the dog is yellow.",
    hints: ["Which gene decides whether pigment reaches the hair?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A dihybrid cross between two double heterozygotes gives only three phenotype classes in a ratio close to 9 : 3 : 4. The best explanation is",
    options: [
      ["epistasis, with two of the four classes merging", "Correct."],
      ["linkage, with recombinants missing entirely", "Linkage gives a ratio near 3 : 1, not 9 : 3 : 4."],
      ["sex linkage of both genes on the X chromosome", "Sex linkage gives different results in each sex, not 9 : 3 : 4."],
      ["codominance at both loci in the parents", "Codominance would give MORE classes, not fewer."],
    ],
    answer: "A",
    explanation: "Ratios in sixteenths with merged classes indicate epistasis.",
    hints: ["Add up the parts: are they still sixteenths?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do genes that are close together on a chromosome produce fewer recombinants than genes far apart?",
    options: [
      ["A crossover is less likely to fall between them", "Correct."],
      ["Close genes cannot be separated at all by crossing over", "They can, but rarely."],
      ["Close genes are always on different chromatids", "Position on chromatids is not the reason."],
      ["Chiasmata form only near the centromere of a chromosome", "Chiasmata can form at many positions."],
    ],
    answer: "A",
    explanation: "The shorter the distance, the lower the chance a chiasma forms between the loci.",
    hints: ["Think about where chiasmata form."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a flower, enzyme 1 (gene A) converts a white precursor to a white intermediate, and enzyme 2 (gene B) converts the intermediate to red pigment. Recessive alleles code for inactive enzymes. What is the expected F2 ratio from $AaBb \\times AaBb$?",
    options: [
      ["9 red : 7 white", "Correct: red needs A_B_ (9/16); all others are white."],
      ["9 red : 3 pink : 4 white", "There is no pink phenotype in this pathway."],
      ["12 red : 3 pink : 1 white", "This would need a dominant epistatic allele."],
      ["15 red : 1 white", "Red needs both enzymes, not just one."],
    ],
    answer: "A",
    explanation: "Only A_B_ makes both enzymes: 9 red; A_bb, aaB_ and aabb are white: 7.",
    hints: ["Which genotypes have both working enzymes?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a test cross of linked genes, the recombinant classes are always the largest.",
    answer: false,
    explanation: "False. The parental classes are largest; recombinants need a crossover between the loci.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Epistasis is an interaction between two different genes, not between two alleles of the same gene.",
    answer: true,
    explanation: "True. Dominance is between alleles of one gene; epistasis is between genes.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each result with its most likely explanation.",
    pairs: [
      ["Test cross gives 1 : 1 : 1 : 1", "Unlinked genes"],
      ["Test cross gives two large and two small classes", "Linked genes with crossing over"],
      ["F2 gives 9 : 7", "Epistasis in a two-step pathway"],
      ["F2 gives close to 3 : 1 with two phenotypes", "Strongly linked genes"],
    ],
    explanation: "Match the pattern of classes to the mechanism.",
    hints: ["Count the classes and their sizes."],
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Offspring with new combinations of linked alleles are called {{blank:a}}. They arise when {{blank:b}} occurs between the two loci in prophase I of meiosis.",
    blanks: [
      { id: "a", accepted: ["recombinants"], choices: ["recombinants", "parentals", "mutants"] },
      { id: "b", accepted: ["crossing over"], choices: ["crossing over", "independent assortment", "non-disjunction"] },
    ],
    explanation: "Recombinants arise by crossing over.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the point at which non-sister chromatids exchange segments during crossing over.",
    accepted: ["chiasma", "chiasmata", "a chiasma"],
    wrong: ["centromere"],
    explanation: "A **chiasma** (plural chiasmata).",
  });

  // Calculation: recombinant percentage
  const tc = [["Purple, long", 284], ["Red, round", 271], ["Purple, round", 21], ["Red, long", 24]];
  const tot = tc.reduce((s, r) => s + r[1], 0);
  chk(tot, 600);
  const rf = ((tc[2][1] + tc[3][1]) / tot) * 100;
  chk(rf, 7.5);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `In sweet peas, genes for flower colour (purple dominant to red) and pollen shape (long dominant to round) are linked. A plant heterozygous for both genes, with purple and long alleles on one chromosome, was test-crossed with a red, round plant.\n\n${table(["Offspring", "Number"], tc.map((r) => [r[0], String(r[1])]))}\n\nCalculate the percentage of recombinant offspring. Give your answer to one decimal place.`,
    value: rf, dp: 1, unit: "%", wrong: [((tc[0][1] + tc[1][1]) / tot) * 100, 50],
    explanation: t`1. Recombinants have new combinations: purple round (${tc[2][1]}) and red long (${tc[3][1]}).
2. Total recombinants $= ${tc[2][1]} + ${tc[3][1]} = ${tc[2][1] + tc[3][1]}$; total offspring $= ${tot}$.
3. Percentage $= \dfrac{${tc[2][1] + tc[3][1]}}{${tot}} \times 100 = ${rf.toFixed(1)}\%$.
Using the parental classes gives 92.5%, which is wrong.`,
    hints: ["Which classes have combinations not found in either parent?"],
  });
  // Numerical: epistasis expected numbers
  const n = 128;
  const e = expectedFromRatio(n, [9, 3, 4]);
  chk(e[2], 32);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: `Two Labradors of genotype $BbEe$ have ${n} puppies over several litters (9 black : 3 brown : 4 yellow expected). How many yellow puppies are expected?`,
    value: e[2], wrong: [n / 4 * 3 / 4, n / 16],
    explanation: `Yellow = 4/16 of ${n} = **${e[2]}**.`,
    hints: ["Total parts = 16."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a test cross involving two linked genes does not give a 1 : 1 : 1 : 1 ratio.",
    points: [
      "The genes are on the same chromosome, so they do not assort independently",
      "The double heterozygote mostly makes gametes with the parental combinations",
      "Recombinant gametes are only formed when crossing over occurs between the loci",
      "So parental classes are large and recombinant classes small",
    ],
    modelAnswer: "Because the genes are on the same chromosome they are inherited together and do not assort independently. The heterozygote mostly makes gametes with the parental combinations of alleles. Recombinant gametes are formed only in cells where a crossover occurs between the two loci in prophase I, so the parental classes in the offspring are large and the recombinant classes small.",
    explanation: "Same chromosome → parental gametes common; crossing over → few recombinants.",
    hints: ["How many gamete types would there be with no crossing over?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why Labradors with genotype $bbee$ are yellow rather than brown.",
    points: [
      "Gene E is epistatic to gene B",
      "ee means pigment cannot be deposited in the hairs",
      "So the brown pigment coded by bb is not expressed / is masked",
    ],
    modelAnswer: "Gene E is epistatic to gene B. A dog that is ee cannot deposit pigment in its hairs, so although bb would give brown pigment, it is not expressed in the coat and the dog is yellow.",
    explanation: "ee masks the B gene.",
    hints: ["What does the E gene control?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Use a genetic diagram, described in words, to show the expected phenotypes from crossing a black Labrador $BbEe$ with a yellow Labrador $bbee$.",
    points: [
      "Gametes: BE, Be, bE, be (black dog) and be only (yellow dog)",
      "Offspring genotypes: $BbEe$, $Bbee$, $bbEe$, $bbee$",
      "Phenotypes: black, yellow, brown, yellow",
      "Ratio 1 black : 1 brown : 2 yellow",
    ],
    modelAnswer: "The black dog makes gametes BE, Be, bE and be; the yellow dog makes only be. Offspring: $BbEe$ black, $Bbee$ yellow, $bbEe$ brown and $bbee$ yellow, so 1 black : 1 brown : 2 yellow.",
    explanation: "A test cross with epistasis.",
    hints: ["The yellow dog makes only one type of gamete."],
  });

  // Practice structured: linkage
  const cls = [["Grey body, normal wings", 181], ["Black body, curved wings", 173], ["Grey body, curved wings", 22], ["Black body, normal wings", 24]];
  const total = cls.reduce((s, r) => s + r[1], 0);
  chk(total, 400);
  const rec = ((cls[2][1] + cls[3][1]) / total) * 100;
  chk(rec, 11.5);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `In a species of fruit fly, grey body (G) is dominant to black (g) and normal wings (N) are dominant to curved wings (n). Flies heterozygous for both genes, produced by crossing pure-breeding grey normal with black curved flies, were test-crossed with black curved flies.\n\n${table(["Offspring phenotype", "Number"], cls.map((r) => [r[0], String(r[1])]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "State the number of each class expected if the genes were unlinked.",
        value: total / 4, wrong: [total / 16],
        explanation: "1 : 1 : 1 : 1 of 400 = 100 each.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage of recombinant offspring. Give your answer to one decimal place.",
        value: rec, dp: 1, unit: "%", wrong: [((cls[0][1] + cls[1][1]) / total) * 100],
        explanation: t`Recombinants: grey curved + black normal $= 22 + 24 = 46$. $\dfrac{46}{400} \times 100 = ${rec.toFixed(1)}\%$.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain these results.",
        points: [
          "The genes are linked (on the same chromosome), so the parental combinations GN and gn are inherited together",
          "The two parental classes (181 and 173) are therefore much larger than 100",
          "Crossing over between the loci in some cells produced Gn and gN gametes, giving the small recombinant classes (22 and 24)",
        ],
        modelAnswer: "The two genes are on the same chromosome, so the F1 flies' alleles GN and gn tend to be inherited together and most gametes are parental, giving 181 grey normal and 173 black curved flies. Crossing over between the two loci in some cells produced Gn and gN gametes, giving the small recombinant classes of 22 and 24.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Another gene, for eye colour, is on the same chromosome. In a similar test cross with the body-colour gene, 38% of offspring were recombinant. What does this suggest about the positions of the genes? Explain.",
        points: [
          "The eye-colour gene is further from the body-colour gene than the wing gene is",
          "Crossovers are more likely to occur between loci that are further apart",
        ],
        modelAnswer: "The eye-colour gene is probably further from the body-colour gene than the wing gene is, because the further apart two loci are, the more likely a crossover is to occur between them, giving more recombinants.",
      }),
    ],
    explanation: "Two large parental classes and two small recombinant classes indicate linkage.",
    hints: ["Compare each class with 100."],
    calculator: true,
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "In a plant, flower colour depends on two genes. Gene D: dominant allele D codes for an enzyme converting a white precursor into a yellow pigment; d codes for an inactive enzyme. Gene I: the dominant allele I codes for an inhibitor that blocks enzyme D; ii plants make no inhibitor. Two plants of genotype $DdIi$ were crossed.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State the colour of plants with genotypes $DDii$ and $DDIi$, and explain.",
        points: [
          "$DDii$ is yellow: enzyme D works and there is no inhibitor",
          "$DDIi$ is white: the inhibitor from allele I blocks the enzyme",
        ],
        modelAnswer: "$DDii$ is yellow, because enzyme D is made and nothing blocks it. $DDIi$ is white, because the inhibitor coded by I blocks enzyme D, so no pigment is made.",
      }),
      P.mcq({
        label: "(b)", stem: "What is the expected F1 ratio of white to yellow from $DdIi \\times DdIi$?",
        options: [
          ["13 white : 3 yellow", "Correct: only D_ii (3/16) is yellow."],
          ["9 white : 7 yellow", "Yellow needs D AND no I: only 3/16."],
          ["12 white : 4 yellow", "Count again: ddii is also white."],
          ["3 white : 1 yellow", "This is a monohybrid ratio."],
        ],
        answer: "A",
        explanation: "Yellow requires D_ and ii: 3/16. Everything else (D_I_ 9, ddI_ 3, ddii 1) is white: 13/16.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Out of 208 offspring, how many are expected to be yellow?",
        value: 208 * 3 / 16, wrong: [208 / 4],
        explanation: "208 × 3/16 = 39.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Name the type of gene interaction shown by gene I.",
        accepted: ["epistasis", "dominant epistasis", "epistatic", "epistatic interaction"],
        wrong: ["codominance"],
        explanation: "Epistasis (a dominant epistatic allele).",
      }),
    ],
    explanation: "Work out the phenotype of each genotype class, then add the sixteenths.",
    hints: ["Yellow needs D and the absence of I."],
    calculator: true,
  });

  b.card("DEFINITION", "Define **autosomal linkage**.", "Genes on the same autosome tend to be inherited together and do not assort independently.");
  b.card("DEFINITION", "Define **recombinant**.", "An offspring or gamete with a new combination of linked alleles, produced by crossing over.");
  b.card("CONCEPT", "Test cross result for linked genes", "Two large parental classes and two small recombinant classes (not 1 : 1 : 1 : 1).");
  b.card("FORMULA", "Percentage of recombinants", "Recombinant offspring ÷ total offspring × 100.");
  b.card("CONCEPT", "Why are recombinants fewer than parentals?", "They need a crossover between the two loci, which happens only in some cells.");
  b.card("DEFINITION", "Define **epistasis**.", "Interaction in which alleles of one gene mask or modify the expression of another gene.");
  b.card("FACT", "Labrador coat colour (BbEe × BbEe)", "9 black : 3 brown : 4 yellow; ee masks the B gene.");
  b.card("CONCEPT", "Two-step pigment pathway with recessive non-functional alleles", "Coloured only if both enzymes work (A_B_): 9 coloured : 7 white.");
  b.card("CONCEPT", "Sign of epistasis in an F2", "Fewer than four classes, ratios still in sixteenths (e.g. 9 : 3 : 4, 9 : 7, 13 : 3).");
});
