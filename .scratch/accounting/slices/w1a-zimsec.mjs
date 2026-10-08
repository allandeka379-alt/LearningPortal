// W1a: ZIMSEC Paper 2 exam-format item (20 marks): the accounting equation and the statement of financial position
// from transactions.
import { concept, P, money, fmt, statement, check, sum, ZIM } from "../lib.mjs";

const sfp = (lines, rows, opts) => lines.map((l) => `**${l}**`).join("\n\n") + "\n\n" + statement("x", rows, opts).split("\n").slice(2).join("\n");
const EFFECT = ["Increase", "Decrease", "No effect"];

concept("acc.fundamentals.accounting-equation", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // Farai's hardware shop, January 2025. All figures derived below.
  const capitalIn = 11600, equipment = 3500, creditGoods = 4200, saleCost = 1600, salePrice = 2470, loan = 5000, paySupplier = 1850, drawings = 300, van = 8000;
  const bank = capitalIn - equipment + loan - paySupplier - van;
  const cash = salePrice - drawings;
  const inventory = creditGoods - saleCost;
  const payables = creditGoods - paySupplier;
  const profit = salePrice - saleCost;
  const capital = capitalIn + profit - drawings;
  const nca = equipment + van;
  const ca = inventory + bank + cash;
  const ta = nca + ca;
  const liab = payables + loan;
  check("equation", ta, capital + liab);
  check("bank", bank, 3250);

  const transactions = [
    `1 Jan: Farai opened a business bank account and paid in ${money(capitalIn)} as capital.`,
    `3 Jan: Bought shop equipment and paid by cheque, ${money(equipment)}.`,
    `6 Jan: Bought goods for resale on credit from Gweru Wholesalers, ${money(creditGoods)}.`,
    `10 Jan: Sold goods which had cost ${money(saleCost)} for ${money(salePrice)} cash.`,
    `15 Jan: Received a bank loan of ${money(loan)}, repayable in 2032, paid into the business bank account.`,
    `20 Jan: Paid Gweru Wholesalers ${money(paySupplier)} by cheque.`,
    `25 Jan: Farai took ${money(drawings)} cash for personal use.`,
    `31 Jan: Bought a motor van and paid by cheque, ${money(van)}.`,
  ];

  const model = sfp(["Farai Hardware", "Statement of financial position", "at 31 January 2025"], [
    ["**Non-current assets**", null, null],
    ["Shop equipment", null, equipment],
    ["Motor van", null, van],
    ["", null, nca],
    ["**Current assets**", null, null],
    ["Inventory", inventory, null],
    ["Bank", bank, null],
    ["Cash", cash, null],
    ["", null, ca],
    ["**Total assets**", null, `**${fmt(ta)}**`],
    null,
    ["**Capital**", null, null],
    ["Capital introduced", capitalIn, null],
    ["Add net profit", profit, null],
    ["", capitalIn + profit, null],
    ["Less drawings", -drawings, null],
    ["", null, capital],
    ["**Non-current liabilities**", null, null],
    ["Bank loan (repayable 2032)", null, loan],
    ["**Current liabilities**", null, null],
    ["Trade payables (Gweru Wholesalers)", null, payables],
    ["**Total capital and liabilities**", null, `**${fmt(capital + liab)}**`],
  ], { checks: [["nca", nca, sum([equipment, van])], ["ca", ca, sum([inventory, bank, cash])], ["totals", ta, capital + liab], ["capital", capitalIn + profit - drawings, capital]] });

  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, calculator: true, secs: 1260,
    concepts: ["acc.fundamentals.accounting-equation", "acc.fundamentals.key-terms"],
    stem: `Farai started a hardware shop in Gweru on 1 January 2025. His transactions for January were:\n\n${transactions.map((t) => `- ${t}`).join("\n")}\n\nAll goods not sold were still in inventory at 31 January 2025.`,
    parts: [
      P.fib({
        label: "(a)", marks: 6,
        stem: "State the effect of each transaction on total assets, total liabilities and capital.",
        template: "6 January: assets {{blank:a1}}; liabilities {{blank:l1}}; capital {{blank:c1}}.\n\n25 January: assets {{blank:a2}}; liabilities {{blank:l2}}; capital {{blank:c2}}.",
        blanks: [
          { id: "a1", accepted: ["Increase"], choices: EFFECT },
          { id: "l1", accepted: ["Increase"], choices: EFFECT },
          { id: "c1", accepted: ["No effect"], choices: EFFECT },
          { id: "a2", accepted: ["Decrease"], choices: EFFECT },
          { id: "l2", accepted: ["No effect"], choices: EFFECT },
          { id: "c2", accepted: ["Decrease"], choices: EFFECT },
        ],
        wrong: [["Increase", "No effect", "Increase", "Decrease", "No effect", "No effect"]],
        explanation: "6 January: inventory (asset) and trade payables (liability) both rise by US\\$4,200; capital is unchanged. 25 January: cash (asset) falls and capital falls by the drawings of US\\$300; drawings are not an expense and liabilities are unchanged.",
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: bank,
        stem: "Calculate the balance at bank on 31 January 2025.",
        wrong: [bank + salePrice, capitalIn - equipment - paySupplier - van + loan + drawings],
        explanation: `${fmt(capitalIn)} − ${fmt(equipment)} + ${fmt(loan)} − ${fmt(paySupplier)} − ${fmt(van)} = ${money(bank)}. The cash sale and the drawings went through the cash account, not the bank.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: ta,
        stem: "Calculate the total assets of the business at 31 January 2025.",
        wrong: [ta - inventory + creditGoods, ta - cash],
        explanation: `Equipment 3,500 + van 8,000 + inventory (4,200 − 1,600 = ${fmt(inventory)}) + bank ${fmt(bank)} + cash (${fmt(salePrice)} − ${fmt(drawings)} = ${fmt(cash)}) = ${money(ta)}. Using inventory of 4,200 forgets the goods sold.`,
      }),
      P.num({
        label: "(d)", marks: 2, kind: "money", value: capital,
        stem: "Use the accounting equation to calculate Farai's capital at 31 January 2025.",
        wrong: [capitalIn, ta - payables],
        explanation: `Capital = assets − liabilities = ${fmt(ta)} − (${fmt(payables)} + ${fmt(loan)}) = ${money(capital)}. Check: ${fmt(capitalIn)} + net profit ${fmt(profit)} − drawings ${fmt(drawings)} = ${money(capital)}. Leaving out the loan gives ${money(ta - payables)}.`,
      }),
      P.manual({
        label: "(e)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "Prepare Farai's statement of financial position (balance sheet) at 31 January 2025.",
        points: [
          "Correct three-line heading: name, statement of financial position, at 31 January 2025.",
          `Non-current assets: shop equipment ${money(equipment)} and motor van ${money(van)}, total ${money(nca)}.`,
          `Inventory ${money(inventory)} shown as a current asset.`,
          `Bank ${money(bank)} and cash ${money(cash)} as current assets, total current assets ${money(ca)}.`,
          `Total assets ${money(ta)}.`,
          `Capital: ${money(capitalIn)} + net profit ${money(profit)} − drawings ${money(drawings)} = ${money(capital)}.`,
          `Bank loan ${money(loan)} shown as a non-current liability; trade payables ${money(payables)} as a current liability.`,
          `Total capital and liabilities ${money(capital + liab)}, equal to total assets.`,
        ],
        modelAnswer: model,
      }),
    ],
    explanation: `Bank ${money(bank)}; cash ${money(cash)}; inventory ${money(inventory)}; total assets ${money(ta)}; liabilities ${money(liab)}; capital ${money(capital)}. The sale on 10 January earned a net profit of ${money(profit)}, which increased capital.`,
    hints: ["Track each asset and liability through the month in a table.", "A sale at a profit changes capital by the profit only.", "Capital = assets − liabilities; check it with capital + profit − drawings."],
  });
});
