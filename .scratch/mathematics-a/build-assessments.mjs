// Builds the mathematics-a topic tests and mock exams: ZIMSEC A-Level Pure Mathematics, Statistics and Mechanics
// (2015-2022) and Cambridge AS & A Level Mathematics 9709 (2026-2027). Paper plan: .scratch/mathematics-a/BRIEF.md.
// Inputs: npx tsx --conditions=react-server .scratch/tools/inventory.ts mathematics-a .scratch/mathematics-a/inventory.json
// Run: node .scratch/mathematics-a/build-assessments.mjs [--report] [--write]
import { setup, autoTopicTests, topicTest, examSpread, mock, finish, SELF_MARK } from "../tools/assess-lib.mjs";

const S = setup(
  "mathematics-a",
  {
    zp: "zimsec/a-level/pure-mathematics/2015-2022",
    zs: "zimsec/a-level/statistics/2015-2022",
    zm: "zimsec/a-level/mechanics/2015-2022",
    cam: "cambridge/a-level/mathematics/2026-2027",
  },
  ".scratch/mathematics-a/inventory.json",
);
const RES = [6, 7, 8, 9, 10, 11, 16, 20];
const tops = (s) => s.file.topics.map((t) => t.key);
const kids = (k) => S.cam.file.topics.find((t) => t.key === k).children.map((c) => c.key);
const P1 = kids("pure-1"), P23 = kids("pure-2-3"), MECH = kids("mechanics"), ST1 = kids("statistics-1"), ST2 = kids("statistics-2");
const CAM = "Cambridge International AS & A Level Mathematics 9709";
const confirm = "Check the instructions on your own examination papers.";
const conv = "The marks per question are our convention; real papers vary question by question.";
const sx = (s, marks, n, topics) => examSpread(s, { type: "STRUCTURED", marks, n, topics, full: true });
const instr = (body) => `${body}\n\n- Show all your working. Give non-exact answers to 3 significant figures (angles in degrees to 1 decimal place) unless a question says otherwise.\n- ${SELF_MARK}\n\n${conv} ${confirm}`;

const camPaper = (n, title, minutes, marks, rules, extra = "") =>
  mock(S.cam, {
    key: `mock.9709.paper-${n}`,
    title: `Mock exam in the style of ${CAM} Paper ${n}`,
    description: `A practice paper modelled on ${CAM} Paper ${n} (${title}): ${marks} marks, ${minutes} minutes.`,
    instructions: instr(`Answer **all** the questions. You have ${minutes} minutes.${extra}`),
    minutes,
    sections: [{ title: `Paper ${n}: ${title}`, component: String(n), instructions: "Answer all the questions.", rules }],
  });

const camMocks = [
  camPaper(1, "Pure Mathematics 1", 110, 75, [...sx(S.cam, 6, 5, P1), ...sx(S.cam, 9, 5, P1)]),
  camPaper(2, "Pure Mathematics 2", 75, 50, [...sx(S.cam, 7, 4, [...P1, ...P23]), ...sx(S.cam, 11, 2, [...P1, ...P23])]),
  camPaper(3, "Pure Mathematics 3", 110, 75, [...sx(S.cam, 6, 5, P23), ...sx(S.cam, 9, 5, P23)]),
  camPaper(4, "Mechanics", 75, 50, [...sx(S.cam, 6, 3, MECH), ...sx(S.cam, 8, 4, MECH)], " Take g = 10 m s⁻²."),
  camPaper(5, "Probability & Statistics 1", 75, 50, [...sx(S.cam, 6, 3, ST1), ...sx(S.cam, 8, 4, ST1)]),
  camPaper(6, "Probability & Statistics 2", 75, 50, [...sx(S.cam, 6, 3, ST2), ...sx(S.cam, 8, 4, ST2)]),
];

