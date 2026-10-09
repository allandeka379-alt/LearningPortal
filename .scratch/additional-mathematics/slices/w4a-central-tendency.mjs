// W4a: amath.statistics.central-tendency (ZIMSEC only)
import { concept, P, t, chk, same, mean, median, modes, freqStats, grouped, expand, table, steps } from "../lib.mjs";

concept("amath.statistics.central-tendency", { file: "statistics/central-tendency", keyPrefix: "statistics.central-tendency" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which average can be used for qualitative data such as favourite colour?",
    options: [
      ["The mode", "Correct: the most common category can always be found."],
      ["The mean", "The mean needs numbers to add up."],
      ["The median", "The median needs the data to be put in numerical order."],
      ["The midpoint", "A midpoint belongs to a numerical class, not to categories."],
    ],
    answer: "A",
    explanation: "Colours cannot be added or ordered, so the mean and median make no sense; the mode (the most frequent colour) does.",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "The median of a data set is strongly affected by one very large value.",
    answer: false,
    explanation: "False. The median depends only on the middle position, so one extreme value hardly changes it. The mean is the average that is affected by extreme values.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "Find the mean of 6, 9, 4, 11, 8 and 10.",
    value: mean([6, 9, 4, 11, 8, 10]), wrong: [8.5, 48],
    explanation: t`Sum $= 48$, $n = 6$, mean $= \frac{48}{6} = 8$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "The numbers of customers at a tuckshop on seven days were 23, 17, 31, 19, 26, 17 and 28. Find the median.",
    value: median([23, 17, 31, 19, 26, 17, 28]), wrong: [19, 17],
    explanation: "In order: 17, 17, 19, 23, 26, 28, 31. The 4th value is the median: 23. The 4th value of the unordered list (19) is not the median.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Find the mode of 3, 5, 5, 6, 7, 7, 7, 9.",
    value: modes([3, 5, 5, 6, 7, 7, 7, 9])[0], wrong: [5, 6.125],
    explanation: "7 occurs three times, more than any other value, so the mode is 7.",
  });

  {
    const tb = [[0, 6], [1, 9], [2, 7], [3, 2], [4, 1]];
    const st = freqStats(tb);
    chk(st.mean, 1.32);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: paras("The numbers of goals scored in 25 football matches are shown.", table(["Goals x", "0", "1", "2", "3", "4"], [["Matches f", 6, 9, 7, 2, 1]]), "Find the mean number of goals per match."),
      value: st.mean, wrong: [2, 33 / 5],
      explanation: t`$\sum fx = 0 + 9 + 14 + 6 + 4 = 33$ and $\sum f = 25$, so $\bar{x} = \frac{33}{25} = 1.32$. Dividing by the 5 columns gives 6.6.`,
      hints: ["Multiply each value by its frequency and add.", "Divide by the total frequency."],
    });
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: paras("For the same 25 football matches:", table(["Goals x", "0", "1", "2", "3", "4"], [["Matches f", 6, 9, 7, 2, 1]]), "Find the median number of goals."),
      value: median(expand(tb)), wrong: [2, 7],
      explanation: "The median is the 13th value. Cumulative frequencies are 6, 15, … so the 7th to 15th values are all 1: the median is 1.",
      hints: ["The median is the (25 + 1) ÷ 2 = 13th value."],
    });
  }

  {
    const G = grouped([[40, 50, 5], [50, 60, 14], [60, 70, 15], [70, 80, 6]]);
    chk(G.mean, 60.5);
    const tab = table(["Mass m (g)", "Frequency"], [["40 ≤ m < 50", 5], ["50 ≤ m < 60", 14], ["60 ≤ m < 70", 15], ["70 ≤ m < 80", 6]]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: paras("The masses of 40 eggs from a poultry project are grouped below.", tab, "Calculate an estimate of the mean mass."),
      value: G.mean, unit: "g", wrong: [65, 2420 / 4],
      explanation: t`Midpoints 45, 55, 65, 75: $\sum fx = 225 + 770 + 975 + 450 = 2420$, so the estimated mean is $\frac{2420}{40} = 60.5$ g.`,
      hints: ["Use the class midpoints as x."],
    });
  }

  {
    const E = grouped([[45, 50, 6], [50, 55, 13], [55, 60, 17], [60, 65, 9], [65, 70, 5]]);
    same(E.cf, [6, 19, 36, 45, 50]);
    const tab2 = table(["Length l (mm)", "Frequency"], [["45 ≤ l < 50", 6], ["50 ≤ l < 55", 13], ["55 ≤ l < 60", 17], ["60 ≤ l < 65", 9], ["65 ≤ l < 70", 5]]);
    b.calc({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: paras("The lengths of 50 groundnut pods are grouped below.", tab2, "Estimate the median length by interpolation, correct to 3 significant figures."),
      value: E.median, unit: "mm", wrong: [57.5, 55],
      explanation: t`Median position $\frac{50}{2} = 25$. Cumulative frequencies 6, 19, 36, 45, 50, so the median class is $55 \leq l < 60$. Median $= 55 + \frac{25 - 19}{17} \times 5 = 56.8$ mm.`,
      workedSolution: steps(
        "Cumulative frequencies: 6, 19, 36, 45, 50.",
        t`The 25th value lies in $55 \leq l < 60$, with 19 values before it.`,
        t`Median $= 55 + \frac{6}{17} \times 5 = 56.8$ mm.`,
      ),
      hints: ["Find the class containing the 25th value.", "L + (n/2 − F)/f × w."],
    });
  }

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "In a test, 25 boys had a mean mark of 54 and 15 girls had a mean mark of 62. Find the mean mark of all 40 learners.",
    value: (25 * 54 + 15 * 62) / 40, wrong: [(54 + 62) / 2],
    explanation: t`Totals: $25 \times 54 = 1350$ and $15 \times 62 = 930$. Combined mean $= \frac{2280}{40} = 57$. The simple average of 54 and 62 (58) ignores the different group sizes.`,
    hints: ["Find each group's total first."],
  });

  {
    const k = 6;
    chk(freqStats([[2, 4], [3, 7], [4, k], [5, 3]]).mean, 3.4);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "The values 2, 3, 4 and 5 occur with frequencies 4, 7, k and 3 respectively. The mean is 3.4. Find k.",
      value: k, wrong: [3.6, 4],
      explanation: t`$\frac{8 + 21 + 4k + 15}{14 + k} = 3.4$, so $44 + 4k = 47.6 + 3.4k$, $0.6k = 3.6$ and $k = 6$.`,
      hints: [t`Write $\frac{\sum fx}{\sum f} = 3.4$ with $k$ in both totals.`],
    });
  }

  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "The mean of nine numbers is 14. When a tenth number is added, the mean becomes 15. Find the tenth number.",
    value: 10 * 15 - 9 * 14, wrong: [15, 1],
    explanation: t`Total of nine $= 9 \times 14 = 126$; total of ten $= 10 \times 15 = 150$. Tenth number $= 150 - 126 = 24$.`,
    hints: ["Total = mean × number of values."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A distribution is positively skewed (it has a long tail of large values). Which order of the averages is usual?",
    options: [
      ["mode < median < mean", "Correct: the long tail of large values pulls the mean up most."],
      ["mean < median < mode", "This is the order for negative skew."],
      ["mean = median = mode", "This is the case for a symmetric distribution."],
      ["median < mode < mean", "The mode is at the peak, which is on the left for positive skew."],
    ],
    answer: "A",
    explanation: "With positive skew the peak (mode) is on the left; the extreme high values raise the mean above the median.",
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A small company pays eight workers US\\$300, US\\$320, US\\$320, US\\$340, US\\$350, US\\$360, US\\$380 and US\\$2400 a month. Which average best describes a typical monthly wage?",
    options: [
      ["The median", "Correct: it is not pulled up by the one very large wage."],
      ["The mean", "The single wage of US\\$2400 pulls the mean above what seven of the eight workers earn."],
      ["The mode", "US\\$320 appears twice only by chance; it says little about the centre."],
      ["The range", "The range measures spread, not a typical value."],
    ],
    answer: "A",
    explanation: "The median is (340 + 350) ÷ 2 = US\\$345, typical of most workers. The mean, about US\\$596, is distorted by the extreme value.",
    hints: ["Which average ignores extreme values?"],
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Grouped data have classes of different widths. How is the modal class found?",
    options: [
      ["It is the class with the greatest frequency density", "Correct: density allows for the different widths."],
      ["It is the class with the greatest frequency", "A wide class can have a large frequency just because it is wide."],
      ["It is the class that contains the median", "The median class and the modal class are often different."],
      ["It is the widest class in the table", "Width alone says nothing about where values are concentrated."],
    ],
    answer: "A",
    explanation: "With unequal widths the tallest histogram bar (greatest frequency density) shows where the data are most concentrated.",
    hints: ["Think about the tallest bar of the histogram."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each average with the statement that describes it.",
    pairs: [
      ["Mean", "Uses every value but is affected by extreme values"],
      ["Median", "The middle value; not affected by extreme values"],
      ["Mode", "The most frequent value; can be used for categories"],
      ["Estimated mean of grouped data", "Assumes every value in a class is at its midpoint"],
    ],
    explanation: "Each average has strengths: the mean uses all the data, the median resists extremes, and the mode works for qualitative data.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why the mean calculated from a grouped frequency table is only an estimate.",
    points: [
      "The individual values are not known once the data are grouped.",
      "The calculation assumes every value in a class equals the class midpoint, which is not exactly true.",
    ],
    modelAnswer: "Grouping loses the actual values; we only know how many lie in each class. Using the midpoint for every value in the class gives an approximate total, so the mean is an estimate.",
    explanation: "Midpoints stand in for unknown values.",
    hints: ["What information is lost when data are grouped?"],
  });

  {
    const cls = [[0, 10, 8], [10, 20, 22], [20, 30, 28], [30, 40, 15], [40, 60, 7]];
    const G = grouped(cls);
    same(G.cf, [8, 30, 58, 73, 80]);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: paras("The times taken by 80 commuters to travel to work in Harare were recorded.", table(["Time t (min)", "Frequency"], [["0 ≤ t < 10", 8], ["10 ≤ t < 20", 22], ["20 ≤ t < 30", 28], ["30 ≤ t < 40", 15], ["40 ≤ t < 60", 7]])),
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which is the modal class?", options: [
          ["20 ≤ t < 30", "Correct: highest frequency density, 2.8."],
          ["10 ≤ t < 20", "Its frequency density is 2.2, less than 2.8."],
          ["40 ≤ t < 60", "This class is the widest but has the lowest density."],
          ["30 ≤ t < 40", "Its frequency density is 1.5."],
        ], answer: "A", explanation: "Densities: 0.8, 2.2, 2.8, 1.5, 0.35. The greatest is 20 ≤ t < 30." }),
        P.num({ label: "(b)", marks: 3, stem: "Calculate an estimate of the mean time, correct to 3 significant figures.", value: G.mean, unit: "min", wrong: [G.sumfx / 5, 30],
          explanation: t`Midpoints 5, 15, 25, 35, 50: $\sum fx = 40 + 330 + 700 + 525 + 350 = 1945$, so $\bar{t} = \frac{1945}{80} = 24.3$ minutes.` }),
        P.num({ label: "(c)", marks: 3, stem: "Estimate the median time by interpolation, correct to 3 significant figures.", value: G.median, unit: "min", wrong: [25, 20],
          explanation: t`Median position 40; cumulative frequencies 8, 30, 58: median class $20 \leq t < 30$. Median $= 20 + \frac{40 - 30}{28} \times 10 = 23.6$ minutes.` }),
      ],
      explanation: "Use frequency density for the modal class when widths differ, midpoints for the mean, and interpolation in the median class.",
      hints: ["The last class is twice as wide as the others.", "The median is the 40th value."],
    });
  }

  {
    const T = [[1, 6], [2, 8], [3, 10], [4, 12], [5, 4]];
    const st = freqStats(T);
    chk(st.n, 40);
    chk(st.mean, 3);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
      stem: paras("The number of meals eaten out in a month by 40 families is shown, where p and q are unknown.", table(["Meals x", "1", "2", "3", "4", "5"], [["Families f", 6, "p", 10, "q", 4]]), "The mean number of meals is 3."),
      parts: [
        P.proof({ label: "(a)", marks: 2, stem: t`Show that $p + q = 20$ and $p + 2q = 32$.`,
          points: [t`B1 total frequency: $6 + p + 10 + q + 4 = 40$ gives $p + q = 20$.`, t`B1 $\sum fx = 6 + 2p + 30 + 4q + 20 = 120$ gives $2p + 4q = 64$, so $p + 2q = 32$.`],
          modelAnswer: t`$$
6 + p + 10 + q + 4 = 40 \quad\Rightarrow\quad p + q = 20
$$

$$
6 + 2p + 30 + 4q + 20 = 3 \times 40 = 120 \quad\Rightarrow\quad 2p + 4q = 64 \quad\Rightarrow\quad p + 2q = 32
$$`,
          explanation: "Use the total frequency and the total of fx." }),
        P.fib({ label: "(b)", marks: 2, stem: t`Hence find $p$ and $q$.`, template: "p = {{blank:p}}, q = {{blank:q}}",
          blanks: [{ id: "p", input: "number", accepted: [8], wrong: "12" }, { id: "q", input: "number", accepted: [12], wrong: "8" }],
          explanation: t`Subtracting: $q = 12$, then $p = 8$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Find the median number of meals.", value: median(expand(T)), wrong: [4, 2],
          explanation: "The 20th and 21st values: cumulative frequencies 6, 14, 24, so both are 3. Median = 3." }),
        P.num({ label: "(d)", marks: 1, stem: "State the mode.", value: modes(expand(T))[0], wrong: [3, 12],
          explanation: "x = 4 has the highest frequency, q = 12." }),
        P.manual({ label: "(e)", marks: 2, stem: "Compare the mean, median and mode, and comment on the shape of the distribution.",
          points: ["Mean = median = 3, but mode = 4 is larger.", "The data have a longer tail towards small values: slight negative skew."],
          modelAnswer: "The mean and median are both 3 and the mode is 4. Since the mode is above the mean and median, the distribution has a longer tail to the left (smaller values): it is slightly negatively skewed.",
          explanation: "For negative skew, mean ≤ median < mode." }),
      ],
      explanation: "Two equations come from the total frequency and the mean; then use cumulative frequencies for the median and the largest frequency for the mode.",
      hints: [t`$\sum fx = \bar{x} \times \sum f$.`, "Subtract the two equations."],
    });
  }

  b.card("FORMULA", "Mean of a frequency table", t`$\bar{x} = \dfrac{\sum fx}{\sum f}$ (grouped data: $x$ = class midpoint).`);
  b.card("DEFINITION", "Median", t`The middle value of the ordered data: the $\frac{n + 1}{2}$th value.`);
  b.card("DEFINITION", "Mode and modal class", "The most frequent value; for grouped data, the class with the greatest frequency (density).");
  b.card("FORMULA", "Median of grouped data", t`$L + \dfrac{\frac{n}{2} - F}{f} \times w$`, "L lower boundary of the median class, F cumulative frequency before it, f its frequency, w its width.");
  b.card("FACT", "Symmetric and skewed data", "Symmetric: mean = median = mode. Positive skew: mode < median < mean. Negative skew: mean < median < mode.");
  b.card("CONCEPT", "Choosing an average", "Extreme values or skew: median. Qualitative data: mode. Further calculations, all values used: mean.");
  b.card("CONCEPT", "Combined mean", "Find each group's total (n × mean), add the totals and divide by the total number; do not average the means.");
  b.card("FACT", "Grouped mean is an estimate", "Grouping loses the actual values; each is assumed to sit at its class midpoint.");
});

function paras(...list) {
  return list.join("\n\n");
}
