// Builds the computer-science-a topic tests and mock exams (ZIMSEC A-Level Computer Science 2015-2022, Cambridge
// International AS & A Level Computer Science 9618 2027-2029) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Paper plan: "Mock exams" in .scratch/computer-science-a/BRIEF.md.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts computer-science-a .scratch/computer-science-a/inventory.json
// Run: node .scratch/computer-science-a/build-assessments.mjs [--report] [--write]
import { disambiguateTitles, setup, autoTopicTests, topicTest, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("computer-science-a", { zim: "zimsec/a-level/computer-science/2015-2022", cam: "cambridge/a-level/computer-science/2027-2029" }, ".scratch/computer-science-a/inventory.json");
// Reserved exam-format marks (BRIEF "Reserved mark values"): topic tests never draw these.
const RES = [5, 10, 12, 15, 25, 30, 40];
const kids = (k) => S.cam.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const AS = kids("as-content"), AL = kids("a-level-content");
const AS_THEORY = AS.slice(0, 8), AS_PROG = AS.slice(8); // topics 1-8 (Paper 1), 9-12 (Paper 2)
const AL_PROG = ["computational-thinking", "further-programming"]; // topics 19-20 (Paper 4)
const ZT = S.zim.file.topics.map((t) => t.key);
const ZIM = "ZIMSEC A-Level Computer Science", CAM = "Cambridge International AS & A Level Computer Science 9618";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes and part splits are our convention; real papers vary.";
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;

const T10 = (s, n, topics) => examSpread(s, { type: "STRUCTURED", marks: 10, n, topics, skill: "ANALYSIS", difficulty: [3, 4], full: true });
const T5 = (s, n, topics) => examSpread(s, { type: "STRUCTURED", marks: 5, n, topics, skill: "UNDERSTANDING", difficulty: [2, 3], full: true });
const X = (s, type, marks, skill, n, topics) => examSpread(s, { type, marks, n, topics, skill, difficulty: [3, 5], full: true });

const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1", title: `Mock exam in the style of ${ZIM} Paper 1`, minutes: 180,
    description: `A practice theory paper modelled on ${ZIM} Paper 1: nine 10-mark and two 5-mark structured questions in the printed topic shares, 100 marks, 3 hours.`,
    instructions: instr("Answer **all** the questions. You have 3 hours."),
    sections: [{
      title: "Paper 1: Theory", component: "1", instructions: "Answer all the questions.",
      rules: [
        ...T10(S.zim, 1, ["data-representation"]), ...T5(S.zim, 1, ["data-representation"]),
        ...T10(S.zim, 2, ["networking"]),
        ...T10(S.zim, 2, ["computer-architecture"]),
        ...T10(S.zim, 1, ["security-ethics"]),
        ...T10(S.zim, 1, ["algorithms-data-structures"]), ...T5(S.zim, 1, ["algorithms-data-structures"]),
        ...T10(S.zim, 1, ["databases"]),
        ...T10(S.zim, 1, ["enterprising"]),
      ],
    }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2", title: `Mock exam in the style of ${ZIM} Paper 2 (written practice)`, minutes: 180,
    description: `A written practice paper in the style of ${ZIM} Paper 2: one question from each section (computer architecture 30 marks, programming, algorithm design and databases 40 marks, networking 30 marks), 100 marks, 3 hours. The real paper is done on a computer; your code is not run here.`,
    instructions: instr("Answer **all** three questions. You have 3 hours. Write programs in Python and algorithms in pseudocode."),
    sections: [{
      title: "Paper 2: Practical (written)", component: "2", instructions: "Answer all the questions.",
      rules: [...X(S.zim, "STRUCTURED", 30, "APPLICATION", 1, ZT), ...X(S.zim, "STRUCTURED", 40, "CREATION", 1, ZT), ...X(S.zim, "STRUCTURED", 30, "ANALYSIS", 1, ZT)],
    }],
  }),
];

