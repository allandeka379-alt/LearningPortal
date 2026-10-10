// W4b exam-format items for ZIMSEC A-Level Statistics: ZS1 ×3 (10 marks, Paper 1), ZS2A ×2 (8, Paper 2 Section A),
// ZS2B ×3 (16, Paper 2 Section B). Every value is computed and checked here.
import { concept, P, t, chk, expo, mean, s2, tTable, binom, biv, sum, chi2Stat, chi2Table, expectedTable, movingAverages, table, ZS } from "../lib.mjs";
import { f3, f4, NB, NBd, NBt } from "../tables/w4b-kit.mjs";

const { sqrt, exp, log } = Math;
const Q = (k) => `amaths.${k}`;
const base = (marks, paper) => ({ marks, secs: 90 * marks, examStyle: true, calculator: true, paper });
const T = (nu, p) => tTable(nu, p).toFixed(3);
const C = (nu, a) => chi2Table(nu, a).toFixed(3);

concept(Q("continuous.rectangular-exponential"), { file: "exam/w4b-zimsec-statistics", keyPrefix: "exam.w4b-zimsec-statistics", applies: ZS }, (b) => {
  // ---------------------------------------------------------------- ZS1-1 (10): exponential lifetimes
  const l1 = 1 / 250;
  const p1b = expo.gt(l1, 300), p1c = expo.gt(l1, 100) - expo.gt(l1, 400), m1 = log(2) / l1, p1e = expo.gt(l1, 100);
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("continuous.rectangular-exponential")],
    stem: t`The lifetime $T$ hours of a type of radio battery sold in Gweru is modelled by an exponential distribution with mean $250$ hours.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the value of the parameter λ.", value: l1, sf: 3, wrong: [250],
        explanation: t`Mean $= \frac{1}{\lambda} = 250$, so $\lambda = 0.004$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the probability that a battery lasts more than 300 hours, correct to 3 significant figures.", value: p1b, wrong: [f3(1 - p1b)],
        explanation: t`$\mathrm{P}(T > 300) = \mathrm{e}^{-0.004 \times 300} = \mathrm{e}^{-1.2} = ${f3(p1b)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find P(100 < T < 400), correct to 3 significant figures.", value: p1c, wrong: [f3(expo.gt(l1, 300))],
        explanation: t`$\mathrm{e}^{-0.4} - \mathrm{e}^{-1.6} = ${f4(exp(-0.4))} - ${f4(exp(-1.6))} = ${f3(p1c)}$.` }),
      P.num({ label: "(d)", marks: 2, stem: "Find the median lifetime, correct to 3 significant figures.", value: m1, unit: "h", wrong: [250],
        explanation: t`$\mathrm{e}^{-0.004m} = 0.5 \Rightarrow m = 250\ln 2 = ${f3(m1)}$ hours.` }),
      P.num({ label: "(e)", marks: 1, stem: "A battery has already lasted 200 hours. Find the probability that it lasts a total of more than 300 hours, correct to 3 significant figures.", value: p1e, wrong: [f3(p1b)],
        explanation: t`Memoryless: $\mathrm{P}(T > 300 \mid T > 200) = \mathrm{P}(T > 100) = \mathrm{e}^{-0.4} = ${f3(p1e)}$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "Give one reason why an exponential model might not be suitable for battery lifetimes.",
        points: ["The exponential model is memoryless: it assumes a used battery is as good as new.", "Batteries wear out (run down with use), so the chance of failing in the next hour increases with age; the model ignores this."],
        modelAnswer: "The exponential distribution assumes failures happen at random at a constant rate, so an old battery is as good as a new one. Real batteries run down with use, so their failure rate rises with age.",
        explanation: "Memoryless versus wear-out." }),
    ],
    explanation: "λ = 1/mean; P(T > t) = e^(−λt); median ln 2/λ; memoryless property.",
    hints: ["λ = 1/250.", "P(T > t) = e^(−λt)."],
  });

  // ---------------------------------------------------------------- ZS2A-1 (8): rectangular distribution
  const v4 = 400 / 12;
  b.struct({
    d: 3, ...base(8, "Paper 2"), skill: "APPLICATION",
    concepts: [Q("continuous.rectangular-exponential")],
    stem: t`A shuttle bus leaves a Victoria Falls hotel every $20$ minutes. A tourist arrives at a random time, and her waiting time $W$ minutes is modelled by $W \sim \mathrm{U}(0, 20)$.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Find P(W > 12).", value: 0.4, wrong: [0.6],
        explanation: t`$\frac{20 - 12}{20} = 0.4$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find E(W) and Var(W), giving the variance correct to 3 significant figures.", template: "E(W) = {{blank:m}} min, Var(W) = {{blank:v}} min²",
        blanks: [NB("m", 10, 20), NB("v", v4, f3(20 / 12))],
        explanation: t`$\mathrm{E}(W) = \frac{0 + 20}{2} = 10$; $\mathrm{Var}(W) = \frac{20^2}{12} = ${f3(v4)}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the probability that the waiting time is within 3 minutes of its mean.", value: 0.3, wrong: [0.15],
        explanation: t`$\mathrm{P}(7 < W < 13) = \frac{6}{20} = 0.3$. ($0.15$ uses only one side of the mean.)` }),
      P.proof({ label: "(d)", marks: 3, stem: t`Show by integration that $\mathrm{E}(W^2) = \dfrac{400}{3}$, and hence verify your variance in (b).`,
        points: ["M1 writes E(W²) = ∫ w²/20 dw from 0 to 20.", "A1 evaluates [w³/60] from 0 to 20 = 8000/60 = 400/3.", "A1 Var = 400/3 − 10² = 100/3 ≈ 33.3."],
        modelAnswer: t`$$
\mathrm{E}(W^2) = \int_0^{20} \frac{w^2}{20}\,\mathrm{d}w = \left[\frac{w^3}{60}\right]_0^{20} = \frac{8000}{60} = \frac{400}{3}
$$
$$
\mathrm{Var}(W) = \frac{400}{3} - 10^2 = \frac{100}{3} = 33.3
$$`,
        explanation: "Var = E(W²) − [E(W)]²." }),
    ],
    explanation: "For U(a, b): probabilities are lengths over b − a; mean (a + b)/2; variance (b − a)²/12.",
    hints: ["f(w) = 1/20.", "Within 3 of the mean: 7 < W < 13."],
  });
  chk(v4, 100 / 3, 1e-12);
  // ---------------------------------------------------------------- ZS1-2 (10): t interval and test
  const d2 = [56, 61, 58, 63, 55, 60, 59, 57, 62, 54];
  const m2 = mean(d2), v2 = s2(d2), sd2 = sqrt(v2);
  const h2 = (tTable(9, 0.975) * sd2) / sqrt(10);
  const t2 = (m2 - 56) / (sd2 / sqrt(10));
  if (!(t2 > tTable(9, 0.95) && t2 < tTable(9, 0.99))) throw new Error("ZS1-2 conclusion");
  b.struct({
    d: 4, ...base(10, "Paper 1"), skill: "ANALYSIS",
    concepts: [Q("inference.t-distribution")],
    stem: t`The masses, in grams, of $10$ randomly chosen eggs from a Mashonaland poultry farm are: ${d2.join(", ")}. Masses are normally distributed.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the sample mean and an unbiased estimate of the population variance, giving the variance correct to 3 significant figures.", template: "mean = {{blank:m}} g, variance = {{blank:v}} g²",
        blanks: [NB("m", m2, undefined, 1), NB("v", v2, f3((v2 * 9) / 10), 2)],
        explanation: t`$\sum x = ${sum(d2)}$, $\sum x^2 = ${sum(d2.map((x) => x * x))}$; $\bar{x} = ${m2}$; $s^2 = \frac{1}{9}\left(${sum(d2.map((x) => x * x))} - \frac{${sum(d2)}^2}{10}\right) = ${f4(v2)}$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find a 95% confidence interval for the mean mass, giving the limits correct to 3 significant figures.", template: "{{blank:lo}} g to {{blank:hi}} g",
        blanks: [NB("lo", m2 - h2, f3(m2 - (1.96 * sd2) / sqrt(10)), 1), NB("hi", m2 + h2, f3(m2 + (1.96 * sd2) / sqrt(10)), 2)],
        explanation: t`$\nu = 9$, $t_9(0.975) = ${T(9, 0.975)}$; $${m2} \pm ${T(9, 0.975)} \times \frac{${f4(sd2)}}{\sqrt{10}} = ${m2} \pm ${f4(h2)}$, i.e. $(${f3(m2 - h2)}, ${f3(m2 + h2)})$ g.` }),
      P.num({ label: "(c)", marks: 2, stem: "The farm's old breed had mean mass 56 g. Calculate the t statistic for testing whether the mean mass is now greater than 56 g, correct to 3 significant figures.", value: t2, wrong: [f3((m2 - 56) / sd2)],
        explanation: t`$t = \frac{${m2} - 56}{${f4(sd2)}/\sqrt{10}} = ${f3(t2)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Complete the test at the 5% significance level, stating your conclusion in context.",
        points: [t`$H_0: \mu = 56$, $H_1: \mu > 56$; critical value $t_9(0.95) = ${T(9, 0.95)}$.`, t`$${f3(t2)} > ${T(9, 0.95)}$: reject $H_0$; there is evidence that the mean mass is greater than 56 g.`],
        modelAnswer: t`One-tailed test with $\nu = 9$: critical value $${T(9, 0.95)}$. Since $${f3(t2)} > ${T(9, 0.95)}$, reject $H_0$ at the 5% level: there is evidence that the new breed lays heavier eggs on average.`,
        explanation: "Compare with the upper 5% point of t₉." }),
    ],
    explanation: "Small sample, normal population, σ unknown: use t with 9 degrees of freedom.",
    hints: ["Divide by n − 1 = 9 for s².", "One-tailed 5%: t₉(0.95)."],
  });
  // ---------------------------------------------------------------- ZS1-3 (10): quarterly moving averages
  const d3 = [33, 22, 18, 30, 37, 25, 20, 35];
  const c3 = movingAverages(d3, 4);
  chk(c3[0], 26.25); chk(c3[3], 28.625);
  const dev5 = d3[4] - c3[2];
  b.struct({
    d: 3, ...base(10, "Paper 1"), skill: "APPLICATION",
    concepts: [Q("timeseries.moving-averages")],
    stem: t`A Mutare hardware store's sales of roofing sheets (hundreds) in the four quarters of two years were:

${table(["Year", "Q1", "Q2", "Q3", "Q4"], [[1, ...d3.slice(0, 4)], [2, ...d3.slice(4)]])}`,
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Why is a four-point moving average used?",
        options: [
          ["The seasonal pattern repeats every four quarters", "Correct: one value from each quarter cancels the seasonal effect."],
          ["There are eight values, which is divisible by four", "The number of values does not decide the order; the length of the cycle does."],
          ["Four points give the most accurate trend line", "Accuracy depends on matching the cycle, not on choosing four."],
          ["Moving averages must always be of order four", "The order matches the cycle: 3 for termly, 12 for monthly data."],
        ],
        answer: "A", explanation: "Order = length of the seasonal cycle." }),
      P.fib({ label: "(b)", marks: 4, stem: "Calculate the four centred four-point moving averages (correct to 3 decimal places where necessary).", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}",
        blanks: c3.map((v, i) => NBd("abcd"[i], v, 3, undefined, 1)),
        explanation: t`Four-point averages $25.75, 26.75, 27.5, 28, 29.25$; centred: $${c3.join(", ")}$ for quarters 3 to 6.` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the seasonal deviation (actual minus centred average) for quarter 1 of year 2.", value: dev5, dp: 3, wrong: [d3[4] - c3[3]],
        explanation: t`Quarter 1 of year 2 is quarter 5, with centred average $${c3[2]}$: $37 - ${c3[2]} = ${dev5}$.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe the trend and the seasonal pattern in the sales.",
        points: [t`Trend upward: centred averages rise from $26.25$ to $28.625$.`, t`About $${f3((c3[3] - c3[0]) / 3)}$ hundred sheets per quarter.`, "Seasonal: highest in Q1 and Q4, lowest in Q3."],
        modelAnswer: t`Sales are rising steadily, by about ${f3((c3[3] - c3[0]) / 3)} hundred sheets a quarter, with a seasonal pattern: high in Q1 and Q4 (building before and after the rains) and lowest in Q3.`,
        explanation: "Trend from the moving averages; season from the raw data." }),
    ],
    explanation: "Centred four-point averages remove the quarterly pattern and show the trend.",
    hints: ["Average consecutive four-point averages to centre them."],
  });
  // ---------------------------------------------------------------- ZS2A-2 (8): regression from summaries
  const n5 = 10, Sx = 120, Sy = 380;
  const Sxx = 1600 - (Sx * Sx) / n5, Syy = 15200 - (Sy * Sy) / n5, Sxy = 4820 - (Sx * Sy) / n5;
  chk(Sxx, 160); chk(Syy, 760); chk(Sxy, 260);
  const b5 = Sxy / Sxx, a5 = Sy / n5 - (b5 * Sx) / n5, r5 = Sxy / sqrt(Sxx * Syy);
  chk(b5, 1.625); chk(a5, 18.5);
  b.struct({
    d: 3, ...base(8, "Paper 2"), skill: "APPLICATION",
    concepts: [Q("bivariate.regression-correlation")],
    stem: t`For $10$ Form 6 learners, $x$ is the number of past papers attempted and $y$ the mock examination mark: $\sum x = 120$, $\sum y = 380$, $\sum x^2 = 1600$, $\sum y^2 = 15\,200$, $\sum xy = 4820$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the product moment correlation coefficient, correct to 3 significant figures.", value: r5, wrong: [f3(r5 ** 2)],
        explanation: t`$S_{xx} = 160$, $S_{yy} = 760$, $S_{xy} = 260$; $r = \frac{260}{\sqrt{160 \times 760}} = ${f3(r5)}$.` }),
      P.fib({ label: "(b)", marks: 3, stem: "Find the regression line of y on x in the form y = a + bx.", template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [NB("a", a5, f3(38 - (260 / 760) * 12), 1), NBt("b", 1.625, 0.006, f3(260 / 760), 2)],
        explanation: t`$b = \frac{260}{160} = 1.625$; $a = 38 - 1.625 \times 12 = 18.5$; $y = 18.5 + 1.625x$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Estimate the mark of a learner who attempted 15 past papers, correct to 3 significant figures.", value: a5 + b5 * 15, wrong: [f3(a5 + b5 * 12)],
        explanation: t`$18.5 + 1.625 \times 15 = ${f3(a5 + b5 * 15)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Comment on the reliability of your estimate in (c).",
        points: [t`$r = ${f3(r5)}$ is only moderately strong ($r^2 \approx ${f3(r5 ** 2)}$), so marks vary a lot about the line.`, "15 is within the likely range of x (mean 12), so it is interpolation; but n = 10 is small, so the estimate is only rough."],
        modelAnswer: t`The correlation is moderate ($r = ${f3(r5)}$, explaining about ${Math.round(r5 ** 2 * 100)}% of the variation), and the sample is small, so the estimate is only a rough guide, although 15 papers is probably within the data range.`,
        explanation: "Strength of correlation and interpolation/extrapolation." }),
    ],
    explanation: "Summary statistics → r → y on x line → estimate and comment.",
    hints: ["Sxx = Σx² − (Σx)²/n."],
  });

  // ---------------------------------------------------------------- ZS2B-2 (16): regression from raw data
  const x7 = [3, 4, 5, 6, 7, 8, 9, 10], y7 = [21, 24, 30, 31, 37, 38, 44, 45];
  const r7 = biv(x7, y7);
  const est7 = r7.a + r7.b * 7.5, estx = r7.ax + r7.bx * 40;
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("bivariate.regression-correlation")],
    stem: t`An agricultural officer records the age $x$ years and the yield $y$ kg of eight mango trees at a Mutoko orchard:

${table(["x", ...x7], [["y", ...y7]])}

$\sum x = ${sum(x7)}$, $\sum y = ${sum(y7)}$, $\sum x^2 = ${sum(x7.map((v) => v * v))}$, $\sum y^2 = ${sum(y7.map((v) => v * v))}$, $\sum xy = ${sum(x7.map((v, i) => v * y7[i]))}$.`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe what a scatter diagram of these data would show.",
        points: ["The points rise from left to right: positive correlation.", "They lie close to a straight line (strong linear correlation), with no outliers."],
        modelAnswer: "A strong positive linear pattern: older trees give higher yields, and the eight points lie close to a straight line.",
        explanation: "Direction, form, strength." }),
      P.fib({ label: "(b)", marks: 3, stem: "Calculate Sxx, Syy and Sxy.", template: "Sxx = {{blank:a}}, Syy = {{blank:b}}, Sxy = {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: [String(r7.Sxx)], tolerance: 0.05 }, { id: "b", input: "number", accepted: [String(r7.Syy)], tolerance: 0.05 }, { id: "c", input: "number", accepted: [String(r7.Sxy)], tolerance: 0.05 }],
        explanation: t`$S_{xx} = 380 - \frac{52^2}{8} = ${r7.Sxx}$; $S_{yy} = 9652 - \frac{270^2}{8} = ${r7.Syy}$; $S_{xy} = 1904 - \frac{52 \times 270}{8} = ${r7.Sxy}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Find the product moment correlation coefficient and the coefficient of determination, each correct to 3 significant figures.", template: "r = {{blank:r}}, r² = {{blank:d}}",
        blanks: [NB("r", r7.r, f3(r7.r ** 2), 2), NB("d", r7.r ** 2, f3(r7.r), 1)],
        explanation: t`$r = \frac{${r7.Sxy}}{\sqrt{${r7.Sxx} \times ${r7.Syy}}} = ${f3(r7.r)}$; $r^2 = ${f3(r7.r ** 2)}$: about ${Math.round(r7.r ** 2 * 100)}% of the variation in yield is explained by age.` }),
      P.fib({ label: "(d)", marks: 3, stem: "Find the regression line of y on x, y = a + bx, giving a and b correct to 3 significant figures.", template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [NB("a", r7.a, f3(r7.ax), 1), NB("b", r7.b, f3(r7.bx), 2)],
        explanation: t`$b = \frac{${r7.Sxy}}{${r7.Sxx}} = ${f3(r7.b)}$; $a = ${r7.my} - ${f4(r7.b)} \times ${r7.mx} = ${f3(r7.a)}$.` }),
      P.num({ label: "(e)", marks: 1, stem: "Estimate the yield of a tree aged 7.5 years, correct to 3 significant figures.", value: est7, unit: "kg", wrong: [f3(r7.ax + r7.bx * 7.5)],
        explanation: t`$${f3(r7.a)} + ${f3(r7.b)} \times 7.5 = ${f3(est7)}$ kg.` }),
      P.num({ label: "(f)", marks: 2, stem: "The officer wants to estimate the age of a tree that yielded 40 kg. Using the regression line of x on y, x = c + dy (with d = Sxy/Syy), estimate the age, correct to 3 significant figures.", value: estx, wrong: [f3((40 - r7.a) / r7.b)],
        explanation: t`$d = \frac{${r7.Sxy}}{${r7.Syy}} = ${f4(r7.bx)}$, $c = ${r7.mx} - ${f4(r7.bx)} \times ${r7.my} = ${f4(r7.ax)}$; $x = ${f4(r7.ax)} + ${f4(r7.bx)} \times 40 = ${f3(estx)}$ years. (Rearranging the y on x line gives $${f3((40 - r7.a) / r7.b)}$, which is not the correct line for estimating x.)` }),
      P.manual({ label: "(g)", marks: 2, stem: "Explain why it would be unwise to use the y on x line to estimate the yield of a 25-year-old tree.",
        points: ["25 years is far outside the data range (3 to 10 years): extrapolation.", "Yields of old trees level off or fall, so the linear increase is unlikely to continue."],
        modelAnswer: "Age 25 is well beyond the observed 3–10 years, so the line would be extrapolated; mango yields do not keep rising for ever, so the estimate would probably be far too high.",
        explanation: "Extrapolation is unreliable." }),
    ],
    explanation: "Scatter → S values → r and r² → regression lines → estimates and their reliability.",
    hints: ["Use x on y to estimate x from y.", "Is 25 inside the data range?"],
  });
  // ---------------------------------------------------------------- ZS2B-1 (16): contingency table with combining
  const full = [[21, 32, 33, 4], [24, 18, 14, 4]];
  const efull = expectedTable(full);
  chk(efull[0][3], 4.8, 1e-9); chk(efull[1][3], 3.2, 1e-9);
  const t6 = [[21, 32, 37], [24, 18, 18]];
  const e6 = expectedTable(t6);
  const x6 = chi2Stat(t6.flat(), e6.flat());
  if (!(x6 < chi2Table(2, 0.05))) throw new Error("ZS2B-1 conclusion");
  const contrib = t6.flat().map((o, i) => (o - e6.flat()[i]) ** 2 / e6.flat()[i]);
  chk(Math.max(...contrib), 2, 1e-12);
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("inference.chi-squared")],
    stem: t`A careers officer asks $150$ Form 6 learners in Manicaland which career area they prefer.

${table(["", "Teaching", "Health", "Engineering", "Agriculture", "Total"], [["Urban school", 21, 32, 33, 4, 90], ["Rural school", 24, 18, 14, 4, 60], ["Total", 45, 50, 47, 8, 150]])}

She tests, at the 5% level, whether career preference is independent of school location.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the expected frequencies for urban learners preferring teaching, health and agriculture (one decimal place where necessary).", template: "teaching: {{blank:a}}, health: {{blank:b}}, agriculture: {{blank:c}}",
        blanks: [NB("a", efull[0][0], 22), NB("b", efull[0][1], 31), NB("c", efull[0][3], 4)],
        explanation: t`$E = \frac{\text{row} \times \text{column}}{150}$: $\frac{90 \times 45}{150} = 27$, $\frac{90 \times 50}{150} = 30$, $\frac{90 \times 8}{150} = 4.8$.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why the Engineering and Agriculture columns are combined before the test.",
        points: ["The expected frequencies for agriculture (4.8 and 3.2) are below 5.", "Combining with a neighbouring column (Engineering) makes every expected frequency at least 5, so the χ² approximation is valid."],
        modelAnswer: "Both agriculture cells have expected frequencies below 5 (4.8 and 3.2). They are merged with engineering so that all expected frequencies are at least 5.",
        explanation: "Rule of 5." }),
      P.num({ label: "(c)", marks: 4, stem: "After combining, calculate the test statistic X², correct to 3 significant figures.", value: x6, wrong: [f3(chi2Stat(full.flat(), efull.flat()))],
        explanation: t`Combined column: urban $37$, rural $18$ (total $55$). Expected: urban $27, 30, 33$; rural $18, 20, 22$. Contributions: ${contrib.map((c) => f3(c)).join(", ")}; $X^2 = ${f3(x6)}$.` }),
      P.num({ label: "(d)", marks: 1, stem: "State the number of degrees of freedom.", value: 2, wrong: [3],
        explanation: t`After combining the table is $2 \times 3$: $\nu = (2 - 1)(3 - 1) = 2$.` }),
      P.num({ label: "(e)", marks: 1, stem: "State the critical value, correct to 3 decimal places.", value: chi2Table(2, 0.05), dp: 3, wrong: [C(3, 0.05)],
        explanation: t`$\chi^2_2(5\%) = ${C(2, 0.05)}$.` }),
      P.manual({ label: "(f)", marks: 2, stem: "State the conclusion of the test in context.",
        points: [t`$${f3(x6)} < ${C(2, 0.05)}$, so do not reject $H_0$.`, "There is insufficient evidence at the 5% level of an association between school location and career preference."],
        modelAnswer: t`Since $${f3(x6)} < ${C(2, 0.05)}$, $H_0$ is not rejected: the data do not give significant evidence that career preference depends on whether the school is urban or rural.`,
        explanation: "Upper-tailed test." }),
      P.mcq({ label: "(g)", marks: 1, stem: "Which cell makes the largest contribution to X²?",
        options: [
          ["Rural, teaching", t`Correct: $\frac{(24 - 18)^2}{18} = 2$ is the largest contribution.`],
          ["Urban, teaching", t`$\frac{(21 - 27)^2}{27} = ${f3(36 / 27)}$, smaller because $E$ is larger.`],
          ["Urban, engineering or agriculture", t`$\frac{(37 - 33)^2}{33} = ${f3(16 / 33)}$.`],
          ["Rural, health", t`$\frac{(18 - 20)^2}{20} = 0.2$.`],
        ],
        answer: "A", explanation: "Equal differences give larger contributions when the expected frequency is smaller." }),
      P.manual({ label: "(h)", marks: 2, stem: "Comment on what the largest contribution suggests, despite the overall result.",
        points: ["More rural learners prefer teaching than expected under independence (24 against 18).", "But the overall test is not significant, so this could be chance; a larger survey would be needed."],
        modelAnswer: "Rural learners chose teaching more often than independence predicts (24 vs 18), but since X² is not significant this difference may be due to chance.",
        explanation: "Interpret the sign of O − E, but respect the test result." }),
    ],
    explanation: "Expected frequencies → combine classes with E < 5 → X² → ν = (r − 1)(c − 1) → conclusion.",
    hints: ["E = row total × column total / 150.", "Count the columns after combining."],
  });

  // ---------------------------------------------------------------- ZS2B-3 (16): binomial goodness of fit
  const o8 = [40, 46, 26, 6, 2];
  const N8 = 120;
  const p8 = sum(o8.map((f, r) => f * r)) / (4 * N8);
  chk(p8, 124 / 480, 1e-12);
  const E8 = [0, 1, 2, 3, 4].map((r) => N8 * binom.pmf(4, p8, r));
  if (!(E8[3] >= 5 && E8[4] < 5)) throw new Error("ZS2B-3 combining");
  const oc8 = [40, 46, 26, 8], ec8 = [E8[0], E8[1], E8[2], E8[3] + E8[4]];
  const x8 = chi2Stat(oc8, ec8);
  if (!(x8 < chi2Table(2, 0.05))) throw new Error("ZS2B-3 conclusion");
  b.struct({
    d: 4, ...base(16, "Paper 2"), skill: "ANALYSIS",
    concepts: [Q("inference.chi-squared")],
    stem: t`Mangoes are packed in boxes of $4$ at a Mutoko packhouse. The number of bruised mangoes in each of $120$ boxes was recorded.

${table(["Bruised mangoes", "0", "1", "2", "3", "4"], [["Boxes", ...o8]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Estimate the probability p that a mango is bruised, correct to 3 significant figures.", value: p8, wrong: [f3(124 / 120)],
        explanation: t`Bruised mangoes: $0(40) + 1(46) + 2(26) + 3(6) + 4(2) = 124$ out of $480$, so $\hat{p} = \frac{124}{480} = ${f3(p8)}$.` }),
      P.fib({ label: "(b)", marks: 4, stem: "A binomial model B(4, p) is fitted with this estimate. Find the expected frequencies for 0, 1, 2 and 3 bruised mangoes, correct to 3 significant figures.", template: "0: {{blank:a}}, 1: {{blank:b}}, 2: {{blank:c}}, 3: {{blank:d}}",
        blanks: E8.slice(0, 4).map((e, i) => NB("abcd"[i], e, undefined, 1)),
        explanation: t`$120\binom{4}{r}\hat{p}^r(1 - \hat{p})^{4 - r}$: ${E8.slice(0, 4).map((e) => f3(e)).join(", ")}; and $E_4 = ${f3(E8[4])}$.` }),
      P.num({ label: "(c)", marks: 4, stem: "Combining classes where necessary, calculate the test statistic X², correct to 3 significant figures.", value: x8, wrong: [f3(chi2Stat(o8, E8))],
        explanation: t`$E_4 = ${f3(E8[4])} < 5$, so combine "3" and "4": $O = 8$, $E = ${f3(ec8[3])}$. Contributions: ${oc8.map((o, i) => f3((o - ec8[i]) ** 2 / ec8[i])).join(", ")}; $X^2 = ${f3(x8)}$.` }),
      P.num({ label: "(d)", marks: 1, stem: "State the number of degrees of freedom.", value: 2, wrong: [3],
        explanation: t`4 classes after combining, minus 1 (total), minus 1 (estimated $p$): $\nu = 2$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Test at the 5% significance level whether the binomial model is suitable.",
        points: [t`$H_0$: B(4, p) fits; critical value $\chi^2_2(5\%) = ${C(2, 0.05)}$.`, t`$${f3(x8)} < ${C(2, 0.05)}$: do not reject $H_0$; the binomial model fits the data.`],
        modelAnswer: t`$X^2 = ${f3(x8)} < ${C(2, 0.05)}$, so there is no evidence against the binomial model: bruising appears to happen independently with a constant probability.`,
        explanation: "Upper-tailed test with ν = 2." }),
      P.num({ label: "(f)", marks: 1, stem: "If the packhouse had claimed in advance that p = 0.25 (so p is not estimated), how many degrees of freedom would the test have?", value: 3, wrong: [2],
        explanation: "Nothing is estimated, so ν = 4 − 1 = 3." }),
      P.manual({ label: "(g)", marks: 2, stem: "State two conditions needed for the binomial model to be appropriate in this context.",
        points: ["Each mango in a box is bruised independently of the others.", "The probability of bruising is the same for every mango."],
        modelAnswer: "Mangoes must be bruised independently (one bruised mango does not damage its neighbours) and every mango must have the same probability of bruising.",
        explanation: "Independence and constant p." }),
    ],
    explanation: "Estimate p from the mean, fit B(4, p), merge small classes, ν = classes − 1 − 1.",
    hints: ["Mean number bruised = 4p.", "The last expected frequency is below 5."],
  });
});
