// W2a: Jewish beliefs.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.beliefs", { file: "judaism/beliefs", keyPrefix: "judaism.beliefs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the central Jewish statement of faith, taken from Deuteronomy 6:4-9?",
    options: [
      ["The Shema", "Correct: it declares that the Lord is one."],
      ["The Kaddish", "The Kaddish is a prayer said by mourners."],
      ["The Haggadah", "The Haggadah is the book used at the Passover seder."],
      ["The Yigdal", "The Yigdal is a hymn based on Maimonides' principles."],
    ],
    answer: "A",
    explanation: "The **Shema** (Deuteronomy 6:4-9) declares the oneness of God and is recited morning and evening.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word **Torah** mean?",
    options: [
      ["Teaching or instruction", "Correct: Torah means teaching."],
      ["Covenant or solemn agreement", "A covenant is a brit."],
      ["World to come", "The world to come is olam ha-ba."],
      ["Anointed one", "The anointed one is the mashiach (Messiah)."],
    ],
    answer: "A",
    explanation: "**Torah** means \"teaching\" or \"instruction\". In a narrow sense it is the five books of Moses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which belief about God is central to Judaism?",
    options: [
      ["There is only one God, who is the creator", "Correct: monotheism is the core belief."],
      ["God appears in three persons as Father, Son and Spirit", "That is the Christian belief in the Trinity, not a Jewish one."],
      ["God is one of several gods, each ruling a different nation", "Judaism teaches that there is only one God."],
      ["God can be represented by statues in the synagogue", "Jews do not make images of God."],
    ],
    answer: "A",
    explanation: "Jews believe in **one God**, the creator, who has no body and is not represented by images.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What do most Jews mean when they say that Jews are the \"chosen people\"?",
    options: [
      ["They have been given responsibilities under the covenant", "Correct: being chosen means duty, not superiority."],
      ["They are better than every other nation in the world", "Most Jews explain it as responsibility, not superiority."],
      ["Only they can be saved and all other peoples are condemned", "Judaism teaches that righteous people of all nations have a share in the world to come."],
      ["They may not take part in the life of other communities", "Chosenness is not a rule about separation."],
    ],
    answer: "A",
    explanation: "Being **chosen** means being asked to keep the Torah and live by God's ways. It is a responsibility, not a claim of superiority.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the mezuzah?",
    options: [
      ["A small case with the Shema, fixed to a doorpost", "Correct: it follows the command in Deuteronomy 6:9."],
      ["A shawl with fringes worn by Jews at morning prayer", "That is the tallit."],
      ["A cap worn by Jewish men as a sign of respect for God", "That is the kippah."],
      ["A scroll of the Torah read aloud in the synagogue", "That is the Sefer Torah."],
    ],
    answer: "A",
    explanation: "The **mezuzah** is a small case on the doorpost containing the verses of the Shema. It reminds the family of God's presence.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha reads that some Jews expect a personal Messiah while others speak of a messianic age. What does this show about Judaism?",
    options: [
      ["Jews share a hope for a time of peace but understand it in different ways", "Correct: the hope is shared; the interpretation differs."],
      ["Jews no longer share any beliefs about the future of the world", "The hope for a time of peace is widely shared."],
      ["Only Orthodox Jews are regarded as Jews by other Jewish groups", "Jews of all groups are Jews; the groups differ on belief and practice."],
      ["Judaism believes that the Messiah has already come, but some Jews doubt it", "Jews believe that the Messiah has not yet come."],
    ],
    answer: "A",
    hints: ["Think of the words many Orthodox and many Reform."],
    explanation: "Many **Orthodox** Jews expect a personal Messiah; many **Reform** Jews speak of a messianic age. Both hope for peace and justice.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about Jewish belief in life after death is the most accurate?",
    options: [
      ["Jews hold different views, including the world to come and resurrection", "Correct: views vary among Jews."],
      ["All Jews teach exactly the same detailed account of life after death", "Jewish views vary."],
      ["Judaism teaches that nothing is known and nobody thinks about life after death", "Many Jews do believe in olam ha-ba."],
      ["Judaism teaches that people are reborn many times in new bodies in this world", "Rebirth in this world is not the traditional Jewish teaching."],
    ],
    answer: "A",
    hints: ["Remember that Judaism puts most weight on this life."],
    explanation: "Many traditional Jews believe in **olam ha-ba** and the **resurrection of the dead**; others stress the soul or this life. Judaism emphasises how one lives.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of qualities of God do Jews hold together, as shown on Yom Kippur?",
    options: [
      ["Justice and mercy", "Correct: God is just, yet merciful to those who repent."],
      ["Anger and revenge", "Judaism does not describe God in these terms as God's main qualities."],
      ["Silence and distance", "Jews believe God is close and hears prayer."],
      ["Power and secrecy", "Power is part of belief in God, but the pair asked about is justice and mercy."],
    ],
    answer: "A",
    hints: ["On the Day of Atonement Jews ask for forgiveness."],
    explanation: "On Yom Kippur Jews trust that God is **just** and **merciful** and will forgive those who sincerely repent.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Jews believe that God is one.",
    answer: true,
    explanation: "True. This is the message of the Shema.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Judaism teaches that the Messiah has already come.",
    answer: false,
    explanation: "False. Jews are still waiting for the Messiah. This is a difference between Judaism and Christianity, and should be stated respectfully.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Shema", "the declaration that the Lord is one"], ["Mashiach", "the anointed one expected to bring peace and justice"], ["Olam ha-ba", "the world to come"], ["Brit", "covenant"]],
    explanation: "Shema: oneness of God. Mashiach: Messiah. Olam ha-ba: world to come. Brit: covenant.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Shema is found in the Book of {{blank:a}}, chapter {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Deuteronomy"], choices: ["Genesis", "Exodus", "Deuteronomy", "Isaiah"] },
      { id: "b", accepted: ["6"], choices: ["1", "6", "12", "20"] },
    ],
    explanation: "The Shema is in Deuteronomy 6:4-9.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The Thirteen Principles of Faith were written by {{blank:a}}, a scholar who lived in the {{blank:b}} century CE.",
    blanks: [
      { id: "a", accepted: ["Maimonides"], choices: ["Maimonides", "Rabbi Akiva", "Hillel", "David"] },
      { id: "b", accepted: ["twelfth"], choices: ["first", "fifth", "twelfth", "twentieth"] },
    ],
    hints: ["He is also known as the Rambam."],
    explanation: "**Maimonides** (Rambam) set out thirteen principles in the **twelfth** century CE.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Hebrew term for \"the world to come\"?",
    accepted: ["Olam ha-ba", "Olam haba", "Olam Ha-Ba", "Olam Habah"],
    wrong: ["Shema", "Brit"],
    explanation: "**Olam ha-ba** means the world to come.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** things that Jews do to show their belief in one God.",
    points: ["Recite the Shema morning and evening", "Fix a mezuzah on the doorposts of the home", "Pray, wear tefillin in the weekday morning prayer, or keep the Sabbath"],
    modelAnswer: "Jews recite the Shema in the morning and the evening, fix a mezuzah on the doorposts of the home, and pray daily, wearing tefillin at weekday morning prayer.",
    explanation: "One mark for each practice.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what Jews mean by the idea that they are the chosen people.",
    points: [
      ["They believe God made a covenant with the Jewish people", 1],
      ["They were given the Torah and its commandments", 1],
      ["Being chosen means responsibility to live by God's ways", 1],
      ["It does not mean that they are better than other peoples", 1],
    ],
    modelAnswer: "Jews believe that God made a covenant with the Jewish people and gave them the Torah and its commandments. Being chosen means responsibility to live by God's ways. It does not mean that Jews are better than other peoples.",
    hints: ["Say what was given, what it asks of Jews and what it does not mean."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which belief in one God affects the daily life of Jews.",
    points: [
      ["They recite the Shema each morning and evening", 1],
      ["Developed: this repeated declaration reminds them every day that God is one and that they must love God", 2],
      ["They fix a mezuzah on the doorposts", 1],
      ["Developed: it reminds the family at each doorway of God's presence and the commandments, as taught in Deuteronomy 6", 2],
    ],
    modelAnswer: "Jews recite the Shema each morning and evening, which reminds them every day that God is one and that they must love God with all their heart. They also fix a mezuzah on the doorposts, which reminds the family each time they pass of God's presence and of the commandments, as taught in Deuteronomy 6.",
    hints: ["Choose two practices and link each to the belief."],
    explanation: "Two ways, each stated (1) and developed (2 across the way).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students, a Jewish student and a Christian student, in a school in Gweru, 2026",
      "Rachel: At home my family says the Shema at night. It says that God is one, and that we must teach it to our children.\nTatenda: In my church we say that God is Father, Son and Holy Spirit. Do Jews also expect the Messiah?\nRachel: Yes, we are still waiting for him. Some of us expect a person from King David's family; some of us talk about a time of peace for the whole world."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what do Jews say in the Shema?",
        options: [
          ["That God is one", "Correct: Rachel says the Shema states that God is one."],
          ["That God is in three persons", "Tatenda describes the Christian belief; it is not the Shema."],
          ["That the Messiah has already come", "Rachel says Jews are still waiting."],
          ["That the Torah may be changed", "The source does not say this."],
        ],
        answer: "A", explanation: "Rachel states the key point of the Shema: God is one.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things Jews believe or do.",
        points: ["They say the Shema at night", "They believe God is one", "They are still waiting for the Messiah, understood in different ways"],
        modelAnswer: "Jews say the Shema at night, believe that God is one, and are still waiting for the Messiah, whom some expect to be a person from David's family and others understand as a time of peace.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the beliefs in Source A show both agreement and difference between Judaism and Christianity.",
        points: [["Both believe in one God, creator and the Messiah as a hope", 1], ["Christians believe God is Father, Son and Holy Spirit, while Jews do not", 1], ["Jews are still waiting for the Messiah, while Christians believe he has come in Jesus", 1]],
        modelAnswer: "Both religions believe in one God. Christians describe God as Father, Son and Holy Spirit, which Jews do not teach, and Jews are still waiting for the Messiah while Christians believe that the Messiah has come in Jesus.",
      }),
    ],
    hints: ["In (c) state one point of agreement and two differences, written respectfully."],
    explanation: "The source gives the Shema, the divine unity and the expectation of the Messiah.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Miriam says: \"Belief in one God is the most important teaching of Judaism.\" Her friend Farai says: \"Keeping the commandments matters more than belief.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** teachings of Maimonides' Thirteen Principles of Faith.",
        points: [["God exists and is the creator, and is one", 1], ["God has no body and is eternal", 1], ["The Torah is from God and will not be changed (or Moses was the greatest prophet)", 1], ["God rewards and punishes justly, and the Messiah will come", 1]],
        modelAnswer: "God exists, is the creator and is one; God has no body and is eternal. The Torah is from God and will not be changed. God rewards and punishes justly and the Messiah will come.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why many Orthodox and Reform Jews understand the Torah differently.",
        points: [["Many Orthodox Jews believe that the whole Torah was given by God and that its commandments remain binding", 2], ["Many Reform Jews believe that it is inspired by God but that each generation interprets how to apply it", 2]],
        modelAnswer: "Many Orthodox Jews believe that the whole Torah was given by God and that its commandments remain binding. Many Reform Jews believe that it is inspired by God but that each generation must interpret how to apply it.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that belief in one God matters more than keeping the commandments in Judaism.",
        points: [["For belief: the Shema begins everything, and the commandments are given by the one God", 2], ["For action: Jewish life is shaped by practice (Sabbath, food laws, charity), and the prophets stress justice", 2], ["Link: in Judaism belief and practice are joined; the Shema itself tells Jews to love God and to keep the words in daily life", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Belief in one God is the foundation of Judaism, since the Shema begins everything and the commandments are given by the one God. Yet Jewish life is shaped by practice, such as the Sabbath, food laws and charity, and the prophets stress justice above ritual. In Judaism the two cannot easily be separated: the Shema tells Jews both to love God and to keep these words in daily life. I conclude that belief matters first, but that it is shown through action.",
      }),
    ],
    hints: ["Present both views, then show how belief and practice are linked."],
    explanation: "A strong answer weighs both claims and notes that the Shema joins belief and action.",
  });

  b.card("DEFINITION", "What is the **Shema**?", "The central declaration of Jewish faith (Deuteronomy 6:4-9): the Lord is one.", "Recited morning and evening; written in the mezuzah.");
  b.card("DEFINITION", "What is the **mezuzah**?", "A small case containing the Shema, fixed to the doorposts of a Jewish home.");
  b.card("DEFINITION", "What does **Torah** mean?", "Teaching or instruction; narrowly the five books of Moses, widely all Jewish teaching.");
  b.card("CONCEPT", "What do Jews mean by the chosen people?", "A people given responsibility under the covenant to keep the Torah; not a claim of superiority.");
  b.card("DEFINITION", "What is the **Messiah** (mashiach)?", "The anointed one Jews expect to bring a time of peace and justice.", "Many Orthodox Jews expect a person from David's line; many Reform Jews speak of a messianic age.");
  b.card("FACT", "What is olam ha-ba?", "The world to come, in Jewish belief about the afterlife.", "Views of the afterlife vary among Jews.");
  b.card("FACT", "Who wrote the Thirteen Principles of Faith?", "Moses Maimonides (Rambam), in the twelfth century CE.");
  b.card("CONCEPT", "Which two qualities of God do Jews hold together?", "Justice and mercy.", "Exodus 34:6-7; Yom Kippur.");
  b.card("CONCEPT", "How do Orthodox and Reform Jews differ about the Torah?", "Many Orthodox Jews: the whole Torah is from God and binding. Many Reform Jews: inspired by God and interpreted by each generation.");
});
