// Builds the chemistry-a topic tests and mock exams (ZIMSEC A-Level Chemistry 2015-2022, Cambridge AS & A Level Chemistry 9701
// 2025-2027) with the shared helpers in .scratch/tools/assess-lib.mjs. Paper plan: .scratch/chemistry-a/BRIEF.md.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts chemistry-a .scratch/chemistry-a/inventory.json
// Run: node .scratch/chemistry-a/build-assessments.mjs [--report] [--write]
import { disambiguateTitles, setup, autoTopicTests, topicTest, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("chemistry-a", { zim: "zimsec/a-level/chemistry/2015-2022", cam: "cambridge/a-level/chemistry/2025-2027" }, ".scratch/chemistry-a/inventory.json");
const RES = [10, 15, 20, 25];
const ZT = S.zim.file.topics.map((t) => t.key);
const kids = (k) => S.cam.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const AS = kids("as-content"), AL = kids("a-content"), CAM_ALL = [...AS, ...AL, ...kids("practical-skills")];
const ZIM = "ZIMSEC A-Level Chemistry", CAM = "Cambridge International AS & A Level Chemistry 9701";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes and part splits are our convention; real papers vary.";
const S10 = (s, n, topics) => examSpread(s, { type: "STRUCTURED", marks: 10, n, topics, skill: "APPLICATION" });
const one = (s, marks, skill, topics) => examSpread(s, { type: "STRUCTURED", marks, n: 1, topics, skill, difficulty: [3, 5] });
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;
const mcqInstr = (n, time) => `Answer **all** ${n} questions. You have ${time}.\n\n- Each question is worth 1 mark. Choose the one best answer.\n\n${confirm}`;

const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1", title: `Mock exam in the style of ${ZIM} Paper 1`, minutes: 60,
    description: `A practice paper modelled on ${ZIM} Paper 1: 40 multiple-choice questions, 40 marks, 1 hour.`,
    instructions: mcqInstr(40, "1 hour"),
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.zim, { n: 40, topics: ZT }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2", title: `Mock exam in the style of ${ZIM} Paper 2`, minutes: 90,
    description: `A practice paper modelled on ${ZIM} Paper 2: six compulsory 10-mark structured questions, 60 marks, 1 hour 30 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 30 minutes. A calculator may be used."),
    sections: [{ title: "Paper 2: Structured questions", component: "2", instructions: "Answer all the questions.", rules: S10(S.zim, 6, ZT) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-3", title: `Mock exam in the style of ${ZIM} Paper 3`, minutes: 150,
    description: `A practice paper in the style of ${ZIM} Paper 3: six 15-mark free-response questions chosen from ten (physical, inorganic, organic and applied chemistry), 90 marks, 2 hours 30 minutes.`,
    instructions: instr("Answer **six** questions: at least two from Section A (physical), one from Section B (inorganic), two from Section C (organic) and one from Section D (applied). You have 2 hours 30 minutes. If you answer more than six, your best six count."),
    sections: [{
      title: "Paper 3: Free response", component: "3", instructions: "Answer six questions.", answerCount: 6, marks: 90,
      rules: ["physical", "inorganic", "organic", "applied"].flatMap((k, i) => examSpread(S.zim, { type: "STRUCTURED", marks: 15, n: [3, 2, 3, 2][i], topics: [k], skill: "UNDERSTANDING", difficulty: [3, 5], full: true })),
    }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-4", title: `Mock exam in the style of ${ZIM} Paper 4 (written practical skills)`, minutes: 150,
    description: `A written practice paper in the style of ${ZIM} Paper 4: a quantitative analysis question, a qualitative analysis question and a planning question, 50 marks. The hands-on practical is not simulated.`,
    instructions: instr("Answer **all** the questions. You have 2 hours 30 minutes. Describe in words what you would observe and record."),
    sections: [{
      title: "Paper 4: Practical skills (written)", component: "4", instructions: "Answer all the questions.",
      rules: [...one(S.zim, 20, "ANALYSIS", ZT), ...one(S.zim, 15, "APPLICATION", ZT), ...one(S.zim, 15, "EVALUATION", ZT)],
    }],
  }),
];

const camMocks = [
  mock(S.cam, {
    key: "mock.9701.paper-1", title: `Mock exam in the style of ${CAM} Paper 1`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 1 (AS Level): 40 multiple-choice questions, 40 marks, 1 hour 15 minutes.`,
    instructions: mcqInstr(40, "1 hour 15 minutes"),
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.cam, { n: 40, topics: AS }) }],
  }),
  mock(S.cam, {
    key: "mock.9701.paper-2", title: `Mock exam in the style of ${CAM} Paper 2`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 2 (AS Level structured questions): six 10-mark questions, 60 marks, 1 hour 15 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 15 minutes."),
    sections: [{ title: "Paper 2: AS Level structured questions", component: "2", instructions: "Answer all the questions.", rules: S10(S.cam, 6, AS) }],
  }),
  mock(S.cam, {
    key: "mock.9701.paper-3", title: `Mock exam in the style of ${CAM} Paper 3 (written)`, minutes: 120,
    description: `A written practice paper in the style of ${CAM} Paper 3 (Advanced Practical Skills): a quantitative question and a qualitative analysis question, 40 marks. The hands-on practical is not simulated.`,
    instructions: instr("Answer **all** the questions. You have 2 hours. Describe in words what you would observe and record."),
    sections: [{
      title: "Paper 3: Practical skills (written)", component: "3", instructions: "Answer all the questions.",
      rules: [...one(S.cam, 25, "ANALYSIS", CAM_ALL), ...one(S.cam, 15, "APPLICATION", CAM_ALL)],
    }],
  }),
  mock(S.cam, {
    key: "mock.9701.paper-4", title: `Mock exam in the style of ${CAM} Paper 4`, minutes: 120,
    description: `A practice paper modelled on ${CAM} Paper 4 (A Level structured questions): ten 10-mark questions, 100 marks, 2 hours.`,
    instructions: instr("Answer **all** the questions. You have 2 hours."),
    sections: [{ title: "Paper 4: A Level structured questions", component: "4", instructions: "Answer all the questions.", rules: S10(S.cam, 10, AL) }],
  }),
  mock(S.cam, {
    key: "mock.9701.paper-5", title: `Mock exam in the style of ${CAM} Paper 5`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 5 (Planning, Analysis and Evaluation): a planning question and a data-analysis question, 30 marks, 1 hour 15 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 15 minutes. A calculator may be used."),
    sections: [{
      title: "Paper 5: Planning, analysis and evaluation", component: "5", instructions: "Answer all the questions.",
      rules: [...one(S.cam, 15, "EVALUATION", CAM_ALL), ...one(S.cam, 15, "ANALYSIS", CAM_ALL)],
    }],
  }),
];

