// Builds the geography-o topic tests and mock exams (ZIMSEC O-Level Geography 2015-2022, Cambridge IGCSE 0460
// 2027-2029) with the shared helpers in .scratch/tools/assess-lib.mjs.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts geography-o .scratch/geography/inventory.json
// Run: node .scratch/geography/build-assessments.mjs [--report] [--write]
import { setup, autoTopicTests, examRule, mcqRule, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup("geography-o", { zim: "zimsec/o-level/geography/2015-2022", cam: "cambridge/igcse/geography/2027-2029" });
const RESERVED = [25, 30];

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC
const zimTests = autoTopicTests(S.zim, { keyPrefix: "zimsec", reserved: RESERVED });
const zimMocks = [
  mock(S.zim, {
    key: "mock.zimsec.paper-1",
    title: "Mock exam in the style of ZIMSEC O-Level Geography Paper 1",
    description: "A full-length practice paper modelled on ZIMSEC O-Level Geography Paper 1 (multiple choice): 40 questions, 40 marks, 1 hour 30 minutes, on map work, the physical environment, economic geography, and population, settlement, transport and trade. Questions are drawn from the bank, so every attempt is a new paper.",
    instructions: "Answer **all** 40 questions. You have 1 hour 30 minutes.\n\n- Each question is worth 1 mark. Choose the one best answer.\n- Map-work questions describe the map extract in words and tables: read them carefully.\n- The paper is marked when you submit or when the time runs out.\n\nThe format follows ZIMSEC O-Level Geography Paper 1 as described in the 2015-2022 syllabus. Check the instructions on your own examination papers.",
    minutes: 90,
    sections: [{
      title: "Paper 1: Multiple choice",
      component: "1",
      instructions: "Answer all the questions.",
      rules: [
        mcqRule("maps", 12),
        mcqRule("weather-climate", 5), mcqRule("landforms", 4), mcqRule("ecosystems", 2), mcqRule("environment", 2),
        mcqRule("resources", 1), mcqRule("energy", 2), mcqRule("mining", 2), mcqRule("agriculture", 2), mcqRule("industry", 1),
        mcqRule("settlement-population", 5), mcqRule("transport-trade", 2),
      ],
    }],
  }),
  mock(S.zim, {
    key: "mock.zimsec.paper-2",
    title: "Mock exam in the style of ZIMSEC O-Level Geography Paper 2",
    description: "A full-length practice paper modelled on ZIMSEC O-Level Geography Paper 2 (structured free-response and data-response questions): nine 25-mark questions in three sections, answer four, 2 hours 30 minutes, 100 marks.",
    instructions: `Answer **four** questions: **one** from each of Sections A, B and C, and **one more** from any section. You have 2 hours 30 minutes.\n\n- Questions 1-3 are Section A (physical environment), 4-6 Section B (economic geography) and 7-9 Section C (population, settlement, transport and trade).\n- Each question is worth 25 marks. If you answer more than four, your best four count.\n- Use named examples, especially from Zimbabwe, where the question asks for them.\n- ${SELF_MARK}\n\nThe format follows ZIMSEC O-Level Geography Paper 2 as described in the 2015-2022 syllabus. Check the instructions on your own examination papers.`,
    minutes: 150,
    sections: [{
      title: "Paper 2: Sections A, B and C (answer four questions)",
      component: "2",
      instructions: "Answer one question from each section and one more from any section.",
      answerCount: 4,
      marks: 100,
      rules: [
        examRule("weather-climate", "STRUCTURED", 25), examRule("landforms", "STRUCTURED", 25), examRule("environment", "STRUCTURED", 25),
        examRule("mining", "STRUCTURED", 25), examRule("agriculture", "STRUCTURED", 25), examRule("industry", "STRUCTURED", 25),
        examRule("settlement-population", "STRUCTURED", 25, 2), examRule("transport-trade", "STRUCTURED", 25),
      ],
    }],
  }),
];

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge 0460
const camTests = autoTopicTests(S.cam, { keyPrefix: "cambridge", reserved: RESERVED });
const camPaper = (n, title, compulsory, choice, about) =>
  mock(S.cam, {
    key: `mock.cambridge.paper-${n}`,
    title: `Mock exam in the style of Cambridge IGCSE Geography Paper ${n} (${title})`,
    description: `A full-length practice paper modelled on Cambridge IGCSE Geography 0460 Paper ${n} (${title}): one compulsory 25-mark question in Section A and a choice of 25-mark questions in Section B, answer two, 1 hour 45 minutes, 75 marks, on ${about}. This practice paper offers four Section B questions where the real paper offers three.`,
    instructions: `Answer the question in Section A and **two** questions from Section B. You have 1 hour 45 minutes.\n\n- Each question is worth 25 marks. If you answer more than two in Section B, your best two count.\n- Where a question asks for a detailed example, name a specific place and give precise detail.\n- ${SELF_MARK}\n\nThe format follows Paper ${n} of the 2027-2029 syllabus. Check the instructions on your own examination papers.`,
    minutes: 105,
    sections: [
      { title: "Section A (25 marks)", component: String(n), instructions: "Answer this question.", rules: [examRule(compulsory, "STRUCTURED", 25)] },
      { title: "Section B (50 marks)", component: String(n), instructions: "Answer two questions.", answerCount: 2, marks: 50, rules: choice.map((t) => examRule(t, "STRUCTURED", 25)) },
    ],
  });
const camMocks = [
  camPaper(1, "Physical Geography", "climate-change", ["rivers", "coasts", "ecosystems", "tectonics"], "changing river and coastal environments, ecosystems, tectonic hazards and climate change"),
  camPaper(2, "Human Geography", "development", ["populations", "towns-cities", "economies", "resources"], "populations, towns and cities, development, economies and resource provision"),
  mock(S.cam, {
    key: "mock.cambridge.paper-4",
    title: "Mock exam in the style of Cambridge IGCSE Geography Paper 4 (Geographical Investigations)",
    description: "A full-length practice paper modelled on Cambridge IGCSE Geography 0460 Paper 4 (Geographical Investigations): two compulsory 30-mark questions on fieldwork investigations, 1 hour 30 minutes, 60 marks.",
    instructions: `Answer **both** questions. You have 1 hour 30 minutes.\n\n- Each question is worth 30 marks and follows a fieldwork investigation from hypothesis to evaluation.\n- Show your working in calculations.\n- ${SELF_MARK}\n\nThe format follows Paper 4 of the 2027-2029 syllabus. Check the instructions on your own examination papers.`,
    minutes: 90,
    sections: [{ title: "Paper 4 (60 marks)", component: "4", instructions: "Answer both questions.", rules: [examRule("skills", "STRUCTURED", 30, 2)] }],
  }),
];

finish(S, { zim: { tests: zimTests, mocks: zimMocks, file: "zimsec" }, cam: { tests: camTests, mocks: camMocks, file: "cambridge" } }, {
  expectedMarks: { "mock.zimsec.paper-1": 40, "mock.zimsec.paper-2": 100, "mock.cambridge.paper-1": 75, "mock.cambridge.paper-2": 75, "mock.cambridge.paper-4": 60 },
});
