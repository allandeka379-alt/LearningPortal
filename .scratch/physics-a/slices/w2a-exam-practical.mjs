// W2a practical exam rows: PRACTICAL_GRAPH (stationary waves on a string, f against 1/l), PLANNING (damping of a
// mass-spring oscillator by card area), DATA_ANALYSIS (T = 2π√(m/k): T² against m with worst lines).
import { concept, P, t, chk, EXAM, checkExam, sfStr, dpStr, linFit, worstLines, mean, halfRange, pctUnc, table } from "../lib.mjs";

const A = (k) => `aphys.${k}`;

concept(A("skills.tables-graphs"), { file: "exam/w2a-practical", keyPrefix: "exam.w2a-practical" }, (b) => {
  // ---------------------------------------------------------------- PRACTICAL_GRAPH: fundamental frequency of a string against 1/l
  {
    const Tn = 4.0, mu = 1.0e-3;
    const v = Math.sqrt(Tn / mu);
    const L = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    const n1 = [0.6, -0.5, 0.4, -0.3, 0.3, -0.2], n2 = [-0.4, 0.5, -0.2, 0.4, -0.3, 0.3];
    const f1 = L.map((l, i) => Number((v / (2 * l) + n1[i]).toFixed(1)));
    const f2 = L.map((l, i) => Number((v / (2 * l) + n2[i]).toFixed(1)));
    const fm = f1.map((x, i) => (x + f2[i]) / 2);
    const X = L.map((l) => 1 / l);
    const fit = linFit(X, fm);
    const muFit = Tn / (2 * fit.m) ** 2;
    const tab = table([t`$l\,/\,\text{m}$`, t`$f_1\,/\,\text{Hz}$`, t`$f_2\,/\,\text{Hz}$`], L.map((l, i) => [l.toFixed(2), f1[i].toFixed(1), f2[i].toFixed(1)]));
    const r = 2; // row used in processing (l = 0.60 m)
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_GRAPH.skill, secs: EXAM.PRACTICAL_GRAPH.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("superposition.stationary-waves"), A("skills.tables-graphs")],
      stem: t`In this experiment you investigate how the fundamental frequency of a stretched string depends on its vibrating length.

**Method.** (1) A string passes over a pulley and carries a hanger and masses giving a tension of $4.0\ \text{N}$. (2) The string rests on two bridges a distance $l$ apart; a vibration generator connected to a signal generator is placed close to one bridge. (3) The frequency is increased slowly from a low value until a single loop of maximum amplitude forms between the bridges; this frequency $f_1$ is recorded. (4) The frequency is then raised beyond this and lowered slowly until the loop is again largest; this frequency $f_2$ is recorded. (5) This is repeated for six values of $l$. Chipo's results are:

${tab}

Theory suggests that $f = \dfrac{1}{2l}\sqrt{\dfrac{T}{\mu}}$, where $T$ is the tension and $\mu$ the mass per unit length of the string.`,
      parts: checkExam(EXAM.PRACTICAL_GRAPH, [
        P.num({ label: "(a)", marks: 1, stem: t`For $l = ${L[r].toFixed(2)}\ \text{m}$, estimate the absolute uncertainty in the mean frequency using half the difference between $f_1$ and $f_2$, in Hz.`, value: halfRange([f1[r], f2[r]]), dp: 1, unit: "Hz", wrong: [Math.abs(f1[r] - f2[r])], explanation: t`$(${f1[r].toFixed(1)} - ${f2[r].toFixed(1)})/2 = ${dpStr(halfRange([f1[r], f2[r]]), 1)}\ \text{Hz}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: t`Describe the results table you would draw, including columns for $1/l$ and the mean frequency.`, points: [t`Column headings with quantity and unit separated by a solidus: $l\,/\,\text{m}$, $f_1\,/\,\text{Hz}$, $f_2\,/\,\text{Hz}$, mean $f\,/\,\text{Hz}$, $(1/l)\,/\,\text{m}^{-1}$.`, t`Mean $f$ to the same precision as the raw data (0.1 Hz, or 0.05); $1/l$ to 3 significant figures (as many s.f. as the raw $l$, or one more).`], modelAnswer: t`Columns: $l$ / m; $f_1$ / Hz; $f_2$ / Hz; mean $f$ / Hz; $(1/l)$ / m⁻¹. The mean frequencies are given to 0.1 Hz like the readings (or to 0.05 Hz) and $1/l$ to three significant figures.` }),
        P.group({ label: "(c)", stem: t`Processing, for $l = ${L[r].toFixed(2)}\ \text{m}$:`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`calculate $1/l$, in $\text{m}^{-1}$, to three significant figures`, value: X[r], unit: "m⁻¹", wrong: [L[r]], explanation: t`$1/0.60 = ${sfStr(X[r], 3)}\ \text{m}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "calculate the mean frequency, in Hz", value: fm[r], dp: 1, unit: "Hz", wrong: [f1[r]], explanation: t`$(${f1[r].toFixed(1)} + ${f2[r].toFixed(1)})/2 = ${dpStr(fm[r], 1)}\ \text{Hz}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "calculate the percentage uncertainty in the mean frequency, to two significant figures", value: pctUnc(halfRange([f1[r], f2[r]]), fm[r]), sf: 2, unit: "%", wrong: [halfRange([f1[r], f2[r]])], explanation: t`$\dfrac{${dpStr(halfRange([f1[r], f2[r]]), 1)}}{${dpStr(fm[r], 1)}} \times 100 = ${sfStr(pctUnc(halfRange([f1[r], f2[r]]), fm[r]), 2)}\%$.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, stem: t`Plot the mean frequency $f$ against $1/l$, draw the line of best fit and determine its gradient, in $\text{Hz m}$.`, value: fit.m, tol: 1.0, wrong: [1 / fit.m], explanation: t`A good best-fit line has gradient about $${sfStr(fit.m, 3)}\ \text{Hz m}$ (any careful line gives about 30.7 to 32.7 Hz m). Use a triangle covering more than half the line.` }),
        P.num({ label: "(e)", marks: 2, stem: "Determine the y-intercept of your line, in Hz.", value: fit.c, tol: 1.2, unit: "Hz", wrong: [fit.m], explanation: t`$c = y - mx$ using a point on the line: about $${dpStr(fit.c, 1)}\ \text{Hz}$, close to zero, as the theory predicts.` }),
        P.num({ label: "(f)", marks: 2, stem: t`The gradient equals $\dfrac{1}{2}\sqrt{\dfrac{T}{\mu}}$. Use your gradient and $T = 4.0\ \text{N}$ to determine $\mu$, in $\text{kg m}^{-1}$.`, value: muFit, tol: 0.07e-3, wrong: [Tn / fit.m ** 2], answer: `${sfStr(muFit * 1000, 2)} × 10^-3`, explanation: t`$\sqrt{T/\mu} = 2 \times \text{gradient}$, so $\mu = \dfrac{T}{(2 \times \text{gradient})^2} = \dfrac{4.0}{(2 \times ${sfStr(fit.m, 3)})^2} = ${sfStr(muFit * 1000, 2)} \times 10^{-3}\ \text{kg m}^{-1}$.` }),
        P.manual({ label: "(g)", marks: 2, stem: t`State whether the results support the relationship $f \propto 1/l$. Explain your answer.`, points: ["Yes: the points lie close to a straight line (within their uncertainties)…", "…which passes through (or very close to) the origin, as f ∝ 1/l requires."], modelAnswer: "Yes. The graph of f against 1/l is a straight line that passes very close to the origin, with the points scattered about it by no more than their uncertainty, so f is proportional to 1/l." }),
        P.manual({ label: "(h)", marks: 3, stem: "Identify three sources of uncertainty in this experiment and suggest an improvement for each.", points: [
          "Judging the frequency of maximum amplitude is subjective → approach from both sides and average / use a stroboscope or a sensor to find the largest amplitude.",
          "The vibrating length is uncertain because the bridges are not sharp / the generator end is not a true node → use knife-edge bridges and measure between them with a metre rule at several points.",
          "The tension may not be exactly 4.0 N (pulley friction / mass of hanger) → use a low-friction pulley and weigh the hanger and masses on a balance.",
        ], modelAnswer: "The resonant frequency is hard to judge because the loop is largest over a range; approach from above and below and average, or use a stroboscope. The length is uncertain because the bridges are broad; use knife-edge bridges and a metre rule read at eye level. Pulley friction makes the tension uncertain; use a low-friction pulley and check the mass of the hanger and masses on a balance." }),
        P.manual({ label: "(i)", marks: 2, stem: "State one safety precaution and one precaution for accuracy.", points: ["Safety: keep feet clear of / place a sand tray under the hanging masses (or wear goggles in case the string snaps).", "Accuracy: read the signal generator frequency from a frequency meter / check the string is horizontal and the bridges perpendicular to it / measure l from the centres of the bridges."], modelAnswer: "Place a sand tray under the masses and keep feet clear in case the string breaks; measure l between the centres of the bridges with the rule close to the string, reading at eye level." }),
      ]),
      explanation: "f = (1/2l)√(T/μ): f against 1/l is a straight line through the origin with gradient ½√(T/μ).",
      hints: ["Calculate 1/l for every row before plotting.", "μ = T/(2 × gradient)²."],
    });
  }

  // ---------------------------------------------------------------- PLANNING: damping of a mass-spring oscillator by a card
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: false,
    concepts: [A("oscillations.damping-resonance"), A("skills.planning")],
    stem: t`A mass hanging from a spring oscillates vertically. A horizontal square of stiff card is fixed to the mass so that air resistance damps the oscillations. It is suggested that the time $t_{1/2}$ for the amplitude to fall to half its initial value is related to the area $A$ of the card by

$$
t_{1/2} = kA^{\,n}
$$

where $k$ and $n$ are constants. Plan an experiment to investigate this relationship and determine $n$. Describe the arrangement in words, the measurements and how the results are analysed.`,
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the independent and dependent variables and the key variables to keep constant.", points: ["Independent: area A of the card; dependent: time t½ for the amplitude to halve.", "Constant: total oscillating mass (card mass included or compensated), spring (k), initial amplitude, card shape/orientation (horizontal)."], modelAnswer: "Independent variable: card area A. Dependent variable: the time t½ for the amplitude to halve. Kept constant: the spring, the total mass of the oscillator (adding small masses to compensate for heavier cards), the starting amplitude and the shape and horizontal orientation of the card." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the arrangement and the procedure.", points: [
        "Spring hung from a clamp on a rigid stand; mass and horizontal card attached below it; vertical metre rule (or a motion sensor below the mass) beside the oscillator.",
        "Pull the mass down a fixed distance (initial amplitude, e.g. 6.0 cm) and release; start timing and stop when the amplitude has fallen to 3.0 cm (pointer against the rule, or from a video/data-logger trace).",
        "Repeat for at least six card areas (e.g. squares of side 5 cm to 15 cm), repeating each timing and averaging.",
      ], modelAnswer: "Hang the spring from a clamp and stand with the mass and a horizontal card square fixed below it, and a vertical metre rule beside the mass (or a motion sensor underneath linked to a data logger). Pull the mass down 6.0 cm and release it, and measure the time for the amplitude to fall to 3.0 cm. Repeat with at least six square cards of side 5 cm to 15 cm, timing each two or three times and averaging." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe how each quantity would be measured, stating the instruments.", points: [
        "Side length of the card with a ruler (to 1 mm); A = side² (or use a set of cut squares measured carefully).",
        "Amplitude read against the vertical metre rule using a pointer at eye level, or from a video frame by frame / motion-sensor trace.",
        "Time t½ with a stop-watch (or from the time axis of the data-logger trace / video timer).",
      ], modelAnswer: "Measure the side of each card with a ruler to the nearest millimetre and calculate A = side². Follow the amplitude with a pointer against a vertical metre rule, ideally by videoing the motion with a scale and stepping through frames, or with a motion sensor. Find t½ with a stop-watch or from the time axis of the video or logger trace." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how you would control the variables and make the results reliable.", points: ["Keep the total mass constant (adding masses for lighter cards) since the mass affects both period and damping; use the same initial amplitude each time.", "Keep the card horizontal and centred so it does not twist; avoid draughts (close windows, switch off fans); repeat timings and average."], modelAnswer: "Keep the oscillating mass the same by adding small masses to compensate for the card, start each run from the same amplitude, keep the card horizontal and centred, switch off fans and close windows, and repeat each timing." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the results would be analysed to test the relationship and find n and k.", points: [
        t`Plot $\lg t_{1/2}$ against $\lg A$.`,
        "The relationship is supported if the points lie on a straight line.",
        t`Gradient $= n$; $y$-intercept $= \lg k$, so $k = 10^{\text{intercept}}$.`,
      ], modelAnswer: t`Taking logarithms, $\lg t_{1/2} = n\lg A + \lg k$. Plot $\lg t_{1/2}$ against $\lg A$; a straight line supports the relationship, the gradient is $n$ and the $y$-intercept is $\lg k$, so $k = 10^{\text{intercept}}$.` }),
      P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution.", points: ["Clamp the stand firmly (or use a G-clamp/counterweight) so it cannot topple, and keep feet clear in case the mass falls off the spring; wear goggles in case the spring flies off."], modelAnswer: "Clamp the stand to the bench so it cannot topple and keep feet away from below the mass in case it falls off the spring." }),
      P.manual({ label: "(g)", marks: 1, stem: "Give one further detail that would improve the experiment.", points: ["Preliminary test to choose card sizes giving measurable t½ (not too fast/slow) / use a fiducial marker at 3.0 cm / film with a high frame-rate camera and a scale / use a range of areas wide enough for a good lg-lg plot."], modelAnswer: "Carry out a preliminary trial to choose card sizes that give times of a few seconds to a minute, and film the motion against a scale so that the half-amplitude point can be found precisely." }),
    ]),
    explanation: "A damping plan: vary card area, measure the time for the amplitude to halve, keep the mass and starting amplitude constant; lg t½ against lg A gives n as the gradient.",
    hints: ["Take logarithms of t½ = kAⁿ.", "What else changes when you add a bigger card?"],
  });

  // ---------------------------------------------------------------- DATA_ANALYSIS: T = 2π√(m/k), T² against m with worst lines
  {
    const kTrue = 25, me = 0.015, dT = 0.007;
    const m = [0.15, 0.25, 0.35, 0.45, 0.55, 0.65];
    const noise = [0.003, -0.004, 0.003, -0.002, 0.004, -0.003];
    const T = m.map((x, i) => Number((2 * Math.PI * Math.sqrt((x + me) / kTrue) + noise[i]).toFixed(3)));
    const T2 = T.map((x) => x * x), dT2 = T.map((x) => 2 * x * dT);
    const fit = linFit(m, T2);
    const w = worstLines(m.map((x, i) => ({ x, y: T2[i], dy: dT2[i] })));
    const dGrad = Math.max(Math.abs(fit.m - w.steep.m), Math.abs(fit.m - w.shallow.m));
    const kFit = (4 * Math.PI ** 2) / fit.m;
    const dk = (dGrad / fit.m) * kFit;
    const row = 3;
    const tab = table([t`$m\,/\,\text{kg}$`, t`$T\,/\,\text{s}$`, t`$T^2\,/\,\text{s}^2$`], m.map((x, i) => [x.toFixed(2), `${T[i].toFixed(3)} ± ${dT.toFixed(3)}`, i === row ? "" : `${dpStr(T2[i], 3)} ± ${dpStr(dT2[i], 3)}`]));
    chk(Math.round(kFit), 25);
    b.struct({
      d: 5, examStyle: true, skill: EXAM.DATA_ANALYSIS.skill, secs: EXAM.DATA_ANALYSIS.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: true,
      concepts: [A("oscillations.shm"), A("skills.data-analysis")],
      stem: t`A student hangs masses $m$ from a spring and finds the period $T$ of vertical oscillations by timing 20 oscillations. It is suggested that

$$
T = 2\pi\sqrt{\frac{m + m_e}{k}}
$$

where $k$ is the spring constant and $m_e$ is a small effective mass due to the spring itself.

${tab}`,
      parts: checkExam(EXAM.DATA_ANALYSIS, [
        P.manual({ label: "(a)", marks: 1, stem: "State the graph that should be plotted to give a straight line, and how k is found from it.", points: [t`Plot $T^2$ against $m$: gradient $= 4\pi^2/k$, so $k = 4\pi^2/\text{gradient}$ (intercept $= 4\pi^2 m_e/k$).`], modelAnswer: t`Squaring gives $T^2 = \dfrac{4\pi^2}{k}m + \dfrac{4\pi^2 m_e}{k}$, so plot $T^2$ against $m$; $k = 4\pi^2/\text{gradient}$.` }),
        P.group({ label: "(b)", stem: t`Complete the row for $m = ${m[row].toFixed(2)}\ \text{kg}$.`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$T^2$, in $\text{s}^2$, to three decimal places`, value: T2[row], dp: 3, wrong: [2 * T[row]], explanation: t`$${T[row].toFixed(3)}^2 = ${dpStr(T2[row], 3)}\ \text{s}^2$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`the absolute uncertainty in $T^2$, in $\text{s}^2$, to three decimal places`, value: dT2[row], tol: 0.0015, wrong: [dT], explanation: t`$\Delta(T^2) = 2T\Delta T = 2 \times ${T[row].toFixed(3)} \times ${dT} = ${dpStr(dT2[row], 3)}\ \text{s}^2$ (twice the percentage uncertainty in $T$).` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Plot $T^2$ against $m$ with error bars, draw the best-fit line and determine its gradient, in $\text{s}^2\,\text{kg}^{-1}$.`, value: fit.m, tol: 0.04, wrong: [1 / fit.m], explanation: t`Best-fit gradient $\approx ${dpStr(fit.m, 3)}\ \text{s}^2\,\text{kg}^{-1}$ (about 1.54 to 1.61 from a good line).` }),
        P.num({ label: "(d)", marks: 2, stem: "Draw the worst acceptable line through all the error bars and determine the absolute uncertainty in the gradient.", value: dGrad, tol: 0.012, wrong: [0.5], explanation: t`Worst lines have gradients of about $${dpStr(w.shallow.m, 3)}$ and $${dpStr(w.steep.m, 3)}\ \text{s}^2\,\text{kg}^{-1}$; uncertainty $\approx ${dpStr(dGrad, 3)}\ \text{s}^2\,\text{kg}^{-1}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Determine $k$, in $\text{N m}^{-1}$, to three significant figures.`, value: kFit, tol: 0.7, unit: "N/m", wrong: [fit.m / (4 * Math.PI ** 2), (2 * Math.PI) / fit.m], explanation: t`$k = \dfrac{4\pi^2}{${dpStr(fit.m, 3)}} = ${sfStr(kFit, 3)}\ \text{N m}^{-1}$.` }),
        P.num({ label: "(f)", marks: 2, stem: t`Determine the absolute uncertainty in $k$, in $\text{N m}^{-1}$.`, value: dk, tol: 0.2, unit: "N/m", wrong: [dGrad], explanation: t`Percentage uncertainty in $k$ = that in the gradient: $\dfrac{${dpStr(dGrad, 3)}}{${dpStr(fit.m, 3)}} \times 100 = ${sfStr(100 * (dGrad / fit.m), 2)}\%$, so $\Delta k \approx ${sfStr(dk, 2)}\ \text{N m}^{-1}$.` }),
        P.manual({ label: "(g)", marks: 1, stem: "State the unit of the gradient and show that the unit of k is consistent with N m⁻¹.", points: [t`Gradient in $\text{s}^2\,\text{kg}^{-1}$, so $k = 4\pi^2/\text{gradient}$ has unit $\text{kg s}^{-2} = (\text{kg m s}^{-2})\,\text{m}^{-1} = \text{N m}^{-1}$.`], modelAnswer: t`The gradient is in $\text{s}^2\,\text{kg}^{-1}$, so $k$ is in $\text{kg s}^{-2}$, which equals $\text{N m}^{-1}$.` }),
        P.num({ label: "(h)", marks: 1, stem: t`Determine the $y$-intercept of your best-fit line, in $\text{s}^2$.`, value: fit.c, tol: 0.01, wrong: [0], explanation: t`$c = y - mx$ using a point on the line: about $${dpStr(fit.c, 3)}\ \text{s}^2$. It is positive, showing the spring's own mass contributes ($m_e = ck/4\pi^2 \approx ${sfStr((fit.c * kFit) / (4 * Math.PI ** 2) * 1000, 2)}\ \text{g}$).` }),
        P.manual({ label: "(i)", marks: 2, stem: "The manufacturer states that the spring constant is 25.0 N m⁻¹. State and explain whether your value is consistent with this.", points: [t`The range of the experimental value, $${sfStr(kFit, 3)} \pm ${sfStr(dk, 2)}\ \text{N m}^{-1}$, is compared with 25.0.`, `${Math.abs(kFit - 25) <= dk ? "25.0 lies within the range, so the values are consistent." : "25.0 lies outside the range, so the values are not consistent (a systematic error is likely)."}`], modelAnswer: t`The experiment gives $k = ${sfStr(kFit, 3)} \pm ${sfStr(dk, 2)}\ \text{N m}^{-1}$, i.e. from ${sfStr(kFit - dk, 3)} to ${sfStr(kFit + dk, 3)} N m⁻¹. ${Math.abs(kFit - 25) <= dk ? "25.0 N m⁻¹ lies inside this range, so it is consistent." : "25.0 N m⁻¹ lies outside this range, so it is not consistent; a systematic error, such as a mis-calibrated mass, is likely."}` }),
      ]),
      explanation: t`$T^2 = (4\pi^2/k)m + 4\pi^2m_e/k$: gradient $\approx ${dpStr(fit.m, 3)}\ \text{s}^2\,\text{kg}^{-1}$ gives $k \approx ${sfStr(kFit, 3)}\ \text{N m}^{-1}$; worst lines give the uncertainty.`,
      hints: ["Square both sides of the equation.", "Δ(T²) = 2TΔT."],
    });
  }
});
