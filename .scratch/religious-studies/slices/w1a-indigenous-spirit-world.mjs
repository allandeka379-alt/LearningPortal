// W1a: the spirit world in Indigenous Religion (frs.indigenous.spirit-world).
// Reviewer note: the statement that accusing a person of witchcraft is an offence in Zimbabwe should be confirmed against
// the Witchcraft Suppression Act / Criminal Law (Codification and Reform) Act as currently in force.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.indigenous.spirit-world", { file: "indigenous/spirit-world", keyPrefix: "indigenous.spirit-world" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are **midzimu** (amadlozi in Ndebele) in Indigenous Religion?",
    options: [
      ["Spirits of dead family members believed to care for the family", "Correct: they are the family ancestral spirits."],
      ["Spirits of strangers who died far away from their own homes", "Those are the alien spirits, mashavi."],
      ["Spirits of people who were killed or wronged and seek justice", "Those are the avenging spirits, ngozi."],
      ["Spirits of great chiefs who guard a whole region and its rain", "Those are the territorial spirits, mhondoro."],
    ],
    answer: "A",
    explanation: "**Midzimu/amadlozi** are the family ancestral spirits, honoured with offerings and rituals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which kind of spirit is believed to guard a chiefdom or region and to speak through a spirit medium?",
    options: [
      ["A territorial spirit (mhondoro)", "Correct: mhondoro guard the land and its people."],
      ["An alien spirit (shavi)", "A shavi is a spirit from outside the family that gives skills."],
      ["An avenging spirit (ngozi) seeking justice", "A ngozi seeks justice for a wrong."],
      ["A newly deceased family member waiting to be brought home", "That spirit has not yet been welcomed home by kurova guva or umbuyiso."],
    ],
    answer: "A",
    explanation: "A **mhondoro** (\"lion\") is a territorial or tribal guardian spirit, often of a great ancestor of the ruling line.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **ngozi** believed to want?",
    options: [
      ["Justice or compensation for a wrong done to the person while alive", "Correct: the ngozi is the spirit of a wronged person."],
      ["Offerings of beer from the family that honoured it at every ceremony", "That describes the ancestors who are honoured, not a ngozi."],
      ["To give skills in healing or hunting to a person who is chosen", "That describes the alien spirits, mashavi."],
      ["To guard the harvests and rain of a whole chiefdom for ever", "That describes the territorial spirits, mhondoro."],
    ],
    answer: "A",
    explanation: "A **ngozi** is the spirit of someone who was wronged, believed to seek justice from the wrongdoer's family until the matter is settled.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of these is a ceremony in which the spirit of the deceased is believed to be brought home to the family?",
    options: [
      ["Kurova guva (umbuyiso in Ndebele)", "Correct: it welcomes the deceased as an ancestor."],
      ["Mukwerera (ukucela izulu in Ndebele)", "That is the rain-making ceremony."],
      ["Nhimbe (ilima in Ndebele)", "That is a work party."],
      ["Chisi, a day of rest from work in the fields", "That is a day of rest, not a ceremony for the dead."],
    ],
    answer: "A",
    explanation: "**Kurova guva/umbuyiso** brings the spirit home. The deceased is then believed to join the ancestors who protect the family.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka's family has been troubled since a man died owing a debt that was never paid. The elders say that his spirit may be seeking justice. Which kind of spirit do they mean?",
    options: [
      ["An avenging spirit (ngozi) seeking justice", "Correct: the spirit of a wronged person seeking justice."],
      ["A family ancestor (mudzimu) who is pleased with the family", "A family ancestor who is pleased would not be seeking justice."],
      ["An alien spirit (shavi) that gives skills", "A shavi is linked with skills, not with debts."],
      ["A territorial spirit (mhondoro) of a chief", "Mhondoro guard a region, not a single debt."],
    ],
    answer: "A",
    hints: ["Which spirit is linked with a wrong that was never put right?"],
    explanation: "The belief in a spirit that seeks justice for a wrong is the belief in a **ngozi**. Elders settle the matter by peaceful means.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A boy has a fever and the family decides to take him to the clinic and also to meet the elders to ask about any neglected family duty. How does this show a balanced approach?",
    options: [
      ["It seeks medical care and also respects the family's beliefs", "Correct: both are used, with medical care first."],
      ["It refuses medical care in favour of the spirit world alone", "A balanced approach does not refuse medical care."],
      ["It ignores the family's beliefs and treats the elders' views as dangerous", "Beliefs are respected as part of the family's way of understanding."],
      ["It accuses a neighbour of causing the illness to explain it", "Accusing a neighbour causes harm and is not a balanced approach."],
    ],
    answer: "A",
    hints: ["What is done for the boy's body, and what for the family's beliefs?"],
    explanation: "Taking a sick person to a trained health worker, while also respecting a family's beliefs, is the balanced approach recommended in this subject.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why are witchcraft accusations considered **harmful** to communities?",
    options: [
      ["They can lead to violence or banishment of people blamed without evidence", "Correct: innocent people, often elderly or widowed, have been hurt."],
      ["They make all the families in a village agree about the cause of an illness", "Accusations usually divide families and communities."],
      ["They guarantee that a sick person will recover as soon as the accused is gone", "No such guarantee exists; illness needs medical care."],
      ["They are encouraged by the law as a way to settle disputes quickly", "The law makes accusing someone of witchcraft an offence."],
    ],
    answer: "A",
    hints: ["Think of who is usually accused, and what happens to them."],
    explanation: "Accusations without evidence have caused violence and killing. Zimbabwean law treats them as offences, and religious leaders speak against them.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which description of the spirit world is the **fairest** for a student of religion to write?",
    options: [
      ["Many believers hold that ancestors guard the family and are honoured", "Correct: it reports the belief without endorsing or mocking it."],
      ["Ancestors really do control every illness, and clinics are therefore unnecessary", "This asserts a claim as fact and risks harm."],
      ["Beliefs in spirits are foolish ideas that educated people have given up", "This is a judgement and is not fair or accurate."],
      ["All spirits in Indigenous Religion are evil and must be driven out", "Most spirits are not evil; ancestors protect the family."],
    ],
    answer: "A",
    hints: ["Which sentence describes belief without judging it?"],
    explanation: "A non-confessional study reports beliefs as the beliefs of their followers. It neither endorses nor ridicules them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The word mhondoro means \"lion\" and is used for a territorial guardian spirit.",
    answer: true,
    explanation: "True. A mhondoro is a spirit believed to guard a chiefdom or region and its people.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Indigenous Religion, every spirit is believed to be evil and harmful to the family.",
    answer: false,
    explanation: "False. Family ancestors are believed to protect and guide the family. Only some beliefs, such as an avenging ngozi or witchcraft, are feared.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each spirit with its description.",
    pairs: [
      ["Mudzimu (idlozi)", "A deceased family member who guards the family"],
      ["Mhondoro", "A territorial spirit that guards a region and its people"],
      ["Shavi", "A spirit from outside the family that gives skills"],
      ["Ngozi", "The spirit of a wronged person seeking justice"],
    ],
    explanation: "Family ancestors guard the family; mhondoro guard a region; mashavi come from outside and give skills; ngozi seek justice.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Shona word for witchcraft is {{blank:a}} and the Ndebele word is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["uroyi"], choices: ["uroyi", "ngozi", "mhondoro", "bira"] },
      { id: "b", accepted: ["ubuthakathi"], choices: ["ubuthakathi", "umbuyiso", "idlozi", "isangoma"] },
    ],
    explanation: "Witchcraft is **uroyi** (Shona) and **ubuthakathi** (Ndebele).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the plural, in Shona, of the word for a family ancestral spirit, mudzimu?",
    accepted: ["midzimu"],
    wrong: ["amadlozi", "mashavi"],
    explanation: "The plural of *mudzimu* is **midzimu**. In Ndebele the family ancestral spirits are *amadlozi*.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** kinds of spirit believed in within Indigenous Religion.",
    points: ["Family ancestral spirits (midzimu/amadlozi)", "Territorial spirits (mhondoro)", "Any one of: alien spirits (mashavi), avenging spirits (ngozi)"],
    modelAnswer: "Family ancestral spirits (midzimu), territorial spirits (mhondoro) and avenging spirits (ngozi).",
    explanation: "One mark for each kind correctly named.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which spirits are believed to communicate with the living.",
    points: [
      "Identifies: through dreams",
      "Develops: a family member may be given a message or a warning by an ancestor",
      "Identifies: through a spirit medium (svikiro) in possession",
      "Develops: the spirit is believed to speak to the family or the community through the medium",
    ],
    modelAnswer: "Spirits are believed to communicate through dreams, when an ancestor gives a family member a message or warning. They are also believed to speak through a spirit medium in possession, so that the family or community can hear the spirit's guidance.",
    hints: ["Think of what happens at night and during a ceremony."],
    explanation: "Two marks for each way: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why witchcraft accusations are a serious social problem in some communities.",
    points: [
      "People may be blamed without evidence for misfortune, illness or death",
      "Accused people, often elderly or widowed, may be beaten, banished or killed",
      "Accusations divide families and communities and increase fear",
      "They can delay proper medical care, and they are an offence under Zimbabwean law",
    ],
    modelAnswer: "People may be blamed without evidence for illness or death, and those accused, often elderly or widowed, may be beaten, banished or killed. Accusations divide families and communities and increase fear, and they can delay proper medical care. They are also an offence under Zimbabwean law.",
    hints: ["Think of who is blamed and what happens to them."],
    explanation: "One mark for each valid point, up to four.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a story written by a fictional Form 2 learner in Hwange, 2026",
      "My cousin Sipho was ill for a long time. My aunt took him to the clinic first, and the nurse gave him medicine. At the same time, the elders of the family met and asked whether anything had been neglected. They recalled that our grandfather's homecoming ceremony had never been held. The family held the ceremony, and my aunt said that now the family could be at peace. A neighbour whispered that someone must have bewitched Sipho, but the elders said that no one should be blamed.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which ceremony does the source say the family had not yet held for the grandfather?",
        options: [
          ["Kurova guva / umbuyiso", "Correct: the ceremony that brings the spirit home as an ancestor."],
          ["The rain-making ceremony (mukwerera)", "Nothing in the source concerns rain."],
          ["A work party (nhimbe)", "A work party is a practical gathering and is not mentioned."],
          ["A wedding ceremony", "No wedding is mentioned."],
        ],
        answer: "A",
        explanation: "The family held the homecoming ceremony, **kurova guva/umbuyiso**, to bring the grandfather's spirit home.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** actions that the family took in response to Sipho's illness.",
        points: ["Took him to the clinic for medicine", "Met as elders and held the homecoming ceremony"],
        modelAnswer: "They took him to the clinic, and the elders met and held the homecoming ceremony.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the elders were right to say that no one should be blamed for Sipho's illness.",
        points: [
          "Accusing a neighbour without evidence can lead to harm, quarrels and violence",
          "The family had a clear medical response and a religious response that did not need a culprit",
          "Accusing someone of witchcraft is an offence, and it divides communities",
        ],
        modelAnswer: "Blaming a neighbour without evidence can lead to quarrels and violence. The family already had a medical response and a religious response that needed no culprit, and accusing someone of witchcraft is an offence that divides communities.",
      }),
    ],
    hints: ["In (c), think about what accusations do to a community."],
    explanation: "A source linking medical care, belief in the ancestors, and the avoidance of accusations.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on the spirit world.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** duties that the living are believed to have towards the ancestors.",
        points: [
          "Make offerings and prayers (e.g. beer and snuff at a bira)",
          "Developed: this honours the ancestors and asks for protection",
          "Hold the proper rites of death, such as kurova guva/umbuyiso, and keep the family's taboos and moral rules",
          "Developed: the ancestors are believed to protect the family in return",
        ],
        modelAnswer: "The living make offerings and prayers, such as beer and snuff at a bira, to honour the ancestors and ask for protection. They also hold the proper rites of death, such as kurova guva or umbuyiso, and keep the family's taboos and rules, because the ancestors are believed to protect a family that does its duties.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Belief in the spirit world strengthens family life more than it harms it.\" Assess this view.",
        points: [
          ["For: ancestors give a sense of continuity, protection and belonging; ceremonies bring relatives together; moral rules and taboos guide behaviour", 2],
          ["Against: witchcraft accusations lead to quarrels, banishment and violence; fear may delay medical care; some practices (such as giving a girl as compensation) are harmful and illegal", 2],
          ["Harm arises from misuse of the beliefs by some people; leaders and the law speak against it", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "In many ways the belief strengthens family life. The ancestors give a family a sense of continuity and belonging, and ceremonies such as the bira bring relatives together. Taboos and moral rules guide behaviour and help to settle quarrels.\n\nHowever, the beliefs can also cause harm. Witchcraft accusations have led to quarrels, banishment and violence, fear of the spirit world may delay medical care, and in the past some families settled disputes in harmful ways, such as giving a girl to the wronged family, which is now illegal.\n\nThese harms come from the misuse of beliefs by some people, and elders, religious leaders and the law speak against them. On balance I think the belief strengthens family life more than it harms it, provided that medical care is sought and no one is falsely blamed.",
      }),
    ],
    hints: ["In (b), give benefits, give harms, and say what causes the harm."],
    explanation: "Describe duties to the ancestors (a) and assess the effect of belief in the spirit world (b).",
  });

  b.card("DEFINITION", "Mudzimu (plural midzimu); idlozi (plural amadlozi)", "A family ancestral spirit: a deceased family member believed to continue to care for the family.");
  b.card("DEFINITION", "Mhondoro", "A territorial or tribal guardian spirit that guards a chiefdom or region and speaks through a medium. The word means 'lion'.");
  b.card("DEFINITION", "Shavi (plural mashavi)", "An alien spirit that comes from outside the family or area and is believed to give a person skills such as healing, hunting or dance.");
  b.card("DEFINITION", "Ngozi", "An avenging spirit: the spirit of a person who was wronged, believed to seek justice from the wrongdoer's family.");
  b.card("FACT", "What is witchcraft called in Shona and in Ndebele?", "Uroyi (Shona) and ubuthakathi (Ndebele).");
  b.card("FACT", "What is the ceremony that brings the spirit of the dead home to the family?", "Kurova guva (Shona) or umbuyiso (Ndebele).");
  b.card("FACT", "How are spirits believed to communicate with the living?", "Through dreams, illness or misfortune, possession of a spirit medium, signs in nature, and divination.");
  b.card("CONCEPT", "Why are witchcraft accusations harmful?", "People are blamed without evidence and may be beaten, banished or killed; they divide communities, delay medical care, and are an offence in Zimbabwe.");
  b.card("CONCEPT", "What is a balanced response when someone in the family is ill?", "Take the person to a trained health worker, and respect the family's beliefs, without blaming anyone.");
});
