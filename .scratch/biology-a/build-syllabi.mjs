// Builds content/concepts/biology-a.json and the two A-Level Biology syllabus files:
//   content/syllabi/zimsec/a-level/biology/2015-2022.json      (ZIMSEC A-Level Biology, Forms 5-6)
//   content/syllabi/cambridge/a-level/biology/2025-2027.json   (Cambridge International AS & A Level Biology 9700)
// Sources (local only, not in git): .scratch/biology-a/sources/zimsec-biology.pdf (+ .txt) and 9700-2025-2027.pdf
// (+ .txt). The concept registry lives in ./concepts.mjs; this script prepends each concept's coverage label.
// Run from the repo root: node .scratch/biology-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^abio\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC: "Form 5" / "Form 6" / "Forms 5-6") and `stage` (Cambridge: "AS Level" / "A Level only")
// are build-time metadata used for the concept labels; keys starting with "_" are not written.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, optional, optionGroup, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (optional) n.optional = true;
  if (optionGroup) n.optionGroup = optionGroup;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// =====================================================================================================================
// ZIMSEC A-Level Biology, Forms 5-6, 2015-2022. Top-level topics are the thirteen compulsory topics of the topic list
// (6.1-6.13), numbered 1-13 as printed there. Sub-topics are the key concepts of the competency matrix with their
// printed numbers (8.1.1 ...): the matrix numbers its Form 5 topics 8.1-8.8 and its Form 6 topics 8.9-8.15. Codes
// 8.8.1, 8.8.3 and 8.12.3 are ours (see notes), as are all objective codes (sub-topic code + .n) and the Practical
// skills node "P".
const THEORY = ["1", "2", "3"];
const F5 = "Form 5";
const F6 = "Form 6";

