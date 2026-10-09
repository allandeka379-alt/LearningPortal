// W4b exam-format items: ZIMSEC Heritage Studies Paper 2 Section A (ZIM_P2A, 10 marks: 2 + 3 + 5) x4 and Section B
// essays (ZIM_P2B, 20 marks: 8 + 12) x3. Part marks are our convention (reviewer to check against recent papers).
import { concept, P, source, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const a = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const bb = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.global.climate-change", { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec" }, (b) => {
  // ---------------------------------------------------------------- Section A 1: pollution.
  b.struct({
    ...a, d: 3,
    concepts: ["her.global.pollution"],
    stem: source("Source A", "a report in a fictional community newsletter, Harare, 2026",
      "Residents of a high-density suburb say a burst sewer has been running into the stream for a month. Downstream, gardeners water vegetables with the stream water. Smoke from rubbish burnt at the corner heap hangs over the houses every evening, and a maize mill runs late into the night.") +
      "\n\nThis question is about pollution. Read Source A and answer the questions.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "Pollution is the release of harmful substances or energy into the {{blank:a}}. The government agency that licenses and fines polluters is the {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["environment"], choices: ["environment", "Constitution", "market", "economy"] },
          { id: "b", accepted: ["Environmental Management Agency"], choices: ["Environmental Management Agency", "Grain Marketing Board", "Zimbabwe Electoral Commission", "Registrar General's Office"] },
        ],
        explanation: "Pollution harms the environment (air, water, land); EMA licenses and fines polluters.",
      }),
      P.match({
        label: "(b)",
        stem: "Identify the type of pollution caused by each source in Source A.",
        pairs: ["the burst sewer", "the burning rubbish heap", "the maize mill at night"],
        right: ["water pollution", "air pollution", "noise pollution", "land pollution"],
        rightIndex: [0, 1, 2],
        explanation: "Sewage pollutes the stream (water); burning rubbish produces smoke (air); the mill at night causes noise.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the effects of the pollution described in Source A on the residents.",
        points: [
          "Sewage in the stream spreads water-borne diseases such as cholera and dysentery",
          "because gardeners water vegetables with it and families may eat them unwashed or drink the water",
          "Smoke from burning rubbish causes breathing problems (coughs, chest illness), especially in children and the elderly",
          "because it hangs over the houses every evening and contains harmful gases",
          "Noise from the mill disturbs sleep and causes stress / tiredness affects learners' school work",
        ],
        modelAnswer: "Sewage running into the stream can spread cholera and dysentery, because gardeners water vegetables with the stream water and families may eat them without washing them properly. Smoke from the burning rubbish heap causes coughs and chest illnesses, especially among children and the elderly, because it hangs over the houses every evening. Noise from the mill late at night disturbs sleep, so residents are tired and stressed and learners find it hard to study.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), link each source in the report to a harm to health or well-being."],
    explanation: "Paper 2 Section A item on pollution: meaning, types and effects.",
  });

  // ---------------------------------------------------------------- Section A 2: droughts and floods.
  b.struct({
    ...a, d: 3,
    concepts: ["her.global.hazards-disasters"],
    stem: "This question is about droughts and floods.",
    parts: checkExam(A, [
      P.mcq({
        label: "(a)", marks: 2,
        stem: "Which **best** defines a drought?",
        options: [
          ["a long period of below-normal rainfall that leaves too little water", "Correct: a full definition."],
          ["water covering land that is normally dry, after heavy rain or when a river overflows", "This defines a flood."],
          ["a single very hot day in October", "One day is weather, not a drought."],
          ["a strong wind that blows over houses", "This describes a storm."],
        ],
        answer: "A",
        explanation: "A drought is a long period of below-normal rainfall leaving too little water for people, crops and animals.",
      }),
      P.match({
        label: "(b)",
        stem: "Identify each statement as a cause of floods, a cause of drought, or a disaster management measure.",
        pairs: ["building homes on flood plains and blocking drains", "long dry spells in the growing season", "early warnings broadcast by radio in local languages"],
        right: ["a cause of floods", "a cause of drought", "a disaster management measure"],
        rightIndex: [0, 1, 2],
        explanation: "Building on flood plains worsens floods; long dry spells cause drought; early warnings are part of preparedness.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Describe the effects of floods on communities, using an example from Zimbabwe.",
        points: [
          "Loss of life and injury, e.g. during Cyclone Idai in Chimanimani and Chipinge (March 2019)",
          "as people are swept away by water or buried by landslides",
          "Homes, roads, bridges, schools and clinics are destroyed",
          "so people are displaced and communities are cut off from help and markets",
          "Crops and livestock are lost / water-borne diseases spread / schools close",
        ],
        modelAnswer: "Floods cause loss of life, as happened when Cyclone Idai struck Chimanimani and Chipinge in March 2019 and people were swept away by water or buried by landslides. Floods destroy homes, roads, bridges, schools and clinics, so families are displaced and whole communities are cut off from help and markets. Crops and livestock are also lost, and water-borne diseases such as cholera spread when toilets and wells are flooded.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), use Cyclone Idai and think of people, buildings and food."],
    explanation: "Paper 2 Section A item on droughts and floods.",
  });

  // ---------------------------------------------------------------- Section A 3: human trafficking.
  b.struct({
    ...a, d: 3,
    concepts: ["her.global.human-trafficking"],
    stem: "This question is about human trafficking.",
    parts: checkExam(A, [
      P.mcq({
        label: "(a)", marks: 2,
        stem: "Which **best** defines human trafficking?",
        options: [
          ["moving or holding people by force, threats or deception in order to exploit them", "Correct: act, means and purpose are all included."],
          ["helping a willing person, who usually pays a fee, to cross a border illegally without papers", "This is people smuggling."],
          ["moving to work in another country with a valid permit and contract", "This is legal, safe migration."],
          ["carrying goods across a border without paying duty", "This is goods smuggling."],
        ],
        answer: "A",
        explanation: "Trafficking uses force, threats or deception to move or hold people for exploitation.",
      }),
      P.fib({
        label: "(b)",
        stem: "Complete the statements.",
        template: "Forcing a person to work in a household with no pay or freedom is called {{blank:a}}. Trafficking does not always cross a border: it can happen {{blank:b}} one country. The UN World Day against Trafficking in Persons is 30 {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["domestic servitude"], choices: ["domestic servitude", "voluntary work", "an apprenticeship", "safe migration"] },
          { id: "b", accepted: ["inside"], choices: ["inside", "only outside"] },
          { id: "c", accepted: ["July"], choices: ["July", "April", "May", "December"] },
        ],
        explanation: "Domestic servitude is a form of trafficking; trafficking can happen inside one country; 30 July is the UN day.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain why young people in Zimbabwe may become victims of human trafficking.",
        points: [
          "Poverty and unemployment",
          "push young people to accept risky offers of work abroad to support their families",
          "False job or study offers (often on social media) that promise high pay",
          "which deceive young people who do not know how to check whether an agency or employer is genuine",
          "Orphanhood / family breakdown / lack of information / traffickers take documents / demand for cheap labour",
        ],
        modelAnswer: "Poverty and unemployment push many young people to accept risky job offers abroad so that they can support their families. Traffickers use false job or study offers, often shared on social media, that promise high pay and free transport, and young people who do not know how to check whether an agency is genuine are deceived. Orphans and young people from broken families have less protection and are easier targets.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), think of push factors and the tricks traffickers use."],
    explanation: "Paper 2 Section A item on human trafficking.",
  });

  // ---------------------------------------------------------------- Section A 4: child labour.
  b.struct({
    ...a, d: 3,
    concepts: ["her.global.child-labour"],
    stem: "This question is about child labour.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "Under the Constitution, a child is a person under the age of {{blank:a}}. The section of the Constitution that protects children from child labour is section {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["18"], choices: ["18", "16", "21", "14"] },
          { id: "b", accepted: ["81"], choices: ["81", "4", "73", "162"] },
        ],
        explanation: "A child is under 18; section 81 protects children from economic exploitation and child labour.",
      }),
      P.match({
        label: "(b)",
        stem: "Identify each situation as child labour or a child's responsibility.",
        pairs: [
          "Tendai (14) washes the family's plates after supper",
          "Mthulisi (12) works all day at a gold-panning site instead of attending school",
          "Rudo (13) works full-time as a maid for another family",
        ],
        right: ["a child's responsibility", "child labour"],
        rightIndex: [0, 1, 1],
        explanation: "Light chores are responsibilities; dangerous or full-time work that replaces school is child labour.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the effects of child labour on children and on the nation.",
        points: [
          "Children miss school or are too tired to learn",
          "so they grow up with few skills and earn little, which continues a cycle of poverty",
          "Children's health is harmed (injury, poisoning from mercury or pesticides, exhaustion)",
          "because the work is too heavy or dangerous for their age",
          "The nation loses a skilled workforce / development slows / rights in the Constitution and conventions are not met",
        ],
        modelAnswer: "Children who work miss school or are too tired to learn, so they grow up with few skills and low earnings, which continues a cycle of poverty. Their health is harmed by heavy or dangerous work: they may be injured in pits, poisoned by mercury or pesticides, or exhausted. The nation also loses, because a less skilled workforce slows development.",
        explanation: "Two developed points (2 marks each) and one further point.",
      }),
    ]),
    hints: ["In (c), cover both the child and the country."],
    explanation: "Paper 2 Section A item on child labour.",
  });

  // ---------------------------------------------------------------- Section B 1: climate change adaptation and mitigation.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.global.climate-change"],
    stem: "This question is about climate change in Zimbabwe.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8,
        stem: "Explain the effects of climate change on Zimbabwe.",
        points: [
          ["Less reliable rainfall and more frequent droughts: crop failure, livestock deaths, hunger", 2],
          ["More intense storms and floods (e.g. cyclones): loss of life, destroyed homes, roads and crops", 2],
          ["Low dam levels, e.g. Lake Kariba: less hydroelectric power, power cuts affecting homes and industry", 2],
          ["Health effects (heat stress, malaria spreading, water-borne disease) / loss of biodiversity / migration", 2],
        ],
        modelAnswer: "Rainfall is becoming less reliable, with late starts and long dry spells, and droughts are more frequent, especially in the south and west. Crops fail and cattle die, so families go hungry and lose their savings.\n\nStorms and floods are becoming more intense. Cyclones such as Idai in 2019 destroy homes, roads, bridges and crops and cost lives.\n\nIn drought years, less water flows into Lake Kariba, so the hydroelectric station generates less power. Long power cuts affect homes, hospitals and factories, and jobs are lost.\n\nClimate change also affects health: heat stress increases, malaria may spread into new areas and water-borne diseases follow floods.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Zimbabwe should spend its resources on adapting to climate change rather than on mitigating it.\" Discuss.",
        points: [
          ["Case for adaptation: Zimbabwe's emissions are small; effects already threaten food, water and lives; drought-tolerant crops, conservation farming, water harvesting, early warning", 3],
          ["Case for mitigation: shared responsibility under the Paris Agreement; local benefits of solar energy, afforestation, forest protection", 3],
          ["Measures that do both / limits: tree planting, conservation farming; cost; need for international finance and technology", 3],
          ["Supported judgement", 3],
        ],
        levels: levels(12),
        modelAnswer: "Many people argue that adaptation should come first. Zimbabwe produces only a small share of the world's greenhouse gases, so its own cuts would hardly change the global climate. But most families depend on rain-fed farming, and late rains, droughts and floods already threaten food and lives. Drought-tolerant small grains, conservation farming, water harvesting and early warnings protect people now.\n\nOthers point out that mitigation also matters. Under the Paris Agreement of 2015 every country is expected to play its part, and Zimbabwe can hardly ask richer countries to act while ignoring its own emissions. Mitigation also brings local benefits: solar power reduces dependence on Kariba and on imported fuel, and protecting forests reduces soil erosion and keeps firewood and wild foods.\n\nThe choice is not always either-or. Planting trees absorbs carbon and protects soil and water; conservation farming keeps moisture in the soil and avoids burning crop stalks. Both kinds of measure cost money that Zimbabwe lacks, so international climate finance and technology are important.\n\nI agree that adaptation is the more urgent priority, because lives and food security are at stake now and Zimbabwe's emissions are small. However, Zimbabwe should not neglect mitigation; it should favour measures that do both and use outside support for clean energy.",
      }),
    ]),
    hints: ["In (b), consider who causes climate change, who suffers from it, and measures that do both."],
    explanation: "Paper 2 Section B essay on climate change effects, adaptation and mitigation.",
  });

  // ---------------------------------------------------------------- Section B 2: pandemics' impact and response.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.global.pandemics"],
    stem: "This question is about pandemics and infectious diseases.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8,
        stem: "Explain the social and economic impacts of the COVID-19 pandemic on Zimbabwe.",
        points: [
          ["Social: illness and deaths; funerals and gatherings restricted, causing grief and disruption", 2],
          ["Social: schools closed, learning lost, especially for learners without phones, data or radios", 2],
          ["Economic: lockdowns stopped informal trade, so families lost daily income and faced hunger", 2],
          ["Economic: businesses closed or cut jobs, tourism collapsed; government spent heavily on health", 2],
        ],
        modelAnswer: "Socially, many people fell ill and some died, and restrictions on funerals and gatherings made grieving and community life harder. Schools closed from March 2020, and learners without phones, data or radios lost a great deal of learning.\n\nEconomically, lockdowns stopped much informal trading, so families who depended on daily sales lost their income and some went hungry. Businesses lost customers and some closed or laid off workers; tourism collapsed when borders closed. The government had to spend heavily on testing, treatment and vaccines, leaving less money for other needs.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Public health measures were the most effective response to the COVID-19 pandemic in Zimbabwe.\" How far do you agree?",
        points: [
          ["Public health measures (lockdowns, curfews, gatherings restricted, masks, testing, isolation): slowed spread, gave hospitals time; but caused hardship for informal traders and lost learning", 3],
          ["Vaccination (from 2021): reduced serious illness and death; limits: supply, cold storage, hesitancy", 3],
          ["Other responses: hygiene and awareness, health workers, community and church support, international partners; strengths and limits", 3],
          ["Supported judgement on 'most effective'", 3],
        ],
        levels: levels(12),
        modelAnswer: "Public health measures were important. Lockdowns, curfews, limits on gatherings, masks, testing and isolation reduced contact between people, slowed the spread of the virus and gave hospitals time to prepare. However, they were costly: families who depend on daily informal trade lost income and some went hungry, and many learners lost months of schooling. Some people found the rules hard to follow when they needed to earn a living.\n\nVaccination, which began in 2021, was another major response. Vaccines greatly reduced serious illness and death. Their impact was limited at first by supply, by the need for cold storage and by hesitancy caused by rumours and myths.\n\nOther responses also mattered: hand washing and awareness campaigns, the work of nurses and doctors, support from churches and communities, and help from partners such as the World Health Organization.\n\nI agree only partly. Public health measures were the most important response in the early months, before vaccines were available, and they saved lives. But they could not be kept up for long because of their economic cost, so over time vaccination, combined with hygiene and good information, became the most effective way to protect people.",
      }),
    ]),
    hints: ["In (b), compare the early months with later, when vaccines were available."],
    explanation: "Paper 2 Section B essay on the impacts of and responses to pandemics.",
  });

  // ---------------------------------------------------------------- Section B 3: waste management approaches.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.global.waste-management", "her.global.pollution"],
    stem: "This question is about waste management.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8,
        stem: "Explain the problems caused by poor waste disposal in Zimbabwe's towns.",
        points: [
          ["Disease: uncollected rubbish breeds flies and rats; blocked drains and dirty water spread cholera and dysentery", 2],
          ["Air pollution: burning rubbish and tyres releases smoke and poisonous gases, causing breathing problems", 2],
          ["Flooding and water pollution: plastic blocks drains; waste washes into rivers and dams", 2],
          ["Harm to animals / injury from needles and glass / ugliness that drives away tourists and customers", 2],
        ],
        modelAnswer: "Uncollected rubbish breeds flies, rats and mosquitoes, and blocked drains and dirty water help diseases such as cholera and dysentery spread.\n\nWhere refuse is not collected, residents often burn it, releasing smoke and poisonous gases that cause coughs and chest illnesses.\n\nPlastic and litter block storm drains, so streets and homes flood in heavy rain, and waste washed into rivers and dams pollutes the water that towns depend on.\n\nPoor disposal also harms animals that swallow plastic, injures children and waste pickers through needles and broken glass, and makes towns dirty, which drives away tourists and customers.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Assess the approaches used to manage waste in Zimbabwe.",
        points: [
          ["Collection by councils and landfills: keep streets clean; but costly, irregular, open dumps pollute and release methane", 3],
          ["Reduce, reuse, recycle: cheapest and best for environment, creates income; but depends on habits, buyers and collection points", 3],
          ["Composting, incineration, EMA enforcement and clean-up campaigns: strengths and limits of each", 3],
          ["Supported judgement on which approach or combination works best", 3],
        ],
        levels: levels(12),
        modelAnswer: "Collection by local authorities is the main approach in towns. Where trucks come regularly, streets stay clean and residents do not burn or dump rubbish. But collection is expensive, and where councils lack trucks and fuel it is irregular, so rubbish piles up. Much waste ends up in open dumps rather than properly managed landfills, polluting water and air and releasing methane.\n\nReducing, reusing and recycling are higher in the waste hierarchy. Reducing and reusing are cheap and avoid waste altogether, and recycling of plastic, paper and metal creates income for collectors and small businesses. Their limits are that they depend on changing the habits of millions of people, not every material has a buyer and collection points are few.\n\nComposting suits Zimbabwe well because much household waste is organic, and it produces fertiliser for gardens, but it cannot deal with plastics or e-waste. Incineration safely destroys medical waste but is expensive. EMA's enforcement and national clean-up campaigns raise awareness and punish offenders, but rubbish returns within days where collection is poor.\n\nOverall, no single approach is enough. Collection and disposal remain necessary, but the most effective approach combines regular collection with reducing waste at source, composting and recycling, backed by EMA enforcement and active citizens.",
      }),
    ]),
    hints: ["In (b), give a strength and a weakness of each approach before concluding."],
    explanation: "Paper 2 Section B essay on waste management approaches.",
  });
});
