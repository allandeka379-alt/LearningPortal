// W2b: Great Zimbabwe and the Mutapa state (her.precolonial.great-zimbabwe-mutapa).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.precolonial.great-zimbabwe-mutapa", { file: "precolonial/great-zimbabwe-mutapa", keyPrefix: "precolonial.great-zimbabwe-mutapa" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the name **Zimbabwe** come from?",
    options: [
      ["The Shona phrase dzimba dza mabwe, houses of stone", "Correct: the name refers to the stone buildings."],
      ["The name of the first Portuguese trader in the area", "The name is Shona in origin, not Portuguese."],
      ["A Ndebele word meaning the land of many rivers", "The name comes from Shona and refers to stone houses."],
      ["The name of a British fort built in 1890", "The forts of 1890 had English names such as Fort Salisbury."],
    ],
    answer: "A",
    explanation: "Zimbabwe comes from dzimba dza mabwe, houses of stone, such as Great Zimbabwe.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Near which modern town is Great Zimbabwe found?",
    options: [
      ["Masvingo", "Correct: Great Zimbabwe is about 30 km from Masvingo."],
      ["Bulawayo", "Khami, the Torwa capital, is near Bulawayo."],
      ["Mutare", "Mutare is in the eastern highlands."],
      ["Kariba", "Kariba is on the Zambezi in the north."],
    ],
    answer: "A",
    explanation: "Great Zimbabwe is in Masvingo Province.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which goods did Great Zimbabwe mainly **export** to the East African coast?",
    options: [
      ["Gold and ivory", "Correct: gold and ivory were exchanged for beads, cloth and pottery."],
      ["Glass beads and cloth", "These were imports from the coast."],
      ["Tobacco and cotton", "These were not the main exports of the period."],
      ["Chinese porcelain", "Porcelain was an import found at the site."],
    ],
    answer: "A",
    explanation: "Gold and ivory went out; glass beads, cloth, and Chinese and Persian pottery came in.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What was the title of the ruler of the Mutapa state?",
    options: [
      ["Mwenemutapa", "Correct: the state takes its name from the ruler's title."],
      ["Changamire", "Changamire is linked with Dombo, founder of the Rozvi state."],
      ["Inkosi", "Inkosi is the Ndebele word for king or chief."],
      ["Sabhuku", "A sabhuku is a village head."],
    ],
    answer: "A",
    explanation: "The ruler was the Mwenemutapa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the role of **mhondoro** spirit mediums in the Mutapa state?",
    options: [
      ["They spoke for royal ancestors and advised the ruler", "Correct: they advised rulers and helped confirm successors."],
      ["They commanded the army in battle against the Rozvi in the 1680s", "Commanding the army was not their main role."],
      ["They collected customs duties at Portuguese fairs", "Mediums were religious figures, not customs officials."],
      ["They built the stone walls of the capital", "Building was done by labourers and builders."],
    ],
    answer: "A",
    explanation: "Mhondoro mediums spoke for the royal ancestors, advised rulers and could criticise unfair rule.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Chinese porcelain was found at Great Zimbabwe. What does this **best** show?",
    options: [
      ["Great Zimbabwe was linked to Indian Ocean trade networks", "Correct: goods reached it through coastal trade."],
      ["Chinese builders constructed the Great Enclosure", "Foreign goods show trade, not foreign builders."],
      ["The people of Great Zimbabwe travelled to China to buy pots", "The goods came through coastal merchants."],
      ["Great Zimbabwe was a colony of a foreign empire", "There is no evidence of foreign rule."],
    ],
    answer: "A",
    hints: ["Imported goods tell us about trade, not about who built the city."],
    explanation: "Imported goods show trade through Swahili coastal towns; the city was built by the ancestors of the Shona.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the decline of Great Zimbabwe is **most accurate**?",
    options: [
      ["Historians offer several theories, such as exhaustion of resources", "Correct: the causes are theories, and several may have worked together."],
      ["It was destroyed by the Pioneer Column in 1890", "Great Zimbabwe had declined centuries earlier, by the 1400s."],
      ["A written royal record explains exactly why it ended", "There is no written record of its decline."],
      ["It declined because the Ndebele state conquered it", "The Ndebele arrived in the 1830s, long after its decline."],
    ],
    answer: "A",
    hints: ["Is there a written record?"],
    explanation: "Theories include exhaustion of resources, a shift in trade, drought and succession disputes.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which factor **most weakened** the Mwenemutapa's authority during the 1600s?",
    options: [
      ["Civil wars in which the Portuguese backed rival claimants", "Correct: succession wars and Portuguese interference weakened the ruler."],
      ["The arrival of the Pioneer Column at Fort Salisbury", "This happened in 1890."],
      ["The Berlin Conference rules on effective occupation", "The Berlin Conference was in 1884-85."],
      ["Attacks by the Ndebele regiments of Mzilikazi", "The Ndebele arrived in the late 1830s."],
    ],
    answer: "A",
    hints: ["Check the dates of each option."],
    explanation: "In the 1600s rival claimants fought for the throne and the Portuguese supported some of them in return for concessions.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The walls of Great Zimbabwe were built without mortar.",
    answer: true,
    explanation: "True. They are dry-stone walls of shaped granite blocks.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Great Zimbabwe and the Mutapa state were both centred near the Zambezi River.",
    answer: false,
    explanation: "False. Great Zimbabwe was near Masvingo in the south; the Mutapa state was in the north near the Zambezi.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Tribute", "Goods or labour given to a ruler as a sign of loyalty"],
      ["Mhondoro", "Spirits of royal ancestors who guard the land"],
      ["Great Enclosure", "Large walled structure with a conical tower"],
      ["Mwenemutapa", "Title of the ruler of the Mutapa state"],
    ],
    explanation: "Key terms for the Later Iron Age states.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "According to tradition, the Mutapa state was founded by {{blank:a}}. In the late 1600s the {{blank:b}} under Changamire Dombo became the dominant power on the plateau.",
    blanks: [
      { id: "a", accepted: ["Nyatsimba Mutota"], choices: ["Nyatsimba Mutota", "Mzilikazi", "Lobengula", "Kaguvi"] },
      { id: "b", accepted: ["Rozvi"], choices: ["Rozvi", "Portuguese", "Ndebele", "San"] },
    ],
    explanation: "Mutota (tradition) founded the Mutapa state; the Rozvi under Changamire Dombo later rose.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which European people traded with the Mutapa state from the sixteenth century?",
    accepted: ["the Portuguese", "Portuguese"],
    wrong: ["the British", "the Dutch"],
    explanation: "The **Portuguese** came for gold and ivory and set up trading fairs.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** economic activities of the people of Great Zimbabwe.",
    points: ["One, e.g. cattle keeping", "A second, e.g. crop farming / gold mining", "A third, e.g. trade with the coast / crafts such as iron working, soapstone carving and weaving"],
    modelAnswer: "Cattle keeping, gold mining and long-distance trade.",
    explanation: "One mark per activity.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors that helped Great Zimbabwe to rise.",
    points: [
      "Cattle / good grazing",
      "Developed: cattle were wealth, allowing rulers to win followers",
      "Control of the gold and ivory trade",
      "Developed: rulers became rich from trade with the coast and could organise building and labour",
    ],
    modelAnswer: "The area had good grazing for cattle, which were the main form of wealth, so rulers who owned many cattle could win followers. Rulers also controlled the export of gold and ivory to the coast, which gave them wealth to organise labour and build the stone walls.",
    hints: ["Wealth: from where?"],
    explanation: "Two marks per developed factor.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **three** reasons why the Mutapa state declined.",
    points: [
      "Civil wars / succession disputes",
      "Developed: rival members of the royal family fought, weakening the ruler",
      "Portuguese interference",
      "Developed: support for rival claimants in return for concessions reduced the ruler's authority",
      "Rise of the Rozvi / breakaway provinces",
      "Developed: provinces stopped paying tribute; the Rozvi became dominant in the late 1600s",
    ],
    modelAnswer: "Rival members of the royal family fought civil wars over succession, which weakened the state. The Portuguese supported some claimants in return for land and trade concessions, so the Mwenemutapa lost authority. Distant provinces stopped paying tribute, and in the late 1600s the Rozvi under Changamire Dombo became the dominant power.",
    hints: ["Internal and external causes."],
    explanation: "Two marks per developed reason.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: source("Source A", "a guide's talk at Great Zimbabwe, written for a fictional school trip from Gweru, 2026",
      "Look at the Great Enclosure. These walls were built of granite blocks without mortar, and the patterns near the top took great skill. Over there, on the hill, is where the rulers are believed to have lived and held ceremonies. Archaeologists found glass beads and pieces of Chinese porcelain here, and soapstone birds that are now national symbols."),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which part of Source A is evidence of **trade**?",
        options: [
          ["Glass beads and pieces of Chinese porcelain", "Correct: these were imported goods."],
          ["Walls built without mortar", "This shows building skill, not trade."],
          ["The ceremonies held on the hill", "This shows religion and royal power."],
          ["The chevron patterns near the top of the walls", "This shows craftsmanship."],
        ],
        answer: "A",
        explanation: "Beads and porcelain came from far away through coastal trade.",
      }),
      P.short({
        label: "(b)", marks: 1,
        stem: "Name the national symbol, carved from soapstone, mentioned in Source A.",
        accepted: ["Zimbabwe Bird", "the Zimbabwe Bird", "Zimbabwe Birds", "soapstone bird"],
        wrong: ["eagle"],
        explanation: "The **Zimbabwe Bird** appears on the national flag and coat of arms.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **three** things Source A suggests about how Great Zimbabwe was organised.",
        points: [
          "Strong rulers able to organise labour",
          "Developed: building huge stone walls needed many workers and planning",
          "Rulers had religious authority",
          "Developed: the hill was used for ceremonies, linking rulers with ancestors",
          "Wealth from trade",
          "Developed: imported beads and porcelain show rulers controlled trade with the coast",
        ],
        modelAnswer: "The huge mortarless walls suggest strong rulers who could organise many skilled workers. The hill used for ceremonies suggests the rulers had religious authority linked with the ancestors. The imported beads and porcelain suggest the rulers controlled long-distance trade with the coast.",
      }),
    ],
    hints: ["Link each detail in the source to political, religious or economic organisation."],
    explanation: "Using a source on Great Zimbabwe.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on the decline of Great Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** theories about why Great Zimbabwe declined.",
        points: [
          "Exhaustion of resources",
          "grazing, firewood, soils or salt around the large settlement may have run out",
          "Shift in trade / drought / succession disputes",
          "e.g. gold trade moved north to the Zambezi valley, reducing the rulers' wealth",
        ],
        modelAnswer: "One theory is that the large population used up the grazing, firewood, soils and salt around the city. Another is that the gold trade shifted north to the Zambezi valley, so the rulers lost wealth.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Exhaustion of resources was the main reason for the decline of Great Zimbabwe.\" How far do you agree?",
        points: [
          ["For: a large population and herds would have used up grazing, wood, soil and salt", 2],
          ["Against: a shift of the gold trade towards the Zambezi reduced the rulers' wealth", 2],
          ["Against: drought and succession disputes may also have played a part; there is no written evidence", 2],
          ["Supported judgement (e.g. several causes together)", 2],
        ],
        levels: levels(8),
        modelAnswer: "Exhaustion of resources is a strong theory. Great Zimbabwe supported a large population and many cattle, which would have used up nearby grazing, firewood, fertile soil and salt.\n\nHowever, other theories are also convincing. Trade in gold may have shifted north towards the Zambezi, where the Mutapa state rose, so the rulers of Great Zimbabwe lost wealth and followers. Drought and disputes over succession may also have weakened the state. Because there are no written records, historians cannot be certain.\n\nI agree only partly: exhaustion of resources was probably important, but it most likely worked together with the shift in trade and other pressures.",
      }),
    ],
    hints: ["Weigh each theory, then judge."],
    explanation: "Describe (a) and evaluate (b) theories of decline.",
  });

  b.card("FACT", "What does Zimbabwe mean?", "From dzimba dza mabwe: houses of stone.");
  b.card("FACT", "When was Great Zimbabwe at its height (approx.)?", "About 1300-1450 CE.");
  b.card("DEFINITION", "Tribute", "Goods or labour given to a ruler by subject chiefs and people as a sign of loyalty.");
  b.card("DEFINITION", "Dry-stone walling", "Building walls of shaped stone blocks without mortar.");
  b.card("DEFINITION", "Mhondoro", "Spirits of royal ancestors (lion spirits) who guard the land, speaking through mediums.");
  b.card("FACT", "Founder of the Mutapa state in tradition?", "Nyatsimba Mutota; his son Matope expanded it.");
  b.card("FACT", "Exports and imports of Great Zimbabwe?", "Exports: gold and ivory. Imports: glass beads, cloth, Chinese and Persian pottery.");
  b.card("CONCEPT", "Name three theories for the decline of Great Zimbabwe.", "Exhaustion of resources; shift in the gold trade to the north; drought; succession disputes.");
  b.card("CONCEPT", "Why did the Mutapa state decline?", "Civil wars over succession, Portuguese interference, breakaway provinces and the rise of the Rozvi.");
});
