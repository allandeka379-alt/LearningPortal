// W3a: land ownership in Zimbabwe (her.production.land-ownership).
// Contested matter: the effects of land reform. MCQs test tenure types, dates and models only; effects are examined in
// self-marked items that require both views. No statistics are given.
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.production.land-ownership", { file: "production/land-ownership", keyPrefix: "production.land-ownership" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of land tenure gives private ownership proved by a **title deed**?",
    options: [
      ["Freehold", "Correct."],
      ["Leasehold", "Leasehold gives use for a fixed period under a lease."],
      ["Communal tenure", "Communal land cannot be sold by individuals."],
      ["State land", "State land is held by government."],
    ],
    answer: "A",
    explanation: "Freehold owners hold title deeds and may sell, bequeath or borrow against the land.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the **fast-track land reform programme** begin?",
    options: [
      ["2000", "Correct."],
      ["1980", "This is the year of independence."],
      ["1992", "This is the year of the Land Acquisition Act."],
      ["2013", "This is the year of the new Constitution."],
    ],
    answer: "A",
    explanation: "Fast-track land reform began in 2000.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the Lancaster House constitution, how could the government obtain land for resettlement in the 1980s?",
    options: [
      ["By buying it from willing sellers", "Correct: willing-buyer willing-seller for ten years."],
      ["By seizing any farm without payment", "Property was protected."],
      ["By order of the chiefs in each district", "Chiefs had no such power."],
      ["By a vote of the United Nations", "The UN had no role in this."],
    ],
    answer: "A",
    explanation: "The willing-buyer willing-seller rule applied for ten years after independence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which chapter of the 2013 Constitution deals with **agricultural land**?",
    options: [
      ["Chapter 16", "Correct."],
      ["Chapter 4", "Chapter 4 is the Declaration of Rights."],
      ["Chapter 12", "Chapter 12 covers independent commissions."],
      ["Chapter 14", "Chapter 14 covers provincial and local government."],
    ],
    answer: "A",
    explanation: "Chapter 16: agricultural land.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main difference between the **A1** and **A2** resettlement models?",
    options: [
      ["A1 gives smallholdings; A2 gives larger commercial farms", "Correct."],
      ["A1 is for urban housing stands; A2 is for rural farms", "Both are rural farming models."],
      ["A1 is freehold; A2 is communal land", "Neither is freehold or communal."],
      ["A1 began in 1980; A2 began in 2013", "Both are models of the fast-track programme from 2000."],
    ],
    answer: "A",
    explanation: "A1: smallholder resettlement. A2: commercial farms.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha wants to borrow money from a bank using her land as security. Which type of tenure would make this **easiest**?",
    options: [
      ["Freehold with a title deed", "Correct: banks accept title deeds as security."],
      ["A plot in a communal area", "Communal land cannot be sold, so banks will not accept it."],
      ["An A1 permit", "Permits are not usually accepted as security."],
      ["Grazing rights on state land", "Grazing rights are not security for a loan."],
    ],
    hints: ["Which tenure can be sold if she does not repay?"],
    answer: "A",
    explanation: "Freehold land can be sold, so banks accept title deeds as security.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why was land redistribution **slow** in the 1980s?",
    options: [
      ["Land had to be bought from willing sellers, often at high prices", "Correct."],
      ["The government did not want to resettle any families at all", "Resettlement was a stated aim."],
      ["There were no landless families in communal areas", "Communal areas were overcrowded."],
      ["The fast-track programme had already finished", "Fast-track began in 2000."],
    ],
    hints: ["What did the Lancaster House constitution require?"],
    answer: "A",
    explanation: "Willing-buyer willing-seller meant government could buy only land offered for sale, often expensive or of lower quality.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why do many new farmers on resettlement land find it hard to obtain **bank loans**?",
    options: [
      ["They hold permits or offer letters, not title deeds", "Correct: banks want security they can sell."],
      ["Banks are not allowed to lend to any farmers", "Banks lend to farmers who can offer security."],
      ["Resettlement land is in national parks", "Resettlement land is farmland."],
      ["All loans for farming are paid by the UN", "The UN does not pay farm loans."],
    ],
    hints: ["What do banks want as security?"],
    answer: "A",
    explanation: "Without title deeds, farmers lack security for loans, limiting investment.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Communal land can be sold by the family that farms it.",
    answer: false,
    explanation: "False. Communal land is allocated by traditional leaders and the RDC and cannot be sold by individuals.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "National parks and forests are examples of state land.",
    answer: true,
    explanation: "True.",
  });
  b.tf({
    d: 3, skill: "ANALYSIS",
    stem: "All historians and economists agree on the effects of the fast-track land reform programme.",
    answer: false,
    hints: ["Is this a contested matter?"],
    explanation: "False. The effects are debated: supporters stress redistribution and justice; critics stress the fall in output and job losses.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of land tenure with an example.",
    pairs: [
      ["Communal", "A family plot allocated by a village head"],
      ["Freehold", "A house stand with a title deed in Gweru"],
      ["Leasehold", "An A2 farm held on a long lease"],
      ["State land", "Hwange National Park"],
    ],
    explanation: "Each type of tenure gives different rights.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Under Chapter 16, compensation for acquired agricultural land is paid for {{blank:a}} made on the land. The A1 model gives {{blank:b}} plots.",
    blanks: [
      { id: "a", accepted: ["improvements"], choices: ["improvements", "minerals", "wildlife", "rainfall"] },
      { id: "b", accepted: ["smallholder"], choices: ["smallholder", "urban", "mining", "industrial"] },
    ],
    explanation: "Compensation is for improvements; A1 is the smallholder model.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What document proves ownership of freehold land? (two words)",
    accepted: ["title deed", "title deeds"],
    wrong: ["offer letter"],
    explanation: "A **title deed**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** aims of land reform in Zimbabwe.",
    points: ["Correct the colonial imbalance in land ownership", "Decongest communal areas", "Give land to the landless (including war veterans, women, youth)", "Increase production / create black commercial farmers / fulfil a goal of the liberation struggle"],
    modelAnswer: "To correct the colonial imbalance in land ownership, decongest communal areas, give land to landless people, and create new commercial farmers.",
    explanation: "One mark per aim.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** differences between communal land and freehold land.",
    points: [
      "Ownership: communal land is held for the community; freehold is privately owned",
      "Developed: communal plots are allocated by traditional leaders and the RDC; freehold is proved by a title deed",
      "Sale and security: communal land cannot be sold; freehold can be sold or inherited",
      "Developed: freehold can be used as security for a loan; communal land cannot",
    ],
    modelAnswer: "Communal land is held for the community and allocated to families by traditional leaders and the RDC, while freehold land is privately owned and proved by a title deed. Communal land cannot be sold, so it cannot be used as security for a loan, while freehold land can be sold, inherited or used to borrow money.",
    hints: ["Who owns it, and what can be done with it?"],
    explanation: "Two marks per developed difference.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Suggest **three** ways in which the government could help new farmers on resettlement land to increase production, explaining how each would help.",
    points: [
      "Secure tenure documents (e.g. bankable leases)", "Developed: farmers can borrow and invest with confidence",
      "Inputs and credit schemes", "Developed: seed, fertiliser and equipment at planting time",
      "Training and extension services / irrigation / markets", "Developed: better skills, water and prices raise yields and incomes",
    ],
    modelAnswer: "The government could give farmers secure, bankable tenure documents, so they can borrow money and invest with confidence. It could provide inputs and credit schemes so that seed, fertiliser and equipment arrive in time for planting. It could expand training by extension officers and repair irrigation schemes, so that farmers use better methods and produce even in dry years.",
    hints: ["Think about tenure, inputs and skills."],
    explanation: "Two marks per developed suggestion.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "Study the table (invented for this question), which shows the results of a fictional survey of 50 resettled families in a ward near Marondera in 2026.\n\n" + table(["Statement", "Agree", "Disagree"], [
      ["\"Our family is better off than before resettlement.\"", 34, 16],
      ["\"We can get a bank loan for inputs.\"", 9, 41],
      ["\"We received training from extension officers.\"", 22, 28],
      ["\"We have enough water for irrigation.\"", 18, 32],
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement did **most** families disagree with?",
        options: [
          ["\"We can get a bank loan for inputs.\"", "Correct: 41 of 50 disagreed."],
          ["\"Our family is better off than before resettlement.\"", "Most (34) agreed."],
          ["\"We received training from extension officers.\"", "28 disagreed, fewer than 41."],
          ["\"We have enough water for irrigation.\"", "32 disagreed, fewer than 41."],
        ],
        answer: "A",
        explanation: "41 of 50 families could not get a bank loan.",
      }),
      P.fib({
        label: "(b)",
        stem: "Complete the sentence.",
        template: "The number of families who said they were better off was {{blank:a}} out of 50.",
        blanks: [{ id: "a", accepted: ["34"], choices: ["34", "16", "22", "41"] }],
        explanation: "34 agreed.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Using the table and your own knowledge, explain **three** conclusions about land reform in this ward.",
        points: [
          "Most families feel better off", "Developed: land has improved livelihoods for many",
          "Access to credit is a major problem", "Developed: lack of title deeds limits loans for inputs",
          "Support services are uneven", "Developed: fewer than half received training, which may limit yields",
        ],
        modelAnswer: "Most families (34 of 50) feel better off, which suggests land has improved their livelihoods. However, most (41) cannot get bank loans, probably because they lack title deeds, so they struggle to buy inputs. Fewer than half (22) received training, so support services are uneven and yields may be lower than possible.",
      }),
    ],
    hints: ["Use the numbers to support each conclusion."],
    explanation: "Interpreting invented survey data on land reform.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on land redistribution.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Outline the measures taken to redistribute land in Zimbabwe since 1980.",
        points: ["Willing-buyer willing-seller in the 1980s", "Land Acquisition Act (1992): compulsory acquisition with compensation", "Fast-track land reform from 2000 (A1 and A2 models)", "Chapter 16 of the 2013 Constitution: acquired land vested in the State"],
        modelAnswer: "In the 1980s land was bought from willing sellers. The Land Acquisition Act of 1992 allowed compulsory acquisition with compensation. From 2000 the fast-track programme acquired most large commercial farms and allocated them under the A1 and A2 models. The 2013 Constitution, in Chapter 16, vests acquired agricultural land in the State.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The willing-buyer willing-seller approach was a better way to redistribute land than fast-track land reform.\" Discuss.",
        points: [
          ["For willing-buyer: orderly, legal, compensated; protected production and farm workers' jobs; kept investor confidence", 2],
          ["Against willing-buyer: slow and expensive; land offered was often poorer; imbalance largely remained after twenty years", 2],
          ["Fast-track: redistributed much land quickly to many families, but disrupted output and jobs and left tenure insecure", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Supporters of the willing-buyer willing-seller approach point out that it was orderly and legal: owners were paid, production continued and farm workers kept their jobs, and investors stayed confident.\n\nHowever, it was slow and expensive. Government could buy only land that owners chose to sell, often of lower quality, and after twenty years the colonial imbalance largely remained.\n\nFast-track land reform redistributed a great deal of land to many families in a short time and addressed the historic injustice. But it disrupted commercial agriculture, many farm workers lost their jobs, and many new farmers lack secure tenure.\n\nIn my judgement neither approach was fully successful: willing-buyer willing-seller was fair to owners but did not achieve redistribution, while fast-track achieved redistribution at a high economic cost. A planned, faster but orderly approach with support for new farmers might have achieved more.",
      }),
    ],
    hints: ["Judge each approach by speed, fairness and production."],
    explanation: "Outlining and comparing approaches to land reform.",
  });

  b.card("DEFINITION", "Land tenure", "The rules deciding who may own, use or occupy land, for how long and on what conditions.");
  b.card("DEFINITION", "Freehold", "Private ownership of land proved by a title deed.");
  b.card("DEFINITION", "Leasehold", "The right to use land for a fixed period under a lease.");
  b.card("DEFINITION", "Communal land", "Land held for communities; family plots allocated by traditional leaders and the RDC; cannot be sold.");
  b.card("FACT", "When did fast-track land reform begin?", "2000.");
  b.card("FACT", "Which constitutional chapter covers agricultural land?", "Chapter 16 of the 2013 Constitution.");
  b.card("CONCEPT", "A1 versus A2?", "A1: smallholder plots. A2: larger commercial farms.");
  b.card("CONCEPT", "Why was land reform slow in the 1980s?", "Willing-buyer willing-seller: only land offered for sale could be bought, often at high prices.");
  b.card("CONCEPT", "Two recognised problems of fast-track land reform?", "Fall in commercial output in the early 2000s; job losses for farm workers (also tenure insecurity).");
});
