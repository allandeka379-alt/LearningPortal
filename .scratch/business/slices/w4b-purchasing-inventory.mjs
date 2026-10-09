// W4b: purchasing and inventory management (BES 7.8.5, CAM 4.1.1). Purchasing cycle and e-purchasing are BES depth.
import { concept, P, BES, money, fmt, r2, table } from "../lib.mjs";

concept("bus.operations.purchasing-inventory", { file: "operations/purchasing-inventory", keyPrefix: "operations.purchasing-inventory" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of **work in progress**?",
    options: [
      ["Chairs that have been assembled but not yet varnished", "Correct: partly finished goods."],
      ["Planks of timber waiting in the yard", "These are raw materials."],
      ["Varnished chairs packed and ready to deliver to customers", "These are finished goods."],
      ["Money owed by customers for chairs", "That is trade receivables, not inventory."],
    ],
    answer: "A",
    explanation: "Work in progress is partly made goods still in production.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **lead time**?",
    options: [
      ["The time between ordering goods and receiving them", "Correct: the delivery waiting time."],
      ["The time it takes to sell all the finished goods", "That relates to stock turnover."],
      ["The time workers take to make one product", "That is production time."],
      ["The time allowed to pay a supplier's invoice", "That is the credit period."],
    ],
    answer: "A",
    explanation: "Lead time is the delay between placing an order and the goods arriving.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **cost** of holding a large amount of inventory?",
    options: [
      ["Cash is tied up that could be used elsewhere", "Correct: money spent on stock is not available for other uses."],
      ["Production may stop because materials run out", "That is a cost of holding too little inventory."],
      ["Customers may go to rivals because goods are unavailable", "That is a cost of holding too little."],
      ["Bulk-buying discounts are lost", "Holding more stock usually gains bulk discounts."],
    ],
    answer: "A",
    explanation: "Large inventories tie up working capital and cost money to store, insure and protect.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does a business keep a buffer stock?",
    options: [
      ["To keep going if a delivery is late or demand rises suddenly", "Correct: buffer stock is a safety margin."],
      ["To make sure it never has to buy from suppliers again", "Buffer stock is used up and must be replaced."],
      ["To increase the amount of cash in the bank", "Holding stock uses cash."],
      ["To avoid paying for storage space", "Buffer stock needs storage space."],
    ],
    answer: "A",
    explanation: "Buffer (safety) stock protects against delays and unexpected demand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Ordering school-uniform fabric in October so that it arrives before the January rush meets which right of purchasing?",
    options: [
      ["Right time", "Correct: goods arrive when they are needed."],
      ["Right quality", "Quality is about fitness for purpose."],
      ["Right source", "Source is about choosing a reliable supplier."],
      ["Right price", "Price is about best value."],
    ],
    answer: "A",
    explanation: "Allowing for lead time so goods arrive when needed is the right time.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Which business is likely to hold the **smallest** inventory compared with its sales?",
    options: [
      ["A bakery selling fresh bread daily", "Correct: bread is perishable and made daily."],
      ["A hardware shop selling tools and cement", "Hardware keeps well and many lines are stocked."],
      ["A car-parts importer with long lead times", "Long, uncertain lead times need large stocks."],
      ["A furniture showroom displaying many designs", "Showrooms hold stock for display and choice."],
    ],
    answer: "A",
    explanation: "Perishable goods cannot be stored for long, so inventory is kept low.",
    hints: ["Which goods go off quickly?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A manufacturer imports its main component and deliveries are often delayed at the border. What should it do with its inventory?",
    options: [
      ["Hold a larger buffer stock of the component", "Correct: protects production against delays."],
      ["Hold no stock at all and order daily", "With unreliable deliveries production would often stop."],
      ["Stop production whenever a delivery is late", "This loses sales and wastes labour."],
      ["Sell its finished goods only on credit", "Credit terms do not solve supply delays."],
    ],
    answer: "A",
    explanation: "Long or uncertain lead times call for more safety stock, despite the cost.",
    hints: ["What protects production when supplies are uncertain?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: BES,
    stem: "In the purchasing cycle, what happens **immediately after** quotations are compared?",
    options: [
      ["The supplier is chosen and an order is placed", "Correct: comparison leads to choosing a supplier."],
      ["The goods are received and checked", "Goods arrive only after an order is placed."],
      ["The supplier's invoice is paid", "Payment comes after the goods and invoice arrive."],
      ["The need for more materials is identified by stores", "This is the first step of the cycle."],
    ],
    answer: "A",
    explanation: "Need → find suppliers → quotations → choose and order → receive and check → pay → review.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Raw materials, work in progress and finished goods are all types of inventory.",
    answer: true,
    explanation: "True. These are the three types of inventory a manufacturer holds.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The best supplier is always the one with the lowest price per unit.",
    answer: false,
    explanation: "False. Delivery costs, quality, reliability, lead time and credit terms all matter (the five rights).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each right of purchasing with its meaning.",
    pairs: [
      ["Right quality", "Materials fit for the purpose"],
      ["Right quantity", "Enough to meet needs without overstocking"],
      ["Right price", "Best value including discounts and delivery"],
      ["Right time", "Goods arrive when they are needed"],
      ["Right source", "A reliable supplier with good service"],
    ],
    explanation: "The five rights guide every buying decision.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Inventory kept in case of late deliveries is called {{blank:a}} stock. Buying from suppliers using the internet and electronic payments is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["buffer"], choices: ["buffer", "finished", "maximum", "opening"] },
      { id: "b", accepted: ["e-purchasing"], choices: ["e-purchasing", "just-in-time", "batch buying", "hire purchase"] },
    ],
    explanation: "Buffer stock is a safety margin; e-purchasing is electronic buying.",
  });
  const qa = 800, pa = 2.6, da = 120, pb = 2.45, db = 290;
  const ta = r2(qa * pa + da), tb = r2(qa * pb + db);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: r2(tb - ta), calculator: true,
    stem: `A paint maker needs ${qa} litres of resin. Supplier X charges ${money(pa)} a litre plus ${money(da)} delivery. Supplier Y charges ${money(pb)} a litre plus ${money(db)} delivery. Calculate how much cheaper Supplier X is in total.`,
    wrong: [r2(qa * (pa - pb)), r2(db - da)],
    explanation: `X = ${fmt(qa)} × ${pa.toFixed(2)} + ${fmt(da)} = ${fmt(ta)}; Y = ${fmt(qa)} × ${pb.toFixed(2)} + ${fmt(db)} = ${fmt(tb)}; difference ${money(r2(tb - ta))}.`,
    workedSolution: `1. Supplier X: ${qa} × ${pa.toFixed(2)} = ${fmt(qa * pa)}; + ${fmt(da)} = ${fmt(ta)}.\n2. Supplier Y: ${qa} × ${pb.toFixed(2)} = ${fmt(qa * pb)}; + ${fmt(db)} = ${fmt(tb)}.\n3. X is cheaper by ${fmt(tb)} − ${fmt(ta)} = ${money(r2(tb - ta))}.`,
    hints: ["Include delivery in each total.", "Then find the difference."],
  });
  const use = 45, lead = 6, buf = 90;
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: use * lead + buf,
    stem: `A shoe factory uses ${use} m² of leather a day. The supplier's lead time is ${lead} days and the factory keeps a buffer stock of ${buf} m². At what stock level (in m²) should it re-order so that it does not fall below the buffer stock?`,
    wrong: [use * lead, use * lead - buf],
    explanation: `Used during the lead time = ${use} × ${lead} = ${use * lead}; re-order level = ${use * lead} + ${buf} = ${use * lead + buf} m².`,
    hints: ["How much is used while waiting for delivery?", "Add the buffer stock."],
  });
  const stockV = 18000, holdPct = 20;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: (stockV * holdPct) / 100, daily: true,
    stem: `A wholesaler holds inventory worth ${money(stockV)} on average. Assume the yearly cost of storing, insuring and financing it is ${holdPct}% of its value. Calculate the yearly cost of holding the inventory.`,
    wrong: [stockV - (stockV * holdPct) / 100],
    explanation: `${holdPct}% × ${fmt(stockV)} = ${money((stockV * holdPct) / 100)}.`,
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a manufacturer holds inventory of raw materials.",
    points: [
      "Reason 1, e.g. production continues if delivery is late (1)",
      "Explained: workers and machines are not left idle; orders met (1)",
      "Reason 2, e.g. bulk-buying discounts / meet sudden rise in demand / expected price rises (1)",
      "Explained: lower cost per unit / sales not lost (1)",
    ],
    modelAnswer: "Holding raw materials keeps production going if a supplier delivers late, so workers and machines are not idle. Buying in larger quantities also gains bulk-buying discounts, which lowers the cost of each unit produced.",
    explanation: "Inventory protects production and can reduce costs.",
    hints: ["What happens if materials run out?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: BES,
    stem: "Explain **one** advantage and **one** disadvantage of e-purchasing for a small enterprise.",
    points: [
      "Advantage, e.g. compare many suppliers' prices quickly (1)",
      "Explained: lower costs / time saved / orders at any time (1)",
      "Disadvantage, e.g. fraud risk / cannot inspect goods / needs internet and power (1)",
      "Explained: may lose money or receive poor-quality goods / orders fail during outages (1)",
    ],
    modelAnswer: "E-purchasing lets the owner compare the prices of many suppliers quickly online, so materials can be bought more cheaply. However, the goods cannot be inspected before buying, so the enterprise may receive poor-quality materials or be cheated by a fake website.",
    explanation: "E-purchasing is fast and cheap but carries fraud and quality risks.",
    hints: ["Think about price comparison and about trust."],
  });
  // Structured 1 (8-15): supplier choice.
  const sup = [["Supplier", "Price per bag (US\\$)", "Delivery charge (US\\$)", "Lead time", "Quality", "Credit"], ["Kudzai Feeds (Harare)", "14.50", 150, "2 days", "Good", "30 days"], ["Mvura Agro (Bulawayo)", "13.80", 420, "7 days", "Good", "Cash only"]];
  const n = 400;
  const tK = r2(n * 14.5 + 150), tM = r2(n * 13.8 + 420);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Rudo runs a poultry farm near Chinhoyi. She needs ${n} bags of chicken feed a month and has received two quotations.\n\n${table(sup[0], sup.slice(1), { align: ["l", "r", "r", "l", "l", "l"] })}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: tK, stem: "Calculate the total monthly cost of buying from Kudzai Feeds.", wrong: [n * 14.5], explanation: `${n} × 14.50 + 150 = ${money(tK)}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "money", value: tM, stem: "Calculate the total monthly cost of buying from Mvura Agro.", wrong: [r2(n * 13.8)], explanation: `${n} × 13.80 + 420 = ${money(tM)}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "State **two** of the five rights of purchasing, other than price, that Rudo should consider.", points: ["Right time (lead time) (1)", "Right quality / right source / right quantity (1)"] }),
      P.manual({ label: "(d)", marks: 6, stem: "Recommend which supplier Rudo should choose. Justify your answer.", points: [`Total cost: Mvura cheaper by ${money(r2(tK - tM))} a month (1)`, "Kudzai: 2-day lead time, less buffer stock needed; chickens must be fed every day (1)", "Kudzai gives 30 days' credit: helps cash flow (1)", "Mvura: cash only and 7-day lead time: more stock and cash tied up (1)", "Quality is equal, so other factors decide (1)", "Justified recommendation (1)"] }),
    ],
    explanation: `Kudzai ${money(tK)}; Mvura ${money(tM)}. The saving must be weighed against lead time and credit.`,
    hints: ["Total cost = price × quantity + delivery."],
  });
  // Structured 2: inventory levels.
  const inv2 = 36000, sales2 = 12000;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `Nyasha owns a clothing shop in Gweru. She holds inventory worth ${money(inv2)} and sells about ${money(sales2)} of stock (at cost) a month. Many dresses have been in the shop for over six months. She is short of cash to pay her rent.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "plain", value: inv2 / sales2, stem: "Calculate how many months of sales her inventory would last.", wrong: [sales2 / inv2], explanation: `${fmt(inv2)} ÷ ${fmt(sales2)} = ${inv2 / sales2} months.` }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain **two** costs to Nyasha of holding this much inventory.", points: ["Cash tied up: cannot pay rent (1)", "Developed: may need an overdraft and pay interest (1)", "Goods go out of fashion / damaged / storage and insurance costs (1)", "Developed: may have to sell at a loss later (1)"] }),
      P.manual({ label: "(c)", marks: 4, stem: "Recommend how Nyasha should manage her inventory in future. Justify your answer.", points: ["Clearance sale of old dresses to raise cash (1)", "Buy smaller quantities more often; watch which lines sell (1)", "Keep stock records / set maximum levels (1)", "Justified, with drawback (lower margins, more orders) (1)"] }),
    ],
    explanation: `Inventory covers ${inv2 / sales2} months of sales: too much cash tied up in slow-moving stock.`,
    hints: ["Divide the inventory by monthly sales."],
  });
  b.card("DEFINITION", "Purchasing", "Buying materials, components, goods for resale and services on the best terms.");
  b.card("CONCEPT", "Five rights of purchasing", "Right quality, right quantity, right price, right time, right source (supplier).");
  b.card("CONCEPT", "Purchasing cycle", "Identify need → find suppliers → quotations → choose and order → receive and check → pay → review.", null, { applies: BES });
  b.card("CONCEPT", "Types of inventory", "Raw materials, work in progress, finished goods (and goods for resale for traders).");
  b.card("CONCEPT", "Why hold inventory", "Avoid stoppages, meet sudden or seasonal demand, bulk discounts, customer choice, protect against price rises.");
  b.card("CONCEPT", "Costs of holding inventory", "Cash tied up, storage, insurance, security, damage, theft, obsolescence, interest.");
  b.card("CONCEPT", "Costs of too little inventory", "Production stops, lost sales, higher ordering costs, no bulk discounts.");
  b.card("DEFINITION", "Lead time", "The time between placing an order and receiving the goods.");
  b.card("DEFINITION", "Buffer stock", "Minimum inventory kept in case of delays or sudden demand.");
});
