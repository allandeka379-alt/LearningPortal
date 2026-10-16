// W3a: research.data-analysis (statistics items are ZIMSEC detail: applies ZIM)
import { concept, P, ZIM, table, stats, r2, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

const X = [12, 15, 15, 18, 20, 22, 25, 15, 16, 24];
const mean = stats.mean(X), med = stats.median(X), mod = stats.mode(X), rng = stats.range(X), sd = stats.stdDev(X);
chk(mean, 18.2, 1e-9);
chk(med, 17, 1e-9);
chk(mod[0], 15, 1e-9);
chk(rng, 13, 1e-9);
const Y = [81, 83, 85, 87, 89];
const Z = [34, 29, 37, 31, 42, 28, 33, 36];
chk(stats.median(Z), 33.5, 1e-9);
const sdY = stats.stdDev(Y);
chk(sdY, Math.sqrt(8), 1e-9);

concept("abus.research.data-analysis", { file: "research/data-analysis", keyPrefix: "research.data-analysis" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following describes the **mode** of a set of data?",
    ok: ["The value that occurs most often in the data", "Correct: it is the most frequent value."],
    bad: [["The middle value when the data is in order", "That is the median."], ["The total divided by the number of values", "That is the mean."], ["The difference between highest and lowest values", "That is the range."]],
    explanation: "The mode is the most frequent value.",
    applies: ZIM,
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which chart is MOST suitable for showing how a total is divided between different shares?",
    ok: ["A pie chart showing each share", "Correct: each slice shows a share of the whole."],
    bad: [["A line graph over a number of years", "A line graph shows change over time."], ["A scatter of individual employee wages", "That does not show shares of a total."], ["A table with no totals or labels", "A table without totals does not show shares."]],
    explanation: "A pie chart shows how a whole is divided into parts.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A survey of 20 customers, all chosen from a firm's own loyalty club, says 90% like the firm's service. Why should the firm be cautious?",
    ok: ["The sample is small and made up only of loyal customers", "Correct: it may not represent the whole market."],
    bad: [["The percentage is too high to be a true figure", "A high percentage can be true; the sample is the problem."], ["Surveys of customers can never be used to judge service", "Surveys can be useful when properly done."], ["Loyal customers always give lower scores than others", "They are likely to give higher scores."]],
    explanation: "A small, unrepresentative sample makes the result unreliable.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can the **median** be a better measure of a typical value than the mean when there is one extremely large value?",
    ok: ["The median is not pulled up by the extreme value", "Correct: the mean is affected by every value."],
    bad: [["The median includes the extreme value twice over", "The median does not count values twice."], ["The mean cannot be found when there is a large value", "The mean can always be found."], ["The median is always larger than the mean in any data set", "This is not true in general."]],
    explanation: "An extreme value pulls the mean towards it; the median depends only on the middle position.",
    applies: ZIM,
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional florist in Harare has the following numbers of bouquets sold in 5 days: 12, 15, 15, 18, 20. What is the mean number sold?",
    ok: ["16", "Correct: (12 + 15 + 15 + 18 + 20) ÷ 5 = 80 ÷ 5 = 16."],
    bad: [["15", "This is the median and the mode, not the mean."], ["80", "This is the total, before dividing by 5."], ["8", "This is the range of the data."]],
    hints: ["Add the values, then divide by the number of values."],
    explanation: "Total = 80; mean = 80 ÷ 5 = 16.",
    applies: ZIM,
  });
  chk((12 + 15 + 15 + 18 + 20) / 5, 16, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "In a pie chart of a fictional firm's sales, one product has 25% of sales. What is the angle of its slice?",
    ok: ["90°", "Correct: 25% of 360° = 90°."],
    bad: [["25°", "This uses the percentage as the angle."], ["45°", "This is 12.5% of 360°."], ["180°", "This is 50% of 360°."]],
    hints: ["Share × 360."],
    explanation: "Angle = 25 ÷ 100 × 360 = 90°.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A bar chart shows sales of a fictional product as US\\$102,000, US\\$104,000 and US\\$106,000 in three years, but the vertical axis starts at US\\$100,000. What is the problem with the chart?",
    ok: ["The growth looks much bigger than it really is in fact", "Correct: a truncated axis exaggerates small differences."],
    bad: [["The chart hides the growth that really took place", "The growth is exaggerated, not hidden."], ["The sales are shown with no years on the horizontal axis", "The years are shown."], ["The bars must be turned into a pie chart to be correct", "A pie chart is not suitable for change over time."]],
    hints: ["Where does the axis start?"],
    explanation: "A bar chart whose axis does not start at zero makes small changes look large.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A market research report concludes that 70% of 50 people asked would buy a new snack. Which judgement is BEST?",
    ok: ["Encouraging, but the small sample and stated intentions limit its reliability", "Correct: it recognises both the evidence and its limits."],
    bad: [["Conclusive, because 70% is a clear majority of those asked", "A small sample cannot be conclusive."], ["Worthless, because people never tell the truth in a survey", "Surveys have value if limits are recognised."], ["Reliable, because every person who says yes will certainly buy", "Intentions are not purchases."]],
    hints: ["Think about sample size and the difference between saying and doing."],
    explanation: "A small sample and intentions rather than actual purchases limit reliability.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The range is the highest value minus the lowest value.",
    answer: true,
    explanation: "True. The range is a simple measure of spread.",
    applies: ZIM,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each measure to what it shows.",
    pairs: [["Mean", "The total divided by the number of values"], ["Median", "The middle value when ordered"], ["Mode", "The most frequent value"], ["Range", "The highest value minus the lowest value"]],
    explanation: "Mean, median and mode are averages; the range is a measure of spread.",
    applies: ZIM,
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "To judge how far research findings can be trusted, a manager checks the {{blank:a}} of the data and the {{blank:b}} of the sample.",
    blanks: [
      { id: "a", accepted: ["source"], choices: ["source", "colour", "length"] },
      { id: "b", accepted: ["size"], choices: ["size", "weight", "price"] },
    ],
    explanation: "The source (and its bias) and the size and selection of the sample affect reliability.",
  });

  const data = X;
  const tx = table(["Day", "Bouquets sold"], data.map((v, i) => [`Day ${i + 1}`, v]));
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: mean, dp: 1, unit: "bouquets", calculator: true, daily: true, wrong: [med, rng],
    stem: "A fictional florist records bouquets sold over ten days.\n\n" + tx + "\n\nCalculate the mean number sold a day, to one decimal place.",
    hints: ["Add all ten values, then divide by 10."],
    explanation: "Total = 182. Mean = 182 ÷ 10 = 18.2 bouquets. The median is 17.",
    applies: ZIM,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: stats.median(Z), unit: "pairs", calculator: true, wrong: [stats.mean(Z), 34],
    stem: "A fictional shoe seller in Gweru sold 34, 29, 37, 31, 42, 28, 33 and 36 pairs of shoes on eight days. Calculate the median number of pairs sold a day.",
    hints: ["Put the values in order and find the middle."],
    explanation: "In order: 28, 29, 31, 33, 34, 36, 37, 42. The middle two values are 33 and 34, so the median is (33 + 34) ÷ 2 = 33.5. The mean (33.75) is a different measure.",
    applies: ZIM,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: sdY, dp: 2, unit: "units", calculator: true, wrong: [8, 2],
    stem: "A fictional shop sells 81, 83, 85, 87 and 89 loaves on five days. Calculate the standard deviation, to two decimal places (divide by n, the number of days).",
    hints: ["Mean first, then the squared differences."],
    explanation: "Mean = 85. Differences: −4, −2, 0, 2, 4; squares: 16, 4, 0, 4, 16 (total 40). Variance = 40 ÷ 5 = 8. Standard deviation = √8 = 2.83. Forgetting the square root gives 8.00.",
    workedSolution: "1. Mean = 425 ÷ 5 = 85.\n2. Squared differences: 16, 4, 0, 4, 16; total = 40.\n3. Variance = 40 ÷ 5 = 8.\n4. Standard deviation = √8 = 2.83.",
    applies: ZIM,
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: (45 / 180) * 360, unit: "degrees", calculator: true, wrong: [45, 25],
    stem: "In a survey of 180 customers, 45 say they prefer online shopping. What angle represents this group in a pie chart? Give the answer in degrees.",
    hints: ["Share of the total × 360."],
    explanation: "45 ÷ 180 × 360 = 90°. The percentage (25%) is not the angle.",
    applies: ZIM,
  });
  chk((45 / 180) * 360, 90, 1e-9);

  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "State **one** factor that affects the reliability of survey data.",
    accepted: ["sample size", "size of the sample", "bias", "source", "date", "sample", "method", "response rate", "wording of questions"],
    keywords: { any: ["sample", "bias", "source", "date", "method", "response", "wording", "question"], minAny: 1 },
    explanation: "Accept: sample size or selection, source, bias, date, method, response rate or question wording.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** reason why a firm should check the reliability of research data before using it.",
    points: ["Unreliable data may be biased or out of date", "Decisions based on it may be wrong", "This could waste money or lose sales"],
    modelAnswer: "Unreliable data may be biased or out of date. Decisions based on it may be wrong, which could waste money on the wrong product or price and lose sales.",
    hints: ["Think about what happens if the data is wrong."],
    explanation: "A reason developed to a consequence.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional hardware shop in Mutare finds that its mean daily sales are US\\$1,200 but its median daily sales are US\\$950. Explain **two** things this tells the owner.",
    points: ["The mean is above the median", "Application: a few very busy days are pulling up the mean", "The median is a better guide to a typical day", "Application: the owner should plan staff for about US\\$950 of sales on a normal day"],
    modelAnswer: "The mean is above the median, which suggests that a few very busy days are pulling the average up. The median is therefore a better guide to a typical day, so the owner should plan staff and stock for about US\\$950 of sales on a normal day.",
    hints: ["Compare the mean and the median."],
    explanation: "A skew caused by high values.",
    applies: ZIM,
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a small standard deviation in daily customer numbers helps a fictional restaurant plan its staffing.",
    points: ["A small standard deviation means customer numbers are close to the mean", "Demand is predictable", "The restaurant can staff to the average number with little risk", "So wasted wages and long queues are both less likely"],
    modelAnswer: "A small standard deviation means customer numbers stay close to the mean, so demand is predictable. The restaurant can staff for the average with little risk, so it is less likely to waste wages or have long queues.",
    hints: ["What does a small spread tell the manager?"],
    explanation: "A chain from low spread to predictable demand.",
    applies: ZIM,
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional clothing shop in Harare receives a research report saying that 60% of 400 survey respondents would buy a new range of school wear. Evaluate how far the shop should rely on this finding when deciding to order 5,000 garments.",
    points: ["The sample of 400 is reasonably large", "60% is a clear majority of those who answered", "The sample may not represent all parents, or the response rate may be low", "Stating that they would buy is not buying; actual purchases are usually lower", "The order is large and risky if the figure is overstated", "Judgement with reason, e.g. place a smaller first order and review sales"],
    modelAnswer: "The sample of 400 is reasonably large and 60% is a clear majority, which is encouraging. However, the sample may not represent all parents, the response rate may be low and saying they would buy is not the same as buying; actual purchases are usually lower. An order of 5,000 garments is large and risky if the figure is overstated. The shop should place a smaller first order and review sales before ordering more.",
    hints: ["Weigh the strength of the evidence and the size of the risk."],
    explanation: "A judgement about reliability and risk.",
  });

  const resp = [["Chocolate", 84], ["Strawberry", 63], ["Vanilla", 42], ["Other", 21]];
  const tot = resp.reduce((s, r) => s + r[1], 0);
  chk(tot, 210, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional ice-cream seller in Mutare asked customers for their favourite flavour.\n\n" + table(["Flavour", "Number of customers"], [...resp, ["**Total**", tot]]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: (63 / 210) * 100, stem: "Calculate the percentage who prefer strawberry, to one decimal place.", wrong: [r2((63 / 84) * 100), 63], explanation: "63 ÷ 210 × 100 = 30.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "plain", value: (42 / 210) * 360, unit: "degrees", stem: "Calculate the angle of the vanilla slice in a pie chart.", wrong: [20, 42], explanation: "42 ÷ 210 × 360 = 72°." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** way in which the seller could use these results, and **one** limitation of the data.", points: ["Stock more chocolate and strawberry, which are 70% of preferences", "Limitation: customers were asked at one place or time, so the sample may not represent all customers", "Stated preference may differ from what people actually buy"], modelAnswer: "The seller could stock more chocolate and strawberry, which together are 70% of preferences. A limitation is that customers were asked at one place and time, so the sample may not represent all customers, and what people say may differ from what they buy.", explanation: "A use and a limitation." }),
    ],
    hints: ["Number ÷ total, then multiply by 100 or 360."],
    explanation: "Strawberry 30.0%; vanilla slice 72°.",
  });
  chk((63 / 210) * 100, 30, 1e-9);
  chk((42 / 210) * 360, 72, 1e-9);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Tendai Tutors is a fictional business in Bulawayo that offers evening lessons. It surveyed 60 students at one school about a new Saturday class. Forty said they would attend. The tutor also used a government report showing that the number of secondary students in the city has grown by 3% a year for five years. She plans to hire a teacher and rent a hall for a year.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** weakness in the way the survey data was collected.", points: ["Only 60 students at one school were asked", "They may not represent students across the city", "So the result may be biased"], modelAnswer: "Only 60 students at one school were asked. They may not represent students across the city, so the result may be biased.", explanation: "Sample size and selection." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess how far the research supports the decision to hire a teacher and rent a hall.", points: ["Two thirds said they would attend, which is encouraging", "The report supports a growing number of students", "The survey sample is small and from one school", "Intentions may not turn into attendance", "The commitment (teacher and hall for a year) is costly and hard to reverse", "Judgement with reason, e.g. run a trial Saturday class first"], modelAnswer: "Two thirds said they would attend and the government report shows a growing number of students, which supports the plan. However, the survey is small and from one school, and intentions may not become attendance, while a teacher and a hall for a year is a costly commitment. A trial Saturday class would give evidence before the full commitment.", explanation: "The evidence is encouraging but limited; a trial reduces risk." }),
    ],
    hints: ["Weigh the evidence against the size of the commitment."],
    explanation: "The research is encouraging but limited; a trial is wiser.",
  });

  b.card("DEFINITION", "Reliability of data", "How far research findings can be trusted, judged by source, sample, method, date and response rate.");
  b.card("FORMULA", "Mean", "Sum of the values ÷ number of values.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Median and mode", "Median: the middle value when ordered. Mode: the most frequent value.", undefined, { applies: ZIM });
  b.card("FORMULA", "Range", "Highest value − lowest value.", undefined, { applies: ZIM });
  b.card("FORMULA", "Standard deviation", "√(sum of (x − mean)² ÷ n): the spread of values around the mean.", undefined, { applies: ZIM });
  b.card("FORMULA", "Pie chart angle", "Share of the total × 360°.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Qualitative data analysis", "Group comments into common themes, count how often each appears and summarise.");
  b.card("CONCEPT", "Misleading charts", "A truncated axis or unequal scales exaggerate differences; always check axes and units.");
  b.card("CONCEPT", "Using research results", "Write a report with method, findings, conclusions and limits; combine with costs and managers' judgement.");
});
