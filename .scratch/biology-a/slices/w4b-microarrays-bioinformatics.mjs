// W4b: microarrays and bioinformatics databases (Cambridge only, A Level).
import { concept, P, t, chk, table, dpStr } from "../lib.mjs";

const identity = (a, b) => {
  if (a.length !== b.length) throw new Error("identity: lengths differ");
  let same = 0;
  for (let i = 0; i < a.length; i++) if (a[i] === b[i]) same++;
  return { same, pct: (same / a.length) * 100 };
};

concept("abio.genetech.microarrays-bioinformatics", { file: "genetech/microarrays-bioinformatics", keyPrefix: "genetech.microarrays-bioinformatics" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is attached to each spot of a DNA microarray?",
    options: [
      ["Copies of one single-stranded DNA probe", "Correct."],
      ["Antibodies against one particular protein", "That would be a protein array."],
      ["A single mRNA molecule from the sample", "The sample is applied later; probes are fixed DNA."],
      ["One fluorescent dye of a single colour", "Dyes label the sample, not the spots."],
    ],
    answer: "A",
    explanation: "Each spot holds many copies of one known single-stranded DNA sequence (probe).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is mRNA from cells converted into cDNA before it is applied to a microarray to study gene expression?",
    options: [
      ["cDNA is more stable and is easily labelled", "Correct."],
      ["cDNA contains the introns needed for hybridisation to work", "cDNA from mRNA lacks introns."],
      ["mRNA cannot form hydrogen bonds with DNA bases at all", "RNA can pair with DNA; stability is the main reason."],
      ["cDNA is translated into protein that binds to each spot", "Nothing is translated on the array."],
    ],
    answer: "A",
    explanation: "Reverse transcriptase makes stable cDNA copies, labelled with fluorescent dye, which hybridise with complementary probes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Tumour cDNA is labelled red and normal cDNA green, mixed and hybridised to one array. A spot appears yellow. What does this show?",
    options: [
      ["The gene is expressed equally in both samples", "Correct: red + green = yellow."],
      ["The gene is expressed only in the tumour cells", "That would give a red spot."],
      ["The gene is expressed only in the normal cells", "That would give a green spot."],
      ["The gene is expressed in neither of the two samples", "That would give a dark spot."],
    ],
    answer: "A",
    explanation: "Equal binding of red and green cDNA produces yellow fluorescence.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is unbound labelled DNA washed off the microarray before it is scanned?",
    options: [
      ["So only DNA bound to probes gives fluorescence", "Correct."],
      ["So that the probes can be relabelled with a second dye", "Probes are not relabelled."],
      ["So that the DNA can be denatured at the correct temperature", "Washing is not to denature DNA."],
      ["So that the scanner laser does not damage the glass", "Washing does not protect the slide."],
    ],
    answer: "A",
    explanation: "Unbound labelled DNA would fluoresce everywhere, hiding which spots really hybridised.",
    hints: ["What would the scanner see if the unbound DNA stayed?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A scientist has the amino acid sequence of a newly discovered protein. Which use of a database would best suggest its function?",
    options: [
      ["Finding known proteins with similar sequences", "Correct: similar sequences often have similar functions."],
      ["Searching for organisms that live in the same kind of habitat", "Habitat data do not reveal protein function."],
      ["Counting the number of amino acids in the protein", "Length alone says little about function."],
      ["Finding the mass of DNA in the cell nucleus", "Unrelated to the protein's function."],
    ],
    answer: "A",
    explanation: "Sequence comparison finds related proteins whose functions are known.",
    hints: ["What would a related protein share?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How can a database of protein structures help in designing a new drug?",
    options: [
      ["It shows the shape of the target's binding site", "Correct."],
      ["It lists the base sequences of every gene in the human genome", "That is a genome database."],
      ["It records which patients have been given each drug", "That is a medical record, not a structure database."],
      ["It shows which genes are switched on in each tissue", "That comes from expression studies."],
    ],
    answer: "A",
    explanation: "Knowing the 3D shape of an active or binding site lets chemists design molecules that fit it.",
    hints: ["Drugs work by binding to proteins."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a microarray comparing infected (red) and uninfected (green) leaf cells, a spot gives red 300 and green 2700 units. Which conclusion is correct?",
    options: [
      ["Infected cells express it at one ninth the normal level", "Correct: 300 ÷ 2700."],
      ["The gene is expressed nine times more in the infected leaf cells", "This inverts the ratio."],
      ["The gene is expressed equally in both types of cell", "The intensities differ ninefold."],
      ["The gene is absent from the genome of the infected cells", "Low expression does not mean the gene is missing."],
    ],
    answer: "A",
    explanation: "Red : green = 300 : 2700 = 1 : 9, so expression is down-regulated in infected cells.",
    hints: ["Which colour is the infected sample?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Why does a microarray show which genes are being transcribed, but not necessarily how much of each protein is made?",
    options: [
      ["Translation and protein breakdown also vary", "Correct."],
      ["Microarrays detect proteins only, not nucleic acids", "Microarrays detect nucleic acids."],
      ["All mRNA molecules are translated at exactly the same rate", "If so, mRNA would predict protein well."],
      ["Genes on microarrays have no promoters, so are never transcribed", "Transcription happens in the cells, not on the array."],
    ],
    answer: "A",
    explanation: "Protein amount also depends on the rate of translation, post-translational control and protein breakdown.",
    hints: ["What happens between mRNA and protein?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a microarray, the position of each spot tells the scientist which gene's probe it carries.",
    answer: true,
    explanation: "True. The probes are arranged in a known grid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A dark spot on a two-colour gene-expression microarray shows that the gene is strongly expressed in both samples.",
    answer: false,
    explanation: "False. A dark spot means little or no labelled cDNA bound: the gene is expressed in neither sample.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of database with a use.",
    pairs: [
      ["Nucleotide sequences", "Designing primers for PCR"],
      ["Whole genomes", "Identifying all the genes of a pathogen"],
      ["Amino acid sequences", "Predicting the function of a new protein"],
      ["Protein structures", "Designing a drug to fit an active site"],
    ],
    explanation: "Each kind of data supports a different kind of research.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Labelled single-stranded DNA binds to complementary probes on the array by {{blank:a}}. The array is then scanned with a {{blank:b}}, and the {{blank:c}} of each spot shows how much DNA has bound.",
    blanks: [
      { id: "a", accepted: ["hybridisation"], choices: ["hybridisation", "ligation", "denaturation"] },
      { id: "b", accepted: ["laser"], choices: ["laser", "microscope slide", "centrifuge"] },
      { id: "c", accepted: ["brightness"], choices: ["brightness", "size", "position"] },
    ],
    explanation: "Hybridisation, laser scanning, fluorescence intensity.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the enzyme used to make labelled cDNA from the mRNA extracted from cells.",
    accepted: ["reverse transcriptase"],
    wrong: ["DNA polymerase"],
    explanation: "**Reverse transcriptase**.",
  });

  // Numerical: ratio and percentage identity (new data)
  const red = 1950, green = 650;
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A spot gives a red (test) intensity of ${red} and a green (control) intensity of ${green}. Calculate the red : green ratio.`,
    value: red / green, wrong: [Math.round((green / red) * 1000) / 1000],
    explanation: `${red} ÷ ${green} = ${red / green}: the gene is expressed three times more in the test sample.`,
  });
  const s1 = "GCTAGGCATTCAGGTACCAT";
  const s2 = "GCTTGGCATACAGGTACGAT";
  const id = identity(s1, s2);
  calc({
    d: 3, skill: "APPLICATION",
    stem: `Two aligned 20-base sequences from related species are:\n\n5'-${s1}-3'\n\n5'-${s2}-3'\n\nCalculate the percentage identity of the two sequences.`,
    value: id.pct, unit: "%", wrong: [((s1.length - id.same) / s1.length) * 100],
    explanation: t`1. Compare base by base: they differ at ${s1.length - id.same} positions.
2. Identical positions $= ${s1.length} - ${s1.length - id.same} = ${id.same}$.
3. Percentage identity $= \dfrac{${id.same}}{${s1.length}} \times 100 = ${id.pct}\%$. ${((s1.length - id.same) / s1.length) * 100}% is the percentage that differs.`,
    hints: ["Count the positions where the bases differ."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Outline how a microarray can be used to compare gene expression in drought-stressed and well-watered maize leaves.",
    points: [
      "Extract mRNA from leaves of each group",
      "Make cDNA with reverse transcriptase, labelling each group with a different fluorescent dye (e.g. red and green)",
      "Mix and hybridise to an array of probes for many maize genes; complementary cDNA binds",
      "Wash off unbound cDNA and scan with a laser",
      "Spot colour / intensity ratio shows genes up- or down-regulated by drought (red, green, yellow)",
    ],
    modelAnswer: "mRNA is extracted from leaves of drought-stressed and well-watered plants. Reverse transcriptase makes cDNA from each, labelled red for stressed and green for watered plants. The cDNAs are mixed and hybridised to a microarray carrying probes for thousands of maize genes. Unbound cDNA is washed off and the array scanned with a laser. Red spots show genes switched on more under drought, green spots genes switched on less, and yellow spots genes expressed equally.",
    explanation: "Extract, label, hybridise, wash, scan, interpret.",
    hints: ["Start from the mRNA."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline four benefits of publicly available databases of nucleotide and protein sequences.",
    points: [
      "Comparing sequences between species to study evolutionary relationships",
      "Identifying genes / predicting function of new genes and proteins by similarity",
      "Identifying pathogens and tracking new variants / linking alleles to disease",
      "Using protein structures to design drugs / sharing data avoids repeating work",
    ],
    modelAnswer: "Scientists can compare sequences between species to work out evolutionary relationships, and predict the function of newly discovered genes and proteins from similar known ones. Sequences of pathogens allow new strains to be identified and tracked, and alleles linked to disease to be found. Protein structures help in designing drugs, and sharing results avoids repeating work.",
    explanation: "Any four distinct benefits.",
    hints: ["Evolution, function, disease, drugs."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A spot on a two-colour microarray gives red 120 and green 110 units, while the background reading is about 100 units. Explain why the scientist should not conclude that this gene is expressed equally in both samples at a high level.",
    points: [
      "Intensities are close to the background, so the gene is barely expressed in either sample",
      "Signal minus background is very small, so the ratio is unreliable / dominated by noise",
      "Replicates or a more sensitive method are needed before concluding",
    ],
    modelAnswer: "Both intensities are only just above the background of about 100 units, so the gene is expressed very little in either sample. After subtracting background the signals are tiny, so the ratio is dominated by noise and is unreliable. Replicate arrays or another method would be needed.",
    explanation: "Check intensity against background, not just the colour.",
    hints: ["Compare the readings with the background."],
  });

  // Practice structured: expression table
  const genes = ["P", "Q", "R", "S", "T"];
  const R = [5200, 400, 1800, 90, 3000];
  const G = [1300, 3200, 1750, 85, 750];
  const ratios = R.map((x, i) => x / G[i]);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `cDNA from root cells of a salt-tolerant sorghum variety was labelled red and cDNA from a salt-sensitive variety labelled green, after both were grown in salty soil. The two were hybridised to the same microarray.\n\n${table(["Gene", ...genes], [["Red intensity", ...R.map(String)], ["Green intensity", ...G.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the red : green ratio for gene P.",
        value: ratios[0], wrong: [G[0] / R[0]],
        explanation: `${R[0]} ÷ ${G[0]} = ${ratios[0]}.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which gene is expressed most strongly in the salt-sensitive variety relative to the tolerant one?",
        options: [
          ["Q", "Correct: ratio 400 : 3200 = 0.125."],
          ["P", "P is expressed more in the tolerant (red) variety."],
          ["R", "R is expressed about equally."],
          ["T", "T is expressed more in the tolerant variety."],
        ],
        answer: "A",
        explanation: "Q has by far the lowest red : green ratio.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest the colour of the spots for genes R and S, and what each shows.",
        points: ["R: yellow, bright; expressed about equally (and highly) in both", "S: dark (very low intensity); expressed little in either, so the ratio is unreliable"],
        modelAnswer: "Gene R gives a bright yellow spot: it is expressed strongly and about equally in both varieties. Gene S gives a very dim spot, near background: it is hardly expressed in either, so its ratio is not meaningful.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest how these results could help plant breeders.",
        points: ["Genes such as P and T, more highly expressed in the tolerant variety, may be involved in salt tolerance", "Breeders could select plants with these alleles / use them as markers / transfer them to other varieties"],
        modelAnswer: "Genes P and T are expressed much more in the tolerant variety, so they may contribute to salt tolerance. Breeders could select for plants carrying these alleles, use them as markers in breeding, or transfer them to other varieties.",
      }),
    ],
    explanation: "Ratios identify up- and down-regulated genes; intensity matters too.",
    hints: ["Red = tolerant; green = sensitive."],
    calculator: true,
  });
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "A new strain of a bacterium causing pneumonia is found in a hospital. Its genome is sequenced and compared with genome sequences of other strains stored in a public database.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain how comparing sequences could show which known strain the new strain is most closely related to.",
        points: ["Align the new sequence with stored sequences and calculate similarity / percentage identity", "Strain with the most similar sequence (fewest differences) shares the most recent common ancestor"],
        modelAnswer: "The new genome is aligned with those in the database and the percentage of identical bases calculated. The strain with the fewest differences is the most closely related, sharing the most recent common ancestor.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest how the database could help doctors choose a treatment.",
        points: ["Search the new genome for known antibiotic-resistance genes / sequences", "Choose an antibiotic to which no resistance gene is found / which worked against the closest related strain"],
        modelAnswer: "The new genome can be searched for sequences matching known antibiotic-resistance genes. Doctors can then choose an antibiotic for which no resistance gene is present, or one that is effective against the closest related strain.",
      }),
      P.mcq({
        label: "(c)", stem: "Which database would be used to design a drug that binds to a newly identified bacterial enzyme?",
        options: [
          ["A database of protein structures", "Correct: shows the shape of binding sites."],
          ["A database of human genome sequences", "Human sequences do not show the bacterial enzyme's shape."],
          ["A database of hospital admissions", "Not a bioinformatics resource for drug design."],
          ["A database of plant gene expression", "Unrelated to the bacterial enzyme."],
        ],
        answer: "A",
        explanation: "3D structures allow a complementary drug molecule to be modelled.",
      }),
    ],
    explanation: "Sequence comparison for relationships, resistance genes and drug design.",
    hints: ["More similar sequences, closer relatives."],
  });

  b.card("DEFINITION", "Define **DNA microarray**.", "A slide with thousands of spots, each holding many copies of one single-stranded DNA probe in a known position.");
  b.card("DEFINITION", "Define **hybridisation**.", "Base pairing of a single-stranded nucleic acid with a complementary strand.");
  b.card("CONCEPT", "Microarray steps", "Labelled single-stranded sample → hybridise to probes → wash → laser scan → fluorescence shows presence and amount.");
  b.card("CONCEPT", "Two-colour expression array", "Red only: test sample; green only: control; yellow: equal; dark: neither.");
  b.card("FACT", "Why use cDNA for expression arrays?", "mRNA shows which genes are transcribed; it is copied into more stable, labelled cDNA by reverse transcriptase.");
  b.card("DEFINITION", "Define **bioinformatics**.", "Collection, storage and analysis of biological data (sequences, structures) using computers and databases.");
  b.card("CONCEPT", "Benefits of sequence and structure databases", "Compare sequences (evolution), identify genes and functions, track pathogens, design drugs, share data.");
  b.card("FACT", "Two uses of microarrays", "Analysing genomes (which sequences or alleles are present) and detecting mRNA (gene expression).");
});
