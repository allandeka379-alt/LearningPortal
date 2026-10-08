// Slice G4b: population terms and data (ZIMSEC 7.11.5; Cambridge 6.1.2).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

concept("geo.population.terms-data", { file: "population/terms-data", keyPrefix: "population.terms-data" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **crude birth rate**?",
    options: [
      ["Live births per 1,000 people in a year", "Correct: the standard definition."],
      ["Average number of children per woman", "That is the total fertility rate."],
      ["Births minus deaths per 1,000 people", "That is natural increase."],
      ["Babies dying before age one per 1,000 births", "That is the infant mortality rate."],
    ],
    answer: "A",
    explanation: "Birth rate = live births ÷ population × 1,000.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term means the average number of years a newborn baby is expected to live?",
    options: [
      ["Life expectancy", "Correct."],
      ["Death rate", "Death rate is deaths per 1,000 people."],
      ["Dependency ratio", "This compares dependants with working-age people."],
      ["Fertility rate", "This is about births per woman."],
    ],
    answer: "A",
    explanation: "Life expectancy is the average expected lifespan at birth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The infant mortality rate is calculated by dividing infant deaths by:",
    options: [
      ["the number of live births, then multiplying by 1,000", "Correct: IMR is per 1,000 live births."],
      ["the total population, then multiplying by 1,000", "This would give a much smaller, misleading figure."],
      ["the number of women aged 15-49", "That is used for fertility measures."],
      ["the total number of deaths", "This gives the share of deaths that are infants."],
    ],
    answer: "A",
    explanation: "IMR = infant deaths ÷ live births × 1,000.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What total fertility rate is generally taken as the **replacement level**?",
    options: [
      ["About 2.1", "Correct: slightly above 2 to allow for deaths before adulthood."],
      ["About 1.0", "This would halve the population each generation."],
      ["About 4.0", "This would roughly double the population each generation."],
      ["About 7.0", "This is far above replacement."],
    ],
    answer: "A",
    explanation: "Each woman needs about 2.1 children to replace herself and her partner.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country has a birth rate of 30 per 1,000 and a death rate of 8 per 1,000. What is its rate of natural increase?",
    options: [
      ["2.2%", "Correct: (30 − 8) ÷ 10 = 2.2%."],
      ["22%", "22 per 1,000 is 2.2%, not 22%."],
      ["3.8%", "This adds the rates instead of subtracting."],
      ["0.22%", "Dividing by 100 instead of 10 gives this."],
    ],
    answer: "A",
    explanation: "Natural increase = birth rate − death rate = 22 per 1,000 = 2.2%.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "How often does Zimbabwe hold a national population census?",
    options: [
      ["Every ten years", "Correct: 1982, 1992, 2002, 2012, 2022."],
      ["Every year", "Annual counts would be far too expensive."],
      ["Every five years", "Zimbabwe's censuses are ten years apart."],
      ["Only at independence", "Censuses have been held regularly since 1982."],
    ],
    answer: "A",
    explanation: "ZimStat conducts a census every ten years.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Population change has two parts.", "Which part does natural increase ignore?"],
    stem: "A town's birth rate is higher than its death rate, yet its population is falling. What is the most likely explanation?",
    options: [
      ["Emigration exceeds natural increase", "Correct: net out-migration is larger than the natural gain."],
      ["Its death rate is higher than its birth rate", "The stem says the birth rate is higher."],
      ["Its fertility rate is above replacement", "That would add to growth."],
      ["Its infant mortality rate has fallen", "Lower infant mortality would increase growth."],
    ],
    answer: "A",
    explanation: "Population change = natural increase + net migration.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Think about who is hard to count."],
    stem: "Which group is most likely to be **undercounted** in a census in a low-income country?",
    options: [
      ["Mobile cross-border traders and the homeless", "Correct: they are hard to find on census night."],
      ["Teachers living in school houses", "They have fixed addresses."],
      ["Families in planned suburbs", "These are easy to enumerate."],
      ["Patients in hospital on census night", "Institutions are counted directly."],
    ],
    answer: "A",
    explanation: "Mobile and homeless people are the hardest to count.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Vital registration is the official recording of births, deaths and marriages.",
    answer: true,
    explanation: "True. It is a continuous source of population data.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A natural increase of 25 per 1,000 is the same as 25%.",
    answer: false,
    explanation: "False. 25 per 1,000 is 2.5%.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its definition.",
    pairs: [
      ["Crude death rate", "Deaths per 1,000 people per year"],
      ["Total fertility rate", "Average children per woman in her lifetime"],
      ["Natural increase", "Birth rate minus death rate"],
      ["Net migration", "Immigrants minus emigrants"],
    ],
    explanation: "These terms appear in many data questions.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Doubling time can be estimated as {{blank:a}} divided by the growth rate in per cent. Zimbabwe's census is run by the Zimbabwe National {{blank:b}} Agency.",
    blanks: [
      { id: "a", accepted: ["70"], choices: ["70", "100", "1,000", "2.1"] },
      { id: "b", accepted: ["Statistics"], choices: ["Statistics", "Planning", "Registration", "Housing"] },
    ],
    explanation: "Rule of 70; ZimStat = Zimbabwe National Statistics Agency.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "‰", daily: true,
    stem: "A fictional district of 48,000 people recorded 1,560 live births in a year. Calculate the crude birth rate (per 1,000).",
    value: 32.5, tol: 0.05,
    wrong: [3.25, 30.8],
    explanation: "1,560 ÷ 48,000 × 1,000 = 32.5 per 1,000.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "‰",
    stem: "In a fictional district there were 1,950 live births and 78 infant deaths in a year. Calculate the infant mortality rate.",
    value: 40, tol: 0,
    wrong: [25, 4],
    explanation: "78 ÷ 1,950 × 1,000 = 40 per 1,000 live births.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "‰",
    hints: ["Net migration = immigrants − emigrants.", "Divide by the population and multiply by 1,000."],
    stem: "A fictional province of 60,000 people had 900 immigrants and 2,100 emigrants in a year. Calculate the net migration rate per 1,000.",
    value: -20, tol: 0,
    wrong: [20, 50],
    workedSolution: "1. Net migration = 900 − 2,100 = −1,200.\n2. Rate = −1,200 ÷ 60,000 × 1,000 = −20 per 1,000.",
    explanation: "−1,200 ÷ 60,000 × 1,000 = −20 per 1,000 (net loss).",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "years",
    hints: ["Use the rule of 70."],
    stem: "A fictional country's population is growing at 3.5% a year. Estimate its doubling time.",
    value: 20, tol: 0,
    wrong: [245, 35],
    workedSolution: "1. Doubling time ≈ 70 ÷ growth rate.\n2. 70 ÷ 3.5 = 20 years.",
    explanation: "70 ÷ 3.5 = 20 years.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** problems of conducting a census in a low-income country.",
    points: [
      "High cost / shortage of trained enumerators.",
      "Remote or inaccessible areas with poor roads.",
      "Mobile people (migrants, nomads, homeless) are hard to count.",
      "Mistrust of government / inaccurate ages / language and literacy barriers.",
    ],
    modelAnswer: "Censuses are expensive and need many trained enumerators. Remote areas are hard to reach on poor roads. Migrants and homeless people are often missed, and some people distrust the census or do not know their exact age.",
    explanation: "Four specific problems.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    hints: ["Think about planning schools, clinics, housing and water."],
    stem: "Explain why governments need accurate population data.",
    points: [
      "To plan services: number of schools, teachers, clinics and hospitals needed.",
      "To plan infrastructure: housing, water, roads and electricity for growing areas.",
      "To allocate funds and resources fairly between areas / plan for future trends such as ageing.",
    ],
    modelAnswer: "Governments use population data to work out how many schools, teachers and clinics each area needs, to plan housing, water and roads where populations are growing, and to share out funds fairly between districts.",
    explanation: "Each point links data to a planning use.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    hints: ["Consider coverage, cost, frequency and accuracy of each source."],
    stem: "Evaluate the usefulness of a national census, vital registration and sample surveys as sources of population data in a country such as Zimbabwe.",
    points: [
      "Census: complete count with detail for small areas; allows comparison over time.",
      "Census limitations: very expensive, only every ten years, undercounting and age errors.",
      "Vital registration: continuous, legal records of births and deaths.",
      "Vital registration limitations: many rural births and deaths are not registered.",
      "Sample surveys: cheaper, quicker, detailed health and fertility data; but estimates with sampling error.",
      "Judgement: sources are best used together, e.g. surveys update census figures between censuses.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "A census such as Zimbabwe's 2022 count is the most complete source, giving detailed data for every ward and allowing comparison with earlier censuses. However, it is very expensive, held only every ten years, and mobile people may be missed. Vital registration records births and deaths continuously, but many rural births and deaths are never registered, so rates based on it are too low. Sample surveys are cheaper and can ask detailed questions about health and family planning, but they give estimates that depend on the sample. The census is the most useful foundation, but the sources work best together, with surveys and registration updating the picture between censuses.",
    explanation: "Weigh each source and judge.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows data for three fictional countries (fictional data).\n\n| Country | Birth rate (per 1,000) | Death rate (per 1,000) | Infant mortality rate (per 1,000 live births) | Life expectancy (years) |\n|---|---|---|---|---|\n| A | 41 | 12 | 62 | 58 |\n| B | 20 | 7 | 18 | 72 |\n| C | 11 | 12 | 3 | 83 |",
    hints: ["Natural increase (%) = (birth rate − death rate) ÷ 10.", "Link infant mortality to life expectancy."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the rate of natural increase of Country A as a percentage.", value: 2.9, tol: 0.05, wrong: [29, 5.3], explanation: "(41 − 12) ÷ 10 = 2.9%." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the rate of natural change of Country C as a percentage.", value: -0.1, tol: 0.005, wrong: [0.1, -1], explanation: "(11 − 12) ÷ 10 = −0.1% (natural decrease)." }),
      P.mcq({
        label: "(c)", stem: "Which country is most likely to be a high-income country?",
        options: [
          ["C", "Correct: lowest birth rate and IMR, highest life expectancy."],
          ["A", "A has high birth and infant mortality rates, typical of an LIC."],
          ["B", "B looks like a middle-income country."],
          ["A and B equally", "Neither has the low rates and long lives of C."],
        ],
        answer: "A", explanation: "Low fertility and IMR with long lives indicate an HIC.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest reasons why Country A's infant mortality rate is much higher than Country C's.",
        points: ["Less access to clinics, trained midwives and hospitals in A.", "Unsafe water and poor sanitation cause diarrhoea and other diseases.", "Malnutrition / lower vaccination rates / poverty / less education of mothers."],
        modelAnswer: "In Country A fewer births take place with trained midwives, and many families lack safe water, so babies die from diarrhoea. Poverty and malnutrition weaken babies, and fewer are vaccinated.",
        explanation: "Health care, water, nutrition and education explain IMR.",
      }),
    ],
    explanation: "This item practises calculating and interpreting population rates.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480, applies: ZIM,
    stem: "A Form 3 class carried out a census of 120 learners (fictional data).\n\n| Home area | Learners | Mean number of siblings |\n|---|---|---|\n| Rural | 45 | 4.4 |\n| Urban high-density | 50 | 3.1 |\n| Urban low-density | 25 | 1.8 |",
    hints: ["Check that the learners add up to 120."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "What percentage of learners come from rural homes? Give your answer to one decimal place.", value: 37.5, tol: 0.05, wrong: [45, 26.7], explanation: "45 ÷ 120 × 100 = 37.5%." }),
      P.mcq({
        label: "(b)", stem: "Which type of graph is most suitable to show the share of learners from each home area?",
        options: [
          ["Pie chart", "Correct: it shows parts of a whole (120 learners)."],
          ["Line graph", "Line graphs show change over time."],
          ["Population pyramid", "Pyramids show age and sex structure."],
          ["Scatter graph", "Scatter graphs show relationships between two variables."],
        ],
        answer: "A", explanation: "Proportions of a total suit a pie chart.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Suggest reasons why learners from rural homes have more siblings than those from low-density urban homes.",
        points: ["Children help with farm work and herding in rural areas.", "Raising children costs more in town (school fees, rent, food).", "Urban parents are often more educated / have better access to family planning / women in paid jobs."],
        modelAnswer: "Rural families need children to help in the fields and with cattle, while in town children are expensive to feed, house and educate. Urban low-density parents are often more educated, use family planning more and many mothers work.",
        explanation: "Link family size to economic and social conditions.",
      }),
    ],
    explanation: "This item practises collecting and interpreting local population data.",
  });

  b.card("DEFINITION", "Crude birth rate", "Live births per 1,000 people in a year.");
  b.card("DEFINITION", "Crude death rate", "Deaths per 1,000 people in a year.");
  b.card("DEFINITION", "Natural increase", "Birth rate minus death rate (per 1,000; divide by 10 for %).");
  b.card("DEFINITION", "Infant mortality rate", "Deaths of babies under one year per 1,000 live births in a year.");
  b.card("DEFINITION", "Total fertility rate", "Average number of children per woman in her lifetime; replacement level about 2.1.");
  b.card("CONCEPT", "Population change", "Natural increase + net migration (immigrants − emigrants).");
  b.card("CONCEPT", "Doubling time", "Approximately 70 ÷ growth rate (%). E.g. 2% a year → about 35 years.");
  b.card("FACT", "Censuses in Zimbabwe", "Held every ten years (1982, 1992, 2002, 2012, 2022) by ZimStat.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Problems of censuses in LICs", "Cost, remote areas, mobile and homeless people, mistrust, unknown ages, language and literacy.");
});
