// W1b: Names, totems and identity.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.family.names-totems", { file: "family/names-totems", keyPrefix: "family.names-totems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the Shona word for a totem?",
    options: [
      ["Mutupo", "Correct: the Ndebele word is isibongo."],
      ["Mudzimu", "A mudzimu is an ancestral spirit."],
      ["Munyai", "A munyai is a go-between in marriage."],
      ["Mukwerera", "Mukwerera is a rain-making ceremony."],
    ],
    answer: "A",
    explanation: "A totem is **mutupo** (plural mitupo) in Shona and **isibongo** (plural izibongo) in Ndebele.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do people of the same totem not marry each other?",
    options: [
      ["They are regarded as relatives of one clan", "Correct: it prevents marriage between relatives (incest)."],
      ["They would have to pay a higher amount of roora than people from different totems", "The rule is not about payment."],
      ["They are not allowed to live in the same district or attend the same school", "Totems do not decide where people live or study."],
      ["They are believed to share the same ancestors in every religion in Zimbabwe", "The rule concerns kinship within a clan, not all religions."],
    ],
    answer: "A",
    explanation: "People of one totem are treated as relatives, so marriage between them is regarded as incest. This is one function of the totem.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a totem help conservation?",
    options: [
      ["Members do not hunt, kill or eat their totem animal", "Correct: this protects the species."],
      ["Members are required to sell their totem animal at the market for a fair price", "Totem animals are not sold."],
      ["Members move away from the places where their totem animals are found", "Totems are respected where they are, not avoided."],
      ["Members are asked to keep the totem animal in a cage in their homestead", "Totem animals are not kept in cages."],
    ],
    answer: "A",
    explanation: "Because members avoid harming or eating their totem animal, the species is protected over generations.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "When is a Jewish baby boy usually named?",
    options: [
      ["At his circumcision (brit milah) on the eighth day", "Correct: the naming takes place at the brit milah."],
      ["At baptism in a church in the month after his birth", "Baptism is a Christian rite."],
      ["At the aqiqah, with the sacrifice of an animal in the first week", "The aqiqah is an Islamic custom."],
      ["At a bira in which the ancestors are told the child's name by the family", "A bira is an IR ceremony."],
    ],
    answer: "A",
    explanation: "In Judaism a boy is named at the brit milah on the eighth day; a girl is named in the synagogue.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the **aqiqah**?",
    options: [
      ["An Islamic ceremony after a birth, in which an animal is sacrificed and shared", "Correct: it is held in the first week and food is shared with the poor and relatives."],
      ["A Jewish ceremony of circumcision performed on the eighth day after a birth", "That is brit milah."],
      ["A Christian ceremony of baptism in which a child receives a name in the church", "That is baptism."],
      ["A Shona ceremony of bringing home the spirit of a dead person a year after burial", "That is kurova guva."],
    ],
    answer: "A",
    explanation: "The aqiqah welcomes a baby in Islam, with a name, sacrifice and sharing food.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula meets a visitor who also has the totem Ndlovu. Her family welcomes him as a relative. Which function of totems does this show?",
    options: [
      ["Unity and hospitality", "Correct: people of one totem treat one another as kin."],
      ["Conservation of animal species by a total ban on hunting in the whole country", "The example is about welcoming a person."],
      ["Preventing incest between relatives who share the same clan", "The example does not concern marriage."],
      ["Recording the history of a clan in praise poetry at a family gathering", "The example does not mention praise poetry."],
    ],
    answer: "A",
    explanation: "A person who shares your totem is treated as family and welcomed.",
    hints: ["What does the family do for the visitor?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why praise poetry (detembo / izibongo) matters to identity?",
    options: [
      ["It recites a clan's totem, history and qualities and so affirms belonging", "Correct: it reminds people who they are and honours the ancestors."],
      ["It replaces all other forms of teaching and is the only way to learn about the clan", "It is one way, alongside stories and ceremonies."],
      ["It is a law that must be recited before a person is allowed to marry a spouse", "It is not a legal requirement."],
      ["It records the amount of roora paid by each family during the marriage negotiations", "Praise poetry is not an account of roora."],
    ],
    answer: "A",
    explanation: "Praise poetry names the totem, history and qualities of a clan or person, so it affirms identity and honours the ancestors.",
    hints: ["What does the poetry recite?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion about names and totems in Zimbabwe today is the most balanced?",
    options: [
      ["They continue in many families, but town life and other religions have changed how they are used", "Correct: continuity and change exist together."],
      ["They have disappeared completely because all children now have English names", "Many families still teach totems and give African names."],
      ["They have not changed at all, and all families follow the same rules as in the past", "Customs have changed in many families."],
      ["They are important only to elderly people and young people have no interest in them at all", "Some young people are reviving interest."],
    ],
    answer: "A",
    explanation: "A balanced view notes continuity (names with meaning, totems taught) and change (Christian and Muslim names, urban life, revival).",
    hints: ["Avoid 'completely', 'at all' and 'only'."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Islam a baby is usually named in the first week after birth.",
    answer: true,
    explanation: "True. Parents choose a name, often announcing it in the first week, sometimes with the aqiqah.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Members of a clan worship their totem animal as a god.",
    answer: false,
    explanation: "False. A totem is respected as a clan symbol; members honour it, but the supreme being is God (Mwari, uMlimo or uNkulunkulu).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ceremony or custom with the religion in which it is found.",
    pairs: [["Brit milah", "Judaism"], ["Aqiqah", "Islam"], ["Baptism", "Christianity"], ["Telling the ancestors the baby's name", "Indigenous Religion"]],
    explanation: "Brit milah is Jewish; aqiqah is Muslim; baptism is Christian; informing the ancestors is IR.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Praise poetry is called {{blank:a}} in Shona and {{blank:b}} in Ndebele.",
    blanks: [
      { id: "a", accepted: ["detembo"], choices: ["detembo", "mutupo", "bira", "roora"] },
      { id: "b", accepted: ["izibongo"], choices: ["izibongo", "umbuyiso", "lobola", "umkhongi"] },
    ],
    explanation: "Detembo (Shona) and izibongo (Ndebele).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word.",
    template: "The Shona name Tendai means \"{{blank:a}}\".",
    blanks: [{ id: "a", accepted: ["give thanks"], choices: ["give thanks", "be happy", "gift", "peace"] }],
    explanation: "Tendai means \"give thanks\". Farai means \"be happy\" and Chipo \"gift\".",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Ndebele word for a totem or clan name?",
    accepted: ["isibongo", "izibongo"],
    wrong: ["mutupo"],
    explanation: "The Ndebele word is **isibongo** (plural izibongo); the Shona word is mutupo.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** functions of totems.",
    points: ["Give identity and belonging to a clan", "Prevent marriage between relatives (incest)", "Protect animals or nature, or promote unity and hospitality"],
    modelAnswer: "Totems give identity and belonging, prevent marriage between relatives, and protect animals by forbidding members to harm their totem.",
    explanation: "One mark for each function.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** ways in which names are given and what they mean in Indigenous Religion.",
    points: [["Elders gather and announce the name to the ancestors, asking for protection", 2], ["Names express thanks, hope, joy or the family's circumstances (for example Tendai, Themba, Farai)", 2]],
    modelAnswer: "Elders gather the family, speak to the ancestors and announce the baby's name, asking for the child's protection. The name carries a meaning that expresses thanks, hope, joy or the family's circumstances; for example, Tendai means give thanks and Themba means hope.",
    hints: ["One way concerns the ceremony; one concerns the meaning of the name."],
    explanation: "Two marks for each developed point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which change has affected names and totems in Zimbabwe.",
    points: [
      ["Christianity and Islam have brought Christian and Muslim names", 1],
      ["Developed: many people have a religious name alongside or in place of an African name, so names now show several traditions", 2],
      ["Urban life means children may not learn their totem or follow its rules", 1],
      ["Developed: totem rules about marriage and about not eating the animal are less widely known, so a source of identity is weakened unless families teach it", 2],
    ],
    modelAnswer: "Christianity and Islam have brought Christian and Muslim names, and many people have a religious name alongside or in place of an African name, so names now show several traditions. Urban life also means that children may not learn their totem or its rules. Totem rules about marriage and about not eating the totem animal are less widely known, so a source of identity is weakened unless families teach it.",
    hints: ["One change from religions and one from urban life; develop each."],
    explanation: "Two changes, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a conversation between two fictional students at a school in Chinhoyi, 2026",
      "Rudo: My grandmother says our totem is Shumba. We do not eat lion meat, of course, but she says it also means we are related to every other Shumba.\nAisha: In my family, we gave my little brother his name, Ibrahim, in the first week. My father whispered the call to prayer in his ear, and we shared food with the neighbours.\nRudo: So both are ways of welcoming a person and telling them who they belong to."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which practice does Aisha describe in Source A?",
        options: [
          ["Naming a baby in the first week and sharing food, as in Islam", "Correct: this describes the Muslim welcome of a baby."],
          ["A brit milah, the circumcision of a baby boy on the eighth day", "That is Jewish; the source does not mention it."],
          ["A baptism in a church, with a minister and a godparent for the baby", "That is Christian; the source mentions the call to prayer."],
          ["A bira at the homestead, in which the ancestors are told the baby's name", "That is an IR ceremony; the source describes an Islamic practice."],
        ],
        answer: "A", explanation: "Aisha describes naming in the first week, the call to prayer and sharing food.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** things Source A says about Rudo's totem.",
        points: ["Her totem is Shumba (lion)", "Her family does not eat lion meat (they respect the totem)", "It means they are related to every other Shumba"],
        modelAnswer: "The totem is Shumba; the family does not eat lion meat; it means they are related to every other Shumba.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how, as Rudo says, both practices are \"ways of welcoming a person and telling them who they belong to\".",
        points: [["A totem tells a person which clan they belong to and links them with relatives", 2], ["Naming with the call to prayer and sharing food welcomes a baby into the family and the Muslim community", 2]],
        modelAnswer: "A totem tells a person which clan they belong to and links them with relatives, so it gives identity. Naming a baby with the call to prayer and sharing food welcomes the baby into the family and the Muslim community.",
      }),
    ],
    hints: ["Explain what each practice gives a person."],
    explanation: "The source compares a totem with an Islamic naming custom.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Sipho says: \"Totems are no longer relevant in modern Zimbabwe.\" Thandeka says: \"They still teach us who we are and how to respect nature.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** functions of totems.",
        points: [["Identity and belonging to a clan", 2], ["Preventing marriage between relatives or protecting animals", 2]],
        modelAnswer: "Totems give a person identity and belonging to a clan. They also prevent marriage between relatives, and protect species because members do not harm their totem.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** reasons why some young people know less about their totems today.",
        points: [["Urban life: they grow up away from the rural home and elders", 2], ["Schooling and other religions: they learn other values and names, and families may not teach totems", 2]],
        modelAnswer: "Many young people grow up in towns away from the rural home and the elders who teach totems. School and other religions can also give them other names and values, and busy families may not teach them.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "How far do you agree that totems are no longer relevant in Zimbabwe?",
        points: [["For: less known in towns, many marry without checking totems, other religious names", 2], ["Against: identity, conservation, praise poetry, revival", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Sipho has a point: in towns many young people know little about their totems, and many people marry without checking them. However, totems still give many people identity and belonging, and the idea of not harming one's totem supports conservation. Some families are also teaching praise poetry and totems again as a source of pride. Overall, totems are less central for some people but still relevant to many.",
      }),
    ],
    hints: ["Weigh how well totems are known against the functions they still serve."],
    explanation: "A balanced answer considers decline and revival.",
  });

  b.card("DEFINITION", "What is a **totem**?", "An animal, plant or object that is the emblem of a clan; **mutupo** (Shona), **isibongo** (Ndebele).");
  b.card("FACT", "Give two functions of totems.", "Identity, preventing incest, conservation, unity and hospitality (any two).");
  b.card("DEFINITION", "What is **praise poetry**?", "Poetry that recites the names, totem and history of a clan or person; **detembo** (Shona), **izibongo** (Ndebele).");
  b.card("FACT", "When is a Jewish boy named?", "At his circumcision (brit milah) on the eighth day.");
  b.card("FACT", "What is the Islamic custom of sacrificing an animal after a birth?", "The aqiqah, held in the first week with the naming.");
  b.card("FACT", "What does the Shona name **Rudo** mean?", "Love.", "Nyasha means grace; Farai means be happy.");
  b.card("CONCEPT", "Why do people of the same totem not marry?", "They are regarded as relatives of one clan, so marriage between them would be incest.");
  b.card("CONCEPT", "How has change affected names?", "Christian and Muslim names, English names and urban life have changed naming; some families revive African names.");
});
