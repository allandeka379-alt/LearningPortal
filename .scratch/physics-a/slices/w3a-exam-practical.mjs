// W3a practical exam rows: PRACTICAL_EVALUATION (current balance at two currents), PLANNING (e.m.f. induced in a
// search coil against the frequency of the current in a solenoid), DATA_ANALYSIS (B against distance from a long
// straight wire measured with a Hall probe; power law by lg–lg graph with worst lines).
import { concept, P, t, chk, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, lg, linFit, worstLines, mean, halfRange, pctUnc, pctDifference, table } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const g = DATA.g;

concept(A("magnetism.force-on-conductor"), { file: "exam/w3a-practical", keyPrefix: "exam.w3a-practical" }, (b) => {
  // ---------------------------------------------------------------- PRACTICAL_EVALUATION: current balance
  {
    const L = 0.050, dL = 0.001, dI = 0.05;
    const I1 = 2.0, I2 = 4.0;
    const m1 = [0.67, 0.69, 0.65], m2 = [1.31, 1.35, 1.29]; // g
    const M1 = mean(m1), M2 = mean(m2);
    const dM1 = halfRange(m1);
    const B1 = (M1 * 1e-3 * g) / (I1 * L), B2 = (M2 * 1e-3 * g) / (I2 * L);
    const pM1 = pctUnc(dM1, M1), pB1 = pM1 + pctUnc(dI, I1) + pctUnc(dL, L);
    const pd = pctDifference(B1, B2);
    const agree = pd <= pB1;
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_EVALUATION.skill, secs: EXAM.PRACTICAL_EVALUATION.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("magnetism.force-on-conductor"), A("skills.evaluation-improvements")],
      stem: t`Chipo investigates the force on a current-carrying wire. A U-shaped magnet stands on a top-pan balance reading to $0.01\ \text{g}$. A stiff copper wire is clamped horizontally between the poles, at right angles to the field, without touching the magnet. The length of wire between the pole faces is $L = 50 \pm 1\ \text{mm}$. She zeroes the balance, switches on a current $I$ from a d.c. supply, reads the ammeter (uncertainty $\pm 0.05\ \text{A}$) and records the change $\Delta m$ in the balance reading, three times for each current:

| $I\,/\,\text{A}$ | $\Delta m\,/\,\text{g}$ |
| --- | --- |
| 2.0 | ${m1.map((x) => x.toFixed(2)).join(", ")} |
| 4.0 | ${m2.map((x) => x.toFixed(2)).join(", ")} |

It is suggested that the flux density between the poles is $B = \dfrac{\Delta m\,g}{IL}$, a constant.`,
      parts: checkExam(EXAM.PRACTICAL_EVALUATION, [
        P.group({ label: "(a)", stem: t`For $I = 2.0\ \text{A}$:`, parts: [
          P.num({ label: "(i)", marks: 1, stem: "calculate the absolute uncertainty in Δm using half the range of the readings, in g", value: dM1, dp: 2, unit: "g", wrong: [2 * dM1], explanation: t`$(0.69 - 0.65)/2 = ${dpStr(dM1, 2)}\ \text{g}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "calculate the percentage uncertainty in the mean value of Δm, to two significant figures", value: pM1, sf: 2, unit: "%", wrong: [pctUnc(0.01, M1)], explanation: t`Mean $= ${dpStr(M1, 2)}\ \text{g}$; $\dfrac{${dpStr(dM1, 2)}}{${dpStr(M1, 2)}} \times 100 = ${sfStr(pM1, 2)}\%$.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate B, in T, to three significant figures:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`for $I = 2.0\ \text{A}$`, value: B1, unit: "T", wrong: [(M1 * g) / (I1 * L)], explanation: t`$B = \dfrac{${dpStr(M1, 2)} \times 10^{-3} \times 9.81}{2.0 \times 0.050} = ${sfStr(B1, 3)}\ \text{T}$ (grams converted to kilograms).` }),
          P.num({ label: "(ii)", marks: 2, stem: t`for $I = 4.0\ \text{A}$`, value: B2, unit: "T", wrong: [(M2 * 1e-3) / (I2 * L)], explanation: t`Mean $\Delta m = ${sfStr(M2, 3)}\ \text{g}$; $B = \dfrac{${sfStr(M2, 3)} \times 10^{-3} \times 9.81}{4.0 \times 0.050} = ${sfStr(B2, 3)}\ \text{T}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the percentage uncertainty in $B$ for $I = 2.0\ \text{A}$ (add the percentage uncertainties in $\Delta m$, $I$ and $L$), to two significant figures.`, value: pB1, sf: 2, unit: "%", wrong: [pM1], explanation: t`$${sfStr(pM1, 2)}\% + \dfrac{0.05}{2.0} \times 100 + \dfrac{1}{50} \times 100 = ${sfStr(pM1, 2)} + 2.5 + 2.0 = ${sfStr(pB1, 2)}\%$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage difference between your two values of B (difference ÷ mean × 100), to two significant figures.", value: pd, sf: 2, unit: "%", wrong: [Math.abs(B1 - B2) * 100], explanation: t`$\dfrac{|${sfStr(B1, 3)} - ${sfStr(B2, 3)}|}{\text{mean}} \times 100 = ${sfStr(pd, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State whether the results support the suggestion that B is constant. Explain your answer.", points: [agree ? t`The percentage difference (${sfStr(pd, 2)}%) is less than the percentage uncertainty (${sfStr(pB1, 2)}%).` : t`The percentage difference (${sfStr(pd, 2)}%) is greater than the percentage uncertainty (${sfStr(pB1, 2)}%).`, agree ? "So the values agree within the uncertainty and support the suggestion (though two values are too few to be sure)." : "So the values do not agree within the uncertainty and do not support the suggestion."], modelAnswer: agree ? t`The two values differ by ${sfStr(pd, 2)}%, which is less than the ${sfStr(pB1, 2)}% uncertainty, so they agree within experimental uncertainty and support the suggestion; two currents are, however, too few for a firm conclusion.` : t`The values differ by ${sfStr(pd, 2)}%, more than the ${sfStr(pB1, 2)}% uncertainty, so they do not support the suggestion.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Identify four sources of uncertainty or limitations of this procedure.", points: [
          "Only two values of current: too few to draw a valid conclusion.",
          "The balance reading drifts or fluctuates (the wire warms, the current drifts, air currents/vibration), so Δm is hard to read.",
          "The field is not uniform and extends beyond the pole faces, so the effective length of wire in the field is not exactly L.",
          "Small Δm (about 0.66 g) compared with the 0.01 g resolution / the ammeter uncertainty of 0.05 A is a large fraction of 2.0 A; or the wire may not be exactly perpendicular to the field.",
        ], modelAnswer: "Only two currents were used, which is too few for a firm conclusion. The balance reading drifts as the wire warms and the current changes, and draughts or vibration make it fluctuate. The field spreads beyond the pole faces and is not uniform, so the effective length is not exactly 50 mm. The ammeter uncertainty of 0.05 A is a large fraction of 2.0 A, and the wire may not be exactly at right angles to the field." }),
        P.manual({ label: "(g)", marks: 4, stem: "Suggest an improvement for each limitation in (f).", points: [
          "Take readings for at least five currents and plot Δm against I: a straight line through the origin, B from the gradient (gradient = BL/g).",
          "Switch the current on only while reading and adjust a rheostat to keep I steady; shield the balance from draughts (glass screen) and wait for the reading to settle.",
          "Use a magnet with wider pole pieces (longer than the wire section), or find the effective length by calibrating with a known field / measure B across the gap with a Hall probe.",
          "Use larger currents (or a more sensitive balance) so Δm is larger; use a digital ammeter with a smaller uncertainty; check the wire is perpendicular with a set square.",
        ], modelAnswer: "Use at least five currents and plot Δm against I, finding B from the gradient. Switch the current on only briefly, keep it steady with a rheostat, screen the balance from draughts and wait for steady readings. Use wider pole pieces so the field is uniform along the whole wire, or calibrate the effective length. Use larger currents (or a more precise balance) and a digital ammeter, and align the wire with a set square." }),
      ]),
      explanation: "B = Δm g/(IL) for each current; compare the percentage difference with the percentage uncertainty.",
      hints: ["Convert Δm to kg and multiply by g to get the force.", "Percentage uncertainties add for products and quotients."],
    });
  }

  // ---------------------------------------------------------------- PLANNING: induced e.m.f. against frequency
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: false,
    concepts: [A("induction.flux-faraday"), A("skills.planning")],
    stem: t`A small search coil is placed inside a long solenoid that carries an alternating current from a signal generator. It is suggested that the peak e.m.f. $E_0$ induced in the search coil is related to the frequency $f$ of the current by

$$
E_0 = kf^{\,n}
$$

where $k$ and $n$ are constants. Plan an experiment to investigate this relationship and determine $n$. Describe the arrangement in words, the measurements and how the results are analysed.`,
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the independent and dependent variables and the key variables to keep constant.", points: ["Independent: frequency f of the current in the solenoid; dependent: peak e.m.f. E₀ induced in the search coil.", "Constant: the amplitude (peak or r.m.s. value) of the current in the solenoid; the search coil (turns, area), its position and orientation in the solenoid."], modelAnswer: "Independent variable: the frequency f of the solenoid current. Dependent variable: the peak e.m.f. E₀ across the search coil. Keep constant: the amplitude of the solenoid current, the search coil itself (number of turns and area) and its position (near the centre) and orientation (plane perpendicular to the axis)." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the arrangement and the procedure.", points: [
        "Signal generator connected in series with the solenoid and an a.c. ammeter (or a small resistor with the oscilloscope across it to monitor the current).",
        "Search coil held at the centre of the solenoid, coaxial with it (plane perpendicular to the axis), connected to the Y-input of an oscilloscope.",
        "Set a frequency, adjust the generator output until the ammeter shows the chosen current, measure E₀; repeat for at least six frequencies over a wide range (e.g. 100 Hz to 2 kHz).",
      ], modelAnswer: "Connect the signal generator in series with the solenoid and an a.c. ammeter. Clamp the search coil at the centre of the solenoid with its plane perpendicular to the axis and connect it to an oscilloscope. For each frequency, adjust the generator's output so that the ammeter reading is the same, then measure the peak e.m.f. on the oscilloscope. Use at least six frequencies over a wide range, such as 100 Hz to 2000 Hz." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe how each quantity would be measured, stating the instruments.", points: [
        "E₀: from the oscilloscope trace, (peak-to-peak height in divisions ÷ 2) × Y-gain (V per division).",
        "f: from the signal generator dial, checked using the oscilloscope time-base (f = 1/T, T = divisions × time-base setting).",
        "Solenoid current: a.c. ammeter (or the p.d. across a known series resistor on a second channel), kept constant.",
      ], modelAnswer: "Measure E₀ from the oscilloscope as half the peak-to-peak height in divisions multiplied by the Y-gain. Read f from the generator and check it with the time-base: the period T is the number of horizontal divisions for one cycle times the time-base setting, and f = 1/T. Monitor the solenoid current with an a.c. ammeter in series (or a second channel across a known resistor)." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the current must be checked at every frequency and how good results are obtained.", points: ["The solenoid's opposition to a.c. (its reactance) rises with frequency, so for a fixed generator setting the current would fall; it must be re-adjusted to the same value each time.", "Keep the search coil fixed in the same position (clamped, centred and coaxial), use the largest trace that fits the screen, and repeat each reading and average."], modelAnswer: "At higher frequency the solenoid opposes the current more, so the current would fall unless the generator output is increased; it must be reset to the same value at each frequency. Clamp the search coil at the centre, use as large a trace as possible, and repeat and average each reading." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the results would be analysed to test the relationship and find n and k.", points: [
        t`Plot $\lg E_0$ against $\lg f$.`,
        "The relationship is supported if the points lie on a straight line.",
        t`Gradient $= n$; $y$-intercept $= \lg k$, so $k = 10^{\text{intercept}}$ (Faraday's law predicts $n = 1$).`,
      ], modelAnswer: t`Since $\lg E_0 = n\lg f + \lg k$, plot $\lg E_0$ against $\lg f$. A straight line supports the relationship; the gradient is $n$ (expected to be 1, since the rate of change of flux is proportional to $f$) and the $y$-intercept is $\lg k$, so $k = 10^{\text{intercept}}$.` }),
      P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution.", points: ["The solenoid may become hot with larger currents: switch off between readings / do not touch the coil while it is on / keep currents low."], modelAnswer: "Switch off the supply between readings and avoid touching the solenoid, which may become hot." }),
      P.manual({ label: "(g)", marks: 1, stem: "Give one further detail that would improve the experiment.", points: ["Preliminary experiment to choose a current and range of frequencies giving measurable traces / use a search coil with many turns for larger signals / keep away from other a.c. sources (mains leads) that induce stray e.m.f.s / use the same oscilloscope settings where possible."], modelAnswer: "Carry out a preliminary trial to choose a current and frequency range that give traces large enough to measure, and keep mains leads away from the search coil to avoid stray induced e.m.f.s." }),
    ]),
    explanation: "Vary f, keep the solenoid current amplitude constant, measure the peak e.m.f. with an oscilloscope; lg E₀ against lg f gives n as the gradient.",
    hints: ["Take logarithms of E₀ = kfⁿ.", "What happens to the current in a coil as the frequency rises?"],
  });

  // ---------------------------------------------------------------- DATA_ANALYSIS: B against r near a long wire
  {
    const I = 15;
    const rs = [1.5, 2.5, 3.5, 5.0, 7.0, 9.0]; // cm
    const noise = [3, -2, 2, -1, 1, -1]; // µT
    const kTrue = (2e-7 * I) / 0.01 * 1e6; // µT cm: B(µT) = kTrue / r(cm)
    const Bs = rs.map((r, i) => Math.round(kTrue / r + noise[i]));
    const dB = 4;
    const X = rs.map(lg), Y = Bs.map(lg);
    const dY = Bs.map((x) => (lg(x + dB) - lg(x - dB)) / 2);
    const fit = linFit(X, Y);
    const w = worstLines(X.map((x, i) => ({ x, y: Y[i], dy: dY[i] })));
    const dn = Math.max(Math.abs(fit.m - w.steep.m), Math.abs(fit.m - w.shallow.m));
    const kFit = 10 ** fit.c;
    const kWorst = [w.steep.c, w.shallow.c].map((c) => 10 ** c);
    const dk = Math.max(...kWorst.map((x) => Math.abs(x - kFit)));
    const row = 3;
    const B12 = kFit * 12 ** fit.m;
    const tab = table([t`$r\,/\,\text{cm}$`, t`$B\,/\,\mu\text{T}$`, t`$\lg(r/\text{cm})$`, t`$\lg(B/\mu\text{T})$`], rs.map((r, i) => [dpStr(r, 1), `${Bs[i]} ± ${dB}`, dpStr(X[i], 3), i === row ? "" : `${dpStr(Y[i], 3)} ± ${dpStr(dY[i], 3)}`]));
    chk(Math.abs(fit.m + 1) < 0.08 ? 1 : 0, 1);
    b.struct({
      d: 5, examStyle: true, skill: EXAM.DATA_ANALYSIS.skill, secs: EXAM.DATA_ANALYSIS.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: true,
      concepts: [A("magnetism.field-patterns"), A("skills.data-analysis")],
      stem: t`Sipho uses a calibrated Hall probe to measure the magnetic flux density $B$ at distances $r$ from a long straight wire carrying a steady current of $15\ \text{A}$. Each reading is the average of readings with the current in each direction. It is suggested that

$$
B = kr^{\,n}
$$

where $k$ and $n$ are constants. His results are:

${tab}`,
      parts: checkExam(EXAM.DATA_ANALYSIS, [
        P.manual({ label: "(a)", marks: 1, stem: "Explain why a graph of lg B against lg r should be a straight line, and how n and k are found from it.", points: [t`$\lg B = n\lg r + \lg k$: the form $y = mx + c$, so the gradient is $n$ and the $y$-intercept is $\lg k$ ($k = 10^{\text{intercept}}$).`], modelAnswer: t`Taking logarithms, $\lg B = n\lg r + \lg k$, which has the form $y = mx + c$: the gradient is $n$ and the intercept is $\lg k$.` }),
        P.group({ label: "(b)", stem: t`Complete the row for $r = ${dpStr(rs[row], 1)}\ \text{cm}$.`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$\lg(B/\mu\text{T})$, to three decimal places`, value: Y[row], dp: 3, wrong: [Math.log(Bs[row])], explanation: t`$\lg ${Bs[row]} = ${dpStr(Y[row], 3)}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`the absolute uncertainty in $\lg(B/\mu\text{T})$, to three decimal places`, value: dY[row], tol: 0.003, wrong: [dB], explanation: t`$\tfrac{1}{2}[\lg ${Bs[row] + dB} - \lg ${Bs[row] - dB}] = ${dpStr(dY[row], 3)}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: "Plot lg(B/µT) against lg(r/cm) with error bars, draw the best-fit line and determine its gradient.", value: fit.m, tol: 0.05, wrong: [-fit.m], explanation: t`The best-fit line has gradient about $${dpStr(fit.m, 2)}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Draw the worst acceptable straight line and determine the absolute uncertainty in the gradient.", value: dn, tol: 0.04, wrong: [Math.abs(fit.m)], explanation: t`Worst lines through all the error bars have gradients of about $${dpStr(w.shallow.m, 2)}$ and $${dpStr(w.steep.m, 2)}$, so the uncertainty is about $${dpStr(dn, 2)}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Use the intercept of your best-fit line to determine k, in µT cm.", value: kFit, tol: 25, wrong: [fit.c], explanation: t`Intercept $\approx ${dpStr(fit.c, 3)}$ (by extrapolation to $\lg r = 0$, or $c = y - mx$), so $k = 10^{${dpStr(fit.c, 3)}} \approx ${sfStr(kFit, 3)}\ \mu\text{T cm}$.` }),
        P.num({ label: "(f)", marks: 1, stem: "Determine the absolute uncertainty in k, in µT cm.", value: dk, tol: 10, wrong: [kFit], explanation: t`The worst line's intercept gives $k \approx ${sfStr(kWorst.reduce((a, c) => (Math.abs(c - kFit) > Math.abs(a - kFit) ? c : a)), 3)}\ \mu\text{T cm}$, so $\Delta k \approx ${sfStr(dk, 2)}\ \mu\text{T cm}$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "State whether the results are consistent with B being inversely proportional to r. Explain your answer.", points: [t`Inverse proportion means $n = -1$; the experimental value is $${dpStr(fit.m, 2)} \pm ${dpStr(dn, 2)}$.`, "−1 lies within this range, so the results are consistent with B ∝ 1/r."], modelAnswer: t`For $B \propto 1/r$, $n$ must be $-1$. The value found is $${dpStr(fit.m, 2)} \pm ${dpStr(dn, 2)}$, a range that includes $-1$, so the results are consistent with inverse proportionality.` }),
        P.num({ label: "(h)", marks: 2, stem: t`Use your values of $k$ and $n$ to predict $B$ at $r = 12.0\ \text{cm}$, in µT.`, value: B12, tol: 2, wrong: [kFit / 144], explanation: t`$B = kr^n \approx ${sfStr(kFit, 3)} \times 12.0^{${dpStr(fit.m, 2)}} \approx ${sfStr(B12, 2)}\ \mu\text{T}$.` }),
        P.manual({ label: "(i)", marks: 1, stem: "Suggest why each reading is the average of readings taken with the current in each direction.", points: ["To cancel the Earth's magnetic field (and any other steady background field or probe offset), which does not reverse when the current is reversed."], modelAnswer: "Reversing the current reverses only the wire's field; averaging the two magnitudes cancels the Earth's field and any zero offset of the probe." }),
      ]),
      explanation: t`$\lg B = n\lg r + \lg k$: gradient $n \approx ${dpStr(fit.m, 2)}$, intercept $\lg k$; worst lines give the uncertainties.`,
      hints: ["Take logarithms of both sides.", "The worst line must pass through every error bar."],
    });
  }
});