/** ZIMSEC Pure / Statistics: P1 12 × 10 compulsory; P2 Section A 5 × 8 compulsory + Section B 5 of 7 × 16. */
const zimPair = (s, keyPart, name, assumed) => {
  const T = tops(s);
  const note = assumed ? " The paper structure is not printed in the syllabus: this mock assumes the Statistics pattern." : "";
  return [
    mock(s, {
      key: `mock.zimsec.${keyPart}.paper-1`, title: `Mock exam in the style of ZIMSEC A-Level ${name} Paper 1`, minutes: 180,
      description: `A practice paper modelled on ZIMSEC A-Level ${name} Paper 1: twelve compulsory 10-mark questions, 120 marks, 3 hours.${note}`,
      instructions: instr(`Answer **all** the questions. You have 3 hours.${note}`),
      sections: [{ title: "Paper 1", component: "1", instructions: "Answer all the questions.", rules: sx(s, 10, 12, T) }],
    }),
    mock(s, {
      key: `mock.zimsec.${keyPart}.paper-2`, title: `Mock exam in the style of ZIMSEC A-Level ${name} Paper 2`, minutes: 180,
      description: `A practice paper modelled on ZIMSEC A-Level ${name} Paper 2: five compulsory 8-mark questions and five 16-mark questions chosen from seven, 120 marks, 3 hours.${note}`,
      instructions: instr(`Answer **all** of Section A and **any five** questions in Section B. You have 3 hours. If you answer more than five in Section B, your best five count.${note}`),
      sections: [
        { title: "Section A (40 marks)", component: "2", instructions: "Answer all the questions.", rules: sx(s, 8, 5, T) },
        { title: "Section B (80 marks)", component: "2", instructions: "Answer any five questions.", answerCount: 5, marks: 80, rules: sx(s, 16, 7, T) },
      ],
    }),
  ];
};

const ZMT = tops(S.zm);
const zmMocks = [
  mock(S.zm, {
    key: "mock.zimsec.mechanics.paper-1", title: "Mock exam in the style of ZIMSEC A-Level Mechanics Paper 1", minutes: 180,
    description: "A practice paper modelled on ZIMSEC A-Level Mechanics (Mechanical Mathematics) Paper 1: fifteen compulsory short structured questions, 100 marks, 3 hours.",
    instructions: instr("Answer **all** the questions. You have 3 hours. Take g = 9.8 m s⁻² unless a question says otherwise."),
    sections: [{ title: "Paper 1", component: "1", instructions: "Answer all the questions.", rules: [...sx(S.zm, 7, 10, ZMT), ...sx(S.zm, 6, 5, ZMT)] }],
  }),
  mock(S.zm, {
    key: "mock.zimsec.mechanics.paper-2", title: "Mock exam in the style of ZIMSEC A-Level Mechanics Paper 2", minutes: 180,
    description: "A practice paper modelled on ZIMSEC A-Level Mechanics (Mechanical Mathematics) Paper 2: five 20-mark questions chosen from eight, 100 marks, 3 hours.",
    instructions: instr("Answer **any five** questions. You have 3 hours. Take g = 9.8 m s⁻² unless a question says otherwise. If you answer more than five, your best five count."),
    sections: [{ title: "Paper 2", component: "2", instructions: "Answer any five questions.", answerCount: 5, marks: 100, rules: sx(S.zm, 20, 8, ZMT) }],
  }),
];

