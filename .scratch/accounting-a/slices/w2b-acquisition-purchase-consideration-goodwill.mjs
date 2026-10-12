// W2b: acquisition.purchase-consideration-goodwill
import { concept, P, money, fmt, chk, r2, sum, table, statement } from "../lib.mjs";
import { mc, U } from "../tables/w2b-lib.mjs";

concept("aacc.acquisition.purchase-consideration-goodwill", { file: "acquisition/purchase-consideration-goodwill", keyPrefix: "acquisition.purchase-consideration-goodwill" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is meant by the purchase consideration when a company takes over a business?",
    right: ["The total value given by the buyer for the business", "Correct: cash, shares, loan notes or a mixture, at their values on the date of acquisition."],
    wrong: [["The book value of the net assets in the seller's books", "Book values may differ from the price actually paid."], ["The amount of goodwill paid above the net assets", "Goodwill is the excess of the consideration over net assets, not the consideration itself."], ["The fees paid to the lawyers who prepare the contract", "Legal costs are not part of the price paid to the seller."]],
    explanation: "The consideration is the full price paid, in whatever form, measured at the date of acquisition.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is purchased goodwill calculated?",
    right: ["Purchase consideration less the net assets acquired at agreed values", "Correct: the excess of the price over the net assets."],
    wrong: [["Net assets at book value less the purchase consideration", "This reverses the sides and uses book values."], ["Purchase consideration less the total assets, ignoring liabilities", "Liabilities taken over must be deducted to find net assets."], ["Average profits for three years multiplied by two", "This is a method of valuing goodwill in a partnership, not the acquisition calculation."]],
    explanation: "Goodwill = consideration − (assets − liabilities) at agreed values.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A company issues 22,000 ordinary shares of US\\$1 each at US\\$1.65 to the owner of a business it is buying. At what amount is this part of the consideration measured?",
    right: [money(36300), "Correct: 22,000 × 1.65, of which 22,000 is share capital and 14,300 share premium."],
    wrong: [[money(22000), "This uses par value and ignores the premium."], [money(14300), "This is the share premium only."], [money(58300), "This adds the nominal value to the issue value; the issue price already includes it."]],
    hints: ["Multiply the number of shares by the issue price."],
    explanation: "Shares are valued at the price at which they are issued: 22,000 × 1.65 = 36,300.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which one of the following is a benefit to a company of acquiring a rival business instead of building up its own capacity?",
    right: ["It gains customers and experienced staff at once", "Correct: growth is faster and skills come with the business."],
    wrong: [["It avoids paying more than the book value of the assets", "Buyers often pay above book value, and the premium is goodwill."], ["It takes over the business without any of its liabilities", "Liabilities agreed in the deal are taken over with the assets."], ["It removes the need for any new staff training", "The two ways of working still have to be combined."]],
    hints: ["Think about what is bought along with the assets."],
    explanation: "Acquisition gives immediate market share, customers and skills. It does not remove liabilities or integration costs.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A buyer purchases only the premises and equipment of a trader, and not the business itself. What is true of this purchase?",
    right: ["No purchased goodwill arises", "Correct: goodwill is only bought with a business as a whole."],
    wrong: [["Goodwill is calculated as the price less the book values", "Goodwill requires the purchase of the business as a going concern."], ["The customers transfer automatically to the buyer", "Customers are not assets bought with individual items."], ["The buyer must take over the trade payables", "The buyer only takes the assets it chose."]],
    hints: ["What does the buyer receive besides the assets?"],
    explanation: "Buying assets only means choosing the assets and avoiding liabilities, but customers, staff and contracts are not acquired, so there is no purchased goodwill.",
  });
  const q6 = { na: 91000, cons: 79000 };
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A company pays ${money(q6.cons)} for a business whose net assets at agreed values are ${money(q6.na)}. How is the difference treated?`,
    right: [`A gain on a bargain purchase of ${money(q6.na - q6.cons)}`, "Correct: the price is below the net assets, so no goodwill exists."],
    wrong: [[`Goodwill of ${money(q6.na - q6.cons)} recorded as an intangible asset`, "Goodwill arises when the price is above the net assets."], [`An expense of ${money(q6.na - q6.cons)} charged against profit`, "Paying less than the net assets is a gain, not a cost."], [`Goodwill of ${money(q6.na + q6.cons)} recorded as an intangible asset`, "The two amounts must be subtracted, not added."]],
    hints: ["Compare the price with the net assets."],
    explanation: "Consideration 79,000 is below net assets 91,000, so there is a bargain purchase gain of 12,000 after checking the values.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A trader's shop has built a very good reputation over twenty years. Under IAS 38, how is this internally generated goodwill treated in its own statement of financial position?",
    right: ["It is not recognised as an asset", "Correct: only goodwill that has been bought is recorded."],
    wrong: [["It is recognised at the value of five years' profits", "No such valuation is allowed for goodwill the business built itself."], ["It is recognised and amortised over twenty years", "Internally generated goodwill is not recognised at all."], ["It is recognised only if the owner agrees", "Recognition does not depend on the owner's opinion."]],
    hints: ["Was the goodwill bought?"],
    explanation: "Purchased goodwill is an intangible asset; internally generated goodwill is never recorded because its value cannot be measured reliably.",
  });
  const q8 = { n: 36000, p1: 2.0, p2: 2.5, notes: 27000, na: 96000 };
  const g1 = chk(q8.n * q8.p1 + q8.notes - q8.na, 3000);
  const g2 = chk(q8.n * q8.p2 + q8.notes - q8.na, 21000);
  mc(b, {
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A company agrees to give ${fmt(q8.n)} shares and ${money(q8.notes)} of loan notes for a business with net assets at agreed values of ${money(q8.na)}. The shares were valued at ${money(q8.p1)} each when the deal was agreed but are worth ${money(q8.p2)} on the date of acquisition. By how much does the goodwill recorded differ from that calculated at the agreement date?`,
    right: [`It is ${money(g2 - g1)} higher`, "Correct: 36,000 × 0.50 more, so goodwill is 21,000 instead of 3,000."],
    wrong: [[`It is ${money(g2 - g1)} lower`, "A higher share value raises the consideration and so the goodwill."], ["It is unchanged because shares are valued at par", "Shares are valued at their value on the date of acquisition."], [`It is ${money(q8.n * q8.p2)} higher`, "Only the 0.50 increase per share changes the answer, not the whole value."]],
    hints: ["Recalculate the consideration with each share price."],
    explanation: "Consideration rises from 99,000 to 117,000, so goodwill rises from 3,000 to 21,000.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If a buyer leaves the seller's bank balance with the seller, the bank balance is not part of the net assets acquired.",
    answer: true,
    explanation: "True. Net assets acquired include only the assets and liabilities that the buyer takes over.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Goodwill is calculated using the seller's book values of the assets, because these are the amounts in the seller's records.",
    answer: false,
    hints: ["Which values does the buyer record?"],
    explanation: "False. The buyer records the assets at agreed (fair) values, and goodwill is found from these.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each form of purchase consideration with its main effect on the buying company.",
    pairs: [["Cash", "Reduces the bank balance and liquidity"], ["Ordinary shares", "Dilutes existing owners but no cash leaves"], ["Loan notes", "Increases borrowing and requires interest to be paid"], ["A mixture of the three", "Balances cash, control and debt"]],
    explanation: "Each form affects liquidity, ownership or gearing differently, which is why a mixture is often used.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about the purchase of a business.",
    template: "Goodwill arises when the purchase consideration is {{blank:a}} the net assets acquired at agreed values. Goodwill that the business built up itself is {{blank:b}} recorded.",
    blanks: [
      { id: "a", accepted: ["more than"], choices: ["more than", "less than", "equal to"] },
      { id: "b", accepted: ["never"], choices: ["never", "always", "sometimes"] },
    ],
    explanation: "Purchased goodwill is the excess of the price over net assets. Internally generated goodwill is never recognised.",
  });

  // --- Numerical / calculations
  const n1 = { prem: 96800, eq: 30400, inv: 14500, rec: 8200, pay: 11900 };
  const n1na = chk(n1.prem + n1.eq + n1.inv + n1.rec - n1.pay, 138000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n1na, wrong: [n1na + n1.pay, n1na - 2 * n1.pay],
    stem: `A company takes over the following at agreed values: premises ${money(n1.prem)}, equipment ${money(n1.eq)}, inventory ${money(n1.inv)} and trade receivables ${money(n1.rec)}. It also takes over trade payables of ${money(n1.pay)}. Calculate the net assets acquired.`,
    hints: ["Add the assets, then deduct the liabilities."],
    explanation: "Assets 96,800 + 30,400 + 14,500 + 8,200 = 149,900. Less payables 11,900 = 138,000. Forgetting the payables gives 149,900.",
  });
  const n2 = { cash: 60000, n: 35000, price: 1.8, notes: 40000, na: 138000 };
  const n2c = chk(n2.cash + n2.n * n2.price + n2.notes, 163000);
  const n2g = chk(n2c - n2.na, 25000);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: n2g, wrong: [n2.cash + n2.n * 1 + n2.notes - n2.na, n2c, n2.na - n2c],
    stem: `The company in the previous question pays ${money(n2.cash)} in cash, issues ${fmt(n2.n)} ordinary shares of US\\$1 at US\\$1.80 and gives ${money(n2.notes)} of loan notes. The net assets acquired are ${money(n2.na)}. Calculate the goodwill.`,
    hints: ["Value the shares at the issue price first."],
    explanation: "Shares 35,000 × 1.80 = 63,000. Consideration 60,000 + 63,000 + 40,000 = 163,000. Goodwill 163,000 − 138,000 = 25,000. Using par for the shares gives 135,000 and a bargain gain of 3,000.",
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", daily: true, calculator: true,
    value: 18200, wrong: [44200, 26000],
    stem: "A company issues 26,000 ordinary shares of US\\$1 at US\\$1.70 as part of a purchase. Calculate the share premium credited.",
    explanation: "Premium per share 0.70 × 26,000 = 18,200; share capital is 26,000.",
  });
  const n4 = { gw: 36000, imp: 9500 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", calculator: true,
    value: chk(n4.gw - n4.imp, 26500), wrong: [n4.gw + n4.imp, n4.imp],
    stem: `Goodwill of ${money(n4.gw)} was recorded on an acquisition. A year later the directors review it for impairment and decide it has lost ${money(n4.imp)} of its value. Calculate the carrying amount of the goodwill after the impairment.`,
    hints: ["An impairment loss reduces the carrying amount."],
    explanation: "36,000 − 9,500 = 26,500. The loss of 9,500 is an expense in the statement of profit or loss.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the accounting standard that deals with intangible assets such as purchased goodwill.",
    accepted: ["ias 38", "ias38", "international accounting standard 38"],
    explanation: "IAS 38 covers intangible assets; it prohibits recognising internally generated goodwill.",
  });

  // --- Self-marked short answers
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain two reasons why a company might buy an existing business instead of starting a new one.",
    points: ["It gains customers, market share and a trading name at once (1 mark)", "It gains trained staff and experience or new products (1 mark)", "A development reason is linked to growth or economies of scale (1 mark)"],
    modelAnswer: "The company obtains customers, market share and a name immediately, which would take years to build. It also gains trained staff and skills, and the larger scale may reduce unit costs.",
    hints: ["What does the buyer receive in addition to the assets?"],
    explanation: "One mark for each reason explained, with a third for the link to growth or cost savings.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the difference between purchased goodwill and internally generated goodwill and how each is treated in the statement of financial position.",
    points: ["Purchased goodwill is paid for when a business is bought above its net assets", "Internally generated goodwill is built by the business itself over time", "Purchased goodwill is recorded as an intangible asset and reviewed for impairment", "Internally generated goodwill is not recorded (IAS 38) because it cannot be measured reliably"],
    modelAnswer: "Purchased goodwill is the excess paid over net assets when a business is bought; it is an intangible asset and is reviewed for impairment. Internally generated goodwill is built by the business itself; it is not recorded under IAS 38.",
    hints: ["One of them has a price paid for it."],
    explanation: "Two marks for the definitions and two for the different treatments.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "The owner of a business is offered ordinary shares in the buying company instead of cash. Evaluate this form of payment for the seller.",
    points: ["Shares give the seller a stake in the combined business and its future profits", "The seller receives no cash now, so cannot withdraw money immediately", "The value of the shares can fall as well as rise after the deal", "Conclusion: suitable if the seller trusts the buyer's prospects and does not need cash; otherwise ask for a cash element"],
    modelAnswer: "Shares give the seller a share in the future profits of the enlarged business, but the seller gets no cash now and the share value can fall. The offer suits a seller who believes in the buyer's prospects and can wait; one who needs money should ask for some cash.",
    hints: ["Consider both the upside and the risk."],
    explanation: "A balanced answer weighs future benefit against the lack of cash and the risk of a fall in value.",
  });

  // --- Practice structured 1 (10 marks)
  const s1 = { prem: 58400, eq: 18400, inv: 9600, rec: 5300, pay: 7100, cash: 23600, n: 17500, price: 2.3, notes: 28500 };
  const s1na = chk(s1.prem + s1.eq + s1.inv + s1.rec - s1.pay, 84600);
  const s1sh = chk(s1.n * s1.price, 40250);
  const s1c = chk(s1.cash + s1sh + s1.notes, 92350);
  const s1g = chk(s1c - s1na, 7750);
  const s1p = chk(s1.n * (s1.price - 1), 22750);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Gweru Retail Ltd buys the tuck-shop business of Farai Mutasa. It takes over premises at an agreed ${money(s1.prem)}, equipment ${money(s1.eq)}, inventory ${money(s1.inv)} and trade receivables ${money(s1.rec)}, and trade payables of ${money(s1.pay)}. The bank balance stays with Farai. The company pays ${money(s1.cash)} in cash, issues ${fmt(s1.n)} ordinary shares of US\\$1 at US\\$2.30 and gives ${money(s1.notes)} of loan notes.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1na, wrong: [s1na + s1.pay], stem: "Calculate the net assets acquired.", explanation: `${fmt(s1.prem)} + ${fmt(s1.eq)} + ${fmt(s1.inv)} + ${fmt(s1.rec)} − ${fmt(s1.pay)} = ${fmt(s1na)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: s1c, wrong: [s1.cash + s1.n + s1.notes], stem: "Calculate the purchase consideration.", explanation: `Shares ${fmt(s1.n)} × 2.30 = ${fmt(s1sh)}. Total ${fmt(s1.cash)} + ${fmt(s1sh)} + ${fmt(s1.notes)} = ${fmt(s1c)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: s1g, wrong: [s1c - s1na - s1.pay], stem: "Calculate the goodwill.", explanation: `${fmt(s1c)} − ${fmt(s1na)} = ${fmt(s1g)}.` }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: s1p, wrong: [s1sh, s1.n], stem: "How much share premium is credited on the shares issued?", explanation: `${fmt(s1.n)} × (2.30 − 1.00) = ${fmt(s1p)}.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State why the bank balance of the seller is left out of the net assets acquired.", points: ["The buyer does not take it over (it stays with the seller)", "Only assets and liabilities actually acquired are included"], modelAnswer: "The bank balance stays with Farai, so it is not an asset acquired by the company.", explanation: "Net assets include only what is taken over." }),
    ],
    hints: ["Value the shares at the issue price.", "Goodwill is the excess of the price over the net assets."],
    explanation: "This item practises building the consideration and finding goodwill.",
  });

  // --- Practice structured 2 (14 marks): consideration compared with two share values and evaluation
  const s2 = { na: 151000, cash: 46000, notes: 32000, n: 35000, p1: 2.4, p2: 1.9 };
  const s2c1 = chk(s2.cash + s2.notes + s2.n * s2.p1, 162000);
  const s2c2 = chk(s2.cash + s2.notes + s2.n * s2.p2, 144500);
  const s2a = chk(s2c1 - s2.na, 11000);
  const s2b = chk(s2.na - s2c2, 6500);
  const tab = statement("Purchase consideration", [["Cash", s2.cash], [`${fmt(s2.n)} ordinary shares at US\\$2.40`, s2.n * s2.p1], ["Loan notes", s2.notes], ["Purchase consideration", s2c1]], { cols: [U], checks: [["total", s2.cash + s2.n * s2.p1 + s2.notes, s2c1]] });
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Chinhoyi Mills Ltd agrees to buy the business of Sipho Dube. The net assets that it takes over, at agreed values, are ${money(s2.na)}. The purchase consideration is ${money(s2.cash)} in cash, ${fmt(s2.n)} ordinary shares of US\\$1 and ${money(s2.notes)} of loan notes. When the offer was made the shares were valued at US\\$2.40 each. By the date of acquisition their value had fallen to US\\$1.90.`,
    parts: [
      P.manual({ label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a statement of the purchase consideration at the original share value of US\\$2.40.", points: [`Cash ${fmt(s2.cash)}`, `Shares ${fmt(s2.n)} × 2.40 = ${fmt(s2.n * s2.p1)}`, `Loan notes ${fmt(s2.notes)}`, `Total ${fmt(s2c1)}`], modelAnswer: tab, explanation: "Each element is shown and the total is the consideration." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2a, wrong: [s2c1], stem: "Calculate the goodwill at the original share value.", explanation: `${fmt(s2c1)} − ${fmt(s2.na)} = ${fmt(s2a)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: s2b, wrong: [s2.na - s2c1, s2c2], stem: "Calculate the gain on a bargain purchase if the shares are valued at US\\$1.90 on the date of acquisition.", explanation: `Consideration ${fmt(s2.cash)} + ${fmt(s2.n * s2.p2)} + ${fmt(s2.notes)} = ${fmt(s2c2)}. Net assets ${fmt(s2.na)} − ${fmt(s2c2)} = ${fmt(s2b)} gain.` }),
      P.manual({ label: "(d)", marks: 5, stem: "Evaluate whether the seller should accept the offer, using the figures above, and advise him.", points: [`At 2.40 the offer is worth ${fmt(s2c1)}, ${fmt(s2a)} above the net assets (a premium for the business)`, `At 1.90 the offer is worth ${fmt(s2c2)}, ${fmt(s2b)} below the net assets`, `Shares can fall in value, so the seller carries the risk on ${fmt(s2.n)} shares`, `Cash ${fmt(s2.cash)} and loan notes ${fmt(s2.notes)} give certainty for ${fmt(s2.cash + s2.notes)} of the price`, "Advice: accept only if shares are fixed in value or the cash element is raised"], modelAnswer: `At the original value the offer is worth ${money(s2a)} more than the net assets, but if the shares fall to 1.90 it is worth ${money(s2b)} less. Sipho carries this risk on the ${fmt(s2.n)} shares. The cash and loan notes (${money(s2.cash + s2.notes)}) are certain. He should ask for a larger cash element or a guaranteed share value.`, explanation: "One mark each for the two values, the risk, the certain part and the recommendation." }),
    ],
    hints: ["Value the shares at the stated price each time.", "A negative result is a bargain purchase."],
    explanation: "This item practises the effect of the value of shares on the consideration and the goodwill.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Purchase consideration", "The total value given by the buyer for a business taken over: cash, shares, loan notes or a mixture, at their values on the date of acquisition.");
  b.card("FORMULA", "Goodwill on acquisition", "Purchase consideration − net assets acquired at agreed values.");
  b.card("DEFINITION", "Net assets acquired", "The assets taken over at agreed values less the liabilities taken over.");
  b.card("FACT", "Shares as consideration", "Valued at the issue price: nominal value goes to share capital, the rest to share premium.");
  b.card("CONCEPT", "Consideration less than net assets", "A gain on a bargain purchase, recorded only after checking that all assets and liabilities have been identified and valued correctly.");
  b.card("FACT", "Internally generated goodwill", "Never recognised (IAS 38). Only purchased goodwill is an asset.");
  b.card("FACT", "Impairment of goodwill", "Reviewed at least once a year (IAS 36); an impairment loss is an expense and reduces the carrying amount.");
  b.card("CONCEPT", "Whole business or individual assets", "A whole business brings customers, staff and goodwill but also liabilities; individual assets avoid liabilities but bring no goodwill.");
  b.card("CONCEPT", "Reasons for acquisition", "Growth, new markets or products, skills, economies of scale, removing a competitor.");
});
