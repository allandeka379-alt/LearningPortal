// W3a: Islamic law, ethics and groups within Islam.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.islam.groups-sharia", { file: "islam/groups-sharia", keyPrefix: "islam.groups-sharia" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word **Sharia** literally mean?",
    options: [
      ["The path", "Correct: the path or way of life."],
      ["The pilgrimage", "The pilgrimage is the Hajj."],
      ["The prayer", "Prayer is Salah."],
      ["The prophet", "A prophet is a nabi or rasul."],
    ],
    answer: "A",
    explanation: "**Sharia** means \"the path\": guidance for Muslim life from the Qur'an and the Sunnah.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these foods is haram (forbidden) for Muslims?",
    options: [
      ["Pork", "Correct: forbidden in Qur'an 5:3."],
      ["Fish", "Fish is halal."],
      ["Rice", "Rice is halal."],
      ["Beans", "Beans are halal."],
    ],
    answer: "A",
    explanation: "**Pork** is forbidden, with alcohol, blood and the meat of animals that died of themselves.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is the first source of Sharia?",
    options: [
      ["The Qur'an", "Correct: the word of God."],
      ["Qiyas", "Qiyas is reasoning by analogy, a later source."],
      ["Ijma", "Ijma is agreement of scholars, a later source."],
      ["The ruling of a local mosque", "A local ruling is not a source of Sharia."],
    ],
    answer: "A",
    explanation: "The **Qur'an** is first; then the Sunnah, ijma and qiyas.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **riba**, which Islam forbids?",
    options: [
      ["Interest on loans", "Correct: Qur'an 2:275."],
      ["Giving to the poor", "Giving is encouraged."],
      ["Fasting in Ramadan", "Fasting is a Pillar."],
      ["Trading goods honestly", "Honest trade is permitted."],
    ],
    answer: "A",
    explanation: "**Riba** is interest; Muslim banks use methods such as profit-sharing instead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What do Muslims call the inner struggle against selfishness and temptation?",
    options: [
      ["The greater jihad", "Correct: the daily struggle to do good."],
      ["The lesser jihad of defence", "The lesser jihad is defence of the community under strict rules."],
      ["The Hijrah to Madinah", "The Hijrah is the migration to Madinah."],
      ["The Shahadah", "The Shahadah is the declaration of faith."],
    ],
    answer: "A",
    explanation: "Many Muslims call the inner struggle the **greater jihad** and defence of the community the lesser jihad.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tendai reads a headline that links the word jihad with violence. Yusuf says most Muslims reject this use. What does Yusuf's view show?",
    options: [
      ["Mainstream scholars reject terrorism and stress inner struggle", "Correct: violence against civilians is condemned."],
      ["Jihad has no religious meaning at all and is only a political word", "It is a religious term meaning struggle."],
      ["All Muslims agree that jihad should always mean fighting a war", "Most Muslims do not use it that way."],
      ["Muslim scholars encourage attacks on those who do not agree with them", "Mainstream scholars reject such attacks."],
    ],
    answer: "A",
    hints: ["Remember that jihad means striving and that civilians are protected."],
    explanation: "Mainstream scholars **reject terrorism**; Qur'an 5:32 stresses the value of every life.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What is the main difference between Sunni and Shi'a Muslims?",
    options: [
      ["They differ over who should lead after the Prophet", "Correct: it began as a dispute about leadership."],
      ["They follow different holy books, with only Sunni using the Qur'an", "Both use the Qur'an."],
      ["They worship different gods and keep different Five Pillars of faith", "Both worship one God and keep the Pillars."],
      ["They live in different countries and speak different languages", "Both groups are found in many countries."],
    ],
    answer: "A",
    hints: ["Recall how the division began."],
    explanation: "Sunni and Shi'a share the Qur'an and the Pillars; they differ mainly about **leadership** and the imams.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best describes the role of the schools of law (madhahib) in Sunni Islam?",
    options: [
      ["They offer different ways of interpreting the sources", "Correct: the schools differ on details."],
      ["They are separate religions with different holy books and different prophets", "They are not separate religions."],
      ["They replace the Qur'an with the opinions of the founders of each school", "The Qur'an remains the first source."],
      ["They exist only in Makkah and Madinah and are unknown elsewhere", "They are found worldwide."],
    ],
    answer: "A",
    hints: ["Think of agreement on main teachings and difference of detail."],
    explanation: "The four Sunni schools (Hanafi, Maliki, Shafi'i, Hanbali) **agree on the main teachings** and differ on details of interpretation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The Qur'an says that there is no compulsion in religion (Qur'an 2:256).",
    answer: true,
    explanation: "True. Muslims cite this verse to teach that faith cannot be forced.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Sufism is a separate religion that is not part of Islam.",
    answer: false,
    explanation: "False. Sufism is the mystical tradition within Islam, found among Sunni and Shi'a Muslims.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of Sharia with its meaning.",
    pairs: [["Qur'an", "the word of God"], ["Sunnah", "the example of the Prophet"], ["Ijma", "agreement among qualified scholars"], ["Qiyas", "reasoning by analogy"]],
    explanation: "Qur'an: word of God. Sunnah: the Prophet's example. Ijma: scholars' agreement. Qiyas: analogy.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Permitted things are called {{blank:a}}, forbidden things are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["halal"], choices: ["halal", "haram", "riba", "fard"] },
      { id: "b", accepted: ["haram"], choices: ["halal", "haram", "sunnah", "hajj"] },
    ],
    explanation: "**Halal** means permitted; **haram** means forbidden.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the mystical tradition within Islam that stresses remembrance of God (dhikr)?",
    accepted: ["Sufism", "Sufi", "Tasawwuf", "Sufi Islam"],
    wrong: ["Sunni", "Shi'a"],
    explanation: "**Sufism** is the mystical tradition in Islam.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** things that are haram (forbidden) in Islam.",
    points: ["Eating pork", "Drinking alcohol", "Gambling, or taking interest (riba)"],
    modelAnswer: "Eating pork, drinking alcohol, and gambling or taking interest (riba) are forbidden.",
    explanation: "One mark for each.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the two meanings of jihad that many Muslims teach.",
    points: [["Jihad means striving or struggle", 1], ["The greater jihad is the inner struggle against selfishness and temptation", 1], ["The lesser jihad is defence of the community under strict conditions", 1], ["Civilians are protected and terrorism is rejected by mainstream scholars", 1]],
    modelAnswer: "Jihad means striving. The greater jihad is the inner struggle against selfishness and temptation. The lesser jihad is defence of the community under strict conditions, in which civilians are protected, and mainstream scholars reject terrorism.",
    hints: ["Give the meaning, the greater, the lesser and the limits."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which Sharia affects the daily life of a Muslim.",
    points: [
      ["It guides what a Muslim eats and drinks", 1],
      ["Developed: halal and haram rules mean avoiding pork and alcohol and choosing halal meat, out of obedience to God", 2],
      ["It guides business and money", 1],
      ["Developed: the ban on riba leads Muslims to use interest-free methods and to be honest and fair in trade", 2],
    ],
    modelAnswer: "Sharia guides what a Muslim eats and drinks: halal and haram rules mean avoiding pork and alcohol and choosing halal meat out of obedience to God. It also guides business and money: the ban on riba leads Muslims to use interest-free methods and to be honest and fair in trade.",
    hints: ["Choose two areas of life and give an example in each."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students in a school in Bindura, 2026",
      "Thandeka: Yusuf, why did you not eat the sausage at the school braai?\nYusuf: It contained pork, and Muslims do not eat pork. I would eat chicken if it were halal.\nThandeka: And my cousin says Muslims are not all the same.\nYusuf: That is true. Most Muslims are Sunni, but some are Shi'a. We share the Qur'an and the Five Pillars, but we differ on who should have led the community after the Prophet."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, why did Yusuf not eat the sausage?",
        options: [
          ["It contained pork, which Muslims do not eat", "Correct: pork is haram."],
          ["It was not cooked long enough for Muslims to eat", "The source does not say this."],
          ["It was served during the fast of Ramadan", "The source does not mention Ramadan."],
          ["It was offered by someone who was not a Muslim", "The source gives pork as the reason."],
        ],
        answer: "A", explanation: "Yusuf says the sausage contained pork, which Muslims do not eat.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** facts about Islam.",
        points: ["Muslims do not eat pork", "Chicken may be eaten if it is halal", "Sunni and Shi'a share the Qur'an and the Five Pillars but differ over leadership after the Prophet"],
        modelAnswer: "Muslims do not eat pork, they may eat chicken if it is halal, and Sunni and Shi'a share the Qur'an and the Five Pillars but differ over leadership after the Prophet.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why Muslims follow food rules such as those in Source A.",
        points: [["The Qur'an (5:3) forbids pork and some other foods", 1], ["Muslims obey the rules as an act of obedience to God", 1], ["The rules also express discipline and care for health, and shape Muslim identity", 1]],
        modelAnswer: "The Qur'an forbids pork and some other foods. Muslims obey these rules as an act of obedience to God, and the rules also express discipline and care for health and shape Muslim identity.",
      }),
    ],
    hints: ["In (c) give the source of the rule, the attitude and the effect."],
    explanation: "The source shows halal and haram food and the unity and difference between Sunni and Shi'a.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Farai says: \"The word jihad shows that Islam is a violent religion.\" Aisha, who is Muslim, says: \"Jihad means striving, and its main meaning is the effort to be a better person.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** sources of Sharia.",
        points: [["The Qur'an, the word of God", 1], ["The Sunnah, the example of the Prophet recorded in the Hadith", 1], ["Ijma, the agreement of scholars", 1], ["Qiyas, reasoning by analogy", 1]],
        modelAnswer: "The Qur'an is the word of God and the first source. The Sunnah is the example of the Prophet recorded in the Hadith.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why Muslim scholars reject terrorism.",
        points: [["The Qur'an (5:32) teaches that killing an innocent person is like killing all humankind", 2], ["Classical rules of defence protect civilians, women, children and places of worship, and there is no compulsion in religion (2:256)", 2]],
        modelAnswer: "The Qur'an teaches that killing an innocent person is like killing all humankind. The rules of defence protect civilians, women, children and places of worship, and there is no compulsion in religion.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that jihad is best understood as an inner struggle.",
        points: [["For: jihad means striving, and the greater jihad is the daily struggle against selfishness and wrong", 2], ["Against or limits: the lesser jihad (defence of the community under strict conditions) is part of Muslim teaching", 2], ["Link: both meanings have strict ethics; violence against civilians is rejected", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Jihad means striving, and many Muslims teach that the greater jihad is the daily struggle against selfishness and wrong. However, Muslim teaching also includes the lesser jihad, defence of the community under strict conditions. Both meanings have strict ethics, and violence against civilians is rejected. I conclude that the inner struggle is the main meaning for most Muslims, with defence a limited second meaning.",
      }),
    ],
    hints: ["Cover the greater and lesser meanings, then judge."],
    explanation: "A strong answer covers both meanings and the limits on the second.",
  });

  b.card("DEFINITION", "What is **Sharia**?", "The path: guidance for Muslim life drawn from the Qur'an and the Sunnah and interpreted by scholars.");
  b.card("FACT", "What are the four sources of Sharia?", "Qur'an, Sunnah, ijma (scholars' agreement) and qiyas (analogy).");
  b.card("DEFINITION", "What do **halal** and **haram** mean?", "Halal: permitted. Haram: forbidden.");
  b.card("DEFINITION", "What is **riba**?", "Interest on loans, forbidden in Islam (Qur'an 2:275).");
  b.card("DEFINITION", "What is **jihad**?", "Striving: the inner struggle (greater jihad) or defence of the community under strict conditions (lesser jihad).");
  b.card("CONCEPT", "How do mainstream Muslim scholars view terrorism?", "They reject it as contrary to Islam; Qur'an 5:32 stresses the value of every life.");
  b.card("CONCEPT", "What is the main difference between Sunni and Shi'a Muslims?", "Leadership after the Prophet: Sunni accept the elected caliphs; Shi'a hold that Ali and his descendants, the imams, should lead.");
  b.card("FACT", "Name the four Sunni schools of law.", "Hanafi, Maliki, Shafi'i and Hanbali.");
  b.card("DEFINITION", "What is **Sufism**?", "The mystical tradition within Islam, stressing remembrance of God (dhikr) and the inner path.");
});
