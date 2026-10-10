// W1a: sacred places, objects, attire and symbols in Indigenous Religion (frs.indigenous.sacred-places-attire).
// Reviewer notes: Great Zimbabwe built "from about the eleventh century" and inscribed as a World Heritage Site in 1986;
// the meaning of the medium's black, white and red cloths is deliberately not examined (it varies between communities).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.indigenous.sacred-places-attire", { file: "indigenous/sacred-places-attire", keyPrefix: "indigenous.sacred-places-attire" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **taboo** (zviera) in Indigenous Religion?",
    options: [
      ["A rule that forbids actions believed to offend God or the spirits", "Correct: taboos protect people, places and relationships."],
      ["A ceremony held to ask the ancestors and God for rain", "That is a rain-making ceremony, mukwerera."],
      ["A set of cloths worn by a spirit medium during possession", "That is attire, not a rule."],
      ["A drum played to call people to a gathering of the village", "That is a sacred or ceremonial object, not a taboo."],
    ],
    answer: "A",
    explanation: "A **taboo** (zviera) forbids actions believed to offend God or the spirits or to cause harm, such as cutting trees in a sacred grove.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which hills are the Mwari shrines of Njelele and Matonjeni found?",
    options: [
      ["The Matopo (Matobo) Hills in the south-west", "Correct: these hills are the home of the Mwari shrines."],
      ["The Chimanimani Mountains on the eastern border", "Those mountains are on the eastern border and are not the home of these shrines."],
      ["The Nyanga Highlands of Manicaland", "The Mwari shrines are not in the Nyanga highlands."],
      ["The Hwange Escarpment near the national park", "The Mwari shrines are not at Hwange."],
    ],
    answer: "A",
    explanation: "Njelele and Matonjeni are in the **Matopo Hills** in the south-west of Zimbabwe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are sacred groves in Indigenous Religion often left untouched?",
    options: [
      ["They are believed to be homes of spirits and burial places", "Correct: they are set apart as holy, and taboos protect them."],
      ["They are owned by the government, which has banned the use of all forests", "The reason is religious and customary, not a ban on all forests."],
      ["They contain no trees or plants that are useful to the community", "Trees in groves can be valuable; they are left because they are sacred."],
      ["They are used only as rubbish dumps by the people who live nearby", "That would not be respectful and is not the reason."],
    ],
    answer: "A",
    explanation: "Groves are protected because they are linked with ancestors and spirits. The taboos also **conserve** forests and wildlife.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **totem** (mutupo, isibongo)?",
    options: [
      ["An animal or other emblem that is a sacred symbol of a clan", "Correct: it is respected and often protected."],
      ["A cave where the chief of a district is buried", "A burial cave is a sacred place, not a totem."],
      ["A cloth worn only by a person who hosts a spirit", "That describes a medium's attire."],
      ["A rule telling a visitor how to behave in a sacred grove", "That is a taboo or custom, not a totem."],
    ],
    answer: "A",
    explanation: "A **totem** is the sacred emblem of a clan, usually an animal such as the lion (shumba), zebra (mbizi) or elephant (nzou). It gives identity and teaches respect for living things.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Learners visiting a sacred pool are told by the guide not to wash clothes in it or take fish from it. Which statement best explains the rule?",
    options: [
      ["A taboo that shows respect and also protects the water", "Correct: the rule is religious and also conserves the pool."],
      ["It is a law that applies only to visitors from other countries", "The rule is a custom of the community, not a rule for foreigners."],
      ["It is a rule meant to keep the pool for the use of one rich family", "The rule is meant to protect a sacred place for the community."],
      ["It is a ceremony that must be repeated every week of the year", "It is a rule, not a ceremony."],
    ],
    answer: "A",
    hints: ["What does the rule protect, religiously and practically?"],
    explanation: "Taboos on sacred pools express respect for the spirits and also **protect water and fish**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is Great Zimbabwe described as important to many people?",
    options: [
      ["A national symbol and World Heritage Site, and for many a sacred place", "Correct: it combines national, historical and religious significance."],
      ["It is the only sacred site in Zimbabwe and no other place is respected", "Many other places are sacred, such as the Matopo shrines."],
      ["It was built by missionaries in the twentieth century as a church", "It is far older, and was not built as a church."],
      ["It is a modern town that was founded after independence in 1980", "It is an ancient stone city."],
    ],
    answer: "A",
    hints: ["Think of the Zimbabwe Bird and UNESCO."],
    explanation: "Great Zimbabwe is a stone city built from about the eleventh century. It is a national symbol, a UNESCO World Heritage Site (1986) and, for many, a sacred place.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains how taboos on sacred places can help the environment?",
    options: [
      ["They limit cutting, hunting and pollution, so nature is kept safe", "Correct: religious rules have a conservation effect."],
      ["They allow anyone to cut trees freely so that the grove is cleared for fields", "Taboos forbid this."],
      ["They are made by scientists and therefore have no religious meaning", "Taboos are religious and customary rules."],
      ["They have no effect on the environment because they only concern ceremonies", "They affect what people do in and around the place."],
    ],
    answer: "A",
    hints: ["What do the rules stop people from doing?"],
    explanation: "Protecting groves and pools for religious reasons also protects the **forests, water and wildlife** in them.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which approach is **best** for a student writing about a medium's attire?",
    options: [
      ["Describe the cloths as marking a sacred role; meanings of colours vary", "Correct: it is accurate and does not overstate."],
      ["State one fixed meaning for each colour that is true for every community", "Meanings vary, so a fixed meaning could be wrong."],
      ["Describe the clothing as a costume that is worn for entertainment", "That misrepresents its sacred purpose."],
      ["Leave out attire because it is not part of religion", "Attire is part of how religious roles are marked."],
    ],
    answer: "A",
    hints: ["Which answer is respectful and careful about what is known?"],
    explanation: "A careful answer describes the attire as marking a sacred role and avoids claiming a single meaning for each colour.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mountains, caves, pools and groves can be sacred places in Indigenous Religion.",
    answer: true,
    explanation: "True. Such places are linked with God, the ancestors or the spirits and are protected by customs and taboos.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Taboos on sacred places have no effect on forests, water or wildlife.",
    answer: false,
    explanation: "False. Rules against cutting trees, fishing or polluting a sacred place also conserve forests, water and wildlife.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each object with its use at a ceremony.",
    pairs: [
      ["Clay beer pot", "Holds traditional beer offered to the ancestors"],
      ["Mbira", "Instrument played at a bira, believed to help call the ancestors"],
      ["Snuff", "Shared and offered to the ancestors as a sign of respect"],
      ["Hosho (rattles)", "Gives rhythm for singing and dancing"],
    ],
    explanation: "The pot holds the offered beer, the mbira is played at the bira, snuff is shared with respect, and hosho keep the rhythm.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Great Zimbabwe was inscribed as a UNESCO World Heritage Site in {{blank:a}}, and the Shona word for a totem is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1986"], choices: ["1986", "1980", "1890", "2013"] },
      { id: "b", accepted: ["mutupo"], choices: ["mutupo", "zviera", "svikiro", "hakata"] },
    ],
    explanation: "Great Zimbabwe was inscribed in **1986**. A totem is **mutupo** in Shona (isibongo in Ndebele); zviera are taboos.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Shona word for the rules that forbid certain actions because they are believed to offend God or the spirits.",
    accepted: ["zviera", "Zviera"],
    wrong: ["mutupo", "bira"],
    explanation: "**Zviera** are taboos. A totem is a mutupo.",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** sacred places in Indigenous Religion.",
    points: ["Mountains or hills (e.g. the Matopo Hills)", "Caves, pools or rivers", "Any one of: forests and groves, shrines such as Njelele, Great Zimbabwe, graves"],
    modelAnswer: "Mountains such as the Matopo Hills, sacred pools and groves.",
    explanation: "One mark for each sacred place correctly stated.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why sacred objects are important in Indigenous Religion.",
    points: [
      "Identifies: they are used in offerings and prayers (e.g. beer pots and snuff)",
      "Develops: they carry the community's requests and thanks to the ancestors and show respect",
      "Identifies: they mark an occasion or role as sacred (e.g. a mbira, drums or a medium's cloths)",
      "Develops: they set a ceremony apart from ordinary life and tell people what to do",
    ],
    modelAnswer: "Objects such as beer pots and snuff are used in offerings, and they carry the community's requests and thanks to the ancestors. Objects such as the mbira, drums and a medium's cloths mark an occasion or a role as sacred, setting a ceremony apart from ordinary life.",
    hints: ["Think of offerings, and of music and clothing."],
    explanation: "Two marks for each reason: identify and develop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how the taboos that protect sacred places can also benefit the whole community.",
    points: [
      "Taboos protect forests, trees and wildlife from over-use",
      "Taboos protect water sources such as pools and springs from pollution",
      "They bring the community together to share responsibility for the places",
      "They pass on respect for nature and the ancestors to the young",
    ],
    modelAnswer: "Taboos protect forests and wildlife from over-use and keep pools and springs clean, so the whole community benefits from water and natural resources. They also bring people together in shared responsibility for the places and teach the young respect for nature and the ancestors.",
    hints: ["Think of what the rules prevent people from doing."],
    explanation: "One mark for each valid point, up to four.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a description of a school visit written by a fictional learner in Masvingo, 2026",
      "Our class visited a hill with a protected forest. The guide, who was chosen by the local headman, asked us to speak quietly, take nothing from the forest and not to light fires. He explained that the forest shelters the graves of the ancestors of the community and that the spring at the foot of the hill is never polluted. Before we left, an elder showed us the mbira and the beer pots that are used at ceremonies there.") +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which feature of a sacred place is shown by the guide asking the class to take nothing from the forest?",
        options: [
          ["A taboo or custom that protects the place", "Correct: the rule protects the forest and shows respect."],
          ["A ceremony held to ask for rain", "No ceremony is described."],
          ["A totem that is the sacred symbol of a clan", "No totem is mentioned."],
          ["A spirit medium in a state of possession", "No medium is mentioned."],
        ],
        answer: "A",
        explanation: "Rules about what visitors may do are **taboos** or customs that protect a sacred place.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** sacred objects or features mentioned in Source A.",
        points: ["The forest with the graves of ancestors (or the spring)", "The mbira or the beer pots"],
        modelAnswer: "The protected forest with the graves of the ancestors, and the mbira.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the customs described in Source A help both religion and the environment.",
        points: [
          "They show respect for the ancestors whose graves are in the forest, which is a religious purpose",
          "They stop cutting, fires and pollution, so the forest and spring are protected",
          "The community keeps its resources for the future while passing on its beliefs",
        ],
        modelAnswer: "The customs show respect for the ancestors whose graves are in the forest, which is a religious purpose. By forbidding fires, taking from the forest and pollution of the spring, they also protect the forest and water for the community in future.",
      }),
    ],
    hints: ["In (c), say what the rules mean to believers and what they protect."],
    explanation: "A source on a sacred place, its objects and its protective customs.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "Answer the questions on sacred places and symbols.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** sacred places in Indigenous Religion and say why each is respected.",
        points: [
          "Names a place (e.g. the Matopo Hills shrines)",
          "Says why it is respected (e.g. believed to be where Mwari speaks; petitions are sent there)",
          "Names a second place (e.g. a grove or a pool)",
          "Says why it is respected (e.g. home of spirits and resting place of ancestors)",
        ],
        modelAnswer: "The shrines of Njelele and Matonjeni in the Matopo Hills are respected because Mwari is believed to speak there and communities send petitions for rain. A sacred grove is respected because it is believed to be the home of spirits and the resting place of ancestors, so trees are not cut.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Sacred places should be protected by the community and the law.\" Discuss, using examples from Indigenous Religion.",
        points: [
          ["For community protection: taboos and customs taught by elders, backed by respect for the spirits, have conserved groves, pools and shrines for generations", 2],
          ["For legal protection: laws on heritage sites and the environment (e.g. Great Zimbabwe as a World Heritage Site) can protect places from damage and development", 2],
          ["Both together: a custodian community and the law cooperating; challenges include land pressure, tourism and loss of customs in towns", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Both the community and the law have a part to play. Taboos and customs taught by the elders have protected groves, pools and shrines for generations, because people respect the spirits who are believed to live there. This protection comes from the people who value the places most.\n\nHowever, pressures such as the need for land, tourism and the weakening of customs in towns can be too great for custom alone. Laws on heritage and the environment, such as the protection of Great Zimbabwe as a World Heritage Site, can protect places from damage.\n\nI conclude that the best protection comes from the two together: the community as custodian, and the law as a back-up that recognises and supports its role.",
      }),
    ],
    hints: ["In (b), give what the community does, what the law can do, and a conclusion."],
    explanation: "Describe sacred places (a) and discuss their protection (b).",
  });

  b.card("DEFINITION", "Sacred place", "A place set apart as holy because it is linked with God, the ancestors or the spirits, and treated with special respect.");
  b.card("DEFINITION", "Taboo (zviera)", "A rule that forbids certain actions because they are believed to offend God or the spirits or to cause harm.");
  b.card("DEFINITION", "Totem (mutupo, isibongo)", "A sacred emblem of a clan, usually an animal, that gives identity and is protected by rules.");
  b.card("FACT", "Name five sacred places in Indigenous Religion.", "Mountains and hills (e.g. the Matopo Hills), caves, pools and rivers, forests and groves, shrines such as Njelele (also Great Zimbabwe and graves).");
  b.card("FACT", "When was Great Zimbabwe inscribed as a World Heritage Site?", "1986 (UNESCO). It is a stone city built from about the eleventh century and a national symbol.");
  b.card("FACT", "Name five sacred objects used in Indigenous Religion.", "Beer pots, snuff, the mbira, drums and rattles, staffs and ritual axes (also cloths, beads and animal skins).");
  b.card("CONCEPT", "How do taboos on sacred places help the environment?", "They limit cutting, hunting and pollution, so forests, water and wildlife are conserved.");
  b.card("CONCEPT", "What does a medium's attire show?", "That the wearer is acting in a sacred role. The meaning of colours such as black, white and red varies between communities.");
  b.card("CONCEPT", "Why are totems called sacred symbols?", "They are emblems of a clan's identity, respected and protected by rules such as not harming or eating the totem animal.");
});
