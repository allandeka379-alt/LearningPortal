// Slice G4b: migration (ZIMSEC 7.11.9; Cambridge 6.3).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.population.migration", { file: "population/migration", keyPrefix: "population.migration" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which term describes a person forced to flee their country because of war or persecution?",
    options: [
      ["Refugee", "Correct: refugees are forced to leave and cannot safely return."],
      ["Economic migrant", "Economic migrants choose to move for work."],
      ["Commuter", "Commuters travel daily and do not change home."],
      ["Retiree", "A retiree moving home is a voluntary migrant."],
    ],
    answer: "A",
    explanation: "Refugees are forced migrants who cross an international border to escape danger.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A young man moves from a village in Gokwe to look for work in Harare. Which type of migration is this?",
    options: [
      ["Rural-urban", "Correct: he moves from a rural area to a city."],
      ["Urban-rural", "That would be from a town to the countryside."],
      ["International", "He stays inside Zimbabwe."],
      ["Forced", "He chooses to move for work."],
    ],
    answer: "A",
    explanation: "Moving from the countryside to a town within one country is rural-urban (internal) migration.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **pull** factor?",
    options: [
      ["Higher wages in the destination", "Correct: it attracts people to the destination."],
      ["Repeated drought at home", "Drought pushes people away from the origin."],
      ["Shortage of land at home", "Land shortage is a push factor."],
      ["Civil war at home", "Conflict pushes people to flee."],
    ],
    answer: "A",
    explanation: "Pull factors are attractions of the destination; push factors are problems at the origin.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is an **asylum seeker**?",
    options: [
      ["A person waiting for a decision on a refugee claim", "Correct: their claim has not yet been decided."],
      ["A person moving abroad for a better-paid job", "That is an economic migrant."],
      ["A person displaced inside their own country", "That is an internally displaced person."],
      ["A person who travels to work each day", "That is a commuter."],
    ],
    answer: "A",
    explanation: "Once the claim is accepted, an asylum seeker is recognised as a refugee.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which border post is the main crossing point for migrants travelling by road from Zimbabwe to South Africa?",
    options: [
      ["Beitbridge", "Correct: it crosses the Limpopo River into South Africa."],
      ["Chirundu", "Chirundu is on the border with Zambia."],
      ["Forbes (Mutare)", "Forbes is on the border with Mozambique."],
      ["Kazungula", "Kazungula is near the Botswana and Zambia borders."],
    ],
    answer: "A",
    explanation: "Beitbridge on the Limpopo is the main road border with South Africa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **negative** impact of emigration on the country of origin?",
    options: [
      ["Loss of skilled workers such as nurses", "Correct: this 'brain drain' weakens services."],
      ["Remittances sent home to families", "Remittances are a benefit to the origin."],
      ["Less pressure on land and jobs", "This is a benefit to the origin."],
      ["Returning migrants bringing savings", "This is a benefit to the origin."],
    ],
    answer: "A",
    explanation: "Brain drain reduces the skills available for health care and education at home.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Who usually migrates to towns?"],
    stem: "How does rural-urban migration usually change the population structure of rural areas?",
    options: [
      ["More children and older people remain", "Correct: mainly young adults leave."],
      ["The proportion of young adults rises", "Young adults are the group that leaves."],
      ["The birth rate rises sharply", "Fewer young adults usually means fewer births."],
      ["The number of men rises compared with women", "More men than women often leave rural areas."],
    ],
    answer: "A",
    explanation: "Migration is age-selective: young adults leave, so rural pyramids narrow in the 20-39 age groups.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Was the move chosen, and did it cross a border?"],
    stem: "Tonga families were moved from the Zambezi valley when Lake Kariba filled after 1959. How is this migration classified?",
    options: [
      ["Forced, internal and permanent", "Correct: they had no choice, stayed in the country and did not return."],
      ["Voluntary, international and temporary", "They were moved, not by choice, and did not cross a border."],
      ["Voluntary, internal and seasonal", "The move was not chosen and not seasonal."],
      ["Forced, international and temporary", "They stayed in their own country and could not return."],
    ],
    answer: "A",
    explanation: "Dam building is a classic cause of forced, internal, permanent migration.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: CAM,
    hints: ["Which strategy tackles the cause rather than the symptom?"],
    stem: "Which strategy is most likely to reduce migration pressure in the **long term**?",
    options: [
      ["Investment in jobs in origin countries", "Correct: it reduces the push factors."],
      ["Building higher border fences", "Fences treat the symptom and push migrants to riskier routes."],
      ["Deporting undocumented migrants", "Deportation does not change why people leave."],
      ["Building larger refugee camps", "Camps shelter people but do not remove the causes."],
    ],
    answer: "A",
    explanation: "Reducing push factors is slow but tackles the reason people move.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Remittances are money or goods sent home by migrants to their families.",
    answer: true,
    explanation: "True. Remittances are a major benefit of emigration for many Zimbabwean households.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "People who leave their homes because of a cyclone but stay in their own country are refugees.",
    answer: false,
    explanation: "False. They are internally displaced persons (IDPs); refugees cross an international border.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each example with the category of migration.",
    pairs: [
      ["A teacher moves from Gweru to Harare for promotion", "Urban-urban"],
      ["A retired worker returns from Bulawayo to the rural home", "Urban-rural"],
      ["A family moves from a communal area to a resettlement farm", "Rural-rural"],
      ["A nurse moves from Harare to the United Kingdom", "International"],
    ],
    explanation: "Classify by origin and destination and whether a border is crossed.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Barriers such as cost, distance and border controls are called {{blank:a}} obstacles. The loss of skilled workers from a country is called the brain {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["intervening"], choices: ["intervening", "push", "pull", "natural"] },
      { id: "b", accepted: ["drain"], choices: ["drain", "gain", "flow", "gap"] },
    ],
    explanation: "Lee's model includes intervening obstacles; brain drain is the emigration of skilled people.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In one year a fictional district had 1,850 in-migrants and 2,770 out-migrants. Calculate the net migration (use a minus sign for a net loss).",
    value: -920,
    wrong: [920, 4620],
    explanation: "1,850 − 2,770 = −920 (a net loss).",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "‰",
    hints: ["Net migration ÷ population × 1,000."],
    stem: "The same fictional district (net migration −920) has a population of 184,000. Calculate its net migration rate per 1,000.",
    value: -5,
    wrong: [5, -0.5],
    workedSolution: "1. Net migration = −920.\n2. −920 ÷ 184,000 × 1,000 = −5 per 1,000.",
    explanation: "−920 ÷ 184,000 × 1,000 = −5 per 1,000.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4, applies: ZIM,
    stem: "Describe **two** push factors and **two** pull factors that cause rural-urban migration in Zimbabwe.",
    points: [
      "Push: unemployment / lack of paid work in rural areas.",
      "Push: drought, poor harvests, land shortage or poor services in rural areas.",
      "Pull: jobs and higher wages in towns (industry, trade, informal sector).",
      "Pull: better schools, hospitals, electricity, water or entertainment in towns.",
    ],
    modelAnswer: "Push: there are few paid jobs in communal areas, and drought and small plots lead to poor harvests. Pull: towns such as Harare offer jobs and higher wages, as well as better schools, hospitals and electricity.",
    explanation: "Two of each, clearly labelled.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    hints: ["Consider the origin and the destination separately."],
    stem: "Explain **one** positive and **one** negative impact of international migration on the **receiving** country.",
    points: [
      "Positive: migrants fill labour shortages (e.g. farms, construction, care).",
      "Explains: keeps businesses running / adds skills, taxes or new businesses.",
      "Negative: pressure on housing, schools or health services / competition for low-paid jobs.",
      "Explains: may cause tension or xenophobia / growth of unplanned settlements.",
    ],
    modelAnswer: "Migrants fill shortages of workers on farms and building sites, keeping businesses running and paying taxes. However, many arriving at once can put pressure on housing and services and compete for low-paid jobs, which can cause tension with local people.",
    explanation: "One of each, both developed.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7, applies: CAM,
    hints: ["Name both countries; give causes, impacts on each and how it is managed."],
    stem: "For a named example of international migration, describe its causes and evaluate its impacts on the origin and destination countries.",
    points: [
      "Names the migration (e.g. Zimbabwe to South Africa).",
      "Push factors at the origin (e.g. economic decline, unemployment, hyperinflation 2007-2008, drought).",
      "Pull factors at the destination (e.g. jobs, higher wages, proximity, family networks).",
      "Positive impacts on origin (remittances, less pressure on jobs).",
      "Negative impacts on origin (brain drain of nurses, teachers, doctors; rural labour shortages).",
      "Impacts on destination (labour and skills vs pressure on services, competition, xenophobia).",
      "Judgement on whether impacts are mainly positive or negative, and for whom.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Many Zimbabweans have migrated to South Africa since about 2000. They were pushed by economic decline, very high unemployment, hyperinflation in 2007-2008 and droughts, and pulled by jobs and higher wages in South Africa's larger economy, which is close and easy to reach via Beitbridge, and by family networks already there. For Zimbabwe, remittances of money and goods pay for school fees, food and houses and reduce pressure on scarce jobs, but the country has lost many skilled teachers, nurses and doctors. For South Africa, migrants provide labour in construction, farming and services and start small businesses, but they compete for low-paid jobs and there have been outbreaks of xenophobic violence, notably in 2008 and 2015. Overall the migration benefits individual families and fills labour gaps in South Africa, but the long-term loss of skills is a serious cost for Zimbabwe.",
    explanation: "Causes, two-sided impacts and a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the results of a fictional survey of 200 households in a rural ward that have a member working in another country (fictional data).\n\n| Main use of remittances | Number of households |\n|---|---|\n| School fees | 64 |\n| Food | 58 |\n| Building or improving a house | 40 |\n| Farm inputs (seed, fertiliser) | 26 |\n| Starting a small business | 12 |",
    hints: ["Percentage = number ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage of households that used remittances mainly for school fees.", value: 32, wrong: [64, 3.2], explanation: "64 ÷ 200 × 100 = 32%." }),
      P.num({ label: "(b)", stem: "How many more households used remittances mainly for food than for farm inputs?", value: 32, wrong: [84, 26], explanation: "58 − 26 = 32." }),
      P.manual({
        label: "(c)", marks: 3, stem: "Using Table 1, explain how remittances may benefit the ward in the long term.",
        points: ["School fees: better-educated children / more job opportunities later.", "Farm inputs: higher crop yields / food security.", "Small businesses and house building create local jobs and income."],
        modelAnswer: "Paying school fees gives children better qualifications; farm inputs raise yields; and new businesses and building work create local jobs.",
        explanation: "Link each use to a long-term benefit.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** disadvantages for the ward of so many adults working abroad.",
        points: ["Shortage of labour on farms / fewer young adults in the community.", "Children and older people left without support / family separation / dependence on remittances that may stop."],
        modelAnswer: "Fewer adults are left to farm, and families are separated, with grandparents caring for children.",
        explanation: "Costs at the origin.",
      }),
    ],
    explanation: "This item practises interpreting migration data.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "Resource: Fatima fled fighting in her home country, crossed into a neighbouring country and applied for protection. While she waited she lived in a refugee camp. After eight months her claim was accepted (fictional example).",
    hints: ["Her status changes when her claim is accepted."],
    parts: [
      P.mcq({
        label: "(a)", stem: "What was Fatima's status while she waited for a decision?",
        options: [
          ["Asylum seeker", "Correct: she had applied but not yet been accepted."],
          ["Economic migrant", "She fled fighting; she did not move for work."],
          ["Internally displaced person", "She crossed an international border."],
          ["Commuter", "She did not travel daily."],
        ],
        answer: "A", explanation: "Applicants for protection are asylum seekers until their claims are decided.",
      }),
      P.short({
        label: "(b)", stem: "What is Fatima's status now that her claim has been accepted?", accepted: ["refugee", "a refugee", "she is a refugee"],
        wrong: ["asylum seeker"], explanation: "An accepted asylum claim gives refugee status.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe **three** problems faced by people living in refugee camps.",
        points: ["Overcrowding / poor shelter.", "Shortages of food, clean water or sanitation leading to disease.", "Few jobs or schools / long stays with uncertain future / separation from family."],
        modelAnswer: "Camps are often overcrowded, water and sanitation are limited so diseases spread, and there are few jobs or schools, so people may wait years.",
        explanation: "Three distinct problems.",
      }),
    ],
    explanation: "This item practises the categories of migrants.",
  });

  b.card("DEFINITION", "Migration", "The movement of people from one place to another to live, usually for at least a year.");
  b.card("DEFINITION", "Refugee", "A person forced to flee their country because of war, violence or persecution, who cannot safely return.");
  b.card("DEFINITION", "Asylum seeker", "A person who has applied for protection as a refugee in another country and is awaiting a decision.");
  b.card("DEFINITION", "Economic migrant", "A person who moves voluntarily to find work or a higher income.");
  b.card("VOCABULARY", "Push and pull factors", "Push: problems at the origin (unemployment, drought, conflict). Pull: attractions of the destination (jobs, services, safety).");
  b.card("CONCEPT", "Categories of internal migration", "Rural-urban, urban-rural, urban-urban, rural-rural.");
  b.card("VOCABULARY", "Remittances and brain drain", "Remittances: money or goods sent home. Brain drain: loss of skilled workers through emigration.");
  b.card("FACT", "Zimbabwe to South Africa", "Push: economic decline after about 2000, unemployment, hyperinflation 2007-2008. Pull: jobs and wages next door. Main crossing: Beitbridge.");
  b.card("CONCEPT", "Managing international migration", "Skills-based visas, work permits, border controls, refugee camps, aid to origin countries, integration programmes.");
});