// Topics too small for a 20-mark test on their own are merged.
// Topics too small for a 20-mark test on their own are merged.
const MERGE = {
  "zim": [
    {
      "key": "environmental-nano",
      "title": "Environmental chemistry and nanochemistry",
      "about": "environmental chemistry and nanochemistry",
      "units": [
        "environmental-chemistry",
        "nano-chemistry"
      ]
    }
  ],
  "cam": [
    {
      "key": "electrochemistry-kinetics",
      "title": "Electrochemistry and reaction kinetics (AS)",
      "about": "electrochemistry and reaction kinetics (AS)",
      "units": [
        "electrochemistry",
        "kinetics"
      ]
    },
    {
      "key": "periodicity-group-2",
      "title": "Periodicity and Group 2 (AS)",
      "about": "periodicity and Group 2 (AS)",
      "units": [
        "periodicity",
        "group-2"
      ]
    },
    {
      "key": "nitrogen-polymers",
      "title": "Nitrogen compounds and polymerisation (AS)",
      "about": "nitrogen compounds and polymerisation (AS)",
      "units": [
        "nitrogen-compounds",
        "polymerisation"
      ]
    },
    {
      "key": "synthesis-analysis-as",
      "title": "Organic synthesis and analysis (AS)",
      "about": "organic synthesis and analysis (AS)",
      "units": [
        "organic-synthesis",
        "analysis-as"
      ]
    },
    {
      "key": "group-2-transition",
      "title": "Group 2 and the transition elements (A Level)",
      "about": "group 2 and the transition elements (A Level)",
      "units": [
        "group-2-a",
        "transition-elements"
      ]
    },
    {
      "key": "halogen-hydroxy-a",
      "title": "Halogen and hydroxy compounds (A Level)",
      "about": "halogen and hydroxy compounds (A Level)",
      "units": [
        "halogen-compounds-a",
        "hydroxy-compounds-a"
      ]
    },
    {
      "key": "synthesis-analysis-a",
      "title": "Organic synthesis and analysis (A Level)",
      "about": "organic synthesis and analysis (A Level)",
      "units": [
        "organic-synthesis-a",
        "analysis-a"
      ]
    },
    {
      "key": "practical-skills",
      "title": "Practical skills",
      "about": "practical skills",
      "units": [
        "practical-skills.paper-3",
        "practical-skills.paper-5"
      ]
    }
  ]
};
const tests = (s, keyPrefix, merge) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: merge.flatMap((m) => m.units) });
  for (const m of merge) {
    try {
      out.push(topicTest(s, { ...m, topics: m.units, keyPrefix, reserved: RES }));
    } catch (error) {
      s.S.problems.push(`merged topic test ${m.key}@${s.ref} skipped: ${error.message}`);
    }
  }
  return out;
};

finish(
  S,
  {
    zim: { tests: tests(S.zim, "zimsec", MERGE.zim), mocks: zimMocks, file: "zimsec" },
    cam: { tests: disambiguateTitles(tests(S.cam, "9701", MERGE.cam), (t) => (/-a.topic-test$/.test(t.key) ? "A Level" : "AS")), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 60, "mock.zimsec.paper-3": 90, "mock.zimsec.paper-4": 50,
      "mock.9701.paper-1": 40, "mock.9701.paper-2": 60, "mock.9701.paper-3": 40, "mock.9701.paper-4": 100, "mock.9701.paper-5": 30,
    },
  },
);
