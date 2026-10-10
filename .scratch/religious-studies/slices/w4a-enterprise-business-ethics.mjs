// W4a: Religion and business ethics. Islamic finance is described in outline only.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.enterprise.business-ethics", { file: "enterprise/business-ethics", keyPrefix: "enterprise.business-ethics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the Arabic word riba mean in Islam?",
    options: [
      ["Interest or unfair gain on a loan", "Correct: it is forbidden."],
      ["A gift given to the poor at the end of Ramadan", "That is zakat al-fitr."],
      ["A business partnership in which profit is shared", "That is permitted profit sharing."],
      ["A payment made to a worker at the end of the week", "That is wages."],
    ],
    answer: "A",
    explanation: "**Riba** means interest or unfair gain on a loan, which Islam forbids (Qur'an 2:275).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which Bible passage commands the use of just scales, weights and measures?",
    options: [
      [ref("Leviticus", 19, "35-36"), "Correct: honest weights and measures."],
      [ref("Deuteronomy", 6, "4-9"), "This passage is the Shema."],
      [ref("Exodus", 20, "1-17"), "This passage is the Ten Commandments."],
      [ref("1 Corinthians", 13, "1-13"), "This passage praises love."],
    ],
    answer: "A",
    explanation: `**${ref("Leviticus", 19, "35-36")}** commands honest scales, weights and measures.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the Torah teach employers about hired workers' wages?",
    options: [
      ["Not to hold back a worker's wages overnight", "Correct: pay promptly."],
      ["To pay workers only at the end of the year", "The verse teaches prompt payment."],
      ["To give workers a share of the business profit", "The verse does not say this."],
      ["To employ only members of their own family", "The verse does not say this."],
    ],
    answer: "A",
    explanation: `**${ref("Leviticus", 19, 13)}** teaches that a worker's wages must not be held back.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Qur'an passage warns against those who demand full measure but give less to others?",
    options: [
      [ref("Qur'an", 83, "1-3"), "Correct: the warning about cheating in measure."],
      [ref("Qur'an", 112, "1-4"), "This surah is about God's oneness."],
      [ref("Qur'an", 1), "This is the opening surah."],
      [ref("Qur'an", 2, 183), "This verse prescribes fasting."],
    ],
    answer: "A",
    explanation: `**${ref("Qur'an", 83, "1-3")}** warns against cheating in weights and measures.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do Islamic financial institutions avoid charging interest?",
    options: [
      ["They use profit sharing and sale at an agreed price", "Correct: profit sharing and cost-plus sale."],
      ["They lend money only to people who do not need the money at all", "This is not how they work."],
      ["They give money away to anyone who asks for it", "They are businesses and expect a return."],
      ["They charge a higher rate of interest than banks", "They do not charge interest."],
    ],
    answer: "A",
    explanation: "Islamic finance uses **profit-and-loss sharing** and **cost-plus sale** instead of interest.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Chipo keeps her scale accurate because she remembers a Bible command about honest scales and her grandmother's saying that cheating shames the family. Which teachings does she use?",
    options: [
      ["A scripture teaching and the community value of unhu", "Correct: religion and tradition together."],
      ["The Islamic pillar of Zakat and the practice of Hajj", "These are not the teachings she mentions."],
      ["The Jewish festival of Pesach and the duty of tithing", "These are not the teachings she mentions."],
      ["The Christian season of Lent and the practice of fasting", "These are not the teachings she mentions."],
    ],
    answer: "A",
    hints: ["Look at the two sources she names: a Bible verse and her grandmother."],
    explanation: "Chipo uses **scripture** (Leviticus 19:35-36) and the **community value** of unhu that cheating shames the family.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which view of interest do most Jews and Christians hold today, compared with Islam?",
    options: [
      ["They accept reasonable interest but condemn exploitation; Islam forbids riba", "Correct: this sums up the difference."],
      ["They forbid all interest in every case while Islam allows it in all cases", "This reverses the position."],
      ["They have no teaching on lending at all, while Islam has detailed rules", "The Bible has teaching on lending."],
      ["They require interest in every loan, while Islam does not mention it", "Islam clearly forbids riba."],
    ],
    answer: "A",
    hints: ["Remember that the Bible warns against exploiting the poor but modern practice differs."],
    explanation: "Most Jews and Christians accept **reasonable interest** and condemn exploitative lending; Islam forbids **riba** as a rule.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reason best explains why religious teachers say honest business is good for business in the long run?",
    options: [
      ["Honesty builds trust and a good name, so customers return", "Correct: trust brings lasting success."],
      ["Honesty always earns the highest profit on every single sale", "Dishonesty may bring a short-term gain."],
      ["Honesty means that a business never has to compete with others", "Competition still exists."],
      ["Honesty is required by law in every country in the same way", "Laws differ."],
    ],
    answer: "A",
    hints: ["Think about customers who come back."],
    explanation: "Honest business builds **trust and reputation**, so customers return, though dishonesty may bring short-term gains.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Islam permits trade but forbids riba (Qur'an 2:275).",
    answer: true,
    explanation: "True. Qur'an 2:275 teaches that God has permitted trade and forbidden riba.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Bible and the Qur'an both condemn the use of false weights and measures.",
    answer: true,
    explanation: "True. Leviticus 19:35-36 and Proverbs 11:1 in the Bible, and Qur'an 83:1-3, condemn cheating in measure.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reference with its teaching.",
    pairs: [["Leviticus 19:35-36", "Use just scales, weights and measures"], ["Leviticus 19:13", "Do not hold back a worker's wages overnight"], ["Qur'an 2:275", "God permits trade and forbids riba"], ["Qur'an 7:56", "Do not spread corruption on earth"]],
    explanation: "Each reference is explained in the lesson.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Protecting buyers from cheating is called consumer {{blank:a}}; in Islam, interest on a loan is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["protection"], choices: ["protection", "pilgrimage", "sacrifice", "initiation"] },
      { id: "b", accepted: ["riba"], choices: ["riba", "zakat", "waqf", "sadaqah"] },
    ],
    explanation: "Consumer **protection**; **riba**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the duty of a business to benefit society as well as its owners called? (two words)",
    accepted: ["Social responsibility", "Corporate social responsibility"],
    wrong: ["Private profit", "Tithing"],
    explanation: "**Social responsibility** is the duty of a business to benefit society as well as its owners.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** ways in which a business can show honesty towards customers.",
    points: ["Using accurate scales and measures", "Charging fair and honest prices", "Selling safe goods and not making false claims"],
    modelAnswer: "A business can use accurate scales and measures, charge fair and honest prices, and sell safe goods without making false claims.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** teachings of religion about the treatment of workers.",
    points: [
      ["Workers must be paid promptly (Leviticus 19:13)", 1],
      ["Developed: holding back wages harms a worker who depends on them to feed a family", 1],
      ["Workers should not be oppressed (Deuteronomy 24:14-15; James 5:4)", 1],
      ["Developed: the poor and hired workers deserve fair treatment and dignity, and God hears their complaint", 1],
    ],
    modelAnswer: "Workers must be paid promptly (Leviticus 19:13), because holding back wages harms a worker who depends on them to feed a family. Workers must not be oppressed (Deuteronomy 24:14-15; James 5:4), because the poor and hired workers deserve fair treatment and dignity, and God hears their complaint.",
    hints: ["Give a teaching and say what it means for an employer."],
    explanation: "One mark for each teaching and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which Islamic teaching affects how Muslims do business.",
    points: [
      ["Riba (interest) is forbidden", 1],
      ["Developed: Muslims may use Islamic finance based on profit sharing or sale at an agreed price instead of a loan with interest", 2],
      ["Honest trade is required (Qur'an 83:1-3)", 1],
      ["Developed: a Muslim trader must use fair measures and not cheat customers, and zakat is paid on business wealth to help the needy", 2],
    ],
    modelAnswer: "Riba is forbidden, so Muslims may use Islamic finance based on profit sharing or sale at an agreed price instead of a loan with interest. Honest trade is also required by Qur'an 83:1-3. A Muslim trader must use fair measures and not cheat customers, and zakat is paid on business wealth to help the needy.",
    hints: ["Give one point about finance and one about honesty or giving."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional business column in a newspaper in Chinhoyi, 2026",
      "A local bakery owner, Mr Tafadzwa Ncube, said that he pays his workers on the last day of every month and gives them a day off on Sundays. \"I was taught in church that a worker's wages must not be held back,\" he said. \"And I have learned that workers who are treated well work better.\" He added that the bakery sets aside a small part of its profit to give bread to the local primary school."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, when does the bakery owner pay his workers?",
        options: [
          ["On the last day of every month", "Correct: this is stated."],
          ["At the end of every week", "The source says monthly."],
          ["Only when the business makes a profit", "The source does not say this."],
          ["At the beginning of every year", "The source does not say this."],
        ],
        answer: "A", explanation: "The owner pays his workers on the last day of every month.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the bakery does for workers or the community.",
        points: ["Pays workers on the last day of every month", "Gives workers a day off on Sundays", "Sets aside part of its profit to give bread to the primary school"],
        modelAnswer: "The bakery pays workers on the last day of every month, gives them a day off on Sundays, and sets aside part of its profit to give bread to the local primary school.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the owner's practices in Source A reflect religious teaching on business.",
        points: [["Paying wages on time follows Leviticus 19:13 and James 5:4", 1], ["A day of rest follows the Sabbath principle that workers also rest (Exodus 20:10)", 1], ["Giving bread to the school shows social responsibility", 1], ["Treating workers well shows dignity and builds loyalty", 1]],
        modelAnswer: "Paying wages on time follows Leviticus 19:13 and James 5:4. A day of rest follows the Sabbath principle that workers also rest (Exodus 20:10). Giving bread to the school shows social responsibility, and treating workers well shows dignity and builds loyalty.",
      }),
    ],
    hints: ["In (c) link each practice to a teaching."],
    explanation: "The source shows fair wages, rest and social responsibility.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nokuthula says: \"Business owners should always put honesty before profit.\" Farai says: \"A business that is too honest cannot survive when others cheat.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** religious teachings about honest trade.",
        points: [["A first teaching, with the reference or religion", 2, ["Judaism and Christianity: just scales and weights (Leviticus 19:35-36)", "Islam: do not cheat in measure (Qur'an 83:1-3)", "Indigenous Religion: cheating shames the family (unhu)"]], ["A second teaching, from a different religion", 2]],
        modelAnswer: "Leviticus 19:35-36 commands the use of honest scales, weights and measures, so a trader must not cheat customers. Qur'an 83:1-3 warns those who demand full measure but give less to others.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Nokuthula and Farai.",
        points: [
          ["Nokuthula: religions teach that honesty is a duty and that cheating harms customers and the cheat's own integrity", 2],
          ["Developed: honest business builds trust and a good reputation, so customers return", 1],
          ["Farai: some competitors cheat and may undercut honest traders or win contracts through bribes", 2],
          ["Developed: honest traders may lose sales in the short term, but the law and customers may protect them", 1],
          ["A supported conclusion", 2],
        ],
        levels: levels(8),
        modelAnswer: "Nokuthula is right that religions teach that honesty is a duty and that cheating harms customers. Honest business also builds trust and a good reputation, so customers return.\n\nFarai is right that some competitors cheat and may undercut honest traders or win contracts through bribes, and honest traders may lose sales in the short term. However, the law and customers may protect them. I think honesty should come first, because religious teaching treats it as a duty and trust brings lasting success, though honest traders may need support from fair laws.",
        explanation: "Level marking: both views developed and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give the short-term and long-term effects of honesty."],
    explanation: "Practice question on honesty and profit.",
  });

  b.card("DEFINITION", "What is business ethics?", "The moral principles that guide how a business behaves towards customers, workers, competitors and the community.");
  b.card("DEFINITION", "What is riba?", "Interest or unfair gain on a loan, which Islam forbids (Qur'an 2:275).");
  b.card("DEFINITION", "What is social responsibility?", "The duty of a business to benefit society as well as its owners.");
  b.card("FACT", "Which verse commands just scales, weights and measures?", "Leviticus 19:35-36.", "Qur'an 83:1-3 warns against cheating in measure.");
  b.card("FACT", "Which verse says wages must not be held back overnight?", "Leviticus 19:13.");
  b.card("CONCEPT", "How do Islamic banks avoid interest?", "By profit-and-loss sharing and by buying an item and selling it at an agreed price (cost-plus).");
  b.card("CONCEPT", "What do most Jews and Christians today teach about interest?", "Reasonable interest is accepted, but exploitation of the poor through loans is condemned.");
  b.card("CONCEPT", "Why is honest business good for business in the long run?", "It builds trust and a good reputation, so customers return.");
});
