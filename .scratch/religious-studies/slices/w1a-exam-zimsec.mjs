// W1a exam-format items: ZIMSEC Paper 1 (Religions, topics 1-5) structured essay questions, STRUCTURED 25 = (a) 15 + (b) 10,
// ANALYSIS, x6: features and functions of religion; theories of origin; the concept of God in IR; the spirit world;
// practitioners; sacred places and rituals. Part structure and marks are our convention (reviewer to check against the
// syllabus assessment section and recent ZIMSEC papers).
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const X = EXAM.ZIM_P1;
const base = { skill: X.skill, secs: X.secs, examStyle: true, paper: "Paper 1", d: 4 };

concept("frs.religion.meaning-features", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec" }, (b) => {
  // 1. Features and functions of religion (Topic 1).
  b.struct({
    ...base,
    concepts: ["frs.religion.meaning-features", "frs.religion.functions"],
    stem: "This question is about the features and functions of religion.",
    parts: checkExam(X, [
      P.manual({
        label: "(a)", marks: 15,
        stem: "Describe the main features that most religions share.",
        points: [
          ["Beliefs: what members hold to be true about God, spirits, humans, life and death, e.g. belief in one God in Islam, or in Mwari and the ancestors in Indigenous Religion", 2],
          ["Worship and ritual: prayer, offerings and ceremonies, e.g. Salah, the Eucharist, mukwerera", 2],
          ["Sacred places, objects and times: places set apart and holy days, e.g. a synagogue, Njelele, the Sabbath, chisi", 2],
          ["Sacred texts or oral tradition: the source of teaching, e.g. the Torah, the Bible, the Qur'an, or the oral tradition of Indigenous Religion", 2],
          ["Practitioners: people with special roles, e.g. a rabbi, a priest, an imam, a svikiro", 2],
          ["Moral code: rules about right and wrong, e.g. the Ten Commandments, unhu, taboos", 2],
          ["Symbols and community: signs such as the cross, crescent or totem; the community of believers such as a congregation or clan", 2],
          ["Credits a reference to a scholar's model, e.g. Ninian Smart's seven dimensions, or the sacred and profane", 1],
        ],
        modelAnswer: "Most religions share a number of features. First, they have beliefs about God or spirits, humans and death; Muslims believe in one God, while in Indigenous Religion people believe in Mwari and the ancestors. Second, they have worship and ritual, such as the Muslim prayer Salah, the Christian Eucharist and the rain ceremony mukwerera.\n\nThird, religions set apart sacred places, objects and times: a synagogue, the Njelele shrine, the Sabbath and the day of rest, chisi. Fourth, they have sacred texts or oral tradition, such as the Torah, the Bible and the Qur'an, or the myths and proverbs of Indigenous Religion. Fifth, they have practitioners with special roles, such as a rabbi, a priest, an imam or a spirit medium (svikiro).\n\nSixth, they have a moral code, such as the Ten Commandments, the Five Pillars or the teaching of unhu and taboos. Finally, they use symbols such as the cross, the crescent and totems, and they have a community of believers, such as a congregation or a clan. Ninian Smart suggested seven dimensions of this kind as one scholar's model.",
        explanation: "About seven developed features, two marks each (the feature plus an explanation or example), and one mark for a reference to a scholar's model.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE",
        stem: "Explain the importance of religion in the life of a community.",
        points: [
          ["Gives meaning, comfort and moral guidance to individuals and families, e.g. funeral prayers and the teaching of unhu", 2],
          ["Brings people together (social cohesion) through shared worship and ceremonies, e.g. mukwerera or a congregation", 2],
          ["Encourages good conduct (social control) through taboos and teachings, e.g. the Ten Commandments or zviera", 2],
          ["Provides welfare, education and health services, e.g. mission schools and hospitals, zakat", 2],
          ["Marks life stages and gives identity, e.g. baptism, initiation, marriage; and notes that religion can also be misused", 2],
        ],
        levels: levels(10),
        wordLimit: { min: 100, max: 300 },
        modelAnswer: "Religion is important because it gives people meaning, comfort and moral guidance. A grieving family finds comfort in funeral prayers, and teachings such as unhu show young people how to treat others.\n\nReligion also brings the community together. When a village gathers for mukwerera or a congregation worships together, people share a purpose and feel they belong. Its teachings and taboos, such as the Ten Commandments or zviera, encourage good conduct and discourage harm, which helps keep order.\n\nReligious bodies provide welfare, education and health services; mission schools and hospitals serve many communities, and zakat helps the poor. Religion also marks the stages of life, such as baptism, initiation and marriage, and gives people an identity.\n\nHowever, religion can be misused, for example by leaders who exploit followers, so its importance depends on how it is practised. Overall, it plays a major positive role in community life.",
        explanation: "Credit developed reasons with examples, a balanced note and a supported conclusion.",
      }),
    ]),
    hints: ["In (a), name each feature and add an example from a religion; in (b), develop each importance with an example."],
    explanation: "Paper 1 item on the features (a) and importance (b) of religion.",
  });

  // 2. Theories of the origin of religion (Topic 1).
  b.struct({
    ...base,
    concepts: ["frs.religion.origins-theories"],
    stem: "This question is about theories of the origin of religion.",
    parts: checkExam(X, [
      P.manual({
        label: "(a)", marks: 15,
        stem: "Describe three theories of the origin of religion.",
        points: [
          ["Theory 1 named with its thinker (e.g. animism, E. B. Tylor)", 1],
          ["States its central idea (e.g. religion began with belief in spirits in people and nature)", 2],
          ["A strength or criticism of the first theory (e.g. explains belief in spirits; assumes a simple-to-complex development)", 2],
          ["Theory 2 named with its thinker (e.g. the social theory, Durkheim)", 1],
          ["States its central idea (e.g. religion expresses the unity of society, with totems as symbols of the clan)", 2],
          ["A strength or criticism of the second theory (e.g. explains why religion unites groups; does not explain private experience)", 2],
          ["Theory 3 named with its thinker (e.g. the psychological theory, Freud; or Marx; or fear and wonder at nature)", 1],
          ["States its central idea (e.g. religion meets a wish for protection like a child's need for a parent)", 2],
          ["A strength or criticism of the third theory (e.g. explains comfort in suffering; ignores community and morality)", 2],
        ],
        modelAnswer: "The first theory is animism, suggested by E. B. Tylor in 1871. He argued that early people, trying to understand dreams and death, came to believe that spirits live in people, animals and nature, and that religion grew from this belief. Its strength is that it explains why belief in spirits and ancestors is so common. A criticism is that it assumes religion developed from simple to complex stages, which the evidence does not support.\n\nThe second is the social theory of Émile Durkheim. He argued that when a clan gathers around its totem, it is really honouring society itself, so religion expresses and strengthens the unity of the group. It explains well why rituals and festivals bring people together, but it does not explain personal religious experience.\n\nThe third is the psychological theory of Sigmund Freud. He argued that people feel helpless before nature, illness and death, and that belief in a protecting father-figure meets a wish for security, as a child depends on a parent. It explains why religion comforts people in distress, but it ignores the community and moral sides of religion, and believers reject it.",
        explanation: "Three theories, each with 1 mark for naming, 2 for the idea and 2 for a strength or criticism.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE",
        stem: "Explain why no single theory of the origin of religion is accepted by all scholars.",
        points: [
          ["Each theory explains only part of religion, e.g. Durkheim the group side and Freud the personal side", 2],
          ["Each has criticisms, e.g. Tylor's simple-to-complex ladder is not supported by evidence", 2],
          ["Most theories come from outsiders, who look for natural causes, while believers hold that religion begins in revelation or creation", 2],
          ["Evidence about the earliest religion is limited, so theories cannot be tested fully", 2],
          ["Supported conclusion, e.g. the theories are best treated as different views to compare, and none can decide whether a religion is true", 2],
        ],
        levels: levels(10),
        wordLimit: { min: 100, max: 300 },
        modelAnswer: "No single theory is accepted by all scholars because each explains only part of religion. Durkheim explains well why religion unites a group, but not private prayer; Freud explains personal comfort, but not community life or moral teaching.\n\nEach theory also has criticisms. Tylor's idea that religion developed from simple to complex stages is not supported by the evidence, and Marx overlooks the times when religious groups have opposed injustice.\n\nIn addition, most theories come from outsiders who look for natural causes. Believers hold that religion begins in revelation or creation, such as the Qur'an revealed to the Prophet Muhammad or Mwari creating the world, and they reject theories that treat belief as a mistake or an illusion. Finally, we have little evidence of the earliest religion, so the theories cannot be tested fully.\n\nTherefore the theories are best treated as different views to compare, and none can decide whether a religion's claims are true.",
        explanation: "Credit developed reasons with examples and a supported conclusion.",
      }),
    ]),
    hints: ["In (a), take three theories and give the thinker, the idea and a strength or criticism of each; in (b), say what each theory leaves out."],
    explanation: "Paper 1 item on describing theories (a) and explaining why none is universally accepted (b).",
  });

  // 3. The concept of God in Indigenous Religion (Topic 2).
  b.struct({
    ...base,
    concepts: ["frs.indigenous.god-creation", "frs.indigenous.nature-sources"],
    stem: "This question is about the concept of God in Indigenous Religion.",
    parts: checkExam(X, [
      P.manual({
        label: "(a)", marks: 15,
        stem: "Describe the concept of God in Indigenous Religion.",
        points: [
          ["Names of God in Shona: Mwari, Musikavanhu (creator of people), Nyadenga (owner of the sky)", 2],
          ["Names of God in Ndebele: uMlimo, uNkulunkulu (the great one), uSimakade (the eternal one)", 2],
          ["God as creator of the world and people; creation myths such as the first people made by God", 2],
          ["God as provider and rain-giver, the one asked for rain and harvests", 2],
          ["God as supreme and eternal, above the ancestors and spirits; transcendent yet active in the life of the community", 2],
          ["God approached through intermediaries: the family ancestors and territorial spirits pass on requests", 2],
          ["The Mwari shrines in the Matopo Hills (Njelele, Matonjeni), where communities send petitions", 2],
          ["Credits a reference to the source of the belief in oral tradition: myths, prayers, proverbs and names", 1],
        ],
        modelAnswer: "In Indigenous Religion in Zimbabwe, believers speak of one Supreme Being under many names. In Shona, God is called Mwari, Musikavanhu, which means creator of people, and Nyadenga, owner of the sky. In Ndebele, God is called uMlimo, uNkulunkulu, the great one, and uSimakade, the eternal one.\n\nGod is believed to be the creator of the world and of people, and creation myths tell how the first people came into being. God is also the provider and rain-giver, so in a drought communities pray and make offerings for rain. God is supreme and eternal, above the ancestors and spirits, and believers speak of God as both far above human reach and active in the life of the community.\n\nPeople usually approach God through intermediaries: the family ancestors and the territorial spirits carry requests upward. For great needs, such as long droughts, communities send petitions with gifts to the Mwari shrines of Njelele and Matonjeni in the Matopo Hills. These beliefs are handed down in oral tradition, through myths, prayers, proverbs and the names of God themselves.",
        explanation: "About seven developed points, two marks each, and one mark for the oral sources of the belief.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE",
        stem: "Explain why the Mwari shrines of the Matopo Hills are important to believers.",
        points: [
          ["Believers hold that Mwari speaks through the shrines, so they are places of direct contact with God", 2],
          ["Communities send petitions, especially for rain, harvests and relief from drought, which are vital for survival", 2],
          ["They bring together Shona, Kalanga, Ndebele and other communities, who send messengers with gifts, which builds wider unity", 2],
          ["They are sacred places protected by taboos and respect, which conserve the hills and teach reverence", 2],
          ["They are linked with history and identity, e.g. the shrines were important in 1896, and they keep tradition alive today", 2],
        ],
        levels: levels(10),
        wordLimit: { min: 100, max: 300 },
        modelAnswer: "The Mwari shrines in the Matopo Hills are important because believers hold that Mwari speaks through them, so they are places of direct contact with God. Communities send messengers with gifts and petitions, especially for rain, harvests and relief from drought, which are vital for survival.\n\nThe shrines also bring together different peoples, including Shona, Kalanga and Ndebele communities, who send messengers to the same place, which builds wider unity. As sacred places they are protected by taboos and respect, which teaches reverence for God and also conserves the hills.\n\nFinally, the shrines are linked with history and identity, because they were important in the nineteenth century, and they help to keep tradition alive today. Overall, they are important as places where believers' dependence on God for rain and life is expressed.",
        explanation: "Credit developed reasons with examples and a supported conclusion.",
      }),
    ]),
    hints: ["In (a), cover names, attributes and the way people approach God; in (b), link the shrines to rain, unity and tradition."],
    explanation: "Paper 1 item on the concept of God (a) and the Mwari shrines (b).",
  });

  // 4. The spirit world (Topic 2).
  b.struct({
    ...base,
    concepts: ["frs.indigenous.spirit-world"],
    stem: "This question is about the spirit world in Indigenous Religion.",
    parts: checkExam(X, [
      P.manual({
        label: "(a)", marks: 15,
        stem: "Describe the different kinds of spirits believed in within Indigenous Religion and how they are believed to communicate.",
        points: [
          ["Family ancestral spirits (midzimu/amadlozi): deceased family members who guard the family and are honoured with offerings", 2],
          ["Becoming an ancestor: the spirit is brought home by kurova guva/umbuyiso after the death rites", 2],
          ["Territorial spirits (mhondoro): guard a chiefdom or region and its rain, e.g. Nehanda, Chaminuka, Kaguvi", 2],
          ["Alien spirits (mashavi): spirits from outside the family, believed to give skills such as healing or hunting", 2],
          ["Avenging spirits (ngozi): spirits of people who were wronged, believed to seek justice until the matter is settled", 2],
          ["Communication through dreams and through illness or misfortune read as a sign", 2],
          ["Communication through spirit mediums in possession and through diviners", 2],
          ["Credits a mention of witchcraft (uroyi/ubuthakathi) as a belief about harm by secret means, with its social risks", 1],
        ],
        modelAnswer: "Believers in Indigenous Religion describe several kinds of spirit. The family ancestral spirits, midzimu in Shona and amadlozi in Ndebele, are deceased family members who are believed to guard the family and are honoured with offerings. A person becomes an ancestor when the spirit is brought home in the ceremony of kurova guva or umbuyiso, after the death rites are complete.\n\nTerritorial spirits, mhondoro, guard a chiefdom or region and its rain; Nehanda, Chaminuka and Kaguvi are well-known names. Alien spirits, mashavi, come from outside the family and are believed to give skills such as healing or hunting. Avenging spirits, ngozi, are the spirits of people who were wronged, and they are believed to seek justice from the wrongdoer's family until the matter is settled.\n\nSpirits are believed to communicate through dreams, and through illness or misfortune that the family reads as a sign. They are also believed to speak through spirit mediums in possession and to be consulted through diviners. Belief in witchcraft, uroyi or ubuthakathi, is a belief about harm by secret means, and accusations have caused real harm.",
        explanation: "About seven developed points, two marks each, and one mark for the mention of witchcraft.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE",
        stem: "Explain the importance of the ancestors in the life of a Zimbabwean family.",
        points: [
          ["Protection and blessing: believed to guard health, fertility and harvests", 2],
          ["Guidance and moral order: the family consults the ancestors and keeps the rules and taboos they are believed to uphold", 2],
          ["Link between the living and the dead and with God: intermediaries who carry requests; continuity of the family line", 2],
          ["Unity and identity: ceremonies such as the bira and kurova guva/umbuyiso bring relatives together and pass on praises and customs", 2],
          ["Balance: the duties of the living; and some families combine this with another religion or seek medical care as well", 2],
        ],
        levels: levels(10),
        wordLimit: { min: 100, max: 300 },
        modelAnswer: "For believers the ancestors are important as protectors. They are believed to guard the health, fertility and harvests of the family, so the family honours them with offerings at ceremonies such as the bira.\n\nThey also provide guidance and moral order: the family consults them in difficulty and keeps the rules and taboos they are believed to uphold. They act as intermediaries who carry the family's requests to Mwari, and they give the family a sense of continuity with those who came before.\n\nCeremonies for the ancestors, such as the bira and kurova guva, bring relatives together, settle quarrels and pass on praises and customs to the young, so they strengthen unity and identity.\n\nThe relationship brings duties, and many families today combine it with another religion or seek medical care at the clinic as well. Overall, the ancestors remain important in giving protection, guidance and a sense of belonging.",
        explanation: "Credit developed reasons with examples and a supported conclusion.",
      }),
    ]),
    hints: ["In (a), describe each kind of spirit and then the means of communication; in (b), link the ancestors to protection, guidance and unity."],
    explanation: "Paper 1 item on the kinds of spirit (a) and the importance of the ancestors (b).",
  });

  // 5. Practitioners (Topic 2).
  b.struct({
    ...base,
    concepts: ["frs.indigenous.practitioners"],
    stem: "This question is about religious practitioners in Indigenous Religion.",
    parts: checkExam(X, [
      P.manual({
        label: "(a)", marks: 15,
        stem: "Describe the roles of practitioners and leaders in Indigenous Religion.",
        points: [
          ["Spirit mediums (masvikiro): believed to be chosen by a spirit; speak for it during possession", 2],
          ["Mediums give guidance on rain, land and community matters and help to lead ceremonies", 2],
          ["Traditional healers and herbalists (n'anga, inyanga): treat and counsel using knowledge of plants", 2],
          ["Diviners (n'anga, isangoma): seek the cause of illness and misfortune and the wishes of the spirits, e.g. with the hakata", 2],
          ["Chiefs and headmen: custodians of land, custom and sacred places; settle disputes; lead in ceremonies like mukwerera", 2],
          ["Family elders, the vatete and the sekuru: lead family rituals, speak to the ancestors, teach the young and help in marriage and mourning", 2],
          ["ZINATHA: an association that represents traditional healers; healers should refer serious illness to trained health workers", 2],
          ["Credits a reference to the expectation that practitioners are truthful and fair, and not to exploit or accuse people", 1],
        ],
        modelAnswer: "Spirit mediums, masvikiro, are believed to be chosen by a spirit and to speak for it during possession. They give guidance on rain, land and community matters and help to lead ceremonies.\n\nTraditional healers and herbalists, called n'anga in Shona and inyanga in Ndebele, treat and counsel people using their knowledge of plants. Diviners, n'anga or isangoma, look for the cause of illness and misfortune and for the wishes of the spirits, sometimes by throwing the hakata.\n\nChiefs and headmen are custodians of land, custom and sacred places, settle disputes and lead the community in ceremonies such as mukwerera. Within the family, elders lead rituals and speak to the ancestors, and the paternal aunt, vatete, and the maternal uncle, sekuru, have special roles in marriage and mourning.\n\nThe association ZINATHA represents traditional healers, and healers should refer serious illness to trained health workers. Practitioners are expected to be truthful and fair and must not exploit patients or accuse people of witchcraft.",
        explanation: "About seven developed points, two marks each, and one mark for the expectations of practitioners.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE",
        stem: "How relevant are traditional practitioners in Zimbabwe today?",
        points: [
          ["Still trusted for counsel, comfort and care, and close to the community; many people consult healers and mediums", 2],
          ["Chiefs, headmen and elders continue to settle disputes and care for land and sacred places; recognised by the Constitution", 2],
          ["Healers can work with clinics by referring patients and encouraging treatment", 2],
          ["Limits: no claim of cures for diseases such as HIV; abuse, false claims and witchcraft accusations are harmful and illegal", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(10),
        wordLimit: { min: 100, max: 300 },
        modelAnswer: "Traditional practitioners remain relevant to many Zimbabweans. Healers and mediums are trusted for counsel, comfort and care and live close to the community. Chiefs, headmen and elders continue to settle disputes and look after land and sacred places, and chiefs are recognised in the Constitution.\n\nHealers can also work with clinics. A healer who encourages a patient to go to the clinic and to complete treatment helps to reach people who might otherwise delay.\n\nHowever, there are limits. A healer must not claim to cure diseases such as HIV, because no herbal remedy has been shown to do so, and abuses such as false claims, exploitation and accusations of witchcraft cause harm and are illegal.\n\nOverall, traditional practitioners are still relevant, particularly for counsel, custom and community life, provided they work responsibly and alongside trained health workers.",
        explanation: "Credit developed points on relevance and limits, with examples and a supported conclusion.",
      }),
    ]),
    hints: ["In (a), cover mediums, healers, diviners, chiefs and family elders; in (b), give reasons they are relevant and limits."],
    explanation: "Paper 1 item on the roles of practitioners (a) and their relevance today (b).",
  });

  // 6. Sacred places and rituals (Topic 2).
  b.struct({
    ...base,
    concepts: ["frs.indigenous.sacred-places-attire", "frs.indigenous.worship-rituals"],
    stem: "This question is about sacred places and rituals in Indigenous Religion.",
    parts: checkExam(X, [
      P.manual({
        label: "(a)", marks: 15,
        stem: "Describe the sacred places and rituals through which believers in Indigenous Religion worship.",
        points: [
          ["Sacred places: mountains, caves, pools, groves and shrines such as Njelele, believed to be linked with God, the ancestors and the spirits", 2],
          ["Protection of sacred places by taboos (zviera), such as not cutting trees or polluting pools", 2],
          ["Sacred objects: beer pots, snuff, the mbira, drums and rattles, used in offerings and music", 2],
          ["Attire: cloths, beads and skins worn by mediums and elders to mark a sacred role", 2],
          ["Offerings and libations: traditional beer (doro, umqombothi) and snuff offered with prayers to the ancestors", 2],
          ["The mukwerera/ukucela izulu rain ceremony: elders, medium and community pray, sing and make offerings", 2],
          ["The bira/ukuthetha, thanksgiving and first-fruits ceremonies, and the day of rest chisi", 2],
          ["Credits a note on the role of music, dance and clapping in the rituals", 1],
        ],
        modelAnswer: "Believers worship at sacred places such as mountains, caves, pools, groves and shrines like Njelele, which are linked with God, the ancestors and the spirits. Taboos called zviera protect these places: for example, people do not cut trees in a grove or pollute a sacred pool.\n\nSacred objects include clay beer pots, snuff, the mbira, drums and rattles, which are used in offerings and music. Mediums and elders wear cloths, beads and skins to mark a sacred role. Believers pour traditional beer, doro or umqombothi, and offer snuff with prayers to the ancestors.\n\nIn the rain ceremony, mukwerera or ukucela izulu, the elders, the medium and the community pray, sing and make offerings, asking God and the ancestors for rain. Families hold a bira, a night ceremony with mbira music, to thank and consult the ancestors, and communities hold thanksgiving and first-fruits ceremonies. In many chiefdoms a day of rest, chisi, is observed. Music, dance and clapping are part of most of these rituals.",
        explanation: "About seven developed points, two marks each, and one mark for music, dance and clapping.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE",
        stem: "Explain how taboos on sacred places can help to protect the environment.",
        points: [
          ["Taboos forbid cutting trees and hunting in groves and shrines, which protects forests and wildlife", 2],
          ["Taboos forbid polluting or fishing in sacred pools and springs, which protects water sources", 2],
          ["The rules are respected because they are linked with God and the ancestors, so they are followed without enforcement", 2],
          ["The community shares responsibility, and elders and chiefs enforce the rules and teach the young", 2],
          ["Limits and conclusion: pressure for land, loss of custom in towns; the best protection is custom with law and education", 2],
        ],
        levels: levels(10),
        wordLimit: { min: 100, max: 300 },
        modelAnswer: "Taboos on sacred places protect the environment in several ways. Rules against cutting trees and hunting in groves and shrines protect forests and wildlife, and rules against polluting or fishing in sacred pools and springs protect water sources.\n\nThese rules work well because they are linked with God and the ancestors, so people follow them out of respect and not only fear of punishment. The whole community shares responsibility, chiefs and elders enforce the rules, and the young learn them through stories and visits.\n\nHowever, taboos can be weakened by pressure for land and by the loss of custom in towns. The best protection therefore comes from custom together with law and education, but taboos have helped to conserve sacred places for generations and remain valuable.",
        explanation: "Credit developed reasons with examples, limits and a supported conclusion.",
      }),
    ]),
    hints: ["In (a), cover places, objects, attire and rituals; in (b), link taboos to forests, water and community responsibility."],
    explanation: "Paper 1 item on sacred places and rituals (a) and the protection of the environment (b).",
  });
});
