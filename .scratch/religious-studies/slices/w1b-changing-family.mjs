// W1b: Changing culture, types of families and national values.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.family.changing-family", { file: "family/changing-family", keyPrefix: "family.changing-family" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **diaspora**?",
    options: [
      ["People who live abroad but keep links with their country of origin", "Correct: for example Zimbabweans working in other countries."],
      ["People who live in rural areas and have never visited a town or a city", "That is not the diaspora."],
      ["People who move from one house to another within the same village", "That is not the diaspora."],
      ["People who have joined a different religion from the one of their parents", "That describes a change of religion."],
    ],
    answer: "A",
    explanation: "The diaspora are people who have left their country and live abroad but keep links with it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How has urbanisation changed family life?",
    options: [
      ["Relatives often live far apart and the extended family is stretched", "Correct: families live in smaller homes and keep contact in new ways."],
      ["All families now live together in one large homestead with their ancestors", "Urbanisation usually separates relatives."],
      ["Families no longer have any contact with relatives who live in other places", "Families keep contact by visits, phones and money."],
      ["Every family has become a nuclear family with parents and no other relatives", "Many urban families still include other relatives."],
    ],
    answer: "A",
    explanation: "In towns families live in smaller homes and relatives are often far away, but they keep links through visits, phones and remittances.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why have child-headed families become more common in some areas?",
    options: [
      ["Because illnesses such as HIV and AIDS have caused the deaths of many adults", "Correct: children, often led by an older sibling, are left to care for one another."],
      ["Because the law requires children to leave home when they reach the age of twelve", "No such law exists."],
      ["Because schools now require every pupil to live away from his or her parents", "Schools do not require this."],
      ["Because religions teach that children should be raised without the help of adults", "No religion teaches this."],
    ],
    answer: "A",
    explanation: "Where adults have died of illness, older children may lead the household, often with help from relatives and the community.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **benefit** of technology for families?",
    options: [
      ["It lets relatives who live far apart share news and keep in touch", "Correct: phones and messaging groups keep families connected."],
      ["It replaces the need for relatives to attend funerals and weddings in person", "Technology cannot replace every form of presence and support."],
      ["It guarantees that children will learn only good values from what they see", "Technology can also expose children to harmful content."],
      ["It prevents misunderstandings because every message is understood in the same way", "Messages are sometimes misunderstood."],
    ],
    answer: "A",
    explanation: "Technology supports communication between relatives, though it also brings concerns about safety and time.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai works in Johannesburg and sends money each month to his wife and children in Mutare. Which cause of family change does this show?",
    options: [
      ["Migration and remittances", "Correct: he lives away from the family and supports it with money."],
      ["The decline of religion in the country as a whole", "Nothing in the example mentions religion."],
      ["A change in the law about the age of marriage", "The example is not about marriage law."],
      ["The loss of all ties between a husband and the rest of his family", "He continues to support his family."],
    ],
    answer: "A",
    explanation: "Migration separates family members, and remittances help the family to cope.",
    hints: ["Where does Farai live, and what does he send?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which action by a church, mosque or community group best helps a single-parent family to cope with change?",
    options: [
      ["Providing counselling, food support or school fees assistance", "Correct: practical and emotional support."],
      ["Telling the family that its type of family is not a real family", "That would be unkind and unhelpful."],
      ["Asking the family to stop attending all community events for a year", "That would reduce support."],
      ["Refusing to speak to the single parent until the family structure changes", "That would exclude the family."],
    ],
    answer: "A",
    explanation: "Religious and community groups help by counselling, material support and welcome.",
    hints: ["Choose the response that gives help."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the most balanced about changes in the family?",
    options: [
      ["Change brings opportunities as well as difficulties, and families and communities can adapt", "Correct: balanced."],
      ["All changes in family life are harmful and should be reversed at once", "Not all change is harmful."],
      ["Changes in the family have no effect on the values children learn", "Change can affect how values are taught."],
      ["Families that change are no longer able to teach children any values at all", "Many changed families still teach values."],
    ],
    answer: "A",
    explanation: "A balanced answer notes both benefits (education, communication, independence) and difficulties (strain, distance, poverty).",
    hints: ["Avoid 'all', 'no effect' and 'any values at all'."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Zimbabwe the minimum age of marriage is 18.",
    answer: true,
    explanation: "True. The Constitution (section 78) and the Marriages Act 2022 set 18 as the minimum age.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Families first teach children the values of unhu/ubuntu, hard work and respect, which are national values.",
    answer: true,
    explanation: "True. National values begin in the family and are strengthened by schools, religious groups and the community.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of change with its effect on the family.",
    pairs: [["Urbanisation", "relatives live far apart in smaller homes"], ["Education", "young people gain skills and independence"], ["Technology", "relatives keep in touch by phone and messaging"], ["Illness such as HIV and AIDS", "more child-headed and single-parent families"]],
    explanation: "Each cause changes how families live and relate.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Money sent home by relatives who work away is called {{blank:a}}, and people who live abroad but keep links with home are the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["remittances"], choices: ["remittances", "taxes", "fines", "dowries"] },
      { id: "b", accepted: ["diaspora"], choices: ["diaspora", "chiefs", "elders", "initiates"] },
    ],
    explanation: "Remittances; the diaspora.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct number.",
    template: "Childline Zimbabwe can be reached on {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["116"], choices: ["116", "999", "1010", "1234"] }],
    explanation: "Childline Zimbabwe: 116. A trusted adult, the police Victim Friendly Unit or a clinic can also help.",
    hints: ["It is a short three-digit number."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the word for two people living together as a couple without being married?",
    accepted: ["cohabitation", "cohabiting", "cohabit"],
    wrong: ["polygamy"],
    explanation: "**Cohabitation** means living together as a couple without being married.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** causes of change in the family in Zimbabwe.",
    points: ["Urbanisation or migration", "Education or technology", "Economic pressure or HIV and AIDS"],
    modelAnswer: "Urbanisation and migration; education and technology; economic pressure and illness such as HIV and AIDS.",
    explanation: "One mark for each cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** ways in which families can keep in touch when relatives live far apart.",
    points: [["Phone calls, video calls and messaging groups to share news and photos", 2], ["Visits at holidays and ceremonies, and sending money or goods home", 2]],
    modelAnswer: "Families use phone calls, video calls and messaging groups to share news and photos. They also visit at holidays and ceremonies such as funerals and weddings, and send money or goods home.",
    hints: ["One way concerns technology; one concerns visits and support."],
    explanation: "Two marks for each described way.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how families help to pass on national values.",
    points: [
      ["Children learn respect and obedience at home", 1],
      ["Developed: respect for parents and elders is a basis of unhu/ubuntu in the wider society", 1],
      ["Families teach honesty and hard work", 1],
      ["Developed: honest and hard-working citizens contribute to the economy and to trust in the nation", 1],
      ["Families teach respect for the rights of others", 1],
      ["Developed: when girls and boys, children and adults are treated fairly at home, people learn to respect human rights in society", 1],
    ],
    modelAnswer: "Children learn respect and obedience at home, and respect for parents and elders is a basis of unhu/ubuntu in the wider society. Families also teach honesty and hard work, and honest and hard-working citizens contribute to the economy and to trust in the nation. Finally, when girls and boys, and children and adults, are treated fairly at home, people learn to respect human rights in society.",
    hints: ["Give three values and explain how each helps the nation."],
    explanation: "Three developed points.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional magazine article, Harare, 2026",
      "Rudo's parents both work in town and leave home at six. Her grandmother, who lives in the village, joins them for school terms to look after the children. Her uncle, who lives in the United Kingdom, sends money for school fees. 'We use WhatsApp to talk every Sunday,' says Rudo. 'It is not the same as living together, but we are still one family.'"
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which cause of family change is shown by the uncle in the United Kingdom?",
        options: [
          ["Migration and the diaspora", "Correct: he lives abroad and supports his family."],
          ["The effects of illness on the family", "The source does not mention illness."],
          ["A change in the law about marriage", "No law is mentioned."],
          ["A decline in religious belief", "The source does not mention religion."],
        ],
        answer: "A", explanation: "The uncle is part of the diaspora and sends remittances.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** ways in which the family in Source A supports one another.",
        points: ["The grandmother looks after the children during school terms", "The uncle sends money for school fees", "The family talks on WhatsApp every Sunday"],
        modelAnswer: "The grandmother looks after the children; the uncle sends money for school fees; the family talks on WhatsApp every Sunday.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** ways in which change has affected the family in Source A.",
        points: [["Both parents work long hours away from home, so the grandmother helps with child care (economic pressure)", 2], ["A relative lives abroad and contact is through phones and money, not daily visits (migration and technology)", 2]],
        modelAnswer: "Both parents work long hours away from home, so the grandmother has to come to look after the children, which changes who cares for them. A relative also lives abroad, so contact is by messaging and money rather than daily visits.",
      }),
    ],
    hints: ["Name a cause of change from the source and explain its effect."],
    explanation: "The source shows a family adapting to work, migration and technology.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Tendai says: \"Modern life is destroying the family.\" Sipho says: \"Families are changing, and religion and community can help them to adapt.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** pressures that modern life places on families.",
        points: [["Economic pressure: long working hours, unemployment and the cost of living", 2], ["Distance: migration and urban living separate relatives", 2]],
        modelAnswer: "Economic pressure, with long working hours, unemployment and the cost of living, leaves little time or money. Migration and urban living also separate relatives, making daily support harder.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** ways in which religious groups help families to cope with change.",
        points: [["Counselling and marriage or parenting programmes offered by churches, mosques and other groups", 2], ["Material support for the poor, orphans and single parents (for example food, zakat or school fees)", 2]],
        modelAnswer: "Many churches and mosques offer counselling and marriage or parenting programmes that help families to communicate and settle disputes. They also provide material support, such as food, zakat or help with school fees, for the poor, orphans and single parents.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "To what extent is modern life destroying the family?",
        points: [["For: strain on time and money, distance, conflict between generations, risks of technology", 2], ["Against: new ways of staying in touch, education, adaptation, religious and community support", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Modern life puts many families under strain. Long working hours, the cost of living and migration reduce time together, and some young people and elders disagree about values. However, families also adapt: phones keep relatives in touch, education brings opportunities, and religious groups and communities offer counselling and support. The family is changing rather than being destroyed, although it is under real pressure in some households.",
      }),
    ],
    hints: ["Give evidence of strain and of adaptation before judging."],
    explanation: "A balanced answer shows that families are changing and adapting.",
  });

  b.card("DEFINITION", "What is the **diaspora**?", "People who live abroad but keep links with their country of origin.");
  b.card("DEFINITION", "What are **remittances**?", "Money sent home by relatives who work away.");
  b.card("DEFINITION", "What is **cohabitation**?", "Two people living together as a couple without being married.");
  b.card("CONCEPT", "Name four causes of change in family life.", "Urbanisation and migration, education, technology, economic pressure, illness such as HIV and AIDS (any four).");
  b.card("FACT", "What is the minimum age of marriage in Zimbabwe?", "18 (Constitution section 78; Marriages Act 2022).");
  b.card("FACT", "Who can help a child in danger or being abused in Zimbabwe?", "Childline Zimbabwe (116), the police Victim Friendly Unit, a clinic or a trusted adult.");
  b.card("CONCEPT", "How do families pass on national values?", "By teaching respect, honesty, hard work and respect for others' rights, which are part of unhu/ubuntu.");
  b.card("CONCEPT", "Name three ways of strengthening families.", "Communication, fair sharing of duties, counselling and mediation, economic and community support.");
});
