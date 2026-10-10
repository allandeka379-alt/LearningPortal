// W2a: Jewish moral teaching.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.ethics", { file: "judaism/ethics", keyPrefix: "judaism.ethics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many commandments (mitzvot) does Jewish tradition count in the Torah?",
    options: [
      ["613", "Correct: traditionally 248 positive and 365 negative commandments."],
      ["10", "Ten is the number of the Ten Commandments, which are part of the 613."],
      ["248", "248 is the traditional number of positive commandments only."],
      ["365", "365 is the traditional number of negative commandments only."],
    ],
    answer: "A",
    explanation: "Jewish tradition counts **613 mitzvot** in the Torah.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word tzedakah mean in Jewish teaching?",
    options: [
      ["Charity, giving to those in need as a duty", "Correct: it comes from a word meaning righteousness or justice."],
      ["A prayer of praise said by mourners", "That is the kaddish."],
      ["The laws about which foods may be eaten", "That is kashrut."],
      ["The seven days of mourning for the dead", "That is shiva."],
    ],
    answer: "A",
    explanation: "**Tzedakah** is charity, understood as a duty linked to justice.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does pikuach nefesh teach?",
    options: [
      ["Saving life takes priority over almost every other commandment", "Correct: it overrides the Sabbath laws, for example."],
      ["The Sabbath laws may never be broken under any circumstances", "Pikuach nefesh allows the Sabbath to be broken to save a life."],
      ["Charity should be given only to members of the Jewish community", "Pikuach nefesh concerns saving life; Jewish teaching also calls for charity to all in need."],
      ["Only a rabbi may decide whether a sick person should be treated", "A doctor acts to save life without waiting."],
    ],
    answer: "A",
    explanation: "**Pikuach nefesh** (saving life) overrides almost all laws, except the prohibitions of murder, certain sexual offences and idolatry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the Torah tell the Israelites to treat strangers justly?",
    options: [
      ["Because the Israelites were strangers in Egypt and know how it feels", "Correct: the memory of slavery is the reason."],
      ["Because strangers have more religious knowledge than the Israelites", "The Torah does not give this reason."],
      ["Because the stranger can offer sacrifices in the Temple in the place of the priests", "This is not the reason given."],
      ["Because the laws of the surrounding nations require it", "The reason is the experience of Israel in Egypt."],
    ],
    answer: "A",
    explanation: "The Torah reminds the people that they were **strangers in Egypt**, so they must be fair to strangers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does tikkun olam mean?",
    options: [
      ["Repairing the world", "Correct: working to make the world more just and caring."],
      ["The world to come", "That is olam ha-ba."],
      ["The saving of a life", "That is pikuach nefesh."],
      ["Acts of kindness such as visiting the sick", "That is gemilut hasadim."],
    ],
    answer: "A",
    explanation: "**Tikkun olam** means \"repairing the world\", used today of social action.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo's neighbour, a Jewish shopkeeper, lends a young seller some money, teaches her to keep accounts and soon she no longer needs help. According to Maimonides' levels of giving, why is this a high level?",
    options: [
      ["It helps the person become self-supporting", "Correct: this is the highest level of tzedakah."],
      ["It is done in secret so that nobody knows who gave", "Giving in secret is also high but this example is about independence."],
      ["It gives a large sum of money at one time", "Size is not the test; independence is."],
      ["It is done only when the person asks for help", "Giving before being asked is higher."],
    ],
    answer: "A",
    hints: ["Think of the saying: teach a person to fish."],
    explanation: "Maimonides ranked **helping a person become self-supporting** as the highest form of tzedakah.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An Orthodox Jewish doctor is called to the hospital on Shabbat to treat a seriously injured child. Which Jewish principle explains why he goes?",
    options: [
      ["Pikuach nefesh, the saving of life", "Correct: it permits breaking Sabbath rules to save a life."],
      ["Kashrut, the dietary laws", "Kashrut concerns food."],
      ["Tikkun olam only, which forbids all work on the Sabbath", "Tikkun olam is not a Sabbath rule."],
      ["Brit milah, the covenant of circumcision", "That concerns circumcision."],
    ],
    answer: "A",
    hints: ["Which principle ranks life above the Sabbath laws?"],
    explanation: "**Pikuach nefesh** allows and requires work on the Sabbath to save life.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What do the prophets Amos and Micah teach about the relationship between worship and justice?",
    options: [
      ["Worship means little if the poor are treated unfairly", "Correct: the prophets link faith and ethics."],
      ["Worship in the Temple is more important than justice in daily life", "The prophets teach the opposite."],
      ["Only priests are required to practise justice", "Justice is for every person."],
      ["Justice and worship have no relationship in the Torah", "The prophets show a close relationship."],
    ],
    answer: "A",
    hints: ["Remember Micah 6:8 and Amos 5."],
    explanation: "Amos 5 and Micah 6:8 teach that God wants **justice and kindness** more than ritual without them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The command to love your neighbour as yourself is found in the Book of Leviticus.",
    answer: true,
    explanation: "True. Leviticus 19:18 is the commandment of love of neighbour.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Judaism, helping the poor is seen as optional kindness, not a duty.",
    answer: false,
    explanation: "False. Tzedakah is a duty linked to justice (Leviticus 19:9-10; Deuteronomy 15).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each Hebrew term with its meaning.",
    pairs: [["Tzedek", "justice"], ["Tzedakah", "charity as a duty"], ["Gemilut hasadim", "acts of loving-kindness"], ["Pikuach nefesh", "saving a human life"]],
    explanation: "Tzedek: justice. Tzedakah: charity. Gemilut hasadim: loving-kindness. Pikuach nefesh: saving life.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each scripture reference with its teaching.",
    pairs: [["Leviticus 19:18", "love your neighbour as yourself"], ["Leviticus 19:34", "treat the stranger as a native"], ["Micah 6:8", "act justly, love kindness, walk humbly with God"], ["Exodus 20:12", "honour your father and mother"]],
    hints: ["Think of the chapter you studied in Leviticus 19."],
    explanation: "Leviticus 19:18 (neighbour), 19:34 (stranger), Micah 6:8 (what God requires), Exodus 20:12 (parents).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Torah contains {{blank:a}} commandments, of which {{blank:b}} are positive and the rest are negative in the traditional count.",
    blanks: [
      { id: "a", accepted: ["613"], choices: ["10", "248", "365", "613"] },
      { id: "b", accepted: ["248"], choices: ["10", "248", "365", "613"] },
    ],
    explanation: "Traditionally 613 in all: 248 positive and 365 negative.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The prophet {{blank:a}} summed up what God requires: to act justly, love kindness and walk humbly. The reference is Micah {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Micah"], choices: ["Micah", "Moses", "Joshua", "Esther"] },
      { id: "b", accepted: ["6:8"], choices: ["1:1", "6:8", "19:18", "20:12"] },
    ],
    hints: ["The question names the book in its second blank."],
    explanation: "**Micah 6:8** is a famous summary of Jewish ethics.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to acts of loving-kindness such as visiting the sick?",
    accepted: ["gemilut hasadim", "gemilut chasadim", "gemilut hasidim", "gemilut chasidim"],
    wrong: ["tzedakah", "kashrut"],
    explanation: "Acts of loving-kindness are called **gemilut hasadim**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which the Torah teaches care for the poor.",
    points: ["Leave the edges of the field and dropped grain for the poor (Leviticus 19:9-10)", "Open your hand to needy neighbours (Deuteronomy 15)", "Pay workers fairly and on time (Deuteronomy 24)"],
    modelAnswer: "The Torah tells farmers to leave the edges of the field and dropped grain for the poor, tells people to open their hand to a needy neighbour, and requires employers to pay workers fairly and on time.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the Jewish teaching on the sanctity of life (pikuach nefesh).",
    points: [
      ["Every human life is of great value because people are made in God's image (Genesis 1)", 1],
      ["Saving life overrides almost all other commandments", 1],
      ["For example, a doctor may treat a patient on the Sabbath or a sick person may eat on Yom Kippur", 1],
      ["The exceptions are murder, certain sexual offences and idolatry", 1],
    ],
    modelAnswer: "Jews believe every human life is of great value because people are made in God's image. The law of pikuach nefesh says that saving life overrides almost all other commandments, so a doctor may treat a patient on the Sabbath. The exceptions are murder, certain sexual offences and idolatry.",
    hints: ["Give the belief, the rule, an example and the exceptions."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which the experience of slavery in Egypt shapes Jewish moral teaching.",
    points: [
      ["It leads to the command to love the stranger (Leviticus 19:34)", 1],
      ["Developed: because Israel was once a stranger and a slave, Jews must protect foreigners and the weak", 2],
      ["It shapes the rest of the Sabbath (Deuteronomy 5)", 1],
      ["Developed: all in the household, including servants, rest, since rest is a sign of freedom and equality", 2],
    ],
    modelAnswer: "The experience of slavery leads to the command to love the stranger. Because Israel was once a stranger and a slave, Jews must protect foreigners and the weak. It also shapes the Sabbath, since in Deuteronomy 5 all in the household, including servants, rest, as rest is a sign of freedom and equality.",
    hints: ["Choose two teachings (stranger, Sabbath, fair treatment of workers) and explain how Egypt is the reason."],
    explanation: "Two ways, each stated (1) and developed (2 across the way).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newsletter of a Jewish congregation in Harare, 2026",
      "This month our tzedakah fund bought school uniforms for twenty children. Our young people visited the sick at the clinic, and a group baked bread for an old people's home. One of our doctors was called out last Shabbat to treat a child in an emergency; we are proud of him. As the prophet says, we are asked to act justly, to love kindness and to walk humbly with God."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which Hebrew term describes the visiting of the sick in Source A?",
        options: [
          ["Gemilut hasadim", "Correct: acts of loving-kindness."],
          ["Kashrut", "Kashrut concerns food."],
          ["Pikuach nefesh", "That is the saving of life."],
          ["Shechitah", "That is the method of kosher slaughter."],
        ],
        answer: "A", explanation: "Visiting the sick is an act of loving-kindness.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** examples of Jewish moral teaching in practice.",
        points: ["Giving charity (tzedakah) to buy school uniforms", "Visiting the sick and baking bread for the elderly (loving-kindness)", "A doctor treating a child on Shabbat (saving life)"],
        modelAnswer: "The congregation gave charity to buy school uniforms; its young people visited the sick and baked bread for the elderly; and a doctor treated a child on Shabbat to save life.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the doctor's action on Shabbat is consistent with Jewish law.",
        points: [["Pikuach nefesh, saving life, overrides almost all other laws", 1], ["The Sabbath laws may therefore be set aside to treat the child", 1], ["Every life has great value because humans are made in God's image", 1]],
        modelAnswer: "The principle of pikuach nefesh says that saving life overrides almost all other laws, so the Sabbath laws may be set aside to treat the child. Jews believe every life has great value because humans are made in God's image.",
      }),
    ],
    hints: ["In (c) name the principle and explain the reason."],
    explanation: "The source gives examples of tzedakah, gemilut hasadim and pikuach nefesh.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Tafadzwa says: \"Jewish moral teaching is only for Jews.\" Miriam says: \"It is about how to live well in a shared world, and others can learn from it.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** teachings of the Ten Commandments about relationships with other people.",
        points: [["Honour your father and mother", 1], ["Do not murder", 1], ["Do not steal or give false testimony", 1], ["Do not commit adultery or covet", 1]],
        modelAnswer: "The commandments teach that people should honour their father and mother, and that they must not murder, steal, give false testimony, commit adultery or covet.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain what Jews mean by tikkun olam.",
        points: [["It means repairing the world", 1], ["Human beings, working with God, are responsible for making the world more just and caring", 1], ["Many Jews, especially in Reform and Conservative movements, apply it to social action on poverty, education and the environment", 2]],
        modelAnswer: "Tikkun olam means repairing the world. It teaches that human beings, working with God, are responsible for making the world more just and caring. Many Jews, especially in Reform and Conservative movements, apply it to social action on poverty, education and the environment.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Jewish moral teaching is relevant to people of all faiths and none.",
        points: [["For: many principles are shared, such as justice, honesty, care for the poor, love of neighbour and the sanctity of life", 2], ["For: the teaching on strangers and refugees and on fair wages addresses issues in every country", 2], ["Against or limits: some teachings are tied to Jewish law, such as the Sabbath and the food laws, and apply to Jews as members of the covenant", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Many principles of Jewish moral teaching are shared with other religions and with people who have no faith: justice, honesty, care for the poor, love of neighbour and the value of life. Teachings on strangers and fair wages speak to problems in every country. Some rules, however, such as the Sabbath and food laws, are part of the covenant and apply to Jews as such. I conclude that the ethical core is relevant to everyone, while the ritual laws belong to the Jewish community.",
      }),
    ],
    hints: ["Separate the ethical teachings from the ritual laws in your answer."],
    explanation: "A strong answer distinguishes ethics from ritual and judges how far each applies beyond Judaism.",
  });

  b.card("FACT", "How many mitzvot does Jewish tradition count?", "613 (248 positive, 365 negative).");
  b.card("DEFINITION", "What is **tzedakah**?", "Charity, a duty to give to those in need, linked to justice.");
  b.card("DEFINITION", "What is **gemilut hasadim**?", "Acts of loving-kindness, such as visiting the sick and comforting mourners.");
  b.card("DEFINITION", "What is **pikuach nefesh**?", "Saving a human life, which overrides almost all other laws, including the Sabbath.");
  b.card("DEFINITION", "What is **tikkun olam**?", "Repairing the world: working with God to make the world more just and caring.");
  b.card("FACT", "Which verses command love of neighbour and of the stranger?", "Leviticus 19:18 (neighbour) and Leviticus 19:34 (stranger).");
  b.card("FACT", "What is Maimonides' highest level of giving?", "Helping a person become self-supporting.");
  b.card("FACT", "What does Micah 6:8 say God requires?", "To act justly, to love kindness and to walk humbly with God.");
  b.card("CONCEPT", "Why does the memory of Egypt matter for Jewish ethics?", "Israel was once a slave and a stranger, so it must treat strangers, workers and the poor fairly.");
});
