// W3a: standards.ias-16-36-38
import { concept, P, table, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("aacc.standards.ias-16-36-38", { file: "standards/ias-16-36-38", keyPrefix: "standards.ias-16-36-38" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these costs is included in the cost of a new item of property, plant and equipment?",
    ok: ["Installation costs", "Correct: they bring the asset to its working condition."],
    bad: [["Training of the staff who will use it", "Training is an expense."], ["A share of general administration costs", "Administration overheads are expenses."], ["Costs of running the asset after it starts operating", "Running costs are expenses."]],
    explanation: "Only costs directly needed to bring the asset to its location and working condition are capitalised.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the recoverable amount of an asset defined under IAS 36?",
    ok: ["The higher of fair value less costs of disposal and value in use", "Correct: the better of selling and using."],
    bad: [["The lower of fair value less costs of disposal and value in use", "The higher figure is used."], ["The original cost less accumulated depreciation", "That is the carrying amount."], ["The insured value of the asset", "Insurance value is not part of the definition."]],
    explanation: "Recoverable amount is the higher of the amount from selling the asset (net of disposal costs) and the amount from using it.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "How is expenditure on research treated under IAS 38?",
    ok: ["It is always recognised as an expense", "Correct: future benefits cannot be shown."],
    bad: [["It is capitalised if the project is promising", "Research is never capitalised."], ["It is capitalised and amortised over five years", "Only development can be capitalised."], ["It is shown as a current asset", "Research is not an asset."]],
    explanation: "At the research stage no future economic benefit can be demonstrated, so the cost is expensed.",
  });
  const lp = 30000, dc = 10, dl = 700, in1 = 1300, tr = 500;
  const cst = r2(lp * (1 - dc / 100) + dl + in1);
  chk(cst, 29000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A company buys a machine with a list price of ${money(lp)}, less a ${dc}% trade discount. It pays ${money(dl)} for delivery, ${money(in1)} for installation and ${money(tr)} to train the operators. At what cost is the machine recorded?`,
    ok: [money(cst), "Correct: 27,000 + 700 + 1,300."],
    bad: [[money(r2(cst + tr)), "The training is an expense, not part of cost."], [money(r2(lp + dl + in1)), "The trade discount has been ignored."], [money(r2(lp * (1 - dc / 100))), "Delivery and installation have been left out."]],
    hints: ["Which costs bring the asset to working condition?"],
    explanation: "Cost = 30,000 × 90% + 700 + 1,300 = 29,000. Training of 500 is an expense.",
  });
  const cv = 64000, fv = 41000, viu = 47500;
  const il = r2(cv - Math.max(fv, viu));
  chk(il, 16500);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `An asset has a carrying amount of ${money(cv)}. Its fair value less costs of disposal is ${money(fv)} and its value in use is ${money(viu)}. What is the impairment loss?`,
    ok: [money(il), "Correct: 64,000 - 47,500 (the higher recoverable amount)."],
    bad: [[money(r2(cv - fv)), "The lower of the two amounts has been used."], [money(cv - 0), "The whole carrying amount has been written off."], [money(r2(viu - fv)), "This is the difference between the two measures, not the loss."]],
    hints: ["Recoverable amount is the higher of the two."],
    explanation: "Recoverable amount = 47,500; impairment loss = 64,000 - 47,500 = 16,500.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How is internally generated goodwill treated in the statement of financial position?",
    ok: ["It is never recognised", "Correct: its cost cannot be measured reliably."],
    bad: [["It is recognised at the directors' valuation", "A directors' valuation is not reliable."], ["It is recognised and amortised over five years", "Only purchased goodwill is recognised."], ["It is recognised if the company is profitable", "Profitability does not allow recognition."]],
    hints: ["Can the cost be measured reliably?"],
    explanation: "IAS 38 does not allow internally generated goodwill, brands or similar items to be recognised as assets.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which of these is NOT a condition that must be met before development expenditure is capitalised?",
    ok: ["The project has first been approved by the company's auditors", "Correct: the auditors do not approve projects."],
    bad: [["It is technically feasible to complete the asset", "This is a required criterion."], ["The company has the resources to complete the project", "This is a required criterion."], ["The expenditure can be measured reliably", "This is a required criterion."]],
    hints: ["The conditions are about feasibility, intention, resources and benefits."],
    explanation: "Technical feasibility, intention, ability to use or sell, probable benefits, adequate resources and reliable measurement are required.",
  });
  const rec = 30000, rl = 6;
  const nd = r2(rec / rl);
  chk(nd, 5000);
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "An asset with a carrying amount of US\\$48,000 and 6 years of life left is impaired to its recoverable amount of US\\$30,000. What is the annual depreciation after the impairment?",
    ok: [money(nd), "Correct: 30,000 ÷ 6."],
    bad: [[money(8000), "That is the depreciation before the impairment."], [money(r2(18000 / rl)), "The impairment loss has been depreciated instead of the new carrying amount."], [money(r2(30000)), "The carrying amount has not been spread over the remaining life."]],
    hints: ["Depreciate the new carrying amount over the remaining life."],
    explanation: "After the write-down the carrying amount is 30,000, depreciated over 6 years = 5,000 a year.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Development expenditure is always recognised as an expense.", answer: false, explanation: "False. Development expenditure is capitalised when all the IAS 38 criteria are met; only research is always expensed." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "An impairment loss is recognised when the recoverable amount of an asset is higher than its carrying amount.", answer: false, hints: ["Which amount is higher in an impairment?"], explanation: "False. An impairment loss arises when the carrying amount is higher than the recoverable amount." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to its treatment.",
    pairs: ["Delivery and installation of a new machine", "Research into a new product", "Internally generated goodwill", "Staff training after installation"],
    right: ["Added to the cost of the machine", "Expensed as incurred", "Not recognised as an asset", "Expensed as incurred (not part of cost)"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Directly attributable costs are capitalised; research, training and internally generated goodwill are not.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "Recoverable amount is the {{blank:a}} of fair value less costs of disposal and value in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["higher"], choices: ["higher", "lower"] },
      { id: "b", accepted: ["use"], choices: ["use", "exchange", "sale"] },
    ],
    explanation: "The recoverable amount is the higher of the amount from selling the asset and the amount from using it.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the standard that deals with the impairment of assets.",
    accepted: ["ias 36", "ias36", "ias 36 impairment of assets", "international accounting standard 36"],
    explanation: "IAS 36 sets out when and how an impairment loss is recognised.",
  });

  // numerical
  const lpx = 64000, dsc = 12.5, dly = 2300, tst = 850, adm = 1400;
  const cost2 = r2(lpx * (1 - dsc / 100) + dly + tst);
  chk(cost2, 59150);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: cost2, calculator: true, wrong: [r2(cost2 + adm), r2(lpx + dly + tst)],
    stem: `A company buys a machine with a list price of ${money(lpx)}, less a trade discount of 12.5%. It pays ${money(dly)} for delivery and ${money(tst)} for testing before use, and its administration department spends ${money(adm)} on the purchase. Calculate the cost at which the machine is recorded.`,
    hints: ["Include only directly attributable costs."],
    explanation: "64,000 × 87.5% = 56,000; + 2,300 + 850 = 59,150. The administration cost of 1,400 is an expense.",
  });
  const cv2 = 93600, fv2 = 70200, viu2 = 66800;
  const il2 = r2(cv2 - Math.max(fv2, viu2));
  chk(il2, 23400);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: il2, calculator: true, wrong: [r2(cv2 - viu2), r2(cv2 - fv2 + viu2)],
    stem: `A machine has a carrying amount of ${money(cv2)}. Its fair value less costs of disposal is ${money(fv2)} and its value in use is ${money(viu2)}. Calculate the impairment loss.`,
    hints: ["Choose the higher of the two measures first."],
    explanation: "Recoverable amount = 70,200 (the higher). Loss = 93,600 - 70,200 = 23,400. Using value in use gives 26,800.",
  });
  const dev = 51000, yrs = 6;
  const am = r2(dev / yrs);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: am, daily: true, calculator: true, wrong: [dev, r2(dev / 5)],
    stem: `A company capitalised development costs of ${money(dev)}. The product is expected to be sold for ${yrs} years, with no residual value. Calculate the annual amortisation.`,
    explanation: "51,000 ÷ 6 = 8,500 a year, starting when the product is available for sale.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why internally generated goodwill is not recognised as an asset.",
    points: ["Its cost cannot be measured reliably because it is built up from many sources, such as reputation and customer loyalty", "It is not separately identifiable or controlled in the way a licence or patent is"],
    modelAnswer: "The cost of internally generated goodwill cannot be measured reliably, and it is not an identifiable asset that the company controls, so it is not recognised.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why research costs are expensed but development costs may be capitalised.",
    points: ["At the research stage it is not yet certain that any asset will result, so future benefits cannot be shown", "At the development stage a project may meet the criteria, such as feasibility, resources and probable benefits", "Capitalising only when the criteria are met applies prudence while recording genuine assets"],
    modelAnswer: "Research may never produce an asset, so it is expensed. Development that meets the criteria of feasibility, resources and probable benefits is an asset. Capitalising only then is prudent.",
    hints: ["At which stage is it more certain that an asset will result?"],
    explanation: "One mark each for research, development and prudence.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three signs that an asset may be impaired and explain how an impairment loss is recorded.",
    points: ["Signs such as a fall in market value, physical damage or obsolescence, or adverse changes in the market (any two)", "A further sign such as a plan to stop using the asset", "The carrying amount is written down to the recoverable amount and the loss is charged to profit or loss"],
    modelAnswer: "Signs include a large fall in market value, physical damage, obsolescence or a plan to stop using the asset. The asset is written down to its recoverable amount and the loss is charged to profit or loss.",
    hints: ["Think about what can make an asset worth less than its book value."],
    explanation: "Marks for signs (2) and for recording the loss (1).",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The directors of a company wish to capitalise all the costs of its new product, including research, in order to increase profit. Evaluate their proposal.",
    points: ["Research costs must be expensed, and development costs are capitalised only if every IAS 38 criterion is met", "Capitalising everything would overstate assets and profit and would mislead users", "Capitalising genuine development costs is acceptable and spreads the cost over the product's life", "Judgement: reject the proposal as stated; capitalise only the qualifying development costs and disclose them"],
    modelAnswer: "Research must be expensed and development capitalised only if all criteria are met. Capitalising everything would overstate profit and mislead users. The directors should capitalise only the qualifying development costs and disclose them.",
    hints: ["Which part of the spending can be capitalised?"],
    explanation: "One mark each for the rule, the effect on users, the acceptable part and a judgement.",
  });

  // Structured 1 (12 marks)
  const A = { lp: 86000, disc: 5, del: 2400, site: 3150, inst: 4600, test: 1280, train: 1750, adm: 1100, tax: 11200, res: 9130, life: 12 };
  const costA = r2(A.lp * (1 - A.disc / 100) + A.del + A.site + A.inst + A.test);
  chk(costA, 93130);
  const depA = r2((costA - A.res) / A.life);
  chk(depA, 7000);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Mutare Cold Storage Ltd buys a cold room. The list price is US\\$${fmt(A.lp)} less a trade discount of ${A.disc}%. It also pays: delivery US\\$${fmt(A.del)}; site preparation US\\$${fmt(A.site)}; installation US\\$${fmt(A.inst)}; testing before use US\\$${fmt(A.test)}; training of staff US\\$${fmt(A.train)}; and sales tax of US\\$${fmt(A.tax)}, all of which can be reclaimed. Its own administration staff spend time costed at US\\$${fmt(A.adm)} on the purchase. The cold room is expected to last ${A.life} years with a residual value of US\\$${fmt(A.res)}.`,
    parts: [
      P.num({ label: "(a)", marks: 4, kind: "money", value: costA, wrong: [r2(costA + A.train + A.adm), r2(costA + A.tax)], stem: "Calculate the cost of the cold room under IAS 16.", explanation: `${fmt(A.lp)} × 95% = ${fmt(r2(A.lp * 0.95))}; + delivery ${fmt(A.del)} + site ${fmt(A.site)} + installation ${fmt(A.inst)} + testing ${fmt(A.test)} = ${fmt(costA)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(A.train + A.adm), wrong: [A.train, r2(A.train + A.adm + A.tax)], stem: "Calculate the amount of the purchase costs that is treated as an expense.", explanation: `Training ${fmt(A.train)} + administration ${fmt(A.adm)} = ${fmt(r2(A.train + A.adm))}. The sales tax is recoverable, so it is a receivable.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: depA, wrong: [r2(costA / A.life), r2((costA + A.res) / A.life)], stem: "Calculate the annual depreciation on the straight-line basis.", explanation: `(${fmt(costA)} - ${fmt(A.res)}) ÷ ${A.life} = ${fmt(depA)}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the staff training costs are not added to the cost of the cold room.", points: ["Training is not a cost of bringing the asset to its location or working condition", "The benefit of training belongs to the staff and the future, and cannot be shown to be an asset the company controls", "Treating it as an expense matches it to the year in which it is incurred"], modelAnswer: "Training does not bring the cold room to its location or condition. The benefit is in the staff, which the company does not control as an asset. It is therefore an expense of the year.", explanation: "One mark for each point." }),
    ],
    hints: ["Apply the trade discount to the list price only.", "Recoverable tax is not a cost."],
    explanation: "This item tests the cost of property, plant and equipment and depreciation under IAS 16.",
  });

  // Structured 2 (14 marks)
  const B = { cv: 168000, life: 6, fv: 104000, viu: 121200, res: 38000, devBefore: 15000, devAfter: 72000, prod: 6, brand: 55000 };
  const recB = Math.max(B.fv, B.viu);
  const lossB = r2(B.cv - recB);
  const depB = r2(recB / B.life);
  const expB = r2(B.res + B.devBefore);
  const amB = r2(B.devAfter / B.prod);
  chk(lossB, 46800);
  chk(depB, 20200);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Chinhoyi Packaging Ltd has a machine with a carrying amount of US\\$${fmt(B.cv)} and ${B.life} years of life left. Because of a new competitor, a test of impairment is carried out. The fair value less costs of disposal is US\\$${fmt(B.fv)} and the value in use is US\\$${fmt(B.viu)}.\n\nThe company also developed a new type of carton. It spent US\\$${fmt(B.res)} on research, US\\$${fmt(B.devBefore)} on development before the capitalisation criteria were met and US\\$${fmt(B.devAfter)} on development after they were met. The carton will be sold for ${B.prod} years. The directors also wish to show the company's internally built reputation, valued by them at US\\$${fmt(B.brand)}, as an asset.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: recB, wrong: [B.fv, r2(B.cv - B.viu)], stem: "State the recoverable amount of the machine.", explanation: `The higher of ${fmt(B.fv)} and ${fmt(B.viu)} is ${fmt(recB)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: lossB, wrong: [r2(B.cv - B.fv), recB], stem: "Calculate the impairment loss.", explanation: `${fmt(B.cv)} - ${fmt(recB)} = ${fmt(lossB)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: depB, wrong: [r2(B.cv / B.life), r2(lossB / B.life)], stem: "Calculate the annual depreciation of the machine after the impairment.", explanation: `${fmt(recB)} ÷ ${B.life} = ${fmt(depB)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: expB, wrong: [B.res, r2(expB + B.devAfter)], stem: "Calculate the total expenditure on the carton that is charged to profit or loss in the year it was incurred.", explanation: `Research ${fmt(B.res)} + early development ${fmt(B.devBefore)} = ${fmt(expB)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: amB, wrong: [B.devAfter, r2(B.devAfter / 5)], stem: "Calculate the annual amortisation of the capitalised development costs.", explanation: `${fmt(B.devAfter)} ÷ ${B.prod} = ${fmt(amB)}.` }),
      P.manual({ label: "(f)", marks: 3, stem: "Evaluate the directors' wish to show their internally built reputation as an asset.", points: ["IAS 38 does not allow internally generated goodwill or brands to be recognised, because the cost cannot be measured reliably", "The directors' valuation is a subjective opinion, so including it would overstate assets and equity and mislead users", "The reputation does benefit the company, which users may consider through its profits, but it must not be shown as an asset"], modelAnswer: "IAS 38 prohibits recognising internally generated goodwill because it cannot be measured reliably. A directors' valuation is subjective and would overstate assets. The reputation shows in future profits, not in the statement of financial position.", explanation: "One mark for each point." }),
    ],
    hints: ["Recoverable amount is the higher figure.", "Only development after the criteria were met is capitalised."],
    explanation: "This item tests impairment, research and development costs and internally generated goodwill.",
  });
  void sum; void table;

  b.card("FORMULA", "Cost of property, plant and equipment", "Purchase price after trade discount + import duties and non-refundable taxes + directly attributable costs (delivery, installation, testing); not training or overheads.");
  b.card("DEFINITION", "What is **recoverable amount**?", "The higher of fair value less costs of disposal and value in use.");
  b.card("FORMULA", "Impairment loss", "Carrying amount - recoverable amount (if positive); charged to profit or loss.");
  b.card("DEFINITION", "What is **value in use**?", "The present value of the cash flows expected from using the asset and from its disposal at the end of its life.");
  b.card("FACT", "Research and development (IAS 38)", "Research is always expensed. Development is capitalised only when all criteria are met (feasibility, intention, ability to use or sell, probable benefits, resources, reliable measurement).");
  b.card("FACT", "Internally generated goodwill", "Never recognised as an asset; only goodwill bought in an acquisition is recognised.");
  b.card("FACT", "Depreciation after an impairment", "Based on the new carrying amount over the remaining useful life.");
  b.card("DEFINITION", "What is an **intangible asset**?", "An identifiable non-monetary asset without physical substance, controlled by the entity, giving future economic benefits.");
  b.card("CONCEPT", "Annual review under IAS 16", "The residual value and useful life are reviewed each year; a change is a change in accounting estimate.");
});
