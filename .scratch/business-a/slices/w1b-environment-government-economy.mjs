// W1b: environment.government-economy
import { concept, P, chk, money, CAM } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.environment.government-economy", { file: "environment/government-economy", keyPrefix: "environment.government-economy" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a way in which a government **helps** business?",
    ok: ["Giving grants to new small businesses", "Correct: grants and subsidies reduce start-up costs."],
    bad: [["Raising taxes on company profits", "A higher profit tax constrains business."], ["Setting a maximum price for bread", "A price control constrains business."], ["Limiting the number of import licences", "Quotas and licences constrain business."]],
    explanation: "Grants, subsidies, tax breaks, training and infrastructure help business; taxes, price controls and quotas constrain it.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which pair are the main macroeconomic objectives of a government?",
    ok: ["Low unemployment with low inflation", "Correct: with economic growth, these are the main objectives."],
    bad: [["High unemployment and high inflation", "These are conditions governments try to avoid."], ["High taxes and low government spending", "These are policy tools, not macroeconomic objectives."], ["Many monopolies and few small firms", "These are market structures, not objectives."]],
    explanation: "The main objectives are low unemployment, low and stable inflation and economic growth.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A rise in interest rates is an example of which type of policy?",
    ok: ["Monetary policy", "Correct: monetary policy works through interest rates and the money supply."],
    bad: [["Fiscal policy", "Fiscal policy uses taxes and government spending."], ["Supply-side policy", "Supply-side policy raises the capacity of the economy, for example through training."], ["Competition policy", "Competition policy controls monopolies and mergers."]],
    explanation: "Changes in interest rates are monetary policy.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A firm has borrowed heavily at a variable rate of interest. What is the **most likely** effect of a rise in interest rates?",
    ok: ["Its interest costs rise and its profit falls", "Correct: loan costs increase, reducing profit."],
    bad: [["Its interest costs fall and its profit rises", "A rise in interest rates increases, not reduces, interest costs."], ["Its sales to customers rise because loans are cheaper", "Higher rates make customer borrowing dearer, which reduces spending."], ["Its tax payments to the government are removed", "Interest rates do not remove taxes."]],
    explanation: "A variable-rate borrower pays more interest when rates rise, so profit falls.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The currency of a country weakens against other currencies. Which firm is **most likely to gain**?",
    ok: ["An exporter of tobacco to many other countries", "Correct: exports become cheaper for foreign buyers."],
    bad: [["An importer of machinery from other countries", "Imports become dearer, so the importer loses."], ["A firm that has borrowed in a foreign currency", "Foreign debt becomes dearer in the home currency."], ["A shop selling only foreign-made luxury goods", "Its stock costs more to buy."]],
    hints: ["A weak currency lowers the foreign price of goods sold abroad."],
    explanation: "A weaker currency makes exports cheaper abroad and imports dearer.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "Smoke from a fictional factory harms the health of people who live nearby but the firm does not pay for the harm. This is an example of",
    ok: ["a negative externality on other people", "Correct: a cost falls on people outside the transaction."],
    bad: [["a public good provided by the state", "A public good is a good such as street lighting that the market will not supply."], ["a monopoly price paid by a customer", "Monopoly is about market power, not harm to outsiders."], ["a subsidy received from the government", "A subsidy is a payment to the firm, not a harm to others."]],
    hints: ["Who bears the cost of the smoke, and are they party to the sale?"],
    explanation: "A cost that falls on third parties is a negative externality, one form of market failure.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why might a rise in the rate of sales tax reduce the sales of a fictional furniture maker?",
    ok: ["The price buyers pay rises, so some of them buy less", "Correct: higher prices reduce the quantity demanded."],
    bad: [["The government stops all furniture from being made", "A tax rise does not forbid production."], ["The furniture maker's costs of wood fall automatically", "A sales tax does not lower the cost of wood."], ["Buyers receive a refund for each piece of furniture", "A tax does not give refunds to buyers."]],
    hints: ["Think about what the tax does to the price that the customer pays."],
    explanation: "A higher sales tax raises the price to buyers, which reduces demand, especially for non-essential items.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the **best-supported** judgement on whether a government grant will help a new fictional bakery to succeed?",
    ok: ["It helps with start-up cost, but success still depends on demand and management", "Correct: it recognises the benefit and its limits."],
    bad: [["It guarantees that the bakery will make a profit in every year", "No grant can guarantee profit in every year."], ["It is useless because grants never reduce costs of any kind", "Grants do reduce costs, so the claim is false."], ["It matters more than customers, who are not important", "Customers' demand decides revenue, so they are essential."]],
    hints: ["Look for the answer that gives the benefit and the limit."],
    explanation: "A grant eases costs but cannot replace demand, quality and good management.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "High inflation makes it harder for a business to plan its prices and wages.",
    answer: true,
    explanation: "True. When prices rise quickly, costs, prices and wage demands change often, which makes planning and contracts uncertain.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Fiscal policy means changing interest rates.",
    answer: false,
    explanation: "False. Fiscal policy means changes in government spending and taxation. Changing interest rates is monetary policy.",
    hints: ["Which policy uses taxes and spending?"],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each government action to the type of policy.",
    pairs: [["Raising the rate of income tax", "Fiscal policy"], ["Lowering the central bank interest rate", "Monetary policy"], ["Funding apprenticeship training", "Supply-side policy"], ["Weakening the domestic currency", "Exchange rate policy"]],
    explanation: "Each action belongs to a distinct type of policy.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "When the home currency weakens, exports become {{blank:a}} for foreign buyers and imports become {{blank:b}} for home buyers.",
    blanks: [
      { id: "a", accepted: ["cheaper"], choices: ["cheaper", "dearer", "free"] },
      { id: "b", accepted: ["dearer"], choices: ["cheaper", "dearer", "free"] },
    ],
    explanation: "A weak currency lowers the foreign price of exports and raises the home price of imports.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** way in which a government can constrain business activity.",
    accepted: ["taxes", "tax", "regulation", "price controls", "licensing", "quotas", "licences", "laws", "import restrictions", "raising taxes"],
    explanation: "Taxes, regulation, price controls, licences and quotas all constrain business.",
  });

  {
    const loan = 50000, r1 = 12, r2 = 14;
    const extra = (loan * (r2 - r1)) / 100;
    chk(extra, 1000, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional firm has a variable-rate loan of ${money(loan)}. The interest rate rises from ${r1}% to ${r2}% a year. By how much does its yearly interest cost increase?`,
      kind: "money", value: extra, wrong: [(loan * r2) / 100, (loan * r1) / 100],
      explanation: `The rate rises by 2 percentage points. Increase = 50,000 × 2% = US\\$1,000. The new interest of US\\$7,000 is a wrong answer because it is the total, not the increase.`,
    });
  }
  {
    const rand = 27000, rate = 18;
    const usd = rand / rate;
    chk(usd, 1500, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional workshop in Harare imports a machine priced at R${rand.toLocaleString("en-GB")} (rand). The exchange rate is R${rate} for US\\$1. How much does the machine cost in US dollars?`,
      kind: "money", value: usd, wrong: [rand * rate, rand / (rate + 2)],
      hints: ["Divide the rand price by the number of rand per dollar."],
      explanation: `Cost in dollars = 27,000 ÷ 18 = US\\$1,500. Multiplying instead of dividing gives a meaningless figure of 486,000.`,
    });
  }
  {
    const pre = 60, t1 = 10, t2 = 15;
    const price = (pre * (100 + t2)) / 100;
    chk(price, 69, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `A fictional shop sells a jacket for ${money(pre)} before sales tax. The government raises the sales tax rate (an assumed rate) from ${t1}% to ${t2}%. What is the new price paid by the customer?`,
      kind: "money", value: price, wrong: [(pre * (100 + t1)) / 100, pre + t2],
      hints: ["Add the new tax rate to the price before tax."],
      explanation: `Tax = 15% of 60 = US\\$9, so the customer pays 60 + 9 = US\\$69. At the old rate the price would be US\\$66.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a government might give a subsidy to small manufacturers.",
    points: ["It lowers their costs and helps them to compete or start up", "It encourages output and jobs in the economy"],
    modelAnswer: "A subsidy lowers the costs of small manufacturers so that they can start up and compete. This increases output and creates jobs.",
    explanation: "A reason linked to cost and a wider benefit.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tendai, a fictional builder in Masvingo, has borrowed money to buy equipment. Explain **two** ways in which a recession could affect his business.",
    points: ["Demand for new buildings falls as customers cut spending", "Application: fewer building contracts, so revenue falls", "Loan repayments remain fixed while income falls", "Application: cash-flow difficulties, which could threaten survival"],
    modelAnswer: "In a recession customers cut spending, so Tendai wins fewer building contracts and his revenue falls. His loan repayments stay the same, so he may have cash-flow difficulties that could threaten the survival of the firm.",
    hints: ["Think about demand and about fixed repayments."],
    explanation: "Two effects, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a fall in the value of the home currency may affect a firm that imports its raw materials and sells in the home market.",
    points: ["The home price of imported materials rises", "Production costs rise", "The firm must raise prices or accept lower profit", "Higher prices may reduce demand"],
    modelAnswer: "The home price of imported materials rises, so the firm's production costs rise. It must either raise its prices or accept lower profit. If it raises prices, demand may fall, which reduces sales.",
    hints: ["Follow the chain from the exchange rate to cost, price and demand."],
    explanation: "A chain from currency to cost, price and demand.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether a rise in interest rates is bad for all businesses.",
    points: ["Firms with loans face higher interest costs", "Customers who borrow to buy, such as car buyers, spend less", "Firms with large savings or that supply banks may gain", "Effect depends on how much the firm borrows and how sensitive its product is to interest rates", "Judgement with a reason or condition"],
    modelAnswer: "A rise in interest rates raises costs for firms with loans and reduces spending by customers who borrow, such as buyers of cars. Firms with large savings may gain. The effect depends on how much the firm borrows and how far its product depends on credit. On balance most firms with debt lose, but those without borrowing and selling necessities are affected little.",
    hints: ["Consider borrowers, savers and the type of product."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Gweru Farm Supplies sells imported pumps priced in rand to farmers. A pump costs R12,000 from the supplier. The exchange rate changes from R15 to R20 for US\\$1 (assumed rates). The firm also has a loan of US\\$40,000 on which the interest rate rises from 10% to 12% a year.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the cost of one pump in US dollars at the old exchange rate.", kind: "money", value: 12000 / 15, wrong: [12000 * 15, 12000 / 20], explanation: "12,000 ÷ 15 = US\\$800." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the cost of one pump in US dollars at the new exchange rate.", kind: "money", value: 12000 / 20, wrong: [12000 / 15, 12000 * 20], explanation: "12,000 ÷ 20 = US\\$600." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the increase in the yearly interest on the loan.", kind: "money", value: (40000 * 2) / 100, wrong: [(40000 * 12) / 100, (40000 * 10) / 100], explanation: "2% of 40,000 = US\\$800." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the two changes affect the profit of the business.", points: ["The weaker rand makes the pumps cheaper in dollars, which increases profit or allows lower prices", "The higher interest rate raises the cost of the loan, which reduces profit", "Net effect depends on the number of pumps sold: the saving of US\\$200 per pump may outweigh the extra interest"], modelAnswer: "The weaker rand lowers the dollar cost of each pump by US\\$200, which raises profit or allows lower prices. The higher interest rate adds US\\$800 a year to costs. If the firm sells more than four pumps a year the saving outweighs the extra interest.", hints: ["Compare the saving per pump with the extra yearly interest."], explanation: "Two opposite effects and their net result." }),
    ],
    hints: ["Divide rand prices by the rand-per-dollar rate."],
    explanation: "Dollar costs are found from the exchange rates, and the effects on profit are compared.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Zambezi Tourism Lodge (Victoria Falls) earns most of its income from foreign visitors who pay in US dollars. The country enters a period of high inflation, the central bank raises interest rates, and the government announces a new tax on accommodation but also funds a new road to the lodge. The lodge has a loan to build ten new chalets.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain how high inflation could affect the lodge.", points: ["Costs of food, fuel and wages rise", "The lodge may have to raise prices", "Higher dollar prices could deter foreign visitors"], modelAnswer: "Inflation raises the cost of food, fuel and wages. The lodge may raise its prices to cover them, and higher dollar prices could deter some foreign visitors.", explanation: "Costs, price response and demand." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse the effect of the new road on the lodge.", points: ["Travel to the lodge is faster and cheaper", "More visitors may come, raising revenue", "Delivery costs fall for supplies"], modelAnswer: "The road makes travel to the lodge quicker and cheaper, so more visitors may come and revenue rises. Delivery of supplies also becomes cheaper.", hints: ["Think about visitors and about suppliers."], explanation: "Supply-side benefit of infrastructure." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the changes in government policy are, overall, good or bad for the lodge.", points: ["Interest rate rise: higher cost of the chalet loan", "Accommodation tax: higher price to visitors or lower margin", "Road: more visitors and lower costs", "Inflation: higher operating costs but income in dollars is stable", "Size of effects depends on loan size and ability to raise prices", ["Judgement that weighs the changes", 2], ["A condition or time-frame", 1]], modelAnswer: "The interest rate rise and the tax raise the lodge's costs or prices, and inflation lifts its operating costs, so there are real threats. The road could bring more visitors and cut supply costs, which is a lasting benefit. Because most income is in dollars, inflation hurts less than it would a firm earning in a weaker currency. Overall the road is likely to offset the costs if visitor numbers rise enough, but the lodge should watch its loan repayments in the first year and raise prices carefully so that it does not deter its foreign visitors.", hints: ["Weigh each change, then give a judgement and a condition."], explanation: "Policies weighed with the case and a conditional judgement.", levels: [[1, 1, 3, "Lists the policies with little link to the lodge."], [2, 4, 6, "Applies the policies and weighs several effects."], [3, 7, 8, "A justified overall judgement with a condition."]] }),
    ],
    hints: ["Consider costs, demand and the time period."],
    explanation: "The economic changes are explained, and their combined effect evaluated.",
  });

  b.card("FACT", "How governments help business", "Grants and subsidies, tax breaks, training, infrastructure, advice and credit for small firms, and government contracts.");
  b.card("FACT", "How governments constrain business", "Taxes, regulation, price controls, licences and quotas.");
  b.card("DEFINITION", "Market failure", "A situation where free markets fail to allocate resources efficiently: externalities, public goods and monopoly power.", undefined, { applies: CAM });
  b.card("FACT", "Macroeconomic objectives", "Low unemployment, low and stable inflation and economic growth.");
  b.card("CONCEPT", "Monetary policy", "Changes in interest rates or the money supply. A rise in rates makes loans dearer and reduces spending.");
  b.card("CONCEPT", "Fiscal policy", "Changes in government spending and taxation, for example a higher tax rate or more spending on roads.");
  b.card("CONCEPT", "Supply-side policy", "Measures to raise the productive capacity of the economy, such as training, education and infrastructure.");
  b.card("CONCEPT", "Exchange rate effects", "A weaker home currency makes exports cheaper abroad and imports dearer; a stronger currency does the opposite.");
});
