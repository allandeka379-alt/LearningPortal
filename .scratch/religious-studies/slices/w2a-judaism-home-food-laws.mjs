// W2a: The Jewish home and food laws.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.home-food-laws", { file: "judaism/home-food-laws", keyPrefix: "judaism.home-food-laws" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word **kosher** mean?",
    options: [
      ["Fit or permitted food", "Correct: it describes food that follows the laws of kashrut."],
      ["Food blessed by a rabbi", "Kosher means that food follows the laws; it is not a blessing."],
      ["Food eaten only on Shabbat", "Kosher food may be eaten on any day."],
      ["Food that is forbidden", "Forbidden food is treif."],
    ],
    answer: "A",
    explanation: "**Kosher** means \"fit\": food that follows the dietary laws. Food that does not is called **treif**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where are the main Jewish dietary laws found in the Torah?",
    options: [
      ["Leviticus 11 and Deuteronomy 14", "Correct: they list the permitted and forbidden animals."],
      ["Genesis 1 and Genesis 2", "These chapters tell of creation."],
      ["Exodus 3 and Exodus 12", "These chapters tell of the burning bush and the first Passover."],
      ["Psalm 23 and Proverbs 31 of the Writings", "These are in the Writings and are not the food laws."],
    ],
    answer: "A",
    explanation: "The food laws are in **Leviticus 11** and **Deuteronomy 14**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which land animal is kosher according to the rule in Leviticus 11?",
    options: [
      ["A cow, which chews the cud and has split hooves", "Correct: it meets both tests."],
      ["A pig, which has split hooves but does not chew the cud", "A pig does not chew the cud, so it is not kosher."],
      ["A camel, which chews the cud but does not have split hooves", "A camel fails the hoof test."],
      ["A rabbit, which does not have split hooves", "A rabbit is not kosher."],
    ],
    answer: "A",
    explanation: "A kosher land animal must **chew the cud and have split hooves**. Cattle, sheep and goats meet both tests.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do observant Jewish families keep separate dishes for meat and dairy?",
    options: [
      ["Meat and milk are kept apart, following Exodus 23:19", "Correct: the separation is a central part of kashrut."],
      ["Jews believe that dairy food is unclean and must never be eaten", "Dairy foods may be eaten; only the mixing with meat is avoided."],
      ["The law of Zimbabwe requires separate dishes in every religious home", "The practice comes from Jewish law, not civil law."],
      ["Meat dishes are used only on Shabbat and dairy only on weekdays", "The separation is not by day."],
    ],
    answer: "A",
    explanation: "Meat and milk are not cooked or eaten together. Many observant homes have separate sets of dishes and utensils.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is shechitah?",
    options: [
      ["The Jewish method of slaughter by a trained person", "Correct: a shochet makes a swift cut with a very sharp knife."],
      ["The ceremony of lighting candles on Friday evening", "That is the lighting of Shabbat candles."],
      ["The blessing of bread at the start of a festival meal", "That is a blessing over bread."],
      ["The rule that blood may not be eaten at any meal", "That is a related rule; shechitah is the method of slaughter."],
    ],
    answer: "A",
    explanation: "**Shechitah** is kosher slaughter by a trained **shochet**, with one swift cut; the blood is then drained.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha is cooking for her Jewish friend's family. Which meal would suit a family that keeps kosher?",
    options: [
      ["Grilled tilapia with vegetables and rice", "Correct: fish with fins and scales and vegetables are acceptable (with kosher preparation)."],
      ["Pork sausages with maize meal", "Pork is forbidden."],
      ["Beef stew served with a thick cream sauce", "Meat and milk may not be mixed."],
      ["Prawns in butter with rice", "Shellfish are forbidden."],
    ],
    answer: "A",
    hints: ["Rule out pork, shellfish and meat mixed with milk."],
    explanation: "Fish with fins and scales is permitted, and fish is parve (neither meat nor dairy). Pork, shellfish and meat with cream are not.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best describes the reasons Jews give for keeping the food laws?",
    options: [
      ["Mainly obedience to God, with reasons such as holiness, compassion and identity", "Correct: it reflects the variety of reasons without choosing one."],
      ["Only that the foods forbidden are dangerous to health", "Health is only one reason some Jews give."],
      ["Only that the laws were made by the government of the country", "The laws come from the Torah."],
      ["That they were created for a time of hunger long ago and no longer have any meaning today", "Jews who keep the laws say they continue to have meaning."],
    ],
    answer: "A",
    hints: ["The main reason is that the Torah commands it."],
    explanation: "The Torah gives no single reason. Jews mention **obedience**, holiness and self-discipline, compassion for animals, identity and sometimes health.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which comparison of Jewish groups on kashrut is accurate?",
    options: [
      ["Many Orthodox Jews keep the laws strictly; many Reform Jews treat them as a personal choice", "Correct: it states the variety without ranking."],
      ["All Jews keep exactly the same food laws in the same way, whichever movement they belong to", "Practice varies widely."],
      ["Only Reform Jews believe the food laws are part of the Torah", "All groups know the laws are in the Torah; they differ in how they apply them."],
      ["Orthodox Jews keep no food laws while Reform Jews keep all of them", "This reverses the facts."],
    ],
    answer: "A",
    hints: ["Use the words many Orthodox and many Reform."],
    explanation: "Many **Orthodox** Jews keep strictly; many **Conservative** Jews keep with some differences; many **Reform** Jews leave it to personal choice.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Jewish dietary laws forbid eating pork.",
    answer: true,
    explanation: "True. The pig has split hooves but does not chew the cud, so it is not kosher.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a kosher kitchen, fruit and vegetables must be kept separate from both meat and dairy dishes.",
    answer: false,
    explanation: "False. Fruit, vegetables, eggs and grains are parve (neutral) and may be eaten with meat or dairy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [["Kashrut", "the Jewish dietary laws"], ["Treif", "food that is not kosher"], ["Parve", "food that is neither meat nor dairy"], ["Mezuzah", "a small case with the Shema on the doorpost"]],
    explanation: "Kashrut: dietary laws. Treif: forbidden food. Parve: neutral food. Mezuzah: doorpost case with the Shema.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Fish are kosher only if they have {{blank:a}} and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["fins"], choices: ["fins", "shells", "claws", "horns"] },
      { id: "b", accepted: ["scales"], choices: ["scales", "feathers", "hooves", "whiskers"] },
    ],
    explanation: "Kosher fish have **fins and scales**. Shellfish are not kosher.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A mezuzah is fixed to the {{blank:a}} of a Jewish home, in obedience to Deuteronomy {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["doorposts"], choices: ["doorposts", "windows", "roof", "kitchen table"] },
      { id: "b", accepted: ["6"], choices: ["1", "6", "14", "20"] },
    ],
    hints: ["The Shema is in Deuteronomy 6 and tells parents to write the words on their doorposts."],
    explanation: "The mezuzah is on the **doorposts** (Deuteronomy **6**:9).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Hebrew word for food that is not kosher.",
    accepted: ["treif", "treife", "tereifah", "trayf", "treifah"],
    wrong: ["kosher", "parve"],
    explanation: "Food that is not kosher is called **treif**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** rules of kashrut.",
    points: ["Only land animals that chew the cud and have split hooves may be eaten", "Only fish with fins and scales may be eaten; shellfish are forbidden", "Meat and milk are not mixed; blood is not eaten; animals are killed by shechitah"],
    modelAnswer: "Only land animals that chew the cud and have split hooves may be eaten. Only fish with fins and scales are permitted, and shellfish are forbidden. Meat and milk must not be mixed, and animals must be slaughtered by shechitah.",
    explanation: "One mark for each rule.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how the home is a centre of Jewish religious life.",
    points: [
      ["A mezuzah on the doorposts shows that the home is dedicated to God", 1],
      ["The family keeps Shabbat and festival meals with candles, wine and bread", 1],
      ["Parents teach children prayers, the Shema and the festival stories", 1],
      ["Blessings are said over food and the kitchen follows the food laws", 1],
    ],
    modelAnswer: "A mezuzah on the doorposts shows that the home is dedicated to God. The family keeps Shabbat and festival meals with candles, wine and bread. Parents teach children prayers, the Shema and the festival stories, and blessings are said over food while the kitchen follows the food laws.",
    hints: ["Think of the doorway, the table, the children and the kitchen."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why Jews keep the dietary laws.",
    points: [
      ["It is obedience to God's commandments in the Torah (Leviticus 11; Deuteronomy 14)", 1],
      ["Developed: for many Jews the main reason is that God commanded it, so keeping the laws is an act of faith", 2],
      ["The laws build identity and community", 1],
      ["Developed: eating differently marks Jews as a people with their own tradition, and kosher meals bring the community together", 2],
    ],
    modelAnswer: "Jews keep the dietary laws as obedience to God's commandments in the Torah, and for many the main reason is that God commanded it, so keeping the laws is an act of faith. The laws also build identity and community, since eating differently marks Jews as a people with their own tradition and kosher meals bring the community together.",
    hints: ["Choose obedience and one other reason; develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students in a school in Marondera, 2026",
      "Tafadzwa: Why does your family have two sets of dishes?\nMiriam: One is for meat and the other for dairy. We do not mix them. We also don't eat pork or prawns, and our meat is slaughtered by a trained person called a shochet.\nTafadzwa: Is it for health?\nMiriam: Some people say so. For us the main reason is that the Torah commands it."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the person called who slaughters the meat, according to Source A?",
        options: [
          ["A shochet", "Correct: Miriam names the trained person who slaughters the meat."],
          ["A mohel", "A mohel performs circumcisions."],
          ["A cantor", "A cantor leads the singing of prayers."],
          ["A sofer", "A sofer is a scribe who writes Torah scrolls."],
        ],
        answer: "A", explanation: "The trained slaughterer is a shochet.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** food rules that Miriam's family keeps.",
        points: ["They keep separate dishes for meat and dairy and do not mix them", "They do not eat pork or prawns", "Their meat is slaughtered by a trained shochet"],
        modelAnswer: "They keep separate dishes for meat and dairy and do not mix them; they do not eat pork or prawns; and their meat is slaughtered by a trained shochet.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain Miriam's main reason for keeping these rules and give one other reason Jews may give.",
        points: [["The main reason is that the Torah commands it (obedience to God)", 1], ["Another reason is holiness and self-discipline, or compassion for animals", 1], ["Another reason is identity and community, or health for some", 1]],
        modelAnswer: "The main reason is that the Torah commands it, so keeping the laws is obedience to God. Other Jews add holiness and self-discipline, compassion for animals, and the identity of the community.",
      }),
    ],
    hints: ["In (c) use Miriam's own words, then add a second reason."],
    explanation: "The source shows the separation of meat and dairy, forbidden foods and shechitah, and the main reason.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Chipo says: \"In a modern country there is no need to keep ancient food laws.\" David says: \"Keeping kosher is a way of living the faith every day.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe **two** ways in which Jewish children are taught their faith at home.",
        points: [["Parents teach the Shema and prayers, as commanded in Deuteronomy 6", 2], ["Families tell the stories of the festivals and keep Shabbat meals together", 2]],
        modelAnswer: "Parents teach children the Shema and prayers, as commanded in Deuteronomy 6. Families also tell the festival stories, such as the Exodus at Pesach, and keep Shabbat meals together.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain the importance of shechitah to Jews.",
        points: [["It follows the rules of the Torah and is done by a trained shochet", 2], ["It is meant to cause as little suffering as possible and drain the blood, showing respect for life", 2]],
        modelAnswer: "Shechitah follows the rules of the Torah and is done by a trained shochet. It is meant to cause as little suffering as possible and to drain the blood, which shows respect for life.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Jews no longer need to keep the ancient dietary laws.",
        points: [["For: some Jews, such as many Reform Jews, regard the details as a matter of choice, and keeping kosher can be difficult where few Jews live", 2], ["Against: for many Orthodox and Conservative Jews the laws are God's commandments and still bind", 2], ["Against: the laws build identity, discipline and community, and show respect for life", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Some Jews, such as many Reform Jews, treat the details of kashrut as a personal choice, and keeping kosher can be difficult in places where few Jews live. However, many Orthodox and Conservative Jews regard the laws as God's commandments, which still bind. The laws also build identity, discipline and community and show respect for life. I conclude that the laws are less central for some Jews, but remain a living practice that gives daily meaning to the faith of many others.",
      }),
    ],
    hints: ["Give the view of those who keep the laws, those who do not, and your judgement."],
    explanation: "A strong answer shows differences among Jews and judges the relevance of the laws.",
  });

  b.card("DEFINITION", "What is **kashrut**?", "The Jewish dietary laws, based on Leviticus 11 and Deuteronomy 14.");
  b.card("DEFINITION", "What do **kosher** and **treif** mean?", "Kosher: fit or permitted food. Treif: food that is not kosher.");
  b.card("FACT", "Which land animals are kosher?", "Those that chew the cud and have split hooves, such as cattle, sheep and goats.", "Pigs, camels and rabbits are not kosher.");
  b.card("FACT", "Which fish are kosher?", "Fish with fins and scales; shellfish are not kosher.");
  b.card("FACT", "What is the rule about meat and milk?", "They are not mixed or eaten together; separate dishes are used.", "Exodus 23:19.");
  b.card("DEFINITION", "What is **shechitah**?", "Kosher slaughter by a trained shochet with a very sharp knife; the blood is drained.");
  b.card("DEFINITION", "What does **parve** mean?", "Neither meat nor dairy, so it can be eaten with either: fruit, vegetables, eggs.");
  b.card("FACT", "What is a mezuzah and where does the command come from?", "A case with the Shema on the doorposts of a Jewish home; Deuteronomy 6:9.");
  b.card("CONCEPT", "What reasons do Jews give for keeping kosher?", "Obedience to God; holiness and self-discipline; compassion for animals; identity and community; sometimes health.");
});
