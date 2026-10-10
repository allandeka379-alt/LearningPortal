// W3a: amaths.data.histograms-cumulative
import { concept, P, t, chk, same, grouped, table, sfStr, ZS } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const D3 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [sfStr(x, 3)], tolerance: 0.5 * 10 ** -(2 - Math.floor(Math.log10(Math.abs(x)))), wrong, ...(marks ? { marks } : {}) });
const ineq = (v, [a, b]) => t`$${a} \le ${v} < ${b}$`;

concept("amaths.data.histograms-cumulative", { file: "data/histograms-cumulative", keyPrefix: "data.histograms-cumulative" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In a correctly drawn histogram, what does the area of each bar represent?",
    options: [
      ["the frequency of the class", "Correct: area is proportional to frequency, so height = frequency density."],
      ["the class width of the class", "The width is only the horizontal side of the bar."],
      ["the frequency density of the class", "Frequency density is the height of the bar, not its area."],
      ["the cumulative frequency so far", "Cumulative frequency is shown on a cumulative frequency graph, not by histogram areas."],
    ],
    answer: "A",
    explanation: "Height × width = frequency density × class width = frequency. This is why unequal class widths need frequency density on the vertical axis.",
  });

  chk(45 / 15, 3);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`In a grouped frequency table of journey times, the class $20 \le t < 35$ minutes has frequency 45. Find the frequency density of this class.`,
    value: 3, wrong: [2.25, 1.29],
    explanation: t`Class width $= 35 - 20 = 15$; frequency density $= \frac{45}{15} = 3$. (2.25 divides by 20, the lower boundary; 1.29 divides by 35.)`,
  });

  chk(1.6 * 15, 24);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "On a histogram of the masses of bags of groundnuts, the bar for the class from 10 kg to 25 kg has height 1.6 on the frequency density axis. How many bags are in this class?",
    value: 24, wrong: [1.6, 9.375],
    explanation: t`Frequency $=$ frequency density $\times$ class width $= 1.6 \times 15 = 24$ bags. (9.375 divides 15 by 1.6.)`,
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The ages, in completed years, of members of a youth choir in Gweru are grouped in classes 10–14, 15–19, 20–29. What are the class boundaries of the class 20–29?",
    options: [
      ["20 and 30", "Correct: a member aged 29 years can be almost 30, so the class runs from the 20th birthday up to the 30th."],
      ["19.5 and 29.5", "This treats age as rounded to the nearest year; ages in completed years are truncated, not rounded."],
      ["20 and 29", "There would then be a gap between 29 and 30 where some members' ages lie."],
      ["19 and 30", "Someone aged 19 is in the class 15–19, so 19 cannot be inside this class."],
    ],
    answer: "A",
    explanation: "Age in completed years is truncated: a person 'aged 29' is at least 29 and less than 30. So 20–29 means $20 \\le \\text{age} < 30$, with width 10.",
    hints: ["Think about the oldest possible person who still says they are 29."],
  });

  chk(30 / 10, 3); chk(45 / 30, 1.5); chk((1.5 / 3) * 6, 3);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`On a histogram, the class $10 \le x < 20$ has frequency 30 and is drawn as a bar 6 cm high. The class $20 \le x < 50$ has frequency 45. How high, in cm, should its bar be?`,
    value: 3, unit: "cm", wrong: [9, 1],
    explanation: t`Frequency densities: $\frac{30}{10} = 3$ and $\frac{45}{30} = 1.5$. A density of 3 is drawn 6 cm high, so 1.5 needs $3$ cm. (9 cm plots frequency instead of frequency density.)`,
    hints: ["Find the frequency density of each class first.", "Heights are in proportion to frequency densities."],
  });

  // histogram -> frequency table
  const fdRows = [[0, 4, 2.5], [4, 6, 9], [6, 10, 6.5], [10, 20, 1.2]];
  const fq = fdRows.map(([a, c, d]) => (c - a) * d);
  same(fq, [10, 18, 26, 12]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A histogram of the distances, in km, that a group of learners travel to school has these bars.

${table(["Distance (km)", "Frequency density"], fdRows.map(([a, c, d]) => [ineq("d", [a, c]), d]))}

Find the frequency of each class and the total number of learners.`,
    template: "0–4: {{blank:a}}, 4–6: {{blank:b}}, 6–10: {{blank:c}}, 10–20: {{blank:d}}, total {{blank:n}}",
    blanks: [N("a", 10, "2.5"), N("b", 18, "9"), N("c", 26, "6.5"), N("d", 12, "1.2"), N("n", 66, "19.2")],
    explanation: t`Frequency $=$ density $\times$ width: $2.5 \times 4 = 10$, $9 \times 2 = 18$, $6.5 \times 4 = 26$, $1.2 \times 10 = 12$. Total $= 66$ learners.`,
    hints: ["Multiply each frequency density by its class width."],
  });

  // portion of class: number above 15 km in that histogram
  chk(12 * 0.5, 6); chk(26 * (2 / 4) + 12, 25);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For the same distances, the class $6 \le d < 10$ has frequency 26 and the class $10 \le d < 20$ has frequency 12; no learner travels 20 km or more. Estimate how many learners travel more than 8 km.`,
    value: 25, wrong: [38, 12],
    explanation: t`Assume the 26 values are spread evenly across 6 to 10 km: half of the class (8 to 10 km) gives $13$. Add the whole of the next class: $13 + 12 = 25$ learners. (38 counts all of the 6–10 class.)`,
    hints: ["What fraction of the class 6–10 lies above 8?"],
  });

  // cumulative frequency questions: seedlings
  const sd = grouped([[0, 5, 14], [5, 10, 38], [10, 15, 66], [15, 25, 58], [25, 40, 24]]);
  same(sd.cf, [14, 52, 118, 176, 200]);
  const cfTable = table(["Height h (cm)", "h < 5", "h < 10", "h < 15", "h < 25", "h < 40"], [["Cumulative frequency", ...sd.cf]]);
  chk(sd.median, 10 + ((100 - 52) / 66) * 5);
  b.fib({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The heights of 200 eucalyptus seedlings in a nursery near Mutare are summarised below.

${cfTable}

A cumulative frequency graph is drawn by joining the points with straight lines. Estimate the median, the lower quartile and the upper quartile, in cm, each to 3 significant figures.`,
    template: "median ≈ {{blank:m}} cm, Q1 ≈ {{blank:a}} cm, Q3 ≈ {{blank:b}} cm",
    blanks: [D3("m", sd.median, "12.5"), D3("a", sd.q1, "7.5"), D3("b", sd.q3, "20")],
    explanation: t`Median (100th value), between cumulative frequencies 52 at 10 cm and 118 at 15 cm: $10 + \frac{100 - 52}{66} \times 5 = ${sfStr(sd.median, 3)}$. $Q_1$ (50th value): $5 + \frac{50 - 14}{38} \times 5 = ${sfStr(sd.q1, 3)}$. $Q_3$ (150th value): $15 + \frac{150 - 118}{58} \times 10 = ${sfStr(sd.q3, 3)}$. (12.5, 7.5 and 20 are class mid-points, not estimates of the median or quartiles.)`,
    hints: ["Read across from n/2 = 100, n/4 = 50 and 3n/4 = 150.", "The class 15–25 is 10 cm wide."],
  });

  // phone calls: percentage longer than 8 minutes
  const pc = grouped([[0, 2, 30], [2, 4, 46], [4, 6, 40], [6, 10, 32], [10, 20, 12]]);
  same(pc.cf, [30, 76, 116, 148, 160]);
  const above8 = 160 - (116 + 32 * 0.5);
  chk(above8, 28); chk((above8 / 160) * 100, 17.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The lengths of 160 telephone calls made from an office in Bulawayo are summarised below.

${table(["Length t (min)", "t < 2", "t < 4", "t < 6", "t < 10", "t < 20"], [["Cumulative frequency", ...pc.cf]])}

Estimate the percentage of calls that lasted longer than 8 minutes.`,
    value: 17.5, unit: "%", wrong: [82.5, 20],
    explanation: t`Shorter than 8 minutes: $116 + \frac{2}{4} \times 32 = 132$. Longer than 8 minutes: $160 - 132 = 28$, which is $\frac{28}{160} \times 100 = 17.5\%$. (82.5% is the percentage shorter than 8 minutes.)`,
    hints: ["Find how many calls are shorter than 8 minutes first, then subtract from 160."],
  });

  // javelin: 85th percentile
  const jv = grouped([[20, 30, 8], [30, 35, 12], [35, 40, 18], [40, 50, 16], [50, 60, 6]]);
  same(jv.cf, [8, 20, 38, 54, 60]);
  const p85 = jv.interp(0.85 * 60);
  chk(p85, 40 + ((51 - 38) / 16) * 10);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The distances, in metres, thrown by 60 javelin throwers at a schools' athletics meeting in Gweru are summarised below.

