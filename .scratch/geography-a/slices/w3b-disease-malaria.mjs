// W3b: disease.malaria (both boards: ZIMSEC Form 5; Cambridge A Level Paper 4 option 14). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, per1000, regression, pearson, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w3b-_q.mjs";
import { ALT } from "../tables/w3b-disease-malaria.mjs";

const INC = [270, 255, 190, 185, 110, 120, 50, 20]; // different data from the lesson example

const incid = chk(per1000(9100, 70000), 130, 1e-9);
const netsNeeded = chk(90000 / 2, 45000, 1e-9);
const cover = chk((36000 / 45000) * 100, 80, 1e-9);
const gap = chk(45000 - 36000, 9000);
// Struct A: clinic data
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const RAIN = [190, 150, 90, 40, 10, 2];
const TESTS = [900, 1200, 1500, 1400, 900, 500];
const POS = [180, 360, 600, 520, 270, 100];
const tpr = POS.map((p, i) => (p / TESTS[i]) * 100);
const tprMar = chk(tpr[2], 40, 1e-9);
const posTot = chk(sum(POS), 2030);
const TA = tbl(["Month", ...MON], [["Rainfall (mm)", ...RAIN], ["People tested", ...TESTS], ["Positive tests", ...POS]]);
// Struct B: altitude regression
const rg = regression(ALT, INC);
const pr = pearson(ALT, INC);
const grad = rnd(rg.b, 3, -0.203, "grad");
const pred900 = rnd(rg.predict(900), 1, 185.6, "pred900");
chk(Math.round(pr.r * 1000) / 1000, -0.977, 1e-9);
chk(Math.round(rg.a * 100) / 100, 368.64, 1e-9);
chk(Math.round(rg.b * 100000) / 100000, -0.20338, 1e-9);
const BT = tbl(["Site", ...ALT.map((_, i) => String.fromCharCode(65 + i))], [["Altitude (m)", ...ALT.map((a) => String(a).replace(/^(\d)(\d{3})$/, "$1 $2"))], ["Cases per 1 000 people in a year", ...INC]]);

