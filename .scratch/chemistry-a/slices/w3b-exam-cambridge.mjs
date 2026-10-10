// W3b: Cambridge-only exam-format item: one Paper 5 question 2 analysis item (15 marks): first-order hydrolysis of
// 2-chloro-2-methylpropane followed by titration; ln[RCl] against time.
import { concept, P, t, EXAM, checkExam, CAM, linearFit, pctErrorDifference, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P5 = { skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, examStyle: true, paper: "Paper 5" };

concept(A("halogen.sn1-sn2"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge", applies: CAM }, (b) => {
  const ts = [0, 300, 600, 900, 1200, 1500];
  const kTrue = 8.0e-4;
  const f = [1, 1, 1, 1.12, 1, 1];
  const c = ts.map((x, i) => Number((0.1 * Math.exp(-kTrue * x) * f[i]).toPrecision(3)));
  const ln = c.map((x) => Math.log(x));
  const fit = linearFit(ts.map((x, i) => [x, ln[i]]).filter((_, i) => i !== 3));
  const k = -fit.m;
  const tHalf = 0.693 / k;
  b.struct({
    ...P5, d: 5, calculator: true,
    concepts: [A("halogen.sn1-sn2"), A("skills.planning-evaluation")],
    stem: t`A student investigated the hydrolysis of 2-chloro-2-methylpropane in a mixture of water and propanone at 25 °C: $\ce{(CH3)3CCl + H2O -> (CH3)3COH + HCl}$.

At intervals, 10.0 cm³ samples were removed and added to cold propanone to stop the reaction, and the HCl formed was titrated with standard sodium hydroxide. From the titres the student calculated the concentration of 2-chloro-2-methylpropane remaining.

If the reaction is first order, ln[RCl] = ln[RCl]₀ − kt, where k is the rate constant.

| time / s | ${ts.join(" | ")} |
|---|---|---|---|---|---|---|
| [RCl] / mol dm⁻³ | ${c.map((x) => sfStr(x, 3)).join(" | ")} |
| ln([RCl] / mol dm⁻³) | ${ln.map((x, i) => (i === 2 ? "?" : dpStr(x, 3))).join(" | ")} |`,
    parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
      P.num({ label: "(a)", marks: 1, stem: `Calculate ln[RCl] at 600 s, to three decimal places.`, value: ln[2], dp: 3, wrong: [Math.log10(c[2])], explanation: `ln(${sfStr(c[2], 3)}) = ${dpStr(ln[2], 3)}. Using lg instead of ln gives ${dpStr(Math.log10(c[2]), 3)}.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how a graph of ln[RCl] against time tests whether the reaction is first order, and what its gradient represents.", points: ["If first order, ln[RCl] = −kt + ln[RCl]₀ has the form y = mx + c, so the points lie on a straight line", "The gradient equals −k (the intercept is ln[RCl]₀)"], modelAnswer: "For a first-order reaction ln[RCl] = −kt + ln[RCl]₀, which is y = mx + c with y = ln[RCl] and x = t. A straight line therefore confirms first order, and its gradient is −k." }),
      P.manual({ label: "(c)", marks: 2, stem: "Identify the anomalous result and suggest a reason for it.", points: ["The result at 900 s ([RCl] too high; its point lies above the line)", "e.g. the sample was quenched late or too little HCl was titrated / titre read too small / sample volume too small, so less HCl was found"], modelAnswer: "The value at 900 s is anomalous: its point lies above the straight line. A possible cause is that the titre was too small (end point misjudged or burette misread), or that less than 10.0 cm³ of sample was taken, so too little HCl was found and [RCl] was overestimated." }),
      P.num({ label: "(d)", marks: 2, stem: "Using the five non-anomalous points, determine the gradient of the line of ln[RCl] against time, in s⁻¹.", value: fit.m, sf: 2, tol: 0.3e-4, unit: "s⁻¹", explanation: `For example from (0, ${dpStr(ln[0], 3)}) to (1500, ${dpStr(ln[5], 3)}): (${dpStr(ln[5], 3)} − (${dpStr(ln[0], 3)})) ÷ 1500 = ${sciStr(fit.m, 2)} s⁻¹ (least-squares ${sciStr(fit.m, 3)}).` }),
      P.num({ label: "(e)", marks: 1, stem: "Hence give the rate constant k, in s⁻¹.", value: k, sf: 2, tol: 0.3e-4, unit: "s⁻¹", wrong: [fit.m], explanation: `k = −gradient = ${sciStr(k, 2)} s⁻¹ (a positive value).` }),
      P.num({ label: "(f)", marks: 1, stem: "Calculate the half-life, in s, using t½ = 0.693/k.", value: tHalf, sf: 2, tol: 40, unit: "s", wrong: [k / 0.693], explanation: `t½ = 0.693 ÷ ${sciStr(k, 2)} ≈ ${sfStr(tHalf, 2)} s; the data agree: [RCl] halves from 0.100 to about 0.050 between 0 and about 870 s.` }),
      P.num({ label: "(g)", marks: 1, stem: "One titre was 12.40 cm³, each burette reading having an uncertainty of ±0.05 cm³. Calculate the percentage uncertainty in this titre.", value: pctErrorDifference(0.05, 12.4), sf: 2, unit: "%", explanation: `2 × 0.05 ÷ 12.40 × 100 = ${sfStr(pctErrorDifference(0.05, 12.4), 2)}%.` }),
      P.mcq({ label: "(h)", marks: 1, stem: "Which conclusion is supported by the straight-line graph?", options: [
        ["The reaction is first order in 2-chloro-2-methylpropane, consistent with an SN1 mechanism.", "Correct: rate = k[RCl], one species in the slow step."],
        ["The reaction is second order overall, consistent with an SN2 mechanism.", "A second-order reaction would not give a straight ln[RCl] plot."],
        ["The reaction is zero order, because the rate is constant.", "The concentration falls exponentially, not linearly."],
        ["The rate depends on the concentration of water squared.", "Water is in large excess; the data only show first order in RCl."],
      ], answer: "A", explanation: "First order in the tertiary halogenoalkane fits SN1." }),
      P.manual({ label: "(i)", marks: 2, stem: "Explain how the titre of sodium hydroxide is used to find [RCl] remaining in each sample.", points: ["Each mole of RCl hydrolysed forms one mole of HCl, which reacts 1 : 1 with NaOH, so n(HCl) = n(NaOH) = titre × concentration", "[RCl] remaining = [RCl]₀ − [HCl] formed (n(HCl) ÷ sample volume)"], modelAnswer: "The NaOH titre gives the amount of HCl in the sample (1 : 1). One mole of HCl is formed for every mole of 2-chloro-2-methylpropane hydrolysed, so the concentration of HCl equals the concentration of RCl that has reacted; subtracting it from the starting concentration gives [RCl] remaining." }),
      P.manual({ label: "(j)", marks: 2, stem: "Suggest two improvements to the procedure.", points: ["Keep the reaction mixture in a thermostatted water bath at 25 °C (k depends strongly on temperature)", "Quench samples at exactly timed moments (e.g. into ice-cold propanone) / repeat the titrations to concordance / take more samples over a longer time"], modelAnswer: "Keep the reaction flask in a thermostatted water bath so the temperature is constant, and quench each sample into ice-cold propanone at precisely recorded times, repeating each titration to obtain concordant titres." }),
    ]),
    hints: ["ln[RCl] = ln[RCl]₀ − kt is y = mx + c.", "Leave out the anomalous point."],
    explanation: `ln[RCl] at 600 s = ${dpStr(ln[2], 3)}; anomaly at 900 s; gradient ≈ ${sciStr(fit.m, 2)} s⁻¹, k ≈ ${sciStr(k, 2)} s⁻¹; t½ ≈ ${sfStr(tHalf, 2)} s; first order, consistent with SN1.`,
  });
});