${table(["Distance d (m)", "d < 30", "d < 35", "d < 40", "d < 50", "d < 60"], [["Cumulative frequency", ...jv.cf]])}

No throw was shorter than 20 m. The best 15% of throwers qualify for the provincial team. Estimate the shortest qualifying distance, in metres, to 3 significant figures.`,
    value: p85, unit: "m", wrong: [30.4, 50],
    explanation: t`The best 15% start at the 85th percentile, the $0.85 \times 60 = 51$st value. It lies in the class 40–50 (cumulative 38 to 54): $40 + \frac{51 - 38}{16} \times 10 = ${sfStr(p85, 3)}$ m. (30.4 m is the 15th percentile, the boundary of the weakest 15%.)`,
    hints: ["The best 15% are above the 85th percentile.", "Interpolate within the class that contains the 51st value."],
  });
  chk(jv.interp(9), 30 + (1 / 12) * 5); chk(jv.interp(0.15 * 60), 30 + (1 / 12) * 5);

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`A table gives the frequencies of the classes $0 \le x < 10$, $10 \le x < 20$ and $20 \le x < 30$. Against which $x$-values are the cumulative frequencies plotted on a cumulative frequency graph?`,
    options: [
      ["10, 20 and 30, with 0 plotted at x = 0", "Correct: each running total counts all values up to the upper boundary of its class."],
      ["5, 15 and 25, the mid-points of the classes", "Mid-points are used for frequency polygons and for estimating the mean, not for cumulative frequency."],
      ["0, 10 and 20, the lower boundaries of the classes", "At a lower boundary none of that class has been counted yet."],
      ["10, 20 and 30, with no point plotted at x = 0", "The graph should start at (0, 0), since no values are below the lowest boundary."],
    ],
    answer: "A",
    explanation: "Cumulative frequency up to the end of a class is plotted at the upper class boundary, and the graph starts at zero at the lowest boundary.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "If two classes in a histogram have the same frequency but one class is twice as wide as the other, the wider class has a bar half as tall.",
    answer: true,
    explanation: "Height = frequency ÷ width, so doubling the width with the same frequency halves the frequency density; the areas (frequencies) stay equal.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: "Nyasha draws a frequency polygon for grouped data with equal class widths. At which points does she plot the frequencies?",
    options: [
      ["at the mid-points of the classes", "Correct: a frequency polygon joins the points (mid-point, frequency) with straight lines."],
      ["at the upper boundaries of the classes", "Upper boundaries are used for cumulative frequency graphs."],
      ["at the lower boundaries of the classes", "Plotting at the lower boundaries would shift the whole polygon half a class to the left."],
      ["at the median value of each class", "The median of each class is not known for grouped data."],
    ],
    answer: "A",
    explanation: "Frequency polygons plot each class frequency (or frequency density for unequal widths) above the class mid-point and join the points with straight lines.",
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each term with its meaning for grouped data.",
    pairs: [
      ["class width", "upper class boundary minus lower class boundary"],
      ["frequency density", "frequency divided by class width"],
      ["cumulative frequency", "running total of frequencies up to an upper boundary"],
      ["modal class", "class with the greatest frequency density"],
    ],
    explanation: "With unequal widths the modal class is the one with the tallest histogram bar, which is the greatest frequency density (not necessarily the greatest frequency).",
  });

  // modal class with unequal widths
  const mc = [[0, 5, 20], [5, 10, 26], [10, 20, 40], [20, 40, 50]];
  const mcd = mc.map(([a, c, f]) => f / (c - a));
  same(mcd, [4, 5.2, 4, 2.5]);
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: t`The times, $t$ minutes, taken by customers at a bank in Masvingo are grouped as follows: $0 \le t < 5$: 20 customers; $5 \le t < 10$: 26; $10 \le t < 20$: 40; $20 \le t < 40$: 50. Which is the modal class?`,
    options: [
      [t`$5 \le t < 10$, with frequency density 5.2`, "Correct: densities are 4, 5.2, 4 and 2.5; the tallest bar is 5–10."],
      [t`$20 \le t < 40$, with the largest frequency 50`, "This class is 20 minutes wide; its frequency density is only 2.5."],
      [t`$10 \le t < 20$, with frequency density 4`, "Its density equals that of 0–5 and is less than 5.2."],
      [t`$0 \le t < 5$, with frequency density 4`, "The first class has density 4, which is less than 5.2."],
    ],
    answer: "A",
    explanation: "With unequal widths, compare frequency densities: 20/5 = 4, 26/5 = 5.2, 40/10 = 4, 50/20 = 2.5.",
    hints: ["Divide each frequency by its class width."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain why a median found from a cumulative frequency graph of grouped data is only an estimate, and state the assumption made when reading it from a graph drawn with straight lines.",
    points: [
      "The raw values are not known once the data are grouped, so the exact median cannot be found.",
      "Straight-line segments assume the values are spread evenly (uniformly) within each class.",
    ],
    modelAnswer: "Grouping loses the individual values, so we only know how many values are in each class, not where they lie. Joining the points with straight lines assumes the values in each class are spread evenly across it, so the reading is an estimate.",
    explanation: "Linear interpolation (or a straight-line graph) assumes a uniform spread of values within each class.",
    hints: ["What information is lost when data are grouped?"],
  });

  // Struct 13: maize yields (84 farms)
  const mz = grouped([[2, 3, 6], [3, 3.5, 15], [3.5, 4, 24], [4, 5, 30], [5, 7, 9]]);
  same(mz.fd, [6, 30, 48, 30, 4.5]);
  same(mz.cf, [6, 21, 45, 75, 84]);
  const medY = mz.median;
  chk(medY, 3.5 + ((42 - 21) / 24) * 0.5);
  const q1Y = mz.q1; chk(q1Y, 3.5);
  const q3Y = mz.q3; chk(q3Y, 4 + ((63 - 45) / 30) * 1);
  const over45 = 30 * 0.5 + 9; chk(over45, 24);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The maize yields, $y$ tonnes per hectare, of 84 farms in Mashonaland West are summarised below.

${table(["Yield y (t/ha)", ineq("y", [2, 3]), ineq("y", [3, 3.5]), ineq("y", [3.5, 4]), ineq("y", [4, 5]), ineq("y", [5, 7])], [["Number of farms", 6, 15, 24, 30, 9]])}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the frequency densities for the histogram (farms per tonne per hectare).",
        template: "2–3: {{blank:a}}, 3–3.5: {{blank:b}}, 3.5–4: {{blank:c}}, 4–5: {{blank:d}}, 5–7: {{blank:e}}",
        blanks: [N("a", 6, "6"), N("b", 30, "15"), N("c", 48, "24"), N("d", 30, "30"), N("e", 4.5, "9")],
        wrong: [["6", "15", "24", "30", "9"]],
        explanation: t`Widths 1, 0.5, 0.5, 1, 2: densities $6, \frac{15}{0.5} = 30, \frac{24}{0.5} = 48, 30, \frac{9}{2} = 4.5$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the cumulative frequencies at 3, 3.5, 4 and 5 t/ha.", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}",
        blanks: [N("a", 6, "15"), N("b", 21, "15"), N("c", 45, "24"), N("d", 75, "30")],
        explanation: t`Running totals: $6$, $6 + 15 = 21$, $21 + 24 = 45$, $45 + 30 = 75$ (and 84 at 7).` }),
      P.num({ label: "(c)", marks: 2, stem: "Estimate the median yield, in t/ha, to 3 significant figures, by linear interpolation.", value: medY, wrong: [4, 3.75],
        explanation: t`The 42nd value lies in 3.5–4 (cumulative 21 to 45): $3.5 + \frac{42 - 21}{24} \times 0.5 = ${sfStr(medY, 3)}$ t/ha.` }),
      P.num({ label: "(d)", marks: 2, stem: "Estimate the interquartile range, in t/ha, to 3 significant figures.", value: q3Y - q1Y, wrong: [1.5, 2.5],
        explanation: t`$Q_1$ is the 21st value, exactly the cumulative frequency at 3.5, so $Q_1 = 3.5$; $Q_3$ (63rd value) $= 4 + \frac{63 - 45}{30} \times 1 = ${sfStr(q3Y, 3)}$. $\text{IQR} \approx ${sfStr(q3Y - q1Y, 3)}$ t/ha.` }),
      P.num({ label: "(e)", marks: 2, stem: "Estimate how many farms had a yield of more than 4.5 t/ha.", value: over45, wrong: [39, 9],
        explanation: t`Half of the class 4–5 (15 farms) plus the whole class 5–7 (9 farms): about 24 farms.` }),
      P.manual({ label: "(f)", marks: 1, stem: "State why frequency density, not frequency, must be used for the heights of the histogram bars here.",
        points: ["The classes have unequal widths, so only area (density × width) represents frequency fairly."],
        modelAnswer: "The class widths are unequal (0.5, 1 and 2 t/ha), so bar heights must be frequency densities for the areas to be proportional to the frequencies." }),
    ],
    explanation: "Frequency density for unequal widths; cumulative totals and interpolation for the median and quartiles.",
    hints: ["Two classes are only 0.5 t/ha wide.", "Q1 is at the 21st value and Q3 at the 63rd."],
  });

  // Struct 5: unlabelled histogram
  chk(42 / 3, 14); chk(1.5 * 4 * 14, 84); chk(1 * 2.5 * 14, 35);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`A histogram of the lengths, in mm, of leaves from a msasa tree has no scale on its vertical axis. On the horizontal axis 1 cm represents 10 mm. The bar for $40 \le l < 50$ is 3 cm high and represents 42 leaves. The bar for $50 \le l < 65$ is 4 cm high and the bar for $65 \le l < 75$ is 2.5 cm high.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many leaves does 1 cm² of bar area represent?", value: 14, wrong: [3, 42],
        explanation: t`The bar for 40–50 mm is 1 cm wide and 3 cm high, so its area is 3 cm² for 42 leaves: $42 \div 3 = 14$ leaves per cm².` }),
      P.num({ label: "(b)", marks: 2, stem: "Find the number of leaves in the class 50 ≤ l < 65.", value: 84, wrong: [56, 4],
        explanation: t`Width 1.5 cm, height 4 cm: area 6 cm², so $6 \times 14 = 84$ leaves. (56 ignores the width of the bar.)` }),
      P.num({ label: "(c)", marks: 2, stem: "Find the number of leaves in the class 65 ≤ l < 75.", value: 35, wrong: [14, 2.5],
        explanation: t`Width 1 cm, height 2.5 cm: area 2.5 cm², so $2.5 \times 14 = 35$ leaves.` }),
    ],
    explanation: "Use the bar with a known frequency to find what one unit of area represents.",
    hints: ["Area of a bar = width × height, and area is proportional to frequency."],
  });

  b.card("FORMULA", "Frequency density", t`$\text{frequency density} = \dfrac{\text{frequency}}{\text{class width}}$; frequency $=$ density $\times$ width.`);
  b.card("CONCEPT", "Histogram", "Bars with no gaps on class boundaries; AREA is proportional to frequency; height is frequency density.");
  b.card("FACT", "Boundaries for rounded data", "Masses to the nearest kg, class 50–54: boundaries 49.5 and 54.5, width 5.");
  b.card("FACT", "Boundaries for ages", "Age in completed years 20–29: boundaries 20 and 30 (ages are truncated, not rounded).");
  b.card("CONCEPT", "Cumulative frequency graph", "Plot running totals at UPPER class boundaries, starting from zero at the lowest boundary.");
  b.card("FORMULA", "Reading positions", t`Median at $\frac{n}{2}$, $Q_1$ at $\frac{n}{4}$, $Q_3$ at $\frac{3n}{4}$, $k$th percentile at $\frac{k}{100}n$.`);
  b.card("FORMULA", "Linear interpolation for the median", t`$L + \dfrac{\frac{n}{2} - F}{f} \times w$: $L$ lower boundary, $F$ cumulative frequency before the class, $f$ class frequency, $w$ width.`);
  b.card("CONCEPT", "Frequency polygon (ZIMSEC)", "Join (mid-point, frequency) with straight lines; useful for comparing two distributions.", undefined, { applies: ZS });
  b.card("CONCEPT", "Modal class with unequal widths", "The class with the greatest frequency density (tallest bar), not necessarily the greatest frequency.");
});
