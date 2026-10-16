// W4a: finance.sources-internal (both ZIMSEC syllabi and Cambridge AS)
// Conventions: receivables = credit sales x days / 365; retained earnings = profit after tax - drawings or dividends.
import { concept, P, table, money, chk, r2, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.finance.sources-internal", { file: "finance/sources-internal", keyPrefix: "finance.sources-internal" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an **internal** source of finance?",
    ok: ["Retained profit", "Correct: profit kept in the business comes from within it."],
    bad: [["A bank loan", "A bank loan comes from an outside lender."], ["Issuing new shares to the public", "New shares bring in outside investors."], ["Government grants", "A grant comes from outside the business."]],
    explanation: "Retained profit, the owner's own funds, selling assets and releasing working capital are internal sources.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What happens in a **sale and leaseback** of a building?",
    ok: ["The business sells it and then rents it back", "Correct: it receives cash and continues to use the building."],
    bad: [["The business buys a second building", "Buying a building uses cash rather than raising it."], ["The business borrows against its shares", "That is a loan, not a sale and leaseback."], ["The owner gives the building to the bank", "Giving away the building raises no money."]],
    explanation: "In a sale and leaseback the asset is sold for cash and then leased back, so the business keeps using it in return for rent.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a **disadvantage** of financing a purchase from retained profit?",
    ok: ["Less profit is available for the owners", "Correct: money kept in the business cannot be taken as income."],
    bad: [["Interest must be paid every month", "Retained profit carries no interest."], ["The lender takes control of the business", "There is no lender involved."], ["The money must be repaid in a year", "Retained profit does not have to be repaid."]],
    hints: ["Who would otherwise receive the profit?"],
    explanation: "Retained profit is not paid out, so owners receive less income now. It has no interest or repayment.",
  });
  const retained = 36500 - 15000;
  chk(retained, 21500);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional tuck-shop supplier in Masvingo earns a profit after tax of US\\$36,500. It pays US\\$15,000 in dividends to its owners. How much profit is retained?",
    ok: [money(retained), "Correct: 36,500 - 15,000."],
    bad: [[money(36500), "That is the whole profit, before the dividends are paid."], [money(15000), "That is the dividend paid out, not the profit retained."], [money(51500), "That adds the dividend instead of subtracting it."]],
    hints: ["Retained profit is what is left after the owners are paid."],
    explanation: "Retained profit = profit after tax - dividends = 36,500 - 15,000 = US\\$21,500.",
  });
  const rel = 219000 * 60 / 365 - 219000 * 40 / 365;
  chk(rel, 12000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional wholesaler in Harare has credit sales of US\\$219,000 a year. Customers take 60 days to pay, and the wholesaler's credit control reduces this to 40 days. Use a 365-day year. How much cash is released from trade receivables?",
    ok: [money(rel), "Correct: receivables fall from 36,000 to 24,000."],
    bad: [[money(36000), "That is the original level of receivables, not the cash released."], [money(24000), "That is the new level of receivables, not the amount released."], [money(20000), "That treats the 20 days as thousands of dollars, which ignores sales."]],
    hints: ["Receivables = credit sales × days ÷ 365; find the level at 60 and at 40 days."],
    explanation: "Receivables at 60 days = 219,000 × 60 ÷ 365 = 36,000. At 40 days = 219,000 × 40 ÷ 365 = 24,000. Cash released = US\\$12,000.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional sole trader in Gweru wants US\\$50,000 for a new workshop. She has no spare assets and makes a small profit. What is the main limitation on using internal finance?",
    ok: ["Amount available is small against the need", "Correct: small profits and no spare assets limit what can be raised internally."],
    bad: [["Internal finance always carries high interest", "Internal finance usually carries no interest."], ["Internal finance requires the lender's permission", "Internal finance does not involve a lender."], ["Internal finance cannot be used for buildings", "It can be used for any purpose if enough is available."]],
    hints: ["Think about how much she can raise from herself."],
    explanation: "Internal finance is limited by the owner's wealth, the profit made and the assets that can be spared. A small business may not raise US\\$50,000 this way.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional hotel owner in Bulawayo needs cash quickly and is thinking about a sale and leaseback of the hotel building. Which is the **strongest** argument against doing so?",
    ok: ["Rent goes on and any rise in value is lost", "Correct: the cash is received once but the costs continue."],
    bad: [["The hotel can no longer use the building", "The building continues to be used under the lease."], ["Cash cannot be raised from a building", "A sale raises a lump sum from the building."], ["The hotel must repay the lump sum with interest", "A sale does not need to be repaid; the cost is the rent."]],
    hints: ["Compare the one-off gain with the continuing cost."],
    explanation: "Sale and leaseback gives a large sum, but the business pays rent for years and the buyer, not the hotel, gains if property values rise.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Internal sources of finance have no cost to the business.",
    answer: false,
    explanation: "False. They often carry no interest, but there is an opportunity cost: the owner could use the money elsewhere or take it as income.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of finance to its description.",
    pairs: [["Owner's investment", "The owner puts personal savings into the business"], ["Retained earnings", "Profit kept in the business instead of paid out"], ["Sale of unwanted assets", "Spare equipment or property is sold for cash"], ["Sale and leaseback", "An asset is sold and rented back for continued use"]],
    explanation: "Each source raises money from within the business or its owners.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Profit kept in the business is called {{blank:a}} earnings. Selling an asset and renting it back is called sale and {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["retained"], choices: ["retained", "borrowed", "gross"] },
      { id: "b", accepted: ["leaseback"], choices: ["leaseback", "purchase", "factoring"] },
    ],
    explanation: "Retained earnings are kept profits; sale and leaseback sells and rents back an asset.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** advantage of using the owner's own savings to finance a business.",
    accepted: ["no interest to pay", "no interest", "no repayment", "no need to repay", "owner keeps control", "keeps control", "no outside lenders", "no security needed", "quick to arrange", "cheap", "no cost of borrowing", "no outsiders"],
    explanation: "Accept: no interest or repayment, control is kept, no security or outside lender, or it is quick to arrange.",
  });

  const g = r2(9200 - 7500);
  chk(g, 1700);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: g, calculator: true, wrong: [9200, 7500],
    stem: "A fictional transport firm in Mutare sells a spare lorry for US\\$9,200. The lorry's book value was US\\$7,500. Calculate the profit on the sale.",
    hints: ["Profit on sale = selling price - book value."],
    explanation: "9,200 - 7,500 = US\\$1,700. The whole US\\$9,200 is the cash raised, but only US\\$1,700 is profit on sale.",
  });
  const cut = 45000 * 0.2;
  chk(cut, 9000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: cut, calculator: true, daily: true, wrong: [36000, 45000],
    stem: "A fictional furniture shop in Chinhoyi holds average stock of US\\$45,000. It plans to cut its stock by 20%. Calculate the cash released.",
    hints: ["Find 20% of the stock."],
    explanation: "45,000 × 20% = US\\$9,000. The remaining stock would be US\\$36,000.",
  });
  const rent = 7200, price = 80000;
  const pctRent = r2((rent / price) * 100);
  chk(pctRent, 9);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: pctRent, calculator: true, wrong: [11.1, 90],
    stem: "A fictional lodge sells a building for US\\$80,000 and leases it back at US\\$7,200 a year. Calculate the annual rent as a percentage of the sale price, to one decimal place.",
    hints: ["Annual rent ÷ sale price × 100."],
    explanation: "7,200 ÷ 80,000 × 100 = 9.0%. Over ten years the rent would total US\\$72,000, which is 90% of the sale price.",
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: 55000 - sum([21500, 12000, 9000]), calculator: true, wrong: [42500, 55000],
    stem: "A fictional bakery in Gweru expects to retain US\\$21,500 of profit this year, release US\\$12,000 from trade receivables and US\\$9,000 by cutting stock. It also owns a spare van it can sell for US\\$6,000. It needs US\\$55,000 for a new oven. Calculate the shortfall if it uses the retained profit and released working capital but does not sell the van.",
    hints: ["Add the sources it will use, then subtract from the need."],
    explanation: "Sources used = 21,500 + 12,000 + 9,000 = 42,500. Shortfall = 55,000 - 42,500 = US\\$12,500. The figure 42,500 is the finance raised, not the shortfall.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by retained earnings.",
    points: ["Profit after tax that is kept in the business", "It is not paid out to the owners as drawings or dividends", "It can be used to finance assets or growth without borrowing"],
    modelAnswer: "Retained earnings are the profit after tax that is kept in the business rather than paid out to owners as drawings or dividends. They can be used to finance assets or growth without borrowing.",
    hints: ["What happens to the profit that is not paid out?"],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional school production unit in Harare wants to buy a new printing machine. Explain two internal sources of finance it could use.",
    points: ["Retained profit from the sale of printed material", "Application: profit kept from last term's printing instead of being paid to the school", "Selling an old or spare machine", "Application: the unit's old press could be sold for cash towards the new one"],
    modelAnswer: "The unit could use retained profit from printing sales, keeping last term's surplus instead of paying it to the school. It could also sell its old press, which would give cash towards the new machine.",
    hints: ["Link each source to the unit's printing work."],
    explanation: "Two sources, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why releasing working capital may be a risky way to raise finance.",
    points: ["Cutting stock may leave the business unable to meet orders", "Customers may be lost if they cannot buy what they want", "Pressing customers to pay sooner may drive them to competitors", "Delaying payments to suppliers may damage relations or lose discounts"],
    modelAnswer: "Cutting stock may leave the business unable to meet orders, so customers may be lost. Pressing customers to pay sooner may drive them to competitors, and delaying payment to suppliers may damage relations or lose discounts.",
    hints: ["Think about customers and suppliers."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional partnership of three farmers near Masvingo needs US\\$25,000 for an irrigation system. Assess whether it should use retained profit.",
    points: ["Retained profit carries no interest and no repayment", "The partners keep control and need no outside lender", "The profit may not be large enough to raise US\\$25,000 quickly", "Partners will have less income in the meantime", "Counter-argument: the irrigation system may raise future profit by more than the income given up", "Judgement with a reason, for example use retained profit over two seasons, or combine it with a small loan"],
    modelAnswer: "Retained profit carries no interest or repayment and the partners keep full control. But the profit may not be large enough to raise US\\$25,000 quickly, and the partners will have less income in the meantime. The irrigation system may raise future profit by more than the income given up. The partners should retain profit over two seasons, or combine it with a small loan if the system is needed sooner.",
    hints: ["Weigh the cost-free nature against the amount and the time needed."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const sale = 54000, bv = 46000, rentY = 5400;
  chk(r2(sale - bv), 8000);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional safari lodge near Hwange has a workshop building with a book value of ${money(bv)}. It sells the building for ${money(sale)} and leases it back at ${money(rentY)} a year.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: sale - bv, wrong: [sale, bv], stem: "Calculate the profit on the sale of the building.", explanation: "54,000 - 46,000 = US\\$8,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: rentY * 8, wrong: [rentY, 54000], stem: "Calculate the total rent paid over eight years.", explanation: "5,400 × 8 = US\\$43,200." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain one advantage and one disadvantage to the lodge of a sale and leaseback.", points: ["Advantage: a large sum of cash is received at once", "Application: US\\$54,000 is available for new tents or vehicles", "The lodge can still use the workshop", "Disadvantage: rent must be paid every year", "Application: US\\$5,400 a year for as long as the lease lasts, and any rise in the building's value goes to the buyer"], modelAnswer: "A sale and leaseback gives the lodge US\\$54,000 at once, which it can use for new tents or vehicles, and it can keep using the workshop. However, it must pay US\\$5,400 in rent every year for as long as the lease lasts, and any rise in the building's value goes to the buyer.", explanation: "One advantage and one disadvantage, applied." }),
    ],
    hints: ["Profit = selling price - book value.", "Rent over a number of years = annual rent × years."],
    explanation: "Profit on sale US\\$8,000; rent over eight years US\\$43,200; advantage and disadvantage applied.",
  });

  // Practice structured 2 (14 marks)
  const profit = 58000, draw = 22000, stock = 84000, cutPct = 0.25, rec = 30000, recCut = 6000, need = 61000;
  const ret = profit - draw, stk = stock * cutPct, total = ret + stk + recCut;
  chk(ret, 36000); chk(stk, 21000); chk(total, 63000);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional hardware business in Bulawayo wants ${money(need)} to open a second shop. It made a profit after tax of ${money(profit)} this year and the owner takes drawings of ${money(draw)}. Average stock is ${money(stock)} and the owner believes it can be cut by ${cutPct * 100}% without losing sales. Trade receivables are ${money(rec)} and could be reduced by ${money(recCut)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: ret, wrong: [profit, draw], stem: "Calculate the profit that can be retained.", explanation: "58,000 - 22,000 = US\\$36,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: stk, wrong: [63000, 84000], stem: "Calculate the cash released by cutting stock.", explanation: "84,000 × 25% = US\\$21,000." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: total, wrong: [ret + stk, need], stem: "Calculate the total finance available from these internal sources (retained profit, stock and receivables).", explanation: "36,000 + 21,000 + 6,000 = US\\$63,000, which is US\\$2,000 more than the US\\$61,000 needed." }),
      P.manual({ label: "(d)", marks: 8, stem: "Evaluate whether the owner should rely only on internal finance for the second shop.", points: [["Total of US\\$63,000 exceeds the US\\$61,000 needed, so no outside borrowing is needed on paper", 1], ["No interest is paid and the owner keeps full control", 1], ["The retained profit is earned over a year, so the shop cannot open at once", 1], ["Cutting stock by 25% may cause stock-outs and lost sales in the existing shop, and the new shop also needs stock", 2], ["The margin of US\\$2,000 is small, so any overspend would need a loan", 1], ["Counter-argument: using internal funds leaves no cash reserve; a bank overdraft as a back-up could reduce the risk", 1], ["Judgement with a reason: use internal finance but keep an overdraft facility", 1]], levels: [[3, 6, 8, "Figures used with the case; benefits and risks weighed; a justified judgement"], [2, 3, 5, "Some use of figures and some weighing; judgement weakly supported"], [1, 1, 2, "General statements about internal finance"]], modelAnswer: "The internal sources total US\\$63,000, which is just above the US\\$61,000 needed, so no loan is needed on paper, there is no interest and the owner keeps control. However, the profit is earned over a year so the shop cannot open at once, and cutting stock by 25% could lead to stock-outs and lost sales, while the new shop also needs stock. The margin of US\\$2,000 is small and leaves no cash reserve. The owner should use internal finance but keep an overdraft facility as a back-up.", hints: ["Use the total of internal sources and compare it with the need, then think about timing and risk."], explanation: "Weighs the adequacy of the funds against timing and the risk to the existing shop." }),
    ],
    hints: ["Retained profit = profit after tax - drawings.", "Stock released = stock × the percentage cut."],
    explanation: "Retained US\\$36,000; stock US\\$21,000; total US\\$63,000; a judgement on relying on internal finance.",
  });

  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional family-run bakery in Gweru has traded for 12 years. The owner wants to buy a US\\$35,000 packaging machine that will last ten years. The bakery has US\\$8,000 in savings, a spare delivery van worth US\\$7,000 and last year's retained profit of US\\$15,000. A local microfinance lender has offered a loan at a high rate of interest. The owner is cautious and does not want to lose control of the business.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify three internal sources of finance that the bakery could use.", points: ["The owner's savings", "The sale of the spare van", "Retained profit"], modelAnswer: "The bakery could use the owner's savings, the sale of the spare van and the retained profit.", explanation: "One mark for each source named." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse why the bakery's internal sources are suited to buying a machine that lasts ten years.", points: ["The machine is a long-term need that does not have to be repaid soon", "Application: retained profit and savings need not be repaid", "No interest is paid on internal funds", "Application: the bakery avoids the microfinance lender's high interest"], modelAnswer: "The machine is a long-term need, and retained profit and savings do not have to be repaid. No interest is paid on internal funds, so the bakery avoids the microfinance lender's high interest.", explanation: "Linked to the case." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the bakery should use only internal sources to buy the machine.", points: [["Total of internal sources = 8,000 + 7,000 + 15,000 = US\\$30,000, which is US\\$5,000 short", 2], ["Using all of them would leave the bakery with no cash reserve", 2], ["The van may be needed for deliveries, or may be sold at a low price", 1], ["The shortfall of US\\$5,000 could be met by a small loan or a cheaper machine, but the lender's rate is high", 1], ["Counter-argument: the owner wants to retain control, which internal sources protect", 1], ["Judgement with a reason: use most internal funds, but keep a reserve and borrow a small amount or seek a cheaper machine", 1]], levels: [[3, 6, 8, "Figures used with the case; advantages and risks weighed; a justified judgement"], [2, 3, 5, "Some use of figures and some weighing; judgement weakly supported"], [1, 1, 2, "General statements about internal finance"]], modelAnswer: "Internal sources total US\\$30,000, which is US\\$5,000 short of the price, so the bakery cannot rely on them alone. Using them all would leave no cash reserve, and the van may be needed for deliveries. Internal funds protect the owner's control and avoid interest, but the shortfall would need a small loan, which at the microfinance lender's rate is expensive. The owner should use most of the internal funds but keep a reserve and either borrow a small amount more cheaply or choose a cheaper machine.", hints: ["Add the internal sources and compare with the price.", "Think about what the bakery would have left."], explanation: "Weighs the shortfall, the lack of a reserve and the owner's wish to keep control." }),
    ],
    hints: ["Use the figures in the extract."],
    explanation: "Three internal sources; why they suit a long-term need; a judgement on relying only on them.",
  });

  b.card("DEFINITION", "Internal source of finance", "Money raised from within the business or its owners: the owner's funds, retained earnings, asset sales and released working capital.");
  b.card("DEFINITION", "Retained earnings (ploughed-back profit)", "Profit after tax kept in the business instead of being paid out as drawings or dividends.");
  b.card("DEFINITION", "Sale and leaseback", "Selling a non-current asset for cash and leasing it back, so it can still be used for a rent.");
  b.card("FACT", "Advantages of internal finance", "No interest, no repayment, no outside lenders, control is kept and it is quick to arrange.");
  b.card("FACT", "Limits of internal finance", "Limited by the owner's wealth, past profit and spare assets; opportunity cost; owners receive less income.");
  b.card("CONCEPT", "Releasing working capital", "Cutting stock, collecting debts sooner or delaying payments frees cash without borrowing, but risks stock-outs and lost goodwill.");
  b.card("CONCEPT", "Matching source to need", "Short-term needs: released working capital, selling spare assets. Long-term needs: owner's funds, retained profit, sale and leaseback.");
  b.card("FORMULA", "Retained profit", "Retained profit = profit after tax - drawings or dividends.");
  b.card("CONCEPT", "Evaluating internal finance", "Compare the amount available with the need, the time it takes to raise, the opportunity cost and the risk to the existing business.");
});
