// W1a: ahist.precolonial.state-origins-theories (ZIMSEC topic 2).
import { concept, P, source, levels } from "../lib.mjs";

concept("ahist.precolonial.state-origins-theories", { file: "precolonial/state-origins-theories", keyPrefix: "precolonial.state-origins-theories" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **tribute** in a pre-colonial state?",
    options: [
      ["Goods or labour that subjects gave to the ruler", "Correct: cattle, grain, ivory, gold or service owed to the ruler."],
      ["A payment made by the ruler to his regiments", "Tribute flowed to the ruler, not from him to his army."],
      ["A treaty signed with a European trading company", "Tribute was an internal obligation, not a treaty with outsiders."],
      ["A tax collected by a colonial administrator", "Colonial taxes belong to a later period."],
    ],
    answer: "A",
    explanation: "Tribute was the regular giving of goods or labour by subjects or conquered peoples to the ruler, and it supported the court and army.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which theory explains the rise of states mainly by the control of gold and ivory sold to the coast?",
    options: [
      ["The trade theory", "Correct: rulers grew wealthy from long-distance trade."],
      ["The conquest theory", "The conquest theory stresses military expansion."],
      ["The iron theory", "The iron theory stresses control of tools and weapons."],
      ["The religion theory", "The religion theory stresses the ruler's ritual authority."],
    ],
    answer: "A",
    explanation: "The trade theory links the growth of Great Zimbabwe and the Mutapa to the gold and ivory trade with the Indian Ocean.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature of most pre-colonial states helped to pay for the army and the court?",
    options: [
      ["Tribute collected from subjects", "Correct: tribute supplied food, cattle and goods."],
      ["Customs duties on the railways", "Railways came in the colonial period."],
      ["Loans from the colonial banks", "Banks of this kind did not exist in pre-colonial states."],
      ["Wages paid to miners by the state", "Wage labour was not the basis of these states' wealth."],
    ],
    answer: "A",
    explanation: "Tribute in cattle, grain, ivory and labour supported the ruler, officials and soldiers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What is the main weakness of the **iron technology** theory of state formation?",
    options: [
      ["Iron was widespread, even in communities that never became states", "Correct: iron was common, so it cannot alone explain states."],
      ["Iron tools were not known in southern Africa before the year 1800", "Iron-working was known from the early centuries CE."],
      ["Iron was used only by European traders who came to Africa", "Africans made iron themselves for many centuries."],
      ["Iron tools were too weak to be of any use in farming or war", "Iron tools were stronger than stone ones."],
    ],
    answer: "A",
    hints: ["If many communities had iron but only some formed states, what does that show?"],
    explanation: "A cause that is present in many places without producing states cannot be the only explanation.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A ruler appoints his sons and trusted relatives as governors of distant districts. Which benefit does this give the state?",
    options: [
      ["It ties the regions to the centre through kinship", "Correct: relatives were more likely to be loyal to the ruler."],
      ["It abolishes the need for tribute from the regions", "Governors normally collected tribute."],
      ["It removes the need for an army to defend the state", "A state still needed an army."],
      ["It guarantees that no succession dispute can ever arise", "Ambitious relatives often caused succession disputes."],
    ],
    answer: "A",
    hints: ["Think about why a ruler trusts relatives."],
    explanation: "Governors who were relatives strengthened centralisation, but ambitious relatives could also challenge the ruler, which is a weakness.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which comparison of the Zulu state and Great Zimbabwe is best supported by the theories of state formation?",
    options: [
      ["Conquest mattered more for the Zulu, trade more for Great Zimbabwe", "Correct: the Zulu rose through military reorganisation, Great Zimbabwe through trade and cattle."],
      ["Trade mattered more for the Zulu, conquest more for Great Zimbabwe", "This reverses the usual conclusions."],
      ["Neither state used cattle or farming as a source of wealth", "Both depended on cattle and farming."],
      ["Both states grew only because of European intervention", "Both arose before European intervention."],
    ],
    answer: "A",
    hints: ["Which state is famous for its army, and which for its gold and ivory?"],
    explanation: "The same theories apply in different proportions: conquest for the Zulu, trade and surplus for Great Zimbabwe.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A chiefdom is generally smaller than a state and has a less centralised government.",
    answer: true,
    explanation: "True. A chiefdom is a small unit under a chief; a state has a central ruler, officials, an army and tribute over a wider area.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Most historians accept that only one cause, such as trade, explains the rise of every pre-colonial African state.",
    answer: false,
    explanation: "False. Most historians combine several theories and give them different weights for different states.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Succession disputes are an example of a weakness that arose from the centralisation of power in one ruler.",
    answer: true,
    hints: ["What happens when many powerful relatives want the one top position?"],
    explanation: "True. Because power was concentrated in the ruler, who succeeded him became crucial, and rival claimants could split the state.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each theory with its main idea.",
    pairs: [
      ["Trade theory", "Rulers gained wealth by controlling exchange of gold and ivory"],
      ["Surplus theory", "Farming and cattle produced extra food to support rulers"],
      ["Religion theory", "Rulers gained authority as links to the ancestors"],
      ["Conquest theory", "States grew by defeating and incorporating neighbours"],
    ],
    explanation: "Each theory stresses a different source of power.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each state with the theory that best explains its rise.",
    pairs: ["Great Zimbabwe (gold and ivory sold to the coast)", "Ndebele state under Mzilikazi (raiding and incorporating others)", "Rozvi state (the Mwari cult and ritual authority)"],
    right: ["Trade", "Conquest", "Religion and ritual leadership"],
    rightIndex: [0, 1, 2],
    hints: ["Choose the most important factor in each case, remembering that others also contributed."],
    explanation: "Each example highlights one main cause, but most states combined several.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Extra food or goods beyond what a community needs is called a {{blank:a}}, and the central gathering of power by a ruler is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["surplus"], choices: ["surplus", "tribute", "treaty", "shortage"] },
      { id: "b", accepted: ["centralisation"], choices: ["migration", "centralisation", "irrigation", "rebellion"] },
    ],
    explanation: "A surplus supports rulers and specialists; centralisation concentrates power at the centre.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What name is given to goods or labour that subjects owed to a ruler? (One word.)",
    accepted: ["tribute"],
    wrong: ["tax"],
    explanation: "**Tribute** such as cattle, grain, ivory or labour was owed to the ruler.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the political organisation of a typical pre-colonial state.",
    points: ["A ruler at the head, seen as sacred or as the link to the ancestors", "A council of relatives and senior men who advised him", "Governors or regional chiefs who ruled distant areas and collected tribute", "An army and courts to defend the state and settle disputes"],
    modelAnswer: "A ruler stood at the head of the state, often regarded as sacred. He was advised by a council of relatives and senior men. Regional chiefs or governors ruled distant areas and collected tribute for him, and he kept an army and courts to defend the state and settle disputes.",
    explanation: "One mark for each feature described.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how tribute helped a state to expand.",
    points: [["Tribute in cattle, grain and goods fed the court and the army", 2], ["Regular payment tied subject peoples to the centre, and rewards from tribute bought loyalty, so the state could grow", 2]],
    hints: ["Think about what tribute paid for and what it did to subjects."],
    modelAnswer: "Tribute in cattle, grain and goods fed the ruler's court and army, so he could keep a permanent force for conquest and defence. Regular payment tied subject peoples to the centre, and the ruler could reward loyal officials with a share, which kept the state together as it grew.",
    explanation: "Credit what tribute paid for and how it tied people to the state.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** weaknesses of states that depended on one powerful ruler.",
    points: [["Succession disputes could split the state when he died", 2], ["Subject peoples could rebel if the ruler weakened, or if tribute became too heavy", 2]],
    hints: ["Think about what happens when the ruler dies or loses control."],
    modelAnswer: "When a ruler died, rival claimants could fight over the succession and divide the state. Subject peoples who resented heavy tribute could also rebel when the ruler was weak, because the unity of the state rested on his personal authority.",
    explanation: "One mark for each weakness, one for explaining why it follows from dependence on one ruler.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was trade the main reason for the rise of pre-colonial states in southern Africa?",
    levels: levels(6),
    points: [["For: gold and ivory trade gave rulers wealth to reward followers (Great Zimbabwe, Mutapa)", 2], ["Against: surplus, iron, religion, environment and conquest also mattered; the Zulu rose with little long-distance trade", 2], ["Judgement: trade was important in some states but most were shaped by several causes", 2]],
    hints: ["Give the case for trade, then states where trade was less important."],
    modelAnswer: "Trade was important in states such as Great Zimbabwe and the Mutapa, where rulers gained wealth from selling gold and ivory to the coast and used it to reward followers. However, other states grew mainly through conquest, as the Zulu did, and everywhere farming surplus, cattle, religion and the environment played a part. Trade was therefore a key cause in some states, but not the main reason in all of them.",
    explanation: "A strong answer weighs trade against other causes with named examples.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a summary of oral tradition from a fictional elder in the north of the plateau, recorded in the 1950s",
        "Our king did not lift a hoe. The people of the villages brought him grain and cattle every season, and young men came to serve him for a year. The king gave the best cattle to those who served him well, and so the people stayed loyal."),
      "",
      source("Source B", "an extract from a letter written by a fictional Portuguese trader in the sixteenth century",
        "This king has a very large number of vassals and keeps many wives. All the traders must give him a share of the cloth and beads they bring, and he alone allows them to buy gold in his country."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A say the king received from the people?", points: ["Grain and cattle", "Service from young men"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How do the two sources show different ways in which a ruler could become powerful?", points: [["A: through tribute and by rewarding loyal followers with cattle", 2], ["B: through control of trade, as only he allowed the buying of gold and he took a share of imported goods", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far do these sources support the view that trade was the most important basis of a ruler's power? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["Support: B shows the king controlling and taxing trade and the sale of gold", 2], ["Challenge: A shows power based on tribute, cattle and service, with no mention of trade", 2], ["Judgement with own knowledge: states such as Great Zimbabwe combined both trade and cattle surplus; neither source is complete", 2]], modelAnswer: "Source B supports the view, because the king controls the traders and allows only himself to deal in gold, taking a share of cloth and beads. However, Source A shows that the king's power also rested on tribute, cattle and the service of young men, and does not mention trade at all. My own knowledge supports a combination: Great Zimbabwe's rulers drew wealth from the gold trade, but also from cattle, tribute and religious authority. Trade was therefore very important, but not the only basis of power." }),
    ],
    hints: ["For (c), find one point in each source and add an example from your own knowledge."],
    explanation: "Both sources are invented. A is an oral tradition, B a written source by an outsider.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess how far the organisation of pre-colonial states explains their expansion.",
    levels: levels(8),
    points: [
      ["Tribute and a permanent army or regiments allowed conquest and defence", 2],
      ["Centralisation, appointed governors and marriage alliances held larger territories together; incorporation increased manpower", 2],
      ["Other factors: trade, cattle, environment, leadership; organisation also created weaknesses such as succession disputes", 2],
      ["Judgement with examples", 2],
    ],
    hints: ["Link each feature of organisation to expansion, then consider other causes."],
    modelAnswer: "Organisation explains a great deal. Tribute fed the court and army, and a permanent army or regiments allowed conquest and defence. Centralisation through governors, relatives and marriage alliances held larger territories together, and incorporating conquered peoples increased manpower, as in the Zulu and Ndebele states. However, organisation was not the only factor. Trade in gold and ivory, cattle wealth, a favourable environment and able leaders such as Shaka also mattered, and the same organisation created weaknesses such as succession disputes. Organisation was therefore a necessary condition of expansion, but it worked together with wealth and leadership.",
    explanation: "Credit explained links between features and expansion, other factors and judgement.",
  });

  b.card("DEFINITION", "What is a state (in pre-colonial history)?", "A society with a central authority that can collect tribute, settle disputes and organise defence over a territory and its people.");
  b.card("DEFINITION", "What is tribute?", "Goods or labour (cattle, grain, ivory, gold or service) that subjects or conquered peoples owed to a ruler.");
  b.card("DEFINITION", "What is a surplus?", "Food or goods produced beyond what a community needs, which can support rulers, soldiers and craftsmen.");
  b.card("DEFINITION", "What is centralisation?", "The gathering of political power in a ruler and his officials at the centre.");
  b.card("CONCEPT", "Name the six theories for the rise of pre-colonial states.", "Trade; surplus from farming and cattle; iron technology; religion and ritual leadership; conquest and migration; environment.");
  b.card("CONCEPT", "What is the limitation of the trade theory?", "Trade may follow state growth rather than cause it, and some states, such as the Zulu, grew with little long-distance trade.");
  b.card("CONCEPT", "How did organisation help states to expand?", "Tribute paid for the court and army; governors, marriage alliances and incorporation held regions together; shared religion gave unity.");
  b.card("CONCEPT", "What weaknesses did centralised states have?", "Succession disputes, rebellion of subject peoples and dependence on one ruler or one trade.");
  b.card("CONCEPT", "Why do historians combine theories of state formation?", "No single cause explains every state; each theory has limits, and different states grew through different mixtures of trade, surplus, religion, conquest and environment.");
});
