// W4b: the current account of the balance of payments (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, fmt, currentAccount, roundTo, pctChange } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.bop-current-account", { file: "trade/bop-current-account", keyPrefix: "trade.bop-current-account" }, (b) => {
  mc(b, [1, "RECALL"], "Which item is recorded in the current account of the balance of payments?",
    ["Payments by foreign tourists to hotels in the country", "Correct: a services export."],
    [["A foreign company buying shares in a local firm", "That is a financial account transaction."],
     ["A loan from an overseas bank to the government", "That is a financial account transaction."],
     ["The sale of government bonds to foreign investors", "That is a financial account transaction."]],
    "Tourist spending is a credit in trade in services; the others are capital or financial flows.");

  mc(b, [2, "UNDERSTANDING"], "Money sent home by workers living abroad is recorded as",
    ["secondary income", "Correct: a current transfer with nothing received in return."],
    [["trade in services", "No service is provided in return."],
     ["primary income", "It is not a payment for labour or capital services."],
     ["trade in goods", "No goods are traded."]],
    "Remittances are current transfers (secondary income).", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A foreign-owned mine sends profits to its parent company overseas. In the host country's current account this is a",
    ["debit under primary income", "Correct: income paid to a non-resident owner."],
    [["credit under primary income", "Credits are receipts from abroad."],
     ["debit under trade in goods", "No goods are imported."],
     ["credit under secondary income", "It is not a transfer."]],
    "Payments of profit, interest and dividends abroad are primary income debits.");

  {
    const g = 6500 - 7250, s = 1150 - 980; chk(g + s, -580);
    mc(b, [3, "APPLICATION"], "A country exports goods worth US\\$6,500 million and services worth US\\$1,150 million, and imports goods worth US\\$7,250 million and services worth US\\$980 million. Its balance of trade in goods and services is",
      ["a deficit of US\\$580 million", "Correct: (6,500 + 1,150) − (7,250 + 980)."],
      [["a deficit of US\\$750 million", "That is the balance on goods only."],
       ["a surplus of US\\$170 million", "That is the balance on services only."],
       ["a surplus of US\\$580 million", "The sign is wrong."]],
      "Goods: −750; services: +170; together −US\\$580 million.", { hints: ["Add the goods balance and the services balance."] });
  }

  mc(b, [2, "UNDERSTANDING"], "Which is most likely to cause a deficit on the current account?",
    ["Rapid growth of national income, which raises spending on imports", "Correct: imports rise with income."],
    [["A fall in the exchange rate that makes exports cheaper abroad", "That helps exports."],
     ["A rise in the productivity of export industries", "That raises competitiveness."],
     ["A rise in the world price of the country's main export", "That raises export revenue."]],
    "Faster income growth raises imports by more than exports.");

  mc(b, [3, "ANALYSIS"], "Which situation makes a large current account deficit most serious for a country?",
    ["It is persistent and financed by short-term borrowing and by running down reserves", "Correct: this cannot be sustained."],
    [["It results mainly from imports of machinery financed by long-term foreign investment", "Capital goods can raise future output."],
     ["It is small compared with the country's national income", "A small deficit is easier to finance."],
     ["It is expected to disappear when an export industry opens next year", "A temporary deficit is less of a problem."]],
    "Persistent deficits financed by short-term funds lead to debt, falling reserves and pressure on the currency.", { hints: ["Think about size, duration and how the deficit is financed."] });

  mc(b, [3, "ANALYSIS"], "A country's current account deficit widens. The most likely effect on its currency is",
    ["downward pressure as supply of the currency rises relative to demand", "Correct: more of the currency is sold to buy imports."],
    [["upward pressure on the exchange rate as demand for the currency rises", "A deficit reduces demand from foreign buyers."],
     ["no pressure, because the whole balance of payments always balances", "The balancing items may be short-term capital that can leave."],
     ["upward pressure, because imports are cheaper", "Cheaper imports do not strengthen the currency."]],
    "A deficit means the country supplies more of its currency than foreigners demand, unless offset by capital inflows.", { hints: ["Who is buying and selling the currency?"] });

  mc(b, [2, "UNDERSTANDING"], "Which item is a credit in the current account of a country?",
    ["Exports of tobacco leaf", "Correct: receipts from abroad."],
    [["Imports of fuel", "Payments abroad are debits."],
     ["Interest paid on foreign loans", "Payments abroad are debits."],
     ["Grants given to another country", "Payments abroad are debits."]],
    "Credits are receipts from the rest of the world.");

  {
    const ca = currentAccount({ goods: [7400, 8150], services: [1380, 1020], primary: [410, 720], secondary: [1950, 310] });
    chk(ca.goods, -750); chk(ca.services, 360); chk(ca.primary, -310); chk(ca.secondary, 1640); chk(ca.total, 940);
    const stem0 = "A country's current account shows (US\\$ million): exports of goods 7,400 and imports of goods 8,150; exports of services 1,380 and imports of services 1,020; primary income credits 410 and debits 720; secondary income credits 1,950 and debits 310. ";
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: ca.goods, unit: "US$ million", dp: 0, tol: 0.5, daily: true,
      stem: stem0 + "Calculate the balance of trade in goods, in US\\$ million (a deficit is negative).",
      wrong: [750, 360, -940], explanation: "7,400 − 8,150 = −US\\$750 million." });
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: ca.goods + ca.services, unit: "US$ million", dp: 0, tol: 0.5,
      stem: stem0 + "Calculate the balance of trade in goods and services, in US\\$ million (a deficit is negative).",
      wrong: [-750, 390, 940], explanation: "Goods −750; services +360; together −US\\$390 million." });
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: ca.total, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Add the four balances, keeping signs."],
      stem: stem0 + "Calculate the current account balance, in US\\$ million (a deficit is negative).",
      wrong: [-390, 1330, -940],
      explanation: "1. Goods: 7,400 − 8,150 = −750.\n2. Services: 1,380 − 1,020 = +360.\n3. Primary income: 410 − 720 = −310.\n4. Secondary income: 1,950 − 310 = +1,640.\n5. Current account = −750 + 360 − 310 + 1,640 = +US\\$940 million, a surplus." });
  }
  {
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: (1260 / 9000) * 100, unit: "%", hints: ["Deficit ÷ GDP × 100."],
      stem: "A country has a current account deficit of US\\$1,260 million and a GDP of US\\$9,000 million. Calculate the deficit as a percentage of GDP, to one decimal place.",
      wrong: [14.3, 7.1, 12.6], explanation: "1,260 ÷ 9,000 × 100 = 14.0%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "Remittances sent home by relatives working abroad are recorded in the current account as trade in services.",
    explanation: "Remittances are current transfers, recorded as secondary income." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each transaction with its place in the current account.",
    pairs: [["Exports of cotton lint", "Trade in goods"], ["Spending by foreign tourists at a lodge", "Trade in services"], ["Dividends paid to a foreign shareholder", "Primary income"], ["Foreign aid grant received", "Secondary income"]],
    explanation: "Goods are physical items, services are intangible, primary income pays for factors of production and secondary income is a transfer." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The balance of trade in goods is exports of goods {{blank:a}} imports of goods. A negative current account balance is called a {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["minus"], choices: ["minus", "plus", "divided by"] }, { id: "b", accepted: ["deficit"], choices: ["deficit", "surplus"] }],
    explanation: "Balance = credits − debits; a negative balance is a deficit." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the part of the balance of payments that records trade in goods and services, primary income and secondary income?",
    accepted: ["current account", "the current account"], wrong: ["financial account"],
    explanation: "The current account records these four components." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define the current account of the balance of payments.",
    points: ["The part of the balance of payments that records trade in goods and services", "and primary and secondary income (income flows and transfers) between residents and the rest of the world"],
    modelAnswer: "The current account is the part of the balance of payments that records a country's trade in goods and services together with primary income (such as profits, interest and wages) and secondary income (current transfers such as remittances and aid) between its residents and the rest of the world.",
    explanation: "Goods and services plus income flows and transfers." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Link income growth, imports and the exchange rate."],
    stem: "Explain two causes of a deficit on the current account.",
    points: ["Rapid growth of income raises spending on imports.", "Imports grow faster than exports, so the balance worsens.", "An overvalued exchange rate makes exports dearer abroad and imports cheaper.", "So exports fall and imports rise, widening the deficit."],
    modelAnswer: "When income grows rapidly, households and firms spend more on imports, and if exports grow more slowly the deficit widens. An exchange rate that is too high makes exports dearer for foreign buyers and imports cheaper at home, so export sales fall and import spending rises, which also widens the deficit.",
    explanation: "Two causes, each with a link." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Who finances a deficit and what happens to the currency?"],
    stem: "Explain two possible consequences of a persistent current account deficit for an economy.",
    points: ["The deficit must be financed by borrowing from abroad, selling assets or using reserves.", "So external debt rises and interest payments abroad increase (or reserves fall).", "More of the currency is supplied than demanded, putting downward pressure on the exchange rate.", "A depreciation raises import prices and can cause cost-push inflation."],
    modelAnswer: "A persistent deficit must be financed by borrowing from abroad, selling assets or using reserves, so external debt rises and interest payments abroad increase, or reserves fall. A deficit also means that more of the currency is being supplied than demanded, which puts downward pressure on the exchange rate, and a depreciation raises the price of imports and can cause cost-push inflation.",
    explanation: "Financing and debt; currency pressure and inflation." });

  {
    const ca = currentAccount({ goods: [3640, 4380], services: [520, 610], primary: [130, 390], secondary: [880, 120] });
    chk(ca.goods, -740); chk(ca.services, -90); chk(ca.primary, -260); chk(ca.secondary, 760); chk(ca.total, -330);
    const t1 = table(["Section", "Credits (US\\$ million)", "Debits (US\\$ million)"], [["Trade in goods", 3640, 4380], ["Trade in services", 520, 610], ["Primary income", 130, 390], ["Secondary income", 880, 120]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Balance = credits − debits for each line.", "Add the balances, keeping signs."],
      stem: "**The current account of Mbira (fictional, illustrative)**\n\nMbira exports tobacco and minerals, and imports fuel, vehicles and machinery. Its tourism industry is small. Many Mbirans work abroad and send money home. Table 1 shows its current account for a year.\n\n" + t1,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: ca.goods, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the balance of trade in goods, in US\\$ million.", wrong: [740, -90, -330], explanation: "3,640 − 4,380 = −US\\$740 million." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: ca.total, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the current account balance, in US\\$ million.", wrong: [-830, 330, -760], explanation: "−740 − 90 − 260 + 760 = −US\\$330 million, a deficit." }),
        P.short({ label: "(c)", marks: 1, stem: "In which section of the current account would money sent home by Mbirans working abroad appear?", accepted: ["secondary income", "current transfers", "transfers"], wrong: ["trade in services"], explanation: "Remittances are secondary income (current transfers)." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain two reasons why a country such as Mbira may have a deficit on trade in goods.",
          points: ["It depends on imports of essential fuel, vehicles and machinery.", "Which it cannot produce at home, so imports are large relative to exports.", "Its exports are primary products with volatile prices (or an overvalued currency makes exports dearer).", "So export revenue is low or unstable compared with import spending."],
          modelAnswer: "Mbira depends on imports of fuel, vehicles and machinery that it cannot produce itself, so import spending is high. Its exports of tobacco and minerals are primary products whose prices are volatile, and if the exchange rate is too high they are also dearer abroad, so export revenue is low or unstable compared with imports." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two ways in which the secondary income balance affects Mbira's current account.",
          points: ["It is a surplus of US\\$760 million.", "It reduces what would otherwise be a much larger deficit (of US\\$1,090 million)."],
          modelAnswer: "The secondary income balance is a surplus of US\\$760 million, and it reduces what would otherwise be a much larger deficit of US\\$1,090 million." }),
      ],
      explanation: "Goods −740; current account −330; remittances are secondary income; causes of a goods deficit; transfers narrow the deficit." });
  }
  {
    const bal = [-180, -310, -520], gdp = [4000, 4200, 4300];
    const y3 = (520 / 4300) * 100; chk(roundTo(y3, 1), 12.1, 1e-9);
    const inc = pctChange(180, 520); chk(roundTo(inc, 1), 188.9, 1e-9);
    const t1 = table(["Year", "Current account balance (US\\$ million)", "GDP (US\\$ million)"], bal.map((v, i) => [String(i + 1), v, gdp[i]]), { align: ["l", "r", "r"] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Deficit ÷ GDP × 100.", "Percentage change = change ÷ original × 100.", "In (d) consider size, cause and financing."],
      stem: "**A growing deficit in Kavala (fictional, illustrative)**\n\nKavala's imports of fuel, vehicles and consumer goods have grown with rising incomes, while the price of its main export, copper, has fallen. The government has financed the gap mainly by short-term borrowing from abroad and by using foreign exchange reserves.\n\n" + t1,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: y3, unit: "%", stem: "Calculate the current account deficit as a percentage of GDP in year 3, to one decimal place.", wrong: [11.5, 5.2, 520], explanation: "520 ÷ 4,300 × 100 = 12.1%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: inc, unit: "%", stem: "Calculate the percentage increase in the deficit between year 1 and year 3, to one decimal place.", wrong: [65.4, 340, 288.9], explanation: "(520 − 180) ÷ 180 × 100 = 188.9%." }),
        P.fib({ label: "(c)", marks: 2, stem: "Complete the sentences.", template: "Financing the deficit by short-term borrowing increases Kavala's external {{blank:a}}, and using foreign exchange reserves causes the reserves to {{blank:b}}.",
          blanks: [{ id: "a", accepted: ["debt"], choices: ["debt", "surplus", "income"] }, { id: "b", accepted: ["fall"], choices: ["fall", "rise"] }], explanation: "Borrowing adds to debt; using reserves reduces them." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether the current account deficit is a serious problem for Kavala.",
          points: ["The deficit has grown from 4.5% to 12.1% of GDP, which is large and rising.", "It is financed by short-term borrowing and falling reserves, which cannot continue.", "Debt and interest payments will rise; the exchange rate may fall, raising import prices.", "Part of the cause is a fall in the copper price, which may be temporary.", "If imports are of machinery that raises capacity, the deficit may pay for itself.", "Judgement: serious because of the size and the financing, unless the copper price recovers."],
          modelAnswer: "The deficit has risen from 4.5% of GDP in year 1 to 12.1% in year 3, and it is financed by short-term borrowing and falling reserves, which cannot continue for long: debt and interest payments rise, and the currency may fall, which would raise import prices. Part of the cause is the fall in the copper price, which may be temporary, and if some of the imports are machinery that raises capacity the deficit may be less harmful. However, much of the imports are fuel, vehicles and consumer goods. Overall the deficit is serious because of its size and the way it is financed, unless the copper price recovers quickly." }),
      ],
      explanation: "Deficit 12.1% of GDP in year 3; +188.9% since year 1; debt rises and reserves fall; assess size, cause and financing." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the cause, size, financing and duration."],
    stem: "Assess whether a country should be concerned about a current account deficit.",
    points: ["A deficit must be financed by borrowing, selling assets or using reserves.", "A persistent deficit raises debt and interest payments and can put pressure on the exchange rate.", "A depreciation raises import prices and may cause inflation.", "A deficit reduces aggregate demand (net exports are negative).", "If the deficit reflects imports of capital goods or investment financed by long-term inflows, it may raise future capacity.", "A small deficit, or a temporary one caused by a commodity price fall, is easily financed.", "Remittances and aid may finance a deficit sustainably.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A deficit means that the country is paying abroad more than it receives, so it must borrow, sell assets or use up reserves. If the deficit is persistent, debt and interest payments rise and the exchange rate may come under pressure, which raises import prices and can cause inflation. Since net exports are negative, a deficit also reduces aggregate demand. However, a deficit is less worrying if it is small, temporary or caused by imports of machinery that will raise future output and is financed by long-term foreign investment. Remittances and aid may also finance a deficit for many years. Overall a country should be concerned if the deficit is large, persistent and financed by short-term borrowing, but not simply because a deficit exists.",
    explanation: "Weigh debt, currency pressure and demand against investment-led, temporary or well-financed deficits." });

  b.card("DEFINITION", "Define the **current account**.", "The part of the balance of payments recording trade in goods and services, primary income and secondary income.");
  b.card("FORMULA", "Balance of trade in goods?", "Exports of goods − imports of goods.");
  b.card("FORMULA", "Current account balance?", "Goods + services + primary income + secondary income balances.");
  b.card("CONCEPT", "What is **primary income**?", "Income from factors of production owned abroad: wages, profits, interest and dividends.");
  b.card("CONCEPT", "What is **secondary income**?", "Current transfers with nothing received in return, such as remittances and aid.");
  b.card("CONCEPT", "Is a foreign tourist's spending a credit or a debit for the host country?", "A credit in trade in services (an export of services).");
  b.card("CONCEPT", "Name three causes of a current account deficit.", "Fast income growth, an overvalued currency, low competitiveness (also falling export prices, inflation).");
  b.card("CONCEPT", "How is a current account deficit financed?", "By borrowing from abroad, selling assets or using reserves (financial account inflows).");
  b.card("CONCEPT", "When is a deficit most serious?", "When it is large, persistent and financed by short-term borrowing or falling reserves.");
});
