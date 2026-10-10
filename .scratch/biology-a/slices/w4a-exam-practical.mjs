// W4a: PLANNING (ZIMSEC Paper 4 planning / Cambridge Paper 5 question 1 style), both boards: comparing the lengths of
// leaves growing in sun and in shade.
import { concept, P, t, chk, sfStr, EXAM, checkExam, pctChange } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("skills.planning-evaluation"), { file: "exam/w4a-practical", keyPrefix: "exam.w4a-practical" }, (b) => {
  const sun = 54, shade = 71;
  const pc = pctChange(sun, shade);
  chk(Math.round(pc), 31);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "ZIMSEC P4 / Cambridge P5",
    concepts: [A("skills.planning-evaluation"), A("evolution.variation")],
    stem: "Nyasha notices that the leaves on the shaded south side of a large avocado tree in her school grounds near Mutare seem longer than those on the sunny side. She wants to investigate the hypothesis: *leaves that develop in shade grow longer than leaves that develop in full sun*. She has access to the tree, other avocado trees of the same variety in the grounds, a 30 cm ruler marked in millimetres, string, labels, a light meter and a random number table.",
    parts: checkExam(EXAM.PLANNING, [
      P.manual({
        label: "(a)", marks: 1, stem: "Suggest a biological reason for the hypothesis.",
        points: ["In shade, a larger leaf (lamina) area captures more of the limited light for photosynthesis / shade leaves expand more to compensate for low light intensity"],
        modelAnswer: "In shade, light is limiting, so leaves that grow larger capture more light for photosynthesis.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Identify the independent and dependent variables and state how each would be measured.",
        points: ["Independent: light exposure (sun or shade), confirmed by measuring light intensity at each leaf with a light meter", "Dependent: leaf length, measured from the base of the lamina to the tip (excluding the petiole) with a ruler to the nearest mm"],
        modelAnswer: "The independent variable is whether the leaf grows in sun or shade, checked by measuring the light intensity beside each leaf with a light meter. The dependent variable is leaf length, measured with a ruler from the base of the lamina to the tip, excluding the stalk, to the nearest millimetre.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe how Nyasha should choose the leaves to measure, so that her samples are fair and unbiased.",
        points: [
          "Select leaves at random: e.g. number the branches on each side and use random numbers to choose them",
          "Take a large sample: at least 20 (or 30) leaves from each side",
          "Use fully expanded, mature leaves of similar age, e.g. the fourth leaf back from the tip of each branch, at similar height",
        ],
        modelAnswer: "She should number the branches on the sunny and shaded sides and use random numbers to choose them, so she does not pick unusually large or small leaves. On each chosen branch she should measure the same leaf, for example the fourth fully expanded leaf back from the tip, so that all leaves are of similar age, and choose branches at similar height. She should measure at least 30 leaves from each side.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State two variables that should be standardised and how, and explain why using one tree is an advantage.",
        points: ["Same variety / same tree so genotype is the same: differences are environmental", "Leaves of the same age / position on branch / same height and same time of year"],
        modelAnswer: "Using one tree means all leaves have the same genotype, so differences are due to the environment. Leaves of the same age and position on the branch, at similar heights, should be compared, and all measured at the same time of year.",
      }),
      P.num({
        label: "(e)", marks: 1, stem: `In a trial, the mean length of sun leaves was ${sun} mm and of shade leaves ${shade} mm. Calculate the percentage by which shade leaves are longer than sun leaves, to three significant figures.`,
        value: pc, sf: 3, unit: "%", wrong: [sfStr(((shade - sun) / shade) * 100, 3)],
        explanation: t`$\dfrac{${shade} - ${sun}}{${sun}} \times 100 = ${sfStr(pc, 3)}\%$.`,
      }),
      P.manual({
        label: "(f)", marks: 1, stem: "Describe one hazard and how to reduce the risk.",
        points: ["Climbing or reaching high branches: measure only leaves within reach from the ground / use a stable step; or sap or insects (e.g. stinging caterpillars) on leaves: wear gloves; risk low"],
        modelAnswer: "Reaching for high branches could cause a fall, so only leaves that can be reached safely from the ground are used; gloves protect against stinging caterpillars. The overall risk is low.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Explain how Nyasha should process and present her results to decide whether they support the hypothesis.",
        points: [
          "Calculate the mean (and standard deviation or range) of leaf length for each side",
          "Present as a table and a bar chart of means with error bars (e.g. ± 2SE / 95% CI, or range) / a histogram for each side",
          "Compare the means: if shade mean is greater and error bars do not overlap (or a t-test is significant at p = 0.05), the hypothesis is supported",
        ],
        modelAnswer: "She should calculate the mean leaf length, with the standard deviation (or range), for each side of the tree and present them in a table and as a bar chart with error bars, or as two histograms. If the shade mean is clearly greater and the error bars (95% confidence intervals) do not overlap, or a t-test shows the difference is significant at p = 0.05, the results support the hypothesis.",
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Explain why results from one tree may not justify a general conclusion, and how she could improve confidence.",
        points: ["One tree is one genotype / one site, so the result may not apply to other trees or species", "Repeat on several trees of the same variety (and other species) / measure light intensity to show a gradient"],
        modelAnswer: "One tree has only one genotype and grows in one position, so the result may not apply to other avocado trees or species. She should repeat the investigation on several trees, measuring the light intensity for every leaf, before drawing a general conclusion.",
      }),
    ]),
    explanation: "Plan a fair comparison of two samples: random choice of leaves of the same age, enough replicates, standardised variables, risk assessment and a clear method of analysis.",
    hints: ["How will you avoid choosing leaves that 'look' long?", "What makes the two samples comparable apart from light?"],
  });
});
