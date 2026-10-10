// W4a: Religion, health and healing.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.ethics.health-healing", { file: "ethics/health-healing", keyPrefix: "ethics.health-healing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given in Shona to a traditional healer in Indigenous Religion?",
    options: [
      ["N'anga", "Correct: the healer who diagnoses and treats illness."],
      ["Svikiro", "A svikiro is a spirit medium through whom a spirit speaks, not the healer."],
      ["Mukuru", "Mukuru means an elder or senior person."],
      ["Mufundisi", "Mufundisi is a Christian minister or teacher."],
    ],
    answer: "A",
    explanation: "The **n'anga** (inyanga in Ndebele) is the traditional healer. A svikiro is a spirit medium.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Jewish principle says that saving a life overrides almost every other commandment?",
    options: [
      ["Pikuach nefesh", "Correct: the 'saving of a life'."],
      ["Kashrut (food laws)", "Kashrut is the set of Jewish food laws."],
      ["Brit milah (circumcision)", "Brit milah is the rite of circumcision on the eighth day."],
      ["Bikur cholim", "Bikur cholim is the duty of visiting the sick, not the principle that overrides other laws."],
    ],
    answer: "A",
    explanation: "**Pikuach nefesh** allows a person to break nearly all commandments, even Shabbat rules, to save a life.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which sentence best describes how many families in Indigenous Religion understand the causes of illness?",
    options: [
      ["Illness may have natural, spiritual and social causes, which are considered together", "Correct: healing is of the whole person and relationships."],
      ["Illness is always caused by the displeasure of the ancestral spirits and by nothing else", "Many families also recognise accidents, infections and other natural causes."],
      ["Illness has only natural causes and the spirit world has no part in it", "Spiritual and social causes are also recognised."],
      ["Illness has social causes only, such as the quarrels in a family", "Natural and spiritual causes are recognised too."],
    ],
    answer: "A",
    explanation: "Many families distinguish **natural**, **spiritual** and **social** causes and treat them together, so the healer looks at the person, the family and the spirit world.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: `Which practice of the early Church is described in ${ref("James", 5, "14-15")}?`,
    options: [
      ["The elders pray over a sick person and anoint the person with oil", "Correct: the origin of the anointing of the sick."],
      ["The elders send a sick person away from the congregation until the illness ends", "The passage does not teach exclusion."],
      ["The elders ask the sick person to pay a fee before prayer is offered", "No payment is mentioned."],
      ["The elders offer the sick person a ritual meal to honour the ancestors", "This is not a Christian practice in the passage."],
    ],
    answer: "A",
    explanation: `In **${ref("James", 5, "14-15")}** the elders of the church are told to pray for the sick and anoint them with oil.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does Islam encourage Muslims to seek medical treatment when they are ill?",
    options: [
      ["The body is a trust from God, so it must be looked after", "Correct: the idea of amanah."],
      ["Illness is a punishment that only a doctor can remove", "Islam does not teach that illness is always punishment."],
      ["Muslims are forbidden to pray for the sick when a doctor is present", "Muslims pray for the sick as well as seeking treatment."],
      ["Treatment is the fifth pillar and is required of every Muslim", "The Five Pillars do not include medical treatment."],
    ],
    answer: "A",
    explanation: "Islam teaches that the body is an **amanah** (trust) from God, so Muslims look after health and seek treatment while also praying.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Miriam's grandfather becomes seriously ill on a Saturday. Which Jewish teaching allows her family to take him to hospital on Shabbat?",
    options: [
      ["Pikuach nefesh, the principle that saving life comes first", "Correct: life-saving action overrides Shabbat rules."],
      ["Kashrut, the principle of keeping food laws in the home", "Kashrut concerns food, not the duty to save life."],
      ["Bar mitzvah, the principle of coming of age at the age of thirteen", "Bar mitzvah is a rite of passage."],
      ["Sukkot, the principle of dwelling in shelters for a week", "Sukkot is a festival remembering the wilderness shelters."],
    ],
    answer: "A",
    hints: ["Find the principle that is about saving a life."],
    explanation: "**Pikuach nefesh** permits travelling and other actions on Shabbat when life is in danger.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which situation shows a religious belief being used in a way that health workers say can harm a child?",
    options: [
      ["Parents refuse every vaccine because their church discourages it", "Correct: the child may be left unprotected from preventable disease."],
      ["Parents pray with their child before taking the child to a clinic", "Prayer alongside treatment is welcomed."],
      ["A church runs a clinic that treats members and non-members", "A church clinic helps people."],
      ["A healer advises a patient with a high fever to go to the hospital", "Referral to the clinic is good practice."],
    ],
    answer: "A",
    hints: ["Look for the answer in which belief replaces medical care."],
    explanation: "Health workers appeal to all families to vaccinate because children have a **right to health care**; belief that replaces treatment can leave a child at risk.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about religion and modern medicine is best supported by the lesson?",
    options: [
      ["Religion and medicine often cooperate; problems arise when belief replaces treatment", "Correct: cooperation is common."],
      ["Religion and medicine are always in conflict, because no religion encourages treatment", "Churches, mosques and healers often support treatment."],
      ["Religion has no place in healing because only the body can be healed", "Many religions speak of healing the whole person."],
      ["Modern medicine has made healers and chaplains unnecessary in every community", "Many people still value their care and comfort."],
    ],
    answer: "A",
    hints: ["Choose the statement that allows for both cooperation and conflict."],
    explanation: "A fair summary is that religion and medicine often **cooperate** (mission hospitals, healers who refer patients), and conflict arises only when belief replaces treatment.",
  });
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "In Islam, a person who is ill need not fast in Ramadan but may make up the days later.",
    answer: true,
    explanation: `True. ${ref("Qur'an", 2, 184)} allows the sick to make up the missed days of fasting later.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All Christian churches teach that believers must avoid clinics and hospitals.",
    answer: false,
    explanation: "False. Most churches run or support clinics and hospitals; only a few small groups discourage particular treatments.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Pikuach nefesh", "Saving of a life, which overrides almost every other commandment"], ["Bikur cholim", "The Jewish duty of visiting the sick"], ["Amanah", "A trust from God, such as the body in Islam"], ["Ngozi", "An angry spirit of a person who was wronged in life"]],
    explanation: "Pikuach nefesh: saving life first. Bikur cholim: visiting the sick. Amanah: trust. Ngozi: an angry wronged spirit.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Catholic and Orthodox churches keep the {{blank:a}} of the Sick as a sacrament, based on the anointing with {{blank:b}} in James 5:14-15.",
    blanks: [
      { id: "a", accepted: ["Anointing"], choices: ["Baptism", "Anointing", "Marriage", "Confirmation"] },
      { id: "b", accepted: ["oil"], choices: ["water", "oil", "ash", "wine"] },
    ],
    explanation: "The **Anointing** of the Sick uses **oil**, following James 5:14-15.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which section of the Constitution of Zimbabwe 2013 protects the right to health care? Give the section number only.",
    accepted: ["76", "section 76", "s76", "s 76"],
    wrong: ["56", "60"],
    explanation: "**Section 76** of the Constitution protects the right to health care; section 81 deals with the rights of children.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** ways in which churches in Zimbabwe contribute to health care.",
    points: ["Running mission hospitals and clinics", "Praying for the sick and holding healing services", "Home visits and care for the sick and orphans, or promoting health messages"],
    modelAnswer: "Churches run mission hospitals and clinics, pray for the sick and hold healing services, and visit and care for the sick and orphans at home.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** causes of illness recognised in Indigenous Religion.",
    points: [
      ["A cause identified, for example natural causes", 1],
      ["Developed, for example accidents, bad food or infections that can be treated at the clinic or with herbs", 1],
      ["A second cause identified, for example spiritual causes", 1],
      ["Developed, for example an ancestor displeased by a neglected ritual, or an angry spirit (ngozi), so a healer advises a ritual", 1],
    ],
    modelAnswer: "One cause is natural: accidents, bad food or infections can make a person ill and may be treated at the clinic or with herbs. Another is spiritual: an ancestor may be displeased because a ritual was neglected, or an angry spirit such as ngozi may trouble a family, so the healer advises a ritual to restore harmony.",
    hints: ["For each cause give a name and then explain what it means."],
    explanation: "One mark for each cause and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which religious practice and modern medicine can work together.",
    points: [
      ["Churches build and run mission hospitals and clinics", 1],
      ["Developed: they serve rural communities and treat people of all faiths", 2],
      ["Healers and leaders refer patients with serious illness to the clinic and pray for them", 1],
      ["Developed: the patient receives treatment while the family receives spiritual comfort, so the whole person is cared for", 2],
    ],
    modelAnswer: "Churches build and run mission hospitals and clinics. They serve rural communities and treat people of all faiths, which shows religion and medicine working together. Healers and leaders also refer patients with serious illness to the clinic and pray for them. The patient receives treatment while the family receives spiritual comfort, so the whole person is cared for.",
    hints: ["Give one example of cooperation by an institution and one by a person."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newspaper report in Mutare, 2026",
      "A senior nurse at a rural clinic outside Mutare has urged all parents to bring their children for vaccination, whatever their church. \"Prayer is a comfort and we respect every faith,\" she told parents at a meeting. \"But a vaccine prevents illness before it starts, and every child has a right to health care.\" Several church leaders at the meeting agreed and promised to announce the clinic days at their services."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what did the church leaders promise to do?",
        options: [
          ["Announce the clinic days at their services", "Correct: they promised to announce the clinic days."],
          ["Close their services on clinic days", "The source does not say this."],
          ["Build a new church building beside the clinic", "The source does not say this."],
          ["Stop praying for sick members", "The source does not say this."],
        ],
        answer: "A", explanation: "The church leaders promised to announce the clinic days at their services.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the nurse said.",
        points: ["Parents should bring children for vaccination, whatever their church", "Prayer is a comfort and every faith is respected", "A vaccine prevents illness and every child has a right to health care"],
        modelAnswer: "The nurse said that parents should bring their children for vaccination whatever their church, that prayer is a comfort and every faith is respected, and that a vaccine prevents illness and every child has a right to health care.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the church leaders' decision in Source A shows religion and medicine working together.",
        points: [["The leaders accepted that vaccination protects children", 1], ["They used their services to share the clinic days with members", 1], ["Members trust their leaders, so more families may attend", 1], ["Children receive protection while families keep their faith and prayer", 1]],
        modelAnswer: "The leaders accepted that vaccination protects children and used their services to share the clinic days with members. Members trust their leaders, so more families may attend. Children receive protection while families keep their faith and prayer.",
      }),
    ],
    hints: ["In (c) link what the leaders did to the result for the children."],
    explanation: "The source shows church leaders supporting the health message while keeping their religious role.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Tendai says: \"A family should always follow the advice of the n'anga or the church prophet before going to the clinic.\" Aisha says: \"Medical treatment and religious practice should be used together.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which believers seek healing from religious sources.",
        points: [["A first way, with the religion", 2, ["Indigenous Religion: consulting a n'anga or inyanga who uses herbs, divination and ritual", "Christianity: prayer, anointing with oil, healing services or AIC prophets", "Islam: prayer and prophetic medicine alongside a doctor"]], ["A second way, from a different religion", 2]],
        modelAnswer: "In Indigenous Religion a family may consult a n'anga or inyanga, who uses herbs, divination and ritual to restore harmony. In Christianity believers may ask the elders to pray over the sick and anoint them with oil, and some attend healing services.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Tendai and Aisha.",
        points: [
          ["Tendai: spiritual causes may be believed to lie behind illness, so the healer or prophet is consulted first", 2],
          ["Developed: the patient and family find comfort and meaning in the ritual and in family support", 1],
          ["Weakness: delay can be dangerous for serious illness, and health workers urge early treatment", 2],
          ["Aisha: Judaism (pikuach nefesh), Islam (the body as a trust) and most churches encourage medicine", 2],
          ["A supported conclusion that works together best", 1],
        ],
        levels: levels(8),
        modelAnswer: "Tendai's view reflects the belief in some families that illness may have spiritual causes, so the n'anga or prophet is consulted first. The patient and family may find comfort and meaning in the ritual. However, delay can be dangerous for serious illness, and health workers urge early treatment.\n\nAisha's view is supported by Judaism, where pikuach nefesh puts saving life first, by Islam, where the body is a trust, and by most churches, which run hospitals. I think Aisha's view is stronger, because families can gain both medical treatment and spiritual comfort, and a serious illness should not wait.",
        explanation: "Level marking: both views developed, with examples from religions, and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give reasons for each view and then judge."],
    explanation: "Practice question on the relationship between religious healing and medicine.",
  });

  b.card("DEFINITION", "What is pikuach nefesh?", "The Jewish principle that saving a life overrides almost every other commandment, including Shabbat rules.");
  b.card("DEFINITION", "What is a n'anga (inyanga in Ndebele)?", "A traditional healer in Indigenous Religion who diagnoses and treats illness using herbs, divination and ritual.");
  b.card("FACT", "Which passage tells the elders of the church to anoint the sick with oil?", "James 5:14-15.", "Catholic and Orthodox churches keep this as the Anointing of the Sick.");
  b.card("FACT", "What does Qur'an 2:184 allow a sick Muslim to do?", "Not fast in Ramadan, but make up the days later.");
  b.card("CONCEPT", "Why do Muslims look after their health?", "The body is an amanah, a trust from God.");
  b.card("CONCEPT", "What three kinds of cause of illness do many families in Indigenous Religion recognise?", "Natural, spiritual and social causes.");
  b.card("FACT", "Which section of the Constitution of Zimbabwe 2013 protects the right to health care?", "Section 76.");
  b.card("CONCEPT", "When can religion and medicine come into conflict?", "When a belief replaces treatment, for example refusing vaccination or clinic care for a child.", "Children have a right to health care.");
});
