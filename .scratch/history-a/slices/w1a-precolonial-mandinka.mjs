// W1a: ahist.precolonial.mandinka (ZIMSEC topic 2; Paper 2 material).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.mandinka", { file: "precolonial/mandinka", keyPrefix: "precolonial.mandinka" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who built the Mandinka state that resisted the French in the late nineteenth century?",
    options: [
      ["Samori Toure, a Dyula trader's son", "Correct: he created a state and army in present-day Guinea."],
      ["Sundiata Keita, the founder of Mali", "Sundiata lived in the thirteenth century."],
      ["Mansa Musa, the pilgrim emperor", "Mansa Musa ruled Mali in the fourteenth century."],
      ["Menelik II, the emperor of Ethiopia", "Menelik ruled Ethiopia, in East Africa."],
    ],
    answer: "A",
    explanation: "Samori Toure was the nineteenth-century founder of the Mandinka (Wassoulou) state. Sundiata and Mansa Musa belong to the earlier Mali empire.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who were the **sofa** in Samori's army?",
    options: [
      ["Professional infantry soldiers", "Correct: the sofa were the paid core of the army."],
      ["Muslim judges in the provinces", "Judges were not called sofa."],
      ["French officers who trained the army", "French officers were Samori's enemies."],
      ["Traders who supplied the army with horses", "Traders supplied goods but were not soldiers."],
    ],
    answer: "A",
    explanation: "The sofa were Samori's professional infantry, supported by cavalry and levies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "From which colony did Samori mainly obtain breech-loading rifles?",
    options: [
      ["Sierra Leone, under British rule", "Correct: arms came through trade with the British colony."],
      ["Egypt, under Ottoman rule", "Egypt is far to the north-east."],
      ["South Africa, under Boer rule", "South Africa lies at the other end of the continent."],
      ["Mozambique, under Portuguese rule", "Mozambique is in south-east Africa."],
    ],
    answer: "A",
    explanation: "Trade with Sierra Leone gave Samori rifles, which his workshops repaired and sometimes copied.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What was the purpose of Samori's scorched-earth tactics against the French?",
    options: [
      ["To deny the French food as they advanced", "Correct: the French could not live off the burned land."],
      ["To force conquered peoples to become Muslims", "Forced conversion was a separate policy."],
      ["To clear land for the workshops that made rifles", "Scorched earth destroyed land rather than preparing it."],
      ["To attack the king of Sikasso in his stronghold", "Sikasso was a rival, but scorched earth was aimed at the French."],
    ],
    answer: "A",
    hints: ["Think about how an army lives off the land."],
    explanation: "Burning crops and villages in the path of the French was meant to slow them down, but it also damaged Samori's own economic base and angered local people.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How did Islam help Samori to build his state?",
    options: [
      ["It gave a common ideology above clan loyalties", "Correct: a shared faith and law helped to unite a mixed population."],
      ["It made all conquered peoples accept his rule willingly", "Forced conversion caused revolts."],
      ["It gave him the support of the French authorities", "The French opposed him."],
      ["It removed the need for a regular army", "He relied on a professional army."],
    ],
    answer: "A",
    hints: ["Think about what a shared religion does to a group of different peoples."],
    explanation: "Islam gave a unifying idea and law, but forced conversion in some districts caused resentment.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which factor most clearly explains why Samori lost access to modern rifles in the 1890s?",
    options: [
      ["European borders closed the Sierra Leone arms trade", "Correct: colonial boundaries cut his supply."],
      ["His own workshops were destroyed by a flood in 1890", "There is no evidence of such a flood."],
      ["His Dyula traders refused to sell him any more gold", "Gold sales continued as long as the territory was held."],
      ["The Sikasso rulers captured his capital at Bissandugu", "Bissandugu fell to the French, not to Sikasso."],
    ],
    answer: "A",
    hints: ["Consider the effect of European partition on trade routes."],
    explanation: "Agreements between Britain and France fixed borders and ended the trade through Sierra Leone on which Samori depended.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which comparison between Samori Toure and Lobengula is accurate?",
    options: [
      ["Both used diplomacy first and both were beaten by Europeans", "Correct: Lobengula in 1893-94 and Samori in 1898."],
      ["Both obtained their power from the Zulu kingdom of Shaka", "Samori had no link with the Zulu kingdom."],
      ["Both were captured and exiled to Gabon after defeat", "Lobengula died in flight and was not exiled."],
      ["Both were Muslim rulers who used the title Almamy", "Lobengula was not Muslim."],
    ],
    answer: "A",
    hints: ["Check each statement for factual errors."],
    explanation: "Both rulers tried diplomacy and then fought, and both lost to better-armed Europeans.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Samori Toure was captured by the French in 1898.",
    answer: true,
    explanation: "True. He was captured on 29 September 1898 and died in exile in 1900.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Samori's army included professional soldiers, cavalry and levies from conquered peoples.",
    answer: true,
    explanation: "True. The sofa formed the core, supported by cavalry and levies.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "Samori's defeat was inevitable from the start because he had no modern weapons.",
    answer: false,
    hints: ["He resisted for about sixteen years."],
    explanation: "False. Samori obtained modern rifles and resisted for about sixteen years. He lost partly because the supply of arms was cut off and because of internal opposition.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Dyula", "Mande trading people, often Muslim"],
      ["Almamy", "A Muslim religious and political leader"],
      ["Sofa", "A professional infantry soldier"],
      ["Mande", "People of the upper Niger who built the Mali empire"],
    ],
    explanation: "These terms are needed to describe Samori's state.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each feature of Samori's state with the way it helped his power.",
    pairs: [
      ["Workshops for repairing and copying rifles", "Kept the army supplied with modern weapons"],
      ["Gold of Buré and trade in kola", "Paid for horses, rifles and soldiers"],
      ["Islam and Qur'anic law", "Gave a common ideology to a mixed population"],
      ["Sofa infantry", "Provided a professional core of the army"],
    ],
    hints: ["Think about weapons, money, belief and organisation."],
    explanation: "Weapons, finance, ideology and organisation worked together.",
  });
  {
    const events = [
      "Sundiata Keita founds the Mali empire",
      "Samori builds an army and a state",
      "Samori takes the title Almamy",
      "Samori is captured by the French",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Mali is medieval; the others are nineteenth-century."],
      explanation: "Thirteenth century, 1860s-1870s, about 1884, 1898.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Samori Toure was captured in {{blank:a}} and died in exile in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1898"], choices: ["1879", "1893", "1898", "1905"] },
      { id: "b", accepted: ["1900"], choices: ["1895", "1900", "1910", "1920"] },
    ],
    explanation: "Captured on 29 September 1898; died in 1900.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which European power conquered Samori Toure's state?",
    accepted: ["France", "the French", "French"],
    wrong: ["Britain"],
    explanation: "**France** captured Samori in 1898.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the army of Samori Toure.",
    points: ["A standing army of professional soldiers (sofa)", "Cavalry and levies from conquered peoples supported the infantry", "Modern breech-loading rifles obtained through Sierra Leone", "Workshops repaired and copied firearms; discipline and drill"],
    modelAnswer: "Samori had a standing army of paid professional soldiers called sofa, supported by cavalry and levies from conquered peoples. His men used modern breech-loading rifles obtained through Sierra Leone, and his workshops repaired and copied firearms. The army was trained and disciplined.",
    explanation: "One mark for each feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the economy of Samori's state supported his army.",
    points: [["Gold from Buré, trade in kola, cattle and cloth earned wealth", 2], ["This wealth, and the sale of captives, bought horses and rifles, while tribute fed the soldiers", 2]],
    hints: ["Link income to what it bought."],
    modelAnswer: "Samori's state earned wealth from the gold of Buré and from trade in kola nuts, cattle and cloth. This wealth, together with the sale of captives taken in war, bought horses and rifles, and tribute from conquered peoples fed the soldiers.",
    explanation: "One mark for income and one for how it supported the army, for each of two points.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons for the fall of Samori Toure's state.",
    points: [["The French had artillery, machine guns and better supplies", 2], ["Samori lost his arms supply and faced revolts of peoples angered by forced conversion and heavy demands", 2]],
    hints: ["One reason is French strength, one is Samori's weakness."],
    modelAnswer: "The French had artillery, machine guns and better supplies than Samori's army. Samori also lost access to rifles when borders closed the Sierra Leone trade, and peoples angered by forced conversion and heavy demands for food and men rebelled against him.",
    explanation: "One mark for each reason and one for explaining it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was the lack of African unity the main reason for the fall of Samori's state?",
    levels: levels(6),
    points: [["Rival rulers such as the king of Sikasso sometimes helped the French and conquered peoples revolted", 2], ["But French weapons, loss of rifle supply and scorched earth were also decisive", 2], ["Judgement", 2]],
    hints: ["Separate political divisions from military and economic factors."],
    modelAnswer: "Lack of African unity mattered: rival rulers such as the king of Sikasso sometimes helped the French, and peoples conquered by Samori revolted against him. However, French artillery and machine guns, the loss of his rifle supply when borders closed the Sierra Leone trade, and his own scorched-earth policy were also decisive. I conclude that disunity was an important cause, but it was one of several, and French military power was the main reason for the final defeat.",
    explanation: "Credit both sets of factors and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional French officer, written in the 1890s",
        "The almamy's soldiers are as brave as any we have fought. They are armed with good rifles, and his smiths make cartridges. His power rests on the faith he has given his people and on the discipline of his troops. Yet the villages he has taken hate his demands."),
      "",
      source("Source B", "a tradition recounted by a fictional elder from a village in Guinea in the twentieth century",
        "Samori came to us as a man of the faith and of the sword. He told us to pray and to give grain and sons. When the French came, he burned our fields so that they could not eat. Many of our people died."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about the strength of Samori's army?", points: ["Soldiers were brave and had good rifles", "Smiths made cartridges and the troops were disciplined"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How do the sources differ in their view of Samori's rule?", points: [["A stresses his military strength and the faith that unified his people, though it notes hatred of demands", 2], ["B stresses the demands of grain and sons and the suffering caused by burned fields", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How reliable are the sources for judging Samori's rule? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is a French officer's report: informed about the army but an enemy who may exaggerate hatred of Samori to justify conquest", 2], ["B is a tradition recorded long afterwards from the viewpoint of villagers who suffered, so it may stress suffering", 2], ["Own knowledge: sofa, workshops, scorched earth, forced conversion; the sources agree that demands caused resentment, which gives support", 2]], modelAnswer: "Neither source is fully reliable, but together they are useful. Source A is a report by a French officer, who knew the army well and describes the rifles, the smiths and the discipline, which fits what I know of the sofa and the workshops. But he was an enemy and may exaggerate the hatred of the villages in order to justify the conquest. Source B is a tradition told long afterwards from the viewpoint of villagers who suffered, so it may stress the harm of the demands and the burned fields. The two sources, from opposite sides, agree that Samori's demands caused resentment and my knowledge of scorched earth and forced conversion supports this. They are therefore reliable on resentment but should be checked for the strength of the state." }),
    ],
    hints: ["For (c), consider the position of each writer, then check against your own knowledge."],
    explanation: "Both sources are invented: a French report and a village tradition.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the reasons why Samori Toure was able to resist the French for so long.",
    levels: levels(8),
    points: [
      ["A professional army of sofa with cavalry, drill and discipline", 2],
      ["Modern rifles from Sierra Leone, workshops, and an economy of gold, kola and trade that paid for them", 2],
      ["Islam as a unifying ideology; diplomacy with treaties and moving east; scorched earth", 2],
      ["Judgement: army and arms were the main reasons, supported by organisation and tactics; limits to success", 2],
    ],
    hints: ["Cover army, weapons, economy, ideology and tactics before judging."],
    modelAnswer: "Samori resisted for about sixteen years for several reasons. He built a professional army of sofa supported by cavalry and levies, and trained them with drill and discipline. He obtained modern rifles through Sierra Leone and kept them in use with his own workshops, paying for weapons and horses from the gold of Buré, trade in kola and the sale of captives. Islam gave his people a common ideology, and he used diplomacy, treaties with the French and a move to the east to gain time. His scorched-earth tactics slowed the French advance. Of these reasons, the army and its modern weapons were the most important, but they depended on the economy and on skilful leadership; and his resistance eventually failed when the arms supply was cut and subject peoples rose against him.",
    explanation: "Credit explained reasons and a supported judgement.",
  });

  b.card("DEFINITION", "Who were the Dyula?", "Mande traders, often Muslim, who carried gold, kola nuts, salt and cloth across West Africa; Samori's family belonged to them.");
  b.card("DEFINITION", "What were the sofa?", "The professional infantry soldiers of Samori's army.");
  b.card("DEFINITION", "What does Almamy mean?", "\"The Imam\": a Muslim religious and political leader; Samori took the title about 1884.");
  b.card("FACT", "When was Samori Toure captured?", "29 September 1898, by the French; he died in exile in 1900.");
  b.card("FACT", "Where did Samori get modern rifles?", "Through trade with the British colony of Sierra Leone; his workshops repaired and copied them.");
  b.card("FACT", "Which empire was the Mande heritage?", "The Mali empire, founded by Sundiata Keita in the thirteenth century.");
  b.card("CONCEPT", "How did Samori use Islam?", "As a unifying ideology and law above clan loyalties, though forced conversion caused revolts.");
  b.card("CONCEPT", "Give three reasons why Samori's state fell.", "French artillery and machine guns, loss of arms supply and revolts of subject peoples (also scorched earth and lack of African unity).");
  b.card("CONCEPT", "How do Samori and Lobengula compare?", "Both tried diplomacy before war and both were defeated by better-armed Europeans in the 1890s.");
});
