/**
 * DEV-ONLY demo content for Cambridge IGCSE Chemistry. ORIGINAL questions, lessons and flashcards written for this
 * project (never copied from past papers, mark schemes or textbooks, §27). The topic tree is a DEMO structure, not
 * the official Cambridge IGCSE Chemistry syllabus.
 */
import { DEMO_EFFECTIVE_FROM, DEMO_SYLLABUS_TITLE, DEMO_VERSION_LABEL, type DemoSubjectContent } from "./types";

const r = String.raw;

/** Bohr-style diagram of a sodium atom (2,8,1): nucleus, three shells, eleven electrons. Shapes only. */
function sodiumAtomSvg(): string {
  const electron = (radius: number, degrees: number): string => {
    const rad = (degrees * Math.PI) / 180;
    const x = (200 + radius * Math.cos(rad)).toFixed(1);
    const y = (200 - radius * Math.sin(rad)).toFixed(1);
    return `<circle cx="${x}" cy="${y}" r="7" fill="#0b6e8f"/>`;
  };
  const electrons = [
    ...[90, 270].map((d) => electron(55, d)),
    ...[0, 45, 90, 135, 180, 225, 270, 315].map((d) => electron(95, d + 22.5)),
    electron(135, 0),
  ].join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">` +
    `<rect width="400" height="400" fill="#ffffff"/>` +
    `<circle cx="200" cy="200" r="55" fill="none" stroke="#1f2933" stroke-width="2.5"/>` +
    `<circle cx="200" cy="200" r="95" fill="none" stroke="#1f2933" stroke-width="2.5"/>` +
    `<circle cx="200" cy="200" r="135" fill="none" stroke="#1f2933" stroke-width="2.5"/>` +
    `<circle cx="200" cy="200" r="24" fill="#b45309"/>` +
    electrons +
    `</svg>`
  );
}

