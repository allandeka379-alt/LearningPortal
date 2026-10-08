// W1b: closing entries and transfers to the financial statements.
import { concept, P, money, tAccount, journal, statement, check, sum, r2, ZIM, CAM } from "../lib.mjs";

concept("acc.ledger.closing-entries", { file: "ledger/closing-entries", keyPrefix: "ledger.closing-entries" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of account is closed off to the income statement (statement of profit or loss) at the end of the financial year?",
    options: [
      ["Expense accounts such as wages", "Correct: income and expense (nominal) accounts measure one year and are cleared to the income statement."],
      ["Asset accounts such as equipment", "Assets continue into the next year; their balances are carried down."],
      ["Liability accounts such as a bank loan", "Liabilities are carried down to the statement of financial position."],
      ["The owner's capital account", "Capital is balanced and carried down; profit is added to it."],
    ],
    answer: "A",
    explanation: "Nominal accounts (income and expenses) are closed to the income statement. Real and personal accounts (assets, liabilities, capital) are balanced and carried down.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "At the year end the rent paid account has a debit balance of US\\$2,880. Which entry closes it?",
    options: [
      ["Debit income statement; credit rent paid", "Correct: crediting rent clears its debit balance, and the expense is charged to the income statement."],
      ["Debit rent paid; credit income statement", "This would double the debit balance instead of clearing it."],
      ["Debit capital; credit rent paid", "Expenses go to the income statement, not directly to capital."],
      ["Debit rent paid; credit bank", "That records a payment of rent, not a year-end transfer."],
    ],
    answer: "A",
    explanation: "An expense has a debit balance, so it is **credited** to clear it, with the debit in the income statement: *Dr Income statement, Cr Rent paid US\\$2,880*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Commission received has a credit balance of US\\$940 at the year end. Which entry closes it?",
    options: [
      ["Debit commission received; credit income statement", "Correct: debiting the income account clears its credit balance."],
      ["Debit income statement; credit commission received", "This would increase the credit balance."],
      ["Debit commission received; credit capital", "Income goes to the income statement first; only the profit goes to capital."],
      ["Debit bank; credit commission received", "That records receiving commission, not closing the account."],
    ],
    answer: "A",
    explanation: "Income accounts have credit balances, so they are **debited** with the transfer and the income statement is credited.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is the balance on the **drawings** account transferred at the year end?",
    options: [
      ["To the debit of the capital account", "Correct: drawings reduce the owner's capital."],
      ["To the debit of the income statement", "Drawings are not a business expense and do not reduce profit."],
      ["To the credit of the capital account", "That would increase capital; drawings reduce it."],
      ["It is carried down as an asset", "Drawings are not an asset of the business."],
    ],
    answer: "A",
    explanation: "Closing entry: *Dr Capital, Cr Drawings*. The drawings account is then empty, and capital is reduced.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which journal entry records the transfer of a **profit** for the year to the owner's capital account?",
    options: [
      ["Debit income statement; credit capital", "Correct: profit increases capital (a credit)."],
      ["Debit capital; credit income statement", "This is the entry for a loss."],
      ["Debit bank; credit capital", "No money moves; it is a transfer between accounts."],
      ["Debit drawings; credit capital", "Drawings are transferred the other way: debit capital, credit drawings."],
    ],
    answer: "A",
    hints: ["Does a profit increase or decrease capital? Which side does capital increase on?"],
    explanation: "A profit belongs to the owner and increases capital: *Dr Income statement, Cr Capital*. A loss is the reverse.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "After all the closing entries have been made, which account will still have a balance brought down?",
    options: [
      ["A credit customer's account", "Correct: it is an asset and is carried forward to the next year."],
      ["The carriage outwards account", "An expense: closed to the income statement."],
      ["The discount received account", "Income: closed to the income statement."],
      ["The owner's drawings account", "Closed to the capital account."],
    ],
    answer: "A",
    hints: ["Which of these appears in the statement of financial position?"],
    explanation: "Only asset, liability and capital accounts keep balances after the year end; they appear in the statement of financial position.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which pair of entries records the **closing inventory** at the year end?",
    options: [
      ["Debit inventory; credit income statement", "Correct: the inventory account now holds the asset, and cost of sales in the income statement is reduced."],
      ["Debit income statement; credit inventory", "This is the entry for transferring the opening inventory."],
      ["Debit purchases; credit inventory", "Purchases is not adjusted for closing inventory."],
      ["Debit inventory; credit purchases", "Closing inventory is deducted in the income statement, not from the purchases account."],
    ],
    answer: "A",
    hints: ["Closing inventory is an asset at the year end. Which side does an asset increase on?"],
    explanation: "Closing inventory is brought into the books as an asset (*Dr Inventory*) and deducted from cost of sales (*Cr Income statement*). The opening inventory is transferred the other way.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "In a Cambridge answer, what is written in the details column of an expense account when it is closed at the year end?",
    options: [
      ["Statement of profit or loss", "Correct: this is the Cambridge name for the income statement."],
      ["Statement of financial position", "Expenses do not go to the statement of financial position."],
      ["Balance c/d", "Expense accounts are cleared, not carried down."],
      ["Capital", "Expenses reduce profit; they are not transferred directly to capital."],
    ],
    answer: "A",
    hints: ["Name the statement that calculates profit."],
    explanation: "Cambridge calls the income statement the **statement of profit or loss**. ZIMSEC uses \"Income statement\" (formerly trading and profit and loss account).",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "After the closing entries, an expense account normally has no balance to bring down to the next year.",
    answer: true,
    explanation: "True. The whole balance is transferred to the income statement, so the account starts the new year at zero (unless there is an accrual or prepayment).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Drawings are transferred to the income statement at the year end because they reduce the owner's profit.",
    answer: false,
    explanation: "False. Drawings are not a business expense. They are transferred to the **capital** account and do not affect profit.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each account with its treatment at the year end.",
    pairs: ["Electricity", "Rent received", "Drawings", "Motor vehicles", "Bank loan", "Returns inwards"],
    right: ["Transferred to the income statement", "Transferred to the capital account", "Balance carried down to the next year"],
    rightIndex: [0, 0, 1, 2, 2, 0],
    explanation: "Income and expenses (including returns): income statement. Drawings: capital. Assets and liabilities: carried down.",
  });

  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "To close the wages account at the year end, {{blank:a}} the wages account and {{blank:b}} the income statement.",
    blanks: [
      { id: "a", accepted: ["credit"], choices: ["credit", "debit"] },
      { id: "b", accepted: ["debit"], choices: ["debit", "credit"] },
    ],
    explanation: "Wages has a debit balance; a credit entry of the same amount clears it, and the income statement is debited with the expense.",
  });

  // Closing capital
  const cap = { open: 15400, profit: 4860, drawings: 3900 };
  const closeCap = r2(cap.open + cap.profit - cap.drawings);
  b.num({
    d: 2, daily: true, kind: "money", value: closeCap, wrong: [r2(cap.open + cap.profit + cap.drawings), r2(cap.open + cap.profit)],
    stem: `Nyasha's capital was ${money(cap.open)} on 1 January 2025. For the year her profit was ${money(cap.profit)} and her drawings were ${money(cap.drawings)}. What is the balance carried down on her capital account at 31 December 2025?`,
    explanation: `Capital + profit − drawings: $15,400 + 4,860 - 3,900 = ${closeCap.toLocaleString("en-GB")}$. The balance c/d is ${money(closeCap)}. Adding drawings instead of deducting them gives ${money(r2(cap.open + cap.profit + cap.drawings))}.`,
  });
  // Loss case
  const lossCase = { open: 9600, loss: 1250, drawings: 2100 };
  const lossClose = r2(lossCase.open - lossCase.loss - lossCase.drawings);
  b.calc({
    d: 3, kind: "money", value: lossClose, wrong: [r2(lossCase.open + lossCase.loss - lossCase.drawings)],
    stem: `Sipho's transport business made a **loss** of ${money(lossCase.loss)} for 2025. His capital on 1 January 2025 was ${money(lossCase.open)} and his drawings were ${money(lossCase.drawings)}. Calculate the closing balance on his capital account.`,
    hints: ["A loss is the opposite of a profit: which side of the capital account does it go on?"],
    explanation: `A loss is debited to capital (*Dr Capital, Cr Income statement*), and so are drawings: $9,600 - 1,250 - 2,100 = ${lossClose.toLocaleString("en-GB")}$. Closing capital ${money(lossClose)}. Treating the loss as a profit gives ${money(r2(lossCase.open + lossCase.loss - lossCase.drawings))}.`,
  });
  // Total transferred
  const exps = [["Wages", 5280], ["Insurance", 640], ["Motor expenses", 1935], ["Telephone", 415]];
  const expTotal = sum(exps.map((x) => x[1]));
  b.num({
    d: 2, kind: "money", value: expTotal, wrong: [r2(expTotal - 640)],
    stem: `At 31 December 2025 Rudo's ledger shows these expense balances: ${exps.map(([n, a]) => `${n.toLowerCase()} ${money(a)}`).join(", ")}. What total will be debited to the income statement for these expenses?`,
    explanation: `$5,280 + 640 + 1,935 + 415 = ${expTotal.toLocaleString("en-GB")}$: each expense is credited to its own account and the income statement is debited ${money(expTotal)} in total.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why income and expense accounts are closed at the end of each year, but asset and liability accounts are not.",
    points: ["Income and expenses measure the profit of one period only, so they must start each year at zero", "Assets and liabilities still exist at the year end and continue into the next year, so their balances are carried down to the statement of financial position"],
    modelAnswer: "Income and expense accounts record one year's activity so that the profit for that year can be measured; they are cleared to start afresh. Assets and liabilities are still owned or owed at the year end, so their balances are carried forward.",
    hints: ["Think about what each statement measures: a period, or a point in time."],
    explanation: "The income statement covers a period; the statement of financial position is at a date.",
  });

  // Practice structured 1: closing an expense account and the journal
  const ins = [["31 Jan", "Bank", 1260], ["31 Jul", "Bank", 1260]];
  const insTotal = sum(ins.map((x) => x[2]));
  const carriage = 385;
  const discRec = 310;
  const j1 = journal([
    { date: "31 Dec", lines: [["Income statement", insTotal, null], ["Insurance", null, insTotal]], narrative: "Insurance for the year transferred to the income statement" },
    { date: "31 Dec", lines: [["Income statement", carriage, null], ["Carriage outwards", null, carriage]], narrative: "Carriage outwards transferred to the income statement" },
    { date: "31 Dec", lines: [["Discount received", discRec, null], ["Income statement", null, discRec]], narrative: "Discount received transferred to the income statement" },
  ]);
  const insModel = tAccount("Insurance account", ins, [["31 Dec", "Income statement", insTotal]], {});
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION",
    stem: `Chipo owns a pharmacy in Bulawayo. Her financial year ends on 31 December 2025. Her ledger shows:\n\n- Insurance account: payments by bank of ${money(1260)} on 31 January and ${money(1260)} on 31 July.\n- Carriage outwards account: debit balance ${money(carriage)}.\n- Discount received account: credit balance ${money(discRec)}.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: insTotal, wrong: [1260],
        stem: "Calculate the amount transferred from the insurance account to the income statement.",
        explanation: `$1,260 + 1,260 = ${insTotal.toLocaleString("en-GB")}$.`,
      }),
      P.manual({
        label: "(b)", marks: 3, type: "EXTENDED_RESPONSE",
        stem: "Prepare the insurance account for the year, showing the transfer to the income statement.",
        points: ["Two bank payments of 1,260 on the debit side with dates", `31 Dec Income statement ${insTotal.toLocaleString("en-GB")} on the credit side`, `Totals ${insTotal.toLocaleString("en-GB")} on both sides with no balance b/d`],
        modelAnswer: insModel,
        explanation: "The transfer clears the debit balance completely.",
      }),
      P.fib({
        label: "(c)", stem: "Complete the closing entry for discount received.",
        template: "Debit {{blank:a}}; credit {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["Discount received"], choices: ["Discount received", "Income statement", "Capital", "Bank"] },
          { id: "b", accepted: ["Income statement"], choices: ["Income statement", "Discount received", "Capital", "Bank"] },
        ],
        explanation: "Discount received is income (credit balance), so it is debited to close it.",
      }),
      P.manual({
        label: "(d)", marks: 4, type: "EXTENDED_RESPONSE",
        stem: "Prepare the journal entries, with narratives, to close the three accounts.",
        points: [`Dr Income statement, Cr Insurance ${insTotal.toLocaleString("en-GB")}`, `Dr Income statement, Cr Carriage outwards ${carriage}`, `Dr Discount received, Cr Income statement ${discRec}`, "Narratives and dates"],
        modelAnswer: j1,
        explanation: "Expenses: debit the income statement. Income: credit the income statement.",
      }),
    ],
    hints: ["An expense has a debit balance; an income account has a credit balance.", "The closing entry is on the side that clears the balance."],
    explanation: "This item tests ledger transfers and journal entries at the year end.",
  });

  // Practice structured 2: capital account with profit and drawings in cash and goods
  const s2 = { open: 26500, profit: 9340, cashDr: 4800, goodsDr: 650, capIntro: 2000 };
  const drTotal = r2(s2.cashDr + s2.goodsDr);
  const close2 = r2(s2.open + s2.capIntro + s2.profit - drTotal);
  const capModel = tAccount(
    "Capital account",
    [["31 Dec", "Drawings", drTotal]],
    [["1 Jan", "Balance b/d", s2.open], ["1 Jul", "Bank", s2.capIntro], ["31 Dec", "Income statement", s2.profit]],
    { cdDate: "31 Dec", bdDate: "1 Jan 2026" },
  );
  check("cap close", close2, 32390);
  b.struct({
    d: 5, examStyle: true, skill: "ANALYSIS", calculator: true, applies: ZIM,
    stem: `Tatenda runs a building supplies business in Masvingo. Information for the year ended 31 December 2025:\n\n| Item | US\\$ |\n| --- | ---: |\n| Capital at 1 January 2025 | ${s2.open.toLocaleString("en-GB")} |\n| Additional capital paid into the bank on 1 July 2025 | ${s2.capIntro.toLocaleString("en-GB")} |\n| Net profit for the year | ${s2.profit.toLocaleString("en-GB")} |\n| Cash drawings during the year | ${s2.cashDr.toLocaleString("en-GB")} |\n| Goods taken for own use (at cost) | ${s2.goodsDr.toLocaleString("en-GB")} |`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: drTotal, wrong: [s2.cashDr],
        stem: "Calculate the total drawings transferred to the capital account.",
        explanation: `$4,800 + 650 = ${drTotal.toLocaleString("en-GB")}$. Goods taken are drawings too.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: close2, wrong: [r2(close2 - s2.capIntro), r2(close2 + s2.goodsDr)],
        stem: "Calculate the capital at 31 December 2025.",
        explanation: `$26,500 + 2,000 + 9,340 - 5,450 = ${close2.toLocaleString("en-GB")}$. Leaving out the additional capital gives ${money(r2(close2 - s2.capIntro))}.`,
      }),
      P.manual({
        label: "(c)", marks: 5, type: "EXTENDED_RESPONSE",
        stem: "Prepare Tatenda's capital account for the year, balanced and with the balance brought down.",
        points: ["Balance b/d 26,500 and Bank 2,000 on the credit side", "Income statement (net profit) 9,340 on the credit side", "Drawings 5,450 on the debit side", `Balance c/d ${close2.toLocaleString("en-GB")} and equal totals`, "Balance b/d on 1 Jan 2026 on the credit side"],
        modelAnswer: capModel,
        explanation: "Credits: opening capital, new capital, profit. Debits: drawings, then balance c/d.",
      }),
      P.mcq({
        label: "(d)", stem: "Which entry recorded the goods taken for own use during the year?",
        options: [["Debit drawings; credit purchases", "Correct: goods taken at cost reduce purchases and increase drawings."], ["Debit purchases; credit drawings", "Reversed."], ["Debit drawings; credit sales", "Goods taken are not sold; they are recorded at cost against purchases."], ["Debit capital; credit sales", "Goods taken first go through drawings, not directly to capital."]],
        answer: "A",
        explanation: "The drawings total then goes to capital at the year end.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "State whether Tatenda's investment in the business increased or decreased during the year, and give the amount.",
        points: ["Increased", `By ${money(r2(close2 - s2.open))} (own figure: closing capital less opening capital)`],
        modelAnswer: `Increased, by ${money(r2(close2 - s2.open))}: capital rose from ${money(s2.open)} to ${money(close2)} because the profit and new capital exceeded the drawings.`,
        explanation: "Compare closing and opening capital.",
      }),
    ],
    hints: ["Profit and additional capital increase capital; drawings reduce it.", "Add the cash and goods drawings together."],
    explanation: "This item tests the final closing entries: profit and drawings transferred to capital.",
  });

  b.card("DEFINITION", "What are **closing entries**?", "Year-end entries that transfer income and expense balances to the income statement, and profit and drawings to capital.");
  b.card("FACT", "Closing an expense account", "Credit the expense account; debit the income statement (statement of profit or loss).");
  b.card("FACT", "Closing an income account", "Debit the income account; credit the income statement (statement of profit or loss).");
  b.card("FACT", "Transferring profit to capital", "Debit income statement; credit capital. A loss: debit capital; credit income statement.");
  b.card("FACT", "Closing the drawings account", "Debit capital; credit drawings.");
  b.card("FACT", "Inventory at the year end", "Opening inventory: debit income statement, credit inventory. Closing inventory: debit inventory, credit income statement.");
  b.card("CONCEPT", "Which accounts are carried down, not closed?", "Assets, liabilities and capital: their balances appear in the statement of financial position.");
  b.card("FORMULA", "Closing capital", "Opening capital + capital introduced + profit − drawings (a loss is deducted).");
  b.card("FACT", "Name of the income statement in the ledger", "ZIMSEC: Income statement (trading and profit and loss account). Cambridge: Statement of profit or loss.");
});
