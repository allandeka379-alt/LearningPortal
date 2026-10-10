// W3b: Cambridge Paper 5 question 2 style (CAM_P5_ANALYSIS): chi-squared analysis of a dihybrid test cross (linkage).
import { concept, P, t, chk, table, dpStr, sfStr, EXAM, checkExam, CAM, chiSquared, expectedFromRatio } from "../lib.mjs";

const A = (k) => `abio.${k}`;

concept(A("inheritance.chi-squared"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  const cls = ["Normal leaves, green stem", "Normal leaves, purple stem", "Cut leaves, green stem", "Cut leaves, purple stem"];
  const obs = [118, 37, 40, 125];
  const tot = obs.reduce((s, x) => s + x, 0);
  chk(tot, 320);
  const exp = expectedFromRatio(tot, [1, 1, 1, 1]);
  const r = chiSquared(obs, exp);
  if (!r.significant) throw new Error("P5 item: expected a significant result");
  const rec = ((obs[1] + obs[2]) / tot) * 100;
  b.struct({
    d: 5, examStyle: true, skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, paper: "Cambridge Paper 5",
    concepts: [A("inheritance.chi-squared"), A("inheritance.dihybrid"), A("inheritance.linkage-epistasis")],
    stem: `In tomato plants, normal leaf shape (C) is dominant to cut leaf shape (c), and green stem (G) is dominant to purple stem (g). A student crossed pure-breeding plants with normal leaves and purple stems with pure-breeding plants with cut leaves and green stems. The F1 plants were then test-crossed with plants that had cut leaves and purple stems. Seeds from the test cross were germinated in a greenhouse and the seedlings scored after three weeks.\n\n${table(["Phenotype", "Number of seedlings"], cls.map((c, i) => [c, String(obs[i])]))}\n\nThe chi-squared formula is $\\chi^2 = \\sum \\dfrac{(O - E)^2}{E}$.\n\n${table(["Degrees of freedom", "1", "2", "3", "4"], [["Critical value at p = 0.05", "3.84", "5.99", "7.81", "9.49"]])}`,
    parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why the chi-squared test is an appropriate statistical test for these data.",
        points: [
          "The data are counts / frequencies of individuals in discrete categories (not measurements)",
          "There is an expected ratio (1 : 1 : 1 : 1) from a hypothesis, to compare observed numbers with",
        ],
        modelAnswer: "The data are numbers of seedlings in separate phenotype categories, not measurements, and the genetic hypothesis predicts expected numbers (a 1 : 1 : 1 : 1 ratio) with which the observed numbers can be compared.",
      }),
      P.manual({
        label: "(b)", marks: 1, stem: "State the null hypothesis.",
        points: ["There is no significant difference between the observed numbers and those expected from a 1 : 1 : 1 : 1 ratio (genes assort independently); any difference is due to chance"],
        modelAnswer: "There is no significant difference between the observed numbers and those expected from a 1 : 1 : 1 : 1 ratio; any difference is due to chance.",
      }),
      P.num({
        label: "(c)", marks: 1, stem: "Calculate the expected number of seedlings in each class.",
        value: exp[0], wrong: [tot / 16],
        explanation: `${tot} ÷ 4 = ${exp[0]}.`,
      }),
      P.num({
        label: "(d)", marks: 3, stem: "Calculate χ². Give your answer to three significant figures.",
        value: r.chi2, sf: 3, wrong: [Number(sfStr(r.rows.reduce((s, x) => s + x.diff2 / x.o, 0), 3))],
        explanation: t`Terms: ${r.rows.map((x) => t`$\dfrac{(${x.o} - ${x.e})^2}{${x.e}} = ${dpStr(x.term, 3)}$`).join("; ")}. Sum $= ${sfStr(r.chi2, 3)}$.`,
      }),
      P.num({
        label: "(e)", marks: 1, stem: "State the number of degrees of freedom.",
        value: r.df, wrong: [4],
        explanation: "4 classes − 1 = 3.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Use your value of χ² to reach a conclusion about the null hypothesis.",
        points: [
          `χ² (${sfStr(r.chi2, 3)}) is (much) greater than the critical value of ${r.crit} at 3 degrees of freedom`,
          "So the difference is significant / not due to chance (p < 0.05); reject the null hypothesis",
        ],
        modelAnswer: `χ² = ${sfStr(r.chi2, 3)}, far greater than the critical value of ${r.crit} for 3 degrees of freedom at p = 0.05. The probability that the difference is due to chance is less than 0.05, so the difference is significant and the null hypothesis is rejected.`,
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Explain the pattern in the results.",
        points: [
          "The genes for leaf shape and stem colour are linked / on the same chromosome",
          "F1 inherited Cg on one chromosome and cG on the other, so the large classes are the parental combinations normal purple (118) and cut green (125)",
          `The small classes, normal green (37) and cut purple (40), are recombinants from crossing over between the loci in prophase I (${rec.toFixed(1)}% recombinants)`,
        ],
        modelAnswer: `The two genes are probably linked on the same chromosome. The F1 plants received C with g from one parent and c with G from the other, so the parental combinations, normal leaves with purple stem (118) and cut leaves with green stem (125), are the two large classes. The small classes, normal green (37) and cut purple (40), are recombinants produced when crossing over occurred between the two loci in prophase I; recombinants make up ${rec.toFixed(1)}% of the offspring.`,
      }),
      P.manual({
        label: "(h)", marks: 2, stem: "Evaluate the method, suggesting two ways in which the reliability of the data could be improved or checked.",
        points: [
          "Some seeds may not germinate or seedlings may die, and survival could differ between phenotypes: record the number of seeds sown and germination for each cross",
          "Repeat the test cross with other F1 plants / use larger samples / score phenotypes blind or at a later stage when they are clearer",
        ],
        modelAnswer: "Not every seed may germinate, and if seedlings of one phenotype survive less well the ratio could be distorted, so the numbers of seeds sown and germinated should be recorded. The cross should be repeated with other F1 plants and larger samples, and phenotypes scored at a stage when leaf shape and stem colour are clear, ideally by someone who does not know the expected result.",
      }),
    ]),
    explanation: "Choose χ², state the null hypothesis, calculate and compare with the critical value, then explain the significant result by linkage and evaluate the method.",
    hints: ["Expected numbers come from a 1 : 1 : 1 : 1 ratio.", "Which classes are much larger than expected?"],
    calculator: true,
  });
});
