// W1b: indigenous herbs and their uses (her.identity.herbs).
// Safety rule: traditional uses only, never cures; always "see a trained health worker". Reviewer note: zumbani =
// umsuzwane (Lippia javanica, "fever tea"); gavakava = aloe (Shona). Ndorani and isihaqa (named in the syllabus) are
// not identified here because local names vary.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.herbs", { file: "identity/herbs", keyPrefix: "identity.herbs" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Knowledge developed by local communities over generations and passed on mainly by word of mouth is called …",
    options: [
      ["indigenous knowledge", "Correct."],
      ["foreign knowledge", "Foreign knowledge comes from outside the community."],
      ["scientific research", "Research uses formal methods and publications; it may study indigenous knowledge."],
      ["intangible property", "This is not the term for community knowledge of the environment."],
    ],
    answer: "A",
    explanation: "Indigenous knowledge grows from experience of the local environment and is passed on through families, practice and apprenticeship.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "For what has the gel of the **aloe** leaf traditionally been used?",
    options: [
      ["applying to minor burns and dry skin", "Correct: this is its best-known traditional use."],
      ["curing malaria when swallowed", "No herb cures malaria; malaria needs testing and treatment at a clinic."],
      ["making the staple porridge thicker", "Aloe is not a food thickener."],
      ["dyeing cloth and baskets used at ceremonies", "This is not a recorded use of aloe gel."],
    ],
    answer: "A",
    explanation: "Aloe gel is traditionally applied to minor burns, cuts and dry skin. Some aloe species are poisonous if swallowed.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which herb is known in Shona as **zumbani** and in Ndebele as **umsuzwane**?",
    options: [
      ["fever tea", "Correct: its leaves are brewed as a tea for cold and flu symptoms."],
      ["aloe", "Aloe is gavakava in Shona."],
      ["blackjack", "Blackjack is a different plant, eaten as a vegetable relish."],
      ["moringa", "Moringa is a tree whose leaves are eaten for nutrition."],
    ],
    answer: "A",
    explanation: "Zumbani/umsuzwane, also called fever tea, is brewed as a tea; its scent is also used to repel insects.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about herbs and health is correct?",
    options: [
      ["Herbs may ease minor complaints, but illness needs a trained health worker", "Correct: this is the safe, accurate message."],
      ["Herbs are always safe because they are natural", "Some plants are poisonous and doses are uncertain."],
      ["Herbs can cure HIV if taken every day", "No herb cures HIV; antiretroviral treatment from a clinic is needed."],
      ["A person taking herbs should never mention them to a nurse or a doctor at a clinic", "Herbs can interact with medicines, so health workers should be told."],
    ],
    answer: "A",
    explanation: "Herbs are traditional remedies, not proven cures. Anyone who is ill should see a trained health worker and mention any herbs they take.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is stripping the bark or digging up the roots of a medicinal plant a serious threat?",
    options: [
      ["The whole plant may die, so the species can disappear from the area", "Correct: taking roots or all the bark kills the plant."],
      ["Bark and roots have no traditional uses at all", "Bark and roots are used, which is why they are over-harvested."],
      ["It makes the plant grow back faster and stronger than other trees nearby", "Damage weakens the plant; it does not speed growth."],
      ["It is the only way to conserve the plant", "Careful harvesting of leaves or part of the plant is the conservation method."],
    ],
    hints: ["What happens to a tree whose bark is removed all the way round?"],
    answer: "A",
    explanation: "Over-harvesting roots and bark kills plants; careful harvesting, nurseries and community rules help conserve them.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda has had a high fever for three days. His aunt suggests only drinking fever tea. What is the **best** advice?",
    options: [
      ["Go to a clinic to be tested and treated by a health worker", "Correct: a high fever for days may be malaria or another serious illness."],
      ["Drink more fever tea until the fever goes away", "Delaying treatment can be dangerous."],
      ["Try a different herb from a neighbour's garden that worked for her children", "Unknown herbs can be harmful, and the cause needs to be found."],
      ["Wait a week before doing anything", "Waiting can allow a serious illness to worsen."],
    ],
    hints: ["What could a high fever lasting several days be?"],
    answer: "A",
    explanation: "A persistent high fever needs testing and treatment. Herbs must not delay a visit to a trained health worker.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which measure would **best** conserve both herbal plants **and** the knowledge about them?",
    options: [
      ["A community herbal garden where elders teach young people to recognise plants", "Correct: it protects plants and passes on knowledge."],
      ["Selling all wild herbs quickly to traders in town", "This would increase over-harvesting."],
      ["Clearing the bush around the village to make room for new fields and homesteads", "Clearing destroys plant habitats."],
      ["Banning young people from learning about herbs", "This would speed up the loss of knowledge."],
    ],
    hints: ["The question asks about plants and knowledge together."],
    answer: "A",
    explanation: "Herbal gardens conserve plants, and teaching by elders preserves the knowledge that is otherwise lost when elders die.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Indigenous knowledge of herbs is often unwritten, so it can be lost when elders die without passing it on.",
    answer: true,
    explanation: "True. This is why recording and teaching the knowledge matters.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Because herbs are natural, it is safe to take any amount of them.",
    answer: false,
    explanation: "False. Some plants are poisonous, doses are uncertain and herbs can interact with medicines.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each herb with a traditional use.",
    pairs: [
      ["aloe", "gel applied to minor burns and dry skin"],
      ["blackjack", "young leaves eaten as a vegetable relish"],
      ["ginger", "root used in cooking and hot drinks"],
      ["moringa", "leaves eaten as a nutritious vegetable"],
    ],
    explanation: "These are traditional uses in food and minor care, not cures for disease.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The body that regulates medicines in Zimbabwe, including herbal products sold as medicines, is the {{blank:a}}. Protecting plants so they remain for future generations is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Medicines Control Authority of Zimbabwe"], choices: ["Medicines Control Authority of Zimbabwe", "Environmental Management Agency", "Grain Marketing Board", "Registrar General"] },
      { id: "b", accepted: ["conservation"], choices: ["conservation", "commercialisation", "urbanisation", "inheritance"] },
    ],
    explanation: "MCAZ regulates medicines; conservation protects resources for the future.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona name for aloe.",
    accepted: ["gavakava"],
    wrong: ["zumbani"],
    explanation: "**Gavakava** is aloe in Shona. Zumbani is fever tea.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which indigenous knowledge of herbs is passed on.",
    points: ["Within families, from grandparents and parents", "Apprenticeship to traditional healers", "Practice/observation, or names, stories and songs, or herbal gardens and records"],
    modelAnswer: "From grandparents and parents in the family; through apprenticeship to traditional healers; by children helping to gather and prepare plants.",
    explanation: "One mark per way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain **three** reasons why indigenous knowledge of herbs is valuable.",
    points: [
      "Heritage and identity",
      "it is part of who a community is and links generations",
      "Nutrition",
      "wild vegetables and herbs add vitamins and minerals to the diet",
      "Research or income",
      "scientists study plants that may lead to new medicines / safe herbal products create jobs",
    ],
    modelAnswer: "It is part of a community's heritage and identity, linking young people to their elders and their land. It supports nutrition, because wild vegetables such as blackjack and moringa add vitamins and minerals to the diet. It can also support research and income: scientists study traditional plants that may lead to new medicines, and safely made herbal products such as aloe creams create jobs.",
    hints: ["Think of identity, food and the economy."],
    explanation: "Two marks per reason. Do not credit claims that herbs cure diseases.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways a rural community could conserve medicinal plants that are being over-harvested.",
    points: [
      "Suggests a harvesting rule, e.g. take only leaves or bark from one side, agreed with traditional leaders",
      "Explains that the plant survives and can regrow",
      "Suggests a nursery or herbal garden, possibly with forestry officers",
      "Explains that new plants replace those harvested and reduce pressure on wild plants",
    ],
    modelAnswer: "The community and its traditional leaders could agree a rule that only leaves, or bark from one side of a tree, may be taken, so plants survive and regrow. It could also start a nursery or herbal garden with advice from forestry officers, so new plants replace those harvested and wild plants are under less pressure.",
    hints: ["One idea about how plants are harvested, one about growing more."],
    explanation: "Credit sensible conservation methods with explanations.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: source("Source A", "an advertisement in a fictional market flyer from Harare, 2026",
      "MIRACLE ROOT POWDER! Made from rare wild roots dug fresh from the mountains. Cures diabetes, high blood pressure and all infections in 7 days. No need for clinics or pills. Take three big spoons a day. Only US\\$10 a packet.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which claim in Source A is **most clearly** false and dangerous?",
        options: [
          ["that it cures diabetes and removes the need for clinics", "Correct: no herb cures diabetes; stopping treatment is dangerous."],
          ["that the price is US\\$10 a packet", "A price may be high, but it is not a health danger."],
          ["that the powder is made from wild roots dug in the mountains", "Roots are commonly used in traditional preparations."],
          ["that it is sold at a market", "Selling at a market is not in itself a false claim."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** risks to health from following Source A.",
        points: ["Stopping clinic treatment / medicines for serious illness", "Uncertain or high dose (three big spoons) may cause poisoning or harm"],
        modelAnswer: "People may stop their clinic medicines; the large, uncertain dose may poison them.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the product also threatens the environment.",
        points: [
          "Roots are dug up from the wild",
          "which kills the plants",
          "and as the plants are described as rare, over-harvesting could make them disappear",
        ],
        modelAnswer: "The powder is made from wild roots, and digging up roots kills the plants. Because the advert says the plants are rare, collecting them for sale could make them disappear from the mountains altogether.",
      }),
    ],
    hints: ["In (c), think about what happens when roots are dug up."],
    explanation: "A source-based practice item (6 marks) on false health claims and over-harvesting.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about indigenous herbs today.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** threats to indigenous herbs in Zimbabwe.",
        points: [
          ["Over-harvesting of roots and bark, often for sale, killing plants", 2],
          ["Deforestation, veld fires or loss of knowledge, so plants and the knowledge of them disappear", 2],
        ],
        modelAnswer: "Over-harvesting is a threat: when roots and bark are dug or stripped for sale, the plants die. Deforestation for farming and firewood, and veld fires, destroy the places where herbs grow, and when elders die without passing on their knowledge, people no longer recognise or value the plants.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Indigenous knowledge of herbs still has an important place in modern Zimbabwe.\" Discuss.",
        points: [
          ["For: heritage and identity; nutrition from wild vegetables", 2],
          ["For: research into plants and income from safe, regulated products", 2],
          ["Against/limits: herbs are not proven cures; risks of poisoning, wrong doses and delayed treatment; false commercial claims", 2],
          ["Supported judgement, e.g. valuable as heritage and food knowledge when used alongside, not instead of, trained health care", 2],
        ],
        levels: levels(8),
        modelAnswer: "Indigenous knowledge of herbs still matters. It is part of Zimbabwe's heritage and identity, and wild vegetables such as blackjack add nutrition to many diets. Scientists study traditional plants, and safely made, regulated products such as aloe creams provide income.\n\nHowever, there are important limits. Herbs are not proven cures, some plants are poisonous, doses are uncertain, and people who rely on herbs may delay treatment for serious illnesses. Some traders make false claims to sell products.\n\nOverall, indigenous knowledge of herbs does have an important place, as heritage, as food knowledge and as a subject for research, provided it is used alongside, not instead of, care from trained health workers.",
      }),
    ],
    hints: ["In (b), separate heritage value from medical claims."],
    explanation: "A practice evaluative item on the place of herbal knowledge today, keeping to safe health messages.",
  });

  b.card("DEFINITION", "Indigenous knowledge", "Knowledge developed by local communities over generations, passed on mainly by word of mouth and practice.");
  b.card("DEFINITION", "Herb", "A plant whose leaves, roots, bark, flowers or seeds are used for food, flavouring or traditional health practices.");
  b.card("FACT", "Name five herbs studied in Heritage Studies.", "Aloe, blackjack, ginger, zumbani/umsuzwane (fever tea), moringa (the syllabus also lists ndorani and isihaqa).");
  b.card("FACT", "What is aloe gel traditionally used for?", "Applying to minor burns, cuts and dry skin (do not swallow the sap).");
  b.card("CONCEPT", "Do herbs cure diseases such as HIV or diabetes?", "No. Herbs are traditional remedies, not proven cures; anyone who is ill should see a trained health worker.");
  b.card("FACT", "Which body regulates medicines in Zimbabwe?", "The Medicines Control Authority of Zimbabwe (MCAZ).");
  b.card("CONCEPT", "Why must medicinal plants be conserved?", "Over-harvesting, deforestation and fires threaten them; once gone, the plants and the knowledge linked to them are lost.");
  b.card("FACT", "Name three ways of conserving herbs.", "Harvest only leaves or part of a plant; plant herbal gardens and nurseries; community rules against over-harvesting (also record knowledge).");
  b.card("CONCEPT", "Why can herbs be dangerous?", "Some plants are poisonous, doses are uncertain, they can interact with medicines, and relying on them can delay treatment.");
});
