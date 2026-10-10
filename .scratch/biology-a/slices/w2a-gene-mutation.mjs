// W2a: gene mutations and their effects.
import { concept, P, t, ZIM, table, same } from "../lib.mjs";
import { translate, CODE, codonRows, mrnaFromTemplate } from "../tables/w2a-code.mjs";

const g = (s) => s.match(/.{1,3}/g).join(" ");
const aa = (m) => translate(m).join("-");

concept("abio.nucleic.gene-mutation", { file: "nucleic/gene-mutation", keyPrefix: "nucleic.gene-mutation" }, (b) => {
  // Sequences for the items (different from the lesson)
  const m0 = "AUGCCUAAGGAUUGCUGA"; // Met-Pro-Lys-Asp-Cys-stop
  same(aa(m0), "Met-Pro-Lys-Asp-Cys");
  const mSilent = "AUGCCCAAGGAUUGCUGA";
  same(aa(mSilent), "Met-Pro-Lys-Asp-Cys");
  const mMis = "AUGCCUAAGGAUUCCUGA";
  same(aa(mMis), "Met-Pro-Lys-Asp-Ser");
  const mNon = "AUGCCUUAGGAUUGCUGA";
  same(aa(mNon), "Met-Pro");

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a gene mutation?",
    options: [
      ["A change in the sequence of base pairs in DNA", "Correct."],
      ["A change in the number of chromosomes in a cell", "That is a chromosome mutation (e.g. aneuploidy)."],
      ["A change in the amino acid sequence caused by a faulty ribosome", "Mutations are changes in DNA, not translation errors."],
      ["A change in the phenotype caused only by the environment", "Environmental effects alone are not mutations."],
    ],
    answer: "A",
    explanation: "A gene mutation is a change in the **base sequence** of DNA.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do many substitutions in the third base of a codon have no effect on the polypeptide?",
    options: [
      ["The genetic code is degenerate", "Correct: several codons code for the same amino acid."],
      ["The third base is never transcribed", "All three bases are transcribed and read."],
      ["The code is overlapping", "The code is non-overlapping."],
      ["Ribosomes ignore the third base of every codon", "The third base matters for some amino acids (e.g. Met, Trp)."],
    ],
    answer: "A",
    explanation: "Because the code is **degenerate**, a changed third base often gives a codon for the same amino acid (a silent mutation).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of mutation is most likely to change every amino acid after the point of mutation?",
    options: [
      ["Deletion of one base", "Correct: it causes a frameshift."],
      ["Substitution of one base", "A substitution changes only one codon."],
      ["Deletion of three adjacent bases", "This removes one codon; the reading frame is unchanged."],
      ["A silent substitution", "A silent change does not alter any amino acid."],
    ],
    answer: "A",
    explanation: "Deleting one base shifts the **reading frame**, so all following codons change.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: `An mRNA reads 5' ${g(m0)} 3'. A substitution changes it to 5' ${g(mNon)} 3'. Codons: ${codonRows([...g(m0).split(" "), "UAG"]).map(([c, a]) => `${c} ${a}`).join("; ")}. What is the effect?`,
    options: [
      ["Translation stops after two amino acids", "Correct: AAG (Lys) became UAG, a stop codon."],
      ["Lysine is replaced by another amino acid", "UAG codes for no amino acid; it is a stop codon."],
      ["Every amino acid after the mutation changes", "A substitution does not cause a frameshift."],
      ["The polypeptide is unchanged", "UAG is a stop codon, so the chain is shortened."],
    ],
    answer: "A",
    explanation: `AAG → UAG creates a **stop codon** (nonsense mutation): only ${aa(mNon)} is made.`,
    hints: ["Compare the third codon in each sequence."],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In sickle cell anaemia, which amino acid replaces glutamic acid in the β-globin chain?",
    options: [
      ["Valine", "Correct: GAG → GUG in mRNA."],
      ["Glutamine", "Glutamine is a different amino acid; the change is to valine."],
      ["Glycine", "The change is to valine."],
      ["Lysine", "Lysine is not involved in the sickle cell mutation."],
    ],
    answer: "A",
    explanation: "Glutamic acid is replaced by **valine**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do red blood cells of a person with sickle cell anaemia become sickle-shaped at low oxygen concentration?",
    options: [
      ["Deoxygenated HbS molecules join into fibres", "Correct: valine's hydrophobic R group makes molecules bind each other."],
      ["The cells lose their cell surface membrane", "The membrane remains; it is distorted by fibres inside."],
      ["Haemoglobin S binds more oxygen, swelling the cells", "Sickling happens when haemoglobin S is deoxygenated."],
      ["The cells develop a rigid cellulose cell wall around them", "Animal cells do not make cellulose walls."],
    ],
    answer: "A",
    explanation: "The non-polar valine creates a hydrophobic patch; **deoxygenated** HbS molecules aggregate into fibres that distort the cell.",
    hints: ["Think about the R group of valine."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A missense mutation changes an amino acid far from the active site of an enzyme, replacing it with one with a very similar R group. What is the most likely effect?",
    options: [
      ["Little or no change in enzyme activity", "Correct: tertiary structure and active site are probably unaffected."],
      ["The enzyme is always completely inactive", "Only changes that alter the active site or folding inactivate it."],
      ["The enzyme becomes much shorter", "A missense mutation does not shorten the chain."],
      ["Every amino acid after the change is altered", "Only one amino acid is changed by a substitution."],
    ],
    answer: "A",
    explanation: "A similar R group away from the active site is unlikely to change folding, so the enzyme probably works normally.",
    hints: ["Does the shape of the active site change?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ultraviolet light and ionising radiation are examples of mutagens.",
    answer: true,
    explanation: "True. They increase the rate of mutation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A mutation in an intron always changes the amino acid sequence of the polypeptide.",
    answer: false,
    explanation: "False. Introns are removed from pre-mRNA before translation, so most intron mutations do not change the polypeptide.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: `Original mRNA: 5' ${g(m0)} 3' (${aa(m0)}). Match each mutant mRNA with the type of mutation.`,
    pairs: [
      [g(mSilent), "Silent substitution"],
      [g(mMis), "Missense substitution"],
      [g(mNon), "Nonsense substitution"],
    ],
    extraRight: ["Frameshift"],
    explanation: `CCU → CCC still codes for Pro (silent); UGC → UCC changes Cys to Ser (missense); AAG → UAG is a stop codon (nonsense). Codons: ${codonRows(["CCU", "CCC", "UGC", "UCC", "AAG", "UAG"]).map(([c, a]) => `${c} ${a}`).join(", ")}.`,
    hints: ["Translate the changed codon in each."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "In the sickle cell allele the DNA triplet {{blank:a}} on the coding strand becomes GTG, so glutamic acid is replaced by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["GAG"], choices: ["GAG", "GTA", "CTC", "GAA"] },
      { id: "b", accepted: ["valine"], choices: ["valine", "glutamine", "glycine", "lysine"] },
    ],
    explanation: "GAG → GTG; Glu → Val.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a mutation in which the insertion or deletion of a base changes every following codon.",
    accepted: ["frameshift", "frameshift mutation", "frame shift", "frame-shift", "frame shift mutation", "frame-shift mutation"],
    wrong: ["substitution", "point mutation"],
    explanation: "A **frameshift** changes the reading frame.",
  });

  // Base-sequence items computed from the code table
  const tmpl = "TACGGTTTCCTAACT"; // template 3'->5'
  const mr = mrnaFromTemplate(tmpl);
  same(mr, "AUGCCAAAGGAUUGA");
  const prot = aa(mr);
  same(prot, "Met-Pro-Lys-Asp");
  b.short({
    d: 3, skill: "APPLICATION",
    stem: `The template strand of a short gene reads 3' ${g(tmpl)} 5'. Write the mRNA it codes for, 5' to 3', without spaces.`,
    accepted: [mr, g(mr)],
    wrong: [tmpl, mr.replace(/U/g, "T")],
    explanation: `Pair each base: T→A, A→U, C→G, G→C. mRNA: 5' ${g(mr)} 3'.`,
    hints: ["Uracil replaces thymine in RNA."],
  });
  const delT = tmpl.slice(0, 4) + tmpl.slice(5); // delete base 5 of template
  const mDel = mrnaFromTemplate(delT);
  const trunc = (m) => m.slice(0, m.length - (m.length % 3));
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: `The same template strand, 3' ${g(tmpl)} 5', loses its fifth base. Using the codons ${codonRows(trunc(mDel).match(/.{3}/g)).map(([c, a]) => `${c} ${a}`).join("; ")}, which amino acid sequence is now coded?`,
    options: [
      [aa(trunc(mDel)), "Correct: the frameshift changes every codon after the deletion."],
      ["Met-Pro-Lys-Asp", "This is the original sequence; the deletion shifts the frame."],
      ["Met-Lys-Asp", "Deleting one base does not simply remove one amino acid."],
      ["Met", "The new reading frame does not create an immediate stop codon."],
    ],
    answer: "A",
    explanation: `New mRNA 5' ${g(mDel)} 3' reads ${aa(trunc(mDel))}: a **frameshift**.`,
    hints: ["Write the new mRNA, then split it into triplets from AUG."],
  });

  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how a single base substitution in the β-globin gene leads to the symptoms of sickle cell anaemia.",
    points: [
      "Substitution of one base: GAG → GTG on DNA (GAG → GUG on mRNA)",
      "Glutamic acid replaced by valine (6th amino acid of β chain), changing primary structure",
      "Valine is non-polar / hydrophobic, so HbS molecules stick together at low oxygen, forming fibres",
      "Red blood cells become sickle-shaped / rigid and block capillaries (pain, organ damage)",
      "Sickle cells are destroyed faster / carry less oxygen, causing anaemia",
    ],
    modelAnswer: "A single base substitution changes the triplet GAG to GTG, so the mRNA codon is GUG instead of GAG and valine replaces glutamic acid as the sixth amino acid of the β-globin chain. Valine has a non-polar, hydrophobic R group, so when haemoglobin S is deoxygenated its molecules stick together and form long fibres. The red blood cells become sickle-shaped and rigid, block capillaries and cause pain and organ damage, and they are destroyed faster than normal cells, causing anaemia.",
    explanation: "Base → codon → amino acid → protein behaviour → cell → symptoms.",
    hints: ["Follow the chain from DNA to symptoms."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a deletion of one base near the start of a gene usually has a greater effect than a substitution of one base.",
    points: [
      "Deletion causes a frameshift, so all codons after it are changed",
      "Many amino acids change / a stop codon may appear early, giving a non-functional protein",
      "A substitution changes only one codon, which may be silent (degenerate code) or change only one amino acid",
    ],
    modelAnswer: "Deleting one base shifts the reading frame, so every codon after it is read differently: many amino acids change and a stop codon may appear early, so the protein is non-functional. A substitution alters only one codon, which may be silent because the code is degenerate, or change just one amino acid.",
    explanation: "Frameshift versus one codon.",
    hints: ["How many codons does each mutation affect?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Suggest why poorly stored maize and groundnuts may increase the risk of mutations in people who eat them regularly.",
    points: [
      "Damp storage allows moulds (fungi such as Aspergillus) to grow",
      "Moulds produce aflatoxins, which are mutagens / carcinogens",
      "Aflatoxins alter DNA bases, increasing the rate of mutation (e.g. in liver cells)",
    ],
    modelAnswer: "If maize and groundnuts are stored damp, moulds such as Aspergillus grow on them and produce aflatoxins. Aflatoxins are mutagens: they react with DNA and alter bases, raising the rate of mutation, especially in liver cells.",
    explanation: "Storage → mould → aflatoxin → DNA damage.",
    hints: ["Which toxic products do moulds make?"],
  });

  // Practice structured: a gene and four mutants
  const c0 = "ATGGCTTGGAAAGAGTAA"; // coding strand 5'->3'
  const toM = (c) => c.replace(/T/g, "U");
  same(aa(toM(c0)), "Met-Ala-Trp-Lys-Glu");
  const cA = "ATGGCCTGGAAAGAGTAA";
  const cB = "ATGGCTTGAAAAGAGTAA";
  const cC = "ATGGCTTGGAAAGTGTAA";
  same(aa(toM(cA)), "Met-Ala-Trp-Lys-Glu");
  same(aa(toM(cB)), "Met-Ala");
  same(aa(toM(cC)), "Met-Ala-Trp-Lys-Val");
  const codonList = codonRows(["GCU", "GCC", "UGG", "UGA", "AAA", "GAG", "GUG", "AUG", "UAA"]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Part of the coding strand of a gene and three mutant versions (A, B, C) are shown, 5' to 3'.\n\n${table(["Allele", "Coding strand"], [["Original", g(c0)], ["A", g(cA)], ["B", g(cB)], ["C", g(cC)]])}\n\nmRNA codons: ${codonList.map(([c, x]) => `${c} ${x}`).join("; ")}.`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Write the amino acid sequence coded by the original allele, using three-letter abbreviations separated by hyphens.", accepted: [aa(toM(c0)), "Met Ala Trp Lys Glu", "MetAlaTrpLysGlu"], wrong: ["Met-Ala-Trp-Lys-Val"], explanation: `AUG GCU UGG AAA GAG UAA → ${aa(toM(c0))}.` }),
      P.match({
        label: "(b)", stem: "Match each mutant allele with its effect.",
        pairs: [["A", "Silent: same amino acid sequence"], ["B", "Nonsense: polypeptide stops after Ala"], ["C", "Missense: Glu replaced by Val"]],
        explanation: "A: GCT → GCC (Ala, silent). B: TGG → TGA (stop, nonsense). C: GAG → GTG (Glu → Val, missense).",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain which mutant is most likely to produce a non-functional protein.",
        points: ["B (nonsense mutation)", "Stop codon after two amino acids, so the polypeptide is very short / most of the protein missing, cannot fold correctly"],
        modelAnswer: "Mutant B: the TGG triplet has become TGA, which gives a stop codon in the mRNA, so translation stops after only two amino acids and most of the protein is missing.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Mutant C has the same change of triplet as the sickle cell allele. Suggest how this change might alter the protein's properties.",
        points: ["Glutamic acid (polar / charged R group) replaced by valine (non-polar / hydrophobic)", "May change folding / tertiary structure or surface properties, e.g. molecules stick together; function altered"],
        modelAnswer: "Glutamic acid has a charged, polar R group but valine is non-polar and hydrophobic, so the protein's folding or surface may change; for example, hydrophobic patches can make molecules stick together, altering function.",
      }),
    ],
    explanation: "Translate each codon; classify by whether the amino acid changes, stops or stays the same.",
    hints: ["Convert the coding strand to mRNA by replacing T with U."],
  });
  same(CODE.UGA, "Stop");

  b.struct({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "In a pair of identical twins, one lives at a high altitude where the partial pressure of oxygen is low and the other at sea level. Both have sickle cell trait (genotype HbA HbS).",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the genotype of a person with sickle cell anaemia, using the symbols HbA and HbS.", accepted: ["HbS HbS", "HbSHbS", "HbS/HbS", "Hb^S Hb^S"], wrong: ["HbA HbS"], explanation: "Sickle cell anaemia is homozygous HbS HbS." }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest why the twin at high altitude is more likely to show symptoms, even though both have the same genotype.",
        points: ["Lower partial pressure of oxygen means more haemoglobin is deoxygenated", "So the HbS present is more likely to form fibres and cause some cells to sickle"],
        modelAnswer: "At high altitude more of the haemoglobin is deoxygenated, so the haemoglobin S in the twin's red cells is more likely to form fibres, causing some cells to sickle.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Use this example to explain how genotype and environment together determine phenotype.",
        points: ["Same genotype gives different phenotypes in different environments: phenotype = genotype + environment interaction"],
        modelAnswer: "The twins share a genotype but differ in symptoms because of their environments, so the phenotype depends on the genotype interacting with the environment.",
      }),
    ],
    explanation: "Identical genotypes can show different phenotypes in different environments.",
    hints: ["What changes at altitude?"],
  });

  b.card("DEFINITION", "Define a **gene mutation**.", "A change in the sequence of base pairs in DNA that may alter the polypeptide.");
  b.card("CONCEPT", "Three outcomes of a substitution", "Silent (same amino acid), missense (different amino acid), nonsense (stop codon).");
  b.card("CONCEPT", "Frameshift", "Insertion or deletion of a number of bases not a multiple of three; changes every following codon.");
  b.card("FACT", "Sickle cell mutation", "Coding strand GAG → GTG (mRNA GAG → GUG); glutamic acid → valine in β-globin.");
  b.card("CONCEPT", "Why HbS causes sickling", "Hydrophobic valine makes deoxygenated HbS molecules stick into fibres, distorting red cells.");
  b.card("FACT", "Why many mutations have no effect", "Degenerate code (silent), non-coding DNA (introns), similar amino acid, recessive allele masked.");
  b.card("DEFINITION", "Define a **mutagen**.", "An agent that increases the rate of mutation, e.g. ionising radiation, UV light, some chemicals.");
  b.card("FACT", "Examples of chemical mutagens", "Some compounds in tobacco smoke; aflatoxins from moulds on poorly stored maize and groundnuts.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Phenotype", "Results from genotype interacting with the environment.");
});
