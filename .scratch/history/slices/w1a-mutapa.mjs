// W1a: hist.precolonial.mutapa (ZIMSEC 4.3).
import { concept, P, source, sources, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.precolonial.mutapa", { file: "precolonial/mutapa", keyPrefix: "precolonial.mutapa" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "According to oral tradition, who founded the Mutapa state?",
    options: [
      ["Nyatsimba Mutota", "Correct: tradition says Mutota moved north from the Great Zimbabwe area and conquered the Dande."],
      ["Changamire Dombo, the leader of the Rozvi", "Dombo founded the Rozvi state in the later seventeenth century."],
      ["Mzilikazi, who led the Ndebele north from the Transvaal", "Mzilikazi founded the Ndebele state in the nineteenth century."],
      ["Gonçalo da Silveira, the Jesuit missionary", "Silveira was a Portuguese missionary killed at the Mutapa court in 1561."],
    ],
    answer: "A",
    explanation: "Tradition credits Nyatsimba Mutota with founding the state in the fifteenth century; his son Matope expanded it.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which son of Mutota is said to have **expanded** the Mutapa state eastwards towards the coast?",
    options: [
      ["Matope", "Correct: tradition says Matope extended the state towards the coast."],
      ["Mavhura, the king who signed the treaty of 1629", "Mavhura ruled in the seventeenth century and became a Portuguese vassal."],
      ["Gatsi Rusere, who asked the Portuguese for help", "Gatsi Rusere ruled around 1600 and faced rebellions."],
      ["Lobengula, the last king of the Ndebele", "Lobengula was the Ndebele king of the late nineteenth century."],
    ],
    answer: "A",
    explanation: "Mutota founded the state; Matope expanded it. Gatsi Rusere and Mavhura are later kings linked with Portuguese influence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the role of the **mhondoro** spirit mediums in the Mutapa state?",
    options: [
      ["They advised the king and helped choose successors", "Correct: royal ancestral spirits spoke through them, so they had great influence."],
      ["They collected customs duties from Portuguese traders at the fairs", "Trade was supervised by royal officials; mediums had religious and political roles."],
      ["They commanded the army in wars against the Rozvi", "Mediums were religious figures, not army commanders."],
      ["They built the stone walls of the capital", "The Mutapa capital was surrounded by a wooden palisade; mediums were religious leaders."],
    ],
    answer: "A",
    explanation: "Mhondoro mediums spoke for royal ancestors, advised the king, approved successions and led rain ceremonies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the **royal fire** symbolise in the Mutapa state?",
    options: [
      ["The king's authority over all chiefs", "Correct: tradition says chiefs relit their fires from it each year as a sign of loyalty."],
      ["The start of the hunting season for elephants in the valley", "The royal fire was a political and religious symbol."],
      ["The arrival of the Portuguese traders at the fairs each year", "The royal fire was much older than Portuguese contact."],
      ["The burning of the fields before the rains", "Burning fields was a farming practice, not the royal fire."],
    ],
    answer: "A",
    explanation: "The sacred royal fire was kept at the court; chiefs relighting their fires from it showed their loyalty to the Mutapa.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Mutapa **Gatsi Rusere** make concessions to the Portuguese?",
    options: [
      ["He needed their help against rebels", "Correct: facing rebellions, he promised access to the mines in return for Portuguese help."],
      ["He wanted to convert all his people to Christianity at once", "His motive was military help against rebels, not mass conversion."],
      ["The Portuguese had already conquered his capital in battle", "The Portuguese had not conquered the capital; he chose to ask for help."],
      ["He was paid by the Rozvi to invite the Portuguese onto the plateau", "The Rozvi later drove the Portuguese off the plateau."],
    ],
    answer: "A",
    hints: ["What problem did the king face inside his own state?"],
    explanation: "Civil war and rebellion made the Mutapa dependent on Portuguese guns; the price was concessions such as the mines (1607).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What did the treaty signed by Mutapa **Mavhura** with the Portuguese do?",
    options: [
      ["It made him a Portuguese vassal", "Correct: the 1629 treaty recognised Portuguese overlordship and gave them freedom to trade, preach and mine."],
      ["It expelled all Portuguese from the plateau for ever", "That happened under the Rozvi in the 1690s."],
      ["It united the Mutapa and Rozvi states under one king", "There was no such union; the Rozvi rose against Mutapa and Portuguese power."],
      ["It ended the gold trade between the plateau and the coast", "It gave the Portuguese greater access to gold, rather than ending the trade."],
    ],
    answer: "A",
    hints: ["The Portuguese had helped Mavhura to the throne. What did they want in return?"],
    explanation: "In 1629 the Portuguese helped Mavhura replace Kaparidze; he accepted Portuguese overlordship and opened the country to traders and missionaries.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **best** explains why civil wars and Portuguese interference together weakened the Mutapa state?",
    options: [
      ["Rival claimants sought Portuguese help, and each concession made the king weaker", "Correct: the two problems fed each other."],
      ["The Portuguese started every civil war themselves so that they could take over the state", "Succession disputes had African causes; the Portuguese exploited them."],
      ["Civil wars ended as soon as the Portuguese arrived at Sofala in the early sixteenth century", "Civil wars continued long after the Portuguese arrived."],
      ["The Portuguese supported the strongest king every time, so the state became stronger", "Their support came at the price of concessions that weakened the kings."],
    ],
    answer: "A",
    hints: ["Think of a cycle: division, outside help, concessions, more division."],
    explanation: "Internal divisions gave the Portuguese their opportunity, and their help came with concessions that further undermined the king's authority.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "How do historians treat the traditions about Nyatsimba Mutota's move north?",
    options: [
      ["They accept the broad outline but treat details with care", "Correct: archaeology and Portuguese writings support a fifteenth-century shift of power northwards."],
      ["They reject them completely because they are not written documents", "Oral traditions are important sources; they are tested, not rejected."],
      ["They accept every detail as exact, including the dates", "The dates and personal details are uncertain."],
      ["They believe Mutota was a Portuguese explorer", "Mutota was an African ruler; the Portuguese arrived later."],
    ],
    answer: "A",
    hints: ["What happens when different kinds of source agree?"],
    explanation: "Oral traditions are cross-checked with archaeology and documents; the outline is accepted while details remain uncertain.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Mutapa state was centred in northern Zimbabwe, towards the Zambezi valley.",
    answer: true,
    explanation: "True. Mutota conquered the Dande area south of the Zambezi, and the state stretched across northern Zimbabwe.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "For most of the sixteenth century the Portuguese controlled the Mutapa kings.",
    answer: false,
    explanation: "False. For most of the sixteenth century the Mutapa controlled trade and dealt with the Portuguese on African terms. Portuguese influence grew in the seventeenth century.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role.",
    pairs: [
      ["Nyatsimba Mutota", "Founder of the state, according to tradition"],
      ["Gatsi Rusere", "Mutapa who promised the mines to the Portuguese"],
      ["Mavhura", "Mutapa who became a Portuguese vassal"],
      ["Gonçalo da Silveira", "Jesuit missionary killed at the Mutapa court"],
    ],
    explanation: "Mutota (founder), Gatsi Rusere (1607 concessions), Mavhura (1629 vassal treaty), Silveira (killed 1561).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature of the Mutapa state with the area of organisation it belongs to.",
    pairs: [
      ["Provincial chiefs sending tribute and soldiers", "Political"],
      ["Gold panning and trade with Swahili merchants", "Economic"],
      ["Bridewealth paid in cattle at marriage", "Social"],
      ["Mhondoro mediums leading rain ceremonies", "Religious"],
    ],
    explanation: "Exam answers on organisation use these four headings: political, economic, social and religious.",
  });
  {
    const t = timeline([
      ["1505", "The Portuguese build a fort at Sofala"],
      ["1561", "Gonçalo da Silveira is killed at the Mutapa court"],
      ["1607", "Gatsi Rusere promises the mines to the Portuguese"],
      ["1629", "Mavhura signs a treaty as a Portuguese vassal"],
    ]);
    const order = [2, 0, 3, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["The Portuguese reached the coast before they sent missionaries inland.", "Gatsi Rusere ruled before Mavhura."],
      explanation: "Sofala fort (1505), Silveira killed (1561), Gatsi Rusere's concessions (1607), Mavhura's vassal treaty (1629).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mutota conquered the Tavara and Tonga of the {{blank:a}} area. The royal ancestral spirits that spoke through mediums were called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Dande"], choices: ["Dande", "Matobo", "Limpopo", "Gwaai"] },
      { id: "b", accepted: ["mhondoro"], choices: ["mhondoro", "izinduna", "prazeros", "achikunda"] },
    ],
    explanation: "Mutota's conquests were in the Dande, south of the Zambezi. Mhondoro are royal ancestral spirits. Izinduna were Ndebele officials; prazeros and achikunda belong to the prazo system.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Jesuit missionary who baptised the Mutapa and was then killed at his court in 1561.",
    accepted: ["Goncalo da Silveira", "Gonçalo da Silveira", "Silveira", "Father Silveira", "Gonzalo da Silveira", "Goncalo de Silveira", "Gonçalo de Silveira"],
    wrong: ["Francisco Barreto", "David Livingstone"],
    explanation: "**Gonçalo da Silveira**, a Portuguese Jesuit, baptised the Mutapa in 1561 but was killed soon afterwards; his death was the excuse for the Barreto expedition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the political organisation of the Mutapa state.",
    points: [
      "The Mutapa was the supreme ruler, believed to be close to the ancestors",
      "He had a court of officials: royal relatives, advisers, queen mother and senior wives, officers of the army and treasury",
      "Provincial chiefs (often relatives) ruled outlying areas",
      "Chiefs paid tribute and provided soldiers",
      "The royal fire symbolised the king's authority / mhondoro mediums advised on succession",
    ],
    hints: ["Start with the king, then the court, then the provinces."],
    modelAnswer: "The Mutapa was the supreme ruler, believed to be close to the royal ancestors. He governed through a court of royal relatives, advisers, the queen mother and senior wives, and officers in charge of the army and treasury. Provincial chiefs, often relatives, ruled outlying areas, paid tribute and supplied soldiers. Chiefs relit their fires from the royal fire each year as a sign of loyalty, and mhondoro mediums advised on succession.",
    explanation: "One mark per point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons for the rise of the Mutapa state.",
    points: [
      ["Control of trade: the Zambezi valley gave access to Swahili traders, so gold and ivory brought wealth", 2],
      ["Military conquest of the Tavara and Tonga / religious authority of the king through the mhondoro / fertile land and grazing", 2],
    ],
    hints: ["One economic reason and one political or religious reason."],
    modelAnswer: "First, the Zambezi valley gave the Mutapa access to Swahili traders, so the gold and ivory of the plateau could be traded for cloth and beads, making the rulers rich. Second, Mutota and Matope conquered neighbouring peoples such as the Tavara and Tonga, and the king's link with the royal mhondoro gave him spiritual authority, so subjects accepted his rule.",
    explanation: "Two marks per reason: identify and explain.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Mutapa state declined.",
    points: [
      ["Succession disputes and civil wars divided the ruling family and weakened central control", 2],
      ["Portuguese interference: treaties of 1607 and 1629, puppet kings, prazos, loss of control of trade and mines", 2],
      ["Provinces broke away and the Rozvi under Changamire Dombo took over the plateau / loss of trade income", 2],
    ],
    hints: ["Give at least one internal and one external cause."],
    modelAnswer: "The Mutapa state declined partly because of succession disputes and civil wars, which divided the royal family and weakened the king's control over the provinces. These divisions allowed the Portuguese to interfere: Gatsi Rusere promised them the mines in 1607, and in 1629 Mavhura became a Portuguese vassal, so traders and prazo holders took over land, trade and mining. Finally, provinces broke away and the Rozvi under Changamire Dombo took control of the plateau in the late seventeenth century, cutting the Mutapa off from much of its wealth.",
    explanation: "Each cause is explained; the best answers link internal weakness to Portuguese interference.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "a report by a fictional Portuguese captain at Sena to the viceroy, early seventeenth century",
          "The king of the Mutapa is beset by rebels and begs for our help. If we send soldiers with muskets he will grant us all the mines of his kingdom. This is the moment to make him our servant."),
        source("Source B", "a tradition recorded in the twentieth century from a fictional elder of the Dande",
          "The foreigners came as traders and the king fed them. But when the king's brothers fought him, the foreigners lent their guns, and afterwards they never went home."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "According to Source A, what did the Mutapa offer the Portuguese?", points: ["All the mines of his kingdom", "In return for soldiers with muskets to fight rebels"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about how the Portuguese gained influence?", points: ["Agree: the king faced rebels / family conflict", "Agree: the Portuguese gave military help (guns)", "Differ: A says the Portuguese planned to make him a servant; B presents them as traders who stayed", "Differ: A speaks of the mines; B does not mention them"] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable is each source as evidence of the reasons for the Mutapa state's decline?", type: "EXTENDED_RESPONSE", points: [["A: written at the time by a Portuguese captain; shows Portuguese aims honestly to his superior but only the Portuguese side and may exaggerate the king's weakness", 2], ["B: preserves an African view but recorded centuries later, so details may have changed", 2], ["Judgement using own knowledge (Gatsi Rusere 1607, Mavhura 1629): both are supported on civil war plus Portuguese interference", 2]], levels: levels(6), modelAnswer: "Source A was written at the time by a Portuguese captain to the viceroy, so it shows Portuguese aims frankly, but it gives only the Portuguese view and may exaggerate the king's weakness to encourage action. Source B gives an African view, but it was recorded centuries later, so details may have changed. Both agree with own knowledge: Gatsi Rusere faced rebels and promised the mines in 1607, and Mavhura became a vassal in 1629. Together they are reliable on the main point that civil war allowed Portuguese interference." }),
    ],
    hints: ["Who wrote A, and to whom?", "When was B recorded?"],
    explanation: "The sources differ in origin but agree on the key mechanism: internal division plus Portuguese military help.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the Mutapa state.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the economic organisation of the Mutapa state.", points: ["Agriculture: sorghum and millet", "Cattle-keeping as wealth", "Gold mining and panning / ivory hunting", "Trade with Swahili and Portuguese traders; tribute paid to the king"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain the importance of religion in the Mutapa state.", points: [["The king's link with royal ancestors (mhondoro) gave him spiritual authority, so subjects accepted his rule", 2], ["Mhondoro mediums advised kings and approved successors, so a king needed their support", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"The Portuguese were mainly responsible for the decline of the Mutapa state.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: treaties of 1607 and 1629, puppet kings, prazos, loss of trade and mines", 2], ["Against: succession disputes and civil wars came first; rise of the Rozvi; provinces breaking away", 2], ["Supported judgement linking the factors", 2]], levels: levels(6), modelAnswer: "The Portuguese played a large part. Gatsi Rusere promised them the mines in 1607, and in 1629 Mavhura became a Portuguese vassal, after which Portuguese traders and prazo holders took control of land, trade and mines in the valley. However, the Portuguese could only do this because the state was already divided by succession disputes and civil wars; kings invited Portuguese help against their own rivals. The rise of the Rozvi under Changamire Dombo also took the plateau away. So the Portuguese were an important cause, but internal divisions were the main reason, because they opened the door to Portuguese interference." }),
    ],
    hints: ["In (c), ask which came first: internal division or Portuguese interference."],
    explanation: "A strong answer weighs Portuguese interference against internal factors and shows how they interacted.",
  });

  b.card("DEFINITION", "What was the **Mwene Mutapa**?", "The title of the ruler of the Mutapa state ('lord of the conquered lands', according to tradition).");
  b.card("FACT", "Who founded the Mutapa state, according to tradition?", "Nyatsimba Mutota, in about the 1430s-1450s; his son Matope expanded it.");
  b.card("DEFINITION", "What were **mhondoro**?", "Royal ancestral spirits that spoke through mediums; they advised kings and approved successions.");
  b.card("CONCEPT", "What did the royal fire symbolise?", "The Mutapa's authority: chiefs relit their fires from it as a sign of loyalty.");
  b.card("FACT", "What happened in 1561 at the Mutapa court?", "The Jesuit Gonçalo da Silveira baptised the Mutapa and was then killed.");
  b.card("FACT", "What did Gatsi Rusere promise the Portuguese in 1607?", "Access to the mines, in return for military help against rebels.");
  b.card("FACT", "What was the 1629 treaty with Mavhura?", "It made the Mutapa a Portuguese vassal, opening the state to traders and missionaries.");
  b.card("CONCEPT", "Main reasons for the decline of the Mutapa state?", "Civil wars and succession disputes; Portuguese interference; provinces breaking away; rise of the Rozvi; loss of trade.");
  b.card("FACT", "Which area did Mutota conquer?", "The Dande, south of the Zambezi (Tavara and Tonga peoples).");
});
