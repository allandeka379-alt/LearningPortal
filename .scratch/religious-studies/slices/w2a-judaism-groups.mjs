// W2a: Groups within Judaism.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.groups", { file: "judaism/groups", keyPrefix: "judaism.groups" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which three are the main movements of Judaism described in this lesson?",
    options: [
      ["Orthodox, Conservative and Reform", "Correct: these are the three main religious movements."],
      ["Ashkenazi, Sephardi and Mizrahi", "These are cultural traditions, not movements."],
      ["Pharisees, Sadducees and Essenes", "These were groups in the time of the Second Temple."],
      ["Levites, kohanim and the Israelites of old", "These are groupings from Temple times."],
    ],
    answer: "A",
    explanation: "The main movements are **Orthodox**, **Conservative (Masorti)** and **Reform (Progressive, Liberal)**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does halakhah mean?",
    options: [
      ["Jewish law", "Correct: the body of rules based on the Torah and Talmud."],
      ["A prayer shawl with fringes", "That is the tallit."],
      ["The Jewish marriage contract", "That is the ketubah."],
      ["The Hebrew Bible", "That is the Tanakh."],
    ],
    answer: "A",
    explanation: "**Halakhah** is Jewish law, which guides daily life.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best describes Orthodox Judaism?",
    options: [
      ["It holds that the Torah is from God and that halakhah binds", "Correct: this is the core Orthodox view."],
      ["It leaves each person free to decide for themselves which laws to keep", "That is more typical of Reform Judaism."],
      ["It has no connection with the Torah and the Talmud", "Orthodox Jews study both closely."],
      ["It ordains women as rabbis in all its synagogues", "Orthodox synagogues have male rabbis."],
    ],
    answer: "A",
    explanation: "**Orthodox** Jews hold that the written and oral Torah are from God and that halakhah remains binding.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the difference between Ashkenazi and Sephardi Jews?",
    options: [
      ["They come from different regions: central and eastern Europe, and Spain and the Mediterranean", "Correct: they are cultural traditions with their own customs."],
      ["Ashkenazi Jews belong only to Orthodox synagogues and Sephardi Jews belong only to Reform synagogues", "Both traditions exist within every movement."],
      ["Ashkenazi Jews follow the Torah and Sephardi Jews follow the Talmud", "Both follow the Torah and the Talmud."],
      ["Ashkenazi Jews are religious and Sephardi Jews are secular", "Both traditions include religious and secular Jews."],
    ],
    answer: "A",
    explanation: "**Ashkenazi** and **Sephardi** are cultural traditions with different languages (Yiddish, Ladino), melodies and customs. Both occur in all movements.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which group began in eighteenth-century eastern Europe and stresses joy in prayer and devotion to a spiritual leader?",
    options: [
      ["Hasidic Judaism", "Correct: it is a stream within Haredi Judaism."],
      ["Reform Judaism", "Reform began in Germany in the early nineteenth century."],
      ["Secular Judaism", "Secular Jews do not follow the religious law."],
      ["Masorti Judaism", "Masorti is another name for Conservative Judaism."],
    ],
    answer: "A",
    explanation: "**Hasidic** Judaism began in eastern Europe in the eighteenth century.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula visits a synagogue where families sit together, a woman is the rabbi and part of the service is in English. Which group is the congregation most likely to belong to?",
    options: [
      ["A Reform (Progressive) congregation", "Correct: mixed seating, a woman rabbi and local language are typical of Reform synagogues."],
      ["A Haredi (ultra-Orthodox) congregation", "Haredi synagogues have separate seating and male rabbis."],
      ["A Hasidic congregation", "Hasidic synagogues have separate seating and male leaders."],
      ["A Sephardi congregation only", "Sephardi is a cultural tradition and can be found in any movement."],
    ],
    answer: "A",
    hints: ["Think of which movements ordain women and use the local language."],
    explanation: "Mixed seating, a woman rabbi and some use of the local language are typical of **Reform** (and, in part, Conservative) congregations.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which approach is correct for a Religious Studies answer about the groups within Judaism?",
    options: [
      ["Describe how each group understands the Torah and practice, without ranking them", "Correct: the subject is non-confessional."],
      ["State that Orthodox Judaism is the only true form of Judaism because it is the oldest of the groups", "A Religious Studies answer does not rank groups."],
      ["State that Reform Judaism is more modern and so more correct", "This is a ranking."],
      ["Leave out the secular Jews because they are not really Jewish", "Secular Jews belong to the Jewish people."],
    ],
    answer: "A",
    hints: ["The syllabus asks for description without ranking."],
    explanation: "A Religious Studies answer **describes** the groups as their members see themselves and never ranks them.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of these best explains why Jewish groups differ on practices such as the Sabbath and the food laws?",
    options: [
      ["They differ on how far the Torah's laws bind today and who may interpret them", "Correct: the groups differ in how they understand the authority of halakhah."],
      ["They follow different gods and different holy books, so they cannot agree on anything", "All the groups worship one God and honour the Torah."],
      ["They live in countries which forbid them from keeping the same laws", "The differences exist in the same country, too."],
      ["Their rabbis have never studied the Talmud or the Torah", "Rabbis of all groups study the Torah and Talmud."],
    ],
    answer: "A",
    hints: ["The difference lies in the authority given to halakhah."],
    explanation: "The groups share one God and one Torah, but differ on **how binding** halakhah is and how it is interpreted.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Orthodox, Conservative and Reform are all movements within Judaism.",
    answer: true,
    explanation: "True. Each has its own approach to the Torah, worship and daily life.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A secular Jew is no longer considered to be Jewish.",
    answer: false,
    explanation: "False. A secular Jew belongs to the Jewish people by family, culture or history, even if they do not follow the religious law.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each group with its description.",
    pairs: [["Orthodox", "holds that halakhah is binding and that the Torah was given by God"], ["Conservative (Masorti)", "holds that halakhah is binding but may develop through study"], ["Reform (Progressive)", "stresses personal decision about which laws to keep"], ["Secular", "identifies as Jewish by family and culture without religious practice"]],
    explanation: "These descriptions are of practice and are not rankings.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Ashkenazi", "Jews of central and eastern European origin"], ["Sephardi", "Jews of Spanish and Portuguese origin"], ["Yiddish", "the language of Ashkenazi Jews"], ["Ladino", "the language of Sephardi Jews"]],
    hints: ["Ladino is of Spanish origin."],
    explanation: "Ashkenazi Jews spoke Yiddish; Sephardi Jews spoke Ladino.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "{{blank:a}} Judaism began in Germany in the early nineteenth century, while {{blank:b}} Judaism began in eastern Europe in the eighteenth century.",
    blanks: [
      { id: "a", accepted: ["Reform"], choices: ["Reform", "Hasidic", "Haredi", "Masorti"] },
      { id: "b", accepted: ["Hasidic"], choices: ["Hasidic", "Reform", "Conservative", "Secular"] },
    ],
    explanation: "Reform: nineteenth-century Germany. Hasidic: eighteenth-century eastern Europe.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "In Orthodox synagogues men and women usually sit {{blank:a}}, and the rabbi is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["separately"], choices: ["separately", "together", "in the gallery only", "in circles"] },
      { id: "b", accepted: ["a man"], choices: ["a man", "a woman", "a cantor", "a priest"] },
    ],
    hints: ["Think of the typical Orthodox synagogue."],
    explanation: "Orthodox practice is **separate seating** and a **male** rabbi.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What other name is used in some countries for Conservative Judaism, meaning \"traditional\"?",
    accepted: ["Masorti", "masorti"],
    wrong: ["Hasidic", "Reform"],
    explanation: "Conservative Judaism is called **Masorti** in many countries.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** groups or traditions within Judaism.",
    points: ["Orthodox Judaism", "Conservative (Masorti) or Reform (Progressive) Judaism", "Ashkenazi or Sephardi tradition, or secular Jews"],
    modelAnswer: "Orthodox Judaism, Reform (Progressive) Judaism and the Sephardi tradition. (Conservative Judaism, Hasidic Judaism and secular Jews are also correct.)",
    explanation: "One mark for each correct group or tradition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** differences between Orthodox and Reform synagogues.",
    points: [
      ["Orthodox synagogues usually have separate seating for men and women; Reform synagogues have mixed seating", 2],
      ["Orthodox rabbis are men; Reform congregations may have women rabbis (or: Orthodox services are mostly in Hebrew, Reform use Hebrew and the local language)", 2],
    ],
    modelAnswer: "Orthodox synagogues usually have separate seating for men and women, while Reform synagogues have mixed seating. Orthodox rabbis are men, while Reform congregations may have women rabbis.",
    hints: ["Give each difference in a sentence that names both groups."],
    explanation: "Two marks for each difference described for both groups.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why Jewish groups have different practices.",
    points: [
      ["They hold different views of how binding the Torah and halakhah are today", 1],
      ["Developed: Orthodox Jews hold that the commandments remain binding, while many Reform Jews hold that each person or generation must interpret them", 2],
      ["They responded in different ways to modern life and to living in different countries", 1],
      ["Developed: for example, Reform Judaism began in Germany when Jews took part in wider society, and wished to change worship and the role of women", 2],
    ],
    modelAnswer: "Jewish groups hold different views of how binding the Torah and halakhah are today. Orthodox Jews hold that the commandments remain binding, while many Reform Jews hold that each generation must interpret them. They also responded differently to modern life: Reform Judaism began in Germany when Jews took part in wider society and wished to change worship and the role of women.",
    hints: ["Give one reason about authority and one about history; develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students, Nokuthula and Rachel, in Bulawayo, 2026",
      "Nokuthula: My cousin's friend is Jewish, but she says her family does not go to the synagogue and eats whatever it likes. Is she really Jewish?\nRachel: Yes. Some Jews are secular. Her family may be Jewish by culture and history. In my synagogue we are Orthodox and keep the Sabbath strictly. My cousin goes to a Reform synagogue where a woman is the rabbi."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what kind of Jew is the cousin's friend?",
        options: [
          ["A secular Jew", "Correct: Rachel says some Jews are secular."],
          ["A Hasidic Jew", "The source does not mention Hasidic Judaism."],
          ["An Orthodox Jew", "Rachel says she herself is Orthodox."],
          ["A Reform rabbi", "The Reform rabbi is at Rachel's cousin's synagogue."],
        ],
        answer: "A", explanation: "Rachel says the friend's family is secular.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** differences or kinds of Jewish identity mentioned.",
        points: ["Secular Jews do not follow religious practice but are Jewish by culture", "Orthodox Jews keep the Sabbath strictly", "Reform synagogues may have a woman as rabbi"],
        modelAnswer: "Secular Jews do not follow religious practice but are Jewish by culture; Orthodox Jews keep the Sabbath strictly; Reform synagogues may have a woman as rabbi.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why a Religious Studies answer should not say that one of these groups is more correct than the others.",
        points: [["The subject describes beliefs and practices as their followers understand them", 1], ["Each group sees its own practice as faithful to Judaism", 1], ["Ranking would be a religious judgement, which the subject does not make", 1]],
        modelAnswer: "The subject describes beliefs and practices as their followers understand them. Each group sees its own practice as faithful to Judaism, and ranking would be a religious judgement that the subject does not make.",
      }),
    ],
    hints: ["In (c) refer to the aims of Religious Studies."],
    explanation: "The source shows secular, Orthodox and Reform Jews and asks for a fair treatment.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Miriam says: \"The different groups weaken Judaism because Jews cannot agree.\" David says: \"The different groups show the strength of Judaism, which has lasted by adapting.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe **two** features of Hasidic or Haredi Judaism.",
        points: [["Hasidic Judaism began in eastern Europe in the eighteenth century and stresses joy in prayer", 2], ["Haredi Jews live more apart from modern society and emphasise Torah study", 2]],
        modelAnswer: "Hasidic Judaism began in eastern Europe in the eighteenth century and stresses joy in prayer and loyalty to a spiritual leader. Haredi Jews live more apart from modern society and emphasise Torah study.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how Jewish groups differ in the role of women.",
        points: [["Orthodox: men are rabbis and women do not count in the minyan", 2], ["Conservative and Reform: women count in the minyan and may be rabbis", 2]],
        modelAnswer: "In Orthodox Judaism men are rabbis and women are not counted in the minyan. In Conservative and Reform Judaism women count in the minyan and may be ordained as rabbis.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that the different groups within Judaism weaken the Jewish people.",
        points: [["For: disagreements over the Torah, conversion or who is a Jew can divide communities", 2], ["Against: all groups share one God, the Torah, the festivals and the Jewish people, so there is unity within diversity", 2], ["Against: adapting to new situations has helped Judaism to survive and has allowed more Jews to find a place", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "There is some truth in the view, because disagreements over the authority of the Torah, conversion or who counts as a Jew can divide communities. However, all groups share belief in one God, the Torah, the festivals and a sense of being one people. The ability to adapt to new situations has also helped Judaism to survive in many countries and has allowed more Jews to find a place within it. On balance the groups reflect a living tradition and do not necessarily weaken it.",
      }),
    ],
    hints: ["Weigh the disagreements against the shared features."],
    explanation: "A strong answer weighs unity and disagreement and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is **halakhah**?", "Jewish law, based on the Torah and Talmud, guiding daily life.");
  b.card("CONCEPT", "What is the Orthodox view of the Torah?", "It was given by God at Sinai and halakhah remains binding.");
  b.card("CONCEPT", "What is the Conservative (Masorti) view?", "Halakhah is binding but may develop through study by rabbis.");
  b.card("CONCEPT", "What is the Reform (Progressive) view?", "Judaism can change with the times; each person decides which laws to keep; women and men have equal roles.");
  b.card("FACT", "Who are Hasidic Jews?", "A stream within Haredi Judaism that began in eighteenth-century eastern Europe and stresses joy in prayer.");
  b.card("DEFINITION", "Who are secular Jews?", "Jews by family, culture or history who do not follow the religious law.");
  b.card("DEFINITION", "Who are Ashkenazi Jews?", "Jews from central and eastern Europe, who spoke Yiddish.");
  b.card("DEFINITION", "Who are Sephardi Jews?", "Jews from Spain, Portugal and the Mediterranean, who spoke Ladino.");
  b.card("CONCEPT", "Why does a Religious Studies answer not rank the groups?", "The subject describes beliefs as their followers understand them and makes no religious judgement.");
});
