// W1b: ZIMSEC Paper 3 essays (ZIM_P3_ESSAY: (a) 8 describe/outline + (b) 12 explain/discuss), self-marked.
import { concept, P, EXAM, checkExam, ZIM } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const essay = (b, { concepts, d = 5, stem, a, bb, hints }) =>
  b.struct({
    d, examStyle: true, skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, paper: "ZIMSEC Paper 3",
    concepts, stem,
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 }, ...a }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 }, ...bb }),
    ]),
    explanation: "Mark each part against the points: one mark for each point clearly made, up to the marks for the part.",
    hints,
  });

concept(A("membranes.fluid-mosaic"), { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- E1: membranes
  essay(b, {
    concepts: [A("membranes.fluid-mosaic"), A("membranes.diffusion-osmosis"), A("membranes.active-transport-bulk")],
    stem: "Answer both parts.",
    hints: ["Plan (a) as structure → position → role for each component.", "In (b) give each process its mechanism, energy source and an example."],
    a: {
      stem: "Describe the fluid mosaic model of the structure of the cell surface membrane.",
      points: [
        "Phospholipid bilayer",
        "Hydrophilic phosphate heads face outwards (towards water on both sides)",
        "Hydrophobic fatty acid tails face inwards, forming a non-polar core",
        "Intrinsic proteins span the bilayer (e.g. channel and carrier proteins)",
        "Extrinsic proteins on the inner or outer surface",
        "Cholesterol between the phospholipid tails, regulating fluidity / stability",
        "Glycoproteins and glycolipids with carbohydrate chains on the outer surface (glycocalyx)",
        "'Fluid': phospholipids and proteins move sideways; 'mosaic': proteins scattered in a pattern",
      ],
      modelAnswer: "The cell surface membrane is a bilayer of phospholipid molecules about 7-10 nm thick. The hydrophilic phosphate heads face outwards, towards the watery cytoplasm and tissue fluid, while the hydrophobic fatty acid tails point inwards, forming a non-polar core.\n\nProteins are scattered through the bilayer. Intrinsic proteins, such as channel and carrier proteins and many receptors, span the membrane; extrinsic proteins sit on the inner or outer surface. Cholesterol molecules lie between the fatty acid tails and regulate fluidity and stability.\n\nOn the outer surface, carbohydrate chains are attached to proteins (glycoproteins) and to lipids (glycolipids), forming the glycocalyx.\n\nThe model is 'fluid' because phospholipids and many proteins move sideways within their layer, and a 'mosaic' because the proteins are scattered through the bilayer like pieces of a mosaic.",
    },
    bb: {
      stem: "Explain how substances move across cell membranes by diffusion, facilitated diffusion, osmosis, active transport and bulk transport.",
      points: [
        "Diffusion: net movement down a concentration gradient, passive, by random motion",
        "Small non-polar molecules (O₂, CO₂) diffuse through the phospholipid bilayer",
        "Facilitated diffusion: ions / polar molecules pass through specific channel or carrier proteins",
        "Facilitated diffusion is passive, down the gradient, and limited by the number of proteins",
        "Osmosis: net movement of water from higher to lower water potential through a partially permeable membrane",
        "Osmosis example / effect: e.g. water entering root hair cells, or red blood cells bursting in pure water",
        "Active transport moves substances against their concentration gradient",
        "Uses carrier proteins / pumps and ATP from respiration; ATP changes the carrier's shape",
        "Example: Na⁺/K⁺ pump (3 Na⁺ out, 2 K⁺ in) or mineral ion uptake by root hairs",
        "Endocytosis: membrane folds around material to form a vesicle (phagocytosis of bacteria; pinocytosis of fluid)",
        "Exocytosis: vesicles fuse with the membrane to release contents (e.g. enzymes, hormones)",
        "Bulk transport needs ATP; used for large molecules / particles that cannot pass through proteins",
      ],
      modelAnswer: "Diffusion is the net movement of molecules from a higher to a lower concentration, by their random motion; it is passive. Small non-polar molecules such as oxygen and carbon dioxide diffuse straight through the phospholipid bilayer.\n\nIons and polar molecules such as glucose cannot cross the hydrophobic core. They move by facilitated diffusion through specific channel or carrier proteins. This is still passive and down the gradient, and the rate levels off when all the proteins are in use.\n\nOsmosis is the net movement of water from a region of higher water potential to one of lower water potential through a partially permeable membrane. For example, water enters root hair cells from dilute soil water, and red blood cells placed in pure water take up water and burst.\n\nActive transport moves ions and molecules against their concentration gradient. Specific carrier proteins (pumps) bind the substance; ATP made in respiration is hydrolysed, changing the shape of the carrier so the substance is released on the other side. The sodium-potassium pump moves three Na⁺ out and two K⁺ in per ATP; root hairs take up mineral ions in the same way.\n\nLarge molecules and particles are moved in bulk, using ATP. In endocytosis the membrane folds around material and pinches off a vesicle, as in phagocytosis of bacteria by neutrophils or pinocytosis of fluid. In exocytosis vesicles from the Golgi body fuse with the cell surface membrane and release their contents, such as digestive enzymes or hormones.",
    },
  });

  // ---------------------------------------------------------------- E2: mitosis and cancer
  essay(b, {
    concepts: [A("division.mitosis"), A("division.cancer")],
    stem: "Answer both parts.",
    hints: ["In (a) describe each stage in order, naming chromosomes, spindle and nuclear envelope.", "In (b) link genes → control of the cycle → tumour → spread, then prevention and treatment."],
    a: {
      stem: "Describe the behaviour of chromosomes during mitosis.",
      points: [
        "Prophase: chromosomes condense / become shorter and thicker",
        "Prophase: each chromosome seen as two sister chromatids joined at a centromere",
        "Metaphase: chromosomes attach to spindle microtubules by their centromeres",
        "Metaphase: chromosomes line up singly on the equator",
        "Anaphase: centromeres divide / sister chromatids separate",
        "Anaphase: chromatids pulled to opposite poles, centromere first, as spindle fibres shorten",
        "Telophase: chromosomes reach the poles and uncoil / decondense",
        "Telophase: nuclear envelope reforms around each identical set",
      ],
      modelAnswer: "In prophase the chromosomes, already replicated in S phase, condense and become shorter and thicker; each can be seen to consist of two sister chromatids joined at a centromere. The nuclear envelope breaks down and a spindle forms.\n\nIn metaphase the chromosomes become attached by their centromeres to spindle microtubules from opposite poles and are lined up singly across the equator.\n\nIn anaphase the centromeres divide, and the sister chromatids are pulled apart to opposite poles, centromeres first, as the spindle microtubules shorten.\n\nIn telophase the chromosomes reach the poles and uncoil, and a nuclear envelope reforms around each set, giving two genetically identical nuclei.",
    },
    bb: {
      stem: "Discuss how uncontrolled cell division can lead to cancer, and how cancer may be prevented and treated.",
      points: [
        "Cancer results from mutations in genes that control the cell cycle",
        "Proto-oncogenes can mutate to oncogenes, which stimulate continuous division",
        "Tumour suppressor genes (e.g. p53) inactivated, so division is not stopped / apoptosis not triggered",
        "Several mutations accumulate over time, so risk increases with age",
        "Cells divide uncontrollably by mitosis, forming a tumour",
        "Benign tumours stay in one place; malignant tumours invade surrounding tissues",
        "Metastasis: cells spread through blood or lymph to form secondary tumours",
        "Carcinogens cause mutations: e.g. tobacco tar, aflatoxins, ionising / UV radiation, viruses such as HPV",
        "Prevention: avoiding carcinogens (not smoking, proper grain storage, sun protection) or HPV vaccination",
        "Screening detects early changes when treatment is more successful",
        "Treatment: surgery, radiotherapy and chemotherapy (which stops cell division)",
        "Chemotherapy affects normal dividing cells too (hair, gut, bone marrow), causing side effects",
      ],
      modelAnswer: "Normally the cell cycle is controlled by two groups of genes. Proto-oncogenes code for proteins that stimulate division when a cell receives a signal, and tumour suppressor genes, such as the gene for p53, code for proteins that stop division when DNA is damaged and can trigger apoptosis.\n\nCancer develops when mutations accumulate in these genes in one cell line. A proto-oncogene may mutate into an oncogene that keeps stimulating division, and tumour suppressor genes may be inactivated. Because several mutations are usually needed, risk rises with age and with exposure to carcinogens such as tar in tobacco smoke, aflatoxins from mouldy maize and groundnuts, ionising and ultraviolet radiation and viruses such as HPV.\n\nThe cell then divides uncontrollably by mitosis to form a tumour. A benign tumour grows slowly and stays in one place, but a malignant tumour invades surrounding tissue, and its cells can spread in blood or lymph to form secondary tumours (metastasis).\n\nCancer can be prevented by reducing exposure to carcinogens: not smoking, drying and storing grain properly, protecting skin from strong sun, and vaccinating girls against HPV. Screening, such as examining cervical cells, finds early changes when treatment is most successful.\n\nTreatment uses surgery to remove a localised tumour, radiotherapy to damage the DNA of cancer cells, and chemotherapy with drugs that block DNA replication or mitosis. Chemotherapy also affects normal cells that divide often, in hair follicles, the gut lining and bone marrow, so it causes side effects such as hair loss and a higher risk of infection.",
    },
  });

  // ---------------------------------------------------------------- E3: replication and protein synthesis
  essay(b, {
    concepts: [A("nucleic.dna-replication"), A("nucleic.transcription"), A("nucleic.translation")],
    stem: "Answer both parts.",
    hints: ["In (a) give the mechanism, then the experiment and what each result showed.", "In (b) follow the information from gene to polypeptide: transcription, splicing, translation."],
    a: {
      stem: "Outline semi-conservative replication of DNA and describe how the Meselson and Stahl experiment supported it.",
      points: [
        "Hydrogen bonds break and the two strands separate; each acts as a template",
        "Free nucleotides pair by complementary base pairing; DNA polymerase forms phosphodiester bonds",
        "Each new molecule has one old and one new strand",
        "Bacteria grown for many generations on ¹⁵N (heavy) were transferred to ¹⁴N (light)",
        "DNA extracted and centrifuged in a density gradient (caesium chloride)",
        "After one generation: one band of intermediate density (rules out conservative)",
        "After two generations: two bands, intermediate and light (rules out dispersive)",
        "Only the semi-conservative model predicts both results",
      ],
      modelAnswer: "In replication the hydrogen bonds between bases break and the two strands separate, each acting as a template. Free DNA nucleotides pair with the exposed bases by complementary base pairing and DNA polymerase joins them with phosphodiester bonds. Each new molecule therefore contains one original strand and one new strand.\n\nMeselson and Stahl grew bacteria for many generations in a medium containing heavy nitrogen (¹⁵N), so all their DNA was heavy, then transferred them to light nitrogen (¹⁴N). DNA extracted after each generation was centrifuged in a caesium chloride density gradient.\n\nAfter one generation there was a single band of intermediate density, which ruled out conservative replication (that would give one heavy and one light band). After two generations there were two bands, intermediate and light, in equal amounts, ruling out dispersive replication (that would give one band). Only semi-conservative replication explains both results.",
    },
    bb: {
      stem: "Explain how the sequence of bases in a gene is used to produce a polypeptide in a eukaryotic cell.",
      points: [
        "The genetic code: a triplet of bases (codon) codes for one amino acid; code is degenerate and non-overlapping",
        "Transcription: RNA polymerase; DNA unwinds and hydrogen bonds break",
        "Only the template strand is read; free RNA nucleotides pair by complementary base pairing (U with A)",
        "RNA nucleotides joined by phosphodiester bonds to form pre-mRNA / primary transcript",
        "Introns removed and exons spliced to form mature mRNA",
        "mRNA leaves the nucleus through nuclear pores to a ribosome",
        "tRNA carries a specific amino acid, attached using ATP (activation)",
        "Translation starts at the start codon AUG",
        "tRNA anticodon pairs with the complementary codon on mRNA",
        "Two tRNAs in the ribosome; peptide bond forms between their amino acids",
        "Ribosome moves along one codon at a time; process repeated",
        "At a stop codon the polypeptide is released; polysomes make many copies",
      ],
      modelAnswer: "The sequence of bases in a gene is a code in which each triplet (codon in mRNA) specifies one amino acid. The code is degenerate and non-overlapping, with start and stop codons.\n\nIn transcription, RNA polymerase binds to the gene and the DNA unwinds as hydrogen bonds break. Only the template strand is read. Free RNA nucleotides pair with the exposed bases by complementary base pairing, uracil pairing with adenine, and RNA polymerase joins them with phosphodiester bonds to make a primary transcript. Introns are removed and the exons are spliced together, forming mature mRNA, which leaves the nucleus through a nuclear pore and attaches to a ribosome.\n\nIn the cytoplasm, each amino acid is attached to its own tRNA by a specific enzyme, using ATP. Translation begins at the start codon AUG. A tRNA whose anticodon is complementary to the codon pairs with it; the ribosome holds two tRNAs, and a peptide bond forms between their amino acids. The ribosome moves one codon along, the empty tRNA leaves and another arrives, so the polypeptide grows in the order of the codons. At a stop codon no tRNA can pair, and the polypeptide is released. Several ribosomes may translate one mRNA at once as a polysome.",
    },
  });
});
