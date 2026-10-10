// W1b: the genetic code and transcription.
import { concept, P, t, chk, same, table } from "../lib.mjs";
import { CODE, translate, mrnaFromTemplate, codonRows } from "../tables/w1b-code.mjs";

const groups = (s) => s.match(/.{1,3}/g).join(" ");

concept("abio.nucleic.transcription", { file: "nucleic/transcription", keyPrefix: "nucleic.transcription" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which enzyme catalyses transcription?",
    options: [
      ["RNA polymerase", "Correct: it joins RNA nucleotides complementary to the template strand."],
      ["DNA polymerase", "DNA polymerase replicates DNA."],
      ["DNA ligase", "Ligase joins DNA fragments in replication."],
      ["Reverse transcriptase", "Reverse transcriptase makes DNA from RNA (in retroviruses such as HIV)."],
    ],
    answer: "A",
    explanation: "**RNA polymerase** unwinds a section of DNA and builds RNA complementary to the template strand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The genetic code is described as degenerate. What does this mean?",
    options: [
      ["Most amino acids are coded for by more than one codon", "Correct: for example, glycine has four codons."],
      ["Each base is part of more than one codon", "This would be an overlapping code; the code is non-overlapping."],
      ["The same codon codes for different amino acids in different organisms", "The code is universal: codons mean the same in almost all organisms."],
      ["Some codons code for more than one amino acid", "Each codon codes for only one amino acid (or stop)."],
    ],
    answer: "A",
    explanation: "64 codons code for 20 amino acids and stop signals, so most amino acids have **several codons**. That is degeneracy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A DNA template strand has the base sequence 3' TAC GGT 5'. What is the sequence of the mRNA transcribed from it?",
    options: [
      ["5' AUG CCA 3'", "Correct: T→A, A→U, C→G, G→C, G→C, T→A."],
      ["5' ATG CCA 3'", "mRNA contains uracil, not thymine."],
      ["5' UAC GGU 3'", "This copies the template, replacing T with U; it must be complementary."],
      ["5' TAC GGT 3'", "This repeats the template strand unchanged."],
    ],
    answer: "A",
    explanation: "Pair each template base: T-A, A-U, C-G, G-C, G-C, T-A → **AUG CCA**.",
  });
  same(mrnaFromTemplate("TACGGT"), "AUGCCA");
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is removed from a eukaryotic primary transcript to form mature mRNA?",
    options: [
      ["Introns", "Correct: non-coding introns are cut out and the exons are joined."],
      ["Exons", "Exons are kept and joined together."],
      ["Codons", "Codons are the triplets of the mRNA itself."],
      ["Anticodons", "Anticodons are on tRNA, not mRNA."],
    ],
    answer: "A",
    explanation: "**Introns** are removed and **exons** are spliced together.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why must the genetic code be at least a triplet code?",
    options: [
      ["A doublet code gives only 16 combinations, too few for 20 amino acids", "Correct: 4² = 16 < 20, while 4³ = 64 ≥ 20."],
      ["There are three types of RNA in a cell", "The number of RNA types does not determine codon length."],
      ["Each amino acid contains three types of atom", "Amino acids contain more than three elements; this is unrelated."],
      ["DNA has three hydrogen bonds between each cytosine and guanine pair", "Hydrogen bonding does not determine codon length."],
    ],
    answer: "A",
    explanation: "With four bases, doublets give 4² = 16 codons (fewer than 20 amino acids); triplets give **4³ = 64**, enough with spares (degeneracy).",
    hints: ["How many combinations do four bases give in groups of two? Of three?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A human gene for insulin, inserted into a bacterium, produces human insulin. Which feature of the genetic code makes this possible?",
    options: [
      ["It is universal", "Correct: bacterial ribosomes read the codons the same way as human ones."],
      ["It is degenerate", "Degeneracy means several codons per amino acid; it does not explain cross-species expression."],
      ["It is non-overlapping", "Non-overlap is about how codons are read, not across species."],
      ["It has three stop codons", "Stop codons end translation; they do not explain cross-species expression."],
    ],
    answer: "A",
    explanation: "The code is **universal**, so the same codons specify the same amino acids in bacteria and humans. (Introns must first be removed, so a cDNA copy of the mRNA is used.)",
    hints: ["Would a bacterial ribosome read the human codons correctly?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The coding (non-transcribed) strand of a section of DNA is 5' ATGTTCGGA 3'. What is the mRNA sequence?",
    options: [
      ["5' AUGUUCGGA 3'", "Correct: mRNA has the same sequence as the coding strand, with U in place of T."],
      ["5' UACAAGCCU 3'", "This is complementary to the coding strand; the mRNA is complementary to the template strand instead."],
      ["5' TACAAGCCT 3'", "This is the template strand with its 5' and 3' ends mislabelled, and mRNA cannot contain T."],
      ["5' ATGTTCGGA 3'", "mRNA contains uracil, not thymine."],
    ],
    answer: "A",
    explanation: "The mRNA is complementary to the template strand, so it matches the **coding strand**, with U for T: AUG UUC GGA.",
    hints: ["Which strand does the mRNA resemble?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "AUG is a start codon and also codes for the amino acid methionine.",
    answer: true,
    explanation: "True. Translation usually starts at AUG, so most polypeptides begin with methionine (often removed later).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "During transcription, both strands of a gene are copied into RNA.",
    answer: false,
    explanation: "False. Only the **template strand** is transcribed. The other (coding) strand has the same sequence as the mRNA, with T for U.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of the genetic code with its meaning.",
    pairs: [
      ["Triplet", "Three bases code for one amino acid"],
      ["Degenerate", "Most amino acids have more than one codon"],
      ["Non-overlapping", "Each base belongs to only one codon"],
      ["Universal", "The same codons code for the same amino acids in almost all organisms"],
    ],
    explanation: "These four features, plus start and stop codons, describe the genetic code.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "In transcription, adenine in the DNA template pairs with {{blank:a}} in RNA. RNA nucleotides are joined by {{blank:b}} bonds. In eukaryotes the first RNA made is called the {{blank:c}} transcript.",
    blanks: [
      { id: "a", accepted: ["uracil"], choices: ["uracil", "thymine", "adenine", "guanine"] },
      { id: "b", accepted: ["phosphodiester"], choices: ["phosphodiester", "hydrogen", "peptide"] },
      { id: "c", accepted: ["primary"], choices: ["primary", "mature", "secondary"] },
    ],
    explanation: "A-U pairing; phosphodiester bonds; primary transcript (pre-mRNA).",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the term for joining exons together after introns have been removed from pre-mRNA.",
    accepted: ["splicing", "RNA splicing", "splicing of exons"],
    wrong: ["transcription", "translation"],
    explanation: "**Splicing** joins exons to form mature mRNA.",
  });

  // Short: mRNA from template (auto-marked)
  const tmpl = "TACAAACCGATT";
  const m = mrnaFromTemplate(tmpl);
  same(m, "AUGUUUGGCUAA");
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "The template strand of a short gene reads 3' TACAAACCGATT 5'. Write the mRNA sequence from 5' to 3' (letters only).",
    accepted: [m, `5' ${m} 3'`, groups(m)],
    normalise: ["trim", "remove_whitespace"],
    wrong: ["ATGTTTGGCTAA", "UACAAACCGAUU"],
    explanation: `Complementary RNA bases (A pairs with U): 5' ${groups(m)} 3'. Writing T instead of U, or copying the template with U for T, are the common errors.`,
    hints: ["T in DNA pairs with A; A in DNA pairs with U."],
  });

  // Numerical: polypeptide length from pre-mRNA with introns
  const pre = 2880;
  const introns = [390, 615, 255];
  const mature = pre - introns.reduce((a, x) => a + x, 0);
  const aa = mature / 3 - 1;
  chk(mature, 1620);
  chk(aa, 539);
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A primary transcript is 2880 nucleotides long and contains three introns of 390, 615 and 255 nucleotides. Assuming the whole of the mature mRNA is translated, ending with one stop codon, how many amino acids are in the polypeptide?",
    value: aa,
    wrong: [mature / 3, pre / 3 - 1],
    explanation: t`1. Introns $= 390 + 615 + 255 = 1260$ nucleotides.
2. Mature mRNA $= 2880 - 1260 = ${mature}$ nucleotides.
3. Codons $= ${mature} \div 3 = ${mature / 3}$.
4. Subtract the stop codon: ${aa} amino acids. Forgetting to remove the introns gives ${pre / 3 - 1}; forgetting the stop codon gives ${mature / 3}.`,
    hints: ["Remove the introns first.", "A stop codon codes for no amino acid."],
  });

  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 5,
    stem: "Describe the process of transcription in a eukaryotic cell.",
    points: [
      "RNA polymerase binds to DNA at the start of the gene; DNA unwinds and hydrogen bonds between bases break",
      "Only one strand (the template strand) is used",
      "Free RNA nucleotides pair with exposed DNA bases by complementary base pairing (U with A, A with T, C with G)",
      "RNA polymerase joins the nucleotides by phosphodiester bonds, forming pre-mRNA / primary transcript",
      "Introns are removed and exons spliced to form mature mRNA, which leaves through a nuclear pore",
    ],
    modelAnswer: "RNA polymerase attaches to the DNA at the start of a gene, and a section of the double helix unwinds as hydrogen bonds between the bases break. Only the template strand is read. Free RNA nucleotides pair with the exposed bases by complementary base pairing, with uracil pairing with adenine. RNA polymerase joins them by phosphodiester bonds to make a primary transcript. Introns are then removed and the exons spliced together to form mature mRNA, which leaves the nucleus through a nuclear pore.",
    explanation: "Enzyme, unwinding, template strand, pairing (with U), phosphodiester bonds, splicing.",
    hints: ["Include what happens after the primary transcript is made."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a mutation in an intron usually has no effect on the polypeptide produced.",
    points: [
      "Introns are non-coding",
      "They are removed from the primary transcript before translation / are not in mature mRNA",
      "So the codon sequence of the mRNA, and therefore the amino acid sequence, is unchanged",
    ],
    modelAnswer: "Introns do not code for amino acids and are cut out of the primary transcript during splicing. A change in an intron is therefore not present in the mature mRNA, so the codons, and the amino acid sequence, are unchanged.",
    explanation: "The change is removed with the intron (unless it affects a splice site).",
    hints: ["What happens to introns before translation?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "A gene is 6000 base pairs long, but the polypeptide it codes for contains only 420 amino acids. Suggest reasons for the difference.",
    points: [
      "The gene contains introns that are removed and not translated",
      "Each amino acid needs three bases, so only 1263 bases (420 × 3 plus a stop codon) code for amino acids",
      "Non-translated regions (e.g. promoter / start and end sequences / regions before the start codon and after the stop codon)",
    ],
    modelAnswer: "Each amino acid is coded by three bases, so 420 amino acids need only 1260 bases plus a stop codon. The rest of the gene includes introns, which are removed from the primary transcript, and regulatory and untranslated sequences, such as the promoter and regions before the start codon and after the stop codon.",
    explanation: "Triplet code, introns and non-translated regions.",
    hints: ["How many bases code for 420 amino acids?"],
  });
  chk(420 * 3 + 3, 1263);

  // Practice structured: transcribe and decode with a given table
  const tmpl2 = "TACCTTGGTAGACAAACT";
  const m2 = mrnaFromTemplate(tmpl2);
  const pep = translate(m2);
  same(pep, ["Met", "Glu", "Pro", "Ser", "Val"]);
  const used = m2.match(/.{3}/g);
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: `Part of the template strand of a gene reads:\n\n3' ${groups(tmpl2)} 5'\n\nPart of the genetic code (mRNA codons) is given below.\n\n${table(["Codon", "Amino acid"], [...codonRows([...used, "GGU", "CCA", "UCA"])].map(([c, a]) => [c, a === "Stop" ? "stop" : a]))}`,
    parts: [
      P.short({
        label: "(a)", marks: 2, stem: "Write the mRNA sequence transcribed from this template, 5' to 3' (letters only).",
        accepted: [m2, groups(m2)],
        normalise: ["trim", "remove_whitespace"],
        wrong: ["ATGGAACCATCTGTTTGA"],
        explanation: `5' ${groups(m2)} 3'.`,
      }),
      P.short({
        label: "(b)", marks: 2, stem: "Use the table to give the amino acid sequence coded for. Write the three-letter names separated by hyphens.",
        accepted: [pep.join("-"), pep.join(" "), pep.join(", "), pep.join(",")],
        wrong: ["Met-Glu-Pro-Ser-Val-Stop"],
        explanation: `${groups(m2)} → ${pep.join("-")}; UGA is a stop codon.`,
      }),
      P.num({
        label: "(c)", marks: 1, stem: "How many different codons in this mRNA code for amino acids?",
        value: pep.length, wrong: [used.length],
        explanation: `Five codons code for amino acids; the sixth (UGA) is a stop codon.`,
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "State the sequence of the non-transcribed (coding) strand of this DNA, 5' to 3'.",
        points: ["5' ATG GAA CCA TCT GTT TGA 3' (same as mRNA with T for U)"],
        modelAnswer: "5' ATGGAACCATCTGTTTGA 3'",
      }),
    ],
    explanation: "Template → complementary mRNA (with U) → codons read in threes to the stop codon.",
    hints: ["Pair A with U, not T.", "Read the mRNA in groups of three from the 5' end."],
  });
  for (const c of used) if (!CODE[c]) throw new Error(c);

  b.struct({
    d: 4, skill: "UNDERSTANDING",
    stem: "In a eukaryotic cell, the gene for a digestive enzyme is transcribed in the nucleus. The primary transcript contains four exons and three introns.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement about the mature mRNA is correct?",
        options: [
          ["It contains the four exons joined together", "Correct: introns are removed and exons spliced."],
          ["It contains the three introns joined together", "Introns are removed, not kept."],
          ["It is double-stranded", "mRNA is single-stranded."],
          ["It contains thymine", "RNA contains uracil, not thymine."],
        ],
        answer: "A",
        explanation: "Splicing removes introns and joins exons.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why mRNA, and not DNA, travels to the ribosomes.",
        points: ["DNA is too large to pass through nuclear pores / stays in the nucleus where it is protected", "mRNA is a small, single-stranded copy of one gene that can leave through nuclear pores"],
        modelAnswer: "DNA is very large and stays protected in the nucleus; mRNA is a short single-stranded copy of just one gene, small enough to pass through the nuclear pores to the ribosomes.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the strand of DNA that RNA polymerase reads.",
        accepted: ["template strand", "template", "transcribed strand", "antisense strand"],
        wrong: ["coding strand"],
        explanation: "The template (transcribed, antisense) strand.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest an advantage of genes containing several exons.",
        points: ["Exons can be spliced in different combinations (alternative splicing)", "So one gene can code for more than one polypeptide"],
        modelAnswer: "The exons can be joined in different combinations, so one gene can produce more than one version of a polypeptide.",
      }),
    ],
    explanation: "Primary transcript → splicing → mature mRNA leaves the nucleus.",
    hints: ["What is removed during splicing?"],
  });

  b.card("DEFINITION", "Define a **gene**.", "A sequence of nucleotides in DNA that codes for a polypeptide.");
  b.card("DEFINITION", "What is a **codon**?", "Three bases in mRNA coding for one amino acid, or a start or stop signal.");
  b.card("CONCEPT", "Features of the genetic code", "Triplet, degenerate, non-overlapping, universal; start codon AUG; stop codons UAA, UAG, UGA.");
  b.card("FACT", "Enzyme of transcription", "RNA polymerase.");
  b.card("DEFINITION", "Template versus coding strand", "Template (transcribed) strand is read; the coding strand has the same sequence as mRNA, with T for U.");
  b.card("DEFINITION", "Introns and exons", "Introns: non-coding, removed from pre-mRNA. Exons: kept and spliced to form mature mRNA.");
  b.card("FACT", "Stop codons", "UAA, UAG and UGA: code for no amino acid.");
  b.card("CONCEPT", "Why a triplet code?", "4² = 16 doublets are too few for 20 amino acids; 4³ = 64 triplets are enough.");
  b.card("FACT", "Base pairing in transcription", "DNA A → RNA U; T → A; C → G; G → C.");
});
