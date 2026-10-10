// W1b: Cambridge-only exam-format items: Paper 3 quantitative (thermometric, with a Hess cycle) and Paper 5 analysis
// (ΔG from cell potentials at different temperatures).
import { concept, P, t, CAM, EXAM, heatQ, deltaHFromQ, AR, Mr, linearFit, round, F, pctErrorDifference, pctDifference, checkExam, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.CAM_P3_QUANTITATIVE.skill, secs: EXAM.CAM_P3_QUANTITATIVE.secs, applies: EXAM.CAM_P3_QUANTITATIVE.applies, examStyle: true, paper: "Paper 3" };
const P5 = { skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, examStyle: true, paper: "Paper 5" };

concept(A("skills.quantitative-practical"), { file: "exam/w1b-cambridge", keyPrefix: "exam.w1b-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------ Paper 3: ΔHf of magnesium oxide by Hess's law
  {
    const vol = 55.0;
    const mMg = 0.24;
    const nMg = mMg / AR.Mg;
    const T0 = 21.4;
    const k = 0.34;
    const dTtrue = (462 * 1000 * nMg) / (vol * 4.18);
    const times = [0, 0.5, 1, 1.5, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
    const temps = times.map((x) => (x < 2 ? T0 : x === 2.5 ? round(T0 + dTtrue * 0.75, 1) : round(T0 + dTtrue - k * (x - 2), 1)));
    const cool = times.map((x, i) => [x, temps[i]]).filter(([x]) => x >= 3);
    const fit = linearFit(cool);
    const dTgraph = fit.m * 2 + fit.c - T0;
    const dT1 = round(dTgraph, 1);
    const q1 = heatQ(vol, dT1);
    const dH1 = deltaHFromQ(q1, nMg);
    const mO = 1.1;
    const nO = mO / Mr("MgO");
    const dT2 = 17.6;
    const q2 = heatQ(vol, dT2);
    const dH2 = deltaHFromQ(q2, nO);
    const dHf = dH1 - dH2 + -286;
    const uT = pctErrorDifference(0.05, dT1);
    const uM = pctErrorDifference(0.005, mMg);
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("skills.quantitative-practical"), A("energetics.enthalpy-calorimetry"), A("energetics.hess-bond-energies")],
      stem: t`You will find the enthalpy change of formation of magnesium oxide indirectly, using two reactions with excess hydrochloric acid:

reaction 1: $\ce{Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g)}$ ΔH₁
reaction 2: $\ce{MgO(s) + 2HCl(aq) -> MgCl2(aq) + H2O(l)}$ ΔH₂

**Experiment 1.** ${vol.toFixed(1)} cm³ of 1.80 mol dm⁻³ HCl was placed in a polystyrene cup and its temperature recorded every half minute with a thermometer graduated in 0.1 °C. At 2 minutes, ${mMg.toFixed(2)} g of magnesium ribbon was added and the mixture stirred.

| time / min | ${times.map((x) => String(x)).join(" | ")} |
|${"---|".repeat(times.length + 1)}
| temperature / °C | ${temps.map((x) => x.toFixed(1)).join(" | ")} |

**Experiment 2.** The same method with ${mO.toFixed(2)} g of magnesium oxide gave a corrected temperature rise of ${dT2.toFixed(1)} °C.

Data: Ar Mg 24.3; Mr MgO 40.3; c = 4.18 J g⁻¹ K⁻¹; assume ${vol.toFixed(1)} cm³ of solution has a mass of ${vol.toFixed(1)} g; ΔH⦵f(H₂O(l)) = −286 kJ mol⁻¹. Wear eye protection; hydrochloric acid is an irritant, and no flames should be near the hydrogen produced.`,
      parts: checkExam(EXAM.CAM_P3_QUANTITATIVE, [
        P.manual({ label: "(a)", marks: 2, stem: "Describe how you would use a graph of the results of experiment 1 to find the corrected temperature rise.", points: ["Plot temperature (y) against time (x); draw a horizontal line through the readings before mixing and a straight best-fit line through the cooling readings from 3 min.", "Extrapolate the cooling line back to 2 min (time of adding Mg); ΔT is the vertical difference between the two lines at 2 min."], modelAnswer: "Plot temperature against time. Draw a line through the steady readings before mixing and a best-fit straight line through the cooling readings, extending it back to 2 min. The corrected ΔT is the gap between the two lines at the time of mixing." }),
        P.num({ label: "(b)", marks: 2, stem: "Use the readings from 3 to 6 minutes to find the corrected temperature rise in experiment 1, in °C, to one decimal place.", value: dTgraph, tol: 0.3, answer: dpStr(dTgraph, 1), unit: "°C", explanation: `The cooling line has gradient ${sfStr(fit.m, 2)} °C min⁻¹; extrapolated to 2 min it gives ${dpStr(fit.m * 2 + fit.c, 1)} °C, so ΔT ≈ ${dpStr(dTgraph, 1)} °C (values from a careful graph within about ±0.3 °C are accepted). The highest reading, ${Math.max(...temps).toFixed(1)} °C, would underestimate ΔT because of heat loss.` }),
        P.num({ label: "(c)", marks: 2, stem: `Use ΔT = ${dT1.toFixed(1)} °C for this and the following parts. Calculate the energy released in experiment 1, in J, to three significant figures.`, value: q1, sf: 3, unit: "J", explanation: `q = ${vol.toFixed(1)} × 4.18 × ${dT1.toFixed(1)} = ${sfStr(q1, 3)} J.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate ΔH₁, in kJ mol⁻¹, to three significant figures.", value: dH1, sf: 3, unit: "kJ/mol", wrong: [sfStr(-dH1, 3)], explanation: `n(Mg) = ${mMg.toFixed(2)} ÷ 24.3 = ${sfStr(nMg, 3)} mol; ΔH₁ = −${sfStr(q1 / 1000, 4)} ÷ ${sfStr(nMg, 3)} = ${sfStr(dH1, 3)} kJ mol⁻¹.` }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate ΔH₂, in kJ mol⁻¹, to three significant figures.", value: dH2, sf: 3, unit: "kJ/mol", wrong: [sfStr(-dH2, 3)], explanation: `q = ${vol.toFixed(1)} × 4.18 × ${dT2.toFixed(1)} = ${sfStr(q2, 4)} J; n(MgO) = ${mO.toFixed(2)} ÷ 40.3 = ${sfStr(nO, 3)} mol; ΔH₂ = ${sfStr(dH2, 3)} kJ mol⁻¹.` }),
        P.mcq({ label: "(f)", stem: "Which expression gives ΔH⦵f(MgO)?", options: [["ΔH₁ − ΔH₂ + ΔH⦵f(H₂O)", "Correct: Mg → MgCl₂(aq) + H₂, then H₂ + ½O₂ → H₂O, then reverse reaction 2."], ["ΔH₁ + ΔH₂ + ΔH⦵f(H₂O)", "Reaction 2 must be reversed, so its sign changes."], ["ΔH₂ − ΔH₁ + ΔH⦵f(H₂O)", "This reverses the wrong reaction."], ["ΔH₁ − ΔH₂ − ΔH⦵f(H₂O)", "Water is formed on the route, so ΔHf(H₂O) is added."]], answer: "A", explanation: "Mg + ½O₂ → MgO equals reaction 1, plus formation of water from the H₂ released, minus reaction 2." }),
        P.num({ label: "(g)", marks: 2, stem: "Calculate ΔH⦵f(MgO), in kJ mol⁻¹, to three significant figures.", value: dHf, sf: 3, unit: "kJ/mol", wrong: [sfStr(dH1 + dH2 - 286, 3)], explanation: `ΔHf = ${sfStr(dH1, 4)} − (${sfStr(dH2, 4)}) + (−286) = ${sfStr(dHf, 3)} kJ mol⁻¹.` }),
        P.num({ label: "(h)", marks: 2, stem: `Each thermometer reading is uncertain by half a division. Calculate the percentage uncertainty in ΔT = ${dT1.toFixed(1)} °C, to three significant figures.`, value: uT, sf: 3, unit: "%", explanation: `Each reading ±0.05 °C, so ΔT is ±0.1 °C; 0.1 ÷ ${dT1.toFixed(1)} × 100 = ${sfStr(uT, 3)}%.` }),
        P.num({ label: "(i)", marks: 1, stem: "The mass of magnesium was found by difference on a balance reading to ±0.005 g. Calculate the percentage uncertainty in the mass of magnesium, to two significant figures.", value: uM, sf: 2, unit: "%", explanation: `±0.01 g on ${mMg.toFixed(2)} g: ${sfStr(uM, 2)}%.` }),
        P.manual({ label: "(j)", marks: 2, stem: "Identify the measurement with the largest percentage uncertainty and suggest how to reduce it.", points: ["The mass of magnesium (about 4%).", "Use a balance reading to 0.001 g, or a larger mass of magnesium with a larger volume of acid (keeping the acid in excess)."], modelAnswer: "The mass of magnesium has by far the largest percentage uncertainty; weigh it on a three-place balance or use a larger mass of magnesium with a larger volume of acid." }),
        P.manual({ label: "(k)", marks: 2, stem: "Explain why the acid must be in excess and why the same volume and concentration of acid are used in both experiments.", points: ["Excess acid makes sure all the Mg or MgO reacts, so the amount reacting equals the amount weighed.", "The same volume (mass of solution) and concentration keep conditions the same so that both reactions end at the same state, MgCl₂(aq), as the Hess cycle requires."], modelAnswer: "With acid in excess, all the solid reacts and n is known from its mass. Using the same volume and concentration gives the same final solution in both experiments, so the two enthalpy changes can be combined in one Hess cycle." }),
        P.manual({ label: "(l)", marks: 2, stem: "Heat loss is a systematic error in both experiments. State its effect on ΔH₁ and ΔH₂ and explain why its effect on ΔH⦵f(MgO) is reduced.", points: ["Both measured values are less exothermic than the true values (ΔT too small).", "ΔHf depends on ΔH₁ − ΔH₂, so errors in the same direction partly cancel (although not completely, because the two temperature rises and amounts differ)."], modelAnswer: "Heat loss makes both ΔH₁ and ΔH₂ less exothermic. Because the cycle uses the difference ΔH₁ − ΔH₂, errors in the same direction partly cancel, so ΔHf(MgO) is affected less than either value." }),
        P.manual({ label: "(m)", marks: 3, stem: "Suggest three improvements to the procedure.", points: ["Use a lid and insulate the cup (e.g. a second cup or a beaker of cotton wool) to reduce heat loss.", "Use a digital temperature probe with readings every 15 s for a better extrapolation.", "Clean the magnesium with emery paper (remove oxide) and/or powder the MgO; stir continuously so the reaction is fast and the temperature uniform."], modelAnswer: "Put a lid on the cup and stand it in a beaker to cut heat loss; use a digital thermometer recording every 15 s so the cooling line is better defined; clean the magnesium ribbon to remove oxide and stir continuously so each reaction is rapid." }),
      ]),
      hints: ["Extrapolate the cooling line to the time of mixing.", "Hess cycle: ΔHf(MgO) = ΔH₁ − ΔH₂ + ΔHf(H₂O)."],
      explanation: `Corrected ΔT ≈ ${dpStr(dTgraph, 1)} °C; ΔH₁ = ${sfStr(dH1, 3)} kJ mol⁻¹; ΔH₂ = ${sfStr(dH2, 3)} kJ mol⁻¹; ΔHf(MgO) = ${sfStr(dHf, 3)} kJ mol⁻¹ (data value −602 kJ mol⁻¹).`,
    });
  }

  // ------------------------------------------------------------ Paper 5: ΔG against T from cell potentials
  {
    const dH = -250.0, dS = -96.0;
    const Ts = [278, 288, 298, 308, 318, 328];
    const trueE = Ts.map((T) => -(dH * 1000 - T * dS) / (2 * F));
    const E = trueE.map((x) => round(x, 3));
    const anom = 3;
    E[anom] = round(trueE[anom] + 0.008, 3);
    const G = E.map((e) => (-2 * F * e) / 1000);
    const pts = Ts.map((T, i) => [T, G[i]]).filter((_, i) => i !== anom);
    const fit = linearFit(pts);
    const S = -fit.m * 1000;
    const H = fit.c;
    const G298 = G[2];
    const Sshown = Number(sfStr(S, 3));
    const pd = pctDifference(Sshown, -98.0);
    b.struct({
      ...P5, d: 5, calculator: true,
      concepts: [A("skills.planning-evaluation"), A("electrochem.nernst-free-energy"), A("energetics.entropy-gibbs")],
      stem: `A student measured the e.m.f., E, of an electrochemical cell at different temperatures with a high-resistance digital voltmeter. Two moles of electrons are transferred in the cell reaction. F = 96 500 C mol⁻¹.\n\n| T / K | ${Ts.join(" | ")} |\n|---|---|---|---|---|---|---|\n| E / V | ${E.map((e) => e.toFixed(3)).join(" | ")} |\n\nΔG = −nEF, and ΔG = ΔH − TΔS.`,
      parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate ΔG for the cell reaction at 298 K, in kJ mol⁻¹, to four significant figures.", value: G298, sf: 4, unit: "kJ/mol", wrong: [sfStr(G298 / 2, 4)], explanation: `ΔG = −2 × ${E[2].toFixed(3)} × 96 500 = ${sfStr(G298 * 1000, 4)} J mol⁻¹ = ${sfStr(G298, 4)} kJ mol⁻¹.` }),
        P.mcq({ label: "(b)", stem: "Which graph should be plotted to find ΔS and ΔH?", options: [["ΔG (y-axis) against T (x-axis)", "Correct: ΔG = ΔH − TΔS is y = c + mx with gradient −ΔS and intercept ΔH."], ["T (y-axis) against ΔG (x-axis)", "The gradient would then be −1/ΔS, which is harder to use."], ["E (y-axis) against 1/T (x-axis)", "E is linear in T, not in 1/T."], ["log E (y-axis) against T (x-axis)", "There is no logarithmic relationship here."]], answer: "A", explanation: "Compare ΔG = ΔH − TΔS with y = mx + c." }),
        P.mcq({ label: "(c)", stem: "Which temperature gives an anomalous result?", options: [[`${Ts[anom]} K`, "Correct: its E value is clearly above the steady downward trend of about 0.005 V per 10 K."], [`${Ts[0]} K`, "This point fits the trend."], [`${Ts[5]} K`, "This point fits the trend."], [`${Ts[2]} K`, "This point fits the trend."]], answer: "A", explanation: "E falls by about 0.005 V for every 10 K except at the anomalous temperature." }),
        P.num({ label: "(d)", marks: 3, stem: "Ignoring the anomalous point, use the gradient of your graph to find ΔS for the reaction, in J K⁻¹ mol⁻¹. (Values within ±8 J K⁻¹ mol⁻¹ of the best-fit value are accepted.)", value: S, tol: 8, answer: sfStr(S, 3), unit: "J/K/mol", wrong: [sfStr(-S, 3)], explanation: `Best-fit gradient (anomaly excluded) = ${sfStr(fit.m, 3)} kJ K⁻¹ mol⁻¹ = −ΔS, so ΔS ≈ ${sfStr(S, 3)} J K⁻¹ mol⁻¹. ΔG becomes less negative as T rises, so ΔS is negative.` }),
        P.num({ label: "(e)", marks: 2, stem: "Use the intercept (or ΔH = ΔG + TΔS at one point on the line) to find ΔH, in kJ mol⁻¹. (Values within ±4 kJ mol⁻¹ are accepted.)", value: H, tol: 4, answer: sfStr(H, 3), unit: "kJ/mol", explanation: `Extrapolating to T = 0 gives ΔH ≈ ${sfStr(H, 3)} kJ mol⁻¹ (for example ${sfStr(G298, 4)} + 298 × (${sfStr(S / 1000, 3)}) ≈ ${sfStr(G298 + (298 * S) / 1000, 3)}).` }),
        P.num({ label: "(f)", marks: 2, stem: `A data book gives ΔS = −98.0 J K⁻¹ mol⁻¹ for this reaction. A careful graph gave ΔS = ${Sshown.toFixed(1).replace("-", "−")} J K⁻¹ mol⁻¹. Calculate the percentage difference between this value and the data-book value, to two significant figures.`, value: pd, sf: 2, unit: "%", explanation: `|${Sshown.toFixed(1)} − (−98.0)| ÷ 98.0 × 100 = ${sfStr(pd, 2)}%. A difference this small is within the uncertainty of reading E to 0.001 V.` }),
        P.manual({ label: "(g)", marks: 2, stem: "Evaluate the method: suggest two reasons why the values of E might be inaccurate, and how to deal with each.", points: ["The cell may not have reached the bath temperature when E was read: allow time to reach thermal equilibrium (stir the water bath, read T in the cell).", "Concentrations may change if current flows, or the voltmeter resolution (0.001 V) is coarse compared with the 0.005 V change per 10 K: use a high-resistance meter reading to 0.0001 V, take repeat readings and use a wider temperature range."], modelAnswer: "The cell might not be at the measured temperature: keep it in a stirred water bath and wait for E to become steady. The changes in E are only about 0.005 V per 10 K, close to the resolution of the meter, so use a more sensitive high-resistance voltmeter, repeat each reading, and cover a wider temperature range." }),
        P.manual({ label: "(h)", marks: 2, stem: "State and explain how the feasibility of the cell reaction changes as the temperature increases.", points: ["Feasibility decreases: E falls and ΔG becomes less negative as T rises.", "Because ΔS is negative, −TΔS is positive and grows with T."], modelAnswer: "It becomes less feasible: with ΔS negative, the −TΔS term is positive and increases with temperature, so ΔG becomes less negative and E falls." }),
      ]),
      hints: ["ΔG = −nEF in J mol⁻¹; divide by 1000.", "Gradient of ΔG against T is −ΔS."],
      explanation: `ΔG(298 K) = ${sfStr(G298, 4)} kJ mol⁻¹; ΔS ≈ ${sfStr(S, 3)} J K⁻¹ mol⁻¹; ΔH ≈ ${sfStr(H, 3)} kJ mol⁻¹; anomaly at ${Ts[anom]} K.`,
    });
  }
});
