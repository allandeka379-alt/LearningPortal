// W3b: the gene concept, genes, proteins and phenotype (both boards; Cambridge A Level only).
import { concept, P, t, chk, table } from "../lib.mjs";

concept("abio.inheritance.genes-phenotype", { file: "inheritance/genes-phenotype", keyPrefix: "inheritance.genes-phenotype" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a locus?",
    options: [
      ["The position of a gene on a chromosome", "Correct."],
      ["An alternative form of a gene", "That is an allele."],
      ["The set of alleles an organism carries", "That is the genotype."],
      ["A pair of matching chromosomes in a diploid cell", "That is a homologous pair."],
    ],
    answer: "A",
    explanation: "A **locus** is the position of a gene on a chromosome.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which enzyme is non-functional in the commonest form of albinism?",
    options: [
      ["Tyrosinase", "Correct: it catalyses melanin synthesis."],
      ["Amylase", "Amylase digests starch."],
      ["Factor VIII", "Factor VIII is a clotting protein; its loss causes haemophilia."],
      ["Huntingtin", "Huntingtin is the protein altered in Huntington's disease."],
    ],
    answer: "A",
    explanation: "The TYR gene codes for **tyrosinase**, which converts tyrosine towards melanin.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In sickle cell haemoglobin, which amino acid substitution occurs in the β-globin chain?",
    options: [
      ["Glutamic acid is replaced by valine", "Correct: at position 6."],
      ["Valine is replaced by glutamic acid", "The direction is reversed."],
      ["Tyrosine is replaced by phenylalanine", "This substitution is not involved."],
      ["Glutamine is added in a long repeated run", "Long glutamine runs occur in huntingtin, not globin."],
    ],
    answer: "A",
    explanation: "A base substitution changes glutamic acid (hydrophilic) to valine (hydrophobic) at position 6.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement correctly describes the difference between a gene and an allele?",
    options: [
      ["A gene is a DNA sequence at a locus; alleles are its alternative forms", "Correct."],
      ["An allele is a DNA sequence at a locus; genes are its alternative forms", "Reversed."],
      ["A gene codes for a protein; an allele codes for a carbohydrate", "Alleles are versions of a gene and code for versions of the same polypeptide."],
      ["Genes are found in the nucleus; alleles are found in the cytoplasm", "Both are on chromosomes in the nucleus."],
    ],
    answer: "A",
    explanation: "Alleles are alternative versions of one gene, at the same locus, differing in base sequence.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is the allele causing Huntington's disease dominant?",
    options: [
      ["Its protein misfolds and damages neurones even with a normal allele present", "Correct: a harmful new property."],
      ["It codes for no protein at all, so one copy is enough", "Loss of function usually makes an allele recessive."],
      ["It is carried on the X chromosome, so it is always expressed in every person", "HTT is on an autosome (chromosome 4)."],
      ["It produces twice as much huntingtin as the normal allele", "The problem is the abnormal protein, not the amount."],
    ],
    answer: "A",
    explanation: "The expanded CAG repeat gives huntingtin with a long glutamine run that misfolds and clumps; this harms cells whatever the other allele is.",
    hints: ["Does the mutant protein lose a function or gain a harmful one?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Dwarf pea plants (le le) are sprayed with active gibberellin and grow tall. What does this show?",
    options: [
      ["The le allele codes for a less active enzyme in gibberellin synthesis", "Correct: supplying the product restores the phenotype."],
      ["Gibberellin changes the genotype of the treated plants from le le to Le le", "Spraying does not change DNA."],
      ["The Le allele codes for gibberellin itself, which is a protein", "Gibberellin is not a protein; Le codes for an enzyme."],
      ["Dwarf plants lack gibberellin receptors in their stem cells", "If so, sprayed gibberellin would have no effect."],
    ],
    answer: "A",
    explanation: "Adding the product of the missing step bypasses the faulty enzyme, so the genotype is unchanged but the phenotype becomes tall.",
    hints: ["What does the Le enzyme make?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a person with haemophilia A bleed for longer than usual after a cut?",
    options: [
      ["They lack functional factor VIII, needed in the clotting cascade", "Correct."],
      ["Their platelets cannot be made in the bone marrow", "Platelet production is normal in haemophilia."],
      ["Their red blood cells are sickle-shaped and block capillaries", "That is sickle cell anaemia."],
      ["They make too much fibrinogen, which slows down the clotting", "Fibrinogen is needed for clotting; this is not the cause."],
    ],
    answer: "A",
    explanation: "The F8 gene codes for factor VIII; a non-functional protein slows the clotting cascade.",
    hints: ["Which protein does the F8 gene code for?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A base substitution in a gene changes the codon GCU to GCC. Both code for alanine. What is the most likely effect on the phenotype?",
    options: [
      ["No effect, because the amino acid sequence is unchanged", "Correct: the code is degenerate."],
      ["A non-functional protein, because one base has changed", "The amino acid is still alanine."],
      ["A shorter polypeptide, because a stop codon is formed", "GCC is not a stop codon."],
      ["A frameshift altering every amino acid after the change", "Substitutions do not shift the reading frame."],
    ],
    answer: "A",
    explanation: "A silent mutation: the same amino acid, so the same protein and phenotype.",
    hints: ["Check what both codons code for."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Homologous chromosomes carry the same genes at the same loci, but may carry different alleles.",
    answer: true,
    explanation: "True. That is why a diploid organism can be heterozygous.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A person heterozygous for a recessive albinism allele is unable to make melanin.",
    answer: false,
    explanation: "False. The normal allele codes for enough functional tyrosinase, so pigmentation is normal.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each gene with the protein it codes for.",
    pairs: [
      ["TYR", "Tyrosinase"],
      ["HBB", "β-globin"],
      ["F8", "Factor VIII"],
      ["HTT", "Huntingtin"],
    ],
    explanation: "TYR-tyrosinase, HBB-β-globin, F8-factor VIII, HTT-huntingtin.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "The observable characteristics of an organism are its {{blank:a}}. They result from the interaction of its {{blank:b}} with the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["phenotype"], choices: ["phenotype", "genotype", "karyotype"] },
      { id: "b", accepted: ["genotype"], choices: ["genotype", "phenotype", "karyotype"] },
      { id: "c", accepted: ["environment"], choices: ["environment", "nucleus", "ribosome"] },
    ],
    explanation: "Phenotype = genotype + environment.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the pigment that is not made by people with albinism.",
    accepted: ["melanin", "melanins"],
    wrong: ["haemoglobin"],
    explanation: "**Melanin**.",
  });

  // Numerical: nucleotides for a polypeptide
  const aa = 212;
  const bases = aa * 3;
  chk(bases, 636);
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A polypeptide contains ${aa} amino acids. What is the minimum number of mRNA nucleotides needed to code for these amino acids (not counting the stop codon)?`,
    value: bases, wrong: [aa, aa * 2],
    explanation: `Each amino acid is coded by a triplet: ${aa} × 3 = **${bases}** nucleotides.`,
  });
  // Calculation: CAG repeats
  const normalRep = 22, hdRep = 47;
  const extraNt = (hdRep - normalRep) * 3;
  chk(extraNt, 75);
  calc({
    d: 3, skill: "APPLICATION",
    stem: `A normal HTT allele has ${normalRep} CAG repeats. An allele causing Huntington's disease has ${hdRep} CAG repeats. How many extra nucleotides are present in the coding strand of the disease allele in this region?`,
    value: extraNt, wrong: [hdRep - normalRep, hdRep * 3],
    explanation: t`1. Extra repeats $= ${hdRep} - ${normalRep} = ${hdRep - normalRep}$.
2. Each repeat is a triplet (CAG), so extra nucleotides $= ${hdRep - normalRep} \times 3 = ${extraNt}$.
3. The huntingtin protein has ${hdRep - normalRep} extra glutamine residues. Giving ${hdRep - normalRep} counts repeats, not nucleotides.`,
    hints: ["Each repeat has three bases."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how a single base substitution in the HBB gene leads to the symptoms of sickle cell anaemia.",
    points: [
      "Substitution changes one triplet / codon (GAG to GUG in mRNA) for amino acid 6",
      "Glutamic acid (polar / charged) is replaced by valine (non-polar / hydrophobic)",
      "In low oxygen, haemoglobin S molecules stick together / polymerise into long fibres",
      "Red blood cells become sickle-shaped and inflexible",
      "Block capillaries (pain, organ damage) / are destroyed quickly causing anaemia",
    ],
    modelAnswer: "The substitution changes the codon for amino acid 6 of β-globin from GAG to GUG, so glutamic acid, which is charged, is replaced by valine, which is hydrophobic. When oxygen concentration is low, the hydrophobic patches make haemoglobin S molecules stick together into long fibres. These distort red blood cells into a rigid sickle shape. Sickled cells block capillaries, causing pain and organ damage, and are destroyed quickly, causing anaemia.",
    explanation: "Base → codon → amino acid → protein behaviour → cell shape → symptoms.",
    hints: ["Follow the chain from DNA to symptom."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why pea plants with genotype le le are dwarf.",
    points: [
      "le has a base substitution changing one amino acid (alanine to threonine) near the active site of the enzyme",
      "The enzyme is much less active, so little active gibberellin (GA₁) is made",
      "Less gibberellin, so less stem cell elongation / division: short internodes",
    ],
    modelAnswer: "The le allele has a base substitution that changes one amino acid near the enzyme's active site, so the enzyme that makes active gibberellin is much less active. The plant makes little active gibberellin, so cells in the stem elongate and divide less and the internodes are short.",
    explanation: "Allele → enzyme → gibberellin → growth.",
    hints: ["What does the Le enzyme make?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Suggest why most alleles that cause a loss of enzyme function are recessive.",
    points: [
      "In a heterozygote the normal allele is still transcribed and translated",
      "Producing functional enzyme",
      "Half the usual amount of enzyme is usually enough to catalyse the reaction / produce a normal phenotype",
    ],
    modelAnswer: "In a heterozygote the normal allele is still expressed and makes functional enzyme. Because enzymes are catalysts and are reused, about half the usual amount is normally enough to keep the pathway working, so the phenotype is normal and the loss-of-function allele is recessive.",
    explanation: "One working copy is usually enough.",
    hints: ["What does the other allele do in a heterozygote?"],
  });

  // Practice structured: tyrosinase activity
  const genos = ["TT", "Tt", "tt"];
  const act = [100, 54, 2];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `In this question T is a normal allele of the TYR gene and t an allele causing albinism. Tyrosinase activity was measured in pigment cells grown from people of three genotypes, as a percentage of the mean for TT.\n\n${table(["Genotype", "Tyrosinase activity / %", "Pigmentation"], genos.map((g, i) => [g, String(act[i]), i < 2 ? "Normal" : "None"]))}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why the activity in Tt cells is about half that of TT cells.",
        points: [
          "Only one allele (T) codes for functional tyrosinase",
          "So about half the amount of active enzyme is made",
        ],
        modelAnswer: "In Tt cells only the T allele codes for functional tyrosinase, so about half as much active enzyme is made as in TT cells, which have two working alleles.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Use the data to explain why t is described as recessive.",
        points: [
          "Tt has normal pigmentation despite about half (54%) the activity",
          "Albinism only appears in tt (2%), when no functional enzyme is made",
        ],
        modelAnswer: "Tt cells have only 54% of the activity but still produce normal pigmentation, so one T allele is enough. Albinism appears only in tt, whose cells have 2% activity, so t affects the phenotype only when homozygous.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest how a change in the base sequence of TYR could produce an inactive enzyme.",
        points: [
          "Changed codon / triplet codes for a different amino acid",
          "Changes the R group, hydrogen / ionic bonds and so the tertiary structure",
          "Active site changes shape, so tyrosine no longer binds / no enzyme-substrate complexes",
        ],
        modelAnswer: "A changed triplet codes for a different amino acid, whose different R group alters the hydrogen, ionic and other bonds that hold the tertiary structure. The active site changes shape, so tyrosine no longer fits or binds and no enzyme-substrate complexes form.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Name the amino acid that tyrosinase acts on.",
        accepted: ["tyrosine"],
        wrong: ["tyrosinase"],
        explanation: "Tyrosine.",
      }),
    ],
    explanation: "Loss-of-function enzyme alleles are recessive when one working allele is enough.",
    hints: ["How many working alleles does each genotype have?"],
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "The table summarises four human conditions caused by alleles of single genes.\n\n" + table(["Condition", "Gene", "Protein affected"], [["P", "HBB", "β-globin"], ["Q", "F8", "Factor VIII"], ["R", "HTT", "Huntingtin"], ["S", "TYR", "Tyrosinase"]]),
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name condition Q.",
        accepted: ["haemophilia", "haemophilia A", "hemophilia", "hemophilia A"],
        wrong: ["sickle cell anaemia"],
        explanation: "Haemophilia A.",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name condition R.",
        accepted: ["Huntington's disease", "Huntingtons disease", "Huntington disease", "Huntington's", "Huntington's chorea"],
        wrong: ["albinism"],
        explanation: "Huntington's disease.",
      }),
      P.mcq({
        label: "(c)", stem: "Which condition is caused by an allele on the X chromosome?",
        options: [
          ["Q", "Correct: F8 is X-linked."],
          ["P", "HBB is on an autosome (chromosome 11)."],
          ["R", "HTT is on an autosome (chromosome 4)."],
          ["S", "TYR is on an autosome."],
        ],
        answer: "A",
        explanation: "The F8 gene is on the X chromosome.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "For condition P, describe how the protein affected leads to the phenotype.",
        points: [
          "Valine replaces glutamic acid in β-globin / haemoglobin S formed",
          "Haemoglobin S polymerises into fibres at low oxygen",
          "Red cells sickle, block capillaries and are destroyed: pain and anaemia",
        ],
        modelAnswer: "In β-globin, valine replaces glutamic acid, giving haemoglobin S. At low oxygen concentrations haemoglobin S molecules stick together into long fibres, so red blood cells become sickle-shaped and rigid; they block capillaries, causing pain, and are destroyed rapidly, causing anaemia.",
      }),
    ],
    explanation: "Named examples: gene → protein → phenotype.",
    hints: ["Recall the five named gene examples."],
  });

  b.card("DEFINITION", "Define **gene**.", "A length of DNA at a locus on a chromosome that codes for a polypeptide (or functional RNA); the unit of inheritance.");
  b.card("DEFINITION", "Define **allele**.", "An alternative form of a gene at the same locus, differing in base sequence.");
  b.card("DEFINITION", "Define **phenotype**.", "The observable characteristics of an organism, from its genotype interacting with the environment.");
  b.card("FACT", "TYR gene: protein and condition", "Tyrosinase (melanin synthesis); recessive alleles cause albinism.");
  b.card("FACT", "HBB gene: protein and condition", "β-globin; Hbˢ allele (glutamic acid → valine at position 6) causes sickle cell anaemia.");
  b.card("FACT", "F8 gene: protein and condition", "Factor VIII (clotting); X-linked recessive alleles cause haemophilia A.");
  b.card("FACT", "HTT gene: protein and condition", "Huntingtin; expanded CAG repeat (dominant) causes Huntington's disease.");
  b.card("FACT", "Le gene in peas", "Codes for an enzyme making active gibberellin (GA₁); le le plants make little and are dwarf.");
  b.card("CONCEPT", "Chain from gene to phenotype", "Base sequence → mRNA → amino acid sequence → protein shape and function → phenotype.");
});
