// W3b: sex determination and sex linkage (both boards; Cambridge A Level only).
import { concept, P, t, chk, table } from "../lib.mjs";

concept("abio.inheritance.sex-linkage", { file: "inheritance/sex-linkage", keyPrefix: "inheritance.sex-linkage" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pair of sex chromosomes does a human male have?",
    options: [
      ["XY", "Correct."],
      ["XX", "XX is female."],
      ["YY", "A YY combination does not occur, as every egg carries an X."],
      ["XO", "XO is not the normal male karyotype."],
    ],
    answer: "A",
    explanation: "Males are **XY**; females are XX.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can a man with haemophilia not pass the condition to his sons?",
    options: [
      ["His sons receive his Y chromosome, not his X", "Correct."],
      ["The haemophilia allele is recessive in males", "Males express any X-linked allele they carry."],
      ["His sons receive two X chromosomes from their mother", "Sons receive one X, from the mother."],
      ["The allele is lost from sperm during meiosis", "Half his sperm carry his X with the allele."],
    ],
    answer: "A",
    explanation: "A father gives his X to daughters and his Y to sons; F8 is on the X.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A carrier woman ($X^H X^h$) and an unaffected man ($X^H Y$) have a son. What is the probability that he has haemophilia?",
    options: [
      ["1/2", "Correct: half the male outcomes are $X^h Y$."],
      ["1/4", "1/4 is the probability for any child, not for a son."],
      ["0", "Sons receive their X from the carrier mother."],
      ["1", "Only half the mother's eggs carry $X^h$."],
    ],
    answer: "A",
    explanation: "Sons are $X^H Y$ or $X^h Y$ in equal proportions: probability 1/2.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which correctly shows the genotype of a colour-blind man?",
    options: [
      ["An X carrying b and a Y: $X^b Y$", "Correct."],
      ["An X and a Y each carrying b: $X^b Y^b$", "The Y chromosome carries no allele of this gene."],
      ["An X with the normal allele and a Y: $X^B Y$", "This is a man with normal colour vision."],
      ["Two X chromosomes carrying b: $X^b X^b$", "This is a colour-blind female."],
    ],
    answer: "A",
    explanation: "One X carrying $b$; nothing on the Y.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A colour-blind man ($X^b Y$) and a woman homozygous for normal vision ($X^B X^B$) have children. Which statement is correct?",
    options: [
      ["All daughters are carriers and all sons have normal vision", "Correct."],
      ["Half the sons are colour-blind and all daughters are normal", "Sons receive the mother's $X^B$."],
      ["All children have normal vision and none are carriers", "Daughters receive the father's $X^b$."],
      ["All daughters are colour-blind and all sons are carriers", "Daughters are heterozygous; males cannot be carriers."],
    ],
    answer: "A",
    explanation: "Daughters $X^B X^b$ (carriers); sons $X^B Y$ (normal).",
    hints: ["Which X does each child receive from the father?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are X-linked recessive conditions more common in males than in females?",
    options: [
      ["Males have one X, so a single recessive allele is expressed", "Correct."],
      ["The Y chromosome carries a dominant allele that causes them", "The Y has no allele of these genes."],
      ["Females inactivate the X chromosome that carries the allele", "Inactivation is random, not targeted."],
      ["Males inherit X-linked alleles from both of their parents", "Males inherit their X from the mother only."],
    ],
    answer: "A",
    explanation: "Males are hemizygous; females need two recessive alleles.",
    hints: ["How many X chromosomes does each sex have?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a pedigree, an affected woman and an unaffected man have an unaffected son. Which conclusion is correct?",
    options: [
      ["The condition is not X-linked recessive", "Correct: an $X^a X^a$ mother would give $X^a$ to every son."],
      ["The condition must be X-linked recessive", "An X-linked recessive condition in the mother would affect all her sons."],
      ["The condition must be X-linked dominant", "Other patterns, such as autosomal inheritance, also fit these data."],
      ["The mother must be homozygous for the allele", "Nothing here shows she is homozygous."],
    ],
    answer: "A",
    explanation: "If it were X-linked recessive, the affected mother would be $X^a X^a$ and every son would be $X^a Y$, affected. An unaffected son rules this out.",
    hints: ["What would an affected mother's sons inherit if the condition were X-linked recessive?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What is the probability that a couple's first child is a boy?",
    options: [
      ["1/2", "Correct: half the sperm carry Y."],
      ["1/4", "1/4 would be two events combined."],
      ["1/3", "There are two equally likely outcomes, not three."],
      ["It depends on the mother's genotype", "All eggs carry X; the sperm decides."],
    ],
    answer: "A",
    explanation: "Equal numbers of X and Y sperm: P(boy) = 1/2.",
    hints: ["Which parent determines sex?"],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A man can be a carrier of haemophilia.",
    answer: false,
    explanation: "False. A man has one X; if it carries $X^h$ he has haemophilia.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All the daughters of a man with haemophilia receive the haemophilia allele.",
    answer: true,
    explanation: "True. Every daughter receives her father's only X chromosome.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each genotype with its phenotype.",
    pairs: [
      ["$X^H X^h$", "Carrier female"],
      ["$X^h Y$", "Male with haemophilia"],
      ["$X^H Y$", "Unaffected male"],
      ["$X^h X^h$", "Female with haemophilia"],
    ],
    explanation: "Superscripts on X only; males show whatever allele they carry.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Genes on the X chromosome have no matching loci on the {{blank:a}} chromosome, so a male has {{blank:b}} allele of each. A heterozygous female for a recessive X-linked condition is called a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["Y"], choices: ["Y", "X", "autosomal"] },
      { id: "b", accepted: ["one"], choices: ["one", "two", "no"] },
      { id: "c", accepted: ["carrier"], choices: ["carrier", "mutant", "hybrid"] },
    ],
    explanation: "Y has no matching loci; males have one allele; heterozygous females are carriers.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a female who is heterozygous for a recessive X-linked allele and does not show the condition.",
    accepted: ["carrier", "a carrier", "carrier female"],
    wrong: ["heterozygote"],
    explanation: "A **carrier**.",
  });

  // Numerical: probability of an affected child of carrier x affected male
  const pDaughter = 0.5 * 100;
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A carrier woman ($X^B X^b$) has children with a colour-blind man ($X^b Y$). What is the percentage probability that a daughter of theirs is colour-blind?",
    value: pDaughter, unit: "%", wrong: [25, 0],
    explanation: "Daughters are $X^B X^b$ or $X^b X^b$ in equal numbers, so **50%**. Using all four outcomes gives 25%, which answers a different question.",
    hints: ["Consider only the daughters."],
  });
  const pTwoSons = 0.5 * 0.5 * 100;
  chk(pTwoSons, 25);
  calc({
    d: 4, skill: "APPLICATION",
    stem: "A carrier woman ($X^H X^h$) and an unaffected man plan two children. Calculate the percentage probability that both children are sons with haemophilia.",
    value: (1 / 4) * (1 / 4) * 100, dp: 2, unit: "%", wrong: [pTwoSons, 12.5],
    explanation: t`1. For one child, the outcomes are $X^H X^H$, $X^H X^h$, $X^H Y$, $X^h Y$: $P(\text{son with haemophilia}) = \dfrac{1}{4}$.
2. Two independent children: $\dfrac{1}{4} \times \dfrac{1}{4} = \dfrac{1}{16}$.
3. As a percentage: $6.25\%$. Using 1/2 (the probability for a son, ignoring the chance of a daughter) gives 25%, which is wrong.`,
    hints: ["The child must be a son AND affected.", "Multiply for two independent children."],
  });

  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 5,
    stem: "Use a genetic diagram to show how two parents with normal colour vision can have a colour-blind son. Use $X^B$ and $X^b$.",
    points: [
      "Parents: normal (carrier) female $X^B X^b$ × normal male $X^B Y$",
      "Gametes: $X^B$, $X^b$ and $X^B$, Y",
      "Offspring genotypes $X^B X^B$, $X^B X^b$, $X^B Y$, $X^b Y$",
      "Phenotypes: normal female, carrier female, normal male, colour-blind male",
      "The colour-blind son received $X^b$ from his mother and Y from his father",
    ],
    modelAnswer: "Parent phenotypes: normal female × normal male. Genotypes: $X^B X^b$ (carrier) × $X^B Y$. Gametes: $X^B$, $X^b$ (eggs); $X^B$, Y (sperm). Offspring: $X^B X^B$ normal female, $X^B X^b$ carrier female, $X^B Y$ normal male, $X^b Y$ colour-blind male. The colour-blind son received $X^b$ from his carrier mother and Y from his father.",
    explanation: "The mother must be a carrier.",
    hints: ["The mother must carry the allele."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a son can never inherit an X-linked condition from his father.",
    points: [
      "Father passes his Y chromosome to sons",
      "Sons receive their only X from the mother",
      "X-linked alleles are on the X, and the Y has no allele of the gene",
    ],
    modelAnswer: "A son is male because he received his father's Y chromosome. His only X comes from his mother. The gene is on the X chromosome and the Y carries no allele of it, so the father's allele cannot reach his son.",
    explanation: "Y to sons, X to daughters.",
    hints: ["Which sex chromosome does a son receive from his father?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "List four features of a pedigree that suggest a condition is X-linked recessive.",
    points: [
      "Many more affected males than females",
      "Affected males often have unaffected parents / mother is a carrier",
      "No male-to-male transmission",
      "All daughters of affected males are carriers / condition skips generations through carrier females",
    ],
    modelAnswer: "More affected males than females; affected males usually have unaffected parents, the allele coming from a carrier mother; no father-to-son transmission; and all daughters of affected men are carriers, so the condition skips generations through females.",
    explanation: "Four tell-tale features.",
    hints: ["Think about fathers and sons."],
  });

  // Practice structured: pedigree with haemophilia
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "A family pedigree for haemophilia is described. Generation I: I-1, an unaffected man, and I-2, an unaffected woman. Generation II: their children II-1 (son with haemophilia), II-2 (unaffected daughter) and II-3 (unaffected son). II-2 marries II-4, an unaffected man. Generation III: their children III-1 (unaffected daughter) and III-2 (son with haemophilia).",
    parts: [
      P.mcq({
        label: "(a)", stem: "Using $X^H$ and $X^h$, which is the genotype of I-2?",
        options: [
          ["Carrier, $X^H X^h$", "Correct: unaffected, but she has an affected son."],
          ["Two normal alleles, $X^H X^H$", "She could not then have a son with haemophilia."],
          ["Two haemophilia alleles, $X^h X^h$", "She would then have haemophilia herself."],
          ["A male genotype, $X^H Y$", "I-2 is a woman."],
        ],
        answer: "A",
        explanation: "I-2 is unaffected but has an affected son, so she is a carrier, $X^H X^h$.",
      }),
      P.mcq({
        label: "(b)", stem: "Which is the genotype of II-2?",
        options: [
          ["Carrier, $X^H X^h$", "Correct: she has an affected son, III-2."],
          ["Two normal alleles, $X^H X^H$", "Her son III-2 must have received $X^h$ from her."],
          ["Two haemophilia alleles, $X^h X^h$", "She is unaffected."],
          ["An affected male genotype, $X^h Y$", "II-2 is a woman."],
        ],
        answer: "A",
        explanation: "She has an affected son (III-2), so she is a carrier: $X^H X^h$.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Before II-2 had any children, what was the percentage probability that she was a carrier?",
        value: 50, unit: "%", wrong: [25, 67],
        explanation: "Her parents were $X^H Y$ × $X^H X^h$; daughters are $X^H X^H$ or $X^H X^h$ equally: 50%.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: "What is the percentage probability that III-1 is a carrier?",
        value: 50, unit: "%", wrong: [25, 100],
        explanation: "Mother $X^H X^h$ × father $X^H Y$: daughters are carriers with probability 1/2 (50%).",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why II-3 cannot pass haemophilia to any of his children.",
        points: [
          "II-3 is unaffected, so he is $X^H Y$ / has no $X^h$",
          "He passes $X^H$ to daughters and Y to sons, so none receive $X^h$ from him",
        ],
        modelAnswer: "II-3 is unaffected, so as a male he must be $X^H Y$ and carries no $X^h$. He gives $X^H$ to his daughters and Y to his sons, so none of his children can receive the allele from him.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Explain why haemophilia appears in generations II and III but none of the women shown is affected.",
        points: [
          "Women would need $X^h$ from both parents, and the fathers shown are all unaffected ($X^H Y$)",
          "The allele passes through carrier women, who have $X^H$ masking $X^h$",
        ],
        modelAnswer: "A woman is affected only if she inherits $X^h$ from both parents, but all the fathers shown are unaffected ($X^H Y$). The allele is therefore passed on through carrier women, in whom $X^H$ masks $X^h$.",
      }),
    ],
    explanation: "Carrier mothers pass the allele to half their sons and half their daughters.",
    hints: ["Start with the affected sons and work back to their mothers."],
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "In fruit flies (*Drosophila*), females are XX and males XY, as in humans. Red eye colour ($X^R$) is dominant to white eye ($X^r$), and the gene is on the X chromosome. A white-eyed female is crossed with a red-eyed male.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Use a genetic diagram, described in words, to show the expected F1.",
        points: [
          "Parents: $X^r X^r$ (white female) × $X^R Y$ (red male)",
          "Gametes: $X^r$ (eggs); $X^R$, Y (sperm)",
          "Offspring: $X^R X^r$ and $X^r Y$",
          "All females red-eyed (carriers); all males white-eyed",
        ],
        modelAnswer: "Parents: $X^r X^r$ × $X^R Y$. Gametes: all eggs $X^r$; sperm $X^R$ or Y. F1: $X^R X^r$ red-eyed females and $X^r Y$ white-eyed males, in a 1 : 1 ratio.",
      }),
      P.mcq({
        label: "(b)", stem: "The F1 flies are crossed with each other. What proportion of the F2 males would be white-eyed?",
        options: [
          ["1/2", "Correct: F1 females are $X^R X^r$, giving sons $X^R Y$ or $X^r Y$."],
          ["1/4", "1/4 is the proportion of all F2 flies that are white-eyed males."],
          ["All of them", "Only half the F1 mother's eggs carry $X^r$."],
          ["None of them", "Half the F1 mother's eggs carry $X^r$."],
        ],
        answer: "A",
        explanation: "F2 males get X from the $X^R X^r$ mother: half $X^R Y$, half $X^r Y$.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Explain how the result of the original cross shows that the gene is X-linked rather than autosomal.",
        points: ["Eye colour differs between the sexes / sons resemble the mother and daughters the father (criss-cross); an autosomal gene would give the same phenotypes in both sexes"],
        modelAnswer: "All the sons were white-eyed like their mother and all the daughters red-eyed like their father; with an autosomal gene both sexes would show the same phenotypes.",
      }),
    ],
    explanation: "X-linked crosses give different results in each sex.",
    hints: ["Which parent gives sons their X?"],
  });

  b.card("FACT", "Human sex chromosomes", "Female XX, male XY; the sperm (X or Y) decides the sex of a child.");
  b.card("DEFINITION", "Define **sex linkage**.", "Inheritance of a characteristic controlled by a gene on a sex chromosome (usually X), so the pattern differs between sexes.");
  b.card("DEFINITION", "Define **carrier** (X-linked).", "A heterozygous female ($X^H X^h$) who does not show a recessive condition but can pass on the allele.");
  b.card("CONCEPT", "Why are males more often affected by X-linked recessive conditions?", "They have one X (hemizygous); one recessive allele is expressed. Females need two.");
  b.card("CONCEPT", "Carrier female × unaffected male (haemophilia)", "Children: 1/4 affected; sons: 1/2 affected; daughters: 1/2 carriers.");
  b.card("FACT", "Can an affected father pass an X-linked condition to his son?", "No: sons receive his Y. All his daughters receive his X and are at least carriers.");
  b.card("CONCEPT", "Writing X-linked genotypes", "Superscript on X only: $X^H X^h$, $X^h Y$; never write an allele on the Y.");
  b.card("FACT", "Two X-linked recessive conditions to know", "Haemophilia (F8, factor VIII) and red-green colour blindness.");
  b.card("CONCEPT", "Pedigree signs of X-linked recessive inheritance", "More affected males; carrier mothers; no father-to-son transmission; skips generations.");
});
