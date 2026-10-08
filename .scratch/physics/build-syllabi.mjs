// Builds content/concepts/physics-o.json and the two physics-o syllabus files from the compact sources here.
// Run: node .scratch/physics/build-syllabi.mjs   (from the repo root)
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { CONCEPTS } from "./concepts.mjs";
import { CAMBRIDGE_TOPICS, CAMBRIDGE_COMPONENTS } from "./cambridge.mjs";
import { ZIMSEC_TOPICS } from "./zimsec.mjs";

const out = (path, data) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 1) + "\n");
  console.log("wrote", path);
};

// ---------------------------------------------------------------------------------------------------------------------
out("content/concepts/physics-o.json", {
  family: "physics-o",
  name: "Physics (O-Level / IGCSE)",
  level: "O",
  prefix: "phys",
  subjects: ["zimsec/o-level/physics", "cambridge/igcse/physics"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
});

// ---------------------------------------------------------------------------------------------------------------------
function cambridgeNode(node) {
  const { objectives, children, objectivePrefix, ...rest } = node;
  const result = { ...rest };
  if (objectives) {
    const prefix = objectivePrefix ?? node.code;
    result.objectives = objectives.map(([n, tier, text, skill]) => ({
      code: `${prefix}.${n}`,
      text: tier === "S" ? `Supplement: ${text.charAt(0).toLowerCase()}${text.slice(1)}` : text,
      skill,
    }));
  }
  if (children) result.children = children.map(cambridgeNode);
  return result;
}

out("content/syllabi/cambridge/igcse/physics/2026-2028.json", {
  board: "cambridge",
  qualification: "igcse",
  subject: "physics",
  versionLabel: "2026-2028",
  family: "physics-o",
  title: "Cambridge IGCSE Physics (0625)",
  code: "0625",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2028-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Physics 0625 syllabus for 2026, 2027 and 2028 (version 2)",
    url: "https://www.cambridgeinternational.org/Images/697209-2026-2028-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote:
    "Topic and subtopic headings, their numbering and the Core/Supplement split of every learning statement are transcribed from the official syllabus document. Learning-objective statements are our own paraphrase; each objective code is the subtopic code plus the board's own statement number (Core statements first, then Supplement). 'Supplement:' marks statements examined only on the Extended papers (2 and 4).",
  notes: [
    "Checked on 2026-10-08 against the official PDF (version 2, for exams in 2026, 2027 and 2028): the 6 topics, every numbered subtopic heading, the Core/Supplement split of every statement and the paper facts in the Assessment overview were read from the document's text.",
    "Supplement-only subtopics (the Core column is empty): 1.6 Momentum and 4.5.2 The a.c. generator, linked to Papers 2 and 4. Core-only subtopics: 1.5.3, 1.7.2, 1.7.4, 2.1.1, 2.3.2, 4.2.5 and 4.4.",
    "A node cannot restrict a concept by tier, so Supplement depth is recorded in the objectives ('Supplement:') and in the concept descriptions of content/concepts/physics-o.json; content written for Supplement statements must say so.",
    "The syllabus gives the acceleration of free fall as approximately 9.8 m/s² (1.2.8); questions use g = 9.8 m/s² (9.8 N/kg) unless they state otherwise.",
    "The 'Experimental skills (Papers 5 and 6)' node is ours, not a numbered subject-content topic: it holds the experimental-skills content (section 4 of the syllabus, AO3) so practical-skills questions can be tagged. Its objective codes (practical.n) are ours.",
    "Not in this syllabus, though some other boards teach them: specific latent heat, thermometers, atmospheric pressure instruments, the equations of uniformly accelerated motion, machines, structures, engines and electronics beyond diodes and LEDs.",
  ],
  overview:
    "Cambridge IGCSE Physics covers six topics: motion, forces and energy; thermal physics; waves (including light, the electromagnetic spectrum and sound); electricity and magnetism; nuclear physics; and space physics. Every topic has Core content for all candidates and Supplement content for Extended candidates, with an emphasis on applying physics to unfamiliar situations and on practical skills.",
  assessmentOverview:
    "Core candidates take Paper 1 (45-minute multiple choice, 40 marks, 30%) and Paper 3 (75-minute theory, 80 marks, 50%); Extended candidates take Paper 2 (45-minute multiple choice, 40 marks, 30%) and Paper 4 (75-minute theory, 80 marks, 50%). Everyone also takes one practical paper: Paper 5 Practical Test (75 minutes) or Paper 6 Alternative to Practical (60 minutes), each 40 marks and 20%. Core candidates can achieve grades C to G; Extended candidates A* to G.",
  components: CAMBRIDGE_COMPONENTS,
  routes: [
    { code: "CORE", name: "Core", description: "Papers 1 and 3 and one practical paper (5 or 6). Grades C to G are available.", components: ["1", "3", { code: "5", compulsory: false, choiceGroup: "Practical paper" }, { code: "6", compulsory: false, choiceGroup: "Practical paper" }] },
    { code: "EXTENDED", name: "Extended", description: "Papers 2 and 4 and one practical paper (5 or 6). Grades A* to G are available.", components: ["2", "4", { code: "5", compulsory: false, choiceGroup: "Practical paper" }, { code: "6", compulsory: false, choiceGroup: "Practical paper" }] },
  ],
  topics: CAMBRIDGE_TOPICS.map(cambridgeNode),
});

// ---------------------------------------------------------------------------------------------------------------------
function zimsecNode(node) {
  const { objectives, children, objectivePrefix, ...rest } = node;
  const result = { ...rest };
  if (objectives) {
    const prefix = objectivePrefix ?? node.code;
    result.objectives = objectives.map(([text, skill], index) => ({ code: `${prefix}.${index + 1}`, text, skill }));
  }
  if (children) result.children = children.map(zimsecNode);
  return result;
}

out("content/syllabi/zimsec/o-level/physics/2015-2022.json", {
  board: "zimsec",
  qualification: "o-level",
  subject: "physics",
  versionLabel: "2015-2022",
  family: "physics-o",
  title: "ZIMSEC O-Level Physics",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "O Level Physics Syllabus, Forms 3 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.zimsec.co.zw/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote:
    "Topic and subtopic headings and numbers are transcribed from the Ministry's O Level Physics Syllabus Forms 3 - 4 (2015 - 2022): topics from '6.0 Topics', subtopics from the scope and sequence chart and the '8.0 Competency matrix', each with its Form. Learning-objective statements are our own paraphrase of the competency matrix; their codes (subtopic number + running number, or a word prefix for unnumbered nodes) are ours, not the board's.",
  notes: [
    "Source status (checked 2026-10-08): the Ministry document 'O- Level Physics Syllabus Forms 3 - 4, 2015 - 2022' (Curriculum Development and Technical Services, 2015) was read from a third-party text rendering at https://www.readkong.com/page/o-level-physics-syllabus-forms-3-4-2015-2022-2524754, which is not an official Ministry or ZIMSEC address. The preamble, aims, objectives, topic list, the whole scope and sequence chart and the competency matrix up to 14.4 Electronic components were read. The rest of the document (the remaining electronics and the atomic and nuclear physics matrix pages, and section 9.0 Assessment) was not available. A copy at revision.co.zw could not be opened (its TLS certificate does not match the host). Verify every heading against an official copy and replace the officialDocument URL once one is confirmed.",
    "Not recorded because the assessment section was not read: the subject code (commonly cited as 4023, not printed in the pages read), the papers and their durations, marks and weightings, and calculator rules. No components are listed and no mock exams are built for this syllabus until they are confirmed.",
    "Electronics numbering: the competency matrix numbers 14.1 Thermionic emission, 14.2 Diodes, 14.3 Rectification and 14.4 Electronic components; the scope and sequence chart lists 14.1 Electronic components and 14.2 Logic gates. The matrix numbering is used, and Logic gates (from the chart: circuit symbols and truth tables) is an unnumbered node.",
    "Topic 15 (atomic model; isotopes; radioactivity: definition, types of emission and their characteristics, use, storage, handling and impact) comes from the scope and sequence chart only. Background radiation and detection, decay equations, half-life and nuclear fission and fusion are not mentioned there, so those concepts are not mapped to this syllabus; add them if the competency matrix includes them.",
    "The competency matrix numbers 'Social and economic considerations of using fuels' 8.1, like the four-stroke engine; it is kept as an unnumbered second subtopic of topic 8.",
    "ZIMSEC-only content mapped here (not in Cambridge IGCSE 0625): the equations of motion (2.1), atmospheric pressure, barometers, manometers and hydraulics (3.6), simple machines (4), mechanical structures (5), thermometers and specific latent heat (7.2), Charles's law and the equation of state (7.1), the four-stroke engine and fuels (8), primary and secondary cells (11.2), R = ρl/A (11.3), magnetising and demagnetising (12.1), thermionic emission, rectification, electronic components and logic gates (14). The 3.2 note says conservation of momentum is not required, so only p = mv content applies to ZIMSEC.",
    "Curriculum change: the Heritage-Based Curriculum Framework 2024-2030 is replacing the 2015-2022 framework in phases (see the notes of the ZIMSEC chemistry and biology files). November 2026 and later O-Level candidates may be examined on a Heritage-Based Physics syllabus that could not be obtained. Confirm, add it as a new version file and give this version an effectiveTo.",
    "The 'Experimental skills' node is ours, not a numbered topic: it holds the practical skills of syllabus objectives 4.1, 4.3 and 4.8 so practical-skills content can be tagged.",
  ],
  overview:
    "The ZIMSEC O-Level Physics syllabus (Forms 3-4) covers fifteen topics: measurement, kinematics, forces, machines, mechanical structures, work, energy and power, thermal physics, internal combustion engines, waves, optics, electricity, magnetism, electromagnetism, electronics, and atomic and nuclear physics. It stresses understanding and applying physics to solve real problems, practical and ICT skills, safety and Zimbabwean contexts such as value addition in mining and industry.",
  assessmentOverview:
    "Learners are assessed by continuous assessment and a national examination. The paper structure, durations and marks were not available in the source read and must be confirmed from the official syllabus or from ZIMSEC.",
  components: [],
  routes: [],
  topics: ZIMSEC_TOPICS.map(zimsecNode),
});
