// W1b exam-format items: Paper 1 (Religions, topics 1-5) and Paper 2 (Contemporary issues, topics 6-15) structured essay
// questions, 25 marks = (a) 15 + (b) 10. Plans from EXAM in lib.mjs; the paper structure is our convention (reviewer to check).
import { concept, P, levels, EXAM, checkExam } from "../lib.mjs";

const p1 = { skill: EXAM.ZIM_P1.skill, applies: EXAM.ZIM_P1.applies, secs: EXAM.ZIM_P1.secs, examStyle: true, paper: "Paper 1" };
const p2 = { skill: EXAM.ZIM_P2.skill, applies: EXAM.ZIM_P2.applies, secs: EXAM.ZIM_P2.secs, examStyle: true, paper: "Paper 2" };

concept("frs.indigenous.rites-marriage", { file: "exam/w1b-zimsec", keyPrefix: "exam.w1b-zimsec" }, (b) => {
  // 1. Paper 1: Marriage in IR.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.indigenous.rites-marriage"],
    stem: "This question is about marriage in Indigenous Religion.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the process by which a marriage is arranged in Indigenous Religion.",
        points: [
          ["Courtship: the young people show interest, and the families make quiet enquiries about one another", 2],
          ["A go-between (munyai/umkhongi) is sent by the groom's family to tell the bride's family that they wish to visit", 2],
          ["The groom and his relatives visit the bride's family and formally ask for her hand", 2],
          ["The bride's relatives agree to begin talks; the families negotiate the bride wealth (roora/lobola)", 2],
          ["Bride wealth is presented, with a part for the bride's mother in many families, as thanks to the bride's family and a seal between the families", 2],
          ["The bride's paternal aunt (vatete/ubabakazi) and uncles advise the couple about marriage and family duties", 2],
          ["The bride is welcomed at the groom's home, introduced to his relatives and his ancestors are informed", 2],
          ["Consent of the couple and the ancestors' blessing are sought; the law requires free consent and a minimum age of 18", 1],
        ],
        modelAnswer: "The process begins with courtship, in which the young man and woman show interest in one another and their families make quiet enquiries about each other. The groom's family then sends a go-between (munyai in Shona, umkhongi in Ndebele) to the bride's family to say that they wish to visit. The groom and his relatives then visit and formally ask for the bride's hand, and if the bride's relatives agree, the two families begin negotiations about bride wealth, roora or lobola.\n\nBride wealth, traditionally cattle and today often money, is presented to the bride's family. It is described as thanks for raising the bride and as a seal between the families, and in many families a part is set aside for the bride's mother. The bride's paternal aunt (vatete or ubabakazi) and her uncles advise the couple about marriage and family duties. Finally the bride is welcomed at the groom's home, where she is introduced to his relatives, and the ancestors are told of the marriage and asked to protect the couple and their children. The law requires the free consent of both people and sets 18 as the minimum age.",
        explanation: "Two marks for each developed step; the final mark for consent and the law. Customs vary by family and people, so credit any reasonable account in order.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the significance of bride wealth (roora/lobola) in Indigenous Religion.",
        points: [
          ["It thanks the bride's family for raising her (appreciation)", 2],
          ["It is a sign of respect between the two families", 2],
          ["It seals the agreement and builds a lasting relationship between the families, who then share responsibility for supporting the marriage", 2],
          ["It involves the ancestors, who are informed and give blessing", 2],
          ["It is debated today: critics say high demands make marriage unaffordable or put pressure on women, while supporters say it protects the marriage by involving the families", 2],
        ],
        levels: levels(10),
        modelAnswer: "Bride wealth is significant, first, because it is a way of thanking the bride's family for raising her. It also shows respect between the families, because the groom's side comes to the bride's family with gifts and humility. It seals the agreement and builds a lasting relationship, since the two families then share responsibility for supporting the marriage and for the children. The ancestors of both families are informed, and bride wealth is part of asking for their blessing.\n\nToday the practice is debated. Supporters say it holds the families together; critics say high demands can make marriage unaffordable or put pressure on women. In my view its meaning as thanks and respect is its main value, so long as it does not harm the couple or treat the bride as property.",
        explanation: "Level marking: developed explanation of several points of significance, with a view about its relevance today, reaches the top levels.",
      }),
    ]),
    hints: ["In (a), put the steps in the order in which they happen. In (b), link each point to a meaning."],
    explanation: "A Paper 1 style question: (a) describe the process in order, (b) explain the significance.",
  });

  // 2. Paper 1: Death and kurova guva / umbuyiso.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.indigenous.rites-death"],
    stem: "This question is about death and the bringing-home ceremony in Indigenous Religion.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the funeral and burial rites in Indigenous Religion.",
        points: [
          ["Relatives and the village headman are informed and the family gathers", 2],
          ["Close relatives, usually of the same sex, wash and dress the body as a last act of respect", 2],
          ["A wake is held, with singing, prayers and speeches, to support the family and honour the dead", 2],
          ["Men of the family and neighbours dig the grave", 2],
          ["The body is buried, with the family and elders speaking at the graveside", 2],
          ["Mourners wash their hands in water (sometimes with herbs) after the burial, a purification that marks the return to ordinary life", 2],
          ["Neighbours bring food and firewood; women prepare meals for those who come", 2],
          ["The close family, especially a widow or widower, observes mourning customs for a period", 1],
        ],
        modelAnswer: "When a person dies, relatives and the village headman are informed and the family gathers. Close relatives, usually of the same sex as the dead person, wash and dress the body as a last act of respect. A wake is held at which mourners sing, pray and speak, supporting the family and honouring the dead.\n\nMen of the family and neighbours dig the grave, and the body is buried with the family and elders speaking at the graveside. After the burial mourners wash their hands in water, sometimes with herbs, as a purification that marks their return to ordinary life. During the funeral, neighbours bring food and firewood and women prepare meals. The close family, especially a widow or widower, observes a period of mourning.",
        explanation: "Two marks for each developed stage; one for the mourning period.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Explain the importance of the bringing-home ceremony (kurova guva/umbuyiso).",
        points: [
          ["It completes the spirit's passage from the funeral to the world of the ancestors", 2],
          ["The spirit becomes an ancestor who guides and protects the family", 2],
          ["Without it, families fear the spirit may be restless and could bring misfortune to the family", 2],
          ["It brings relatives together and renews family bonds, with beer brewed and an animal slaughtered", 2],
          ["Today many families adapt it (for example weekend ceremonies, a prayer by a minister), showing its continued importance", 2],
        ],
        levels: levels(10),
        modelAnswer: "The kurova guva or umbuyiso is important because it completes the passage of the dead person's spirit from the funeral to the world of the ancestors. Once the spirit is brought home it becomes an ancestor who guides and protects the family. Families who hold this belief fear that without the ceremony the spirit may be restless and bring misfortune.\n\nIt also brings relatives together, since beer is brewed, an animal is slaughtered and the family gathers at the grave, which renews family bonds. Today many families adapt the ceremony, for example by holding it on a weekend or inviting a minister to pray, which shows that it remains important to them. The ceremony therefore matters both for the spirit and for the living family.",
        explanation: "Level marking: several developed reasons that link the ceremony to belief and to the family reach the top levels.",
      }),
    ]),
    hints: ["In (a), follow the order of events from announcement to mourning. In (b), link the ceremony to belief about the spirit."],
    explanation: "A Paper 1 style question: (a) describe the rites, (b) explain the importance of the bringing-home ceremony.",
  });

  // 3. Paper 1: Taboos and morality.
  b.struct({
    ...p1, d: 4,
    concepts: ["frs.indigenous.morality-taboos"],
    stem: "This question is about moral teaching and taboos in Indigenous Religion.",
    parts: checkExam(EXAM.ZIM_P1, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the moral teachings and the taboos (zviera/imilayo) of Indigenous Religion.",
        points: [
          ["Moral teachings come from God, the ancestors, the elders and the community, and are passed on orally", 2],
          ["Respect for elders is taught: greeting politely, listening and caring for older people", 2],
          ["Hospitality and sharing are taught: welcoming visitors and sharing food with neighbours in need", 2],
          ["Honesty, faithfulness and chastity are taught, with respect for marriage", 2],
          ["Taboos include not marrying a person of the same totem, which prevents marriage between relatives", 2],
          ["Taboos include not working on the rest day (chisi) and not cutting trees or fishing at sacred places, which show respect and protect the environment", 2],
          ["Proverbs and folk tales teach morals, for example cooperation (\"Chara chimwe hachitswanyi inda\")", 2],
          ["Rewards and sanctions: social (shame, loss of trust), ancestral and, within the law, fines by the chief's court", 1],
        ],
        modelAnswer: "Moral teaching in Indigenous Religion comes from God, the ancestors, the elders and the community, and is passed on orally in the family, at the dare or inkundla and through proverbs and stories. It teaches respect for elders, hospitality and sharing, honesty, faithfulness and chastity.\n\nTaboos are rules that protect society and nature. A person must not marry someone of the same totem, because they are regarded as relatives. People must not work in the fields on chisi, the rest day, and must not cut trees or fish at sacred places, which shows respect for the land and spirits and protects the environment. Proverbs and folk tales also teach morals; for example, \"Chara chimwe hachitswanyi inda\" teaches cooperation. Those who break the rules face social sanctions such as shame, ancestral displeasure and, within the law, fines from the chief's court.",
        explanation: "Two marks for each developed point; the last mark for rewards and sanctions.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "How relevant are the moral teachings and taboos of Indigenous Religion in Zimbabwe today?",
        points: [
          ["Relevant: values such as respect, honesty and hospitality are widely shared in schools, churches and mosques", 2],
          ["Relevant: taboos protecting water, forests and wildlife support modern conservation", 2],
          ["Relevant: the teaching of collective responsibility supports care for the vulnerable", 2],
          ["Less relevant: some taboos restrict the choices or rights of women and girls, or rest on fear", 2],
          ["A supported judgement that relevance depends on the particular teaching, with the Constitution protecting rights", 2],
        ],
        levels: levels(10),
        modelAnswer: "Many of the moral teachings of Indigenous Religion remain very relevant. Respect, honesty and hospitality are valued in schools, churches and mosques as well, and taboos that protect pools, trees and wildlife support the conservation efforts of today. The idea of collective responsibility also supports care for orphans and the sick.\n\nHowever, some taboos may restrict the choices and rights of women and girls, or rest on fear rather than understanding, and these need to be questioned in the light of the Constitution. Overall, the relevance depends on the particular teaching: those that protect people, community and the environment remain important, while those that harm or restrict rights should be reviewed.",
        explanation: "Level marking: a balanced, developed judgement with examples reaches the top levels.",
      }),
    ]),
    hints: ["In (b), give reasons for and against and decide which teachings stay relevant."],
    explanation: "A Paper 1 style question: (a) describe teachings and taboos, (b) assess relevance today.",
  });

  // 4. Paper 2: Family types and roles.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.family.concept-structure"],
    stem: "This question is about family types and roles.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the different types of family found in Zimbabwe and the roles of their members.",
        points: [
          ["Nuclear family: two parents and their children, in which parents provide care, guidance and discipline", 2],
          ["Extended family: includes grandparents, aunts, uncles and cousins who share responsibilities", 2],
          ["Single-parent family: one parent raises the children after death, divorce or separation", 2],
          ["Child-headed family: children, led by an older sibling, live without an adult", 2],
          ["Blended family: two families joined by remarriage, with children from earlier relationships", 2],
          ["Roles: grandparents share wisdom and stories; aunts and uncles advise (vatete/ubabakazi, sekuru/umalume)", 2],
          ["Roles: children respect parents and elders, help in the home and study; older siblings care for younger ones", 2],
          ["Polygamous family: one husband with more than one wife and their children (found in customary law)", 1],
        ],
        modelAnswer: "A nuclear family is made up of two parents and their children, in which the parents provide care, guidance and discipline. An extended family includes grandparents, aunts, uncles and cousins who share responsibilities. In a single-parent family one parent raises the children after a death, divorce or separation. In a child-headed family children, led by an older sibling, live without an adult. A blended family is formed when two families are joined by remarriage and children from earlier relationships live together. Polygamous families, in which a man has more than one wife, are found in customary law.\n\nMembers have roles. Grandparents share wisdom and tell stories; aunts and uncles such as the vatete/ubabakazi and the sekuru/umalume advise and guide young people. Children respect their parents and elders, help in the home and study, and older children care for younger ones.",
        explanation: "Two marks for each developed type or role; one mark for the polygamous family.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Assess how far the extended family is better than the nuclear family for bringing up children.",
        points: [
          ["Extended: shared care and more role models, with grandparents, aunts and uncles teaching values", 2],
          ["Extended: practical and financial support in hard times and at funerals", 2],
          ["Nuclear: more attention and privacy for children and fewer disputes over resources", 2],
          ["Both religions and traditions value family: Judaism, Christianity, Islam and IR all teach duties to parents and relatives", 2],
          ["A supported judgement that either type can succeed depending on love, support and care", 2],
        ],
        levels: levels(10),
        modelAnswer: "The extended family offers children shared care and many role models: grandparents, aunts and uncles teach values, and relatives give practical and financial help in hard times and at funerals. This is valued in Indigenous Religion, and Judaism, Christianity and Islam also teach duties to parents and relatives.\n\nHowever, a nuclear family may give children more attention and privacy, and avoid disputes over money and space that can arise in larger households. In the end, neither is automatically better. Children do well in either kind of family when they receive love, discipline, support and education, so the quality of care matters more than the type.",
        explanation: "Level marking: both types weighed with developed reasons and a supported judgement reach the top levels.",
      }),
    ]),
    hints: ["In (b), weigh the strengths and difficulties of each type before judging."],
    explanation: "A Paper 2 style question: (a) describe family types and roles, (b) assess extended and nuclear families.",
  });

  // 5. Paper 2: Names and totems in identity.
  b.struct({
    ...p2, d: 4,
    concepts: ["frs.family.names-totems"],
    stem: "This question is about names and totems.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the importance of names and totems in Indigenous Religion and in one other religion of your choice.",
        points: [
          ["IR: names have meanings (for example Tendai, give thanks; Themba, hope) that express thanks, hope or circumstances", 2],
          ["IR: naming is done by elders at a family gathering, where the ancestors are told the name and asked for protection", 2],
          ["IR: a totem (mutupo/isibongo) gives identity and belonging to a clan", 2],
          ["IR: totems prevent marriage between relatives and protect animals, since members do not harm their totem", 2],
          ["IR: praise poetry (detembo/izibongo) recites the totem, history and qualities of the clan", 2],
          ["Other religion, for example Judaism: a boy is named at brit milah on the eighth day and a girl in the synagogue; children are often named after relatives; or Islam: a name with a good meaning is given in the first week, with the aqiqah", 3],
          ["Other religion: naming welcomes the child into the faith community and gives identity", 2],
        ],
        modelAnswer: "In Indigenous Religion names have meanings that express thanks, hope or the family's circumstances; for example Tendai means give thanks and Themba means hope. Naming is usually done by elders at a family gathering, where the ancestors are told the name and asked to protect the child. Totems (mutupo or isibongo) give a person identity and belonging to a clan. They prevent marriage between relatives, because people of one totem are regarded as kin, and they protect animals, since members do not harm or eat their totem. Praise poetry (detembo or izibongo) recites the clan's totem, history and qualities.\n\nIn Judaism a boy is named at his circumcision (brit milah) on the eighth day and a girl is named in the synagogue; children are often named after a relative. Naming welcomes the child into the Jewish community and gives identity within it.",
        explanation: "Two marks for each developed point from IR; three marks for a developed account of a second religion's naming custom, and two for its meaning.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "To what extent have names and totems kept their importance in Zimbabwe today?",
        points: [
          ["Kept: many families still give names with meanings and teach totems", 2],
          ["Kept: totems and praise poetry are sources of pride, and some families are reviving them", 2],
          ["Changed: Christian and Muslim names, English names and urban life have changed naming and weakened knowledge of totems", 2],
          ["Changed: young people in towns may not follow totem rules about marriage", 2],
          ["A supported judgement that importance has changed in form, remaining strong for many", 2],
        ],
        levels: levels(10),
        modelAnswer: "Names and totems still matter to many families. Children are given names with meanings, and many families teach their totems and praise poetry as a source of pride; some are reviving them deliberately.\n\nHowever, Christian, Muslim and English names are now common, and young people who grow up in towns often know little about their totems or the rules about marriage. In my view names and totems have kept their importance for many people, though they are less central for others, so their role has changed in form rather than disappeared.",
        explanation: "Level marking: evidence for continuity and change with a supported judgement reaches the top levels.",
      }),
    ]),
    hints: ["In (a), give IR first and then one other religion with its own custom. In (b), weigh continuity against change."],
    explanation: "A Paper 2 style question: (a) describe names and totems across two religions, (b) assess their importance today.",
  });

  // 6. Paper 2: Changing families and national values.
  b.struct({
    ...p2, d: 5,
    concepts: ["frs.family.changing-family"],
    stem: "This question is about changing families and national values.",
    parts: checkExam(EXAM.ZIM_P2, [
      P.manual({
        label: "(a)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the changes that are affecting family life in Zimbabwe today.",
        points: [
          ["Urbanisation and migration: families live in smaller homes, relatives live far apart and the extended family is stretched", 2],
          ["The diaspora: relatives abroad send money (remittances) and keep contact by phone", 2],
          ["Education: young people gain skills and independence and may delay marriage", 2],
          ["Technology and social media: faster communication but also exposure to different values and safety concerns", 2],
          ["Economic pressure: long working hours, unemployment and the cost of living reduce time and money for families", 2],
          ["HIV and AIDS and other illness: more single-parent and child-headed families, with grandparents raising children", 2],
          ["Changing relationships: more blended families and cohabiting couples", 2],
          ["Religious and community groups respond with counselling, support and care for the vulnerable", 1],
        ],
        modelAnswer: "Urbanisation and migration mean that many families live in small homes in towns and relatives live far apart, so the extended family is stretched. The diaspora also matters: relatives abroad send money home and keep in touch by phone. Education gives young people skills and independence, and some delay marriage. Technology and social media allow faster communication, but also expose young people to different values and raise safety concerns.\n\nEconomic pressure, with long working hours, unemployment and the cost of living, leaves less time and money for family life. Illnesses such as HIV and AIDS have caused the deaths of many adults, so more families are single-parent or child-headed, with grandparents raising children. There are also more blended families and cohabiting couples. Religious and community groups respond with counselling, support and care for the vulnerable.",
        explanation: "Two marks for each developed change; one for the response of religious and community groups.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
        stem: "Discuss how far the family can still pass on national values such as unhu/ubuntu in a changing society.",
        points: [
          ["Family still teaches respect, honesty and hard work, which are part of unhu/ubuntu", 2],
          ["Families help to teach respect for human rights, such as equal treatment of girls and boys (Constitution sections 56, 80 and 81)", 2],
          ["Religions support the family, for example through teaching, counselling and care for orphans", 2],
          ["Difficulties: long working hours, distance, poverty and the influence of social media weaken the family's role", 2],
          ["A supported judgement that the family remains the first teacher of values but needs support from schools, religion and the community", 2],
        ],
        levels: levels(10),
        modelAnswer: "The family remains the first place where children learn respect, honesty and hard work, which are part of unhu/ubuntu. Families can also teach respect for human rights by treating girls and boys fairly, in line with the Constitution. Religions support the family through teaching, counselling and care for orphans.\n\nHowever, long working hours, distance, poverty and the influence of social media weaken the family's role. A fair judgement is that the family is still the first teacher of national values, but that it now needs the help of schools, religious groups and the community.",
        explanation: "Level marking: developed points for and against with a supported judgement reach the top levels.",
      }),
    ]),
    hints: ["In (b), weigh what the family can still do against the pressures on it."],
    explanation: "A Paper 2 style question: (a) describe changes, (b) discuss the family and national values.",
  });
});
