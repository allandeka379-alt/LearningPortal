// W1b: valuation.nca-models
import { concept, P, money, fmt, check, chk, r2, sum, rd, table, journal, statement } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.valuation.nca-models", { file: "valuation/nca-models", keyPrefix: "valuation.nca-models" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these costs is included in the cost of a machine under IAS 16?",
    right: ["Installation costs needed to bring the machine into use", "Correct: directly attributable cost of bringing the asset to working condition."],
    wrong: [["Training of the staff who will operate it", "Training is an expense of the period."], ["The first year's insurance of the machine", "Running costs are expenses, not part of cost."], ["General administration costs of the head office", "Administration costs are not directly attributable."]],
    explanation: "Cost includes the purchase price (less trade discounts) and directly attributable costs such as delivery, installation and testing.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A business adds an extra floor to its factory building in Bulawayo. How is the expenditure treated?",
    right: ["Capital expenditure, added to the cost of the building", "Correct: it increases the future benefits of the asset."],
    wrong: [["Revenue expenditure, charged to the statement of profit or loss", "Repairs and maintenance are revenue expenditure; an extension is not."], ["Capital expenditure, charged to a repairs account", "Capital expenditure is added to the asset account."], ["Drawings, because the owner benefits", "It is a business expense on an asset, not private use."]],
    explanation: "Expenditure that enlarges or improves an asset (or extends its life) is capitalised; repairs that merely maintain it are expenses.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the revaluation model of IAS 16, at what amount is an asset carried after a revaluation?",
    right: ["Fair value at the date of revaluation less any later accumulated depreciation", "Correct."],
    wrong: [["Historical cost less accumulated depreciation, whatever its current value", "That is the cost model."], ["Its original purchase price, with no deduction for depreciation", "Under neither model is it carried at original cost without depreciation."], ["Net realisable value at the revaluation date less selling costs", "NRV is a different valuation basis."]],
    explanation: "The revaluation model uses fair value at the revaluation date, then deducts depreciation on the revalued amount.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where is a surplus on the revaluation of a building recorded?",
    right: ["In a revaluation reserve in equity", "Correct: it is not profit."],
    wrong: [["In the statement of profit or loss as other income", "An unrealised surplus is not recognised in profit."], ["As a liability until the building is sold", "A surplus is part of equity."], ["As a reduction in the accumulated depreciation only", "Accumulated depreciation is eliminated, but the surplus is credited to a reserve."]],
    explanation: "An increase in carrying amount on revaluation is credited to the revaluation reserve, so profit is not affected.",
  });
  const r5 = { cost: 150000, acc: 45000, val: 190000 };
  const r5s = chk(r5.val - (r5.cost - r5.acc), 85000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Tendai's premises have a cost of ${money(r5.cost)} and accumulated depreciation of ${money(r5.acc)}. They are revalued at ${money(r5.val)}. What is the revaluation surplus?`,
    right: [money(r5s), "Correct: 190,000 − (150,000 − 45,000)."],
    wrong: [[money(r5.val - r5.cost), "This ignores accumulated depreciation, which is part of the carrying amount."], [money(r5.val - r5.acc), "The accumulated depreciation is not deducted from the valuation."], [money(r5.val), "This is the valuation, not the surplus."]],
    hints: ["Surplus = new valuation − carrying amount."],
    explanation: "Carrying amount 150,000 − 45,000 = 105,000. Surplus = 190,000 − 105,000 = 85,000.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "After an upward revaluation of a building, what is the effect on the annual depreciation charge and on profit?",
    right: ["The depreciation charge increases and profit for the year decreases", "Correct: depreciation is based on the higher revalued amount."],
    wrong: [["The depreciation charge decreases and profit for the year increases", "A higher carrying amount gives a higher charge, not lower."], ["The depreciation charge is unchanged because the useful life is unchanged", "Depreciation is calculated on the revalued amount, so it rises."], ["The depreciation charge increases and profit for the year increases", "Higher depreciation reduces profit."]],
    hints: ["Depreciation is a share of the (new) carrying amount over the remaining life."],
    explanation: "The new, higher valuation is depreciated over the remaining life, so the charge rises and profit falls.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which valuation basis is most suitable for a business that is about to close down and sell all its assets?",
    right: ["Net realisable (exit) value", "Correct: it shows what the assets will fetch."],
    wrong: [["Historical cost", "Historical cost shows what was paid, not what will be received."], ["Replacement cost", "Replacement cost assumes assets will be replaced and the business continues."], ["Cost less accumulated depreciation", "This is the carrying amount under the cost model, for a continuing business."]],
    hints: ["Will the business continue to use the assets?"],
    explanation: "A closing business is concerned with the amounts that can be realised from sale.",
  });
  const d8 = { reserve: 4000, dec: 7500 };
  mc(b, {
    d: 4, skill: "APPLICATION",
    stem: `A piece of land has a revaluation reserve of ${money(d8.reserve)} from an earlier upward revaluation of the same land. It is now revalued downwards by ${money(d8.dec)}. How is the decrease treated?`,
    right: [`${money(d8.reserve)} to the revaluation reserve and ${money(d8.dec - d8.reserve)} to profit or loss`, "Correct: reserve first, excess to profit or loss."],
    wrong: [[`The whole ${money(d8.dec)} as an expense in profit or loss`, "The existing reserve on that land must be used first."], [`The whole ${money(d8.dec)} to the revaluation reserve`, "The reserve cannot go negative; the excess goes to profit or loss."], [`${money(d8.reserve)} to profit or loss and ${money(d8.dec - d8.reserve)} to the revaluation reserve`, "The order is reversed."]],
    hints: ["The earlier surplus on that asset is reversed first."],
    explanation: "A decrease is first set against the revaluation reserve on the same asset; any excess (7,500 − 4,000 = 3,500) is charged to profit or loss.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under the revaluation model, a business may revalue just one building and leave other buildings at cost.",
    answer: false,
    hints: ["Think about the class of assets."],
    explanation: "False. If one asset is revalued, all assets in the same class must be revalued.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A revaluation surplus is part of the profit for the year.",
    answer: false,
    explanation: "False. It is recorded in the revaluation reserve in equity.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each valuation basis to its description.",
    pairs: [["Historical cost", "The amount paid when the asset was acquired"], ["Replacement cost", "What it would cost now to buy a similar asset"], ["Net realisable value", "The amount that would be received on sale, less selling costs"], ["Revaluation model", "Fair value at the revaluation date less later depreciation"]],
    explanation: "These are the bases examined in this topic.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Under the cost model, carrying amount = cost less {{blank:a}}. A revaluation surplus is credited to the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["accumulated depreciation"], choices: ["accumulated depreciation", "fair value", "net realisable value"] },
      { id: "b", accepted: ["revaluation reserve"], choices: ["revaluation reserve", "statement of profit or loss", "drawings account"] },
    ],
    explanation: "The cost model deducts accumulated depreciation; a surplus goes to equity, not profit.",
  });

  // --- Numerical
  const n1 = { price: 28500, disc: 10, deliv: 800, inst: 1150, train: 600 };
  const n1cost = chk(n1.price * (1 - n1.disc / 100) + n1.deliv + n1.inst, 27600);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", calculator: true,
    value: n1cost, wrong: [r2(n1cost + n1.train), r2(n1.price + n1.deliv + n1.inst)],
    stem: `Sipho buys a baking machine. The invoice price is ${money(n1.price)} less a ${n1.disc}% trade discount. He pays ${money(n1.deliv)} for delivery, ${money(n1.inst)} for installation and ${money(n1.train)} to train the bakers. At what amount is the machine recorded in the asset account?`,
    hints: ["Which of these costs bring the machine to working condition?"],
    explanation: "Net price 28,500 × 90% = 25,650. Cost = 25,650 + 800 + 1,150 = 27,600. Training (600) is an expense. Ignoring the discount gives 30,450; including training gives 28,200.",
  });
  const n2 = { cost: 120000, life: 40, val: 180000, rem: 30 };
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n2.val / n2.rem, 6000), wrong: [n2.cost / n2.life, 4500],
    stem: `A warehouse in Masvingo cost ${money(n2.cost)} and was depreciated over ${n2.life} years using the straight-line method. After some years it was revalued to ${money(n2.val)}, with ${n2.rem} years of useful life remaining and the accumulated depreciation eliminated. Calculate the annual depreciation charge after the revaluation.`,
    hints: ["Depreciate the revalued amount over the remaining life."],
    explanation: "180,000 ÷ 30 = 6,000 a year. The previous charge was 120,000 ÷ 40 = 3,000.",
  });
  const n3 = { rev: 12000, dec: 20000 };
  b.num({
    d: 4, skill: "APPLICATION", kind: "money",
    value: n3.dec - n3.rev, wrong: [n3.dec, n3.rev],
    stem: `Chipo's land has a revaluation reserve of ${money(n3.rev)} created by an earlier increase in its value. The land is now revalued downwards by ${money(n3.dec)}. What amount is charged to the statement of profit or loss?`,
    hints: ["Use the existing reserve first."],
    explanation: "The first 12,000 of the decrease is charged to the reserve. The excess, 20,000 − 12,000 = 8,000, is an expense in profit or loss.",
  });
  const n4 = { val: 240000, rem: 20 };
  const n4c = n4.val / n4.rem;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n4.val - n4c, wrong: [n4.val, n4c],
    stem: `Nyasha revalues her factory building to ${money(n4.val)} on 1 January and eliminates the accumulated depreciation. The remaining useful life is ${n4.rem} years and she uses the straight-line method. Calculate the carrying amount of the building at the end of that year.`,
    hints: ["Charge one year's depreciation on the revalued amount."],
    explanation: "Depreciation 240,000 ÷ 20 = 12,000. Carrying amount 240,000 − 12,000 = 228,000.",
  });

  // --- Short answer
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the reserve credited when a non-current asset is revalued upwards.",
    accepted: ["revaluation reserve", "revaluation surplus", "the revaluation reserve", "capital reserve", "revaluation reserve account"],
    explanation: "The surplus is credited to the revaluation reserve (a capital reserve, not profit).",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between the cost model and the revaluation model of IAS 16.",
    points: ["Cost model: asset carried at cost less accumulated depreciation", "Cost model: the carrying amount can fall well below current value when prices rise", "Revaluation model: asset carried at fair value at the revaluation date less later depreciation", "Revaluation model: increases are credited to a revaluation reserve and the whole class must be revalued"],
    modelAnswer: "Under the cost model an asset is carried at its cost less accumulated depreciation, which may be far below its present value. Under the revaluation model it is carried at fair value at the date of revaluation less later depreciation; the surplus goes to a revaluation reserve and every asset in the class must be revalued.",
    hints: ["Two lines for each model."],
    explanation: "Give the measurement basis and one consequence for each model.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the cost of staff training is not included in the cost of a new machine.",
    points: ["Cost includes only expenditure needed to bring the asset to working condition", "Training benefits the staff and is not part of the asset itself", "It is an expense of the period charged to profit or loss"],
    modelAnswer: "Cost is limited to the purchase price and costs of bringing the machine to working condition, such as delivery and installation. Training does not create part of the machine, so it is charged to profit or loss as an expense.",
    hints: ["Is the training part of the machine?"],
    explanation: "Link the definition of cost to the nature of training.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate whether a company that owns several office blocks in a period of rising property prices should adopt the revaluation model.",
    points: ["Benefit: statement of financial position shows assets nearer to current value", "Benefit: equity and net assets rise, which may help the business to borrow", "Drawback: valuations cost money and are subjective, and must be kept up to date", "Drawback: higher depreciation reduces profit; a justified conclusion is given"],
    modelAnswer: "The revaluation model would show the offices at a value nearer to the market and strengthen equity, which may help the company to borrow. However, regular valuations cost money and are subjective, and the higher depreciation lowers profit. Because prices are rising and property is a large part of the company's assets, the model is probably worthwhile if the cost of valuation is acceptable.",
    hints: ["One benefit, one drawback, then a judgement."],
    explanation: "A balanced judgement weighs the more realistic carrying amount against cost and subjectivity.",
  });

  // --- Practice structured 1 (12 marks): upward revaluation with journal
  const s1 = { cost: 360000, acc: 90000, val: 420000, rem: 30 };
  const s1cv = s1.cost - s1.acc;
  const s1s = chk(s1.val - s1cv, 150000);
  const s1c = chk(s1.val / s1.rem, 14000);
  const s1j = journal([{ date: "1 Jan 2026", lines: [["Provision for depreciation: buildings", s1.acc, null], ["Buildings at cost / valuation", s1.val - s1.cost, null], ["Revaluation reserve", null, s1s]], narrative: "Revaluation of buildings to 420,000; accumulated depreciation eliminated" }]);
  b.struct({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Tatenda's company owns a commercial building in Masvingo. On 1 January 2026 its cost was ${money(s1.cost)} and the accumulated depreciation was ${money(s1.acc)}. The directors adopt the revaluation model and a professional valuer values the building at ${money(s1.val)}. The remaining useful life is ${s1.rem} years and depreciation is straight line. The year end is 31 December.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1cv, wrong: [s1.cost], stem: "Calculate the carrying amount of the building before the revaluation.", explanation: "360,000 − 90,000 = 270,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s1s, wrong: [r2(s1.val - s1.cost)], stem: "Calculate the revaluation surplus.", explanation: "420,000 − 270,000 = 150,000." }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entry to record the revaluation. A narrative is required.", points: ["Debit provision for depreciation 90,000", "Debit buildings 60,000 (420,000 − 360,000)", "Credit revaluation reserve 150,000", "Date and narrative"], modelAnswer: s1j, explanation: "The accumulated depreciation is eliminated and the building is restated to the valuation." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s1c, wrong: [s1.cost / 40, r2(s1.val / 40)], stem: "Calculate the depreciation charge for 2026.", explanation: "Depreciation is on the revalued amount: 420,000 ÷ 30 = 14,000." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain how the revaluation affects the profit for 2026.", points: ["The surplus is not profit, so it does not increase profit", "Depreciation is higher on the revalued amount, so profit is lower"], modelAnswer: "The surplus is credited to the revaluation reserve, so profit does not increase. The depreciation charge is higher than before because it is based on the higher valuation, so profit for 2026 is lower.", explanation: "The revaluation reduces profit through higher depreciation." }),
    ],
    hints: ["The accumulated depreciation is eliminated on revaluation.", "Depreciate the revalued amount over the remaining life."],
    explanation: "This item practises a revaluation: surplus, journal and the effect on depreciation.",
  });

  // --- Practice structured 2 (10 marks): cost of an asset and valuation bases
  const s2 = { price: 64000, duty: 3200, deliv: 1900, install: 2400, fees: 800, repair: 1200, train: 1500 };
  const s2cost = chk(s2.price + s2.duty + s2.deliv + s2.install + s2.fees, 72300);
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Thandeka's bakery in Gweru bought a new industrial mixer on 1 March 2026. The invoice price was ${money(s2.price)}. She also paid: import duty ${money(s2.duty)}, delivery ${money(s2.deliv)}, installation ${money(s2.install)}, professional fees for certifying the installation ${money(s2.fees)}, a repair of the old mixer ${money(s2.repair)} and training of bakers ${money(s2.train)}.`,
    parts: [
      P.group({ label: "(a)", stem: "Is each item part of the cost of the new mixer?", parts: [
        P.tf({ label: "(i)", marks: 1, yesNo: true, stem: "Import duty", answer: true, explanation: "Yes. Import duties are a non-refundable cost of acquisition." }),
        P.tf({ label: "(ii)", marks: 1, yesNo: true, stem: "Repair of the old mixer", answer: false, explanation: "No. It relates to a different asset and is revenue expenditure." }),
        P.tf({ label: "(iii)", marks: 1, yesNo: true, stem: "Training of bakers", answer: false, explanation: "No. Training is not a cost of bringing the mixer to working condition." }),
        P.tf({ label: "(iv)", marks: 1, yesNo: true, stem: "Professional fees for certifying the installation", answer: true, explanation: "Yes. Fees directly attributable to bringing the asset into use are part of its cost." }),
      ] }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2cost, wrong: [r2(s2cost + s2.repair + s2.train), s2.price], stem: "Calculate the amount at which the mixer is recorded in the asset account.", explanation: "64,000 + 3,200 + 1,900 + 2,400 + 800 = 72,300." }),
      P.manual({ label: "(c)", marks: 4, stem: "Thandeka is considering valuing her premises at replacement cost in the statement of financial position instead of historical cost. Evaluate this suggestion.", points: ["Replacement cost shows the current cost of a similar asset, which is more relevant when prices have risen", "Historical cost is objective and verifiable", "Replacement cost needs estimates and professional valuation, which is subjective and costly", "Justified conclusion, for example that the revaluation model with regular valuations is a sensible compromise"], modelAnswer: "Replacement cost shows what a similar asset would cost now, so it may be more relevant when prices have risen. Historical cost is objective and checked against invoices. Replacement cost needs estimates and valuation, which is costly and subjective. A sensible compromise is to use the revaluation model with regular professional valuations.", explanation: "A balanced answer weighs relevance against reliability." }),
    ],
    hints: ["Only costs of bringing the asset into working condition are capitalised.", "Evaluate: one advantage, one disadvantage, then a conclusion."],
    explanation: "This item practises the cost of a new asset and the choice between valuation bases.",
  });

  // --- Flashcards
  b.card("FACT", "Cost of a non-current asset (IAS 16)", "Purchase price less trade discount, import duties, delivery, installation, testing and professional fees. Not training or running costs.");
  b.card("DEFINITION", "Cost model", "The asset is carried at cost less accumulated depreciation.");
  b.card("DEFINITION", "Revaluation model", "The asset is carried at fair value at the revaluation date less later accumulated depreciation; the whole class is revalued.");
  b.card("FACT", "Upward revaluation entry", "Credit revaluation reserve with the surplus; eliminate accumulated depreciation and restate the asset to the valuation.");
  b.card("CONCEPT", "Surplus on revaluation", "It is not profit. It is shown in equity (revaluation reserve) and in other comprehensive income.");
  b.card("CONCEPT", "Depreciation after an upward revaluation", "Charged on the revalued amount over the remaining life, so it rises and profit falls.");
  b.card("FACT", "Downward revaluation", "First charged to any revaluation reserve on the same asset; the excess is an expense in profit or loss.");
  b.card("FACT", "Capital or revenue (subsequent expenditure)", "Improvements and extensions are added to cost; repairs and maintenance are charged to profit or loss.");
  b.card("CONCEPT", "Which valuation basis for a closing business?", "Net realisable (exit) value: what the assets will fetch on sale.");
});
