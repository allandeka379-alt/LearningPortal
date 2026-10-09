// W1a: types of families and roles of family members (her.identity.families).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.identity.families", { file: "identity/families", keyPrefix: "identity.families" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of family is made up of parents and their children **only**?",
    options: [
      ["Nuclear family", "Correct: a nuclear family has parents and their children only."],
      ["Extended family", "An extended family also includes grandparents, uncles, aunts or cousins."],
      ["Child-headed family", "A child-headed family is led by a child, usually with no parents present."],
      ["Polygamous family", "A polygamous family has one husband with two or more wives."],
    ],
    answer: "A",
    explanation: "Nuclear family: parents and their children. Extended family: also other relatives.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **polygamous** family in the Zimbabwean context?",
    options: [
      ["A family with one husband and two or more wives", "Correct: in Zimbabwe polygamy means one husband with more than one wife (polygyny)."],
      ["A family in which grandparents live with the children", "That describes an extended family."],
      ["A family in which one parent brings up the children", "That is a one-parent family."],
      ["A family in which the children have the same father and mother", "That describes a monogamous family's children."],
    ],
    answer: "A",
    explanation: "A polygamous (polygynous) family is based on the marriage of one husband to two or more wives.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Rudo lives with her mother, her mother's parents and two cousins. Her father lives elsewhere. What type of household is this **best** described as?",
    options: [
      ["An extended family", "Correct: relatives beyond the parent and children (grandparents, cousins) live together."],
      ["A nuclear family", "A nuclear family has parents and children only; here grandparents and cousins live with them."],
      ["A child-headed family", "Adults (her mother and grandparents) head this household."],
      ["A polygamous family", "Nothing suggests a husband with several wives."],
    ],
    answer: "A",
    explanation: "When grandparents, cousins, uncles or aunts live with the parent and children, the household is an extended family.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the **most** common reason for a child-headed household in Zimbabwe?",
    options: [
      ["The death or long absence of both parents", "Correct: child-headed households usually form when parents have died or are away."],
      ["The wish of teenagers to live on their own", "Child-headed households arise from need, not choice."],
      ["A law that makes the eldest child the head of the home", "There is no such law."],
      ["The custom of sending children away to their uncles", "Children sent to relatives live in an extended family, headed by adults."],
    ],
    answer: "A",
    explanation: "Child-headed households usually result from the death of parents (for example from illness) or their long absence, such as migration for work.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a role of children in the **home**?",
    options: [
      ["Helping with chores and caring for younger siblings", "Correct: children contribute to the work and care of the home."],
      ["Paying the school fees of their brothers and sisters", "Paying fees is usually a parent's or guardian's role."],
      ["Settling disputes between the adults in the family", "Elders, aunts and uncles usually settle disputes."],
      ["Voting for the family in local council elections", "Only citizens aged 18 or over can vote."],
    ],
    answer: "A",
    explanation: "Children respect elders, help with chores, study and care for younger siblings and elderly relatives.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which example shows a family member playing a role in the **nation** rather than only in the home?",
    options: [
      ["A father paying taxes and voting in a general election", "Correct: paying taxes and voting are civic roles in the nation."],
      ["A mother cooking the evening meal for her children", "Cooking for the family is a role in the home."],
      ["A grandmother telling a folk tale to her grandchildren", "This is socialisation within the home."],
      ["An older brother helping his sister with her homework", "This is a role within the home."],
    ],
    answer: "A",
    hints: ["Which action affects the whole country, not just the household?"],
    explanation: "Roles in the nation include paying taxes, voting, obeying the law, producing goods and passing on national heritage.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Tendai lives with his father, his father's two wives and their children, and also with his grandfather. Which statement is correct?",
    options: [
      ["The family is both polygamous and extended", "Correct: two wives make it polygamous; the grandfather makes it extended."],
      ["The family is nuclear because his father heads it", "A nuclear family has only one set of parents and their children."],
      ["The family is monogamous because there is one father", "Monogamy means one husband and one wife; here there are two wives."],
      ["The family is child-headed because many children live there", "Adults head the household."],
    ],
    answer: "A",
    hints: ["Look separately at the marriage and at who else lives in the home."],
    explanation: "Classify by the marriage (monogamous or polygamous) and by who lives in the home (nuclear or extended). A family can be both polygamous and extended.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which change has done **most** to increase the childcare role of grandparents in many Zimbabwean families?",
    options: [
      ["Parents moving to towns or other countries to work", "Correct: migration leaves many children in the care of grandparents."],
      ["Schools introducing uniforms for all learners", "Uniforms do not change who cares for children."],
      ["The building of more clinics in rural areas", "Clinics improve health but do not shift childcare to grandparents."],
      ["The growth of football leagues for young people", "Sport does not explain the change in grandparents' roles."],
    ],
    answer: "A",
    hints: ["Why might parents not be at home to look after their children?"],
    explanation: "Labour migration within Zimbabwe and abroad has left many grandparents bringing up grandchildren, extending their traditional role.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A family can be both monogamous and extended at the same time.",
    answer: true,
    explanation: "True. A husband and one wife living with grandparents or other relatives form a family that is both monogamous and extended.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an extended family, only the parents are responsible for disciplining the children.",
    answer: false,
    explanation: "False. In an extended family grandparents, aunts and uncles also share in caring for and disciplining children.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each household with its type of family.",
    pairs: [
      ["A mother bringing up three children alone", "One-parent family"],
      ["A 15-year-old caring for two younger siblings after their parents died", "Child-headed family"],
      ["Parents, their children, two uncles and a grandmother", "Extended family"],
      ["A husband, his wife and their two children", "Nuclear family"],
    ],
    explanation: "Classify households by who lives in them and who heads them.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "A family based on one husband and one wife is {{blank:a}}. A family formed when a parent remarries and children of earlier relationships live together is a {{blank:b}} family.",
    blanks: [
      { id: "a", accepted: ["monogamous"], choices: ["monogamous", "polygamous", "nuclear", "extended"] },
      { id: "b", accepted: ["blended"], choices: ["blended", "child-headed", "nuclear", "polygamous"] },
    ],
    explanation: "Monogamous: one husband, one wife. Blended (reconstituted): a family joined after remarriage.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What type of family includes grandparents, uncles, aunts and cousins as well as parents and children?",
    accepted: ["extended family", "extended", "an extended family"],
    wrong: ["nuclear family", "polygamous family"],
    explanation: "This is an **extended family**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** roles of parents or guardians in the home.",
    points: ["Provide food, shelter or clothing", "Pay school fees / provide health care", "Any one of: protect, love, discipline, teach values and skills"],
    modelAnswer: "They provide food and shelter, pay school fees and discipline the children.",
    explanation: "One mark per correct role.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** challenges faced by a child who heads a household.",
    points: [
      "Identifies e.g. missing school / falling behind",
      "Develops: has to earn money or care for siblings instead of studying",
      "Identifies e.g. lack of money, food or adult guidance / emotional stress / risk of exploitation",
      "Develops: e.g. siblings may go hungry; no adult to protect or advise them",
    ],
    modelAnswer: "A child head may miss school because she has to look after her siblings or find money, so she falls behind. The household often lacks money and food, and without an adult to guide and protect them the children may be exploited or feel deep stress.",
    hints: ["Think about school, money and the absence of adults."],
    explanation: "Two marks per challenge: identify, then develop.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest **two** ways in which the extended family and community could support a child-headed household.",
    points: [
      "Suggests e.g. relatives visit regularly, help with food or take turns caring for the children",
      "Explains: the children get adult guidance and their basic needs are met",
      "Suggests e.g. village heads, churches or the school help with fees, uniforms or counselling",
      "Explains: the head can stay in school and the children are protected",
    ],
    modelAnswer: "Aunts and uncles could take turns visiting each week and bringing food, so the children have adult guidance and enough to eat. The school and local churches could help with fees and uniforms and offer counselling, so the eldest child can stay in school and all the children are protected.",
    hints: ["What does a parent normally provide? Who could share that role?"],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: source("Source A", "a description written by a fictional Form 1 learner in Masvingo, 2026", "I live with my father, my mother and my two sisters in town. During the holidays we go to our rural home, where my grandparents live with my two uncles, their wives and many cousins. My grandmother teaches us our totem praises, and my uncles take us to help at the village work party.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What type of family does the writer live in **in town**?",
        options: [
          ["Nuclear family", "Correct: father, mother and their children only."],
          ["Extended family", "The extended family lives at the rural home."],
          ["Polygamous family", "The source mentions only one mother."],
          ["Child-headed family", "Both parents live with the writer."],
        ],
        answer: "A",
        explanation: "In town the writer lives only with parents and sisters: a nuclear family.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** roles played by members of the extended family in the source.",
        points: ["Grandmother teaches totem praises", "Uncles take the children to the work party / teach community work"],
        modelAnswer: "The grandmother teaches the children their totem praises, and the uncles take them to help at the village work party.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why visits to the rural home are important for the writer's identity.",
        points: ["Learns totem and praises, so knows which clan they belong to", "Keeps ties with extended family / grandparents", "Learns community customs and duties (work party), linking them to their roots"],
        modelAnswer: "At the rural home the writer learns the family's totem praises, so they know which clan they belong to. The visits keep close ties with grandparents and cousins, and taking part in the work party teaches the customs of their home community.",
      }),
    ],
    hints: ["In (a), list who lives with the writer in town."],
    explanation: "A source showing a nuclear family linked to its extended family.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on families and the roles of family members.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Distinguish between a **nuclear** family and an **extended** family.",
        points: ["Nuclear: parents and their children only", "Extended: also includes other relatives such as grandparents, uncles, aunts, cousins"],
        modelAnswer: "A nuclear family is made up of parents and their children only, while an extended family also includes other relatives such as grandparents, uncles, aunts and cousins.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **two** roles that family members play in the community.",
        points: ["Take part in work parties, ceremonies or funerals", "this builds cooperation and supports other families", "Care for vulnerable neighbours or serve on community committees", "e.g. orphans and elderly are supported; schools and churches are run"],
        modelAnswer: "Family members take part in work parties, weddings and funerals, which builds cooperation and supports other families in times of need. They also serve on school and church committees and care for vulnerable neighbours such as orphans and the elderly.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The extended family is still the best support system for children in Zimbabwe today.\" Discuss.",
        points: [
          ["For: many adults share care, discipline and teaching of heritage; support for orphans and children of migrant parents", 2],
          ["For: pools resources in hard times; keeps totems, customs and language alive", 2],
          ["Against: urbanisation, migration and economic hardship weaken ties; strain on grandparents; some children are neglected or exploited; nuclear families and the state also support children", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The extended family remains a strong support system. Many adults share the care and discipline of children, and grandparents, aunts and uncles often take in orphans or the children of parents who work away. Relatives pool food and money in hard times and pass on totems, customs and language.\n\nHowever, the extended family is under strain. Urbanisation and migration scatter relatives, economic hardship leaves families with little to share, and elderly grandparents may struggle to care for many grandchildren. Some children in relatives' care are neglected or overworked, and nuclear families, schools, churches and government programmes also support children.\n\nOverall, the extended family is still a very important safety net, especially in rural areas, but it is no longer enough on its own and works best alongside the community and the state.",
      }),
    ],
    hints: ["In (c), consider what has weakened the extended family as well as its strengths."],
    explanation: "Distinguish (a), describe (b) and discuss (c) family support systems.",
  });

  b.card("DEFINITION", "Nuclear family", "Parents and their children only.");
  b.card("DEFINITION", "Extended family", "Parents and children plus other relatives such as grandparents, uncles, aunts and cousins, sharing responsibilities.");
  b.card("DEFINITION", "Child-headed family", "A household in which a child under 18 runs the home and cares for siblings, usually after parents die or leave.");
  b.card("DEFINITION", "Monogamous vs polygamous family", "Monogamous: one husband, one wife. Polygamous (polygynous): one husband, two or more wives.");
  b.card("DEFINITION", "One-parent family", "A family in which one parent brings up the children (death, divorce, separation, work away or never married).");
  b.card("CONCEPT", "Name three roles of children in the home.", "Respect and obey elders; help with chores; study; care for younger siblings and elderly relatives.");
  b.card("CONCEPT", "Name three roles of family members in the nation.", "Raise law-abiding citizens; pay taxes and vote; produce goods and food; pass on national heritage.");
  b.card("CONCEPT", "Why have grandparents' roles grown in many families?", "Parents migrate to towns or abroad for work, leaving grandparents to bring up the children.");
  b.card("CONCEPT", "Can a family be polygamous and extended at once?", "Yes: marriage type (mono/polygamous) and household members (nuclear/extended) are separate ways of classifying.");
});
