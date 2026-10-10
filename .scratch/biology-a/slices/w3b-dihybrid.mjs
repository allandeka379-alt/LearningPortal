// W3b: dihybrid inheritance (both boards; Cambridge A Level only).
// Genotype strings differ only in letter case, so options are worded to stay distinct after case-folding.
import { concept, P, t, chk, table, expectedFromRatio } from "../lib.mjs";

concept("abio.inheritance.dihybrid", { file: "inheritance/dihybrid", keyPrefix: "inheritance.dihybrid" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What phenotype ratio is expected in the offspring of two double heterozygotes for two unlinked genes, each with complete dominance?",
    options: [
      ["9 : 3 : 3 : 1", "Correct."],
      ["1 : 1 : 1 : 1", "This is the dihybrid test cross ratio."],
      ["3 : 1", "This is a monohybrid ratio."],
      ["1 : 2 : 1", "This is a monohybrid ratio with codominance."],
    ],
    answer: "A",
    explanation: "Two double heterozygotes give **9 : 3 : 3 : 1**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many different types of gamete can a plant of genotype AaBb produce if the two genes are unlinked?",
    options: [
      ["4", "Correct: AB, Ab, aB, ab."],
      ["2", "Two types would come from a plant heterozygous for only one gene."],
      ["8", "Eight types need three heterozygous genes."],
      ["16", "16 is the number of squares in the Punnett square, not gamete types."],
    ],
    answer: "A",
    explanation: "One allele of each gene per gamete: AB, Ab, aB, ab, four types.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which gametes can be produced by an organism with genotype $AaBB$?",
    options: [
      ["AB and aB only", "Correct: the B gene is homozygous."],
      ["AB, Ab, aB and ab", "Only B alleles are present, so no b gametes."],
      ["Aa and BB", "Gametes carry one allele of each gene, not two of one gene."],
      ["A, a and B, each in a different gamete", "Each gamete must carry one allele of BOTH genes."],
    ],
    answer: "A",
    explanation: "Gene A gives A or a; gene B always B: AB and aB.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which process in meiosis explains why the alleles of unlinked genes are distributed to gametes in all combinations?",
    options: [
      ["Independent assortment of homologous pairs at metaphase I", "Correct."],
      ["Crossing over between sister chromatids in prophase II", "Crossing over is between non-sister chromatids, in prophase I."],
      ["Separation of sister chromatids at anaphase II", "This does not mix alleles of different genes."],
      ["Replication of DNA during interphase", "Replication copies alleles; it does not assort them."],
    ],
    answer: "A",
    explanation: "Each homologous pair orientates randomly at metaphase I, independently of the others.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A pea plant with round yellow seeds is test-crossed with a plant having wrinkled green seeds (homozygous recessive for both genes). The offspring are all round, half yellow and half green. What was the genotype of the round yellow parent?",
    options: [
      ["Homozygous for round, heterozygous for yellow", "Correct: all round, but yellow and green in a 1 : 1 ratio."],
      ["Heterozygous for both seed shape and seed colour", "This would give four classes, 1 : 1 : 1 : 1."],
      ["Homozygous dominant for both genes", "This would give only round yellow offspring."],
      ["Heterozygous for round, homozygous for yellow", "This would give all yellow, half round and half wrinkled."],
    ],
    answer: "A",
    explanation: "All round → no recessive shape allele; half green → heterozygous for colour.",
    hints: ["Look at each gene separately."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a cross $AaBb \\times aabb$ with unlinked genes, what fraction of the offspring show both recessive phenotypes?",
    options: [
      ["1/4", "Correct: 1/2 × 1/2."],
      ["1/16", "1/16 applies to AaBb × AaBb."],
      ["1/2", "This is the chance for one gene only."],
      ["3/16", "This is one of the 9 : 3 : 3 : 1 classes."],
    ],
    answer: "A",
    explanation: "$P(aa) = 1/2$ and $P(bb) = 1/2$; multiply: 1/4.",
    hints: ["Use the product rule."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two roan cattle, both heterozygous for the dominant hornless allele, are crossed ($C^R C^W Hh \\times C^R C^W Hh$). What fraction of the calves are expected to be roan and horned?",
    options: [
      ["2/16", "Correct: 1/2 roan × 1/4 horned = 1/8 = 2/16."],
      ["3/16", "3/16 is red hornless or white hornless."],
      ["6/16", "6/16 is roan hornless."],
      ["1/16", "1/16 is red horned or white horned."],
    ],
    answer: "A",
    explanation: "Roan 1/2 (codominance 1 : 2 : 1) × horned 1/4 = 1/8 = 2/16.",
    hints: ["Find each probability separately, then multiply."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the F2 of a dihybrid cross giving 9 : 3 : 3 : 1, what is the ratio for one of the genes considered on its own?",
    options: [
      ["3 : 1", "Correct: 12 : 4."],
      ["9 : 7", "This would suggest an interaction between genes."],
      ["1 : 1", "This is a test-cross ratio."],
      ["9 : 3", "Both classes for the other gene must be included."],
    ],
    answer: "A",
    explanation: "For one gene, (9 + 3) : (3 + 1) = 12 : 4 = 3 : 1.",
    hints: ["Add the classes that share a phenotype for that gene."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A gamete from a plant of genotype PpSs could contain the alleles P and p.",
    answer: false,
    explanation: "False. A gamete carries one allele of each gene, such as PS or pS, never both P and p.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A dihybrid test cross of a double heterozygote with a double homozygous recessive gives four phenotypes in a 1 : 1 : 1 : 1 ratio when the genes are unlinked.",
    answer: true,
    explanation: "True. The four gamete types of the heterozygote each show in the offspring.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each cross (unlinked genes, complete dominance) with its expected phenotype ratio.",
    pairs: [
      ["Double heterozygote × double heterozygote", "9 : 3 : 3 : 1"],
      ["Double heterozygote × double homozygous recessive", "1 : 1 : 1 : 1"],
      ["$AaBb \\times Aabb$", "3 : 3 : 1 : 1"],
      ["$AABB \\times aabb$", "All one phenotype"],
    ],
    explanation: "Use the product rule for each gene.",
    hints: ["Treat each gene as a monohybrid cross, then multiply."],
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Genes on different chromosomes are {{blank:a}} and assort independently. To find the probability of two phenotypes together, the separate probabilities are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["unlinked"], choices: ["unlinked", "linked", "sex-linked"] },
      { id: "b", accepted: ["multiplied"], choices: ["multiplied", "added", "subtracted"] },
    ],
    explanation: "Unlinked genes; product rule.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process in meiosis I that allows alleles of genes on different chromosomes to be inherited independently.",
    accepted: ["independent assortment", "random assortment", "independent assortment of chromosomes", "random orientation", "independent orientation"],
    wrong: ["crossing over"],
    explanation: "**Independent assortment** (random orientation of homologous pairs at metaphase I).",
  });

  // Numerical: expected number from 9:3:3:1
  const total = 640;
  const exp = expectedFromRatio(total, [9, 3, 3, 1]);
  chk(exp[3], 40);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `Two double heterozygous plants are crossed and ${total} offspring are counted. How many are expected to show both recessive phenotypes?`,
    value: exp[3], wrong: [exp[0], total / 4],
    explanation: `${total} ÷ 16 = **${exp[3]}**. (Both dominant would be ${exp[0]}.)`,
  });
  // Calculation: product rule
  const n = 480;
  const pr = (1 / 4) * (1 / 2) * (3 / 4);
  const val = n * pr;
  chk(val, 45);
  calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Three unlinked genes are followed in the cross $AaBbCc \\times AabbCc$, each with complete dominance. Of ${n} offspring, how many are expected to be recessive for gene A, recessive for gene B and dominant for gene C?`,
    value: val, wrong: [n / 64, n * (1 / 4) * (1 / 4) * (3 / 4)],
    explanation: t`1. Gene A: $Aa \times Aa$ → $P(aa) = \dfrac{1}{4}$.
