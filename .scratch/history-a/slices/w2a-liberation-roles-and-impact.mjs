// W2a: ahist.liberation.roles-and-impact (ZIMSEC only).
import { concept, P, source, levels } from "../lib.mjs";

concept("ahist.liberation.roles-and-impact", { file: "liberation/roles-and-impact", keyPrefix: "liberation.roles-and-impact" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the main role of spirit mediums in the liberation struggle?",
    options: [
      ["They gave the war legitimacy and linked it to the ancestors and the land", "Correct: they advised on customs and won the trust of elders."],
      ["They served as the senior commanders of the ZANLA and ZIPRA armies in the field", "They were not army commanders."],
      ["They negotiated the ceasefire for the guerrillas at the Lancaster House conference", "They did not take part in the conference."],
      ["They organised the protected villages for the Rhodesian government and army", "Protected villages were a government policy."],
    ],
    answer: "A",
    explanation: "Mediums spoke for the ancestors and gave guidance and authority to the guerrillas, linking the war to the First Chimurenga.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What did mujibas and chimbwidos do in the war?",
    options: [
      ["They acted as scouts, messengers and food carriers for the guerrillas nearby", "Correct: young villagers supported the fighters."],
      ["They commanded the Rhodesian special forces units in the north-east region", "They were not Rhodesian commanders."],
      ["They administered the protected villages on behalf of the Rhodesian army", "They did not run protected villages."],
      ["They taught in the mission schools that stayed open throughout the war in the north-east", "Their role was in supporting the guerrillas."],
    ],
    answer: "A",
    explanation: "Mujibas (young men) and chimbwidos (young women) watched for soldiers and carried messages and food.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best describes the position of chiefs in the war?",
    options: [
      ["They were divided: some served the state, others helped the guerrillas", "Correct: they were caught between the two sides."],
      ["They all supported the guerrillas from the very beginning of the whole war", "Some served the Rhodesian state."],
      ["They all served the Rhodesian government until independence in 1980", "Some secretly helped the guerrillas."],
      ["They played no part because their powers had been abolished in 1965", "They kept their roles and were paid by the government."],
    ],
    answer: "A",
    explanation: "Chiefs were paid by the government and expected to keep order, yet some helped the guerrillas, and some were killed by one side or the other.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which effect of the war on African communities is correctly described?",
    options: [
      ["Many rural schools and clinics closed or were destroyed", "Correct: education and health care were disrupted."],
      ["Mission schools were expanded in all the war zones in 1976", "Many were closed, not expanded."],
      ["Most African families moved into the towns and left the countryside empty", "Many moved but most did not leave."],
      ["Cattle numbers rose because the army protected the herds in the war zones", "Many cattle were lost."],
    ],
    answer: "A",
    explanation: "Schools and clinics, including mission institutions, closed or were destroyed in many war zones.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the word collaborator an unreliable description of Africans who served in the Rhodesian forces?",
    options: [
      ["It was used by one side and hides varied motives such as wages, loyalty and fear", "Correct: the reasons for serving differed."],
      ["It is accurate because all Africans in the Rhodesian army openly supported white rule", "Not all served for the same reason."],
      ["It was used by the Rhodesian government to describe the guerrillas and their helpers", "The nationalists used it for those who served the state."],
      ["It applies only to chiefs and headmen, and not to soldiers, police or informers", "It was applied to soldiers and police too."],
    ],
    answer: "A",
    hints: ["Think of the reasons why men joined."],
    explanation: "The word reflects the guerrillas' viewpoint; people joined for pay, loyalty to a regiment, fear or opposition to one nationalist group.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why were villagers both supporters and victims of the war?",
    options: [
      ["They helped the guerrillas but were punished by the army and pressed by both sides", "Correct: both statements are supported."],
      ["They all voted for the Rhodesian Front but were attacked by the guerrillas", "They did not all vote for the Rhodesian Front."],
      ["They were protected by the army and so faced no danger from either side at all", "Villagers were in danger."],
      ["They had no grievances at all and took no part in the war except as soldiers", "They had real grievances."],
    ],
    answer: "A",
    hints: ["Both words are needed."],
    explanation: "Villagers gave support because of grievances about land and rights, but were punished by the army and sometimes pressed by guerrillas.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the following is the best evidence that women played active roles in the struggle?",
    options: [
      ["Women trained as fighters and commanders, and worked in camps and villages", "Correct: they took many roles."],
      ["Women were prohibited by both armies from joining ZANLA and ZIPRA until 1980", "They joined before 1980."],
      ["Women stayed in the villages throughout and had no contact with the guerrillas", "Many had contact."],
      ["Women were recruited only as nurses in the hospitals of the Rhodesian army", "This was not their only role."],
    ],
    answer: "A",
    hints: ["Look for a list of different roles."],
    explanation: "Women trained as fighters, served as nurses, teachers and cooks, and worked as chimbwidos; their contribution was wider than early accounts suggested.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which approach to the numbers of deaths in the war is most acceptable to historians?",
    options: [
      ["Give a range of estimates, such as 20,000 to 30,000, and say they are uncertain", "Correct: no exact total is agreed."],
      ["State that exactly 27,500 people died, as proved by the surviving government records", "No exact total is proved."],
      ["Avoid any mention of numbers at all, because they can never be known exactly", "Estimates are useful when labelled."],
      ["Use only the figures published by the Rhodesian army and police in 1979", "Official figures are one-sided."],
    ],
    answer: "A",
    hints: ["Think of how to treat uncertain evidence."],
    explanation: "Numbers of deaths are disputed, so historians give a range and note that the figures are uncertain.",
  });
  b.tf({
    d: 1, skill: "RECALL", stem: "Thousands of Zimbabweans became refugees in Mozambique, Zambia and Botswana during the war.", answer: true,
    explanation: "Many thousands of people fled the war zones to neighbouring countries.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true, stem: "All chiefs supported the guerrillas throughout the war.", answer: false,
    explanation: "Chiefs were divided; some served the Rhodesian state and some helped the guerrillas.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", stem: "Historians agree that the experiences of villagers were the same in every part of the country.", answer: false,
    hints: ["Think about differences between places and times."],
    explanation: "Experiences varied by place, time and group, so a single story is not accurate.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each group to its main role.",
    pairs: [
      ["Spirit mediums", "Gave legitimacy and linked the war to the ancestors"],
      ["Peasants", "Provided food, shelter and information"],
      ["Churches", "Gave relief and protested about injustice"],
      ["Nationalist organisations", "Recruited fighters and organised diplomacy"],
    ],
    explanation: "Each group contributed in a different way.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Think of what people lost and where they went."],
    stem: "Match each effect of the war to its example.",
    pairs: [
      ["Displacement", "Hundreds of thousands moved into protected villages"],
      ["Disruption of services", "Rural schools and clinics closed"],
      ["Refugee flows", "Thousands fled to Mozambique, Zambia and Botswana"],
      ["Economic loss", "Cattle, crops and homes lost, and fields unfarmed"],
    ],
    explanation: "These are the main kinds of impact on African communities.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Mediums linked the struggle of the 1970s to the {{blank:a}} Chimurenga of 1896-97, and young men who carried messages for guerrillas were called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["First"], choices: ["First", "Second", "Third", "Fourth"] },
      { id: "b", accepted: ["mujibas"], choices: ["mujibas", "askaris", "akidas", "rases"] },
    ],
    explanation: "Mediums recalled the First Chimurenga; messengers were mujibas.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term was used for young women who carried food and messages for the guerrillas?",
    accepted: ["chimbwido", "chimbwidos", "the chimbwidos"],
    wrong: ["mujiba"],
    explanation: "**Chimbwidos**.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the roles played by peasants in the liberation struggle.",
    points: ["They provided food and shelter for the guerrillas", "They gave information about the movements of Rhodesian troops", "They attended pungwes and carried supplies", "Young people acted as mujibas and chimbwidos"],
    modelAnswer: "Peasants provided food and shelter for the guerrillas and gave information about the movements of Rhodesian troops. They attended pungwe meetings and carried supplies, and young people acted as mujibas and chimbwidos.",
    explanation: "One mark for each role described.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why spirit mediums were important to the guerrillas.",
    points: [["They spoke for the ancestors, so they gave the war legitimacy and linked it to the First Chimurenga", 2], ["Their authority persuaded elders and villagers to cooperate, and they advised the fighters on customs", 2]],
    hints: ["Think of the authority of the ancestors."],
    modelAnswer: "Mediums spoke for the ancestors, so they gave the war legitimacy and linked it to the First Chimurenga. Their authority persuaded elders and villagers to cooperate, and they advised the fighters on customs that kept their goodwill.",
    explanation: "Credit explained links.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the war affected the lives of rural Africans.",
    points: [["Many were moved into protected villages or fled, losing homes, fields and cattle", 2], ["Schools and clinics closed, many people died or became refugees, and families were divided", 2]],
    hints: ["Give a material effect and a social effect."],
    modelAnswer: "Many people were moved into protected villages or fled, losing their homes, fields and cattle. Schools and clinics closed, many people died or became refugees, and families and communities were divided.",
    explanation: "Credit developed effects.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the sources and answer the questions.",
      "",
      source("Source A", "a recollection by a fictional Zimbabwean woman who served in a ZANLA camp, told in 2010",
        "I left home at sixteen. We learned to use a rifle and to tend the wounded. People thought women could not fight, but we did. After independence, however, few asked what we had done."),
      "",
      source("Source B", "a recollection by a fictional village headman who stayed at home, told in 2010",
        "The soldiers by day and the soldiers by night both came to my hut. I gave what I had to both. I feared what would happen if I refused. Many in my village died, and we did not know whose bullet it was."),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What roles of women does Source A mention?", points: ["Learning to use a rifle / fighting", "Tending the wounded"] }),
      P.manual({ label: "(b)", marks: 2, stem: "How does the experience in Source B differ from that in Source A?", points: ["A chose to join the struggle and trained as a fighter", "B stayed at home and was pressed by both sides, in fear"] }),
      P.manual({ label: "(c)", marks: 4, stem: "How useful are these sources as evidence of the impact of the war on Africans?", type: "EXTENDED_RESPONSE", levels: levels(4), points: [["Both are personal recollections, so they give first-hand experience but only of two people", 1], ["Both were told in 2010, long after the events, and memories may have changed", 1], ["Own knowledge: women fought and served in the camps, and villagers were pressed by both sides; both are confirmed elsewhere", 1], ["Judgement: together they show different experiences and are useful for variety, not for numbers", 1]], modelAnswer: "Both sources are personal recollections, so they give first-hand experience but of only two people. They were told in 2010, long after the events, so memory may have changed. My own knowledge confirms that women fought and served in camps and that villagers were pressed by both sides. Together they show different experiences of the war and so are useful for variety, but not for judging numbers or general patterns." }),
    ],
    hints: ["For (c), think about what two memories can and cannot show."],
    explanation: "Both sources are invented: recollections by a former camp member and a village headman.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 12, wordLimit: { min: 200, max: 450 },
    stem: "To what extent did peasants play a more important part than spirit mediums in the liberation struggle?",
    levels: levels(12),
    points: [
      ["Peasants: food, shelter, information, pungwes; mujibas and chimbwidos; the base of the guerrilla war", 3],
      ["Mediums: legitimacy, link to 1896-97, advice and authority over elders", 3],
      ["Connection: mediums influenced peasants, and peasants gave the war its practical strength; not all mediums supported the guerrillas", 2],
      ["Other roles such as women, churches and nationalist organisations", 2],
      ["Supported judgement", 2],
    ],
    hints: ["Compare practical help with legitimacy and consider how the two were linked."],
    modelAnswer: "Peasants played a more important part than spirit mediums in the practical conduct of the war, but the two were closely linked. Peasants gave food, shelter and information, attended pungwes and supplied scouts and messengers, so the guerrillas could not have survived without them. Mediums gave legitimacy, linked the war to the First Chimurenga, advised fighters on customs and persuaded elders to cooperate. But the mediums' influence worked largely through the peasants, and not all mediums supported the guerrillas. Women, churches and nationalist organisations also played their parts. I conclude that peasants were more important for the war's practical strength, while mediums were important for its meaning and for winning the trust of the people.",
    explanation: "Credit explained roles and a judgement that weighs the two.",
  });
  b.ext({
    d: 4, skill: "ANALYSIS", marks: 8, wordLimit: { min: 150, max: 350 },
    stem: "Assess the effects of the liberation war on African communities.",
    levels: levels(8),
    points: [
      ["Displacement and protected villages, loss of homes, cattle and crops", 2],
      ["Loss of life and refugees", 2],
      ["Disruption of schools and clinics, and divided families and communities", 2],
      ["Judgement on how severe the effects were, noting variety between places", 2],
    ],
    hints: ["Give material, human and social effects."],
    modelAnswer: "The war had severe effects on African communities. Hundreds of thousands were moved or fled and lost homes, cattle and crops. Many died, estimates ranging from 20,000 to 30,000 or more, most of them civilians, and thousands became refugees. Schools and clinics closed and families and communities were divided. The effects varied by place, and the north-east and east were the worst affected. I conclude that the war's cost to ordinary Africans was heavy, even though it ended white minority rule.",
    explanation: "Credit explained effects and a judgement.",
  });

  b.card("DEFINITION", "What is a spirit medium?", "A person believed to be possessed by an ancestral or guardian spirit, who speaks with its authority.");
  b.card("DEFINITION", "What were mujibas and chimbwidos?", "Young men and women who acted as scouts, messengers and food carriers for the guerrillas.");
  b.card("FACT", "How did spirit mediums help the guerrillas?", "They gave legitimacy, linked the war to 1896-97 and persuaded elders to cooperate.");
  b.card("FACT", "How did the war affect schools and clinics?", "Many rural schools and clinics, including mission institutions, closed or were destroyed.");
  b.card("FACT", "How many people died in the war?", "Estimates range from about 20,000 to 30,000 or more, mostly civilians; no exact figure is agreed.");
  b.card("CONCEPT", "Why were chiefs in a difficult position?", "The government paid them and expected them to report, but the guerrillas wanted their help; some served each side.");
  b.card("CONCEPT", "Why should the word collaborator be used with care?", "It was used by one side and hides varied motives such as pay, loyalty and fear.");
  b.card("CONCEPT", "Were villagers supporters or victims?", "Both: they supported the struggle out of grievance but were punished and pressed by both sides.");
});
