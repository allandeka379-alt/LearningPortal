// Slice G4b: population and disease (ZIMSEC 7.11.11; ZIMSEC only).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.population.diseases", { file: "population/diseases", keyPrefix: "population.diseases" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which disease is **water-borne**?",
    options: [
      ["Cholera", "Correct: it is caught from water or food contaminated by faeces."],
      ["Malaria", "Malaria is carried by mosquitoes (vector-borne)."],
      ["Kwashiorkor", "Kwashiorkor is caused by lack of protein (nutritional)."],
      ["Heart disease", "Heart disease is a lifestyle disease."],
    ],
    answer: "A",
    explanation: "Cholera, typhoid and dysentery spread through contaminated water.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which insect carries the parasite that causes malaria?",
    options: [
      ["The Anopheles mosquito", "Correct: it passes the parasite when it bites."],
      ["The tsetse fly", "The tsetse fly carries sleeping sickness."],
      ["The common housefly", "Houseflies can spread germs on food but not malaria."],
      ["The freshwater snail", "Snails are hosts for bilharzia."],
    ],
    answer: "A",
    explanation: "Malaria is vector-borne; the vector is the female Anopheles mosquito.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which part of Zimbabwe has the **lowest** risk of malaria?",
    options: [
      ["The cool highveld around Harare", "Correct: lower temperatures slow mosquitoes and the parasite."],
      ["The Zambezi valley", "This hot, low-lying area has high risk."],
      ["The Lowveld", "This hot, low-lying area has high risk."],
      ["The low eastern border valleys", "Hot, low areas near the border have higher risk."],
    ],
    answer: "A",
    explanation: "Malaria risk is highest in hot low-lying areas and lowest on the cooler highveld.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which disease is caused mainly by a lack of **protein** in a young child's diet?",
    options: [
      ["Kwashiorkor", "Correct: it causes swelling, thin hair and weakness."],
      ["Pellagra", "Pellagra is caused by lack of niacin."],
      ["Bilharzia", "Bilharzia is caused by a worm in snail-infested water."],
      ["Typhoid", "Typhoid is water-borne."],
    ],
    answer: "A",
    explanation: "Kwashiorkor is protein deficiency; marasmus is lack of food energy overall.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are lifestyle diseases the main causes of death in developed countries?",
    options: [
      ["People live longer and have rich diets", "Correct: ageing, fatty food and inactivity raise risk."],
      ["Their climates suit disease-carrying insects", "Most have temperate climates that limit vectors."],
      ["Most people lack safe drinking water", "Almost everyone has treated water."],
      ["Few people have access to doctors", "Access to doctors is generally good."],
    ],
    answer: "A",
    explanation: "With infectious diseases controlled, diseases of ageing and lifestyle dominate.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do new dams and irrigation canals sometimes increase **bilharzia**?",
    options: [
      ["Slow water suits the snails that host the worm", "Correct: larvae from snails enter the skin."],
      ["Dams release chemicals that cause bilharzia", "Bilharzia is caused by a worm, not chemicals."],
      ["Irrigated crops lack protein", "Diet does not cause bilharzia."],
      ["Canals attract tsetse flies", "Tsetse flies carry sleeping sickness."],
    ],
    answer: "A",
    explanation: "Bilharzia worms spend part of their life cycle in water snails living in still or slow water.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about what failed in the towns."],
    stem: "What was the main cause of the 2008-2009 cholera epidemic in Zimbabwe's towns?",
    options: [
      ["Breakdown of water and sewage systems", "Correct: unsafe water and burst sewers spread the bacteria."],
      ["An increase in mosquito breeding", "Mosquitoes spread malaria, not cholera."],
      ["A shortage of protein in diets", "Cholera is not a nutritional disease."],
      ["Rapid ageing of the urban population", "Ageing does not spread cholera."],
    ],
    answer: "A",
    explanation: "Failing water treatment, sewers and refuse collection during an economic crisis allowed cholera to spread.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which age group does HIV and AIDS affect most?"],
    stem: "Which is the most important **economic** effect of HIV and AIDS on a country?",
    options: [
      ["Loss of workers in their most productive years", "Correct: it mainly affects adults aged about 15-49."],
      ["A rise in the number of orphans", "This is a social effect."],
      ["Stigma against people living with HIV", "This is a social effect."],
      ["Grandparents caring for grandchildren", "This is a social effect."],
    ],
    answer: "A",
    explanation: "Losing working-age adults lowers output and skills and raises costs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Sleeping sickness is carried by the tsetse fly.",
    answer: true,
    explanation: "True. The tsetse fly carries the parasite that causes sleeping sickness (trypanosomiasis).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Malaria is a water-borne disease because people catch it by drinking dirty water.",
    answer: false,
    explanation: "False. Malaria is vector-borne: mosquitoes carry it. Water matters only as a breeding place.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each disease with its group.",
    pairs: [
      ["Typhoid", "Water-borne"],
      ["Sleeping sickness", "Vector-borne"],
      ["Marasmus", "Nutritional"],
      ["Type 2 diabetes", "Lifestyle"],
    ],
    explanation: "Group diseases by how they are caused or spread.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Pellagra is caused by a lack of {{blank:a}}, often in diets based almost only on maize. HIV is treated with {{blank:b}} therapy.",
    blanks: [
      { id: "a", accepted: ["niacin"], choices: ["niacin", "protein", "iron", "calcium"] },
      { id: "b", accepted: ["antiretroviral"], choices: ["antiretroviral", "antibiotic", "insecticide", "oral rehydration"] },
    ],
    explanation: "Pellagra: niacin deficiency. ART (antiretroviral therapy) controls HIV.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, unit: "days",
    stem: "On a fictional farm, 35 workers are each off sick with malaria for 6 days. How many working days are lost?",
    value: 210,
    wrong: [41, 35],
    explanation: "35 × 6 = 210 working days.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Cases ÷ population × 100."],
    stem: "A fictional town of 64,000 people records 1,120 cases of a water-borne disease in one rainy season. Calculate the percentage of the population affected. Give your answer to two decimal places.",
    value: (1120 / 64000) * 100, answer: "1.75", tol: 0.005,
    wrong: [17.5, 0.175],
    workedSolution: "1. 1,120 ÷ 64,000 = 0.0175.\n2. 0.0175 × 100 = 1.75%.",
    explanation: "1,120 ÷ 64,000 × 100 = 1.75%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** ways of controlling malaria.",
    points: [
      "Spraying the inside walls of homes with insecticide (indoor residual spraying).",
      "Sleeping under insecticide-treated bed nets.",
      "Draining or covering stagnant water where mosquitoes breed.",
      "Testing and treating cases quickly at clinics / preventive drugs for travellers and pregnant women / repellents.",
    ],
    modelAnswer: "Homes are sprayed with insecticide, families sleep under treated bed nets, stagnant pools are drained, and clinics test and treat cases quickly.",
    explanation: "Four distinct methods.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    hints: ["Use sanitation, climate, wealth and age structure."],
    stem: "Explain **two** reasons why infectious diseases cause more deaths in developing countries than in developed countries.",
    points: [
      "Lack of safe water and sanitation in developing countries.",
      "Explains: allows water-borne diseases such as cholera and typhoid to spread.",
      "Tropical climates / fewer doctors and medicines / poverty and undernutrition.",
      "Explains: e.g. mosquitoes breed all year so malaria spreads / weak immune systems / diseases go untreated.",
    ],
    modelAnswer: "Many people in developing countries lack safe water and sewers, so cholera and typhoid spread easily. Many also live in the tropics, where mosquitoes thrive, and have few clinics and medicines, so malaria is common and often untreated.",
    explanation: "Two reasons, each explained.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    hints: ["Give social and economic effects, with Zimbabwean examples, then judge."],
    stem: "With reference to Zimbabwe, explain the social and economic effects of diseases on a population. Which effects are the most serious? Justify your answer.",
    points: [
      "Social: lower life expectancy / higher infant mortality (e.g. HIV and AIDS, malaria in children).",
      "Social: orphans and child-headed households; grandparents as carers.",
      "Social: children (often girls) leave school to care for the sick; stigma.",
      "Social: pressure on clinics and hospitals (e.g. 2008-2009 cholera epidemic).",
      "Economic: loss of workers aged about 15-49 / lower productivity on farms and in industry.",
      "Economic: household spending on treatment and funerals; loss of savings.",
      "Economic: government health spending; loss of teachers and nurses; reduced tourism or investment.",
      "Judgement with reason (e.g. loss of working-age adults affects both families and the national economy).",
    ],
    levels: geographyLevels(8),
    modelAnswer: "HIV and AIDS lowered life expectancy in Zimbabwe in the 1990s and 2000s and left many orphans, often cared for by grandparents or in child-headed households. Children, especially girls, missed school to care for sick relatives. Malaria in the hot low-lying areas kills young children and keeps adults from work in the rainy season, and the 2008-2009 cholera epidemic overwhelmed clinics. Economically, disease removes workers in their most productive years, reducing farm and factory output; families spend savings on medicine and funerals; and the government must spend heavily on health care, while the loss of teachers and nurses weakens services. The most serious effects are those of HIV and AIDS on working-age adults, because they reduce household income and national output at the same time as creating orphans, so they harm both the present and the future generation.",
    explanation: "Both types of effect, examples and a justified judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the leading causes of death in two fictional countries (percentage of all deaths, fictional data).\n\n| Cause of death | Country X | Country Y |\n|---|---|---|\n| Heart disease and strokes | 9 | 38 |\n| Cancers | 5 | 27 |\n| HIV and AIDS, TB | 21 | 1 |\n| Malaria | 14 | 0 |\n| Diarrhoeal diseases | 12 | 1 |\n| Other causes | 39 | 33 |",
    hints: ["Which country has more infectious diseases?"],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the total percentage of deaths in Country X caused by HIV and AIDS, TB, malaria and diarrhoeal diseases.", value: 47, wrong: [35, 2], explanation: "21 + 14 + 12 = 47%." }),
      P.mcq({
        label: "(b)", stem: "Which country is most likely to be a developed country?",
        options: [
          ["Country Y", "Correct: heart disease and cancers dominate."],
          ["Country X", "Infectious diseases dominate in Country X."],
          ["Both equally", "The patterns are very different."],
          ["Neither, as both have high malaria", "Country Y has no malaria deaths."],
        ],
        answer: "A", explanation: "Lifestyle and old-age diseases dominate in developed countries.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why heart disease and cancers cause a much larger share of deaths in Country Y.",
        points: ["Infectious diseases are controlled (safe water, vaccines, health care), so fewer die young.", "People live longer / ageing population, and these diseases mainly affect older people.", "Diets high in fat and sugar, little exercise, smoking."],
        modelAnswer: "With infectious diseases controlled, most people live to old age, when heart disease and cancers are common, and rich diets, inactivity and smoking raise the risk.",
        explanation: "Link the pattern to development and lifestyle.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** measures that would reduce diarrhoeal deaths in Country X.",
        points: ["Safe piped water / boreholes / water treatment.", "Sewers or toilets / hygiene education / oral rehydration therapy / refuse collection."],
        modelAnswer: "Provide safe water from protected boreholes and build toilets, with hygiene education.",
        explanation: "Measures that break the faecal-oral route.",
      }),
    ],
    explanation: "This item practises comparing disease patterns.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "Table 1 shows monthly malaria cases at a fictional clinic in a low-lying district of Zimbabwe (fictional data).\n\n| Month | Jan | Mar | May | Jul | Sep | Nov |\n|---|---|---|---|---|---|---|\n| Cases | 410 | 520 | 180 | 40 | 30 | 150 |",
    hints: ["Link cases to the seasons."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the range of monthly cases shown.", value: 490, wrong: [520, 550], explanation: "520 − 30 = 490." }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe and explain the seasonal pattern of cases.",
        points: ["Cases are highest in the hot wet season (January-March, peak in March).", "Rain leaves stagnant water where mosquitoes breed; heat speeds up mosquito and parasite development.", "Cases are lowest in the cool dry season (July-September) when there is little standing water and it is cooler."],
        modelAnswer: "Cases peak in March, late in the hot wet season, when pools of water let mosquitoes breed and heat speeds up the parasite. They are lowest in July-September, in the cool dry season.",
        explanation: "Describe with data, explain with climate.",
      }),
    ],
    explanation: "This item practises linking disease to climate.",
  });

  b.card("DEFINITION", "Water-borne disease", "Spread by contaminated water, usually from human waste: cholera, typhoid, dysentery.");
  b.card("DEFINITION", "Vector-borne disease", "Carried by a living carrier: malaria (Anopheles mosquito), sleeping sickness (tsetse fly).");
  b.card("DEFINITION", "Nutritional disease", "Caused by a poor diet: kwashiorkor (protein), marasmus (energy), pellagra (niacin).");
  b.card("DEFINITION", "Lifestyle disease", "Non-communicable disease linked to diet, inactivity, smoking, alcohol and ageing: heart disease, type 2 diabetes, cancers.");
  b.card("FACT", "Malaria in Zimbabwe", "Highest risk in hot, low-lying areas (Zambezi valley, Lowveld, border valleys) in the hot wet season; lowest on the highveld.");
  b.card("FACT", "Cholera 2008-2009", "Zimbabwe epidemic: roughly 100,000 cases, over 4,000 deaths (approximate); failing water and sewage systems.");
  b.card("CONCEPT", "Why disease patterns differ", "Water and sanitation, climate, wealth and diet, health care, education, age structure.");
  b.card("CONCEPT", "Social effects of disease", "Lower life expectancy, orphans, children leaving school to care, stigma, pressure on clinics.");
  b.card("CONCEPT", "Economic effects of disease", "Lost working days and skills, lower output, household spending on treatment, government health costs.");
});
