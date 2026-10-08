// W3b: the statement of financial position of a sole trader.
import { concept, P, money, check, r2, sum, ZIM, CAM } from "../lib.mjs";
import { financialPosition, TERMS, table, U, fmt } from "../tables/w3b-lib.mjs";

concept("acc.statements.financial-position", { file: "statements/financial-position", keyPrefix: "statements.financial-position" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an **intangible** non-current asset?",
    options: [
      ["Goodwill bought with a business", "Correct: it has value but no physical form."],
      ["A delivery van", "A van is a tangible non-current asset."],
      ["Inventory of goods for resale", "Inventory is a current asset."],
      ["Trade receivables", "Trade receivables are a current asset."],
    ],
    answer: "A",
    explanation: "Intangible non-current assets, such as goodwill or a purchased licence, cannot be touched but bring benefits for more than a year.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "How is a **bank overdraft** classified in the statement of financial position?",
    options: [
      ["Current liability", "Correct: it is owed to the bank and repayable on demand."],
      ["Current asset", "An overdraft is money owed, not money held."],
      ["Non-current liability", "It is not a long-term loan; the bank can call it in at any time."],
      ["Deduction from capital", "Only drawings and losses are deducted from capital."],
    ],
    answer: "A",
    explanation: "A bank overdraft is a current liability.",
  });
  {
    const ca = [7400, 3150, 980], cl = [5260, 1430];
    const wc = r2(sum(ca) - sum(cl));
    check("wc mcq", wc, 4840);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `Inventory ${money(7400)}; trade receivables ${money(3150)}; cash ${money(980)}; trade payables ${money(5260)}; bank overdraft ${money(1430)}. What is the working capital?`,
      options: [
        [money(wc), "Correct: 11,530 − 6,690."],
        [money(r2(sum(ca) - 5260 + 1430)), "The overdraft has been treated as an asset instead of a liability."],
        [money(r2(sum(ca) - 5260)), "The overdraft has been left out of current liabilities."],
        [money(sum(ca)), "This is total current assets: the current liabilities have not been deducted."],
      ],
      answer: "A",
      explanation: `Current assets ${fmt(sum(ca))} − current liabilities ${fmt(sum(cl))} = ${fmt(wc)}.`,
    });
  }
  {
    const open = 42500, np = 11860, dr = 7900, ci = 3000;
    const close = r2(open + ci + np - dr);
    check("close mcq", close, 49460);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Opening capital ${money(open)}; capital introduced ${money(ci)}; profit for the year ${money(np)}; drawings ${money(dr)}. What is the closing capital?`,
      options: [
        [money(close), "Correct: 42,500 + 3,000 + 11,860 − 7,900."],
        [money(r2(open + np - dr)), "The capital introduced has been left out."],
        [money(r2(open + ci + np + dr)), "Drawings have been added instead of deducted."],
        [money(r2(open + ci - np - dr)), "The profit has been deducted as if it were a loss."],
      ],
      answer: "A",
      explanation: `Closing capital = opening capital + capital introduced + profit − drawings = ${fmt(close)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The owner takes goods costing US\\$300 from the shop for his family. Which entry records this?",
    options: [
      ["Debit drawings; credit purchases", "Correct: drawings rise and the goods are removed from purchases at cost."],
      ["Debit purchases; credit drawings", "This is the reverse entry."],
      ["Debit drawings; credit sales", "The goods are not sold; they are recorded at cost against purchases."],
      ["Debit capital; credit inventory", "Inventory is adjusted only at the year end; the purchases account is used."],
    ],
    answer: "A",
    explanation: "Goods for own use: debit drawings, credit purchases, at cost price.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A sole trader's electricity account shows US\\$1,800, which includes US\\$450 for the owner's house paid by the business. Which is correct?",
    options: [
      ["Electricity expense US\\$1,350; drawings increase by US\\$450", "Correct: the private part is drawings, not a business expense."],
      ["Electricity expense US\\$1,800; drawings unchanged", "The house bill is a private expense and must be removed."],
      ["Electricity expense US\\$2,250; drawings increase by US\\$450", "The private part is deducted from the expense, not added to it."],
      ["Electricity expense US\\$1,350; capital increases by US\\$450", "Private expenses reduce capital, through drawings."],
    ],
    answer: "A",
    hints: ["Business entity concept: the owner's private costs are not business expenses."],
    explanation: "Private expenses paid by the business are drawings; only 1,800 − 450 = 1,350 is a business expense.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bank loan of US\\$20,000 is repayable in five years' time. Where is it shown?",
    options: [
      ["Non-current liabilities", "Correct: it is not due within twelve months."],
      ["Current liabilities", "Only amounts due within a year are current."],
      ["Capital", "A loan is owed to the bank, not to the owner."],
      ["Non-current assets", "A loan is a liability, not an asset."],
    ],
    answer: "A",
    explanation: "Long-term loans are non-current liabilities, deducted after working capital.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which list of current assets is in the usual order, from **least** to **most** liquid?",
    options: [
      ["Inventory, trade receivables, bank, cash", "Correct: inventory must be sold and the money collected before it becomes cash."],
      ["Cash, bank, trade receivables, inventory", "This is the reverse order: from most to least liquid."],
      ["Trade receivables, inventory, cash, bank", "Inventory is less liquid than receivables: it has not been sold yet."],
      ["Bank, inventory, cash, trade receivables", "This mixes the order with no pattern."],
    ],
    answer: "A",
    hints: ["How many steps does each asset need before it becomes cash?"],
    explanation: "Inventory → (sale) → trade receivables → (payment) → bank and cash.",
  });
  {
    const assets = 58900, liab = 13650;
    const cap = r2(assets - liab);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: `At 31 December 2025 a business has total assets of ${money(assets)} and total liabilities of ${money(liab)}. What is the owner's capital?`,
      options: [
        [money(cap), "Correct: assets − liabilities = capital."],
        [money(r2(assets + liab)), "Liabilities have been added to assets."],
        [money(assets), "Assets alone ignore what the business owes."],
        [money(liab), "This is the amount owed, not the capital."],
      ],
      answer: "A",
      explanation: `Capital = ${fmt(assets)} − ${fmt(liab)} = ${fmt(cap)}.`,
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Drawings are shown as an expense in the income statement.",
    answer: false,
    explanation: "False. Drawings are deducted from capital in the statement of financial position.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the statement of financial position, non-current assets are added into the total at their net book value.",
    answer: true,
    explanation: "True. Cost and accumulated depreciation are shown, but only cost less depreciation (net book value) is added.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its classification in the statement of financial position.",
    right: ["Non-current asset", "Current asset", "Current liability", "Non-current liability", "Capital section"],
    pairs: ["Fixtures and fittings", "Prepaid insurance", "Accrued wages", "Loan repayable in 2032", "Goods taken by the owner"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Fixtures are kept for years; a prepayment is an amount receivable; an accrual is owed; a long loan is non-current; goods taken are drawings, deducted in the capital section.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements.",
    template: "Working capital = current assets − {{blank:a}}. Closing capital = opening capital + profit − {{blank:b}}. Net assets equal {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["current liabilities"], choices: ["current liabilities", "non-current liabilities", "drawings"] },
      { id: "b", accepted: ["drawings"], choices: ["drawings", "expenses", "liabilities"] },
      { id: "c", accepted: ["closing capital"], choices: ["closing capital", "working capital", "total assets"] },
    ],
    explanation: "The two halves of the statement agree because assets − liabilities = capital.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const close = 36420, np = 9150, dr = 6880;
    const open = r2(close - np + dr);
    b.calc({
      d: 3, kind: "money", value: open, calculator: true, wrong: [r2(close - np - dr), r2(close + np - dr)],
      stem: `At 31 December 2025 Chipo's closing capital was ${money(close)}. Her profit for the year was ${money(np)} and her drawings ${money(dr)}. Calculate her capital at 1 January 2025.`,
      hints: ["Work backwards: opening capital = closing capital − profit + drawings."],
      explanation: `Opening capital = ${fmt(close)} − ${fmt(np)} + ${fmt(dr)} = ${fmt(open)}. Deducting the drawings again gives ${fmt(r2(close - np - dr))}.`,
    });
  }
  {
    const cash = 5400, goods = 870, priv = 315;
    const tot = r2(cash + goods + priv);
    b.num({
      d: 2, kind: "money", value: tot, wrong: [cash],
      stem: `During 2025 Tatenda withdrew ${money(cash)} in cash, took goods costing ${money(goods)} for his family, and the business paid his private telephone bill of ${money(priv)}. Calculate his total drawings.`,
      explanation: `${fmt(cash)} + ${fmt(goods)} + ${fmt(priv)} = ${fmt(tot)}. All three are drawings, not only the cash.`,
    });
  }
  {
    const cost = [45000, 16800], acc = [0, 6720];
    const nbv = r2(sum(cost) - sum(acc));
    b.num({
      d: 2, kind: "money", value: nbv, wrong: [sum(cost)],
      stem: `Premises cost ${money(45000)} (not depreciated) and machinery cost ${money(16800)} with accumulated depreciation of ${money(6720)}. Calculate the total net book value of the non-current assets.`,
      explanation: `${fmt(sum(cost))} − ${fmt(sum(acc))} = ${fmt(nbv)}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain the difference between a **current** liability and a **non-current** liability, with an example of each.",
    points: ["Current: due for payment within one year, e.g. trade payables / bank overdraft", "Non-current: due after more than one year, e.g. a long-term bank loan"],
    modelAnswer: "A current liability must be paid within a year, such as trade payables; a non-current liability is not due for more than a year, such as a five-year bank loan.",
    explanation: "Timing of repayment decides the classification.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Nyasha's business made a profit of US\\$14,000 this year, yet its working capital is negative. Explain why this could be a problem and suggest **one** action she could take.",
    points: ["Negative working capital: current liabilities exceed current assets", "She may be unable to pay suppliers / the bank when payments fall due, despite the profit", "Action, e.g. introduce more capital / take a long-term loan / reduce drawings / collect debts faster"],
    modelAnswer: "Her short-term debts are larger than her current assets, so she may not have the cash to pay suppliers when they demand payment, even though the business is profitable. She could put in more capital or replace the overdraft with a long-term loan, and reduce her drawings.",
    hints: ["Profit is not the same as cash."],
    explanation: "Liquidity is separate from profitability.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const nca = [["Land and buildings", 38000, null], ["Equipment", 12500, 4750], ["Motor vehicle", 16000, 6400]];
    const ca = [["Inventory", 6920], ["Trade receivables", 4380], ["Cash", 345]];
    const cl = [["Trade payables", 5615], ["Bank overdraft", 2190]];
    const ncl = [["Bank loan (repayable 2029)", 12000]];
    const np = 13280, dr = 8100;
    const netA = r2(sum(nca.map((x) => x[1] - (x[2] ?? 0))) + sum(ca.map((x) => x[1])) - sum(cl.map((x) => x[1])) - 12000);
    const open = r2(netA - np + dr);
    const s = financialPosition({ name: "Thandeka Sibanda", terms: TERMS.BOTH, nca, ca, cl, ncl, openCap: open, profit: np, drawings: dr });
    const stim = table(["Balance at 31 December 2025", U], [["Land and buildings at cost", 38000], ["Equipment at cost", 12500], ["Provision for depreciation: equipment", 4750], ["Motor vehicle at cost", 16000], ["Provision for depreciation: motor vehicle", 6400], ["Inventory", 6920], ["Trade receivables", 4380], ["Cash", 345], ["Trade payables", 5615], ["Bank overdraft", 2190], ["Bank loan (repayable 2029)", 12000], ["Capital at 1 January 2025", open], ["Drawings", dr]]);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Thandeka Sibanda runs a stationery shop in Bulawayo. Her profit for the year ended 31 December 2025 was ${money(np)}. Her other balances at that date were:\n\n${stim}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: s.totNbv, wrong: [s.totCost], stem: "Calculate the total net book value of the non-current assets.", explanation: `${fmt(s.totCost)} − ${fmt(s.totAcc)} = ${fmt(s.totNbv)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: s.wc, wrong: [r2(s.totCA - 5615)], stem: "Calculate the working capital.", explanation: `${fmt(s.totCA)} − ${fmt(s.totCL)} = ${fmt(s.wc)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s.closing, wrong: [r2(open + np + dr)], stem: "Calculate Thandeka's closing capital.", explanation: `${fmt(open)} + ${fmt(np)} − ${fmt(dr)} = ${fmt(s.closing)}.` }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare Thandeka's statement of financial position at 31 December 2025.", points: ["Heading with \"at 31 December 2025\"", `Non-current assets: cost, depreciation and NBV ${fmt(s.totNbv)}`, `Current assets ${fmt(s.totCA)} in order of liquidity`, `Current liabilities including the overdraft ${fmt(s.totCL)}; working capital ${fmt(s.wc)}`, `Bank loan as a non-current liability; net assets ${fmt(s.netAssets)}`, `Capital section: ${fmt(open)} + ${fmt(np)} − ${fmt(dr)} = ${fmt(s.closing)}`], modelAnswer: s.md, explanation: "The two halves agree." }),
      ],
      hints: ["The overdraft is a current liability; the loan is non-current."],
      explanation: `Model answer:\n\n${s.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (drawings adjustments, CAM)
  {
    const cashDr = 6300, goods = 540, priv = 380, ci = 2500, open = 18740, np = 10475;
    const dr = r2(cashDr + goods + priv);
    const close = r2(open + ci + np - dr);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true, applies: CAM,
      stem: `Sipho runs a fruit and vegetable stall in Mbare market, Harare. His capital at 1 January 2025 was ${money(open)}. During 2025:\n\n- he paid ${money(ci)} from a family gift into the business bank account;\n- he withdrew ${money(cashDr)} in cash for personal use;\n- he took fruit costing ${money(goods)} for his household;\n- the business paid ${money(priv)} for his daughter's school trip.\n\nHis draft profit for the year, calculated before taking account of the goods and the school trip, was ${money(np - priv)}. The school trip had been debited to general expenses; the goods taken had not been recorded.`,
      parts: [
        P.mcq({ label: "(a)", stem: "What is the effect on profit of correcting the school trip payment?", options: [["Profit increases by US\\$380", "Correct: an expense is removed."], ["Profit decreases by US\\$380", "Removing an expense raises profit."], ["Profit is unchanged; only drawings change", "The expense was wrongly included, so profit changes too."], ["Profit increases by US\\$760", "The amount is corrected once."]], answer: "A", explanation: "Removing 380 from general expenses raises profit by 380; drawings rise by 380." }),
        P.mcq({ label: "(b)", stem: "Recording the goods taken (debit drawings, credit purchases) affects profit how?", options: [["Profit increases by US\\$540, because cost of sales falls", "Correct: purchases are reduced."], ["Profit decreases by US\\$540, because drawings rise", "Drawings are not an expense."], ["Profit is unchanged, because the goods were never sold", "Cost of sales falls, so gross profit rises."], ["Profit decreases by US\\$540, because inventory falls", "Closing inventory is counted, so it is unaffected."]], answer: "A", explanation: "Reducing purchases by 540 reduces cost of sales, so profit rises by 540." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: np + goods, wrong: [np], stem: "Calculate Sipho's corrected profit for the year.", explanation: `${fmt(np - priv)} + 380 (school trip removed) + 540 (purchases reduced) = ${fmt(np + goods)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: dr, wrong: [cashDr], stem: "Calculate his total drawings for 2025.", explanation: `${fmt(cashDr)} + ${fmt(goods)} + ${fmt(priv)} = ${fmt(dr)}.` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: r2(close + goods), wrong: [r2(close + goods - ci)], stem: "Calculate his capital at 31 December 2025, using your corrected profit.", explanation: `${fmt(open)} + ${fmt(ci)} + ${fmt(np + goods)} − ${fmt(dr)} = ${fmt(r2(close + goods))}. Leaving out the capital introduced gives ${fmt(r2(close + goods - ci))}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain which accounting concept requires the school trip to be treated as drawings.", points: ["Business entity concept", "The business is separate from its owner, so the owner's private costs are not business expenses"], modelAnswer: "The business entity concept: the stall is a separate entity from Sipho, so payments for his family are drawings, not expenses of the business.", explanation: "Name and explain the concept." }),
      ],
      hints: ["Correct the profit first, then build the capital section.", "Drawings reduce capital but are not expenses."],
      explanation: "Drawings of goods and private expenses change both the profit and the drawings figure.",
    });
  }

  // ---------------------------------------------------------------- Cards
  b.card("DEFINITION", "What is the **statement of financial position**?", "A statement of assets, liabilities and capital at a particular date.");
  b.card("DEFINITION", "Non-current assets", "Assets kept for more than a year to use in the business (premises, vehicles, equipment; intangible: goodwill).");
  b.card("DEFINITION", "Current assets", "Cash or items that become cash within a year: inventory, trade receivables, other receivables, bank, cash.");
  b.card("FORMULA", "Working capital (net current assets)", "Current assets − current liabilities.");
  b.card("FORMULA", "Closing capital", "Opening capital + capital introduced + profit (− loss) − drawings.");
  b.card("FACT", "Where does a bank overdraft go?", "Current liabilities (repayable on demand).");
  b.card("FACT", "Four kinds of drawings", "Cash/bank; goods (debit drawings, credit purchases, at cost); other assets; private expenses paid by the business.");
  b.card("FACT", "Heading of a statement of financial position", "Business name; Statement of financial position; at 31 December 2025.");
  b.card("CONCEPT", "Why must net assets equal closing capital?", "The accounting equation: assets − liabilities = capital.");
});
