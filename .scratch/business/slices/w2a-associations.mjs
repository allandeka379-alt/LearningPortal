// W2a: traders' associations and business membership organisations (COM only).
import { concept, P, money, fmt, r2 } from "../lib.mjs";

concept("bus.organisation.associations", { file: "organisation/associations", keyPrefix: "organisation.associations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a traders' association?",
    options: [
      ["Traders in one line of business working together", "Correct: they unite to protect common interests."],
      ["A trade union that represents employees", "Trade unions represent workers, not business owners."],
      ["A government department that licenses traders", "Licensing is done by local authorities."],
      ["A bank that lends only to traders", "An association is not a bank."],
    ],
    answer: "A",
    explanation: "A traders' association is formed by traders in the same line of business (vendors, cross-border traders, booksellers) to protect and promote their interests.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organisation mainly represents **manufacturers and industry** in Zimbabwe?",
    options: [
      ["Confederation of Zimbabwe Industries (CZI)", "Correct: the CZI represents industry."],
      ["Zimbabwe National Vendors Association (ZNVA)", "This represents vendors."],
      ["Cross Border Traders Association", "This represents cross-border traders."],
      ["Book Sellers Association", "This represents booksellers."],
    ],
    answer: "A",
    explanation: "The CZI represents manufacturing and industrial businesses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the main role of ZimTrade?",
    options: [
      ["Promoting exports of Zimbabwean goods", "Correct: it is the national trade development and promotion organisation."],
      ["Collecting import duties at borders", "That is a function of the revenue authority."],
      ["Lending money to vendors", "ZimTrade does not act as a lender."],
      ["Setting retail prices of goods", "It does not set prices."],
    ],
    answer: "A",
    explanation: "ZimTrade promotes exports: market information, trade fairs, exporter training and linking producers with foreign buyers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a vendors' association help members through **bulk buying**?",
    options: [
      ["It buys large quantities so members pay lower prices", "Correct: the discount is shared among members."],
      ["It sells members' goods to buyers in other countries", "That is exporting, not bulk buying."],
      ["It collects market fees for the council", "That is not bulk buying."],
      ["It lends members money at interest", "That is lending."],
    ],
    answer: "A",
    explanation: "Buying in bulk earns discounts; each member then pays less per unit and earns a higher margin.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is **lobbying**?",
    options: [
      ["Trying to influence government decisions", "Correct: associations lobby on fees, taxes and rules."],
      ["Advertising products on radio", "That is promotion."],
      ["Buying goods in large quantities", "That is bulk buying."],
      ["Settling disputes between members", "That is dispute resolution."],
    ],
    answer: "A",
    explanation: "Lobbying means presenting members' views to influence the government or authorities.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A furniture manufacturer wants information about selling to buyers in neighbouring countries. Which organisation is the most suitable to approach?",
    options: [
      ["ZimTrade", "Correct: it provides export market information and contacts."],
      ["Zimbabwe National Vendors Association", "This represents vendors in local markets."],
      ["Book Sellers Association", "This represents booksellers."],
      ["A local town council", "Councils provide local services, not export advice."],
    ],
    answer: "A",
    explanation: "ZimTrade specialises in export promotion and foreign market information.",
    hints: ["Which organisation focuses on exports?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is it easier for the government to consult a business membership organisation than individual businesses?",
    options: [
      ["One body speaks for many members at once", "Correct: consultation is quicker and views are combined."],
      ["Business organisations make the laws", "Parliament makes laws."],
      ["Individual businesses are not allowed to speak to government", "They may, but it is slow and fragmented."],
      ["Business organisations collect taxes", "They do not collect taxes."],
    ],
    answer: "A",
    explanation: "BMOs gather members' views into one voice, which helps the government make better-informed policies.",
    hints: ["Think about thousands of separate traders."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Trade unions and traders' associations both represent employees.",
    answer: false,
    explanation: "False. Trade unions represent employees; traders' associations represent traders (business owners).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The ZNCC represents the views of businesses to the government.",
    answer: true,
    explanation: "True. The Zimbabwe National Chamber of Commerce represents businesses, provides information and organises networking.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each organisation with its main focus.",
    pairs: [
      ["ZNCC", "Represents businesses in commerce and other sectors"],
      ["CZI", "Represents manufacturing and industry"],
      ["ZimTrade", "Promotes exports"],
      ["Vendors' association", "Protects the interests of street and market traders"],
    ],
    explanation: "ZNCC: commerce; CZI: industry; ZimTrade: exports; vendors' associations: small traders.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Members pay a {{blank:a}} to their association, which uses its combined strength to {{blank:b}} with the council over market fees.",
    blanks: [
      { id: "a", accepted: ["subscription", "membership fee", "fee", "levy"] },
      { id: "b", accepted: ["negotiate", "bargain", "lobby"] },
    ],
    wrong: [["dividend", "advertise"]],
    explanation: "Subscriptions fund the association; collective bargaining or lobbying gives traders a stronger voice.",
  });
  b.short({
    d: 2,
    stem: "Give the abbreviation of the business membership organisation that represents manufacturers in Zimbabwe.",
    accepted: ["CZI", "C.Z.I."],
    wrong: ["ZNCC", "ZIMRA"],
    explanation: "The **CZI** (Confederation of Zimbabwe Industries).",
  });
  {
    const price = 18, disc = 12.5, units = 40;
    const each = r2(price * (1 - disc / 100)), saving = r2((price - each) * units);
    b.num({
      d: 3, skill: "APPLICATION", kind: "money", value: saving, calculator: true,
      stem: `A cross-border traders' association negotiates a ${disc}% bulk discount on blankets that normally cost ${money(price)} each. How much does a member save when buying ${units} blankets?`,
      wrong: [r2(price * disc / 100), r2(each * units)],
      explanation: `Discount per blanket = ${disc}% × ${fmt(price)} = ${money(r2(price - each))}; saving on ${units} = ${money(saving)}.`,
      hints: ["Find the discount on one blanket first.", "Multiply by the number of blankets."],
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** functions of a traders' association.",
    points: [
      "Function 1, e.g. representing members to the council (1)",
      "Explained, e.g. negotiates lower market fees / better trading sites (1)",
      "Function 2, e.g. bulk buying / information / training / settling disputes / welfare (1)",
      "Explained, e.g. lower prices raise members' margins / members learn rules and avoid fines (1)",
    ],
    modelAnswer: "A traders' association represents members to the council, so it can negotiate lower market fees or better sites than one trader could alone. It also buys in bulk for members, so each pays a lower price and earns more on each sale.",
    explanation: "State each function and explain the benefit to members.",
    hints: ["What can a group do that one trader cannot?"],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** limitations of traders' associations.",
    points: [
      "Limitation 1, e.g. subscriptions unaffordable for the smallest traders (1)",
      "Explained, e.g. poorest traders are left out and unrepresented (1)",
      "Limitation 2, e.g. little influence over government / dominated by larger members / poor leadership (1)",
      "Explained, e.g. demands ignored / policies favour big traders / disputes weaken the association (1)",
    ],
    modelAnswer: "Subscriptions may be too high for the smallest traders, so those who most need help are not members. Associations may also have little influence, so the council can ignore their demands.",
    explanation: "Each limitation should be explained in terms of its effect.",
    hints: ["Who might be left out?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Vendors at a market in Masvingo face rising market fees, frequent theft and no storage at night. Rudo suggests they form a vendors' association with a monthly subscription of US\\$3.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which function would help the vendors most with the rising market fees?",
        options: [["Representing members to the council", "Correct: negotiation with the council."], ["Bulk buying", "Does not affect fees."], ["Running a savings club", "Does not affect fees."], ["Training in customer care", "Does not affect fees."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Suggest **three** other ways the association could help the vendors.",
        points: ["Organise night security / shared storage (1)", "Bulk buying of stock for discounts (1)", "Training / savings club / settling disputes / sharing price information (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether the vendors should join the association. Give a justified conclusion.",
        points: [
          "For: stronger voice on fees (1)",
          "For: shared security and storage reduce losses from theft (1)",
          "For: bulk buying lowers costs, outweighing US\\$3 (1)",
          "Against: subscription is a cost for low-income vendors; benefits not guaranteed (1)",
          "Against: association may be dominated by a few / weak leadership (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Joining gives vendors a united voice to negotiate fees, and the association could organise night security and storage, cutting losses from theft. Bulk buying could save more than the US\\$3 subscription. However, US\\$3 a month is a real cost for poorer vendors, and if the leaders are weak or the council ignores them, the benefits may not appear. On balance they should join, because savings on stock and theft are likely to exceed the small subscription.",
      }),
    ],
    explanation: "A traders' association gives small traders a collective voice and shared services; its value depends on leadership and influence.",
    hints: ["Who decides market fees?", "Compare the subscription with possible savings."],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "Mutapa Foods (Private) Limited, a fictional food processor in Harare, faces competition from cheap imported jam and wants to start exporting peanut butter to neighbouring countries.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name the business membership organisation Mutapa Foods should contact for help with exporting.",
        accepted: ["ZimTrade", "Zim Trade", "Zimtrade"],
        wrong: ["ZNCC"],
      }),
      P.short({
        label: "(b)", marks: 1,
        stem: "Name the business membership organisation that could lobby the government about cheap imports on behalf of manufacturers.",
        accepted: ["CZI", "Confederation of Zimbabwe Industries", "the Confederation of Zimbabwe Industries"],
        wrong: ["ZimTrade"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** ways ZimTrade could help Mutapa Foods to export.",
        points: ["Market information on foreign demand and requirements (1)", "Developed: product meets standards / targets the right countries (1)", "Trade fairs / linking with foreign buyers / exporter training (1)", "Developed: finds customers / completes export procedures correctly (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Explain **two** benefits to Mutapa Foods of belonging to the CZI.",
        points: ["Benefit 1: lobbying on imports / industrial policy (1)", "Developed: fairer competition / protection for local producers (1)", "Benefit 2: information on economic trends / networking with suppliers (1)", "Developed: better planning / cheaper inputs (1)"],
      }),
    ],
    explanation: "ZimTrade: export promotion. CZI: represents industry, lobbies on industrial policy and imports.",
    hints: ["Which body focuses on exports, and which on industry?"],
  });
  b.card("DEFINITION", "Traders' association", "An organisation of traders in one line of business formed to protect and promote their common interests.");
  b.card("DEFINITION", "Business membership organisation (BMO)", "An organisation of businesses that represents them to government and provides services.");
  b.card("FACT", "ZNCC", "Zimbabwe National Chamber of Commerce: represents businesses, provides information and networking.");
  b.card("FACT", "CZI", "Confederation of Zimbabwe Industries: represents manufacturing and industry; lobbies on industrial policy.");
  b.card("FACT", "ZimTrade", "National trade development and promotion organisation: promotes exports, market information, trade fairs.");
  b.card("FACT", "Traders' associations named in the Commerce syllabus", "Cross Border Traders Association, Book Sellers Association, Zimbabwe National Vendors Association.");
  b.card("CONCEPT", "Functions of traders' associations", "Representation, collective bargaining, bulk buying, information, training, settling disputes, welfare.");
  b.card("DEFINITION", "Lobbying", "Trying to influence the decisions of the government or other authorities.");
  b.card("CONCEPT", "Associations versus trade unions", "Associations represent business owners; trade unions represent employees.");
});
