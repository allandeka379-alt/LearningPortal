// W4a: amath.statistics.data-presentation (ZIMSEC only)
import { concept, P, t, chk, same, sum, grouped, table } from "../lib.mjs";

concept("amath.statistics.data-presentation", { file: "statistics/data-presentation", keyPrefix: "statistics.data-presentation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Which diagram is most suitable for showing the home languages spoken by the learners in a class?",
    options: [
      ["A pie chart", "Correct: home language is qualitative, and a pie chart shows each category's share."],
      ["A histogram", "Histograms are for continuous grouped data."],
      ["A cumulative frequency curve", "These need numerical data that can be put in order."],
      ["A frequency polygon", "Frequency polygons join points at class midpoints of numerical data."],
    ],
    answer: "A",
    explanation: "Qualitative data suit bar charts and pie charts. Histograms, frequency polygons and cumulative frequency curves need numerical (usually continuous) data.",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In a histogram of continuous data, there are no gaps between neighbouring bars.",
    answer: true,
    explanation: "True. The bars are drawn between class boundaries, which meet, because continuous data have no gaps between classes.",
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "In a survey of 60 households, 15 use gas for cooking. Find the angle of the gas sector in a pie chart of the results.",
    value: (15 / 60) * 360, unit: "°", wrong: [15, 25],
    explanation: t`Angle $= \frac{15}{60} \times 360^\circ = 90^\circ$.`,
  });

  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: "The class 20 ≤ x < 30 has frequency 24. Find its frequency density.",
    value: 24 / 10, wrong: [240, 24 / 30],
    explanation: t`Width $= 30 - 20 = 10$; frequency density $= \frac{24}{10} = 2.4$. Dividing by the upper boundary (0.8) is a common slip.`,
  });

  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Ages in whole years are grouped in classes such as 25–29. For the class 25–29, find the lower class boundary, the upper class boundary and the class midpoint.",
    template: "lower boundary = {{blank:lo}}, upper boundary = {{blank:hi}}, midpoint = {{blank:mid}}",
    blanks: [{ id: "lo", input: "number", accepted: [24.5], wrong: "25" }, { id: "hi", input: "number", accepted: [29.5], wrong: "29" }, { id: "mid", input: "number", accepted: [27], wrong: "27.5" }],
    explanation: "Boundaries are halfway between neighbouring classes: 24.5 and 29.5. The midpoint is (24.5 + 29.5) ÷ 2 = 27.",
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "In a histogram, the bar for the class 40 ≤ x < 55 has a height (frequency density) of 1.6. Find the frequency of this class.",
    value: 1.6 * 15, wrong: [1.6, 1.6 * 55],
    explanation: t`Frequency = frequency density × width $= 1.6 \times 15 = 24$.`,
    hints: ["Area of a bar = frequency."],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "In a pie chart, the sector for learners who walk to school has an angle of 72° and represents 18 learners. How many learners are represented by the whole pie chart?",
    value: 18 * (360 / 72), wrong: [72, 18 * 72],
    explanation: t`$72^\circ$ is $\frac{72}{360} = \frac{1}{5}$ of the circle, so the total is $18 \times 5 = 90$ learners.`,
    hints: ["What fraction of 360° is 72°?"],
  });

  {
    const f = [5, 12, 20, 9, 4];
    let c = 0;
    const cf = f.map((x) => (c += x));
    same(cf, [5, 17, 37, 46, 50]);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "The lengths of 50 maize cobs (cm) are grouped as 0 ≤ x < 10: 5, 10 ≤ x < 20: 12, 20 ≤ x < 30: 20, 30 ≤ x < 40: 9, 40 ≤ x < 50: 4. Find the cumulative frequency at x = 30, the number of cobs shorter than 30 cm.",
      value: cf[2], wrong: [20, 33],
      explanation: "Running total: 5, 17, 37, … The cumulative frequency at the upper boundary 30 is 5 + 12 + 20 = 37.",
      hints: ["Add the frequencies of all classes that end at or before 30."],
    });
  }

  b.mcq({
    d: 2, skill: "RECALL", calculator: false,
    stem: "When drawing a cumulative frequency curve for grouped continuous data, each cumulative frequency is plotted against which value?",
    options: [
      ["The upper class boundary", "Correct: the running total counts every value up to the end of the class."],
      ["The class midpoint", "Midpoints are used for frequency polygons and estimated means, not cumulative frequency."],
      ["The lower class boundary", "By the lower boundary none of the class has been counted yet."],
      ["The class width", "The width is used for frequency density, not for plotting."],
    ],
    answer: "A",
    explanation: "Cumulative frequency = number of values less than the upper boundary, so plot at upper boundaries (and start at 0 at the first lower boundary).",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A grouped frequency table has classes of different widths. Why should the histogram use frequency density rather than frequency on the vertical axis?",
    options: [
      ["So that each bar's area is proportional to its frequency", "Correct: with height = frequency ÷ width, area = frequency, and wide classes are not exaggerated."],
      ["So that all the bars are the same height", "The heights still differ; only the scale changes."],
      ["Because frequency density is easier to calculate", "It needs an extra division, so it is not easier."],
      ["So that the bars do not need to touch", "Histogram bars touch whatever the vertical scale."],
    ],
    answer: "A",
    explanation: "A wide class collects more values simply because it is wide. Dividing by the width gives a fair height, and the area of each bar then represents its frequency.",
    hints: ["What does the area of a bar represent?"],
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Tendai wants to know how many vehicles pass through a tollgate near Norton each hour. Which method of collecting data is most suitable?",
    options: [
      ["Observation, counting the vehicles", "Correct: he can watch and record the vehicles directly."],
      ["A questionnaire for drivers", "Drivers cannot tell him how many other vehicles pass."],
      ["An interview with one driver", "One driver's opinion gives no count of the traffic."],
      ["A laboratory experiment", "Traffic cannot be studied by a controlled experiment."],
    ],
    answer: "A",
    explanation: "Counting events as they happen is observation. Questionnaires and interviews collect opinions and facts from people; experiments control conditions.",
  });

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A questionnaire asks: 'How many hours do you study each week? Tick one: 0–5, 5–10, 10–15, over 15.' What is the main fault?",
    options: [
      ["The boxes overlap, so 5 or 10 hours fits two boxes", "Correct: response boxes must not overlap."],
      ["The question is too personal for learners to answer honestly", "Study time is not a sensitive question."],
      ["There is no box for learners who study for more than 15 hours", "There is an 'over 15' box."],
      ["Hours of study are qualitative data, so they cannot be grouped", "Hours are measured, so they are quantitative and can be grouped."],
    ],
    answer: "A",
    explanation: "Tick boxes must cover every answer once only. Better: 0 to under 5, 5 to under 10, 10 to under 15, 15 or more.",
    hints: ["Where would someone who studies exactly 5 hours tick?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each diagram with how it is drawn.",
    pairs: [
      ["Frequency polygon", "Frequencies plotted at class midpoints and joined by straight lines"],
      ["Cumulative frequency curve", "Running totals plotted at upper class boundaries, joined by a smooth curve"],
      ["Histogram", "Touching bars with height equal to frequency density"],
      ["Pie chart", "Sectors with angles proportional to the frequencies"],
    ],
    explanation: "Midpoints for polygons, upper boundaries for cumulative frequency, frequency density for histograms, angles for pie charts.",
  });

  {
    const leaves = { 4: [2, 8], 5: [0, 3, 3, 9], 6: [1, 4, 7], 7: [0, 5], 8: [6] };
    const values = Object.entries(leaves).flatMap(([s, ls]) => ls.map((l) => 10 * Number(s) + l));
    same(values.length, 12);
    const n60 = values.filter((v) => v >= 60).length;
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: t`A stem-and-leaf diagram of 12 test marks has the rows: $4 \mid 2\ 8$, $5 \mid 0\ 3\ 3\ 9$, $6 \mid 1\ 4\ 7$, $7 \mid 0\ 5$, $8 \mid 6$, with key $5 \mid 3$ means 53. How many learners scored 60 or more?`,
      value: n60, wrong: [3, 5],
      explanation: "Marks of 60 or more are on the stems 6, 7 and 8: 3 + 2 + 1 = 6 learners (61, 64, 67, 70, 75, 86).",
    });
  }

  {
    const perCm2 = 18 / (5 * 4.5);
    const f2 = 20 * 1.5 * perCm2;
    chk(f2, 24, 1e-9);
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: "On a histogram, the bar for a class of width 5 is 4.5 cm tall and represents 18 learners. Another bar, for a class of width 20, is 1.5 cm tall. Using the same scale, how many learners does it represent?",
      value: f2, wrong: [18 * (1.5 / 4.5), 18 * (20 / 5)],
      explanation: "Area represents frequency. The first bar has area 5 × 4.5 = 22.5 units for 18 learners, so 1 unit ↔ 0.8 learners. The second has area 20 × 1.5 = 30 units ↔ 24 learners. Comparing heights alone gives 6.",
      hints: ["In a histogram, frequency is proportional to the area of a bar, not its height."],
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 3,
    stem: "The marks of 80 learners are in a grouped frequency table with classes 0–9, 10–19, …, 90–99 (whole marks). Describe how you would draw a cumulative frequency curve for these data.",
    points: [
      "Work out the running totals of the frequencies (the last one is 80).",
      "Plot each running total against the upper class boundary (9.5, 19.5, …, 99.5), starting with the point (−0.5, 0).",
      "Join the points with a smooth curve and label the axes (marks; cumulative frequency).",
    ],
    modelAnswer: "Add a cumulative frequency column to the table, ending at 80. On axes labelled 'mark' and 'cumulative frequency', plot (−0.5, 0), then each cumulative frequency at the upper boundary of its class: 9.5, 19.5, …, 99.5. Join the points with a smooth increasing curve.",
    explanation: "Upper boundaries, not limits or midpoints, and a starting point at zero frequency.",
    hints: ["Where does each class end, as a boundary?"],
  });

  {
    const cls = [[20, 25, 6], [25, 30, 14], [30, 40, 18], [40, 60, 12]];
    const G = grouped(cls);
    same(G.fd, [1.2, 2.8, 1.8, 0.6]);
    same(G.cf, [6, 20, 38, 50]);
    const est = 12 * (60 - 45) / 20;
    chk(est, 9);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: paras2("The masses of 50 bags of potatoes delivered to a market in Mutare were recorded:", table(["Mass m (kg)", "Frequency"], [["20 ≤ m < 25", 6], ["25 ≤ m < 30", 14], ["30 ≤ m < 40", 18], ["40 ≤ m < 60", 12]])),
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: "Find the frequency density of each class, in order.", template: "{{blank:a}}, {{blank:b}}, {{blank:c}}, {{blank:d}}",
          blanks: [{ id: "a", input: "number", accepted: [1.2], wrong: "6" }, { id: "b", input: "number", accepted: [2.8], wrong: "14" }, { id: "c", input: "number", accepted: [1.8], wrong: "18" }, { id: "d", input: "number", accepted: [0.6], wrong: "12" }],
          explanation: "Widths 5, 5, 10, 20: densities 6/5 = 1.2, 14/5 = 2.8, 18/10 = 1.8, 12/20 = 0.6." }),
        P.num({ label: "(b)", marks: 1, stem: "How many bags have a mass less than 40 kg?", value: G.cf[2], wrong: [18],
          explanation: "6 + 14 + 18 = 38." }),
        P.manual({ label: "(c)", marks: 1, stem: "Which class has the tallest bar in the histogram? Explain briefly.",
          points: ["25 ≤ m < 30, because it has the greatest frequency density (2.8), even though 30 ≤ m < 40 has a larger frequency."],
          modelAnswer: "The bar for 25 ≤ m < 30 is tallest, as its frequency density 2.8 is the greatest; the class 30 ≤ m < 40 has more bags but is twice as wide.",
          explanation: "Height is frequency density, not frequency." }),
        P.num({ label: "(d)", marks: 1, stem: "Assuming the masses are spread evenly within the class 40 ≤ m < 60, estimate the number of bags with a mass of at least 45 kg.", value: est, wrong: [12, 3],
          explanation: "45 to 60 is 15 kg of the 20 kg class: 12 × 15/20 = 9 bags (or frequency density 0.6 × 15)." }),
      ],
      explanation: "Frequency density = frequency ÷ width; cumulative frequencies are running totals; the area under part of a bar estimates the frequency in that part.",
      hints: ["The class widths are not all equal.", "For (d), use frequency density × width of the part you want."],
    });
  }

  {
    const f = [39, 27, 16, 8];
    same(sum(f), 90);
    const ang = f.map((x) => (x / 90) * 360);
    same(ang, [156, 108, 64, 32]);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
      stem: "In a survey, 90 learners at a school in Bulawayo said how they travel to school: walk 39, kombi 27, bus 16, other 8.",
      parts: [
        P.fib({ label: "(a)", marks: 4, stem: "Find the pie chart angles for walk, kombi, bus and other, in that order.", template: "{{blank:a}}°, {{blank:b}}°, {{blank:c}}°, {{blank:d}}°",
          blanks: [{ id: "a", input: "number", accepted: [156], wrong: "39" }, { id: "b", input: "number", accepted: [108], wrong: "27" }, { id: "c", input: "number", accepted: [64], wrong: "16" }, { id: "d", input: "number", accepted: [32], wrong: "8" }],
          explanation: "Each learner is 360° ÷ 90 = 4°: 156°, 108°, 64°, 32° (total 360°)." }),
        P.num({ label: "(b)", marks: 1, stem: "At a second school, a pie chart for 150 learners has a kombi sector of 96°. How many learners at that school travel by kombi?", value: (96 / 360) * 150, wrong: [96, 27],
          explanation: "96/360 × 150 = 40 learners." }),
        P.manual({ label: "(c)", marks: 1, stem: "Explain why a pie chart is suitable for these data but a histogram is not.",
          points: ["The data are qualitative (categories of transport), so they show parts of a whole; histograms need continuous numerical data."],
          modelAnswer: "Mode of travel is a category, not a measurement, so a pie chart showing each category's share of the 90 learners is suitable; a histogram needs continuous data on a numerical scale.",
          explanation: "Match the diagram to the type of data." }),
      ],
      explanation: "Pie chart angle = frequency ÷ total × 360°, and a sector's angle gives back its frequency.",
      hints: ["360° ÷ 90 learners = 4° per learner."],
    });
  }

  b.card("DEFINITION", "Class boundaries", "The values that separate classes with no gaps, e.g. 24.5 and 29.5 for the whole-number class 25–29.");
  b.card("FORMULA", "Frequency density", t`$\text{frequency density} = \dfrac{\text{frequency}}{\text{class width}}$; in a histogram, area of a bar = frequency.`);
  b.card("FORMULA", "Pie chart angle", t`$\dfrac{\text{frequency}}{\text{total}} \times 360^\circ$`);
  b.card("CONCEPT", "Cumulative frequency curve", "Running totals plotted at upper class boundaries, starting at 0 at the first lower boundary; joined by a smooth curve.");
  b.card("CONCEPT", "Frequency polygon", "Frequencies plotted at class midpoints and joined with straight lines; good for comparing distributions.");
  b.card("CONCEPT", "Stem-and-leaf diagram", "Keeps every value: stems (e.g. tens) and ordered leaves (units), with a key such as 5 | 3 = 53.");
  b.card("FACT", "Choosing a diagram", "Qualitative: bar or pie chart. Continuous grouped: histogram, frequency polygon, cumulative frequency curve.");
  b.card("CONCEPT", "Good questionnaire questions", "Short, clear, neutral; tick boxes that do not overlap and cover every possible answer.");
  b.card("FACT", "Methods of collecting data", "Questionnaire, interview, observation, experiment, existing records.");
});

function paras2(a, b2) {
  return `${a}\n\n${b2}`;
}
