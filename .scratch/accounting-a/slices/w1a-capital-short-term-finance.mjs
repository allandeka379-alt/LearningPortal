// W1a: capital.short-term-finance (Cambridge only: tagged automatically)
import { concept, P, table, check, sum, r2, fmt, money } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("aacc.capital.short-term-finance", { file: "capital/short-term-finance", keyPrefix: "capital.short-term-finance" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "On what amount is interest charged on a bank overdraft?",
    ok: ["The amount actually overdrawn", "Correct: interest is charged only on the overdrawn balance."],
    bad: [["The whole overdraft limit, used or not", "Interest is not normally charged on unused limit."], ["The business's total assets", "Assets are not the basis."], ["The previous year's profit", "Profit is unrelated to the interest charge."]],
    explanation: "An overdraft is flexible: interest is paid on the amount used, for the time used.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Under a lease, who owns the asset?",
    ok: ["The lessor", "Correct: the business pays for use, not ownership."],
    bad: [["The business using the asset (the lessee)", "The lessee only has the right to use the asset."], ["The bank, in every case", "The owner is the lessor, who may or may not be a bank."], ["The government", "The government is not involved in ownership."]],
    explanation: "Leasing and renting give use of an asset that remains the property of its owner.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is an **unsecured** loan?",
    ok: ["A loan for which no asset has been pledged as security", "Correct: the lender cannot claim a specific asset if the borrower defaults."],
    bad: [["A loan that does not have to be repaid", "All loans must be repaid."], ["A loan from a supplier", "Supplier credit is called trade credit."], ["A loan that carries no interest", "Unsecured loans usually carry higher interest."]],
    explanation: "Unsecured loans are riskier for lenders, so they cost more or are smaller.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "Chipo's shop needs extra cash for three weeks before a holiday to buy stock which will be sold quickly. Which source is **most suitable**?",
    ok: ["A bank overdraft", "Correct: it is flexible, short-term and costs interest only while used."],
    bad: [["A ten-year bank loan", "A long loan is too long and costs interest for the whole term."], ["Issuing new shares", "A sole trader cannot issue shares, and this is too slow for a short need."], ["Leasing a vehicle", "This does not provide cash for stock."]],
    explanation: "Match short-term needs with short-term, flexible finance.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the main risk to a business that relies on a bank overdraft?",
    ok: ["The bank can demand repayment at short notice", "Correct: the facility can be withdrawn."],
    bad: [["Interest is charged on the unused limit", "Interest is charged on the amount overdrawn."], ["The asset is owned by the bank", "An overdraft does not give the bank ownership of an asset."], ["It must be repaid in equal instalments", "Overdrafts have no fixed instalments."]],
    hints: ["Think about who controls the facility."],
    explanation: "Overdrafts are repayable on demand, so a sudden withdrawal can cause a cash crisis.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Why might a new sole trader with few assets prefer to lease a machine rather than buy it with a bank loan?",
    ok: ["It avoids a large outlay and does not need security", "Correct: payments are spread and the lessor keeps the asset."],
    bad: [["The machine will belong to the sole trader at the end", "Leased assets stay with the lessor."], ["Leasing is always cheaper in total", "Over a long period it can cost more."], ["There is no risk of being unable to pay", "Lease payments must still be paid."]],
    hints: ["Think about cash at the start and security."],
    explanation: "Leasing spreads the cost and avoids a deposit or security, though ownership never passes.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A supplier allows 30 days' credit and a discount for payment within 10 days. What is the cost of trade credit if the business pays on day 30?",
    ok: ["The discount lost by not paying early", "Correct: the credit period itself is free."],
    bad: [["Interest charged on the invoice from day 1", "No interest is charged in this arrangement."], ["Nothing, because the credit period is always free of cost", "The business loses the available discount."], ["The invoice amount plus a deposit", "No deposit is involved."]],
    hints: ["What does the business give up by waiting?"],
    explanation: "The cost is the discount forgone.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why is an overdraft an unsuitable way to finance the purchase of a building that will be used for twenty years?",
    ok: ["It can be withdrawn on demand, whereas the building is a long-term commitment", "Correct: the term of the finance does not match the life of the asset."],
    bad: [["Overdrafts are only available to companies", "Sole traders and partnerships can also have overdrafts."], ["Overdrafts do not charge interest, so the bank refuses", "Overdrafts charge interest."], ["Buildings cannot be bought with borrowed money", "They can, usually with a loan secured on the building."]],
    hints: ["Compare how long the finance lasts with how long the asset lasts."],
    explanation: "Long-term assets should be financed with long-term sources to avoid sudden repayment.",
  });

  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "When a business leases a vehicle, it becomes the owner after the last payment.",
    answer: false,
    explanation: "False. Under a lease the lessor remains the owner. Ownership normally passes only under an instalment (hire purchase) agreement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Interest on a bank overdraft is normally charged on the whole overdraft limit even if the business does not use it.",
    answer: false,
    explanation: "False. Interest is charged on the amount actually overdrawn.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of finance to its main feature.",
    pairs: ["Overdraft", "Secured loan", "Instalments", "Leasing", "Trade credit"],
    right: ["Repayable on demand; interest only on the amount used", "The lender has a claim on a named asset", "Ownership passes after the last payment", "The lessor remains the owner of the asset", "Time to pay a supplier, often with a discount for early payment"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Each source has a distinctive repayment and ownership feature.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "An overdraft is repayable {{blank:a}}, whereas a term loan is repaid {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["on demand"], choices: ["on demand", "over the agreed term"] },
      { id: "b", accepted: ["over the agreed term"], choices: ["on demand", "over the agreed term"] },
    ],
    explanation: "The bank can ask for an overdraft back at short notice; a term loan follows an agreed schedule.",
  });

  const od = r2(8000 * 0.15 * (2 / 12));
  check("od", od, 200);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: od, daily: true, calculator: true, wrong: [r2(8000 * 0.15), r2(8000 * 0.15 * 2)],
    stem: "Farai's business is overdrawn by US\\$8,000 for two months. The overdraft interest rate is 15% a year. Calculate the interest for the two months.",
    explanation: "8,000 × 15% × 2/12 = 200.",
  });
  const hp = r2(1200 + 12 * 780 - 9600);
  check("hp", hp, 960);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: hp, calculator: true, wrong: [r2(12 * 780), r2(1200 + 12 * 780)],
    stem: "A cattle feed mixer has a cash price of US\\$9,600. Thandeka can buy it on instalments by paying a deposit of US\\$1,200 and 12 monthly payments of US\\$780. Calculate how much more than the cash price she pays in total.",
    hints: ["Total paid = deposit + all instalments."],
    explanation: "Total paid 1,200 + 12 × 780 = 10,560. Extra cost 10,560 - 9,600 = 960.",
  });
  let bal = 15000;
  let tot = 0;
  for (let y = 0; y < 3; y += 1) {
    tot += r2(bal * 0.12);
    bal -= 5000;
  }
  tot = r2(tot);
  check("tot", tot, 3600);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: tot, calculator: true, wrong: [r2(15000 * 0.12 * 3), 1800],
    stem: "A business borrows US\\$15,000 at 12% a year, interest charged on the balance outstanding at the start of each year. It repays US\\$5,000 of the loan at the end of each of three years. Calculate the total interest paid.",
    hints: ["The balance falls by 5,000 each year."],
    explanation: "Year 1: 15,000 × 12% = 1,800; year 2: 10,000 × 12% = 1,200; year 3: 5,000 × 12% = 600. Total 3,600. Interest on the full 15,000 for three years would be 5,400.",
  });
  const dl = r2(7400 * 0.015);
  check("dl", dl, 111);
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", value: dl, calculator: true, wrong: [r2(7400 * 0.985), 1.5],
    stem: "A supplier invoices Nyasha for US\\$7,400 and allows a 1.5% discount for payment within 14 days. Nyasha pays after 45 days. Calculate the discount she loses.",
    hints: ["Discount = invoice × discount rate."],
    explanation: "7,400 × 1.5% = 111.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of loan in which the lender can claim a named asset if the borrower fails to repay.",
    accepted: ["secured loan", "secured", "a secured loan"],
    explanation: "A secured loan.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** disadvantages of leasing a machine compared with buying it.",
    points: ["The business never owns the asset and cannot sell it", "Over a long period the total payments may be higher than buying"],
    modelAnswer: "The business does not own the machine and cannot sell it, and over a long time the lease payments may cost more than buying.",
    explanation: "Ownership and total cost are the usual points.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why trade credit is a useful source of finance for a small retailer.",
    points: ["It allows stock to be sold before it has to be paid for", "It is free if paid within the credit period, and needs no security", "It is easy to obtain and grows with purchases"],
    modelAnswer: "A retailer can sell the goods before paying the supplier, so the credit finances the stock at no cost within the credit period. It needs no security and is easy to arrange.",
    hints: ["Think about cost and timing."],
    explanation: "Timing, cost and ease of arrangement.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A partnership needs US\\$30,000 to buy a delivery vehicle it will use for five years. The bank offers an overdraft of that size or a five-year loan. Evaluate which is more suitable.",
    points: ["The loan matches the life of the vehicle and fixes the repayments", "The overdraft is flexible and may cost less in interest in the short term, but can be withdrawn on demand", "Recommendation: the loan, because the need is long term and the risk of withdrawal is too high"],
    modelAnswer: "The loan matches the five-year life of the vehicle and gives certainty about repayments. The overdraft is cheaper to run but can be withdrawn on demand, which is a risk for a long-term asset. The loan is more suitable.",
    hints: ["Match the term of the finance to the life of the asset."],
    explanation: "A recommendation backed by a comparison.",
  });

  // Structured 1: 10 marks
  const oven = 18000;
  let bal2 = oven;
  let int2 = 0;
  for (let y = 0; y < 2; y += 1) {
    int2 += r2(bal2 * 0.08);
    bal2 -= 9000;
  }
  int2 = r2(int2);
  check("int2", int2, 2160);
  const leaseTot = r2(700 * 30);
  const leaseCost = r2(leaseTot - oven);
  check("leaseCost", leaseCost, 3000);
  const diff = r2(leaseCost - int2);
  check("diff", diff, 840);
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Thandeka's bakery in Masvingo needs a new oven with a cash price of ${money(oven)}. Option 1: a two-year bank loan at 8% a year, interest charged on the balance outstanding at the start of each year, with ${money(9000)} of capital repaid at the end of each year. Option 2: lease the oven for ${money(700)} a month for 30 months, with the oven returned at the end.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: int2, wrong: [r2(oven * 0.08 * 2), 1440], stem: "Calculate the total interest on the loan.", explanation: "Year 1: 18,000 × 8% = 1,440; year 2: 9,000 × 8% = 720; total 2,160." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: leaseTot, wrong: [oven], stem: "Calculate the total paid under the lease.", explanation: "700 × 30 = 21,000." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: diff, wrong: [leaseCost, int2], stem: "Calculate how much more the lease costs than the loan interest, comparing the lease payments above the cash price with the loan interest.", explanation: "Lease cost above the cash price 3,000 less loan interest 2,160 = 840." }),
      P.manual({ label: "(d)", marks: 3, stem: "Recommend which option Thandeka should choose, giving reasons.", points: ["The loan costs less (2,160 against 3,000 above the cash price) and she would own the oven", "The lease avoids a large outlay and repairs may be the lessor's, but she would own nothing at the end", "A conclusion linked to her circumstances, such as security available or the need to protect cash"], modelAnswer: "The loan is cheaper, costing 2,160 against 3,000, and she would own the oven. The lease avoids security and spreads the cost but leaves her with nothing at the end. Unless she cannot give security, the loan is better.", explanation: "Compare cost, ownership and her position, then conclude." }),
    ],
    hints: ["Interest falls as the balance falls."],
    explanation: "This item tests the cost comparison of a loan and a lease.",
  });

  // Structured 2: 14 marks
  const odI = r2(7800 * 0.16 * (2 / 12));
  const lnI = r2(7800 * 0.11);
  const dlose = r2(7800 * 0.03);
  check("odI", odI, 208);
  check("lnI", lnI, 858);
  check("dlose", dlose, 234);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Mutasa's grocery in Mutare needs ${money(7800)} for two months to buy extra stock for a festival. The bank offers an overdraft at 16% a year or a one-year loan at 11% a year (which cannot be repaid early). A supplier would instead give 40 days' credit on a ${money(7800)} order, or a 3% discount for payment within 10 days.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: odI, wrong: [r2(7800 * 0.16)], stem: "Calculate the overdraft interest for two months.", explanation: "7,800 × 16% × 2/12 = 208." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: lnI, wrong: [r2(7800 * 0.11 * (2 / 12))], stem: "Calculate the interest on the one-year loan.", explanation: "7,800 × 11% = 858." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: dlose, wrong: [r2(7800 * 0.97)], stem: "Calculate the discount lost by taking the full 40 days' credit instead of paying within 10 days.", explanation: "7,800 × 3% = 234." }),
      P.match({ label: "(d)", stem: "Match each feature to the source of finance.", pairs: ["Can be withdrawn by the bank at short notice", "Cannot normally be repaid early", "Costs nothing if paid within the period allowed"], right: ["Overdraft", "One-year loan", "Trade credit"], rightIndex: [0, 1, 2], explanation: "An overdraft is repayable on demand; the loan is for a fixed term; trade credit is free within the credit period." }),
      P.manual({ label: "(e)", marks: 5, stem: "Evaluate the three options and recommend one to Mutasa.", points: ["Overdraft: 208 for two months, flexible, but repayable on demand", "Loan: 858, much more expensive for a two-month need because it runs for a year", "Trade credit: costs 234 in discount lost but needs no borrowing and no security", "Compares the costs: the overdraft is cheapest in cash, trade credit slightly dearer but safer", "A recommendation consistent with the figures and the risk, for example the overdraft if the bank facility is secure, otherwise trade credit"], modelAnswer: "The overdraft costs 208 for two months, the loan 858 and trade credit 234 in discount lost. The loan is too expensive for a two-month need. The overdraft is cheapest and flexible but the bank can withdraw it; trade credit costs a little more but is safe and needs no security. I recommend the overdraft if the bank limit is confirmed, with trade credit as a back-up.", explanation: "Use all three costs and weigh risk before the recommendation." }),
    ],
    hints: ["Calculate each cost for the period actually needed.", "Remember that the loan cannot be repaid early."],
    explanation: "This item tests costing and choosing among short-term sources of finance.",
  });

  b.card("DEFINITION", "What is a **bank overdraft**?", "Permission to overdraw an account up to a limit; interest is charged on the overdrawn amount and the bank can demand repayment at short notice.");
  b.card("DEFINITION", "What is a **secured loan**?", "A loan for which the lender has a claim on a named asset if the borrower defaults.");
  b.card("DEFINITION", "What is **trade credit**?", "Time allowed by a supplier to pay for goods; free within the period, often with a discount for earlier payment.");
  b.card("CONCEPT", "Leasing and ownership", "The lessor keeps ownership; the business pays for the use of the asset and owns nothing at the end.");
  b.card("CONCEPT", "Payment by instalments", "The price is paid in parts; ownership passes after the last instalment; the total paid exceeds the cash price.");
  b.card("CONCEPT", "Matching finance to need", "Short-term needs (stock, temporary cash gaps): overdraft or trade credit. Long-term assets: loan, instalments or leasing.");
  b.card("FACT", "Main risk of an overdraft", "It is repayable on demand: the bank can withdraw it at short notice.");
  b.card("FORMULA", "Overdraft interest", "Amount overdrawn × annual rate × (months ÷ 12).");
  b.card("FACT", "Cost of trade credit", "The discount lost by not paying within the discount period.");
});
