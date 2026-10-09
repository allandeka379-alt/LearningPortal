// W1b: main features of indigenous Zimbabwean culture (her.culture.indigenous-features).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.indigenous-features", { file: "culture/indigenous-features", keyPrefix: "culture.indigenous-features" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which definition of **culture** is the most complete?",
    options: [
      ["The total way of life of a people, passed on from one generation to the next", "Correct: culture covers language, beliefs, customs, values, arts, food and more."],
      ["The traditional songs, dances and costumes that a people perform at their ceremonies", "Music and dance are only one part of culture."],
      ["The religious ceremonies that a community performs every year", "Religion is one feature of culture, not the whole of it."],
      ["The clothes and ornaments people wear on important occasions", "Dress is one feature among many."],
    ],
    answer: "A",
    explanation: "Culture is the whole way of life: language, beliefs, norms, values, food, dress, arts, tools and institutions, learnt and passed on.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is an example of **non-material** culture?",
    options: [
      ["a folk tale told by a grandmother", "Correct: a story is an idea passed on in words, not an object."],
      ["a clay water pot", "A pot is an object people make and use: material culture."],
      ["a carved wooden headrest for sleeping", "A carved headrest is an object: material culture."],
      ["a woven sleeping mat", "A mat is an object: material culture."],
    ],
    answer: "A",
    explanation: "Material culture is the things people make; non-material culture is ideas, beliefs, norms, values and language, including folk tales.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "The field worked by the community whose harvest was kept to help people in need is called …",
    options: [
      ["zunde ramambo / isiphala senkosi", "Correct: the chief's granary, a communal safety net."],
      ["nhimbe / ilima", "Nhimbe/ilima is a work party for one household, not the chief's granary."],
      ["roora / lobola", "Roora/lobola is bride wealth paid in marriage."],
      ["kurova guva / umbuyiso", "This is the ceremony that brings home the spirit of a deceased person."],
    ],
    answer: "A",
    explanation: "The zunde ramambo (Shona) or isiphala senkosi (Ndebele) stored grain to feed orphans, widows, the elderly and others in hard times.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature of indigenous culture **most directly** prevents marriage between close relatives?",
    options: [
      ["the totem system", "Correct: people of the same totem regard each other as relatives and do not marry."],
      ["traditional dress", "Dress does not regulate marriage."],
      ["mbira music", "Music is linked to ceremonies, not marriage rules."],
      ["the staple food", "Food has nothing to do with marriage rules."],
    ],
    answer: "A",
    explanation: "Totems mark clan membership; marrying someone of the same totem is traditionally forbidden because they are counted as kin.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did the extended family act as a form of social security in indigenous culture?",
    options: [
      ["Relatives took in and cared for orphans, the sick and the elderly", "Correct: the extended family shared the care of those who could not look after themselves."],
      ["Each nuclear family kept its harvest entirely for itself", "This is the opposite of the extended family's sharing role."],
      ["Children left home as soon as they could work for wages", "This describes modern migration, not the extended family's role."],
      ["Elders sold the family's land and shared the money among the surviving relatives", "Land was not normally sold in indigenous culture; it was held by the community."],
    ],
    answer: "A",
    hints: ["Social security means protection for people who cannot support themselves."],
    explanation: "Because duties were shared across the extended family, no orphan, widow or elderly person was meant to be left alone.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At a ceremony, an elder settles a quarrel between two families by listening to both and asking them to share a meal. Which feature of indigenous culture is shown?",
    options: [
      ["traditional leadership and dispute settlement", "Correct: elders and traditional leaders settle disputes through dialogue."],
      ["material culture", "Material culture is objects; the story is about how a dispute is settled."],
      ["the totem system and its praise poetry for clans", "Totems are clan symbols; the story is about settling a quarrel."],
      ["the staple diet", "The meal is a sign of reconciliation, but the feature shown is dispute settlement."],
    ],
    answer: "A",
    hints: ["Look at what the elder is doing, not what is eaten."],
    explanation: "Indigenous social organisation includes elders and traditional courts that settle disputes through discussion and reconciliation.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about indigenous culture is the **most balanced**?",
    options: [
      ["It holds much of value, though some practices have changed where they harmed people", "Correct: this recognises its value and that cultures change."],
      ["It should be preserved exactly as it was in the past, with no changes of any kind at all", "Cultures always change; some practices harmed people and were rightly changed."],
      ["It is out of date and has nothing to offer modern Zimbabwe", "This ignores its values, knowledge and identity."],
      ["It belongs only to rural people and not to people in towns", "Culture is carried by people in towns too."],
    ],
    answer: "A",
    hints: ["A balanced statement sees both strengths and weaknesses."],
    explanation: "Indigenous culture provides identity, values and knowledge, and like every culture it changes over time.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The mbira is closely linked with indigenous religious ceremonies.",
    answer: true,
    explanation: "True. Mbira music is played at ceremonies such as the bira, as well as for entertainment.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All of Zimbabwe's indigenous communities share exactly the same customs.",
    answer: false,
    explanation: "False. They share many features, such as the extended family and respect for elders, but customs differ in detail between groups.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of indigenous culture with an example.",
    pairs: [
      ["language", "proverbs, riddles and folk tales"],
      ["kinship", "the aunt advising a niece"],
      ["crafts", "pottery, basketry and wood carving"],
      ["social organisation", "a headman and a council of elders"],
    ],
    explanation: "Each feature has typical examples; describing a feature with an example earns marks in Paper 2.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Things people make and use are called {{blank:a}} culture, while ideas, norms and beliefs are {{blank:b}} culture.",
    blanks: [
      { id: "a", accepted: ["material"], choices: ["material", "non-material", "foreign", "modern"] },
      { id: "b", accepted: ["non-material"], choices: ["non-material", "material", "foreign", "modern"] },
    ],
    explanation: "Material culture: pots, tools, houses. Non-material culture: language, beliefs, norms, values.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Ndebele word for the staple food made from maize meal (sadza in Shona).",
    accepted: ["isitshwala", "itshwala"],
    wrong: ["ilima"],
    explanation: "**Isitshwala** is the Ndebele word for sadza.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** main features of indigenous Zimbabwean culture.",
    points: ["One of: language, family and kinship, totems, religion and beliefs", "A second (e.g. food, dress)", "A third (e.g. music, dance and crafts)", "A fourth (e.g. social organisation and leadership, communal values)"],
    modelAnswer: "Language, totems, religion and beliefs, music and dance.",
    explanation: "One mark for each different feature.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe **three** features of indigenous Zimbabwean culture.",
    points: [
      "Names a feature, e.g. language",
      "Describes it, e.g. carries identity and wisdom through proverbs and folk tales",
      "Names a second feature, e.g. the extended family",
      "Describes it, e.g. relatives such as the aunt and uncle have duties to advise and care",
      "Names a third feature, e.g. religion",
      "Describes it, e.g. belief in God and ancestral spirits, honoured in family and community rituals",
    ],
    modelAnswer: "Language carries identity and wisdom through proverbs, riddles and folk tales. The extended family links many relatives, and each, such as the aunt and the maternal uncle, has duties to advise and care for younger members. Religion includes belief in God (Mwari/uMlimo) and in ancestral spirits, honoured through family and community rituals.",
    hints: ["Each feature: name it, then describe it with an example."],
    explanation: "One mark for each feature and one for each description.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a school could help pupils value indigenous culture, explaining each.",
    points: [
      "Suggests a culture day, festival or competition (songs, dance, food, dress)",
      "Explains that pupils experience and take pride in the features of culture",
      "Suggests inviting elders or resource persons to tell folk tales or teach crafts",
      "Explains that knowledge is passed directly from the older generation",
    ],
    modelAnswer: "The school could hold a culture day with traditional songs, dances, food and dress, so pupils experience their culture and take pride in it. It could also invite elders to tell folk tales and teach crafts such as basketry, so knowledge passes directly from the older generation to the young.",
    hints: ["Think of events and of people who hold cultural knowledge."],
    explanation: "Credit any sensible suggestion with an explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "a poster for a fictional school culture day in Masvingo, described in words", "The poster shows a drummer and a girl playing mbira beside a table of clay pots, baskets and beaded necklaces. A banner reads: \"Know your roots: language, totems, food and family\". Below are listed events: totem praise recitations, a folk-tale competition, a traditional food stall and a talk by a village head on how disputes were settled in the past.", { described: true }) +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** examples of material culture shown on the poster.",
        points: ["One of: drum, mbira, clay pots", "A second, e.g. baskets, beaded necklaces"],
        modelAnswer: "Clay pots; baskets.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** examples of non-material culture in the events listed.",
        points: ["One of: totem praises, folk tales", "A second, e.g. knowledge of dispute settlement, language"],
        modelAnswer: "Totem praise recitations; folk tales.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain how **two** of the events could help pupils understand their identity.",
        points: [
          "Totem praises",
          "teach clan membership and family history, so pupils know who their relatives and ancestors are",
          "The village head's talk",
          "shows how communities were organised and kept peace, linking pupils to their community's values",
        ],
        modelAnswer: "Totem praise recitations teach pupils their clan membership and family history, so they know who their relatives and ancestors are. The village head's talk shows how communities were organised and kept peace, linking pupils to the values of their community.",
      }),
    ],
    hints: ["Material culture is things; non-material culture is ideas and words."],
    explanation: "A described-poster practice item on material and non-material culture and identity (8 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the value of indigenous culture today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** ways in which indigenous values provide social security.",
        points: [
          ["Extended family: relatives care for orphans, the sick and the elderly", 2],
          ["Communal sharing: the chief's granary or shared harvests help households in drought or hardship", 2],
        ],
        modelAnswer: "The extended family shares responsibility, so orphans, the sick and the elderly are cared for by relatives. Communal sharing, such as the chief's granary (zunde ramambo/isiphala senkosi), provides food for households in drought or other hardship.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous culture is still the main guide to how Zimbabweans live today.\" How far do you agree?",
        points: [
          ["For: language, kinship, totems, respect for elders and ceremonies remain strong in many families", 2],
          ["For: indigenous values shape funerals, marriage negotiations and community life in towns and villages", 2],
          ["Against: modern education, religion, law, media and urban life also guide behaviour; some practices have faded or changed", 2],
          ["Supported judgement, e.g. most people blend indigenous and modern influences", 2],
        ],
        levels: levels(8),
        modelAnswer: "Indigenous culture remains an important guide. Most families still speak an indigenous language at home, know their totems and expect children to respect elders. Funerals, marriage negotiations and many community events follow indigenous customs, even in towns.\n\nHowever, other influences are also strong. Formal education, Christianity and other faiths, national law and the media guide much of daily life, and some practices, such as communal work parties, are less common, especially in towns. Laws now set rules on marriage and inheritance that differ from some customs.\n\nI agree only partly. Indigenous culture is one of the main guides, especially in family life, but for most Zimbabweans it is blended with modern influences rather than being the only guide.",
      }),
    ],
    hints: ["In (b), consider family life and public life separately."],
    explanation: "A practice evaluative item on how far indigenous culture shapes life today.",
  });

  b.card("DEFINITION", "Culture", "The total way of life of a people: language, beliefs, customs, norms, values, food, dress, arts, tools and institutions, passed on from generation to generation.");
  b.card("DEFINITION", "Kinship", "The network of relationships by blood and marriage, with duties and forms of address, linking the extended family and clan.");
  b.card("DEFINITION", "Material culture", "The things people make and use, e.g. pots, tools, houses, instruments.");
  b.card("DEFINITION", "Non-material culture", "The ideas, beliefs, norms, values and language that guide life, e.g. folk tales, proverbs, totem praises.");
  b.card("FACT", "What is zunde ramambo (isiphala senkosi)?", "The chief's granary: a field worked by the community whose harvest helped people in need.");
  b.card("FACT", "Name six features of indigenous Zimbabwean culture.", "Language, family and kinship, totems, religion and beliefs, food, dress, music/dance/crafts, social organisation and leadership, communal values (any six).");
  b.card("CONCEPT", "How are totems linked to kinship?", "People of the same totem count as relatives, so they do not marry each other.");
  b.card("CONCEPT", "Give three reasons indigenous norms and values matter.", "Identity and belonging; moral guidance; social security (also unity, knowledge, heritage for tourism and arts).");
  b.card("FACT", "Which chapter of the Constitution deals with traditional leaders?", "Chapter 15.");
});
