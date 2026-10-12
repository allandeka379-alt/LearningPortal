// W1b: skills.extended-writing (both boards; neutral examples). Computed: 90/60 = 1.5 min per mark; 20 x 1.5 = 30 min;
// ZIMSEC 45/25 = 1.8 min per mark, 6 x 1.8 = 10.8; 8/25 = 32%; informal share 18% -> 32%: +14 points = 77.8%;
// struct 12: Cambridge Paper 4: 15 + 30 minutes per topic, 90 in all.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const perMark = chk(90 / 60, 1.5);
const essay = chk(20 * 1.5, 30);
const part6 = rnd(6 * (45 / 25), 1, 10.8, "part6");
const evalPct = chk((8 / 25) * 100, 32);
const pts = chk(32 - 18, 14);
const relInc = rnd(((32 - 18) / 18) * 100, 1, 77.8, "relInc");
const t10 = chk(10 * 1.5, 15);
const topicTime = chk(15 + 30, 45);
const total = chk(2 * 45, 90);

concept("ageo.skills.extended-writing", { file: "skills/extended-writing", keyPrefix: "skills.extended-writing" }, (b) => {
  mc(b, 1, "RECALL", "What does a question that begins with the command word **State** require?", [
    ["A short answer, with no explanation", "Correct: give the fact, term or value asked for."],
    ["A full explanation with reasons", "That is what *explain* requires."],
    ["A judgement on how important something is", "That is what *assess* requires."],
    ["A comparison of two things in detail", "That is what *compare* requires."],
  ], "**State** = give a short fact, term or value.");
  mc(b, 1, "RECALL", "Which command word asks you to give reasons for something?", [
    ["Explain", "Correct: explain means how and why."],
    ["Describe", "Describe says what something is like, without the reasons."],
    ["Identify", "Identify means to name or pick out something."],
    ["Outline", "Outline gives the main points briefly."],
  ], "**Explain** requires reasons: how and why.");
  mc(b, 2, "UNDERSTANDING", "Which sentence is an *explanation* rather than a description?", [
    ["Rainfall fell because the rain-bearing winds weakened", "Correct: it gives a reason using *because*."],
    ["Rainfall fell from 700 mm to 450 mm over the decade", "This describes the change with figures."],
    ["Rainfall was lower in the later decade than the earlier", "This is a comparison of two periods."],
    ["Rainfall in the table is shown in millimetres", "This describes the unit used in the table."],
  ], "An **explanation** gives a reason (how or why); description says what the data show.");
  mc(b, 2, "UNDERSTANDING", "What must you do in answer to a question that begins 'To what extent …'?", [
    ["Weigh the evidence and reach a supported judgement", "Correct: say how far the statement is true, and why."],
    ["List everything you know about the topic", "A list without a judgement earns few marks."],
    ["Define the key terms and stop there", "Definitions alone do not answer *to what extent*."],
    ["Describe one example in as much detail as possible", "One example is not enough to reach a judgement."],
  ], "**To what extent** needs balanced evaluation and a clear conclusion.");
  mc(b, 2, "UNDERSTANDING", "In a PEEL paragraph, what is the job of the 'Evidence'?", [
    ["To back the point with a fact or figure", "Correct: for example a located case or data from the resource."],
    ["To repeat the question word for word at length", "Repeating the question gains no marks."],
    ["To introduce a completely different topic", "Evidence must support the point you made."],
    ["To give your final conclusion to the essay", "The conclusion comes at the end of the essay."],
  ], "The **evidence** backs the point: a fact, a figure from the data, or a located example.");
  mc(b, 2, "APPLICATION", "Which of these is the best example of a *located* example for a flooding answer?", [
    ["Cyclone Idai (March 2019) caused landslides in Chimanimani", "Correct: it names a place, a date and a specific effect."],
    ["Some storms cause serious floods in some places", "This is vague and has no place or date."],
    ["Floods are very bad for everyone who lives nearby", "This is a general opinion, not a located fact."],
    ["It rains a great deal during the wet season", "This is a general statement."],
  ], "A **located example** gives place, date and a specific fact.");
  mc(b, 3, "APPLICATION", "Which sentence is the best *comparison*?", [
    ["Growth is faster in A (4.2%), whereas B has only 1.1%", "Correct: it links both places in one sentence with figures and a comparative."],
    ["Urban growth is 4.2% a year in A. In B it is 1.1% a year", "Both values are given but not linked or compared."],
    ["Both A and B have urban growth in the period", "This gives no figures or difference."],
    ["Urban growth is a major issue in many countries today", "This does not compare the two places."],
  ], "A good comparison links both items in one sentence using words such as **whereas** or **greater than**.", { hints: ["Look for a comparative word and figures for both places."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A good conclusion to an evaluative essay simply repeats the main points of the essay.", answer: false, daily: true,
    feedbackFalse: "Correct: it should give a clear, reasoned judgement that answers the question.",
    feedbackTrue: "Not so: repeating the points does not reach the judgement that earns the top levels.",
    explanation: "The conclusion must **answer the question** with a supported judgement." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A question that begins 'Assess' requires a {{blank:a}} at the end. In a PEEL paragraph the P stands for {{blank:b}}. A fact with place and date is a {{blank:c}} example.",
    blanks: [
      { id: "a", accepted: ["judgement"], choices: ["judgement", "definition", "list"] },
      { id: "b", accepted: ["point"], choices: ["point", "plan", "proof"] },
      { id: "c", accepted: ["located"], choices: ["located", "general", "fictional"] },
    ], explanation: "Judgement; point; located." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each command word to what it requires.",
    pairs: [
      ["Describe", "Say what the pattern or feature is like, with figures"],
      ["Explain", "Give reasons: how and why"],
      ["Compare", "Show similarities and differences, linking the items"],
      ["Suggest", "Apply knowledge to give a reasoned idea for a new situation"],
      ["Evaluate", "Weigh strengths and limitations and make a judgement"],
    ], explanation: "Each command word needs a different type of answer." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "min",
    stem: "A Cambridge paper lasts 90 minutes for 60 marks. How many minutes is this per mark?",
    value: perMark, wrong: [0.67, 150],
    explanation: "90 ÷ 60 = **1.5 minutes per mark**. The value 0.67 is marks per minute." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "min",
    stem: "Using 1.5 minutes per mark, how many minutes should you spend on a 20-mark essay, including planning?",
    hints: ["Multiply the marks by the minutes per mark."],
    value: essay, wrong: [13.3, 21.5],
    explanation: "20 × 1.5 = **30 minutes**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, dp: 1, unit: "min",
    stem: "In a ZIMSEC Paper 1 question you have 45 minutes for 25 marks. How many minutes should you give to a 6-mark part, to 1 decimal place?",
    hints: ["Find the minutes per mark first: 45 ÷ 25."],
    value: part6, wrong: [7.5, 6],
    explanation: "Minutes per mark = 45 ÷ 25 = 1.8. 6 × 1.8 = **10.8 minutes**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "%",
    stem: "The final part of a 25-mark question is worth 8 marks and tests evaluation. Calculate the percentage of the question's marks that are for evaluation.",
    hints: ["Divide 8 by 25 and multiply by 100."],
    value: evalPct, wrong: [3.1, 68],
    explanation: "8 ÷ 25 × 100 = **32%**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the command word that asks you to say what something is like, without giving reasons.",
    accepted: ["describe", "Describe"], wrong: ["explain"],
    explanation: "**Describe**." });
  b.short({ d: 2, skill: "RECALL", stem: "In the PEEL structure, what does the final L stand for?",
    accepted: ["link", "Link", "linking back", "link back to the question"], wrong: ["list"],
    explanation: "**Link**: tie the paragraph back to the question or the argument." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe three features of an effective conclusion to an evaluative essay.",
    hints: ["Think about what question it must answer."],
    points: [
      "It gives a clear, direct answer to the question (a judgement).",
      "It is supported by the most important points or evidence from the essay, not new material.",
      "It recognises limits or alternative views (for example 'to a large extent, although …').",
    ],
    modelAnswer: "An effective conclusion answers the question directly with a judgement, supports that judgement with the strongest evidence from the essay without adding new material, and acknowledges the main limitation or alternative view.",
    explanation: "A conclusion is a reasoned judgement, not a summary." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4,
    stem: "A candidate writes: 'Urban areas have many problems. There are lots of people. It is crowded.' Rewrite this as a developed point to answer 'Explain one problem of rapid urban growth.'",
    hints: ["Use point, evidence, explanation."],
    points: [
      "A clear point naming a specific problem (for example informal housing, traffic congestion, pressure on water supply).",
      "Evidence: a figure, place or example (for example a named city or data).",
      "An explanation of how rapid growth causes the problem (cause linked to effect).",
      "A link to its consequence for people or the environment.",
    ],
    modelAnswer: "Rapid urban growth leads to the spread of informal housing. In a fast-growing city, migrants arrive faster than the council can build houses or install services, so many people build homes on risky land such as floodplains. This leaves them without safe water or sanitation and exposed to disease and floods.",
    explanation: "Develop with a specific problem, evidence, explanation and consequence." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4,
    stem: "A candidate answers 'To what extent is deforestation the main cause of flooding in a named river basin?' by listing three effects of deforestation. Explain why this answer would score poorly and how to improve it.",
    hints: ["Compare the answer with what 'to what extent' requires."],
    points: [
      "It does not answer 'to what extent': there is no weighing of deforestation against other causes.",
      "No other factors (such as rainfall intensity, urban surfaces, cyclones or siltation) are considered, so it is one-sided.",
      "It lacks a located basin and evidence, so it is not specific to the question.",
      "To improve: include a named basin with data, compare causes, and end with a reasoned judgement on how important deforestation is.",
    ],
    modelAnswer: "The answer lists effects but never weighs deforestation against other causes, so it does not answer 'to what extent'. It is one-sided and does not use a named river basin or evidence. A better answer would use a named basin and data, compare deforestation with rainfall, urban surfaces and siltation, and finish with a supported judgement.",
    explanation: "Evaluation needs balance, evidence and a judgement." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A data table shows the proportion of a city's population living in informal settlements (illustrative data):\n\n" + tbl(["Year", "2010", "2022"], [["Population in informal settlements (%)", 18, 32]]),
    hints: ["A percentage-point change is the difference between the two percentages."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the increase in percentage points between 2010 and 2022.", value: pts, wrong: [77.8, 50],
        explanation: "32 − 18 = 14 percentage points." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the relative increase in the proportion, as a percentage of the 2010 value, to 1 decimal place.", value: relInc, dp: 1, unit: "%", wrong: [14, 43.8],
        explanation: "14 ÷ 18 × 100 = 77.8%." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe the change shown, then explain one reason for it. Write a point, evidence and an explanation.",
        points: [
          "Describe: the share of informal settlement residents rose from 18% to 32%, an increase of 14 percentage points.",
          "Compare or interpret the size of the change (it is almost double the original proportion).",
          "Explain a reason (for example rapid migration from rural areas faster than formal housing is built).",
          "Link the reason to the data (with high prices of formal housing and limited services, newcomers build informally).",
        ],
        modelAnswer: "The share of the population in informal settlements rose from 18% in 2010 to 32% in 2022, an increase of 14 percentage points, almost doubling. One reason is rapid rural–urban migration. Newcomers arrive faster than formal housing can be built, and with formal housing too costly, many build informal homes. This explains why the share has risen so much.",
        explanation: "Describe with figures, then explain with a cause linked to the data." }),
    ], explanation: "Move from description to explanation, using the data." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A Cambridge Paper 4 lasts 90 minutes for 60 marks. A candidate chooses two topics. Each topic has a 10-mark structured question and a 20-mark essay.",
    hints: ["Use 90 ÷ 60 minutes per mark."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the minutes per mark.", value: perMark, wrong: [0.67, 150], unit: "min",
        explanation: "90 ÷ 60 = 1.5 minutes per mark." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the time for the 10-mark structured question, in minutes.", value: t10, wrong: [10, 20], unit: "min",
        explanation: "10 × 1.5 = 15 minutes." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the time for one topic (structured question and essay together), in minutes.", value: topicTime, wrong: [30, 60], unit: "min",
        explanation: "15 + 30 = 45 minutes." }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the total time for both topics, in minutes.", value: total, wrong: [45, 60], unit: "min",
        explanation: "2 × 45 = 90 minutes, which is the whole paper." }),
      P.manual({ label: "(e)", marks: 4, stem: "Describe how the candidate could use the 30 minutes for the essay.",
        points: [
          "Spend about 3–5 minutes planning: underline the command word, list 3–4 points and the example for each, and decide the judgement.",
          "Write a short introduction (define key terms and give the line of argument).",
          "Write about 3–4 developed paragraphs (point, evidence, explanation, link), including a counter-argument.",
          "Leave about 3–5 minutes for a conclusion that gives an explicit judgement.",
        ],
        modelAnswer: "I would plan for about four minutes by underlining the command word and listing points with an example for each. Then I would write a short introduction, three or four developed paragraphs of point, evidence, explanation and link, including one counter-argument, and keep about four minutes for a conclusion with an explicit judgement.",
        explanation: "A structure of plan, introduction, body and conclusion fits within the time." }),
    ], explanation: "Allocate the time by marks and plan the essay." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the view that educating girls is the most effective way of reducing the rate of population growth in developing countries.",
    hints: ["Give the argument for the view with evidence and the reasons.", "Then consider other factors and reach a judgement."],
    points: [
      "Educated girls usually marry later and have fewer children, which reduces the birth rate.",
      "Education raises the chance of paid work, increasing the opportunity cost of having children.",
      "Educated mothers tend to have lower infant mortality, so families feel less need to have many children.",
      "Access to family planning and health services reduces unplanned births directly, even without much schooling.",
      "Economic development, urbanisation and old-age security reduce the economic value of large families.",
      "Cultural and religious beliefs and the status of women affect the impact of any policy.",
      "Education takes a generation to have a full effect, so its impact on population growth is slow.",
      "Judgement: girls' education is one of the most effective long-term measures, especially when combined with access to health services and economic opportunities, but it is not sufficient alone.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Educating girls is probably the most effective long-term way to lower birth rates. Educated girls usually marry later, have more chances of paid work, and see more of their children survive, so they choose smaller families. However, family planning services can reduce births even where schooling is limited, and economic development and the security of pensions lessen the need for many children. Cultural beliefs and the status of women also limit what any policy can achieve, and education works slowly, over a generation. I conclude that girls' education is one of the most effective measures, particularly with health services and economic opportunity, but it is not enough on its own.",
    wordLimit: { max: 300 }, explanation: "Develop the case for the view, weigh other factors and judge." });

  b.card("DEFINITION", "Command word", "The word in a question that tells you the type of answer: state, describe, explain, compare, suggest, assess, evaluate, to what extent.");
  b.card("CONCEPT", "Describe, explain, evaluate", "Describe: what (with figures). Explain: why and how. Evaluate: weigh strengths and limits and reach a judgement.");
  b.card("CONCEPT", "PEEL paragraph", "Point, Evidence, Explanation, Link back to the question.");
  b.card("CONCEPT", "Located example", "Name the place, give the date and one or two specific facts; never invent a fact.");
  b.card("FORMULA", "Time per mark", "Cambridge: 90 min ÷ 60 marks = 1.5 min per mark. ZIMSEC Papers 1 and 2: 45 min ÷ 25 marks = 1.8 min per mark.");
  b.card("CONCEPT", "Structure of an evaluative essay", "Introduction (terms and line of argument), balanced body paragraphs with a counter-argument, conclusion with an explicit judgement.");
  b.card("CONCEPT", "Using data", "Quote values with units, compare, calculate a change, and say what it means.");
  b.card("CONCEPT", "Levels of response", "Longer answers are marked for overall quality: depth of knowledge, examples and evidence, evaluation and structure.");
});
