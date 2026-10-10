// W3a: Rites of passage in Islam.
// Reviewer note: the Marriages Act 2022 (civil marriage monogamous; registered customary marriage may be polygamous) is
// outlined only; section 78 of the 2013 Constitution sets 18 as the minimum age of marriage.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.islam.rites-passage", { file: "islam/rites-passage", keyPrefix: "islam.rites-passage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which day after the birth is the aqiqah (naming ceremony) ideally held?",
    options: [
      ["The seventh day", "Correct: the baby is named and the head is shaved."],
      ["The first day", "The adhan is whispered at birth, but aqiqah is later."],
      ["The fortieth day", "Forty days is not the usual time."],
      ["The first birthday", "Aqiqah is held in the first week."],
    ],
    answer: "A",
    explanation: "The **aqiqah** is ideally held on the **seventh day** after birth.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the name of the Muslim marriage contract?",
    options: [
      ["Nikah", "Correct: it needs consent and witnesses."],
      ["Mahr", "Mahr is the gift from the groom to the bride."],
      ["Walimah", "Walimah is the wedding feast."],
      ["Talaq", "Talaq is divorce."],
    ],
    answer: "A",
    explanation: "The **nikah** is the marriage contract; the mahr is the bride's gift, the walimah the feast and talaq divorce.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **mahr**?",
    options: [
      ["A gift from the groom to the bride that belongs to her", "Correct: it is hers to keep."],
      ["A payment from the bride's family to the groom's family", "Mahr goes to the bride, not between families."],
      ["A feast given by the groom's family after the contract", "That is the walimah."],
      ["A fee paid to the imam for conducting the ceremony", "It is not a fee for the imam."],
    ],
    answer: "A",
    explanation: "The **mahr** is a gift from the groom to the bride and belongs to her. It differs from roora/lobola, which is a family arrangement in Indigenous Religion.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which cloth is used to wrap the body of a deceased Muslim?",
    options: [
      ["Plain white cloth (kafan)", "Correct: it shows that all are equal in death."],
      ["Black cloth with decoration", "Black cloth is not used for the shroud."],
      ["The deceased's best clothes", "The body is not dressed in fine clothes."],
      ["Coloured cloth from the family", "Plain white is used."],
    ],
    answer: "A",
    explanation: "The **kafan** is plain white cloth; its simplicity shows equality before God.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which direction does a Muslim body face in the grave?",
    options: [
      ["The body lies on its right side facing Makkah", "Correct: towards the qiblah."],
      ["The body lies on its back facing the sunrise", "Direction is towards Makkah."],
      ["The body lies on its left side facing the family home", "Not a Muslim practice."],
      ["The body lies upright facing the burial ground gate", "Not a Muslim practice."],
    ],
    answer: "A",
    explanation: "A Muslim is buried on the **right side**, facing **Makkah** (the qiblah).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Aisha's cousin has just been born. Her family whispers the call to prayer in the baby's right ear. What does this practice express?",
    options: [
      ["The wish that the first words the child hears are about God", "Correct: it welcomes the child into the faith."],
      ["The belief that a baby can already understand the Qur'an", "It is a blessing, not a lesson."],
      ["The rule that every baby must be given a name of a prophet", "Naming is on the seventh day."],
      ["The custom of announcing the birth to the whole village", "It is whispered, not announced."],
    ],
    answer: "A",
    hints: ["Think of what the baby hears first."],
    explanation: "Whispering the **adhan** means that the first words a child hears are about God.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which condition is essential to the Muslim marriage contract?",
    options: [
      ["Both partners must freely consent", "Correct: forced marriage is wrong in Islam and illegal in Zimbabwe."],
      ["The bride must be under the age of sixteen", "The Constitution sets 18 as the minimum age."],
      ["The couple must have known each other since childhood", "That is not required."],
      ["The wedding must be held in a mosque in Makkah", "It may be held anywhere."],
    ],
    answer: "A",
    hints: ["Think of what both the Qur'an and the law say about choice."],
    explanation: "**Consent** of both partners is essential. The Constitution (section 78) also sets 18 as the minimum age.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about polygyny in Islam is accurate?",
    options: [
      ["The Qur'an permits up to four wives on condition of justice", "Correct: a permission with conditions."],
      ["The Qur'an requires every Muslim man to marry four wives", "It is not a requirement."],
      ["The Qur'an forbids any man to have more than one wife", "It permits up to four on conditions."],
      ["The Qur'an allows a man to marry as many wives as he wishes", "It sets a limit of four."],
    ],
    answer: "A",
    hints: ["Remember Qur'an 4:3 and the condition of justice."],
    explanation: "Qur'an 4:3 permits up to four wives on condition of justice; 4:129 notes the difficulty. Zimbabwean law regulates which marriages may be polygamous.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Muslims bury their dead as soon as possible, usually within a day.",
    answer: true,
    explanation: "True. Prompt burial is the Muslim custom, after washing, shrouding and the funeral prayer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cremation is allowed in Islam.",
    answer: false,
    explanation: "False. Muslims bury the dead; cremation is not allowed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Ghusl", "washing the body of the deceased"], ["Kafan", "the plain white shroud"], ["Janazah", "the funeral prayer"], ["Walimah", "the wedding feast"]],
    explanation: "Ghusl: washing. Kafan: shroud. Janazah: funeral prayer. Walimah: wedding feast.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The marriage contract is called the {{blank:a}}, and at the contract the groom gives the bride a gift called the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["nikah"], choices: ["nikah", "talaq", "iddah", "kafan"] },
      { id: "b", accepted: ["mahr"], choices: ["mahr", "zakat", "aqiqah", "walimah"] },
    ],
    explanation: "The contract is the **nikah** and the gift is the **mahr**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Arabic name for the funeral prayer?",
    accepted: ["Janazah", "Janaza", "Salat al-Janazah", "Salat al Janazah", "Salatul Janazah", "Janazah prayer"],
    wrong: ["Jumu'ah", "Wudu"],
    explanation: "The **janazah** prayer is said standing, with no bowing or prostration.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** things that take place when a Muslim baby is born or named.",
    points: ["The adhan is whispered into the baby's right ear", "Tahnik: a softened date is rubbed on the baby's palate", "On the seventh day the baby is named, the head may be shaved, and an animal is sacrificed and shared"],
    modelAnswer: "The adhan is whispered into the baby's right ear. A softened date is rubbed on the palate (tahnik). On the seventh day the baby is named, the head may be shaved and an animal is sacrificed and shared (aqiqah).",
    explanation: "One mark for each practice.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the conditions of a Muslim marriage (nikah).",
    points: [["Both partners freely consent", 1], ["The groom gives the bride a mahr, which belongs to her", 1], ["At least two witnesses are present at the contract", 1], ["A wedding feast (walimah) is held, to which the poor are invited", 1]],
    modelAnswer: "Both partners must freely consent. The groom gives the bride a mahr, which belongs to her, and at least two witnesses attend the contract. A wedding feast, the walimah, is held, to which the poor are invited.",
    hints: ["Cover consent, the gift, witnesses and the feast."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why Muslims bury the dead in plain white cloth and without delay.",
    points: [
      ["Plain white cloth shows equality", 1],
      ["Developed: rich and poor are wrapped in the same simple shroud, which teaches that all are equal before God", 2],
      ["Prompt burial shows respect for the dead", 1],
      ["Developed: the body is honoured by washing, prayer and burial, and the family and community can begin to mourn", 2],
    ],
    modelAnswer: "Plain white cloth shows equality. Rich and poor are wrapped in the same simple shroud, which teaches that all are equal before God. Prompt burial shows respect for the dead: the body is honoured by washing, prayer and burial, and the family and community can begin to mourn.",
    hints: ["Give one reason for the cloth and one for the speed."],
    explanation: "Two reasons, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a description (in words) of a funeral, written for this question; the people and town are fictional",
      "Ibrahim's grandfather died in the morning in Marondera. By afternoon, male relatives had washed the body and wrapped it in white cloth. The men of the community stood in rows outside the mosque and prayed for him without bowing. Then they carried the body to the cemetery and laid it on its right side facing Makkah. Neighbours brought food for the family that evening.",
      { described: true }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, how was the body prepared?",
        options: [
          ["It was washed and wrapped in white cloth", "Correct: ghusl and kafan."],
          ["It was dressed in fine clothes and placed in a coffin", "The source does not say this."],
          ["It was left unwashed until the next week", "Burial was the same day."],
          ["It was painted with symbols of the family", "The source does not say this."],
        ],
        answer: "A", explanation: "The source says male relatives washed the body and wrapped it in white cloth.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** features of a Muslim funeral.",
        points: ["The body is washed and wrapped in white cloth", "The community prays standing in rows without bowing", "The body is buried on its right side facing Makkah, and neighbours bring food"],
        modelAnswer: "The body is washed and wrapped in white cloth, the community prays standing in rows without bowing, and the body is buried on its right side facing Makkah. Neighbours then bring food for the family.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the community brings food to the bereaved family.",
        points: [["It shows care and support for those who are grieving", 1], ["The family is occupied with the funeral and may not prepare meals", 1], ["It reflects the Muslim teaching of kindness and community responsibility", 1]],
        modelAnswer: "It shows care and support for those who are grieving. The family is busy with the funeral and may not prepare meals, and it reflects the Muslim teaching of kindness and community responsibility.",
      }),
    ],
    hints: ["In (c) link the practice to care for the family and Muslim teaching."],
    explanation: "The source shows ghusl, kafan, janazah, burial and community support.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nyasha says: \"Rites of passage in Islam are the same in every country.\" Her friend Yusuf says: \"The main rites are the same, but families follow them in different ways.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** things that happen at an Islamic wedding.",
        points: [["The nikah contract is read and both partners agree", 1], ["Witnesses are present and an imam or other leader gives a short sermon", 1], ["The mahr is agreed and given to the bride", 1], ["A feast (walimah) follows", 1]],
        modelAnswer: "The nikah contract is read and both partners agree in front of witnesses, with a short sermon by an imam. The mahr is agreed and given to the bride, and a feast (walimah) follows.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why divorce is permitted in Islam but discouraged.",
        points: [["Islam recognises that some marriages cannot continue, so divorce (talaq) is allowed", 2], ["It is the last choice, after efforts at reconciliation by the family, and a waiting period (iddah) follows, because family life is highly valued", 2]],
        modelAnswer: "Islam recognises that some marriages cannot continue, so divorce is allowed. It is the last choice, after efforts at reconciliation, and a waiting period follows, because family life is highly valued.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that the rites at death are the most important rites of passage in Islam.",
        points: [["For: death rites express belief in the afterlife and the equality of all before God", 2], ["For: the funeral is a duty of the whole community and must be done promptly", 2], ["Against or limits: birth and marriage rites also express belief and mark life in the community", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The death rites express belief in the afterlife and the equality of all before God, and the funeral is a duty of the whole community that must be done promptly. However, birth and marriage rites also express belief, with the adhan whispered to the baby and the nikah based on consent and responsibility. Each rite marks a stage of life in the community. I conclude that the death rites are among the most serious because they involve the whole community and belief about the afterlife, but they are not more important than the others.",
      }),
    ],
    hints: ["Give reasons for death rites, then for birth and marriage, then judge."],
    explanation: "A strong answer compares the rites and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is the **aqiqah**?", "The naming ceremony on the seventh day, with the head shaved in many families and an animal sacrificed and shared.");
  b.card("FACT", "What is whispered into a newborn's ear?", "The adhan, the call to prayer, so that the first words heard are about God.", "Tahnik: a softened date is rubbed on the palate.");
  b.card("DEFINITION", "What is the **nikah**?", "The Muslim marriage contract, made with consent and witnesses.");
  b.card("DEFINITION", "What is the **mahr**?", "A gift from the groom to the bride that belongs to her.");
  b.card("DEFINITION", "What is the **walimah**?", "The wedding feast, to which the poor are invited.");
  b.card("FACT", "What does the Qur'an say about having more than one wife?", "Qur'an 4:3 permits up to four wives on condition of justice; 4:129 says perfect fairness is very difficult.");
  b.card("FACT", "What are the stages of a Muslim funeral?", "Washing (ghusl), shrouding (kafan), funeral prayer (janazah) and prompt burial facing Makkah.");
  b.card("CONCEPT", "Why is the shroud plain white?", "It shows that all people are equal before God in death.");
  b.card("FACT", "How long is mourning for a widow?", "Four months and ten days (Qur'an 2:234); other mourners usually three days.");
});