export const CHEMISTRY_DEMO: DemoSubjectContent = {
  refPrefix: "demo:cambridge-igcse-chem",
  boardSlug: "cambridge",
  qualificationSlug: "igcse",
  subjectSlug: "chemistry",
  syllabus: {
    versionLabel: DEMO_VERSION_LABEL,
    title: DEMO_SYLLABUS_TITLE,
    overview:
      "A demonstration topic structure for local development and testing. It is NOT the official Cambridge IGCSE Chemistry syllabus and must never be shown to students as one.",
    assessmentOverview: "Two demo papers used to exercise mock-exam features. Durations and paper names are placeholders, not official information.",
    effectiveFrom: DEMO_EFFECTIVE_FROM,
    components: [
      { code: "P1", name: "Demo Paper 1 (multiple choice)", kind: "MULTIPLE_CHOICE", durationMinutes: 45, calculatorAllowed: true, description: "Demo paper: multiple-choice questions." },
      { code: "P2", name: "Demo Paper 2 (theory)", kind: "WRITTEN", durationMinutes: 75, calculatorAllowed: true, description: "Demo paper: short-answer and structured questions." },
    ],
  },
  topics: [
    {
      slug: "states-of-matter",
      code: "1",
      name: "States of matter",
      description: "Solids, liquids and gases, changes of state and diffusion.",
      publicSummary: "Explain the behaviour of solids, liquids and gases with the particle model.",
      subtopics: [
        {
          slug: "solids-liquids-and-gases",
          code: "1.1",
          name: "Solids, liquids and gases",
          objectives: [
            { statement: "Describe the arrangement and motion of particles in solids, liquids and gases.", skill: "UNDERSTANDING" },
            { statement: "Explain changes of state in terms of particles and energy.", skill: "UNDERSTANDING" },
          ],
        },
        {
          slug: "diffusion",
          code: "1.2",
          name: "Diffusion",
          objectives: [{ statement: "Explain diffusion and how the mass of particles affects its rate.", skill: "UNDERSTANDING" }],
        },
      ],
    },
    {
      slug: "atoms-elements-and-compounds",
      code: "2",
      name: "Atoms, elements and compounds",
      description: "Atomic structure, isotopes and chemical bonding.",
      publicSummary: "Understand what atoms are made of and how they bond together.",
      subtopics: [
        {
          slug: "atomic-structure",
          code: "2.1",
          name: "Atomic structure",
          objectives: [
            { statement: "State the relative charges and masses of protons, neutrons and electrons.", skill: "RECALL" },
            { statement: "Write the electronic configuration of the first 20 elements.", skill: "APPLICATION" },
          ],
        },
        {
          slug: "isotopes",
          code: "2.2",
          name: "Isotopes",
          objectives: [{ statement: "Define isotopes and calculate relative atomic mass from isotopic abundances.", skill: "APPLICATION" }],
        },
        {
          slug: "ionic-and-covalent-bonding",
          code: "2.3",
          name: "Ionic and covalent bonding",
          objectives: [{ statement: "Describe ionic and covalent bonding and relate bonding to physical properties.", skill: "UNDERSTANDING" }],
        },
      ],
    },
    {
      slug: "stoichiometry",
      code: "3",
      name: "Stoichiometry",
      description: "Formulae, equations, the mole and reacting quantities.",
      publicSummary: "Write balanced equations and calculate masses, volumes and concentrations.",
      subtopics: [
        {
          slug: "formulae-and-equations",
          code: "3.1",
          name: "Formulae and equations",
          objectives: [{ statement: "Write formulae and balanced symbol equations.", skill: "APPLICATION" }],
        },
        {
          slug: "the-mole",
          code: "3.2",
          name: "The mole",
          objectives: [{ statement: "Use the mole, relative formula mass and the Avogadro constant.", skill: "APPLICATION" }],
        },
        {
          slug: "reacting-masses",
          code: "3.3",
          name: "Reacting masses and volumes",
          objectives: [{ statement: "Calculate reacting masses, gas volumes and solution concentrations.", skill: "APPLICATION" }],
        },
      ],
    },
    {
      slug: "acids-bases-and-salts",
      code: "4",
      name: "Acids, bases and salts",
      description: "The pH scale, indicators, neutralisation and the preparation of salts.",
      publicSummary: "Identify acids and alkalis and prepare salts safely.",
      subtopics: [
        {
          slug: "ph-and-indicators",
          code: "4.1",
          name: "pH and indicators",
          objectives: [{ statement: "Describe the pH scale and the colours of common indicators.", skill: "RECALL" }],
        },
        {
          slug: "neutralisation-and-salts",
          code: "4.2",
          name: "Neutralisation and salts",
          objectives: [{ statement: "Describe neutralisation and suitable methods for preparing salts.", skill: "UNDERSTANDING" }],
        },
      ],
    },
    {
      slug: "the-periodic-table",
      code: "5",
      name: "The Periodic Table",
      description: "Trends in Group I, Group VII and the noble gases.",
      publicSummary: "Use the Periodic Table to predict how elements behave.",
      subtopics: [
        {
          slug: "group-i-alkali-metals",
          code: "5.1",
          name: "Group I: the alkali metals",
          objectives: [{ statement: "Describe the reactions of Group I metals with water and the trend in reactivity.", skill: "UNDERSTANDING" }],
        },
        {
          slug: "group-vii-halogens",
          code: "5.2",
          name: "Group VII: the halogens",
          objectives: [{ statement: "Describe trends in Group VII and explain halogen displacement reactions.", skill: "UNDERSTANDING" }],
        },
        {
          slug: "noble-gases",
          code: "5.3",
          name: "The noble gases",
          objectives: [{ statement: "Explain the unreactivity of the noble gases and give uses.", skill: "UNDERSTANDING" }],
        },
      ],
    },
  ],
  diagrams: [
    {
      key: "sodium-atom",
      altText: "A model of a sodium atom: a small central circle surrounded by three concentric rings, with two dots on the inner ring, eight dots on the middle ring and one dot on the outer ring.",
      caption: "A sodium atom (2,8,1)",
      longDescription:
        "A filled circle at the centre represents the nucleus. Three concentric circles around it represent electron shells. Small dots on the shells represent electrons: two on the first shell, eight on the second and one on the third.",
      width: 400,
      height: 400,
      svg: sodiumAtomSvg(),
    },
  ],
  questions: [
    // ---------------------------------------------------------------- States of matter
    {
      ref: "c01",
      topic: "solids-liquids-and-gases",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 1,
      daily: true,
      accessTier: "PUBLIC",
      stem: "In which state of matter are the particles close together but able to move past each other?",
      payload: { selectMode: "single", shuffleOptions: false },
      options: [
        { key: "A", content: "Solid", isCorrect: false, rationale: "Particles in a solid only vibrate about fixed positions." },
        { key: "B", content: "Liquid", isCorrect: true, rationale: "Liquid particles touch their neighbours but can slide past one another." },
        { key: "C", content: "Gas", isCorrect: false, rationale: "Gas particles are far apart and move quickly in all directions." },
      ],
      explanation: "In a liquid the particles are close together and randomly arranged, and they can move past each other, so a liquid flows and takes the shape of its container.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 30,
    },
    {
      ref: "c02",
      topic: "solids-liquids-and-gases",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: "When a liquid boils, its particles gain enough energy to overcome the forces of attraction between them.",
      answerSpec: { correct: true, feedbackFalse: "Boiling needs energy: the particles must overcome the attractive forces to escape as a gas." },
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 30,
    },
    {
      ref: "c03",
      topic: "solids-liquids-and-gases",
      type: "MATCHING",
      marks: 4,
      difficulty: 2,
      stem: "Match each change of state to its name.",
      payload: {
        left: [
          { id: "l1", content: "Solid to liquid" },
          { id: "l2", content: "Liquid to gas" },
          { id: "l3", content: "Gas to liquid" },
          { id: "l4", content: "Liquid to solid" },
        ],
        right: [
          { id: "r1", content: "Melting" },
          { id: "r2", content: "Boiling or evaporation" },
          { id: "r3", content: "Condensation" },
          { id: "r4", content: "Freezing" },
          { id: "r5", content: "Sublimation" },
        ],
        shuffle: true,
      },
      answerSpec: {
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
          { leftId: "l3", rightId: "r3" },
          { leftId: "l4", rightId: "r4" },
        ],
        marksPerPair: 1,
      },
      explanation: "Sublimation is a solid changing directly into a gas, so it does not match any of the changes listed.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 60,
    },
    {
      ref: "c04",
      topic: "diffusion",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: r`Ammonia gas ($M_r = 17$) and hydrogen chloride gas ($M_r = 36.5$) are released at the same time at opposite ends of a long glass tube. Where does the white ring of ammonium chloride form?`,
      payload: { selectMode: "single", shuffleOptions: false },
      options: [
        { key: "A", content: "Nearer the hydrogen chloride end", isCorrect: true, rationale: "Ammonia molecules are lighter, so they diffuse faster and travel further before the gases meet." },
        { key: "B", content: "Nearer the ammonia end", isCorrect: false, rationale: "This would mean the heavier hydrogen chloride diffused faster." },
        { key: "C", content: "Exactly in the middle", isCorrect: false, rationale: "The gases diffuse at different rates because their molecules have different masses." },
        { key: "D", content: "No ring forms", isCorrect: false, rationale: "Ammonia and hydrogen chloride react to form solid ammonium chloride where they meet." },
      ],
      explanation: "Lighter particles diffuse faster. Ammonia molecules travel further in the same time, so the gases meet nearer the hydrogen chloride end.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "c05",
      topic: "diffusion",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 1,
      stem: "Diffusion is faster at a higher temperature.",
      answerSpec: { correct: true, feedbackFalse: "At a higher temperature particles move faster, so they spread out more quickly." },
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 25,
    },
    {
      ref: "c06",
      topic: "diffusion",
      type: "SHORT_ANSWER",
      marks: 1,
      difficulty: 2,
      stem: "Name the process in which particles spread out from a region of higher concentration to a region of lower concentration.",
      answerSpec: { accepted: [{ value: "diffusion" }], normalise: ["trim", "lowercase", "strip_punctuation"] },
      cognitiveSkill: "RECALL",
      estimatedSeconds: 30,
    },
    {
      ref: "c07",
      topic: "solids-liquids-and-gases",
      type: "EXTENDED_RESPONSE",
      markingMode: "AI_ASSISTED",
      marks: 4,
      difficulty: 3,
      accessTier: "PREMIUM",
      stem: "Use the kinetic particle theory to explain why a gas exerts a pressure on the walls of its container, and why the pressure increases when the gas is heated in a sealed container.",
      payload: { wordLimit: { max: 150 } },
      answerSpec: {
        markScheme: {
          points: [
            { id: "P1", description: "Gas particles move randomly and continuously", marks: 1 },
            { id: "P2", description: "Particles collide with the walls of the container, exerting a force (pressure)", marks: 1 },
            { id: "P3", description: "Heating increases the kinetic energy (speed) of the particles", marks: 1 },
            { id: "P4", description: "Collisions with the walls become more frequent and more forceful, so the pressure increases", marks: 1 },
          ],
        },
        modelAnswer:
          "Gas particles move randomly at high speed and keep colliding with the walls of the container; each collision exerts a force on the wall, which causes pressure. When the gas is heated the particles gain kinetic energy and move faster, so they hit the walls more often and with more force. In a sealed container the volume cannot increase, so the pressure rises.",
      },
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 300,
    },
    {
      ref: "c44",
      topic: "solids-liquids-and-gases",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 3,
      stem: "Which change of state is exothermic (releases energy to the surroundings)?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: "Melting", isCorrect: false, rationale: "Melting takes in energy to overcome the forces between particles." },
        { key: "B", content: "Boiling", isCorrect: false, rationale: "Boiling takes in energy." },
        { key: "C", content: "Condensation", isCorrect: true, rationale: "When gas particles come together as a liquid, forces of attraction form and energy is released." },
        { key: "D", content: "Sublimation", isCorrect: false, rationale: "Sublimation (solid to gas) takes in energy." },
      ],
      explanation: "Changes that bring particles closer together (condensing, freezing) release energy; changes that separate them take energy in.",
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 45,
    },
    // ---------------------------------------------------------------- Atoms, elements and compounds
    {
      ref: "c08",
      topic: "atomic-structure",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: "What is the relative charge of a neutron?",
      payload: { selectMode: "single", shuffleOptions: false },
      options: [
        { key: "A", content: r`$+1$`, isCorrect: false, rationale: "+1 is the relative charge of a proton." },
        { key: "B", content: r`$0$`, isCorrect: true, rationale: "Neutrons are neutral." },
        { key: "C", content: r`$-1$`, isCorrect: false, rationale: "−1 is the relative charge of an electron." },
      ],
      explanation: "Protons have a relative charge of +1, electrons −1, and neutrons 0.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 20,
    },
    {
      ref: "c09",
      topic: "atomic-structure",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "An atom of aluminium has proton number 13 and nucleon number 27. How many neutrons does it contain?",
      answerSpec: { value: 14 },
      explanation: "Neutrons = nucleon number − proton number = 27 − 13 = 14.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 30,
    },
    {
      ref: "c10",
      topic: "atomic-structure",
      type: "SHORT_ANSWER",
      marks: 1,
      difficulty: 2,
      stem: "Write the electronic configuration of magnesium (proton number 12), in the form 2,8,1.",
      payload: { maxLength: 20 },
      answerSpec: { accepted: [{ value: "2,8,2" }, { value: "2.8.2" }], normalise: ["trim", "remove_whitespace"] },
      explanation: "Magnesium has 12 electrons: 2 in the first shell, 8 in the second and the remaining 2 in the third.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 40,
    },
    {
      ref: "c11",
      topic: "atomic-structure",
      type: "FILL_IN_THE_BLANK",
      marks: 3,
      difficulty: 2,
      stem: r`An atom of fluorine is shown as $\ce{^{19}_{9}F}$. Complete the sentence.`,
      payload: {
        template: "The atom contains {{blank:b1}} protons, {{blank:b2}} neutrons and {{blank:b3}} electrons.",
        blanks: [
          { id: "b1", input: "number" },
          { id: "b2", input: "number" },
          { id: "b3", input: "number" },
        ],
      },
      answerSpec: {
        blanks: [
          { id: "b1", accepted: ["9"] },
          { id: "b2", accepted: ["10"] },
          { id: "b3", accepted: ["9"] },
        ],
      },
      explanation: "The bottom number is the proton number (9) and the top number the nucleon number (19). Neutrons = 19 − 9 = 10. A neutral atom has as many electrons as protons: 9.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "c12",
      topic: "atomic-structure",
      type: "DIAGRAM_LABELLING",
      marks: 3,
      difficulty: 1,
      stem: "The diagram shows a model of a sodium atom. Label the nucleus, an electron and an electron shell.",
      payload: {
        mediaAssetId: "$diagram:sodium-atom",
        labels: [
          { id: "L1", text: "Nucleus" },
          { id: "L2", text: "Electron" },
          { id: "L3", text: "Electron shell" },
          { id: "L4", text: "Neutron" },
        ],
        hotspots: [
          { id: "h1", x: 50, y: 50 },
          { id: "h2", x: 83.75, y: 50 },
          { id: "h3", x: 26.1, y: 26.1 },
        ],
        shuffleLabels: true,
      },
      answerSpec: {
        hotspots: [
          { hotspotId: "h1", labelId: "L1" },
          { hotspotId: "h2", labelId: "L2" },
          { hotspotId: "h3", labelId: "L3" },
        ],
      },
      explanation: "The nucleus is at the centre; electrons are the small particles on the shells; the shells are the rings around the nucleus. Neutrons are inside the nucleus and are not drawn separately here.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 45,
    },
    {
      ref: "c13",
      topic: "isotopes",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 3,
      stem: "Chlorine has two isotopes: chlorine-35 (75% of atoms) and chlorine-37 (25% of atoms). Calculate the relative atomic mass of chlorine.",
      answerSpec: { value: 35.5, tolerance: { kind: "absolute", amount: 0.05 } },
      explanation: r`$A_r = \frac{(35 \times 75) + (37 \times 25)}{100} = \frac{2625 + 925}{100} = 35.5$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 90,
    },
    {
      ref: "c14",
      topic: "isotopes",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "Isotopes of the same element have different numbers of protons.",
      answerSpec: { correct: false, feedbackTrue: "Isotopes have the SAME number of protons (that is what makes them the same element) but different numbers of neutrons." },
      cognitiveSkill: "RECALL",
      estimatedSeconds: 25,
    },
    {
      ref: "c15",
      topic: "ionic-and-covalent-bonding",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "Which substance contains ionic bonds?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: r`$\ce{NaCl}$`, isCorrect: true, rationale: "A metal (sodium) bonded to a non-metal (chlorine): electrons are transferred, forming ions." },
        { key: "B", content: r`$\ce{CH4}$`, isCorrect: false, rationale: "Carbon and hydrogen are non-metals: their atoms share electrons (covalent)." },
        { key: "C", content: r`$\ce{H2O}$`, isCorrect: false, rationale: "Hydrogen and oxygen are non-metals: covalent bonds." },
        { key: "D", content: r`$\ce{Cl2}$`, isCorrect: false, rationale: "Two identical non-metal atoms share a pair of electrons (covalent)." },
      ],
      explanation: "Ionic bonding usually occurs between a metal and a non-metal; compounds of non-metals only are covalent.",
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 40,
    },
    {
      ref: "c16",
      topic: "ionic-and-covalent-bonding",
      type: "MULTIPLE_CHOICE",
      marks: 2,
      difficulty: 3,
      stem: "Select ALL the properties that are typical of ionic compounds.",
      payload: { selectMode: "multiple", shuffleOptions: false },
      answerSpec: { scoring: "partial" },
      options: [
        { key: "A", content: "High melting point", isCorrect: true, rationale: "Strong electrostatic attraction between oppositely charged ions needs a lot of energy to overcome." },
        { key: "B", content: "Conducts electricity when molten", isCorrect: true, rationale: "When molten, the ions are free to move and carry charge." },
        { key: "C", content: "Conducts electricity when solid", isCorrect: false, rationale: "In the solid the ions are held in fixed positions in the lattice." },
        { key: "D", content: "Low boiling point", isCorrect: false, rationale: "Low boiling points are typical of simple covalent molecules." },
      ],
      explanation: "Ionic compounds form giant lattices of ions: high melting points, and they conduct only when molten or dissolved.",
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 60,
    },
    {
      ref: "c17",
      topic: "ionic-and-covalent-bonding",
      type: "SHORT_ANSWER",
      marks: 2,
      difficulty: 3,
      stem: "Explain why a magnesium ion has a charge of 2+.",
      answerSpec: {
        rubric: [
          { id: "R1", anyOf: ["loses two electrons", "lost two electrons", "loses 2 electrons", "lost 2 electrons", "gives away two electrons", "two electrons are lost"], marks: 1, description: "The atom loses two electrons" },
          { id: "R2", anyOf: ["12 protons", "10 electrons", "more protons than electrons", "two more protons"], marks: 1, description: "It then has two more protons than electrons" },
        ],
        normalise: ["trim", "lowercase", "collapse_whitespace"],
      },
      explanation: "A magnesium atom (2,8,2) loses its two outer electrons. The ion has 12 protons but only 10 electrons, so its overall charge is 2+.",
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 90,
    },
    {
      ref: "c18",
      topic: "ionic-and-covalent-bonding",
      type: "MATCHING",
      marks: 3,
      difficulty: 2,
      stem: "Match each substance to the type of bonding it contains.",
      payload: {
        left: [
          { id: "l1", content: r`Magnesium oxide, $\ce{MgO}$` },
          { id: "l2", content: r`Carbon dioxide, $\ce{CO2}$` },
          { id: "l3", content: "Copper" },
        ],
        right: [
          { id: "r1", content: "Ionic" },
          { id: "r2", content: "Covalent" },
          { id: "r3", content: "Metallic" },
        ],
        shuffle: false,
      },
      answerSpec: {
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
          { leftId: "l3", rightId: "r3" },
        ],
        marksPerPair: 1,
      },
      explanation: "Metal + non-metal: ionic. Non-metals only: covalent. A metal element on its own: metallic bonding.",
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 45,
    },
    {
      ref: "c43",
      topic: "ionic-and-covalent-bonding",
      type: "STRUCTURED",
      marks: 4,
      difficulty: 3,
      isExamStyle: true,
      accessTier: "PREMIUM",
      stem: "Sodium (proton number 11) reacts with chlorine (proton number 17) to form sodium chloride.",
      parts: [
        {
          partLabel: "(a)",
          type: "SHORT_ANSWER",
          marks: 1,
          difficulty: 2,
          stem: "Write the electronic configuration of a sodium atom.",
          answerSpec: { accepted: [{ value: "2,8,1" }, { value: "2.8.1" }], normalise: ["trim", "remove_whitespace"] },
        },
        {
          partLabel: "(b)",
          type: "MULTIPLE_CHOICE",
          marks: 1,
          difficulty: 2,
          stem: "What happens to the outer electron of a sodium atom when sodium chloride forms?",
          payload: { selectMode: "single", shuffleOptions: false },
          options: [
            { key: "A", content: "It is transferred to a chlorine atom", isCorrect: true, rationale: "Sodium forms Na⁺ and chlorine forms Cl⁻." },
            { key: "B", content: "It is shared with a chlorine atom", isCorrect: false, rationale: "Sharing electrons is covalent bonding." },
            { key: "C", content: "It moves into the nucleus", isCorrect: false, rationale: "Electrons do not move into the nucleus in chemical reactions." },
          ],
        },
        {
          partLabel: "(c)",
          type: "SHORT_ANSWER",
          marks: 1,
          difficulty: 3,
          stem: "Give the formula of a chloride ion, including its charge.",
          answerSpec: { accepted: [{ value: "Cl-" }, { value: "Cl⁻" }, { value: "Cl−" }, { value: "Cl^-" }, { value: "Cl1-" }], normalise: ["trim", "remove_whitespace"] },
        },
        {
          partLabel: "(d)",
          type: "TRUE_FALSE",
          marks: 1,
          difficulty: 2,
          stem: "Solid sodium chloride conducts electricity.",
          answerSpec: { correct: false, feedbackTrue: "In the solid the ions cannot move, so it does not conduct." },
        },
      ],
      explanation: "Sodium transfers its single outer electron to chlorine, forming Na⁺ (2,8) and Cl⁻ (2,8,8) ions held in a giant ionic lattice.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 240,
    },
    // ---------------------------------------------------------------- Stoichiometry
    {
      ref: "c19",
      topic: "the-mole",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: r`Calculate the relative formula mass, $M_r$, of water, $\ce{H2O}$. ($A_r$: H = 1, O = 16)`,
      answerSpec: { value: 18 },
      explanation: r`$M_r = (2 \times 1) + 16 = 18$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 30,
    },
    {
      ref: "c20",
      topic: "the-mole",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 2,
      daily: true,
      accessTier: "PUBLIC",
      stem: r`How many moles are there in 22 g of carbon dioxide, $\ce{CO2}$? ($A_r$: C = 12, O = 16)`,
      payload: { unitHint: "mol" },
      answerSpec: { value: 0.5, tolerance: { kind: "absolute", amount: 0.001 } },
      explanation: r`$M_r(\ce{CO2}) = 12 + (2 \times 16) = 44$, so moles $= \frac{22}{44} = 0.5$ mol.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "c21",
      topic: "formulae-and-equations",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "Which is the correct balanced equation for magnesium burning in oxygen?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: r`$\ce{2Mg + O2 -> 2MgO}$`, isCorrect: true, rationale: "Two magnesium atoms and two oxygen atoms on each side." },
        { key: "B", content: r`$\ce{Mg + O2 -> MgO}$`, isCorrect: false, rationale: "Not balanced: two oxygen atoms on the left, one on the right." },
        { key: "C", content: r`$\ce{Mg + O -> MgO}$`, isCorrect: false, rationale: r`Oxygen gas is diatomic: it must be written $\ce{O2}$.` },
        { key: "D", content: r`$\ce{2Mg + O2 -> MgO2}$`, isCorrect: false, rationale: r`The formula of magnesium oxide is $\ce{MgO}$ (Mg²⁺ and O²⁻).` },
      ],
      explanation: r`Magnesium oxide is $\ce{MgO}$ and oxygen is $\ce{O2}$, so two $\ce{MgO}$ are needed to use both oxygen atoms, and then two $\ce{Mg}$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "c22",
      topic: "formulae-and-equations",
      type: "FILL_IN_THE_BLANK",
      marks: 2,
      difficulty: 3,
      stem: "Balance the equation for the formation of ammonia.",
      payload: {
        template: r`$\ce{N2}$ + {{blank:b1}} $\ce{H2}$ → {{blank:b2}} $\ce{NH3}$`,
        blanks: [
          { id: "b1", input: "number" },
          { id: "b2", input: "number" },
        ],
      },
      answerSpec: {
        blanks: [
          { id: "b1", accepted: ["3"] },
          { id: "b2", accepted: ["2"] },
        ],
      },
      explanation: r`Two nitrogen atoms on the left need $2\,\ce{NH3}$ on the right, which contains six hydrogen atoms, so $3\,\ce{H2}$ are needed: $\ce{N2 + 3H2 -> 2NH3}$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "c23",
      topic: "reacting-masses",
      type: "CALCULATION",
      markingMode: "AI_ASSISTED",
      marks: 3,
      difficulty: 3,
      calculatorAllowed: true,
      stem: r`Calculate the mass of magnesium oxide formed when 6.0 g of magnesium burns completely. $\ce{2Mg + O2 -> 2MgO}$ ($A_r$: Mg = 24, O = 16). Include the unit.`,
      payload: { unitHint: "g" },
      answerSpec: {
        value: 10,
        tolerance: { kind: "absolute", amount: 0.05 },
        units: { required: true, accepted: ["g", "grams"], penaltyMarks: 1 },
        methodMarks: [{ id: "M1", description: "Moles of magnesium = 6.0 ÷ 24 = 0.25", marks: 1 }],
      },
      workedSolution: r`1. Moles of Mg $= \frac{6.0}{24} = 0.25$ mol.
2. The ratio Mg : MgO is $2 : 2 = 1 : 1$, so 0.25 mol of MgO forms.
3. $M_r(\ce{MgO}) = 24 + 16 = 40$, so mass $= 0.25 \times 40 = 10$ g.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 150,
    },
    {
      ref: "c24",
      topic: "reacting-masses",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 3,
      stem: r`What volume of carbon dioxide, measured at room temperature and pressure, is produced when 0.25 mol of calcium carbonate decomposes completely? $\ce{CaCO3 -> CaO + CO2}$ (One mole of any gas occupies 24 dm³ at r.t.p.)`,
      payload: { unitHint: "dm³" },
      answerSpec: { value: 6, tolerance: { kind: "absolute", amount: 0.01 } },
      explanation: r`The mole ratio $\ce{CaCO3}$ : $\ce{CO2}$ is $1 : 1$, so 0.25 mol of $\ce{CO2}$ forms, occupying $0.25 \times 24 = 6 \text{ dm}^3$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 75,
    },
    {
      ref: "c25",
      topic: "reacting-masses",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 4,
      stem: "0.10 mol of sodium hydroxide is dissolved in water to make 250 cm³ of solution. Calculate the concentration of the solution in mol/dm³.",
      payload: { unitHint: "mol/dm³" },
      answerSpec: { value: 0.4, tolerance: { kind: "absolute", amount: 0.001 } },
      explanation: r`$250 \text{ cm}^3 = 0.250 \text{ dm}^3$, so concentration $= \frac{0.10}{0.250} = 0.40$ mol/dm³.`,
      hints: ["Convert the volume to dm³ by dividing by 1000."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 75,
    },
    {
      ref: "c26",
      topic: "reacting-masses",
      type: "STRUCTURED",
      marks: 5,
      difficulty: 5,
      isExamStyle: true,
      accessTier: "PREMIUM",
      calculatorAllowed: true,
      stem: r`Calcium carbonate reacts with hydrochloric acid: $\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$. A student adds 5.0 g of calcium carbonate to an excess of hydrochloric acid. ($A_r$: Ca = 40, C = 12, O = 16, Cl = 35.5; one mole of gas occupies 24 dm³ at r.t.p.)`,
      parts: [
        { partLabel: "(a)", type: "NUMERICAL", marks: 1, difficulty: 2, stem: "Calculate the relative formula mass of calcium carbonate.", answerSpec: { value: 100 } },
        {
          partLabel: "(b)",
          type: "NUMERICAL",
          marks: 1,
          difficulty: 3,
          stem: "Calculate the number of moles of calcium carbonate used.",
          answerSpec: { value: 0.05, tolerance: { kind: "absolute", amount: 0.0001 } },
        },
        {
          partLabel: "(c)",
          type: "NUMERICAL",
          marks: 2,
          difficulty: 5,
          stem: "Calculate the mass of calcium chloride formed, in grams.",
          answerSpec: { value: 5.55, tolerance: { kind: "absolute", amount: 0.01 } },
        },
        {
          partLabel: "(d)",
          type: "NUMERICAL",
          marks: 1,
          difficulty: 4,
          stem: "Calculate the volume of carbon dioxide produced, in dm³ at r.t.p.",
          answerSpec: { value: 1.2, tolerance: { kind: "absolute", amount: 0.01 } },
        },
      ],
      workedSolution: r`1. $M_r(\ce{CaCO3}) = 40 + 12 + 48 = 100$.
2. Moles $= \frac{5.0}{100} = 0.050$ mol.
3. $\ce{CaCO3} : \ce{CaCl2} = 1 : 1$ and $M_r(\ce{CaCl2}) = 40 + 71 = 111$, so mass $= 0.050 \times 111 = 5.55$ g.
4. $\ce{CaCO3} : \ce{CO2} = 1 : 1$, so volume $= 0.050 \times 24 = 1.2 \text{ dm}^3$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 420,
    },
    {
      ref: "c27",
      topic: "the-mole",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 2,
      stem: r`One mole of oxygen molecules, $\ce{O2}$, has a mass of 16 g.`,
      answerSpec: { correct: false, feedbackTrue: r`$M_r(\ce{O2}) = 2 \times 16 = 32$, so one mole of oxygen molecules has a mass of 32 g.` },
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 30,
    },
    // ---------------------------------------------------------------- Acids, bases and salts
    {
      ref: "c28",
      topic: "ph-and-indicators",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: "A solution has a pH of 2. What does this tell you about the solution?",
      payload: { selectMode: "single", shuffleOptions: false },
      options: [
        { key: "A", content: "It is strongly acidic", isCorrect: true, rationale: "pH values well below 7 indicate strongly acidic solutions." },
        { key: "B", content: "It is weakly acidic", isCorrect: false, rationale: "A weakly acidic solution would have a pH nearer 7, such as 5 or 6." },
        { key: "C", content: "It is neutral", isCorrect: false, rationale: "Neutral solutions have a pH of 7." },
        { key: "D", content: "It is strongly alkaline", isCorrect: false, rationale: "Alkaline solutions have a pH above 7." },
      ],
      cognitiveSkill: "RECALL",
      estimatedSeconds: 25,
    },
    {
      ref: "c29",
      topic: "ph-and-indicators",
      type: "MATCHING",
      marks: 3,
      difficulty: 2,
      stem: "Match each indicator to its colour in an alkaline solution.",
      payload: {
        left: [
          { id: "l1", content: "Litmus" },
          { id: "l2", content: "Methyl orange" },
          { id: "l3", content: "Phenolphthalein" },
        ],
        right: [
          { id: "r1", content: "Blue" },
          { id: "r2", content: "Yellow" },
          { id: "r3", content: "Pink" },
          { id: "r4", content: "Red" },
        ],
        shuffle: true,
      },
      answerSpec: {
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
          { leftId: "l3", rightId: "r3" },
        ],
        marksPerPair: 1,
      },
      explanation: "In acids, litmus and methyl orange are red and phenolphthalein is colourless.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 45,
    },
    {
      ref: "c30",
      topic: "neutralisation-and-salts",
      type: "SHORT_ANSWER",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "Name the salt formed when sulfuric acid reacts with sodium hydroxide.",
      answerSpec: {
        accepted: [{ value: "sodium sulfate" }, { value: "sodium sulphate" }, { value: "Na2SO4" }],
        normalise: ["trim", "lowercase", "collapse_whitespace"],
      },
      explanation: r`Sulfuric acid forms sulfates: $\ce{H2SO4 + 2NaOH -> Na2SO4 + 2H2O}$.`,
      cognitiveSkill: "RECALL",
      estimatedSeconds: 30,
    },
    {
      ref: "c31",
      topic: "neutralisation-and-salts",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: "The neutralisation of an acid by an alkali produces a salt and water.",
      answerSpec: { correct: true, feedbackFalse: "Acid + alkali → salt + water is the general equation for neutralisation." },
      cognitiveSkill: "RECALL",
      estimatedSeconds: 20,
    },
    {
      ref: "c32",
      topic: "neutralisation-and-salts",
      type: "ESSAY",
      markingMode: "AI_ASSISTED",
      marks: 6,
      difficulty: 4,
      accessTier: "PREMIUM",
      stem: "Describe how you would prepare a pure, dry sample of zinc sulfate crystals from zinc oxide and dilute sulfuric acid. Include a balanced equation.",
      payload: { wordLimit: { max: 250 } },
      answerSpec: {
        markScheme: {
          points: [
            { id: "P1", description: "Warm the dilute sulfuric acid and add zinc oxide until no more dissolves (zinc oxide in excess)", marks: 1 },
            { id: "P2", description: "Filter to remove the excess zinc oxide", marks: 1 },
            { id: "P3", description: "Heat the filtrate to evaporate some of the water (to the point of crystallisation)", marks: 1 },
            { id: "P4", description: "Leave the solution to cool so that crystals form", marks: 1 },
            { id: "P5", description: "Filter off the crystals and dry them, e.g. between filter papers", marks: 1 },
            { id: "P6", description: r`Balanced equation $\ce{ZnO + H2SO4 -> ZnSO4 + H2O}$`, marks: 1 },
          ],
        },
        modelAnswer: r`Warm some dilute sulfuric acid in a beaker and add zinc oxide a little at a time, stirring, until no more dissolves, so the oxide is in excess and all the acid has reacted. Filter the mixture to remove the excess zinc oxide. Heat the filtrate gently to evaporate some of the water until crystals start to form, then leave it to cool so that zinc sulfate crystals grow. Filter off the crystals and dry them between filter papers. $\ce{ZnO + H2SO4 -> ZnSO4 + H2O}$.`,
      },
      cognitiveSkill: "CREATION",
      estimatedSeconds: 600,
    },
    {
      ref: "c33",
      topic: "neutralisation-and-salts",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 3,
      stem: "Which method is the most suitable for preparing a sample of the insoluble salt barium sulfate?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: "Mix solutions of barium chloride and sodium sulfate, then filter, wash and dry the precipitate", isCorrect: true, rationale: "Insoluble salts are made by precipitation." },
        { key: "B", content: "Add excess barium carbonate to dilute sulfuric acid, filter, then crystallise the filtrate", isCorrect: false, rationale: "Barium sulfate is insoluble, so it would not be in the filtrate." },
        { key: "C", content: "Dissolve barium sulfate in water and evaporate the water", isCorrect: false, rationale: "Barium sulfate does not dissolve in water." },
        { key: "D", content: "Heat barium oxide with sulfur", isCorrect: false, rationale: "This does not produce barium sulfate." },
      ],
      explanation: "Insoluble salts are prepared by precipitation: mix two solutions that each contain one of the ions, then filter, wash and dry the solid.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "c34",
      topic: "neutralisation-and-salts",
      type: "NUMERICAL",
      marks: 3,
      difficulty: 4,
      isExamStyle: true,
      stem: "25.0 cm³ of 0.100 mol/dm³ sodium hydroxide is exactly neutralised by 20.0 cm³ of hydrochloric acid. Calculate the concentration of the hydrochloric acid in mol/dm³.",
      payload: { unitHint: "mol/dm³" },
      answerSpec: { value: 0.125, tolerance: { kind: "absolute", amount: 0.001 } },
      workedSolution: r`1. Moles of NaOH $= 0.0250 \times 0.100 = 0.00250$ mol.
2. $\ce{HCl + NaOH -> NaCl + H2O}$: the ratio is $1 : 1$, so 0.00250 mol of HCl reacted.
3. Concentration $= \frac{0.00250}{0.0200} = 0.125$ mol/dm³.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 180,
    },
    // ---------------------------------------------------------------- The Periodic Table
    {
      ref: "c35",
      topic: "group-i-alkali-metals",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "Which of these Group I metals reacts most vigorously with cold water?",
      payload: { selectMode: "single", shuffleOptions: false },
      options: [
        { key: "A", content: "Lithium", isCorrect: false, rationale: "Lithium is at the top of the group and is the least reactive of the three." },
        { key: "B", content: "Sodium", isCorrect: false, rationale: "Sodium is more reactive than lithium but less reactive than potassium." },
        { key: "C", content: "Potassium", isCorrect: true, rationale: "Reactivity increases down Group I, and potassium is the lowest of the three." },
      ],
      explanation: "Down Group I the outer electron is further from the nucleus and is lost more easily, so reactivity increases.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 30,
    },
    {
      ref: "c36",
      topic: "group-i-alkali-metals",
      type: "FILL_IN_THE_BLANK",
      marks: 2,
      difficulty: 3,
      stem: "Complete the description of the reaction of sodium with water.",
      payload: {
        template: "Sodium reacts with water to form sodium hydroxide and {{blank:b1}} gas. The solution formed is {{blank:b2}}.",
        blanks: [
          { id: "b1", input: "select", choices: ["hydrogen", "oxygen", "carbon dioxide"] },
          { id: "b2", input: "select", choices: ["acidic", "neutral", "alkaline"] },
        ],
      },
      answerSpec: {
        blanks: [
          { id: "b1", accepted: ["hydrogen"] },
          { id: "b2", accepted: ["alkaline"] },
        ],
      },
      explanation: r`$\ce{2Na + 2H2O -> 2NaOH + H2}$. Sodium hydroxide solution is alkaline.`,
      cognitiveSkill: "RECALL",
      estimatedSeconds: 45,
    },
    {
      ref: "c42",
      topic: "group-i-alkali-metals",
      type: "CALCULATION",
      markingMode: "AI_ASSISTED",
      marks: 3,
      difficulty: 4,
      calculatorAllowed: true,
      stem: r`Calculate the mass of hydrogen produced when 4.6 g of sodium reacts completely with water. $\ce{2Na + 2H2O -> 2NaOH + H2}$ ($A_r$: Na = 23, H = 1)`,
      payload: { unitHint: "g" },
      answerSpec: {
        value: 0.2,
        tolerance: { kind: "absolute", amount: 0.005 },
        units: { required: false, accepted: ["g", "grams"] },
        methodMarks: [
          { id: "M1", description: "Moles of sodium = 4.6 ÷ 23 = 0.20", marks: 1 },
          { id: "M2", description: "Uses the 2 : 1 ratio to get 0.10 mol of hydrogen", marks: 1 },
        ],
      },
      workedSolution: r`1. Moles of Na $= \frac{4.6}{23} = 0.20$ mol.
