// W4a: Religious teachings on work, wealth and poverty. The prosperity gospel is presented as a debate; MCQs test what each
// side says, never which side is right.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.enterprise.work-wealth", { file: "enterprise/work-wealth", keyPrefix: "enterprise.work-wealth" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a nhimbe (Shona) or ilima (Ndebele)?",
    options: [
      ["A gathering where neighbours help one another farm", "Correct: collective work."],
      ["A ceremony in which a dead person's spirit is brought home", "That is kurova guva or umbuyiso."],
      ["A payment made by a groom's family to a bride's family", "That is roora or lobola."],
      ["A rain-making ceremony held at a sacred place in the hills", "That is mukwerera or ukucela izulu."],
    ],
    answer: "A",
    explanation: "A **nhimbe/ilima** is a work party in which neighbours help one another and the host provides food.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a tithe?",
    options: [
      ["A tenth of income or produce given to a religious cause", "Correct: the meaning of tithe."],
      ["A payment of interest on a loan from a bank", "That describes interest."],
      ["A fixed share of qualifying wealth that Muslims must give", "That describes zakat."],
      ["A gift made to a bride's parents before marriage", "That describes bride wealth."],
    ],
    answer: "A",
    explanation: "A **tithe** is a tenth of income or produce given to a religious cause (see Deuteronomy 14:22 and Malachi 3:10).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Bible passage says that a person who will not work should not eat?",
    options: [
      [ref("2 Thessalonians", 3, 10), "Correct: Paul's teaching on work."],
      [ref("Deuteronomy", 6, "4-9"), "This passage is the Shema."],
      [ref("Philippians", 2, "5-11"), "This passage is a hymn about Christ's humility."],
      [ref("Mark", 10, "46-52"), "This passage describes Jesus healing a blind man."],
    ],
    answer: "A",
    explanation: `**${ref("2 Thessalonians", 3, 10)}** teaches that those who refuse to work should not eat. It is not about people who cannot work.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does Islam regard honest work?",
    options: [
      ["As a form of worship when the earnings are lawful (halal)", "Correct: honest earning is praised."],
      ["As a distraction that Muslims should avoid whenever possible", "Islam encourages earning a living."],
      ["As a duty only for the poor and not for the wealthy", "It applies to all who are able."],
      ["As acceptable only when the income comes from gambling", "Gambling is forbidden."],
    ],
    answer: "A",
    explanation: "In Islam honest, lawful work can be a form of **worship**, and Muslims are encouraged to earn a living by *halal* means (Qur'an 62:10).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does the Bible say about the love of money in 1 Timothy 6:10?",
    options: [
      ["It is a root of all kinds of evil", "Correct: Paul warns against love of money."],
      ["It is the sign that God has blessed a person", "The verse warns against it."],
      ["It is a duty for every Christian who works", "The verse warns against it."],
      ["It is the same as paying a tithe to the church", "A tithe is giving, not love of money."],
    ],
    answer: "A",
    explanation: "**1 Timothy 6:10** says the love of money is a root of all kinds of evil. Wealth itself is not condemned.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo's family feeds the neighbours who help harvest their groundnuts and sends a share to a widow. Which teaching does this illustrate?",
    options: [
      ["Community sharing, as in the nhimbe and the zunde ramambo", "Correct: sharing is a core value."],
      ["The prosperity gospel's teaching that giving guarantees wealth", "The example is about community sharing, not the prosperity gospel."],
      ["The Islamic duty to pay zakat on savings after a lunar year", "The example concerns neighbours' help, not zakat."],
      ["The Jewish rule of resting from work on the Sabbath", "The example is not about the Sabbath."],
    ],
    answer: "A",
    hints: ["Look for the value of community sharing in Indigenous Religion."],
    explanation: "The example illustrates **community sharing** in Indigenous Religion: nhimbe and the zunde ramambo.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement describes what critics of the prosperity gospel say?",
    options: [
      ["It may blame the poor or sick for lacking faith and enrich its leaders", "Correct: a main criticism."],
      ["It teaches that the Bible forbids all giving to a church or to the poor", "This is not what critics say."],
      ["It requires that no believer owns any property or land at all, ever", "This is not what critics say."],
      ["It agrees with every other Christian teaching on wealth and giving, in full", "Critics say it differs from much Christian teaching."],
    ],
    answer: "A",
    hints: ["Remember the critics' concerns about the poor and about leaders."],
    explanation: "Critics say that the prosperity gospel may **blame the poor or sick** and can enrich leaders; supporters stress hope and enterprise.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best sums up religious teaching on wealth?",
    options: [
      ["Wealth is not condemned, but greed is; it is a trust to be shared", "Correct: the common teaching."],
      ["Wealth is always wrong and every believer must give away everything they own", "The religions do not teach this."],
      ["Wealth is a sign that God approves of the person, and poverty a sign of God's anger", "The religions do not teach that poverty shows God's anger."],
      ["Wealth is not a matter for religion, which only teaches about worship", "The religions teach about work and wealth."],
    ],
    answer: "A",
    hints: ["Look for the answer that includes both honest wealth and the warning about greed."],
    explanation: "The religions teach that wealth is a **trust** to be used honestly and shared, and they warn against greed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zakat is one of the Five Pillars of Islam.",
    answer: true,
    explanation: "True. Zakat is the pillar of obligatory giving, usually 2.5% of qualifying savings held for a lunar year.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All Christians agree that giving to the church guarantees wealth.",
    answer: false,
    explanation: "False. The prosperity gospel teaches this, but many Christians reject it or accept only part of it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its religion or meaning.",
    pairs: [["Tzedakah", "Jewish charitable giving as justice and duty"], ["Zakat", "Obligatory giving by Muslims"], ["Tithe", "A tenth of income given to a religious cause"], ["Zunde ramambo", "The chief's communal field, kept for the needy"]],
    explanation: "Each term is explained in the lesson.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The belief that wealth belongs to God and people are trustees is called {{blank:a}}; Paul says the love of {{blank:b}} is a root of all kinds of evil (1 Timothy 6:10).",
    blanks: [
      { id: "a", accepted: ["stewardship"], choices: ["stewardship", "initiation", "pilgrimage", "sacrifice"] },
      { id: "b", accepted: ["money"], choices: ["money", "family", "learning", "nature"] },
    ],
    explanation: "**Stewardship**; the love of **money**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name for the chief's communal field whose harvest is stored for the needy? (two words, Shona)",
    accepted: ["Zunde ramambo", "Zunde"],
    wrong: ["Mutupo", "Bira"],
    explanation: "The **zunde ramambo** is the chief's communal field.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** ways in which religions teach believers to share wealth.",
    points: ["Giving a tithe or offering", "Zakat, sadaqah or tzedakah", "Sharing food and work with neighbours, as in the nhimbe or zunde ramambo"],
    modelAnswer: "Believers share wealth by giving a tithe or offering, by zakat, sadaqah or tzedakah, and by sharing food and work with neighbours as in the nhimbe or zunde ramambo.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why religions teach that hard work is important.",
    points: [
      ["Work is part of God's plan", 1],
      ["Developed: Genesis 2:15 shows people put in the garden to work it, so work is a duty and not a punishment", 1],
      ["Work supports the family and others", 1],
      ["Developed: a family that works can feed itself and share with the needy, so laziness harms the community", 1],
    ],
    modelAnswer: "Work is part of God's plan: Genesis 2:15 shows people put in the garden to work it, so work is a duty. Work also supports the family and others, because a family that works can feed itself and share with the needy, while laziness harms the community.",
    hints: ["Give a reason from scripture and a reason from family or community life."],
    explanation: "One mark for each reason and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** criticisms of the prosperity gospel.",
    points: [
      ["It may blame the poor or sick", 1],
      ["Developed: if blessing is said to follow faith and giving, poor or sick believers may be told they lack faith, which causes shame and guilt", 2],
      ["It may benefit leaders more than members", 1],
      ["Developed: members may give beyond their means while leaders become wealthy, and critics say this exploits the poor", 2],
    ],
    modelAnswer: "Critics say it may blame the poor or sick. If blessing is said to follow faith and giving, poor or sick believers may be told they lack faith, which causes shame and guilt. They also say it may benefit leaders more than members, because members may give beyond their means while leaders become wealthy, which critics say exploits the poor.",
    hints: ["Give one criticism about believers and one about leaders."],
    explanation: "Two criticisms, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional church newsletter in Masvingo, 2026",
      "This month our congregation reminds members of the old teaching: work honestly, give generously and do not trust in money. Our youth group will help widows to plough their fields in a nhimbe on the first Saturday. The tithes and offerings of the church will pay school fees for six children. As Paul wrote, the love of money is a root of all kinds of evil, but we are called to use what we have for the good of others."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what will the youth group do?",
        options: [
          ["Help widows to plough their fields", "Correct: this is stated."],
          ["Collect tithes from the members of the church", "The source gives this task to the church."],
          ["Run a shop to make a profit", "The source does not say this."],
          ["Pay the pastor's salary", "The source does not say this."],
        ],
        answer: "A", explanation: "The youth group will help widows to plough their fields in a nhimbe.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** teachings or actions of the congregation.",
        points: ["Work honestly, give generously and do not trust in money", "The youth group helps widows in a nhimbe", "Tithes and offerings pay school fees for six children"],
        modelAnswer: "The congregation teaches members to work honestly, give generously and not trust in money. The youth group helps widows in a nhimbe, and tithes and offerings pay school fees for six children.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the newsletter in Source A combines Christian teaching with Zimbabwean community values.",
        points: [["The Christian teaching on work and giving (2 Thessalonians 3:10 and tithing)", 1], ["The warning about love of money from 1 Timothy 6:10", 1], ["The nhimbe, a community tradition of shared work", 1], ["Both aim to help the needy, so teaching and tradition support each other", 1]],
        modelAnswer: "The newsletter teaches Christian values of honest work and giving, including tithing, and quotes the warning about love of money from 1 Timothy 6:10. It uses the nhimbe, a community tradition of shared work. Both aim to help the needy, so teaching and tradition support each other.",
      }),
    ],
    hints: ["In (c) name the Christian idea and the traditional practice."],
    explanation: "The source links Christian teaching with the community tradition of the nhimbe.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Chipo says: \"Religious teaching encourages people to work hard and be generous.\" Themba says: \"Some religious teaching about money has harmed the poor.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** religious teachings on wealth or giving.",
        points: [["A first teaching, with the religion", 2, ["Islam: zakat is a pillar for the needy", "Christianity: tithes and offerings; the love of money is a root of evil", "Judaism: tzedakah is a duty; leave the edges of fields for the poor", "Indigenous Religion: sharing through nhimbe and the zunde ramambo"]], ["A second teaching, from a different religion", 2]],
        modelAnswer: "In Islam, zakat is a pillar of the faith, usually 2.5% of qualifying savings held for a lunar year, given to help the needy. In Judaism, tzedakah is a duty, regarded as justice, and Leviticus 19:9-10 tells farmers to leave the edges of fields for the poor.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Chipo and Themba.",
        points: [
          ["Chipo: the religions teach honest work (Genesis 2:15; Qur'an 62:10) and giving (zakat, tzedakah, tithes)", 2],
          ["Developed: religious bodies run feeding schemes, schools and clinics for the poor", 1],
          ["Themba: the prosperity gospel, if misused, may blame the poor and enrich leaders", 2],
          ["Developed: belief that poverty shows lack of faith can add to shame, and some leaders have exploited followers", 1],
          ["A supported conclusion, for example that the main teaching helps but its misuse can harm", 2],
        ],
        levels: levels(8),
        modelAnswer: "Chipo is right that the religions teach honest work, such as Genesis 2:15 and Qur'an 62:10, and generous giving through zakat, tzedakah and tithes. Religious bodies run feeding schemes, schools and clinics for the poor.\n\nThemba is right that the prosperity gospel, if misused, may blame the poor and enrich leaders. A belief that poverty shows lack of faith can add to shame, and some leaders have exploited followers. I think the main teaching of the religions helps the poor, but its misuse by some leaders can harm, so believers need to examine what they are taught.",
        explanation: "Level marking: both views developed, with examples, and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give examples of help and of harm before judging."],
    explanation: "Practice question on the effects of religious teaching about wealth.",
  });

  b.card("DEFINITION", "What is stewardship?", "The belief that wealth and the earth belong to God, and people are trustees who must use them responsibly and share them.");
  b.card("DEFINITION", "What is the prosperity gospel?", "Teaching in some churches that faith, positive confession and generous giving lead to health and wealth.");
  b.card("FACT", "Which Bible verse says that the love of money is a root of all kinds of evil?", "1 Timothy 6:10.");
  b.card("FACT", "Which verse says that a person who will not work should not eat?", "2 Thessalonians 3:10.");
  b.card("FACT", "What is zakat and how much is it usually?", "Obligatory giving by Muslims, usually 2.5% of qualifying savings held for a lunar year.");
  b.card("FACT", "What are the nhimbe and the zunde ramambo?", "The nhimbe is a work party of neighbours; the zunde ramambo is the chief's communal field for the needy.");
  b.card("CONCEPT", "Do the religions condemn wealth?", "No. They condemn greed and the love of money, and teach honest earning and sharing.");
  b.card("CONCEPT", "What do critics of the prosperity gospel say?", "It may blame the poor or sick for lacking faith and can enrich leaders while members give beyond their means.");
});
