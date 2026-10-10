// W1b: Death, burial and the afterlife in Indigenous Religion.
import { concept, P, source } from "../lib.mjs";

concept("frs.indigenous.rites-death", { file: "indigenous/rites-death", keyPrefix: "indigenous.rites-death" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the Ndebele name for the ceremony of bringing home the spirit of a dead person?",
    options: [
      ["Umbuyiso", "Correct: the Shona name is kurova guva."],
      ["Ukucela izulu", "This is the Ndebele rain-making ceremony, which asks for rain."],
      ["Isibongo", "An isibongo is a clan name or totem, which gives identity."],
      ["Lobola", "Lobola is the Ndebele word for bride wealth, a marriage custom."],
    ],
    answer: "A",
    explanation: "**Umbuyiso** (Ndebele) and **kurova guva** (Shona) are ceremonies of bringing the spirit home.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does Indigenous Religion generally understand death?",
    options: [
      ["As a transition to the spirit world", "Correct: the person is believed to continue among the ancestors."],
      ["As the complete end of a person's relationship with the family, who must then be forgotten", "Families continue to honour and speak to the dead."],
      ["As a punishment from Mwari that must be avoided by never speaking about the dead", "Death is not seen as a punishment in this way, and the dead are remembered."],
      ["As a return to life in the same body after the funeral rites have been finished", "The body is buried; it is the spirit that is believed to continue."],
    ],
    answer: "A",
    explanation: "Death is a transition: the body is buried and the spirit joins the spirit world and, after the correct rites, the ancestors.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Why do mourners wash their hands in water after a burial?",
    options: [
      ["It is a purification that marks their return to ordinary life", "Correct: it ends the contact with death."],
      ["It is a payment that the family must make to the ancestors on the day of the burial", "Washing is a cleansing act, not a payment."],
      ["It is a test to find out whether any person at the funeral has caused the death", "Washing is not a test, and accusations of witchcraft are harmful and unlawful."],
      ["It is a way of asking the spirit medium to speak to the family at the graveside", "Washing is not linked to calling a medium."],
    ],
    answer: "A",
    explanation: "Purification by washing shows that the mourners are leaving the world of death and returning to everyday life.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main purpose of the kurova guva / umbuyiso ceremony?",
    options: [
      ["To bring the spirit home so that it can become an ancestor", "Correct: the spirit joins the family's ancestors, who protect the family."],
      ["To announce to the community that a person has died and to start the funeral arrangements", "The announcement comes at the start, a year before kurova guva."],
      ["To choose a new chief for the village after the death of the old chief in the family", "Kurova guva does not choose chiefs; it concerns the spirit of the dead person."],
      ["To mark the end of a girl's initiation and to welcome her as an adult into the village", "Initiation is a different rite of passage."],
    ],
    answer: "A",
    explanation: "The ceremony completes the passage of the dead person from the funeral to the world of the ancestors.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda's grandfather died last year. The family now brews beer, slaughters a beast and gathers at the grave to speak to his spirit. Which ceremony is the family holding?",
    options: [
      ["Kurova guva", "Correct: the bringing-home ceremony, held about a year after the death."],
      ["Mukwerera", "Mukwerera is a rain-making ceremony; nothing in the scenario mentions rain."],
      ["Roora", "Roora is bride wealth; no marriage is mentioned."],
      ["Bira for a healer's training", "A bira may be held for the ancestors, but the grave and the death a year before point to kurova guva."],
    ],
    answer: "A",
    explanation: "The family is bringing the spirit of the dead person home about a year after the death.",
    hints: ["Look at the time since the death and the visit to the grave."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement best explains why elders insist that kurova guva / umbuyiso is performed?",
    options: [
      ["Without it, the spirit is believed to be restless and the family may suffer misfortune", "Correct: the ceremony settles the spirit among the ancestors."],
      ["It is required by law before any family may bury a relative in its home area", "The law does not require this ceremony; it is a religious practice."],
      ["It gives the village headman the right to take over the property of the dead person", "The ceremony is not a way of taking property."],
      ["It allows the family to change the name of the village where the person was buried", "Village names are not changed by this ceremony."],
    ],
    answer: "A",
    explanation: "Families who hold this belief see the ceremony as completing the passage of the spirit, so that it can protect rather than trouble the family.",
    hints: ["Think about what is believed to happen to a spirit that has not been brought home."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement about inheritance after a death is most accurate in Zimbabwe today?",
    options: [
      ["The law protects the rights of a widow and children, so property grabbing is unlawful", "Correct: a surviving spouse and children are entitled to a share of the estate."],
      ["Customs alone decide all inheritance and the law has no part in what a widow receives", "The Constitution and statutes protect widows and children."],
      ["Only the eldest brother of the dead man may receive any of his property after the funeral", "This was the pattern in some families in the past, not what the law now requires."],
      ["A widow who does not agree to marry a relative of her husband loses all her rights", "A widow cannot be forced to marry, and she does not lose her rights."],
    ],
    answer: "A",
    explanation: "Section 80 of the Constitution protects the rights of women, and surviving spouses and children are legally entitled to share in an estate. Property grabbing is harmful and unlawful.",
    hints: ["Think about the rights of women and children in the Constitution."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Indigenous Religion, relatives and neighbours support the bereaved family during a funeral.",
    answer: true,
    explanation: "True. Relatives take on duties, neighbours bring food and firewood, and the community shares the grief.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Indigenous Religion the ancestors are worshipped as the supreme being.",
    answer: false,
    explanation: "False. The ancestors are honoured and asked for help, but the supreme being is God (Mwari, Musikavanhu, uMlimo or uNkulunkulu).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of a funeral with its meaning.",
    pairs: [["Preparing the body", "a last act of respect by relatives"], ["The wake", "the family is supported and the dead are honoured"], ["Washing hands after burial", "purification and return to ordinary life"], ["Kurova guva", "the spirit is brought home to become an ancestor"]],
    explanation: "Each stage has a meaning: respect, support, purification and the final passage of the spirit.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word.",
    template: "Mbiti used the phrase \"{{blank:a}}\" for ancestors who remain part of the family.",
    blanks: [{ id: "a", accepted: ["living dead"], choices: ["living dead", "restless spirits", "wandering ghosts", "forgotten elders"] }],
    explanation: "John Mbiti's phrase \"living dead\" describes ancestors who remain in the memory and life of the family.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Shona name for the bringing-home ceremony is {{blank:a}}, held about {{blank:b}} after death.",
    blanks: [
      { id: "a", accepted: ["kurova guva"], choices: ["kurova guva", "mukwerera", "roora", "chisi"] },
      { id: "b", accepted: ["a year"], choices: ["a day", "a week", "a year", "ten years"] },
    ],
    explanation: "Kurova guva is held about a year (or more) after the death.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which Ndebele word means the spirits of the family's ancestors?",
    accepted: ["amadlozi", "idlozi"],
    wrong: ["midzimu"],
    explanation: "The Ndebele word is **amadlozi** (singular idlozi); the Shona word is midzimu.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Outline **three** stages of an Indigenous Religion funeral.",
    points: ["Preparing the body (washing and dressing it)", "The wake or gathering of mourners with singing and speeches", "Burial, followed by purification (washing hands) and mourning"],
    modelAnswer: "The body is washed and dressed by relatives; mourners hold a wake with singing and speeches; the body is buried, mourners wash their hands, and the family begins a period of mourning.",
    explanation: "One mark for each stage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the kurova guva (umbuyiso) ceremony.",
    points: [["It is held about a year (or more) after the death", 1], ["Relatives gather; beer is brewed and an animal is slaughtered", 1], ["The family speaks to the spirit at the grave and invites it home", 1], ["The spirit becomes an ancestor who protects the family", 1]],
    modelAnswer: "About a year after the death the family gathers, brews beer and slaughters an animal. They go to the grave and speak to the spirit, inviting it to come home. The spirit then becomes an ancestor who guides and protects the family.",
    hints: ["Say when it is held, what is prepared, what happens at the grave and what it achieves."],
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain why funerals and the bringing-home ceremony are important to the family in Indigenous Religion.",
    points: [
      ["They show respect for the dead person", 1],
      ["Developed: the washing of the body and the speeches honour the person's life", 1],
      ["They show that the community supports the bereaved", 1],
      ["Developed: relatives and neighbours bring food and help with the grave, so grief is shared", 1],
      ["Kurova guva completes the passage of the spirit to become an ancestor", 1],
      ["Developed: the family believes that a spirit brought home protects it, while a neglected spirit may bring misfortune", 1],
    ],
    modelAnswer: "Funerals show respect for the dead person, for example by washing the body and speaking about the person's life. They also show community support, because relatives and neighbours bring food and help with the grave, so grief is shared. Finally, kurova guva completes the passage of the spirit to become an ancestor. The family believes that a spirit brought home protects the family, while a neglected spirit may bring misfortune.",
    hints: ["Give three reasons: respect, support, and the ancestors."],
    explanation: "Three developed reasons.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional newspaper feature on funerals, 2026",
      "In many Zimbabwean families the funeral is only the first step. A year after the death of her mother in Mutare, Chipo returned to the family's rural home in Chipinge for the ceremony of bringing the spirit home. Relatives brewed beer, and an uncle spoke to the spirit at the grave. 'We are not saying goodbye,' she said. 'We are making her part of the family's ancestors.'"
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which Shona term describes the ceremony in Source A?",
        options: [
          ["Kurova guva", "Correct: the bringing-home ceremony held about a year after death."],
          ["Mukwerera", "A rain-making ceremony, which is not mentioned in the source."],
          ["Roora", "Bride wealth, which is not mentioned in the source."],
          ["Mutupo", "A totem, which is not the name of a ceremony."],
        ],
        answer: "A", explanation: "The source describes kurova guva.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Identify **three** things the relatives do in Source A.",
        points: ["Return to the rural home for the ceremony", "Brew beer", "Speak to the spirit at the grave"],
        modelAnswer: "They gather at the rural home, brew beer, and an uncle speaks to the spirit at the grave.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain what Chipo means by \"We are making her part of the family's ancestors\".",
        points: [["The ceremony is not an ending; the spirit is brought home", 1], ["Developed: the family believes the spirit of the dead person remains close to the living", 1], ["The spirit becomes an ancestor", 1], ["Developed: ancestors guide and protect the family and can be asked for help", 1]],
        modelAnswer: "Chipo means that the ceremony is not a final goodbye. The family believes the spirit remains close to the living, and by bringing it home the spirit becomes an ancestor who guides and protects the family and whom the family can ask for help.",
      }),
    ],
    hints: ["In (c) explain what happens to the spirit and what the ancestors do for the family."],
    explanation: "The source shows kurova guva and the belief that the spirit becomes an ancestor.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai lives in Harare and works long hours. His family expects him to return to the rural home for a funeral and, a year later, for the bringing-home ceremony. He says the cost and time are too great. His grandmother says the customs must be kept.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** reasons why relatives are expected to attend a funeral.",
        points: [["To show respect for the dead person", 2], ["To support the bereaved family with grief, food and work", 2]],
        modelAnswer: "To show respect for the dead person, whose life is honoured by the family; and to support the bereaved, by helping with the grave and bringing food, so that grief is shared.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** changes that have affected funeral customs.",
        points: [["Urbanisation: people die in towns but are buried at rural homes, so families travel long distances and spend more", 2], ["Other religions: Christian and Muslim families add services and prayers, and some combine them with IR customs", 2]],
        modelAnswer: "Urbanisation has changed funerals because many people live and die in towns but are buried at rural homes, so families must travel and spend more. Christianity and Islam have also changed customs, because families add services and prayers, and some combine them with ancestral customs.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "To what extent should families keep the traditional funeral and bringing-home customs unchanged?",
        points: [["For keeping: respect, family unity, belief that the spirit must be brought home", 2], ["For adapting: cost, time, and other religions in the family", 2], ["A supported judgement, such as keeping the meaning while changing the practice", 2]],
        levels: [[4, 5, 6, "Considers both views with developed reasons and a supported judgement."], [3, 3, 4, "Both views, with limited development or an unsupported judgement."], [2, 2, 2, "One view developed or both only listed."], [1, 1, 1, "One or two undeveloped points."], [0, 0, 0, "Nothing creditworthy."]],
        modelAnswer: "The customs bring the family together, show respect for the dead and, for believers, make sure the spirit becomes a protecting ancestor, so there is a strong case for keeping them. However, the cost and travel are heavy for urban families, and relatives of other religions may have other practices. A sensible view is that families keep the meaning of the customs, respect and unity, while adapting the form so that they are affordable and respectful to everyone.",
      }),
    ],
    hints: ["Give reasons for Farai's grandmother and for Farai before giving your own judgement."],
    explanation: "A balanced answer weighs the meaning of the customs against cost and change.",
  });

  b.card("DEFINITION", "What is **kurova guva** (Shona) or **umbuyiso** (Ndebele)?", "The ceremony of bringing home the spirit of a dead person, held about a year after death, so that it can become an ancestor.");
  b.card("CONCEPT", "How does IR understand death?", "As a transition to the spirit world; the person remains part of the family as an ancestor.");
  b.card("DEFINITION", "What does \"living dead\" mean?", "John Mbiti's phrase for ancestors who remain part of the family's life.");
  b.card("FACT", "Why do mourners wash their hands after a burial?", "Purification: it marks the return to ordinary life.");
  b.card("FACT", "Who prepares the body in a traditional funeral?", "Close relatives, usually of the same sex as the dead person.");
  b.card("CONCEPT", "Why is kurova guva important to the family?", "It completes the spirit's passage; a spirit brought home protects the family, while a neglected one is feared to bring misfortune.");
  b.card("FACT", "What does the Constitution (section 80) protect that applies to inheritance?", "The rights of women, including widows; property grabbing is unlawful.");
  b.card("CONCEPT", "How have funerals changed in recent years?", "Urban life, Christianity and Islam, burial societies and costs have changed customs; many families combine traditions.");
});
