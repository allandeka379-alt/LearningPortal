// Slice w3b: finance, funding and market research (comp.techno.finance-market-research, ZIMSEC only).
import { concept, P } from "../lib.mjs";

// Survey: 120 people, 54 would buy.
const surveyed = 120, wouldBuy = 54;
const pctBuy = (wouldBuy / surveyed) * 100;
if (pctBuy !== 45) throw new Error("pct");
// Loan: borrow 1,500, repay 1,800 over 10 months.
const borrow = 1500, repay = 1800, months = 10;
const interest = repay - borrow;
const instalment = repay / months;
// Equity: investor gives 4,000 for 20% share; profit 10,000.
const share = 20, profit = 10000;
const investorProfit = (profit * share) / 100;
// Break-even: fixed costs 600 a month, each repair earns 25 and costs 10 in parts.
const fixed = 600, price = 25, varCost = 10;
const breakEven = fixed / (price - varCost);

concept("comp.techno.finance-market-research", { file: "techno/finance-market-research", keyPrefix: "techno.finance-market-research" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **equity finance**?",
    options: [
      ["Money given in exchange for a share of ownership in the business", "Correct: investors become part-owners."],
      ["Money borrowed from a bank that is repaid with interest", "That is debt finance."],
      ["Money kept from the business's past profits", "That is retained profit."],
      ["Money given by the government that is never repaid", "That is a grant."],
    ],
    answer: "A",
    explanation: "Equity finance is invested in return for a share of ownership and profits; it is not repaid like a loan.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of **primary** market research?",
    options: [
      ["Interviewing shoppers outside a mall in Harare", "Correct: new data collected first-hand."],
      ["Reading population figures from census reports", "This is secondary research."],
      ["Studying competitors' price lists on their websites", "This uses existing information: secondary."],
      ["Reading a newspaper article about phone sales", "This is secondary research."],
    ],
    answer: "A",
    explanation: "Primary research collects new information directly from people, for example by interviews or questionnaires.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** of a bank loan for a new technology business?",
    options: [
      ["Interest must be paid and repayments are due even when sales are low", "Correct: debt brings fixed repayments."],
      ["The bank becomes a part-owner of the business", "Banks lend; they do not take ownership."],
      ["The money never has to be repaid", "Loans must be repaid."],
      ["The owner must share all decisions with the bank's managers until the loan ends", "The owner keeps control."],
    ],
    answer: "A",
    explanation: "Loans must be repaid with interest on a fixed schedule, whatever the business earns.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Many people each give a small amount online to fund a new product, often in return for an early version. This is:",
    options: [
      ["Crowdfunding", "Correct: funding from a crowd of small contributors."],
      ["Venture capital", "Venture capital is large investment by a firm."],
      ["Trade credit", "Trade credit is paying suppliers later."],
      ["Microfinance", "Microfinance is small loans from institutions."],
    ],
    answer: "A",
    explanation: "Crowdfunding raises money from many people, usually through an online platform.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What does an investor bring besides money?"],
    stem: "Besides money, what is a major benefit of funding from an **angel investor**?",
    options: [
      ["Advice, experience and business contacts", "Correct: angels often mentor the founders."],
      ["No loss of ownership in the business", "Angels take a share of ownership."],
      ["A guaranteed fixed interest rate", "Equity does not carry interest."],
      ["Protection of the product's trademark", "Trademarks are registered separately."],
    ],
    answer: "A",
    explanation: "Angel investors usually bring experience and networks as well as money, in exchange for a share.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Who else can read published statistics?"],
    stem: "Which is a **disadvantage** of secondary research?",
    options: [
      ["It may be out of date and is also available to competitors", "Correct: it was collected by others for other purposes."],
      ["It is always the most expensive kind of research", "Secondary research is usually cheap."],
      ["It takes months to collect from customers", "That is primary research."],
      ["It can only be done by visiting customers in person", "Secondary research uses existing sources."],
    ],
    answer: "A",
    explanation: "Secondary data may be outdated, not specific to the business and available to everyone.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What does an internet café depend on most?"],
    stem: "Which location factor is **most** important for an internet café?",
    options: [
      ["Reliable electricity and a fast internet connection", "Correct: without these the business cannot operate."],
      ["Being next to a river for water supply", "Water is not a key factor here."],
      ["Being far away from any schools or colleges", "Students are likely customers."],
      ["Having a large farm field next to it", "Not relevant."],
    ],
    answer: "A",
    explanation: "Power and internet are essential; nearness to customers such as students also matters.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Small, early, wants control, little security."],
    stem: "Sipho needs USD 500 to start a phone-accessories stall. He has no assets for collateral and wants to keep full control. Which source is **most** suitable?",
    options: [
      ["Savings plus a small loan from family", "Correct: small amount, no collateral needed, control kept."],
      ["Venture capital from an investment firm", "Venture capital is for large, high-growth firms and takes a share."],
      ["A large bank loan secured on property", "He has no collateral, and the amount is small."],
      ["Selling shares on a stock exchange", "Only for large public companies."],
    ],
    answer: "A",
    explanation: "For a small sum, with no collateral and a wish to keep control, savings and family support are most suitable.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A grant from a development programme usually does not have to be repaid.",
    answer: true,
    explanation: "True. Grants are not repaid, though they come with conditions and reporting, and they are competitive.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Searching competitors' websites for their prices is primary research.",
    answer: false,
    explanation: "False. It uses information that already exists, so it is secondary (desk) research.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each source of finance.",
    pairs: ["Bank loan", "Angel investor taking 15% of the company", "Microfinance loan", "Venture capital firm taking a share"],
    right: ["Debt finance", "Equity finance"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Loans are debt; investment for a share is equity.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["First-hand or already published?"],
    stem: "Classify each research activity.",
    pairs: ["A focus group of eight learners testing an app", "Reading a report on mobile phone use in Zimbabwe", "Counting customers entering a competitor's shop", "Using census figures for the number of households in Gweru"],
    right: ["Primary research", "Secondary research"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Focus groups and observation are primary; reports and census data are secondary.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Percentage = part ÷ whole × 100."],
    stem: `In a survey of ${surveyed} people, ${wouldBuy} said they would buy a new school app. What percentage would buy it?`,
    value: pctBuy,
    wrong: [wouldBuy],
    explanation: `${wouldBuy} ÷ ${surveyed} × 100 = ${pctBuy}%.`,
    workedSolution: `1. ${wouldBuy} ÷ ${surveyed} = ${wouldBuy / surveyed}.\n2. × 100 = ${pctBuy}%.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Fixed costs ÷ (price − cost of parts)."],
    stem: `A laptop-repair business has fixed costs of USD ${fixed} a month. Each repair earns USD ${price} and uses USD ${varCost} of parts. How many repairs a month must it do to **break even** (cover all its costs)?`,
    value: breakEven,
    wrong: [fixed / price],
    explanation: `Each repair contributes ${price} − ${varCost} = ${price - varCost}; ${fixed} ÷ ${price - varCost} = ${breakEven} repairs.`,
    workedSolution: `1. Contribution per repair: ${price} − ${varCost} = USD ${price - varCost}.\n2. Break-even: ${fixed} ÷ ${price - varCost} = ${breakEven} repairs a month.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Customers, power, costs, safety."],
    stem: "Describe **four** factors a technopreneur should consider when choosing a location for a computer shop.",
    points: [
      "Close to the target customers / easy to reach",
      "Reliable electricity and internet",
      "Affordable rent and costs",
      "Security / transport and parking / competition nearby / skilled staff and suppliers / council permits",
    ],
    explanation: "Each factor affects sales, costs or the ability to operate.",
    modelAnswer: "It should be near its customers, such as a college or offices; have reliable power and internet; have rent the business can afford; and be secure, because the shop holds expensive equipment.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 4,
    hints: ["Objective, method, sample, analysis."],
    stem: "Tatenda wants to start a mobile phone repair service in Gweru. Describe how he should conduct market research before opening.",
    points: [
      "States clear objectives (e.g. demand, prices customers will pay, competitors)",
      "Primary research: questionnaire/interviews with potential customers; observing competitors",
      "Secondary research: competitors' prices online / population figures",
      "Chooses a representative sample and analyses results (percentages) to decide price, location and promotion",
    ],
    explanation: "Good market research has objectives, suitable methods, a sample and analysis.",
    modelAnswer: "He should decide what he needs to know: how many people need repairs, what they would pay and who his competitors are. He could survey 100 phone users in the town centre, observe how busy existing repair shops are, and check competitors' prices online. He should then work out percentages and use the results to set his prices and choose a location.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6, calculator: false,
    hints: ["Interest = total repaid − amount borrowed.", "Equity investors share the profit."],
    stem: `Rudo needs money to start a web-design business in Harare. Option 1: a microfinance loan of USD ${borrow.toLocaleString("en-GB")}, repaying USD ${repay.toLocaleString("en-GB")} in ${months} equal monthly instalments. Option 2: an angel investor gives the money in return for a ${share}% share of the business.`,
    parts: [
      P.num({ label: "(a)", stem: "Calculate the interest Rudo pays on the loan, in USD.", value: interest, wrong: [repay], explanation: `${repay} − ${borrow} = ${interest}.`, workedSolution: `1. ${repay} − ${borrow} = USD ${interest}.` }),
      P.num({ label: "(b)", stem: "Calculate each monthly instalment in USD.", value: instalment, wrong: [borrow / months], explanation: `${repay} ÷ ${months} = ${instalment}.`, workedSolution: `1. ${repay} ÷ ${months} = USD ${instalment}.` }),
      P.num({ label: "(c)", stem: `In a later year the business makes a profit of USD ${profit.toLocaleString("en-GB")}. How much of it goes to the angel investor under option 2?`, value: investorProfit, wrong: [share], explanation: `${share}% of ${profit} = ${investorProfit}.`, workedSolution: `1. ${profit} × ${share} ÷ 100 = USD ${investorProfit}.` }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Recommend one option for Rudo and justify your choice.",
        points: ["Clear recommendation of one option", "A benefit of the chosen option (e.g. loan: keeps full ownership and all profits; angel: no repayments, plus advice and contacts)", "Weighs a drawback of the other option, using the figures (interest of USD 300 versus giving away 20% of profits for ever)"],
        modelAnswer: `The loan, because she keeps full ownership: the interest is only USD ${interest} in total, whereas the investor would take ${share}% of the profits every year (USD ${investorProfit} in a year with USD ${profit} profit). The angel option would suit her only if she needed the investor's advice and contacts or could not afford USD ${instalment} a month.`,
      }),
    ],
    explanation: `(a) ${interest} (b) ${instalment} (c) ${investorProfit}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 6,
    hints: ["Compare the two sites factor by factor."],
    stem: "Chipo plans a computer training centre. Site A is in Bulawayo city centre: high rent, reliable power, many offices and colleges nearby, two competitors on the same street. Site B is on the edge of town: low rent, frequent power cuts, few people pass by, no competitors.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which factor is the biggest problem at Site B for a training centre?",
        options: [["Frequent power cuts", "Correct: computers cannot be used without power."], ["Low rent", "Low rent is an advantage."], ["No competitors", "This is an advantage."], ["Being outside the city centre", "Distance matters, but power is essential."]],
        answer: "A", explanation: "A computer training centre cannot run classes without reliable power.",
      }),
      P.manual({
        label: "(b)", marks: 5,
        stem: "Evaluate the two sites and recommend one.",
        points: ["Site A: near customers (offices, colleges) so more students", "Site A: reliable power, but high rent and competition", "Site B: low rent and no competitors", "Site B: power cuts and few passers-by / would need a generator or solar", "Justified recommendation weighing the factors"],
        modelAnswer: "Site A is close to offices and colleges, so many potential students, and it has reliable power, but the rent is high and two competitors are nearby. Site B is cheap and has no competition, but power cuts would stop classes and few people would see the centre. I recommend Site A, because customers and power are essential; Chipo can compete by offering evening classes or lower fees.",
      }),
    ],
    explanation: "(a) Power cuts.",
  });

  b.card("DEFINITION", "Start-up capital", "Money needed to begin a business: equipment, premises, stock, registration and running costs until income starts.");
  b.card("CONCEPT", "Debt vs equity finance", "Debt: borrowed, repaid with interest, owner keeps control. Equity: invested for a share of ownership, not repaid, profits shared.");
  b.card("CONCEPT", "Sources of finance", "Savings; family and friends; bank loan; microfinance; grants and competitions; angel investors; venture capital; crowdfunding; trade credit and leasing; retained profit.");
  b.card("DEFINITION", "Market research", "Collecting and analysing information about customers, competitors and the market to make better decisions.");
  b.card("CONCEPT", "Primary research", "New data collected first-hand: questionnaires, interviews, focus groups, observation, test marketing. Specific and up to date but costly.");
  b.card("CONCEPT", "Secondary research", "Existing data: internet, competitors' sites, government statistics, reports. Quick and cheap but may be outdated and is available to competitors.");
  b.card("FACT", "Steps in market research", "Set objectives; choose methods; choose a sample; collect data; analyse and draw conclusions.");
  b.card("CONCEPT", "Location factors", "Near customers; reliable power and internet; affordable rent; security; transport; skilled labour; suppliers; competition; council permits.");
  b.card("FORMULA", "Break-even (number of sales)", "Fixed costs ÷ (selling price − variable cost per item).");
});
