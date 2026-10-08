// Slice G3b: human fieldwork (sampling, questionnaires, counts, surveys, school population data).
import { concept, P, geographyLevels, ZIM } from "../lib.mjs";

concept("geo.fieldwork.human-fieldwork", { file: "fieldwork/human-fieldwork", keyPrefix: "fieldwork.human-fieldwork" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Students interview **every 5th person** who walks out of a supermarket. Which sampling method are they using?",
    options: [
      ["Systematic sampling", "Correct: people are chosen at a regular interval (every 5th)."],
      ["Random sampling", "In random sampling every person has an equal chance, for example using random numbers; a fixed interval is systematic."],
      ["Stratified sampling", "Stratified sampling divides the population into groups and samples each in proportion."],
      ["Opportunistic sampling", "Opportunistic sampling takes whoever is available and willing, with no fixed rule."],
    ],
    answer: "A",
    explanation: "Systematic sampling chooses at regular intervals: every nth person, house or metre.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main purpose of a **pilot survey**?",
    options: [
      ["To test the questionnaire or method and fix problems before the main survey", "Correct: a small trial reveals unclear questions or practical problems."],
      ["To collect the final results quickly so that no main survey is needed", "A pilot is only a trial; its results are not the main data."],
      ["To choose which hypothesis the investigation should prove correct", "Hypotheses are written before planning, and are tested, not chosen to be proved."],
      ["To present the results of the survey on graphs and maps", "Presentation comes after data collection."],
    ],
    answer: "A",
    explanation: "A pilot survey is a small trial run. It shows whether questions are understood, how long the survey takes and whether the recording sheet works.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **closed** question for a questionnaire?",
    options: [
      ["How did you travel here today: walk, kombi, bus or car?", "Correct: the person chooses from fixed answers, which are easy to count and graph."],
      ["What do you think of the facilities at this market?", "This invites the person to answer in their own words: an open question."],
      ["Why did you choose to shop here rather than in town?", "A 'why' question with no set answers is open."],
      ["What changes would you like to see in this area?", "This allows any answer in the person's own words: open."],
    ],
    answer: "A",
    explanation: "Closed questions offer set answers (tick boxes, yes/no, choices). Open questions allow free answers: richer detail but harder to analyse.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A village has three areas of very different size. Which sampling method makes sure that each area is represented **in proportion to its size**?",
    options: [
      ["Stratified sampling", "Correct: the population is divided into groups and each group is sampled in proportion."],
      ["Systematic sampling", "A regular interval does not guarantee each area gets its fair share."],
      ["Opportunistic sampling", "Asking whoever is available may miss whole areas."],
      ["Random sampling", "Random sampling is fair to individuals but, by chance, may under-represent a small area."],
    ],
    answer: "A",
    explanation: "Stratified sampling: divide into strata (areas, age groups, Forms), then sample each in proportion to its share of the total.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which question should be **removed** from a questionnaire because it is a leading question?",
    options: [
      ["Don't you agree that the bus terminus is too dirty?", "Correct: it suggests the answer the interviewer wants, so replies are biased."],
      ["How often do you use the bus terminus each week?", "This is neutral and gives a countable answer."],
      ["Which suburb have you travelled from today?", "This is neutral and can be mapped as desire lines."],
      ["How would you rate the cleanliness of the terminus from 1 to 5?", "This is a neutral rating scale; it does not push the answer."],
    ],
    answer: "A",
    explanation: "Leading questions push people towards an answer. Rewrite them neutrally, for example as a rating scale.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "To find out how residents of a suburb travel to work, students questioned 120 people at one kombi rank between 06:30 and 07:30. Why are the results likely to be **biased**?",
    options: [
      ["People at a kombi rank are likely to travel by kombi", "Correct: the place chosen over-represents kombi users and misses people who walk, drive or work at home."],
      ["120 people is too few for any kind of questionnaire", "120 is a reasonable sample size; the problem is where and when they were asked."],
      ["Questionnaires cannot be used to study how people travel", "Questionnaires are a standard way to collect travel data."],
      ["The survey was carried out during the morning rush hour", "Asking at rush hour is sensible for commuters; the bias comes from the location."],
    ],
    answer: "A",
    hints: ["Who is most likely to be standing at a kombi rank?", "A large sample can still be unrepresentative."],
    explanation: "Sampling location and timing can bias results even when the sample is large. Sampling households across the suburb (systematic or stratified) would be more representative.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Traffic was counted at ten road junctions around a town. Which method best shows **both** the counts and where they were taken?",
    options: [
      ["A flow-line map with line widths in proportion to the counts", "Correct: line width shows volume, and the lines follow the roads, so location is shown too."],
      ["A pie chart of the total traffic at all ten junctions", "A pie chart shows proportions but not where each junction is."],
      ["A line graph of the counts in order of junction number", "Junction numbers are categories, and a line graph does not show location."],
      ["A table of the counts sorted from highest to lowest", "A table gives values but not their geographical pattern."],
    ],
    answer: "A",
    explanation: "Flow-line maps (or located bar graphs) combine the size of each flow with its position on the map.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Students walked outward from the centre of a town recording land use and building height. Which observation best suggests they had reached the **edge of the CBD**?",
    options: [
      ["Shops and offices gave way to houses, and buildings became lower", "Correct: the CBD edge is where commercial land use and tall buildings end."],
      ["The number of pedestrians rose sharply between two sites", "Pedestrian numbers usually fall as you leave the CBD, not rise."],
      ["Several banks and large stores lined both sides of the street", "Banks and large stores are typical of the core of the CBD."],
      ["Building heights increased to six or more storeys", "Tall buildings are found inside the CBD, where land is most expensive."],
    ],
    answer: "A",
    hints: ["What land uses and building heights are typical of a CBD?", "Look for a change away from those features."],
    explanation: "The CBD has shops, offices and tall buildings; its edge is marked by a change to housing or industry and lower buildings, together with falling pedestrian counts.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Shoppers' home areas are drawn as **desire lines** to a shopping centre. What do the lines mainly show?",
    options: [
      ["The sphere of influence of the shopping centre", "Correct: the lines show the area from which the centre draws its customers."],
      ["The roads that shoppers actually used on their journeys", "Desire lines are straight lines from origin to destination, not actual routes."],
      ["The amount of money each shopper spent at the centre", "Spending is not shown by desire lines."],
      ["The number of shops in each of the home areas", "Desire lines start at homes; they do not count shops."],
    ],
    answer: "A",
    explanation: "Desire lines join each person's origin to the destination. Together they outline the sphere of influence (catchment area).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Opportunistic sampling is free from bias because people choose for themselves whether to take part.",
    answer: false,
    explanation: "False. Opportunistic sampling is quick but likely to be biased: people who are willing or available (for example those not in a hurry) may not represent the whole population.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A population pyramid drawn from a school census shows the number or percentage of pupils by **age group and sex**.",
    answer: true,
    explanation: "True. A population pyramid has age groups on the vertical axis and males and females on either side of a central axis.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sampling method with an example.",
    pairs: [
      ["Random", "Drawing house numbers out of a hat"],
      ["Systematic", "Surveying every 10th house along a road"],
      ["Stratified", "Sampling each Form in proportion to its size"],
      ["Opportunistic", "Asking anyone who is willing to stop"],
    ],
    explanation: "Random: equal chance by lottery or random numbers. Systematic: regular interval. Stratified: groups sampled in proportion. Opportunistic: whoever is available.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A road has 360 houses. Students want a systematic sample of 24 houses. What sampling **interval** should they use (survey every nth house)?",
    value: 15,
    wrong: [24, 8640],
    explanation: "Interval = number of houses ÷ sample size = 360 ÷ 24 = 15, so survey every 15th house after a random start between 1 and 15.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A school has 800 pupils: Form 1 = 240, Form 2 = 220, Form 3 = 180, Form 4 = 160 (fictional numbers). A stratified sample of 40 pupils is taken. How many pupils should come from **Form 3**?",
    value: 9,
    wrong: [10, 18],
    hints: ["What fraction of the whole school is the sample?", "Apply the same fraction to Form 3."],
    workedSolution: "1. Sample fraction = 40 ÷ 800 = 0.05 (5%).\n2. Form 3 sample = 180 × 0.05 = 9 pupils.",
    explanation: "Stratified sampling takes the same fraction (5%) of every Form: 180 × 40 ÷ 800 = 9.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A street was scored on six criteria using a bi-polar scale from −3 to +3 (fictional data). The scores were +2, −1, +3, 0, −2 and +1. What is the **total** environmental quality score?",
    value: 3,
    wrong: [-3, 9],
    explanation: "Add the scores, keeping the signs: 2 − 1 + 3 + 0 − 2 + 1 = 3.",
  });
  b.num({
    d: 3, skill: "APPLICATION", unit: "%",
    stem: "In a questionnaire of 48 shoppers (fictional data), 18 said they travelled by kombi. What **percentage** travelled by kombi?",
    value: 37.5, tol: 0.05,
    wrong: [18, 2.67],
    hints: ["Percentage = part ÷ total × 100."],
    explanation: "18 ÷ 48 × 100 = 37.5%.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A question with fixed answers to choose from is a {{blank:a}} question. A question that lets people answer in their own words is an {{blank:b}} question.",
    blanks: [
      { id: "a", accepted: ["closed"], choices: ["closed", "open", "leading", "pilot"] },
      { id: "b", accepted: ["open"], choices: ["closed", "open", "leading", "pilot"] },
    ],
    explanation: "Closed questions are easy to count and graph; open questions give richer detail but are harder to analyse.",
  });
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 3,
    stem: "Describe how students should carry out a **pedestrian count** at several sites so that the results can be compared fairly.",
    points: [
      "Counts last the same length of time at every site (for example 10 minutes).",
      "Counts are taken at the same time of day / on the same day at every site (or at the same set of times).",
      "Use a tally sheet and a clear rule on what counts (for example people passing a line in both directions).",
    ],
    modelAnswer: "At every site count for 10 minutes at 10:00 on the same weekday, using a tally sheet, counting everyone who passes an agreed line in both directions.",
    explanation: "Fair comparison needs the same duration, comparable timing and a consistent counting rule.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3, applies: ZIM,
    stem: "Describe how you could collect **population data** about the pupils in your school for a population pyramid.",
    hints: ["What two pieces of information does a pyramid need for each person?", "How would you make sure every class is included?"],
    points: [
      "Design a simple form / census sheet recording each pupil's age (or age group) and sex.",
      "Collect it from every class (a full census) or from a stratified sample of each Form.",
      "Tally the totals by age group and sex (and convert to percentages) ready to draw the pyramid.",
    ],
    modelAnswer: "Prepare a census sheet asking for age and sex only (no names). Give it to every class with the teacher's permission, then tally males and females in each age group and work out percentages to draw the pyramid.",
    explanation: "A pyramid needs age and sex; a census of every class (or a stratified sample) gives representative data.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 780,
    stem: "Students asked 50 shoppers at a fictional market how they had travelled there (fictional data).\n\n| Transport | Walk | Kombi | Bus | Car | Other |\n|---|---|---|---|---|---|\n| Number of shoppers | 14 | 21 | 6 | 7 | 2 |",
    hints: ["Percentage = number ÷ 50 × 100."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage of shoppers who travelled by kombi.", value: 42, wrong: [21], explanation: "21 ÷ 50 × 100 = 42%." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage who walked.", value: 28, wrong: [14], explanation: "14 ÷ 50 × 100 = 28%." }),
      P.mcq({
        label: "(c)", stem: "Which graph is most suitable for showing these results as proportions of all shoppers?",
        options: [
          ["A pie chart", "Correct: each type of transport is a share of the total of 50."],
          ["A scatter graph", "Scatter graphs test relationships between two continuous variables."],
          ["A line graph", "Line graphs show continuous change, for example over time."],
          ["A cross-section", "Cross-sections show the shape of a river channel or slope."],
        ],
        answer: "A", explanation: "Proportions of a whole suit a pie chart (a divided bar or bar graph would also work).",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** reasons why most shoppers travelled by kombi.",
        points: ["Kombis are cheaper than owning or using a car / most shoppers do not own cars.", "Kombis run frequently on routes to the market / shoppers live too far to walk / can carry goods."],
        modelAnswer: "Few shoppers own cars and kombis are affordable, and they run often on the main routes from the suburbs to the market.",
        explanation: "Reasons link transport choice to cost, car ownership, distance and service frequency.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe how the students could choose the 50 shoppers using **systematic** sampling.",
        points: ["Stand at the market entrance (or exits) and ask every nth person (for example every 5th) who leaves.", "Continue at set times through the day until 50 people have answered (replacing refusals with the next person)."],
        modelAnswer: "Stand at the main exit and ask every 5th shopper who leaves, spreading the survey over the morning and afternoon until 50 people have answered.",
        explanation: "Systematic sampling uses a fixed interval and a clear rule for whom to ask.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "The students also asked *Which suburb have you come from?* Explain how they could map the answers and what the map would show.",
        points: ["Draw desire lines from each shopper's home suburb to the market (on a base map).", "The map shows the sphere of influence / catchment area of the market (how far and from which directions customers come)."],
        modelAnswer: "Draw a straight desire line from each home suburb to the market on a map. The lines show the market's sphere of influence: the area and directions its customers come from.",
        explanation: "Desire lines outline the catchment area.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Give **two** pieces of good practice when interviewing shoppers in a public place.",
        points: ["Introduce yourselves, explain the purpose and keep the survey short / be polite and thank people.", "Do not ask for names or personal details / work in pairs or groups for safety / avoid leading questions."],
        modelAnswer: "Explain who you are and why you are asking, and keep it short. Do not ask for names, and work in pairs.",
        explanation: "Ethical and safe practice: consent, anonymity, politeness and working in groups.",
      }),
    ],
    explanation: "This item practises percentages from survey data, choosing a graph, sampling, mapping desire lines and ethical survey practice.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", secs: 720, applies: ZIM,
    stem: "A Form 3 class carried out a census of the 200 pupils at their school (fictional data).\n\n| Age group (years) | Males | Females |\n|---|---|---|\n| 18 and over | 14 | 12 |\n| 16-17 | 24 | 26 |\n| 14-15 | 30 | 34 |\n| 12-13 | 28 | 32 |",
    hints: ["Add down each column to find the totals.", "A school pyramid only covers school ages."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage of the school's pupils who are female.", value: 52, wrong: [104, 48], explanation: "Females = 12 + 26 + 34 + 32 = 104; 104 ÷ 200 × 100 = 52%." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage of all pupils in the 16-17 age group.", value: 25, wrong: [50, 12], explanation: "16-17 = 24 + 26 = 50 pupils; 50 ÷ 200 × 100 = 25%." }),
      P.mcq({
        label: "(c)", stem: "Which bar would be the **longest** on the pyramid?",
        options: [
          ["Females aged 14-15", "Correct: 34 is the largest value in the table."],
          ["Females aged 12-13", "32 is the second largest value."],
          ["Males aged 14-15", "30 is smaller than 34."],
          ["Males aged 12-13", "28 is smaller than 34."],
        ],
        answer: "A", explanation: "The largest single value is 34 (females, 14-15).",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe how the class should have collected these data so that they are complete and reliable.",
        points: ["Prepare one census form asking for age and sex (no names).", "Give it to every class, with the teacher's permission, at the same time / on one day so no pupil is counted twice or missed.", "Check the class totals against registers and tally carefully (double-check the tally)."],
        modelAnswer: "Make an anonymous form asking only age and sex, hand it to every class on the same morning with teachers' help, then check each class total against the register before tallying.",
        explanation: "A full, anonymous census on one day, checked against registers, avoids double counting and gaps.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why this pyramid would look very different from a pyramid of Zimbabwe's whole population.",
        points: ["The school pyramid only includes ages of about 12 to 19 (no young children or adults).", "So it has no wide base of children under 12 and no older age groups / its shape reflects enrolment, not births and deaths."],
        modelAnswer: "The school only contains teenagers aged about 12 to 19, so the pyramid has no bars for young children or adults. The national pyramid includes all ages and is shaped by births, deaths and migration.",
        explanation: "A school sample covers a narrow age range, so it cannot show the national structure.",
      }),
    ],
    explanation: "School census data practise percentages and pyramid reading, and show the limits of a sample that covers only school ages.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the usefulness of **questionnaires** for investigating where people shop and why.",
    hints: ["What can questionnaires find out that counts cannot?", "Think about bias, honesty, sample size and analysis."],
    points: [
      "Strength: they give data on origins, frequency, mode of travel and reasons that cannot be observed.",
      "Strength: closed questions are quick to answer and easy to tally and graph; origins can be mapped as desire lines.",
      "Weakness: sampling bias (location, time, who agrees to answer) can make results unrepresentative.",
      "Weakness: people may not answer honestly, misunderstand questions or refuse; leading questions bias answers.",
      "Weakness: open answers are slow to analyse; large samples take time and need several interviewers.",
      "Judgement: useful if piloted, neutral, anonymous and with a systematic or stratified sample across times and days.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Questionnaires are very useful because they reveal things that cannot be counted, such as where shoppers live, how often they come and why they choose a centre. Closed questions are quick and easy to graph, and home areas can be mapped as desire lines to show the sphere of influence. However, the results depend on the sample: asking only at one entrance or at one time can bias them, and some people refuse or give careless or polite rather than honest answers. Open questions take a long time to analyse. Overall, questionnaires are the best tool for this kind of question if they are piloted, use neutral anonymous questions and sample systematically across different times and days.",
    explanation: "A balanced evaluation gives strengths and weaknesses, then a supported judgement.",
  });

  b.card("DEFINITION", "**Random** sampling", "Every member of the population has an equal chance of being chosen (lottery, random numbers).", undefined);
  b.card("DEFINITION", "**Systematic** sampling", "Choosing at regular intervals, such as every 10th house or every 5th person.", "Interval = population ÷ sample size.");
  b.card("DEFINITION", "**Stratified** sampling", "Dividing the population into groups and sampling each group in proportion to its size.", "E.g. 5% of each Form in a school.");
  b.card("DEFINITION", "**Pilot survey**", "A small trial of a questionnaire or method to find and fix problems before the main survey.", undefined);
  b.card("CONCEPT", "Open vs closed questions", "Closed: fixed answers, easy to count and graph. Open: own words, richer but harder to analyse.", undefined);
  b.card("DEFINITION", "**Desire lines**", "Straight lines joining people's origins to a destination; together they show its sphere of influence.", undefined);
  b.card("DEFINITION", "**Bi-polar survey**", "Scoring a place on criteria between two opposite descriptions (e.g. −2 very noisy to +2 very quiet) and totalling the scores.", "Subjective: keep the same scorers or use means.");
  b.card("CONCEPT", "Fair pedestrian and traffic counts", "Same length of count, same times of day, a tally sheet and an agreed counting rule at every site.", undefined);
  b.card("CONCEPT", "Delimiting the CBD in the field", "Record land use and building height along transects from the centre; the edge is where shops and offices give way to housing and buildings get lower.", undefined);
});
