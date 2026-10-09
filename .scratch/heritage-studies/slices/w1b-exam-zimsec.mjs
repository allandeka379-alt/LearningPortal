// W1b exam-format items: ZIMSEC Heritage Studies Paper 2 Section A (ZIM_P2A, 10 marks: 2 + 3 + 5) x4 and Section B
// essays (ZIM_P2B, 20 marks: 8 + 12) x3. Part marks are our convention (reviewer to check against recent papers).
import { concept, P, source, levels, EXAM, checkExam } from "../lib.mjs";

const A = EXAM.ZIM_P2A;
const B = EXAM.ZIM_P2B;
const a = { skill: A.skill, secs: A.secs, examStyle: true, paper: "Paper 2" };
const bb = { skill: B.skill, secs: B.secs, examStyle: true, paper: "Paper 2" };

concept("her.culture.unhu", { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec" }, (b) => {
  // ---------------------------------------------------------------- Section A 1: Unhu attributes.
  b.struct({
    ...a, d: 3,
    concepts: ["her.culture.unhu"],
    stem: "This question is about Unhu/Ubuntu/Vumunhu.\n\n" + source("Source A", "a short report in a fictional church newsletter from Gweru, 2026",
      "When a storm blew the roof off Gogo Moyo's kitchen, her neighbours did not wait to be asked. The young men of the street repaired it the next day. A family she hardly knew brought her blankets and food, and a shop owner sold the iron sheets at cost price. \"This is Ubuntu,\" said one neighbour.") ,
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the definition.",
        template: "Unhu/Ubuntu/Vumunhu is the belief that a person becomes fully {{blank:a}} through good {{blank:b}} with other people.",
        blanks: [
          { id: "a", accepted: ["human"], choices: ["human", "wealthy", "powerful", "famous"] },
          { id: "b", accepted: ["relationships"], choices: ["relationships", "possessions", "examinations", "competitions"] },
        ],
        explanation: "Being human through others: humanity is shown and completed in relationships.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify the attribute of Unhu shown by each action in Source A.",
        template: "The young men repairing the roof without being asked: {{blank:a}}. The family bringing blankets and food to someone they hardly knew: {{blank:b}}. The shop owner selling iron sheets at cost price: {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["oneness"], choices: ["oneness", "punctuality", "confidentiality", "humility"] },
          { id: "b", accepted: ["compassion"], choices: ["compassion", "integrity", "punctuality", "tolerance"] },
          { id: "c", accepted: ["sharing"], choices: ["sharing", "accountability", "tolerance", "punctuality"] },
        ],
        explanation: "Working together for a neighbour shows oneness; caring for someone in trouble shows compassion; giving up profit to help shows sharing.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain the importance of Unhu/Ubuntu/Vumunhu to a community.",
        points: [
          "Mutual support: neighbours help households in need",
          "so no one faces disaster, illness or death alone (social safety net)",
          "Peace and unity: respect and tolerance",
          "reduce conflict and let people of different backgrounds live together",
          "Honesty and integrity build trust, so the community can cooperate on projects / develop",
        ],
        modelAnswer: "Unhu provides mutual support: as in the source, neighbours help a household in trouble, so nobody faces a disaster, illness or death alone. It promotes peace and unity, because respect and tolerance reduce conflict and allow people of different backgrounds to live together. Honesty and integrity build trust, so the community can cooperate on shared projects such as repairing a road or a borehole.",
        explanation: "Two developed points (2 marks each) plus a further point; credit any relevant importance that is explained.",
      }),
    ]),
    hints: ["In (b), ask what each person gave: labour, care or money?"],
    explanation: "Paper 2 Section A item on Unhu: definition, attributes in a source, importance to the community.",
  });

  // ---------------------------------------------------------------- Section A 2: workplace norms.
  b.struct({
    ...a, d: 3,
    concepts: ["her.culture.workplace"],
    stem: "This question is about norms and values at the workplace.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the definitions.",
        template: "Keeping customers' private information secret is called {{blank:a}}. Being answerable for your actions and owning up to mistakes is called {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["confidentiality"], choices: ["confidentiality", "punctuality", "nepotism", "teamwork"] },
          { id: "b", accepted: ["accountability"], choices: ["accountability", "absenteeism", "hospitality", "moonlighting"] },
        ],
        explanation: "Confidentiality protects privacy; accountability means answering for one's actions.",
      }),
      P.fib({
        label: "(b)",
        stem: "Identify the threat to workplace norms and values shown in each case.",
        template: "A clerk asks for money before processing a free application: {{blank:a}}. A worker often stays away from work without a good reason: {{blank:b}}. A supervisor repeatedly makes unwanted remarks to a junior worker: {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["corruption"], choices: ["corruption", "teamwork", "punctuality", "confidentiality"] },
          { id: "b", accepted: ["absenteeism"], choices: ["absenteeism", "accountability", "teamwork", "integrity"] },
          { id: "c", accepted: ["harassment"], choices: ["harassment", "hospitality", "punctuality", "safety"] },
        ],
        explanation: "Demanding a bribe is corruption; unexplained absence is absenteeism; unwanted remarks are harassment, which is unlawful.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain why punctuality, integrity and safety are important at the workplace.",
        points: [
          "Punctuality: work starts on time and customers are served",
          "so the organisation keeps customers and meets deadlines",
          "Integrity: no theft, bribes or false claims",
          "so money and reputation are protected and trust grows",
          "Safety: following rules on machines, chemicals and protective clothing prevents injury and death",
        ],
        modelAnswer: "Punctuality means work starts on time and customers are served without delay, so the organisation keeps its customers and meets deadlines. Integrity means workers do not steal, take bribes or make false claims, so the organisation's money and reputation are protected and trust grows. Safety rules on machines, chemicals and protective clothing prevent injuries and deaths.",
        explanation: "Two marks each for punctuality and integrity (point + development) and one for safety.",
      }),
    ]),
    hints: ["In (b), name the behaviour that damages the workplace in each case."],
    explanation: "Paper 2 Section A item on workplace norms, threats and their importance.",
  });

  // ---------------------------------------------------------------- Section A 3: inheritance and wills.
  b.struct({
    ...a, d: 3,
    concepts: ["her.culture.inheritance-contemporary", "her.culture.inheritance-indigenous"],
    stem: "This question is about inheritance and wills.",
    parts: checkExam(A, [
      P.fib({
        label: "(a)",
        stem: "Complete the statements.",
        template: "A person who makes a will is called a {{blank:a}}. A person who dies without a valid will is said to have died {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["testator"], choices: ["testator", "beneficiary", "executor", "heir"] },
          { id: "b", accepted: ["intestate"], choices: ["intestate", "insolvent", "testate", "customary"] },
        ],
        explanation: "Testator: maker of a will. Intestate: without a valid will.",
      }),
      P.fib({
        label: "(b)",
        stem: "Complete the outline of a valid will and how an estate is supervised.",
        template: "A valid will must be in {{blank:a}}, signed by the testator and by {{blank:b}} witnesses. The estate is reported to and supervised by the {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["writing"], choices: ["writing", "song", "secret", "public"] },
          { id: "b", accepted: ["two"], choices: ["two", "no", "ten", "twenty"] },
          { id: "c", accepted: ["Master of the High Court"], choices: ["Master of the High Court", "Registrar General", "village head", "Electoral Commission"] },
        ],
        explanation: "Written; two witnesses; the Master of the High Court.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Explain why writing a will is important for a family.",
        points: [
          "It makes the testator's wishes clear",
          "so there are fewer quarrels among relatives",
          "It gives the spouse and children written proof of their rights",
          "which protects them against property-grabbing",
          "It speeds up winding up the estate / allows provision for particular dependants",
        ],
        modelAnswer: "A will makes the testator's wishes clear, so there are fewer quarrels among relatives after the death. It gives the spouse and children written proof of their rights, which protects them against relatives who try to grab property. It also speeds up the winding up of the estate and lets the testator provide for particular people, such as a child with a disability.",
        explanation: "Two developed points (2 marks each) plus one further point.",
      }),
    ]),
    hints: ["In (c), think of quarrels, proof and speed."],
    explanation: "Paper 2 Section A item on wills and the supervision of estates.",
  });

  // ---------------------------------------------------------------- Section A 4: community ceremonies.
  b.struct({
    ...a, d: 3,
    concepts: ["her.identity.community-gatherings", "her.identity.religious-practices"],
    stem: "This question is about indigenous community gatherings and ceremonies.",
    parts: checkExam(A, [
      P.mcq({
        label: "(a)", marks: 2, multiple: true,
        stem: "Which **two** of the following are ceremonial tools used at indigenous ceremonies? Select two.",
        options: [
          ["mbira", "Correct: played at bira and other ceremonies."],
          ["drums", "Correct: provide rhythm and call people together."],
          ["ox-drawn plough", "A plough is a farming implement, not a ceremonial tool."],
          ["school bell", "This is not an indigenous ceremonial tool."],
          ["wheelbarrow", "A wheelbarrow is a carrying tool for work, not a ceremonial tool."],
        ],
        answer: ["A", "B"],
        scoring: "partial",
        explanation: "Ceremonial tools include drums, mbira, rattles (hosho), clay pots, ceremonial axes, staffs and cloths.",
      }),
      P.match({
        label: "(b)",
        stem: "Match each gathering with its purpose.",
        pairs: [
          ["mukwerera / ukucela izulu", "asking for rain"],
          ["nhimbe / ilima", "neighbours helping one household with heavy work"],
          ["kurova guva / umbuyiso", "bringing home the spirit of the deceased"],
        ],
        explanation: "Rain-making, the work party and the bringing-home ceremony.",
      }),
      P.manual({
        label: "(c)", marks: 5,
        stem: "Describe the significance of indigenous gatherings and ceremonies.",
        points: [
          "Build identity: young people learn totem praises, songs, dances and language",
          "Unity and belonging: working, mourning and celebrating together strengthens ties between households",
          "Social security: work parties, the chief's granary and funeral support help the needy and the bereaved",
          "Religious expression: honouring God and the ancestors (e.g. bira, rain-making)",
          "Passing on culture / settling disputes",
        ],
        modelAnswer: "Gatherings build identity, because young people learn totem praises, songs, dances and language. They create unity and belonging, as households work, mourn and celebrate together. They provide social security: work parties help with heavy tasks, the zunde ramambo feeds the needy and funerals support the bereaved. Ceremonies such as bira and rain-making express the community's religious beliefs, and gatherings pass culture from one generation to the next.",
        explanation: "One mark per relevant described point, to five.",
      }),
    ]),
    hints: ["In (c), think of identity, unity, security, religion and culture."],
    explanation: "Paper 2 Section A item on community gatherings, ceremonial tools and their significance.",
  });

  // ---------------------------------------------------------------- Section B 1: threats to indigenous culture.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.culture.foreign-influences", "her.culture.indigenous-features"],
    stem: "This question is about indigenous culture in Zimbabwe.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Explain **four** threats to indigenous culture in Zimbabwe.",
        points: [
          ["Media and the internet: spread foreign dress, music and lifestyles, especially among the young", 2],
          ["Urbanisation: families in towns lose daily contact with elders and ceremonies; nuclear households", 2],
          ["Loss of language: children who speak only English cannot understand proverbs, totem praises and elders", 2],
          ["Migration / globalisation / some religious attitudes / commercialisation, explained", 2],
        ],
        modelAnswer: "The media and the internet spread foreign music, dress and lifestyles, especially among young people, who may come to value them above their own culture.\n\nUrbanisation moves families into towns, where they live in nuclear households far from elders and rarely attend ceremonies, so children learn less of their culture directly.\n\nLoss of language is a serious threat: when parents speak only English at home, children cannot understand proverbs, folk tales, totem praises or their grandparents' advice, and much of the culture is lost with the language.\n\nMigration abroad means some children grow up outside the country without their parents' language and customs, and globalisation replaces local foods, crafts and fashions with imported ones.",
        explanation: "Two marks per threat: identification and explanation of how it damages culture.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Foreign influence is the greatest threat to indigenous culture in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: foreign media, education and religion spread foreign norms; individualism and materialism weaken communal values", 3],
          ["Against: internal changes such as urbanisation, migration and parents' own language choices also erode culture", 3],
          ["Against: foreign influence also brings benefits (schooling, medicine, technology, rights) and tools to spread culture (local-language media)", 3],
          ["Supported conclusion weighing the threats", 3],
        ],
        levels: levels(12),
        modelAnswer: "Foreign influence is a major threat. Through films, music, social media and advertising, foreign lifestyles reach young people every day. Colonial-era education often dismissed indigenous ways as backward, and some people still rank foreign ways above their own. Individualism and materialism can weaken communal values such as sharing and respect for elders.\n\nHowever, other threats are at least as important, and some come from within. Urbanisation separates families from elders and ceremonies. Migration, both to towns and abroad, breaks the daily passing on of culture. Many parents themselves choose to speak only English at home, so children lose the language that carries proverbs, totem praises and history; this is a decision made by Zimbabweans, not imposed from outside.\n\nForeign influence is also not purely a threat. It has brought schooling, medicine, technology and the language of human rights, and modern media can be used to spread indigenous music, languages and stories to a wider audience.\n\nI agree only to a limited extent. Foreign influence is an important threat, but the greatest threat is the loss of indigenous languages and of contact between generations, which is driven as much by urbanisation, migration and family choices as by foreign influence. Families, schools and the media can reduce all of these threats if they actively teach and use indigenous culture.",
        explanation: "Levels of response: the top level weighs foreign influence against internal threats and its benefits, and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), separate threats from outside from changes within Zimbabwean society."],
    explanation: "Paper 2 Section B essay on threats to indigenous culture.",
  });

  // ---------------------------------------------------------------- Section B 2: indigenous versus contemporary inheritance.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.culture.inheritance-indigenous", "her.culture.inheritance-contemporary"],
    stem: "This question is about inheritance and heirship.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe inheritance and heirship practices in indigenous Zimbabwean families.",
        points: [
          ["Choice of heir: usually a male relative (eldest son, or the deceased's brother if sons were young), chosen by the extended family", 2],
          ["Tangible (livestock, land-use rights, goods) and intangible (name, totem, values, office) inheritance passed on", 2],
          ["Sharing of the estate (kugova nhaka), often at kurova guva/umbuyiso; livestock held by the heir for the household", 2],
          ["Heir's duties: care for widow(s) and children, school fees, keeping the family together, representing it", 2],
        ],
        modelAnswer: "In indigenous families the heir (mugari wenhaka in Shona, indlalifa in Ndebele) was usually a male relative: often the eldest son, or a brother of the deceased if the sons were young. He was chosen by the extended family, with paternal aunts and uncles playing key roles.\n\nBoth tangible and intangible inheritance were passed on. Tangible inheritance included livestock, rights to use fields, the homestead, tools and household goods; intangible inheritance included the deceased's name, the totem, values and, in ruling families, traditional office.\n\nThe estate was shared (kugova nhaka), often at the kurova guva or umbuyiso ceremony some months after burial. Personal items went to children and relatives, while livestock was held by the heir for the household.\n\nThe heir had heavy duties: caring for the widow or widows, feeding and educating the children, keeping the family together and representing it at gatherings and ceremonies.",
        explanation: "Two marks per developed point: choice of heir, what is inherited, sharing, duties.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "To what extent are contemporary inheritance practices better than indigenous ones?",
        points: [
          ["Contemporary strengths: wills and the law protect spouses and children; women's rights to property; supervision by the Master of the High Court", 3],
          ["Contemporary weaknesses: cost, delays, distance from offices; many people do not write wills; property-grabbing still occurs", 3],
          ["Indigenous strengths and weaknesses: collective care and continuity of name and values, but women often excluded and reliance on the heir's honesty", 3],
          ["Supported conclusion, e.g. contemporary practice gives fairer, enforceable rights while families keep valuable customs", 3],
        ],
        levels: levels(12),
        modelAnswer: "Contemporary practices have clear strengths. A written will states the deceased's wishes, and when there is no will the law makes the surviving spouse and children the main beneficiaries. Widows and daughters have rights to property that indigenous custom often denied them, and the Master of the High Court supervises executors, so property can be recovered through the courts if it is grabbed.\n\nContemporary practices also have weaknesses. Many people still do not write wills; reaching the Master's office or the courts can be costly and slow, especially for rural families; and property-grabbing still happens where widows do not know their rights.\n\nIndigenous practices had real strengths: the extended family took collective responsibility, an heir had a duty to care for the widow and children, and the name, totem and values were passed on. But women were often excluded from property, and the system depended on the heir's honesty; a dishonest heir could leave a widow with nothing.\n\nOverall, contemporary practices are better to a large extent, because they give fair and enforceable rights, especially to women and children. Indigenous practice remains valuable for passing on intangible inheritance and family responsibility, which is why many families combine the two: a customary heir carries the name, while property is shared through the will or the law.",
        explanation: "Levels of response: the top level weighs strengths and weaknesses of both systems and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), ask who is protected under each system, and how well rights are enforced."],
    explanation: "Paper 2 Section B essay comparing indigenous and contemporary inheritance.",
  });

  // ---------------------------------------------------------------- Section B 3: monogamy and polygamy.
  b.struct({
    ...bb, d: 4,
    concepts: ["her.identity.marriage-types"],
    stem: "This question is about types of marriage.",
    parts: checkExam(B, [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Describe the features of civil, customary and religious marriages in Zimbabwe today.",
        points: [
          ["Civil: solemnised and registered by a marriage officer (magistrate or authorised minister); monogamous; certificate issued", 2],
          ["Customary: concluded by custom with roora/lobola and family involvement; can be registered; may be polygamous under customary law", 2],
          ["Religious: conducted according to a faith's teaching in a church, mosque or other place of worship; often also registered when the minister is authorised", 2],
          ["Common legal rules: minimum age 18 and free consent; many couples combine types; reform by the Marriages Act of 2022", 2],
        ],
        modelAnswer: "A civil marriage is solemnised and registered by a marriage officer, such as a magistrate or an authorised minister of religion. It is monogamous, and a marriage certificate is issued.\n\nA customary marriage is concluded according to custom, involving both families and the payment of roora/lobola. It can be registered, and under customary law it may be polygamous.\n\nA religious marriage is conducted according to the teachings of a faith, in a church, mosque or other place of worship. Where the minister is authorised, a religious wedding is also registered as a civil marriage.\n\nAll marriages are subject to the same basic legal rules: no one under 18 may marry, and both parties must consent freely. Many couples combine types, for example a customary marriage followed by a church wedding. Marriage law was reformed by the Marriages Act of 2022.",
        explanation: "Two marks per developed point.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE",
        stem: "\"Monogamy is better suited than polygamy to life in Zimbabwe today.\" Discuss.",
        points: [
          ["For monogamy: cost of living and school fees; closer partnership; fewer conflicts; lower health risks where faithful", 3],
          ["For polygamy (other views): still allowed under customary law and accepted by some families and faiths; care within a household; cultural continuity", 3],
          ["Against polygamy today: rivalry, resources spread thin, inheritance disputes, health risks, unequal power; many faiths reject it", 3],
          ["Supported conclusion that recognises it is a contested matter", 3],
        ],
        levels: levels(12),
        modelAnswer: "Many people argue that monogamy suits modern life better. Most families now live on wages rather than large farms, so a big household is costly rather than a source of labour, and school fees, rent and food must be shared among fewer people. Monogamy allows a close partnership between two spouses, and where both are faithful it lowers the risk of sexually transmitted infections.\n\nOthers point out that polygamy remains part of the culture of some families and faiths, and customary law still allows it. Supporters argue that it can provide care within a household for widows or for a wife who cannot have children, and that it continues a long-standing tradition.\n\nHowever, the disadvantages of polygamy are serious in today's conditions. Rivalry between wives and between children can cause conflict, resources are spread thin, inheritance disputes are common when the husband dies, and health risks rise if any partner has other partners. Many churches reject polygamy, and wives may have less say in decisions.\n\nThis is a contested matter, and views depend partly on faith and culture. On balance, I agree that monogamy is better suited to most people's lives in Zimbabwe today, mainly for economic and health reasons, while recognising that polygamy remains lawful under customary law and that the most important thing in any marriage is that both partners are adults who consent freely.",
        explanation: "Levels of response: the top level presents both views fairly, considers modern conditions and reaches a supported judgement.",
      }),
    ]),
    hints: ["In (b), consider economic, health, legal, religious and cultural arguments."],
    explanation: "Paper 2 Section B essay on types of marriage and the monogamy/polygamy debate.",
  });
});
