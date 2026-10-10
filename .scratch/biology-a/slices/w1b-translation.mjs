// W1b: translation, from mRNA to polypeptide.
import { concept, P, t, chk, same, table } from "../lib.mjs";
import { CODE, translate, mrnaFromTemplate, anticodon, codonRows } from "../tables/w1b-code.mjs";

const groups = (s) => s.match(/.{1,3}/g).join(" ");
const codeTable = (codons) => table(["mRNA codon", "Amino acid"], codonRows(codons).map(([c, a]) => [c, a === "Stop" ? "stop" : a]));

concept("abio.nucleic.translation", { file: "nucleic/translation", keyPrefix: "nucleic.translation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where in a eukaryotic cell does translation take place?",
    options: [
      ["On ribosomes in the cytoplasm or on rough endoplasmic reticulum", "Correct."],
      ["In the nucleolus", "The nucleolus makes ribosomal RNA and assembles ribosome subunits; it does not translate mRNA."],
      ["In the nucleus, on the DNA of the gene being expressed", "Transcription takes place in the nucleus; translation is in the cytoplasm."],
      ["In the Golgi body", "The Golgi body modifies and packages proteins after translation."],
    ],
    answer: "A",
    explanation: "Translation happens on **ribosomes**, free in the cytoplasm or attached to the rough ER.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An mRNA codon is 5' GCA 3'. What is the anticodon of the tRNA that pairs with it (written 3' to 5')?",
    options: [
      ["CGU", "Correct: G-C, C-G, A-U."],
      ["CGT", "tRNA is RNA, so it contains uracil, not thymine."],
      ["GCA", "This repeats the codon instead of giving its complement."],
      ["ACG", "This is the codon read backwards, not its complement."],
    ],
    answer: "A",
    explanation: "Complementary RNA bases: G→C, C→G, A→U, so the anticodon is **CGU**.",
  });
  same(anticodon("GCA"), "CGU");
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the role of ATP in amino acid activation?",
    options: [
      ["It provides energy to attach an amino acid to its specific tRNA", "Correct."],
      ["It provides energy to break hydrogen bonds between codon and anticodon", "Codon-anticodon hydrogen bonds are not broken using ATP in activation."],
      ["It provides the phosphate groups of the mRNA backbone", "mRNA is made in transcription, not activation."],
      ["It forms the anticodon loop of the tRNA", "The anticodon is part of the tRNA's base sequence."],
    ],
    answer: "A",
    explanation: "In **activation**, a specific enzyme attaches each amino acid to its tRNA, using energy from **ATP** hydrolysis.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What happens when a ribosome reaches a stop codon on mRNA?",
    options: [
      ["No tRNA pairs with it, and the polypeptide is released", "Correct: stop codons have no matching tRNA."],
      ["A tRNA carrying a 'stop' amino acid is added", "There is no stop amino acid."],
      ["The ribosome moves back to the start codon", "The subunits separate; the mRNA may be translated again by another ribosome."],
      ["The mRNA is spliced to remove the stop codon", "Splicing happens in the nucleus before translation, and removes introns."],
    ],
    answer: "A",
    explanation: "At UAA, UAG or UGA **no tRNA binds**; the completed polypeptide is released and the ribosome subunits separate.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How many tRNA molecules can be bound to the mRNA within a ribosome at any moment during elongation?",
    options: [
      ["Two", "Correct: the ribosome holds two tRNAs so a peptide bond can form between their amino acids."],
      ["One", "Two amino acids must be held together for a peptide bond to form."],
      ["Three", "A ribosome pairs two tRNAs with codons at a time."],
      ["As many as there are codons on the mRNA", "Each ribosome works on only two codons at a time."],
    ],
    answer: "A",
    explanation: "The ribosome holds **two** tRNAs, each paired with a codon, so their amino acids are close enough to be joined.",
    hints: ["A peptide bond joins two amino acids."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which structure catalyses the formation of peptide bonds during translation?",
    options: [
      ["The large subunit of the ribosome", "Correct: rRNA in the large subunit catalyses peptide bond formation."],
      ["The tRNA anticodon", "The anticodon pairs with the codon; it does not form peptide bonds."],
      ["The start codon on the mRNA molecule", "AUG is a signal, not a catalyst."],
      ["RNA polymerase", "RNA polymerase works in transcription."],
    ],
    answer: "A",
    explanation: "The **ribosome's large subunit** (its rRNA) catalyses peptide bonds between neighbouring amino acids.",
    hints: ["Which part of the ribosome is larger and holds the growing chain?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The DNA template triplet for an amino acid is 3' AAC 5'. What is the tRNA anticodon (3' to 5') for this amino acid?",
    options: [
      ["AAC", "Correct: codon 5' UUG 3'; anticodon 3' AAC 5', the same as the template with U for T (none here)."],
      ["UUG", "UUG is the mRNA codon, not the anticodon."],
      ["TTG", "TTG is the coding-strand DNA triplet; tRNA contains no thymine."],
      ["GUU", "This reverses the codon instead of pairing it."],
    ],
    answer: "A",
    explanation: "Template 3' AAC 5' → mRNA 5' UUG 3' → anticodon 3' **AAC** 5'. The anticodon matches the template triplet (with U for T).",
    hints: ["Transcribe first, then pair the codon."],
  });
  same(anticodon(mrnaFromTemplate("AAC")), "AAC");
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What is the advantage to a cell of a polysome?",
    options: [
      ["Many copies of a polypeptide are made at the same time from one mRNA", "Correct."],
      ["Different polypeptides are made from one mRNA at the same time", "Every ribosome on one mRNA makes the same polypeptide."],
      ["mRNA is protected from being broken down permanently", "Polysomes do not make mRNA permanent."],
      ["The ribosomes can translate DNA directly", "Ribosomes translate mRNA, not DNA."],
    ],
    answer: "A",
    explanation: "Several ribosomes on one mRNA each make a copy of the **same polypeptide**, increasing the rate of production.",
    hints: ["Do all the ribosomes read the same codons?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Each tRNA molecule carries one specific type of amino acid.",
    answer: true,
    explanation: "True. The amino acid is attached by a specific enzyme to the tRNA with the matching anticodon.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The ribosome moves along the mRNA one base at a time during translation.",
    answer: false,
    explanation: "False. It moves **one codon (three bases)** at a time, because the code is a non-overlapping triplet code.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each molecule with its role in protein synthesis.",
    pairs: [
      ["mRNA", "Carries the codons from the nucleus to the ribosome"],
      ["tRNA", "Brings a specific amino acid and pairs its anticodon with a codon"],
      ["rRNA", "Forms part of the ribosome and catalyses peptide bonds"],
      ["ATP", "Supplies energy to attach amino acids to tRNA"],
    ],
    explanation: "mRNA carries the message; tRNA adapts codons to amino acids; rRNA is the ribosome's catalytic core; ATP powers activation.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Translation starts at the codon {{blank:a}}. Amino acids are joined by {{blank:b}} bonds. A group of ribosomes on one mRNA is a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["AUG"], choices: ["AUG", "UAA", "UGA", "UAC"] },
      { id: "b", accepted: ["peptide"], choices: ["peptide", "phosphodiester", "hydrogen", "glycosidic"] },
      { id: "c", accepted: ["polysome"], choices: ["polysome", "nucleosome", "lysosome"] },
    ],
    explanation: "Start codon AUG; peptide bonds; polysome.",
  });

  // Decode with a given table
  const m1 = "AUGUUCAGCGGAUGGUAA";
  const p1 = translate(m1);
  same(p1, ["Met", "Phe", "Ser", "Gly", "Trp"]);
  b.short({
    d: 3, skill: "APPLICATION", daily: true,
    stem: `An mRNA has the sequence 5' ${groups(m1)} 3'. Use the table to give the amino acid sequence, as three-letter names separated by hyphens.\n\n${codeTable(m1.match(/.{3}/g))}`,
    accepted: [p1.join("-"), p1.join(" "), p1.join(", "), p1.join(",")],
    wrong: ["Met-Phe-Ser-Gly-Trp-Stop", "Phe-Ser-Gly-Trp"],
    explanation: `${groups(m1)} → ${p1.join("-")}, then UAA (stop).`,
    hints: ["Read in threes from AUG.", "The stop codon adds no amino acid."],
  });

  // Numerical: minimum mRNA length
  const aa = 238;
  const len = aa * 3 + 3;
  chk(len, 717);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A polypeptide contains 238 amino acids. What is the minimum number of nucleotides in the coding region of its mature mRNA, including the stop codon?",
    value: len, wrong: [aa * 3, aa],
    explanation: `238 × 3 = 714 nucleotides for the amino acids, plus 3 for the stop codon = ${len}. Leaving out the stop codon gives 714.`,
    hints: ["Each amino acid needs one codon.", "Add the stop codon."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 6,
    stem: "Describe the process of translation.",
    points: [
      "mRNA binds to a ribosome (small subunit); translation starts at the start codon AUG",
      "tRNA molecules carry specific amino acids (attached using ATP)",
      "tRNA anticodon pairs with the complementary codon on mRNA (hydrogen bonds)",
      "Two tRNAs are held in the ribosome; a peptide bond forms between their amino acids (catalysed by the ribosome)",
      "The ribosome moves along one codon; the first tRNA leaves and another tRNA enters; repeated",
      "At a stop codon no tRNA binds and the polypeptide is released",
    ],
    modelAnswer: "The mRNA attaches to the small subunit of a ribosome, and translation begins at the start codon AUG. Each tRNA carries a specific amino acid, attached using energy from ATP. A tRNA whose anticodon is complementary to the codon pairs with it by hydrogen bonds. With two tRNAs in the ribosome, a peptide bond forms between their amino acids, catalysed by the ribosome. The ribosome moves one codon along the mRNA; the empty tRNA leaves and the next tRNA enters. This repeats until a stop codon is reached; no tRNA binds to it, and the polypeptide is released.",
    explanation: "Initiation, pairing, peptide bond, movement, termination.",
    hints: ["Describe initiation, elongation and termination."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the sequence of bases in mRNA determines the sequence of amino acids in a polypeptide.",
    points: [
      "Each codon (three bases) corresponds to one amino acid",
      "Each tRNA with a complementary anticodon carries a specific amino acid",
      "Codons are read in order, so amino acids are joined in the order of the codons",
    ],
    modelAnswer: "Each codon of three bases corresponds to one amino acid. Only a tRNA with the complementary anticodon can pair with a codon, and each tRNA carries one specific amino acid. As the ribosome reads the codons in order, the amino acids are joined in the same order.",
    explanation: "Codon → specific anticodon → specific amino acid, in sequence.",
    hints: ["Link codon, anticodon and amino acid."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "The antibiotic streptomycin binds to the small subunit of bacterial 70S ribosomes and causes misreading of mRNA. Suggest why it inhibits bacterial growth but has much less effect on human cells.",
    points: [
      "Misreading means wrong amino acids are inserted, so bacterial proteins / enzymes are faulty",
      "Bacteria cannot make functional proteins needed for growth / division",
      "Human cytoplasmic ribosomes are 80S with a different structure, so the drug binds them much less",
    ],
    modelAnswer: "Misreading puts the wrong amino acids into bacterial polypeptides, so their enzymes and structural proteins do not work and the bacteria cannot grow or divide. Human cytoplasmic ribosomes are larger 80S ribosomes with a different structure, so streptomycin binds them far less and human protein synthesis is little affected.",
    explanation: "Selective toxicity depends on the 70S/80S difference.",
    hints: ["Compare bacterial and human ribosomes."],
  });

  // Practice structured: from template to polypeptide, with tRNA
  const tmpl = "TACGTTCCAAAGATC";
  const m2 = mrnaFromTemplate(tmpl);
  const p2 = translate(m2);
  same(p2, ["Met", "Gln", "Gly", "Phe"]);
  const cods = m2.match(/.{3}/g);
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: `The template strand of a short section of a gene reads 3' ${groups(tmpl)} 5'.\n\n${codeTable([...cods, "GUU", "CCA", "AAG"])}`,
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Write the mRNA sequence, 5' to 3' (letters only).",
        accepted: [m2, groups(m2)],
        normalise: ["trim", "remove_whitespace"],
        wrong: ["ATGCAAGGTTTCTAG"],
        explanation: `5' ${groups(m2)} 3'.`,
      }),
      P.short({
        label: "(b)", marks: 2, stem: "Give the amino acid sequence, as three-letter names separated by hyphens.",
        accepted: [p2.join("-"), p2.join(" "), p2.join(", "), p2.join(",")],
        wrong: ["Val-Pro-Lys"],
        explanation: `${groups(m2)} → ${p2.join("-")}, stop (UAG).`,
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Give the anticodon (3' to 5') of the tRNA that carries the second amino acid.",
        accepted: [anticodon(cods[1])],
        wrong: [cods[1], "GTT"],
        explanation: `The second codon is ${cods[1]}; its anticodon is ${anticodon(cods[1])}, the same as the template triplet GTT with U for T.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why only four amino acids are coded for by these 15 bases.",
        points: ["15 bases form five codons (triplet, non-overlapping code)", "The fifth codon (UAG) is a stop codon, which codes for no amino acid"],
        modelAnswer: "The code is a non-overlapping triplet code, so 15 bases form five codons. The last codon, UAG, is a stop codon and codes for no amino acid, so only four amino acids are joined.",
      }),
    ],
    explanation: "Transcribe, decode in triplets, pair anticodons; stop codons add no amino acid.",
    hints: ["Transcribe the template before using the table.", "Anticodon = complement of the codon."],
  });
  same(anticodon(cods[1]), "GUU");
  for (const c of cods) if (!CODE[c]) throw new Error(c);

  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "An electron micrograph of a cell from a lactating mammary gland shows many ribosomes attached to rough endoplasmic reticulum. In places, five to eight ribosomes are seen spaced along a single thread.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the structure formed by several ribosomes along one thread.",
        accepted: ["polysome", "polyribosome", "polysomes", "polyribosomes"],
        wrong: ["nucleosome"],
        explanation: "A polysome (polyribosome).",
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the molecule that forms the thread.",
        accepted: ["mRNA", "messenger RNA", "mrna"],
        wrong: ["tRNA", "DNA"],
        explanation: "The ribosomes are translating one mRNA molecule.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why these cells have a large amount of rough endoplasmic reticulum with many ribosomes.",
        points: ["The cells secrete large amounts of protein (milk proteins)", "Ribosomes on RER make proteins that enter the ER for transport to the Golgi and secretion by exocytosis"],
        modelAnswer: "Mammary cells secrete large quantities of milk proteins. Proteins for secretion are made by ribosomes on the RER, enter the ER and are sent to the Golgi body for packaging and exocytosis.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why all the ribosomes on one thread produce identical polypeptides.",
        points: ["They all read the same mRNA codon sequence", "Each codon is always paired by a tRNA carrying the same specific amino acid, so the amino acid sequence is the same"],
        modelAnswer: "Every ribosome reads the same sequence of codons on the same mRNA, and each codon is paired by a tRNA carrying the same specific amino acid, so each ribosome builds the same amino acid sequence.",
      }),
    ],
    explanation: "Polysomes on RER make many copies of secretory proteins from one mRNA.",
    hints: ["What do ribosomes on RER usually make?"],
  });

  b.card("DEFINITION", "Define **translation**.", "Synthesis of a polypeptide on a ribosome, with mRNA codons determining the amino acid order via tRNA anticodons.");
  b.card("DEFINITION", "What is an **anticodon**?", "Three bases on tRNA complementary to an mRNA codon.");
  b.card("CONCEPT", "Amino acid activation", "A specific enzyme attaches each amino acid to its tRNA, using ATP.");
  b.card("FACT", "How many tRNAs fit in a ribosome at once?", "Two, so a peptide bond can form between their amino acids.");
  b.card("FACT", "What catalyses peptide bond formation?", "The large ribosomal subunit (rRNA).");
  b.card("CONCEPT", "Termination of translation", "A stop codon (UAA, UAG, UGA) has no tRNA; the polypeptide is released.");
  b.card("DEFINITION", "What is a **polysome**?", "Several ribosomes translating the same mRNA at once, making many copies of one polypeptide.");
  b.card("FACT", "Ribosome sizes", "80S in eukaryotic cytoplasm; 70S in prokaryotes, mitochondria and chloroplasts.");
  b.card("CONCEPT", "Flow of genetic information", "DNA → (transcription) → mRNA → (translation) → polypeptide.");
});
