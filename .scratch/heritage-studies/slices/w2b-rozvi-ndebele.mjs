// W2b: the Torwa, Rozvi and Ndebele states (her.precolonial.rozvi-ndebele).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.precolonial.rozvi-ndebele", { file: "precolonial/rozvi-ndebele", keyPrefix: "precolonial.rozvi-ndebele" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which site was the capital of the **Torwa** state?",
    options: [
      ["Khami", "Correct: Khami, near Bulawayo, was the Torwa capital."],
      ["Great Zimbabwe", "Great Zimbabwe was the earlier state near Masvingo."],
      ["Fort Salisbury", "Fort Salisbury was founded by the Pioneer Column in 1890."],
      ["Inyati", "Inyati was the site of the first mission station (1859)."],
    ],
    answer: "A",
    explanation: "Khami is famous for decorated stone platforms and is a World Heritage Site.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who founded the **Rozvi** state?",
    options: [
      ["Changamire Dombo", "Correct: Dombo founded the Rozvi state in the late 1600s."],
      ["Nyatsimba Mutota", "Mutota founded the Mutapa state, according to tradition."],
      ["Mzilikazi", "Mzilikazi founded the Ndebele state."],
      ["Lobengula", "Lobengula was the second Ndebele king."],
    ],
    answer: "A",
    explanation: "Changamire Dombo founded the Rozvi state and drove the Portuguese from the plateau.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which period did Mzilikazi and his followers settle in south-western Zimbabwe?",
    options: [
      ["The late 1830s", "Correct: they crossed the Limpopo and settled in the late 1830s."],
      ["The early 1690s", "The 1690s saw the rise of the Rozvi under Changamire Dombo."],
      ["1890", "1890 was the year the Pioneer Column arrived."],
      ["The 1450s", "This was about the time Great Zimbabwe declined."],
    ],
    answer: "A",
    explanation: "Mzilikazi's followers settled in the late 1830s; Lobengula became king in 1870.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What were **amabutho** in the Ndebele state?",
    options: [
      ["Age-based regiments living in military towns", "Correct: regiments served the king under izinduna."],
      ["Spirit mediums who spoke for royal ancestors", "Spirit mediums are not amabutho."],
      ["Stone platforms on which royal houses stood", "Stone platforms are a feature of Khami."],
      ["Traders who bought ivory from the king", "Traders were mostly European visitors."],
    ],
    answer: "A",
    explanation: "Amabutho were regiments under izinduna, living in military towns.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the purpose of the annual **Inxwala** ceremony?",
    options: [
      ["To unite the nation around the king at the first fruits", "Correct: Inxwala honoured the king and united the nation."],
      ["To choose a new king by a public vote of all the regiments", "Kings were not chosen by vote at Inxwala."],
      ["To welcome missionaries to the royal town", "Inxwala was an Ndebele national ceremony, not a welcome."],
      ["To mark the end of the Rozvi state", "Inxwala had nothing to do with the Rozvi."],
    ],
    answer: "A",
    explanation: "Inxwala brought the regiments and people together, honoured the king and celebrated the first fruits.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which factor **best** explains how people of different origins became one Ndebele nation?",
    options: [
      ["They served together in regiments, intermarried and shared one language", "Correct: regiments, marriage and language united Zansi, Enhla and Hole."],
      ["The king forbade anyone except the Zansi to own cattle or to marry", "This is not accurate and would not unite people."],
      ["Missionaries taught everyone the same religion", "Missionaries had little success in converting people at the time."],
      ["They all came from the same village in Zululand", "Many joined on the journey or in Zimbabwe."],
    ],
    answer: "A",
    hints: ["Think about what people of different origins did together."],
    explanation: "Shared service, marriage and language gradually removed the old divisions.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which was a cause of the **decline of the Rozvi state**?",
    options: [
      ["Attacks by Nguni groups moving north in the 1830s", "Correct: Nguni migrants of the Mfecane attacked the weakened state."],
      ["The Rudd Concession signed in 1888", "The Rozvi state had declined decades earlier."],
      ["Defeat by the Pioneer Column in 1890", "The Pioneer Column came long after."],
      ["The arrival of the first Portuguese traders around 1500", "The Rozvi rose later, in the late 1600s."],
    ],
    answer: "A",
    hints: ["Check the dates against the Rozvi period."],
    explanation: "Succession disputes, refusal of tribute and Nguni attacks in the 1830s brought down the Rozvi state.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** compares the Rozvi and Ndebele states?",
    options: [
      ["Both relied on tribute and a strong army under a powerful ruler", "Correct: both combined royal power, armies and tribute."],
      ["Both were founded by migrants from Zululand in the 1820s", "Only the Ndebele state was founded by migrants from the south."],
      ["Both had their capitals at Great Zimbabwe", "Neither had its capital at Great Zimbabwe."],
      ["Both were destroyed in the Anglo-Ndebele War", "The Rozvi state had declined by the 1830s."],
    ],
    answer: "A",
    hints: ["Find a feature true of both states."],
    explanation: "Both states depended on a strong ruler, an army and tribute from subject communities.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lobengula became king of the Ndebele in 1870.",
    answer: true,
    explanation: "True. Mzilikazi died in 1868 and, after a succession dispute, Lobengula became king in 1870.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Changamire Dombo drove the Portuguese from their trading posts on the plateau in the 1690s.",
    answer: true,
    explanation: "True. His victories ended Portuguese influence on the plateau for a long period.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each group in Ndebele society with its description.",
    pairs: [
      ["Zansi", "Those who came with Mzilikazi from the south"],
      ["Enhla", "Those who joined during the journey north"],
      ["Hole", "Those incorporated in Zimbabwe"],
    ],
    explanation: "Over time these groups intermarried and became one nation.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Leaders appointed by the Ndebele king to command regiments and districts were called {{blank:a}}. The Rozvi consulted the {{blank:b}} shrines in the Matobo Hills.",
    blanks: [
      { id: "a", accepted: ["izinduna"], choices: ["izinduna", "masvikiro", "amabutho", "madzishe"] },
      { id: "b", accepted: ["Mwari"], choices: ["Mwari", "Inxwala", "Mhondoro", "Zunde"] },
    ],
    explanation: "Izinduna led regiments and districts; the Mwari shrines gave religious support.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the period of wars and migrations in south-eastern Africa in the early nineteenth century?",
    accepted: ["Mfecane", "the Mfecane", "Difaqane", "the Difaqane"],
    wrong: ["Chimurenga"],
    explanation: "The **Mfecane** (Difaqane in Sotho) led to the migration of Mzilikazi's followers.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** economic activities of the Ndebele state.",
    points: ["One, e.g. cattle keeping", "A second, e.g. crop farming", "A third, e.g. raiding and tribute / hunting / trade in ivory / crafts"],
    modelAnswer: "Cattle keeping, crop farming and trade in ivory.",
    explanation: "One mark per activity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the political organisation of the Ndebele state.",
    points: ["The king was head of state, army and religion", "Izinduna appointed to lead regiments and districts, advising the king", "Regiments (amabutho) lived in military towns and supervised surrounding areas", "Inxwala ceremony united the nation around the king"],
    modelAnswer: "The king was head of the state, the army and religious ceremonies. He appointed izinduna to command regiments and districts, and they advised him in council. The regiments lived in military towns and supervised the surrounding areas. The annual Inxwala ceremony united the nation around the king.",
    hints: ["King, izinduna, regiments, ceremony."],
    explanation: "One mark per described feature.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the Rozvi state declined.",
    points: [
      "Succession disputes",
      "Developed: rival members of the ruling family weakened central control",
      "Nguni attacks / refusal of tribute",
      "Developed: Nguni migrants attacked in the 1830s; subject chiefs stopped paying, so the army and Mambo lost resources",
    ],
    modelAnswer: "Disputes over succession divided the ruling family, so central control weakened. When the state was weak, subject chiefs stopped paying tribute, and in the 1830s Nguni groups moving north attacked the state, which never recovered.",
    hints: ["Internal and external causes."],
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the table comparing two states (summary written for this question).\n\n" +
      table(["Feature", "Rozvi state", "Ndebele state"], [
        ["Founder", "Changamire Dombo", "Mzilikazi"],
        ["Period", "Late seventeenth century to the 1830s", "Late 1830s to 1893"],
        ["Ruler's title", "Mambo", "Inkosi (king)"],
        ["Military", "Strong army", "Regiments (amabutho) in military towns"],
        ["Religion", "Mwari shrines in the Matobo Hills", "Inxwala ceremony led by the king"],
      ]),
    parts: [
      P.tf({
        label: "(a)",
        stem: "According to the table, the Rozvi state had declined before the Ndebele state was founded in Zimbabwe.",
        answer: true,
        explanation: "True. The Rozvi period ends in the 1830s; the Ndebele settled in the late 1830s.",
      }),
      P.mcq({
        label: "(b)", stem: "Which feature in the table is **common** to both states?",
        options: [
          ["An organised military force", "Correct: both had strong armies."],
          ["The same founder", "The founders were different."],
          ["The same ruler's title", "Mambo and inkosi are different titles."],
          ["The same religious ceremony", "The religious practices listed differ."],
        ],
        answer: "A",
        explanation: "Both states depended on military strength.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **three** ways in which a strong army helped these states.",
        points: [
          "Defence",
          "Developed: protected the state from enemies (e.g. the Rozvi drove out the Portuguese)",
          "Collection of tribute",
          "Developed: made subject communities pay cattle and grain, bringing wealth",
          "Unity / control",
          "Developed: regiments in military towns supervised districts and united people of different origins",
        ],
        modelAnswer: "The army defended the state; the Rozvi army, for example, drove the Portuguese from the plateau. It made subject communities pay tribute in cattle and grain, which brought wealth to the ruler. In the Ndebele state, regiments in military towns supervised the districts and brought young men of different origins together, building unity.",
      }),
    ],
    hints: ["Defence, wealth and control."],
    explanation: "Comparing the Rozvi and Ndebele states using a table.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the Ndebele state.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** features of the social organisation of the Ndebele state.",
        points: [
          "Three groups: Zansi, Enhla and Hole",
          "according to when and where people joined the state",
          "Integration through regiments, marriage and language",
          "so that over time they became one nation",
        ],
        modelAnswer: "Society was made up of the Zansi, Enhla and Hole, according to when and where people joined the state. Over time, service in the same regiments, intermarriage and the shared Ndebele language made them one nation.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The army was the most important institution in the Ndebele state.\" How far do you agree?",
        points: [
          ["For: regiments defended the state, collected tribute and supervised districts", 2],
          ["Against: the king held political, religious and economic power; Inxwala united the nation", 2],
          ["Against: cattle were the basis of wealth; izinduna in council; social integration", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The army was very important. The regiments defended the state, collected tribute from neighbouring communities and supervised the districts from their military towns. They also brought young men of different origins together.\n\nHowever, the army served the king, who was the centre of the state. He controlled land and cattle, appointed izinduna and led the Inxwala ceremony, which united the nation. Cattle were the basis of wealth and were lent to subjects, binding them to the king. Izinduna advised the king in council.\n\nOverall, the army was one of the most important institutions, but the kingship was more important, because the army, cattle and ceremonies all depended on the king. I therefore agree only to a limited extent.",
      }),
    ],
    hints: ["Compare the army with the kingship and cattle."],
    explanation: "Describe (a) and evaluate (b) the institutions of the Ndebele state.",
  });

  b.card("FACT", "Capital of the Torwa state?", "Khami, near Bulawayo (World Heritage Site, 1986).");
  b.card("FACT", "Founder of the Rozvi state?", "Changamire Dombo (late 1600s); Rozvi rulers were called Mambo.");
  b.card("FACT", "When did the Ndebele settle in Zimbabwe?", "In the late 1830s, under Mzilikazi.");
  b.card("FACT", "When did Lobengula become king?", "1870.");
  b.card("DEFINITION", "Amabutho", "Ndebele age-based regiments living in military towns under izinduna.");
  b.card("DEFINITION", "Inxwala", "The great annual Ndebele ceremony at the first fruits that united the nation around the king.");
  b.card("DEFINITION", "Mfecane", "Wars and migrations in south-eastern Africa in the early 1800s.");
  b.card("CONCEPT", "Zansi, Enhla and Hole?", "Groups in Ndebele society by origin: from the south; joined on the journey; incorporated in Zimbabwe.");
  b.card("CONCEPT", "Why did the Rozvi state decline?", "Succession disputes, refusal of tribute and Nguni attacks in the 1830s.");
});
