// W1a: ahist.precolonial.san-khoikhoi (ZIMSEC topic 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.san-khoikhoi", { file: "precolonial/san-khoikhoi", keyPrefix: "precolonial.san-khoikhoi" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How did the San mainly get their food?",
    options: [
      ["By hunting wild animals and gathering wild plants", "Correct: San bands were hunter-gatherers."],
      ["By herding large numbers of cattle on open pasture", "Herding was the Khoi-Khoi way of life."],
      ["By growing sorghum and millet in permanent fields", "Crop farming was practised by Bantu-speaking farmers."],
      ["By raiding the villages of neighbouring peoples", "Raiding was not the basis of San subsistence."],
    ],
    answer: "A",
    explanation: "The San lived by hunting and gathering. The Khoi-Khoi were pastoralists, and the Bantu-speaking newcomers were farmers.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which was the basic unit of San society?",
    options: [
      ["A band of related families", "Correct: bands of kin moving around a water source were the basic group."],
      ["A clan led by a hereditary chief", "Clans with chiefs were typical of the Khoi-Khoi and of farming societies."],
      ["A regiment of young men under a king", "Regiments belonged to later states such as the Zulu and Ndebele."],
      ["A village of mud-walled houses and fields", "Permanent villages with fields were the farmers' pattern."],
    ],
    answer: "A",
    explanation: "San society was organised in small, mobile bands of kin, without chiefs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main form of wealth among the Khoi-Khoi?",
    options: [
      ["Cattle and sheep", "Correct: livestock provided food, clothing, trade and status."],
      ["Gold and ivory", "These were traded by plateau states and have no central place in Khoi-Khoi wealth."],
      ["Iron hoes and spears", "Iron-working was a skill of the Bantu-speaking farmers."],
      ["Fields of millet and maize", "The Khoi-Khoi were herders, not crop farmers."],
    ],
    answer: "A",
    explanation: "The Khoi-Khoi were pastoralists; a chief's standing depended on his herds and followers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement correctly describes leadership in a San band?",
    options: [
      ["It was informal and based on respect for experience and skill", "Correct: elders and skilled people guided decisions by discussion."],
      ["It passed from father to eldest son as a hereditary chiefship", "San bands did not have hereditary chiefs."],
      ["It rested on command of a regiment of warriors", "San bands had no standing armies."],
      ["It was held by a king who collected tribute", "San society had no kings or tribute."],
    ],
    answer: "A",
    explanation: "Leadership was informal and shared, which suited a small mobile group.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What do many San rock paintings in the Matopo Hills most often show?",
    options: [
      ["Animals such as eland and human figures linked with trance ritual", "Correct: the paintings are a source for beliefs as well as daily life."],
      ["Maps of the trade routes to the Indian Ocean coast", "The paintings are not maps and are not about trade routes."],
      ["Portraits of Mutapa kings with their wives and tribute", "The Mutapa state was a later farming state with no connection to these paintings."],
      ["Lists of the cattle owned by each Ndebele regiment", "Ndebele regiments arrived in the nineteenth century, long after most of the art."],
    ],
    answer: "A",
    hints: ["What did the artists see around them, and what did their healers do?"],
    explanation: "Animals, especially eland, and human figures in trance postures dominate. The art is hard to date and its meanings are debated.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which feature of Nguni languages such as Zulu and Xhosa is evidence of contact with the Khoisan?",
    options: [
      ["The use of click sounds", "Correct: clicks were borrowed from Khoisan languages."],
      ["The use of tonal grammar in verbs", "Tonal grammar is common across Bantu languages and does not show Khoisan contact."],
      ["The absence of a written alphabet", "Many languages lacked writing; this does not indicate Khoisan contact."],
      ["The use of Arabic words for trade", "Arabic words come from contact with the Indian Ocean trade, not from the Khoisan."],
    ],
    answer: "A",
    hints: ["Which sound is unusual in most Bantu languages?"],
    explanation: "Click sounds appear in Zulu and Xhosa but are not typical of most Bantu languages, and they show contact and intermarriage with Khoisan speakers.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why many San bands were pushed into drier regions as Bantu-speaking farmers settled?",
    options: [
      ["Farmers took over the best-watered land, which hunting bands depended on", "Correct: farmers' settlement competed for water and land."],
      ["The San were forbidden by treaty to enter the farming districts", "There were no treaties of this kind in this period."],
      ["Farmers needed the drier land for their large herds of horses", "Horses were introduced to the region much later by Europeans."],
      ["The San chose to leave because they disliked iron tools", "The San used iron obtained from farmers; dislike of iron was not the reason."],
    ],
    answer: "A",
    hints: ["Think of what both groups needed in the best areas."],
    explanation: "Farming settlements took over fertile, well-watered land, so hunter-gatherer bands were crowded into more marginal areas, though trade and intermarriage also took place.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Khoi-Khoi were herders who kept sheep and cattle.",
    answer: true,
    explanation: "True. They were pastoralists. The San were hunter-gatherers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In San societies women's gathering usually provided a large share of the food.",
    answer: true,
    explanation: "True. Plant foods gathered by women often supplied more of the diet than hunted meat.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Contact between the San and Bantu-speaking farmers always took the form of war.",
    answer: false,
    hints: ["Think of trade, intermarriage and language."],
    explanation: "False. There was trade, intermarriage and borrowing as well as displacement and clashes.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Band", "A small group of related San families"],
      ["Pastoralist", "A person whose living comes from herding animals"],
      ["Hunter-gatherer", "A person who lives on wild animals and plants"],
      ["Indigenous knowledge", "Knowledge built up by a community over generations about its environment"],
    ],
    explanation: "These are the key terms of the lesson.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each feature with the society it describes.",
    pairs: ["Informal leadership by respected elders", "Clans led by chiefs who owned cattle", "Rock paintings of eland and trance dancers", "Mat-covered houses moved with the herds"],
    right: ["San", "Khoi-Khoi"],
    rightIndex: [0, 1, 0, 1],
    hints: ["Hunter-gatherers or herders?"],
    explanation: "Informal leadership and rock art are San features; clans under chiefs and portable houses with herds are Khoi-Khoi features.",
  });
  {
    const events = [
      "Herding peoples bring sheep to southern Africa",
      "Bantu-speaking farmers settle in the region",
      "Dutch settlement begins at the Cape",
      "Smallpox epidemic devastates Khoi-Khoi communities at the Cape",
    ];
    const order = [1, 0, 3, 2];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these developments in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Herding came before Bantu-speaking farmers arrived.", "The epidemic followed European settlement."],
      explanation: "Herding (about 2,000 years ago), farmers (first millennium CE), the Dutch at the Cape (1652), smallpox (1713).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The {{blank:a}} were hunter-gatherers who lived in {{blank:b}} of related families, while the Khoi-Khoi were {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["San"], choices: ["San", "Khoi-Khoi", "Rozvi", "Ndebele"] },
      { id: "b", accepted: ["bands"], choices: ["regiments", "bands", "empires", "provinces"] },
      { id: "c", accepted: ["herders"], choices: ["miners", "herders", "traders", "sailors"] },
    ],
    explanation: "San bands, and Khoi-Khoi herders (pastoralists).",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to the people whose way of life is based on herding animals? (One word.)",
    accepted: ["pastoralists", "pastoralist", "herders", "herder"],
    wrong: ["farmers"],
    explanation: "**Pastoralists** such as the Khoi-Khoi lived by herding cattle and sheep.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how San society was organised.",
    points: [
      "Small bands of related families (kinship)",
      "No hereditary chiefs: informal leadership by respected elders",
      "Division of labour: men hunted, women gathered plant foods",
      "Sharing of food and resources within the band",
    ],
    modelAnswer: "San people lived in small bands of related families that moved to follow water and food. There were no hereditary chiefs; respected elders guided decisions by discussion. Men hunted and women gathered roots, fruit and insects, and food was shared among the band.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which San indigenous knowledge was useful to their way of life.",
    points: [
      ["Knowledge of plants and healing provided medicines and foods, helping survival in dry country", 2],
      ["Tracking skills and arrow poisons made hunting more successful for small bands", 2],
    ],
    hints: ["Think of medicine and of hunting."],
    modelAnswer: "San people knew which plants could heal wounds or ease hunger and thirst, which helped them survive in dry country. They also knew how to track animals and prepare poison for arrows from plants and beetle larvae, which made hunting by small bands more successful.",
    explanation: "One mark for each type of knowledge and one for explaining its use.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Khoi-Khoi way of life differed from that of the San.",
    points: [
      ["The Khoi-Khoi kept cattle and sheep, while the San lived by hunting and gathering", 2],
      ["The Khoi-Khoi lived in larger groups, in clans under chiefs whose standing rested on cattle, while San bands were small with informal leaders", 2],
    ],
    hints: ["Compare the source of food, and then the size and leadership of the groups."],
    modelAnswer: "The Khoi-Khoi were herders who kept cattle and sheep, whereas the San lived by hunting and gathering wild food. Khoi-Khoi society was organised in larger clans led by chiefs whose power rested on cattle, while San bands were small and had only informal leaders.",
    explanation: "Each difference must be explained with a point about both groups.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far did the arrival of Bantu-speaking farmers bring only displacement for the San?",
    levels: levels(6),
    points: [
      ["Displacement: farmers took over fertile, well-watered land and pushed bands into drier areas such as the Kalahari", 2],
      ["Exchange and mixing: trade in honey, skins and ivory for iron and grain, clientship, intermarriage and borrowing of click sounds", 2],
      ["Judgement: the contact was both exchange and displacement, and the balance varied by place", 2],
    ],
    hints: ["Give the evidence for displacement, then the evidence for cooperation, then decide."],
    modelAnswer: "Displacement was a real result: farmers settled the best-watered land and many San bands were pushed into drier regions such as the Kalahari. However, it was not the only result. In many places San hunters traded honey, skins and ivory for iron and grain, some families became clients of farmers, and intermarriage and the clicks in Zulu and Xhosa show deep contact. The balance varied from place to place, so displacement is only part of the story.",
    explanation: "A strong answer balances displacement and exchange and judges the extent.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an account by a fictional Ndebele elder, recorded in the 1930s, about the hills of his region",
        "When our people came into this country, the hills already had their paintings. We were told that the small people who made them were good hunters. Some of them came to our villages to trade honey and skins for grain, and some of our young men married their daughters."),
      "",
      source("Source B", "a description of a rock painting in a shelter, described in words (a modern guide's note, invented for this question)",
        "The painting shows a large eland, with fine lines, and beside it a row of human figures bending forward with arms stretched back. Some have lines passing from their noses. The figures are painted in red and white on the shelter wall.", { described: true }),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say about relations between the farmers and the hunters?", points: ["They traded honey and skins for grain", "Some intermarried"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How could Source B help a historian to understand San beliefs?", points: [["It shows an eland, an animal of great importance in San belief and art", 2], ["The bending figures with stretched arms resemble trance dancers, showing a link between ritual and the painting; researchers connect such features with trance healing", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable is Source A as evidence for relations between San and Bantu-speaking farmers?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["Strengths: records a tradition of trade and marriage, which fits other evidence such as click sounds in the Nguni languages", 2], ["Weaknesses: recorded centuries after the contact, from the farmers' viewpoint only, and silent about conflict and displacement", 2], ["Judgement: useful for exchange but incomplete, and should be checked against rock art, archaeology and other traditions", 2]], modelAnswer: "Source A is useful because it records a tradition of trade and intermarriage, and this fits other evidence such as the click sounds in Nguni languages. However, it was recorded long after the events by a member of the farming group, so it gives only one side and is silent about conflict or the loss of land. It also lacks dates. Overall it is useful evidence of contact and exchange, but it is incomplete and should be checked against rock art and archaeological evidence." }),
    ],
    hints: ["For (c), think about who is speaking, how long after, and what is left out."],
    explanation: "Source A is an invented oral tradition and Source B a described painting. Strong answers use provenance and own knowledge.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the contribution of San and Khoi-Khoi indigenous knowledge to later societies in southern Africa.",
    levels: levels(8),
    points: [
      ["Medicine and plant knowledge used by later communities and studied today", 2],
      ["Rock art as a heritage and a source of history; language legacy of click sounds in Nguni languages", 2],
      ["Hunting, tracking and environmental knowledge adopted by neighbours, with intermarriage carrying culture into the wider population", 2],
      ["Judgement: the contribution was significant but under-recognised because the Khoisan lost land and numbers", 2],
    ],
    hints: ["Cover medicine, art, language and environmental knowledge, then judge how much it mattered."],
    modelAnswer: "San and Khoi-Khoi knowledge made a real contribution to later societies. Their knowledge of plants for healing and for easing hunger and thirst was passed on to neighbours and is studied by researchers today. Their rock art is a heritage that tells us about belief and daily life, and their languages left click sounds in Zulu and Xhosa. Their skills in tracking and their knowledge of the environment were adopted through trade, clientship and intermarriage. However, the contribution is often under-recognised because the Khoisan lost land and numbers to farmers, and later to European settlers. Overall their contribution was significant, even if it is not always acknowledged.",
    explanation: "Credit specific examples of contribution and a supported judgement.",
  });

  b.card("DEFINITION", "Who were the San?", "Hunter-gatherers who lived in small kin-based bands across southern Africa, without hereditary chiefs, and painted the rock art of the region.");
  b.card("DEFINITION", "Who were the Khoi-Khoi?", "Pastoralists (herders of sheep and cattle) living in clans under chiefs, mainly in the south-west of southern Africa.");
  b.card("DEFINITION", "What is a pastoralist?", "A person whose way of life is based on herding domestic animals and moving them to find grazing and water.");
  b.card("DEFINITION", "What is an indigenous knowledge system?", "Knowledge, skills and beliefs built up by a community over generations about its environment, medicine and survival, and passed on by example and word of mouth.");
  b.card("FACT", "What sounds did Zulu and Xhosa borrow from Khoisan languages?", "Click sounds.");
  b.card("FACT", "When did the smallpox epidemic devastate the Khoi-Khoi at the Cape?", "1713.");
  b.card("CONCEPT", "How were San bands led?", "Informally, by respected elders and skilled people who guided decisions by discussion; there were no hereditary chiefs.");
  b.card("CONCEPT", "Why were many San pushed into drier regions?", "Bantu-speaking farmers took over fertile, well-watered land that hunting bands depended on, although trade and intermarriage also took place.");
  b.card("CONCEPT", "Why is San rock art important to historians?", "It shows animals, people and ritual scenes, so it is evidence of San beliefs and daily life, though it is hard to date and interpret.");
});
