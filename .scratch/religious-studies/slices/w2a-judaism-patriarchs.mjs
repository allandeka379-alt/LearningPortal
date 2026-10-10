// W2a: Abraham, the patriarchs and the covenant.
import { concept, P, source, ref } from "../lib.mjs";

concept("frs.judaism.patriarchs", { file: "judaism/patriarchs", keyPrefix: "judaism.patriarchs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which name did Jacob receive after he wrestled at the river Jabbok?",
    options: [
      ["Israel", "Correct: Genesis 32:22-32 tells that Jacob was renamed Israel, and his descendants are the children of Israel."],
      ["Abraham", "Abraham was the name given to Abram in Genesis 17, not to Jacob."],
      ["Judah", "Judah was one of Jacob's sons; the name Jew comes from it."],
      ["Isaac", "Isaac was Jacob's father, the son of Abraham and Sarah."],
    ],
    answer: "A",
    explanation: "Jacob was renamed **Israel**, and the people descended from his twelve sons are called Israelites or the children of Israel.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who are the patriarchs of Judaism?",
    options: [
      ["Abraham, Isaac and Jacob", "Correct: they are the three founding fathers of the Jewish people."],
      ["Moses, Aaron and Joshua", "These are leaders of the Exodus period, not the patriarchs."],
      ["Saul, David and Solomon", "These were kings of Israel, much later."],
      ["Reuben, Simeon, Levi and Judah", "These were sons of Jacob and ancestors of tribes."],
    ],
    answer: "A",
    explanation: "The patriarchs (founding fathers) are Abraham, Isaac and Jacob. The matriarchs are Sarah, Rebekah, Rachel and Leah.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the sign of the covenant between God and Abraham in Genesis 17?",
    options: [
      ["Circumcision of males, on the eighth day for a baby boy", "Correct: brit milah is the sign of the covenant and is still practised."],
      ["Lighting two candles every Friday before the Sabbath begins", "Sabbath candles are a later custom of the home, not the sign of the covenant."],
      ["Wearing a tallit with fringes on the corners during prayer", "The tallit is worn at prayer; it is not the sign of Abraham's covenant."],
      ["Eating unleavened bread on the first night of Passover", "That is part of Pesach, which commemorates the Exodus."],
    ],
    answer: "A",
    explanation: "In Genesis 17 the sign of the covenant is **circumcision**, called **brit milah**, done on the eighth day for a baby boy.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is one of the promises God makes to Abraham in Genesis 12 and 15?",
    options: [
      ["Many descendants and the land of Canaan", "Correct: land, descendants and blessing are the covenant promises."],
      ["A temple built in Jerusalem by his eldest son", "The Temple belongs to the later period of the kings, under Solomon."],
      ["The written Ten Commandments given on stone tablets", "The commandments were given to Moses at Sinai, much later."],
      ["A rule that the Sabbath must be kept every week", "The Sabbath commandment is part of the Sinai covenant (Exodus 20)."],
    ],
    answer: "A",
    explanation: "God promises Abraham **descendants** (as many as the stars), **land** (Canaan) and **blessing**. The Ten Commandments and the Temple come later in the story.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following best explains the name \"Jew\"?",
    options: [
      ["It comes from Judah, a son of Jacob and the name of a kingdom", "Correct: later the people of Judah and then all the people were called Jews."],
      ["It is the oldest name for the family of Abraham, used in Genesis", "In Genesis Abraham is called a Hebrew; Jew is a later name."],
      ["It was the name God gave to Jacob after he wrestled at the river", "The name God gave to Jacob was Israel."],
      ["It describes only the people who lived in Egypt in the time of Joseph", "The name is used for the whole people and the religion, not one group in Egypt."],
    ],
    answer: "A",
    explanation: "**Jew** comes from **Judah**. Hebrew, Israelite and Jew are names for the same people at different times.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "At a Shabbat meal in Harare, David tells his younger cousin that God stopped Abraham from offering Isaac and provided a ram. Which story is David telling?",
    options: [
      ["The Akedah, the binding of Isaac (Genesis 22)", "Correct: the story ends with Isaac being spared."],
      ["The call of Abram to leave his father's house (Genesis 12)", "That story is about leaving home, not about Isaac."],
      ["Jacob's dream of a ladder at Bethel (Genesis 28)", "That is the dream in which God repeats the promises to Jacob."],
      ["Joseph being sold to traders by his brothers (Genesis 37)", "That story is about Joseph and his brothers."],
    ],
    answer: "A",
    hints: ["Which patriarch's son was spared at the last moment?"],
    explanation: "The **Akedah** (binding) is told in Genesis 22. Jews read it as a test of faith and note that Isaac was spared.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the stories of Abraham is accurate and fair?",
    options: [
      ["Jews, Christians and Muslims honour Abraham, but tell his story differently", "Correct: this describes the three traditions accurately and respectfully."],
      ["Only Jews honour Abraham, because he is not mentioned by any other religion", "Christians and Muslims also honour Abraham, as Ibrahim in Islam."],
      ["All three religions tell exactly the same story with the same details about him", "The accounts differ, for example in which son is central to certain stories."],
      ["The Jewish account has been proved wrong by the accounts of other religions", "Religious accounts are described as beliefs; none is ranked by this subject."],
    ],
    answer: "A",
    hints: ["The subject describes beliefs and does not rank religions."],
    explanation: "Abraham is honoured in Judaism, Christianity and Islam (as **Ibrahim**). Each tradition tells the story in its own way, and a Religious Studies answer reports the Jewish account as the Jewish account.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reading of the covenant shows that, for Jews, it brings responsibilities as well as promises?",
    options: [
      ["Abraham was told to walk in God's ways and do right, and his descendants keep the sign of the covenant", "Correct: the covenant asks for faithfulness and conduct as well as giving promises."],
      ["God promised land and descendants, so the people have no duties and only receive blessings from God forever", "This ignores the duties linked to the covenant, which Jews emphasise."],
      ["The covenant ended after Abraham's death and has no effect on how Jews live today", "Jews believe the covenant continues, as shown by circumcision on the eighth day."],
      ["The covenant was made only to bring military victory against the neighbours of Israel", "The covenant promises are blessing and relationship, not only victory in war."],
    ],
    answer: "A",
    hints: ["Think of the chosen people as a people with a task, not only a privilege."],
    explanation: "Jews understand being the chosen people as **responsibility**: to live by God's ways. The sign of the covenant, brit milah, continues in each generation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "According to Genesis, Abraham and Sarah were the parents of Isaac.",
    answer: true,
    explanation: "True. Isaac was born to Sarah and Abraham when they were old (Genesis 21).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The names Hebrew, Israelite and Jew refer to three completely different peoples.",
    answer: false,
    explanation: "False. They are names for the same people at different stages of the story: Hebrew (Abraham's time), Israelite (descendants of Israel) and Jew (from Judah, in later centuries).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person with the event or role connected with them in Genesis.",
    pairs: [["Abraham", "called to leave his home and given the covenant"], ["Isaac", "spared at the binding in Genesis 22"], ["Jacob", "renamed Israel after wrestling at Jabbok"], ["Joseph", "sold to Egypt and later made a high official"]],
    explanation: "Abraham: call and covenant (Genesis 12, 15, 17). Isaac: the Akedah (22). Jacob: renamed Israel (32). Joseph: Egypt (37-50).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Abram and Sarai were renamed {{blank:a}} and {{blank:b}} when the covenant was made.",
    blanks: [
      { id: "a", accepted: ["Abraham"], choices: ["Abraham", "Isaac", "Israel", "Esau"] },
      { id: "b", accepted: ["Sarah"], choices: ["Sarah", "Rebekah", "Rachel", "Leah"] },
    ],
    explanation: "In Genesis 17 the names changed to **Abraham** and **Sarah**.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A Jewish baby boy is circumcised on the {{blank:a}} day, a ceremony called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["eighth"], choices: ["first", "third", "eighth", "thirteenth"] },
      { id: "b", accepted: ["brit milah"], choices: ["brit milah", "bar mitzvah", "kiddush", "havdalah"] },
    ],
    hints: ["The ceremony takes place about a week after birth.", "Brit means covenant."],
    explanation: "**Brit milah** (covenant of circumcision) takes place on the **eighth** day. Bar mitzvah is the coming of age at 13.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the matriarch who was the wife of Isaac.",
    accepted: ["Rebekah", "Rebecca", "Rivka", "Rivkah"],
    wrong: ["Sarah", "Rachel"],
    explanation: "The matriarchs are Sarah, **Rebekah** (wife of Isaac), Rachel and Leah. Rachel and Leah were the wives of Jacob.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** promises that God made to Abraham in the covenant.",
    points: ["He would have many descendants, becoming a great nation", "His descendants would have the land of Canaan", "He would be blessed, and through him other peoples would be blessed"],
    modelAnswer: "God promised Abraham many descendants, the land of Canaan, and a blessing that would reach other peoples through him.",
    explanation: "One mark for each promise (Genesis 12:1-3; 15; 17).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the story of the binding of Isaac (Genesis 22) and say what Jews learn from it.",
    points: [
      ["God tested Abraham by asking him to offer Isaac", 1],
      ["Abraham obeyed and prepared to do so", 1],
      ["A messenger of God stopped him and a ram was provided instead", 1],
      ["Jews see it as a lesson about faith and trust in God (the story ends with Isaac being spared)", 1],
    ],
    modelAnswer: "God tested Abraham by asking him to offer his son Isaac. Abraham obeyed, but a messenger of God stopped him at the last moment and a ram was provided instead. Jews see the story as a lesson about faith and trust in God, and they read it at Rosh Hashanah.",
    hints: ["Say what was asked, what Abraham did, how it ended and what Jews learn."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why the covenant with Abraham is important to Jews today.",
    points: [
      ["It makes Jews the people in a special relationship with God (the chosen people)", 1],
      ["Developed: this brings responsibilities to keep God's ways, so it shapes how Jews live", 2],
      ["Its sign, circumcision on the eighth day (brit milah), is still kept, linking each generation to Abraham", 1],
      ["Developed: this gives Jewish boys identity and belonging in the community from their first week", 2],
    ],
    modelAnswer: "The covenant matters because it makes Jews the people in a special relationship with God, which brings the responsibility of living by God's ways. It also matters because its sign, circumcision on the eighth day, is still kept, so each boy is welcomed into the same covenant as Abraham's family and gains identity and belonging in the community.",
    hints: ["Give one reason about belief and responsibility, one about practice, and develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students, Rachel and David, in a Bulawayo school, 2026",
      "Rachel: At my cousin's brit milah the rabbi spoke about Abraham. He said the covenant promised land, many descendants and a blessing.\nDavid: My grandfather says the family still keeps the sign of that covenant on the eighth day. He also says Abraham was called to leave his home and go where God showed him."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which scripture reference tells the call of Abram to leave his home?",
        options: [
          [ref("Genesis", 12, "1-3"), "Correct: God tells Abram to leave and promises to bless him."],
          [ref("Genesis", 22), "Genesis 22 is the binding of Isaac."],
          [ref("Genesis", 32, "22-32"), "Genesis 32 tells how Jacob was renamed Israel."],
          [ref("Genesis", 37), "Genesis 37 begins the story of Joseph."],
        ],
        answer: "A", explanation: "The call of Abraham is in Genesis 12:1-3.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** things the covenant promised to Abraham or required of his family.",
        points: ["Land (Canaan)", "Many descendants", "Blessing, or the sign of circumcision on the eighth day"],
        modelAnswer: "The covenant promised land, many descendants and a blessing, and the family keeps its sign on the eighth day.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why the sign of the covenant is still important to Jewish families.",
        points: [["It is the sign God gave in Genesis 17", 1], ["It joins a baby boy to the covenant community", 1], ["It links each generation to Abraham, showing continuity", 1], ["It shows commitment to God's covenant and to Jewish identity", 1]],
        modelAnswer: "It is the sign given to Abraham in Genesis 17, so keeping it joins the baby boy to the covenant community and links each generation to Abraham. It shows the family's commitment to God and to Jewish identity.",
      }),
    ],
    hints: ["In (c) think about belonging, continuity and commitment."],
    explanation: "The source gives the promises and the sign; (c) asks for developed reasons.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Miriam says: \"The story of Joseph shows that forgiveness matters more than revenge.\" Her classmate Farai, who is not Jewish, says: \"It is a good story, but it does not tell us what Jews believe today.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** events in the story of Joseph in Egypt.",
        points: [["Joseph was sold by his brothers to traders who took him to Egypt", 1], ["He explained Pharaoh's dreams and was made a high official in charge of grain", 1], ["He recognised his brothers when famine brought them to Egypt and forgave them", 1], ["His family, including Jacob, moved to Egypt", 1]],
        modelAnswer: "Joseph was sold by his brothers to traders and taken to Egypt. He later explained Pharaoh's dreams and was made a high official in charge of grain, and when famine brought his brothers to Egypt he forgave them and his family moved there.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how the stories of Abraham and his family help to shape Jewish identity.",
        points: [["They tell Jews who their ancestors are (the patriarchs and matriarchs) and give a shared history", 2], ["The covenant and its sign link Jews to Abraham and give a sense of purpose and responsibility", 2]],
        modelAnswer: "The stories tell Jews who their ancestors are, so they share one history across the world. The covenant, with its sign of circumcision, links each generation to Abraham and gives Jews a purpose and a responsibility to live by God's ways.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Assess the view that stories from Genesis still guide how Jews live today.",
        points: [["For: the covenant, circumcision and the Akedah on Rosh Hashanah are part of present practice", 2], ["Against or limits: Jews differ in how they read the stories, some literally and some as teaching, and many practices come from later tradition", 2], ["A supported judgement", 2]],
        levels: [[4, 5, 6, "Considers both views with developed reasons and a supported judgement."], [3, 3, 4, "Both views, with limited development or an unsupported judgement."], [2, 2, 2, "One view developed or both only listed."], [1, 1, 1, "One or two undeveloped points."], [0, 0, 0, "Nothing creditworthy."]],
        modelAnswer: "The stories still guide Jewish life: the covenant is remembered every time a boy is circumcised on the eighth day, and the binding of Isaac is read at Rosh Hashanah. However, Jews read the stories in different ways, and many practices come from later tradition such as the Talmud. On balance the stories remain a foundation of Jewish identity, although they are not the only guide to daily life.",
      }),
    ],
    hints: ["Give evidence from practice today, then the limits, and then your judgement."],
    explanation: "A balanced answer links the stories to present practice and notes that Jews read them in different ways.",
  });

  b.card("DEFINITION", "What is a **covenant** in Judaism?", "A solemn agreement between God and the Jewish people, with promises from God and responsibilities for the people.");
  b.card("FACT", "What three promises did God make to Abraham?", "Land (Canaan), many descendants and blessing.", "Genesis 12:1-3; 15; 17.");
  b.card("FACT", "What is the sign of the covenant with Abraham?", "Circumcision (brit milah), done on the eighth day for a baby boy.", "Genesis 17.");
  b.card("FACT", "Who were the patriarchs and the matriarchs?", "Patriarchs: Abraham, Isaac and Jacob. Matriarchs: Sarah, Rebekah, Rachel and Leah.");
  b.card("FACT", "What does the Akedah describe?", "The binding of Isaac: Abraham is tested, and at the last moment Isaac is spared and a ram is provided.", "Genesis 22; read at Rosh Hashanah.");
  b.card("FACT", "How did Jacob get the name Israel?", "He wrestled through the night at the river Jabbok and was renamed.", "Genesis 32:22-32.");
  b.card("CONCEPT", "Why are there three names: Hebrew, Israelite, Jew?", "They name the same people at different times: Hebrew (Abraham's family), Israelite (children of Israel), Jew (from Judah, later centuries).");
  b.card("FACT", "Which tribes were descended from Rachel's sons?", "Joseph (through Ephraim and Manasseh) and Benjamin.", "Leah's sons were Reuben, Simeon, Levi, Judah, Issachar and Zebulun.");
  b.card("CONCEPT", "What can Jews learn from the story of Joseph?", "That forgiveness can heal a family and that God's purposes can bring good out of harm.", "Genesis 37-50.");
});
