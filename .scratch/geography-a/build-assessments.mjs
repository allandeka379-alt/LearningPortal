// Builds the geography-a topic tests and mock exams (ZIMSEC A-Level Geography 2015-2022, Cambridge International AS & A Level
// Geography 9696 2027-2029) with the shared helpers in .scratch/tools/assess-lib.mjs. Paper plan: .scratch/geography-a/BRIEF.md
// ("Mock exams (built later by the lead)").
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts geography-a .scratch/geography-a/inventory.json
// Run: node .scratch/geography-a/build-assessments.mjs [--report] [--write]
import { disambiguateTitles, setup, autoTopicTests, topicTest, examSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("geography-a", { zim: "zimsec/a-level/geography/2015-2022", cam: "cambridge/a-level/geography/2027-2029" }, ".scratch/geography-a/inventory.json");
const RES = [10, 15, 20, 25];
const ZIM_PHYS = ["environmental-management", "atmosphere", "geomorphology", "hydrology", "biogeography"];
const ZIM_HUMAN = ["population-migration", "settlement", "agriculture", "mining", "industrial-dynamics", "energy", "transport-trade", "regional-inequalities"];
const STATS = ["geo-statistics.levels-univariate"];
const MAPPING = ["exam-skills.topographic-map", "gis-remote-sensing"];
const RESEARCH = ["geo-statistics.research-techniques"];
const CAM_P1 = ["hydrology", "atmosphere", "earth-processes"], CAM_P2 = ["population-migration", "water-resources", "urban-areas"];
const CAM_P3 = ["tropical-environments", "coastal-environments", "hazardous-environments", "arid-environments"];
const CAM_P4 = ["climate-change-governance", "environmental-issues", "trade-aid-tourism", "disease-geography"];
const ZIM = "ZIMSEC A-Level Geography", CAM = "Cambridge International AS & A Level Geography 9696";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes, part splits and the way choices are grouped are our convention; real papers vary.";
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;
const X = (s, type, marks, n, topics, skill) => examSpread(s, { type, marks, n, topics, skill, difficulty: [3, 5], full: true });

const zimTheory = (n, title, topics, about) =>
  mock(S.zim, {
    key: `mock.zimsec.paper-${n}`, title: `Mock exam in the style of ${ZIM} Paper ${n}`, minutes: 180,
    description: `A practice paper modelled on ${ZIM} Paper ${n} (${about}): ten 25-mark structured questions, of which you answer any four, 100 marks, 3 hours.`,
    instructions: instr("Answer **any four** questions. You have 3 hours.\n\n- Each question is worth 25 marks. Use the resource in each question, named examples and, in the last part, a supported judgement.\n- If you answer more than four questions, your best four count."),
    sections: [{ title: `Paper ${n}: ${title} (answer four)`, component: String(n), instructions: "Answer any four questions.", answerCount: 4, marks: 100, rules: X(S.zim, "STRUCTURED", 25, 10, topics, "APPLICATION") }],
  });

const zimMocks = [
  zimTheory(1, "Physical geography", ZIM_PHYS, "physical geography"),
  zimTheory(2, "Human geography", ZIM_HUMAN, "human geography"),
  mock(S.zim, {
    key: "mock.zimsec.paper-3", title: `Mock exam in the style of ${ZIM} Paper 3`, minutes: 180,
    description: `A practice paper modelled on ${ZIM} Paper 3 (practical geography): a compulsory statistics question, one mapping, GIS or remote sensing question and one research techniques question, 75 marks, 3 hours.`,
    instructions: instr("Answer the question in **Section A**, **one** question from Section B and **one** question from Section C. You have 3 hours. A calculator may be used.\n\n- Each question is worth 25 marks. Show your working for every calculation."),
    sections: [
      { title: "Section A: Geo-statistics (25 marks)", component: "3", instructions: "Answer the question.", rules: X(S.zim, "STRUCTURED", 25, 1, STATS, "ANALYSIS") },
      { title: "Section B: Maps, GIS and remote sensing (25 marks)", component: "3", instructions: "Answer one question.", answerCount: 1, marks: 25, rules: X(S.zim, "STRUCTURED", 25, 3, MAPPING, "ANALYSIS") },
      { title: "Section C: Research techniques (25 marks)", component: "3", instructions: "Answer one question.", answerCount: 1, marks: 25, rules: X(S.zim, "STRUCTURED", 25, 3, RESEARCH, "ANALYSIS") },
    ],
  }),
];

const camAS = (n, topics, about) =>
  mock(S.cam, {
    key: `mock.9696.paper-${n}`, title: `Mock exam in the style of ${CAM} Paper ${n}`, minutes: 90,
    description: `A practice paper modelled on ${CAM} Paper ${n} (${about}): three compulsory 15-mark resource-based questions, then one 15-mark essay chosen from three, 60 marks, 1 hour 30 minutes.`,
    instructions: instr("Answer **all** the questions in Section A and **one** question from Section B. You have 1 hour 30 minutes."),
    sections: [
      { title: "Section A (45 marks)", component: String(n), instructions: "Answer all the questions.", rules: X(S.cam, "STRUCTURED", 15, 3, topics, "ANALYSIS") },
      { title: "Section B (15 marks)", component: String(n), instructions: "Answer one question.", answerCount: 1, marks: 15, rules: X(S.cam, "EXTENDED_RESPONSE", 15, 3, topics, "EVALUATION") },
    ],
  });

const camOptions = (n, topics, about) =>
  mock(S.cam, {
    key: `mock.9696.paper-${n}`, title: `Mock exam in the style of ${CAM} Paper ${n}`, minutes: 90,
    description: `A practice paper modelled on ${CAM} Paper ${n} (${about}): choose two of the four topics and answer that topic's 10-mark structured question and one of its 20-mark essays, 60 marks, 1 hour 30 minutes.`,
    instructions: instr("Choose **two** topics. For each, answer the structured question in Section A and **one** essay on the same topic in Section B. You have 1 hour 30 minutes.\n\n- Essays need a detailed, specific example and a supported judgement."),
    sections: [
      { title: "Section A: Structured questions (20 marks)", component: String(n), instructions: "Answer two questions, on your two chosen topics.", answerCount: 2, marks: 20, rules: X(S.cam, "STRUCTURED", 10, 4, topics, "ANALYSIS") },
      { title: "Section B: Essays (40 marks)", component: String(n), instructions: "Answer two essays, one on each of your chosen topics.", answerCount: 2, marks: 40, rules: X(S.cam, "EXTENDED_RESPONSE", 20, 8, topics, "EVALUATION") },
    ],
  });

const camMocks = [
  camAS(1, CAM_P1, "AS Level physical core"),
  camAS(2, CAM_P2, "AS Level human core"),
  camOptions(3, CAM_P3, "A Level physical options"),
  camOptions(4, CAM_P4, "A Level human options"),
];

// Topics too small for a 20-mark test on their own are merged (filled in after the first --report).
const MERGE = { zim: [], cam: [] };
const SKIP = ["exam-skills", "skills"];
const tests = (s, keyPrefix, merge) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: [...merge.flatMap((m) => m.units), ...SKIP] });
  for (const m of merge) {
    try {
      out.push(topicTest(s, { ...m, topics: m.units, keyPrefix, reserved: RES }));
    } catch (error) {
      s.S.problems.push(`merged topic test ${m.key}@${s.ref} skipped: ${error.message}`);
    }
  }
  return out;
};

const A_LEVEL = [...CAM_P3, ...CAM_P4];
finish(
  S,
  {
    zim: { tests: tests(S.zim, "zimsec", MERGE.zim), mocks: zimMocks, file: "zimsec" },
    cam: { tests: disambiguateTitles(tests(S.cam, "9696", MERGE.cam), (t) => (A_LEVEL.some((k) => t.key.startsWith(`9696.${k}.`)) ? "A Level" : "AS")), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec.paper-1": 100, "mock.zimsec.paper-2": 100, "mock.zimsec.paper-3": 75,
      "mock.9696.paper-1": 60, "mock.9696.paper-2": 60, "mock.9696.paper-3": 60, "mock.9696.paper-4": 60,
    },
  },
);
