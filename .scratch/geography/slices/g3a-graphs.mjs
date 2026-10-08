// Slice G3a: skills.graphs (choosing, constructing and interpreting graphs; describing trends).
// Computed: 72/240 x 360 = 108; 12/31 x 100 = 38.7; 50/25/15/10 % x 3.6 = 180/90/54/36; 15 x 3.6 = 54; range 118 - 25 = 93.
import { concept, P, geographyLevels } from "../lib.mjs";

const PEDESTRIANS = [
  "Table 1 shows pedestrian counts (people passing in 10 minutes) at eight sites along a road leading out of a town centre (Form 4 fieldwork, fictional data).",
  "",
  "| Distance from centre (m) | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 |",
  "|---|---|---|---|---|---|---|---|---|",
  "| Pedestrians | 118 | 96 | 81 | 30 | 55 | 44 | 32 | 25 |",
].join("\n");

const WIND = [
  "Table 2 shows the number of days in January on which the wind blew from each direction at a fictional school weather station.",
  "",
  "| Direction | N | NE | E | SE | S | SW | W | NW |",
  "|---|---|---|---|---|---|---|---|---|",
  "| Days | 3 | 5 | 12 | 6 | 2 | 1 | 1 | 1 |",
].join("\n");

const TOURISTS = [
  "Table 3 shows visitor arrivals at a fictional national park (thousands).",
  "",
  "| Year | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 |",
  "|---|---|---|---|---|---|---|---|---|",
  "| Visitors (thousands) | 40 | 44 | 47 | 52 | 55 | 18 | 26 | 41 |",
].join("\n");

