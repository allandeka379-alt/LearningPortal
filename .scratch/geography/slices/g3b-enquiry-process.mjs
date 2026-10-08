// Slice G3b: fieldwork, the route to geographical enquiry (Cambridge S.5).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.fieldwork.enquiry-process", { file: "fieldwork/enquiry-process", keyPrefix: "fieldwork.enquiry-process" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement is a **testable hypothesis** for a fieldwork investigation?",
    options: [
      ["The number of pedestrians decreases with distance from the town centre.", "Correct: it names two variables (pedestrian numbers and distance) and the expected relationship, so counts can show it to be right or wrong."],
      ["Pedestrians in the town centre are an interesting topic to study.", "This is an opinion about the topic; nothing can be measured to prove or disprove it."],
      ["To find out how many pedestrians use the streets of the town.", "This is an aim (what the study sets out to do), not a statement that can be tested."],
      ["How do pedestrian numbers vary in different parts of the town?", "This is a question; a hypothesis is a statement giving the expected answer."],
    ],
    answer: "A",
    explanation: "A hypothesis is a statement that data can show to be true or false. It names two variables and the direction of the relationship (increases, decreases, is greater than).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is **primary** data for a study of a river?",
    options: [
      ["Depth readings taken with a metre rule at each site", "Correct: the investigator collected these measurements in the field."],
      ["River flow records downloaded from a water authority website", "Someone else collected these, so they are secondary data."],
      ["Contour patterns read from a published topographical map", "A published map is a secondary source."],
      ["A rainfall table copied from a textbook on the area", "Data taken from a book are secondary."],
    ],
    answer: "A",
    explanation: "Primary data are collected first-hand by the investigator (measurements, counts, questionnaires, field sketches). Secondary data come from published or other people's sources (maps, census reports, websites).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the route to geographical enquiry, which stage comes **directly after** collecting the data?",
    options: [
      ["Presenting the data in tables, graphs and maps", "Correct: data are organised and presented before they can be analysed."],
      ["Writing the hypotheses for the investigation", "Hypotheses come first, before planning and collecting data."],
      ["Evaluating the reliability of the methods used", "Evaluation is the final stage, after the conclusion."],
      ["Drawing a conclusion about the hypothesis", "A conclusion needs the presented and analysed data first."],
    ],
    answer: "A",
    explanation: "The stages are: question and hypotheses → planning (including risk assessment) → data collection → presentation → analysis and interpretation → conclusion → evaluation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A student's hypothesis is *Pebble size decreases with distance downstream.* Which is the matching **null hypothesis**?",
    options: [
      ["There is no relationship between pebble size and distance downstream.", "Correct: a null hypothesis states that there is no relationship between the two variables."],
      ["There is a strong relationship between pebble size and distance downstream.", "This claims a relationship exists, which is the opposite of a null hypothesis."],
      ["Pebbles become more rounded with increasing distance downstream from the source.", "This is a different hypothesis about pebble shape, not size."],
      ["Pebble size is measured in millimetres along the longest axis of each pebble.", "This is part of the method, not a hypothesis."],
    ],
    answer: "A",
    explanation: "The null hypothesis assumes no relationship. If the data show a clear pattern, the null hypothesis is rejected and the hypothesis is supported.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Students timed a float over 10 m once at each river site. Which change would most improve the **reliability** of their velocity results?",
    options: [
      ["Time the float three times at each site and use the mean", "Correct: repeating readings and averaging reduces the effect of one unusual reading, so results are more consistent."],
      ["Measure the width of the channel at each of the sites", "Width is a different variable; it does not make the velocity readings more consistent."],
      ["Visit fewer sites so there is more time at the river", "Fewer sites gives less evidence, which makes the study less reliable."],
      ["Record the results in pen on a printed recording sheet", "Neat recording helps organisation but does not change the readings themselves."],
    ],
    answer: "A",
    explanation: "Reliability means the method gives consistent results if repeated. Repeating each measurement and calculating the mean is the standard way to improve it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A class measured **noise level** (decibels) and **distance from a main road** (m) at 15 points. Which method of presentation is best for testing whether noise falls with distance?",
    options: [
      ["A scatter graph of noise level against distance", "Correct: a scatter graph shows whether two continuous variables are related and how strongly."],
      ["A pie chart of noise levels at the fifteen points", "A pie chart shows parts of a whole; noise levels are not proportions of a total."],
      ["A bar graph of the number of points in each street", "This shows how points were spread between streets, not the link between noise and distance."],
      ["A field sketch of the road and the nearby buildings", "A sketch shows what the place looks like but cannot test a relationship between two measured variables."],
    ],
    answer: "A",
    hints: ["Both variables are measured as numbers on a continuous scale.", "Which graph places one variable on each axis and plots a point for each site?"],
    explanation: "Use a scatter graph (with a best-fit line) to test a relationship between two continuous variables. A downward slope would support the hypothesis that noise decreases with distance.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "In a risk assessment for a beach survey, which precaution matches the hazard **being cut off by the incoming tide**?",
    options: [
      ["Check the tide times and finish before high tide", "Correct: knowing when the tide rises lets the group leave the beach in time."],
      ["Wear sunscreen and a hat during the survey", "This protects against sunburn, a different hazard."],
      ["Wear strong shoes with a good grip", "This reduces the risk of slipping on rocks, not of being cut off."],
      ["Carry a first aid kit for small cuts", "First aid deals with injuries after they happen; it does not prevent being cut off."],
    ],
    answer: "A",
    explanation: "Each hazard needs its own precaution. Tides: check tide tables and stay within sight of the exit route; slipping: grip shoes; sun: hats and water; cuts: first aid kit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Hypothesis: *Channel width increases downstream.* Results from six sites (fictional data), site 1 furthest upstream:\n\n| Site | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Width (m) | 1.4 | 1.9 | 2.6 | 2.2 | 3.1 | 3.5 |\n\nWhich conclusion is best?",
    options: [
      ["Partly accepted: width rises overall, but site 4 is narrower than site 3", "Correct: the general trend supports the hypothesis, but one site does not fit, so it is accepted with an exception."],
      ["Fully accepted: the width increases at every single site downstream", "Site 4 (2.2 m) is narrower than site 3 (2.6 m), so the increase is not at every site."],
      ["Rejected: the width at site 4 shows that there is no pattern", "One anomaly does not cancel a clear overall trend from 1.4 m to 3.5 m."],
      ["Rejected: the width falls overall from the first site to the last", "Width rises from 1.4 m at site 1 to 3.5 m at site 6."],
    ],
    answer: "A",
    hints: ["Compare the first and last values, then check each step.", "Is there any site where the width goes down?"],
    explanation: "Width increases from 1.4 m to 3.5 m overall, but falls from 2.6 m to 2.2 m between sites 3 and 4. A good conclusion says the hypothesis is partly (or largely) accepted and names the anomaly.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A group did all its traffic counts on one Sunday afternoon to test whether traffic is heavier near the town centre. What is the **main weakness** of this method?",
    options: [
      ["Sunday traffic may not be typical of the rest of the week", "Correct: counts on a single, unusual day may not represent normal conditions, so the results may not be reliable."],
      ["Counting vehicles is a type of secondary data collection", "Counting vehicles in the field is primary data."],
      ["Traffic counts cannot be shown on any kind of graph", "Counts can be shown on bar graphs, located bar graphs or flow-line maps."],
      ["A hypothesis about traffic can never be tested by counting", "Counts are exactly the data needed to test this hypothesis."],
    ],
    answer: "A",
    hints: ["Think about when the data were collected.", "Would the results be the same on a weekday morning?"],
    explanation: "Timing matters. Counts on one Sunday afternoon miss weekday commuter and delivery traffic. Counting at several times on different days, then using means, gives more representative results.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Population figures taken from a national census report are an example of **secondary** data.",
    answer: true,
    explanation: "True. The census was collected by a government agency, not by the investigator, so it is secondary data.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Taking several readings at the same site and calculating the mean mainly improves the **accuracy** of the instrument used.",
    answer: false,
    explanation: "False. Repeating readings improves **reliability** (consistency) by reducing the effect of a single odd reading. Accuracy depends on how close a reading is to the true value, which a better instrument or technique improves.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of an enquiry with the activity that belongs to it.",
    pairs: [
      ["Planning", "Choosing sites and writing a risk assessment"],
      ["Presentation", "Drawing a scatter graph of the results"],
      ["Analysis", "Describing the trend and identifying anomalies"],
      ["Evaluation", "Suggesting how the method could be improved"],
    ],
    explanation: "Planning decides where and how; presentation turns data into graphs and maps; analysis describes and explains patterns; evaluation judges the method and suggests improvements.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A statement of what a study sets out to find out is its {{blank:a}}. A statement that can be tested and shown to be true or false is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["aim"], choices: ["aim", "hypothesis", "conclusion", "evaluation"] },
      { id: "b", accepted: ["hypothesis"], choices: ["aim", "hypothesis", "conclusion", "evaluation"] },
    ],
    explanation: "The **aim** says what the study is about (\"to investigate…\"); a **hypothesis** predicts a result that the data can test.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "Five students counted pedestrians passing the same point for 10 minutes each (fictional data): 46, 52, 49, 41 and 57. Calculate the **mean** count.",
    value: 49,
    wrong: [52, 245],
    explanation: "Mean = total ÷ number of counts = (46 + 52 + 49 + 41 + 57) ÷ 5 = 245 ÷ 5 = 49 pedestrians.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "A float took 12.4 s, 13.1 s and 11.8 s to travel 10 m along a stream (fictional data). Calculate the mean surface **velocity** in m/s. Give your answer to two decimal places.",
    value: 0.804289544235925, answer: "0.80", tol: 0.005, unit: "m/s",
    wrong: [0.08, 12.43],
    hints: ["First find the mean time.", "Velocity = distance ÷ time."],
    workedSolution: "1. Mean time = (12.4 + 13.1 + 11.8) ÷ 3 = 37.3 ÷ 3 = 12.43 s.\n2. Velocity = distance ÷ time = 10 ÷ 12.43 = 0.80 m/s.",
    explanation: "Average the three times first (12.43 s), then divide the distance by it: 10 ÷ 12.43 ≈ 0.80 m/s.",
  });
  b.manualShort({
    d: 2, skill: "APPLICATION", marks: 4,
    stem: "A class plans to measure a small river near their school. Identify **two** hazards and, for each, state a precaution.",
    points: [
      "Identifies a hazard such as deep or fast water, slippery rocks, polluted water or disease (for example bilharzia), or traffic on the way to the site.",
      "States a matching precaution for the first hazard (for example stay out of water above knee depth; work in groups).",
      "Identifies a second, different hazard.",
      "States a matching precaution for the second hazard (for example wear boots with grip; cover cuts and wash hands).",
    ],
    modelAnswer: "Fast, deep water could sweep someone away, so students stay out of water above knee depth and work in groups. Polluted water may cause infection, so cuts are covered, boots are worn and hands are washed afterwards.",
    explanation: "Each precaution must match its hazard. Generic advice such as \"be careful\" does not earn credit.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A student measured river depth at only one point in the middle of the channel at each site. Suggest how the method could be improved and explain why your changes would give better results.",
    hints: ["Is the river equally deep all the way across?", "How could the readings across the channel be combined?"],
    points: [
      "Suggests measuring depth at regular intervals across the channel (for example every 0.5 m or ten equally spaced points).",
      "Suggests calculating the mean depth (or drawing a cross-section) from these readings.",
      "Explains that the channel is shallower near the banks, so a single central reading overestimates the mean depth / is not representative.",
    ],
    modelAnswer: "Measure the depth at equal intervals across the channel, for example every 0.5 m from bank to bank, and calculate the mean. The middle is usually deepest, so one central reading overstates the average depth.",
    explanation: "Systematic readings across the channel give a representative mean depth and allow a cross-section to be drawn.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "A group investigated the hypothesis *Building height decreases with distance from the town centre.* They recorded the number of storeys of the tallest building at six points along one main road (fictional data).\n\n| Distance from centre (m) | 100 | 300 | 500 | 700 | 900 | 1100 |\n|---|---|---|---|---|---|---|\n| Storeys | 8 | 6 | 6 | 3 | 4 | 2 |",
    hints: ["Look at the overall change from 100 m to 1100 m, then check for a point that breaks the pattern."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the range of building heights (in storeys).", value: 6, wrong: [10, 8], explanation: "Range = highest − lowest = 8 − 2 = 6 storeys." }),
      P.mcq({
        label: "(b)", stem: "At which distance is the result an **anomaly** (it does not fit the general trend)?",
        options: [
          ["900 m", "Correct: the height rises from 3 to 4 storeys, against the downward trend."],
          ["500 m", "Height stays at 6 storeys, which does not go against the trend."],
          ["100 m", "This is the tallest building, as expected nearest the centre."],
          ["1100 m", "This is the lowest building, as expected furthest out."],
        ],
        answer: "A", explanation: "Heights fall from 8 to 2 storeys, except that 900 m (4) is higher than 700 m (3).",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why building height tends to decrease away from the town centre.",
        points: ["Land in the centre is most accessible, so demand and land values / rents are highest.", "Developers build upwards to make the most of expensive land; further out land is cheaper so buildings are lower and more spread out."],
        modelAnswer: "The centre is the most accessible place, so land is in high demand and expensive. Builders build tall to use the costly space; land further out is cheaper, so lower buildings are used.",
        explanation: "The bid-rent idea: high land values at the most accessible point lead to tall buildings.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Write a conclusion for the hypothesis, using data from the table.",
        points: ["States that the hypothesis is accepted / largely or partly accepted.", "Quotes the overall change (8 storeys at 100 m to 2 storeys at 1100 m).", "Mentions the anomaly at 900 m (4 storeys, higher than 3 at 700 m)."],
        modelAnswer: "The hypothesis is largely accepted: height falls from 8 storeys at 100 m to 2 storeys at 1100 m. However, 900 m (4 storeys) is taller than 700 m (3 storeys), so the decrease is not perfectly steady.",
        explanation: "A strong conclusion makes a decision, quotes data and notes the exception.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** ways to make the results more reliable.",
        points: ["Sample more points / at shorter intervals along the road.", "Survey several roads leading out of the centre in different directions (or record the mean height of several buildings at each point)."],
        modelAnswer: "Record heights every 100 m instead of every 200 m, and repeat the survey along three other roads out of the centre.",
        explanation: "More sample points and more roads reduce the chance that one unusual building or road distorts the pattern.",
      }),
    ],
    explanation: "This item practises the later stages of the enquiry route: calculating a statistic, spotting an anomaly, explaining, concluding and evaluating.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", secs: 780,
    stem: "Students tested the hypothesis *There is more litter near the bus terminus than in residential streets.* They counted litter items inside one 10 m × 10 m square at each of five sites on a Monday morning (fictional data).\n\n| Site | A (terminus) | B | C | D | E |\n|---|---|---|---|---|---|\n| Distance from terminus (m) | 0 | 200 | 400 | 600 | 800 |\n| Litter items | 34 | 12 | 27 | 8 | 19 |",
    hints: ["Check whether the values fall steadily away from the terminus.", "Think about the timing and the size of the sample."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the mean number of litter items per site.", value: 20, wrong: [100, 19], explanation: "(34 + 12 + 27 + 8 + 19) ÷ 5 = 100 ÷ 5 = 20 items." }),
      P.mcq({
        label: "(b)", stem: "Which statement about the results is correct?",
        options: [
          ["The terminus has the most litter, but litter does not fall steadily with distance", "Correct: site A has 34 items, but site C (27) has more than site B (12)."],
          ["Litter falls steadily with distance from the terminus at every site", "Site C (27) and site E (19) are higher than the sites before them."],
          ["The residential streets have more litter than the terminus does", "No residential site has more than the terminus (34)."],
          ["Every site has a litter count above the mean of the five sites", "Sites B, D and E are below the mean."],
        ],
        answer: "A", explanation: "The terminus has the highest count, supporting the hypothesis, but the decline is uneven.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** reasons why site C might have more litter than site B.",
        points: ["Suggests a local cause such as a shop, market stall, school or bus stop near site C.", "Suggests a second cause such as no bins at C / wind blowing litter / refuse not collected recently / the count being taken just before collection."],
        modelAnswer: "There may be a small shop or vendors near site C whose customers drop wrappers, and there may be no bin there.",
        explanation: "Anomalies are explained by local factors that the distance hypothesis does not include.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Identify **three** weaknesses in the method.",
        points: ["Only one square / one sample per site.", "Only five sites (small sample) / sites only along one line.", "Only one time and day (a Monday morning may not be typical, e.g. litter collected over the weekend or not)."],
        modelAnswer: "There was only one square at each site, only five sites were used, and all counts were made at one time on a Monday morning.",
        explanation: "Weaknesses usually concern sample size, number of repeats and timing.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** specific improvements and say how each would help.",
        points: ["Count in several squares at each site (or repeat on different days) and use the mean, so one unusual square or day has less effect.", "Add more sites in several directions from the terminus / use a scoring system for litter type, so the pattern is clearer and more representative."],
        modelAnswer: "Count three squares at each site and on a weekday and a weekend, then take the mean, so one odd result matters less. Add sites along roads in other directions so the results represent the whole area.",
        explanation: "Each improvement should fix a named weakness and say why it helps.",
      }),
    ],
    explanation: "The litter data support the hypothesis only in part, and the small, single-visit sample limits how far the results can be trusted.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "A student concluded from one day's measurements at four river sites that *the river gets faster downstream*. Evaluate how far this conclusion can be trusted and suggest how the investigation could be made more reliable.",
    hints: ["Consider sample size, number of readings, timing and equipment.", "Finish with a judgement: how much can the conclusion be trusted?"],
    points: [
      "Four sites is a small sample; one unusual site (pool, riffle, obstruction) can change the pattern.",
      "One day's measurements may reflect unusual flow (for example after a storm or in the dry season).",
      "Single readings at each site may be affected by error (float caught, reaction time with stopwatch).",
      "Equipment limits: a float measures surface speed only and is affected by wind; a flow meter is more accurate.",
      "Improvements: more sites at equal intervals, three or more readings per site with a mean, repeat in different seasons.",
      "Judgement: the conclusion is tentative / only partly trustworthy until the study is repeated with a larger sample.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "The conclusion can only be trusted to a limited extent. Four sites is a small sample, so one pool or fallen branch could distort the pattern. All readings were taken on one day, which may have been after heavy rain, and if only one float time was taken per site, a float caught in weeds or a slow stopwatch reaction would make a large error. Floats also measure only surface speed and are affected by wind. To improve reliability, the student should use eight to ten sites at equal intervals, take three readings per site and use the mean, use a flow meter where possible and repeat the study in the wet and dry seasons. Until then the conclusion is a reasonable but tentative finding.",
    explanation: "Evaluation weighs up sample size, repeats, timing and equipment, then reaches a judgement and proposes specific improvements.",
  });

  b.card("DEFINITION", "What is a **hypothesis**?", "A statement that can be tested with data and shown to be true or false, naming two variables and the expected relationship.", "Example: river velocity increases with distance downstream.");
  b.card("DEFINITION", "What is a **null hypothesis**?", "A statement that there is no relationship between the two variables being studied.", "If the data show a clear pattern, the null hypothesis is rejected.");
  b.card("CONCEPT", "The route to geographical enquiry", "Question and hypotheses → planning → data collection → presentation → analysis → conclusion → evaluation.", undefined);
  b.card("DEFINITION", "Primary vs secondary data", "Primary: collected by the investigator in the field. Secondary: collected by others (maps, census, websites, records).", undefined);
  b.card("CONCEPT", "Reliability vs accuracy", "Reliable results are consistent when the method is repeated; accurate results are close to the true value.", "Repeat readings and use the mean for reliability; better instruments for accuracy.");
  b.card("DEFINITION", "What is a **risk assessment**?", "A list of hazards in the field, how likely and serious each is, and the precautions that reduce the risk.", "Hazard plus a matching precaution, e.g. deep water: stay below knee depth.");
  b.card("CONCEPT", "How to analyse results", "Describe the trend, quote figures, explain with geographical reasons, and identify anomalies.", undefined);
  b.card("CONCEPT", "Writing a conclusion", "State whether the hypothesis is accepted, rejected or partly accepted, quote data and mention exceptions.", "Avoid 'proved'.");
  b.card("CONCEPT", "Good evaluation points", "Name a weakness (sample size, single readings, timing, equipment, bias) and a specific improvement that fixes it.", "Not 'be more careful'.");
});
