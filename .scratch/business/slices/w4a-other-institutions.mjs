// W4a: other financial institutions (COM Form 3; BES Form 3).
import { concept, P, money, fmt } from "../lib.mjs";

concept("bus.finance.other-institutions", { file: "finance/other-institutions", keyPrefix: "finance.other-institutions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which institution lends mainly to people buying or building houses?",
    options: [
      ["A building society", "Correct: it specialises in mortgages."],
      ["A discount house", "Discount houses deal in bills in the money market."],
      ["A merchant bank", "Merchant banks serve mainly large companies."],
      ["A stock exchange", "A stock exchange is a market for securities."],
    ],
    answer: "A",
    explanation: "Building societies accept savings and lend long-term on mortgages.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which institution mainly provides hire purchase finance and leasing?",
    options: [
      ["A finance house", "Correct: it pays dealers and collects instalments."],
      ["A building society", "Building societies fund houses."],
      ["A post office savings bank", "It serves small savers."],
      ["A discount house", "Discount houses buy bills at a discount."],
    ],
    answer: "A",
    explanation: "Finance houses fund HP and leasing of vehicles, appliances and equipment.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a service of a merchant bank?",
    options: [
      ["Arranging a new share issue for a large company", "Correct: merchant banks act as issuing houses."],
      ["Giving small group loans to market vendors", "That is what microfinance institutions do."],
      ["Collecting small savings at post offices", "That is the post office savings bank."],
      ["Issuing the country's bank notes", "Only the central bank issues notes."],
    ],
    answer: "A",
    explanation: "Merchant banks advise companies, arrange share issues, accept bills and finance foreign trade.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a discount house earn its income?",
    options: [
      ["Buying bills cheaply and collecting their full value", "Correct: the difference is its income."],
      ["Selling goods to customers at reduced prices", "It does not sell goods."],
      ["Charging premiums for insuring goods in transit", "Insurers charge premiums."],
      ["Charging rent on houses it owns", "Discount houses deal in bills, not property."],
    ],
    answer: "A",
    explanation: "Discounting means buying a bill for less than it will pay at maturity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How do microfinance institutions often lend without asking for collateral?",
    options: [
      ["They lend to groups whose members guarantee one another", "Correct: group guarantees replace collateral."],
      ["The central bank repays any loan that is not repaid", "There is no such guarantee."],
      ["They lend only to large listed companies", "MFIs serve small, low-income borrowers."],
      ["They take the borrower's house as security", "That would be collateral."],
    ],
    answer: "A",
    explanation: "Group lending uses peer pressure and mutual guarantees instead of security.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government-supported institution lends to a manufacturer for fifteen years to build a factory that commercial banks consider too risky. What type of institution is it?",
    options: [
      ["A development finance institution", "Correct: long-term finance for risky development projects."],
      ["A discount house in the money market", "Discount houses deal in short-term bills."],
      ["A finance house offering leases", "Finance houses fund HP and leasing."],
      ["A building society lending on mortgages", "Building societies fund houses."],
    ],
    answer: "A",
    explanation: "Development finance institutions fill the gap for long-term and higher-risk projects.",
    hints: ["Look at the length of the loan and who supports the lender."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Why do microfinance loans often carry higher interest rates than bank loans?",
    options: [
      ["Small loans are costly to manage per dollar lent", "Correct: many small loans and visits cost more per dollar."],
      ["The law requires microfinance rates to be high", "No law requires high rates."],
      ["Microfinance borrowers are all large companies", "MFIs serve small borrowers."],
      ["Microfinance loans are repaid over thirty years", "They are usually short-term."],
    ],
    answer: "A",
    explanation: "Administration and risk per dollar are high on small, unsecured loans.",
    hints: ["Compare the cost of managing one large loan with many small ones."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a post office savings bank useful in rural areas?",
    options: [
      ["Post offices are found where bank branches are few", "Correct: the wide network reaches small towns."],
      ["It lends large sums to mining companies", "It serves small savers."],
      ["It buys treasury bills at a discount for profit", "That is a discount house."],
      ["It arranges mergers between companies", "That is a merchant bank."],
    ],
    answer: "A",
    explanation: "The post office network gives small savers a safe, nearby place to save.",
  });
  const face = 8000, price = 7760;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: face - price,
    stem: `A discount house buys a three-month bill of exchange with a face value of ${money(face)} for ${money(price)}. How much does it earn when the bill is paid in full?`,
    wrong: [face, price],
    explanation: `${fmt(face)} − ${fmt(price)} = ${money(face - price)}.`,
    hints: ["Income = face value − price paid."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Merchant banks mainly serve large businesses rather than ordinary individuals.",
    answer: true,
    explanation: "True. Their services are large loans, advice and trade finance for companies.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A building society's mortgage is usually a short-term loan repaid within one year.",
    answer: false,
    explanation: "False. Mortgages are long-term loans, often over 10 to 25 years, secured on the house.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each customer with the most suitable institution.",
    pairs: [
      ["A company planning to list its shares", "Merchant bank"],
      ["A family buying a house over twenty years", "Building society"],
      ["A farmer buying a tractor in instalments", "Finance house"],
      ["A vendor needing a small loan without collateral", "Microfinance institution"],
    ],
    explanation: "Match the size, period and security of the need to the institution.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A discount house buys treasury bills and {{blank:a}} of exchange below face value. A building society lends on {{blank:b}} secured on houses.",
    blanks: [
      { id: "a", accepted: ["bills"], choices: ["bills", "shares", "policies", "cheques"] },
      { id: "b", accepted: ["mortgages"], choices: ["mortgages", "overdrafts", "debentures", "premiums"] },
    ],
    explanation: "Discount houses work in the money market; building societies fund housing.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name for a merchant bank's role when it arranges the sale of a company's new shares?",
    accepted: ["issuing house", "an issuing house", "issuing house role"],
    wrong: ["discount house"],
    explanation: "Acting as an issuing house.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **two** services of a merchant bank.",
    points: [
      "Service, e.g. issuing house (1)",
      "Described: arranges and underwrites new share issues (1)",
      "Service, e.g. large loans / accepting bills / foreign trade finance / advice on mergers (1)",
      "Described, e.g. guarantees bills so that they can be discounted easily (1)",
    ],
    modelAnswer: "A merchant bank acts as an issuing house, arranging the sale of new shares when a company wants to raise capital on the stock exchange. It also accepts bills of exchange, guaranteeing payment so that the holder can sell the bill easily.",
    explanation: "Name each service and say what it does.",
    hints: ["Who are a merchant bank's customers?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** benefit and **one** drawback of microfinance institutions for small traders.",
    points: [
      "Benefit, e.g. credit without collateral / training / savings services (1)",
      "Explained, e.g. a vendor can buy more stock and raise income (1)",
      "Drawback, e.g. high interest / short repayment periods / group pressure (1)",
      "Explained, e.g. if sales fall the trader may struggle to repay and fall into debt (1)",
    ],
    modelAnswer: "Microfinance lets a vendor with no collateral borrow to buy more stock, which raises her sales and income. However, interest rates are often high and repayments start quickly, so if sales are poor she may fall into debt.",
    explanation: "Microfinance widens access to credit but can be costly.",
    hints: ["What do small traders lack that banks want?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "Three people in Mutare need finance:\n\n- **Rudo** sells vegetables at a market stall. She needs a small loan to buy stock in bulk and has no collateral.\n- **Farai** is a teacher who wants to buy a house and repay over twenty years.\n- **Sunrise Packaging Ltd** (a fictional company) wants to raise a large amount by selling new shares to the public.",
    parts: [
      P.match({
        label: "(a)", marks: 3,
        stem: "Match each customer with the most suitable institution.",
        pairs: [["Rudo", "Microfinance institution"], ["Farai", "Building society"], ["Sunrise Packaging Ltd", "Merchant bank"]],
        extraRight: ["Discount house"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why a commercial bank might refuse Rudo a loan.",
        points: ["No collateral / security (1)", "Small, irregular or unrecorded income, so repayment is uncertain (1)", "Cost of managing a small loan is high compared with the interest earned (1)"],
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Describe how a building society protects itself when lending to Farai.",
        points: ["The house is security for the mortgage (1)", "It can sell the house if Farai stops paying / checks his income first (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Discuss whether microfinance institutions are good for small traders such as Rudo.",
        points: ["Good: access to credit without collateral (1)", "Good: training, savings and growth of her business and income (1)", "Bad: high interest / quick repayments / group pressure (1)", "Justified conclusion (1)"],
      }),
    ],
    explanation: "Rudo: microfinance; Farai: building society; the company: a merchant bank. Banks reject small unsecured borrowers; mortgages are secured on the house.",
    hints: ["Consider the size and length of each need.", "What security can each borrower offer?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Chipo owns a clothing wholesale business in Harare. A retailer has given her a bill of exchange payable in three months, but Chipo needs cash now. She is also thinking of leasing a delivery van.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Name the institution that could buy the bill of exchange from Chipo and state what it pays her.",
        points: ["Discount house (1)", "Less than the face value of the bill (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a finance house could help Chipo obtain the van.",
        points: ["Leases the van / provides hire purchase (1)", "She pays regular rentals or instalments instead of a large sum (1)", "Cash stays in the business for stock (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** advantage and **one** disadvantage to Chipo of discounting the bill.",
        points: ["Advantage: cash now for stock or bills (1)", "Developed: business keeps trading without waiting three months (1)", "Disadvantage: she receives less than the face value (1)"],
      }),
    ],
    explanation: "Discount houses buy bills below face value; finance houses provide leasing and HP so cash is kept for trading.",
    hints: ["Who deals in bills of exchange?"],
  });
  b.card("DEFINITION", "Merchant bank", "Bank for large companies: big loans, accepting bills, foreign trade finance, issuing house, advice on mergers.");
  b.card("DEFINITION", "Finance house", "Provides hire purchase and leasing: pays the dealer and collects instalments with interest.");
  b.card("DEFINITION", "Discount house", "Buys treasury bills and bills of exchange below face value, holds them to maturity; supplies short-term funds.");
  b.card("DEFINITION", "Building society", "Accepts savings and lends long-term on mortgages secured on houses.");
  b.card("DEFINITION", "Post office savings bank", "Lets small savers save through the post office network, reaching areas with few banks.");
  b.card("DEFINITION", "Development finance institution", "Gives long-term finance for projects banks see as too risky, often with government support.");
  b.card("DEFINITION", "Microfinance institution", "Small loans, savings and training for low-income people and small traders, often through group lending.");
  b.card("CONCEPT", "Choosing an institution", "Match the size of the need, the period, the customer and the security available.");
});
