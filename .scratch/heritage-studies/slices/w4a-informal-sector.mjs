// W4a: The informal sector (her.production.informal-sector).
// Reviewer note: no statistics; the lesson points to ZIMSTAT labour force surveys. Survey table in the practice item
// is invented and labelled.
import { concept, P, table, levels } from "../lib.mjs";

concept("her.production.informal-sector", { file: "production/informal-sector", keyPrefix: "production.informal-sector" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is an example of the **informal sector**?",
    options: [
      ["a woman selling vegetables at a street stall", "Correct: small-scale, mostly unregistered vending."],
      ["a large bank with branches in every town", "A bank is registered and regulated: formal."],
      ["a government hospital", "This is part of the public formal sector."],
      ["a mining company listed on the stock exchange", "This is a large registered company: formal."],
    ],
    answer: "A",
    explanation: "Vending, repairs, cross-border trading and small-scale manufacturing are typical informal activities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature is typical of the informal sector?",
    options: [
      ["It is easy to enter with little capital", "Correct: few barriers to starting."],
      ["Workers have written contracts and pensions", "These are features of the formal sector."],
      ["Businesses keep full audited accounts", "Informal businesses usually keep few records."],
      ["Businesses are always large and employ hundreds", "Informal businesses are small."],
    ],
    answer: "A",
    explanation: "The informal sector is small-scale, easy to enter, mostly unregistered and cash-based.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is **cross-border trading**?",
    options: [
      ["buying goods in a neighbouring country to sell at home, or the reverse", "Correct: small traders move goods across borders."],
      ["the export of minerals and tobacco by large registered mining and farming companies", "This is formal export trade."],
      ["selling goods only inside one town", "Cross-border trade involves another country."],
      ["the movement of refugees across borders", "This is migration, not trade."],
    ],
    answer: "A",
    explanation: "Cross-border traders buy goods in neighbouring countries to sell at home, or sell local goods abroad, in small quantities.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Themba repairs phones under an umbrella in Bulawayo. When it rains he cannot work, and the council sometimes takes his tools. Which constraint does he **mainly** face?",
    options: [
      ["lack of proper premises", "Correct: he has no shelter or authorised workspace."],
      ["too much capital", "Too much capital is not a constraint."],
      ["too many skilled workers", "His problem is where he works, not too many skilled workers."],
      ["high taxes on his large profits", "He is small-scale and unregistered."],
    ],
    answer: "A",
    hints: ["Where does he work, and what happens there?"],
    explanation: "Lack of premises exposes informal workers to weather and to conflict with councils.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which of the following **best** explains why many people join the informal sector?",
    options: [
      ["Formal jobs are scarce and it is easy to start", "Correct: easy entry and few formal jobs push people into it."],
      ["The informal sector always pays more than the formal sector", "Earnings are usually lower and uncertain."],
      ["The law requires all school leavers to become vendors", "There is no such law."],
      ["Informal workers receive pensions from the state", "Informal workers usually have no pensions."],
    ],
    answer: "A",
    hints: ["Think about the shortage of jobs and the ease of entry."],
    explanation: "With few formal jobs and few barriers to entry, the informal sector offers a way to earn a living.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A council builds a covered market with water and toilets and charges vendors an affordable daily fee. Which result is **most likely**?",
    options: [
      ["Safer, cleaner trading and some income for the council", "Correct: premises solve problems for both sides."],
      ["All vendors stop trading and leave the town", "A better market usually attracts vendors."],
      ["The informal sector becomes illegal", "Building a market does not make trading illegal."],
      ["Vendors lose all their customers to the market", "Customers follow vendors to a good market."],
    ],
    answer: "A",
    hints: ["What do vendors gain, and what does the council gain?"],
    explanation: "Proper premises protect goods and health, reduce conflict and give the council an income.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **strongest** argument that the informal sector benefits Zimbabwe?",
    options: [
      ["It provides incomes for many families who have no formal jobs", "Correct: it supports livelihoods on a large scale."],
      ["It pays much more tax to the government than the whole formal sector", "It pays relatively little formal tax."],
      ["Its workers all have medical aid", "Most informal workers have none."],
      ["It needs no customers to survive", "Every business needs customers."],
    ],
    answer: "A",
    hints: ["What would many families lose without it?"],
    explanation: "Its main benefit is providing work and income for many people outside formal employment.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Most informal sector businesses are small and many are not registered.",
    answer: true,
    explanation: "True. Small size and lack of registration are key characteristics.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "All informal sector activities are illegal.",
    answer: false,
    explanation: "False. Most informal work, such as selling vegetables or repairing shoes, is legal; it is informal because it is small and mostly unregistered.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each constraint of the informal sector with a suitable solution.",
    pairs: [
      ["lack of capital", "microfinance loans and savings clubs"],
      ["lack of premises", "covered markets and workspaces built by councils"],
      ["poor record-keeping", "short business training courses"],
      ["costly, slow licensing", "simpler and cheaper registration"],
    ],
    hints: ["Each solution should remove the cause of the problem."],
    explanation: "Good solutions match the constraint they address.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the comparison.",
    template: "Workers in the {{blank:a}} sector usually have contracts and payslips. Workers in the {{blank:b}} sector usually have no pension or insurance.",
    blanks: [
      { id: "a", accepted: ["formal"], choices: ["formal", "informal"] },
      { id: "b", accepted: ["informal"], choices: ["informal", "formal"] },
    ],
    explanation: "Contracts and benefits belong to the formal sector; insecurity is typical of the informal sector.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Official figures on informal employment in Zimbabwe come from labour force surveys by {{blank:a}}.",
    blanks: [
      { id: "a", accepted: ["ZIMSTAT"], choices: ["ZIMSTAT", "ZEC", "EMA", "GMB"] },
    ],
    hints: ["It is the national statistics agency."],
    explanation: "The Zimbabwe National Statistics Agency (ZIMSTAT) runs labour force surveys.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes selling goods such as fruit or airtime from a stall or on foot in public places?",
    accepted: ["vending", "street vending"],
    wrong: ["wholesaling"],
    explanation: "Vending is one of the most common informal activities.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** characteristics of the informal sector.",
    points: [
      "Any one of: small scale; easy entry; mostly unregistered / unlicensed; little capital; skills learned informally; cash-based with few records; no contracts or social security; flexible hours and place",
      "A second different characteristic",
      "A third different characteristic",
    ],
    modelAnswer: "It is small-scale, it is easy to enter with little capital, and most businesses are not registered.",
    explanation: "One mark per correct characteristic.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways the informal sector is important to Zimbabwe.",
    points: [
      "Identifies: provides employment / self-employment",
      "Develops: for school leavers and retrenched workers who cannot find formal jobs, so families earn incomes",
      "Identifies: supplies cheap, convenient goods and services / develops skills and enterprise / links with formal sector",
      "Develops: vendors sell in small quantities near homes; some businesses grow into formal companies",
    ],
    modelAnswer: "The informal sector provides work for school leavers and retrenched workers who cannot find formal jobs, so their families can pay for food and school fees. It also supplies cheap goods and services close to people's homes, in small quantities that poorer households can afford.",
    hints: ["Think about workers and about customers."],
    explanation: "One mark for each point and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 6,
    stem: "Suggest **three** ways a town council could support informal traders while keeping the town clean and orderly. Explain each.",
    points: [
      "Suggests building designated markets with shelter, water and toilets",
      "Explains that traders work safely and pavements stay clear and clean",
      "Suggests simple, affordable licences or daily fees",
      "Explains that more traders register, giving the council income for services",
      "Suggests regular dialogue with traders' associations / refuse collection at markets",
      "Explains that rules are agreed and respected, reducing conflict",
    ],
    modelAnswer: "The council could build designated markets with shelter, water and toilets, so traders can work safely and pavements stay clear. It could offer simple, affordable licences or daily fees, so more traders register and the council earns money for services. It could also meet traders' associations regularly and collect refuse at the markets, so rules are agreed and respected and conflict is reduced.",
    hints: ["Think about premises, registration and dialogue."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "The table shows the results of an invented survey of 100 informal traders at a fictional market in Gweru (invented for this question).\n\n" +
      table(["Main problem reported", "Number of traders"], [
        ["Lack of capital to buy stock", 38],
        ["No shelter from sun and rain", 27],
        ["Goods confiscated or fines from officials", 20],
        ["Too much competition", 15],
      ]) + "\n\nStudy the table and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which problem was reported by the **largest** number of traders?",
        options: [
          ["lack of capital", "Correct: 38 of the 100 traders."],
          ["no shelter", "This was reported by 27."],
          ["confiscation and fines", "This was reported by 20."],
          ["competition", "This was reported by 15."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Which **two** problems could the council solve most directly? Give the problems.",
        points: ["No shelter (by building covered markets)", "Confiscation and fines (by simpler licensing / dialogue)"],
        modelAnswer: "Lack of shelter, and confiscation of goods and fines.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Suggest how the traders could deal with the problem of capital, and explain why your suggestion would help.",
        points: [
          "Suggests a savings club or a microfinance loan / a co-operative",
          "Explains how it raises money (pooling contributions / small loans with simple requirements)",
          "Explains the benefit: larger stock, more sales and income",
        ],
        modelAnswer: "The traders could form a savings club in which each member contributes every week and receives the pooled money in turn. This lets each trader buy a larger stock without a bank loan, so they sell more and earn more.",
      }),
    ],
    hints: ["In (b), which problems are caused by the council's own actions or facilities?"],
    explanation: "A data-based practice item on constraints in the informal sector.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the informal sector.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Distinguish between the formal and informal sectors, using **two** features.",
        points: [
          "Registration and taxes: formal businesses are registered and pay taxes",
          "informal businesses are often unregistered and pay little formal tax",
          "Workers' conditions: formal workers have contracts, payslips and benefits",
          "informal workers usually have no contracts, pensions or insurance",
        ],
        modelAnswer: "Formal businesses are registered and pay taxes, while many informal businesses are unregistered and pay little formal tax. Formal workers have contracts, payslips and benefits such as pensions, while informal workers usually have none of these.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"The growth of the informal sector is good for Zimbabwe.\" How far do you agree?",
        points: [
          ["For: provides jobs and incomes for many; reduces poverty; cheap goods", 2],
          ["For: develops skills and enterprise; some businesses grow into formal firms; resilience in hard times", 2],
          ["Against: low and uncertain incomes; no social protection; little tax revenue; congestion and health risks; sign of a shortage of formal jobs", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "The informal sector has helped many Zimbabweans. It gives work and incomes to people who cannot find formal jobs, so families can buy food and pay school fees. It supplies cheap goods near people's homes, teaches trades and business skills, and some informal businesses grow into registered companies.\n\nHowever, its growth also shows that formal jobs are scarce. Incomes are low and uncertain, workers have no pensions or insurance, and the government collects little tax to pay for services. Crowded pavements and poor sanitation can cause health problems and conflict with councils.\n\nI partly agree. The informal sector is a valuable lifeline, but it is best seen as a step towards more secure work, and it needs support to formalise and grow.",
      }),
    ],
    hints: ["In (b), consider what the growth tells us about formal jobs."],
    explanation: "A practice evaluative item on the informal sector.",
  });

  b.card("DEFINITION", "Informal sector", "Small, mostly unregistered businesses and self-employed people working outside full regulation, licensing and taxation.");
  b.card("DEFINITION", "Formal sector", "Registered, licensed businesses and organisations that pay taxes, keep records and employ workers on contracts.");
  b.card("DEFINITION", "Cross-border trading", "Buying goods in a neighbouring country to sell at home, or selling local goods abroad, in small quantities.");
  b.card("FACT", "Give four examples of informal activities in Zimbabwe.", "Vending, cross-border trading, small-scale manufacturing (e.g. furniture, gates), repairs (e.g. phones, cars, shoes).");
  b.card("FACT", "Which agency publishes official figures on informal employment?", "ZIMSTAT (Zimbabwe National Statistics Agency), through labour force surveys.");
  b.card("CONCEPT", "Name four characteristics of the informal sector.", "Small scale; easy entry; mostly unregistered; no contracts or social security (also little capital, cash-based).");
  b.card("CONCEPT", "Name four constraints facing the informal sector.", "Lack of capital, lack of premises, lack of skills, costly regulation (also no insurance, competition).");
  b.card("CONCEPT", "Why is the informal sector important?", "It provides jobs and incomes, cheap convenient goods, skills and enterprise, and links with the formal sector.");
  b.card("CONCEPT", "How can councils support informal traders?", "Build markets with shelter, water and toilets; simplify licences; consult traders' associations.");
});
