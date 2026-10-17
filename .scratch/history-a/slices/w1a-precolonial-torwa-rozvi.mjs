// W1a: ahist.precolonial.torwa-rozvi (ZIMSEC topic 2).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.torwa-rozvi", { file: "precolonial/torwa-rozvi", keyPrefix: "precolonial.torwa-rozvi" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which stone site near Bulawayo was the capital of the Torwa state?",
    options: [
      ["Khami, with terraces", "Correct: Khami is a World Heritage Site near Bulawayo."],
      ["Mapungubwe, on the Limpopo", "Mapungubwe lies in the Limpopo valley and is older."],
      ["Great Zimbabwe, Masvingo", "Great Zimbabwe lies near Masvingo."],
      ["Dambarare, a trading fair", "Dambarare was a trading fair in the north-east."],
    ],
    answer: "A",
    explanation: "Khami, occupied mainly between about 1450 and 1650, was the Torwa capital.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who founded the Rozvi state in the late seventeenth century?",
    options: [
      ["Changamire Dombo", "Correct: he overthrew the Torwa and defeated the Mutapa and Portuguese."],
      ["Matope, son of Mutota", "Matope expanded the Mutapa state in the fifteenth century."],
      ["Soshangane of the Gaza", "Soshangane founded the Gaza state in the 1820s."],
      ["Lobengula the Ndebele king", "Lobengula ruled the Ndebele in the late nineteenth century."],
    ],
    answer: "A",
    explanation: "Changamire Dombo founded the Rozvi state. The others belong to other states and periods.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the religious role of the Mwari cult in the Rozvi state?",
    options: [
      ["Its priests spoke for the high god on rain", "Correct: Mwari shrines were consulted in the Matobo Hills."],
      ["Its priests commanded the regiments in war", "Priests did not command the army."],
      ["Its priests collected the tribute for the Mambo", "Tribute was collected by governors and officials."],
      ["Its priests were chosen by the Portuguese", "The Portuguese had no part in choosing them."],
    ],
    answer: "A",
    explanation: "The Mwari cult, centred on shrines in the Matobo Hills, was consulted for rain, the harvest and guidance, and it linked many peoples to the Rozvi ruler.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What was the effect of the Rozvi victory over the Portuguese in the late seventeenth century?",
    options: [
      ["It ended Portuguese hopes of controlling the plateau", "Correct: the Portuguese retreated to the Zambezi valley and the coast."],
      ["It brought about the immediate collapse of the Rozvi state", "The Rozvi state lasted until the 1830s."],
      ["It allowed the Mutapa state to regain all its power", "The Mutapa state was also weakened."],
      ["It led to a Portuguese colony in the south of the plateau", "No such colony was set up in the interior."],
    ],
    answer: "A",
    hints: ["Who held the plateau after the Portuguese were driven out?"],
    explanation: "The Portuguese were pushed back to the valley and coast, and the Rozvi dominated the plateau for about 150 years.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which groups attacked the Rozvi state in the 1830s?",
    options: [
      ["Nguni groups under Zwangendaba and Nxaba, then the Ndebele", "Correct: refugees from the Mfecane crossed the Limpopo."],
      ["Portuguese soldiers and prazo armies from the Zambezi", "The Portuguese had been driven off the plateau."],
      ["Arab and Swahili merchants from the Indian Ocean", "Merchants traded; they did not invade the plateau."],
      ["British South Africa Company police under Jameson", "The Company arrived in 1890."],
    ],
    answer: "A",
    hints: ["Think of the Mfecane in the 1820s and 1830s."],
    explanation: "Nguni groups fleeing the Zulu wars, followed by Mzilikazi's Ndebele, attacked and replaced Rozvi power.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which feature of Rozvi history best shows internal weakness before the Nguni invasions?",
    options: [
      ["Succession disputes and independent provincial governors", "Correct: the Mambo could not call on the whole state."],
      ["The loss of the gold trade to the Portuguese merchants", "The Portuguese had been driven off the plateau."],
      ["The destruction of Khami by the British South Africa Company", "Khami's decline was long before 1890."],
      ["A treaty making the Mambo a vassal of the Portuguese Crown", "Such a treaty was signed by some Mutapa rulers, not by the Rozvi."],
    ],
    answer: "A",
    hints: ["Consider how a state is weakened without outside attack."],
    explanation: "Internal weakness, such as disputed succession and provinces becoming independent, left the Rozvi open to invasion.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement best describes how historians treat the date of the fall of the Torwa to the Rozvi?",
    options: [
      ["Late seventeenth century, though exact dates are debated", "Correct: sources are limited and historians differ on details."],
      ["It is fixed to a single day by Portuguese documents", "No such exact date is established."],
      ["It is placed in the 1830s with the Ndebele conquest", "The 1830s belong to the Nguni invasions."],
      ["It is placed before the building of Great Zimbabwe", "Great Zimbabwe was earlier than the Torwa and Rozvi."],
    ],
    answer: "A",
    hints: ["What kinds of source survive for this period?"],
    explanation: "The evidence is from oral tradition and Portuguese records, so historians give approximate dates and disagree on some events.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Khami was the capital of the Torwa state.",
    answer: true,
    explanation: "True. Khami, near Bulawayo, was occupied mainly from about 1450 to 1650.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Rozvi ruler was known by the title Mambo.",
    answer: true,
    explanation: "True. Mambo is the Shona title of a king, and Changamire was the title of the founder and his successors.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Rozvi state was founded by the Ndebele after they crossed the Limpopo.",
    answer: false,
    hints: ["Which came first?"],
    explanation: "False. The Rozvi state was founded in the late seventeenth century by Changamire Dombo, while the Ndebele arrived in the 1830s and replaced Rozvi power.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Mambo", "The title of a Rozvi king"],
      ["Danangombe", "A Rozvi stone-walled capital also known as Dhlo-Dhlo"],
      ["Mwari cult", "Worship of the high god through shrines in the Matobo Hills"],
      ["Butua", "The Portuguese name for the Torwa country in the south-west"],
    ],
    explanation: "These are the key terms for the Torwa and Rozvi states.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each state with its capital or main stone site and its period.",
    pairs: [
      ["Great Zimbabwe", "Near Masvingo, mainly thirteenth to fifteenth centuries"],
      ["Torwa", "Khami near Bulawayo, mainly fifteenth to seventeenth centuries"],
      ["Rozvi", "Danangombe and Naletale, from the late seventeenth century"],
      ["Mutapa", "Zambezi valley in the north, from the fifteenth century"],
    ],
    hints: ["Think of the geography first, then the dates."],
    explanation: "Each state had its own centre and period.",
  });
  {
    const events = [
      "Khami becomes the Torwa capital",
      "Changamire Dombo overthrows the Torwa and builds the Rozvi state",
      "Nguni groups of Zwangendaba and Nxaba cross the Limpopo",
      "Mzilikazi's Ndebele settle in the south-west",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Khami was a fifteenth-century capital."],
      explanation: "About 1450, the 1680s, the 1830s and about 1838-40.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Rozvi state was founded by Changamire {{blank:a}}, and its king was called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Dombo"], choices: ["Dombo", "Matope", "Mutota", "Chirisamhuru"] },
      { id: "b", accepted: ["Mambo"], choices: ["Mambo", "Inkosi", "Kabaka", "Pharaoh"] },
    ],
    explanation: "Changamire Dombo founded the Rozvi state; the king was the Mambo.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the stone capital near Bulawayo, now a World Heritage Site, that was the Torwa capital.",
    accepted: ["Khami", "Khami ruins"],
    wrong: ["Naletale"],
    explanation: "**Khami**, with its decorated terraced walls.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the political organisation of the Rozvi state.",
    points: ["The Mambo was the sacred head of the state", "Governors, often relatives, ruled the provinces", "Tribute was sent to the capital", "A strong army defended the state and forced tribute from conquered peoples"],
    modelAnswer: "The Mambo was the sacred head of the state and was believed to link the people with the ancestors. Governors, often his relatives, ruled the provinces and sent tribute to the capital. A strong army defended the state and made conquered peoples pay tribute.",
    explanation: "One mark for each feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Mwari cult helped the Rozvi rulers.",
    points: [["Priests spoke for the high god on rain and the harvest, so the rulers were seen to have divine support", 2], ["The cult linked many peoples across the plateau to the state and gave it unity", 2]],
    hints: ["Think of the cult's importance to farmers and to the unity of the state."],
    modelAnswer: "The priests of Mwari spoke for the high god on matters such as rain and the harvest, so the Rozvi rulers who supported the cult were seen to have divine support. The cult also linked many peoples across the plateau to the state, which gave it unity.",
    explanation: "One mark for each point and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the Rozvi were able to expel the Portuguese from the plateau.",
    points: [["The Rozvi had a strong army and control of cattle and tribute that allowed them to keep it", 2], ["The Mutapa state was divided and the Portuguese were few and scattered, so they could not resist", 2]],
    hints: ["Think of the strengths of the Rozvi and the weaknesses of the Portuguese."],
    modelAnswer: "The Rozvi under Changamire Dombo had a strong army, supported by cattle and tribute. At the same time the Mutapa state was divided and the Portuguese were few and scattered across the Zambezi valley, so they could not resist the Rozvi attack.",
    explanation: "One mark for each reason and one for explaining it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was the Nguni invasion the main reason for the collapse of the Rozvi state?",
    levels: levels(6),
    points: [["Nguni groups of Zwangendaba and Nxaba attacked in the 1830s and the Ndebele settled the south-west, which broke Rozvi power", 2], ["But succession disputes and independent provinces had already weakened the state", 2], ["Judgement: invasion was the immediate cause, but internal weakness made the state vulnerable", 2]],
    hints: ["Separate the immediate cause from the long-term cause."],
    modelAnswer: "The Nguni invasions were the immediate cause of collapse: in the 1830s groups led by Zwangendaba and Nxaba attacked the Rozvi, and the Ndebele then settled the south-west. However, the state had already been weakened by succession disputes and by provinces becoming independent, so the Mambo could not resist. I conclude that the invasions delivered the final blow, but internal weakness was an important long-term cause.",
    explanation: "Credit both sets of causes and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a description of stone ruins by a fictional visitor, written in the 1890s",
        "The walls rise in terraces and the faces of the stones are laid in patterns of chevrons and checks. The inner courts are carefully levelled. Broken pieces of blue and white porcelain lie among the stones."),
      "",
      source("Source B", "a tradition told by a fictional elder in the twentieth century",
        "In the time of our fathers the Mambo sent his messengers to the hills to ask Mwari for rain. The chiefs brought him cattle and grain. When the strangers from the south came with their spears, the chiefs no longer agreed with one another, and the Mambo was not obeyed."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What can you learn from Source A about the ruins?", points: ["Walls were built in terraces with decorated patterns", "Imported porcelain was found, showing trade"] }),
      P.manual({ label: "(b)", marks: 4, stem: "What does Source B show about the organisation and the decline of the state?", points: [["Organisation: the Mambo consulted Mwari for rain and received tribute in cattle and grain", 2], ["Decline: invaders from the south came and the chiefs no longer agreed, so the Mambo was not obeyed (internal division and external attack)", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far do Sources A and B together help to explain the strength and the decline of a Rozvi-type state? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["Strength: A shows wealth and organised building; B shows tribute and religious authority", 2], ["Decline: B shows invasion and disunity of chiefs; A is silent on decline", 2], ["Own knowledge: Danangombe and Khami, the Mwari cult, Nguni invasions of the 1830s; limits of the sources", 2]], modelAnswer: "Source A suggests a wealthy and organised state, with terraced stone walls and imported porcelain showing trade, which fits what I know of Khami and Danangombe. Source B shows how the Mambo's authority rested on tribute and on religion through Mwari, and it explains the decline as invasion from the south combined with disunity among the chiefs, which matches the Nguni invasions of the 1830s and internal weakness. However, A is silent about decline and B is a late tradition. Together they help to explain both strength and decline, but they need to be checked against other evidence." }),
    ],
    hints: ["For (c), match each source to strength or decline, then add your own knowledge."],
    explanation: "Both sources are invented. A describes ruins, B is an oral tradition.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the achievements of the Rozvi state.",
    levels: levels(8),
    points: [
      ["Political: defeated the Torwa and Mutapa and expelled the Portuguese, ruling most of the plateau for about 150 years", 2],
      ["Economic: cattle, tribute and trade; craftsmen in iron, copper and gold", 2],
      ["Cultural and religious: stone building at Danangombe and Naletale; support for the Mwari cult", 2],
      ["Judgement: considerable achievement, limited by succession disputes and the failure to withstand Nguni invasions", 2],
    ],
    hints: ["Cover political, economic and cultural achievements, then weigh them against the end of the state."],
    modelAnswer: "The Rozvi achieved a great deal. Politically, Changamire Dombo defeated the Torwa and the Mutapa and expelled the Portuguese, so the Rozvi ruled most of the plateau for about a century and a half. Economically, they prospered from cattle, tribute and trade, and craftsmen worked iron, copper and gold. Culturally, they continued the stone building tradition at Danangombe and Naletale and supported the Mwari cult, which linked many peoples. However, the state suffered from succession disputes and independent provinces, and it could not withstand the Nguni invasions of the 1830s. Overall the Rozvi were a significant power whose achievements were considerable, though the state was not strong enough to survive.",
    explanation: "Credit specific achievements and a supported judgement.",
  });

  b.card("DEFINITION", "What does Mambo mean?", "The Shona title of a king; the Rozvi rulers were called Mambo.");
  b.card("DEFINITION", "What is the Mwari cult?", "Worship of the high god Mwari through shrines, notably in the Matobo Hills, whose priests were consulted for rain and guidance.");
  b.card("FACT", "Which was the capital of the Torwa state?", "Khami, near Bulawayo (occupied mainly about 1450-1650).");
  b.card("FACT", "Who founded the Rozvi state?", "Changamire Dombo, in the late seventeenth century.");
  b.card("FACT", "Name two Rozvi stone sites.", "Danangombe (Dhlo-Dhlo) and Naletale.");
  b.card("FACT", "Which Nguni leaders attacked the Rozvi in the 1830s?", "Zwangendaba and Nxaba; then Mzilikazi's Ndebele settled the south-west about 1838-40.");
  b.card("CONCEPT", "How did the Rozvi gain control of the plateau?", "Changamire Dombo built a strong army, overthrew the Torwa, defeated the Mutapa and drove the Portuguese from the plateau.");
  b.card("CONCEPT", "Why did the Rozvi state decline?", "Succession disputes and independent provinces weakened it, then Nguni invasions in the 1830s and the Ndebele finished it.");
  b.card("CONCEPT", "How did the Mwari cult support the Rozvi?", "Its priests spoke for the high god on rain and harvest, giving the rulers divine support and uniting many peoples.");
});
