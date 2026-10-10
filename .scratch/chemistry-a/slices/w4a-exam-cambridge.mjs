// W4a: Cambridge-only exam-format item: one CAM_P5_ANALYSIS question (15 marks; Paper 5 question 2 style): data from an
// esterification equilibrium, Kc from the gradient of a straight-line graph through the origin.
import { concept, P, t, CAM, EXAM, checkExam, linearFit, pctError, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P5 = { skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, examStyle: true, paper: "Paper 5" };

concept(A("skills.planning-evaluation"), { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  {
    // Simulated data: 0.120 mol ethanoic acid + b mol ethanol, Kc = 4.0 (solved in code here, not by students); the whole
    // equilibrium mixture is titrated with 2.50 mol dm⁻³ NaOH; blank (catalyst only) 1.60 cm³. Titres to 0.05 cm³.
    const a = 0.12, blank = 1.6, cNa = 2.5;
    const bs = [0.06, 0.11, 0.16, 0.21, 0.26];
    const anom = 3;
    const rows = bs.map((bb, i) => {
      const s = a + bb;
      const x = (4 * s - Math.sqrt(16 * s * s - 48 * a * bb)) / 6; // x² = 4(a − x)(b − x), i.e. Kc = 4.0
      let tit = ((a - x) / cNa) * 1000 + blank;
      if (i === anom) tit += 1.5; // this mixture was titrated before equilibrium was reached
      tit = Math.round(tit * 20) / 20;
      const acid = ((tit - blank) * cNa) / 1000;
      const est = a - acid;
      const alc = bb - est;
      return { bb, tit, acid, est, alc, X: acid * alc * 1e4, Y: est * est * 1e4, Kc: (est * est) / (acid * alc) };
    });
    const fit = linearFit(rows.filter((_, i) => i !== anom).map((r) => [r.X, r.Y]));
    const r3 = rows[1];
    const pct = pctError(0.1, rows[4].tit);
    b.struct({
      ...P5, d: 5, calculator: true,
      concepts: [A("skills.planning-evaluation"), A("carboxylic.esters"), A("equilibria.kc-kp")],
      stem: `A student investigated the equilibrium CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O. In each experiment 0.120 mol of ethanoic acid was mixed with a different amount of ethanol and 1.0 cm³ of dilute hydrochloric acid as catalyst, sealed and left at 25 °C for one week. The whole mixture was then titrated with 2.50 mol dm⁻³ NaOH. A blank titration of 1.0 cm³ of the catalyst alone needed 1.60 cm³ of the NaOH. Assume no water was present at the start other than in the catalyst, and ignore it.\n\n| Experiment | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| ethanol at start / mol | ${bs.map((x) => x.toFixed(3)).join(" | ")} |\n| titre of NaOH / cm³ | ${rows.map((r) => r.tit.toFixed(2)).join(" | ")} |`,
      parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the amount, in mol, of ethanoic acid at equilibrium in experiment 2.", value: r3.acid, sf: 3, unit: "mol", wrong: [(r3.tit * cNa) / 1000], explanation: `(${r3.tit.toFixed(2)} − 1.60) cm³ × 2.50 mol dm⁻³ ÷ 1000 = ${sfStr(r3.acid, 3)} mol. Forgetting to subtract the blank gives ${sfStr((r3.tit * cNa) / 1000, 3)} mol.` }),
        P.num({ label: "(b)", marks: 2, stem: "Hence calculate Kc for experiment 2, to three significant figures.", value: r3.Kc, sf: 3, wrong: [r3.est / (r3.acid * r3.alc)], explanation: `Ester = water = 0.120 − ${sfStr(r3.acid, 3)} = ${sfStr(r3.est, 3)} mol; ethanol = 0.110 − ${sfStr(r3.est, 3)} = ${sfStr(r3.alc, 3)} mol; Kc = ${sfStr(r3.est, 3)}² ÷ (${sfStr(r3.acid, 3)} × ${sfStr(r3.alc, 3)}) = ${sfStr(r3.Kc, 3)} (the volume cancels).` }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which graph gives a straight line through the origin with gradient equal to Kc?", options: [
          ["n(ester) × n(water) on the y-axis against n(acid) × n(ethanol) on the x-axis", "Correct: n(ester)n(water) = Kc × n(acid)n(ethanol), so y = mx."],
          ["n(acid) × n(ethanol) on the y-axis against n(ester) × n(water) on the x-axis", "The gradient would then be 1/Kc."],
          ["n(ester) on the y-axis against n(ethanol) at the start on the x-axis", "This is a curve that levels off, not a straight line."],
          ["titre on the y-axis against n(ethanol) at the start on the x-axis", "This is a curve, and its gradient is not Kc."],
        ], answer: "A", explanation: "Kc = n(ester)n(water) ÷ (n(acid)n(ethanol)) has the form y = mx." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which experiment gives an anomalous result?", options: [
          [`experiment ${anom + 1}`, "Correct: its Kc is well below the others; it was probably not at equilibrium."],
          ["experiment 1", "Its value fits the others."],
          ["experiment 2", "Its value fits the others."],
          ["experiment 5", "Its value fits the others."],
        ], answer: "A", explanation: `Kc values: ${rows.map((r) => sfStr(r.Kc, 3)).join(", ")}.` }),
        P.num({ label: "(e)", marks: 3, stem: `The processed values for the four other experiments are (x = n(acid) × n(ethanol) / 10⁻⁴ mol², y = n(ester)² / 10⁻⁴ mol²): ${rows.filter((_, i) => i !== anom).map((r) => `(${dpStr(r.X, 2)}, ${dpStr(r.Y, 2)})`).join(", ")}. Plot y against x, draw the line of best fit, and determine its gradient. (Values within ±0.25 of the best-fit gradient are accepted.)`, value: fit.m, tol: 0.25, answer: sfStr(fit.m, 3), wrong: [sfStr(1 / fit.m, 3)], explanation: `Best-fit gradient = ${sfStr(fit.m, 3)}, with an intercept close to zero (${sfStr(fit.c, 2)} × 10⁻⁴ mol²), as expected for y = Kc x. So Kc ≈ ${sfStr(fit.m, 2)}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why Kc can be calculated from amounts in moles rather than concentrations, and why the blank titration is needed.", points: ["There are two concentration terms in both numerator and denominator, so the total volume cancels", "The HCl catalyst also reacts with the NaOH, so its titre must be subtracted to find the ethanoic acid alone"], modelAnswer: "The volume appears twice on the top and twice on the bottom of the Kc expression and cancels. The hydrochloric acid catalyst also uses up NaOH, so the blank titre is subtracted to leave the titre due to ethanoic acid." }),
        P.num({ label: "(g)", marks: 2, stem: `The burette readings have an uncertainty of ±0.05 cm³ each. Calculate the percentage uncertainty in the titre of experiment 5 (${rows[4].tit.toFixed(2)} cm³), to three significant figures.`, value: pct, sf: 3, unit: "%", wrong: [pctError(0.05, rows[4].tit)], explanation: `Two readings: ±0.10 cm³; 0.10 ÷ ${rows[4].tit.toFixed(2)} × 100 = ${sfStr(pct, 3)}%.` }),
        P.manual({ label: "(h)", marks: 2, stem: "Suggest one reason for the anomalous result and one improvement to the method.", points: ["The mixture had not reached equilibrium (too little time) so more acid remained; or the ester was partly hydrolysed during the titration", "Leave all mixtures longer/until two titrations a day apart agree; titrate quickly in ice-cold conditions (to stop the equilibrium shifting); repeat each experiment"], modelAnswer: "Experiment 4 had probably not reached equilibrium, leaving more acid. Leave each mixture until two titrations on separate days give the same titre, and titrate quickly with the mixture diluted in ice-cold water so that the equilibrium does not shift during the titration." }),
      ]),
      hints: ["Subtract the blank titre first.", "Kc = n(ester)n(water) ÷ (n(acid)n(ethanol)) because the volume cancels."],
      explanation: `Experiment 2: acid ${sfStr(r3.acid, 3)} mol, Kc ${sfStr(r3.Kc, 3)}; anomaly experiment ${anom + 1}; gradient ${sfStr(fit.m, 3)}; titre uncertainty ${sfStr(pct, 3)}%.`,
    });
  }
});
