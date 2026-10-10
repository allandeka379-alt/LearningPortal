// W3b: Religious teachings on the natural environment (Topic 11.1).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.environment.teachings", { file: "environment/teachings", keyPrefix: "environment.teachings" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word stewardship mean in religious teaching about the environment?",
    options: [
      ["Caring responsibly for creation that belongs to God", "Correct: humans are caretakers, not absolute owners."],
      ["Owning the land and its resources without any limit", "Stewardship rejects unlimited ownership."],
      ["Avoiding all contact with the natural world as unclean", "Stewardship involves active care."],
      ["Selling natural resources to whoever pays the highest price", "Stewardship is about responsible care, not profit."],
    ],
    answer: "A",
    explanation: "**Stewardship** is responsible care of something that belongs to someone else.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In Muslim teaching, what is a khalifah?",
    options: [
      ["A deputy of God who looks after the earth", "Correct: humans are khalifah on earth."],
      ["A written copy of the Qur'an kept in a mosque", "That would be a mushaf."],
      ["A pilgrimage made to Makkah in the month of Dhul-Hijjah", "That is Hajj."],
      ["A special prayer said when the rains fail to come", "That is not what the term means."],
    ],
    answer: "A",
    explanation: "A **khalifah** is a deputy or vicegerent; Muslims believe humans are God's khalifah on earth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Bible verse teaches that the earth and everything in it belong to the Lord?",
    options: [
      ["Psalm 24:1", "Correct: it declares that the earth is the Lord's."],
      ["Genesis 1:26", "This verse speaks of humans being made in God's image with dominion."],
      ["Exodus 20:8", "This verse commands keeping the Sabbath day."],
      ["Leviticus 25:4", "This verse speaks of the Sabbath year of rest for the land."],
    ],
    answer: "A",
    hints: ["It is in the book of songs and prayers."],
    explanation: "**Psalm 24:1** says that the earth and all in it belong to the Lord.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do most Jewish and Christian writers on the environment understand the word dominion in the first creation account in Genesis?",
    options: [
      ["As responsible care, like that of a good ruler", "Correct: dominion is understood as stewardship."],
      ["As permission to destroy any living thing", "Most writers reject this reading."],
      ["As a command to avoid touching the land at all", "Humans are told to work and care for the garden."],
      ["As a duty owed only to the ancestors of the family", "Dominion in Genesis is given by God."],
    ],
    answer: "A",
    explanation: "Many understand dominion as **stewardship**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does Leviticus 25 command for the land every seventh year?",
    options: [
      ["It is to have a Sabbath of rest", "Correct: it is not sown or harvested in the usual way."],
      ["It is to be planted twice as heavily as in other years", "The land rests."],
      ["It is to be sold and bought freely by anyone", "The chapter says the land belongs to God."],
      ["It is to be burned to remove the old vegetation", "No such command is given."],
    ],
    answer: "A",
    explanation: "Leviticus 25 commands a **Sabbath year** of rest for the land.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "A Muslim family in Harare puts a basin in the courtyard to save water when washing before prayer. Which teaching does this best show?",
    options: [
      ["The earth is a trust, so resources must not be wasted", "Correct: it reflects amanah and the duty to avoid waste."],
      ["The earth belongs to the chief to give out as he chooses", "That is an IR idea about land allocation."],
      ["The land must rest in the seventh year in Muslim law", "That is a Jewish teaching in Leviticus 25."],
      ["The ancestors must be asked before any water is drawn", "That is an IR idea."],
    ],
    answer: "A",
    hints: ["Which Muslim term means a trust?"],
    explanation: "This reflects **amanah** and the teaching against waste (Qur'an 7:31).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which similarity is common to the teachings of IR, Judaism, Christianity and Islam on the environment?",
    options: [
      ["Humans are accountable for how they treat creation", "Correct: all four teach responsibility."],
      ["Humans own the earth outright and may use it as they please", "All four reject unlimited ownership."],
      ["Humans must not use any natural resource at all", "None teaches complete non-use."],
      ["Humans answer only to the government of their own country", "Each teaches accountability to God or the ancestors."],
    ],
    answer: "A",
    hints: ["Think about the idea of answering to God or the ancestors."],
    explanation: "All four teach that **humans are accountable** for how they treat creation.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about religious teachings on the environment is best supported by the comparison?",
    options: [
      ["The religions use different sources and words but share a duty of care", "Correct: differences in expression, similarity in aim."],
      ["The religions teach opposite things about the earth in every respect", "They share the duty of care."],
      ["Only one religion has any teaching about the natural world", "All four have teachings."],
      ["The religions agree that creation has no value apart from human use", "They teach that creation has value to God."],
    ],
    answer: "A",
    hints: ["Choose the answer that recognises both differences and similarities."],
    explanation: "The religions differ in **language and sources** but share a **duty of care**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Indigenous Religion, the land is believed to belong to God and the ancestors.",
    answer: true,
    explanation: "True. The chief allocates land, but it is held in trust under God and the ancestors.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Genesis 2:15 says that the first man was placed in the garden to cultivate it and look after it.",
    answer: true,
    explanation: "True. This verse is often quoted to teach stewardship.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term or reference with its meaning.",
    pairs: [
      ["Khalifah", "A deputy of God on earth, in Islam"],
      ["Amanah", "A trust, such as the earth"],
      ["Leviticus 25", "A Sabbath year of rest for the land"],
      ["Mutupo / isibongo", "A totem that a clan may not harm"],
    ],
    explanation: "Khalifah and amanah are Muslim terms; Leviticus 25 is the Sabbath year; the totem protects species.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Jews and Christians quote Psalm {{blank:a}} to teach that the earth is the Lord's; Muslims quote Qur'an {{blank:b}} to warn about corruption on land and sea.",
    blanks: [
      { id: "a", accepted: ["24:1"], choices: ["1:1", "24:1", "104:1", "150:1"] },
      { id: "b", accepted: ["30:41"], choices: ["1:1", "6:165", "30:41", "112:1"] },
    ],
    hints: ["Qur'an 6:165 is about humans as successors, not about corruption."],
    explanation: "**Psalm 24:1** and **Qur'an 30:41**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Arabic word for a trust, used for the earth in Muslim teaching?",
    accepted: ["amanah", "amana"],
    wrong: ["khalifah", "zakat"],
    explanation: "The earth is an **amanah** (trust).",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which Indigenous Religion protects the environment.",
    points: ["Sacred places such as forests, hills and pools", "Taboos on harming certain trees or animals", "Totems that protect species, and rest days (chisi)"],
    modelAnswer: "Indigenous Religion protects the environment through sacred places such as forests, hills and pools, through taboos on harming certain trees or animals, and through totems and rest days (chisi).",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain what Jews and Christians mean by stewardship of the earth.",
    points: [
      ["The earth belongs to God (Psalm 24:1)", 1],
      ["Humans are made in God's image and given dominion (Genesis 1:26-28)", 1],
      ["Dominion means responsible care, like that of a good ruler, and not destruction", 1],
      ["Humans are placed to cultivate and look after the garden (Genesis 2:15) and must answer to God", 1],
    ],
    modelAnswer: "Stewardship means that the earth belongs to God (Psalm 24:1) and humans are given dominion (Genesis 1:26-28). Dominion means responsible care, like that of a good ruler, not destruction. Humans are placed to cultivate and look after the garden (Genesis 2:15), and they must answer to God for how they treat it.",
    hints: ["Use Psalm 24:1, Genesis 1:26-28 and Genesis 2:15."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which religious teachings could help people to care for the environment.",
    points: [
      ["They give a reason for care: the earth belongs to God or is a trust", 1],
      ["Developed: believers feel accountable to God or the ancestors, so they avoid waste and destruction", 2],
      ["They provide rules and practices", 1],
      ["Developed: taboos, the Sabbath year or teachings against waste turn belief into daily habits that protect land, water and species", 2],
    ],
    modelAnswer: "Religious teachings give a reason for care: the earth belongs to God or is a trust. Believers feel accountable to God or the ancestors, so they avoid waste and destruction. Religions also provide rules and practices. Taboos, the Sabbath year or teachings against waste turn belief into daily habits that protect land, water and species.",
    hints: ["Think about motive and about rules or practices."],
    explanation: "Two ways, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school environment club newsletter in Hwange, 2026",
      "Our club has students from many faiths. Yusuf said that in Islam people are trustees of the earth and should not waste. David said that his tradition teaches the land should rest every seventh year. Nokuthula said that in her family the old forest near the pool is sacred, and no one cuts trees there. We agreed that we all believe the earth should be cared for."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which teaching does David mention in Source A?",
        options: [
          ["The land should rest every seventh year", "Correct: this is the Sabbath year of Leviticus 25."],
          ["Humans are trustees who should not waste", "That is Yusuf's point."],
          ["The old forest near the pool is sacred", "That is Nokuthula's point."],
          ["The earth should not be cared for", "The source says the opposite."],
        ],
        answer: "A", explanation: "David refers to the Sabbath year for the land.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** religious ideas about the environment.",
        points: ["Humans are trustees of the earth and should not waste (Islam)", "The land should rest every seventh year (Judaism)", "A sacred forest where no one cuts trees (Indigenous Religion)"],
        modelAnswer: "Humans are trustees of the earth and should not waste (Islam); the land should rest every seventh year (Judaism); and a sacred forest near the pool is protected (Indigenous Religion).",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain what the students mean when they agree that all of them believe the earth should be cared for.",
        points: [["The religions use different words and sources", 1], ["They share the belief that humans are accountable for creation", 1], ["They can therefore work together in the club", 1]],
        modelAnswer: "The religions use different words and sources, but they share the belief that humans are accountable for creation. They can therefore work together in the club.",
      }),
    ],
    hints: ["In (c) mention the difference in wording and the shared belief."],
    explanation: "The source shows three religious ideas and a shared concern.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Tendai says: \"Religious teaching on the environment is mostly about rules for the past; it does not help with modern problems.\" Rudo says: \"The teachings give reasons and values that are still strong today.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** Muslim teachings about the environment.",
        points: [["Humans are God's khalifah on earth (Qur'an 2:30; 6:165)", 1], ["The earth is a trust (amanah) for which people are accountable", 1], ["Qur'an 30:41 links corruption on land and sea to human actions", 1], ["Muslims should avoid waste (Qur'an 7:31)", 1]],
        modelAnswer: "Muslims believe that humans are God's khalifah on earth and that the earth is a trust (amanah) for which people are accountable.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which the Sabbath year in Leviticus 25 shows concern for the land.",
        points: [["The land is to rest every seventh year and is not sown or harvested in the usual way", 1], ["Developed: this gives the soil time to recover and shows that land is not only a resource to be used", 1], ["The poor and wild animals may eat what grows", 1], ["Developed: this shares the land's produce and shows care for creatures and people", 1]],
        modelAnswer: "The land is to rest every seventh year and is not sown or harvested in the usual way. This gives the soil time to recover and shows that land is not only a resource to be used without pause.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that religious teachings on the environment are relevant to the problems of today.",
        points: [["For: they give reasons for care (creation belongs to God, a trust, sacred land) which motivate believers", 2], ["For: they have inspired practical action such as tree planting, protecting sacred places and reducing waste", 2], ["Against or limits: teachings were given for earlier societies and are not detailed about modern problems like pollution; not all believers follow them", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Religious teachings give powerful reasons to care for the earth: that it belongs to God, that it is a trust, or that the land is sacred. These reasons motivate believers and inspire practical action such as tree planting, protecting sacred places and reducing waste. However, the teachings were given in earlier societies and say little in detail about modern problems like plastic pollution or climate change, and not every believer follows them. I conclude that the teachings are relevant because they supply values and motivation, provided that believers apply them with modern knowledge.",
      }),
    ],
    hints: ["Consider values and motivation against detail and practice."],
    explanation: "A strong answer weighs the motivating power of teachings against their limits, using examples from more than one religion.",
  });

  b.card("DEFINITION", "What is **stewardship**?", "Caring responsibly for something that belongs to someone else; humans as caretakers of creation.");
  b.card("DEFINITION", "What is **dominion** in Genesis 1:26-28?", "Humanity's rule over other living things, understood by many Jews and Christians as responsible care.");
  b.card("DEFINITION", "What is a **khalifah**?", "A deputy of God on earth; Muslims believe humans are khalifah and must look after the earth.");
  b.card("DEFINITION", "What is **amanah**?", "A trust; Muslims teach that the earth is a trust from God.");
  b.card("FACT", "Which verse teaches that the earth belongs to the Lord?", "Psalm 24:1.");
  b.card("FACT", "What does Leviticus 25 command?", "A Sabbath year of rest for the land every seventh year.");
  b.card("FACT", "Which Qur'an verses are quoted on humans as successors and on corruption?", "Qur'an 6:165 (successors on earth) and 30:41 (corruption on land and sea).");
  b.card("CONCEPT", "How does IR teach care for the environment?", "The land belongs to God and the ancestors; sacred places, taboos, totems and rest days protect it.");
  b.card("CONCEPT", "Name one similarity and one difference in the religions' environmental teaching.", "Similarity: humans are accountable. Difference: different sources and terms (ancestors, dominion/stewardship, khalifah/amanah).");
});
