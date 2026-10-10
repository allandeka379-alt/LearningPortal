// W1a: religion, morality and Unhu/Ubuntu/Vumunhu (frs.religion.morality-unhu).
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.religion.morality-unhu", { file: "religion/morality-unhu", keyPrefix: "religion.morality-unhu" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the Shona saying **munhu munhu navanhu** express?",
    options: [
      ["A person is a person because of other people around them", "Correct: it sums up the idea of Unhu/Ubuntu."],
      ["A person should succeed by relying on no one else", "The saying stresses relationships, not independence."],
      ["A person must obey the chief in every decision made", "The saying is about human relationships, not obedience."],
      ["A person who is wealthy is more respected by others", "The saying is not about wealth."],
    ],
    answer: "A",
    explanation: "*Munhu munhu navanhu* (and the Nguni *umuntu ngumuntu ngabantu*) means that a person becomes fully human through relationships with other people.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the difference between **values** and **norms**?",
    options: [
      ["Values are principles held to be important; norms are expected ways of behaving", "Correct: honesty is a value; telling the truth when asked is a norm."],
      ["Values are rules made by the courts; norms are beliefs held privately by a person", "Values are not legal rules, and norms are shared by a group."],
      ["Values apply only to religious people, while norms apply only to non-religious people", "Both apply to all communities, religious or not."],
      ["Values change from day to day, whereas norms stay the same in every society", "Norms also differ between societies and change over time."],
    ],
    answer: "A",
    explanation: "**Values** are the principles a community regards as important (honesty, respect). **Norms** are the expected patterns of behaviour that put them into practice (greeting elders respectfully).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a source of morality that comes from inside a person?",
    options: [
      ["Conscience, the inner sense of right and wrong", "Correct: conscience is a personal sense of right and wrong."],
      ["Law, which is made and enforced by the state", "Law comes from outside a person."],
      ["Scripture, which is read from a holy book or recited", "Scripture comes from outside the individual."],
      ["The elders of a village, who teach customs to the young", "Elders are an outside source of guidance."],
    ],
    answer: "A",
    explanation: "Sources of morality include religion, culture and family, law, reason and **conscience**, the inner sense of right and wrong.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which scripture reference is linked with the teaching to love one's neighbour in Judaism?",
    options: [
      [ref("Leviticus", 19, 18), "Correct: Leviticus 19:18 is the verse about loving one's neighbour as oneself."],
      [ref("Genesis", 1, 1), "Genesis 1:1 is the beginning of the creation account."],
      [ref("Exodus", 3), "Exodus 3 describes Moses at the burning bush."],
      [ref("Psalm", 23), "Psalm 23 is a psalm of trust in God as a shepherd."],
    ],
    answer: "A",
    explanation: "**Leviticus 19:18** teaches love of one's neighbour. Deuteronomy 10:19 adds love for the stranger.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda shares food with a stranger who arrives at dusk and gives him a place to sleep. Which Unhu value is **most** clearly shown?",
    options: [
      ["Hospitality, welcoming a stranger and caring for him", "Correct: welcoming and caring for a visitor is hospitality."],
      ["Humility, being modest about one's own achievements", "Nothing in the example is about modesty."],
      ["Punctuality, arriving at the agreed time without delay", "Nothing in the example concerns time-keeping."],
      ["Obedience to the law, following a statute made by the state", "The example does not concern a law."],
    ],
    answer: "A",
    hints: ["What does Tatenda do for the stranger?"],
    explanation: "**Hospitality** (welcoming strangers and visitors) is a central value of Unhu. Jews, Christians and Muslims also teach care for the stranger and the guest.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo finds a lost purse at school. She hands it to her teacher because she believes God expects honesty, and her friend Thandeka does the same because she thinks it is the fair thing to do. What does this show about sources of morality?",
    options: [
      ["Different sources, such as religion and reason, can lead to one action", "Correct: two people with different reasons reach the same decision."],
      ["Only religion can lead a person to act honestly in a situation like this", "Thandeka acts honestly without a religious reason."],
      ["Reason and religion always lead to opposite decisions about right and wrong", "Here they lead to the same action."],
      ["Conscience has no part to play when a person decides how to act", "Conscience is usually involved in such decisions."],
    ],
    answer: "A",
    hints: ["Compare the reasons the two girls give with the action they take."],
    explanation: "Religion, reason, conscience and culture overlap. Believers and non-believers can reach the same moral decision for different reasons.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the relationship between religion and morality is **best** supported?",
    options: [
      ["Religion is a major source of morality, but not the only one", "Correct: morality also comes from conscience, reason, culture and law."],
      ["Morality has no connection with religion in any society in the world", "Many people draw their morality from their religion."],
      ["Only a person who belongs to a religion is capable of moral behaviour", "Non-religious people also live by moral values."],
      ["All religions teach precisely the same rules on every moral question", "Religions share many values but differ on some rules."],
    ],
    answer: "A",
    hints: ["Look for the statement that avoids saying 'only', 'always' or 'never'."],
    explanation: "Religion and morality are closely linked in practice but are not identical. Religion is a major source for many people, while others find guidance in conscience, reason and law.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A school plans an assembly on Unhu for learners of many faiths. Which approach is **most appropriate** for this subject?",
    options: [
      ["Showing how all four religions in this course teach respect and care", "Correct: it treats the faiths fairly and shows shared values."],
      ["Presenting one religion's teaching as the only true source of Unhu for everyone", "That would be confessional and would rank religions."],
      ["Leaving out all religious teaching, since values can have no religious source", "Religion is a major source for many, so leaving it out would be incomplete."],
      ["Asking learners to say which religion is the most moral of all the faiths", "Ranking religions is unfair and not the aim of this subject."],
    ],
    answer: "A",
    hints: ["The subject is multi-faith and non-confessional."],
    explanation: "A multi-faith, non-confessional approach shows how several traditions teach shared values in their own words, without ranking them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Respect, sharing, hospitality and responsibility are values associated with Unhu/Ubuntu.",
    answer: true,
    explanation: "True. Unhu also includes humility, honesty and care for the community.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Only religious people can have morals, because conscience and reason cannot guide anyone's behaviour.",
    answer: false,
    explanation: "False. Religion is a major source of morality for many, but morality also comes from conscience, reason, culture and law, and non-religious people live by moral values.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each scripture reference with the teaching it is linked to in this lesson.",
    pairs: [
      [ref("Leviticus", 19, 18), "Love your neighbour (Judaism)"],
      [ref("Luke", 10, "25-37"), "The Good Samaritan (Christianity)"],
      [ref("Matthew", 7, 12), "The Golden Rule (Christianity)"],
      [ref("Qur'an", 2, 177), "Righteousness includes giving to relatives, orphans and the needy (Islam)"],
    ],
    explanation: "Leviticus 19:18: love of neighbour. Luke 10:25-37: the Good Samaritan. Matthew 7:12: the Golden Rule. Qur'an 2:177: righteousness and giving to those in need.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Nguni saying for Unhu is umuntu ngumuntu {{blank:a}}. A person who shows Unhu is described in Shona as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["ngabantu"], choices: ["ngabantu", "ngamakhosi", "ngomhlaba", "ngobuntu"] },
      { id: "b", accepted: ["munhu chaiye"], choices: ["munhu chaiye", "munhu wemusha", "mukuru wemusha", "murume wemuviri"] },
    ],
    explanation: "*Umuntu ngumuntu ngabantu*: a person is a person through other people. A person of good character is called *munhu chaiye*, a real person.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the study of morality, which asks what makes an action right or wrong?",
    accepted: ["ethics"],
    wrong: ["norms", "values"],
    explanation: "**Ethics** is the study of morality. In everyday speech ethics and morals are often used as near synonyms.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** values associated with Unhu/Ubuntu/Vumunhu.",
    points: ["Respect", "Sharing (or hospitality)", "Any one of: responsibility, humility, honesty, peace and forgiveness, care for the community"],
    modelAnswer: "Respect, sharing and hospitality.",
    explanation: "One mark for each value correctly stated.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** sources of morality, other than religion.",
    points: [
      "Identifies: conscience (an inner sense of right and wrong)",
      "Develops: e.g. feeling guilt after lying leads a person to be honest",
      "Identifies: law, culture, family or reason",
      "Develops: e.g. the law forbids theft and the family teaches respect, so people learn what is expected",
    ],
    modelAnswer: "Conscience is an inner sense of right and wrong; a person who feels guilty after telling a lie may decide to be honest in future. Law is another source: the state forbids theft, so people learn that taking what belongs to others is wrong and punishable.",
    hints: ["Think of what happens inside a person, and what is made by the state or family."],
    explanation: "Two marks for each source: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how **two** religions you have studied support the Unhu value of caring for others.",
    points: [
      "Names a religion and a teaching or practice (e.g. Judaism: love your neighbour, Leviticus 19:18)",
      "Explains how it supports caring for others",
      "Names a second religion and a teaching or practice (e.g. Islam: zakat, or Christianity: the Good Samaritan)",
      "Explains how it supports caring for others",
    ],
    modelAnswer: "In Judaism, Leviticus 19:18 teaches love of one's neighbour, so Jews are taught to treat other people with the care they would want for themselves. In Islam, zakat requires Muslims to give part of their wealth to people in need, which shares resources and cares for the poor.",
    hints: ["Name a religion, then a teaching, then say how it encourages care."],
    explanation: "Credit accurate teachings, each linked to care for others.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a letter in a fictional church and community newsletter, Chinhoyi, 2026",
      "Last month a young stranger arrived in our village, looking for his uncle. The household where he first asked for help gave him water and a meal, the village head found him a bed for the night, and the next morning our neighbours helped him to find his uncle. Afterwards an elder said, \"A person is a person through other people.\" Our imam, minister and an elder of the traditional ceremonies all agreed that this is what their teachings ask of us.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which value of Unhu is **most** clearly shown by the way the village treated the stranger?",
        options: [
          ["Hospitality", "Correct: strangers were welcomed and cared for."],
          ["Competition", "The villagers cooperated; there was no contest."],
          ["Independence", "The stranger depended on the care of others."],
          ["Secrecy", "Nothing in the source is hidden or kept secret."],
        ],
        answer: "A",
        explanation: "Welcoming and caring for a stranger is **hospitality**.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** ways in which the villagers showed care for the stranger.",
        points: ["Gave him water and a meal", "Found him a bed for the night / helped him find his uncle"],
        modelAnswer: "They gave him water and a meal, and they found him a bed and helped him to find his uncle.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how Source A shows that religion and Unhu are connected.",
        points: [
          "The elder's saying expresses the idea of Unhu: a person is a person through other people",
          "The imam, the minister and the elder of the traditional ceremonies all agree that their teachings ask the same of people",
          "So different religions support the same value of caring for others in their own ways",
        ],
        modelAnswer: "The elder's saying expresses the idea of Unhu, that a person is a person through others. The imam, the minister and the elder of the traditional ceremonies all agree that their teachings ask the same of people, which shows that different religions support the value of caring for others in their own ways.",
      }),
    ],
    hints: ["In (c), look at what the three religious leaders say."],
    explanation: "A source linking the Unhu value of hospitality to the teaching of several faiths.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on religion and morality.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** values that Judaism, Christianity or Islam teach and that are also found in Unhu.",
        points: [
          "Names a value (e.g. care for the needy / love of neighbour / hospitality)",
          "Gives the teaching or practice that supports it (e.g. zakat, Leviticus 19:18, the Good Samaritan)",
          "Names a second value (e.g. honesty, respect for parents)",
          "Gives the teaching or practice that supports it (e.g. Qur'an 17:23 on kindness to parents; the Ten Commandments)",
        ],
        modelAnswer: "Care for the needy: Muslims give zakat to help the poor, and Christians recall the parable of the Good Samaritan. Respect for parents: the Ten Commandments in Judaism and Christianity teach honouring father and mother, and Qur'an 17:23 teaches kindness to parents.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"A person can only be truly moral if they follow a religion.\" To what extent do you agree?",
        points: [
          ["For: religion gives moral rules authority (from God or the ancestors), motives such as love and respect, and a community that supports good conduct", 2],
          ["Against: conscience, reason, culture and law also guide behaviour; many non-religious people are honest and kind", 2],
          ["Evidence from Zimbabwe: e.g. Unhu is taught in families, schools and communities as well as in religions; religions also differ on some moral questions", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "I do not agree that a person can only be moral if they follow a religion. For many believers, religion is a strong source of morality: moral rules come from God or the ancestors, believers are motivated by love and respect, and their community supports good conduct. In Indigenous Religion, for example, elders and the ancestors are believed to watch over the family's behaviour.\n\nHowever, morality also comes from conscience, reason, culture and law. Many people with no religion are honest, kind and responsible, and Unhu is taught in families and schools as well as in religious settings. Religions also differ on some moral questions, so they cannot be the only measure.\n\nOverall, religion is a major source of morality for many people, but not the only one, so a person can be truly moral with or without a religion.",
      }),
    ],
    hints: ["In (b), give the believer's view, a different view, and a conclusion."],
    explanation: "Describe shared values (a) and assess whether morality needs religion (b).",
  });

  b.card("DEFINITION", "Morality and ethics", "Morality: beliefs and practices about right and wrong. Ethics: the study of morality, asking what makes an action right or wrong.");
  b.card("DEFINITION", "Values and norms", "Values: principles a community holds to be important (honesty, respect). Norms: expected patterns of behaviour (greeting elders respectfully).");
  b.card("DEFINITION", "Unhu/Ubuntu/Vumunhu", "The philosophy that a person is a person through other people: respect, sharing, hospitality, responsibility and humility.");
  b.card("FACT", "What is the Shona saying for Unhu, and the Nguni saying?", "Munhu munhu navanhu (Shona); umuntu ngumuntu ngabantu (Nguni): a person is a person through other people.");
  b.card("FACT", "Name five sources of morality.", "Religion, culture and family, conscience, law and reason.");
  b.card("FACT", "Which Bible passages teach the Golden Rule and the Good Samaritan?", "Matthew 7:12 (the Golden Rule) and Luke 10:25-37 (the Good Samaritan).");
  b.card("FACT", "Which scripture references in Judaism teach love of neighbour and of the stranger?", "Leviticus 19:18 (neighbour) and Deuteronomy 10:19 (the stranger).");
  b.card("CONCEPT", "Is religion the only source of morality?", "No. It is a major source for many people, but morality also comes from conscience, reason, culture, family and law.");
  b.card("CONCEPT", "Why can believers of different religions agree on values such as care for others?", "Each tradition teaches care, honesty and respect in its own words, so they share many moral values while differing in beliefs and some rules.");
});
