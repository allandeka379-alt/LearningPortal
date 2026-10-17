// W1b: ahist.contact.portuguese (ZIMSEC topic 3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.contact.portuguese", { file: "contact/portuguese", keyPrefix: "contact.portuguese" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the Portuguese build a fort at Sofala, the main outlet for plateau gold?",
    options: [
      ["1505", "Correct: Sofala became a Portuguese post in 1505."],
      ["1498", "This is the year of Vasco da Gama's first voyage along the coast, before the fort."],
      ["1561", "This is the year Silveira was killed."],
      ["1629", "This is the year of the treaty with Mavura Mhande."],
    ],
    answer: "A",
    explanation: "The fort at Sofala dates from 1505. Da Gama passed the coast in 1498, but he built no post.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which settlements on the Zambezi became the centres of Portuguese life in the interior from the 1530s?",
    options: [
      ["Sena and Tete", "Correct: traders settled there and travelled on to the fairs of the plateau."],
      ["Sofala and Kilwa, the two older towns of the coast", "These were coastal towns, not settlements up the river."],
      ["Great Zimbabwe and Khami, the stone-walled centres", "These were African capitals, not Portuguese settlements."],
      ["Bulawayo and Fort Salisbury", "These were founded in the nineteenth century."],
    ],
    answer: "A",
    explanation: "Sena and Tete were the Portuguese river bases from which traders, missionaries and later prazeiros operated.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which was the most important motive for the Portuguese in seeking contact with the plateau?",
    options: [
      ["To gain a share of the gold and ivory trade", "Correct: gold was the main attraction of the interior."],
      ["To settle a large population of Portuguese farmers on the plateau", "There was no mass settlement; the Portuguese in the interior were always few."],
      ["To free African peoples from the rule of the Mutapa state", "Their aim was trade and influence, not liberation."],
      ["To build a railway from the coast to the interior", "Railways belong to the late nineteenth and twentieth centuries."],
    ],
    answer: "A",
    explanation: "Gold and ivory, together with control of the Indian Ocean trade and the spread of Christianity, drew the Portuguese inland.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which group at the Mutapa's court had most to lose from a Portuguese alliance, and so helped to turn the ruler against Silveira?",
    options: [
      ["Muslim merchants who controlled much of the gold trade", "Correct: they feared losing the trade to the Portuguese."],
      ["Farmers of the Zambezi valley who paid tribute to the king", "Farmers did not decide court policy or trade."],
      ["Portuguese soldiers who had come with the priest", "He came without a Portuguese army."],
      ["Rozvi chiefs who ruled in the south-west", "The Rozvi were not yet the power in the Mutapa's court in 1561."],
    ],
    answer: "A",
    hints: ["Who already traded in gold before the Portuguese arrived?"],
    explanation: "Muslim traders already held the gold trade, and with court advisers they persuaded the ruler that the priest was a danger.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the outcome of Francisco Barreto's expedition of 1569-72?",
    options: [
      ["It was ruined by disease and never reached the mines in strength", "Correct: disease and difficult country ended it."],
      ["It captured the Mutapa's capital and ended the state", "The Mutapa state survived for another century."],
      ["It founded a settlement on the plateau with a Portuguese governor", "No such colony was founded."],
      ["It drove the Muslim merchants out and took control of all the trade", "The expedition did not win control of the trade."],
    ],
    answer: "A",
    hints: ["Consider what happens to a European army in the Zambezi valley."],
    explanation: "Barreto's force lost men and horses to disease and failed. After that the Portuguese relied on treaties, alliances and private settlers.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the main feature of the prazo system?",
    options: [
      ["Settlers leased large estates from the Crown and ruled the people there", "Correct: prazeiros collected tribute and raised armed followers."],
      ["Africans leased land from the Mutapa to grow crops for the Portuguese", "The Crown, not the Mutapa, leased the prazos."],
      ["A fair at which gold was exchanged for imported cloth", "This describes a feira, not a prazo."],
      ["A fort built to guard the coast against ships", "This describes a captaincy or fort."],
    ],
    answer: "A",
    hints: ["Think of an estate held by lease and ruled like a chiefdom."],
    explanation: "A prazo was an estate held by lease, usually for three lives; the holder acted as a chief with armed followers.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which piece of evidence best shows that the Portuguese never ruled the plateau?",
    options: [
      ["The Rozvi army removed them from the plateau in the 1690s", "Correct: an African army expelled them."],
      ["Their fort at Sofala controlled the coast", "A coastal fort shows influence on the coast, not rule of the interior."],
      ["Their treaty with Gatsi Rusere gave them mining rights", "A treaty shows influence, but it does not prove that they ruled."],
      ["Silveira converted the king before he was killed", "Baptism does not show rule, and the priest was killed soon after."],
    ],
    answer: "A",
    hints: ["Which event shows an African army removing the Portuguese?"],
    explanation: "The expulsion by Changamire Dombo's Rozvi shows that African states held the power on the plateau. The other three items show influence, not rule.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why treaties such as that of 1629 are difficult for historians to interpret?",
    options: [
      ["They are known mainly from Portuguese records, which may claim more than was granted", "Correct: the African side is rarely recorded."],
      ["They were written in the Shona language and no copy of any of them has survived", "They survive in Portuguese records."],
      ["No treaty was ever made between the two sides, so the records were invented later", "Treaties are recorded, in 1607 and 1629."],
      ["They concern only the island of Mozambique and the harbour of the coast near it", "They concern the Mutapa state and the Zambezi valley."],
    ],
    answer: "A",
    hints: ["Whose records survive?"],
    explanation: "Because the main record is Portuguese, historians must allow that the Portuguese described as vassalage what a Mutapa ruler may have seen as a loose alliance.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Vasco da Gama's fleet reached the east African coast in 1498.",
    answer: true,
    explanation: "True. His fleet sailed up the coast in 1498 on the way to India.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Portuguese conquered the Mutapa state and ruled the plateau until the nineteenth century.",
    answer: false,
    explanation: "False. They never conquered the plateau, and the Rozvi expelled them in the 1690s.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "The Mutapa ruler who welcomed Silveira in 1560 did so because he wanted to end all trade with the Muslim merchants.",
    answer: false,
    hints: ["Think about who persuaded him to turn against the priest."],
    explanation: "False. The Muslim merchants were among those who turned him against the priest. The ruler welcomed him as a visitor and was then persuaded that he was a danger.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Prazo", "An estate in the Zambezi valley leased by the Crown"],
      ["Feira", "A trading fair where gold and ivory were exchanged for cloth"],
      ["Prazeiro", "The holder of a prazo, who acted as a chief"],
      ["Captaincy", "A fort and post under a Portuguese captain"],
    ],
    explanation: "These four terms are needed in answers on Portuguese activities.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each person with his role.",
    pairs: [
      ["Vasco da Gama", "Led the fleet that reached the east African coast in 1498"],
      ["Gonçalo da Silveira", "A Jesuit missionary who baptised a Mutapa ruler and was killed in 1561"],
      ["Francisco Barreto", "Led the failed expedition of 1569-72"],
      ["Changamire Dombo", "Led the Rozvi army that expelled the Portuguese from the plateau"],
    ],
    hints: ["Two belong to the first century of contact and two to its later stages."],
    explanation: "Da Gama came first; Silveira's death led to Barreto's expedition; Dombo ended the Portuguese presence on the plateau.",
  });
  {
    const events = [
      "Portuguese build a fort at Sofala",
      "Silveira is killed at the Mutapa's court",
      "The Mutapa Gatsi Rusere makes a treaty with the Portuguese",
      "The Rozvi expel the Portuguese from the plateau",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1505, 1561, 1607 and the 1690s."],
      explanation: "Sofala 1505; Silveira 1561; Gatsi Rusere 1607; the expulsion in the 1690s.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Jesuit missionary {{blank:a}} was killed at the Mutapa's court in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Gonçalo da Silveira"], choices: ["Gonçalo da Silveira", "Francisco Barreto", "Vasco da Gama", "Robert Moffat"] },
      { id: "b", accepted: ["1561"], choices: ["1498", "1561", "1607", "1629"] },
    ],
    explanation: "Silveira was a Jesuit, killed in 1561.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the large estates leased by the Portuguese Crown in the Zambezi valley?",
    accepted: ["prazo", "prazos", "prazo estate", "prazos da coroa"],
    wrong: ["feira"],
    explanation: "They were called **prazos**; the holders were prazeiros.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Portuguese trading posts on the east coast and the Zambezi.",
    points: ["Built a fort at Sofala in 1505 as the outlet for gold", "Held a base on Mozambique Island on the coast", "Settled at Sena and Tete on the Zambezi from the 1530s", "Traded from there at the fairs of the plateau"],
    modelAnswer: "The Portuguese built a fort at Sofala in 1505, which became the main outlet for the gold of the plateau. They also held Mozambique Island. From the 1530s traders settled at Sena and Tete on the Zambezi, and from these towns they travelled to the fairs of the plateau.",
    explanation: "One mark for each place or feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Gonçalo da Silveira was killed in 1561.",
    points: [["Muslim merchants feared that Portuguese influence would damage their trade in gold", 2], ["Court advisers persuaded the ruler that the priest was a spy or sorcerer and a danger to his authority", 2]],
    hints: ["Think of two groups with an interest in turning the ruler against him."],
    modelAnswer: "Muslim merchants controlled much of the gold trade and feared that a Portuguese alliance would take it from them. They and some court advisers persuaded the ruler that the priest was a spy and a danger to his authority, and he was killed.",
    explanation: "One mark for each reason and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the expedition of Francisco Barreto failed.",
    points: [["Disease and the heat of the Zambezi valley killed men and horses", 2], ["The country was hard to cross and the force never reached the mines in strength, so the Portuguese turned to treaties", 2]],
    hints: ["Think about the climate and the terrain."],
    modelAnswer: "The expedition was ruined by disease, which killed many men and horses in the heat of the Zambezi valley. The country was hard to cross, and the force never reached the mines in strength. The failure persuaded the Portuguese to rely on treaties and local allies instead.",
    explanation: "Credit reasons with development.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far did the Portuguese control the Zimbabwean plateau by 1700?",
    levels: levels(6),
    points: [["Influence: treaties of 1607 and 1629, vassal status for some rulers, prazos and fairs, a share in the gold and ivory trade", 2], ["Limits: the Barreto expedition failed, the Portuguese were few, and the Rozvi expelled them from the plateau in the 1690s", 2], ["Judgement that influence in the valley was never control of the plateau", 2]],
    hints: ["Separate the Zambezi valley from the plateau."],
    modelAnswer: "The Portuguese had real influence. Treaties in 1607 and 1629 gave them mining rights and made one Mutapa ruler a vassal, and prazeiros ruled much of the valley. But they never controlled the plateau. Barreto's army failed, they were few and relied on African allies, and the Rozvi under Changamire Dombo expelled them in the 1690s. Their influence was greatest in the valley and never amounted to control of the plateau.",
    explanation: "Credit both sides and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Portuguese official at Sena to the Crown, early seventeenth century",
        "The king is friendly and allows us to trade at his fairs, but his officers watch every sale and take a share. We are few, and without his goodwill we could not move a day from the river. If his enemies rise we may be asked to fight for him, and in return he will give us land."),
      "",
      source("Source B", "a tradition told by a fictional Shona elder in the twentieth century",
        "In the old days the strangers from the sea came to our king for gold. They came with cloth and beads. They were not our masters; they asked for the king's leave, and when they became too proud our people drove them out."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the position of the Portuguese in the interior?", points: ["They were few and depended on the king's goodwill", "They were taxed by his officers / might be asked to fight in return for land"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the relationship between the Portuguese and the African ruler?", points: [["Agree: both show the Portuguese traded by the ruler's permission and were not masters", 2], ["Differ: A shows co-operation and a possible exchange of help for land, B stresses that they became proud and were driven out", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence of Portuguese power in the interior?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is contemporary and by an official who knew the situation, but he may be reporting to the Crown in a way that shows his own usefulness", 2], ["B was told centuries later by an elder, so details may be lost or shaped by pride, but it fits the known expulsion of the 1690s", 2], ["Own knowledge supports both: fairs under the ruler's control, the Barreto failure and the Rozvi expulsion", 2]], modelAnswer: "Source A is reliable on what the Portuguese could do in the early seventeenth century, since it comes from an official at the time who admits how few they were, which is against his interest. But it is a report to the Crown and may be shaped to win support. Source B was told long afterwards and may have lost detail, and it reflects pride in the expulsion. But both fit what I know: the Portuguese traded at fairs under the ruler's control, Barreto's expedition failed and the Rozvi drove them from the plateau in the 1690s. Together they give a reliable picture of limited Portuguese power." }),
    ],
    hints: ["For (c), consider who wrote each source and when, and check them against what you know."],
    explanation: "Both sources are invented. A is a contemporary official report and B an oral tradition recorded long afterwards.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the impact of the Portuguese on Zimbabwean societies before 1700.",
    levels: levels(8),
    points: [
      ["Trade: Muslim merchants displaced; a share of gold and ivory went to the coast; mining disrupted by wars", 2],
      ["Politics: succession disputes exploited; treaties of 1607 and 1629; weakening of the Mutapa state", 2],
      ["Limits: few converts, no conquest of the plateau, Rozvi expulsion", 2],
      ["Judgement on the overall impact", 2],
    ],
    hints: ["Group the impact under trade, politics and society, then weigh it."],
    modelAnswer: "The Portuguese had a considerable impact on trade and politics but a limited impact on society. They pushed aside the Muslim merchants and took a share of the gold and ivory, and wars disrupted mining. They exploited succession disputes, and the treaties of 1607 and 1629 weakened the Mutapa state. But Christianity won few converts, they never conquered the plateau, and the Rozvi expelled them in the 1690s. The main effect was to deepen the divisions of an already weak Mutapa state, in the valley more than on the plateau.",
    explanation: "Credit explained effects and a supported judgement.",
  });

  b.card("DEFINITION", "What was a prazo?", "A large estate in the Zambezi valley leased by the Portuguese Crown to a settler (prazeiro), who ruled the people on it with armed followers.");
  b.card("DEFINITION", "What was a feira?", "A trading fair on the plateau where gold and ivory were exchanged for imported cloth and beads, under the Mutapa's permission and tax.");
  b.card("FACT", "When did the Portuguese build a fort at Sofala?", "1505.");
  b.card("FACT", "Which two Zambezi towns became the main Portuguese settlements in the interior from the 1530s?", "Sena and Tete.");
  b.card("FACT", "What happened to Gonçalo da Silveira in 1561?", "The Jesuit missionary, who had baptised the Mutapa ruler, was killed at his court.");
  b.card("FACT", "Which Portuguese expedition (1569-72) failed to reach the mines?", "The expedition of Francisco Barreto, ruined by disease.");
  b.card("FACT", "Which two Mutapa treaty dates matter for Portuguese influence?", "1607 (Gatsi Rusere) and 1629 (Mavura Mhande).");
  b.card("CONCEPT", "Why did the Portuguese come to the plateau?", "For gold and ivory, to control the Indian Ocean trade and to spread Christianity.");
  b.card("CONCEPT", "Why did the Portuguese never rule the plateau?", "They were few, Barreto's expedition failed, they relied on African allies and the Rozvi expelled them in the 1690s.");
  b.card("CONCEPT", "What was the impact of the Portuguese on Zimbabwean societies?", "They displaced Muslim traders, took a share of the gold trade, deepened Mutapa divisions and set up prazos, but won few converts.");
});
