// W4b: Cambridge-only exam-format items: two Paper 5 question 2 analysis items (15 marks): (1) a GLC calibration with
// an internal standard (y = mx + c, interpolation); (2) ln k against 1/T with the equation given (gradient, activation
// energy, percentage difference and evaluation).
import { concept, P, t, EXAM, checkExam, CAM, R, linearFit, pctError, pctDifference, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P5 = { skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, examStyle: true, paper: "Paper 5" };

concept(A("skills.planning-evaluation"), { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- CA1: GLC calibration for ethanol with an internal standard
  {
    const x = [1, 2, 3, 4, 5];
    const is = [50.2, 49.6, 50.4, 49.8, 50.0];
    const f = [1.0, 1.0, 1.0, 1.09, 1.0];
    const eth = x.map((v, i) => Number(((0.42 * v + 0.01) * is[i] * f[i]).toFixed(1)));
    const ratio = eth.map((e, i) => e / is[i]);
    const fit = linearFit(x.map((v, i) => [v, ratio[i]]).filter((_, i) => i !== 3));
    const unknownRatio = 1.31;
    const conc = (unknownRatio - fit.c) / fit.m;
    b.struct({
      ...P5, d: 5, calculator: true,
      concepts: [A("skills.planning-evaluation"), A("analysis.chromatography-glc")],
      stem: `A student used gas-liquid chromatography to find the ethanol content of a home-brewed sorghum beer. To each standard ethanol solution, and to the beer, the same volume of propan-1-ol was added as an internal standard. For each run the peak areas of ethanol and of propan-1-ol were recorded.\n\n| ethanol / % by volume | ${x.map((v) => v.toFixed(1)).join(" | ")} |\n|---|---|---|---|---|---|\n| area of ethanol peak | ${eth.map((e) => e.toFixed(1)).join(" | ")} |\n| area of propan-1-ol peak | ${is.map((e) => e.toFixed(1)).join(" | ")} |\n| ratio = ethanol area ÷ propan-1-ol area | ${ratio.map((r, i) => (i === 1 ? "?" : r.toFixed(3))).join(" | ")} |\n\nA graph of the ratio (y) against ethanol % (x) is expected to be a straight line, y = mx + c. The beer sample gave a ratio of ${unknownRatio.toFixed(2)}.`,
      parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the missing ratio for 2.0% ethanol, to three decimal places.", value: ratio[1], dp: 3, wrong: [is[1] / eth[1]], explanation: `${eth[1].toFixed(1)} ÷ ${is[1].toFixed(1)} = ${dpStr(ratio[1], 3)}.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why the ratio to an internal standard is plotted, rather than the ethanol peak area alone.", points: ["The volume injected (and detector response) varies slightly from run to run, changing all peak areas", "Both peaks are affected equally, so the ratio cancels these variations and is reproducible"], modelAnswer: "Small differences in the volume injected or in the detector sensitivity change the size of every peak in a run. Because the ethanol and propan-1-ol peaks are affected in the same proportion, their ratio cancels these variations and depends only on the ethanol concentration." }),
        P.short({ label: "(c)", marks: 1, stem: "Identify the anomalous result (give the ethanol %).", accepted: ["4.0", "4", "4.0%", "4%"], normalise: ["trim", "collapse_whitespace"], wrong: ["5.0"], explanation: `At 4.0% the ratio (${ratio[3].toFixed(3)}) lies well above the line through the other points (expected about ${dpStr(fit.m * 4 + fit.c, 2)}).` }),
        P.manual({ label: "(d)", marks: 1, stem: "Suggest a cause of the anomalous result.", points: ["e.g. too much ethanol added when making that standard / too little internal standard added / some propan-1-ol evaporated / peak area misintegrated"], modelAnswer: "The 4.0% standard may have been made up with too much ethanol, or too little propan-1-ol added to it, giving a ratio that is too high." }),
        P.num({ label: "(e)", marks: 2, stem: "Using the other four points, determine the gradient, m, of the line.", value: fit.m, sf: 2, tol: 0.01, explanation: `Best-fit gradient = ${sfStr(fit.m, 3)} (for example (${ratio[4].toFixed(3)} − ${ratio[0].toFixed(3)}) ÷ (5.0 − 1.0) = ${dpStr((ratio[4] - ratio[0]) / 4, 3)}).` }),
        P.num({ label: "(f)", marks: 1, stem: "Determine the intercept, c, of the line.", value: fit.c, tol: 0.02, explanation: `c ≈ ${dpStr(fit.c, 3)}; the line passes very close to the origin, as expected when no ethanol gives no ethanol peak.` }),
        P.num({ label: "(g)", marks: 2, stem: `Use your line to find the ethanol content of the beer, in % by volume, to two significant figures.`, value: conc, sf: 2, tol: 0.06, unit: "%", wrong: [unknownRatio / ratio[0]], explanation: `x = (y − c) ÷ m = (${unknownRatio.toFixed(2)} − ${dpStr(fit.c, 3)}) ÷ ${sfStr(fit.m, 3)} = ${sfStr(conc, 2)}%.` }),
        P.num({ label: "(h)", marks: 1, stem: "The 10.0 cm³ pipette used for the internal standard has an uncertainty of ±0.04 cm³. Calculate the percentage uncertainty.", value: pctError(0.04, 10.0), sf: 1, unit: "%", explanation: `0.04 ÷ 10.0 × 100 = ${sfStr(pctError(0.04, 10.0), 1)}%.` }),
        P.mcq({ label: "(i)", marks: 1, stem: "Why is it better to use a calibration line than to compare the beer with a single standard?", options: [
          ["Several standards show up a faulty point and reduce random error.", "Correct: a line through several points is more reliable and checks linearity."],
          ["It removes the need to add an internal standard to every sample.", "The internal standard is still needed for the ratios."],
          ["It makes the retention times of all the peaks longer and clearer.", "The calibration does not affect retention times."],
          ["It allows ethanol to be identified without GLC.", "GLC is still needed to measure the areas."],
        ], answer: "A", explanation: "Several standards check linearity, reveal anomalies and reduce random error." }),
        P.manual({ label: "(j)", marks: 2, stem: "Suggest two improvements to the procedure.", points: ["Repeat each standard (and the sample) injection and use mean ratios", "Use standards that bracket the sample closely (more points between 2% and 4%) / check retention time of ethanol with a pure sample / dilute beer so it lies in the range"], modelAnswer: "Inject each standard and the beer at least twice and use mean ratios, and prepare extra standards close to the beer's value (between 2% and 4%) so that the line is best defined where it is used." }),
        P.manual({ label: "(k)", marks: 1, stem: "State how the student could confirm that the peak used for the beer really is ethanol.", points: ["Compare its retention time with that of pure ethanol under the same conditions (or add ethanol and see the same peak grow / use GC-MS)"], modelAnswer: "Run pure ethanol under the same conditions and check that it has the same retention time (or spike the beer with ethanol and see the same peak increase)." }),
      ]),
      hints: ["Ratio = ethanol area ÷ internal-standard area.", "x = (y − c) ÷ m."],
      explanation: `Ratio at 2.0% = ${dpStr(ratio[1], 3)}; anomaly at 4.0%; m ≈ ${sfStr(fit.m, 3)}, c ≈ ${dpStr(fit.c, 3)}; beer ≈ ${sfStr(conc, 2)}% ethanol.`,
    });
  }

  // ---------------------------------------------------------------- CA2: ln k against 1/T, activation energy
  {
    const T = [293, 303, 313, 323, 333];
    const Ea = 52000;
    const lnA = Math.log(4.0e6);
    const g = [1, 1, 0.82, 1, 1];
    const k = T.map((tK, i) => Number((Math.exp(lnA - Ea / (R * tK)) * g[i]).toPrecision(3)));
    const pts = T.map((tK, i) => [1 / tK, Math.log(k[i])]);
    const fit = linearFit(pts.filter((_, i) => i !== 2));
    const EaFound = (-fit.m * R) / 1000;
    const diff = pctDifference(EaFound, 55);
    b.struct({
      ...P5, d: 5, calculator: true,
      concepts: [A("skills.planning-evaluation"), A("kinetics.rate-equations")],
      stem: `A student measured the rate constant, k, of a reaction between two ions in solution at five temperatures. The rate constant is related to temperature by the equation ln k = −Eₐ/(RT) + ln A, where Eₐ is the activation energy in J mol⁻¹, R = 8.31 J K⁻¹ mol⁻¹ and A is a constant.\n\n| T / K | ${T.join(" | ")} |\n|---|---|---|---|---|---|\n| k / dm³ mol⁻¹ s⁻¹ | ${k.map((v) => sciStr(v, 3)).join(" | ")} |\n| (1/T) / 10⁻³ K⁻¹ | ${pts.map(([a], i) => (i === 0 ? "?" : (a * 1000).toFixed(4))).join(" | ")} |\n| ln k | ${pts.map(([, bb], i) => (i === 4 ? "?" : dpStr(bb, 3))).join(" | ")} |`,
      parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate 1/T at 293 K, in units of 10⁻³ K⁻¹, to four decimal places (for example 3.3003).", value: (1 / 293) * 1000, dp: 4, wrong: [293 / 1000], explanation: `1/293 = ${(1 / 293).toExponential(4)} K⁻¹ = ${((1 / 293) * 1000).toFixed(4)} × 10⁻³ K⁻¹.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate ln k at 333 K, to three decimal places.", value: Math.log(k[4]), dp: 3, wrong: [Math.log10(k[4])], explanation: `ln(${sciStr(k[4], 3)}) = ${dpStr(Math.log(k[4]), 3)}. Using lg instead of ln gives ${dpStr(Math.log10(k[4]), 3)}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why a graph of ln k against 1/T should be a straight line, and what its gradient represents.", points: ["ln k = −(Eₐ/R)(1/T) + ln A has the form y = mx + c with y = ln k and x = 1/T", "The gradient is −Eₐ/R (and the intercept is ln A)"], modelAnswer: "The equation can be written ln k = (−Eₐ/R) × (1/T) + ln A, which is y = mx + c with y = ln k and x = 1/T. The points should lie on a straight line whose gradient is −Eₐ/R." }),
        P.short({ label: "(d)", marks: 1, stem: "Identify the anomalous result (give the temperature in K).", accepted: ["313", "313 K"], normalise: ["trim", "collapse_whitespace"], wrong: ["333"], explanation: "At 313 K ln k lies below the line through the other points." }),
        P.num({ label: "(e)", marks: 2, stem: "Using the other four points, determine the gradient of the graph, in K.", value: fit.m, sf: 2, tol: 200, unit: "K", explanation: `Best-fit gradient = ${sfStr(fit.m, 3)} K (for example from the 293 K and 333 K points: (${dpStr(pts[4][1], 3)} − (${dpStr(pts[0][1], 3)})) ÷ (${(pts[4][0]).toExponential(4)} − ${(pts[0][0]).toExponential(4)}) = ${sfStr((pts[4][1] - pts[0][1]) / (pts[4][0] - pts[0][0]), 3)} K).` }),
        P.num({ label: "(f)", marks: 2, stem: "Hence calculate the activation energy, in kJ mol⁻¹, to two significant figures.", value: EaFound, sf: 2, tol: 2, unit: "kJ/mol", wrong: [-fit.m * R, -fit.m / R], explanation: `Eₐ = −gradient × R = ${sfStr(-fit.m, 3)} × 8.31 = ${sfStr(-fit.m * R, 3)} J mol⁻¹ = ${sfStr(EaFound, 2)} kJ mol⁻¹. Forgetting to convert J to kJ, or dividing by R, are common errors.` }),
        P.num({ label: "(g)", marks: 1, stem: "A more precise method gives Eₐ = 55 kJ mol⁻¹. Calculate the percentage difference between the student's value and this value.", value: diff, sf: 2, tol: 2.5, unit: "%", explanation: `|${sfStr(EaFound, 3)} − 55| ÷ 55 × 100 ≈ ${sfStr(diff, 2)}%.` }),
        P.manual({ label: "(h)", marks: 2, stem: "Suggest a cause of the anomalous point at 313 K and explain its effect on k.", points: ["e.g. the actual temperature of the reaction mixture was lower than 313 K (solutions not equilibrated in the water bath / heat lost while mixing)", "A lower temperature gives a smaller rate constant, so ln k is below the line"], modelAnswer: "The reactants may not have reached 313 K before mixing, or the mixture cooled during the run, so the reaction was slower than it should have been at 313 K and the measured k was too small, putting the point below the line." }),
        P.mcq({ label: "(i)", marks: 1, stem: "What does the negative sign of the gradient show?", options: [
          ["k increases as temperature increases.", "Correct: as T rises, 1/T falls and ln k rises."],
          ["k decreases as temperature increases.", "A negative gradient against 1/T means k rises with T."],
          ["The activation energy is negative.", "Eₐ = −gradient × R is positive."],
          ["The reaction is exothermic.", "The gradient concerns Eₐ, not the sign of ΔH."],
        ], answer: "A", explanation: "Smaller 1/T (higher T) gives larger ln k." }),
        P.manual({ label: "(j)", marks: 2, stem: "Suggest two improvements to make the value of Eₐ more reliable.", points: ["Use a thermostatted water bath and equilibrate both solutions at the set temperature before mixing; measure the temperature of the mixture", "Repeat each measurement (and/or use more temperatures over a wider range) and use mean values"], modelAnswer: "Equilibrate both reactant solutions in a thermostatted water bath before mixing and record the actual temperature of the mixture; repeat each run and use more temperatures over a wider range, so that the gradient is better defined." }),
      ]),
      hints: ["ln k = −(Eₐ/R)(1/T) + ln A.", "Eₐ = −gradient × R; convert J to kJ."],
      explanation: `Gradient ≈ ${sfStr(fit.m, 3)} K; Eₐ ≈ ${sfStr(EaFound, 2)} kJ mol⁻¹, about ${sfStr(diff, 2)}% from 55 kJ mol⁻¹; anomaly at 313 K.`,
    });
  }
});
