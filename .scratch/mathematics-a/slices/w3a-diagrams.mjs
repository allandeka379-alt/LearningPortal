// W3a: amaths.data.diagrams
import { concept, P, t, chk, same, quartiles, median, sum, ZS } from "../lib.mjs";

const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [x], wrong, ...(marks ? { marks } : {}) });
const D = (id, x, tol, wrong, marks) => ({ id, input: "number", accepted: [String(x)], tolerance: tol, wrong, ...(marks ? { marks } : {}) });
/** Stem-and-leaf table from sorted values: stem = floor(v / unit). */
function stemLeaf(vals, { unit = 10, leafDiv = 1 } = {}) {
  const rows = new Map();
  for (const v of vals) {
    const s = Math.floor(v / unit + 1e-9);
    const leaf = Math.round((v - s * unit) / leafDiv);
    if (!rows.has(s)) rows.set(s, []);
    rows.get(s).push(leaf);
  }
  const lo = Math.min(...rows.keys());
  const hi = Math.max(...rows.keys());
  const out = [];
  for (let s = lo; s <= hi; s++) out.push([String(s), (rows.get(s) ?? []).join(" ")]);
  return out;
}
const slTable = (rows) => ["| Stem | Leaves |", "| --- | --- |", ...rows.map(([s, l]) => `| ${s} | ${l} |`)].join("\n");

