// W4b practical exam rows (both boards): PLANNING (how the resistance of an LDR depends on its distance from a lamp,
// R = k dⁿ) and DATA_ANALYSIS (intensity from a lamp in a housing, I = k/(x + c)², plotted as I^(-1/2) against x).
import { concept, P, t, EXAM, checkExam, sfStr, dpStr, table, linFit, worstLines } from "../lib.mjs";

const A = (k) => `aphys.${k}`;

concept(A("electricity.resistance-iv"), { file: "exam/w4b-practical", keyPrefix: "exam.w4b-practical" }, (b) => {
  // ---------------------------------------------------------------- PLANNING: LDR resistance against distance from a lamp
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: false,
    concepts: [A("electricity.resistance-iv"), A("circuits.potential-dividers"), A("skills.planning")],
    stem: t`Farai is building a light-operated switch for security lights at a school in Kwekwe and needs to calibrate the light-dependent resistor (LDR) he will use. He places the LDR at a distance $d$ from a small filament lamp in an otherwise dark room. It is suggested that the resistance $R$ of the LDR is related to $d$ by

$$
R = k\,d^{\,n}
$$

where $k$ and $n$ are constants. Plan an experiment to test this relationship and to determine $n$ and $k$. Describe the arrangement in words, the measurements and how the results are analysed.`,
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the independent and dependent variables and the variables to be kept constant.", points: [
        "Independent: distance d from the lamp to the LDR; dependent: resistance R of the LDR.",
        "Constant: power/brightness of the lamp (same p.d. across it), same LDR at the same temperature and orientation (facing the lamp), no other light (dark room).",
      ], modelAnswer: "The independent variable is the distance d between the lamp and the LDR, and the dependent variable is the LDR's resistance R. The lamp's power (the p.d. across it), the LDR's orientation and temperature, and the absence of other light must be kept constant." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the arrangement and the procedure.", points: [
        "Lamp and LDR clamped at the same height on a bench (or along an optical bench), the LDR's sensitive face facing the lamp along the line joining them.",
        "LDR connected to a digital ohmmeter (or in series with an ammeter across a known p.d., with a voltmeter across it), in a darkened room.",
        "Vary d (e.g. 0.10 m to 0.80 m, at least six values), record R for each, repeat and average.",
      ], modelAnswer: "Clamp the lamp and the LDR at the same height on a bench, the LDR's face pointing at the filament along the line joining them, with a metre rule along the bench. Connect the LDR to a digital ohmmeter (or measure the current through it and the p.d. across it). In a darkened room, set at least six distances between about 0.10 m and 0.80 m, read R at each and repeat the set of readings, averaging." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain how each quantity would be measured, with suitable instruments.", points: [
        "d: metre rule (mm resolution), measured from the filament to the face of the LDR.",
        "R: digital ohmmeter on a suitable range (or R = V/I from a voltmeter and milliammeter).",
        "Lamp kept at constant power: voltmeter across the lamp and a variable resistor/power supply adjusted to keep the same p.d.",
      ], modelAnswer: "Measure d with a metre rule from the filament to the LDR's face. Measure R with a digital ohmmeter on a suitable range, or calculate it from voltmeter and milliammeter readings, R = V/I. Monitor the lamp with a voltmeter across it and adjust the supply so its p.d., and so its power, stays the same." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how you would ensure that the other variables are kept constant.", points: [
        "Darkened room / black cloth or tube around the path so only light from the lamp reaches the LDR; check R with the lamp off is very large.",
        "Allow the lamp to warm up and keep its p.d. constant; allow R to settle (LDRs respond slowly) and avoid the LDR heating (lamp not too close, short readings).",
      ], modelAnswer: "Work in a darkened room or put a blackened tube between lamp and LDR so that no other light reaches it, checking that R is very large with the lamp off. Let the lamp warm up and keep its p.d. constant, wait for each reading to settle, and keep the LDR far enough from the lamp that it is not heated." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the results would be analysed to test the relationship and find n and k.", points: [
        "Plot lg R against lg d.",
        "The relationship is valid if the graph is a straight line.",
        "n = gradient; k = 10^(y-intercept) (with R and d in stated units).",
      ], modelAnswer: "Taking logarithms, lg R = n lg d + lg k, so plot lg R against lg d. If the relationship holds, the points lie on a straight line; its gradient is n and its y-intercept is lg k, so k = 10 raised to the intercept, in the units used for R and d." }),
      P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution.", points: ["The lamp gets hot: do not touch it / let it cool before moving; or use a low-voltage lamp rather than a mains lamp (avoid mains voltages)."], modelAnswer: "The lamp becomes very hot, so it should not be touched while on and must be allowed to cool before it is moved; a low-voltage lamp avoids mains voltages." }),
      P.manual({ label: "(g)", marks: 1, stem: "Give one further detail that would improve the reliability of the results.", points: ["Preliminary experiment to choose the range of d and the ohmmeter range / measure d to the filament (not the glass) / allow time for the LDR's resistance to settle (it responds slowly) / repeat with readings taken in increasing and decreasing d."], modelAnswer: "Do a preliminary experiment to choose a range of d that gives a good spread of R and the right ohmmeter range, and wait for each reading to settle because LDRs respond slowly to changes in light." }),
    ]),
    explanation: "A planning answer: vary d, measure R with an ohmmeter in the dark, keep the lamp's power constant; lg R against lg d gives n (gradient) and k (intercept).",
    hints: ["Take logarithms of both sides.", "What must stay the same about the lamp?"],
  });

  // ---------------------------------------------------------------- DATA_ANALYSIS: intensity from a lamp in a housing
  {
    const k0 = 0.12, c0 = 0.05;
    const xs = [0.12, 0.17, 0.24, 0.32, 0.42, 0.54];
    const nz = [0.01, -0.012, 0.008, -0.006, 0.012, -0.009];
    const I = xs.map((x, i) => Number(sfStr((k0 / (x + c0) ** 2) * (1 + nz[i]), 3)));
    const pct = 3;
    const Y = I.map((v) => 1 / Math.sqrt(v));
    const dY = I.map((v) => 0.5 * (pct / 100) * (1 / Math.sqrt(v)));
    const fit = linFit(xs, Y);
    const w = worstLines(xs.map((x, i) => ({ x, y: Y[i], dy: dY[i] })));
    const dm = Math.max(Math.abs(fit.m - w.steep.m), Math.abs(fit.m - w.shallow.m));
    const c = fit.c / fit.m;
    const k = 1 / fit.m ** 2;
    const dk = k * 2 * (dm / fit.m);
    const row = 2;
    const tab = table([t`$x\,/\,\text{m}$`, t`$I\,/\,\text{W m}^{-2}$`, t`$(I/\text{W m}^{-2})^{-1/2}$`], xs.map((x, i) => [dpStr(x, 2), `${sfStr(I[i], 3)} ± 3%`, i === row ? "" : `${dpStr(Y[i], 3)} ± ${dpStr(dY[i], 3)}`]));
    b.struct({
      d: 5, examStyle: true, skill: EXAM.DATA_ANALYSIS.skill, secs: EXAM.DATA_ANALYSIS.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: true,
      concepts: [A("waves.progressive-waves"), A("skills.data-analysis")],
      stem: t`A small lamp is mounted inside a housing. A calibrated light sensor measures the intensity $I$ of the light at a distance $x$ from the front of the housing. Each reading of $I$ has an uncertainty of ±3%. It is suggested that

$$
I = \frac{k}{(x + c)^{2}}
$$

where $k$ and $c$ are constants and $c$ is the distance of the filament behind the front of the housing.

${tab}`,
      parts: checkExam(EXAM.DATA_ANALYSIS, [
        P.manual({ label: "(a)", marks: 1, stem: "A graph is plotted of I^(−1/2) on the y-axis against x on the x-axis. Express the gradient and the y-intercept in terms of k and c.", points: [t`$I^{-1/2} = \dfrac{x}{\sqrt{k}} + \dfrac{c}{\sqrt{k}}$: gradient $= \dfrac{1}{\sqrt{k}}$, y-intercept $= \dfrac{c}{\sqrt{k}}$.`], modelAnswer: t`Rearranging, $I^{-1/2} = \dfrac{x + c}{\sqrt{k}}$, so the gradient is $1/\sqrt{k}$ and the y-intercept is $c/\sqrt{k}$.` }),
        P.group({ label: "(b)", stem: t`Complete the row for $x = ${dpStr(xs[row], 2)}\ \text{m}$.`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$(I/\text{W m}^{-2})^{-1/2}$, to three decimal places`, value: Y[row], dp: 3, wrong: [Math.sqrt(I[row])], explanation: t`$\dfrac{1}{\sqrt{${sfStr(I[row], 3)}}} = ${dpStr(Y[row], 3)}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "its absolute uncertainty, to three decimal places", value: dY[row], tol: 0.002, wrong: [(pct / 100) * Y[row]], explanation: t`The power $-\tfrac{1}{2}$ halves the percentage uncertainty: 1.5% of $${dpStr(Y[row], 3)}$ is $${dpStr(dY[row], 3)}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Plot the graph with error bars, draw the line of best fit and determine its gradient, in $(\text{W m}^{-2})^{-1/2}\ \text{m}^{-1}$.`, value: fit.m, tol: 0.08, wrong: [1 / fit.m], explanation: t`Best-fit gradient $\approx ${sfStr(fit.m, 3)}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Draw the worst acceptable line and determine the absolute uncertainty in the gradient.", value: dm, tol: 0.04, wrong: [fit.m], explanation: t`Worst lines through all the error bars have gradients of about $${sfStr(w.shallow.m, 3)}$ and $${sfStr(w.steep.m, 3)}$; uncertainty $\approx ${sfStr(dm, 2)}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Use the gradient and the y-intercept of your best-fit line to determine c, in m.", value: c, tol: 0.012, unit: "m", wrong: [fit.c], explanation: t`y-intercept $\approx ${dpStr(fit.c, 3)}$; $c = \dfrac{\text{intercept}}{\text{gradient}} = \dfrac{${dpStr(fit.c, 3)}}{${sfStr(fit.m, 3)}} \approx ${sfStr(c, 2)}\ \text{m}$.` }),
        P.num({ label: "(f)", marks: 2, stem: "Determine k, in W.", value: k, tol: 0.008, unit: "W", wrong: [1 / fit.m], explanation: t`$k = \dfrac{1}{\text{gradient}^{2}} = \dfrac{1}{${sfStr(fit.m, 3)}^{2}} \approx ${sfStr(k, 3)}\ \text{W}$ (unit: $\text{W m}^{-2} \times \text{m}^{2}$).` }),
        P.num({ label: "(g)", marks: 1, stem: "Determine the absolute uncertainty in k, in W.", value: dk, tol: 0.004, unit: "W", wrong: [k * (dm / fit.m)], explanation: t`$k \propto \text{gradient}^{-2}$, so its percentage uncertainty is twice that of the gradient: $2 \times \dfrac{${sfStr(dm, 2)}}{${sfStr(fit.m, 3)}} \times ${sfStr(k, 3)} \approx ${sfStr(dk, 1)}\ \text{W}$.` }),
        P.manual({ label: "(h)", marks: 2, stem: t`For a point source, $I = \dfrac{P}{4\pi r^{2}}$. Use your value of k to estimate the light power P emitted by the lamp, and comment on the value of c.`, points: [
          t`$k = P/4\pi$, so $P = 4\pi k \approx ${sfStr(4 * Math.PI * k, 2)}\ \text{W}$ (a small fraction of the lamp's electrical power, most being infrared/heat).`,
          t`$c \approx ${sfStr(c, 2)}\ \text{m}$ is positive: the filament is about ${sfStr(c * 100, 1)} cm behind the front of the housing, so distances must be measured from the filament (the inverse-square law in x alone would not fit).`,
        ], modelAnswer: t`Comparing with $I = P/4\pi r^{2}$ with $r = x + c$, $k = P/4\pi$, so $P = 4\pi k \approx ${sfStr(4 * Math.PI * k, 2)}\ \text{W}$ of light, only a small part of the lamp's electrical power. The value $c \approx ${sfStr(c, 2)}\ \text{m}$ shows that the filament is about ${sfStr(c * 100, 1)} cm behind the front of the housing, so the true distance from the source is $x + c$.` }),
        P.manual({ label: "(i)", marks: 1, stem: "Explain why the error bars on your graph become longer as x increases.", points: ["Δ(I^(−1/2)) = 1.5% of I^(−1/2), and I^(−1/2) increases with x, so the absolute uncertainty increases."], modelAnswer: "The percentage uncertainty in I^(−1/2) is always 1.5%, but I^(−1/2) itself gets larger as x increases, so its absolute uncertainty, and the error bar, grows." }),
      ]),
      explanation: t`$I^{-1/2} = (x + c)/\sqrt{k}$: gradient $1/\sqrt{k}$, intercept $c/\sqrt{k}$; worst lines give the uncertainty.`,
      hints: ["Take the inverse square root of both sides.", "The worst line must pass through every error bar."],
    });
  }
});