const camMocks = [
  mock(S.cam, {
    key: "mock.9618.paper-1", title: `Mock exam in the style of ${CAM} Paper 1`, minutes: 90,
    description: `A practice paper modelled on ${CAM} Paper 1 (AS Level theory fundamentals, topics 1-8): five 10-mark and five 5-mark structured questions, 75 marks, 1 hour 30 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 30 minutes. Calculators are not allowed."),
    sections: [{ title: "Paper 1: Theory fundamentals", component: "1", instructions: "Answer all the questions.", rules: [...T10(S.cam, 5, AS_THEORY), ...T5(S.cam, 5, AS_THEORY)] }],
  }),
  mock(S.cam, {
    key: "mock.9618.paper-2", title: `Mock exam in the style of ${CAM} Paper 2`, minutes: 120,
    description: `A practice paper modelled on ${CAM} Paper 2 (AS Level problem-solving and programming skills, topics 9-12): five 12-mark structured questions and a 15-mark final scenario, 75 marks, 2 hours.`,
    instructions: instr("Answer **all** the questions. You have 2 hours. Write algorithms in pseudocode following the 9618 pseudocode guide. Calculators are not allowed."),
    sections: [{
      title: "Paper 2: Problem-solving and programming skills", component: "2", instructions: "Answer all the questions.",
      rules: [...X(S.cam, "STRUCTURED", 12, "APPLICATION", 5, AS_PROG), ...X(S.cam, "EXTENDED_RESPONSE", 15, "CREATION", 1, AS_PROG)],
    }],
  }),
  mock(S.cam, {
    key: "mock.9618.paper-3", title: `Mock exam in the style of ${CAM} Paper 3`, minutes: 90,
    description: `A practice paper modelled on ${CAM} Paper 3 (A Level advanced theory, topics 13-20): six 10-mark and three 5-mark structured questions, 75 marks, 1 hour 30 minutes.`,
    instructions: instr("Answer **all** the questions. You have 1 hour 30 minutes. Calculators are not allowed."),
    sections: [{ title: "Paper 3: Advanced theory", component: "3", instructions: "Answer all the questions.", rules: [...T10(S.cam, 6, AL), ...T5(S.cam, 3, AL)] }],
  }),
  mock(S.cam, {
    key: "mock.9618.paper-4", title: `Mock exam in the style of ${CAM} Paper 4 (written practice)`, minutes: 150,
    description: `A written practice paper in the style of ${CAM} Paper 4 (A Level practical): three 25-mark programming tasks in Python, 75 marks, 2 hours 30 minutes. The real paper is done on a computer; your code is not run here.`,
    instructions: instr("Answer **all** three tasks. You have 2 hours 30 minutes. Write your programs in Python."),
    sections: [{ title: "Paper 4: Practical (written)", component: "4", instructions: "Answer all the questions.", rules: X(S.cam, "STRUCTURED", 25, "CREATION", 3, [...AL_PROG, "practical-skills"]) }],
  }),
];

// mcqSpread is imported for parity with the other builders (mocks here are structured only).
void mcqSpread;

// Topics too thin for a 20-mark test of their own are merged with their neighbour; the Paper 4 practical-skills topic is
// covered by the Paper 4 mock only.
const MERGE = {
  zim: [],
  cam: [
    { key: "algorithms-data-types", title: "Algorithm design, data types and structures (AS)", about: "algorithm design, data types and data structures (AS)", units: ["algorithm-design", "data-types-structures"] },
    { key: "security-all", title: "Security and encryption (AS and A Level)", about: "security, privacy, data integrity and encryption", units: ["security", "security-a"] },
  ],
};
const SKIP = { zim: [], cam: ["practical-skills.paper-4"] };
const tests = (s, keyPrefix, merge, skip) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: [...merge.flatMap((m) => m.units), ...skip] });
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
    zim: { tests: tests(S.zim, "zimsec", MERGE.zim, SKIP.zim), mocks: zimMocks, file: "zimsec" },
    cam: { tests: disambiguateTitles(tests(S.cam, "9618", MERGE.cam, SKIP.cam), (t) => (AL.some((k) => t.key.startsWith(`9618.${k}.`)) ? "A Level" : "AS")), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec.paper-1": 100, "mock.zimsec.paper-2": 100,
      "mock.9618.paper-1": 75, "mock.9618.paper-2": 75, "mock.9618.paper-3": 75, "mock.9618.paper-4": 75,
    },
  },
);
