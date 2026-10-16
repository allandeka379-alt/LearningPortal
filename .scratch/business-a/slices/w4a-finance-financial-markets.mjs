// W4a: finance.financial-markets (ZIMSEC Business Studies only; auto-tagged ZBS)
// Conventions: broker fees are a % of the value of each purchase and each sale; market capitalisation = shares in issue x share price.
// All share prices, rates and fees are assumptions in the stems; companies are fictional.
import { concept, P, table, money, chk, r2, rd, pctChange } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.finance.financial-markets", { file: "finance/financial-markets", keyPrefix: "finance.financial-markets" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The **money market** deals mainly with",
    ok: ["short-term borrowing and lending", "Correct: usually for periods of up to one year."],
    bad: [["long-term loans for buildings", "Long-term finance belongs to the capital market."], ["the sale of company shares for many years", "Shares are traded in the capital market."], ["foreign exchange for tourists only", "The money market is not limited to foreign exchange."]],
    explanation: "The money market handles short-term funds, usually up to a year, through deposits and treasury bills.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the role of the **Zimbabwe Stock Exchange**?",
    ok: ["A market for buying and selling shares", "Correct: shares of listed companies are traded there."],
    bad: [["To print new money for the government", "Printing currency is not the role of a stock exchange."], ["To collect company taxes from firms", "Tax collection is a government function."], ["To set the wages for workers in all firms", "A stock exchange does not set wages."]],
    explanation: "A stock exchange is a market in which shares and other securities of listed companies are bought and sold.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which institution lends to countries that have difficulty paying for imports or debts, usually with conditions on economic policy?",
    ok: ["The International Monetary Fund", "Correct: the IMF supports financial stability."],
    bad: [["A commercial bank lending to firms", "Commercial banks lend to individuals and businesses, not to governments in this way."], ["A building society for housing", "A building society mainly lends for housing."], ["The Zimbabwe Stock Exchange", "A stock exchange is a market, not a lender to countries."]],
    hints: ["Which institution is concerned with international financial stability?"],
    explanation: "The IMF promotes international financial stability and lends to countries with payment problems, often with conditions.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a **secondary market** for shares help companies that want to raise money?",
    ok: ["Investors can resell, so they are more willing to buy", "Correct: easier resale makes new shares more attractive."],
    bad: [["It lets the company avoid paying any dividends at all", "A secondary market does not remove dividends."], ["It sets the wages of the company's workers each year", "Share trading does not set wages."], ["It forces investors to hold their shares for ever", "The point is that investors can sell."]],
    hints: ["Why would an investor hesitate to buy shares that could never be sold?"],
    explanation: "A secondary market lets investors sell shares, so they are more willing to buy new shares in the first place.",
  });
  const gain = 0.62 * 6000 - 0.5 * 6000;
  chk(gain, 720);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "An investor buys 6,000 shares in a fictional listed company at US\\$0.50 each and later sells them at US\\$0.62 each. Ignoring fees and dividends, what is her capital gain?",
    ok: [money(gain), "Correct: 6,000 × (0.62 - 0.50)."],
    bad: [[money(3720), "That is the sale value of the shares, not the gain."], [money(3000), "That is the purchase cost, not the gain."], [money(0.12), "That is the gain on one share, not on 6,000."]],
    hints: ["Gain per share × number of shares."],
    explanation: "Gain per share = 0.62 - 0.50 = US\\$0.12. For 6,000 shares = US\\$720.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bakery needs US\\$5,000 for flour for two months and US\\$80,000 for a factory it will use for ten years. Which pairing of markets is most suitable?",
    ok: ["Flour from the money market, the factory from the capital market", "Correct: the periods match the type of market."],
    bad: [["Both from the money market", "A ten-year factory is a long-term need and does not suit short-term finance."], ["Both from the capital market", "Two months of flour is too short for long-term finance."], ["Flour from the capital market, the factory from the money market", "This reverses the matching of period and market."]],
    hints: ["Match short with short and long with long."],
    explanation: "Short-term needs are met in the money market; long-term needs in the capital market.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional medium-sized furniture company in Bulawayo is considering listing on the stock exchange. Which is the strongest argument **against** listing?",
    ok: ["It must disclose information and obey rules", "Correct: listing brings costs and reduces privacy."],
    bad: [["It can never raise any capital by selling shares", "Listing is mainly a way to raise capital."], ["Its shares could not be traded by investors", "Listing is what allows shares to be traded."], ["The company would no longer pay any tax", "Listing does not remove tax."]],
    hints: ["What obligations does a listed company take on?"],
    explanation: "A listing raises capital and status but brings costs, disclosure rules and possible loss of control to new shareholders.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The World Bank and the African Development Bank mainly support development projects.",
    answer: true,
    explanation: "True. Both lend or give support to governments and projects for development, such as roads, water and power.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each institution or market to its role.",
    pairs: [["Commercial bank", "Accepts deposits and gives loans and overdrafts"], ["Capital market", "Long-term finance through shares and bonds"], ["Treasury bill", "A short-term government security in the money market"], ["Building society", "Savings institution that mainly provides home loans"]],
    explanation: "Each institution or market serves a different financial need.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "The market for finance lasting longer than a year is the {{blank:a}} market. New shares are first sold in the {{blank:b}} market.",
    blanks: [
      { id: "a", accepted: ["capital"], choices: ["capital", "money", "labour"] },
      { id: "b", accepted: ["primary"], choices: ["primary", "secondary", "foreign"] },
    ],
    explanation: "Long-term finance is raised in the capital market; new shares are sold in the primary market.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** function of a financial market.",
    accepted: ["providing funds", "provides funds", "raising finance", "trading securities", "buying and selling shares", "setting prices", "price setting", "bringing savers and borrowers together", "spreading risk", "encouraging saving", "providing liquidity", "helps businesses raise capital"],
    explanation: "Accept: providing funds, trading securities, setting prices, linking savers and borrowers, spreading risk or encouraging saving.",
  });

  const cost = r2(2000 * 1.2), fee1 = r2(cost * 0.01), sale = r2(2000 * 1.35), fee2 = r2(sale * 0.01), div = r2(2000 * 0.05);
  const net = r2(sale - fee2 + div - cost - fee1);
  chk(net, 349); chk(r2(net / (cost + fee1) * 100), 14.4, 0.05);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: net, calculator: true, wrong: [r2(sale - cost), r2(sale - cost + div)],
    stem: "A fictional investor buys 2,000 shares in a listed fictional company at US\\$1.20 each and sells them a year later at US\\$1.35 each. The broker charges 1% of the value on each purchase and each sale. She receives a dividend of US\\$0.05 a share. Calculate her net gain over the year.",
    hints: ["Include both broker's fees and the dividend."],
    explanation: "Cost = 2,400 + fee 24 = 2,424. Sale = 2,700 - fee 27 = 2,673. Dividends = 100. Net gain = 2,673 + 100 - 2,424 = US\\$349. Ignoring fees and dividends gives 300; ignoring fees gives 400.",
    workedSolution: "1. Total cost = 2,000 × 1.20 = 2,400, plus 1% fee 24 = 2,424.\n2. Sale value = 2,000 × 1.35 = 2,700, less 1% fee 27 = 2,673.\n3. Dividends = 2,000 × 0.05 = 100.\n4. Net gain = 2,673 + 100 - 2,424 = US\\$349.",
  });
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: r2(net / (cost + fee1) * 100), dp: 1, calculator: true, wrong: [12.5, 14.4 * 2],
    stem: "Using the net gain of US\\$349 on a total cost of US\\$2,424, calculate the investor's percentage return on cost, to one decimal place.",
    hints: ["Net gain ÷ total cost × 100."],
    explanation: "349 ÷ 2,424 × 100 = 14.4%. Using the price of the shares only (2,400) would give 14.5%.",
  });
  const depInterest = r2(15000 * 0.06 * 9 / 12);
  chk(depInterest, 675);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: depInterest, calculator: true, daily: true, wrong: [900, 1350],
    stem: "A fictional dairy in Gweru places US\\$15,000 on a 9-month bank deposit at 6% a year. Calculate the interest earned over the 9 months.",
    hints: ["Interest for a part year = amount × rate × months ÷ 12."],
    explanation: "15,000 × 6% × 9 ÷ 12 = US\\$675. A full year's interest would be US\\$900.",
  });
  const tbill = r2(10000 - 9700);
  chk(tbill, 300);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: r2(tbill / 9700 * 100), dp: 1, calculator: true, wrong: [3, 2.5],
    stem: "A fictional business buys a treasury bill for US\\$9,700 that will be repaid at its face value of US\\$10,000 on maturity. Calculate the return over the period as a percentage of the amount paid, to one decimal place.",
    hints: ["Return = gain ÷ amount paid."],
    explanation: "Gain = 10,000 - 9,700 = 300. Return = 300 ÷ 9,700 × 100 = 3.1%. Dividing by the face value gives 3.0%.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between the money market and the capital market.",
    points: ["The money market deals in short-term funds, usually up to a year", "The capital market deals in long-term funds, over a year", "Examples: treasury bills in the money market; shares and bonds in the capital market"],
    modelAnswer: "The money market deals in short-term funds, usually for up to a year, such as treasury bills and deposits. The capital market deals in long-term funds, for more than a year, such as shares and bonds.",
    hints: ["Compare the periods and give an example of each."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional mining-supplies company in Bulawayo wants to raise capital by listing on the stock exchange. Explain two benefits of listing.",
    points: ["It can raise a large amount of capital by selling shares to investors", "Application: money for new machinery or a larger warehouse without bank borrowing", "Shares can be bought and sold easily, which makes them attractive", "Application: investors will buy the shares because they can sell them later if they need cash"],
    modelAnswer: "Listing allows the company to raise a large amount of capital by selling shares, which could pay for new machinery or a larger warehouse without bank borrowing. It also makes shares easy to buy and sell, so investors will buy them more readily because they can sell later if they need cash.",
    hints: ["Link each benefit to raising money and trading shares."],
    explanation: "Two benefits, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how commercial banks help small businesses.",
    points: ["They provide loans for equipment and buildings", "They provide overdrafts to cover short-term cash shortages", "They provide payment services that make it easy to receive and make payments", "As a result, small businesses can start, trade and grow where they would otherwise lack funds"],
    modelAnswer: "Commercial banks provide loans for equipment and buildings, and overdrafts to cover short-term cash shortages. They also provide payment services that make it easy to receive and make payments. As a result small businesses can start, trade and grow where they would otherwise lack funds.",
    hints: ["Name services, then say what they allow small businesses to do."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional government department in Zimbabwe is deciding whether to borrow from the World Bank for a new water project. Assess the benefits and drawbacks of this decision for businesses.",
    points: ["The project may improve water supply, helping businesses that need water", "Borrowing may provide funds that the country cannot raise otherwise", "The loan has to be repaid with interest, which could raise taxes or reduce other spending", "Conditions attached to the loan may restrict government policy", "Counter-argument: better infrastructure may raise output and tax income to repay the loan", "Judgement with a reason, for example worthwhile if the project is productive and the repayments can be afforded"],
    modelAnswer: "The project may improve water supply, helping businesses that need water, and the loan may supply funds that the country cannot raise otherwise. But the loan has to be repaid with interest, which could raise taxes or reduce other spending, and conditions may restrict policy. Better infrastructure may raise output and tax income enough to repay the loan. The decision is worthwhile if the project is productive and the repayments can be afforded.",
    hints: ["Weigh the benefit to business against the cost of repayment."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const buy = 4000 * 0.8, f = r2(buy * 0.015);
  chk(buy, 3200); chk(f, 48);
  const sell = 4000 * 0.9, f2 = r2(sell * 0.015);
  chk(sell, 3600); chk(f2, 54);
  const gain2 = r2(sell - f2 - buy - f);
  chk(gain2, 298);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional investor buys 4,000 shares in a listed fictional company at US\\$0.80 each. The broker charges 1.5% of the value on each purchase and each sale. After a year she sells the shares at US\\$0.90 each. She receives no dividends.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: buy + f, wrong: [buy, 3600], stem: "Calculate the total cost of buying the shares, including the broker's fee.", explanation: "4,000 × 0.80 = 3,200. Fee = 1.5% × 3,200 = 48. Total = US\\$3,248." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: gain2, wrong: [400, 3600 - 3200 - 54], stem: "Calculate her net gain, after both broker's fees.", explanation: "Sale value 3,600 - fee 54 = 3,546. Net gain = 3,546 - 3,248 = US\\$298.", workedSolution: "1. Cost = 3,200 + 48 = 3,248.\n2. Proceeds = 3,600 - 54 = 3,546.\n3. Net gain = 3,546 - 3,248 = US\\$298." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain two risks of investing in shares compared with a bank deposit.", points: ["The share price can fall, so the investor may lose money", "Application: if the price had fallen to US\\$0.70 she would have lost, after fees, more than US\\$400", "Dividends are not guaranteed", "The shares may be hard to sell quickly at a good price if few buyers are interested"], modelAnswer: "The share price can fall, so the investor may lose money; if it had fallen to US\\$0.70 she would have lost more than US\\$400 after fees. Dividends are also not guaranteed, whereas a deposit pays a known rate of interest.", explanation: "Two risks, one applied." }),
    ],
    hints: ["Include the fee on both the purchase and the sale.", "Compare shares with the certainty of a deposit."],
    explanation: "Cost US\\$3,248; net gain US\\$298; shares carry price and dividend risk.",
  });

  // Practice structured 2 (14 marks)
  const sh = 12_000_000, pr = 0.35, mcap = sh * pr;
  chk(mcap, 4_200_000);
  const newSh = 3_000_000, priceNew = 0.34, raise = newSh * priceNew;
  chk(raise, 1_020_000);
  const pctNew = r2((newSh / (sh + newSh)) * 100);
  chk(pctNew, 20);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional company listed on the Zimbabwe Stock Exchange has ${sh.toLocaleString("en-GB")} shares in issue, each priced at ${money(pr)}. It plans to issue ${newSh.toLocaleString("en-GB")} new shares at ${money(priceNew)} each to raise money to build a new cold store. Share prices and the issue price are assumptions for the example.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: mcap, wrong: [sh, 420000], stem: "Calculate the company's market capitalisation (shares in issue × share price) before the issue.", explanation: "12,000,000 × 0.35 = US\\$4,200,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: raise, wrong: [newSh, 1_050_000], stem: "Calculate the amount raised by the new issue.", explanation: "3,000,000 × 0.34 = US\\$1,020,000." }),
      P.num({ label: "(c)", marks: 2, kind: "pct", value: pctNew, wrong: [25, 12.5], stem: "Calculate the percentage of the company's shares that the new shares will represent after the issue, to one decimal place.", explanation: "3,000,000 ÷ (12,000,000 + 3,000,000) × 100 = 20.0%." }),
      P.manual({ label: "(d)", marks: 8, stem: "Evaluate whether the company should raise the money for the cold store by issuing shares on the stock exchange.", points: [["The issue raises US\\$1,020,000 with no repayment or interest", 1], ["The new shares are 20% of the company, so existing shareholders' share of ownership and profit falls", 2], ["More shares share the same profit, so earnings per share could fall unless the cold store raises profit", 1], ["Issue costs, rules and disclosure add to cost", 1], ["The price might fall if investors think the project is risky, reducing what is raised", 1], ["Counter-argument: a bank loan would add fixed interest and may not be available for this amount", 1], ["Judgement with a reason: issue shares if the cold store will raise profit enough to benefit all shareholders", 1]], levels: [[3, 6, 8, "Figures used with the case; benefits, dilution and risk weighed; a justified judgement"], [2, 3, 5, "Some figures and some weighing; judgement weakly supported"], [1, 1, 2, "General statements about share issues"]], modelAnswer: "The issue raises US\\$1,020,000 with no repayment or interest. The new shares will be 20% of the company, so existing shareholders' share of ownership and profit falls, and earnings per share could fall unless the cold store raises profit. There are also issue costs and disclosure rules, and the price might fall if investors think the project is risky. A bank loan would add fixed interest and may not be available for this amount. The company should issue the shares if the cold store will raise profit enough to benefit all shareholders.", hints: ["Use the percentage of new shares and the sum raised."], explanation: "Weighs the funds raised against dilution and cost." }),
    ],
    hints: ["Market capitalisation = shares × price.", "New shares ÷ total shares afterwards."],
    explanation: "Market capitalisation US\\$4,200,000; raised US\\$1,020,000; new shares 20%; a judgement on the issue.",
  });

  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional tourism company in Victoria Falls plans to build a new lodge costing US\\$900,000. It also needs US\\$60,000 of working capital for the first season. It has US\\$200,000 of its own funds. A commercial bank will lend up to US\\$300,000. The company is a private limited company, and the owners are considering a stock exchange listing to raise the rest. A regional development fund has offered a loan for tourism projects at a lower rate of interest, but the application takes about a year.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "State three types of institution that could provide finance for the lodge.", points: ["A commercial bank", "A stock exchange (through a share issue to investors)", "A development institution or fund"], modelAnswer: "A commercial bank, the stock exchange (through a share issue) and a development fund could provide finance.", explanation: "One mark for each institution." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse why the working capital and the lodge need different markets.", points: ["The lodge is a long-term asset, so it needs long-term finance from the capital market", "Application: a ten-year bank loan, shares or a development loan would suit the US\\$900,000", "Working capital is a short-term need, so it suits the money market", "Application: an overdraft for the US\\$60,000 to be cleared when guests have paid"], modelAnswer: "The lodge is a long-term asset, so it needs long-term finance from the capital market, such as a ten-year loan, shares or a development loan. Working capital is a short-term need, so it suits the money market, for example an overdraft for the US\\$60,000 which can be cleared when guests have paid.", explanation: "Matches the period of each need to a market." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate how the company should raise the money for the lodge.", points: [["US\\$900,000 is needed: own funds US\\$200,000 and bank US\\$300,000 leave US\\$400,000 still to find", 2], ["A stock exchange listing could raise the remainder but brings costs, rules and loss of control", 2], ["The development fund's loan is cheaper but takes a year, delaying the lodge and its income", 2], ["Combining a smaller bank loan, the development fund and a private share issue spreads the risk", 1], ["Judgement with a reason: use own funds and the bank loan, and pursue the development fund for the rest if the delay is acceptable", 1]], levels: [[3, 6, 8, "Figures used with the case; sources compared for cost, control and speed; a justified judgement"], [2, 3, 5, "Some sources discussed with some application; judgement weakly supported"], [1, 1, 2, "Lists sources with little application"]], modelAnswer: "The lodge costs US\\$900,000, and the company's own funds of US\\$200,000 and the bank's US\\$300,000 leave US\\$400,000 still to find. A stock exchange listing could raise this but brings costs, disclosure rules and a loss of control, which may be too much for a private company. The development fund's loan is cheaper but takes a year, delaying the lodge and the income it would bring. A mixture of a smaller bank loan, the development fund and perhaps a private share issue would spread the risk. The company should use its own funds and the bank loan, and apply to the development fund for the rest if it can accept the delay.", hints: ["Work out the shortfall first."], explanation: "Weighs cost, control and speed for the remaining US\\$400,000." }),
    ],
    hints: ["Work out how much is still to be found."],
    explanation: "Institutions; matching needs to markets; a reasoned financing plan.",
  });

  b.card("DEFINITION", "Financial market", "A market in which funds are raised and lent and securities are traded, linking those with spare money to those who need it.");
  b.card("DEFINITION", "Money market", "The market for short-term funds, usually up to one year (deposits, treasury bills, short-term loans).");
  b.card("DEFINITION", "Capital market", "The market for long-term finance of more than a year (shares, bonds, long-term loans).");
  b.card("CONCEPT", "Primary and secondary markets", "Primary: new shares and bonds are first sold. Secondary: existing securities are traded between investors, which makes them easier to sell.");
  b.card("FACT", "Zimbabwe Stock Exchange", "A market in which shares and other securities of listed companies are bought and sold; listing helps raise capital but brings rules and disclosure.");
  b.card("FACT", "Commercial banks", "Accept deposits, give loans and overdrafts, and provide payment services; the main source of short-term business finance.");
  b.card("FACT", "African Development Bank and World Bank", "Support development projects in African countries (AfDB) and development and poverty reduction (World Bank) through loans, grants and support.");
  b.card("FACT", "International Monetary Fund", "Promotes international financial stability and lends to countries with payment problems, usually with policy conditions.");
  b.card("FORMULA", "Market capitalisation", "Market capitalisation = shares in issue × share price.");
});
