// W4a: shares, debentures and types of share capital (COM Form 3).
import { concept, P, money, fmt, r2, round, table } from "../lib.mjs";

concept("bus.finance.shares-debentures", { file: "finance/shares-debentures", keyPrefix: "finance.shares-debentures" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which security makes its holder a creditor rather than an owner of the company?",
    options: [
      ["Debenture", "Correct: a debenture is a loan to the company."],
      ["Ordinary share", "Ordinary shareholders are owners."],
      ["Preference share", "Preference shareholders are also owners."],
      ["Cumulative preference share", "This is still a share, so its holder is an owner."],
    ],
    answer: "A",
    explanation: "Debenture holders lend to the company; shareholders own it.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which shareholders normally have voting rights at the annual general meeting?",
    options: [
      ["Ordinary shareholders", "Correct: one vote per ordinary share."],
      ["Preference shareholders", "They usually have no vote."],
      ["Debenture holders", "They are lenders, not shareholders."],
      ["Trade creditors", "Suppliers are not members of the company."],
    ],
    answer: "A",
    explanation: "Ordinary shareholders control the company through their votes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A company makes a loss this year. Which payment must it still make?",
    options: [
      ["Interest on its debentures", "Correct: interest on a loan is due whether or not there is a profit."],
      ["A dividend on ordinary shares", "Dividends are paid only from profits."],
      ["A dividend on preference shares", "Preference dividends also need profits."],
      ["A bonus to its directors", "Bonuses are not compulsory."],
    ],
    answer: "A",
    explanation: "Debenture interest is a fixed charge on the company.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is special about a cumulative preference share?",
    options: [
      ["Unpaid dividends are carried forward and paid later", "Correct: arrears are paid before ordinary dividends."],
      ["Its dividend rises every year", "Its rate is fixed."],
      ["It gives the holder extra votes", "Preference shares usually carry no vote."],
      ["It can never be bought back by the company", "That depends on whether it is redeemable."],
    ],
    answer: "A",
    explanation: "Cumulative preference shareholders do not lose a missed dividend.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is authorised capital?",
    options: [
      ["The maximum share capital a company may issue", "Correct: stated in its founding documents."],
      ["The capital shareholders have actually paid", "That is paid-up capital."],
      ["The capital the company has asked for so far", "That is called-up capital."],
      ["The capital borrowed through debentures", "Debentures are loan capital, not share capital."],
    ],
    answer: "A",
    explanation: "Authorised ≥ issued ≥ called-up ≥ paid-up.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An investor wants a steady, fixed return and is prepared to give up voting rights. Which security suits her best?",
    options: [
      ["Preference shares", "Correct: fixed dividend paid before ordinary shares; usually no vote."],
      ["Ordinary shares", "Dividends vary and holders have votes."],
      ["A savings club contribution", "Not a company security."],
      ["Shares bought as a stag", "Stagging is short-term speculation."],
    ],
    answer: "A",
    explanation: "Preference shares give a fixed dividend with priority over ordinary shares.",
    hints: ["Which share has a fixed rate but no vote?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Why might the existing shareholders prefer the company to issue debentures rather than new ordinary shares?",
    options: [
      ["Their control of the company is not diluted", "Correct: debenture holders have no votes."],
      ["Debenture interest is never paid in loss years", "It must be paid in loss years."],
      ["Debentures never have to be repaid", "Debentures are repaid at the end of the term."],
      ["Debenture holders share in all future profits", "They receive only fixed interest."],
    ],
    answer: "A",
    explanation: "Debt finance keeps voting control with existing shareholders.",
    hints: ["Who gets votes?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A company is wound up. In what order are these groups repaid?",
    options: [
      ["Debenture holders, preference, then ordinary shareholders", "Correct: creditors first, ordinary shareholders last."],
      ["Ordinary, preference, then debenture holders", "This is the reverse order."],
      ["Preference shareholders, debenture holders, then ordinary", "Debenture holders, as creditors, come before shareholders."],
      ["All three groups are repaid at the same time", "There is a strict order of priority."],
    ],
    answer: "A",
    explanation: "Creditors (including debenture holders) are repaid before shareholders; preference before ordinary.",
    hints: ["Lenders before owners."],
  });
  const pref = 40000, pr = 7, ord = 120000, avail = 21400;
  const pd = r2((pref * pr) / 100), od = r2(avail - pd);
  const perShare = od / ord;
  b.calc({
    d: 4, skill: "APPLICATION", kind: "pct", value: (od / ord) * 100, calculator: true,
    stem: `A company has 120,000 ordinary shares of US\\$1 each and 40,000 ${pr}% preference shares of US\\$1 each. Profit available for dividends is ${money(avail)}. Calculate the ordinary dividend as a percentage of the nominal value, to one decimal place.`,
    wrong: [round((avail / ord) * 100, 1), round((avail / (ord + pref)) * 100, 1)],
    explanation: `Preference dividend = ${pr}% × ${fmt(pref)} = ${money(pd)}; left for ordinary = ${money(od)}; per share = US\\$${perShare.toFixed(4)}; = ${round(perShare * 100, 1)}%.`,
    workedSolution: `1. Preference dividend = ${pr}% × ${fmt(pref)} = ${fmt(pd)}.\n2. Left for ordinary shareholders = ${fmt(avail)} − ${fmt(pd)} = ${fmt(od)}.\n3. Ordinary dividend % = ${fmt(od)} ÷ ${fmt(ord)} × 100 = ${round((od / ord) * 100, 1)}%.`,
    hints: ["Pay the preference dividend first.", "Divide what is left by the ordinary share capital."],
  });
  const deb = 65000, dr = 9;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2((deb * dr) / 100), daily: true,
    stem: `A company has issued ${money(deb)} of ${dr}% debentures. How much interest must it pay each year?`,
    wrong: [r2(deb + (deb * dr) / 100)],
    explanation: `${dr}% × ${fmt(deb)} = ${money(r2((deb * dr) / 100))}.`,
  });
  const iss = 150000, called = 120000, paid = 112500;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: called - paid,
    stem: `A company has issued shares worth ${money(iss)}. It has called up ${money(called)}, and shareholders have paid ${money(paid)}. What are the calls in arrear?`,
    wrong: [iss - called, iss - paid],
    explanation: `Calls in arrear = called-up − paid-up = ${fmt(called)} − ${fmt(paid)} = ${money(called - paid)}.`,
    hints: ["Calls in arrear are amounts asked for but not yet paid."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Preference dividends are paid before ordinary dividends.",
    answer: true,
    explanation: "True. That is the \"preference\" they enjoy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Paid-up capital can be greater than called-up capital.",
    answer: false,
    explanation: "False. Shareholders cannot have paid more than has been called: authorised ≥ issued ≥ called-up ≥ paid-up.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of capital with its meaning.",
    pairs: [
      ["Authorised capital", "Maximum share capital the company may issue"],
      ["Issued capital", "Shares actually allotted to shareholders"],
      ["Called-up capital", "Part of issued capital shareholders have been asked to pay"],
      ["Paid-up capital", "Amount shareholders have actually paid"],
    ],
    explanation: "Each type is a part of the one before it.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A debenture backed by specific assets of the company is a {{blank:a}} debenture. Ordinary shares are also called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["secured"], choices: ["secured", "naked", "cumulative", "participating"] },
      { id: "b", accepted: ["equity"], choices: ["equity", "debentures", "bonds", "preference"] },
    ],
    explanation: "Secured (mortgage) debentures have security; ordinary shares are equity.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name for the part of a company's profit paid to its shareholders?",
    accepted: ["dividend", "dividends", "a dividend"],
    wrong: ["interest"],
    explanation: "A dividend.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between shares and debentures (two differences).",
    points: [
      "Shareholders are owners; debenture holders are lenders/creditors (1)",
      "Contrast developed (1)",
      "Dividends vary and need profit; debenture interest is fixed and paid even in a loss / votes versus no votes / repayment order (1)",
      "Contrast developed (1)",
    ],
    modelAnswer: "Shareholders own the company, whereas debenture holders have lent it money and are creditors. Shareholders receive dividends only when there are profits, while debenture holders receive fixed interest every year, even when the company makes a loss.",
    explanation: "Each difference must contrast both securities.",
    hints: ["Owner or lender?", "What happens in a loss year?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why ordinary shares are said to carry the greatest risk.",
    points: [
      "Dividends vary and may be nil in a bad year (1)",
      "Paid only after debenture interest and preference dividends (1)",
      "Repaid last if the company is wound up / may receive nothing (1)",
      "In return they may earn the highest dividends and control the company (1)",
    ],
    modelAnswer: "Ordinary shareholders receive dividends only after debenture interest and preference dividends have been paid, so in a poor year they may get nothing. If the company is wound up, they are repaid last and may lose their capital. In return, they control the company and can earn high dividends in good years.",
    explanation: "Ordinary shareholders come last for income and capital.",
    hints: ["Where do they stand in the order of payment?"],
  });
  const o2 = 80000, p2 = 25000, pr2 = 8, d2a = 9000, d2b = 1500;
  const pd2 = r2((p2 * pr2) / 100);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Rudo is choosing an investment. She is looking at Chirovha Fruit Processors Ltd (a fictional company), whose capital is:\n\n${table(["Capital", "US\\$"], [["Ordinary shares of US\\$1 each", o2], [`${pr2}% preference shares of US\\$1 each`, p2]])}\n\nProfit available for dividends was ${money(d2a)} last year but only ${money(d2b)} this year.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: pd2,
        stem: "Calculate the annual preference dividend.",
        wrong: [r2((o2 * pr2) / 100)],
        explanation: `${pr2}% × ${fmt(p2)} = ${money(pd2)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "pct", value: ((d2a - pd2) / o2) * 100, type: "CALCULATION",
        stem: "Calculate last year's ordinary dividend as a percentage of nominal value, to one decimal place.",
        wrong: [round((d2a / o2) * 100, 1)],
        explanation: `(${fmt(d2a)} − ${fmt(pd2)}) ÷ ${fmt(o2)} × 100 = ${round(((d2a - pd2) / o2) * 100, 1)}%.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: Math.min(d2b, pd2),
        stem: "This year, how much of the profit available for dividends will the preference shareholders receive?",
        wrong: [pd2, 0],
        explanation: `Only ${money(d2b)} is available, less than the full preference dividend of ${money(pd2)}, so preference shareholders receive ${money(Math.min(d2b, pd2))} and ordinary shareholders receive nothing.`,
      }),
      P.manual({
        label: "(d)", marks: 5,
        stem: "Rudo is retired and depends on a regular income. Recommend whether she should buy ordinary or preference shares in the company. Justify your answer using your calculations.",
        points: [
          `Ordinary shares paid ${round(((d2a - pd2) / o2) * 100, 1)}% last year, more than the ${pr2}% preference rate (1)`,
          "But this year ordinary shareholders receive nothing (1)",
          "Preference shares have priority and a fixed rate; cumulative shares would carry arrears forward (1)",
          "Rudo needs a steady income and cannot take high risk (1)",
          "Justified recommendation: preference shares (1)",
        ],
      }),
    ],
    explanation: `Preference dividend ${money(pd2)}; last year ordinary ${round(((d2a - pd2) / o2) * 100, 1)}%; this year only ${money(d2b)} is available, so ordinary shareholders get nothing. A retired investor needing steady income should prefer preference shares.`,
    hints: ["Preference dividends come first.", "What happens to the ordinary dividend when profit is small?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 660, calculator: true,
    stem: `Tsoka Textiles Ltd (a fictional company) has authorised capital of ${money(500000)}. It has issued shares worth ${money(360000)}, called up ${money(300000)}, and received ${money(288000)}.`,
    parts: [
      P.num({
        label: "(a)", marks: 1, kind: "money", value: 288000,
        stem: "State the paid-up capital.",
        wrong: [300000],
        explanation: `Paid-up capital = amount received = ${money(288000)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: 360000 - 300000,
        stem: "Calculate the uncalled capital.",
        wrong: [500000 - 360000],
        explanation: `Uncalled = issued − called-up = ${fmt(360000)} − ${fmt(300000)} = ${money(360000 - 300000)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, kind: "money", value: 500000 - 360000,
        stem: "How much more share capital could the company issue without changing its authorised capital?",
        wrong: [500000 - 288000],
        explanation: `${fmt(500000)} − ${fmt(360000)} = ${money(500000 - 360000)}.`,
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain **one** reason why the company might prefer to raise more money by issuing debentures instead of more shares.",
        points: ["Reason: no dilution of control (1)", "Explained: debenture holders have no votes (1)", "Developed: fixed interest may cost less than future dividends if profits grow (1)"],
      }),
    ],
    explanation: "Paid-up = received; uncalled = issued − called-up; unissued = authorised − issued. Debentures keep control with existing shareholders.",
    hints: ["Authorised ≥ issued ≥ called-up ≥ paid-up."],
  });
  b.card("DEFINITION", "Ordinary share", "Unit of ownership with votes and a variable dividend, paid last; the main risk-bearers.");
  b.card("DEFINITION", "Preference share", "Fixed-rate dividend paid before ordinary dividends; repaid first among shareholders; usually no vote.");
  b.card("DEFINITION", "Debenture", "Long-term loan to a company at fixed interest, paid even in loss years; holders are creditors.");
  b.card("CONCEPT", "Shares versus debentures", "Owners vs lenders; dividend vs interest; need profit vs paid regardless; votes vs none; repaid last vs first.");
  b.card("CONCEPT", "Types of preference share", "Cumulative (arrears carried forward), non-cumulative, participating (extra share of profit), redeemable.");
  b.card("CONCEPT", "Types of share capital", "Authorised ≥ issued ≥ called-up ≥ paid-up; calls in arrear = called-up − paid-up.");
  b.card("FORMULA", "Ordinary dividend %", "(Profit for dividends − preference dividend) ÷ nominal value of ordinary shares × 100.");
  b.card("FORMULA", "Debenture interest", "Interest = rate × nominal value of debentures (paid every year).");
  b.card("FACT", "Order of repayment on winding up", "Creditors and debenture holders, then preference shareholders, then ordinary shareholders.");
});
