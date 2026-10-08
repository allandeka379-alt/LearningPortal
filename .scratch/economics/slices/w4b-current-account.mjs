// W4b: econ.bop.current-account — visible and invisible trade, balance of trade, the four sections of the current
// account, calculating balances and interpreting deficits and surpluses. Figures differ from the lesson's examples.
import { concept, P, ZIM, CAM, currentAccount, table, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.bop.current-account", { file: "bop/current-account", keyPrefix: "bop.current-account" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **visible** trade?",
    options: [
      ["Zimbabwe exporting tobacco to China", "Correct: tobacco is a physical good."],
      ["A Zimbabwean student paying fees to a university abroad", "Education is a service: invisible trade."],
      ["Foreign tourists paying for hotel rooms in Victoria Falls", "Tourism is a service: invisible trade."],
      ["A local firm buying insurance from a foreign company", "Insurance is a service: invisible trade."],
    ],
    answer: "A",
    explanation: "Visible trade is trade in goods; services such as education, tourism and insurance are invisible trade.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Money sent home to Zimbabwe by Zimbabweans working in South Africa is recorded in the current account as",
    options: [
      ["a credit in secondary income (current transfers)", "Correct: a transfer for which nothing is given in return."],
      ["a credit in trade in services, as an invisible export", "No service is sold in return for the money."],
      ["a debit in primary income", "Money coming in is a credit, and transfers are not primary income."],
      ["an export of goods", "No goods leave the country."],
    ],
    answer: "A",
    explanation: "Remittances are transfers: secondary income (ZIMSEC: current transfers). They are credits because money comes into the country.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "How is spending by foreign tourists in Zimbabwe recorded in Zimbabwe's current account?",
    options: [
      ["As a credit in trade in services", "Correct: Zimbabwe is selling a service to non-residents."],
      ["As a debit in trade in services", "Money is coming in, so it is a credit."],
      ["As a credit in trade in goods", "Hotel stays and tours are services."],
      ["As a credit in secondary income", "The tourists receive services in return, so it is not a transfer."],
    ],
    answer: "A",
    explanation: "Tourism by foreigners is an export of services: a credit (an invisible export).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A foreign-owned mine in a fictional country sends its profits to its shareholders abroad. Where is this recorded in that country's current account?",
    options: [
      ["As a debit in primary income", "Correct: investment income paid abroad."],
      ["As a credit in primary income", "Money leaving the country is a debit."],
      ["As a debit in trade in goods", "No goods are imported."],
      ["As a debit in secondary income", "Profits are a reward to a factor of production, not a transfer."],
    ],
    answer: "A",
    explanation: "Profits, interest and dividends paid to foreign owners are primary income debits (ZIMSEC: part of net income from abroad).",
  });
  {
    const bal = { goods: -620, services: 140, primary: -380, secondary: 510 };
    const tot = bal.goods + bal.services + bal.primary + bal.secondary;
    check("tot", tot, -350);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "A fictional country has these balances (US\\$ million): trade in goods −620, trade in services +140, primary income −380, secondary income +510. What is its current account balance?",
      options: [
        ["−350", "Correct: −620 + 140 − 380 + 510 = −350."],
        ["+350", "The sign is wrong: the negative balances are larger."],
        ["−480", "This is the balance on goods and services only (−620 + 140)."],
        ["−1,650", "This adds all four figures as if they were deficits."],
      ],
      answer: "A",
      hints: ["Keep each balance's sign when you add."],
      explanation: "Current account = −620 + 140 − 380 + 510 = −350: a deficit of US\\$350 million.",
    });
  }
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A country has had a large current account deficit for several years. Which is the most likely way the deficit has been financed?",
    options: [
      ["By borrowing from abroad or using its reserves of foreign currency", "Correct: the outflow must be paid for with foreign currency from somewhere."],
      ["By raising taxes on domestic incomes and company profits", "Taxes raise government revenue in local currency; they do not provide foreign currency."],
      ["By printing more of its own currency", "Foreign suppliers need foreign currency, which a country cannot print."],
      ["By reducing its unemployment rate", "Unemployment is not a source of foreign currency."],
    ],
    answer: "A",
    hints: ["Imports have to be paid for in foreign currency."],
    explanation: "A deficit means more foreign currency goes out than comes in through the current account; the gap is met by borrowing, foreign investment inflows or running down reserves.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which current account deficit is likely to be **least** worrying for a developing country?",
    options: [
      ["A small deficit caused by imports of machinery for new export industries", "Correct: the capital goods should raise future exports."],
      ["A large deficit caused by imports of luxury consumer goods", "This adds to debt without raising future output."],
      ["A deficit that has grown every year for ten years", "A long-lasting deficit suggests a deep lack of competitiveness."],
      ["A deficit caused by a fall in export sales as goods become uncompetitive", "Falling competitiveness is a serious cause."],
    ],
    answer: "A",
    hints: ["Consider the size, cause and length of the deficit."],
    explanation: "Judge a deficit by its size, cause and length. Small deficits that finance investment can correct themselves as exports grow.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "A fictional country has visible exports of US\\$800 million, visible imports of US\\$950 million and a surplus on invisibles of US\\$90 million. Which is correct?",
    options: [
      ["Balance of trade −150; current account −60", "Correct: 800 − 950 = −150; −150 + 90 = −60."],
      ["Balance of trade −60; current account −150", "The two figures are swapped."],
      ["Balance of trade +150; current account +240", "The visible balance is a deficit, not a surplus."],
      ["Balance of trade −150; current account −240", "Invisibles are in surplus, so they reduce the deficit."],
    ],
    answer: "A",
    hints: ["Balance of trade = visible exports − visible imports."],
    explanation: "Balance of trade = 800 − 950 = −150. Current account = visible balance + invisible balance = −150 + 90 = −60.",
  });

  // Numericals.
  {
    const x = 3450, m = 3980, bal = x - m;
    check("bal", bal, -530);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: bal, daily: true,
      stem: `A fictional country exports goods worth US\\$${fmt(x)} million and imports goods worth US\\$${fmt(m)} million. Calculate its balance of trade (trade in goods balance) in US\\$ million. Give a deficit as a negative number.`,
      wrong: [-bal, x + m],
      explanation: `Balance of trade = ${fmt(x)} − ${fmt(m)} = **−${-bal}**: a deficit of US\\$${-bal} million. Writing +${-bal} drops the sign.`,
    });
  }
  {
    const ca = currentAccount({ goods: [1850, 2240], services: [610, 480], primary: [95, 415], secondary: [660, 120] });
    check("ca", ca.total, -40);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: ca.total, calculator: true,
      stem: `The table shows the current account flows of a fictional country.\n\n${table(["Section", "Credits (US\\$ million)", "Debits (US\\$ million)"], [["Trade in goods", 1850, 2240], ["Trade in services", 610, 480], ["Primary income", 95, 415], ["Secondary income", 660, 120]])}\n\nCalculate the current account balance in US\\$ million. Give a deficit as a negative number.`,
      wrong: [-ca.total, ca.goods],
      hints: ["Find credits − debits for each section first.", "Add the four balances, keeping their signs."],
      explanation: `1. Goods: 1,850 − 2,240 = ${fmt(ca.goods)}.\n2. Services: 610 − 480 = +${ca.services}.\n3. Primary income: 95 − 415 = ${fmt(ca.primary)}.\n4. Secondary income: 660 − 120 = +${ca.secondary}.\n5. Current account = ${fmt(ca.goods)} + ${ca.services} ${fmt(ca.primary)} + ${ca.secondary} = **${fmt(ca.total)}**: a small deficit of US\\$40 million.`,
    });
  }
  {
    const goods = -270, services = -95, primary = -310, total = 125;
    const secBal = total - goods - services - primary, secDebit = 60, secCredit = secBal + secDebit;
    check("secBal", secBal, 800); check("secCredit", secCredit, 860);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: secCredit, calculator: true,
      stem: `A fictional country has a current account **surplus** of US\\$${total} million. Its balances are: trade in goods −270, trade in services −95 and primary income −310 (US\\$ million). Secondary income debits are US\\$${secDebit} million. Calculate the value of its secondary income credits (for example, remittances received), in US\\$ million.`,
      wrong: [secBal, total + 270 + 95 + 310 - secDebit],
      hints: ["First find the secondary income balance that makes the four balances add up to +125.", "Credits = balance + debits."],
      explanation: `1. Secondary income balance = ${total} − (−270) − (−95) − (−310) = ${secBal}.\n2. Credits − debits = ${secBal}, so credits = ${secBal} + ${secDebit} = **${secCredit}**.\n3. Check: −270 − 95 − 310 + ${secBal} = +${total}. ✓ ${secBal} is the balance, not the credits.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "The balance of trade includes trade in both goods and services.",
    answer: false,
    explanation: "False. The balance of trade (visible balance) covers goods only. Services are part of invisible trade.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country can have a deficit on its balance of trade and still have a surplus on its current account.",
    answer: true,
    explanation: "True. Surpluses on services, primary income or secondary income (for example large remittances or tourism) can be bigger than the visible deficit.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each transaction (seen from Zimbabwe) with the section of the current account where it is recorded.",
    pairs: [
      ["Export of lithium ore", "Trade in goods"],
      ["Foreign airline tickets bought by Zimbabwean travellers", "Trade in services"],
      ["Interest paid on a loan from a foreign bank", "Primary income"],
      ["Aid received from a foreign government", "Secondary income"],
    ],
    explanation: "Goods → trade in goods; services such as transport → services; interest, profits and wages → primary income (net income from abroad); transfers such as aid and remittances → secondary income (current transfers).",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "A fictional country's credits on its current account total US\\$4,100 million and its debits total US\\$4,650 million. It has a current account {{blank:a}} of US\\${{blank:b}} million, which must be financed by borrowing, inflows of investment or {{blank:c}} its reserves.",
    blanks: [
      { id: "a", accepted: ["deficit"], choices: ["surplus", "deficit"] },
      { id: "b", accepted: ["550"], choices: ["550", "8,750", "450"] },
      { id: "c", accepted: ["running down"], choices: ["running down", "adding to"] },
    ],
    wrong: [["surplus", "8,750", "adding to"]],
    hints: ["Credits − debits."],
    explanation: "4,100 − 4,650 = −550: a deficit of US\\$550 million, financed by borrowing, investment inflows or running down reserves.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between primary income and secondary income, giving an example of each.",
    points: [
      "Primary income: income earned by factors of production across borders.",
      "Example: profits sent abroad by a foreign-owned mine / interest on foreign loans / wages earned abroad.",
      "Secondary income: transfers for which nothing is given in return.",
      "Example: remittances from relatives abroad / foreign aid / gifts.",
    ],
    modelAnswer: "Primary income is income earned by factors of production across borders, such as wages earned by residents working briefly abroad, or profits, dividends and interest on investments; for example, the profits a foreign-owned mine sends to its shareholders abroad are a primary income debit. Secondary income is made up of transfers for which nothing is given in return, such as remittances sent home by Zimbabweans working abroad, gifts and foreign aid.",
    hints: ["Is something given in return for the money?"],
    explanation: "One mark for each definition and one for each correct example.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain why a current account deficit that lasts for many years may cause problems for a country.",
    points: [
      "The deficit has to be financed by borrowing or running down reserves…",
      "…so foreign debt and interest payments grow (and these add to future primary income debits).",
      "Reserves run out, leading to foreign currency shortages / pressure on the currency to depreciate / imports become hard to obtain.",
    ],
    modelAnswer: "Each year's deficit has to be paid for by borrowing from abroad or using reserves. Over many years foreign debt builds up and so do the interest payments on it, which increase future primary income debits and make the deficit worse. Eventually reserves run low, the country faces shortages of foreign currency, its currency comes under pressure to fall, and firms find it hard to import fuel and raw materials.",
    hints: ["How is each year's deficit paid for?"],
    explanation: "Financing → debt and interest → reserves, foreign currency and exchange rate problems.",
  });

  // Structured 1 (8 marks).
  {
    const ca = currentAccount({ goods: [5300, 4700], services: [650, 1400], primary: [220, 1350], secondary: [1720, 90] });
    check("goods", ca.goods, 600); check("total", ca.total, 350);
    const invis = ca.services + ca.primary + ca.secondary;
    check("invis", invis, -250);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country P is a fictional mineral-exporting country. Many of its mines are foreign-owned and many of its citizens work abroad.\n\n${table(["Section", "Credits (US\\$ million)", "Debits (US\\$ million)"], [["Trade in goods", 5300, 4700], ["Trade in services", 650, 1400], ["Primary income", 220, 1350], ["Secondary income", 1720, 90]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: ca.goods, stem: "Calculate the balance of trade (trade in goods), in US\\$ million. Give a deficit as a negative number.", wrong: [-ca.goods], explanation: `5,300 − 4,700 = +${ca.goods} (surplus).` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: ca.total, stem: "Calculate the current account balance, in US\\$ million. Give a deficit as a negative number.", wrong: [-ca.total, ca.goods + ca.services], explanation: `Balances: goods +${ca.goods}, services ${fmt(ca.services)}, primary ${fmt(ca.primary)}, secondary +${ca.secondary}; total = +${ca.total}.` }),
        P.mcq({
          label: "(c)", marks: 1,
          stem: "Which section has the largest deficit?",
          options: [["Primary income", `Correct: ${fmt(ca.primary)}.`], ["Trade in services", `${fmt(ca.services)}, smaller.`], ["Trade in goods", "Goods are in surplus."], ["Secondary income", "Secondary income is in surplus."]],
          answer: "A",
          explanation: "Primary income: 220 − 1,350 = −1,130, the largest deficit, reflecting profits paid to foreign mine owners.",
        }),
        P.manual({
          label: "(d)", marks: 1,
          stem: "Suggest one reason for the deficit on primary income.",
          points: ["Profits and dividends of the foreign-owned mines are sent to their owners abroad (or interest on foreign loans)."],
          modelAnswer: "Many mines are foreign-owned, so their profits and dividends are paid to shareholders abroad.",
          explanation: "Link to the information about foreign-owned mines.",
        }),
        P.manual({
          label: "(e)", marks: 3, levels: LV(3),
          stem: "Discuss whether Country P's current account position is healthy.",
          points: [
            "Healthy: overall surplus (+350); strong goods surplus from mineral exports; remittances large.",
            "Concerns: depends on mineral prices; large outflows of profits (−1,130) and services; surplus could disappear if mineral prices fall or remittances fall.",
            "Justified conclusion.",
          ],
          modelAnswer: "The current account is in surplus of US\\$350 million, helped by a goods surplus from mineral exports and large remittances, which is a healthy sign. However, the surplus depends on minerals, whose prices can fall sharply, and on remittances from citizens abroad, which could fall if jobs abroad are lost. Large amounts of profit flow out to foreign mine owners. The position is healthy at present but fragile, so Country P would benefit from more varied exports and more local ownership or processing of minerals.",
          explanation: "Strengths versus fragility; conclude.",
        }),
      ],
      hints: ["Balance = credits − debits for each section.", "Add the four balances with their signs."],
      explanation: `Balance of trade +${ca.goods}; services ${fmt(ca.services)}; primary ${fmt(ca.primary)}; secondary +${ca.secondary}; current account +${ca.total} (US\\$ million).`,
    });
  }
  // Structured 2 (12 marks): two years.
  {
    const y1 = currentAccount({ goods: [3900, 4300], services: [820, 900], primary: [150, 640], secondary: [1050, 80] });
    const y2 = currentAccount({ goods: [3600, 4800], services: [700, 950], primary: [150, 700], secondary: [990, 90] });
    check("y1", y1.total, 0); check("y2", y2.total, -1100);
    const ch = y2.total - y1.total;
    check("ch", ch, -1100);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `Country R is a fictional country. In 2026 a drought cut its maize and cotton harvests, and it imported more food and fuel. Its current account (US\\$ million):\n\n${table(["Item", "2025", "2026"], [["Exports of goods", 3900, 3600], ["Imports of goods", 4300, 4800], ["Exports of services", 820, 700], ["Imports of services", 900, 950], ["Primary income credits", 150, 150], ["Primary income debits", 640, 700], ["Secondary income credits", 1050, 990], ["Secondary income debits", 80, 90]])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: y2.goods, stem: "Calculate the balance of trade in goods for 2026, in US\\$ million. Give a deficit as a negative number.", wrong: [-y2.goods], explanation: `3,600 − 4,800 = ${fmt(y2.goods)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: y1.total, stem: "Calculate the current account balance for 2025, in US\\$ million. Give a deficit as a negative number.", wrong: [y1.goods, y1.goods + y1.services], explanation: `Goods ${fmt(y1.goods)} + services ${fmt(y1.services)} + primary ${fmt(y1.primary)} + secondary +${y1.secondary} = ${fmt(y1.total)}: the current account was in balance.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: y2.total, stem: "Calculate the current account balance for 2026, in US\\$ million. Give a deficit as a negative number.", wrong: [-y2.total, y2.goods], explanation: `Goods ${fmt(y2.goods)} + services ${fmt(y2.services)} + primary ${fmt(y2.primary)} + secondary +${y2.secondary} = ${fmt(y2.total)}.` }),
        P.mcq({
          label: "(d)", marks: 1,
          stem: "Which change contributed most to the change in the current account between 2025 and 2026?",
          options: [["The rise in imports of goods", "Correct: imports of goods rose by 500."], ["The fall in exports of goods", "Exports fell by 300, less than the rise in imports."], ["The fall in exports of services", "Down by 120 only."], ["The rise in primary income debits", "Up by 60 only."]],
          answer: "A",
          explanation: "Changes that worsened the balance: imports of goods +500, exports of goods −300, exports of services −120, primary income debits +60, secondary income credits −60, imports of services +50, secondary income debits +10. Together they total 1,100, the fall in the current account from 0 to −1,100.",
        }),
        P.manual({
          label: "(e)", marks: 2,
          stem: "Explain how the drought affected Country R's current account.",
          points: ["Lower harvests cut exports of cotton (and maize), reducing credits in trade in goods.", "More food (and fuel) had to be imported, raising debits, so the balance of trade and current account worsened."],
          modelAnswer: "The drought reduced the cotton and maize harvests, so Country R had less to export and its exports of goods fell. At the same time it had to import food to replace lost maize, so imports of goods rose. Both changes worsened the balance of trade and so the current account.",
          explanation: "Exports down and imports up.",
        }),
        P.manual({
          label: "(f)", marks: 4, levels: LV(4),
          stem: "Discuss whether Country R's government should be worried about the 2026 current account deficit.",
          points: [
            "Not very worried: caused by a temporary shock (drought); should correct when harvests recover; previous year was in balance.",
            "Worried: deficit must be financed by borrowing or reserves; may cause foreign currency shortages and depreciation; food and fuel imports are essential.",
            "Worried if repeated: droughts may become more frequent; dependence on rain-fed crops; falling service exports too.",
            "Justified conclusion, e.g. short-term concern but not a structural problem unless droughts recur; invest in irrigation.",
          ],
          modelAnswer: "The deficit was caused mainly by the drought, a temporary shock, and the current account was in balance in 2025, so it should improve when harvests recover; this suggests the government need not be too worried. However, the deficit of US\\$1,100 million must be financed by borrowing or by using reserves, which could lead to shortages of foreign currency and a weaker currency, making fuel and food even dearer. If droughts become more frequent, the deficit could become a regular problem, especially as service exports also fell. The government should treat it as a short-term concern rather than a crisis, but it should invest in irrigation and drought-resistant crops so that one bad season does not damage the current account so badly.",
          explanation: "Temporary versus lasting causes, financing; conclude.",
        }),
      ],
      hints: ["Balance of each section = credits − debits.", "Compare the change in each row between the two years."],
      explanation: `Current account: 2025 ${fmt(y1.total)}; 2026 ${fmt(y2.total)} (US\\$ million).`,
    });
  }

  b.card("DEFINITION", "Define the **balance of payments**.", "A record of all financial transactions between the residents of a country and the rest of the world over a period.");
  b.card("DEFINITION", "What is the **balance of trade**?", "The value of visible exports minus the value of visible imports (trade in goods).");
  b.card("FORMULA", "Current account balance = ?", "Trade in goods balance + trade in services balance + primary income balance + secondary income balance.");
  b.card("CONCEPT", "Visible versus invisible trade?", "Visible: goods. Invisible: services (tourism, transport, insurance, education) and income flows.");
  b.card("DEFINITION", "What is **primary income**?", "Income from factors of production across borders: wages, profits, dividends and interest.");
  b.card("DEFINITION", "What is **secondary income**?", "Transfers for which nothing is given in return: remittances, gifts, aid.");
  b.card("CONCEPT", "How can a current account deficit be financed?", "By borrowing from abroad, inflows of foreign investment, or running down foreign currency reserves.");
  b.card("FACT", "ZIMSEC terms for primary and secondary income?", "Net income from abroad (primary income) and current transfers (secondary income); 'invisibles' covers services and these flows.", undefined, { applies: ZIM });
  b.card("FACT", "Cambridge terms for the four parts of the current account?", "Trade in goods, trade in services, primary income and secondary income.", undefined, { applies: CAM });
});
