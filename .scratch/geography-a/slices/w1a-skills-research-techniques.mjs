// W1a: skills.research-techniques. Illustrative data; numbers computed in code.
import { concept, P, t, chk, table, mean, discharge, dpStr, geographyLevels } from "../lib.mjs";

const tab = (h, r) => table(h, r);
const TIMES = [20.4, 19.6, 21.0];
const mTime = mean(TIMES);
const vel = 12 / mTime;
const Q = discharge(2.5, 0.32, vel);
const COUNTS = [142, 118, 96, 61, 47, 30];
const DIST = [0, 100, 220, 350, 500, 650];
chk((200 / 400) * 50, 25);

concept("ageo.skills.research-techniques", { file: "skills/research-techniques", keyPrefix: "skills.research-techniques" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of primary data?",
    options: [
      ["Pedestrian counts made by students", "Correct: collected first-hand by the investigators."],
      ["A population figure taken from the national census", "Census returns were collected by someone else, so they are secondary data."],
      ["Rainfall totals from a meteorological station", "Station records are secondary data for a student."],
      ["A photograph in a textbook", "Published material is secondary."],
    ],
    answer: "A",
    explanation: "Primary data are collected directly by the investigator in the field.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which situation is stratified sampling most appropriate?",
    options: [
      ["Groups of different sizes must each be represented", "Correct: each group is sampled in proportion to its size."],
      ["No list of the population exists and speed is essential", "Stratified sampling needs known group sizes."],
      ["Every item in the population is exactly the same", "If all items are identical any sample will do."],
      ["Only one measurement is needed from the whole area", "A single measurement needs no sampling plan."],
    ],
    answer: "A",
    explanation: "Stratified sampling divides the population into groups (strata) and samples each in proportion to its size.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A method gives very similar results when it is repeated under the same conditions. What is this quality called?",
    options: [
      ["Reliability", "Correct: repeatable results."],
      ["Validity", "Validity is about measuring what you intend to measure."],
      ["Bias", "Bias is a systematic distortion of results."],
      ["Randomisation", "Randomisation describes how a sample is chosen."],
    ],
    answer: "A",
    explanation: "Reliable methods give consistent results when repeated.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which question is least likely to produce biased answers in a questionnaire on water supply?",
    options: [
      ["How often does your household collect water?", "Correct: neutral, specific and easy to answer."],
      ["Do you agree that the poor water supply is the council's fault?", "This is a leading question that invites agreement."],
      ["Don't you think the new borehole is a great improvement?", "This also leads the respondent."],
      ["Surely everyone would pay more for better water?", "The word 'surely' pushes the answer."],
    ],
    answer: "A",
    explanation: "Good questions are neutral, clear and ask for one piece of information.",
    hints: ["Which question does not suggest the answer?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A student surveys shoppers only outside a supermarket on a Saturday morning to study how far people travel to shop. What is the main weakness?",
    options: [
      ["The sample is biased and not representative", "Correct: the sample is not representative of the whole population."],
      ["The sample is too random to be analysed", "Random selection reduces bias; this sample is the opposite."],
      ["Questionnaires can never be used for distances", "Questionnaires can collect distance data if designed well."],
      ["Primary data cannot be collected on a Saturday", "Primary data can be collected at any time."],
    ],
    answer: "A",
    explanation: "Choosing one place and time excludes other groups, so the sample is biased and unrepresentative.",
    hints: ["Who is not included in the sample?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A student measures the width of a river at five sites to find out whether the river carries more water downstream. What is the main problem?",
    options: [
      ["Width does not measure the volume of water carried", "Correct: the measurement does not test the hypothesis fully."],
      ["Width cannot be measured accurately with a tape", "A tape can be used to measure width."],
      ["Five sites are always too many for a river study", "Five sites is a reasonable sample."],
      ["Rivers are always the same width along their course", "Rivers vary in width."],
    ],
    answer: "A",
    explanation: "Validity requires measuring what the hypothesis is about: volume of water (discharge) depends on depth and velocity too.",
    hints: ["What else determines how much water flows past a point?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action is an ethical consideration when interviewing households?",
    options: [
      ["Explaining the purpose and keeping answers private", "Correct: informed consent and privacy protect participants."],
      ["Writing down names and addresses in the report", "This breaks confidentiality."],
      ["Interviewing children without asking their guardians", "Permission should be obtained first."],
      ["Choosing only the households that agree with the study", "This is biased and unfair."],
    ],
    answer: "A",
    explanation: "Ethical research means consent, honesty about the purpose, confidentiality and avoiding harm.",
  });

  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A researcher wants a systematic sample of 30 households from a list of 450. What is the sampling interval (the gap between chosen households)?",
    value: 450 / 30,
    wrong: [30, 420],
    explanation: "Interval = population ÷ sample size = 450 ÷ 30 = 15. Choose a random start between 1 and 15, then every 15th household.",
    hints: ["Divide the population by the sample size."],
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A school has 400 pupils in three groups: 80 in Form 4, 120 in Form 5 and 200 in Form 6. A stratified sample of 50 pupils is needed. How many Form 6 pupils should be sampled?",
    value: (200 / 400) * 50, unit: "people",
    wrong: [17, 20],
    explanation: "Form 6 is 200 ÷ 400 = 50% of the pupils, so the sample contains 50% of 50 = 25 pupils. (Form 4 gets 10 and Form 5 gets 15.)",
    hints: ["Find the share of the whole school that is in Form 6."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`A float travels 12 m along a straight stretch of stream in ${TIMES.join(" s, ")} s in three trials. Calculate the velocity of the stream, in m/s, to two decimal places.`,
    value: vel, dp: 2, unit: "m/s",
    wrong: [20.3, 1.2],
    explanation: t`Mean time $= (${TIMES.join(" + ")}) \div 3 = ${dpStr(mTime, 2)}$ s. Velocity $= 12 \div ${dpStr(mTime, 2)} = ${dpStr(vel, 2)}$ m/s. Using a single trial or forgetting to divide gives a different value.`,
    hints: ["Average the three times first."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The stream is 2.5 m wide with a mean depth of 0.32 m, and its velocity is ${dpStr(vel, 2)} m/s. Calculate its discharge, in m³/s, to two decimal places.`,
    value: Q, dp: 2, unit: "m³/s",
    wrong: [0.8, 8],
    explanation: t`Cross-sectional area $= 2.5 \times 0.32 = 0.8$ m². Discharge = area × velocity $= 0.8 \times ${dpStr(vel, 2)} = ${dpStr(0.8 * vel, 2)}$ m³/s (using the unrounded velocity gives ${dpStr(Q, 2)}). Stopping at the area gives 0.8.`,
    hints: ["Discharge = width × depth × velocity."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Increasing the sample size normally makes data more reliable.",
    answer: true,
    explanation: "True. A larger sample reduces the effect of chance and unusual results, although it takes more time.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain the difference between random sampling and stratified sampling.",
    points: ["In random sampling every item has an equal chance of being chosen (for example by random numbers)", "In stratified sampling the population is divided into groups (strata) and each group is sampled in proportion to its size", "Stratified sampling ensures all groups are represented, whereas random sampling may miss small groups by chance"],
    modelAnswer: "In random sampling every item has an equal chance of being chosen, for example using random numbers. In stratified sampling the population is first divided into groups and each group is sampled in proportion to its size, which ensures all groups are represented, whereas random sampling may miss small groups by chance.",
    explanation: "Define both and contrast how well they represent groups.",
    hints: ["Which method first splits the population into groups?"],
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each technique to what it is used for.",
    pairs: [
      ["Quadrat", "Sampling vegetation cover in a small square area"],
      ["Transect", "Taking measurements along a line across an area"],
      ["Clinometer", "Measuring slope angle"],
      ["Questionnaire", "Collecting opinions and household information"],
      ["Float and stopwatch", "Estimating stream velocity"],
    ],
    explanation: "Each technique suits a particular kind of measurement.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statement about sampling.",
    template: "In {{blank:a}} sampling every item has an equal chance of selection, while in {{blank:b}} sampling the population is divided into groups and each is sampled in proportion to its size.",
    blanks: [
      { id: "a", accepted: ["random"], choices: ["random", "systematic", "stratified"] },
      { id: "b", accepted: ["stratified"], choices: ["random", "systematic", "stratified"] },
    ],
    explanation: "Random: equal chance. Stratified: proportional sampling from groups.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a small trial of a questionnaire used to find and correct problems before the main survey?",
    accepted: ["pilot study", "pilot", "a pilot study", "pilot survey", "pilot test", "pilot questionnaire"],
    wrong: ["transect", "hypothesis"],
    explanation: "A **pilot study** tests the questionnaire or method on a few people first.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a systematic sample of 40 households could be chosen from a list of 480.",
    points: ["Calculate the interval: 480 ÷ 40 = 12", "Choose a random starting number between 1 and 12", "Select every 12th household from the list after the starting number"],
    modelAnswer: "Divide the 480 households by the sample size of 40 to get an interval of 12. Pick a random starting number between 1 and 12, then select every 12th household on the list.",
    explanation: "Interval, random start, regular selection.",
    hints: ["Divide the population by the sample size."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain two ways in which a student can make the results of a river investigation more reliable.",
    points: ["Repeat each measurement (for example three float runs) and take the mean", "Reason: this reduces the effect of anomalies/chance errors", "Use the same equipment, time of day and method at every site / take more sites", "Reason: results are comparable and the pattern is less likely to be due to chance"],
    modelAnswer: "Repeat each measurement, for example three float runs at each site, and average them, which reduces the effect of anomalies. Use the same equipment and method at every site and add more sites so that the results are comparable and the pattern is less likely to be due to chance.",
    explanation: "Two methods, each with a reason.",
    hints: ["Think about repeating and about comparing like with like."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A group studies the effects of a new dam on a village by interviewing the first ten people they meet in the village centre. Evaluate this method and suggest an improvement.",
    points: ["Small sample, so results are not representative", "Convenience sampling is biased: excludes people who live far from the centre, work elsewhere or are not present", "May ignore groups most affected (for example fishers or farmers displaced by the dam)", "Improvement: use random or stratified sampling of households across the village, with a larger sample"],
    modelAnswer: "The sample of ten is small and was chosen for convenience, so it is biased: people living far from the centre, or who were away, are left out, and groups most affected by the dam, such as farmers, may be missed. A better method would be a random or stratified sample of households across the whole village, using a larger sample.",
    explanation: "Weaknesses linked to bias, then a specific improvement.",
    hints: ["Who is missing from the sample?"],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`Tendai investigates whether pedestrian flow decreases with distance from the centre of Masvingo. He counts the number of pedestrians passing six points for ten minutes at midday on one Tuesday (illustrative data).\n\n${tab(["Point", "1", "2", "3", "4", "5", "6"], [["Distance from centre (m)", ...DIST], ["Pedestrians in 10 min", ...COUNTS]])}`,
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Write a testable hypothesis for the investigation.", points: ["Names both variables: pedestrian flow and distance from the town centre", "States the direction: pedestrian flow decreases as distance from the centre increases"], modelAnswer: "Pedestrian flow decreases as distance from the town centre increases." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why a transect from the centre is suitable for this investigation.", points: ["It samples points at regular intervals in one direction", "So changes with distance can be compared fairly / the pattern can be seen along the line"], modelAnswer: "A transect takes measurements at regular intervals in a straight line away from the centre, so any change with distance can be compared fairly and shown along the line." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the mean number of pedestrians per point, to one decimal place.", value: mean(COUNTS), dp: 1, wrong: [95, 494], explanation: t`Total $= ${COUNTS.join(" + ")} = ${COUNTS.reduce((s, x) => s + x, 0)}$; $\div 6 = ${dpStr(mean(COUNTS), 1)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways in which Tendai could improve the reliability of his counts.", points: ["Repeat the counts on several days and at different times and take means", "Use more than one counter at each point or more points along several transects"], modelAnswer: "Repeat the counts on several days and at different times, taking means, and use more counters or more points on other transects." }),
      P.manual({ label: "(e)", marks: 2, stem: "State one limitation of counting at midday on one Tuesday and its effect on the conclusion.", points: ["Pedestrian flow varies with day and time (lunch hour, market day, weather)", "So the pattern may not be typical and the conclusion may not apply at other times"], modelAnswer: "Pedestrian flow varies with the day and time, for example at lunch hour, so the counts may not be typical and the conclusion may not apply at other times." }),
      P.manual({ label: "(f)", marks: 2, stem: "Name a statistical test suitable for the data and give one reason for your choice.", points: ["Spearman's rank correlation (or Pearson's r)", "It tests the relationship between two variables (distance and pedestrian count) in pairs of data"], modelAnswer: "Spearman's rank correlation, because it tests whether there is a relationship between two sets of paired data, distance and pedestrian count." }),
    ],
    explanation: "A full enquiry question: hypothesis, sampling method, calculation, reliability and evaluation.",
    hints: ["Name both variables in the hypothesis."],
  });
  b.struct({
    d: 3, skill: "EVALUATION",
    stem: "Rudo asks 20 people at a Gweru market the question: 'Don't you agree that the municipality should provide a new borehole?' She records only the answers of people who agree.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What is wrong with the wording of her question?", options: [["It is a leading question", "Correct: it pushes respondents to agree."], ["It is too short to be understood", "The problem is the suggestion, not the length."], ["It collects secondary data only", "Asking people directly collects primary data."], ["It cannot be answered yes or no", "It can be answered yes or no."]], answer: "A", explanation: "'Don't you agree …?' leads the respondent." }),
      P.manual({ label: "(b)", marks: 2, stem: "Rewrite the question so that it is neutral.", points: ["Neutral wording without 'don't you agree' or an assumed answer", "Clear and answerable (for example 'Which would you prefer: a new borehole, repair of the existing water supply, or neither?')"], modelAnswer: "'What improvements, if any, would you like to see to the water supply in your area?'" }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why her sample is biased.", points: ["Only people at one place (market) are asked, excluding those who do not go there", "Only agreeing answers are recorded, so the result is not representative"], modelAnswer: "She asks only people at one market, which excludes people who do not go there, and records only the answers of those who agree, so the sample is not representative." }),
      P.manual({ label: "(d)", marks: 1, stem: "State one ethical consideration when interviewing people at the market.", points: ["Ask permission/explain the purpose/keep answers anonymous and confidential"], modelAnswer: "Ask each person's permission and keep answers confidential." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest an improved sampling method.", points: ["Choose households randomly or by a systematic interval across the area instead of at one place", "Use a larger sample, stratified by area/age/gender, and record all answers"], modelAnswer: "Select households at random or at a regular interval across the whole area, with a larger sample stratified by area, and record every answer." }),
    ],
    explanation: "Leading question, biased sampling, ethics and an improved design.",
    hints: ["Does the question suggest an answer?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the advantages and disadvantages of random, systematic and stratified sampling for a survey of households in a ward. [8]",
    points: [
      "Random: every household has an equal chance, so there is no investigator bias",
      "Random: needs a full list of households and may leave out small groups or areas by chance",
      "Systematic: quick, simple and gives even coverage of the list or area",
      "Systematic: may match a hidden pattern (for example every 10th house is a corner house)",
      "Stratified: ensures every group (area, income, age) is represented in proportion",
      "Stratified: needs known group sizes and more planning, so takes longer",
      "Suitability depends on aims, time, resources and whether a list exists",
      "Judgement: stratified is best when groups differ strongly; systematic is a good compromise in the field; all benefit from a large enough sample",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Random sampling gives every household an equal chance and avoids bias, but it needs a complete list and may miss small groups by chance. Systematic sampling is quick and spreads the sample evenly across a list or area, but it can match a hidden pattern, such as every tenth house being a corner house. Stratified sampling makes sure each group, such as each part of the ward, is represented in proportion, but it needs to know the size of every group and takes longer to plan. The best choice depends on the aims, time and whether a list exists. For a ward whose areas differ strongly, stratified sampling is likely to be best, while systematic sampling is a practical compromise in the field; all need an adequate sample size.",
    wordLimit: { max: 300 },
    explanation: "Advantages and disadvantages of each method followed by a judgement.",
    hints: ["Give at least one strength and one weakness of each method."],
  });

  b.card("DEFINITION", "Primary and secondary data?", "Primary: collected first-hand by the investigator. Secondary: collected by someone else (census, maps, reports).");
  b.card("CONCEPT", "Three sampling methods?", "Random (equal chance), systematic (every kth item, random start) and stratified (proportional to group sizes).");
  b.card("FORMULA", "Systematic sampling interval?", "k = population ÷ sample size.");
  b.card("DEFINITION", "Reliability v validity?", "Reliability: repeating gives similar results. Validity: measures what the hypothesis is about.");
  b.card("CONCEPT", "What is a leading question?", "A question worded to suggest the answer ('Don't you agree …?'), which causes bias.");
  b.card("FORMULA", "Stream discharge?", "Discharge = cross-sectional area (width × mean depth) × velocity, in m³/s.");
  b.card("CONCEPT", "Stages of an enquiry?", "Question and hypothesis, methods, data collection, presentation, analysis, conclusion, evaluation.");
  b.card("CONCEPT", "Ethical practice in fieldwork?", "Consent, honesty about the purpose, confidentiality, safety, avoiding harm, and respect for people and places.");
  b.card("DEFINITION", "Transect and quadrat?", "A transect is a line along which measurements are taken; a quadrat is a square frame used to sample cover or species.");
});
