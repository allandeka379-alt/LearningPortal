// W3a: nationalisation, privatisation and commercialisation (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, table, pctChange } from "../lib.mjs";
import { mc, LV5, LV8, LV10 } from "../tables/w3a-kit.mjs";

concept("aecon.intervention.privatisation", { file: "intervention/privatisation", keyPrefix: "intervention.privatisation" }, (b) => {
  mc(b, [1, "RECALL"], "Privatisation is the",
    ["transfer of an enterprise from the state to private owners", "Correct: ownership moves to the private sector."],
    [["transfer of a private firm into the ownership of the state", "That is nationalisation."], ["removal of all government taxes on the profit of a firm", "Privatisation concerns ownership, not taxes."], ["fixing of prices for the goods of a firm by the government", "That is a price control."]],
    "Privatisation transfers ownership from the public to the private sector.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following describes commercialisation of a state enterprise?",
    ["It stays state-owned but is run on commercial lines", "Correct: management changes, ownership does not."],
    [["The enterprise is sold to private shareholders on the stock market", "That is privatisation."], ["The enterprise is closed down and all of its assets are sold", "That is liquidation."], ["The enterprise is given a legal monopoly over its market", "That has nothing to do with commercial management."]],
    "Commercialisation changes how a state-owned enterprise is managed, not who owns it.");

  mc(b, [2, "UNDERSTANDING"], "Which is an argument for nationalising the electricity transmission network?",
    ["It is a natural monopoly, and state control can prevent high monopoly prices", "Correct: a single network is cheapest, so public control guards consumers."],
    [["Competing private networks would give the lowest costs of supply", "Duplicating a grid wastes resources; that is why it is a natural monopoly."], ["State firms always have lower costs than private firms in any industry", "This is not always true and is not the case for nationalisation."], ["It would guarantee that the network always makes a profit each year", "Nationalisation does not guarantee profit."]],
    "A natural monopoly may be better owned or controlled by the state to protect consumers from monopoly pricing.");

  mc(b, [2, "UNDERSTANDING"], "The sale of a state enterprise raises revenue for the government. What is the main cost of this to the government in the long run?",
    ["The loss of the future profits that the enterprise would have earned", "Correct: the state gives up the stream of future profit."],
    [["The sale proceeds must be repaid to the buyer after some years", "Proceeds are kept by the seller."], ["The enterprise stops paying wages to its workers after the sale", "Wages continue under the new owner."], ["The state must nationalise another firm to replace the one sold", "No such requirement follows from a sale."]],
    "A one-off sale proceeds must be set against the dividend or profit stream that is given up.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A state-owned water company is sold to a single private buyer, which becomes the only supplier in the region. Without regulation, the most likely result is",
    ["higher prices, because the new owner has monopoly power", "Correct: a private monopolist can raise price above cost."],
    [["lower prices, because privatisation always creates competition", "Selling a monopoly does not create competition."], ["no change in prices, because the costs of supply are fixed", "Price depends on market power as well as cost."], ["lower profits, because shareholders prefer a low price", "Shareholders usually prefer higher profit."]],
    "Ownership change alone does not remove monopoly power; regulation or competition is needed.", { hints: ["Does the sale change the number of suppliers?"] });

  mc(b, [3, "APPLICATION"], "A regulator uses a CPI − X price cap. Inflation is 7% and X is 3%. A firm currently charges US\\$50. The highest price it may charge next year is",
    ["US\\$52", "Correct: allowed rise 4%, 50 × 1.04 = 52."],
    [["US\\$55", "That uses 10% (inflation + X)."], ["US\\$53.50", "That uses 7%, ignoring X."], ["US\\$48.50", "That subtracts inflation, which is not how the cap works."]],
    "The cap allows a rise of CPI − X = 7 − 3 = 4%; 50 × 1.04 = US\\$52.", { hints: ["Allowed rise = inflation minus X."], calculator: true });

  mc(b, [4, "EVALUATION"], "A government sells a state bus company. Which finding would best support the claim that privatisation improved efficiency?",
    ["Cost per passenger-kilometre fell while service quality was maintained", "Correct: unit cost fell without a loss of quality."],
    [["The sale raised a larger sum of money for the government than expected", "Sale proceeds do not show efficiency."], ["The number of employees fell by 30%, with no change in the service", "Fewer jobs alone do not show efficiency without output."], ["The company's profits rose because it increased its fares each year", "Profit from higher fares may reflect market power, not efficiency."]],
    "Efficiency is shown by lower unit costs for the same quality, not by sale value, job cuts or profit from higher prices.", { hints: ["Which measure compares cost with output and quality?"] });

  {
    const l0 = 260e6 / 5200, l1 = 312e6 / 3900;
    chk(l0, 50000); chk(l1, 80000);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: pctChange(l0, l1), calculator: true, dp: 1, hints: ["Productivity = calls per employee."],
      stem: "A state telecommunications firm handled 260 million calls a year with 5,200 employees. After privatisation it handled 312 million calls with 3,900 employees. Calculate the percentage change in calls per employee, to one decimal place.",
      wrong: [20, -25, 24], explanation: "Calls per employee: 260,000,000 ÷ 5,200 = 50,000 before and 312,000,000 ÷ 3,900 = 80,000 after. Change = (80,000 − 50,000) ÷ 50,000 × 100 = +60%. (20% is the rise in calls alone; −25% is the change in employment.)" });
    const c0 = 84 / 210, c1 = 77 / 275;
    chk(pctChange(c0, c1), -30, 1e-9);
    b.calc({ d: 3, skill: "APPLICATION", kind: "pct", value: Math.abs(pctChange(c0, c1)), calculator: true, dp: 1, hints: ["Unit cost = operating cost ÷ units delivered."],
      stem: "A state electricity supplier had an operating cost of US\\$84 million to deliver 210 million units of electricity. After privatisation its operating cost was US\\$77 million to deliver 275 million units. Calculate the percentage fall in operating cost per unit delivered, to one decimal place.",
      wrong: [8.3, 31, 40], explanation: "1. Cost per unit before = 84 ÷ 210 = US\\$0.40.\n2. Cost per unit after = 77 ÷ 275 = US\\$0.28.\n3. Fall = (0.40 − 0.28) ÷ 0.40 × 100 = 30.0%. (8.3% is the fall in total cost only.)" });
  }
  {
    const taxRise = 7.5 - 3.5; chk(taxRise, 4);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: 63, calculator: true, daily: true,
      stem: "A regulator allows a water company to raise its price by no more than inflation minus X each year. Inflation is 8.5% and X is 3.5%. The current price is US\\$60. What is the maximum price after the rise, in US\\$?",
      wrong: [67.2, 65.1, 57], explanation: "Allowed rise = 8.5 − 3.5 = 5%. New price = 60 × 1.05 = US\\$63." });
  }
  {
    // payback of sale proceeds: profit 4, sale 30
    chk(30 / 4, 7.5);
    b.num({ d: 3, skill: "ANALYSIS", kind: "plain", value: 7.5, unit: "years", hints: ["Divide the sale price by the annual profit forgone."],
      stem: "A state enterprise earns an annual profit of US\\$4 million for the government. It is sold for US\\$30 million. After how many years would the government have received the same sum in profits, assuming the profit stays constant? Answer in years.",
      wrong: [120, 4, 26], explanation: "30 ÷ 4 = 7.5 years. After that the government would have gained more from keeping the enterprise (ignoring interest earned on the proceeds), so the sale price must be compared with the stream of future profits." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Privatising a natural monopoly will automatically create competition.", answer: false,
    explanation: "False. Ownership changes, but there is still one supplier, so regulation or later opening of the market is needed." });
  b.tf({ d: 3, skill: "EVALUATION", hints: ["Compare the one-off sum with the lost stream of profits."], stem: "The revenue from selling a state enterprise is a net gain for the government with no cost.", answer: false,
    explanation: "False. The government gains a one-off sum but loses the future profits (and may sell too cheaply)." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Nationalisation", "Transfer of a private enterprise to state ownership"], ["Privatisation", "Sale of a state enterprise to private owners"], ["Commercialisation", "Running a state enterprise on business lines"], ["Price cap (RPI − X)", "Limit on price rises set by a regulator"]],
    explanation: "Nationalisation moves ownership to the state; privatisation moves it to private owners; commercialisation changes management; a price cap is a regulatory tool." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A privatised monopoly needs a {{blank:a}} to protect consumers, for example by setting a price {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["regulator"], choices: ["regulator", "shareholder", "competitor"] }, { id: "b", accepted: ["cap"], choices: ["cap", "floor", "subsidy"] }],
    explanation: "A regulator uses tools such as price caps to limit monopoly power." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the term for running a state-owned enterprise on business lines while it stays in public ownership.",
    accepted: ["commercialisation", "commercialization", "commercialising"], wrong: ["privatisation"],
    explanation: "Commercialisation changes management and incentives, not ownership." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between nationalisation and privatisation.",
    points: ["Nationalisation is the transfer of an enterprise from private to state ownership.", "Privatisation is the transfer of an enterprise from state to private ownership."],
    modelAnswer: "Nationalisation transfers an enterprise from private owners to the state, while privatisation transfers it from the state to private owners.",
    explanation: "One mark for each direction of transfer." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Link ownership to incentives."],
    stem: "Explain why privatisation may improve the efficiency of a firm.",
    points: ["Private owners seek profit, which gives managers a reason to reduce costs.", "Shareholders and the threat of takeover or bankruptcy impose discipline.", "There is less political interference, such as pressure to keep surplus staff or to charge low prices.", "If competition follows, firms must also improve quality and keep prices low to keep customers."],
    modelAnswer: "Private owners seek profit, so managers have a reason to cut costs. Shareholders and the risk of takeover or bankruptcy impose discipline. The firm is also freed from political pressure to keep surplus staff or charge uneconomic prices. If competition follows, the firm must also improve quality and keep prices low to keep its customers.",
    explanation: "Profit motive, discipline, less political interference, competition." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider both the gain and the loss to the budget."],
    stem: "Analyse the effects on the government's budget of selling a state-owned enterprise that has been losing money.",
    points: ["The sale brings a one-off sum of money (revenue).", "The government no longer has to pay the subsidy or cover the losses each year.", "Lower subsidy spending helps reduce the budget deficit.", "However, if the enterprise would have become profitable the government loses future profits.", "If the sale price is too low, value is transferred to the buyers."],
    modelAnswer: "The sale gives the government a one-off sum of money, and it no longer has to pay yearly subsidies or cover the enterprise's losses, so the budget deficit is reduced. However, if the enterprise could have become profitable, the government gives up future profits, and if it is sold for too low a price the buyers gain value that belongs to the public.",
    explanation: "Sale revenue, saved subsidies, lost future profits, undervaluation." });

  {
    const t1 = table(["Measure", "Before the sale (state-owned)", "Three years after the sale"], [["Employees", 2000, 1500], ["Passengers carried (million a year)", 30, 36], ["Total operating cost (US\\$ million a year)", 60, 63], ["Subsidy paid by the government (US\\$ million a year)", 12, 0]]);
    const p0 = 30e6 / 2000, p1 = 36e6 / 1500;
    const c0 = 60 / 30, c1 = 63 / 36;
    chk(p0, 15000); chk(p1, 24000); chk(c0, 2); chk(c1, 1.75);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Cost per passenger = total cost ÷ passengers.", "Jobs: percentage change = change ÷ original × 100."],
      stem: `**A fictional bus company before and after privatisation (illustrative data)**\n\nThe government sold its bus company to a private owner. Fares were allowed to be set by the company.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: pctChange(2000, 1500), stem: "Calculate the percentage change in the number of employees (a negative number for a fall), to one decimal place.", dp: 1, wrong: [25, 33.3, -33.3], explanation: "(1,500 − 2,000) ÷ 2,000 × 100 = −25.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: c1, stem: "Calculate the operating cost per passenger after the sale, in US\\$.", wrong: [2, 63, 0.57], explanation: "63 ÷ 36 = US\\$1.75 (the cost before was 60 ÷ 30 = US\\$2.00)." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain two benefits to the government of the sale.",
          points: ["The government no longer pays the subsidy of US\\$12 million a year, reducing public spending.", "The sale itself brings in a one-off sum of money.", "Unit costs fell (US\\$2.00 to US\\$1.75), so the service is more efficient for the same cost."],
          modelAnswer: "The government stops paying the US\\$12 million a year subsidy, so public spending falls and the budget deficit is smaller. The sale also brings in a one-off payment. In addition, the cost per passenger fell from US\\$2.00 to US\\$1.75, so the service is run more efficiently." }),
        P.manual({ label: "(d)", marks: 3, stem: "Evaluate one possible disadvantage of the sale for people in rural areas.",
          points: ["Rural routes are often unprofitable, so the private owner may cut or stop them.", "Fares, now set by the company, may rise, so low-income people may lose access.", "A justified comment, for example that the government could attach service conditions to the sale or subsidise key routes."],
          modelAnswer: "Rural routes carry fewer passengers and are often unprofitable, so a private owner seeking profit may cut them or raise fares, and low-income rural people could lose access to transport. The government could reduce this risk by attaching service conditions to the sale or by subsidising essential routes." }),
      ],
      explanation: "Jobs −25%; cost per passenger US\\$1.75 (from US\\$2.00); subsidy saved; rural services at risk." });
  }
  {
    const t2 = table(["Year", "Price cap (CPI − X)", "Water company's average cost per household (US\\$)"], [["Year 0", "—", 34], ["Year 1", "CPI 6.0%, X 2.0%", 33.5]]);
    chk(40 * 1.04, 41.6);
    const price1 = 40 * (1 + (6 - 2) / 100);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["The cap allows a rise of inflation minus X.", "Compare cost and price."],
      stem: `**A privatised water company (illustrative data)**\n\nA fictional country sold its state water company to a private owner. The owner is now the only water supplier in the region and an independent regulator limits annual price rises to CPI − X. The average monthly bill in Year 0 was US\\$40.\n\n${t2}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: price1, stem: "Calculate the highest average monthly bill allowed in Year 1, in US\\$.", wrong: [42.4, 38.4, 43.2], explanation: "Allowed rise = 6.0 − 2.0 = 4%; 40 × 1.04 = US\\$41.60." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: price1 - 33.5, stem: "If the company charges the maximum price, what is its average profit per household per month in Year 1, in US\\$?", wrong: [6.5, 8.1, 7.6], explanation: "41.60 − 33.50 = US\\$8.10." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why a price cap is used after the privatisation of a monopoly.",
          points: ["A private monopoly can raise price above cost because customers have no alternative.", "The cap limits the rise in price to inflation minus X.", "The firm keeps extra profit if it cuts costs faster than X, so it still has an incentive for efficiency."],
          modelAnswer: "A private monopolist can raise its price above cost because customers have no alternative supplier. The price cap limits the rise to inflation minus X, so consumers are protected, but the company keeps any extra profit from cutting costs faster than X, which keeps an incentive for efficiency." }),
        P.manual({ label: "(d)", marks: 3, stem: "Evaluate one difficulty of setting the value of X.",
          points: ["The regulator has less information about the firm's true costs than the firm itself.", "If X is too low the firm may earn excessive profit; if X is too high the firm may make a loss and cut quality or investment.", "A justified comment, for example that X must be reviewed regularly and combined with quality standards."],
          modelAnswer: "The regulator knows less about the firm's true costs than the firm does. If X is set too low the company earns excessive profit; if it is too high the firm may make a loss and cut quality or investment. X therefore needs to be reviewed regularly and combined with quality standards." }),
      ],
      explanation: "Maximum price US\\$41.60; profit US\\$8.10; a cap limits monopoly pricing but X is hard to set." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Consider efficiency, revenue, jobs and equity.", "Distinguish ownership from competition and regulation."],
    stem: "Assess whether a government should privatise a loss-making state-owned railway.",
    points: ["Efficiency: private owners have a profit motive, so costs may fall.", "Efficiency developed: gains depend on competition or regulation, since a railway may be a natural monopoly.", "Budget: the sale brings revenue and ends subsidies.", "Budget developed: the sale price may be low if the railway is loss-making and the state loses any future profit.", "Employment: job losses may follow cost-cutting.", "Equity: unprofitable routes serving rural or low-income areas may be closed.", "Regulation of fares and service standards, or contracts for essential routes, could protect users.", "Alternatives: commercialise the railway, or franchise services while the state keeps the track.", "Time: efficiency gains take years to appear while job losses are immediate.", "A justified judgement."],
    levels: LV10,
    modelAnswer: "A loss-making railway puts a burden on taxpayers, and a private owner with a profit motive may cut costs and improve service. The sale would bring revenue and end subsidies. However, a railway network is often a natural monopoly, so efficiency gains depend on competition among train operators and on regulation of fares. A loss-making railway may sell for a low price, jobs are likely to be cut, and unprofitable rural routes may be closed, hurting low-income users. The government could instead commercialise the railway or franchise the services while keeping the track. Overall, privatisation is more likely to succeed if the sale is accompanied by competition or contracts and a strong regulator, and the government should weigh the benefit of lower subsidies against the social value of the routes.",
    wordLimit: { min: 120, max: 350 },
    explanation: "Efficiency and revenue against jobs, equity and monopoly; alternatives; judgement." });

  b.card("DEFINITION", "Define **nationalisation**.", "The transfer of an enterprise or industry from private ownership to the state.");
  b.card("DEFINITION", "Define **privatisation**.", "The transfer of ownership of an enterprise from the state to private owners, usually by selling shares or the business.");
  b.card("DEFINITION", "What is **commercialisation** of a state enterprise?", "Running a state-owned enterprise on business lines (targets, independence, less subsidy) while it stays in public ownership.");
  b.card("CONCEPT", "Give three arguments for privatisation.", "Efficiency from the profit motive, sale revenue and savings on subsidies, and competition and less political interference.");
  b.card("CONCEPT", "Give three arguments against privatisation.", "Private monopoly power, job losses and neglect of unprofitable services, and loss of future profits or sale below true value.");
  b.card("FORMULA", "What does an **RPI − X price cap** allow?", "Prices may rise by no more than inflation minus X, where X is an efficiency target set by the regulator.");
  b.card("CONCEPT", "Why is regulation needed after privatising a monopoly?", "Ownership change does not create competition, so the owner could raise prices and cut quality; a regulator limits this.");
  b.card("CONCEPT", "What matters more than ownership for efficiency gains?", "Competition and good regulation.");
  b.card("CONCEPT", "What is the cost to the state of selling a profitable enterprise?", "It receives a one-off sum but loses the future stream of profits.");
});