const ZIMSEC_TOPICS = [
  topic("cell-structure", "1", "Cell Structure and Function", {
    description: "Form 5 (competency matrix 8.1).",
    components: THEORY,
    children: [
      sub("cell-structure.microscopy", "8.1.1", "Microscopy", {
        form: F5,
        covers: ["abio.cells.microscopy"],
        objectives: [
          "Calibrate an eyepiece graticule with a stage micrometer.",
          "Draw specimens and determine their linear dimensions, using millimetres, micrometres and nanometres.",
          "Distinguish between magnification and resolution, with reference to light and electron microscopes.",
        ],
      }),
      sub("cell-structure.plant-animal-cells", "8.1.2", "Plant and Animal Cells", {
        form: F5,
        covers: ["abio.cells.slides-and-cells"],
        objectives: [
          "Prepare temporary slides (wet mounts) and stain them.",
          "Identify plant and animal cells and their ultrastructure (rough and smooth ER, Golgi body, mitochondria, ribosomes, chloroplasts, cell surface membrane, nuclear envelope, centrioles, nucleus and nucleolus).",
          "Compare plant and animal cells.",
        ],
      }),
      sub("cell-structure.organelles", "8.1.3", "Organelles and their functions", {
        form: F5,
        covers: ["abio.cells.eukaryotic-ultrastructure"],
        objectives: ["Outline the functions of the cell organelles."],
      }),
      sub("cell-structure.eukaryotic-prokaryotic", "8.1.4", "Eukaryotic and Prokaryotic Cells", {
        form: F5,
        covers: ["abio.cells.prokaryotes-viruses"],
        objectives: ["Compare the structure of eukaryotic and prokaryotic cells."],
      }),
      sub("cell-structure.membrane-transport", "8.1.5", "Movement of substances into and out of cells", {
        form: F5,
        covers: ["abio.membranes.fluid-mosaic", "abio.membranes.diffusion-osmosis", "abio.membranes.active-transport-bulk"],
        objectives: [
          "Describe and explain the structure of the cell surface membrane (fluid mosaic model with phospholipids, cholesterol, glycolipids, proteins and glycoproteins).",
          "Relate membrane structure to the movement of substances by diffusion, facilitated diffusion, osmosis, active uptake, endocytosis and exocytosis.",
          "Design and carry out experiments on osmosis, including serial dilutions.",
        ],
      }),
    ],
  }),
  topic("biological-molecules", "2", "Biological Molecules and Water", {
    description: "Form 5 (competency matrix 8.2). The matrix places enzymes under key concept 8.2.3 Proteins.",
    components: THEORY,
    children: [
      sub("biological-molecules.carbohydrates", "8.2.1", "Carbohydrates", {
        form: F5,
        description: "Also carries the food tests of 8.2.2 (emulsion) and 8.2.3 (biuret), which are taught together in one lesson.",
        covers: ["abio.molecules.tests", "abio.molecules.carbohydrates", "abio.molecules.polysaccharides"],
        objectives: [
          "Carry out qualitative and quantitative tests for reducing sugars, non-reducing sugars and starch.",
          "Describe the formation and breakage of the glycosidic bond.",
          "Describe the synthesis and molecular structure of starch, glycogen and cellulose.",
          "Relate the structures of polysaccharides to their functions in living organisms.",
        ],
      }),
      sub("biological-molecules.lipids", "8.2.2", "Lipids", {
        form: F5,
        covers: ["abio.molecules.lipids"],
        objectives: [
          "Identify lipids in different substances with the emulsion test.",
          "Describe the molecular structures of a triglyceride and a phospholipid.",
          "Relate the structures of triglycerides and phospholipids to their functions.",
        ],
      }),
      sub("biological-molecules.proteins", "8.2.3", "Proteins", {
        form: F5,
        covers: ["abio.molecules.protein-structure", "abio.molecules.haemoglobin-collagen", "abio.enzymes.mode-of-action", "abio.enzymes.factors", "abio.enzymes.inhibition-kinetics"],
        objectives: [
          "Identify proteins in foods with the biuret test.",
          "Describe the structure of an amino acid and outline the formation and breakage of a peptide bond.",
          "Explain primary, secondary, tertiary and quaternary structure and the bonds that hold proteins in shape (hydrogen, ionic, disulfide, hydrophobic interactions).",
          "Describe the molecular structures of haemoglobin and collagen and relate them to their functions.",
          "Explain the mode of action of enzymes (lock and key and induced fit hypotheses).",
          "Follow the progress of an enzyme-catalysed reaction and explain the effects of temperature, pH, enzyme concentration and substrate concentration on its rate.",
          "Explain reversible and non-reversible inhibition, including heavy metals and insecticides, and the effects of competitive and non-competitive inhibitors.",
        ],
      }),
      sub("biological-molecules.water", "8.2.4", "Water", {
        form: F5,
        covers: ["abio.molecules.water"],
        objectives: [
          "Describe the structure and the physical and chemical properties of water.",
          "Explain the roles of water in living organisms and as an environment.",
        ],
      }),
    ],
  }),
  topic("cell-division", "3", "Cell and Nuclear Division", {
    description: "Form 5 (competency matrix 8.3).",
    components: THEORY,
    children: [
      sub("cell-division.cell-cycle", "8.3.1", "The Cell Cycle", {
        form: F5,
        covers: ["abio.division.chromosomes-cell-cycle"],
        objectives: ["Outline the cell cycle (interphase, mitosis, cytokinesis).", "Describe interphase, including growth and DNA replication."],
      }),
      sub("cell-division.mitosis", "8.3.2", "Mitosis", {
        form: F5,
        covers: ["abio.division.mitosis", "abio.division.cancer"],
        objectives: [
          "Describe the behaviour of chromosomes, nuclear envelope, cell membrane, centrioles and spindle during mitosis.",
          "Distinguish between cytokinesis in plants and animals.",
          "Explain the importance of mitosis (growth, repair, asexual reproduction, genetically identical cells).",
          "Identify factors that increase the chance of cancerous growth (carcinogens, mutations, radiation).",
          "Outline the stages in the development of cancer.",
        ],
      }),
      sub("cell-division.meiosis", "8.3.3", "Meiosis", {
        form: F5,
        covers: ["abio.division.meiosis", "abio.division.genetic-variation"],
        objectives: [
          "Explain the terms haploid, diploid and homologous chromosomes.",
          "Describe the behaviour of chromosomes, nuclear envelope, cell membrane, centrioles and spindle during meiosis.",
          "Discuss the importance of meiosis in gamete formation and genetic variation.",
          "Compare and contrast mitosis and meiosis.",
        ],
      }),
    ],
  }),
  topic("genetic-control", "4", "Genetic Control", {
    description: "Form 5 (competency matrix 8.4).",
    components: THEORY,
    children: [
      sub("genetic-control.nucleic-acids", "8.4.1", "Nucleic Acids", {
        form: F5,
        covers: ["abio.nucleic.dna-structure"],
        objectives: [
          "Describe the structure of a nucleotide and the formation of a dinucleotide by a phosphodiester bond.",
          "Distinguish between RNA and DNA nucleotides.",
          "Describe the structure of DNA.",
        ],
      }),
      sub("genetic-control.dna-replication", "8.4.2", "Structure and replication of DNA", {
        form: F5,
        covers: ["abio.nucleic.dna-replication"],
        objectives: ["Explain how DNA replicates semi-conservatively, with reference to the Meselson and Stahl experiment."],
      }),
      sub("genetic-control.protein-synthesis", "8.4.3", "Protein synthesis", {
        form: F5,
        covers: ["abio.nucleic.transcription", "abio.nucleic.translation"],
        objectives: ["Outline protein synthesis: transcription and translation, including the roles of mRNA, tRNA and ribosomes."],
      }),
    ],
  }),
  topic("gene-technology", "5", "Gene Technology", {
    description: "Form 6 (competency matrix 8.9).",
    components: THEORY,
    children: [
      sub("gene-technology.insulin", "8.9.1", "Insulin Production", {
        form: F6,
        covers: ["abio.genetech.recombinant-dna", "abio.genetech.insulin-recombinant-proteins"],
        objectives: [
          "Outline the steps in the synthesis of human insulin by bacteria.",
          "Explain the advantages of treating diabetics with human insulin produced by gene technology.",
        ],
      }),
      sub("gene-technology.screening-fingerprinting", "8.9.2", "Genetic Screening and Fingerprinting", {
        form: F6,
        covers: ["abio.genetech.genetic-screening", "abio.genetech.pcr-electrophoresis-fingerprinting"],
        objectives: [
          "Describe how genetic screening is carried out.",
          "Discuss the roles of genetic screening for genetic conditions and the need for genetic counselling.",
          "Explain the theoretical basis of genetic fingerprinting and outline how it is carried out (including electrophoresis).",
        ],
      }),
      sub("gene-technology.gene-therapy", "8.9.3", "Gene Therapy", {
        form: F6,
        covers: ["abio.genetech.gene-therapy"],
        objectives: ["Outline the basis of gene therapy."],
      }),
      sub("gene-technology.benefits-hazards", "8.9.4", "Benefits and Hazards of Gene Technology", {
        form: F6,
        covers: ["abio.genetech.gmo-agriculture"],
        objectives: ["Explain the benefits and hazards of gene technology."],
      }),
      sub("gene-technology.ethics", "8.9.5", "Ethical Implications of Gene Technology", {
        form: F6,
        covers: ["abio.genetech.ethics"],
        objectives: ["Discuss the social and ethical implications of gene technology."],
      }),
    ],
  }),
  topic("inherited-change", "6", "Inherited Change and Evolution", {
    description: "Form 5 (competency matrix 8.5: the gene and genetic crosses) and Form 6 (8.10: natural and artificial selection).",
    components: THEORY,
    children: [
      sub("inherited-change.nature-of-gene", "8.5.1", "Nature of the Gene", {
        form: F5,
        covers: ["abio.inheritance.genes-phenotype"],
        objectives: ["Discuss the gene concept: the gene as the unit of inheritance."],
      }),
      sub("inherited-change.crosses", "8.5.2", "Monohybrid and Dihybrid Crosses", {
        form: F5,
        covers: ["abio.inheritance.monohybrid", "abio.inheritance.sex-linkage", "abio.inheritance.dihybrid", "abio.inheritance.chi-squared"],
        objectives: [
          "Use genetic diagrams to solve problems involving monohybrid and dihybrid crosses, including codominance, sex linkage, multiple alleles and test crosses.",
          "Use the chi-squared test to decide whether the difference between observed and expected results is significant.",
        ],
      }),
      sub("inherited-change.natural-selection", "8.10.1", "Natural Selection", {
        form: F6,
        covers: ["abio.nucleic.gene-mutation", "abio.evolution.variation", "abio.evolution.natural-selection", "abio.evolution.speciation"],
        objectives: [
          "Explain, with examples, how mutations and the environment may affect phenotype.",
          "Explain, with examples, how environmental factors act as forces of natural selection.",
          "Explain how natural selection may bring about evolution.",
        ],
      }),
      sub("inherited-change.artificial-selection", "8.10.2", "Artificial Selection", {
        form: F6,
        covers: ["abio.evolution.artificial-selection"],
        objectives: ["Describe one example of artificial selection."],
      }),
    ],
  }),
  topic("energetics", "7", "Energetics", {
    description: "Form 5 (competency matrix 8.6).",
    components: THEORY,
    children: [
      sub("energetics.atp", "8.6.1", "ATP Structure and Synthesis", {
        form: F5,
        covers: ["abio.respiration.atp"],
        objectives: [
          "Outline the need for energy in living organisms (anabolic reactions, active transport, movement, maintaining body temperature).",
          "Describe ATP as a phosphorylated nucleotide.",
          "Describe the synthesis of ATP by chemiosmosis.",
        ],
      }),
      sub("energetics.photosynthesis", "8.6.2", "Photosynthesis", {
        form: F5,
        covers: ["abio.photosynthesis.chloroplasts-pigments", "abio.photosynthesis.light-dependent", "abio.photosynthesis.calvin-c4", "abio.photosynthesis.limiting-factors"],
        objectives: [
          "Draw the detailed structure of a chloroplast.",
          "Identify chloroplast pigments and discuss their roles, with absorption and action spectra.",
          "Describe the photoactivation of chlorophyll and the light-dependent reactions (cyclic and non-cyclic photophosphorylation).",
          "Outline the Calvin cycle.",
          "Discuss carbon fixation in C4 plants.",
          "Discuss the concept of limiting factors (light intensity and wavelength, carbon dioxide concentration, temperature).",
        ],
      }),
      sub("energetics.respiration", "8.6.3", "Respiration", {
        form: F5,
        covers: ["abio.respiration.glycolysis-krebs", "abio.respiration.oxidative-phosphorylation", "abio.respiration.anaerobic", "abio.respiration.substrates-rq"],
        objectives: [
          "Draw the detailed structure of a mitochondrion.",
          "Outline glycolysis, the formation of acetyl coenzyme A from pyruvate and the Krebs cycle.",
          "Explain decarboxylation and dehydrogenation in the link reaction and the Krebs cycle.",
          "Describe oxidative phosphorylation, including the electron transport chain and the roles of oxygen and NAD.",
          "Outline anaerobic respiration in plants or yeast and in animals, and design experiments to compare rates of fermentation.",
          "Explain the relative energy values of carbohydrates, lipids and proteins as respiratory substrates.",
          "Define and calculate the respiratory quotient (RQ), including with simple respirometers, and investigate the effect of temperature on respiration rate.",
        ],
      }),
    ],
  }),
  topic("transport", "8", "Transport Systems", {
    description: "Form 5 (competency matrix 8.7: transport in plants) and Form 6 (8.11: the mammalian circulatory system).",
    components: THEORY,
    children: [
      sub("transport.plants", "8.7.1", "Structure and mechanisms of transport systems in plants", {
        form: F5,
        covers: ["abio.plant-transport.tissues", "abio.plant-transport.water-uptake", "abio.plant-transport.transpiration", "abio.plant-transport.translocation"],
        objectives: [
          "Describe the structures of xylem vessels, sieve tube elements and companion cells (in monocotyledonous and dicotyledonous roots and stems).",
          "Explain how xylem vessels and phloem tubes are adapted to their functions.",
          "Describe, naming the pathways (apoplast, symplast, vacuolar) and the role of the Casparian strip, how water moves from the soil to the xylem.",
          "Explain the mechanisms that move water from soil to xylem and from roots to leaves (osmosis, root pressure, transpiration pull, capillarity).",
          "Explain the translocation of sucrose (mass flow hypothesis).",
        ],
      }),
      sub("transport.mammals", "8.11.1", "Mammalian circulatory system", {
        form: F6,
        covers: ["abio.mammal-transport.circulation-vessels", "abio.mammal-transport.gas-transport", "abio.mammal-transport.heart", "abio.mammal-transport.blood-pressure-exercise"],
        objectives: [
          "Identify arteries, veins and capillaries.",
          "Explain the role of haemoglobin in transporting oxygen and carbon dioxide, using oxygen dissociation curves.",
          "Explain the Bohr effect.",
          "Explain the significance of the different oxygen affinities of haemoglobin and myoglobin and of maternal and fetal haemoglobin.",
          "Describe the cardiac cycle and explain how heart action is initiated and controlled (myogenic control, pacemaker).",
          "Explain systolic blood pressure, diastolic blood pressure and hypertension.",
          "Discuss the long-term consequences of exercise on the cardiovascular system.",
        ],
      }),
    ],
  }),
  topic("nervous-control", "9", "Nervous Control", {
    description: "Form 6 (competency matrix 8.12).",
    components: THEORY,
    children: [
      sub("nervous-control.communication", "8.12.1", "Need for communication", {
        form: F6,
        covers: ["abio.coordination.nervous-endocrine"],
        objectives: ["Recognise the need for communication systems within living organisms (neurones)."],
      }),
      sub("nervous-control.action-potential", "8.12.2", "Action potential", {
        form: F6,
        covers: ["abio.coordination.action-potential", "abio.coordination.impulse-transmission"],
        objectives: [
          "Describe the resting potential and the generation of an action potential.",
          "Explain the transmission of an action potential along a myelinated neurone, emphasising sodium and potassium ions.",
          "Explain the importance of the myelin sheath (saltatory conduction) and the refractory period in determining the speed of transmission.",
        ],
      }),
      sub("nervous-control.synapse", "8.12.3", "Cholinergic synapse", {
        form: F6,
        description: "Listed in the scope and sequence; no competency-matrix row was found in the copy read (code ours).",
        covers: ["abio.coordination.synapses"],
        objectives: ["Describe the structure of a cholinergic synapse and explain how it transmits an impulse (from the scope and sequence; objective wording ours)."],
      }),
    ],
  }),
  topic("sexual-reproduction", "10", "Sexual Reproduction", {
    description: "Form 6 (competency matrix 8.13).",
    components: THEORY,
    children: [
      sub("sexual-reproduction.plants", "8.13.1", "Sexual Reproduction in Plants", {
        form: F6,
        covers: ["abio.reproduction.flowering-plants"],
        objectives: [
          "Describe anther structure and pollen formation.",
          "Describe ovule development.",
          "Describe double fertilisation and explain its significance in the embryo sac.",
        ],
      }),
      sub("sexual-reproduction.humans", "8.13.2", "Sexual Reproduction in Humans", {
        form: F6,
        covers: ["abio.reproduction.gametogenesis", "abio.reproduction.menstrual-cycle", "abio.reproduction.fertilisation-placenta", "abio.reproduction.contraception-ivf"],
        objectives: [
          "Recognise the microscopic structure of the ovary and testis.",
          "Describe gametogenesis and explain how it is controlled by hormones.",
          "Explain in detail the role of hormones in the menstrual cycle.",
          "Describe fertilisation (capacitation, acrosome reaction, cortical reaction).",
          "Describe the structure of the placenta and explain its roles in transport and hormone production.",
          "Discuss contraception, in vitro fertilisation and abortion from biological and ethical viewpoints.",
          "Outline the role of hormones in premenstrual tension, hormone replacement therapy and the menopause.",
        ],
      }),
    ],
  }),
  topic("ecology", "11", "Ecology", {
    description: "Form 6 (competency matrix 8.14).",
    components: THEORY,
    children: [
      sub("ecology.levels", "8.14.1", "Levels of Ecological Organisation", {
        form: F6,
        covers: ["abio.ecology.levels-organisation"],
        objectives: ["Define the terms species, habitat, population, niche, community and ecosystem."],
      }),
      sub("ecology.nitrogen-cycle", "8.14.2", "Nitrogen Cycle", {
        form: F6,
        covers: ["abio.ecology.nitrogen-cycle"],
        objectives: ["Outline the nitrogen cycle and the roles of nitrogen-fixing (Rhizobium), nitrifying (Nitrosomonas, Nitrobacter) and denitrifying (Pseudomonas, Clostridium) bacteria."],
      }),
      sub("ecology.human-impact", "8.14.3", "Anthropogenic Impact on Ecosystems", {
        form: F6,
        covers: ["abio.ecology.human-impact"],
        objectives: ["Describe the effects on ecosystems of human settlement, deforestation, industry, agriculture, mining, global warming and invasive plant species."],
      }),
      sub("ecology.conservation", "8.14.4", "Conservation", {
        form: F6,
        covers: ["abio.conservation.threats-strategies", "abio.conservation.elephant-rhino"],
        objectives: [
          "Explain, using specific examples, how conservation may involve preservation, management and reclamation, including the roles of EMA and CAMPFIRE.",
          "Discuss the conservation of the African elephant and the white rhinoceros: population numbers, reasons for concern, measures, international co-operation and conflicts of interest.",
        ],
      }),
    ],
  }),
  topic("biodiversity", "12", "Biodiversity", {
    description: "Form 6 (competency matrix 8.15).",
    components: THEORY,
    children: [
      sub("biodiversity.classification", "8.15.1", "Classification", {
        form: F6,
        covers: ["abio.biodiversity.classification-hierarchy", "abio.biodiversity.kingdoms"],
        objectives: [
          "Identify organisms using the diagnostic features of the five kingdoms.",
          "Use diagnostic features to divide kingdoms into phyla.",
          "State the taxonomic hierarchy.",
          "Follow the rules of binomial nomenclature.",
        ],
      }),
      sub("biodiversity.importance", "8.15.2", "Importance of Biodiversity", {
        form: F6,
        covers: ["abio.biodiversity.economic-importance"],
        objectives: ["Describe the socio-economic importance of the five kingdoms."],
      }),
    ],
  }),
  topic("health-disease", "13", "Human Health and Disease", {
    description: "Form 5 (competency matrix 8.8). The copy read prints only key concept 8.8.2; 8.8.1 and 8.8.3 are inferred from the scope and sequence (codes ours, see notes).",
    components: THEORY,
    children: [
      sub("health-disease.drug-abuse", "8.8.1", "Drug and Substance Abuse", {
        form: F5,
        description: "Listed in the scope and sequence; no competency-matrix row was found in the copy read (code ours).",
        covers: ["abio.disease.drug-substance-abuse"],
        objectives: ["Describe the biological effects and the social consequences of drug and substance abuse (from the scope and sequence; objective wording ours)."],
      }),
      sub("health-disease.global-distribution", "8.8.2", "Global distribution of diseases", {
        form: F5,
        covers: ["abio.disease.cholera-tb", "abio.disease.malaria", "abio.disease.hiv-aids", "abio.disease.global-distribution"],
        objectives: ["Discuss the global distribution of malaria, tuberculosis, Ebola, HIV/AIDS, cholera, coronary heart disease and sickle cell anaemia, evaluating epidemiological evidence."],
      }),
      sub("health-disease.immunity", "8.8.3", "Immunity", {
        form: F5,
        description: "Listed in the scope and sequence; no competency-matrix row was found in the copy read (code ours).",
        covers: ["abio.immunity.immune-response", "abio.immunity.antibodies", "abio.immunity.vaccination"],
        objectives: ["Explain how the immune system protects the body, and the types of immunity and vaccination (from the scope and sequence; objective wording ours)."],
      }),
    ],
  }),
  topic("practical-skills", "P", "Practical skills (Paper 4)", {
    description: "Not a content topic of the syllabus: this node is ours, from skill C (experimental skills and investigations) and the Paper 4 description (planning, implementing, interpreting, concluding and evaluating; low- and high-power drawings).",
    components: ["4"],
    children: [
      sub("practical-skills.implementing", "P.1", "Implementing and recording", {
        form: "Forms 5-6",
        covers: ["abio.skills.practical-investigation", "abio.skills.biological-drawing"],
        objectives: [
          "Follow instructions and use apparatus and materials methodically and safely.",
          "Make and record accurate observations (including low- and high-power drawings) and measurements to the precision of the apparatus.",
        ],
      }),
      sub("practical-skills.planning-evaluating", "P.2", "Planning, interpreting and evaluating", {
        form: "Forms 5-6",
        covers: ["abio.skills.planning-evaluation"],
        objectives: [
          "Devise and plan investigations, selecting techniques, apparatus and materials.",
          "Interpret and evaluate observations and data, assess errors and reliability, and reach valid conclusions.",
          "Communicate results clearly in tables, line graphs and continuous prose.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "biology",
  versionLabel: "2015-2022",
  family: "biology-a",
  title: "ZIMSEC A-Level Biology",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Biology Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their order (1 to 13) are transcribed from the topic list (6.0) of the Ministry's Biology Syllabus Forms 5 - 6 (2015 - 2022); sub-topics are the key concepts of the competency matrix (8.0) with their printed numbers (8.1.1 to 8.15.2), and the form in which each is taught comes from the matrix and the scope and sequence (7.0). Sub-topic codes 8.8.1, 8.8.3 and 8.12.3, all objective codes and the Practical skills node are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-09): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's https address because the file has no stable direct link). The same Ministry documents are listed on the Mashonaland West provincial education office site. The cover prints 'Biology Syllabus, Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, 2015). It was read through a pdftotext rendering in which the competency-matrix and assessment tables come out with their columns interleaved; check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document. ZIMSEC A-Level Biology is commonly cited as 6030; confirm it (code left null).",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi, and 2024-2030 versions exist for Forms 5-6 in some subjects. Confirm which Biology syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Numbering: the topic list numbers the thirteen topics 6.1-6.13 and the scope and sequence 7.1-7.13, but the competency matrix numbers them by form: Form 5 topics 8.1-8.8 (cell structure, biological molecules and water, cell and nuclear division, genetic control, inherited change and evolution, energetics, transport systems, human health and disease) and Form 6 topics 8.9-8.15 (gene technology, inherited change and evolution, transport systems, nervous control, sexual reproduction, ecology, biodiversity). This tree follows the topic list (1-13) with the matrix key-concept numbers as sub-topic codes.",
    "Gaps in the copy read: under 8.8 Human Health and Disease only key concept 8.8.2 (global distribution of diseases) has a matrix row; the scope and sequence also lists 'Drug and substance abuse' and 'Immunity', recorded here as 8.8.1 and 8.8.3 (codes and objective wording ours). Under 8.12 Nervous Control the matrix has 8.12.1 and 8.12.2; the scope and sequence also lists 'Cholinergic synapse', recorded as 8.12.3 (ours). A page of the matrix may be missing from the copy; confirm against a clean copy. Some matrix cells are cut off (for example the exercise objective of 8.11.1).",
    "The matrix places enzymes (mode of action, factors, inhibition) under key concept 8.2.3 Proteins, and the food tests are split across 8.2.1-8.2.3; one lesson teaches all the tests (covered at 8.2.1). Gene mutation is taught where the matrix asks how mutations affect phenotype (8.10.1). The matrix lists Schistosoma under Kingdom Protista in 8.15.2; Schistosoma is a parasitic flatworm (Animalia), and lessons say so.",
    "Assessment (9.0) as read: continuous assessment 30% (practical tests 10%, written theory tests 10%, end-of-course project 10%, over Terms 1-5) and a summative examination 70%: Paper 1 multiple choice (1 hour, 40 marks, 11%), Paper 2 structured theory (1 hour 30 minutes, 60 marks, 17%, a variable number of compulsory structured questions), Paper 3 short free-response essays (2 hours, 100 marks, 28%, seven questions of 20 marks, answer five) and Paper 4 practical test set and marked by ZIMSEC (2 hours 30 minutes, 50 marks, 14%, three compulsory questions of variable marks). Paper 1 is described as 40 four-option multiple-choice items. Assessment-objective marks: Paper 1 A 18, B 22; Paper 2 A 25, B 35; Paper 3 A 40, B 60; Paper 4 C 50. The per-topic specification grid is printed empty in the copy read. Continuous assessment is not a component here and is not simulated.",
    "Paper 4: questions may require an understanding of the chi-squared test, but detailed computation is not required in the examination; observations may use a microscope or hand lens. The practical paper itself cannot be simulated; written items practise its planning, recording, drawing, interpreting and evaluating skills.",
    "Many concepts are shared with Cambridge 9700 (concepts abio.*). Lessons are written to the depth of the deeper board; parts named only by ZIMSEC (myoglobin and fetal haemoglobin, C4 plants, the Meselson-Stahl experiment, genetic fingerprinting, reproduction, the nitrogen cycle, EMA and CAMPFIRE) are marked as ZIMSEC detail.",
  ],
  overview: "The ZIMSEC A-Level Biology syllabus (Forms 5-6) has thirteen compulsory topics. Form 5 covers cell structure and microscopy, biological molecules and water (with enzymes), cell and nuclear division, genetic control, the gene and genetic crosses with the chi-squared test, energetics (ATP, photosynthesis including C4 plants, and respiration), transport in plants, and human health and disease. Form 6 covers gene technology, natural and artificial selection, the mammalian circulatory system, nervous control, sexual reproduction in plants and humans, ecology and conservation (with Zimbabwean examples such as the African elephant, the white rhinoceros, EMA and CAMPFIRE), and biodiversity and classification into five kingdoms.",
  assessmentOverview: "Continuous assessment (practical tests, written tests and a project, Terms 1-5) carries 30%. The examination carries 70%: Paper 1 multiple choice (1 hour, 40 marks, 11%), Paper 2 structured questions, all compulsory (1 hour 30 minutes, 60 marks, 17%), Paper 3 seven short essay questions of 20 marks, answer five (2 hours, 100 marks, 28%) and Paper 4 a practical test of three compulsory questions (2 hours 30 minutes, 50 marks, 14%).",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory four-option multiple-choice items on the whole syllabus.", durationMinutes: 60, maxMarks: 40, weightingPercent: 11 },
    { code: "2", name: "Paper 2: Structured questions", kind: "WRITTEN", description: "A variable number of compulsory structured questions on the whole syllabus.", durationMinutes: 90, maxMarks: 60, weightingPercent: 17 },
    { code: "3", name: "Paper 3: Short free-response essays", kind: "WRITTEN", description: "Seven short essay-type questions of 20 marks each; candidates answer five.", durationMinutes: 120, maxMarks: 100, weightingPercent: 28 },
    { code: "4", name: "Paper 4: Practical test", kind: "PRACTICAL", description: "A practical test set and marked by ZIMSEC: three compulsory questions of variable marks (experiments and investigations, microscope or hand-lens observations; planning, implementing, interpreting, concluding and evaluating).", durationMinutes: 150, maxMarks: 50, weightingPercent: 14 },
  ],
  topics: ZIMSEC_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Biology 9700, 2025-2027. Topics 1-19 and sub-topics (1.1 ...) are numbered as
// printed; objective codes are the printed learning-outcome references (1.1.3 = topic 1.1, learning outcome 3, as the
// syllabus itself cross-refers, e.g. "see 11.1.2"). The three sections and the practical-skills nodes (P3, P5) are ours.
const AS = ["1", "2"];
const AL = ["4"];
const ASL = "AS Level";
const ALO = "A Level only";
const o = (code, text) => [code, text];

const C9700_TOPICS = [
  section("as-content", "AS", "AS Level subject content", {
    description: "Topics 1-11: studied by all candidates; examined in Papers 1 and 2 and assumed knowledge for Paper 4.",
    children: [
      topic("cell-structure", "1", "Cell structure", {
        components: AS,
        children: [
          sub("cell-structure.microscope", "1.1", "The microscope in cell studies", {
            stage: ASL,
            covers: ["abio.cells.microscopy"],
            objectives: [
              o("1.1.1", "Make temporary preparations of cellular material for viewing with a light microscope."),
              o("1.1.2", "Draw cells from microscope slides and photomicrographs."),
              o("1.1.3", "Calculate magnifications of images and actual sizes of specimens from drawings, photomicrographs and electron micrographs (scanning and transmission)."),
              o("1.1.4", "Use an eyepiece graticule and stage micrometer to measure, in mm, µm and nm."),
              o("1.1.5", "Define resolution and magnification and explain how they differ in light and electron microscopy."),
            ],
          }),
          sub("cell-structure.cells", "1.2", "Cells as the basic units of living organisms", {
            stage: ASL,
            description: "Temporary preparations and drawing (1.1.1-1.1.2) are taught with the plant and animal cell lesson covered here.",
            covers: ["abio.cells.slides-and-cells", "abio.cells.eukaryotic-ultrastructure", "abio.cells.prokaryotes-viruses"],
            objectives: [
              o("1.2.1", "Recognise the organelles of eukaryotic cells (membranes, nucleus, ER, Golgi body, mitochondria, ribosomes, lysosomes, centrioles, cilia, microvilli, chloroplasts, cell wall, plasmodesmata, vacuole and tonoplast) and outline their structures and functions."),
              o("1.2.2", "Describe and interpret photomicrographs, electron micrographs and drawings of typical plant and animal cells."),
              o("1.2.3", "Compare typical plant and animal cells."),
              o("1.2.4", "State that cells use ATP from respiration for energy-requiring processes."),
              o("1.2.5", "Outline the key structural features of a typical bacterium."),
              o("1.2.6", "Compare a typical bacterium with typical plant and animal cells."),
              o("1.2.7", "State that viruses are non-cellular, with a DNA or RNA core, a protein capsid and in some an outer phospholipid envelope."),
            ],
          }),
        ],
      }),
      topic("biological-molecules", "2", "Biological molecules", {
        components: AS,
        children: [
          sub("biological-molecules.tests", "2.1", "Testing for biological molecules", {
            stage: ASL,
            covers: ["abio.molecules.tests"],
            objectives: [
              o("2.1.1", "Describe and carry out the Benedict's, iodine, emulsion and biuret tests."),
              o("2.1.2", "Carry out a standardised semi-quantitative Benedict's test to estimate the concentration of a reducing sugar."),
              o("2.1.3", "Test for non-reducing sugars using acid hydrolysis and Benedict's solution."),
            ],
          }),
          sub("biological-molecules.carbohydrates-lipids", "2.2", "Carbohydrates and lipids", {
            stage: ASL,
            covers: ["abio.molecules.carbohydrates", "abio.molecules.polysaccharides", "abio.molecules.lipids"],
            objectives: [
              o("2.2.1", "Describe and draw the ring forms of alpha- and beta-glucose."),
              o("2.2.2", "Define monomer, polymer, macromolecule, monosaccharide, disaccharide and polysaccharide."),
              o("2.2.3", "State that covalent bonds join smaller molecules into polymers."),
              o("2.2.4", "State that glucose, fructose and maltose are reducing sugars and sucrose is not."),
              o("2.2.5", "Describe how condensation forms glycosidic bonds in disaccharides (including sucrose) and polysaccharides."),
              o("2.2.6", "Describe the hydrolysis of glycosidic bonds, linked to the non-reducing sugar test."),
              o("2.2.7", "Describe the structures of starch (amylose and amylopectin) and glycogen and relate them to their functions."),
              o("2.2.8", "Describe the structure of cellulose and how the arrangement of its molecules gives cell walls their function."),
              o("2.2.9", "Describe triglycerides as non-polar, hydrophobic molecules made from glycerol and saturated or unsaturated fatty acids joined by ester bonds."),
              o("2.2.10", "Relate the structure of triglycerides to their functions."),
              o("2.2.11", "Describe phospholipids with hydrophilic phosphate heads and hydrophobic fatty acid tails."),
            ],
          }),
          sub("biological-molecules.proteins", "2.3", "Proteins", {
            stage: ASL,
            covers: ["abio.molecules.protein-structure", "abio.molecules.haemoglobin-collagen"],
            objectives: [
              o("2.3.1", "Describe and draw the general structure of an amino acid and the formation and breakage of a peptide bond."),
              o("2.3.2", "Explain primary, secondary, tertiary and quaternary structure."),
              o("2.3.3", "Describe the interactions that hold proteins in shape: hydrophobic interactions, hydrogen bonds, ionic bonds and covalent (including disulfide) bonds."),
              o("2.3.4", "State that globular proteins are generally soluble with physiological roles and fibrous proteins generally insoluble with structural roles."),
              o("2.3.5", "Describe haemoglobin as a globular protein of two alpha chains, two beta chains and haem groups."),
              o("2.3.6", "Relate the structure of haemoglobin, including the iron in haem, to its function."),
              o("2.3.7", "Describe collagen as a fibrous protein and how its molecules form fibres."),
              o("2.3.8", "Relate the structure of collagen molecules and fibres to their function."),
            ],
          }),
          sub("biological-molecules.water", "2.4", "Water", {
            stage: ASL,
            covers: ["abio.molecules.water"],
            objectives: [o("2.4.1", "Explain hydrogen bonding between water molecules and relate solvent action, high specific heat capacity and latent heat of vaporisation to the roles of water in organisms.")],
          }),
        ],
      }),
      topic("enzymes", "3", "Enzymes", {
        components: AS,
        children: [
          sub("enzymes.mode-of-action", "3.1", "Mode of action of enzymes", {
            stage: ASL,
            covers: ["abio.enzymes.mode-of-action"],
            objectives: [
              o("3.1.1", "State that enzymes are globular proteins acting inside cells or secreted to act outside them."),
              o("3.1.2", "Explain enzyme action in terms of active site, enzyme-substrate complex, lower activation energy and specificity, including lock-and-key and induced fit."),
              o("3.1.3", "Investigate the progress of enzyme reactions by product formation (catalase) and substrate disappearance (amylase)."),
              o("3.1.4", "Outline the use of a colorimeter to follow enzyme reactions that involve a colour change."),
            ],
          }),
          sub("enzymes.factors", "3.2", "Factors that affect enzyme action", {
            stage: ASL,
            covers: ["abio.enzymes.factors", "abio.enzymes.inhibition-kinetics"],
            objectives: [
              o("3.2.1", "Investigate and explain the effects of temperature, pH (with buffers), enzyme, substrate and inhibitor concentration on rate."),
              o("3.2.2", "Explain how Vmax is used to derive Km and how Km compares enzymes' affinity for their substrates."),
              o("3.2.3", "Explain the effects of competitive and non-competitive reversible inhibitors."),
              o("3.2.4", "Compare enzymes immobilised in alginate with free enzymes and state the advantages of immobilisation."),
            ],
          }),
        ],
      }),
      topic("membranes", "4", "Cell membranes and transport", {
        components: AS,
        children: [
          sub("membranes.fluid-mosaic", "4.1", "Fluid mosaic membranes", {
            stage: ASL,
            covers: ["abio.membranes.fluid-mosaic"],
            objectives: [
              o("4.1.1", "Describe the fluid mosaic model with reference to the hydrophobic and hydrophilic interactions that form the bilayer and place the proteins."),
              o("4.1.2", "Describe where cholesterol, glycolipids and glycoproteins lie in cell surface membranes."),
              o("4.1.3", "Describe the roles of membrane components in stability, fluidity, permeability, transport, cell signalling and cell recognition."),
              o("4.1.4", "Outline cell signalling: ligands secreted, transported to target cells and bound to receptors."),
            ],
          }),
          sub("membranes.movement", "4.2", "Movement into and out of cells", {
            stage: ASL,
            covers: ["abio.membranes.diffusion-osmosis", "abio.membranes.active-transport-bulk", "abio.membranes.surface-area-volume"],
            objectives: [
              o("4.2.1", "Describe and explain simple diffusion, facilitated diffusion, osmosis, active transport, endocytosis and exocytosis."),
              o("4.2.2", "Investigate diffusion and osmosis with plant tissue, Visking tubing and agar."),
              o("4.2.3", "Show by calculation that surface area to volume ratio decreases as size increases."),
              o("4.2.4", "Investigate the effect of surface area to volume ratio on diffusion with agar blocks."),
              o("4.2.5", "Estimate the water potential of a plant tissue from immersion in solutions of different water potentials."),
              o("4.2.6", "Explain water movement in terms of water potential and its different effects on plant and animal cells."),
            ],
          }),
        ],
      }),
      topic("cell-cycle", "5", "The mitotic cell cycle", {
        components: AS,
        children: [
          sub("cell-cycle.replication-division", "5.1", "Replication and division of nuclei and cells", {
            stage: ASL,
            covers: ["abio.division.chromosomes-cell-cycle", "abio.division.cancer"],
            objectives: [
              o("5.1.1", "Describe chromosome structure: DNA, histones, sister chromatids, centromere and telomeres."),
              o("5.1.2", "Explain the importance of mitosis in growth, replacement, repair and asexual reproduction."),
              o("5.1.3", "Outline the mitotic cell cycle: interphase (G1, S, G2), mitosis and cytokinesis."),
              o("5.1.4", "Outline how telomeres prevent loss of genes during DNA replication."),
              o("5.1.5", "Outline the role of stem cells in cell replacement and tissue repair."),
              o("5.1.6", "Explain how uncontrolled cell division can produce a tumour."),
            ],
          }),
          sub("cell-cycle.mitosis", "5.2", "Chromosome behaviour in mitosis", {
            stage: ASL,
            covers: ["abio.division.mitosis"],
            objectives: [
              o("5.2.1", "Describe the behaviour of chromosomes, nuclear envelope, cell membrane and spindle in prophase, metaphase, anaphase and telophase."),
              o("5.2.2", "Interpret photomicrographs, diagrams and slides of dividing cells and identify the stages of mitosis."),
            ],
          }),
        ],
      }),
      topic("nucleic-acids", "6", "Nucleic acids and protein synthesis", {
        components: AS,
        children: [
          sub("nucleic-acids.structure-replication", "6.1", "Structure of nucleic acids and replication of DNA", {
            stage: ASL,
            covers: ["abio.nucleic.dna-structure", "abio.nucleic.dna-replication"],
            objectives: [
              o("6.1.1", "Describe the structure of nucleotides, including ATP (no structural formulae)."),
              o("6.1.2", "State that adenine and guanine are double-ring purines and cytosine, thymine and uracil single-ring pyrimidines."),
              o("6.1.3", "Describe DNA as an antiparallel double helix with complementary base pairing, different hydrogen bonding in C-G and A-T and phosphodiester bonds."),
              o("6.1.4", "Describe semi-conservative replication in S phase, with DNA polymerase, DNA ligase and leading and lagging strands."),
              o("6.1.5", "Describe the structure of an RNA molecule, using mRNA."),
            ],
          }),
          sub("nucleic-acids.protein-synthesis", "6.2", "Protein synthesis", {
            stage: ASL,
            covers: ["abio.nucleic.transcription", "abio.nucleic.translation", "abio.nucleic.gene-mutation"],
            objectives: [
              o("6.2.1", "State that a gene is a sequence of nucleotides in DNA that codes for a polypeptide."),
              o("6.2.2", "Describe the universal genetic code of triplets coding for amino acids, start and stop codons."),
              o("6.2.3", "Describe transcription and translation, with the roles of RNA polymerase, mRNA, codons, tRNA, anticodons and ribosomes."),
              o("6.2.4", "State that the transcribed strand is the template strand and the other the non-transcribed strand."),
              o("6.2.5", "Explain how introns are removed and exons joined to form eukaryotic mRNA."),
              o("6.2.6", "State that a gene mutation is a change in the base sequence that may alter a polypeptide."),
              o("6.2.7", "Explain substitution, deletion and insertion mutations and how each may affect the polypeptide."),
            ],
          }),
        ],
      }),
      topic("plant-transport", "7", "Transport in plants", {
        components: AS,
        children: [
          sub("plant-transport.tissues", "7.1", "Structure of transport tissues", {
            stage: ASL,
            covers: ["abio.plant-transport.tissues"],
            objectives: [
              o("7.1.1", "Draw plan diagrams of transverse sections of herbaceous dicotyledonous stems, roots and leaves."),
              o("7.1.2", "Describe the distribution of xylem and phloem in those sections."),
              o("7.1.3", "Draw and label xylem vessel elements, sieve tube elements and companion cells."),
              o("7.1.4", "Relate the structure of xylem vessel elements, sieve tube elements and companion cells to their functions."),
            ],
          }),
          sub("plant-transport.mechanisms", "7.2", "Transport mechanisms", {
            stage: ASL,
            covers: ["abio.plant-transport.water-uptake", "abio.plant-transport.transpiration", "abio.plant-transport.translocation"],
            objectives: [
              o("7.2.1", "State that some mineral ions and organic compounds are transported dissolved in water."),
              o("7.2.2", "Describe water transport from soil to xylem by the apoplast and symplast pathways, with the endodermis, Casparian strip and suberin."),
              o("7.2.3", "Explain transpiration as evaporation from internal leaf surfaces and diffusion of water vapour out."),
              o("7.2.4", "Explain how hydrogen bonding gives cohesion-tension in the xylem and adhesion to cellulose walls."),
              o("7.2.5", "Make annotated drawings of xerophytic leaf sections to explain how they reduce water loss."),
              o("7.2.6", "State that assimilates move in sieve tubes from sources to sinks."),
              o("7.2.7", "Explain how companion cells load sieve tubes using proton pumps and cotransporter proteins."),
              o("7.2.8", "Explain mass flow in sieve tubes down a hydrostatic pressure gradient."),
            ],
          }),
        ],
      }),
      topic("mammal-transport", "8", "Transport in mammals", {
        components: AS,
        children: [
          sub("mammal-transport.circulatory-system", "8.1", "The circulatory system", {
            stage: ASL,
            covers: ["abio.mammal-transport.circulation-vessels"],
            objectives: [
              o("8.1.1", "State that mammals have a closed double circulation of heart, blood and vessels."),
              o("8.1.2", "Describe the functions of the pulmonary artery, pulmonary vein, aorta and vena cava."),
              o("8.1.3", "Recognise arteries, veins and capillaries and make plan diagrams of arteries and veins in TS and LS."),
              o("8.1.4", "Relate the structures of muscular and elastic arteries, veins and capillaries to their functions."),
              o("8.1.5", "Recognise and draw red blood cells, monocytes, neutrophils and lymphocytes."),
              o("8.1.6", "Relate the solvent action and high specific heat capacity of water to its role in transport."),
              o("8.1.7", "State the functions of tissue fluid and describe its formation in a capillary network."),
            ],
          }),
          sub("mammal-transport.gases", "8.2", "Transport of oxygen and carbon dioxide", {
            stage: ASL,
            covers: ["abio.mammal-transport.gas-transport"],
            objectives: [
              o("8.2.1", "Describe how red blood cells transport oxygen and carbon dioxide, with haemoglobin, carbonic anhydrase, haemoglobinic acid and carbaminohaemoglobin."),
              o("8.2.2", "Describe and explain the importance of the chloride shift."),
              o("8.2.3", "Describe the role of plasma in carbon dioxide transport."),
              o("8.2.4", "Describe and explain the oxygen dissociation curve of adult haemoglobin."),
              o("8.2.5", "Explain the importance of the curve at the partial pressures of the lungs and respiring tissues."),
              o("8.2.6", "Describe and explain the importance of the Bohr shift."),
            ],
          }),
          sub("mammal-transport.heart", "8.3", "The heart", {
            stage: ASL,
            covers: ["abio.mammal-transport.heart"],
            objectives: [
              o("8.3.1", "Describe the external and internal structure of the heart."),
              o("8.3.2", "Explain the different wall thicknesses of atria and ventricles and of the left and right ventricles."),
              o("8.3.3", "Describe the cardiac cycle, relating pressure changes in systole and diastole to the valves."),
              o("8.3.4", "Explain the roles of the sinoatrial node, atrioventricular node and Purkyne tissue."),
            ],
          }),
        ],
      }),
      topic("gas-exchange", "9", "Gas exchange", {
        components: AS,
        children: [
          sub("gas-exchange.system", "9.1", "The gas exchange system", {
            stage: ASL,
            covers: ["abio.gas-exchange.system"],
            objectives: [
              o("9.1.1", "Describe the structure of the human gas exchange system (lungs, trachea, bronchi, bronchioles, alveoli, capillary network)."),
              o("9.1.2", "Describe the distribution of cartilage, ciliated epithelium, goblet cells, alveolar squamous epithelium, smooth muscle and capillaries."),
              o("9.1.3", "Recognise those tissues in slides and micrographs."),
              o("9.1.4", "Recognise the trachea, bronchi, bronchioles and alveoli and draw plan diagrams of the trachea and bronchus wall."),
              o("9.1.5", "Describe how ciliated epithelial cells, goblet cells and mucous glands keep the system healthy."),
              o("9.1.6", "Describe the functions of cartilage, smooth muscle, elastic fibres and squamous epithelium."),
              o("9.1.7", "Describe gas exchange between alveolar air and capillary blood."),
            ],
          }),
        ],
      }),
      topic("infectious-diseases", "10", "Infectious diseases", {
        components: AS,
        children: [
          sub("infectious-diseases.diseases", "10.1", "Infectious diseases", {
            stage: ASL,
            covers: ["abio.disease.cholera-tb", "abio.disease.malaria", "abio.disease.hiv-aids"],
            objectives: [
              o("10.1.1", "State that infectious diseases are caused by pathogens and are transmissible."),
              o("10.1.2", "Name the pathogens of cholera, malaria, tuberculosis and HIV/AIDS and their type."),
              o("10.1.3", "Explain how cholera, malaria, TB and HIV are transmitted."),
              o("10.1.4", "Discuss the biological, social and economic factors in preventing and controlling cholera, malaria, TB and HIV."),
            ],
          }),
          sub("infectious-diseases.antibiotics", "10.2", "Antibiotics", {
            stage: ASL,
            covers: ["abio.disease.antibiotics"],
            objectives: [
              o("10.2.1", "Outline how penicillin acts on bacteria and why antibiotics do not affect viruses."),
              o("10.2.2", "Discuss the consequences of antibiotic resistance and how to reduce its impact."),
            ],
          }),
        ],
      }),
      topic("immunity", "11", "Immunity", {
        components: AS,
        children: [
          sub("immunity.immune-system", "11.1", "The immune system", {
            stage: ASL,
            covers: ["abio.immunity.immune-response"],
            objectives: [
              o("11.1.1", "Describe how phagocytes (macrophages and neutrophils) act."),
              o("11.1.2", "Explain what an antigen is and distinguish self from non-self antigens."),
              o("11.1.3", "Describe the primary immune response with the roles of macrophages, B-lymphocytes and plasma cells, T-helper and T-killer cells."),
              o("11.1.4", "Explain the role of memory cells in the secondary response and long-term immunity."),
            ],
          }),
          sub("immunity.antibodies-vaccination", "11.2", "Antibodies and vaccination", {
            stage: ASL,
            covers: ["abio.immunity.antibodies", "abio.immunity.vaccination"],
            objectives: [
              o("11.2.1", "Relate the molecular structure of antibodies to their functions."),
              o("11.2.2", "Outline the hybridoma method for producing monoclonal antibodies."),
              o("11.2.3", "Outline the principles of using monoclonal antibodies to diagnose and treat disease."),
              o("11.2.4", "Distinguish active from passive and natural from artificial immunity."),
              o("11.2.5", "Explain that vaccines contain antigens that stimulate long-term immunity."),
              o("11.2.6", "Explain how vaccination programmes help to control infectious diseases."),
            ],
          }),
        ],
      }),
    ],
  }),
  section("a-level-content", "A", "A Level subject content", {
    description: "Topics 12-19: A Level only; examined in Paper 4, with AS content assumed.",
    children: [
      topic("energy-respiration", "12", "Energy and respiration", {
        components: AL,
        children: [
          sub("energy-respiration.energy", "12.1", "Energy", {
            stage: ALO,
            covers: ["abio.respiration.atp", "abio.respiration.substrates-rq"],
            objectives: [
              o("12.1.1", "Outline the need for energy in active transport, movement and anabolic reactions such as DNA replication and protein synthesis."),
              o("12.1.2", "Describe the features that make ATP suitable as the universal energy currency."),
              o("12.1.3", "State that ATP is made by substrate-linked phosphorylation and by chemiosmosis in mitochondria and chloroplasts."),
              o("12.1.4", "Explain the relative energy values of carbohydrates, lipids and proteins as respiratory substrates."),
              o("12.1.5", "State that RQ is the ratio of carbon dioxide molecules produced to oxygen molecules taken in."),
              o("12.1.6", "Calculate RQ values of substrates from respiration equations."),
              o("12.1.7", "Use simple respirometers to determine the RQ of germinating seeds or small invertebrates."),
            ],
          }),
          sub("energy-respiration.respiration", "12.2", "Respiration", {
            stage: ALO,
            covers: ["abio.respiration.glycolysis-krebs", "abio.respiration.oxidative-phosphorylation", "abio.respiration.anaerobic"],
            objectives: [
              o("12.2.1", "State the sites of glycolysis, the link reaction, the Krebs cycle and oxidative phosphorylation."),
              o("12.2.2", "Outline glycolysis: phosphorylation of glucose, splitting of fructose 1,6-bisphosphate into triose phosphates and oxidation to pyruvate with ATP and reduced NAD."),
              o("12.2.3", "Explain that pyruvate enters mitochondria for the link reaction when oxygen is available."),
              o("12.2.4", "Describe the link reaction, including the role of coenzyme A."),
              o("12.2.5", "Outline the Krebs cycle from oxaloacetate and acetyl CoA to citrate and back."),
              o("12.2.6", "Explain decarboxylation, dehydrogenation and the reduction of NAD and FAD in the Krebs cycle."),
              o("12.2.7", "Describe how NAD and FAD carry hydrogen to the inner mitochondrial membrane."),
              o("12.2.8", "Explain oxidative phosphorylation: electron transport, proton pumping, chemiosmosis through ATP synthase and oxygen as final electron acceptor."),
              o("12.2.9", "Relate the structure of mitochondria to their function."),
              o("12.2.10", "Outline lactate fermentation in mammals and ethanol fermentation in yeast."),
              o("12.2.11", "Explain why aerobic respiration yields much more energy than anaerobic respiration."),
              o("12.2.12", "Explain how rice is adapted to grow with submerged roots."),
              o("12.2.13", "Use redox indicators (DCPIP, methylene blue) to investigate the effects of temperature and substrate concentration on yeast respiration."),
              o("12.2.14", "Use simple respirometers to investigate the effect of temperature on respiration rate."),
            ],
          }),
        ],
      }),
      topic("photosynthesis", "13", "Photosynthesis", {
        components: AL,
        children: [
          sub("photosynthesis.energy-transfer", "13.1", "Photosynthesis as an energy transfer process", {
            stage: ALO,
            covers: ["abio.photosynthesis.chloroplasts-pigments", "abio.photosynthesis.light-dependent", "abio.photosynthesis.calvin-c4"],
            objectives: [
              o("13.1.1", "Relate chloroplast structure, from diagrams and electron micrographs, to function."),
              o("13.1.2", "Explain that ATP and reduced NADP from the light-dependent stage drive the Calvin cycle."),
              o("13.1.3", "State that thylakoids are the site of the light-dependent stage and the stroma of the light-independent stage."),
              o("13.1.4", "Describe the roles of chlorophyll a, chlorophyll b, carotene and xanthophyll in light absorption."),
              o("13.1.5", "Interpret absorption and action spectra."),
              o("13.1.6", "Use chromatography and Rf values to separate and identify chloroplast pigments."),
              o("13.1.7", "State that cyclic and non-cyclic photophosphorylation occur in the light-dependent stage."),
              o("13.1.8", "Explain cyclic photophosphorylation (PSI only, photoactivation, ATP)."),
              o("13.1.9", "Explain non-cyclic photophosphorylation (PSI and PSII, photolysis of water, ATP and reduced NADP)."),
              o("13.1.10", "Explain electron transport, proton pumping and chemiosmosis across the thylakoid membrane."),
              o("13.1.11", "Outline the three stages of the Calvin cycle: fixation by rubisco, reduction of GP to TP, regeneration of RuBP."),
              o("13.1.12", "State that GP is used for some amino acids and TP for carbohydrates, lipids and amino acids."),
            ],
          }),
          sub("photosynthesis.limiting-factors", "13.2", "Investigation of limiting factors", {
            stage: ALO,
            covers: ["abio.photosynthesis.limiting-factors"],
            objectives: [
              o("13.2.1", "State that light intensity, carbon dioxide concentration and temperature are limiting factors."),
              o("13.2.2", "Explain how these factors affect the rate of photosynthesis."),
              o("13.2.3", "Use redox indicators and chloroplast suspensions to investigate light intensity and wavelength."),
              o("13.2.4", "Use whole plants, including aquatic plants, to investigate light intensity, carbon dioxide concentration and temperature."),
            ],
          }),
        ],
      }),
      topic("homeostasis", "14", "Homeostasis", {
        components: AL,
        children: [
          sub("homeostasis.mammals", "14.1", "Homeostasis in mammals", {
            stage: ALO,
            covers: ["abio.homeostasis.principles", "abio.homeostasis.kidney", "abio.homeostasis.blood-glucose"],
            objectives: [
              o("14.1.1", "Explain what homeostasis is and why it matters in mammals."),
              o("14.1.2", "Explain homeostasis in terms of stimuli, receptors, nervous and endocrine coordination, effectors and negative feedback."),
              o("14.1.3", "State that urea is made in the liver by deamination of excess amino acids."),
              o("14.1.4", "Describe the structure of the kidney."),
              o("14.1.5", "Identify the parts of a nephron and its blood vessels."),
              o("14.1.6", "Describe and explain ultrafiltration in the Bowman's capsule and selective reabsorption in the proximal convoluted tubule."),
              o("14.1.7", "Relate the structure of the Bowman's capsule and proximal convoluted tubule to their functions."),
              o("14.1.8", "Describe the roles of the hypothalamus, posterior pituitary, ADH, aquaporins and collecting ducts in osmoregulation."),
              o("14.1.9", "Describe cell signalling by glucagon: receptor, G-protein, adenylyl cyclase, cAMP, protein kinase A and the amplifying enzyme cascade."),
              o("14.1.10", "Explain negative feedback control of blood glucose by insulin (muscle and liver) and glucagon (liver)."),
              o("14.1.11", "Explain how test strips and biosensors measure glucose, with glucose oxidase and peroxidase."),
            ],
          }),
          sub("homeostasis.plants", "14.2", "Homeostasis in plants", {
            stage: ALO,
            covers: ["abio.homeostasis.stomata"],
            objectives: [
              o("14.2.1", "Explain how stomatal opening and closing balances carbon dioxide uptake against water loss."),
              o("14.2.2", "Explain that stomata have daily rhythms of opening and closing."),
              o("14.2.3", "Describe guard cells and explain how they open and close stomata."),
              o("14.2.4", "Describe the role of abscisic acid and calcium ions in closing stomata under water stress."),
            ],
          }),
        ],
      }),
      topic("control-coordination", "15", "Control and coordination", {
        components: AL,
        children: [
          sub("control-coordination.mammals", "15.1", "Control and coordination in mammals", {
            stage: ALO,
            covers: ["abio.coordination.nervous-endocrine", "abio.coordination.action-potential", "abio.coordination.impulse-transmission", "abio.coordination.synapses", "abio.coordination.muscle-contraction"],
            objectives: [
              o("15.1.1", "Describe the endocrine system with reference to ADH, glucagon and insulin."),
              o("15.1.2", "Compare the nervous and endocrine systems."),
              o("15.1.3", "Describe sensory and motor neurones and state that intermediate neurones connect them."),
              o("15.1.4", "Outline how sensory receptor cells detect stimuli and start impulses."),
              o("15.1.5", "Describe how an action potential arises in a sensory neurone, using a taste-bud chemoreceptor."),
              o("15.1.6", "Describe and explain the resting potential, the action potential and the restoration of the resting potential."),
              o("15.1.7", "Describe and explain saltatory conduction in myelinated neurones."),
              o("15.1.8", "Explain how the refractory period limits the frequency of impulses."),
              o("15.1.9", "Describe the structure and function of a cholinergic synapse, including calcium ions."),
              o("15.1.10", "Describe the roles of neuromuscular junctions, T-tubules and sarcoplasmic reticulum in stimulating contraction."),
              o("15.1.11", "Describe the ultrastructure of striated muscle and the sarcomere."),
              o("15.1.12", "Explain the sliding filament model with troponin, tropomyosin, calcium ions and ATP."),
            ],
          }),
          sub("control-coordination.plants", "15.2", "Control and coordination in plants", {
            stage: ALO,
            covers: ["abio.coordination.plant-responses"],
            objectives: [
              o("15.2.1", "Describe and explain the rapid closure of the Venus fly trap."),
              o("15.2.2", "Explain how auxin causes elongation growth by stimulating proton pumping that acidifies cell walls."),
              o("15.2.3", "Describe the role of gibberellin in the germination of barley."),
            ],
          }),
        ],
      }),
      topic("inheritance", "16", "Inheritance", {
        components: AL,
        children: [
          sub("inheritance.passage", "16.1", "Passage of information from parents to offspring", {
            stage: ALO,
            covers: ["abio.division.meiosis", "abio.division.genetic-variation"],
            objectives: [
              o("16.1.1", "Explain the terms haploid (n) and diploid (2n)."),
              o("16.1.2", "Explain homologous pairs of chromosomes."),
              o("16.1.3", "Explain why gamete production needs a reduction division."),
              o("16.1.4", "Describe chromosome behaviour and the nuclear envelope, membrane and spindle in the stages of meiosis I and II."),
              o("16.1.5", "Interpret photomicrographs and diagrams of meiosis and identify its stages."),
              o("16.1.6", "Explain how crossing over and random orientation in meiosis produce genetically different gametes."),
              o("16.1.7", "Explain how random fusion of gametes produces genetically different individuals."),
            ],
          }),
          sub("inheritance.genes-phenotype", "16.2", "The roles of genes in determining the phenotype", {
            stage: ALO,
            covers: ["abio.inheritance.genes-phenotype", "abio.inheritance.monohybrid", "abio.inheritance.sex-linkage", "abio.inheritance.dihybrid", "abio.inheritance.linkage-epistasis", "abio.inheritance.chi-squared"],
            objectives: [
              o("16.2.1", "Explain gene, locus, allele, dominant, recessive, codominant, linkage, test cross, F1, F2, phenotype, genotype, homozygous and heterozygous."),
              o("16.2.2", "Use genetic diagrams and Punnett squares for monohybrid and dihybrid crosses with dominance, codominance, multiple alleles and sex linkage."),
              o("16.2.3", "Use genetic diagrams for dihybrid crosses with autosomal linkage and epistasis."),
              o("16.2.4", "Use genetic diagrams to explain and predict test crosses."),
              o("16.2.5", "Use the chi-squared test (formula provided) to test the significance of differences between observed and expected results."),
              o("16.2.6", "Explain how genes, proteins and phenotype are related for TYR (albinism), HBB (sickle cell anaemia), F8 (haemophilia) and HTT (Huntington's disease)."),
              o("16.2.7", "Explain how the Le and le alleles affect gibberellin synthesis and stem elongation."),
            ],
          }),
          sub("inheritance.gene-control", "16.3", "Gene control", {
            stage: ALO,
            covers: ["abio.inheritance.gene-control"],
            objectives: [
              o("16.3.1", "Distinguish structural from regulatory genes and repressible from inducible enzymes."),
              o("16.3.2", "Explain the control of protein production in a prokaryote using the lac operon."),
              o("16.3.3", "State that transcription factors bind DNA and raise or lower transcription in eukaryotes."),
              o("16.3.4", "Explain how gibberellin activates genes by causing breakdown of DELLA repressor proteins."),
            ],
          }),
        ],
      }),
      topic("selection-evolution", "17", "Selection and evolution", {
        components: AL,
        children: [
          sub("selection-evolution.variation", "17.1", "Variation", {
            stage: ALO,
            covers: ["abio.evolution.variation", "abio.evolution.t-test"],
            objectives: [
              o("17.1.1", "Explain, with examples, that variation has genetic, environmental or combined causes."),
              o("17.1.2", "Explain discontinuous and continuous variation."),
              o("17.1.3", "Explain the genetic basis of discontinuous and continuous variation."),
              o("17.1.4", "Use the t-test (formula provided) to compare the means of two samples."),
            ],
          }),
          sub("selection-evolution.selection", "17.2", "Natural and artificial selection", {
            stage: ALO,
            covers: ["abio.evolution.natural-selection", "abio.evolution.allele-frequencies", "abio.evolution.artificial-selection"],
            objectives: [
              o("17.2.1", "Explain natural selection in terms of overproduction, competition, survival of the best adapted and inheritance of their alleles."),
              o("17.2.2", "Explain stabilising, disruptive and directional selection."),
              o("17.2.3", "Explain how selection, the founder effect, genetic drift and the bottleneck effect change allele frequencies."),
              o("17.2.4", "Outline antibiotic resistance in bacteria as an example of natural selection."),
              o("17.2.5", "Use the Hardy-Weinberg principle (equations provided) and state when it applies."),
              o("17.2.6", "Describe the principles of selective breeding."),
              o("17.2.7", "Outline selective breeding for disease resistance in wheat and rice, hybrid maize, and milk yield in dairy cattle."),
            ],
          }),
          sub("selection-evolution.evolution", "17.3", "Evolution", {
            stage: ALO,
            covers: ["abio.evolution.speciation"],
            objectives: [
              o("17.3.1", "Outline evolution as the formation of new species through changes in gene pools over generations."),
              o("17.3.2", "Discuss how DNA sequence data show evolutionary relationships."),
              o("17.3.3", "Explain allopatric and sympatric speciation through genetic isolation."),
            ],
          }),
        ],
      }),
      topic("classification-biodiversity", "18", "Classification, biodiversity and conservation", {
        components: AL,
        children: [
          sub("classification-biodiversity.classification", "18.1", "Classification", {
            stage: ALO,
            covers: ["abio.biodiversity.classification-hierarchy", "abio.biodiversity.kingdoms"],
            objectives: [
              o("18.1.1", "Discuss the biological, morphological and ecological species concepts."),
              o("18.1.2", "Describe the three domains Archaea, Bacteria and Eukarya."),
              o("18.1.3", "State that Archaea and Bacteria are prokaryotes differing in membrane lipids, ribosomal RNA and cell walls."),
              o("18.1.4", "Describe the taxonomic hierarchy within Eukarya."),
              o("18.1.5", "Outline the features of the kingdoms Protoctista, Fungi, Plantae and Animalia."),
              o("18.1.6", "Outline how viruses are classified by nucleic acid type and strandedness."),
            ],
          }),
          sub("classification-biodiversity.biodiversity", "18.2", "Biodiversity", {
            stage: ALO,
            covers: ["abio.ecology.levels-organisation", "abio.biodiversity.sampling", "abio.biodiversity.diversity-statistics"],
            objectives: [
              o("18.2.1", "Define ecosystem and niche."),
              o("18.2.2", "Explain that biodiversity is assessed at the levels of ecosystems and habitats, species and their abundance, and genetic variation."),
              o("18.2.3", "Explain why random sampling matters in assessing biodiversity."),
              o("18.2.4", "Use quadrats, line and belt transects and mark-release-recapture with the Lincoln index (formula provided)."),
              o("18.2.5", "Use Spearman's rank and Pearson's linear correlation (formulae provided) to analyse relationships, including biotic and abiotic effects on distribution."),
              o("18.2.6", "Use Simpson's index of diversity (formula provided) and interpret its values."),
            ],
          }),
          sub("classification-biodiversity.conservation", "18.3", "Conservation", {
            stage: ALO,
            covers: ["abio.conservation.threats-strategies", "abio.conservation.organisations-invasives"],
            objectives: [
              o("18.3.1", "Explain how climate change, competition, hunting and habitat loss can cause extinction."),
              o("18.3.2", "Outline reasons for maintaining biodiversity."),
              o("18.3.3", "Outline the roles of zoos, botanic gardens, conserved areas, frozen zoos and seed banks."),
              o("18.3.4", "Describe IVF, embryo transfer and surrogacy in conserving endangered mammals."),
              o("18.3.5", "Explain reasons for controlling invasive alien species."),
              o("18.3.6", "Outline the roles of IUCN and CITES in conservation."),
            ],
          }),
        ],
      }),
      topic("genetic-technology", "19", "Genetic technology", {
        components: AL,
        children: [
          sub("genetic-technology.principles", "19.1", "Principles of genetic technology", {
            stage: ALO,
            covers: ["abio.genetech.recombinant-dna", "abio.genetech.pcr-electrophoresis-fingerprinting", "abio.genetech.microarrays-bioinformatics"],
            objectives: [
              o("19.1.1", "Define recombinant DNA."),
              o("19.1.2", "Explain genetic engineering as deliberate manipulation of genetic material, which may involve transferring a gene so it is expressed."),
              o("19.1.3", "Explain that genes for transfer may be extracted, made from mRNA or synthesised from nucleotides."),
              o("19.1.4", "Explain the roles of restriction endonucleases, DNA ligase, plasmids, DNA polymerase and reverse transcriptase."),
              o("19.1.5", "Explain why a promoter may be transferred with the gene."),
              o("19.1.6", "Explain how marker genes for fluorescent products confirm gene expression."),
              o("19.1.7", "Explain gene editing as insertion, deletion or replacement of DNA at specific sites."),
              o("19.1.8", "Describe and explain PCR, including the role of Taq polymerase."),
              o("19.1.9", "Describe and explain gel electrophoresis of DNA fragments."),
              o("19.1.10", "Outline how microarrays are used to analyse genomes and detect mRNA."),
              o("19.1.11", "Outline the benefits of sequence and protein-structure databases."),
            ],
          }),
          sub("genetic-technology.medicine", "19.2", "Genetic technology applied to medicine", {
            stage: ALO,
            covers: ["abio.genetech.insulin-recombinant-proteins", "abio.genetech.genetic-screening", "abio.genetech.gene-therapy"],
            objectives: [
              o("19.2.1", "Explain the advantages of recombinant human proteins: insulin, factor VIII and adenosine deaminase."),
              o("19.2.2", "Outline the advantages of genetic screening for BRCA1 and BRCA2, Huntington's disease and cystic fibrosis."),
              o("19.2.3", "Outline gene therapy for SCID and inherited eye diseases."),
              o("19.2.4", "Discuss the social and ethical considerations of genetic screening and gene therapy."),
            ],
          }),
          sub("genetic-technology.agriculture", "19.3", "Genetically modified organisms in agriculture", {
            stage: ALO,
            covers: ["abio.genetech.gmo-agriculture"],
            objectives: [
              o("19.3.1", "Explain how GM salmon, herbicide-resistant soybean and insect-resistant cotton may help to meet the demand for food."),
              o("19.3.2", "Discuss the ethical and social implications of GMOs in food production."),
            ],
          }),
        ],
      }),
    ],
  }),
  section("practical-skills", "PS", "Practical skills", {
    description: "Not a content section of the syllabus: our grouping of the practical assessment section (Papers 3 and 5) and the Mathematical requirements.",
    children: [
      topic("practical-skills.paper-3", "P3", "Advanced practical skills (Paper 3)", {
        components: ["3"],
        description: "AS Level: manipulation, measurement and observation; presentation of data and observations; analysis, conclusions and evaluation, including light microscopy.",
        children: [
          sub("practical-skills.paper-3.investigations", "P3.1", "Investigations: measurement, presentation and analysis", {
            stage: ASL,
            covers: ["abio.skills.practical-investigation"],
            objectives: [
              o("P3.1.1", "Decide on variables, ranges, intervals, replicates, controls and standardised variables in an investigation."),
              o("P3.1.2", "Collect data safely, assessing risk, and record raw and processed results in well-headed tables to an appropriate precision."),
              o("P3.1.3", "Display data as graphs, bar charts or histograms drawn to the stated conventions."),
              o("P3.1.4", "Interpret data, identify anomalies, draw conclusions and identify errors and improvements."),
            ],
          }),
          sub("practical-skills.paper-3.microscopy", "P3.2", "Light microscopy and drawing", {
            stage: ASL,
            covers: ["abio.skills.biological-drawing"],
            objectives: [
              o("P3.2.1", "Set up a light microscope, make a stained temporary slide and find and draw specified tissues and cells."),
              o("P3.2.2", "Draw plan diagrams and cell drawings to the stated conventions and record observable similarities and differences."),
              o("P3.2.3", "Measure and calculate actual sizes using magnifications, scale bars, graticules and stage micrometers, and estimate numbers of cells in an area."),
            ],
          }),
        ],
      }),
      topic("practical-skills.paper-5", "P5", "Planning, analysis and evaluation (Paper 5)", {
        components: ["5"],
        description: "A Level: planning, analysis, conclusions and evaluation, with the A Level statistics of the Mathematical requirements.",
        children: [
          sub("practical-skills.paper-5.planning", "P5.1", "Planning, analysis and evaluation", {
            stage: ALO,
            covers: ["abio.skills.planning-evaluation"],
            objectives: [
              o("P5.1.1", "State a prediction linked to a hypothesis and identify the variables to change, measure and standardise."),
              o("P5.1.2", "Describe a method with suitable concentrations (serial or proportional dilution), controls, replicates and a risk assessment."),
              o("P5.1.3", "Process given data, choose and justify a statistical test, state a null hypothesis and draw conclusions."),
              o("P5.1.4", "Evaluate anomalies, replication, ranges, measurement methods and control of variables, and judge validity and confidence."),
            ],
          }),
          sub("practical-skills.paper-5.statistics", "P5.2", "Descriptive statistics", {
            stage: ALO,
            covers: ["abio.skills.descriptive-statistics"],
            objectives: [
              o("P5.2.1", "Use mean, median, mode, range, standard deviation, standard error and 95% confidence intervals (formulae provided)."),
              o("P5.2.2", "Plot error bars and judge whether differences between means are likely to be significant."),
              o("P5.2.3", "Distinguish normal from non-normal distributions and correlation from causation."),
            ],
          }),
        ],
      }),
    ],
  }),
];

const c9700 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "biology",
  versionLabel: "2025-2027",
  family: "biology-a",
  title: "Cambridge International AS & A Level Biology (9700)",
  code: "9700",
  effectiveFrom: "2025-01-01",
  effectiveTo: "2027-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Biology 9700 syllabus for 2025, 2026 and 2027 (version 1, published September 2022)",
    url: "https://www.cambridgeinternational.org/Images/664560-2025-2027-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1 Cell structure ... 19.3 Genetically modified organisms in agriculture) are transcribed with their printed numbers; objective codes are the printed learning-outcome references (topic, sub-topic, outcome number, e.g. 11.1.2, as the syllabus cross-refers). Objectives paraphrase the learning outcomes in our own words. The three sections and the practical-skills topics P3 and P5 (with codes P3.1 ... P5.2.3) are ours, summarising the Practical assessment section and the Mathematical requirements. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-09): the official PDF 'Cambridge International AS & A Level Biology 9700 syllabus for 2025, 2026 and 2027', version 1, published September 2022, read through a pdftotext rendering. Exams in the June and November series (March for India). Check the headings and objective codes against the PDF.",
    "Routes as printed: AS Level only (Papers 1, 2 and 3 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 4 and 5); A Level in one series (all five papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Paper 1 31% of AS and 15.5% of A Level; Paper 2 46% and 23%; Paper 3 23% and 11.5%; Paper 4 38.5% of A Level; Paper 5 11.5% of A Level. weightingPercent records the A Level share; the AS shares are in each paper's description.",
    "Topics 1-11 are AS content (Papers 1 and 2, assumed knowledge for Paper 4); topics 12-19 are A Level only (Paper 4). Meiosis and genetic crosses (16), respiration (12) and photosynthesis (13) are therefore A Level only for Cambridge although ZIMSEC teaches them in Form 5. The statistics (chi-squared, t-test, standard deviation, standard error, 95% confidence intervals, Hardy-Weinberg, Lincoln index, Simpson's index, Pearson and Spearman correlation) are A Level only; formulae and critical-value tables are provided in the examination, and degrees of freedom must be known.",
    "Papers 3 and 5 test practical skills (AO3) in contexts that may lie outside the syllabus content. Paper 3 (40 marks) gives about 15-17 marks to manipulation, measurement and observation, 11-13 to presentation and 11-13 to analysis, conclusions and evaluation; Paper 5 (30 marks) about 14-16 to planning and 14-16 to analysis, conclusions and evaluation. The practical paper cannot be simulated; written items practise its skills.",
    "Paper 2 and Paper 4 question structures and part marks are not printed in the syllabus; our practice exam-format items use a convention that a reviewer must check against recent papers.",
    "This syllabus is for examination in 2025-2027. Candidates from 2028 will follow a later syllabus (not in the repository); check the Cambridge website for it and add a new version file.",
  ],
  overview: "Cambridge International AS & A Level Biology (9700) is a two-stage course. The AS Level content (topics 1-11) covers cell structure and microscopy, biological molecules, enzymes, cell membranes and transport, the mitotic cell cycle, nucleic acids and protein synthesis, transport in plants and mammals, gas exchange, infectious diseases and immunity. The A Level content (topics 12-19) adds energy and respiration, photosynthesis, homeostasis, control and coordination, inheritance, selection and evolution, classification, biodiversity and conservation, and genetic technology, with statistical analysis of biological data and higher-level practical skills.",
  assessmentOverview: "AS Level candidates take Paper 1 Multiple Choice (1 hour 15 minutes, 40 marks), Paper 2 AS Level Structured Questions (1 hour 15 minutes, 60 marks) and Paper 3 Advanced Practical Skills (2 hours, 40 marks). A Level candidates also take Paper 4 A Level Structured Questions (2 hours, 100 marks) and Paper 5 Planning, Analysis and Evaluation (1 hour 15 minutes, 30 marks), either in the same series or a later one, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "40 four-option multiple-choice questions on the AS Level content (AO1 and AO2). 31% of AS Level, 15.5% of A Level.", durationMinutes: 75, maxMarks: 40, weightingPercent: 15.5, calculatorAllowed: true },
    { code: "2", name: "Paper 2: AS Level Structured Questions", kind: "WRITTEN", description: "Structured questions on the AS Level content (AO1 and AO2). 46% of AS Level, 23% of A Level.", durationMinutes: 75, maxMarks: 60, weightingPercent: 23, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Advanced Practical Skills", kind: "PRACTICAL", description: "A laboratory practical test of two or three questions (AO3): an investigation and light-microscope work, in contexts from AS Level biology. 23% of AS Level, 11.5% of A Level.", durationMinutes: 120, maxMarks: 40, weightingPercent: 11.5, calculatorAllowed: true },
    { code: "4", name: "Paper 4: A Level Structured Questions", kind: "WRITTEN", description: "Structured questions on the A Level content, with AS Level content assumed (AO1 and AO2). 38.5% of A Level.", durationMinutes: 120, maxMarks: 100, weightingPercent: 38.5, calculatorAllowed: true },
    { code: "5", name: "Paper 5: Planning, Analysis and Evaluation", kind: "WRITTEN", description: "A written paper of two or more questions on planning investigations and analysing and evaluating given data, including statistics (AO3); no laboratory work. 11.5% of A Level.", durationMinutes: 75, maxMarks: 30, weightingPercent: 11.5, calculatorAllowed: true },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1, 2 and 3 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2", "3"] },
    { code: "A", name: "A Level", description: "All five papers, in one series or staged (AS Level carried forward, then Papers 4 and 5) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4", "5"] },
  ],
  topics: C9700_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out. Then label each concept description with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
for (const s of [zimsec, c9700]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      if ((n.covers ?? []).length && !(n._form || n._stage)) throw new Error(`${s.board}: ${n.key} covers concepts but has no form/stage`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coverage.set(c, { ...(coverage.get(c) ?? {}), [s.board]: n._form ?? n._stage });
      }
      for (const ob of n.objectives ?? []) {
        if (codes.has(ob.code)) throw new Error(`${s.board}: duplicate objective code ${ob.code}`);
        codes.add(ob.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}\n`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coverage.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);

const label = (cv) => {
  if (cv.zimsec && cv.cambridge) return `Both boards (ZIMSEC ${cv.zimsec}; Cambridge ${cv.cambridge}).`;
  if (cv.zimsec) return `ZIMSEC only (${cv.zimsec}).`;
  return `Cambridge only (${cv.cambridge}).`;
};
const shared = [...coverage.values()].filter((c) => c.zimsec && c.cambridge).length;
console.log(`${CONCEPTS.length} concepts in the registry (${shared} shared, ${[...coverage.values()].filter((c) => !c.cambridge).length} ZIMSEC only, ${[...coverage.values()].filter((c) => !c.zimsec).length} Cambridge only)`);

const registry = {
  family: "biology-a",
  name: "Biology (A-Level / AS & A Level)",
  level: "A",
  prefix: "abio",
  subjects: ["zimsec/a-level/biology", "cambridge/a-level/biology"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/biology-a.json", registry);
write("content/syllabi/zimsec/a-level/biology/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/biology/2025-2027.json", c9700);
