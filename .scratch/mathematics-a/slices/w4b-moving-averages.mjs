// W4b: amaths.timeseries.moving-averages (ZIMSEC only: Statistics F5, time series)
import { concept, P, t, chk, movingAverages, mean, table } from "../lib.mjs";
import { f3, NB, NBd } from "../tables/w4b-kit.mjs";

concept("amaths.timeseries.moving-averages", { file: "timeseries/moving-averages", keyPrefix: "timeseries.moving-averages" }, (b) => {
  // q01 seasonal variation
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In a time series, what is meant by seasonal variation?",
    options: [
      ["A pattern that repeats over a fixed period, such as each year", "Correct: for example uniform sales peaking every January."],
      ["The long-term upward or downward movement of the series", "That is the trend."],
      ["Unpredictable changes caused by one-off events such as floods", "That is irregular (random) variation."],
      ["Long waves lasting several years, linked to the economy", "That is cyclical variation."],
    ],
    answer: "A",
    explanation: "Seasonal variation repeats with a fixed, known period (a year, a week, a day).",
  });

  // q02 tf
  b.tf({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "For quarterly data with a yearly seasonal pattern, a four-point moving average smooths out the seasonal variation.",
    answer: true,
    explanation: "Each four-point average contains exactly one value from each quarter, so the seasonal highs and lows cancel and the trend remains.",
  });

  // q03 a 3-point average
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "Find the three-point moving average of the consecutive values 12, 18 and 15.",
    value: 15, wrong: [45, 22.5],
    explanation: t`$\frac{12 + 18 + 15}{3} = \frac{45}{3} = 15$, plotted at the middle (second) period. ($45$ is the moving total.)`,
  });

  // q04 order for monthly data
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Monthly rainfall at Kariba is recorded over several years. Which order of moving average best removes the seasonal pattern?",
    options: [
      ["12", "Correct: the cycle repeats every 12 months, so a 12-point average includes each month exactly once."],
      ["4", "Four points suit quarterly data, not monthly."],
      ["3", "Three months is only a quarter of the annual cycle."],
      ["7", "Seven points suit daily data with a weekly pattern."],
    ],
    answer: "A",
    explanation: "Choose the order equal to the length of the seasonal cycle: 12 for monthly data with a yearly pattern.",
  });

  // q05 match components
  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each feature of a Harare supermarket's monthly sales with the time-series component it shows.",
    pairs: [
      ["Sales rise steadily over ten years as the suburb grows", "Trend"],
      ["Sales jump every December", "Seasonal variation"],
      ["Sales fall for a few years during a recession, then recover", "Cyclical variation"],
      ["Sales drop one week when the store floods", "Irregular variation"],
    ],
    explanation: "Trend = long-term direction; seasonal = repeats every year; cyclical = multi-year waves; irregular = one-off events.",
  });

  // q06 centred average
  chk((48.5 + 50) / 2, 49.25, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "Two consecutive four-point moving averages of a quarterly series are 48.5 and 50. Find the centred moving average obtained from them.",
    value: 49.25, dp: 2, wrong: [98.5, 50],
    explanation: t`Centred average $= \frac{48.5 + 50}{2} = 49.25$. It lines up with an actual quarter (the third of the five quarters involved).`,
  });

  // q07 several 3-point averages
  const d7 = [26, 20, 14, 29, 23, 17];
  const m7 = movingAverages(d7, 3);
  chk(m7[3], 23, 1e-12);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`A borehole committee in Masvingo records water sales (thousands of litres) for terms 1, 2, 3 of two years: ${d7.join(", ")}. Calculate the three-point moving averages.`,
    template: "{{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}",
    blanks: m7.map((v, i) => NB("abcd"[i], v, v * 3)),
    explanation: t`Moving totals $60, 63, 66, 69$; dividing by 3: $${m7.join(", ")}$. They rise by 1 each term: an upward trend.`,
    hints: ["Add three consecutive values, then move along one."],
  });

  // q08 a centred 4-point average from five values
  const m8 = movingAverages([40, 53, 46, 35, 44], 4);
  chk(m8[0], 44, 1e-12);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Five consecutive quarterly values are 40, 53, 46, 35, 44. Calculate the centred four-point moving average, and state which of the five quarters it belongs to (type only the average).",
    value: 44, wrong: [43.5, 44.5],
    explanation: t`Four-point averages: $\frac{174}{4} = 43.5$ and $\frac{178}{4} = 44.5$. Centred: $\frac{43.5 + 44.5}{2} = 44$, belonging to the third quarter (the one with value 46).`,
    workedSolution: t`1. $\frac{40 + 53 + 46 + 35}{4} = 43.5$ (between quarters 2 and 3).
2. $\frac{53 + 46 + 35 + 44}{4} = 44.5$ (between quarters 3 and 4).
3. Centred: $\frac{43.5 + 44.5}{2} = 44$, at quarter 3.`,
    hints: ["Find two four-point averages, then average them."],
  });

  // q09 where to plot
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The first three-point moving average of a termly series uses terms 1, 2 and 3. At which term should it be plotted?",
    options: [
      ["Term 2", "Correct: a moving average is plotted at the middle of the periods it covers."],
      ["Term 1", "The average describes all three terms, so it belongs to the middle one."],
      ["Term 3", "Plotting at the end shifts the trend line one term to the right."],
      ["Between terms 2 and 3", "Only even-order averages fall between periods; three terms have a middle term."],
    ],
    answer: "A",
    explanation: "Plot each moving average at the centre of its group: term 2 for terms 1 to 3.",
  });

  // q10 tf position of an uncentred 4-point average
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The four-point moving average of quarters 1 to 4 should be plotted at quarter 2.",
    answer: false,
    explanation: "The middle of quarters 1 to 4 is halfway between quarters 2 and 3 (at 2.5). That is why four-point averages are centred before use.",
  });

  // q11 seasonal deviation
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "In a quarterly series, the actual value for a quarter is 64 and the centred moving average (trend value) for that quarter is 58.5. Find the seasonal deviation.",
    value: 5.5, dp: 1, wrong: [-5.5, 122.5],
    explanation: t`Seasonal deviation = actual − trend $= 64 - 58.5 = 5.5$: this quarter is $5.5$ above the trend.`,
  });

  // q12 forecast
  const tr12 = 30 + 1.2 * 13;
  chk(tr12, 45.6, 1e-9);
  b.num({
    d: 4, skill: "ANALYSIS", calculator: false,
    stem: t`The trend line for a quarterly series is $T = 30 + 1.2t$, where $t$ is the quarter number ($t = 1$ for the first quarter of year 1). The average seasonal deviation for the first quarter of each year is $-6.4$. Estimate the value for the first quarter of year 4.`,
    value: tr12 - 6.4, wrong: [f3(tr12 + 6.4), f3(30 + 1.2 * 12 - 6.4)],
    explanation: t`The first quarter of year 4 is $t = 13$. Trend $= 30 + 1.2 \times 13 = 45.6$; estimate $= 45.6 - 6.4 = 39.2$. (Adding $6.4$ ignores the sign; $t = 12$ is the last quarter of year 3.)`,
    hints: ["Which value of t is quarter 1 of year 4?", "Add the (negative) seasonal deviation to the trend."],
  });

  // q13 purpose of moving averages
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Explain the purpose of calculating moving averages for a time series.",
    points: ["They smooth out seasonal (and irregular) variation, because each average covers one complete cycle.", "This reveals the underlying trend, which can then be described or used for estimates."],
    modelAnswer: "Moving averages over one full seasonal cycle cancel out the seasonal highs and lows and reduce random fluctuations, so the long-term trend can be seen and a trend line drawn.",
    explanation: "Smoothing → trend.",
  });

  // q14 identify component
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "A kombi operator's weekly takings fall sharply in one particular week because of a fuel shortage, then return to normal. Which component of the time series does this show?",
    options: [
      ["Irregular variation", "Correct: a one-off, unpredictable event."],
      ["Seasonal variation", "Seasonal effects repeat at the same time each cycle; a fuel shortage does not."],
      ["Trend", "The trend is the long-term direction, not a single-week drop."],
      ["Long-term cyclical variation", "Cyclical variation is a long wave over several years."],
    ],
    answer: "A",
    explanation: "Unpredictable one-off events are irregular (random) variation.",
    hints: ["Does it repeat?"],
  });

  // q15 trend line from two averages
  const g15 = (70.5 - 61.25) / 7, tr15 = 61.25 + g15 * 11;
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "The centred four-point moving averages of a quarterly series run from 61.25 at quarter 3 to 70.5 at quarter 10. A trend line is drawn through these two points. Find its gradient (per quarter) and the trend value at quarter 14, each correct to 3 significant figures.",
    template: "gradient = {{blank:g}} per quarter, trend at quarter 14 = {{blank:t}}",
    blanks: [NB("g", g15, f3(9.25 / 10)), NB("t", tr15, f3(61.25 + g15 * 14))],
    explanation: t`Gradient $= \frac{70.5 - 61.25}{10 - 3} = \frac{9.25}{7} = ${f3(g15)}$. Trend at quarter 14 $= 61.25 + ${f3(g15)} \times (14 - 3) = ${f3(tr15)}$. (Dividing by 10 uses the quarter number, not the gap of 7 quarters.)`,
    hints: ["The quarters are 7 apart.", "Count 11 quarters on from quarter 3."],
  });

  // q16 describe the trend
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "The three-point moving averages of a school tuckshop's termly profits (in US dollars) are 122, 126, 129, 132, 135, 139, 142. Describe the trend.",
    points: ["The trend is upwards (profits are rising steadily).", "At roughly 3.3 US dollars per term: (142 − 122)/6 ≈ 3.3."],
    modelAnswer: "The moving averages rise steadily from 122 to 142 over six terms, so the underlying profit is increasing at about 3.30 US dollars per term.",
    explanation: "Direction plus approximate rate, with units.",
    hints: ["How much do the averages rise over how many terms?"],
  });

  // q17 struct 5: 3-point moving averages
  const d17 = [150, 120, 96, 162, 129, 105, 171, 141, 114];
  const m17 = movingAverages(d17, 3);
  const g17 = (m17[6] - m17[0]) / 6;
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: t`Termly enrolments for a holiday maths club in Chitungwiza over three years (terms 1, 2, 3 each year) are: ${d17.join(", ")}.`,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "Calculate the first two and the last three-point moving averages.", template: "first: {{blank:a}}, second: {{blank:b}}, last: {{blank:c}}",
        blanks: [NB("a", m17[0], 366), NB("b", m17[1], 378), NB("c", m17[6], 426)],
        explanation: t`All seven: $${m17.join(", ")}$ (moving totals divided by 3).` }),
      P.num({ label: "(b)", marks: 1, stem: "State the term at which the last moving average is plotted (terms numbered 1 to 9).", value: 8, wrong: [9],
        explanation: "It covers terms 7, 8, 9, so it is plotted at term 8." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the trend in enrolments.",
        points: ["Upward trend: the averages rise from 122 to 142.", t`About $${f3(g17)}$ more learners per term on average.`],
        modelAnswer: t`Enrolment is rising steadily: the trend increases from 122 to 142 over 6 terms, about ${f3(g17)} learners per term, beneath a seasonal pattern that is highest in term 1 and lowest in term 3.`,
        explanation: "Direction + rate + seasonal note." }),
    ],
    explanation: "The cycle has 3 terms, so use three-point averages.",
    hints: ["Moving total of three terms ÷ 3."],
  });

  // q18 struct 13: quarterly, centred averages, seasonal deviation, forecast
  const d18 = [19, 27, 36, 23, 21, 30, 39, 25, 24, 32, 42, 28];
  const c18 = movingAverages(d18, 4);
  const g18 = (c18[7] - c18[0]) / 7;
  const devQ3 = mean([d18[2] - c18[0], d18[6] - c18[4]]);
  const tr18 = c18[0] + g18 * 12, fc18 = tr18 + devQ3;
  chk(devQ3, 9.6875, 1e-12);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`The numbers of visitors (thousands) to a Victoria Falls rainforest walk in quarters 1 to 4 of three years were:

${table(["Year", "Q1", "Q2", "Q3", "Q4"], [[1, ...d18.slice(0, 4)], [2, ...d18.slice(4, 8)], [3, ...d18.slice(8, 12)]])}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why a four-point moving average is suitable, and why it must be centred.",
        points: ["The seasonal pattern repeats every 4 quarters, so each four-point average contains one of each quarter and removes the seasonal effect.", "A four-point average falls between two quarters, so consecutive averages are averaged (centred) to line up with an actual quarter."],
        modelAnswer: "Visitor numbers follow a yearly cycle of four quarters, so a four-point average removes the seasonal effect. But its centre lies between two quarters, so we average pairs of them to get values at actual quarters.",
        explanation: "Order = cycle length; even order → centre." }),
      P.fib({ label: "(b)", marks: 4, stem: "Calculate the first two and the last centred four-point moving averages, correct to 3 decimal places where necessary.", template: "first: {{blank:a}}, second: {{blank:b}}, last: {{blank:c}}",
        blanks: [NBd("a", c18[0], 3, 26, 1), NBd("b", c18[1], 3, 27.25, 1), NBd("c", c18[7], 3, 31.25, 2)],
        explanation: t`Four-point averages: $26.25, 26.75, 27.5, 28.25, 28.75, 29.5, 30, 30.75, 31.5$ (between quarters). Centred (mean of consecutive pairs): $${c18.join(", ")}$ for quarters 3 to 10.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the average seasonal deviation for quarter 3 (actual minus centred average), correct to 3 significant figures.", value: devQ3, wrong: [f3(d18[2] - c18[0])],
        explanation: t`Quarter 3 of year 1: $36 - ${c18[0]} = ${d18[2] - c18[0]}$; quarter 3 of year 2 (quarter 7): $39 - ${c18[4]} = ${d18[6] - c18[4]}$. Mean $= ${devQ3}$, so about $${f3(devQ3)}$.` }),
      P.num({ label: "(d)", marks: 3, stem: "A trend line is drawn through the first and last centred averages. Use it, with your answer to (c), to estimate the number of visitors (thousands) in quarter 3 of year 4, correct to 3 significant figures.", value: fc18, wrong: [f3(tr18)],
        explanation: t`Gradient $= \frac{${c18[7]} - ${c18[0]}}{10 - 3} = ${f3(g18)}$ per quarter. Quarter 3 of year 4 is quarter 15: trend $= ${c18[0]} + ${f3(g18)} \times 12 = ${f3(tr18)}$. Estimate $= ${f3(tr18)} + ${f3(devQ3)} = ${f3(fc18)}$ thousand.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Give two reasons why this estimate may be unreliable.",
        points: ["It extrapolates the trend beyond the data; the trend may not stay linear.", "The seasonal deviation is based on only two values, and irregular events (such as a drought lowering the falls, or a fall in tourism) cannot be predicted."],
        modelAnswer: "It assumes the straight-line trend continues past the data (extrapolation), and the seasonal effect comes from only two years; irregular events such as low water levels or travel restrictions could change visitor numbers.",
        explanation: "Extrapolation and limited data." }),
    ],
    explanation: "Centred four-point averages → seasonal deviations → trend line → forecast = trend + seasonal deviation.",
    hints: ["Centred averages belong to quarters 3 to 10.", "Quarter 3 of year 4 is quarter 15."],
  });

  // ---------------------------------------------------------------- cards
  b.card("DEFINITION", "Time series", "Observations of a variable recorded at successive (usually equal) intervals of time.");
  b.card("CONCEPT", "Components of a time series", "Trend (long-term direction), seasonal (repeats each year), cyclical (multi-year waves), irregular (one-off, unpredictable).");
  b.card("DEFINITION", "Moving average of order n", "The mean of n consecutive values, recalculated as the window moves on one period; plotted at the middle of its periods.");
  b.card("CONCEPT", "Choosing the order", "Use the length of the seasonal cycle: 3 for termly, 4 for quarterly, 12 for monthly, 7 for daily data.");
  b.card("CONCEPT", "Centring", "An even-order moving average falls between two periods; average consecutive pairs to line it up with a real period.");
  b.card("FORMULA", "Seasonal deviation", "Seasonal deviation = actual value − trend value (moving average); average over years for each season.");
  b.card("FORMULA", "Simple forecast", "Estimate = trend value (from the trend line) + average seasonal deviation for that season.");
  b.card("FACT", "Purpose of smoothing", "Moving averages remove seasonal and irregular variation so that the trend can be seen and described.");
});
