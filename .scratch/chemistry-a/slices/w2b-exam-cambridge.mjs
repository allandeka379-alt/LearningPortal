// W2b: Cambridge-only exam-format item: one Paper 3 quantitative question (25 marks): gravimetric determination of
// the relative formula mass of a Group 2 carbonate by heating to constant mass (mass of CO2 lost against mass of solid).
import { concept, P, t, chk, EXAM, checkExam, CAM, Mr, pctError, pctErrorDifference, sfStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.CAM_P3_QUANTITATIVE.skill, secs: EXAM.CAM_P3_QUANTITATIVE.secs, applies: EXAM.CAM_P3_QUANTITATIVE.applies, examStyle: true, paper: "Paper 3" };

/** Least-squares gradient of a line forced through the origin. */
const gradientThroughOrigin = (pts) => pts.reduce((s, [x, y]) => s + x * y, 0) / pts.reduce((s, [x]) => s + x * x, 0);
const r2 = (x) => Math.round(x * 100) / 100;

concept(A("group2.reactions-uses"), { file: "exam/w2b-cambridge", keyPrefix: "exam.w2b-cambridge", applies: CAM }, (b) => {
  {
    // [crucible, crucible + carbonate, crucible + residue after heating] / g, balance to 0.01 g.
    // Experiment 4 was heated only once (anomaly: incomplete decomposition).
    const rows = [[15.62, 16.64, 16.11], [16.08, 17.59, 16.8], [15.87, 17.89, 16.84], [16.31, 18.8, 17.85], [15.94, 18.97, 17.39]];
    const pts = rows.map(([c, w, a]) => [r2(w - c), r2(w - a)]);
    chk(pts[2][0], 2.02);
    chk(pts[2][1], 1.05);
    const good = pts.filter((_, i) => i !== 3);
    const grad = gradientThroughOrigin(good);
    const mrCO2 = Mr("CO2");
    const mrCarb = mrCO2 / grad;
    const arM = mrCarb - (12.0 + 3 * 16.0);
    chk(Math.round(mrCarb), 84);
    const pctLoss = pctErrorDifference(0.005, pts[0][1]);
    const expected4 = pts[3][0] * grad;
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("group2.reactions-uses"), A("skills.quantitative-practical")],
      stem: t`Rudo determines the relative formula mass of a Group 2 carbonate, $\ce{MCO3}$, by heating it until it has fully decomposed:

$\ce{MCO3(s) -> MO(s) + CO2(g)}$

For each experiment she weighs an empty crucible, adds the carbonate and weighs again, then heats the crucible strongly with a Bunsen burner, lets it cool on a heat-resistant mat with the lid on, and reweighs. She repeats the heating, cooling and weighing until two consecutive masses agree (constant mass). In experiment 4 she ran out of time and heated the crucible only once. The balance reads to 0.01 g and each reading has an uncertainty of ±0.005 g.

| Experiment | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Mass of empty crucible / g | ${rows.map((r) => r[0].toFixed(2)).join(" | ")} |
| Mass of crucible + carbonate / g | ${rows.map((r) => r[1].toFixed(2)).join(" | ")} |
| Mass of crucible + residue after heating / g | ${rows.map((r) => r[2].toFixed(2)).join(" | ")} |

Use Mr of $\ce{CO2}$ = ${mrCO2.toFixed(1)}, Ar: C 12.0, O 16.0.`,
      parts: checkExam(EXAM.CAM_P3_QUANTITATIVE, [
        P.group({ label: "(a)", stem: "Process the results of experiment 3.", parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the mass of carbonate used, in g, to two decimal places.", value: pts[2][0], dp: 2, unit: "g", wrong: [r2(rows[2][1] - rows[2][2])], explanation: `${rows[2][1].toFixed(2)} − ${rows[2][0].toFixed(2)} = ${pts[2][0].toFixed(2)} g.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the mass of carbon dioxide lost, in g, to two decimal places.", value: pts[2][1], dp: 2, unit: "g", wrong: [r2(rows[2][2] - rows[2][0])], explanation: `${rows[2][1].toFixed(2)} − ${rows[2][2].toFixed(2)} = ${pts[2][1].toFixed(2)} g. (${r2(rows[2][2] - rows[2][0]).toFixed(2)} g is the mass of the residue, not the gas lost.)` }),
        ] }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why Rudo heats to constant mass, and why the crucible is cooled with its lid on before each weighing.", points: ["Constant mass shows that decomposition is complete, so all the CO₂ has been lost", "Weighing hot gives a false (low) reading because of convection currents / the lid stops the oxide absorbing water vapour or CO₂ from the air (and stops solid spitting out)"], modelAnswer: "Two equal consecutive masses show that no more carbon dioxide is being lost, so the decomposition is complete. The crucible is cooled before weighing because convection currents above a hot crucible make the reading unreliable, and the lid stops the oxide absorbing moisture or carbon dioxide from the air while it cools." }),
        P.short({ label: "(c)", marks: 1, stem: "Which experiment number gives the anomalous result?", accepted: ["4", "experiment 4", "four"], wrong: ["5"], explanation: `Experiment 4 lost only ${pts[3][1].toFixed(2)} g of CO₂ from ${pts[3][0].toFixed(2)} g; about ${expected4.toFixed(2)} g was expected from the line through the other points. It was heated only once, so decomposition was incomplete.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Rudo plots mass of carbon dioxide lost against mass of carbonate. Describe the graph she should draw.", points: ["Mass of CO₂ lost / g on the y-axis against mass of carbonate / g on the x-axis, labelled with units, scales using more than half the grid in each direction", "A straight line of best fit passing through the origin, ignoring the anomalous point (experiment 4)"], modelAnswer: "Plot mass of carbon dioxide lost / g (y) against mass of carbonate / g (x), with scales chosen so the points fill more than half of the grid, then draw a straight best-fit line through the origin that ignores experiment 4." }),
        P.num({ label: "(e)", marks: 2, stem: "Determine the gradient of the best-fit line through the origin (no unit; exclude the anomaly).", value: grad, tol: 0.01, wrong: [1 / grad], explanation: `Line through the origin fitted to experiments 1, 2, 3 and 5: gradient ≈ ${grad.toFixed(3)} (for example 1.58 ÷ 3.03 = ${(1.58 / 3.03).toFixed(3)}). Any value from ${(grad - 0.01).toFixed(3)} to ${(grad + 0.01).toFixed(3)} is accepted.` }),
        P.num({ label: "(f)", marks: 2, stem: "Use your gradient to calculate the relative formula mass of MCO₃.", value: mrCarb, tol: 2, wrong: [mrCO2 * grad], explanation: `1 mol MCO₃ (Mr g) loses 1 mol CO₂ (44.0 g), so mass lost = (44.0 ÷ Mr) × mass of carbonate and the gradient = 44.0 ÷ Mr. Mr = 44.0 ÷ ${grad.toFixed(3)} = ${sfStr(mrCarb, 3)}. Multiplying instead of dividing gives a meaningless ${sfStr(mrCO2 * grad, 3)}.` }),
        P.group({ label: "(g)", stem: "Identify the metal.", parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the relative atomic mass of M.", value: arM, tol: 2, wrong: [mrCarb - 44.0], explanation: `Ar(M) = ${sfStr(mrCarb, 3)} − (12.0 + 3 × 16.0) = ${sfStr(arM, 3)}. Subtracting 44.0 (CO₂) instead of 60.0 (CO₃) is a common slip.` }),
          P.short({ label: "(ii)", marks: 1, stem: "Name metal M.", accepted: ["magnesium", "Mg"], wrong: ["calcium"], explanation: "Ar ≈ 24: magnesium (Ar 24.3). Calcium (40.1) would give Mr ≈ 100." }),
        ] }),
        P.num({ label: "(h)", marks: 2, stem: "Calculate the percentage uncertainty in the mass of carbon dioxide lost in experiment 1, to two significant figures.", value: pctLoss, sf: 2, unit: "%", wrong: [pctError(0.005, pts[0][1])], explanation: `The mass lost is a difference of two readings, so the uncertainty is 2 × 0.005 = 0.01 g; 0.01 ÷ ${pts[0][1].toFixed(2)} × 100 = ${sfStr(pctLoss, 2)}%. Using ±0.005 g once gives ${sfStr(pctError(0.005, pts[0][1]), 2)}%.` }),
        P.manual({ label: "(i)", marks: 2, stem: "Explain the effect on the calculated Mr if every sample had been heated only once, as in experiment 4.", points: ["Less CO₂ is lost than the full amount, so the gradient (mass lost ÷ mass of carbonate) is smaller", "Mr = 44.0 ÷ gradient, so the calculated Mr is too high"], modelAnswer: "Incomplete decomposition means less carbon dioxide is lost from each sample, so the gradient is smaller. Since Mr = 44.0 ÷ gradient, the calculated Mr would be too high." }),
        P.manual({ label: "(j)", marks: 3, stem: "Identify one systematic error and one random error in this method, and state the direction of the effect of the systematic error on Mr.", points: ["Systematic: e.g. the oxide absorbs water/CO₂ from the air while cooling, or solid is lost by spitting, or the carbonate is damp / partly basic carbonate", "Direction consistent with the error: absorption gives a smaller mass loss so Mr too high; spitting or a damp sample gives a larger mass loss so Mr too low", "Random: e.g. reading the balance / small differences in heating and cooling time between experiments / variation in the amount of solid lost from the crucible"], modelAnswer: "A systematic error is the oxide absorbing moisture from the air as it cools: every residue weighs a little too much, the mass lost is too small, the gradient is too small and Mr too high. A random error is the variation in heating and cooling times from one experiment to another, which scatters the points about the line." }),
        P.manual({ label: "(k)", marks: 3, stem: "Suggest three improvements to the method.", points: ["Heat every sample to constant mass (repeat heating until two readings agree), including experiment 4", "Cool in a desiccator before weighing to stop the oxide absorbing moisture", "Use a balance reading to 0.001 g or larger masses of carbonate to reduce the percentage uncertainty; repeat experiments / use more data points"], modelAnswer: "Repeat experiment 4, heating to constant mass; cool each crucible in a desiccator so the oxide cannot absorb water from the air; and use a balance reading to 0.001 g (or larger samples) to reduce the percentage uncertainty in the small mass losses." }),
        P.manual({ label: "(l)", marks: 2, stem: "Rudo's friend suggests repeating the experiment with barium carbonate. Suggest why this method would not work well, and state one safety precaution for the original experiment.", points: ["Thermal stability of Group 2 carbonates increases down the group, so barium carbonate does not decompose (or decomposes only very slowly) at Bunsen temperature", "Wear eye protection / use tongs and a heat-resistant mat for the hot crucible / keep the lid partly on to avoid spitting solid"], modelAnswer: "Group 2 carbonates become more thermally stable down the group, so barium carbonate would hardly decompose at the temperature of a Bunsen flame. Wear eye protection and handle the hot crucible with tongs." }),
      ]),
      hints: ["Gradient = 44.0 ÷ Mr(MCO₃).", "A mass found by difference has twice the uncertainty of one reading."],
      explanation: `Gradient ≈ ${grad.toFixed(3)}; Mr(MCO₃) ≈ ${sfStr(mrCarb, 3)}; Ar(M) ≈ ${sfStr(arM, 3)}, so M is magnesium. Experiment 4 is anomalous (heated only once).`,
    });
  }
});
