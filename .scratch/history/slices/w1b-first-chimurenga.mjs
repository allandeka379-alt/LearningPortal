// Slice W1b: the First Chimurenga/Umvukela, 1896-97 (ZIMSEC topic 7.4).
import { concept, P, source, sources, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.colonisation.first-chimurenga", { file: "colonisation/first-chimurenga", keyPrefix: "colonisation.first-chimurenga" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which month and year did the rising begin in Matabeleland?",
    options: [
      ["March 1896", "Correct: fighting began in late March 1896."],
      ["June 1896", "June 1896 is when the rising spread to Mashonaland."],
      ["July 1893", "July 1893 was the Victoria incident, before the Anglo-Ndebele War."],
      ["April 1898", "April 1898 is when Nehanda and Kaguvi were executed."],
    ],
    answer: "A",
    explanation: "The Ndebele rose in **March 1896**; the Shona followed in **June 1896**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How did the Jameson Raid help to make the 1896 risings possible?",
    options: [
      ["It took most of the Company's police out of the country", "Correct: it created the opportunity, not the grievances."],
      ["It gave the Ndebele a supply of modern rifles from the Transvaal", "The raid did not arm the Ndebele."],
      ["It led Britain to withdraw the Company's Royal Charter", "The charter was not withdrawn; the Company ruled until 1923."],
      ["It brought the railway to Bulawayo ahead of schedule", "The railway reached Bulawayo in 1897 and had nothing to do with the raid."],
    ],
    answer: "A",
    explanation: "Jameson's failed raid on the Transvaal (December 1895-January 1896) left few police in the country and showed that the settlers could be beaten.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the rinderpest epidemic of 1896 increase anger against the settlers?",
    options: [
      ["The Company shot herds to stop it spreading", "Correct: many blamed the settlers for the disaster and its handling."],
      ["The settlers sold cattle medicine to Africans at high prices", "There was no such trade; the disease had no cure then."],
      ["Rinderpest killed the settlers' horses but not African cattle", "Rinderpest killed cattle across the region, including African herds."],
      ["The Company banned all Africans from keeping goats and sheep", "There was no such ban."],
    ],
    answer: "A",
    explanation: "Rinderpest, drought and locusts in 1896 were seen by many as signs that the settlers had disturbed the land; shooting cattle to stop the disease made the losses worse.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which religious leader was linked to the Mwari shrines of the Matopo hills?",
    options: [
      ["Mkwati", "Correct: Mkwati encouraged the Ndebele rising and is said to have helped spread it."],
      ["Nehanda", "Nehanda was a Shona spirit medium active in the Mazowe area."],
      ["Mashayamombe", "Mashayamombe was a Shona chief, not a religious leader."],
      ["Nyamanda", "Nyamanda was a son of Lobengula proclaimed king by some Ndebele."],
    ],
    answer: "A",
    explanation: "**Mkwati** was linked to the Mwari (Mwali) cult of the Matopos; **Kaguvi** and **Nehanda** were Shona spirit mediums.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How did most Ndebele fighting end in 1896?",
    options: [
      ["Through Rhodes's indabas in the Matopo hills", "Correct: negotiations from August 1896 ended most Ndebele fighting."],
      ["By the capture of Bulawayo by the Ndebele regiments", "Bulawayo was besieged but never taken."],
      ["Through a peace treaty signed with Lobengula", "Lobengula had died early in 1894."],
      ["By the deportation of all Ndebele leaders to the Cape", "The leaders were not deported; most negotiated terms."],
    ],
    answer: "A",
    explanation: "The war in the Matopos was costly, so Rhodes negotiated. In Mashonaland there was no negotiated end: resistance was crushed area by area in 1897.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these was a change in Company administration that followed the risings?",
    options: [
      ["A Resident Commissioner was appointed", "Correct: the Southern Rhodesia Order in Council of 1898."],
      ["The Company handed the country over to Portugal", "Portugal never ruled Southern Rhodesia."],
      ["Africans were given the vote on the same terms as settlers", "No such change was made."],
      ["The hut tax was abolished across the whole country", "The tax continued."],
    ],
    answer: "A",
    hints: ["Think about how Britain tried to keep closer watch over the Company."],
    explanation: "The British government imposed closer supervision through the 1898 Order in Council: a Resident Commissioner, a Legislative Council with elected settlers and a more organised Native Affairs Department.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement correctly describes the historians' debate about the risings?",
    options: [
      ["Historians disagree on how far the risings were coordinated", "Correct: Ranger argued for coordination; Cobbing and Beach questioned it."],
      ["All historians agree the risings were planned by one central committee", "There is no such agreement; this is the debated point."],
      ["Historians agree that the Shona did not take part in the risings", "The Shona rising from June 1896 is well documented."],
      ["Historians agree that the risings began in Mashonaland in 1893", "They began in Matabeleland in March 1896."],
    ],
    answer: "A",
    hints: ["The question asks what the debate is about, not who is right."],
    explanation: "Terence Ranger argued that spirit mediums and the Mwari cult linked the risings; later historians such as Julian Cobbing and David Beach stressed local causes and separate decisions.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which reason best explains why the Shona resistance lasted into 1897, after most Ndebele fighting had ended?",
    options: [
      ["No single leader could negotiate for all the Shona", "Correct: each community had to be overcome separately."],
      ["The Shona had more machine guns than the Ndebele", "The Shona had no machine guns."],
      ["The Company refused to send troops to Mashonaland", "Company and imperial troops fought in Mashonaland."],
      ["Rhodes had promised the Shona their independence", "No such promise was made."],
    ],
    answer: "A",
    hints: ["Compare how the fighting ended in the two regions."],
    explanation: "Shona communities rose under their own chiefs and fought from fortified hills and caves. With no central authority to negotiate, Company forces attacked them one by one during 1897.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Nehanda and Kaguvi were executed in Salisbury in April 1898.",
    answer: true,
    explanation: "True. After capture and trial, both spirit mediums were executed in April 1898. Nehanda became a lasting symbol of resistance.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In 1896 most settlers expected the Shona to join the Ndebele in rising against the Company.",
    answer: false,
    explanation: "False. Settlers believed the Shona were too divided and would not fight, so the rising in June 1896 took them by surprise.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each person with their role in 1896-97.",
    pairs: [
      ["Kaguvi (Gumboreshumba)", "Shona spirit medium executed in April 1898"],
      ["Makoni", "Shona chief executed in 1897"],
      ["Cecil Rhodes", "Negotiated with Ndebele leaders in the Matopo hills"],
      ["Mkwati", "Religious leader linked to the Mwari shrines"],
    ],
    explanation: "Kaguvi and Nehanda were spirit mediums; Makoni and Mashayamombe were chiefs; Mkwati was linked to the Mwari cult; Rhodes negotiated the Matopos indabas.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Put these events in chronological order.",
    pairs: [
      "The rising spreads to Mashonaland",
      "Nehanda and Kaguvi are executed",
      "Jameson leads most Company police into the Transvaal",
      "Rhodes holds indabas in the Matopo hills",
    ],
    right: POS,
    rightIndex: [1, 3, 0, 2],
    hints: ["The opportunity came before the rising; the executions came last."],
    explanation: "Jameson Raid (December 1895); Mashonaland rising (June 1896); Matopos indabas (August-October 1896); executions (April 1898).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each grievance with what it meant for Africans.",
    pairs: [
      ["Hut tax", "People had to earn cash, usually by working for settlers"],
      ["Forced labour", "Men were made to work on farms, mines and roads"],
      ["Native Police", "Armed young men abused people and seized property"],
      ["Loss of cattle", "Families lost wealth, food and marriage payments"],
    ],
    explanation: "Each grievance affected daily life; together they explain why so many communities were ready to rise in 1896.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Shona spirit medium {{blank:a}} (Charwe Nyakasikana) became a symbol of resistance; the rising in Mashonaland began in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Nehanda"], choices: ["Nehanda", "Mkwati", "Lobengula", "Nyamanda"] },
      { id: "b", accepted: ["June 1896"], choices: ["June 1896", "March 1896", "October 1893", "April 1898"] },
    ],
    explanation: "Nehanda (Charwe Nyakasikana); Mashonaland rose in June 1896, Matabeleland in March 1896.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Ndebele name used for the risings of 1896-97 (the Shona name is Chimurenga).",
    accepted: ["Umvukela", "Mvukela", "First Umvukela", "Imvukela"],
    wrong: ["Chimurenga"],
    explanation: "**Umvukela** is the Ndebele word; **Chimurenga** is the Shona word.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 5,
    stem: "Outline **five** causes of the First Chimurenga/Umvukela.",
    points: [
      "Loss of land to settlers / removal to poor reserves.",
      "Seizure of cattle.",
      "Forced labour and the hut tax.",
      "Brutality of the Native Police / Company officials.",
      "Natural disasters (rinderpest, drought, locusts) blamed on settlers / the Jameson Raid left the country poorly defended.",
    ],
    modelAnswer: "Settlers took the best land; the Company seized cattle; Africans were forced to work and pay hut tax; the Native Police abused people; rinderpest, drought and locusts struck in 1896 and the Jameson Raid had removed most police.",
    explanation: "One mark per distinct cause; accept religious encouragement by mediums as a cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain the role of spirit mediums and religious leaders in the risings of 1896-97.",
    points: [
      "Identifies a leader (Mkwati, Kaguvi or Nehanda).",
      "They encouraged people to rise, presenting it as the will of the ancestors / God.",
      "They explained the disasters of 1896 as caused by the settlers' presence.",
      "They spread the call to rise across communities / between regions.",
      "They gave the rising authority and unity across chiefdoms.",
      "Their capture and execution (1898) and later memory inspired nationalists.",
    ],
    hints: ["Say what they did and why it mattered."],
    modelAnswer: "Religious leaders gave the risings authority. Mkwati, linked to the Mwari shrines, encouraged the Ndebele, while Kaguvi and Nehanda urged Shona communities to fight, presenting resistance as the will of the ancestors. They explained the disasters of 1896 as a result of the settlers' presence, which made people more willing to rise. They carried messages between communities, helping separate chiefdoms act at about the same time. Their importance is shown by the Company's determination to capture them; Nehanda and Kaguvi were executed in April 1898 and later inspired nationalists.",
    explanation: "Credit developed points on what mediums did and why it mattered.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** reasons why the risings were defeated.",
    points: [
      "Identifies superior Company weapons (machine guns, rifles, dynamite).",
      "Explains their effect, e.g. fortified hills and caves could be destroyed or besieged.",
      "Identifies a second reason (reinforcements / disunity / famine / negotiation).",
      "Explains it, e.g. the Matopos indabas ended Ndebele fighting so the Company could concentrate on Mashonaland.",
    ],
    hints: ["Identify, then explain how each reason weakened the resisters."],
    modelAnswer: "The Company had machine guns, modern rifles and dynamite, so fortified hills and caves that resisted spears and old guns could be destroyed. Also, the Ndebele and Shona largely fought separately; once Rhodes's indabas ended most Ndebele fighting, the Company could concentrate its forces on Mashonaland and defeat communities one by one.",
    explanation: "Two marks per reason: identify and explain.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `Study the sources and answer the questions.\n\n${sources([
      source("Source A", "from the diary of a fictional settler in the Bulawayo laager, April 1896", "Nobody saw this coming. Only a month ago my neighbour's herd boys were laughing at the gate. Now they say the whole country has risen at the word of the priests in the hills. It must have been planned for months, every farm struck in the same week."),
      source("Source B", "an account by a fictional Ndebele elder, recorded by a researcher in 1938", "We did not rise because of one voice. Our cattle were gone, the police beat our fathers, and then the cattle-sickness came. Each village counted its own wrongs. When word came that others had begun, we took up what weapons we had."),
    ])}`,
    hints: ["Compare who made each source, when and with what knowledge."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "What does Source A suggest about how the rising began?", points: [
        "It suggests the rising was sudden/surprising to settlers.",
        "It suggests the writer believed it was planned and coordinated by religious leaders (\"the priests in the hills\").",
      ], explanation: "Two inferences from the source." }),
      P.manual({ label: "(b)", marks: 4, stem: "How far do Sources A and B agree about why and how the Ndebele rose? Explain your answer.", points: [
        "Agreement: both show the rising spread quickly / many communities acted at about the same time.",
        "Disagreement: A sees one plan by religious leaders; B says people rose for their own grievances.",
        "B gives causes (cattle, police, disease) which A does not.",
        "Supported conclusion: they mainly disagree on coordination.",
      ], explanation: "Credit specific points of agreement and disagreement." }),
      P.manual({ label: "(c)", marks: 6, stem: "Which source is more useful to a historian studying whether the risings were coordinated? Explain your answer using both sources and your own knowledge.", points: [
        "A: written at the time, but by a frightened settler who could only guess at African plans.",
        "A: the belief in a plan may reflect settler fear; it is not evidence of a plan.",
        "B: an Ndebele participant's view, but recorded over 40 years later, so memory may have changed.",
        "B: matches own knowledge of local grievances (cattle seizures, Native Police, rinderpest).",
        "Own knowledge: historians debate coordination (Ranger for; Cobbing and Beach questioning).",
        "Supported judgement on relative usefulness.",
      ], type: "EXTENDED_RESPONSE", levels: levels(6), modelAnswer: "Source A was written in April 1896 by a settler in the Bulawayo laager, so it shows how settlers reacted at the time. But he had no knowledge of African plans: his belief that the rising was organised by \"the priests in the hills\" may reflect fear rather than evidence. Source B comes from an Ndebele elder who took part, so it shows African motives from the inside, although it was recorded in 1938, more than 40 years later. Its stress on local grievances, cattle seizures, police brutality and rinderpest, matches what we know of the causes. Historians such as Ranger argued for coordination through religious leaders, while Cobbing and Beach stressed local decisions. Source B is more useful on how communities decided to rise, but both are needed, because the debate is about how far religious leaders linked separate local risings.", explanation: "Top answers evaluate provenance and content and reach a judgement." }),
    ],
    explanation: "A two-source practice question on the coordination debate (12 marks).",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts.",
    hints: ["In (b), weigh grievances against the triggers and the opportunity before judging."],
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe the rising in Mashonaland, 1896-97.", points: [
        "Began in June 1896, surprising the settlers.",
        "Led by chiefs such as Mashayamombe and Makoni.",
        "Encouraged by spirit mediums Kaguvi and Nehanda.",
        "Shona fought from fortified hills and caves; crushed area by area in 1897 (dynamite used).",
      ], explanation: "Four accurate points." }),
      P.manual({ label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", stem: "\"Natural disasters were the main cause of the 1896 risings.\" To what extent do you agree?", points: [
        ["Agrees: rinderpest, drought and locusts in 1896 caused hunger and were blamed on settlers.", 2],
        ["Agrees: shooting of cattle to stop rinderpest increased anger.", 2],
        ["Disagrees: long-term grievances (land, cattle, forced labour, hut tax, Native Police) existed before 1896.", 2],
        ["Disagrees: religious leaders' encouragement and the opportunity of the Jameson Raid.", 2],
        ["Supported judgement (e.g. disasters were a trigger, grievances the main cause).", 2],
      ], levels: levels(10), modelAnswer: "Natural disasters played an important part. In 1896 rinderpest killed most remaining cattle, while drought and locusts destroyed crops. Many people believed the settlers had angered the ancestors, and the Company made things worse by shooting cattle to stop the disease.\n\nHowever, the disasters fell on people who already had deep grievances. Since 1893 the Ndebele had lost land and most of their cattle; across the country Africans resented forced labour, the hut tax and the brutality of the Native Police. Religious leaders such as Mkwati, Kaguvi and Nehanda turned this anger into action, and the Jameson Raid had left the Company with few police.\n\nOverall the disasters were a trigger rather than the main cause. Without the long-term grievances of land, cattle and labour, hunger alone would not have produced a rising against the Company.", explanation: "Both sides plus a judgement for the top level." }),
    ],
    explanation: "Practice structured question (14 marks).",
  });

  b.card("FACT", "When did the risings begin in Matabeleland and Mashonaland?", "Matabeleland: March 1896. Mashonaland: June 1896.");
  b.card("FACT", "When were Nehanda and Kaguvi executed?", "April 1898, in Salisbury.");
  b.card("DEFINITION", "Spirit medium (svikiro)", "A person through whom, Shona people believe, an ancestral or guardian spirit speaks; mediums such as Nehanda and Kaguvi led resistance in 1896-97.");
  b.card("CONCEPT", "Why was the Jameson Raid important for the 1896 risings?", "It took most Company police out of the country and showed the settlers could be beaten: an opportunity, not a grievance.");
  b.card("FACT", "Who was Mkwati?", "A religious leader linked to the Mwari shrines of the Matopo hills who encouraged the Ndebele rising.");
  b.card("CONCEPT", "What is the debate about coordination of the 1896 risings?", "Ranger argued religious leaders coordinated them; Cobbing and Beach stressed local causes and separate decisions.");
  b.card("CONCEPT", "Why were the risings defeated?", "Superior weapons, reinforcements, disunity between and within the Ndebele and Shona, famine, and the Matopos indabas that ended Ndebele fighting.");
  b.card("FACT", "What did the 1898 Order in Council create?", "A Resident Commissioner and a Legislative Council with elected settler members.");
  b.card("FACT", "Name two Shona chiefs who led resistance in 1896-97.", "Mashayamombe and Makoni.");
});
