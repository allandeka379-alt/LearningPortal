// W1b: THEORY10 exam-format items (ZIMSEC Paper 2; Cambridge Paper 2 for AS concepts, Paper 4 for meiosis).
import { concept, P, t, chk, same, table, EXAM, checkExam, zeroCrossing, rnd, dpStr, chargaff, assortmentCombos, mitoticIndex } from "../lib.mjs";
import { translate, mrnaFromTemplate, anticodon, codonRows } from "../tables/w1b-code.mjs";

const A = (k) => `abio.${k}`;
const groups = (s) => s.match(/.{1,3}/g).join(" ");

concept(A("membranes.diffusion-osmosis"), { file: "exam/w1b-theory", keyPrefix: "exam.w1b-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: red blood cells and water potential
  const conc = [3.0, 3.5, 4.0, 4.5, 5.0, 6.0, 9.0];
  const lysed = [100, 97, 70, 28, 6, 1, 0];
  const half = zeroCrossing(conc, lysed.map((x) => x - 50));
  chk(rnd(half, 1), 4.2);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("membranes.diffusion-osmosis")],
    stem: `Samples of sheep blood were added to sodium chloride solutions of different concentrations. After 30 minutes the percentage of red blood cells that had burst was estimated.\n\n${table(["NaCl concentration / g dm⁻³", "Red blood cells burst / %"], conc.map((c, i) => [c.toFixed(1), lysed[i]]))}`,
    parts: checkExam(EXAM.THEORY10, [
      P.short({
        label: "(a)", marks: 1, stem: "Give the term for the bursting of red blood cells.",
        accepted: ["haemolysis", "lysis", "hemolysis", "cytolysis"],
        wrong: ["crenation", "plasmolysis"],
        explanation: "Bursting of red blood cells is haemolysis (lysis).",
      }),
      P.mcq({
        label: "(b)", stem: "Which solution has the highest water potential?",
        options: [
          ["3.0 g dm⁻³", "Correct: the most dilute solution has the highest (least negative) water potential."],
          ["9.0 g dm⁻³", "The most concentrated solution has the lowest water potential."],
          ["4.5 g dm⁻³", "This is intermediate."],
          ["6.0 g dm⁻³", "This is more concentrated, so lower water potential, than 3.0 g dm⁻³."],
        ],
        answer: "A",
        explanation: "Adding solute lowers water potential, so the most dilute solution (3.0 g dm⁻³) has the highest.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Assuming a straight line between the two nearest readings, estimate the concentration at which 50% of the cells burst. Give your answer to one decimal place.",
        value: half, dp: 1, unit: "g/dm³", wrong: [4.0, 4.5],
        explanation: t`50% lies between 4.0 (70%) and 4.5 g dm⁻³ (28%). $4.0 + 0.5 \times \dfrac{70 - 50}{70 - 28} = 4.0 + 0.5 \times 0.476 = ${dpStr(half, 2)} \approx 4.2\ \text{g dm}^{-3}$.`,
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why all the cells burst in the 3.0 g dm⁻³ solution.",
        points: [
          "The solution has a higher water potential than the cytoplasm of the cells",
          "Water enters the cells by osmosis through the partially permeable cell surface membrane",
          "Red blood cells have no cell wall, so they swell until the membrane breaks",
        ],
        modelAnswer: "The 3.0 g dm⁻³ solution has a higher water potential than the cytoplasm, so water moves into the cells by osmosis across the partially permeable cell surface membrane. Red blood cells have no cell wall to resist the increase in volume, so they swell and burst.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest why the cells did not all burst at the same concentration.",
        points: ["Cells differ, e.g. in age / membrane strength / size / cytoplasm water potential"],
        modelAnswer: "The cells vary: older cells have weaker membranes and cells differ slightly in the water potential of their cytoplasm.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: onion epidermis cells placed in the 3.0 g dm⁻³ solution would also burst.",
        answer: false,
        explanation: "False. Plant cells take in water and become turgid, but the cellulose cell wall prevents bursting.",
      }),
      P.manual({
        label: "(g)", marks: 1, stem: "Suggest why fluid given to a patient through a drip into a vein must have the same water potential as blood plasma.",
        points: ["So there is no net osmosis into or out of blood cells, which would otherwise burst or shrink (crenate)"],
        modelAnswer: "With equal water potentials there is no net movement of water, so red blood cells neither swell and burst nor shrink.",
      }),
    ]),
    explanation: "Dilute solutions have a higher water potential than cytoplasm, so water enters red cells by osmosis and, with no wall, they burst; 50% burst at about 4.2 g dm⁻³.",
    hints: ["Higher solute concentration means lower water potential.", "Interpolate between 4.0 and 4.5 g dm⁻³."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T2: active uptake by an alga
  const kIn = 54, kOut = 0.05;
  const ratio = kIn / kOut;
  chk(ratio, 1080);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("membranes.active-transport-bulk"), A("membranes.fluid-mosaic")],
    stem: "The concentrations of ions in the cell sap of a freshwater alga and in the pond water around it were measured.\n\n| Ion | Concentration in cell sap / mmol dm⁻³ | Concentration in pond water / mmol dm⁻³ |\n|---|---|---|\n| K⁺ | 54 | 0.05 |\n| Na⁺ | 10 | 0.22 |\n| Cl⁻ | 91 | 0.03 |",
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate how many times greater the K⁺ concentration is in the cell sap than in the pond water.",
        value: ratio, wrong: [rnd(kOut / kIn, 4)],
        explanation: t`$54 \div 0.05 = ${ratio}$.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which process must be responsible for the uptake of K⁺ by these cells?",
        options: [
          ["Active transport", "Correct: K⁺ is accumulated against a very large concentration gradient."],
          ["Facilitated diffusion", "Facilitated diffusion can only move ions down their gradient."],
          ["Osmosis", "Osmosis is the movement of water only."],
          ["Simple diffusion", "Ions cannot diffuse through the bilayer, and diffusion is only down the gradient."],
        ],
        answer: "A",
        explanation: "Accumulating K⁺ about a thousand times above the outside concentration requires active transport.",
      }),
      P.fib({
        label: "(c)", stem: "Complete the sentence.",
        template: "K⁺ ions are moved across the membrane by specific {{blank:a}} proteins, using energy released by the hydrolysis of {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["carrier"], choices: ["carrier", "channel", "receptor", "glyco"] },
          { id: "b", accepted: ["ATP"], choices: ["ATP", "ADP", "glucose", "DNA"] },
        ],
        explanation: "Carrier proteins (pumps) use ATP.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Cyanide stops aerobic respiration. Explain what would happen to the K⁺ concentration in the cell sap if cyanide were added to the pond water.",
        points: [
          "Little / no ATP would be made (no aerobic respiration)",
          "Active transport (the carrier proteins) would stop",
          "K⁺ would leak out by diffusion down its concentration gradient, so the concentration in the sap would fall",
        ],
        modelAnswer: "Without aerobic respiration the cells make very little ATP, so the carrier proteins can no longer pump K⁺ in. K⁺ would then leak out down its steep concentration gradient, and the concentration in the cell sap would fall towards that of the pond water.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how the structure of the carrier protein allows it to remain in the phospholipid bilayer.",
        points: ["Regions with hydrophobic / non-polar R groups lie within the hydrophobic core of the bilayer (interacting with fatty acid tails)", "Regions with hydrophilic / polar R groups face the water on either side of the membrane"],
        modelAnswer: "The part of the protein that crosses the membrane has amino acids with non-polar R groups, which interact with the hydrophobic fatty acid tails; the parts exposed to cytoplasm and pond water have polar R groups that interact with water.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: the data show that the membrane of this alga is fully permeable to chloride ions.",
        answer: false,
        explanation: "False. If the membrane were fully permeable, Cl⁻ would quickly reach equal concentrations on both sides; it is about 3000 times more concentrated inside.",
      }),
    ]),
    explanation: "Ions accumulated against large gradients show active transport by carrier proteins using ATP; stopping respiration stops uptake.",
    hints: ["Compare the concentrations inside and outside.", "Which process needs ATP?"],
    calculator: true,
  });

  // ---------------------------------------------------------------- T3: mitotic index and a spindle inhibitor
  const ctrl = { I: 352, P: 26, M: 10, A: 5, T: 7 };
  const trt = { I: 316, P: 24, M: 56, A: 0, T: 4 };
  const tot = (o) => o.I + o.P + o.M + o.A + o.T;
  const mi = (o) => mitoticIndex(o.P + o.M + o.A + o.T, tot(o));
  chk(tot(ctrl), 400);
  chk(tot(trt), 400);
  chk(mi(ctrl), 0.12);
  chk(mi(trt), 0.21);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("division.mitosis"), A("division.chromosomes-cell-cycle")],
    stem: `Garlic roots were grown in water (control) or in a solution of a chemical X for 4 hours. Root tip squashes were stained and 400 cells were classified in each.\n\n${table(["Stage", "Interphase", "Prophase", "Metaphase", "Anaphase", "Telophase"], [["Control", ctrl.I, ctrl.P, ctrl.M, ctrl.A, ctrl.T], ["Chemical X", trt.I, trt.P, trt.M, trt.A, trt.T]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.group({
        label: "(a)", stem: "Calculate the mitotic index (as a decimal, to two decimal places) for:",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "the control;", value: mi(ctrl), dp: 2, wrong: [rnd(48 / 352, 2)], explanation: t`$(26 + 10 + 5 + 7) \div 400 = 48 \div 400 = 0.12$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the roots treated with chemical X.", value: mi(trt), dp: 2, wrong: [rnd(84 / 316, 2)], explanation: t`$(24 + 56 + 0 + 4) \div 400 = 84 \div 400 = 0.21$.` }),
        ],
      }),
      P.mcq({
        label: "(b)", stem: "At which stage does chemical X appear to stop mitosis?",
        options: [
          ["Metaphase", "Correct: metaphase cells accumulate and no anaphase cells are seen."],
          ["Prophase", "Prophase numbers hardly change."],
          ["Telophase", "Telophase cells fall, because few cells get past metaphase."],
          ["Interphase", "Cells still enter mitosis, so interphase is not blocked."],
        ],
        answer: "A",
        explanation: "Metaphase rises from 10 to 56 and anaphase falls to 0, so cells are held at metaphase.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest how chemical X acts and explain the results.",
        points: [
          "X prevents formation of the spindle / microtubules (or their shortening)",
          "Chromatids cannot be separated / centromeres not pulled apart, so anaphase cannot occur",
          "Cells continue to enter mitosis but cannot leave metaphase, so they accumulate there and the mitotic index rises",
        ],
        modelAnswer: "X probably stops spindle microtubules forming or shortening. Without a working spindle, sister chromatids cannot be pulled apart, so no cell reaches anaphase. Cells keep entering mitosis from interphase but are trapped at metaphase, so metaphase cells accumulate and the mitotic index rises.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Chemicals like X are used in cancer chemotherapy. Suggest one reason why they help to treat cancer and one reason why they cause side effects.",
        points: ["They stop dividing cells completing mitosis, so tumour cells (dividing uncontrollably) cannot multiply", "They also stop division of normal rapidly dividing cells (hair follicles, gut lining, bone marrow), causing side effects"],
        modelAnswer: "Cancer cells divide uncontrollably, so blocking mitosis stops the tumour growing. But normal cells that divide often, such as in hair follicles, the gut lining and bone marrow, are also blocked, causing hair loss, nausea and anaemia or infection.",
      }),
      P.short({
        label: "(e)", marks: 1, stem: "Name the phase of the cell cycle in which DNA is replicated.",
        accepted: ["S phase", "S", "synthesis phase", "S-phase", "interphase S phase"],
        wrong: ["G2", "prophase"],
        explanation: "DNA replicates in the S phase of interphase.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: the cells held at metaphase each contain chromosomes made of two chromatids.",
        answer: true,
        explanation: "True. DNA was replicated in S phase and the chromatids have not been separated.",
      }),
    ]),
    explanation: "Chemical X blocks the spindle, trapping cells at metaphase and raising the mitotic index.",
    hints: ["Mitotic index = cells in mitosis ÷ total cells.", "Which stage increases and which disappears?"],
    calculator: true,
  });

  // ---------------------------------------------------------------- T4: base composition and replication
  const bpTotal = 2400;
  const comp = chargaff("T", 30);
  const gcPairs = bpTotal * (comp.G + comp.C) / 100;
  const atPairs = bpTotal - gcPairs;
  const hb = gcPairs * 3 + atPairs * 2;
  chk(comp.G, 20);
  chk(gcPairs, 960);
  chk(hb, 5760);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("nucleic.dna-structure"), A("nucleic.dna-replication")],
    stem: "A double-stranded DNA fragment contains 2400 base pairs. Analysis shows that 30% of its bases are thymine.",
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 1, stem: "What percentage of the bases are guanine?",
        value: comp.G, unit: "%", wrong: [70, 30],
        explanation: "A = T = 30%, so A + T = 60%; C + G = 40%; G = 20%.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "How many of the 2400 base pairs are C-G pairs?",
        value: gcPairs, wrong: [480],
        explanation: t`40% of the bases are C or G, so 40% of the base pairs are C-G: $0.40 \times 2400 = 960$.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the total number of hydrogen bonds between the two strands.",
        value: hb, wrong: [bpTotal * 2, bpTotal * 3],
        explanation: t`C-G: $960 \times 3 = 2880$. A-T: $1440 \times 2 = 2880$. Total $= 5760$.`,
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Describe how this fragment is replicated by semi-conservative replication.",
        points: [
          "Hydrogen bonds between bases break and the two strands separate (unwind)",
          "Each strand acts as a template; free DNA nucleotides pair with exposed bases by complementary base pairing",
          "DNA polymerase joins the nucleotides with phosphodiester bonds (5' to 3'); lagging strand made in fragments joined by ligase",
          "Each new molecule consists of one original strand and one new strand",
        ],
        modelAnswer: "The double helix unwinds and the hydrogen bonds between bases break, separating the strands. Each strand is a template: free DNA nucleotides pair with the exposed bases, A with T and C with G. DNA polymerase joins the nucleotides by phosphodiester bonds in the 5' to 3' direction; on the lagging strand short fragments are joined by DNA ligase. Each new molecule has one original and one new strand.",
      }),
      P.mcq({
        label: "(e)", stem: "The fragment is replicated once in a medium containing radioactively labelled thymine nucleotides. Where is the radioactivity found?",
        options: [
          ["In one strand of each of the two new molecules", "Correct: each molecule has one new (labelled) strand and one old strand."],
          ["In both strands of one molecule only", "This would be conservative replication."],
          ["In both strands of both molecules", "The original strands were not labelled."],
          ["In neither molecule, as thymine is not used", "Thymine nucleotides are used in DNA synthesis."],
        ],
        answer: "A",
        explanation: "Semi-conservative replication gives each daughter molecule one labelled new strand.",
      }),
      P.manual({
        label: "(f)", marks: 1, stem: "Explain why one of the new strands is made in short fragments.",
        points: ["DNA polymerase only adds nucleotides 5' to 3', and on the lagging template this is away from the replication fork, so synthesis must restart repeatedly"],
        modelAnswer: "DNA polymerase works only 5' to 3'. On the lagging template that direction runs away from the opening fork, so the strand is made in short pieces that are later joined.",
      }),
    ]),
    explanation: "Chargaff's rule gives the base composition; C-G pairs have three hydrogen bonds; replication is semi-conservative.",
    hints: ["A = T and C = G in double-stranded DNA.", "Count C-G and A-T pairs separately."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T5: transcription and translation
  const tmpl = "TACAGGGTGTTCACCCCTATT";
  const mrna = mrnaFromTemplate(tmpl);
  const pep = translate(mrna);
  same(pep, ["Met", "Ser", "His", "Lys", "Trp", "Gly"]);
  const cods = mrna.match(/.{3}/g);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("nucleic.transcription"), A("nucleic.translation")],
    stem: `The template strand of the start of a gene reads:\n\n3' ${groups(tmpl)} 5'\n\n${table(["mRNA codon", "Amino acid"], codonRows([...cods, "UCA", "CAA", "AAC", "UGC"]).map(([c, a]) => [c, a === "Stop" ? "stop" : a]))}`,
    parts: checkExam(EXAM.THEORY10, [
      P.short({
        label: "(a)", marks: 2, stem: "Write the mRNA sequence transcribed from this template, 5' to 3' (letters only).",
        accepted: [mrna, groups(mrna)],
        normalise: ["trim", "remove_whitespace"],
        wrong: ["ATGTCCCACAAGTGGGGATAA"],
        explanation: `5' ${groups(mrna)} 3'.`,
      }),
      P.short({
        label: "(b)", marks: 2, stem: "Give the sequence of amino acids, as three-letter names separated by hyphens.",
        accepted: [pep.join("-"), pep.join(" "), pep.join(", "), pep.join(",")],
        wrong: ["Met-Ser-His-Lys-Trp-Gly-Stop"],
        explanation: `${groups(mrna)} → ${pep.join("-")}; UAA is a stop codon.`,
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Give the anticodon (3' to 5') of the tRNA that carries lysine in this polypeptide.",
        accepted: [anticodon("AAG")],
        wrong: ["AAG", "TTC"],
        explanation: "The lysine codon here is AAG, so the anticodon is UUC.",
      }),
      P.num({
        label: "(d)", marks: 1, stem: "The full gene's mature mRNA codes for a polypeptide of 312 amino acids, ending with one stop codon. What is the minimum number of nucleotides in its coding region?",
        value: 312 * 3 + 3, wrong: [312 * 3],
        explanation: "312 × 3 + 3 (stop codon) = 939 nucleotides.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe the role of tRNA in translation.",
        points: ["Each tRNA carries a specific amino acid (attached at its 3' end, using ATP)", "Its anticodon pairs with the complementary codon on mRNA, so amino acids are placed in the order of the codons"],
        modelAnswer: "Each tRNA carries one specific amino acid, attached using energy from ATP. Its anticodon pairs with the complementary mRNA codon in the ribosome, so amino acids are brought in the order set by the codons.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State where transcription and translation take place in a eukaryotic cell, and explain why mRNA is needed to link them.",
        points: ["Transcription in the nucleus; translation on ribosomes in the cytoplasm / on RER", "DNA cannot leave the nucleus, so mRNA carries a copy of the gene through nuclear pores to the ribosomes"],
        modelAnswer: "Transcription takes place in the nucleus and translation on ribosomes in the cytoplasm. DNA stays in the nucleus, so mRNA carries a copy of the gene's base sequence out through the nuclear pores to the ribosomes.",
      }),
    ]),
    explanation: "Template → mRNA → codons → amino acids via tRNA anticodons.",
    hints: ["A in the template pairs with U in mRNA.", "Read codons in threes from AUG."],
  });
  same(anticodon("AAG"), "UUC");

  // ---------------------------------------------------------------- T6: meiosis and variation (Cambridge A Level; ZIMSEC Form 5)
  const n = 10;
  chk(assortmentCombos(n), 1024);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, paper: "ZIMSEC P2 / Cambridge P4",
    concepts: [A("division.meiosis"), A("division.genetic-variation")],
    stem: "Maize has a diploid chromosome number of 20. A cell in an anther of a maize plant contains 8 arbitrary units of DNA in G1 and goes on to divide by meiosis.",
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 1, stem: "How many chromatids does the cell contain at prophase I?",
        value: 40, wrong: [20],
        explanation: "20 chromosomes, each with two chromatids after S phase: 40.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "How many units of DNA will each cell contain at the end of meiosis II?",
        value: 4, wrong: [8, 2],
        explanation: "8 → 16 (S phase) → 8 (meiosis I) → 4 (meiosis II).",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the number of chromosome combinations possible in the gametes from independent assortment alone.",
        value: assortmentCombos(n), wrong: [assortmentCombos(20), 20],
        explanation: "n = 10, so 2¹⁰ = 1024.",
      }),
      P.mcq({
        label: "(d)", stem: "A cell in the anther shows ten bivalents arranged on the equator of a spindle. Which stage is this?",
        options: [
          ["Metaphase I", "Correct: bivalents (homologous pairs) align only in metaphase I."],
          ["Metaphase II", "In metaphase II single chromosomes line up."],
          ["Anaphase I", "In anaphase I homologues are moving apart."],
          ["Prophase II", "There are no bivalents in meiosis II."],
        ],
        answer: "A",
        explanation: "Ten bivalents on the equator = metaphase I.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain how crossing over increases genetic variation in the gametes.",
        points: [
          "In prophase I homologous chromosomes pair and non-sister chromatids form chiasmata",
          "Equivalent sections of non-sister chromatids are exchanged",
          "Producing chromatids with new combinations of alleles (recombinants), so gametes differ / linked alleles separated",
        ],
        modelAnswer: "In prophase I homologous chromosomes pair, and non-sister chromatids touch at chiasmata where they break and exchange equivalent sections. The chromatids now carry new combinations of maternal and paternal alleles, so the gametes formed are genetically different from each other and from the parent.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "State two differences between metaphase I and metaphase II.",
        points: ["Metaphase I: homologous pairs (bivalents) on the equator; metaphase II: single chromosomes", "Metaphase I: one spindle in a diploid cell; metaphase II: two spindles / in haploid cells"],
        modelAnswer: "In metaphase I bivalents line up on the equator, but in metaphase II single chromosomes do. Metaphase I takes place on one spindle in a diploid cell; metaphase II takes place on two spindles in two haploid cells.",
      }),
      P.tf({
        label: "(g)", stem: "True or false: random fertilisation of maize gametes further increases the variation among the offspring.",
        answer: true,
        explanation: "True. Any pollen nucleus can fuse with any egg, combining two independently varied gametes.",
      }),
    ]),
    explanation: "One replication and two divisions halve the DNA of G1; 2ⁿ combinations from independent assortment; crossing over creates recombinant chromatids.",
    hints: ["DNA doubles in S phase, then halves twice.", "Use the haploid number in 2ⁿ."],
    calculator: true,
  });
});
