// Builds the economics-a topic tests and mock exams (ZIMSEC A-Level Economics 2015-2022, Cambridge International AS & A Level
// Economics 9708 2026-2028) with the shared helpers in .scratch/tools/assess-lib.mjs. Paper plan: .scratch/economics-a/BRIEF.md
// ("Mock exams (built later by the lead)").
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts economics-a .scratch/economics-a/inventory.json
// Run: node .scratch/economics-a/build-assessments.mjs [--report] [--write]
import { disambiguateTitles, setup, autoTopicTests, topicTest, examSpread, mcqSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("economics-a", { zim: "zimsec/a-level/economics/2015-2022", cam: "cambridge/a-level/economics/2026-2028" }, ".scratch/economics-a/inventory.json");
const RES = [20, 25];
const ZIM_ALL = ["tools", "economic-resources", "demand-theory", "supply-theory", "theory-of-the-firm", "theory-of-distribution", "government-intervention", "international-trade", "economic-performance", "money-price-level", "macro-problems-policies"];
const ZIM_ESSAY = ZIM_ALL.filter((k) => k !== "tools");
const AS_MICRO = ["price-system-as", "government-micro-as"], AS_MACRO = ["macroeconomy-as", "government-macro-as", "international-as"];
const AS = ["basic-ideas", ...AS_MICRO, ...AS_MACRO];
const AL_MICRO = ["price-system-a", "government-micro-a"], AL_MACRO = ["macroeconomy-a", "government-macro-a", "international-a"];
const AL = [...AL_MICRO, ...AL_MACRO];
const ZIM = "ZIMSEC A-Level Economics", CAM = "Cambridge International AS & A Level Economics 9708";
const confirm = "Check the instructions on your own examination papers.";
const conv = "Question sizes and part splits are our convention; real papers vary.";
const instr = (body) => `${body}\n\n- ${SELF_MARK}\n\n${conv} ${confirm}`;
const mcqInstr = (n, time) => `Answer **all** ${n} questions. You have ${time}.\n\n- Each question is worth 1 mark. Choose the one best answer.\n\n${confirm}`;
const X = (s, type, marks, n, topics, skill) => examSpread(s, { type, marks, n, topics, skill, difficulty: [3, 5], full: true });

const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1", title: `Mock exam in the style of ${ZIM} Paper 1`, minutes: 90,
    description: `A practice paper modelled on ${ZIM} Paper 1: 40 multiple-choice questions, 40 marks, 1 hour 30 minutes.`,
    instructions: mcqInstr(40, "1 hour 30 minutes"),
    sections: [{ title: "Paper 1: Multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.zim, { n: 40, topics: ZIM_ALL }) }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2", title: `Mock exam in the style of ${ZIM} Paper 2`, minutes: 75,
    description: `A practice paper modelled on ${ZIM} Paper 2: two compulsory 20-mark data-response questions, 40 marks, 1 hour 15 minutes.`,
    instructions: instr("Answer **both** questions. You have 1 hour 15 minutes. A calculator may be used."),
    sections: [{ title: "Paper 2: Data response", component: "2", instructions: "Answer both questions.", rules: X(S.zim, "STRUCTURED", 20, 2, ZIM_ALL, "ANALYSIS") }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-3", title: `Mock exam in the style of ${ZIM} Paper 3`, minutes: 180,
    description: `A practice paper modelled on ${ZIM} Paper 3: twelve 25-mark essay questions, of which you answer any four, 100 marks, 3 hours.`,
    instructions: instr("Answer **any four** questions. You have 3 hours.\n\n- Each question is worth 25 marks: part (a) 10 marks, part (b) 15 marks. Use diagrams where they help and reach a justified conclusion in part (b).\n- If you answer more than four questions, your best four count."),
    sections: [{ title: "Paper 3: Essays (answer four)", component: "3", instructions: "Answer any four questions.", answerCount: 4, marks: 100, rules: X(S.zim, "STRUCTURED", 25, 12, ZIM_ESSAY, "EVALUATION") }],
  }),
];

const essayPaper = (n, level, data, micro, macro, minutes) =>
  mock(S.cam, {
    key: `mock.9708.paper-${n}`, title: `Mock exam in the style of ${CAM} Paper ${n}`, minutes,
    description: `A practice paper modelled on ${CAM} Paper ${n} (${level} data response and essays): a compulsory 20-mark data-response question, then one microeconomics essay and one macroeconomics essay chosen from two of each, 60 marks, 2 hours.`,
    instructions: instr(`Answer **Section A** and **one** question from Section B and **one** question from Section C. You have 2 hours.\n\n- Each question is worth 20 marks. Use diagrams where they help and reach a justified judgement.`),
    sections: [
      { title: "Section A: Data response (20 marks)", component: String(n), instructions: "Answer the question.", rules: data },
      { title: "Section B: Microeconomics (20 marks)", component: String(n), instructions: "Answer one question.", answerCount: 1, marks: 20, rules: micro },
      { title: "Section C: Macroeconomics (20 marks)", component: String(n), instructions: "Answer one question.", answerCount: 1, marks: 20, rules: macro },
    ],
  });

const camMocks = [
  mock(S.cam, {
    key: "mock.9708.paper-1", title: `Mock exam in the style of ${CAM} Paper 1`, minutes: 60,
    description: `A practice paper modelled on ${CAM} Paper 1 (AS Level multiple choice): 30 questions, 30 marks, 1 hour.`,
    instructions: mcqInstr(30, "1 hour"),
    sections: [{ title: "Paper 1: AS Level multiple choice", component: "1", instructions: "Answer all the questions.", rules: mcqSpread(S.cam, { n: 30, topics: AS }) }],
  }),
  essayPaper(2, "AS Level", X(S.cam, "STRUCTURED", 20, 1, AS, "ANALYSIS"), X(S.cam, "STRUCTURED", 20, 2, AS_MICRO, "EVALUATION"), X(S.cam, "STRUCTURED", 20, 2, AS_MACRO, "EVALUATION"), 120),
  mock(S.cam, {
    key: "mock.9708.paper-3", title: `Mock exam in the style of ${CAM} Paper 3`, minutes: 75,
    description: `A practice paper modelled on ${CAM} Paper 3 (A Level multiple choice): 30 questions, 30 marks, 1 hour 15 minutes.`,
    instructions: mcqInstr(30, "1 hour 15 minutes"),
    sections: [{ title: "Paper 3: A Level multiple choice", component: "3", instructions: "Answer all the questions.", rules: mcqSpread(S.cam, { n: 30, topics: AL }) }],
  }),
  essayPaper(4, "A Level", X(S.cam, "STRUCTURED", 20, 1, AL, "ANALYSIS"), X(S.cam, "ESSAY", 20, 2, AL_MICRO, "EVALUATION"), X(S.cam, "ESSAY", 20, 2, AL_MACRO, "EVALUATION"), 120),
];

// Topics too small for a 20-mark test on their own are merged (filled in after the first --report).
const MERGE = { zim: [], cam: [] };
const tests = (s, keyPrefix, merge) => {
  const out = autoTopicTests(s, { keyPrefix, reserved: RES, skip: [...merge.flatMap((m) => m.units), "examination-skills.data-response", "examination-skills.essays"] });
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
    cam: { tests: disambiguateTitles(tests(S.cam, "9708", MERGE.cam), (t) => (AL.some((k) => t.key.startsWith(`9708.${k}.`)) ? "A Level" : "AS")), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 40, "mock.zimsec.paper-3": 100,
      "mock.9708.paper-1": 30, "mock.9708.paper-2": 60, "mock.9708.paper-3": 30, "mock.9708.paper-4": 60,
    },
  },
);
