// W2b: acquisition.purchaser-books
import { concept, P, money, fmt, chk, r2, sum, journal, ratios } from "../lib.mjs";
import { mc, U } from "../tables/w2b-lib.mjs";

concept("aacc.acquisition.purchaser-books", { file: "acquisition/purchaser-books", keyPrefix: "acquisition.purchaser-books" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which temporary ledger account is credited with the purchase consideration when a company takes over a business?",
    right: ["Business purchase account", "Correct: it is credited with the price and cleared when the price is settled."],
    wrong: [["Realisation account", "This is the vendor's account, not the purchaser's."], ["Goodwill account", "Goodwill is an asset, not the account that holds the price."], ["Suspense account", "A suspense account holds unexplained differences."]],
    explanation: "The purchaser uses a business purchase account; the vendor uses a realisation account.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When is goodwill debited in the purchasing company's journal?",
    right: ["When the consideration is greater than the net assets at agreed values", "Correct: the excess is bought goodwill."],
    wrong: [["When the consideration is less than the net assets at agreed values", "A price below the net assets gives a bargain purchase gain."], ["Whenever shares are issued as part of the price", "The form of payment does not decide whether goodwill arises."], ["Whenever the seller's book values are higher than the agreed values", "Book values do not determine goodwill in the buyer's books."]],
    explanation: "Goodwill = consideration − net assets. It is debited when positive.",
  });
  const q3 = { n: 24000, price: 1.75 };
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: `A company issues ${fmt(q3.n)} ordinary shares of US\\$1 each at US\\$1.75 as part of the consideration. What is credited to share premium?`,
    right: [money(q3.n * 0.75), "Correct: 24,000 × 0.75."],
    wrong: [[money(q3.n), "This is the share capital at nominal value."], [money(q3.n * q3.price), "This is the whole value of the issue."], [money(q3.n * 1.25), "This uses 1.25 per share instead of the premium of 0.75."]],
    hints: ["Premium per share is the issue price less the nominal value."],
    explanation: "Share capital 24,000; share premium 24,000 × (1.75 − 1.00) = 18,000.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In the first journal of a business purchase, which of the following is credited?",
    right: ["The liabilities taken over and the business purchase account", "Correct: liabilities and the price are credits."],
    wrong: [["The assets taken over and the goodwill that arises", "Assets and goodwill are debits."], ["Share capital and share premium on the shares issued", "These are credited in the second journal, when the price is settled."], ["Bank and the loan notes given to the seller", "These are also entries of the second journal."]],
    hints: ["Which entries settle the price?"],
    explanation: "Journal 1: debit assets and goodwill; credit liabilities and the business purchase account.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Net assets at agreed values are US\\$84,000 and the purchase consideration is US\\$78,000. Which entry is made in the first journal?",
    right: ["Credit gain on bargain purchase US\\$6,000", "Correct: the price is below the net assets, which is a gain."],
    wrong: [["Debit goodwill US\\$6,000", "Goodwill arises only when the price exceeds the net assets."], ["Debit gain on bargain purchase US\\$6,000", "A gain is a credit."], ["Credit goodwill US\\$6,000", "Goodwill is an asset and is never credited in this way."]],
    hints: ["Compare the price with the net assets."],
    explanation: "84,000 − 78,000 = 6,000 gain, credited in the journal.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How does the purchase of a business for shares at a premium affect the retained earnings of the purchasing company on the date of the purchase?",
    right: ["It has no effect", "Correct: no profit has been made; the shares add to share capital and share premium."],
    wrong: [["It increases them by the share premium", "Share premium is a separate reserve."], ["It increases them by the goodwill recorded", "Goodwill is an asset and does not create profit."], ["It decreases them by the loan notes issued", "Loan notes are liabilities and do not reduce retained earnings."]],
    hints: ["Has the company earned anything yet?"],
    explanation: "The purchase changes assets, liabilities, share capital and share premium, not retained earnings.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Loan notes issued as part of the consideration are shown in the statement of financial position as:",
    right: ["A non-current liability", "Correct: they are repayable after more than one year."],
    wrong: [["Share capital", "Loan notes are borrowing, not ownership."], ["A current asset", "They are owed, not owned."], ["A reserve in equity", "Reserves arise from profits and share premium, not borrowing."]],
    hints: ["Is the company the lender or the borrower?"],
    explanation: "The company owes the loan note holders, normally for more than one year.",
  });
  const q8 = { eq: 285000, shares: 44000, price: 1.85, notes: 24000 };
  const q8a = chk(q8.eq + q8.shares * q8.price, 366400);
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `A company has total equity of ${money(q8.eq)}. It buys a business, issuing ${fmt(q8.shares)} ordinary shares of US\\$1 at US\\$1.85 and ${money(q8.notes)} of loan notes. What is its total equity after the purchase?`,
    right: [money(q8a), "Correct: equity rises by the full value of the shares, 81,400."],
    wrong: [[money(q8.eq + q8.shares), "This adds the nominal value only and leaves out the premium."], [money(q8a + q8.notes), "Loan notes are liabilities, not equity."], [money(q8.eq + q8.shares + q8.notes), "This adds the nominal value and the loan notes, which is wrong twice."]],
    hints: ["Equity increases by the issue value of the shares."],
    explanation: "285,000 + 44,000 × 1.85 = 366,400. The loan notes increase non-current liabilities.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "After both journals have been posted, the business purchase account has a nil balance.",
    answer: true,
    explanation: "True. The first journal credits the price; the second debits it when the consideration is settled.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the purchaser's books, goodwill is credited when the consideration is greater than the net assets.",
    answer: false,
    explanation: "False. Goodwill is an asset and is debited; a gain on a bargain purchase is the item that is credited.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item of the consideration with the account credited in the purchaser's second journal.",
    pairs: [["Cash paid to the seller", "Bank"], ["Nominal value of shares issued", "Ordinary share capital"], ["Excess of the issue price over nominal value", "Share premium"], ["Loan notes given to the seller", "Loan notes (non-current liability)"]],
    explanation: "The second journal debits the business purchase account and credits each form of payment.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about the purchaser's journals.",
    template: "Assets are recorded at {{blank:a}} values. The first journal is {{blank:b}} to the business purchase account with the total consideration. Goodwill is recorded as an {{blank:c}} asset.",
    blanks: [
      { id: "a", accepted: ["agreed"], choices: ["agreed", "the seller's book", "original cost"] },
      { id: "b", accepted: ["credited"], choices: ["credited", "debited"] },
      { id: "c", accepted: ["intangible"], choices: ["intangible", "current", "tangible"] },
    ],
    explanation: "Agreed values, a credit to the business purchase account and goodwill as an intangible non-current asset.",
  });

  // --- Numerical / calculations
  const n1 = { assets: 118500, pay: 14200, cons: 120000 };
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.cons - (n1.assets - n1.pay), 15700), wrong: [n1.cons - n1.assets, n1.assets - n1.pay - n1.cons],
    stem: `A company takes over assets at agreed values totalling ${money(n1.assets)} and trade payables of ${money(n1.pay)}. The consideration is ${money(n1.cons)}. Calculate the goodwill to be debited.`,
    hints: ["Net assets first."],
    explanation: "Net assets 118,500 − 14,200 = 104,300. Goodwill 120,000 − 104,300 = 15,700.",
  });
  const n2 = { cash: 12000, n: 28000, price: 1.9, notes: 16000 };
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", calculator: true, daily: true,
    value: chk(n2.cash + n2.n * n2.price + n2.notes, 81200), wrong: [n2.cash + n2.n + n2.notes, n2.n * n2.price],
    stem: `A company pays ${money(n2.cash)} in cash, issues ${fmt(n2.n)} ordinary shares of US\\$1 at US\\$1.90 and gives ${money(n2.notes)} of loan notes. Calculate the amount credited to the business purchase account in the first journal.`,
    explanation: "28,000 × 1.90 = 53,200. 12,000 + 53,200 + 16,000 = 81,200.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: 6400, wrong: [4400, 12800, 8000],
    stem: "Net assets at agreed values are US\\$92,400. The consideration is US\\$86,000. Calculate the gain on a bargain purchase.",
    hints: ["Price below net assets."],
    explanation: "92,400 − 86,000 = 6,400.",
  });
  const n4 = { sc: 130000, sp: 22000, re: 61500, n: 15000, price: 2.4 };
  b.num({
    d: 4, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n4.sc + n4.sp + n4.re + n4.n * n4.price, 249500), wrong: [n4.sc + n4.sp + n4.re + n4.n, n4.sc + n4.sp + n4.re],
    stem: `Before a purchase a company has share capital ${money(n4.sc)}, share premium ${money(n4.sp)} and retained earnings ${money(n4.re)}. It then issues ${fmt(n4.n)} ordinary shares of US\\$1 at US\\$2.40 to buy a business. Calculate the total equity after the purchase.`,
    hints: ["Equity increases by the issue value of the shares."],
    explanation: "213,500 + 15,000 × 2.40 = 213,500 + 36,000 = 249,500.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of reserve to which the excess of the issue price over nominal value is credited.",
    accepted: ["share premium", "share premium account", "premium"],
    explanation: "The excess over nominal value is share premium.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a company records the assets of a business it buys at agreed values and not at the seller's book values.",
    points: ["The agreed values are the fair values on which the price was based", "Book values may be out of date (for example a market value above cost or obsolete inventory)", "Using them gives the correct goodwill and assets in the buyer's books"],
    modelAnswer: "The price was agreed on fair values, and the seller's book values may be out of date. Using agreed values gives the correct goodwill and asset figures in the buyer's books.",
    hints: ["Which values did the buyer pay for?"],
    explanation: "One mark each for fair values, out-of-date book values and correct goodwill.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the effect on the purchasing company's statement of financial position of buying a business with shares and loan notes.",
    points: ["Assets increase, including goodwill if the price exceeds the net assets", "Liabilities taken over and loan notes increase non-current liabilities", "Share capital and share premium increase by the value of the shares issued", "Retained earnings do not change"],
    modelAnswer: "Assets, including any goodwill, increase; liabilities taken over and the loan notes increase non-current liabilities; share capital and share premium increase by the value of the shares issued. Retained earnings do not change.",
    hints: ["Think of every part of the statement."],
    explanation: "One mark for each effect on assets, liabilities, equity and reserves.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A company can pay for a business with cash, with shares or with loan notes. Evaluate the use of loan notes for the company.",
    points: ["No cash leaves the company now and ownership is not diluted", "Interest must be paid every year, which reduces profit and cash", "Gearing and financial risk rise, and the notes must be repaid or refinanced", "Conclusion: suitable if profits can comfortably cover the interest; otherwise use more shares"],
    modelAnswer: "Loan notes save cash and avoid diluting the owners, but the interest must be paid each year and the notes repaid, so gearing and risk rise. They suit a company whose profits cover the interest comfortably; otherwise shares may be better.",
    hints: ["Consider cash, control and risk."],
    explanation: "A balanced answer covers cash, control, interest and risk and ends with a conclusion.",
  });

  // --- Practice structured 1 (10 marks)
  const s1 = { bld: 49500, eq: 11800, inv: 6900, rec: 4100, pay: 8400, cash: 13500, n: 21000, price: 1.7, notes: 19500 };
  const s1na = chk(s1.bld + s1.eq + s1.inv + s1.rec - s1.pay, 63900);
  const s1c = chk(s1.cash + s1.n * s1.price + s1.notes, 68700);
  const s1g = chk(s1c - s1na, 4800);
  const s1p = chk(s1.n * (s1.price - 1), 14700);
  const sj1 = journal([
    { date: "1 Nov", lines: [["Buildings", s1.bld, null], ["Equipment", s1.eq, null], ["Inventory", s1.inv, null], ["Trade receivables", s1.rec, null], ["Goodwill", s1g, null], ["Trade payables", null, s1.pay], ["Business purchase account", null, s1c]], narrative: "Poultry business taken over at agreed values" },
  ], { title: "Journal of Chinhoyi Poultry Ltd" });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chinhoyi Poultry Ltd buys a poultry business on 1 November. The agreed values are buildings ${money(s1.bld)}, equipment ${money(s1.eq)}, inventory ${money(s1.inv)} and trade receivables ${money(s1.rec)}; the company takes over trade payables of ${money(s1.pay)}. It pays ${money(s1.cash)} in cash, issues ${fmt(s1.n)} ordinary shares of US\\$1 at US\\$1.70 and gives ${money(s1.notes)} of loan notes.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: s1g, wrong: [s1c - s1na - s1.pay, s1c - s1.bld], stem: "Calculate the goodwill.", explanation: `Consideration ${fmt(s1.cash)} + ${fmt(s1.n * s1.price)} + ${fmt(s1.notes)} = ${fmt(s1c)}. Net assets ${fmt(s1na)}. Goodwill ${fmt(s1g)}.` }),
      P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the journal entry that takes over the business, with a narrative.", points: [`Debit the four assets at agreed values (buildings ${fmt(s1.bld)}, equipment ${fmt(s1.eq)}, inventory ${fmt(s1.inv)}, receivables ${fmt(s1.rec)})`, `Debit goodwill ${fmt(s1g)} (own figure)`, `Credit trade payables ${fmt(s1.pay)}`, `Credit business purchase account ${fmt(s1c)} and a narrative`], modelAnswer: sj1, explanation: `Debits total ${fmt(s1.bld + s1.eq + s1.inv + s1.rec + s1g)} and equal the credits.` }),
      P.num({ label: "(c)", marks: 1, kind: "money", value: s1p, wrong: [s1.n * s1.price, s1.n], stem: "How much is credited to share premium on the shares issued?", explanation: `${fmt(s1.n)} × 0.70 = ${fmt(s1p)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "State two effects of the purchase on the company's statement of financial position other than the new assets.", points: [`Share capital and share premium increase by the shares issued (${fmt(s1.n * s1.price)})`, `Non-current liabilities increase by the loan notes (${fmt(s1.notes)}) and cash falls by ${fmt(s1.cash)}`], modelAnswer: `Share capital and share premium rise by ${money(s1.n * s1.price)} in total, and loan notes of ${money(s1.notes)} are added to non-current liabilities, while cash falls by ${money(s1.cash)}.`, explanation: "Any two valid effects." }),
    ],
    hints: ["Net assets are assets less liabilities at agreed values.", "Premium is per share."],
    explanation: "This item practises goodwill and the first journal of a purchase.",
  });

  // --- Practice structured 2 (16 marks)
  const s2 = { sc: 140000, sp: 26000, re: 58500, ln: 36000, prem: 66500, eq: 19500, inv: 11300, rec: 6800, pay: 12600, cash: 8500, n: 27000, price: 2.2, notes: 27800 };
  const s2na = chk(s2.prem + s2.eq + s2.inv + s2.rec - s2.pay, 91500);
  const s2c = chk(s2.cash + s2.n * s2.price + s2.notes, 95700);
  const s2g = chk(s2c - s2na, 4200);
  const s2eq = chk(s2.sc + s2.sp + s2.re + s2.n * s2.price, 283900);
  const s2res = s2.sp + s2.n * (s2.price - 1) + s2.re;
  const s2gear = ratios.gearing(s2.ln + s2.notes, s2.sc + s2.n, s2res);
  const s2gear0 = ratios.gearing(s2.ln, s2.sc, s2.sp + s2.re);
  const f1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
  const sj2 = journal([
    { date: "31 Mar", lines: [["Premises", s2.prem, null], ["Equipment", s2.eq, null], ["Inventory", s2.inv, null], ["Trade receivables", s2.rec, null], ["Goodwill", s2g, null], ["Trade payables", null, s2.pay], ["Business purchase account", null, s2c]], narrative: "Business of Mutare Bread taken over at agreed values" },
    { date: "31 Mar", lines: [["Business purchase account", s2c, null], ["Bank", null, s2.cash], ["Ordinary share capital", null, s2.n], ["Share premium", null, s2.n * (s2.price - 1)], ["Loan notes", null, s2.notes]], narrative: "Settlement of the purchase consideration" },
  ], { title: "Journal of Bulawayo Bakers Ltd" });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Bulawayo Bakers Ltd has ordinary share capital of ${money(s2.sc)} (US\\$1 shares), share premium ${money(s2.sp)}, retained earnings ${money(s2.re)} and loan notes of ${money(s2.ln)}. On 31 March it buys Mutare Bread. Agreed values: premises ${money(s2.prem)}, equipment ${money(s2.eq)}, inventory ${money(s2.inv)}, trade receivables ${money(s2.rec)}; the company takes over trade payables of ${money(s2.pay)}. It pays ${money(s2.cash)} in cash, issues ${fmt(s2.n)} ordinary shares of US\\$1 at US\\$2.20 and gives ${money(s2.notes)} of loan notes.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s2c, wrong: [s2.cash + s2.n + s2.notes], stem: "Calculate the purchase consideration.", explanation: `Shares ${fmt(s2.n)} × 2.20 = ${fmt(s2.n * s2.price)}. ${fmt(s2.cash)} + ${fmt(s2.n * s2.price)} + ${fmt(s2.notes)} = ${fmt(s2c)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2g, wrong: [s2c - s2.prem - s2.eq - s2.inv - s2.rec], stem: "Calculate the goodwill.", explanation: `Net assets ${fmt(s2.prem + s2.eq + s2.inv + s2.rec)} − ${fmt(s2.pay)} = ${fmt(s2na)}. ${fmt(s2c)} − ${fmt(s2na)} = ${fmt(s2g)}.` }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the two journal entries that record the purchase, with narratives.", points: [`Assets debited at agreed values and goodwill ${fmt(s2g)}`, `Trade payables ${fmt(s2.pay)} and business purchase account ${fmt(s2c)} credited`, `Business purchase account debited ${fmt(s2c)} in the second journal`, `Credits: bank ${fmt(s2.cash)} and share capital ${fmt(s2.n)}`, `Credits: share premium ${fmt(s2.n * (s2.price - 1))} and loan notes ${fmt(s2.notes)}`], modelAnswer: sj2, explanation: `Journal 1 totals ${fmt(s2.prem + s2.eq + s2.inv + s2.rec + s2g)} each side; journal 2 totals ${fmt(s2c)} each side.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: s2eq, wrong: [s2.sc + s2.sp + s2.re + s2.n, s2.sc + s2.sp + s2.re], stem: "Calculate the total equity after the purchase.", explanation: `${fmt(s2.sc + s2.sp + s2.re)} + ${fmt(s2.n * s2.price)} = ${fmt(s2eq)}.` }),
      P.num({ label: "(e)", marks: 2, kind: "pct", dp: 1, value: s2gear, wrong: [s2gear0, ratios.gearing(s2.ln + s2.notes, s2.sc, s2.sp + s2.re)], stem: "Calculate the gearing ratio after the purchase (non-current liabilities ÷ (share capital + all reserves + non-current liabilities) × 100), to one decimal place.", explanation: `Loan notes ${fmt(s2.ln + s2.notes)} ÷ (${fmt(s2eq)} + ${fmt(s2.ln + s2.notes)}) × 100 = ${f1(s2gear)}%.` }),
      P.manual({ label: "(f)", marks: 3, stem: "Evaluate the effect of the purchase on the gearing of the company, using your answers.", points: [`Gearing rises from about ${f1(s2gear0)}% to ${f1(s2gear)}% because loan notes of ${fmt(s2.notes)} are added`, "The rise is moderate because part of the price was paid in shares", "Conclusion: financial risk has increased, so the interest on the extra notes must be covered by profit"], modelAnswer: `Gearing rises from about ${f1(s2gear0)}% to ${f1(s2gear)}% because ${money(s2.notes)} of loan notes are added, a moderate rise as part of the price was paid in shares. Financial risk has increased, and profit must cover the extra interest.`, explanation: "One mark each for the change, the reason and the conclusion." }),
    ],
    hints: ["Add the shares to share capital and the premium to reserves.", "Loan notes are non-current liabilities."],
    explanation: "This item practises both journals and the effect of the purchase on equity and gearing.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Business purchase account", "A temporary account credited with the purchase consideration and debited when it is settled; it clears to nil.");
  b.card("FACT", "Journal 1 of a purchase", "Debit the assets at agreed values and goodwill; credit the liabilities taken over and the business purchase account.");
  b.card("FACT", "Journal 2 of a purchase", "Debit the business purchase account; credit bank, share capital (nominal), share premium and loan notes.");
  b.card("FORMULA", "Goodwill (purchaser)", "Purchase consideration − net assets at agreed values; debited to goodwill.");
  b.card("CONCEPT", "Bargain purchase", "When the price is below the net assets, credit a gain on bargain purchase after checking the values.");
  b.card("FACT", "Share issue at a premium", "Nominal value to ordinary share capital; the excess over nominal value to share premium.");
  b.card("FACT", "Retained earnings on purchase", "Unchanged: no profit has been earned by the purchase.");
  b.card("CONCEPT", "Loan notes", "A non-current liability; they add to gearing and require interest.");
  b.card("CONCEPT", "Effect of the purchase on equity", "Total equity rises by the value of the shares issued (share capital plus share premium).");
});
