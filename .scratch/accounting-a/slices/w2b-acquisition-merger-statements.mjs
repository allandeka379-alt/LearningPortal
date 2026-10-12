// W2b: acquisition.merger-statements
import { concept, P, CAM, money, fmt, chk, r2, sum, statement, ratios } from "../lib.mjs";
import { mc, U } from "../tables/w2b-lib.mjs";

concept("aacc.acquisition.merger-statements", { file: "acquisition/merger-statements", keyPrefix: "acquisition.merger-statements" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a merger of two sole traders?",
    right: ["The businesses join to form one business owned by both traders", "Correct: each trader becomes an owner of the new business."],
    wrong: [["One trader buys the business of the other and the seller leaves", "That is a purchase of a business, not a merger."], ["The two traders share a shop but keep separate accounts", "The accounts are combined in a merger."], ["The two traders form a company with limited liability only", "A merger can also produce a partnership."]],
    explanation: "A merger combines businesses into one, with the former owners becoming owners of the new business.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the opening capital of each trader in the new partnership?",
    right: ["The net assets of the trader's business at agreed values", "Correct: assets less liabilities contributed, at the values the traders agree."],
    wrong: [["The net assets of the trader's business at their book values", "Revaluations are included, so agreed values are used."], ["Half of the total net assets of both businesses", "The traders do not necessarily contribute equally."], ["The cash that the trader contributes", "Capital includes all assets contributed, not only cash."]],
    explanation: "Each trader's capital is the agreed value of the assets contributed less the liabilities.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The traders agree that one trader's premises are worth more than their book value. What is the effect on that trader's capital in the new partnership?",
    right: ["The capital is higher than the net assets at book value", "Correct: the gain on revaluation belongs to the trader who contributed the premises."],
    wrong: [["The capital is lower because the premises cost more to insure", "Insurance is not part of the revaluation."], ["The capital is unchanged, and the gain is shared equally", "The gain belongs to the contributing owner, not to both."], ["The capital is higher by the same amount for both traders", "Only the owner of the premises gains."]],
    explanation: "The increase in value is credited to the capital of the trader who owned the asset.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which one of the following describes the difference between an acquisition and a merger?",
    right: ["In an acquisition one business buys another; in a merger the owners combine to run one business", "Correct: the acquisition involves a buyer and a seller."],
    wrong: [["In an acquisition the owners combine; in a merger a price is paid for goodwill", "This reverses the descriptions."], ["An acquisition never involves shares; a merger always does", "Either may involve cash, shares or loan notes."], ["Both are the same, and the terms may be used for any closing of a business", "The two differ in who controls the combined business."]],
    hints: ["Think about a buyer and a seller."],
    explanation: "An acquisition is a purchase (the buyer controls); a merger is a joining of owners.",
  });
  const q5 = { book: 63500, up: 9000, down: 4200 };
  const q5c = chk(q5.book + q5.up - q5.down, 68300);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A trader's net assets at book value are ${money(q5.book)}. Before the merger the premises are revalued upwards by ${money(q5.up)} and inventory is written down by ${money(q5.down)}. What is the trader's capital in the new partnership?`,
    right: [money(q5c), "Correct: 63,500 + 9,000 − 4,200."],
    wrong: [[money(q5.book + q5.up + q5.down), "The write-down must be deducted."], [money(q5.book), "Revaluations change the capital."], [money(q5.book - q5.up - q5.down), "The revaluation gain is added, not deducted."]],
    hints: ["Adjust the book capital for both revaluations."],
    explanation: "Capital = 63,500 + 9,000 − 4,200 = 68,300.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A company buys a partnership for more than the net assets at agreed values. What appears in the company's statement of financial position after the purchase that was not there before?",
    right: ["Goodwill as an intangible non-current asset", "Correct: the excess of the price over the net assets."],
    wrong: [["A revaluation reserve equal to the excess", "A revaluation reserve arises from revaluing the company's own assets."], ["A reduction in retained earnings", "No profit or loss arises on the purchase."], ["An increase in cash equal to the price", "The company pays for the business; it does not receive cash."]],
    hints: ["What does the buyer pay above the value of the assets?"],
    explanation: "The excess consideration is purchased goodwill, shown as an intangible asset.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING", applies: CAM,
    stem: "Which one is a possible disadvantage of an acquisition for the buying company?",
    right: ["Staff of the acquired firm may leave or resist change", "Correct: integration problems can reduce the expected benefits."],
    wrong: [["The company's market share is reduced", "An acquisition normally increases market share."], ["The company cannot benefit from any economies of scale", "Scale economies are a likely benefit."], ["The number of competitors increases", "An acquisition removes a competitor."]],
    hints: ["Think about people and the cost of combining the two firms."],
    explanation: "Integration problems and the price paid are the main risks of acquisition.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A company buys a business on 1 October. Its year ends on 31 December. Which profit of the acquired business is included in the company's statement of profit or loss for the year?",
    right: ["Only the profit earned from 1 October to 31 December", "Correct: only profit after the date of acquisition belongs to the buyer."],
    wrong: [["The whole profit of the acquired business for the year", "Profit before the acquisition belongs to the seller."], ["The profit for the nine months before 1 October", "This is the seller's profit."], ["No profit, as the purchase is a capital transaction", "Post-acquisition trading is included in the buyer's results."]],
    hints: ["Who owned the business before 1 October?"],
    explanation: "The buyer includes the acquired business's results from the acquisition date only.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Consolidated financial statements are examined in this topic.",
    answer: false,
    explanation: "False. Consolidated accounts are not examined; the questions ask for the statement of financial position after the purchase or merger.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "When two sole traders merge, the net assets of the new partnership equal the total of the two traders' net assets at agreed values.",
    answer: true,
    hints: ["Capital accounts equal the agreed net assets."],
    explanation: "True. The opening statement adds the agreed values; capital equals the net assets.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with the way it affects the statement of financial position of a company that buys a business with shares.",
    pairs: [["Assets taken over at agreed values", "Added to the company's assets line by line"], ["Price above the net assets", "Goodwill is added as an intangible asset"], ["Shares issued at a premium", "Share capital and share premium increase"], ["Loan notes given", "Non-current liabilities increase"]],
    explanation: "Each element of the purchase has its own effect on the enlarged company's statement.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about the opening statement of a merged business.",
    template: "Assets and liabilities are added at {{blank:a}} values. Each trader's capital is the {{blank:b}} contributed. Only profit earned {{blank:c}} the merger belongs to the new business.",
    blanks: [
      { id: "a", accepted: ["agreed"], choices: ["agreed", "book", "historical cost"] },
      { id: "b", accepted: ["net assets"], choices: ["net assets", "cash", "inventory"] },
      { id: "c", accepted: ["after"], choices: ["after", "before", "during the year before"] },
    ],
    explanation: "Agreed values, net assets as capital and post-merger profits.",
  });

  // --- Numerical / calculations
  const n1 = { prem: 57400, eq: 14000, inv: 9100, rec: 6200, bank: 1800, pay: 8300 };
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n1.prem + n1.eq + n1.inv + n1.rec + n1.bank - n1.pay, 80200), wrong: [n1.prem + n1.eq + n1.inv + n1.rec + n1.bank, n1.prem + n1.eq + n1.inv + n1.rec - n1.pay],
    stem: `At agreed values a trader contributes premises ${money(n1.prem)}, equipment ${money(n1.eq)}, inventory ${money(n1.inv)}, trade receivables ${money(n1.rec)} and bank ${money(n1.bank)}, and trade payables of ${money(n1.pay)}. Calculate the trader's capital in the new partnership.`,
    hints: ["Net assets at agreed values."],
    explanation: "Assets 88,500 less payables 8,300 = 80,200.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(28000 + 41500 + 2200 - 6000, 65700), wrong: [69500, 28000 + 41500],
    stem: "Two traders merge. Trader A's capital is US\\$28,000 and trader B's is US\\$41,500. Before the merger, A's equipment is revalued upwards by US\\$2,200 and B's inventory is written down by US\\$6,000. Calculate the total capital of the new partnership.",
    hints: ["Adjust the total for both revaluations."],
    explanation: "28,000 + 41,500 = 69,500. Add 2,200 and deduct 6,000: 65,700.",
  });
  const n3 = { bef: 188000, assets: 79000, gw: 5500 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n3.bef + n3.assets + n3.gw, 272500), wrong: [n3.bef + n3.assets, n3.bef + n3.gw],
    stem: `A company has total assets of ${money(n3.bef)}. It buys a business, taking over assets at agreed values of ${money(n3.assets)} and recording goodwill of ${money(n3.gw)}. The bank balance of the seller is not taken over. Calculate the company's total assets after the purchase, assuming no cash was paid.`,
    hints: ["Add the new assets and goodwill."],
    explanation: "188,000 + 79,000 + 5,500 = 272,500.",
  });
  const n4 = { ca: 66000, cl: 24000 };
  b.num({
    d: 4, skill: "APPLICATION", kind: "ratio", calculator: true,
    value: ratios.current(n4.ca, n4.cl), wrong: [n4.cl / n4.ca, (n4.ca - 20000) / n4.cl],
    stem: `After a purchase a company has current assets of ${money(n4.ca)} and current liabilities of ${money(n4.cl)}. Calculate the current ratio as x : 1, to two decimal places.`,
    hints: ["Current assets divided by current liabilities."],
    explanation: "66,000 ÷ 24,000 = 2.75 : 1.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the intangible asset recognised when a company pays more for a business than the net assets acquired.",
    accepted: ["goodwill", "purchased goodwill"],
    explanation: "The excess of the consideration over the net assets is purchased goodwill.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the assets of two merging traders are valued at agreed values and not at book values.",
    points: ["Book values may be out of date (cost less depreciation) and not reflect true worth", "Both owners must be treated fairly, so capital is based on what each contributes", "Agreed values give a fair opening statement and fair capital balances"],
    modelAnswer: "Book values may not show what the assets are really worth. Agreed values treat both traders fairly and give a correct opening statement with fair capital balances.",
    hints: ["Think about fairness between the two owners."],
    explanation: "One mark each for out-of-date book values, fairness and correct opening capital.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, applies: CAM,
    stem: "State and explain two advantages of a merger of two small businesses.",
    points: ["Economies of scale (for example bulk buying or shared rent) lower the cost per unit", "A larger market share and customer base", "The skills and experience of both owners are combined (any two advantages explained; 1 mark for a third link to profit)"],
    modelAnswer: "A merger gives economies of scale, such as bulk buying and shared rent, and a larger customer base. It also combines the skills of both owners.",
    hints: ["Think about costs, customers and skills."],
    explanation: "Marks for two advantages and their explanations.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, applies: CAM,
    stem: "Evaluate whether a small retailer should accept a takeover offer from a larger company.",
    points: ["The price may give goodwill above the net assets, benefiting the owner", "The owner may lose independence and staff may lose their jobs", "Payment in shares or loan notes carries risk compared with cash", "Conclusion: accept if the price and form of payment are good and staff are protected; otherwise refuse or negotiate"],
    modelAnswer: "A good price gives the owner a gain above the net assets, but independence and jobs may be lost and shares or loan notes carry risk. The retailer should accept only if the price and form of payment are good and staff are protected.",
    hints: ["Weigh the price against the loss of control."],
    explanation: "A balanced answer weighs financial and non-financial factors and concludes.",
  });

  // --- Practice structured 1 (10 marks): two sole traders merge
  const C = { prem: [41500, 46000], veh: [9400, 8100], inv: [5600, 5600], rec: [3900, 3700], bank: [1650, 1650], pay: [5200, 5200] };
  const R = { eq: [13200, 11400], inv: [8700, 8700], rec: [4800, 4800], bank: [850, 850], pay: [6100, 6100] };
  const cNet = chk(C.prem[1] + C.veh[1] + C.inv[1] + C.rec[1] + C.bank[1] - C.pay[1], 59850);
  const rNet = chk(R.eq[1] + R.inv[1] + R.rec[1] + R.bank[1] - R.pay[1], 19650);
  const cBook = C.prem[0] + C.veh[0] + C.inv[0] + C.rec[0] + C.bank[0] - C.pay[0];
  const rBook = R.eq[0] + R.inv[0] + R.rec[0] + R.bank[0] - R.pay[0];
  chk(cBook, 56850); chk(rBook, 21450);
  const totA = chk(C.prem[1] + C.veh[1] + C.inv[1] + C.rec[1] + C.bank[1] + R.eq[1] + R.inv[1] + R.rec[1] + R.bank[1], 90800);
  const totP = C.pay[1] + R.pay[1];
  const ms1 = statement("Opening statement of financial position of Chipo and Rudo at 1 March 2026", [
    ["Premises", C.prem[1]], ["Equipment", R.eq[1]], ["Vehicles", C.veh[1]], ["Inventory", C.inv[1] + R.inv[1]], ["Trade receivables", C.rec[1] + R.rec[1]], ["Bank", C.bank[1] + R.bank[1]], ["Total assets", totA], ["Trade payables", -totP], ["Net assets", totA - totP],
    ["Capital: Chipo", cNet], ["Capital: Rudo", rNet], ["Total capital", cNet + rNet],
  ], { cols: [U], checks: [["net assets", totA - totP, cNet + rNet]] });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `On 1 March 2026 Chipo and Rudo merge their shops in Mutare into a partnership. Chipo's book values: premises ${money(C.prem[0])}, vehicle ${money(C.veh[0])}, inventory ${money(C.inv[0])}, trade receivables ${money(C.rec[0])}, bank ${money(C.bank[0])}, trade payables ${money(C.pay[0])}. Rudo's: equipment ${money(R.eq[0])}, inventory ${money(R.inv[0])}, trade receivables ${money(R.rec[0])}, bank ${money(R.bank[0])}, trade payables ${money(R.pay[0])}. They agree: Chipo's premises are worth ${money(C.prem[1])}, her vehicle ${money(C.veh[1])} and her receivables ${money(C.rec[1])}; Rudo's equipment is worth ${money(R.eq[1])}. Other items stay at book value.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cNet, wrong: [cBook], stem: "Calculate Chipo's capital in the partnership.", explanation: `Premises ${fmt(C.prem[1])} + vehicle ${fmt(C.veh[1])} + inventory ${fmt(C.inv[1])} + receivables ${fmt(C.rec[1])} + bank ${fmt(C.bank[1])} − payables ${fmt(C.pay[1])} = ${fmt(cNet)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: rNet, wrong: [rBook], stem: "Calculate Rudo's capital in the partnership.", explanation: `Equipment ${fmt(R.eq[1])} + inventory ${fmt(R.inv[1])} + receivables ${fmt(R.rec[1])} + bank ${fmt(R.bank[1])} − payables ${fmt(R.pay[1])} = ${fmt(rNet)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: totA, wrong: [totA + totP], stem: "Calculate the total assets of the partnership at 1 March 2026.", explanation: `Net assets ${fmt(cNet + rNet)} + payables ${fmt(totP)} = ${fmt(totA)}.` }),
      P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the opening statement of financial position of the partnership.", points: ["Heading with the name of the partnership and date", `Non-current assets correctly combined (premises ${fmt(C.prem[1])}, equipment ${fmt(R.eq[1])}, vehicles ${fmt(C.veh[1])})`, `Current assets correctly combined (inventory ${fmt(C.inv[1] + R.inv[1])}, receivables ${fmt(C.rec[1] + R.rec[1])}, bank ${fmt(C.bank[1] + R.bank[1])}) and trade payables ${fmt(totP)}`, `Capital accounts ${fmt(cNet)} and ${fmt(rNet)} with net assets agreeing to capital`], modelAnswer: ms1, explanation: `Net assets ${fmt(cNet + rNet)} equal total capital.` }),
    ],
    hints: ["Use the agreed values.", "Combine the items line by line."],
    explanation: "This item practises the opening statement of financial position of a merged partnership.",
  });

  // --- Practice structured 2 (14 marks): company absorbs a partnership
  const co = { prem: 96000, inv: 26500, rec: 17200, bank: 22800, sc: 90000, sp: 10000, re: 46200, pay: 16300 };
  const pa = { prem: 43500, eq: 14800, inv: 9600, rec: 6400, pay: 8700, cash: 9000, n: 28000, price: 1.6, notes: 14000 };
  chk(co.prem + co.inv + co.rec + co.bank, 162500); chk(co.sc + co.sp + co.re + co.pay, 162500);
  const naP = chk(pa.prem + pa.eq + pa.inv + pa.rec - pa.pay, 65600);
  const consP = chk(pa.cash + pa.n * pa.price + pa.notes, 67800);
  const gwP = chk(consP - naP, 2200);
  const aft = { prem: co.prem + pa.prem, eq: pa.eq, gw: gwP, inv: co.inv + pa.inv, rec: co.rec + pa.rec, bank: co.bank - pa.cash, sc: co.sc + pa.n, sp: co.sp + pa.n * (pa.price - 1), re: co.re, ln: pa.notes, pay: co.pay + pa.pay };
  const aA = aft.prem + aft.eq + aft.gw + aft.inv + aft.rec + aft.bank;
  const aE = aft.sc + aft.sp + aft.re + aft.ln + aft.pay;
  chk(aA, 230000); chk(aE, 230000);
  const ca = aft.inv + aft.rec + aft.bank;
  const cl = aft.pay;
  const crAfter = ratios.current(ca, cl);
  const crBefore = ratios.current(co.inv + co.rec + co.bank, co.pay);
  const ms2 = statement("Statement of financial position of Bulawayo Print Ltd after the purchase", [
    ["Premises", aft.prem], ["Equipment", aft.eq], ["Goodwill", aft.gw], ["Inventory", aft.inv], ["Trade receivables", aft.rec], ["Bank", aft.bank], ["Total assets", aA],
    ["Ordinary share capital", aft.sc], ["Share premium", aft.sp], ["Retained earnings", aft.re], ["Total equity", aft.sc + aft.sp + aft.re],
    ["Loan notes", aft.ln], ["Trade payables", aft.pay], ["Total equity and liabilities", aE],
  ], { cols: [U], checks: [["total", aA, aE]] });
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Bulawayo Print Ltd has premises ${money(co.prem)}, inventory ${money(co.inv)}, trade receivables ${money(co.rec)} and bank ${money(co.bank)}; ordinary share capital ${money(co.sc)} (US\\$1 shares), share premium ${money(co.sp)}, retained earnings ${money(co.re)} and trade payables ${money(co.pay)}. It buys a partnership at agreed values: premises ${money(pa.prem)}, equipment ${money(pa.eq)}, inventory ${money(pa.inv)}, trade receivables ${money(pa.rec)}, taking over trade payables of ${money(pa.pay)}. The price is ${money(pa.cash)} in cash, ${fmt(pa.n)} ordinary shares of US\\$1 at US\\$1.60 and ${money(pa.notes)} of loan notes.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: consP, wrong: [pa.cash + pa.n + pa.notes], stem: "Calculate the purchase consideration.", explanation: `${fmt(pa.n)} × 1.60 = ${fmt(pa.n * pa.price)}. ${fmt(pa.cash)} + ${fmt(pa.n * pa.price)} + ${fmt(pa.notes)} = ${fmt(consP)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: gwP, wrong: [consP - (naP + pa.pay)], stem: "Calculate the goodwill.", explanation: `Assets ${fmt(naP + pa.pay)} less payables ${fmt(pa.pay)} = net assets ${fmt(naP)}; ${fmt(consP)} − ${fmt(naP)} = ${fmt(gwP)}.` }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of financial position of the company after the purchase.", points: [`Premises ${fmt(aft.prem)} and equipment ${fmt(aft.eq)}`, `Goodwill ${fmt(aft.gw)} (own figure)`, `Inventory ${fmt(aft.inv)}, trade receivables ${fmt(aft.rec)} and bank ${fmt(aft.bank)}`, `Share capital ${fmt(aft.sc)} and share premium ${fmt(aft.sp)}`, `Retained earnings ${fmt(aft.re)}, loan notes ${fmt(aft.ln)} and trade payables ${fmt(aft.pay)}`, `Total assets and total equity and liabilities both ${fmt(aA)}`], modelAnswer: ms2, explanation: `The two totals must agree at ${fmt(aA)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "ratio", value: crAfter, wrong: [crBefore, aft.pay / ca], stem: "Calculate the current ratio after the purchase as x : 1, to two decimal places.", explanation: `Current assets ${fmt(aft.inv)} + ${fmt(aft.rec)} + ${fmt(aft.bank)} = ${fmt(ca)}; current liabilities ${fmt(cl)}. ${fmt(ca)} ÷ ${fmt(cl)} = ${(Math.round(crAfter * 100) / 100).toFixed(2)} : 1.` }),
      P.manual({ label: "(e)", marks: 2, stem: `Comment on the change in liquidity caused by the purchase, using the current ratio before (${(Math.round(crBefore * 100) / 100).toFixed(2)} : 1) and after.`, points: [`The current ratio falls from ${(Math.round(crBefore * 100) / 100).toFixed(2)} : 1 to ${(Math.round(crAfter * 100) / 100).toFixed(2)} : 1 because cash was paid and payables were taken over`, "Liquidity is lower but still comfortable (above 2 : 1)"], modelAnswer: `The current ratio falls from ${(Math.round(crBefore * 100) / 100).toFixed(2)} : 1 to ${(Math.round(crAfter * 100) / 100).toFixed(2)} : 1 because cash was paid and payables were taken over, but liquidity remains comfortable.`, explanation: "Describe the fall, give the reason and judge it." }),
    ],
    hints: ["Add the acquired items to the company's own.", "Bank falls by the cash paid."],
    explanation: "This item practises the enlarged company's statement of financial position and its liquidity.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Merger", "Businesses join to form one business owned by the former owners.");
  b.card("DEFINITION", "Acquisition (takeover)", "One business buys another with cash, shares or loan notes and controls it.");
  b.card("FACT", "Capital in a merger", "Each owner's capital is the net assets contributed at agreed values.");
  b.card("FACT", "Revaluation before a merger", "A gain or loss on an asset is added to or deducted from the capital of the owner who contributed it.");
  b.card("FACT", "Opening statement of financial position", "Add the agreed values of assets and liabilities line by line; total assets equal capital plus liabilities.");
  b.card("FACT", "Company absorbs a partnership", "Add assets and liabilities taken over, goodwill, share capital, premium and loan notes to the company's statement.");
  b.card("CONCEPT", "Profit after the acquisition", "Only profit earned after the acquisition date belongs to the buyer.");
  b.card("CONCEPT", "Advantages of a merger (Cambridge)", "Economies of scale, larger market, combined skills, removal of a competitor.", undefined, { applies: CAM });
  b.card("CONCEPT", "Disadvantages of a merger (Cambridge)", "Price too high, staff leave or resist, hard to combine, borrowing or dilution.", undefined, { applies: CAM });
});
