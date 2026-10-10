// W2a: Moses, the Exodus and the covenant at Sinai.
import { concept, P, source, ref, levels } from "../lib.mjs";

concept("frs.judaism.exodus-sinai", { file: "judaism/exodus-sinai", keyPrefix: "judaism.exodus-sinai" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the word **Exodus** mean?",
    options: [
      ["Going out", "Correct: it names the departure of the Israelites from Egypt."],
      ["Covenant", "A covenant is a solemn agreement, in Hebrew brit."],
      ["Passing over", "That is the meaning of Pesach (Passover)."],
      ["Law", "The word for law or teaching is Torah."],
    ],
    answer: "A",
    explanation: "**Exodus** means \"going out\": the going out of the Israelites from slavery in Egypt.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "At which mountain did the Israelites receive the Ten Commandments?",
    options: [
      ["Mount Sinai", "Correct: Exodus 19-20 describes the covenant at Sinai."],
      ["Mount Zion", "Zion is a name for Jerusalem, the city of the later Temple."],
      ["Mount Carmel", "Carmel is a mountain in northern Israel linked to the prophet Elijah."],
      ["Mount Nebo", "Moses looked at the promised land from Mount Nebo and died there."],
    ],
    answer: "A",
    explanation: "The Ten Commandments were given at **Mount Sinai** (Exodus 20; Deuteronomy 5).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is the festival called Pesach (Passover)?",
    options: [
      ["God passed over the houses of the Israelites in the last plague", "Correct: the doorposts were marked and the plague passed over those houses."],
      ["The Israelites passed over the river Jordan on dry ground into Canaan", "The crossing of the Jordan is described in the Book of Joshua."],
      ["Moses passed the law to Joshua before he died near the promised land", "The handing over of leadership is a different event."],
      ["The Israelites passed through the sea with the waters like walls on each side", "The crossing of the sea is remembered at Passover but does not give it its name."],
    ],
    answer: "A",
    explanation: "Exodus 12 tells that the last plague \"passed over\" the marked Israelite houses. That is the origin of the name **Pesach**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In Exodus 3, how does God first speak to Moses?",
    options: [
      ["From a bush that burns without being burnt up", "Correct: Moses was looking after sheep in Midian."],
      ["From a cloud on top of the mountain with thunder and lightning", "That describes the scene at Sinai in Exodus 19."],
      ["In a dream in which Moses saw a ladder between earth and heaven", "The ladder dream belongs to Jacob at Bethel."],
      ["Through a prophet sent from the court of Pharaoh in the palace", "God speaks directly to Moses in the burning bush."],
    ],
    answer: "A",
    explanation: "The **burning bush** (Exodus 3) is where Moses is called to lead the Israelites out of Egypt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What was the tabernacle?",
    options: [
      ["A portable tent-sanctuary used for worship in the wilderness", "Correct: it travelled with the people and held the ark."],
      ["The first permanent temple, built in Jerusalem by King Solomon", "The Temple in Jerusalem was built later, under Solomon."],
      ["A festival hut in which Jews eat during the festival of Sukkot", "That is the sukkah, linked to Sukkot."],
      ["A scroll case in which the Torah is carried to the reading desk", "A Torah scroll case is not the tabernacle."],
    ],
    answer: "A",
    explanation: "The **tabernacle** was a portable sanctuary (Exodus 25-31, 35-40) containing the **ark**. The Temple in Jerusalem replaced it as the central sanctuary.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At the seder, Rachel's grandfather says that each person should see themselves as if they had come out of Egypt. Which statement best explains why Jews teach this?",
    options: [
      ["It makes the Exodus a living memory that shapes identity and gratitude each year", "Correct: the story is re-lived, not only remembered."],
      ["It proves that every Jew was born in Egypt and later moved to Canaan", "The teaching is about how to remember, not about birthplace."],
      ["It replaces the need to read the Torah and keep its commandments afterwards", "The seder does not replace the Torah or the commandments."],
      ["It shows that only the older members of the family may take part in the meal", "Children take an active part, asking questions at the seder."],
    ],
    answer: "A",
    hints: ["Think of the purpose of retelling a story every year."],
    explanation: "The seder teaches that the Exodus belongs to every generation. Jews remember it to understand their identity, to thank God and to care for the oppressed.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the following links the Exodus most directly to Jewish moral teaching?",
    options: [
      ["The Torah reminds them that they were strangers in Egypt", "Correct: the experience of slavery becomes a reason for compassion."],
      ["The Torah says that the plagues proved that the Egyptians were worse than other peoples", "The Torah does not teach contempt for peoples; the plagues are told as acts against Pharaoh's refusal."],
      ["The Torah teaches that people should fear foreigners because the Israelites were once enslaved", "It teaches the opposite: remember slavery in order to be fair to foreigners."],
      ["The Torah instructs that wages need not be paid to those who work in the fields at harvest", "The Torah requires fair treatment of workers."],
    ],
    answer: "A",
    hints: ["Which sentence turns the memory of suffering into a duty?"],
    explanation: "Jewish ethics repeatedly draw on the memory of slavery: because Israel was a stranger in Egypt, it must protect the stranger, the poor and the worker.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which comparison between the covenant with Abraham and the covenant at Sinai is accurate?",
    options: [
      ["Abraham's covenant promised land and descendants, with circumcision as its sign; Sinai gave the Torah to the whole people", "Correct: they are connected stages, with different emphases."],
      ["Both covenants had the Sabbath as their sign and were both made with Moses in the wilderness after the people left Egypt", "Circumcision is the sign of Abraham's covenant, and Abraham lived before Moses."],
      ["The covenant at Sinai ended the covenant with Abraham, so Jews no longer circumcise sons", "Jews regard the covenants as continuous; brit milah is still kept."],
      ["Only the covenant with Abraham included promises, while Sinai contained no promises or laws", "Sinai contained the Torah's laws, and both contain promises and duties."],
    ],
    answer: "A",
    hints: ["Remember the sign and the main content of each covenant."],
    explanation: "Abraham: land, descendants, blessing; sign = circumcision. Sinai: Torah and commandments for the people as a whole. Jews see them as connected.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "According to Exodus, Moses was brought up in the palace of Pharaoh by Pharaoh's daughter.",
    answer: true,
    explanation: "True. Pharaoh's daughter found the baby Moses in a basket on the river (Exodus 2).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Jews eat unleavened bread (matzah) at Passover to remember that the Israelites left Egypt in a hurry.",
    answer: true,
    explanation: "True. The bread had no time to rise (Exodus 12).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person with their role in the Exodus story.",
    pairs: [["Moses", "led the Israelites out of Egypt"], ["Aaron", "spoke for Moses and became the first high priest"], ["Miriam", "led the women in song after the crossing of the sea"], ["Joshua", "led the Israelites into Canaan"]],
    explanation: "Moses led the Exodus; Aaron spoke for him; Miriam sang at the sea (Exodus 15); Joshua took over after Moses died.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Ten Commandments are found in the Book of {{blank:a}} (chapter 20) and in the Book of {{blank:b}} (chapter 5).",
    blanks: [
      { id: "a", accepted: ["Exodus"], choices: ["Genesis", "Exodus", "Leviticus", "Numbers"] },
      { id: "b", accepted: ["Deuteronomy"], choices: ["Deuteronomy", "Joshua", "Psalms", "Isaiah"] },
    ],
    explanation: "Exodus 20 and Deuteronomy 5.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The Israelites spent {{blank:a}} years in the wilderness, and after the death of Moses {{blank:b}} led them into Canaan.",
    blanks: [
      { id: "a", accepted: ["forty"], choices: ["seven", "twelve", "forty", "four hundred"] },
      { id: "b", accepted: ["Joshua"], choices: ["Joshua", "Aaron", "Solomon", "Isaac"] },
    ],
    hints: ["Think of the Book that follows Deuteronomy."],
    explanation: "The wilderness years lasted **forty** years; **Joshua** led the entry into Canaan.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name do Jews give to the Passover festival in Hebrew?",
    accepted: ["Pesach", "Pesah", "Passover", "Pesakh"],
    wrong: ["Shavuot", "Sukkot"],
    explanation: "The Hebrew name is **Pesach**; the English name is Passover.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Outline **three** events in the story of the Exodus.",
    points: ["The Israelites were enslaved in Egypt and Moses was called at the burning bush", "The plagues and the first Passover, after which Pharaoh let the people go", "The crossing of the sea, or the covenant and Ten Commandments at Sinai"],
    modelAnswer: "The Israelites were enslaved in Egypt and Moses was called at the burning bush. Ten plagues struck Egypt and, after the first Passover, Pharaoh let the people go. They crossed the sea and then received the Ten Commandments at Sinai.",
    explanation: "One mark for each event.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the first Passover (Exodus 12).",
    points: [
      ["The Israelites were told to prepare a meal in a hurry", 1],
      ["Each household killed a lamb and marked its doorposts with the blood", 1],
      ["They ate the lamb with unleavened bread", 1],
      ["The last plague passed over the marked houses, and Pharaoh then let the people go", 1],
    ],
    modelAnswer: "Before the last plague the Israelites prepared a meal in a hurry. Each household killed a lamb and marked its doorposts with the blood, and they ate the lamb with unleavened bread. The last plague passed over the marked houses, and Pharaoh then let the people go.",
    hints: ["Give the meal, the blood on the doorposts and the result."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why the covenant at Sinai is important to Jews.",
    points: [
      ["The people received the Torah and the Ten Commandments", 1],
      ["Developed: these laws guide worship and everyday behaviour, and Jews study and obey them today", 2],
      ["It made the freed slaves into a people with a special relationship with God", 1],
      ["Developed: this gives Jews a shared identity and a responsibility to live by God's ways", 2],
    ],
    modelAnswer: "At Sinai the people received the Torah and the Ten Commandments. These laws guide Jewish worship and everyday behaviour, and Jews study and obey them today. Sinai also made the freed slaves into a people with a special relationship with God, which gives Jews a shared identity and a responsibility to live by God's ways.",
    hints: ["One reason about the law, one about the people's identity; develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newsletter of a Jewish congregation in Harare, 2026",
      "This week we prepare for Pesach. On the first evening our families will gather for the seder. We shall eat matzah because our ancestors left Egypt in haste, we shall taste bitter herbs because slavery was bitter, and the children will ask the questions that begin the story. We shall remember that we were strangers in Egypt, and we shall invite those who have no family to join us."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which food in Source A reminds Jews that the Israelites left Egypt in haste?",
        options: [
          ["Matzah", "Correct: unleavened bread had no time to rise."],
          ["Bitter herbs", "Bitter herbs remind Jews that slavery was bitter."],
          ["Challah", "Challah is the plaited bread of Shabbat, not of Passover."],
          ["Honey", "Honey is eaten at Rosh Hashanah for a sweet new year."],
        ],
        answer: "A", explanation: "Matzah recalls the haste of the departure from Egypt.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** ways in which the Exodus is remembered at Pesach.",
        points: ["Families gather for the seder and tell the story", "They eat matzah and taste bitter herbs", "Children ask questions that begin the story, and those without family are invited"],
        modelAnswer: "Families gather for the seder and tell the story; they eat matzah and taste bitter herbs; children ask the questions; and those without family are invited to join.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the newsletter says that guests are invited, using the Exodus story.",
        points: [["The Israelites were strangers and slaves in Egypt", 1], ["The Torah teaches that because they suffered they must care for strangers", 1], ["Inviting those without family puts that teaching into practice", 1]],
        modelAnswer: "The Israelites were strangers and slaves in Egypt, and the Torah teaches that because they suffered they must care for strangers. Inviting those without family puts that teaching into practice.",
      }),
    ],
    hints: ["In (c) connect the invitation to the memory of being strangers."],
    explanation: "The source links the seder foods to the story and the memory of being strangers to the duty of hospitality.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Rudo says: \"The Ten Commandments are the most important part of the Exodus story.\" Tafadzwa replies: \"The most important part is the freedom from slavery.\" Both agree that Jews still draw on the story today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "State **four** commandments, or kinds of commandments, from the Ten Commandments (Exodus 20).",
        points: ["Worship only one God", "Do not make or worship idols", "Keep the Sabbath", "Honour father and mother, or a commandment such as do not murder or do not steal"],
        modelAnswer: "Worship only one God; do not make or worship idols; keep the Sabbath; honour your father and mother (also accepted: do not murder, do not steal, do not commit adultery).",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how the Exodus helps to shape Jewish ideas about freedom.",
        points: [["It shows God as a redeemer who frees the oppressed", 2], ["It teaches that freedom brings duties, since the people were freed to receive the Torah and to care for others", 2]],
        modelAnswer: "The Exodus shows God as one who frees the oppressed, so Jews value freedom as a gift from God. It also teaches that freedom brings duties, since the people were freed to receive the Torah and to care for strangers and the poor.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess whether the covenant at Sinai or the freedom from slavery is the more important part of the Exodus for Jews.",
        points: [["Sinai: the Torah and the Ten Commandments give Jews their law and identity", 2], ["Freedom: the rescue from slavery created the people, and is remembered every Pesach", 2], ["Link: the freedom was for the purpose of receiving the covenant, and the Torah calls on Jews to protect the oppressed because of the memory of slavery", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Sinai is vital because the Torah and the Ten Commandments give Jews their law and identity. However, the rescue from slavery created the people in the first place and is remembered every year at Pesach. The two cannot easily be separated, since the people were freed in order to receive the covenant, and the Torah uses the memory of slavery to teach justice. I conclude that neither is more important on its own: freedom is the beginning and Sinai is its purpose.",
      }),
    ],
    hints: ["Weigh the two views, then show how they are linked before you judge."],
    explanation: "A strong answer explains both claims, shows how they connect, and gives a supported conclusion.",
  });

  b.card("DEFINITION", "What is the **Exodus**?", "The going out of the Israelites from slavery in Egypt under Moses.", "Exodus 1-15.");
  b.card("FACT", "How does God call Moses?", "From a burning bush that is not burnt up.", "Exodus 3.");
  b.card("FACT", "Why do Jews eat matzah at Pesach?", "The Israelites left Egypt in haste and the bread had no time to rise.", "Exodus 12.");
  b.card("FACT", "Where are the Ten Commandments found?", "Exodus 20 and Deuteronomy 5.");
  b.card("DEFINITION", "What was the ark of the covenant?", "The chest kept in the tabernacle that held the tablets of the law.", "Today a synagogue keeps Torah scrolls in an ark.");
  b.card("FACT", "What happened after forty years in the wilderness?", "Moses died in sight of the land and Joshua led the Israelites into Canaan.", "Deuteronomy 34; Joshua 1-6.");
  b.card("CONCEPT", "Why is the Exodus central to Jewish identity?", "It created the people, shows God as redeemer, shapes ethics (care for the stranger) and is retold at Pesach.");
  b.card("FACT", "What did Miriam do after the crossing of the sea?", "She led the women in song and dance.", "Exodus 15.");
  b.card("CONCEPT", "How is Sinai different from the covenant with Abraham?", "Abraham: land, descendants and blessing, with circumcision as the sign. Sinai: the Torah and commandments given to the whole people.");
});

