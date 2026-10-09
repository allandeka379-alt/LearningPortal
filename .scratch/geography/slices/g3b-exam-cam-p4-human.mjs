// Slice G3b: Cambridge Paper 4 Geographical Investigations, human contexts (3 × 30 marks).
import { concept, P, CAM, geographyLevels } from "../lib.mjs";

concept("geo.fieldwork.human-fieldwork", { file: "exam/cam-p4-human", keyPrefix: "exam.cam-p4-human", applies: CAM }, (b) => {
  // 1. Traffic counts and congestion.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 4", secs: 2700,
    concepts: ["geo.fieldwork.human-fieldwork", "geo.fieldwork.enquiry-process", "geo.settlement.urban-challenges"],
    stem: "Students investigated traffic congestion on a main road leading into the centre of a fictional town in an MIC. Their hypothesis was: **Traffic flow is greatest during the morning and evening peak hours.**\n\nOn one weekday they counted vehicles passing a fixed point on the pavement for 15 minutes starting at each of seven times. Table 1 shows the results (fictional data).\n\n| Start time | 06:30 | 07:30 | 09:30 | 12:30 | 15:30 | 18:15 | 20:00 |\n|---|---|---|---|---|---|---|---|\n| Vehicles in 15 minutes | 88 | 240 | 104 | 128 | 116 | 264 | 76 |\n\nTable 2 shows the types of vehicle in the 07:30 count.\n\n| Vehicle type | Cars | Minibus taxis | Buses | Lorries | Other | Total |\n|---|---|---|---|---|---|---|\n| Number | 114 | 66 | 12 | 25 | 23 | 240 |",
    hints: ["To convert a 15-minute count to an hourly rate, multiply by 4.", "A pie chart angle = (value ÷ total) × 360."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which is the most suitable way to record the vehicles as they pass?",
        options: [
          ["A tally sheet with a column per vehicle type", "Correct: a tally mark for each vehicle under its type is quick and allows totals and types to be recorded together."],
          ["A questionnaire handed to every passing driver", "Stopping drivers is unsafe and would itself cause congestion."],
          ["A field sketch of the road every 15 minutes", "A sketch cannot record the number of vehicles accurately."],
          ["A bi-polar score sheet completed for the road", "Bi-polar surveys score environmental quality, not traffic numbers."],
        ],
        answer: "A", explanation: "Tally sheets with categories are the standard recording method for traffic and pedestrian counts.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe how the students should carry out the traffic counts so that results at different times can be compared fairly.",
        points: [
          "Count at the same fixed point each time.",
          "Count for exactly the same length of time (15 minutes) using a stopwatch.",
          "Agree a counting rule (for example count vehicles in both directions / crossing a marked line) and use two counters, one for each direction, to avoid missing vehicles.",
        ],
        modelAnswer: "Stand at the same safe point on the pavement each time and count for exactly 15 minutes with a stopwatch. One student counts each direction, ticking each vehicle on a tally sheet as it crosses a lamp post opposite.",
        explanation: "Same place, same duration and the same counting rule make counts comparable.",
      }),
      P.num({ label: "(c)", stem: "Calculate the hourly rate of traffic (vehicles per hour) represented by the 07:30 count.", value: 960, wrong: [60, 240], explanation: "240 vehicles in 15 minutes × 4 = 960 vehicles per hour." }),
      P.num({ label: "(d)", unit: "%", stem: "Using Table 2, calculate the percentage of vehicles that were minibus taxis.", value: 27.5, tol: 0.05, wrong: [66, 3.6], explanation: "66 ÷ 240 × 100 = 27.5%." }),
      P.num({ label: "(e)", marks: 2, unit: "°", stem: "The students drew a pie chart of Table 2. Calculate the angle of the sector for cars.", value: 171, tol: 0.05, wrong: [114, 47.5], explanation: "114 ÷ 240 × 360 = 171°." }),
      P.mcq({
        label: "(f)", stem: "Which graph is most suitable for showing how traffic changed through the day (Table 1)?",
        options: [
          ["A line graph with time of day on the x-axis", "Correct: time is continuous, so a line graph shows the rises and falls through the day."],
          ["A pie chart of the seven counts", "A pie chart shows proportions of a total, not change over time."],
          ["A scatter graph of cars against lorries", "This compares two vehicle types, not change over time."],
          ["A population pyramid of vehicle types", "A pyramid is used for age-sex data."],
        ],
        answer: "A", explanation: "Change over time is best shown on a line graph (or a bar graph with times in order).",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "To what extent do the results support the hypothesis? Use data from Table 1.",
        points: [
          "The highest counts are at 07:30 (240) and 18:15 (264), the morning and evening peaks.",
          "Off-peak counts are much lower: 104 at 09:30, 128 at 12:30, 116 at 15:30.",
          "Lowest counts are early morning (88 at 06:30) and evening (76 at 20:00).",
          "Concludes the hypothesis is accepted (evening peak slightly higher than morning); notes data are from one day only.",
        ],
        modelAnswer: "The hypothesis is accepted. Traffic peaks at 07:30 (240 vehicles) and 18:15 (264), about twice the midday flows of 104 to 128, and falls to 88 at 06:30 and 76 at 20:00. The evening peak is a little higher than the morning one. As counts were made on one day only, the conclusion is tentative.",
        explanation: "Quote the peaks and troughs and make a decision.",
      }),
      P.manual({
        label: "(h)", marks: 3, stem: "Explain the pattern of traffic flow shown in Table 1.",
        points: [
          "Morning peak: commuters travelling to work and pupils to school at the same time.",
          "Evening peak: workers returning home when offices, factories and shops close, sometimes with shopping trips.",
          "Midday flows are moderate: deliveries, business and shopping trips spread through the day; few journeys late in the evening.",
        ],
        modelAnswer: "Most people start work and school at similar times, so the morning count is high; they leave work together, so the evening count is higher still, with shoppers added. During the day traffic is mostly deliveries and business trips, and by 20:00 most people are home.",
        explanation: "Peaks follow the daily rhythm of commuting.",
      }),
      P.manual({
        label: "(i)", marks: 2, stem: "Give **two** precautions the students should take to work safely while counting traffic.",
        points: [
          "Stand well back from the kerb on the pavement / never step into the road.",
          "Work in groups, wear high-visibility clothing or tell a teacher where they are / avoid counting after dark.",
        ],
        modelAnswer: "They should stand well back from the kerb on the pavement and work in a group wearing bright vests.",
        explanation: "Roadside fieldwork needs precautions against traffic and personal safety risks.",
      }),
      P.manual({
        label: "(j)", marks: 3, stem: "Suggest **three** ways the town authorities could reduce congestion at peak times.",
        points: [
          "Improve public transport (more large buses, bus lanes or rapid bus routes) so fewer people drive.",
          "Stagger working and school hours to spread the peaks.",
          "Build bypasses or ring roads for through traffic / manage parking and loading / designated minibus taxi ranks away from the main road.",
        ],
        modelAnswer: "Bus lanes and more large buses would carry more people in fewer vehicles, staggered school and office hours would spread the peaks, and a ring road would keep through lorries out of the centre.",
        explanation: "Solutions should reduce the number of vehicles or spread them in space or time.",
      }),
      P.manual({
        label: "(k)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Evaluate the method used in this investigation and suggest how it could be improved.",
        points: [
          "Counts made on only one day; a holiday, rain or an accident could make that day unusual.",
          "Only seven 15-minute samples; peaks could fall between them (for example 08:00 or 17:30 not counted).",
          "Only one site on one road; congestion elsewhere in the town is not measured.",
          "Counting errors are likely at the busiest times when vehicles pass quickly.",
          "Improvements: repeat on several weekdays and a weekend day; count every 30 minutes through the day; use more sites; use video or extra counters at peaks; measure journey times or queue length too.",
          "Judgement: method shows a clear pattern but conclusions are tentative until repeated.",
        ],
        levels: geographyLevels(6),
        modelAnswer: "The method shows a clear daily pattern, but its reliability is limited. All counts come from one weekday, which may have been unusual because of weather or an accident. Seven 15-minute samples could miss the real peaks, for example at 08:00. Only one road was studied, so the results may not apply to the whole town. At the peaks many vehicles pass quickly and some may be missed. The students should count on several weekdays and a weekend day, every 30 minutes from 06:00 to 20:00, at three or four roads into the centre, using two counters or a phone video at busy times. They could also measure queue lengths, which show congestion more directly than counts. With these changes the conclusion would be much more secure.",
        explanation: "Evaluate timing, sample size, site choice and counting error, then suggest specific improvements.",
      }),
      P.manual({
        label: "(l)", marks: 3, stem: "The students want to find out how commuters on this road feel about congestion. Describe how they could design and carry out a short questionnaire.",
        points: [
          "Use mainly closed questions (for example journey time, mode of transport, a rating of congestion) with one or two open questions.",
          "Pilot the questionnaire first and keep it short, neutral and anonymous.",
          "Choose respondents systematically (for example every 5th person at a bus stop or ranks) at different times of day.",
        ],
        modelAnswer: "They would write a short, anonymous questionnaire of mostly closed questions, such as how long the journey takes and a 1-5 rating of congestion, test it on a few people first, then ask every 5th adult at bus stops along the road in the morning and evening.",
        explanation: "Good questionnaires are piloted, neutral and sampled systematically.",
      }),
    ],
    explanation: "A full Paper 4 urban traffic investigation: recording, fair method, rates, percentages and pie-chart angles, graph choice, analysis, explanation, safety, solutions and evaluation.",
  });

  // 2. Environmental quality in planned and unplanned areas.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 4", secs: 2700,
    concepts: ["geo.fieldwork.human-fieldwork", "geo.fieldwork.enquiry-process", "geo.settlement.unplanned", "geo.settlement.urban-challenges"],
    stem: "Students compared environmental quality in three residential areas of a fictional city in an LIC: **Area A**, a planned medium-density suburb; **Area B**, an older planned high-density suburb; and **Area C**, an unplanned (informal) settlement on the edge of the city. Their hypothesis was: **Environmental quality is lowest in the unplanned settlement.**\n\nThree students each scored one street in every area on eight criteria using a bi-polar scale from −2 (very poor) to +2 (very good). Table 1 shows one student's scores for Area C.\n\n| Criterion | Litter | Noise | Building condition | Open space | Water supply | Sanitation | Road surface | Safety |\n|---|---|---|---|---|---|---|---|---|\n| Score | −2 | −1 | −2 | 0 | −2 | −2 | −1 | 0 |\n\nTable 2 shows the total scores given by the three students (fictional data).\n\n| Area | Student 1 | Student 2 | Student 3 | Mean |\n|---|---|---|---|---|\n| A | +9 | +11 | +7 | ? |\n| B | +2 | −1 | +5 | +2 |\n| C | ? | −12 | −8 | −10 |",
    hints: ["Keep the minus signs when adding scores.", "Range = highest value − lowest value."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total score in Table 1 (Student 1's total for Area C).", value: -10, wrong: [10, -12], explanation: "−2 − 1 − 2 + 0 − 2 − 2 − 1 + 0 = −10." }),
      P.num({ label: "(b)", stem: "Calculate the mean total score for Area A.", value: 9, wrong: [27, 11], explanation: "(9 + 11 + 7) ÷ 3 = 27 ÷ 3 = 9." }),
      P.num({ label: "(c)", stem: "Calculate the range of the three students' scores for Area B.", value: 6, wrong: [4, 2], explanation: "Highest +5, lowest −1: 5 − (−1) = 6." }),
      P.mcq({
        label: "(d)", stem: "Why did three students score each street and the mean was used?",
        options: [
          ["Scoring is subjective, so a mean evens out personal opinions", "Correct: bi-polar scoring is subjective, and averaging several scorers makes results more reliable."],
          ["Three students can finish each street more quickly", "Speed of survey does not explain the use of a mean."],
          ["Each student scored a different set of criteria", "All three used the same eight criteria."],
          ["A mean turns every area's score into a positive one for comparison", "Area C's mean is −10, so means can be negative."],
        ],
        answer: "A", explanation: "Bi-polar surveys are subjective; several scorers and a mean, with agreed descriptions for each score, improve reliability.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe how the students should carry out the bi-polar survey in each street.",
        points: [
          "Use the same recording sheet with the same eight criteria and agreed descriptions of what each score (−2 to +2) means.",
          "Score at the same point(s) / walk the same length of street (for example 100 m) in each area, at similar times of day.",
          "Each student scores independently without discussing, then totals are calculated (and a photograph or note supports each score).",
        ],
        modelAnswer: "Each student uses the same sheet of eight criteria, with written descriptions for each score. In each area they walk 100 m of one street at mid-morning, then score independently without discussion, and the totals are added up.",
        explanation: "Standard sheets, agreed descriptors, similar times and independent scoring make the survey fair.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "The students surveyed only one street in each area. Suggest a better sampling strategy and explain why it would be better.",
        points: [
          "Survey several streets in each area (for example five).",
          "Choose them by random or systematic sampling (for example random numbers on a street map, or every third street), or stratified by type of street.",
          "Explains that one street may not be typical, so several streets chosen without bias give a more representative score for the area.",
        ],
        modelAnswer: "They should number the streets in each area on a map and choose five using random numbers. One street could be unusually good or bad, whereas five unbiased choices represent the whole area better.",
        explanation: "More, unbiased sample sites make the area means more representative.",
      }),
      P.mcq({
        label: "(g)", stem: "Which graph is most suitable for comparing the mean scores of the three areas?",
        options: [
          ["A bar graph with a zero line", "Correct: the areas are categories and the scores can be positive or negative."],
          ["A line graph joining the areas", "The areas are separate categories, not points on a continuous scale."],
          ["A pie chart of the mean scores", "A pie chart cannot show negative values or a comparison like this."],
          ["A triangular graph of the areas", "Triangular graphs show three percentages that add to 100%."],
        ],
        answer: "A", explanation: "Use a bar graph for categories; a zero line allows negative scores to be shown below it.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "To what extent do the results support the hypothesis? Use data from Tables 1 and 2.",
        points: [
          "Area C has the lowest mean (−10), well below Area B (+2) and Area A (+9).",
          "All three students gave Area C negative totals (−8 to −12), so the result is consistent.",
          "Table 1 shows the lowest scores were for litter, building condition, water supply and sanitation (−2 each).",
          "Concludes the hypothesis is accepted; notes Area B's scores varied widely (range 6), so B's position is less certain.",
        ],
        modelAnswer: "The hypothesis is accepted. Area C's mean of −10 is far lower than Area B (+2) and Area A (+9), and every student gave C a negative total. Table 1 shows its worst scores were for litter, building condition, water and sanitation. Area B's scores ranged from −1 to +5, so its exact position is less certain, but it is clearly better than C.",
        explanation: "Compare means, check consistency between scorers and identify the weakest criteria.",
      }),
      P.manual({
        label: "(i)", marks: 4, stem: "Explain why environmental quality is often low in unplanned settlements.",
        points: [
          "Homes are built without planning permission, often quickly from cheap or scrap materials, so building condition is poor.",
          "The settlement is not served by the authorities: no piped water, sewerage or refuse collection, so sanitation and litter score badly.",
          "Overcrowding and high densities leave little open space and increase noise.",
          "Residents have low incomes / insecure land tenure, so they cannot afford or are unwilling to invest in improvements; roads are unpaved.",
        ],
        modelAnswer: "Unplanned settlements grow without permission on land the city does not service, so there is no piped water, sewerage or refuse collection. Homes are built quickly from cheap materials and crowded together, leaving no open space. Residents have low incomes and no legal title, so they cannot borrow or invest to improve homes, and roads stay unpaved.",
        explanation: "Lack of planning, services, money and secure tenure explain low quality.",
      }),
      P.manual({
        label: "(j)", marks: 3, stem: "Suggest **three** ways in which environmental quality in Area C could be improved.",
        points: [
          "Upgrading: provide standpipes or piped water, toilets/sewerage and refuse collection.",
          "Regularise land tenure (legal title), so residents invest in better homes, perhaps with low-cost loans or building materials.",
          "Site-and-service schemes or low-cost housing; paving roads and adding drains, lighting and open spaces.",
        ],
        modelAnswer: "The city could install communal water points, toilets and regular refuse collection, give residents legal title to their plots so they improve their homes, and pave and drain the main paths.",
        explanation: "In-situ upgrading with secure tenure is usually more effective than clearance.",
      }),
      P.manual({
        label: "(k)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Evaluate the usefulness of a bi-polar survey for comparing environmental quality in different areas.",
        points: [
          "Strength: quick, cheap and simple; produces numbers that can be totalled, averaged and graphed.",
          "Strength: covers several aspects of quality at once and allows direct comparison between areas.",
          "Weakness: subjective; different people (or the same person on different days) score differently, as Area B's range shows.",
          "Weakness: all criteria count equally although some (for example sanitation) may matter more; scores depend on time of day and weather.",
          "Weakness: outsiders' views may differ from residents'; could combine with questionnaires of residents.",
          "Judgement: useful for broad comparison if descriptors are agreed and several scorers and streets are used.",
        ],
        levels: geographyLevels(6),
        modelAnswer: "A bi-polar survey is quick and cheap, covers several aspects of quality at once and turns impressions into numbers that can be averaged and graphed, so areas can be compared directly. Here it clearly separated Area C from Areas A and B. However, scoring is subjective: the three students' totals for Area B ranged from −1 to +5. Every criterion carries equal weight, although a lack of sanitation probably matters more than noise, and results depend on when the street is visited. Visitors may also judge differently from residents. Overall the method is useful for broad comparisons, provided descriptors are agreed, several scorers and streets are used, and residents' views are collected by questionnaire as well.",
        explanation: "Balance strengths and weaknesses, referring to the results, then judge.",
      }),
      P.manual({
        label: "(l)", marks: 2, stem: "Give **two** ways the students should behave ethically while surveying Area C.",
        points: [
          "Ask permission before photographing people or homes / explain to residents what they are doing.",
          "Stay on public paths, do not enter private yards or homes, and be respectful (no negative comments in front of residents; keep any information anonymous).",
        ],
        modelAnswer: "They should ask before taking photographs of people or homes, and stay on public paths without entering anyone's yard.",
        explanation: "Fieldwork in residential areas must respect residents' privacy and dignity.",
      }),
    ],
    explanation: "A full Paper 4 urban environmental-quality investigation: bi-polar scoring, means and ranges, sampling, graph choice, analysis, explanation of unplanned settlements, improvements and evaluation.",
  });

  // 3. Tourism questionnaire.
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 4", secs: 2700,
    concepts: ["geo.fieldwork.human-fieldwork", "geo.fieldwork.enquiry-process", "geo.tourism.growth-management"],
    stem: "Students investigated tourism in a fictional small town next to a national park in an MIC. They tested:\n\n- **Hypothesis 1:** Most visitors to the town come from outside the country.\n- **Hypothesis 2:** Most residents think tourism brings more benefits than problems.\n\nThey questioned 80 visitors and 60 residents. Table 1 shows where visitors had travelled from, and Table 2 shows residents' answers to the statement *Overall, tourism benefits the town* (fictional data).\n\n**Table 1**\n\n| Home area | Same district | Elsewhere in the country | Other countries in the region | Europe | Rest of the world | Total |\n|---|---|---|---|---|---|---|\n| Visitors | 6 | 30 | 19 | 15 | 10 | 80 |\n\n**Table 2**\n\n| Response | Strongly agree | Agree | Neutral | Disagree | Strongly disagree | Total |\n|---|---|---|---|---|---|---|\n| Residents | 15 | 21 | 9 | 11 | 4 | 60 |",
    hints: ["Visitors from outside the country = the region + Europe + rest of the world.", "Percentage = part ÷ total × 100."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which question from the visitors' questionnaire is a **closed** question?",
        options: [
          ["How many nights are you staying? 0 / 1-3 / 4 or more", "Correct: the respondent chooses from fixed answers."],
          ["What did you enjoy most about your visit to the town?", "This is open: people answer in their own words."],
          ["Why did you choose this particular town for your holiday?", "This is open: answers will vary widely."],
          ["How could the town be improved for visitors like you?", "This is open and needs a written answer."],
        ],
        answer: "A", explanation: "Closed questions give fixed choices that are easy to count and graph.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe how the students could choose the 80 visitors so that the sample is representative.",
        points: [
          "Use systematic sampling, for example asking every 5th visitor passing (or leaving the park gate).",
          "Sample at several locations (park entrance, hotels/lodges, craft market, town centre).",
          "Sample at different times of day and on different days, including a weekend.",
        ],
        modelAnswer: "They should ask every 5th adult visitor passing at the park gate, the craft market and the hotel area, in the morning and afternoon, on two weekdays and a weekend day.",
        explanation: "Spreading the sample across places and times reduces bias.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the students carried out a **pilot survey** before the main survey.",
        points: [
          "To check that questions are clear and understood (and not leading), and that the answer choices cover all likely answers.",
          "To find out how long each questionnaire takes and fix problems before collecting the real data.",
        ],
        modelAnswer: "A pilot with a few people shows whether the questions are clear and the tick-box choices cover all answers, and how long each interview takes, so problems can be fixed first.",
        explanation: "Piloting improves the questionnaire before the main survey.",
      }),
      P.num({ label: "(d)", unit: "%", stem: "Calculate the percentage of visitors who came from outside the country.", value: 55, tol: 0.05, wrong: [45, 44], explanation: "19 + 15 + 10 = 44; 44 ÷ 80 × 100 = 55%." }),
      P.num({ label: "(e)", unit: "%", stem: "Calculate the percentage of residents who agreed or strongly agreed that tourism benefits the town.", value: 60, tol: 0.05, wrong: [36, 25], explanation: "15 + 21 = 36; 36 ÷ 60 × 100 = 60%." }),
      P.num({ label: "(f)", marks: 2, unit: "°", stem: "The students drew a pie chart of Table 1. Calculate the angle of the sector for visitors from Europe.", value: 67.5, tol: 0.05, wrong: [15, 18.75], explanation: "15 ÷ 80 × 360 = 67.5°." }),
      P.mcq({
        label: "(g)", stem: "Which method would best show the home areas of the visitors **on a map**?",
        options: [
          ["Flow lines drawn in proportion to visitor numbers", "Correct: flow lines (or desire lines) show both direction and numbers."],
          ["A line graph of the visitors from each home area", "A line graph does not show geographical location."],
          ["A scatter graph of visitors against distance travelled", "A scatter graph is not a map."],
          ["A dispersion graph of the numbers in each home area", "A dispersion graph shows the spread of values, not locations."],
        ],
        answer: "A", explanation: "Flow-line or desire-line maps show where people come from and how many.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "To what extent do the results support **both** hypotheses? Use data in your answer.",
        points: [
          "Hypothesis 1: 55% of visitors came from outside the country, a majority, so it is accepted.",
          "But the margin is small (45% were domestic, with 30 from elsewhere in the country the largest single group), so it is only just accepted.",
          "Hypothesis 2: 60% of residents agreed or strongly agreed; only 25% (15) disagreed or strongly disagreed and 15% were neutral.",
          "So Hypothesis 2 is accepted, though a quarter of residents see more problems than benefits.",
        ],
        modelAnswer: "Hypothesis 1 is accepted, but only just: 55% of visitors came from abroad, while 45% were domestic and the largest single group (30) came from elsewhere in the country. Hypothesis 2 is accepted more clearly: 60% of residents agreed that tourism benefits the town, compared with 25% who disagreed and 15% who were neutral.",
        explanation: "Decide for each hypothesis and comment on the strength of the evidence.",
      }),
      P.manual({
        label: "(i)", marks: 3, stem: "Suggest reasons why most residents think tourism benefits the town, and why some disagree.",
        points: [
          "Benefits: jobs in lodges, guiding, transport and crafts / income for local businesses (multiplier effect).",
          "Benefits: improved infrastructure and services (roads, water, electricity, airport) or money for conservation and community projects.",
          "Problems for those who disagree: rising prices, crowding, litter/noise, cultural change, seasonal or low-paid jobs, or profits leaving the area (leakage).",
        ],
        modelAnswer: "Tourism provides jobs in lodges and craft markets and brings better roads and water supplies. Some residents disagree because prices rise, jobs are seasonal and poorly paid, and much of the profit goes to outside companies.",
        explanation: "Tourism brings economic benefits but also social and environmental costs.",
      }),
      P.manual({
        label: "(j)", marks: 2, stem: "Give **two** ways the students made their questionnaire ethical.",
        points: [
          "Explained the purpose and asked permission / allowed people to refuse or stop.",
          "Kept answers anonymous (no names or personal details) and were polite / did not ask sensitive questions.",
        ],
        modelAnswer: "They explained the survey and asked if people were willing to take part, and they did not record names.",
        explanation: "Consent, anonymity and respect are the basics of ethical fieldwork.",
      }),
      P.manual({
        label: "(k)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Evaluate the reliability of the students' results and suggest how the investigation could be improved.",
        points: [
          "Timing: the survey took place at one time of year; the balance of foreign and domestic visitors changes with seasons and holidays.",
          "Sample size: 80 visitors and 60 residents is modest; the 55% result is close to half, so a slightly different sample could change the conclusion.",
          "Location bias: where visitors were stopped (for example only at expensive hotels) affects who was asked; residents in one area only.",
          "Response problems: language barriers, refusals, polite answers to student researchers; Likert answers are subjective.",
          "Improvements: larger samples, several seasons, several locations, translated questionnaires, secondary data (park entry records, tourism statistics).",
          "Judgement: Hypothesis 2 is reasonably secure; Hypothesis 1 is uncertain and needs more data.",
        ],
        levels: geographyLevels(6),
        modelAnswer: "The results should be treated with some caution. The survey was done at one time of year, but the mix of foreign and domestic visitors changes with seasons and school holidays. The sample of 80 visitors is modest, and because 55% is close to half, a slightly different sample could reverse the conclusion for Hypothesis 1. Visitors stopped near expensive lodges may be more likely to be foreign, and some may not have understood English. Residents might give polite answers to students. To improve reliability, the students should question at least 150 visitors at several sites in two different seasons, offer the questionnaire in more than one language and compare their results with park entry records. Hypothesis 2 is fairly secure, but Hypothesis 1 needs more evidence.",
        explanation: "Consider timing, sample size, location bias and response problems, then suggest improvements and judge each hypothesis.",
      }),
      P.manual({
        label: "(l)", marks: 4, stem: "Using the results, suggest how the town could manage tourism so that more residents benefit and the national park is protected.",
        points: [
          "Employ and train local people / buy food and crafts locally so more money stays in the town (reduce leakage).",
          "Share park fees or tourism income with the community (community projects, schools, clinics).",
          "Limit visitor numbers, use zoning or set routes in the park / promote low-impact ecotourism.",
          "Address residents' concerns raised in the survey (litter collection, traffic, keeping prices fair, involving residents in planning).",
        ],
        modelAnswer: "Lodges could be required to employ and train local staff and buy local produce, and part of the park entry fee could fund schools and clinics. Visitor numbers in sensitive parts of the park could be limited and ecotourism promoted, while the council deals with the litter and crowding that some residents complained about.",
        explanation: "Sustainable tourism spreads benefits locally and limits environmental damage.",
      }),
    ],
    explanation: "A full Paper 4 tourism investigation: questionnaire design and sampling, percentages and pie angles, mapping origins, analysis of two hypotheses, ethics, evaluation and sustainable management.",
  });
});
