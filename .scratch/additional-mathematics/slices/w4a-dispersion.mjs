// W4a: amath.statistics.dispersion (ZIMSEC only)
import { concept, P, t, chk, same, mean, sd, variance, quartiles, freqStats, grouped, cv, table, steps } from "../lib.mjs";

const paras = (...l) => l.join("\n\n");

concept("amath.statistics.dispersion", { file: "statistics/dispersion", keyPrefix: "statistics.dispersion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "How is the interquartile range calculated?",
    options: [
      [t`Upper quartile minus lower quartile`, "Correct: IQR = Q₃ − Q₁, the spread of the middle half."],
      [t`Largest value minus smallest value`, "That is the range."],
      [t`Upper quartile minus the median`, "This is only the spread of the third quarter of the data."],
      [t`Half of the range of the data`, "The IQR depends on the quartiles, not on the extreme values."],
    ],
    answer: "A",
    explanation: t`$\text{IQR} = Q_3 - Q_1$. It covers the middle 50% of the data, so extreme values do not affect it.`,
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The standard deviation of a set of lengths in centimetres is also measured in centimetres.",
    answer: true,
    explanation: "True. The variance is in squared units (cm²); its square root, the standard deviation, is back in cm.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "Find the range of 14, 9, 22, 17, 6 and 19.",
    value: 22 - 6, wrong: [5, 13],
    explanation: "Range = largest − smallest = 22 − 6 = 16. Subtracting the first value from the last (19 − 14 = 5) is not the range.",
  });

  {
    const q = quartiles([3, 5, 6, 9, 11, 14, 15]);
    same([q.q1, q.q3], [5, 14]);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "Seven learners scored 3, 5, 6, 9, 11, 14 and 15 in a quiz. Using the medians of the lower and upper halves (leaving out the median), find the interquartile range.",
      value: q.iqr, wrong: [12, 8],
      explanation: "Median 9. Lower half 3, 5, 6: Q₁ = 5. Upper half 11, 14, 15: Q₃ = 14. IQR = 14 − 5 = 9.",
    });
  }

  {
    const xs = [1, 3, 4, 6, 11];
    chk(variance(xs), 11.6, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Find the standard deviation of 1, 3, 4, 6 and 11, correct to 3 significant figures.",
      value: sd(xs), wrong: [11.6, Math.sqrt(183 / 5)],
      explanation: t`Mean $= 5$; $\sum x^2 = 1 + 9 + 16 + 36 + 121 = 183$. $\sigma^2 = \frac{183}{5} - 25 = 11.6$, so $\sigma = 3.41$. The variance 11.6 is not the standard deviation.`,
      hints: [t`$\sigma^2 = \frac{\sum x^2}{n} - \bar{x}^2$.`],
    });
  }

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For 20 values, $\sum x = 160$ and $\sum x^2 = 1460$. Find the standard deviation.`,
    value: Math.sqrt(1460 / 20 - (160 / 20) ** 2), wrong: [9, Math.sqrt(1460 / 20)],
    explanation: t`$\bar{x} = 8$; $\sigma^2 = \frac{1460}{20} - 8^2 = 73 - 64 = 9$, so $\sigma = 3$.`,
    hints: ["Find the mean first."],
  });

  {
    const tb = [[0, 2], [1, 5], [2, 8], [3, 3], [4, 2]];
    const st = freqStats(tb);
    chk(st.mean, 1.9, 1e-12);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: paras("The numbers of cattle owned by 20 families in a village are shown.", table(["Cattle x", "0", "1", "2", "3", "4"], [["Families f", 2, 5, 8, 3, 2]]), "Find the standard deviation, correct to 3 significant figures."),
      value: st.sd, wrong: [st.variance, Math.sqrt(st.sumfx2 / 20)],
      explanation: t`$\sum fx = 38$, $\bar{x} = 1.9$; $\sum fx^2 = 0 + 5 + 32 + 27 + 32 = 96$. $\sigma^2 = \frac{96}{20} - 1.9^2 = 4.8 - 3.61 = 1.19$, so $\sigma = 1.09$.`,
      workedSolution: steps(
        t`$\sum f = 20$, $\sum fx = 38$, $\bar{x} = 1.9$.`,
        t`$\sum fx^2 = 96$.`,
        t`$\sigma^2 = 4.8 - 3.61 = 1.19$; $\sigma = 1.09$.`,
      ),
      hints: [t`Make columns for $fx$ and $fx^2$.`],
    });
  }

  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A machine fills bags of mealie-meal with a mean mass of 50 kg and a standard deviation of 0.6 kg. Find the coefficient of variation as a percentage.",
    value: cv(0.6, 50), unit: "%", wrong: [cv(50, 0.6)],
    explanation: t`$\text{CV} = \frac{0.6}{50} \times 100\% = 1.2\%$.`,
    hints: ["CV = standard deviation ÷ mean × 100%."],
  });

  {
    const cls = [[10, 20, 3], [20, 30, 12], [30, 40, 15], [40, 50, 8], [50, 60, 2]];
    const G = grouped(cls);
    chk(G.mean, 33.5, 1e-12);
    const tab = table(["Speed v (km/h)", "Frequency"], [["10 ≤ v < 20", 3], ["20 ≤ v < 30", 12], ["30 ≤ v < 40", 15], ["40 ≤ v < 50", 8], ["50 ≤ v < 60", 2]]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: paras("The speeds of 40 vehicles passing a school in Kwekwe were recorded.", tab, "Calculate estimates of the mean and the standard deviation, and give the standard deviation correct to 3 significant figures."),
      value: G.sd, unit: "km/h", wrong: [G.variance, Math.sqrt(G.sumfx2 / 40)],
      explanation: t`Midpoints 15, 25, 35, 45, 55: $\sum fx = 1340$, $\bar{v} = 33.5$; $\sum fx^2 = 48\,800$. $\sigma^2 = \frac{48\,800}{40} - 33.5^2 = 1220 - 1122.25 = 97.75$, so $\sigma = 9.89$ km/h.`,
      workedSolution: steps(
        t`$\sum fx = 45 + 300 + 525 + 360 + 110 = 1340$, mean $= 33.5$.`,
        t`$\sum fx^2 = 675 + 7500 + 18\,375 + 16\,200 + 6050 = 48\,800$.`,
        t`$\sigma^2 = 1220 - 1122.25 = 97.75$, $\sigma = 9.89$.`,
      ),
      hints: ["Use class midpoints.", t`$\sigma^2 = \frac{\sum fx^2}{\sum f} - \bar{x}^2$.`],
    });
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: paras("For the same 40 vehicle speeds:", tab, "Estimate the interquartile range by interpolation, correct to 3 significant figures."),
      value: G.q3 - G.q1, unit: "km/h", wrong: [20, 50],
      explanation: t`Cumulative frequencies 3, 15, 30, 38, 40. $Q_1$ (10th value): $20 + \frac{10 - 3}{12} \times 10 = 25.83$. $Q_3$ (30th value): $30 + \frac{30 - 15}{15} \times 10 = 40$. IQR $= 40 - 25.83 = 14.2$ km/h.`,
      workedSolution: steps(
        "Cumulative frequencies: 3, 15, 30, 38, 40.",
        t`$Q_1$ at position 10, class $20 \leq v < 30$: $25.83$.`,
        t`$Q_3$ at position 30, class $30 \leq v < 40$: $40$.`,
        t`IQR $= 14.2$ km/h.`,
      ),
      hints: [t`$Q_1$ is at position $\frac{n}{4}$ and $Q_3$ at $\frac{3n}{4}$.`],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A data set contains one value that is far larger than all the others. Which measure of spread is least affected by it?",
    options: [
      ["The interquartile range", "Correct: it uses only the middle half of the data."],
      ["The range", "The range uses the extreme value directly."],
      ["The standard deviation", "Every value, including the extreme one, is squared in the calculation."],
      ["The variance", "The variance uses squared deviations, so an extreme value has a large effect."],
    ],
    answer: "A",
    explanation: "The IQR ignores the top and bottom quarters, so an outlier does not change it. The range and standard deviation are both sensitive to extremes.",
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "Two athletes ran 400 m several times. Rudo: mean 62.4 s, standard deviation 0.8 s. Chipo: mean 62.4 s, standard deviation 2.1 s. Which statement is correct?",
    options: [
      ["Rudo's times are more consistent than Chipo's", "Correct: equal means, and Rudo's smaller standard deviation shows less variation."],
      ["Chipo is the faster runner on average", "The means are equal, so neither is faster on average."],
      ["Chipo's times are more consistent than Rudo's", "A larger standard deviation means more variation, not less."],
      ["Their times cannot be compared", "Means and standard deviations in the same units can be compared directly."],
    ],
    answer: "A",
    explanation: "With equal averages, the spread decides: a smaller standard deviation means the times are closer together, i.e. more consistent.",
    hints: ["What does a small standard deviation tell you?"],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Every value in a data set is increased by 5. What happens to the standard deviation?",
    options: [
      ["It stays the same", "Correct: the values and the mean all move up by 5, so every deviation is unchanged."],
      ["It increases by 5", "The mean increases by 5, but the deviations from the mean do not change."],
      ["It increases by 25", "This confuses the change in the data with the variance of a scaled data set."],
      ["It is multiplied by 5", "Multiplying (not adding) every value by 5 would multiply the standard deviation by 5."],
    ],
    answer: "A",
    explanation: "Adding a constant shifts the whole distribution without changing its spread: the mean goes up by 5 and the standard deviation is unchanged.",
    hints: ["What happens to each value's distance from the mean?"],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each measure with its formula.",
    pairs: [
      ["Range", "largest value − smallest value"],
      ["Interquartile range", t`$Q_3 - Q_1$`],
      ["Variance of raw data", t`$\dfrac{\sum x^2}{n} - \bar{x}^2$`],
      ["Coefficient of variation", t`$\dfrac{\sigma}{\bar{x}} \times 100\%$`],
    ],
    explanation: "The standard deviation is the square root of the variance; the coefficient of variation expresses it as a percentage of the mean.",
  });

  {
    const k = 4 * 6 - (2 + 6 + 8);
    chk(k, 8);
    const v = variance([2, 6, 8, k]);
    chk(v, 6, 1e-12);
    b.fib({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`The four numbers 2, 6, 8 and $k$ have mean 6. Find $k$, and then the variance of the four numbers.`,
      template: "k = {{blank:k}}, variance = {{blank:v}}",
      blanks: [{ id: "k", input: "number", accepted: [k], wrong: "6" }, { id: "v", input: "number", accepted: [v], wrong: "8" }],
      explanation: t`$2 + 6 + 8 + k = 24$, so $k = 8$. Squared deviations: $16, 0, 4, 4$, total 24, so the variance is $\frac{24}{4} = 6$.`,
      hints: ["Total = mean × 4.", "Variance = mean of the squared deviations."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why it is important to give a measure of dispersion as well as an average when describing data.",
    points: [
      "Data sets with the same average can be spread very differently, so an average alone does not describe the data.",
      "The spread shows consistency or reliability (how far values typically lie from the average), which matters when comparing groups.",
    ],
    modelAnswer: "Two sets of data can have the same mean but very different spreads: one may be tightly grouped and the other scattered. A measure of dispersion shows how consistent the values are and how far a typical value lies from the average, so comparisons are fair and complete.",
    explanation: "Average says where the data are centred; dispersion says how much they vary.",
    hints: ["Think of two data sets with the same mean."],
  });

  {
    const A = [42, 38, 45, 40, 44, 37];
    const B = [30, 55, 48, 26, 52, 35];
    chk(mean(A), 41);
    chk(mean(B), 41);
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, calculator: true,
      stem: "Two vegetable vendors at a market in Gweru recorded their sales, in US dollars, on six days. Vendor A: 42, 38, 45, 40, 44, 37. Vendor B: 30, 55, 48, 26, 52, 35.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the mean daily sales of vendor A, in dollars.", value: mean(A), wrong: [40.5],
          explanation: "246 ÷ 6 = 41." }),
        P.num({ label: "(b)", marks: 2, stem: "Find the standard deviation of vendor A's sales, correct to 3 significant figures.", value: sd(A), wrong: [variance(A)],
          explanation: t`$\sum x^2 = 10\,138$; $\sigma^2 = \frac{10\,138}{6} - 41^2 = 8.667$; $\sigma = 2.94$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Vendor B also has mean daily sales of 41 dollars. Find the standard deviation of vendor B's sales, correct to 3 significant figures.", value: sd(B), wrong: [variance(B)],
          explanation: t`$\sum x^2 = 10\,834$; $\sigma^2 = \frac{10\,834}{6} - 41^2 = 124.67$; $\sigma = 11.2$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Compare the two vendors' sales.",
          points: ["Both have the same mean daily sales (41 dollars).", "Vendor A's sales are much more consistent (standard deviation 2.94 compared with 11.2)."],
          modelAnswer: "On average the vendors sell the same amount each day (41 dollars). Vendor A's standard deviation is far smaller (2.94 against 11.2), so A's daily sales are much more consistent, while B's vary a lot from day to day.",
          explanation: "Compare an average and a spread, in context." }),
      ],
      explanation: "Equal means, very different spreads: the standard deviation distinguishes the vendors.",
      hints: [t`$\sigma^2 = \frac{\sum x^2}{n} - \bar{x}^2$.`],
    });
  }

  {
    const cls = [[0, 10, 7], [10, 20, 13], [20, 40, 21], [40, 60, 12], [60, 90, 7]];
    const G = grouped(cls);
    same(G.cf, [7, 20, 41, 53, 60]);
    chk(G.sumfx, 1985);
    chk(G.sumfx2, 91375);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: paras("The ages of 60 patients seen at a rural clinic one morning are shown.", table(["Age a (years)", "Frequency"], [["0 ≤ a < 10", 7], ["10 ≤ a < 20", 13], ["20 ≤ a < 40", 21], ["40 ≤ a < 60", 12], ["60 ≤ a < 90", 7]])),
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate an estimate of the mean age, correct to 3 significant figures.", value: G.mean, wrong: [45],
          explanation: t`Midpoints 5, 15, 30, 50, 75: $\sum fa = 35 + 195 + 630 + 600 + 525 = 1985$; mean $= \frac{1985}{60} = 33.1$ years.` }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate an estimate of the standard deviation, correct to 3 significant figures.", value: G.sd, wrong: [G.variance, Math.sqrt(G.sumfx2 / 60)],
          explanation: t`$\sum fa^2 = 175 + 2925 + 18\,900 + 30\,000 + 39\,375 = 91\,375$. $\sigma^2 = \frac{91\,375}{60} - 33.08^2 = 1522.92 - 1094.51 = 428.4$; $\sigma = 20.7$ years.` }),
        P.num({ label: "(c)", marks: 1, stem: "Find the coefficient of variation as a percentage, correct to 3 significant figures.", value: cv(G.sd, G.mean), unit: "%", wrong: [cv(G.mean, G.sd)],
          explanation: t`$\frac{20.70}{33.08} \times 100\% = 62.6\%$.` }),
        P.fib({ label: "(d)", marks: 2, stem: "Estimate the lower and upper quartiles by interpolation, correct to 3 significant figures.", template: "Q₁ = {{blank:a}}, Q₃ = {{blank:b}}",
          blanks: [{ id: "a", input: "number", accepted: [Number(G.q1.toFixed(4))], tolerance: 0.05, wrong: "15" }, { id: "b", input: "number", accepted: [Number(G.q3.toFixed(4))], tolerance: 0.05, wrong: "45" }],
          explanation: t`$Q_1$ (15th): $10 + \frac{15 - 7}{13} \times 10 = 16.2$. $Q_3$ (45th): $40 + \frac{45 - 41}{12} \times 20 = 46.7$.` }),
        P.num({ label: "(e)", marks: 1, stem: "Hence find the interquartile range, correct to 3 significant figures.", value: G.q3 - G.q1, wrong: [90],
          explanation: t`$46.67 - 16.15 = 30.5$ years.` }),
      ],
      explanation: "Use midpoints for the mean and standard deviation (estimates), the CV to express the spread relative to the mean, and interpolation at n/4 and 3n/4 for the quartiles. The class widths are unequal, but the midpoint and interpolation methods still work.",
      hints: ["The classes are not all the same width.", "Q₁ is the 15th value and Q₃ the 45th."],
    });
  }

  b.card("FORMULA", "Range and interquartile range", t`Range = largest − smallest; IQR $= Q_3 - Q_1$.`);
  b.card("FORMULA", "Variance of raw data", t`$\sigma^2 = \dfrac{\sum (x - \bar{x})^2}{n} = \dfrac{\sum x^2}{n} - \bar{x}^2$`);
  b.card("FORMULA", "Variance from a frequency table", t`$\sigma^2 = \dfrac{\sum fx^2}{\sum f} - \bar{x}^2$ (grouped data: $x$ = midpoint).`);
  b.card("DEFINITION", "Standard deviation", "The square root of the variance; in the same units as the data.");
  b.card("FORMULA", "Coefficient of variation", t`$\text{CV} = \dfrac{\sigma}{\bar{x}} \times 100\%$`, "Compares spreads of data with different means or units.");
  b.card("FACT", "Quartiles of grouped data", t`Interpolate at positions $\frac{n}{4}$ ($Q_1$) and $\frac{3n}{4}$ ($Q_3$), as for the median.`);
  b.card("CONCEPT", "Why dispersion matters", "Equal averages can hide very different spreads; spread measures consistency and reliability.");
  b.card("FACT", "Effect of an outlier", "It changes the range and standard deviation a lot, the IQR hardly at all.");
  b.card("FACT", "Adding a constant to every value", "The mean changes by that constant; the standard deviation and IQR do not change.");
});
