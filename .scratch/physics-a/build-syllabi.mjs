// Builds content/concepts/physics-a.json and the two A-Level Physics syllabus files:
//   content/syllabi/zimsec/a-level/physics/2015-2022.json      (ZIMSEC A-Level Physics, Forms 5-6)
//   content/syllabi/cambridge/a-level/physics/2025-2027.json   (Cambridge International AS & A Level Physics 9702)
// Sources (local only, not in git): .scratch/physics-a/sources/zimsec-physics-forms-3-6-teachers-guide.pdf (+ .txt):
// the Ministry's Physics Form 3-6 Teacher's Guide (its "TOPIC FORM 5 FORM 6" table), because the Forms 5-6 syllabus
// itself could not be obtained; and 9702-2025-2027.pdf (+ .txt). The concept registry lives in ./concepts.mjs; this
// script prepends each concept's coverage label.
// Run from the repo root: node .scratch/physics-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
const CONCEPT_NAME = new Map(CONCEPTS.map(([k, n]) => [k, n]));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^aphys\.[a-z0-9-]+\.[a-z0-9-]+$/.test(k)) throw new Error(`bad concept key ${k}`);

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. `form` (ZIMSEC: "Form 5" / "Form 6") and `stage` (Cambridge: "AS Level" / "A Level only") are build-time
// metadata used for the concept labels; keys starting with "_" are not written.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children, form, stage } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  if (form) n._form = form;
  if (stage) n._stage = stage;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// =====================================================================================================================
