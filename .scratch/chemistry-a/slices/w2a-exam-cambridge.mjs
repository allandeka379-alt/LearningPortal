// W2a: Cambridge-only exam-format items: one Paper 3 quantitative question (25 marks: rate of magnesium with
// hydrochloric acid by gas volume) and one Paper 5 question 2 analysis item (15 marks: lg rate against lg concentration).
import { concept, P, t, ce, EXAM, checkExam, CAM, linearFit, pctError, round, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.CAM_P3_QUANTITATIVE.skill, secs: EXAM.CAM_P3_QUANTITATIVE.secs, applies: EXAM.CAM_P3_QUANTITATIVE.applies, examStyle: true, paper: "Paper 3" };
const P5 = { skill: EXAM.CAM_P5_ANALYSIS.skill, secs: EXAM.CAM_P5_ANALYSIS.secs, applies: EXAM.CAM_P5_ANALYSIS.applies, examStyle: true, paper: "Paper 5" };

concept(A("kinetics.collisions-boltzmann"), { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  // ---------------------------------------------------------------- C1 (Paper 3): magnesium + hydrochloric acid, gas volume
  {
    const vAcid = [50.0, 40.0, 30.0, 20.0, 10.0];
    const conc = vAcid.map((v) => (2.0 * v) / 50.0);
    const times = conc.map((c) => Math.round(30 / c));
    const rates = times.map((x) => 10.0 / x);
    const fit = linearFit(conc.map((c, i) => [c, rates[i]]));
    const tPred = 10.0 / (fit.m * 1.0 + fit.c);
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("kinetics.collisions-boltzmann"), A("skills.quantitative-practical")],
      stem: t`You are to investigate how the rate of reaction of magnesium with hydrochloric acid depends on the concentration of the acid: $\ce{Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g)}$.

**Method.** A burette was used to put the volume of 2.00 mol dm⁻³ hydrochloric acid shown below into a conical flask, and a second burette was used to add distilled water to make 50.0 cm³. The flask was connected to a gas syringe. A 5.0 cm length of cleaned magnesium ribbon was added, the bung replaced and a stopwatch started. The time taken to collect 10.0 cm³ of hydrogen was recorded. The acid was always in large excess and the temperature was 22 °C.

| Run | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| volume of 2.00 mol dm⁻³ HCl / cm³ | ${vAcid.map((v) => dpStr(v, 2)).join(" | ")} |
| volume of water / cm³ | ${vAcid.map((v) => dpStr(50 - v, 2)).join(" | ")} |
| time to collect 10.0 cm³ H₂ / s | ${times.join(" | ")} |`,
      parts: checkExam(EXAM.CAM_P3_QUANTITATIVE, [
        P.manual({ label: "(a)", marks: 3, stem: "The results are to be processed by adding columns for the concentration of HCl and for the rate (10.0/time). Describe how a single results table for all the data should be presented.", points: ["Each column headed with a quantity and its unit (e.g. volume of HCl / cm³; time / s; [HCl] / mol dm⁻³; rate / cm³ s⁻¹)", "Burette volumes recorded to 2 decimal places (0.05 cm³) and times to the nearest second, consistently", "Calculated concentrations and rates given to an appropriate, consistent number of significant figures (3 s.f.)"], modelAnswer: "A table with one row per run and columns headed 'volume of HCl / cm³', 'volume of water / cm³', 'time / s', '[HCl] / mol dm⁻³' and 'rate / cm³ s⁻¹'. Burette volumes are given to two decimal places (e.g. 40.00), times to the nearest second, and the processed concentration and rate values to three significant figures." }),
        P.group({ label: "(b)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the concentration of HCl in run 3, in mol dm⁻³;", value: conc[2], sf: 3, unit: "mol/dm³", wrong: [2.0 * 30 / 20], explanation: `2.00 × 30.00/50.00 = ${sfStr(conc[2], 3)} mol dm⁻³.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the rate in run 2, in cm³ s⁻¹, to three significant figures.", value: rates[1], sf: 3, unit: "cm³/s", wrong: [times[1] / 10], explanation: `Rate = 10.0 ÷ ${times[1]} = ${sfStr(rates[1], 3)} cm³ s⁻¹.` }),
        ] }),
        P.num({ label: "(c)", marks: 1, stem: "The gas syringe measures the 10.0 cm³ of hydrogen to ±0.5 cm³. Calculate the percentage uncertainty in this volume.", value: pctError(0.5, 10.0), sf: 2, unit: "%", explanation: "0.5 ÷ 10.0 × 100 = 5.0%." }),
        P.num({ label: "(d)", marks: 1, stem: `The time in run 1 is uncertain by ±1 s (reaction time). Calculate the percentage uncertainty in this time, to two significant figures.`, value: pctError(1, times[0]), sf: 2, unit: "%", explanation: `1 ÷ ${times[0]} × 100 = ${sfStr(pctError(1, times[0]), 2)}%: the shortest time has the largest percentage uncertainty.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Describe the graph you would plot to show how rate depends on [HCl], and the shape you expect from these results.", points: ["Rate (cm³ s⁻¹) on the y-axis against [HCl] (mol dm⁻³) on the x-axis, with labelled axes and units and a scale using over half the grid", "Points plotted accurately and a straight best-fit line drawn", "The line passes through (or very close to) the origin, showing rate is directly proportional to [HCl]"], modelAnswer: "Plot rate / cm³ s⁻¹ (y-axis) against [HCl] / mol dm⁻³ (x-axis), with scales chosen so the points cover more than half the grid. The points lie close to a straight line through the origin, drawn as a best-fit line, showing that the rate is directly proportional to the acid concentration." }),
        P.num({ label: "(f)", marks: 2, stem: "Calculate the gradient of the best-fit line of rate against [HCl], in cm³ s⁻¹ per mol dm⁻³, to two significant figures.", value: fit.m, sf: 2, tol: 0.02, explanation: `From run 1 to run 5: (${sfStr(rates[0], 3)} − ${sfStr(rates[4], 3)}) ÷ (2.00 − 0.400) ≈ ${sfStr(fit.m, 2)}; a least-squares line gives ${sfStr(fit.m, 3)}.` }),
        P.mcq({ label: "(g)", marks: 1, stem: "What do the results show about the relationship between rate and the concentration of hydrochloric acid?", options: [
          ["The rate is directly proportional to [HCl].", "Correct: doubling [HCl] doubles the rate (straight line through the origin)."],
          ["The rate is proportional to [HCl]².", "Then doubling [HCl] would quadruple the rate; run 4 → run 2 only doubles it."],
          ["The rate does not depend on [HCl].", "The times change markedly with concentration."],
          ["The rate is inversely proportional to [HCl].", "The time is inversely proportional to [HCl]; the rate is directly proportional."],
        ], answer: "A", explanation: "Rate ∝ [HCl]." }),
        P.num({ label: "(h)", marks: 2, stem: "Use your gradient to predict the time to collect 10.0 cm³ of hydrogen with 1.00 mol dm⁻³ HCl, in s.", value: tPred, tol: 1.5, unit: "s", explanation: `Rate ≈ ${sfStr(fit.m, 2)} × 1.00 = ${sfStr(fit.m, 2)} cm³ s⁻¹; time = 10.0 ÷ ${sfStr(fit.m, 2)} ≈ ${dpStr(tPred, 0)} s.` }),
        P.manual({ label: "(i)", marks: 3, stem: "Identify one systematic error and one random error in this experiment, explaining the effect of each.", points: ["Systematic: e.g. some hydrogen escapes before the bung is replaced, or the syringe plunger sticks (volume too low/time too long in every run), or an oxide layer on Mg", "Random: e.g. judging the exact moment the syringe reads 10.0 cm³ and starting/stopping the watch (reaction time)", "Effect stated: systematic errors shift all results the same way; random errors scatter points about the line"], modelAnswer: "Systematic error: a little hydrogen escapes while the bung is being put back, so each time is slightly too long and every rate slightly too low. Random error: the moment at which the syringe reads 10.0 cm³ and the stopwatch timing are judged by eye, so readings scatter either side of the true value; this is largest for the short times." }),
        P.manual({ label: "(j)", marks: 3, stem: "Suggest three improvements to the method.", points: ["Put the magnesium in a small tube inside the flask (or use a divided flask) and tip it in after the bung is fitted, so no gas escapes", "Collect a larger volume or use more dilute acid so the shortest times are longer (smaller percentage uncertainty), or use a data logger with a pressure/volume sensor", "Use magnesium cut from the same roll and cleaned in the same way; use a water bath to keep the temperature constant; repeat each run and average"], modelAnswer: "Suspend the magnesium in a small tube in the flask and tip it in after the bung is secure, so no hydrogen is lost. Use a data logger or record volume against time and measure the initial gradient, or make the runs longer, to reduce timing uncertainty. Cut all ribbon from the same cleaned roll, keep the flask in a water bath at a constant temperature, and repeat each run to obtain a mean." }),
        P.manual({ label: "(k)", marks: 2, stem: "Explain why the rate calculated as 10.0/time is a good estimate of the initial rate in this experiment.", points: ["Only a small part of the reaction occurs while 10.0 cm³ is collected (the acid is in large excess and most of the Mg remains)", "so the concentration of acid and the surface area of magnesium hardly change, and the rate is almost constant over this period"], modelAnswer: "The acid is in large excess and collecting only 10.0 cm³ uses a small fraction of the magnesium, so the acid concentration and the magnesium surface area change very little during the measurement; the average rate over this short period is therefore close to the initial rate." }),
        P.manual({ label: "(l)", marks: 1, stem: "State one safety precaution, with a reason.", points: ["Hydrogen is flammable: keep flames away (or wear eye protection because the acid is an irritant)"], modelAnswer: "Keep naked flames away because hydrogen is flammable." }),
      ]),
      hints: ["Rate = 10.0 ÷ time.", "Concentration = 2.00 × volume of acid ÷ 50.0."],
      explanation: `[HCl] in run 3 = ${sfStr(conc[2], 3)} mol dm⁻³; rate in run 2 = ${sfStr(rates[1], 3)} cm³ s⁻¹; rate ∝ [HCl], gradient ≈ ${sfStr(fit.m, 2)}; predicted time with 1.00 mol dm⁻³ ≈ ${dpStr(tPred, 0)} s.`,
    });
  }

  // ---------------------------------------------------------------- C2 (Paper 5): lg rate against lg concentration
  {
    const xs = [0.05, 0.075, 0.1, 0.15, 0.2, 0.25];
    const f = [1.02, 0.97, 1.3, 1.01, 0.98, 1.03];
    const r = xs.map((x, i) => Number((0.04 * x * x * f[i]).toPrecision(3)));
    const lgX = xs.map((x) => Math.log10(x));
    const lgR = r.map((y) => Math.log10(y));
    const fit = linearFit(lgX.map((x, i) => [x, lgR[i]]).filter((_, i) => i !== 2));
    const k = 10 ** fit.c;
    b.struct({
      ...P5, d: 5, calculator: true,
      concepts: [A("kinetics.rate-equations"), A("skills.planning-evaluation")],
      stem: `A student measured the initial rate of a reaction of a substance X at six different concentrations of X, with all other reactants in large excess, at constant temperature. The rate equation is expected to be rate = k[X]ⁿ.

| [X] / mol dm⁻³ | ${xs.map((x) => sfStr(x, 2)).join(" | ")} |
|---|---|---|---|---|---|---|
| initial rate / mol dm⁻³ s⁻¹ | ${r.map((y) => sciStr(y, 3)).join(" | ")} |
| lg([X] / mol dm⁻³) | ${lgX.map((x, i) => (i === 3 ? "?" : dpStr(x, 3))).join(" | ")} |
| lg(rate / mol dm⁻³ s⁻¹) | ${lgR.map((y, i) => (i === 3 ? "?" : dpStr(y, 3))).join(" | ")} |`,
      parts: checkExam(EXAM.CAM_P5_ANALYSIS, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate lg(rate) for [X] = 0.15 mol dm⁻³, to three decimal places.", value: lgR[3], dp: 3, wrong: [dpStr(Math.log(r[3]), 3)], explanation: `lg(${sciStr(r[3], 3)}) = ${dpStr(lgR[3], 3)}.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Explain why a graph of lg(rate) against lg[X] should be a straight line, and what its gradient and intercept represent.", points: ["Taking logs of rate = k[X]ⁿ gives lg(rate) = n lg[X] + lg k, which has the form y = mx + c", "Gradient = n (the order with respect to X); intercept (at lg[X] = 0) = lg k"], modelAnswer: "lg(rate) = n lg[X] + lg k, which is of the form y = mx + c with y = lg(rate) and x = lg[X]. So the graph is a straight line whose gradient is the order n and whose y-intercept is lg k." }),
        P.manual({ label: "(c)", marks: 2, stem: "Identify the anomalous result and suggest one reason for it.", points: ["The result at [X] = 0.10 mol dm⁻³ (rate too high; it lies well above the line through the other points)", "e.g. the temperature was higher in that run, or a volume was measured incorrectly / the timing was started late or stopped early"], modelAnswer: "The rate at 0.10 mol dm⁻³ is anomalous: its point lies well above the line through the other five. A possible reason is that this run was at a slightly higher temperature, or that too much of a reactant was added." }),
        P.num({ label: "(d)", marks: 2, stem: "Using the five non-anomalous results, determine the gradient of the line of lg(rate) against lg[X], to two significant figures.", value: fit.m, sf: 2, tol: 0.1, explanation: `For example, between [X] = 0.050 and 0.25: (${dpStr(lgR[5], 3)} − (${dpStr(lgR[0], 3)})) ÷ (${dpStr(lgX[5], 3)} − (${dpStr(lgX[0], 3)})) ≈ ${sfStr(fit.m, 2)}.` }),
        P.num({ label: "(e)", marks: 1, stem: "Deduce the order of reaction with respect to X.", value: 2, wrong: [1], explanation: "The gradient is 2.0 to two significant figures, so the reaction is second order in X." }),
        P.num({ label: "(f)", marks: 2, stem: "The best-fit line has a y-intercept, lg k, which you can find by substituting a point on the line into lg(rate) = n lg[X] + lg k. Calculate k, in dm³ mol⁻¹ s⁻¹, to two significant figures.", value: k, sf: 2, tol: 0.005, unit: "dm³/mol/s", explanation: `lg k = lg(rate) − 2 lg[X]; for example at [X] = 0.20: ${dpStr(lgR[4], 3)} − 2(${dpStr(lgX[4], 3)}) = ${dpStr(lgR[4] - 2 * lgX[4], 3)}; k = 10^(${dpStr(fit.c, 2)}) ≈ ${sfStr(k, 2)} dm³ mol⁻¹ s⁻¹.` }),
        P.num({ label: "(g)", marks: 1, stem: "The initial rate in each run was found from a time of about 50 s measured to ±0.5 s. Calculate the percentage uncertainty in this time.", value: pctError(0.5, 50), sf: 2, unit: "%", explanation: "0.5 ÷ 50 × 100 = 1.0%." }),
        P.manual({ label: "(h)", marks: 2, stem: "State a conclusion and comment on how confident you can be in it.", points: ["The reaction is second order with respect to X (rate = k[X]²)", "Confidence is reasonable because five points lie close to a straight line with gradient close to 2, but only one experiment per concentration (no repeats) and one anomaly reduce confidence"], modelAnswer: "The reaction is second order in X, rate = k[X]². Five of the six points lie close to a straight line of gradient about 2.0, so the conclusion is well supported, but each concentration was tested only once and one result was anomalous, so repeats would increase confidence." }),
        P.manual({ label: "(i)", marks: 2, stem: "Suggest two improvements to the investigation.", points: ["Repeat each concentration (at least twice) and use mean rates; repeat the anomalous run", "Control the temperature with a thermostatted water bath / extend the range of [X] / use a colorimeter or data logger for more precise initial rates"], modelAnswer: "Repeat each run and average the rates, including repeating the anomalous one; keep all solutions in a thermostatted water bath, and measure the initial rates with a colorimeter and data logger rather than by eye." }),
      ]),
      hints: ["lg(rate) = n lg[X] + lg k.", "Leave out the anomalous point when drawing the line."],
      explanation: `lg(rate) at 0.15 mol dm⁻³ = ${dpStr(lgR[3], 3)}; anomaly at 0.10 mol dm⁻³; gradient ≈ ${sfStr(fit.m, 2)}, so second order; k ≈ ${sfStr(k, 2)} dm³ mol⁻¹ s⁻¹.`,
    });
  }
});
