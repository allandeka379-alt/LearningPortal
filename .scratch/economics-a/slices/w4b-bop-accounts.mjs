// W4b: the full balance of payments (Cambridge A Level; ZIMSEC Form 6).
import { concept, P, chk, table, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.bop-accounts", { file: "trade/bop-accounts", keyPrefix: "trade.bop-accounts" }, (b) => {
  mc(b, [2, "RECALL"], "A foreign company builds a factory in a country. In that country's balance of payments this is recorded in the",
    ["financial account as direct investment", "Correct: a lasting controlling interest."],
    [["current account as trade in goods", "No goods are traded."],
     ["capital account as a capital transfer", "It is an investment, not a transfer."],
     ["current account as primary income", "Primary income would record the later profits."]],
    "Building a plant is foreign direct investment, a financial account item.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which item is most likely to be recorded in the capital account?",
    ["Forgiveness of a debt owed to a foreign government", "Correct: a capital transfer."],
    [["A bank loan from a foreign bank", "That is other investment in the financial account."],
     ["Profits sent back to a foreign parent company each year", "That is primary income in the current account."],
     ["Purchases of shares by foreign investors", "That is portfolio investment."]],
    "Debt forgiveness is a capital transfer.");

  mc(b, [2, "UNDERSTANDING"], "Portfolio investment differs from direct investment because it",
    ["involves buying shares or bonds without control", "Correct: portfolio flows are more volatile."],
    [["involves building new factories abroad", "That is direct investment."],
     ["is recorded in the current account, not the financial account", "Both are financial account items."],
     ["is always a long-term lasting investment", "It is usually short term and easily sold."]],
    "Portfolio investment gives no control and can be sold at short notice.", { daily: true });

  mc(b, [3, "APPLICATION"], "A country has a current account deficit of US\\$400 million, a capital account surplus of US\\$20 million, a financial account surplus (before reserves) of US\\$330 million and net errors and omissions of zero. Its reserves",
    ["fall by US\\$50 million", "Correct: −400 + 20 + 330 = −50."],
    [["rise by US\\$50 million", "The sign is wrong."],
     ["fall by US\\$70 million", "That ignores the capital account."],
     ["rise by US\\$330 million", "That treats the financial account as the change in reserves."]],
    "The balance for official financing is −US\\$50 million, which is met by a fall in reserves of US\\$50 million.", { hints: ["Add the current, capital and financial balances."] });

  mc(b, [2, "UNDERSTANDING"], "The balance of payments always balances in total because",
    ["every transaction is recorded twice, as a credit and as a debit", "Correct: double-entry recording."],
    [["governments make sure that exports equal imports", "That is not required."],
     ["the exchange rate always adjusts to remove any deficits and surpluses", "Not automatically in a managed system."],
     ["reserves are always unchanged", "Reserves change."]],
    "Each international transaction has two sides, so the accounts sum to zero (with the balancing item).");

  mc(b, [3, "ANALYSIS"], "A country finances a large current account deficit mainly with short-term portfolio inflows. The main risk is that",
    ["the inflows may reverse suddenly, causing a currency fall", "Correct: investors can sell quickly if confidence falls."],
    [["foreign investors will take full control of many local firms", "That is a risk of direct investment."],
     ["the capital account will move into a large deficit", "The capital account is small."],
     ["reserves will increase without any limit", "Portfolio inflows would add to reserves."]],
    "Hot money can leave quickly, causing a currency crisis.", { hints: ["How quickly can portfolio investment be withdrawn?"] });

  mc(b, [3, "ANALYSIS"], "Which financing of a current account deficit is the most sustainable?",
    ["Foreign direct investment in export industries", "Correct: it is long-term and builds export capacity."],
    [["Short-term borrowing from foreign banks", "It must be repaid soon."],
     ["Selling reserves each year", "Reserves are finite."],
     ["Portfolio inflows attracted by high interest rates", "They can reverse."]],
    "Direct investment in export capacity is long-term and can later raise exports.", { hints: ["Which source is long term and increases future export earnings?"] });

  mc(b, [2, "RECALL"], "Reserve assets held by a central bank are mainly",
    ["foreign currency and other assets used for payments", "Correct: a store of external liquidity."],
    [["the income tax receipts of the central government", "Those are fiscal revenue."],
     ["the deposits of commercial banks held at home only", "Those are domestic deposits."],
     ["goods held in a buffer stock by the state", "Reserves are financial assets."]],
    "Reserves are held to meet payments and to support the currency.");

  {
    const fa = 260 + 90 - 40; chk(fa, 310);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: fa, unit: "US$ million", dp: 0, tol: 0.5, daily: true,
      stem: "A country records a net inflow of US\\$260 million of direct investment, a net inflow of US\\$90 million of portfolio investment and a net outflow of US\\$40 million of other investment (a negative number). Calculate the financial account balance before changes in reserves, in US\\$ million.",
      wrong: [350, 390, 130], explanation: "260 + 90 − 40 = +US\\$310 million." });
    const of = -480 + 30 + fa + 15; chk(of, -125);
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: of, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Add the four items with their signs."],
      stem: "The current account balance is −US\\$480 million, the capital account balance is +US\\$30 million, the financial account balance before reserves is +US\\$310 million and net errors and omissions are +US\\$15 million. Calculate the balance for official financing, in US\\$ million.",
      wrong: [125, -495, -170],
      explanation: "1. Current + capital = −480 + 30 = −450.\n2. Add the financial account: −450 + 310 = −140.\n3. Add errors and omissions: −140 + 15 = −US\\$125 million.\n4. The negative figure means reserves fall by US\\$125 million." });
    const err = 600 - 50 - 520; chk(err, 30);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: err, unit: "US$ million", dp: 0, tol: 0.5, hints: ["All the accounts together, including the balancing item, must sum to zero when reserves do not change."],
      stem: "A country has a current account deficit of US\\$600 million, a capital account surplus of US\\$50 million and a financial account surplus of US\\$520 million. Reserves do not change. Calculate the net errors and omissions, in US\\$ million.",
      wrong: [-30, 1170, 70], explanation: "−600 + 50 + 520 = −30, so net errors and omissions must be +US\\$30 million for the total to be zero." });
    const cov = 1800 / 600; chk(cov, 3);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: cov, unit: "months of imports", dp: 1,
      stem: "A central bank holds reserves of US\\$1,800 million. The country spends US\\$600 million a month on imports of goods and services. For how many months of imports do the reserves provide cover?",
      wrong: [0.33, 1200, 2400], explanation: "1,800 ÷ 600 = 3.0 months." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true, stem: "A country can run a deficit on its current account and still have a balance of payments that balances in total.",
    explanation: "The deficit is offset by financial account inflows, a capital account surplus or a fall in reserves." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each transaction with its account.",
    pairs: [["A foreign bank lends to the government", "Financial account (other investment)"], ["Debt forgiveness by another government", "Capital account"], ["Interest paid on a foreign loan", "Current account (primary income)"], ["The central bank sells dollars from its reserves", "Financial account (reserve assets)"]],
    explanation: "Loans and reserves are financial account items; debt forgiveness is a capital transfer; interest is primary income." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A deficit on the current account is offset by a {{blank:a}} on the financial account or by a {{blank:b}} in reserves.",
    blanks: [{ id: "a", accepted: ["surplus"], choices: ["surplus", "deficit"] }, { id: "b", accepted: ["fall"], choices: ["fall", "rise"] }],
    explanation: "Financing inflows or a fall in reserves cover a current account deficit." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the part of the balance of payments that records direct, portfolio and other investment and changes in reserve assets?",
    accepted: ["financial account", "the financial account"], wrong: ["current account"],
    explanation: "Investment, lending and reserve flows are recorded in the financial account." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between direct investment and portfolio investment.",
    points: ["Direct investment is a lasting, controlling interest in a business abroad (for example building a factory)", "Portfolio investment is buying shares or bonds without control, which can be sold quickly"],
    modelAnswer: "Direct investment is a lasting controlling interest in a business abroad, such as building a factory. Portfolio investment is the purchase of shares or bonds without control, and it can be sold quickly.",
    explanation: "Control and permanence against liquidity." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about how a deficit is paid for."],
    stem: "Explain why the balance of payments always balances in total even if there is a current account deficit.",
    points: ["Each transaction is recorded as both a credit and a debit.", "A current account deficit means that more foreign currency is paid out than received.", "The shortfall is covered by inflows on the financial account (borrowing, investment) or by running down reserves.", "So the sum of all accounts, including the balancing item, is zero."],
    modelAnswer: "Each transaction is recorded twice, as a credit and as a debit. A current account deficit means that more foreign currency is paid out than received, and the shortfall must be covered by inflows on the financial account, such as borrowing and foreign investment, or by running down reserves. Therefore the sum of all the accounts, including the balancing item, is zero.",
    explanation: "Double entry; financing; zero sum." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Compare how reliable each source is."],
    stem: "Explain why a deficit financed by portfolio investment is more risky than one financed by direct investment.",
    points: ["Portfolio investment is in shares and bonds that can be sold quickly.", "If confidence falls, investors withdraw funds suddenly.", "The country then cannot finance its deficit and the exchange rate falls sharply.", "Direct investment is long term and builds productive capacity, so it is less easily reversed."],
    modelAnswer: "Portfolio investment is in shares and bonds which can be sold quickly. If confidence falls, investors withdraw their funds suddenly, so the country can no longer finance its deficit and the exchange rate may fall sharply. Direct investment is long term and builds productive capacity, so it is not so easily reversed.",
    explanation: "Volatility against stability." });

  {
    const items = [["Current account balance", -380], ["Capital account balance", 20], ["Direct investment (net inflow)", 150], ["Portfolio investment (net inflow)", 60], ["Other investment (net inflow)", 95], ["Net errors and omissions", -5]];
    const fa = 150 + 60 + 95; chk(fa, 305);
    const of = -380 + 20 + fa - 5; chk(of, -60);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Add the financial account items first.", "A negative balance for official financing is met by a fall in reserves."],
      stem: "**The balance of payments of Tamba (fictional, illustrative)**\n\nTable 1 shows the balance of payments of Tamba in a year (US\\$ million; inflows are positive).\n\n" + table(["Item", "US\\$ million"], items) + "\n\nTamba's central bank holds foreign exchange reserves to support its currency.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: fa, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the financial account balance before reserves, in US\\$ million.", wrong: [455, 150, 210], explanation: "150 + 60 + 95 = +US\\$305 million." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: of, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the balance for official financing, in US\\$ million.", wrong: [60, -65, -355], explanation: "−380 + 20 + 305 − 5 = −US\\$60 million." }),
        P.fib({ label: "(c)", marks: 1, stem: "Complete the sentence.", template: "Tamba's reserves {{blank:a}} by US\\$60 million.", blanks: [{ id: "a", accepted: ["fell"], choices: ["fell", "rose"] }], explanation: "A negative balance for official financing is met from reserves." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why direct investment is a more stable source of finance for the current account deficit than portfolio investment.",
          points: ["Direct investment is a long-term controlling interest in businesses.", "It is difficult to reverse quickly because it is tied up in plant and equipment.", "Portfolio investment can be sold rapidly when confidence falls.", "A sudden outflow would reduce the financing and put pressure on the exchange rate."],
          modelAnswer: "Direct investment is a long-term interest in businesses and is tied up in factories and equipment, so it cannot be withdrawn quickly. Portfolio investment can be sold rapidly if confidence falls, and a sudden outflow would reduce the financing of the deficit and put pressure on the exchange rate." }),
      ],
      explanation: "Financial account US\\$305 million; balance for official financing −US\\$60 million; reserves fell; direct investment more stable than portfolio flows." });
  }
  {
    const ca = [-300, -420, -610], pf = [350, 250, 90], di = [60, 70, 80];
    const of1 = ca[0] + pf[0] + di[0], of3 = ca[2] + pf[2] + di[2]; chk(of1, 110); chk(of3, -440); const of2 = ca[1] + pf[1] + di[1]; chk(of2, -100); chk(900 + of1 + of2 + of3, 470);
    const t1 = table(["Year", "Current account (US\\$ million)", "Portfolio investment inflow (US\\$ million)", "Direct investment inflow (US\\$ million)"], ca.map((v, i) => [String(i + 1), v, pf[i], di[i]]), { align: ["l", "r", "r", "r"] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Balance for official financing = current account + portfolio + direct investment (capital account, other investment and errors are zero).", "In (d) consider the fall in portfolio inflows and the level of reserves."],
      stem: "**Capital flows in Kavala (fictional, illustrative)**\n\nKavala's current account deficit has widened as imports have grown. In year 1 foreign investors bought large amounts of Kavalan bonds because interest rates were high, but by year 3 many sold them after the exchange rate began to fall. The capital account, other investment and errors and omissions are all zero in each year. Reserves were US\\$900 million at the start of year 1.\n\n" + t1,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: of1, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the balance for official financing in year 1, in US\\$ million.", wrong: [-110, 410, -300], explanation: "−300 + 350 + 60 = +US\\$110 million: reserves rose." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: of3, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the balance for official financing in year 3, in US\\$ million.", wrong: [440, -610, -520], explanation: "−610 + 90 + 80 = −US\\$440 million: reserves fall." }),
        P.mcq({ label: "(c)", marks: 2, stem: "Which statement is supported by Table 1?", options: [["Portfolio finance fell and reserves financed more of year 3", "Correct: portfolio inflows fell from 350 to 90."], ["Direct investment was more volatile than portfolio investment", "Direct investment rose steadily."], ["The current account improved over the three years", "The deficit widened."], ["Reserves rose in every one of the three years", "They fell in year 3."]], answer: "A", explanation: "Portfolio inflows fell from US\\$350 million to US\\$90 million and the balance for official financing was −US\\$440 million in year 3." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess the risks to Kavala of financing its deficit in this way.",
          points: ["The deficit has widened to US\\$610 million while portfolio inflows have fallen to US\\$90 million.", "Reserves rise by US\\$110 million in year 1, then fall by US\\$100 million in year 2 and US\\$440 million in year 3, so from US\\$900 million at the start they are down to US\\$470 million, little more than a year's supply at the year 3 rate.", "As reserves fall, the central bank cannot defend the currency; a fall in the exchange rate raises import prices.", "Direct investment is stable (rising to US\\$80 million) but too small to cover the deficit.", "Policies such as exports growth or tighter spending could reduce the deficit.", "Judgement: high risk unless the deficit is reduced."],
          modelAnswer: "The deficit has widened to US\\$610 million in year 3 while portfolio inflows have fallen from US\\$350 million to US\\$90 million, so the gap is met by using reserves, which fall by US\\$440 million. Reserves started at US\\$900 million, rose by US\\$110 million in year 1 and fell by US\\$100 million and US\\$440 million in years 2 and 3, so only US\\$470 million remain, little more than a year's supply at the year 3 rate. As the reserves fall the central bank is less able to support the currency, and a fall in the exchange rate would raise import prices and cause inflation. Direct investment is stable but too small to cover the deficit. The risk is therefore high unless the government reduces the deficit, for example by raising exports or reducing imports, or attracts more long-term investment." }),
      ],
      explanation: "Year 1: +110; year 3: −440; portfolio inflows fell, so reserves were used; assess the risks." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the types of finance and their sustainability."],
    stem: "Assess whether a current account deficit financed by foreign direct investment is sustainable.",
    points: ["Direct investment is long-term and brings capital, technology and skills.", "It is hard to reverse quickly, unlike portfolio flows.", "If it builds export capacity, future exports can pay for imports.", "Profits and dividends flow abroad later, increasing the primary income deficit.", "If the investment serves only the home market or is in non-traded sectors, it adds no export earnings.", "The deficit may still be large relative to GDP.", "Depends on the size of the deficit, the use of the investment and the level of reserves.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A deficit financed by direct investment is more sustainable than one financed by short-term borrowing, because direct investment is long-term and hard to reverse, and it brings capital, technology and skills. If the investment builds export capacity, the future export earnings can pay for imports. However, the profits and dividends will flow abroad later and widen the primary income deficit, and if the investment serves only the home market or non-traded sectors it adds nothing to export earnings. The deficit may also be too large relative to GDP. Overall it is sustainable if the investment increases export capacity and the deficit is not too large, but not if the investment only supports consumption.",
    explanation: "Weigh long-term stability and export capacity against profit outflows and size." });

  b.card("DEFINITION", "Define the **financial account**.", "The part of the balance of payments recording direct, portfolio and other investment and changes in reserve assets.");
  b.card("DEFINITION", "What is recorded in the **capital account**?", "Capital transfers (such as debt forgiveness) and non-produced non-financial assets (such as patents); usually small.");
  b.card("FORMULA", "The balance of payments identity?", "Current account + capital account + financial account + net errors and omissions = 0.");
  b.card("DEFINITION", "Define **foreign direct investment**.", "Investment in which an investor acquires a lasting, controlling interest in a business abroad.");
  b.card("CONCEPT", "Why is portfolio investment called 'hot money'?", "Shares and bonds can be sold quickly, so the funds can leave suddenly when confidence falls.");
  b.card("DEFINITION", "What are **reserve assets**?", "Foreign currencies and other assets held by the central bank to settle international payments and support the currency.");
  b.card("CONCEPT", "What does a negative balance for official financing mean?", "The country must run down reserves or borrow officially to cover the gap.", "ZIMSEC term.");
  b.card("CONCEPT", "When is a current account deficit most sustainable?", "When it is financed by long-term investment that builds export capacity and is small relative to GDP.");
  b.card("CONCEPT", "Why can the balance of payments still be in disequilibrium when it sums to zero?", "A persistent imbalance in a part, such as the current account, financed by unsustainable flows or reserves, is a disequilibrium.");
});
