// W3b exam rows (ZIMSEC): Paper 3 Section C, research techniques, ZIM_P3 x 2: one physical (a stream investigation) and one mitigation and adaptation (flood risk in a Zambezi valley ward).
// All datasets are invented for this exercise (labelled in the stems) and every number is computed in code.
import { concept, P, t, chk, rnd, mean, table, checkExam, EXAM, geographyLevels, spearman, chiSquaredTable, discharge, dpStr } from "../lib.mjs";

const mt = (x, dp) => dpStr(x, dp).replace("−", "-");
const tab = (h, r) => table(h, r);
const BASE = { d: 4, skill: EXAM.ZIM_P3.skill, secs: EXAM.ZIM_P3.secs, examStyle: true, paper: "Paper 3", applies: EXAM.ZIM_P3.applies };

// ---------------------------------------------------------------- P3-A: stream investigation (physical)
const DIST = [1, 3, 5, 8, 11, 15, 20, 26];
const W = [1.8, 2.6, 3.1, 4.4, 5.0, 6.9, 7.4, 9.6];
const DEP = [0.12, 0.15, 0.21, 0.24, 0.31, 0.33, 0.42, 0.45];
const VEL = [0.31, 0.38, 0.36, 0.52, 0.55, 0.5, 0.66, 0.72];
const Q = DIST.map((_, i) => discharge(W[i], DEP[i], VEL[i]));
const q4 = rnd(Q[3], 3, 0.549, "q4");
const qMean = rnd(mean(Q), 2, 1.02, "qMean");
const maxSite = Q.indexOf(Math.max(...Q)) + 1;
chk(maxSite, 8);
const sp = spearman(DIST, VEL);
chk(sp.sumD2, 8);
const rs = rnd(sp.rs, 3, 0.905, "rs");
const SITES = tab(["Site", ...DIST.map((_, i) => i + 1)], [
  ["Distance from source (km)", ...DIST], ["Channel width (m)", ...W.map((w) => w.toFixed(1))], ["Mean depth (m)", ...DEP.map((d) => d.toFixed(2))], ["Mean velocity (m/s)", ...VEL.map((v) => v.toFixed(2))],
]);

// ---------------------------------------------------------------- P3-B: flood risk survey (mitigation and adaptation)
const VIL = [["A", 600], ["B", 300], ["C", 100]];
const totHH = chk(VIL.reduce((s, v) => s + v[1], 0), 1000);
const nB = chk((300 / totHH) * 120, 36, 1e-9);
const MEAS = [["Receives a flood warning by radio or phone", 78], ["Keeps food and seed in raised stores", 42], ["Moves livestock to higher ground before floods", 54], ["Plants some crops on higher ground", 36], ["Uses no measure", 18]];
const pAware = chk((78 / 120) * 100, 65, 1e-9);
const pNone = chk((18 / 120) * 100, 15, 1e-9);
const OBS = [[48, 12], [30, 30]];
const cs = chiSquaredTable(OBS);
const eNearAware = chk(cs.expected[0][0], 39, 1e-9);
const chi2 = rnd(cs.chi2, 2, 11.87, "chi2");
chk(cs.crit, 3.84);
chk(cs.df, 1);

