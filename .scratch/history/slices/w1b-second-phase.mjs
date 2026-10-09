// Slice W1b: the second phase of the armed struggle, 1972-1979 (ZIMSEC topic 10.3).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.liberation.second-phase", { file: "liberation/second-phase", keyPrefix: "liberation.second-phase" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which attack on 21 December 1972 opened the north-eastern front?",
    options: [
      ["The attack on Altena Farm", "Correct: in the Centenary district."],
      ["The battle of Chinhoyi", "Chinhoyi was on 28 April 1966."],
      ["The raid on Chimoio", "Chimoio was a Rhodesian raid in November 1977."],
      ["The Hwange campaign", "Hwange was a ZIPRA campaign in 1967."],
    ],
    answer: "A",
    explanation: "The ZANLA attack on **Altena Farm** (21 December 1972) began the second phase of the war.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main change in strategy in the second phase?",
    options: [
      ["Small groups that first won the people's support", "Correct: politicisation came before fighting."],
      ["Large columns that sought open battles in the Zambezi valley", "That was the failed approach of the 1960s."],
      ["An end to fighting in favour of petitions to the UN", "The war intensified in the 1970s."],
      ["Attacks only on targets inside South Africa itself", "The war was fought mainly inside Rhodesia."],
    ],
    answer: "A",
    explanation: "Guerrillas moved in small groups, held pungwes, and relied on villagers for food, shelter and information.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the independence of Mozambique in 1975 help ZANLA?",
    options: [
      ["It opened bases along the whole eastern border", "Correct: FRELIMO's government supported ZANLA."],
      ["It ended Rhodesian air raids on all camps", "Raids on camps in Mozambique continued, e.g. Nyadzonia and Chimoio."],
      ["It gave ZANLA control of the port of Durban", "Durban is in South Africa."],
      ["It made the Rhodesian government accept majority rule at once", "Majority rule came only after Lancaster House."],
    ],
    answer: "A",
    explanation: "From 1975 ZANLA could operate from bases from Tete to Gaza, spreading the war into Manicaland, the Midlands and the south-east.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What were mujibhas and chimbwidos?",
    options: [
      ["Young people who helped the guerrillas", "Correct: boys (mujibhas) and girls (chimbwidos)."],
      ["Rhodesian special forces units", "The Selous Scouts were a Rhodesian unit."],
      ["Spirit mediums of the north-east", "Spirit mediums were religious leaders."],
      ["Fenced villages built by the government", "Those were protected villages."],
    ],
    answer: "A",
    explanation: "Mujibhas and chimbwidos carried messages, kept watch, gathered intelligence and carried food and supplies.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which country supplied most of ZIPRA's weapons and training?",
    options: [
      ["The Soviet Union", "Correct: ZANLA was supported mainly by China."],
      ["The United States", "The USA did not arm the liberation movements."],
      ["Portugal", "Portugal fought against FRELIMO and was hostile."],
      ["South Africa", "South Africa supported the Rhodesian government."],
    ],
    answer: "A",
    explanation: "The **Soviet Union** and its allies supported ZIPRA; **China** supported ZANLA.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did protected villages often fail to weaken support for the guerrillas?",
    options: [
      ["Their hardships angered villagers", "Correct: crowding and curfews drove many towards the guerrillas."],
      ["They were built only in South Africa", "They were built inside Rhodesia."],
      ["The guerrillas ran the villages themselves", "They were guarded by government forces."],
      ["They were all abandoned within a month", "Many existed for years."],
    ],
    answer: "A",
    hints: ["Think about how life in the villages felt to the people moved there."],
    explanation: "Protected villages broke up families' farming and daily life and were crowded and closely controlled, so they often increased resentment of the government.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about the raid on Nyadzonia (9 August 1976) is accurate?",
    options: [
      ["About a thousand were killed; its status is disputed", "Correct: ZANU said it was a refugee camp; Rhodesia called it a base."],
      ["It was a ZIPRA attack on a Rhodesian army base", "It was a Rhodesian attack on a camp in Mozambique."],
      ["No one was killed because the camp was empty", "Very many people were killed."],
      ["It took place in Zambia near Lusaka", "Nyadzonia is in Mozambique; Freedom Camp was near Lusaka."],
    ],
    answer: "A",
    hints: ["Check which side carried out the raid and where."],
    explanation: "Rhodesian forces attacked Nyadzonia in Mozambique. Rhodesia claimed it was a guerrilla base; ZANU and others said it held mainly refugees. Historians estimate around a thousand were killed.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which reason best explains why the second phase was more successful than the first?",
    options: [
      ["Fighters had the people's support and bases nearby", "Correct: politics and geography both changed."],
      ["Rhodesia had no aircraft after 1972", "Rhodesia kept its air force throughout."],
      ["South Africa switched to supporting the guerrillas", "South Africa supported Rhodesia."],
      ["The fighting took place only in the towns", "The war was fought mainly in rural areas."],
    ],
    answer: "A",
    hints: ["Compare the 1960s weaknesses with what changed after 1972."],
    explanation: "Politicisation gave fighters food, shelter and intelligence, and after 1975 Mozambique offered bases along a long border; together these let guerrillas stay in areas for long periods.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "ZANU and ZAPU formed the Patriotic Front in 1976.",
    answer: true,
    explanation: "True. The Patriotic Front (October 1976) let them negotiate together, although ZANLA and ZIPRA stayed separate.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All chiefs supported the guerrillas during the second phase of the war.",
    answer: false,
    explanation: "False. Chiefs were paid officials of the government; some supported it, while others secretly helped the guerrillas.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each group with its role in the war.",
    pairs: [
      ["Peasants", "Gave food, shelter and information to guerrillas"],
      ["Spirit mediums", "Gave guerrillas guidance and spiritual authority"],
      ["Catholic Commission for Justice and Peace", "Documented abuses by the security forces"],
      ["Frontline States", "Hosted bases and refugees in neighbouring countries"],
    ],
    explanation: "The struggle depended on many groups inside and outside the country.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The raid on Chimoio",
      "The attack on Altena Farm",
      "The Freedom Camp air raid",
      "Mozambique becomes independent",
    ],
    right: POS,
    rightIndex: [2, 0, 3, 1],
    hints: ["The north-eastern front opened before Mozambique's independence."],
    explanation: "Altena Farm December 1972; Mozambique independent June 1975; Chimoio November 1977; Freedom Camp October 1978.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "An all-night political meeting between guerrillas and villagers was called a {{blank:a}}. ZIPRA's main bases were in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["pungwe"], choices: ["pungwe", "laager", "indaba", "kraal"] },
      { id: "b", accepted: ["Zambia"], choices: ["Zambia", "Mozambique", "Malawi", "South Africa"] },
    ],
    explanation: "Pungwes were key to politicisation. ZIPRA operated mainly from Zambia (and Botswana); ZANLA from Mozambique.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the special Rhodesian unit, formed in 1973, that carried out the raid on Nyadzonia.",
    accepted: ["Selous Scouts", "the Selous Scouts"],
    wrong: ["Rhodesian Light Infantry"],
    explanation: "The **Selous Scouts** were a Rhodesian special forces unit formed in 1973.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Outline the role of **four** groups inside the country in supporting the armed struggle.",
    points: [
      "Peasants: food, shelter, information.",
      "Mujibhas and chimbwidos: messengers, lookouts, intelligence.",
      "Spirit mediums: guidance and spiritual authority.",
      "Churches (medical care, CCJP reports) / chiefs who secretly helped / students and workers who joined.",
    ],
    modelAnswer: "Peasants fed and sheltered guerrillas; mujibhas and chimbwidos carried messages and watched for security forces; spirit mediums gave guidance and authority; mission churches treated the wounded and the CCJP exposed abuses.",
    explanation: "One mark per group with its role.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the role of external support in the armed struggle between 1972 and 1979.",
    points: [
      "Mozambique (after 1975) gave ZANLA bases along the eastern border.",
      "Zambia (and Botswana) hosted ZIPRA and refugees.",
      "Tanzania and the OAU Liberation Committee provided training, money and weapons.",
      "The USSR armed and trained ZIPRA.",
      "China armed and trained ZANLA.",
      "UN sanctions and refugee aid / diplomatic pressure on Rhodesia.",
    ],
    hints: ["For each supporter, say what it gave and why it mattered."],
    modelAnswer: "After 1975 Mozambique allowed ZANLA to set up bases along the whole eastern border, which spread the war across the country. Zambia hosted ZIPRA and refugees, and Botswana provided a route out for recruits. Tanzania and the OAU Liberation Committee provided training, money and weapons. The Soviet Union armed and trained ZIPRA, and China did the same for ZANLA. The UN kept sanctions on Rhodesia and its agencies helped refugees.",
    explanation: "One mark per developed point.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** counter-measures used by the Rhodesian government against the guerrillas.",
    points: [
      "Identifies protected villages.",
      "Explains: moved people into guarded villages to cut off food and information to guerrillas.",
      "Identifies cross-border raids / collective fines / Selous Scouts / martial law.",
      "Explains its aim and effect, e.g. raids on Chimoio aimed to destroy ZANLA bases but killed many refugees and did not stop the war.",
    ],
    hints: ["Say what each measure was meant to achieve."],
    modelAnswer: "The government moved rural people into protected villages to cut the guerrillas off from food and information, but this angered many villagers. It also raided camps in neighbouring countries, such as Chimoio in 1977, to destroy bases; the raids killed many people, including refugees, but did not stop the war.",
    explanation: "Two marks per counter-measure.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "the recollections of a fictional former chimbwido from Mount Darwin, recorded in 2005", "We cooked at night so the smoke would not be seen. The comrades came after dark and we sang at the pungwe until morning. My younger brother watched the road for soldiers. When the soldiers came to the village they beat the men, because they knew someone was feeding the comrades."),
      source("Source B", "a statement issued by a fictional Rhodesian government department, 1977", "Protected villages have been established for the safety of the tribespeople, who are being terrorised by communist gangs. In these villages they are secure, receive medical care and can farm their lands in peace."),
    ])}`,
    hints: ["Look at purpose and date for each source."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** ways in which villagers supported the guerrillas, according to Source A.", points: [
        "Cooking food for them at night.",
        "Watching the road for soldiers / attending pungwes.",
      ], explanation: "Two points from Source A." }),
      P.manual({ label: "(b)", marks: 4, stem: "Compare Sources A and B as evidence of villagers' attitudes to the guerrillas.", points: [
        "A shows villagers supported the guerrillas willingly (cooking, singing, watching).",
        "B claims villagers were terrorised by the guerrillas.",
        "A shows the security forces as the threat (beating men); B shows them as protectors.",
        "Conclusion: they give opposite views.",
      ], explanation: "Specific comparison." }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful are Sources A and B for understanding the role of the masses in the war? Use both sources and your own knowledge.", points: [
        "A: participant's account; details match own knowledge of chimbwidos, pungwes, night cooking.",
        "A: recorded in 2005, long after; may be shaped by later celebration of the struggle.",
        "B: government propaganda to justify protected villages; one-sided.",
        "B contradicted by own knowledge: protected villages were crowded and resented.",
        "B useful as evidence of government policy and its view of the war.",
        "Supported judgement.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A, from a former chimbwido, gives a participant's view of how villagers fed guerrillas, attended pungwes and watched for soldiers, details that match what we know about the role of the masses. It was recorded in 2005, so memory may have been shaped by later celebration of the struggle, and it describes one village. Source B is a Rhodesian government statement written to justify protected villages, so it presents the guerrillas as terrorists and the villages as safe. Own knowledge shows that protected villages were crowded, controlled by curfews and widely resented. Source B is useful mainly as evidence of government policy and propaganda. Source A is more useful for understanding the role of the masses, but both show that villagers were caught between two sides.", explanation: "Weigh both sources with own knowledge." }),
    ],
    explanation: "Two-source practice question (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), weigh the masses against external support and other factors."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the main events of the second phase of the armed struggle.", points: [
        "Altena Farm attack, 21 December 1972, opened the north-eastern front.",
        "Mozambique's independence (1975) led to ZANLA bases along the eastern border.",
        "Patriotic Front formed (October 1976).",
        "Rhodesian raids on Nyadzonia (1976), Chimoio (1977) and Freedom Camp (1978); war at its height by 1979.",
      ], explanation: "Four events." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", stem: "How far was the support of the masses the most important reason for the success of the second phase of the armed struggle?", points: [
        ["Masses: food, shelter, information; guerrillas could stay in areas.", 2],
        ["Masses: mujibhas, chimbwidos, spirit mediums, recruits.", 2],
        ["Other: bases in Mozambique after 1975 and Zambia.", 2],
        ["Other: weapons and training from the USSR, China, OAU; Frontline States.", 2],
        ["Other: Rhodesia's weaknesses (sanctions, manpower, emigration) / new strategy.", 2],
        ["Supported judgement.", 2],
      ], levels: levels(12), modelAnswer: "The support of the masses was vital. Peasants fed and sheltered guerrillas and hid weapons; mujibhas and chimbwidos watched the roads and carried messages; spirit mediums gave the struggle spiritual authority, and many young people joined. This allowed small groups to stay in an area for long periods, which had been impossible in the 1960s.\n\nOther factors also mattered. Mozambique's independence in 1975 gave ZANLA bases along the eastern border, and Zambia hosted ZIPRA. The USSR, China and the OAU supplied weapons and training, and the Frontline States hosted refugees and offices. Rhodesia itself was weakened by sanctions, a small white population that could not supply enough soldiers, and emigration.\n\nThe masses were the most important reason, because without them neither bases nor weapons could have been used effectively inside the country; but external support explains why the war could grow so quickly after 1975.", explanation: "Top level weighs the masses against other factors." }),
    ],
    explanation: "Practice structured question (16 marks).",
  });

  b.card("FACT", "What happened at Altena Farm on 21 December 1972?", "A ZANLA attack in the Centenary district that opened the north-eastern front and began the second phase.");
  b.card("DEFINITION", "Pungwe", "An all-night political meeting held by guerrillas with villagers.");
  b.card("DEFINITION", "Mujibha / chimbwido", "Young male (mujibha) and female (chimbwido) helpers of the guerrillas: messengers, lookouts, carriers.");
  b.card("DEFINITION", "Protected village", "A fenced, guarded village into which rural people were moved to cut them off from guerrillas.");
  b.card("FACT", "Give the dates of the raids on Nyadzonia, Chimoio and Freedom Camp.", "Nyadzonia 9 August 1976; Chimoio 23 November 1977; Freedom Camp 19 October 1978.");
  b.card("FACT", "When was the Patriotic Front formed?", "October 1976, by ZANU and ZAPU.");
  b.card("CONCEPT", "Why did Mozambique's independence (1975) matter?", "ZANLA gained bases along the whole eastern border, spreading the war across the country.");
  b.card("FACT", "Who supported ZANLA and ZIPRA from outside Africa?", "China supported ZANLA; the Soviet Union supported ZIPRA.");
  b.card("CONCEPT", "Name four Rhodesian counter-measures.", "Protected villages, collective fines and curfews, cross-border raids, the Selous Scouts and martial law.");
});
