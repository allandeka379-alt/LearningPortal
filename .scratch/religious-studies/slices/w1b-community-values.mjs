// W1b: Family values, community values and Indigenous Religion.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.family.community-values", { file: "family/community-values", keyPrefix: "family.community-values" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **nhimbe** (Shona) or **ilima** (Ndebele)?",
    options: [
      ["A work party in which neighbours help one another with a big task", "Correct: workers are given food and drink."],
      ["A ceremony in which a spirit is brought home a year after a person has died", "That is kurova guva or umbuyiso."],
      ["A payment made by the family of the groom to the family of the bride", "That is roora or lobola."],
      ["A meeting of elders and the chief to settle a dispute between two villages", "That is held at the dare or inkundla."],
    ],
    answer: "A",
    explanation: "Nhimbe/ilima is a work party that shows cooperation, reciprocity and hospitality.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which example shows **collective responsibility** for children?",
    options: [
      ["A neighbour corrects a child who misbehaves and helps a child whose parents have died", "Correct: the community shares responsibility for the children."],
      ["A father refuses to let anyone but himself speak to or help his own children", "That denies the shared responsibility."],
      ["A teacher is the only person in the village who may advise young people", "Collective responsibility involves many adults, not only one."],
      ["A chief collects a tax from each family and uses it to build a house for himself", "That is not responsibility for children."],
    ],
    answer: "A",
    explanation: "In collective responsibility any adult may guide a child, and the community cares for orphans.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which family value is shown when a child greets visiting elders politely and listens to them?",
    options: [
      ["Respect", "Correct: respect for elders is shown in greeting and listening."],
      ["Chastity", "Chastity concerns respect for one's body and for marriage."],
      ["Hard work", "Hard work concerns helping in the home or field."],
      ["Honesty", "Honesty concerns telling the truth and keeping promises."],
    ],
    answer: "A",
    explanation: "Greeting and listening to elders are everyday signs of respect.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do shared rituals such as rain ceremonies support community values?",
    options: [
      ["They bring people together and remind them that they depend on one another", "Correct: everyone contributes and everyone benefits."],
      ["They allow the richest families to decide when the rains will begin in the area", "Rituals do not give wealthy families such a role."],
      ["They replace the need for neighbours to cooperate in farming or help each other", "Rituals encourage cooperation; they do not replace it."],
      ["They are held in secret so that no outsider can learn which families took part", "Community rituals are shared and public in many places."],
    ],
    answer: "A",
    explanation: "Community rituals involve everyone and remind people of their shared dependence on the land and one another.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After a family's father dies, neighbours bring food, a cousin pays part of the school fees and the village head asks the community to look after the children. Which community value is mainly shown?",
    options: [
      ["Care for the vulnerable", "Correct: the community supports the bereaved children."],
      ["Chastity before marriage for young people in the village", "The example is not about chastity."],
      ["Obedience of children to the instructions of the elders in all matters", "The example is about care, not obedience."],
      ["Competition between families to see which can give the largest gift", "The example shows support, not competition."],
    ],
    answer: "A",
    explanation: "Orphans and widows are cared for by relatives and neighbours, which shows care for the vulnerable.",
    hints: ["Who is being helped, and how?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which pair correctly links a religion with a source for love of neighbour?",
    options: [
      ["Christianity: Mark 12:28-31", "Correct: Jesus summarises the law as love of God and neighbour."],
      ["Islam: Leviticus 19:18", "Leviticus is part of the Torah and the Bible, not a Muslim scripture."],
      ["Judaism: Qur'an 4:36", "The Qur'an is the Muslim scripture."],
      ["Indigenous Religion: Luke 10:25-37", "Luke is a Christian gospel, not an IR source."],
    ],
    answer: "A",
    explanation: "Judaism (and Christianity) cite Leviticus 19:18; Christians cite Mark 12:28-31 and Luke 10:25-37; Muslims cite Qur'an 4:36 for good treatment of relatives, orphans, the poor and neighbours.",
    hints: ["Check which scripture belongs to each religion."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the fairest comment on the relationship between religion and community values?",
    options: [
      ["Several religions teach similar values, and communities often work together across them", "Correct: values such as honesty, care and respect are shared."],
      ["Only Indigenous Religion teaches cooperation, hospitality and care for the vulnerable", "Other religions teach these values too."],
      ["Religion has no effect on community values because values come only from the school", "Religion is one of the sources of values."],
      ["Values taught by different religions always contradict one another in every respect", "Many values overlap."],
    ],
    answer: "A",
    explanation: "A balanced answer notes the overlap between religions and gives examples of cooperation across faiths.",
    hints: ["Avoid 'only', 'always' and 'no effect'."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In a nhimbe, the host family provides food and drink to the people who help.",
    answer: true,
    explanation: "True. Hospitality is part of the work party.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Zakat in Islam and tzedakah in Judaism are both ways of giving to people in need.",
    answer: true,
    explanation: "True. Zakat is a pillar of Islam, and tzedakah is a duty of charity in Judaism.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each value with its example.",
    pairs: [["Hospitality", "offering water and food to a visitor"], ["Cooperation", "neighbours ploughing one another's fields in turn"], ["Honesty", "returning a lost phone to its owner"], ["Care for the vulnerable", "relatives supporting an orphaned child"]],
    explanation: "Each value is shown in an everyday action.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A work party is called {{blank:a}} in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["nhimbe"], choices: ["nhimbe", "roora", "mutupo", "bira"] },
      { id: "b", accepted: ["ilima"], choices: ["ilima", "lobola", "isibongo", "umbuyiso"] },
    ],
    explanation: "Nhimbe (Shona) and ilima (Ndebele).",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct reference.",
    template: "Jesus tells the parable of the Good Samaritan in {{blank:a}}.",
    blanks: [{ id: "a", accepted: [ref("Luke", 10, "25-37")], choices: [ref("Luke", 10, "25-37"), ref("Genesis", 12, "1-3"), ref("Qur'an", 17, 23), ref("Exodus", 20, 12)] }],
    explanation: "The parable of the Good Samaritan is in Luke 10:25-37. It teaches care for anyone in need.",
    hints: ["It is in one of the four gospels."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Jewish word means giving to those in need as a duty of charity?",
    accepted: ["tzedakah", "tzedaka", "tsedakah", "zedakah"],
    wrong: ["zakat"],
    explanation: "**Tzedakah** is the Jewish duty of charity. Zakat is the Muslim equivalent.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** values that families teach their children.",
    points: ["Respect for elders", "Sharing or love", "Honesty or hard work"],
    modelAnswer: "Respect for elders; sharing; honesty.",
    explanation: "One mark for each value.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the chief and the elders support community values.",
    points: [["They settle disputes and try to restore peace", 1], ["They lead or oversee shared ceremonies such as rain and harvest", 1], ["They advise on community problems at the dare or inkundla", 1], ["They protect the vulnerable and act within the Constitution and the law", 1]],
    modelAnswer: "Chiefs and elders settle disputes and try to restore peace, oversee shared ceremonies such as rain and harvest rituals, and give advice at the dare or inkundla. They also protect the vulnerable, always within the Constitution and the law.",
    hints: ["Think of disputes, ceremonies, advice and care."],
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why cooperation and care for the vulnerable are important in a community.",
    points: [
      ["Cooperation lets big tasks be done that one family cannot do alone", 1],
      ["Developed: in a work party many hands plough or harvest before the rains end, and the help is repaid in turn", 1],
      ["Cooperation builds trust and unity", 1],
      ["Developed: people who work together know and rely on one another, so disputes are fewer", 1],
      ["Care for the vulnerable protects those who cannot protect themselves", 1],
      ["Developed: orphans, widows and the sick receive food and shelter, so they are not left in poverty or danger", 1],
    ],
    modelAnswer: "Cooperation lets a community do big tasks that one family cannot do alone, such as ploughing or harvesting before the rains end, and the help is repaid in turn. It also builds trust, because people who work together rely on one another and have fewer disputes. Care for the vulnerable protects those who cannot protect themselves: orphans, widows and the sick receive food and shelter, so they are not left in poverty or danger.",
    hints: ["Give three reasons and develop each."],
    explanation: "Three developed reasons.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice in a fictional community newsletter, Masvingo, 2026",
      "The Mapfumo family lost their harvest in the hailstorm last month. Neighbours are invited to a work party on Saturday to help clear and replant their field. Please bring a hoe. The family of the late Mr Chuma, who has left three young children, will also be supported by a collection at the church, the mosque and the community hall."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which traditional practice is described in Source A?",
        options: [
          ["A work party (nhimbe/ilima)", "Correct: neighbours are invited to help in the field."],
          ["A bira in which the family thanks the ancestors for a good harvest", "No ceremony for the ancestors is mentioned."],
          ["An initiation school that prepares young people for adult life", "No initiation is mentioned."],
          ["A bride wealth payment between two families that are about to be joined", "No marriage is mentioned."],
        ],
        answer: "A", explanation: "The notice invites neighbours to a work party.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** ways in which the community helps the families in Source A.",
        points: ["Neighbours help to clear and replant the Mapfumo field", "People bring hoes to the work party", "A collection is taken at the church, mosque and community hall for the children of the late Mr Chuma"],
        modelAnswer: "Neighbours clear and replant the field; people bring hoes; a collection is taken for the Chuma children.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** values shown in Source A.",
        points: [["Cooperation: neighbours work together on the field", 2], ["Care for the vulnerable (and cooperation across religions): people from church, mosque and hall help the bereaved children", 2]],
        modelAnswer: "Cooperation is shown because neighbours work together to replant the field so that the family has a harvest. Care for the vulnerable is shown because people from the church, the mosque and the hall give to the children of the late Mr Chuma, which also shows people of different faiths working together.",
      }),
    ],
    hints: ["Name a value and say what in the source shows it."],
    explanation: "The source shows a work party and a multi-faith collection.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai says: \"Community values are weaker in towns than in villages.\" Chipo says: \"They have changed their form, but they are still strong.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** examples of community values.",
        points: [["Cooperation, such as work parties or burial societies", 2], ["Hospitality or care for the vulnerable", 2]],
        modelAnswer: "Cooperation, shown in work parties and burial societies; and care for the vulnerable, shown when relatives and neighbours support orphans and widows.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** ways in which community values appear in town life.",
        points: [["Burial societies and savings clubs support members in funerals and in hard times", 2], ["Religious communities, school committees and neighbours help the sick and the poor", 2]],
        modelAnswer: "Burial societies and savings clubs support members at funerals and in hard times. Religious communities, school committees and neighbours help the sick and the poor.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Assess whether community values are weaker today than in the past.",
        points: [["Weaker: individualism, migration, pressure of work and cost of living", 2], ["Not weaker: new forms, such as burial societies, WhatsApp groups and faith communities", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Some values have weakened: migration, long working hours and the cost of living make it harder to attend work parties or care for distant relatives. However, new forms of cooperation have appeared, such as burial societies, savings clubs, messaging groups and faith communities that support members. On balance, community values have changed in form more than they have disappeared.",
      }),
    ],
    hints: ["Give evidence of decline and of new forms of support."],
    explanation: "A balanced answer shows both weakening and adaptation.",
  });

  b.card("DEFINITION", "What is a **nhimbe / ilima**?", "A work party in which neighbours help one another with a big task and are given food and drink.");
  b.card("DEFINITION", "What is **collective responsibility**?", "The community shares responsibility for the well-being and behaviour of its members, especially children and the vulnerable.");
  b.card("FACT", "Name three family values.", "Respect, love, obedience, sharing, hard work, honesty, chastity (any three).");
  b.card("FACT", "Name three community values.", "Cooperation, hospitality, collective responsibility, care for the vulnerable, peaceful settlement of disputes.");
  b.card("FACT", "What is **tzedakah**?", "The Jewish duty of charity: giving to those in need.");
  b.card("FACT", "Which gospel reference tells the parable of the Good Samaritan?", "Luke 10:25-37.");
  b.card("FACT", "Which Qur'an reference teaches good treatment of relatives, orphans, the poor and neighbours?", "Qur'an 4:36.");
  b.card("CONCEPT", "How does IR support community values?", "Through the chief and elders, the village, shared rituals, taboos and the belief that the ancestors watch over the community.");
});
