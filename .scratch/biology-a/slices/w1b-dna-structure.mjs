// W1b: nucleotides and the structure of DNA and RNA.
import { concept, P, t, chk, same, chargaff, complement } from "../lib.mjs";

const hBonds = (seq) => seq.split("").reduce((s, x) => s + ("CG".includes(x) ? 3 : 2), 0);

concept("abio.nucleic.dna-structure", { file: "nucleic/dna-structure", keyPrefix: "nucleic.dna-structure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pair of bases are both purines?",
    options: [
      ["Adenine and guanine", "Correct: both have a double-ring structure."],
      ["Cytosine and thymine", "These are pyrimidines (single ring)."],
      ["Adenine and thymine", "Adenine is a purine but thymine is a pyrimidine."],
      ["Guanine and uracil", "Uracil is a pyrimidine."],
    ],
    answer: "A",
    explanation: "**Purines** (double ring): adenine and guanine. **Pyrimidines** (single ring): cytosine, thymine, uracil.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which bond joins adjacent nucleotides along one strand of DNA?",
    options: [
      ["Phosphodiester bond", "Correct: it links the phosphate of one nucleotide to the sugar of the next."],
      ["Hydrogen bond", "Hydrogen bonds join bases on opposite strands."],
      ["Peptide bond", "Peptide bonds join amino acids in proteins."],
      ["Glycosidic bond between two sugars", "Glycosidic bonds join monosaccharides in carbohydrates."],
    ],
    answer: "A",
    explanation: "A **phosphodiester bond** (formed by condensation) links carbon 3 of one sugar, through a phosphate, to carbon 5 of the next, making the sugar-phosphate backbone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does it mean to say that the two strands of DNA are antiparallel?",
    options: [
      ["They run in opposite directions, one 5' to 3' and the other 3' to 5'", "Correct."],
      ["They have identical base sequences read in the same direction", "The strands are complementary, not identical."],
      ["They are joined by covalent bonds between their bases", "Bases on opposite strands are held by hydrogen bonds."],
      ["They are coiled around each other in opposite helices", "Both strands coil in the same right-handed helix; antiparallel refers to their chemical direction."],
    ],
    answer: "A",
    explanation: "Each strand has a 5' end and a 3' end. In the double helix the strands lie **in opposite directions**.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which component is found in RNA nucleotides but not in DNA nucleotides?",
    options: [
      ["Uracil", "Correct: RNA has uracil instead of thymine."],
      ["Deoxyribose", "Deoxyribose is the sugar of DNA."],
      ["Thymine", "Thymine is found in DNA, not RNA."],
      ["Guanine", "Guanine is found in both DNA and RNA."],
    ],
    answer: "A",
    explanation: "RNA nucleotides contain **ribose** and may contain **uracil**; DNA nucleotides contain deoxyribose and may contain thymine.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does ATP differ from an adenine nucleotide in RNA?",
    options: [
      ["ATP has three phosphate groups instead of one", "Correct: ATP is a phosphorylated nucleotide."],
      ["ATP contains deoxyribose instead of ribose", "ATP contains ribose."],
      ["ATP contains thymine instead of adenine", "ATP contains adenine."],
      ["ATP has no phosphate groups at all", "ATP has three phosphate groups."],
    ],
    answer: "A",
    explanation: "ATP = adenine + ribose + **three** phosphates. The RNA nucleotide (AMP) has one phosphate.",
  });
  const comp = chargaff("C", 17);
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A sample of double-stranded DNA contains 17% cytosine. What percentage of its bases are adenine?",
    options: [
      ["33%", "Correct: G = 17%, so A + T = 66% and A = 33%."],
      ["17%", "17% is the percentage of guanine, which pairs with cytosine."],
      ["66%", "66% is A + T together."],
      ["83%", "This is 100 − 17, forgetting that guanine also equals 17%."],
    ],
    answer: "A",
    explanation: `C = G = 17%, so C + G = 34%; A + T = 66%; A = T = ${comp.A}%.`,
    hints: ["Which base pairs with cytosine?"],
  });
  chk(comp.A, 33);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Two DNA molecules of the same length are heated slowly. Molecule X separates into single strands at a higher temperature than molecule Y. What is the most likely explanation?",
    options: [
      ["X has a higher proportion of C-G base pairs", "Correct: C-G pairs have three hydrogen bonds, so more energy is needed to separate them."],
      ["X has a higher proportion of A-T base pairs", "A-T pairs have only two hydrogen bonds, so they separate more easily."],
      ["X has more phosphodiester bonds than Y", "Same-length molecules have the same number of phosphodiester bonds, and separation breaks hydrogen bonds."],
      ["X contains uracil instead of thymine", "DNA contains thymine; uracil is in RNA."],
    ],
    answer: "A",
    explanation: "Strand separation breaks **hydrogen bonds**. C-G pairs have three, A-T pairs two, so DNA rich in C-G needs a higher temperature.",
    hints: ["Which bonds break when the strands separate?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A virus has nucleic acid with the composition A 24%, T 31%, C 20%, G 25%. What can be concluded?",
    options: [
      ["It is single-stranded DNA", "Correct: thymine shows DNA, and A ≠ T and C ≠ G, so the bases are not paired."],
      ["It is double-stranded DNA", "In double-stranded DNA, A would equal T and C would equal G."],
      ["It is single-stranded RNA", "RNA contains uracil, not thymine."],
      ["It is double-stranded RNA", "RNA contains uracil, and double-stranded nucleic acid would show equal paired percentages."],
    ],
    answer: "A",
    explanation: "Thymine means **DNA**. Chargaff's rule fails (A 24% ≠ T 31%; C 20% ≠ G 25%), so it is **not double-stranded**.",
    hints: ["Which base identifies DNA?", "Do the paired bases match?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Adenine pairs with thymine by two hydrogen bonds in DNA.",
    answer: true,
    explanation: "True. A-T pairs have two hydrogen bonds; C-G pairs have three.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a single strand of DNA, the percentage of adenine must equal the percentage of thymine.",
    answer: false,
    explanation: "False. Chargaff's rule applies to double-stranded DNA, where every A on one strand pairs with T on the other. A single strand can have any proportions.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of DNA with how it suits its function.",
    pairs: [
      ["Complementary base pairing", "Each strand can act as a template for replication"],
      ["Many hydrogen bonds, each weak", "Strands can be separated, yet the molecule is stable"],
      ["Bases inside the helix", "Coded information is protected"],
      ["Sequence of bases along the strand", "Carries the genetic code"],
    ],
    explanation: "Structure-function links that exam questions often ask for.",
  });
  b.fib({
    d: 2,
    stem: "Complete the description of a nucleotide.",
    template: "A DNA nucleotide consists of the pentose sugar {{blank:a}}, a {{blank:b}} group and a nitrogenous base. The base is attached to carbon {{blank:c}} of the sugar.",
    blanks: [
      { id: "a", accepted: ["deoxyribose"], choices: ["deoxyribose", "ribose", "glucose"] },
      { id: "b", accepted: ["phosphate"], choices: ["phosphate", "carboxyl", "amine"] },
      { id: "c", accepted: ["1"], input: "number", wrong: "5" },
    ],
    explanation: "Deoxyribose + phosphate (on carbon 5) + base (on carbon 1).",
  });
  const seq = "GCTTAGCA";
  const compSeq = complement(seq);
  same(compSeq, "CGAATCGT");
  b.short({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "One strand of a DNA molecule has the sequence 5' GCTTAGCA 3'. Write the sequence of the complementary strand, reading from its 3' end to its 5' end (letters only).",
    accepted: [compSeq, "3' CGAATCGT 5'", "3'CGAATCGT5'"],
    normalise: ["trim", "remove_whitespace"],
    wrong: ["CGTTACGA", "GCTTAGCA"],
    explanation: "Pair each base: G-C, C-G, T-A, T-A, A-T, G-C, C-G, A-T, giving 3' CGAATCGT 5'. The strands are antiparallel.",
  });

  const frag = "ATGCGCATTA";
  const hb = hBonds(frag);
  chk(hb, 24);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A double-stranded DNA fragment has the sequence 5' ATGCGCATTA 3' on one strand. Calculate the total number of hydrogen bonds between the two strands.",
    value: hb, wrong: [20, 30],
    explanation: `A-T pairs (A, T, A, T, T, A) = 6 pairs × 2 = 12. C-G pairs (G, C, G, C) = 4 pairs × 3 = 12. Total = ${hb} hydrogen bonds. Using 2 bonds for every pair gives 20; using 3 for every pair gives 30.`,
    hints: ["Count A-T pairs and C-G pairs separately.", "A-T: 2 bonds; C-G: 3 bonds."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 5,
    stem: "Describe the structure of a DNA molecule.",
    points: [
      "Polymer of nucleotides, each with deoxyribose, a phosphate group and a base (A, T, C or G)",
      "Nucleotides joined by phosphodiester bonds forming a sugar-phosphate backbone",
      "Two strands that are antiparallel (5' to 3' and 3' to 5')",
      "Complementary base pairing: A with T, C with G, held by hydrogen bonds (two in A-T, three in C-G)",
      "Strands twisted into a double helix (purine always paired with pyrimidine)",
    ],
    modelAnswer: "DNA is a polymer of nucleotides, each made of deoxyribose, a phosphate group and one of four bases (A, T, C, G). Nucleotides are joined by phosphodiester bonds into a sugar-phosphate backbone. Two strands run antiparallel, one 5' to 3' and the other 3' to 5', and are held together by hydrogen bonds between complementary bases: A with T by two bonds and C with G by three. The two strands are twisted into a double helix.",
    explanation: "Nucleotides, backbone, antiparallel strands, pairing with hydrogen bonds, double helix.",
    hints: ["Start from the nucleotide and build up."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Compare the structure of DNA and messenger RNA.",
    points: [
      "Both are polynucleotides joined by phosphodiester bonds / both contain A, C and G",
      "DNA contains deoxyribose; mRNA contains ribose",
      "DNA contains thymine; mRNA contains uracil",
      "DNA is double-stranded (helix) and very long; mRNA is single-stranded and shorter",
    ],
    modelAnswer: "Both are polynucleotides with sugar-phosphate backbones linked by phosphodiester bonds and both contain adenine, cytosine and guanine. DNA has deoxyribose but mRNA has ribose; DNA has thymine where mRNA has uracil; DNA is a long double helix while mRNA is a short single strand.",
    explanation: "One similarity and three differences, each with both sides.",
    hints: ["Compare sugar, bases, number of strands and length."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Suggest why the number of hydrogen bonds per base pair, rather than the number of phosphodiester bonds, determines how easily the two strands of DNA can be separated.",
    points: [
      "Separating the strands breaks the hydrogen bonds between bases, not the backbone",
      "Phosphodiester bonds hold each strand together and remain intact",
      "C-G pairs have three hydrogen bonds and A-T two, so more energy is needed where C-G pairs are frequent",
    ],
    modelAnswer: "When the strands separate, only the hydrogen bonds between complementary bases are broken; the phosphodiester bonds hold each strand together and are not broken. C-G pairs have three hydrogen bonds compared with two for A-T, so regions rich in C-G need more energy to separate.",
    explanation: "Strand separation = breaking hydrogen bonds between bases.",
    hints: ["Which bonds join the two strands together?"],
  });

  // Practice structured: base composition data
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the base composition (as a percentage of all bases) of nucleic acids from three sources.\n\n| Source | A | G | C | T | U |\n|---|---|---|---|---|---|\n| Maize nucleus | 27 | 23 | 23 | 27 | 0 |\n| Bacteriophage X | 25 | 24 | 18 | 33 | 0 |\n| Tobacco mosaic virus | 30 | 25 | 19 | 0 | 26 |",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the type of nucleic acid in tobacco mosaic virus.",
        accepted: ["RNA", "single-stranded RNA", "ribonucleic acid", "ssRNA"],
        wrong: ["DNA"],
        explanation: "It contains uracil and no thymine, so it is RNA.",
      }),
      P.mcq({
        label: "(b)", stem: "Which conclusion about bacteriophage X is supported by the data?",
        options: [
          ["Its DNA is single-stranded", "Correct: A ≠ T and G ≠ C."],
          ["Its DNA is double-stranded", "Double-stranded DNA would have A = T and G = C."],
          ["It contains RNA", "There is thymine and no uracil."],
          ["It contains both DNA and RNA", "There is no uracil, so no RNA."],
        ],
        answer: "A",
        explanation: "Thymine shows DNA; A (25%) ≠ T (33%) and G (24%) ≠ C (18%), so the bases are not paired.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the maize data support complementary base pairing.",
        points: ["%A equals %T (27%) and %G equals %C (23%)", "Because every A pairs with T and every G pairs with C on the opposite strand"],
        modelAnswer: "In maize, A and T are both 27% and G and C are both 23%. This is expected if every adenine on one strand pairs with a thymine on the other, and every guanine with a cytosine.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "A maize DNA fragment of 1000 base pairs has the same composition as the whole nucleus. How many hydrogen bonds hold its strands together?",
        value: 1000 * 0.54 * 2 + 1000 * 0.46 * 3, wrong: [2000, 2500],
        explanation: t`A-T pairs: $54\% \times 1000 = 540$ pairs $\times 2 = 1080$. C-G pairs: $46\% \times 1000 = 460$ pairs $\times 3 = 1380$. Total $= 2460$.`,
      }),
    ],
    explanation: "Uracil identifies RNA; Chargaff's rule identifies double-stranded DNA; base composition sets the number of hydrogen bonds.",
    hints: ["Which base occurs only in RNA?", "A + T = 54% of the bases, so 54% of the base pairs are A-T."],
    calculator: true,
  });
  chk(1000 * 0.54 * 2 + 1000 * 0.46 * 3, 2460, 1e-9);

  b.struct({
    d: 4, skill: "UNDERSTANDING",
    stem: "A dinucleotide is formed from two DNA nucleotides, one containing cytosine and one containing adenine.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the type of reaction that joins the two nucleotides.",
        accepted: ["condensation", "condensation reaction", "a condensation reaction"],
        wrong: ["hydrolysis"],
        explanation: "A condensation reaction releases a molecule of water.",
      }),
      P.mcq({
        label: "(b)", stem: "Which groups react to form the bond?",
        options: [
          ["The phosphate of one nucleotide and the –OH on carbon 3 of the other's sugar", "Correct: this forms a phosphodiester bond."],
          ["The bases of the two nucleotides", "Bases pair by hydrogen bonds between strands, not along a strand."],
          ["The –OH on carbon 1 of both sugars", "Carbon 1 carries the base."],
          ["The phosphate groups of both nucleotides, which join to each other directly", "Phosphate links to a sugar, not to another phosphate, in a polynucleotide."],
        ],
        answer: "A",
        explanation: "Phosphate (on carbon 5 of one nucleotide) + –OH on carbon 3 of the next → phosphodiester bond + water.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State two differences between a cytosine nucleotide and an adenine nucleotide.",
        points: ["Cytosine is a pyrimidine (single ring); adenine is a purine (double ring)", "Cytosine pairs with guanine (three hydrogen bonds); adenine pairs with thymine (two)"],
        modelAnswer: "Cytosine is a single-ringed pyrimidine while adenine is a double-ringed purine. Cytosine pairs with guanine by three hydrogen bonds, adenine with thymine by two.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Name the type of bond broken when the dinucleotide is hydrolysed.",
        accepted: ["phosphodiester", "phosphodiester bond", "a phosphodiester bond"],
        wrong: ["hydrogen bond"],
        explanation: "Hydrolysis breaks the phosphodiester bond.",
      }),
      P.tf({
        label: "(e)", stem: "True or false: the dinucleotide has a free phosphate group at its 5' end and a free –OH group on carbon 3 at its 3' end.",
        answer: true,
        explanation: "True. Every polynucleotide strand, including a dinucleotide, has a 5' end (phosphate) and a 3' end (–OH), which gives it a direction.",
      }),
    ],
    explanation: "Condensation forms a phosphodiester bond between phosphate and the 3' carbon of the next sugar.",
    hints: ["Water is released when monomers join."],
  });

  b.card("DEFINITION", "What is a **nucleotide**?", "Pentose sugar + phosphate group + nitrogenous base.");
  b.card("FACT", "Purines and pyrimidines", "Purines (double ring): A, G. Pyrimidines (single ring): C, T, U.");
  b.card("FACT", "Hydrogen bonds in base pairs", "A-T: 2 hydrogen bonds. C-G: 3 hydrogen bonds.");
  b.card("DEFINITION", "What is a **phosphodiester bond**?", "Covalent link between the phosphate of one nucleotide and carbon 3 of the next sugar, forming the backbone.");
  b.card("DEFINITION", "What does **antiparallel** mean?", "The two DNA strands run in opposite directions: 5'→3' and 3'→5'.");
  b.card("FORMULA", "Chargaff's rule", "In double-stranded DNA: %A = %T and %C = %G.");
  b.card("CONCEPT", "Three differences between DNA and RNA", "Deoxyribose vs ribose; thymine vs uracil; double-stranded vs single-stranded.");
  b.card("FACT", "Structure of ATP", "Adenine + ribose + three phosphate groups: a phosphorylated nucleotide.");
  b.card("FACT", "Two key features of tRNA", "An anticodon (three bases) and an amino acid attachment site at the 3' end.");
});