2. Na : $\ce{H2}$ $= 2 : 1$, so 0.10 mol of $\ce{H2}$ forms.
3. $M_r(\ce{H2}) = 2$, so mass $= 0.10 \times 2 = 0.20$ g.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 150,
    },
    {
      ref: "c37",
      topic: "group-vii-halogens",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "The reactivity of the halogens increases down Group VII.",
      answerSpec: { correct: false, feedbackTrue: "Reactivity DECREASES down Group VII: chlorine is more reactive than bromine, which is more reactive than iodine." },
      cognitiveSkill: "RECALL",
      estimatedSeconds: 25,
    },
    {
      ref: "c38",
      topic: "group-vii-halogens",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 3,
      stem: "Chlorine water is added to colourless aqueous potassium bromide. What is observed?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: "The solution turns orange-brown", isCorrect: true, rationale: r`Chlorine displaces bromine: $\ce{Cl2 + 2KBr -> 2KCl + Br2}$.` },
        { key: "B", content: "There is no change", isCorrect: false, rationale: "Chlorine is more reactive than bromine, so a displacement reaction happens." },
        { key: "C", content: "A purple vapour forms", isCorrect: false, rationale: "Purple vapour is iodine; no iodine is present here." },
        { key: "D", content: "A white precipitate forms", isCorrect: false, rationale: "Both products stay in solution." },
      ],
      explanation: "A more reactive halogen displaces a less reactive one from its compounds. Bromine in solution is orange-brown.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "c39",
      topic: "group-vii-halogens",
      type: "MATCHING",
      marks: 3,
      difficulty: 2,
      stem: "Match each halogen to its appearance at room temperature and pressure.",
      payload: {
        left: [
          { id: "l1", content: "Chlorine" },
          { id: "l2", content: "Bromine" },
          { id: "l3", content: "Iodine" },
        ],
        right: [
          { id: "r1", content: "Pale yellow-green gas" },
          { id: "r2", content: "Red-brown liquid" },
          { id: "r3", content: "Grey-black solid" },
          { id: "r4", content: "Colourless gas" },
        ],
        shuffle: true,
      },
      answerSpec: {
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
          { leftId: "l3", rightId: "r3" },
        ],
        marksPerPair: 1,
      },
      explanation: "Down Group VII the halogens get darker in colour and their melting and boiling points increase: gas, then liquid, then solid.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 45,
    },
    {
      ref: "c40",
      topic: "noble-gases",
      type: "SHORT_ANSWER",
      marks: 1,
      difficulty: 2,
      stem: "Explain, in terms of electrons, why argon is unreactive.",
      answerSpec: {
        rubric: [
          {
            id: "R1",
            anyOf: ["full outer shell", "complete outer shell", "full shell", "outer shell is full", "stable electron arrangement", "8 electrons in its outer shell", "eight electrons in its outer shell"],
            marks: 1,
            description: "Argon has a full (stable) outer shell of electrons",
          },
        ],
        normalise: ["trim", "lowercase", "collapse_whitespace"],
      },
      explanation: "Argon (2,8,8) has a full outer shell, so it has no tendency to gain, lose or share electrons.",
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 45,
    },
    {
      ref: "c41",
      topic: "noble-gases",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 1,
      stem: "Which noble gas is used to fill weather balloons because it has a low density and is unreactive?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: "Helium", isCorrect: true, rationale: "Helium is much less dense than air and is unreactive, so it is safe to use." },
        { key: "B", content: "Argon", isCorrect: false, rationale: "Argon is denser than air; it is used to fill light bulbs." },
        { key: "C", content: "Neon", isCorrect: false, rationale: "Neon is best known for advertising signs." },
        { key: "D", content: "Krypton", isCorrect: false, rationale: "Krypton is denser than air." },
      ],
      cognitiveSkill: "RECALL",
      estimatedSeconds: 25,
    },
  ],
  lessons: [
    {
      ref: "lesson-atomic-structure",
      slug: "atomic-structure-and-electron-shells",
      title: "Atomic structure and electron shells",
      kind: "LESSON",
      topic: "atomic-structure",
      extraTopics: ["atoms-elements-and-compounds"],
      accessTier: "PUBLIC",
      estimatedMinutes: 20,
      summary: "What atoms are made of, how to count protons, neutrons and electrons, and how electrons are arranged in shells.",
      practice: ["c08", "c09", "c10"],
      body: r`Every atom has a tiny, dense **nucleus** containing protons and neutrons, surrounded by electrons arranged in **shells**.

:::definition{term="Proton number (atomic number)"}
The number of protons in the nucleus of an atom. It identifies the element.
:::

:::definition{term="Nucleon number (mass number)"}
The total number of protons and neutrons in the nucleus of an atom.
:::

## The three subatomic particles

| Particle | Relative charge | Relative mass | Where it is found |
| -------- | :-------------: | :-----------: | ----------------- |
| Proton   | $+1$            | $1$           | Nucleus           |
| Neutron  | $0$             | $1$           | Nucleus           |
| Electron | $-1$            | about $\frac{1}{1840}$ | Shells around the nucleus |

An atom has no overall charge because it contains equal numbers of protons and electrons.

:::worked-solution[How many neutrons are there in an atom of sodium-23? (Proton number 11)]
1. Nucleon number $= 23$ and proton number $= 11$.
2. Neutrons $= 23 - 11 = 12$.
:::

## Electronic configuration

Electrons fill the shells from the nucleus outwards. For the first 20 elements, the first shell holds up to 2 electrons and the second and third shells hold up to 8 each.

:::worked-solution[Write the electronic configuration of chlorine (proton number 17).]
1. Chlorine atoms have 17 electrons.
2. First shell: 2. Second shell: 8. Third shell: $17 - 10 = 7$.
3. The configuration is 2,8,7.
:::

:::keyfact
For Groups I to VII, the number of outer-shell electrons equals the group number, and the number of occupied shells equals the period number. Chlorine (2,8,7) is in Group VII and Period 3.
:::

:::mistake
Using the nucleon number to count electrons. A neutral atom has as many electrons as PROTONS.
:::

:::exam-tip
Read bonding questions carefully: many ask you to show only the outer-shell electrons in a dot-and-cross diagram.
:::
`,
    },
    {
      ref: "lesson-mole",
      slug: "the-mole-and-reacting-masses",
      title: "The mole and reacting masses",
      kind: "LESSON",
      topic: "the-mole",
      extraTopics: ["reacting-masses", "stoichiometry"],
      accessTier: "FREE",
      estimatedMinutes: 25,
      summary: "Use moles, relative formula masses and balanced equations to calculate reacting masses and gas volumes.",
      practice: ["c19", "c20", "c24"],
      body: r`Chemists count particles in **moles**.

:::definition{term="Mole"}
The amount of substance that contains $6.02 \times 10^{23}$ particles (atoms, molecules or ions). This number is called the Avogadro constant.
:::

:::formula{name="Moles from mass"}
$$
\text{number of moles} = \frac{\text{mass in grams}}{M_r}
$$
:::

$M_r$ is the relative formula mass: add the relative atomic masses ($A_r$) of all the atoms in the formula.

:::worked-solution[Find the relative formula mass of calcium carbonate, $\ce{CaCO3}$. ($A_r$: Ca = 40, C = 12, O = 16)]
1. $M_r = 40 + 12 + (3 \times 16)$.
2. $M_r = 40 + 12 + 48 = 100$.
:::

## Reacting masses

A balanced equation tells you the MOLE ratio of reactants and products.

:::worked-solution[What mass of carbon dioxide is produced when 50 g of calcium carbonate is heated? $\ce{CaCO3 -> CaO + CO2}$]
1. Moles of calcium carbonate $= \frac{50}{100} = 0.50$ mol.
2. The mole ratio of calcium carbonate to carbon dioxide is $1 : 1$, so 0.50 mol of carbon dioxide forms.
3. $M_r(\ce{CO2}) = 12 + (2 \times 16) = 44$, so the mass is $0.50 \times 44 = 22$ g.
:::

## Gas volumes

:::keyfact{title="Molar gas volume"}
One mole of any gas occupies $24 \text{ dm}^3$ at room temperature and pressure (r.t.p.).
:::

So the 0.50 mol of carbon dioxide above occupies $0.50 \times 24 = 12 \text{ dm}^3$ at r.t.p.

:::mistake
Using the ratio of MASSES from the equation. Always convert to moles first, use the mole ratio, then convert back to mass or volume.
:::

:::exam-tip
Set out a reacting-mass answer in three lines: moles of the substance you know, moles of the unknown from the ratio, then its mass or volume. Each line can earn a mark.
:::
`,
    },
    {
      ref: "lesson-neutralisation",
      slug: "acids-alkalis-and-neutralisation",
      title: "Acids, alkalis and neutralisation",
      kind: "LESSON",
      topic: "neutralisation-and-salts",
      extraTopics: ["ph-and-indicators", "acids-bases-and-salts"],
      accessTier: "PREMIUM",
      estimatedMinutes: 20,
      summary: "The pH scale, indicator colours, neutralisation and how to make a soluble salt from an insoluble base.",
      practice: ["c28", "c30", "c31"],
      body: r`## The pH scale

The pH scale runs from 0 to 14. Acidic solutions have a pH below 7, neutral solutions a pH of 7, and alkaline solutions a pH above 7.

| Indicator | Colour in acid | Colour in alkali |
| --------- | -------------- | ---------------- |
| Litmus | Red | Blue |
| Methyl orange | Red | Yellow |
| Phenolphthalein | Colourless | Pink |

Universal indicator shows a range of colours: red in strongly acidic solutions, green in neutral solutions and purple in strongly alkaline solutions.

:::definition{term="Neutralisation"}
The reaction of an acid with a base to form a salt and water. For an acid and an alkali the ionic equation is $\ce{H+(aq) + OH-(aq) -> H2O(l)}$.
:::

:::worked-solution[Write word and symbol equations for hydrochloric acid reacting with sodium hydroxide.]
1. Word equation: hydrochloric acid + sodium hydroxide → sodium chloride + water.
2. Symbol equation: $\ce{HCl + NaOH -> NaCl + H2O}$.
:::

## Making a soluble salt from an insoluble base

:::worked-solution[Outline how to make crystals of copper(II) sulfate from copper(II) oxide.]
1. Warm dilute sulfuric acid and add copper(II) oxide, stirring, until no more dissolves (the oxide is in excess).
2. Filter to remove the excess copper(II) oxide.
3. Heat the filtrate to evaporate some of the water until crystals start to form, then leave it to cool.
4. Filter off the crystals and dry them between filter papers.
:::

The equation is $\ce{CuO + H2SO4 -> CuSO4 + H2O}$.

:::mistake
Evaporating all of the water to dryness. Overheating can decompose the salt, and you get a powder rather than crystals.
:::

:::exam-tip
Explain why the base is added in excess: it makes sure all the acid reacts, so the filtrate contains only the salt dissolved in water.
:::
`,
    },
  ],
  flashcards: [
    { ref: "cf01", topic: "isotopes", cardType: "DEFINITION", front: "Isotopes", back: "Atoms of the same element with the same number of protons but different numbers of neutrons." },
    { ref: "cf02", topic: "atomic-structure", cardType: "DEFINITION", front: "Proton number", back: "The number of protons in the nucleus of an atom (also called the atomic number)." },
    { ref: "cf03", topic: "atomic-structure", cardType: "DEFINITION", front: "Nucleon number", back: "The total number of protons and neutrons in the nucleus of an atom (also called the mass number)." },
    { ref: "cf04", topic: "atomic-structure", cardType: "FACT", front: "Relative charges of a proton, a neutron and an electron", back: r`Proton $+1$, neutron $0$, electron $-1$.` },
    { ref: "cf05", topic: "the-mole", cardType: "FORMULA", front: "Number of moles from a mass", back: r`$\text{moles} = \dfrac{\text{mass (g)}}{M_r}$` },
    { ref: "cf06", topic: "the-mole", cardType: "FACT", front: "The Avogadro constant", back: r`$6.02 \times 10^{23}$ particles per mole.` },
    { ref: "cf07", topic: "reacting-masses", cardType: "FACT", front: "Molar gas volume at room temperature and pressure", back: r`$24 \text{ dm}^3$ per mole of any gas.` },
    { ref: "cf08", topic: "reacting-masses", cardType: "FORMULA", front: "Concentration of a solution", back: r`$\text{concentration (mol/dm}^3\text{)} = \dfrac{\text{moles}}{\text{volume (dm}^3\text{)}}$` },
    { ref: "cf09", topic: "neutralisation-and-salts", cardType: "DEFINITION", front: "Neutralisation", back: r`Acid + base → salt + water. Ionic equation: $\ce{H+ + OH- -> H2O}$.` },
    { ref: "cf10", topic: "ph-and-indicators", cardType: "FACT", front: "Colours of litmus", back: "Red in acids, blue in alkalis." },
    { ref: "cf11", topic: "group-i-alkali-metals", cardType: "FACT", front: "Test for hydrogen gas", back: "A lighted splint burns with a squeaky pop." },
    { ref: "cf12", topic: "reacting-masses", cardType: "FACT", front: "Test for carbon dioxide", back: "Bubble the gas through limewater: it turns milky (cloudy)." },
    { ref: "cf13", topic: "solids-liquids-and-gases", cardType: "FACT", front: "Test for oxygen gas", back: "It relights a glowing splint." },
    { ref: "cf14", topic: "group-i-alkali-metals", cardType: "FACT", front: "Trend in reactivity down Group I", back: "Reactivity increases down the group." },
    { ref: "cf15", topic: "group-vii-halogens", cardType: "FACT", front: "Trend in reactivity down Group VII", back: "Reactivity decreases down the group." },
    { ref: "cf16", topic: "noble-gases", cardType: "CONCEPT", front: "Why are the noble gases unreactive?", back: "Their atoms have a full outer shell of electrons, which is a stable arrangement." },
    { ref: "cf17", topic: "diffusion", cardType: "DEFINITION", front: "Diffusion", back: "The net movement of particles from a region of higher concentration to a region of lower concentration." },
  ],
  assessments: [
    {
      ref: "topic-test-stoichiometry",
      kind: "TOPIC_TEST",
      title: "Stoichiometry topic test (demo)",
      description: "A short demo topic test on formulae, equations and the mole.",
      instructions: "Answer every question. You have 30 minutes. Use the relative atomic masses given in each question.",
      accessTier: "FREE",
      timeLimitSeconds: 1800,
      topics: ["stoichiometry"],
      sections: [{ title: "Stoichiometry", questions: ["c19", "c20", "c21", "c22", "c23", "c24", "c25", "c27"] }],
    },
    {
      ref: "mock-exam",
      kind: "MOCK_EXAM",
      title: "Chemistry mock exam (demo)",
      description: "A two-paper demo mock exam for testing exam mode. Not an official paper.",
      instructions: "Each paper is timed separately. Read every question carefully before answering.",
      accessTier: "PREMIUM",
      sections: [
        {
          title: "Demo Paper 1: multiple choice",
          componentCode: "P1",
          timeLimitSeconds: 2700,
          questions: ["c01", "c04", "c08", "c15", "c21", "c28", "c33", "c35", "c38", "c41", "c44"],
        },
        {
          title: "Demo Paper 2: theory",
          componentCode: "P2",
          timeLimitSeconds: 4500,
          instructions: "Show your working in calculations.",
          questions: ["c26", "c43", "c32", "c07", "c13"],
        },
      ],
    },
  ],
};
