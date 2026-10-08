// Slice G4b: urbanisation and urban growth (ZIMSEC 7.11.2.1; Cambridge 7.1.1-7.1.2).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.settlement.urbanisation", { file: "settlement/urbanisation", keyPrefix: "settlement.urbanisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **urbanisation**?",
    options: [
      ["An increase in the percentage of people living in towns", "Correct: urbanisation is about the proportion that is urban."],
      ["An increase in the area covered by a single city", "That is urban growth or urban sprawl."],
      ["The movement of people out of cities into villages", "That is counter-urbanisation."],
      ["The building of new roads between two towns", "That is transport development."],
    ],
    answer: "A",
    explanation: "Urbanisation = a rising proportion of the population living in urban areas.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **pull** factor that attracts rural people to towns?",
    options: [
      ["The chance of a paid job", "Correct: jobs in town attract migrants."],
      ["Repeated drought in the village", "Drought pushes people out of rural areas."],
      ["Shortage of land for farming", "Land shortage is a push factor."],
      ["Lack of clinics in rural areas", "Lack of services is a push factor."],
    ],
    answer: "A",
    explanation: "Pull factors are attractions of the destination; push factors are problems at the origin.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Apart from rural-urban migration, what is the other main cause of rapid urban growth in LICs?",
    options: [
      ["High natural increase among young urban residents", "Correct: young migrants have children in town."],
      ["Counter-urbanisation from rural areas", "Counter-urbanisation moves people out of cities."],
      ["Low birth rates in urban areas", "Low birth rates would slow growth."],
      ["Emigration of city dwellers to other countries", "Emigration reduces urban population."],
    ],
    answer: "A",
    explanation: "Migration plus natural increase drive urban growth in LICs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are urban growth rates generally **slow** in high-income countries?",
    options: [
      ["Most people already live in towns, so few remain to migrate", "Correct: high urbanisation leaves little rural population to move."],
      ["Their cities have no jobs to attract migrants", "HIC cities have many jobs."],
      ["Their birth rates are the highest in the world", "HIC birth rates are low."],
      ["Laws forbid people from living in cities", "No such general laws exist."],
    ],
    answer: "A",
    explanation: "HICs urbanised during industrialisation; now growth is slow and counter-urbanisation occurs.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which world region are urban populations currently growing fastest?",
    options: [
      ["Sub-Saharan Africa", "Correct: low urbanisation levels, rapid migration and high natural increase."],
      ["Western Europe", "Western Europe is highly urbanised with slow growth."],
      ["North America", "North America is highly urbanised with slow growth."],
      ["Australia and New Zealand", "These are highly urbanised with slow growth."],
    ],
    answer: "A",
    explanation: "Sub-Saharan Africa and South Asia have the fastest urban growth.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Why did the urban African population of Zimbabwe grow quickly after 1980?",
    options: [
      ["Colonial restrictions on moving to towns were removed", "Correct: people could now live and work freely in towns."],
      ["Most towns were built only after 1980", "Harare and Bulawayo were founded long before 1980."],
      ["Rural areas suddenly had more jobs than towns", "This would reduce migration to towns."],
      ["Urban birth rates fell to zero", "Birth rates did not fall to zero."],
    ],
    answer: "A",
    explanation: "Independence ended controls on Africans' residence in towns, releasing rural-urban migration.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Compare the percentage urban with the number of urban people."],
    stem: "A country's urban population rose from 5.2 to 5.7 million, but the percentage living in towns fell slightly. What does this show?",
    options: [
      ["Urban growth occurred without urbanisation", "Correct: numbers rose while the urban share fell."],
      ["Urbanisation occurred without urban growth", "The share fell, so there was no urbanisation."],
      ["Both urbanisation and urban growth occurred", "The urban share fell, so urbanisation did not occur."],
      ["Counter-urbanisation emptied the towns", "Urban numbers increased, so the towns did not empty."],
    ],
    answer: "A",
    explanation: "Rural population grew faster than urban population, so the urban share fell even as towns grew.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Is the factor in the village or in the town?"],
    stem: "A young man leaves his village because his family's plot is too small to divide among his brothers. This is an example of:",
    options: [
      ["a push factor", "Correct: land shortage in the village drives him away."],
      ["a pull factor", "A pull factor is an attraction of the town."],
      ["counter-urbanisation", "He is moving towards town, not away from it."],
      ["natural increase", "Natural increase is births minus deaths."],
    ],
    answer: "A",
    explanation: "Problems at the place of origin are push factors.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Since about 2007, more than half of the world's people have lived in urban areas.",
    answer: true,
    explanation: "True, according to United Nations estimates.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Low-income countries usually have both the highest level of urbanisation and the fastest rate of urban growth.",
    answer: false,
    explanation: "False. LICs have low levels of urbanisation but the fastest growth rates; HICs have high levels and slow growth.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Urbanisation", "Rise in the percentage of people living in towns"],
      ["Urban growth", "Rise in the number of urban people or urban area"],
      ["Counter-urbanisation", "Movement out of big cities to smaller towns and villages"],
      ["Megacity", "A city of more than 10 million people"],
    ],
    explanation: "These terms are often confused in exams.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Drought in a rural area is a {{blank:a}} factor, while better hospitals in a city are a {{blank:b}} factor.",
    blanks: [
      { id: "a", accepted: ["push"], choices: ["push", "pull"] },
      { id: "b", accepted: ["pull"], choices: ["push", "pull"] },
    ],
    explanation: "Push factors are at the origin; pull factors at the destination.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%", daily: true,
    stem: "A fictional country has 12 million people, of whom 4.2 million live in urban areas. Calculate the level of urbanisation.",
    value: 35, tol: 0.05,
    wrong: [4.2, 285.7],
    explanation: "4.2 ÷ 12 × 100 = 35%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Find the increase first.", "Divide by the original value."],
    stem: "The population of a fictional town grew from 2.4 million to 3.0 million in ten years. Calculate the percentage increase.",
    value: 25, tol: 0.05,
    wrong: [20, 0.6],
    workedSolution: "1. Increase = 3.0 − 2.4 = 0.6 million.\n2. 0.6 ÷ 2.4 × 100 = 25%.",
    explanation: "0.6 ÷ 2.4 × 100 = 25%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** push factors and **two** pull factors that cause rural-urban migration in a country such as Zimbabwe.",
    points: [
      "Push: drought, crop failure or land degradation reduce farm income.",
      "Push: shortage of land / poverty / lack of jobs or services in rural areas.",
      "Pull: jobs and higher wages in towns, including the informal sector.",
      "Pull: better schools, colleges, hospitals, piped water or electricity / relatives already in town.",
    ],
    modelAnswer: "Droughts cause crops to fail and families lose income, and land is too scarce to share among grown-up children. Towns offer paid jobs, including in the informal sector, and better schools, hospitals and electricity.",
    explanation: "Two push and two pull factors.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    hints: ["Contrast HICs and LICs: level of urbanisation, natural increase and migration."],
    stem: "Explain why rates of urban growth are higher in LICs than in HICs.",
    points: [
      "LICs have large rural populations, so many potential rural-urban migrants.",
      "Strong push factors (poverty, drought, land shortage) and pull factors in LICs.",
      "Young urban populations in LICs produce high natural increase.",
      "HICs are already highly urbanised, have low birth rates and some counter-urbanisation.",
    ],
    modelAnswer: "In LICs most people still live in rural areas, and poverty and land shortage push many towards towns that offer jobs and services. Migrants are young, so urban birth rates are high. HICs, in contrast, are already highly urbanised with low birth rates, and some people move out of cities.",
    explanation: "Explain both sides of the contrast.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Weigh push, pull and natural increase.", "Use a named city or country."],
    stem: "\"Rural-urban migration is the main cause of rapid urban growth in low-income countries.\" With reference to a named country, how far do you agree?",
    points: [
      "Names a country or city (e.g. Zimbabwe / Harare).",
      "Push factors explained: drought, land shortage, poverty, lack of services.",
      "Pull factors explained: jobs, wages, education, health care, informal sector.",
      "Natural increase: young migrants have children in town; lower urban death rates.",
      "Natural increase can account for a large share of growth once cities are big.",
      "Other factors: boundary changes absorbing villages / historical controls removed (e.g. after 1980).",
      "Supported judgement on the relative importance of migration and natural increase.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "In Zimbabwe, rural-urban migration has been an important cause of growth in Harare. After 1980 colonial restrictions ended, and drought, small plots and lack of services pushed people out of communal areas while jobs, colleges and hospitals pulled them to the city. However, migrants are mostly young adults who then raise families in town, and urban death rates are lower because of better health care, so natural increase adds many people each year. As the city grows, natural increase becomes a larger share of growth, and the city also spreads as nearby settlements such as Epworth and Ruwa are absorbed into the urban area. Migration started rapid growth and remains important, especially in drought years, but natural increase now probably contributes as much, so the statement is only partly true.",
    explanation: "Weigh migration against natural increase and reach a supported judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows census results for a fictional country (fictional data).\n\n| Census year | Urban population (millions) | Total population (millions) |\n|---|---|---|\n| 1982 | 1.8 | 7.5 |\n| 1992 | 3.0 | 10.4 |\n| 2002 | 3.9 | 11.6 |\n| 2012 | 4.3 | 13.0 |",
    hints: ["Percentage urban = urban ÷ total × 100.", "Compare the trend in the number with the trend in the percentage."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage of the population that was urban in 1982.", value: 24, tol: 0.05, wrong: [41.7, 1.8], explanation: "1.8 ÷ 7.5 × 100 = 24%." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage urban in 2012. Give your answer to one decimal place.", value: 33.077, answer: "33.1", tol: 0.05, wrong: [30.2, 43], explanation: "4.3 ÷ 13.0 × 100 = 33.1%." }),
      P.num({ label: "(c)", marks: 2, unit: "%", stem: "Calculate the percentage increase in the urban population between 1982 and 2012. Give your answer to the nearest whole number.", value: 138.89, answer: "139", tol: 0.5, wrong: [58, 2.5], explanation: "(4.3 − 1.8) ÷ 1.8 × 100 = 138.9%, about 139%." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe how urbanisation and urban growth changed between 2002 and 2012, and suggest one reason.",
        points: ["Urban growth continued: the urban population rose from 3.9 to 4.3 million.", "But the level of urbanisation fell slightly, from about 33.6% to 33.1%.", "Reason: rural population grew faster (e.g. economic decline / fewer urban jobs slowed migration / return migration to rural areas)."],
        modelAnswer: "The number of urban people kept rising, from 3.9 to 4.3 million, but the share fell slightly from 33.6% to 33.1%. This is probably because economic problems reduced urban jobs, so fewer people migrated and some returned to rural homes.",
        explanation: "Distinguish the number from the percentage.",
      }),
    ],
    explanation: "This item practises urbanisation calculations and the difference between urbanisation and urban growth.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "A Form 3 class asked 40 people who had recently moved to a fictional town why they came (fictional data). Each person gave one main reason.\n\n| Main reason | Number of people |\n|---|---|\n| Looking for work | 18 |\n| Education | 9 |\n| Joining family | 7 |\n| Drought in home area | 4 |\n| Health care | 2 |",
    hints: ["Total the responses first.", "Decide whether each reason is about the origin or the destination."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "What percentage of the people gave \"looking for work\" as their main reason?", value: 45, tol: 0.05, wrong: [18, 40], explanation: "18 ÷ 40 × 100 = 45%." }),
      P.mcq({
        label: "(b)", stem: "Which reason in the table is a **push** factor?",
        options: [
          ["Drought in home area", "Correct: it is a problem at the place of origin."],
          ["Looking for work", "Jobs in town attract migrants: a pull factor."],
          ["Education", "Schools and colleges in town are a pull factor."],
          ["Health care", "Better health care in town is a pull factor."],
        ],
        answer: "A", explanation: "Push factors are problems in the area people leave.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** ways the class could make their survey more reliable.",
        points: ["Ask a larger sample (more than 40 people).", "Sample in several parts of the town / at different times / use random or systematic sampling / allow more than one reason."],
        modelAnswer: "They could interview more people and choose them by systematic sampling in several suburbs, not just one place.",
        explanation: "Reliability improves with larger, less biased samples.",
      }),
    ],
    explanation: "This item practises analysing migration survey data.",
  });

  b.card("DEFINITION", "Urbanisation", "An increase in the percentage of a population living in urban areas.");
  b.card("DEFINITION", "Urban growth", "An increase in the number of people living in towns, or in the area towns cover.");
  b.card("DEFINITION", "Counter-urbanisation", "Movement of people out of large cities to smaller towns and rural areas, common in HICs.");
  b.card("CONCEPT", "Causes of rapid urban growth in LICs", "Rural-urban migration (push and pull factors) plus high natural increase among young urban populations.");
  b.card("CONCEPT", "Push factors", "Drought, crop failure, land shortage, poverty, few jobs and services, conflict in rural areas.");
  b.card("CONCEPT", "Pull factors", "Jobs, wages, schools, hospitals, piped water, electricity, family in town, perceived better life.");
  b.card("FACT", "Global urban growth", "Since about 2007 over half the world's people are urban; growth is fastest in sub-Saharan Africa and South Asia.");
  b.card("FACT", "Urbanisation in Zimbabwe", "Colonial controls limited African urban residence; growth accelerated after 1980 and later slowed with economic decline.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Calculating level of urbanisation", "Urban population ÷ total population × 100.");
});
