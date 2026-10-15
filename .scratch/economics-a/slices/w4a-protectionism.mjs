// W4a: protectionism (both boards; ZIMSEC Form 5, Cambridge AS). Embargoes and administrative barriers are ZIMSEC detail.
import { concept, P, chk, table, fmt, roundTo, tariffEffect, schedule, ZIM } from "../lib.mjs";
import { mc, LV10 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

// Q-set: P = 150 - Q (demand), P = 30 + Q (supply), world price 60, tariff 15
const te = tariffEffect({ a: 150, b: 1, c: 30, d: 1, pw: 60, tariff: 15 });
chk(te.free.qd, 90); chk(te.free.qs, 30); chk(te.importsFree, 60);
chk(te.tariff.price, 75); chk(te.tariff.qd, 75); chk(te.tariff.qs, 45); chk(te.importsTariff, 30);
chk(te.revenue, 450); chk(te.consumerLoss, 1237.5); chk(te.producerGain, 562.5); chk(te.welfareLoss, 225); chk(te.check, 0);

concept("aecon.trade.protectionism", { file: "trade/protectionism", keyPrefix: "trade.protectionism" }, (b) => {
  mc(b, [2, "RECALL"], "A tariff is",
    ["a tax on imported goods", "Correct: it raises the price of imports."],
    [["a limit on the quantity of imports allowed", "This is a quota."],
     ["a payment to firms that sell goods abroad", "This is an export subsidy."],
     ["a ban on all trade with another country", "This is an embargo."]],
    "A tariff is a tax on imports; quotas limit quantities; export subsidies are payments; embargoes are bans.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A tariff on an imported good is likely to cause",
    ["a rise in the domestic price and a fall in the quantity imported", "Correct: imports become dearer, so fewer are bought."],
    [["a fall in the domestic price and a rise in the quantity imported", "A tariff raises the price of imports."],
     ["a rise in the domestic price and a rise in the quantity imported", "A higher price reduces imports."],
     ["no change in the price, because the tax is paid by foreign firms", "In a small country the home price rises by the full tariff."]],
    "The domestic price rises by the tariff, the quantity demanded falls, home output rises and imports fall.", { daily: true });

  mc(b, [3, "ANALYSIS"], "Compared with a tariff that gives the same price rise, an import quota",
    ["raises no revenue for the government unless the import licences are sold", "Correct: the extra revenue goes to importers or foreign exporters."],
    [["raises more revenue for the government because imports are smaller", "Quotas yield no tax revenue."],
     ["has no effect on the price paid by consumers", "A binding quota raises the domestic price."],
     ["raises the quantity imported above the free trade level", "A quota restricts imports."]],
    "A quota creates a rent for those who hold the licences; a tariff gives revenue to the government.", { hints: ["Who collects the difference between the domestic price and the world price?"] });

  mc(b, [2, "UNDERSTANDING"], "The 'infant industry' argument says that protection is justified because new industries",
    ["need time to grow and become competitive", "Correct: temporary protection can allow them to achieve scale."],
    [["will never be able to compete with foreign firms in any market", "The argument assumes that they can eventually compete."],
     ["should receive no help because they are not yet profitable", "The argument supports temporary help."],
     ["are always the main source of export earnings in an economy", "New industries are small at the start."]],
    "The argument is that temporary protection lets new industries gain scale and skills.");

  mc(b, [3, "ANALYSIS"], "Which is the main risk of a country introducing a tariff on imports from its trading partners?",
    ["they may retaliate with tariffs on the country's exports", "Correct: this can start a trade war."],
    [["the price of the protected good will certainly fall", "A tariff raises the price."],
     ["consumers will buy more imports at higher prices", "Quantity demanded falls when price rises."],
     ["foreign firms will always increase their investment there", "Tariffs may encourage some foreign investment, but it is not certain."]],
    "Retaliation can reduce exports and leave all countries worse off.", { hints: ["How might the other country respond?"] });

  mc(b, [2, "RECALL"], "Which of the following is an administrative barrier to trade?",
    ["Long delays and extra paperwork at customs for imported goods", "Correct: red tape raises the cost of importing."],
    [["A tax charged on every unit of an imported good", "This is a tariff."],
     ["A limit on the number of units of a good that may be imported", "This is a quota."],
     ["A payment to domestic firms for every unit they export", "This is an export subsidy."]],
    "Administrative barriers include licences, standards, paperwork and delays.", { applies: ZIM });

  mc(b, [4, "EVALUATION"], "Which of the following would make protection for an infant industry in a developing country MOST likely to succeed?",
    ["It is temporary, with a clear plan for the industry to compete", "Correct: it limits inefficiency and gives a target."],
    [["It is permanent, so firms can rely on high prices forever", "Permanent protection removes the incentive to improve."],
     ["It covers every industry in the country at the same rate", "Blanket protection raises costs for all."],
     ["It is introduced without telling the firms when it will end", "Uncertainty reduces the incentive to prepare."]],
    "Protection works best if it is temporary, targeted and linked to a plan.", { hints: ["What stops protected firms from becoming complacent?"] });

  {
    chk(te.importsTariff, 30);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: te.importsTariff, unit: "units", dp: 0, tol: 0.5, hints: ["Price with the tariff = world price + tariff."],
      stem: "Home demand is P = 150 − Q and home supply is P = 30 + Q (P in US\\$, Q in units). The world price is US\\$60. The government imposes a tariff of US\\$15 per unit. Calculate the quantity of imports after the tariff, in units.",
      wrong: [60, 75, 45], explanation: "Price with tariff = 60 + 15 = 75. Qd = 150 − 75 = 75, Qs = 75 − 30 = 45. Imports = 75 − 45 = 30 units." });
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: te.revenue, hints: ["Revenue = tariff per unit × imports after the tariff."],
      stem: "Using the same market (demand P = 150 − Q; supply P = 30 + Q; world price US\\$60; tariff US\\$15 per unit), calculate the government's tariff revenue, in US\\$.",
      wrong: [900, 1125, 225], explanation: "Imports after the tariff are 30 units, so revenue = 15 × 30 = US\\$450." });
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: te.consumerLoss, calculator: true, hints: ["Loss = average of the old and new quantities demanded × price rise."],
      stem: "Using the same market (demand P = 150 − Q; supply P = 30 + Q; world price US\\$60; tariff US\\$15 per unit), calculate the loss of consumer surplus caused by the tariff, in US\\$.",
      wrong: [1125, 1350, 562.5], explanation: "Qd falls from 90 to 75. Loss = (90 + 75) ÷ 2 × 15 = US\\$1,237.50." });
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: te.welfareLoss, calculator: true, hints: ["Net welfare loss = consumer loss − producer gain − revenue."],
      stem: "Using the same market (demand P = 150 − Q; supply P = 30 + Q; world price US\\$60; tariff US\\$15 per unit), calculate the net welfare loss to the economy from the tariff, in US\\$.",
      wrong: [450, 562.5, 1237.5], explanation: "1. Consumer surplus loss = US\\$1,237.50.\n2. Producer surplus gain = (30 + 45) ÷ 2 × 15 = US\\$562.50.\n3. Tariff revenue = US\\$450.\n4. Net welfare loss = 1,237.50 − 562.50 − 450 = US\\$225." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true,
    stem: "True or false: a tariff usually causes a net welfare loss to the country that imposes it, even though some groups gain.",
    feedbackTrue: "Producers and the government gain, but consumers lose more than they gain.",
    explanation: "Consumers lose more than producers and the government gain, leaving a net welfare loss." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each protectionist measure with its description.",
    pairs: [["Tariff", "A tax on imports"], ["Import quota", "A limit on the quantity of imports"], ["Export subsidy", "A payment per unit exported"], ["Embargo", "A ban on trade with a particular country"]],
    explanation: "Each measure restricts or favours trade in a different way." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A tariff {{blank:a}} the price of imports and reduces the quantity bought. If other countries respond with their own tariffs, this is called {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["raises"], choices: ["raises", "lowers", "fixes"] }, { id: "b", accepted: ["retaliation"], choices: ["retaliation", "dumping", "specialisation"] }],
    explanation: "A tariff raises the price of imports; reactions by other countries are retaliation." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to a limit on the quantity of a good that may be imported?",
    accepted: ["quota", "import quota", "a quota", "an import quota"], wrong: ["tariff"],
    explanation: "An import quota limits the quantity of imports." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Give the effect on price, quantity and domestic firms."],
    stem: "Explain how a tariff protects domestic producers.",
    points: ["A tariff raises the price of imported goods in the home market.", "Imports become less competitive, so consumers switch to home-produced goods.", "The quantity supplied by home firms rises at the higher price.", "So home firms' output, revenue and employment increase."],
    modelAnswer: "A tariff raises the price of imported goods in the home market, so imports become less competitive. Consumers switch to home-produced goods, and home firms supply more at the higher price, so their output, revenue and employment increase.",
    explanation: "Higher import price; switch; more home output; more jobs." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think of consumers and firms that import inputs."],
    stem: "Explain two disadvantages of a tariff.",
    points: ["Consumers pay higher prices and have less choice.", "Firms that use imported inputs face higher costs.", "Other countries may retaliate, reducing exports."],
    modelAnswer: "Consumers pay higher prices and have less choice. Firms that use imported inputs face higher costs, and other countries may retaliate, which reduces exports.",
    explanation: "Higher prices; higher costs; retaliation." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 5, hints: ["Why might protection become permanent?"],
    stem: "Analyse the problems with the infant industry argument for protection.",
    points: ["It is hard to identify which industries will become competitive.", "Protected firms face less competition, so they may have little incentive to reduce costs.", "Protection may become permanent because the industry lobbies for it.", "Consumers pay higher prices while the industry grows.", "Other methods (training, finance) may be less costly than tariffs."],
    modelAnswer: "It is hard to identify which industries will become competitive, so the government may protect the wrong ones. Protected firms face less competition, so they may have little incentive to cut costs, and protection may become permanent because the industry lobbies to keep it. Meanwhile consumers pay higher prices while the industry grows, and other methods such as training or finance may help the industry at lower cost.",
    explanation: "Selection difficulty; complacency; permanence; consumer cost; alternatives." });

  {
    const prices = [30, 40, 50, 60, 70, 80];
    const qdA = [90, 80, 70, 60, 50, 40], qsA = [10, 20, 30, 40, 50, 60];
    const s = schedule({ prices, qd: qdA, qs: qsA, priceHeader: "Price (US\\$)", qdHeader: "Quantity demanded (units)", qsHeader: "Quantity supplied by home firms (units)", requireEquilibrium: true });
    chk(s.equilibrium.price, 70);
    const i0 = qdA[1] - qsA[1], i1 = qdA[2] - qsA[2]; chk(i0, 60); chk(i1, 40);
    const rev = 10 * i1; chk(rev, 400);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Price with the tariff = world price + tariff.", "Revenue = tariff × imports."],
      stem: `**A tariff on school exercise books (a fictional country, illustrative)**\n\nThe table shows the home market for exercise books. The country is small and the world price is US\\$40. The government then imposes a tariff of US\\$10 per book.\n\n${s.md}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: i0, unit: "units", dp: 0, tol: 0.5, stem: "Calculate the quantity imported before the tariff, in units.", wrong: [80, 20, 40], explanation: "At US\\$40: Qd = 80 and Qs = 20, so imports = 60 units." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: i1, unit: "units", dp: 0, tol: 0.5, stem: "Calculate the quantity imported after the tariff, in units.", wrong: [60, 70, 30], explanation: "The price rises to US\\$50: Qd = 70 and Qs = 30, so imports = 40 units." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: rev, stem: "Calculate the government's tariff revenue, in US\\$.", wrong: [600, 800, 300], explanation: "Revenue = 10 × 40 = US\\$400." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain how the tariff affects consumers of exercise books.",
          points: ["The price rises from US\\$40 to US\\$50.", "Quantity demanded falls from 80 to 70, so consumers pay more and buy less."],
          modelAnswer: "The price rises from US\\$40 to US\\$50 and the quantity demanded falls from 80 to 70, so consumers pay more and buy less." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain how the tariff affects domestic producers of exercise books.",
          points: ["The higher price encourages home firms to supply more: output rises from 20 to 30.", "So their revenue and profits (and employment) rise."],
          modelAnswer: "The higher price encourages home firms to supply more, with output rising from 20 to 30 units, so their revenue, profits and employment rise." }),
      ],
      explanation: "Imports fall from 60 to 40; revenue US\\$400; consumers pay more; home producers gain." });
  }
  {
    const pw = 80, t = 0.25; const pTar = pw * (1 + t); chk(pTar, 100);
    const rev = (pTar - pw) * 4000; chk(rev, 80000);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Price with the tariff = world price × (1 + tariff rate).", "In (d) weigh the infant industry case against retaliation and higher costs."],
      stem: "**Protecting a car-parts industry in Mbira (a fictional economy, illustrative)**\n\nMbira has a new car-parts industry that employs 1,200 workers but cannot yet match the prices of imports. The world price of a standard part is US\\$80. The government introduces a tariff of 25% on imported parts, to last for five years. Imports under the tariff are expected to be 4,000 parts a year. Supporters argue that the industry will grow and lower its costs. Critics say that garages and taxi owners will pay more for repairs, and that a neighbouring country has threatened to put a tariff on Mbira's tea exports in reply.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pTar, stem: "Calculate the price of an imported part in Mbira after the tariff, in US\\$.", wrong: [20, 60, 105], explanation: "Tariff = 25% × 80 = US\\$20, so the price = 80 + 20 = US\\$100." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: rev, stem: "Calculate the government's annual tariff revenue, in US\\$.", wrong: [20, 400000, 320000], explanation: "Tariff per part = US\\$20; revenue = 20 × 4,000 = US\\$80,000." }),
        P.manual({ label: "(c)", marks: 4, stem: "Explain the infant industry argument for the tariff.",
          points: ["New industries have high costs because they are small and have not learned by experience.", "The tariff raises the price of imports so that the home industry can sell its parts.", "As output grows the industry gains economies of scale and skills and can lower its costs.", "After five years it may be able to compete without protection."],
          modelAnswer: "New industries have high costs because they are small and have not yet gained experience. The tariff raises the price of imported parts so that the home industry can sell its output. As output grows the industry gains economies of scale and skills and can lower its costs, so after five years it may be able to compete without protection." }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether the tariff is a good policy for Mbira.",
          points: ["It protects 1,200 jobs and gives the industry time to grow, and raises revenue.", "Garages and taxi owners pay more for parts, so costs of transport and repairs rise.", "Retaliation on tea exports could cost jobs in an industry where Mbira has a comparative advantage.", "Judgement: justified only if the tariff is truly temporary and the industry can become competitive."],
          modelAnswer: "The tariff protects 1,200 jobs, gives the industry time to grow and raises government revenue. However, garages and taxi owners pay more for parts, which raises transport and repair costs, and retaliation against tea exports could cost jobs in an industry where Mbira has a comparative advantage. The tariff is justified only if it is truly temporary and the industry has a real chance of becoming competitive." }),
      ],
      explanation: "Tariff raises the price to US\\$100 and yields US\\$80,000; infant industry case against higher costs and retaliation." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 10, hints: ["Consider the arguments for and against protection, the type of country and the alternatives."],
    stem: "Evaluate the case for protection of domestic industries in a developing country.",
    points: ["Infant industries may need temporary help to gain scale and skills.", "Strategic industries (food, energy) may need protection for security.", "Tariffs raise revenue where other taxes are hard to collect.", "Protection may offset dumping and give time to adjust.", "Higher prices for consumers and higher costs for firms using imported inputs.", "Inefficiency and complacency; protection often becomes permanent.", "Retaliation can reduce exports.", "Alternatives: training, finance or technology support do not distort prices as much.", "Application to a developing country.", "A justified judgement."],
    levels: LV10, wordLimit: { min: 150, max: 400 },
    modelAnswer: "Protection can be justified in a developing country if new industries need temporary help to gain scale and skills, if some industries are strategic, such as food or energy, or if it offsets dumping. Tariffs also raise revenue where other taxes are hard to collect and may give time for workers to adjust. However, tariffs raise prices for consumers and costs for firms that use imported inputs, protected firms may become inefficient, and protection often becomes permanent because the industries it supports lobby to keep it. Other countries may retaliate, which would reduce exports, and there may be better ways of helping new industries, such as training, finance or technology support, which distort prices less. Protection is therefore most defensible when it is temporary, targeted at industries with a real prospect of competing and accompanied by a plan to remove it. As a general policy it is likely to cost the country more than it gains.",
    explanation: "Infant industry and strategic arguments against higher costs, complacency and retaliation, with a judgement." });

  b.card("DEFINITION", "Define a **tariff**.", "A tax on imported goods.");
  b.card("DEFINITION", "Define an **import quota**.", "A limit on the quantity of a good that may be imported in a period.");
  b.card("CONCEPT", "Effects of a tariff on a small country's market?", "Higher price, lower quantity demanded, higher home output, fewer imports, government revenue, and a net welfare loss.");
  b.card("FORMULA", "Tariff revenue?", "Tariff per unit × quantity of imports after the tariff.");
  b.card("CONCEPT", "Quota against tariff: who gets the extra revenue?", "A quota's extra revenue goes to importers or licence holders; a tariff's goes to the government.");
  b.card("CONCEPT", "State four arguments for protection.", "Infant industries, strategic industries, dumping and the balance of payments or employment.");
  b.card("CONCEPT", "State four arguments against protection.", "Inefficiency, higher prices, retaliation and rent-seeking or corruption.");
  b.card("DEFINITION", "What is an embargo?", "An official ban on trade with a particular country or in particular goods.", null, { applies: ZIM });
  b.card("CONCEPT", "When is infant industry protection most justified?", "When it is temporary, targeted at industries that can become competitive, and part of a plan.");
});