concept("geo.skills.graphs", { file: "skills/graphs", keyPrefix: "skills.graphs" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which graph is best for showing how a ward's land is divided between cultivation, grazing, woodland and settlement?",
    options: [
      ["A pie chart", "Correct: the categories are parts of one whole."],
      ["A line graph", "Line graphs show change over time or distance, not parts of a whole."],
      ["A scatter graph", "Scatter graphs test the relationship between two variables."],
      ["A rose chart", "Rose charts show frequencies by compass direction."],
    ],
    answer: "A",
    explanation: "Parts of a whole are shown with a **pie chart** (or a divided bar).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do the bars of a **histogram** touch, unlike those of a bar graph?",
    options: [
      ["The classes are continuous", "Correct: each class runs straight into the next (e.g. 0–9 mm, 10–19 mm)."],
      ["The data are separate categories", "Separate categories are shown with gaps, on a bar graph."],
      ["Touching bars save space on the page", "The touching bars show continuity, not a space saving."],
      ["The values are always percentages", "Histograms show frequencies; the reason is continuous data."],
    ],
    answer: "A",
    explanation: "**Continuous** data has no gaps between classes, so histogram bars touch.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "In a pie chart, what angle represents **15%** of the total?",
    options: [
      ["54°", "Correct: 15 × 3.6 = 54°."],
      ["15°", "This uses the percentage as degrees; a whole circle is 360°, not 100°."],
      ["36°", "36° is 10% of 360°."],
      ["24°", "This divides 360 by 15 instead of taking 15% of 360."],
    ],
    answer: "A",
    explanation: "Angle = percentage × 3.6 = 15 × 3.6 = **54°**.",
  });
  b.mcq({
    d: 2, skill: "ANALYSIS",
    stem: `${PEDESTRIANS}\n\nWhat type of relationship does a scatter graph of this data show?`,
    options: [
      ["A negative correlation", "Correct: as distance increases, the number of pedestrians generally falls."],
      ["A positive correlation", "A positive correlation would mean counts rise with distance."],
      ["No correlation", "There is a clear overall pattern: counts fall with distance."],
      ["A perfect positive correlation", "All points would lie on a rising straight line; here they mostly fall."],
    ],
    answer: "A",
    explanation: "Counts fall from 118 at 100 m to 25 at 800 m: a **negative correlation**, with one anomaly at 400 m.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", secs: 75,
    stem: `${PEDESTRIANS}\n\nWhich site is the anomaly?`,
    hints: ["Look for the value that breaks the steady fall in counts.", "Compare each count with its neighbours."],
    options: [
      ["400 m", "Correct: 30 pedestrians is far below the trend between 81 (300 m) and 55 (500 m)."],
      ["100 m", "118 is the highest value but fits the trend of more people near the centre."],
      ["800 m", "25 is the lowest value but fits the trend of fewer people further out."],
      ["500 m", "55 fits the trend between 300 m and 600 m."],
    ],
    answer: "A",
    explanation: "Expected about 65–70 at 400 m from the trend, but only **30** were counted: an anomaly.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a **rose chart** (wind rose) show?",
    options: [
      ["How often the wind blows from each direction", "Correct: bar lengths show frequency for each compass direction."],
      ["How rainfall changes through the year", "Monthly rainfall is shown with a bar graph or climate graph."],
      ["How plant cover changes along a transect", "That is a kite graph."],
      ["The age and sex structure of a population", "That is a population pyramid."],
    ],
    answer: "A",
    explanation: "A **wind rose** shows the frequency of wind from each direction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A student records the percentage cover of four grass species every 2 m along a transect from a river bank. Which graph suits the results best?",
    options: [
      ["A kite graph", "Correct: kite widths show how each species' cover changes along the transect."],
      ["A pie chart", "A pie shows parts of one whole, not change along a line."],
      ["A triangular graph", "Triangular graphs need exactly three components summing to 100%."],
      ["A pictogram", "Pictograms show counts with symbols, not change along a transect."],
    ],
    answer: "A",
    explanation: "**Kite graphs** show the abundance of several species along a transect.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "On a scatter graph, which variable goes on the horizontal (x) axis?",
    options: [
      ["The independent variable", "Correct: the variable thought to cause the change, e.g. distance from the centre."],
      ["The dependent variable", "The dependent variable goes on the y-axis."],
      ["Whichever variable has the larger values", "The size of the values does not decide the axis."],
      ["The variable with the most anomalies", "Anomalies do not decide which axis is used."],
    ],
    answer: "A",
    explanation: "Independent (cause) on **x**; dependent (effect) on y.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: "On a triangular graph of employment, a country has **60%** in the primary sector and **15%** in the secondary sector. What percentage works in the tertiary sector?",
    options: [
      ["25%", "Correct: the three sectors must total 100%: 100 − 60 − 15 = 25."],
      ["75%", "75% is primary plus secondary, not the tertiary share."],
      ["45%", "This subtracts only 15 from 60."],
      ["40%", "This ignores the secondary sector: 100 − 60."],
    ],
    answer: "A",
    explanation: "Triangular graphs plot three parts of **100%**: 100 − 60 − 15 = **25%**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which graph shows one total as a single bar of 100%, split into percentage parts?",
    options: [
      ["A divided bar graph", "Correct: one bar represents the whole, divided into parts."],
      ["A simple bar graph", "Simple bars compare separate categories, one bar each."],
      ["A histogram", "Histograms show frequencies of continuous classes."],
      ["A dispersion graph", "Dispersion graphs plot each value as a dot to show spread."],
    ],
    answer: "A",
    explanation: "A **divided bar** is the bar equivalent of a pie chart.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On a population pyramid, which side usually shows **males**?",
    options: [
      ["The left", "Correct: males on the left, females on the right, by convention."],
      ["The right", "Females are usually shown on the right."],
      ["The top", "The top shows the oldest age groups, for both sexes."],
      ["The bottom", "The bottom shows the youngest age group."],
    ],
    answer: "A",
    explanation: "Population pyramids show **males on the left** and females on the right, youngest at the bottom.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, secs: 60,
    stem: "A survey of a growth point counts **240** businesses, of which **72** are general dealers. What angle should the general dealers' sector have on a pie chart?",
    value: 108, unit: "°",
    wrong: [72, 30],
    explanation: "72 ÷ 240 × 360° = **108°**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", secs: 75,
    stem: `${WIND}\n\nWhat percentage of January days had wind from the **east**? Give your answer to one decimal place.`,
    value: 38.7, tol: 0.06, unit: "%",
    wrong: [12, 31],
    hints: ["Find the total number of days first.", "Percentage = days from E ÷ total × 100."],
    explanation: "Total = 3 + 5 + 12 + 6 + 2 + 1 + 1 + 1 = 31 days. 12 ÷ 31 × 100 = **38.7%**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", secs: 45,
    stem: `${PEDESTRIANS}\n\nCalculate the range of the pedestrian counts.`,
    value: 93,
    wrong: [700, 88],
    explanation: "Range = highest − lowest = 118 − 25 = **93** pedestrians.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the graph that shows how often the wind blows from each compass direction.",
    accepted: ["rose chart", "wind rose", "rose diagram", "a rose chart", "a wind rose", "rose graph", "wind rose diagram", "wind rose chart"],
    wrong: ["radial graph"],
    explanation: "A **rose chart** (wind rose).",
  });
  b.tf({
    d: 1, skill: "UNDERSTANDING",
    stem: "A line graph is the best way to compare the yields of maize, tobacco and cotton on one farm in one year.",
    answer: false,
    feedbackFalse: "Correct: crops are separate categories, so a bar graph is better; a line would suggest a trend between them.",
    feedbackTrue: "Not so: separate categories need bars; line graphs suit change over time or distance.",
    explanation: "Use **bars** for separate categories and **lines** for continuous change.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each blank.",
    template: "When both variables increase together, the correlation is {{blank:a}}. A point far from the line of best fit is an {{blank:b}}. A graph with three axes, each from 0 to 100%, is a {{blank:c}} graph.",
    blanks: [
      { id: "a", accepted: ["positive"], choices: ["positive", "negative", "zero"] },
      { id: "b", accepted: ["anomaly"], choices: ["anomaly", "average", "interval"] },
      { id: "c", accepted: ["triangular"], choices: ["triangular", "radial", "kite"] },
    ],
    explanation: "Positive correlation; anomaly; triangular graph.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each set of data to the most suitable graph.",
    pairs: [
      ["Monthly visitor numbers at a lodge over three years", "Line graph"],
      ["Rainfall and maize yield for 20 farms", "Scatter graph"],
      ["Sand, silt and clay percentages in 12 soil samples", "Triangular graph"],
      ["Inputs, processes and outputs of a dairy farm", "Systems diagram"],
      ["Number of pupils in each age group by sex", "Population pyramid"],
    ],
    explanation: "Time series → line; two variables → scatter; three parts of 100% → triangular; inputs/processes/outputs → systems diagram; age-sex structure → pyramid.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: `${TOURISTS}\n\nDescribe the trend in visitor arrivals shown in Table 3.`,
    hints: ["Give the overall trend, figures as evidence, and the exception."],
    points: [
      "Arrivals rose steadily from 2015 to 2019.",
      "Uses figures: from 40 000 in 2015 to a peak of 55 000 in 2019.",
      "A sharp fall in 2020 to 18 000 (an anomaly / sudden drop).",
      "Partial recovery to 41 000 by 2022, still below the 2019 peak.",
    ],
    modelAnswer: "Visitor arrivals increased steadily from 40 000 in 2015 to a peak of 55 000 in 2019. They then fell sharply to 18 000 in 2020, the lowest value, before recovering to 26 000 in 2021 and 41 000 in 2022, still below the 2019 peak.",
    explanation: "Trend + evidence + anomaly is the structure for describing any graph.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A student wants to show how land use in a ward (cultivation, grazing, woodland, settlement) changed between 2000 and 2020. Evaluate the use of two pie charts compared with a compound bar graph for this purpose.",
    hints: ["What does each graph show well: proportions, totals, comparison?", "Finish with a justified choice."],
    points: [
      "Pie charts show each year's land use as proportions of the whole clearly.",
      "Comparing two pies is hard: sector angles are difficult to compare by eye, and small changes are hidden.",
      "Pies cannot show a change in the total area (if the ward boundary or data total changed).",
      "A compound bar graph places the two years side by side on one scale, so changes in each land use are easier to compare.",
      "Compound bars can show totals and parts; percentages can also be used (divided bars) for direct comparison.",
      "Judgement: compound (or divided) bars are better for showing change; pies are better for showing one year's proportions.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Two pie charts would show the share of each land use in 2000 and in 2020 clearly, and are easy for a reader to understand. However, comparing sectors in two separate circles is difficult, so modest changes (for example woodland falling from 20% to 14%) can be missed, and pies cannot show any change in the total. A compound bar graph puts both years side by side on one scale, so the rise in cultivation and fall in woodland can be read directly, and percentages can be used as divided bars. Because the purpose is to show change, the compound or divided bar graph is more suitable, though pies are fine for showing a single year.",
    explanation: "The best graph depends on purpose: proportions (pie) versus comparison and change (compound or divided bars).",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: PEDESTRIANS,
    hints: ["Look at the overall pattern first, then the exception."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Describe the overall relationship between distance and pedestrian numbers.",
        options: [
          ["Numbers fall as distance increases", "Correct: from 118 at 100 m to 25 at 800 m."],
          ["Numbers rise as distance increases", "The counts are highest near the centre."],
          ["Numbers stay about the same", "They change by over 90 pedestrians."],
          ["Numbers rise, then fall", "Apart from one anomaly, counts fall steadily."],
        ],
        answer: "A",
        explanation: "A negative correlation.",
      }),
      P.num({
        label: "(b)", stem: "State the count at the anomalous site.",
        value: 30, wrong: [81],
        explanation: "400 m: 30 pedestrians, far below the trend.",
      }),
      P.num({
        label: "(c)", stem: "By how many pedestrians did the count fall between 100 m and 300 m?",
        value: 37, wrong: [199],
        explanation: "118 − 81 = 37.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons for the anomaly at 400 m.",
        points: [
          "A feature at the site that discourages walkers (e.g. a busy junction, no pavement, road works, an empty plot).",
          "A survey error or chance (e.g. counted at a different time, rain during the count, a short count).",
        ],
        explanation: "Anomalies come from local features or survey problems.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why pedestrian numbers are highest near the town centre.",
        points: [
          "Shops, offices and services are concentrated in the centre.",
          "Bus termini/ranks and workplaces there bring large numbers of people on foot.",
        ],
        explanation: "The CBD is the most accessible point with the most services.",
      }),
    ],
    explanation: "Scatter graph interpretation: trend, evidence and anomalies, then explanation.",
  });
  b.struct({
    d: 2, skill: "APPLICATION",
    stem: "Land use in a fictional ward: cultivation 50%, grazing 25%, woodland 15%, settlement 10%. A student will draw a pie chart.",
    hints: ["Angle = percentage × 3.6."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the angle for cultivation.",
        value: 180, unit: "°", wrong: [50],
        explanation: "50 × 3.6 = 180°.",
      }),
      P.num({
        label: "(b)", stem: "Calculate the angle for grazing.",
        value: 90, unit: "°", wrong: [25],
        explanation: "25 × 3.6 = 90°.",
      }),
      P.num({
        label: "(c)", stem: "Calculate the angle for settlement.",
        value: 36, unit: "°", wrong: [10],
        explanation: "10 × 3.6 = 36°.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State two things the student must add to make the pie chart complete.",
        points: [
          "A title (what, where, when).",
          "A key or labels for each sector (and the data source).",
        ],
        explanation: "Every graph needs a title and a key or labels.",
      }),
    ],
    explanation: "Pie chart construction: convert percentages to angles that total 360°.",
  });

  b.card("CONCEPT", "Choosing a graph", "Categories → bar; parts of a whole → pie or divided bar; change over time → line; two variables → scatter; three parts of 100% → triangular.");
  b.card("CONCEPT", "Pie chart angles", "Angle = value ÷ total × 360°, or percentage × 3.6.");
  b.card("VOCABULARY", "Histogram", "Bar chart of continuous classes; bars touch because there are no gaps between classes.");
  b.card("DEFINITION", "Correlation", "A relationship between two variables: positive (both rise), negative (one rises, other falls) or none.");
  b.card("DEFINITION", "Line of best fit", "A straight line through the middle of scatter points, with roughly equal numbers either side.");
  b.card("VOCABULARY", "Rose chart and kite graph", "Rose chart: wind frequency by direction. Kite graph: species cover along a transect.");
  b.card("CONCEPT", "Describing a graph", "Trend + evidence (figures with units) + anomaly.");
  b.card("VOCABULARY", "Systems diagram", "Shows inputs, processes and outputs, e.g. a farm system.");
});
