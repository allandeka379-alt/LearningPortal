// W1a: ahist.precolonial.mapungubwe-great-zimbabwe (ZIMSEC topic 2, free preview).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.mapungubwe-great-zimbabwe", { file: "precolonial/mapungubwe-great-zimbabwe", keyPrefix: "precolonial.mapungubwe-great-zimbabwe" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Near which modern Zimbabwean town do the ruins of Great Zimbabwe stand?",
    options: [
      ["Masvingo", "Correct: the ruins lie a short distance from Masvingo."],
      ["Bulawayo", "Bulawayo is in the south-west; Khami lies near it, but not Great Zimbabwe."],
      ["Mutare", "Mutare is in the eastern highlands."],
      ["Kariba", "Kariba lies on the Zambezi in the north."],
    ],
    answer: "A",
    explanation: "Great Zimbabwe is near Masvingo. Khami is near Bulawayo.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which feature of Mapungubwe shows a division between rulers and commoners?",
    options: [
      ["Rulers lived on the hilltop and commoners below it", "Correct: the layout of the settlement reflected rank."],
      ["The commoners built a stone wall around the entire city", "Mapungubwe was not a stone-walled city like Great Zimbabwe."],
      ["The rulers and commoners shared one large open village", "Archaeology shows they lived apart."],
      ["The rulers lived in caves cut into the river bank", "The rulers lived on the hill, not in caves."],
    ],
    answer: "A",
    explanation: "Mapungubwe's rulers lived on the hill and the commoners at its foot: the earliest clear evidence of such separation in the region.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these was the main form of wealth in the Great Zimbabwe state?",
    options: [
      ["Cattle and farm produce", "Correct: cattle gave food, status and the means to reward followers."],
      ["Silver coins and banknotes", "Great Zimbabwe did not use its own silver coinage."],
      ["Railways and steamships", "Railways came with colonial rule."],
      ["Diamonds and emeralds", "Diamond mining is not linked to Great Zimbabwe."],
    ],
    answer: "A",
    explanation: "Cattle were the main wealth. Gold and ivory were traded, but the state rested on cattle and farming.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which finds at Great Zimbabwe are the best evidence of its links with the Indian Ocean trade?",
    options: [
      ["Chinese celadon, Persian pottery, Kilwa coins", "Correct: all were made far away and reached the plateau through trade."],
      ["Soapstone birds and carved stone bowls of the hill", "These are local carvings and show religion, not trade links."],
      ["Granite blocks and fallen wall stones of the enclosure", "These are local building materials."],
      ["Cattle bones and grindstones for crushing millet", "These show local farming and herding."],
    ],
    answer: "A",
    hints: ["Which objects could not have been made on the plateau?"],
    explanation: "Imported ceramics and coins show contact with Kilwa and the wider Indian Ocean world. The other finds are local.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the claim that Great Zimbabwe was built by Phoenicians or the Queen of Sheba last for so long?",
    options: [
      ["It reflected prejudice that suited settlers", "Correct: it was a belief, supported by assumption, that Africans could not build in stone."],
      ["It was supported by every excavation done on the site", "Randall-MacIver and Caton-Thompson disproved it."],
      ["It was based on Shona oral traditions told to the explorers", "Shona tradition linked the site to Shona ancestors."],
      ["It had been proved by radiocarbon dating in the 1890s then", "Radiocarbon dating was developed in the 1940s."],
    ],
    answer: "A",
    hints: ["Think about the attitudes of those who made the claim."],
    explanation: "The myth rested on racial prejudice and was useful to settlers. Archaeology and later dating supported an African origin.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains how the loss of the gold trade could weaken Great Zimbabwe's rulers?",
    options: [
      ["The rulers could no longer reward followers with imported goods", "Correct: prestige goods bought loyalty, so their loss weakened the king's hold."],
      ["Gold was the only food eaten by the state's whole population", "Gold was not food; cattle and crops fed the people."],
      ["Traders stopped coming, so the soapstone birds lost their shape", "This confuses trade with the condition of the carvings."],
      ["The Portuguese seized the capital as soon as trade moved north", "The Portuguese did not capture Great Zimbabwe."],
    ],
    answer: "A",
    hints: ["What did rulers do with imported goods?"],
    explanation: "Rulers used prestige goods, gained through trade, to reward and bind their followers. If trade moved away, their power weakened.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about the decline of Great Zimbabwe is best supported by the state of the evidence?",
    options: [
      ["Several causes probably combined, and none is proved", "Correct: the evidence is limited and the causes are theories."],
      ["Environmental exhaustion was the single proven cause", "No single cause has been proved."],
      ["The state collapsed because of a Portuguese invasion", "There is no evidence of a Portuguese invasion of Great Zimbabwe."],
      ["The decline was caused by the Mfecane of the 1820s", "The decline came centuries before the Mfecane."],
    ],
    answer: "A",
    hints: ["Remember that historians treat the causes as theories."],
    explanation: "Historians offer environmental, trade-related and political explanations, which probably combined.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Great Zimbabwe was built by the ancestors of the Shona.",
    answer: true,
    explanation: "True. Archaeology, radiocarbon dating and oral tradition all support an African, Shona-ancestor origin.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Mapungubwe was abandoned and Great Zimbabwe developed later, so Mapungubwe is the older of the two states.",
    answer: true,
    explanation: "True. Mapungubwe's main period was about 1220-1290 and it was abandoned by about 1300, while Great Zimbabwe's stone building came mainly in the thirteenth to fifteenth centuries.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Imported Chinese porcelain at Great Zimbabwe proves that Chinese merchants built the city.",
    answer: false,
    hints: ["What does an imported object show, and what does it not show?"],
    explanation: "False. Imported goods show trade links. They do not show who built the walls, which were African work.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of Great Zimbabwe with its description.",
    pairs: [
      ["Hill Complex", "The oldest part, probably royal and ritual, where soapstone birds were found"],
      ["Great Enclosure", "A large oval wall with a solid conical tower"],
      ["Valley Ruins", "Smaller enclosures lived in by other members of the elite"],
      ["Soapstone birds", "Carvings that may represent royal ancestors"],
    ],
    explanation: "These are the main features to know.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each person with what he or she is linked to in the study of Great Zimbabwe.",
    pairs: [
      ["Karl Mauch", "Visited in 1871 and suggested outside builders"],
      ["Theodore Bent", "Excavated in 1891 and argued for Phoenician or Arab builders"],
      ["David Randall-MacIver", "Excavated in 1905 and found the site to be medieval and African"],
      ["Gertrude Caton-Thompson", "Excavated in 1929 and confirmed an African origin"],
    ],
    hints: ["Two of them supported the myth and two disproved it."],
    explanation: "Mauch and Bent supported foreign builders; Randall-MacIver and Caton-Thompson disproved the claim.",
  });
  {
    const events = [
      "Mapungubwe Hill is the royal centre",
      "Stone building at Great Zimbabwe reaches its height",
      "Karl Mauch visits the ruins",
      "Great Zimbabwe becomes a World Heritage Site",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Medieval events come before nineteenth-century visitors."],
      explanation: "Mapungubwe (about 1220-1290), Great Zimbabwe's height (13th-15th centuries), Mauch (1871), World Heritage Site (1986).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Great Zimbabwe's gold and ivory reached the coast through the port of {{blank:a}}, and the oval wall with the conical tower is called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Sofala"], choices: ["Sofala", "Luanda", "Durban", "Lagos"] },
      { id: "b", accepted: ["Great Enclosure"], choices: ["Hill Complex", "Great Enclosure", "Valley Ruins", "Royal Kraal"] },
    ],
    explanation: "Sofala was the main port for plateau gold; the Great Enclosure holds the conical tower.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which earlier Limpopo valley state was ruled from a hill where a small gold rhinoceros was found?",
    accepted: ["Mapungubwe"],
    wrong: ["Khami"],
    explanation: "**Mapungubwe**: the gold burials were found on the hill in 1933.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the religious organisation of the Great Zimbabwe state.",
    points: ["Belief in ancestral spirits, especially royal ancestors", "Belief in a high god, later called Mwari", "The king's special link with the ancestors and rain-making", "Soapstone birds that may represent ancestors or messengers"],
    modelAnswer: "People believed in ancestral spirits, especially the spirits of royal ancestors, and in a high god who was later called Mwari. The king was believed to have a special link with the ancestors and with rain. The soapstone birds may have represented royal ancestors or messengers to the spirit world.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which trade contributed to the power of the rulers of Great Zimbabwe.",
    points: [["Control of the gold and ivory trade brought wealth and imported goods", 2], ["The rulers used imported goods to reward followers and show their status, which strengthened their hold on the state", 2]],
    hints: ["Think of what traders brought and what the rulers did with it."],
    modelAnswer: "The rulers controlled the trade in gold and ivory with the coast, which brought them wealth and imported goods such as glass beads and cloth. They used these prestige goods to reward followers and show their high status, and this strengthened their hold on the state.",
    explanation: "One mark for each way and one for explaining its effect.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why historians are cautious about the causes of the decline of Great Zimbabwe.",
    points: [["There are no written records from the state itself, so the causes must be inferred from archaeology and tradition", 2], ["Several theories (environment, trade, politics) fit the evidence, and none can be proved on its own", 2]],
    hints: ["Think of what kind of evidence survives."],
    modelAnswer: "The state left no written records, so historians infer the causes from archaeology and oral tradition, which are incomplete. Several theories fit the evidence, including environmental exhaustion, loss of trade and political division, and none can be proved on its own.",
    explanation: "One mark for each reason and one for explaining it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far do you agree that Mapungubwe was a forerunner of Great Zimbabwe?",
    levels: levels(6),
    points: [["Agree: earlier state with cattle wealth, gold and ivory trade, ruling elite on a hill, class division expressed in settlement", 2], ["Challenge: Great Zimbabwe was larger and built in stone on a different site; the link rests partly on shared culture and trade shift north, not proved continuity", 2], ["Judgement: Mapungubwe was an earlier state of a similar kind and part of the same long development", 2]],
    hints: ["Compare economy, rule and trade, then note differences."],
    modelAnswer: "Mapungubwe was a forerunner in important ways: it was an earlier state built on cattle, gold and ivory trade, with a ruling elite living on a hill apart from commoners. Great Zimbabwe developed similar features on a larger scale. However, Great Zimbabwe was built in stone on a different site, and direct continuity is not proved: much of the link rests on shared culture and the shift of power and trade northward. I agree that Mapungubwe belonged to the same long development, but not that Great Zimbabwe was simply its continuation.",
    explanation: "Credit comparison of features, the limits of the link and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "an extract from the account of a fictional European traveller, who visited the ruins in the 1880s",
        "These great walls cannot have been raised by the ancestors of the people who now live nearby. They are too well made. The builders must have come from far away, from the north, long ago."),
      "",
      source("Source B", "a statement by a fictional archaeologist, published in the 1930s after a season of excavation",
        "In the lowest layers I found beads, iron tools and pottery of the kind made by the local people, together with trade goods from the east coast. There is no sign of foreign builders, and the walls grew from simple beginnings."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A claim about the builders of the walls?", points: ["They were not the ancestors of the local people", "They came from far away, from the north, long ago"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How does Source B challenge Source A?", points: [["B found local pottery, tools and beads, so the builders were local people", 2], ["B found no sign of foreign builders and found that the walls grew from simple beginnings; A gives no evidence", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source is the more reliable about who built Great Zimbabwe? Use the provenance of each source and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["B is based on excavation and examination of the layers, a method that can be checked", 2], ["A is based on assumption by a traveller who did not excavate and who may have shared the prejudices of his time", 2], ["Own knowledge: Randall-MacIver, Caton-Thompson and radiocarbon dating all support an African origin", 2]], modelAnswer: "Source B is far more reliable. It is the report of an archaeologist who excavated and examined the lowest layers, and it records local pottery, iron tools and beads together with imports from the coast, which is evidence that can be checked. Source A is the opinion of a traveller who did not excavate. He gives no evidence and simply assumes that the walls are too well made for the local people, an assumption that reflects the prejudice of his time. My own knowledge supports Source B: Randall-MacIver in 1905 and Caton-Thompson in 1929 reached the same conclusion, and radiocarbon dating and Shona oral tradition agree that the builders were the ancestors of the Shona." }),
    ],
    hints: ["For (c), compare the evidence each writer used and the attitudes behind the claims."],
    explanation: "Both sources are invented. A repeats the foreign-builder myth and B is an archaeologist's finding.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent was the gold and ivory trade the reason for the rise of Great Zimbabwe?",
    levels: levels(8),
    points: [
      ["Trade: gold and ivory sold through Sofala and Kilwa brought wealth and prestige goods (Chinese porcelain, Kilwa coins)", 2],
      ["Other causes: cattle wealth, farming surplus, good land, ritual leadership, building stone and the inheritance from Mapungubwe", 2],
      ["Evidence: trade goods show contact but the city's base was cattle and farming; trade supported rulers rather than causing the state alone", 2],
      ["Judgement", 2],
    ],
    hints: ["Weigh trade against cattle, farming and religious leadership."],
    modelAnswer: "Trade was an important reason for the rise of Great Zimbabwe. The rulers controlled the flow of gold and ivory to the coast through Sofala and received imported goods such as Chinese celadon and Persian pottery, and Kilwa coins have been found at the site. These prestige goods allowed the king to reward followers and strengthen his status. However, trade was not the only basis of power. Cattle were the main wealth, the surrounding land supported farming and herding, the rulers held ritual authority as the link with the ancestors, and Mapungubwe had earlier shown how a state could develop in the region. Trade goods show contact, but the city rested on a local farming economy. Trade therefore helped the rulers to become rich and powerful, but it worked together with cattle, farming and religion.",
    explanation: "Credit explained causes and a supported judgement.",
  });

  b.card("DEFINITION", "What is dry-stone walling?", "Building with shaped stones laid without mortar, as at Great Zimbabwe, where granite was split and laid in courses.");
  b.card("DEFINITION", "What are prestige goods?", "Rare, valuable items, such as imported beads, cloth and ceramics, which rulers used to show status and reward followers.");
  b.card("FACT", "Which state preceded Great Zimbabwe in the Limpopo valley?", "Mapungubwe (main period about 1220-1290).");
  b.card("FACT", "What was found at Mapungubwe in 1933?", "Gold burials, including a small gold rhinoceros.");
  b.card("FACT", "Which three parts of Great Zimbabwe should you know?", "The Hill Complex, the Great Enclosure (with the conical tower) and the Valley Ruins.");
  b.card("FACT", "Which imported goods have been found at Great Zimbabwe?", "Chinese celadon, Persian pottery, glass beads and copper coins from Kilwa.");
  b.card("CONCEPT", "How did archaeology disprove the myth of foreign builders at Great Zimbabwe?", "Randall-MacIver (1905) and Caton-Thompson (1929) found African objects and building methods and only medieval imports; radiocarbon dating and Shona tradition agree.");
  b.card("CONCEPT", "Name four theories for the decline of Great Zimbabwe.", "Environmental exhaustion, a shift of trade routes north, water or salt shortage, and political division; none is proved.");
  b.card("CONCEPT", "What was the main basis of wealth at Great Zimbabwe?", "Cattle and farming; the gold and ivory trade added prestige goods that rulers gave to followers.");
});