// ZIMSEC A-Level Physics, Forms 5-6, 2015-2022. Built from the "TOPIC / FORM 5 / FORM 6" table of the Ministry's
// Physics Form 3-6 Teacher's Guide (seven topic areas, 30 sub-topics, each placed in Form 5 or Form 6). The guide prints
// no numbers and no objectives for Forms 5-6, so every code is ours (topic 1-7, sub-topic n.m, objective n.m.k) and the
// objectives are generic statements of the matching concepts. P (Practical skills) is ours.
const ZTHEORY = ["1", "2", "3"];
const F5 = "Form 5";
const F6 = "Form 6";
// Lower-case the first word of a concept name for use mid-sentence, except proper nouns and abbreviations.
const lowerFirst = (name) => (/^([A-Z][a-z]*'s|[A-Z][A-Z.\-]|[A-Z]\.)/.test(name) ? name : name.replace(/^./, (x) => x.toLowerCase()));
const zsub = (key, code, name, form, covers, extra = {}) =>
  sub(key, code, name, {
    form,
    description: `${form}.${extra.note ? ` ${extra.note}` : ""}`,
    covers,
    objectives: extra.objectives ?? covers.map((c) => `Understand and apply: ${lowerFirst(CONCEPT_NAME.get(c))}.`),
  });

const ZIMSEC_TOPICS = [
  topic("general-physics", "1", "General Physics", {
    description: "Form 5.",
    components: ZTHEORY,
    children: [
      zsub("general-physics.quantities-units", "1.1", "Physical Quantities and Units", F5, ["aphys.measurement.si-units", "aphys.measurement.scalars-vectors"]),
      zsub("general-physics.errors-uncertainties", "1.2", "Errors and Uncertainties", F5, ["aphys.measurement.errors-uncertainties", "aphys.measurement.instruments"]),
    ],
  }),
  topic("newtonian-mechanics", "2", "Newtonian Mechanics", {
    description: "Form 5.",
    components: ZTHEORY,
    children: [
      zsub("newtonian-mechanics.kinematics", "2.1", "Kinematics", F5, ["aphys.kinematics.motion-graphs", "aphys.kinematics.suvat", "aphys.kinematics.projectiles"]),
      zsub("newtonian-mechanics.dynamics", "2.2", "Dynamics", F5, ["aphys.dynamics.newtons-laws", "aphys.dynamics.momentum-force", "aphys.dynamics.conservation-momentum", "aphys.dynamics.drag-terminal-velocity"]),
      zsub("newtonian-mechanics.forces", "2.3", "Forces", F5, ["aphys.forces.moments-couples", "aphys.forces.equilibrium", "aphys.forces.density-pressure-upthrust"]),
      zsub("newtonian-mechanics.work-energy-power", "2.4", "Work, Energy and Power", F5, ["aphys.energy.work-conservation-efficiency", "aphys.energy.gpe-ke", "aphys.energy.power"]),
      zsub("newtonian-mechanics.circular-motion", "2.5", "Circular Motion", F5, ["aphys.circular.angular-speed", "aphys.circular.centripetal-force"]),
      zsub("newtonian-mechanics.gravitational-field", "2.6", "Gravitational Field", F5, ["aphys.gravitation.field-strength", "aphys.gravitation.newtons-law-orbits", "aphys.gravitation.potential"]),
    ],
  }),
  topic("oscillations-waves", "3", "Oscillations and Waves", {
    description: "Form 5.",
    components: ZTHEORY,
    children: [
      zsub("oscillations-waves.oscillations", "3.1", "Oscillations", F5, ["aphys.oscillations.shm", "aphys.oscillations.shm-energy", "aphys.oscillations.damping-resonance"]),
      zsub("oscillations-waves.waves", "3.2", "Waves", F5, ["aphys.waves.progressive-waves", "aphys.waves.transverse-longitudinal", "aphys.waves.em-spectrum"]),
      zsub("oscillations-waves.superposition", "3.3", "Superposition", F5, ["aphys.superposition.stationary-waves", "aphys.superposition.diffraction", "aphys.superposition.two-source-interference", "aphys.superposition.diffraction-grating"]),
    ],
  }),
  topic("electricity-magnetism", "4", "Electricity and Magnetism", {
    description: "Electricity, D.C. circuits, electric fields and capacitance in Form 5; electromagnetism, electromagnetic induction and alternating currents in Form 6.",
    components: ZTHEORY,
    children: [
      zsub("electricity-magnetism.electricity", "4.1", "Electricity", F5, ["aphys.electricity.current-charge", "aphys.electricity.pd-power", "aphys.electricity.resistance-iv", "aphys.electricity.resistivity"]),
      zsub("electricity-magnetism.dc-circuits", "4.2", "D.C. Circuits", F5, ["aphys.circuits.emf-internal-resistance", "aphys.circuits.series-parallel", "aphys.circuits.kirchhoff-problems", "aphys.circuits.potential-dividers", "aphys.circuits.potentiometer"]),
      zsub("electricity-magnetism.electric-fields", "4.3", "Electric Fields", F5, ["aphys.efields.uniform-fields", "aphys.efields.coulomb-point-charge", "aphys.efields.electric-potential"]),
      zsub("electricity-magnetism.capacitance", "4.4", "Capacitance", F5, ["aphys.capacitance.capacitors", "aphys.capacitance.energy-stored", "aphys.capacitance.discharge"]),
      zsub("electricity-magnetism.electromagnetism", "4.5", "Electromagnetism", F6, ["aphys.magnetism.field-patterns", "aphys.magnetism.force-on-conductor"]),
      zsub("electricity-magnetism.electromagnetic-induction", "4.6", "Electromagnetic Induction", F6, ["aphys.induction.flux-faraday", "aphys.induction.lenz-applications"]),
      zsub("electricity-magnetism.alternating-currents", "4.7", "Alternating Currents", F6, ["aphys.ac.characteristics-rms", "aphys.ac.rectification-smoothing", "aphys.ac.transformers-transmission"]),
    ],
  }),
  topic("electronics", "5", "Electronics", {
    description: "Form 6. Not part of Cambridge 9702 (2025-2027); scope taken from standard A-Level electronics and to be confirmed against the syllabus.",
    components: ZTHEORY,
    children: [
      zsub("electronics.analogue", "5.1", "Analogue Electronics", F6, ["aphys.electronics.op-amp-properties", "aphys.electronics.op-amp-amplifiers", "aphys.electronics.sensors-output-devices"]),
      zsub("electronics.digital", "5.2", "Digital Electronics", F6, ["aphys.electronics.logic-gates", "aphys.electronics.logic-systems"]),
    ],
  }),
  topic("matter", "6", "Matter", {
    description: "Form 6.",
    components: ZTHEORY,
    children: [
      zsub("matter.phases", "6.1", "Phases of Matter", F6, ["aphys.matter.phases-kinetic-model"]),
      zsub("matter.deformation-of-solids", "6.2", "Deformation of Solids", F6, ["aphys.solids.hookes-law", "aphys.solids.stress-strain-young", "aphys.solids.elastic-plastic-energy"]),
      zsub("matter.temperature", "6.3", "Temperature", F6, ["aphys.thermal.temperature-scales"]),
      zsub("matter.thermal-properties", "6.4", "Thermal Properties of Materials", F6, ["aphys.thermal.specific-heat-latent-heat", "aphys.thermal.internal-energy-first-law"]),
      zsub("matter.ideal-gases", "6.5", "Ideal Gases", F6, ["aphys.gases.equation-of-state", "aphys.gases.kinetic-theory"]),
      zsub("matter.fluid-flow", "6.6", "Non-viscous Fluid Flow", F6, ["aphys.matter.fluid-flow"]),
      zsub("matter.thermal-energy-transfer", "6.7", "Transfer of Thermal Energy", F6, ["aphys.matter.thermal-conduction", "aphys.matter.convection-radiation"]),
    ],
  }),
  topic("modern-physics", "7", "Modern Physics", {
    description: "Form 6.",
    components: ZTHEORY,
    children: [
      zsub("modern-physics.charged-particles", "7.1", "Charged Particles", F6, ["aphys.particles.electron-charge-mass", "aphys.magnetism.force-on-charge"]),
      zsub("modern-physics.quantum-physics", "7.2", "Quantum Physics", F6, ["aphys.quantum.photons", "aphys.quantum.photoelectric", "aphys.quantum.wave-particle-duality", "aphys.quantum.energy-levels-spectra"]),
      zsub("modern-physics.atomic-structure", "7.3", "Atomic Structure", F6, ["aphys.nuclear.atom-nucleus", "aphys.nuclear.mass-defect-binding", "aphys.nuclear.fission-fusion"]),
      zsub("modern-physics.radioactivity", "7.4", "Radioactivity", F6, ["aphys.nuclear.radiations-decay-equations", "aphys.nuclear.decay-law"]),
      zsub("modern-physics.communication", "7.5", "Communication", F6, ["aphys.communication.modulation", "aphys.communication.digital-signals", "aphys.communication.channels-attenuation"]),
    ],
  }),
  topic("practical-skills", "P", "Practical skills", {
    description: "Not a topic of the teacher's guide: our node for the practical examination (Paper 4) and the experimental skills practised through Forms 5 and 6.",
    components: ["4"],
    children: [
      zsub("practical-skills.experiments", "P.1", "Experimental work: recording, graphs and evaluation", F5, ["aphys.skills.tables-graphs", "aphys.skills.evaluation-improvements"], {
        note: "Practised throughout Forms 5 and 6.",
        objectives: [
          "Collect, tabulate and graph experimental data with correct headings, units, precision and significant figures.",
          "Determine gradients and intercepts and use them to find constants.",
          "Estimate uncertainties, identify limitations of a method and suggest improvements.",
        ],
      }),
      zsub("practical-skills.planning-analysis", "P.2", "Planning, analysis and evaluation", F6, ["aphys.skills.planning", "aphys.skills.data-analysis"], {
        note: "Practised throughout Forms 5 and 6.",
        objectives: [
          "Plan an investigation: variables, method, measurements, analysis and safety.",
          "Linearise relationships (including with logarithms), draw error bars and worst acceptable lines, and find constants with their uncertainties.",
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "physics",
  versionLabel: "2015-2022",
  family: "physics-a",
  title: "ZIMSEC A-Level Physics",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Physics Form 3 - 6 Teacher's Guide, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services); the Physics Syllabus Forms 5 - 6 (2015 - 2022) it refers to could not be obtained",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic areas and sub-topics, and the form in which each is taught, are transcribed from the 'TOPIC / FORM 5 / FORM 6' scope-and-sequence table of the Ministry's Physics Form 3 - 6 Teacher's Guide (2015 - 2022), NOT from the Forms 5 - 6 syllabus, which could not be obtained. The guide prints no numbers and no learning objectives for Forms 5 - 6: all codes (1-7, 1.1-7.5, objective codes) and the Practical skills node P are ours, and every objective is a generic statement of the concept taught there, to be replaced by paraphrased syllabus objectives once the syllabus is read. No document text is reproduced.",
  notes: [
    "Source (read 2026-10-09): Ministry document 'Physics Form 3 - 6 Teacher's Guide' (Curriculum Development and Technical Services, 2015), copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's https address because the file has no stable direct link). The same Ministry documents are listed on the Mashonaland West provincial education office site. Its annex 'scope and sequence' gives Forms 3-4 topics in detail and, for Forms 5-6, only a table of seven topic areas (General Physics; Newtonian Mechanics; Oscillations and Waves; Electricity and Magnetism; Electronics; Matter; Modern Physics) with their sub-topics in a Form 5 or Form 6 column. The table was read through pdftotext with and without -layout; the Form 5 column holds General Physics, Newtonian Mechanics, Oscillations and Waves and the first four Electricity and Magnetism sub-topics, and the Form 6 column holds Electromagnetism, Electromagnetic Induction, Alternating Currents, Electronics, Matter and Modern Physics.",
    "The Physics Syllabus Forms 5 - 6 (2015 - 2022) itself could not be obtained (copies found only behind bot-protected sites). This tree MUST be checked against it: sub-topic names and order, the form of each sub-topic, the learning objectives (ours are generic), and the assessment. Subject code: commonly cited as 6032 (not printed in the guide; code left null; confirm).",
    "Concept mapping: because the guide gives no objectives, each sub-topic covers the concepts of the matching Cambridge 9702 content (shared concepts) plus ZIMSEC-only concepts for sub-topics Cambridge 9702 (2025-2027) does not have: Analogue and Digital Electronics, Phases of Matter, Non-viscous Fluid Flow, Transfer of Thermal Energy, Charged Particles (e/m, Millikan, thermionic emission), Communication, and transformers under Alternating Currents. The scope of those concepts follows standard A-Level physics of the period (the older Cambridge 9702 'Gathering and communicating information' and matter topics that the ZIMSEC topic list resembles) and is marked 'to be confirmed' in each concept description. The first law of thermodynamics is mapped to 'Thermal Properties of Materials' and the force on moving charges to 'Charged Particles' (our placement).",
    "Not mapped to ZIMSEC (Cambridge-only concepts, because the topic list does not name them and they were added to Cambridge 9702 after the period the ZIMSEC list resembles): the Doppler effect, Malus's law, quarks and leptons, the Hall effect, medical physics (ultrasound, X-rays and CT, PET) and astronomy and cosmology. Qualitative polarisation is inside aphys.waves.transverse-longitudinal. Add them if the syllabus includes them.",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi, and 2024-2030 versions exist for Forms 5-6 in some subjects. Confirm which Physics syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Assessment NOT read for Physics. The components below follow the scheme printed in the Forms 5 - 6 Biology and Chemistry syllabi of the same 2015 - 2022 series (read for the biology-a and chemistry-a families): continuous assessment 30% (practical tests, theory tests and a project over Terms 1-5) and examinations 70%: Paper 1 multiple choice (40 compulsory four-option items, 1 hour, 40 marks, 11%), Paper 2 structured theory questions (1 hour 30 minutes, 60 marks, 17%; Chemistry: six compulsory questions of 10 marks), Paper 3 free-response questions (28%; Biology 2 hours, 100 marks; Chemistry 2 hours 30 minutes, 90 marks scaled to 50, so duration and marks are left blank here) and Paper 4 practical examination (2 hours 30 minutes, 50 marks, 14%). Confirm every value against the Physics syllabus; continuous assessment is not a component here and is not simulated.",
    "The practical examination (Paper 4) cannot be simulated; written exam-format items practise its skills (recording, graphs, gradients, uncertainties, evaluation, planning). The 'Practical skills' node P and its placement (P.1 Form 5, P.2 Form 6) are ours.",
  ],
  overview: "The ZIMSEC A-Level Physics course (Forms 5-6) is organised in seven areas. Form 5 covers general physics (physical quantities, units, errors and uncertainties), Newtonian mechanics (kinematics, dynamics, forces, work, energy and power, circular motion and gravitational fields), oscillations and waves (including superposition) and the first half of electricity and magnetism (current electricity, d.c. circuits, electric fields and capacitance). Form 6 covers electromagnetism, electromagnetic induction and alternating currents, analogue and digital electronics, matter (phases of matter, deformation of solids, temperature, thermal properties, ideal gases, non-viscous fluid flow and transfer of thermal energy) and modern physics (charged particles, quantum physics, atomic structure, radioactivity and communication). This outline comes from the Ministry teacher's guide and must be checked against the syllabus.",
  assessmentOverview: "Not confirmed for Physics. If Physics follows the other Forms 5-6 science syllabi of the same series: continuous assessment 30%, and examinations 70% made up of Paper 1 multiple choice (40 items, 1 hour, 11%), Paper 2 structured questions (1 hour 30 minutes, 60 marks, 17%), Paper 3 free-response questions (28%) and Paper 4 a practical examination (2 hours 30 minutes, 50 marks, 14%).",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "Assumed from the Forms 5-6 science syllabi of the same series (confirm): 40 compulsory four-option multiple-choice items on the whole syllabus.", durationMinutes: 60, maxMarks: 40, weightingPercent: 11, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Structured questions", kind: "WRITTEN", description: "Assumed from the Forms 5-6 science syllabi of the same series (confirm): compulsory structured questions on the whole syllabus.", durationMinutes: 90, maxMarks: 60, weightingPercent: 17, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Free-response questions", kind: "WRITTEN", description: "Assumed from the Forms 5-6 science syllabi of the same series (confirm): longer free-response questions with a choice; duration and marks differ between those syllabi and are not recorded.", weightingPercent: 28, calculatorAllowed: true },
    { code: "4", name: "Paper 4: Practical examination", kind: "PRACTICAL", description: "Assumed from the Forms 5-6 science syllabi of the same series (confirm): a practical examination set and marked by ZIMSEC (experiments, measurements, graphs, analysis and evaluation).", durationMinutes: 150, maxMarks: 50, weightingPercent: 14, calculatorAllowed: true },
  ],
  topics: ZIMSEC_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Physics 9702, 2025-2027. Topics 1-25 and sub-topics (1.1 ...) are numbered as
// printed; objective codes are the printed learning-outcome numbers prefixed with the sub-topic (1.2.3 = sub-topic 1.2,
// learning outcome 3). The three sections and the practical-skills nodes (P3, P5) are ours.
const AS = ["1", "2"];
const AL = ["4"];
const ASL = "AS Level";
const ALO = "A Level only";
const o = (code, text) => [code, text];
const asSub = (key, code, name, covers, objectives) => sub(key, code, name, { stage: ASL, covers, objectives });
const alSub = (key, code, name, covers, objectives) => sub(key, code, name, { stage: ALO, covers, objectives });

const C9702_TOPICS = [
  section("as-content", "AS", "AS Level subject content", {
    description: "Topics 1-11: studied by all candidates; examined in Papers 1 and 2 and assumed knowledge for Paper 4.",
    children: [
      topic("quantities-units", "1", "Physical quantities and units", {
        components: AS,
        children: [
          asSub("quantities-units.physical-quantities", "1.1", "Physical quantities", [], [
            o("1.1.1", "Recognise that a physical quantity is a numerical magnitude with a unit."),
            o("1.1.2", "Make sensible estimates of physical quantities met in the syllabus."),
          ]),
          asSub("quantities-units.si-units", "1.2", "SI units", ["aphys.measurement.si-units"], [
            o("1.2.1", "Recall the SI base quantities and units: kg, m, s, A and K."),
            o("1.2.2", "Write derived units as products or quotients of base units and use them."),
            o("1.2.3", "Use base units to check whether a physical equation is homogeneous."),
            o("1.2.4", "Recall and use the prefixes from pico to tera."),
          ]),
          asSub("quantities-units.errors-uncertainties", "1.3", "Errors and uncertainties", ["aphys.measurement.errors-uncertainties"], [
            o("1.3.1", "Explain the effects of systematic errors (including zero errors) and random errors."),
            o("1.3.2", "Distinguish between precision and accuracy."),
            o("1.3.3", "Estimate the uncertainty in a derived quantity by adding absolute or percentage uncertainties."),
          ]),
          asSub("quantities-units.scalars-vectors", "1.4", "Scalars and vectors", ["aphys.measurement.scalars-vectors"], [
            o("1.4.1", "Distinguish scalars from vectors, with examples from the syllabus."),
            o("1.4.2", "Add and subtract coplanar vectors."),
            o("1.4.3", "Resolve a vector into two perpendicular components."),
          ]),
        ],
      }),
      topic("kinematics", "2", "Kinematics", {
        components: AS,
        children: [
          asSub("kinematics.equations-of-motion", "2.1", "Equations of motion", ["aphys.kinematics.motion-graphs", "aphys.kinematics.suvat", "aphys.kinematics.projectiles"], [
            o("2.1.1", "Define and use distance, displacement, speed, velocity and acceleration."),
            o("2.1.2", "Represent motion with graphs of these quantities."),
            o("2.1.3", "Find displacement from the area under a velocity-time graph."),
            o("2.1.4", "Find velocity from the gradient of a displacement-time graph."),
            o("2.1.5", "Find acceleration from the gradient of a velocity-time graph."),
            o("2.1.6", "Derive the equations of uniformly accelerated straight-line motion from the definitions."),
            o("2.1.7", "Solve problems with these equations, including free fall without air resistance."),
            o("2.1.8", "Describe an experiment to measure the acceleration of free fall with a falling object."),
            o("2.1.9", "Describe and explain motion with constant velocity in one direction and constant acceleration at right angles to it."),
          ]),
        ],
      }),
      topic("dynamics", "3", "Dynamics", {
        components: AS,
        children: [
          asSub("dynamics.newtons-laws", "3.1", "Momentum and Newton's laws of motion", ["aphys.dynamics.newtons-laws", "aphys.dynamics.momentum-force"], [
            o("3.1.1", "Understand mass as the property that resists a change in motion."),
            o("3.1.2", "Recall and use F = ma, with acceleration in the direction of the resultant force."),
            o("3.1.3", "Define and use linear momentum."),
            o("3.1.4", "Define and use force as the rate of change of momentum."),
            o("3.1.5", "State and apply Newton's three laws of motion."),
            o("3.1.6", "Describe weight as the effect of a gravitational field on a mass and recall W = mg."),
          ]),
          asSub("dynamics.non-uniform-motion", "3.2", "Non-uniform motion", ["aphys.dynamics.drag-terminal-velocity"], [
            o("3.2.1", "Describe frictional and drag forces qualitatively, with drag increasing with speed."),
            o("3.2.2", "Describe and explain motion in a uniform gravitational field with air resistance."),
            o("3.2.3", "Explain how an object moving against a resistive force can reach terminal velocity."),
          ]),
          asSub("dynamics.momentum-conservation", "3.3", "Linear momentum and its conservation", ["aphys.dynamics.conservation-momentum"], [
            o("3.3.1", "State the principle of conservation of momentum."),
            o("3.3.2", "Apply it to elastic and inelastic interactions in one and two dimensions."),
            o("3.3.3", "Recall that kinetic energy is conserved in an elastic collision and that relative speeds of approach and separation are equal."),
            o("3.3.4", "Recognise that momentum is always conserved but kinetic energy may change."),
          ]),
        ],
      }),
      topic("forces-density-pressure", "4", "Forces, density and pressure", {
        components: AS,
        children: [
          asSub("forces-density-pressure.turning-effects", "4.1", "Turning effects of forces", ["aphys.forces.moments-couples"], [
            o("4.1.1", "Treat the weight of an object as acting at its centre of gravity."),
            o("4.1.2", "Define and apply the moment of a force."),
            o("4.1.3", "Recognise a couple as a pair of forces that causes rotation only."),
            o("4.1.4", "Define and apply the torque of a couple."),
          ]),
          asSub("forces-density-pressure.equilibrium", "4.2", "Equilibrium of forces", ["aphys.forces.equilibrium"], [
            o("4.2.1", "State and apply the principle of moments."),
            o("4.2.2", "Recognise equilibrium as no resultant force and no resultant torque."),
            o("4.2.3", "Represent coplanar forces in equilibrium by a vector triangle."),
          ]),
          asSub("forces-density-pressure.density-pressure", "4.3", "Density and pressure", ["aphys.forces.density-pressure-upthrust"], [
            o("4.3.1", "Define and use density."),
            o("4.3.2", "Define and use pressure."),
            o("4.3.3", "Derive the hydrostatic pressure equation from the definitions of pressure and density."),
            o("4.3.4", "Use the hydrostatic pressure equation."),
            o("4.3.5", "Explain upthrust as a result of a difference in hydrostatic pressure."),
            o("4.3.6", "Calculate upthrust with Archimedes' principle."),
          ]),
        ],
      }),
      topic("work-energy-power", "5", "Work, energy and power", {
        components: AS,
        children: [
          asSub("work-energy-power.energy-conservation", "5.1", "Energy conservation", ["aphys.energy.work-conservation-efficiency", "aphys.energy.power"], [
            o("5.1.1", "Understand work and use work done = force × displacement in the direction of the force."),
            o("5.1.2", "Recall and apply the principle of conservation of energy."),
            o("5.1.3", "Recall efficiency as useful energy output divided by total energy input."),
            o("5.1.4", "Solve problems using efficiency."),
            o("5.1.5", "Define power as work done per unit time."),
            o("5.1.6", "Solve problems with P = W/t."),
            o("5.1.7", "Derive P = Fv and use it."),
          ]),
          asSub("work-energy-power.potential-kinetic", "5.2", "Gravitational potential energy and kinetic energy", ["aphys.energy.gpe-ke"], [
            o("5.2.1", "Derive the change in gravitational potential energy in a uniform field from W = Fs."),
            o("5.2.2", "Recall and use the formula for gravitational potential energy changes in a uniform field."),
            o("5.2.3", "Derive the kinetic energy formula from the equations of motion."),
            o("5.2.4", "Recall and use the kinetic energy formula."),
          ]),
        ],
      }),
      topic("deformation-of-solids", "6", "Deformation of solids", {
        components: AS,
        children: [
          asSub("deformation-of-solids.stress-strain", "6.1", "Stress and strain", ["aphys.solids.hookes-law", "aphys.solids.stress-strain-young"], [
            o("6.1.1", "Recognise that tensile or compressive forces cause deformation (one dimension)."),
            o("6.1.2", "Use the terms load, extension, compression and limit of proportionality."),
            o("6.1.3", "Recall and use Hooke's law."),
            o("6.1.4", "Recall and use the spring constant k = F/x."),
            o("6.1.5", "Define and use stress, strain and the Young modulus."),
            o("6.1.6", "Describe an experiment to find the Young modulus of a metal wire."),
          ]),
          asSub("deformation-of-solids.elastic-plastic", "6.2", "Elastic and plastic behaviour", ["aphys.solids.elastic-plastic-energy"], [
            o("6.2.1", "Use the terms elastic deformation, plastic deformation and elastic limit."),
            o("6.2.2", "Recognise the area under a force-extension graph as the work done."),
            o("6.2.3", "Find elastic potential energy from the area under the graph within the limit of proportionality."),
            o("6.2.4", "Recall and use E_P = ½Fx = ½kx² within the limit of proportionality."),
          ]),
        ],
      }),
      topic("waves", "7", "Waves", {
        components: AS,
        children: [
          asSub("waves.progressive", "7.1", "Progressive waves", ["aphys.waves.progressive-waves"], [
            o("7.1.1", "Describe wave motion using ropes, springs and ripple tanks."),
            o("7.1.2", "Use the terms displacement, amplitude, phase difference, period, frequency, wavelength and speed."),
            o("7.1.3", "Use the time-base and y-gain of an oscilloscope to find frequency and amplitude."),
            o("7.1.4", "Derive v = fλ from the definitions."),
            o("7.1.5", "Recall and use v = fλ."),
            o("7.1.6", "Recognise that a progressive wave transfers energy."),
            o("7.1.7", "Recall and use intensity = power/area and intensity ∝ amplitude²."),
          ]),
          asSub("waves.transverse-longitudinal", "7.2", "Transverse and longitudinal waves", ["aphys.waves.transverse-longitudinal"], [
            o("7.2.1", "Compare transverse and longitudinal waves."),
            o("7.2.2", "Analyse graphs representing transverse and longitudinal waves."),
          ]),
          asSub("waves.doppler", "7.3", "Doppler effect for sound waves", ["aphys.waves.doppler"], [
            o("7.3.1", "Explain why the observed frequency differs from the source frequency when a sound source moves relative to a stationary observer."),
            o("7.3.2", "Use the Doppler expression for a moving source and stationary observer."),
          ]),
          asSub("waves.em-spectrum", "7.4", "Electromagnetic spectrum", ["aphys.waves.em-spectrum"], [
            o("7.4.1", "State that all electromagnetic waves are transverse and travel at c in free space."),
            o("7.4.2", "Recall approximate wavelength ranges of the main regions from radio to gamma."),
            o("7.4.3", "Recall that free-space wavelengths of 400-700 nm are visible."),
          ]),
          asSub("waves.polarisation", "7.5", "Polarisation", ["aphys.waves.polarisation-malus"], [
            o("7.5.1", "Associate polarisation with transverse waves."),
            o("7.5.2", "Use Malus's law for plane-polarised waves passing through one or more polarising filters."),
          ]),
        ],
      }),
      topic("superposition", "8", "Superposition", {
        components: AS,
        children: [
          asSub("superposition.stationary-waves", "8.1", "Stationary waves", ["aphys.superposition.stationary-waves"], [
            o("8.1.1", "Explain and use the principle of superposition."),
            o("8.1.2", "Describe experiments showing stationary waves with microwaves, strings and air columns."),
            o("8.1.3", "Explain stationary-wave formation graphically and identify nodes and antinodes."),
            o("8.1.4", "Find wavelength from the positions of nodes or antinodes."),
          ]),
          asSub("superposition.diffraction", "8.2", "Diffraction", ["aphys.superposition.diffraction"], [
            o("8.2.1", "Explain the meaning of diffraction."),
            o("8.2.2", "Describe diffraction experiments, including the effect of gap width relative to wavelength."),
          ]),
          asSub("superposition.interference", "8.3", "Interference", ["aphys.superposition.two-source-interference"], [
            o("8.3.1", "Understand interference and coherence."),
            o("8.3.2", "Describe two-source interference experiments with water, sound, light and microwaves."),
            o("8.3.3", "State the conditions for observable two-source interference fringes."),
            o("8.3.4", "Recall and use λ = ax/D for the double slit."),
          ]),
          asSub("superposition.grating", "8.4", "The diffraction grating", ["aphys.superposition.diffraction-grating"], [
            o("8.4.1", "Recall and use d sin θ = nλ."),
            o("8.4.2", "Describe how a diffraction grating is used to find the wavelength of light."),
          ]),
        ],
      }),
      topic("electricity", "9", "Electricity", {
        components: AS,
        children: [
          asSub("electricity.current", "9.1", "Electric current", ["aphys.electricity.current-charge"], [
            o("9.1.1", "Describe current as a flow of charge carriers."),
            o("9.1.2", "Recognise that charge is quantised."),
            o("9.1.3", "Recall and use Q = It."),
            o("9.1.4", "Use I = Anvq for a conductor."),
          ]),
          asSub("electricity.pd-power", "9.2", "Potential difference and power", ["aphys.electricity.pd-power"], [
            o("9.2.1", "Define potential difference as energy transferred per unit charge."),
            o("9.2.2", "Recall and use V = W/Q."),
            o("9.2.3", "Recall and use the three forms of the electrical power equation."),
          ]),
          asSub("electricity.resistance", "9.3", "Resistance and resistivity", ["aphys.electricity.resistance-iv", "aphys.electricity.resistivity"], [
            o("9.3.1", "Define resistance."),
            o("9.3.2", "Recall and use V = IR."),
            o("9.3.3", "Sketch I-V characteristics of a metallic conductor, a diode and a filament lamp."),
            o("9.3.4", "Explain why a filament lamp's resistance rises with current."),
            o("9.3.5", "State Ohm's law."),
            o("9.3.6", "Recall and use R = ρL/A."),
            o("9.3.7", "Recognise that an LDR's resistance falls as light intensity rises."),
            o("9.3.8", "Recognise that an NTC thermistor's resistance falls as temperature rises."),
          ]),
        ],
      }),
      topic("dc-circuits", "10", "D.C. circuits", {
        components: AS,
        children: [
          asSub("dc-circuits.practical-circuits", "10.1", "Practical circuits", ["aphys.circuits.emf-internal-resistance"], [
            o("10.1.1", "Recall and use the syllabus circuit symbols."),
            o("10.1.2", "Draw and interpret circuit diagrams."),
            o("10.1.3", "Define and use e.m.f. as energy transferred per unit charge round a complete circuit."),
            o("10.1.4", "Distinguish e.m.f. from p.d. in terms of energy."),
            o("10.1.5", "Explain the effect of internal resistance on terminal p.d."),
          ]),
          asSub("dc-circuits.kirchhoff", "10.2", "Kirchhoff's laws", ["aphys.circuits.series-parallel", "aphys.circuits.kirchhoff-problems"], [
            o("10.2.1", "Recall Kirchhoff's first law as a consequence of conservation of charge."),
            o("10.2.2", "Recall Kirchhoff's second law as a consequence of conservation of energy."),
            o("10.2.3", "Derive the formula for resistors in series."),
            o("10.2.4", "Use the formula for resistors in series."),
            o("10.2.5", "Derive the formula for resistors in parallel."),
            o("10.2.6", "Use the formula for resistors in parallel."),
            o("10.2.7", "Solve simple circuit problems with Kirchhoff's laws."),
          ]),
          asSub("dc-circuits.potential-dividers", "10.3", "Potential dividers", ["aphys.circuits.potential-dividers", "aphys.circuits.potentiometer"], [
            o("10.3.1", "Explain the principle of a potential divider."),
            o("10.3.2", "Use the potentiometer to compare potential differences."),
            o("10.3.3", "Explain the use of a galvanometer in null methods."),
            o("10.3.4", "Explain how thermistors and LDRs in potential dividers give temperature- or light-dependent outputs."),
          ]),
        ],
      }),
      topic("particle-physics", "11", "Particle physics", {
        components: AS,
        children: [
          asSub("particle-physics.atoms-nuclei-radiation", "11.1", "Atoms, nuclei and radiation", ["aphys.nuclear.atom-nucleus", "aphys.nuclear.radiations-decay-equations"], [
            o("11.1.1", "Infer the existence and small size of the nucleus from α-particle scattering."),
            o("11.1.2", "Describe a simple nuclear atom of protons, neutrons and orbital electrons."),
            o("11.1.3", "Distinguish nucleon number from proton number."),
            o("11.1.4", "Recognise isotopes as forms of an element with different neutron numbers."),
            o("11.1.5", "Use nuclide notation."),
            o("11.1.6", "Recognise that nucleon number and charge are conserved in nuclear processes."),
            o("11.1.7", "Describe the composition, mass and charge of α, β (β⁻ and β⁺) and γ radiation."),
            o("11.1.8", "Recognise an antiparticle as having the same mass and opposite charge; the positron is the electron's antiparticle."),
            o("11.1.9", "State that antineutrinos are produced in β⁻ decay and neutrinos in β⁺ decay."),
            o("11.1.10", "Explain why α energies are discrete but β energies are continuous."),
            o("11.1.11", "Represent α and β decay by decay equations."),
            o("11.1.12", "Use the unified atomic mass unit as a unit of mass."),
          ]),
          asSub("particle-physics.fundamental-particles", "11.2", "Fundamental particles", ["aphys.particles.quarks-leptons"], [
            o("11.2.1", "Recognise quarks as fundamental, with six flavours."),
            o("11.2.2", "Recall the charges of each quark flavour and that antiquarks have the opposite charge."),
            o("11.2.3", "Describe protons and neutrons by their quark composition."),
            o("11.2.4", "Classify hadrons as baryons (three quarks) or mesons (quark and antiquark)."),
            o("11.2.5", "Describe the quark changes in β⁻ and β⁺ decay."),
            o("11.2.6", "Recall that electrons and neutrinos are leptons."),
          ]),
        ],
      }),
    ],
  }),
  section("a-level-content", "A", "A Level subject content", {
    description: "Topics 12-25: A Level only; examined in Paper 4 (AS content assumed).",
    children: [
      topic("motion-in-a-circle", "12", "Motion in a circle", {
        components: AL,
        children: [
          alSub("motion-in-a-circle.kinematics", "12.1", "Kinematics of uniform circular motion", ["aphys.circular.angular-speed"], [
            o("12.1.1", "Define the radian and express angular displacement in radians."),
            o("12.1.2", "Understand and use angular speed."),
            o("12.1.3", "Recall and use ω = 2π/T and v = rω."),
          ]),
          alSub("motion-in-a-circle.centripetal", "12.2", "Centripetal acceleration", ["aphys.circular.centripetal-force"], [
            o("12.2.1", "Explain that a constant force perpendicular to the motion causes centripetal acceleration."),
            o("12.2.2", "Recognise that centripetal acceleration gives circular motion at constant angular speed."),
            o("12.2.3", "Recall and use the two expressions for centripetal acceleration."),
            o("12.2.4", "Recall and use the two expressions for centripetal force."),
          ]),
        ],
      }),
      topic("gravitational-fields", "13", "Gravitational fields", {
        components: AL,
        children: [
          alSub("gravitational-fields.field", "13.1", "Gravitational field", [], [
            o("13.1.1", "Describe a gravitational field as a field of force and define field strength as force per unit mass."),
            o("13.1.2", "Represent a gravitational field with field lines."),
          ]),
          alSub("gravitational-fields.force", "13.2", "Gravitational force between point masses", ["aphys.gravitation.newtons-law-orbits"], [
            o("13.2.1", "Treat a uniform sphere as a point mass at its centre for external points."),
            o("13.2.2", "Recall and use Newton's law of gravitation."),
            o("13.2.3", "Analyse circular orbits by linking gravitational force to centripetal acceleration."),
            o("13.2.4", "Describe the geostationary orbit (24 h period, west to east, above the Equator)."),
          ]),
          alSub("gravitational-fields.point-mass-field", "13.3", "Gravitational field of a point mass", ["aphys.gravitation.field-strength"], [
            o("13.3.1", "Derive g = GM/r² from Newton's law and the definition of field strength."),
            o("13.3.2", "Recall and use g = GM/r²."),
            o("13.3.3", "Explain why g is nearly constant for small height changes near the Earth."),
          ]),
          alSub("gravitational-fields.potential", "13.4", "Gravitational potential", ["aphys.gravitation.potential"], [
            o("13.4.1", "Define gravitational potential as work done per unit mass bringing a small mass from infinity."),
            o("13.4.2", "Use φ = −GM/r."),
            o("13.4.3", "Relate gravitational potential to the potential energy of two point masses and use E_P = −GMm/r."),
          ]),
        ],
      }),
      topic("temperature", "14", "Temperature", {
        components: AL,
        children: [
          alSub("temperature.equilibrium", "14.1", "Thermal equilibrium", [], [
            o("14.1.1", "Recognise that thermal energy flows from higher to lower temperature."),
            o("14.1.2", "Recognise regions at equal temperature as being in thermal equilibrium."),
          ]),
          alSub("temperature.scales", "14.2", "Temperature scales", ["aphys.thermal.temperature-scales"], [
            o("14.2.1", "Explain how temperature-dependent properties are used to measure temperature, with examples."),
            o("14.2.2", "Recognise that the thermodynamic scale does not depend on any substance's property."),
            o("14.2.3", "Convert between kelvin and degrees Celsius."),
            o("14.2.4", "Recognise absolute zero as the lowest possible temperature (0 K)."),
          ]),
          alSub("temperature.heat-capacity", "14.3", "Specific heat capacity and specific latent heat", ["aphys.thermal.specific-heat-latent-heat"], [
            o("14.3.1", "Define and use specific heat capacity."),
            o("14.3.2", "Define and use specific latent heat, distinguishing fusion and vaporisation."),
          ]),
        ],
      }),
      topic("ideal-gases", "15", "Ideal gases", {
        components: AL,
        children: [
          alSub("ideal-gases.mole", "15.1", "The mole", [], [
            o("15.1.1", "Recognise amount of substance as an SI base quantity in moles."),
            o("15.1.2", "Use molar quantities with the Avogadro constant."),
          ]),
          alSub("ideal-gases.equation-of-state", "15.2", "Equation of state", ["aphys.gases.equation-of-state"], [
            o("15.2.1", "Recognise an ideal gas as one obeying pV ∝ T."),
            o("15.2.2", "Recall and use pV = nRT and pV = NkT."),
            o("15.2.3", "Recall that k = R/N_A."),
          ]),
          alSub("ideal-gases.kinetic-theory", "15.3", "Kinetic theory of gases", ["aphys.gases.kinetic-theory"], [
            o("15.3.1", "State the basic assumptions of kinetic theory."),
            o("15.3.2", "Explain gas pressure by molecular movement and derive and use pV = ⅓Nm⟨c²⟩."),
            o("15.3.3", "Understand the root-mean-square speed."),
            o("15.3.4", "Deduce and use the mean translational kinetic energy (3/2)kT."),
          ]),
        ],
      }),
      topic("thermodynamics", "16", "Thermodynamics", {
        components: AL,
        children: [
          alSub("thermodynamics.internal-energy", "16.1", "Internal energy", [], [
            o("16.1.1", "Describe internal energy as the sum of random molecular kinetic and potential energies, fixed by the state."),
            o("16.1.2", "Relate a temperature rise to an increase in internal energy."),
          ]),
          alSub("thermodynamics.first-law", "16.2", "The first law of thermodynamics", ["aphys.thermal.internal-energy-first-law"], [
            o("16.2.1", "Recall and use W = pΔV, distinguishing work done by and on a gas."),
            o("16.2.2", "Recall and use the first law ΔU = q + W."),
          ]),
        ],
      }),
      topic("oscillations", "17", "Oscillations", {
        components: AL,
        children: [
          alSub("oscillations.shm", "17.1", "Simple harmonic oscillations", ["aphys.oscillations.shm"], [
            o("17.1.1", "Use displacement, amplitude, period, frequency, angular frequency and phase difference for oscillations."),
            o("17.1.2", "Recognise s.h.m. as acceleration proportional to and opposite to displacement."),
            o("17.1.3", "Use a = −ω²x and its solution x = x₀ sin ωt."),
            o("17.1.4", "Use the two velocity equations for s.h.m."),
            o("17.1.5", "Analyse graphs of displacement, velocity and acceleration in s.h.m."),
          ]),
          alSub("oscillations.energy", "17.2", "Energy in simple harmonic motion", ["aphys.oscillations.shm-energy"], [
            o("17.2.1", "Describe the interchange of kinetic and potential energy in s.h.m."),
            o("17.2.2", "Recall and use the total energy of a system in s.h.m."),
          ]),
          alSub("oscillations.damping-resonance", "17.3", "Damped and forced oscillations, resonance", ["aphys.oscillations.damping-resonance"], [
            o("17.3.1", "Explain damping by a resistive force."),
            o("17.3.2", "Use light, critical and heavy damping and sketch their displacement-time graphs."),
            o("17.3.3", "Explain resonance as maximum amplitude when forced at the natural frequency."),
          ]),
        ],
      }),
      topic("electric-fields", "18", "Electric fields", {
        components: AL,
        children: [
          alSub("electric-fields.field-lines", "18.1", "Electric fields and field lines", [], [
            o("18.1.1", "Describe an electric field as a field of force and define field strength as force per unit positive charge."),
            o("18.1.2", "Recall and use F = qE."),
            o("18.1.3", "Represent an electric field with field lines."),
          ]),
          alSub("electric-fields.uniform", "18.2", "Uniform electric fields", ["aphys.efields.uniform-fields"], [
            o("18.2.1", "Recall and use E = V/d between parallel plates."),
            o("18.2.2", "Describe the effect of a uniform field on moving charged particles."),
          ]),
          alSub("electric-fields.coulomb", "18.3", "Electric force between point charges", ["aphys.efields.coulomb-point-charge"], [
            o("18.3.1", "Treat a charged conducting sphere as a point charge at its centre for external points."),
            o("18.3.2", "Recall and use Coulomb's law in free space."),
          ]),
          alSub("electric-fields.point-charge-field", "18.4", "Electric field of a point charge", [], [
            o("18.4.1", "Recall and use the field strength of a point charge in free space."),
          ]),
          alSub("electric-fields.potential", "18.5", "Electric potential", ["aphys.efields.electric-potential"], [
            o("18.5.1", "Define electric potential as work done per unit positive charge bringing a small charge from infinity."),
            o("18.5.2", "Use field strength as the negative of the potential gradient."),
            o("18.5.3", "Use the potential of a point charge."),
            o("18.5.4", "Relate potential to the electric potential energy of two point charges and use it."),
          ]),
        ],
      }),
      topic("capacitance", "19", "Capacitance", {
        components: AL,
        children: [
          alSub("capacitance.capacitors", "19.1", "Capacitors and capacitance", ["aphys.capacitance.capacitors"], [
            o("19.1.1", "Define capacitance for isolated spherical conductors and parallel-plate capacitors."),
            o("19.1.2", "Recall and use C = Q/V."),
            o("19.1.3", "Derive the formulae for capacitors in series and in parallel."),
            o("19.1.4", "Use the formulae for capacitors in series and in parallel."),
          ]),
          alSub("capacitance.energy", "19.2", "Energy stored in a capacitor", ["aphys.capacitance.energy-stored"], [
            o("19.2.1", "Find stored energy from the area under a p.d.-charge graph."),
            o("19.2.2", "Recall and use W = ½QV = ½CV²."),
          ]),
          alSub("capacitance.discharge", "19.3", "Discharging a capacitor", ["aphys.capacitance.discharge"], [
            o("19.3.1", "Analyse graphs of p.d., charge and current against time for a discharging capacitor."),
            o("19.3.2", "Recall and use the time constant τ = RC."),
            o("19.3.3", "Use exponential decay equations for current, charge or p.d. during discharge."),
          ]),
        ],
      }),
      topic("magnetic-fields", "20", "Magnetic fields", {
        components: AL,
        children: [
          alSub("magnetic-fields.concept", "20.1", "Concept of a magnetic field", [], [
            o("20.1.1", "Describe a magnetic field as a field of force from moving charges or permanent magnets."),
            o("20.1.2", "Represent a magnetic field with field lines."),
          ]),
          alSub("magnetic-fields.force-on-conductor", "20.2", "Force on a current-carrying conductor", ["aphys.magnetism.force-on-conductor"], [
            o("20.2.1", "Recognise that a force can act on a current-carrying conductor in a magnetic field."),
            o("20.2.2", "Recall and use F = BIL sin θ with Fleming's left-hand rule."),
            o("20.2.3", "Define magnetic flux density as force per unit current per unit length on a perpendicular wire."),
          ]),
          alSub("magnetic-fields.force-on-charge", "20.3", "Force on a moving charge", ["aphys.magnetism.force-on-charge", "aphys.magnetism.hall-effect"], [
            o("20.3.1", "Determine the direction of the force on a charge moving in a magnetic field."),
            o("20.3.2", "Recall and use F = BQv sin θ."),
            o("20.3.3", "Explain the origin of the Hall voltage and derive and use V_H = BI/(ntq)."),
            o("20.3.4", "Explain how a Hall probe measures magnetic flux density."),
            o("20.3.5", "Describe the motion of a charged particle moving perpendicular to a uniform magnetic field."),
            o("20.3.6", "Explain velocity selection with electric and magnetic fields."),
          ]),
          alSub("magnetic-fields.fields-due-to-currents", "20.4", "Magnetic fields due to currents", ["aphys.magnetism.field-patterns"], [
            o("20.4.1", "Sketch the field patterns of a long straight wire, a flat circular coil and a long solenoid."),
            o("20.4.2", "Recognise that a ferrous core increases the field of a solenoid."),
            o("20.4.3", "Explain the forces between current-carrying conductors and find their directions."),
          ]),
          alSub("magnetic-fields.induction", "20.5", "Electromagnetic induction", ["aphys.induction.flux-faraday", "aphys.induction.lenz-applications"], [
            o("20.5.1", "Define magnetic flux as flux density times the perpendicular area."),
            o("20.5.2", "Recall and use Φ = BA."),
            o("20.5.3", "Understand and use magnetic flux linkage."),
            o("20.5.4", "Explain experiments showing induced e.m.f. from changing flux, its direction opposing the change, and the factors affecting its size."),
            o("20.5.5", "Recall and use Faraday's and Lenz's laws."),
          ]),
        ],
      }),
      topic("alternating-currents", "21", "Alternating currents", {
        components: AL,
        children: [
          alSub("alternating-currents.characteristics", "21.1", "Characteristics of alternating currents", ["aphys.ac.characteristics-rms"], [
            o("21.1.1", "Use period, frequency and peak value for alternating currents and voltages."),
            o("21.1.2", "Use x = x₀ sin ωt for a sinusoidal current or voltage."),
            o("21.1.3", "Recall that mean power in a resistive load is half the peak power for sinusoidal a.c."),
            o("21.1.4", "Distinguish r.m.s. and peak values and use the √2 relationships."),
          ]),
          alSub("alternating-currents.rectification", "21.2", "Rectification and smoothing", ["aphys.ac.rectification-smoothing"], [
            o("21.2.1", "Distinguish half-wave and full-wave rectification graphically."),
            o("21.2.2", "Explain half-wave rectification with one diode."),
            o("21.2.3", "Explain full-wave rectification with a bridge of four diodes."),
            o("21.2.4", "Analyse smoothing by a capacitor, including the effect of capacitance and load resistance."),
          ]),
        ],
      }),
      topic("quantum-physics", "22", "Quantum physics", {
        components: AL,
        children: [
          alSub("quantum-physics.photon", "22.1", "Energy and momentum of a photon", ["aphys.quantum.photons"], [
            o("22.1.1", "Recognise the particulate nature of electromagnetic radiation."),
            o("22.1.2", "Describe a photon as a quantum of electromagnetic energy."),
            o("22.1.3", "Recall and use E = hf."),
            o("22.1.4", "Use the electronvolt as a unit of energy."),
            o("22.1.5", "Recognise that a photon has momentum p = E/c."),
          ]),
          alSub("quantum-physics.photoelectric", "22.2", "Photoelectric effect", ["aphys.quantum.photoelectric"], [
            o("22.2.1", "Describe photoelectric emission from a metal surface."),
            o("22.2.2", "Use threshold frequency and threshold wavelength."),
            o("22.2.3", "Explain photoelectric emission using photon energy and work function."),
            o("22.2.4", "Recall and use the photoelectric equation."),
            o("22.2.5", "Explain why maximum kinetic energy does not depend on intensity but photocurrent does."),
          ]),
          alSub("quantum-physics.duality", "22.3", "Wave-particle duality", ["aphys.quantum.wave-particle-duality"], [
            o("22.3.1", "Use the photoelectric effect as evidence for particles and interference and diffraction as evidence for waves."),
            o("22.3.2", "Interpret electron diffraction as evidence for the wave nature of particles."),
            o("22.3.3", "Understand the de Broglie wavelength of a moving particle."),
            o("22.3.4", "Recall and use λ = h/p."),
          ]),
          alSub("quantum-physics.energy-levels", "22.4", "Energy levels in atoms and line spectra", ["aphys.quantum.energy-levels-spectra"], [
            o("22.4.1", "Recognise discrete electron energy levels in isolated atoms."),
            o("22.4.2", "Explain the appearance and formation of emission and absorption line spectra."),
            o("22.4.3", "Recall and use hf = E₁ − E₂."),
          ]),
        ],
      }),
      topic("nuclear-physics", "23", "Nuclear physics", {
        components: AL,
        children: [
          alSub("nuclear-physics.binding-energy", "23.1", "Mass defect and nuclear binding energy", ["aphys.nuclear.mass-defect-binding", "aphys.nuclear.fission-fusion"], [
            o("23.1.1", "Recall and use E = mc² and the equivalence of mass and energy."),
            o("23.1.2", "Represent simple nuclear reactions by nuclear equations."),
            o("23.1.3", "Define and use mass defect and binding energy."),
            o("23.1.4", "Sketch binding energy per nucleon against nucleon number."),
            o("23.1.5", "Explain nuclear fusion and nuclear fission."),
            o("23.1.6", "Relate binding energy per nucleon to energy release in fusion and fission."),
            o("23.1.7", "Calculate the energy released in nuclear reactions from mass changes."),
          ]),
          alSub("nuclear-physics.radioactive-decay", "23.2", "Radioactive decay", ["aphys.nuclear.decay-law"], [
            o("23.2.1", "Use count-rate fluctuations as evidence that decay is random."),
            o("23.2.2", "Recognise decay as spontaneous and random."),
            o("23.2.3", "Define activity and decay constant and use A = λN."),
            o("23.2.4", "Define half-life."),
            o("23.2.5", "Use λ = 0.693/t½."),
            o("23.2.6", "Sketch and use exponential decay for activity, undecayed nuclei or count rate."),
          ]),
        ],
      }),
      topic("medical-physics", "24", "Medical physics", {
        components: AL,
        children: [
          alSub("medical-physics.ultrasound", "24.1", "Production and use of ultrasound", ["aphys.medical.ultrasound"], [
            o("24.1.1", "Describe the piezoelectric effect in both directions."),
            o("24.1.2", "Explain how a piezoelectric transducer generates and detects ultrasound."),
            o("24.1.3", "Explain how reflected ultrasound pulses at tissue boundaries give diagnostic information."),
            o("24.1.4", "Define specific acoustic impedance Z = ρc."),
            o("24.1.5", "Use the intensity reflection coefficient at a boundary."),
            o("24.1.6", "Recall and use exponential attenuation of ultrasound."),
          ]),
          alSub("medical-physics.x-rays", "24.2", "Production and use of X-rays", ["aphys.medical.x-rays-ct"], [
            o("24.2.1", "Explain X-ray production by electron bombardment and find the minimum wavelength from the accelerating p.d."),
            o("24.2.2", "Explain X-ray imaging of internal structures, including contrast."),
            o("24.2.3", "Recall and use exponential attenuation of X-rays."),
            o("24.2.4", "Explain how CT scanning builds a 3D image from many sections imaged at different angles."),
          ]),
          alSub("medical-physics.pet", "24.3", "PET scanning", ["aphys.medical.pet"], [
            o("24.3.1", "Describe a radioactive tracer absorbed by the tissue studied."),
            o("24.3.2", "Recall that PET uses a β⁺-decaying tracer."),
            o("24.3.3", "Describe annihilation, with conservation of mass-energy and momentum."),
            o("24.3.4", "Explain that annihilation in PET gives two gamma photons travelling in opposite directions."),
            o("24.3.5", "Calculate the energy of the photons from electron-positron annihilation."),
            o("24.3.6", "Explain how detected photon arrival times give an image of tracer concentration."),
          ]),
        ],
      }),
      topic("astronomy-cosmology", "25", "Astronomy and cosmology", {
        components: AL,
        children: [
          alSub("astronomy-cosmology.standard-candles", "25.1", "Standard candles", ["aphys.astro.luminosity-standard-candles"], [
            o("25.1.1", "Define luminosity as the total power radiated by a star."),
            o("25.1.2", "Recall and use the inverse square law for radiant flux intensity."),
            o("25.1.3", "Recognise a standard candle as an object of known luminosity."),
            o("25.1.4", "Explain how standard candles give distances to galaxies."),
          ]),
          alSub("astronomy-cosmology.stellar-radii", "25.2", "Stellar radii", ["aphys.astro.stellar-radii"], [
            o("25.2.1", "Use Wien's displacement law to estimate a star's peak surface temperature."),
            o("25.2.2", "Use the Stefan-Boltzmann law."),
            o("25.2.3", "Combine Wien's law and the Stefan-Boltzmann law to estimate a star's radius."),
          ]),
          alSub("astronomy-cosmology.hubble", "25.3", "Hubble's law and the Big Bang theory", ["aphys.astro.redshift-hubble"], [
            o("25.3.1", "Recognise the increase in wavelength of spectral lines from distant objects."),
            o("25.3.2", "Use Δλ/λ ≈ Δf/f ≈ v/c for redshift."),
            o("25.3.3", "Explain why redshift suggests an expanding Universe."),
            o("25.3.4", "Recall and use Hubble's law and explain how it leads to the Big Bang theory."),
          ]),
        ],
      }),
    ],
  }),
  section("practical-skills", "PS", "Practical skills", {
    description: "Not a content section of the syllabus: our grouping of the Practical assessment section (Papers 3 and 5) and the Mathematical requirements.",
    children: [
      topic("practical-skills.paper-3", "P3", "Advanced practical skills (Paper 3)", {
        components: ["3"],
        description: "AS Level: manipulation, measurement and observation; presentation of data; analysis, conclusions and evaluation.",
        children: [
          asSub("practical-skills.paper-3.measurement", "P3.1", "Collecting and presenting data", ["aphys.measurement.instruments", "aphys.skills.tables-graphs"], [
            o("P3.1.1", "Set up apparatus, follow instructions and collect enough data over the widest range, repeating where appropriate."),
            o("P3.1.2", "Measure with common laboratory instruments, including timing many oscillations."),
            o("P3.1.3", "Record raw data to consistent precision in a single table with quantity/unit headings, and calculated values to justified significant figures."),
            o("P3.1.4", "Plot graphs with suitable scales, draw best-fit lines or curves and tangents, and read gradients and intercepts (including false origins)."),
          ]),
          asSub("practical-skills.paper-3.evaluation", "P3.2", "Uncertainties, conclusions and evaluation", ["aphys.skills.evaluation-improvements"], [
            o("P3.2.1", "Estimate absolute and percentage uncertainties, including half the range of repeated readings."),
            o("P3.2.2", "Draw conclusions, find constants and test a relationship by comparing percentage difference with a stated uncertainty."),
            o("P3.2.3", "Identify the main limitations and sources of uncertainty of a procedure."),
            o("P3.2.4", "Suggest realistic improvements to the method or apparatus."),
          ]),
        ],
      }),
      topic("practical-skills.paper-5", "P5", "Planning, analysis and evaluation (Paper 5)", {
        components: ["5"],
        description: "A Level: planning an investigation; analysis, conclusions and treatment of uncertainties, with the A Level logarithms of the Mathematical requirements.",
        children: [
          alSub("practical-skills.paper-5.planning", "P5.1", "Planning", ["aphys.skills.planning"], [
            o("P5.1.1", "Identify the independent, dependent and controlled variables."),
            o("P5.1.2", "Describe a workable method with a labelled arrangement, how variables are varied, measured and controlled, and suitable instruments."),
            o("P5.1.3", "Describe how the data will be analysed, including what to plot and how to derive the required quantity."),
            o("P5.1.4", "Assess risks and describe precautions, and add relevant detail such as preliminary work, calibration and the use of oscilloscopes, light gates and data loggers."),
          ]),
          alSub("practical-skills.paper-5.analysis", "P5.2", "Analysis, conclusions and uncertainties", ["aphys.skills.data-analysis"], [
            o("P5.2.1", "Rearrange relationships into linear form, including with lg and ln, and choose derived quantities to plot."),
            o("P5.2.2", "Complete tables with uncertainties and correct significant figures (including logarithms)."),
            o("P5.2.3", "Plot error bars and draw best-fit and worst acceptable lines."),
            o("P5.2.4", "Find gradients and intercepts with their uncertainties and state a constant as value, uncertainty and unit."),
          ]),
        ],
      }),
    ],
  }),
];

const c9702 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "physics",
  versionLabel: "2025-2027",
  family: "physics-a",
  title: "Cambridge International AS & A Level Physics (9702)",
  code: "9702",
  effectiveFrom: "2025-01-01",
  effectiveTo: "2027-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Physics 9702 syllabus for 2025, 2026 and 2027 (version 1, published September 2022)",
    url: "https://www.cambridgeinternational.org/Images/664565-2025-2027-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1 Physical quantities and units ... 25.3 Hubble's law and the Big Bang theory) are transcribed with their printed numbers; objective codes are the sub-topic number plus the printed learning-outcome number (e.g. 20.3.3). Objectives paraphrase the learning outcomes in our own words. The three sections and the practical-skills topics P3 and P5 (with codes P3.1 ... P5.2.4) are ours, summarising the Practical assessment section and the Mathematical requirements. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-09): the official PDF 'Cambridge International AS & A Level Physics 9702 syllabus for 2025, 2026 and 2027', version 1, published September 2022, read through a pdftotext rendering (some symbols such as ρ, λ, θ and ω were lost in the text and are restored from context). Exams in the June and November series (March for India). Check headings and objective codes against the PDF.",
    "Routes as printed: AS Level only (Papers 1, 2 and 3 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 4 and 5); A Level in one series (all five papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Paper 1 31% of AS and 15.5% of A Level; Paper 2 46% and 23%; Paper 3 23% and 11.5%; Paper 4 38.5% of A Level; Paper 5 11.5% of A Level. weightingPercent records the A Level share; the AS shares are in each paper's description. AO1 40%, AO2 40%, AO3 20% of each qualification.",
    "Topics 1-11 are AS content (Papers 1 and 2, assumed knowledge for Paper 4); topics 12-25 are A Level only (Paper 4). Data and formulae are printed on page 2 of Papers 1, 2 and 4 and page 3 of Paper 4 (A Level formulae); the data values (g = 9.81 m s⁻², e, h, c, m_e, m_p, u, N_A, R, k, G, ε₀, σ) are the ones the writers' kit uses.",
    "Paper 3 (40 marks): two questions of 1 hour and 20 marks, in different areas of physics: question 1 collects data, plots a graph and draws conclusions; question 2 collects data from a deliberately limited method and asks for evaluation and improvements. Paper 5 (30 marks): question 1 planning (15 marks), question 2 analysis, conclusions and evaluation of given data with an equation, finding a constant and its uncertainty (15 marks). The practical paper cannot be simulated; written items practise its skills.",
    "Paper 2 and Paper 4 question structures and part marks are not printed in the syllabus; our practice exam-format items use a convention that a reviewer must check against recent papers.",
    "This syllabus is for examination in 2025-2027. Candidates from 2028 will follow a later syllabus (not in the repository); check the Cambridge website for it and add a new version file.",
  ],
  overview: "Cambridge International AS & A Level Physics (9702) is a two-stage course. The AS Level content (topics 1-11) covers physical quantities, units and uncertainties, kinematics, dynamics and momentum, forces, density and pressure, work, energy and power, deformation of solids, waves (including the Doppler effect and polarisation), superposition, electricity, d.c. circuits and particle physics. The A Level content (topics 12-25) adds circular motion, gravitational fields, temperature, ideal gases, thermodynamics, oscillations, electric fields, capacitance, magnetic fields and electromagnetic induction, alternating currents, quantum physics, nuclear physics, medical physics and astronomy and cosmology, with practical skills at both stages.",
  assessmentOverview: "AS Level candidates take Paper 1 Multiple Choice (1 hour 15 minutes, 40 marks), Paper 2 AS Level Structured Questions (1 hour 15 minutes, 60 marks) and Paper 3 Advanced Practical Skills (2 hours, 40 marks). A Level candidates also take Paper 4 A Level Structured Questions (2 hours, 100 marks) and Paper 5 Planning, Analysis and Evaluation (1 hour 15 minutes, 30 marks), either in the same series or a later one, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "40 four-option multiple-choice questions on the AS Level content (AO1 and AO2). 31% of AS Level, 15.5% of A Level.", durationMinutes: 75, maxMarks: 40, weightingPercent: 15.5, calculatorAllowed: true },
    { code: "2", name: "Paper 2: AS Level Structured Questions", kind: "WRITTEN", description: "Structured questions on the AS Level content (AO1 and AO2). 46% of AS Level, 23% of A Level.", durationMinutes: 75, maxMarks: 60, weightingPercent: 23, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Advanced Practical Skills", kind: "PRACTICAL", description: "A laboratory practical test (AO3): two questions of 1 hour and 20 marks each, in different areas of physics; contexts may lie outside the syllabus. 23% of AS Level, 11.5% of A Level.", durationMinutes: 120, maxMarks: 40, weightingPercent: 11.5, calculatorAllowed: true },
    { code: "4", name: "Paper 4: A Level Structured Questions", kind: "WRITTEN", description: "Structured questions on the A Level content, with AS Level content assumed (AO1 and AO2). 38.5% of A Level.", durationMinutes: 120, maxMarks: 100, weightingPercent: 38.5, calculatorAllowed: true },
    { code: "5", name: "Paper 5: Planning, Analysis and Evaluation", kind: "WRITTEN", description: "Two compulsory questions of 15 marks (AO3): planning an investigation, and analysing given data to find a constant with its uncertainty; no laboratory work. 11.5% of A Level.", durationMinutes: 75, maxMarks: 30, weightingPercent: 11.5, calculatorAllowed: true },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1, 2 and 3 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2", "3"] },
    { code: "A", name: "A Level", description: "All five papers, in one series or staged (AS Level carried forward, then Papers 4 and 5) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4", "5"] },
  ],
  topics: C9702_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on the most specific node),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out. Then label each concept description with its coverage.
const coverage = new Map(); // concept -> { zimsec?: form, cambridge?: stage }
for (const s of [zimsec, c9702]) {
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
const vals = [...coverage.values()];
console.log(`${CONCEPTS.length} concepts in the registry (${vals.filter((c) => c.zimsec && c.cambridge).length} shared, ${vals.filter((c) => !c.cambridge).length} ZIMSEC only, ${vals.filter((c) => !c.zimsec).length} Cambridge only)`);

const registry = {
  family: "physics-a",
  name: "Physics (A-Level / AS & A Level)",
  level: "A",
  prefix: "aphys",
  subjects: ["zimsec/a-level/physics", "cambridge/a-level/physics"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description: `${label(coverage.get(key))} ${description}` })),
};

const strip = (k, v) => (k.startsWith("_") ? undefined : v);
const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, strip, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/physics-a.json", registry);
write("content/syllabi/zimsec/a-level/physics/2015-2022.json", zimsec);
write("content/syllabi/cambridge/a-level/physics/2025-2027.json", c9702);
