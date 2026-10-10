// W3b: Gender roles in Indigenous Religion and Judaism (Topic 8.2).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.gender.ir-judaism", { file: "gender/ir-judaism", keyPrefix: "gender.ir-judaism" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who is the vatete in a Shona family?",
    options: [
      ["The father's sister, with an important family role", "Correct: she has ritual and advisory authority."],
      ["The mother's brother, who advises on the bride wealth", "The mother's brother is a different relative (sekuru/malume)."],
      ["The eldest grandmother, who leads the school assembly", "The vatete is the father's sister, not the grandmother."],
      ["The spirit medium who speaks for the territory", "That is a svikiro or mhondoro medium."],
    ],
    answer: "A",
    explanation: "The **vatete** is the paternal aunt (father's sister).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Bible passage says that human beings were made male and female in the image of God?",
    options: [
      ["Genesis 1:27", "Correct: both are made in God's image."],
      ["Exodus 15:20", "This verse mentions Miriam and the women's song."],
      ["Judges 4:4", "This verse introduces Deborah as a prophet and judge."],
      ["Ruth 1:16", "This verse is Ruth's speech of loyalty to her mother-in-law."],
    ],
    answer: "A",
    explanation: "**Genesis 1:27** teaches that humans are made in the image of God, male and female.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which woman in the Hebrew Bible was a prophet and judge who led Israel?",
    options: [
      ["Deborah", "Correct: Judges 4-5."],
      ["Ruth", "Ruth is remembered for her loyalty to Naomi."],
      ["Esther", "Esther was a queen who saved her people."],
      ["Sarah", "Sarah was the wife of Abraham."],
    ],
    answer: "A",
    hints: ["Think of Judges 4-5."],
    explanation: "**Deborah** was a prophet and judge (Judges 4-5).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about women in Indigenous Religion is accurate?",
    options: [
      ["Women can be mediums, healers and aunts with ritual authority", "Correct: women hold real religious roles."],
      ["Women never take part in any religious ceremony or ritual", "Women take part in many ceremonies."],
      ["Women are the only people who may speak to the ancestors", "Men also speak to ancestors, as family heads."],
      ["Women may not be consulted on any important family matter", "A vatete is consulted on marriage and other matters."],
    ],
    answer: "A",
    explanation: "Women serve as **mediums, healers and aunts** with real authority.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which woman led the women in song after the crossing of the sea in the Book of Exodus?",
    options: [
      ["Miriam", "Correct: Exodus 15:20-21."],
      ["Deborah", "Deborah is found in Judges."],
      ["Esther", "Esther is found in the Book of Esther."],
      ["Ruth", "Ruth is found in the Book of Ruth."],
    ],
    answer: "A",
    explanation: "**Miriam** is described as a prophet who led the women in song (Exodus 15:20-21).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a synagogue, men and women sit in separate sections and only men are counted in the minyan. Which movement of Judaism is this most likely to be?",
    options: [
      ["Orthodox", "Correct: traditional separate roles."],
      ["Reform", "Reform synagogues usually seat families together and count women."],
      ["Progressive", "Progressive synagogues usually give equal roles."],
      ["Liberal", "Liberal synagogues usually give equal roles."],
    ],
    answer: "A",
    hints: ["Which movement keeps the traditional separate roles?"],
    explanation: "Separate seating and counting only men in the minyan is typical of **Orthodox** Judaism.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do some critics object to lobola?",
    options: [
      ["They fear it may be read as buying a wife and used to control her", "Correct: this is the main concern."],
      ["They think it is illegal in every circumstance in Zimbabwe today", "Lobola is lawful; the concern is how it is understood."],
      ["They think it has no meaning for either family", "Supporters say it has meaning for both families."],
      ["They think it causes spirit mediums to lose their powers", "This is not a criticism of lobola."],
    ],
    answer: "A",
    hints: ["Remember the explanation in the lesson: respect or ownership?"],
    explanation: "Critics fear lobola may be understood as **buying a wife** and used to claim control.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about gender roles in Judaism is best supported by the evidence?",
    options: [
      ["Roles differ between Orthodox and Reform Jews, so \"Judaism says\" is too broad", "Correct: practice differs within Judaism."],
      ["All Jews, in every movement, give women and men identical roles in prayer", "Orthodox practice differs."],
      ["No Jewish woman has ever held any leadership role of any kind in history", "Deborah, Miriam and women rabbis are examples."],
      ["Women have no place at all in Jewish home life or religion", "Women have important roles at home, in education and in worship."],
    ],
    answer: "A",
    hints: ["Think of the differences between the movements."],
    explanation: "Because practice differs, an answer should name the **group** (Orthodox, Reform).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Nehanda (Charwe) is remembered as a woman spirit medium.",
    answer: true,
    explanation: "True. Nehanda was believed to be the medium of the Nehanda spirit and was a leader in the First Chimurenga.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In traditional Shona families, inheritance often passed through male relatives.",
    answer: true,
    explanation: "True. This is why the Constitution (sections 71 and 80) and the law now protect women's rights to property and inheritance.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each woman of the Hebrew Bible with her role.",
    pairs: [
      ["Sarah", "Wife of Abraham and mother of Isaac"],
      ["Deborah", "Prophet and judge"],
      ["Ruth", "Moabite woman remembered for loyalty to her mother-in-law"],
      ["Esther", "Queen who saved her people, remembered at Purim"],
    ],
    explanation: "Sarah (Genesis), Deborah (Judges), Ruth (Book of Ruth), Esther (Book of Esther).",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Women rabbis are ordained in {{blank:a}} and Conservative Judaism, but mainstream {{blank:b}} Judaism does not ordain women as rabbis.",
    blanks: [
      { id: "a", accepted: ["Reform"], choices: ["Reform", "Orthodox", "Hasidic", "Haredi"] },
      { id: "b", accepted: ["Orthodox"], choices: ["Reform", "Orthodox", "Liberal", "Progressive"] },
    ],
    hints: ["Reform ordained women from 1972."],
    explanation: "Women rabbis serve in **Reform** and Conservative Judaism; mainstream **Orthodox** Judaism does not ordain them.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona word for a spirit medium?",
    accepted: ["svikiro", "n'anga svikiro"],
    wrong: ["mhondoro", "vatete"],
    explanation: "A spirit medium is a **svikiro**.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** religious roles that women can hold in Indigenous Religion.",
    points: ["Spirit medium (svikiro)", "Healer (n'anga or inyanga) or midwife", "Aunt (vatete) with ritual authority"],
    modelAnswer: "Women can be spirit mediums, healers or midwives, and aunts (vatete) with ritual authority.",
    explanation: "One mark for each role.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the roles of men and women in an Orthodox Jewish home and synagogue.",
    points: [
      ["Men are required to pray at set times and are counted in the minyan", 1],
      ["In the synagogue men and women usually sit separately", 1],
      ["Women have responsibility for the Jewish home, including lighting the Shabbat candles", 1],
      ["Orthodox Jews describe the roles as different but equally valuable", 1],
    ],
    modelAnswer: "Men are required to pray at set times and are counted in the minyan. In the synagogue men and women usually sit separately. Women have responsibility for the Jewish home, including lighting the Shabbat candles. Orthodox Jews describe the roles as different but equally valuable.",
    hints: ["Cover synagogue and home, men and women."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** effects of traditional inheritance customs on women in Zimbabwe.",
    points: [
      ["Women could lose the family home or property to the husband's male relatives", 1],
      ["Developed: widows and daughters could be left without land or income, which increased poverty", 2],
      ["Women were dependent on male relatives", 1],
      ["Developed: this limited their independence and their ability to protect themselves or their children", 2],
    ],
    modelAnswer: "Women could lose the family home or property to the husband's male relatives. Widows and daughters could be left without land or income, which increased poverty. Women were also dependent on male relatives, which limited their independence and their ability to protect themselves or their children. The Constitution and the law now protect women's equal rights to property.",
    hints: ["Think of what a widow could lose and what that led to."],
    explanation: "Two effects, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students in Harare, 2026",
      "Rachel: At my Orthodox synagogue the men and women sit apart, and my mother lights the Shabbat candles at home.\nMiriam: At my Reform synagogue families sit together, and our rabbi is a woman.\nTendai: In my family, my aunt is a spirit medium, and my father leads the ceremonies when we speak to the ancestors."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which person in Source A describes a woman holding a senior religious office?",
        options: [
          ["Miriam, whose rabbi is a woman", "Correct: the rabbi leads the congregation."],
          ["Rachel, whose mother lights candles at home", "Lighting candles is a home duty, not an office."],
          ["Rachel, who sits apart from the men", "Separate seating is not an office."],
          ["Tendai's father, who leads the ceremonies", "He is a man."],
        ],
        answer: "A", explanation: "Miriam's synagogue has a woman rabbi.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** gender roles in religion.",
        points: ["Women and men sit apart in the Orthodox synagogue", "A woman is a rabbi in a Reform synagogue", "A woman is a spirit medium in Tendai's family while his father leads ceremonies"],
        modelAnswer: "In the Orthodox synagogue women and men sit apart; in the Reform synagogue the rabbi is a woman; and in Tendai's family an aunt is a spirit medium while his father leads the ceremonies.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why Rachel and Miriam, both Jewish, describe their synagogues so differently.",
        points: [["Judaism has different movements, such as Orthodox and Reform", 1], ["They interpret the law and tradition differently", 1], ["Orthodox keep traditional separate roles; Reform give men and women equal roles in worship", 1]],
        modelAnswer: "Judaism has different movements, such as Orthodox and Reform. They interpret the law and tradition differently. Orthodox Jews keep traditional separate roles, while Reform Jews give men and women equal roles in worship.",
      }),
    ],
    hints: ["In (c) name the two movements and what each believes."],
    explanation: "The source shows how practice differs within Judaism and in IR.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nokuthula says: \"Women have more religious authority in Indigenous Religion than in Judaism.\" Sipho says: \"You cannot compare them so simply; both religions give women real roles, in different ways.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** roles of women in Indigenous Religion.",
        points: [["Spirit mediums for ancestral or territorial spirits", 1], ["Healers or midwives", 1], ["Aunts (vatete) with ritual and advisory authority", 1], ["Mothers who teach values and prepare for ceremonies", 1]],
        modelAnswer: "Women act as spirit mediums for ancestral spirits, and as aunts (vatete) with ritual and advisory authority in the family.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which the Hebrew Bible shows that women could be leaders.",
        points: [["Deborah was a prophet and judge who led Israel (Judges 4-5)", 2], ["Miriam was a prophet who led the women in song (Exodus 15:20-21), or Esther, as queen, saved the Jewish people from danger (Book of Esther)", 2]],
        modelAnswer: "Deborah was a prophet and judge who led Israel and gave counsel to the army commander Barak (Judges 4-5). Her example shows that women could be leaders with real authority in Israel.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Indigenous Religion and Judaism give women a high status.",
        points: [["For IR: women are mediums, healers and aunts with authority; Nehanda is an example", 2], ["For Judaism: women of the Bible, the home role, and women rabbis in Reform and Conservative Judaism", 2], ["Against or limits: patriarchal family structure, lobola and inheritance customs; separate roles in Orthodox Judaism; differences within each religion", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Both religions give women real roles. In IR women are mediums, healers and aunts with authority, and Nehanda is a famous example. In Judaism women such as Deborah and Miriam are leaders in the Bible, women run the Jewish home, and Reform and Conservative movements ordain women rabbis. However, both traditions have been patriarchal: inheritance customs and lobola have sometimes disadvantaged women, and Orthodox Judaism keeps separate roles. I conclude that women have been valued and have held authority, but their status has varied between groups, and equal treatment has been a recent development.",
      }),
    ],
    hints: ["Give examples of status in each religion, then the limits, then a judgement."],
    explanation: "A strong answer gives evidence from both religions, notes differences within them and avoids ranking.",
  });

  b.card("DEFINITION", "Who is a **vatete**?", "The paternal aunt (father's sister), who has an important ritual and advisory role in the Shona family.");
  b.card("DEFINITION", "What is a **svikiro**?", "A spirit medium through whom an ancestral or territorial spirit is believed to speak; women have been important mediums.");
  b.card("FACT", "Who was Nehanda (Charwe)?", "A woman spirit medium and leader in the First Chimurenga.");
  b.card("FACT", "Which verse says humans are made male and female in God's image?", "Genesis 1:27.");
  b.card("FACT", "Name five women of the Hebrew Bible.", "Sarah, Miriam, Deborah, Ruth and Esther.");
  b.card("FACT", "Which movements of Judaism ordain women as rabbis?", "Reform (from 1972) and Conservative (from 1985); mainstream Orthodox Judaism does not.");
  b.card("CONCEPT", "Why do some critics object to lobola?", "It can be understood as buying a wife and used to claim control over her; supporters see it as a sign of respect that joins two families.");
  b.card("CONCEPT", "Why should you say 'Orthodox Jews' rather than 'Judaism says'?", "Orthodox, Conservative and Reform Jews apply gender roles differently.");
  b.card("CONCEPT", "How has the law changed women's rights to inherit?", "The Constitution (sections 56, 71 and 80) protects equality, property and inheritance, and customs that infringe women's rights are void.");
});
