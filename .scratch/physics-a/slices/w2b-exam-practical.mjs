// W2b practical exam rows: PRACTICAL_GRAPH (e.m.f. and internal resistance from V against I), PRACTICAL_EVALUATION
// (capacitor discharge half-time with a stop-watch at two resistances), DATA_ANALYSIS (ln V against t for a discharging
// capacitor, C with its uncertainty from worst lines).
import { concept, P, t, chk, EXAM, checkExam, sfStr, dpStr, sciTex, ln, linFit, worstLines, mean, halfRange, pctUnc, pctDifference, table } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const u = 1e-6;

concept(A("circuits.emf-internal-resistance"), { file: "exam/w2b-practical", keyPrefix: "exam.w2b-practical" }, (b) => {
  // ---------------------------------------------------------------- PRACTICAL_GRAPH: E and r of a pair of cells
  {
    const I = [0.12, 0.22, 0.32, 0.42, 0.52, 0.62];
    const Etrue = 3.12, rtrue = 1.65;
    const n1 = [0.02, -0.01, 0.01, -0.02, 0.01, 0.00];
    const n2 = [0.00, 0.01, -0.01, 0.00, -0.02, 0.02];
    const V1 = I.map((x, i) => Math.round((Etrue - rtrue * x + n1[i]) * 100) / 100);
    const V2 = I.map((x, i) => Math.round((Etrue - rtrue * x + n2[i]) * 100) / 100);
    const Vm = V1.map((v, i) => (v + V2[i]) / 2);
    const fit = linFit(I, Vm);
    const E = fit.c, r = -fit.m;
    const row = 3;
    const tab = table([t`$I\,/\,\text{A}$`, t`$V_1\,/\,\text{V}$`, t`$V_2\,/\,\text{V}$`], I.map((x, i) => [dpStr(x, 2), dpStr(V1[i], 2), dpStr(V2[i], 2)]));
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_GRAPH.skill, secs: EXAM.PRACTICAL_GRAPH.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("circuits.emf-internal-resistance"), A("skills.tables-graphs")],
      stem: t`In this experiment you determine the e.m.f. $E$ and internal resistance $r$ of two dry cells in series.

**Method.** (1) Connect the cells in series with a switch, an ammeter, a $1.0\ \Omega$ protective resistor and a rheostat. Connect a digital voltmeter directly across the terminals of the pair of cells. (2) Close the switch, adjust the rheostat until the ammeter reads $I = 0.12\ \text{A}$, and record the voltmeter reading $V_1$; open the switch. (3) Repeat for currents up to $0.62\ \text{A}$. (4) Repeat the whole set to obtain $V_2$. Nyasha's results are:

${tab}

The terminal p.d. is expected to be $V = E - rI$.`,
      parts: checkExam(EXAM.PRACTICAL_GRAPH, [
        P.num({ label: "(a)", marks: 1, stem: t`For $I = 0.42\ \text{A}$, use half the difference between $V_1$ and $V_2$ to estimate the absolute uncertainty in the mean terminal p.d., in V.`, value: halfRange([V1[row], V2[row]]), dp: 2, unit: "V", wrong: [Math.abs(V1[row] - V2[row])], explanation: t`$\tfrac{1}{2}|${dpStr(V1[row], 2)} - ${dpStr(V2[row], 2)}| = ${dpStr(halfRange([V1[row], V2[row]]), 2)}\ \text{V}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Describe how you would extend the table to include the mean terminal p.d., with headings and precision.", points: ["Add a column headed mean V / V (quantity / unit, as for the other columns).", "Mean values recorded to the same precision as the raw readings (2 or 3 decimal places, e.g. 2.465 or 2.47)."], modelAnswer: "Add a fourth column headed mean V / V. Record each mean to the precision of the readings, 0.01 V (or one more decimal place when the average ends in 5)." }),
        P.group({ label: "(c)", stem: "Processing.", parts: [
          P.num({ label: "(i)", marks: 1, stem: t`Calculate the mean terminal p.d. for $I = 0.22\ \text{A}$, in V.`, value: Vm[1], dp: 3, unit: "V", wrong: [V1[1]], explanation: t`$(${dpStr(V1[1], 2)} + ${dpStr(V2[1], 2)})/2 = ${dpStr(Vm[1], 3)}\ \text{V}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`Calculate the power delivered to the external circuit for $I = 0.62\ \text{A}$, using the mean p.d., in W, to three significant figures.`, value: Vm[5] * I[5], unit: "W", wrong: [Etrue * I[5]], explanation: t`$P = VI = ${dpStr(Vm[5], 3)} \times 0.62 = ${sfStr(Vm[5] * I[5], 3)}\ \text{W}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: t`Calculate the lost volts at $I = 0.62\ \text{A}$ if $E = 3.12\ \text{V}$, in V.`, value: 3.12 - Vm[5], dp: 2, unit: "V", wrong: [Vm[5]], explanation: t`Lost volts $= E - V = 3.12 - ${dpStr(Vm[5], 3)} = ${dpStr(3.12 - Vm[5], 2)}\ \text{V}$.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, stem: t`Plot the mean $V$ / V against $I$ / A, draw the line of best fit and determine its gradient, in $\text{V A}^{-1}$.`, value: fit.m, tol: 0.1, wrong: [-fit.m], explanation: t`A best-fit line through the six points has a gradient of about $${dpStr(fit.m, 2)}\ \text{V A}^{-1}$ (a careful line gives within 0.1 of this). Use a triangle covering more than half the line.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Determine the intercept of your line on the $V$-axis, in V.`, value: E, tol: 0.04, unit: "V", wrong: [Vm[0]], explanation: t`The $V$-axis starts at $I = 0$; reading or $c = y - mx$ gives about $${dpStr(E, 2)}\ \text{V}$.` }),
        P.group({ label: "(f)", stem: "Use your answers to (d) and (e) to determine:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "the internal resistance r of the pair of cells, in Ω", value: r, tol: 0.1, unit: "Ω", wrong: [fit.m, 1 / r], explanation: t`$r = -\text{gradient} \approx ${dpStr(r, 2)}\ \Omega$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "the e.m.f. E, in V", value: E, tol: 0.04, unit: "V", wrong: [Etrue * 2], explanation: t`$E$ equals the intercept, about $${dpStr(E, 2)}\ \text{V}$.` }),
        ] }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why the switch is opened between readings and why a protective resistor is included.", points: ["Opening the switch stops the cells warming up and running down, which would change E and r during the experiment.", "The protective resistor limits the current if the rheostat is set to zero, protecting the cells and the ammeter (and avoiding a short circuit)."], modelAnswer: "Opening the switch between readings stops the cells heating up and discharging, which would change their e.m.f. and internal resistance during the experiment. The protective resistor prevents a short circuit (a very large current) if the rheostat is turned to zero." }),
        P.manual({ label: "(h)", marks: 2, stem: "Identify two sources of uncertainty in this experiment.", points: ["The e.m.f. and internal resistance drift as the cells warm or discharge (the two sets of readings differ).", "Difficulty setting the current exactly to each value / fluctuating meter readings; resolution of the ammeter (0.01 A) is a large fraction of the smallest current (0.12 A)."], modelAnswer: "The cells' e.m.f. and internal resistance change slightly as they warm and discharge, so repeated readings differ; and the current is hard to set exactly and the readings fluctuate, with the ammeter's 0.01 A resolution a large percentage of the 0.12 A reading." }),
        P.manual({ label: "(i)", marks: 2, stem: "Suggest two improvements to the experiment.", points: ["Take readings quickly with the switch closed only briefly, and allow the cells to recover between readings (or use a data logger to record V and I together).", "Take more readings over a wider range of current (e.g. 0.05 A to 0.80 A) and repeat each more times; use a milliammeter for the small currents."], modelAnswer: "Close the switch only long enough to take each reading, letting the cells recover in between (or record V and I simultaneously with data loggers), and take more readings over a wider current range, repeating each several times." }),
      ]),
      explanation: "V = E − rI: the intercept is E and the gradient is −r.",
      hints: ["The intercept on the V-axis is E.", "r = −gradient."],
    });
  }

  // ---------------------------------------------------------------- PRACTICAL_EVALUATION: capacitor half-time at two resistances
  {
    const R1 = 47e3, R2 = 100e3, dRpct = 2;
    const t1 = [15.8, 15.2, 16.1];
    const t2 = [33.0, 32.1, 33.6];
    const T1 = mean(t1), T2 = mean(t2);
    const dT1 = halfRange(t1);
    const C1 = T1 / (Math.LN2 * R1), C2 = T2 / (Math.LN2 * R2);
    const pctT1 = pctUnc(dT1, T1);
    const pctC1 = pctT1 + dRpct;
    const pd = pctDifference(C1, C2);
    const agree = pd <= pctC1;
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_EVALUATION.skill, secs: EXAM.PRACTICAL_EVALUATION.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("capacitance.discharge"), A("skills.evaluation-improvements")],
      stem: t`Tatenda investigates the discharge of a capacitor of capacitance $C$ through a resistor of resistance $R$. He charges the capacitor to $6.0\ \text{V}$ with a battery, then moves a two-way switch so that the capacitor discharges through $R$, starting a stop-watch at the same moment. He stops the watch when an analogue voltmeter connected across the capacitor reads $3.0\ \text{V}$. The time $t$ is expected to be $t = RC\ln 2$. Each resistor has a tolerance of $\pm ${dRpct}\%$.

| $R\,/\,\text{k}\Omega$ | $t\,/\,\text{s}$ (three trials) |
| --- | --- |
| 47 | ${t1.map((x) => x.toFixed(1)).join(", ")} |
| 100 | ${t2.map((x) => x.toFixed(1)).join(", ")} |`,
      parts: checkExam(EXAM.PRACTICAL_EVALUATION, [
        P.group({ label: "(a)", stem: t`For $R = 47\ \text{k}\Omega$:`, parts: [
          P.num({ label: "(i)", marks: 1, stem: "calculate the absolute uncertainty in t using half the range of the trials, in s", value: dT1, dp: 2, unit: "s", wrong: [dT1 * 2], explanation: t`$(16.1 - 15.2)/2 = ${dpStr(dT1, 2)}\ \text{s}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "calculate the percentage uncertainty in the mean value of t, to two significant figures", value: pctT1, sf: 2, unit: "%", wrong: [pctUnc(dT1, 15.2)], explanation: t`Mean $t = ${sfStr(T1, 3)}\ \text{s}$; $\dfrac{${dpStr(dT1, 2)}}{${sfStr(T1, 3)}} \times 100 = ${sfStr(pctT1, 2)}\%$.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate C, in µF, to three significant figures:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`for $R = 47\ \text{k}\Omega$`, value: C1 / u, unit: "µF", wrong: [T1 / R1 / u], explanation: t`$C = \dfrac{t}{R\ln 2} = \dfrac{${sfStr(T1, 3)}}{47 \times 10^{3} \times 0.693} = ${sfStr(C1 / u, 3)}\ \mu\text{F}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`for $R = 100\ \text{k}\Omega$`, value: C2 / u, unit: "µF", wrong: [T2 / R2 / u], explanation: t`Mean $t = ${sfStr(T2, 3)}\ \text{s}$; $C = \dfrac{${sfStr(T2, 3)}}{100 \times 10^{3} \times 0.693} = ${sfStr(C2 / u, 3)}\ \mu\text{F}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the percentage uncertainty in $C$ for $R = 47\ \text{k}\Omega$ (add the percentage uncertainties in $t$ and $R$), to two significant figures.`, value: pctC1, sf: 2, unit: "%", wrong: [pctT1], explanation: t`$${sfStr(pctT1, 2)}\% + ${dRpct}\% = ${sfStr(pctC1, 2)}\%$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage difference between your two values of C (difference ÷ mean × 100), to two significant figures.", value: pd, sf: 2, unit: "%", wrong: [Math.abs(C1 - C2) / u], explanation: t`$\dfrac{|${sfStr(C1 / u, 3)} - ${sfStr(C2 / u, 3)}|}{\text{mean}} \times 100 = ${sfStr(pd, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State whether the results support the suggestion that t = RC ln 2 with C constant. Explain your answer.", points: [agree ? t`The percentage difference (${sfStr(pd, 2)}%) is less than the percentage uncertainty (${sfStr(pctC1, 2)}%).` : t`The percentage difference (${sfStr(pd, 2)}%) is greater than the percentage uncertainty (${sfStr(pctC1, 2)}%).`, agree ? "So the two values of C agree within the uncertainty: the results support the relationship (but two values are not enough to be sure)." : "So the values do not agree within the uncertainty: the results do not support the relationship."], modelAnswer: agree ? t`The values of C differ by ${sfStr(pd, 2)}%, less than the ${sfStr(pctC1, 2)}% uncertainty, so they agree within experimental uncertainty and support the relationship, although two values are too few for a firm conclusion.` : t`The values of C differ by ${sfStr(pd, 2)}%, more than the ${sfStr(pctC1, 2)}% uncertainty, so the results do not support the relationship.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Identify four sources of uncertainty or limitations of this procedure.", points: [
          "Only two values of R / two sets of readings: too few to draw a valid conclusion.",
          "Reaction time in starting and stopping the stop-watch is significant compared with times of about 15 s.",
          "Hard to judge exactly when the analogue voltmeter needle passes 3.0 V (moving needle, parallax).",
          "The voltmeter's own resistance is in parallel with R, so the capacitor discharges partly through the meter (effective R smaller); or the capacitor leaks / C has a large tolerance.",
        ], modelAnswer: "Only two resistances were used, which is not enough for a firm conclusion. Reaction time in starting and stopping the watch is a noticeable fraction of a 15 s interval. It is hard to judge the moment the moving needle passes 3.0 V, with parallax. The voltmeter's resistance is in parallel with R, so some charge flows through the meter and the effective resistance is less than R." }),
        P.manual({ label: "(g)", marks: 4, stem: "Suggest an improvement for each limitation in (f).", points: [
          "Use at least five different values of R and plot t against R (a straight line through the origin of gradient C ln 2).",
          "Use larger R (longer times) so reaction time is a smaller fraction, or time with a data logger / video of a stop-watch beside the meter.",
          "Use a digital voltmeter, or a data logger with voltage sensor, to identify the 3.0 V point precisely.",
          "Use a voltmeter (or logger) of very high resistance compared with R, e.g. a digital meter of 10 MΩ.",
        ], modelAnswer: "Take readings for at least five resistances and plot t against R, finding C from the gradient (C ln 2). Use larger resistances so the times are longer, or record the discharge with a data logger to remove reaction time. Use a digital voltmeter or logger so the 3.0 V point is clear. Use a meter whose resistance is very much larger than R, such as a 10 MΩ digital meter." }),
      ]),
      explanation: "t = RC ln 2, so C = t/(R ln 2) for each resistor; compare the percentage difference with the percentage uncertainty.",
      hints: ["Uncertainty = half the range of the trials.", "Percentage uncertainties add for a quotient."],
    });
  }

  // ---------------------------------------------------------------- DATA_ANALYSIS: ln V against t, C with uncertainty
  {
    const R = 22.0e3, Ct = 2200 * u, V0 = 10.0;
    const RC = R * Ct;
    const ts = [10, 20, 30, 40, 50, 60];
    const nz = [0.03, -0.04, 0.02, 0.03, -0.02, 0.01];
    const dV = 0.05;
    const Vs = ts.map((x, i) => Math.round((V0 * Math.exp(-x / RC) + nz[i]) * 100) / 100);
    const Y = Vs.map(ln);
    const dY = Vs.map((v) => (ln(v + dV) - ln(v - dV)) / 2);
    const pts = ts.map((x, i) => ({ x, y: Y[i], dy: dY[i] }));
    const fit = linFit(ts, Y);
    const w = worstLines(pts);
    const dm = Math.max(Math.abs(fit.m - w.steep.m), Math.abs(fit.m - w.shallow.m));
    const C = -1 / (fit.m * R);
    const dC = C * (dm / Math.abs(fit.m));
    const V0fit = Math.exp(fit.c);
    const row = 4;
    const tab = table([t`$t\,/\,\text{s}$`, t`$V\,/\,\text{V}$`, t`$\ln(V/\text{V})$`], ts.map((x, i) => [String(x), `${dpStr(Vs[i], 2)} ± ${dV}`, i === row ? "" : `${dpStr(Y[i], 3)} ± ${dpStr(dY[i], 3)}`]));
    b.struct({
      d: 5, examStyle: true, skill: EXAM.DATA_ANALYSIS.skill, secs: EXAM.DATA_ANALYSIS.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: true,
      concepts: [A("capacitance.discharge"), A("skills.data-analysis")],
      stem: t`A capacitor of capacitance $C$, charged to an initial p.d. $V_0$, discharges through a resistor of resistance $R = 22.0\ \text{k}\Omega$. The p.d. $V$ is recorded at times $t$ by a data logger. It is suggested that

$$
V = V_0\,e^{-t/RC}
$$

${tab}`,
      parts: checkExam(EXAM.DATA_ANALYSIS, [
        P.manual({ label: "(a)", marks: 1, stem: "State the graph that should be plotted to give a straight line, and how C is found from it.", points: [t`Plot $\ln V$ against $t$: gradient $= -\dfrac{1}{RC}$, so $C = -\dfrac{1}{R \times \text{gradient}}$ (intercept $= \ln V_0$).`], modelAnswer: t`Plot $\ln(V/\text{V})$ against $t$; the gradient is $-1/RC$, so $C = -1/(R \times \text{gradient})$, and the intercept is $\ln V_0$.` }),
        P.group({ label: "(b)", stem: t`Complete the row for $t = ${ts[row]}\ \text{s}$.`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$\ln(V/\text{V})$, to three decimal places`, value: Y[row], dp: 3, wrong: [Math.log10(Vs[row])], explanation: t`$\ln ${dpStr(Vs[row], 2)} = ${dpStr(Y[row], 3)}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`the absolute uncertainty in $\ln(V/\text{V})$, to three decimal places`, value: dY[row], tol: 0.002, wrong: [dV], explanation: t`$\tfrac{1}{2}[\ln(${dpStr(Vs[row] + dV, 2)}) - \ln(${dpStr(Vs[row] - dV, 2)})] = ${dpStr(dY[row], 3)}$ (or $\Delta V/V = 0.05/${dpStr(Vs[row], 2)}$).` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Plot the graph with error bars, draw the best-fit line and determine its gradient, in $\text{s}^{-1}$.`, value: fit.m, tol: 0.0008, wrong: [-fit.m], explanation: t`Best-fit gradient $\approx ${sciTex(fit.m, 3)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Draw the worst acceptable line and determine the absolute uncertainty in the gradient, in $\text{s}^{-1}$.`, value: dm, tol: 0.00015, wrong: [Math.abs(fit.m)], explanation: t`Worst lines through all the error bars have gradients of about $${sciTex(w.shallow.m, 3)}$ and $${sciTex(w.steep.m, 3)}\ \text{s}^{-1}$; uncertainty $\approx ${sciTex(dm, 2)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Determine C, in µF.", value: C / u, tol: 90, unit: "µF", wrong: [(-fit.m * R) / u], explanation: t`$C = -\dfrac{1}{R \times \text{gradient}} = \dfrac{1}{22.0 \times 10^{3} \times ${sciTex(-fit.m, 3)}} = ${sciTex(C, 3)}\ \text{F} \approx ${sfStr(C / u, 3)}\ \mu\text{F}$.` }),
        P.num({ label: "(f)", marks: 1, stem: "Determine the absolute uncertainty in C, in µF.", value: dC / u, tol: 16, unit: "µF", wrong: [dm / u], explanation: t`Fractional uncertainty in C equals that in the gradient: $\dfrac{${sciTex(dm, 2)}}{${sciTex(-fit.m, 3)}} \times ${sfStr(C / u, 3)} \approx ${sfStr(dC / u, 2)}\ \mu\text{F}$ (the uncertainty in R, given to 3 s.f., is small).` }),
        P.num({ label: "(g)", marks: 2, stem: t`Use the intercept of your line to determine $V_0$, in V.`, value: V0fit, tol: 0.3, unit: "V", wrong: [fit.c], explanation: t`Intercept $\approx ${dpStr(fit.c, 3)}$, so $V_0 = e^{${dpStr(fit.c, 3)}} \approx ${sfStr(V0fit, 3)}\ \text{V}$. The intercept is $\ln V_0$, not $V_0$.` }),
        P.manual({ label: "(h)", marks: 2, stem: "The capacitor is marked 2200 µF ± 10%. Discuss whether your result agrees with the marking.", points: [t`Your range: $C = ${sfStr(C / u, 3)} \pm ${sfStr(dC / u, 2)}\ \mu\text{F}$; the marking allows 1980 to 2420 µF.`, "The ranges overlap, so the result is consistent with the marked value."], modelAnswer: t`The experiment gives $C \approx ${sfStr(C / u, 3)} \pm ${sfStr(dC / u, 2)}\ \mu\text{F}$, which overlaps the 1980-2420 µF range allowed by the marking, so it agrees.` }),
        P.manual({ label: "(i)", marks: 1, stem: t`Explain why the error bars on $\ln V$ become longer as $t$ increases.`, points: ["ΔV is constant (±0.05 V) but V decreases, so Δ(ln V) ≈ ΔV/V increases."], modelAnswer: "The absolute uncertainty in V is always ±0.05 V, but V gets smaller as t increases, so the uncertainty in ln V, about ΔV/V, gets larger." }),
      ]),
      explanation: t`$\ln V = \ln V_0 - t/RC$: gradient $-1/RC$ gives $C \approx ${sfStr(C / u, 3)}\ \mu\text{F}$; worst lines give its uncertainty.`,
      hints: ["Take natural logarithms of both sides.", "The worst line must pass through every error bar."],
    });
    chk(Math.abs(C / u - 2200) < 150 ? 1 : 0, 1);
  }
});
