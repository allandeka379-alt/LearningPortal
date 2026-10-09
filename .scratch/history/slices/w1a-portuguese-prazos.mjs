// W1a: hist.contact.portuguese-prazos (ZIMSEC 6.1).
import { concept, P, source, sources, timeline, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.contact.portuguese-prazos", { file: "contact/portuguese-prazos", keyPrefix: "contact.portuguese-prazos" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was a **prazo**?",
    options: [
      ["A Crown land grant in the Zambezi valley", "Correct: prazos were estates granted to settlers, usually for three generations."],
      ["A trading fair where gold was exchanged for cloth and beads", "That was a feira (fair)."],
      ["A Portuguese warship that patrolled the Indian Ocean coast", "A prazo was an estate of land, not a ship."],
      ["A royal ancestral spirit of the Mutapa kings", "That was a mhondoro."],
    ],
    answer: "A",
    explanation: "A prazo was a Crown estate granted to a settler (prazero) in return for rent and loyalty.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who were the **achikunda**?",
    options: [
      ["The armed followers of the prazeros", "Correct: they hunted, collected tribute and fought for the prazero."],
      ["Jesuit missionaries who worked at the Mutapa court", "The Jesuits were priests such as Gonçalo da Silveira."],
      ["Swahili-Arab traders who controlled the coast before the Portuguese", "They were Muslim merchants, rivals of the Portuguese."],
      ["Officials who supervised the fairs for the Mutapa king", "The Mutapa's officials supervised trade; the achikunda served the prazeros."],
    ],
    answer: "A",
    explanation: "Achikunda were the prazeros' private soldiers, many of them originally enslaved or captured people.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these was a reason for Portuguese penetration of the Zambezi valley?",
    options: [
      ["To take over the gold trade from Swahili-Arab traders", "Correct: trade rivalry with Muslim traders was a major motive."],
      ["To find land for the British South Africa Company", "The Company was British and was formed in 1889."],
      ["To escape the Mfecane wars in the south", "The Mfecane was in the nineteenth century; the Portuguese came in the sixteenth."],
      ["To build railways to carry copper from the interior to the coast", "Railways came in the late nineteenth and twentieth centuries."],
    ],
    answer: "A",
    explanation: "The Portuguese came for gold and ivory, to take the trade from Swahili-Arab merchants, to spread Christianity, and for empire and prestige.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which tribute did people living on a prazo pay to the prazero?",
    options: [
      ["Mussoco", "Correct: mussoco was paid in grain, goods or labour."],
      ["Hut tax, collected by the Native Commissioners", "Hut tax was a colonial tax of the 1890s onwards."],
      ["Roora, paid at the time of a marriage", "Roora is bridewealth, paid between families."],
      ["Ukusisa, paid to the king in cattle", "Ukusisa was the Ndebele system of the king lending cattle."],
    ],
    answer: "A",
    explanation: "Mussoco was the tribute prazeros collected from the people on their estates.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the **official** reason given for the Barreto expedition, and what was its real aim?",
    options: [
      ["To avenge Silveira; really to seize the mines", "Correct: punishment was the excuse; the gold mines were the goal."],
      ["To protect the Mutapa from the Rozvi; really to build mission schools", "The Rozvi rose a century later, and the expedition was military, not educational."],
      ["To end the slave trade; really to find a route to India", "Portugal already had the sea route to India; the target was gold."],
      ["To make peace with the Swahili; really to find farmland for settlers", "The expedition aimed at the gold mines, not farmland."],
    ],
    answer: "A",
    hints: ["What had happened at the Mutapa court in 1561?", "What did the Portuguese want most from the interior?"],
    explanation: "Barreto's army (1569-1573) was sent officially to punish the Mutapa for Silveira's death, but mainly to seize the gold mines.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In theory, how was a prazo passed down from one generation to the next?",
    options: [
      ["To the eldest daughter, who had to marry a Portuguese-born man", "Correct: inheritance through women was meant to keep land in Portuguese hands."],
      ["To the eldest son of the African chief whose land it had once been", "Prazos were Crown grants to settlers, not returned to chiefs."],
      ["To the achikunda soldiers, shared equally among them", "The achikunda served the prazero; they did not inherit the estate."],
      ["To the Jesuit order, after the death of the prazero", "Prazos passed within families, in theory through daughters."],
    ],
    answer: "A",
    hints: ["The rule was unusual: it ran through women, not men."],
    explanation: "Prazos were usually granted for three lifetimes and in theory inherited by the eldest daughter, who had to marry a Portuguese-born man.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which factor **best** explains why many prazeros became independent of the Portuguese government?",
    options: [
      ["They had their own armies and lived far from officials", "Correct: private achikunda armies and distance made them independent."],
      ["The Mutapa kings ordered them to stop obeying Lisbon", "The Mutapa had little control over prazeros by then."],
      ["The Portuguese government paid them to act independently", "Lisbon tried to control them, without success."],
      ["The Berlin Conference recognised them as independent rulers", "The Berlin Conference did not recognise prazeros."],
    ],
    answer: "A",
    hints: ["Who protected the prazero, and how far away was Lisbon?"],
    explanation: "Distance, weak Portuguese officials, private armies, wealth from trade and local African alliances made prazeros independent warlords.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about relations between the Portuguese and the Mutapa in the **sixteenth** century is best supported?",
    options: [
      ["The Mutapa controlled trade, and Portuguese conquest failed", "Correct: the fairs worked on the Mutapa's terms and the Barreto expedition failed."],
      ["The Portuguese conquered the Mutapa state and ruled it directly", "No conquest took place; Barreto failed."],
      ["The Mutapa refused all trade with the Portuguese throughout the century", "Trade at the fairs went on with the Mutapa's permission."],
      ["The Portuguese installed Mavhura as a puppet king during this century", "Mavhura became a vassal in 1629, in the seventeenth century."],
    ],
    answer: "A",
    hints: ["Check the dates: when was Mavhura installed?"],
    explanation: "In the sixteenth century the Mutapa set the terms of trade; Portuguese dominance came only in the seventeenth century through treaties with weakened kings.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gonçalo da Silveira was a Jesuit missionary who was killed at the Mutapa court.",
    answer: true,
    explanation: "True. He baptised the Mutapa in 1561 but was killed soon afterwards on the king's orders.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The Barreto expedition succeeded in capturing the gold mines of the Mutapa state.",
    answer: false,
    explanation: "False. Disease, tsetse fly, African resistance and poor supplies destroyed the expedition; Barreto died at Sena in 1573.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Prazero", "Holder of a Crown estate"],
      ["Achikunda", "Prazero's armed followers"],
      ["Feira", "Inland trading fair"],
      ["Mussoco", "Tribute paid on a prazo"],
    ],
    explanation: "The prazo system: prazeros held estates, ruled with achikunda and collected mussoco; trade inland took place at feiras.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each problem with the way it damaged the Barreto expedition.",
    pairs: [
      ["Malaria", "Killed many soldiers"],
      ["Tsetse fly", "Killed horses and cattle"],
      ["African resistance", "Cost lives and supplies in fighting"],
      ["Distance and heat", "Wore the army down and stretched supplies"],
    ],
    hints: ["Two of these are natural hazards of the Zambezi valley."],
    explanation: "Environment (malaria, tsetse, heat) and African resistance together destroyed the expedition.",
  });
  {
    const t = timeline([
      ["1505", "The Portuguese build a fort at Sofala"],
      ["1530s", "Posts are set up at Sena and Tete"],
      ["1569-1573", "The Barreto expedition"],
      ["1629", "Mavhura becomes a Portuguese vassal"],
    ]);
    const order = [3, 0, 2, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => t.events[i][1]),
      right: POS,
      rightIndex: order,
      hints: ["The coast came before the river posts.", "The vassal treaty came after the failure of military conquest."],
      explanation: "Sofala (1505), Sena and Tete (1530s), Barreto (1569-1573), Mavhura (1629).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Portuguese set up inland posts at Sena and {{blank:a}} on the Zambezi. Their main rivals in the gold trade were {{blank:b}} traders.",
    blanks: [
      { id: "a", accepted: ["Tete"], choices: ["Tete", "Bulawayo", "Khami", "Inyati"] },
      { id: "b", accepted: ["Swahili-Arab"], choices: ["Swahili-Arab", "British", "Ndebele", "Dutch"] },
    ],
    explanation: "Sena and Tete were the Portuguese posts on the Zambezi; the Swahili-Arab (Muslim) traders had controlled the gold trade through Sofala.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Portuguese commander of the expedition sent after Silveira's death to seize the Mutapa's gold mines.",
    accepted: ["Francisco Barreto", "Barreto", "Francisco Barretto"],
    wrong: ["Silveira", "Vasco da Gama"],
    explanation: "**Francisco Barreto** led the expedition; he died at Sena in 1573.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Give **four** reasons why the Portuguese penetrated the Zambezi valley.",
    points: [
      "To obtain gold (believed to be plentiful in the interior)",
      "To obtain ivory and other goods for the Indian Ocean trade",
      "To take over the trade from Swahili-Arab (Muslim) traders",
      "To spread Christianity / to build a Portuguese empire and prestige",
    ],
    modelAnswer: "The Portuguese wanted the gold of the interior, which they believed was plentiful, and ivory for the Indian Ocean trade. They wanted to take over the trade from Swahili-Arab Muslim traders, and they wanted to spread Christianity and build a Portuguese empire.",
    explanation: "One mark per reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe the main characteristics of the prazo system.",
    points: [
      "Crown estates granted to Portuguese settlers (prazos da coroa)",
      "Usually granted for three lifetimes (generations)",
      "In theory inherited through the eldest daughter, who had to marry a Portuguese-born man",
      "The prazero ruled like a chief and collected mussoco (tribute)",
      "Prazeros kept private armies of achikunda",
      "Prazeros traded ivory, gold and later slaves, and often became independent of Portugal",
    ],
    hints: ["Cover how prazos were granted, inherited and run."],
    modelAnswer: "Prazos were Crown estates in the Zambezi valley granted to Portuguese settlers, usually for three lifetimes. In theory they passed to the eldest daughter, who had to marry a Portuguese-born man. The prazero ruled like a chief, settling disputes and collecting mussoco from the people. Prazeros kept private armies of achikunda, traded in ivory, gold and later slaves, and many became independent of the Portuguese government.",
    explanation: "One mark per characteristic.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain the impact of the prazo system on African communities in the Zambezi valley.",
    points: [
      ["Loss of land and independence: communities came under prazeros' rule", 2],
      ["Exploitation through mussoco, forced labour and, especially in the nineteenth century, slave raiding and trading, causing insecurity and depopulation", 2],
      ["Other effects: Afro-Portuguese society and cultural mixing; new crops such as maize and cassava; some Africans gained power as achikunda", 2],
    ],
    hints: ["Give negative effects and at least one other effect."],
    modelAnswer: "African communities lost land and independence because they came under the rule of prazeros. They were exploited: they had to pay mussoco in grain, goods or labour, and in the nineteenth century slave raiding and trading by prazeros and achikunda caused insecurity, famine and depopulation. At the same time, an Afro-Portuguese society developed through intermarriage, new crops such as maize and cassava spread, and some Africans, especially achikunda, gained power and wealth.",
    explanation: "Developed points; the best answers recognise that impact varied between groups.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      sources([
        source("Source A", "a report by a fictional Portuguese governor at Mozambique Island to the king in Lisbon, eighteenth century",
          "The holders of the prazos obey no one. Each keeps hundreds of armed men, makes war on his neighbours, and pays the Crown nothing. Your Majesty's orders are read and laughed at."),
        source("Source B", "an account recorded in the twentieth century from a fictional elder whose ancestors lived on a prazo",
          "Our grandfathers gave part of every harvest to the master of the land. When the master's soldiers came for people to sell, whole villages ran into the hills."),
      ]),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify **three** features of the prazo system shown in the sources.", points: ["Prazeros kept armed men (achikunda) and made war", "Prazeros ignored the Crown / paid nothing", "People paid part of their harvest as tribute (mussoco) / the prazeros' soldiers took people to sell as slaves"] }),
      P.manual({ label: "(b)", marks: 3, stem: "How do the two sources differ in what they show about the prazeros?", points: ["A shows the prazeros' independence from Portugal (a problem for the Crown)", "B shows their exploitation of Africans (tribute and slave raiding)", "The difference reflects their authors: an official complaining about lost authority; an African remembering suffering"] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are these sources for studying the impact of the prazo system? Use your own knowledge.", type: "EXTENDED_RESPONSE", points: [["A: written at the time by an official; useful on prazero independence, but may exaggerate to blame others for lost revenue", 2], ["B: preserves African experience, which officials rarely recorded, but recorded long afterwards", 2], ["Judgement with own knowledge (mussoco, achikunda, slave trade in the nineteenth century): together they give both sides", 2]], levels: levels(6), modelAnswer: "Source A is useful because it was written at the time by a governor who dealt with the prazeros, and it shows that they kept private armies and ignored the Crown, which fits what is known. But he may exaggerate their disobedience to explain why the Crown received no revenue. Source B is useful because it gives the experience of Africans, who are rarely heard in official records: tribute from every harvest (mussoco) and slave raiding, which increased in the nineteenth century. It was recorded long afterwards, so details may have changed. Together they are useful because they show both the prazeros' independence and their impact on Africans." }),
    ],
    hints: ["Each source shows a different side: whose problem does each author describe?"],
    explanation: "Sources from different viewpoints complement each other: the official shows the political problem, the African memory shows the human impact.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about Portuguese activities in the Zambezi valley.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the activities of the Portuguese in the Zambezi valley in the sixteenth and seventeenth centuries.", points: ["Trade at fairs (Masapa, Luanze) for gold and ivory", "Missionary work: Silveira baptised the Mutapa (1561)", "The Barreto expedition to seize the mines (1569-1573)", "Treaties with Mutapa kings (1607, 1629) / prazos / settlement on the plateau"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** reasons why the Barreto expedition failed.", points: [["Disease (malaria) and tsetse killed soldiers, horses and cattle", 2], ["African resistance and fighting / heat, distance and poor supplies", 2]] }),
      P.manual({ label: "(c)", marks: 8, stem: "\"Trade was the main aim of the Portuguese in the Zambezi valley.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: gold and ivory, the fairs, rivalry with Swahili-Arab traders", 2], ["For (developed): treaties sought access to mines; prazeros traded ivory, gold and slaves", 2], ["Against: Christianity (Silveira, missionaries), empire and prestige, land (prazos)", 2], ["Supported judgement", 2]], levels: levels(8), modelAnswer: "Trade was the main aim. The Portuguese came for gold and ivory and to take the trade from Swahili-Arab merchants; they set up fairs, and their treaties with Gatsi Rusere and Mavhura were mainly about access to the mines. Even the Barreto expedition, officially to avenge Silveira, aimed at the gold. Prazeros too lived by trading ivory, gold and later slaves. However, there were other aims: missionaries such as Silveira wanted to spread Christianity, the Crown wanted an empire and prestige, and settlers wanted land, which the prazo system gave them. Overall, trade, especially in gold, was the main aim, and the other aims were often linked to it." }),
    ],
    hints: ["In (c), even religious and military activities may have had trade motives: say so."],
    explanation: "Strong answers weigh trade against religion, empire and land, and show how they were connected.",
  });

  b.card("DEFINITION", "What was a **prazo**?", "A Crown land grant in the Zambezi valley given to a settler, usually for three generations.");
  b.card("DEFINITION", "Who were the **achikunda**?", "The armed followers of the prazeros: soldiers, hunters and tribute collectors.");
  b.card("DEFINITION", "What was **mussoco**?", "Tribute in grain, goods or labour paid by people on a prazo to the prazero.");
  b.card("FACT", "When did the Portuguese build a fort at Sofala?", "1505.");
  b.card("FACT", "What happened to Gonçalo da Silveira in 1561?", "He baptised the Mutapa but was killed on the king's orders.");
  b.card("FACT", "When was the Barreto expedition, and why did it fail?", "1569-1573; disease, tsetse fly, African resistance, heat and poor supplies.");
  b.card("CONCEPT", "Why did the Portuguese come to the Zambezi valley?", "Gold, ivory, rivalry with Swahili-Arab traders, Christianity, empire.");
  b.card("CONCEPT", "Why did prazeros become independent warlords?", "Distance from Portuguese authority, private achikunda armies, wealth from trade, and local African alliances.");
  b.card("FACT", "Name two Portuguese posts on the Zambezi.", "Sena and Tete (1530s).");
  b.card("CONCEPT", "Impact of the prazo system on Africans?", "Loss of land, tribute and forced labour, slave raiding; also Afro-Portuguese culture and new crops.");
});