2. Gene B: $Bb \times bb$ → $P(bb) = \dfrac{1}{2}$.
3. Gene C: $Cc \times Cc$ → $P(\text{dominant}) = \dfrac{3}{4}$.
4. Product: $\dfrac{1}{4} \times \dfrac{1}{2} \times \dfrac{3}{4} = \dfrac{3}{32}$.
5. Expected number $= ${n} \times \dfrac{3}{32} = ${val}$.
Using 1/4 for gene B (treating it as $Bb \times Bb$) gives 22.5, which is wrong.`,
    hints: ["Work out each gene separately.", "Multiply the three probabilities, then by the total."],
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 6,
    stem: "In guinea pigs, black coat (B) is dominant to white (b) and rough coat (R) is dominant to smooth (r); the genes are unlinked. Use a genetic diagram, described in words, to show the result of crossing a guinea pig heterozygous for both genes with a white smooth guinea pig.",
    points: [
      "Parent genotypes: $BbRr$ × $bbrr$",
      "Gametes of the heterozygote: BR, Br, bR, br",
      "Gametes of the white smooth parent: br only",
      "Offspring genotypes: $BbRr$, $Bbrr$, $bbRr$, $bbrr$",
      "Phenotypes: black rough, black smooth, white rough, white smooth",
      "Ratio 1 : 1 : 1 : 1",
    ],
    modelAnswer: "Parents: black rough $BbRr$ × white smooth $bbrr$. Gametes: BR, Br, bR, br from the first parent; br only from the second. Offspring: $BbRr$ black rough, $Bbrr$ black smooth, $bbRr$ white rough, $bbrr$ white smooth, in the ratio 1 : 1 : 1 : 1.",
    explanation: "A dihybrid test cross.",
    hints: ["The white smooth parent makes only one type of gamete."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a double heterozygote produces four types of gamete in equal numbers when the two genes are on different chromosomes.",
    points: [
      "Each gamete receives one chromosome of each homologous pair / one allele of each gene",
      "The two homologous pairs orientate independently / at random at metaphase I",
      "So each allele of one gene is equally likely to go with either allele of the other: AB, Ab, aB, ab",
    ],
    modelAnswer: "Each gamete receives one chromosome from each homologous pair, so one allele of each gene. At metaphase I the two pairs line up independently of each other, so each allele of gene A is equally likely to end up with either allele of gene B, giving AB, Ab, aB and ab in equal numbers.",
    explanation: "Independent assortment at metaphase I.",
    hints: ["Think about metaphase I."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A dihybrid test cross gave 41, 38, 9 and 12 offspring in the four phenotype classes, instead of about 25 in each. Suggest an explanation.",
    points: [
      "The two genes are linked / on the same chromosome",
      "Parental combinations of alleles stay together, so the two parental classes (41 and 38) are most common",
      "Crossing over produces the smaller recombinant classes (9 and 12)",
    ],
    modelAnswer: "The genes are probably linked on the same chromosome, so the parental combinations of alleles tend to be inherited together and the two parental classes (41 and 38) are much larger than expected. Crossing over between the loci in some cells produces the two small recombinant classes (9 and 12).",
    explanation: "Unequal classes from a test cross suggest linkage.",
    hints: ["Which assumption of the 1 : 1 : 1 : 1 ratio might be wrong?"],
  });

  // Practice structured: maize dihybrid with numbers
  const cls = ["Purple smooth", "Purple wrinkled", "Yellow smooth", "Yellow wrinkled"];
  const obs = [347, 121, 113, 43];
  const tot = obs.reduce((s, x) => s + x, 0);
  chk(tot, 624);
  const e = expectedFromRatio(tot, [9, 3, 3, 1]);
  chk(e[0], 351);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `In maize, purple grain (P) is dominant to yellow (p) and smooth grain (S) is dominant to wrinkled (s). Pure-breeding purple smooth plants were crossed with yellow wrinkled plants. The F1 plants were self-pollinated and the grains on the F2 cobs counted.\n\n${table(["Phenotype", "Number of grains"], cls.map((c, i) => [c, String(obs[i])]))}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "State the genotype and phenotype of the F1 plants, and the gametes they produce.",
        points: [
          "F1 genotype $PpSs$, phenotype purple smooth",
          "Gametes PS, Ps, pS, ps in equal numbers",
        ],
        modelAnswer: "The F1 are $PpSs$, purple smooth, producing gametes PS, Ps, pS and ps in equal proportions.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the expected number of purple smooth grains.",
        value: e[0], wrong: [tot / 4],
        explanation: `${tot} × 9/16 = ${e[0]}.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the expected number of yellow wrinkled grains.",
        value: e[3], wrong: [tot / 4],
        explanation: `${tot} × 1/16 = ${e[3]}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which null hypothesis would be tested with these data?",
        options: [
          ["There is no significant difference between observed and expected 9 : 3 : 3 : 1", "Correct."],
          ["The two genes are linked on the same chromosome in maize", "A null hypothesis states no difference from the expected ratio."],
          ["The observed numbers are significantly different from 9 : 3 : 3 : 1", "This is the alternative, not the null hypothesis."],
          ["Purple and smooth are dominant to yellow and wrinkled", "This is the basis of the prediction, not the null hypothesis."],
        ],
        answer: "A",
        explanation: "The null hypothesis: no significant difference between observed and expected results; any difference is due to chance.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest why the observed numbers differ slightly from the expected numbers.",
        points: [
          "Fertilisation / which gametes fuse is random",
          "Sample is limited / some grains fail to develop / counting errors",
        ],
        modelAnswer: "Which pollen nucleus fertilises which ovule is a matter of chance, so the numbers vary around the expected ratio; the sample is finite and a few grains may not have developed.",
      }),
    ],
    explanation: "A 9 : 3 : 3 : 1 cross set up for a chi-squared test.",
    hints: ["Total ÷ 16 gives one part."],
    calculator: true,
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A man of blood group A whose mother was group O, and who has normal pigmentation but whose father has albinism, has children with a woman of blood group B whose father was group O, and who has albinism. Albinism is caused by a recessive allele, a, of an autosomal gene unlinked to the ABO gene.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the man's genotype?",
        options: [
          ["$I^A I^O$ and heterozygous for albinism", "Correct: he received $I^O$ from his mother and the albinism allele from his father."],
          ["$I^A I^A$ and homozygous for normal pigmentation", "His mother was group O, so he must carry $I^O$."],
          ["$I^A I^O$ and homozygous for normal pigmentation", "His father has albinism, so he must carry the allele."],
          ["$I^A I^B$ and heterozygous for albinism", "He is group A, not AB."],
        ],
        answer: "A",
        explanation: "$I^A I^O\\,Aa$.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the percentage probability that their first child is blood group O and has albinism.",
        value: (1 / 4) * (1 / 2) * 100, unit: "%", wrong: [6.25, 25],
        explanation: "Man $I^A I^O\\,Aa$ × woman $I^B I^O\\,aa$. P(group O) = 1/4; P(albinism, Aa × aa) = 1/2. Product = 1/8 = 12.5%.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "List all the blood groups possible among their children and give the probability of each.",
        points: [
          "A, B, AB and O are all possible",
          "Each with a probability of 1/4",
        ],
        modelAnswer: "$I^A I^O \\times I^B I^O$ gives $I^A I^B$ (AB), $I^A I^O$ (A), $I^B I^O$ (B) and $I^O I^O$ (O), each with a probability of 1/4.",
      }),
    ],
    explanation: "Work out genotypes from the relatives, then use the product rule.",
    hints: ["A group O parent can only pass on $I^O$."],
    calculator: true,
  });

  b.card("DEFINITION", "Define **dihybrid cross**.", "A cross following the inheritance of two different genes at the same time.");
  b.card("DEFINITION", "Define **independent assortment**.", "Random, independent orientation of homologous pairs at metaphase I, so alleles of unlinked genes enter gametes in all combinations.");
  b.card("FACT", "Gametes from AaBb (unlinked)", "AB, Ab, aB, ab in equal numbers.");
  b.card("FACT", "AaBb × AaBb ratio", "9 : 3 : 3 : 1.");
  b.card("FACT", "Dihybrid test cross ratio (AaBb × aabb)", "1 : 1 : 1 : 1.");
  b.card("FORMULA", "Product rule", "P(A and B) = P(A) × P(B) for independent events (unlinked genes).");
  b.card("CONCEPT", "Why does 9 : 3 : 3 : 1 arise?", "(3 : 1) × (3 : 1): each gene gives 3 : 1 independently.");
  b.card("FACT", "Roan, polled cattle: $C^R C^W Hh$ × $C^R C^W Hh$", "3 : 1 : 6 : 2 : 3 : 1 (red polled, red horned, roan polled, roan horned, white polled, white horned).");
  b.card("CONCEPT", "What does a test cross with four unequal classes (two large, two small) suggest?", "The genes are linked; the small classes are recombinants from crossing over.");
});
