// Slice G4b: population structure and pyramids (ZIMSEC 7.11.6; Cambridge 6.2).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.population.structure", { file: "population/structure", keyPrefix: "population.structure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does a wide base on a population pyramid show?",
    options: [
      ["A high birth rate", "Correct: many young children."],
      ["A long life expectancy", "That is shown by a wide top."],
      ["A low death rate in old age", "That is shown by the upper bars."],
      ["Many elderly women", "That is shown at the top on the female side."],
    ],
    answer: "A",
    explanation: "The base shows the youngest age groups, so it reflects the birth rate.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which age groups are counted as **dependants** in the dependency ratio?",
    options: [
      ["0-14 and 65 and over", "Correct: children and the elderly."],
      ["15-64 only", "These are the working-age population."],
      ["0-4 only", "This leaves out older children and the elderly."],
      ["Everyone over 18", "Most adults are of working age."],
    ],
    answer: "A",
    explanation: "Dependants = 0-14 and 65+; workers = 15-64.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A pyramid has a narrow base and a wide top. Which type of population does it show?",
    options: [
      ["An ageing population", "Correct: few births and many elderly."],
      ["A youthful population", "A youthful pyramid has a wide base."],
      ["A population with high infant mortality", "High IMR is linked to a wide base that narrows quickly."],
      ["A population with rapid natural increase", "Rapid growth gives a wide base."],
    ],
    answer: "A",
    explanation: "Low birth rates plus long life expectancy give an ageing pyramid.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature on a pyramid for a mining town would show the in-migration of male workers?",
    options: [
      ["Wider male bars in the 20-39 age groups", "Correct: young adult men have moved in for work."],
      ["Wider female bars in the 70+ age groups", "This reflects women's longer lives."],
      ["A narrow base for both sexes", "This reflects low birth rates."],
      ["Equal bars for males and females at all ages", "This would show no sex-selective migration."],
    ],
    answer: "A",
    explanation: "Migration of young male workers widens the male working-age bars.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **cause** of an ageing population?",
    options: [
      ["Longer life expectancy", "Correct: more people live into old age."],
      ["High birth rates for many decades", "High birth rates create a youthful population."],
      ["In-migration of young families", "This makes the population younger."],
      ["High infant mortality", "This affects the young, not ageing."],
    ],
    answer: "A",
    explanation: "Low birth rates and long life expectancy cause ageing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Compared with Germany's pyramid, Zimbabwe's pyramid has:",
    options: [
      ["a wider base and a narrower top", "Correct: higher birth rates and shorter life expectancy."],
      ["a narrower base and a wider top", "That describes Germany compared with Zimbabwe."],
      ["identical bars in every age group", "The two structures are very different."],
      ["a bulge only in the oldest age groups", "Zimbabwe has few elderly people."],
    ],
    answer: "A",
    explanation: "Zimbabwe is youthful; Germany is ageing.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which group leaves rural areas to find work?"],
    stem: "A rural district's pyramid shows many children and elderly people but narrow bars for people aged 20-39. What is the most likely explanation?",
    options: [
      ["Young adults have migrated to towns or abroad for work", "Correct: out-migration removes working-age people."],
      ["The district has a very low birth rate", "There are many children, so births are high."],
      ["Life expectancy in the district is very short", "There are many elderly people."],
      ["Young adults have moved into the district for jobs", "In-migration would widen these bars."],
    ],
    answer: "A",
    explanation: "Out-migration of young adults hollows out the middle of the pyramid.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    hints: ["Which measure adds to the number of working people?"],
    stem: "Which policy would most directly reduce the labour shortage caused by an ageing population?",
    options: [
      ["Raising the retirement age", "Correct: people work for longer, adding to the workforce."],
      ["Lowering the pension age", "This would shrink the workforce."],
      ["Closing care homes", "This does not add workers."],
      ["Reducing the number of foreign workers", "This would worsen the shortage."],
    ],
    answer: "A",
    explanation: "Later retirement keeps people in work.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "On a population pyramid, males are usually shown on the left and females on the right.",
    answer: true,
    explanation: "True. This is the standard convention.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "A youthful population brings only problems and no opportunities.",
    answer: false,
    explanation: "False. It can provide a large future workforce and market (a demographic dividend) if jobs and education are provided.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pyramid feature with what it shows.",
    pairs: [
      ["Wide base", "High birth rate"],
      ["Wide top", "Long life expectancy"],
      ["Bars narrowing rapidly with age", "High death rates"],
      ["Notch in the 20-39 bars", "Out-migration of young adults"],
    ],
    explanation: "Each part of a pyramid gives evidence about births, deaths or migration.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A population with a high proportion of people over 65 is an {{blank:a}} population. The number of dependants per 100 people of working age is the {{blank:b}} ratio.",
    blanks: [
      { id: "a", accepted: ["ageing"], choices: ["ageing", "youthful", "stable", "expanding"] },
      { id: "b", accepted: ["dependency"], choices: ["dependency", "sex", "fertility", "replacement"] },
    ],
    explanation: "Ageing populations raise the elderly dependency ratio.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A fictional country has 4.1 million people aged 0-14, 9.5 million aged 15-64 and 1.2 million aged 65 and over. Calculate its dependency ratio to one decimal place.",
    value: 55.789, answer: "55.8", tol: 0.05,
    wrong: [43.2, 179.2],
    explanation: "(4.1 + 1.2) ÷ 9.5 × 100 = 55.8.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Add the male and female percentages for the age group."],
    stem: "On a fictional pyramid, males aged 0-14 make up 17.8% and females aged 0-14 make up 16.9% of the total population. What percentage of the population is aged 0-14?",
    value: 34.7, tol: 0.05,
    wrong: [17.35, 0.9],
    workedSolution: "1. 0-14 total = males + females.\n2. 17.8 + 16.9 = 34.7%.",
    explanation: "17.8 + 16.9 = 34.7%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** problems that a youthful population creates for a country such as Zimbabwe.",
    points: [
      "Need for many schools and teachers.",
      "Pressure on child health services (clinics, vaccinations).",
      "Many new jobs needed as young people leave school / youth unemployment.",
      "High dependency ratio / pressure on food, housing, water and land.",
    ],
    modelAnswer: "A youthful population needs many schools, teachers and child clinics. When children leave school there are not enough jobs, so youth unemployment rises. A high dependency ratio means each worker supports many children, and demand for food, housing and land grows.",
    explanation: "Four distinct problems.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    hints: ["Births, deaths, and migration all shape a pyramid."],
    stem: "Explain how natural increase and net migration influence the shape of a population pyramid.",
    points: [
      "High natural increase (high births, falling deaths) gives a wide base.",
      "Low births and long life expectancy narrow the base and widen the top.",
      "Net in-migration of young workers widens the 20-39 bars (often more for one sex).",
      "Net out-migration of young adults narrows the 20-39 bars in the area they leave.",
    ],
    modelAnswer: "Where births far exceed deaths the base is wide. Where births are low and people live long, the base narrows and the top widens. In-migration of young workers widens the working-age bars, often more for men, while out-migration leaves those bars narrow.",
    explanation: "Cover natural change and migration.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    hints: ["Causes, impacts (problems and opportunities), responses, judgement.", "Japan is a good detailed example."],
    stem: "For a named country with an ageing population, explain the causes and evaluate the impacts of the ageing population.",
    points: [
      "Names the country (e.g. Japan) and describes its structure (close to 30% aged 65+).",
      "Causes: low fertility well below replacement (later marriage, costs, women's careers).",
      "Causes: very high life expectancy from health care and diet.",
      "Negative impacts: pension and health costs; labour shortage; fewer taxpayers.",
      "Negative impacts: school closures and rural depopulation.",
      "Positive impacts: elderly spending, volunteering, childcare; jobs in care and health / responses (later retirement, automation).",
      "Judgement weighing impacts.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Japan has one of the oldest populations in the world, with close to 30% of people aged 65 and over and a population falling since about 2010. Fertility is about 1.3, well below replacement, because people marry later, housing and education are costly and long working hours make raising children difficult. Life expectancy is over 80 because of excellent health care and diet. As a result pension and health spending have risen while the number of workers and taxpayers falls, and there are shortages of care workers and farm labour; rural schools and villages are emptying. However, healthy older people spend savings on leisure, look after grandchildren and volunteer, and the care sector creates jobs. Japan has raised the retirement age and invested in robots. Overall the negative impacts are greater, because a shrinking workforce must support a growing elderly population, but they can be reduced by keeping older people and women in work.",
    explanation: "A detailed specific example with causes, balanced impacts and a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: "Table 1 shows the population structure of two fictional countries, P and Q (percentage of total population, both sexes, fictional data).\n\n| Age group | Country P (%) | Country Q (%) |\n|---|---|---|\n| 0-14 | 41 | 14 |\n| 15-64 | 56 | 65 |\n| 65 and over | 3 | 21 |",
    hints: ["Dependency ratio = (0-14 + 65+) ÷ (15-64) × 100."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the dependency ratio of Country P. Give your answer to one decimal place.", value: 78.571, answer: "78.6", tol: 0.05, wrong: [127.3, 73.2], explanation: "(41 + 3) ÷ 56 × 100 = 78.6." }),
      P.num({ label: "(b)", stem: "Calculate the dependency ratio of Country Q. Give your answer to one decimal place.", value: 53.846, answer: "53.8", tol: 0.05, wrong: [32.3, 185.7], explanation: "(14 + 21) ÷ 65 × 100 = 53.8." }),
      P.mcq({
        label: "(c)", stem: "Which statement about the dependants in each country is correct?",
        options: [
          ["Most of P's dependants are children; most of Q's are elderly", "Correct: 41% v 3% in P; 14% v 21% in Q."],
          ["Most dependants in both countries are elderly", "In P children far outnumber the elderly."],
          ["Most dependants in both countries are children", "In Q the elderly outnumber children."],
          ["P and Q have the same proportion of elderly people", "3% and 21% are very different."],
        ],
        answer: "A", explanation: "P has youthful dependency; Q has elderly dependency.",
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Suggest how the government spending priorities of P and Q are likely to differ.",
        points: ["P: schools, teachers and child health / vaccination.", "P: job creation for school leavers / family planning.", "Q: pensions, hospitals and care for the elderly.", "Q: measures to increase the workforce (later retirement, immigration, childcare)."],
        modelAnswer: "P must spend on schools, teachers and child clinics and create jobs for its many young people, and may promote family planning. Q must spend on pensions, hospitals and care homes, and may raise the retirement age or attract migrant workers.",
        explanation: "Link spending to the dependent groups.",
      }),
    ],
    explanation: "This item practises dependency ratios and interpreting structure.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480, applies: ZIM,
    stem: "A description of the population pyramid of a fictional rural ward in Zimbabwe: the 0-4 and 5-9 bars are each about 7% of the population per sex; bars for 20-24 to 35-39 are much narrower for males than females; the 65+ bars are about 3% per sex.",
    hints: ["Who leaves rural wards to work elsewhere?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "What does the difference between male and female bars at ages 20-39 most likely show?",
        options: [
          ["Male labour migration", "Correct: male labour migration is common from rural areas."],
          ["Female labour migration", "This would make the female bars narrower."],
          ["Fewer boys born", "Sex ratios at birth are roughly equal."],
          ["Longer male life expectancy", "Women usually live longer."],
        ],
        answer: "A", explanation: "Male out-migration narrows the male working-age bars.",
      }),
      P.num({ label: "(b)", unit: "%", stem: "Estimate the percentage of the ward's population aged 0-9 (both sexes).", value: 28, tol: 0, wrong: [14, 7], explanation: "0-4: 7 + 7 = 14%; 5-9: 7 + 7 = 14%; total 28%." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe the effects of this population structure on the ward.",
        points: ["Women, children and the elderly do most farm work / labour shortage on farms.", "Households depend on remittances from migrants.", "High demand for primary schools and clinics / high dependency."],
        modelAnswer: "With many young men away, women and the elderly do the farm work, so less land may be ploughed. Families rely on money sent home by migrants, and many children need primary schools and clinics.",
        explanation: "Link structure to economic and social effects.",
      }),
    ],
    explanation: "This item practises interpreting a rural pyramid.",
  });

  b.card("DEFINITION", "Population structure", "The make-up of a population by age and sex.");
  b.card("DEFINITION", "Population pyramid", "Horizontal bar chart of males (left) and females (right) by age group, youngest at the bottom.");
  b.card("DEFINITION", "Dependency ratio", "(Population 0-14 + 65+) ÷ population 15-64 × 100.");
  b.card("CONCEPT", "Reading a pyramid", "Base = births; sides = deaths; top = life expectancy; bulges and notches = booms, migration, wars, epidemics.");
  b.card("CONCEPT", "Causes of a youthful population", "High birth rates (children as labour and security, little family planning, early marriage) with falling death rates.");
  b.card("CONCEPT", "Causes of an ageing population", "Low birth rates (family planning, women's education and careers, cost of children) and long life expectancy.");
  b.card("CONCEPT", "Impacts of an ageing population", "Pension and care costs, labour shortage, fewer taxpayers; but elderly spending, volunteering, care jobs.");
  b.card("FACT", "Japan's ageing population", "Close to 30% aged 65+ (approximate); fertility about 1.3; population falling since about 2010.", undefined, { applies: CAM });
  b.card("FACT", "Zimbabwe v Germany pyramids", "Zimbabwe: wide base, narrow top (youthful). Germany: narrow base, middle bulge, wide top (ageing).", undefined, { applies: ZIM });
});
