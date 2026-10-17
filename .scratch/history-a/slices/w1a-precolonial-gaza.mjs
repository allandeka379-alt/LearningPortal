// W1a: ahist.precolonial.gaza (ZIMSEC topic 2; Paper 2 material).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("ahist.precolonial.gaza", { file: "precolonial/gaza", keyPrefix: "precolonial.gaza" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who founded the Gaza state?",
    options: [
      ["Soshangane, a general of Zwide", "Correct: he fled north after the Ndwandwe were defeated."],
      ["Mzilikazi, a general of Shaka", "Mzilikazi founded the Ndebele state."],
      ["Ngungunyana, the last king", "Ngungunyana ruled from about 1884, long after the founding."],
      ["Changamire Dombo, the Rozvi leader", "Dombo founded the Rozvi state in the seventeenth century."],
    ],
    answer: "A",
    explanation: "Soshangane founded the Gaza state in the 1820s. Ngungunyana was the last important king.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which peoples were the main tributaries of the Gaza state?",
    options: [
      ["The Tsonga, Chopi and Ndau peoples", "Correct: conquered peoples of southern Mozambique and south-east Zimbabwe."],
      ["The Zulu, Swazi and Basotho peoples", "These peoples had their own kingdoms in the south."],
      ["The Rozvi, Torwa and Mutapa", "These were Shona-speaking states of the plateau."],
      ["The Herero, Nama and Ovambo", "These peoples live in what is now Namibia."],
    ],
    answer: "A",
    explanation: "The Gaza state ruled and taxed the Tsonga, Chopi and Ndau peoples.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why did many Gaza men work in South African mines in the 1880s?",
    options: [
      ["To earn wages that paid for guns and cloth", "Correct: wages helped the state to arm itself."],
      ["To escape forced labour for the Gaza king", "Work in the mines was not a flight from the king."],
      ["To repay a tax owed to the Boer republic", "They were not paying a Boer tax."],
      ["To join the army of the British Company", "The Company did not recruit Gaza men for its army."],
    ],
    answer: "A",
    explanation: "Migrant labour produced wages for guns and goods, linking Gaza to the new economy of southern Africa.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What happened at Coolela on 7 November 1895?",
    options: [
      ["A Portuguese force defeated the Gaza army", "Correct: modern rifles and machine guns beat the regiments."],
      ["The Gaza army defeated a Portuguese column", "The Gaza army was defeated."],
      ["Ngungunyana signed a treaty with the British", "No treaty was signed at Coolela."],
      ["The Gaza state split into two kingdoms", "The state ended when its king was captured."],
    ],
    answer: "A",
    hints: ["Think of the conquest of 1895."],
    explanation: "At Coolela Portuguese firepower defeated the Gaza regiments, and Ngungunyana was captured at Chaimite on 28 December 1895.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did the Portuguese decide to attack the Gaza state in 1895?",
    options: [
      ["To prove occupation and block Britain", "Correct: after the Berlin Conference they needed to occupy their claims."],
      ["To free the Gaza people from the Boers for good", "Boers did not rule the Gaza people."],
      ["To protect a Gaza king who asked for help", "Ngungunyana was an enemy in 1895."],
      ["To get the Gaza army for service in Portugal", "The Portuguese did not wish to recruit it."],
    ],
    answer: "A",
    hints: ["Recall the Scramble for Africa and the rule of effective occupation."],
    explanation: "Portugal wished to confirm its claim against British and Boer ambitions, and its new weapons made a campaign possible.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which factor best explains why Ngungunyana could not unite his subjects against Portugal?",
    options: [
      ["Tributaries resented Gaza rule and helped Portugal", "Correct: internal divisions weakened the resistance."],
      ["All of his subjects were forbidden to own any shields", "There was no such rule."],
      ["Portugal had already conquered the Tsonga in 1850", "Portuguese power was weak until the 1890s."],
      ["His regiments refused to fight because of plague", "No such refusal is recorded."],
    ],
    answer: "A",
    hints: ["Think about how the conquered peoples regarded Gaza rule."],
    explanation: "Resentment among tributaries and divisions within the Gaza leadership meant that Ngungunyana could not unite all his subjects.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which comparison of the Gaza and Ndebele states is accurate?",
    options: [
      ["Both were Nguni states with regiments, ended by Europeans", "Correct: the Ndebele fell in 1893-94 and Gaza in 1895."],
      ["Both were conquered by Portugal in one campaign", "The Ndebele were conquered by the British South Africa Company."],
      ["Both were founded by generals who served under Shaka", "Soshangane had served under Zwide."],
      ["Both ruled the whole plateau of present-day Zimbabwe", "Neither ruled the whole plateau."],
    ],
    answer: "A",
    hints: ["Check each statement for the founder and the conqueror."],
    explanation: "Both were Nguni states with regiments; the Ndebele fell to the Company in 1893-94 and Gaza to the Portuguese in 1895.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Gaza state took its name from Soshangane's grandfather, Gasa.",
    answer: true,
    explanation: "True. The name Gaza comes from the ancestor Gasa.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "For most of the nineteenth century the Portuguese were strong enough to control the Gaza kings.",
    answer: false,
    explanation: "False. The Portuguese were weak in the interior and often had to pay or please the Gaza kings.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "Ngungunyana tried to protect his independence by playing the Portuguese and the British against each other.",
    answer: true,
    hints: ["Recall his messages to the British."],
    explanation: "True. He sought British protection while dealing with the Portuguese, but the policy failed.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with the role they played in the Gaza story.",
    pairs: [
      ["Soshangane", "Founder of the Gaza state"],
      ["Mzila", "Son who won the succession dispute with Portuguese help"],
      ["Ngungunyana", "Last important Gaza king, defeated in 1895"],
      ["Mouzinho de Albuquerque", "Portuguese officer who captured Ngungunyana"],
    ],
    explanation: "These are the main names in the history of Gaza.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each state with the power that ended it.",
    pairs: ["Gaza state (1895)", "Ndebele state (1893-94)", "Zulu kingdom (1879)"],
    right: ["Portugal", "The British South Africa Company", "Britain"],
    rightIndex: [0, 1, 2],
    hints: ["Think of the date of each defeat."],
    explanation: "Each Nguni state fell to a different European power or company.",
  });
  {
    const events = [
      "Soshangane leads his followers north after the Ndwandwe defeat",
      "Mzila wins the succession dispute with Portuguese help",
      "Ngungunyana succeeds Mzila",
      "The Gaza army is defeated at Coolela",
    ];
    const order = [0, 1, 2, 3];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in chronological order.",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["The dates run from about 1820 to 1895."],
      explanation: "About 1819-1821, about 1862, about 1884, 1895.",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Gaza army was defeated at {{blank:a}} in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Coolela"], choices: ["Coolela", "Isandlwana", "Ulundi", "Khami"] },
      { id: "b", accepted: ["1895"], choices: ["1879", "1893", "1895", "1898"] },
    ],
    explanation: "Coolela, 7 November 1895; Ngungunyana was captured at Chaimite in December.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the last important king of the Gaza state, captured by the Portuguese in 1895.",
    accepted: ["Ngungunyana", "Gungunyana", "Gungunhana", "Ngungunhane"],
    wrong: ["Soshangane"],
    explanation: "**Ngungunyana** (also spelled Gungunyana or Gungunhana).",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the political organisation of the Gaza state.",
    points: ["A king (inkosi) held supreme power", "Izinduna advised and governed for him", "Conquered peoples (Tsonga, Chopi, Ndau) paid tribute through appointed officials or chiefs", "Age regiments served as the army"],
    modelAnswer: "The king held supreme power and was helped by izinduna who advised and governed for him. Conquered peoples such as the Tsonga, Chopi and Ndau were ruled through appointed officials or chiefs and paid tribute. The state's army was organised in age regiments.",
    explanation: "One mark for each feature.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why the Gaza kings were able to dominate the Portuguese for most of the nineteenth century.",
    points: [["The Gaza army was large and well organised and the Portuguese had only small forts on the coast and in the valleys", 2], ["The Portuguese depended on the Gaza king's goodwill for trade and often paid tribute to keep their posts", 2]],
    hints: ["Compare the forces and the interests of each side."],
    modelAnswer: "The Gaza army was large and well organised, while the Portuguese had only small forts and few soldiers in the interior. They also depended on the king's goodwill for trade and often paid tribute to keep their posts.",
    explanation: "One mark for each point and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons for the fall of the Gaza state in 1895.",
    points: [["The Portuguese had modern rifles and machine guns that defeated the regiments", 2], ["Internal divisions and discontented tributaries weakened the state, and some helped the Portuguese", 2]],
    hints: ["One reason is about weapons, one about unity."],
    modelAnswer: "The Portuguese brought modern rifles and machine guns, which defeated the Gaza regiments at Coolela. The state was also weakened by divisions in the royal family and by discontented tributary peoples, some of whom helped the Portuguese.",
    explanation: "One mark for each reason and one for explaining it.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "How far was Portuguese military power the main reason for the fall of the Gaza state?",
    levels: levels(6),
    points: [["Portuguese rifles and machine guns won at Coolela and the capture of Ngungunyana ended the state", 2], ["But Portugal acted only after 1885 for international reasons, and internal weaknesses (tributaries, divided family) made the conquest easier", 2], ["Judgement", 2]],
    hints: ["Consider weapons first, then political conditions."],
    modelAnswer: "Portuguese military power was the immediate cause, since modern rifles and machine guns defeated the regiments at Coolela and the capture of Ngungunyana ended the state. But the Portuguese were weak for most of the century and acted only after the Berlin Conference, when they needed to prove effective occupation. The state's internal weaknesses, such as discontented tributaries and divisions in the royal family, made the conquest easier. I conclude that military power was decisive, but it succeeded because of international pressures and internal weakness.",
    explanation: "Credit both sets of reasons and a supported judgement.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a report by a fictional Portuguese officer after a battle in 1895",
        "The enemy came on in great numbers, brave and well disciplined, but they had no answer to our rifles and our machine guns. Many were killed before they came within reach of our line. The people of the neighbouring districts, who have long suffered from the king's demands for tribute, did not come to his help."),
      "",
      source("Source B", "an oral tradition told by a fictional Tsonga elder in the twentieth century",
        "In the old days the king's soldiers came each year for grain and for our young men. When the white men's soldiers came, some of our chiefs stayed at home. The king's army was beaten, but we did not know that a new master would come."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What reason does Source A give for the Gaza defeat?", points: ["Portuguese rifles and machine guns", "Neighbouring districts did not help because of the king's tribute demands"] }),
      P.manual({ label: "(b)", marks: 4, stem: "In what ways do Sources A and B agree about the attitude of the tributary peoples?", points: [["Both say that the tributary peoples had suffered from the king's demands", 2], ["Both say they did not help the king (stayed at home)", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How far can the two sources be trusted as evidence for why Gaza fell? Use the sources and your own knowledge.", type: "EXTENDED_RESPONSE", levels: levels(6), points: [["A is by a victor writing a report who may exaggerate success and blame the king's harsh rule to justify conquest", 2], ["B is an oral tradition told long afterwards by a member of a tributary people and may reflect resentment; but it agrees with A on a key point", 2], ["Own knowledge: weapons, tribute, Portuguese aims; the agreement of sources of different origin makes the point reliable, but they miss international causes", 2]], modelAnswer: "The two sources can be trusted on some points but not all. Source A is a report by a Portuguese officer after victory, so he may exaggerate the strength of his weapons and emphasise the king's harsh rule to justify the conquest. Source B was told long afterwards by a member of a tributary people and may reflect resentment of the Gaza rulers. However, the two sources come from opposite sides and agree that the tributary peoples did not help the king, which my own knowledge of discontent over tribute supports. Neither explains the international reasons for the Portuguese campaign, so they are reliable on internal division but incomplete as a whole." }),
    ],
    hints: ["For (c), consider who wrote each source and when, then use your own knowledge."],
    explanation: "Both sources are invented: a victor's report and a tradition from a conquered people.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Compare the Gaza state with the Ndebele state in their origins and organisation.",
    levels: levels(8),
    points: [
      ["Similarities: founded by Nguni generals who fled the Zulu wars (Soshangane, Mzilikazi); age regiments; kings with izinduna; tribute from conquered peoples; cattle", 2],
      ["Differences: Gaza in southern Mozambique and south-east Zimbabwe over Tsonga, Chopi and Ndau; Ndebele in south-west Zimbabwe over Shona, Sotho, Tswana", 2],
      ["Differences in outside relations: Gaza dealt with Portugal and migrant labour; Ndebele with traders, concession seekers and the British South Africa Company", 2],
      ["Judgement: broadly similar in organisation but different in setting and end", 2],
    ],
    hints: ["Give similarities, then differences, then a short judgement."],
    modelAnswer: "The Gaza and Ndebele states were similar in origin and organisation. Both were founded by Nguni generals, Soshangane and Mzilikazi, who fled the Zulu wars; both were ruled by kings with izinduna, relied on age regiments, took tribute from conquered peoples and valued cattle. They differed in setting: Gaza lay in southern Mozambique and the south-east of Zimbabwe and ruled the Tsonga, Chopi and Ndau, while the Ndebele settled in the south-west and ruled Shona, Sotho and Tswana people. Their foreign relations also differed: the Gaza dealt with the Portuguese and sent men to the South African mines, while the Ndebele dealt with traders, concession seekers and the British South Africa Company. They were therefore broadly similar kinds of state, shaped by different settings, and each was ended by a different European power.",
    explanation: "Credit specific similarities and differences and a judgement.",
  });

  b.card("DEFINITION", "What is a tributary?", "A people who pay tribute to a more powerful ruler without being part of the ruling group, like the Tsonga, Chopi and Ndau under Gaza.");
  b.card("DEFINITION", "What is a vassal?", "A ruler who accepts the authority of a stronger ruler, often paying tribute or promising loyalty in return for protection.");
  b.card("FACT", "Who founded the Gaza state and where?", "Soshangane, in southern Mozambique and south-eastern Zimbabwe, in the 1820s.");
  b.card("FACT", "Who won the succession dispute after Soshangane's death?", "Mzila (Muzila), with Portuguese help, against his brother Mawewe, about 1862.");
  b.card("FACT", "What happened on 7 November 1895?", "The Portuguese defeated the Gaza army at Coolela.");
  b.card("FACT", "Where was Ngungunyana captured?", "At Chaimite, on 28 December 1895.");
  b.card("CONCEPT", "Why did the Portuguese attack Gaza in 1895?", "To prove effective occupation after the Berlin Conference and to keep Britain and the Boers out of the interior.");
  b.card("CONCEPT", "Why did Gaza fall?", "Portuguese rifles and machine guns, internal divisions and discontented tributaries, and international rivalry that led Portugal to act.");
  b.card("CONCEPT", "How did Gaza and the Ndebele state resemble each other?", "Both were Nguni states founded by generals fleeing the Zulu wars, with kings, izinduna, age regiments, tribute and cattle.");
});
