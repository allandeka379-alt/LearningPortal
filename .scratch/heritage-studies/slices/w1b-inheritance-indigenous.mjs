// W1b: inheritance and heirship in indigenous families (her.culture.inheritance-indigenous).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.culture.inheritance-indigenous", { file: "culture/inheritance-indigenous", keyPrefix: "culture.inheritance-indigenous" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is an example of **intangible** inheritance?",
    options: [
      ["the family totem", "Correct: a totem is identity, not an object you can touch."],
      ["a herd of cattle", "Cattle can be seen and touched: tangible inheritance."],
      ["a set of farming tools", "Tools are objects: tangible inheritance."],
      ["a granary of stored maize", "Stored grain is tangible."],
    ],
    answer: "A",
    explanation: "Intangible inheritance includes the name, totem, language, norms, values, family history and traditional offices.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In indigenous practice, the person chosen to succeed the deceased and take on his duties is called the …",
    options: [
      ["heir", "Correct: the heir (mugari wenhaka / indlalifa) takes over the name, position and duties."],
      ["executor", "An executor administers an estate under modern law, usually named in a will."],
      ["spirit medium", "A spirit medium is believed to be possessed by a spirit; this is not about inheritance."],
      ["headman", "A headman is a traditional leader of several villages, not the family's successor."],
    ],
    answer: "A",
    explanation: "The heir succeeds to the deceased's name, position and responsibilities, and often holds the property for the family.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In indigenous practice, who usually chose the heir?",
    options: [
      ["the extended family, with paternal aunts and uncles playing key roles", "Correct: the decision was collective."],
      ["the widow alone, without consulting any of the late husband's relatives", "The widow was involved in some families but did not decide alone."],
      ["the village head, without the family", "Family matters such as heirship were decided by the family."],
      ["a magistrate at the local court", "Courts deal with estates under modern law, not indigenous heirship."],
    ],
    answer: "A",
    explanation: "Heirship was decided by the extended family, which helped reduce conflict and protect the household.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which was a **duty** of the heir in indigenous society?",
    options: [
      ["Caring for the deceased's widow and children", "Correct: the heir was responsible for the household's welfare."],
      ["Selling the family's land to pay debts", "Land was not sold; families held use rights."],
      ["Keeping all of the cattle and goats for his own private use", "The heir held livestock for the household, not for himself."],
      ["Choosing the next village head", "That is a matter for the ruling family and traditional authorities."],
    ],
    answer: "A",
    explanation: "Heirship was a responsibility: the heir fed and educated the children, cared for the widow and kept the family together.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "The Shona term for the sharing of a deceased person's estate is …",
    options: [
      ["kugova nhaka", "Correct."],
      ["kurova guva", "Kurova guva is the ceremony bringing home the spirit, at which sharing often took place, but the sharing itself is kugova nhaka."],
      ["kuzvarira", "Kuzvarira is the pledging of a girl in marriage, a harmful and illegal practice."],
      ["nhimbe", "Nhimbe is a work party."],
    ],
    answer: "A",
    explanation: "Kugova nhaka is the sharing of the estate, often at the kurova guva (umbuyiso) ceremony some months after burial.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which was the **main weakness** of indigenous inheritance practices for women?",
    options: [
      ["Widows and daughters were often left out of the sharing of property", "Correct: male relatives usually inherited, leaving women dependent."],
      ["Women were required to choose the heir on their own", "The extended family chose the heir."],
      ["Women had to pay the debts of the dead man personally", "This was not a general rule."],
      ["Women were forbidden from attending the funeral or the burial ceremony", "Women attended and played major roles in funerals."],
    ],
    hints: ["Think about who usually received property."],
    answer: "A",
    explanation: "Because heirs were usually male, widows and daughters often had no secure property of their own, a weakness later addressed by the law.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "After her grandfather's death, Thandeka is taught his knowledge of herbs and family history. What has she received?",
    options: [
      ["intangible inheritance", "Correct: knowledge and history are intangible."],
      ["tangible inheritance", "Tangible inheritance can be touched, such as livestock or tools."],
      ["heirship of the family", "Heirship is succession to name and duties; she has received knowledge."],
      ["a share of the estate", "An estate share is property; knowledge is intangible."],
    ],
    hints: ["Can knowledge be touched?"],
    answer: "A",
    explanation: "Knowledge, skills, history, language and values passed on are intangible inheritance.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why indigenous heirship gave security to children?",
    options: [
      ["A named relative had a duty to feed, educate and protect them", "Correct: duties were attached to the heir's position."],
      ["Children inherited all property directly and managed it themselves", "Young children did not manage property; the heir held it for them."],
      ["The chief paid every orphan's school fees", "Chiefs helped the needy through communal granaries but did not pay all fees."],
      ["Children were sent to work for wages after the funeral", "This was not the custom."],
    ],
    hints: ["Security comes from someone being responsible."],
    answer: "A",
    explanation: "Heirship attached responsibility to a person, so orphans had someone obliged to care for them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Tangible inheritance can be seen and touched, for example livestock and tools.",
    answer: true,
    explanation: "True. Intangible inheritance (name, totem, values) cannot be touched.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In indigenous society, the heir usually sold the family's land to divide the money among relatives.",
    answer: false,
    explanation: "False. Land was not private property to be sold; families held use rights allocated through traditional leaders, and the heir took over those rights.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its type of inheritance or its meaning.",
    pairs: [
      ["cattle", "tangible inheritance"],
      ["chieftainship", "a traditional office passed on within a ruling family"],
      ["mugari wenhaka / indlalifa", "the heir"],
      ["kugova nhaka", "sharing of the estate"],
    ],
    explanation: "Cattle are tangible; a chieftainship is an intangible office; mugari wenhaka (Shona) and indlalifa (Ndebele) mean heir; kugova nhaka is the sharing of the estate.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Among many Shona families the estate was shared at the {{blank:a}} ceremony, known in Ndebele as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["kurova guva"], choices: ["kurova guva", "mukwerera", "nhimbe", "bira"] },
      { id: "b", accepted: ["umbuyiso"], choices: ["umbuyiso", "ilima", "lobola", "inxwala"] },
    ],
    explanation: "Kurova guva (Shona) and umbuyiso (Ndebele) bring home the spirit of the deceased; the estate was often shared then.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Ndebele word for an heir.",
    accepted: ["indlalifa"],
    wrong: ["umbuyiso"],
    explanation: "**Indlalifa** is the Ndebele word for heir; the Shona term is mugari wenhaka.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between tangible and intangible inheritance, giving an example of each.",
    points: [
      "Tangible inheritance can be seen and touched",
      "Example: livestock, tools, land-use rights, household goods",
      "Intangible inheritance cannot be touched",
      "Example: name, totem, language, values, traditional office",
    ],
    modelAnswer: "Tangible inheritance is property that can be seen and touched, such as cattle. Intangible inheritance cannot be touched, such as the family totem or the deceased's name.",
    explanation: "One mark for each meaning and one for each example.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe **three** duties of an heir in indigenous society.",
    points: [
      "Caring for the widow(s)",
      "e.g. providing food and shelter so she is not left destitute",
      "Caring for the children",
      "e.g. paying school fees, helping with marriage costs",
      "Keeping the family together",
      "e.g. settling disputes and representing the family at gatherings and ceremonies",
    ],
    modelAnswer: "The heir cared for the widow, providing food and shelter so she was not left destitute. He was responsible for the children, paying their school fees and helping with marriage arrangements. He also kept the family together, settling disputes and representing the family at gatherings and ceremonies.",
    hints: ["Think about the widow, the children and the family as a whole."],
    explanation: "Two marks per duty: the duty and a description of what it involved.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "An heir in a fictional family near Masvingo has taken the late man's cattle for himself and refuses to pay the children's school fees. Suggest **two** ways the family could deal with the problem.",
    points: [
      "Suggests calling a meeting of the extended family / elders, or the aunt and uncles",
      "Explains that elders can remind the heir of his duties and agree a fair arrangement",
      "Suggests taking the matter to a traditional court or the formal courts / Master of the High Court",
      "Explains that these can order fair distribution and protect the widow and children's rights",
    ],
    modelAnswer: "The family could call a meeting of the extended family and elders, who can remind the heir that the cattle are held for the household and agree on how the fees will be paid. If that fails, the widow could take the matter to the traditional court or the formal courts, including the Master of the High Court, which can order a fair distribution and protect the children's rights.",
    hints: ["Start inside the family, then think of outside bodies."],
    explanation: "Credit sensible steps inside the family and through traditional or formal institutions.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "an account by a fictional villager in Mberengwa District, 2026",
      "When my father died, my uncle became heir. He kept the cattle together and sent all six of us to school. My mother says he never sold one beast without asking her. But my cousin's family was not so lucky: their heir sold the cattle, moved to town and left the widow with nothing.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which word best describes how the speaker's uncle carried out his heirship?",
        options: [
          ["responsibly", "Correct: he kept the cattle, paid for schooling and consulted the widow."],
          ["selfishly", "This describes the cousin's heir, not the uncle."],
          ["carelessly", "Nothing in the account suggests carelessness."],
          ["dishonestly", "He consulted the widow before selling anything."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **one** strength and **one** weakness of indigenous heirship shown in the source.",
        points: [
          "Strength: the heir cared for the widow and children (kept cattle together, paid for schooling)",
          "Weakness: it depended on the heir's honesty; a dishonest heir could sell property and abandon the widow",
        ],
        modelAnswer: "Strength: the uncle cared for the family and paid for schooling. Weakness: the system depended on the heir's honesty, so the cousin's heir could sell the cattle and leave the widow with nothing.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the cousin's family suffered.",
        points: [
          "Property was controlled by the heir, not the widow",
          "so when he sold the cattle she had no legal or customary hold on them",
          "and the family lost its main source of wealth and support",
        ],
        modelAnswer: "The cattle were controlled by the heir rather than the widow, so when he sold them she could not stop him. The family lost its main source of wealth and support, leaving the widow and children with nothing.",
      }),
    ],
    hints: ["Compare the two heirs in the source."],
    explanation: "A source-based practice item (6 marks) on the strengths and weaknesses of indigenous heirship.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous inheritance.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe how an heir was chosen and the estate shared in indigenous families.",
        points: [
          ["Choice: usually a male relative (eldest son, or brother of the deceased if sons were young), chosen by the extended family", 2],
          ["Sharing: kugova nhaka, often at kurova guva/umbuyiso; personal items to children and relatives, livestock held by the heir for the household", 2],
        ],
        modelAnswer: "The heir was usually a male relative, often the eldest son or, if the sons were young, a brother of the deceased, and he was chosen by the extended family. The estate was shared (kugova nhaka), often at the kurova guva or umbuyiso ceremony: personal items went to children and relatives, while livestock was held by the heir for the household.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous inheritance practices protected the whole family.\" How far do you agree?",
        points: [
          ["For: the heir had duties to the widow and children; property stayed in the family", 2],
          ["For: collective decisions and continuity of name, totem and values", 2],
          ["Against: widows and daughters often excluded from property; dishonest heirs; forced widow inheritance", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Indigenous practices did much to protect the family. The heir had a duty to care for the widow and children, and property was kept within the family to support them. Decisions were made by the extended family, and the name, totem and values were passed on, giving continuity.\n\nHowever, protection was not equal. Widows and daughters were often left out of the sharing of property, so their security depended on male relatives. A dishonest heir could take property for himself, and forced widow inheritance did not respect a widow's choice.\n\nI agree only partly. The system aimed to protect the whole family and often did, but in practice it protected women and children only when the heir was honest, which is why the law has since given surviving spouses and children direct rights.",
      }),
    ],
    hints: ["In (b), ask who was protected and who was left out."],
    explanation: "A practice evaluative item on the strengths and weaknesses of indigenous inheritance.",
  });

  b.card("DEFINITION", "Inheritance", "Whatever passes to the living at a person's death: property, rights, duties, a name, a position, knowledge.");
  b.card("DEFINITION", "Heir", "The person chosen to succeed the deceased, taking over name, position and duties (Shona mugari wenhaka; Ndebele indlalifa).");
  b.card("DEFINITION", "Tangible inheritance", "Inheritance that can be seen and touched, e.g. cattle, tools, land-use rights.");
  b.card("DEFINITION", "Intangible inheritance", "Inheritance that cannot be touched, e.g. name, totem, language, values, a traditional office.");
  b.card("FACT", "What is kugova nhaka?", "The sharing of a deceased person's estate (Shona), often at kurova guva.");
  b.card("FACT", "Name three duties of an indigenous heir.", "Caring for the widow; caring for and educating the children; keeping the family together and representing it.");
  b.card("CONCEPT", "Why was land not sold by an heir in indigenous society?", "Land was not private property; families held use rights allocated through traditional leaders.");
  b.card("CONCEPT", "Give two weaknesses of indigenous inheritance.", "Widows and daughters were often excluded from property; the system depended on the heir's honesty (also disputes, forced widow inheritance).");
  b.card("CONCEPT", "Give two strengths of indigenous inheritance.", "Someone had a duty to care for widows and children; property and identity stayed within the family.");
});
