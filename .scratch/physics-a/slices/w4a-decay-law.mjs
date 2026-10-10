// W4a: aphys.nuclear.decay-law — random/spontaneous decay, A = λN, Bq, half-life, λ = 0.693/t½, x = x₀e^(−λt),
// background correction, ln graphs, carbon dating, isotope choice.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, mean, halfRange, linFit, ln, table } from "../lib.mjs";

const { NA } = DATA;
const DAY = 86400, YEAR = 3.16e7;

concept("aphys.nuclear.decay-law", { file: "nuclear/decay-law", keyPrefix: "nuclear.decay-law" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the decay constant of a radioactive nuclide?",
    options: [
      ["the probability that a nucleus will decay per unit time", "Correct."],
      ["the time taken for half the nuclei to decay", "That is the half-life."],
      ["the number of nuclei that decay per second", "That is the activity."],
      ["the fraction of the original nuclei that are left undecayed after one half-life", "That is always one half."],
    ],
    answer: "A",
    explanation: "λ is the probability of decay per unit time for each nucleus; A = λN.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which observation is evidence that radioactive decay is random?",
    options: [
      ["Counts in equal times from a long-lived source vary about a mean.", "Correct: unpredictable numbers decay in equal intervals."],
      ["The activity of any source always halves in a fixed time.", "This is the predictable behaviour of a large sample."],
      ["Heating a source strongly in a flame does not change its measured activity.", "This shows decay is spontaneous, not random."],
      ["Alpha particles from a source are stopped by thin paper.", "This is about penetration, not about decay times."],
    ],
    answer: "A",
    explanation: "Fluctuations in counts in equal time intervals show that the moment of each decay cannot be predicted.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A radioactive sample has a half-life of 8.0 hours. What fraction of the original nuclei remains undecayed after 32 hours?",
    options: [
      ["1/16", "Correct: four half-lives, (1/2)⁴."],
      ["1/4", "This is after two half-lives (16 h)."],
      ["1/8", "This is after three half-lives (24 h)."],
      ["0", "Exponential decay never reaches zero."],
    ],
    answer: "A",
    explanation: "32/8.0 = 4 half-lives; (1/2)⁴ = 1/16.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the unit of the decay constant?",
    options: [
      [t`$\text{s}^{-1}$`, "Correct: a probability per unit time."],
      ["Bq", "The becquerel is the unit of activity (decays per second)."],
      ["s", "Seconds measure half-life, not λ."],
      ["Bq s", "λ = A/N has unit Bq, i.e. s⁻¹, not Bq s."],
    ],
    answer: "A",
    explanation: "λ = A/N: (decays per second) ÷ (number) = s⁻¹.",
  });
  {
    const lam = 0.693 / 12;
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "A graph of ln(corrected count rate / s⁻¹) against time is a straight line with gradient −0.0578 min⁻¹. What is the half-life?",
      options: [
        [t`$${sfStr(0.693 / 0.0578, 2)}\ \text{min}$`, "Correct: λ = 0.0578 min⁻¹, t½ = 0.693/λ."],
        [t`$${sfStr(0.301 / 0.0578, 2)}\ \text{min}$`, "This uses lg 2; the graph uses natural logarithms."],
        [t`$${sfStr(1 / 0.0578, 2)}\ \text{min}$`, "1/λ is the mean lifetime, not the half-life."],
        [t`$${sfStr(0.0578 / 0.693, 2)}\ \text{min}$`, "t½ = 0.693/λ, not λ/0.693."],
      ],
      answer: "A",
      explanation: t`Gradient $= -\lambda$, so $\lambda = 0.0578\ \text{min}^{-1}$ and $t_{1/2} = 0.693/0.0578 = ${sfStr(0.693 / 0.0578, 2)}\ \text{min}$.`,
      hints: ["The gradient of ln C against t is −λ."],
    });
    chk(lam, 0.05775, 1e-12);
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Sample X contains twice as many nuclei of a nuclide as sample Y of the same nuclide. Which statement is correct?",
    options: [
      ["X has twice the activity and the same half-life as Y.", "Correct: A = λN, λ fixed by the nuclide."],
      ["X has twice the activity and twice the half-life of Y.", "Half-life depends only on the nuclide."],
      ["X has the same activity and twice the half-life of Y.", "Activity is proportional to N."],
      ["X has half the activity of Y because its nuclei share the decay energy.", "Each nucleus decays independently."],
    ],
    answer: "A",
    explanation: "A = λN: doubling N doubles A; λ and t½ are properties of the nuclide.",
    hints: ["What does the half-life depend on?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which radioactive nuclide is most suitable as a tracer injected into a patient to image blood flow?",
    options: [
      ["a gamma emitter with a half-life of 6 hours", "Correct: gamma escapes the body; short half-life limits the dose but allows the scan."],
      ["an alpha emitter with a half-life of 6 hours", "Alpha would not leave the body and would damage tissue."],
      ["a gamma emitter with a half-life of 30 years", "The patient would stay radioactive for decades."],
      ["a beta emitter with a half-life of 2 seconds", "Beta is absorbed in tissue, and the activity would vanish before the scan."],
    ],
    answer: "A",
    explanation: "A medical tracer needs radiation that leaves the body (gamma) and a half-life of hours: long enough for the procedure, short enough to keep the dose low.",
    hints: ["Consider both the radiation type and the half-life."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A source has a measured count rate of 220 min⁻¹. One half-life later the measured count rate is 120 min⁻¹. What is the background count rate?",
    options: [
      ["20 min⁻¹", "Correct: (220 − B)/2 = 120 − B gives B = 20."],
      ["10 min⁻¹", "Check: (220 − 10)/2 = 105, not 110."],
      ["110 min⁻¹", "This is half the first reading, ignoring background."],
      ["0", "Without background the reading would be 110, not 120."],
    ],
    answer: "A",
    explanation: "Corrected rates halve: 120 − B = (220 − B)/2, so 240 − 2B = 220 − B and B = 20 min⁻¹.",
    hints: ["Only the corrected count rate halves."],
  });
  // Numerical
  {
    const th = 2.6 * YEAR; // Na-22 half-life 2.6 y
    const lam = 0.693 / th;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Sodium-22 has a half-life of 2.6 years. Calculate its decay constant in $\text{s}^{-1}$, to two significant figures (1 year $= 3.16 \times 10^{7}\ \text{s}$).`,
      value: lam, sf: 2, unit: "s⁻¹", answer: sciPlain(lam, 2), wrong: [0.693 / 2.6, 0.5 / th],
      explanation: t`$\lambda = \dfrac{0.693}{2.6 \times 3.16 \times 10^{7}} = ${sciTex(lam, 2)}\ \text{s}^{-1}$.`,
    });
  }
  {
    const m = 3.0e-6, M = 0.241, th = 432 * YEAR; // americium-241
    const N = (m / M) * NA, lam = 0.693 / th, A = lam * N;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`Americium-241 has a half-life of 432 years and a molar mass of $0.241\ \text{kg mol}^{-1}$. Calculate the activity of $3.0\ \text{mg}$ of americium-241, in Bq, to two significant figures. (1 year $= 3.16 \times 10^{7}\ \text{s}$, $N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$.)`,
      value: A, sf: 2, unit: "Bq", answer: sciPlain(A, 2), wrong: [(0.693 / 432) * N, lam * (3.0e-3 / M) * NA],
      explanation: t`1. $N = \dfrac{3.0 \times 10^{-6}}{0.241} \times 6.02 \times 10^{23} = ${sciTex(N)}$.
2. $\lambda = \dfrac{0.693}{432 \times 3.16 \times 10^{7}} = ${sciTex(lam)}\ \text{s}^{-1}$.
3. $A = \lambda N = ${sciTex(A, 2)}\ \text{Bq}$. Leaving λ in year⁻¹ gives decays per year, not becquerels; 3.0 mg is $3.0 \times 10^{-6}$ kg.`,
      hints: ["Convert mg to kg and the half-life to seconds."],
    });
  }
  {
    const A0 = 5.0e6, th = 15, tt = 40; // hours
    const A = A0 * Math.exp((-0.693 / th) * tt);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A sodium-24 source (half-life 15 hours) has an activity of $5.0 \times 10^{6}\ \text{Bq}$. Calculate its activity 40 hours later, in Bq, to two significant figures.`,
      value: A, sf: 2, unit: "Bq", answer: sciPlain(A, 2), wrong: [A0 * Math.exp(-0.693 * th * tt), A0 * Math.exp(-tt / th)],
      explanation: t`1. $\lambda = 0.693/15 = ${sfStr(0.693 / th, 3)}\ \text{h}^{-1}$.
2. $A = 5.0 \times 10^{6} \times e^{-${sfStr(0.693 / th, 3)} \times 40} = 5.0 \times 10^{6} \times ${sfStr(Math.exp((-0.693 / th) * tt), 3)}$.
3. $A = ${sciTex(A, 2)}\ \text{Bq}$.`,
      hints: ["Keep λ and t in the same units (hours)."],
    });
  }
  {
    const frac = 0.60, th = 5730;
    const tt = Math.log(1 / frac) / (0.693 / th);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: t`A wooden spear shaft has a carbon-14 activity per gram of carbon that is 0.60 of that in living wood. Taking the half-life of carbon-14 as 5730 years, estimate the age of the shaft, in years, to two significant figures.`,
      value: tt, sf: 2, unit: "years", wrong: [frac * th, Math.log10(1 / frac) / (0.693 / th)],
      explanation: t`1. $\lambda = 0.693/5730 = ${sciTex(0.693 / th)}\ \text{year}^{-1}$.
2. $0.60 = e^{-\lambda t} \Rightarrow t = \dfrac{\ln(1/0.60)}{\lambda}$.
3. $t = ${sfStr(tt, 2)}$ years. Using lg instead of ln gives too small an age.`,
      hints: ["Take natural logs of both sides."],
    });
  }
  {
    const counts = [412, 389, 437, 401, 421];
    const avg = mean(counts), hr = halfRange(counts);
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`A student records the number of counts from a long-lived source in five successive 1-minute intervals: ${counts.join(", ")}. Calculate the percentage uncertainty in the mean count, using half the range as the absolute uncertainty, to two significant figures.`,
      value: pctUnc(hr, avg), sf: 2, unit: "%", wrong: [pctUnc(2 * hr, avg)],
      explanation: t`Mean $= ${dpStr(avg, 1)}$; half-range $= (437 - 389)/2 = ${hr}$; $${hr}/${dpStr(avg, 1)} \times 100 = ${sfStr(pctUnc(hr, avg), 2)}\%$. The spread is due to the random nature of decay; counting for longer reduces the percentage uncertainty.`,
      hints: ["Half-range = (largest − smallest)/2."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Heating a radioactive source increases its activity.",
    answer: false,
    explanation: "False. Decay is spontaneous: it is not affected by temperature, pressure or chemical state.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each quantity with its unit.",
    pairs: [
      ["activity", "Bq"],
      ["decay constant", "s⁻¹"],
      ["half-life", "s"],
      ["number of undecayed nuclei", "no unit"],
    ],
    explanation: "A in Bq (s⁻¹); λ in s⁻¹; t½ in s (or any time unit); N is a pure number.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Radioactive decay is {{blank:a}} because the time at which a particular nucleus decays cannot be predicted, and {{blank:b}} because it is not affected by external conditions. A graph of ln(count rate) against time is a straight line whose gradient is minus the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["random"], choices: ["random", "spontaneous", "exponential"] },
      { id: "b", accepted: ["spontaneous"], choices: ["spontaneous", "random", "constant"] },
      { id: "c", accepted: ["decay constant"], choices: ["decay constant", "half-life", "activity"] },
    ],
    explanation: "Random: unpredictable; spontaneous: unaffected by conditions; ln C = ln C₀ − λt.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: t`Starting from $N = N_0e^{-\lambda t}$, show that the half-life is related to the decay constant by $t_{1/2} = \dfrac{0.693}{\lambda}$.`,
    points: [
      t`At $t = t_{1/2}$, $N = N_0/2$, so $\tfrac{1}{2} = e^{-\lambda t_{1/2}}$.`,
      t`Taking natural logs: $\ln\tfrac{1}{2} = -\lambda t_{1/2}$, i.e. $\ln 2 = \lambda t_{1/2}$.`,
      t`$t_{1/2} = \ln 2/\lambda = 0.693/\lambda$.`,
    ],
    modelAnswer: t`After one half-life $N = N_0/2$, so $N_0/2 = N_0e^{-\lambda t_{1/2}}$, giving $e^{\lambda t_{1/2}} = 2$. Taking natural logarithms, $\lambda t_{1/2} = \ln 2 = 0.693$, so $t_{1/2} = 0.693/\lambda$.`,
    explanation: "Substitute N = N₀/2 and take ln.",
    hints: ["What is N after one half-life?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "A factory uses a beta source and a detector to monitor the thickness of paper on a production line. Suggest, with reasons, a suitable half-life and explain why beta (rather than alpha or gamma) radiation is used.",
    points: [
      "Long half-life (years): the count rate (for constant thickness) stays steady, so changes are due only to thickness; the source need not be replaced often.",
      "Beta is partly absorbed by paper, so small changes in thickness change the count rate measurably.",
      "Alpha would be completely stopped by paper (no signal).",
      "Gamma would pass through almost unaffected (changes too small to detect).",
    ],
    modelAnswer: "The source should have a long half-life, several years, so its activity is effectively constant during use and any change in count rate is due to the paper thickness, and it need not be replaced often. Beta is used because paper absorbs part of it, so the count rate changes measurably with thickness; alpha would be stopped completely, and gamma would pass through with almost no change.",
    explanation: "Half-life and penetration matched to the task.",
    hints: ["What would happen to alpha and to gamma in paper?"],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Define half-life and activity.",
    points: ["Half-life: the (mean) time taken for half the undecayed nuclei of a nuclide to decay.", "Activity: the number of nuclei decaying per unit time (unit becquerel, 1 Bq = 1 decay per second)."],
    modelAnswer: "The half-life is the mean time for half of the undecayed nuclei in a sample to decay. The activity is the number of decays per unit time, measured in becquerels.",
    explanation: "t½ and A.",
  });
  // Practice structured
  {
    const th = 3.1, bg = 0.40, R0 = 25.0; // half-life min; counts per second
    const lam = 0.693 / th;
    const ts = [0, 1, 2, 3, 4, 5, 6];
    const noise = [0.2, -0.3, 0.2, -0.1, 0.2, -0.1, 0.1];
    const meas = ts.map((tt, i) => Number((R0 * Math.exp(-lam * tt) + bg + noise[i]).toFixed(1)));
    const corr = meas.map((m) => m - bg);
    const y = corr.map(ln);
    const fit = linFit(ts, y);
    const row = 3;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`Nyasha measures the count rate from a short-lived source at 1-minute intervals. The background count rate is $${dpStr(bg, 2)}\ \text{s}^{-1}$.

${table([t`$t\,/\,\text{min}$`, t`measured rate$\,/\,\text{s}^{-1}$`, t`corrected rate $R\,/\,\text{s}^{-1}$`, t`$\ln(R/\text{s}^{-1})$`], ts.map((tt, i) => [tt, meas[i].toFixed(1), i === row ? "" : dpStr(corr[i], 1), i === row ? "" : dpStr(y[i], 2)]))}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the corrected count rate at t = 3 min, in s⁻¹.", value: corr[row], dp: 1, unit: "counts/s", wrong: [meas[row]], explanation: t`$${meas[row].toFixed(1)} - ${dpStr(bg, 2)} = ${dpStr(corr[row], 1)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate ln(R/s⁻¹) at t = 3 min, to two decimal places.", value: y[row], dp: 2, wrong: [Math.log10(corr[row])], explanation: t`$\ln ${dpStr(corr[row], 1)} = ${dpStr(y[row], 2)}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why a graph of ln R against t should be a straight line, and state what its gradient represents.", points: [t`$R = R_0e^{-\lambda t} \Rightarrow \ln R = \ln R_0 - \lambda t$: the form $y = mx + c$.`, t`Gradient $= -\lambda$ (minus the decay constant).`], modelAnswer: t`Since $R = R_0e^{-\lambda t}$, $\ln R = -\lambda t + \ln R_0$, a straight line of gradient $-\lambda$ and intercept $\ln R_0$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Plot the graph and determine the gradient of the best-fit line, in min⁻¹, to two significant figures.", value: fit.m, sf: 2, tol: 0.012, wrong: [-fit.m], explanation: t`Gradient $\approx ${sfStr(fit.m, 2)}\ \text{min}^{-1}$.` }),
        P.num({ label: "(e)", marks: 2, stem: "Hence determine the half-life, in minutes, to two significant figures.", value: 0.693 / -fit.m, sf: 2, tol: 0.2, unit: "min", wrong: [-fit.m / 0.693], explanation: t`$\lambda = ${sfStr(-fit.m, 2)}\ \text{min}^{-1}$; $t_{1/2} = 0.693/\lambda \approx ${sfStr(0.693 / -fit.m, 2)}\ \text{min}$.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Explain why the background must be subtracted before plotting, suggest how to reduce the scatter of the points, and state two precautions (one for reliable results, one for safety).", points: ["Background does not decay with the source, so without subtraction ln(measured rate) would not fall linearly (the graph would level off).", "Count for longer at each reading (or repeat and average) to reduce the random fluctuations.", "Keep the distance and alignment between source and detector fixed throughout.", "Handle the source with tongs (keep it at arm's length), and minimise the time it is out of its container."], modelAnswer: "Only the source's contribution decays exponentially; the steady background would make the ln graph curve and level off. Random fluctuations can be reduced by counting for longer at each time (or repeating and averaging), giving larger counts with smaller percentage uncertainty." }),
      ],
      explanation: "Subtract background, take ln, gradient −λ, t½ = 0.693/λ.",
      hints: ["ln R = ln R₀ − λt."],
    });
    chk(Math.abs(0.693 / -fit.m - th) < 0.3 ? 1 : 0, 1);
  }
  {
    const A0 = 8.0e5, th = 6.0; // hours, technetium-99m
    const t1 = 3.0, tEnd = 24;
    const A1 = A0 * Math.exp((-0.693 / th) * t1);
    const fracEnd = Math.exp((-0.693 / th) * tEnd);
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Technetium-99m, a gamma emitter with a half-life of 6.0 hours, is used for medical imaging. A dose with activity $8.0 \times 10^{5}\ \text{Bq}$ is prepared.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the activity 3.0 hours after preparation, in Bq, to two significant figures.", value: A1, sf: 2, unit: "Bq", answer: sciPlain(A1, 2), wrong: [A0 / 2], explanation: t`$A = 8.0 \times 10^{5}e^{-(0.693/6.0) \times 3.0} = ${sciTex(A1, 2)}\ \text{Bq}$.` }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the fraction of the original activity remaining after 24 hours, to three significant figures.", value: fracEnd, sf: 3, wrong: [0.25], explanation: t`24 h = 4 half-lives: $(1/2)^4 = 0.0625$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain two reasons why technetium-99m is suitable for this use.", points: ["It emits gamma radiation, which passes out of the body to the detector (gamma camera) and causes little ionisation inside.", "Its half-life (6 h) is long enough to prepare the dose and complete the scan, but short enough that the activity in the body soon becomes negligible (low dose)."], modelAnswer: "It emits gamma rays, which leave the body to be detected and ionise relatively little on the way. Its 6-hour half-life gives time for the scan while ensuring the activity in the patient falls to a negligible level within a day or two." }),
      ],
      explanation: "A = A₀e^(−λt); 24 h is four half-lives; gamma emitter with a short half-life.",
      hints: ["How many half-lives are in 24 hours?"],
    });
  }
  b.card("DEFINITION", "**Activity**", "The number of nuclei decaying per unit time; unit becquerel (1 Bq = 1 s⁻¹).");
  b.card("DEFINITION", "**Decay constant λ**", "The probability that a nucleus decays per unit time.");
  b.card("DEFINITION", "**Half-life**", "The mean time for half the undecayed nuclei of a nuclide to decay.");
  b.card("FORMULA", "Activity", t`$A = \lambda N$`);
  b.card("FORMULA", "Exponential decay", t`$x = x_0e^{-\lambda t}$ (N, A or corrected count rate)`);
  b.card("FORMULA", "Half-life", t`$\lambda = \dfrac{0.693}{t_{1/2}}$`);
  b.card("CONCEPT", "Random and spontaneous", "Random: when a nucleus decays cannot be predicted (count rates fluctuate). Spontaneous: unaffected by external conditions.");
  b.card("CONCEPT", "ln graph", "ln C against t is a straight line of gradient −λ (after subtracting the background).");
  b.card("FACT", "Carbon-14", "Half-life 5730 years; used to date once-living material up to about 50 000 years old.");
});
