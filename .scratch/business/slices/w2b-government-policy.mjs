// W2b: effects of government economic policy (Cambridge only). All rates are stated as assumptions.
import { concept, P, money, round } from "../lib.mjs";

const gp = 64000, t1 = 20, t2 = 28;
const after1 = round(gp * (1 - t1 / 100), 2), after2 = round(gp * (1 - t2 / 100), 2); // 51200, 46080
const loan = 75000, r1 = 6, r2 = 9;
const extraInt = loan * (r2 - r1) / 100; // 2250
const wage = 850, it1 = 15, it2 = 22;
const dropPerWorker = round(wage * (it2 - it1) / 100, 2); // 59.5
// struct
const sLoan = 120000, sR1 = 7, sR2 = 11, sProfit = 31000;
const sInt1 = sLoan * sR1 / 100, sInt2 = sLoan * sR2 / 100; // 8400, 13200
const sProfit2 = sProfit - (sInt2 - sInt1); // 26200

concept("bus.economy.government-policy", { file: "economy/government-policy", keyPrefix: "economy.government-policy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is fiscal policy?",
    options: [
      ["Government decisions on taxation and government spending", "Correct: fiscal policy uses taxes and spending."],
      ["Central bank decisions on interest rates and the money supply", "That is monetary policy."],
      ["A business's decisions on prices", "That is a pricing policy of a business."],
      ["Rules on how companies are formed", "That is company law."],
    ],
    answer: "A",
    explanation: "**Fiscal policy** = taxation and government spending. **Monetary policy** = interest rates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a rise in income tax usually affect a business that sells televisions?",
    options: [
      ["Sales fall because customers have less disposable income", "Correct: televisions are not necessities, so demand falls."],
      ["Its tax on profits rises immediately", "Income tax is paid by individuals, not on business profits."],
      ["Sales rise because customers save less", "Higher income tax leaves customers less to spend."],
      ["It has no effect because businesses do not pay income tax", "The business is affected through its customers."],
    ],
    answer: "A",
    explanation: "Higher **income tax** reduces **disposable income**, so customers spend less, especially on goods they can do without.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "The government increases spending on building clinics. Which business is most likely to benefit directly?",
    options: [
      ["A construction company", "Correct: it may win contracts to build the clinics."],
      ["A hair salon", "A salon gains little directly from clinic building."],
      ["A cinema", "Cinemas are not linked to clinic construction."],
      ["A travel and tours agent", "Travel agents are not linked to clinic construction."],
    ],
    answer: "A",
    explanation: "Higher **government spending** on infrastructure creates contracts for construction firms and their suppliers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the most likely effect of a rise in interest rates on a business with a large variable-rate loan?",
    options: [
      ["Its interest payments rise and profit falls", "Correct: borrowing becomes more expensive."],
      ["Its interest payments fall and profit rises", "That would follow a fall in interest rates."],
      ["Its loan is cancelled by the bank", "A rate rise does not cancel a loan."],
      ["Its sales automatically rise", "Customers usually spend less when rates rise."],
    ],
    answer: "A",
    explanation: "A higher interest rate increases the cost of the loan, so **interest payments rise and profit falls**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which product's sales are likely to fall most after a rise in interest rates?",
    options: [
      ["New cars, which are often bought on credit", "Correct: higher rates make credit dearer."],
      ["Bread, which is a necessity", "Bread is a necessity bought with cash."],
      ["Salt, which is a cheap necessity", "Demand for salt barely changes."],
      ["Matches, which are cheap everyday items", "These are cheap items not bought on credit."],
    ],
    answer: "A",
    hints: ["Which product do customers usually borrow money to buy?"],
    explanation: "Goods usually bought **on credit** become more expensive to finance, so their demand falls most.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main effect on a business of a rise in the tax on profits?",
    options: [
      ["Less profit after tax to pay owners or reinvest", "Correct: more of the profit goes to the government."],
      ["Higher prices for all the raw materials it buys", "Tax on profits does not change material prices."],
      ["More customers because prices fall", "Tax on profits does not lower prices."],
      ["Lower wages paid to its workers", "Wages are not directly changed by tax on profits."],
    ],
    answer: "A",
    explanation: "Higher tax on profits leaves **less profit after tax** for dividends and for retained profit to invest.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Interest rates rise. Which response by a business is most sensible?",
    options: [
      ["Use retained profit instead of a new loan to pay for expansion", "Correct: this avoids the dearer borrowing."],
      ["Take out a larger loan immediately", "Loans are now more expensive."],
      ["Increase stock levels using an overdraft", "Overdrafts are more costly when rates rise."],
      ["Offer customers longer credit funded by bank borrowing", "This increases the business's own borrowing costs."],
    ],
    answer: "A",
    hints: ["Which option avoids paying the higher interest?"],
    explanation: "When borrowing is dearer, businesses use **internal finance**, repay debt, reduce stock and delay non-essential investment.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Assume the government raises the tax on spending (VAT). What is the most likely effect on a shop selling soft drinks?",
    options: [
      ["Prices rise, so sales fall", "Correct: the tax is added to the price customers pay."],
      ["Its tax on profits falls", "VAT is a separate tax on spending."],
      ["Demand rises as customers stock up permanently", "Higher prices reduce demand over time."],
      ["Its costs of borrowing fall", "VAT does not affect interest rates."],
    ],
    answer: "A",
    explanation: "A higher **tax on spending** raises prices, so demand falls unless the business absorbs part of the tax.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Interest rate decisions are part of monetary policy.",
    answer: true,
    explanation: "True. Interest rates are set (usually by the central bank) as monetary policy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A cut in government spending always increases demand for businesses' products.",
    answer: false,
    explanation: "False. Cuts usually reduce demand: fewer government contracts and lower incomes for public sector workers.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each policy change with its most likely effect on businesses.",
    pairs: [
      ["Lower interest rates", "Cheaper loans encourage investment"],
      ["Higher income tax", "Customers have less disposable income"],
      ["Higher tax on profits", "Less retained profit for expansion"],
      ["More spending on roads", "Contracts for construction firms"],
    ],
    explanation: "Each policy works through costs, customers' spending or government demand.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "Income left after paying income tax is called {{blank:a}} income. The cost of borrowing money is called the {{blank:b}} rate.",
    blanks: [
      { id: "a", accepted: ["disposable"], choices: ["disposable", "gross", "retained", "fixed"] },
      { id: "b", accepted: ["interest"], choices: ["interest", "exchange", "tax", "inflation"] },
    ],
    explanation: "**Disposable** income; **interest** rate.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A company makes a profit of ${money(gp)}. Assume the tax on profits rises from ${t1}% to ${t2}%. Calculate the company's profit after tax at the new rate.`,
    kind: "money", value: after2, wrong: [after1, gp * t2 / 100],
    explanation: `Tax = ${t2}% × ${money(gp)} = ${money(gp * t2 / 100)}; profit after tax = ${money(gp)} − ${money(gp * t2 / 100)} = ${money(after2)} (down from ${money(after1)}).`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A bakery has a loan of ${money(loan)}. Assume the annual interest rate rises from ${r1}% to ${r2}%. Calculate the increase in its annual interest payment.`,
    kind: "money", value: extraInt, wrong: [loan * r2 / 100, r2 - r1],
    hints: ["Work out the interest at each rate, then subtract."],
    explanation: `${r1}%: ${money(loan * r1 / 100)}; ${r2}%: ${money(loan * r2 / 100)}; increase = ${money(extraInt)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A worker earns ${money(wage)} a month. Assume income tax rises from ${it1}% to ${it2}% of this income. Calculate the fall in the worker's monthly disposable income.`,
    kind: "money", value: dropPerWorker, wrong: [wage * it2 / 100],
    hints: ["The fall equals the extra percentage points of tax on the wage."],
    explanation: `Disposable income falls from ${money(wage * (1 - it1 / 100))} to ${money(round(wage * (1 - it2 / 100), 2))}, a fall of ${money(dropPerWorker)} a month, which reduces spending in local businesses.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** ways a rise in interest rates could affect a furniture retailer.",
    points: [
      "Customers buying on credit face higher repayments.",
      "So demand for furniture falls.",
      "Retailer's own loans / overdraft cost more.",
      "So profit falls / expansion delayed.",
    ],
    hints: ["Consider customers and the retailer's own borrowing."],
    modelAnswer: "Many customers buy furniture on credit, so higher interest rates raise their repayments and fewer people buy furniture. The retailer's own overdraft also costs more, which reduces its profit and may make it delay opening a new branch.",
    explanation: "Interest rates affect both the business's costs and its customers' spending.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain **two** ways a business could respond to a rise in income tax.",
    points: [
      "Lower prices / offer cheaper products or smaller packs.",
      "Keeps customers whose disposable income has fallen.",
      "Promotions / focus on necessities / target less affected customers / cut costs.",
      "Explains how it protects sales or profit.",
    ],
    hints: ["Customers now have less to spend."],
    modelAnswer: "The business could introduce cheaper products or smaller pack sizes, so customers with less disposable income can still afford to buy. It could also cut its own costs, so that it can keep prices low without losing too much profit.",
    explanation: "Responses: cheaper products, promotions, cost-cutting, new target markets.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 960,
    stem: `Kwekwe Motors (a fictional business) sells second-hand cars, mostly on credit, and has a business loan of ${money(sLoan)}. Its profit last year was ${money(sProfit)}. Assume that the central bank has raised the interest rate on business loans from ${sR1}% to ${sR2}% a year to reduce inflation.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the increase in Kwekwe Motors' annual interest payment.", kind: "money", value: sInt2 - sInt1, wrong: [sInt2] }),
      P.num({ label: "(b)", marks: 1, stem: "Assuming nothing else changes, calculate Kwekwe Motors' new profit.", kind: "money", value: sProfit2, wrong: [sProfit - sInt2] }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** other ways the rise in interest rates may affect Kwekwe Motors.",
        points: [
          "Customers buy cars on credit, so their repayments rise.",
          "So fewer customers buy cars / sales fall.",
          "Less investment / customers save more / delay expanding the showroom.",
          "Explains the effect on revenue or growth.",
        ],
        modelAnswer: "Most customers buy on credit, so higher interest rates make their repayments larger and many will delay buying a car, cutting sales. The business may also delay its own expansion plans, because new borrowing has become more expensive.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend how Kwekwe Motors should respond to the rise in interest rates. Justify your answer.",
        points: [
          "Repay part of the loan using retained profit / cash, reducing interest.",
          "Reduce stock of cars to cut costs and free cash.",
          "Offer cheaper cars or lower-deposit deals to keep sales.",
          "Consider the cost and risk of each option.",
          `Uses the figures: interest up by ${money(sInt2 - sInt1)}, profit down to ${money(sProfit2)}.`,
          "Justified recommendation.",
        ],
        modelAnswer: `The rate rise adds ${money(sInt2 - sInt1)} a year to Kwekwe Motors' interest, cutting profit to ${money(sProfit2)}, and its credit customers will buy fewer cars. It should reduce the number of cars it holds in stock, selling slower models at a small discount; this frees cash, which it can use to repay part of the loan and reduce its interest bill. It should focus on cheaper cars, which customers can still afford with higher repayments. Repaying debt is the best single step, because it reduces costs for as long as rates stay high, while cutting stock protects it against falling sales.`,
      }),
    ],
    hints: ["(a) Interest at the new rate − interest at the old rate.", "(b) Subtract the extra interest from last year's profit."],
    explanation: `(a) ${money(sInt2)} − ${money(sInt1)} = ${money(sInt2 - sInt1)}. (b) ${money(sProfit)} − ${money(sInt2 - sInt1)} = ${money(sProfit2)}. (c) Lower demand from credit customers; delayed investment. (d) Reduce debt and stock, cheaper cars.`,
    workedSolution: `1. Interest at ${sR1}% = ${sLoan.toLocaleString("en-GB")} × ${sR1} ÷ 100 = ${sInt1.toLocaleString("en-GB")}.\n2. Interest at ${sR2}% = ${sLoan.toLocaleString("en-GB")} × ${sR2} ÷ 100 = ${sInt2.toLocaleString("en-GB")}.\n3. Increase = ${(sInt2 - sInt1).toLocaleString("en-GB")}; new profit = ${sProfit.toLocaleString("en-GB")} − ${(sInt2 - sInt1).toLocaleString("en-GB")} = ${sProfit2.toLocaleString("en-GB")}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "The government announces two policies for next year: a cut in income tax, and a cut in government spending on new roads and school buildings. Ruvimbo Construction (a fictional business) builds roads and schools for the government. Bright Shoes (a fictional business) sells fashionable shoes to young adults.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain how each policy is likely to affect Bright Shoes.",
        points: [
          "Income tax cut raises disposable income.",
          "Young adults spend more on fashion shoes, so sales rise.",
          "Spending cut has little direct effect on Bright Shoes.",
          "But public sector workers or construction workers may lose income, reducing demand slightly.",
        ],
        modelAnswer: "The cut in income tax gives customers more disposable income, so young adults are likely to spend more on fashionable shoes and Bright Shoes' sales should rise. The cut in government spending affects it only indirectly: if construction workers lose jobs, some customers will have less to spend.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Which business will be affected more by the two policies? Justify your answer.",
        points: [
          "Ruvimbo depends on government contracts; cut in spending reduces its orders directly.",
          "Ruvimbo may have to cut staff, find private clients or bid for fewer contracts.",
          "Bright Shoes gains from the income tax cut; fashion goods respond strongly to income.",
          "Ruvimbo may gain a little from the tax cut (private building) but not enough to offset lost contracts.",
          "Compares size and directness of the effects.",
          "Justified conclusion.",
        ],
        modelAnswer: "Ruvimbo Construction will be affected more. It depends on government contracts for roads and schools, so a cut in this spending directly removes much of its work; it may have to lay off workers and look for private clients, which will take time. The income tax cut might slightly increase private building, but not enough to replace government orders. Bright Shoes is affected mainly by the income tax cut, which helps it, because fashion goods sell more when disposable income rises. So the policies are a serious threat to Ruvimbo but a small benefit to Bright Shoes.",
      }),
    ],
    hints: ["(b) Which business depends directly on the government as a customer?"],
    explanation: "Tax cuts raise demand through disposable income; spending cuts hit businesses that depend on government contracts.",
  });
  b.card("DEFINITION", "**Fiscal policy**?", "Government decisions on taxation and government spending.");
  b.card("DEFINITION", "**Monetary policy**?", "Decisions on interest rates (and money supply), usually by the central bank.");
  b.card("DEFINITION", "**Disposable income**?", "Income left to spend or save after income tax.");
  b.card("CONCEPT", "Effect of higher tax on profits?", "Less profit after tax for owners and for reinvestment; may discourage investment.");
  b.card("CONCEPT", "Effect of higher income tax?", "Lower disposable income, lower demand (especially luxuries); workers may ask for pay rises.");
  b.card("CONCEPT", "Effects of a rise in interest rates?", "Dearer loans, lower profit, less investment, lower consumer spending (esp. credit purchases), more saving.");
  b.card("CONCEPT", "Effect of more government spending?", "More contracts and demand (construction, suppliers), better infrastructure, more income for public workers.");
  b.card("CONCEPT", "Responses to higher interest rates?", "Repay loans, use retained profit, reduce stock, delay expansion, cheaper products.");
});
