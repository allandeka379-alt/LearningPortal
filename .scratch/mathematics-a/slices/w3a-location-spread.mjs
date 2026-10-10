// W3a: amaths.data.location-spread
import { concept, P, t, chk, same, mean, median, modes, quartiles, freqStats, grouped, expand, table, sfStr } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const D3 = (id, x, wrong, marks) => ({ id, input: "number", accepted: [sfStr(x, 3)], tolerance: 0.5 * 10 ** -(2 - Math.floor(Math.log10(Math.abs(x)))), wrong, ...(marks ? { marks } : {}) });
const ineq = (v, [a, b]) => t`$${a} \le ${v} < ${b}$`;

concept("amaths.data.location-spread", { file: "data/location-spread", keyPrefix: "data.location-spread" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Sipho records the favourite sport of each learner in his class (football, netball, athletics, cricket). Which average can he find for these data?",
    options: [
      ["the mode only", "Correct: the data are categories, so only the most common category makes sense."],
      ["the mean only", "A mean needs numbers to add; sports cannot be added."],
      ["the median only", "A median needs the data in a numerical order; sports have no natural order."],
      ["the mean, median and mode", "Only the mode can be found for qualitative data with no natural order."],
    ],
    answer: "A",
    explanation: "For qualitative (categorical) data with no order, the mode is the only average.",
  });

  const eggs = [58, 61, 55, 63, 60, 57, 64, 66];
  chk(mean(eggs), 60.5);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "The masses, in grams, of 8 eggs are 58, 61, 55, 63, 60, 57, 64 and 66. Find the mean mass.",
    value: 60.5, unit: "g", wrong: [60, 69.1],
    explanation: t`$\sum x = 484$, so $\bar{x} = \frac{484}{8} = 60.5$ g. (69.1 divides by 7 instead of 8.)`,
  });

  const ages = [24, 44, 39, 53, 42, 32, 29, 48, 35, 57];
  chk(median(ages), 40.5); chk((42 + 32) / 2, 37);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "The ages, in years, of the 10 teachers at a rural primary school are 24, 44, 39, 53, 42, 32, 29, 48, 35 and 57. Find the median age.",
    value: 40.5, wrong: [42, 37],
    explanation: t`In order: $24, 29, 32, 35, 39, 42, 44, 48, 53, 57$. With 10 values the median is the mean of the 5th and 6th: $\frac{39 + 42}{2} = 40.5$ years. (37 averages the 5th and 6th values of the list before it is put in order.)`,
  });

  const shoes = [[5, 3], [6, 8], [7, 13], [8, 10], [9, 6]];
  const ss = freqStats(shoes);
  chk(ss.n, 40); chk(ss.sumfx, 288); chk(ss.mean, 7.2);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`The shoe sizes of 40 learners are recorded.

${table(["Shoe size", 5, 6, 7, 8, 9], [["Frequency", 3, 8, 13, 10, 6]])}

Find the mean shoe size.`,
    value: 7.2, wrong: [57.6, 7],
    explanation: t`$\sum fx = 15 + 48 + 91 + 80 + 54 = 288$ and $\sum f = 40$, so $\bar{x} = \frac{288}{40} = 7.2$. (57.6 divides by the 5 sizes instead of the 40 learners.)`,
  });

  const cobs = [[1, 5], [2, 22], [3, 18], [4, 10], [5, 5]];
  const ce = expand(cobs);
  chk(ce.length, 60); chk(median(ce), 3); same(modes(ce), [2]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The number of maize cobs on each of 60 plants is recorded.

${table(["Cobs per plant", 1, 2, 3, 4, 5], [["Number of plants", 5, 22, 18, 10, 5]])}

Find the median and the mode of the number of cobs per plant.`,
    template: "median = {{blank:m}}, mode = {{blank:o}}",
    blanks: [N("m", 3, "2"), N("o", 2, "22")],
    explanation: t`Cumulative frequencies: 5, 27, 45, 55, 60. The median is the mean of the 30th and 31st values; both lie in the group with 3 cobs (28th to 45th), so the median is 3. The mode is 2 cobs, the value with the highest frequency (22 is the frequency, not the mode).`,
    hints: ["Make a running total of the frequencies.", "The mode is a value of the variable, not a frequency."],
  });

  const fish = grouped([[10, 15, 8], [15, 20, 21], [20, 25, 30], [25, 35, 15], [35, 45, 6]]);
  chk(fish.n, 80); chk(fish.sumfx, 1832.5);
  const fishTable = table(["Length l (cm)", ineq("l", [10, 15]), ineq("l", [15, 20]), ineq("l", [20, 25]), ineq("l", [25, 35]), ineq("l", [35, 45])], [["Number of fish", 8, 21, 30, 15, 6]]);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The lengths of 80 bream caught in Lake Kariba are summarised below.

${fishTable}

Calculate an estimate of the mean length, in cm, to 3 significant figures.`,
    value: fish.mean, unit: "cm", wrong: [22.5, 366.5],
    explanation: t`Mid-points 12.5, 17.5, 22.5, 30, 40. $\sum fx = 100 + 367.5 + 675 + 450 + 240 = 1832.5$, so $\bar{x} \approx \frac{1832.5}{80} = ${sfStr(fish.mean, 3)}$ cm. (366.5 divides by the 5 classes.)`,
    hints: ["Use the mid-point of each class as x.", "Divide by the total frequency."],
  });

  const cl = grouped([[0, 10, 21], [10, 20, 23], [20, 40, 33], [40, 60, 29], [60, 90, 16]]);
  chk(cl.n, 122); chk(cl.median, 20 + ((61 - 44) / 33) * 20);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The ages of 122 patients seen at a clinic in Kadoma on one day are summarised below.

