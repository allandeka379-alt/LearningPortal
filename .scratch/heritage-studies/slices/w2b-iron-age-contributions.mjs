// W2b: contributions of Iron Age communities to contemporary society (her.precolonial.iron-age-contributions).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.precolonial.iron-age-contributions", { file: "precolonial/iron-age-contributions", keyPrefix: "precolonial.iron-age-contributions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which crops did Iron Age farmers pass on that are now promoted as **drought-tolerant**?",
    options: [
      ["Sorghum and millets", "Correct: small grains tolerate dry conditions."],
      ["Maize and wheat", "Maize came from the Americas later; wheat is mostly irrigated."],
      ["Tea and coffee", "These are colonial-era estate crops."],
      ["Tobacco and cotton for export", "These are commercial crops of the colonial period and after."],
    ],
    answer: "A",
    explanation: "Sorghum and millets were Iron Age staples and are promoted today in dry areas.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which national symbol comes from carvings found at Great Zimbabwe?",
    options: [
      ["The Zimbabwe Bird", "Correct: the soapstone birds appear on the flag and coat of arms."],
      ["The red star", "The red star on the flag was not carved at Great Zimbabwe."],
      ["The national anthem", "The anthem was adopted much later, after independence."],
      ["The coat of arms shield colours", "The shield is a modern design; the bird is the ancient element."],
    ],
    answer: "A",
    explanation: "The Zimbabwe Bird is an ancient symbol now used as a national emblem.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did Iron Age **mining** contribute to modern Zimbabwe?",
    options: [
      ["Many modern mines were opened on or near ancient workings", "Correct: prospectors looked for ancient workings."],
      ["Iron Age miners left maps used by every modern mining company", "Iron Age miners left no written maps."],
      ["They discovered all the coal now mined at Hwange", "Coal mining at Hwange began in the colonial period."],
      ["They introduced machines still used in mines today", "Modern mining machinery is entirely different."],
    ],
    answer: "A",
    explanation: "Ancient gold workings guided later prospectors to rich deposits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which present-day institution grew out of Iron Age political systems?",
    options: [
      ["Chiefs, headmen and village heads", "Correct: traditional leadership continues and is recognised in Chapter 15."],
      ["The Zimbabwe Electoral Commission", "This is a modern independent commission."],
      ["The Constitutional Court", "The courts were created under modern constitutions."],
      ["Rural district councils", "These are modern elected local authorities."],
    ],
    answer: "A",
    explanation: "The hierarchy of traditional leaders comes from pre-colonial political systems.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is an example of **intangible** heritage from Iron Age communities?",
    options: [
      ["Rain-asking ceremonies (mukwerera / ukucela izulu)", "Correct: a ceremony is a practice, not an object."],
      ["The walls of Khami", "Walls are tangible (physical) heritage."],
      ["A clay storage pot decorated with comb-stamped patterns", "A pot is a physical object, however it is decorated."],
      ["An iron hoe blade", "A hoe is a physical object."],
    ],
    answer: "A",
    explanation: "Intangible heritage includes beliefs, ceremonies, skills and knowledge.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A community in a dry area of Matabeleland South wants to improve **food security**. Which Iron Age contribution is **most useful**?",
    options: [
      ["Growing small grains and storing them in granaries", "Correct: drought-tolerant crops and storage protect against hunger."],
      ["Building stone walls without mortar", "Stone building does not directly improve food supply."],
      ["Holding the Inxwala ceremony every year at the first fruits", "Inxwala was a national ceremony of the Ndebele state."],
      ["Trading ivory with the coast", "Ivory trade is now strictly controlled and does not help food security."],
    ],
    answer: "A",
    hints: ["Which contribution concerns food in dry conditions?"],
    explanation: "Small grains and grain storage are Iron Age practices that still protect families in droughts.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is **Great Zimbabwe** significant to Zimbabwe's economy today?",
    options: [
      ["It attracts tourists, bringing income and jobs", "Correct: it is a World Heritage Site and a major attraction."],
      ["It is still the capital city of the whole country", "Harare is the capital."],
      ["Its walls are mined for granite exports", "The site is protected as a national monument."],
      ["Its ruins are used as a modern trading market", "The ruins are a protected monument, not a market."],
    ],
    answer: "A",
    hints: ["Think about visitors."],
    explanation: "Tourism brings income, jobs and foreign currency, and promotes national pride.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** assesses the significance of Iron Age political structures today?",
    options: [
      ["Strong in communal areas, but most power lies with elected bodies", "Correct: a balanced judgement with evidence on both sides."],
      ["Chiefs today rule the whole country as kings did", "Zimbabwe is governed by elected and constitutional bodies."],
      ["They have disappeared and play no part in modern life", "Chiefs are recognised in Chapter 15 and still work in rural areas."],
      ["They now matter only in large cities such as Harare", "Their role is greatest in communal (rural) areas."],
    ],
    answer: "A",
    hints: ["Assess means weighing both sides."],
    explanation: "Traditional leaders matter in rural life and culture, while Parliament, councils and courts hold most power.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Maize was one of the main crops of Early Iron Age farmers in Zimbabwe.",
    answer: false,
    explanation: "False. Maize came from the Americas much later; Iron Age staples were sorghum and millets.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Khami and Great Zimbabwe are both UNESCO World Heritage Sites.",
    answer: true,
    explanation: "True. Both were listed in 1986.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each Iron Age contribution with how it continues today.",
    pairs: [
      ["Mining", "Modern mines opened on ancient workings"],
      ["Stone building", "Tourism at Great Zimbabwe and Khami"],
      ["Political structures", "Traditional leaders in Chapter 15"],
      ["Crafts", "Pottery, baskets and carvings sold to visitors"],
    ],
    explanation: "Each contribution survives in a modern form.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Knowledge and skills developed by local communities over generations are called indigenous {{blank:a}} systems. Heritage such as beliefs and skills, which cannot be touched, is called {{blank:b}} heritage.",
    blanks: [
      { id: "a", accepted: ["knowledge"], choices: ["knowledge", "trade", "mining", "voting"] },
      { id: "b", accepted: ["intangible"], choices: ["intangible", "tangible", "natural", "colonial"] },
    ],
    explanation: "Indigenous knowledge systems; intangible heritage.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which chapter of the Constitution recognises traditional leaders? Give the number only.",
    accepted: ["15", "chapter 15", "fifteen"],
    wrong: ["4", "12"],
    explanation: "**Chapter 15** deals with traditional leaders.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "List **four** contributions of Iron Age communities to contemporary Zimbabwe.",
    points: ["One, e.g. farming / crops", "A second, e.g. iron working / crafts", "A third, e.g. mining / trade", "A fourth, e.g. stone building / political structures / traditional medicine / religious beliefs"],
    modelAnswer: "Farming, mining, stone building and traditional leadership.",
    explanation: "One mark per contribution.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which Iron Age religious beliefs remain significant today.",
    points: [
      "Belief in Mwari and the ancestors continues",
      "Developed: many families hold bira or kurova guva / umbuyiso ceremonies",
      "Rain-asking ceremonies / spirit mediums",
      "Developed: communities still hold mukwerera / ukucela izulu led by chiefs and mediums, uniting the community",
    ],
    modelAnswer: "Many families still believe in Mwari and respect the ancestors, holding ceremonies such as bira and kurova guva / umbuyiso. Communities in many areas still hold rain-asking ceremonies (mukwerera / ukucela izulu), led by chiefs and spirit mediums, which bring people together.",
    hints: ["Beliefs and ceremonies."],
    explanation: "Two marks per developed point.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which schools could help young people value Iron Age contributions.",
    points: [
      "Suggests e.g. trips to Great Zimbabwe, Khami or local sites",
      "Explains: seeing the sites builds pride and understanding",
      "Suggests e.g. inviting potters, smiths, elders or traditional leaders / crafts and small-grain projects",
      "Explains: learners practise the skills and knowledge is passed on",
    ],
    modelAnswer: "Schools could organise trips to Great Zimbabwe or Khami, so learners see the achievements of their ancestors and feel pride. They could also invite potters, smiths or elders to teach skills, or start a small-grains garden, so the knowledge is passed on.",
    hints: ["Visits and practical skills."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "an article in a fictional school magazine in Masvingo, 2026",
      "Our Heritage Club visited a potter in the village who still makes clay pots the way her grandmother taught her. Then we visited a small mine where the owner told us his first shaft followed an ancient working. On the way home we stopped at Great Zimbabwe, where a guide said visitors come from many countries."),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which Iron Age contribution is shown by the mine owner's story?",
        options: [
          ["Mining", "Correct: the shaft followed an ancient working."],
          ["Stone building", "Stone building is shown at Great Zimbabwe."],
          ["Pottery", "Pottery is shown by the potter."],
          ["Political structures", "No leaders are mentioned."],
        ],
        answer: "A",
        explanation: "Ancient workings guided the modern mine.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** Iron Age contributions shown in Source A.",
        points: ["Pottery / crafts", "Mining", "Stone building / tourism at Great Zimbabwe"],
        modelAnswer: "Pottery, mining and stone building (Great Zimbabwe).",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how **two** of these contributions benefit the community today.",
        points: [
          "Pottery: income for the potter / skills passed on",
          "Developed: pots are sold and the craft is taught to the next generation",
          "Tourism at Great Zimbabwe / mining",
          "Developed: visitors bring income and jobs; mines provide employment and foreign currency",
        ],
        modelAnswer: "The potter earns income by selling pots and passes the skill on to younger people. Great Zimbabwe brings visitors from many countries, creating income and jobs for guides and craft sellers.",
      }),
    ],
    hints: ["Find the activities in the article."],
    explanation: "Applying knowledge of Iron Age contributions to a source.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on Iron Age contributions.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** contributions of Iron Age communities to farming in Zimbabwe.",
        points: ["Drought-tolerant crops such as sorghum and millets", "still grown and promoted in dry areas", "Cattle keeping", "cattle still used for ploughing, food and roora/lobola"],
        modelAnswer: "Iron Age farmers grew sorghum and millets, which are still promoted as drought-tolerant crops in dry areas. They kept cattle, which are still used for ploughing, food and roora/lobola.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "Assess the significance of the contributions of Iron Age communities to contemporary Zimbabwe.",
        points: [
          ["Farming: small grains and cattle still matter, though maize and modern methods dominate", 2],
          ["Mining and trade: modern mines on ancient workings; minerals still exported", 2],
          ["Stone building: World Heritage Sites, tourism, national name and the Zimbabwe Bird", 2],
          ["Political structures: chiefs recognised in Chapter 15, strong in rural areas but limited power", 2],
          ["Medicine and religion: still important to many, alongside modern medicine and other faiths", 2],
          ["Supported overall judgement", 2],
        ],
        levels: levels(12),
        modelAnswer: "The contributions of Iron Age communities remain significant, although some have changed.\n\nIn farming, sorghum and millets are still grown and promoted as drought-tolerant crops, and cattle remain central to family life and roora/lobola. However, maize, introduced later, is now the main staple, and modern farming methods are widely used.\n\nIn mining, many modern gold mines began on ancient workings, and Zimbabwe still exports minerals, continuing the old pattern of trade.\n\nStone building is highly significant for identity and tourism. Great Zimbabwe and Khami are World Heritage Sites, the country is named after the houses of stone, and the Zimbabwe Bird is on the flag.\n\nPolitical structures continue in chiefs, headmen and village heads, recognised in Chapter 15 of the Constitution. They are important in communal areas but have less power than Parliament, councils and courts.\n\nTraditional medicine and religious beliefs remain important to many families, but they exist alongside modern clinics and other faiths.\n\nOverall, the contributions are very significant for identity, culture and rural life, and partly significant in the economy, where modern methods have replaced the old ones.",
      }),
    ],
    hints: ["In (b), weigh each contribution and finish with an overall judgement."],
    explanation: "Describe (a) and assess (b) Iron Age contributions.",
  });

  b.card("DEFINITION", "Contemporary society", "Society as it is today.");
  b.card("DEFINITION", "Indigenous knowledge systems", "Knowledge, skills and practices developed by local communities over generations.");
  b.card("DEFINITION", "Intangible heritage", "Heritage that cannot be touched: beliefs, ceremonies, skills and knowledge.");
  b.card("FACT", "Two Iron Age World Heritage Sites in Zimbabwe?", "Great Zimbabwe and Khami (both 1986).");
  b.card("FACT", "List eight Iron Age contributions.", "Farming, iron working and crafts, mining, trade, stone building, political structures, traditional medicine, religious beliefs.");
  b.card("CONCEPT", "How did ancient workings help modern mining?", "Prospectors used them to find gold reefs, and many modern mines began there.");
  b.card("CONCEPT", "Why are small grains still important?", "They tolerate drought, so they protect food security in dry areas.");
  b.card("CONCEPT", "What does 'assess the significance' require?", "Weigh how important each contribution is today, with evidence of what continues and what has changed, then judge.");
});
