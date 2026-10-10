// W3b: Indigenous Religion and environmental conservation (Topic 11.2).
// Reviewer note: CAMPFIRE is cited in outline only (Communal Areas Management Programme for Indigenous Resources, 1980s).
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.environment.ir-conservation", { file: "environment/ir-conservation", keyPrefix: "environment.ir-conservation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a sacred place in Indigenous Religion?",
    options: [
      ["A place believed to belong to the spirits, with special rules", "Correct: for example a grove, mountain, cave or pool."],
      ["A building where children are taught to read and to write", "That would be a school."],
      ["A field that belongs to the chief for growing his own crops", "A chief's field is not a sacred place."],
      ["A market where villagers sell their produce on certain days", "A market is an ordinary place."],
    ],
    answer: "A",
    explanation: "A **sacred place** is believed to belong to God or the spirits, and special rules apply there.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is chisi?",
    options: [
      ["A rest day on which no work is done in the fields", "Correct: it gives the land and people a rest."],
      ["A ceremony for asking God and the ancestors for rain", "That is mukwerera/ukucela izulu."],
      ["A rule forbidding the killing of a clan's animal", "That is linked to the totem."],
      ["A spirit medium who speaks for a territorial spirit", "That is a svikiro."],
    ],
    answer: "A",
    explanation: "**Chisi** is a day of rest from fieldwork.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a totem help to protect animals?",
    options: [
      ["A clan does not kill or eat its totem animal", "Correct: many clans protect different species."],
      ["A clan must hunt its totem animal each year in turn", "The custom forbids killing the totem."],
      ["A clan sells its totem animal at the village market", "Totem animals are not sold."],
      ["A clan trains its totem animal to guard the cattle kraal", "Totems are not used in this way."],
    ],
    answer: "A",
    explanation: "A clan **does not kill or eat** its totem, so species are protected.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are sacred forests on hilltops useful for conservation?",
    options: [
      ["They protect trees and water catchments", "Correct: they keep springs and soil protected."],
      ["They provide timber for building to anyone who asks", "They are protected from cutting."],
      ["They are used as places for large markets and fairs", "Markets are not held in sacred forests."],
      ["They allow farmers to plough the slopes each season", "Ploughing would destroy them."],
    ],
    answer: "A",
    explanation: "Sacred forests **protect trees and water catchments**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who enforces the rules that protect sacred places and natural resources in IR?",
    options: [
      ["Chiefs, elders and spirit mediums", "Correct: they hold authority and speak for the spirits."],
      ["Foreign companies that run commercial farms", "They are not part of IR authority."],
      ["The pupils of the nearest secondary school", "Pupils do not enforce these rules."],
      ["The members of a national football association", "They have no role."],
    ],
    answer: "A",
    explanation: "**Chiefs, elders and spirit mediums** enforce the rules.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A village near Gwanda is told that no one may cut trees near the spring, and that offenders pay a goat to the chief. What does this show about IR conservation?",
    options: [
      ["Rules are backed by belief and the chief's authority", "Correct: both enforce the rule."],
      ["Rules are made and enforced only by the national police", "The enforcers are traditional leaders."],
      ["Rules are written in the law courts of the district", "The example describes customary rules."],
      ["Rules are chosen by each person according to their taste", "The community sets the rules."],
    ],
    answer: "A",
    hints: ["Who sets the fine?"],
    explanation: "The rule is backed by **belief and the chief's authority**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which is a reason why IR conservation methods have declined?",
    options: [
      ["Changing beliefs and weaker authority of chiefs", "Correct: fewer people follow the taboos."],
      ["An increase in respect for every taboo in every village", "Respect has generally weakened."],
      ["The ending of all farming and grazing in rural areas", "Farming and grazing continue."],
      ["A fall in the number of people needing fuelwood and land", "Population pressure has risen."],
    ],
    answer: "A",
    hints: ["Think of what has changed in belief and leadership."],
    explanation: "Changing beliefs and weaker authority are **major reasons** for the decline.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which judgement about IR conservation methods is best supported by the evidence?",
    options: [
      ["They work well locally but are not enough alone today", "Correct: strengths and limits are both recognised."],
      ["They are useless because they come from belief and not science", "They have produced real protection."],
      ["They are enough to solve every modern environmental problem", "They did not anticipate modern problems."],
      ["They have never protected any forest, pool or species", "Examples show they have."],
    ],
    answer: "A",
    hints: ["Weigh the strengths against the weaknesses."],
    explanation: "A balanced judgement says they are **valuable locally but limited**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In IR, fishing in a sacred pool may be forbidden.",
    answer: true,
    explanation: "True. This protects fish and water quality.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "IR conservation methods are always effective because every community still obeys the taboos.",
    answer: false,
    explanation: "False. Belief and authority have weakened, and many pressures now make the methods less effective.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with its environmental benefit.",
    pairs: [
      ["Sacred forest", "Protects trees and water catchments"],
      ["Sacred pool", "Protects fish and clean water"],
      ["Totem", "Protects an animal species"],
      ["Chisi", "Gives the soil and people a rest"],
    ],
    explanation: "Each method protects a different resource.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Rules forbidding certain actions are called {{blank:a}} in Shona, and a day of rest from fieldwork is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["zviera"], choices: ["zviera", "chisi", "mutupo", "bira"] },
      { id: "b", accepted: ["chisi"], choices: ["zviera", "chisi", "mutupo", "bira"] },
    ],
    hints: ["Mutupo is a totem and bira is a ceremony."],
    explanation: "Taboos are **zviera**; the rest day is **chisi**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Shona word for a totem?",
    accepted: ["mutupo"],
    wrong: ["chisi", "bira"],
    explanation: "A totem is **mutupo** (isibongo in Ndebele).",
  });
  b.manualShort({
    d: 1, skill: "RECALL", marks: 3,
    stem: "State **three** methods used in Indigenous Religion to conserve the environment.",
    points: ["Sacred forests, mountains or pools", "Taboos on cutting trees, hunting or fishing", "Totems, chisi, or the authority of chiefs and mediums"],
    modelAnswer: "Sacred forests, mountains or pools; taboos on cutting trees, hunting or fishing; and totems, chisi and the authority of chiefs and mediums.",
    explanation: "One mark for each method.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how taboos help to conserve the environment.",
    points: [
      ["Taboos forbid certain actions such as cutting particular trees or fishing in sacred pools", 1],
      ["Developed: this protects trees, fish and water from over-use", 1],
      ["People obey because they believe breaking a taboo angers the spirits and harms the community", 1],
      ["Developed: belief and fear of punishment enforce the rule without police", 1],
    ],
    modelAnswer: "Taboos forbid certain actions such as cutting particular trees or fishing in sacred pools, which protects trees, fish and water from over-use. People obey because they believe breaking a taboo angers the spirits and harms the community, so belief and the fear of punishment enforce the rule without police.",
    hints: ["Say what the taboo forbids and why people obey."],
    explanation: "Two points, each stated and developed.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why traditional conservation methods have become less effective.",
    points: [
      ["Beliefs have changed through Christianity, Islam, schooling and urban life", 1],
      ["Developed: fewer people respect taboos, and chiefs and mediums have less authority to enforce them", 2],
      ["Population growth and poverty increase the need for land and fuelwood", 1],
      ["Developed: families cut trees and clear land to survive, even where the rules forbid it", 2],
    ],
    modelAnswer: "Beliefs have changed through Christianity, Islam, schooling and urban life. Fewer people respect taboos, and chiefs and mediums have less authority to enforce them. Population growth and poverty also increase the need for land and fuelwood, so families cut trees and clear land to survive even where the rules forbid it.",
    hints: ["Think of belief and authority, and of population and poverty."],
    explanation: "Two reasons, each stated and developed.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional community report in Mutare District, 2026",
      "The elders of our ward say that the hill forest and the pool below it belong to the ancestors. For many years no one cut trees there or fished in the pool. Recently some young men have started to cut wood and set nets, saying that the old rules no longer apply. The chief has called a meeting with the headmaster, the pastor and a ward councillor, and elders have asked a scientist from the district office to explain how the forest protects the spring."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which method of IR conservation is shown by the rule about the hill forest and pool?",
        options: [
          ["Sacred places", "Correct: the forest and pool belong to the ancestors."],
          ["A rain-making ceremony", "No rain ceremony is described."],
          ["Totem avoidance rule", "No totem is mentioned."],
          ["A chisi rest day", "No rest day is mentioned."],
        ],
        answer: "A", explanation: "The hill forest and pool are protected as sacred places.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** pressures on the traditional rules.",
        points: ["Young men cut wood in the forest", "Young men set nets in the pool", "They say the old rules no longer apply (weakening belief)"],
        modelAnswer: "Young men cut wood in the forest, set nets in the pool, and say that the old rules no longer apply, which shows weakening belief.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how the chief's meeting could help to protect the forest and pool.",
        points: [["It brings together traditional, school, church and local government leaders", 1], ["The scientist can show that the forest protects the spring, giving a practical reason as well as a religious one", 1], ["Agreement among leaders and the community can renew respect for the rules", 1]],
        modelAnswer: "The meeting brings together traditional, school, church and local government leaders. The scientist can show that the forest protects the spring, giving a practical reason as well as a religious one. Agreement among leaders and the community can renew respect for the rules.",
      }),
    ],
    hints: ["In (c) think of leaders, evidence and agreement."],
    explanation: "The source shows traditional conservation under pressure and a combined response.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Nyasha says: \"Traditional conservation is the best way to protect the environment.\" Farai says: \"It cannot deal with modern problems on its own.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which chiefs or spirit mediums help to conserve the environment.",
        points: [["Chiefs allocate land and punish offenders, for example with a fine", 1], ["Chiefs and elders teach the rules about sacred places and taboos", 1], ["Mediums pass on the wishes of the spirits about sacred places and rainmaking", 1], ["Mediums and chiefs lead ceremonies that renew respect for the land", 1]],
        modelAnswer: "Chiefs allocate land and punish offenders, for example with a fine. Spirit mediums pass on the wishes of the spirits about sacred places and rain-making.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** way in which modern conservation can work with traditional leaders.",
        points: [["Programmes such as CAMPFIRE involve rural communities and their leaders in managing wildlife", 2], ["Scientists can work with chiefs and elders to protect sacred forests and springs, giving both religious and practical reasons", 2]],
        modelAnswer: "Scientists and community officers can work with chiefs and elders to protect sacred forests and springs. The scientist shows how the forest protects the water, and the chief uses his authority to ask the people to follow the rules, so both reasons support the protection.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the effectiveness of indigenous methods of conserving the environment.",
        points: [["Strengths: community-based, low cost, respected, linked to daily life, protected forests, pools and species", 2], ["Strengths: authority of chiefs and mediums, shared responsibility", 2], ["Weaknesses: declining belief and authority, population pressure, outsiders, new problems such as pollution and mining", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Indigenous methods are community-based and low cost, and they have protected forests, pools and species because people respected them and the chiefs and mediums enforced them. However, belief and authority have declined, population pressure has increased, outsiders do not follow the rules, and modern problems such as pollution and mining were not foreseen. I conclude that the methods are effective where they are still respected, but need to work together with modern knowledge and law.",
      }),
    ],
    hints: ["Give strengths and weaknesses, then a conclusion that weighs them."],
    explanation: "A strong answer weighs strengths and weaknesses with examples and reaches a judgement.",
  });

  b.card("DEFINITION", "What is **conservation**?", "Protecting and using natural resources carefully so they remain for future generations.");
  b.card("DEFINITION", "What is a **sacred place**?", "A place believed to belong to God or the spirits where special rules apply, such as a grove, mountain or pool.");
  b.card("DEFINITION", "What are **zviera** (taboos)?", "Rules forbidding actions believed to bring harm or the anger of the spirits.");
  b.card("DEFINITION", "What is **chisi**?", "A rest day on which no work is done in the fields.");
  b.card("FACT", "What is the Shona word for a totem, and the Ndebele word?", "Mutupo (Shona); isibongo (Ndebele).");
  b.card("FACT", "Name six IR methods of conserving the environment.", "Sacred places, taboos, totems, chisi, authority of chiefs and mediums, and rain-making ceremonies.");
  b.card("FACT", "What does CAMPFIRE stand for?", "Communal Areas Management Programme for Indigenous Resources (outline only).");
  b.card("CONCEPT", "Give two strengths of IR conservation.", "It is community-based and low cost, and it is respected as part of daily life and belief.");
  b.card("CONCEPT", "Give two reasons why it has declined.", "Changing beliefs and weaker authority of chiefs and mediums; population pressure and outside users.");
});
