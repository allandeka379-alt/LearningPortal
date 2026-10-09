// W1a: balance of trade and balance of payments (COM).
import { concept, P, f, fmt, table, sum, check } from "../lib.mjs";

const sign = (v) => (v < 0 ? `a deficit of US\\$${fmt(-v)} million` : `a surplus of US\\$${fmt(v)} million`);

concept("bus.trade.balance-of-payments", { file: "trade/balance-of-payments", keyPrefix: "trade.balance-of-payments" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an example of **visible** trade?",
    options: [
      ["Zimbabwe selling gold to a foreign buyer", "Correct: gold is a good."],
      ["Foreign tourists staying at a hotel in Kariba", "Tourism is a service: invisible trade."],
      ["A firm paying a foreign insurer for cover", "Insurance is a service: invisible trade."],
      ["Freight charges paid to a foreign shipping line", "Transport is a service: invisible trade."],
    ],
    answer: "A",
    explanation: "Visible trade is trade in goods; invisible trade is trade in services.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The balance of trade is the difference between:",
    options: [
      ["visible exports and visible imports", "Correct: goods only."],
      ["invisible exports and invisible imports", "That is the invisible balance."],
      ["all exports and all imports of goods and services", "That is (most of) the current account."],
      ["government income and government spending", "That is the government budget."],
    ],
    answer: "A",
    explanation: "Balance of trade = visible exports − visible imports.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tourists from overseas spend money at Victoria Falls. For Zimbabwe this is:",
    options: [
      ["an invisible export", "Correct: a service is sold and foreign currency flows in."],
      ["an invisible import", "Imports involve money flowing out of Zimbabwe."],
      ["a visible export", "No goods leave the country; tourism is a service."],
      ["a visible import", "Tourism is a service, and the money flows in."],
    ],
    answer: "A",
    explanation: "Follow the money: money flowing in is an export; tourism is a service, so it is invisible.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A Zimbabwean company pays a foreign airline to fly its flowers to Europe. For Zimbabwe this payment is:",
    options: [
      ["an invisible import", "Correct: a service is bought from abroad and money flows out."],
      ["an invisible export", "The money flows out of Zimbabwe, so it is an import."],
      ["a visible export", "The flowers are a visible export, but the freight payment is a service."],
      ["a visible import", "Transport is a service, so it is invisible."],
    ],
    answer: "A",
    explanation: "Freight paid to foreign carriers is an invisible import; the flowers themselves are a visible export.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which measure would most directly reduce a current account deficit by raising export earnings?",
    options: [
      ["Promoting exports through trade fairs and export finance", "Correct: it helps exporters sell more abroad."],
      ["Removing all tariffs on imported goods", "This would increase imports."],
      ["Raising the value of the currency against other currencies", "A stronger currency makes exports dearer abroad."],
      ["Encouraging people to holiday abroad", "This raises invisible imports."],
    ],
    answer: "A",
    explanation: "Export promotion raises export earnings; import controls, import substitution and devaluation also reduce deficits.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A fall in world prices for platinum and tobacco is **most likely** to cause:",
    options: [
      ["a worse balance of trade for Zimbabwe", "Correct: the same exports earn less foreign currency."],
      ["a better balance of trade for Zimbabwe", "Lower export prices reduce export earnings."],
      ["no change, because volumes are unchanged", "Values (price × quantity) fall even if volumes are unchanged."],
      ["an increase in invisible exports", "Platinum and tobacco are goods, so visible trade is affected."],
    ],
    answer: "A",
    explanation: "Export earnings are price × quantity, so lower prices for major exports worsen the visible balance.",
    hints: ["Are platinum and tobacco visible or invisible?", "What happens to the value of exports?"],
  });
  const vx1 = 3250, vm1 = 2980;
  const bot1 = f.balanceOfTrade(vx1, vm1);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: bot1, daily: true,
    stem: `A fictional country's visible exports were US\\$${fmt(vx1)} million and its visible imports were US\\$${fmt(vm1)} million. Calculate its balance of trade in US\\$ million (give a deficit as a negative number).`,
    wrong: [-bot1, vx1 + vm1],
    explanation: `${fmt(vx1)} − ${fmt(vm1)} = ${fmt(bot1)}: ${sign(bot1)}.`,
  });
  const ix2 = 420, im2 = 610;
  const inv2 = f.invisibleBalance(ix2, im2);
  b.num({
    d: 3, skill: "APPLICATION", kind: "plain", value: inv2,
    stem: `A fictional country's invisible exports were US\\$${fmt(ix2)} million and its invisible imports were US\\$${fmt(im2)} million. Calculate its invisible balance in US\\$ million (give a deficit as a negative number).`,
    wrong: [-inv2, ix2 + im2],
    explanation: `${fmt(ix2)} − ${fmt(im2)} = −${fmt(-inv2)}: ${sign(inv2)}.`,
    hints: ["Invisible balance = invisible exports − invisible imports.", "Is the answer positive or negative?"],
  });
  const vx3 = 1750, def3 = 320;
  const vm3 = vx3 + def3;
  check("reverse BoT", f.balanceOfTrade(vx3, vm3), -def3);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: vm3,
    stem: `A fictional country had visible exports of US\\$${fmt(vx3)} million and a balance of trade **deficit** of US\\$${fmt(def3)} million. Calculate its visible imports in US\\$ million.`,
    wrong: [vx3 - def3, def3],
    explanation: `Balance of trade = exports − imports, so −${fmt(def3)} = ${fmt(vx3)} − imports; imports = ${fmt(vx3)} + ${fmt(def3)} = ${fmt(vm3)}.`,
    workedSolution: `1. Balance of trade = visible exports − visible imports.\n2. A deficit means imports are greater than exports by ${fmt(def3)}.\n3. Visible imports = ${fmt(vx3)} + ${fmt(def3)} = US\\$${fmt(vm3)} million.`,
    hints: ["A deficit means imports are bigger than exports.", "Add the deficit to the exports."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Invisible trade is trade in services such as banking, insurance, transport and tourism.",
    answer: true,
    explanation: "True. Goods are visible; services are invisible.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country with a balance of trade surplus must also have a current account surplus.",
    answer: false,
    explanation: "False. A large invisible deficit (for example on freight and insurance) can outweigh a visible surplus.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Classify each item from Zimbabwe's point of view.",
    right: ["Visible export", "Visible import", "Invisible export", "Invisible import"],
    pairs: ["Citrus fruit sold to a foreign supermarket chain", "Vehicles bought from abroad", "A foreign mining company insures its equipment with a Zimbabwean insurer", "Zimbabwean students pay fees to a foreign university"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Goods are visible, services invisible; money flowing in is an export, money flowing out an import.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formulae.",
    template: "Balance of trade = visible exports − visible {{blank:a}}. Current account balance = balance of trade plus the {{blank:b}} balance.",
    blanks: [
      { id: "a", accepted: ["imports"], choices: ["imports", "exports", "services", "invisibles"] },
      { id: "b", accepted: ["invisible"], choices: ["invisible", "visible", "capital", "budget"] },
    ],
    explanation: "Current account = visible balance (balance of trade) + invisible balance.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** possible causes of a balance of trade deficit for Zimbabwe.",
    points: [
      "Cause 1, e.g. high imports of fuel/machinery/food (1)",
      "Explained, e.g. drought means maize must be imported (1)",
      "Cause 2, e.g. low export prices / low production / uncompetitive exports / strong currency (1)",
      "Explained (1)",
    ],
    modelAnswer: "A drought can force Zimbabwe to import large quantities of maize and wheat, raising visible imports. A fall in world prices for minerals or tobacco reduces the value of exports even if the same quantities are sold, so exports fall below imports.",
    explanation: "Causes either raise imports or reduce exports; explain how.",
    hints: ["What could raise imports?", "What could reduce export earnings?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage of using import restrictions to correct a current account deficit.",
    points: [
      "Advantage identified: reduces imports / spending of foreign currency (1)",
      "Explained, e.g. may also protect local producers and jobs (1)",
      "Disadvantage identified, e.g. retaliation / higher prices / shortages of inputs (1)",
      "Explained, e.g. other countries tax our exports, so export earnings fall too (1)",
    ],
    modelAnswer: "Restricting imports with tariffs or quotas reduces the foreign currency spent abroad and may help local producers. However, other countries may retaliate by taxing Zimbabwe's exports, and businesses that rely on imported inputs face higher costs, so exports may fall as well.",
    explanation: "A balanced answer weighs the direct effect on imports against the side effects.",
    hints: ["How might other countries react?"],
  });
  // Practice structured item: classification and full current account.
  const items = [
    ["Tobacco sold abroad", 980, "VX"],
    ["Ferrochrome sold abroad", 760, "VX"],
    ["Fuel imported", 1150, "VM"],
    ["Fertiliser imported", 340, "VM"],
    ["Foreign tourists' spending in the country", 260, "IX"],
    ["Freight charges paid to foreign transport firms", 210, "IM"],
    ["Insurance premiums paid to foreign insurers", 90, "IM"],
  ];
  const by = (k) => sum(items.filter((i) => i[2] === k).map((i) => i[1]));
  const VX = by("VX"), VM = by("VM"), IX = by("IX"), IM = by("IM");
  const BOT = f.balanceOfTrade(VX, VM), INV = f.invisibleBalance(IX, IM), CA = f.currentAccount(VX, VM, IX, IM);
  check("CA", CA, BOT + INV);
  const tbl = table(["Item", "US\\$ million"], items.map(([n, v]) => [n, v]));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900, calculator: true,
    stem: `The table shows a fictional landlocked country's international transactions for one year.\n\n${tbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "plain", value: BOT,
        stem: "Calculate the balance of trade in US\\$ million (give a deficit as a negative number).",
        wrong: [-BOT, VX + VM],
        explanation: `Visible exports ${fmt(VX)} − visible imports ${fmt(VM)} = ${fmt(BOT)}: ${sign(BOT)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "plain", value: INV,
        stem: "Calculate the invisible balance in US\\$ million (give a deficit as a negative number).",
        wrong: [-INV, IX + IM],
        explanation: `Invisible exports ${fmt(IX)} − invisible imports ${fmt(IM)} = ${fmt(INV)}: ${sign(INV)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "plain", value: CA,
        stem: "Calculate the current account balance in US\\$ million (give a deficit as a negative number).",
        wrong: [BOT - INV, -CA],
        explanation: `${fmt(BOT)} + (${fmt(INV)}) = ${fmt(CA)}: ${sign(CA)}.`,
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "The government plans to correct the deficit by encouraging local firms to process more of the country's minerals before export. Evaluate this plan.",
        points: [
          "Processed minerals earn more per tonne: higher visible exports (1)",
          "Creates jobs and skills; reduces dependence on raw-material prices (1)",
          "Needs large capital, reliable power and skills; takes years (1)",
          "Processing may need imported equipment and fuel, raising imports at first (1)",
          "Conclusion (1)",
          "Justified, e.g. good long-term plan but combine with short-term measures (1)",
        ],
        modelAnswer: "Processing minerals before export raises the value of each tonne exported, so visible exports rise, and it creates jobs and skills. However, smelters need large capital, reliable electricity and skilled workers, and building them may require imported machinery and fuel, which would worsen the deficit at first. The plan is sound for the long term, but the government should combine it with quicker measures such as promoting tourism and other exports while the processing industry is built.",
      }),
    ],
    explanation: `Balance of trade ${fmt(BOT)}; invisible balance ${fmt(INV)}; current account ${fmt(CA)} (US\\$ million). Value addition can raise exports in the long run.`,
    hints: ["Classify each item as visible or invisible, export or import.", "Current account = balance of trade + invisible balance."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 660,
    stem: "Country Z's current account has been in deficit for three years. Its main imports are fuel and machinery; its main exports are cotton and beef. Many of its citizens take holidays abroad.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Citizens of Country Z taking holidays abroad are, for Country Z:",
        options: [["an invisible import", "Correct: money flows out to pay for a service."], ["an invisible export", "Money flows out, not in."], ["a visible import", "A holiday is a service."], ["a visible export", "Nothing is sold abroad."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a deficit is financed.",
        points: ["By borrowing from abroad (1)", "By using reserves of foreign currency (1)", "By attracting foreign investment / selling assets (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Suggest **two** measures Country Z could use to reduce its deficit, explaining each.",
        points: ["Measure 1, e.g. promote cotton and beef exports / add value (1)", "Explained (1)", "Measure 2, e.g. import substitution / restrict imports / promote domestic tourism (1)", "Explained (1)"],
      }),
    ],
    explanation: "Holidays abroad are invisible imports. Deficits are financed by borrowing, reserves or investment, and reduced by raising exports or cutting imports.",
    hints: ["Which way does the money flow when citizens holiday abroad?"],
  });
  b.card("DEFINITION", "Visible trade", "Trade in goods.");
  b.card("DEFINITION", "Invisible trade", "Trade in services: tourism, transport, insurance, banking, consultancy.");
  b.card("FORMULA", "Balance of trade", "Balance of trade = visible exports − visible imports.");
  b.card("FORMULA", "Invisible balance", "Invisible balance = invisible exports − invisible imports.");
  b.card("FORMULA", "Current account balance", "Current account = balance of trade + invisible balance (plus income and transfers in full accounts).");
  b.card("CONCEPT", "Export or import?", "Follow the money: money flowing in = export; money flowing out = import. Foreign tourists at home = invisible export.");
  b.card("FACT", "Causes of a current account deficit", "High imports (fuel, machinery, food), low export prices or output, uncompetitive exports, strong currency, payments for services.");
  b.card("FACT", "Correcting a deficit", "Import restrictions, export promotion, value addition, import substitution, devaluation, tourism promotion, reducing domestic spending.");
  b.card("DEFINITION", "Balance of payments", "Record of all transactions between a country and the rest of the world: current account and capital (financial) account.");
});
