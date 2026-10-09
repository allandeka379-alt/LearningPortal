// W4a: international financial institutions (COM Form 4). No invented loan amounts or recent programmes.
import { concept, P } from "../lib.mjs";

concept("bus.finance.international-institutions", { file: "finance/international-institutions", keyPrefix: "finance.international-institutions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which institution mainly lends for long-term development projects such as roads and power stations?",
    options: [
      ["The World Bank", "Correct: it funds long-term development projects."],
      ["The International Monetary Fund", "The IMF supports balance of payments and currency stability."],
      ["A discount house", "Discount houses deal in short-term bills."],
      ["A money transfer agent", "Agents move personal remittances."],
    ],
    answer: "A",
    explanation: "The World Bank (IBRD) lends for development projects.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does IMF stand for?",
    options: [
      ["International Monetary Fund", "Correct."],
      ["International Merchant Finance", "No such institution."],
      ["Investment and Mortgage Fund", "No such institution."],
      ["International Market Federation", "No such institution."],
    ],
    answer: "A",
    explanation: "The International Monetary Fund.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A country cannot pay for essential imports because its foreign currency earnings have fallen sharply. Which institution is most likely to help?",
    options: [
      ["The International Monetary Fund", "Correct: it lends for balance of payments difficulties."],
      ["A building society", "Building societies fund houses."],
      ["The country's stock exchange", "A stock exchange trades shares."],
      ["A microfinance institution", "MFIs lend small sums to individuals."],
    ],
    answer: "A",
    explanation: "IMF lending supports countries with balance of payments problems.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by IMF \"surveillance\"?",
    options: [
      ["Monitoring member economies and advising on policy", "Correct: it reviews policies and risks."],
      ["Guarding gold reserves with security staff", "Not what surveillance means here."],
      ["Checking imports at border posts", "That is a customs function."],
      ["Supervising commercial banks' daily lending", "That is the national central bank's role."],
    ],
    answer: "A",
    explanation: "Surveillance means regular monitoring of economies and advice to governments.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where were the World Bank and the IMF founded?",
    options: [
      ["At the Bretton Woods conference", "Correct: in 1944, near the end of the Second World War."],
      ["At the first meeting of the African Union", "They were founded long before."],
      ["At a summit of the trading bloc of southern Africa", "They are global, not regional."],
      ["At the opening of a stock exchange", "No connection."],
    ],
    answer: "A",
    explanation: "Both were set up at Bretton Woods in 1944.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a common criticism of loans from international financial institutions?",
    options: [
      ["Conditions may force cuts in public spending", "Correct: conditionality can hurt the poor."],
      ["They charge much higher interest than moneylenders", "Their rates are usually low."],
      ["They lend only to private individuals", "They lend mainly to governments."],
      ["They never provide any technical advice", "Technical advice is a key activity."],
    ],
    answer: "A",
    explanation: "Critics say conditions can reduce spending on health, education and subsidies.",
    hints: ["What does conditionality require?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Why might a developing country prefer a World Bank loan to a loan from a commercial bank?",
    options: [
      ["Lower interest and a longer repayment period", "Correct: development loans are on easier terms."],
      ["It never has to be repaid", "Most World Bank finance is a loan to be repaid."],
      ["No planning or reporting is needed", "Projects are planned and monitored."],
      ["It is paid in the local currency only", "Loans are usually in major currencies."],
    ],
    answer: "A",
    explanation: "Concessional terms make long-term projects affordable.",
    hints: ["Compare cost and length of the loans."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main regional development bank for Africa?",
    options: [
      ["The African Development Bank", "Correct: it finances development across Africa."],
      ["The Reserve Bank of Zimbabwe", "That is a national central bank."],
      ["The International Monetary Fund", "The IMF is global."],
      ["A national building society", "Building societies fund houses."],
    ],
    answer: "A",
    explanation: "The African Development Bank is Africa's regional development bank.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Most finance from the World Bank and the IMF must be repaid.",
    answer: true,
    explanation: "True. Most is loans, although on easier terms; some help is given as grants.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The World Bank's original task was to help rebuild countries damaged by the Second World War.",
    answer: true,
    explanation: "True. Its full name, the International Bank for Reconstruction and Development, reflects this.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The IMF's main role is to build schools and clinics in rural areas.",
    answer: false,
    explanation: "False. The IMF deals with balance of payments and economic stability; projects are the World Bank's field.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each institution with its main role.",
    pairs: [
      ["World Bank (IBRD)", "Long-term loans for development projects"],
      ["International Monetary Fund", "Support for balance of payments and stable currencies"],
      ["African Development Bank", "Finance for regional infrastructure and enterprise in Africa"],
      ["A national central bank", "Issues the country's currency and supervises its banks"],
    ],
    explanation: "Global, regional and national institutions have different roles.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Conditions attached to an IMF loan are known as {{blank:a}}. The World Bank's main lending arm is the International Bank for Reconstruction and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["conditionality"], choices: ["conditionality", "collateral", "dividends", "quotas"] },
      { id: "b", accepted: ["Development"], choices: ["Development", "Deposits", "Discounting", "Dividends"] },
    ],
    explanation: "Conditionality; the IBRD.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the abbreviation of the World Bank's main lending arm.",
    accepted: ["IBRD", "ibrd"],
    wrong: ["IMF"],
    explanation: "IBRD: International Bank for Reconstruction and Development.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** activities of the World Bank in developing countries.",
    points: [
      "Long-term, low-interest loans for projects (1)",
      "Example, e.g. roads, power, water, schools (1)",
      "Technical assistance / advice / training / research (1)",
      "Described, e.g. engineers help plan and manage projects (1)",
    ],
    modelAnswer: "The World Bank lends to governments over long periods at low interest for projects such as rural roads and water supplies. It also gives technical assistance, sending experts to help plan projects and train officials.",
    explanation: "Name each activity and illustrate it.",
    hints: ["Think of finance and advice."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** benefit and **one** drawback for a developing country of borrowing from the IMF.",
    points: [
      "Benefit, e.g. foreign currency to pay for imports / stabilises the currency / restores confidence (1)",
      "Explained, e.g. fuel and medicines can still be imported during a crisis (1)",
      "Drawback, e.g. conditions such as spending cuts / debt to repay (1)",
      "Explained, e.g. cuts in subsidies or services hurt poor households (1)",
    ],
    modelAnswer: "An IMF loan gives a country foreign currency in a crisis, so it can keep importing fuel and medicines while it adjusts. However, conditions may require cuts in government spending, which can reduce subsidies and services that poor households depend on.",
    explanation: "IMF support stabilises but comes with conditions.",
    hints: ["Why does a country approach the IMF?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "A developing country (fictional) needs finance for two things: a new hydro-electric power station that will take ten years to build, and foreign currency to pay for fuel imports after a sharp fall in its export earnings.",
    parts: [
      P.match({
        label: "(a)", marks: 2,
        stem: "Match each need with the most suitable international institution.",
        pairs: [["Power station", "World Bank"], ["Fuel imports after a fall in export earnings", "International Monetary Fund"]],
        extraRight: ["Discount house"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why the country is unlikely to borrow the money for the power station from local commercial banks.",
        points: ["Amount is too large for local banks (1)", "Period is too long; banks lend short- to medium-term (1)", "Commercial interest rates would be too high for the project (1)"],
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "State **two** ways a regional development bank could also help.",
        points: ["Loans or grants for power links / infrastructure (1)", "Finance for enterprises through local banks / technical advice (1)"],
      }),
      P.manual({
        label: "(d)", marks: 5,
        stem: "Discuss whether borrowing from international financial institutions is good for the country.",
        points: ["Finance for projects it could not fund itself (1)", "Low interest, long periods and expert advice (1)", "Power station raises output and jobs; IMF support keeps fuel flowing (1)", "But debt burden and strict conditions such as spending cuts (1)", "Justified conclusion (1)"],
      }),
    ],
    explanation: "World Bank for the long-term project; IMF for balance of payments support. Benefits of finance and advice are weighed against debt and conditions.",
    hints: ["Which institution deals with balance of payments problems?", "Weigh both sides before concluding."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "A rural district has poor roads, so small-scale farmers cannot get their crops to market. The government seeks help from an international financial institution.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Name **two** international or regional financial institutions the government could approach.",
        points: ["World Bank (IBRD) (1)", "African Development Bank / IMF for technical advice (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a new road network financed by such a loan could help the farmers.",
        points: ["Lower transport costs (1)", "Crops reach markets before they spoil / wider markets (1)", "Higher incomes for farmers / more trade (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** problem the government may face in repaying the loan.",
        points: ["Problem, e.g. debt repayments in foreign currency (1)", "Explained: needs export earnings / currency may fall in value (1)", "Effect: less money for other services (1)"],
      }),
    ],
    explanation: "Development institutions fund infrastructure that raises farmers' incomes; repayment in foreign currency can strain the budget.",
    hints: ["What does a road do for transport costs?"],
  });
  b.card("DEFINITION", "International financial institution", "Organisation owned by many governments providing finance, advice and technical help across borders.");
  b.card("DEFINITION", "World Bank (IBRD)", "Lends long-term at low interest for development projects; gives advice and research.");
  b.card("DEFINITION", "International Monetary Fund", "Promotes stable exchange rates and payments; lends for balance of payments problems; monitors economies.");
  b.card("FACT", "Origin of the World Bank and IMF", "Founded at the Bretton Woods conference, 1944.");
  b.card("DEFINITION", "Regional development bank", "Owned by countries of a region; finances infrastructure, enterprise and regional trade (e.g. the African Development Bank).");
  b.card("DEFINITION", "Conditionality", "Conditions attached to a loan, such as policy reforms or spending cuts.");
  b.card("CONCEPT", "World Bank versus IMF", "World Bank: long-term development projects. IMF: short-term balance of payments support and surveillance.");
  b.card("CONCEPT", "Benefits and criticisms", "Benefits: finance, low interest, expertise, crisis support. Criticisms: debt, conditions, unsuitable policies, rich-country voting power.");
});
