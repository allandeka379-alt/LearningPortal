// W3b: World Heritage Sites in Zimbabwe (her.heritage.world-heritage-sites).
// Years of listing from the BRIEF reference list; World Heritage Convention adopted by UNESCO in 1972.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.heritage.world-heritage-sites", { file: "heritage/world-heritage-sites", keyPrefix: "heritage.world-heritage-sites" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organisation keeps the World Heritage List?",
    options: [
      ["UNESCO", "Correct: the UN Educational, Scientific and Cultural Organization keeps the list."],
      ["SADC", "SADC is a regional economic community, not the keeper of the list."],
      ["the African Union", "The AU does not keep the World Heritage List."],
      ["COMESA", "COMESA is a regional trade bloc."],
    ],
    answer: "A",
    explanation: "UNESCO keeps the World Heritage List under the World Heritage Convention of 1972.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of Zimbabwe's World Heritage Sites is shared with Zambia?",
    options: [
      ["Mosi-oa-Tunya / Victoria Falls", "Correct: the Falls lie on the border with Zambia."],
      ["Mana Pools National Park", "Mana Pools lies on the Zimbabwean side of the Zambezi only."],
      ["Khami Ruins", "Khami is near Bulawayo, far from the border."],
      ["the Matobo Hills", "The Matobo Hills are south of Bulawayo."],
    ],
    answer: "A",
    explanation: "Mosi-oa-Tunya / Victoria Falls (listed 1989) is a single site shared by Zimbabwe and Zambia.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "In which year was the Matobo Hills listed as a World Heritage Site?",
    options: [
      ["2003", "Correct: the Matobo Hills was listed in 2003."],
      ["1986", "1986 is the year Great Zimbabwe and Khami were listed."],
      ["1989", "1989 is the year Victoria Falls was listed."],
      ["1984", "1984 is the year Mana Pools was listed."],
    ],
    answer: "A",
    explanation: "Mana Pools 1984; Great Zimbabwe and Khami 1986; Victoria Falls 1989; Matobo Hills 2003.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why was the Matobo Hills listed as a **cultural** rather than a natural site?",
    options: [
      ["Because of its rock art and the shrines communities still use", "Correct: the long relationship between people and the hills was the reason."],
      ["Because it has more wild animals than any other park in Zimbabwe", "That would be a natural reason, and it is not true."],
      ["Because the Pioneer Column first entered the country through the hills", "This is not why it was listed."],
      ["Because it contains the largest stone walls in southern Africa", "That describes Great Zimbabwe."],
    ],
    answer: "A",
    explanation: "Matobo was listed for its rich rock art and living religious traditions, showing a long relationship between people and the landscape.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Mana Pools, Sapi and Chewore were listed mainly because of their …",
    options: [
      ["wildlife and Zambezi floodplain", "Correct: a natural site listed for its landscape and animals."],
      ["ancient stone enclosures and platforms", "That is Great Zimbabwe and Khami."],
      ["rock paintings and shrines", "That is the Matobo Hills."],
      ["huge waterfall and its spray", "That is Victoria Falls."],
    ],
    answer: "A",
    explanation: "Mana Pools is a natural site in the middle Zambezi valley, known for its pools and large numbers of wild animals.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Finds of imported goods at Khami are evidence that its people …",
    options: [
      ["took part in trade with distant lands", "Correct: imported goods show long-distance trade."],
      ["were ruled directly by a government in Europe", "Trade goods do not show foreign rule."],
      ["had no farming or cattle-keeping", "The finds say nothing of this, and the Torwa kept cattle."],
      ["moved to Khami after independence", "Khami was built centuries before independence."],
    ],
    answer: "A",
    hints: ["How do goods from far away reach an inland town?"],
    explanation: "Imported goods found at Khami show that the Torwa state traded, through the coast, with distant lands.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A newspaper reports that villagers near a World Heritage Site say they see little of the money tourists spend. Which change would **most directly** address their complaint?",
    options: [
      ["Share part of the fees with local projects and employ local people", "Correct: this gives the community a direct share of the benefits."],
      ["Ban all foreign tourists from visiting the site in future", "This removes the income altogether."],
      ["Remove the site from the World Heritage List", "This would not give villagers more income."],
      ["Build a high fence to keep the villagers far away from the site and its visitors", "This would worsen their complaint."],
    ],
    answer: "A",
    hints: ["The complaint is about who benefits."],
    explanation: "Sharing revenue and creating local jobs gives neighbouring communities a stake in the site, which also encourages them to protect it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Heavy rains cause part of an ancient stone wall at Great Zimbabwe to bulge and collapse. Which type of threat is this?",
    options: [
      ["weathering", "Correct: natural forces such as rain loosen the stones."],
      ["poaching", "Poaching is illegal hunting of animals."],
      ["vandalism", "Vandalism is deliberate damage by people."],
      ["pollution", "Pollution is contamination of air, water or soil, mainly by people."],
    ],
    answer: "A",
    hints: ["Was the damage done by people or by nature?"],
    explanation: "Rain, roots and temperature changes slowly loosen stones: this is weathering, a natural threat.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Zimbabwe has five World Heritage Sites.",
    answer: true,
    explanation: "True: Mana Pools (with Sapi and Chewore), Great Zimbabwe, Khami, Victoria Falls and the Matobo Hills.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Once a place becomes a World Heritage Site, it is owned by UNESCO instead of by the country.",
    answer: false,
    explanation: "False. The site remains part of the country, which promises to protect it; UNESCO keeps the list and gives advice.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each World Heritage Site with the year it was listed.",
    pairs: [
      ["Mana Pools, Sapi and Chewore", "1984"],
      ["Khami Ruins", "1986"],
      ["Mosi-oa-Tunya / Victoria Falls", "1989"],
      ["Matobo Hills", "2003"],
    ],
    explanation: "Mana Pools 1984; Khami (and Great Zimbabwe) 1986; Victoria Falls 1989; Matobo Hills 2003.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The name Mosi-oa-Tunya means \"the smoke that {{blank:a}}\". The World Heritage Convention was adopted in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["thunders"], choices: ["thunders", "falls", "shines", "rises"] },
      { id: "b", accepted: ["1972"], choices: ["1972", "1945", "1963", "1980"] },
    ],
    explanation: "Mosi-oa-Tunya means \"the smoke that thunders\", after the spray and roar of the Falls. UNESCO adopted the convention in 1972.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** World Heritage Sites in Zimbabwe.",
    points: [
      "Any one of: Mana Pools (with Sapi and Chewore), Great Zimbabwe, Khami, Victoria Falls / Mosi-oa-Tunya, Matobo Hills",
      "A second different site",
      "A third different site",
    ],
    modelAnswer: "Great Zimbabwe, Victoria Falls and the Matobo Hills.",
    explanation: "One mark per correct site.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits Zimbabwe gains from having World Heritage Sites.",
    points: [
      "Identifies tourism / foreign currency",
      "Develops: international recognition attracts visitors who pay fees and spend on hotels and guides, earning foreign currency and jobs",
      "Identifies conservation support / pride / research",
      "Develops: e.g. expert advice and training help protect the sites, or global recognition builds national pride",
    ],
    modelAnswer: "World Heritage status makes the sites known worldwide, so more international tourists visit; they pay fees and spend on hotels, guides and crafts, earning foreign currency and creating jobs. Listing also brings expert advice and training that help the country protect the sites for future generations.",
    hints: ["Think of money and of protection."],
    explanation: "One mark for each benefit and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Poaching is reducing elephant numbers in a wildlife area in the Zambezi valley. Suggest **two** ways the authorities and communities could reduce it, and explain each.",
    points: [
      "Suggests more and better-equipped ranger patrols / anti-poaching units",
      "Explains that poachers are more likely to be caught, which deters others",
      "Suggests involving local communities (sharing income, jobs as scouts, rewards for information)",
      "Explains that people who benefit from wildlife have a reason to protect it and report poachers",
    ],
    modelAnswer: "The parks authority could increase and equip ranger patrols, so that poachers are more likely to be caught and others are deterred. It could also involve nearby communities by sharing tourism income, employing local scouts and rewarding information, because people who benefit from wildlife have a reason to protect it and report poachers.",
    hints: ["One measure by the authorities, one that involves communities."],
    explanation: "One mark for each measure and one for its explanation.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "The table shows the results of a survey of 200 visitors to a World Heritage Site (invented for this question).\n\n" +
      table(["Main reason for visiting", "Number of visitors"], [
        ["Seeing the natural scenery", "90"],
        ["Learning about history and culture", "50"],
        ["Seeing wild animals", "40"],
        ["Other reasons", "20"],
        ["Total", "200"],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What percentage of the visitors came mainly to learn about history and culture?",
        options: [
          ["25%", "Correct: 50 out of 200 is 25%."],
          ["50%", "50 is the number of visitors, not the percentage."],
          ["45%", "45% is the share for natural scenery (90 out of 200)."],
          ["20%", "20% is the share for wild animals (40 out of 200)."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Is this site more likely to be a natural or a cultural site? Give a reason from the table.",
        points: ["Natural site", "Most visitors (90 + 40 = 130, or 65%) came for scenery and wildlife"],
        modelAnswer: "A natural site, because most visitors (130 of 200) came to see the scenery and wild animals.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how the site's managers could use these results to protect the site.",
        points: [
          "Protect the features most visitors come for: e.g. limit building near the main viewpoints",
          "Manage crowds at the busiest viewpoints with paths, timed entry or limits on numbers",
          "Use fees to fund rangers and conservation, and provide education for visitors interested in history and culture",
        ],
        modelAnswer: "Since most visitors come for the scenery, managers should stop building near the main viewpoints and keep the setting natural. They should manage crowds at those viewpoints with paths and limits on numbers. Fees should pay for rangers and conservation, and guides could serve the visitors interested in history and culture.",
      }),
    ],
    hints: ["Percentage = number ÷ total × 100."],
    explanation: "A data-response practice item on visitors to a World Heritage Site.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about Zimbabwe's World Heritage Sites.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** threats faced by Zimbabwe's World Heritage Sites.",
        points: [
          ["A threat described with an example, e.g. poaching of elephants and rhinos in the Zambezi valley", 2],
          ["A second threat described, e.g. weathering and plant growth loosening walls at Great Zimbabwe and Khami, vandalism of rock art in the Matobo Hills, or building pressure at Victoria Falls", 2],
        ],
        modelAnswer: "Poaching is a threat to Mana Pools, where illegal hunters kill elephants and other animals for ivory and meat. At Great Zimbabwe and Khami, rain, roots and creepers loosen the stones, and parts of walls can collapse.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"World Heritage status brings more benefits than problems.\" How far do you agree?",
        points: [
          ["Benefits: tourism, foreign currency and jobs; international recognition and pride", 2],
          ["Benefits: conservation advice, training and support; research and education", 2],
          ["Problems: crowding and building pressure; costs of meeting management standards; income not always reaching local communities", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "World Heritage status brings clear benefits. It makes sites such as Victoria Falls and Great Zimbabwe known worldwide, so more tourists come, bringing foreign currency and jobs for guides, hotel workers and craft sellers. It also brings expert advice and training in conservation, and it builds national pride because the world recognises Zimbabwe's history and nature.\n\nThere are also problems. More visitors can mean crowded paths and pressure to build hotels close to the sites, which can damage what made them special. Meeting the required standards of management costs money. Local communities sometimes complain that they see little of the income.\n\nI largely agree. The problems are real, but they can be managed through good planning and sharing income with local people, while the benefits of income, protection and pride are large and lasting.",
      }),
    ],
    hints: ["In (b), weigh tourism and protection against crowding, cost and fairness."],
    explanation: "A practice evaluative item on the benefits and problems of World Heritage status.",
  });

  b.card("DEFINITION", "World Heritage Site", "A place of outstanding value to all humanity, natural or cultural, listed by UNESCO, which the country promises to protect.");
  b.card("FACT", "Which UN agency keeps the World Heritage List?", "UNESCO (United Nations Educational, Scientific and Cultural Organization).");
  b.card("FACT", "Name Zimbabwe's five World Heritage Sites.", "Mana Pools, Sapi and Chewore; Great Zimbabwe; Khami; Victoria Falls / Mosi-oa-Tunya; Matobo Hills.");
  b.card("FACT", "In which years were Zimbabwe's World Heritage Sites listed?", "Mana Pools 1984; Great Zimbabwe and Khami 1986; Victoria Falls 1989; Matobo Hills 2003.");
  b.card("FACT", "Which of Zimbabwe's World Heritage Sites are natural sites?", "Mana Pools (with Sapi and Chewore) and Victoria Falls / Mosi-oa-Tunya.");
  b.card("FACT", "What does Mosi-oa-Tunya mean?", "\"The smoke that thunders\".");
  b.card("CONCEPT", "Why was the Matobo Hills listed?", "For its rich rock art and its living religious traditions and shrines, which show a long relationship between people and the landscape.");
  b.card("CONCEPT", "Give three benefits of World Heritage status.", "Tourism income and jobs; conservation advice and support; national pride, research and education.");
  b.card("FACT", "Name four threats to World Heritage Sites in Zimbabwe.", "Any four of: poaching, weathering and plant growth, vandalism, tourism and building pressure, mining or development proposals, fire, invasive plants, drought.");
});
