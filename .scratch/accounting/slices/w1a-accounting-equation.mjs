// W1a: acc.fundamentals.accounting-equation
import { concept, P, money, fmt, statement, check, sum } from "../lib.mjs";

const sfp = (lines, rows, opts) => lines.map((l) => `**${l}**`).join("\n\n") + "\n\n" + statement("x", rows, opts).split("\n").slice(2).join("\n");
const row = (c) => `| ${c.join(" | ")} |`;

concept("acc.fundamentals.accounting-equation", { file: "fundamentals/accounting-equation", keyPrefix: "fundamentals.accounting-equation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following is the accounting equation?",
    options: [
      ["Assets = Capital + Liabilities", "Correct: everything the business owns was financed by the owner (capital) or by outsiders (liabilities)."],
      ["Assets + Liabilities = Capital", "Liabilities are a source of the assets, so they belong on the same side as capital, not with the assets."],
      ["Capital = Assets + Liabilities", "Capital is what is left for the owner after the liabilities are deducted from the assets, not added to them."],
      ["Liabilities = Assets + Capital", "Liabilities equal assets minus capital; adding capital makes the figure far too large."],
    ],
    answer: "A",
    explanation: "**Assets = Capital + Liabilities.** It can be rearranged as Capital = Assets − Liabilities or Liabilities = Assets − Capital.",
  });

  {
    const a = 15600, l = 4350, c = a - l;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A poultry project in Chinhoyi has assets of ${money(a)} and liabilities of ${money(l)}. What is the owner's capital?`,
      options: [
        [money(c), "Correct: capital = assets − liabilities."],
        [money(a + l), "This adds the liabilities to the assets instead of deducting them."],
        [money(l), "This is the amount owed to outsiders, not the amount owed to the owner."],
        [money(a), "This is the total of the assets; part of them was financed by liabilities."],
      ],
      answer: "A",
      explanation: `Capital = assets − liabilities = ${fmt(a)} − ${fmt(l)} = ${money(c)}.`,
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A transport operator buys a second-hand delivery van on credit from a garage in Bulawayo. What is the effect on the accounting equation?",
    options: [
      ["Assets increase and liabilities increase", "Correct: the van is a new asset and the amount owed to the garage is a new liability."],
      ["Assets increase and capital increases", "The owner has not put in more money; the van has been financed by the garage."],
      ["One asset increases and another asset decreases", "That would happen if the van were paid for by cash or bank; here nothing has been paid yet."],
      ["Assets decrease and liabilities increase", "Buying a van adds an asset; the two sides must change in the same direction."],
    ],
    answer: "A",
    explanation: "On credit means the business will pay later. The van (non-current asset) goes up and the amount owed to the garage (liability) goes up by the same amount.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rudo takes cash from her shop's till to pay her child's school fees. What is the effect on the accounting equation of the business?",
    options: [
      ["Cash decreases and capital decreases", "Correct: this is drawings. An asset (cash) and the amount owed to the owner (capital) both fall."],
      ["Cash decreases and liabilities decrease", "The school fees are a personal cost of Rudo; the business owes nothing less to any outsider."],
      ["Cash decreases and another asset increases", "No business asset is received in exchange; the money leaves the business."],
      ["Capital decreases and liabilities increase", "No new debt to an outsider is created; the cash has already been taken."],
    ],
    answer: "A",
    explanation: "Money taken by the owner for personal use is **drawings**. It reduces an asset (cash) and reduces capital. It is not a business expense.",
  });

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which transaction does **not** change the total of a business's assets?",
    options: [
      ["Buying office equipment and paying by bank transfer", "Correct: equipment goes up and bank goes down by the same amount, so total assets stay the same."],
      ["Buying goods for resale on credit from a supplier", "Inventory rises and nothing is paid, so total assets increase."],
      ["Paying a supplier the amount owed by bank transfer", "Bank falls while a liability falls, so total assets decrease."],
      ["The owner paying more of her savings into the business bank account", "Bank rises and capital rises, so total assets increase."],
    ],
    answer: "A",
    explanation: "When one asset is exchanged for another (bank for equipment), one asset rises and another falls by the same amount. Total assets, liabilities and capital are unchanged.",
  });

  {
    const cost = 560, sp = 840;
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `Farai sells goods that cost him ${money(cost)} for ${money(sp)}, and the customer pays in cash. What is the effect on Farai's capital?`,
      options: [
        [`It increases by ${money(sp - cost)}`, "Correct: the profit on the sale belongs to the owner, so capital rises by the profit."],
        [`It increases by ${money(sp)}`, "This is the cash received. Inventory costing US\\$560 was also given up, so assets rose by less than this."],
        [`It increases by ${money(cost)}`, "This is the cost of the goods given up, not the gain on the sale."],
        ["It does not change", "Selling at a profit increases net assets, so capital must rise."],
      ],
      answer: "A",
      explanation: `Cash rises by ${money(sp)} and inventory falls by ${money(cost)}, so assets rise by ${money(sp - cost)}. No liability changes, so capital rises by the profit of ${money(sp - cost)}.`,
      hints: ["Look at both assets that change: cash and inventory."],
    });
  }

  {
    const open = 9200, profit = 2750, draw = 1400, close = open + profit - draw;
    check("close", close, 10550);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `Sipho's capital at 1 January 2025 was ${money(open)}. During 2025 he made a profit of ${money(profit)} and took drawings of ${money(draw)}. He introduced no new capital. What was his capital at 31 December 2025?`,
      options: [
        [money(close), "Correct: opening capital + profit − drawings."],
        [money(open + profit + draw), "Drawings have been added; they reduce capital."],
        [money(open + profit), "This leaves out the drawings."],
        [money(open - profit + draw), "Profit and drawings have been treated the wrong way round."],
      ],
      answer: "A",
      explanation: `Closing capital = ${fmt(open)} + ${fmt(profit)} − ${fmt(draw)} = ${money(close)}.`,
      hints: ["Profit increases capital; drawings reduce it."],
    });
  }

  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business's liabilities increase while its total assets stay exactly the same. What must have happened to its capital?",
    options: [
      ["Capital fell by the same amount as the rise in liabilities", "Correct: if assets are unchanged, capital + liabilities must stay the same, so capital falls."],
      ["Capital rose by the same amount as the rise in liabilities", "Then capital + liabilities would rise while assets stayed the same: the equation would not balance."],
      ["Capital stayed the same as before", "Capital + liabilities would then be larger than assets."],
      ["Capital rose by twice the rise in liabilities", "Both sides must change by the same total amount, and here assets did not change at all."],
    ],
    answer: "A",
    explanation: "Assets = Capital + Liabilities. If assets do not change and liabilities rise, capital must fall by the same amount. This happens, for example, when an expense such as electricity is received on credit: it is a loss to the owner.",
    hints: ["Write the equation and keep the left-hand side fixed."],
  });

  {
    const a = 24000, c = 17500, pay = 1800, l0 = a - c, l1 = l0 - pay;
    b.mcq({
      d: 4, skill: "APPLICATION",
      stem: `Thandeka's hardware shop has assets of ${money(a)} and capital of ${money(c)}. She then pays a supplier ${money(pay)} by bank transfer. What are the shop's liabilities after the payment?`,
      options: [
        [money(l1), "Correct: liabilities were 24,000 − 17,500 = 6,500; the payment reduces them by 1,800."],
        [money(l0), "This is the figure before the payment to the supplier."],
        [money(l0 + pay), "The payment reduces the amount owed; it does not add to it."],
        [money(c - pay), "The payment does not change capital; it reduces bank (an asset) and the amount owed (a liability)."],
      ],
      answer: "A",
      explanation: `Liabilities before the payment = ${fmt(a)} − ${fmt(c)} = ${money(l0)}. Paying a supplier reduces bank and trade payables by ${money(pay)}, so liabilities become ${money(l1)}. Capital is unchanged at ${money(c)} and assets fall to ${money(a - pay)}.`,
      hints: ["First find the liabilities before the payment.", "Which two items does paying a supplier change?"],
    });
  }

  {
    const a = 31480, c = 22965, l = a - c;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, kind: "money", value: l,
      stem: `A school tuck shop has assets of ${money(a)} and capital of ${money(c)}. Calculate its liabilities.`,
      wrong: [a + c, c],
      explanation: `Liabilities = assets − capital = ${fmt(a)} − ${fmt(c)} = ${money(l)}. Adding the two figures (${money(a + c)}) is a common slip.`,
    });
  }

  {
    const open = 14300, intro = 2500, loss = 1180, draw = 3600, close = open + intro - loss - draw;
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: close, calculator: true,
      stem: `Nyasha's capital in her dressmaking business was ${money(open)} at 1 January 2025. During 2025 she paid in a further ${money(intro)} of her own money, the business made a **loss** of ${money(loss)}, and she took drawings of ${money(draw)}. Calculate her capital at 31 December 2025.`,
      wrong: [open + intro + loss - draw, open - loss - draw],
      explanation: `1. Closing capital = opening capital + capital introduced − loss − drawings.\n2. = ${fmt(open)} + ${fmt(intro)} − ${fmt(loss)} − ${fmt(draw)}\n3. = ${money(close)}.\n\nAdding the loss gives ${money(open + intro + loss - draw)}; leaving out the extra capital gives ${money(open - loss - draw)}.`,
      hints: ["A loss reduces capital, just as drawings do."],
    });
  }

  {
    const open = 8640, close = 11215, draw = 2450, profit = close - open + draw;
    check("profit", profit, 5025);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: profit, calculator: true,
      stem: `Tatenda introduced no new capital into his welding business during 2025. His capital was ${money(open)} on 1 January 2025 and ${money(close)} on 31 December 2025. His drawings for the year were ${money(draw)}. Calculate the profit for the year.`,
      wrong: [close - open, close - open - draw],
      explanation: `1. Closing capital = opening capital + profit − drawings, so profit = closing capital − opening capital + drawings.\n2. Increase in capital = ${fmt(close)} − ${fmt(open)} = ${fmt(close - open)}.\n3. Add back the drawings: ${fmt(close - open)} + ${fmt(draw)} = ${money(profit)}.\n\nThe increase in capital alone (${money(close - open)}) understates the profit, because part of the profit was taken out as drawings.`,
      hints: ["Capital went up by the profit and down by the drawings.", "Add the drawings back to the increase in capital."],
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A bank loan that was used to start a business is part of the owner's capital.",
    answer: false,
    explanation: "False. A loan is owed to the bank, an outsider, so it is a **liability**. Capital is only what the owner has invested plus retained profit.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a business buys inventory and pays in cash, its total assets stay the same.",
    answer: true,
    explanation: "True. Inventory increases and cash decreases by the same amount: one asset is exchanged for another.",
  });

  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Farai's printing business buys a computer on credit. Choose the effect on each part of the accounting equation.",
    template: "Total assets {{blank:a}}; total liabilities {{blank:b}}; capital {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["increase"], choices: ["increase", "decrease", "no change"] },
      { id: "b", accepted: ["increase"], choices: ["increase", "decrease", "no change"] },
      { id: "c", accepted: ["no change"], choices: ["increase", "decrease", "no change"] },
    ],
    explanation: "The computer is a new asset and the amount owed to the supplier is a new liability. The owner has put in nothing and no profit has been made, so capital does not change.",
  });

  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "A customer of Chipo's wholesale shop pays the amount she owes by bank transfer. Choose the effect on each total.",
    template: "Total assets {{blank:a}}; total liabilities {{blank:b}}; capital {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["no change"], choices: ["increase", "decrease", "no change"], wrong: "increase" },
      { id: "b", accepted: ["no change"], choices: ["increase", "decrease", "no change"], wrong: "decrease" },
      { id: "c", accepted: ["no change"], choices: ["increase", "decrease", "no change"], wrong: "increase" },
    ],
    explanation: "Bank increases and trade receivables (also an asset) decrease by the same amount. Total assets do not change, and neither liabilities nor capital are affected. The sale itself, and its profit, were recorded when the goods were sold.",
    hints: ["Money owed by a customer is an asset of the business.", "Two assets change: one up, one down."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each transaction with its effect on the accounting equation.",
    pairs: [
      ["The owner pays more of her own money into the business bank account", "An asset and capital both increase"],
      ["Goods for resale are bought on credit", "An asset and a liability both increase"],
      ["A supplier is paid by bank transfer", "An asset and a liability both decrease"],
      ["Office furniture is bought for cash", "One asset increases and another decreases"],
      ["The owner takes goods from the shop for her family", "An asset and capital both decrease"],
    ],
    explanation: "Each transaction changes two items. Capital changes only for the owner's dealings (capital introduced, drawings) and for profits or losses.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the accounting equation always balances.",
    points: [
      "Every asset of the business has been provided either by the owner (capital) or by outsiders (liabilities), so the two sides measure the same resources.",
      "Every transaction has two effects (dual aspect) of equal amount, so after each transaction both sides still agree.",
    ],
    modelAnswer: "The assets are the resources of the business, and capital plus liabilities show where those resources came from, so the totals must be the same. Each transaction has two equal effects, for example buying goods on credit increases inventory and trade payables by the same amount, so the equation stays in balance.",
    explanation: "Two ideas earn the marks: the two sides describe the same resources (what the business has and who provided it), and the dual aspect of every transaction keeps them equal.",
  });

  // Practice structured 1: a service business through June.
  {
    const tx = [
      ["1 June", "Tatenda pays US\\$4,500 of his own money into a business bank account."],
      ["4 June", "Buys repair tools and equipment for US\\$1,350, paying by bank transfer."],
      ["9 June", "Buys spare parts (inventory) for US\\$980 on credit from Chipo Electronics."],
      ["15 June", "Completes repairs for customers using spare parts that cost US\\$210. The customers pay US\\$620 into the bank."],
      ["20 June", "Pays Chipo Electronics US\\$600 by bank transfer."],
      ["27 June", "Takes US\\$250 from the business bank account for personal use."],
    ];
    const bank = 4500 - 1350 + 620 - 600 - 250;
    const equip = 1350, inv = 980 - 210, pay = 980 - 600, profit = 620 - 210, cap = 4500 + profit - 250;
    const ta = bank + equip + inv;
    check("equation", ta, pay + cap);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true, secs: 780,
      stem: `Tatenda started a phone repair business in Gweru on 1 June 2025. His transactions for June were:\n\n${row(["Date", "Transaction"])}\n${row(["---", "---"])}\n${tx.map((t) => row(t)).join("\n")}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: bank, stem: "Calculate the balance of the business bank account at 30 June 2025.", wrong: [bank + 250], explanation: `4,500 − 1,350 + 620 − 600 − 250 = ${money(bank)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: inv, stem: "Calculate the value of the inventory of spare parts at 30 June 2025.", wrong: [980], explanation: `980 − 210 used in repairs = ${money(inv)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: ta, stem: "Calculate the total assets of the business at 30 June 2025.", wrong: [ta - inv], explanation: `Bank ${fmt(bank)} + equipment ${fmt(equip)} + inventory ${fmt(inv)} = ${money(ta)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: profit, stem: "Calculate the profit made in June 2025.", wrong: [620], explanation: `Repair income 620 − spare parts used 210 = ${money(profit)}.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: cap, stem: "Calculate Tatenda's capital at 30 June 2025.", wrong: [4500 + profit], explanation: `4,500 + profit ${fmt(profit)} − drawings 250 = ${money(cap)}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why the payment of US\\$600 to Chipo Electronics on 20 June did not change Tatenda's capital.", points: ["The payment reduced an asset (bank) by US\\$600.", "It reduced a liability (trade payables) by the same amount, so assets − liabilities, and therefore capital, did not change (no profit or loss arises)."], modelAnswer: "Bank fell by US\\$600 and the amount owed to Chipo Electronics fell by US\\$600. Net assets stayed the same, so capital was unchanged." }),
      ],
      explanation: `At 30 June: bank ${money(bank)}, equipment ${money(equip)}, inventory ${money(inv)} (total assets ${money(ta)}); trade payables ${money(pay)}; capital ${money(cap)}. Check: ${fmt(pay)} + ${fmt(cap)} = ${fmt(ta)}.`,
      hints: ["Work through the transactions in order, changing two items each time.", "The profit on 15 June is the repair income less the cost of the parts used."],
    });
  }

  // Practice structured 2: capital from a list of balances, then the statement of financial position.
  {
    const bal = { "Poultry houses": 6350, Equipment: 1450, "Inventory of feed": 380, "Trade receivables": 540, Bank: 1125, Cash: 85, "Trade payables": 690, "Loan from Agri Finance (repayable 2029)": 3200 };
    const profit = 3420, draw = 1900;
    const nca = bal["Poultry houses"] + bal.Equipment;
    const ca = sum([bal["Inventory of feed"], bal["Trade receivables"], bal.Bank, bal.Cash]);
    const ta = nca + ca;
    const liab = bal["Trade payables"] + bal["Loan from Agri Finance (repayable 2029)"];
    const close = ta - liab;
    const open = close - profit + draw;
    check("open", open, 4520);
    const list = Object.entries(bal);
    const model = sfp(["Rudo's Poultry Project", "Statement of financial position", "at 31 December 2025"], [
      ["**Non-current assets**", null, null],
      ["Poultry houses", null, bal["Poultry houses"]],
      ["Equipment", null, bal.Equipment],
      ["", null, nca],
      ["**Current assets**", null, null],
      ["Inventory of feed", bal["Inventory of feed"], null],
      ["Trade receivables", bal["Trade receivables"], null],
      ["Bank", bal.Bank, null],
      ["Cash", bal.Cash, null],
      ["", null, ca],
      ["**Total assets**", null, `**${fmt(ta)}**`],
      null,
      ["**Capital**", null, null],
      ["Opening capital", open, null],
      ["Add profit for the year", profit, null],
      ["", open + profit, null],
      ["Less drawings", -draw, null],
      ["", null, close],
      ["**Non-current liabilities**", null, null],
      ["Loan from Agri Finance", null, 3200],
      ["**Current liabilities**", null, null],
      ["Trade payables", null, 690],
      ["**Total capital and liabilities**", null, `**${fmt(close + liab)}**`],
    ], { checks: [["totals", ta, close + liab], ["capital", open + profit - draw, close]] });
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: true, secs: 900,
      stem: `Rudo runs a poultry project near Chinhoyi. The following balances were taken from her books at 31 December 2025.\n\n${row(["Item", "US\\$"])}\n${row(["---", "---:"])}\n${list.map(([k, v]) => row([k, fmt(v)])).join("\n")}\n\nDuring 2025 the project made a profit of ${money(profit)} and Rudo took drawings of ${money(draw)}. She introduced no new capital.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: ta, stem: "Calculate the total assets at 31 December 2025.", wrong: [ta - bal.Cash], explanation: `Non-current ${fmt(nca)} + current ${fmt(ca)} = ${money(ta)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: close, stem: "Calculate Rudo's capital at 31 December 2025.", wrong: [ta - bal["Trade payables"]], explanation: `Capital = assets − liabilities = ${fmt(ta)} − (690 + 3,200) = ${money(close)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: open, stem: "Calculate Rudo's capital at 1 January 2025.", wrong: [close - profit - draw], explanation: `Opening capital = closing capital − profit + drawings = ${fmt(close)} − ${fmt(profit)} + ${fmt(draw)} = ${money(open)}.` }),
        P.manual({
          label: "(d)", marks: 7, type: "EXTENDED_RESPONSE",
          stem: "Prepare Rudo's statement of financial position at 31 December 2025.",
          points: [
            "Correct three-line heading: business name, statement name, at 31 December 2025.",
            `Non-current assets: poultry houses and equipment, total ${money(nca)}.`,
            `Current assets listed (inventory, trade receivables, bank, cash), total ${money(ca)}.`,
            `Total assets ${money(ta)}.`,
            `Capital section: opening capital ${money(open)} plus profit ${money(profit)} less drawings ${money(draw)} = ${money(close)}.`,
            `Loan shown as a non-current liability ${money(3200)} and trade payables as a current liability ${money(690)}.`,
            `Total capital and liabilities ${money(ta)}, equal to total assets.`,
          ],
          modelAnswer: model,
        }),
      ],
      explanation: `Total assets ${money(ta)}; liabilities ${money(liab)}; closing capital ${money(close)}; opening capital ${money(open)}. The loan is non-current because it is not repayable until 2029.`,
      hints: ["Split the items into assets and liabilities first.", "Opening capital + profit − drawings = closing capital: work backwards."],
    });
  }

  b.card("FORMULA", "State the accounting equation.", "Assets = Capital + Liabilities");
  b.card("FORMULA", "How do you find capital from assets and liabilities?", "Capital = Assets − Liabilities (also called net assets).");
  b.card("FORMULA", "How is closing capital calculated?", "Closing capital = opening capital + capital introduced + profit − drawings (a loss is deducted).");
  b.card("DEFINITION", "Capital (owner's equity)", "The amount the business owes its owner: the owner's investment plus retained profit, less drawings and losses.");
  b.card("CONCEPT", "Why does the accounting equation always balance?", "Every transaction has two equal effects (the dual aspect), and both sides describe the same resources: what the business has and who provided it.");
  b.card("FACT", "Effect of buying goods on credit", "Assets (inventory) increase and liabilities (trade payables) increase by the same amount; capital does not change.");
  b.card("FACT", "Effect of drawings on the equation", "An asset (cash, bank or inventory) decreases and capital decreases. Drawings are not an expense.");
  b.card("FACT", "Effect of buying equipment for cash", "One asset rises and another falls by the same amount: totals do not change.");
  b.card("CONCEPT", "How does a sale at a profit affect the equation?", "Assets rise by the profit (cash in exceeds the cost of inventory given up), and capital rises by the same profit.");
});
