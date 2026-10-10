// W2a: Jewish rites of passage.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.rites-passage", { file: "judaism/rites-passage", keyPrefix: "judaism.rites-passage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which day after birth is a Jewish baby boy circumcised?",
    options: [
      ["The eighth day", "Correct: brit milah takes place on the eighth day (Genesis 17)."],
      ["The first day", "The ceremony is not on the day of birth."],
      ["The thirteenth day", "Thirteen is the age of the bar mitzvah, not the day of brit milah."],
      ["The thirtieth day", "Thirty days is the period of sheloshim in mourning."],
    ],
    answer: "A",
    explanation: "The brit milah is performed on the **eighth day**, as commanded to Abraham in Genesis 17.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the term bar mitzvah mean?",
    options: [
      ["Son of the commandment", "Correct: a boy of 13 becomes responsible for the commandments."],
      ["Covenant of circumcision", "That describes brit milah."],
      ["House of assembly", "That describes the synagogue."],
      ["Seven days of mourning", "That describes shiva."],
    ],
    answer: "A",
    explanation: "**Bar mitzvah** means \"son of the commandment\"; **bat mitzvah** means \"daughter of the commandment\".",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the chuppah represent at a Jewish wedding?",
    options: [
      ["The home that the couple will build together", "Correct: the canopy is a symbol of their future home."],
      ["The tent in which the Israelites lived in the wilderness", "The tent of the wilderness was the tabernacle; the chuppah represents the couple's home."],
      ["The Temple that was destroyed in 70 CE", "The glass is broken to remember the Temple; the chuppah is the home."],
      ["The contract signed by the groom and the witnesses", "The contract is the ketubah."],
    ],
    answer: "A",
    explanation: "The **chuppah** (canopy) stands for the home the couple will build. The **ketubah** is the contract.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a glass broken at the end of a Jewish wedding?",
    options: [
      ["To remember the destruction of the Temple at a time of joy", "Correct: the breaking reminds the guests of Jewish history."],
      ["To show that the marriage can never be ended by divorce", "Divorce is allowed as a last resort."],
      ["To drive away evil spirits from the new home of the couple", "This is not the Jewish explanation of the custom."],
      ["To mark the end of the seven days of mourning for the dead", "That is shiva, which has no glass-breaking."],
    ],
    answer: "A",
    explanation: "The breaking of the glass recalls the **destruction of the Temple** and tempers the joy of the day with memory.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is shiva?",
    options: [
      ["The seven days of intense mourning after a burial", "Correct: the family stays at home and is visited."],
      ["The thirty days of lighter mourning after a burial", "That is sheloshim."],
      ["The yearly remembrance of a person who has died", "That is yahrzeit."],
      ["The prayer said by mourners to praise God", "That is the kaddish."],
    ],
    answer: "A",
    explanation: "**Shiva** is seven days; **sheloshim** is thirty days; **yahrzeit** is the yearly anniversary.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo is invited to a Jewish naming ceremony for a baby girl in Harare. What should she expect?",
    options: [
      ["Prayers for the baby and her mother, and her naming", "Correct: the naming of a girl is held in the synagogue or at home."],
      ["A circumcision performed by a mohel on the eighth day after birth", "Circumcision is for baby boys."],
      ["A reading from the Torah by the baby at the age of 12", "A bat mitzvah is a later celebration."],
      ["A seven-day period of mourning at the family home", "That is shiva, which follows a death."],
    ],
    answer: "A",
    hints: ["Which rite is for a baby girl?"],
    explanation: "A baby girl is **named** in a ceremony with prayers; circumcision is for boys.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the bat mitzvah is accurate?",
    options: [
      ["Practice differs: often a Torah reading in Reform and Conservative synagogues, a talk in many Orthodox ones", "Correct: it states the variety without ranking."],
      ["All Jews hold exactly the same bat mitzvah ceremony at the same age, wherever they live and whichever group they belong to", "Practice and age differ."],
      ["Only boys have a ceremony to mark their coming of age in Judaism", "Girls also have a ceremony."],
      ["It makes a girl Jewish and so is required of every Jewish girl", "A person is Jewish by birth or conversion, not by the ceremony."],
    ],
    answer: "A",
    hints: ["Notice the words many Orthodox and Reform."],
    explanation: "The bat mitzvah is held at 12 (Orthodox) or 12-13 (other groups); in some synagogues the girl reads from the Torah and in many Orthodox communities she gives a talk or holds a celebration.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason best explains why Jewish funerals are usually held soon after death and use a simple coffin and shroud?",
    options: [
      ["Respect for the dead and equality of rich and poor", "Correct: simplicity and speed show respect and equality."],
      ["Jews believe that the body must be preserved for the Messiah", "Judaism does not teach that the body must be preserved."],
      ["The law of Zimbabwe forbids any funeral lasting more than one day", "The practice comes from Jewish tradition."],
      ["Mourners must return to work immediately after the burial", "Mourners take shiva and sheloshim."],
    ],
    answer: "A",
    hints: ["Think about dignity and equality."],
    explanation: "Quick burial and plain shrouds show **respect** for the dead and **equality** before God.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "At a Jewish wedding the couple stand under a canopy called the chuppah.",
    answer: true,
    explanation: "True. The chuppah represents the home the couple will build.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The bar mitzvah ceremony is what makes a boy Jewish.",
    answer: false,
    explanation: "False. A person is Jewish by birth to a Jewish mother or by conversion. The bar mitzvah marks the age of responsibility for the commandments.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Ketubah", "the marriage contract"], ["Get", "the document of divorce"], ["Kaddish", "the prayer of praise said by mourners"], ["Yahrzeit", "the yearly anniversary of a death"]],
    explanation: "Ketubah: contract. Get: divorce document. Kaddish: mourners' prayer. Yahrzeit: yearly anniversary.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A boy becomes a bar mitzvah at {{blank:a}}; a girl becomes a bat mitzvah at {{blank:b}} (Orthodox tradition).",
    blanks: [
      { id: "a", accepted: ["13"], choices: ["8", "12", "13", "18"] },
      { id: "b", accepted: ["12"], choices: ["8", "12", "13", "18"] },
    ],
    explanation: "Bar mitzvah at **13**; bat mitzvah at **12** (Orthodox) or 12 or 13 in other groups.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "After a burial the close family sits {{blank:a}} for seven days, and the period of thirty days is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["shiva"], choices: ["shiva", "sheloshim", "yahrzeit", "havdalah"] },
      { id: "b", accepted: ["sheloshim"], choices: ["sheloshim", "shiva", "kiddush", "get"] },
    ],
    hints: ["Shiva means seven; sheloshim means thirty."],
    explanation: "**Shiva** (seven) and **sheloshim** (thirty).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the trained person who performs a circumcision at a brit milah?",
    accepted: ["mohel", "a mohel", "the mohel"],
    wrong: ["rabbi", "cantor"],
    explanation: "The circumcision is performed by a **mohel**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** parts of a Jewish wedding ceremony.",
    points: ["The couple stand under the chuppah", "The ketubah (marriage contract) is signed and read", "The groom gives a ring, the seven blessings are said, and a glass is broken"],
    modelAnswer: "The couple stand under the chuppah; the ketubah is signed and read; the groom gives a ring, seven blessings are said over wine and a glass is broken.",
    explanation: "One mark for each part.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what happens at a bar mitzvah and what it means.",
    points: [
      ["The boy is 13 and has prepared by learning Hebrew and a Torah portion", 1],
      ["He is called up to the Torah in the synagogue and may read and give a talk", 1],
      ["He becomes responsible for keeping the commandments", 1],
      ["He may be counted in a minyan, and the family holds a celebration", 1],
    ],
    modelAnswer: "At 13 a boy who has prepared by learning Hebrew and a Torah portion is called up to read from the Torah in the synagogue and often gives a talk. He becomes responsible for keeping the commandments and may be counted in a minyan, and the family holds a celebration.",
    hints: ["Say what he does, what changes and who celebrates."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which the Jewish customs of mourning help a bereaved family.",
    points: [
      ["Shiva keeps the family together at home for seven days", 1],
      ["Developed: friends visit and bring food and prayer, so mourners are supported and not alone", 2],
      ["The kaddish and later the yahrzeit keep the dead remembered", 1],
      ["Developed: saying the prayer in the community expresses faith in God in sorrow and helps the family to return gradually to normal life", 2],
    ],
    modelAnswer: "Shiva keeps the family together at home for seven days. Friends visit and bring food and prayer, so mourners are supported and not alone. The kaddish and the yearly yahrzeit keep the dead remembered, and saying the prayer in the community expresses faith in God in sorrow and helps the family return gradually to normal life.",
    hints: ["Choose two customs, say what happens and how it helps."],
    explanation: "Two ways, each stated (1) and developed (2 across the way).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an invitation card from a fictional Jewish family in Harare, 2026",
      "Rachel's parents invite you to the bat mitzvah of their daughter Rachel, aged 12, on Saturday 7 November 2026. Rachel will read from the Torah in the synagogue, and afterwards the family will hold a lunch. Please join us in celebrating the day when she takes on responsibility for the commandments."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What does Source A say Rachel will do at her bat mitzvah?",
        options: [
          ["Read from the Torah in the synagogue", "Correct: this is stated in the invitation."],
          ["Sit shiva with her family at home", "Shiva is a period of mourning."],
          ["Sign the ketubah in front of witnesses", "The ketubah belongs to a wedding."],
          ["Be circumcised by a mohel", "Circumcision is for baby boys."],
        ],
        answer: "A", explanation: "The source says Rachel will read from the Torah.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A and your own knowledge, state **three** things that a bat mitzvah means.",
        points: ["A girl takes on responsibility for the commandments", "She is recognised as a member of the community with adult duties", "The occasion is celebrated by the family, often with a Torah reading"],
        modelAnswer: "A girl takes on responsibility for the commandments, is recognised as a member of the community with adult duties, and the occasion is celebrated by the family, often with a Torah reading.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the age and form of a bat mitzvah may differ between Jewish groups.",
        points: [["Orthodox tradition sets the age at 12 and often marks it with a celebration or a talk", 1], ["Reform and Conservative groups may use age 12 or 13 and a Torah reading like a boy's", 1], ["Jewish groups interpret tradition and the role of women differently", 1]],
        modelAnswer: "Orthodox tradition sets the age at 12 and often marks it with a celebration or talk. Reform and Conservative groups may use age 12 or 13 and a Torah reading like a boy's. Jewish groups interpret tradition and the role of women differently.",
      }),
    ],
    hints: ["In (c) use 'many Orthodox' and 'many Reform'."],
    explanation: "The source gives the age, the Torah reading and the meaning of responsibility.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Farai says: \"Jewish rites of passage are about the family, not about God.\" Miriam says: \"They are about God, the community and the family together.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe the Jewish funeral and burial customs.",
        points: [["Burial soon after death, usually within a day or two", 1], ["The body is washed and wrapped in a simple shroud with a plain coffin", 1], ["Mourners tear a garment (kriah) and say the kaddish", 1], ["The family sits shiva for seven days", 1]],
        modelAnswer: "Burial is soon after death, usually within a day or two. The body is washed and wrapped in a simple shroud with a plain coffin. Mourners tear a garment and say the kaddish, and the family then sits shiva for seven days.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how brit milah connects a baby boy to the Jewish community.",
        points: [["It is the sign of the covenant given to Abraham (Genesis 17)", 2], ["It welcomes the child into the community on the eighth day and gives him his name", 2]],
        modelAnswer: "Brit milah is the sign of the covenant given to Abraham in Genesis 17, so it joins the boy to the same covenant as the patriarchs. It welcomes him into the community on the eighth day and gives him his Hebrew name.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Jewish rites of passage are more about the family and community than about God.",
        points: [["For: family and friends gather, celebrate or mourn together, and the community supports the family", 2], ["Against: God is central: the covenant at the brit milah, the Torah at the bar mitzvah, the blessings under the chuppah, the kaddish praising God", 2], ["Link: the rites join God, the family and the community; the covenant is with the people as a whole", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "The rites clearly bring family and friends together, who celebrate or mourn and support one another. Yet God is central to each: the brit milah is the sign of the covenant, the bar mitzvah is about the commandments and the Torah, the wedding includes blessings under the chuppah, and the kaddish praises God even in grief. In Judaism the covenant is with the whole people, so the rites join God, the family and the community. I conclude that they are about all three together.",
      }),
    ],
    hints: ["Give evidence for the family and community, then for God, and judge."],
    explanation: "A strong answer shows the role of the family and community and the role of God, and judges.",
  });

  b.card("DEFINITION", "What is **brit milah**?", "The circumcision of a baby boy on the eighth day, the sign of the covenant with Abraham (Genesis 17).");
  b.card("DEFINITION", "What are **bar mitzvah** and **bat mitzvah**?", "Ceremonies when a boy (13) or girl (12 or 13) takes on responsibility for the commandments.");
  b.card("DEFINITION", "What is the **ketubah**?", "The Jewish marriage contract, signed by witnesses and read at the wedding.");
  b.card("FACT", "What does the chuppah represent?", "The home the couple will build together.");
  b.card("FACT", "Why is a glass broken at a wedding?", "To remember the destruction of the Temple even in a time of joy.");
  b.card("DEFINITION", "What is a **get**?", "The document of Jewish divorce.");
  b.card("DEFINITION", "What are **shiva**, **sheloshim** and **yahrzeit**?", "Shiva: seven days of mourning. Sheloshim: thirty days. Yahrzeit: the yearly anniversary of a death.");
  b.card("FACT", "What is the kaddish?", "A prayer praising God, said by mourners; it does not mention death.");
  b.card("CONCEPT", "Why is burial usually soon and simple?", "Respect for the dead and equality: rich and poor are treated alike.");
});
