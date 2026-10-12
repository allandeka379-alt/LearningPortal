// W1b: ledger.nca-disposal
import { concept, P, money, fmt, check, chk, r2, sum, rd, tAccount, table, journal, depreciation } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.ledger.nca-disposal", { file: "ledger/nca-disposal", keyPrefix: "ledger.nca-disposal" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which entry removes the **cost** of an asset that has been sold from the asset account?",
    right: ["Debit disposal account; credit asset at cost account", "Correct: the asset account is cleared of the cost of the asset sold."],
    wrong: [["Debit asset at cost account; credit disposal account", "This is the reverse and would increase the asset."], ["Debit provision for depreciation; credit asset at cost account", "The provision is cleared in a separate entry, credited to disposal."], ["Debit bank; credit asset at cost account", "Proceeds are credited to the disposal account, not the asset account."]],
    explanation: "Step 1: Dr disposal, Cr asset at cost with the cost of the asset sold.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the profit or loss on disposal of a non-current asset calculated?",
    right: ["Proceeds less carrying amount at the date of disposal", "Correct."],
    wrong: [["Proceeds less original cost of the asset", "This ignores the depreciation already charged."], ["Carrying amount less original cost of the asset", "Proceeds are left out."], ["Proceeds less the depreciation charged in the year of sale", "Only the total accumulated depreciation is relevant, and not on its own."]],
    explanation: "Carrying amount = cost less accumulated depreciation. Proceeds above it give a profit; below it, a loss.",
  });
  const m3 = { cost: 24000, acc: 15600, proc: 6900 };
  const m3nbv = m3.cost - m3.acc;
  const m3r = chk(m3nbv - m3.proc, 1500);
  mc(b, {
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A machine cost ${money(m3.cost)} and had accumulated depreciation of ${money(m3.acc)} when it was sold for ${money(m3.proc)}. What was the result on disposal?`,
    right: [`Loss of ${money(m3r)}`, "Correct: carrying amount 8,400, proceeds 6,900."],
    wrong: [[`Profit of ${money(m3r)}`, "Proceeds are below the carrying amount, so it is a loss."], [`Loss of ${money(m3.cost - m3.proc)}`, "This compares proceeds with cost and ignores depreciation."], [`Loss of ${money(m3.acc - m3.proc)}`, "This compares proceeds with the accumulated depreciation."]],
    hints: ["Find the carrying amount first."],
    explanation: "Carrying amount 24,000 − 15,600 = 8,400. Proceeds 6,900 − 8,400 = loss of 1,500.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Where is a profit on disposal of a non-current asset shown?",
    right: ["As other income in the statement of profit or loss", "Correct: it is not trading income."],
    wrong: [["As part of revenue, increasing gross profit", "Revenue is from the sale of goods or services in the ordinary course."], ["As a deduction from the cost of sales", "Cost of sales is for goods sold."], ["Directly in the statement of financial position as a reserve", "It reaches equity through the profit for the year."]],
    hints: ["Is the sale of a van part of the normal trading activity?"],
    explanation: "A profit on disposal is other income; a loss is an expense. Neither belongs in revenue or cost of sales.",
  });
  const m5 = { list: 52000, allow: 11500 };
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `Tendai trades in an old pump for a new one with a list price of ${money(m5.list)}. The supplier allows ${money(m5.allow)} for the old pump and Tendai pays the rest by bank transfer. At what amount is the new pump recorded in the asset account?`,
    right: [money(m5.list), "Correct: allowance 11,500 plus cash 40,500."],
    wrong: [[money(m5.list - m5.allow), "This is the cash paid only."], [money(m5.allow), "This is the allowance for the old pump."], [money(m5.list + m5.allow), "The allowance is part of the price, not an addition to it."]],
    hints: ["The new asset is recorded at its full cost."],
    explanation: "Debit the asset with 11,500 (credit disposal) and 40,500 (credit bank): 52,000 in total.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A business makes a loss on the disposal of a vehicle. What does this suggest about the depreciation charged in earlier years?",
    right: ["It was too low, so the carrying amount was higher than the value realised", "Correct: the loss corrects under-depreciation."],
    wrong: [["It was too high, so the carrying amount was lower than the value realised", "That would give a profit on disposal."], ["It was exactly right, so the loss was caused by the buyer", "With correct depreciation the result would be nil."], ["It was not charged in the year of sale", "The year-of-sale rule is a policy; it does not explain the loss."]],
    hints: ["Loss = proceeds below carrying amount."],
    explanation: "Proceeds below the carrying amount mean the asset was carried at too high a value, so earlier depreciation was too low.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Chipo sells a delivery truck on credit to Mr Dube. Which entry records the proceeds due from him?",
    right: ["Debit Mr Dube's account; credit disposal account", "Correct: the buyer owes the proceeds."],
    wrong: [["Debit bank; credit disposal account", "No cash has yet been received."], ["Debit disposal account; credit Mr Dube's account", "This would record the proceeds as owed by the business."], ["Debit Mr Dube's account; credit asset at cost account", "The credit for proceeds goes to the disposal account."]],
    hints: ["Who owes whom after a sale on credit?"],
    explanation: "Dr buyer (a receivable), Cr disposal with the proceeds. Bank is debited when he pays.",
  });
  const m8 = { cost: 38400, rate: 10 };
  const m8ann = (m8.cost * m8.rate) / 100;
  const m8dep = chk(m8ann * (2 + 3 / 12), 8640);
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `A sprayer was bought on 1 January 2023 for ${money(m8.cost)}. Depreciation is ${m8.rate}% per annum on cost, straight line, on a monthly basis. It was sold on 31 March 2025. What is the accumulated depreciation to be transferred to the disposal account?`,
    right: [money(m8dep), "Correct: 2 years at 3,840 plus 3 months at 320."],
    wrong: [[money(2 * m8ann), "This leaves out the three months of 2025."], [money(3 * m8ann), "This charges a full year for 2025."], [money(r2(m8dep + m8ann / 12)), "This charges four months of 2025, one month too many."]],
    hints: ["Months owned in 2025: January, February and March."],
    explanation: "Annual charge 3,840. 2023 and 2024: 7,680. 2025: 3/12 × 3,840 = 960. Total 8,640.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a part-exchange, the trade-in allowance given for the old asset is treated as the proceeds of the old asset.",
    answer: true,
    explanation: "True. Credit the disposal account with the allowance and debit the new asset account.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "When one van is sold, the whole balance on the provision for depreciation: vehicles account is transferred to the disposal account.",
    answer: false,
    hints: ["Are the other vehicles still owned?"],
    explanation: "False. Only the accumulated depreciation on the van sold is transferred; the other vehicles keep theirs.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item with its double entry.",
    pairs: [["Part-exchange allowance received for the old asset", "Debit new asset; credit disposal"], ["Accumulated depreciation on the asset sold", "Debit provision for depreciation; credit disposal"], ["A loss on disposal", "Debit statement of profit or loss; credit disposal"], ["A profit on disposal", "Debit disposal; credit statement of profit or loss"]],
    explanation: "A loss is a credit balancing figure in the disposal account, so the expense is debited to the statement of profit or loss; a profit is the opposite.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about a disposal.",
    template: "Profit on disposal = proceeds − {{blank:a}}. A loss on disposal is shown as an {{blank:b}} in the statement of profit or loss.",
    blanks: [
      { id: "a", accepted: ["carrying amount"], choices: ["carrying amount", "cost", "accumulated depreciation"] },
      { id: "b", accepted: ["expense"], choices: ["expense", "item of other income", "deduction from revenue"] },
    ],
    explanation: "The carrying amount is cost less accumulated depreciation; a loss is an expense.",
  });

  // --- Numerical / calculations
  const n1 = { cost: 56000, rate: 10, years: 4, proc: 31000 };
  const n1dep = (n1.cost * n1.rate / 100) * n1.years;
  const n1r = chk(n1.proc - (n1.cost - n1dep), -2600);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: Math.abs(n1r), wrong: [r2(n1.cost - n1.proc - 0), r2((n1.cost - n1.cost * n1.rate / 100 * 5) - n1.proc)],
    stem: `Sipho bought a milling machine on 1 January 2021 for ${money(n1.cost)}. Depreciation is ${n1.rate}% per annum on cost, with a full year's charge in the year of purchase and none in the year of sale. He sold the machine on 15 September 2025 for ${money(n1.proc)}. Calculate the loss on disposal.`,
    hints: ["Which years were charged? 2021 to 2024.", "Loss = carrying amount − proceeds."],
    explanation: "Depreciation 5,600 a year for 4 years = 22,400; carrying amount 33,600. Loss 33,600 − 31,000 = 2,600. Charging 2025 as well gives a carrying amount of 28,000 and a wrong result (a profit of 3,000).",
  });
  const n2 = { cost: 18600, rate: 20, proc: 9000 };
  const n2dep = chk(((n2.cost * n2.rate) / 100 / 12) * 26, 8060);
  const n2r = chk(n2.cost - n2dep - n2.proc, 1540);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: n2r, wrong: [r2(n2.cost - ((n2.cost * n2.rate) / 100 / 12) * 24 - n2.proc), r2(n2.cost - n2dep)],
    stem: `Nyasha bought a vending machine on 1 October 2023 for ${money(n2.cost)}. It is depreciated at 20% per annum on cost, straight line, on a monthly basis. She sold it on 30 November 2025 for ${money(n2.proc)}. Calculate the loss on disposal.`,
    hints: ["Count the months: October to December 2023, all of 2024, January to November 2025.", "Monthly charge = 18,600 × 20% ÷ 12."],
    explanation: "Monthly charge 310. Months: 3 + 12 + 11 = 26, so depreciation 8,060. Carrying amount 10,540; loss 10,540 − 9,000 = 1,540. Counting 24 months gives 2,160.",
  });
  const n3 = { price: 38500, allow: 14200 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true,
    value: r2(n3.price - n3.allow), wrong: [n3.price],
    stem: `A new refrigerated display costs ${money(n3.price)}. The supplier allows ${money(n3.allow)} for the old display in part-exchange. How much must be paid in cash?`,
    explanation: "38,500 − 14,200 = 24,300. The allowance covers part of the price.",
  });
  const n4 = { cost: 30000, rate: 20, years: 3, proc: 17000 };
  const n4rb = depreciation.reducingBalance(n4.cost, n4.rate, n4.years);
  const n4r = chk(n4.proc - n4rb[2].nbv, 1640);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: n4r, wrong: [r2(n4.proc - (n4.cost - (n4.cost * n4.rate) / 100 * 3)), n4rb[2].nbv - n4.proc],
    stem: `Farai bought a grinder for ${money(n4.cost)} and depreciated it at ${n4.rate}% per annum on the reducing balance for three full years. He then sold it for ${money(n4.proc)}. Calculate the profit on disposal.`,
    hints: ["Multiply by 80% each year to find the carrying amount."],
    explanation: "30,000 × 0.8 = 24,000; × 0.8 = 19,200; × 0.8 = 15,360. Profit 17,000 − 15,360 = 1,640. Straight line at 20% would give a carrying amount of 12,000.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the ledger account that is used to calculate the profit or loss when a non-current asset is sold.",
    accepted: ["disposal account", "disposal", "disposals account", "asset disposal account"],
    explanation: "The disposal account brings together cost, accumulated depreciation and proceeds.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a part-exchange of an old machine for a new one is recorded in the ledger.",
    points: ["The allowance is credited to the disposal account as the proceeds of the old machine", "The new machine is debited at its full cost (allowance plus cash paid)", "The cash paid is credited to bank (or the supplier's account if bought on credit)"],
    modelAnswer: "The trade-in allowance is treated as the proceeds of the old machine, so it is credited to the disposal account. The new machine is debited at its full cost, which is the allowance plus the cash paid, and the cash element is credited to bank.",
    hints: ["The new asset's cost is the full price."],
    explanation: "Three marks: allowance as proceeds, new asset at full cost, credit for the balance.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a profit on disposal of a van is not included in revenue.",
    points: ["Revenue arises from the sale of goods or services in the ordinary course of business", "The van is a non-current asset bought for use, not for resale", "The profit is a correction of depreciation (other income) and is shown separately in the statement of profit or loss"],
    modelAnswer: "Revenue comes from the business's normal trading. A van is held for use, not for resale, so its sale is not trading. The profit on disposal is a correction of earlier depreciation and is shown as other income.",
    hints: ["Why was the van bought?"],
    explanation: "Distinguish trading income from other income.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The owner of a tuck-shop chain sees a loss on disposal of US\\$3,000 on a refrigerator and says: \"We made a mistake buying that refrigerator.\" Evaluate this statement.",
    points: ["A loss means proceeds were below the carrying amount, so earlier depreciation was too low", "It is an adjustment to earlier profits, not necessarily a poor purchase", "The refrigerator may have earned good revenue during its life (compare total benefit with total cost)", "Conclusion: the statement is not justified by the loss alone; review the depreciation rate or useful life"],
    modelAnswer: "The loss shows that the refrigerator was carried at more than it realised, so too little depreciation was charged in earlier years. It does not prove a bad purchase because the refrigerator may have earned good revenue. The owner should review the depreciation rate and useful life rather than judge the purchase from the loss alone.",
    hints: ["What does a loss on disposal actually correct?"],
    explanation: "A balanced answer separates the accounting correction from the quality of the investment.",
  });

  // --- Practice structured 1 (12 marks): sale for cash
  const s1 = { cost0: 132000, prov0: 61800, tCost: 48000, tRate: 15, tYears: 4, proc: 15000 };
  const s1dep = chk((s1.tCost * s1.tRate / 100) * s1.tYears, 28800);
  const s1nbv = s1.tCost - s1dep;
  const s1r = chk(s1.proc - s1nbv, -4200);
  const s1charge = chk(((s1.cost0 - s1.tCost) * s1.tRate) / 100, 12600);
  const s1provClose = chk(s1.prov0 - s1dep + s1charge, 45600);
  const s1disp = tAccount("Disposal of truck account",
    [["10 Oct 2025", "Motor trucks at cost", s1.tCost]],
    [["10 Oct 2025", "Provision for depreciation", s1dep], ["10 Oct 2025", "Bank", s1.proc], ["31 Dec 2025", "Statement of profit or loss (loss)", Math.abs(s1r)]]);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chipo's hardware business in Chinhoyi owns delivery trucks. At 1 January 2025 the trucks had a total cost of ${money(s1.cost0)} and accumulated depreciation of ${money(s1.prov0)}. Trucks are depreciated at ${s1.tRate}% per annum on cost, with a full year's charge in the year of purchase and none in the year of sale. One truck, bought on 1 January 2021 for ${money(s1.tCost)}, was sold on 10 October 2025 for ${money(s1.proc)}, received by bank transfer. No trucks were bought in 2025. Her year end is 31 December.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1dep, wrong: [r2(s1dep + (s1.tCost * s1.tRate) / 100)], stem: "Calculate the accumulated depreciation on the truck sold.", explanation: `Charged for 2021, 2022, 2023 and 2024: 4 × ${fmt(s1.tCost * s1.tRate / 100)} = ${fmt(s1dep)}. None in 2025.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: Math.abs(s1r), wrong: [r2(s1.tCost - s1.proc)], stem: "Calculate the loss on disposal.", explanation: `Carrying amount ${fmt(s1.tCost)} − ${fmt(s1dep)} = ${fmt(s1nbv)}; loss ${fmt(s1nbv)} − ${fmt(s1.proc)} = ${fmt(Math.abs(s1r))}.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the disposal of truck account.", points: [`Debit: trucks at cost ${fmt(s1.tCost)}`, `Credit: provision for depreciation ${fmt(s1dep)}`, `Credit: bank ${fmt(s1.proc)}`, `Credit: statement of profit or loss (loss) ${fmt(Math.abs(s1r))}, with totals of ${fmt(s1.tCost)}`], modelAnswer: s1disp, explanation: "The loss is the credit balancing figure." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s1charge, wrong: [r2((s1.cost0 * s1.tRate) / 100)], stem: "Calculate the depreciation charge on trucks for 2025.", explanation: `No charge on the truck sold: 15% × (${fmt(s1.cost0)} − ${fmt(s1.tCost)}) = ${fmt(s1charge)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: s1provClose, wrong: [r2(s1.prov0 + s1charge)], stem: "Calculate the accumulated depreciation on trucks at 31 December 2025.", explanation: `${fmt(s1.prov0)} − ${fmt(s1dep)} + ${fmt(s1charge)} = ${fmt(s1provClose)}.` }),
    ],
    hints: ["Remove the sold truck's cost and its own depreciation from the totals.", "A loss is the credit balancing figure."],
    explanation: "This item practises a disposal for cash and the effect on the provision and the year's charge.",
  });

  // --- Practice structured 2 (10 marks): credit sale and credit purchase
  const s2 = { cost: 60000, dep: 41250, proc: 16000, newCost: 75000 };
  const s2r = chk(s2.proc - (s2.cost - s2.dep), -2750);
  const s2j = journal([
    { date: "30 Jun", lines: [["Disposal of printing press", s2.cost, null], ["Printing presses at cost", null, s2.cost]], narrative: "Cost of the press sold" },
    { date: "30 Jun", lines: [["Provision for depreciation: printing presses", s2.dep, null], ["Disposal of printing press", null, s2.dep]], narrative: "Depreciation on the press sold" },
    { date: "30 Jun", lines: [["Mr Dube (other receivable)", s2.proc, null], ["Disposal of printing press", null, s2.proc]], narrative: "Proceeds due from Mr Dube" },
    { date: "30 Jun", lines: [["Printing presses at cost", s2.newCost, null], ["PrintTech (other payable)", null, s2.newCost]], narrative: "New press bought on credit" },
    { date: "31 Dec", lines: [["Statement of profit or loss", Math.abs(s2r), null], ["Disposal of printing press", null, Math.abs(s2r)]], narrative: "Loss on disposal of the press" },
  ]);
  b.struct({
    d: 5, skill: "APPLICATION", calculator: true,
    stem: `Thandeka runs a printing business in Gweru. On 30 June 2025 she sold a printing press that had cost ${money(s2.cost)} and had accumulated depreciation of ${money(s2.dep)} to Mr Dube for ${money(s2.proc)}, payable in 60 days. On the same day she bought a new press for ${money(s2.newCost)} on credit from PrintTech.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: Math.abs(s2r), wrong: [r2(s2.cost - s2.proc)], stem: "Calculate the loss on disposal of the old press.", explanation: "Carrying amount 60,000 − 41,250 = 18,750; loss 18,750 − 16,000 = 2,750." }),
      P.manual({ label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entries to record the disposal, the purchase of the new press and the transfer of the loss. Narratives are required.", points: ["Dr Disposal 60,000, Cr Printing presses at cost 60,000", "Dr Provision for depreciation 41,250, Cr Disposal 41,250", "Dr Mr Dube 16,000, Cr Disposal 16,000", "Dr Printing presses 75,000, Cr PrintTech 75,000", "Dr Statement of profit or loss 2,750, Cr Disposal 2,750", "Dates and narratives"], modelAnswer: s2j, explanation: "The sale and the purchase are both on credit, so no bank entry is made." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Where is the result on disposal shown in the statement of profit or loss?", options: [["As an expense", "Correct: a loss is an expense."], ["As part of revenue", "A loss cannot be revenue."], ["As part of cost of sales", "Cost of sales is for goods sold."], ["It is not shown there", "Both profits and losses on disposal are shown."]], answer: "A", explanation: "A loss on disposal is an expense; a profit is other income." }),
      P.manual({ label: "(d)", marks: 1, stem: "State when the bank account will be affected by the sale.", points: ["When Mr Dube pays (debit bank, credit Mr Dube)"], modelAnswer: "When Mr Dube pays the US\\$16,000 in 60 days.", explanation: "Bank is debited on receipt." }),
    ],
    hints: ["The buyer owes the proceeds; the supplier is owed the price of the new press.", "A loss is a credit balancing figure on the disposal account."],
    explanation: "This item practises journal entries for a disposal where both the sale and the purchase are on credit.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Disposal account", "A ledger account that brings together the cost, accumulated depreciation and proceeds of an asset sold; its balance is the profit or loss on disposal.");
  b.card("FORMULA", "Profit or loss on disposal", "Proceeds − carrying amount at the date of disposal.");
  b.card("FACT", "Disposal account debit side", "Cost of the asset sold; a profit as the balancing figure.");
  b.card("FACT", "Disposal account credit side", "Accumulated depreciation on that asset; proceeds (bank, buyer or part-exchange allowance); a loss as the balancing figure.");
  b.card("FACT", "Part-exchange entries", "Dr new asset with the allowance, Cr disposal; Dr new asset with the cash paid, Cr bank. The new asset is at full cost.");
  b.card("CONCEPT", "What does a profit on disposal mean?", "Earlier depreciation was too high (carrying amount below the proceeds). A loss means it was too low.");
  b.card("FACT", "Sold on credit", "Dr buyer's account (receivable), Cr disposal. Bank is debited when the buyer pays.");
  b.card("FACT", "Where does the result appear?", "Profit: other income. Loss: expense. Neither is in revenue or cost of sales.");
  b.card("CONCEPT", "Which depreciation is transferred?", "Only the accumulated depreciation on the asset sold, up to the date of sale as the policy requires.");
});
