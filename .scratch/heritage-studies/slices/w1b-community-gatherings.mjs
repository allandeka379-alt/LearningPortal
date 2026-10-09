// W1b: family, community and indigenous gatherings in shaping identity (her.identity.community-gatherings).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.community-gatherings", { file: "identity/community-gatherings", keyPrefix: "identity.community-gatherings" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **nhimbe** (ilima in Ndebele)?",
    options: [
      ["a work party in which neighbours help one household", "Correct."],
      ["a ceremony to ask for rain", "That is mukwerera/ukucela izulu."],
      ["a communal field whose stored grain feeds the needy in hard times", "That is zunde ramambo/isiphala senkosi."],
      ["a ceremony to bring home the spirit of the dead", "That is kurova guva/umbuyiso."],
    ],
    answer: "A",
    explanation: "At a nhimbe/ilima, neighbours help with a big task such as weeding or harvesting, and the host provides food and drink.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The Ndebele name for the rain-making ceremony (mukwerera in Shona) is …",
    options: [
      ["ukucela izulu", "Correct: it means asking for rain."],
      ["umbuyiso", "Umbuyiso brings home the spirit of a deceased person."],
      ["ilima", "Ilima is a work party."],
      ["isiphala senkosi", "This is the chief's granary."],
    ],
    answer: "A",
    explanation: "Mukwerera (Shona) and ukucela izulu (Ndebele) are ceremonies held before the rains to ask God and the ancestors for rain.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was the main purpose of the **zunde ramambo / isiphala senkosi**?",
    options: [
      ["to store food for orphans, widows, the elderly and drought years", "Correct: it was a community food reserve."],
      ["to pay the neighbours who helped a household at a nhimbe with grain", "Workers at a nhimbe were thanked with food and drink by the host."],
      ["to provide beer for every wedding in the village", "Its grain was a reserve for those in need."],
      ["to feed the chief's own family only", "The chief held it for the community's needy."],
    ],
    answer: "A",
    explanation: "The chief's granary was worked by the community; its grain helped vulnerable people and the community in hard times.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which ceremonial tool is most closely associated with the **bira** ceremony?",
    options: [
      ["the mbira", "Correct: mbira music is central to the bira."],
      ["the plough", "A plough is a farming tool, not a ceremonial one."],
      ["the hoe", "Hoes are used at work parties, not as ceremonial tools at a bira."],
      ["the grinding stone", "Grinding stones prepare grain, not ceremonial music."],
    ],
    answer: "A",
    explanation: "A bira is an all-night ceremony with mbira music, singing and dancing, held to communicate with ancestral spirits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which part of identity is given mainly by the **family**?",
    options: [
      ["a person's totem and clan praises", "Correct: totems are inherited through the family."],
      ["membership of a ward or chiefdom", "This comes from the community a person lives in."],
      ["the sacred places of the area", "Sacred places belong to the community."],
      ["the rules enforced by the headman", "These are community norms."],
    ],
    answer: "A",
    explanation: "The family gives name, totem, genealogy, first language and early values; the community gives belonging, shared customs and events.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does a work party (nhimbe/ilima) strengthen a community **beyond** finishing the task?",
    options: [
      ["It builds ties of reciprocity, as households help each other in turn", "Correct: each household knows it will be helped and must help."],
      ["It allows the host to avoid paying taxes to the council", "Taxes are not related to work parties."],
      ["It keeps young people away from their families for long periods", "Work parties last a day and bring families together."],
      ["It replaces the need for any other community gatherings during the year", "It is one of many gatherings."],
    ],
    hints: ["What happens when it is another household's turn?"],
    answer: "A",
    explanation: "Work parties create a cycle of mutual help, strengthening trust, unity and Unhu.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A year after his grandfather's burial, Mthulisi's family holds a ceremony at which they believe the grandfather's spirit returns home as an ancestor. This ceremony is …",
    options: [
      ["umbuyiso (kurova guva)", "Correct."],
      ["ukucela izulu (mukwerera)", "That ceremony asks for rain."],
      ["ilima (nhimbe)", "That is a work party."],
      ["isiphala senkosi (zunde ramambo)", "That is the chief's granary."],
    ],
    hints: ["Which ceremony takes place some time after a burial?"],
    answer: "A",
    explanation: "Umbuyiso (Ndebele) and kurova guva (Shona) are held some time after burial to bring the spirit home.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which modern gathering does the **most similar** job to the traditional funeral support of the community?",
    options: [
      ["a burial society", "Correct: members contribute so that bereaved families get money and help."],
      ["a football match", "This is entertainment, not support for the bereaved."],
      ["a shopping trip", "This has nothing to do with mourning or support."],
      ["a music concert", "Concerts entertain; they do not support bereaved families."],
    ],
    hints: ["Which group helps families when someone dies?"],
    answer: "A",
    explanation: "Burial societies, common in towns, continue the traditional role of the community in supporting the bereaved.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Drums, mbira and rattles (hosho) are among the ceremonial tools used at indigenous gatherings.",
    answer: true,
    explanation: "True. Clay pots for brewing, ceremonial axes, staffs and cloths are also used.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Indigenous gatherings are only about religion and have no social or economic purpose.",
    answer: false,
    explanation: "False. Work parties and the chief's granary are economic and social; funerals give social support; ceremonies also build unity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each gathering with its main purpose.",
    pairs: [
      ["mukwerera / ukucela izulu", "asking for rain"],
      ["nhimbe / ilima", "neighbours helping one household with a big task"],
      ["zunde ramambo / isiphala senkosi", "a food reserve for the needy"],
      ["kurova guva / umbuyiso", "bringing home the spirit of the deceased"],
    ],
    explanation: "Learn the Shona and Ndebele names together with the purpose of each gathering.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The all-night ceremony with mbira music held to communicate with ancestral spirits is called a {{blank:a}}. In the nineteenth-century Ndebele state, the annual first-fruits ceremony was the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["bira"], choices: ["bira", "nhimbe", "zunde", "roora"] },
      { id: "b", accepted: ["inxwala"], choices: ["inxwala", "ilima", "lobola", "indlalifa"] },
    ],
    explanation: "Bira: all-night ceremony with mbira. Inxwala: the Ndebele first-fruits ceremony at the king's capital.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** indigenous community gatherings or ceremonies.",
    points: ["One of: nhimbe/ilima, zunde ramambo/isiphala senkosi", "A second (e.g. mukwerera/ukucela izulu, bira)", "A third (e.g. funerals, kurova guva/umbuyiso)", "A fourth (e.g. harvest/thanksgiving ceremonies)"],
    modelAnswer: "Nhimbe/ilima; mukwerera/ukucela izulu; bira; kurova guva/umbuyiso.",
    explanation: "One mark for each different gathering.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** ways in which indigenous gatherings help to shape a young person's identity.",
    points: [
      "They hear and learn totem praises and family history",
      "so they know their clan and ancestors",
      "They learn songs, dances and language",
      "so they share in the culture of their community",
      "They are given roles and recognised by others",
      "so they feel they belong to the community",
    ],
    modelAnswer: "At gatherings young people hear totem praises and family histories, so they learn their clan and ancestry. They learn songs, dances and the language of ceremonies, so they share in their community's culture. They are given roles, such as drumming, cooking or helping the elderly, and are recognised by others, so they feel they belong.",
    hints: ["Think of what a young person sees, learns and does at a gathering."],
    explanation: "Two marks per way: the point and its effect on identity.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a town council could encourage the spirit of nhimbe/ilima in a high-density suburb.",
    points: [
      "Suggests a community clean-up or repair day",
      "Explains that residents work together like a work party, building ties",
      "Suggests community gardens or a shared fund to help needy households",
      "Explains that this revives sharing and mutual support, like the zunde",
    ],
    modelAnswer: "The council could organise monthly clean-up or repair days in which residents work together, as at a work party, getting to know and trust one another. It could also set up community gardens whose produce helps needy households, reviving the idea of sharing found in the zunde ramambo.",
    hints: ["Adapt the idea of working together to town life."],
    explanation: "Credit any sensible urban adaptation of communal work with an explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "a description (in words) of a photograph of a fictional village gathering in Hwange District, 2026",
      "The photograph shows people gathered under a large tree. Women stir clay pots over fires. Men beat drums while a group of young people dance. An elderly man holding a carved staff stands in the centre. To one side, a group of children watch closely. A banner reads: \"Thank you for a good harvest\".", { described: true }) +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What kind of gathering is most likely shown?",
        options: [
          ["a harvest thanksgiving celebration", "Correct: the banner gives thanks for a good harvest."],
          ["a funeral", "Nothing in the description shows mourning."],
          ["a rain-making ceremony before planting", "The banner refers to a harvest already gathered."],
          ["a court case before the headman", "The scene is a celebration, not a hearing."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** ceremonial tools in the description.",
        points: ["Drums", "Clay pots or the carved staff"],
        modelAnswer: "Drums; the elder's carved staff.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the children watching benefit from the gathering.",
        points: [
          "They learn songs, dances and customs by observing",
          "so culture is passed to a new generation",
          "and they feel part of the community, building identity and belonging",
        ],
        modelAnswer: "By watching, the children learn the songs, dances and customs of the celebration, so the culture is passed on to a new generation. Being there also makes them feel part of the community, which builds their identity and sense of belonging.",
      }),
    ],
    hints: ["Use the banner to decide what the gathering is."],
    explanation: "A described-photograph practice item (6 marks) on gatherings, tools and identity.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous gatherings today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** indigenous gatherings that provided social security.",
        points: [
          ["Zunde ramambo/isiphala senkosi: community field under the chief, grain stored for orphans, widows, elderly and drought years", 2],
          ["Nhimbe/ilima or funerals: neighbours help a household with heavy work, or support the bereaved with labour, food and comfort", 2],
        ],
        modelAnswer: "The zunde ramambo (isiphala senkosi) was a field worked by the community under the chief; its grain was stored to feed orphans, widows, the elderly and the whole community in drought years. At funerals the community dug the grave, cooked, brought food and comforted the family, so the bereaved were not left alone.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous gatherings have lost their importance in modern Zimbabwe.\" How far do you agree?",
        points: [
          ["For: fewer work parties and ceremonies in towns; wage work, migration and some religious attitudes reduce attendance", 2],
          ["Against: funerals, kurova guva/umbuyiso, weddings and ceremonies remain important in many families and rural areas", 2],
          ["Against: their functions continue in new forms (burial societies, savings clubs, church groups, community projects)", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Some evidence supports the statement. In towns, work parties and rain-making ceremonies are rare, and wage work, migration and some religious attitudes mean fewer people attend traditional gatherings.\n\nHowever, many gatherings remain important. Funerals still bring whole communities together, kurova guva and umbuyiso are still held by many families, and in rural areas ceremonies and work parties continue. The functions of gatherings also continue in new forms: burial societies, savings clubs and church groups provide the mutual support once given by the zunde and the nhimbe.\n\nI disagree to a large extent. Some gatherings have declined, but the idea behind them, communities coming together to support one another and share identity, remains important and has adapted to modern life.",
      }),
    ],
    hints: ["In (b), consider both town and rural life, and new forms of gathering."],
    explanation: "A practice evaluative item on the continuing importance of gatherings.",
  });

  b.card("DEFINITION", "Identity", "The sense of who a person is: name, family, totem, language, culture, community and nation.");
  b.card("FACT", "What is nhimbe (ilima)?", "A work party in which neighbours help one household with a big task; the host provides food and drink.");
  b.card("FACT", "What is zunde ramambo (isiphala senkosi)?", "The chief's granary: a communal field whose grain fed orphans, widows, the elderly and the community in drought.");
  b.card("FACT", "What is mukwerera (ukucela izulu)?", "A ceremony held before the rains to ask God and the ancestors for rain.");
  b.card("FACT", "What is a bira?", "An all-night ceremony with mbira music, singing and dancing to communicate with ancestral spirits.");
  b.card("FACT", "What is kurova guva (umbuyiso)?", "A ceremony held some time after burial at which the spirit of the deceased is believed to be brought home.");
  b.card("FACT", "Name four ceremonial tools.", "Drums, mbira, rattles (hosho), clay pots (also ceremonial axes, staffs, cloths).");
  b.card("CONCEPT", "How does the family shape identity, compared with the community?", "The family gives who you are (name, totem, history, language); the community gives where you belong (shared customs, events, norms).");
  b.card("CONCEPT", "Give three reasons indigenous gatherings matter.", "They build identity and belonging; provide social security; pass on culture (also religious expression, conflict resolution).");
});
