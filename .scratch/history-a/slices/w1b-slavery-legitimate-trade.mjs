// W1b: ahist.slavery.legitimate-trade (ZIMSEC topic 4).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.slavery.legitimate-trade", { file: "slavery/legitimate-trade", keyPrefix: "slavery.legitimate-trade" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the main product of the Niger Delta states in the mid-nineteenth century?",
    options: [
      ["Palm oil", "Correct: it was used for soap, candles and machinery."],
      ["Gold from the Asante forest", "Gold was an Asante product."],
      ["Cloves from plantations", "Cloves were a product of Zanzibar."],
      ["Cotton from the Zambezi valley", "This was not a Niger Delta product."],
    ],
    answer: "A",
    explanation: "Palm oil was the staple of the Niger Delta in the nineteenth century.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did European industry need palm oil?",
    options: [
      ["For making soap and candles and for lubricating machinery", "Correct: industrial uses."],
      ["For feeding the cattle of British farmers", "Industrial uses were the reason."],
      ["For fuelling the engines of steamships", "Coal fuelled steamships."],
      ["For paving roads in the towns of Britain with a hard surface", "This was not a use."],
    ],
    answer: "A",
    explanation: "Palm oil was an industrial raw material for soap, candles and machine lubrication.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who founded the state of Opobo in 1869?",
    options: [
      ["Jaja", "Correct: he left Bonny with his followers."],
      ["Kosoko", "Kosoko was a ruler of Lagos."],
      ["Gezo", "Gezo was a king of Dahomey."],
      ["Menelik", "Menelik was the emperor of Ethiopia."],
    ],
    answer: "A",
    explanation: "Jaja, head of the Anna Pepple House, founded Opobo in 1869.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How did Jaja build the power of Opobo?",
    options: [
      ["By controlling the palm-oil trade from the hinterland and selling directly to merchants in Liverpool", "Correct: he cut out rival middlemen."],
      ["By capturing slaves in great numbers to sell across the Atlantic to the Americas and to the sugar planters of Brazil", "He built power through legitimate trade."],
      ["By abandoning trade and farming a small plot with his own family", "He was a trader and a ruler."],
      ["By accepting British rule in 1869 in return for a pension", "He kept his independence until 1887."],
    ],
    answer: "A",
    hints: ["Think about where the palm oil came from and who bought it."],
    explanation: "Jaja made Opobo a middleman state close to the markets, with his own fleet, and sold oil directly to Liverpool.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did Britain remove Jaja in 1887?",
    options: [
      ["He prevented British traders from going to the inland markets, against the principle of free trade", "Correct: his control conflicted with free trade."],
      ["He had restarted the Atlantic slave trade", "He was removed for blocking traders, not for slave trading."],
      ["He had invaded the Gold Coast and attacked Asante in order to seize its gold and take control of the kola trade", "He did no such thing."],
      ["He had taken British ships by force at sea", "No such raid is recorded."],
    ],
    answer: "A",
    hints: ["Think of the Berlin principle."],
    explanation: "Jaja's refusal to let British traders go inland clashed with the free-trade principle for the Niger basin and with British commercial interests.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the economic base of Zanzibar in the nineteenth century?",
    options: [
      ["Cloves grown on plantations with slave labour, and the ivory trade", "Correct: wealth rested on both."],
      ["Palm oil from the Niger Delta, sold by the trade houses", "Palm oil was a West African product."],
      ["Diamonds from the interior", "Diamonds were not a Zanzibar product."],
      ["Wheat exports to Europe", "Zanzibar did not export wheat."],
    ],
    answer: "A",
    hints: ["Think of a spice."],
    explanation: "Zanzibar grew rich from cloves and ivory; slave labour was used on the plantations.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why Dahomey adjusted poorly to legitimate trade?",
    options: [
      ["Its rulers relied on war and the sale of captives, and they continued the older trade as long as they could", "Correct: the kingdom's economy and army depended on slaving."],
      ["It had no palm trees within its borders, so it could not produce palm oil in any quantity for export to Europe", "Palm oil was produced there."],
      ["It had refused all contact with European traders before 1800", "It had traded with Europeans."],
      ["It had been conquered by Britain in 1807", "France conquered it in 1892-94."],
    ],
    answer: "A",
    hints: ["Think about the basis of the state."],
    explanation: "Dahomey's army and royal revenue depended on war and the sale of captives; its partial change to palm oil left it exposed.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about the impact of legitimate trade is best supported?",
    options: [
      ["It gave some African states wealth but also caused instability and invited European interference", "Correct: it brought both opportunity and danger."],
      ["It brought equal wealth to all African peoples and states who traded", "The gains were uneven."],
      ["It had no connection with later colonisation", "Interference prepared the way for colonisation."],
      ["It ended all forms of slavery in West Africa in the nineteenth century, as the Atlantic traders had hoped", "Domestic slavery grew in some places."],
    ],
    answer: "A",
    hints: ["Think of Jaja's fall."],
    explanation: "Middleman states grew rich, but rivalry, domestic slavery and consuls and gunboats made the new trade unstable and led towards colonisation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Rubber became an important export from West Africa mainly after the 1880s.",
    answer: true,
    explanation: "True. Demand for rubber grew with the rise of tyres and cables.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The shift to palm oil ended domestic slavery in West Africa.",
    answer: false,
    explanation: "False. In some places slave labour was used to produce palm oil, so domestic slavery grew.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Jaja was recognised by Britain as king of Opobo in 1873, but exiled in 1887.",
    answer: true,
    hints: ["Think of Jaja's rise and fall."],
    explanation: "True. Recognition came in 1873; he was arrested and exiled in 1887.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each state or region with its main legitimate product.",
    pairs: [
      ["Niger Delta states", "Palm oil"],
      ["Senegambia", "Groundnuts"],
      ["Zanzibar", "Cloves and ivory"],
      ["Asante", "Gold, kola and rubber"],
    ],
    explanation: "Each region specialised in different goods.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each ruler or state with the outcome.",
    pairs: [
      ["Jaja of Opobo", "Founded a powerful middleman state and was exiled in 1887"],
      ["Dahomey", "Partial change to palm oil; conquered by France in 1892-94"],
      ["Asante", "Lost revenue; under British control by 1901"],
      ["Zanzibar", "Rich from cloves and ivory; slave market closed in 1873"],
    ],
    hints: ["Two states were conquered, one ruler was exiled and one had its market closed."],
    explanation: "These outcomes show the variety of experiences.",
  });
  {
    const events = [
      "Jaja founds Opobo",
      "The slave market at Zanzibar is closed",
      "The Berlin Conference declares free trade in the Niger basin",
      "Jaja is arrested and exiled",
    ];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: events,
      right: POS,
      rightIndex: [0, 1, 2, 3],
      hints: ["The dates are 1869, 1873, 1884-85 and 1887."],
      explanation: "Opobo 1869; Zanzibar market closed 1873; Berlin Conference 1884-85; Jaja exiled 1887.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Jaja founded the state of {{blank:a}} in {{blank:b}} after leaving Bonny.",
    blanks: [
      { id: "a", accepted: ["Opobo"], choices: ["Opobo", "Brass", "Calabar", "Lagos"] },
      { id: "b", accepted: ["1869"], choices: ["1807", "1851", "1869", "1887"] },
    ],
    explanation: "Opobo was founded in 1869.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to an African merchant or state that bought goods inland and sold them to European traders on the coast?",
    accepted: ["middleman", "middlemen", "a middleman", "middleman state"],
    wrong: ["recaptive"],
    explanation: "A **middleman**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the growth of legitimate trade in West Africa.",
    points: ["Palm oil, groundnuts and later rubber became the main exports", "European industry needed oil for soap, candles and machinery", "The Niger Delta states and Opobo became rich as middlemen", "Ports and towns grew, such as Lagos and Bonny"],
    modelAnswer: "Palm oil, groundnuts and later rubber became the main exports. European industry needed oil for soap, candles and machinery. The Niger Delta states and Opobo grew rich as middlemen, and ports and towns such as Lagos and Bonny grew.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why industrial Europe wanted African products such as palm oil.",
    points: [["Palm oil was used for soap and candles and as a lubricant for machinery, so factories needed it", 2], ["Abolition encouraged merchants to find new goods, and rubber and groundnuts met further needs of industry", 2]],
    hints: ["Think of what factories used."],
    modelAnswer: "Palm oil was used for soap and candles and as a lubricant for machinery, so the factories of Europe needed it. After abolition merchants looked for new goods, and groundnuts and rubber met further needs of industry.",
    explanation: "One mark for each reason and one for development.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how legitimate trade led to European interference in Africa.",
    points: [["Consuls and merchants demanded access and security, and used gunboats against rulers who blocked trade", 2], ["Rivalries and wars among trade houses gave a reason to intervene, and merchants called for protection which led towards annexation", 2]],
    hints: ["Think of Jaja and Kosoko."],
    modelAnswer: "Consuls and merchants demanded access and security, and used gunboats against rulers who blocked trade, as with Jaja. Rivalries and wars among trade houses gave a reason to intervene, and merchants called for protection, which led towards annexation.",
    explanation: "Credit reasons with development.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional British merchant on the Niger Delta, 1870",
        "The oil comes down in great canoes, and the chief of the town takes a toll on every cask. We cannot buy at the markets inland because the chief will allow no white man past his town. This is a bar to honest commerce."),
      "",
      source("Source B", "a statement by a fictional Delta trader-chief, 1870s",
        "We have the town, the canoes and the knowledge of the rivers. If the white man goes inland, what will be left for us? We trade fairly and pay our debts. The white man should deal with us as he always has."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the Delta chiefs' control of trade?", points: ["They took a toll on the oil", "They would not allow white traders to go inland"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about the middleman position of the Delta chiefs?", points: [["Agree: both show the chiefs control access to the inland markets", 2], ["Differ in view: A calls it a bar to honest commerce, B defends it as fair and necessary for the chiefs' livelihood", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are these sources as evidence about the conflict between African middleman states and European traders?", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a merchant with a commercial interest in breaking the middleman system, so he is likely to exaggerate the obstacle", 2], ["B is a chief with an interest in preserving his position, so he may overstate his fairness", 2], ["Own knowledge of Jaja and Opobo confirms that the chiefs controlled access and that Britain used the free-trade argument against them", 2]], modelAnswer: "Source A is by a merchant with a commercial interest in breaking the middleman system, so he is likely to exaggerate the obstacle. Source B is by a chief with an interest in preserving his position, so he may overstate how fair his trade was. My own knowledge of Jaja and Opobo confirms that the chiefs controlled access and that Britain used the free-trade argument against them. Both are partial, but together they show the nature of the conflict." }),
    ],
    hints: ["For (c), think of the interests of each writer."],
    explanation: "Both sources are invented: a merchant's report and a trader-chief's statement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "To what extent did legitimate trade bring benefit to West African societies?",
    levels: levels(8),
    points: [
      ["Benefits: new wealth for middleman states such as the Delta states and Opobo; growth of towns and ports; new classes of merchants", 2],
      ["Costs: instability and wars between trade houses; domestic slavery to produce oil; dependence on world prices", 2],
      ["European interference: consuls, gunboats and the removal of Jaja, leading towards colonisation", 2],
      ["Judgement on the balance", 2],
    ],
    hints: ["Weigh the wealth against the costs and the loss of independence."],
    modelAnswer: "Legitimate trade brought benefit to some. The Delta states and Opobo grew rich as middlemen, ports and towns developed, and a class of wealthy merchants arose. But there were costs. Rivalry between trade houses caused wars, domestic slavery grew where slaves were used to produce oil, and African economies became dependent on world prices. Above all, European consuls and gunboats interfered, removing rulers such as Jaja and preparing the way for colonisation. I conclude that the benefits were real but limited and uneven, and in the long run they were outweighed by the loss of independence.",
    explanation: "Credit explained benefits and costs and a supported judgement.",
  });

  b.card("DEFINITION", "What was legitimate trade?", "The trade in goods other than slaves, mainly palm oil, groundnuts, rubber and ivory, between Africans and Europeans in the nineteenth century.");
  b.card("DEFINITION", "What is a middleman state?", "A state or merchant that bought goods inland and sold them to Europeans on the coast, controlling access to the interior.");
  b.card("FACT", "When did Jaja found Opobo?", "1869, after leaving Bonny.");
  b.card("FACT", "What happened to Jaja in 1887?", "The British consul arrested him; he was tried and exiled to the West Indies and died in 1891 on the way home.");
  b.card("FACT", "When did France conquer Dahomey?", "1892-94.");
  b.card("CONCEPT", "Why did Europe want palm oil?", "For soap, candles and the lubrication of machinery.");
  b.card("CONCEPT", "Why did Jaja's Opobo succeed?", "It was near the palm-oil markets, controlled the trade as a middleman and sold directly to Liverpool.");
  b.card("CONCEPT", "How did legitimate trade lead to colonisation?", "Rivalries, consuls, gunboats and merchants' demands for security and access led to interference and then annexation.");
  b.card("CONCEPT", "Which states adjusted poorly to legitimate trade?", "Dahomey and Asante, which depended on war and the slave trade for revenue.");
});
