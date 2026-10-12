// W2b: manufacturing.profit-unrealised
import { concept, P, money, fmt, chk, r2, sum } from "../lib.mjs";
import { mc, U, transfer } from "../tables/w2b-lib.mjs";

concept("aacc.manufacturing.profit-unrealised", { file: "manufacturing/profit-unrealised", keyPrefix: "manufacturing.profit-unrealised" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is manufacturing (factory) profit?",
    right: ["Market value of goods transferred less their cost of production", "Correct: it measures how much cheaper the factory is than the market."],
    wrong: [["The difference between sales and the cost of sales of finished goods", "That is gross profit, found in the trading account."], ["The profit made on raw materials that the factory resells", "Materials that are resold are not part of the factory profit."], ["The profit of the whole business before tax is deducted", "That is the profit for the year."]],
    explanation: "Manufacturing profit = transfer value − cost of production.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Goods are transferred from the factory to the trading account at cost of production. What is the effect?",
    right: ["No manufacturing profit and no provision", "Correct: the transfer value equals the cost."],
    wrong: [["There is a manufacturing profit but no provision is needed", "Without a mark-up there is no profit to provide for."], ["There is a provision but no manufacturing profit", "A provision only arises when there is an unrealised profit."], ["The trading account must not be prepared", "The trading account is still prepared."]],
    explanation: "A transfer at cost leaves no profit in the transferred goods.",
  });
  const q3 = { cop: 75000, tv: 93750 };
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `Goods with a cost of production of ${money(q3.cop)} are transferred to the trading account at a market value of ${money(q3.tv)}. What is the manufacturing profit?`,
    right: [money(q3.tv - q3.cop), "Correct: 93,750 − 75,000."],
    wrong: [[money(q3.tv), "This is the transfer value, not the profit."], [money(q3.cop), "This is the cost of production."], [money(q3.tv + q3.cop), "The cost must be deducted, not added."]],
    hints: ["Subtract cost from transfer value."],
    explanation: "Manufacturing profit = 93,750 − 75,000 = 18,750, a 25% mark-up on cost.",
  });
  const q4 = { inv: 60000 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Goods are transferred at cost plus a mark-up of 25%. Closing finished goods at transfer price are ${money(q4.inv)}. What is the provision for unrealised profit?`,
    right: [money(12000), "Correct: 60,000 × 25/125 = 12,000."],
    wrong: [[money(15000), "This uses 25% of the transfer price instead of 25/125."], [money(q4.inv * 0.8), "This is the cost of the closing inventory."], [money(q4.inv * 0.25 / 2), "This halves the percentage without justification."]],
    hints: ["The inventory already includes the mark-up."],
    explanation: "Profit in the inventory = 60,000 × 25 ÷ (100 + 25) = 12,000 (the cost is 48,000).",
  });
  const q5 = { inv: 36000 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Goods are transferred at cost plus 20%. Closing finished goods at transfer price are ${money(q5.inv)}. At what amount are they shown in the statement of financial position?`,
    right: [money(30000), "Correct: 36,000 less the provision of 6,000 = cost of 30,000."],
    wrong: [[money(q5.inv), "This ignores the provision for unrealised profit."], [money(q5.inv - 7200), "This deducts 20% of the transfer price instead of 20/120."], [money(q5.inv + 6000), "The provision is deducted, not added."]],
    hints: ["Find the provision with m ÷ (100 + m)."],
    explanation: "Provision 36,000 × 20/120 = 6,000, so inventory is shown at cost, 30,000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In a year the provision for unrealised profit falls because closing finished goods are lower than the opening figure. How is the decrease treated?",
    right: ["It is added to profit in the statement of profit or loss", "Correct: some profit previously held back has been realised."],
    wrong: [["It is deducted from profit in the statement of profit or loss", "A deduction is made for an increase."], ["It is added to the cost of production", "The provision adjusts profit, not cost."], ["It is ignored because the provision is a balance sheet item", "The change in the provision is a charge or credit to profit."]],
    hints: ["Is more or less profit being held back?"],
    explanation: "A decrease means that less unrealised profit remains, so profit is increased.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is a provision for unrealised profit created?",
    right: ["The closing inventory includes profit not yet earned", "Correct: prudence requires the profit to be removed until the goods are sold."],
    wrong: [["The factory has made a loss on the goods transferred", "A loss is not what the provision deals with."], ["Customers may return the goods and ask for refunds", "Returns are handled by returns inwards."], ["Inventory may lose value because of damage or theft", "Damage is covered by valuing at the lower of cost and net realisable value."]],
    hints: ["Think about when profit is earned."],
    explanation: "Profit is earned when goods are sold; the provision removes the profit in unsold goods.",
  });
  const q8 = transfer({ name: "x", cop: 0, markupPct: 25, sales: 0, fgOpen: 40000, fgClose: 55000, expenses: 0 });
  mc(b, {
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Goods are transferred at cost plus 25%. Finished goods at transfer price were ${money(40000)} at the start of the year and ${money(55000)} at the end. What is the effect of the provision for unrealised profit on profit for the year?`,
    right: [`Profit is reduced by ${money(q8.provChange)}`, "Correct: the provision rises from 8,000 to 11,000, an increase of 3,000."],
    wrong: [[`Profit is increased by ${money(q8.provChange)}`, "An increase in the provision reduces profit."], [`Profit is reduced by ${money(q8.provClose)}`, "Only the change in the provision is charged, not the full closing provision."], [`Profit is reduced by ${money(q8.provOpen)}`, "The opening provision was charged in an earlier year."]],
    hints: ["Find the opening and closing provisions."],
    explanation: "Opening 40,000 × 20% = 8,000; closing 55,000 × 20% = 11,000. The increase of 3,000 is deducted.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Only the change in the provision for unrealised profit is shown in the statement of profit or loss each year.",
    answer: true,
    explanation: "True. The provision is a balance carried forward; each year only the increase or decrease affects profit.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A transfer at market value means that the total profit of the business over its whole life is higher than if goods were transferred at cost.",
    answer: false,
    hints: ["Is the manufacturing profit realised before the goods are sold?"],
    explanation: "False. The method only splits the same profit between the factory and the shop; the provision prevents profit being counted early.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its meaning or treatment.",
    pairs: [["Manufacturing profit", "Transfer value less cost of production"], ["Unrealised profit", "Profit in transferred goods that are not yet sold"], ["Increase in the provision", "Deducted from profit for the year"], ["Closing finished goods in the statement of financial position", "Transfer price less the provision, which is cost"]],
    explanation: "These four ideas fit together: profit, what is unrealised, and how it is removed.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about the provision for unrealised profit.",
    template: "Closing finished goods are valued at {{blank:a}} price in the trading account. The provision is based on closing inventory, and an {{blank:b}} in the provision reduces profit. In the statement of financial position, inventory is shown at {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["transfer"], choices: ["transfer", "cost of production", "selling"] },
      { id: "b", accepted: ["increase"], choices: ["increase", "decrease"] },
      { id: "c", accepted: ["cost"], choices: ["cost", "transfer price", "selling price"] },
    ],
    explanation: "Transfer price in the trading account; an increase reduces profit; cost in the statement of financial position.",
  });

  // --- Numerical / calculations
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(96000 * 0.25, 24000), wrong: [96000 * 0.2, 96000, 96000 * 1.25],
    stem: "Goods with a cost of production of US\\$96,000 are transferred at cost plus 25%. Calculate the manufacturing profit.",
    hints: ["The mark-up is on cost."],
    explanation: "96,000 × 25% = 24,000. Transfer value 120,000.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(45500 * (30 / 130), 10500), wrong: [45500 * 0.3, 45500 * 0.7, 13650],
    stem: "Goods are transferred at cost plus 30%. Closing finished goods at transfer price are US\\$45,500. Calculate the provision for unrealised profit.",
    hints: ["Use m ÷ (100 + m)."],
    explanation: "45,500 × 30 ÷ 130 = 10,500.",
  });
  const n3 = { open: 8400, close: 11200 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", daily: true,
    value: chk(n3.close - n3.open, 2800), wrong: [n3.close, n3.open],
    stem: `The provision for unrealised profit was ${money(n3.open)} at the start of the year and is ${money(n3.close)} at the end. By how much is profit reduced?`,
    hints: ["Compare the closing provision with the opening one."],
    explanation: "11,200 − 8,400 = 2,800, the increase in the provision.",
  });
  const n4 = transfer({ name: "x", cop: 140000, markupPct: 25, sales: 245000, fgOpen: 30000, fgClose: 40000, expenses: 31000 });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: n4.net, wrong: [n4.gp - 31000, n4.gp + n4.profit - 31000],
    stem: `Cost of production ${money(140000)}; goods are transferred at cost plus 25%. Sales ${money(245000)}; opening finished goods at transfer price ${money(30000)}; closing ${money(40000)}; other expenses ${money(31000)}. Calculate the profit for the year after the provision adjustment.`,
    hints: ["Find the transfer value, the gross profit, the manufacturing profit and the change in the provision."],
    explanation: "Manufacturing profit 35,000; transfer value 175,000. Cost of sales 30,000 + 175,000 − 40,000 = 165,000. Gross profit 80,000. Provision opening 6,000, closing 8,000: increase 2,000. Profit 80,000 + 35,000 − 2,000 − 31,000 = 82,000.",
  });
  chk(n4.net, 82000);

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of profit that is included in unsold finished goods transferred from the factory at market value.",
    accepted: ["unrealised profit", "unrealised", "unrealised manufacturing profit"],
    explanation: "It is unrealised profit because it has not yet been earned by a sale.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a business might transfer goods from its factory at market value instead of at cost.",
    points: ["It allows the factory's cost to be compared with the price of buying the goods from outside", "The performance of the factory and the shop can be measured separately", "It helps decide whether to continue making the goods or to buy them"],
    modelAnswer: "Transferring at market value lets the owner compare the factory's cost with the market price, judge the factory and the shop separately, and decide whether to carry on manufacturing or to buy the goods.",
    hints: ["What does the manufacturing profit tell the owner?"],
    explanation: "One mark each for comparison, separate performance and the decision.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the provision for unrealised profit is needed and where it appears in the financial statements.",
    points: ["Closing inventory is valued at transfer price, which includes profit not yet earned", "Prudence: profit should be recognised only when the goods are sold", "The change in the provision goes through the statement of profit or loss and the provision is deducted from inventory in the statement of financial position"],
    modelAnswer: "Closing finished goods are at the transfer price, including profit not yet earned. Prudence says profit is earned on sale, so a provision removes it: the change goes through the statement of profit or loss and the provision is deducted from inventory in the statement of financial position.",
    hints: ["Think about when profit is earned."],
    explanation: "One mark each for the reason, prudence and the two places.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The manager of a factory says: \"We made a manufacturing profit of US\\$40,000, so our factory is efficient.\" Evaluate this statement.",
    points: ["A manufacturing profit shows the factory's cost is below the transfer price used", "The transfer price (mark-up) is chosen by management and may not equal the true market price", "Part of the profit is unrealised if goods are unsold", "Conclusion: it is evidence of efficiency only if the market value is reliable and compared with outside prices"],
    modelAnswer: "A manufacturing profit means the factory's cost is below the transfer price, but management chooses the mark-up, so it may not match the market price, and part of the profit is unrealised until goods are sold. It shows efficiency only if the market value is reliable.",
    hints: ["Who decides the transfer price?"],
    explanation: "A balanced answer questions the reliability of the transfer price and the unrealised element.",
  });

  // --- Practice structured 1 (12 marks)
  const s1 = transfer({ name: "Gweru Gates", cop: 84000, markupPct: 25, sales: 150000, fgOpen: 20000, fgClose: 30000, expenses: 18000 });
  chk(s1.profit, 21000); chk(s1.gp, 55000); chk(s1.provClose, 6000); chk(s1.provChange, 2000); chk(s1.net, 56000);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Gweru Gates makes metal gates. For the year ended 31 December 2025 the cost of production was ${money(84000)}. Goods are transferred to the trading account at cost plus 25%. Sales were ${money(150000)}. Finished goods at transfer price: opening ${money(20000)}, closing ${money(30000)}. The opening provision for unrealised profit is based on the same mark-up. Other expenses were ${money(18000)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1.profit, wrong: [s1.transferValue], stem: "Calculate the manufacturing profit.", explanation: "84,000 × 25% = 21,000; transfer value 105,000." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s1.gp, wrong: [s1.sales - s1.transferValue, 150000 - 95000 + 21000], stem: "Calculate the gross profit.", explanation: "Cost of sales 20,000 + 105,000 − 30,000 = 95,000. Gross profit 150,000 − 95,000 = 55,000." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s1.provClose, wrong: [7500, 30000 * 0.25], stem: "Calculate the provision for unrealised profit needed at 31 December 2025.", explanation: "30,000 × 25/125 = 6,000." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: s1.provChange, wrong: [s1.provClose], stem: "By how much does profit fall because of the change in the provision?", explanation: "Closing 6,000 − opening 4,000 = 2,000." }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the extract of the statement of profit or loss from gross profit to profit for the year.", points: ["Gross profit 55,000", "Add manufacturing profit 21,000", "Less increase in provision for unrealised profit 2,000", "Less other expenses 18,000 and profit for the year 56,000"], modelAnswer: s1.plMd, explanation: "55,000 + 21,000 − 2,000 − 18,000 = 56,000." }),
    ],
    hints: ["Value both inventories at transfer price.", "Provision = inventory × 25/125."],
    explanation: "This item practises manufacturing profit and an increase in the provision.",
  });

  // --- Practice structured 2 (16 marks): provision decreases
  const s2d = { cop: 126000, sales: 238000, fo: 49000, fc: 38500, exp: 31000 };
  const s2 = transfer({ name: "Mutare Cabinets", cop: s2d.cop, markupPct: 40, sales: s2d.sales, fgOpen: s2d.fo, fgClose: s2d.fc, expenses: s2d.exp });
  chk(s2.profit, 50400); chk(s2.transferValue, 176400); chk(s2.cos, 186900); chk(s2.gp, 51100); chk(s2.provOpen, 14000); chk(s2.provClose, 11000); chk(s2.provChange, -3000); chk(s2.net, 73500);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Mutare Cabinets makes cabinets. For the year ended 31 December 2025 the cost of production was ${money(s2d.cop)}. Goods are transferred to the trading account at cost plus 40%. Sales were ${money(s2d.sales)}. Finished goods at transfer price: opening ${money(s2d.fo)}, closing ${money(s2d.fc)}. The opening provision for unrealised profit is based on the same mark-up. Other expenses were ${money(s2d.exp)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s2.transferValue, wrong: [s2.profit, s2d.cop], stem: "Calculate the value of goods transferred to the trading account.", explanation: `${fmt(s2d.cop)} × 140% = ${fmt(s2.transferValue)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s2.cos, wrong: [s2d.fo + s2d.cop - s2d.fc, s2.transferValue], stem: "Calculate the cost of sales.", explanation: `${fmt(s2d.fo)} + ${fmt(s2.transferValue)} − ${fmt(s2d.fc)} = ${fmt(s2.cos)}.` }),
      P.group({ label: "(c)", stem: "Calculate the provision for unrealised profit", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: s2.provOpen, wrong: [r2(s2d.fo * 0.4), 19600], stem: "at 1 January 2025", explanation: `${fmt(s2d.fo)} × 40/140 = ${fmt(s2.provOpen)}.` }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: s2.provClose, wrong: [r2(s2d.fc * 0.4), 14000], stem: "at 31 December 2025", explanation: `${fmt(s2d.fc)} × 40/140 = ${fmt(s2.provClose)}.` }),
      ] }),
      P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the trading account and the statement of profit or loss extract from gross profit, showing the effect of the provision.", points: [`Cost of sales ${fmt(s2.cos)} and gross profit ${fmt(s2.gp)}`, `Manufacturing profit ${fmt(s2.profit)} added`, `Decrease in provision ${fmt(-s2.provChange)} added to profit`, `Other expenses ${fmt(s2d.exp)} deducted`, `Profit for the year ${fmt(s2.net)} (own figures if consistent)`], modelAnswer: `${s2.tradMd}\n\n${s2.plMd}`, explanation: `${fmt(s2.gp)} + ${fmt(s2.profit)} + ${fmt(-s2.provChange)} − ${fmt(s2d.exp)} = ${fmt(s2.net)}.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the provision has decreased and what this means for profit.", points: ["Closing finished goods at transfer price are lower than opening, so less unrealised profit remains", `The decrease of ${fmt(-s2.provChange)} is added to profit because profit held back earlier has been realised by sales`], modelAnswer: `Closing finished goods are lower than the opening figure, so less unrealised profit remains. The decrease of ${money(-s2.provChange)} is added to profit because profit held back earlier has now been realised.`, explanation: "One mark for the reason, one for the effect." }),
      P.manual({ label: "(f)", marks: 2, stem: "Suggest one reason why the manager should be careful about judging the factory by its manufacturing profit.", points: ["The mark-up of 40% is set by the business and may differ from real market prices", "Part of the profit depends on goods being sold; the factory's efficiency should be checked against outside prices"], modelAnswer: "The 40% mark-up is set by the business and may not equal the real market price, so the manufacturing profit should be checked against outside quotations.", explanation: "Any valid reason with explanation." }),
    ],
    hints: ["Provision = inventory at transfer price × 40/140.", "A decrease in the provision is added to profit."],
    explanation: "This item practises a decrease in the provision and its effect on profit.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Manufacturing profit", "Transfer value (market value) less cost of production; the profit of the factory.");
  b.card("DEFINITION", "Unrealised profit", "Manufacturing profit contained in transferred goods that have not yet been sold.");
  b.card("FORMULA", "Provision for unrealised profit", "Closing finished goods at transfer price × m ÷ (100 + m), where m is the mark-up on cost.");
  b.card("FACT", "Change in the provision", "An increase is deducted from profit; a decrease is added to profit.");
  b.card("FACT", "Statement of financial position", "Closing finished goods are shown at transfer price less the provision, which is cost.");
  b.card("CONCEPT", "Why transfer at market value", "To compare the factory's cost with outside prices and judge the factory and the shop separately.");
  b.card("CONCEPT", "Transfer at cost", "No manufacturing profit and no provision for unrealised profit.");
  b.card("FACT", "Cost of sales with transfers", "Opening finished goods + goods transferred at transfer price − closing finished goods at transfer price.");
  b.card("CONCEPT", "Why a provision", "Prudence: profit is earned on sale, not when goods are made.");
});
