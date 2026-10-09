// W2b: why businesses succeed or fail.
import { concept, P, money, f, check } from "../lib.mjs";

const sfRev = 6400, sfCost = 7150;
const sfLoss = f.profit(sfRev, sfCost); // -750
check("loss", sfLoss, -750);

concept("bus.enterprise.success-failure", { file: "enterprise/success-failure", keyPrefix: "enterprise.success-failure" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an **internal** cause of business failure?",
    options: [
      ["Poor record keeping", "Correct: keeping records is within the owner's control."],
      ["A recession in the economy", "A recession is outside the business: external."],
      ["A new competitor opening nearby", "Competition is an external cause."],
      ["A drought that ruins the harvest", "Natural events are external causes."],
    ],
    answer: "A",
    explanation: "Internal causes, such as **poor records**, poor management and poor cash control, are within the control of the business.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Tatenda's welding business made a profit but closed because customers paid months late and he could not pay his suppliers. What was the main cause of failure?",
    options: [
      ["Poor cash flow", "Correct: he ran out of cash even though he was profitable."],
      ["Lack of demand for his products", "He had customers; the problem was late payment."],
      ["A poor location", "Nothing in the case suggests the location was the problem."],
      ["Too much competition", "Competition is not mentioned."],
    ],
    answer: "A",
    explanation: "A profitable business can still fail if it runs out of **cash**. Giving too much credit caused Tatenda's cash-flow problem.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are new businesses more likely to fail than established ones?",
    options: [
      ["They have few loyal customers and little finance", "Correct: they are not yet known and have little in reserve."],
      ["They must pay higher tax rates than older firms", "There is no general rule that new firms pay higher tax rates."],
      ["They are not allowed to borrow from banks", "New firms can borrow, though often with difficulty."],
      ["They have more experienced owners", "New owners are often less experienced, not more."],
    ],
    answer: "A",
    explanation: "New businesses often lack **experience, finance and customers**, and face established rivals.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A vendor in Masvingo mixes the money from her stall with her household money and does not know whether she is making a profit. Which solution best fits this problem?",
    options: [
      ["Keep daily records and a separate business cash box", "Correct: this matches the cause, poor record keeping."],
      ["Spend more on advertising her stall", "Advertising does not fix poor records."],
      ["Move to a busier market", "Location is not the problem described."],
      ["Lower her prices to attract more customers to the stall", "Lower prices without records could make things worse."],
    ],
    answer: "A",
    explanation: "Solutions must match the cause. **Daily records** and separating business and personal money show whether the stall makes a profit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which cause of failure can a business respond to but **not** prevent?",
    options: [
      ["A rise in interest rates", "Correct: this is an external economic change."],
      ["Holding too much stock", "Stock levels are controlled by the business."],
      ["Giving too much credit to customers", "Credit policy is controlled by the business."],
      ["Failing to train staff", "Training is controlled by the business."],
    ],
    answer: "A",
    hints: ["Which of these is decided outside the business?"],
    explanation: "External causes such as **interest rate changes** cannot be prevented, only planned for.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is insolvency?",
    options: [
      ["Being unable to pay debts when they fall due", "Correct: this is the usual immediate reason for closure."],
      ["Making a large profit in one year", "Profit is the opposite of the problem."],
      ["Selling shares to the public on the stock exchange", "That is a share issue."],
      ["Merging with a competitor", "That is external growth."],
    ],
    answer: "A",
    explanation: "**Insolvency** means a business cannot pay its debts when due. Even a profitable business can become insolvent.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which action is most likely to help a new business succeed?",
    options: [
      ["Carrying out market research before opening", "Correct: it shows whether customers want the product."],
      ["Giving long credit periods to every customer", "This weakens cash flow."],
      ["Using personal and business money together", "This makes records unreliable."],
      ["Copying a rival's product without any difference", "Without a difference, customers have no reason to switch."],
    ],
    answer: "A",
    hints: ["Which option reduces the risk of offering something nobody wants?"],
    explanation: "**Market research** reduces the risk of an unsuitable product or low demand, a major cause of failure.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A taxi operator in Bulawayo closes after fuel prices rise sharply and passengers switch to cheaper buses. What type of cause is this?",
    options: [
      ["External: economic change and competition", "Correct: rising fuel prices and cheaper rivals come from outside."],
      ["Internal: poor record keeping", "Records are not mentioned."],
      ["Internal: poor management of drivers and staff", "Staff management is not mentioned."],
      ["Internal: unsuitable location", "Location is not the issue described."],
    ],
    answer: "A",
    explanation: "Rising costs and cheaper competitors are **external** causes; the operator could only respond, for example by cutting costs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business that makes a profit can never fail.",
    answer: false,
    explanation: "False. A profitable business can run out of cash, for example when customers pay late, and become insolvent.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Lack of experience is one reason new businesses often fail.",
    answer: true,
    explanation: "True. New owners may not know how to manage money, stock or staff.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each cause of failure with the most suitable solution.",
    pairs: [
      ["Customers pay late", "Limit credit and chase debtors"],
      ["Owner does not know if the business is profitable", "Keep accurate daily records"],
      ["Customers do not want the product", "Carry out market research and change the product"],
      ["Owner lacks business skills", "Attend training or find a mentor"],
    ],
    hints: ["Each solution should remove the cause, not just its symptoms."],
    explanation: "Each solution tackles its cause directly.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Causes of failure within the control of the business are called {{blank:a}} causes. Closing a company and selling its assets to pay creditors is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["internal"], choices: ["internal", "external"] },
      { id: "b", accepted: ["liquidation"], choices: ["liquidation", "integration", "a merger", "a takeover"] },
    ],
    explanation: "**Internal** causes are controllable; **liquidation** is closing a company and selling its assets.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `In her first month a tailor in Kwekwe had sales revenue of ${money(sfRev)} and total costs of ${money(sfCost)}. Calculate her profit or loss for the month. Enter a loss as a negative number.`,
    kind: "money", value: sfLoss, answer: String(sfLoss), wrong: [-sfLoss],
    explanation: `Profit = ${money(sfRev)} − ${money(sfCost)} = −${money(-sfLoss)}: a loss of ${money(-sfLoss)}. Losses in the first months are common; the owner needs enough finance to survive them.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** internal causes of business failure.",
    points: [
      "Poor management / poor record keeping / poor cash control / unsuitable product.",
      "Explains how it leads to failure.",
      "Second internal cause.",
      "Explains how it leads to failure.",
    ],
    hints: ["Choose causes the owner could have controlled."],
    modelAnswer: "Poor record keeping means the owner does not know whether the business is making a profit or who owes it money, so problems are discovered too late. Poor cash control, such as giving too much credit, means the business cannot pay its suppliers or rent even when it has plenty of sales.",
    explanation: "Internal causes: poor management, poor records, lack of finance or cash, unsuitable product, poor location, poor marketing.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** things a new business can do to increase its chances of success.",
    points: [
      "Market research / business plan / keep records / control cash / quality and USP.",
      "Explains how it reduces a risk of failure.",
      "Second action.",
      "Explains how it reduces a risk of failure.",
    ],
    hints: ["Link each action to a cause of failure it prevents."],
    modelAnswer: "It can carry out market research before opening, so it sells a product customers want at a price they will pay. It can prepare a cash budget, so it knows when cash will be short and can arrange finance in advance instead of running out of money.",
    explanation: "Success comes from planning, research, records, cash control, quality and adaptability.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Farai opened a mobile-phone repair shop in Chinhoyi eighteen months ago. He is skilled at repairs but does not keep records, and often lets customers pay \"next week\". He buys large quantities of spare parts to get discounts, but many are for old phone models. Last month a large electronics store opened nearby offering repairs at lower prices. Farai cannot pay his rent this month.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "Identify **three** internal causes of Farai's problems from the case.",
        points: ["No records kept.", "Too much credit given to customers.", "Too much / unsuitable stock (parts for old models)."],
        modelAnswer: "He keeps no records, he gives too much credit to customers, and he holds too much stock, much of it for old phone models.",
      }),
      P.short({ label: "(b)", marks: 1, stem: "State the external cause of Farai's problems.", accepted: ["competition", "new competitor", "a new competitor", "competition from the electronics store", "new competition"], wrong: ["poor records"] }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain why Farai cannot pay his rent even though he has many customers.",
        points: [
          "Cash is tied up in debts owed by customers who pay late.",
          "Cash is tied up in stock of spare parts, some of which will not sell.",
          "So he has little cash available although he has sales.",
          "Without records he did not see the problem coming.",
        ],
        modelAnswer: "Much of Farai's money is owed by customers who pay late, and much is tied up in spare parts, some for old models that may never sell. So although he has many customers, little cash is available to pay the rent, and without records he did not see this coming.",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend **two** actions Farai should take to avoid failure. Justify each.",
        points: [
          "Action on cash: stop or limit credit / chase debts.",
          "Justified: brings cash in quickly to pay rent.",
          "Action on records / stock / competition (e.g. sell old stock at a discount, buy parts only when needed, stress skill and service).",
          "Justified with reference to the case.",
        ],
        modelAnswer: "First, Farai should stop giving credit and collect what customers owe him, because this brings in cash at once to pay the rent. Second, he should start keeping daily records of sales, costs and debts and buy spare parts only for current models, so he knows his position and does not tie up cash in stock that will not sell.",
      }),
    ],
    hints: ["(a) Look for what Farai himself does wrong.", "(c) Where has his money gone?"],
    explanation: "(a) No records, too much credit, unsuitable stock. (b) Competition. (c) Cash is tied up in debtors and stock. (d) Credit control, records and stock control.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A newspaper article states: \"Most small businesses in Zimbabwe fail because of things outside their control, such as economic changes and competition from large firms.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** external causes of business failure.",
        points: [
          "Economic change (recession, inflation, interest rates).",
          "Explains effect: e.g. falling incomes reduce demand / higher costs.",
          "Competition / government policy / natural disasters.",
          "Explains effect.",
        ],
        modelAnswer: "In a recession, customers' incomes fall, so demand for many products falls and small businesses lose sales. A large competitor can buy in bulk and charge lower prices, so customers switch away from a small business.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Do you agree with the article? Justify your answer.",
        points: [
          "External causes are real and can hit small firms hard (little reserve of finance).",
          "But many failures have internal causes: poor records, poor cash control, unsuitable products.",
          "Internal weaknesses make businesses less able to survive external shocks.",
          "Example of a business surviving external change through good management.",
          "Considers that internal causes can be controlled / solved.",
          "Justified conclusion.",
        ],
        modelAnswer: "External causes such as recession and competition from large firms do cause failures, and small firms have little finance to survive them. However, many small businesses fail because of internal weaknesses: poor records, too much credit, too much stock and products customers do not want. These weaknesses also leave businesses unable to cope when the economy changes, while well-managed firms that keep records and a cash reserve often survive the same conditions. I partly disagree with the article: external factors often trigger failure, but internal weaknesses are usually the underlying cause, and those are within the owner's power to fix.",
      }),
    ],
    hints: ["(b) Would a well-managed business survive the same external problems?"],
    explanation: "External causes trigger many failures, but internal weaknesses usually decide whether a business survives them.",
  });
  b.card("DEFINITION", "What is **insolvency**?", "Being unable to pay debts when they fall due.");
  b.card("FACT", "Internal causes of failure?", "Poor management, poor records, lack of finance or cash, unsuitable product, poor location, poor marketing.");
  b.card("FACT", "External causes of failure?", "Low demand, economic change (recession, inflation, interest rates), competition, government policy, natural disasters.");
  b.card("CONCEPT", "Why are new businesses at greater risk?", "Inexperience, little finance, few loyal customers, cash-flow problems, established rivals.");
  b.card("CONCEPT", "Can a profitable business fail?", "Yes: if it runs out of cash (e.g. customers pay late, too much stock), it cannot pay its debts.");
  b.card("CONCEPT", "Factors in business success?", "Market research, planning, good records, cash control, quality and USP, adaptability, good management.");
  b.card("CONCEPT", "Solution to poor record keeping?", "Keep daily records, use a bookkeeper or simple software, separate business and personal money.");
  b.card("DEFINITION", "What is **liquidation**?", "Closing a company and selling its assets to pay its creditors.");
});
