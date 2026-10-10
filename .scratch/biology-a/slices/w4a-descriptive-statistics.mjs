// W4a: descriptive statistics, standard deviation, standard error, 95% CI and error bars (Cambridge A Level only).
import { concept, P, t, chk, table, dpStr, sfStr, mean, median, sd, se, ci95, sum, pctError } from "../lib.mjs";

const SD_F = t`$s = \sqrt{\dfrac{\sum (x - \bar{x})^2}{n - 1}}$`;
const SE_F = t`$SE = \dfrac{s}{\sqrt{n}}$`;

concept("abio.skills.descriptive-statistics", { file: "skills/descriptive-statistics", keyPrefix: "skills.descriptive-statistics" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the standard error of a sample mean measure?",
    options: [
      ["How precisely the sample mean estimates the population mean", "Correct: SE = s/√n describes the reliability of the mean."],
      ["How widely the individual values spread around the mean", "That is the standard deviation."],
      ["The difference between the largest and the smallest value", "That is the range."],
      ["The percentage uncertainty of the measuring instrument", "That is the percentage error of a single reading."],
    ],
    answer: "A",
    explanation: "The standard error measures the precision of the mean: how much the mean would vary between repeated samples.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is Σ(x − x̄)² divided by n − 1, not n, when calculating the standard deviation of a sample?",
    options: [
      ["Dividing by n would underestimate the spread of the population", "Correct: a sample mean sits closer to its own values than the true mean does."],
      ["Dividing by n would give an answer with a squared unit", "The unit depends on the square root, not on n or n − 1."],
      ["One value must be left out because it is an anomaly", "No value is discarded; all n values are used."],
      ["It makes the standard deviation equal to the standard error", "SD and SE are different measures whatever the denominator."],
    ],
    answer: "A",
    explanation: "Values deviate less from their own sample mean than from the true population mean, so dividing by n − 1 corrects the underestimate.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The masses of eight lizards were 21, 22, 22, 23, 24, 24, 25 and 57 g. Which average best represents a typical lizard?",
    options: [
      ["The median, because one extreme value distorts the mean", "Correct: 57 g pulls the mean up but not the median."],
      ["The mean, because it uses every one of the values", "Using every value is a weakness here: 57 g drags the mean upwards."],
      ["The mode, because it is the value that occurs most often", "Two values (22 and 24) each occur twice, so the mode is not useful."],
      ["The range, because it shows the spread of the data", "The range is a measure of spread, not an average."],
    ],
    answer: "A",
    explanation: "With an extreme value, the median (23.5 g) describes a typical lizard far better than the mean (29.75 g).",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which statement describes a normal distribution?",
    options: [
      ["It is symmetrical, with mean, median and mode equal", "Correct."],
      ["It has a long tail of high values on one side of the peak", "That describes a positively skewed distribution."],
      ["It has two separate peaks of similar height", "That is a bimodal distribution."],
      ["It has the same frequency in every class", "That is a uniform (flat) distribution."],
    ],
    answer: "A",
    explanation: "A normal distribution is bell-shaped and symmetrical, so its mean, median and mode coincide.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student increases the number of leaves measured from 10 to 40. The standard deviation stays about the same. What happens to the standard error?",
    options: [
      ["It is about halved", "Correct: SE = s/√n and √40 is twice √10."],
      ["It is about quartered", "SE depends on √n, not on n."],
      ["It stays about the same", "SE falls as n increases even if s is unchanged."],
      ["It is about doubled", "A larger sample gives a smaller, not larger, SE."],
    ],
    answer: "A",
    explanation: "Multiplying n by 4 multiplies √n by 2, so SE = s/√n is halved.",
    hints: ["Look at the denominator of SE = s/√n."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A bar chart shows two means with error bars of ± 2 standard errors. The bars do not overlap. What is the best conclusion?",
    options: [
      ["The difference between the means is likely to be significant", "Correct: non-overlapping 95% confidence intervals suggest a real difference."],
      ["The difference between the means is certainly due to chance", "Non-overlap points the other way."],
      ["The two samples have the same standard deviation", "Error bars of SE do not show this directly."],
      ["The difference has been proved to be caused by the treatment", "Statistics never prove cause; other variables may differ."],
    ],
    answer: "A",
    explanation: "± 2SE bars are 95% confidence intervals; no overlap suggests a significant difference, which a statistical test should confirm.",
    hints: ["What does ± 2SE represent?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Two means are plotted with error bars of ± 1 standard deviation, and the bars overlap slightly. Which conclusion is justified?",
    options: [
      ["Overlap of SD bars alone cannot show whether the difference is significant", "Correct: SD bars show variability; a test or 95% CI is needed."],
      ["The difference is not significant because the two SD error bars overlap at all", "SD bars often overlap even when means differ significantly."],
      ["The difference is significant because the overlap is small", "Small overlap of SD bars is not a criterion for significance."],
      ["The samples must have been too small to be useful", "Overlap says nothing direct about sample size."],
    ],
    answer: "A",
    explanation: "SD bars describe the spread of individual values; judging significance needs SE-based 95% CIs or a statistical test such as the t-test.",
    hints: ["Which kind of error bar is related to the precision of the mean?"],
  });

  // Calculation: SD of groundnut kernels
  const kern = [0.52, 0.61, 0.48, 0.57, 0.55, 0.59];
  const km = mean(kern);
  const ks = sd(kern);
  const ksN = Math.sqrt(sum(kern.map((x) => (x - km) ** 2)) / kern.length);
  const kss = sum(kern.map((x) => (x - km) ** 2));
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Tatenda weighed six groundnut kernels: ${kern.map((x) => x.toFixed(2)).join(", ")} g. Using ${SD_F}, calculate the standard deviation of the masses in g, to two significant figures.`,
    value: ks, sf: 2, unit: "g", wrong: [sfStr(ksN, 2)],
    explanation: t`1. Mean $\bar{x} = ${sfStr(sum(kern), 3)} \div 6 = ${dpStr(km, 3)}$ g.
2. Squared differences: ${kern.map((x) => dpStr((x - km) ** 2, 5)).join(", ")}.
3. $\sum (x - \bar{x})^2 = ${dpStr(kss, 5)}$.
4. $s = \sqrt{${dpStr(kss, 5)} \div 5} = ${sfStr(ks, 2)}$ g.
Dividing by 6 instead of 5 gives ${sfStr(ksN, 2)} g, which is wrong for a sample.`,
    hints: ["Find the mean first.", "Divide by n − 1 = 5."],
  });
  // SE from s and n
  const s2 = 4.2, n2 = 25, se2 = s2 / Math.sqrt(n2);
  chk(se2, 0.84);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: `The heights of 25 sorghum plants had a standard deviation of ${s2} cm. Using ${SE_F}, calculate the standard error of the mean, in cm.`,
    value: se2, unit: "cm", wrong: [s2 / n2],
    explanation: t`$SE = ${s2} \div \sqrt{${n2}} = ${s2} \div 5 = ${se2}$ cm. Dividing by 25 instead of √25 gives 0.168, which is wrong.`,
  });
  // 95% CI upper limit
  const x3 = [71, 64, 76, 75, 70, 66, 73, 69, 72, 67];
  const c3 = ci95(x3);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The resting pulse rates of ten students were ${x3.join(", ")} beats/min. The standard deviation is ${dpStr(sd(x3), 2)} beats/min. Calculate the upper limit of the 95% confidence interval (x̄ + 2SE), in beats/min, to one decimal place.`,
    value: c3.upper, dp: 1, unit: "beats/min", wrong: [dpStr(c3.mean + sd(x3), 1), dpStr(c3.mean + c3.se, 1)],
    explanation: t`1. Mean $= ${sum(x3)} \div 10 = ${c3.mean}$ beats/min.
2. $SE = ${dpStr(sd(x3), 2)} \div \sqrt{10} = ${dpStr(c3.se, 3)}$.
3. Upper limit $= ${c3.mean} + 2 \times ${dpStr(c3.se, 3)} = ${dpStr(c3.upper, 1)}$ beats/min.
Adding 2SD or only 1SE are common errors.`,
    hints: ["SE = s/√n.", "Add two standard errors to the mean."],
  });
  // percentage error
  const pe = pctError(0.5, 40);
  chk(pe, 1.25);
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A root was measured as 40 mm with a ruler marked in millimetres (uncertainty ± 0.5 mm). Calculate the percentage error.",
    value: pe, unit: "%", dp: 2, wrong: [2.5],
    explanation: t`$\dfrac{0.5}{40} \times 100 = ${pe}\%$. Using ± 1 mm (the whole division) gives 2.5%, which is too large.`,
  });
  // median
  const med = [8, 3, 11, 6, 9, 4, 7, 14];
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `The numbers of aphids on eight bean leaves were ${med.join(", ")}. Calculate the median.`,
    value: median(med), wrong: [mean(med)],
    explanation: `In order: ${[...med].sort((a, c) => a - c).join(", ")}. The middle two are 7 and 8, so the median is ${median(med)}. (The mean is ${mean(med)}.)`,
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "For any sample of more than one value, the standard error is smaller than the standard deviation.",
    answer: true,
    explanation: "True. SE = s/√n and √n > 1 when n > 1.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The standard deviation of a set of lengths in mm is measured in mm².",
    answer: false,
    explanation: "False. The square root returns the unit to mm; mm² is the unit of the variance.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each statistic with what it tells you.",
    pairs: [
      ["Standard deviation", "Spread of individual values about the mean"],
      ["Standard error", "Precision of the sample mean"],
      ["95% confidence interval", "Range likely to contain the true mean"],
      ["Range", "Difference between the extreme values"],
      ["Median", "Middle value of the ordered data"],
    ],
    explanation: "SD: spread; SE: precision of the mean; 95% CI: x̄ ± 2SE; range: max − min; median: middle value.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A larger sample gives a {{blank:a}} standard error. Error bars of ± 2SE that do not overlap suggest the difference between the means is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["smaller"], choices: ["smaller", "larger"] },
      { id: "b", accepted: ["significant"], choices: ["significant", "due to chance"] },
    ],
    explanation: "SE = s/√n falls as n rises; non-overlapping 95% CIs suggest a significant difference.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of distribution, shown as a symmetrical bell-shaped histogram, that is typical of continuous variation such as leaf length.",
    accepted: ["normal distribution", "normal", "Gaussian distribution", "Gaussian", "bell curve", "bell-shaped curve"],
    wrong: ["skewed"],
    explanation: "A normal (Gaussian) distribution.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why collecting more replicates makes a mean more reliable.",
    points: [
      "SE = s/√n, so a larger n gives a smaller standard error",
      "The mean is a more precise estimate of the true mean / the 95% CI is narrower / the effect of anomalies is reduced",
    ],
    modelAnswer: "The standard error is s/√n, so increasing n reduces it. The mean is then a more precise estimate of the population mean, the 95% confidence interval is narrower, and any single anomalous value has less effect.",
    explanation: "Larger n, smaller SE, narrower CI.",
    hints: ["Use the formula for SE."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "The mean mass of 20 kapenta from one net was 4.6 g (95% CI 4.3 to 4.9 g) and from a second net 5.4 g (95% CI 5.0 to 5.8 g). Describe and interpret these results.",
    points: [
      "The second net's fish are heavier on average, by 0.8 g",
      "The 95% confidence intervals do not overlap (4.9 g is below 5.0 g)",
      "So the difference is likely to be significant / not due to chance; a t-test is needed to confirm",
    ],
    modelAnswer: "The mean mass from the second net (5.4 g) is 0.8 g greater than from the first (4.6 g). The 95% confidence intervals do not overlap, since the top of the first (4.9 g) is below the bottom of the second (5.0 g), so the difference is likely to be significant rather than due to chance; a t-test would confirm this.",
    explanation: "Quote the means, compare the intervals and interpret.",
    hints: ["Compare 4.9 g with 5.0 g."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student plotted mean leaf length for sun and shade leaves with error bars showing the range. Suggest why error bars showing 95% confidence intervals would be better, and what extra data she would need.",
    points: [
      "The range depends on only the two extreme values / is affected by one anomaly",
      "95% CI (x̄ ± 2SE) uses every value and shows the precision of each mean, so overlap can be used to judge significance",
      "She needs every individual value (or the standard deviation) and the number of leaves in each sample, to calculate s and SE",
    ],
    modelAnswer: "The range uses only the largest and smallest values, so one unusual leaf can make it very wide. A 95% confidence interval, x̄ ± 2SE, uses all the values and shows how precisely each mean is known, so whether the bars overlap gives a guide to significance. She would need all the individual lengths, or the standard deviations, and the sample sizes, to calculate s and SE.",
    explanation: "Range is crude; CIs show the precision of the means.",
    hints: ["What does each type of bar depend on?"],
  });

  // Practice structured 1: SD from a partly completed table
  const fish = [63, 58, 65, 60, 57, 63, 61];
  const fm = mean(fish);
  chk(fm, 61);
  const fsd = sd(fish);
  const fse = se(fish);
  const fss = sum(fish.map((x) => (x - fm) ** 2));
  const rows = fish.map((x, i) => [String(i + 1), String(x), i === 2 || i === 4 ? "?" : dpStr(x - fm, 2), i === 2 || i === 4 ? "?" : dpStr((x - fm) ** 2, 2)]);
  b.struct({
    d: 4, skill: "APPLICATION",
    stem: `Thandeka measured the lengths of seven kapenta from a catch at Kariba. Her partly completed table is shown. The formulae are ${SD_F} and ${SE_F}.\n\n${table(["Fish", "Length x / mm", "x − x̄ / mm", "(x − x̄)² / mm²"], rows)}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the mean length, in mm, to one decimal place.", value: fm, dp: 1, unit: "mm", explanation: `${sum(fish)} ÷ 7 = ${dpStr(fm, 1)} mm.` }),
      P.group({
        label: "(b)", stem: "Complete the missing values for fish 3 (65 mm), to two decimal places, using the unrounded mean.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "x − x̄ for fish 3, in mm.", value: 65 - fm, dp: 2, unit: "mm", explanation: `65 − ${dpStr(fm, 3)} = ${dpStr(65 - fm, 2)} mm.` }),
          P.num({ label: "(ii)", marks: 1, stem: "(x − x̄)² for fish 3, in mm².", value: (65 - fm) ** 2, dp: 2, unit: "mm²", explanation: `${dpStr(65 - fm, 3)}² = ${dpStr((65 - fm) ** 2, 2)} mm².` }),
        ],
      }),
      P.num({
        label: "(c)", marks: 2, stem: `Σ(x − x̄)² = ${dpStr(fss, 2)} mm². Calculate the standard deviation in mm, to two decimal places.`,
        value: fsd, dp: 2, unit: "mm", wrong: [dpStr(Math.sqrt(fss / 7), 2)],
        explanation: t`$s = \sqrt{${dpStr(fss, 2)} \div 6} = ${dpStr(fsd, 2)}$ mm. Dividing by 7 instead of 6 gives ${dpStr(Math.sqrt(fss / 7), 2)} mm.`,
      }),
      P.num({ label: "(d)", marks: 1, stem: "Calculate the standard error in mm, to two decimal places.", value: fse, dp: 2, unit: "mm", explanation: t`$${dpStr(fsd, 3)} \div \sqrt{7} = ${dpStr(fse, 2)}$ mm.` }),
      P.manual({
        label: "(e)", marks: 2, stem: "Thandeka says that seven fish are enough to describe the kapenta in the catch. Evaluate her claim.",
        points: [
          "Seven is a small sample; the standard error is relatively large / the 95% CI is wide",
          "A larger, random sample (e.g. 30 or more fish chosen randomly from the catch) would give a more precise mean",
        ],
        modelAnswer: "Seven fish is a small sample, so the standard error is fairly large and the 95% confidence interval wide. A larger random sample from the catch, for example 30 fish, would give a more precise and representative mean.",
      }),
    ],
    explanation: "Mean, deviations, Σ, divide by n − 1, square root, then SE.",
    hints: ["Use the unrounded mean for the missing values.", "Divide by n − 1 = 6."],
    calculator: true,
  });

  // Practice structured 2: comparing two means with SE and CI
  const g1 = { m: 24.8, s: 3.1, n: 16 }, g2 = { m: 20.9, s: 2.8, n: 16 };
  const se1 = g1.s / Math.sqrt(g1.n), se2b = g2.s / Math.sqrt(g2.n);
  chk(se1, 0.775); chk(se2b, 0.7);
  const lo1 = g1.m - 2 * se1, hi2 = g2.m + 2 * se2b;
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Sipho measured the shell length of 16 snails from a shaded riverbank and 16 from an exposed rock near Mutare.\n\n${table(["Site", "Mean shell length / mm", "Standard deviation / mm", "n"], [["Shaded bank", g1.m.toFixed(1), g1.s.toFixed(1), String(g1.n)], ["Exposed rock", g2.m.toFixed(1), g2.s.toFixed(1), String(g2.n)]])}\n\nThe standard error is ${SE_F}.`,
    parts: [
      P.group({
        label: "(a)", stem: "Calculate the standard error of each mean, in mm.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Shaded bank.", value: se1, dp: 3, unit: "mm", explanation: `3.1 ÷ 4 = ${se1} mm.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Exposed rock.", value: se2b, dp: 2, unit: "mm", explanation: `2.8 ÷ 4 = ${se2b} mm.` }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Calculate the limits of the 95% confidence intervals (x̄ ± 2SE) that are closest to each other.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "Lower limit for the shaded bank, in mm, to two decimal places.", value: lo1, dp: 2, unit: "mm", explanation: `${g1.m} − 2 × 0.775 = ${dpStr(lo1, 2)} mm.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Upper limit for the exposed rock, in mm, to one decimal place.", value: hi2, dp: 1, unit: "mm", explanation: `20.9 + 2 × 0.70 = ${dpStr(hi2, 1)} mm.` }),
        ],
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Use your answers to (b) to interpret the results.",
        points: [
          `The 95% CIs do not overlap (${dpStr(lo1, 2)} mm is above ${dpStr(hi2, 1)} mm)`,
          "So the difference in mean shell length is likely to be significant / not due to chance",
        ],
        modelAnswer: `The lower limit for the shaded bank (${dpStr(lo1, 2)} mm) is above the upper limit for the exposed rock (${dpStr(hi2, 1)} mm), so the 95% confidence intervals do not overlap and the difference is likely to be significant.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons, other than site, why the snails might differ in length.",
        points: [
          "Snails were of different ages / the samples were not random (e.g. larger snails easier to find)",
          "Different species, food supply or predation at the two sites / genetic differences between populations",
        ],
        modelAnswer: "The samples may contain snails of different ages, or collectors may have picked the larger, more obvious snails at one site. Food supply, predation or genetic differences between the populations could also affect shell length.",
      }),
    ],
    explanation: "SE = s/√n, CI = x̄ ± 2SE, then judge overlap.",
    hints: ["√16 = 4."],
    calculator: true,
  });
  if (lo1 <= hi2) throw new Error("expected non-overlap");

  b.card("FORMULA", "Sample standard deviation", "s = √( Σ(x − x̄)² / (n − 1) ); same unit as the data.");
  b.card("FORMULA", "Standard error of the mean", "SE = s / √n.");
  b.card("FORMULA", "95% confidence interval", "x̄ ± 2SE.");
  b.card("CONCEPT", "SD versus SE", "SD: spread of individual values. SE: precision of the mean; smaller for larger samples.");
  b.card("CONCEPT", "95% CI error bars that do not overlap", "The difference between the means is likely to be significant (confirm with a test such as the t-test).");
  b.card("CONCEPT", "When to use the median", "When data are skewed or contain extreme values, which pull the mean.");
  b.card("FORMULA", "Percentage error", "Uncertainty ÷ measured value × 100.");
  b.card("DEFINITION", "Normal distribution", "Symmetrical bell-shaped distribution in which mean, median and mode are equal; about 95% of values lie within 2 SD of the mean.");
});
