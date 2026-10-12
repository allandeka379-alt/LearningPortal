// W1b: ledger.depreciation
import { concept, P, money, fmt, check, chk, r2, sum, rd, tAccount, table, depreciation } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.ledger.depreciation", { file: "ledger/depreciation", keyPrefix: "ledger.depreciation" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A bakery in Mutare replaces its card reader with a faster model although the old one still works. Which cause of depreciation does this describe?",
    right: ["Obsolescence", "Correct: newer technology makes the old asset out of date even though it works."],
    wrong: [["Wear and tear", "The reader has not been used up physically."], ["Depletion", "Depletion applies to natural resources that are extracted."], ["Passage of time", "No legal or fixed time limit is involved."]],
    explanation: "Obsolescence is loss of value because a newer, better or cheaper asset is available.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main accounting reason for charging depreciation?",
    right: ["To match part of the asset's cost with the revenue it helps to earn each year", "Correct: the matching concept."],
    wrong: [["To set cash aside so that the asset can be replaced", "Depreciation is a book entry; no cash is put aside."], ["To show the market value of the asset in the statement of financial position", "Carrying amount is cost less accumulated depreciation, not market value."], ["To reduce the amount of cash paid to the supplier", "The supplier is paid the purchase price regardless."]],
    explanation: "Depreciation spreads the depreciable amount over the periods that benefit, so profit is not overstated.",
  });
  const m3 = { cost: 15000, res: 3000, life: 4 };
  const m3a = chk((m3.cost - m3.res) / m3.life, 3000);
  mc(b, {
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A machine costs ${money(m3.cost)}, has an expected residual value of ${money(m3.res)} and a useful life of ${m3.life} years. What is the annual straight-line depreciation?`,
    right: [money(m3a), "Correct: (15,000 − 3,000) ÷ 4."],
    wrong: [[money(m3.cost / m3.life), "This ignores the residual value."], [money((m3.cost + m3.res) / m3.life), "The residual value is deducted, not added."], [money(m3.res / m3.life), "This divides the residual value instead of the depreciable amount."]],
    hints: ["Depreciable amount = cost − residual value."],
    explanation: "Annual charge = (15,000 − 3,000) ÷ 4 = 3,000.",
  });
  const m4 = { cost: 20000, rate: 30 };
  const m4rb = depreciation.reducingBalance(m4.cost, m4.rate, 2);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A van cost ${money(m4.cost)} and is depreciated at ${m4.rate}% per annum on the reducing balance. What is the charge for the second year?`,
    right: [money(m4rb[1].charge), "Correct: 30% × (20,000 − 6,000)."],
    wrong: [[money(m4rb[0].charge), "This is the first-year charge; the base falls in year 2."], [money(r2(m4rb[0].charge + m4rb[1].charge)), "This is the total depreciation after two years."], [money(m4rb[1].nbv), "This is the carrying amount at the end of year 2, not the charge."]],
    hints: ["Find the carrying amount at the start of year 2 first."],
    explanation: "Year 1: 30% × 20,000 = 6,000. Year 2: 30% × 14,000 = 4,200.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which double entry records the annual depreciation charge on a machine?",
    right: ["Debit depreciation expense; credit provision for depreciation", "Correct: the expense is recorded and the accumulated depreciation grows."],
    wrong: [["Debit provision for depreciation; credit depreciation expense", "This is the reverse and would reduce accumulated depreciation."], ["Debit machinery; credit depreciation expense", "The asset account stays at cost."], ["Debit depreciation expense; credit bank", "No cash is paid."]],
    explanation: "Each year: Dr depreciation expense, Cr provision for depreciation (accumulated depreciation).",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which asset is the reducing balance method most suited to?",
    right: ["A laptop fleet that loses most of its value in the first years", "Correct: the heaviest charge falls in the early years, matching the loss of value."],
    wrong: [["A freehold shop used evenly for decades", "A steady benefit suits straight line (and the land element is not depreciated)."], ["A shelving unit giving the same service every year", "Equal benefit each year suits straight line."], ["A five-year licence that expires on a fixed date", "A fixed-term right is normally written off evenly."]],
    hints: ["Match the pattern of the charge to the pattern of benefit."],
    explanation: "Reducing balance gives high early charges, so it suits assets that lose value quickly or become costly to repair.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "The depreciation charge for the year is increased by US\\$2,000 because a machine's expected life was shortened. What is the effect?",
    right: ["Profit for the year falls by US\\$2,000 and the carrying amount falls by US\\$2,000; cash is unchanged", "Correct."],
    wrong: [["Profit for the year falls by US\\$2,000 and the bank balance falls by US\\$2,000", "Depreciation is not a cash payment."], ["Profit for the year falls by US\\$2,000 and the carrying amount rises by US\\$2,000", "More depreciation lowers the carrying amount."], ["Profit for the year is unchanged but the carrying amount falls by US\\$2,000", "The charge is an expense of the year, so profit falls too."]],
    hints: ["Which account is debited and which account is credited?"],
    explanation: "Debit expense (lower profit); credit provision (lower carrying amount). Bank is not involved.",
  });
  const m8 = { price: 9400, delivery: 600, install: 1000, training: 800, insurance: 300 };
  const m8cost = m8.price + m8.delivery + m8.install;
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Nyasha buys a packing machine: price ${money(m8.price)}, delivery ${money(m8.delivery)}, installation ${money(m8.install)}, training for staff ${money(m8.training)} and the first year's insurance ${money(m8.insurance)}. On what amount is depreciation based (before any residual value)?`,
    right: [money(m8cost), "Correct: price, delivery and installation bring the machine into use."],
    wrong: [[money(m8.price), "Delivery and installation are part of the cost."], [money(m8cost + m8.training), "Training and insurance are revenue expenses, not part of the asset's cost."], [money(m8cost + m8.training + m8.insurance), "Neither training nor insurance is capitalised."]],
    hints: ["Which costs are needed to bring the asset into working condition?"],
    explanation: "Cost = 9,400 + 600 + 1,000 = 11,000. Training and insurance are charged to profit or loss.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Freehold land held for a shop is normally not depreciated, because its useful life is not limited.",
    answer: true,
    explanation: "True. Land does not wear out, so no depreciation is charged (buildings on it are depreciated).",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of depreciation to the example.",
    pairs: [["Wear and tear", "A lorry's tyres and engine are used on every trip"], ["Obsolescence", "A till is replaced by a model that scans faster"], ["Passage of time", "A ten-year lease on a shop runs down each year"], ["Depletion", "Stone is cut from a quarry until none is left"]],
    explanation: "Each cause links to a different reason for the fall in value: use, new technology, a time limit or removal of the resource.",
  });

  // --- Fill in the blank
  b.fib({
    d: 1, skill: "RECALL",
    stem: "Complete the straight-line formula and the entry.",
    template: "Annual charge = (cost − {{blank:a}}) ÷ useful life. The charge is debited to the {{blank:b}} account.",
    blanks: [
      { id: "a", accepted: ["residual value"], choices: ["residual value", "accumulated depreciation", "carrying amount"] },
      { id: "b", accepted: ["depreciation expense"], choices: ["depreciation expense", "provision for depreciation", "asset at cost"] },
    ],
    explanation: "Deduct the residual value first; the expense account is debited and the provision is credited.",
  });

  // --- Numerical
  const n1 = { cost: 46800, res: 4800, life: 7 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", calculator: true, 
    value: chk((n1.cost - n1.res) / n1.life, 6000), wrong: [rd(n1.cost / n1.life, 2)],
    stem: `Thandeka buys a cold-room for ${money(n1.cost)}. She expects to use it for ${n1.life} years and then sell it for ${money(n1.res)}. Calculate the annual straight-line depreciation.`,
    hints: ["Subtract the residual value before dividing."],
    explanation: "(46,800 − 4,800) ÷ 7 = 6,000. Dividing the cost alone gives 6,685.71.",
  });
  const n2 = { cost: 36000, rate: 20 };
  const n2rb = depreciation.reducingBalance(n2.cost, n2.rate, 3);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n2rb[2].charge, wrong: [n2rb[1].charge, r2(n2.cost * 0.2)],
    stem: `A tractor cost ${money(n2.cost)} and is depreciated at ${n2.rate}% per annum on the reducing balance. Calculate the depreciation charge for the third year.`,
    hints: ["Year 1 charge first, then the carrying amount, then year 2."],
    explanation: "Year 1: 7,200 (NBV 28,800). Year 2: 5,760 (NBV 23,040). Year 3: 20% × 23,040 = 4,608. Using cost each year gives 7,200.",
  });
  const n3 = { price: 14400, install: 1800, rate: 10, months: 4 };
  const n3v = chk(((n3.price + n3.install) * n3.rate) / 100 * (n3.months / 12), 540);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: n3v, wrong: [r2(((n3.price + n3.install) * n3.rate) / 100), r2((n3.price * n3.rate) / 100 * (n3.months / 12))],
    stem: `Sipho bought a printing press on 1 September 2025 for ${money(n3.price)} plus installation of ${money(n3.install)}. Depreciation is 10% per annum on cost, straight line, on a monthly basis. His year end is 31 December. Calculate the depreciation charge for 2025.`,
    hints: ["Cost includes installation.", "How many months did he own the press in 2025?"],
    explanation: "Cost 16,200 × 10% = 1,620 a year; 4/12 of that is 540. A full year gives 1,620; leaving out installation gives 480.",
  });
  const n4 = { cost: 32000, rate: 25 };
  const n4rb = depreciation.reducingBalance(n4.cost, n4.rate, 3);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n4rb[2].nbv, wrong: [r2(n4.cost - (n4.cost * n4.rate) / 100 * 3), n4rb[1].nbv],
    stem: `A generator cost ${money(n4.cost)} and is depreciated at ${n4.rate}% per annum on the reducing balance. Calculate its carrying amount after three years.`,
    hints: ["Multiply the carrying amount by 75% each year."],
    explanation: "32,000 × 0.75 = 24,000; × 0.75 = 18,000; × 0.75 = 13,500. Using 25% of cost each year would give 8,000.",
  });

  // --- Short answer
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which ledger account is credited with the depreciation charge each year? (Give the account name.)",
    accepted: ["provision for depreciation", "accumulated depreciation", "provision for depreciation account", "accumulated depreciation account", "provision for depreciation of the asset"],
    explanation: "Debit depreciation expense, credit provision for depreciation (accumulated depreciation).",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a business charges depreciation on its non-current assets.",
    points: ["Matching: the cost of the asset is set against the revenue it helps to earn", "Explained: the cost is spread over the years that benefit rather than charged in one year", "Prudence / fair profit: profit and the asset would be overstated without depreciation", "Explained: the carrying amount shown is cost less the part used up"],
    modelAnswer: "Depreciation applies the matching concept, so each year's profit bears part of the cost of an asset that helps to earn that year's revenue. It also respects prudence: without it, profit and the value of the asset in the statement of financial position would be overstated.",
    explanation: "Give the reason and then say what it achieves.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "A student says: \"Charging depreciation means the business is saving money to buy a new machine.\" Explain why this is wrong.",
    points: ["Depreciation is a book entry (debit expense, credit provision), not a payment", "No cash is set aside; the bank balance is unaffected", "It reduces profit and the carrying amount; replacement needs cash saved separately or borrowed"],
    modelAnswer: "Depreciation is only an accounting entry. It lowers profit and the carrying amount but does not move any cash into a fund, so the business must still find cash separately when it replaces the machine.",
    hints: ["What happens to the bank balance when depreciation is charged?"],
    explanation: "The common misconception is to treat the provision as a cash fund.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Rudo buys a motorbike for her delivery business in Chinhoyi. Repair costs usually rise as motorbikes age and the resale value falls fastest in the first two years. Advise her whether to use straight line or reducing balance depreciation. Justify your answer.",
    points: ["Recommends reducing balance", "Value falls fastest early, so a higher early charge matches the loss of value", "Repairs rise with age, so falling depreciation plus rising repairs gives a more level total cost each year", "Notes that the method must then be applied consistently"],
    modelAnswer: "Reducing balance is more suitable. The motorbike loses most value early, so a higher charge in the first years matches that loss. Repair costs rise as it ages, so a falling depreciation charge keeps the total cost of using the bike more even. Whichever method is chosen should then be used consistently.",
    hints: ["Think about the pattern of benefit and cost over the life of the asset."],
    explanation: "A balanced judgement links the pattern of loss of value and repairs to the method, and mentions consistency.",
  });

  // --- Practice structured 1 (12 marks): additions with monthly basis
  const s1 = { cost0: 84000, prov0: 29400, add: 21000, rate: 15 };
  const s1c = chk((s1.cost0 * s1.rate) / 100 + ((s1.add * s1.rate) / 100) * (6 / 12), 14175);
  const s1prov = s1.prov0 + s1c;
  const s1cost = s1.cost0 + s1.add;
  const s1nbv = s1cost - s1prov;
  check("s1nbv", s1nbv, 61425);
  const s1md = tAccount("Provision for depreciation: machinery", [], [["1 Jan 2025", "Balance b/d", s1.prov0], ["31 Dec 2025", "Statement of profit or loss", s1c]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Farai runs a welding workshop in Bulawayo. His year end is 31 December. At 1 January 2025 his machinery had cost ${money(s1.cost0)} and accumulated depreciation of ${money(s1.prov0)}. On 1 July 2025 he bought another machine for ${money(s1.add)}. Machinery is depreciated at ${s1.rate}% per annum on cost, straight line, on a monthly basis. There were no disposals.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: s1c, wrong: [r2((s1cost * s1.rate) / 100), r2((s1.cost0 * s1.rate) / 100)], stem: "Calculate the depreciation charge for 2025.", explanation: "Old machinery 15% × 84,000 = 12,600. New machine 15% × 21,000 × 6/12 = 1,575. Total 14,175." }),
      P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the provision for depreciation: machinery account for 2025.", points: ["Credit: balance b/d 29,400", "Credit: statement of profit or loss 14,175 (own figure)", "Debit: balance c/d 43,575 (own figure) with totals agreeing", "Dates and balance b/d on 1 January 2026"], modelAnswer: s1md, explanation: "The provision is credited with the year's charge; the balance carried down is the accumulated depreciation." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s1nbv, wrong: [r2(s1cost - s1.prov0)], stem: "Calculate the carrying amount of machinery at 31 December 2025.", explanation: "Cost 105,000 − accumulated depreciation 43,575 = 61,425." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why only six months' depreciation is charged on the new machine in 2025.", points: ["Depreciation is charged for the time the asset is owned (monthly basis)", "The machine was bought on 1 July, so it was used for six of the twelve months", "Matching: the cost is spread over the periods in which the asset helps to earn revenue"], modelAnswer: "The policy is monthly, so each asset is charged for the months it is owned. The new machine was bought on 1 July and used for six months of 2025, so half a year's depreciation matches its cost against the revenue it helped to earn.", explanation: "A monthly policy charges each asset for the months owned." }),
    ],
    hints: ["Work out the charge on the old machinery and on the new machine separately.", "Accumulated depreciation at the end = opening provision + the year's charge."],
    explanation: "This item practises a charge on additions with a monthly policy, the provision account and the carrying amount.",
  });

  // --- Practice structured 2 (10 marks): compare methods
  const s2 = { cost: 40000, res: 8000, life: 4, rate: 35 };
  const s2sl = chk((s2.cost - s2.res) / s2.life, 8000);
  const s2rb = depreciation.reducingBalance(s2.cost, s2.rate, 2);
  check("s2rb", s2rb[1].nbv, 16900);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Tatenda started a transport business in Masvingo and bought a minibus on 1 January 2025 for ${money(s2.cost)}. He expects to use it for ${s2.life} years and then sell it for ${money(s2.res)}. He is deciding between two methods: **Method A**, straight line; **Method B**, ${s2.rate}% per annum on the reducing balance. His year end is 31 December.`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the depreciation charge for each year:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: s2sl, wrong: [r2(s2.cost / s2.life)], stem: "2025 under Method A", explanation: "(40,000 − 8,000) ÷ 4 = 8,000." }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: s2rb[0].charge, wrong: [s2sl], stem: "2025 under Method B", explanation: "35% × 40,000 = 14,000." }),
        P.num({ label: "(iii)", marks: 2, kind: "money", value: s2rb[1].charge, wrong: [s2rb[0].charge], stem: "2026 under Method B", explanation: "35% × (40,000 − 14,000) = 9,100." }),
      ] }),
      P.group({ label: "(b)", stem: "Calculate the carrying amount of the minibus at 31 December 2026 under:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: s2.cost - 2 * s2sl, stem: "Method A", explanation: "40,000 − 2 × 8,000 = 24,000." }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: s2rb[1].nbv, wrong: [r2(s2.cost - s2rb[1].charge)], stem: "Method B", explanation: "40,000 − 14,000 − 9,100 = 16,900." }),
      ] }),
      P.manual({ label: "(c)", marks: 4, stem: "Tatenda expects the minibus to need more repairs each year as it ages. Advise him which method to use. Justify your answer using the figures.", points: ["Recommends Method B (reducing balance)", "Uses a figure: Method B charges more early (14,000 against 8,000 in 2025)", "Repairs rise with age while Method B depreciation falls, so total cost of the minibus is more level", "Consistency, or notes Method B never reaches the residual value so the final charge must be checked"], modelAnswer: "Method B suits the minibus. It charges 14,000 in 2025 against 8,000 under Method A, matching the faster early loss of value, and its charge falls to 9,100 in 2026 as repair costs rise, giving a more even total cost. He should then use the method consistently.", explanation: "The recommendation is supported by a figure and by the pattern of repairs." }),
    ],
    hints: ["Method B uses the carrying amount at the start of each year and ignores the residual value.", "Method A deducts the residual value before dividing."],
    explanation: "This item compares straight-line and reducing-balance charges and asks for a justified choice.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Depreciation", "The systematic allocation of the depreciable amount of a non-current asset over its useful life.");
  b.card("FORMULA", "Straight-line annual charge", "(Cost − residual value) ÷ useful life.");
  b.card("FORMULA", "Reducing balance charge", "Rate × carrying amount at the start of the year (cost less accumulated depreciation). The residual value is not used.");
  b.card("FACT", "Four causes of depreciation", "Wear and tear; obsolescence; passage of time (legal limits); depletion.");
  b.card("FACT", "Annual depreciation entry", "Debit depreciation expense; credit provision for depreciation (accumulated depreciation).", "The asset account stays at cost.");
  b.card("DEFINITION", "Carrying amount (net book value)", "Cost less accumulated depreciation. It is not the market value.");
  b.card("CONCEPT", "Does depreciation affect cash?", "No. It lowers profit and carrying amount but is not a payment.", "Added back to profit in a cash flow statement.");
  b.card("CONCEPT", "Which method for an asset that loses value quickly?", "Reducing balance: the higher early charge matches the early loss of value.");
  b.card("FACT", "Is freehold land depreciated?", "Normally not, because its useful life is not limited.");
});
