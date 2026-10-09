// W1a: ownership of the means of production, land reform, indigenisation (COM).
import { concept, P } from "../lib.mjs";

concept("bus.production.ownership-indigenisation", { file: "production/ownership-indigenisation", keyPrefix: "production.ownership-indigenisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **indigenisation** aim to do?",
    options: [
      ["Increase local citizens' ownership of businesses and resources", "Correct: ownership moves towards indigenous (local) people."],
      ["Transfer every business to ownership by the state", "That is nationalisation, not indigenisation."],
      ["Attract only foreign companies to invest in mining", "Indigenisation increases local, not foreign, ownership."],
      ["Stop all trade between Zimbabwe and other countries", "Indigenisation is about ownership, not banning trade."],
    ],
    answer: "A",
    explanation: "Indigenisation increases the share of the economy owned and controlled by local citizens, communities and employees.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Land and natural resources described as **heritage** means that they are:",
    options: [
      ["passed down between generations and held for the whole nation", "Correct: heritage is inherited from the past and kept for the future."],
      ["available only to the people who live in towns", "Heritage belongs to all citizens, not one group."],
      ["owned by foreign investors who developed them", "That is the opposite of national heritage."],
      ["resources that can never be used for production", "Heritage should be used productively and conserved, not left idle."],
    ],
    answer: "A",
    explanation: "Heritage resources belong to present and future generations, so they should be used productively, conserved and shared.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a method of widening local ownership of a mine?",
    options: [
      ["A community share ownership scheme", "Correct: people living near the mine own a share of it."],
      ["Raising the price of the minerals mined", "The selling price does not change who owns the mine."],
      ["Exporting all the ore without processing", "This reduces local benefit; it does not widen ownership."],
      ["Employing more foreign managers at the mine", "Management staff do not change ownership."],
    ],
    answer: "A",
    explanation: "Community and employee share ownership schemes give local people part-ownership and a share of the profits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does it matter who owns a country's mines and factories?",
    options: [
      ["Owners receive the profits and decide what is produced", "Correct: ownership brings both income and control."],
      ["Only owners are allowed to work in the business", "Owners employ others; workers need not be owners."],
      ["Owners never have to pay any taxes to government", "Owners pay taxes like other businesses."],
      ["Ownership decides the weather in the farming areas", "Ownership has no effect on the weather."],
    ],
    answer: "A",
    explanation: "Owners control decisions about production, investment and employment, and receive the profit; if owners live abroad, much of the profit leaves the country.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which problem did many new farmers face after land reform?",
    options: [
      ["Shortage of capital, equipment and farming skills", "Correct: owning land is not enough without the other factors of production."],
      ["Too many banks competing to lend to them", "The common problem was difficulty in getting loans, not too much choice."],
      ["Too much farm machinery for the land available", "Many new farmers lacked machinery."],
      ["A lack of land to farm on after resettlement", "Resettlement gave them land; other inputs were lacking."],
    ],
    answer: "A",
    explanation: "Land must be combined with labour, capital and enterprise. New farmers often needed finance, inputs, machinery and training (extension services).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government requires foreign-owned firms to sell a majority of their shares to local citizens. What is the most likely **disadvantage** for the economy?",
    options: [
      ["New foreign investment and technology may fall", "Correct: foreign investors may invest elsewhere if they cannot control their businesses."],
      ["More profits will be kept within the country", "This is an intended benefit, not a disadvantage."],
      ["Local people will gain business experience", "This is a benefit of the policy."],
      ["Wealth will be shared among more people", "Wider sharing of wealth is an aim of the policy."],
    ],
    answer: "A",
    explanation: "A risk of strict ownership rules is that foreign firms invest less, bringing less capital, technology and employment.",
    hints: ["Three options are aims of the policy.", "Think about how a foreign investor might react."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Workers at a fictional clothing factory in Bulawayo are given shares in the company. This is an example of:",
    options: [
      ["an employee share ownership scheme", "Correct: employees become part-owners of the business they work for."],
      ["a community share ownership scheme", "Community schemes give shares to people living near a resource, not to employees as such."],
      ["nationalisation of the clothing industry", "Nationalisation gives ownership to the state."],
      ["land reform in the urban areas", "Land reform redistributes land, not shares."],
    ],
    answer: "A",
    explanation: "Employee share ownership schemes widen local ownership and can motivate workers, because they share in the profits.",
    hints: ["Who receives the shares?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Indigenisation and nationalisation mean the same thing.",
    answer: false,
    explanation: "False. Indigenisation transfers ownership to local citizens; nationalisation transfers ownership to the state.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Treating land as heritage includes conserving it, for example by preventing soil erosion and deforestation.",
    answer: true,
    explanation: "True. Heritage must be passed on to future generations in good condition, so it is used productively and conserved.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term with its meaning.",
    pairs: [
      ["Land reform", "Redistributing land to more people"],
      ["Indigenisation", "Increasing local citizens' ownership of businesses"],
      ["Nationalisation", "Transferring a business to state ownership"],
      ["Economic empowerment", "Giving disadvantaged people the means to take part in the economy"],
    ],
    explanation: "These four terms are often confused; learn each definition exactly.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Land, minerals and capital are called the {{blank:a}} of production. When they are kept for future generations they are regarded as national {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["means"], choices: ["means", "chain", "stages", "sectors"] },
      { id: "b", accepted: ["heritage"], choices: ["heritage", "capital", "property", "taxation"] },
    ],
    explanation: "The means of production are the resources used to produce; land and natural resources are a national heritage.",
  });
  b.short({
    d: 2,
    stem: "Name the type of ownership in which a business is transferred to the state.",
    accepted: ["nationalisation", "nationalization", "state ownership", "public ownership"],
    wrong: ["indigenisation", "privatisation"],
    explanation: "Nationalisation transfers ownership to the state. Privatisation is the opposite (state to private owners).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits to Zimbabwe of increasing local ownership of businesses.",
    points: [
      "Benefit 1, e.g. more profit stays in the country (1)",
      "Explained, e.g. it is spent or reinvested locally rather than sent abroad (1)",
      "Benefit 2, e.g. local people gain business experience / wealth is shared more widely (1)",
      "Explained, e.g. reduces inequality / creates more local entrepreneurs (1)",
    ],
    modelAnswer: "First, profits earned by locally owned firms are more likely to be spent or reinvested in Zimbabwe instead of being sent to owners abroad, which helps other local businesses. Second, more people gain wealth and business experience, which reduces inequality and builds a class of local entrepreneurs.",
    explanation: "Each benefit needs a reason that shows how the country gains.",
    hints: ["Where do the profits go?", "Who gains skills and wealth?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest **two** ways the government could help newly resettled farmers to make productive use of their land.",
    points: [
      "Way 1, e.g. training / agricultural extension services (1)",
      "Explained, e.g. improves farming skills and yields (1)",
      "Way 2, e.g. loans, inputs (seed, fertiliser), irrigation, guaranteed markets (1)",
      "Explained, e.g. provides the capital needed to plant and sell crops (1)",
    ],
    modelAnswer: "The government could provide agricultural extension officers to train farmers in crop and soil management, which would raise yields. It could also supply seed and fertiliser on credit or give access to low-interest loans, so farmers have the capital to plant on time.",
    explanation: "Good answers link each measure to the missing factor of production: skills (labour quality), capital or finance.",
    hints: ["Which factors of production do new farmers lack?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "A fictional foreign-owned company, Zambezi Chrome, mines chrome ore near Shurugwi and exports it without processing. The government proposes that the company should: (1) sell 30% of its shares to a trust owned by the local community; (2) build a smelter in Zimbabwe within five years.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Proposal (1) is an example of:",
        options: [["a community share ownership scheme", "Correct: the community trust becomes a part-owner."], ["an employee share ownership scheme", "The shares go to a community trust, not to the mine's employees."], ["nationalisation of the mine", "The state would not own the shares."], ["privatisation", "Privatisation sells state businesses to private owners."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain how proposal (2) could benefit the country.",
        points: ["Processing adds value locally / higher export earnings (1)", "Creates skilled jobs / more tax revenue (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** way the community near the mine could benefit from proposal (1).",
        points: ["Identifies benefit: share of profits/dividends (1)", "Explains use, e.g. schools, clinics, roads funded by the trust (1)", "Links to the idea of resources as the community's heritage (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether the proposals are likely to benefit Zimbabwe's economy. Give a justified conclusion.",
        points: [
          "Benefit: profits shared locally / less profit sent abroad (1)",
          "Benefit: smelter adds value, jobs and export earnings (1)",
          "Problem: company may reduce investment or leave (1)",
          "Problem: community may lack funds to buy shares / benefits captured by a few (1)",
          "Conclusion (1)",
          "Justified, e.g. depends on how the share purchase is financed and on electricity supply for the smelter (1)",
        ],
        modelAnswer: "Both proposals could keep more of the value of the chrome in Zimbabwe: the community would receive part of the profits, and a smelter would create skilled jobs and earn more from exports than raw ore. However, Zambezi Chrome might reduce investment or move to another country if it thinks the conditions are too costly, and a smelter needs reliable electricity and large capital. The community trust may also need to borrow to pay for its shares. The proposals are likely to benefit the economy if they are negotiated with the company, with realistic time limits and clear rules on how the trust's income is used.",
      }),
    ],
    explanation: "(a) a community share ownership scheme; (b) beneficiation adds value; (c) dividends for community projects; (d) weighs local benefit against the risk of lower investment.",
    hints: ["Who would own the 30% of shares?", "Processing ore locally is beneficiation."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Rudo was resettled on a 6-hectare plot. She has the land but only a few hand tools, no savings and little experience of growing crops for sale.",
    parts: [
      P.fib({
        label: "(a)", marks: 2,
        stem: "Identify the factors of production Rudo is short of.",
        template: "She lacks tools and machinery, which are {{blank:a}}, and the skills of commercial farming, which affect the quality of her {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["capital"], choices: ["land", "capital", "rent", "heritage"] },
          { id: "b", accepted: ["labour"], choices: ["land", "labour", "profit", "interest"] },
        ],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why Rudo may find it difficult to borrow from a commercial bank.",
        points: ["Banks need security (collateral) for loans (1)", "Without a title she can pledge, the land may not be accepted as security / she has no savings (1)", "No track record of farming income makes her a high risk (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Recommend **one** source of help Rudo should use first, and justify your choice.",
        points: ["Identifies a realistic source, e.g. extension services, a farmers' co-operative, contract farming, a government input scheme (1)", "Explains how it helps her (1)", "Links to her particular shortage (capital or skills) (1)", "Justifies why it is better than another option (1)"],
      }),
    ],
    explanation: "Rudo has land but lacks capital and skilled labour. Without security she struggles to borrow, so help through training, co-operatives or input schemes is usually more realistic.",
    hints: ["Tools are man-made aids to production.", "What does a bank ask for before lending?"],
  });
  b.card("DEFINITION", "Means of production", "The resources used to produce goods and services: land, natural resources, capital and businesses.");
  b.card("DEFINITION", "Heritage", "Resources passed down between generations; to be used productively, conserved and shared.");
  b.card("DEFINITION", "Land reform", "Government action to redistribute land ownership or use, usually from a few large owners to many people.");
  b.card("DEFINITION", "Indigenisation", "Increasing the share of businesses and resources owned by local (indigenous) citizens.");
  b.card("DEFINITION", "Economic empowerment", "Giving disadvantaged people land, capital, skills, finance and markets so they can take part in the economy.");
  b.card("CONCEPT", "Indigenisation versus nationalisation", "Indigenisation: ownership to local citizens. Nationalisation: ownership to the state.");
  b.card("FACT", "Ways to widen local ownership", "Community and employee share ownership schemes, reserved sectors, loans and training for local entrepreneurs, value addition.");
  b.card("CONCEPT", "Risk of indigenisation", "Foreign investors may invest less, so less capital, technology and employment; local buyers may lack finance.");
  b.card("CONCEPT", "What makes land reform succeed", "Skills (extension services), finance, inputs, irrigation and markets for the produce.");
});
