// W3b: manufacturing accounts and a manufacturer's financial statements (both boards).
import { concept, P, money, check, r2, sum } from "../lib.mjs";
import { manufacturing, incomeStatement, financialPosition, table, U, fmt, TERMS } from "../tables/w3b-lib.mjs";

concept("acc.manufacturing.accounts", { file: "manufacturing/accounts", keyPrefix: "manufacturing.accounts" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where is the **closing inventory of finished goods** of a manufacturer shown in the year-end statements?",
    options: [
      ["Income statement cost of sales and current assets", "Correct: deducted in cost of sales and shown as a current asset."],
      ["Manufacturing account and current assets", "Only raw materials and work in progress are adjusted in the manufacturing account."],
      ["Manufacturing account only", "Finished goods are not in the manufacturing account at all."],
      ["Current liabilities only", "Inventory is an asset, never a liability."],
    ],
    answer: "A",
    explanation: "Finished goods inventory is part of cost of sales in the income statement and a current asset in the statement of financial position.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the income statement of a manufacturer, the production cost of goods completed takes the place of …",
    options: [
      ["purchases in the cost of sales", "Correct: it is the cost of the goods made available for sale."],
      ["revenue at the top of the statement", "Revenue comes from sales; production cost is a cost."],
      ["the expenses section", "It is part of cost of sales, so it is deducted before gross profit."],
      ["closing inventory in the cost of sales", "Closing finished goods inventory is still deducted separately."],
    ],
    answer: "A",
    explanation: "Opening finished goods + production cost of goods completed − closing finished goods = cost of sales.",
  });
  {
    const ofg = 11200, prod = 96450, cfg = 12750;
    const cos = r2(ofg + prod - cfg);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Opening inventory of finished goods ${money(ofg)}; production cost of goods completed ${money(prod)}; closing inventory of finished goods ${money(cfg)}. What is the cost of sales?`,
      options: [
        [money(cos), "Correct: 11,200 + 96,450 − 12,750."],
        [money(r2(prod - ofg + cfg)), "The inventory adjustments are the wrong way round."],
        [money(prod), "The finished goods inventories have been ignored."],
        [money(r2(ofg + prod + cfg)), "Closing inventory must be deducted."],
      ],
      answer: "A",
      explanation: `${fmt(ofg)} + ${fmt(prod)} − ${fmt(cfg)} = ${fmt(cos)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Depreciation of the **office computers** of a manufacturing business is shown …",
    options: [
      ["as an expense in the income statement", "Correct: the computers are used for administration."],
      ["as a factory overhead in the manufacturing account", "Only factory assets are depreciated as overheads."],
      ["as part of prime cost", "Depreciation is never a direct cost here."],
      ["as a deduction from closing work in progress", "Work in progress is valued separately."],
    ],
    answer: "A",
    explanation: "Depreciation follows the asset: office assets to the income statement, factory assets to overheads.",
  });
  {
    const ins = 5400, prep = 600, f = 2 / 3;
    const adj = r2(ins - prep);
    const fac = r2(adj * f);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `The trial balance shows insurance ${money(ins)}. ${money(prep)} is prepaid at the year end. Two-thirds of insurance relates to the factory. What is the factory overhead for insurance?`,
      options: [
        [money(fac), "Correct: (5,400 − 600) × 2/3."],
        [money(r2(ins * f)), "The prepayment has not been deducted."],
        [money(r2(ins * f - prep)), "The whole prepayment has been taken from the factory share only."],
        [money(r2(adj / 3)), "This is the office share."],
      ],
      answer: "A",
      hints: ["Adjust for the prepayment first, then split."],
      explanation: `Adjusted insurance ${fmt(ins)} − ${fmt(prep)} = ${fmt(adj)}; factory ${fmt(adj)} × 2/3 = ${fmt(fac)}; office ${fmt(r2(adj - fac))}.`,
    });
  }
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which inventories appear as current assets in the statement of financial position of a manufacturer?",
    options: [
      ["Raw materials, work in progress and finished goods", "Correct: all three closing inventories are assets."],
      ["Finished goods only", "Raw materials and work in progress are also owned and unsold."],
      ["Raw materials and finished goods only", "Work in progress is also an asset."],
      ["Work in progress and finished goods only", "Unused raw materials are also an asset."],
    ],
    answer: "A",
    explanation: "Each closing inventory is listed separately under current assets.",
  });
  {
    const ofg = 7300, prod = 61850, buy = 4150, cfg = 8020;
    const cos = r2(ofg + prod + buy - cfg);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A furniture maker also buys ready-made cushions to sell. Opening finished goods ${money(ofg)}; production cost of goods completed ${money(prod)}; purchases of finished goods ${money(buy)}; closing finished goods ${money(cfg)}. What is the cost of sales?`,
      options: [
        [money(cos), "Correct: 7,300 + 61,850 + 4,150 − 8,020."],
        [money(r2(ofg + prod - cfg)), "The purchases of finished goods have been left out."],
        [money(r2(ofg + prod + buy)), "Closing finished goods have not been deducted."],
        [money(r2(prod + buy - ofg - cfg)), "Opening inventory must be added, not deducted."],
      ],
      answer: "A",
      hints: ["Bought-in finished goods go straight to cost of sales."],
      explanation: `${fmt(ofg)} + ${fmt(prod)} + ${fmt(buy)} − ${fmt(cfg)} = ${fmt(cos)}.`,
    });
  }
  {
    const wip = 900;
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: `Closing work in progress was overstated by ${money(wip)}. What is the effect on the financial statements?`,
      options: [
        [`Profit and current assets are both overstated by ${money(wip)}`, "Correct: production cost is understated, so cost of sales is too low and profit too high; the asset is too high."],
        [`Profit is understated and current assets overstated by ${money(wip)}`, "A higher closing figure lowers costs, so profit rises."],
        [`Prime cost is understated by ${money(wip)}`, "Work in progress is adjusted after prime cost."],
        ["There is no effect on profit", "Production cost feeds cost of sales, so profit changes."],
      ],
      answer: "A",
      hints: ["Follow the error from the manufacturing account to cost of sales."],
      explanation: "Deducting too much closing work in progress makes the production cost and cost of sales too low, so gross and net profit are overstated; current assets are overstated by the same amount, so the statement still balances.",
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Carriage outwards of a manufacturer is a factory overhead.",
    answer: false,
    explanation: "False. Carriage outwards is a cost of delivering goods to customers, a selling and distribution expense in the income statement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Accrued factory wages are shown as a current liability in the statement of financial position.",
    answer: true,
    explanation: "True. The accrual is added to factory wages in the manufacturing account and shown as other payables (accrued expenses).",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "A manufacturer's trial balance contains the items below. Match each with the statement where it is used.",
    right: ["Manufacturing account", "Income statement", "Statement of financial position only"],
    pairs: ["Opening work in progress", "Opening inventory of finished goods", "Discount allowed", "Factory machinery at cost", "Depreciation of factory buildings", "Trade payables"],
    rightIndex: [0, 1, 1, 2, 0, 2],
    explanation: "Work in progress and factory depreciation belong to the manufacturing account; finished goods inventory and discount allowed to the income statement; assets at cost and payables to the statement of financial position.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement about a manufacturer's cost of sales.",
    template: "Cost of sales is the opening inventory of {{blank:a}}, plus the production cost of goods completed, less the closing inventory of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["finished goods"], choices: ["finished goods", "raw materials", "work in progress"] },
      { id: "b", accepted: ["finished goods"], choices: ["finished goods", "raw materials", "work in progress"] },
    ],
    explanation: "The income statement uses finished goods inventories; raw materials and work in progress are dealt with in the manufacturing account.",
  });
  {
    const elec = 9840, acc = 360, f = 0.75;
    const adj = r2(elec + acc);
    const fac = r2(adj * f), off = r2(adj - fac);
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `Electricity paid ${money(elec)}; ${money(acc)} is owing at the year end. Three-quarters relates to the factory and one-quarter to the office.`,
      template: "Factory overheads include electricity of US\\$ {{blank:a}} and the income statement includes electricity of US\\$ {{blank:b}}.",
      blanks: [
        { id: "a", accepted: [String(fac), fmt(fac)] },
        { id: "b", accepted: [String(off), fmt(off)] },
      ],
      hints: ["Add the accrual before splitting."],
      explanation: `${fmt(elec)} + ${fmt(acc)} = ${fmt(adj)}; factory ${fmt(adj)} × 3/4 = ${fmt(fac)}; office ${fmt(off)}.`,
    });
  }

  // ---------------------------------------------------------------- Numerical
  {
    const rev = 154000, ofg = 9600, prod = 108250, cfg = 11300;
    const gp = r2(rev - (ofg + prod - cfg));
    b.num({
      d: 2, kind: "money", value: gp, wrong: [r2(rev - prod)],
      stem: `Revenue ${money(rev)}; opening finished goods ${money(ofg)}; production cost of goods completed ${money(prod)}; closing finished goods ${money(cfg)}. Calculate the gross profit.`,
      explanation: `Cost of sales ${fmt(ofg)} + ${fmt(prod)} − ${fmt(cfg)} = ${fmt(r2(ofg + prod - cfg))}; gross profit ${fmt(rev)} − ${fmt(r2(ofg + prod - cfg))} = ${fmt(gp)}. Ignoring the inventories gives ${fmt(r2(rev - prod))}.`,
    });
  }
  {
    const raw = 4870, wip = 3150, fg = 9420, recv = 15300, bank = 2860;
    const ca = sum([raw, wip, fg, recv, bank]);
    b.calc({
      d: 3, kind: "money", value: ca, calculator: true, wrong: [r2(ca - raw - wip)],
      stem: `At 31 December 2025 a manufacturer had: raw materials ${money(raw)}, work in progress ${money(wip)}, finished goods ${money(fg)}, trade receivables ${money(recv)} and bank ${money(bank)}. Calculate the total current assets.`,
      hints: ["All three inventories are current assets."],
      explanation: `${fmt(raw)} + ${fmt(wip)} + ${fmt(fg)} + ${fmt(recv)} + ${fmt(bank)} = ${fmt(ca)}. Including only finished goods gives ${fmt(r2(ca - raw - wip))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a manufacturer prepares a manufacturing account before the income statement.",
    points: ["It calculates the production cost of goods completed", "This figure is needed for cost of sales / it replaces purchases in the income statement (so gross profit can be found)"],
    modelAnswer: "The manufacturing account works out the cost of the goods completed in the year. That figure is used instead of purchases in the cost of sales, so the income statement cannot be finished without it.",
    hints: ["What figure does the income statement need from it?"],
    explanation: "The production cost links the two statements.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Chipo's factory and office share one building. Her bookkeeper charged all the rent to the manufacturing account. Explain the effect on prime cost, on the production cost of goods completed and on profit for the year.",
    points: ["Prime cost is unaffected (rent is an overhead, not a direct cost)", "Production cost of goods completed is overstated by the office share", "Profit for the year is unchanged (office expenses understated by the same amount), ignoring any effect on inventory valuation"],
    modelAnswer: "Prime cost does not change because rent is an overhead. Factory overheads and so the production cost are too high by the office share of the rent. Office expenses are too low by the same amount, so the profit for the year is the same (unless work in progress or finished goods are valued using the higher cost).",
    hints: ["The cost moves from one statement to another."],
    explanation: "Gross profit falls but expenses fall by the same amount.",
  });

  // ---------------------------------------------------------------- Practice structured 1: from list to income statement
  {
    const d = { name: "Rudo's Clay Products", rawOpen: 3250, rawPurch: 27900, rawCarriage: 480, rawClose: 3640, directLabour: 19350, directExp: [], overheads: [["Factory rent (4/5)", r2(9500 * 0.8)], ["Kiln fuel", 4380], ["Depreciation of kilns", 2600]], wipOpen: 1720, wipClose: 1950 };
    const m = manufacturing(d);
    const is = incomeStatement({ name: d.name, revenue: 93600, openInv: 4100, openInvLabel: "Opening inventory of finished goods", cos: [["Add: Production cost of goods completed", m.production]], closeInv: 4760, closeInvLabel: "Less: Closing inventory of finished goods", expenses: [["Office rent (1/5)", r2(9500 * 0.2)], ["Office wages", 8450], ["Delivery costs", 2170]] });
    const stim = table(["Item", U], [
      ["Revenue", 93600], ["Raw materials (clay and glaze) at 1 January 2025", 3250], ["Purchases of raw materials", 27900], ["Carriage inwards on raw materials", 480], ["Raw materials at 31 December 2025", 3640],
      ["Wages of potters", 19350], ["Rent (factory four-fifths, office one-fifth)", 9500], ["Kiln fuel", 4380], ["Depreciation of kilns", 2600],
      ["Work in progress at 1 January 2025", 1720], ["Work in progress at 31 December 2025", 1950], ["Finished goods at 1 January 2025", 4100], ["Finished goods at 31 December 2025", 4760],
      ["Office wages", 8450], ["Delivery costs", 2170],
    ]);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Rudo makes clay pots in Masvingo. The following information is for the year ended 31 December 2025.\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: m.prime, wrong: [r2(m.prime - 480)], stem: "Calculate the prime cost.", explanation: `Raw materials consumed 3,250 + 27,900 + 480 − 3,640 = ${fmt(m.consumed)}; + 19,350 = ${fmt(m.prime)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.production, wrong: [r2(m.production + 1900)], stem: "Calculate the production cost of goods completed.", explanation: `Overheads 7,600 + 4,380 + 2,600 = ${fmt(m.totOH)}; ${fmt(m.prime)} + ${fmt(m.totOH)} + 1,720 − 1,950 = ${fmt(m.production)}. Charging all the rent to the factory gives ${fmt(r2(m.production + 1900))}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: is.gp, stem: "Calculate the gross profit.", explanation: `Cost of sales 4,100 + ${fmt(m.production)} − 4,760 = ${fmt(is.cos)}; 93,600 − ${fmt(is.cos)} = ${fmt(is.gp)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: is.np, stem: "Calculate the profit for the year (net profit).", explanation: `${fmt(is.gp)} − (1,900 + 8,450 + 2,170) = ${fmt(is.np)}.` }),
        P.manual({ label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the manufacturing account for the year ended 31 December 2025.", points: ["Correct three-line heading", `Raw materials consumed ${fmt(m.consumed)} (carriage inwards included)`, `Prime cost ${fmt(m.prime)}`, `Factory rent ${fmt(7600)} (four-fifths)`, `Factory overheads total ${fmt(m.totOH)}`, `Work in progress adjusted; production cost ${fmt(m.production)}`], modelAnswer: m.md, explanation: "Only the factory share of rent is an overhead." }),
      ],
      hints: ["Split the rent 4/5 : 1/5.", "Finished goods inventories go in the income statement."],
      explanation: `Model answers:\n\n${m.md}\n\n${is.md}`,
    });
    check("rent", 7600 + 1900, 9500);
  }

  // ---------------------------------------------------------------- Practice structured 2: SOFP and evaluation
  {
    const m = manufacturing({ name: "Farai's Fabrications", rawOpen: 5800, rawPurch: 46300, rawClose: 6420, directLabour: 28700, overheads: [["Factory wages (indirect) incl. accrual", r2(9100 + 450)], ["Factory power", 6250], ["Depreciation: machinery", r2(48000 * 0.125)]], wipOpen: 3900, wipClose: 4370 });
    const is = incomeStatement({ name: "Farai's Fabrications", revenue: 142500, openInv: 8800, openInvLabel: "Opening inventory of finished goods", cos: [["Add: Production cost of goods completed", m.production]], closeInv: 9650, closeInvLabel: "Less: Closing inventory of finished goods", expenses: [["Administration expenses", 14600], ["Selling expenses", 7300], ["Depreciation: delivery van", r2((20000 - 8000) * 0.25)]] });
    const netAssets = r2(33000 + sum([6420, 4370, 9650, 17850, 3240]) - 11960 - 450);
    const draw = 22000;
    const openCap = r2(netAssets - is.np + draw);
    const s2 = financialPosition({ name: "Farai's Fabrications", nca: [["Machinery", 48000, 24000], ["Delivery van", 20000, 11000]], ca: [["Inventory: raw materials", 6420], ["Inventory: work in progress", 4370], ["Inventory: finished goods", 9650], ["Trade receivables", 17850], ["Bank", 3240]], cl: [["Trade payables", 11960], ["Other payables (accrued factory wages)", 450]], openCap, profit: is.np, drawings: draw });
    const cr = s2.totCA / s2.totCL;
    const qr = (s2.totCA - 6420 - 4370 - 9650) / s2.totCL;
    b.struct({
      d: 5, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Farai makes steel gates and burglar bars in Chinhoyi. His profit for the year ended 31 December 2025 was ${money(is.np)}. At that date: machinery cost ${money(48000)}, accumulated depreciation ${money(24000)}; delivery van cost ${money(20000)}, accumulated depreciation ${money(11000)}; inventories of raw materials ${money(6420)}, work in progress ${money(4370)} and finished goods ${money(9650)}; trade receivables ${money(17850)}; bank ${money(3240)}; trade payables ${money(11960)}; factory wages owing ${money(450)}. Capital at 1 January 2025 was ${money(openCap)} and drawings were ${money(draw)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: s2.totCA, wrong: [r2(s2.totCA - 6420 - 4370)], stem: "Calculate the total current assets.", explanation: `6,420 + 4,370 + 9,650 + 17,850 + 3,240 = ${fmt(s2.totCA)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: s2.wc, stem: "Calculate the working capital (net current assets).", explanation: `${fmt(s2.totCA)} − ${fmt(s2.totCL)} = ${fmt(s2.wc)}.` }),
        P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of financial position at 31 December 2025.", points: ["Correct heading with date", `Non-current assets at cost less accumulated depreciation; net book value ${fmt(s2.totNbv)}`, "Three inventories shown separately", `Current liabilities ${fmt(s2.totCL)} including the accrual`, `Capital section: ${fmt(openCap)} + ${fmt(is.np)} − ${fmt(draw)}`, `Balancing totals ${fmt(s2.netAssets)}`], modelAnswer: s2.md, explanation: "Net assets equal closing capital." }),
        P.num({ label: "(d)", marks: 1, kind: "ratio", value: cr, stem: "Calculate the current ratio, as x : 1 to two decimal places.", explanation: `${fmt(s2.totCA)} ÷ ${fmt(s2.totCL)} = ${cr.toFixed(2)} : 1.` }),
        P.num({ label: "(e)", marks: 1, kind: "ratio", value: qr, wrong: [r2((s2.totCA - 9650) / s2.totCL)], stem: "Calculate the acid test (quick) ratio, as x : 1 to two decimal places. Exclude all three inventories.", explanation: `(${fmt(s2.totCA)} − 6,420 − 4,370 − 9,650) ÷ ${fmt(s2.totCL)} = ${qr.toFixed(2)} : 1.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Comment on Farai's liquidity and suggest **one** way he could improve it.", points: ["Current ratio above the usual guide (comfortable), using own figure", `Acid test about ${qr.toFixed(2)} : 1: he can meet current liabilities without selling inventory`, "Suggestion, e.g. reduce raw material / finished goods inventory held, collect receivables faster"], modelAnswer: `The current ratio of ${cr.toFixed(2)} : 1 is high and the acid test of ${qr.toFixed(2)} : 1 shows he can pay his short-term debts from receivables and bank alone. Much of his working capital is tied up in three kinds of inventory; holding less raw material and finished goods would release cash.`, explanation: "Use both ratios in the comment." }),
      ],
      hints: ["List raw materials, work in progress and finished goods separately.", "Acid test leaves out every inventory."],
      explanation: `Model answer:\n\n${s2.md}`,
    });
    check("s2 balance", s2.netAssets, s2.closing);
    check("nbv", s2.totNbv, 33000);
  }

  // ---------------------------------------------------------------- Cards
  b.card("FACT", "Order of a manufacturer's statements", "Manufacturing account → income statement → statement of financial position.");
  b.card("FORMULA", "Cost of sales of a manufacturer", "Opening finished goods + production cost of goods completed (+ purchases of finished goods) − closing finished goods.");
  b.card("FACT", "Where are raw materials and work in progress inventories adjusted?", "In the manufacturing account; closing figures are also current assets.");
  b.card("FACT", "Where are finished goods inventories adjusted?", "In cost of sales in the income statement; the closing figure is also a current asset.");
  b.card("CONCEPT", "Shared costs (rent, insurance, electricity)", "Adjust for accruals and prepayments first, then split: factory share to overheads, office share to the income statement.");
  b.card("FACT", "Depreciation in a manufacturer", "Factory machinery and buildings: factory overhead. Office equipment and delivery vans: income statement expense.");
  b.card("FACT", "Purchases of finished goods", "Bought-in goods for resale are added in cost of sales, not in the manufacturing account.");
  b.card("DEFINITION", "Manufacturing account", "Statement calculating the production cost of goods completed: raw materials consumed, prime cost, factory overheads and work in progress adjustment.");
  b.card("FACT", "Three inventories in the statement of financial position", "Raw materials, work in progress and finished goods, each listed under current assets.");
});