concept("ageo.skills.research-techniques", { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: EXAM.ZIM_P3.applies }, (b) => {
  // ============================================================ P3-A: physical research (stream investigation)
  b.struct({
    ...BASE,
    concepts: ["ageo.skills.research-techniques", "ageo.hydro.hydrographs-morphometry", "ageo.stats.correlation-regression"],
    hints: ["Discharge Q = width × mean depth × mean velocity.", "For Spearman, rank both sets with the smallest value as 1."],
    stem: t`A group of students investigates how a stream in the Eastern Highlands of Zimbabwe changes downstream, in order to understand where floods after heavy rain are likely to be most severe. Their hypothesis is that channel width, depth, velocity and discharge increase with distance from the source. They measured eight sites (data invented for this exercise). Width was measured with a tape, depth at five points across the channel with a ranging pole and the mean taken, and velocity by timing a float over a measured 10 m.\n\n${SITES}\n\nDischarge (Q, in m³/s) = width × mean depth × mean velocity. The students use Spearman's rank correlation coefficient, $r_s = 1 - \dfrac{6\sum d^2}{n^3 - n}$. The critical value of $r_s$ at the 5% significance level for 8 pairs is 0.738.`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Planning and method.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which method gives an estimate of stream velocity when no flow meter is available?", options: [
            ["Timing a floating object over a measured distance", "Correct: velocity = distance ÷ time, and several runs are averaged."],
            ["Measuring the width of the channel with a tape measure", "Width is not velocity."],
            ["Counting the number of pebbles on the bed", "Pebble counts describe the bed material."],
            ["Measuring the angle of the valley sides", "This describes the valley, not the flow."],
          ], answer: "A", explanation: "A float method gives surface velocity, which is then adjusted or averaged." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Why do the students measure depth at five points across the channel and take the mean?", options: [
            ["Depth varies across the channel, so one value is not representative", "Correct: the cross-section is not uniform."],
            ["The depth is always the same at every point across a stream channel", "Depth varies, usually deepest near the centre."],
            ["Five measurements make the stream flow faster", "Measuring does not change the flow."],
            ["The mean depth is not needed to calculate discharge", "Discharge needs the cross-sectional area, which uses the mean depth."],
          ], answer: "A", explanation: "Several measurements give a more reliable mean depth." }),
          P.manual({ label: "(iii)", marks: 2, stem: "State the null hypothesis and the alternative hypothesis for the Spearman test of velocity against distance from the source.",
            points: ["H₀: there is no relationship between distance from the source and mean velocity", "H₁: mean velocity increases with distance from the source"],
            modelAnswer: "H₀: there is no relationship between distance from the source and mean velocity. H₁: mean velocity increases with distance from the source.",
            explanation: "The null hypothesis states no relationship." }),
          P.manual({ label: "(iv)", marks: 2, stem: "Describe two safety precautions that the students should take when working in the stream.",
            points: ["Work in pairs or groups with a leader, never alone, and tell a teacher where they are going", "Check water depth and flow before entering, wear sturdy footwear, avoid fast or deep water and do not work after heavy rain (flash flood risk)"],
            modelAnswer: "Work in groups with a leader and tell a teacher where they will be. Check depth and flow before entering, wear sturdy footwear, avoid fast or deep water and do not work after heavy rain.",
            explanation: "Group work, supervision and checks of the conditions." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Results.",
        parts: [
          P.num({ label: "(i)", marks: 3, type: "CALCULATION", stem: "Calculate the discharge at site 4, in m³/s, to three decimal places.", value: q4, dp: 3, unit: "m³/s", wrong: [0.52, 1.056, 5.49],
            explanation: "Q = 4.4 × 0.24 × 0.52 = 0.549 m³/s. The value 5.49 comes from a slip in the decimal point." }),
          P.num({ label: "(ii)", marks: 2, stem: "The discharges at the eight sites are 0.067, 0.148, 0.234, 0.549, 0.853, 1.139, 2.051 and 3.110 m³/s. Calculate the mean discharge, to two decimal places.", value: qMean, dp: 2, unit: "m³/s", wrong: [8.15, 0.55, 2.05],
            explanation: "The total is 8.151, and 8.151 ÷ 8 = 1.02 m³/s." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "At which site is the discharge greatest?", options: [
            ["Site 8", "Correct: the discharge of 3.110 m³/s is the largest."],
            ["Site 1", "Site 1 has the smallest discharge (0.067 m³/s)."],
            ["Site 4", "Site 4 has 0.549 m³/s."],
            ["Site 5", "Site 5 has 0.853 m³/s."],
          ], answer: "A", explanation: "Discharge increases downstream and is greatest at site 8." }),
          P.manual({ label: "(iv)", marks: 2, stem: "Describe the change in mean velocity downstream.",
            points: ["Velocity increases overall from 0.31 m/s at site 1 to 0.72 m/s at site 8", "There are small exceptions: at site 3 (0.36 m/s) and at site 6 (0.50 m/s) the velocity is lower than at the previous site"],
            modelAnswer: "Velocity increases overall from 0.31 m/s at site 1 to 0.72 m/s at site 8. There are small exceptions at site 3, 0.36 m/s, and site 6, 0.50 m/s, which are lower than the previous site.",
            explanation: "Quote data and note exceptions." }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Statistical analysis of velocity against distance from the source.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Rank both sets of data (smallest = 1) and calculate Σd².", value: sp.sumD2, wrong: [4, 0, 16],
            explanation: t`Ranks of distance 1 to 8. Ranks of velocity: ${sp.rows.map((r) => r.ry).join(", ")}. $d$: ${sp.rows.map((r) => r.d).join(", ")}. $d^2$: ${sp.rows.map((r) => r.d2).join(", ")}; the sum is ${sp.sumD2}.` }),
          P.num({ label: "(ii)", marks: 3, type: "CALCULATION", stem: "Calculate r_s, to three decimal places.", value: rs, dp: 3, wrong: [0.095, 0.916, 1.095],
            explanation: t`$r_s = 1 - 6 \times 8 \div (8^3 - 8) = 1 - 48 \div 504 = ${mt(rs, 3)}$. The value 0.095 is the part 48 ÷ 504, which must be subtracted from 1.` }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which conclusion is correct?", options: [
            ["A significant strong positive relationship; H₀ is rejected", "Correct: 0.905 is greater than the critical value of 0.738."],
            ["There is no significant relationship at all; H₀ is accepted", "r_s is above the critical value."],
            ["There is a significant strong negative relationship", "The sign is positive."],
            ["The relationship is positive but not significant", "It exceeds the critical value, so it is significant."],
          ], answer: "A", explanation: "0.905 > 0.738, so reject H₀." }),
          P.tf({ label: "(iv)", marks: 1, stem: "The result proves that distance from the source causes velocity to increase.", answer: false, explanation: "False. A correlation shows a relationship, not cause. Other factors, such as channel gradient, roughness and discharge, also change downstream." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 4, type: "SHORT_ANSWER",
        stem: "Evaluate the reliability of the investigation and suggest two improvements.",
        points: [
          "Only eight sites on one stream on one day may not represent the stream or other seasons; velocity and discharge change with recent rainfall.",
          "The float method measures surface velocity, which is faster than the mean velocity, and wind and timing errors affect it.",
          "Depth and width were measured by hand with limited accuracy, and the sites were not equally spaced.",
          "Improvements: repeat on several days and use a flow meter at several depths; use more sites at equal intervals and measure more points across the channel.",
        ],
        modelAnswer: "Eight sites on one stream on one day may not be representative, because discharge changes with recent rain. The float method gives surface velocity, which is faster than the mean velocity, and wind and timing errors affect it. Width and depth were measured by hand, and the sites were not equally spaced. Improvements would be to repeat the work on several days with a flow meter at several depths, and to use more sites at equal intervals with more points across the channel.",
        explanation: "Judge sample size, instruments and timing, then improve." }),
    ]),
    explanation: "Plan a stream investigation, calculate discharge, test a relationship with Spearman's coefficient and evaluate the method.",
  });

  // ============================================================ P3-B: mitigation and adaptation (flood risk)
  b.struct({
    ...BASE,
    concepts: ["ageo.skills.research-techniques", "ageo.hazard.weather-climatic", "ageo.stats.hypothesis-testing"],
    hints: ["Stratified sample size = village share of households × 120.", "Expected value = row total × column total ÷ grand total."],
    stem: t`Households in a ward in the Zambezi valley of northern Zimbabwe are flooded in many wet seasons. A research group studies how households prepare for floods and whether those living near the river are better informed. The ward has three villages: A has 600 households, B has 300 and C has 100. The group plans to interview a stratified sample of 120 households (data invented for this exercise).\n\n**Table 1: what 120 sampled households do (more than one answer allowed)**\n\n${tab(["Measure", "Households"], MEAS.map((m) => [m[0], m[1]]))}\n\n**Table 2: awareness of the flood warning, by distance from the river**\n\n${tab(["Households", "Aware of a flood warning", "Not aware"], [["Within 1 km of the river", 48, 12], ["More than 1 km from the river", 30, 30]])}\n\nThe group uses the chi-squared test, $\chi^2 = \sum \dfrac{(O - E)^2}{E}$, with degrees of freedom $= (\text{rows} - 1)(\text{columns} - 1)$. The critical value of $\chi^2$ at the 5% significance level for 1 degree of freedom is 3.84.`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Sampling and method.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the number of households that should be interviewed in village B so that the sample is proportional to the number of households.", value: nB, unit: "people", wrong: [40, 300, 100],
            explanation: "Village B has 300 of 1 000 households = 30%. 30% of 120 = 36 households." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Why did the group choose a stratified sample?", options: [
            ["To make sure each village is represented in proportion to its size", "Correct: stratification avoids over- or under-representing a village."],
            ["Because it needs no list of households", "It needs information on the sizes of the groups."],
            ["Because it always gives a sample of exactly 1 000 households in total", "The sample size is 120."],
            ["Because it removes the need for any questionnaire", "A questionnaire is still used."],
          ], answer: "A", explanation: "Stratified sampling represents each group in proportion." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "What is the main advantage of closed questions in a questionnaire for this survey?", options: [
            ["Answers are easy to count, compare and test statistically", "Correct: fixed responses give data that can be tabulated."],
            ["They give long personal stories about each flood from every person", "Those come from open questions."],
            ["They need no trained interviewers", "Interviewers are still needed."],
            ["They cannot be misunderstood by anyone", "Poorly worded closed questions can still be misunderstood."],
          ], answer: "A", explanation: "Closed questions give quantifiable data." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Results.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage of the sampled households that receive a flood warning by radio or phone.", value: pAware, unit: "%", wrong: [78, 35, 54],
            explanation: "78 ÷ 120 × 100 = 65%." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage of the sampled households that use no measure.", value: pNone, unit: "%", wrong: [18, 85, 1.5],
            explanation: "18 ÷ 120 × 100 = 15%." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which graph is best for showing the number of households using each measure?", options: [
            ["A bar chart with one bar for each measure", "Correct: it compares separate categories."],
            ["A line graph joining the measures in order", "A line suggests a continuous trend between categories."],
            ["A scatter graph of measures against households", "A scatter graph needs two numerical variables."],
            ["A pie chart, because answers add to 120", "Answers add to more than 120 as households could give more than one answer."],
          ], answer: "A", explanation: "Separate categories with multiple responses suit a bar chart." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which measure in Table 1 is an example of adaptation by households?", options: [
            ["Keeping food and seed in raised stores", "Correct: households adjust to the flood risk rather than stop the flood."],
            ["Building an embankment along the river bank", "This is a structural mitigation measure that reduces the hazard."],
            ["Constructing a dam upstream to control the river", "This is a large structural measure to reduce the hazard."],
            ["Straightening the river channel with machinery", "This is an engineering measure to change the hazard."],
          ], answer: "A", explanation: "Adaptation adjusts to the hazard; mitigation reduces it." }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Is awareness of the warning related to distance from the river?",
        parts: [
          P.manual({ label: "(i)", marks: 2, stem: "State the null hypothesis and the alternative hypothesis.",
            points: ["H₀: there is no association between distance from the river and awareness of the flood warning", "H₁: there is an association between distance from the river and awareness of the flood warning"],
            modelAnswer: "H₀: there is no association between distance from the river and awareness of the flood warning. H₁: there is an association between distance from the river and awareness.",
            explanation: "The null hypothesis states no association." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the expected number of households within 1 km of the river that would be aware of the warning if there were no association.", value: eNearAware, unit: "people", wrong: [48, 30, 65],
            explanation: "Row total 60 × column total 78 ÷ 120 = 39." }),
          P.num({ label: "(iii)", marks: 3, type: "CALCULATION", stem: "The expected values are 39 (near, aware), 21 (near, not aware), 39 (far, aware) and 21 (far, not aware). Calculate χ², to two decimal places.", value: chi2, dp: 2, wrong: [5.93, 0.31, 23.74],
            explanation: t`$(48-39)^2/39 + (12-21)^2/21 + (30-39)^2/39 + (30-21)^2/21 = 2.08 + 3.86 + 2.08 + 3.86 = ${mt(chi2, 2)}$ (the terms are 2.077, 3.857, 2.077 and 3.857).` }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which conclusion is correct?", options: [
            ["There is a significant association; households near the river are more aware", "Correct: 11.87 > 3.84, so H₀ is rejected, and the observed values show higher awareness near the river."],
            ["There is no significant association between distance and awareness of the warning", "χ² is larger than the critical value."],
            ["Households far from the river are significantly more aware", "In the table the households near the river are more aware."],
            ["The test proves that the radio network causes the awareness", "The test shows association only."],
          ], answer: "A", explanation: "Reject H₀: 80% near the river are aware (48 of 60), compared with 50% far from it (30 of 60)." }),
        ],
      }),
      P.manual({
        label: "(d)", marks: 4, type: "SHORT_ANSWER",
        stem: "Plan a flood response for the households more than 1 km from the river, who are less aware of the warning.",
        points: [
          "Extend the warning system: use community volunteers, village leaders and church or school bells or whistles, as well as radio and mobile phones, to pass on warnings.",
          "Run community meetings and school drills so that people know the warning signs, evacuation routes and meeting points.",
          "Identify safe high ground or raised shelters and keep evacuation paths clear, with transport for older people and the sick.",
          "Support household adaptation: raised stores for food and seed, early planting on higher ground and moving livestock early, with extension officers and the Civil Protection Department.",
        ],
        modelAnswer: "Extend the warning system by using community volunteers, village leaders and school bells as well as radio and mobile phones. Run community meetings and school drills so that people know the warning signs, evacuation routes and meeting points. Identify safe high ground or raised shelters and keep paths clear, with transport for older and sick people. Support household adaptation such as raised stores, planting on higher ground and moving livestock early, with extension officers and the Civil Protection Department.",
        explanation: "Plan warnings, education, shelter and household adaptation." }),
      P.manual({
        label: "(e)", marks: 3, type: "SHORT_ANSWER",
        stem: "Evaluate the survey design and the reliability of the conclusion.",
        points: [
          "The sample of 120 households is small, and stratifying by village helps, but the villages' circumstances could differ (distance and flood history).",
          "Answers rely on what households say, which can be biased, and the survey took place at one time, so it may not show how people act during a flood.",
          "The test shows an association only; other factors such as age, education and phone ownership may explain awareness, so interviews with local leaders and repeat surveys would improve reliability.",
        ],
        modelAnswer: "The sample of 120 is small, and stratifying by village helps, but villages may differ. Answers depend on what households say, which can be biased, and the survey was done once, so it may not show what they do during a flood. The test shows only an association, and other factors such as age, education and phone ownership may explain awareness, so interviews with leaders and repeat surveys would improve reliability.",
        explanation: "Sample, bias and cause." }),
    ]),
    explanation: "Design a sample, present survey results, test an association with chi-squared and plan a flood response.",
  });
});
