// W1a: ahist.precolonial.mutapa (ZIMSEC topic 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.mutapa", { file: "precolonial/mutapa", keyPrefix: "precolonial.mutapa" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "According to tradition, which two leaders founded and expanded the Mutapa state?",
    options: [
      ["Mutota and his son Matope, his heir", "Correct: Mutota moved north and Matope expanded the state."],
      ["Mzilikazi and his son Lobengula", "These were rulers of the Ndebele state in the nineteenth century."],
      ["Soshangane and his son Mzila", "These were rulers of the Gaza state in the nineteenth century."],
      ["Shaka and his half-brother Dingane", "These were rulers of the Zulu state in the nineteenth century."],
    ],
    answer: "A",
    explanation: "Tradition names Mutota and Matope as the founders of the Mutapa state in the fifteenth century.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which region was the heartland of the Mutapa state?",
    options: [
      ["The Zambezi valley in the north", "Correct: the state grew in the Dande region and the Zambezi valley."],
      ["The Matopo Hills in the south-west", "The Matopo Hills lay in the region of the Torwa and later the Ndebele."],
      ["The Limpopo valley in the far south", "The Limpopo valley was the home of Mapungubwe."],
      ["The eastern highlands near Mutare", "The eastern highlands were not the Mutapa heartland."],
    ],
    answer: "A",
    explanation: "The Mutapa state arose in the north, in the Dande region and the Zambezi valley, spreading over parts of northern Zimbabwe and Mozambique.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the role of spirit mediums in the Mutapa state?",
    options: [
      ["They spoke for the royal ancestors and made kings legitimate", "Correct: mediums linked the ruler with the ancestors."],
      ["They commanded the royal army in the field during wars", "The army was led by military commanders and the king."],
      ["They collected the gold taxes from the foreign merchants", "Officials collected taxes."],
      ["They negotiated all the treaties with the Portuguese captains", "Treaties were made by the Mwene Mutapa and his advisers."],
    ],
    answer: "A",
    explanation: "Spirit mediums spoke for the ancestors, supported the legitimacy of rulers and influenced succession.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was the Jesuit missionary Gonçalo da Silveira killed at the Mutapa's court in 1561?",
    options: [
      ["Muslim merchants persuaded the king he was a threat", "Correct: they feared Portuguese influence over trade."],
      ["He tried to seize the gold mines with an army of Portuguese soldiers", "He came as a missionary without an army."],
      ["He refused to baptise the king and his own family", "He had baptised the king."],
      ["He was killed in the course of a civil war between Mutapa rivals", "His death is linked to the court's fears of Portuguese power."],
    ],
    answer: "A",
    hints: ["Which group at court had most to lose from Portuguese influence on trade?"],
    explanation: "Muslim merchants, who held the trade, and court advisers feared Portuguese influence. His death gave the Portuguese a reason to intervene.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened to the Portuguese expedition led by Francisco Barreto in the sixteenth century?",
    options: [
      ["It failed, ruined by disease and bad conditions", "Correct: the expedition did not reach the mines in strength."],
      ["It captured the Mutapa capital and so ended the state", "The Mutapa state survived."],
      ["It founded a Portuguese colony on the whole plateau", "No such colony was founded."],
      ["It defeated the Rozvi at a great battle at Khami", "The Rozvi rose later, in the late seventeenth century."],
    ],
    answer: "A",
    hints: ["Think of what the Zambezi valley was like for foreign soldiers."],
    explanation: "Barreto's expedition aimed at the gold mines but failed, partly through disease, and the Portuguese then relied on treaties and influence.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the Portuguese were able to increase their influence over the Mutapa in the seventeenth century?",
    options: [
      ["Rivals and rebel provinces sought their help against the Mutapa", "Correct: internal divisions gave the Portuguese their opportunity."],
      ["The Mutapa state had been conquered by a Portuguese army", "The Portuguese never conquered the Mutapa state in this way."],
      ["The Mutapa gave up all rule of his lands to Portugal willingly", "The Mutapa rulers did not give up all rule; treaties gave limited rights."],
      ["The Rozvi invited the Portuguese to take over the plateau", "The Rozvi drove the Portuguese from the plateau."],
    ],
    answer: "A",
    hints: ["Think about what internal divisions allow outsiders to do."],
    explanation: "Succession disputes and revolts allowed the Portuguese to support one side and gain concessions, so internal weakness was the key condition.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the best evidence that the Portuguese never fully controlled the Mutapa state?",
    options: [
      ["Changamire Dombo's army drove them from the plateau", "Correct: they were expelled by an African army."],
      ["They built a fort at Sofala in 1505", "A fort at the coast does not show control of the interior."],
      ["Their missionaries baptised the Mutapa king in the year 1561", "Baptism does not show political control, and the missionary was killed."],
      ["Their treaties gave them some mining rights in the year 1607", "Treaties show influence, but the Portuguese claimed more than they held."],
    ],
    answer: "A",
    hints: ["Which event shows an African force removing the Portuguese?"],
    explanation: "Portuguese influence was strong in the valley, but they were expelled from the plateau by the Rozvi in the late seventeenth century.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Mutapa state was ruled from the south-west, in the region of Bulawayo.",
    answer: false,
    explanation: "False. The Mutapa heartland was in the north, in the Zambezi valley.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Mutapa rulers received tribute from conquered chiefs and taxed foreign merchants.",
    answer: true,
    explanation: "True. Tribute and taxes on trade were important sources of the state's wealth.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "The Portuguese conquered the whole Mutapa state during the sixteenth century.",
    answer: false,
    hints: ["Think of Barreto's failure and the Rozvi expulsion."],
    explanation: "False. They gained influence through treaties, but their expedition failed in 1569-72 and they were expelled from the plateau in the late seventeenth century.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Mwene Mutapa", "The title of the ruler of the Mutapa state"],
      ["Prazo", "A large estate in the Zambezi valley leased by the Portuguese Crown"],
      ["Feira", "A trading fair where gold and ivory were exchanged for cloth and beads"],
      ["Tribute", "Goods or service owed to the ruler by conquered chiefs"],
    ],
    explanation: "These terms are needed for answers on the Mutapa economy and the Portuguese presence.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each name with the event or role linked to the Mutapa state.",
    pairs: [
      ["Mutota", "Led his followers north from Great Zimbabwe, according to tradition"],
      ["Matope", "Expanded the state after Mutota"],
      ["Gatsi Rusere", "Made a treaty with the Portuguese in 1607"],
      ["Changamire Dombo", "Led the Rozvi army that drove the Portuguese from the plateau"],
    ],
    hints: ["Two are founders, two belong to the seventeenth century."],
    explanation: "Mutota and Matope belong to the founding period; Gatsi Rusere and Changamire Dombo to the seventeenth century.",
  });
  {
    const events = [
      "Mutota leads his people north from Great Zimbabwe",
      "The Portuguese take Sofala",
      "Silveira is killed at the Mutapa's court",
      "Mavura Mhande accepts vassal status after Portuguese support",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Dates run from about 1430 to 1629."],
      explanation: "About 1430-1450, 1505, 1561, 1629.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Mutapa state grew in the {{blank:a}} valley, and the Portuguese called its ruler's state {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Zambezi"], choices: ["Zambezi", "Limpopo", "Orange", "Save"] },
      { id: "b", accepted: ["Monomotapa"], choices: ["Monomotapa", "Mapungubwe", "Matabeleland", "Mozambique"] },
    ],
    explanation: "The Zambezi valley was the heartland; Portuguese writers wrote Monomotapa.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which Rozvi ruler drove the Portuguese from the plateau in the late seventeenth century?",
    accepted: ["Changamire Dombo", "Dombo", "Changamire"],
    wrong: ["Gatsi Rusere"],
    explanation: "**Changamire Dombo**, the founder of the Rozvi state.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the economic organisation of the Mutapa state.",
    points: ["Farming and cattle-keeping were the basis of life", "Tribute in grain, cattle, cloth, ivory and gold was paid to the ruler", "Gold was mined and panned and traded with the coast", "The ruler taxed foreign merchants who traded at his fairs"],
    modelAnswer: "Most people farmed and kept cattle. Chiefs and subject peoples paid tribute in grain, cattle, cloth, ivory and gold to the Mwene Mutapa. Gold was mined and panned and sold to the coast, and the ruler taxed the foreign merchants who traded at his fairs.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Mutapa rulers used religion to support their power.",
    points: [["They were regarded as sacred and linked to the royal ancestors", 2], ["Spirit mediums spoke for the ancestors and helped to legitimise a new ruler, giving him authority over conquered peoples", 2]],
    hints: ["Think about the ancestors and the mediums."],
    modelAnswer: "The Mwene Mutapa was regarded as sacred and linked to the royal ancestors, which made his rule seem to have the support of the spirits. Spirit mediums spoke for the ancestors and helped to legitimise a new ruler, so even conquered peoples respected his authority.",
    explanation: "One mark for each idea and one for the explanation.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how disputes over succession weakened the Mutapa state.",
    points: [["There was no fixed rule, so several royal houses claimed the throne and fought civil wars", 2], ["Rivals sought help from the Portuguese or rebel provinces, which gave outsiders influence and encouraged break-away", 2]],
    hints: ["What did rival claimants do to win?"],
    modelAnswer: "With no fixed rule of succession, several royal houses claimed the throne and fought civil wars. Rival claimants sought help from the Portuguese or from rebel provinces, which gave outsiders influence and encouraged provinces to break away.",
    explanation: "One mark for each point and one for the explanation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was Portuguese interference the main reason for the decline of the Mutapa state?",
    levels: levels(6),
    points: [["Portuguese took sides in succession disputes, made treaties giving them mining rights and vassal status, and set up prazos", 2], ["But internal weakness (succession disputes, rebellions of provinces, the rise of the Rozvi) came first and created the opportunity; the Portuguese were few and were driven from the plateau", 2], ["Judgement", 2]],
    hints: ["Give the case for Portuguese interference, then the internal causes."],
    modelAnswer: "Portuguese interference was important: they took sides in succession disputes, made treaties giving them mining rights, and in 1629 helped place a ruler who accepted vassal status. However, the Portuguese were few, and their chance came from the state's own weakness: disputed successions, rebellion of provinces and the rise of the Rozvi under Changamire Dombo, who drove them from the plateau. I conclude that internal weakness was the main reason, and Portuguese interference made it worse.",
    explanation: "Credit both sets of causes with examples and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Portuguese captain to his superior, written in the early seventeenth century",
        "The king receives us well, but he keeps strict control of the trade. No man may buy gold except at the fair he appoints, and his officers take a share of all the cloth and beads we bring. His lords obey him, though some of them are in revolt."),
      "",
      source("Source B", "a tradition told by a fictional spirit medium in the twentieth century",
        "The first king came from the south with his people. The ancestors told him to go north. He defeated the people of the river valley, and they paid him tribute. When a king died, the medium chose among the princes the one the ancestors wanted."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about how the ruler controlled trade?", points: ["He appointed the fairs where gold could be bought", "His officers took a share of the cloth and beads"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare what the two sources show about the basis of the ruler's power.", points: [["A shows power based on control of trade and loyalty of lords (with some revolt)", 2], ["B shows power based on conquest, tribute and the approval of the ancestors through the medium", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are Sources A and B together as evidence of how the Mutapa state was organised?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is contemporary and detailed about trade but is the view of a foreigner who saw only the court and fairs", 2], ["B gives the African view of religion and succession but was told long afterwards and may be shaped by the medium's role", 2], ["Together they cover trade, tribute and religion and agree on a strong ruler; own knowledge (fairs, tribute, mediums) supports both", 2]], modelAnswer: "Together the sources are useful because they cover different parts of the state. Source A, from a Portuguese captain at the time, gives detailed evidence of how the ruler controlled trade at fairs and shared in the goods, and notes that some lords were in revolt. But it is the view of a foreigner who saw only the court and the fairs. Source B gives an African view of the founding by conquest, the payment of tribute and the role of the medium in choosing the ruler, but it was told long afterwards by a medium who may wish to stress his own role. Both show a strong ruler, and my own knowledge of fairs, tribute and the role of mediums supports each. Used together they give a fuller picture than either alone." }),
    ],
    hints: ["For (c), consider who wrote each source, when, and what each leaves out."],
    explanation: "Both sources are invented: one is a Portuguese report and one an oral tradition.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the importance of trade and tribute in the rise of the Mutapa state.",
    levels: levels(8),
    points: [
      ["Tribute: from conquered peoples in cattle, grain, gold and ivory supported the court and army", 2],
      ["Trade: gold and ivory to the coast brought imported goods that rewarded followers; the ruler taxed merchants at fairs", 2],
      ["Other factors: military conquest by Mutota and Matope, religion, fertile valley, weakness of Great Zimbabwe", 2],
      ["Judgement on the relative importance", 2],
    ],
    hints: ["Explain tribute and trade, then add conquest and religion before judging."],
    modelAnswer: "Trade and tribute were both important. Tribute from conquered peoples, paid in cattle, grain, gold and ivory, supported the court and the army, and the gold and ivory trade to the coast brought imported goods which the ruler gave to followers, while he taxed merchants at the fairs. However, the state was created by the conquests of Mutota and Matope, and religion, with the support of spirit mediums, gave the rulers legitimacy. The decline of Great Zimbabwe also opened the way for a new centre. I conclude that tribute and trade were the means by which the state was sustained, but conquest was the force that created it.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What does Mwene Mutapa mean?", "The title of the ruler of the Mutapa state, usually explained as \"lord of the conquered lands\".");
  b.card("DEFINITION", "What was a prazo?", "A large estate in the Zambezi valley leased by the Portuguese Crown to settlers (prazeros), who ruled over African inhabitants.");
  b.card("FACT", "Who were the traditional founders of the Mutapa state?", "Mutota and his son Matope, in the fifteenth century.");
  b.card("FACT", "When did the Portuguese take Sofala?", "1505.");
  b.card("FACT", "What happened to Gonçalo da Silveira in 1561?", "The Jesuit missionary, who had baptised the Mutapa, was killed at his court.");
  b.card("FACT", "Which Mutapa ruler made a treaty with the Portuguese in 1607?", "Gatsi Rusere.");
  b.card("CONCEPT", "Why did the Mutapa state expand?", "Conquest by Mutota and Matope, tribute, the gold and ivory trade, religious authority and a fertile Zambezi valley base.");
  b.card("CONCEPT", "Give four reasons for the decline of the Mutapa state.", "Succession disputes and civil war, Portuguese interference, the break-away of provinces, and the rise of the Rozvi.");
  b.card("CONCEPT", "How did spirit mediums support Mutapa rulers?", "They spoke for the royal ancestors, helped to legitimise a ruler and could influence who succeeded.");
});
