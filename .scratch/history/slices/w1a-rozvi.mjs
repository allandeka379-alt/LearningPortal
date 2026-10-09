// W1a: hist.precolonial.rozvi (ZIMSEC 4.4).
import { concept, P, source, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.precolonial.rozvi", { file: "precolonial/rozvi", keyPrefix: "precolonial.rozvi" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which site near present-day Bulawayo was the capital of the **Torwa** state?",
    options: [
      ["Khami", "Correct: Khami, with its decorated stone platforms, was the Torwa capital."],
      ["Mapungubwe, on the south bank of the Limpopo", "Mapungubwe was the thirteenth-century forerunner of Great Zimbabwe."],
      ["Dambarare, the Portuguese settlement", "Dambarare was a Portuguese settlement destroyed by Dombo in 1693."],
      ["Inyati, the first mission station in the area", "Inyati was a mission station founded in 1859."],
    ],
    answer: "A",
    explanation: "Khami, near Bulawayo, was the capital of the Torwa (Butua) state from about the mid-fifteenth century.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who founded the Rozvi state and drove the Portuguese off the plateau?",
    options: [
      ["Changamire Dombo", "Correct: Dombo defeated the Portuguese at Maungwe and destroyed Dambarare."],
      ["Nyatsimba Mutota, the founder of the Mutapa state", "Mutota founded the Mutapa state in the fifteenth century."],
      ["Zwangendaba, leader of an Nguni group", "Zwangendaba led an Nguni group across the Rozvi lands in the 1830s."],
      ["Mavhura, who signed a treaty with the Portuguese", "Mavhura became a Portuguese vassal in 1629."],
    ],
    answer: "A",
    explanation: "Changamire Dombo founded the Rozvi state in the 1680s and expelled the Portuguese from the plateau in the 1690s.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which Portuguese settlement did Changamire Dombo destroy in **1693**?",
    options: [
      ["Dambarare", "Correct: Dambarare, near present-day Mazowe, was destroyed in 1693."],
      ["Sofala", "Sofala was the Portuguese fort on the coast; it was not destroyed by Dombo."],
      ["Sena", "Sena on the Zambezi remained a Portuguese post."],
      ["Fort Salisbury", "Fort Salisbury was founded by the Pioneer Column in 1890."],
    ],
    answer: "A",
    explanation: "After defeating the Portuguese at Maungwe (1684), Dombo destroyed Dambarare (1693) and other posts on the plateau.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "After the Rozvi victories of the 1690s, how did the Portuguese trade with the plateau?",
    options: [
      ["Only at fairs on the edge of the plateau, under Rozvi control", "Correct: they were no longer allowed to live and trade freely on the plateau."],
      ["Freely in every village, as they had under the Mutapa vassal treaty", "That freedom was ended by the Rozvi."],
      ["Not at all, because all trade with the coast stopped for ever", "Trade continued, but under Rozvi supervision."],
      ["Through the Ndebele state, which controlled the trade routes", "The Ndebele arrived in the nineteenth century."],
    ],
    answer: "A",
    explanation: "The Rozvi kept control of trade: the Portuguese traded at fairs such as Masekesa in Manica, on the edge of the plateau.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "With which religious system were the Rozvi rulers closely linked?",
    options: [
      ["The Mwari cult at the shrines in the Matobo Hills", "Correct: oracles at the Mwari shrines advised on rain, war and succession."],
      ["The Catholic Church brought by Jesuit missionaries", "The Rozvi rose against Portuguese power; their religion was African."],
      ["Islam, brought by Swahili traders from the coast", "Swahili traders were Muslim, but the Rozvi rulers were linked with the Mwari cult."],
      ["The worship of the pharaoh as a god-king", "That was the religion of ancient Egypt."],
    ],
    answer: "A",
    hints: ["The shrines were in hills south of present-day Bulawayo."],
    explanation: "The Mwari shrines in the Matobo Hills gave religious support to the Rozvi state; offerings were sent from across the state.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of these was a **long-term** cause of the decline of the Rozvi state?",
    options: [
      ["Succession disputes after Dombo's death", "Correct: quarrels in the royal family weakened central power over many years."],
      ["The arrival of the Pioneer Column at Fort Salisbury", "That happened in 1890, long after the Rozvi state collapsed."],
      ["The Berlin Conference's division of Africa", "That was in 1884-85, decades after the collapse."],
      ["The defeat of the Portuguese at Maungwe", "This was a Rozvi victory during their rise, not a cause of decline."],
    ],
    answer: "A",
    hints: ["A long-term cause works slowly over many years.", "Check the dates of the other events."],
    explanation: "Long-term causes: succession disputes, breakaway provinces, drought and falling trade. Short-term: the Nguni invasions of the 1830s.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason **best** explains why Dombo's forces could drive the Portuguese off the plateau?",
    options: [
      ["The Portuguese were few, scattered and far from help", "Correct: thinly spread posts with few soldiers could not resist a united, mobile army."],
      ["The Portuguese had no firearms and fought only with spears", "The Portuguese had muskets; their weakness was numbers and distance."],
      ["The Mutapa king sent his whole army to help the Rozvi", "The Mutapa was a Portuguese vassal at the time."],
      ["Britain ordered the Portuguese to leave the plateau", "Britain had no role in the region in the seventeenth century."],
    ],
    answer: "A",
    hints: ["Think about how many Portuguese there were and where they were based."],
    explanation: "Dombo's united, mobile army defeated scattered Portuguese posts that depended on divided African allies and could not be reinforced quickly from the coast.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about the Nguni invasions of the 1830s and the Rozvi state is **best** supported?",
    options: [
      ["They were the final blow to a state already weakened", "Correct: internal weakness and external attack combined."],
      ["They were the only reason why the Rozvi state collapsed", "This ignores long-term internal problems such as succession disputes and drought."],
      ["They had no effect at all on the Rozvi state", "The invasions caused the collapse of the capital and the death of the last Changamire, according to tradition."],
      ["They made the Rozvi state stronger by uniting all its people", "The invasions led to collapse, not unity."],
    ],
    answer: "A",
    hints: ["Beware of words such as 'only' and 'no effect at all'."],
    explanation: "The invasions were the immediate cause of collapse, but long-term weaknesses explain why the state could not resist.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Khami was the capital of the Torwa state.",
    answer: true,
    explanation: "True. Khami, near Bulawayo, was the Torwa capital; it later became a UNESCO World Heritage Site (1986).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Rozvi drove the Portuguese out of the whole of south-east Africa, including the coast.",
    answer: false,
    explanation: "False. They drove the Portuguese off the Zimbabwean plateau; the Portuguese stayed in the Zambezi valley and on the coast.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each place with its description.",
    pairs: [
      ["Khami", "Torwa capital with decorated stone platforms"],
      ["Danangombe", "Rozvi centre also known as Dhlo Dhlo"],
      ["Maungwe", "Battle where Dombo defeated the Portuguese"],
      ["Matobo Hills", "Site of the Mwari shrines"],
    ],
    explanation: "Khami (Torwa), Danangombe/Dhlo Dhlo (Rozvi), Maungwe (1684 victory), Matobo Hills (Mwari shrines).",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each cause of the Rozvi decline with its type.",
    pairs: [
      ["Succession disputes in the royal family", "Internal political weakness"],
      ["Drought and famine", "Environmental problem"],
      ["Falling gold output and trade", "Economic weakness"],
      ["Attacks by groups fleeing the Mfecane", "External invasion"],
    ],
    hints: ["Sort each cause by where it came from: inside the state, nature, the economy, or outside."],
    explanation: "Grouping causes by type helps structure an answer and shows the range of factors.",
  });
  {
    const t = timeline([
      ["c. 1450", "The Torwa state rises with its capital at Khami"],
      ["1684", "Dombo defeats the Portuguese at Maungwe"],
      ["1693", "Dombo destroys Dambarare"],
      ["1830s", "Nguni groups cross and raid the Rozvi lands"],
    ]);
    const order = [3, 1, 2, 0];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["The Torwa came before the Rozvi.", "Maungwe came before Dambarare."],
      explanation: "Torwa at Khami (c. 1450), Maungwe (1684), Dambarare (1693), Nguni invasions (1830s).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The title of the Rozvi rulers was {{blank:a}}. The Portuguese called the land of the Torwa state {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Changamire"], choices: ["Changamire", "Mutapa", "Inkosi", "Pharaoh"] },
      { id: "b", accepted: ["Butua"], choices: ["Butua", "Manica", "Dande", "Sofala"] },
    ],
    explanation: "Changamire was the Rozvi royal title; Butua was the Portuguese name for the Torwa lands in the south-west.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Rozvi stone site near Gweru famous for its finely decorated wall.",
    accepted: ["Naletale", "Nalatale", "Naletali"],
    wrong: ["Khami", "Great Zimbabwe"],
    explanation: "**Naletale** (also spelt Nalatale) has some of the finest decorative stonework of the Zimbabwe tradition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the rise of the Rozvi state under Changamire Dombo.",
    points: [
      "Dombo built up a following and army in the north-east of the plateau",
      "In the 1680s he took over the Torwa lands in the south-west",
      "He defeated the Portuguese at Maungwe (1684)",
      "He destroyed Dambarare and other Portuguese posts (1693)",
      "The Portuguese were driven off the plateau and allowed to trade only at fairs on its edge",
    ],
    hints: ["Use the dates in order."],
    modelAnswer: "Changamire Dombo built up a large following and army in the north-east of the plateau. In the 1680s he took over the lands of the Torwa state in the south-west. In 1684 he defeated a Portuguese force at Maungwe, and in 1693 he destroyed the Portuguese settlement at Dambarare and other posts. The Portuguese were driven off the plateau and afterwards traded only at fairs on its edges, under Rozvi control.",
    explanation: "One mark per stage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the political and economic organisation of the Rozvi state.",
    points: [
      "Political: the Changamire was supreme ruler with military, political and religious authority",
      "Political: a council of senior officials and relatives advised him; capitals such as Danangombe",
      "Political: provincial chiefs paid tribute and supplied soldiers; a strong army",
      "Economic: cattle were the main wealth",
      "Economic: agriculture (sorghum, millet) and gold mining",
      "Economic: trade with the Portuguese at fairs under Rozvi control; tribute",
    ],
    hints: ["Three points on politics, three on the economy."],
    modelAnswer: "The Changamire was the supreme ruler, with military, political and religious authority, advised by a council of officials and relatives at capitals such as Danangombe. Provincial chiefs paid tribute and supplied soldiers, and a strong army kept order. Economically, cattle were the main form of wealth, people grew sorghum and millet and mined gold, and gold and ivory were traded with the Portuguese at fairs on the edge of the plateau under Rozvi control.",
    explanation: "Three marks for each area.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why the Rozvi state declined.",
    points: [
      ["Succession disputes after Dombo's death and breakaway provinces weakened central control", 2],
      ["Drought and falling trade (gold output, Portuguese trade) weakened the economy", 2],
      ["Nguni invasions in the 1830s (Zwangendaba, Nxaba, Nyamazana) were the final blow; then the Ndebele settled the south-west", 2],
    ],
    hints: ["Separate long-term weaknesses from the final blow."],
    modelAnswer: "After Dombo's death, succession disputes in the Changamire family weakened central control, and some provinces broke away. Drought and famine in the early nineteenth century and falling gold output and trade weakened the economy. When Nguni groups fleeing the Mfecane, such as those of Zwangendaba, Nxaba and Nyamazana, raided the state in the 1830s, it could not resist; tradition says the last Changamire died at Ntaba zikaMambo. The Ndebele then settled the south-west and incorporated many Rozvi communities.",
    explanation: "Long-term internal causes plus the external final blow.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the source and answer the questions.",
      "",
      source("Source A", "a letter from a fictional Portuguese trader at a fair on the edge of the plateau to a friend at Sena, early eighteenth century",
        "We may not go beyond the fair. The Changamire's officers watch every bale of cloth and every grain of gold. They say that since the days of Dombo no Portuguese may live on the plateau. Trade is poor this year, for the king's people have little gold to sell."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** things Source A tells us about trade in the Rozvi state.", points: ["The Portuguese could trade only at the fair / could not go onto the plateau", "Rozvi officials supervised the trade closely", "Trade was poor because little gold was available"] }),
      P.manual({ label: "(b)", marks: 3, stem: "What can be inferred from Source A about the power of the Rozvi rulers?", points: ["They were strong enough to keep the Portuguese off the plateau", "They controlled trade through their officials", "The memory of Dombo's victories still mattered"] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful is Source A to a historian studying the Rozvi economy? Use your own knowledge.", type: "EXTENDED_RESPONSE", points: [["Useful: an eyewitness trader at the time, describing controlled trade, which fits own knowledge (fairs after the 1690s)", 2], ["Limits: Portuguese view only; one fair and one year; may exaggerate restrictions or poor trade for his own reasons", 2], ["Judgement: useful on trade but says little about cattle, farming or tribute", 2]], levels: levels(6), modelAnswer: "Source A is useful because it was written at the time by a trader who took part in the fair trade, and its description of Rozvi officials controlling the trade and keeping the Portuguese off the plateau fits what is known about the period after Dombo's victories in the 1690s. However, it shows only a Portuguese view, from one fair in one year, and the writer may complain to explain poor profits. It also says nothing about cattle, farming or tribute, the base of the Rozvi economy. So it is useful evidence about trade but limited for the economy as a whole." }),
    ],
    hints: ["What can a trader see, and what can he not see?"],
    explanation: "Usefulness depends on the question: the source is strong on controlled trade but silent on the agricultural and pastoral economy.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the Torwa and Rozvi states.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the Torwa state and its capital, Khami.", points: ["Ruled the south-west from about the mid-fifteenth century after Great Zimbabwe's decline", "Capital Khami near Bulawayo, built on terraced stone platforms", "Decorated walls (chequer, herringbone patterns)", "Traded gold and ivory (Chinese porcelain and beads found); Khami destroyed by fire in a civil war"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** reasons for the success of Changamire Dombo against the Portuguese.", points: [["Strong leadership and a mobile, disciplined army that struck quickly", 2], ["The Portuguese were few, scattered and far from reinforcements / Africans resented Portuguese interference, so Dombo had support", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "\"Religion was the main reason for the strength of the Rozvi state.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: links with the Mwari cult and oracles gave the Changamire authority and united the state", 2], ["Against: the army, cattle wealth, control of trade and provincial chiefs paying tribute were also vital", 2], ["Supported judgement", 2]], levels: levels(6), modelAnswer: "Religion was important. The Rozvi rulers were linked with the Mwari shrines in the Matobo Hills, whose oracles advised on rain, war and succession, and offerings came from across the state, which gave the Changamire authority and helped unite different peoples. However, the state was also built on a strong army, which had defeated the Portuguese and collected tribute, on cattle wealth, and on control of trade at the fairs. Religion helped make Rozvi power accepted, but military and economic strength were at least as important, so religion was one main reason rather than the main reason." }),
    ],
    hints: ["In (c), compare religion with military and economic strength."],
    explanation: "Strong answers weigh religion against military and economic foundations and reach a supported judgement.",
  });

  b.card("FACT", "What was the capital of the Torwa state?", "Khami, near present-day Bulawayo.");
  b.card("FACT", "Who founded the Rozvi state?", "Changamire Dombo, in the 1680s.");
  b.card("FACT", "Where did Dombo defeat the Portuguese in 1684?", "Maungwe.");
  b.card("FACT", "Which Portuguese settlement did Dombo destroy in 1693?", "Dambarare, near present-day Mazowe.");
  b.card("DEFINITION", "What does the name **Rozvi** often mean?", "'Destroyers', from their military successes.");
  b.card("FACT", "Name two Rozvi stone centres.", "Danangombe (Dhlo Dhlo) and Naletale.");
  b.card("CONCEPT", "How did the Rozvi control trade with the Portuguese?", "The Portuguese could trade only at fairs on the edge of the plateau, watched by Rozvi officials.");
  b.card("CONCEPT", "Religious support of the Rozvi state?", "The Mwari cult and its oracles at shrines in the Matobo Hills.");
  b.card("CONCEPT", "Causes of the Rozvi decline?", "Succession disputes, breakaway provinces, drought, falling trade, and Nguni invasions in the 1830s.");
});
