// W2a: The synagogue, worship and Jewish leaders.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.worship-practitioners", { file: "judaism/worship-practitioners", keyPrefix: "judaism.worship-practitioners" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which direction do Jews face when they pray in a synagogue?",
    options: [
      ["Towards Jerusalem", "Correct: the ark is placed on the wall that faces Jerusalem."],
      ["Towards the rising sun", "Direction of the sun is not the Jewish direction of prayer."],
      ["Towards the west gate", "The direction is Jerusalem, not a gate."],
      ["Towards the mountain of Sinai", "Jews face Jerusalem."],
    ],
    answer: "A",
    explanation: "Jews pray facing **Jerusalem**. The ark in a synagogue is on the wall that faces that direction.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the ner tamid in a synagogue?",
    options: [
      ["A lamp that is always lit above the ark", "Correct: it recalls the lamp in the Temple."],
      ["A seven-branched lamp-stand used at festivals", "That is the menorah."],
      ["A platform from which the Torah is read", "That is the bimah."],
      ["A cap worn by Jewish men during prayer", "That is the kippah."],
    ],
    answer: "A",
    explanation: "The **ner tamid** (eternal light) hangs above the ark and recalls the constant presence of God and the lamp in the Temple.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the role of a rabbi?",
    options: [
      ["A teacher and leader who interprets Jewish law", "Correct: a rabbi is a teacher, not a priest."],
      ["A priest who offers sacrifices on the altar", "Sacrifices ended with the Temple; a rabbi is not a priest."],
      ["A singer who leads the chanting of the prayers", "That describes a cantor."],
      ["A scribe who writes the Torah scrolls by hand", "That describes a sofer."],
    ],
    answer: "A",
    explanation: "A **rabbi** (\"my teacher\") teaches, advises and leads. The cantor (hazzan) sings; the scribe (sofer) writes scrolls.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of tefillin?",
    options: [
      ["They carry Shema verses, bound to the arm and head", "Correct: the verses are bound as a sign."],
      ["They are lamps that the family lights on Friday evening at the Sabbath", "Those are Sabbath candles."],
      ["They are the fringes sewn on the corners of a prayer shawl", "Those fringes are tzitzit."],
      ["They are cases with the Shema fixed to the doorposts of the home", "Those are mezuzot."],
    ],
    answer: "A",
    explanation: "**Tefillin** are small leather boxes containing verses including the Shema, worn on the arm and head at weekday morning prayer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a minyan?",
    options: [
      ["The group of ten adults needed for certain prayers", "Correct: a minyan allows communal prayers to be said."],
      ["A set of three prayers said morning, afternoon and evening", "Those are shacharit, minchah and maariv."],
      ["A small group of priests who serve in the synagogue", "A minyan is a quorum of worshippers, not priests."],
      ["A teacher who prepares children for the bar mitzvah", "That is a teacher; a minyan is a quorum."],
    ],
    answer: "A",
    explanation: "A **minyan** is ten adults. Orthodox Jews count only men; many Conservative and Reform congregations count women too.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tafadzwa visits a synagogue as a guest and sees men and women sitting in separate areas, a male rabbi and a service entirely in Hebrew. Which group is the congregation most likely to belong to?",
    options: [
      ["Orthodox Judaism", "Correct: these are typical of Orthodox practice."],
      ["Reform Judaism", "Reform synagogues usually have mixed seating and some local language."],
      ["The Lemba tradition", "The Lemba are a people, not a synagogue movement described here."],
      ["Christianity", "The question describes a synagogue, a Jewish place of worship."],
    ],
    answer: "A",
    hints: ["Think of separate seating and the language of the service."],
    explanation: "Separate seating, a male rabbi and a Hebrew service are features of **Orthodox** synagogues. The answer should say \"most likely\", since practice varies.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why the synagogue became so important after 70 CE?",
    options: [
      ["With the Temple gone, Jews kept their faith through prayer, study and community in the synagogue", "Correct: the synagogue carried on worship without sacrifice."],
      ["Sacrifices were moved from the Temple to the synagogue, where priests continued to offer them after 70 CE", "Sacrifice ended with the Temple."],
      ["The Romans ordered every Jewish community to build a synagogue", "The synagogue developed through Jewish practice, not Roman orders."],
      ["The synagogue replaced the Torah as the main holy object of Jews", "The Torah remains central; the synagogue houses it."],
    ],
    answer: "A",
    hints: ["Ask what Jews could still do without the Temple."],
    explanation: "After the Temple fell, **prayer, study and community** in the synagogue replaced Temple sacrifice as the centre of Jewish worship.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which comparison of Orthodox and Reform synagogues is accurate?",
    options: [
      ["Many Reform synagogues have women rabbis and mixed seating; Orthodox synagogues have men as rabbis", "Correct: this states the typical difference without ranking."],
      ["Reform synagogues have no daily prayers at all, while Orthodox synagogues have prayers three times a day", "Reform Jews also pray; they differ in some practices."],
      ["Only Orthodox Jews believe in one God and only Reform Jews study the Torah", "Both believe in one God and study the Torah."],
      ["Orthodox synagogues allow images of God, while Reform synagogues do not", "No synagogue has images of God."],
    ],
    answer: "A",
    hints: ["The differences are in practice such as seating and who may be a rabbi."],
    explanation: "Many **Reform** and Conservative synagogues ordain women and have mixed seating; **Orthodox** synagogues have male rabbis and separate seating. All Jews believe in one God.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A rabbi is a priest who offers sacrifices.",
    answer: false,
    explanation: "False. A rabbi is a teacher and leader. The Jewish priests (kohanim) served in the Temple.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A synagogue has no statues or pictures of God, because Jews teach that God has no body.",
    answer: true,
    explanation: "True. Jews do not represent God in images.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its use or meaning.",
    pairs: [["Kippah", "a cap worn as a sign of respect for God"], ["Tallit", "a prayer shawl with fringes"], ["Bimah", "the platform where the Torah is read"], ["Siddur", "the daily prayer book"]],
    explanation: "Kippah: cap. Tallit: prayer shawl with tzitzit. Bimah: reading platform. Siddur: prayer book.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Torah scrolls are kept in the {{blank:a}}, and the reading is done from the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["ark"], choices: ["ark", "bimah", "mezuzah", "kippah"] },
      { id: "b", accepted: ["bimah"], choices: ["bimah", "ark", "siddur", "menorah"] },
    ],
    explanation: "Scrolls are kept in the **ark** and read at the **bimah**.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Traditional Jews pray three times a day: {{blank:a}} in the morning, minchah in the afternoon and {{blank:b}} in the evening.",
    blanks: [
      { id: "a", accepted: ["shacharit"], choices: ["shacharit", "maariv", "kaddish", "havdalah"] },
      { id: "b", accepted: ["maariv"], choices: ["maariv", "shacharit", "kiddush", "seder"] },
    ],
    hints: ["Maariv means evening."],
    explanation: "**Shacharit** (morning), **minchah** (afternoon), **maariv** (evening).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Hebrew name for the prayer shawl with fringes at its corners.",
    accepted: ["tallit", "talit", "tallith", "the tallit"],
    wrong: ["kippah", "yad"],
    explanation: "The **tallit** has fringes (tzitzit) in obedience to Numbers 15:37-41.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** features of a synagogue and state one use of each.",
    points: ["Ark: holds the Torah scrolls", "Bimah: the platform where the Torah is read", "Ner tamid: the lamp always lit above the ark (or menorah, separate seating)"],
    modelAnswer: "The ark holds the Torah scrolls; the bimah is the platform from which the Torah is read; the ner tamid is the lamp always lit above the ark.",
    explanation: "One mark for each feature with its use.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the clothing worn by Jews at morning prayer and what it means.",
    points: [
      ["Kippah: a cap, a sign of respect for God", 1],
      ["Tallit: a prayer shawl whose fringes remind Jews of the commandments (Numbers 15)", 1],
      ["Tefillin: leather boxes with Shema verses, bound to the arm and head", 1],
      ["They express obedience to scripture and love of God", 1],
    ],
    modelAnswer: "Jews wear a kippah, a cap that shows respect for God, and a tallit, a prayer shawl whose fringes remind them of the commandments. They also wear tefillin, leather boxes containing verses from the Torah, bound to the arm and head. These items express obedience to scripture and love of God.",
    hints: ["Name each item, say what it is, and give its meaning."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why the synagogue is important to Jewish communities.",
    points: [
      ["It is a place of communal prayer, including prayers that need a minyan", 1],
      ["Developed: praying together strengthens the community and keeps the daily pattern of worship", 2],
      ["It is a place of study and teaching for children and adults", 1],
      ["Developed: this passes on the Torah and Hebrew to the next generation and keeps Jewish identity, especially in the diaspora", 2],
    ],
    modelAnswer: "The synagogue is a place of communal prayer, including prayers that need a minyan, and praying together strengthens the community and keeps the daily pattern of worship. It is also a place of study and teaching, which passes on the Torah and Hebrew to the next generation and keeps Jewish identity, especially in the diaspora.",
    hints: ["Choose prayer and study (or community) and develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a description of a Shabbat morning service in a fictional synagogue in Mutare, 2026 (described in words)",
      "The congregation faces the wall with the ark. A light burns above it. The rabbi welcomes the community and the cantor chants the opening prayers. Men and women sit in separate sections. The Torah scroll is carried to the reading desk, and the reader follows the text with a pointer. Some men wear a prayer shawl and a small cap.",
      { described: true }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which feature in Source A is the ner tamid?",
        options: [
          ["The light that burns above the ark", "Correct: it is always lit."],
          ["The pointer used to follow the text", "That is the yad."],
          ["The small cap worn by some men", "That is the kippah."],
          ["The reading desk at which the Torah is read", "That is the bimah."],
        ],
        answer: "A", explanation: "The ner tamid is the lamp above the ark.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** people or objects used in the service and say what each does.",
        points: ["The rabbi welcomes and teaches", "The cantor chants the prayers", "The Torah scroll is read from, using a pointer (yad)"],
        modelAnswer: "The rabbi welcomes and teaches; the cantor chants the prayers; the Torah scroll is carried to the reading desk and read with a pointer (yad).",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why men and women sit in separate sections in this synagogue, and say what other Jewish groups do.",
        points: [["Orthodox tradition teaches separate seating, a custom kept in many synagogues", 1], ["Reform and many Conservative synagogues have mixed seating", 1], ["Jewish groups differ and none is ranked above another in a Religious Studies answer", 1]],
        modelAnswer: "Orthodox tradition teaches separate seating, and this custom is kept in many synagogues. Reform and many Conservative synagogues have mixed seating. Jewish groups differ in practice.",
      }),
    ],
    hints: ["In (c) say that practice varies between groups."],
    explanation: "The source shows the ark, the lamp, the leaders and the Torah reading.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nyasha says: \"The synagogue is the most important place of Jewish worship.\" Her friend Rachel says: \"The home is just as important as the synagogue.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe **two** ways in which Jews worship at home.",
        points: [["The family lights Shabbat candles and blesses the wine and bread", 2], ["A mezuzah on the doorpost, and prayers such as the Shema said at home", 2]],
        modelAnswer: "On Friday evening the family lights Shabbat candles and blesses the wine and bread for the meal. A mezuzah on the doorpost reminds them of God, and parents teach children the Shema.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain the importance of the minyan.",
        points: [["Certain prayers, such as the Kaddish and the reading of the Torah, need ten adults", 2], ["It shows that Jewish worship is communal and that each person is needed", 2]],
        modelAnswer: "Certain prayers, such as the Kaddish and the reading of the Torah, can only be said with ten adults. The minyan therefore shows that Jewish worship is communal and that every person is needed.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess whether the synagogue or the home is more important for keeping the Jewish faith alive.",
        points: [["Synagogue: communal prayer, the Torah reading, the minyan, study and community", 2], ["Home: the Sabbath meal, mezuzah, blessings, teaching children, and food laws, especially where there is no synagogue", 2], ["Link: the two work together; the festival and Sabbath span both", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The synagogue is vital because it offers communal prayer, the Torah reading, the minyan and a place of study. However, the home is where children first learn about the faith, through the Sabbath meal, the mezuzah, blessings and food laws, and in small communities with no synagogue, it is the main place of worship. The two work together, since Shabbat and the festivals link home and synagogue. I conclude that the home keeps the faith alive daily, while the synagogue gives it a communal life.",
      }),
    ],
    hints: ["Give the strengths of each place, and decide with a reason."],
    explanation: "A strong answer compares both places and shows how they work together.",
  });

  b.card("DEFINITION", "What is a **synagogue**?", "A Jewish place of assembly, prayer and study (beit knesset).");
  b.card("FACT", "What is the **ark** in a synagogue?", "The cabinet on the wall facing Jerusalem where the Torah scrolls are kept.");
  b.card("FACT", "What is the **ner tamid**?", "The lamp that always burns above the ark, recalling the lamp in the Temple.");
  b.card("DEFINITION", "What is a **minyan**?", "Ten adults, needed for certain prayers.", "Orthodox: ten men; many Conservative and Reform congregations count women.");
  b.card("DEFINITION", "What is a **rabbi**?", "A teacher and leader of a Jewish community; not a priest.");
  b.card("FACT", "What does a cantor (hazzan) do?", "Leads the singing and chanting of prayers in the synagogue.");
  b.card("FACT", "What are the three daily prayers?", "Shacharit (morning), minchah (afternoon), maariv (evening).");
  b.card("FACT", "What are tefillin?", "Leather boxes containing Shema verses, bound to the arm and head for weekday morning prayer.", "Deuteronomy 6.");
  b.card("CONCEPT", "Why did the synagogue become central after 70 CE?", "With the Temple destroyed, prayer, study and community replaced sacrifice.");
});
