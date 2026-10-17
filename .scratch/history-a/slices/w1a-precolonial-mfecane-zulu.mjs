// W1a: ahist.precolonial.mfecane-zulu (ZIMSEC topic 2; Paper 2 material).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.mfecane-zulu", { file: "precolonial/mfecane-zulu", keyPrefix: "precolonial.mfecane-zulu" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word **Mfecane** mean?",
    options: [
      ["The crushing blow", "Correct: the Nguni word for the period of wars and upheaval."],
      ["The great trek", "The Great Trek refers to the Boer migration of the 1830s and 1840s."],
      ["The first harvest", "The first-fruits ceremony is a different Zulu custom."],
      ["The new weapon", "Shaka's spear was the iklwa, but this is not the meaning of the word."],
    ],
    answer: "A",
    explanation: "Mfecane, an Nguni word, is usually translated \"the crushing\". The Sotho word is Difaqane (\"forced migration\").",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which chief built the Mthethwa confederacy and helped Shaka to rise?",
    options: [
      ["Dingiswayo", "Correct: Shaka served in his army."],
      ["Zwide", "Zwide led the rival Ndwandwe and killed Dingiswayo."],
      ["Sobhuza", "Sobhuza led the Ngwane and founded the Swazi kingdom."],
      ["Moshoeshoe", "Moshoeshoe founded the Basotho kingdom."],
    ],
    answer: "A",
    explanation: "Dingiswayo was the Mthethwa leader and Shaka's patron. Zwide of the Ndwandwe killed him about 1818.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which weapon did Shaka introduce to make close-quarter fighting decisive?",
    options: [
      ["A short stabbing spear (iklwa)", "Correct: it replaced the long throwing assegai."],
      ["A long throwing assegai", "This was the older weapon that he replaced."],
      ["A flintlock musket from the coast", "Muskets came to the Zulu later and were not the key to Shaka's tactics."],
      ["A bow with poisoned arrows", "This was a weapon of the San hunters."],
    ],
    answer: "A",
    explanation: "The short stabbing spear and the large shield made fast, close fighting possible.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What was the \"buffalo horns\" formation?",
    options: [
      ["Wings that surrounded the enemy as the centre struck", "Correct: the chest, horns and loins worked together."],
      ["A line of marksmen firing volleys from fixed positions", "This describes European musket tactics."],
      ["A fortified camp of thorn bush guarded by sentries", "A fortified camp is not what the formation means."],
      ["A parade of warriors in headdresses before the king", "It was a battle formation, not a parade."],
    ],
    answer: "A",
    hints: ["Think of horns curving around an enemy."],
    explanation: "The \"horns\" encircled the enemy, the \"chest\" struck the front and the \"loins\" were a reserve.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which argument is associated with Julian Cobbing's \"The Mfecane as alibi\" (1988)?",
    options: [
      ["Slave raiding and colonial pressure caused the upheaval", "Correct: he argued that European slaving was under-stated."],
      ["Shaka's military genius alone explains the whole upheaval", "This is the older view that Cobbing challenged."],
      ["The upheaval was invented by historians and never happened", "He argued the causes were misplaced, not that no upheaval occurred."],
      ["Drought was the only cause and there were no real wars", "This is not his argument."],
    ],
    answer: "A",
    hints: ["He argued that the standard explanation hid a different group's responsibility."],
    explanation: "Cobbing argued that slave raiding from Delagoa Bay and the Cape was a major cause, and that blaming Shaka concealed European responsibility. Other historians accept some of his view but dispute the extent.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the results of the Mfecane in Zimbabwe is correct?",
    options: [
      ["It brought the Ndebele and Gaza states and the Nguni raiders", "Correct: groups fleeing or following Zulu expansion reached Zimbabwe."],
      ["It had no effect on Zimbabwe, which was too far from Zululand", "Several groups from the south crossed the Limpopo."],
      ["It created the Mutapa state in the north of the country", "The Mutapa state arose in the fifteenth century."],
      ["It led to the building of the walls of Great Zimbabwe", "Great Zimbabwe was built centuries earlier."],
    ],
    answer: "A",
    hints: ["Think of Mzilikazi, Soshangane, Zwangendaba and Nxaba."],
    explanation: "The Ndebele settled in the south-west, the Gaza in the south-east and Nguni raiders attacked the Rozvi.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Why do historians disagree about the scale of the Mfecane?",
    options: [
      ["Evidence is mostly oral tradition and outsiders' accounts", "Correct: evidence is limited and viewpoints differ."],
      ["Every written record was destroyed by the British in 1879", "There is no evidence of destruction on this scale."],
      ["Zulu leaders did not allow anyone to record their history", "Missionaries and traders recorded events; oral tradition also survives."],
      ["Historians agree about it, so there is no disagreement", "Historians dispute causes and scale."],
    ],
    answer: "A",
    hints: ["What kinds of source survive for these years?"],
    explanation: "Evidence comes mainly from oral traditions, missionaries and traders, each with limits and bias, so historians dispute the scale and causes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Shaka was assassinated in 1828 by his half-brothers Dingane and Mhlangana.",
    answer: true,
    explanation: "True. Dingane then became king.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Shaka reduced the power of hereditary chiefs and appointed loyal officials to govern for him.",
    answer: true,
    explanation: "True. This centralisation strengthened the king's control.",
  });
  b.tf({
    d: 3, skill: "EVALUATION",
    stem: "Historians agree that Shaka's wars were the only cause of the upheaval known as the Mfecane.",
    answer: false,
    hints: ["Recall Omer-Cooper, Cobbing and other explanations."],
    explanation: "False. Historians debate the weight of Zulu expansion, drought, trade, population pressure and slave raiding.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Impi", "A Zulu fighting force"],
      ["Ibutho", "An age regiment"],
      ["Ikhanda", "A royal military town"],
      ["Difaqane", "The Sotho word for the period of forced migrations"],
    ],
    explanation: "These terms are needed for answers on Zulu organisation and the Mfecane.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each leader or group with the state or kingdom they are linked with.",
    pairs: [
      ["Mzilikazi", "The Ndebele state"],
      ["Soshangane", "The Gaza state"],
      ["Moshoeshoe", "The Basotho kingdom"],
      ["Sobhuza", "The Swazi kingdom"],
    ],
    hints: ["All four are linked with the aftermath of the Zulu rise."],
    explanation: "These leaders founded or led new states in the aftermath of the Mfecane.",
  });
  {
    const events = [
      "Shaka becomes chief of the Zulu",
      "Shaka is assassinated by Dingane and Mhlangana",
      "The Boers defeat the Zulu at Blood River",
      "The Zulu win at Isandlwana but lose at Ulundi",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Dates: about 1816, 1828, 1838, 1879."],
      explanation: "About 1816, 1828, 1838, 1879.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Shaka defeated Zwide's {{blank:a}} and the Zulu kingdom was defeated by the British at {{blank:b}} in 1879.",
    blanks: [
      { id: "a", accepted: ["Ndwandwe"], choices: ["Ndwandwe", "Mthethwa", "Swazi", "Basotho"] },
      { id: "b", accepted: ["Ulundi"], choices: ["Ulundi", "Isandlwana", "Blood River", "Mosega"] },
    ],
    explanation: "The Ndwandwe were Shaka's rivals; Ulundi (4 July 1879) was the decisive British victory.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the place where the Zulu destroyed a British column in January 1879.",
    accepted: ["Isandlwana", "Isandhlwana"],
    wrong: ["Ulundi"],
    explanation: "**Isandlwana**: a Zulu victory, followed by defeat at Ulundi.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** military reforms of Shaka.",
    points: ["Short stabbing spear (iklwa) for close fighting", "Large cowhide shield", "\"Buffalo horns\" formation that surrounded the enemy", "Age regiments in military towns under strict discipline"],
    modelAnswer: "Shaka introduced a short stabbing spear for close fighting and a large cowhide shield. His army fought in the \"buffalo horns\" formation which surrounded the enemy, and young men were organised into age regiments that lived in military towns under strict discipline.",
    explanation: "One mark for each reform described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how Shaka's centralisation made the Zulu kingdom stronger.",
    points: [["He reduced the power of hereditary chiefs and appointed loyal izinduna, so authority came from the king", 2], ["Regiments served the king not the clan, and cattle from defeated peoples went to the king, which paid for a large army", 2]],
    hints: ["Think about who controlled the army and the cattle."],
    modelAnswer: "Shaka reduced the power of hereditary chiefs and appointed loyal officials, so authority came from the king alone. The regiments served him, not their clan chiefs, and cattle from defeated peoples were taken for the king, which paid for a large and loyal army.",
    explanation: "One mark for each point and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** consequences of the Mfecane for areas outside the Zulu kingdom.",
    points: [["New states were formed by groups that moved away, such as the Ndebele, Gaza, Swazi, Basotho and Kololo", 2], ["Societies in the path of these groups were attacked or weakened, such as the Rozvi, and Nguni military ideas spread", 2]],
    hints: ["Consider both new states and the damage done to others."],
    modelAnswer: "New states were formed by groups that moved away from the Zulu, such as the Ndebele, Gaza, Swazi, Basotho and Kololo. Societies in the path of these groups, such as the Rozvi, were attacked and weakened, and Nguni military organisation and languages spread over a wide area.",
    explanation: "One mark for each consequence and one for explaining it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was the rise of the Zulu state the main cause of the Mfecane?",
    levels: levels(6),
    points: [["For: Shaka's conquests drove defeated groups to flee and spread warfare", 2], ["Against: drought, population pressure, ivory and slave trades at Delagoa Bay, slave raiding (Cobbing), earlier rivalry among Mthethwa and Ndwandwe", 2], ["Judgement: Zulu expansion was one important cause among several; scale and causes are debated", 2]],
    hints: ["Present Omer-Cooper's view and Cobbing's, then decide."],
    modelAnswer: "The rise of the Zulu state was important: Shaka's conquests drove defeated groups to flee and spread warfare far beyond Natal. However, the Mthethwa and Ndwandwe were already competing before Shaka, drought and population pressure increased the struggle for cattle, and the ivory trade and slave raiding at Delagoa Bay and the Cape also created disorder, as Cobbing argued. I conclude that Zulu expansion was one major cause among several, and that historians still debate how much weight each deserves.",
    explanation: "Credit both views and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a description by a fictional European traveller of an army of the Zulu kind, written in the 1820s",
        "The regiments are drawn up in a half-moon. The young men in the wings are the fastest runners. At a sign from their captains they close upon the enemy from both sides, and the centre then charges. They carry short spears and large shields of hide."),
      "",
      source("Source B", "a statement by a fictional modern historian",
        "Shaka did not invent a new society overnight. The Mthethwa and the Ndwandwe had already begun to organise their young men into regiments. Drought and trade in ivory had made cattle and grazing more valuable than before, and Shaka built on these changes."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A show about the way the army fought?", points: ["It was drawn up in a half-moon with fast young men in the wings", "The wings closed on the enemy and the centre charged"] }),
      P.manual({ label: "(b)", marks: 4, stem: "How does Source B qualify the traditional view of Shaka?", points: [["It says that Shaka did not create the changes alone: Mthethwa and Ndwandwe had begun regimental organisation earlier", 2], ["It adds drought and the ivory trade as causes that increased the value of cattle and grazing", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are the two sources for explaining the rise of the Zulu state? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A: useful on tactics (the horns), but by an outsider who may have misunderstood and wrote of a single battle", 2], ["B: useful on causes and the wider context; modern historian with evidence but a short statement", 2], ["Own knowledge: Dingiswayo's regiments, Shaka's reforms, drought, Delagoa Bay trade; together the sources give a fuller picture", 2]], modelAnswer: "Source A is useful as contemporary evidence of the \"horns\" formation, which matches what I know of Shaka's tactics, but it is by an outsider who may have misunderstood what he saw and it describes only the way of fighting, not why the state arose. Source B is more useful for explaining causes, because it shows that Dingiswayo's Mthethwa and Zwide's Ndwandwe had already begun to organise regiments and that drought and the ivory trade raised the value of cattle and grazing. Together they give a fuller picture: Shaka's tactics were important, but they built on earlier changes and wider pressures." }),
    ],
    hints: ["For (c), separate what each source explains from what it leaves out."],
    explanation: "Both sources are invented. A is a traveller's description and B a modern historian's statement.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the consequences of the Mfecane for southern and central Africa.",
    levels: levels(8),
    points: [
      ["New states and kingdoms: Ndebele, Gaza, Swazi, Basotho, Kololo and Ngoni states", 2],
      ["Destruction and disruption: Rozvi state weakened, depopulation and loss of life (scale debated)", 2],
      ["Spread of Nguni military organisation, languages and culture; later European settlers occupied emptied land", 2],
      ["Judgement on the extent and the debate over exaggeration", 2],
    ],
    hints: ["Consider new states, destruction and spread of culture, then the debate about scale."],
    modelAnswer: "The Mfecane had far-reaching consequences. It created new states, including the Ndebele, Gaza, Swazi, Basotho, Kololo and Ngoni, and groups from the south carried Nguni military methods and languages to a wide area. It also destroyed or weakened others, such as the Rozvi, and the wars disrupted farming and trade and caused loss of life, although historians disagree about how many were killed or displaced and some argue that the older picture of a vast catastrophe has been overstated. Later, European settlers occupied some of the emptied land. On balance the Mfecane reshaped the political map of southern and central Africa, but its scale and causes remain debated.",
    explanation: "Credit specific consequences and a judgement that notes the debate.",
  });

  b.card("DEFINITION", "What was the Mfecane?", "The period of wars, migrations and state-building among the peoples of south-eastern Africa from the 1810s to the 1830s (Nguni: \"the crushing\"; Sotho: Difaqane).");
  b.card("DEFINITION", "What is a confederacy?", "A group of chiefdoms joined under one strong chief by alliance or conquest, without being fully merged.");
  b.card("FACT", "Who were Shaka's main rivals and patron?", "Zwide of the Ndwandwe was his rival; Dingiswayo of the Mthethwa was his patron.");
  b.card("FACT", "What happened on 16 December 1838?", "The Boers defeated Dingane's Zulu army at Blood River.");
  b.card("FACT", "What happened at Isandlwana and Ulundi in 1879?", "The Zulu destroyed a British column at Isandlwana (22 January) but were defeated at Ulundi (4 July).");
  b.card("FACT", "Which weapon did Shaka introduce?", "The short stabbing spear (iklwa) with a large hide shield.");
  b.card("CONCEPT", "Name Shaka's reforms.", "Stabbing spear and shield, buffalo-horns formation, age regiments in military towns, centralised appointment of izinduna, and incorporation of the defeated.");
  b.card("CONCEPT", "What did Cobbing argue in \"The Mfecane as alibi\" (1988)?", "That slave raiding from Delagoa Bay and the Cape was a major cause, and that blaming Shaka hid European responsibility.");
  b.card("CONCEPT", "Name states that arose from the Mfecane.", "Ndebele, Gaza, Ngoni, Swazi, Kololo and Basotho.");
});
