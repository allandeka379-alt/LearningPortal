// W3b practical exam rows: PRACTICAL_GRAPH (length of a trapped air column against temperature, Charles's law),
// PRACTICAL_EVALUATION (specific heat capacity of water with an immersion heater at two masses), PLANNING (ripple of a
// smoothed rectifier against capacitance).
import { concept, P, t, chk, EXAM, checkExam, sfStr, dpStr, sciTex, linFit, mean, halfRange, pctUnc, pctDifference, table } from "../lib.mjs";

const A = (k) => `aphys.${k}`;

concept(A("gases.equation-of-state"), { file: "exam/w3b-practical", keyPrefix: "exam.w3b-practical" }, (b) => {
  // ---------------------------------------------------------------- PRACTICAL_GRAPH: Charles's law with a capillary tube
  {
    const th = [22, 35, 47, 60, 72, 85];
    const l0 = 52.0;
    const n1 = [0.2, -0.3, 0.1, 0.3, -0.2, 0.2];
    const n2 = [-0.3, 0.2, -0.2, -0.1, 0.3, -0.3];
    const half = (x) => Math.round(x * 2) / 2;
    const L1 = th.map((x, i) => half((l0 * (273.15 + x)) / 273.15 + n1[i]));
    const L2 = th.map((x, i) => half((l0 * (273.15 + x)) / 273.15 + n2[i]));
    const Lm = L1.map((v, i) => (v + L2[i]) / 2);
    const fit = linFit(th, Lm);
    const zero = -fit.c / fit.m;
    const row = 2;
    const tab = table([t`$\theta\,/\,^\circ\text{C}$`, t`$l_1\,/\,\text{mm}$ (heating)`, t`$l_2\,/\,\text{mm}$ (cooling)`], th.map((x, i) => [String(x), dpStr(L1[i], 1), dpStr(L2[i], 1)]));
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_GRAPH.skill, secs: EXAM.PRACTICAL_GRAPH.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("gases.equation-of-state"), A("skills.tables-graphs")],
      stem: t`In this experiment you investigate how the volume of a fixed mass of air at constant pressure depends on its temperature.

**Method.** (1) A column of dry air is trapped in a narrow glass capillary tube, sealed at the bottom, by a short bead of liquid; the open top keeps the air at atmospheric pressure. (2) The tube is fixed to a millimetre scale and placed upright in a beaker of water with a thermometer. (3) The water is heated slowly and stirred; at each temperature $\theta$ the length $l_1$ of the air column is read after the reading has become steady. (4) The water is then allowed to cool and the length $l_2$ is read at the same temperatures. Because the tube has a uniform bore, the volume of air is proportional to $l$. Rudo's results are:

${tab}

It is suggested that $l = l_0\left(1 + \dfrac{\theta}{T_0}\right)$, where $l_0$ is the length at $0\ ^\circ\text{C}$ and $-T_0$ is absolute zero in °C.`,
      parts: checkExam(EXAM.PRACTICAL_GRAPH, [
        P.num({ label: "(a)", marks: 1, stem: t`For $\theta = ${th[row]}\ ^\circ\text{C}$, use half the difference between $l_1$ and $l_2$ to estimate the absolute uncertainty in the mean length, in mm.`, value: halfRange([L1[row], L2[row]]), dp: 2, unit: "mm", wrong: [Math.abs(L1[row] - L2[row])], explanation: t`$\tfrac{1}{2}|${dpStr(L1[row], 1)} - ${dpStr(L2[row], 1)}| = ${dpStr(halfRange([L1[row], L2[row]]), 2)}\ \text{mm}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Describe how you would extend the table to include the mean length, with its heading and the precision of the values.", points: ["Add a column headed mean l / mm (quantity / unit).", "Values given to the precision of the raw readings, 0.1 mm or 0.05 mm (e.g. 60.75), consistently."], modelAnswer: "Add a fourth column headed mean l / mm and record each mean to the same precision as the readings, to 0.05 mm where the average ends in a half (e.g. 60.75)." }),
        P.group({ label: "(c)", stem: "Processing.", parts: [
          P.num({ label: "(i)", marks: 1, stem: t`Calculate the mean length for $\theta = ${th[4]}\ ^\circ\text{C}$, in mm.`, value: Lm[4], dp: 2, unit: "mm", wrong: [L1[4]], explanation: t`$(${dpStr(L1[4], 1)} + ${dpStr(L2[4], 1)})/2 = ${dpStr(Lm[4], 2)}\ \text{mm}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`Calculate the percentage uncertainty in the mean length for $\theta = ${th[row]}\ ^\circ\text{C}$, to two significant figures.`, value: pctUnc(halfRange([L1[row], L2[row]]), Lm[row]), sf: 2, unit: "%", wrong: [pctUnc(Math.abs(L1[row] - L2[row]), Lm[row])], explanation: t`$\dfrac{${dpStr(halfRange([L1[row], L2[row]]), 2)}}{${dpStr(Lm[row], 2)}} \times 100 = ${sfStr(pctUnc(halfRange([L1[row], L2[row]]), Lm[row]), 2)}\%$.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, stem: t`Plot the mean $l$ / mm against $\theta$ / °C, draw the line of best fit and determine its gradient, in mm per °C.`, value: fit.m, tol: 0.012, wrong: [1 / fit.m], explanation: t`A best-fit line through the six points has a gradient of about $${dpStr(fit.m, 3)}\ \text{mm}\ ^\circ\text{C}^{-1}$ (a careful line gives within about 0.01 of this). Use a triangle covering more than half the line.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Determine the intercept of your line on the $l$-axis at $\theta = 0$, in mm.`, value: fit.c, tol: 0.6, unit: "mm", wrong: [Lm[0]], explanation: t`The axis starts at $\theta = 22\ ^\circ\text{C}$, so use $c = y - mx$ with a point on the line: about $${dpStr(fit.c, 1)}\ \text{mm}$.` }),
        P.group({ label: "(f)", stem: "Use your answers to (d) and (e) to determine:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`$l_0$, in mm`, value: fit.c, tol: 0.6, unit: "mm", wrong: [fit.m], explanation: t`$l_0$ equals the intercept, about $${dpStr(fit.c, 1)}\ \text{mm}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`the value of absolute zero, $-T_0$, in °C, to three significant figures`, value: zero, tol: 25, unit: "°C", wrong: [-zero], explanation: t`Gradient $= \dfrac{l_0}{T_0}$, so $T_0 = \dfrac{l_0}{\text{gradient}} \approx \dfrac{${dpStr(fit.c, 1)}}{${dpStr(fit.m, 3)}} = ${sfStr(-zero, 3)}$; absolute zero $\approx ${sfStr(zero, 3)}\ ^\circ\text{C}$.` }),
        ] }),
        P.manual({ label: "(g)", marks: 2, stem: "Explain why the water is stirred and the reading taken only when it is steady, and why readings are taken while heating and while cooling.", points: ["Stirring and waiting ensure the air in the tube has reached the same temperature as the thermometer (thermal equilibrium).", "On heating the air lags behind the water (reads short) and on cooling it lags the other way, so averaging l₁ and l₂ cancels much of this lag."], modelAnswer: "Stirring gives a uniform water temperature, and waiting until the length is steady ensures the air is at the thermometer's temperature. While heating, the air lags behind the water and the column is slightly short; while cooling it is slightly long; averaging the two reduces this error." }),
        P.manual({ label: "(h)", marks: 2, stem: "Identify two sources of uncertainty in this experiment.", points: ["Difficulty reading the ends of the air column (curved meniscus of the bead, parallax, the bead's thickness).", "The air may not be at the water temperature (lag) / part of the tube is above the water / the air may contain water vapour, so its volume is not proportional to l or T."], modelAnswer: "The ends of the air column are hard to judge precisely because of the curved meniscus and parallax against the scale; and the air may not be at the measured water temperature, especially the part of the tube above the water surface." }),
        P.manual({ label: "(i)", marks: 2, stem: "Suggest two improvements.", points: ["Use a magnifying glass or travelling microscope (with a set square at eye level) to read the column length.", "Immerse the whole air column fully in the bath and wait longer at each temperature / use a temperature sensor and data logger / take more temperatures over a wider range (e.g. 0 °C to 95 °C)."], modelAnswer: "Read the column with a magnifying lens or travelling microscope to reduce parallax, and make sure the whole air column is under the water, waiting several minutes at each temperature (or taking readings over a wider range from 0 °C to 95 °C)." }),
      ]),
      explanation: "l against θ is a straight line with intercept l₀ and gradient l₀/T₀; extrapolating to l = 0 gives absolute zero.",
      hints: ["The intercept at θ = 0 is l₀.", "T₀ = l₀ ÷ gradient."],
    });
    chk(Math.abs(zero + 273) < 15 ? 1 : 0, 1);
  }

  // ---------------------------------------------------------------- PRACTICAL_EVALUATION: specific heat capacity of water at two masses
  {
    const V = 12.0, I = 4.10, dT = 10.0;
    const m1 = 0.200, m2 = 0.400;
    const t1 = [201.8, 206.4, 203.1], t2 = [391.0, 396.5, 393.2];
    const T1 = mean(t1), T2 = mean(t2);
    const dt1 = halfRange(t1);
    const c1 = (V * I * T1) / (m1 * dT), c2 = (V * I * T2) / (m2 * dT);
    const pT = pctUnc(dt1, T1), pTh = pctUnc(1.0, dT);
    const pc = pT + pTh;
    const pd = pctDifference(c1, c2);
    const agree = pd <= pc;
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_EVALUATION.skill, secs: EXAM.PRACTICAL_EVALUATION.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("thermal.specific-heat-latent-heat"), A("skills.evaluation-improvements")],
      stem: t`Farai investigates the heating of water by a $12\ \text{V}$ immersion heater in a plastic cup. He measures a mass $m$ of water into the cup, records its temperature with a thermometer reading to $0.5\ ^\circ\text{C}$, switches on the heater, stirs, and times how long the temperature takes to rise by $10.0\ ^\circ\text{C}$. The voltmeter reads $12.0\ \text{V}$ and the ammeter $4.10\ \text{A}$ throughout. It is suggested that $VIt = mc\Delta\theta$, where $c$ is a constant.

| $m\,/\,\text{kg}$ | $t\,/\,\text{s}$ (three trials) |
| --- | --- |
| 0.200 | ${t1.map((x) => x.toFixed(1)).join(", ")} |
| 0.400 | ${t2.map((x) => x.toFixed(1)).join(", ")} |`,
      parts: checkExam(EXAM.PRACTICAL_EVALUATION, [
        P.group({ label: "(a)", stem: t`For $m = 0.200\ \text{kg}$:`, parts: [
          P.num({ label: "(i)", marks: 1, stem: "calculate the absolute uncertainty in t using half the range of the trials, in s", value: dt1, dp: 1, unit: "s", wrong: [dt1 * 2], explanation: t`$(206.4 - 201.8)/2 = ${dpStr(dt1, 1)}\ \text{s}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "calculate the percentage uncertainty in the mean value of t, to two significant figures", value: pT, sf: 2, unit: "%", wrong: [pctUnc(dt1, 201.8)], explanation: t`Mean $t = ${sfStr(T1, 4)}\ \text{s}$; $\dfrac{${dpStr(dt1, 1)}}{${sfStr(T1, 4)}} \times 100 = ${sfStr(pT, 2)}\%$.` }),
        ] }),
        P.group({ label: "(b)", stem: t`Calculate $c$, in $\text{J kg}^{-1}\ \text{K}^{-1}$, to three significant figures:`, parts: [
          P.num({ label: "(i)", marks: 2, stem: t`for $m = 0.200\ \text{kg}$`, value: c1, unit: "J/(kg K)", wrong: [(V * I * T1) / m1], explanation: t`$c = \dfrac{VIt}{m\Delta\theta} = \dfrac{12.0 \times 4.10 \times ${sfStr(T1, 4)}}{0.200 \times 10.0} = ${sfStr(c1, 3)}\ \text{J kg}^{-1}\ \text{K}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`for $m = 0.400\ \text{kg}$`, value: c2, unit: "J/(kg K)", wrong: [(V * I * T2) / (m1 * dT)], explanation: t`Mean $t = ${sfStr(T2, 4)}\ \text{s}$; $c = \dfrac{12.0 \times 4.10 \times ${sfStr(T2, 4)}}{0.400 \times 10.0} = ${sfStr(c2, 3)}\ \text{J kg}^{-1}\ \text{K}^{-1}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`The temperature rise is the difference of two readings, each $\pm 0.5\ ^\circ\text{C}$. Calculate the percentage uncertainty in $c$ for $m = 0.200\ \text{kg}$ by adding the percentage uncertainties in $t$ and $\Delta\theta$ (assume $V$, $I$ and $m$ are precise), to two significant figures.`, value: pc, sf: 2, unit: "%", wrong: [pT + pctUnc(0.5, dT)], explanation: t`$\Delta\theta$: $\dfrac{1.0}{10.0} \times 100 = 10\%$; total $= ${sfStr(pT, 2)} + 10 = ${sfStr(pc, 2)}\%$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage difference between your two values of c (difference ÷ mean × 100), to two significant figures.", value: pd, sf: 2, unit: "%", wrong: [Math.abs(c1 - c2)], explanation: t`$\dfrac{|${sfStr(c1, 3)} - ${sfStr(c2, 3)}|}{\text{mean}} \times 100 = ${sfStr(pd, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State whether the results support the suggestion that c is constant. Explain your answer.", points: [agree ? t`The percentage difference (${sfStr(pd, 2)}%) is less than the percentage uncertainty (${sfStr(pc, 2)}%).` : t`The percentage difference (${sfStr(pd, 2)}%) is greater than the percentage uncertainty (${sfStr(pc, 2)}%).`, agree ? "So the two values agree within the uncertainty and support the suggestion (though two values are too few to be sure)." : "So the values do not agree within the uncertainty: the suggestion is not supported."], modelAnswer: agree ? t`The values of c differ by ${sfStr(pd, 2)}%, less than the ${sfStr(pc, 2)}% uncertainty, so they agree within experimental uncertainty and support the suggestion, although two values are too few for a firm conclusion.` : t`The values differ by ${sfStr(pd, 2)}%, more than the ${sfStr(pc, 2)}% uncertainty, so the suggestion is not supported.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Identify four sources of uncertainty or limitations of this procedure.", points: [
          "Only two masses / two values of c: too few to reach a valid conclusion.",
          "A rise of 10.0 °C is small, so the ±0.5 °C thermometer readings give a large (10%) percentage uncertainty in Δθ.",
          "Energy is lost to the surroundings (from the water surface and cup), and some heats the cup and heater, so both values of c are too large.",
          "Temperature continues to rise after switching off / water not uniformly mixed / thermometer lags the water, so the end point is hard to judge; reaction time in timing.",
        ], modelAnswer: "Only two masses were used, too few for a firm conclusion. The 10 °C rise is small, so the 0.5 °C thermometer resolution gives a 10% uncertainty. Energy is lost from the water surface and the cup, and some heats the cup and heater, so c comes out too large. The water may not be evenly mixed and the thermometer lags behind it, so it is hard to judge exactly when the rise reaches 10.0 °C." }),
        P.manual({ label: "(g)", marks: 4, stem: "Suggest an improvement for each limitation in (f).", points: [
          "Use at least five different masses and plot t against m: a straight line of gradient cΔθ/(VI), so c follows from the gradient.",
          "Use a larger temperature rise (e.g. 30 °C) or a thermometer/temperature probe reading to 0.1 °C.",
          "Insulate the cup (polystyrene, lid) / start below room temperature and finish the same amount above it so gains and losses cancel / measure the heat capacity of the cup and subtract.",
          "Stir continuously and use a digital temperature probe with a data logger to record when the rise reaches 10.0 °C (removing reaction time).",
        ], modelAnswer: "Use five or more masses and plot t against m, finding c from the gradient. Use a larger temperature rise or a thermometer reading to 0.1 °C. Insulate the cup with a polystyrene jacket and lid, or start as far below room temperature as it finishes above, so losses roughly cancel. Stir continuously and record the temperature with a probe and data logger, so the 10.0 °C point is found precisely without reaction-time error." }),
      ]),
      explanation: "c = VIt/(mΔθ) for each mass; compare the percentage difference with the percentage uncertainty.",
      hints: ["Uncertainty in t = half the range of the trials.", "Δθ is a difference of two readings: add their uncertainties."],
    });
  }

  // ---------------------------------------------------------------- PLANNING: ripple of a smoothed rectifier against capacitance
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: false,
    concepts: [A("ac.rectification-smoothing"), A("skills.planning")],
    stem: t`A technician in Bulawayo is designing a low-voltage d.c. supply. A transformer gives a sinusoidal output that is full-wave rectified by a bridge of four diodes and smoothed by a capacitor of capacitance $C$ connected across a load resistor of resistance $R$. It is suggested that the peak-to-peak ripple voltage $\Delta V$ is related to $C$ by

$$
\Delta V = \frac{V_0}{2fRC}
$$

where $V_0$ is the peak output voltage and $f$ is the supply frequency. Plan an experiment to investigate how $\Delta V$ depends on $C$ and to test this relationship. Describe the arrangement in words, the measurements and how the results are analysed.`,
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the independent and dependent variables and the variables to be kept constant.", points: ["Independent: capacitance C; dependent: ripple voltage ΔV.", "Constant: load resistance R, supply voltage (V₀) and frequency f (same transformer and rectifier)."], modelAnswer: "The independent variable is the capacitance C and the dependent variable is the ripple voltage ΔV. The load resistance R, the transformer output (so V₀) and the supply frequency f are kept constant." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the arrangement and the method.", points: [
        "Low-voltage transformer secondary connected across the a.c. terminals of the bridge rectifier; capacitor C and load resistor R in parallel across the d.c. output terminals (capacitor with correct polarity).",
        "Oscilloscope (or data logger) connected across R to display the output voltage; ΔV read as the peak-to-peak height of the ripple.",
        "Change C using several capacitors (e.g. 220 µF to 4700 µF), at least six values, repeating each reading.",
      ], modelAnswer: "Connect the low-voltage secondary of the transformer to the a.c. terminals of the bridge rectifier, and connect the capacitor (observing its polarity) and the load resistor in parallel across the d.c. terminals. Connect an oscilloscope across the load to display the output, and measure the ripple as the peak-to-peak height of the variation. Repeat with at least six capacitors from about 220 µF to 4700 µF, taking each reading more than once." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how each quantity would be measured, including how the oscilloscope is used to measure ΔV precisely.", points: [
        "ΔV: CRO on a.c. coupling (removes the d.c. level) with a sensitive Y-gain so the ripple fills much of the screen; height × Y-gain.",
        "V₀: CRO on d.c. coupling (or a voltmeter) to read the peak output; f from the time-base (time between ripple peaks = 1/2f) or the mains frequency.",
        "C: from the capacitor marking or measured with a capacitance meter; R measured with an ohmmeter.",
      ], modelAnswer: "Measure ΔV with the oscilloscope on a.c. coupling, which removes the steady d.c. level, using the most sensitive Y-gain that keeps the ripple on screen, and multiply the peak-to-peak height by the Y-gain. Read V₀ with the oscilloscope on d.c. coupling and find f from the time-base: the ripple peaks are 1/(2f) apart. Take C from a capacitance meter (or the markings) and R with an ohmmeter." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how you would make sure that the other variables are kept constant.", points: ["Use the same load resistor (check its resistance has not changed through heating) and the same transformer and rectifier throughout.", "Check V₀ on the oscilloscope for each capacitor and adjust/record it; f is the mains frequency (50 Hz), which is constant."], modelAnswer: "Use the same transformer, rectifier and load resistor throughout, checking that R does not change as it warms. Measure V₀ each time and keep it constant (or record it), and note that the mains frequency of 50 Hz stays constant." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the results would be analysed to test the relationship.", points: [
        "Plot ΔV against 1/C.",
        "Relationship valid if a straight line through the origin.",
        "Gradient = V₀/(2fR); compare with the value calculated from measured V₀, f and R (or plot lg ΔV against lg C: gradient −1).",
      ], modelAnswer: "Plot ΔV against 1/C. If the relationship holds, the graph is a straight line through the origin with gradient V₀/(2fR), which can be compared with the value calculated from the measured V₀, f and R. (Alternatively, a graph of lg ΔV against lg C should have gradient −1.)" }),
      P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution.", points: ["Use only a low-voltage, isolating transformer with the mains side enclosed; electrolytic capacitors connected with the correct polarity and rated above V₀ (they can explode); discharge capacitors before handling."], modelAnswer: "Keep the mains side of the transformer fully enclosed and work only on the low-voltage side, and connect electrolytic capacitors with the correct polarity and an adequate voltage rating because they can burst; discharge them before handling." }),
      P.manual({ label: "(g)", marks: 1, stem: "Give one further detail that would improve the reliability of the results.", points: ["Choose R and C so that RC is much larger than 1/(2f) (the relationship assumes a small ripple) / preliminary experiment to choose the range of C / measure each capacitance rather than trusting the ±20% marking."], modelAnswer: "Do a preliminary test to choose values of R and C that keep RC much larger than the 10 ms between peaks, because the suggested relationship assumes a small ripple, and measure each capacitance since electrolytic capacitors have a ±20% tolerance." }),
    ]),
    explanation: "A planning answer: vary C, measure ΔV on a.c.-coupled CRO, keep R, V₀ and f constant; ΔV against 1/C is a straight line through the origin.",
    hints: ["Which quantity must be inverted to give a straight line?", "How can the oscilloscope ignore the steady d.c. level?"],
  });
});
