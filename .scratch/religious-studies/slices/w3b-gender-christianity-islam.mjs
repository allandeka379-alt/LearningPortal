// W3b: Gender roles in Christianity and Islam (Topic 8.3).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.gender.christianity-islam", { file: "gender/christianity-islam", keyPrefix: "gender.christianity-islam" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which New Testament verse teaches that in Christ there is no difference between male and female?",
    options: [
      ["Galatians 3:28", "Correct: all are one in Christ Jesus."],
      ["Genesis 1:27", "That verse is in the Old Testament and speaks of creation in God's image."],
      ["Ephesians 5:21", "This verse speaks of submitting to one another."],
      ["Luke 10:38", "This verse introduces the visit to Martha and Mary."],
    ],
    answer: "A",
    explanation: "**Galatians 3:28** says that there is no male or female in Christ; all are one.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the mahr in Islam?",
    options: [
      ["A gift from the husband to his wife that belongs to her", "Correct: it is paid at marriage."],
      ["A payment made by the wife's family to the husband's family", "The mahr is paid by the husband to the wife."],
      ["A tax collected by the mosque from every member each year", "That would be zakat, a different obligation."],
      ["A prayer said by the congregation before the wedding feast", "The mahr is a gift, not a prayer."],
    ],
    answer: "A",
    explanation: "The **mahr** is a gift from husband to wife, which is hers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which church teaching about the priesthood is correct?",
    options: [
      ["The Catholic and Orthodox churches ordain only men as priests", "Correct: they follow this tradition."],
      ["Every Christian church in the world ordains women as priests", "Churches differ on this."],
      ["No Christian church has ever allowed a woman to be a minister", "Many Protestant churches ordain women."],
      ["Only Methodist churches ordain any priests, men or women", "Several denominations ordain."],
    ],
    answer: "A",
    hints: ["Think of the two largest older traditions."],
    explanation: "Catholic and Orthodox churches **ordain only men**; many Protestant churches ordain women.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What are Ruwadzano and Manyano?",
    options: [
      ["Women's fellowship groups in several Zimbabwean churches", "Correct: women pray, visit the sick and help families."],
      ["Muslim classes for teaching the Qur'an to young children", "Those are madrasah, not church groups."],
      ["Ceremonies at which Indigenous Religion mediums are installed", "These are not spirit-medium ceremonies."],
      ["Jewish organisations that organise the Passover meal together", "These are not Jewish groups."],
    ],
    answer: "A",
    explanation: "**Ruwadzano** and **Manyano** are church women's fellowships.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who was Khadijah in Islamic tradition?",
    options: [
      ["The Prophet's first wife, who was a businesswoman", "Correct: she is honoured as the first to accept Islam."],
      ["The second caliph who ruled after Abu Bakr in Madinah city", "That was Umar, a man."],
      ["The angel who brought the revelation to the Prophet", "That was Jibril."],
      ["The mother of the prophet Ibrahim as named in the Qur'an", "She is not described as Ibrahim's mother."],
    ],
    answer: "A",
    explanation: "**Khadijah** was the Prophet's first wife and a successful businesswoman.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha says that Ephesians 5:21 teaches husband and wife to submit to one another in love. Tendai says the passage teaches that the husband should lead. What does this show about Christian interpretation?",
    options: [
      ["Christians read the same passage in different ways", "Correct: some stress headship and others mutual submission."],
      ["Christians have only one way of reading every passage", "These two readings differ."],
      ["Christians reject Ephesians as a book of the Bible", "Both accept Ephesians as scripture."],
      ["Christians believe that the passage concerns only the unmarried", "The passage is about husbands and wives."],
    ],
    answer: "A",
    hints: ["Compare the two readings."],
    explanation: "Christians interpret Ephesians 5 in **different ways**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can the Muslim rule on inheritance be described as a right and also as a subject of discussion?",
    options: [
      ["It gave women fixed shares, but some shares are debated", "Correct: both points are true."],
      ["It gave women no share, and Muslims agree on this entirely", "The Qur'an gave women fixed shares."],
      ["It removed all differences between sons and daughters in every case", "In many cases shares differ."],
      ["It applies only to Muslims who live outside Zimbabwe and Africa", "It applies to Muslims anywhere."],
    ],
    answer: "A",
    hints: ["Qur'an 4:11-12 gave women fixed shares, but not always equal ones."],
    explanation: "The rule **gave women fixed shares**, and scholars discuss how it applies.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is best supported by the teachings and practice of Christianity and Islam on gender?",
    options: [
      ["Both teach equal worth, but believers read roles differently", "Correct: this reports teaching and diversity."],
      ["Both religions teach exactly the same roles for women and men in all places", "Practice differs between groups."],
      ["Neither religion gives women any rights or any leadership at all", "Women have rights and roles in both."],
      ["One of the two religions is simply better for women than the other", "Fair study does not rank religions."],
    ],
    answer: "A",
    hints: ["Choose the answer that is fair and uses evidence."],
    explanation: "A fair conclusion reports **shared teaching on worth and differing interpretations**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Qur'an 4:1 teaches that all human beings were created from a single soul.",
    answer: true,
    explanation: "True. Qur'an 4:1 is used by Muslims to teach the common origin and equal worth of all people.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All Christian churches ordain women as ministers.",
    answer: false,
    explanation: "False. The Catholic and Orthodox churches ordain only men, while many Protestant churches ordain women.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reference with its teaching.",
    pairs: [
      ["Genesis 1:27", "Women and men are made in God's image"],
      ["Galatians 3:28", "All are one in Christ, male and female"],
      ["Qur'an 4:1", "All people were created from a single soul"],
      ["Luke 8:1-3", "Women followed and supported Jesus"],
    ],
    explanation: "Genesis 1:27 (image of God), Galatians 3:28 (one in Christ), Qur'an 4:1 (single soul), Luke 8:1-3 (women followers).",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "{{blank:a}} was a scholar and wife of the Prophet who passed on many Hadith; Mary {{blank:b}} is named in the Gospel of John as the first to see the risen Jesus.",
    blanks: [
      { id: "a", accepted: ["Aisha"], choices: ["Aisha", "Khadijah", "Fatima", "Ruth"] },
      { id: "b", accepted: ["Magdalene"], choices: ["Magdalene", "Martha", "Esther", "Miriam"] },
    ],
    hints: ["Khadijah was the first wife; the later wife was the scholar."],
    explanation: "**Aisha** was a scholar; Mary **Magdalene** saw the risen Jesus (John 20).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name of the gift that a Muslim husband gives to his wife at marriage?",
    accepted: ["mahr", "mehr", "dower", "dowry"],
    wrong: ["zakat", "hajj"],
    explanation: "It is the **mahr** (dower).",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** rights that Islam gives to women.",
    points: ["The right to consent to marriage", "The right to the mahr, to own property and keep earnings", "The right to a share of an inheritance, and to education"],
    modelAnswer: "Islam gives women the right to consent to marriage, to receive the mahr and own property, and to inherit and be educated.",
    explanation: "One mark for each right.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how women are shown in the ministry of Jesus.",
    points: [
      ["Women followed Jesus and supported his work (Luke 8:1-3)", 1],
      ["He spoke to a Samaritan woman at a well and taught her (John 4)", 1],
      ["He visited Mary and Martha (Luke 10:38-42)", 1],
      ["Women were the first to find the empty tomb, and Mary Magdalene was the first to see the risen Jesus (John 20)", 1],
    ],
    modelAnswer: "Women followed Jesus and supported his work (Luke 8:1-3). He spoke to a Samaritan woman at a well (John 4) and visited Mary and Martha (Luke 10:38-42). According to the Gospels, women were the first to find the empty tomb and Mary Magdalene was the first to see the risen Jesus (John 20).",
    hints: ["Use the Gospel stories of Luke and John."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why Christians and Muslims disagree about gender roles within their own religions.",
    points: [
      ["Believers interpret scripture in different ways", 1],
      ["Developed: for example, Christians read Ephesians 5 as headship or as mutual submission, and Muslims interpret verses on inheritance and dress differently", 2],
      ["Customs and laws in different countries and times shape how teachings are applied", 1],
      ["Developed: some practices reflect local culture or history and not only scripture, so believers in different places differ", 2],
    ],
    modelAnswer: "Believers interpret scripture in different ways. For example, Christians read Ephesians 5 as headship or as mutual submission, and Muslims interpret verses on inheritance and dress differently. Customs and laws in different countries and times also shape how teachings are applied, so some practices reflect local culture and not only scripture, and believers in different places disagree.",
    hints: ["Think about interpretation and about culture."],
    explanation: "Two reasons, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students in Mutare, 2026",
      "Chipo: In my church the Ruwadzano women pray together and visit the sick, and our minister is a woman.\nAisha: In my mosque the women have their own classes. My teacher told us that Islam gave women the right to own property and to receive a share of an inheritance.\nChipo: My cousin's church is Catholic, and there only men are priests."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement from Source A shows a difference between churches?",
        options: [
          ["Chipo's minister is a woman, but her cousin's church has male priests", "Correct: churches differ on ordination."],
          ["Aisha's teacher says that Islam gave women the right to own property", "This concerns Islam, not a difference between churches."],
          ["The Ruwadzano women pray together and visit the sick in their area", "This describes one group's activities."],
          ["Aisha's mosque has separate classes for the women and girls", "This concerns a mosque, not a church."],
        ],
        answer: "A", explanation: "The source shows that churches differ on ordaining women.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** roles or rights of women in religion.",
        points: ["Women pray together and visit the sick in the Ruwadzano group", "A woman is a minister in Chipo's church", "Women have the right to own property and inherit in Islam"],
        modelAnswer: "Women pray together and visit the sick in the Ruwadzano group, a woman is a minister in Chipo's church, and in Islam women have the right to own property and to inherit.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why Chipo's church and her cousin's church have different practices about ordination.",
        points: [["Christian denominations interpret the Bible and tradition differently", 1], ["Catholic teaching follows a tradition that priests are men, following the apostles", 1], ["Many Protestant churches argue that scripture such as Galatians 3:28 supports women's ministry", 1]],
        modelAnswer: "Christian denominations interpret the Bible and tradition differently. Catholic teaching follows a tradition that priests are men, following the apostles. Many Protestant churches argue that scripture such as Galatians 3:28 supports women's ministry.",
      }),
    ],
    hints: ["In (c) show that the difference comes from interpretation and tradition."],
    explanation: "The source shows how practice differs between denominations and what Islam teaches about women's rights.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Farai says: \"Christianity and Islam both teach that women and men are equal.\" Fatima says: \"They teach equal worth, but they also give different roles, and believers disagree about what those roles should be.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** Christian teachings on women and men.",
        points: [["Genesis 1:27: both are made in God's image", 1], ["Galatians 3:28: all are one in Christ", 1], ["Ephesians 5: husband and wife are to love and respect each other, read by some as headship and by others as mutual submission", 1], ["Women followed and were witnesses of Jesus in the Gospels", 1]],
        modelAnswer: "Genesis 1:27 teaches that women and men are both made in God's image, and Galatians 3:28 teaches that all are one in Christ.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which Islam protects the rights of women.",
        points: [["Women must consent to marriage and receive the mahr, which is theirs", 2], ["Women may own property and keep their earnings, or the Qur'an gives daughters, wives and mothers fixed shares of an inheritance", 2]],
        modelAnswer: "Islam gives women the right to own property and to keep their earnings, so that a woman controls her own money and is not dependent on her husband's family.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Christianity and Islam promote equality between women and men.",
        points: [["For: Genesis 1:27, Galatians 3:28, women in Jesus' ministry; Qur'an 4:1, 33:35 and women's rights in marriage, property and inheritance", 2], ["For: women's groups, women scholars and women ministers in many churches", 2], ["Against or limits: different roles, male-only priesthood in some churches, headship and inheritance rules that some regard as unequal; believers disagree", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Both religions teach that women and men have equal worth: Genesis 1:27 and Galatians 3:28 in Christianity, and Qur'an 4:1 and 33:35 in Islam. Both give women rights and roles: women followed Jesus, many churches ordain women and have women's groups, and Islam gives women rights to mahr, property and inheritance, with Khadijah and Aisha as models. However, some churches ordain only men, Ephesians 5 is read as headship by some, and inheritance and dress rules are debated among Muslims. I conclude that both religions contain strong teaching on equal worth, but whether they promote equality in practice depends on how believers interpret them.",
      }),
    ],
    hints: ["Use texts for both sides, note the differences within each religion, and conclude."],
    explanation: "A strong answer separates equal worth from equal roles and reports differing interpretations without ranking the religions.",
  });

  b.card("DEFINITION", "What is **ordination**?", "The ceremony by which a Christian is set apart as a priest, pastor or minister.");
  b.card("DEFINITION", "What is the **mahr**?", "A gift from a Muslim husband to his wife at marriage, which belongs to her.");
  b.card("FACT", "Which verses teach the equal worth of women and men in Christianity?", "Genesis 1:27 and Galatians 3:28.");
  b.card("FACT", "Which churches ordain only men as priests?", "The Catholic and Orthodox churches (many Protestant churches ordain women).");
  b.card("FACT", "What are Ruwadzano and Manyano?", "Church women's fellowship groups (Shona and Ndebele names) in several denominations.");
  b.card("FACT", "Who were Khadijah and Aisha?", "Khadijah: first wife of the Prophet and a businesswoman. Aisha: wife of the Prophet, a scholar who passed on many Hadith.");
  b.card("FACT", "Which Qur'an verse reminds humanity that all people were created from a single soul?", "Qur'an 4:1.");
  b.card("CONCEPT", "Why do Christians interpret Ephesians 5 in different ways?", "Some read it as male headship, others as mutual submission and partnership in love.");
  b.card("CONCEPT", "Why should answers on gender in religions avoid ranking them?", "Each religion has teaching on equal worth and varied interpretations; a fair answer reports both without saying one is better.");
});
