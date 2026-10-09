// W1a: hist.precolonial.great-zimbabwe (ZIMSEC 4.2).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.precolonial.great-zimbabwe", { file: "precolonial/great-zimbabwe", keyPrefix: "precolonial.great-zimbabwe" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the Shona phrase *dzimba dza mabwe*, from which the name Zimbabwe comes, mean?",
    options: [
      ["Houses of stone", "Correct: dzimba (houses) dza mabwe (of stone)."],
      ["Land of the rising sun and the great river", "This is not the meaning of the phrase."],
      ["The place where the chiefs meet to judge cases", "The phrase refers to stone buildings."],
      ["The hill of the ancestors who bring the rain", "The hill had religious importance, but the phrase means houses of stone."],
    ],
    answer: "A",
    explanation: "Zimbabwe comes from *dzimba dza mabwe*, 'houses of stone'. Independent Zimbabwe took its name from the site in 1980.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "On which river was **Mapungubwe**, the forerunner of Great Zimbabwe, situated?",
    options: [
      ["Limpopo", "Correct: Mapungubwe is on the Limpopo near its meeting with the Shashe."],
      ["Zambezi", "The Zambezi is far to the north; later trade shifted towards it."],
      ["Save", "The Save flows to the east of the plateau; Mapungubwe was on the Limpopo."],
      ["Nile", "The Nile is in north-east Africa, the river of ancient Egypt."],
    ],
    answer: "A",
    explanation: "Mapungubwe (c. 1220-1290 CE) lies on the south bank of the Limpopo, near where South Africa, Zimbabwe and Botswana meet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At Mapungubwe the ruler and elite lived on top of a hill while commoners lived below. This is evidence of…",
    options: [
      ["social differentiation", "Correct: the elite were separated from commoners by wealth, status and where they lived."],
      ["a democratic system in which all people were equal", "The separation shows inequality, not equality."],
      ["the arrival of Portuguese traders on the plateau", "The Portuguese did not reach the region until the sixteenth century."],
      ["a hunter-gatherer way of life with no permanent homes", "Mapungubwe was a settled farming and trading state."],
    ],
    answer: "A",
    explanation: "Social differentiation means a division into groups with different wealth and status, shown at Mapungubwe by the hilltop elite and the gold objects in their graves.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which part of Great Zimbabwe contains the solid **conical tower**?",
    options: [
      ["The Great Enclosure", "Correct: the conical tower stands inside the Great Enclosure in the valley."],
      ["The Hill Complex, on the granite hill above the valley", "The Hill Complex is the older hilltop site, built among boulders."],
      ["The Valley Ruins, between the hill and the enclosure", "The Valley Ruins are smaller, later enclosures."],
      ["The trading fair at Sofala on the coast", "Sofala was a coastal port, not part of Great Zimbabwe."],
    ],
    answer: "A",
    explanation: "The Great Enclosure (about 250 m around, up to about 11 m high) contains the conical tower; the Hill Complex is the older royal and religious centre.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Through which coastal port did Great Zimbabwe's gold and ivory mainly pass on the way to Kilwa?",
    options: [
      ["Sofala", "Correct: Sofala was the main outlet for the gold of the plateau."],
      ["Cape Town, at the southern tip of Africa", "Cape Town was founded by the Dutch in 1652, long after Great Zimbabwe declined."],
      ["Alexandria, on the Mediterranean coast", "Alexandria is in Egypt, far from Zimbabwe's trade routes."],
      ["Luanda, on the Atlantic coast", "Luanda is on the Atlantic; Great Zimbabwe traded with the Indian Ocean coast."],
    ],
    answer: "A",
    explanation: "Gold and ivory went to Sofala and on to Kilwa; imports included glass beads, cloth, Chinese porcelain and Persian pottery.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What do many historians think the **soapstone birds** found at Great Zimbabwe represent?",
    options: [
      ["Royal ancestors", "Correct: most were found in the Hill Complex and are often interpreted as symbols of royal ancestral spirits."],
      ["Animals that were sold to traders from the coast", "The birds are carved symbols, not trade animals."],
      ["Gods brought to the site by the Queen of Sheba", "This repeats a colonial myth; the site is African."],
      ["Toys made for the children of commoners in the valley", "They were found mainly in the royal Hill Complex and are linked with religion."],
    ],
    answer: "A",
    hints: ["Where were most of the birds found?", "What was the religious role of the king?"],
    explanation: "Eight soapstone birds were found, most in the Hill Complex. They are often interpreted as representing royal ancestors; one is now on Zimbabwe's flag and coat of arms.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which archaeologist's excavations in **1929** confirmed that Great Zimbabwe was built by Africans?",
    options: [
      ["Gertrude Caton-Thompson", "Correct: her 1929 excavations confirmed Randall-MacIver's conclusion."],
      ["Karl Mauch", "Mauch visited in 1871 and wrongly linked the site to the Queen of Sheba."],
      ["Richard Hall", "Hall's digging in the early 1900s destroyed much evidence."],
      ["Raymond Dart", "Dart studied the Taung child skull, not Great Zimbabwe."],
    ],
    answer: "A",
    hints: ["The archaeologist was a woman who confirmed the findings of 1905."],
    explanation: "David Randall-MacIver (1905) and Gertrude Caton-Thompson (1929) showed the site was African and medieval; radiocarbon dating later confirmed it.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A copper coin of a ruler of Kilwa was found at Great Zimbabwe. What does this find **best** show?",
    options: [
      ["Great Zimbabwe had trade links with the Swahili coast", "Correct: the coin came from the coast through trade."],
      ["Kilwa's rulers built Great Zimbabwe for themselves", "A coin shows contact; it does not show who built the site, and archaeology shows the builders were local."],
      ["Great Zimbabwe used coins for all its local trade", "One coin does not show a local money economy; cattle and goods were the usual measures of wealth."],
      ["The people of Great Zimbabwe could not make metal objects", "They worked gold, copper and iron; the coin is an import."],
    ],
    answer: "A",
    hints: ["Kilwa was a Swahili city on the East African coast.", "How could its coin have reached the plateau?"],
    explanation: "Imported goods such as the Kilwa coin, glass beads and Chinese porcelain are evidence of long-distance trade with the coast.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the **decline** of Great Zimbabwe is most accurate?",
    options: [
      ["Historians offer several theories, and many think several causes combined", "Correct: the decline is debated; no single cause is proven."],
      ["It was destroyed in a single battle with the Portuguese", "The Portuguese arrived after the decline and never attacked Great Zimbabwe."],
      ["Written records prove that a famine killed every inhabitant", "There are no such records; the evidence is archaeological and oral."],
      ["It declined because the Ndebele state conquered it", "The Ndebele arrived in the nineteenth century, four centuries later."],
    ],
    answer: "A",
    hints: ["Which option respects that the causes are debated?", "Check the dates of the Portuguese and the Ndebele."],
    explanation: "Theories include environmental exhaustion, a shift of trade routes northwards, succession disputes and shortages of salt; most historians see several causes together.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The walls of Great Zimbabwe were built without mortar.",
    answer: true,
    explanation: "True. They are dry-stone walls: shaped granite blocks fitted together without mortar.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Most of the population of Great Zimbabwe lived inside the stone walls.",
    answer: false,
    explanation: "False. The stone enclosures were for the king and elite; most people lived in pole-and-daga huts outside the walls.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each part of Great Zimbabwe with its description.",
    pairs: [
      ["Hill Complex", "Oldest part, built among boulders on a granite hill"],
      ["Great Enclosure", "Huge oval wall with a conical tower inside"],
      ["Valley Ruins", "Smaller, later enclosures for members of the elite"],
      ["Commoners' homes", "Pole-and-daga huts outside the walls"],
    ],
    explanation: "The stone buildings reflect the social order: the ruler on the hill, the elite in the enclosures, and most people in huts outside.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each theory of decline with the evidence that supports it.",
    pairs: [
      ["Environmental exhaustion", "A large population lived at the site for centuries"],
      ["Shift of trade routes", "Trade and power moved north towards the Zambezi"],
      ["Shortage of salt", "Traditions say Mutota left to search for salt"],
      ["Succession disputes", "Royal quarrels divided the ruling family"],
    ],
    hints: ["Each theory points to a different kind of problem: land, trade, resources or politics."],
    explanation: "Each theory rests on different evidence; historians weigh them together.",
  });
  {
    // Chronological order (earliest first): Mapungubwe c. 1220; Great Zimbabwe height 1300s; decline c. 1450; Mauch 1871.
    const events = [
      "Mapungubwe becomes the capital of a trading state",
      "The Great Enclosure is built at the height of Great Zimbabwe",
      "Great Zimbabwe declines and power shifts north and south-west",
      "Karl Mauch visits the ruins and links them to the Queen of Sheba",
    ];
    const order = [1, 3, 0, 2];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Mapungubwe was the forerunner.", "A European visitor saw the ruins only after the state had declined."],
      explanation: "Mapungubwe (c. 1220-1290), Great Zimbabwe at its height (fourteenth century), decline (fifteenth century), Mauch's visit (1871).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The small gold animal found in a royal grave at Mapungubwe is a {{blank:a}}. Great Zimbabwe became a UNESCO World Heritage Site in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["rhinoceros"], choices: ["rhinoceros", "lion", "eagle", "crocodile"] },
      { id: "b", accepted: ["1986"], choices: ["1965", "1980", "1986", "2003"] },
    ],
    explanation: "The golden rhinoceros of Mapungubwe is its most famous object. Great Zimbabwe was listed in 1986 (Mapungubwe in 2003).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the God worshipped by the people of Great Zimbabwe, according to Shona religion.",
    accepted: ["Mwari", "Mwali", "Musikavanhu", "Nyadenga"],
    wrong: ["Ra", "Chaminuka"],
    explanation: "**Mwari** (also Mwali; praised as Musikavanhu, creator of people) is the God of Shona religion; people also honoured ancestral spirits.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 5,
    stem: "State **five** factors that led to the rise of the Great Zimbabwe state.",
    points: [
      "Large herds of cattle (wealth)",
      "Agriculture on fertile soils with good rainfall",
      "Control of the gold and ivory trade with the coast",
      "A good location (granite, water, wood, grazing, free of tsetse)",
      "Religion / strong leadership (the king's link with ancestors and rain-making)",
    ],
    modelAnswer: "Cattle-keeping created wealth; agriculture fed a large population; the rulers controlled the gold and ivory trade with Sofala and Kilwa; the site had granite, water, wood and tsetse-free grazing; and the king's religious authority and strong leadership kept the state united.",
    explanation: "One mark per factor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the economic organisation of the Great Zimbabwe state.",
    points: [
      "Cattle-keeping was the main form of wealth",
      "Crop farming (sorghum, millet)",
      "Gold mining and panning / copper and iron working",
      "Long-distance trade: gold and ivory exchanged for beads, cloth, porcelain via Sofala and Kilwa",
      "Tribute in cattle, ivory, gold and grain paid to the king",
      "Crafts: spinning cotton, pottery, soapstone carving; local trade in salt and iron",
    ],
    hints: ["Think about how wealth was produced, collected and exchanged."],
    modelAnswer: "The economy rested on cattle, the main form of wealth, and on growing sorghum and millet. People mined and panned gold and worked copper and iron. Gold and ivory were traded through Sofala to Kilwa for glass beads, cloth and Chinese porcelain. Provincial chiefs and subjects paid tribute in cattle, ivory, gold and grain to the king. Craftsmen spun cotton, made pottery and carved soapstone, and salt and iron were traded locally.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Explain how colonial-era myths about Great Zimbabwe were disproved.",
    points: [
      ["Settlers and explorers (e.g. Mauch, 1871) credited outsiders such as the Queen of Sheba or Phoenicians, partly to justify colonial rule", 2],
      ["Excavations by Randall-MacIver (1905) and Caton-Thompson (1929) showed the pottery, objects and building style were African and medieval", 2],
      ["Radiocarbon dating and later research confirmed the dates; the builders were the ancestors of the Shona", 2],
    ],
    hints: ["Who made the false claims and why?", "Which kinds of evidence answered them?"],
    modelAnswer: "From the 1870s, visitors such as Karl Mauch claimed that the ruins were built by outsiders such as the Queen of Sheba or Phoenicians. This suited colonial settlers, who wanted to believe Africans had no great history. Archaeology disproved the myths: Randall-MacIver in 1905 and Caton-Thompson in 1929 found that the pottery, objects and building style were African and medieval. Later radiocarbon dating confirmed the dates. The evidence shows that the builders were the ancestors of the Shona.",
    explanation: "Explain both the myth (and its purpose) and the evidence that refuted it.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "a passage from a fictional guidebook for European visitors, printed in Salisbury in 1910",
          "These mighty walls cannot be the work of the natives of today, who live in simple huts. Surely some ancient race from the north, skilled in building, raised them and then vanished."),
        source("Source B", "a summary written by a fictional university lecturer for her students in 1995",
          "The pottery, the iron and gold objects and the style of the walls at Great Zimbabwe match those of other Shona sites. Radiocarbon dates place its height between the thirteenth and fifteenth centuries. Its builders were the ancestors of the Shona."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A claim about the builders of Great Zimbabwe?", points: ["The builders were not local Africans", "An ancient race from the north built the walls and vanished"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Why might the author of Source A have held this view?", points: [["Written for European visitors in colonial Southern Rhodesia, where settlers believed Africans had no history of achievement", 2], ["Such myths justified colonial rule / the author judged by the huts of the time and ignored evidence", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source is more reliable about who built Great Zimbabwe? Explain your answer.", type: "EXTENDED_RESPONSE", points: [["Source A: no evidence given, only assumption; colonial purpose and audience", 2], ["Source B: based on archaeological evidence (pottery, objects, building style) and radiocarbon dating", 2], ["Judgement supported by own knowledge (Randall-MacIver 1905, Caton-Thompson 1929)", 2]], levels: levels(6), modelAnswer: "Source B is more reliable. Source A gives no evidence at all: it assumes that because Africans lived in huts in 1910 they could not have built the walls, and it was written for European visitors at a time when settlers wanted to believe Africans had no history. Source B is based on evidence: the pottery, objects and walls match other Shona sites, and radiocarbon dating gives the thirteenth to fifteenth centuries. This agrees with the excavations of Randall-MacIver in 1905 and Caton-Thompson in 1929, which showed the builders were African." }),
    ],
    hints: ["Does Source A give any evidence for its claim?", "What kinds of evidence does Source B use?"],
    explanation: "Reliability depends on evidence and purpose: A is an unsupported colonial assumption; B uses archaeology and dating that match own knowledge.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the Great Zimbabwe state.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the political organisation of the Great Zimbabwe state.", points: ["The king was political, military and religious head", "He lived in the Hill Complex and ruled with a council of advisers and relatives", "Provincial chiefs governed outlying areas", "Chiefs paid tribute to the capital (many smaller stone-walled centres across the plateau)"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** reasons why Great Zimbabwe declined.", points: [["Environmental exhaustion: the large population used up firewood, grazing and soil", 2], ["Shift of trade routes northwards to the Zambezi / succession disputes / salt shortage", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Trade was the main reason for the rise of Great Zimbabwe.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: control of the gold and ivory trade with the coast brought wealth and imports that rulers used to reward followers", 2], ["Against: cattle, agriculture, a good location and religious authority were also essential; trade depended on them", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Trade was very important. By controlling the gold and ivory trade through Sofala to Kilwa, the rulers gained glass beads, cloth and porcelain to reward loyal chiefs, and the shift of trade away later helped cause the decline. However, other factors were just as necessary. Cattle were the main form of wealth, farming fed a large population, the site had granite, water and tsetse-free grazing, and the king's religious role made his rule accepted. Trade made Great Zimbabwe rich, but it could only develop because of these foundations, so trade was one of several main reasons rather than the only one." }),
    ],
    hints: ["In (c), weigh trade against cattle, agriculture, location and religion."],
    explanation: "A good answer to (c) shows how trade interacted with other factors and reaches a judgement.",
  });

  b.card("FACT", "What does *dzimba dza mabwe* mean?", "Houses of stone: the origin of the name Zimbabwe.");
  b.card("FACT", "When did Mapungubwe flourish?", "About 1220-1290 CE, on the Limpopo near the Shashe confluence.");
  b.card("FACT", "What famous gold object was found at Mapungubwe?", "A small golden rhinoceros, in a royal grave on the hilltop.");
  b.card("FACT", "When was Great Zimbabwe at its height?", "About the thirteenth to fifteenth centuries; it declined in the fifteenth century.");
  b.card("FACT", "Name the three main parts of Great Zimbabwe.", "Hill Complex, Great Enclosure (with the conical tower), Valley Ruins.");
  b.card("DEFINITION", "What is **dry-stone walling**?", "Building with shaped stone blocks fitted together without mortar.");
  b.card("CONCEPT", "Name four factors in the rise of Great Zimbabwe.", "Cattle, agriculture, control of the gold and ivory trade with the coast, good location, religion and leadership.");
  b.card("CONCEPT", "Theories of Great Zimbabwe's decline?", "Environmental exhaustion; shift of trade routes north; succession disputes; salt shortage; drought.");
  b.card("FACT", "Who proved Great Zimbabwe was African-built?", "David Randall-MacIver (1905) and Gertrude Caton-Thompson (1929); later radiocarbon dating confirmed it.");
  b.card("DEFINITION", "What is **tribute**?", "Payments in goods or labour by subjects or conquered chiefs to a ruler, showing loyalty.");
});
