// Slice EWR2: writing from notes, graphs and statistics.
import { concept } from "../lib.mjs";

const TABLE2 = "| Form | Library books borrowed, Term 1 | Library books borrowed, Term 2 |\n|---|---|---|\n| Form 1 | 78 | 85 |\n| Form 2 | 62 | 66 |\n| Form 3 | 31 | 34 |\n| Form 4 | 90 | 41 |";
const TABLE3 = "| Sport | Learners taking part in 2024 | Learners taking part in 2025 |\n|---|---|---|\n| Football | 60 | 64 |\n| Netball | 45 | 28 |\n| Volleyball | 14 | 33 |\n| Athletics | 70 | 71 |";
const TABLE = "| Club | Members in 2024 | Members in 2025 |\n|---|---|---|\n| Drama | 40 | 25 |\n| Chess | 12 | 30 |\n| Environment | 35 | 36 |\n| Choir | 50 | 48 |";

concept("eng.functional.notes-and-data", { file: "functional/notes-and-data", keyPrefix: "functional.notes-and-data" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a guided composition, what does it mean to **amplify** a note?",
    options: [
      ["To expand it into complete, connected sentences", "Correct: amplifying turns a short note into fluent sentences with links and detail."],
      ["To copy it exactly as it is given in the question", "Copying notes is not continuous writing."],
      ["To leave it out if it seems unimportant", "Each note usually carries marks; none should be left out."],
      ["To write it in capital letters to make it stand out", "Capitals do not expand the note."],
    ],
    answer: "A",
    explanation: "**Amplify** = expand a note into full sentences with grammar, linking words and reasonable detail.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence best amplifies the note *\"borehole repaired; 3 weeks; donation by local business\"*?",
    options: [
      ["After three weeks without water, the borehole was repaired with a donation from a local business.", "Correct: all three parts of the note in one fluent, accurate sentence."],
      ["Borehole repaired. Three weeks. Donation by local business. Very good.", "This copies the note without grammar or links."],
      ["The borehole was repaired, which was very good news indeed for us all.", "The time and the donation are left out."],
      ["A local business kindly donated three brand-new boreholes to the school last week.", "This contradicts the note: one borehole repaired, not three donated."],
    ],
    answer: "A",
    explanation: "A good amplification includes **every part** of the note, adds grammar and links, and never contradicts the material.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A survey found that **45 out of 150** learners cycle to school. Which description is accurate?",
    options: [
      ["between a quarter and a third of them", "Correct: a quarter of 150 is 37.5 and a third is 50, so 45 lies between."],
      ["more than half of the learners", "Half of 150 is 75, so 45 is far less than half."],
      ["almost all of the learners", "45 out of 150 is a minority."],
      ["exactly a fifth of the learners", "A fifth of 150 is 30, not 45."],
    ],
    answer: "A",
    explanation: "Check arithmetic before using fractions: of 150, a fifth = 30, a quarter = 37.5, a third = 50, a half = 75. So 45 (30 per cent) lies **between a quarter and a third**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A line graph shows sales rising quickly from 20 to 90 in one month. Which phrase describes this best?",
    options: [
      ["a sharp increase", "Correct: sharp describes a large, rapid rise."],
      ["a slight decrease", "Sales went up, not down, and the change was large."],
      ["remained steady", "Steady means little or no change."],
      ["fluctuated slightly", "Fluctuate means went up and down; this was a clear rise."],
    ],
    answer: "A",
    explanation: "Trend language: *a sharp increase/rise* (large, fast), *a slight increase* (small), *remained steady* (no change), *fluctuated* (up and down).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: `Study the table.\n\n${TABLE}\n\nWhich statement is **accurate**?`,
    options: [
      ["Chess club membership more than doubled, while Drama fell by fifteen.", "Correct: Chess 12 → 30 (2.5 times); Drama 40 → 25 (down 15)."],
      ["Every club gained members between 2024 and 2025 at the school.", "Drama and Choir both lost members."],
      ["The Environment club had the largest membership in both years.", "The Choir was largest in both years (50 and 48)."],
      ["Choir membership fell sharply from 50 members to 30 members.", "Choir fell only slightly, from 50 to 48."],
    ],
    answer: "A",
    hints: ["Check each club's two figures.", "Doubling 12 gives 24."],
    explanation: "Read each row carefully and calculate changes before writing comparisons: Chess 12 → 30 is more than double; Drama fell by 15; Environment was steady; Choir fell slightly.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: `Study the table.\n\n${TABLE2}\n\nWhich **conclusion** is best supported by the data?`,
    options: [
      ["Form 4 borrowing fell by more than half, so the reasons deserve investigation.", "Correct: 90 to 41 is a fall of 49, more than half, and the table cannot explain why."],
      ["Form 1 borrowed more books than any other form in both terms.", "In Term 1, Form 4 (90) borrowed more than Form 1 (78)."],
      ["Form 4 learners have completely stopped reading library books.", "They still borrowed 41 books in Term 2."],
      ["Borrowing increased in every form from Term 1 to Term 2.", "Form 4 borrowing fell sharply."],
    ],
    answer: "A",
    hints: ["Which form changed most?", "Avoid claims the figures do not show."],
    explanation: "Draw only conclusions the data supports. A sharp fall is worth investigating; claims such as *completely stopped* go beyond the evidence.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false? In a guided composition, it is acceptable to present the given notes as a bulleted list without expanding them.",
    answer: false,
    explanation: "False. Notes must be amplified into full, linked sentences in the required format (letter, report, speech…).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false? When describing a table, you should select the most important figures rather than repeat every number.",
    answer: true,
    explanation: "True. Lead with the big picture (highest, lowest, biggest change) and use the figures that support your points.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each trend phrase with its meaning.",
    pairs: [
      ["peaked in May", "reached its highest point in May"],
      ["remained steady", "stayed about the same"],
      ["fell slightly", "went down by a small amount"],
      ["fluctuated", "went up and down irregularly"],
    ],
    explanation: "Trend vocabulary lets you describe graphs precisely in words: *peaked*, *remained steady*, *fell slightly*, *fluctuated*, *rose sharply*.",
  });
  b.fib({
    d: 2,
    stem: "Complete the description of the data. *Survey of 120 learners: 90 have a phone; 30 do not.*",
    template: "{{blank:a}} of the learners surveyed have a phone, which is {{blank:b}} as many as those without one.",
    blanks: [
      { id: "a", accepted: ["Three quarters"], choices: ["Three quarters", "Half", "A third", "Almost all"] },
      { id: "b", accepted: ["three times"], choices: ["three times", "twice", "four times", "half"] },
    ],
    explanation: "90 of 120 = **three quarters**. 90 is **three times** 30.",
  });

  b.ext({
    d: 2, skill: "APPLICATION", marks: 10, secs: 1000,
    stem: "Amplify these notes into **one well-linked paragraph** (about 110 words) for a report to the Head on the school's Open Day.\n\n- *Saturday 2 May; about 300 parents attended*\n- *displays by every department; Science experiments most popular*\n- *refreshments sold by Form 4s; raised money for graduation*\n- *problem: car park full by 10 a.m.*",
    wordLimit: { min: 90, max: 120 },
    points: [
      ["All four notes included accurately", 4],
      ["Every note expanded into full sentences with suitable verbs and tense", 2],
      ["Linking words join the ideas into one coherent paragraph", 2],
      ["Objective report style and accurate language", 2],
    ],
    modelAnswer: "The school held its Open Day on Saturday 2 May, and about 300 parents attended. Every department mounted a display, but the Science experiments proved the most popular, with crowds gathering around the demonstrations throughout the morning and several parents asking to try the experiments themselves. In addition, Form 4 learners sold refreshments, raising money towards their graduation ceremony. The only significant problem was parking: the car park was full by 10 a.m., and later visitors had to leave their cars along the road outside the gate, which caused some congestion when the event ended.",
    explanation: "Each note becomes a full sentence (or two), linked with *but*, *In addition* and a colon, with reasonable detail that does not contradict the notes.",
  });
  b.ext({
    d: 3, skill: "APPLICATION", marks: 12, secs: 1300,
    stem: `Study the table showing participation in school sports.\n\n${TABLE3}\n\nWrite the **findings section** of a report to the Head (about 150 words) describing the changes accurately. Do not include recommendations.`,
    wordLimit: { min: 130, max: 160 },
    points: [
      ["Every sport's change described accurately with correct figures", 4],
      ["Comparisons and trend language used precisely (more than doubled, fell, steady, slightly)", 3],
      ["Findings organised logically (biggest changes first or grouped by rise and fall)", 2],
      ["Objective style with no recommendations or invented reasons presented as facts", 1],
      ["Accurate language", 2],
    ],
    hints: ["Start with the biggest change.", "Group the sports that rose and the ones that fell."],
    modelAnswer: "**3. Findings**\n\n*3.1 Sports that grew.* The most striking change was in volleyball, where participation rose from 14 learners in 2024 to 33 in 2025, more than doubling. Football also grew, but only slightly, from 60 to 64, while athletics remained almost unchanged, gaining a single learner to reach 71.\n\n*3.2 Sports that declined.* Netball was the only sport to lose participants, and the fall was sharp: from 45 learners to 28, a drop of 17, which means that more than a third of the previous year's players did not take part.\n\n*3.3 Overall.* Athletics remained the most popular sport in both years, with football second each time. Taken together, 189 learners took part in 2024 and 196 in 2025, so total participation rose slightly, although interest shifted noticeably from netball towards volleyball.",
    explanation: "The model groups rises and falls, uses exact figures with precise comparisons, calculates totals correctly (189 and 196) and keeps to findings without recommendations.",
  });
  b.ext({
    d: 4, skill: "CREATION", marks: 16, secs: 1900,
    stem: "The graph below is described in words. Use it to write an **article** for your school magazine (about 220 words) about water use at the school, and suggest how to reduce it.\n\n*A bar graph shows the school's water use in thousands of litres per week over six weeks of term: week 1, 40; week 2, 42; week 3, 41; week 4, 58; week 5, 60; week 6, 45. A note under the graph says: \"Weeks 4 and 5: two taps in the boys' hostel left dripping; repaired at the end of week 5.\"*",
    wordLimit: { min: 200, max: 240 },
    points: [
      ["The trend described accurately (steady, sharp rise in weeks 4-5, fall in week 6) with correct figures", 4],
      ["The cause given in the note linked correctly to the rise and fall", 2],
      ["At least two practical suggestions for reducing water use", 3],
      ["Article features (headline, engaging opening, conclusion) and a suitable tone", 3],
      ["Accurate language", 4],
    ],
    levels: [
      [4, 13, 16, "Accurate, well-linked interpretation; practical suggestions; engaging and accurate."],
      [3, 9, 12, "Mostly accurate data; suggestions present; generally accurate."],
      [2, 5, 8, "Data misread or ignored; weak suggestions; frequent errors."],
      [1, 0, 4, "Little use of the graph."],
    ],
    hints: ["How much higher was week 5 than week 1?", "Connect the dripping taps to the figures."],
    modelAnswer: "**Plan:**\n- Headline: *Every Drop Counts: What Two Dripping Taps Cost Us*.\n- Opening: hook (a single dripping tap seems harmless…).\n- Data paragraph: weeks 1-3 steady at about 40 000-42 000 litres; sharp rise to 58 000 in week 4 and a peak of 60 000 in week 5 (half as much again as week 1); fall to 45 000 in week 6 after the repair.\n- Cause: two dripping taps in the boys' hostel; the repair explains the fall; week 6 still slightly above the early weeks, so other leaks may exist.\n- Suggestions: report leaks to the groundsman at once (a leak book at the hostel office); close taps fully and use buckets for mopping; harvest rainwater from roofs for the gardens.\n- Conclusion: call to every learner to be a water watcher.\n\n**Opening paragraph:** One drip a second does not sound like much. But according to the school's own figures, two dripping taps in the boys' hostel pushed our weekly water use up by almost half in just a fortnight.",
    explanation: "Interpreting a graph in an article means describing the trend with accurate figures, linking it to the cause given and turning it into practical advice for readers.",
  });

  b.card("DEFINITION", "Amplify", "To expand a note into complete, connected sentences with grammar, links and reasonable detail.");
  b.card("CONCEPT", "Rules for using notes", "Use every note; write full sentences; link them; add only detail that fits; never contradict the notes.");
  b.card("CONCEPT", "Reading a table or graph", "Check title and units → find highest, lowest and main trend → select key figures → compare → conclude only what the data supports.");
  b.card("DEFINITION", "Trend", "The general direction of change over time: rising, falling, steady or fluctuating.");
  b.card("VOCABULARY", "Proportion phrases", "almost half, just over a third, a quarter, the vast majority, a small minority.");
  b.card("VOCABULARY", "Trend phrases", "rose steadily, increased sharply, fell slightly, remained steady, fluctuated, peaked in…");
  b.card("CONCEPT", "Using pictures in a guided composition", "Treat each picture as a note: order the scenes, describe each fully, link with time connectives.");
  b.card("FACT", "Most common data error", "Misreading figures or wrong fractions (e.g. calling 45 of 150 almost half).");
});
