// W1a: ZIMSEC Commerce Paper 2 exam-format items: 2 × 7-mark and 1 × 6-mark Section A structured questions and
// 2 × 20-mark Section B essays. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, f, money, fmt, r2, table, sum, check, COM } from "../lib.mjs";

const L8 = [[3, 6, 8, "Well-developed explanation of several relevant points, applied with examples."], [2, 3, 5, "Some explanation of relevant points; limited examples."], [1, 1, 2, "Points listed with little or no explanation."]];
const L10 = [[3, 7, 10, "Detailed, accurate description of a full range of points, each developed with examples."], [2, 4, 6, "Several relevant points with some development."], [1, 1, 3, "A few points listed, little development."]];
const L12 = [[3, 9, 12, "Balanced discussion of both sides, well developed, with a justified conclusion."], [2, 5, 8, "Some discussion of both sides, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points on one side, little explanation, no conclusion."]];

concept("bus.trade.home-trade-documents", { file: "exam/w1a-commerce", keyPrefix: "exam.w1a-commerce", applies: COM }, (b) => {
  // 7 marks: discounts on an invoice.
  const qty = 60, unit = 18, td = 12.5, cd = 4;
  const gross = qty * unit;
  const inv = f.afterTradeDiscount(gross, td);
  const pay = f.afterBothDiscounts(gross, td, cd);
  check("invoice", inv, gross - gross * td / 100);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: true, paper: "Paper 2",
    concepts: ["bus.trade.home-trade-documents"],
    stem: `Masvingo Stationers ordered ${qty} cartons of exercise books from a wholesaler in Harare at a list price of ${money(unit)} a carton. The invoice allows ${td}% trade discount, and the terms of payment are ${cd}% cash discount for payment within 14 days.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: inv,
        stem: "Calculate the invoice total after trade discount.",
        wrong: [r2(gross * td / 100), gross],
        explanation: `${qty} × ${fmt(unit)} = ${fmt(gross)}; less ${td}% (${fmt(r2(gross * td / 100))}) = ${money(inv)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: pay,
        stem: "Calculate the amount Masvingo Stationers pays if it settles within 14 days.",
        wrong: [r2(gross * (1 - (td + cd) / 100)), inv],
        explanation: `${fmt(inv)} less ${cd}% (${fmt(r2(inv * cd / 100))}) = ${money(pay)}. The cash discount is calculated after the trade discount.`,
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the wholesaler offers a cash discount.",
        points: ["Encourages prompt payment (1)", "Improves the wholesaler's cash flow / money available sooner (1)", "Reduces the risk of bad debts (1)"],
      }),
    ],
    explanation: `Invoice total ${money(inv)}; payment within 14 days ${money(pay)}. Cash discount rewards prompt payment.`,
    hints: ["Gross value = quantity × list price.", "Trade discount first, then cash discount on the reduced figure."],
  });

  // 7 marks: balance of payments.
  const vx = 2640, vm = 3010, ix = 515, im = 380;
  const bot = f.balanceOfTrade(vx, vm), ca = f.currentAccount(vx, vm, ix, im);
  check("ca", ca, bot + f.invisibleBalance(ix, im));
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: true, paper: "Paper 2",
    concepts: ["bus.trade.balance-of-payments"],
    stem: `A fictional country recorded the following for one year (US\\$ million):\n\n${table(["Item", "US\\$ million"], [["Visible exports", vx], ["Visible imports", vm], ["Invisible exports", ix], ["Invisible imports", im]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "plain", value: bot,
        stem: "Calculate the balance of trade in US\\$ million (give a deficit as a negative number).",
        wrong: [-bot, vx + vm],
        explanation: `${fmt(vx)} − ${fmt(vm)} = ${fmt(bot)} (a deficit of US\\$${fmt(-bot)} million).`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "plain", value: ca,
        stem: "Calculate the balance of payments on current account in US\\$ million (give a deficit as a negative number).",
        wrong: [-ca, bot - (ix - im)],
        explanation: `Invisible balance ${fmt(ix)} − ${fmt(im)} = ${fmt(ix - im)}; current account = ${fmt(bot)} + ${fmt(ix - im)} = ${fmt(ca)}.`,
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** way the government could reduce the deficit.",
        points: ["Identifies a measure, e.g. export promotion / import restrictions / import substitution / devaluation (1)", "Explains how it works (1)", "Links to a lower deficit, e.g. more foreign currency earned or less spent (1)"],
      }),
    ],
    explanation: `Balance of trade ${fmt(bot)}; current account ${fmt(ca)} (US\\$ million). A deficit is reduced by raising exports or cutting imports.`,
    hints: ["Balance of trade uses visible items only.", "Add the invisible balance to the balance of trade."],
  });

  // 6 marks: hire purchase.
  const cash = 720, depPct = 20, inst = 52, n = 15;
  const dep = r2(cash * depPct / 100), hp = r2(dep + inst * n);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 420, calculator: true, paper: "Paper 2",
    concepts: ["bus.trade.credit"],
    stem: `Farai buys a welding machine for his workshop in Chinhoyi on hire purchase. The cash price is ${money(cash)}. He pays a deposit of ${depPct}% of the cash price and ${n} monthly instalments of ${money(inst)}.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: hp,
        stem: "Calculate the total hire purchase price.",
        wrong: [r2(inst * n), r2(cash + inst * n)],
        explanation: `Deposit ${fmt(dep)} + ${n} × ${fmt(inst)} (${fmt(inst * n)}) = ${money(hp)}.`,
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "When will Farai become the owner of the welding machine?",
        options: [["After paying the last instalment", "Correct: under hire purchase ownership passes at the end."], ["When he pays the deposit", "The deposit gives possession, not ownership."], ["When he signs the agreement", "That is when ownership passes under a credit sale."], ["After half the instalments", "Ownership does not pass part-way."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** disadvantage to Farai of buying on hire purchase.",
        points: [`Identifies, e.g. pays more than the cash price (${money(r2(hp - cash))} extra) / risk of repossession (1)`, "Explains why, e.g. interest is charged / seller owns the machine until the end (1)", "Effect on his business, e.g. lower profit / loses the machine and income if he cannot pay (1)"],
      }),
    ],
    explanation: `Total HP price ${money(hp)}, ${money(r2(hp - cash))} more than the cash price. Ownership passes after the last instalment.`,
    hints: ["The deposit is a percentage of the cash price.", "Total = deposit + all instalments."],
  });

  // Essay 1 (20 marks): wholesaling.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.trade.wholesale", "bus.trade.retail-types"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Describe the services that a wholesaler provides to (i) manufacturers and (ii) retailers.",
        points: [
          ["Manufacturers: buys in bulk, so fewer, larger orders and lower selling costs", 2],
          "Manufacturers: storage / warehousing, saving space (1)",
          "Manufacturers: bears risk (price falls, fashion, damage) (1)",
          "Manufacturers: prompt payment / finance; market information; transport or advertising (1)",
          ["Retailers: breaks bulk, so little capital and storage needed", 2],
          "Retailers: credit (1)",
          ["Retailers: variety from many producers / delivery / advice", 2],
        ],
        levels: L10,
        modelAnswer: "(i) A wholesaler buys large quantities from manufacturers, so the manufacturer deals with a few big orders instead of thousands of small ones, which lowers selling and transport costs. The wholesaler stores the goods in its warehouse, so the manufacturer needs less storage space and can produce continuously. It bears risks such as a fall in price, goods going out of fashion or damage in store. It often pays promptly, which helps the manufacturer's cash flow, and it passes on information about what retailers and consumers want. (ii) For retailers, the wholesaler breaks bulk: a tuck shop can buy one carton instead of a lorry-load, so it needs little capital or storage space. Many wholesalers give credit, so retailers can sell goods before paying for them. A wholesaler stocks goods from many manufacturers, so the retailer finds variety in one place, and some deliver goods and advise retailers on new products and display.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "\"The wholesaler is an unnecessary middleman and should be eliminated.\" Discuss.",
        points: [
          "Reasons for elimination: large retailers buy direct in bulk (1)",
          "Reasons: perishable or made-to-order goods / factory shops / e-commerce (1)",
          "Reasons: removing the middleman's profit may lower prices (1)",
          "Reasons: manufacturers gain control over presentation and price (1)",
          ["Against: the functions (storage, breaking bulk, transport, risk) remain and must be paid for", 2],
          "Against: small retailers depend on wholesalers for small quantities and credit (1)",
          "Against: manufacturers would face thousands of small orders and higher costs (1)",
          ["Justified conclusion, e.g. depends on type of goods and size of retailer", 2],
        ],
        levels: [[3, 7, 10, "Balanced discussion of both sides, well developed, with a justified conclusion."], [2, 4, 6, "Some discussion of both sides, or one side well developed."], [1, 1, 3, "Simple points on one side only."]],
        modelAnswer: "Some argue the wholesaler can be cut out. Supermarket chains buy in bulk directly from manufacturers and have their own warehouses. Perishable goods such as bread and milk go straight to shops or consumers, made-to-order furniture is sold directly, and the internet lets manufacturers sell to consumers. Removing the wholesaler's profit can lower prices, and manufacturers control how their goods are displayed. However, eliminating the wholesaler does not eliminate its functions: someone must still store goods, break bulk, transport them and bear risk, and these costs are simply moved to the manufacturer or retailer. Thousands of tuck shops, market traders and rural stores cannot buy in bulk and rely on wholesalers for small quantities, credit and variety. Manufacturers would also face thousands of small orders. In conclusion, the wholesaler is unnecessary for large retailers and for perishable or made-to-order goods, but remains essential for the many small retailers who dominate trade in Zimbabwe.",
      }),
    ],
    explanation: "(a) Services to manufacturers (bulk buying, storage, risk, finance, information) and to retailers (breaking bulk, credit, variety, delivery, advice). (b) The wholesaler can be bypassed in some cases, but its functions remain; a judgement depends on the goods and the size of retailers.",
    hints: ["(a) Group the services by who benefits.", "(b) Give reasons for elimination, reasons against, and a conclusion."],
  });

  // Essay 2 (20 marks): foreign trade and protection.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.trade.foreign-trade", "bus.trade.protectionism", "bus.trade.foreign-trade-documents"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Explain the difficulties that Zimbabwean exporters face, and how each may be overcome.",
        points: [
          "Distance / landlocked: transport cost and delays (1)",
          "Overcome: containerisation, transit corridors, insurance (1)",
          "Payment risk from unknown foreign buyers (1)",
          "Overcome: letters of credit, del credere agents, credit insurance (1)",
          "Currency differences and exchange-rate changes (1)",
          "Overcome: banks / agreeing the currency in the contract (1)",
          "Language, regulations and documents (1)",
          "Overcome: agents, clearing and forwarding agents (1)",
        ],
        levels: L8,
        modelAnswer: "Zimbabwe is landlocked, so exports travel by road or rail through neighbouring countries to ports such as Beira or Durban, adding cost, delay and the risk of damage; exporters reduce this by using containers, regional transport corridors and marine insurance. An exporter may not know whether a foreign buyer will pay; a letter of credit from the buyer's bank, or a del credere agent, guarantees payment. Buyers pay in other currencies whose value changes; banks convert currency and exporters can agree prices in a stable currency. Different languages, laws and customs procedures cause mistakes and delays; agents in the foreign country and clearing and forwarding agents at home handle these.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "Discuss whether Zimbabwe should protect its industries from foreign competition.",
        points: [
          "For: protects infant industries until they can compete (1)",
          "For: saves jobs in industries threatened by cheap imports (1)",
          "For: prevents dumping (1)",
          "For: improves the balance of payments / raises tariff revenue (1)",
          "For: strategic industries such as food security (1)",
          "Against: higher prices and less choice for consumers (1)",
          "Against: higher costs for firms using imported inputs (1)",
          "Against: retaliation hurts Zimbabwean exporters (1)",
          "Against: protected firms become inefficient / smuggling (1)",
          "Against: conflicts with trading bloc commitments (SADC, COMESA) (1)",
          ["Justified conclusion, e.g. limited, temporary protection for selected industries", 2],
        ],
        levels: L12,
        modelAnswer: "Protection through tariffs, quotas and other controls can help Zimbabwe. New industries need time to grow before they can match large foreign producers, and jobs in clothing, food processing and other industries can be lost to cheap imports, especially if foreign firms dump goods below cost. Fewer imports also save foreign currency and tariffs raise revenue, and keeping food production at home protects food security. On the other hand, protection raises prices and reduces choice for consumers, and firms that use imported machinery and materials face higher costs, which makes their own goods less competitive. Other countries may retaliate against Zimbabwe's exports, and as a member of SADC and COMESA Zimbabwe has agreed to reduce tariffs with its partners. Firms sheltered from competition may also stay inefficient, and high tariffs encourage smuggling. On balance, Zimbabwe should avoid broad protection but may justify limited, temporary protection for genuinely new or strategic industries and anti-dumping duties, combined with measures that make local firms more efficient.",
      }),
    ],
    explanation: "(a) Difficulties of exporting with a remedy for each. (b) Arguments for and against protection, with a reasoned conclusion.",
    hints: ["(a) Pair each difficulty with a remedy.", "(b) Consider producers, consumers, workers, government and trading partners."],
  });
});