// Topics too small for a 20-mark test on their own are merged.
const MERGE = {
  "zp": [],
  "zs": [
    {
      "key": "continuous-linear",
      "title": "Continuous random variables and linear combinations",
      "about": "continuous random variables and linear combinations",
      "units": [
        "continuous",
        "linear-combinations"
      ]
    },
    {
      "key": "data-bivariate-time-series",
      "title": "Data, bivariate data and time series",
      "about": "representing data, bivariate data and time series",
      "units": [
        "data",
        "bivariate",
        "time-series"
      ]
    }
  ],
  "zm": [
    {
      "key": "forces-newton",
      "title": "Forces, equilibrium and Newton's laws",
      "about": "forces, equilibrium and newton's laws",
      "units": [
        "forces",
        "newton"
      ]
    },
    {
      "key": "kinematics-projectiles-circular",
      "title": "Kinematics, projectiles and circular motion",
      "about": "kinematics, projectiles and circular motion",
      "units": [
        "kinematics",
        "projectiles",
        "circular-motion"
      ]
    },
    {
      "key": "momentum-energy",
      "title": "Momentum, elasticity, work and energy",
      "about": "momentum, elasticity, work and energy",
      "units": [
        "momentum",
        "elasticity",
        "energy"
      ]
    },
    {
      "key": "centre-variable-shm",
      "title": "Centre of mass, variable forces and simple harmonic motion",
      "about": "centre of mass, variable forces and simple harmonic motion",
      "units": [
        "centre-of-mass",
        "variable-force",
        "shm"
      ]
    }
  ],
  "cam": [
    {
      "key": "p1-quadratics-functions",
      "title": "Quadratics and functions",
      "about": "quadratics and functions",
      "units": [
        "pure-1.quadratics",
        "pure-1.functions"
      ]
    },
    {
      "key": "p1-coordinate-circular-trig",
      "title": "Coordinate geometry, circular measure and trigonometry",
      "about": "coordinate geometry, circular measure and trigonometry",
      "units": [
        "pure-1.coordinate",
        "pure-1.circular",
        "pure-1.trigonometry"
      ]
    },
    {
      "key": "p3-numerical-de",
      "title": "Numerical solution of equations and differential equations",
      "about": "numerical solution of equations and differential equations",
      "units": [
        "pure-2-3.numerical",
        "pure-2-3.differential-equations"
      ]
    },
    {
      "key": "m-forces-newton",
      "title": "Forces, equilibrium and Newton's laws",
      "about": "forces, equilibrium and newton's laws",
      "units": [
        "mechanics.forces",
        "mechanics.newton"
      ]
    },
    {
      "key": "m-momentum-energy",
      "title": "Momentum, work and energy",
      "about": "momentum, work and energy",
      "units": [
        "mechanics.momentum",
        "mechanics.energy"
      ]
    },
    {
      "key": "s2-poisson-linear",
      "title": "The Poisson distribution and linear combinations",
      "about": "the poisson distribution and linear combinations",
      "units": [
        "statistics-2.poisson",
        "statistics-2.linear-combinations"
      ]
    },
    {
      "key": "s2-continuous-sampling",
      "title": "Continuous random variables and sampling",
      "about": "continuous random variables and sampling",
      "units": [
        "statistics-2.continuous",
        "statistics-2.sampling"
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
    zp: { tests: tests(S.zp, "zimsec-pure", MERGE.zp), mocks: zimPair(S.zp, "pure", "Pure Mathematics", true), file: "zimsec-pure" },
    zs: { tests: tests(S.zs, "zimsec-statistics", MERGE.zs), mocks: zimPair(S.zs, "statistics", "Statistics", false), file: "zimsec-statistics" },
    zm: { tests: tests(S.zm, "zimsec-mechanics", MERGE.zm), mocks: zmMocks, file: "zimsec-mechanics" },
    cam: { tests: tests(S.cam, "9709", MERGE.cam), mocks: camMocks, file: "cambridge" },
  },
  {
    expectedMarks: {
      "mock.9709.paper-1": 75, "mock.9709.paper-2": 50, "mock.9709.paper-3": 75, "mock.9709.paper-4": 50, "mock.9709.paper-5": 50, "mock.9709.paper-6": 50,
      "mock.zimsec.pure.paper-1": 120, "mock.zimsec.pure.paper-2": 120, "mock.zimsec.statistics.paper-1": 120, "mock.zimsec.statistics.paper-2": 120,
      "mock.zimsec.mechanics.paper-1": 100, "mock.zimsec.mechanics.paper-2": 100,
    },
  },
);
