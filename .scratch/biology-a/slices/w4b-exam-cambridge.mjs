// W4b: Cambridge Paper 5 question 2 style (CAM_P5_ANALYSIS): t-test on yields of Bt and conventional cotton.
import { concept, P, t, chk, table, dpStr, sfStr, mean, sd, tTest, tCrit, EXAM, checkExam } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("evolution.t-test"), { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: EXAM.CAM_P5_ANALYSIS.applies }, (b) => {
  const bt = [2.33, 2.05, 2.48, 2.19, 2.36, 2.13, 2.27, 2.42];
  const cv = [2.02, 2.21, 1.88, 2.08, 1.95, 2.24, 2.04, 1.99];
  const r = tTest(bt, cv);
  if (!r.significant) throw new Error("P5 item: expected a significant result");
  const crit = [13, 14, 15].map((v) => tCrit(v));
  chk(r.df, 14);
  const wrongSdN = Math.sqrt(bt.reduce((s, x) => s + (x - r.mean1) ** 2, 0) / bt.length);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, paper: "Cambridge Paper 5",
    concepts: [A("evolution.t-test"), A("skills.descriptive-statistics"), A("genetech.gmo-agriculture")],
    calculator: true,
    stem: `A researcher compared the yield of an insect-resistant (Bt) cotton variety with a conventional variety of similar genetic background. Sixteen plots of equal size on one farm were used: eight were sown with each variety. All plots received the same fertiliser and irrigation, and no insecticide was sprayed. The yield of seed cotton from each plot was recorded, in tonnes per hectare.\n\n${table(["Plot", "1", "2", "3", "4", "5", "6", "7", "8"], [["Bt cotton", ...bt.map((x) => x.toFixed(2))], ["Conventional cotton", ...cv.map((x) => x.toFixed(2))]])}\n\nThe standard deviation is $s = \\sqrt{\\dfrac{\\sum (x - \\bar{x})^2}{n - 1}}$ and $t = \\dfrac{|\\bar{x}_1 - \\bar{x}_2|}{\\sqrt{\\dfrac{s_1^2}{n_1} + \\dfrac{s_2^2}{n_2}}}$.\n\n${table(["Degrees of freedom", "13", "14", "15"], [["Critical value of t at p = 0.05", ...crit.map((c) => c.toFixed(2))]])}`,
    parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why a t-test is a suitable statistical test for these data.",
        points: [
          "The data are continuous (measured) values, probably normally distributed",
          "The test compares the means of two independent samples (two varieties)",
        ],
        modelAnswer: "Yield is continuous, measured data that is likely to be approximately normally distributed, and the aim is to compare the means of two independent samples, the Bt and the conventional plots.",
      }),
      P.manual({
        label: "(b)", marks: 1, stem: "State a null hypothesis for this investigation.",
        points: ["There is no significant difference between the mean yields of Bt and conventional cotton; any difference is due to chance"],
        modelAnswer: "There is no significant difference between the mean yield of Bt cotton and that of conventional cotton; any difference is due to chance.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the mean yield of the Bt cotton plots, in tonnes per hectare, to three significant figures.",
        value: r.mean1, sf: 3, wrong: [Number(sfStr(r.mean2, 3))],
        explanation: `Sum ÷ 8 = ${sfStr(r.mean1, 3)} tonnes per hectare.`,
      }),
      P.num({
        label: "(d)", marks: 2, stem: "Calculate the standard deviation of the Bt cotton yields, to three significant figures.",
        value: r.s1, sf: 3, wrong: [Number(sfStr(wrongSdN, 3))],
        explanation: `Using n − 1 = 7: s = ${sfStr(r.s1, 3)}. Dividing by n (8) gives ${sfStr(wrongSdN, 3)}, which underestimates s for a sample.`,
      }),
      P.num({
        label: "(e)", marks: 2, stem: `The standard deviation of the conventional yields is ${sfStr(r.s2, 3)} and their mean is ${sfStr(r.mean2, 4)}. Calculate t, to three significant figures.`,
        value: r.t, tol: 0.05, wrong: [Number(sfStr(Math.abs(r.mean1 - r.mean2) / Math.sqrt(r.s1 ** 2 + r.s2 ** 2), 3))],
        explanation: t`$t = \dfrac{|${sfStr(r.mean1, 4)} - ${sfStr(r.mean2, 4)}|}{\sqrt{\dfrac{${sfStr(r.s1, 3)}^2}{8} + \dfrac{${sfStr(r.s2, 3)}^2}{8}}} = ${sfStr(r.t, 3)}$. Forgetting to divide each variance by n gives a much smaller value.`,
      }),
      P.num({
        label: "(f)", marks: 1, stem: "State the number of degrees of freedom.",
        value: r.df, wrong: [16, 7],
        explanation: "n₁ + n₂ − 2 = 8 + 8 − 2 = 14.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Use your value of t to reach a conclusion about the null hypothesis.",
        points: [
          `t (${sfStr(r.t, 3)}) is greater than the critical value of ${r.crit.toFixed(2)} at 14 degrees of freedom and p = 0.05`,
          "So the difference is significant (probability of it being due to chance is less than 0.05); reject the null hypothesis: Bt cotton gave a higher mean yield",
        ],
        modelAnswer: `t = ${sfStr(r.t, 3)}, which is greater than the critical value of ${r.crit.toFixed(2)} for 14 degrees of freedom at p = 0.05. The probability that the difference is due to chance is less than 0.05, so the difference is significant and the null hypothesis is rejected: Bt cotton gave a significantly higher mean yield.`,
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Suggest a biological explanation for the difference in yield.",
        points: [
          "Bt cotton makes Bt (Cry) toxin, killing bollworm larvae that feed on it",
          "No insecticide was sprayed, so conventional plots suffered more boll damage, reducing yield",
        ],
        modelAnswer: "The Bt cotton produces a Cry toxin that kills bollworm larvae feeding on it. Because no insecticide was sprayed, the conventional plots suffered more bollworm damage to their bolls, lowering their yield.",
      }),
      P.manual({
        label: "(i)", marks: 2, stem: "Evaluate the method, suggesting two ways in which the confidence in the conclusion could be increased.",
        points: [
          "Plots may differ in soil, water or pest pressure: allocate varieties to plots at random / use a block design; measure bollworm numbers",
          "Only one farm and one season: repeat at several sites and seasons / use more plots",
        ],
        modelAnswer: "The plots may differ in soil, water and pest pressure, so the varieties should be allocated to plots at random, ideally in blocks, and bollworm numbers recorded. The trial used one farm in one season, so it should be repeated at several sites and in several seasons with more plots.",
      }),
    ]),
    explanation: "Choose the t-test, state the null hypothesis, calculate the mean, SD and t, compare with the critical value, explain and evaluate.",
    hints: ["Degrees of freedom for a t-test: n₁ + n₂ − 2.", "Use n − 1 in the standard deviation."],
  });
});
