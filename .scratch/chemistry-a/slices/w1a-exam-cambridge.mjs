// W1a: Cambridge-only exam-format item: one Paper 3 quantitative question (25 marks): Ar of a Group 2 metal from the
// volume of hydrogen produced with excess acid (gas-volume determination with a graph).
import { concept, P, t, chk, EXAM, checkExam, CAM, VM_RTP, pctError, pctErrorDifference, pctDifference, sfStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.CAM_P3_QUANTITATIVE.skill, secs: EXAM.CAM_P3_QUANTITATIVE.secs, applies: EXAM.CAM_P3_QUANTITATIVE.applies, examStyle: true, paper: "Paper 3" };

/** Least-squares gradient of a line forced through the origin. */
const gradientThroughOrigin = (pts) => pts.reduce((s, [x, y]) => s + x * y, 0) / pts.reduce((s, [x]) => s + x * x, 0);

concept(A("stoich.reacting-masses-yield"), { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  {
    // Results: masses to 0.001 g, volumes to the nearest 1 cm³; one anomaly (gas lost) at 0.080 g.
    const rows = [[0.04, 40], [0.06, 59], [0.08, 72], [0.1, 99], [0.12, 118]];
    const good = rows.filter(([m]) => m !== 0.08);
    const grad = gradientThroughOrigin(good); // cm³ g⁻¹
    const ar = (VM_RTP * 1000) / grad;
    chk(Math.round(grad), 986);
    const expected80 = 0.08 * grad;
    const pctMass = pctErrorDifference(0.001, 0.04);
    const pctVol = pctErrorDifference(0.5, 40);
    const pctDiff = pctDifference(ar, 24.3);
    b.struct({
      ...P3, d: 5,
      concepts: [A("stoich.reacting-masses-yield"), A("skills.quantitative-practical"), A("stoich.relative-masses-mole")],
      stem: t`Sipho finds the relative atomic mass of a Group 2 metal M from the volume of hydrogen it gives with excess dilute hydrochloric acid at room conditions:

$\ce{M(s) + 2HCl(aq) -> MCl2(aq) + H2(g)}$

He weighs a strip of M (by difference, balance reading to 0.001 g), drops it into 25 cm³ of 1 mol dm⁻³ HCl in a conical flask, quickly replaces the bung connected to a 250 cm³ gas syringe and records the final volume of gas (syringe read to ±0.5 cm³). He repeats with strips of different mass.

| Mass of M / g | ${rows.map((r) => r[0].toFixed(3)).join(" | ")} |
|---|---|---|---|---|---|
| Volume of hydrogen / cm³ | ${rows.map((r) => r[1]).join(" | ")} |

Molar volume of a gas at room conditions = 24.0 dm³ mol⁻¹.`,
      parts: checkExam(EXAM.CAM_P3_QUANTITATIVE, [
        P.manual({ label: "(a)", marks: 2, stem: "Sipho's table follows the usual conventions. State two conventions for recording raw data in a results table.", points: ["Each column (or row) heading has the quantity and its unit separated by a solidus (e.g. mass of M / g)", "All readings of one quantity to the same number of decimal places, matching the precision of the instrument (0.001 g; whole cm³ or to 0.5 cm³)"], modelAnswer: "Headings give the quantity and unit (mass of M / g, volume / cm³), and each set of readings is recorded to the same, appropriate precision: masses to 0.001 g, volumes to the precision of the syringe." }),
        P.manual({ label: "(b)", marks: 2, stem: "Describe the graph Sipho should draw to analyse his results (axes, scale and line).", points: ["Volume of hydrogen (y-axis) against mass of M (x-axis), with labelled axes and units, scales using more than half the grid", "A straight best-fit line through the origin, ignoring the anomalous point"], modelAnswer: "Plot volume of hydrogen / cm³ on the y-axis against mass of M / g on the x-axis, choosing scales that use most of the grid, then draw a straight line of best fit through the origin that ignores the anomalous point." }),
        P.short({ label: "(c)", marks: 1, stem: "Give the mass, in g, of the strip whose result is anomalous.", accepted: ["0.080", "0.08", "0.080 g", "0.08 g"], wrong: ["0.120"], explanation: `The 0.080 g point (72 cm³) lies well below the line; about ${Math.round(expected80)} cm³ was expected.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest a reason for the anomalous result and how the method could be changed to avoid it.", points: ["Some hydrogen escaped before the bung was replaced (or the apparatus leaked / the strip was partly oxidised)", "Place the metal in a small tube inside the flask (or tie it to the bung) and tip it into the acid after the bung is in place / check joints for leaks"], modelAnswer: "Some hydrogen probably escaped before the bung was replaced. The strip could be held in a small tube or suspended from the bung so that it falls into the acid only after the apparatus is sealed." }),
        P.num({ label: "(e)", marks: 2, stem: "Determine the gradient of the best-fit line through the origin, in cm³ g⁻¹ (exclude the anomaly).", value: grad, tol: 30, wrong: [grad / 1000], explanation: `Best-fit line through the origin: gradient ≈ ${Math.round(grad)} cm³ g⁻¹ (for example 118 ÷ 0.120 ≈ 983). Any value within ±30 of this is accepted.` }),
        P.num({ label: "(f)", marks: 3, stem: "Use your gradient to calculate the relative atomic mass of M.", value: ar, tol: 0.8, wrong: [grad / 24000], explanation: `1 mol M gives 1 mol H₂ = 24 000 cm³, so V = (m ÷ Ar) × 24 000 and the gradient = 24 000 ÷ Ar. Ar = 24 000 ÷ ${Math.round(grad)} = ${sfStr(ar, 3)}.` }),
        P.short({ label: "(g)", marks: 1, stem: "Identify metal M.", accepted: ["magnesium", "Mg"], wrong: ["calcium"], explanation: "Ar ≈ 24.3: magnesium." }),
        P.num({ label: "(h)", marks: 2, stem: "The mass of each strip is found by difference from two balance readings, each ±0.001 g. Calculate the percentage uncertainty in the mass of the 0.040 g strip.", value: pctMass, unit: "%", wrong: [pctError(0.001, 0.04)], explanation: `Two readings: ±0.002 g; 0.002 ÷ 0.040 × 100 = ${sfStr(pctMass, 2)}%.`, sf: 2 }),
        P.num({ label: "(i)", marks: 1, stem: "The syringe is read at the start and end, each ±0.5 cm³. Calculate the percentage uncertainty in the 40 cm³ volume.", value: pctVol, unit: "%", wrong: [pctError(0.5, 40)], explanation: `±1.0 cm³ ÷ 40 × 100 = ${sfStr(pctVol, 2)}%.`, sf: 2 }),
        P.num({ label: "(j)", marks: 1, stem: "Calculate the percentage difference between your value of Ar and the accepted value, 24.3.", value: pctDiff, tol: 3.5, unit: "%", wrong: [50], explanation: `|${sfStr(ar, 3)} − 24.3| ÷ 24.3 × 100 ≈ ${sfStr(pctDiff, 1)}% (depends on your gradient; within the uncertainties of the method).` }),
        P.manual({ label: "(k)", marks: 3, stem: "Identify one systematic error and one random error in this experiment, explaining the effect of the systematic error on Ar.", points: ["Systematic: an oxide coating on the metal (or some hydrogen dissolving in / the acid adding volume, or gas temperature above room temperature)", "Effect: e.g. oxide gives less hydrogen per gram, so the gradient is smaller and Ar too high (consistent direction explained)", "Random: judging the syringe reading / timing of replacing the bung / small variations in strip mass"], modelAnswer: "A systematic error is a layer of magnesium oxide on the strips: the oxide reacts without giving hydrogen, so every strip gives less gas than expected, the gradient is too small and the calculated Ar is too high. A random error is the variable amount of gas lost while the bung is replaced, which scatters the points about the line." }),
        P.manual({ label: "(l)", marks: 3, stem: "Suggest three improvements to the method.", points: ["Clean the metal with emery paper to remove the oxide layer", "Use a method that seals the apparatus before the reaction starts (metal in a suspended tube / tipped in)", "Use larger masses (within the syringe capacity) or a more precise balance to reduce percentage uncertainty; repeat each mass and average"], modelAnswer: "Rub each strip with emery paper to remove oxide; start the reaction only after the apparatus is sealed, for example by tipping the metal in from a small tube; and use the largest masses the 250 cm³ syringe allows, repeating each mass to average the results." }),
        P.manual({ label: "(m)", marks: 2, stem: "State two safety precautions.", points: ["Wear eye protection (acid)", "No naked flames near the apparatus because hydrogen is flammable"], modelAnswer: "Wear eye protection when handling the acid, and keep naked flames away because hydrogen is flammable." }),
      ]),
      hints: ["Gradient = 24 000 ÷ Ar.", "A difference of two readings doubles the absolute uncertainty."],
      explanation: `Gradient ≈ ${Math.round(grad)} cm³ g⁻¹; Ar ≈ ${sfStr(ar, 3)} (magnesium); anomaly at 0.080 g.`,
      calculator: true,
    });
  }
});
