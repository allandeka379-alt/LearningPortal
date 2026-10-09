// W1a: totems, totem praises and genealogy (her.identity.totems).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.identity.totems", { file: "identity/totems", keyPrefix: "identity.totems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **totem**?",
    options: [
      ["An animal or object adopted as the symbol of a clan", "Correct: e.g. Shumba (lion) or Nzou/Ndlovu (elephant)."],
      ["A carved pole placed at the entrance of a village", "A carved pole is an object; a totem is a clan symbol shared by members."],
      ["A ceremony held to bring back the spirit of the dead", "That is kurova guva / umbuyiso."],
      ["A proverb that teaches children to respect their elders", "A proverb is a wise saying, not a clan symbol."],
    ],
    answer: "A",
    explanation: "A totem (mutupo/isibongo) is the symbol, usually an animal or body part, shared by all members of a clan.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the totem **Shumba** represent?",
    options: [
      ["Lion", "Correct: Shumba is the lion."],
      ["Elephant", "The elephant is Nzou (Shona) / Ndlovu (Ndebele)."],
      ["Zebra", "Dube is the zebra."],
      ["Buffalo", "Nyathi is the buffalo."],
    ],
    answer: "A",
    explanation: "Shumba = lion; Nzou/Ndlovu = elephant; Dube = zebra; Nyathi = buffalo; Soko = monkey; Moyo = heart.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Shona and Ndebele custom, whose totem does a child usually take?",
    options: [
      ["The father's", "Correct: totems are usually passed from father to children."],
      ["The mother's", "A mother keeps her own totem, but children usually take the father's."],
      ["The grandmother's", "Totems pass through the father's line."],
      ["The one the child chooses at 16", "Totems are inherited, not chosen."],
    ],
    answer: "A",
    explanation: "Children usually take their father's totem; a married woman keeps her own.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which **purpose** of the totem system is served when clan members refuse to kill or eat their totem animal?",
    options: [
      ["Conservation of the animal", "Correct: the taboo protects the totem animal from over-hunting."],
      ["Preventing marriage between relatives", "That purpose concerns marriage within a clan, not eating the animal."],
      ["Settling disputes over land", "Totems are not a system for settling land disputes."],
      ["Recording a person's date of birth", "Dates of birth are recorded on birth certificates."],
    ],
    answer: "A",
    explanation: "The taboo on killing or eating one's totem animal helps to conserve it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a **chidawo**?",
    options: [
      ["A sub-totem that identifies a branch of a clan", "Correct: the chidawo distinguishes branches within one totem."],
      ["A praise poem recited to thank a host after a meal", "Praise poetry is detembo (Shona) / izibongo (Ndebele)."],
      ["A family tree drawn on paper for a school project", "A family tree shows genealogy; it is not a chidawo."],
      ["A ceremony for asking for rain", "Rain-making is mukwerera / ukucela izulu."],
    ],
    answer: "A",
    explanation: "A sub-totem (chidawo) identifies a particular branch within a clan that shares one totem.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After a meal, a visitor thanks his host by reciting the host's totem praises. What is he **mainly** doing?",
    options: [
      ["Showing respect and gratitude to the host's clan", "Correct: praises honour and thank a person through their clan."],
      ["Asking for permission to marry into the family", "Marriage is arranged through other customs."],
      ["Settling a quarrel between him and the host", "Nothing suggests a quarrel."],
      ["Testing whether the host knows his own genealogy", "Praises are given as thanks, not as a test."],
    ],
    answer: "A",
    hints: ["When are totem praises usually recited?"],
    explanation: "Totem praises are recited to thank, honour or comfort a person, showing respect for their clan.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do many families discourage marriage between people of the **same** totem?",
    options: [
      ["They are regarded as relatives descended from one ancestor", "Correct: the rule prevents marriage between close relatives (incest)."],
      ["People of the same totem always speak different languages", "Sharing a totem has nothing to do with language difference."],
      ["The law forbids people with the same surname from marrying", "There is no such law; the rule comes from custom."],
      ["Such marriages cannot be registered by the Registrar General", "The rule is a custom, not a registration rule."],
    ],
    answer: "A",
    hints: ["What does sharing a totem say about two people's ancestry?"],
    explanation: "People of the same totem are believed to share an ancestor; marriage between them is discouraged to prevent incest.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** shows that the totem system is still relevant in modern Zimbabwe?",
    options: [
      ["Totems are still asked about before marriage and used in thanks and greetings", "Correct: they are still used at important moments of daily and family life."],
      ["Every Zimbabwean still follows every totem food taboo without any exception", "Many people, especially in towns, no longer follow every taboo."],
      ["The Constitution lists every totem and its praises", "The Constitution does not list totems."],
      ["Totems have now replaced identity documents for all official purposes", "Official purposes need documents such as birth certificates and IDs."],
    ],
    answer: "A",
    hints: ["Look for a statement that is true and shows present-day use."],
    explanation: "Totems are still used before marriage, at ceremonies, in greetings and thanks, and in many surnames, even though some taboos are less strictly followed.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Shona and Ndebele custom, a woman takes her husband's totem when she marries.",
    answer: false,
    explanation: "False. A married woman keeps her own totem; her children usually take their father's.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Nzou (Shona) and Ndlovu (Ndebele) are totems that both refer to the elephant.",
    answer: true,
    explanation: "True. Many Shona and Ndebele totems correspond; Nzou and Ndlovu both mean elephant.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each totem with what it represents.",
    pairs: [
      ["Moyo", "Heart"],
      ["Dube", "Zebra"],
      ["Nyathi", "Buffalo"],
      ["Soko", "Monkey"],
    ],
    explanation: "Moyo = heart; Dube = zebra; Nyathi = buffalo; Soko = monkey.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A totem is called mutupo in Shona and {{blank:a}} in Ndebele. Totem praises are called detembo in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["isibongo"], choices: ["isibongo", "izaga", "amadlozi", "ilima"] },
      { id: "b", accepted: ["izibongo"], choices: ["izibongo", "izisho", "inganekwane", "izinduna"] },
    ],
    explanation: "Totem: mutupo / isibongo. Totem praises: detembo / izibongo.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What is the study of a family's line of descent from its ancestors called?",
    accepted: ["genealogy"],
    wrong: ["geography", "geology"],
    explanation: "**Genealogy** is the study and record of a family's descent, often shown as a family tree.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "List **three** totems found in Zimbabwe and state what each represents.",
    points: ["A totem with its meaning, e.g. Shumba: lion", "A second, e.g. Nzou / Ndlovu: elephant", "A third, e.g. Dube: zebra; Nyathi: buffalo; Moyo: heart; Soko: monkey; Gumbo: leg; Mhofu: eland"],
    modelAnswer: "Shumba (lion), Ndlovu (elephant) and Moyo (heart).",
    explanation: "One mark per totem correctly matched with its meaning.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** purposes of the totem system.",
    points: [
      "Identifies e.g. preventing marriage between close relatives",
      "Develops: people of one totem are kin, so the rule prevents incest and keeps family lines healthy",
      "Identifies e.g. identity / conservation / unity / respect",
      "Develops: e.g. not eating the totem animal protects it; people of one totem help each other",
    ],
    modelAnswer: "Totems prevent marriage between close relatives: people of the same totem are treated as kin, so they do not marry, which prevents incest and keeps family lines healthy. Totems also help conservation, because clan members do not kill or eat their totem animal, which protects it.",
    hints: ["Name the purpose, then explain how the totem system achieves it."],
    explanation: "Two marks per purpose: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which young people living in towns could learn more about their totems and genealogy.",
    points: [
      "Suggests e.g. asking grandparents and elders (visits, phone or video calls)",
      "Explains: elders know the totem, sub-totem, praises and ancestors' names",
      "Suggests e.g. drawing and keeping a written or digital family tree / school genealogy projects",
      "Explains: the knowledge is recorded and shared with relatives and future generations",
    ],
    modelAnswer: "They could ask their grandparents and other elders, during visits or video calls, to explain their totem, sub-totem and praises, because elders hold this knowledge. They could also draw a family tree for a school project and keep it in writing or digitally, so the knowledge is recorded and passed on.",
    hints: ["Who holds the knowledge, and how could it be kept?"],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the family tree of the fictional Sibanda family of Gwanda, written as a table.\n\n" +
      table(["Generation", "Members", "Totem"], [["1", "Grandfather Sibanda; Grandmother (Moyo)", "Sibanda"], ["2", "Father Sibanda; his sister Thandeka Sibanda; Mother (Ndlovu)", "Sibanda"], ["3", "Sipho and Nokuthula (children of Father and Mother)", "?"]]),
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the totem of Sipho and Nokuthula?",
        options: [
          ["Sibanda", "Correct: children usually take their father's totem."],
          ["Ndlovu", "Ndlovu is their mother's totem; she keeps it, but they take their father's."],
          ["Moyo", "Moyo is their grandmother's totem."],
          ["They have no totem", "Every child born into the clan takes the father's totem."],
        ],
        answer: "A",
        explanation: "The father is Sibanda, so the children are Sibanda.",
      }),
      P.fib({
        label: "(b)",
        stem: "Use the family tree.",
        template: "Thandeka Sibanda is Sipho's paternal aunt, called vatete in Shona and {{blank:a}} in Ndebele. Sipho's grandmother's totem is {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["ubabakazi"], choices: ["ubabakazi", "umalume", "ugogo", "umama"] },
          { id: "b", accepted: ["Moyo"], choices: ["Moyo", "Sibanda", "Ndlovu", "Nyathi"] },
        ],
        explanation: "The father's sister is ubabakazi (vatete). The grandmother kept her own totem, Moyo.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why knowing this family tree would be useful to Sipho when he wants to marry.",
        points: ["He knows his own totem (Sibanda) and his relatives' totems", "He can avoid marrying someone of his own clan / a close relative", "His family can check the partner's totem and ancestry with elders before marriage"],
        modelAnswer: "The family tree tells Sipho that his totem is Sibanda and shows his relatives' totems. He can therefore avoid marrying a close relative from his own clan, and his family can check his partner's totem and ancestry with the elders before the marriage.",
      }),
    ],
    hints: ["Remember whose totem children take and that wives keep their own."],
    explanation: "Reading a family tree (as a table) to apply the rules of totem inheritance.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on totems and totem praises.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **totem praises**.",
        points: ["Poetic praises recited for members of a clan", "naming the totem, ancestors or clan history, to thank, honour or comfort"],
        modelAnswer: "Poetic praises (detembo/izibongo) recited for clan members, naming the totem, ancestors and history, to thank, honour or comfort them.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **two** occasions on which totem praises are recited and the purpose on each occasion.",
        points: ["Occasion, e.g. after a meal or gift", "Purpose: to thank the host or giver", "Occasion, e.g. a wedding, ceremony, achievement or funeral", "Purpose: to honour, encourage or comfort the person"],
        modelAnswer: "After a meal or gift, a person recites the host's praises to thank them. At a wedding or when someone has done well, praises are recited to honour the person and show pride in the clan; at a funeral they may comfort the bereaved.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The totem system no longer serves its original purposes in Zimbabwe today.\" Discuss.",
        points: [
          ["For: many urban young people do not know their totems; food taboos are often ignored; conservation now relies on laws and parks", 2],
          ["Against: totems still checked before marriage; used in greetings, thanks and praises; many surnames are totems", 2],
          ["Against: still give identity, unity and hospitality among clan members; interest in genealogy is growing", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some purposes of the totem system have weakened. Many young people in towns know little about their totems or praises, and food taboos are not always kept. Conservation now depends mainly on wildlife laws, national parks and the Zimbabwe Parks and Wildlife Management Authority rather than on taboos.\n\nHowever, other purposes remain strong. Families still ask about totems before a marriage to avoid unions between relatives. People thank, greet and honour one another by totem, and praises are recited at weddings and funerals. Many surnames are totem names, and people of the same totem still treat each other as kin, giving help and hospitality. Interest in genealogy is also growing.\n\nOverall, the statement is only partly true. The conservation role has largely passed to the law, but the totem system still serves its purposes of identity, preventing marriage between relatives, unity and respect.",
      }),
    ],
    hints: ["In (c), take the purposes one at a time and ask whether each still works."],
    explanation: "Define (a), describe (b) and discuss (c) the totem system today.",
  });

  b.card("DEFINITION", "Totem (mutupo / isibongo)", "An animal, body part or object adopted as the symbol of a clan, usually passed from father to children.");
  b.card("DEFINITION", "Sub-totem (chidawo)", "A further name within a totem identifying a particular branch of the clan.");
  b.card("DEFINITION", "Totem praises (detembo / izibongo)", "Poetic praises naming the totem, ancestors and clan history, recited to thank, honour or comfort.");
  b.card("DEFINITION", "Genealogy", "The study and record of a family's line of descent, often shown as a family tree.");
  b.card("FACT", "Shumba, Nzou/Ndlovu, Dube, Nyathi: meanings?", "Lion; elephant; zebra; buffalo.");
  b.card("FACT", "Whose totem does a child take? Does a wife change hers?", "The father's. No: a married woman keeps her own totem.");
  b.card("CONCEPT", "Why do totems discourage marriage between people of the same totem?", "They are regarded as relatives descended from one ancestor, so the rule prevents incest and keeps family lines healthy.");
  b.card("CONCEPT", "How do totems help conservation?", "Clan members do not kill or eat their totem animal, which protects it.");
  b.card("CONCEPT", "Name six purposes of the totem system.", "Identity, preventing marriage between relatives, conservation, unity and hospitality, respect and social order, link with ancestors.");
});
