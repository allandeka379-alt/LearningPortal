// W1b: Marriage in Indigenous Religion.
import { concept, P, source } from "../lib.mjs";

concept("frs.indigenous.rites-marriage", { file: "indigenous/rites-marriage", keyPrefix: "indigenous.rites-marriage" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the Shona word for bride wealth?",
    options: [
      ["Roora", "Correct: the Ndebele word is lobola."],
      ["Bira", "A bira is a ceremony for the ancestors, not a marriage custom."],
      ["Mutupo", "A mutupo is a totem, which gives identity and is not a payment."],
      ["Chisi", "Chisi is a rest day in the Shona week, linked to respect for the land."],
    ],
    answer: "A",
    explanation: "Bride wealth is **roora** in Shona and **lobola** in Ndebele.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Who carries messages between the two families in the marriage process?",
    options: [
      ["The go-between (munyai/umkhongi)", "Correct: a trusted relative or friend who speaks for the groom's family."],
      ["The svikiro (a spirit medium) who speaks for the ancestors at every wedding", "A spirit medium is not the messenger between families in the marriage process."],
      ["The chief who must give permission before any couple may start courtship", "The chief is not the usual messenger between two families."],
      ["The n'anga (traditional healer) who checks that the bride is in good health", "A healer treats illness; this is not the go-between's role."],
    ],
    answer: "A",
    explanation: "The munyai (Shona) or umkhongi (Ndebele) takes messages and begins the negotiations on behalf of the groom's family.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Indigenous Religion, which statement best describes the main purpose of marriage?",
    options: [
      ["It joins two families and continues the lineage", "Correct: marriage is a union of families, and children link the living and the ancestors."],
      ["It gives the husband legal ownership of the bride's family property after the wedding", "Marriage does not transfer the bride's family property to the husband."],
      ["It is a private agreement between two individuals that does not involve the families", "Families are central to the process and to the marriage's meaning."],
      ["It replaces the need for a family to pay respect to its ancestors on any later occasion", "The ancestors are informed and remain important after the marriage."],
    ],
    answer: "A",
    explanation: "In IR, marriage joins families, produces children who continue the lineage and involves the ancestors of both sides.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do those who practise roora/lobola describe its meaning?",
    options: [
      ["A token of thanks and a seal between families", "Correct: it thanks the bride's family and builds the alliance."],
      ["The purchase of a bride, who then becomes the property of her husband's family", "The practice is not described by adherents as buying a person."],
      ["A fine paid by the groom's family because the bride has left her parents' home", "It is a gift of appreciation, not a punishment or a fine."],
      ["A tax collected by the chief from every family in which a wedding takes place", "Bride wealth is negotiated between the two families, not collected as a tax."],
    ],
    answer: "A",
    explanation: "Adherents describe bride wealth as appreciation for raising the bride, a sign of respect and a seal between the families. Debates today concern how high the demands should be.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the role of the bride's paternal aunt (vatete/ubabakazi) in the marriage process?",
    options: [
      ["She advises the bride about married life", "Correct: aunts pass on family values and responsibilities."],
      ["She presents the cattle that the groom's family has brought to the bride's father", "The cattle are presented by the groom's family representatives, not by the aunt."],
      ["She chooses the groom without consulting the bride, the parents or the uncles", "The bride and both families take part in the process; the aunt is an adviser."],
      ["She leads the ceremony in which the ancestors of the groom are told the bride's name", "The groom's family leads the ceremony that welcomes the bride at his home."],
    ],
    answer: "A",
    explanation: "Aunts and uncles guide the couple, counsel the bride and help to settle matters between the families.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo's grandmother asks a cousin to carry a message to Tendai's family before the families meet. Which role is the cousin performing?",
    options: [
      ["The go-between (munyai/umkhongi)", "Correct: carrying the first messages is the go-between's work."],
      ["The svikiro who speaks for the ancestors during the formal introduction of the two families", "A spirit medium does not carry messages between living families."],
      ["The elder who sets the amount of the bride wealth and presents it to the bride's family", "That is the work of the negotiators, not the person who carries a first message."],
      ["The bride's sister who takes the place of the bride after the wedding is completed", "That describes the sororate, a different custom, not a messenger."],
    ],
    answer: "A",
    explanation: "A go-between starts contact between families and keeps the talks respectful.",
    hints: ["Who takes messages before the families meet?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which marriage custom is described as harmful and illegal today?",
    options: [
      ["Pledging a girl to settle a debt (kuzvarira)", "Correct: it violates a child's rights and the minimum age of marriage."],
      ["Choosing a go-between to carry messages between the families of a couple", "A go-between is a normal part of the process and is not illegal."],
      ["Presenting roora or lobola to the family of an adult bride who has agreed to marry", "Bride wealth between consenting adults is lawful, though the amounts are debated."],
      ["Holding a ceremony to welcome the bride at the groom's home and inform the ancestors", "A welcoming ceremony is not harmful or illegal."],
    ],
    answer: "A",
    explanation: "Kuzvarira treats a girl as payment or protection. It violates her rights and the law on consent and minimum age (18).",
    hints: ["Which custom treats a girl as a way of settling a debt?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about widow inheritance (levirate) is best supported by what is taught about family rights today?",
    options: [
      ["It is harmful when done without the widow's consent", "Correct: free consent is required for any marriage."],
      ["It is required by law in every family so that a widow's children are cared for", "No law requires a widow to marry a relative of her late husband."],
      ["It has never been connected with the idea of keeping the widow and children in the family", "Traditionally it was explained as keeping them within the family."],
      ["It is accepted in the Constitution as a way of dividing the property of the late husband", "The Constitution protects the rights of women and does not require such a practice."],
    ],
    answer: "A",
    explanation: "Traditionally levirate marriage was intended to keep a widow and her children within the family. Today it is harmful if the widow does not agree, because marriage requires free and full consent.",
    hints: ["Which principle about consent applies to all marriages?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Indigenous Religion the ancestors of both families are informed about a marriage.",
    answer: true,
    explanation: "True. Both sides tell their ancestors, asking for protection for the couple and their children.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Zimbabwe the minimum age for marriage is 18, and child marriage is therefore unlawful.",
    answer: true,
    explanation: "True. The Constitution (section 78) and the Marriages Act 2022 set the minimum age at 18.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of marriage with its description.",
    pairs: [["Monogamy", "marriage to one spouse at a time"], ["Polygyny", "a man married to more than one wife"], ["Sororate", "the sister of a wife who has died or cannot have children marries the husband"], ["Levirate", "a widow marries a relative of her late husband"]],
    explanation: "Monogamy is one spouse; polygyny is more than one wife; sororate involves the wife's sister; levirate involves the husband's relative. Levirate is harmful if the widow does not consent.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Bride wealth is called {{blank:a}} in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["roora"], choices: ["roora", "bira", "mutupo", "chisi"] },
      { id: "b", accepted: ["lobola"], choices: ["lobola", "umbuyiso", "isibongo", "izibongo"] },
    ],
    explanation: "Roora (Shona) and lobola (Ndebele).",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The Constitution of Zimbabwe, section {{blank:a}}, sets the minimum age of marriage at {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["78"], choices: ["56", "78", "81", "251"] },
      { id: "b", accepted: ["18"], choices: ["16", "18", "21", "14"] },
    ],
    explanation: "Section 78 deals with marriage rights and sets the age at 18. Section 81 protects the rights of children.",
    hints: ["Think of the section on marriage rights."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Ndebele word for the go-between who carries messages between families?",
    accepted: ["umkhongi", "umkhongi."],
    wrong: ["munyai"],
    explanation: "The go-between is called **umkhongi** in Ndebele and **munyai** in Shona.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** purposes of marriage in Indigenous Religion.",
    points: ["Joins two families", "Gives children and continues the lineage", "Involves the ancestors, who are asked to protect the couple"],
    modelAnswer: "Marriage joins two families, produces children who continue the lineage, and involves the ancestors, who protect the couple.",
    explanation: "One mark for each purpose.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the role of bride wealth (roora/lobola) in the marriage process.",
    points: [
      ["It is given by the groom's family to the bride's family", 1],
      ["It is a token of thanks for raising the bride", 1],
      ["It is a sign of respect and a seal between the two families", 1],
      ["It makes both families responsible for supporting the marriage", 1],
    ],
    modelAnswer: "Bride wealth, traditionally cattle and today often money, is given by the groom's family to the bride's family. It is a token of thanks for raising the bride and a sign of respect, and it seals the alliance so that both families feel responsible for supporting the marriage.",
    hints: ["Say who gives it, what it expresses and what it does for the families."],
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why child marriage and the pledging of girls (kuzvarira) are rejected today.",
    points: [
      ["The law sets the minimum age of marriage at 18 and requires free and full consent", 1],
      ["Developed: a child cannot give free and informed consent, so such marriages violate her rights", 2],
      ["They harm the girl: they end her education and put her at risk of early pregnancy and health problems", 1],
      ["Developed: without education she has fewer chances to earn an income or make her own choices, which can keep a family in poverty", 2],
    ],
    modelAnswer: "The law sets the minimum age at 18 and requires free and full consent. A child cannot give informed consent, so a girl who is pledged or married young has her rights violated. These practices also harm the girl: they usually end her education and expose her to early pregnancy and health risks. Without education she has fewer chances of earning an income or making her own choices, so the family may remain in poverty.",
    hints: ["Give one reason about law and rights, one about harm to the girl, and develop each."],
    explanation: "Two reasons, each stated (1) and developed (2 across the reason).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students at a school in Marondera, 2026",
      "Tendai: My uncle went to Rudo's family last weekend. A family friend had gone first to say they were coming.\nThandeka: Is that the go-between? In my family the aunt is the one who talks to the bride about marriage before the wedding.\nTendai: Yes. Then the two families agreed on roora. My grandmother says it is a way of thanking Rudo's family for raising her."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which person in Source A is the go-between?",
        options: [
          ["The family friend who went first", "Correct: the family friend took the first message."],
          ["Tendai's grandmother who explains the meaning of roora to the students", "She explains the meaning of roora; she is not the messenger."],
          ["Thandeka's aunt who talks to the bride about marriage before the wedding", "Her role is to advise the bride."],
          ["Rudo's family who agreed with the other family to set the roora", "They are one of the two families in the negotiations."],
        ],
        answer: "A", explanation: "The family friend who went first with the message acts as the go-between.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A and your own knowledge, state **three** steps in the marriage process.",
        points: ["A go-between visits first to say that the groom's family is coming", "The groom's relatives visit the bride's family", "The two families agree on roora (bride wealth)"],
        modelAnswer: "A go-between visits first; the groom's uncles visit the bride's family; the families agree on roora.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why, according to the grandmother, roora is given.",
        points: [["It thanks the bride's family for raising her (appreciation)", 1], ["It shows respect between the families", 1], ["It seals the agreement and the relationship between the two families", 1]],
        modelAnswer: "It is a way of thanking Rudo's family for raising her, it shows respect, and it seals the relationship between the two families.",
      }),
    ],
    hints: ["In (c) the grandmother's own words in the source give you the main point; add the meaning for the families."],
    explanation: "The source shows go-between, visit, agreement on roora and the meaning of roora.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Sipho says: \"Polygamy is a custom that should end, because it causes conflict in families.\" Themba replies: \"Polygamy is accepted in customary law and many people have lived in such families for generations.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** advantages and **two** disadvantages of polygamy, as people have described them.",
        points: [["Advantage: more children and labour on the land, or more people to care for the elderly", 1], ["Advantage: a woman without a husband is supported within a family", 1], ["Disadvantage: jealousy and conflict between wives and children", 1], ["Disadvantage: financial strain, disputes over inheritance, or health risks (for example the spread of infections)", 1]],
        modelAnswer: "Advantages: more children and labour on the land, and support for women within a family. Disadvantages: jealousy and conflict between wives and children, and financial strain and inheritance disputes.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain what the law says about consent and age in marriage.",
        points: [["Marriage requires the free and full consent of both people (Constitution section 78)", 2], ["The minimum age of marriage is 18 (Constitution section 78; Marriages Act 2022), so child and forced marriages are unlawful", 2]],
        modelAnswer: "The Constitution requires the free and full consent of both people to a marriage. It also sets the minimum age at 18, and the Marriages Act 2022 repeats this, so child marriage and forced marriage are unlawful.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Assess the view that polygamy should end.",
        points: [["For: conflict, cost, inheritance disputes, unequal treatment of women", 2], ["Against: customary law accepts it, it has supported families and kin, and many families choose it freely", 2], ["A supported judgement, for example that all marriages must be based on consent and equal respect", 2]],
        levels: [[4, 5, 6, "Considers both views with developed reasons and a supported judgement."], [3, 3, 4, "Both views, with limited development or an unsupported judgement."], [2, 2, 2, "One view developed or both only listed."], [1, 1, 1, "One or two undeveloped points."], [0, 0, 0, "Nothing creditworthy."]],
        modelAnswer: "Sipho has a point: families with several wives can suffer jealousy, financial strain and inheritance disputes, and women may not be treated equally. However, customary law accepts polygamy and many families have lived in this way and believe it supports kin and children. A balanced view is that marriages in any form must rest on free consent and equal respect for the people in them, and that the law should protect all spouses and children.",
      }),
    ],
    hints: ["Weigh the conflict and cost against the argument from custom, then give your own view."],
    explanation: "A balanced answer gives both views and a judgement based on consent and respect.",
  });

  b.card("DEFINITION", "What is **bride wealth**?", "Gifts given by the groom's family to the bride's family as part of the marriage process; **roora** (Shona), **lobola** (Ndebele).");
  b.card("FACT", "What is the role of the go-between in marriage?", "A trusted relative or friend (munyai/umkhongi) who carries messages between the families.");
  b.card("CONCEPT", "Why is marriage in IR described as a union of families?", "The families negotiate, share obligations and inform their ancestors; the couple belongs to two families.");
  b.card("FACT", "What does the paternal aunt (vatete/ubabakazi) do in the marriage process?", "She advises the bride about married life and passes on family values.");
  b.card("DEFINITION", "What is the **levirate** custom?", "A widow marries a relative of her late husband; it is harmful if she has not consented.");
  b.card("DEFINITION", "What is the **sororate**?", "A wife's sister marries the husband when the wife has died or cannot have children.");
  b.card("FACT", "What is **kuzvarira**?", "Pledging a girl in marriage to settle a debt or gain protection; harmful and illegal.");
  b.card("FACT", "What is the minimum age of marriage in Zimbabwe?", "18 (Constitution section 78; Marriages Act 2022).");
  b.card("CONCEPT", "What do those who practise roora/lobola say it means?", "A token of thanks for raising the bride, a sign of respect and a seal between the families.", "Debates today concern high demands.");
});
