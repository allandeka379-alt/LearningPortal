// W3a: disposal of non-current assets (disposal account, profit or loss, part-exchange).
import { concept, P, money, check, sum, r2, tAccount, journal } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.disposal", { file: "adjustments/disposal", keyPrefix: "adjustments.disposal" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which entry transfers the **cost** of an asset sold to the disposal account?",
    options: [
      ["Debit disposal; credit the asset account", "Correct: the asset account is cleared of the cost."],
      ["Debit the asset account; credit disposal", "This is the reverse entry."],
      ["Debit disposal; credit provision for depreciation", "Depreciation is transferred the other way: debit provision, credit disposal."],
      ["Debit bank; credit the asset account", "Proceeds are credited to the disposal account, not the asset account."],
    ],
    answer: "A",
    explanation: "Step 1 of a disposal: debit disposal, credit the asset account with the cost.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "On the disposal account, which side records the accumulated depreciation on the asset sold?",
    options: [
      ["The credit side", "Correct: debit provision for depreciation, credit disposal."],
      ["The debit side", "The cost is on the debit side; depreciation reduces it from the credit side."],
      ["It is not recorded in the disposal account", "It must be transferred to find the net book value."],
      ["Either side, depending on whether there is a profit", "The side is fixed; only the balancing figure depends on profit or loss."],
    ],
    answer: "A",
    explanation: "Cost on the debit side, less depreciation and proceeds on the credit side; the difference is the profit or loss.",
  });
  const p1 = { cost: 13500, acc: 8640, proc: 5400 };
  const p1r = r2(p1.proc - (p1.cost - p1.acc));
  b.mcq({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A computer system cost US\\$13,500. Accumulated depreciation at the date of sale was US\\$8,640. It was sold for US\\$5,400. What is the result on disposal?",
    options: [
      [`Profit of ${money(p1r)}`, "Correct: 5,400 − (13,500 − 8,640) = 540."],
      [`Loss of ${money(p1r)}`, "Proceeds are above net book value, so it is a profit."],
      [`Loss of ${money(r2(p1.cost - p1.proc))}`, "This compares proceeds with cost and ignores depreciation."],
      [`Profit of ${money(r2(p1.acc - p1.proc))}`, "This compares proceeds with the depreciation, not the net book value."],
    ],
    answer: "A",
    explanation: `Net book value 13,500 − 8,640 = 4,860. Proceeds 5,400 − 4,860 = profit ${f(p1r)}.`,
  });
  check("p1r", p1r, 540);
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Where is a **loss** on disposal of a non-current asset shown?",
    options: [
      ["As an expense in the income statement", "Correct."],
      ["Added to gross profit as other income", "That is where a profit on disposal goes."],
      ["Deducted from capital in the statement of financial position", "It reaches capital only through the profit for the year."],
      ["As a current liability", "Nothing is owed."],
    ],
    answer: "A",
    explanation: "A loss on disposal is an expense; a profit on disposal is other income.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo trades in an old delivery bike for a new one costing US\\$4,800. The dealer allows US\\$1,150 for the old bike and Rudo pays the balance by bank transfer. At what amount is the **new** bike debited to the motorcycles account in total?",
    options: [
      [money(4800), "Correct: allowance 1,150 + cash 3,650 = full cost."],
      [money(3650), "This is only the cash paid."],
      [money(1150), "This is the allowance for the old bike."],
      [money(5950), "The allowance is part of the price, not an extra cost."],
    ],
    answer: "A",
    hints: ["The new asset is recorded at its full cost."],
    explanation: "Debit motorcycles 1,150 (credit disposal) and 3,650 (credit bank): total 4,800.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business makes a large profit on disposal of a machine. What does this most likely show?",
    options: [
      ["Too much depreciation was charged on the machine in earlier years", "Correct: the net book value had fallen below what the machine was worth."],
      ["The machine was bought at too low a price", "The purchase price does not explain the gap between proceeds and net book value."],
      ["The business's trading activities were very profitable", "Disposal profit is not trading profit."],
      ["The machine should not have been depreciated at all", "All machines wear out; the rate was probably too high."],
    ],
    answer: "A",
    hints: ["Profit on disposal = proceeds − net book value."],
    explanation: "A profit on disposal corrects over-depreciation in earlier years; a loss corrects under-depreciation.",
  });
  const p2 = { cost: 20000, rate: 25, years: 2 };
  let nb = p2.cost;
  for (let i = 0; i < p2.years; i += 1) nb = r2(nb - (nb * p2.rate) / 100);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A van bought for US\\$20,000 was depreciated at 25% per annum on the reducing balance for two full years and then sold for US\\$10,600. What was the result on disposal?",
    options: [
      [`Loss of ${money(r2(nb - 10600))}`, "Correct: NBV 11,250, proceeds 10,600."],
      [`Profit of ${money(r2(10600 - 10000))}`, "This uses straight-line depreciation (25% of cost each year)."],
      [`Loss of ${money(r2(20000 - 10600))}`, "This ignores depreciation."],
      [`Profit of ${money(r2(nb - 10600))}`, "Proceeds are below net book value: a loss."],
    ],
    answer: "A",
    hints: ["Work out the net book value year by year."],
    explanation: `Year 1: 20,000 − 5,000 = 15,000. Year 2: 15,000 − 3,750 = 11,250. Loss 11,250 − 10,600 = ${f(r2(nb - 10600))}.`,
  });
  check("nb", nb, 11250);

  b.tf({
    d: 1, skill: "RECALL",
    stem: "After a disposal has been recorded, the disposal account has no balance to carry forward.",
    answer: true,
    explanation: "True. The balancing figure (profit or loss) is transferred to the income statement, closing the account.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a part-exchange, the trade-in allowance for the old asset is treated as its sale proceeds.",
    answer: true,
    explanation: "True. Debit the asset account (new asset) and credit the disposal account with the allowance.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Gift sells a delivery van. Match each disposal-account entry with its double entry.",
    pairs: [["Cost of the van", "Dr Disposal, Cr Motor vans"], ["Depreciation on the van to date", "Dr Provision for depreciation, Cr Disposal"], ["Cash received from the buyer", "Dr Bank, Cr Disposal"], ["Profit on disposal", "Dr Disposal, Cr Income statement"]],
    explanation: "Cost in, depreciation and proceeds out; the balancing figure goes to the income statement.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements.",
    template: "Profit or loss on disposal = proceeds − {{blank:a}}. A {{blank:b}} on disposal is a debit balancing figure on the disposal account.",
    blanks: [
      { id: "a", accepted: ["net book value"], choices: ["net book value", "cost", "accumulated depreciation"] },
      { id: "b", accepted: ["profit"], choices: ["profit", "loss"] },
    ],
    explanation: "When proceeds exceed net book value the credits exceed the debits, so the profit is the debit balancing figure.",
  });

  const c1 = { cost: 38400, rate: 12.5, bought: "1 January 2021", soldMonths: 0, years: 4, proc: 19750 };
  const c1Acc = r2(((c1.cost * c1.rate) / 100) * c1.years);
  const c1R = r2(c1.proc - (c1.cost - c1Acc));
  b.calc({
    d: 3, kind: "money", value: Math.abs(c1R), calculator: true, wrong: [r2(c1.cost - c1.proc), r2(Math.abs(c1.proc - (c1.cost - ((c1.cost * c1.rate) / 100) * 5)))],
    stem: "Farai bought a cold-room on 1 January 2021 for US\\$38,400. It is depreciated at 12.5% per annum on cost, with a full year's charge in the year of purchase and none in the year of sale. He sold it on 1 March 2025 for US\\$19,750. Calculate the profit on disposal.",
    hints: ["Which years were charged? 2021 to 2024.", "Net book value = cost − accumulated depreciation."],
    explanation: `Depreciation 12.5% × 38,400 = 4,800 a year for 4 years = ${f(c1Acc)}. NBV 38,400 − 19,200 = 19,200. Profit 19,750 − 19,200 = ${f(c1R)}. Comparing proceeds with cost gives 18,650; charging five years (including 2025) gives 5,350.`,
  });
  check("c1R", c1R, 550);

  const c2 = { cost: 9600, pm: 5, rate: 20, from: 2023, proc: 5700 };
  // bought 1 Aug 2023, monthly basis 20% on cost; sold 31 May 2025
  const c2Acc = r2(((c2.cost * c2.rate) / 100) * (5 / 12 + 1 + 5 / 12));
  const c2R = r2(c2.proc - (c2.cost - c2Acc));
  b.calc({
    d: 4, kind: "money", value: Math.abs(c2R), calculator: true, wrong: [r2(Math.abs(c2.proc - (c2.cost - ((c2.cost * c2.rate) / 100) * 2)))],
    stem: "Chipo bought a photocopier for her stationery shop on 1 August 2023 for US\\$7,200 plus installation of US\\$2,400. Depreciation is 20% per annum on cost, on a monthly basis. She sold the photocopier on 31 May 2025 for US\\$5,700. Calculate the loss on disposal.",
    hints: ["Installation is part of the cost.", "Count the months owned: August 2023 to May 2025."],
    explanation: `Cost 7,200 + 2,400 = 9,600. Annual depreciation 20% × 9,600 = 1,920. Months owned: 5 (2023) + 12 (2024) + 5 (2025) = 22, so depreciation 1,920 × 22/12 = ${f(c2Acc)}. NBV 9,600 − ${f(c2Acc)} = ${f(r2(c2.cost - c2Acc))}. Loss ${f(r2(c2.cost - c2Acc))} − 5,700 = ${f(Math.abs(c2R))}. Charging two full years gives a loss of 60.`,
  });
  check("c2R", c2R, -380);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a profit on the disposal of a non-current asset is not part of the business's trading profit.",
    points: ["It does not arise from buying and selling goods / normal trading activities", "It is an adjustment for over-depreciation in earlier years, so it is shown as other income below gross profit"],
    modelAnswer: "Selling a used asset is not the business's trade; the profit only shows that earlier depreciation was too high, so it is added as other income, not included in gross profit.",
    explanation: "Disposal profits correct earlier depreciation.",
  });

  // Practice structured 1: sale for cash with full ledger
  const s = { cost0: 76000, prov0: 31200, vanCost: 18000, vanAcc: 10800, proc: 6500, rate: 20 };
  const charge = r2(((s.cost0 - s.vanCost) * s.rate) / 100);
  const res = r2(s.proc - (s.vanCost - s.vanAcc));
  check("res", res, -700);
  check("charge", charge, 11600);
  const vehMd = tAccount("Motor vehicles account", [["1 Jan 2025", "Balance b/d", s.cost0]], [["1 May 2025", "Disposal", s.vanCost]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
  const provMd = tAccount("Provision for depreciation: motor vehicles account", [["1 May 2025", "Disposal", s.vanAcc]], [["1 Jan 2025", "Balance b/d", s.prov0], ["31 Dec 2025", "Income statement", charge]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
  const dispMd = tAccount("Disposal of motor vehicle account", [["1 May 2025", "Motor vehicles", s.vanCost]], [["1 May 2025", "Provision for depreciation", s.vanAcc], ["1 May 2025", "Bank", s.proc], ["31 Dec 2025", "Income statement (loss)", Math.abs(res)]]);
  const provClose = r2(s.prov0 - s.vanAcc + charge);
  check("provClose", provClose, 32000);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Tatenda runs a transport business in Masvingo. His year end is 31 December. On 1 January 2025 his books showed:\n\n" +
      table(["Account", U], [["Motor vehicles at cost", s.cost0], ["Provision for depreciation: motor vehicles", s.prov0]]) +
      "\n\nOn 1 May 2025 he sold a van that had cost US\\$18,000 and on which depreciation of US\\$10,800 had been charged. He received US\\$6,500 by bank transfer. Vehicles are depreciated at 20% per annum on cost, with a full year's charge in the year of purchase and none in the year of sale. No vehicles were bought in 2025.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: Math.abs(res), wrong: [r2(s.vanCost - s.proc)], stem: "Calculate the loss on disposal of the van.", explanation: "NBV 18,000 − 10,800 = 7,200; loss 7,200 − 6,500 = 700." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: charge, wrong: [r2(s.cost0 * 0.2)], stem: "Calculate the depreciation on motor vehicles for 2025.", explanation: "20% × (76,000 − 18,000) = 11,600 (no charge on the van sold in the year of sale)." }),
      P.manual({ label: "(c)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the disposal of motor vehicle account.", points: ["Debit: Motor vehicles 18,000", "Credit: Provision for depreciation 10,800 and Bank 6,500", "Credit: Income statement (loss) 700; totals 18,000"], modelAnswer: dispMd, explanation: "The loss is the credit balancing figure." }),
      P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the provision for depreciation: motor vehicles account for 2025.", points: ["Credit: Balance b/d 31,200 and Income statement 11,600 (own figure)", "Debit: Disposal 10,800", "Balance c/d 32,000 with totals 42,800 and balance b/d on 1 January 2026"], modelAnswer: provMd, explanation: "Remove the sold van's depreciation; add the year's charge." }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: r2(s.cost0 - s.vanCost - provClose), wrong: [r2(s.cost0 - provClose)], stem: "Calculate the net book value of motor vehicles at 31 December 2025.", explanation: `Cost 76,000 − 18,000 = 58,000; provision 31,200 − 10,800 + 11,600 = 32,000; NBV ${f(r2(s.cost0 - s.vanCost - provClose))}.` }),
    ],
    hints: ["Remove both the cost and the depreciation of the van sold.", "Depreciation for 2025 is on the vehicles still owned."],
    explanation: `Motor vehicles account for reference:\n\n${vehMd}`,
  });

  // Practice structured 2: part-exchange, journal
  const q = { cost: 26000, acc: 15600, allow: 9000, newCost: 34500 };
  const qRes = r2(q.allow - (q.cost - q.acc));
  check("qRes", qRes, -1400);
  const jMd = journal([
    { date: "1 Oct 2025", lines: [["Disposal of machinery", q.cost, null], ["Machinery", null, q.cost]], narrative: "Cost of the old machine transferred" },
    { date: "1 Oct 2025", lines: [["Provision for depreciation: machinery", q.acc, null], ["Disposal of machinery", null, q.acc]], narrative: "Depreciation on the old machine transferred" },
    { date: "1 Oct 2025", lines: [["Machinery", q.newCost, null], ["Disposal of machinery", null, q.allow], ["Bank", null, r2(q.newCost - q.allow)]], narrative: "New machine bought; old machine part-exchanged" },
    { date: "31 Dec 2025", lines: [["Income statement", Math.abs(qRes), null], ["Disposal of machinery", null, Math.abs(qRes)]], narrative: "Loss on disposal of machinery" },
  ]);
  b.struct({
    d: 5, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Thandeka runs a block-making business in Chinhoyi. On 1 October 2025 she traded in a block-moulding machine that had cost US\\$26,000 and had accumulated depreciation of US\\$15,600 at that date. The supplier gave a trade-in allowance of US\\$9,000 against a new machine costing US\\$34,500. Thandeka paid the balance by bank transfer.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: r2(q.cost - q.acc), stem: "Calculate the net book value of the old machine at 1 October 2025.", explanation: "26,000 − 15,600 = 10,400." }),
      P.num({ label: "(b)", marks: 1, kind: "money", value: r2(q.newCost - q.allow), wrong: [q.newCost], stem: "Calculate the amount paid by bank transfer.", explanation: "34,500 − 9,000 = 25,500." }),
      P.mcq({ label: "(c)", stem: "What is the result on disposal of the old machine?", options: [[`Loss of ${money(1400)}`, "Correct: 9,000 − 10,400."], [`Profit of ${money(1400)}`, "The allowance is below net book value."], [`Loss of ${money(17000)}`, "This compares the allowance with cost."], [`Profit of ${money(6600)}`, "This compares the allowance with depreciation."]], answer: "A", explanation: "Allowance 9,000 − NBV 10,400 = loss of 1,400." }),
      P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entries to record the disposal and the purchase. Narratives are required.", points: ["Dr Disposal 26,000, Cr Machinery 26,000", "Dr Provision for depreciation 15,600, Cr Disposal 15,600", "Dr Machinery 34,500", "Cr Disposal 9,000 and Cr Bank 25,500", "Dr Income statement 1,400, Cr Disposal 1,400", "Dates and narratives"], modelAnswer: jMd, explanation: "The new machine is recorded at its full cost." }),
      P.manual({ label: "(e)", marks: 2, stem: "Suggest **two** reasons why Thandeka made a loss on disposal.", points: ["Depreciation charged was too low for the machine's real fall in value", "The trade-in allowance was low / the machine was in poor condition or obsolete"], modelAnswer: "The depreciation rate was too low, so the net book value was above the real value; or the supplier gave a low allowance because the machine was worn or out of date.", explanation: "A loss shows under-depreciation or a poor price." }),
    ],
    hints: ["Treat the allowance as the proceeds.", "The new machine's cost includes the allowance."],
    explanation: "This item practises a part-exchange and the journal entries for a disposal.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the temporary account used to calculate the profit or loss when a non-current asset is sold.",
    accepted: ["disposal account", "disposal", "asset disposal account", "disposals account"],
    explanation: "The disposal account collects the cost, depreciation and proceeds.",
  });

  b.card("FORMULA", "Profit or loss on disposal", "Proceeds − net book value at the date of disposal.");
  b.card("FACT", "Disposal account: debit side", "Cost of the asset (from the asset account); a profit as the balancing figure.");
  b.card("FACT", "Disposal account: credit side", "Accumulated depreciation; proceeds (bank, cash or part-exchange allowance); a loss as the balancing figure.");
  b.card("FACT", "Part-exchange entries", "Dr Asset (new) with allowance, Cr Disposal; Dr Asset with cash paid, Cr Bank.");
  b.card("CONCEPT", "What does a profit on disposal mean?", "Earlier depreciation was too high; a loss means it was too low.");
  b.card("FACT", "Where does a profit or loss on disposal go?", "Income statement: profit as other income; loss as an expense.");
  b.card("DEFINITION", "Disposal", "Removing a non-current asset by sale, part-exchange or scrapping.");
  b.card("FACT", "Year of disposal", "Charge depreciation up to the disposal date only if the policy requires it (e.g. monthly basis).");
});
