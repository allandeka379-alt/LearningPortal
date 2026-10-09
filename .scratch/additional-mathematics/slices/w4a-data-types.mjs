// W4a: amath.statistics.data-types (ZIMSEC only)
import { concept, P, t, chk } from "../lib.mjs";

concept("amath.statistics.data-types", { file: "statistics/data-types", keyPrefix: "statistics.data-types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "In statistics, what is a population?",
    options: [
      ["The whole set of people or items being studied", "Correct: the population is everything the investigation wants to know about."],
      ["The people who answer a questionnaire", "Those who answer form a sample (unless everyone answers)."],
      ["The number of people living in a country", "That is one particular population size, not the statistical meaning."],
      ["A set of numbers chosen at random", "Random numbers may help select a sample; they are not the population."],
    ],
    answer: "A",
    explanation: "A population is the complete group of interest, such as all Form 4 learners in a district. A sample is the part of it that is actually studied.",
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "What is a census?",
    options: [
      ["A survey of every member of the population", "Correct: a census collects data from the whole population."],
      ["A survey of a random part of the population", "That is a sample survey."],
      ["A record of births and deaths only", "That is a vital register, not the statistical meaning of census."],
      ["A summary of data in a frequency table", "A frequency table organises data; it is not a census."],
    ],
    answer: "A",
    explanation: "A census includes everyone. Zimbabwe's national population census, run by ZIMSTAT, is one example.",
  });

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "Secondary data are data that you collect yourself for your own investigation.",
    answer: false,
    explanation: "False. Data you collect yourself for your purpose are primary data. Secondary data were collected by someone else, for example published reports or records.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these variables gives continuous data?",
    options: [
      ["The mass of a pumpkin", "Correct: mass is measured and can take any value in a range."],
      ["The number of goats in a herd", "Goats are counted, so the data are discrete."],
      ["The shoe size of a learner", "Shoe sizes take only particular values, so they are discrete."],
      ["The colour of a school bus", "Colour is a category, so the data are qualitative."],
    ],
    answer: "A",
    explanation: "Continuous data come from measuring (mass, length, time, temperature). Discrete data come from counting or take only separate values.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these variables gives qualitative data?",
    options: [
      ["A person's blood group", "Correct: A, B, AB and O are categories, not numbers."],
      ["A person's height in centimetres", "Height is measured, so it is quantitative (continuous)."],
      ["The number of children in a family", "This is counted, so it is quantitative (discrete)."],
      ["The temperature at noon in Kariba", "Temperature is measured, so it is quantitative (continuous)."],
    ],
    answer: "A",
    explanation: "Qualitative (categorical) data describe a quality or category. Quantitative data are numbers from counting or measuring.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Which of these is an example of primary data for Farai's project on traffic near his school?",
    options: [
      ["His own count of vehicles passing the gate", "Correct: he collects the data himself for his own purpose."],
      ["A newspaper report on road accidents", "This was collected and published by someone else: secondary."],
      ["Council records of road repairs", "These are existing records: secondary data."],
      ["A national report on vehicle numbers", "This is a published report: secondary data."],
    ],
    answer: "A",
    explanation: "Primary data are collected first-hand by the user for the purpose in hand; everything taken from existing sources is secondary.",
  });

  b.mcq({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A factory wants to know how long its batteries last before going flat. Why must it use a sample rather than a census?",
    options: [
      ["Testing a battery uses it up, so none would be left to sell", "Correct: the test destroys the item, so testing every battery is impossible."],
      ["A sample always gives more accurate results than a census", "A census gives complete information; a sample gives an estimate."],
      ["The number of batteries made is unknown", "The population size being unknown is not the main reason here."],
      ["Battery lifetimes are qualitative data", "Lifetime is a measured time, so it is quantitative and continuous."],
    ],
    answer: "A",
    explanation: "When testing is destructive, a census would leave nothing to sell. Samples are also used when the population is large or a census is too slow or costly.",
    hints: ["What happens to a battery after it has been tested until it goes flat?"],
  });

  b.match({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Match each term with its meaning.",
    pairs: [
      ["Population", "The whole group being studied"],
      ["Sample", "Part of the group, selected to represent it"],
      ["Census", "A survey of every member of the group"],
      ["Frequency", "The number of times a value occurs"],
    ],
    explanation: "These four terms are the vocabulary of every statistics question.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each item with the best description of the data.",
    pairs: [
      ["The colour of each car in a car park", "Qualitative"],
      ["The number of eggs laid by each hen in a week", "Quantitative, discrete"],
      ["The mass of each calf at birth", "Quantitative, continuous"],
      ["Population figures taken from a ZIMSTAT report", "Secondary"],
    ],
    explanation: "Categories are qualitative; counts are discrete; measurements are continuous; data taken from published reports are secondary.",
  });

  b.short({
    d: 2, skill: "RECALL", calculator: false, daily: true,
    stem: "What name is given to a survey that collects data from every member of a population? (one word)",
    accepted: ["census", "a census"],
    explanation: "A census covers the whole population; a sample survey covers only part of it.",
  });

  b.short({
    d: 2, skill: "RECALL", calculator: false,
    stem: "Data collected first-hand by an investigator for their own purpose are called what type of data? (one word)",
    accepted: ["primary", "primary data"],
    wrong: ["secondary"],
    explanation: "Primary data are collected by the user; secondary data come from existing sources.",
  });

  b.short({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "The number of learners absent from a class each day is recorded. Is this variable discrete or continuous? (one word)",
    accepted: ["discrete", "quantitative discrete", "discrete data"],
    wrong: ["continuous"],
    explanation: "Absences are counted and can only be whole numbers, so the data are quantitative and discrete.",
  });

  {
    const f = 4 * 5 + 2;
    chk(f, 22);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "A tally for one category shows four complete gates of five and two more single strokes. What is the frequency?",
      value: f, wrong: [6, 18],
      explanation: "Each gate is 5 observations: 4 × 5 + 2 = 22. Counting the gates and strokes as single marks gives 6.",
    });
  }

  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "A frequency table for 40 learners' favourite sports gives soccer 12, netball 9, athletics x and volleyball 7. Find x.",
    value: 40 - 12 - 9 - 7, wrong: [28, 40 - 12 - 9],
    explanation: "The frequencies add up to 40: 12 + 9 + x + 7 = 40, so x = 12.",
    hints: ["The total of the frequencies is the number of learners."],
  });

  b.fib({
    d: 3, skill: "UNDERSTANDING", calculator: false,
    stem: "A learner's height is measured and recorded as 157 cm, correct to the nearest centimetre. Between which two values does the true height lie?",
    template: "from {{blank:lo}} cm up to (but not including) {{blank:hi}} cm",
    blanks: [{ id: "lo", input: "number", accepted: [156.5], wrong: "156" }, { id: "hi", input: "number", accepted: [157.5], wrong: "158" }],
    explanation: "Height is continuous, so 157 cm (to the nearest cm) means 156.5 ≤ h < 157.5.",
    hints: ["Go half a unit below and above the recorded value."],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A farmer near Masvingo plans to use the district's published rainfall records from the last 20 years to decide when to plant. Give one advantage and one disadvantage of using these secondary data.",
    points: [
      "Advantage: cheap and quick to obtain, and cover many years that he could not measure himself.",
      "Disadvantage: may not match his own farm exactly (measured elsewhere), may be out of date or have unknown errors in how they were collected.",
    ],
    modelAnswer: "Advantage: the records already exist, so they cost little and give 20 years of data at once. Disadvantage: the rain gauge was not on his farm, so local rainfall may differ, and he cannot check how carefully the data were collected.",
    explanation: "Link each point to the farmer's situation.",
    hints: ["Think about cost and time, and about how well the data fit his farm."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Ages are usually given in whole years, for example 16. Explain why age is nevertheless continuous data.",
    points: [
      "Age is a measure of time since birth, and time can take any value in a range.",
      "Giving age in completed years is only rounding (down); the true age lies anywhere from 16 up to 17.",
    ],
    modelAnswer: "Age is the time that has passed since birth, which is measured, not counted, and can be any value. Saying '16' just rounds the age down to whole years: the person's actual age is somewhere between 16 and 17 years.",
    explanation: "Whether data are continuous depends on how the quantity behaves, not on how it is recorded.",
    hints: ["Is age counted or measured?"],
  });

  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "Nyasha wants to know the masses of the oranges sold at Mbare market. She weighs 60 oranges chosen from different stalls, recording each mass to the nearest 10 g.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "What type of data is the mass of an orange?", options: [
        ["Quantitative and continuous", "Correct: mass is measured."],
        ["Quantitative and discrete", "Masses are not restricted to separate values; recording to 10 g only rounds them."],
        ["Qualitative", "Mass is a number, not a category."],
        ["Qualitative and discrete", "Qualitative data are not split into discrete and continuous."],
      ], answer: "A", explanation: "Mass is measured, so it is quantitative and continuous." }),
      P.short({ label: "(b)", marks: 1, stem: "Are Nyasha's data primary or secondary? (one word)", accepted: ["primary", "primary data"], wrong: ["secondary"],
        explanation: "She collects the masses herself for her own investigation." }),
      P.num({ label: "(c)", marks: 1, stem: "One orange is recorded as 240 g. What is the least possible mass of that orange?", value: 235, unit: "g", wrong: [230, 239],
        explanation: "To the nearest 10 g, 240 g means 235 g ≤ m < 245 g." }),
      P.num({ label: "(d)", marks: 1, stem: "In her tally, the class 200 g to 250 g has three gates of five and four extra strokes. What is its frequency?", value: 19, wrong: [7, 15],
        explanation: "3 × 5 + 4 = 19." }),
      P.manual({ label: "(e)", marks: 2, stem: "State the population for this investigation, and give one reason why Nyasha uses a sample.",
        points: ["Population: all the oranges sold at Mbare market (at that time).", "Reason: weighing every orange would take too long or be impractical; a sample is quicker and cheaper."],
        modelAnswer: "The population is all the oranges for sale at Mbare market. She uses a sample because there are far too many oranges to weigh them all in the time she has.",
        explanation: "The population is the whole group of interest; samples save time and cost." }),
    ],
    explanation: "Classify the variable, identify the source, use the rounding to find bounds, read the tally in fives, and name the population.",
    hints: ["Mass is measured.", "Each gate in a tally is 5."],
  });

  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: false,
    stem: "A school in Gweru has 600 learners. The head wants to find out how many people live in each learner's home. She gives a questionnaire to 50 learners.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "What is the size of the sample?", value: 50, wrong: [600],
        explanation: "The sample is the 50 learners who receive the questionnaire." }),
      P.num({ label: "(b)", marks: 1, stem: "What fraction of the population is sampled? Give your answer as a fraction or correct to 3 significant figures.", value: 50 / 600, wrong: [12],
        explanation: "50 ÷ 600 = 1/12 ≈ 0.0833." }),
      P.short({ label: "(c)", marks: 1, stem: "Is the number of people living in a home discrete or continuous data? (one word)", accepted: ["discrete", "quantitative discrete"], wrong: ["continuous"],
        explanation: "People are counted, so the data are discrete." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give one advantage and one disadvantage of using a sample rather than a census here.",
        points: ["Advantage: quicker and cheaper; fewer questionnaires to hand out and analyse.", "Disadvantage: the results are only an estimate and may not represent all 600 learners (sampling error or bias)."],
        modelAnswer: "A sample of 50 is much quicker and cheaper to collect and analyse than 600 questionnaires. However, the 50 learners may not be typical of the whole school, so the results are only estimates.",
        explanation: "Samples trade accuracy for time and cost." }),
    ],
    explanation: "Distinguish the sample (50) from the population (600), classify the variable, and weigh a sample against a census.",
    hints: ["The population is all 600 learners."],
  });

  b.card("DEFINITION", "Population", "The whole set of people or items about which information is wanted.");
  b.card("DEFINITION", "Sample", "Part of a population, selected so that information about the population can be obtained from it.");
  b.card("DEFINITION", "Census", "A survey that collects data from every member of the population.");
  b.card("DEFINITION", "Primary data", "Data collected first-hand by the user for a particular purpose (questionnaires, counts, experiments).");
  b.card("DEFINITION", "Secondary data", "Data collected by someone else and reused (published reports, records, newspapers).");
  b.card("CONCEPT", "Qualitative and quantitative data", "Qualitative: categories (colour, language). Quantitative: numbers from counting or measuring.");
  b.card("CONCEPT", "Discrete and continuous data", "Discrete: separate values, usually counted. Continuous: any value in a range, measured (height, mass, time).");
  b.card("FACT", "Tally", "One stroke per observation; every fifth stroke crosses the previous four to make a gate of 5.");
  b.card("FACT", "Recorded continuous values", "157 cm to the nearest cm means 156.5 cm ≤ h < 157.5 cm.");
});