concept("amaths.data.diagrams", { file: "data/diagrams", keyPrefix: "data.diagrams" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false, applies: ZS,
    stem: "Chipo records the number of eggs laid each day by the hens on her family's plot in Chinhoyi. What type of data is this?",
    options: [
      ["quantitative and discrete", "Correct: the data are numbers (quantitative) and they are counts, so only whole-number values are possible (discrete)."],
      ["quantitative and continuous", "Continuous data are measured (mass, time, length) and can take any value in a range; a number of eggs is counted."],
      ["qualitative and discrete", "Qualitative data are descriptions, such as colours or names; a number of eggs is quantitative."],
      ["qualitative and continuous", "The data are numbers, so they are not qualitative, and counts are not continuous."],
    ],
    answer: "A",
    explanation: "Counted quantities are discrete; measured quantities are continuous. Both are quantitative because they are numbers.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: "Tatenda is investigating the reading habits of Form 5 learners at his school. Which of these is a source of secondary data for his investigation?",
    options: [
      ["the library's borrowing records for the past term", "Correct: the records were collected by someone else for another purpose, so they are secondary data."],
      ["a questionnaire he gives to every Form 5 class himself", "Tatenda collects these answers himself for his purpose: primary data."],
      ["interviews he holds with ten learners after school", "Interviews he conducts are primary data collection."],
      ["his own counts of learners reading in the library at break", "Observation by the investigator produces primary data."],
    ],
    answer: "A",
    explanation: "Primary data are collected by the investigator for the purpose in hand; secondary data already exist, collected by someone else (records, reports, websites).",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false, applies: ZS,
    stem: "The time a learner takes to run 100 m, recorded to the nearest tenth of a second, is an example of discrete data.",
    answer: false,
    explanation: "Time is measured, so it is continuous; recording it to 0.1 s only rounds a continuous quantity. Discrete data are counts or values from a fixed list.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false, applies: ZS,
    stem: "Match each method of collecting data with the situation it suits best.",
    pairs: [
      ["observation", "counting the kombis that pass a road junction in Gweru each minute"],
      ["experiment", "comparing maize yields on plots with and without a new fertiliser"],
      ["questionnaire", "finding the views of 400 parents on a change to school hours"],
      ["interview", "exploring in depth why a few farmers stopped growing cotton"],
    ],
    explanation: "Observation records events as they happen; an experiment controls conditions to measure an effect; a questionnaire reaches many people cheaply; an interview allows follow-up questions with a few people.",
    hints: ["Ask which method controls conditions, which reaches many people, and which allows follow-up questions."],
  });

  // Tobacco bales: 19 values, key 10 | 4 = 104 kg
  const bales = [82, 85, 88, 91, 93, 94, 96, 97, 99, 101, 102, 104, 104, 106, 108, 111, 113, 117, 132];
  const qb = quartiles(bales);
  same([qb.q1, qb.q2, qb.q3, qb.iqr], [93, 101, 108, 15]);
  const balesTable = slTable(stemLeaf(bales));
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`The stem-and-leaf diagram shows the masses, in kg, of 19 bales of tobacco on an auction floor in Harare. Key: $10 \mid 4$ means 104 kg.

${balesTable}

Find the median mass.`,
    value: qb.q2, unit: "kg", wrong: [104, 99],
    explanation: t`With $n = 19$ values the median is the $\frac{19 + 1}{2} = 10$th value, counting through the ordered leaves: $82, 85, 88, 91, 93, 94, 96, 97, 99, 101$. The median is 101 kg. (104 is the mode, not the median.)`,
  });

  const pk = [3.2, 3.6, 3.9, 4.1, 4.4, 4.4, 4.8, 5.0, 5.3, 5.5, 5.9, 6.2, 6.6, 7.0, 8.4];
  const qp = quartiles(pk);
  same([qp.q1, qp.q2, qp.q3], [4.1, 5.0, 6.2]);
  chk(qp.iqr, 2.1, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The stem-and-leaf diagram shows the masses, in kg, of 15 pumpkins from a garden in Nyanga. Key: $4 \mid 4$ means 4.4 kg.

${slTable(stemLeaf(pk, { unit: 1, leafDiv: 0.1 }))}

Using the median of each half of the data (the median itself excluded), find the lower quartile, the upper quartile and the interquartile range.`,
    template: "Q1 = {{blank:a}} kg, Q3 = {{blank:b}} kg, IQR = {{blank:c}} kg",
    blanks: [D("a", 4.1, 0.001, "4.4"), D("b", 6.2, 0.001, "5.9"), D("c", 2.1, 0.001, "5.2")],
    explanation: t`$n = 15$, so the median is the 8th value, 5.0 kg. The lower half is the 7 values $3.2, \ldots, 4.8$; its middle (4th) value is $Q_1 = 4.1$. The upper half $5.3, \ldots, 8.4$ has middle value $Q_3 = 6.2$ (the 12th value overall). $\text{IQR} = 6.2 - 4.1 = 2.1$ kg. (5.2 is the range, $8.4 - 3.2$.)`,
    hints: ["Count 7 values below the median and 7 above it.", "The quartiles are the middle values of these halves."],
  });

  const fence = qb.q3 + 1.5 * qb.iqr;
  chk(fence, 130.5);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For the tobacco bales on the auction floor, $Q_1 = 93$ kg, the median is 101 kg and $Q_3 = 108$ kg; the lightest bale is 82 kg and the heaviest 132 kg. An outlier is a value more than $1.5 \times \text{IQR}$ below $Q_1$ or above $Q_3$. Which statement is correct?`,
    options: [
      ["Only the 132 kg bale is an outlier, because 132 is greater than 130.5.", t`Correct: $\text{IQR} = 15$, upper fence $108 + 22.5 = 130.5$; lower fence $93 - 22.5 = 70.5$, and 82 is above it.`],
      ["Both the 82 kg and the 132 kg bales are outliers, as they are the extremes.", t`The lower fence is $70.5$ kg; 82 kg is inside it, so it is not an outlier. Extremes are not automatically outliers.`],
      ["No bale is an outlier, because the upper fence is 108 + 1.5 × 50 = 183 kg.", t`This uses the range (50) instead of the IQR (15); the fence is $108 + 1.5 \times 15 = 130.5$.`],
      ["Only the 132 kg bale is an outlier, because 132 is more than 1.5 × 101.", t`The rule multiplies the IQR, not the median, and adds the result to $Q_3$.`],
    ],
    answer: "A",
    explanation: t`Fences: $Q_1 - 1.5 \times \text{IQR} = 70.5$ and $Q_3 + 1.5 \times \text{IQR} = 130.5$. Only 132 kg lies outside.`,
    hints: ["Find the IQR first, then 1.5 × IQR."],
  });

  // Back-to-back 100 m times
  const boys = [12.1, 12.5, 12.8, 13.2, 13.4, 13.6, 13.9, 14.0, 14.7];
  const girls = [12.9, 13.3, 13.5, 13.8, 14.1, 14.2, 14.6, 14.9, 15.4];
  chk(median(boys), 13.4); chk(median(girls), 14.1);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`The back-to-back stem-and-leaf diagram shows the times, in seconds, of 9 boys and 9 girls in a 100 m race. Key: $3 \mid 13 \mid 5$ means 13.3 s for a boy and 13.5 s for a girl.

| Boys | Stem | Girls |
| --- | --- | --- |
| 8 5 1 | 12 | 9 |
| 9 6 4 2 | 13 | 3 5 8 |
| 7 0 | 14 | 1 2 6 9 |
|  | 15 | 4 |

Find the median time for the boys, in seconds.`,
    value: 13.4, dp: 1, unit: "s", wrong: [13.6, 14.1],
    explanation: t`The boys' leaves increase away from the stem, so read them from right to left: $12.1, 12.5, 12.8, 13.2, 13.4, 13.6, 13.9, 14.0, 14.7$. The median is the 5th value, 13.4 s. (13.6 comes from reading the leaves left to right; 14.1 is the girls' median.)`,
    hints: ["On the left-hand side the smallest leaf is next to the stem."],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A box-and-whisker plot of the waiting times at a clinic has its median much closer to the lower quartile than to the upper quartile, and its right-hand whisker is much longer than its left-hand whisker. How is the distribution best described?",
    options: [
      ["positively skewed, with a long tail of high values", "Correct: the upper part of the data is more spread out, giving a tail to the right (positive skew)."],
      ["negatively skewed, with a long tail of low values", "Negative skew would show the median near Q3 and a longer left whisker."],
      ["symmetrical, since the box is still a single rectangle", "A symmetrical distribution has the median central in the box and whiskers of similar length."],
      ["bimodal, because the two whiskers have different lengths", "A box plot cannot show two peaks; unequal whiskers indicate skew."],
    ],
    answer: "A",
    explanation: t`Positive skew: $Q_3 - Q_2 > Q_2 - Q_1$ and a longer upper whisker. Waiting times are often like this: most people wait a short time and a few wait much longer.`,
  });

  const ex = [31, 37, 44, 52, 79];
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Rudo has the test marks of all 32 learners in her class and wants a diagram that shows every individual mark and also lets her read off the median easily. Which diagram should she draw?",
    options: [
      ["a stem-and-leaf diagram", "Correct: it keeps every raw value in order, so the median and quartiles can be counted off."],
      ["a box-and-whisker plot", "A box plot shows the median clearly but loses the individual marks."],
      ["a pie chart of the marks", "A pie chart shows shares of a whole; it does not show individual marks or the median."],
      ["a histogram of the marks", "A histogram groups the marks into classes, so the individual marks are lost."],
    ],
    answer: "A",
    explanation: "A stem-and-leaf diagram is a good choice for a small or moderate data set when the raw values matter; box plots and histograms summarise and lose the raw values.",
  });

  // pie chart angle (ZS)
  const trans = { walk: 30, kombi: 24, bicycle: 8, car: 10 };
  const tt = sum(Object.values(trans));
  chk(tt, 72); chk(36 + 22 + 14 + 8, 80); chk((22 / 80) * 360, 99);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true, applies: ZS,
    stem: "In a survey of 80 households in Mutare, 36 cook mainly with firewood, 22 with electricity, 14 with gas and 8 with paraffin. The results are to be shown in a pie chart. Find the angle of the sector for electricity, in degrees.",
    value: 99, unit: "°", wrong: [22, 79.2],
    explanation: t`Sector angle $= \frac{22}{80} \times 360^\circ = 99^\circ$. (79.2 uses 100 instead of 80 as the total, treating 22 as a percentage.)`,
  });

  chk((45 * 360) / 75, 216);
  b.num({
    d: 3, skill: "APPLICATION", calculator: false, applies: ZS,
    stem: t`In a pie chart showing the crops grown by farmers in a ward in Mashonaland Central, the sector for tobacco has an angle of $75^\circ$ and represents 45 farmers. How many farmers are represented by the whole pie chart?`,
    value: 216, wrong: [75, 120],
    explanation: t`$75^\circ$ represents 45 farmers, so $1^\circ$ represents $\frac{45}{75} = 0.6$ farmers and $360^\circ$ represents $360 \times 0.6 = 216$ farmers.`,
    hints: ["Find how many farmers one degree represents."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "When outliers are marked separately on a box-and-whisker plot, the whiskers still extend to the smallest and largest values in the data.",
    answer: false,
    explanation: "When outliers are shown (usually as crosses), each whisker stops at the most extreme value that is not an outlier.",
  });

  // missing values with Q1, median, IQR
  const md = [112, 118, 125, 127, 133, 137, 141, 146, 149, 153, 159];
  const qm = quartiles(md);
  same([qm.q1, qm.q2, qm.q3], [125, 137, 149]);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The masses, in grams, of eleven mangoes written in ascending order are $112, 118, x, 127, 133, y, 141, 146, 149, 153, 159$. The median is 137 g and the interquartile range is 24 g, with the quartiles taken as the 3rd and 9th values. Find $x$ and $y$.`,
    template: "x = {{blank:x}}, y = {{blank:y}}",
    blanks: [N("x", 125, "113"), N("y", 137, "133")],
    explanation: t`With 11 values the median is the 6th value, so $y = 137$. $Q_3$ is the 9th value, 149, so $Q_1 = 149 - 24 = 125$, the 3rd value: $x = 125$. (Check that $118 \le x \le 127$ and $133 \le y \le 141$, so the values stay in order.)`,
    hints: ["Which position is the median when n = 11?", "Use Q3 − Q1 = 24 with Q3 = 149."],
  });

  b.mcq({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`Two box plots on the same scale show the daily sales, in bags of mealie-meal, at two shops over a month. Shop P: minimum 16, $Q_1$ 30, median 37, $Q_3$ 42, maximum 62. Shop Q: minimum 20, $Q_1$ 27, median 32, $Q_3$ 46, maximum 56. Which statement is supported by these summaries?`,
    options: [
      ["Shop P had higher typical sales, and Shop Q's middle half of days was more spread out.", "Correct: median 37 against 32; IQR 12 for P against 19 for Q."],
      ["Shop P had higher typical sales, and Shop P's sales were less variable on every measure.", "P has the larger range (46 against 36), so it is not less variable on every measure."],
      ["Shop Q had higher typical sales, since its upper quartile is the higher of the two.", "Typical sales are compared with the median (37 for P against 32 for Q), not with an upper quartile."],
      ["Shop Q had the larger range of sales and the larger interquartile range of the two.", "Q's range is 36 and P's is 46, so Q does not have the larger range."],
    ],
    answer: "A",
    explanation: t`Location: median 37 (P) against 32 (Q). Spread: IQR $42 - 30 = 12$ (P) against $46 - 27 = 19$ (Q); range 46 (P) against 36 (Q). The IQR is less affected by extreme days, so it is usually the better measure of spread to quote.`,
    hints: ["Work out the median, IQR and range for each shop before reading the options."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "The masses of the bags of maize delivered by two farmers to a depot are summarised by: Farmer A — median 48.6 kg, IQR 1.2 kg; Farmer B — median 50.1 kg, IQR 3.4 kg. Make two comparisons between the masses of the two farmers' bags, in context.",
    points: [
      "Location: Farmer B's bags were heavier on average (median 50.1 kg against 48.6 kg).",
      "Spread: Farmer A's bag masses were more consistent (IQR 1.2 kg against 3.4 kg).",
    ],
    modelAnswer: "On average Farmer B's bags are heavier, with a median of 50.1 kg compared with 48.6 kg. Farmer A's bags are more consistent in mass, as their interquartile range (1.2 kg) is smaller than Farmer B's (3.4 kg).",
    explanation: "A full comparison quotes one measure of location and one of spread, each with the values and an interpretation in context.",
    hints: ["Compare the medians, then the IQRs; say what each means for the bags."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2, applies: ZS,
    stem: "A questionnaire for Form 5 learners contains the question: \"How many hours do you study each evening? Tick one: 0–1, 1–2, 2–3, 3 or more.\" Give two criticisms of this question and suggest an improvement.",
    points: [
      "Identifies that the classes overlap (a learner who studies exactly 1 or 2 hours could tick two boxes), or that 'each evening' is ambiguous because study time varies from day to day.",
      "Suggests non-overlapping, clearly defined options, e.g. 'less than 1 h, at least 1 h but less than 2 h, …', and a fixed time frame such as 'on an average school evening last week'.",
    ],
    modelAnswer: "The tick boxes overlap: someone who studies exactly 2 hours fits both 1–2 and 2–3. Also, 'each evening' is vague because study time changes from day to day. Better: 'On an average school evening last week, how long did you study? less than 1 h / at least 1 h but less than 2 h / at least 2 h but less than 3 h / 3 h or more.'",
    explanation: "Good questions are clear, unambiguous and not leading, with response boxes that cover every case exactly once.",
    hints: ["Check whether every possible answer fits exactly one box."],
  });

  // Struct 12: kombi trip times (23 values)
  const km = [28, 31, 33, 34, 36, 37, 38, 40, 41, 41, 43, 44, 45, 46, 48, 49, 50, 52, 53, 55, 57, 61, 79];
  chk(km.length, 23);
  const qk = quartiles(km);
  same([qk.q1, qk.q2, qk.q3, qk.iqr], [37, 44, 52, 15]);
  const fk = qk.q3 + 1.5 * qk.iqr;
  chk(fk, 74.5);
  const kmTable = slTable(stemLeaf(km));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    stem: t`The stem-and-leaf diagram shows the times, in minutes, of 23 kombi journeys between Harare city centre and Chitungwiza. Key: $4 \mid 3$ means 43 minutes.

${kmTable}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Find the median and the quartiles, taking the quartiles as the 6th and 18th values.",
        template: "Q1 = {{blank:a}}, median = {{blank:m}}, Q3 = {{blank:b}}",
        blanks: [N("a", qk.q1, "36"), N("m", qk.q2, "45"), N("b", qk.q3, "50")],
        explanation: t`$n = 23$: the median is the 12th value, 44; $Q_1$ is the 6th value, 37; $Q_3$ is the 18th value, 52.` }),
      P.num({ label: "(b)", marks: 2, stem: t`An outlier is a value more than $1.5 \times \text{IQR}$ above $Q_3$ or below $Q_1$. Find the upper boundary for outliers, in minutes.`, value: fk, dp: 1, wrong: [67, 22.5],
        explanation: t`$\text{IQR} = 52 - 37 = 15$; upper boundary $52 + 1.5 \times 15 = 74.5$ minutes. (22.5 is $1.5 \times \text{IQR}$ alone.)` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which journey times are outliers?",
        options: [["79 minutes only", "Correct: 79 > 74.5; the lower boundary is 37 − 22.5 = 14.5, below every time."], ["61 and 79 minutes", "61 is below the upper boundary of 74.5."], ["28 and 79 minutes", "28 is above the lower boundary of 14.5."], ["none of the times", "79 is greater than 74.5."]],
        answer: "A", explanation: "Compare each extreme value with the boundaries 14.5 and 74.5." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe fully the box-and-whisker plot you would draw for these data on a scale from 20 to 80 minutes.",
        points: ["Box from 37 to 52 with the median line at 44.", "Lower whisker from 37 to 28.", "Upper whisker from 52 to 61 (the largest value that is not an outlier), and 79 marked separately as an outlier."],
        modelAnswer: "A box from 37 to 52 minutes with a vertical line at 44; a whisker from 37 down to 28; a whisker from 52 up to 61; a cross at 79 for the outlier." }),
      P.manual({ label: "(e)", marks: 3, stem: "Journeys on a second route have median 39 minutes, IQR 9 minutes and no outliers. Compare the two routes in context, and state one advantage of the stem-and-leaf diagram over a box plot for the Chitungwiza data.",
        points: ["The second route is quicker on average (median 39 against 44 minutes).", "The second route's times are more consistent (IQR 9 against 15 minutes).", "The stem-and-leaf diagram keeps every individual journey time (or shows the shape in more detail)."],
        modelAnswer: "Journeys on the second route are typically shorter (median 39 min against 44 min) and less variable (IQR 9 min against 15 min). The stem-and-leaf diagram shows all 23 actual times, which a box plot does not." }),
    ],
    explanation: "Count to the median and quartiles, find the IQR, test the extremes against the outlier boundaries, and compare using location and spread.",
    hints: ["With 23 values the median is the 12th.", "Upper boundary = Q3 + 1.5 × IQR."],
  });

  // Struct 5 (ZS): pie chart + data type
  chk((60 / 360) * 90, 15); chk((30 / 72) * 360, 150);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false, applies: ZS,
    stem: "In a survey of how 72 learners at a school in Bulawayo travel to school, 30 walk, 24 use a kombi, 8 cycle and 10 come by car.",
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Find the pie-chart sector angles for walking and for cycling.", template: "walk {{blank:w}}°, cycle {{blank:c}}°",
        blanks: [N("w", 150, "30"), N("c", 40, "8")],
        explanation: t`Walk: $\frac{30}{72} \times 360^\circ = 150^\circ$. Cycle: $\frac{8}{72} \times 360^\circ = 40^\circ$.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "What type of data is the method of travel?",
        options: [["qualitative", "Correct: the methods are categories, not numbers."], ["quantitative and discrete", "The data are not numbers; counts of each category are, but the variable itself is a category."], ["quantitative and continuous", "Nothing is measured on a continuous scale."], ["secondary", "The survey is carried out by the investigator, so the data are primary; and 'secondary' is a source, not a type of variable."]],
        answer: "A", explanation: "Method of travel is a category: qualitative (categorical) data." }),
      P.num({ label: "(c)", marks: 1, stem: t`A pie chart for a second school shows a $60^\circ$ sector for car travel and represents 90 learners. How many learners at the second school come by car?`, value: 15, wrong: [60, 10],
        explanation: t`$\frac{60}{360} \times 90 = 15$ learners.` }),
      P.manual({ label: "(d)", marks: 1, stem: "Give one disadvantage of using the two pie charts to compare how many learners at each school come by car.",
        points: ["The schools have different totals (72 and 90), so equal angles do not mean equal numbers; pie charts show proportions, not frequencies."],
        modelAnswer: "Pie charts show proportions of each total, and the totals differ (72 against 90), so the sector sizes cannot be used to compare actual numbers." }),
    ],
    explanation: "Sector angle = frequency ÷ total × 360°.",
    hints: ["Each learner is worth 360 ÷ 72 = 5 degrees."],
  });

  b.card("DEFINITION", "Discrete and continuous data", "Discrete: counted, only particular values (number of goats). Continuous: measured, any value in a range (mass, time).", undefined, { applies: ZS });
  b.card("DEFINITION", "Primary and secondary data", "Primary: collected by the investigator for the purpose. Secondary: collected by someone else (records, reports).", undefined, { applies: ZS });
  b.card("CONCEPT", "Stem-and-leaf diagram", "Splits each value into a stem and a leaf; leaves in order; keeps every raw value; always needs a key.");
  b.card("CONCEPT", "Back-to-back stem-and-leaf", t`Two data sets share one stem; left leaves increase away from the stem (read right to left). Key explains both sides, e.g. $3 \mid 13 \mid 5$.`);
  b.card("FACT", "Five-number summary", t`Minimum, $Q_1$, median, $Q_3$, maximum — the five values a box plot shows.`);
  b.card("FORMULA", "Outlier rule (1.5 × IQR)", t`Outlier if below $Q_1 - 1.5(Q_3 - Q_1)$ or above $Q_3 + 1.5(Q_3 - Q_1)$. Whiskers stop at the most extreme non-outliers.`);
  b.card("CONCEPT", "Skew from a box plot", t`Positive skew: median nearer $Q_1$, longer upper whisker. Negative skew: median nearer $Q_3$, longer lower whisker.`);
  b.card("FORMULA", "Pie-chart sector angle", t`$\dfrac{\text{frequency}}{\text{total}} \times 360^\circ$`, undefined, { applies: ZS });
  b.card("CONCEPT", "Comparing two data sets", "Quote one measure of location (median) and one of spread (IQR), with values, and interpret each in context.");
});
