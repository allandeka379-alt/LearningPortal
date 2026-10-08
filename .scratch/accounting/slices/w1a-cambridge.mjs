// W1a: Cambridge 0452 Paper 2 exam-format item (20 marks): the accounting equation and the statement of financial
// position from transactions, ending with an advise part.
import { concept, P, money, fmt, statement, check, sum, CAM } from "../lib.mjs";

const row = (c) => `| ${c.join(" | ")} |`;
const sfp = (lines, rows, opts) => lines.map((l) => `**${l}**`).join("\n\n") + "\n\n" + statement("x", rows, opts).split("\n").slice(2).join("\n");
const EFFECT = ["Increase", "Decrease", "No effect"];

concept("acc.fundamentals.accounting-equation", { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  const open = { Fixtures: 6400, Inventory: 5150, "Trade receivables": 1320, Bank: 2480, "Trade payables": 3060, "Loan (repayable 2033)": 4700 };
  const openAssets = open.Fixtures + open.Inventory + open["Trade receivables"] + open.Bank;
  const openLiab = open["Trade payables"] + open["Loan (repayable 2033)"];
  const openCap = openAssets - openLiab;

  const creditPurch = 1940, saleCost = 2300, salePrice = 3450, received = 1000, paid = 2640, extraCap = 1500, fixturesBought = 1150, drawings = 360, rent = 350;
  const fixtures = open.Fixtures + fixturesBought;
  const inventory = open.Inventory + creditPurch - saleCost;
  const receivables = open["Trade receivables"] + salePrice - received;
  const bank = open.Bank + received - paid + extraCap - fixturesBought - drawings - rent;
  const payables = open["Trade payables"] + creditPurch - paid;
  const loan = open["Loan (repayable 2033)"];
  const profit = salePrice - saleCost - rent;
  const closeCap = openCap + extraCap + profit - drawings;
  const ca = inventory + receivables + bank;
  const ta = fixtures + ca;
  const liab = payables + loan;
  const nca_wc = ca - payables;
  check("equation", ta, closeCap + liab);
  check("bank", bank, 480);
  check("openCap", openCap, 7590);

  const stim = [row(["Item", "US\\$"]), row(["---", "---:"]), ...Object.entries(open).map(([k, v]) => row([k, fmt(v)]))].join("\n");
  const tx = [
    `3 Nov: Bought goods on credit, ${money(creditPurch)}.`,
    `8 Nov: Sold goods which had cost ${money(saleCost)} on credit for ${money(salePrice)}.`,
    `12 Nov: Received ${money(received)} from trade receivables by bank transfer.`,
    `17 Nov: Paid trade payables ${money(paid)} by bank transfer.`,
    `21 Nov: Nyasha paid an additional ${money(extraCap)} of her own money into the business bank account.`,
    `24 Nov: Bought new fixtures, paying ${money(fixturesBought)} by bank transfer.`,
    `27 Nov: Paid rent for November, ${money(rent)}, by bank transfer.`,
    `29 Nov: Nyasha transferred ${money(drawings)} from the business bank account for personal use.`,
  ];

  const model = sfp(["Nyasha Electricals", "Statement of financial position", "at 30 November 2025"], [
    ["**Non-current assets**", null, null],
    ["Fixtures", null, fixtures],
    ["**Current assets**", null, null],
    ["Inventory", inventory, null],
    ["Trade receivables", receivables, null],
    ["Bank", bank, null],
    ["", null, ca],
    ["**Total assets**", null, `**${fmt(ta)}**`],
    null,
    ["**Capital**", null, null],
    ["Opening balance", openCap, null],
    ["Add capital introduced", extraCap, null],
    ["Add profit for the month", profit, null],
    ["", openCap + extraCap + profit, null],
    ["Less drawings", -drawings, null],
    ["", null, closeCap],
    ["**Non-current liabilities**", null, null],
    ["Loan (repayable 2033)", null, loan],
    ["**Current liabilities**", null, null],
    ["Trade payables", null, payables],
    ["**Total capital and liabilities**", null, `**${fmt(closeCap + liab)}**`],
  ], { checks: [["ca", ca, sum([inventory, receivables, bank])], ["totals", ta, closeCap + liab], ["capital", openCap + extraCap + profit - drawings, closeCap]] });

  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: true, secs: 1260,
    concepts: ["acc.fundamentals.accounting-equation", "acc.fundamentals.key-terms", "acc.fundamentals.users"],
    stem: `Nyasha owns Nyasha Electricals, a shop in Harare selling electrical goods. Her business had the following assets and liabilities on 1 November 2025.\n\n${stim}\n\nHer transactions for November 2025 were:\n\n${tx.map((t) => `- ${t}`).join("\n")}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: openCap,
        stem: "Calculate Nyasha's capital on 1 November 2025.",
        wrong: [openAssets - open["Trade payables"], openAssets],
        explanation: `Assets: 6,400 + 5,150 + 1,320 + 2,480 = ${money(openAssets)}. Liabilities: 3,060 + 4,700 = ${money(openLiab)}. Capital = ${fmt(openAssets)} − ${fmt(openLiab)} = ${money(openCap)}.`,
      }),
      P.fib({
        label: "(b)", marks: 4,
        stem: "State the effect of the transactions of 12 November and 21 November on total assets and on capital.",
        template: "12 November: total assets {{blank:a1}}; capital {{blank:c1}}.\n\n21 November: total assets {{blank:a2}}; capital {{blank:c2}}.",
        blanks: [
          { id: "a1", accepted: ["No effect"], choices: EFFECT },
          { id: "c1", accepted: ["No effect"], choices: EFFECT },
          { id: "a2", accepted: ["Increase"], choices: EFFECT },
          { id: "c2", accepted: ["Increase"], choices: EFFECT },
        ],
        wrong: [["Increase", "Increase", "Increase", "No effect"]],
        explanation: "12 November: bank rises and trade receivables fall by the same US\\$1,000, so total assets and capital are unchanged. 21 November: bank and capital both rise by US\\$1,500.",
      }),
      P.mcq({
        label: "(c)",
        stem: "What was the effect of the sale on 8 November on capital?",
        options: [
          [`It increased capital by ${money(salePrice - saleCost)}`, "Correct: assets rose by 3,450 and fell by 2,300; the difference is profit, which belongs to the owner."],
          [`It increased capital by ${money(salePrice)}`, "Only the profit increases capital; the inventory given up reduces assets."],
          ["It had no effect on capital", "A sale at a profit increases capital by the profit."],
          [`It decreased capital by ${money(saleCost)}`, "The cost of the goods sold is matched by the higher amount receivable."],
        ],
        answer: "A",
        explanation: `Trade receivables +${fmt(salePrice)}, inventory −${fmt(saleCost)}: net assets and capital rise by the profit of ${money(salePrice - saleCost)}.`,
      }),
      P.num({
        label: "(d)", marks: 2, kind: "money", value: closeCap,
        stem: "Calculate Nyasha's capital on 30 November 2025.",
        wrong: [openCap + extraCap + (salePrice - saleCost) - drawings, openCap + profit - drawings],
        explanation: `Profit = 3,450 − 2,300 − rent 350 = ${money(profit)}. Capital = ${fmt(openCap)} + ${fmt(extraCap)} + ${fmt(profit)} − ${fmt(drawings)} = ${money(closeCap)}. Check: assets ${fmt(ta)} − liabilities ${fmt(liab)} = ${money(closeCap)}. Forgetting the rent gives ${money(openCap + extraCap + (salePrice - saleCost) - drawings)}.`,
      }),
      P.num({
        label: "(e)", marks: 2, kind: "money", value: nca_wc,
        stem: "Calculate the net current assets (working capital) on 30 November 2025.",
        wrong: [ca - payables - loan, ca],
        explanation: `Current assets: inventory ${fmt(inventory)} + trade receivables ${fmt(receivables)} + bank ${fmt(bank)} = ${money(ca)}. Net current assets = ${fmt(ca)} − trade payables ${fmt(payables)} = ${money(nca_wc)}. The loan is a non-current liability and is not deducted.`,
      }),
      P.manual({
        label: "(f)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Prepare Nyasha's statement of financial position at 30 November 2025.",
        points: [
          "Correct three-line heading: name, statement of financial position, at 30 November 2025.",
          `Fixtures ${money(fixtures)} as a non-current asset.`,
          `Current assets: inventory ${money(inventory)}, trade receivables ${money(receivables)}, bank ${money(bank)}; total ${money(ca)}.`,
          `Capital section: ${money(openCap)} + ${money(extraCap)} + profit ${money(profit)} − drawings ${money(drawings)} = ${money(closeCap)}.`,
          `Loan ${money(loan)} as a non-current liability and trade payables ${money(payables)} as a current liability.`,
          `Totals: assets ${money(ta)} = capital and liabilities ${money(closeCap + liab)}.`,
        ],
        modelAnswer: model,
      }),
      P.manual({
        label: "(g)", marks: 3,
        stem: `Nyasha plans to buy a delivery van costing ${money(6400)} in December by arranging a bank overdraft. Advise her whether she should do this. Justify your answer.`,
        points: [
          `Her bank balance is only ${money(bank)}, so almost all of the ${money(6400)} would be borrowed on a short-term overdraft (current liability), repayable on demand.`,
          "Net current assets would fall sharply / could become negative, so she might not pay suppliers on time; a van is a long-term asset better financed by a long-term loan or more capital.",
          "A justified recommendation: do not use an overdraft (use a loan or capital / delay the purchase), or buy only if receivables are collected first.",
        ].map((p) => p.replace(/US\$/g, "US\\$")),
        modelAnswer: `She should not use an overdraft. Her bank balance is only ${money(bank)}, so the overdraft would be about ${money(6400 - bank)}, repayable on demand. Her net current assets of ${money(nca_wc)} would fall to about ${money(nca_wc - 6400)}, leaving little to pay suppliers. A van lasts several years, so it should be financed long-term, for example by a loan or by introducing more capital, or she should wait until more receivables have paid.`,
      }),
    ],
    explanation: `Opening capital ${money(openCap)}; profit for November ${money(profit)}; closing capital ${money(closeCap)}; total assets ${money(ta)}; net current assets ${money(nca_wc)}.`,
    hints: ["Capital = assets − liabilities at each date.", "Only income and expenses change profit; capital introduced and drawings change capital directly.", "Long-term assets are best financed by long-term sources."],
  });
});
