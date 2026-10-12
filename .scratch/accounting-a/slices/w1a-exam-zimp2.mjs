// W1a exam-format items: ZIMSEC Paper 2 structured questions (25 marks each), EXAM.ZIM_P2_STRUCT
import { concept, P, EXAM, checkExam, ZIM, table, check, sum, r2, fmt, money, ratios, chk } from "../lib.mjs";
import { tAcct } from "../tables/w1a-lib.mjs";

concept("aacc.ledger.accruals-prepayments", { file: "exam/w1a-zimp2", keyPrefix: "exam.w1a-zimp2", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------------------------------------------------------
  // Item 1: ledger accounts with accruals, prepayments and irrecoverable debts
  const rentMonthly = 460;
  const rentOpen = 460;
  const rentPaid = 5980;
  const rentClose = r2(rentMonthly * 2);
  const rentExp = r2(rentOpen + rentPaid - rentClose);
  check("rentExp", rentExp, 5520);
  const wPaid = 41600;
  const wOpen = 1240;
  const wClose = 1560;
  const wExp = r2(wPaid - wOpen + wClose);
  check("wExp", wExp, 41920);
  const insPaid = 3600;
  const insOpen = 1710;
  const insClose = r2((insPaid * 6) / 12);
  const insExp = r2(insOpen + insPaid - insClose);
  check("insExp", insExp, 3510);
  const cRec = 2960;
  const cOpen = 180;
  const cClose = 270;
  const cInc = r2(cRec - cOpen + cClose);
  check("cInc", cInc, 3050);
  const recvBefore = 39200;
  const w1 = 900;
  const w2 = 650;
  const recovered = 250;
  const remaining = r2(recvBefore - w1 - w2);
  const allowance = r2(remaining * 0.05);
  const allowOpen = 1170;
  const allowInc = r2(allowance - allowOpen);
  const idExp = r2(w1 + w2 - recovered + allowInc);
  check("remaining", remaining, 37650);
  check("allowance", allowance, 1882.5);
  check("allowInc", allowInc, 712.5);
  check("idExp", idExp, 2012.5);
  const wagesAcc = tAcct(
    "Wages account",
    [["Various", "Bank", wPaid], ["31 Dec", "Accrued c/d", wClose]],
    [["1 Jan", "Accrued b/d", wOpen], ["31 Dec", "Income statement", wExp]],
    { side: "cr", date: "1 Jan 2026", details: "Accrued b/d", amount: wClose },
  );
  const data1 = table(
    ["Item", "Paid or received in 2025 (US\\$)", "At 1 January 2025", "At 31 December 2025"],
    [
      ["Rent (US\\$460 a month)", rentPaid, "460 prepaid", "to be calculated"],
      ["Wages", wPaid, "1,240 owing", "1,560 owing"],
      ["Insurance (annual premium paid on 1 July 2025 covering the twelve months to 30 June 2026)", insPaid, "1,710 prepaid", "to be calculated"],
      ["Commission received", cRec, "180 accrued", "270 accrued"],
    ],
    ["l", "r", "l", "l"],
  );
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, calculator: true, applies: ZIM, paper: "ZIMSEC Paper 2",
    concepts: ["aacc.ledger.accruals-prepayments", "aacc.ledger.irrecoverable-debts"],
    stem: `Moyo's Hardware, Gweru, is owned by Tendai Moyo. The financial year ends on 31 December 2025. The rent payments of ${money(rentPaid)} made during 2025 included January and February 2026.\n\n` + data1 + `\n\nTrade receivables (debtors) in the ledger at 31 December 2025, before any adjustment, were ${money(recvBefore)}. The following adjustments are to be made:\n\n- Bad debts of ${money(w1)} and ${money(w2)} are to be written off.\n- Bad debts of ${money(recovered)} previously written off were recovered in December and credited to bad debts recovered.\n- The allowance for doubtful debts is to be 5% of the remaining trade receivables. The allowance account had a balance of ${money(allowOpen)} at 1 January 2025.\n\nUse the income statement as the name for the statement of profit and loss.`,
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.group({
        label: "(a)", stem: "Rent",
        parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: rentClose, wrong: [rentOpen], stem: "Calculate the rent prepaid at 31 December 2025.", explanation: "January and February 2026 are two months: 2 × 460 = 920." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: rentExp, wrong: [rentPaid, r2(rentPaid + rentOpen)], stem: "Calculate the rent expense for 2025.", explanation: "460 + 5,980 - 920 = 5,520 (twelve months at 460)." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Wages",
        parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: wExp, wrong: [r2(wPaid + wOpen + wClose), r2(wPaid + wOpen - wClose)], stem: "Calculate the wages expense for 2025.", explanation: "41,600 - 1,240 + 1,560 = 41,920." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Where is the accrued wages of US\\$1,560 shown in the statement of financial position?", options: [["Other payables within current liabilities", "Correct: it is owed at the year end."], ["Other receivables within current assets", "That heading is for amounts prepaid or owed to the business."], ["Deducted from capital", "Accruals are liabilities, not deductions from capital."], ["Added to non-current assets", "Wages are not an asset."]], answer: "A", explanation: "An accrued expense is a current liability." }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Insurance",
        parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: insClose, wrong: [insPaid, r2((insPaid * 4) / 12)], stem: "Calculate the insurance prepaid at 31 December 2025.", explanation: "The premium covers 12 months to 30 June 2026; six months (January to June 2026) are prepaid: 3,600 × 6/12 = 1,800." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: insExp, wrong: [insPaid, r2(insPaid - insOpen)], stem: "Calculate the insurance expense for 2025.", explanation: "1,710 + 3,600 - 1,800 = 3,510." }),
        ],
      }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: cInc, wrong: [cRec, r2(cRec + cOpen + cClose)], stem: "Calculate the commission received to be credited to the income statement for 2025.", explanation: "2,960 - 180 + 270 = 3,050." }),
      P.group({
        label: "(e)", stem: "Bad debts and the allowance",
        parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: remaining, wrong: [recvBefore], stem: "Calculate the trade receivables remaining after the write-offs.", explanation: "39,200 - 900 - 650 = 37,650." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: allowance, wrong: [r2(recvBefore * 0.05)], stem: "Calculate the allowance for doubtful debts required at 31 December 2025.", explanation: "5% × 37,650 = 1,882.50." }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: allowInc, wrong: [allowance], stem: "Calculate the increase in the allowance to be charged to the income statement.", explanation: "1,882.50 - 1,170 = 712.50." }),
          P.num({ label: "(iv)", marks: 2, kind: "money", value: idExp, wrong: [r2(w1 + w2 + recovered + allowInc), r2(w1 + w2 + allowInc)], stem: "Calculate the total bad debts expense in the income statement: write-offs, less the recovery, plus the increase in the allowance.", explanation: "900 + 650 - 250 + 712.50 = 2,012.50. Adding the recovery gives 2,512.50." }),
        ],
      }),
      P.manual({ label: "(f)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the wages account for the year ended 31 December 2025, balanced and with the balance brought down.", points: ["Bank 41,600 and accrued c/d 1,560 on the debit side", "Accrued b/d 1,240 and income statement 41,920 on the credit side", "Totals 43,160 on both sides and balance b/d 1,560 brought down on the credit side"], modelAnswer: wagesAcc, explanation: "The closing accrual is carried down on the debit side and brought down on the credit side." }),
      P.manual({ label: "(g)", marks: 2, stem: "Explain how the matching concept is applied when an accrual for wages is made.", points: ["Wages are charged to the year in which the staff worked, not the year of payment", "The unpaid amount is shown as a liability so profit is not overstated"], modelAnswer: "The staff worked in 2025, so their wages are an expense of 2025 even though they are paid in 2026. The unpaid amount is shown as a liability, so profit is not overstated.", explanation: "Link the cost to the period of the work and say where the amount is shown." }),
    ]),
    hints: ["Work account by account: the formula for each expense or income is cash paid or received adjusted by the opening and closing balances.", "Write off the bad debts before taking the 5%."],
    explanation: "This item tests ledger adjustments for accruals, prepayments, bad debts and the allowance.",
  });

  // ------------------------------------------------------------------------------------------------------------------
  // Item 2: business entities with a finance choice
  const capEach = 45000;
  const shareCap = r2(capEach * 2);
  const reserves = 20000;
  const need = 160000;
  const rate = 10;
  const pbit = 64000;
  const failAssets = 104000;
  const failDebts = 158000;
  const shortfall = r2(failDebts - failAssets);
  const eachPartner = r2(shortfall / 2);
  const interest = r2((need * rate) / 100);
  const gear1 = ratios.gearing(need, shareCap, reserves);
  const cover1 = pbit / interest;
  const profAfter = r2(pbit - interest);
  const vote2 = (capEach / (shareCap + need)) * 100;
  check("shortfall", shortfall, 54000);
  check("eachPartner", eachPartner, 27000);
  check("interest", interest, 16000);
  chk(gear1, 59.2593, 0.001);
  chk(cover1, 4, 0.0001);
  check("profAfter", profAfter, 48000);
  chk(vote2, 18, 0.0001);
  b.struct({
    d: 5, examStyle: true, skill: EXAM.ZIM_P2_STRUCT.skill, secs: EXAM.ZIM_P2_STRUCT.secs, calculator: true, applies: ZIM, paper: "ZIMSEC Paper 2",
    concepts: ["aacc.intro.business-entities", "aacc.capital.sources-of-capital"],
    stem: `Tafara and Farai run a bakery in Masvingo as a partnership. They share profits and losses equally and each has capital of ${money(capEach)}. They want to open a second bakery and need ${money(need)}. They are considering forming a private limited company with ordinary shares of US$1 each. The two founders would take ${shareCap.toLocaleString("en-GB")} shares in exchange for the partnership's capital, and the company would start with reserves of ${money(reserves)}.\n\nThey have two ways to raise the ${money(need)}:\n\n- **Option 1:** issue ${rate}% loan notes of ${money(need)}.\n- **Option 2:** issue ${need.toLocaleString("en-GB")} new ordinary shares of US$1 at par to outside investors.\n\nExpected profit before interest for the new business is ${money(pbit)} a year.`.replace(/US\$1 /g, "US\\$1 ").replace(/US\$1\./g, "US\\$1."),
    parts: checkExam(EXAM.ZIM_P2_STRUCT, [
      P.group({
        label: "(a)", stem: `Suppose the business fails, with assets that realise ${money(failAssets)} and debts of ${money(failDebts)}.`,
        parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: shortfall, wrong: [failDebts], stem: "Calculate the shortfall owed to creditors.", explanation: "158,000 - 104,000 = 54,000." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: eachPartner, wrong: [shortfall], stem: "As a partnership, calculate the amount each partner would have to find from private assets (equal shares).", explanation: "54,000 ÷ 2 = 27,000." }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: 0, wrong: [eachPartner], stem: "As a private company with fully paid shares, calculate the amount each shareholder must contribute towards the shortfall.", explanation: "Nil. Shareholders' liability is limited to the amount unpaid on their shares." }),
        ],
      }),
      P.mcq({ label: "(b)", marks: 2, stem: "Which of the following is a feature of a private limited company?", options: [["Its shares are not offered to the public", "Correct: this distinguishes it from a public company."], ["Its owners have unlimited liability", "Shareholders have limited liability."], ["It ends when a shareholder dies", "A company continues in spite of changes of shareholders."], ["It is not a separate legal person", "A company is a separate legal person."]], answer: "A", explanation: "A private company may not offer shares to the public." }),
      P.group({
        label: "(c)", stem: "Option 1: loan notes",
        parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: interest, wrong: [r2(need * 0.012)], stem: "Calculate the annual interest on the loan notes.", explanation: "10% × 160,000 = 16,000." }),
          P.num({ label: "(ii)", marks: 3, kind: "pct", value: gear1, tol: 0.06, wrong: [r2((need / (shareCap + reserves)) * 100)], stem: "Calculate the gearing ratio (non-current liabilities ÷ (share capital + reserves + non-current liabilities)) as a percentage to one decimal place.", explanation: "160,000 ÷ (90,000 + 20,000 + 160,000) × 100 = 59.3%." }),
          P.num({ label: "(iii)", marks: 2, kind: "times", dp: 1, value: cover1, wrong: [r2(interest / pbit)], stem: "Calculate the interest cover (profit before interest ÷ interest), to one decimal place.", explanation: "64,000 ÷ 16,000 = 4.0 times." }),
        ],
      }),
      P.num({ label: "(d)", marks: 2, kind: "pct", value: vote2, wrong: [r2((capEach / shareCap) * 100)], stem: "Under Option 2, calculate the percentage of the votes held by each founder (one vote per share; each founder holds 45,000 shares), to one decimal place.", explanation: "Total shares 90,000 + 160,000 = 250,000. 45,000 ÷ 250,000 × 100 = 18.0%." }),
      P.manual({ label: "(e)", marks: 5, stem: "Advise the partners which option to choose. Use the figures you have calculated and refer to control, risk and cost.", points: ["Option 1 costs interest of 16,000 a year, which leaves profit before tax of 48,000 and must be paid even in a poor year", "Gearing of 59.3% is high, so lenders and the business carry greater risk; interest cover of 4.0 times is reasonable", "Option 2 has no fixed commitment and gearing of nil, so is safer in a poor year", "Option 2 reduces each founder to 18% of the votes (36% together), so control is diluted and new shareholders share dividends", "A reasoned recommendation, such as Option 1 if profits are stable and control is important, otherwise Option 2"], modelAnswer: "Option 1 keeps full control with the founders but costs 16,000 a year in interest, leaving 48,000 of profit before tax. Gearing would be 59.3%, which is high, although interest cover of 4.0 times shows the interest is affordable. Option 2 avoids fixed payments and leaves gearing at nil, but the founders' votes fall to 36% together and profits are shared. If the profits are stable and the partners want control I would advise Option 1; if they fear a poor year Option 2 is safer.", explanation: "One mark per point; the recommendation must be consistent with the figures." }),
      P.manual({ label: "(f)", marks: 3, stem: "Explain why the partners may wish to become a limited company.", points: ["Limited liability protects their private assets if the business fails", "The company is a separate legal entity and continues if an owner leaves or dies", "Shares can be issued to raise capital from outside investors"], modelAnswer: "A company gives them limited liability, so their private assets are safe if the business fails. It is a separate legal entity that continues when an owner leaves, and it can issue shares to raise capital.", explanation: "Three benefits, one mark each." }),
    ]),
    hints: ["Limited liability means shareholders do not pay the shortfall from private assets.", "Gearing = loan notes ÷ (shares + reserves + loan notes)."],
    explanation: "This item tests the forms of business and the choice of long-term finance.",
  });
});
