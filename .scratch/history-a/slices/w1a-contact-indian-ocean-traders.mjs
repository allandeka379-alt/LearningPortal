// W1a: ahist.contact.indian-ocean-traders (ZIMSEC topic 3).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.contact.indian-ocean-traders", { file: "contact/indian-ocean-traders", keyPrefix: "contact.indian-ocean-traders" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which port on the Mozambique coast was the main outlet for the plateau's gold?",
    options: [
      ["Sofala", "Correct: gold travelled down to Sofala and was shipped to Kilwa and beyond."],
      ["Mombasa", "Mombasa lay far to the north, in present-day Kenya."],
      ["Luanda", "Luanda is on the Atlantic coast."],
      ["Zanzibar", "Zanzibar is an island off Tanzania."],
    ],
    answer: "A",
    explanation: "Sofala was the main port for the gold of the Zimbabwe plateau.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the monsoon winds help the Indian Ocean trade?",
    options: [
      ["They let ships sail one way in one season and return in another", "Correct: the seasonal winds made regular voyages possible."],
      ["They blew constantly from the south, so ships never needed to return", "The winds changed direction with the seasons."],
      ["They carried heavy cargoes inland up the Limpopo River", "The monsoon helped sea voyages, not river transport."],
      ["They kept the sea calm so that no ship was ever lost", "Sea voyages remained dangerous."],
    ],
    answer: "A",
    explanation: "The monsoon blows from the north-east in winter and from the south-west in summer, so dhows could sail out and return.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these goods came from the plateau for the Indian Ocean trade?",
    options: [
      ["Gold and ivory", "Correct: these were the main exports."],
      ["Chinese porcelain", "Porcelain was imported, not exported."],
      ["Cotton cloth from India", "Cloth was imported."],
      ["Glass beads", "Glass beads were imported."],
    ],
    answer: "A",
    explanation: "Gold and ivory were the main exports of the plateau; porcelain, cloth and beads were imported.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What does the discovery of a Kilwa copper coin at Great Zimbabwe show?",
    options: [
      ["Great Zimbabwe was linked by trade to the coast", "Correct: coins minted at Kilwa reached the plateau."],
      ["Great Zimbabwe was built by traders from Kilwa", "Coins prove trade, not who built the walls."],
      ["Great Zimbabwe ruled over the city of Kilwa", "The coin shows exchange, not rule."],
      ["Great Zimbabwe used Kilwa coins as its own currency", "There is no evidence of a coin-based currency on the plateau."],
    ],
    answer: "A",
    hints: ["What can an object from far away prove, and what can it not prove?"],
    explanation: "A coin made at Kilwa found at Great Zimbabwe shows contact and exchange, not rule or settlement.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the rulers of Great Zimbabwe value imported cloth and beads?",
    options: [
      ["They were prestige goods that showed rank and won loyalty", "Correct: rulers gave them to followers to bind them."],
      ["They were needed to pay a tax demanded by Arab governors", "The plateau did not pay tax to Arab governors."],
      ["They replaced local crops as the main food supply there", "Cloth and beads cannot be eaten."],
      ["They were required by a law before building any stone walls", "No such law existed."],
    ],
    answer: "A",
    hints: ["Think of what rulers did with scarce, valuable goods."],
    explanation: "Imported luxury goods showed rank and could be given away to build loyalty.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best describes the nature of the Indian Ocean trade with the plateau?",
    options: [
      ["Mostly peaceful exchange via middlemen and ports", "Correct: African and coastal traders exchanged goods."],
      ["A system of forced tribute taken by Persian governors", "There was no Persian rule on the plateau."],
      ["A trade run entirely by Chinese merchants in the interior", "Chinese goods came through middlemen."],
      ["A trade carried out only after the Portuguese arrived", "The trade began centuries before the Portuguese."],
    ],
    answer: "A",
    hints: ["Think about who carried the goods and whether anyone ruled the plateau from outside."],
    explanation: "The trade was commercial and largely peaceful, with Swahili and African middlemen; it began long before the Portuguese.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which view best balances the effects of the Indian Ocean trade on the plateau's states?",
    options: [
      ["It strengthened rulers but left states dependent on routes", "Correct: the benefits went to rulers, with risk of decline when trade moved."],
      ["It had no effect on rulers and changed only what was eaten", "The trade strengthened rulers."],
      ["It created every state on the plateau without local factors", "Local factors such as cattle and farming were essential."],
      ["It destroyed every state by bringing soldiers to the plateau", "The trade did not bring soldiers; the Portuguese came later."],
    ],
    answer: "A",
    hints: ["Weigh the benefit to rulers against the vulnerability."],
    explanation: "Trade added wealth and prestige, but a state that relied on it was vulnerable when the routes shifted.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Kilwa was a Swahili port that issued its own copper coins.",
    answer: true,
    explanation: "True. Kilwa grew rich on the gold trade and minted copper coins.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Chinese ships regularly sailed up the rivers of the Zimbabwe plateau to trade for gold.",
    answer: false,
    explanation: "False. Chinese ships reached the East African coast in the early fifteenth century at most; Chinese goods reached the plateau through other traders.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Imported Chinese porcelain at Great Zimbabwe is evidence that Africans took part in long-distance trade.",
    answer: true,
    hints: ["Who in the interior supplied the gold and ivory in exchange?"],
    explanation: "True. Imported goods reached the plateau because African producers and traders supplied gold and ivory in return.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each place with its role in the trade.",
    pairs: [
      ["Sofala", "Main port for the gold of the plateau"],
      ["Kilwa", "Rich city-state that issued its own copper coins"],
      ["Great Zimbabwe", "Plateau centre where Chinese and Persian goods have been found"],
      ["Gujarat", "Region of India that supplied cloth and beads"],
    ],
    explanation: "These places show the chain from plateau to coast to India.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each find with the place it came from.",
    pairs: [
      ["Celadon bowl", "China"],
      ["Glazed pottery", "Persia"],
      ["Glass beads", "India"],
      ["Copper coin", "Kilwa"],
    ],
    hints: ["Think about where each product was made."],
    explanation: "The finds at Great Zimbabwe came from different parts of the Indian Ocean world.",
  });
  {
    const events = [
      "Glass beads reach southern Africa through Chibuene",
      "Ibn Battuta visits Kilwa",
      "Vasco da Gama reaches the East African coast",
      "The Portuguese take Sofala",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Beads reached the coast in the first millennium CE."],
      explanation: "Eighth to tenth centuries, 1331, 1498, 1505.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The plateau exported {{blank:a}} and ivory, and in return received cloth, {{blank:b}} and porcelain.",
    blanks: [
      { id: "a", accepted: ["gold"], choices: ["gold", "maize", "tobacco", "rifles"] },
      { id: "b", accepted: ["beads"], choices: ["beads", "cattle", "iron hoes", "salt"] },
    ],
    explanation: "Gold and ivory for cloth, beads and porcelain.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the Swahili port city that issued copper coins and grew rich on the gold trade. (One word.)",
    accepted: ["Kilwa"],
    wrong: ["Mombasa"],
    explanation: "**Kilwa**, in present-day Tanzania.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the goods exchanged in the trade between the plateau and the Indian Ocean world.",
    points: ["The plateau supplied gold", "It supplied ivory (also copper and skins)", "Imports included cotton cloth from India", "Imports included glass beads and Chinese and Persian ceramics"],
    modelAnswer: "The plateau supplied gold and ivory, and also copper and skins. In return it received cotton cloth from India, glass beads, and Chinese and Persian pottery and porcelain.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how archaeology shows that the plateau was linked to the Indian Ocean trade.",
    points: [["Imported objects such as Chinese celadon, Persian pottery, glass beads and Kilwa coins have been excavated at Great Zimbabwe and Mapungubwe", 2], ["These could not have been made on the plateau, so they must have arrived by trade through the coast", 2]],
    hints: ["Think about what the objects were and where they were made."],
    modelAnswer: "Excavations at Great Zimbabwe and Mapungubwe have found imported objects such as Chinese celadon, Persian pottery, glass beads and Kilwa coins. These could not have been made on the plateau, so they must have arrived by trade through the coast, which shows that the plateau was linked to the Indian Ocean network.",
    explanation: "One mark for each point and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the Indian Ocean trade strengthened the rulers of Great Zimbabwe.",
    points: [["Control of gold and ivory brought wealth and imports to the rulers", 2], ["They used imported goods to reward followers and to show their status, so their power over the elite and commoners grew", 2]],
    hints: ["Think of what rulers did with the goods that they obtained."],
    modelAnswer: "The rulers controlled the gold and ivory trade, which brought them wealth and imported goods. They used these goods to reward followers and to show their high status, so their power over the elite and the commoners grew.",
    explanation: "One mark for each point and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was the Indian Ocean trade the main reason for the rise of Great Zimbabwe?",
    levels: levels(6),
    points: [["Trade: gold and ivory brought wealth and prestige goods, which strengthened rulers", 2], ["Other factors: cattle, farming surplus, land, ritual authority and the example of Mapungubwe", 2], ["Judgement", 2]],
    hints: ["Weigh trade against the local foundations."],
    modelAnswer: "Trade was important because the gold and ivory trade brought wealth and imported prestige goods that strengthened the rulers. However, the state also rested on cattle, farming surplus, good land and the rulers' ritual authority, and Mapungubwe had earlier shown how a state could grow. I conclude that trade strengthened the rulers, but the foundations of the state were local, so trade was one important cause among several.",
    explanation: "Credit explained trade, other causes and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a description by a fictional Arab merchant of a port on the coast, written in the fourteenth century",
        "The ships come in with the wind from the north and bring cloth and beads. The merchants of the town buy gold which is brought down by traders from the interior, whose king takes his share. I have never seen the country where the gold is dug."),
      "",
      source("Source B", "a report by a fictional archaeologist on finds from an excavation on the plateau",
        "In the layer dated to the fourteenth century we found fragments of a Chinese bowl, two Persian dishes, many glass beads and a copper coin of the coastal city. Cattle bones were far more numerous than any other finds."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about how gold reached the coast?", points: ["It was brought down by traders from the interior", "The king of the interior took a share"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How do the sources support each other as evidence of the trade?", points: [["A says cloth and beads were brought by ship and gold came from the interior; B finds beads and imported ceramics in the interior", 2], ["Both are from the fourteenth century, one from the coast and one from the plateau, showing exchange in both directions", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far do the sources show that trade was the basis of the plateau's wealth? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["Support: A shows the gold trade and the king's share; B shows imported luxury goods", 2], ["Challenge: B finds that cattle bones are far more numerous, suggesting a cattle economy; A does not know the interior", 2], ["Judgement with own knowledge: cattle, farming and tribute formed the base while trade added prestige goods", 2]], modelAnswer: "The sources partly support the claim. Source A shows that gold was an important export and that the king took a share, and Source B shows imported luxury goods at a plateau site. However, Source B also finds that cattle bones were far more numerous than any other finds, which suggests that the everyday economy rested on cattle, and the Arab merchant in Source A has never seen the interior and cannot tell us about its economy. My own knowledge of the importance of cattle, farming and tribute in Great Zimbabwe agrees with this. Trade added wealth and prestige goods, but it was not the whole basis of the plateau's wealth." }),
    ],
    hints: ["For (c), contrast what each source shows about trade with what it shows about cattle."],
    explanation: "Both sources are invented: an Arab merchant's description and an archaeologist's report.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the impact of the Indian Ocean trade on the societies of the Zimbabwe plateau.",
    levels: levels(8),
    points: [
      ["Wealth and power for rulers; imported prestige goods; state formation and social division", 2],
      ["Mining and craft work expanded; new goods and contacts; some Muslim traders at courts", 2],
      ["Limits and risks: dependence on routes, benefits mostly to the elite, little change to farming base, Islam spread little in the interior", 2],
      ["Judgement on overall importance", 2],
    ],
    hints: ["Cover political, economic and social effects and then limits."],
    modelAnswer: "The Indian Ocean trade had a major impact on the plateau. It enriched the rulers of Mapungubwe and Great Zimbabwe, who used imported cloth, beads and porcelain to reward followers and display their status, and so it helped the growth of centralised states and the division between the elite and the commoners. It encouraged gold mining and craft work and brought new goods and contacts. However, there were limits and risks. The benefits went mostly to the elite, the farming and cattle basis of life changed little, Islam and Swahili culture spread little inland, and states that depended on trade were vulnerable when routes shifted north. Overall the trade was an important stimulus to state formation, but it worked on foundations that were local.",
    explanation: "Credit specific effects, limits and a supported judgement.",
  });

  b.card("DEFINITION", "What is the Swahili coast?", "The East African coast from Somalia to Mozambique, with port cities such as Kilwa, Mombasa and Sofala, where African and Muslim traders created a mixed culture.");
  b.card("DEFINITION", "What is a monsoon?", "A seasonal wind of the Indian Ocean (north-east in winter, south-west in summer) that let ships sail out and return.");
  b.card("DEFINITION", "What is a middleman in trade?", "A trader who buys from producers and sells to other merchants, like the Swahili and interior traders who carried gold to the coast.");
  b.card("FACT", "What was the main port for the plateau's gold?", "Sofala, on the Mozambique coast.");
  b.card("FACT", "Which imported goods have been found at Great Zimbabwe?", "Chinese celadon, Persian pottery, glass beads and Kilwa copper coins.");
  b.card("FACT", "When did Ibn Battuta visit Kilwa?", "1331.");
  b.card("CONCEPT", "What did the plateau export and import?", "Exports: gold, ivory, copper, skins. Imports: cotton cloth, glass beads, porcelain and glazed pottery.");
  b.card("CONCEPT", "How did the Indian Ocean trade strengthen rulers?", "They controlled gold and ivory and used imported prestige goods to reward followers and show status.");
  b.card("CONCEPT", "What risks did dependence on the Indian Ocean trade bring?", "States were vulnerable if routes shifted, the benefits went mostly to the elite, and the farming base changed little.");
});
