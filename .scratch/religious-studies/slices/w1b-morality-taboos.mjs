// W1b: Moral teachings, taboos and sanctions in Indigenous Religion.
import { concept, P, source } from "../lib.mjs";

concept("frs.indigenous.morality-taboos", { file: "indigenous/morality-taboos", keyPrefix: "indigenous.morality-taboos" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the Shona word for taboos?",
    options: [
      ["Zviera", "Correct: the Ndebele word is imilayo."],
      ["Mitupo", "Mitupo are totems, which give identity."],
      ["Midzimu", "Midzimu are the ancestral spirits, not rules."],
      ["Madzishe", "Madzishe are chiefs or traditional leaders, not taboos."],
    ],
    answer: "A",
    explanation: "A taboo is **chiera** (plural **zviera**) in Shona and **umlayo** (plural **imilayo**) in Ndebele.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a main source of moral teaching in Indigenous Religion?",
    options: [
      ["The elders and the ancestors", "Correct: morality is passed on orally by elders, who speak for the ancestors."],
      ["A single holy book which every follower must read in a central place of worship", "IR has no single written scripture; its teaching is oral."],
      ["The decisions of a council which meets only once in every ten years to make new rules", "There is no such council; morality is learnt in the family and community."],
      ["The instructions of the school inspector for every district in the province", "School inspectors are not a source of IR morality."],
    ],
    answer: "A",
    explanation: "IR morality comes from God, the ancestors, the elders and the community, and is taught orally in the family, through proverbs and folk tales, and at initiation where it is practised.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A rule forbids marrying a person of the same totem. What is the main purpose of this taboo?",
    options: [
      ["To prevent marriage between close relatives", "Correct: people of the same totem are regarded as relatives."],
      ["To make sure that every family can pay the same amount of roora for a bride", "Totem rules do not set the amount of roora."],
      ["To stop young people from attending school in a village far from their homes", "Totems are not linked to school attendance."],
      ["To allow a chief to refuse a wedding whenever the families have no cattle to give", "The rule concerns relatives, not the wealth of families."],
    ],
    answer: "A",
    explanation: "Sharing a totem is seen as being related, so marriage within the totem is treated like incest. The taboo protects social order.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which taboo is most clearly connected with conservation?",
    options: [
      ["Not cutting trees at a sacred pool", "Correct: it protects water, trees and wildlife."],
      ["Not insulting an elder in front of the family", "This protects respect, not the environment."],
      ["Not marrying a person of the same totem as oneself", "This protects social order."],
      ["Not eating food until the visitors have been greeted", "This shows hospitality, not conservation."],
    ],
    answer: "A",
    explanation: "Taboos on sacred groves, pools and hills protect water, forests and animals.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Mthulisi's grandfather tells him not to fish at the sacred pool on the rest day. A teacher later says that this rule helps to keep the fish stocks from being used up. What does this show?",
    options: [
      ["A taboo can have both a religious meaning and a practical benefit", "Correct: the belief and the conservation effect support each other."],
      ["A taboo is useful only when everybody in the village understands its science", "Taboos work through belief and tradition, even without scientific explanation."],
      ["A taboo that has a practical effect can no longer be part of religion at all", "A rule can be religious and practical at once."],
      ["A taboo is always made by a government department to control fishing in all rivers", "Taboos come from the community's beliefs, not government."],
    ],
    answer: "A",
    explanation: "Villagers keep the taboo out of respect for the spirits; the effect is that fish and trees are protected.",
    hints: ["Think of the two reasons: belief and practical effect."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which proverb teaching is correctly matched with its meaning?",
    options: [
      ["\"Chara chimwe hachitswanyi inda\": cooperation is needed", "Correct: one thumb alone cannot crush a louse, so people need each other."],
      ["\"Umuntu ngumuntu ngabantu\": a person must always live alone", "The proverb says a person is a person through other people."],
      ["\"Chara chimwe hachitswanyi inda\": greed brings punishment to those who share", "The proverb is about cooperation, not greed."],
      ["\"Umuntu ngumuntu ngabantu\": only the elders should be respected by others", "The proverb is about belonging to the community."],
    ],
    answer: "A",
    explanation: "Both proverbs teach cooperation and belonging, central values in IR morality and unhu/ubuntu.",
    hints: ["What do both proverbs say about how people need each other?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the fairest judgement about taboos in modern Zimbabwe?",
    options: [
      ["Some protect the environment and respect, while others may restrict rights and need review", "Correct: taboos differ, and each needs to be judged by its purpose and effects."],
      ["All taboos should be abandoned because they are based only on fear and have no purpose", "Many taboos have practical, social or environmental purposes."],
      ["All taboos must be kept exactly as they were, because every taboo is beneficial to society", "Some practices restrict people's rights and are criticised."],
      ["Taboos no longer exist in Zimbabwe because schools and churches have replaced them all", "Many taboos continue to be observed."],
    ],
    answer: "A",
    explanation: "A fair judgement distinguishes taboos with clear benefits (conservation, respect) from those that harm or restrict, and accepts that people hold different views.",
    hints: ["Avoid 'all' and 'none'; look for the balanced judgement."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Respect for elders is one of the values taught in Indigenous Religion.",
    answer: true,
    explanation: "True. Respect for elders, hospitality, honesty and sharing are central values.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A chief's court in Zimbabwe may punish a person who is accused of witchcraft.",
    answer: false,
    explanation: "False. Accusing a person of witchcraft is an offence in the law of Zimbabwe, and punishments that harm a person's rights are unlawful. Chiefs' courts handle certain customary disputes only within the limits of the Constitution and the law.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each taboo with its purpose.",
    pairs: [["Not marrying within the same totem", "preventing marriage between relatives (social order)"], ["Not cutting trees at a sacred pool", "protecting water and wildlife (conservation)"], ["Not insulting elders", "keeping respect in the family"], ["Washing hands after a burial", "protecting health and marking return to ordinary life"]],
    explanation: "Taboos serve social order, conservation, respect and health.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A taboo is called {{blank:a}} in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["chiera"], choices: ["chiera", "chisi", "mutupo", "svikiro"] },
      { id: "b", accepted: ["umlayo"], choices: ["umlayo", "umbuyiso", "isibongo", "umkhongi"] },
    ],
    explanation: "Chiera (plural zviera) in Shona and umlayo (plural imilayo) in Ndebele.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word.",
    template: "The Shona rest day on which farmers are told not to work the fields is called {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["chisi"], choices: ["chisi", "bira", "roora", "zviera"] }],
    explanation: "Chisi is a rest day that shows respect for the land and the spirits.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona word for an avenging spirit of a person who was wronged or killed?",
    accepted: ["ngozi"],
    wrong: ["mhondoro"],
    explanation: "A **ngozi** is an avenging spirit, believed to cause trouble to the family of the wrongdoer until the wrong is put right. Mhondoro are territorial (ancestral guardian) spirits.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** values taught in Indigenous Religion.",
    points: ["Respect for elders", "Hospitality, sharing or cooperation", "Honesty, chastity or respect for nature"],
    modelAnswer: "Respect for elders; hospitality and sharing; honesty.",
    explanation: "One mark for each value.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** purposes of taboos in Indigenous Religion.",
    points: [["Social order: taboos such as the totem rule prevent marriage between relatives", 2], ["Conservation: a ban on cutting trees or fishing at a sacred place protects water and wildlife", 2]],
    modelAnswer: "Taboos protect social order. For example, the rule against marrying within one's own totem prevents marriage between relatives. They also help conservation, because a ban on cutting trees or fishing at a sacred pool protects water and wildlife.",
    hints: ["Name the purpose, then an example, then the effect."],
    explanation: "Two marks for each purpose: purpose plus developed example.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the rewards and sanctions of Indigenous Religion help to keep moral order in a village.",
    points: [
      ["Social sanctions: shame, gossip and loss of trust make people avoid wrongdoing", 1],
      ["Developed: people care about their good name and their family's name in a close community", 1],
      ["Ancestral sanctions and rewards: believers expect misfortune from offended ancestors and blessing from pleased ones", 1],
      ["Developed: the belief that ancestors watch over the family encourages good behaviour even when no one is looking", 1],
      ["Lawful fines or settlement by the chief's court", 1],
      ["Developed: the court restores peace between families when someone has wronged another", 1],
    ],
    modelAnswer: "Social sanctions such as shame and loss of trust encourage good behaviour, because people care about their good name and that of their family in a close community. Believers also expect blessing from pleased ancestors and misfortune from offended ones, so the belief that ancestors watch over the family encourages people to behave well even when no one is looking. Finally, within the law, the chief's court can order fines or settle a dispute, which restores peace between families.",
    hints: ["Use three kinds: social, ancestral, and the chief's court, and develop each."],
    explanation: "Three developed points (2 marks each).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice from a fictional village development committee in Lupane, 2026",
      "The elders remind the village that the old rules for the Gonye pool are still in force. No one may cut trees on its banks. No one may fish there on the rest day. Anyone who breaks these rules will be called before the headman, who may order a fine in livestock. The pool supplies water to three villages and the school."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which word best describes the rules about the pool in Source A?",
        options: [
          ["Taboos", "Correct: they prohibit actions in a sacred place."],
          ["Initiation rites that mark the move to adulthood for young people in the village", "Nothing in the source concerns initiation."],
          ["Bride wealth payments that families make before a marriage can take place", "Nothing in the source concerns marriage."],
          ["Praise poems that the elders recite to honour the headman at village meetings", "The notice is about rules, not praise poetry."],
        ],
        answer: "A", explanation: "These are taboos (zviera/imilayo).",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** rules or sanctions mentioned in Source A.",
        points: ["No cutting trees on the banks of the pool", "No fishing at the pool on the rest day", "Rule-breakers are called before the headman and may be fined in livestock"],
        modelAnswer: "No cutting trees on the banks; no fishing on the rest day; rule-breakers are called before the headman and may be fined in livestock.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** reasons why the elders keep these rules.",
        points: [["Conservation: protecting trees and fish keeps the pool and its water, which three villages and the school use", 2], ["Respect: the pool is seen as belonging to the ancestors and the spirit of the place, so the rules show respect", 2]],
        modelAnswer: "The rules protect the pool, because keeping the trees and fish means the water stays available for three villages and the school. They also show respect, because the pool is seen as belonging to the ancestors and the spirit of the place.",
      }),
    ],
    hints: ["In (c) use the source for a practical reason, and your knowledge of IR for a religious reason."],
    explanation: "The source shows taboos with a conservation purpose and a sanction by the headman.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo and Sipho are discussing taboos. Chipo says: \"Taboos keep communities safe and respectful.\" Sipho says: \"Some taboos only create fear and restrict people's choices.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Give **three** examples of taboos in Indigenous Religion.",
        points: ["Not marrying a person of the same totem", "Not working on the rest day (chisi)", "Not cutting trees or fishing at sacred places"],
        modelAnswer: "Not marrying within one's totem; not working in the fields on chisi; not cutting trees at sacred places.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain **two** ways in which taboos benefit a community.",
        points: [["Social order and respect: rules such as respecting elders and avoiding incest keep families stable", 2], ["Conservation: taboos protect water sources, forests and wildlife", 2], ["Both are passed on by tradition and so protect future generations", 1]],
        modelAnswer: "Taboos keep order and respect, because rules against incest and insulting elders keep families stable. They also protect the environment, because bans on cutting trees or fishing at sacred places keep water and wildlife safe. Both are passed on from one generation to the next, so they protect future generations.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Assess the view that taboos are still relevant in Zimbabwe today.",
        points: [["For: conservation of water and forests, respect for elders, community values", 2], ["Against: some taboos restrict the choices or rights of women and girls, or are based on fear", 2], ["A supported judgement, such as that relevance depends on each taboo's purpose and effect", 2]],
        levels: [[4, 5, 6, "Considers both views with developed reasons and a supported judgement."], [3, 3, 4, "Both views, with limited development or an unsupported judgement."], [2, 2, 2, "One view developed or both only listed."], [1, 1, 1, "One or two undeveloped points."], [0, 0, 0, "Nothing creditworthy."]],
        modelAnswer: "Many taboos are still relevant. Those that protect water, trees and wildlife support conservation, and those that teach respect for elders help hold families together. However, some taboos may restrict the choices and rights of women and girls, or rest on fear rather than understanding. The best judgement is that relevance depends on each taboo: those that protect people and the environment deserve to be kept, while those that harm or restrict rights should be questioned.",
      }),
    ],
    hints: ["Consider the purpose and effect of different taboos before you judge."],
    explanation: "A balanced answer distinguishes helpful taboos from those that restrict rights.",
  });

  b.card("DEFINITION", "What is a **taboo**?", "A strong prohibition based on a community's beliefs; **chiera/zviera** (Shona), **umlayo/imilayo** (Ndebele).");
  b.card("CONCEPT", "What are the main sources of IR morality?", "God, the ancestors, the elders and chief, and the community's experience passed on orally.");
  b.card("FACT", "Give two purposes of taboos.", "Social order, health, conservation and respect (any two).");
  b.card("FACT", "What is **chisi**?", "A rest day on which farmers are told not to work the fields, showing respect for the land and spirits.");
  b.card("FACT", "What does \"Chara chimwe hachitswanyi inda\" teach?", "Cooperation: one thumb alone cannot crush a louse.");
  b.card("FACT", "What does \"Umuntu ngumuntu ngabantu\" mean?", "A person is a person through other people.");
  b.card("DEFINITION", "What is a **sanction**?", "A penalty or consequence for breaking a rule.");
  b.card("FACT", "What is a **ngozi**?", "An avenging spirit of a person who was wronged or killed.");
  b.card("CONCEPT", "Why is it wrong to call taboos 'superstitions' in an answer?", "Taboos have purposes in a belief system (social order, health, conservation, respect); examiners expect those purposes explained.");
});