concept("ageo.disease.malaria", { file: "disease/malaria", keyPrefix: "disease.malaria" }, (b) => {
  mc(b, 2, "RECALL", "Which organism transmits malaria between people?", [
    ["The female Anopheles mosquito", "Correct: she bites mostly between dusk and dawn."],
    ["The tsetse fly", "The tsetse fly transmits sleeping sickness."],
    ["The Aedes mosquito only, never Anopheles", "Aedes carries dengue and yellow fever; Anopheles carries malaria."],
    ["The male Anopheles mosquito", "Male mosquitoes do not bite."],
  ], "Only **female Anopheles** mosquitoes transmit malaria.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is malaria rare on the high plateau around Harare?", [
    ["It is too cool for the parasite to develop inside the mosquito", "Correct: below about 18 °C development is too slow or stops."],
    ["There are no mosquitoes anywhere on the plateau", "Mosquitoes can occur, but malaria transmission is limited by temperature."],
    ["People on the plateau are naturally immune to malaria from birth onwards", "Immunity comes from repeated infection, not from living at altitude."],
    ["The plateau receives no rain throughout the year", "It receives summer rain."],
  ], "**Temperature** falls with altitude and limits the parasite's development.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which of these helps to prevent malaria by killing mosquitoes that rest on walls?", [
    ["Indoor residual spraying", "Correct: insecticide on the walls kills mosquitoes that land there."],
    ["Oral rehydration solution", "It treats dehydration; it does not kill mosquitoes."],
    ["Boiling drinking water", "It protects against waterborne disease."],
    ["Chlorinating a borehole", "It protects against waterborne disease."],
  ], "**Indoor residual spraying** kills resting mosquitoes.");
  mc(b, 3, "ANALYSIS", "Why do malaria cases usually peak one to two months after the peak of the rains?", [
    ["Mosquitoes need time to breed and the parasite needs time to develop", "Correct: both processes take days to weeks."],
    ["Rainwater carries the parasite directly from one person to another in a village", "Rain does not carry the parasite directly."],
    ["People only go to clinics when the rains have ended", "Delays in reporting do not explain the main time lag."],
    ["Cold weather after the rains increases mosquito numbers", "Cold slows mosquito development."],
  ], "The **time lag** reflects breeding of mosquitoes and parasite development.", { hints: ["Think of the life cycle."] });
  mc(b, 3, "APPLICATION", "Which change is most likely to extend malaria transmission into higher areas of Zimbabwe?", [
    ["Warming that lifts higher areas above the 18 °C threshold", "Correct: warmer conditions allow the parasite to develop."],
    ["Cooling of the climate over the Eastern Highlands region", "Cooling would reduce transmission."],
    ["Fewer breeding sites after a long drought in the region", "A drought reduces breeding sites."],
    ["Free distribution of nets in the high plateau areas of the country", "Nets reduce transmission."],
  ], "Warming moves the **temperature limit** up the slope.", { hints: ["What limits malaria at altitude?"] });
  mc(b, 3, "EVALUATION", "Which statement best evaluates the use of insecticide-treated nets?", [
    ["They work if used and replaced, but resistance is a risk", "Correct: they work well within a package of measures."],
    ["They alone will eliminate malaria within a year in any country", "Elimination needs several measures over many years."],
    ["They have no effect because mosquitoes bite only during the day", "Anopheles bites mostly at night."],
    ["They are harmful because they attract more mosquitoes into homes", "Nets reduce bites."],
  ], "Nets are **cost-effective but limited** by use, replacement and resistance.", { hints: ["Look for both a strength and a limit."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Malaria is caused by a virus carried by mosquitoes.", answer: false,
    feedbackTrue: "Not so: malaria is caused by a parasite, Plasmodium.", feedbackFalse: "Correct: the cause is a parasite (Plasmodium), carried by mosquitoes.",
    explanation: "Malaria is caused by a **parasite**, not a virus." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its meaning.",
    pairs: [
      ["Vector", "An organism that carries a pathogen between hosts"],
      ["Plasmodium", "The parasite that causes malaria"],
      ["Stable malaria", "Regular transmission with partial immunity in adults"],
      ["Indoor residual spraying", "Insecticide on walls to kill resting mosquitoes"],
      ["Rapid diagnostic test", "A quick blood test to show malaria infection"],
    ], explanation: "Each term relates to malaria transmission or control." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Malaria parasites belong to the genus {{blank:a}} and are carried by female {{blank:b}} mosquitoes. Transmission is limited by temperature, standing water and {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["Plasmodium"], choices: ["Plasmodium", "Vibrio", "Aedes"] },
      { id: "b", accepted: ["Anopheles"], choices: ["Anopheles", "Culex", "Glossina"] },
      { id: "c", accepted: ["altitude"], choices: ["altitude", "latitude only", "soil colour"] },
    ], explanation: "Plasmodium, Anopheles and altitude." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of insect that carries malaria parasites from person to person.",
    accepted: ["mosquito", "mosquitoes", "anopheles", "anopheles mosquito", "female anopheles mosquito", "a mosquito"],
    explanation: "The **Anopheles mosquito** is the vector." });

  b.calc({ d: 2, skill: "APPLICATION", calculator: true, unit: "per 1000",
    stem: "In a district of 70 000 people at risk there were 9 100 confirmed malaria cases in a year. Calculate the incidence per 1 000 people.",
    hints: ["Cases ÷ population × 1 000."],
    value: incid, wrong: [13, 7.7, 1300],
    explanation: "9 100 ÷ 70 000 × 1 000 = **130 per 1 000**. The value 13 is per 100." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A programme aims to provide one net for every two people in a district of 90 000 people. So far 36 000 nets have been distributed. What percentage of the target has been reached?",
    hints: ["Target = 90 000 ÷ 2 nets."],
    value: cover, wrong: [40, 36, 125],
    explanation: "Target = 45 000 nets. 36 000 ÷ 45 000 × 100 = **80%**. The value 40 divides by 90 000 instead of the target." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "units",
    stem: "In the same programme the target is 45 000 nets and 36 000 have been distributed. How many more nets are needed?",
    hints: ["Target − distributed."],
    value: gap, wrong: [36000, 45000, 81000],
    explanation: "45 000 − 36 000 = **9 000** nets." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how malaria is transmitted from one person to another.",
    points: [
      "A female Anopheles mosquito bites an infected person and takes up the malaria parasites in the blood.",
      "The parasites develop in the mosquito for about one to two weeks.",
      "When the mosquito bites another person, usually between dusk and dawn, the parasites enter that person's blood.",
    ],
    modelAnswer: "A female Anopheles mosquito bites an infected person and takes up the parasites. They develop in the mosquito for one to two weeks. When it bites another person, usually between dusk and dawn, the parasites enter that person's blood.",
    explanation: "Vector, development, bite." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how temperature and rainfall affect the distribution of malaria.",
    hints: ["Think of the mosquito and the parasite."],
    points: [
      "The parasite can develop inside the mosquito only above about 18 °C, and it develops faster in warmer conditions, so malaria is limited to warm areas and lower altitudes.",
      "Very high temperatures (above about 35 °C) reduce mosquito survival.",
      "Mosquitoes breed in standing water, so rainfall and wetlands create breeding sites.",
      "Transmission peaks after the rainy season starts, so areas with seasonal rain have seasonal malaria.",
    ],
    modelAnswer: "The parasite can develop in the mosquito only above about 18 °C and develops faster when it is warmer, so malaria is limited to warm, low-lying areas. Very high temperatures reduce mosquito survival. Mosquitoes breed in standing water, so rain and wetlands create breeding sites, and transmission peaks after the rains start.",
    explanation: "Temperature limits the parasite; water limits the vector." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why malaria can hold back the development of a country.",
    hints: ["Think about health, work, education and money."],
    points: [
      "Illness and deaths, especially of children, reduce the size and health of the workforce.",
      "Sick adults miss work and farming at key seasons, so incomes and output fall.",
      "Children miss school, and families spend money on treatment instead of food and education.",
      "The country spends large sums on health care and prevention, and tourism and investment may be discouraged.",
    ],
    modelAnswer: "Illness and deaths, especially of children, reduce the workforce. Sick adults miss work and farming at key seasons, so incomes and output fall. Children miss school and families spend money on treatment. The country spends large sums on health care and prevention, and tourism and investment may be discouraged.",
    explanation: "Health, income, education and public spending." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest why malaria control programmes sometimes lose their gains after a few years.",
    hints: ["Think of resistance, funding and behaviour."],
    points: [
      "Mosquitoes become resistant to insecticides and parasites to drugs, so tools lose their effect.",
      "Funding falls (often donor-dependent), so nets are not replaced and spraying stops.",
      "People who have not been infected lose immunity, and migration, conflict or climate change increase transmission.",
    ],
    modelAnswer: "Mosquitoes become resistant to insecticides and parasites to drugs. Funding often falls, so nets are not replaced and spraying stops. People lose immunity when there is little malaria, and migration, conflict or climate change increases transmission.",
    explanation: "Resistance, funding and changing conditions." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A clinic in a malaria area recorded rainfall and malaria tests over six months (illustrative data, invented for this exercise).\n\n${TA}`,
    hints: ["Test positivity rate = positive tests ÷ people tested × 100.", "Compare the months of the two peaks."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the test positivity rate in March, as a percentage.", value: tprMar, unit: "%", wrong: [600, 25, 0.4],
        explanation: "600 ÷ 1 500 × 100 = 40%." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the relationship between rainfall and the number of positive tests.",
        points: ["Rainfall is highest in January (190 mm) and falls steadily to 2 mm in June.", "Positive tests peak later, at 600 in March, two months after the rainfall peak.", "After March the positive tests fall with the rainfall, to 100 in June."],
        modelAnswer: "Rainfall is highest in January at 190 mm and falls steadily to 2 mm in June. Positive tests peak later, at 600 in March, two months after the rainfall peak. After March they fall with the rainfall, to 100 in June.",
        explanation: "Quote the peaks and the lag." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the time lag between the peak of the rainfall and the peak of malaria cases.",
        points: ["After heavy rain, pools of standing water form in which mosquitoes lay eggs and the larvae develop in days to a couple of weeks.", "The parasite takes about one to two weeks to develop inside the mosquito before it can be passed on.", "People then become ill after an incubation period of days to weeks and attend the clinic, so cases peak one to two months after the rain."],
        modelAnswer: "After heavy rain, pools form in which mosquito larvae develop in days to weeks. The parasite then takes one to two weeks to develop inside the mosquito. People become ill after an incubation period and attend the clinic, so cases peak one to two months after the rain.",
        explanation: "Breeding, parasite development and incubation produce the lag." }),
    ], explanation: "Calculate a positivity rate, describe a relationship and explain a lag." });

  b.struct({ d: 5, skill: "ANALYSIS", examStyle: true,
    stem: `A study of eight sites in a province recorded malaria incidence and altitude (illustrative data, invented for this exercise).\n\n${BT}\n\nThe correlation coefficient is r = −0.977 and the critical value at the 0.05 level for 8 pairs is 0.707. The regression line is y = 368.64 − 0.20338x, where y is incidence per 1 000 people and x is altitude in metres.`,
    hints: ["Substitute x = 900 into the equation.", "Think about whether the line works at every altitude."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "State the gradient of the regression line, to three decimal places, with its sign.", value: grad, dp: 3, wrong: [0.203, 368.64],
        explanation: "The gradient is −0.20338, or −0.203. It means that incidence falls by about 0.203 per 1 000 for every metre of altitude." }),
      P.num({ label: "(b)", marks: 2, stem: "Use the regression line to predict the incidence at an altitude of 900 m, to one decimal place.", value: pred900, dp: 1, unit: "per 1000", wrong: [190.0, 285.6, 0.2],
        explanation: "y = 368.64 − 0.20338 × 900 = 368.64 − 183.04 = 185.6." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Why should the line not be used to predict incidence at an altitude of 1 900 m?", options: [
        ["It lies outside the data and would give a negative value", "Correct: extrapolation is unreliable, and incidence cannot be negative."],
        ["The correlation is not statistically significant at the 0.05 level", "The correlation is significant at the 0.05 level."],
        ["Altitude cannot be used as a variable in a regression line", "Altitude is measured in metres."],
        ["The gradient of the line is positive, so it predicts a rise", "The gradient is negative."],
      ], answer: "A", explanation: "At 1 900 m the line gives 368.64 − 386.42 = −17.8, which is impossible." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why malaria incidence falls with altitude.",
        points: ["Temperature falls with altitude, so higher places are cooler.", "The parasite develops slowly or not at all inside the mosquito below about 18 °C.", "Mosquitoes breed and survive less well in cool conditions, so there are fewer infective bites."],
        modelAnswer: "Temperature falls with altitude, so higher places are cooler. The parasite develops slowly or not at all inside the mosquito below about 18 °C. Mosquitoes also breed and survive less well in cool conditions, so there are fewer infective bites.",
        explanation: "Altitude controls temperature, which controls the parasite." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess how far altitude alone explains the pattern of malaria in the eight sites.",
        points: ["The strong negative correlation (r = −0.977, above 0.707) and r² of about 0.95 suggest that altitude explains most of the variation.", "But some sites do not fit the line, such as site F (1 400 m) with a higher incidence (120) than the lower site E (1 200 m, 110).", "Altitude is linked to other factors such as temperature, rainfall, housing and distance to clinics, so it may act as a proxy for them.", "Other factors such as net use, spraying and wealth would need to be measured to separate their effects."],
        modelAnswer: "The strong negative correlation (r = −0.977, above 0.707) and an r² of about 0.95 suggest that altitude explains most of the variation. But some sites do not fit, for example site F has a higher incidence than the lower site E. Altitude is linked to temperature, rainfall, housing and distance to clinics, so it may act as a proxy for them, and net use, spraying and wealth would need to be measured.",
        explanation: "Use the statistics, then qualify them." }),
    ], explanation: "Interpret a regression line, predict, recognise extrapolation and evaluate the explanation." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the success of strategies to prevent and control malaria in Zimbabwe (or another country you have studied).",
    hints: ["Cover nets, spraying, diagnosis and treatment, education and the limits."],
    points: [
      "Malaria in Zimbabwe is concentrated in low-lying areas of the north, east and south-east, so programmes target these districts.",
      "Insecticide-treated nets are distributed free to households and are a cost-effective way of reducing bites at night.",
      "Indoor residual spraying before the rains kills resting mosquitoes in high-burden districts.",
      "Rapid diagnostic tests and artemisinin-based treatment through clinics and village health workers reduce deaths and shorten infection.",
      "Environmental management (draining breeding sites) and education encourage the use of nets and early treatment.",
      "Limits: dependence on donor funding, nets that wear out or are used for other purposes, insecticide and drug resistance, and poor access in remote areas.",
      "Climate and movement bring outbreaks, including after warm, wet seasons and at higher altitudes.",
      "Judgement: the combination of tools has reduced the burden and saved lives, but gains are fragile without sustained funding and community participation, so the programme is partly successful.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Zimbabwe's malaria is concentrated in the low-lying north, east and south-east, so programmes target these districts. Insecticide-treated nets are distributed free and cheaply reduce bites at night, and indoor spraying before the rains kills resting mosquitoes. Rapid tests and artemisinin-based treatment through clinics and village health workers reduce deaths. Education encourages net use and early treatment. However, the programme depends partly on donor funding, nets wear out, mosquitoes and parasites can become resistant, and remote areas are hard to reach. Outbreaks can follow warm, wet seasons. I conclude that the combination of tools has reduced the burden, but gains are fragile without sustained funding and community participation.",
    wordLimit: { max: 300 }, explanation: "Weigh each tool's strengths and limits and judge." });

  b.card("DEFINITION", "Malaria", "A disease caused by Plasmodium parasites, carried between people by female Anopheles mosquitoes that bite mainly between dusk and dawn.");
  b.card("CONCEPT", "Climate controls on malaria", "Parasite development needs temperatures above about 18 °C; mosquitoes breed in standing water; transmission peaks 1–2 months after rain; altitude limits malaria.");
  b.card("FACT", "Global malaria burden", "Roughly 250 million cases and about 600 000 deaths a year in recent years (WHO, rounded); about 95% in Africa, with young children most at risk.");
  b.card("CONCEPT", "Malaria in Zimbabwe", "Seasonal (about November to May); highest in low-lying areas in the north (Zambezi valley), east and south-east lowveld; low on the high plateau.");
  b.card("CONCEPT", "Malaria control", "Insecticide-treated nets, indoor residual spraying, rapid diagnostic tests with artemisinin-based treatment, environmental management, education and vaccines for children.");
  b.card("CONCEPT", "Threats to malaria control", "Insecticide and drug resistance, falling funding, nets not used or replaced, conflict and migration, climate change, and remote areas without health services.");
  b.card("FACT", "Malaria vaccines", "The WHO recommended RTS,S (2021) and R21 (2023) for children in areas of moderate to high transmission; roll-out began in several African countries in 2024.");
  b.card("CONCEPT", "Stable and unstable malaria", "Stable: regular transmission and partial adult immunity, so mainly children are ill. Unstable: irregular transmission and little immunity, so epidemics affect all ages.");
});
