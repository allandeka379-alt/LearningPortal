// W4a: the Zimbabwe Stock Exchange, brokers, jobbers and speculators (COM Form 4).
import { concept, P, money, fmt, r2 } from "../lib.mjs";

concept("bus.finance.stock-exchange", { file: "finance/stock-exchange", keyPrefix: "finance.stock-exchange" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a stock exchange?",
    options: [
      ["A regulated market for buying and selling securities", "Correct: shares, debentures and government stocks."],
      ["A warehouse where goods are stored before sale", "That is a warehouse."],
      ["A bank that issues the national currency", "That is the central bank."],
      ["A market where farmers sell livestock", "Livestock are sold at auctions, not on a stock exchange."],
    ],
    answer: "A",
    explanation: "A stock exchange is an organised, regulated market for securities.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A speculator who buys shares expecting their price to rise is called a:",
    options: [
      ["Bull", "Correct: bulls buy expecting a rise."],
      ["Bear", "Bears sell expecting a fall."],
      ["Stag", "Stags buy new issues to sell quickly."],
      ["Jobber", "A jobber is a dealer, not a type of speculator."],
    ],
    answer: "A",
    explanation: "Bulls push prices up by buying.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Who buys and sells shares for members of the public in return for commission?",
    options: [
      ["A stockbroker", "Correct: the broker acts as the client's agent."],
      ["A jobber", "A jobber deals on its own account."],
      ["A stag", "A stag is a speculator."],
      ["A debenture holder", "A debenture holder is a lender to a company."],
    ],
    answer: "A",
    explanation: "Stockbrokers are agents who earn brokerage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does a jobber (market maker) earn its income?",
    options: [
      ["From the gap between its buying and selling prices", "Correct: the turn or spread."],
      ["From commission charged to members of the public", "That is how brokers earn."],
      ["From interest on loans to companies", "That is a debenture holder's income."],
      ["From fees paid by the government for each trade", "Jobbers are not paid by government."],
    ],
    answer: "A",
    explanation: "Jobbers buy at the bid price and sell at the higher offer price.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which type of business can raise share capital on the Zimbabwe Stock Exchange?",
    options: [
      ["A listed public limited company", "Correct: only listed companies' shares are traded."],
      ["A sole trader", "Sole traders cannot issue shares."],
      ["A partnership", "Partnerships cannot issue shares."],
      ["A registered co-operative society", "Co-operatives are not listed on the exchange."],
    ],
    answer: "A",
    explanation: "Public companies that meet the listing rules can sell shares on the exchange.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does a stock exchange make people more willing to buy shares in the first place?",
    options: [
      ["They know they can sell the shares easily later", "Correct: liquidity reduces the risk of being locked in."],
      ["The exchange guarantees every share's price", "Prices can fall; nothing is guaranteed."],
      ["Shares bought there never lose value", "Share values can fall."],
      ["Dividends are paid by the exchange itself", "Companies pay dividends."],
    ],
    answer: "A",
    explanation: "A market for second-hand shares gives investors liquidity.",
    hints: ["What if an investor needs cash quickly?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Many investors become bears at the same time. What is the likely effect on share prices?",
    options: [
      ["Prices fall as many shares are sold", "Correct: selling pressure lowers prices."],
      ["Prices rise as many shares are bought", "Bears sell, not buy."],
      ["Prices stay the same because the exchange fixes them", "Prices are set by supply and demand."],
      ["New companies are forced to list", "No one is forced to list."],
    ],
    answer: "A",
    explanation: "Widespread bear selling creates a bear market of falling prices.",
    hints: ["Do bears buy or sell?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does the stock exchange help protect investors?",
    options: [
      ["Listed companies must publish accounts and information", "Correct: listing rules require disclosure."],
      ["It repays investors whose shares fall in value on the market", "Investors bear their own losses."],
      ["It sets the dividend each company must pay", "Directors decide dividends."],
      ["It allows only bulls to trade", "All investors may trade."],
    ],
    answer: "A",
    explanation: "Regulation and disclosure reduce fraud and give investors information.",
  });
  const n1 = 3500, ip = 0.4, sp = 0.47;
  const gain1 = r2(n1 * (sp - ip));
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: gain1, daily: true,
    stem: `A stag buys ${fmt(n1)} new shares at ${money(ip)} each and sells them all on the first day of dealing at ${money(sp)} each. Ignoring brokerage, calculate the stag's gain.`,
    wrong: [r2(n1 * sp), r2(sp - ip)],
    explanation: `Cost ${fmt(n1)} × ${fmt(ip)} = ${money(r2(n1 * ip))}; sale ${fmt(n1)} × ${fmt(sp)} = ${money(r2(n1 * sp))}; gain = ${money(gain1)}.`,
    workedSolution: `1. Cost = ${fmt(n1)} × ${fmt(ip)} = ${fmt(r2(n1 * ip))}.\n2. Sale value = ${fmt(n1)} × ${fmt(sp)} = ${fmt(r2(n1 * sp))}.\n3. Gain = ${fmt(r2(n1 * sp))} − ${fmt(r2(n1 * ip))} = ${money(gain1)}.`,
  });
  const n2 = 1600, buy2 = 2.15, sell2 = 1.9;
  const loss2 = r2(n2 * (buy2 - sell2));
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: loss2, calculator: true,
    stem: `A bull buys ${fmt(n2)} shares at ${money(buy2)} each, expecting a rise. Instead the price falls and he sells at ${money(sell2)} each. Ignoring brokerage, calculate his loss.`,
    wrong: [r2(n2 * sell2), r2(n2 * buy2)],
    explanation: `Cost ${money(r2(n2 * buy2))}; sale ${money(r2(n2 * sell2))}; loss = ${money(loss2)}.`,
    workedSolution: `1. Cost = ${fmt(n2)} × ${fmt(buy2)} = ${fmt(r2(n2 * buy2))}.\n2. Sale = ${fmt(n2)} × ${fmt(sell2)} = ${fmt(r2(n2 * sell2))}.\n3. Loss = ${fmt(r2(n2 * buy2))} − ${fmt(r2(n2 * sell2))} = ${money(loss2)}.`,
    hints: ["Compare what he paid with what he received."],
  });
  const bid = 0.82, offer = 0.85, q = 10000;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(q * (offer - bid)),
    stem: `A jobber quotes a bid (buying) price of ${money(bid)} and an offer (selling) price of ${money(offer)} for a share. If it buys and then sells ${fmt(q)} shares at these prices, what is its turn (profit)?`,
    wrong: [r2(q * offer), r2(offer - bid)],
    explanation: `Turn = ${fmt(q)} × (${fmt(offer)} − ${fmt(bid)}) = ${money(r2(q * (offer - bid)))}.`,
    hints: ["The turn is the difference between the two prices, for every share."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A stag applies for new shares hoping to sell them quickly at a higher price.",
    answer: true,
    explanation: "True. Stags speculate on new issues.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Members of the public deal directly with jobbers on the stock exchange floor.",
    answer: false,
    explanation: "False. The public deals through stockbrokers, who act as their agents.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each person with their role on the stock exchange.",
    pairs: [
      ["Stockbroker", "Agent who deals for clients for commission"],
      ["Jobber (market maker)", "Dealer who holds shares and earns the spread"],
      ["Bear", "Sells expecting prices to fall"],
      ["Stag", "Buys new issues to sell quickly"],
    ],
    explanation: "Brokers and jobbers are dealers; bulls, bears and stags are speculators.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A period of generally rising share prices is a {{blank:a}} market. A stockbroker's commission is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["bull"], choices: ["bull", "bear", "stag", "black"] },
      { id: "b", accepted: ["brokerage"], choices: ["brokerage", "a dividend", "a premium", "the turn"] },
    ],
    explanation: "Rising prices: bull market. Brokers earn brokerage.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the abbreviation commonly used for the Zimbabwe Stock Exchange.",
    accepted: ["ZSE", "zse"],
    wrong: ["RBZ"],
    explanation: "ZSE.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** functions of a stock exchange.",
    points: [
      "Market for second-hand securities (1)",
      "Explained: investors can sell when they need cash, so they are willing to invest (1)",
      "Raises capital for companies / government / values securities / protects investors (1)",
      "Explained, e.g. public companies sell new shares to many investors to fund expansion (1)",
    ],
    modelAnswer: "A stock exchange is a market for second-hand shares, so investors can sell easily when they need cash, which makes them willing to invest. It also helps public companies raise large amounts of capital by selling new shares to thousands of investors.",
    explanation: "Name each function and explain its benefit.",
    hints: ["Think of investors and of companies."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** benefit and **one** drawback to the economy of speculation on the stock exchange.",
    points: [
      "Benefit: more buyers and sellers make the market active / liquid (1)",
      "Explained: investors can deal quickly at fair prices (1)",
      "Drawback: sharp price swings not linked to company performance (1)",
      "Explained: confidence falls / inexperienced investors lose savings (1)",
    ],
    modelAnswer: "Speculators increase the number of buyers and sellers, so investors can deal quickly and prices reflect demand. However, heavy speculation can cause sharp rises and falls in prices that have nothing to do with how companies are performing, and inexperienced investors may lose their savings.",
    explanation: "Speculation adds liquidity but can cause instability.",
    hints: ["What happens to prices when everyone follows the same expectation?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Farai has ${money(3000)} of savings. A fictional company, Nyanga Agro Ltd, is offering new shares to the public at ${money(0.6)} each before listing on the Zimbabwe Stock Exchange. Farai's friend says: "Buy as many as you can and sell them on the first day, as the price always jumps."`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "units", value: Math.round(3000 / 0.6),
        stem: "How many shares could Farai buy with all his savings (ignore brokerage)?",
        wrong: [3000 * 0.6],
        explanation: `${fmt(3000)} ÷ ${fmt(0.6)} = ${fmt(3000 / 0.6)} shares.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: r2((3000 / 0.6) * (0.68 - 0.6)), type: "CALCULATION",
        stem: `Calculate his gain if he sells all the shares on the first day at ${money(0.68)} each.`,
        wrong: [r2((3000 / 0.6) * 0.68)],
        explanation: `${fmt(3000 / 0.6)} × (${fmt(0.68)} − ${fmt(0.6)}) = ${money(r2((3000 / 0.6) * (0.68 - 0.6)))}.`,
      }),
      P.short({
        label: "(c)", marks: 1,
        stem: "What name is given to a speculator who buys new issues to sell them quickly?",
        accepted: ["stag", "a stag"],
        wrong: ["bull"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Discuss whether Farai should follow his friend's advice.",
        points: [
          "Possible quick gain if the price rises (uses (b)) (1)",
          "But the price does not always rise; it may fall below the issue price (1)",
          "Putting all savings in one company is risky: no spreading of risk (1)",
          "Brokerage reduces any gain (1)",
          "Alternative: hold shares for dividends / take advice from a stockbroker / keep some savings in a bank (1)",
          "Justified conclusion (1)",
        ],
        levels: [[3, 5, 6, "Balanced discussion applied to Farai, with a justified conclusion."], [2, 3, 4, "Some discussion of both sides; weak conclusion."], [1, 1, 2, "One-sided, simple points."]],
        modelAnswer: `If the price rises to ${money(0.68)}, Farai could gain ${money(r2((3000 / 0.6) * 0.08))} in a day. However, prices do not always jump; if demand is weak they can fall below the issue price, and brokerage reduces any gain. Using all his savings on one company also means he could lose money he may need. He should take advice from a stockbroker, invest only part of his savings, and be ready to hold the shares for dividends rather than relying on a first-day rise.`,
      }),
    ],
    explanation: "Speculating as a stag can bring quick gains but carries real risk; investing all savings in one new issue is unwise.",
    hints: ["Number of shares = money ÷ price.", "Is the friend's \"always\" true?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 660,
    stem: "A fictional family-owned food company in Bulawayo is considering becoming a public limited company and listing its shares on the Zimbabwe Stock Exchange to fund a new factory.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** benefits to the company of listing on the stock exchange.",
        points: ["Raise large amounts of long-term capital (1)", "Status and publicity / shares easier to sell / can take over other firms (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain **one** drawback to the family of listing the company.",
        points: ["Drawback: loss of control to new shareholders (1)", "Explained: outside shareholders vote and may out-vote the family (1)", "Or: must publish accounts / listing costs / risk of takeover (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the stock exchange benefits the economy of Zimbabwe.",
        points: ["Mobilises savings for productive investment (1)", "Companies expand, creating jobs and output (1)", "Attracts local and foreign investors / government can raise funds (1)"],
      }),
    ],
    explanation: "Listing raises capital and status but dilutes control; the exchange channels savings into investment.",
    hints: ["Who would own the company after listing?"],
  });
  b.card("DEFINITION", "Stock exchange", "Regulated market for buying and selling securities of listed organisations and government.");
  b.card("CONCEPT", "Functions of a stock exchange", "Market for second-hand securities; raises capital for companies and government; values securities; protects investors; channels savings.");
  b.card("DEFINITION", "Stockbroker", "Agent who buys and sells securities for clients for commission (brokerage) and gives advice.");
  b.card("DEFINITION", "Jobber (market maker)", "Dealer who holds shares and quotes bid and offer prices; earns the turn (spread).");
  b.card("DEFINITION", "Bull", "Speculator who buys expecting prices to rise.");
  b.card("DEFINITION", "Bear", "Speculator who sells expecting prices to fall, hoping to buy back cheaper.");
  b.card("DEFINITION", "Stag", "Speculator who buys new issues expecting to sell quickly at a higher price.");
  b.card("CONCEPT", "Importance of the ZSE", "Capital for companies, liquidity and returns for investors, savings mobilised for growth, government borrowing, economic indicator.");
});
