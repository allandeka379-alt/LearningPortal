// W2b: the San and the Khoikhoi (her.precolonial.san-khoi).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.precolonial.san-khoi", { file: "precolonial/san-khoi", keyPrefix: "precolonial.san-khoi" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How did the **San** mainly obtain their food?",
    options: [
      ["By hunting wild animals and gathering wild plants", "Correct: the San were hunter-gatherers."],
      ["By growing sorghum and millet in permanent fields", "Crop farming came with the Iron Age farming communities, not the San."],
      ["By keeping large herds of cattle and fat-tailed sheep", "Herding describes the Khoikhoi, not the San."],
      ["By trading gold and ivory with merchants at the coast", "Long-distance gold trade belongs to later states such as Great Zimbabwe."],
    ],
    answer: "A",
    explanation: "The San lived by hunting and gathering: they did not farm or keep livestock.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which group of people is best described as **herders** of cattle and sheep?",
    options: [
      ["The Khoikhoi", "Correct: the Khoikhoi were pastoralists whose wealth was livestock."],
      ["The San", "The San were hunter-gatherers with no livestock."],
      ["The Mutapa", "The Mutapa state was a Late Iron Age farming and trading state."],
      ["The Portuguese", "The Portuguese were traders who arrived in the sixteenth century."],
    ],
    answer: "A",
    explanation: "The Khoikhoi kept cattle and sheep; the San hunted and gathered.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why were the San **nomadic**?",
    options: [
      ["They followed game and ripening wild plants through the seasons", "Correct: food in one place ran out, so the band moved on."],
      ["Their chiefs ordered them to move every year to collect tribute", "The San had no chiefs and collected no tribute."],
      ["They needed new land each year for their crops", "The San did not grow crops."],
      ["They were driven from place to place by colonial laws", "Colonial laws came many thousands of years later."],
    ],
    answer: "A",
    explanation: "Hunter-gatherers move as animals migrate and plants ripen in different places and seasons.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What was the main **social and political unit** of the San?",
    options: [
      ["The band", "Correct: a small group of related families who lived and moved together."],
      ["The chiefdom", "Chiefdoms belong to later farming societies."],
      ["The regiment", "Regiments (amabutho) belong to the Ndebele state."],
      ["The province", "Provinces were units of later states and of modern Zimbabwe."],
    ],
    answer: "A",
    explanation: "San society was organised in bands of a few dozen related people.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which tool would a San woman **most likely** use while gathering roots?",
    options: [
      ["A digging stick weighted with a bored stone", "Correct: it helped dig up roots and bulbs."],
      ["An iron hoe made by a local smith", "Iron hoes belong to Iron Age farmers."],
      ["A plough pulled by a pair of oxen", "Ox-ploughs came much later, in the colonial period."],
      ["A bow with arrows tipped with plant and insect poison", "The bow was mainly a hunting weapon, usually used by men."],
    ],
    answer: "A",
    explanation: "Digging sticks, sometimes weighted with a bored stone, were the main gathering tool.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which area of Zimbabwe is a large collection of San rock paintings found, now part of a World Heritage Site?",
    options: [
      ["The Matobo Hills", "Correct: the Matobo Hills hold many rock paintings and became a World Heritage Site in 2003."],
      ["The Hwange coalfields", "Hwange is known for coal and a national park, not this rock art collection."],
      ["Lake Kariba", "Lake Kariba is a man-made lake formed after the dam was built."],
      ["The Chimanimani gold belt", "This is not the site known for the main rock art collection."],
    ],
    answer: "A",
    explanation: "The Matobo Hills near Bulawayo contain some of the richest rock art in southern Africa.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Khoikhoi have **greater differences in wealth** than the San?",
    options: [
      ["Livestock could be owned, counted and inherited by families", "Correct: herds were property that some families built up more than others."],
      ["The Khoikhoi were ruled by a king who taxed every household", "There was no king who taxed every Khoikhoi household."],
      ["The Khoikhoi mined gold and sold it at the coast", "Gold mining and coastal trade belong to later states."],
      ["The San did not believe that food should ever be shared", "The opposite is true: sharing food was central to San life."],
    ],
    answer: "A",
    hints: ["Think about what a herder owns that a hunter-gatherer does not."],
    explanation: "Livestock is wealth that can be stored and passed on, so some families became richer and more influential.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A learner says: \"The San contributed nothing to Zimbabwe because they did not build or farm.\" Which response **best** corrects her?",
    options: [
      ["Their rock art and knowledge of plants and hunting are still valued today", "Correct: this names real heritage that remains important."],
      ["They built Great Zimbabwe before moving away to the Kalahari", "Great Zimbabwe was built by the ancestors of the Shona."],
      ["They introduced cattle and iron tools to the whole region", "Iron working and most cattle-keeping came with Iron Age farmers."],
      ["They wrote the first books about the history of the country", "The San left no written records; their art is their record."],
    ],
    answer: "A",
    hints: ["Look for heritage that really came from the San."],
    explanation: "The San heritage includes rock art, knowledge of edible and medicinal plants, tracking and hunting skills, tool making and tanning.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "San bands were led by hereditary chiefs who collected tribute.",
    answer: false,
    explanation: "False. San bands had no chiefs; decisions were made by discussion, and elders and skilled hunters were respected.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Koisan is one of the officially recognised languages listed in section 6 of the Constitution of Zimbabwe.",
    answer: true,
    explanation: "True. Section 6 recognises sixteen languages, including Koisan.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each item with what the San used it for.",
    pairs: [
      ["Ostrich eggshell", "Carrying and storing water"],
      ["Poisoned arrow", "Hunting large animals"],
      ["Digging stick", "Gathering roots and bulbs"],
      ["Tanned skin", "Making clothing and bags"],
    ],
    explanation: "Each tool shows the San's skilful use of natural materials.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The San were {{blank:a}}, while the Khoikhoi were mainly {{blank:b}} of cattle and sheep.",
    blanks: [
      { id: "a", accepted: ["hunter-gatherers"], choices: ["hunter-gatherers", "traders", "miners", "stone builders"] },
      { id: "b", accepted: ["herders"], choices: ["herders", "smiths", "potters", "missionaries"] },
    ],
    explanation: "San: hunter-gatherers. Khoikhoi: herders (pastoralists).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the paintings and engravings the San made on the walls of rock shelters? (two words)",
    accepted: ["rock art", "rock paintings", "rock painting"],
    wrong: ["cave houses", "stone walls"],
    explanation: "**Rock art**: paintings and engravings on rock surfaces, a major part of the San heritage.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** foods that the San obtained by gathering.",
    points: ["One gathered food, e.g. roots or bulbs", "A second, e.g. wild fruits, berries or nuts", "A third, e.g. honey, caterpillars or other insects"],
    modelAnswer: "Roots, wild fruits and honey.",
    explanation: "One mark per gathered food; hunted meat does not count.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which San society encouraged cooperation.",
    points: [
      "Identifies sharing of food from a hunt",
      "Develops: every family ate even when its own hunters failed, which kept the band together",
      "Identifies decision-making by discussion / division of work / marriage links between bands",
      "Develops: e.g. everyone had a say so decisions were accepted; men and women depended on each other's work",
    ],
    modelAnswer: "Meat from a hunt was shared among all members of the band, so no family went hungry and everyone depended on everyone else. Decisions were reached by discussion among adults, guided by elders, so people accepted them and conflict was reduced.",
    hints: ["Think about food, decisions and work."],
    explanation: "Two marks per way: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which a community near a rock art site could protect the paintings.",
    points: [
      "Suggests e.g. reporting damage to National Museums and Monuments of Zimbabwe / local leaders",
      "Explains: the authority can fence, guard or repair the site",
      "Suggests e.g. teaching visitors and learners not to touch, wet or write on the paintings / signs",
      "Explains: damage is often caused by ignorance, and paintings cannot be replaced",
    ],
    modelAnswer: "The community could report any damage to National Museums and Monuments of Zimbabwe, which can fence or guard the site. It could also put up signs and teach learners and visitors not to touch, wet or write on the paintings, because most damage comes from ignorance and the paintings cannot be replaced.",
    hints: ["Who is responsible for monuments, and what causes damage?"],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a description of a rock painting written by a fictional school guide in Matabeleland South, 2026",
      "On the shelter wall, five people carrying bows walk in a line behind a large eland. Lower down, two figures bend over the ground holding long sticks. To one side, a group of people with arms raised appear to be dancing around a seated figure.", { described: true }),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which activity shown in Source A is **gathering**?",
        options: [
          ["Two figures bending over the ground with sticks", "Correct: digging sticks were used to gather roots and bulbs."],
          ["Five people with bows following an eland", "This shows hunting."],
          ["The people with raised arms around a seated figure", "This appears to show a dance or ceremony."],
          ["The painting of the eland itself", "The eland is the animal being hunted."],
        ],
        answer: "A",
        explanation: "Digging sticks were the main gathering tool.",
      }),
      P.tf({
        label: "(b)",
        stem: "Source A proves exactly when the painting was made.",
        answer: false,
        explanation: "False. A painting does not record its own date; archaeologists use other methods and evidence.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** things Source A suggests about the way of life of the San.",
        points: [
          "Hunting with bows was important",
          "Developed: men worked together in groups to hunt large animals such as eland",
          "Dance and ceremony mattered",
          "Developed: dancing around a seated figure may show healing or religious ceremonies that united the band",
        ],
        modelAnswer: "The hunters walking in a line with bows suggest that hunting was done in groups and was an important source of food. The people dancing around a seated figure suggest that dances and ceremonies, possibly for healing, played a part in religious and social life.",
      }),
    ],
    hints: ["Separate what you can see from what you can infer."],
    explanation: "Reading a described rock painting as evidence about San life.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the San and the Khoikhoi.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** differences between the way of life of the San and that of the Khoikhoi.",
        points: [
          "Food: San hunted and gathered",
          "whereas the Khoikhoi lived mainly from cattle and sheep",
          "Wealth / leadership: San shared and had no chiefs",
          "whereas the Khoikhoi had wealth in livestock and clan leaders",
        ],
        modelAnswer: "The San hunted wild animals and gathered plants, whereas the Khoikhoi lived mainly from the milk and meat of their cattle and sheep. The San owned little and shared food, with no chiefs, whereas Khoikhoi families with large herds had more wealth and influence and clans had leaders.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The heritage of the San is of little value to Zimbabweans today.\" Discuss.",
        points: [
          ["For: few people live by hunting and gathering; modern farming, medicine and tools have replaced theirs", 2],
          ["Against: rock art is a record of early life and part of the Matobo Hills World Heritage Site, bringing tourism and research", 2],
          ["Against: knowledge of plants, tracking and living in balance with nature remains useful; Koisan is a recognised language and San communities survive", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some people argue that the San heritage has little value today. Very few Zimbabweans live by hunting and gathering, hunting is controlled by law, and modern tools and medicine have replaced bows, digging sticks and many plant remedies.\n\nHowever, the San left a heritage that is still valuable. Their rock paintings record a way of life that lasted thousands of years and are part of the Matobo Hills World Heritage Site, which attracts tourists and researchers. Their knowledge of edible and medicinal plants, their tracking skills and their practice of taking only what they needed are still respected, especially in conservation. Small San communities still live in western Zimbabwe, and Koisan is an officially recognised language.\n\nOverall, the statement is not convincing: the San way of life has largely gone, but its heritage remains important for identity, tourism, knowledge and conservation.",
      }),
    ],
    hints: ["In (b), give both sides before your judgement."],
    explanation: "Compare (a) and evaluate (b) the San heritage.",
  });

  b.card("DEFINITION", "Hunter-gatherers", "People who live by hunting wild animals and gathering wild plants, rather than farming or herding (e.g. the San).");
  b.card("DEFINITION", "Herders (pastoralists)", "People whose way of life depends mainly on keeping livestock such as cattle and sheep (e.g. the Khoikhoi).");
  b.card("DEFINITION", "Band", "A small group of related families who live and move together; the main unit of San society.");
  b.card("DEFINITION", "Nomadic", "Moving from place to place with the seasons, following food, water or grazing.");
  b.card("FACT", "Where is the richest collection of rock art in Zimbabwe?", "The Matobo Hills (Matabeleland South), a World Heritage Site since 2003.");
  b.card("FACT", "Name three San tools.", "Bow and poisoned arrows; digging stick (sometimes weighted with a bored stone); ostrich eggshell water containers.");
  b.card("CONCEPT", "Why did the San have no chiefs?", "Bands were small, owned little property and moved often, so decisions were made by discussion, guided by elders.");
  b.card("CONCEPT", "Why was sharing food important to the San?", "A hunt did not succeed every day; sharing meant every family ate and kept the band united.");
  b.card("FACT", "Name four parts of the San heritage.", "Rock art; knowledge of plants and medicines; hunting and tool-making skills; tanning skins.");
});
