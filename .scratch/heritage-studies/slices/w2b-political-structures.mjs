// W2b: indigenous political structures and chieftainship (her.precolonial.political-structures).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.precolonial.political-structures", { file: "precolonial/political-structures", keyPrefix: "precolonial.political-structures" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the Shona hierarchy of traditional leaders, what is a **sabhuku**?",
    options: [
      ["A village head", "Correct: the sabhuku leads a village, the lowest level of the hierarchy."],
      ["A paramount chief", "A paramount ruler or king (mambo) stands at the top, far above the sabhuku."],
      ["A spirit medium", "A spirit medium is a svikiro, not a sabhuku."],
      ["A headman", "The headman of a ward is the sadunhu."],
    ],
    answer: "A",
    explanation: "Mambo (king) → ishe (chief) → sadunhu (headman) → sabhuku (village head).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which chapter of the Constitution of Zimbabwe (2013) deals with **traditional leaders**?",
    options: [
      ["Chapter 15", "Correct: Chapter 15 recognises chiefs, headmen and village heads."],
      ["Chapter 4", "Chapter 4 is the Declaration of Rights."],
      ["Chapter 8", "Chapter 8 deals with the Judiciary."],
      ["Chapter 12", "Chapter 12 deals with the independent commissions."],
    ],
    answer: "A",
    explanation: "Chapter 15 covers traditional leaders; Chapter 14 covers provincial and local government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main purpose of **Zunde raMambo**?",
    options: [
      ["To feed orphans, widows and others in need from the chief's granary", "Correct: the chief's field and granary supported the vulnerable."],
      ["To collect taxes for the colonial government in each village", "Zunde raMambo is an indigenous welfare system, not a colonial tax."],
      ["To train young men as soldiers for the king's regiments", "Military training was done through regiments, not the zunde."],
      ["To choose the next chief when the old chief died", "Succession was decided by the ruling family and confirmed by mediums."],
    ],
    answer: "A",
    explanation: "Community members worked the chief's field; the grain was stored to help the needy in hard times.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In many Shona chiefdoms, how was a new chief usually chosen?",
    options: [
      ["By the ruling family, often rotating between its houses", "Correct: houses of the founding ancestor's family took turns."],
      ["By a secret ballot of all the adults living in the chiefdom", "Chiefs were not chosen by a vote of all adults."],
      ["By the Portuguese traders who visited the area", "Outsiders did not choose chiefs in the pre-colonial period."],
      ["By the oldest man in any village of the chiefdom", "Age alone did not decide; it had to be the right family and house."],
    ],
    answer: "A",
    explanation: "Chieftainship was hereditary within the ruling family; the choice was often confirmed by a spirit medium.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Who was consulted in many communities to confirm that the **ancestors** accepted a new chief?",
    options: [
      ["A spirit medium (svikiro)", "Correct: the medium of the founding ancestor confirmed the choice."],
      ["The district magistrate", "Magistrates belong to the courts, and did not exist before colonial rule."],
      ["The leader of a trading caravan", "Traders had no role in confirming chiefs."],
      ["The village head of a neighbouring chiefdom", "A village head is below a chief and from another area."],
    ],
    answer: "A",
    explanation: "Spirit mediums gave the choice religious approval, strengthening the chief's authority.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two families in a communal area quarrel over a small debt of two chickens. Following custom, **who should hear the case first**?",
    options: [
      ["The village head", "Correct: small disputes start at the lowest level."],
      ["The Constitutional Court", "The Constitutional Court hears constitutional matters, not small debts."],
      ["The National Council of Chiefs", "This body represents chiefs nationally; it does not hear village debts."],
      ["The paramount chief of the province", "Cases start low and only go higher if not settled."],
    ],
    answer: "A",
    hints: ["Where does a case start on the ladder?"],
    explanation: "Small disputes go to the sabhuku first, then the headman, then the chief's court if unresolved.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why did chiefs in pre-colonial societies have **religious** as well as political authority?",
    options: [
      ["They were linked to the ancestors and led ceremonies such as rain-asking", "Correct: the chief stood between the people and the ancestral spirits."],
      ["They had been trained as Christian priests at a mission school in the area", "Mission schools came with colonisation, long after chieftainship developed."],
      ["They were elected by the spirit mediums alone", "Mediums confirmed the family's choice; they did not elect alone."],
      ["They owned all the cattle in the chiefdom", "Owning cattle gave wealth, not religious authority."],
    ],
    answer: "A",
    hints: ["Think about installation and the ceremonies a chief leads."],
    explanation: "Chiefs descended from the founding ancestor, were confirmed through mediums and led ceremonies such as mukwerera / ukucela izulu.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement **best** explains why the Constitution requires traditional leaders to be non-partisan?",
    options: [
      ["So that they can serve all people in their area fairly", "Correct: a chief leads everyone, whatever their political views."],
      ["So that chiefs can never take part in any development work", "The Constitution expects chiefs to help development."],
      ["So that chiefs may replace elected councillors", "Councillors and chiefs have different roles; neither replaces the other."],
      ["So that customary law no longer applies in rural areas", "Customary law still applies; chiefs resolve disputes under it."],
    ],
    answer: "A",
    hints: ["Who lives in a chief's area?"],
    explanation: "Traditional leaders serve whole communities; acting for one party would undermine trust and fairness.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under custom, a chief owns the communal land in his area and may sell it.",
    answer: false,
    explanation: "False. Chiefs hold and allocate communal land on behalf of the community; they may not sell it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the Ndebele state, the king appointed izinduna, many of them chosen for ability and loyalty.",
    answer: true,
    explanation: "True. Izinduna led regiments and districts on behalf of the king.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each traditional leader with the area he leads.",
    pairs: [
      ["Mambo / inkosi (king)", "A whole state"],
      ["Ishe (chief)", "A chiefdom"],
      ["Sadunhu (headman)", "A ward within a chiefdom"],
      ["Sabhuku (village head)", "A village"],
    ],
    explanation: "The hierarchy runs from the whole state down to the village.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The special objects and dress that show a leader's office are called {{blank:a}}. Rules passed down by tradition and applied by chiefs are called {{blank:b}} law.",
    blanks: [
      { id: "a", accepted: ["regalia"], choices: ["regalia", "tribute", "totems", "taboos"] },
      { id: "b", accepted: ["customary"], choices: ["customary", "criminal", "colonial", "constitutional"] },
    ],
    explanation: "Regalia are the symbols of office; customary law is applied by traditional leaders.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona name for the chief's field and granary whose grain was used to help the needy?",
    accepted: ["Zunde raMambo", "zunde ramambo", "zunde ra mambo", "zunde"],
    wrong: ["nhimbe", "dare"],
    explanation: "**Zunde raMambo**: the chief's field and granary for the vulnerable.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** roles of a chief in a pre-colonial society.",
    points: ["One role, e.g. allocating land", "A second, e.g. settling disputes", "A third, e.g. leading rain or harvest ceremonies / organising defence / caring for the needy"],
    modelAnswer: "Allocating land, settling disputes and leading rain-asking ceremonies.",
    explanation: "One mark per role.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a chief was installed in many Shona communities.",
    points: [
      "The ruling family / elders chose the heir, often in rotation between houses",
      "A spirit medium confirmed that the ancestors accepted him",
      "A public ceremony was held where he received regalia",
      "Elders instructed him on how to rule / the people showed acceptance / ancestors informed",
    ],
    modelAnswer: "The elders of the ruling family chose the heir, often from the house whose turn it was. A spirit medium confirmed that the ancestors accepted him. At a public ceremony he received the regalia of office, and the elders reminded him how to rule while the people showed their acceptance.",
    hints: ["Follow the steps in order: choice, confirmation, ceremony."],
    explanation: "One mark per stage described.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which traditional leaders could help with a community development project such as building a clinic.",
    points: [
      "Suggests e.g. calling meetings to mobilise people for labour and materials",
      "Explains: people respect the chief, so many will take part",
      "Suggests e.g. allocating land for the clinic / working with the council and government",
      "Explains: communal land is administered through traditional leaders, so the site can be agreed fairly",
    ],
    modelAnswer: "The chief could call meetings to mobilise people to bring bricks, sand and labour; because people respect him, many will take part. He could also help to allocate a suitable site and work with the rural district council, since communal land is administered with traditional leaders and the project needs an agreed site.",
    hints: ["Think about people, land and links with government."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a report in a fictional community newsletter in Matabeleland North, 2026",
      "At the inkundla last Thursday, the village head heard a complaint that cattle had damaged a neighbour's garden. The owner agreed to replace the vegetables. The village head also announced that the chief's field will be weeded on Saturday so that grain can be stored for families in need, and that the rain-asking ceremony will be held before the planting season."),
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "What is the Shona name for the chief's field mentioned in Source A?",
        accepted: ["Zunde raMambo", "zunde ramambo", "zunde ra mambo", "zunde"],
        wrong: ["dare"],
        explanation: "The chief's field and granary is Zunde raMambo.",
      }),
      P.mcq({
        label: "(b)", stem: "Which role of traditional leaders is shown by the complaint about the cattle?",
        options: [
          ["Settling disputes", "Correct: the village head heard and settled the complaint."],
          ["Allocating land", "No land was allocated."],
          ["Organising defence", "Nothing concerns defence."],
          ["Choosing an heir", "No succession is discussed."],
        ],
        answer: "A",
        explanation: "Hearing the complaint and agreeing compensation is dispute settlement.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain **three** ways in which Source A shows that traditional leadership is still significant in rural communities.",
        points: [
          "Dispute settled quickly at village level",
          "Developed: cheap, close to home, keeps good relations between neighbours",
          "Zunde raMambo",
          "Developed: provides grain for vulnerable families, a form of welfare",
          "Rain-asking ceremony",
          "Developed: preserves culture and links the community with the ancestors",
        ],
        modelAnswer: "The village head settled the dispute about the cattle quickly at the inkundla, which is cheap, close to home and keeps neighbours on good terms. The chief's field (Zunde raMambo) will provide grain for families in need, so traditional leadership still supports the vulnerable. The rain-asking ceremony shows that leaders keep culture alive and link the community with the ancestors.",
      }),
    ],
    hints: ["Find three different activities in the source."],
    explanation: "Applying knowledge of the roles of traditional leaders to a source.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on chieftainship.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline the hierarchy of indigenous leaders, from the highest to the lowest.",
        points: ["King / paramount ruler (mambo / inkosi)", "Chief (ishe)", "Headman (sadunhu)", "Village head (sabhuku)"],
        modelAnswer: "King or paramount ruler (mambo / inkosi), then chief (ishe), then headman (sadunhu), then village head (sabhuku).",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Chieftainship has lost its importance in Zimbabwe today.\" Discuss.",
        points: [
          ["For: courts, councils and government departments now do much of what chiefs did; many people live in towns outside chiefs' areas", 2],
          ["Against: chiefs still administer communal land and resolve disputes under customary law in rural areas", 2],
          ["Against: recognised in Chapter 15; preserve culture and ceremonies; help development; Zunde raMambo", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some people argue that chieftainship has lost importance. Courts, rural district councils and government departments now provide justice, services and development that chiefs once provided, and many Zimbabweans live in towns where chiefs have no role.\n\nHowever, chiefs remain important in communal areas, where many people live. They help administer communal land and resolve disputes under customary law, often more quickly and cheaply than the formal courts. Chapter 15 of the Constitution recognises traditional leaders, and chiefs meet in the National Council of Chiefs. They lead ceremonies, protect sacred places and help mobilise people for development; some revive Zunde raMambo to help the needy.\n\nOverall, chieftainship has lost some of its old powers, especially in towns, but it is still important in rural life and in preserving culture, so the statement is only partly true.",
      }),
    ],
    hints: ["In (b), consider towns and rural areas separately."],
    explanation: "Outline (a) and evaluate (b) chieftainship today.",
  });

  b.card("DEFINITION", "Chieftainship", "The office and authority of a chief, usually inherited within a ruling family, to lead an area according to custom.");
  b.card("DEFINITION", "Regalia", "Objects and dress that show a leader's office, e.g. a staff, a skin, a hat or an official sash.");
  b.card("DEFINITION", "Customary law", "Rules passed down by tradition and applied by traditional leaders, e.g. in family, land and inheritance matters.");
  b.card("FACT", "Shona hierarchy of traditional leaders, top to bottom?", "Mambo (king) → ishe (chief) → sadunhu (headman) → sabhuku (village head).");
  b.card("FACT", "Which chapter of the 2013 Constitution covers traditional leaders?", "Chapter 15.");
  b.card("DEFINITION", "Zunde raMambo", "The chief's field and granary, worked by the community, whose grain helps the needy.");
  b.card("CONCEPT", "Why were spirit mediums consulted when choosing a chief?", "To confirm the ancestors accepted the heir, giving him religious as well as political authority.");
  b.card("CONCEPT", "Why do disputes start with the village head?", "Justice is close to home, quick and cheap, and the village head knows the families; only unresolved cases go higher.");
  b.card("CONCEPT", "Why must traditional leaders be non-partisan?", "They serve everyone in their area, whatever their political views; partisanship would destroy trust.");
});
