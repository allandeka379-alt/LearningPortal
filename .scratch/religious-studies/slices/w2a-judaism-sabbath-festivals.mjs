// W2a: The Sabbath and Jewish festivals.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.sabbath-festivals", { file: "judaism/sabbath-festivals", keyPrefix: "judaism.sabbath-festivals" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When does Shabbat begin?",
    options: [
      ["At sunset on Friday", "Correct: Jewish days begin at sunset, so Shabbat starts on Friday evening."],
      ["At sunrise on Saturday", "Shabbat begins the evening before, not at sunrise."],
      ["At midnight on Sunday", "Sunday is not the Jewish Sabbath."],
      ["At sunset on Thursday", "Shabbat begins on Friday evening."],
    ],
    answer: "A",
    explanation: "Shabbat runs from **Friday sunset to Saturday nightfall**.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which festival remembers the Exodus from Egypt?",
    options: [
      ["Pesach", "Correct: Passover remembers the Exodus."],
      ["Purim", "Purim remembers the rescue of the Jews in the story of Esther."],
      ["Hanukkah", "Hanukkah remembers the rededication of the Temple."],
      ["Sukkot", "Sukkot remembers the shelters in the wilderness."],
    ],
    answer: "A",
    explanation: "**Pesach** (Passover) remembers the Exodus from Egypt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which scripture passage is the basis of the Sabbath commandment?",
    options: [
      ["Exodus 20:8-11", "Correct: the fourth commandment tells Israel to keep the Sabbath day holy."],
      ["Genesis 22", "Genesis 22 is the binding of Isaac."],
      ["Leviticus 11:1-8", "Leviticus 11 lists the clean and unclean animals."],
      ["Esther 9", "Esther 9 tells of the festival of Purim."],
    ],
    answer: "A",
    explanation: "The Sabbath is based on **Genesis 2:1-3** (God rested) and **Exodus 20:8-11** (the commandment).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the purpose of the shofar on Rosh Hashanah?",
    options: [
      ["To call people to repent as the new year begins", "Correct: the ram's horn is blown in the synagogue."],
      ["To signal the start of the Pesach seder meal at the family table", "The seder begins with the Haggadah and kiddush, not with a shofar."],
      ["To light the nine-branched lamp on each night of Hanukkah", "That is the hanukkiah."],
      ["To hold the four species during the festival of Sukkot", "That describes the lulav and etrog."],
    ],
    answer: "A",
    explanation: "On **Rosh Hashanah** the shofar is sounded to call people to examine their lives and repent.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do Jews build a sukkah at Sukkot?",
    options: [
      ["To remember the shelters used in the wilderness", "Correct: it is a hut with a roof of branches in which meals are eaten."],
      ["To store the lamps that are lit on each night of the festival", "It is not a store for lamps."],
      ["To fast in private on the holiest day of the year", "Fasting belongs to Yom Kippur."],
      ["To hold the scroll of Esther before it is read in the synagogue", "The scroll of Esther is read at Purim."],
    ],
    answer: "A",
    explanation: "The **sukkah** recalls the shelters of the Israelites in the wilderness and the harvest.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Miriam's family fasts for about 25 hours, spends the day in the synagogue and asks forgiveness from people they have wronged. Which day is this?",
    options: [
      ["Yom Kippur", "Correct: the Day of Atonement."],
      ["Purim", "Purim is a joyful festival with gifts and costumes."],
      ["Rosh Hashanah", "Rosh Hashanah is the new year, a day of prayer but not a fast of 25 hours."],
      ["Shavuot", "Shavuot celebrates the giving of the Torah."],
    ],
    answer: "A",
    hints: ["Which day is called the Day of Atonement?"],
    explanation: "**Yom Kippur** is the Day of Atonement, a fast of about 25 hours spent in prayer and repentance.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At the end of Shabbat the family stands with a cup of wine, a spice box and a braided candle. Which ceremony is this?",
    options: [
      ["Havdalah", "Correct: it separates Shabbat from the ordinary week."],
      ["Kiddush", "Kiddush is said at the start of Shabbat over wine."],
      ["The seder", "The seder is the Passover meal."],
      ["Brit milah", "That is the circumcision ceremony."],
    ],
    answer: "A",
    hints: ["Think of the word separation."],
    explanation: "**Havdalah** (separation) ends Shabbat with wine, spices and a braided candle.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why the Sabbath commandment in Deuteronomy 5 mentions the slavery in Egypt?",
    options: [
      ["Rest is a sign of freedom: the people were once slaves with no day of rest", "Correct: Shabbat links rest to freedom and equality."],
      ["The Israelites rested on Shabbat because the Egyptians had forbidden them to work", "The text does not say this."],
      ["Shabbat is a day on which Jews mourn the years of slavery in Egypt", "Shabbat is a joyful day, not a day of mourning."],
      ["The commandment applies only to those who were born in Egypt", "It applies to the whole household and workers."],
    ],
    answer: "A",
    hints: ["Think about who has the right to rest."],
    explanation: "In Deuteronomy 5 the Sabbath is also a memory of **freedom**: because Israel was once enslaved, everyone in the household, including servants, rests.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Shabbat is the Jewish day of rest.",
    answer: true,
    explanation: "True. It is the seventh day, a day of rest and holiness.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Hanukkah is the Jewish new year.",
    answer: false,
    explanation: "False. The new year is Rosh Hashanah. Hanukkah is the winter festival of lights that remembers the rededication of the Temple.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each festival with what it remembers or celebrates.",
    pairs: [["Pesach", "the Exodus from Egypt"], ["Shavuot", "the giving of the Torah at Sinai"], ["Sukkot", "the shelters of the wilderness"], ["Purim", "Esther saving the Jews of Persia"]],
    explanation: "Pesach: Exodus. Shavuot: Torah at Sinai. Sukkot: wilderness shelters. Purim: Esther.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each object with the festival or day on which it is used.",
    pairs: [["Hanukkiah", "Hanukkah"], ["Shofar", "Rosh Hashanah"], ["Matzah", "Pesach"], ["Challah and two candles", "Shabbat"]],
    hints: ["Think of the main custom of each festival."],
    explanation: "Hanukkiah: Hanukkah. Shofar: Rosh Hashanah. Matzah: Pesach. Candles and challah: Shabbat.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The pilgrim festivals are {{blank:a}}, Shavuot and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Pesach"], choices: ["Pesach", "Purim", "Hanukkah", "Yom Kippur"] },
      { id: "b", accepted: ["Sukkot"], choices: ["Sukkot", "Purim", "Rosh Hashanah", "Havdalah"] },
    ],
    explanation: "Pesach, Shavuot and Sukkot were the three festivals of pilgrimage to Jerusalem.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Hanukkah lasts {{blank:a}} nights, and families light a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["eight"], choices: ["three", "seven", "eight", "ten"] },
      { id: "b", accepted: ["hanukkiah"], choices: ["hanukkiah", "sukkah", "shofar", "tallit"] },
    ],
    hints: ["The lamp has nine branches: one for each night and a helper."],
    explanation: "Hanukkah lasts **eight** nights; the lamp is the **hanukkiah**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the ritual meal held on the first night of Pesach?",
    accepted: ["seder", "the seder", "Passover seder", "Pesach seder"],
    wrong: ["kiddush", "havdalah"],
    explanation: "The **seder** is the meal at which the Exodus story is told.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which Jews prepare for or welcome Shabbat.",
    points: ["Clean the house and cook before sunset", "Light two candles", "Say kiddush over wine and eat challah, or go to the synagogue"],
    modelAnswer: "Jews clean the house and cook before sunset, light two candles, and say kiddush over wine and share two loaves of challah at the family meal.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how Jews celebrate the festival of Pesach.",
    points: [
      ["They remove leavened bread (chametz) from the home", 1],
      ["They hold a seder with the Haggadah to tell the story of the Exodus", 1],
      ["They eat matzah and bitter herbs", 1],
      ["They drink four cups of wine and children ask questions", 1],
    ],
    modelAnswer: "Jews remove leavened bread from the home and hold a seder, at which the Haggadah is read to tell the story of the Exodus. They eat matzah and bitter herbs, drink four cups of wine, and the children ask questions.",
    hints: ["Think of the preparation, the meal, the foods and the telling."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why Yom Kippur is the holiest day of the Jewish year.",
    points: [
      ["It is the Day of Atonement, when Jews ask God for forgiveness", 1],
      ["Developed: Jews trust that God is merciful, and the day is a chance to start again", 2],
      ["Jews fast and spend the day in prayer", 1],
      ["Developed: the fast and prayer show sincere repentance and put the person's whole attention on God and on putting wrongs right", 2],
    ],
    modelAnswer: "Yom Kippur is the Day of Atonement, when Jews ask God for forgiveness. They trust that God is merciful, so the day is a chance to start again. Jews also fast and spend the day in prayer, which shows sincere repentance and puts their whole attention on God and on putting wrongs right.",
    hints: ["Give one reason about forgiveness and one about the way the day is kept; develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a description of a Friday evening in a fictional Jewish home in Bulawayo, 2026 (described in words)",
      "Before sunset Rachel's mother lights two candles on the table. Her father holds a cup of wine and says a blessing. Two loaves of plaited bread stand under a cloth. The family sits down to a meal. The next morning they walk to the synagogue, and in the evening they hold a short ceremony with a braided candle.",
      { described: true }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the blessing over the wine in Source A called?",
        options: [
          ["Kiddush", "Correct: it sanctifies Shabbat."],
          ["Havdalah", "Havdalah is the ceremony at the end of Shabbat."],
          ["Haggadah", "The Haggadah is the book for the Pesach seder."],
          ["Shema", "The Shema is the declaration of faith."],
        ],
        answer: "A", explanation: "The blessing over wine at the start of Shabbat is kiddush.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the family does for Shabbat.",
        points: ["They light two candles before sunset", "The father says a blessing (kiddush) over wine and they eat two loaves of challah", "They go to the synagogue on Saturday and hold a havdalah ceremony in the evening"],
        modelAnswer: "They light two candles before sunset; the father says kiddush over wine and they share two loaves; they go to the synagogue on Saturday and hold havdalah in the evening.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain the meaning of the braided candle ceremony held at the end of Shabbat.",
        points: [["It is called havdalah, which means separation", 1], ["It marks the end of the holy day and the start of the ordinary week", 1], ["Wine, spices and light show a hope for a sweet and bright week", 1]],
        modelAnswer: "It is called havdalah, which means separation. It marks the end of the holy day and the start of the ordinary week, and the wine, spices and light express the hope for a sweet and bright week.",
      }),
    ],
    hints: ["In (c) explain the word havdalah and what the objects stand for."],
    explanation: "The source shows candles, kiddush, challah, the synagogue and havdalah.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Thandeka says: \"Keeping the Sabbath and the festivals is the main way Jews keep their identity.\" David says: \"Beliefs and moral teaching matter just as much.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Describe **two** customs of Sukkot or Hanukkah.",
        points: [["Sukkot: Jews build a sukkah and eat meals in it", 1], ["Sukkot: they wave the four species (palm, myrtle, willow, citron)", 1], ["Hanukkah: they light the hanukkiah, one more light each night", 1], ["Hanukkah: they give gifts and eat foods fried in oil", 1]],
        modelAnswer: "At Sukkot Jews build a sukkah and eat meals in it, and wave the four species in the synagogue. At Hanukkah they light the hanukkiah, adding one light each night, give gifts and eat foods fried in oil.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why the festival of Pesach is important to Jewish identity.",
        points: [["It retells the Exodus, the event that created the Jewish people", 2], ["The seder involves the whole family and every generation in the story, so it passes on identity and values", 2]],
        modelAnswer: "Pesach retells the Exodus, the event that made the Jews a people. The seder involves the whole family and every generation in the story, so it passes on Jewish identity and the value of freedom.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that festival and Sabbath customs are the main way Jews keep their identity.",
        points: [["For: customs are practised by families and communities and link each generation to history", 2], ["For: Shabbat and the festivals shape the Jewish year and are kept even by many less observant Jews", 2], ["Against or limits: belief in one God, the Torah and ethical teaching (justice, charity) are also central to identity", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Customs are an important way of keeping identity, because families and communities practise them together and they link each generation to the Exodus, Sinai and the wilderness. Shabbat and the festivals shape the whole Jewish year, and even many less observant Jews keep some of them. However, belief in one God, study of the Torah and ethical teaching about justice and charity are also central. In my view customs are the most visible way, but they gain their meaning from belief and moral teaching.",
      }),
    ],
    hints: ["Give the strengths of customs, then other factors, then your judgement."],
    explanation: "A strong answer weighs customs against belief and ethics and reaches a supported conclusion.",
  });

  b.card("FACT", "When does Shabbat start and end?", "From sunset on Friday to nightfall on Saturday.", "Basis: Genesis 2:1-3 and Exodus 20:8-11.");
  b.card("DEFINITION", "What is **kiddush**?", "The blessing over wine that sanctifies Shabbat and festivals.");
  b.card("DEFINITION", "What is **havdalah**?", "The ceremony of separation that ends Shabbat, with wine, spices and a braided candle.");
  b.card("FACT", "What does Pesach remember, and what is eaten?", "The Exodus from Egypt; matzah and bitter herbs at the seder.");
  b.card("FACT", "What does Shavuot celebrate?", "The giving of the Torah at Sinai (and the first harvest).");
  b.card("FACT", "Why is a sukkah built at Sukkot?", "To remember the shelters in the wilderness; meals are eaten in it.");
  b.card("FACT", "What happens on Yom Kippur?", "A fast of about 25 hours, prayer in the synagogue and asking forgiveness.", "Ten days after Rosh Hashanah.");
  b.card("FACT", "What does Hanukkah remember?", "The rededication of the Temple in the second century BCE; a hanukkiah is lit for eight nights.");
  b.card("FACT", "What does Purim remember?", "Esther and Mordecai saving the Jews of Persia from Haman's plot.", "The scroll of Esther is read aloud.");
});
