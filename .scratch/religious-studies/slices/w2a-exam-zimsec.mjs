// W2a exam-format items: Paper 1 (Religions, topic 3 Judaism) structured essay questions, 25 marks = (a) 15 + (b) 10.
// Plans from EXAM in lib.mjs; the paper structure is our convention (reviewer to check).
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const p1 = { skill: EXAM.ZIM_P1.skill, applies: EXAM.ZIM_P1.applies, secs: EXAM.ZIM_P1.secs, examStyle: true, paper: "Paper 1" };

concept("frs.judaism.patriarchs", { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec" }, (b) => {
  // 1. Paper 1: Abraham and the covenant.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.judaism.patriarchs"],
    stem: "This question is about Abraham and the covenant.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the call of Abraham and the making of the covenant between God and Abraham.",
        points: [
          ["Abraham (Abram) lived with his family and was told by God to leave his country and his father's house (Genesis 12:1)", 2],
          ["He was to go to a land that God would show him, and Abraham obeyed, travelling with Sarah and his household", 2],
          ["God promised to make him a great nation, with descendants as many as the stars (Genesis 12 and 15)", 2],
          ["God promised the land of Canaan to his descendants", 2],
          ["God promised to bless him, and through him all the families of the earth would be blessed", 2],
          ["In Genesis 17 the covenant was renewed: the names Abram and Sarai were changed to Abraham and Sarah", 2],
          ["Circumcision was commanded as the sign of the covenant, for every male on the eighth day", 2],
          ["Isaac, the son of the promise, was born to Sarah and Abraham (Genesis 21)", 1],
        ],
        modelAnswer: "According to Genesis, Abraham, then called Abram, lived with his family and was told by God to leave his country and his father's house and to go to a land that God would show him (Genesis 12). Abraham obeyed and travelled with his wife Sarah and his household.\n\nGod made a series of promises. He would make Abraham a great nation, with descendants as many as the stars (Genesis 12 and 15), and his descendants would have the land of Canaan. God would bless Abraham, and through him all the families of the earth would be blessed. In Genesis 17 the covenant was renewed: Abram and Sarai were renamed Abraham and Sarah, and circumcision was commanded as the sign of the covenant for every male, on the eighth day. Isaac, the son of the promise, was later born to Sarah and Abraham (Genesis 21).",
        explanation: "Two marks for each developed point, with references where possible; one mark for the birth of Isaac. Credit any accurate account in a sensible order.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the significance of the covenant with Abraham for Jews today.",
        points: [
          ["It makes the Jews the people in a special relationship with God (the chosen people)", 2],
          ["The idea of being chosen carries responsibility to keep the Torah and live by God's ways", 2],
          ["Circumcision on the eighth day (brit milah) is still the sign of the covenant, linking each generation to Abraham", 2],
          ["Abraham's faith and obedience are a model, as in the story of the binding of Isaac read at Rosh Hashanah", 2],
          ["It gives Jews a shared history and identity; it is also honoured by Christians and Muslims in their own ways", 2],
        ],
        levels: levels(10),
        modelAnswer: "The covenant with Abraham is significant because it makes the Jews a people in a special relationship with God. Most Jews understand being chosen as a responsibility to keep the Torah and live by God's ways, and not as superiority.\n\nIts sign, circumcision on the eighth day, is still kept, and so every Jewish boy is linked to Abraham. Abraham's faith and obedience are a model for Jews, and the story of the binding of Isaac is read at Rosh Hashanah. The covenant also gives Jews a shared history and identity, whichever country they live in. Christians and Muslims also honour Abraham, each in their own way, so his story links the three religions.",
        explanation: "Level marking: developed reasons linked to Jewish practice and belief reach the top levels.",
      }),
    ]),
    hints: ["In (a), put the call, the promises and the sign in order and give references. In (b), link each point to Jewish life today."],
    explanation: "A Paper 1 style question: (a) describe the call and covenant, (b) explain its significance.",
  });

  // 2. Paper 1: Moses and the Exodus.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.judaism.exodus-sinai"],
    stem: "This question is about Moses and the Exodus.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Narrate the story of the Exodus from the call of Moses to the giving of the Ten Commandments.",
        points: [
          ["The Israelites were slaves in Egypt and the Pharaoh treated them harshly (Exodus 1)", 2],
          ["God called Moses from a burning bush and sent him to bring the people out of Egypt (Exodus 3)", 2],
          ["Moses and Aaron asked Pharaoh to let the people go; he refused and ten plagues struck Egypt (Exodus 7-12)", 2],
          ["Before the last plague the Israelites ate the first Passover meal and marked their doorposts with lamb's blood (Exodus 12)", 2],
          ["The last plague, the death of the firstborn, passed over the marked houses, and Pharaoh let the people go", 2],
          ["Pharaoh pursued them; the sea opened and the Israelites crossed (Exodus 14)", 2],
          ["At Mount Sinai the people agreed to the covenant and received the Ten Commandments (Exodus 19-20)", 2],
          ["The people wandered for forty years before entering Canaan", 1],
        ],
        modelAnswer: "The Israelites were slaves in Egypt, and the Pharaoh treated them harshly. God called Moses from a burning bush and sent him to bring the people out of Egypt (Exodus 3). Moses and Aaron asked Pharaoh to let the people go, but he refused and ten plagues struck Egypt.\n\nBefore the last plague the Israelites ate the first Passover meal and marked their doorposts with the blood of a lamb. The last plague, the death of the firstborn, passed over their houses, and Pharaoh let the people go. He then pursued them, but the sea opened and the Israelites crossed on dry ground (Exodus 14). At Mount Sinai the people agreed to the covenant and received the Ten Commandments (Exodus 19-20). They then wandered for forty years before entering Canaan.",
        explanation: "Two marks for each developed stage, in order; one mark for the wilderness years.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain why the Exodus is so important to Jews today.",
        points: [
          ["It created the Jewish people: slaves became a nation with a covenant and law", 2],
          ["It shows God as a redeemer who hears the cry of the oppressed", 2],
          ["Jews retell it at the Passover seder each year, so that each generation feels part of the story", 2],
          ["It shapes ethics: the memory of being strangers in Egypt leads to the duty to treat strangers, workers and the poor fairly", 2],
          ["It links to the giving of the Torah at Sinai, which gives Jews their law and identity", 2],
        ],
        levels: levels(10),
        modelAnswer: "The Exodus is important to Jews because it created them as a people: slaves became a nation with a covenant and a law. It shows God as a redeemer who hears the cry of the oppressed.\n\nJews retell the story at the seder every year, so that each generation feels part of the story. It also shapes Jewish ethics, since the memory of being strangers in Egypt leads to the duty to treat strangers, workers and the poor fairly. The Exodus leads to Sinai, where Jews received the Torah, which gives them their law and identity.",
        explanation: "Level marking: several developed reasons linked to belief, worship and ethics reach the top levels.",
      }),
    ]),
    hints: ["In (a), follow the order from Egypt to Sinai. In (b), link the story to Passover and ethics."],
    explanation: "A Paper 1 style question: (a) narrate the Exodus, (b) explain its importance.",
  });

  // 3. Paper 1: The synagogue and worship.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.judaism.worship-practitioners"],
    stem: "This question is about the synagogue and Jewish worship.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the main features of a synagogue and the ways in which Jews worship there.",
        points: [
          ["The ark (aron hakodesh) on the wall facing Jerusalem holds the Torah scrolls", 2],
          ["The bimah is the platform or desk from which the Torah is read", 2],
          ["The ner tamid is the lamp that always burns above the ark, recalling the Temple lamp", 2],
          ["There are no images of God; seating is separate in Orthodox synagogues and mixed in Reform ones", 2],
          ["Jews pray three times a day (shacharit, minchah, maariv) from the siddur; some prayers need a minyan of ten adults", 2],
          ["On Shabbat the Torah is read and the rabbi preaches; the cantor leads the chanting of prayers", 2],
          ["Worshippers wear a kippah and tallit, and wear tefillin at weekday morning prayer", 2],
          ["The synagogue is also a place of study and of community meetings", 1],
        ],
        modelAnswer: "The most important feature of a synagogue is the ark, a cabinet on the wall facing Jerusalem, which holds the Torah scrolls. The scrolls are read from the bimah, the raised platform. Above the ark burns the ner tamid, a lamp that is always lit, recalling the lamp in the Temple. There are no images of God. In Orthodox synagogues men and women sit separately, while Reform synagogues have mixed seating.\n\nJews pray three times a day, shacharit, minchah and maariv, using the prayer book, and some prayers need a minyan of ten adults. On Shabbat the Torah is read, the rabbi preaches and the cantor leads the chanting. Worshippers wear a kippah and a tallit, and tefillin at weekday morning prayer. The synagogue is also a place of study and community meetings.",
        explanation: "Two marks for each developed feature or practice; one for study and community.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the importance of the synagogue to Jewish communities.",
        points: [
          ["It is a place of communal prayer, including prayers that need a minyan", 2],
          ["It houses the Torah and is the place where the scrolls are read, showing the centrality of God's teaching", 2],
          ["It is a place of study, where children and adults learn Hebrew and the Torah", 2],
          ["Since the Temple was destroyed in 70 CE, the synagogue has been the centre of Jewish worship and community life", 2],
          ["In the diaspora it helps Jews to keep their identity and brings them together for festivals and life events", 2],
        ],
        levels: levels(10),
        modelAnswer: "The synagogue is important because it is a place of communal prayer, including prayers that need a minyan of ten. It houses the Torah scrolls and is the place where they are read, which shows that God's teaching is central. It is also a place of study where children and adults learn Hebrew and the Torah.\n\nSince the Temple was destroyed in 70 CE the synagogue has been the centre of Jewish worship and community life. In the diaspora, where Jews live as minorities, it helps them to keep their identity and brings them together for festivals and life events.",
        explanation: "Level marking: developed reasons linked to prayer, Torah, study and community reach the top levels.",
      }),
    ]),
    hints: ["In (a), name each feature and say what it is for. In (b), give reasons about prayer, Torah, study and the diaspora."],
    explanation: "A Paper 1 style question: (a) describe synagogue features and worship, (b) explain the synagogue's importance.",
  });

  // 4. Paper 1: Shabbat and festivals.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.judaism.sabbath-festivals"],
    stem: "This question is about the Sabbath and Jewish festivals.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe how Jews keep Shabbat.",
        points: [
          ["Shabbat lasts from sunset on Friday to nightfall on Saturday; its basis is Genesis 2 and Exodus 20", 2],
          ["Before sunset the house is cleaned and the meal prepared", 2],
          ["The family lights two candles to welcome Shabbat and bring peace to the home", 2],
          ["Kiddush is said over wine and the family shares two loaves of challah at a family meal", 2],
          ["The family attends the synagogue, where the Torah is read on Saturday morning", 2],
          ["Observant Jews rest from ordinary work: no cooking, lighting a fire, writing, and (in Orthodox practice) driving", 2],
          ["Havdalah at nightfall, with wine, spices and a braided candle, ends Shabbat", 2],
          ["Time is spent on rest, study and with the family", 1],
        ],
        modelAnswer: "Shabbat lasts from sunset on Friday to nightfall on Saturday and is based on Genesis 2 and Exodus 20. Before sunset the house is cleaned and the meal prepared. The family lights two candles to welcome Shabbat and bring peace to the home. The father says kiddush over wine, and the family shares two loaves of challah at the meal.\n\nOn Saturday the family goes to the synagogue, where the Torah is read. Observant Jews rest from ordinary work: they do not cook, light a fire or write, and in Orthodox practice they do not drive. The day is spent on rest, study and with the family. At nightfall, havdalah, with wine, spices and a braided candle, ends Shabbat.",
        explanation: "Two marks for each developed stage or custom; one for rest, study and family.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the significance of the festival of Pesach (Passover) for Jews.",
        points: [
          ["It remembers the Exodus, the event that made the Jews a people", 2],
          ["At the seder, the story is retold from the Haggadah and each person is encouraged to feel they came out of Egypt", 2],
          ["The foods are symbols: matzah (haste), bitter herbs (bitterness of slavery) and wine (freedom)", 2],
          ["Removing leavened bread from the home shows the commitment to the commandments", 2],
          ["It teaches that freedom is a gift of God with responsibility to care for the oppressed", 2],
        ],
        levels: levels(10),
        modelAnswer: "Pesach is significant because it remembers the Exodus, the event that made the Jews a people. At the seder the story is retold from the Haggadah, and each person is encouraged to feel that they themselves came out of Egypt.\n\nThe foods are symbols: matzah recalls the haste of the departure, bitter herbs the bitterness of slavery, and wine freedom. Removing leavened bread from the home shows commitment to the commandments. The festival teaches that freedom is a gift of God, which carries the responsibility to care for the oppressed.",
        explanation: "Level marking: developed reasons linked to the story, symbols and ethics reach the top levels.",
      }),
    ]),
    hints: ["In (a), follow the order from Friday preparation to havdalah. In (b), link each custom to a meaning."],
    explanation: "A Paper 1 style question: (a) describe Shabbat, (b) explain Pesach.",
  });

  // 5. Paper 1: Rites of passage.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.judaism.rites-passage"],
    stem: "This question is about Jewish rites of passage.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the Jewish ceremonies of brit milah (birth) and bar mitzvah or bat mitzvah (coming of age).",
        points: [
          ["Brit milah: a baby boy is circumcised on the eighth day, as commanded to Abraham (Genesis 17)", 2],
          ["It is performed by a mohel in the presence of family and friends, at home or in the synagogue", 2],
          ["The boy is given his Hebrew name at the ceremony and the guests wish him a life of Torah, marriage and good deeds", 2],
          ["A baby girl is named in a ceremony in the synagogue or at home, with prayers for the child and mother", 2],
          ["Bar mitzvah: at 13 a boy becomes responsible for keeping the commandments; he prepares by learning Hebrew and a Torah portion", 2],
          ["He is called up to the Torah in the synagogue, may read and give a talk; the family celebrates", 2],
          ["Bat mitzvah: at 12 (Orthodox) or 12-13 (other groups) a girl takes on the same responsibility; in Reform and Conservative synagogues she often reads from the Torah", 2],
          ["He or she may be counted in the minyan (Orthodox: boys only)", 1],
        ],
        modelAnswer: "A Jewish baby boy is circumcised on the eighth day, as commanded to Abraham in Genesis 17. This brit milah is performed by a mohel in the presence of family and friends, at home or in the synagogue. The boy is given his Hebrew name and the guests wish him a life of Torah, marriage and good deeds. A baby girl is named in a ceremony in the synagogue or at home, with prayers for the child and her mother.\n\nAt 13 a boy becomes a bar mitzvah and responsible for keeping the commandments. He prepares by learning Hebrew and a Torah portion, is called up to the Torah in the synagogue, may read and give a talk, and the family celebrates. A girl becomes a bat mitzvah at 12 in Orthodox tradition or at 12 or 13 in other groups; in Reform and Conservative synagogues she usually reads from the Torah. In Orthodox practice only boys are counted in the minyan.",
        explanation: "Two marks for each developed point; one mark for the minyan.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the importance of rites of passage in Judaism.",
        points: [
          ["They link each person to the covenant (brit milah) and to the Torah (bar and bat mitzvah)", 2],
          ["They mark responsibility, such as taking on the commandments", 2],
          ["They involve the family and the community, who celebrate or mourn together", 2],
          ["Through them Jewish identity and traditions are passed on from one generation to the next", 2],
          ["Rites of mourning, such as shiva and kaddish, support the bereaved and express faith in God", 2],
        ],
        levels: levels(10),
        modelAnswer: "Rites of passage are important because they link each person to the covenant, through brit milah, and to the Torah, through the bar and bat mitzvah. They mark responsibility, as when a young person takes on the commandments.\n\nThey involve the family and the community, who celebrate or mourn together, and they pass on Jewish identity and traditions from one generation to the next. The rites of mourning, such as shiva and the kaddish, support the bereaved and express faith in God even in sorrow.",
        explanation: "Level marking: developed reasons linked to covenant, responsibility, community and mourning reach the top levels.",
      }),
    ]),
    hints: ["In (a), cover birth and coming of age with the meaning of each. In (b), give reasons about covenant, responsibility, community and continuity."],
    explanation: "A Paper 1 style question: (a) describe two rites, (b) explain the importance of rites of passage.",
  });

  // 6. Paper 1: Jewish moral teaching.
  b.struct({
    ...p1, d: 5,
    concepts: ["frs.judaism.ethics"],
    stem: "This question is about Jewish moral teaching.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the main moral teachings of Judaism.",
        points: [
          ["The Ten Commandments (Exodus 20) include duties to God and to others: honour parents, do not murder, steal, commit adultery or give false testimony", 2],
          ["The Torah contains 613 mitzvot, many of them concerned with ethics", 2],
          ["Justice (tzedek): honest courts and fair business (Leviticus 19:35-36), and fair wages (Deuteronomy 24)", 2],
          ["Charity (tzedakah) is a duty: leaving the edges of the field for the poor (Leviticus 19:9-10)", 2],
          ["Love of neighbour (Leviticus 19:18) and the stranger (Leviticus 19:34), because Israel was a stranger in Egypt", 2],
          ["Acts of loving-kindness (gemilut hasadim), such as visiting the sick and comforting mourners", 2],
          ["The sanctity of life: pikuach nefesh overrides most laws, including the Sabbath", 2],
          ["The prophets call for justice, as in Micah 6:8", 1],
        ],
        modelAnswer: "Jewish moral teaching is based on the Ten Commandments, which include duties to God and to others: honour your parents and do not murder, steal, commit adultery or give false testimony. The Torah contains 613 mitzvot, many concerned with ethics.\n\nJudaism teaches justice, with honest courts and fair business (Leviticus 19:35-36), and charity as a duty, such as leaving the edges of the field for the poor (Leviticus 19:9-10). Jews must love their neighbour (Leviticus 19:18) and the stranger (Leviticus 19:34), because Israel was a stranger in Egypt. They are taught to perform acts of loving-kindness such as visiting the sick. The sanctity of life is so important that pikuach nefesh overrides most laws, including the Sabbath. The prophets, as in Micah 6:8, call for justice.",
        explanation: "Two marks for each developed teaching with a reference where possible; one for the prophets.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "How relevant is Jewish moral teaching to people in Zimbabwe today?",
        points: [
          ["Relevant: justice, honesty and fair wages address corruption and exploitation", 2],
          ["Relevant: the duty of charity and care for the poor supports those in need, such as orphans and the hungry", 2],
          ["Relevant: love of the stranger supports fair treatment of migrants and refugees", 2],
          ["Relevant: the value of life supports health care, while some teachings (Sabbath, food laws) apply only to Jews", 2],
          ["A supported judgement: the ethical core is shared with other religions and with Zimbabwean values such as unhu/ubuntu", 2],
        ],
        levels: levels(10),
        modelAnswer: "Jewish moral teaching has much to say to Zimbabwe today. Its stress on justice, honesty and fair wages addresses corruption and exploitation, and the duty of charity supports those in need, such as orphans and the hungry. Love of the stranger supports fair treatment of migrants and refugees, and the value of life supports health care.\n\nSome teachings, such as the Sabbath and the food laws, apply only to Jews as part of the covenant. But the ethical core is shared with other religions and with Zimbabwean values such as unhu/ubuntu. I therefore conclude that Jewish ethics remain highly relevant, especially its teaching on justice, kindness and the value of life.",
        explanation: "Level marking: developed applications to Zimbabwe, with a view on what applies to everyone, reach the top levels.",
      }),
    ]),
    hints: ["In (a), give each teaching with a reference. In (b), link teachings to problems in Zimbabwe and judge."],
    explanation: "A Paper 1 style question: (a) describe moral teachings, (b) assess their relevance today.",
  });
});
