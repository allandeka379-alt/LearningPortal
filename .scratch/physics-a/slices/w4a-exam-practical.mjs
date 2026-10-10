// W4a practical exam rows: PLANNING (absorption of gamma radiation by lead sheets: C = C₀e^(−μx)) and DATA_ANALYSIS
// (decay of protactinium-234m: corrected count rate against time, ln graph with error bars, worst lines, half-life
// with its uncertainty, background correction).
import { concept, P, t, chk, EXAM, checkExam, sfStr, dpStr, sciTex, ln, linFit, worstLines, table } from "../lib.mjs";

const A = (k) => `aphys.${k}`;

concept(A("nuclear.decay-law"), { file: "exam/w4a-practical", keyPrefix: "exam.w4a-practical" }, (b) => {
  // ---------------------------------------------------------------- PLANNING: absorption of gamma radiation by lead
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: false,
    concepts: [A("nuclear.radiations-decay-equations"), A("skills.planning")],
    stem: t`A sealed gamma source is placed at a fixed distance from a Geiger-Müller (GM) tube. Sheets of lead are placed between them. It is suggested that the count rate $C$ due to the source (after correcting for background) is related to the total thickness $x$ of lead by

$$
C = C_0e^{-\mu x}
$$

where $C_0$ and $\mu$ are constants. Plan an experiment to test this relationship and to determine $\mu$. Describe the arrangement in words, the measurements, the analysis and the safety precautions.`,
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the independent and dependent variables and the key variables to be kept constant.", points: ["Independent: total thickness x of lead; dependent: (corrected) count rate C.", "Constant: distance between source and GM tube, the source and GM tube (and their alignment), the counting time / operating voltage of the tube."], modelAnswer: "The independent variable is the thickness x of lead and the dependent variable is the count rate C after subtracting background. The source-to-tube distance, the alignment, the same source and GM tube, and the counting time must be kept constant." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the arrangement and the procedure.", points: [
        "GM tube connected to a counter (scaler) or ratemeter; source clamped in a holder at a fixed distance (e.g. 10 cm) in line with the tube window, on a bench marked or with a fixed stand.",
        "Measure the background count (source removed, far away) over a long time, e.g. 5 minutes, before and after the experiment.",
        "Place lead sheets in a holder between source and tube; record counts in a fixed time for at least six thicknesses (e.g. 0 to 25 mm), adding sheets one at a time.",
      ], modelAnswer: "Clamp the GM tube, connected to a counter, and the source in its holder at a fixed separation, say 10 cm, with the source facing the tube window. First measure the background count for five minutes with the source returned to its box. Then, with the source in place, record the counts in a fixed time with no lead and with at least six total thicknesses of lead up to about 25 mm, placing the sheets in a holder midway between source and tube." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe how each quantity would be measured.", points: [
        "Thickness of each sheet with a micrometer (or vernier callipers) at several places, averaged; total thickness by adding.",
        "Counts recorded with the counter over a measured time (stopwatch or the counter's timer); C = counts ÷ time.",
        "Background count rate subtracted from each count rate to give C.",
      ], modelAnswer: "Measure the thickness of each lead sheet with a micrometer at several points and average; add to find the total x. Record the number of counts with the counter in a fixed time measured by its timer or a stopwatch, and divide by the time to get the count rate. Subtract the background count rate from every reading." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the random nature of radioactive decay affects the measurements and how reliable results are obtained.", points: ["Counts fluctuate randomly, so short counts have large percentage uncertainties.", "Count for long enough to obtain large totals (e.g. at least several hundred counts) and/or repeat each reading and average; measure the background over a long time."], modelAnswer: "Because decay is random, the count in a fixed time fluctuates; small counts have large percentage uncertainty. Count long enough at each thickness to collect several hundred counts, and repeat and average, measuring the background over a long time as well." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the results would be analysed to test the relationship and find μ.", points: [
        t`Plot $\ln C$ against $x$.`,
        t`The relationship is supported if the graph is a straight line ($\ln C = \ln C_0 - \mu x$).`,
        t`$\mu = -$gradient (unit $\text{m}^{-1}$ or $\text{mm}^{-1}$); intercept $= \ln C_0$.`,
      ], modelAnswer: t`Taking natural logarithms, $\ln C = \ln C_0 - \mu x$. Plot $\ln C$ against $x$: a straight line supports the relationship, its gradient is $-\mu$ and its intercept is $\ln C_0$.` }),
      P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution, with a reason.", points: ["Handle the source with long tongs / keep it in its lead box when not in use / keep at a distance and minimise exposure time, because gamma radiation is penetrating and ionising (or lead is toxic: wash hands / wear gloves)."], modelAnswer: "Handle the source only with long tongs and return it to its lead-lined box when not in use, keeping exposure time short, because gamma radiation penetrates the body and ionises tissue." }),
      P.manual({ label: "(g)", marks: 1, stem: "Give one further detail that would improve the experiment.", points: ["Check by a preliminary test that the source emits only gamma (e.g. paper and aluminium have little effect) or place a few mm of aluminium in front of the source to absorb any beta / keep the GM tube voltage on the plateau / use a source holder that ensures the same position every time / avoid other sources nearby."], modelAnswer: "First test with paper and a few millimetres of aluminium to show that the source emits only gamma radiation (or permanently place aluminium in front of it to absorb any beta), so that the lead absorbs only gamma." }),
    ]),
    explanation: "Vary the lead thickness, keep the geometry fixed, correct for background, count for long times; ln C against x has gradient −μ.",
    hints: ["Take natural logarithms of the suggested relationship.", "Why do counts fluctuate?"],
  });

  // ---------------------------------------------------------------- DATA_ANALYSIS: decay of protactinium-234m
  {
    const lamTrue = 0.693 / 70;
    const ts = [10, 30, 50, 70, 90, 110]; // s
    const noise = [0.3, -0.4, 0.2, 0.3, -0.2, 0.1];
    const R0 = 31;
    const R = ts.map((tt, i) => Number((R0 * Math.exp(-lamTrue * tt) + noise[i]).toFixed(1)));
    const dR = 0.5;
    const Y = R.map(ln);
    const dY = R.map((r) => (ln(r + dR) - ln(r - dR)) / 2);
    const fit = linFit(ts, Y);
    const w = worstLines(ts.map((x, i) => ({ x, y: Y[i], dy: dY[i] })));
    const dm = Math.max(Math.abs(fit.m - w.steep.m), Math.abs(fit.m - w.shallow.m));
    const lam = -fit.m;
    const th = 0.693 / lam;
    const dth = th * (dm / lam);
    const row = 3;
    const tab = table([t`$t\,/\,\text{s}$`, t`$R\,/\,\text{s}^{-1}$`, t`$\ln(R/\text{s}^{-1})$`], ts.map((x, i) => [x, `${dpStr(R[i], 1)} ± ${dpStr(dR, 1)}`, i === row ? "" : `${dpStr(Y[i], 3)} ± ${dpStr(dY[i], 3)}`]));
    chk(Math.abs(th - 70) < 8 ? 1 : 0, 1);
    b.struct({
      d: 5, examStyle: true, skill: EXAM.DATA_ANALYSIS.skill, secs: EXAM.DATA_ANALYSIS.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: true,
      concepts: [A("nuclear.decay-law"), A("skills.data-analysis")],
      stem: t`Chipo studies the decay of protactinium-234m, a short-lived beta emitter, using a GM tube and counter. She records the counts in 10 s intervals centred on the times $t$ shown, subtracts the background count rate measured earlier, and calculates the corrected count rate $R$. It is suggested that

$$
R = R_0e^{-\lambda t}
$$

where $R_0$ and $\lambda$ are constants. Her results are:

${tab}`,
      parts: checkExam(EXAM.DATA_ANALYSIS, [
        P.manual({ label: "(a)", marks: 1, stem: "State what graph should be plotted to give a straight line, and how λ is found from it.", points: [t`Plot $\ln R$ against $t$: $\ln R = -\lambda t + \ln R_0$, so the gradient is $-\lambda$ (intercept $\ln R_0$).`], modelAnswer: t`Since $\ln R = \ln R_0 - \lambda t$, a graph of $\ln R$ against $t$ is a straight line with gradient $-\lambda$ and intercept $\ln R_0$.` }),
        P.group({ label: "(b)", stem: t`Complete the row for $t = ${ts[row]}\ \text{s}$.`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$\ln(R/\text{s}^{-1})$, to three decimal places`, value: Y[row], dp: 3, wrong: [Math.log10(R[row])], explanation: t`$\ln ${dpStr(R[row], 1)} = ${dpStr(Y[row], 3)}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`the absolute uncertainty in $\ln(R/\text{s}^{-1})$, to three decimal places`, value: dY[row], tol: 0.003, wrong: [dR], explanation: t`$\tfrac{1}{2}[\ln ${dpStr(R[row] + dR, 1)} - \ln ${dpStr(R[row] - dR, 1)}] = ${dpStr(dY[row], 3)}$ (about $\Delta R/R$).` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Plot $\ln(R/\text{s}^{-1})$ against $t$ with error bars, draw the best-fit line and determine its gradient, in $\text{s}^{-1}$.`, value: fit.m, tol: 0.0008, unit: "s⁻¹", wrong: [-fit.m], explanation: t`Using two well-separated points on the line, the gradient is about $${dpStr(fit.m, 4)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(d)", marks: 2, stem: t`Draw the worst acceptable straight line and determine the absolute uncertainty in the gradient, in $\text{s}^{-1}$.`, value: dm, tol: 0.0003, unit: "s⁻¹", wrong: [Math.abs(fit.m)], explanation: t`The steepest and shallowest lines through all the error bars have gradients of about $${dpStr(w.steep.m, 4)}$ and $${dpStr(w.shallow.m, 4)}\ \text{s}^{-1}$, so the uncertainty is about $${dpStr(dm, 4)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Use your gradient to determine the half-life of protactinium-234m, in s.`, value: th, tol: 6, unit: "s", wrong: [0.5 / lam], explanation: t`$\lambda = ${dpStr(lam, 4)}\ \text{s}^{-1}$; $t_{1/2} = 0.693/\lambda \approx ${sfStr(th, 2)}\ \text{s}$.` }),
        P.num({ label: "(f)", marks: 1, stem: "Determine the absolute uncertainty in your value of the half-life, in s.", value: dth, tol: 2, unit: "s", wrong: [dm], explanation: t`The percentage uncertainty in $t_{1/2}$ equals that in $\lambda$: $${dpStr(dm, 4)}/${dpStr(lam, 4)} \times 100 \approx ${sfStr((dm / lam) * 100, 2)}\%$, so $\Delta t_{1/2} \approx ${sfStr(dth, 1)}\ \text{s}$.` }),
        P.manual({ label: "(g)", marks: 2, stem: "The accepted half-life is 70 s. Comment on whether Chipo's results are consistent with this value.", points: [t`Her value: about ${sfStr(th, 2)} ± ${sfStr(dth, 1)} s, a range of roughly ${sfStr(th - dth, 2)} to ${sfStr(th + dth, 2)} s.`, Math.abs(th - 70) <= dth ? "70 s lies within this range, so the results are consistent with the accepted value." : "70 s lies outside this range, so the results are not consistent (a systematic error is likely)."], modelAnswer: t`Her half-life is about ${sfStr(th, 2)} s with an uncertainty of about ${sfStr(dth, 1)} s. ${Math.abs(th - 70) <= dth ? "The accepted 70 s lies within this range, so her results are consistent with it." : "The accepted 70 s lies outside this range, so there is probably a systematic error."}` }),
        P.manual({ label: "(h)", marks: 2, stem: "Explain why the background count rate must be subtracted before the graph is plotted, and why each count is taken over 10 s rather than over a longer time.", points: ["Background does not decay, so without subtraction ln(measured rate) would not fall linearly; the graph would curve and level off and the gradient would be too small.", "The source decays significantly during a long count (half-life about 70 s), so the count would not correspond to a single time; 10 s balances this against random uncertainty."], modelAnswer: "Only the source's count rate decays exponentially; the steady background would make the ln graph curve and flatten, giving too small a gradient. The source halves in about 70 s, so counting for much longer than 10 s would average over a large change in rate and blur the time; 10 s is a compromise with the random uncertainty of a short count." }),
        P.manual({ label: "(i)", marks: 1, stem: "Suggest one way of reducing the uncertainty in the half-life.", points: ["Repeat the whole experiment several times and average / use a data logger to record counts in many intervals / take readings over several half-lives / use a more active source so counts are larger."], modelAnswer: "Repeat the experiment several times (or log the counts with a data logger over several half-lives) and average, so that random fluctuations have less effect." }),
      ]),
      explanation: t`$\ln R = \ln R_0 - \lambda t$: gradient $-\lambda \approx ${dpStr(fit.m, 4)}\ \text{s}^{-1}$; $t_{1/2} = 0.693/\lambda$; worst lines give the uncertainty.`,
      hints: ["Take natural logarithms of both sides.", "The worst line must pass through every error bar."],
    });
  }
});
