// W3b exam-format items: Paper 2 (Contemporary issues, topics 7, 8 and 11) structured essay questions, 25 marks = (a) 15 + (b) 10.
// Plans from EXAM in lib.mjs; the paper structure is our convention (reviewer to check).
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const p2 = { skill: EXAM.ZIM_P2.skill, applies: EXAM.ZIM_P2.applies, secs: EXAM.ZIM_P2.secs, examStyle: true, paper: "Paper 2" };

concept("frs.education.institutions", { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec" }, (b) => {
  // 1. Paper 2: religion and the founding of schools.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.education.institutions"],
    stem: "This question is about religion and the founding of schools and colleges.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain the role of religious organisations in establishing schools and colleges in Zimbabwe.",
        points: [
          ["Missionary societies and churches opened mission stations with schools, such as Inyati (London Missionary Society, 1859), Hope Fountain, Chishawasha, Kutama, Old Mutare, Waddilove and Dadaya", 2],
          ["A reason: to teach converts to read scripture, so that literacy was part of the mission", 2],
          ["A reason: to train pastors, evangelists, teachers and other helpers", 2],
          ["A reason: to serve communities, often combining a school, a church and a clinic", 2],
          ["Churches later founded colleges and universities, such as Africa University (United Methodist), the Catholic University of Zimbabwe and Solusi University (Adventist)", 2],
          ["Muslim communities run madrasah, and other faiths organise religious classes for their children", 2],
          ["Many mission schools taught practical skills such as building, farming and nursing as well as reading and arithmetic", 2],
          ["Churches work with government as responsible authorities for many schools today", 1],
        ],
        modelAnswer: "Religious organisations, especially Christian missionary societies and churches, founded many of the first schools in Zimbabwe. They opened mission stations with schools, such as Inyati, opened by the London Missionary Society in 1859, Hope Fountain, Chishawasha and Kutama (Catholic), Old Mutare and Waddilove (Methodist) and Dadaya (Church of Christ).\n\nThey did this to teach converts to read scripture, to train pastors, evangelists and teachers, and to serve communities, often combining a school, a church and a clinic. Many mission schools taught practical skills such as building, farming and nursing as well as reading and arithmetic. Later, churches founded colleges and universities, such as Africa University (United Methodist), the Catholic University of Zimbabwe and Solusi University (Seventh-day Adventist). Muslim communities run madrasah, and other faiths organise religious classes for their children. Today churches work with the government as responsible authorities for many schools.",
        explanation: "Two marks for each developed reason or example; one mark for the present-day partnership. Only credit institutions with the correct founding church.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Assess the contribution of religious organisations to human resource capacity in Zimbabwe.",
        points: [
          ["They trained teachers, nurses, clergy and other skilled workers who served communities", 2],
          ["They reached rural areas where few other schools existed, increasing literacy", 2],
          ["Many leaders in business, government and the churches were educated in church schools and colleges", 2],
          ["Limits and criticisms: colonial-era curricula could be restrictive, schools could look down on African customs, and fees or denominational preference could exclude some children", 2],
          ["A supported judgement that the contribution was large but not without limits", 2],
        ],
        levels: levels(10),
        modelAnswer: "Religious organisations made a large contribution to human resource capacity. They trained teachers, nurses, clergy and other skilled workers who served communities, and they reached rural areas where few other schools existed, so more people learnt to read and write. Many leaders in business, government and the churches were educated in church schools and colleges.\n\nThere were limits. In the colonial period the curriculum for Africans was often restricted, some schools looked down on African customs, and fees or denominational preference could exclude some children. I conclude that the contribution was large and lasting, although it was not equal for everyone and came with criticisms that deserve attention.",
        explanation: "Level marking: developed contributions and criticisms with a supported judgement reach the top levels.",
      }),
    ]),
    hints: ["In (a) give reasons and named examples. In (b) weigh the contribution against the criticisms."],
    explanation: "A Paper 2 style question: (a) explain the role of religious organisations in founding institutions, (b) assess their contribution.",
  });

  // 2. Paper 2: negative impact on education.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.education.negative-impact"],
    stem: "This question is about the negative impact of some religious beliefs and practices on education.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the ways in which some religious beliefs and practices may prevent children from receiving an education.",
        points: [
          ["Child marriage: a girl is withdrawn from school to marry, which is unlawful because the Constitution sets 18 as the minimum age (section 78)", 2],
          ["Pledging (kuzvarira): a girl is promised in marriage to settle a debt, ending her schooling and violating her rights", 2],
          ["Gender bias: parents may educate sons before daughters, sometimes defending this by custom or religious teaching", 2],
          ["Refusal of schooling or of some subjects by some families or groups who believe modern education is unnecessary or harmful (a small number of cases)", 2],
          ["Religious ceremonies, funerals, fasting or pilgrimages that clash with school time and cause absence or tiredness", 2],
          ["A clash between religious and scientific views, which may make some pupils lose interest or feel unwelcome", 2],
          ["Expectations that young people leave school early to become religious workers or earners", 2],
          ["The right to education is protected by section 75 of the Constitution and by the Education Amendment Act 2020", 1],
        ],
        modelAnswer: "Some beliefs and practices can prevent children from receiving an education, although most religious leaders support schooling.\n\nChild marriage and pledging (kuzvarira) remove girls from school; both are unlawful because the Constitution sets 18 as the minimum age for marriage (section 78). Gender bias means that parents may educate sons before daughters, sometimes defending this by custom or religious teaching. A small number of families or groups may refuse schooling or some subjects because they believe modern education is unnecessary or harmful. Religious ceremonies, funerals, fasting or pilgrimages can clash with school time and cause absence or tiredness. A clash between religious and scientific views can make some pupils lose interest or feel unwelcome. Some young people are also expected to leave school early to become religious workers or earners. The right to education is protected by section 75 of the Constitution and the Education Amendment Act 2020.",
        explanation: "Two marks for each developed practice; one mark for the legal point. Do not credit statements that blame a whole religion.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Discuss how communities and religious leaders can address the problems you have described.",
        points: [
          ["Dialogue and awareness with parents on the value of education for boys and girls", 2],
          ["Religious leaders preaching that all children have equal worth and a right to learn, using their influence", 2],
          ["Enforcing the law: reporting child marriage and pledging to the police Victim Friendly Unit or Childline (116)", 2],
          ["Bursaries, school feeding and fee relief to reduce poverty pressure, and flexible school arrangements for ceremonies", 2],
          ["A supported judgement on which approach is most effective, such as combining law, leaders' support and help for poor families", 2],
        ],
        levels: levels(10),
        modelAnswer: "Communities can begin with dialogue and awareness, explaining to parents the value of education for boys and girls. Religious leaders can use their influence to preach that all children have equal worth and a right to learn. The law should be enforced, and cases of child marriage and pledging can be reported to the police Victim Friendly Unit or Childline on 116. Bursaries, school feeding and fee relief reduce the poverty that pushes families to withdraw children, and schools can agree flexible dates for ceremonies.\n\nThe most effective approach combines these: the law protects children, religious leaders change attitudes, and help for poor families removes the pressure. Law alone does not change belief, and persuasion alone cannot protect a child who is in immediate danger.",
        explanation: "Level marking: developed solutions, more than one view of effectiveness, and a supported judgement reach the top levels.",
      }),
    ]),
    hints: ["In (a) cover several different problems and add the law. In (b) suggest solutions, say who acts and judge which is best."],
    explanation: "A Paper 2 style question: (a) describe negative impacts, (b) discuss solutions.",
  });

  // 3. Paper 2: gender roles in two religions.
  b.struct({
    ...p2, d: 5,
    concepts: ["frs.gender.christianity-islam"],
    stem: "This question is about gender roles in two religions.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the roles of women and men in Christianity and Islam.",
        points: [
          ["Christianity: Genesis 1:27 teaches that men and women are made in God's image; Galatians 3:28 teaches that all are one in Christ", 2],
          ["Christianity: women followed and supported Jesus, and Mary Magdalene is named as the first to see the risen Jesus (Luke 8:1-3; John 20)", 2],
          ["Christianity: Catholic and Orthodox churches ordain only men as priests; many Protestant churches ordain women; women's groups such as Ruwadzano and Manyano exist", 2],
          ["Christianity: Ephesians 5 is read by some as male headship and by others as mutual submission", 2],
          ["Islam: men and women are equal before God and both must perform the Five Pillars (Qur'an 4:1; 33:35)", 2],
          ["Islam: women have the right to consent to marriage, to the mahr, to own property and to a share of an inheritance", 2],
          ["Islam: Khadijah (businesswoman, first wife of the Prophet) and Aisha (scholar) are models; Muslims interpret dress and modesty in different ways", 2],
          ["In both religions believers interpret roles differently", 1],
        ],
        modelAnswer: "In Christianity, Genesis 1:27 teaches that men and women are both made in the image of God, and Galatians 3:28 teaches that all are one in Christ. The Gospels show women following and supporting Jesus (Luke 8:1-3), and Mary Magdalene is named as the first to see the risen Jesus (John 20). The Catholic and Orthodox churches ordain only men as priests, while many Protestant churches ordain women, and women's groups such as Ruwadzano and Manyano are active in Zimbabwe. Some Christians read Ephesians 5 as teaching male headship, and others as teaching mutual submission.\n\nIn Islam, men and women are equal before God and both must keep the Five Pillars (Qur'an 4:1; 33:35). Women have the right to consent to marriage, to the mahr, to own property and to a share of an inheritance. Khadijah, a businesswoman and the first wife of the Prophet, and Aisha, a scholar, are models, and Muslims interpret matters such as dress and modesty in different ways. In both religions believers interpret roles differently.",
        explanation: "Two marks for each developed point, with scripture where possible; one mark for noting differences within each religion. Credit a balanced account of both religions.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Assess the view that Christianity and Islam both promote equality between women and men.",
        points: [
          ["For: teaching on equal worth in both religions (Genesis 1:27, Galatians 3:28; Qur'an 4:1, 33:35)", 2],
          ["For: rights and roles of women (women ministers in many churches, women's groups; mahr, property and inheritance rights in Islam)", 2],
          ["Against or limits: male-only priesthood in some churches, headship readings of Ephesians 5, and differences in roles in worship and inheritance that some regard as unequal", 2],
          ["Believers disagree within each religion, so interpretation matters", 2],
          ["A supported judgement", 2],
        ],
        levels: levels(10),
        modelAnswer: "Both religions teach that women and men have equal worth: Genesis 1:27 and Galatians 3:28 in Christianity, and Qur'an 4:1 and 33:35 in Islam. Both also give women real rights and roles, such as women ministers in many churches and women's groups, and the rights to the mahr, property and inheritance in Islam.\n\nHowever, some churches ordain only men, some Christians read Ephesians 5 as male headship, and some differences in roles in worship and inheritance are regarded by some as unequal, though others see them as different but fair. Believers disagree within each religion, so interpretation matters. I conclude that both religions contain strong teaching on equal worth, but how far they promote equality in practice depends on how their teachings are interpreted and applied.",
        explanation: "Level marking: evidence from both religions, differences within them, and a supported judgement reach the top levels. Do not rank the religions.",
      }),
    ]),
    hints: ["Cover both religions in (a), including differences within each. In (b) separate equal worth from equal roles."],
    explanation: "A Paper 2 style question: (a) describe gender roles in Christianity and Islam, (b) assess how far they promote equality.",
  });

  // 4. Paper 2: religion and GBV.
  b.struct({
    ...p2, d: 5,
    concepts: ["frs.gender.equality-gbv"],
    stem: "This question is about religion and gender-based violence (GBV).",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain how religious groups can respond to gender-based violence and harmful practices in Zimbabwe.",
        points: [
          ["Teach that violence is wrong and that women and men have equal worth, using scripture (for example Genesis 1:27; Galatians 3:28; Qur'an 30:21)", 2],
          ["Teach respect and love in marriage, such as Ephesians 5, Qur'an 30:21 and the Jewish idea of shalom bayit (peace in the home)", 2],
          ["Offer counselling, safe places and practical help to survivors, and refer them to the police Victim Friendly Unit, clinics or Childline (116)", 2],
          ["Speak out and refuse to bless child or forced marriage, and teach against harmful practices such as pledging, virginity testing and wife inheritance without consent", 2],
          ["Women's groups and women leaders support survivors and give women a voice", 2],
          ["Men's groups and leaders teach boys and men that real strength is respect and protecting others", 2],
          ["Take part in campaigns and interfaith work, such as the 16 Days of Activism against GBV", 2],
          ["The law supports them: Constitution (sections 56, 78, 80) and the Domestic Violence Act 2007", 1],
        ],
        modelAnswer: "Religious groups can respond to gender-based violence by teaching that violence is wrong and that women and men have equal worth, using scripture such as Genesis 1:27, Galatians 3:28 and Qur'an 30:21. They can teach respect and love in marriage, for example from Ephesians 5, Qur'an 30:21 and the Jewish idea of shalom bayit.\n\nThey can offer counselling, safe places and practical help to survivors and refer them to the police Victim Friendly Unit, clinics or Childline (116). They can speak out, refuse to bless child or forced marriage, and teach against harmful practices such as pledging, virginity testing and wife inheritance without consent. Women's groups and women leaders can support survivors, and men's groups and leaders can teach boys and men that real strength is respect. Religious groups also take part in campaigns and interfaith work such as the 16 Days of Activism. The Constitution (sections 56, 78 and 80) and the Domestic Violence Act 2007 support these efforts.",
        explanation: "Two marks for each developed response; one mark for the law. Credit responses from different religions.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Assess the view that religion does more to reduce gender-based violence than to encourage it.",
        points: [
          ["Reduce: teachings on equal worth, respect and love in marriage; counselling and help to survivors", 2],
          ["Reduce: women's and men's groups, campaigns and interfaith work; leaders speak out", 2],
          ["Encourage or allow: misuse of verses to justify male control; leaders who advise silence; harmful customs defended as tradition", 2],
          ["GBV occurs in every society and among believers and non-believers, so religion is one influence among many", 2],
          ["A supported judgement", 2],
        ],
        levels: levels(10),
        modelAnswer: "Religion does much to reduce gender-based violence. Religions teach equal worth, respect and love in marriage; they offer counselling and help to survivors; and women's and men's groups, campaigns and interfaith work spread the message that violence is wrong.\n\nHowever, religious teachings can be misused to justify male control, some leaders advise silence, and some harmful customs are defended as tradition. GBV occurs in every society and among believers and non-believers, so religion is one influence among many. I conclude that religion does more to reduce GBV than to encourage it, as its central teachings condemn violence, but this depends on leaders who teach and act on those teachings.",
        explanation: "Level marking: evidence on both sides and a supported judgement reach the top levels.",
      }),
    ]),
    hints: ["Give responses from more than one religion in (a). In (b) weigh protection against misuse."],
    explanation: "A Paper 2 style question: (a) explain religious responses to GBV, (b) assess the role of religion.",
  });

  // 5. Paper 2: teachings on stewardship.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.environment.teachings"],
    stem: "This question is about religious teachings on stewardship of the natural environment.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the teachings of Indigenous Religion, Christianity and Islam on how people should treat the natural environment.",
        points: [
          ["IR: the land belongs to God and the ancestors; the chief allocates land in trust", 2],
          ["IR: nature is sacred; sacred places, taboos, totems and chisi protect the environment", 2],
          ["Christianity: the earth is the Lord's (Psalm 24:1); humans are made in God's image and given dominion (Genesis 1:26-28)", 2],
          ["Christianity: dominion is understood as stewardship; the first people were placed in the garden to cultivate and look after it (Genesis 2:15)", 2],
          ["Judaism and Christianity share the Sabbath year for the land (Leviticus 25) as a sign that land is not simply a resource", 2],
          ["Islam: humans are God's khalifah on earth (Qur'an 2:30; 6:165); the earth is a trust (amanah)", 2],
          ["Islam: Qur'an 30:41 links corruption on land and sea to human actions; Qur'an 7:31 warns against waste", 2],
          ["All teach that people are accountable for how they treat creation", 1],
        ],
        modelAnswer: "In Indigenous Religion the land belongs to God and the ancestors, and the chief allocates land in trust. Nature is sacred, and sacred places, taboos, totems and chisi protect the environment.\n\nIn Christianity the earth is the Lord's (Psalm 24:1). Humans are made in God's image and given dominion (Genesis 1:26-28), which many understand as stewardship: the first people were placed in the garden to cultivate and look after it (Genesis 2:15). Leviticus 25 commands a Sabbath year for the land, shared by Jews, as a sign that the land is not simply a resource.\n\nIn Islam, humans are God's khalifah on earth (Qur'an 2:30; 6:165) and the earth is a trust (amanah). Qur'an 30:41 links corruption on land and sea to human actions, and Qur'an 7:31 warns against waste. All the religions teach that people are accountable for how they treat creation.",
        explanation: "Two marks for each developed teaching, with a reference where possible; one mark for the shared theme.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Compare the teachings of two of these religions on the environment, and assess how far they agree.",
        points: [
          ["Similarity: both teach that the earth belongs to God (and ancestors in IR) and that humans are accountable", 2],
          ["Similarity: both give practical rules or practices (taboos, Sabbath year, avoiding waste)", 2],
          ["Difference: IR stresses ancestors, sacred places and taboos; Christianity stresses creation, dominion as stewardship; Islam stresses khalifah and amanah", 2],
          ["Difference in sources and language: oral tradition and custom, the Bible, the Qur'an", 2],
          ["A supported judgement on how far they agree", 2],
        ],
        levels: levels(10),
        modelAnswer: "Indigenous Religion and Christianity agree on the main point: the earth does not belong to humans alone. In IR the land belongs to God and the ancestors, and in Christianity the earth is the Lord's (Psalm 24:1). Both teach that people are accountable, and both give practical rules: taboos and chisi in IR, the Sabbath year and care for the garden in Christianity.\n\nThey differ in emphasis and source. IR stresses the ancestors, sacred places and taboos and is handed on by oral tradition, while Christianity stresses creation and dominion understood as stewardship, drawn from the Bible. I conclude that the two agree strongly on the duty of care, and differ mainly in their language and sources.",
        explanation: "Level marking: both similarities and differences with a supported judgement reach the top levels. Accept any two religions.",
      }),
    ]),
    hints: ["In (a) give one or two teachings for each religion with references. In (b) choose two religions and give similarities and differences."],
    explanation: "A Paper 2 style question: (a) describe teachings in three religions, (b) compare two.",
  });

  // 6. Paper 2: IR conservation, how effective.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.environment.ir-conservation"],
    stem: "This question is about Indigenous Religion and the conservation of the environment.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe how Indigenous Religion helps to conserve the environment.",
        points: [
          ["Sacred forests, groves and mountains are believed to be homes of ancestors or territorial spirits (mhondoro) and are protected from cutting and disturbance", 2],
          ["Sacred pools and rivers are believed to be homes of spirits; fishing and washing there are forbidden or limited", 2],
          ["Taboos (zviera) forbid cutting certain trees such as fruit trees, or killing certain animals", 2],
          ["Totems (mutupo/isibongo) protect animals because a clan does not kill or eat its totem", 2],
          ["Chisi, a rest day when no farm work is done, gives the soil a rest and shows respect for the land", 2],
          ["Chiefs allocate land and punish offenders, often with fines of livestock; spirit mediums pass on the wishes of the spirits", 2],
          ["Rain-making ceremonies (mukwerera/ukucela izulu) express dependence on God and the ancestors and the need to keep right relations with nature", 2],
          ["Elders teach the rules to children through stories and customs", 1],
        ],
        modelAnswer: "In Indigenous Religion the land belongs to God and the ancestors, and several practices protect it. Sacred forests, groves and mountains are believed to be homes of ancestors or territorial spirits (mhondoro), so they are protected from cutting. Sacred pools and rivers are believed to be homes of spirits, and fishing and washing there are forbidden or limited.\n\nTaboos (zviera) forbid cutting certain trees such as fruit trees, or killing certain animals. Totems (mutupo or isibongo) protect animals because a clan does not kill or eat its totem. Chisi, a rest day when no farm work is done, gives the soil a rest. Chiefs allocate land and punish offenders, often with fines of livestock, and spirit mediums pass on the wishes of the spirits. Rain-making ceremonies (mukwerera or ukucela izulu) express dependence on God and the ancestors. Elders teach the rules to children through stories and customs.",
        explanation: "Two marks for each developed method (the method, how it works and the benefit); one mark for teaching of the rules.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "How effective are indigenous methods of conserving the environment today?",
        points: [
          ["Effective: community-based, low cost, respected and linked to daily life; they have protected forests, pools and species", 2],
          ["Effective: chiefs and mediums provide authority; modern programmes such as CAMPFIRE (in outline) and revival of sacred sites work with traditional leaders", 2],
          ["Less effective: belief and authority have declined with changing religion, schooling and urban life", 2],
          ["Less effective: population growth, poverty, outsiders and new problems such as plastic waste, mining and climate change", 2],
          ["A supported judgement", 2],
        ],
        levels: levels(10),
        modelAnswer: "Indigenous methods are effective where they are still respected. They are community-based and low cost, and they are part of daily life, so they have protected forests, pools and species. Chiefs and mediums give them authority, and modern programmes such as CAMPFIRE and the revival of sacred sites show that traditional leaders can work with modern conservation.\n\nHowever, they are less effective today because belief and authority have declined with changing religion, schooling and urban life. Population growth and poverty increase pressure on land and trees, outsiders do not follow the rules, and new problems such as plastic waste, mining and climate change were not foreseen. I conclude that indigenous methods are valuable and effective locally, but they are not enough on their own and work best alongside modern law and science.",
        explanation: "Level marking: strengths and weaknesses with a supported judgement reach the top levels.",
      }),
    ]),
    hints: ["In (a) give the method, how it works and its benefit. In (b) weigh strengths against decline and new problems."],
    explanation: "A Paper 2 style question: (a) describe IR conservation, (b) assess its effectiveness.",
  });
});
