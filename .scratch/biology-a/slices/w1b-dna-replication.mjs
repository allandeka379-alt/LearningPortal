// W1b: semi-conservative replication of DNA. Meselson-Stahl items are ZIMSEC detail (applies ZIM).
import { concept, P, t, chk, ZIM, dpStr, rnd } from "../lib.mjs";

concept("abio.nucleic.dna-replication", { file: "nucleic/dna-replication", keyPrefix: "nucleic.dna-replication" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which enzyme joins free DNA nucleotides to form a new strand during replication?",
    options: [
      ["DNA polymerase", "Correct: it catalyses phosphodiester bond formation between nucleotides."],
      ["DNA ligase", "Ligase joins existing fragments (Okazaki fragments), not individual nucleotides along the strand."],
      ["RNA polymerase", "RNA polymerase makes RNA in transcription."],
      ["Restriction endonuclease", "Restriction enzymes cut DNA at specific sequences."],
    ],
    answer: "A",
    explanation: "**DNA polymerase** adds nucleotides to the 3' end of the growing strand, forming phosphodiester bonds.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does semi-conservative replication mean?",
    options: [
      ["Each new DNA molecule has one original strand and one new strand", "Correct."],
      ["One new molecule is entirely original and the other entirely new", "This is the conservative model, which was disproved."],
      ["Each strand of the new molecules is a mixture of old and new sections", "This is the dispersive model."],
      ["Only half of the DNA in a cell is replicated in each cycle", "All the DNA is replicated once per cycle."],
    ],
    answer: "A",
    explanation: "In **semi-conservative** replication each daughter molecule keeps one parental strand (conserved) and gains one new strand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which direction does DNA polymerase build a new strand?",
    options: [
      ["5' to 3', adding nucleotides to the 3' end", "Correct: the enzyme can only extend a 3' end."],
      ["3' to 5', adding nucleotides to the 5' end", "DNA polymerase cannot add to a 5' end."],
      ["5' to 3' on one strand and 3' to 5' on the other", "Both new strands are made 5' to 3'; the lagging strand is made in fragments."],
      ["In either direction, depending on the template", "The direction is fixed by the enzyme's active site."],
    ],
    answer: "A",
    explanation: "New DNA is always synthesised **5' → 3'**. This is why the lagging strand is made discontinuously.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which bonds are broken when the two strands of DNA separate before replication?",
    options: [
      ["Hydrogen bonds between complementary bases", "Correct."],
      ["Phosphodiester bonds in the sugar-phosphate backbone", "The backbone of each template strand stays intact."],
      ["Peptide bonds between histone proteins", "Peptide bonds are within proteins; strand separation breaks hydrogen bonds."],
      ["Covalent bonds between bases and sugars", "These hold the bases on each strand and are not broken."],
    ],
    answer: "A",
    explanation: "Separating the strands breaks the **hydrogen bonds** between paired bases; each strand stays intact as a template.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is the lagging strand made as short Okazaki fragments?",
    options: [
      ["DNA polymerase works only 5' to 3', which on this template is away from the replication fork", "Correct: the enzyme must restart repeatedly as the fork opens."],
      ["The lagging template contains more copying errors, which must be cut out in short pieces", "Fragments arise from the direction of synthesis, not from errors."],
      ["DNA ligase can only join short pieces of DNA", "Ligase joins fragments that already exist; it does not cause them."],
      ["The lagging template is made of RNA rather than DNA", "Both templates are DNA."],
    ],
    answer: "A",
    explanation: "The templates are antiparallel. On the lagging template, 5' → 3' synthesis runs **away** from the fork, so it is made in short pieces, later joined by **ligase**.",
    hints: ["The two template strands run in opposite directions."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A cell is given a drug that inhibits DNA ligase but not DNA polymerase. What would be found in newly replicated DNA?",
    options: [
      ["Lagging strands made of separate short fragments", "Correct: Okazaki fragments are made but cannot be joined."],
      ["No new DNA at all on either strand", "DNA polymerase still works, so new nucleotides are joined."],
      ["Leading strands made of separate short fragments", "The leading strand is made continuously and does not need ligase to join fragments."],
      ["New strands containing uracil instead of thymine", "Inhibiting ligase does not change which nucleotides are used."],
    ],
    answer: "A",
    explanation: "Without **ligase**, Okazaki fragments on the lagging strand stay unjoined; the leading strand is still continuous.",
    hints: ["Which strand depends on ligase to become continuous?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "In the Meselson and Stahl experiment, bacteria grown on ¹⁵N were moved to ¹⁴N. After one generation all the DNA formed a single band of intermediate density. Which model did this result rule out?",
    options: [
      ["The conservative model", "Correct: it predicts one heavy band and one light band after one generation."],
      ["The semi-conservative model", "This model predicts exactly one intermediate band."],
      ["The dispersive model", "The dispersive model also predicts one intermediate band after one generation; it was ruled out by generation 2."],
      ["Both the semi-conservative and dispersive models", "Both of these predict a single intermediate band after one generation."],
    ],
    answer: "A",
    explanation: "Conservative replication would keep one all-¹⁵N molecule and make one all-¹⁴N molecule: **two** bands. A single hybrid band rules it out.",
    hints: ["What would each model predict after one generation?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "Which result after the second generation in ¹⁴N ruled out the dispersive model?",
    options: [
      ["Two bands, one intermediate and one light", "Correct: dispersive replication would give a single band, lighter than intermediate."],
      ["One band of intermediate density only", "This was the result after one generation, not two."],
      ["One heavy band and one light band", "This would support the conservative model."],
      ["One band halfway between intermediate and light", "This is what the dispersive model predicts; it was not observed."],
    ],
    answer: "A",
    explanation: "In the dispersive model every molecule would contain a share of ¹⁵N, giving **one** band that becomes steadily lighter. Two distinct bands (hybrid and light) support semi-conservative replication.",
    hints: ["Would dispersive replication ever give completely light molecules?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "DNA replication takes place during the S phase of interphase.",
    answer: true,
    explanation: "True. S stands for synthesis: DNA replicates before mitosis or meiosis.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "DNA polymerase forms the hydrogen bonds between the free nucleotides and the template strand.",
    answer: false,
    explanation: "False. Hydrogen bonds form spontaneously by complementary base pairing. DNA polymerase catalyses the **phosphodiester bonds** between adjacent nucleotides.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its role in replication.",
    pairs: [
      ["DNA polymerase", "Forms phosphodiester bonds between nucleotides of the new strand"],
      ["DNA ligase", "Joins Okazaki fragments"],
      ["Template strand", "Exposes bases to which free nucleotides pair"],
      ["Free activated nucleotides", "Raw material for the new strand"],
    ],
    explanation: "Template strands direct the sequence; nucleotides pair; polymerase builds the backbone; ligase seals fragments.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "On the {{blank:a}} strand the new DNA is made continuously, while on the {{blank:b}} strand it is made in short {{blank:c}} fragments.",
    blanks: [
      { id: "a", accepted: ["leading"], choices: ["leading", "lagging"] },
      { id: "b", accepted: ["lagging"], choices: ["leading", "lagging"] },
      { id: "c", accepted: ["Okazaki"], choices: ["Okazaki", "Chargaff", "Meselson"] },
    ],
    explanation: "Leading strand: continuous. Lagging strand: discontinuous, Okazaki fragments.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the enzyme that joins Okazaki fragments together.",
    accepted: ["DNA ligase", "ligase"],
    wrong: ["DNA polymerase", "helicase"],
    explanation: "**DNA ligase** forms phosphodiester bonds between adjacent fragments.",
  });

  // Meselson-Stahl proportions after n generations
  const gen = 4;
  const molecules = 2 ** gen;
  const lightPct = ((molecules - 2) / molecules) * 100;
  chk(lightPct, 87.5);
  b.num({
    d: 3, skill: "APPLICATION", applies: ZIM, daily: true, calculator: true,
    stem: "Bacteria whose DNA contains only ¹⁵N are transferred to a medium containing only ¹⁴N and allowed to divide for four generations. Assuming semi-conservative replication, what percentage of the DNA molecules contain only ¹⁴N?",
    value: lightPct, unit: "%",
    wrong: [75, 50],
    explanation: `After 4 generations there are 2⁴ = ${molecules} molecules. Two contain an original ¹⁵N strand (hybrid); ${molecules - 2} are all-¹⁴N. ${molecules - 2} ÷ ${molecules} × 100 = ${lightPct}%. 75% is the answer after three generations.`,
    hints: ["The two original strands are never split up."],
  });

  // Replication time (hypothetical numbers)
  const bp = 3.0e6;
  const rate = 750;
  const time = bp / 2 / rate / 60;
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A bacterium has a circular chromosome of $3.0 \times 10^{6}$ base pairs. Replication starts at one origin, and two replication forks move in opposite directions, each copying 750 base pairs per second. Calculate the time taken to replicate the whole chromosome, in minutes, to three significant figures.`,
    value: time, sf: 3, unit: "min",
    wrong: [rnd(bp / rate / 60, 1), rnd(bp / 2 / rate, 0)],
    explanation: t`1. Each fork copies half the chromosome: $3.0 \times 10^{6} \div 2 = 1.5 \times 10^{6}$ base pairs.
2. Time $= 1.5 \times 10^{6} \div 750 = 2000$ s.
3. In minutes: $2000 \div 60 = ${dpStr(time, 1)}$ minutes.
4. Forgetting that there are two forks doubles the answer (66.7 min); leaving it in seconds gives 2000.`,
    hints: ["Two forks share the work.", "Convert seconds to minutes."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 5,
    stem: "Describe the process of semi-conservative replication of DNA.",
    points: [
      "Double helix unwinds; hydrogen bonds between bases break and the strands separate",
      "Each strand acts as a template",
      "Free (activated) DNA nucleotides pair with exposed bases by complementary base pairing (A-T, C-G)",
      "DNA polymerase joins nucleotides by forming phosphodiester bonds (5' to 3')",
      "Each new molecule has one original and one new strand; lagging strand fragments joined by ligase",
    ],
    modelAnswer: "The double helix unwinds and the hydrogen bonds between the bases break, so the two strands separate. Each strand acts as a template. Free DNA nucleotides pair with the exposed bases by complementary base pairing, A with T and C with G. DNA polymerase joins the nucleotides by forming phosphodiester bonds, building each new strand in the 5' to 3' direction; on the lagging strand the fragments are joined by DNA ligase. Each new DNA molecule contains one original strand and one new strand.",
    explanation: "Unwind, template, pair, polymerase, semi-conservative result.",
    hints: ["Give the steps in order."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: ZIM,
    stem: "Explain how the results of the Meselson and Stahl experiment after one and two generations support the semi-conservative model and not the others.",
    points: [
      "Generation 1: one band of intermediate (hybrid) density",
      "This rules out conservative replication, which predicts one heavy and one light band",
      "Generation 2: two bands, intermediate and light, in equal amounts",
      "This rules out dispersive replication, which predicts one band of density between hybrid and light; only semi-conservative fits both",
    ],
    modelAnswer: "After one generation in ¹⁴N all the DNA formed one intermediate band, so every molecule had one ¹⁵N strand and one ¹⁴N strand; conservative replication would have given a heavy band and a light band. After two generations there were two bands, intermediate and light, in equal amounts. Dispersive replication would have given a single band lighter than intermediate. Only semi-conservative replication predicts both results.",
    explanation: "Generation 1 rules out conservative; generation 2 rules out dispersive.",
    hints: ["Consider each generation separately."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why accurate DNA replication is important.",
    points: [
      "The base sequence carries the genetic code / codes for the amino acid sequence of proteins",
      "Daughter cells need identical copies of the genes to make the correct proteins and function",
      "Errors are mutations, which may produce faulty proteins / could lead to uncontrolled division (cancer)",
    ],
    modelAnswer: "The sequence of bases is the genetic code for the amino acid sequences of proteins. Each daughter cell must receive an identical copy so it can make the correct proteins. Copying errors are mutations, which can change proteins and may lead to disease or cancer.",
    explanation: "Code → proteins → function; errors are mutations.",
    hints: ["What does the base sequence code for?"],
  });

  // Practice structured: Meselson-Stahl (ZIM)
  b.struct({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "Bacteria were grown for many generations in a medium with ¹⁵NH₄Cl as the only nitrogen source, then transferred to a medium containing ¹⁴NH₄Cl. DNA was extracted at intervals and centrifuged in a caesium chloride density gradient. The position of each band was recorded as heavy, intermediate or light.",
    parts: [
      P.manual({
        label: "(a)", marks: 1, stem: "Explain why nitrogen is used to label DNA.",
        points: ["Nitrogen is present in the bases of DNA (so heavy N makes the DNA denser)"],
        modelAnswer: "The nitrogenous bases contain nitrogen, so ¹⁵N is built into new DNA and makes it denser.",
      }),
      P.mcq({
        label: "(b)", stem: "What band pattern would the conservative model predict after one generation in ¹⁴N?",
        options: [
          ["One heavy band and one light band", "Correct: the original molecule stays heavy; the new one is all light."],
          ["One intermediate band only", "This is the semi-conservative (and dispersive) prediction."],
          ["One light band only", "The original heavy DNA would still be present."],
          ["One heavy band only", "New DNA made with ¹⁴N would be light."],
        ],
        answer: "A",
        explanation: "Conservative: original molecule intact (heavy) plus an all-new molecule (light).",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Assuming semi-conservative replication, what percentage of the DNA molecules would be intermediate after three generations?",
        value: (2 / 2 ** 3) * 100, unit: "%", wrong: [50, 75],
        explanation: t`After 3 generations there are $2^3 = 8$ molecules; 2 are hybrid: $2/8 \times 100 = 25\%$.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Describe the band pattern expected after two generations if replication were dispersive, and explain why.",
        points: ["One band only, between intermediate and light (lighter than generation 1)", "Every molecule would contain some old ¹⁵N DNA mixed with new ¹⁴N, in equal shares"],
        modelAnswer: "A single band, lighter than intermediate but heavier than light, because in dispersive replication every molecule would contain scattered pieces of old ¹⁵N DNA with new ¹⁴N DNA, with the ¹⁵N shared equally among all molecules.",
      }),
    ],
    explanation: "Density bands distinguish the three models; semi-conservative predicts one hybrid band, then hybrid and light bands.",
    hints: ["Each model predicts a different number of bands."],
    calculator: true,
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A short section of a DNA molecule is about to be replicated. One strand has the sequence 3' TACGGATC 5'.",
    parts: [
      P.short({
        label: "(a)", marks: 2, stem: "Write the sequence of the new strand built on this template, from its 5' end to its 3' end (letters only).",
        accepted: ["ATGCCTAG", "5' ATGCCTAG 3'"],
        normalise: ["trim", "remove_whitespace"],
        wrong: ["TACGGATC", "UACGGAUC"],
        explanation: "Complementary pairing: T-A, A-T, C-G, G-C, G-C, A-T, T-A, C-G gives 5' ATGCCTAG 3'.",
      }),
      P.mcq({
        label: "(b)", stem: "This new strand is made continuously. Which statement explains why?",
        options: [
          ["Its template is read 3' to 5' as the fork opens, so synthesis follows the fork", "Correct: this is the leading strand."],
          ["DNA ligase joins its nucleotides as they arrive", "Ligase joins fragments; polymerase adds single nucleotides."],
          ["The template contains no thymine", "The template contains thymine; the base composition is irrelevant."],
          ["DNA polymerase can add nucleotides in either direction on this particular template strand", "DNA polymerase works only 5' to 3'."],
        ],
        answer: "A",
        explanation: "Synthesis 5' → 3' follows the opening fork on this template, so the strand is the leading strand.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "State the role of DNA polymerase and of hydrogen bonding in making this new strand.",
        points: ["Hydrogen bonds form between complementary bases of free nucleotides and the template (spontaneously)", "DNA polymerase catalyses phosphodiester bonds between adjacent nucleotides of the new strand"],
        modelAnswer: "Free nucleotides are held against the template by hydrogen bonds between complementary bases; DNA polymerase then joins neighbouring nucleotides by catalysing phosphodiester bonds.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: the new DNA molecule formed will contain the template strand and the new strand.",
        answer: true,
        explanation: "True: replication is semi-conservative.",
      }),
    ],
    explanation: "Complementary pairing determines the sequence; polymerase builds the backbone 5' → 3'.",
    hints: ["Pair each base: A-T, C-G.", "The new strand is antiparallel to the template."],
  });

  b.card("DEFINITION", "Define **semi-conservative replication**.", "Each new DNA molecule has one original strand and one newly made strand.");
  b.card("FACT", "Role of DNA polymerase", "Joins free nucleotides by phosphodiester bonds, adding to the 3' end (5'→3' synthesis).");
  b.card("FACT", "Role of DNA ligase", "Joins Okazaki fragments on the lagging strand by phosphodiester bonds.");
  b.card("CONCEPT", "Leading versus lagging strand", "Leading: made continuously towards the fork. Lagging: made in Okazaki fragments away from the fork.");
  b.card("FACT", "Which bonds break when DNA strands separate?", "Hydrogen bonds between complementary bases.");
  b.card("CONCEPT", "Meselson and Stahl: generation 1 result", "One intermediate (hybrid) band: rules out conservative replication.", null, { applies: ZIM });
  b.card("CONCEPT", "Meselson and Stahl: generation 2 result", "Two bands, intermediate and light: rules out dispersive replication.", null, { applies: ZIM });
  b.card("FACT", "When does DNA replicate?", "In the S phase of interphase, before mitosis or meiosis.");
  b.card("CONCEPT", "Why is replication accurate?", "Complementary base pairing, and DNA polymerase proofreads and removes most mismatches.");
});