${table(["Age a (years)", ineq("a", [0, 10]), ineq("a", [10, 20]), ineq("a", [20, 40]), ineq("a", [40, 60]), ineq("a", [60, 90])], [["Number of patients", 21, 23, 33, 29, 16]])}

Use linear interpolation to estimate the median age, in years, to 3 significant figures.`,
    value: cl.median, wrong: [30, 40],
    explanation: t`The median is at $\frac{122}{2} = 61$, in $20 \le a < 40$, with 44 patients below 20: median $\approx 20 + \frac{61 - 44}{33} \times 20 = ${sfStr(cl.median, 3)}$ years. (30 is the mid-point of the median class.)`,
    hints: ["Find the cumulative frequency before the class containing the median.", "This class is 20 years wide."],
  });


  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The monthly rainfall at a station in Chimanimani was very much higher in one month than in all the others. Which measure of central tendency is most affected by this one value?",
    options: [
      ["the mean", "Correct: every value contributes to the mean, so one extreme value pulls it towards itself."],
      ["the median", "The median depends only on the middle position, so one extreme value hardly changes it."],
      ["the mode", "The mode is the most common value; one unusual value does not change it."],
      ["the median and the mode equally", "The mean is the measure that is affected; the median and mode are resistant."],
    ],
    answer: "A",
    explanation: "The mean uses the size of every value, so it is sensitive to outliers; the median and the IQR are resistant to them.",
  });

  const k = 8;
  chk((0 * 4 + 1 * k + 2 * 10 + 3 * 6 + 4 * 2) / (4 + k + 10 + 6 + 2), 1.8);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The table shows the number of goals scored by a school football team in its matches. The mean number of goals per match is 1.8.

${table(["Goals", 0, 1, 2, 3, 4], [["Matches", 4, "k", 10, 6, 2]])}

Find $k$.`,
    value: k, prefix: "k =", wrong: [5, 10],
    explanation: t`$\sum f = 22 + k$ and $\sum fx = k + 20 + 18 + 8 = 46 + k$. So $\frac{46 + k}{22 + k} = 1.8 \Rightarrow 46 + k = 39.6 + 1.8k \Rightarrow 6.4 = 0.8k \Rightarrow k = 8$.`,
    hints: ["Write the mean as Σfx ÷ Σf with k in both.", "Multiply out and collect the k terms."],
  });

  chk((12 * 45 + 71) / 13, 47);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The mean of 12 numbers is 45. A thirteenth number, 71, is added. Find the new mean.",
    value: 47, wrong: [58, 46.2],
    explanation: t`Original total $= 12 \times 45 = 540$. New total $= 540 + 71 = 611$, so the new mean is $\frac{611}{13} = 47$. (58 averages 45 and 71.)`,
    hints: ["Work with totals, not means."],
  });

  chk((25 * 62 + 35 * 68) / 60, 65.5);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "In a mock examination, the 25 boys in a Form 6 class had a mean mark of 62 and the 35 girls had a mean mark of 68. Find the mean mark of the whole class.",
    value: 65.5, wrong: [65, 66.5],
    explanation: t`Total marks $= 25 \times 62 + 35 \times 68 = 1550 + 2380 = 3930$; mean $= \frac{3930}{60} = 65.5$. (65 is the mean of 62 and 68, which ignores the different group sizes.)`,
    hints: ["Find each group's total, add them, and divide by the total number of learners."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The median found by linear interpolation from a grouped frequency table is the exact median of the original data.",
    answer: false,
    explanation: "Grouping loses the raw values. Interpolation assumes the values are spread evenly within the class, so the median found this way is an estimate.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "Every value in a data set is increased by 5. What happens to the mean and to the interquartile range?",
    options: [
      ["The mean increases by 5; the IQR is unchanged.", "Correct: adding 5 shifts every value, including both quartiles, by 5, so their difference is unchanged."],
      ["The mean and the IQR both increase by 5.", "Q1 and Q3 both increase by 5, so Q3 − Q1 does not change."],
      ["The mean is unchanged; the IQR increases by 5.", "Every value is 5 larger, so the mean is 5 larger too."],
      ["The mean increases by 5; the IQR increases by 10.", "The quartiles each move by 5 in the same direction, so their difference stays the same."],
    ],
    answer: "A",
    explanation: "Adding a constant moves every measure of location by that constant and leaves every measure of spread unchanged.",
    hints: ["What happens to Q1 and Q3 separately?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each situation with the most suitable average.",
    pairs: [
      ["the dress size a shop in Harare should stock most of", "mode"],
      ["typical house prices in a suburb with a few mansions", "median"],
      ["the mean mark used to compare two classes with symmetrical marks and no outliers", "mean"],
      ["the most common blood group among donors", "mode (the data are qualitative)"],
    ],
    explanation: "Use the mode for the most common value or category, the median for skewed data with outliers, and the mean for roughly symmetrical data where every value should count.",
  });

  const ht = [152, 158, 161, 163, 165, 166, 168, 170, 171, 173, 175, 178, 180, 184, 191];
  const qh = quartiles(ht);
  same([qh.q1, qh.q2, qh.q3, qh.iqr], [163, 170, 178, 15]);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "The heights, in cm, of 15 members of a volleyball club in Gweru, in order, are: 152, 158, 161, 163, 165, 166, 168, 170, 171, 173, 175, 178, 180, 184, 191. Find the median, the interquartile range and the range.",
    template: "median {{blank:m}} cm, IQR {{blank:i}} cm, range {{blank:r}} cm",
    blanks: [N("m", 170, "171"), N("i", 15, "17"), N("r", 39, "191")],
    explanation: t`Median: the 8th value, 170 cm. $Q_1$ is the 4th value, 163, and $Q_3$ the 12th, 178: $\text{IQR} = 15$ cm. Range $= 191 - 152 = 39$ cm.`,
    hints: ["With 15 values, the quartiles are the 4th and 12th values."],
  });

  // mean = median + 2
  chk((3 + 7 + 8 + 12 + 20) / 5, median([3, 7, 8, 12, 20]) + 2);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Five numbers are $3, 7, 8, 12$ and $x$, where $x > 12$. The mean of the five numbers is 2 more than their median. Find $x$.`,
    value: 20, prefix: "x =", wrong: [10, 30],
    explanation: t`Since $x > 12$, the ordered list is $3, 7, 8, 12, x$ and the median is 8. Mean $= 10$, so $\frac{30 + x}{5} = 10 \Rightarrow x = 20$.`,
    hints: ["Find the median first: where does x go in the ordered list?"],
  });

  chk((25 * 36.4 - 85 + 58) / 25, 35.32);
  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: "The mean of 25 values was calculated as 36.4. It was then found that one value, 58, had been recorded wrongly as 85. What is the correct mean?",
    options: [
      ["35.32", t`Correct: corrected total $= 25 \times 36.4 - 27 = 883$, and $883 \div 25 = 35.32$.`],
      ["37.48", "This adds the error of 27 instead of removing it."],
      ["35.275", "This divides the change of 27 by 24 instead of 25."],
      ["9.4", "This subtracts the whole error of 27 from the mean instead of from the total."],
    ],
    answer: "A",
    explanation: t`Work with the total: $25 \times 36.4 = 910$; replacing 85 by 58 lowers it by 27 to 883; the correct mean is $\frac{883}{25} = 35.32$.`,
    hints: ["Find the total first."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "The times, in minutes, that 9 buses arrived late at a terminus in Bulawayo were 2, 4, 4, 5, 7, 8, 11, 15 and 42. The mean is 10.9 minutes, the median 7 minutes and the mode 4 minutes. State, with a reason, which average best represents a typical delay.",
    points: [
      "The median (7 minutes).",
      "Because the delay of 42 minutes is an outlier that pulls the mean up (most buses were less late than the mean), and the mode is just the smallest repeated value.",
    ],
    modelAnswer: "The median, 7 minutes. The 42-minute delay is extreme and drags the mean up to 10.9 minutes, which is larger than 7 of the 9 delays, so the mean is not typical. The median is not affected by the extreme value.",
    explanation: "With an outlier, the median is the representative average.",
    hints: ["How many of the delays are bigger than the mean?"],
  });

  // Struct 12: grouped exam marks, unequal widths
  const ex = grouped([[0, 20, 3], [20, 40, 8], [40, 50, 11], [50, 60, 13], [60, 80, 7], [80, 100, 3]]);
  chk(ex.n, 45); chk(ex.sumfx, 2240);
  same(ex.cf, [3, 11, 22, 35, 42, 45]);
  same(ex.fd, [0.15, 0.4, 1.1, 1.3, 0.35, 0.15]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The marks of 45 learners in a Form 6 mathematics test are summarised below.

${table(["Mark m", ineq("m", [0, 20]), ineq("m", [20, 40]), ineq("m", [40, 50]), ineq("m", [50, 60]), ineq("m", [60, 80]), ineq("m", [80, 100])], [["Frequency", 3, 8, 11, 13, 7, 3]])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate an estimate of the mean mark, to 3 significant figures.", value: ex.mean, wrong: [50, 373],
        explanation: t`Mid-points 10, 30, 45, 55, 70, 90. $\sum fx = 30 + 240 + 495 + 715 + 490 + 270 = 2240$, so $\bar{x} \approx \frac{2240}{45} = ${sfStr(ex.mean, 3)}$.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which is the modal class?",
        options: [[t`$50 \le m < 60$`, "Correct: frequency density 1.3, the greatest."], [t`$40 \le m < 50$`, "Density 1.1 is less than 1.3."], [t`$60 \le m < 80$`, "Its density is only 7/20 = 0.35."], [t`$20 \le m < 40$`, "Its density is 8/20 = 0.4."]],
        answer: "A", explanation: "With unequal widths compare frequency densities: 0.15, 0.4, 1.1, 1.3, 0.35, 0.15." }),
      P.num({ label: "(c)", marks: 3, stem: "Use linear interpolation to estimate the median mark, to 3 significant figures.", value: ex.median, wrong: [55, 51.2],
        explanation: t`The median is at $\frac{45}{2} = 22.5$, in $50 \le m < 60$ (cumulative 22 before it): $50 + \frac{22.5 - 22}{13} \times 10 = ${sfStr(ex.median, 3)}$.` }),
      P.fib({ label: "(d)", marks: 3, stem: "Estimate the lower and upper quartiles and the interquartile range, each to 3 significant figures.",
        template: "Q1 ≈ {{blank:a}}, Q3 ≈ {{blank:b}}, IQR ≈ {{blank:c}}",
        blanks: [D3("a", ex.q1, "45"), D3("b", ex.q3, "70"), D3("c", ex.q3 - ex.q1, "25")],
        explanation: t`$Q_1$ at 11.25: $40 + \frac{11.25 - 11}{11} \times 10 = ${sfStr(ex.q1, 3)}$. $Q_3$ at 33.75: $50 + \frac{33.75 - 22}{13} \times 10 = ${sfStr(ex.q3, 3)}$. $\text{IQR} \approx ${sfStr(ex.q3 - ex.q1, 3)}$.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Another class had median 55.2 and interquartile range 12.4. Compare the marks of the two classes.",
        points: ["The other class did better on average (median 55.2 against about 50.4).", "The other class's marks were less spread out / more consistent (IQR 12.4 against about 18.8)."],
        modelAnswer: "The second class scored higher on average, with a median of 55.2 compared with about 50.4. Its marks were also more consistent: its IQR of 12.4 is smaller than this class's IQR of about 18.8." }),
      P.manual({ label: "(f)", marks: 1, stem: "Explain why the answers to (a), (c) and (d) are estimates.",
        points: ["The data are grouped, so the actual marks are unknown; mid-points / even spreading within classes are assumed."],
        modelAnswer: "Only the class frequencies are known, not the individual marks, so we assume each mark is at its class mid-point (for the mean) or that marks are evenly spread in each class (for the median and quartiles)." }),
    ],
    explanation: "Mid-points for the mean; frequency densities for the modal class; interpolation for the median and quartiles.",
    hints: ["Classes have different widths: use frequency density for the mode.", "The median position is n/2 = 22.5 for interpolation."],
  });
  chk(Number(sfStr(ex.median, 3)), 50.4); chk(Number(sfStr(ex.q3 - ex.q1, 3)), 18.8);

  // Struct 5: bus delays
  const bus = [3, 5, 5, 6, 6, 6, 9, 12, 51];
  chk(mean(bus), 103 / 9); chk(median(bus), 6); same(modes(bus), [6]);
  const bus2 = [3, 4, 5, 5, 7, 9, 10, 16, 41];
  chk(mean(bus2), 100 / 9); chk(median(bus2), 7); same(modes(bus2), [5]);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "The numbers of minutes late that 9 trains arrived at Bulawayo station during one week were 3, 4, 5, 5, 7, 9, 10, 16 and 41.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the mean (to 3 significant figures), the median and the mode.", template: "mean {{blank:a}}, median {{blank:b}}, mode {{blank:c}}",
        blanks: [D3("a", mean(bus2), "10"), N("b", 7, "5"), N("c", 5, "2")],
        explanation: t`$\sum x = 100$, so the mean is $\frac{100}{9} = ${sfStr(mean(bus2), 3)}$ minutes. The median is the 5th value, 7 minutes. The mode is 5 minutes.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which average best represents a typical delay?",
        options: [["the median", "Correct: it is not affected by the extreme delay of 41 minutes."], ["the mean", "The 41-minute delay pulls the mean above 7 of the 9 delays."], ["the mode", "Only two trains share the mode; it says little about the rest."], ["the range", "The range is a measure of spread, not an average."]],
        answer: "A", explanation: "With an outlier, use the median." }),
      P.manual({ label: "(c)", marks: 1, stem: "Explain why the mean is not a good representative value here.",
        points: ["The outlier of 41 minutes increases the mean so that most of the delays are below it."],
        modelAnswer: "The single delay of 41 minutes is extreme and raises the mean to about 11.1 minutes, which is larger than seven of the nine delays." }),
    ],
    explanation: "Calculate the three averages, then judge which is representative.",
    hints: ["Look for an extreme value before choosing an average."],
  });

  b.card("FORMULA", "Mean of a frequency table", t`$\bar{x} = \dfrac{\sum fx}{\sum f}$ (grouped data: $x$ = class mid-point, an estimate).`);
  b.card("DEFINITION", "Median", t`The middle value of ordered data: the $\frac{n + 1}{2}$th value (mean of the two middle values when $n$ is even).`);
  b.card("DEFINITION", "Mode and modal class", "Most common value; for grouped data the class with the highest frequency density.");
  b.card("FORMULA", "Interquartile range", t`$\text{IQR} = Q_3 - Q_1$, the spread of the middle 50% of the data.`);
  b.card("FORMULA", "Median by interpolation", t`$L + \dfrac{\frac{n}{2} - F}{f} \times w$`, "L lower boundary of the median class, F cumulative frequency before it, f its frequency, w its width.");
  b.card("CONCEPT", "Choosing an average", "Mean: symmetrical data, no outliers. Median: skewed data or outliers. Mode: qualitative data or the most common value.");
  b.card("FACT", "Adding a constant to every value", "Measures of location shift by the constant; measures of spread (range, IQR, sd) are unchanged.");
  b.card("CONCEPT", "Combining two groups", t`Overall mean $= \dfrac{n_1\bar{x}_1 + n_2\bar{x}_2}{n_1 + n_2}$ — work with totals.`);
  b.card("CONCEPT", "Comparing data sets", "Give a measure of location and a measure of spread, with values, and interpret both in context.");
});
