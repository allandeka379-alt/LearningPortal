// W1b: Birth, naming and initiation rites in Indigenous Religion.
import { concept, P, source } from "../lib.mjs";

concept("frs.indigenous.rites-birth-initiation", { file: "indigenous/rites-birth-initiation", keyPrefix: "indigenous.rites-birth-initiation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **rite of passage**?",
    options: [
      ["A ceremony that marks a person's move from one stage of life or status to another", "Correct: birth, adulthood, marriage and death are all marked in this way."],
      ["A journey made by a family to a sacred place in the Matopo Hills each year", "A pilgrimage or visit to a shrine is a different religious practice."],
      ["A set of rules that forbids certain foods, actions or places in a community", "Rules of this kind are taboos, not rites of passage."],
      ["A song sung by the elders at the start of the rainy season to ask the ancestors for good rains", "Rain ceremonies are a form of worship; they are not rites that mark a change of status."],
    ],
    answer: "A",
    explanation: "A rite of passage marks a change in a person's life or status. In Indigenous Religion the main ones are birth and naming, initiation (where practised), marriage and death.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Arnold van Gennep described rites of passage as having three stages. Which list gives them in the correct order?",
    options: [
      ["Separation, transition, incorporation", "Correct: the person leaves the old status, passes through a period in between, then is welcomed back with a new status."],
      ["Transition, separation, incorporation", "Transition cannot come first: the person must first be separated from the old status."],
      ["Incorporation, separation, transition", "Incorporation is the last stage, when the person is welcomed back."],
      ["Separation, incorporation, transition", "The in-between period of teaching or testing comes before the welcome back."],
    ],
    answer: "A",
    explanation: "Van Gennep's three stages are separation, transition and incorporation. They are a way of studying rites, and communities describe their own ceremonies in their own words.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are names usually given with great care in Shona and Ndebele families?",
    options: [
      ["A name carries a meaning and gives the child identity and belonging", "Correct: names may express thanks, hope, the family's situation or respect for an elder."],
      ["A name is chosen only to hide the child from the ancestors, who must not be told who the child is", "Names are given so the ancestors do know and protect the child; they are not random."],
      ["A name is only needed when the child starts school and must be registered there", "Names are given in the family long before school and have religious and social meaning."],
      ["A name is chosen by the government office that records the birth of every baby", "Naming is a family and community matter; registration is a separate legal step."],
    ],
    answer: "A",
    explanation: "Names such as Tendai (give thanks), Chipo (gift) and Themba (hope) show how names express feelings and beliefs. Naming also introduces the child to the family and the ancestors.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which pair names the two stages of girls' initiation among the Venda?",
    options: [
      ["Vhusha and domba", "Correct: these are stages of girls' instruction among the Venda."],
      ["Bira and mukwerera", "Bira is a ceremony for the ancestors and mukwerera is a rain ceremony; neither is a girls' initiation school."],
      ["Roora and lobola", "These are two names for bride wealth, a marriage custom."],
      ["Mutupo and detembo", "These are totems and praise poetry, which belong to identity, not initiation."],
    ],
    answer: "A",
    explanation: "Vhusha and domba are Venda girls' initiation schools in which young women learn the responsibilities of adult life.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha's sister has given birth in a Harare clinic. The family still holds a gathering where the elders speak to the ancestors and announce the baby's name. Which statement best describes what the family is doing?",
    options: [
      ["Following health advice while welcoming the child into the family and the ancestors' care", "Correct: clinic care and family ceremony can be combined without conflict."],
      ["Rejecting modern medicine, because holding the ceremony shows that clinics are not trusted by the family", "Nothing in the scenario suggests a rejection of the clinic; the family used it."],
      ["Holding an initiation school to prepare the baby for adult life and the responsibilities of marriage", "Initiation is for young people at puberty, not for a newborn baby."],
      ["Performing a funeral rite because a family member must have died before the birth", "The gathering is a welcome and naming, not a funeral."],
    ],
    answer: "A",
    explanation: "In IR a birth is welcomed by the whole family, living and ancestors. Many families today give birth in clinics and keep welcoming ceremonies as well.",
    hints: ["Ask which rite is about welcoming a baby."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why elders in communities that practise initiation teach young people together in one group?",
    options: [
      ["It builds a bond among the group and shows that adults belong to the whole community", "Correct: shared teaching and shared experience create loyalty and a sense of belonging."],
      ["It allows the elders to avoid teaching each family's children the values of their own relatives", "Teaching in a group does not replace families; it adds the community's voice."],
      ["It proves that every child in Zimbabwe must take part in the same initiation to remain in the religion", "Initiation is practised only in some communities, not by every child."],
      ["It makes sure that the school year is shortened so that children can finish primary school earlier", "Initiation has nothing to do with the length of the school year."],
    ],
    answer: "A",
    explanation: "A shared experience of teaching, tests and discipline gives young people a lasting bond and shows that adulthood is a responsibility to the community, not only to the family.",
    hints: ["Think about what young people learn by going through a rite together."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which concern is raised today about initiation rites that involve circumcision?",
    options: [
      ["That it should be done safely, by trained people, with the young person's consent", "Correct: health and consent are the main concerns, and the Ministry of Health offers safe voluntary medical male circumcision."],
      ["That the rite is not known in Zimbabwe and has no connection with any community in the country", "Some communities practise circumcision as part of identity or initiation."],
      ["That the ancestors do not accept the offering made at the end of the school of instruction by the elders", "This is a claim about belief, not a contemporary public concern about health or rights."],
      ["That the young person is too old to learn the values taught by the elders at the school", "Age is not the issue raised; harm and consent are."],
    ],
    answer: "A",
    explanation: "Current debates focus on safe practice, consent and children's rights (Constitution, section 81), schooling and the choice of some families to keep the teaching but change the rite.",
    hints: ["Think of the Ministry of Health's advice and of children's rights."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Indigenous Religion, a birth is the concern of the mother alone and the wider family takes no part.",
    answer: false,
    explanation: "False. Older women, relatives and the elders all take part, and the ancestors are asked to protect the child.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Initiation schools exist in every community in Zimbabwe and all Indigenous Religion followers must attend one.",
    answer: false,
    explanation: "False. Initiation is practised by some communities, such as the Venda and some Tsonga/Shangani and Remba communities, in different forms. It is not universal.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each name with its meaning.",
    pairs: [["Tendai", "give thanks"], ["Chipo", "gift"], ["Farai", "be happy"], ["Themba", "hope or trust"]],
    explanation: "Tendai and Farai are Shona commands or wishes (give thanks, be happy); Chipo is Shona for gift; Themba is Ndebele for hope or trust.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Arnold van Gennep described three stages of a rite of passage: separation, {{blank:a}} and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["transition"], choices: ["transition", "sacrifice", "courtship", "mourning"] },
      { id: "b", accepted: ["incorporation"], choices: ["incorporation", "isolation", "taboo", "inheritance"] },
    ],
    explanation: "Separation, transition (the in-between period) and incorporation (welcome back with a new status).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word.",
    template: "Among the Venda, girls' initiation includes the stage called {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["domba"], choices: ["domba", "bira", "mukwerera", "kurova guva"] }],
    explanation: "Vhusha and domba are Venda girls' schools of instruction. Bira, mukwerera and kurova guva are ceremonies connected with ancestors and rain, not initiation.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona word for the ancestral spirits of a family?",
    accepted: ["midzimu", "mudzimu", "vadzimu"],
    wrong: ["amadlozi", "mhondoro"],
    explanation: "The ancestral spirits of a family are called midzimu (singular mudzimu) in Shona and amadlozi in Ndebele. Mhondoro are territorial spirits.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "Identify **two** purposes of initiation rites for young people.",
    points: [
      ["First purpose, for example: teaches respect for elders, responsibility or community values", 1],
      ["Second purpose, for example: prepares for marriage and family life, gives sex and family education, builds courage and discipline, or creates a bond among the group", 1],
    ],
    modelAnswer: "Initiation teaches respect for elders and community values, and it prepares young people for marriage and the duties of adult life.",
    explanation: "One mark for each purpose identified; no need to explain.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a baby may be welcomed and named in an Indigenous Religion family.",
    points: [
      ["Mother and baby stay close to home for a period while older women care for them", 1],
      ["The family gathers, led by elders or grandparents", 1],
      ["The elders speak to the ancestors, telling them the baby's name and asking for protection", 1],
      ["Relatives greet the child by name, bring gifts or share a meal to show that the child belongs", 1],
    ],
    modelAnswer: "After the birth the mother and baby are cared for at home by grandmothers and aunts. After some days or weeks the family gathers and the elders tell the ancestors the baby's name and ask them to protect the child. Relatives greet the baby by name, bring gifts and share a meal, showing that the child belongs to the family.",
    hints: ["Put the stages in order: care at home, gathering, speaking to the ancestors, welcome."],
    explanation: "One mark for each stage described accurately. Customs differ, so credit any reasonable account.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why rites of passage are important in Indigenous Religion.",
    points: [
      ["They mark a change in a person's status and announce it to the community", 1],
      ["Developed: so everyone knows the person's new duties and rights (for example a young adult is expected to behave responsibly)", 1],
      ["They ask the ancestors to protect and guide the person through the new stage", 1],
      ["Developed: because the family believes the ancestors care about their descendants' well-being", 1],
      ["They teach values and duties to the younger generation", 1],
      ["Developed: this keeps the community's identity and morality alive from one generation to the next", 1],
    ],
    modelAnswer: "Rites of passage mark a change in status and announce it to the whole community, so that everyone knows the person's new duties and rights, for example that a young adult is now expected to act responsibly. They also ask the ancestors to protect and guide the person, because the family believes the ancestors care about their descendants. Finally, rites teach values to the younger generation, which keeps the community's identity and morality alive from one generation to the next.",
    hints: ["Give three reasons and develop each with a 'because' or 'so that'."],
    explanation: "Three developed reasons, 2 marks each (reason 1 + development 1).",
  });

  // Practice structured items.
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school magazine feature, Masvingo, 2026",
      "When my cousin Rudo's baby was three weeks old, my aunts and my grandmother gathered the family at the homestead. My grandfather spoke quietly to the ancestors and told them the baby's name. Then everyone clapped and sang. Rudo said later that she felt the baby was now truly part of the family. She had also taken the baby to the clinic for check-ups every month.",
      ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which stage of a rite of passage is the gathering in Source A mainly showing?",
        options: [
          ["Incorporation, the welcome into the family", "Correct: the baby is named and welcomed as a family member."],
          ["Separation, the leaving of the old status of a person", "The gathering is not about leaving a status behind."],
          ["Initiation, the entry of a young person into adulthood", "Initiation is for young people, not a newborn."],
          ["Mourning, the grief of a family at the death of a relative", "Nobody has died in the source."],
        ],
        answer: "A", explanation: "Naming and welcome are the incorporation stage for a newborn.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Identify **three** things the family does in Source A to welcome the baby.",
        points: ["The family gathers at the homestead", "The grandfather speaks to the ancestors and tells them the baby's name", "The family claps and sings (celebrates together)"],
        modelAnswer: "They gather at the homestead; the grandfather tells the ancestors the baby's name; everyone claps and sings.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** ways in which the family's actions show respect for both tradition and modern health advice.",
        points: [
          ["Tradition: the elders speak to the ancestors and name the baby, which shows belief in the ancestors' care", 2],
          ["Modern health advice: Rudo takes the baby to the clinic every month to keep the baby healthy", 2],
        ],
        modelAnswer: "The grandfather speaks to the ancestors and tells them the baby's name, which shows the family still believes the ancestors care for the child. At the same time, Rudo takes the baby to the clinic every month, which follows health advice and protects the baby's health.",
      }),
    ],
    hints: ["In (c) pick one example of tradition and one of modern health advice from the source, and explain what each shows."],
    explanation: "The source shows a naming and welcome ceremony alongside regular clinic visits.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo and Farai, two Form 4 students, are discussing initiation rites. Chipo says: \"Initiation teaches young people respect and responsibility, so every community should keep it as it is.\" Farai replies: \"Some practices raise concerns about health and consent, so they must change.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Outline **three** things initiation teaches young people.",
        points: ["Respect for elders", "Responsibility and discipline", "Family life, marriage, sex education or community values"],
        modelAnswer: "Respect for elders; responsibility and discipline; family life and community values.",
      }),
      P.manual({
        label: "(b)", marks: 5, stem: "Explain **two** concerns that people raise about some initiation practices today.",
        points: [
          ["Health: procedures such as circumcision must be done safely by trained people; the Ministry of Health offers safe voluntary medical male circumcision", 2],
          ["Consent and rights: young people must not be forced or harmed (children's rights, Constitution section 81)", 2],
          ["Links to the reasons: unsafe or forced practice can harm a young person", 1],
        ],
        modelAnswer: "One concern is health. If circumcision is done by someone untrained or in unclean conditions, a young person can be harmed, which is why the Ministry of Health offers safe voluntary circumcision with trained health workers. A second concern is consent and children's rights. The Constitution protects children, so no young person should be forced to take part or be harmed.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Assess whether initiation rites should be kept as they are or changed.",
        points: [
          ["Kept: they teach respect, responsibility and community belonging", 2],
          ["Changed: health, consent and schooling concerns", 2],
          ["A supported judgement, such as keeping the teaching but making sure the practice is safe, voluntary and does not interfere with school", 2],
        ],
        levels: [[4, 5, 6, "Considers both views with developed reasons and a supported judgement."], [3, 3, 4, "Both views, with limited development or an unsupported judgement."], [2, 2, 2, "One view developed or both only listed."], [1, 1, 1, "One or two undeveloped points."], [0, 0, 0, "Nothing creditworthy."]],
        modelAnswer: "Initiation teaches respect, responsibility and a sense of belonging, so it has real value for the community. However, health, consent and schooling must be protected: young people should not be harmed or forced, and rites should not stop them attending school. A sensible view is that the teaching should be kept and the practice made safe, voluntary and compatible with schooling.",
      }),
    ],
    hints: ["Give reasons for both Chipo's and Farai's views before you give your own judgement."],
    explanation: "A balanced answer weighs the value of teaching against health, consent and schooling concerns.",
  });

  // Flashcards.
  b.card("DEFINITION", "What is a **rite of passage**?", "A ceremony that marks a person's move from one stage of life or status to another, such as birth, adulthood, marriage or death.");
  b.card("DEFINITION", "What is **initiation**?", "A rite, often with a period of teaching, by which a young person is accepted as a responsible adult member of the community.");
  b.card("FACT", "What are van Gennep's three stages of a rite of passage?", "Separation, transition and incorporation.", "A tool for study; communities use their own words.");
  b.card("FACT", "Which ancestral spirits are called **midzimu** in Shona and **amadlozi** in Ndebele?", "The ancestral spirits of the family.");
  b.card("FACT", "What does the Shona name **Tendai** mean?", "\"Give thanks\".", "Chipo means \"gift\" and Farai \"be happy\".");
  b.card("FACT", "What does the Ndebele name **Themba** mean?", "\"Hope\" or \"trust\".", "Sipho means \"gift\"; Thandeka means \"lovable\".");
  b.card("CONCEPT", "Why do families hold a naming and welcome ceremony for a baby?", "To introduce the child to the family and the ancestors, give the child identity and belonging, and ask for protection.");
  b.card("FACT", "Name two Venda stages of girls' initiation.", "Vhusha and domba.");
  b.card("CONCEPT", "What health and rights concerns are raised about some initiation practices today?", "Safety (trained people, clean conditions), consent and children's rights (Constitution section 81), and school attendance.", "The Ministry of Health offers voluntary medical male circumcision.");
});
